import { ObjectId } from 'mongodb'
import { getCollection } from './mongodb.js'
import { courseIdsForPriceId, tierForPriceId } from './billingCatalog.js'

/**
 * Single source of truth for "may this account use paid features".
 *
 * Subscriptions are course-scoped: a Roblox sub does not unlock Python.
 * Legacy catalogue prices still map to every program via billingCatalog.
 */

/** Statuses Paddle Billing can report on a subscription. */
export const SUBSCRIPTION_STATUS = {
	TRIALING: 'trialing',
	ACTIVE: 'active',
	PAST_DUE: 'past_due',
	PAUSED: 'paused',
	CANCELED: 'canceled',
}

/** Statuses that grant access outright. */
const ACTIVE_STATUSES = new Set([SUBSCRIPTION_STATUS.TRIALING, SUBSCRIPTION_STATUS.ACTIVE])

/**
 * A failed payment keeps access for a few days while the customer fixes their
 * card. Cutting access on the first decline is the fastest way to turn a
 * recoverable payment into a cancellation.
 */
export const GRACE_PERIOD_DAYS = 3

const GRACE_PERIOD_MS = GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000

function toObjectId(userId) {
	if (!userId) return null
	if (userId instanceof ObjectId) return userId
	try {
		return new ObjectId(String(userId))
	} catch {
		return null
	}
}

function asDate(value) {
	if (!value) return null
	const date = value instanceof Date ? value : new Date(value)
	return Number.isNaN(date.getTime()) ? null : date
}

/** Admin comps and local-dev grants, as opposed to a real Paddle subscription. */
export function isManualGrantSubscription(subscription) {
	return (
		subscription?.paddleCustomerId === 'admin_manual' ||
		subscription?.paddleCustomerId === 'local_dev_customer' ||
		String(subscription?.paddleSubscriptionId || '').startsWith('admin_manual_') ||
		String(subscription?.paddleSubscriptionId || '').startsWith('local_dev_')
	)
}

/** Resolve course IDs stored on the subscription, falling back to the price map. */
export function resolveSubscriptionCourseIds(subscription) {
	if (Array.isArray(subscription?.courseIds) && subscription.courseIds.length > 0) {
		return subscription.courseIds.map(String)
	}
	return courseIdsForPriceId(subscription?.priceId)
}

/**
 * Resolve Standard vs Premium for display and live-lesson gates.
 * Prefer the stored field, then the Paddle price map, then local-dev id hints.
 * Defaults to standard so the dashboard never leaves tier ambiguous.
 */
export function resolvePlanTier(subscription) {
	const stored = subscription?.planTier
	if (stored === 'premium' || stored === 'standard') return stored

	const fromPrice = tierForPriceId(subscription?.priceId)
	if (fromPrice === 'premium' || fromPrice === 'standard') return fromPrice

	const priceId = String(subscription?.priceId || '')
	const subId = String(subscription?.paddleSubscriptionId || '')
	if (
		/(^|_)premium(_|$)/i.test(priceId) ||
		/(^|_)premium(_|$)/i.test(subId)
	) {
		return 'premium'
	}
	return 'standard'
}

/**
 * Whether a single subscription row currently grants access.
 *
 * @returns {{
 *   active: boolean,
 *   status: string|null,
 *   trialing: boolean,
 *   inGrace: boolean,
 *   endsAt: Date|null,
 *   trialEndsAt: Date|null,
 *   cancelAtPeriodEnd: boolean,
 *   reason: string,
 * }}
 */
export function evaluateSubscription(subscription, { now = new Date() } = {}) {
	if (!subscription) {
		return {
			active: false,
			status: null,
			trialing: false,
			inGrace: false,
			endsAt: null,
			trialEndsAt: null,
			cancelAtPeriodEnd: false,
			reason: 'no_subscription',
		}
	}

	const status = subscription.status || null
	const endsAt = asDate(subscription.currentPeriodEnd)
	const trialEndsAt = asDate(subscription.trialEndsAt)
	const cancelAtPeriodEnd = Boolean(subscription.cancelAtPeriodEnd)

	if (ACTIVE_STATUSES.has(status)) {
		// Timed admin/local grants store currentPeriodEnd; honor expiry so comps end.
		const isManualGrant = isManualGrantSubscription(subscription)
		if (isManualGrant && endsAt && now >= endsAt) {
			return {
				active: false,
				status,
				trialing: false,
				inGrace: false,
				endsAt,
				trialEndsAt,
				cancelAtPeriodEnd,
				reason: 'manual_expired',
			}
		}
		return {
			active: true,
			status,
			trialing: status === SUBSCRIPTION_STATUS.TRIALING,
			inGrace: false,
			endsAt,
			trialEndsAt,
			cancelAtPeriodEnd,
			reason: status,
		}
	}

	if (status === SUBSCRIPTION_STATUS.PAST_DUE) {
		const graceEndsAt = endsAt ? new Date(endsAt.getTime() + GRACE_PERIOD_MS) : null
		const inGrace = Boolean(graceEndsAt && now < graceEndsAt)
		return {
			active: inGrace,
			status,
			trialing: false,
			inGrace,
			endsAt: graceEndsAt,
			trialEndsAt,
			cancelAtPeriodEnd,
			reason: inGrace ? 'past_due_grace' : 'past_due_expired',
		}
	}

	const stillPaidFor = Boolean(endsAt && now < endsAt)

	return {
		active: stillPaidFor,
		status,
		trialing: false,
		inGrace: false,
		endsAt,
		trialEndsAt,
		cancelAtPeriodEnd,
		reason: stillPaidFor ? `${status}_until_period_end` : status || 'inactive',
	}
}

