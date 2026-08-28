/**
 * Acquisition funnel vocabulary, shared by the browser, the API routes and the
 * admin aggregation.
 *
 * Two rules keep the numbers honest and both live here:
 *
 * 1. Every step is counted from ONE store (`analyticsEvents`) in ONE unit
 *    (distinct people). Nothing is ever back-filled from `users` or
 *    `subscriptions` at read time - mixing populations is what produced a
 *    funnel with 600% conversion.
 * 2. Every day bucket is UTC. `dayKey` (written at ingest) and the admin range
 *    boundaries have to agree, or events land in a different day than the
 *    sessions they belong to.
 */

/** Ordered acquisition funnel - same semantics as GA4 + Meta custom events. */
export const FUNNEL_STEPS = [
	{ id: 'visit', label: 'Site sessions' },
	{ id: 'view_pricing', label: 'Viewed pricing' },
	{ id: 'view_program', label: 'Program page' },
	{ id: 'begin_checkout', label: 'Started checkout' },
	{ id: 'sign_up', label: 'Account created' },
	{ id: 'start_trial', label: 'Trial started' },
	{ id: 'purchase', label: 'Paid subscription' },
]

export const FUNNEL_STEP_IDS = FUNNEL_STEPS.map((s) => s.id)

/**
 * Steps the browser is not allowed to report.
 *
 * `visit` is written by the session ping so that it means "a session started",
 * not "somebody loaded the homepage". If the browser could also post it, the
 * top of the funnel would count landing-page views and every deeper step would
 * be measured against the wrong denominator.
 */
export const SERVER_OWNED_STEPS = new Set(['visit'])

export function isTrackableStep(stepId) {
	return FUNNEL_STEP_IDS.includes(stepId) && !SERVER_OWNED_STEPS.has(stepId)
}

export function funnelLabel(stepId) {
	return FUNNEL_STEPS.find((s) => s.id === stepId)?.label || stepId
}

/**
 * Day bucket for a timestamp, in UTC.
 *
 * Deliberately not local time: the admin aggregation also groups `logs` rows
 * that were written by a different process, and two different midnights merged
 * into the same map shifted a whole day's traffic on either side of it.
 */
export function dayKeyFromDate(date = new Date()) {
	const d = date instanceof Date ? date : new Date(date)
	if (Number.isNaN(d.getTime())) return dayKeyFromDate(new Date())
	return d.toISOString().slice(0, 10)
}

/**
 * Map URL path -> funnel step for passive page-view tracking.
 *
 * Only steps a page view genuinely proves. `/register` used to map to
 * `view_pricing`, which inflated that step with people who never saw the
 * pricing page; the register form reports `sign_up` on success instead.
 */
export function funnelStepForPath(pathname = '') {
	const path = String(pathname || '').split('?')[0]
	if (!path) return null
	if (path.includes('/pricing')) return 'view_pricing'
	if (path.includes('/plans/')) return 'view_program'
	if (path.includes('/start')) return 'begin_checkout'
	return null
}

/**
 * Crawlers, uptime probes and preview fetchers.
 *
 * They hit `/` far more often than people do, and every one of them used to
 * land in "Site sessions" as the denominator of the whole funnel.
 */
const BOT_UA = /(bot|crawl|spider|slurp|headless|preview|monitor|uptime|pingdom|curl|wget|python-requests|node-fetch|axios|lighthouse|pagespeed|gtmetrix|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|facebookexternalhit|whatsapp|telegrambot|discordbot|embedly|vercel-screenshot)/i

export function isBotUserAgent(userAgent = '') {
	const ua = String(userAgent || '').trim()
	if (!ua) return true // no UA at all is a script, not a browser
	return BOT_UA.test(ua)
}
