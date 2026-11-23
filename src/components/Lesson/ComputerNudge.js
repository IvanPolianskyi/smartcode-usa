'use client'

import { useEffect, useState } from 'react'
import { Laptop } from 'lucide-react'
import { track } from '@/lib/analytics'
import styles from './AiHelper.module.css'

function isPhone() {
	if (typeof navigator === 'undefined') return false
	return /iPhone|iPod|Android.*Mobile|Instagram|FBAN|FBAV/i.test(navigator.userAgent)
}

/**
 * Roblox Studio runs on Windows and Mac only. On a phone, offer to email the
 * lesson link so the student opens it on a computer later.
 */
export default function ComputerNudge({ lessonId }) {
	const [show, setShow] = useState(false)
	const [state, setState] = useState('idle') // idle | sending | sent | error
	const [message, setMessage] = useState('')

	useEffect(() => {
		setShow(isPhone())
	}, [])

	if (!show) return null

	async function send() {
		setState('sending')
		try {
			const response = await fetch('/api/lesson-link', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ lessonId }),
			})
			const data = await response.json().catch(() => ({}))
			if (!response.ok) throw new Error(data.error || 'Could not send the email.')
			setState('sent')
			setMessage(`Sent to ${data.email}. Open it on your computer.`)
			track('lesson_link_emailed', { lesson_id: lessonId })
		} catch (err) {
			setState('error')
			setMessage(err.message)
		}
	}

	async function copy() {
		try {
			await navigator.clipboard.writeText(window.location.href)
			setMessage('Link copied.')
		} catch {
			setMessage(window.location.href)
		}
	}

	return (
		<div className={styles.upsell} role="note" style={{ marginTop: '1rem' }}>
			<strong style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
				<Laptop size={18} aria-hidden="true" /> Build this on your computer
			</strong>
			<span>
				Roblox Studio runs on Windows and Mac, not on phones. Read the lesson
				here, then open it on your computer to build along.
			</span>
			<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
				<button
					type="button"
					className="sc-btn sc-btn-primary"
					onClick={send}
					disabled={state === 'sending' || state === 'sent'}
				>
					{state === 'sending' ? 'Sending…' : state === 'sent' ? 'Email sent' : 'Email me the link'}
				</button>
				<button type="button" className="sc-btn sc-btn-ghost" onClick={copy}>
					Copy link
				</button>
			</div>
			{message ? <span style={{ fontSize: '0.9rem' }}>{message}</span> : null}
		</div>
	)
}
