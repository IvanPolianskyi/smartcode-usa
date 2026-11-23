'use client'

import { useState } from 'react'
import styles from '@/app/[locale]/funnel.module.css'

/** "Email me my access link again" - the same answer whether or not the email bought. */
export default function KitResendForm() {
	const [email, setEmail] = useState('')
	const [state, setState] = useState('idle')
	const [error, setError] = useState('')

	async function submit(e) {
		e.preventDefault()
		setError('')
		setState('sending')
		try {
			const response = await fetch('/api/kit/resend', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			})
			const data = await response.json().catch(() => ({}))
			if (!response.ok) throw new Error(data.error || 'Could not send. Try again.')
			setState('sent')
		} catch (err) {
			setError(err.message)
			setState('idle')
		}
	}

	if (state === 'sent') {
		return (
			<p className={styles.muted}>
				If that email bought a kit, a new access link is on its way. Check spam and
				promotions too.
			</p>
		)
	}

	return (
		<form className={styles.form} onSubmit={submit} noValidate>
			<label className={styles.field} htmlFor="kit-resend-email">
				Email you used at checkout
				<input
					id="kit-resend-email"
					className={styles.input}
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
					required
				/>
			</label>
			{error ? <p className={styles.error}>{error}</p> : null}
			<button type="submit" className="sc-btn sc-btn-ghost" disabled={state === 'sending'}>
				{state === 'sending' ? 'Sending…' : 'Email me my access link'}
			</button>
		</form>
	)
}
