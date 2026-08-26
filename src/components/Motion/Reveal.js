'use client'

import { useEffect } from 'react'

/**
 * Scroll reveal, done once for the whole page.
 *
 * The `data-sc-motion="on"` flag is set from JS, so elements are only ever
 * hidden when something is present to reveal them. If the script fails the
 * page still renders fully — never a blank section waiting on an observer.
 */
export default function RevealProvider() {
	useEffect(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
		if (reduceMotion.matches) return

		const root = document.documentElement
		root.setAttribute('data-sc-motion', 'on')

		const targets = document.querySelectorAll('.sc-reveal')
		if (!targets.length) {
			root.removeAttribute('data-sc-motion')
			return
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue
					entry.target.setAttribute('data-visible', 'true')
					observer.unobserve(entry.target)
				}
			},
			{ rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
		)

		for (const target of targets) observer.observe(target)

		// Anything already in view on load should not wait for a scroll event.
		window.requestAnimationFrame(() => {
			for (const target of targets) {
				const rect = target.getBoundingClientRect()
				if (rect.top < window.innerHeight) {
					target.setAttribute('data-visible', 'true')
					observer.unobserve(target)
				}
			}
		})

		return () => {
			observer.disconnect()
			root.removeAttribute('data-sc-motion')
		}
	}, [])

	return null
}
