/**
 * Browser side of the kit analytics. Client-only.
 *
 * - `kid` is a random id kept in localStorage (no personal data). It is also
 *   passed to Paddle as custom data, so the webhook's purchase row joins the
 *   visit that led to it.
 * - Events are queued and sent in small batches with sendBeacon, so tracking
 *   never slows the page or blocks a click.
 * - Nothing here throws.
 */

const KID_KEY = 'sc_kid'
const SID_KEY = 'sc_ksid'
const SRC_KEY = 'sc_src'
const UTM_KEY = 'sc_utm'
const ENDPOINT = '/api/kit/event'
const URGENT = new Set(['cta_click', 'checkout_open', 'payment_attempt', 'payment_failed', 'checkout_completed', 'iab_open_chrome', 'iab_pay_here'])

let queue = []
let timer = null
let memoryIds = null

function randomId(prefix) {
	const rnd = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6)
	return `${prefix}_${Date.now().toString(36)}_${rnd}`
}

function store(kind) {
	try {
		return kind === 'local' ? window.localStorage : window.sessionStorage
	} catch {
		return null
	}
}

/** Stable ids for this browser (kid) and this tab session (sid). */
export function kitIds() {
	if (typeof window === 'undefined') return { kid: null, sid: null }
	if (memoryIds) return memoryIds
	const local = store('local')
	const session = store('session')
	let kid = local?.getItem(KID_KEY) || null
	if (!kid) {
		kid = randomId('k')
		try {
			local?.setItem(KID_KEY, kid)
		} catch {
			/* private mode */
		}
	}
	let sid = session?.getItem(SID_KEY) || null
	if (!sid) {
		sid = randomId('s')
		try {
			session?.setItem(SID_KEY, sid)
		} catch {
			/* private mode */
		}
	}
	memoryIds = { kid, sid }
	return memoryIds
}

/** Traffic source: ?src= or utm_source, remembered for the visit. */
export function readSource() {
	try {
		const params = new URLSearchParams(window.location.search)
		const raw = params.get('src') || params.get('utm_source') || ''
		const clean = /^[a-z0-9_-]{1,32}$/i.test(raw) ? raw.toLowerCase() : ''
		if (clean) window.sessionStorage.setItem(SRC_KEY, clean)
		return clean || window.sessionStorage.getItem(SRC_KEY) || 'direct'
	} catch {
		return 'direct'
	}
}

function readUtm() {
	try {
		const params = new URLSearchParams(window.location.search)
		const utm = {}
		for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
			const v = params.get(k)
			if (v) utm[k.replace('utm_', '')] = v.slice(0, 80)
		}
		if (Object.keys(utm).length) window.sessionStorage.setItem(UTM_KEY, JSON.stringify(utm))
		return Object.keys(utm).length ? utm : JSON.parse(window.sessionStorage.getItem(UTM_KEY) || 'null')
	} catch {
		return null
	}
}

function referrerHost() {
	try {
		if (!document.referrer) return null
		const host = new URL(document.referrer).hostname.replace(/^www\./, '')
		return host === window.location.hostname.replace(/^www\./, '') ? null : host
	} catch {
		return null
	}
}

function envelope(events) {
	const { kid, sid } = kitIds()
	return JSON.stringify({ kid, sid, src: readSource(), utm: readUtm(), ref: referrerHost(), events })
}

export function flushKitEvents() {
	if (typeof window === 'undefined' || !queue.length) return
	const batch = queue.splice(0, 20)
	const body = envelope(batch)
	try {
		const sent = navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: 'text/plain' }))
		if (!sent) {
			fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }).catch(() => {})
		}
	} catch {
		/* analytics never breaks the page */
	}
	if (queue.length) flushKitEvents()
}

/** Queue one event; urgent ones (clicks, checkout steps) go out at once. */
export function kitTrack(name, props = {}) {
	if (typeof window === 'undefined') return
	try {
		queue.push({ name, props })
		if (URGENT.has(name)) {
			flushKitEvents()
			return
		}
		clearTimeout(timer)
		timer = setTimeout(flushKitEvents, 2000)
	} catch {
		/* ignore */
	}
}
