'use client'

import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import StickyNav from '@/components/Nav/StickyNav'
import HomeNavAuth from '@/components/Nav/HomeNavAuth'
import styles from './SiteHeader.module.css'

function Brand({ href, asAnchor }) {
	const content = (
		<>
			<div className={styles.logoWrap}>
				<Image
					src="/logo.jpeg"
					alt=""
					width={32}
					height={32}
					className={styles.mark}
					priority
				/>
			</div>
			SmartCode
			<span className={styles.tag}> - Roblox games with AI</span>
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

/**
 * Same action cluster everywhere: Pricing · account · optional CTA/logout.
 * Matches the homepage pill header in both guest and signed-in states.
 */
function NavActions({ ctaHref, ctaAsAnchor, onLogout }) {
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
			<Link href="/live" className={styles.quiet}>
				Live build
			</Link>
			<Link href="/club" className={styles.quiet}>
				Club
			</Link>
			<HomeNavAuth />
			{cta}
			{!loading && user && typeof onLogout === 'function' ? (
				<button type="button" className={styles.logout} onClick={onLogout}>
					<LogOut size={15} aria-hidden />
					Log out
				</button>
			) : null}
		</>
	)
}

/**
 * Shared floating pill header for every public/LMS surface.
 *
 * @param {'home' | 'marketing' | 'lms'} [variant]
 *   `home` keeps in-page anchors (#top / #programs). Other variants link home.
 * @param {(() => void) | null} [onLogout]
 *   When set (dashboard), shows Log out next to the account chip.
 */
export default function SiteHeader({
	variant = 'marketing',
	onLogout = null,
	children = null,
}) {
	const isHome = variant === 'home'
	const brandHref = isHome ? '#top' : '/'
	const ctaHref = '/free'

	// Sales pages keep visitors on the offer: brand only, no other exits.
	const actions = variant === 'sales' ? null : children || (
		<NavActions
			ctaHref={ctaHref}
			ctaAsAnchor={false}
			onLogout={onLogout}
		/>
	)

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
