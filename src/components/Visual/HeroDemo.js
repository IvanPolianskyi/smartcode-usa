'use client'

import { useEffect, useRef, useState } from 'react'
import { DEMO_SCENES } from '@/components/Visual/DemoScenes'
import styles from '@/app/[locale]/page.module.css'

const FADE_MS = 520
const HOLD_MS = 5200

/** Hero product card — outgoing fades over the next scene (no empty flash). */
export default function HeroDemo() {
	const [index, setIndex] = useState(0)
	const [prev, setPrev] = useState(null)
	const indexRef = useRef(0)

	useEffect(() => {
		const reduce =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (reduce) return undefined

		const id = setInterval(() => {
			const curr = indexRef.current
			const next = (curr + 1) % DEMO_SCENES.length
			indexRef.current = next
			setPrev(curr)
			setIndex(next)
		}, HOLD_MS)

		return () => clearInterval(id)
	}, [])

	useEffect(() => {
		if (prev === null) return undefined
		const id = window.setTimeout(() => setPrev(null), FADE_MS)
		return () => clearTimeout(id)
	}, [prev, index])

	const current = DEMO_SCENES[index]
	const Current = current.Component
	const outgoing = prev !== null ? DEMO_SCENES[prev] : null
	const Outgoing = outgoing?.Component

	return (
		<figure className={styles.productCard}>
			<div className={styles.productMediaStack}>
				{/* Next scene sits fully opaque underneath — no fade-in from empty. */}
				<div key={current.id} className={styles.productLayer} data-state="shown">
					<Current />
				</div>
				{Outgoing ? (
					<div className={styles.productLayer} data-state="out" aria-hidden>
						<Outgoing />
					</div>
				) : null}
			</div>
		</figure>
	)
}
