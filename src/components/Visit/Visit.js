'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Star } from 'lucide-react'
import styles from './Visit.module.css'
import HeroTrialForm from './HeroTrialForm'

const EnhancedCourseCards = dynamic(() => import('./EnhancedCourseCards'), {
	loading: () => <div style={{ minHeight: '980px', width: '100%' }} />,
})

const SCHOOL_LABEL = 'Онлайн школа програмування для дітей 7–17 років'

function SocialProofRow({ className = '' }) {
	return (
		<div className={`${styles.starsRow} ${className}`.trim()}>
			{[1, 2, 3, 4, 5].map((i) => (
				<Star key={i} size={16} className={styles.starIcon} />
			))}
			<span className={styles.ratingText}>4.9</span>
			<span className={styles.ratingDivider}>·</span>
			<span className={styles.socialProofText}>5000+ учнів</span>
			<span className={styles.ratingDivider}>·</span>
			<span className={styles.socialProofText}>5 років досвіду</span>
			<span className={styles.ratingDivider}>·</span>
			<span className={styles.socialProofText}>100 000+ підписників</span>
		</div>
	)
}

const Visit = () => {
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
			{/* Background — black + purple glow + right neon arcs */}
			<div className={styles.bgStack} aria-hidden='true'>
				<div className={styles.bgGlowTopLeft} />
				<div className={styles.bgGlowRight} />
				<div className={styles.bgGlowBottomRight} />
				<div className={styles.bgArcs} />
			</div>

			<div className={styles.mainContainer}>
				{/* Hero — текст зліва, форма в бейджі справа */}
				<div className={styles.hero}>
					<div className={styles.heroLeft}>
						<p className={styles.schoolLabel}>{SCHOOL_LABEL}</p>

						<h1 className={styles.title}>
							<span className={styles.titleMain}>від ігор -</span>
							<span className={styles.titleAccentMid}> до професії</span>
							<span className={styles.titleAccentEnd}> майбутнього</span>
						</h1>

						<p className={styles.subtitle}>
							Перетворіть інтерес вашої дитини до ігор - на навичку, яка відкриє двері в IT вже сьогодні
						</p>

						<div className={styles.socialProofDesktop}>
							<SocialProofRow className={styles.socialProofDesktopRow} />
						</div>
					</div>

					<div className={styles.heroRight}>
						<div className={styles.heroFormBadge}>
							<HeroTrialForm />
						</div>
					</div>

					{/* Мобільний: бейдж + рейтинг під формою */}
					<div className={styles.heroMetaMobile}>
						<p className={styles.heroMetaMobileLabel}>{SCHOOL_LABEL}</p>
						<SocialProofRow className={styles.heroMetaMobileStats} />
					</div>
				</div>

				{/* Course Cards */}
				{shouldRenderCards ? (
					<EnhancedCourseCards />
				) : (
					<div
						style={{ minHeight: '980px', marginTop: 120, width: '100%' }}
						aria-hidden='true'
					/>
				)}
			</div>
		</div>
	)
}

export default Visit
