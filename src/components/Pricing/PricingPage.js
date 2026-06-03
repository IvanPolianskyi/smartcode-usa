'use client'

import React, { useEffect, useRef } from 'react'
import {
	Users,
	User,
	Check,
	Star,
	ArrowRight,
	Clock,
	Video,
	Shield,
	CreditCard,
	BookOpen,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Link } from '@/i18n/navigation'
import styles from './PricingPage.module.css'
import { useTranslations, useLocale } from 'next-intl'
import { formatPrice, getLessonPrice, getEnPurchasableFullCourses } from '@/lib/coursePrices'

gsap.registerPlugin(ScrollTrigger)

const TRUST_KEYS_UK = ['payPerLesson', 'flexible', 'zoom', 'noCommitment']
const TRUST_ICONS_UK = [CreditCard, Clock, Video, Shield]

const TRUST_KEYS_EN = ['fullAccess', 'securePay', 'selfPaced', 'noHidden']
const TRUST_ICONS_EN = [BookOpen, CreditCard, Clock, Shield]

const EN_BUY_PATHS = {
	'roblox-studio': '/buy/roblox-studio',
	'python-developer-zero-to-junior': '/buy/python-developer-zero-to-junior',
}

const PricingPage = () => {
	const t = useTranslations('pricing')
	const locale = useLocale()
	const isEn = locale === 'en'
	const groupInfo = getLessonPrice('group', locale)
	const individualInfo = getLessonPrice('individual', locale)
	const enCourses = getEnPurchasableFullCourses()
	const sectionRef = useRef(null)
	const cardsRef = useRef([])
	useEffect(() => {
		const isMobileDevice = window.innerWidth <= 768

		if (sectionRef.current && !isMobileDevice) {
			gsap.fromTo(
				sectionRef.current.querySelector(`.${styles.title}`),
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 80%',
						toggleActions: 'play none none none',
					},
				}
			)

			cardsRef.current.filter(Boolean).forEach((card, index) => {
				gsap.fromTo(
					card,
					{ opacity: 0, y: 50, scale: 0.95 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.6,
						delay: index * 0.15,
						scrollTrigger: {
							trigger: card,
							start: 'top 85%',
							toggleActions: 'play none none none',
						},
					}
				)
			})
		}

		return () => {
			if (!isMobileDevice) {
				ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
			}
		}
	}, [])

	const handleContactClick = (e) => {
		e.preventDefault()
		if (typeof window !== 'undefined') {
			window.dispatchEvent(new Event('openContactModal'))
		}
	}

	const ukPlans = [
		{
			id: 'group',
			name: t('plans.group.name'),
			icon: <Users size={28} />,
			priceLabel: formatPrice(groupInfo.price, groupInfo.currency, locale),
			period: t('plans.group.period'),
			subtitle: t('plans.group.subtitle'),
			description: t('plans.group.description'),
			features: t.raw('plans.group.features'),
			color: 'purple',
			badge: null,
			cta: t('plans.group.cta'),
		},
		{
			id: 'individual',
			name: t('plans.individual.name'),
			icon: <User size={28} />,
			priceLabel: formatPrice(individualInfo.price, individualInfo.currency, locale),
			period: t('plans.individual.period'),
			subtitle: t('plans.individual.subtitle'),
			description: t('plans.individual.description'),
			features: t.raw('plans.individual.features'),
			color: 'blue',
			badge: t('plans.individual.badge'),
			popular: true,
			cta: t('plans.individual.cta'),
		},
	]

	const trustKeys = isEn ? TRUST_KEYS_EN : TRUST_KEYS_UK
	const trustIcons = isEn ? TRUST_ICONS_EN : TRUST_ICONS_UK
	const trustPoints = trustKeys.map((key, index) => {
		const Icon = trustIcons[index]
		const ns = isEn ? 'enTrust.items' : 'trust.items'
		return {
			icon: <Icon size={24} />,
			title: t(`${ns}.${key}.title`),
			text: t(`${ns}.${key}.text`),
		}
	})

	const heroTitle = isEn ? (
		<>
			{t('en.hero.title')}{' '}
			<span className={styles.titleAccent}>{t('en.hero.titleAccent')}</span>
		</>
	) : (
		<>
			{t('hero.title')}{' '}
			<span className={styles.titleAccent}>{t('hero.titleAccent')}</span>
			<br />
			{t('hero.titleLine2')}
		</>
	)

	const heroSubtitle = isEn ? t('en.hero.subtitle') : t('hero.subtitle')
	const heroCtaLabel = isEn ? t('en.hero.cta') : t('hero.cta')
	const heroCtaHref = isEn ? '/#our-courses' : null

	const finalTitle = isEn ? t('en.finalCta.title') : t('finalCta.title')
	const finalText = isEn ? t('en.finalCta.text') : t('finalCta.text')
	const finalCtaLabel = isEn ? t('en.finalCta.cta') : t('finalCta.cta')
	const trustBadge = isEn ? t('enTrust.badge') : t('trust.badge')
	const trustTitle = isEn ? t('enTrust.title') : t('trust.title')

	return (
		<div ref={sectionRef} className={styles.page}>
			<section className={styles.hero}>
				<div className={styles.heroBackground}>
					<div className={styles.heroBg1} />
					<div className={styles.heroBg2} />
				</div>
				<div className={styles.heroContent}>
					<h1 className={styles.title}>{heroTitle}</h1>
					<p className={styles.subtitle}>{heroSubtitle}</p>
					<div className={styles.heroActions}>
						{isEn ? (
							<Link href={heroCtaHref} className={styles.heroCta}>
								{heroCtaLabel}
								<ArrowRight size={18} />
							</Link>
						) : (
							<button onClick={handleContactClick} className={styles.heroCta}>
								{heroCtaLabel}
								<ArrowRight size={18} />
							</button>
						)}
					</div>
				</div>
			</section>

			<section className={styles.pricingSection}>
				<div className={styles.container}>
					<div className={styles.pricingGrid}>
						{isEn
							? enCourses.map((course, index) => {
									const features = t.raw(`en.courses.${course.courseId}.features`)
									const href = EN_BUY_PATHS[course.courseId] || `/buy/${course.courseId}`
									return (
										<div
											key={course.courseId}
											className={`${styles.pricingCard} ${styles.blue} ${index === 0 ? styles.popular : ''}`}
											ref={(el) => {
												cardsRef.current[index] = el
											}}
										>
											{index === 0 ? (
												<div className={styles.popularBadge}>
													<Star size={14} />
													<span>{t('en.courses.badge')}</span>
												</div>
											) : null}

											<div className={styles.cardHeader}>
												<div className={styles.iconWrapper}>
													<BookOpen size={28} />
												</div>
												<h3 className={styles.planName}>
													{t(`en.courses.${course.courseId}.name`)}
												</h3>
												<p className={styles.planSubtitle}>
													{t(`en.courses.${course.courseId}.subtitle`)}
												</p>
											</div>

											<div className={styles.priceSection}>
												<div className={styles.price}>
													<span className={styles.priceAmount}>
														{formatPrice(course.price, course.currency, 'en')}
													</span>
													<div className={styles.priceLabel}>
														<span className={styles.pricePeriod}>{t('en.courses.period')}</span>
													</div>
												</div>
											</div>

											<p className={styles.planDescription}>
												{t(`en.courses.${course.courseId}.description`)}
											</p>

											<ul className={styles.featuresList}>
												{features.map((feature, idx) => (
													<li key={idx} className={styles.feature}>
														<Check size={18} className={styles.checkIcon} />
														<span>{feature}</span>
													</li>
												))}
											</ul>

											<Link
												href={href}
												className={`${styles.ctaButton} ${index === 0 ? styles.ctaPopular : ''}`}
											>
												<span>{t('en.courses.cta')}</span>
												<ArrowRight size={18} />
											</Link>
										</div>
									)
								})
							: ukPlans.map((plan, index) => (
									<div
										key={plan.id}
										className={`${styles.pricingCard} ${styles[plan.color]} ${
											plan.popular ? styles.popular : ''
										}`}
										ref={(el) => {
											cardsRef.current[index] = el
										}}
									>
										{plan.badge && (
											<div className={styles.popularBadge}>
												<Star size={14} />
												<span>{plan.badge}</span>
											</div>
										)}

										<div className={styles.cardHeader}>
											<div className={styles.iconWrapper}>{plan.icon}</div>
											<h3 className={styles.planName}>{plan.name}</h3>
											<p className={styles.planSubtitle}>{plan.subtitle}</p>
										</div>

										<div className={styles.priceSection}>
											<div className={styles.price}>
												<span className={styles.priceAmount}>{plan.priceLabel}</span>
												<div className={styles.priceLabel}>
													<span className={styles.pricePeriod}>{plan.period}</span>
												</div>
											</div>
										</div>

										<p className={styles.planDescription}>{plan.description}</p>

										<ul className={styles.featuresList}>
											{plan.features.map((feature, idx) => (
												<li key={idx} className={styles.feature}>
													<Check size={18} className={styles.checkIcon} />
													<span>{feature}</span>
												</li>
											))}
										</ul>

										<button
											onClick={handleContactClick}
											className={`${styles.ctaButton} ${plan.popular ? styles.ctaPopular : ''}`}
										>
											<span>{plan.cta}</span>
											<ArrowRight size={18} />
										</button>
									</div>
								))}
					</div>
				</div>
			</section>

			<section className={styles.trustSection}>
				<div className={styles.container}>
					<div className={styles.trustHeader}>
						<div className={styles.badge}>
							<Shield size={16} />
							<span>{trustBadge}</span>
						</div>
						<h2 className={styles.sectionTitle}>{trustTitle}</h2>
					</div>
					<div className={styles.trustGrid}>
						{trustPoints.map((item, index) => (
							<div key={index} className={styles.trustCard}>
								<div className={styles.trustIcon}>{item.icon}</div>
								<h4 className={styles.trustCardTitle}>{item.title}</h4>
								<p className={styles.trustCardText}>{item.text}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className={styles.finalCta}>
				<div className={styles.finalCtaBackground}>
					<div className={styles.finalCtaBg1} />
					<div className={styles.finalCtaBg2} />
				</div>
				<div className={styles.container}>
					<div className={styles.finalCtaContent}>
						<h2 className={styles.finalCtaTitle}>{finalTitle}</h2>
						<p className={styles.finalCtaText}>{finalText}</p>
						{isEn ? (
							<Link href="/register" className={styles.finalCtaButton}>
								<span>{finalCtaLabel}</span>
								<ArrowRight size={18} />
							</Link>
						) : (
							<button onClick={handleContactClick} className={styles.finalCtaButton}>
								<span>{finalCtaLabel}</span>
								<ArrowRight size={18} />
							</button>
						)}
					</div>
				</div>
			</section>
		</div>
	)
}

export default PricingPage
