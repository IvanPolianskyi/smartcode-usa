'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Star, Users, Award } from 'lucide-react'
import styles from './Visit.module.css'
import { useLocale } from 'next-intl'
import HeroTrialForm from './HeroTrialForm'
import HeroEnCta from './HeroEnCta'

const EnhancedCourseCards = dynamic(() => import('./EnhancedCourseCards'), {
	loading: () => <div style={{ minHeight: '980px', width: '100%' }} />,
})

const Visit = () => {
	const locale = useLocale()
	const isEn = locale === 'en'
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

	return (
		<div className={styles.container}>
			{/* Floating background elements */}
			<div className={styles.backgroundElements}>
				<div className={`${styles.floatingElement} ${styles.element1}`}></div>
				<div className={`${styles.floatingElement} ${styles.element2}`}></div>
				<div className={`${styles.floatingElement} ${styles.element3}`}></div>
				<div className={`${styles.floatingElement} ${styles.element4}`}></div>
				<div className={`${styles.floatingElement} ${styles.element5}`}></div>
			</div>

			<div className={styles.mainContainer}>
				{/* Hero Header — двоколонковий лейаут */}
				<div className={styles.hero}>
					{/* Ліва колонка — текст */}
					<div className={styles.heroLeft}>
						{/* Підзаголовок школи */}
						{!isEn && (
							<p className={styles.schoolLabel}>
								Онлайн школа програмування для дітей 7–17 років
							</p>
						)}

						{/* Головний оффер */}
						<h1 className={styles.title}>
							<span className={styles.titleMain}>З хобі -</span>
							<span className={styles.titleAccent}> у професію майбутнього</span>
						</h1>

						{/* Під-оффер */}
						{!isEn && (
							<p className={styles.subtitle}>
								Перетворіть інтерес вашої дитини до ігор - на навичку, яка відкриє двері в IT вже сьогодні
							</p>
						)}

						{/* Соціальний доказ */}
						{!isEn && (
							<div className={styles.socialProof}>
								<div className={styles.starsRow}>
									{[1,2,3,4,5].map(i => (
										<Star key={i} size={16} className={styles.starIcon} />
									))}
									<span className={styles.ratingText}>4.9</span>
									<span className={styles.ratingDivider}>·</span>
									<span className={styles.socialProofText}>700+ студентів</span>
									<span className={styles.ratingDivider}>·</span>
									<span className={styles.socialProofText}>5 років</span>
								</div>
							</div>
						)}

						{/* CTA: форма ім'я + телефон (десктоп і мобільний) */}
						<div className={styles.heroCta}>
							<div className={styles.ctaButtons}>
								{isEn ? <HeroEnCta /> : <HeroTrialForm />}
							</div>
						</div>
					</div>

					{/* Права колонка — зображення */}
					{!isEn && (
						<div className={styles.heroRight}>
							<div className={styles.heroImageWrap}>
								<Image
									src='/hero-placeholder.png'
									alt='Учень SmartCode Academy навчається програмуванню'
									fill
									className={styles.heroImage}
									priority
									sizes='(max-width: 1024px) 100vw, 50vw'
								/>
								{/* Floating badge — соціальний доказ */}
								<div className={styles.floatingBadge}>
									<div className={styles.floatingBadgeIcon}>
										<Users size={20} />
									</div>
									<div>
										<div className={styles.floatingBadgeTitle}>5000+ учнів</div>
										<div className={styles.floatingBadgeSub}>по всьому світу</div>
									</div>
								</div>
								<div className={styles.floatingBadge2}>
									<div className={styles.floatingBadgeIcon}>
										<Award size={20} />
									</div>
									<div>
										<div className={styles.floatingBadgeTitle}>Міжнародний</div>
										<div className={styles.floatingBadgeSub}>сертифікат</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Course Cards */}
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
