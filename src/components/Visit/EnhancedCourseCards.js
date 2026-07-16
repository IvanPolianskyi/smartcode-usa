'use client'
import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import styles from './EnhancedCourseCards.module.css'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useHomeCourseCards } from '@/hooks/useHomeCourseCards'
import Image from 'next/image'

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth <= 1024)
		}

		checkIsMobile()

		let timeoutId
		const handleResize = () => {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(checkIsMobile, 150)
		}

		window.addEventListener('resize', handleResize, { passive: true })

		return () => {
			window.removeEventListener('resize', handleResize)
			clearTimeout(timeoutId)
		}
	}, [])

	return isMobile
}

const EnhancedCourseCards = () => {
	const t = useTranslations('homeSections.courseCards')
	const courses = useHomeCourseCards()
	const [hoveredCard, setHoveredCard] = useState(null)
	const router = useRouter()
	const isMobile = useIsMobile()

	const handleMouseEnter = (index) => {
		if (!isMobile) {
			setHoveredCard(index)
		}
	}

	const handleMouseLeave = () => {
		if (!isMobile) {
			setHoveredCard(null)
		}
	}

	const getExpandedCard = () => (isMobile ? null : hoveredCard)

	return (
		<div id="our-courses" className={styles.sectionContainer}>
			<div className={styles.sectionHeader}>
				<h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
			</div>
			<div className={styles.wrapper}>
				{courses.map((course, index) => {
					const expandedCard = getExpandedCard()
					const isExpanded = expandedCard === index
					const isOtherExpanded = expandedCard !== null && !isExpanded

					const cardClasses = [
						styles.card,
						styles[course.theme],
						styles.cardVisible,
						isExpanded ? styles.cardExpanded : '',
						isOtherExpanded ? styles.cardShrunk : '',
					].join(' ')

					return (
						<div
							key={course.id}
							className={cardClasses}
							onMouseEnter={() => handleMouseEnter(index)}
							onMouseLeave={handleMouseLeave}
							onClick={() => {
								router.push(course.href)
							}}
							role="link"
							tabIndex={0}
							aria-label={`${course.title} — ${t('goTo')}`}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
									e.preventDefault()
									router.push(course.href)
								}
							}}
						>
							<div className={styles.cardBackground}></div>
							{!isMobile && <div className={styles.cardEffects}></div>}

							<div className={styles.centerIconWrapper}>
								<div
									className={`${styles.centerIcon} ${
										isExpanded ? styles.centerIconHovered : ''
									} ${course.iconType === 'image' ? styles.centerIconImage : ''}`}
								>
									{course.iconType === 'image' ? (
										<div className={styles.logoImageContainer}>
											{course.icon.endsWith('.svg') ? (
												<img
													src={course.icon}
													alt=""
													aria-hidden="true"
													className={styles.logoImage}
													loading={index < 2 ? 'eager' : 'lazy'}
													decoding="async"
												/>
											) : (
												<Image
													src={course.icon}
													alt=""
													aria-hidden="true"
													width={180}
													height={180}
													className={styles.logoImage}
													priority={index < 2}
													loading={index < 2 ? 'eager' : 'lazy'}
												/>
											)}
										</div>
									) : (
										course.icon
									)}
								</div>
							</div>

							<div
								className={`${styles.goLabel} ${
									isExpanded || isMobile ? styles.goLabelVisible : ''
								}`}
							>
								<span className={styles.goText}>{t('goTo')}</span>
								<ArrowRight className={styles.goArrow} aria-hidden="true" />
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default EnhancedCourseCards
