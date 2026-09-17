'use client'

import { useTranslations } from 'next-intl'
import { MessageCircle } from 'lucide-react'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

const DISCORD_INVITE =
	process.env.NEXT_PUBLIC_DISCORD_INVITE || 'https://discord.gg/rSGUxWyEPt'

/**
 * @param {{ user: object, variant?: 'card' | 'inline' }} props
 * `inline` sits inside the hero without a second card chrome.
 */
export default function ProfileAccountSection({ user, variant = 'card' }) {
	const t = useTranslations('dashboard.profile')
	const initial = String(user?.name || user?.email || '?')
		.trim()
		.charAt(0)
		.toUpperCase()
	const inline = variant === 'inline'

	return (
		<section
			className={inline ? styles.profileInline : styles.profileCard}
			aria-labelledby={inline ? undefined : 'profile-account-title'}
			aria-label={inline ? t('title') : undefined}
		>
			{inline ? null : (
				<h2 id="profile-account-title" className={styles.sectionTitle}>
					{t('title')}
				</h2>
			)}
			<div className={styles.profileRow}>
				<span className={styles.profileAvatar} aria-hidden>
					{initial}
				</span>
				<div className={styles.profileInfo}>
					{user?.name && !inline ? (
						<p className={styles.profileName}>{user.name}</p>
					) : null}
					<p className={styles.profileEmail}>{user.email}</p>
				</div>
			</div>

			<a
				href={DISCORD_INVITE}
				className={styles.discordBtn}
				target="_blank"
				rel="noopener noreferrer"
			>
				<MessageCircle size={16} aria-hidden />
				{t('discordCta')}
			</a>
			<p className={styles.discordHint}>{t('discordHint')}</p>
		</section>
	)
}
