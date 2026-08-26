'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Sticky header that only grows a border once the page has scrolled, so the
 * hero meets the viewport edge cleanly.
 */
export default function StickyNav({
	className,
	innerClassName,
	brand,
	children,
	ariaLabel,
}) {
	const [stuck, setStuck] = useState(false)
	const sentinel = useRef(null)

	useEffect(() => {
		const node = sentinel.current
		if (!node) return

		const observer = new IntersectionObserver(
			([entry]) => setStuck(!entry.isIntersecting),
			{ threshold: 1 }
		)
		observer.observe(node)
		return () => observer.disconnect()
	}, [])

	return (
		<>
			<div ref={sentinel} aria-hidden="true" />
			<nav className={className} data-stuck={stuck} aria-label={ariaLabel}>
				<div className={innerClassName}>
					{brand}
					{children}
				</div>
			</nav>
		</>
	)
}
