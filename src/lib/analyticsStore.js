import { getCollection } from './mongodb.js'
import { dayKeyFromDate, FUNNEL_STEP_IDS } from './funnelSteps.js'

/**
 * The one place a funnel event is written.
 *
 * Every step of the acquisition funnel - including the ones that happen with
 * no browser attached, like a Paddle webhook - lands in this single collection
 * in the same shape. The admin dashboard then has exactly one source to read,
 * so its percentages cannot mix populations.
 */

export const ANALYTICS_EVENTS = 'analyticsEvents'
export const VISIT_LOGS = 'logs'

export const VISITOR_COOKIE = 'sc_vid'
/** Rolling session window, GA-style: 30 minutes of inactivity ends a session. */
export const SESSION_COOKIE = 'sc_session'
export const SESSION_TTL_SECONDS = 30 * 60

let indexesPromise = null

/**
 * Idempotent index setup, memoised per process.
 *
 * This used to run inside every insert - three extra round trips on the hot
 * path of a page view, for indexes that only ever need creating once.
 */
export async function ensureAnalyticsIndexes() {
	if (indexesPromise) return indexesPromise
	indexesPromise = (async () => {
		const [events, logs] = await Promise.all([
			getCollection(ANALYTICS_EVENTS),
			getCollection(VISIT_LOGS),
		])
		const ops = [
			events.createIndex({ dayKey: 1, step: 1 }, { name: 'events_day_step' }),
			events.createIndex({ createdAt: -1 }, { name: 'events_createdAt' }),
			events.createIndex({ visitorId: 1, userId: 1 }, { name: 'events_identity' }),
			// Server-side events carry a deterministic key so a webhook retry, a
			// re-render or a backfill re-run cannot record the same conversion
			// twice. Browser events leave it unset and the sparse index skips them.
			events.createIndex(
				{ dedupeKey: 1 },
				{
					unique: true,
					name: 'events_dedupeKey_unique',
					partialFilterExpression: { dedupeKey: { $type: 'string' } },
				}
			),
			logs.createIndex({ type: 1, createdAt: -1 }, { name: 'logs_type_createdAt' }),
			logs.createIndex({ type: 1, dayKey: 1, visitorId: 1 }, { name: 'logs_day_visitor' }),
		]
		const results = await Promise.allSettled(ops)
		for (const r of results) {
			if (r.status === 'rejected') {
				console.warn('ensureAnalyticsIndexes:', r.reason?.message || r.reason)
			}
		}
	})()
	try {
		await indexesPromise
	} catch (error) {
		indexesPromise = null
		throw error
	}
	return indexesPromise
}

export function newVisitorId() {
	return `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Record one funnel step.
 *
 * Never throws: analytics is not allowed to fail a registration, a webhook or
 * a page view. Returns whether a row was actually written.
 *
 * @param {object} input
 * @param {string} input.step one of FUNNEL_STEP_IDS
 * @param {string|null} [input.visitorId] browser identity, when there is one
 * @param {string|null} [input.userId] account identity, when known
 * @param {string} [input.path]
 * @param {object} [input.params]
 * @param {string} [input.ip]
 * @param {string|null} [input.dedupeKey] makes the write exactly-once
 * @param {Date} [input.occurredAt] for backfills; defaults to now
 */
export async function recordFunnelEvent({
	step,
	visitorId = null,
	userId = null,
	path = '',
	params = {},
	ip = '',
	dedupeKey = null,
	occurredAt = new Date(),
} = {}) {
	if (!FUNNEL_STEP_IDS.includes(step)) return { ok: false, reason: 'unknown step' }
	if (!visitorId && !userId) return { ok: false, reason: 'no identity' }

	try {
		await ensureAnalyticsIndexes()
		const events = await getCollection(ANALYTICS_EVENTS)
		const doc = {
			step,
			path: String(path || ''),
			params: params && typeof params === 'object' ? params : {},
			visitorId: visitorId || null,
			userId: userId ? String(userId) : null,
			ip: String(ip || ''),
			dayKey: dayKeyFromDate(occurredAt),
			createdAt: occurredAt,
		}
		if (dedupeKey) doc.dedupeKey = String(dedupeKey)
		await events.insertOne(doc)
		return { ok: true, created: true }
	} catch (error) {
		// A duplicate is the dedupe key doing its job, not a failure.
		if (error?.code === 11000) return { ok: true, duplicate: true }
		console.warn('[analytics] recordFunnelEvent:', error?.message || error)
		return { ok: false, reason: 'write failed' }
	}
}

/**
 * Attach an account to the anonymous trail it came from.
 *
 * Without this, one person is two entities in the funnel: a `visitorId` for
 * everything before signup and a `userId` for everything after, so the funnel
 * reports more accounts than the sessions that produced them.
 */
export async function stitchVisitorToUser({ visitorId, userId }) {
	if (!visitorId || !userId) return { ok: false }
	try {
		const events = await getCollection(ANALYTICS_EVENTS)
		const result = await events.updateMany(
			{ visitorId, userId: null },
			{ $set: { userId: String(userId) } }
		)
		return { ok: true, matched: result.modifiedCount }
	} catch (error) {
		console.warn('[analytics] stitchVisitorToUser:', error?.message || error)
		return { ok: false }
	}
}

/**
 * Who a row belongs to, for distinct-people counting.
 *
 * The account wins when there is one, so a person's pre-signup page views and
 * their post-signup conversion collapse into a single entity.
 */
export const IDENTITY_EXPR = { $ifNull: ['$userId', '$visitorId'] }

/** UTC day bucket, tolerating rows written before `dayKey` existed. */
export const DAY_KEY_EXPR = {
	$ifNull: [
		'$dayKey',
		{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: 'UTC' } },
	],
}
