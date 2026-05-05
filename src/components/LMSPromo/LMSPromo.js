'use client'

import React, { useEffect, useRef } from 'react'
import {
	MonitorPlay,
	BookOpenText,
	TrendingUp,
	ClipboardCheck,
	CreditCard,
	Gift,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from './LMSPromo.module.css'

gsap.registerPlugin(ScrollTrigger)

const LMSPromo = () => {
	const sectionRef = useRef(null)
	const listRef = useRef(null)
	const { user, loading } = useAuthSession()

	useEffect(() => {
		const isMobile = window.innerWidth <= 768

		if (sectionRef.current && listRef.current && !isMobile) {
			const items = listRef.current.children

			gsap.fromTo(
				items,
				{
					opacity: 0,
					x: -30,
				},
				{
					opacity: 1,
					x: 0,
					duration: 0.5,
					stagger: 0.1,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 75%',
						toggleActions: 'play none none none',
					},
				}
			)
		}

		return () => {
			if (!isMobile) {
				ScrollTrigger.getAll().forEach(trigger => trigger.kill())
			}
		}
	}, [])

	const features = [
		{
			icon: <MonitorPlay size={22} className={styles.iconRed} />,
			bgClass: styles.bgRed,
			text: 'Займатися на онлайн-уроках з викладачем',
		},
		{
			icon: <BookOpenText size={22} className={styles.iconYellow} />,
			bgClass: styles.bgYellow,
			text: 'Користуватися навчальними матеріалами',
		},
		{
			icon: <TrendingUp size={22} className={styles.iconGreen} />,
			bgClass: styles.bgGreen,
			text: 'Відстежувати прогрес у проходженні програми',
		},
		{
			icon: <ClipboardCheck size={22} className={styles.iconBlue} />,
			bgClass: styles.bgBlue,
			text: 'Отримати та здати домашнє завдання',
		},
		{
			icon: <CreditCard size={22} className={styles.iconPurple} />,
			bgClass: styles.bgPurple,
			text: 'Внести оплату за навчання',
		},
		{
			icon: <Gift size={22} className={styles.iconPink} />,
			bgClass: styles.bgPink,
			text: 'Запросити друзів на курси та отримати за це бонуси',
		},
	]

	return (
		<section ref={sectionRef} className={styles.lmsSection}>
			<div className={styles.container}>
				<div className={styles.grid}>
					{/* Ліва колонка */}
					<div className={styles.leftCol}>
						<h2 className={styles.title}>
							МИ СТВОРИЛИ КОМФОРТНЕ СЕРЕДОВИЩЕ
							<br />
							ДЛЯ НАВЧАННЯ ТА ПРАКТИКИ
						</h2>
						<p className={styles.description}>
							Займатися можна з будь-якого куточка України та світу. Уроки та всі
							навчальні матеріали знаходяться на відстані кліку — в особистому
							онлайн-кабінеті у{' '}
							<strong>зручній LMS-системі для дистанційного навчання</strong>,
							яку ми розробили спеціально для потреб наших учнів.
						</p>
						<div className={styles.actionWrap}>
							{!loading && (
								<Link
									href={user ? '/dashboard' : '/login'}
									className={styles.loginBtn}
								>
									{user ? 'Перейти в кабінет' : 'Увійти в акаунт'}
								</Link>
							)}
						</div>
					</div>

					{/* Права колонка */}
					<div className={styles.rightCol}>
						<h3 className={styles.subtitle}>
							ЩО МОЖНА РОБИТИ В<br />
							ОНЛАЙН-КАБІНЕТІ?
						</h3>
						<ul ref={listRef} className={styles.featureList}>
							{features.map((feature, idx) => (
								<li key={idx} className={styles.featureItem}>
									<div className={`${styles.iconWrap} ${feature.bgClass}`}>
										{feature.icon}
									</div>
									<span className={styles.featureText}>{feature.text}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LMSPromo
