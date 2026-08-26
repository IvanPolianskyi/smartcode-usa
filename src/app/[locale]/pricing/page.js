import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import ProgramPricingFlow from '@/components/Billing/ProgramPricingFlow'
import SiteHeader from '@/components/Nav/SiteHeader'
import { Link } from '@/i18n/navigation'
import { LANDING_PROGRAMS } from '@/lib/landingPrograms'
import { BILLING_TIERS } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import styles from '../page.module.css'

export default async function PricingPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />

			<SiteHeader />

			<section className={styles.section} id="pricing">
				<div className={styles.sectionHead}>
					<h1 className={styles.sectionTitle}>Pick your program</h1>
					<p className={styles.sectionLede}>
						{BILLING_TIERS.standard.monthlyPrice}/month for one program, or{' '}
						{BILLING_TIERS.premium.monthlyPrice}/month with two live lessons a
						week. Free for {LEGAL.trialDays} days - nothing is charged today, and
						you can cancel anytime.
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
