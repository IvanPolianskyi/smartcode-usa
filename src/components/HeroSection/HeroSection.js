'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
	ChevronLeft,
	ChevronRight,
	Code,
	Users,
	Play,
	CheckCircle,
	Zap,
	ShieldCheck,
	BarChart,
} from 'lucide-react'
import { gsap } from 'gsap'
import { useTranslations } from 'next-intl'
import styles from './HeroSection.module.css'
import { Link } from '@/i18n/navigation'

const SLIDE_META = [
	{ id: 'platform', icon: <Code size={24} />, accentColor: '#2563eb' },
	{ id: 'mentorship', icon: <Users size={24} />, accentColor: '#10b981' },
	{ id: 'community', icon: <Zap size={24} />, accentColor: '#f59e0b' },
]

function normalizeFeatures(raw) {
	if (Array.isArray(raw)) return raw
	return Object.keys(raw)
		.sort((a, b) => Number(a) - Number(b))
		.map((k) => raw[k])
}

const HeroSection = () => {
	const t = useTranslations('homeSections.hero')
	const slides = useMemo(
		() =>
			SLIDE_META.map((meta) => {
				const raw = t.raw(`slides.${meta.id}`)
				return {
					...meta,
					superTitle: raw.superTitle,
					title: raw.title,
					subtitle: raw.subtitle,
					features: normalizeFeatures(raw.features),
				}
			}),
		[t]
	)
	const [currentSlide, setCurrentSlide] = useState(0)
	const containerRef = useRef(null)
	const timeline = useRef(null)

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.anim-element',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					ease: 'power3.out',
					stagger: 0.15,
					delay: 0.5,
				}
			)
		}, containerRef)

		return () => ctx.revert()
	}, [])

	const changeSlide = (newIndex) => {
		if (
			(timeline.current && timeline.current.isActive()) ||
			newIndex === currentSlide
		) {
			return
		}

		const direction = newIndex > currentSlide ? 1 : -1

		timeline.current = gsap.timeline()
		timeline.current
			.to('.slide-content', {
				x: direction * -30,
				opacity: 0,
				duration: 0.4,
				ease: 'power2.in',
				stagger: 0.05,
			})
			.call(() => setCurrentSlide(newIndex))
			.fromTo(
				'.slide-content',
				{ x: direction * 30, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.5,
					ease: 'power2.out',
					stagger: 0.08,
				}
			)
	}

	const nextSlide = () => changeSlide((currentSlide + 1) % slides.length)
	const prevSlide = () => changeSlide((currentSlide - 1 + slides.length) % slides.length)
	const goToSlide = (index) => changeSlide(index)

	const { superTitle, title, subtitle, features, icon, accentColor } = slides[currentSlide]

	return (
		<section className={styles.heroSection} ref={containerRef}>
			<div className={styles.container}>
				<div className={styles.contentWrapper}>
					<div className={styles.leftContent}>
						<div className={`${styles.badge} anim-element`} style={{ '--accent-color': accentColor }}>
							{icon}
							<span>{superTitle}</span>
						</div>

						<h1 className={`${styles.title} anim-element`}>{title}</h1>

						<p className={`${styles.subtitle} anim-element`}>{subtitle}</p>

						<ul className={`${styles.featuresList} anim-element`}>
							{features.map((feature, index) => (
								<li key={index} className="slide-content">
									<CheckCircle size={18} style={{ color: accentColor }} />
									<span>{feature}</span>
								</li>
							))}
						</ul>

						<div className={`${styles.ctaWrapper} anim-element`}>
							<Link
								href="/#contact"
								className={styles.ctaButton}
								style={{ '--accent-color': accentColor }}
								onClick={(e) => {
									e.preventDefault()
									window.dispatchEvent(new Event('openContactModal'))
								}}
								scroll={false}
							>
								<Play size={18} />
								{t('tryFree')}
							</Link>
						</div>
					</div>

					<div className={styles.rightContent}>
						<div className={`${styles.mockupWrapper} anim-element`}>
							<div className={styles.mockup} style={{ '--accent-color': accentColor }}>
								<div className={styles.mockupHeader}>
									<div className={styles.mockupDots}>
										<span></span>
										<span></span>
										<span></span>
									</div>
									<div className={styles.mockupTitle}>{superTitle}</div>
								</div>
								<div className={styles.mockupBody}>
									<div className={`${styles.mockupIcon} slide-content`}>{icon}</div>
									<h3 className={`${styles.mockupMainText} slide-content`}>{title}</h3>
									<div className={`${styles.mockupStats} slide-content`}>
										<div className={styles.statItem}>
											<BarChart size={16} />
											<span>{t('mockupProgress')}</span>
										</div>
										<div className={styles.statItem}>
											<ShieldCheck size={16} />
											<span>{t('mockupLevel')}</span>
										</div>
									</div>
									<div className={`${styles.mockupProgressBar} slide-content`}>
										<div className={styles.mockupProgressFill} style={{ width: '75%' }}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.navigation}>
					<div className={`${styles.navButtons} anim-element`}>
						<button onClick={prevSlide} className={styles.navButton} aria-label="Previous Slide">
							<ChevronLeft size={24} />
						</button>
						<button onClick={nextSlide} className={styles.navButton} aria-label="Next Slide">
							<ChevronRight size={24} />
						</button>
					</div>
					<div className={`${styles.slideIndicators} anim-element`}>
						{slides.map((slide, index) => (
							<button
								key={slide.id}
								onClick={() => goToSlide(index)}
								className={styles.indicator}
								aria-label={`Go to slide ${index + 1}`}
							>
								<div
									className={`${styles.indicatorFill} indicator-fill`}
									style={{
										transform: currentSlide === index ? 'scaleX(1)' : 'scaleX(0)',
										backgroundColor:
											currentSlide === index ? accentColor : 'transparent',
									}}
								></div>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
