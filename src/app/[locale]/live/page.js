import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import SiteHeader from '@/components/Nav/SiteHeader'
import SiteFooter from '@/components/Nav/SiteFooter'
import LiveSignup from '@/components/Funnel/LiveSignup'
import styles from '../page.module.css'
import f from '../funnel.module.css'

const DESCRIPTION =
	'Free weekly live build: we build a Roblox game with AI tools in real time and show the scripting that makes it work. Save your spot and we email you the link.'

export const metadata = {
	title: 'Free live Roblox build with AI',
	description: DESCRIPTION,
	alternates: { canonical: '/live' },
	openGraph: { title: 'Free live Roblox build with AI', description: DESCRIPTION, url: '/live' },
	twitter: { card: 'summary_large_image', title: 'Free live Roblox build with AI', description: DESCRIPTION },
}

const WHAT_YOU_SEE = [
	'A Roblox game built from scratch in about an hour, live',
	'How we use AI tools to draft scripts - and where they get it wrong',
	'The Luau scripting that turns AI code into a game that works',
	'Your questions answered live in our Discord',
]

/**
 * Link to drop in Discord / Instagram before every live build:
 * smartcode.academy/live?src=discord
 */
export default async function LivePage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />
			<SiteHeader />

			<main className={f.wrap}>
				<div style={{ display: 'grid', gap: 14 }}>
					<p className={f.eyebrow}>Free · live · every week</p>
					<h1 className={f.title}>Watch a Roblox game get built with AI - live</h1>
					<p className={f.lede}>
						Once a week we build a Roblox game in real time using AI tools, and
						show the scripting that makes it actually work. Free to join. Save your
						spot and we email you the link.
					</p>
				</div>

				<Suspense fallback={<div className={f.card}><p className={f.muted}>Loading…</p></div>}>
					<LiveSignup />
				</Suspense>

				<div className={f.card}>
					<h2 className={f.cardTitle}>What you will see</h2>
					<ul className={f.list}>
						{WHAT_YOU_SEE.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
					<p className={f.muted}>
						No experience needed. Bring Roblox Studio (free) if you want to build
						along, or just watch.
					</p>
				</div>
			</main>

			<SiteFooter />
		</div>
	)
}
