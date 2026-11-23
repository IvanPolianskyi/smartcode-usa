import { ObjectId } from 'mongodb'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import SiteHeader from '@/components/Nav/SiteHeader'
import SiteFooter from '@/components/Nav/SiteFooter'
import KitResendForm from '@/components/Funnel/KitResendForm'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { KITS, TELEGRAM_URL, userHasKit } from '@/lib/kits'
import { FREE_FIRST_LESSON_PATH } from '@/lib/freeStart'
import { LEGAL } from '@/lib/legalConfig'
import styles from '../../page.module.css'
import f from '../../funnel.module.css'

export const dynamic = 'force-dynamic'

export const metadata = {
	title: 'Your kit',
	robots: { index: false, follow: false },
}

const KIT = KITS['roblox-ai-games']

/** Where the emailed login link lands: everything the buyer paid for, in one place. */
export default async function KitAccessPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	const userId = await getCurrentUser().catch(() => null)
	let user = null
	if (userId) {
		const users = await getCollection('users')
		user = await users.findOne({ _id: new ObjectId(String(userId)) }, { projection: { email: 1, name: 1, kits: 1, role: 1 } })
	}
	const owns = userHasKit(user, KIT.id) || user?.role === 'admin'

	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />
			<SiteHeader />
			<main className={f.wrap}>
				{owns ? (
					<>
						<div style={{ display: 'grid', gap: 12 }}>
							<p className={f.eyebrow}>{KIT.title}</p>
							<h1 className={f.title}>Your kit is ready{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</h1>
							<p className={f.lede}>Do these three things on your computer, in this order.</p>
						</div>

						<ol className={f.list}>
							<li>
								<strong>Download the kit</strong> and open the setup guide on page 3.
							</li>
							<li>
								<strong>Join the Telegram</strong> - new prompts and the weekly live builds are posted there.
							</li>
							<li>
								<strong>New to Roblox Studio?</strong> Start with our free first lesson.
							</li>
						</ol>

						<div className={`${f.card} ${f.success}`}>
							<div className={f.row}>
								<a href={`/api/kit/download?kit=${KIT.id}`} className="sc-btn sc-btn-primary sc-btn-lg">
									Download the kit (PDF)
								</a>
								<a href={TELEGRAM_URL} className="sc-btn sc-btn-ghost sc-btn-lg" target="_blank" rel="noopener noreferrer">
									Join the Telegram
								</a>
								<Link href={FREE_FIRST_LESSON_PATH} className="sc-btn sc-btn-ghost sc-btn-lg">
									Open the first lesson
								</Link>
							</div>
							<p className={f.fine}>
								This page is your home for the kit - bookmark it. Updates appear here and in
								the Telegram.
							</p>
						</div>

						<div className={f.card}>
							<h2 className={f.cardTitle}>Want to go further?</h2>
							<p className={f.muted}>
								SmartCode Club is the full 92-lesson Roblox course with weekly live builds and
								club-only Discord. {LEGAL.trialDays} days free, cancel anytime.
							</p>
							<div className={f.row}>
								<Link href="/club" className="sc-btn sc-btn-ghost">
									See the club
								</Link>
							</div>
						</div>
					</>
				) : (
					<>
						<div style={{ display: 'grid', gap: 12 }}>
							<p className={f.eyebrow}>{KIT.title}</p>
							<h1 className={f.title}>{user ? 'No kit on this account yet' : 'Open your kit'}</h1>
							<p className={f.lede}>
								{user
									? `You are logged in as ${user.email}. If you bought the kit with a different email, send the access link to that email.`
									: 'Use the “Open my kit” button in the email we sent after you paid, or get a new link here.'}
							</p>
						</div>
						<div className={f.card}>
							<KitResendForm />
						</div>
						<p className={f.muted}>
							Don&apos;t have the kit yet? <Link href="/kit">Get the Roblox AI Game Kit</Link>.
						</p>
					</>
				)}
			</main>
			<SiteFooter />
		</div>
	)
}
