'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
	Users,
	User,
	BookOpen,
	Zap,
	Check,
	Star,
	Sparkles,
	ArrowRight,
	Clock,
	Video,
	Laptop,
	Rocket,
	TrendingDown,
	GraduationCap,
	Monitor,
	BookMarked,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from './PricingPage.module.css'

gsap.registerPlugin(ScrollTrigger)

const PricingPage = () => {
	const sectionRef = useRef(null)
	const cardsRef = useRef([])
	const [isLoaded, setIsLoaded] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		// Перевірка на мобільний пристрій
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		
		checkMobile()
		setIsLoaded(true)
		
		window.addEventListener('resize', checkMobile)
		
		const isMobileDevice = window.innerWidth <= 768

		// На мобільних пристроях не запускаємо анімації
		if (sectionRef.current && !isMobileDevice) {
			const cards = cardsRef.current.filter(Boolean)

			// Анімація заголовка (тільки на десктопі)
			gsap.fromTo(
				sectionRef.current.querySelector(`.${styles.title}`),
				{
					opacity: 0,
					y: 30,
				},
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

			// Анімація карток (тільки на десктопі)
			cards.forEach((card, index) => {
				if (card) {
					gsap.fromTo(
						card,
						{
							opacity: 0,
							y: 50,
							scale: 0.9,
						},
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
				}
			})
		}

		return () => {
			if (!isMobileDevice) {
				ScrollTrigger.getAll().forEach(trigger => trigger.kill())
			}
			window.removeEventListener('resize', checkMobile)
		}
	}, [])

	const handleContactClick = (e) => {
		e.preventDefault()
		if (typeof window !== 'undefined') {
			window.dispatchEvent(new Event('openContactModal'))
		}
	}

	const pricingPlans = [
		
		{
			id: 1,
			name: 'Індивідуальні уроки',
			emoji: '💻',
			price: 400,
			currency: 'грн',
			period: 'заняття',
			description: 'Персональний підхід до навчання',
			features: [
				'Індивідуальний графік',
				'Фокус на ваших цілях',
				'Швидкий прогрес',
				'Гнучкість у виборі теми',
				'Прямий контакт з викладачем',
			],
			color: 'blue',
			popular: false,
			recommended: true,
		},
		{
			id: 2,
			name: 'Групові уроки',
			emoji: '👥',
			price: 250,
			currency: 'грн',
			period: 'заняття',
			duration: '1 година',
			description: 'Навчання в команді однодумців',
			features: [
				'Група до 6 осіб',
				'Тривалість: 1 година',
				'Спілкування з однолітками',
				'Командні проекти',
				'Доступна ціна',
			],
			color: 'purple',
			popular: true,
		
		},
		{
			id: 3,
			name: 'Онлайн курс',
			emoji: '📚',
			price: 2000,
			oldPrice: 2999,
			currency: 'грн',
			period: 'одноразово',
			description: 'Курс + доступ до платформи',
			features: [
				'Повний доступ до курсу',
				'Онлайн навчальна платформа',
				'Всі уроки та матеріали',
				'Практичні завдання',
				'Сертифікат після завершення',
				'Підтримка менторів',
			],
			color: 'orange',
			popular: false,
			discount: true,
		},
	]

	return (
		<div ref={sectionRef} className={styles.page}>
			{/* Hero Section */}
			<section className={styles.hero}>
				<div className={styles.heroContent}>
					<div className={styles.badge}>
						<Sparkles size={16} />
						<span>Наші тарифи</span>
					</div>
					<h1 className={styles.title}>
						Оберіть <span className={styles.titleAccent}>ідеальний</span> план
						навчання
					</h1>
					<p className={styles.subtitle}>
						Гнучкі варіанти навчання для будь-якого рівня та бюджету. Почніть
						свою подорож у світ програмування вже сьогодні!
					</p>
				</div>
			</section>

			{/* Pricing Cards */}
			<section className={styles.pricingSection}>
				<div className={styles.container}>
					<div className={styles.pricingGrid}>
						{pricingPlans.map((plan, index) => (
							<div
								key={plan.id}
								className={`${styles.pricingCard} ${styles[plan.color]} ${
									plan.popular ? styles.popular : ''
								} ${plan.discount ? styles.discount : ''} ${
									plan.recommended ? styles.recommended : ''
								}`}
								ref={el => (cardsRef.current[index] = el)}
							>
								{plan.recommended && (
									<div className={styles.recommendedBadge}>
										<Star size={14} />
										<span>Рекомендуємо</span>
									</div>
								)}
								{plan.popular && (
									<div className={styles.popularBadge}>
										<Star size={14} />
										<span>Популярний</span>
									</div>
								)}
								{plan.discount && (
									<div className={styles.discountBadge}>
										<TrendingDown size={14} />
										<span>Знижка 33%</span>
									</div>
								)}

								<div className={styles.cardHeader}>
									<div className={styles.emojiWrapper}>
										<span className={styles.emoji}>{plan.emoji}</span>
									</div>
									<h3 className={styles.planName}>{plan.name}</h3>
									<p className={styles.planDescription}>{plan.description}</p>
								</div>

								<div className={styles.priceSection}>
									{plan.oldPrice && (
										<div className={styles.oldPrice}>
											{plan.oldPrice} {plan.currency}
										</div>
									)}
									<div className={styles.price}>
										<span className={styles.priceAmount}>{plan.price}</span>
										<span className={styles.priceCurrency}>
											{plan.currency}
										</span>
									</div>
									<div className={styles.period}>
										{plan.period}
										{plan.duration && (
											<span className={styles.duration}>
												{' '}
												· {plan.duration}
											</span>
										)}
									</div>
								</div>

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
									className={styles.ctaButton}
								>
									<span>Обрати план</span>
									<ArrowRight size={18} />
								</button>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Additional Info Section */}
			<section className={styles.infoSection}>
				<div className={styles.container}>
					<div className={styles.infoGrid}>
						<div className={styles.infoCard}>
							<div className={styles.infoIcon}>
								<Video size={24} />
							</div>
							<h4 className={styles.infoTitle}>Онлайн в Zoom</h4>
							<p className={styles.infoText}>
								Всі заняття проходять онлайн в Zoom. Зручно, безпечно та
								ефективно.
							</p>
						</div>
						<div className={styles.infoCard}>
							<div className={styles.infoIcon}>
								<Clock size={24} />
							</div>
							<h4 className={styles.infoTitle}>Гнучкий графік</h4>
							<p className={styles.infoText}>
								Обирайте зручний час для навчання. Працюємо з понеділка по
								неділю.
							</p>
						</div>
						<div className={styles.infoCard}>
							<div className={styles.infoIcon}>
								<Laptop size={24} />
							</div>
							<h4 className={styles.infoTitle}>Доступ до платформи</h4>
							<p className={styles.infoText}>
								При покупці курсу отримуєте повний доступ до навчальної
								платформи 24/7.
							</p>
						</div>
						<div className={styles.infoCard}>
							<div className={styles.infoIcon}>
								<Rocket size={24} />
							</div>
							<h4 className={styles.infoTitle}>Швидкий старт</h4>
							<p className={styles.infoText}>
								Почніть навчання вже сьогодні! Реєстрація займає лише кілька
								хвилин.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className={styles.finalCta}>
				<div className={styles.container}>
					<div className={styles.finalCtaContent}>
						<h2 className={styles.finalCtaTitle}>
							Готові почати навчання?
						</h2>
						<p className={styles.finalCtaText}>
							Зв'яжіться з нами, щоб обговорити деталі та обрати найкращий план
							для вас
						</p>
						<button onClick={handleContactClick} className={styles.finalCtaButton}>
							<span>Зв'язатися з нами</span>
							<ArrowRight size={20} />
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default PricingPage

