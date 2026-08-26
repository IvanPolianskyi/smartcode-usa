import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'
import {
	verifyWebhookSignature,
	normalizeSubscription,
	readUserIdFromCustomData,
	readCourseIdFromCustomData,
} from '@/lib/paddle'
import { assertPaddleWebhookIp } from '@/lib/paddleIps'
import { ensureBillingIndexes } from '@/lib/entitlements'
import { courseIdsForPriceId, tierForPriceId } from '@/lib/billingCatalog'
import { isKnownCourseId } from '@/lib/courseLessonAccess'
import { SUBSCRIPTION_EVENT_TYPES } from '@/lib/paddleEvents'

/**
 * Paddle webhook - the only thing in the app that may grant or revoke access.
 *
 * Access is never granted on the checkout success redirect: that URL is
 * guessable, and treating it as proof of payment is how people get in free.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Subscription lifecycle events we act on. Anything else is acknowledged and ignored. */
const SUBSCRIPTION_EVENTS = new Set(SUBSCRIPTION_EVENT_TYPES)

function toObjectId(value) {
	if (!value) return null
	try {
		return new ObjectId(String(value))
	} catch {
		return null
	}
}

/**
 * Resolve the account this subscription belongs to.
 * `custom_data.userId` is set at checkout; the customer id is the fallback for
 * events that arrive after a customer has been linked once.
 */
async function resolveUserId(normalized) {
	const fromCustomData = toObjectId(readUserIdFromCustomData(normalized.customData))
	if (fromCustomData) return fromCustomData

	if (normalized.paddleCustomerId) {
		const subscriptions = await getCollection('subscriptions')
		const existing = await subscriptions.findOne({
			paddleCustomerId: normalized.paddleCustomerId,
		})
		if (existing?.userId) return existing.userId
	}

	return null
}

export async function POST(request) {
	const ipCheck = await assertPaddleWebhookIp(request)
	if (!ipCheck.ok) {
		console.warn('[paddle] rejected webhook by IP:', ipCheck.reason, ipCheck.ip || '')
		return NextResponse.json({ error: 'forbidden' }, { status: 403 })
	}

	// Signature is computed over the exact bytes Paddle sent. Reading JSON first
	// and re-serialising would change them and break verification.
	const rawBody = await request.text()
	const signature = request.headers.get('paddle-signature')

	const verification = verifyWebhookSignature(rawBody, signature)
	if (!verification.ok) {
		console.warn('[paddle] rejected webhook:', verification.reason)
		return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
	}

	let event
	try {
		event = JSON.parse(rawBody)
	} catch {
		return NextResponse.json({ error: 'invalid json' }, { status: 400 })
	}

	const eventId = event?.event_id
	const eventType = event?.event_type

	if (!eventId || !eventType) {
		return NextResponse.json({ error: 'missing event fields' }, { status: 400 })
	}

	// Released if processing fails, so Paddle's retry is not swallowed as a duplicate.
	let claimedEventId = null

	try {
		await ensureBillingIndexes()

		// Paddle retries on any non-2xx, so the same event arrives more than once.
		// The unique index makes the second delivery a no-op instead of a double grant.
		const events = await getCollection('paddleWebhookEvents')
		try {
			await events.insertOne({ eventId, eventType, receivedAt: new Date() })
			claimedEventId = eventId
		} catch (error) {
			if (error?.code === 11000) {
				return NextResponse.json({ ok: true, duplicate: true })
			}
			throw error
		}

		if (!SUBSCRIPTION_EVENTS.has(eventType)) {
			return NextResponse.json({ ok: true, ignored: eventType })
		}

		const normalized = normalizeSubscription(event.data)
		if (!normalized.paddleSubscriptionId) {
			return NextResponse.json({ ok: true, ignored: 'no subscription id' })
		}

		const userId = await resolveUserId(normalized)
		if (!userId) {
			// Store nothing we cannot attribute - a subscription with no owner
			// would grant access to nobody and hide the real problem.
			console.error('[paddle] unattributable subscription', {
				eventType,
				subscriptionId: normalized.paddleSubscriptionId,
				customerId: normalized.paddleCustomerId,
			})
			return NextResponse.json({ ok: true, warning: 'unattributed' })
		}

		const subscriptions = await getCollection('subscriptions')
		const now = new Date()
		let courseIds = courseIdsForPriceId(normalized.priceId)
		if (!courseIds.length) {
			const fromCheckout = readCourseIdFromCustomData(normalized.customData)
			if (fromCheckout && isKnownCourseId(fromCheckout)) {
				courseIds = [fromCheckout]
				console.warn('[paddle] price map miss; using customData.courseId', {
					priceId: normalized.priceId,
					courseId: fromCheckout,
				})
			} else {
				console.error('[paddle] subscription with no course mapping', {
					eventType,
					subscriptionId: normalized.paddleSubscriptionId,
					priceId: normalized.priceId,
				})
			}
		}
		const planTier =
			tierForPriceId(normalized.priceId) ||
			(normalized.customData?.tier === 'premium' ? 'premium' : 'standard')

		await subscriptions.updateOne(
			{ paddleSubscriptionId: normalized.paddleSubscriptionId },
			{
				$set: {
					userId,
					paddleCustomerId: normalized.paddleCustomerId,
					priceId: normalized.priceId,
					productId: normalized.productId,
					courseIds,
					planTier,
					status: normalized.status,
					billingInterval: normalized.billingInterval,
					trialEndsAt: normalized.trialEndsAt,
					currentPeriodEnd: normalized.currentPeriodEnd,
					cancelAtPeriodEnd: normalized.cancelAtPeriodEnd,
					scheduledChangeAt: normalized.scheduledChangeAt,
					lastEventType: eventType,
					updatedAt: now,
				},
				$setOnInsert: { createdAt: now },
			},
			{ upsert: true }
		)

		return NextResponse.json({ ok: true })
	} catch (error) {
		console.error('[paddle] webhook error:', error)
		// 500 makes Paddle retry, which is what we want for a transient failure.
		// The dedupe row was claimed before processing, so release it - otherwise
		// the retry matches the unique index and the event is dropped for good.
		if (claimedEventId) {
			try {
				const events = await getCollection('paddleWebhookEvents')
				await events.deleteOne({ eventId: claimedEventId })
			} catch (cleanupError) {
				console.error('[paddle] could not release event id:', cleanupError)
			}
		}
		return NextResponse.json({ error: 'processing failed' }, { status: 500 })
	}
}
