'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import {
	Video,
	ChevronRight,
	BookOpen,
	Sparkles,
	Globe,
	Clock,
	Users,
	GraduationCap,
} from 'lucide-react'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { formatPrice, getEnPurchasableFullCourses, getLessonPrice } from '@/lib/coursePrices'
import styles from './HeroEnCta.module.css'

const COURSE_META = {
	'roblox-studio': {
		href: '/buy/roblox-studio',
	},
	'python-developer-zero-to-junior': {
		href: '/buy/python-developer-zero-to-junior',
	},
}

export default function HeroEnCta() {
	const t = useTranslations('home.heroEnCta')
	const { user, loading } = useAuthSession()
	const courses = getEnPurchasableFullCourses()
	const groupLesson = getLessonPrice('group', 'en')
	const individualLesson = getLessonPrice('individual', 'en')

	return (
		<div className={styles.card} id="hero-en-cta">
			{/* ── Title ── */}
			<h2 className={styles.title}>{t('title')}</h2>

			{/* ── Benefits strip ── */}
			<div className={styles.benefits}>
				<div className={styles.benefitItem}>
					<Video size={16} className={styles.benefitIcon} />
					<span>{t('benefitZoom')}</span>
				</div>
				<div className={styles.benefitItem}>
					<Globe size={16} className={styles.benefitIcon} />
					<span>{t('benefitEnglish')}</span>
				</div>
				<div className={styles.benefitItem}>
					<Clock size={16} className={styles.benefitIcon} />
					<span>{t('benefitFlexible')}</span>
				</div>
				<div className={styles.benefitItem}>
					<GraduationCap size={16} className={styles.benefitIcon} />
					<span>{t('benefitCertificate')}</span>
				</div>
			</div>

			{/* ── Primary CTA — Live Zoom lessons ── */}
			<div className={styles.liveCta}>
				<Link href="/book-lesson" className={styles.primaryBtn}>
					<div className={styles.primaryBtnInner}>
						<Video size={22} className={styles.primaryBtnIcon} />
						<div className={styles.primaryBtnText}>
							<strong>{t('liveCtaTitle')}</strong>
							<span>{t('liveCtaSub')}</span>
						</div>
					</div>
					<ChevronRight size={20} className={styles.primaryBtnChevron} />
				</Link>

				<div className={styles.priceRow}>
					<div className={styles.priceItem}>
						<Users size={14} />
						<span>
							{t('groupFrom')}{' '}
							{formatPrice(groupLesson.price, groupLesson.currency, 'en')}
						</span>
					</div>
					<span className={styles.priceDot}>•</span>
					<div className={styles.priceItem}>
						<Sparkles size={14} />
						<span>
							{t('individualFrom')}{' '}
							{formatPrice(individualLesson.price, individualLesson.currency, 'en')}
						</span>
					</div>
				</div>
			</div>

			{/* ── Divider ── */}
			<div className={styles.divider}>{t('orBuy')}</div>

			{/* ── Self-paced course cards ── */}
			<div className={styles.offers}>
				{courses.map((course) => {
					const meta = COURSE_META[course.courseId] || {}
					return (
						<Link
							key={course.courseId}
							href={meta.href || `/buy/${course.courseId}`}
							className={styles.offerRow}
						>
							<div className={styles.offerLeft}>
								<div className={styles.offerText}>
									<strong>{t(`courses.${course.courseId}.name`)}</strong>
									<span>{t(`courses.${course.courseId}.desc`)}</span>
								</div>
							</div>
							<div className={styles.offerRight}>
								<span className={styles.offerPrice}>
									{formatPrice(course.price, course.currency, 'en')}
								</span>
								<span className={styles.offerChevron} aria-hidden>
									<ChevronRight size={18} />
								</span>
							</div>
						</Link>
					)
				})}
			</div>

			<p className={styles.hint}>{t('hint')}</p>
		</div>
	)
}
