import { Link } from '@/i18n/navigation'
import { LEGAL } from '@/lib/legalConfig'
import styles from '@/app/[locale]/page.module.css'

/**
 * One footer for every marketing page.
 *
 * Carries the seller's real contact details, not just links to the legal
 * pages: a payment processor reviewing the site expects to reach a human
 * without opening Terms, and so does a buyer with a question before paying.
 */
export default function SiteFooter() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerInner}>
				<span className={styles.footerBrand}>SmartCode</span>

				<div className={styles.footerLinks}>
					<Link href="/pricing">Pricing</Link>
					<Link href="/contact">Contact</Link>
					<Link href="/terms">Terms</Link>
					<Link href="/privacy">Privacy</Link>
					<Link href="/refund">Refunds</Link>
				</div>

				<p className={styles.footerNote}>
					Questions before you buy?{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a> ·{' '}
					{LEGAL.supportPhone}
				</p>
				<p className={styles.footerNote}>
					Payments are processed by Paddle.com Market Limited, our Merchant of
					Record. {LEGAL.refundDays}-day money-back guarantee · cancel anytime.
				</p>
			</div>
		</footer>
	)
}
