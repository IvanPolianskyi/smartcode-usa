'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { track } from '@/lib/analytics'
import styles from '@/app/[locale]/funnel.module.css'

function formatWhen(iso) {
	if (!iso) return ''
	try {
		return new Intl.DateTimeFormat(undefined, {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			timeZoneName: 'short',
		}).format(new Date(iso))
	} catch {
		return new Date(iso).toUTCString()
	}
}

/**
 * Free live build sign-up: shows the next event in the visitor's own time
 * zone, takes a first name + email, then shows the join / calendar links.
 */
export default function LiveSignup() {
	const searchParams = useSearchParams()
	const source = searchParams.get('src') || searchParams.get('utm_source') || ''

	const [event, setEvent] = useState(null)
	const [loaded, setLoaded] = useState(false)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [website, setWebsite] = useState('')
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState('')
	const [done, setDone] = useState(null)

	useEffect(() => {
		let cancelled = false
		fetch('/api/live/next')
			.then((r) => (r.ok ? r.json() : { event: null }))
			.then((data) => {
				if (!cancelled) setEvent(data?.event || null)
			})
			.catch(() => {})
			.finally(() => {
				if (!cancelled) setLoaded(true)
			})
		return () => {
			cancelled = true
		}
	}, [])

	async function onSubmit(e) {
		e.preventDefault()
		setError('')
		setBusy(true)
		try {
			const response = await fetch('/api/live/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, website, source, eventId: event?.id }),
			})
			const data = await response.json().catch(() => ({}))
			if (!response.ok) throw new Error(data.error || 'Could not sign you up. Try again.')
			track('live_register', { source: source || 'direct', waitlist: Boolean(data.waitlist) })
			setDone(data)
		} catch (err) {
			setError(err.message || 'Could not sign you up. Try again.')
		} finally {
			setBusy(false)
		}
	}

	if (done) {
		return (
			<div className={`${styles.card} ${styles.success}`}>
				<h2 className={styles.cardTitle}>
					{done.waitlist ? "You're on the list" : "You're in"}
				</h2>
				{done.event ? (
					<>
						<p className={styles.when}>{formatWhen(done.event.startsAt)}</p>
						<p className={styles.muted}>
							We emailed you the link. Add it to your calendar so you get a
							reminder, and join our Discord so you are ready when we go live.
						</p>
						<div className={styles.row}>
							<a href={done.event.joinUrl} className="sc-btn sc-btn-primary" target="_blank" rel="noopener noreferrer">
								Open the live build link
							</a>
							<a href={done.event.calendarUrl} className="sc-btn sc-btn-ghost" target="_blank" rel="noopener noreferrer">
								Google Calendar
							</a>
							<a href={done.event.icsUrl} className="sc-btn sc-btn-ghost">
								Apple / Outlook
							</a>
						</div>
					</>
				) : (
					<p className={styles.muted}>
						The next live build is being scheduled. We will email you the date and
						link as soon as it is set.
					</p>
				)}
				<div className={styles.row}>
					<a href={done.discordUrl} className="sc-btn sc-btn-ghost" target="_blank" rel="noopener noreferrer">
						Join our Discord
					</a>
					<Link href="/free" className="sc-btn sc-btn-ghost">
						Start building free
					</Link>
				</div>
				{!done.emailSent ? (
					<p className={styles.fine}>
						If the email does not arrive in a few minutes, check spam or use the
						links above.
					</p>
				) : null}
			</div>
		)
	}

	return (
		<div className={styles.card}>
			{!loaded ? (
				<p className={styles.muted}>Loading the next date…</p>
			) : event ? (
				<>
					<h2 className={styles.cardTitle}>{event.title}</h2>
					<p className={styles.when}>{formatWhen(event.startsAt)}</p>
					{event.description ? <p className={styles.muted}>{event.description}</p> : null}
				</>
			) : (
				<>
					<h2 className={styles.cardTitle}>The next live build is being scheduled</h2>
					<p className={styles.muted}>
						Leave your email and we will send you the date and link first.
					</p>
				</>
			)}

			<form className={styles.form} onSubmit={onSubmit} noValidate>
				<label className={styles.field} htmlFor="live-name">
					First name
					<input
						id="live-name"
						className={styles.input}
						value={name}
						onChange={(e) => setName(e.target.value)}
						autoComplete="given-name"
						maxLength={60}
					/>
				</label>
				<label className={styles.field} htmlFor="live-email">
					Email
					<input
						id="live-email"
						className={styles.input}
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value)
							if (error) setError('')
						}}
						autoComplete="email"
						required
					/>
				</label>
				<label className={styles.honeypot} aria-hidden="true">
					Website
					<input tabIndex={-1} value={website} onChange={(e) => setWebsite(e.target.value)} autoComplete="off" />
				</label>
				{error ? <p className={styles.error}>{error}</p> : null}
				<button type="submit" className="sc-btn sc-btn-primary sc-btn-lg" disabled={busy}>
					{busy ? 'Saving your spot…' : event ? 'Save my spot - free' : 'Notify me'}
				</button>
				<p className={styles.fine}>
					Free. We email you the link and a reminder. No spam - unsubscribe anytime.
				</p>
			</form>
		</div>
	)
}
