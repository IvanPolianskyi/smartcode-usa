'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { LogOut } from 'lucide-react'
import { useAuthSession } from '@/components/AuthSessionProvider'
import StickyNav from '@/components/Nav/StickyNav'
import styles from './LmsHeader.module.css'

/**
 * Shared top bar for LMS surfaces (dashboard, course, courses list).
 */
export default function LmsHeader({ onLogout = null }) {
	const { user, loading } = useAuthSession()

	return (
		<div className={styles.wrap} data-theme="light">
			<StickyNav
				className={styles.nav}
				innerClassName={styles.inner}
				brand={
					<Link href="/" className={styles.brand} aria-label="SmartCode home">
						<Image
							src="/logo.jpeg"
							alt=""
							width={30}
							height={30}
							className={styles.mark}
							priority
						/>
						SmartCode
					</Link>
				}
			>
				<div className={styles.links}>
					{loading ? null : user ? (
						<>
							<Link href="/" className={styles.link}>
								Home
							</Link>
							<Link href="/dashboard" className={styles.linkActive}>
								Dashboard
							</Link>
							{typeof onLogout === 'function' ? (
								<button type="button" className={styles.logout} onClick={onLogout}>
									<LogOut size={15} aria-hidden />
									Log out
								</button>
							) : (
								<Link href="/dashboard" className={styles.cta}>
									My account
								</Link>
							)}
						</>
					) : (
						<>
							<Link href="/login" className={styles.link}>
								Log in
							</Link>
							<Link href="/register" className={styles.cta}>
								Create account
							</Link>
						</>
					)}
				</div>
			</StickyNav>
		</div>
	)
}
