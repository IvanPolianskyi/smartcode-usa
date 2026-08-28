import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getEntitlement, getSubscriptions } from '@/lib/entitlements'
import { labelForCourseIds } from '@/lib/billingCatalog'
import { isPaddleManagedCustomerId } from '@/lib/paddle'

/** Subscription state for the account page. Never exposes Paddle internals. */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
	const userId = await getCurrentUser()
	if (!userId) {
		return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
	}

	try {
		const entitlement = await getEntitlement(userId)
		const rows = await getSubscriptions(userId)
		const rowBySubId = new Map(
			rows.map((row) => [row.paddleSubscriptionId, row])
		)
		const canManageBilling = rows.some((row) =>
			isPaddleManagedCustomerId(row.paddleCustomerId)
		)
		const paddleCustomerId =
			rows.find((row) => isPaddleManagedCustomerId(row.paddleCustomerId))
				?.paddleCustomerId || null
		const programs = (entitlement.subscriptions || []).map((sub) => {
			const row = rowBySubId.get(sub.paddleSubscriptionId)
			const cancellableStatus =
				sub.status === 'active' ||
				sub.status === 'trialing' ||
				sub.status === 'past_due' ||
				sub.status === 'paused'
			const canCancel =
				Boolean(sub.paddleSubscriptionId) &&
				cancellableStatus &&
				!sub.cancelAtPeriodEnd &&
				Boolean(row)
			// A plan change only works on a live Paddle subscription: manual/admin
			// grants have no Paddle side to move, and a cancelled one is not ours
			// to re-price.
			const canChangePlan =
				Boolean(sub.paddleSubscriptionId) &&
				Boolean(sub.priceId) &&
				(sub.status === 'active' || sub.status === 'trialing') &&
				isPaddleManagedCustomerId(row?.paddleCustomerId)
			return {
				courseIds: sub.courseIds,
				label: labelForCourseIds(sub.courseIds),
				priceId: sub.priceId,
				canChangePlan,
				status: sub.status,
				trialing: sub.trialing,
				inGrace: sub.inGrace,
				active: sub.active,
				cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
				endsAt: sub.endsAt,
				trialEndsAt: sub.trialEndsAt,
				billingInterval: sub.billingInterval,
				planTier: sub.planTier === 'premium' ? 'premium' : 'standard',
				paddleSubscriptionId: sub.paddleSubscriptionId,
				canCancel,
			}
		})

		return NextResponse.json({
			active: entitlement.active,
			courseIds: entitlement.courseIds,
			status: entitlement.status,
			trialing: entitlement.trialing,
			inGrace: entitlement.inGrace,
			cancelAtPeriodEnd: entitlement.cancelAtPeriodEnd,
			endsAt: entitlement.endsAt,
			trialEndsAt: entitlement.trialEndsAt,
			billingInterval: programs[0]?.billingInterval || null,
			hasSubscription: programs.length > 0,
			canManageBilling,
			/** Paddle customer id (`ctm_…`) for Retain / pwCustomer — never an email. */
			paddleCustomerId,
			programs,
		})
	} catch (error) {
		console.error('[billing] status error:', error)
		return NextResponse.json({ error: 'could not load subscription' }, { status: 500 })
	}
}
