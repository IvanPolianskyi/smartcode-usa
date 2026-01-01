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
		name: 'Оля',
		subject: 'Python',
		rating: 5,
		text: 'Завдяки курсу Python в SmartCode Academy я змогла створити свій перший додаток для обчислення математичних задач. Викладачі дуже терплячі та завжди допомагають розібратися зі складними темами. Тепер я впевнено працюю з циклами та функціями!',
		avatar: 'https://logowik.com/content/uploads/images/university-student6136.logowik.com.webp',
	},
	{
		id: 2,
		name: 'Аліна',
		subject: 'Веб-розробка',
		rating: 5,
		text: 'Після завершення курсу веб-розробки я створила свій перший сайт-портфоліо! HTML, CSS та JavaScript більше не здаються мені чимось складним. Особливо подобається, що ми одразу застосовуємо знання на практиці через реальні проекти.',
		avatar: 'https://logowik.com/content/uploads/images/university-student6136.logowik.com.webp',
	},
	{
		id: 3,
		name: 'Ярослава',
		subject: 'Розробка ігор',
		rating: 5,
		text: 'Unity та C# - це те, про що я мріяла! За 8 місяців навчання я створила свою першу гру про космос. Викладачі навчили мене не тільки програмувати, але й правильно організовувати код. Тепер я планую створити ще кілька ігор!',
		avatar: 'https://logowik.com/content/uploads/images/university-student6136.logowik.com.webp',
	},
	{
		id: 4,
		name: 'Уляна',
		subject: 'Roblox Studio',
		rating: 5,
		text: 'Roblox Studio - це найкрутіший курс! Я навчилася створювати ігри та об\'єкти, які тепер використовують інші гравці. Ментор завжди допомагає, коли щось не виходить. Моя гра вже має понад 1000 відвідувачів!',
		avatar: 'https://logowik.com/content/uploads/images/university-student6136.logowik.com.webp',
	},
	{
		id: 5,
		name: 'Іра',
		subject: 'Python',
		rating: 5,
		text: 'Python став моїм улюбленим мовою програмування! Завдяки SmartCode Academy я зрозуміла, як працюють алгоритми та структури даних. Тепер я можу писати скрипти для автоматизації завдань. Це дуже корисно для школи!',
		avatar: 'https://logowik.com/content/uploads/images/university-student6136.logowik.com.webp',
	},
	{
		id: 6,
		name: 'Максим',
		subject: 'JavaScript',
		rating: 5,
		text: 'JavaScript відкрив для мене новий світ веб-розробки! Завдяки практичним завданням я створив кілька інтерактивних сайтів. Викладачі пояснюють все дуже доступно, навіть складні теми стають зрозумілими.',
		avatar: 'https://logowik.com/content/uploads/images/university-student6136.logowik.com.webp',
	},
	{
		id: 7,
		name: 'Софія',
		subject: 'Веб-дизайн',
		rating: 5,
		text: 'Курс веб-дизайну допоміг мені зрозуміти, як створювати красиві та функціональні інтерфейси. Тепер я можу працювати з Figma та створювати власні макети. Це дуже цікаво та корисно!',
		avatar: 'https://logowik.com/content/uploads/images/university-student6136.logowik.com.webp',
	},
	{
		id: 8,
		name: 'Дмитро',
		subject: 'Unity',
		rating: 5,
		text: 'Unity - це просто неймовірно! Я створив свою першу 3D гру та опублікував її. Викладачі допомогли мені зрозуміти фізику та анімації. Тепер я мрію стати професійним геймдевелопером!',
		avatar: 'https://logowik.com/content/uploads/images/university-student6136.logowik.com.webp',
	},
	{
		id: 9,
		name: 'Марія',
		subject: 'Python',
		rating: 5,
		text: 'Python - це найкраща мова для початківців! Я навчилася створювати боти, парсити дані та працювати з бібліотеками. Особливо подобається, що ми одразу застосовуємо знання на реальних проектах.',
		avatar: 'https://logowik.com/content/uploads/images/university-student6136.logowik.com.webp',
	},
	{
		id: 10,
		name: 'Артем',
		subject: 'Full-Stack',
		rating: 5,
		text: 'Після проходження курсу Full-Stack я можу створювати повноцінні веб-додатки! Frontend та Backend більше не здаються мені чимось складним. Дякую викладачам за терпіння та професійний підхід!',
		avatar: 'https://logowik.com/content/uploads/images/university-student6136.logowik.com.webp',
	},
]

const Testimonials = () => {
	const carouselRef = useRef(null)
	const sectionRef = useRef(null)
	const animationRef = useRef(null)

	// Анімація появи секції
	useEffect(() => {
		const section = sectionRef.current
		if (!section) return

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
	}, [])

	// Безкінечна анімація каруселі
	useEffect(() => {
		const carousel = carouselRef.current
		if (!carousel) return

		let rafId = null
		let intervalId = null

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

			// Створюємо безкінечну анімацію
			animationRef.current = gsap.to(carousel, {
				x: -totalWidth,
				duration: 45, // Збільшено з 30 до 45 секунд для повільнішого руху
				ease: 'none',
				repeat: -1,
			})

			// Перевіряємо позицію та скидаємо на початок, коли досягаємо кінця
			const checkAndReset = () => {
				const currentX = gsap.getProperty(carousel, 'x')
				// Коли досягаємо кінця першого набору, миттєво скидаємо на початок
				// Оскільки картки дубльовані, це створює ілюзію безперервного руху
				if (currentX <= -totalWidth) {
					gsap.set(carousel, { x: 0 })
				}
				rafId = requestAnimationFrame(checkAndReset)
			}

			rafId = requestAnimationFrame(checkAndReset)
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
