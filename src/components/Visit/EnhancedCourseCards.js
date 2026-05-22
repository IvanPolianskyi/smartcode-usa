'use client'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
	Star,
	Users,
	Clock,
	PlayCircle,
	ArrowRight,
	Target,
	CheckCircle,
	Eye,
} from 'lucide-react'
import styles from './EnhancedCourseCards.module.css'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useHomeCourseCards } from '@/hooks/useHomeCourseCards'
import Image from 'next/image'

// Функція для генерації частинок з урахуванням теми
// Більше частинок (26 всього), але анімуються тільки 3-4
const generateParticles = colors => {
	const particleTypes = [
		{ type: 'particle1', count: 8, colors: colors.slice(0, 2) },
		{ type: 'particle2', count: 6, colors: colors.slice(1, 3) },
		{ type: 'particle3', count: 5, colors: colors.slice(2, 4) },
		{ type: 'particle4', count: 7, colors: [colors[3], colors[0]] },
	]

	// Генеруємо всі частинки
	const allParticles = particleTypes.flatMap(({ type, count, colors }) =>
		Array.from({ length: count }, (_, i) => ({
			id: `${type}-${i}`,
			type,
			color: colors[Math.floor(Math.random() * colors.length)],
			left: Math.random() * 100,
			top: Math.random() * 100,
		}))
	)

	// Випадково вибираємо 3-4 частинки для анімації
	const maxAnimated = 3 + Math.floor(Math.random() * 2) // 3 або 4
	const animatedIndices = new Set()
	while (animatedIndices.size < maxAnimated && animatedIndices.size < allParticles.length) {
		animatedIndices.add(Math.floor(Math.random() * allParticles.length))
	}

	// Додаємо інформацію про анімацію
	return allParticles.map((p, index) => ({
		...p,
		animated: animatedIndices.has(index),
		animationDelay: animatedIndices.has(index) ? `${Math.random() * 15}s` : '0s',
		animationDuration: animatedIndices.has(index) ? `${8 + Math.random() * 10}s` : 'none',
	}))
}

// Хук для визначення чи це мобільний пристрій
// Оптимізовано з debounce для кращої продуктивності
const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth <= 1024)
		}

		checkIsMobile()
		
		// Debounce resize для кращої продуктивності
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

// Окремий компонент для частинок, щоб оптимізувати рендеринг
// Обгорнуто в React.memo, щоб не перерендерюватися при наведенні на картки
const ParticleBackground = React.memo(({ colors }) => {
	const particlesRef = useRef(null)
	
	// Генеруємо частинки один раз при монтуванні
	useEffect(() => {
		if (!particlesRef.current) {
			particlesRef.current = generateParticles(colors)
		}
	}, [colors])

	if (!particlesRef.current) {
		return null
	}

	return (
		<div className={styles.particleContainer}>
			{particlesRef.current.map(p => (
				<div
					key={p.id}
					className={`${styles.particle} ${styles[p.type]} ${p.animated ? styles.particleAnimated : styles.particleStatic}`}
					style={{
						'--particle-color': p.color,
						left: `${p.left}%`,
						top: `${p.top}%`,
						animationDelay: p.animationDelay,
						animationDuration: p.animationDuration,
					}}
				/>
			))}
		</div>
	)
}, (prevProps, nextProps) => {
	// Кастомна функція порівняння - перерендерюємо тільки якщо змінилися кольори
	return JSON.stringify(prevProps.colors) === JSON.stringify(nextProps.colors)
})

