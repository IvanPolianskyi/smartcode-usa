import { ObjectId } from 'mongodb'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import KitShell from '@/components/Funnel/KitShell'
import KitResendForm from '@/components/Funnel/KitResendForm'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { KITS, userHasKit } from '@/lib/kits'
import s from '../sales.module.css'

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
			<header className={s.hero}>
				<div className={s.wrap}>
					<div className={s.pill}>{KIT.title}</div>
					{owns ? (
						<>
							<h1>
								Your kit is <span className={s.accent}>ready</span>
								{firstName ? `, ${firstName}` : ''}.
							</h1>
							<p className={s.lead}>
								Open it on your computer and start with the setup on page 3. The starter files have
								the rules file and the 3 finished games.
							</p>
							<div className={s.priceRow}>
								<a href={`/api/kit/download?kit=${KIT.id}`} className={s.btn}>
									Download the guide (PDF)
								</a>
								<a href={`/api/kit/download?kit=${KIT.id}&part=files`} className={`${s.btn} ${s.ghost}`}>
									Starter files (.zip)
								</a>
							</div>
							<p className={s.trust}>This page is your home for the kit - bookmark it. Updates appear here.</p>
						</>
					) : (
						<>
							<h1>{user ? 'No kit on this account yet' : 'Open your kit'}</h1>
							<p className={s.lead}>
								{user
									? `You are logged in as ${user.email}. If you bought the kit with a different email, send the access link to that email.`
									: 'Use the “Open my kit” button in the email we sent after you paid, or get a new link here.'}
							</p>
							<div className={s.card}>
								<KitResendForm />
							</div>
							<p className={s.trust}>
								Don&apos;t have the kit yet? <Link href="/kit">Get the {KIT.title}</Link>.
							</p>
						</>
					)}
				</div>
			</header>
		</KitShell>
	)
}
