'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Matches the observer's `-10%` bottom margin: reveal just before the edge. */
const VIEW_BIAS = 0.9

/**
 * Scroll reveal, done once for the whole page.
 *
 * The `data-sc-motion="on"` flag is set from JS, so elements are only ever
 * hidden when something is present to reveal them. If the script fails the
 * page still renders fully - never a blank section waiting on an observer.
 *
 * Two things kept sections stuck at `opacity: 0`, which reads as an endless
 * gap between the hero and whatever follows it:
 *   - this provider lives in the layout, so a client-side navigation swaps the
 *     `.sc-reveal` nodes underneath an effect that only ever ran on mount;
 *   - the reveal depended entirely on IntersectionObserver, so one missed
 *     delivery left the section hidden for good.
 * Hence: re-run per route, pick up nodes that mount later, and back the
 * observer with a plain scroll sweep.
 */
export default function RevealProvider() {
	const pathname = usePathname()

	useEffect(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
		if (reduceMotion.matches) return

		const root = document.documentElement
		const pending = new Set()

		const reveal = (el) => {
			pending.delete(el)
			observer.unobserve(el)
			el.setAttribute('data-visible', 'true')
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) reveal(entry.target)
				}
			},
			// threshold 0: a section taller than the viewport can never reach a
			// percentage of its own box, and would otherwise stay hidden.
			{ rootMargin: '0px 0px -10% 0px', threshold: 0 }
		)

		const track = (el) => {
			if (el.dataset.visible === 'true' || pending.has(el)) return
			// Anything already in view should not wait for a scroll event.
			if (el.getBoundingClientRect().top < window.innerHeight * VIEW_BIAS) {
				el.setAttribute('data-visible', 'true')
				return
			}
			pending.add(el)
			observer.observe(el)
			startSweeping()
		}

		let lastSweep = 0
		const sweep = () => {
			for (const el of pending) {
				if (el.getBoundingClientRect().top < window.innerHeight * VIEW_BIAS) {
					reveal(el)
				}
			}
			if (!pending.size) stopSweeping()
		}

		// Deliberately synchronous rather than rAF-scheduled: the point of the
		// sweep is to work even when frames are not being produced.
		const onScroll = () => {
			const now = performance.now()
			if (now - lastSweep < 50) return
			lastSweep = now
			sweep()
		}

		// Backstop for the observer - one missed delivery must not leave a hole
		// in the page. Listens only while something is still hidden.
		let sweeping = false
		const startSweeping = () => {
			if (sweeping) return
			sweeping = true
			window.addEventListener('scroll', onScroll, { passive: true })
			window.addEventListener('resize', onScroll, { passive: true })
		}

		const stopSweeping = () => {
			sweeping = false
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('resize', onScroll)
		}

		const targets = document.querySelectorAll('.sc-reveal')
		if (!targets.length) {
			root.removeAttribute('data-sc-motion')
			return () => observer.disconnect()
		}

		root.setAttribute('data-sc-motion', 'on')
		for (const target of targets) track(target)

		// Sections can also mount after this effect (Suspense boundaries, lazy
		// content). Only watched on routes that actually use reveals, so pages
		// with heavy DOM churn (the lesson editor) pay nothing.
		const mutations = new MutationObserver((records) => {
			for (const record of records) {
				for (const node of record.addedNodes) {
					if (node.nodeType !== 1) continue
					if (node.classList.contains('sc-reveal')) track(node)
					for (const nested of node.querySelectorAll('.sc-reveal')) track(nested)
				}
			}
		})
		mutations.observe(document.body, { childList: true, subtree: true })

		return () => {
			mutations.disconnect()
			observer.disconnect()
			stopSweeping()
			pending.clear()
			root.removeAttribute('data-sc-motion')
		}
	}, [pathname])

	return null
}
