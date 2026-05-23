'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { ExternalLink, Sparkles, Instagram } from 'lucide-react'
import Image from 'next/image'
import TikTokIcon from '@/components/Icons/TikTokIcon'
import styles from './SocialMedia.module.css'

const ACCOUNT_META = [
	{
		id: 2,
		name: 'TikTok',
		username: '@smartcode_academy',
		url: 'https://www.tiktok.com/@smartcodeacademy',
		color: 'purple',
		avatarUrl: '/tiktoklogo/6265690dcda2f88f952abb3045e5604d~tplv-tiktokx-cropcenter_1080_1080.jpeg',
		descriptionKey: 'tiktokMain',
	},
	{
		id: 5,
		name: 'Instagram',
		username: '@smartcode_academy_official',
		url: 'https://www.instagram.com/smartcode_academy_official/',
		color: 'purple',
		avatarUrl: '/logo.jpeg',
		descriptionKey: 'instagram',
	},
	{
		id: 3,
		username: '@ivan_python_smart',
		url: 'https://www.tiktok.com/@ivan_python_smart',
		color: 'green',
		avatarUrl: '/tiktoklogo/00687615ebad2fd100b5ab6dde0a9964~tplv-tiktokx-cropcenter_1080_1080.jpeg',
		accountKey: 'ivan',
	},
	{
		id: 4,
		username: '@artem.smartcode',
		url: 'https://www.tiktok.com/@artem.smartcode',
		color: 'orange',
		avatarUrl: '/tiktoklogo/15dac559b1a79f75d8c1284cc21348ef~tplv-tiktokx-cropcenter_1080_1080.jpeg',
		accountKey: 'artem',
	},
]

const SocialMedia = () => {
	const t = useTranslations('homeSections.social')
	const [avatars, setAvatars] = useState({})
	const [avatarErrors, setAvatarErrors] = useState({})

	const socialAccounts = useMemo(
		() =>
			ACCOUNT_META.map(account => {
				if (account.accountKey) {
					return {
						...account,
						name: t(`accounts.${account.accountKey}.name`),
						description: t(`accounts.${account.accountKey}.description`),
					}
				}
				return {
					...account,
					description: t(`accounts.${account.descriptionKey}.description`),
				}
			}),
		[t]
	)

	// Завантаження аватарок
	useEffect(() => {
		const loadAvatars = async () => {
			const avatarPromises = socialAccounts.map(async (account) => {
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
	}, [socialAccounts])

	return (
		<section id="social-media" className={styles.section}>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.badge}>
						<Sparkles size={16} />
						<span>{t('badge')}</span>
					</div>
					<h2 className={styles.title}>
						{t('title')} <span className={styles.titleAccent}>{t('titleAccent')}</span>
					</h2>
					<p className={styles.subtitle}>{t('subtitle')}</p>
				</div>

				<div className={styles.grid}>
					{socialAccounts.map((account, index) => {
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
										) : account.url.includes('instagram') ? (
											<div className={styles.iconWrapper}>
												<Instagram size={32} />
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

