'use client'

import { useCallback, useEffect, useState } from 'react'
import { Link } from '@/i18n/navigation'
import CheckoutButton from '@/components/Billing/CheckoutButton'
import { BILLING_PROGRAMS } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import styles from './SubscriptionPanel.module.css'

/**
 * Subscription state and self-service management.
 *
 * Lists each active program subscription. "Manage or cancel" opens Paddle's
 * customer portal for card updates and cancellations.
 */

function formatDate(value) {
	if (!value) return null
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) return null
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

function daysUntil(value) {
	if (!value) return null
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) return null
	const diff = Math.ceil((date.getTime() - Date.now()) / 86400000)
	return diff > 0 ? diff : 0
}

function statusCopy(program) {
	switch (program?.status) {
		case 'trialing': {
			const left = daysUntil(program.trialEndsAt ?? program.endsAt)
			return {
				tone: 'trial',
				label: 'Free trial',
				line:
					left === null
						? 'Your trial is active.'
						: `${left} ${left === 1 ? 'day' : 'days'} left.`,
			}
		}
		case 'active':
			return {
				tone: 'ok',
				label: 'Active',
				line: program.cancelAtPeriodEnd
					? 'Cancelled. You keep access until the end of this period.'
					: 'Full access to this program.',
			}
		case 'past_due':
			return {
				tone: 'warn',
				label: 'Payment failed',
				line: program.inGrace
					? 'Update your card to keep access.'
					: 'Access has paused because we could not take payment.',
			}
		case 'paused':
			return { tone: 'warn', label: 'Paused', line: 'This subscription is paused.' }
		case 'canceled':
			return {
				tone: program.active ? 'ok' : 'off',
				label: 'Cancelled',
				line: program.active
					? 'You keep access until the end of the period you paid for.'
					: 'Access has ended.',
			}
		default:
			return { tone: 'off', label: 'Inactive', line: '' }
	}
}

export default function SubscriptionPanel() {
	const [status, setStatus] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [opening, setOpening] = useState(false)

	useEffect(() => {
		let cancelled = false

		async function load() {
			try {
				const response = await fetch('/api/billing/status', { credentials: 'include' })
				if (!response.ok) throw new Error('Could not load your subscription')
				const data = await response.json()
				if (!cancelled) setStatus(data)
			} catch (caught) {
				if (!cancelled) setError(caught.message)
			} finally {
				if (!cancelled) setLoading(false)
			}
		}

		load()
		return () => {
			cancelled = true
		}
	}, [])

	const openPortal = useCallback(async () => {
		setOpening(true)
		setError(null)
		try {
			const response = await fetch('/api/billing/portal', {
				method: 'POST',
				credentials: 'include',
			})
			if (!response.ok) throw new Error('Could not open the billing portal')
			const data = await response.json()
			if (!data.overviewUrl) throw new Error('The billing portal is unavailable')
			window.location.href = data.overviewUrl
		} catch (caught) {
			setError(caught.message)
			setOpening(false)
		}
	}, [])

	if (loading) {
		return (
			<section className={styles.panel} aria-busy="true">
				<p className={styles.loading}>Loading your subscriptions…</p>
			</section>
		)
	}

	const activeCourseIds = new Set(status?.courseIds || [])
	const programs = status?.programs || []
	const missing = BILLING_PROGRAMS.filter((p) => !activeCourseIds.has(p.courseId))

	if (!programs.length) {
		return (
			<section className={styles.panel}>
				<header className={styles.head}>
					<h2 className={styles.title}>Subscriptions</h2>
					<span className={`${styles.pill} ${styles.pillOff}`}>None yet</span>
				</header>
				<p className={styles.line}>
					Standard $14/mo (platform + Discord) or Premium $20/mo (adds 2 live
					lessons). {LEGAL.trialDays}-day free trial on each.
				</p>
				<div className={styles.subscribeGrid}>
					{BILLING_PROGRAMS.map((program) => (
						<div key={program.courseId} className={styles.subscribeItem}>
							<span className={styles.subscribeLabel}>{program.label}</span>
							<div className={styles.subscribeActions}>
								<CheckoutButton
									courseId={program.courseId}
									plan="monthly"
									tier="standard"
									className="sc-btn sc-btn-primary"
								>
									Standard
								</CheckoutButton>
								<CheckoutButton
									courseId={program.courseId}
									plan="monthly"
									tier="premium"
									className="sc-btn sc-btn-ghost"
								>
									Premium
								</CheckoutButton>
							</div>
						</div>
					))}
				</div>
				<p className={styles.small}>
					Or see all options on the{' '}
					<Link href="/pricing" className={styles.inlineLink}>
						pricing page
					</Link>
					.
				</p>
				{error ? <p className={styles.error}>{error}</p> : null}
			</section>
		)
	}

	return (
		<section className={styles.panel}>
			<header className={styles.head}>
				<h2 className={styles.title}>Subscriptions</h2>
				<span className={`${styles.pill} ${styles.pillok}`}>
					{programs.length} active
				</span>
			</header>

			<ul className={styles.programList}>
				{programs.map((program) => {
					const copy = statusCopy(program)
					const renews = formatDate(program.endsAt)
					return (
						<li
							key={program.paddleSubscriptionId || program.courseIds?.join('-')}
							className={styles.programRow}
						>
							<div className={styles.programMain}>
								<strong className={styles.programName}>{program.label}</strong>
								<span className={`${styles.pill} ${styles[`pill${copy.tone}`] || ''}`}>
									{copy.label}
								</span>
								{program.planTier === 'premium' ? (
									<span className={`${styles.pill} ${styles.pillok}`}>Premium</span>
								) : program.planTier === 'standard' ? (
									<span className={`${styles.pill} ${styles.pillOff}`}>Standard</span>
								) : null}
							</div>
							{copy.line ? <p className={styles.line}>{copy.line}</p> : null}
							{renews ? (
								<p className={styles.small}>
									{program.cancelAtPeriodEnd || program.status === 'canceled'
										? 'Access until'
										: 'Next payment'}{' '}
									{renews}
									{program.billingInterval
										? ` · ${program.billingInterval === 'year' ? 'Yearly' : 'Monthly'}`
										: ''}
								</p>
							) : null}
						</li>
					)
				})}
			</ul>

			{missing.length > 0 ? (
				<div className={styles.addMore}>
					<p className={styles.line}>Add another program:</p>
					<div className={styles.subscribeGrid}>
						{missing.map((program) => (
							<div key={program.courseId} className={styles.subscribeItem}>
								<span className={styles.subscribeLabel}>{program.label}</span>
								<div className={styles.subscribeActions}>
									<CheckoutButton
										courseId={program.courseId}
										plan="monthly"
										tier="standard"
										className="sc-btn sc-btn-ghost"
									>
										Standard
									</CheckoutButton>
									<CheckoutButton
										courseId={program.courseId}
										plan="monthly"
										tier="premium"
										className="sc-btn sc-btn-ghost"
									>
										Premium
									</CheckoutButton>
								</div>
							</div>
						))}
					</div>
				</div>
			) : null}

			<div className={styles.actions}>
				<button
					type="button"
					className="sc-btn sc-btn-ghost"
					onClick={openPortal}
					disabled={opening}
				>
					{opening ? 'Opening…' : 'Manage or cancel'}
				</button>
			</div>

			<p className={styles.small}>
				Billing is handled by Paddle, our Merchant of Record. Cancelling takes two
				clicks and you keep access until the end of the period you paid for.
			</p>

			{error ? <p className={styles.error}>{error}</p> : null}
		</section>
	)
}
