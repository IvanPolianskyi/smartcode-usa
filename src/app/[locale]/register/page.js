'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Eye, EyeOff } from 'lucide-react'
import { register } from '@/lib/authClient'
import StickyNav from '@/components/Nav/StickyNav'
import styles from '../login/Auth.module.css'

const PERKS = [
	'Interactive lessons — write, run, and get checked',
	'Private Discord community for builders',
	'3 days free, then pick Roblox, Python, or AI at Work',
]

const PROGRAMS = [
	{ tone: 'coral', label: 'Roblox Studio' },
	{ tone: 'cyan', label: 'Python' },
	{ tone: 'violet', label: 'AI at Work' },
]

function RegisterAside() {
	return (
		<aside className={styles.aside}>
			<p className={styles.asideEyebrow}>Start free</p>
			<h2 className={styles.asideTitle}>
				Build real skills. <em>Learn by doing.</em>
			</h2>
			<p className={styles.asideLede}>
				Create your account in a minute, then choose a program and start
				practicing right away.
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

function RegisterForm() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		privacyAccepted: false,
	})
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
		if (
			searchParams.get('needAccount') === '1' ||
			searchParams.get('paid') === '1'
		) {
			return {
				kind: 'info',
				text: 'Create an account first, then you can start a subscription for your program.',
			}
		}
		return null
	}, [searchParams])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const redirectParam =
				new URLSearchParams(window.location.search).get('redirect') || ''
			await register({
				name: formData.name,
				email: formData.email,
				password: formData.password,
				privacyAccepted: formData.privacyAccepted,
			})
			window.dispatchEvent(new Event('auth:login'))
			const safeRedirect =
				redirectParam.startsWith('/') && !redirectParam.startsWith('//')
					? redirectParam
					: '/pricing'
			router.push(safeRedirect)
			router.refresh()
		} catch (err) {
			setError(err.message || 'Could not create your account.')
		} finally {
			setLoading(false)
		}
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
				Free to join — pick a program after you sign up.
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
					<label htmlFor="name" className={styles.fieldLabel}>
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						autoComplete="name"
						value={formData.name}
						onChange={handleChange}
						required
						minLength={2}
						className={styles.input}
						placeholder="Your name"
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="email" className={styles.fieldLabel}>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						autoComplete="email"
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

				<label className={styles.checkRow}>
					<input
						type="checkbox"
						name="privacyAccepted"
						checked={formData.privacyAccepted}
						onChange={handleChange}
						required
					/>
					<span>
						I agree to the{' '}
						<Link href="/privacy" target="_blank">
							Privacy Policy
						</Link>{' '}
						and{' '}
						<Link href="/terms" target="_blank">
							Terms
						</Link>
						.
					</span>
				</label>

				<button
					type="submit"
					disabled={loading}
					className={`sc-btn sc-btn-primary sc-btn-lg ${styles.submit}`}
				>
					{loading ? 'Creating account…' : 'Create account'}
				</button>
			</form>

			<div className={styles.footer}>
				<p>
					Already have an account? <Link href={loginHref}>Log in</Link>
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

export default function RegisterPage() {
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
