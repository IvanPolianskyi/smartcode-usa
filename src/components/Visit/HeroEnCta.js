'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import {
	UserPlus,
	LayoutDashboard,
	Video,
	ChevronRight,
	BookOpen,
} from 'lucide-react'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { formatPrice, getEnPurchasableFullCourses } from '@/lib/coursePrices'
import styles from './HeroEnCta.module.css'

const COURSE_META = {
	'roblox-studio': {
		href: '/courses/roblox-studio',
		icon: '/logos/roblox.svg',
		theme: 'linear-gradient(135deg, #b91c1c, #dc2626)',
	},
	'python-developer-zero-to-junior': {
		href: '/courses/python-developer-zero-to-junior',
		icon: '/python-logo.png',
		theme: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
	},
}

export default function HeroEnCta() {
	const t = useTranslations('home.heroEnCta')
	const tc = useTranslations('common')
	const { user, loading } = useAuthSession()
	const courses = getEnPurchasableFullCourses()

	return (
		<div className={styles.card} id="hero-en-cta">
			<h2 className={styles.title}>
				{t('title')}{' '}
				<span className={styles.titleAccent}>{t('titleAccent')}</span>
			</h2>
			<p className={styles.lead}>{t('lead')}</p>

			{!loading && user ? (
				<Link href="/dashboard" className={styles.primaryBtn}>
					<LayoutDashboard size={20} />
					{t('goDashboard')}
				</Link>
			) : (
				<Link href="/register" className={styles.primaryBtn}>
					<UserPlus size={20} />
					{t('createAccount')}
				</Link>
			)}

			{!user && !loading && (
				<Link href="/login" className={styles.signInLink}>
					{t('hasAccount')} {tc('login')}
				</Link>
			)}

			<div className={styles.divider}>{t('orBuy')}</div>

			<div className={styles.offers}>
				{courses.map((course) => {
					const meta = COURSE_META[course.courseId] || {}
					return (
						<Link
							key={course.courseId}
							href={meta.href || `/courses/${course.courseId}`}
							className={styles.offerRow}
						>
							<div className={styles.offerLeft}>
								<div
									className={styles.offerIcon}
									style={{ background: meta.theme || '#e2e8f0' }}
								>
									{meta.icon ? (
										<img src={meta.icon} alt="" />
									) : (
										<BookOpen size={20} color="#fff" />
									)}
								</div>
								<div className={styles.offerText}>
									<strong>{t(`courses.${course.courseId}.name`)}</strong>
									<span>{t(`courses.${course.courseId}.desc`)}</span>
								</div>
							</div>
							<span className={styles.offerPrice}>
								{formatPrice(course.price, course.currency, 'en')}
							</span>
							<span className={styles.offerChevron} aria-hidden>
								<ChevronRight size={18} color="#94a3b8" />
							</span>
						</Link>
					)
				})}
			</div>

			<Link href="/dashboard" className={`${styles.secondaryBtn} ${styles.liveLesson}`}>
				<Video size={18} />
				{t('bookLive')}
			</Link>

			<p className={styles.hint}>{t('hint')}</p>
		</div>
	)
}
