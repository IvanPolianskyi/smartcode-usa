/**
 * Funnel events, sent to whichever tags are configured.
 *
 * Nothing here throws and nothing here blocks: an ad blocker, a missing tag id
 * or a failed script must never be able to stop a sale. Every call is a no-op
 * until the matching NEXT_PUBLIC_* id is set, so the site behaves identically
 * with no analytics configured at all.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || ''

export const ANALYTICS_ENABLED = Boolean(GA_ID || META_PIXEL_ID || TIKTOK_PIXEL_ID)

/** Meta and TikTok use their own names for the same funnel steps. */
const META_EVENTS = {
	view_program: 'ViewContent',
	begin_checkout: 'InitiateCheckout',
	sign_up: 'CompleteRegistration',
	start_trial: 'StartTrial',
	purchase: 'Purchase',
}

const TIKTOK_EVENTS = {
	view_program: 'ViewContent',
	begin_checkout: 'InitiateCheckout',
	sign_up: 'CompleteRegistration',
	start_trial: 'Subscribe',
	purchase: 'CompletePayment',
}

/**
 * Report one funnel step.
 * @param {'view_program'|'begin_checkout'|'sign_up'|'start_trial'|'purchase'|'plan_change'} event
 * @param {Record<string, unknown>} [params]
 */
export function track(event, params = {}) {
	if (typeof window === 'undefined') return

	try {
		if (typeof window.gtag === 'function') {
			window.gtag('event', event, params)
		}
		if (typeof window.fbq === 'function' && META_EVENTS[event]) {
			window.fbq('track', META_EVENTS[event], params)
		}
		if (typeof window.ttq?.track === 'function' && TIKTOK_EVENTS[event]) {
			window.ttq.track(TIKTOK_EVENTS[event], params)
		}
	} catch {
		// Analytics is never allowed to break the page it measures.
	}

	try {
		fetch('/api/analytics/event', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event,
				params,
				path: window.location.pathname,
			}),
			keepalive: true,
			credentials: 'same-origin',
		}).catch(() => {})
	} catch {
		// First-party funnel store is best-effort.
	}
}
