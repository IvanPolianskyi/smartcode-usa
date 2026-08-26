import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getEntitlement } from '@/lib/entitlements'
import { labelForCourseIds } from '@/lib/billingCatalog'

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
		const programs = (entitlement.subscriptions || []).map((sub) => ({
			courseIds: sub.courseIds,
			label: labelForCourseIds(sub.courseIds),
			status: sub.status,
			trialing: sub.trialing,
			inGrace: sub.inGrace,
			active: sub.active,
			cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
			endsAt: sub.endsAt,
			trialEndsAt: sub.trialEndsAt,
			billingInterval: sub.billingInterval,
			planTier: sub.planTier || null,
			paddleSubscriptionId: sub.paddleSubscriptionId,
		}))

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
			programs,
		})
	} catch (error) {
		console.error('[billing] status error:', error)
		return NextResponse.json({ error: 'could not load subscription' }, { status: 500 })
	}
}
