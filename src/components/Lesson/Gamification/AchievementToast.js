'use client'

import { Sparkles, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Pip from '@/components/Mascot/Pip'
import styles from './Gamification.module.css'

/**
 * Floating celebration stack for XP gains and newly earned badges.
 * Toasts expire on their own; the close button is for people who would rather
 * not wait, and `prefers-reduced-motion` drops the entrance animation.
 */
export default function AchievementToast({ toasts, onDismiss }) {
	const t = useTranslations('lms.lesson')

	if (!toasts.length) return null

	return (
		<div className={styles.toastStack} role="status" aria-live="polite">
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={`${styles.toast} ${
						toast.kind === 'achievement' ? styles.toastAchievement : styles.toastXp
					}`}
				>
					<span className={styles.toastIcon} aria-hidden="true">
						{toast.kind === 'achievement' ? (
							toast.icon
						) : (
							<Pip mood="cheer" size={28} label="Pip cheer" />
						)}
					</span>

					<div className={styles.toastBody}>
						{toast.kind === 'achievement' ? (
							<>
								<strong className={styles.toastTitle}>
									{t(`achievements.${toast.achievementId}.title`)}
								</strong>
								<span className={styles.toastText}>
									{t(`achievements.${toast.achievementId}.description`)}
								</span>
								<span className={styles.toastXpTag}>+{toast.xp} XP</span>
							</>
						) : (
							<strong className={styles.toastTitle}>
								{t('gamification.xpGained', { xp: toast.xp })}
							</strong>
						)}
					</div>

					<button
						type="button"
						className={styles.toastClose}
						onClick={() => onDismiss(toast.id)}
						aria-label={t('gamification.dismiss')}
					>
						<X className="w-4 h-4" />
					</button>
				</div>
			))}
		</div>
	)
}
