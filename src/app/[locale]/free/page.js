import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import SiteHeader from '@/components/Nav/SiteHeader'
import SiteFooter from '@/components/Nav/SiteFooter'
import { getCurrentUser } from '@/lib/auth'
import { findFreeBuild } from '@/lib/freeBuilds'
import { FREE_FIRST_LESSON_PATH } from '@/lib/freeStart'
import { DISCORD_INVITE_URL } from '@/lib/liveEvents'
import { LEGAL } from '@/lib/legalConfig'
import styles from '../page.module.css'
import f from '../funnel.module.css'

export const dynamic = 'force-dynamic'

const DESCRIPTION =
	'Start building in Roblox Studio for free - no card. Make an account, get the code from our reels, and start the first lesson.'

export const metadata = {
	title: 'Start building Roblox games free',
	description: DESCRIPTION,
	alternates: { canonical: '/free' },
	openGraph: { title: 'Start building Roblox games free', description: DESCRIPTION, url: '/free' },
	twitter: { card: 'summary_large_image', title: 'Start building Roblox games free', description: DESCRIPTION },
}

/**
 * Landing page for the Instagram Direct bot (variant A):
 * smartcode.academy/free?build=<slug>  - see src/lib/freeBuilds.js
 */
export default async function FreePage({ params, searchParams }) {
	const { locale } = await params
	setRequestLocale(locale)
	const query = await searchParams
	const build = findFreeBuild(query?.build)
	const userId = await getCurrentUser().catch(() => null)

	const back = build ? `/free?build=${build.slug}` : FREE_FIRST_LESSON_PATH
	const registerHref = `/register?redirect=${encodeURIComponent(back)}`
	const loginHref = `/login?redirect=${encodeURIComponent(back)}`

	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />
			<SiteHeader />

			<main className={f.wrap}>
				<div style={{ display: 'grid', gap: 14 }}>
					<p className={f.eyebrow}>Free · no card</p>
					<h1 className={f.title}>
						{build ? build.title : 'Start building Roblox games - free'}
					</h1>
					<p className={f.lede}>
						{build
							? `${build.description} Make a free account to download it, then start the first lesson and learn how it works.`
							: 'Make a free account and start building in Roblox Studio today. The first lesson is open to everyone, and your code is checked the moment you hit Run.'}
					</p>
				</div>

				{userId ? (
					<div className={`${f.card} ${f.success}`}>
						<h2 className={f.cardTitle}>You are in</h2>
						<div className={f.row}>
							{build ? (
								<a href={build.downloadUrl} className="sc-btn sc-btn-primary sc-btn-lg" download>
									Download the code
								</a>
							) : null}
							<Link
								href={FREE_FIRST_LESSON_PATH}
								className={build ? 'sc-btn sc-btn-ghost sc-btn-lg' : 'sc-btn sc-btn-primary sc-btn-lg'}
							>
								Start the first lesson
							</Link>
						</div>
						<p className={f.muted}>
							Every week we build a game with AI live in our Discord - free.{' '}
							<Link href="/live">Save your spot</Link> or{' '}
							<a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer">
								join the Discord
							</a>
							.
						</p>
					</div>
				) : (
					<div className={f.card}>
						<h2 className={f.cardTitle}>
							{build ? 'Get the code + your first lesson' : 'Create your free account'}
						</h2>
						<ul className={f.list}>
							{build ? <li>The code from the reel, ready to open in Roblox Studio</li> : null}
							<li>Your first Roblox Studio lesson, free</li>
							<li>An AI helper that explains your code and errors (5 free questions a day)</li>
							<li>Free weekly live builds with AI in our Discord</li>
						</ul>
						<div className={f.row}>
							<Link href={registerHref} className="sc-btn sc-btn-primary sc-btn-lg">
								{build ? 'Get it free' : 'Start free'}
							</Link>
							<Link href={loginHref} className="sc-btn sc-btn-ghost">
								I already have an account
							</Link>
						</div>
						<p className={f.fine}>
							On your phone? Sign up now - in the lesson you can email yourself the
							link to open on your computer (Roblox Studio runs on Windows and Mac).
						</p>
						<p className={f.fine}>
							No card needed. When you want the full course, the club is{' '}
							{LEGAL.monthlyPrice}/month with {LEGAL.trialDays} free days.
						</p>
					</div>
				)}
			</main>

			<SiteFooter />
		</div>
	)
}
