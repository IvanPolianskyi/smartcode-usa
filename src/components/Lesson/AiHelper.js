'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { track } from '@/lib/analytics'
import styles from './AiHelper.module.css'

const STARTERS = [
	'Explain this lesson in simple words',
	'My script does not work - what is wrong?',
	'How would I build this faster with AI?',
	'Give me a hint for the practice task',
]

/**
 * "Ask the AI helper" panel under each Roblox lesson. Knows the lesson the
 * student is on; the student can paste their script or an Output error.
 */
export default function AiHelper({ lessonId }) {
	const [thread, setThread] = useState([])
	const [question, setQuestion] = useState('')
	const [code, setCode] = useState('')
	const [showCode, setShowCode] = useState(false)
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState('')
	const [limitReached, setLimitReached] = useState(null)
	const [usage, setUsage] = useState(null)
	const [signedOut, setSignedOut] = useState(false)
	const endRef = useRef(null)

	useEffect(() => {
		fetch('/api/ai/helper', { credentials: 'include' })
			.then((r) => {
				if (r.status === 401) setSignedOut(true)
				return r.ok ? r.json() : null
			})
			.then((data) => data && setUsage(data))
			.catch(() => {})
	}, [])

	useEffect(() => {
		endRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
	}, [thread.length])

	async function ask(text) {
		const q = String(text || '').trim()
		if (!q || busy) return
		setError('')
		setBusy(true)
		const history = thread
		setThread((t) => [...t, { role: 'user', text: code ? `${q}\n\n[code attached]` : q }])
		setQuestion('')
		try {
			const response = await fetch('/api/ai/helper', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ lessonId, question: q, code, history }),
			})
			const data = await response.json().catch(() => ({}))
			if (!response.ok) {
				if (data.limitReached) {
					setLimitReached({ isMember: data.isMember, limit: data.limit })
					track('ai_helper_limit', { member: Boolean(data.isMember) })
				}
				throw new Error(data.error || 'The AI helper could not answer. Try again.')
			}
			setThread((t) => [...t, { role: 'assistant', text: data.answer }])
			setUsage((u) => ({ ...(u || {}), used: data.used, limit: data.limit, isMember: data.isMember }))
			setCode('')
			setShowCode(false)
			track('ai_helper_question', { lesson_id: lessonId })
		} catch (err) {
			setThread((t) => t.slice(0, -1))
			setQuestion(q)
			setError(err.message)
		} finally {
			setBusy(false)
		}
	}

	const left = usage ? Math.max(0, (usage.limit || 0) - (usage.used || 0)) : null

	if (signedOut) {
		const back = typeof window !== 'undefined' ? window.location.pathname : '/free'
		return (
			<section className={styles.panel} aria-labelledby="ai-helper-title">
				<h2 id="ai-helper-title" className={styles.title}>
					<Sparkles size={18} aria-hidden="true" /> AI helper
				</h2>
				<p className={styles.intro}>
					Stuck? The AI helper explains this lesson, your script and the errors
					from Output. Create a free account to ask - no card needed.
				</p>
				<div className={styles.row}>
					<Link href={`/register?redirect=${encodeURIComponent(back)}`} className="sc-btn sc-btn-primary">
						Create a free account
					</Link>
					<Link href={`/login?redirect=${encodeURIComponent(back)}`} className="sc-btn sc-btn-ghost">
						Log in
					</Link>
				</div>
			</section>
		)
	}

	return (
		<section className={styles.panel} aria-labelledby="ai-helper-title">
			<div className={styles.head}>
				<h2 id="ai-helper-title" className={styles.title}>
					<Sparkles size={18} aria-hidden="true" /> AI helper
				</h2>
				{left !== null ? (
					<span className={styles.counter}>
						{left} of {usage.limit} questions left today
					</span>
				) : null}
			</div>

			{thread.length === 0 ? (
				<>
					<p className={styles.intro}>
						Stuck? Ask about this lesson, paste your script or the error from the
						Output window, and the AI helper explains what is going on.
					</p>
					<div className={styles.chips}>
						{STARTERS.map((s) => (
							<button key={s} type="button" className={styles.chip} onClick={() => ask(s)} disabled={busy}>
								{s}
							</button>
						))}
					</div>
				</>
			) : (
				<div className={styles.thread} aria-live="polite">
					{thread.map((m, i) =>
						m.role === 'user' ? (
							<div key={i} className={styles.msgUser}>
								{m.text}
							</div>
						) : (
							<div
								key={i}
								className={styles.msgAi}
								dangerouslySetInnerHTML={{ __html: markdownToHtml(m.text) }}
							/>
						)
					)}
					{busy ? <div className={styles.msgAi}>Thinking…</div> : null}
					<div ref={endRef} />
				</div>
			)}

			{limitReached ? (
				<div className={styles.upsell}>
					{limitReached.isMember ? (
						<span>You have used today&apos;s questions. They come back at midnight UTC.</span>
					) : (
						<>
							<span>
								You have used your free questions for today. Club members get{' '}
								<strong>50 questions a day</strong>, the full course and live builds.
							</span>
							<div className={styles.row}>
								<Link href="/club" className="sc-btn sc-btn-primary">
									See the club
								</Link>
							</div>
						</>
					)}
				</div>
			) : null}

			<form
				className={styles.form}
				onSubmit={(e) => {
					e.preventDefault()
					ask(question)
				}}
			>
				<label htmlFor="ai-helper-question" className="sr-only">
					Your question
				</label>
				<textarea
					id="ai-helper-question"
					className={styles.textarea}
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
					placeholder="Ask anything about this lesson or your game…"
					maxLength={2000}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault()
							ask(question)
						}
					}}
				/>
				{showCode ? (
					<>
						<label htmlFor="ai-helper-code" className="sr-only">
							Your script or error
						</label>
						<textarea
							id="ai-helper-code"
							className={`${styles.textarea} ${styles.code}`}
							value={code}
							onChange={(e) => setCode(e.target.value)}
							placeholder="Paste your Luau script or the error from Output"
							maxLength={12000}
							spellCheck={false}
						/>
					</>
				) : null}
				<div className={styles.row}>
					<button type="submit" className="sc-btn sc-btn-primary" disabled={busy || !question.trim()}>
						{busy ? 'Thinking…' : 'Ask'}
					</button>
					{!showCode ? (
						<button type="button" className={styles.linkBtn} onClick={() => setShowCode(true)}>
							+ Paste my code or error
						</button>
					) : null}
				</div>
				{error ? <p className={styles.error}>{error}</p> : null}
				<p className={styles.fine}>
					AI can make mistakes - test the code in Roblox Studio. Don&apos;t share
					personal information in your questions.
				</p>
			</form>
		</section>
	)
}
