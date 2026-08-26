'use client'

import { useEffect, useRef, useState } from 'react'
import { DEMO_SCENES } from '@/components/Visual/DemoScenes'
import styles from '@/app/[locale]/page.module.css'

const FADE_MS = 520
const HOLD_MS = 5800

/**
 * Hero product card. Every scene keeps its own persistent layer - mounting the
 * outgoing scene fresh used to restart its CSS timeline, so the old scene
 * flashed back to an empty frame 0 while it was fading out. Layers stay put and
 * only `data-state` moves: "idle" strips the animations (that's the rewind),
 * "shown" replays them from the top, "out" leaves them alone so the scene
 * fades away still holding its payoff frame.
 */
export default function HeroDemo() {
	const [index, setIndex] = useState(0)
	const [prev, setPrev] = useState(null)
	const indexRef = useRef(0)

	useEffect(() => {
		const reduce =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (reduce) return undefined

		const id = window.setInterval(() => {
			const curr = indexRef.current
			const next = (curr + 1) % DEMO_SCENES.length
			indexRef.current = next
			setPrev(curr)
			setIndex(next)
		}, HOLD_MS)

		return () => window.clearInterval(id)
	}, [])

	useEffect(() => {
		if (prev === null) return undefined
		const id = window.setTimeout(() => setPrev(null), FADE_MS)
		return () => window.clearTimeout(id)
	}, [prev, index])

	return (
		<figure className={styles.productCard}>
			<div className={styles.productMediaStack}>
				{DEMO_SCENES.map((scene, i) => {
					const Scene = scene.Component
					const state = i === index ? 'shown' : i === prev ? 'out' : 'idle'
					return (
						<div
							key={scene.id}
							className={styles.productLayer}
							data-state={state}
							aria-hidden={state === 'shown' ? undefined : true}
						>
							<Scene />
						</div>
					)
				})}
			</div>
		</figure>
	)
}
