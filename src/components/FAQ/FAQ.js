'use client'
import React, { useState, useMemo } from 'react'
import {
	ChevronDown,
	HelpCircle,
	Clock,
	Users,
	Award,
	MessageCircle,
} from 'lucide-react'
import styles from './FAQ.module.css'
import { useTranslations } from 'next-intl'

const FAQ_CATEGORIES = [
	{ key: 'general', icon: HelpCircle, ids: [0, 1, 2] },
	{ key: 'process', icon: Users, ids: [3, 4, 5] },
	{ key: 'results', icon: Award, ids: [6, 7, 8] },
	{ key: 'technical', icon: Clock, ids: [9, 10] },
]

const FAQ = () => {
	const t = useTranslations('faq')
	const tItems = useTranslations('faq.items')
	const [openItemId, setOpenItemId] = useState('')
	const [activeCategory, setActiveCategory] = useState('general')
	const faqData = useMemo(() => {
		const data = {}
		for (const { key, icon, ids } of FAQ_CATEGORIES) {
			data[key] = {
				title: t(`categories.${key}`),
				icon: React.createElement(icon),
				questions: ids.map((id) => ({
					id,
					question: tItems(`${id}.question`),
					answer: tItems(`${id}.answer`),
				})),
			}
		}
		return data
	}, [t, tItems])

	const toggleItem = (id) => {
		setOpenItemId(openItemId === id ? null : id)
	}

	return (
		<section id='faq' className={styles.faqSection}>
			<div className={styles.backgroundElements}>
				<div className={`${styles.floatingElement} ${styles.element1}`}></div>
				<div className={`${styles.floatingElement} ${styles.element2}`}></div>
			</div>
			<div className={styles.container}>
				<header className={styles.header}>
					<div className={styles.badge}>
						<MessageCircle size={16} /> {t('badge')}
					</div>
					<h2 className={styles.title}>
						{t('title')}
						<span className={styles.titleAccent}>{t('titleAccent')}</span>
					</h2>
					<p className={styles.subtitle}>{t('subtitle')}</p>
				</header>

				<div className={styles.faqLayout}>
					<aside className={styles.sidebar}>
						<h3 className={styles.sidebarTitle}>{t('sidebarTitle')}</h3>
						{Object.entries(faqData).map(([key, { title, icon }]) => (
							<button
								key={key}
								className={`${styles.categoryButton} ${
									activeCategory === key ? styles.categoryButtonActive : ''
								}`}
								onClick={() => setActiveCategory(key)}
							>
								{React.cloneElement(icon, { size: 20 })}
								<span>{title}</span>
							</button>
						))}
					</aside>

					<main className={styles.questionsList}>
						{faqData[activeCategory].questions.map((item) => {
							const isOpen = openItemId === item.id
							return (
								<div
									key={item.id}
									className={`${styles.questionItem} ${
										isOpen ? styles.questionItemOpen : ''
									}`}
								>
									<button
										onClick={() => toggleItem(item.id)}
										className={styles.questionButton}
									>
										<span className={styles.questionText}>{item.question}</span>
										<div className={styles.questionIcon}>
											<ChevronDown className={styles.chevron} />
										</div>
									</button>
									<div
										className={styles.answerContainer}
										style={{ maxHeight: isOpen ? '500px' : '0' }}
									>
										<div className={styles.answerContent}>
											<p className={styles.answerText}>{item.answer}</p>
										</div>
									</div>
								</div>
							)
						})}
					</main>
				</div>

				<div className={styles.ctaSection}>
					<div className={styles.ctaContent}>
						<h3 className={styles.ctaTitle}>{t('cta.title')}</h3>
						<p className={styles.ctaText}>{t('cta.text')}</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default FAQ
