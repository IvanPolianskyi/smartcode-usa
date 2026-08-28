'use client'

import { Flame, Trophy } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ACHIEVEMENTS } from '@/lib/lessonInteractiveXp'
import Pip from '@/components/Mascot/Pip'
import styles from './Gamification.module.css'

/**
 * Compact XP / level / streak readout for the lesson header, with the badge
 * shelf underneath. Earned badges are lit; the rest stay visible but dimmed so
 * there is always something to aim at.
 */
export default function XpHud({ gamification, lessonQuest }) {
	const t = useTranslations('lms.lesson')
	const earned = new Set((gamification.achievements || []).map((a) => a.id))
	const percent = Math.round((gamification.ratio || 0) * 100)

	return (
		<div className={styles.hud}>
			<div className={styles.hudTop}>
				<div className={styles.levelChip} title={t('gamification.levelHint')}>
					<Pip mood={gamification.streak?.count > 0 ? 'happy' : 'idle'} size={24} label="Pip mascot" />
					<span>{t('gamification.level', { level: gamification.level })}</span>
				</div>

				<div className={styles.barWrap}>
					<div
						className={styles.bar}
						role="progressbar"
						aria-valuenow={gamification.into}
						aria-valuemin={0}
						aria-valuemax={gamification.need}
						aria-label={t('gamification.xpBarAria')}
					>
						<span className={styles.barFill} style={{ width: `${percent}%` }} />
					</div>
					<span className={styles.barLabel}>
						{t('gamification.xpOf', { into: gamification.into, need: gamification.need })}
					</span>
				</div>

				{gamification.streak?.count > 0 && (
					<div className={styles.streakChip} title={t('gamification.streakHint')}>
						<Flame className="w-4 h-4" />
						<span>{t('gamification.streakDays', { days: gamification.streak.count })}</span>
					</div>
				)}
			</div>

			{lessonQuest && lessonQuest.total > 0 && (
				<div className={styles.quest}>
					<span className={styles.questLabel}>{t('gamification.questLabel')}</span>
					<div className={styles.questDots}>
						{Array.from({ length: lessonQuest.total }).map((_, i) => (
							<span
								key={i}
								className={`${styles.questDot} ${i < lessonQuest.done ? styles.questDotDone : ''}`}
							/>
						))}
					</div>
					<span className={styles.questCount}>
						{lessonQuest.done}/{lessonQuest.total}
					</span>
				</div>
			)}

			<div className={styles.badges}>
				{ACHIEVEMENTS.map((achievement) => {
					const has = earned.has(achievement.id)
					return (
						<span
							key={achievement.id}
							className={`${styles.badge} ${has ? styles.badgeEarned : ''}`}
							title={`${t(`achievements.${achievement.id}.title`)} - ${
								has
									? t(`achievements.${achievement.id}.description`)
									: t(`achievements.${achievement.id}.howTo`)
							}`}
						>
							<span aria-hidden="true">{achievement.icon}</span>
							<span className={styles.srOnly}>{t(`achievements.${achievement.id}.title`)}</span>
						</span>
					)
				})}
			</div>
		</div>
	)
}
