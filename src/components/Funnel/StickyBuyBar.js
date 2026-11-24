'use client'

import { useEffect, useState } from 'react'
import KitBuyButton from './KitBuyButton'
import styles from '@/app/[locale]/funnel.module.css'

/**
 * Buy bar pinned to the bottom of the screen once the hero button has
 * scrolled away, so the offer is always one tap away on a phone.
 */
export default function StickyBuyBar({ kitId, title, price, watchId }) {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const target = document.getElementById(watchId)
		if (!target || typeof IntersectionObserver === 'undefined') return undefined
		const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0))
		observer.observe(target)
		return () => observer.disconnect()
	}, [watchId])

	return (
		<div className={styles.stickyBar} data-show={show ? 'true' : 'false'} aria-hidden={!show}>
			<div>
				<strong>{title}</strong>
				<span>{price} one-time · 30-day money-back</span>
			</div>
			<KitBuyButton kitId={kitId} className="sc-btn sc-btn-primary">
				Get it - {price}
			</KitBuyButton>
		</div>
	)
}
