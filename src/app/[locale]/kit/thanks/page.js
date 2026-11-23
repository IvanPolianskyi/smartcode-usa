import { setRequestLocale } from 'next-intl/server'
import KitShell from '@/components/Funnel/KitShell'
import KitResendForm from '@/components/Funnel/KitResendForm'
import { KITS } from '@/lib/kits'
import s from '../sales.module.css'

export const metadata = {
	title: 'Thanks - check your email',
	robots: { index: false, follow: false },
}

const KIT = KITS['roblox-ai-games']

/**
 * Paddle success page. It only says "check your email" - access is granted
 * by the webhook, never by landing here (this URL is easy to guess).
 */
export default async function KitThanksPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<KitShell>
			<header className={s.hero}>
				<div className={s.wrap}>
					<div className={s.pill}>Payment received</div>
					<h1>
						Check your <span className={s.accent}>email</span>.
					</h1>
					<p className={s.lead}>
						In a minute you will get “Your {KIT.title} is ready” from SmartCode. Tap{' '}
						<b>Open my kit</b> - no password needed.
					</p>
					<div className={s.card}>
						<h3>No email after 5 minutes?</h3>
						<p style={{ marginBottom: 12 }}>Check spam and promotions, or send the link again:</p>
						<KitResendForm />
					</div>
				</div>
			</header>
		</KitShell>
	)
}
