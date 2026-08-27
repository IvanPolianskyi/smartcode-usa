'use client'

import { useState } from 'react'
import SiteHeader from '@/components/Nav/SiteHeader'
import { Link } from '@/i18n/navigation'
import styles from '../login/Auth.module.css'

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		const cleanEmail = email.trim()
		if (!cleanEmail) {
			setError('Please enter your email address.')
			return
		}

		setLoading(true)
		try {
			const res = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: cleanEmail }),
			})
			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.error || 'Failed to send reset link.')
			}
			setSubmitted(true)
		} catch (err) {
			setError(err.message || 'Something went wrong. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={styles.page} data-theme="light">
			<SiteHeader />

			<main className={styles.main}>
				<div className={styles.panel}>
					<p className={styles.label}>Account</p>
					<h1 className={styles.title}>Forgot password?</h1>

					{submitted ? (
						<>
							<div className={styles.bannerInfo}>
								<strong>Check your inbox</strong>
								<p style={{ margin: '8px 0 0' }}>
									If an account is associated with <strong>{email}</strong>, we’ve sent an email with a link to reset your password. The link is valid for 1 hour.
								</p>
							</div>
							<p className={styles.lede}>
								Didn’t receive the email? Check your spam folder or try requesting a new link below.
							</p>
							<button
								type="button"
								className={`sc-btn sc-btn-ghost ${styles.submit}`}
								onClick={() => {
									setSubmitted(false)
									setEmail('')
								}}
							>
								Send another link
							</button>
						</>
					) : (
						<>
							<p className={styles.lede}>
								Enter the email address for your SmartCode account and we&apos;ll send you a link to reset your password.
							</p>

							{error ? <div className={styles.error}>{error}</div> : null}

							<form onSubmit={handleSubmit} className={styles.form}>
								<div className={styles.field}>
									<label htmlFor="email" className={styles.fieldLabel}>
										Email
									</label>
									<input
										id="email"
										type="email"
										name="email"
										required
										autoComplete="email"
										className={styles.input}
										placeholder="you@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										disabled={loading}
									/>
								</div>

								<button
									type="submit"
									className={`sc-btn sc-btn-primary sc-btn-lg ${styles.submit}`}
									disabled={loading}
								>
									{loading ? 'Sending link…' : 'Send reset link'}
								</button>
							</form>
						</>
					)}

					<div className={styles.footer}>
						<p>
							<Link href="/login">Back to log in</Link>
						</p>
						<p>
							<Link href="/">Home</Link>
						</p>
					</div>
				</div>
			</main>
		</div>
	)
}
