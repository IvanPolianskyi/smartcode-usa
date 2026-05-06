'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
	Users,
	User,
	Check,
	Star,
	Sparkles,
	ArrowRight,
	Clock,
	Video,
	Shield,
	CreditCard,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from './PricingPage.module.css'

gsap.registerPlugin(ScrollTrigger)

const PricingPage = () => {
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
			name: 'Міні-група',
			icon: <Users size={28} />,
			price: 350,
			period: '/ урок',
			subtitle: 'До 5 учнів у групі',
			description: 'Оптимально для соціалізації, мотивації та регулярного темпу навчання',
			features: [
				'Група до 5 учнів',
				'Живі уроки в Zoom з викладачем',
				'Регулярний графік та дисципліна',
				'Практика на реальних задачах',
				'Платформа + домашні завдання',
				'Підтримка та фідбек по прогресу',
			],
			color: 'purple',
			badge: null,
		},
		{
			id: 'individual',
			name: 'Індивідуально',
			icon: <User size={28} />,
			price: 500,
			period: '/ урок',
			subtitle: '1 на 1 з викладачем',
			description: 'Максимальний результат за рахунок персонального темпу й програми під дитину',
			features: [
				'Персональний підхід 1 на 1',
				'Індивідуальний графік',
				'Темп і програма під рівень учня',
				'Фокус на цілях та слабких місцях',
				'Платформа + домашні завдання',
				'Підвищена швидкість прогресу',
			],
			color: 'blue',
			badge: 'Найпопулярніший',
			popular: true,
		},
	]

	const trustPoints = [
		{
			icon: <CreditCard size={24} />,
			title: 'Оплата поурочно',
			text: 'Платіть лише за проведені уроки. Жодних передоплат чи пакетів — повна свобода!',
		},
		{
			icon: <Clock size={24} />,
			title: 'Гнучкий графік',
			text: 'Обирайте зручний час. Працюємо з понеділка по неділю, ранок та вечір.',
		},
		{
			icon: <Video size={24} />,
			title: 'Онлайн в Zoom',
			text: 'Заняття проходять у Zoom. Зручно з будь-якого місця — потрібен лише ноутбук.',
		},
		{
			icon: <Shield size={24} />,
			title: 'Без зобов\'язань',
			text: 'Можете припинити навчання будь-коли. Жодних контрактів чи штрафів.',
		},
	]

	return (
		<div ref={sectionRef} className={styles.page}>
			{/* ===== Hero ===== */}
			<section className={styles.hero}>
				<div className={styles.heroBackground}>
					<div className={styles.heroBg1} />
					<div className={styles.heroBg2} />
				</div>
				<div className={styles.heroContent}>
					<div className={styles.badge}>
						<Sparkles size={16} />
						<span>Прозорі ціни</span>
					</div>
					<h1 className={styles.title}>
						Оплата <span className={styles.titleAccent}>поурочно</span>
						<br />
						без передоплат
					</h1>
					<p className={styles.subtitle}>
						Обирайте формат навчання під вашу ціль і бюджет. Платіть тільки за проведені уроки:
						без прихованих умов, без ризику, з реальним прогресом дитини.
					</p>
					<div className={styles.heroActions}>
						<button onClick={handleContactClick} className={styles.heroCta}>
							Отримати безкоштовний пробний урок
							<ArrowRight size={18} />
						</button>
						<div className={styles.heroNote}>
							<Shield size={16} />
							<span>0 грн за перший урок</span>
						</div>
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
										<span className={styles.priceAmount}>{plan.price}</span>
										<div className={styles.priceLabel}>
											<span className={styles.priceCurrency}>грн</span>
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
									<span>Записатися</span>
									<ArrowRight size={18} />
								</button>
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
							<span>Чому обирають нас</span>
						</div>
						<h2 className={styles.sectionTitle}>
							Зручно, прозоро, без ризику
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
							Почніть без ризику вже цього тижня
						</h2>
						<p className={styles.finalCtaText}>
							Запишіться на пробний урок за 0 грн, познайомтесь з викладачем і отримайте персональний план навчання для дитини.
						</p>
						<button onClick={handleContactClick} className={styles.finalCtaButton}>
							<span>Забронювати пробний урок</span>
							<ArrowRight size={20} />
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default PricingPage
