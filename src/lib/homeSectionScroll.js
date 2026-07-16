/**
 * Home page anchor scrolling. Client navigation to `/#section` often does not
 * scroll after paint; we retry until lazy sections mount and use sessionStorage
 * when coming from another route.
 */
export const HOME_SECTION_SCROLL_STORAGE_KEY = 'sc_scroll_to'
export const SCROLL_HOME_SECTION_EVENT = 'sc:scroll-home-section'

const HEADER_SCROLL_OFFSET = 88

/** Cancels the previous in-flight scroll retry loop. */
let activeScrollCleanup = null

export function parseHomeHashTarget(href) {
	if (typeof href !== 'string') return null
	const m = href.match(/^\/#([\w-]+)$/)
	return m ? m[1] : null
}

export function isHomePathname(pathname) {
	if (!pathname) return false
	return pathname === '/'
}

export function getHomeBasePath() {
	return '/'
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

export function unlockBodyScrollLock(savedScrollY, { restorePosition = true } = {}) {
	if (typeof document === 'undefined') return
	document.body.style.position = ''
	document.body.style.top = ''
	document.body.style.left = ''
	document.body.style.right = ''
	document.body.style.width = ''
	if (restorePosition && typeof savedScrollY === 'number' && savedScrollY > 0) {
		window.scrollTo(0, savedScrollY)
	}
}

export function scrollToHomeSectionId(id) {
	if (typeof document === 'undefined' || !id) return false
	const el = document.getElementById(id)
	if (!el) return false
	const top =
		el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET
	const preferSmooth =
		typeof window.matchMedia === 'function' &&
		window.matchMedia('(hover: hover) and (pointer: fine)').matches
	window.scrollTo({
		top: Math.max(0, top),
		behavior: preferSmooth ? 'smooth' : 'auto',
	})
	return true
}

/** Retries until the element exists (dynamic sections) or maxMs elapsed. */
export function scheduleScrollToHomeSectionId(id, options = {}) {
	if (typeof window === 'undefined' || !id) return () => {}

	if (activeScrollCleanup) {
		activeScrollCleanup()
		activeScrollCleanup = null
	}

	const intervalMs = options.intervalMs ?? 80
	const maxMs = options.maxMs ?? 2500
	let timer = null
	let cancelled = false

	const cleanup = () => {
		cancelled = true
		if (timer != null) {
			window.clearInterval(timer)
			timer = null
		}
		if (activeScrollCleanup === cleanup) {
			activeScrollCleanup = null
		}
	}

	const tryScroll = () => {
		if (cancelled) return
		if (scrollToHomeSectionId(id)) return
		const start = Date.now()
		timer = window.setInterval(() => {
			if (cancelled) {
				window.clearInterval(timer)
				timer = null
				return
			}
			if (scrollToHomeSectionId(id) || Date.now() - start > maxMs) {
				window.clearInterval(timer)
				timer = null
			}
		}, intervalMs)
	}

	activeScrollCleanup = cleanup

	requestAnimationFrame(() => {
		requestAnimationFrame(tryScroll)
	})

	return cleanup
}

/** Scroll on the current home page (also updates hash). */
export function requestHomeSectionScroll(sectionId) {
	if (typeof window === 'undefined' || !sectionId) return () => {}
	setPendingHomeSectionScroll(sectionId)
	try {
		const base = getHomeBasePath(window.location.pathname)
		window.history.replaceState(null, '', `${base}#${sectionId}`)
	} catch {}
	const cancel = scheduleScrollToHomeSectionId(sectionId)
	window.dispatchEvent(
		new CustomEvent(SCROLL_HOME_SECTION_EVENT, { detail: { id: sectionId } })
	)
	return cancel
}

/**
 * Navigate to a home section from header/footer links.
 * @param {string} sectionId
 * @param {{ push: (url: string) => void }} router - Next.js router
 * @param {{ onBeforeNavigate?: () => void }} [options]
 */
export function navigateToHomeSection(sectionId, router, options = {}) {
	if (typeof window === 'undefined' || !sectionId) return
	options.onBeforeNavigate?.()
	const path = window.location.pathname
	if (isHomePathname(path)) {
		requestHomeSectionScroll(sectionId)
		return
	}
	setPendingHomeSectionScroll(sectionId)
	const base = getHomeBasePath(path)
	router.push(`${base}#${sectionId}`)
}
