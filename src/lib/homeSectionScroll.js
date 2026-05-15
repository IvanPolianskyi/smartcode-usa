/**
 * Home page anchor scrolling. Client navigation to `/#section` often does not
 * scroll after paint; we retry until lazy sections mount and use sessionStorage
 * when coming from another route.
 */
export const HOME_SECTION_SCROLL_STORAGE_KEY = 'sc_scroll_to'

export function parseHomeHashTarget(href) {
	if (typeof href !== 'string') return null
	const m = href.match(/^\/#([\w-]+)$/)
	return m ? m[1] : null
}

export function setPendingHomeSectionScroll(id) {
	try {
		if (id) sessionStorage.setItem(HOME_SECTION_SCROLL_STORAGE_KEY, id)
	} catch {}
}

export function readAndClearPendingHomeSectionScroll() {
	try {
		const v = sessionStorage.getItem(HOME_SECTION_SCROLL_STORAGE_KEY)
		if (v) sessionStorage.removeItem(HOME_SECTION_SCROLL_STORAGE_KEY)
		return v
	} catch {
		return null
	}
}

export function scrollToHomeSectionId(id) {
	if (typeof document === 'undefined' || !id) return false
	const el = document.getElementById(id)
	if (!el) return false
	el.scrollIntoView({ behavior: 'smooth', block: 'start' })
	return true
}

/** Retries until the element exists (dynamic sections) or maxMs elapsed. */
export function scheduleScrollToHomeSectionId(id, options = {}) {
	if (typeof window === 'undefined' || !id) return () => {}
	const intervalMs = options.intervalMs ?? 80
	const maxMs = options.maxMs ?? 10000
	const start = Date.now()
	if (scrollToHomeSectionId(id)) return () => {}
	const timer = window.setInterval(() => {
		if (scrollToHomeSectionId(id) || Date.now() - start > maxMs) {
			window.clearInterval(timer)
		}
	}, intervalMs)
	return () => window.clearInterval(timer)
}
