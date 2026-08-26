import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getSubscriptions } from '@/lib/entitlements'
import { createPortalSession, isPaddleManagedCustomerId } from '@/lib/paddle'

/**
 * Hands the customer a Paddle portal link so they can update their card or
 * cancel without contacting us. Self-service cancellation is both a Paddle
 * expectation and the difference between a cancellation and a chargeback.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST() {
	const userId = await getCurrentUser()
	if (!userId) {
		return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
	}

	try {
		const subscriptions = await getSubscriptions(userId)
		const withCustomer = subscriptions.find((row) =>
			isPaddleManagedCustomerId(row.paddleCustomerId)
		)

		if (!withCustomer?.paddleCustomerId) {
			return NextResponse.json(
				{ error: 'no paddle subscription found' },
				{ status: 404 }
			)
		}

		const subscriptionIds = subscriptions
			.filter((row) => isPaddleManagedCustomerId(row.paddleCustomerId))
			.map((row) => row.paddleSubscriptionId)
			.filter(Boolean)

		const urls = await createPortalSession(withCustomer.paddleCustomerId, subscriptionIds)

		if (!urls.overviewUrl) {
			return NextResponse.json({ error: 'portal unavailable' }, { status: 502 })
		}

		return NextResponse.json(urls)
	} catch (error) {
		console.error('[billing] portal error:', error)
		return NextResponse.json({ error: 'could not open portal' }, { status: 500 })
	}
}
