'use client'

import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import StickyNav from '@/components/Nav/StickyNav'
import HomeNavAuth from '@/components/Nav/HomeNavAuth'
import styles from './SiteHeader.module.css'

function accountLabel(user) {
	const name = String(user?.name || '').trim()
	if (name) return name.split(/\s+/)[0]
	return String(user?.email || '').split('@')[0] || 'Account'
}

function Brand({ href, asAnchor }) {
	const content = (
		<>
			<Image
				src="/logo.jpeg"
				alt=""
				width={32}
				height={32}
				className={styles.mark}
				priority
			/>
			SmartCode
			<span className={styles.tag}> - programming courses</span>
		</>
	)

	if (asAnchor) {
		return (
			<a href={href} className={styles.brand} aria-label="SmartCode home">
				{content}
			</a>
		)
	}

	return (
		<Link href={href} className={styles.brand} aria-label="SmartCode home">
			{content}
		</Link>
	)
}

function MarketingActions({ ctaHref, ctaAsAnchor }) {
	const { user, loading } = useAuthSession()
	const showCta = !loading && !user

	const cta = showCta ? (
		ctaAsAnchor ? (
			<a href={ctaHref} className={styles.cta}>
				Start free
			</a>
		) : (
			<Link href={ctaHref} className={styles.cta}>
				Start free
			</Link>
		)
	) : null

	return (
		<>
			<Link href="/pricing" className={styles.quiet}>
				Pricing
			</Link>
			<Link href="/contact" className={styles.quiet}>
				Contact
			</Link>
			<HomeNavAuth />
			{cta}
		</>
	)
}

function LmsActions({ onLogout }) {
	const { user, loading } = useAuthSession()
	const pathname = usePathname()
	const onDashboard = pathname === '/dashboard'

	if (loading) return <span aria-hidden="true" />

	if (!user) {
		return <MarketingActions ctaHref="/#programs" />
	}

	const label = accountLabel(user)

	return (
		<>
			<Link
				href="/dashboard"
				className={styles.account}
				aria-label="Open your account"
				aria-current={onDashboard ? 'page' : undefined}
				title={`${user.name || user.email} - open your account`}
			>
				<span className={styles.avatar} aria-hidden="true">
					{label.charAt(0).toUpperCase()}
				</span>
				<span className={styles.accountName}>{label}</span>
			</Link>
			{typeof onLogout === 'function' ? (
				<button type="button" className={styles.logout} onClick={onLogout}>
					<LogOut size={15} aria-hidden />
					Log out
				</button>
			) : null}
		</>
	)
}

/**
 * Shared pill header for marketing surfaces (home, pricing, plans).
 * Auth, legal, and LMS keep their own chrome.
 *
 * @param {'home' | 'marketing' | 'lms'} variant
 */
export default function SiteHeader({ variant = 'marketing', onLogout = null, children = null }) {
	const isHome = variant === 'home'
	const brandHref = isHome ? '#top' : '/'
	const ctaHref = isHome ? '#programs' : '/#programs'

	let actions = children
	if (!actions) {
		if (variant === 'lms') {
			actions = <LmsActions onLogout={onLogout} />
		} else {
			actions = (
				<MarketingActions ctaHref={ctaHref} ctaAsAnchor={isHome} />
			)
		}
	}

	return (
		<StickyNav
			className={styles.topBar}
			innerClassName={styles.pillNav}
			ariaLabel="Primary"
			brand={<Brand href={brandHref} asAnchor={isHome} />}
		>
			<div className={styles.navRight}>{actions}</div>
		</StickyNav>
	)
}
