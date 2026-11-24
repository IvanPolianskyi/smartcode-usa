'use client'

import { useEffect } from 'react'
import { flushKitEvents, kitTrack } from '@/lib/kitTrack'

const DEPTHS = [25, 50, 75, 100]

/**
 * Page-level tracking for the kit landing page (renders nothing):
 * page view, scroll depth, which sections were seen, FAQ questions opened,
 * and time on page when the visitor leaves.
 * Sections opt in with `data-kit-section="name"`; the FAQ with `data-kit-faq`.
 */
export default function KitAnalytics({ page = 'kit' }) {
	useEffect(() => {
		const started = Date.now()
		let maxDepth = 0
		const sent = new Set()
		let left = false

		kitTrack('page_view', {
			page,
			w: window.innerWidth,
			h: window.innerHeight,
		})

		function onScroll() {
			const doc = document.documentElement
			const scrollable = doc.scrollHeight - window.innerHeight
			// Phones stop a few pixels short of the very bottom - count that as 100%.
			const atBottom = window.scrollY >= scrollable - 8
			const pct = scrollable > 0 && !atBottom ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 100
			maxDepth = Math.max(maxDepth, pct)
			for (const d of DEPTHS) {
				if (maxDepth >= d && !sent.has(d)) {
					sent.add(d)
					kitTrack('scroll', { depth: d })
				}
			}
		}

		const seen = new Set()
		const observer =
			typeof IntersectionObserver === 'undefined'
				? null
				: new IntersectionObserver(
						(entries) => {
							for (const entry of entries) {
								const name = entry.target.getAttribute('data-kit-section')
								if (entry.isIntersecting && name && !seen.has(name)) {
									seen.add(name)
									kitTrack('section_view', { section: name, at_s: Math.round((Date.now() - started) / 1000) })
								}
							}
						},
						// "Seen" = any part of the section entered the upper 60% of the
						// screen. A ratio threshold never fires for sections taller than a
						// phone, and blocks already on screen at load count too.
						{ rootMargin: '0px 0px -40% 0px', threshold: 0 }
					)
		document.querySelectorAll('[data-kit-section]').forEach((el) => observer?.observe(el))

		function onToggle(event) {
			const el = event.target
			if (el?.tagName !== 'DETAILS' || !el.open || !el.closest('[data-kit-faq]')) return
			const q = el.querySelector('summary')?.textContent?.trim() || ''
			kitTrack('faq_open', { q: q.slice(0, 80) })
		}

		function leave() {
			if (left) return
			left = true
			kitTrack('leave', { seconds: Math.round((Date.now() - started) / 1000), depth: maxDepth })
			flushKitEvents()
		}
		function onVisibility() {
			if (document.visibilityState === 'hidden') {
				flushKitEvents()
				leave()
			} else {
				// Came back (e.g. from the Instagram feed): report the longer time
				// again on the next exit; the report keeps the max per session.
				left = false
			}
		}

		window.addEventListener('scroll', onScroll, { passive: true })
		document.addEventListener('toggle', onToggle, true)
		window.addEventListener('pagehide', leave)
		document.addEventListener('visibilitychange', onVisibility)
		onScroll()
		return () => {
			window.removeEventListener('scroll', onScroll)
			document.removeEventListener('toggle', onToggle, true)
			window.removeEventListener('pagehide', leave)
			document.removeEventListener('visibilitychange', onVisibility)
			observer?.disconnect()
		}
	}, [page])

	return null
}
