import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import ProgramPricingFlow from '@/components/Billing/ProgramPricingFlow'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { LANDING_PROGRAMS } from '@/lib/landingPrograms'
import { LEGAL } from '@/lib/legalConfig'
import styles from '../page.module.css'

export const metadata = {
	title: 'Pricing — SmartCode',
	description: `Subscribe to Roblox Studio, Python, or AI at Work separately. ${LEGAL.trialDays}-day free trial on each program.`,
}

export default async function PricingPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />

			<header className={styles.topBar}>
				<nav className={styles.pillNav} aria-label="Primary">
					<Link href="/" className={styles.navBrand}>
						<Image
							src="/logo.jpeg"
							alt=""
							width={32}
							height={32}
							className={styles.navMark}
							priority
						/>
						SmartCode
					</Link>
					<div className={styles.navRight}>
						<Link href="/#programs" className={styles.navQuiet}>
							Programs
						</Link>
						<Link href="/login" className={styles.navQuiet}>
							Log in
						</Link>
						<Link href="/register" className={styles.navCta}>
							Create account
						</Link>
					</div>
				</nav>
			</header>

			<section className={styles.section} id="pricing">
				<div className={styles.sectionHead}>
					<h1 className={styles.sectionTitle}>Pick a program. Master it.</h1>
					<p className={styles.sectionLede}>
						Choose a path, then Standard ($14) or Premium ($20 with live lessons).
						Free for {LEGAL.trialDays} days.
					</p>
				</div>

				<div className={styles.pricingWrap}>
					<Suspense fallback={<p className={styles.sectionLede}>Loading plans…</p>}>
						<ProgramPricingFlow programs={LANDING_PROGRAMS} />
					</Suspense>
				</div>
			</section>

			<footer className={styles.footer}>
				<div className={styles.footerInner}>
					<span className={styles.footerBrand}>SmartCode</span>
					<div className={styles.footerLinks}>
						<Link href="/terms">Terms</Link>
						<Link href="/privacy">Privacy</Link>
						<Link href="/refund">Refunds</Link>
					</div>
					<p className={styles.footerNote}>
						Payments handled by Paddle, our Merchant of Record.
					</p>
				</div>
			</footer>
		</div>
	)
}
