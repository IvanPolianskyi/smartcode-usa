import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import SiteHeader from '@/components/Nav/SiteHeader'
import SiteFooter from '@/components/Nav/SiteFooter'
import WaitlistForm from '@/components/Funnel/WaitlistForm'
import { Link } from '@/i18n/navigation'
import styles from '../page.module.css'
import f from '../funnel.module.css'

const DESCRIPTION =
	'Turn one idea into an animated Roblox-style story Short with AI: script, voice and animation. Join the waitlist for the launch price.'

export const metadata = {
	title: 'AI Roblox Story Shorts Kit - waitlist',
	description: DESCRIPTION,
	alternates: { canonical: '/shorts' },
	openGraph: { title: 'AI Roblox Story Shorts Kit', description: DESCRIPTION, url: '/shorts' },
}

const INSIDE = [
	{ title: 'Story prompts', text: 'Prompts that turn one idea into a 60-second story with a hook, a twist and an ending.' },
	{ title: 'AI voice-over', text: 'How to give your character a voice and time it to captions.' },
	{ title: 'Roblox-style animation', text: 'How to build the scene and animate it - no animation experience needed.' },
	{ title: 'The posting playbook', text: 'Hooks, length and posting rhythm from a page with 57M views in 90 days.' },
]

/**
 * Product test #2. Not on sale yet - it only collects emails, so nothing is
 * charged for a kit that does not exist.
 */
export default async function ShortsPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />
			<SiteHeader />
			<main className={f.wrap}>
				<div style={{ display: 'grid', gap: 14 }}>
					<p className={f.eyebrow}>Coming soon · AI Roblox Story Shorts Kit</p>
					<h1 className={f.title}>Turn one idea into an animated Roblox story Short with AI</h1>
					<p className={f.lede}>
						Script, voice and animation from a single prompt. Join the waitlist and get
						the launch price first.
					</p>
				</div>

				<div className={f.card}>
					<Suspense fallback={null}>
						<WaitlistForm product="shorts-kit" cta="Get the launch price" />
					</Suspense>
					<p className={f.fine}>Free to join. One email when it launches. Unsubscribe anytime.</p>
				</div>

				<section style={{ display: 'grid', gap: 14 }}>
					<h2 className={f.cardTitle}>What will be inside</h2>
					<div className={f.included}>
						{INSIDE.map((item) => (
							<div key={item.title} className={f.includedItem}>
								<h3>{item.title}</h3>
								<p>{item.text}</p>
							</div>
						))}
					</div>
				</section>

				<p className={f.muted}>
					Want to build Roblox games with AI right now? <Link href="/kit">Get the Roblox AI Game Kit</Link>.
				</p>
				<p className={f.fine}>
					Results are not guaranteed. SmartCode is not affiliated with Roblox, TikTok or Anthropic.
				</p>
			</main>
			<SiteFooter />
		</div>
	)
}
