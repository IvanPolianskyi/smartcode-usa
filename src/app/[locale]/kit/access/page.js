import { ObjectId } from 'mongodb'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import KitShell from '@/components/Funnel/KitShell'
import KitResendForm from '@/components/Funnel/KitResendForm'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { KITS, userHasKit } from '@/lib/kits'
import s from '../kit.module.css'
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

	const firstName = user?.name ? String(user.name).split(' ')[0] : ''

	return (
		<KitShell>
			<main className={s.wrap}>
				{owns ? (
					<>
						<section className={s.hero}>
							<p className={s.eyebrow}>{KIT.title}</p>
							<h1 className={s.h1}>
								Your kit is <em>ready</em>{firstName ? `, ${firstName}` : ''}.
							</h1>
							<p className={s.lede}>Open it on your computer and start with the setup guide.</p>
							<div className={s.buy}>
								<a href={`/api/kit/download?kit=${KIT.id}`} className={s.bigBtn} style={{ textAlign: 'center', textDecoration: 'none' }}>
									Download the kit (PDF)
								</a>
							</div>
							<p className={s.trust}>This page is your home for the kit - bookmark it. Updates appear here.</p>
						</section>
					</>
				) : (
					<>
						<section className={s.hero}>
							<p className={s.eyebrow}>{KIT.title}</p>
							<h1 className={s.h1}>{user ? 'No kit on this account yet' : 'Open your kit'}</h1>
							<p className={s.lede}>
								{user
									? `You are logged in as ${user.email}. If you bought the kit with a different email, send the access link to that email.`
									: 'Use the “Open my kit” button in the email we sent after you paid, or get a new link here.'}
							</p>
						</section>
						<section className={s.card}>
							<div className={f.form}>
								<KitResendForm />
							</div>
						</section>
						<p className={s.trust}>
							Don&apos;t have the kit yet? <Link href="/kit">Get the {KIT.title}</Link>.
						</p>
					</>
				)}
			</main>
		</KitShell>
	)
}
