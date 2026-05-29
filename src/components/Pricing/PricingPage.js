'use client'

import React, { useEffect, useRef, useState } from 'react'
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
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Link } from '@/i18n/navigation'
import styles from './PricingPage.module.css'
import { useTranslations, useLocale } from 'next-intl'
import { formatPrice, getLessonPrice } from '@/lib/coursePrices'

gsap.registerPlugin(ScrollTrigger)

const TRUST_KEYS = ['payPerLesson', 'flexible', 'zoom', 'noCommitment']
const TRUST_ICONS = [CreditCard, Clock, Video, Shield]

const PricingPage = () => {
	const t = useTranslations('pricing')
	const locale = useLocale()
	const groupInfo = getLessonPrice('group', locale)
	const individualInfo = getLessonPrice('individual', locale)
	const sectionRef = useRef(null)
	const cardsRef = useRef([])
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(true)

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
				ScrollTrigger.getAll().forEach(trigger => trigger.kill())
			}
		}
	}, [])

	const handleContactClick = (e) => {
		e.preventDefault()
		if (typeof window !== 'undefined') {
			window.dispatchEvent(new Event('openContactModal'))
		}
	}

	const plans = [
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

	const trustPoints = TRUST_KEYS.map((key, index) => {
		const Icon = TRUST_ICONS[index]
		return {
			icon: <Icon size={24} />,
			title: t(`trust.items.${key}.title`),
			text: t(`trust.items.${key}.text`),
		}
	})

	return (
		<div ref={sectionRef} className={styles.page}>
			{/* ===== Hero ===== */}
			<section className={styles.hero}>
				<div className={styles.heroBackground}>
					<div className={styles.heroBg1} />
					<div className={styles.heroBg2} />
				</div>
				<div className={styles.heroContent}>
					<h1 className={styles.title}>
						{t('hero.title')}{' '}
						<span className={styles.titleAccent}>{t('hero.titleAccent')}</span>
						<br />
						{t('hero.titleLine2')}
					</h1>
					<p className={styles.subtitle}>{t('hero.subtitle')}</p>
					<div className={styles.heroActions}>
						{locale === 'en' ? (
							<Link href="/book-lesson" className={styles.heroCta}>
								{t('hero.cta')}
								<ArrowRight size={18} />
							</Link>
						) : (
							<button onClick={handleContactClick} className={styles.heroCta}>
								{t('hero.cta')}
								<ArrowRight size={18} />
							</button>
						)}
					</div>
				</div>
			</section>

			{/* ===== Pricing Cards ===== */}
			<section className={styles.pricingSection}>
				<div className={styles.container}>
					<div className={styles.pricingGrid}>
						{plans.map((plan, index) => (
							<div
								key={plan.id}
								className={`${styles.pricingCard} ${styles[plan.color]} ${
									plan.popular ? styles.popular : ''
								}`}
								ref={el => (cardsRef.current[index] = el)}
							>
								{plan.badge && (
									<div className={styles.popularBadge}>
										<Star size={14} />
										<span>{plan.badge}</span>
									</div>
								)}

								<div className={styles.cardHeader}>
									<div className={styles.iconWrapper}>
										{plan.icon}
									</div>
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

								{locale === 'en' ? (
									<Link
										href="/book-lesson"
										className={`${styles.ctaButton} ${plan.popular ? styles.ctaPopular : ''}`}
									>
										<span>{plan.cta}</span>
										<ArrowRight size={18} />
									</Link>
								) : (
									<button
										onClick={handleContactClick}
										className={`${styles.ctaButton} ${plan.popular ? styles.ctaPopular : ''}`}
									>
										<span>{plan.cta}</span>
										<ArrowRight size={18} />
									</button>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ===== Trust Section ===== */}
			<section className={styles.trustSection}>
				<div className={styles.container}>
					<div className={styles.trustHeader}>
						<div className={styles.badge}>
							<Shield size={16} />
							<span>{t('trust.badge')}</span>
						</div>
						<h2 className={styles.sectionTitle}>
							{t('trust.title')}
						</h2>
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

			{/* ===== Final CTA ===== */}
			<section className={styles.finalCta}>
				<div className={styles.finalCtaBackground}>
					<div className={styles.finalCtaBg1} />
					<div className={styles.finalCtaBg2} />
				</div>
				<div className={styles.container}>
					<div className={styles.finalCtaContent}>
						<h2 className={styles.finalCtaTitle}>
							{t('finalCta.title')}
						</h2>
						<p className={styles.finalCtaText}>
							{t('finalCta.text')}
						</p>
						{locale === 'en' ? (
							<Link href="/book-lesson" className={styles.finalCtaButton}>
								<span>{t('finalCta.cta')}</span>
								<ArrowRight size={18} />
							</Link>
						) : (
							<button onClick={handleContactClick} className={styles.finalCtaButton}>
								<span>{t('finalCta.cta')}</span>
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
