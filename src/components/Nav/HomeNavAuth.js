'use client'

import { Link } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from './HomeNavAuth.module.css'

function firstName(user) {
	const name = String(user?.name || '').trim()
	if (name) return name.split(/\s+/)[0]
	return String(user?.email || '').split('@')[0] || 'Account'
}

/**
 * Landing-page account slot: "Sign up" for guests, the signed-in profile chip
 * (which is also the way into the dashboard) for everyone else.
 */
export default function HomeNavAuth() {
	const { user, loading } = useAuthSession()

	// Nothing until the session is known - a "Sign up" that swaps to a profile
	// a moment later is worse than a slot that fills in once.
	if (loading) return <span className={styles.slot} aria-hidden="true" />

	if (!user) {
		return (
			<Link href="/register" className={styles.login}>
				Sign in
			</Link>
		)
	}

	const label = firstName(user)

	return (
		<Link
			href="/dashboard"
			className={styles.profile}
			title={`${user.name || user.email} - go to dashboard`}
		>
			<span className={styles.avatar} aria-hidden="true">
				{label.charAt(0).toUpperCase()}
			</span>
			<span className={styles.name}>{label}</span>
		</Link>
	)
}
