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
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

const courses = [
	{
		id: 'python',
		title: 'PYTHON',
		subtitle: 'Програмування майбутнього',
		icon: '/python-logo.png',
		iconType: 'image',
		description:
			'Відкрий космос можливостей з найпопулярнішою мовою програмування світу. Створюй ШІ, веб-додатки та аналізуй дані.',
		features: [
			'Основи Python',
			'ООП та алгоритми',
			'Django/Flask',
			'Data Science',
		],
		stats: {
			age: '8-17',
			students: '324+',
			projects: '20+',
		},
		badge: 'Космічний хіт',
		rating: 4.9,
		theme: 'themePython',
		particleColors: ['#c084fc', '#93c5fd', '#f9a8d4', '#fbbf24'],
        href: '/python',
	},
	{
        id: 'roblox',
        title: 'ROBLOX',
        subtitle: 'Створюй ігри у Roblox Studio',
        icon: '/logos/roblox.svg',
        iconType: 'image',
        description:
            'Поринь у світ геймдизайну та скриптингу з Roblox Studio і Lua. Створюй свої світи, механіки та публікуй ігри.',
        features: ['Roblox Studio', 'Lua', 'Геймдизайн', 'Публікація ігор'],
        stats: {
            age: '6-17',
            students: '140+',
            projects: '8+',
        },
        badge: 'Популярно',
        rating: 4.8,
        theme: 'themeRoblox',
        particleColors: ['#fecaca', '#fca5a5', '#fb7185', '#f87171'],
        href: '/Roblox',
    },
	{
		id: 'gamedev',
		title: 'ГЕЙМДЕВ',
		subtitle: 'Створення власних ігор за допомогою Unity',
		icon: '/logos/unity.svg',
		iconType: 'image',
		description:
			'Розробляй захоплюючі ігри на Unity. Від простих 2D до складних 3D проектів.',
		features: ['C#', 'Unity 3D', 'Дизайн персонажів', 'Логіка геймплею'],
		stats: {
			duration: '8 міс',
			age: '8-17',
			students: '189+',
			projects: '12+',
		},
		badge: 'Тренд 2025',
		rating: 4.8,
		theme: 'themeGamedev',
		particleColors: ['#6ee7b7', '#5eead4', '#a7f3d0', '#34d399'],
        href: '/Unity',
	},
	{
		id: 'webdev',
		title: 'ВЕБ-РОЗРОБКА',
		subtitle: 'Сучасні сайти та додатки',
		icon: '/logos/web.svg',
		iconType: 'image',
		description:
			'Створюй адаптивні сайти та веб-додатки з HTML, CSS, JavaScript та React, що вражають своєю швидкістю та дизайном.',
		features: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
		stats: {
			age: '10-17',
			students: '156+',
			projects: '10+',
		},
		badge: 'Новинка',
		rating: 4.9,
		theme: 'themeWebdev',
		particleColors: ['#7dd3fc', '#67e8f9', '#a5f3fc', '#38bdf8'],
        href: '/webDev',
	},
    
]

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
    const [hoveredCard, setHoveredCard] = useState(null)
	const [isVisible, setIsVisible] = useState(false)
	const [visibleCards, setVisibleCards] = useState(new Set())
	const router = useRouter()
	const isMobile = useIsMobile()
	const cardRefs = useRef([])
	const observerRef = useRef(null)

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100)
		return () => clearTimeout(timer)
	}, [])

	// Intersection Observer для lazy loading карток
	useEffect(() => {
		if (isMobile || typeof window === 'undefined' || !window.IntersectionObserver) {
			// На мобільних або якщо немає підтримки - показуємо всі
			setVisibleCards(new Set(courses.map((_, i) => i)))
			return
		}

		// Невелика затримка для того, щоб refs встигли встановитися
		const timeoutId = setTimeout(() => {
			observerRef.current = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const index = parseInt(entry.target.dataset.index, 10)
							setVisibleCards((prev) => new Set([...prev, index]))
						}
					})
				},
				{ rootMargin: '100px', threshold: 0.1 }
			)

			cardRefs.current.forEach((ref, index) => {
				if (ref) {
					ref.dataset.index = index
					observerRef.current.observe(ref)
				}
			})
		}, 100)

		return () => {
			clearTimeout(timeoutId)
			if (observerRef.current) {
				observerRef.current.disconnect()
			}
		}
	}, [isMobile])

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
		<div className={styles.sectionContainer}>
			<div className={styles.sectionHeader}>
				<h2 className={styles.sectionTitle}>Навчальні предмети</h2>
			</div>
			<div className={styles.wrapper}>
				{courses.map((course, index) => {
				const expandedCard = getExpandedCard()
				const isExpanded = expandedCard === index
				const isOtherExpanded = expandedCard !== null && !isExpanded
				
                const cardClasses = [
					styles.card,
					styles[course.theme],
					isVisible ? styles.cardVisible : styles.cardHidden,
					isExpanded ? styles.cardExpanded : '',
					isOtherExpanded ? styles.cardShrunk : '',
				].join(' ')

                return (
					<div
						key={course.id}
						ref={(el) => {
							cardRefs.current[index] = el
						}}
						className={cardClasses}
						style={{ transitionDelay: `${index * 100}ms` }}
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
                        {!isMobile && visibleCards.has(index) && (
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
                                    <span>Перейти</span>
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
										<span>{course.stats.age} років</span>
									</div>
									<div className={styles.statItem}>
										<Eye className={styles.statIcon} />
										<span>{course.stats.students} учнів</span>
									</div>
									<div className={styles.statItem}>
										<Target className={styles.statIcon} />
										<span>{course.stats.projects} проектів</span>
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
									<span>Почати навчання</span>
									<ArrowRight className={styles.buttonArrow} />
								</Link>
								{/* Кнопка "Перейти" для мобільної версії */}
								<Link
									href={course.href}
									className={styles.mobileGoButton}
									onClick={e => e.stopPropagation()}
								>
									<span>Перейти</span>
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