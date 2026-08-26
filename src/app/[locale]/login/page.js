'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Eye, EyeOff } from 'lucide-react'
import { login } from '@/lib/authClient'
import { normalizeLoginIdentifier } from '@/lib/authLogin'
import StickyNav from '@/components/Nav/StickyNav'
import styles from './Auth.module.css'

const PERKS = [
	'Pick up where you left off in your lessons',
	'Jump into Discord and keep building with peers',
	'Manage Standard or Premium from your dashboard',
]

const PROGRAMS = [
	{ tone: 'coral', label: 'Roblox Studio' },
	{ tone: 'cyan', label: 'Python' },
	{ tone: 'violet', label: 'AI at Work' },
]

function LoginAside() {
	return (
		<aside className={styles.aside}>
			<p className={styles.asideEyebrow}>Welcome back</p>
			<h2 className={styles.asideTitle}>
				Your workspace is <em>ready.</em>
			</h2>
			<p className={styles.asideLede}>
				Log in to continue lessons, check your progress, and manage your
				subscription.
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
			<div className={styles.programRow} aria-label="Programs">
				{PROGRAMS.map((p) => (
					<span key={p.label} className={styles.programPill} data-tone={p.tone}>
						<span className={styles.programDot} />
						{p.label}
					</span>
				))}
			</div>
		</aside>
	)
}

function LoginForm() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [formData, setFormData] = useState({ email: '', password: '' })
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		const prefill = String(searchParams.get('email') || '').trim()
		if (prefill) {
			setFormData((prev) => ({ ...prev, email: prefill }))
		}
	}, [searchParams])

	const banner = useMemo(() => {
		const err = searchParams.get('error')
		if (err === 'magic_expired') {
			return {
				kind: 'warn',
				text: 'That sign-in link has expired. Log in with your password, or ask support for a new link.',
			}
		}
		if (err === 'magic_missing') {
			return {
				kind: 'warn',
				text: 'That sign-in link is incomplete. Open the full link from your email.',
			}
		}
		if (
			searchParams.get('paid') === '1' ||
			searchParams.get('needAccount') === '1' ||
			searchParams.get('claimOrder')
		) {
			return {
				kind: 'info',
				text: 'Log in to continue. New here? Create an account, then subscribe to a program.',
			}
		}
		return null
	}, [searchParams])

	const registerHref = useMemo(() => {
		const qs = searchParams.toString()
		return qs ? `/register?${qs}` : '/register'
	}, [searchParams])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const redirectParam =
				new URLSearchParams(window.location.search).get('redirect') || ''
			const loginId = normalizeLoginIdentifier(formData.email)
			const data = await login(loginId, formData.password)
			window.dispatchEvent(new Event('auth:login'))
			const primary = String(data?.user?.studentProfile?.primaryCourseId || '').trim()
			const safeRedirect =
				redirectParam.startsWith('/') && !redirectParam.startsWith('//')
					? redirectParam
					: primary
						? `/courses/${primary}`
						: '/dashboard'
			router.push(safeRedirect)
			router.refresh()
		} catch (err) {
			setError(err.message || 'Could not log in. Check your email and password.')
		} finally {
			setLoading(false)
		}
	}

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<div className={styles.panel}>
			<p className={styles.label}>Account</p>
			<h1 className={styles.title}>Log in</h1>
			<p className={styles.lede}>
				Email and password for your SmartCode account.
			</p>

			<div className={styles.programRowCompact} aria-label="Programs">
				{PROGRAMS.map((p) => (
					<span key={p.label} className={styles.programPill} data-tone={p.tone}>
						<span className={styles.programDot} />
						{p.label}
					</span>
				))}
			</div>

			{banner ? (
				<div
					className={banner.kind === 'warn' ? styles.bannerWarn : styles.bannerInfo}
					role="status"
				>
					{banner.text}
				</div>
			) : null}

			{error ? <div className={styles.error}>{error}</div> : null}

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.field}>
					<label htmlFor="email" className={styles.fieldLabel}>
						Email
					</label>
					<input
						type="text"
						id="email"
						name="email"
						autoComplete="username"
						inputMode="email"
						value={formData.email}
						onChange={handleChange}
						required
						className={styles.input}
						placeholder="you@example.com"
					/>
				</div>

				<div className={styles.field}>
					<div className={styles.passwordRow}>
						<label htmlFor="password" className={styles.fieldLabel}>
							Password
						</label>
						<Link href="/forgot-password" className={styles.forgot}>
							Forgot password?
						</Link>
					</div>
					<div className={styles.inputWrap}>
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							className={styles.input}
							placeholder="••••••••"
							autoComplete="current-password"
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
				</div>

				<button
					type="submit"
					disabled={loading}
					className={`sc-btn sc-btn-primary sc-btn-lg ${styles.submit}`}
				>
					{loading ? 'Signing in…' : 'Log in'}
				</button>
			</form>

			<div className={styles.footer}>
				<p>
					Don&apos;t have an account?{' '}
					<Link href={registerHref}>Create account</Link>
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

export default function LoginPage() {
	return (
		<div className={styles.page} data-theme="light">
			<StickyNav
				className={styles.nav}
				innerClassName={styles.navInner}
				brand={<AuthBrand />}
			>
				<div className={styles.navLinks}>
					<Link href="/register" className={styles.navLink}>
						Create account
					</Link>
					<Link href="/login" className="sc-btn sc-btn-primary">
						Log in
					</Link>
				</div>
			</StickyNav>

			<main className={styles.main}>
				<div className={styles.shell}>
					<LoginAside />
					<Suspense fallback={<div className={styles.panel} />}>
						<LoginForm />
					</Suspense>
				</div>
			</main>
		</div>
	)
}
