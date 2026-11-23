import { setRequestLocale } from 'next-intl/server'
import SiteHeader from '@/components/Nav/SiteHeader'
import SiteFooter from '@/components/Nav/SiteFooter'
import KitResendForm from '@/components/Funnel/KitResendForm'
import { TELEGRAM_URL } from '@/lib/kits'
import styles from '../../page.module.css'
import f from '../../funnel.module.css'

export const metadata = {
	title: 'Thanks - check your email',
	robots: { index: false, follow: false },
}

/**
 * Paddle success page. It only says "check your email" - access is granted
 * by the webhook, never by landing here (this URL is easy to guess).
 */
export default async function KitThanksPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />
			<SiteHeader />
			<main className={f.wrap}>
				<div style={{ display: 'grid', gap: 14 }}>
					<p className={f.eyebrow}>Payment received</p>
					<h1 className={f.title}>Check your email - your kit is on its way</h1>
					<p className={f.lede}>
						In a minute you will get “Your Roblox AI Game Kit is ready” from SmartCode.
						Tap <strong>Open my kit</strong> - no password needed.
					</p>
				</div>

				<div className={`${f.card} ${f.success}`}>
					<h2 className={f.cardTitle}>One more step: join the Telegram</h2>
					<p className={f.muted}>
						New prompts, weekly live builds and help when you get stuck. Join now so you
						do not miss the first live build.
					</p>
					<div className={f.row}>
						<a href={TELEGRAM_URL} className="sc-btn sc-btn-primary sc-btn-lg" target="_blank" rel="noopener noreferrer">
							Join the Telegram
						</a>
					</div>
				</div>

				<div className={f.card}>
					<h2 className={f.cardTitle}>No email after 5 minutes?</h2>
					<p className={f.muted}>Check spam and promotions, or send the link again:</p>
					<KitResendForm />
				</div>
			</main>
			<SiteFooter />
		</div>
	)
}