const EnhancedCourseCards = () => {
	const t = useTranslations('homeSections.courseCards')
	const courses = useHomeCourseCards()
	const [hoveredCard, setHoveredCard] = useState(null)
	const router = useRouter()
	const isMobile = useIsMobile()

	// Оптимізовані обробники hover без debounce для швидкої реакції
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

    // На мобільних картки не розгортаються; клік веде одразу на сторінку курсу.
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
                        role={'link'}
						tabIndex={0}
						onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                                e.preventDefault()
                                router.push(course.href)
                            }
						}}
					>
                        {/* --- ФОН ТА ЕФЕКТИ --- */}
                        <div className={styles.cardBackground}></div>
                        {!isMobile && <div className={styles.cardEffects}></div>}
                        {!isMobile && (
							<ParticleBackground 
								colors={course.particleColors}
							/>
						)}

						{/* --- ІНТЕРАКТИВНІ ЕЛЕМЕНТИ (завжди видимі) --- */}
                        {!isMobile && (
                        <div
							className={`${styles.hoverElements} ${styles.hoverElementsVisible}`}
						>
							{course.id === 'python' && (
								<>
									<div className={`${styles.hoverElement} ${styles.pythonEl1}`}>
										⭐
									</div>
									<div className={`${styles.hoverElement} ${styles.pythonEl2}`}>
										🚀
									</div>
									<div className={`${styles.hoverElement} ${styles.pythonEl3}`}>
										🌌
									</div>
								</>
							)}
							{course.id === 'gamedev' && (
								<>
									<div
										className={`${styles.hoverElement} ${styles.gamedevEl1}`}
									>
										🎯
									</div>
									<div
										className={`${styles.hoverElement} ${styles.gamedevEl2}`}
									>
										💎
									</div>
									<div
										className={`${styles.hoverElement} ${styles.gamedevEl3}`}
									>
										⚡
									</div>
								</>
							)}
							{course.id === 'webdev' && (
								<>
									<div className={`${styles.hoverElement} ${styles.webdevEl1}`}>
										&lt;div&gt;
									</div>
									<div className={`${styles.hoverElement} ${styles.webdevEl2}`}>
										{'{...}'}
									</div>
									<div className={`${styles.hoverElement} ${styles.webdevEl3}`}>
										⚙️
									</div>
								</>
							)}
                            {course.id === 'roblox' && (
                                <>
                                    <div className={`${styles.hoverElement} ${styles.robloxEl1}`}>
                                        🧱
                                    </div>
                                    <div className={`${styles.hoverElement} ${styles.robloxEl2}`}>
                                        🎮
                                    </div>
                                    <div className={`${styles.hoverElement} ${styles.robloxEl3}`}>
                                        🛠️
                                    </div>
                                </>
                            )}
                        </div>
                        )}

						{/* --- ВЕРХНЯ ЧАСТИНА (РЕЙТИНГ) --- */}
						<div className={styles.topSection}>
							<div className={styles.rating}>
								<Star className={styles.ratingIcon} />
								<span className={styles.ratingValue}>{course.rating}</span>
							</div>
						</div>

						{/* --- ЦЕНТРАЛЬНА ІКОНКА --- */}
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
												alt={`${course.title} logo`}
												className={styles.logoImage}
												loading={index < 2 ? 'eager' : 'lazy'}
												decoding="async"
											/>
										) : (
											<Image
												src={course.icon}
												alt={`${course.title} logo`}
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

						{/* --- НИЖНІЙ КОНТЕНТ --- */}
						<div className={styles.bottomContent}>
							<div className={styles.titleWrapper}>
								<h3
									className={`${styles.title} ${
										isExpanded && course.id === 'python'
											? styles.titleCosmic
											: ''
									}`}
								>
									{course.title}
								</h3>
								<p className={styles.subtitle}>{course.subtitle}</p>
							</div>

                            {/* Постійна кнопка переходу */}
                            <div className={styles.ctaRow}>
                                <Link
                                    href={course.href}
                                    className={styles.ctaButton}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <span>{t('goTo')}</span>
                                    <ArrowRight className={styles.buttonArrow} />
                                </Link>
                            </div>

							{/* --- ДЕТАЛІ (з'являються при наведенні/скролі) --- */}
							<div
								className={`${styles.details} ${
									isExpanded || isMobile ? styles.detailsVisible : ''
								}`}
								aria-hidden={!isExpanded && !isMobile}
							>
								<p className={styles.description}>{course.description}</p>
								<div className={styles.featuresGrid}>
									{course.features.map((feature, i) => (
										<div key={i} className={styles.featureItem}>
											<CheckCircle className={styles.featureIcon} />
											<span>{feature}</span>
										</div>
									))}
								</div>
								<div className={styles.statsGrid}>
									<div className={styles.statItem}>
										<Users className={styles.statIcon} />
										<span>{course.stats.age} {t('years')}</span>
									</div>
									<div className={styles.statItem}>
										<Eye className={styles.statIcon} />
										<span>{course.stats.students} {t('students')}</span>
									</div>
									<div className={styles.statItem}>
										<Target className={styles.statIcon} />
										<span>{course.stats.projects} {t('projects')}</span>
									</div>
								</div>
                                <Link 
                                    href={course.href} 
                                    className={styles.actionButton}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.dispatchEvent(new Event('openContactModal'))
                                    }}
                                    scroll={false}
                                >
									<PlayCircle className={styles.buttonIcon} />
									<span>{t('startLearning')}</span>
									<ArrowRight className={styles.buttonArrow} />
								</Link>
								{/* Кнопка "Перейти" для мобільної версії */}
								<Link
									href={course.href}
									className={styles.mobileGoButton}
									onClick={e => e.stopPropagation()}
								>
									<span>{t('goTo')}</span>
									<ArrowRight className={styles.buttonArrow} />
								</Link>
							</div>
						</div>

						{/* --- БІЧНА НАЗВА --- */}
						<div
							className={`${styles.sideLabel} ${
								isExpanded ? styles.sideLabelHovered : ''
							}`}
						>
							<span className={styles.sideLabelText}>{course.title}</span>
						</div>
					</div>
				)
			})}
			</div>
		</div>
	)
}

export default EnhancedCourseCards