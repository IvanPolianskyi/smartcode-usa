'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, PenLine, XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import styles from './Interactive.module.css'

/**
 * Fill-in-the-blank code. Cheap, fast wins that keep momentum through a long
 * explanation.
 *
 * Definition:
 *   {
 *     id, type: 'fillBlank', prompt, explanation,
 *     template: 'age = {{v}}\nprint({{p}})',      // {{blankId}} marks a gap
 *     blanks: [{ id: 'v', answer: '14', accept: ['14'], width: 4 }],
 *   }
 */
export default function FillBlankBlock({ interactive, completed, pending, onComplete }) {
	const t = useTranslations('lms.lesson')
	const [values, setValues] = useState({})
	const [checked, setChecked] = useState(false)
	const [wasCorrect, setWasCorrect] = useState(false)
	const [attempts, setAttempts] = useState(0)

	const blanks = interactive.blanks || []

	// Split the template into literal chunks and blank slots once.
	const parts = useMemo(() => {
		const template = interactive.template || ''
		const out = []
		const regex = /\{\{(\w+)\}\}/g
		let cursor = 0
		let match

		while ((match = regex.exec(template)) !== null) {
			if (match.index > cursor) out.push({ kind: 'text', value: template.slice(cursor, match.index) })
			out.push({ kind: 'blank', id: match[1] })
			cursor = match.index + match[0].length
		}
		if (cursor < template.length) out.push({ kind: 'text', value: template.slice(cursor) })
		return out
	}, [interactive.template])

	const allFilled = blanks.every((b) => String(values[b.id] ?? '').trim().length > 0)
	const locked = completed || (checked && wasCorrect)

	const handleCheck = async () => {
		if (!allFilled || locked) return
		const nextAttempts = attempts + 1
		setAttempts(nextAttempts)

		const verdict = await onComplete({ blanks: values, attempts: nextAttempts })
		setWasCorrect(verdict.ok)
		setChecked(true)
	}

	return (
		<div className={`${styles.block} ${completed ? styles.blockDone : ''}`}>
			<div className={styles.blockHeader}>
				<span className={styles.blockKind}>
					<PenLine className="w-4 h-4" />
					{t('interactive.fillLabel')}
				</span>
				{completed && (
					<span className={styles.doneBadge}>
						<CheckCircle2 className="w-4 h-4" />
						{t('interactive.done')}
					</span>
				)}
			</div>

			{interactive.prompt && <p className={styles.prompt}>{interactive.prompt}</p>}

			<pre className={styles.snippet}>
				{parts.map((part, index) => {
					if (part.kind === 'text') return <span key={index}>{part.value}</span>

					const blank = blanks.find((b) => b.id === part.id)
					const showWrong = checked && !wasCorrect
					return (
						<input
							key={index}
							className={`${styles.blankInput} ${showWrong ? styles.blankWrong : ''} ${
								locked ? styles.blankLocked : ''
							}`}
							style={{ width: `${Math.max(3, blank?.width || 6)}ch` }}
							value={locked ? blank?.answer ?? values[part.id] ?? '' : values[part.id] ?? ''}
							onChange={(e) => {
								setChecked(false)
								setValues((v) => ({ ...v, [part.id]: e.target.value }))
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault()
									handleCheck()
								}
							}}
							placeholder={blank?.placeholder || '?'}
							disabled={locked}
							spellCheck={false}
							aria-label={blank?.label || t('interactive.blankAria')}
						/>
					)
				})}
			</pre>

			{!locked && (
				<div className={styles.actions}>
					<button
						type="button"
						className={styles.runButton}
						onClick={handleCheck}
						disabled={!allFilled || pending}
					>
						{t('interactive.checkAnswer')}
					</button>
				</div>
			)}

			{checked && (
				<div className={wasCorrect ? styles.verdictOk : styles.verdictBad}>
					<strong>
						{wasCorrect ? (
							<>
								<CheckCircle2 className="w-4 h-4" /> {t('interactive.correct')}
							</>
						) : (
							<>
								<XCircle className="w-4 h-4" /> {t('interactive.notQuite')}
							</>
						)}
					</strong>
					{wasCorrect && interactive.explanation && (
						<p className={styles.explanation}>{interactive.explanation}</p>
					)}
					{!wasCorrect && interactive.hint && <p className={styles.explanation}>{interactive.hint}</p>}
				</div>
			)}
		</div>
	)
}
