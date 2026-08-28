'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Eye, EyeOff } from 'lucide-react'
import { register } from '@/lib/authClient'
import SiteHeader from '@/components/Nav/SiteHeader'
import { Link } from '@/i18n/navigation'
import { LEGAL } from '@/lib/legalConfig'
import { programForCourseId } from '@/lib/billingCatalog'
import { track } from '@/lib/analytics'
import { loadPaddle } from '@/lib/paddleClient'
import {
	parseStartRedirect,
	readPromoCode,
	runAuthenticatedCheckout,
	startPath,
} from '@/lib/startCheckout'
import GoogleSignInButton from '@/components/Auth/GoogleSignInButton'
import styles from '../login/Auth.module.css'

const PERKS = [
	`${LEGAL.trialDays} days free - nothing is charged today`,
	'Write real code and get it checked instantly',
	'Private Discord with other builders',
	`Cancel anytime · ${LEGAL.refundDays}-day money-back`,
]

function RegisterAside() {
	return (
		<aside className={styles.aside}>
			<p className={styles.asideEyebrow}>Start free</p>
			<h2 className={styles.asideTitle}>
				Build things people <em>actually use.</em>
			</h2>
			<p className={styles.asideLede}>
				Create your account in under a minute, pick a program, and write your
				first line of code today.
			</p>
			<ul className={styles.perkList}>
				{PERKS.map((text) => (
					<li key={text}>
						<span className={styles.perkIcon} aria-hidden="true">
							<Check strokeWidth={2.75} />
						</span>
						<span>{text}</span>
					</li>
				))}
			</ul>
		</aside>
	)
}

