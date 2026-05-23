'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Award, ArrowRight, CheckCircle, Code, Gamepad2, Box, Monitor, Sparkles } from 'lucide-react'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import styles from './KnowledgeTestSection.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DIRECTION_META = [
	{ id: 'python', icon: Code, color: '#3b82f6', nameKey: 'python' },
	{ id: 'roblox', icon: Box, color: '#10b981', nameKey: 'roblox' },
	{ id: 'webdev', icon: Monitor, color: '#8b5cf6', nameKey: 'webdev' },
	{ id: 'unity', icon: Gamepad2, color: '#f59e0b', nameKey: 'unity' },
]

const KnowledgeTestSection = () => {
	const t = useTranslations('pages.knowledgeTest.section')
	const td = useTranslations('pages.knowledgeTest.directions')
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef(null)
	const router = useRouter()

	const directions = useMemo(
		() =>
			DIRECTION_META.map((d) => ({
				...d,
				name: d.nameKey === 'webdev' ? t('directions.webdev') : td(`${d.nameKey}.name`),
			})),
		[t, td]
	)

	useEffect(() => {
		setIsVisible(true)

		if (sectionRef.current) {
			gsap.fromTo(
				sectionRef.current.querySelectorAll('.animate-up'),
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.15,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 85%',
						end: 'bottom 15%',
						toggleActions: 'play none none reverse',
					},
				}
			)

			gsap.fromTo(
				sectionRef.current.querySelectorAll('.animate-scale'),
				{ scale: 0.8, opacity: 0 },
				{
					scale: 1,
					opacity: 1,
					duration: 0.6,
					ease: 'back.out(1.7)',
					stagger: 0.1,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reverse',
					},
				}
			)
		}
	}, [])

	const handleDirectionClick = (directionId) => {
		router.push(`/knowledge-test?course=${directionId}`)
	}

	return (
		<section className={styles.section} ref={sectionRef}>
			<div className={styles.backgroundElements}>
				<div className={styles.floatingElement1}></div>
				<div className={styles.floatingElement2}></div>
				<div className={styles.floatingElement3}></div>
			</div>

			<div className={styles.container}>
				<div className={`${styles.header} animate-up`}>
					<div className={styles.iconWrapper}>
						<Award className={styles.icon} />
						<Sparkles className={styles.sparkleIcon} />
					</div>
					<h2 className={styles.title}>{t('title')}</h2>
					<p className={styles.subtitle}>{t('subtitle')}</p>
				</div>

				<div className={styles.content}>
					<div className={styles.features}>
						<div className={`${styles.featureCard} animate-scale`}>
							<div className={styles.featureIcon}>
								<CheckCircle size={24} />
							</div>
							<h3 className={styles.featureTitle}>{t('features.questions.title')}</h3>
							<p className={styles.featureText}>{t('features.questions.text')}</p>
						</div>

						<div className={`${styles.featureCard} animate-scale`}>
							<div className={styles.featureIcon}>
								<Award size={24} />
							</div>
							<h3 className={styles.featureTitle}>{t('features.instant.title')}</h3>
							<p className={styles.featureText}>{t('features.instant.text')}</p>
						</div>

						<div className={`${styles.featureCard} animate-scale`}>
							<div className={styles.featureIcon}>
								<Sparkles size={24} />
							</div>
							<h3 className={styles.featureTitle}>{t('features.directions.title')}</h3>
							<p className={styles.featureText}>{t('features.directions.text')}</p>
						</div>
					</div>

					<div className={styles.directionsGrid}>
						{directions.map((direction, index) => {
							const Icon = direction.icon
							return (
								<div
									key={direction.id}
									className={`${styles.directionCard} animate-scale`}
									style={{
										'--direction-color': direction.color,
										animationDelay: `${index * 0.1}s`,
										cursor: 'pointer',
									}}
									onClick={() => handleDirectionClick(direction.id)}
								>
									<div
										className={styles.directionIcon}
										style={{
											backgroundColor: `${direction.color}20`,
											color: direction.color,
										}}
									>
										<Icon size={28} />
									</div>
									<h4 className={styles.directionName}>{direction.name}</h4>
								</div>
							)
						})}
					</div>

					<div className={`${styles.ctaContainer} animate-up`}>
						<Link href="/knowledge-test" className={styles.ctaButton}>
							<span>{t('cta')}</span>
							<ArrowRight size={20} />
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default KnowledgeTestSection