/** All subscription rows for an account, newest first. */
export async function getSubscriptions(userId) {
	const id = toObjectId(userId)
	if (!id) return []

	const subscriptions = await getCollection('subscriptions')
	return subscriptions.find({ userId: id }).sort({ updatedAt: -1 }).toArray()
}

/** Newest subscription (legacy helper). Prefer getSubscriptions. */
export async function getSubscription(userId) {
	const list = await getSubscriptions(userId)
	return list[0] || null
}

/**
 * Resolve access for an account across every subscription.
 *
 * @returns {Promise<{
 *   active: boolean,
 *   courseIds: string[],
 *   status: string|null,
 *   trialing: boolean,
 *   inGrace: boolean,
 *   endsAt: Date|null,
 *   trialEndsAt: Date|null,
 *   cancelAtPeriodEnd: boolean,
 *   reason: string,
 *   subscriptions: Array<object>,
 * }>}
 */
export async function getEntitlement(userId, { now = new Date() } = {}) {
	const rows = await getSubscriptions(userId)

	if (!rows.length) {
		return {
			active: false,
			courseIds: [],
			status: null,
			trialing: false,
			inGrace: false,
			endsAt: null,
			trialEndsAt: null,
			cancelAtPeriodEnd: false,
			reason: 'no_subscription',
			subscriptions: [],
		}
	}

	const courseIds = new Set()
	const activeSubs = []
	let primary = null

	for (const row of rows) {
		const evaluated = evaluateSubscription(row, { now })
		const ids = resolveSubscriptionCourseIds(row)
		const entry = {
			...evaluated,
			courseIds: ids,
			billingInterval: row.billingInterval || null,
			planTier: resolvePlanTier(row),
			priceId: row.priceId || null,
			paddleSubscriptionId: row.paddleSubscriptionId || null,
			paddleCustomerId: row.paddleCustomerId || null,
			isManualGrant: isManualGrantSubscription(row),
			// Access-start clock for weekly lesson drip unlock.
			createdAt: row.createdAt || null,
			// Raw (unadjusted) period end - the past_due grace bump on `endsAt`
			// above would overcount paid billing cycles, so module unlock reads
			// this field instead.
			currentPeriodEnd: asDate(row.currentPeriodEnd),
		}

		if (evaluated.active) {
			ids.forEach((id) => courseIds.add(id))
			activeSubs.push(entry)
			if (!primary) primary = entry
		}
	}

	if (!primary) {
		const newest = rows[0]
		const evaluated = evaluateSubscription(newest, { now })
		return {
			...evaluated,
			courseIds: [],
			subscriptions: [],
		}
	}

	return {
		active: true,
		courseIds: [...courseIds],
		status: primary.status,
		trialing: primary.trialing,
		inGrace: primary.inGrace,
		endsAt: primary.endsAt,
		trialEndsAt: primary.trialEndsAt,
		cancelAtPeriodEnd: primary.cancelAtPeriodEnd,
		reason: primary.reason,
		subscriptions: activeSubs,
	}
}

/** Whether the account currently has access to a specific course via billing. */
export async function hasCourseEntitlement(userId, courseId) {
	if (!courseId) return false
	const entitlement = await getEntitlement(userId)
	return entitlement.courseIds.includes(String(courseId))
}

/** Convenience for route handlers that only need a yes/no on any subscription. */
export async function hasActiveSubscription(userId) {
	const entitlement = await getEntitlement(userId)
	return entitlement.active
}

/** Idempotent indexes for the billing collections. */
let indexesPromise = null

export async function ensureBillingIndexes() {
	if (indexesPromise) return indexesPromise

	indexesPromise = (async () => {
		const [subscriptions, events] = await Promise.all([
			getCollection('subscriptions'),
			getCollection('paddleWebhookEvents'),
		])

		const results = await Promise.allSettled([
			subscriptions.createIndex(
				{ paddleSubscriptionId: 1 },
				{ unique: true, name: 'subscriptions_paddleSubscriptionId_unique' }
			),
			subscriptions.createIndex({ userId: 1, updatedAt: -1 }, { name: 'subscriptions_userId_updatedAt' }),
			subscriptions.createIndex(
				{ paddleCustomerId: 1 },
				{ name: 'subscriptions_paddleCustomerId', sparse: true }
			),
			events.createIndex({ eventId: 1 }, { unique: true, name: 'paddleWebhookEvents_eventId_unique' }),
			events.createIndex(
				{ receivedAt: 1 },
				{ name: 'paddleWebhookEvents_ttl', expireAfterSeconds: 60 * 60 * 24 * 90 }
			),
		])

		for (const result of results) {
			if (result.status === 'rejected') {
				console.warn('ensureBillingIndexes:', result.reason?.message || result.reason)
			}
		}
	})()

	try {
		await indexesPromise
	} catch (error) {
		indexesPromise = null
		throw error
	}
}
