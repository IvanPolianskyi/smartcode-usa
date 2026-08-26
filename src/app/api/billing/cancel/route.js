import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { getSubscriptions } from '@/lib/entitlements'
import { cancelSubscription, isPaddleManagedCustomerId } from '@/lib/paddle'

/**
 * Self-service cancel: schedule end of renewals at the next billing period.
 * The customer keeps access until then. Webhook remains source of truth; we
 * flip cancelAtPeriodEnd locally so the dashboard updates immediately.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MANUAL_CUSTOMER_IDS = new Set(['admin_manual', 'local_dev_customer'])

export async function POST(request) {
	const userId = await getCurrentUser()
	if (!userId) {
		return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
	}

	try {
		const body = await request.json().catch(() => ({}))
		const paddleSubscriptionId = String(body.paddleSubscriptionId || '').trim()
		if (!paddleSubscriptionId) {
			return NextResponse.json({ error: 'subscription id required' }, { status: 400 })
		}

		const rows = await getSubscriptions(userId)
		const row = rows.find((r) => r.paddleSubscriptionId === paddleSubscriptionId)
		if (!row) {
			return NextResponse.json({ error: 'subscription not found' }, { status: 404 })
		}

		if (row.cancelAtPeriodEnd || row.status === 'canceled') {
			return NextResponse.json({ ok: true, alreadyCancelled: true })
		}

		const subscriptions = await getCollection('subscriptions')

		if (
			MANUAL_CUSTOMER_IDS.has(row.paddleCustomerId) ||
			!isPaddleManagedCustomerId(row.paddleCustomerId)
		) {
			await subscriptions.updateOne(
				{ _id: row._id },
				{
					$set: {
						status: 'canceled',
						cancelAtPeriodEnd: true,
						lastEventType: 'user.self_cancel_manual',
						updatedAt: new Date(),
					},
				}
			)
			return NextResponse.json({ ok: true, mode: 'manual' })
		}

		await cancelSubscription(paddleSubscriptionId, { immediately: false })
		await subscriptions.updateOne(
			{ _id: row._id },
			{
				$set: {
					cancelAtPeriodEnd: true,
					lastEventType: 'user.self_cancel_scheduled',
					updatedAt: new Date(),
				},
			}
		)

		return NextResponse.json({ ok: true, mode: 'paddle' })
	} catch (error) {
		console.error('[billing] cancel error:', error)
		return NextResponse.json({ error: 'could not cancel subscription' }, { status: 500 })
	}
}
