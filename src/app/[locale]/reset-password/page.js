'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import StickyNav from '@/components/Nav/StickyNav'
import { Link } from '@/i18n/navigation'
import { Eye, EyeOff } from 'lucide-react'
import styles from '../login/Auth.module.css'

function ResetPasswordForm() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const token = searchParams.get('token') || ''

	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	if (!token) {
		return (
			<div className={styles.panel}>
				<p className={styles.label}>Account</p>
				<h1 className={styles.title}>Invalid Link</h1>
				<p className={styles.lede}>
					This password reset link is invalid or incomplete. Please request a fresh link.
				</p>
				<Link href="/forgot-password" className={`sc-btn sc-btn-primary ${styles.submit}`}>
					Request new reset link
				</Link>
				<div className={styles.footer}>
					<p>
						<Link href="/login">Back to log in</Link>
					</p>
				</div>
			</div>
		)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')

		if (password.length < 6) {
			setError('Password must be at least 6 characters long.')
			return
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match.')
			return
		}

		setLoading(true)
		try {
			const res = await fetch('/api/auth/reset-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token, password }),
			})

			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.error || 'Could not reset password.')
			}

			// Broadcast login to refresh auth provider and redirect to dashboard
			window.dispatchEvent(new Event('auth:login'))
			router.push('/dashboard')
			router.refresh()
		} catch (err) {
			setError(err.message || 'Something went wrong. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={styles.panel}>
			<p className={styles.label}>Account</p>
			<h1 className={styles.title}>Set new password</h1>
			<p className={styles.lede}>Choose a strong password with at least 6 characters.</p>

			{error ? <div className={styles.error}>{error}</div> : null}

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.field}>
					<label htmlFor="password" className={styles.fieldLabel}>
						New Password
					</label>
					<div className={styles.inputWrap}>
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							name="password"
							required
							minLength={6}
							className={styles.input}
							placeholder="At least 6 characters"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={loading}
						/>
						<button
							type="button"
							className={styles.toggle}
							onClick={() => setShowPassword((prev) => !prev)}
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
				</div>

				<div className={styles.field}>
					<label htmlFor="confirmPassword" className={styles.fieldLabel}>
						Confirm New Password
					</label>
					<div className={styles.inputWrap}>
						<input
							id="confirmPassword"
							type={showPassword ? 'text' : 'password'}
							name="confirmPassword"
							required
							minLength={6}
							className={styles.input}
							placeholder="Re-enter password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							disabled={loading}
						/>
					</div>
				</div>

				<button
					type="submit"
					className={`sc-btn sc-btn-primary sc-btn-lg ${styles.submit}`}
					disabled={loading}
				>
					{loading ? 'Updating password…' : 'Save and log in'}
				</button>
			</form>

			<div className={styles.footer}>
				<p>
					<Link href="/login">Back to log in</Link>
				</p>
			</div>
		</div>
	)
}

export default function ResetPasswordPage() {
	return (
		<div className={styles.page} data-theme="light">
			<StickyNav
				className={styles.nav}
				innerClassName={styles.navInner}
				brand={
					<Link href="/" className={styles.wordmark} aria-label="SmartCode home">
						<Image
							src="/logo.jpeg"
							alt=""
							width={30}
							height={30}
							className={styles.mark}
							priority
						/>
						SmartCode
					</Link>
				}
			>
				<div className={styles.navLinks}>
					<Link href="/login" className={styles.navLink}>
						Log in
					</Link>
					<Link href="/register" className="sc-btn sc-btn-primary">
						Create account
					</Link>
				</div>
			</StickyNav>

			<main className={styles.main}>
				<Suspense fallback={<div className={styles.panel}><p>Loading…</p></div>}>
					<ResetPasswordForm />
				</Suspense>
			</main>
		</div>
	)
}
