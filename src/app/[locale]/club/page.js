import { Suspense } from 'react'
import { headers } from 'next/headers'
import { setRequestLocale } from 'next-intl/server'
import SiteHeader from '@/components/Nav/SiteHeader'
import SiteFooter from '@/components/Nav/SiteFooter'
import PlanPicker from '@/components/Billing/PlanPicker'
import InAppBrowserNotice from '@/components/Funnel/InAppBrowserNotice'
import PromoCapture from '@/components/Funnel/PromoCapture'
import { BILLING_TIERS } from '@/lib/billingCatalog'
import { ROBLOX_COURSE_ID } from '@/lib/courseIds'
import { countryFromHeaders } from '@/lib/paddleCountry'
import { LEGAL } from '@/lib/legalConfig'
import styles from '../page.module.css'
import f from '../funnel.module.css'

const PRICE = BILLING_TIERS.standard
const DESCRIPTION = `SmartCode Club: the full Roblox Studio course, weekly live AI builds, and club-only Discord. ${LEGAL.trialDays} days free, then ${PRICE.monthlyPrice}/month or ${PRICE.annualPrice}/year. Cancel anytime.`

export const metadata = {
	title: 'SmartCode Club: build and publish your own Roblox game',
	description: DESCRIPTION,
	alternates: { canonical: '/club' },
	openGraph: { title: 'SmartCode Club', description: DESCRIPTION, url: '/club' },
	twitter: { card: 'summary_large_image', title: 'SmartCode Club', description: DESCRIPTION },
}

const INCLUDED = [
	{
		title: 'Your code checked as you go',
		text: 'Every lesson has practice tasks, and your code is checked the moment you run it - so you know right away what to fix.',
	},
	{
		title: 'The full Roblox course - 92 lessons',
		text: 'From your first part in Roblox Studio to a published game. Short lessons, and your Luau code is checked the moment you hit Run.',
	},
	{
		title: 'Weekly live builds with AI',
		text: 'We build a game live, use AI tools to draft scripts, and show how to fix and finish what AI writes. Ask questions as we go.',
	},
	{
		title: 'Club-only Discord channels',
		text: 'Members-only channels with other builders, where you can share your game and get unstuck.',
	},
	{
		title: 'A shot at our Instagram',
		text: 'We pick the best member games and feature them to our audience for free. Student game reels have reached millions of views.',
	},
]

const FAQ = [
	{
		q: 'What do I get right after I pay?',
		a: 'Every lesson unlocks in your account straight away. Join our Discord from your dashboard and we give you the Club role, which opens the club-only channels. The live builds are announced in Discord and by email.',
	},
	{
		q: 'Does AI build the game for me?',
		a: 'No - it builds it with you. The course teaches you the Roblox Studio and Luau skills to understand AI code, fix it, and make the game yours.',
	},
	{
		q: `What happens after the ${LEGAL.trialDays} free days?`,
		a: `Your membership continues at ${PRICE.monthlyPrice}/month, or ${PRICE.annualPrice}/year if you picked annual. Nothing is charged during the free days, and you can cancel before they end from your account page.`,
	},
	{
		q: "I'm under 18 and don't have a card.",
		a: 'A parent or guardian can pay with their card while you keep your own account and login.',
	},
	{
		q: 'Can I cancel?',
		a: `Anytime, in two clicks from your account page. You keep access until the end of the period you paid for, and there is a ${LEGAL.refundDays}-day money-back guarantee on your first payment.`,
	},
]

/**
 * The page to drop in Discord after a live build:
 * smartcode.academy/club  (or /club?promo=CODE for a Paddle discount code)
 */
export default async function ClubPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)
	const country = countryFromHeaders(await headers())

	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />
			<SiteHeader />
			<PromoCapture />

			<main className={f.wrap}>
				<div style={{ display: 'grid', gap: 14 }}>
					<p className={f.eyebrow}>SmartCode Club</p>
					<h1 className={f.title}>Build and publish your own Roblox game</h1>
					<p className={f.lede}>
						One membership: the full Roblox course,
						weekly live AI builds, and club-only Discord. Start with {LEGAL.trialDays} free days - nothing is
						charged today, cancel anytime.
					</p>
				</div>

				<section aria-labelledby="club-included" style={{ display: 'grid', gap: 14 }}>
					<h2 id="club-included" className={f.cardTitle}>
						What you get
					</h2>
					<div className={f.included}>
						{INCLUDED.map((item) => (
							<div key={item.title} className={f.includedItem}>
								<h3>{item.title}</h3>
								<p>{item.text}</p>
							</div>
						))}
					</div>
				</section>

				<section aria-labelledby="club-join" style={{ display: 'grid', gap: 14 }}>
					<h2 id="club-join" className={f.cardTitle}>
						Join the club
					</h2>
					<InAppBrowserNotice />
					<Suspense fallback={<p className={f.muted}>Loading plans…</p>}>
						<PlanPicker courseId={ROBLOX_COURSE_ID} country={country} />
					</Suspense>
					<p className={f.fine}>
						{LEGAL.refundDays}-day money-back guarantee · cancel in two clicks ·
						payments by Paddle, our Merchant of Record.
					</p>
				</section>

				<section aria-labelledby="club-faq" style={{ display: 'grid', gap: 14 }}>
					<h2 id="club-faq" className={f.cardTitle}>
						Questions
					</h2>
					<div className={f.faq}>
						{FAQ.map((item) => (
							<details key={item.q}>
								<summary>{item.q}</summary>
								<p>{item.a}</p>
							</details>
						))}
					</div>
				</section>
			</main>

			<SiteFooter />
		</div>
	)
}
