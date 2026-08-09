'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
	Code,
	Gamepad2,
	Monitor,
	Box,
	Blocks,
	Cuboid,
	Send,
	Sparkles,
	MessageSquare,
	ArrowRight,
} from 'lucide-react'
import { useLocale } from 'next-intl'
import { trackTrialInitiateCheckoutOnce, trackTrialLeadOnce } from '@/lib/metaPixel'
import { getClientAttribution } from '@/lib/attribution'
import { acquireLeadIntent, clearLeadIntentCache } from '@/lib/leadFormClient'
import styles from './KidsPage.module.css'

export default function KidsPage() {
	const locale = useLocale()
	const [name, setName] = useState('')
	const [telegram, setTelegram] = useState('')
	const [nameError, setNameError] = useState('')
	const [telegramError, setTelegramError] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [done, setDone] = useState(false)
	const formRef = useRef(null)

	const scrollToForm = (e) => {
		if (e) e.preventDefault()
		formRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const handleFocusCapture = () => {
		trackTrialInitiateCheckoutOnce()
		acquireLeadIntent().catch(() => {})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (submitting) return

		let hasError = false
		if (!name.trim()) {
			setNameError("Введіть ваше ім'я або нікнейм")
			hasError = true
		} else {
			setNameError('')
		}

		if (!telegram.trim()) {
			setTelegramError("Введіть ваш Telegram нікнейм (наприклад, @username)")
			hasError = true
		} else {
			setTelegramError('')
		}

		if (hasError) return

		setSubmitting(true)
		try {
			const { eventId, leadToken } = await acquireLeadIntent()
			const response = await fetch('/api/telegram', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: name.trim(),
					telegram: telegram.trim(),
					course: 'Дитячий лендинг (Загальна заявка)',
					message: 'Заявка з дитячого лендингу. Пріоритетний контакт: Telegram.',
					contactMethod: 'telegram',
					preferredContactMethod: 'telegram_phone',
					eventId,
					leadToken,
					sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://smartcode-academy.com/kids',
					attribution: getClientAttribution(),
					locale,
				}),
			})
			const data = await response.json().catch(() => ({}))
			if (!response.ok || !data?.ok) {
				alert("На жаль, сталася помилка при відправці. Спробуйте ще раз.")
				return
			}
			if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
				window.gtag('event', 'submit_kids_form', { contact_method: 'telegram' })
			}
			if (data?.trackLead) {
				trackTrialLeadOnce('kids_landing', [], eventId)
			}
			clearLeadIntentCache()
			setDone(true)
		} catch {
			alert("Сталася помилка мережі. Перевірте підключення та спробуйте ще раз.")
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className={styles.kidsWrapper}>
			{/* Custom Sticky Header */}
			<header className={styles.kidsNav}>
				<div className={styles.container} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
					<Link href="/" className={styles.logoArea} style={{ textDecoration: 'none', color: '#ffffff' }}>
						<div style={{ width: '40px', height: '40px', borderRadius: '10px', overflow: 'hidden', marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }}>
							<img src="/logo.jpeg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
						</div>
						<span className={styles.logoTitle}>
							SmartCode<span className={styles.logoAccent}> Academy</span>
						</span>
					</Link>
					<button onClick={scrollToForm} className={styles.navCta}>
						ЗАПИСАТИСЯ
					</button>
				</div>
			</header>

			{/* Hero Section */}
			<section className={styles.hero}>
				<div className={styles.container}>
					<div className={styles.badge}>
						<Sparkles size={14} style={{ marginRight: '4px' }} />
						<span>онлайн-школа програмування для дітей та підлітків 7-17 років</span>
					</div>
					<h1 className={styles.heroTitle}>
						SMARTCODE — <span className={styles.titleGlow}>ШКОЛА ПРОГРАМУВАННЯ</span>
					</h1>
					<p className={styles.heroSubtitle}>
						Створи свій власний проєкт вже на пробному занятті <span style={{ color: '#cc00ff' }}>БЕЗКОШТОВНО</span>
					</p>

					<div className={styles.featuresGrid}>
						<div className={styles.featureBadge}>🎮 Заняття у ігровій формі</div>
						<div className={styles.featureBadge}>💻 Сучасна платформа для навчання</div>
					</div>

					<button onClick={scrollToForm} className={styles.submitBtn} style={{ padding: '1.2rem 3rem', fontSize: '1.15rem' }}>
						ЗАПИСАТИСЯ НА БЕЗКОШТОВНИЙ УРОК
					</button>
				</div>
			</section>

			{/* Courses Info Grid */}
			<section className={styles.coursesSection}>
				<div className={styles.container}>
					<div className={styles.sectionHeading}>
						<h2 className={styles.sectionTitle}>Чому ти навчишся у нас?</h2>
						<p className={styles.sectionSubtitle}>Обирай свій улюблений напрямок та створюй круті проєкти</p>
					</div>

					<div className={styles.kidsGrid}>
						<div className={styles.courseCard}>
							<div className={`${styles.cardIcon}`} style={{ backgroundColor: '#f97316' }}>
								<Blocks size={24} />
							</div>
							<h3 className={styles.cardTitle}>Scratch</h3>
							<p className={styles.cardText}>
								Перші ігри та анімації на блоках — ідеальний старт у програмуванні для молодших учнів.
							</p>
							<Link href="/Scratch" className={styles.cardLink}>
								Детальніше <ArrowRight size={14} />
							</Link>
						</div>

						<div className={styles.courseCard}>
							<div className={`${styles.cardIcon}`} style={{ backgroundColor: '#22c55e' }}>
								<Cuboid size={24} />
							</div>
							<h3 className={styles.cardTitle}>Minecraft Education</h3>
							<p className={styles.cardText}>
								Код, агенти та квести у світі Minecraft Education — STEM через улюблену гру.
							</p>
							<Link href="/MinecraftEducation" className={styles.cardLink}>
								Детальніше <ArrowRight size={14} />
							</Link>
						</div>

						<div className={styles.courseCard}>
							<div className={`${styles.cardIcon} styles.robloxIcon`} style={{ backgroundColor: '#2563eb' }}>
								<Box size={24} />
							</div>
							<h3 className={styles.cardTitle}>Roblox Studio</h3>
							<p className={styles.cardText}>
								Навчися створювати власні 3D-світи, смуги перешкод (Obby) та симулятори за допомогою мови Lua.
							</p>
						</div>

						<div className={styles.courseCard}>
							<div className={`${styles.cardIcon} styles.pythonIcon`} style={{ backgroundColor: '#10b981' }}>
								<Code size={24} />
							</div>
							<h3 className={styles.cardTitle}>Python Developer</h3>
							<p className={styles.cardText}>
								Опануй найпопулярнішу мову програмування у світі. Пиши корисних Telegram-ботів та створюй інтерактивні ігри.
							</p>
						</div>

						<div className={styles.courseCard}>
							<div className={`${styles.cardIcon} styles.unityIcon`} style={{ backgroundColor: '#f59e0b' }}>
								<Gamepad2 size={24} />
							</div>
							<h3 className={styles.cardTitle}>GameDev на Unity</h3>
							<p className={styles.cardText}>
								Дізнайся, як працює справжній геймдев. Пиши на C# та створюй захоплюючі ігри, в які гратимуть тисячі гравців.
							</p>
						</div>

						<div className={styles.courseCard}>
							<div className={`${styles.cardIcon} styles.webIcon`} style={{ backgroundColor: '#8b5cf6' }}>
								<Monitor size={24} />
							</div>
							<h3 className={styles.cardTitle}>Веб-розробка</h3>
							<p className={styles.cardText}>
								Створюй сучасні веб-сайти з HTML, CSS та JavaScript. Роби їх стильними, швидкими та адаптивними для телефонів.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Registration Form Section */}
			<section ref={formRef} className={styles.formSection} id="kids-signup">
				<div className={styles.container}>
					<div className={styles.formCard}>
						{!done ? (
							<>
								<h2 className={styles.formCardTitle}>ЗАБРОНЮЙ СВОЄ МІСЦЕ</h2>
								<p className={styles.formCardSubtitle}>
									Залиш свої контакти і ми зв'яжемося з тобою в Telegram для підбору зручного часу!
								</p>

								<form
									onSubmit={handleSubmit}
									onFocusCapture={handleFocusCapture}
									className={styles.form}
									noValidate
								>
									<div className={styles.field}>
										<label className={styles.label} htmlFor="kids-name">Нікнейм або Ім'я</label>
										<input
											id="kids-name"
											type="text"
											className={styles.input}
											placeholder="Як до тебе звертатися?"
											value={name}
											onChange={(e) => {
												setName(e.target.value)
												if (e.target.value.trim()) setNameError('')
											}}
										/>
										{nameError && <span className={styles.error}>{nameError}</span>}
									</div>

									<div className={styles.field}>
										<label className={styles.label} htmlFor="kids-telegram">Мій Telegram (@username)</label>
										<input
											id="kids-telegram"
											type="text"
											className={styles.input}
											placeholder="@username або посилання"
											value={telegram}
											onChange={(e) => {
												setTelegram(e.target.value)
												if (e.target.value.trim()) setTelegramError('')
											}}
										/>
										{telegramError && <span className={styles.error}>{telegramError}</span>}
									</div>

									<button type="submit" className={styles.submitBtn} disabled={submitting}>
										{submitting ? "Відправка..." : "ЗАПИСАТИСЯ НА БЕЗКОШТОВНИЙ УРОК"}
									</button>
								</form>
							</>
						) : (
							<div className={styles.success}>
								<Sparkles size={48} className={styles.successIcon} />
								<h3 className={styles.successTitle}>Ура! Заявку прийнято!</h3>
								<p className={styles.successText}>
									Ми незабаром напишемо тобі в Telegram. Готуйся створювати свій перший IT-проєкт! 🚀
								</p>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Footer CTA Banner */}
			<section className={styles.footerCtaSection}>
				<div className={styles.container}>
					<h2 className={styles.footerCtaTitle}>Готовий розпочати свою IT-подорож?</h2>
					<button onClick={scrollToForm} className={styles.submitBtn} style={{ padding: '1.2rem 3rem', fontSize: '1.15rem' }}>
						ЗАПИСАТИСЯ НА БЕЗКОШТОВНИЙ ПРОБНИЙ УРОК
					</button>
				</div>
			</section>
		</div>
	)
}