function RegisterForm() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [error, setError] = useState('')
	// 'idle' | 'creating' | 'checkout' - the button has to say which of the two
	// waits the visitor is in, otherwise creating an account and opening Paddle
	// look like one stuck spinner.
	const [stage, setStage] = useState('idle')
	const [showPassword, setShowPassword] = useState(false)
	const loading = stage !== 'idle'

	useEffect(() => {
		const prefill = String(searchParams.get('email') || '').trim()
		if (prefill) {
			setFormData((prev) => ({ ...prev, email: prefill }))
		}
	}, [searchParams])

	/**
	 * The purchase already in progress, carried in the resume redirect. When it
	 * is set, this page finishes the sale itself instead of handing off to
	 * `/start` - that hand-off cost a navigation, a session round trip and a
	 * cold Paddle.js load, all of it spent staring at a spinner.
	 */
	const checkoutIntent = useMemo(
		() => parseStartRedirect(searchParams.get('redirect')),
		[searchParams]
	)

	/**
	 * Naming the chosen program keeps the purchase visible across the account
	 * step instead of telling someone who just picked Roblox that they pick a
	 * program next.
	 */
	const chosenProgram = useMemo(
		() => (checkoutIntent ? programForCourseId(checkoutIntent.courseId) : null),
		[checkoutIntent]
	)

	// Warm Paddle.js while the form is being filled in. `loadPaddle` caches its
	// promise, so the call after submit reuses this one instead of waiting on a
	// cold CDN fetch. A failed preload is silent - checkout reports for real.
	useEffect(() => {
		if (!checkoutIntent) return
		loadPaddle().catch(() => {})
	}, [checkoutIntent])

	const banner = useMemo(() => {
		if (searchParams.get('paid') === '1') {
			return {
				kind: 'info',
				text: chosenProgram
					? `Create your account to continue with ${chosenProgram.label}.`
					: 'Create your account to continue.',
			}
		}
		return null
	}, [searchParams, chosenProgram])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setStage('creating')

		let user = null
		try {
			// No `privacyAccepted` flag: consent is the submit itself, and the
			// server records it that way rather than claiming a box was ticked.
			const data = await register({
				email: formData.email,
				password: formData.password,
			})
			user = data?.user || null
			track('sign_up', { method: 'password' })
			window.dispatchEvent(new Event('auth:login'))
		} catch (err) {
			setError(err.message || 'Could not create your account.')
			setStage('idle')
			return
		}

		// Not a purchase in progress - follow the redirect as before.
		if (!checkoutIntent || !user) {
			const redirectParam =
				new URLSearchParams(window.location.search).get('redirect') || ''
			const safeRedirect =
				redirectParam.startsWith('/') && !redirectParam.startsWith('//')
					? redirectParam
					: '/pricing'
			router.push(safeRedirect)
			router.refresh()
			return
		}

		setStage('checkout')
		try {
			track('begin_checkout', {
				course_id: checkoutIntent.courseId,
				plan: checkoutIntent.plan,
				tier: checkoutIntent.tier,
			})
			const result = await runAuthenticatedCheckout({
				...checkoutIntent,
				user,
				// An account created seconds ago cannot hold a subscription, so
				// there is nothing to compare against for an upgrade.
				programs: [],
				discountCode: readPromoCode(),
				loadPaddle: () => loadPaddle(),
			})

			// Overlay is open on top of this page - leave the form mounted behind
			// it and the button disabled, or closing Paddle reveals a live form
			// for an account that already exists.
			if (result.action === 'paddle') return

			if (result.action === 'dashboard' && result.path) {
				router.push(result.path)
				router.refresh()
				return
			}
		} catch {
			// Fall through to /start below.
		}

		// Paddle could not be opened here (blocked script, missing price, an
		// upgrade path we do not handle inline). `/start` runs the same checkout
		// with a proper error screen, so hand off rather than dead-end.
		router.push(startPath(checkoutIntent))
		router.refresh()
	}

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		})
	}

	const loginHref = useMemo(() => {
		const qs = searchParams.toString()
		return qs ? `/login?${qs}` : '/login'
	}, [searchParams])

	return (
		<div className={styles.panel}>
			<p className={styles.label}>Account</p>
			<h1 className={styles.title}>Create account</h1>
			<p className={styles.lede}>
				{chosenProgram
					? `Free to join. Next step is checkout for ${chosenProgram.label} - nothing is charged today.`
					: 'Free to join. You pick a program next - nothing is charged today.'}
			</p>

			{banner ? (
				<div
					className={banner.kind === 'warn' ? styles.bannerWarn : styles.bannerInfo}
					role="status"
				>
					{banner.text}
				</div>
			) : null}

			{error ? <div className={styles.error}>{error}</div> : null}

			<div className={styles.oauthBlock}>
				<GoogleSignInButton label="Sign up with Google" defaultRedirect="/pricing" />
			</div>

			<div className={styles.divider} role="separator" aria-label="or">
				<span>or</span>
			</div>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.field}>
					<label htmlFor="email" className={styles.fieldLabel}>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						autoComplete="email"
						autoFocus
						value={formData.email}
						onChange={handleChange}
						required
						className={styles.input}
						placeholder="you@example.com"
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="password" className={styles.fieldLabel}>
						Password
					</label>
					<div className={styles.inputWrap}>
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							minLength={6}
							className={styles.input}
							placeholder="At least 6 characters"
							autoComplete="new-password"
						/>
						<button
							type="button"
							className={styles.toggle}
							onClick={() => setShowPassword(!showPassword)}
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
					<p className={styles.hint}>Use 6+ characters. You can change it later.</p>
				</div>

				<button
					type="submit"
					disabled={loading}
					className={`sc-btn sc-btn-primary sc-btn-lg ${styles.submit}`}
				>
					{stage === 'checkout'
						? 'Opening checkout…'
						: stage === 'creating'
							? 'Creating account…'
							: chosenProgram
								? `Create account & continue`
								: 'Create account'}
				</button>

				{/* Clickwrap: the notice rides on the button instead of a separate
				    checkbox that people miss and then get an error for. */}
				<p className={styles.consentNote}>
					By creating an account you agree to our{' '}
					<Link href="/terms" target="_blank">
						Terms of Service
					</Link>
					,{' '}
					<Link href="/privacy" target="_blank">
						Privacy Policy
					</Link>
					, and{' '}
					<Link href="/refund" target="_blank">
						Refund Policy
					</Link>
					.
				</p>
			</form>

			<div className={styles.footer}>
				<p>
					Already have an account? <Link href={loginHref}>Log in</Link>
				</p>
			</div>
		</div>
	)
}

export default function RegisterPage() {
	return (
		<div className={styles.page} data-theme="light">
			<SiteHeader />

			<main className={styles.main}>
				<div className={styles.shell}>
					<RegisterAside />
					<Suspense fallback={<div className={styles.panel} />}>
						<RegisterForm />
					</Suspense>
				</div>
			</main>
		</div>
	)
}
