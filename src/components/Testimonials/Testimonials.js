'use client'

import React, { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Testimonials.module.css'

gsap.registerPlugin(ScrollTrigger)

// --- ДАНІ ВІДГУКІВ ---
const testimonials = [
	{
		id: 1,
		name: 'Олександра',
		subject: 'Python',
		rating: 5,
		text: 'Доброго дня! Щиро дякуємо за заняття. Сину дуже подобається навчання, кожен урок чекає з нетерпінням. Матеріал подається зрозуміло й цікаво. Видно, що викладач справді вміє зацікавити дитину. Успіхів вам і дякуємо за вашу працю!',
		avatar: 'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
	},
	{
		id: 2,
		name: 'Аліна',
		subject: 'Веб-розробка',
		rating: 5,
		text: 'Мені дуже подобається, як проходять уроки. Все пояснюється цікаво і зрозуміло, а завдання веселі й корисні',
		avatar: 'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
	},
	{
		id: 3,
		name: 'Ярослава',
		subject: 'Unity',
		rating: 5,
		text: 'Викладач дуже круто пояснює, не нудно і завжди допомагає, якщо щось не виходить. Мені подобається, що можна пробувати різні ідеї!',
		avatar: 'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
	},
	{
		id: 4,
		name: 'Mарта',
		subject: 'Roblox Studio',
		rating: 5,
		text: 'Roblox Studio - це найкрутіший курс! Викладач Артем вміє пояснити так щоб було зрозуміло, і дає дуже корисні поради!',
		avatar: 'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
	},
	{
		id: 5,
		name: 'Мирослава',
		subject: 'Python',
		rating: 5,
		text: 'Щиро дякуємо за ваш професіоналізм. Донька із захопленням вчиться програмуванню, уроки проходять легко, цікаво та практично. Видно, що викладач дійсно любить свою справу.',
		avatar: 'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
	},
	{
		id: 6,
		name: 'Максим',
		subject: 'Веб-розробка',
		rating: 5,
		text: 'Я раніше боявся програмування, а тепер із задоволенням роблю домашні завдання та експериментую з кодом. Уроки мотивують і цікаві!',
		avatar: 'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
	},
	{
		id: 7,
		name: 'Злата',
		subject: 'Python',
		rating: 5,
		text: 'було реально дуже круто ! 10/10',
		avatar: 'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
	},
	{
		id: 8,
		name: 'Дмитро',
		subject: 'Unity',
		rating: 5,
		text: 'Unity - це просто неймовірно! Я створив свою першу 3D гру та опублікував її. Викладачі допомогли мені зрозуміти фізику та анімації. Тепер я мрію стати професійним геймдевелопером!',
		avatar: 'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
	},
	{
		id: 9,
		name: 'Марія',
		subject: 'Python',
		rating: 5,
		text: 'Дякуємо за індивідуальний підхід та підтримку. Донька із задоволенням готується до уроків і відчуває себе частиною справжнього творчого процесу!',
		avatar: 'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
	},
	{
		id: 10,
		name: 'Артем',
		subject: 'Roblox Studio',
		rating: 5,
		text: 'Дуже веселі та корисні завдання!',
		avatar: 'https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg',
	},
]

const Testimonials = () => {
	const carouselRef = useRef(null)
	const sectionRef = useRef(null)
	const animationRef = useRef(null)

	// Анімація появи секції з оптимізацією для мобільних
	useEffect(() => {
		const section = sectionRef.current
		if (!section) return

		// Перевірка чи це мобільний пристрій
		const isMobile = window.innerWidth <= 768
		
		// На мобільних використовуємо простіші анімації
		if (isMobile) {
			gsap.fromTo(
				section.querySelectorAll('.gsap-fade-up'),
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.6,
					ease: 'power2.out',
					stagger: 0.1,
					scrollTrigger: {
						trigger: section,
						start: 'top 85%',
						toggleActions: 'play none none none',
						markers: false,
					},
				}
			)
		} else {
			gsap.fromTo(
				section.querySelectorAll('.gsap-fade-up'),
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.15,
					scrollTrigger: {
						trigger: section,
						start: 'top 80%',
						toggleActions: 'play none none reverse',
					},
				}
			)
		}
	}, [])

	// Безкінечна анімація каруселі з оптимізацією для мобільних
	useEffect(() => {
		const carousel = carouselRef.current
		if (!carousel) return

		let rafId = null
		let intervalId = null
		let isPaused = false

		// Перевірка чи це мобільний пристрій
		const isMobile = window.innerWidth <= 768

		// Функція для оновлення анімації
		const updateAnimation = () => {
			// Отримуємо ширину однієї картки
			const card = carousel.querySelector(`.${styles.card}`)
			if (!card) return

			const cardWidth = card.offsetWidth
			const totalWidth = cardWidth * testimonials.length

			// Зупиняємо попередню анімацію
			if (animationRef.current) {
				animationRef.current.kill()
			}
			if (intervalId) {
				clearInterval(intervalId)
			}
			if (rafId) {
				cancelAnimationFrame(rafId)
			}

			// Встановлюємо початкову позицію
			gsap.set(carousel, { x: 0 })

			// На мобільних використовуємо повільнішу анімацію для кращої продуктивності
			const duration = isMobile ? 60 : 45

			// Створюємо безкінечну анімацію
			animationRef.current = gsap.to(carousel, {
				x: -totalWidth,
				duration: duration,
				ease: 'none',
				repeat: -1,
				// На мобільних використовуємо will-change для оптимізації
				force3D: isMobile,
			})

			// Перевіряємо позицію та скидаємо на початок, коли досягаємо кінця
			const checkAndReset = () => {
				if (isPaused) {
					rafId = requestAnimationFrame(checkAndReset)
					return
				}
				const currentX = gsap.getProperty(carousel, 'x')
				// Коли досягаємо кінця першого набору, миттєво скидаємо на початок
				// Оскільки картки дубльовані, це створює ілюзію безперервного руху
				if (currentX <= -totalWidth) {
					gsap.set(carousel, { x: 0 })
				}
				rafId = requestAnimationFrame(checkAndReset)
			}

			rafId = requestAnimationFrame(checkAndReset)

			// На мобільних паузуємо анімацію при дотику для кращої продуктивності
			if (isMobile) {
				const pauseOnTouch = () => {
					isPaused = true
					if (animationRef.current) {
						animationRef.current.pause()
					}
				}
				const resumeOnTouchEnd = () => {
					isPaused = false
					if (animationRef.current) {
						animationRef.current.resume()
					}
				}
				carousel.addEventListener('touchstart', pauseOnTouch, { passive: true })
				carousel.addEventListener('touchend', resumeOnTouchEnd, { passive: true })
			}
		}

		// Затримка для завантаження зображень та розрахунку розмірів
		const timeoutId = setTimeout(() => {
			updateAnimation()
		}, 200)

		const handleResize = () => {
			updateAnimation()
		}

		window.addEventListener('resize', handleResize)

		return () => {
			clearTimeout(timeoutId)
			if (animationRef.current) {
				animationRef.current.kill()
			}
			if (intervalId) {
				clearInterval(intervalId)
			}
			if (rafId) {
				cancelAnimationFrame(rafId)
			}
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	// Дублюємо картки для безкінечного ефекту
	const duplicatedTestimonials = [...testimonials, ...testimonials]

	return (
		<section ref={sectionRef} id="testimonials" className={styles.testimonialsSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={`gsap-fade-up ${styles.title}`}>
						Відгуки <span className={styles.rating}></span> учнів
					</h2>
				</div>

				<div className={styles.carouselWrapper}>
					<div className={styles.carouselContainer}>
						<div ref={carouselRef} className={styles.carousel}>
							{duplicatedTestimonials.map((testimonial, index) => (
								<div key={`${testimonial.id}-${index}`} className={styles.card}>
									<div className={styles.cardContent}>
										<div className={styles.stars}>
											{Array.from({ length: 5 }, (_, i) => (
												<Star
													key={i}
													size={20}
													className={styles.star}
													fill="currentColor"
												/>
											))}
										</div>
										<p className={styles.text}>{testimonial.text}</p>
										<div className={styles.author}>
											<img
												src={testimonial.avatar}
												alt={testimonial.name}
												className={styles.avatar}
												loading="lazy"
											/>
											<div className={styles.authorInfo}>
												<div className={styles.name}>{testimonial.name}</div>
												<div className={styles.subject}>{testimonial.subject}</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Testimonials
