'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
	const [canPrev, setCanPrev] = useState(false)
	const [canNext, setCanNext] = useState(true)

	const updateNavState = useCallback(() => {
		const el = carouselRef.current
		if (!el) return
		const maxScroll = el.scrollWidth - el.clientWidth
		setCanPrev(el.scrollLeft > 4)
		setCanNext(el.scrollLeft < maxScroll - 4)
	}, [])

	const scrollByCard = (direction) => {
		const el = carouselRef.current
		if (!el) return
		const card = el.querySelector(`.${styles.card}`)
		const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
		el.scrollBy({ left: direction * amount, behavior: 'smooth' })
	}

	useEffect(() => {
		const el = carouselRef.current
		if (!el) return undefined

		updateNavState()
		el.addEventListener('scroll', updateNavState, { passive: true })
		window.addEventListener('resize', updateNavState)

		let isDown = false
		let startX = 0
		let scrollLeft = 0
		let moved = false

		const onPointerDown = (e) => {
			if (e.pointerType === 'touch') return
			isDown = true
			moved = false
			startX = e.clientX
			scrollLeft = el.scrollLeft
			el.setPointerCapture?.(e.pointerId)
		}

		const onPointerMove = (e) => {
			if (!isDown) return
			const dx = e.clientX - startX
			if (Math.abs(dx) > 3) moved = true
			el.scrollLeft = scrollLeft - dx
		}

		const onPointerUp = (e) => {
			if (!isDown) return
			isDown = false
			try {
				el.releasePointerCapture?.(e.pointerId)
			} catch {}
			updateNavState()
		}

		const onClickCapture = (e) => {
			if (moved) {
				e.preventDefault()
				e.stopPropagation()
				moved = false
			}
		}

		el.addEventListener('pointerdown', onPointerDown)
		el.addEventListener('pointermove', onPointerMove)
		el.addEventListener('pointerup', onPointerUp)
		el.addEventListener('pointercancel', onPointerUp)
		el.addEventListener('click', onClickCapture, true)

		return () => {
			el.removeEventListener('scroll', updateNavState)
			window.removeEventListener('resize', updateNavState)
			el.removeEventListener('pointerdown', onPointerDown)
			el.removeEventListener('pointermove', onPointerMove)
			el.removeEventListener('pointerup', onPointerUp)
			el.removeEventListener('pointercancel', onPointerUp)
			el.removeEventListener('click', onClickCapture, true)
		}
	}, [updateNavState])

	return (
		<section id='testimonials' className={styles.testimonialsSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>
						{t('title')} <span className={styles.rating}>{t('titleAccent')}</span>
					</h2>
				</div>

				<div className={styles.carouselWrapper}>
					<button
						type='button'
						className={`${styles.navButton} ${styles.navPrev}`}
						onClick={() => scrollByCard(-1)}
						disabled={!canPrev}
						aria-label='Попередній відгук'
					>
						<ChevronLeft size={24} />
					</button>

					<div className={styles.carouselContainer}>
						<div ref={carouselRef} className={styles.carousel}>
							{testimonials.map((testimonial, index) => (
								<div key={`${testimonial.id}-${index}`} className={styles.card}>
									<div className={styles.cardContent}>
										<img
											src={testimonial.src}
											alt='Відгук'
											className={styles.media}
											loading='lazy'
											decoding='async'
											draggable={false}
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					<button
						type='button'
						className={`${styles.navButton} ${styles.navNext}`}
						onClick={() => scrollByCard(1)}
						disabled={!canNext}
						aria-label='Наступний відгук'
					>
						<ChevronRight size={24} />
					</button>
				</div>
			</div>
		</section>
	)
}

export default Testimonials
