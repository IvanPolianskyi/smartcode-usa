'use client'

import React, { useState } from 'react'
import { Sparkles, Check } from 'lucide-react'
import {
	trackTrialInitiateCheckoutOnce,
	trackTrialLeadOnce,
} from '@/lib/metaPixel'
import { getClientAttribution } from '@/lib/attribution'
import { acquireLeadIntent, clearLeadIntentCache } from '@/lib/leadFormClient'
import { usePhoneInput } from '@/lib/usePhoneInput'
import PhoneField from '@/components/PhoneField/PhoneField'
import phoneStyles from '@/components/PhoneField/PhoneField.module.css'
import styles from './TrialSignupBlock.module.css'
import { useLocale } from 'next-intl'

export default function TrialSignupBlock() {
	const locale = useLocale()
	const [formData, setFormData] = useState({ name: '', email: '' })
	const [submitting, setSubmitting] = useState(false)
	const [done, setDone] = useState(false)
	const phoneInput = usePhoneInput('UA')

	const handleFormFocusCapture = (e) => {
		const t = e.target
		if (t instanceof HTMLInputElement || t instanceof HTMLButtonElement) {
			trackTrialInitiateCheckoutOnce()
			acquireLeadIntent().catch(() => {})
		}
	}

	const handleInputChange = (e) => {
		const { name: field, value } = e.target
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!phoneInput.validateOnSubmit()) return
		if (!formData.name.trim()) {
			alert('Введіть ваше ім\'я')
			return
		}
		if (!formData.email.trim()) {
			alert('Введіть email')
			return
		}

		setSubmitting(true)
		try {
			const { eventId, leadToken } = await acquireLeadIntent()
			const response = await fetch('/api/telegram', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: formData.name,
					phone: phoneInput.getFullNumber(),
					course: 'Пробне заняття (з блоку реєстрації)',
					message: `Email: ${formData.email}`, // Pass email as message
					contactMethod: 'phone',
					preferredContactMethod: 'phone_call',
					eventId,
					leadToken,
					sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://smartcode-academy.com',
					attribution: getClientAttribution(),
					locale,
				}),
			})
			const data = await response.json().catch(() => ({}))
			if (!response.ok || !data?.ok) {
				alert('Помилка відправки, спробуйте пізніше.')
				return
			}
			if (data?.trackLead) {
				trackTrialLeadOnce('trial_lesson', [], eventId)
			}
			clearLeadIntentCache()
			setDone(true)
			setFormData({ name: '', email: '' })
			phoneInput.reset()
		} catch {
			alert('Помилка мережі, перевірте з\'єднання.')
		} finally {
			setSubmitting(false)
		}
	}

	const phoneClasses = {
		field: styles.field,
		fieldError: phoneStyles.fieldError,
		label: styles.label,
		phoneContainer: phoneStyles.phoneContainer,
		countryBtn: phoneStyles.countryBtn,
		flagEmoji: phoneStyles.flagEmoji,
		dropdownArrow: phoneStyles.dropdownArrow,
		divider: phoneStyles.divider,
		phoneInputWrap: `${phoneStyles.phoneInputWrap} ${styles.customPhoneWrap}`,
		phonePrefix: phoneStyles.phonePrefix,
		phoneInput: phoneStyles.phoneInput,
		dropdown: phoneStyles.dropdown,
		dropdownSearchWrap: phoneStyles.dropdownSearchWrap,
		dropdownSearch: phoneStyles.dropdownSearch,
		dropdownList: phoneStyles.dropdownList,
		dropdownEmpty: phoneStyles.dropdownEmpty,
		dropdownItem: phoneStyles.dropdownItem,
		dropdownItemActive: phoneStyles.dropdownItemActive,
		dropdownItemFlag: phoneStyles.dropdownItemFlag,
		dropdownItemName: phoneStyles.dropdownItemName,
		dropdownItemCode: phoneStyles.dropdownItemCode,
		dropdownItemDial: phoneStyles.dropdownItemDial,
		error: styles.error,
	}

	if (done) {
		return (
			<section className={styles.section} id='trial-signup'>
				<div className={styles.inner}>
					<div className={`${styles.card} ${styles.cardSuccess}`}>
						<div className={styles.successIconWrap}>
							<Sparkles size={28} className={styles.successIcon} />
						</div>
						<h2 className={styles.successTitle}>Заявку отримано!</h2>
						<p className={styles.successText}>Дякуємо. Ми зв'яжемося з вами найближчим часом.</p>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className={styles.section} id='trial-signup'>
			<div className={styles.inner}>
				{/* Left Content */}
				<div className={styles.leftContent}>
					<h2 className={styles.title}>
						ЗАПИШІТЬ ВАШОГО МАЙБУТНЬОГО ПРОГРАМІСТА НА <span className={styles.titleAccent}>БЕЗКОШТОВНЕ</span> ПРОБНЕ ЗАНЯТТЯ
					</h2>
					<div className={styles.benefits}>
						<div className={styles.benefitItem}>
							<span>- Знайомство з майбутнім викладачем та платформою</span>
						</div>
						<div className={styles.benefitItem}>
							<span>- <strong>Дорогий ПК не потрібен</strong> - підійде звичайний ноутбук</span>
						</div>
						<div className={styles.benefitItem}>
							<span>- За один урок покажемо як створити власну гру</span>
						</div>
						<div className={styles.benefitItem}>
							<span>- Зрозуміємо рівень знань Вашої дитини та запропонуємо індивідуальний план навчання</span>
						</div>
					</div>
				</div>

				{/* Right Form */}
				<div className={styles.rightForm}>
					<div className={styles.card}>
						<form className={styles.form} onSubmit={handleSubmit} onFocusCapture={handleFormFocusCapture}>
							<div className={styles.field}>
								<label className={styles.label} htmlFor="name">Ім'я *</label>
								<input
									id="name"
									name="name"
									type="text"
									className={styles.input}
									placeholder="Введіть ім'я та прізвище"
									value={formData.name}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className={styles.field}>
								<label className={styles.label} htmlFor="trial-phone">
									Номер телефону (Viber, Telegram, WhatsApp) *
								</label>
								<PhoneField
									phoneInput={phoneInput}
									classes={phoneClasses}
									id="trial-phone"
									showLabel={false}
								/>
							</div>

							<div className={styles.field}>
								<label className={styles.label} htmlFor="email">E-mail *</label>
								<input
									id="email"
									name="email"
									type="email"
									className={styles.input}
									placeholder="Введіть електронну пошту"
									value={formData.email}
									onChange={handleInputChange}
									required
								/>
							</div>

							<button type="submit" className={styles.submit} disabled={submitting}>
								{submitting ? 'Відправка...' : 'Записатися на пробне заняття ↗'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
