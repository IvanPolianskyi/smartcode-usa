import { setRequestLocale } from 'next-intl/server'
import KitShell from '@/components/Funnel/KitShell'
import KitResendForm from '@/components/Funnel/KitResendForm'
import { KITS } from '@/lib/kits'
import s from '../kit.module.css'
import f from '../../funnel.module.css'

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
			<main className={s.wrap}>
				<section className={s.hero}>
					<p className={s.eyebrow}>Payment received</p>
					<h1 className={s.h1}>
						Check your <em>email</em>.
					</h1>
					<p className={s.lede}>
						In a minute you will get “Your {KIT.title} is ready” from SmartCode. Tap{' '}
						<strong>Open my kit</strong> - no password needed.
					</p>
				</section>

				<section className={s.card}>
					<h3>No email after 5 minutes?</h3>
					<p>Check spam and promotions, or send the link again:</p>
					<div className={f.form}>
						<KitResendForm />
					</div>
				</section>
			</main>
		</KitShell>
	)
}
