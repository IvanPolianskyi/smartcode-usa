'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink, Sparkles } from 'lucide-react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TikTokIcon from '@/components/Icons/TikTokIcon'
import styles from './SocialMedia.module.css'

gsap.registerPlugin(ScrollTrigger)

const SocialMedia = () => {
	const sectionRef = useRef(null)
	const cardsRef = useRef([])
	const [avatars, setAvatars] = useState({})
	const [avatarErrors, setAvatarErrors] = useState({})

	const tiktokAccounts = [
		{
			id: 1,
			name: 'SmartCode Academy',
			username: '@smartcodeacademy',
			url: 'https://www.tiktok.com/@smartcodeacademy',
			description: 'Офіційний профіль академії',
			color: 'blue',
			avatarUrl: '/tiktoklogo/7933b99a69679696fee99a6a9a20c549~tplv-tiktokx-cropcenter_1080_1080.jpeg',
		},
		{
			id: 3,
			name: 'Іван - Python',
			username: '@ivan.smartcode.python',
			url: 'https://www.tiktok.com/@ivan.smartcode.python',
			description: 'Python програмування',
			color: 'green',
			avatarUrl: '/tiktoklogo/00687615ebad2fd100b5ab6dde0a9964~tplv-tiktokx-cropcenter_1080_1080.jpeg',
		},
		{
			id: 4,
			name: 'Артем - SmartCode',
			username: '@Artem.smartcode.academy',
			url: 'https://www.tiktok.com/@Artem.smartcode.academy',
			description: 'Навчальний контент',
			color: 'orange',
			avatarUrl: '/tiktoklogo/15dac559b1a79f75d8c1284cc21348ef~tplv-tiktokx-cropcenter_1080_1080.jpeg',
		},
		{
			id: 2,
			name: 'SmartCode Academy',
			username: '@smartcode_academy',
			url: 'https://www.tiktok.com/@smartcode_academy',
			description: 'Наші курси та проекти',
			color: 'purple',
			avatarUrl: '/tiktoklogo/6265690dcda2f88f952abb3045e5604d~tplv-tiktokx-cropcenter_1080_1080.jpeg',
		},
	]

	// Завантаження аватарок
	useEffect(() => {
		const loadAvatars = async () => {
			const avatarPromises = tiktokAccounts.map(async (account) => {
				// Якщо аватарка вказана безпосередньо в об'єкті, використовуємо її
				if (account.avatarUrl) {
					return {
						username: account.username,
						avatarUrl: account.avatarUrl,
					}
				}

				// Інакше намагаємося завантажити через API
				const username = account.username.replace('@', '')
				try {
					const response = await fetch(`/api/tiktok/avatar?username=${encodeURIComponent(username)}`)
					const data = await response.json()
					return {
						username: account.username,
						avatarUrl: data.avatarUrl,
					}
				} catch (error) {
					console.error(`Failed to load avatar for ${username}:`, error)
					return {
						username: account.username,
						avatarUrl: null,
					}
				}
			})

			const results = await Promise.all(avatarPromises)
			const avatarMap = {}
			results.forEach((result) => {
				avatarMap[result.username] = result.avatarUrl
			})
			setAvatars(avatarMap)
		}

		loadAvatars()
	}, [])

	// GSAP animations з оптимізацією для мобільних
	useEffect(() => {
		const section = sectionRef.current
		if (!section) return

		const isMobile = window.innerWidth <= 768
		const cards = cardsRef.current.filter(Boolean)

		// Анімація появи секції з оптимізацією для мобільних
		if (isMobile) {
			gsap.fromTo(
				section.querySelector(`.${styles.title}`),
				{
					opacity: 0,
					y: 20,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: section,
						start: 'top 90%',
						toggleActions: 'play none none none',
						markers: false,
					},
				}
			)

			// Спрощені анімації карток для мобільних
			cards.forEach((card, index) => {
				if (card) {
					gsap.fromTo(
						card,
						{
							opacity: 0,
							y: 30,
							scale: 0.95,
						},
						{
							opacity: 1,
							y: 0,
							scale: 1,
							duration: 0.5,
							delay: index * 0.08,
							ease: 'power2.out',
							scrollTrigger: {
								trigger: card,
								start: 'top 90%',
								toggleActions: 'play none none none',
								markers: false,
							},
						}
					)
				}
			})
		} else {
			gsap.fromTo(
				section.querySelector(`.${styles.title}`),
				{
					opacity: 0,
					y: 30,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					scrollTrigger: {
						trigger: section,
						start: 'top 80%',
						toggleActions: 'play none none none',
					},
				}
			)

			// Анімація карток
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
							delay: index * 0.1,
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
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
		}
	}, [])

	return (
		<section id="social-media" ref={sectionRef} className={styles.section}>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.badge}>
						<Sparkles size={16} />
						<span>Соціальні мережі</span>
					</div>
					<h2 className={styles.title}>
						Ми в <span className={styles.titleAccent}>TikTok</span>
					</h2>
					<p className={styles.subtitle}>
						Підписуйтесь на наші профілі, щоб бути в курсі останніх новин,
						навчальних матеріалів та цікавих проектів!
					</p>
				</div>

				<div className={styles.grid}>
					{tiktokAccounts.map((account, index) => {
						const avatarUrl = avatars[account.username]
						const hasError = avatarErrors[account.username]
						const showAvatar = avatarUrl && !hasError
						
						return (
							<a
								key={account.id}
								href={account.url}
								target="_blank"
								rel="noopener noreferrer"
								className={`${styles.card} ${styles[account.color]}`}
								ref={el => (cardsRef.current[index] = el)}
							>
								<div className={styles.cardContent}>
									<div className={styles.avatarWrapper}>
										{showAvatar ? (
											<div className={styles.avatarContainer}>
												<Image
													src={avatarUrl}
													alt={account.name}
													width={64}
													height={64}
													className={styles.avatar}
													unoptimized
													onError={() => {
														setAvatarErrors(prev => ({
															...prev,
															[account.username]: true,
														}))
													}}
												/>
											</div>
										) : (
											<div className={styles.iconWrapper}>
												<TikTokIcon size={32} />
											</div>
										)}
									</div>
									<div className={styles.cardInfo}>
										<h3 className={styles.cardName}>{account.name}</h3>
										<p className={styles.cardUsername}>{account.username}</p>
										<p className={styles.cardDescription}>
											{account.description}
										</p>
									</div>
									<div className={styles.cardAction}>
										<ExternalLink size={20} />
									</div>
								</div>
								<div className={styles.cardHoverEffect}></div>
							</a>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default SocialMedia

