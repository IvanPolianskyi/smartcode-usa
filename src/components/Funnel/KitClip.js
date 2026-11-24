'use client'

import { useEffect, useRef } from 'react'

/**
 * Muted looping clip that only plays while on screen (saves data on phones).
 * `priority` clips (first screen) start downloading and playing right away.
 */
export default function KitClip({ src, poster, label, className, tagClassName, priority = false }) {
	const ref = useRef(null)

	useEffect(() => {
		const video = ref.current
		if (!video || typeof IntersectionObserver === 'undefined') return undefined
		if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) video.play().catch(() => {})
			else video.pause()
		})
		observer.observe(video)
		return () => observer.disconnect()
	}, [])

	return (
		<div className={className}>
			<video ref={ref} src={src} poster={poster} muted loop playsInline autoPlay={priority} preload={priority ? 'auto' : 'metadata'} aria-label={label} />
			{label ? <span className={tagClassName}>{label}</span> : null}
		</div>
	)
}
