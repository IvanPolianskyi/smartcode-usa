'use client'

import React, { useMemo } from 'react'
import {
	MonitorPlay,
	BookOpenText,
	TrendingUp,
	ClipboardCheck,
	CreditCard,
	Gift,
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from './LMSPromo.module.css'

const FEATURE_ICONS = [
	<MonitorPlay size={22} className={styles.iconRed} key='1' />,
	<BookOpenText size={22} className={styles.iconYellow} key='2' />,
	<TrendingUp size={22} className={styles.iconGreen} key='3' />,
	<ClipboardCheck size={22} className={styles.iconBlue} key='4' />,
	<CreditCard size={22} className={styles.iconPurple} key='5' />,
	<Gift size={22} className={styles.iconPink} key='6' />,
]
const FEATURE_BG = [
	styles.bgRed,
	styles.bgYellow,
	styles.bgGreen,
	styles.bgBlue,
	styles.bgPurple,
	styles.bgPink,
]

const LMSPromo = () => {
	const t = useTranslations('homeSections.lms')
	const { user, loading } = useAuthSession()

	const features = useMemo(() => {
		const texts = t.raw('features')
		return Object.keys(texts).map((key, index) => ({
			icon: FEATURE_ICONS[index],
			bgClass: FEATURE_BG[index],
			text: texts[key],
		}))
	}, [t])

	return (
		<section className={styles.lmsSection}>
			<div className={styles.container}>
				<div className={styles.grid}>
					<div className={styles.leftCol}>
						<h2 className={styles.title}>
							{t('title')}
							<br />
							{t('titleLine2')}
						</h2>
						<p
							className={styles.description}
							dangerouslySetInnerHTML={{ __html: t.raw('description') }}
						/>
						<div className={styles.actionWrap}>
							{!loading && (
								<Link
									href={user ? '/dashboard' : '/login'}
									className={styles.loginBtn}
								>
									{user ? t('goToDashboard') : t('login')}
								</Link>
							)}
						</div>
					</div>

					<div className={styles.rightCol}>
						<h3 className={styles.subtitle}>
							{t('subtitle')}
							<br />
							{t('subtitleLine2')}
						</h3>
						<ul className={styles.featureList}>
							{features.map((feature, idx) => (
								<li key={idx} className={styles.featureItem}>
									<div className={`${styles.iconWrap} ${feature.bgClass}`}>
										{feature.icon}
									</div>
									<span className={styles.featureText}>{feature.text}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LMSPromo
