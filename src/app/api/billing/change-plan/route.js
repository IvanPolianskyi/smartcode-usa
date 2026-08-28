import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { getSubscriptions } from '@/lib/entitlements'
import {
	comparePlans,
	courseIdsForPriceId,
	priceIdFor,
	tierForPriceId,
} from '@/lib/billingCatalog'
import { isPaddleManagedCustomerId, updateSubscriptionPrice } from '@/lib/paddle'

/**
 * Move an existing subscription between tiers or billing intervals.
 *
 * This is the upgrade path. Without it the only way to reach Premium was a
 * second checkout, which would have billed the customer for two subscriptions
 * to the same program - so the UI refused instead, and Premium was unsellable
 * to anyone who already had Standard.
 *
 * The webhook stays the source of truth for access. The local row is nudged
 * only so the dashboard reflects the change before `subscription.updated`
 * lands.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request) {
	const userId = await getCurrentUser()
	if (!userId) {
		return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
	}

	try {
		const body = await request.json().catch(() => ({}))
		const paddleSubscriptionId = String(body.paddleSubscriptionId || '').trim()
		const courseId = String(body.courseId || '').trim()
		const plan = body.plan === 'annual' || body.plan === 'year' ? 'year' : 'month'
		const tier = body.tier === 'premium' ? 'premium' : 'standard'

		if (!paddleSubscriptionId || !courseId) {
			return NextResponse.json(
				{ error: 'subscription id and course id are required' },
				{ status: 400 }
			)
		}

		const nextPriceId = priceIdFor(courseId, plan, tier)
		if (!nextPriceId) {
			return NextResponse.json(
				{ error: 'that plan is not available right now' },
				{ status: 409 }
			)
		}

		// Ownership: the subscription must belong to the caller. Never trust the
		// id in the body on its own - it is guessable.
		const rows = await getSubscriptions(userId)
		const row = rows.find((r) => r.paddleSubscriptionId === paddleSubscriptionId)
		if (!row) {
			return NextResponse.json({ error: 'subscription not found' }, { status: 404 })
		}

		if (!isPaddleManagedCustomerId(row.paddleCustomerId)) {
			return NextResponse.json(
				{ error: 'this subscription is managed manually - contact support' },
				{ status: 409 }
			)
		}

		if (row.status !== 'active' && row.status !== 'trialing') {
			return NextResponse.json(
				{ error: 'only an active subscription can change plan' },
				{ status: 409 }
			)
		}

		if (!(row.courseIds || []).includes(courseId)) {
			return NextResponse.json(
				{ error: 'that subscription does not cover this program' },
				{ status: 409 }
			)
		}

		const move = comparePlans(row.priceId, nextPriceId)
		if (move?.same) {
			return NextResponse.json({ ok: true, unchanged: true })
		}

		// Unknown current price (legacy catalogue): bill at the next period, the
		// option that cannot surprise someone with an immediate charge.
		const upgrade = move ? move.upgrade : false

		await updateSubscriptionPrice(paddleSubscriptionId, nextPriceId, { upgrade })

		const subscriptions = await getCollection('subscriptions')
		await subscriptions.updateOne(
			{ _id: row._id },
			{
				$set: {
					priceId: nextPriceId,
					planTier: tierForPriceId(nextPriceId) || tier,
					courseIds: courseIdsForPriceId(nextPriceId),
					billingInterval: plan,
					lastEventType: upgrade ? 'user.plan_upgrade' : 'user.plan_downgrade',
					updatedAt: new Date(),
				},
			}
		)

		return NextResponse.json({ ok: true, upgrade, priceId: nextPriceId })
	} catch (error) {
		console.error('[billing] change-plan error:', error)
		return NextResponse.json(
			{ error: 'could not change your plan' },
			{ status: 500 }
		)
	}
}
