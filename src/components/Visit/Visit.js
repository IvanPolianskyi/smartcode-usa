'use client'
import React, { useState, useEffect, useRef } from 'react'
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
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Visit.module.css'
import Link from 'next/link'
import HeroTrialForm from './HeroTrialForm'

const EnhancedCourseCards = dynamic(() => import('./EnhancedCourseCards'), {
	loading: () => <div style={{ minHeight: '980px', width: '100%' }} />,
})

// Guard: ScrollTrigger uses DOM APIs — only register in the browser
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)
}

const Visit = () => {
	const sectionRef = useRef(null)
	const [isMounted, setIsMounted] = useState(false)
	const [shouldRenderCards, setShouldRenderCards] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		let idleId = null
		let timeoutId = null

		const scheduleCardsRender = () => setShouldRenderCards(true)

		if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
			idleId = window.requestIdleCallback(scheduleCardsRender, { timeout: 1200 })
		} else {
			timeoutId = window.setTimeout(scheduleCardsRender, 350)
		}

		return () => {
			if (idleId != null && typeof window !== 'undefined' && typeof window.cancelIdleCallback === 'function') {
				window.cancelIdleCallback(idleId)
			}
			if (timeoutId != null) {
				window.clearTimeout(timeoutId)
			}
		}
	}, [])

	useEffect(() => {
		// GSAP анімації появи при скролі з оптимізацією для мобільних
		// Критичні елементи (title) не анімуються для кращого LCP
		// На мобільних пристроях анімації вимкнені для уникнення тремтіння
		let ctx = null
		if (sectionRef.current && isMounted) {
			const isMobile = window.innerWidth <= 768
			
			// На мобільних пристроях не запускаємо анімації для уникнення тремтіння
			if (isMobile) {
				return
			}
			
			ctx = gsap.context(() => {
				// Десктоп: анімації тільки для не-критичних елементів
				gsap.fromTo(
					'.animate-up:not(.title-critical)',
					{ y: 30, opacity: 0.8 },
					{
						y: 0,
						opacity: 1,
						duration: 0.5,
						ease: 'power3.out',
						stagger: 0.08,
						scrollTrigger: {
							trigger: sectionRef.current,
							start: 'top 85%',
							end: 'bottom 15%',
							toggleActions: 'play none none reverse',
						},
					}
				)

				gsap.fromTo(
					'.animate-slide',
					{ x: -30, opacity: 0.8 },
					{
						x: 0,
						opacity: 1,
						duration: 0.4,
						ease: 'power2.out',
						stagger: 0.06,
						scrollTrigger: {
							trigger: sectionRef.current,
							start: 'top 75%',
							toggleActions: 'play none none reverse',
						},
					}
				)

				gsap.fromTo(
					'.animate-scale',
					{ scale: 0.97, opacity: 0.8 },
					{
						scale: 1,
						opacity: 1,
						duration: 0.4,
						ease: 'back.out(1.2)',
						stagger: 0.03,
						scrollTrigger: {
							trigger: sectionRef.current,
							start: 'top 80%',
							toggleActions: 'play none none reverse',
						},
					}
				)
			}, sectionRef)
		}

		return () => {
			if (ctx) ctx.revert()
		}
	}, [isMounted])

	const handleTrialCtaClick = (e) => {
		e.preventDefault()
		window.dispatchEvent(new Event('openContactModal'))
	}

	const heroFeatures = (
		<div className={`${styles.heroFeatures} animate-slide`}>
			<div className={styles.feature}>
				<div className={styles.featureIcon}>
					<Users className={styles.icon} />
				</div>
				<span>Віком 8-17 років</span>
			</div>
			<div className={styles.feature}>
				<div className={styles.featureIcon}>
					<Monitor className={styles.icon} />
				</div>
				<span>Онлайн заняття</span>
			</div>
			<div className={styles.feature}>
				<div className={styles.featureIcon}>
					<Award className={styles.icon} />
				</div>
				<span>Міжнародний сертифікат</span>
			</div>
		</div>
	)

	const stats = [
		{ 
			number: '5000+', 
			label: 'дітей навчаються по всьому світу', 
			icon: <Users />,
			iconColor: '#3b82f6'
		},
		{ 
			number: '100%', 
			label: 'занять проходять з живими викладачами', 
			icon: <Code />,
			iconColor: '#3b82f6'
		},
		{ 
			number: '4+ курсів', 
			label: 'Пайтон, Roblox, Unity, Вебдев', 
			icon: <BookOpen />,
			iconColor: '#3b82f6'
		},
		{ 
			number: '0 грн', 
			label: 'Вартість пробного заняття', 
			icon: <Trophy />,
			iconColor: '#3b82f6'
		},
	]

	return (
		<div className={styles.container} ref={sectionRef}>
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

							<p className={`${styles.subtitle} animate-up`}>
								Живі уроки в Zoom, онлайн платформа та безкоштовне пробне заняття
							</p>
							<div className={styles.lessonTypes}>
								<span className={styles.lessonTypeBadge}>
									<span className={styles.lessonTypeIcon} aria-hidden>
										<Users size={18} />
									</span>
									Групові заняття
								</span>
								<span className={styles.lessonTypeBadge}>
									<span className={styles.lessonTypeIcon} aria-hidden>
										<User size={18} />
									</span>
									індивідуальні
								</span>
							</div>
						</div>

						<div className={styles.ctaDesktop}>
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
										Записатися на пробне заняття
									</span>
								</Link>

							</div>
						</div>

						<div className={styles.ctaMobile}>
							<div className={styles.ctaButtons}>
								<HeroTrialForm />

							</div>
						</div>
					</div>
						

					{/* Statistics */}
					<div className={`${styles.statsContainer} animate-up`}>
						{stats.map((stat, index) => (
							<div
								key={index}
								className={`${styles.statCard} animate-scale`}
								style={{ 
									animationDelay: `${index * 0.1}s`
								}}
							>
								<div 
									className={styles.statIcon}
									style={{ 
										color: '#6366f1'
									}}
								>
									{stat.icon}
								</div>
								<div className={styles.statContent}>
									<div className={styles.statNumber}>
										{stat.number}
									</div>
									<div className={styles.statLabel}>{stat.label}</div>
								</div>
							</div>
						))}
					</div>

					<div className={styles.pricesCtaSection}>
						<Link href='/tariff' className={styles.secondaryButton}>
							Переглянути ціни
						</Link>
					</div>
				</div>

				{shouldRenderCards ? (
					<EnhancedCourseCards />
				) : (
					<div style={{ minHeight: '980px', width: '100%' }} aria-hidden='true' />
				)}


			</div>
		</div>
	)
}

export default Visit
