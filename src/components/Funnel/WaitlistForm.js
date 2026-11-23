'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { track } from '@/lib/analytics'
import { TELEGRAM_URL } from '@/lib/kits'
import styles from '@/app/[locale]/funnel.module.css'

export default function WaitlistForm({ product, cta = 'Join the waitlist' }) {
	const searchParams = useSearchParams()
	const source = searchParams.get('src') || searchParams.get('utm_source') || ''
	const [email, setEmail] = useState('')
	const [website, setWebsite] = useState('')
	const [state, setState] = useState('idle')
	const [error, setError] = useState('')

	async function submit(e) {
		e.preventDefault()
		setError('')
		setState('sending')
		try {
			const response = await fetch('/api/waitlist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ product, email, website, source }),
			})
			const data = await response.json().catch(() => ({}))
			if (!response.ok) throw new Error(data.error || 'Could not save. Try again.')
			track('waitlist_join', { product, source: source || 'direct' })
			setState('done')
		} catch (err) {
			setError(err.message)
			setState('idle')
		}
	}

	if (state === 'done') {
		return (
			<div className={`${styles.card} ${styles.success}`}>
				<h2 className={styles.cardTitle}>You are on the list</h2>
				<p className={styles.muted}>We will email you the launch price first. Get the early tips in Telegram meanwhile:</p>
				<div className={styles.row}>
					<a href={TELEGRAM_URL} className="sc-btn sc-btn-primary" target="_blank" rel="noopener noreferrer">
						Join the Telegram
					</a>
				</div>
			</div>
		)
	}

	return (
		<form className={styles.form} onSubmit={submit} noValidate>
			<label className={styles.field} htmlFor="waitlist-email">
				Email
				<input id="waitlist-email" className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
			</label>
			<label className={styles.honeypot} aria-hidden="true">
				Website
				<input tabIndex={-1} value={website} onChange={(e) => setWebsite(e.target.value)} autoComplete="off" />
			</label>
			{error ? <p className={styles.error}>{error}</p> : null}
			<button type="submit" className="sc-btn sc-btn-primary sc-btn-lg" disabled={state === 'sending'}>
				{state === 'sending' ? 'Saving…' : cta}
			</button>
		</form>
	)
}
