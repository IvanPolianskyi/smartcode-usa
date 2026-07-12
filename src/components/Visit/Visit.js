'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
	Users,
	User,
	Monitor,
	Code,
	Play,
	Award,
	BookOpen,
	Trophy,
} from 'lucide-react'
import styles from './Visit.module.css'
import { Link } from '@/i18n/navigation'
import { useTranslations, useLocale } from 'next-intl'
import HeroTrialForm from './HeroTrialForm'
import HeroEnCta from './HeroEnCta'

const EnhancedCourseCards = dynamic(() => import('./EnhancedCourseCards'), {
	loading: () => <div style={{ minHeight: '980px', width: '100%' }} />,
})

const Visit = () => {
	const locale = useLocale()
	const isEn = locale === 'en'
	const t = useTranslations('home')
	const [shouldRenderCards, setShouldRenderCards] = useState(false)

	useEffect(() => {
		let idleId = null
		let timeoutId = null

		const scheduleCardsRender = () => setShouldRenderCards(true)

		if (
			typeof window !== 'undefined' &&
			typeof window.requestIdleCallback === 'function'
		) {
			idleId = window.requestIdleCallback(scheduleCardsRender, {
				timeout: 1200,
			})
		} else {
			timeoutId = window.setTimeout(scheduleCardsRender, 350)
		}

		return () => {
			if (
				idleId != null &&
				typeof window !== 'undefined' &&
				typeof window.cancelIdleCallback === 'function'
			) {
				window.cancelIdleCallback(idleId)
			}
			if (timeoutId != null) {
				window.clearTimeout(timeoutId)
			}
		}
	}, [])

	const handleTrialCtaClick = e => {
		e.preventDefault()
		window.dispatchEvent(new Event('openContactModal'))
	}

	const heroFeatures = (
		<div className={styles.heroFeatures}>
			<div className={styles.feature}>
				<div className={styles.featureIcon}>
					<Users className={styles.icon} />
				</div>
				<span>{t('features.age')}</span>
			</div>
			<div className={styles.feature}>
				<div className={styles.featureIcon}>
					<Monitor className={styles.icon} />
				</div>
				<span>{t('features.online')}</span>
			</div>
			<div className={styles.feature}>
				<div className={styles.featureIcon}>
					<Award className={styles.icon} />
				</div>
				<span>{t('features.certificate')}</span>
			</div>
		</div>
	)

	const allStats = [
		{
			key: 'students',
			number: t('stats.students.number'),
			label: t('stats.students.label'),
			icon: <Users />,
		},
		{
			key: 'liveLessons',
			number: t('stats.liveLessons.number'),
			label: t('stats.liveLessons.label'),
			icon: <Code />,
		},
		{
			key: 'courses',
			number: t('stats.courses.number'),
			label: t('stats.courses.label'),
			icon: <BookOpen />,
		},
		{
			key: 'trial',
			number: t('stats.trial.number'),
			label: t('stats.trial.label'),
			icon: <Trophy />,
		},
	]

	const stats = isEn
		? []
		: allStats

	return (
		<div className={styles.container}>
			{/* Floating background elements */}
			<div className={styles.backgroundElements}>
				{/* Верхні елементи */}
				<div className={`${styles.floatingElement} ${styles.element1}`}></div>
				<div className={`${styles.floatingElement} ${styles.element2}`}></div>
				<div className={`${styles.floatingElement} ${styles.element3}`}></div>
				<div className={`${styles.floatingElement} ${styles.element4}`}></div>
				<div className={`${styles.floatingElement} ${styles.element5}`}></div>
				{/* Середні елементи */}
				<div className={`${styles.floatingElement} ${styles.element6}`}></div>
				<div className={`${styles.floatingElement} ${styles.element7}`}></div>
				<div className={`${styles.floatingElement} ${styles.element8}`}></div>
				{/* Нижні елементи */}
				<div className={`${styles.floatingElement} ${styles.element9}`}></div>
				<div className={`${styles.floatingElement} ${styles.element10}`}></div>
				<div className={`${styles.floatingElement} ${styles.element11}`}></div>
				<div className={`${styles.floatingElement} ${styles.element12}`}></div>
				<div className={`${styles.floatingElement} ${styles.element13}`}></div>
				<div className={`${styles.floatingElement} ${styles.element14}`}></div>
			</div>

			<div className={styles.mainContainer}>
				{/* Hero Header */}
				<div className={styles.hero}>
					<div className={styles.heroContent}>
						<div className={styles.heroIntro}>
							<h1 className={`${styles.title} ${styles.titleCritical}`}>
								<span className={styles.titleMain}>SmartCode</span>
								<span className={styles.titleAccent}>Academy</span>
							</h1>

							{!isEn && (
								<p className={styles.subtitle}>
									{t('subtitle')}
								</p>
							)}
							{!isEn && (
								<div className={styles.lessonTypesWrap}>
									<div className={styles.lessonTypes}>
										<span className={styles.lessonTypeBadge}>
											<span className={styles.lessonTypeIcon} aria-hidden>
												<Users size={18} />
											</span>
											{t('lessonTypes.group')}
										</span>
										<span className={styles.lessonTypeBadge}>
											<span className={styles.lessonTypeIcon} aria-hidden>
												<User size={18} />
											</span>
											{t('lessonTypes.individual')}
										</span>
									</div>
									<div
										className={`${styles.lessonTypes} ${styles.lessonTypesSecondRow}`}
									>
										<span className={styles.lessonTypeBadge}>
											<span className={styles.lessonTypeIcon} aria-hidden>
												<Trophy size={18} />
											</span>
											{t('lessonTypes.students')}
										</span>
										<span className={styles.lessonTypeBadge}>
											<span className={styles.lessonTypeIcon} aria-hidden>
												<Monitor size={18} />
											</span>
											{t('lessonTypes.platform')}
										</span>
									</div>
								</div>
							)}
						</div>

						<div
							className={`${styles.ctaDesktop} ${isEn ? styles.ctaDesktopEn : ''}`}
						>
							{isEn ? (
								<HeroEnCta />
							) : (
								<>
									{heroFeatures}
									<div className={styles.ctaButtons}>
										<Link
											href='/#Contactform'
											className={styles.primaryButton}
											onClick={handleTrialCtaClick}
											scroll={false}
										>
											<span className={styles.primaryButtonIcon} aria-hidden>
												<Play size={18} />
											</span>
											<span className={styles.primaryButtonText}>
												{t('cta.signUpTrial')}
											</span>
										</Link>
									</div>
								</>
							)}
						</div>

						<div className={styles.ctaMobile}>
							<div className={styles.ctaButtons}>
								{isEn ? <HeroEnCta /> : <HeroTrialForm />}
							</div>
						</div>
					</div>

					{/* Statistics */}
					{stats.length > 0 && (
						<div className={styles.statsContainer}>
							{stats.map((stat, index) => (
								<div key={index} className={styles.statCard}>
									<div
										className={styles.statIcon}
										style={{
											color: '#6366f1',
										}}
									>
										{stat.icon}
									</div>
									<div className={styles.statContent}>
										<div className={styles.statNumber}>{stat.number}</div>
										<div className={styles.statLabel}>{stat.label}</div>
									</div>
								</div>
							))}
						</div>
					)}

					{!isEn && (
						<div className={styles.pricesCtaSection}>
							<Link href='/tariff' className={styles.secondaryButton}>
								{t('cta.viewPrices')}
							</Link>
						</div>
					)}
				</div>

				{shouldRenderCards ? (
					<EnhancedCourseCards />
				) : (
					<div
						style={{ minHeight: '980px', width: '100%' }}
						aria-hidden='true'
					/>
				)}
			</div>
		</div>
	)
}

export default Visit
