'use client'

import { useState } from 'react'
import { Brain, CheckCircle2, Loader2, Terminal, XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { executePythonWithPyodide } from '@/lib/pyodideRunner'
import styles from './Interactive.module.css'

/**
 * "Guess before you run": the student commits to an answer, then the snippet
 * actually executes so the truth comes from Python, not from a stored string.
 *
 * Definition:
 *   { id, type: 'predictOutput', code, options: [...], correctAnswer, explanation }
 */
export default function PredictOutputBlock({ interactive, moduleId, completed, pending, onComplete }) {
	const t = useTranslations('lms.lesson')
	const [choice, setChoice] = useState(null)
	const [revealed, setRevealed] = useState(false)
	const [wasCorrect, setWasCorrect] = useState(false)
	const [attempts, setAttempts] = useState(0)
	const [realOutput, setRealOutput] = useState(null)
	const [running, setRunning] = useState(false)

	const options = interactive.options || []
	const locked = revealed || completed

	const handleSubmit = async () => {
		if (choice === null || locked) return

		const nextAttempts = attempts + 1
		setAttempts(nextAttempts)
		setRunning(true)

		// Show the student what Python really prints, whichever way they guessed.
		try {
			const result = await executePythonWithPyodide(interactive.code || '', {
				moduleId,
				messages: {
					timeout: t('runCodeErrors.executionTimeout'),
					workerError: t('runCodeErrors.workerError'),
					workerStartFailed: t('runCodeErrors.workerStartFailed'),
				},
			})
			setRealOutput(result.errorOutput ? result.errorOutput : result.output || '')
		} catch {
			setRealOutput(null)
		} finally {
			setRunning(false)
		}

		const verdict = await onComplete({ choice, attempts: nextAttempts })
		setWasCorrect(verdict.ok)
		setRevealed(true)
	}

	const handleRetry = () => {
		setRevealed(false)
		setChoice(null)
		setRealOutput(null)
	}

	return (
		<div className={`${styles.block} ${completed ? styles.blockDone : ''}`}>
			<div className={styles.blockHeader}>
				<span className={styles.blockKind}>
					<Brain className="w-4 h-4" />
					{t('interactive.predictLabel')}
				</span>
				{completed && (
					<span className={styles.doneBadge}>
						<CheckCircle2 className="w-4 h-4" />
						{t('interactive.done')}
					</span>
				)}
			</div>

			{interactive.prompt && <p className={styles.prompt}>{interactive.prompt}</p>}

			<pre className={styles.snippet}>{interactive.code}</pre>

			<div className={styles.options} role="radiogroup" aria-label={t('interactive.predictLabel')}>
				{options.map((option, index) => {
					const isChosen = choice === index
					const isAnswer = index === interactive.correctAnswer
					let tone = ''
					if (locked && isAnswer) tone = styles.optionCorrect
					else if (locked && isChosen && !isAnswer) tone = styles.optionWrong

					return (
						<button
							key={index}
							type="button"
							role="radio"
							aria-checked={isChosen}
							className={`${styles.option} ${isChosen ? styles.optionChosen : ''} ${tone}`}
							onClick={() => !locked && setChoice(index)}
							disabled={locked}
						>
							<span className={styles.optionMark}>
								{locked && isAnswer && <CheckCircle2 className="w-4 h-4" />}
								{locked && isChosen && !isAnswer && <XCircle className="w-4 h-4" />}
							</span>
							<pre className={styles.optionText}>{option}</pre>
						</button>
					)
				})}
			</div>

			{!locked && (
				<div className={styles.actions}>
					<button
						type="button"
						className={styles.runButton}
						onClick={handleSubmit}
						disabled={choice === null || pending || running}
					>
						{running ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" />
								{t('running')}
							</>
						) : (
							t('interactive.checkAnswer')
						)}
					</button>
				</div>
			)}

			{revealed && (
				<div className={wasCorrect ? styles.verdictOk : styles.verdictBad}>
					<strong>{wasCorrect ? t('interactive.correct') : t('interactive.notQuite')}</strong>
					{realOutput !== null && (
						<div className={styles.console}>
							<div className={styles.consoleLabel}>
								<Terminal className="w-4 h-4" />
								{t('interactive.pythonSays')}
							</div>
							<pre className={styles.consoleOut}>{realOutput || t('interactive.noOutput')}</pre>
						</div>
					)}
					{interactive.explanation && <p className={styles.explanation}>{interactive.explanation}</p>}
					{!wasCorrect && !completed && (
						<button type="button" className={styles.ghostButton} onClick={handleRetry}>
							{t('interactive.tryAgainButton')}
						</button>
					)}
				</div>
			)}
		</div>
	)
}
