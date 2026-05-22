'use client'

import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import styles from './Testimonials.module.css'

const testimonials = [
	{ id: 2, type: 'image', src: '/comments/photo_2026-04-19_13-17-43.jpg' },
	{ id: 3, type: 'image', src: '/comments/photo_2026-04-20_13-41-17.jpg' },
	{ id: 4, type: 'image', src: '/comments/photo_2026-04-20_13-58-58.jpg' },
	{ id: 5, type: 'image', src: '/comments/photo_2026-04-20_14-22-26.jpg' },
	{ id: 6, type: 'image', src: '/comments/photo_2026-04-20_14-22-57.jpg' },
	{ id: 7, type: 'image', src: '/comments/photo_2026-04-20_14-26-28.jpg' },
]

const Testimonials = () => {
	const t = useTranslations('homeSections.testimonials')
	const carouselRef = useRef(null)

	const handleTouchStart = () => {
		carouselRef.current?.classList.add(styles.paused)
	}
	const handleTouchEnd = () => {
		carouselRef.current?.classList.remove(styles.paused)
	}

	const duplicatedTestimonials = [...testimonials, ...testimonials]

	return (
		<section id='testimonials' className={styles.testimonialsSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>
						{t('title')} <span className={styles.rating}>{t('titleAccent')}</span>
					</h2>
				</div>

				<div className={styles.carouselWrapper}>
					<div className={styles.carouselContainer}>
						<div
							ref={carouselRef}
							className={`${styles.carousel} ${styles.carouselAnimated}`}
							onTouchStart={handleTouchStart}
							onTouchEnd={handleTouchEnd}
						>
							{duplicatedTestimonials.map((testimonial, index) => (
								<div key={`${testimonial.id}-${index}`} className={styles.card}>
									<div className={styles.cardContent}>
										<img
											src={testimonial.src}
											alt=''
											className={styles.media}
											loading='lazy'
											decoding='async'
										/>
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
