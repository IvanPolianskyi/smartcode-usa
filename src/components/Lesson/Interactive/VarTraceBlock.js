'use client'

import { useEffect, useRef, useState } from 'react'
import { Boxes, CheckCircle2, ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import styles from './Interactive.module.css'

const AUTOPLAY_MS = 1400

/**
 * Variable visualiser: steps through a snippet one line at a time and shows the
 * "labelled box" for every variable, so assignment and re-assignment stop being
 * abstract.
 *
 * Definition:
 *   {
 *     id, type: 'varTrace', prompt,
 *     code: 'age = 14\nage = age + 1',
 *     steps: [{ line: 1, note, vars: { age: { value: '14', type: 'int' } } }],
 *   }
 */
export default function VarTraceBlock({ interactive, completed, onComplete }) {
	const t = useTranslations('lms.lesson')
	const steps = interactive.steps || []
	const codeLines = (interactive.code || '').split('\n')

	const [index, setIndex] = useState(0)
	const [playing, setPlaying] = useState(false)
	const [reported, setReported] = useState(false)
	const furthest = useRef(0)

	const step = steps[index] || null

	// Track how far the student actually walked - that is what earns the XP.
	useEffect(() => {
		furthest.current = Math.max(furthest.current, index + 1)
	}, [index])

	useEffect(() => {
		if (!playing) return undefined
		if (index >= steps.length - 1) {
			setPlaying(false)
			return undefined
		}
		const timer = setTimeout(() => setIndex((i) => Math.min(i + 1, steps.length - 1)), AUTOPLAY_MS)
		return () => clearTimeout(timer)
	}, [playing, index, steps.length])

	useEffect(() => {
		if (reported || completed || !steps.length) return
		if (furthest.current < steps.length) return
		setReported(true)
		onComplete({ stepsViewed: furthest.current })
	}, [index, reported, completed, steps.length, onComplete])

	if (!steps.length) return null

	const vars = Object.entries(step?.vars || {})

	return (
		<div className={`${styles.block} ${completed ? styles.blockDone : ''}`}>
			<div className={styles.blockHeader}>
				<span className={styles.blockKind}>
					<Boxes className="w-4 h-4" />
					{t('interactive.traceLabel')}
				</span>
				{completed && (
					<span className={styles.doneBadge}>
						<CheckCircle2 className="w-4 h-4" />
						{t('interactive.done')}
					</span>
				)}
			</div>

			{interactive.prompt && <p className={styles.prompt}>{interactive.prompt}</p>}

			<div className={styles.traceLayout}>
				<pre className={styles.traceCode}>
					{codeLines.map((line, i) => (
						<div
							key={i}
							className={`${styles.traceLine} ${step?.line === i + 1 ? styles.traceLineActive : ''}`}
						>
							<span className={styles.traceLineNo}>{i + 1}</span>
							<span>{line || ' '}</span>
						</div>
					))}
				</pre>

				<div className={styles.traceVars}>
					<div className={styles.traceVarsTitle}>{t('interactive.memoryTitle')}</div>
					{vars.length === 0 && <p className={styles.traceEmpty}>{t('interactive.memoryEmpty')}</p>}
					{vars.map(([name, info]) => (
						<div key={name} className={styles.varBox}>
							<div className={styles.varName}>{name}</div>
							<div className={styles.varValue}>{String(info.value)}</div>
							{info.type && <div className={styles.varType}>{info.type}</div>}
						</div>
					))}
				</div>
			</div>

			{step?.note && <p className={styles.traceNote}>{step.note}</p>}

			<div className={styles.traceControls}>
				<button
					type="button"
					className={styles.ghostButton}
					onClick={() => {
						setPlaying(false)
						setIndex((i) => Math.max(0, i - 1))
					}}
					disabled={index === 0}
					aria-label={t('interactive.prevStep')}
				>
					<ChevronLeft className="w-4 h-4" />
				</button>

				<button
					type="button"
					className={styles.runButton}
					onClick={() => {
						if (index >= steps.length - 1) {
							setIndex(0)
							setPlaying(true)
						} else {
							setPlaying((p) => !p)
						}
					}}
				>
					{index >= steps.length - 1 ? (
						<>
							<RotateCcw className="w-4 h-4" />
							{t('interactive.replay')}
						</>
					) : playing ? (
						<>
							<Pause className="w-4 h-4" />
							{t('interactive.pause')}
						</>
					) : (
						<>
							<Play className="w-4 h-4" />
							{t('interactive.play')}
						</>
					)}
				</button>

				<button
					type="button"
					className={styles.ghostButton}
					onClick={() => {
						setPlaying(false)
						setIndex((i) => Math.min(steps.length - 1, i + 1))
					}}
					disabled={index >= steps.length - 1}
					aria-label={t('interactive.nextStep')}
				>
					<ChevronRight className="w-4 h-4" />
				</button>

				<span className={styles.traceCounter}>
					{t('interactive.stepCounter', { current: index + 1, total: steps.length })}
				</span>
			</div>
		</div>
	)
}
