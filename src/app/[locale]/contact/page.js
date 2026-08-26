import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import SiteHeader from '@/components/Nav/SiteHeader'
import SiteFooter from '@/components/Nav/SiteFooter'
import { BILLING_TIERS } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import styles from '../page.module.css'
import contactStyles from './contact.module.css'

export const metadata = {
	title: 'Contact',
	description: `Contact ${LEGAL.brandName} — support email, phone, and business details.`,
	alternates: { canonical: '/contact' },
}

export default async function ContactPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />

			<SiteHeader />

			<section className={`${styles.section} ${contactStyles.section}`}>
				<div className={styles.sectionHead}>
					<h1 className={styles.sectionTitle}>Contact us</h1>
					<p className={styles.sectionLede}>
						{LEGAL.brandName} is an online learning platform for self-paced
						programming courses (Roblox Studio, Python, and AI). Questions
						before you subscribe? Reach us directly — we typically reply within{' '}
						{LEGAL.complaintAckDays} business days.
					</p>
				</div>

				<div className={contactStyles.grid}>
					<div className={contactStyles.card}>
						<h2 className={contactStyles.cardTitle}>Support</h2>
						<p>
							<strong>Email:</strong>{' '}
							<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>
						</p>
						<p>
							<strong>Phone:</strong>{' '}
							<a href={`tel:${LEGAL.supportPhone.replace(/\s/g, '')}`}>
								{LEGAL.supportPhone}
							</a>
						</p>
						<p>
							<strong>Business:</strong> {LEGAL.legalName}, {LEGAL.legalForm}
						</p>
						<p>
							<strong>Address:</strong> {LEGAL.businessAddress}
						</p>
					</div>

					<div className={contactStyles.card}>
						<h2 className={contactStyles.cardTitle}>Subscription pricing (USD)</h2>
						<p className={contactStyles.priceNote}>
							Per program. {LEGAL.trialDays}-day free trial, then:
						</p>
						<ul className={contactStyles.priceList}>
							<li>
								<strong>Standard</strong> — {BILLING_TIERS.standard.monthlyPrice}
								/month or {BILLING_TIERS.standard.annualPrice}/year (platform +
								Discord)
							</li>
							<li>
								<strong>Premium</strong> — {BILLING_TIERS.premium.monthlyPrice}
								/month or {BILLING_TIERS.premium.annualPrice}/year (+ 2 live
								lessons/week)
							</li>
						</ul>
						<p>
							<Link href="/pricing">View plans and start a trial</Link>
						</p>
					</div>

					<div className={contactStyles.card}>
						<h2 className={contactStyles.cardTitle}>Legal &amp; billing</h2>
						<ul className={contactStyles.linkList}>
							<li>
								<Link href="/terms">Terms of Service</Link>
							</li>
							<li>
								<Link href="/privacy">Privacy Policy</Link>
							</li>
							<li>
								<Link href="/refund">Refund Policy</Link>
							</li>
						</ul>
						<p className={contactStyles.mor}>
							Payments are processed by Paddle.com Market Limited, Merchant of
							Record. {LEGAL.refundDays}-day money-back on your first charge.
						</p>
					</div>
				</div>
			</section>

			<SiteFooter />
		</div>
	)
}
