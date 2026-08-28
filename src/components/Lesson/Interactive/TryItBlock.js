'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, RotateCcw, Terminal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { executePythonWithPyodide } from '@/lib/pyodideRunner'
import { hasBlockedPythonCode } from '@/lib/pythonCodeGuard'
import styles from './Interactive.module.css'

/**
 * A runnable snippet embedded in the theory: the student edits real Python and
 * sees real output without leaving the explanation.
 *
 * Definition:
 *   { id, type: 'tryIt', prompt, starterCode, expect?, hint? }
 *
 * `expect` (optional) turns the block into a small challenge; the server
 * re-checks the same expectations before paying out XP.
 */
export default function TryItBlock({ interactive, moduleId, completed, pending, onComplete }) {
	const t = useTranslations('lms.lesson')
	const [code, setCode] = useState(interactive.starterCode || '')
	const [output, setOutput] = useState(null)
	const [error, setError] = useState(null)
	const [isRunning, setIsRunning] = useState(false)
	const [loadingRuntime, setLoadingRuntime] = useState(false)
	const [missed, setMissed] = useState(false)
	const [attempts, setAttempts] = useState(0)

	const isChallenge = Boolean(interactive.expect)

	const handleRun = async () => {
		if (isRunning) return

		if (hasBlockedPythonCode(code, moduleId)) {
			setError(t('runCodeErrors.dangerousCode'))
			setOutput(null)
			return
		}

		setIsRunning(true)
		setLoadingRuntime(true)
		setError(null)
		setOutput(null)
		setMissed(false)

		try {
			const result = await executePythonWithPyodide(code, {
				moduleId,
				onLoading: () => setLoadingRuntime(true),
				messages: {
					timeout: t('runCodeErrors.executionTimeout'),
					workerError: t('runCodeErrors.workerError'),
					workerStartFailed: t('runCodeErrors.workerStartFailed'),
				},
			})
			setLoadingRuntime(false)

			const stdout = result.output || ''
			setOutput(stdout)
			setError(result.errorOutput || null)

			const nextAttempts = attempts + 1
			setAttempts(nextAttempts)

			if (!result.errorOutput && !completed) {
				const verdict = await onComplete({ output: stdout, attempts: nextAttempts })
				if (!verdict.ok && isChallenge) setMissed(true)
			}
		} finally {
			setIsRunning(false)
			setLoadingRuntime(false)
		}
	}

	const handleReset = () => {
		setCode(interactive.starterCode || '')
		setOutput(null)
		setError(null)
		setMissed(false)
	}

	return (
		<div className={`${styles.block} ${completed ? styles.blockDone : ''}`}>
			<div className={styles.blockHeader}>
				<span className={styles.blockKind}>
					<Terminal className="w-4 h-4" />
					{t('interactive.tryItLabel')}
				</span>
				{completed && (
					<span className={styles.doneBadge}>
						<CheckCircle2 className="w-4 h-4" />
						{t('interactive.done')}
					</span>
				)}
			</div>

			{interactive.prompt && <p className={styles.prompt}>{interactive.prompt}</p>}

			<textarea
				className={styles.editor}
				value={code}
				onChange={(e) => setCode(e.target.value)}
				onKeyDown={(e) => {
					if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
						e.preventDefault()
						handleRun()
					}
				}}
				spellCheck={false}
				rows={Math.min(14, Math.max(3, (code.match(/\n/g)?.length || 0) + 2))}
				disabled={isRunning}
				aria-label={t('interactive.tryItLabel')}
			/>

			<div className={styles.actions}>
				<button
					type="button"
					className={styles.runButton}
					onClick={handleRun}
					disabled={isRunning || pending}
					title={`${t('runCode')} (Ctrl+Enter)`}
				>
					{isRunning ? (
						<>
							<Loader2 className="w-4 h-4 animate-spin" />
							{loadingRuntime ? t('pyodideLoading') : t('running')}
						</>
					) : (
						<>
							<Terminal className="w-4 h-4" />
							{t('runCode')}
						</>
					)}
				</button>
				<button type="button" className={styles.ghostButton} onClick={handleReset} disabled={isRunning}>
					<RotateCcw className="w-4 h-4" />
					{t('interactive.reset')}
				</button>
			</div>

			{(output !== null || error) && (
				<div className={styles.console}>
					<div className={styles.consoleLabel}>{t('executionResult')}</div>
					{output !== null && output !== '' && <pre className={styles.consoleOut}>{output}</pre>}
					{error && <pre className={styles.consoleErr}>{error}</pre>}
					{output === '' && !error && <p className={styles.consoleEmpty}>{t('interactive.noOutput')}</p>}
				</div>
			)}

			{missed && !completed && (
				<p className={styles.missHint}>
					{interactive.hint || t('interactive.tryAgain')}
				</p>
			)}
		</div>
	)
}
