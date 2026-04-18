'use client'

import React, { useState } from 'react'
import { Send, Phone, MessageSquare, Briefcase, Sparkles } from 'lucide-react'
import {
	trackTrialInitiateCheckoutOnce,
	trackTrialLeadOnce,
	trialInterestToContentIds,
	generateEventId,
} from '@/lib/metaPixel'
import styles from './TrialSignupBlock.module.css'

const COURSES = [
	'Roblox Studio',
	'Python',
	'JavaScript та веб-розробка',
	'Розробка ігор на Unity',
	'Не впевнений(а), потрібна консультація',
]

export default function TrialSignupBlock() {
	const [contactMethod, setContactMethod] = useState('phone')
	const [formData, setFormData] = useState({ phone: '', telegram: '', course: '', message: '' })
	const [phoneError, setPhoneError] = useState('')
	const [telegramError, setTelegramError] = useState('')
	const [touched, setTouched] = useState({ phone: false, telegram: false, course: false })
	const [submitting, setSubmitting] = useState(false)
	const [done, setDone] = useState(false)

	const handleFormFocusCapture = (e) => {
		const t = e.target
		if (t instanceof HTMLInputElement || t instanceof HTMLSelectElement || t instanceof HTMLTextAreaElement) {
			trackTrialInitiateCheckoutOnce()
		}
	}

	const handleInputChange = (e) => {
		const { name: field, value } = e.target
		if (field === 'phone') {
			const digits = value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 9)
			setFormData((prev) => ({ ...prev, phone: digits }))
			if (digits.length === 0) setPhoneError('Введіть номер телефону')
			else if (digits.length !== 9) setPhoneError('Номер має містити 9 цифр')
			else setPhoneError('')
			return
		}
		if (field === 'telegram') {
			const cleaned = value.replace(/^@/, '').trim()
			setFormData((prev) => ({ ...prev, telegram: cleaned }))
			if (!cleaned) setTelegramError('Введіть ваш телеграм')
			else setTelegramError('')
			return
		}
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setTouched({ phone: true, telegram: true, course: true })

		if (contactMethod === 'phone') {
			if (!/^\d{9}$/.test(formData.phone || '')) {
				setPhoneError('Введіть коректний номер (9 цифр)')
				return
			}
		} else if (!formData.telegram?.trim()) {
			setTelegramError('Введіть ваш телеграм')
			return
		}
		if (!formData.course) return

		setSubmitting(true)
		try {
			const eventId = generateEventId()
			const response = await fetch('/api/telegram', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					phone: formData.phone,
					telegram: formData.telegram,
					course: formData.course,
					message: formData.message,
					contactMethod,
					eventId,
					sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://smartcode-academy.com',
				}),
			})
			const data = await response.json().catch(() => ({}))
			if (!response.ok || !data?.ok) {
				alert('На жаль, сталася помилка при відправці. Спробуйте ще раз.')
				return
			}
			trackTrialLeadOnce(formData.course, trialInterestToContentIds(formData.course), eventId)
			setDone(true)
			setFormData({ phone: '', telegram: '', course: '', message: '' })
			setContactMethod('phone')
		} catch {
			alert('Сталася помилка мережі.')
		} finally {
			setSubmitting(false)
		}
	}

	if (done) {
		return (
			<section className={styles.section} id='trial-signup'>
				<div className={styles.decor} aria-hidden />
				<div className={styles.inner}>
					<div className={`${styles.card} ${styles.cardSuccess}`}>
						<div className={styles.successIconWrap}>
							<Sparkles size={28} className={styles.successIcon} />
						</div>
						<h2 className={styles.successTitle}>Заявку отримано</h2>
						<p className={styles.successText}>Дякуємо! Ми зв&apos;яжемося з вами найближчим часом.</p>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className={styles.section} id='trial-signup'>
			<div className={styles.decor} aria-hidden />
			<div className={styles.inner}>
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h2 className={styles.title}>ЗАПИС НА ПРОБНЕ ЗАНЯТТЯ</h2>
						<p className={styles.subtitle}>
							Оберіть зручний спосіб зв&apos;язку та напрямок - відповімо і підберемо час.
						</p>
					</div>

					<form className={styles.form} onSubmit={handleSubmit} onFocusCapture={handleFormFocusCapture}>
						<div className={styles.field}>
							<span className={styles.label}>Як з вами зв&apos;язатися?</span>
							<div className={styles.segment} role='group' aria-label="Спосіб зв'язку">
								<button
									type='button'
									className={`${styles.segmentBtn} ${contactMethod === 'phone' ? styles.segmentBtnActive : ''}`}
									onClick={() => {
										setContactMethod('phone')
										setTelegramError('')
									}}
								>
									<Phone size={16} aria-hidden />
									Телефон
								</button>
								<button
									type='button'
									className={`${styles.segmentBtn} ${contactMethod === 'telegram' ? styles.segmentBtnActive : ''}`}
									onClick={() => {
										setContactMethod('telegram')
										setPhoneError('')
									}}
								>
									<MessageSquare size={16} aria-hidden />
									Telegram
								</button>
							</div>
						</div>

						{contactMethod === 'phone' ? (
							<div className={styles.field}>
								<label className={styles.label} htmlFor='trial-phone'>
									Номер телефону
								</label>
								<div className={styles.phoneRow}>
									<span className={styles.prefix}>+380</span>
									<input
										id='trial-phone'
										className={styles.input}
										name='phone'
										value={formData.phone}
										onChange={handleInputChange}
										inputMode='numeric'
										placeholder='__ ___ __ __'
										autoComplete='tel-national'
									/>
								</div>
								{phoneError && <span className={styles.error}>{phoneError}</span>}
							</div>
						) : (
							<div className={styles.field}>
								<p className={styles.hint}>
									Наш телеграм: <span className={styles.hintAccent}>@SmartCode_Academy</span>
								</p>
								<label className={styles.label} htmlFor='trial-tg'>
									Ваш username у Telegram
								</label>
								<input
									id='trial-tg'
									className={styles.input}
									name='telegram'
									value={formData.telegram}
									onChange={handleInputChange}
									placeholder='username'
									autoComplete='username'
								/>
								{telegramError && <span className={styles.error}>{telegramError}</span>}
							</div>
						)}

						<div className={styles.field}>
							<label className={styles.label} htmlFor='trial-course'>
								<span className={styles.labelInner}>
									<Briefcase size={15} className={styles.labelIcon} aria-hidden />
									Напрямок навчання
								</span>
							</label>
							<select
								id='trial-course'
								className={styles.select}
								name='course'
								value={formData.course}
								onChange={handleInputChange}
							>
								<option value=''>Оберіть напрямок</option>
								{COURSES.map((c) => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
							</select>
							{touched.course && !formData.course && <span className={styles.error}>Оберіть напрямок</span>}
						</div>

						<div className={styles.field}>
							<label className={styles.label} htmlFor='trial-msg'>
								<span className={styles.labelInner}>
									<MessageSquare size={15} className={styles.labelIcon} aria-hidden />
									Коментар (за бажанням)
								</span>
							</label>
							<textarea
								id='trial-msg'
								className={styles.textarea}
								name='message'
								value={formData.message}
								onChange={handleInputChange}
								rows={3}
								placeholder='Вік дитини, зручний час, питання…'
							/>
						</div>

						<button type='submit' className={styles.submit} disabled={submitting}>
							<Send size={18} aria-hidden />
							{submitting ? 'Відправка…' : 'Надіслати заявку'}
						</button>
					</form>
				</div>
			</div>
		</section>
	)
}
