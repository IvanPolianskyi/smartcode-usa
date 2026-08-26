'use client'

import styles from './DemoScenes.module.css'

/**
 * Brilliant-style lesson previews: light canvas + soft pastel code blocks.
 * Each scene is a single-shot CSS timeline over `--dur`. HeroDemo rewinds by
 * flipping the layer to data-state="idle" (strips animations); payoff holds
 * through the crossfade.
 *
 * Beat map (percent of --dur):
 *   0-18   blocks settle in
 *   18-78  loop executes — canvas builds step by step
 *   78-100 payoff holds
 */

function LoopIcon({ className }) {
	return (
		<svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
			<path
				d="M3.2 4.2A4.2 4.2 0 0 1 11 5.5M10.8 9.8A4.2 4.2 0 0 1 3 8.5"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
			/>
			<path d="M10.2 3.2l1.2 2.4-2.5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M3.8 10.8l-1.2-2.4 2.5-.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function Tick({ className }) {
	return (
		<svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
			<path
				d="M2.6 7.4l3 3 5.9-6.6"
				stroke="currentColor"
				strokeWidth="1.9"
				strokeLinecap="round"
				strokeLinejoin="round"
				pathLength="1"
			/>
		</svg>
	)
}

/* Spiral squares — matches Brilliant CS “draw square in a loop” demo */
const SPIRAL_COUNT = 16

function SpiralCanvas() {
	const squares = Array.from({ length: SPIRAL_COUNT }, (_, i) => {
		const t = i / (SPIRAL_COUNT - 1)
		const size = 118 - i * 5.8
		const angle = i * 10
		/* Brilliant CS spiral: sunny yellow → warm orange → soft terracotta */
		const r = Math.round(255 - t * 15)
		const g = Math.round(214 - t * 110)
		const b = Math.round(88 + t * 28)
		return {
			i,
			size,
			angle,
			color: `rgb(${r}, ${g}, ${b})`,
			fill: `rgba(${r}, ${g}, ${b}, 0.1)`,
		}
	})

	return (
		<div className={styles.canvas}>
			<div className={styles.canvasFrame}>
				{squares.map(({ i, size, angle, color, fill }) => (
					<span
						key={i}
						className={styles.spiralSq}
						style={{
							'--sq-i': i,
							'--sq-size': `${size}px`,
							'--sq-angle': `${angle}deg`,
							'--sq-color': color,
							'--sq-fill': fill,
						}}
					/>
				))}
			</div>
		</div>
	)
}

/* ============================================================ Python */

export function DemoPython() {
	return (
		<div className={`${styles.scene} ${styles.python}`} data-tone="cyan" aria-hidden="true">
			<div className={styles.lesson}>
				<span className={styles.sceneLabel}>Python</span>
				<SpiralCanvas />

				<ol className={styles.blocks}>
					<li className={`${styles.block} ${styles.blockLoop} ${styles.b1}`}>
						<span className={styles.ln}>1</span>
						<span className={styles.chip}>
							<LoopIcon className={styles.chipIcon} />
							for count from 0 to 15
						</span>
					</li>
					<li className={`${styles.block} ${styles.blockVar} ${styles.b2}`}>
						<span className={styles.ln}>2</span>
						<span className={styles.chip}>
							set size to 118 − (count × 6)
						</span>
					</li>
					<li className={`${styles.block} ${styles.blockVar} ${styles.b3}`}>
						<span className={styles.ln}>3</span>
						<span className={styles.chip}>
							set color to (255, 214 − count × 7, 88 + count)
						</span>
					</li>
					<li className={`${styles.block} ${styles.blockVar} ${styles.b4}`}>
						<span className={styles.ln}>4</span>
						<span className={styles.chip}>
							set angle to count × 10
						</span>
					</li>
					<li className={`${styles.block} ${styles.blockDraw} ${styles.b5}`}>
						<span className={styles.ln}>5</span>
						<span className={styles.chip}>
							draw square color size
						</span>
					</li>
				</ol>

				<div className={styles.cursor} aria-hidden="true" />
			</div>
		</div>
	)
}

/* ============================================================ Roblox */

export function DemoRoblox() {
	return (
		<div className={`${styles.scene} ${styles.roblox}`} data-tone="coral" aria-hidden="true">
			<div className={styles.lesson}>
				<span className={styles.sceneLabel}>Roblox Studio</span>
				<div className={styles.canvas}>
					<div className={`${styles.canvasFrame} ${styles.studioFrame}`}>
						<span className={styles.gridFloor} />
						<span className={styles.partShadow} />
						<span className={styles.part}>
							<i className={styles.partTop} />
							<i className={styles.partFront} />
							<i className={styles.partSide} />
						</span>
						<span className={styles.spark} />
					</div>
				</div>

				<ol className={styles.blocks}>
					<li className={`${styles.block} ${styles.blockVar} ${styles.b1}`}>
						<span className={styles.ln}>1</span>
						<span className={styles.chip}>part = script.Parent</span>
					</li>
					<li className={`${styles.block} ${styles.blockVar} ${styles.b2}`}>
						<span className={styles.ln}>2</span>
						<span className={styles.chip}>set color to Bright red</span>
					</li>
					<li className={`${styles.block} ${styles.blockDraw} ${styles.b3}`}>
						<span className={styles.ln}>3</span>
						<span className={styles.chip}>set size to (6, 6, 6)</span>
					</li>
					<li className={`${styles.block} ${styles.blockLoop} ${styles.b4}`}>
						<span className={styles.ln}>4</span>
						<span className={styles.chip}>
							<LoopIcon className={styles.chipIcon} />
							publish to Roblox
						</span>
					</li>
				</ol>
			</div>
		</div>
	)
}

/* ============================================================ AI */

export function DemoAi() {
	return (
		<div className={`${styles.scene} ${styles.ai}`} data-tone="violet" aria-hidden="true">
			<div className={styles.lesson}>
				<span className={styles.sceneLabel}>AI</span>
				<div className={styles.canvas}>
					<div className={`${styles.canvasFrame} ${styles.planFrame}`}>
						<ul className={styles.planStack}>
							<li>
								<Tick className={styles.tick} />
								<span>
									<strong>Outline</strong>
									<em>Mon–Fri themes</em>
								</span>
							</li>
							<li>
								<Tick className={styles.tick} />
								<span>
									<strong>Hooks</strong>
									<em>5 scroll-stoppers</em>
								</span>
							</li>
							<li>
								<Tick className={styles.tick} />
								<span>
									<strong>Schedule</strong>
									<em>ready to post</em>
								</span>
							</li>
						</ul>
					</div>
				</div>

				<ol className={styles.blocks}>
					<li className={`${styles.block} ${styles.blockVar} ${styles.b1}`}>
						<span className={styles.ln}>1</span>
						<span className={styles.chip}>prompt: weekly content plan</span>
					</li>
					<li className={`${styles.block} ${styles.blockLoop} ${styles.b2}`}>
						<span className={styles.ln}>2</span>
						<span className={styles.chip}>
							<LoopIcon className={styles.chipIcon} />
							generate outline → hooks → schedule
						</span>
					</li>
					<li className={`${styles.block} ${styles.blockDraw} ${styles.b3}`}>
						<span className={styles.ln}>3</span>
						<span className={styles.chip}>save plan · ~3 hrs saved</span>
					</li>
				</ol>
			</div>
		</div>
	)
}

export const DEMO_SCENES = [
	{ id: 'python', label: 'Python', Component: DemoPython },
	{ id: 'roblox', label: 'Roblox Studio', Component: DemoRoblox },
	{ id: 'ai', label: 'AI', Component: DemoAi },
]
