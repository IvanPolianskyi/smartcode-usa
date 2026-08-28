import { getCollection } from './mongodb.js'
import { courseIdsForPriceId, tierForPriceId } from './billingCatalog.js'
import { isKnownCourseId } from './courseLessonAccess.js'
import { readCourseIdFromCustomData } from './paddle.js'

/**
 * The one place a subscription row is written.
 *
 * The webhook and the reconciler both land here so they can never disagree
 * about what a subscription means - a reconciler that resolved courses
 * differently from the webhook would hand out or withhold access depending on
 * which one happened to run last.
 */

/** Courses a subscription unlocks: price map first, checkout hint second. */
export function resolveCourseIds(normalized) {
	const fromPrice = courseIdsForPriceId(normalized?.priceId)
	if (fromPrice.length) return fromPrice

	const fromCheckout = readCourseIdFromCustomData(normalized?.customData)
	if (fromCheckout && isKnownCourseId(fromCheckout)) {
		console.warn('[paddle] price map miss; using customData.courseId', {
			priceId: normalized?.priceId,
			courseId: fromCheckout,
		})
		return [fromCheckout]
	}

	console.error('[paddle] subscription with no course mapping', {
		subscriptionId: normalized?.paddleSubscriptionId,
		priceId: normalized?.priceId,
	})
	return []
}

/**
 * Write a normalised subscription, refusing to move the row backwards in time.
 *
 * @param {object} options
 * @param {object} options.normalized output of `normalizeSubscription`
 * @param {import('mongodb').ObjectId} options.userId
 * @param {string} options.eventType what caused this write
 * @param {Date} [options.occurredAt] when it happened at Paddle's end
 * @returns {Promise<{ ok: boolean, stale?: boolean, courseIds: string[] }>}
 */
export async function upsertSubscription({
	normalized,
	userId,
	eventType,
	occurredAt = new Date(),
}) {
	const subscriptions = await getCollection('subscriptions')
	const now = new Date()
	const courseIds = resolveCourseIds(normalized)

	const planTier =
		tierForPriceId(normalized.priceId) ||
		(normalized.customData?.tier === 'premium' ? 'premium' : 'standard')

	// Paddle does not promise ordering: a retried `subscription.updated` can land
	// after the `subscription.canceled` that followed it. Applying it blindly
	// would resurrect a dead subscription - or cancel a live one.
	const notStale = {
		$or: [{ occurredAt: { $exists: false } }, { occurredAt: { $lte: occurredAt } }],
	}

	const setFields = {
		occurredAt,
		userId,
		paddleCustomerId: normalized.paddleCustomerId,
		priceId: normalized.priceId,
		productId: normalized.productId,
		planTier,
		status: normalized.status,
		billingInterval: normalized.billingInterval,
		trialEndsAt: normalized.trialEndsAt,
		currentPeriodEnd: normalized.currentPeriodEnd,
		cancelAtPeriodEnd: normalized.cancelAtPeriodEnd,
		scheduledChangeAt: normalized.scheduledChangeAt,
		lastEventType: eventType,
		updatedAt: now,
	}

	// `$set` and `$setOnInsert` may not both touch courseIds - Mongo rejects the
	// conflicting path - so exactly one of them owns it. An empty mapping never
	// overwrites a good one: that would strip access from a paying customer.
	const insertFields = { createdAt: now }
	if (courseIds.length) {
		setFields.courseIds = courseIds
	} else {
		insertFields.courseIds = []
	}

	try {
		await subscriptions.updateOne(
			{ paddleSubscriptionId: normalized.paddleSubscriptionId, ...notStale },
			{ $set: setFields, $setOnInsert: insertFields },
			{ upsert: true }
		)
		return { ok: true, courseIds }
	} catch (error) {
		// The row exists but is newer than this event, so the filter missed and
		// the upsert hit the unique index. That is the guard working: drop the
		// stale event rather than retry it forever.
		if (error?.code === 11000) {
			console.warn('[paddle] dropped out-of-order event', {
				eventType,
				subscriptionId: normalized.paddleSubscriptionId,
				occurredAt,
			})
			return { ok: true, stale: true, courseIds }
		}
		throw error
	}
}
