'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Testimonials.module.css'

gsap.registerPlugin(ScrollTrigger)

// --- ДАНІ ВІДГУКІВ ---
const testimonials = [
	
	{ id: 2, type: 'image', src: '/comments/photo_2026-04-19_13-17-43.jpg' },
	{ id: 3, type: 'image', src: '/comments/photo_2026-04-20_13-41-17.jpg' },
	{ id: 4, type: 'image', src: '/comments/photo_2026-04-20_13-58-58.jpg' },
	{ id: 5, type: 'image', src: '/comments/photo_2026-04-20_14-22-26.jpg' },
	{ id: 6, type: 'image', src: '/comments/photo_2026-04-20_14-22-57.jpg' },
	{ id: 7, type: 'image', src: '/comments/photo_2026-04-20_14-26-28.jpg' },
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
						Відгуки <span className={styles.rating}>учнів</span>
					</h2>
				</div>

				<div className={styles.carouselWrapper}>
					<div className={styles.carouselContainer}>
						<div ref={carouselRef} className={styles.carousel}>
							{duplicatedTestimonials.map((testimonial, index) => (
								<div key={`${testimonial.id}-${index}`} className={styles.card}>
									<div className={styles.cardContent}>
										{testimonial.type === 'video' ? (
											<video 
												src={testimonial.src}
												className={styles.media}
												autoPlay 
												muted 
												loop 
												playsInline
											/>
										) : (
											<img
												src={testimonial.src}
												alt="Відгук студента"
												className={styles.media}
												loading="lazy"
											/>
										)}
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

