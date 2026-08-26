'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import StickyNav from '@/components/Nav/StickyNav'
import { Link } from '@/i18n/navigation'
import { programForCourseId } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import { loadPaddle } from '@/lib/paddleClient'
import {
	normalizePlan,
	normalizeTier,
	runAuthenticatedCheckout,
	startPath,
} from '@/lib/startCheckout'
import styles from '../login/Auth.module.css'

function StartFlow() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const courseId = String(searchParams.get('course') || '').trim()
	const plan = normalizePlan(searchParams.get('plan'))
	const tier = normalizeTier(searchParams.get('tier'))

	const [phase, setPhase] = useState('loading') // loading | gate | checkout | error
	const [error, setError] = useState('')

	const program = courseId ? programForCourseId(courseId) : null
	const resume = startPath({ courseId, plan, tier })

	const registerHref = useMemo(
		() => `/register?needAccount=1&redirect=${encodeURIComponent(resume)}`,
		[resume]
	)
	const loginHref = useMemo(
		() => `/login?needAccount=1&redirect=${encodeURIComponent(resume)}`,
		[resume]
	)

	useEffect(() => {
		let cancelled = false

		async function boot() {
			if (!courseId) {
				setPhase('error')
				setError('Pick a program first.')
				return
			}

			try {
				const meResponse = await fetch('/api/auth/me', { credentials: 'include' })
				// A stale or missing session is the register path, not an error.
				if (!meResponse.ok && meResponse.status !== 401 && meResponse.status !== 404) {
					throw new Error('Could not check your account')
				}
				const me = meResponse.ok ? await meResponse.json() : null
				const user = me?.user || null
				if (!user?._id && !user?.id) {
					if (!cancelled) {
						router.replace(registerHref)
					}
					return
				}

				if (!cancelled) setPhase('checkout')
				const result = await runAuthenticatedCheckout({
					courseId,
					plan,
					tier,
					user,
					loadPaddle,
				})
				if (cancelled) return

				if (result.action === 'dashboard' && result.path) {
					window.dispatchEvent(new Event('auth:login'))
					router.replace(result.path)
					return
				}
				if (result.action === 'course' && result.path) {
					router.replace(result.path)
					return
				}
				if (result.action === 'error') {
					setError(result.message || 'Checkout could not be opened')
					setPhase('error')
					return
				}
				// paddle overlay open - stay on page with a short note
				setPhase('checkout')
			} catch (err) {
				if (!cancelled) {
					setError(err.message || 'Something went wrong')
					setPhase('error')
				}
			}
		}

		boot()
		return () => {
			cancelled = true
		}
	}, [courseId, plan, tier, router, registerHref])

	if (phase === 'loading' || phase === 'checkout') {
		return (
			<div className={styles.panel}>
				<p className={styles.label}>Account</p>
				<h1 className={styles.title}>
					{phase === 'loading' ? 'Checking account…' : 'Opening checkout…'}
				</h1>
				<p className={styles.lede}>
					{program?.label
						? `Getting ${program.label} ready.`
						: 'One moment while we continue.'}
				</p>
				{error ? <div className={styles.error}>{error}</div> : null}
			</div>
		)
	}

	if (phase === 'error') {
		return (
			<div className={styles.panel}>
				<p className={styles.label}>Account</p>
				<h1 className={styles.title}>Could not continue</h1>
				{error ? <div className={styles.error}>{error}</div> : null}
				<div className={styles.footer}>
					<p>
						<Link href="/#programs">Back to programs</Link>
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.panel}>
			<p className={styles.label}>Almost there</p>
			<h1 className={styles.title}>Create your account</h1>
			<p className={styles.lede}>
				{program?.label
					? `Takes about 30 seconds. Your ${LEGAL.trialDays} free days of ${program.label} start right after - nothing is charged today.`
					: `Takes about 30 seconds. Your ${LEGAL.trialDays} free days start right after - nothing is charged today.`}
			</p>
			<div className={styles.form}>
				<Link
					href={registerHref}
					className={`sc-btn sc-btn-primary sc-btn-lg ${styles.submit}`}
				>
					Create account - it&apos;s free
				</Link>
				<Link
					href={loginHref}
					className={`sc-btn sc-btn-ghost sc-btn-lg ${styles.submit}`}
				>
					I already have an account
				</Link>
			</div>
			<div className={styles.footer}>
				<p>
					Cancel anytime · Auto-renews after trial · {LEGAL.refundDays}-day
					money-back on your first charge
				</p>
				<p>
					By continuing you agree to our <Link href="/terms">Terms</Link>,{' '}
					<Link href="/refund">Refund Policy</Link>, and{' '}
					<Link href="/privacy">Privacy Policy</Link>. Payments by Paddle
					(Merchant of Record).
				</p>
				<p>
					<Link href="/#programs">Back to programs</Link>
				</p>
			</div>
		</div>
	)
}

function AuthBrand() {
	return (
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
	)
}

export default function StartPage() {
	return (
		<div className={styles.page} data-theme="light">
			<StickyNav
				className={styles.nav}
				innerClassName={styles.navInner}
				brand={<AuthBrand />}
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
				<Suspense fallback={<div className={styles.panel} />}>
					<StartFlow />
				</Suspense>
			</main>
		</div>
	)
}
