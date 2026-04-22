'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Testimonials.module.css'

// Guard: ScrollTrigger uses DOM APIs — only register in the browser
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)
}

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

	// Одноразова анімація появи секції при скролі (не loop — не б'є по TBT)
	useEffect(() => {
		const section = sectionRef.current
		if (!section) return

		const isMobile = window.innerWidth <= 768

		const tween = gsap.fromTo(
			section.querySelectorAll('.gsap-fade-up'),
			{ y: isMobile ? 30 : 50, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: isMobile ? 0.6 : 0.8,
				ease: isMobile ? 'power2.out' : 'power3.out',
				stagger: isMobile ? 0.1 : 0.15,
				scrollTrigger: {
					trigger: section,
					start: isMobile ? 'top 85%' : 'top 80%',
					toggleActions: isMobile ? 'play none none none' : 'play none none reverse',
					markers: false,
				},
			}
		)

		return () => {
			tween.scrollTrigger?.kill()
		}
	}, [])

	// Touch pause: клас-toggle — нуль GSAP, нуль RAF
	const handleTouchStart = () => {
		carouselRef.current?.classList.add(styles.paused)
	}
	const handleTouchEnd = () => {
		carouselRef.current?.classList.remove(styles.paused)
	}

	// Дублюємо картки для CSS безкінечного ефекту (translateX -50%)
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
						{/* CSS marquee — compositor thread, нуль main-thread cost */}
						<div
							ref={carouselRef}
							className={`${styles.carousel} ${styles.carouselAnimated}`}
							onTouchStart={handleTouchStart}
							onTouchEnd={handleTouchEnd}
						>
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
												decoding="async"
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
