import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ensureBillingIndexes } from '@/lib/entitlements'
import {
	findCustomerByEmail,
	listSubscriptionsForCustomer,
	normalizeSubscription,
} from '@/lib/paddle'
import { upsertSubscription } from '@/lib/subscriptionStore'

/**
 * Repair access when the webhook never landed.
 *
 * The webhook is still the only thing that grants access in the normal flow.
 * But a webhook can be lost for reasons the customer had no part in - a bad
 * deploy, a Mongo blip, a destination misconfigured in Paddle - and until now
 * the result was a paying customer staring at a locked dashboard with nothing
 * to do but email support. This asks Paddle directly and writes the same rows
 * the webhook would have written.
 *
 * POST - the signed-in customer repairing their own account (safe to call from
 * the post-checkout page when activation stalls).
 * GET with the cron secret - a sweep for accounts stuck the same way.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Pull every Paddle subscription for one account and store it. */
async function reconcileUser(user) {
	const email = String(user?.email || '').trim().toLowerCase()
	if (!email) return { repaired: 0, reason: 'no_email' }

	const subscriptions = await getCollection('subscriptions')

	// Prefer a customer id we already know; fall back to the email Paddle has.
	const known = await subscriptions.findOne({
		userId: user._id,
		paddleCustomerId: { $regex: '^ctm_' },
	})
	const customerId = known?.paddleCustomerId || (await findCustomerByEmail(email))
	if (!customerId) return { repaired: 0, reason: 'no_paddle_customer' }

	const remote = await listSubscriptionsForCustomer(customerId)
	let repaired = 0

	for (const subscription of remote) {
		const normalized = normalizeSubscription(subscription)
		if (!normalized.paddleSubscriptionId) continue

		const result = await upsertSubscription({
			normalized,
			userId: user._id,
			eventType: 'reconcile.paddle_api',
			// Paddle's own updated_at, so a genuinely newer webhook still wins.
			occurredAt: subscription?.updated_at
				? new Date(subscription.updated_at)
				: new Date(),
		})
		if (!result.stale) repaired += 1
	}

	return { repaired, customerId, found: remote.length }
}

export async function POST() {
	const userId = await getCurrentUser()
	if (!userId) {
		return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
	}

	try {
		await ensureBillingIndexes()
		const users = await getCollection('users')
		const user = await users.findOne({ _id: new ObjectId(userId) })
		if (!user) {
			return NextResponse.json({ error: 'account not found' }, { status: 404 })
		}

		const result = await reconcileUser(user)
		return NextResponse.json({ ok: true, ...result })
	} catch (error) {
		console.error('[billing] reconcile error:', error)
		return NextResponse.json({ error: 'could not reconcile' }, { status: 500 })
	}
}

/** How far back the sweep looks for accounts that may be stuck. */
const SWEEP_WINDOW_MS = 7 * 24 * 60 * 60 * 1000
const SWEEP_LIMIT = 200

export async function GET(request) {
	const secret = process.env.CRON_SECRET
	const provided = request.headers.get('authorization') || ''
	if (!secret || provided !== `Bearer ${secret}`) {
		return NextResponse.json({ error: 'forbidden' }, { status: 403 })
	}

	try {
		await ensureBillingIndexes()
		const subscriptions = await getCollection('subscriptions')
		const users = await getCollection('users')
		const since = new Date(Date.now() - SWEEP_WINDOW_MS)

		// Rows that exist but grant nothing: the price could not be mapped to a
		// course, so the customer is paying for a subscription that unlocks
		// nothing. These are the ones worth asking Paddle about again.
		const broken = await subscriptions
			.find({
				updatedAt: { $gte: since },
				$or: [{ courseIds: { $size: 0 } }, { courseIds: { $exists: false } }],
			})
			.limit(SWEEP_LIMIT)
			.toArray()

		const userIds = [...new Set(broken.map((row) => String(row.userId)).filter(Boolean))]
		let repaired = 0
		const failures = []

		for (const id of userIds) {
			try {
				const user = await users.findOne({ _id: new ObjectId(id) })
				if (!user) continue
				const result = await reconcileUser(user)
				repaired += result.repaired
			} catch (error) {
				failures.push({ userId: id, error: error?.message || String(error) })
			}
		}

		return NextResponse.json({
			ok: true,
			scanned: broken.length,
			accounts: userIds.length,
			repaired,
			failures,
		})
	} catch (error) {
		console.error('[billing] reconcile sweep error:', error)
		return NextResponse.json({ error: 'sweep failed' }, { status: 500 })
	}
}
