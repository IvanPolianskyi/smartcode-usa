import { getCollection } from './mongodb.js'
import { dayKeyFromDate } from './funnelSteps.js'

/**
 * Kit landing-page analytics: one collection, one row per event.
 *
 * Separate from the site funnel (`analyticsEvents`), which keeps one row per
 * step per session. Here we want every scroll milestone, section view, CTA
 * click and checkout state, so we can see where on the page and where inside
 * the Paddle overlay people drop off. No IP, no email - only a random browser
 * id (`kid`) generated on the page, so a purchase can be tied back to the
 * visit and its traffic source.
 */

export const KIT_EVENTS = 'kitEvents'

/** Every event the page and the webhook may write. Anything else is dropped. */
export const KIT_EVENT_NAMES = new Set([
	'page_view',
	'scroll',
	'section_view',
	'cta_click',
	'faq_open',
	'clip_play',
	'leave',
	'iab_shown',
	'iab_open_chrome',
	'iab_copy_link',
	'iab_pay_here',
	'iab_continue',
	'checkout_open',
	'checkout_email',
	'payment_attempt',
	'payment_failed',
	'checkout_error',
	'checkout_closed',
	'checkout_completed',
	'purchase',
])

/** Events only the server (Paddle webhook) may write. */
export const SERVER_ONLY_EVENTS = new Set(['purchase'])

const ID_RE = /^[a-z0-9_-]{6,64}$/i

export function cleanId(value) {
	const s = String(value || '').trim()
	return ID_RE.test(s) ? s : null
}

/** Keep only short primitive props; never let the page write arbitrary blobs. */
export function sanitizeProps(props) {
	const out = {}
	if (!props || typeof props !== 'object') return out
	let n = 0
	for (const [key, value] of Object.entries(props)) {
		if (n >= 16) break
		if (!/^[a-z0-9_]{1,32}$/i.test(key)) continue
		if (typeof value === 'number' && Number.isFinite(value)) out[key] = Math.round(value * 100) / 100
		else if (typeof value === 'boolean') out[key] = value
		else if (typeof value === 'string') out[key] = value.slice(0, 160)
		else continue
		n += 1
	}
	return out
}

/** Device and in-app browser from the user agent, decided on the server. */
export function classifyUserAgent(ua = '') {
	const s = String(ua || '')
	const app = /Instagram/i.test(s)
		? 'instagram'
		: /FBAN|FBAV|FB_IAB|FBIOS/i.test(s)
			? 'facebook'
			: /musical_ly|BytedanceWebview|TikTok/i.test(s)
				? 'tiktok'
				: /Snapchat/i.test(s)
					? 'snapchat'
					: null
	const os = /iPhone|iPad|iPod/i.test(s) ? 'ios' : /Android/i.test(s) ? 'android' : /Windows/i.test(s) ? 'windows' : /Mac OS X/i.test(s) ? 'mac' : 'other'
	const device = /iPhone|iPod|Android.*Mobile|Mobile/i.test(s) ? 'phone' : /iPad|Tablet|Android/i.test(s) ? 'tablet' : 'desktop'
	return { app, browser: app ? `${app}-app` : 'browser', os, device }
}

let indexes = null
async function ensureIndexes(col) {
	if (indexes) return indexes
	indexes = Promise.allSettled([
		col.createIndex({ createdAt: -1 }, { name: 'kit_createdAt' }),
		col.createIndex({ name: 1, createdAt: -1 }, { name: 'kit_name_createdAt' }),
		col.createIndex({ kid: 1, createdAt: 1 }, { name: 'kit_kid' }),
		col.createIndex(
			{ dedupeKey: 1 },
			{ unique: true, name: 'kit_dedupe', partialFilterExpression: { dedupeKey: { $type: 'string' } } }
		),
	])
	return indexes
}

/**
 * Write one kit event. Never throws - analytics must not break a page view or
 * a webhook. `dedupeKey` makes server writes exactly-once.
 */
export async function recordKitEvent({
	name,
	kid = null,
	sid = null,
	props = {},
	context = {},
	dedupeKey = null,
	occurredAt = new Date(),
} = {}) {
	if (!KIT_EVENT_NAMES.has(name)) return { ok: false, reason: 'unknown event' }
	try {
		const col = await getCollection(KIT_EVENTS)
		await ensureIndexes(col)
		const doc = {
			name,
			kid: cleanId(kid),
			sid: cleanId(sid),
			props: sanitizeProps(props),
			src: context.src ? String(context.src).slice(0, 40) : null,
			utm: context.utm && typeof context.utm === 'object' ? sanitizeProps(context.utm) : null,
			ref: context.ref ? String(context.ref).slice(0, 80) : null,
			device: context.device || null,
			os: context.os || null,
			browser: context.browser || null,
			country: context.country ? String(context.country).slice(0, 2).toUpperCase() : null,
			variant: context.variant ? String(context.variant).slice(0, 40) : null,
			dayKey: dayKeyFromDate(occurredAt),
			createdAt: occurredAt,
		}
		if (context.test) doc.test = true
		if (dedupeKey) doc.dedupeKey = String(dedupeKey)
		await col.insertOne(doc)
		return { ok: true }
	} catch (error) {
		if (error?.code === 11000) return { ok: true, duplicate: true }
		console.warn('[kit-events] write failed:', error?.message)
		return { ok: false, reason: 'write failed' }
	}
}
