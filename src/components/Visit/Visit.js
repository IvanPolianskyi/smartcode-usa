'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Star } from 'lucide-react'
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

	// Стабільна висота hero на телефоні (Instagram / iOS toolbar) — дублює layout.js
	useEffect(() => {
		const setAppHeight = () => {
			const h = window.visualViewport?.height ?? window.innerHeight
			document.documentElement.style.setProperty('--app-height', `${h}px`)
		}
		setAppHeight()
		window.addEventListener('resize', setAppHeight, { passive: true })
		window.addEventListener('orientationchange', setAppHeight, { passive: true })
		window.visualViewport?.addEventListener('resize', setAppHeight, {
			passive: true,
		})
		return () => {
			window.removeEventListener('resize', setAppHeight)
			window.removeEventListener('orientationchange', setAppHeight)
			window.visualViewport?.removeEventListener('resize', setAppHeight)
		}
	}, [])

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
			{/* Background — black + purple glow + right neon arcs */}
			<div className={styles.bgStack} aria-hidden='true'>
				<div className={styles.bgGlowTopLeft} />
				<div className={styles.bgGlowRight} />
				<div className={styles.bgGlowBottomRight} />
				<div className={styles.bgArcs} />
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
									src='/hero-teachers-v8.png'
									alt='Викладачі SmartCode Academy'
									fill
									className={styles.heroImage}
									priority
									quality={92}
									sizes='(max-width: 1024px) 100vw, 50vw'
								/>
							</div>
						</div>
					)}
				</div>

				{/* Course Cards */}
				{shouldRenderCards ? (
					<EnhancedCourseCards />
				) : (
					<div
						style={{ minHeight: '980px', marginTop: 240, width: '100%' }}
						aria-hidden='true'
					/>
				)}
			</div>
		</div>
	)
}

export default Visit
