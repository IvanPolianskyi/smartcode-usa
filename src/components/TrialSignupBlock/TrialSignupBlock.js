'use client'

import React, { useState } from 'react'
import { Send, Phone, MessageSquare, Briefcase, Sparkles } from 'lucide-react'
import {
	trackTrialInitiateCheckoutOnce,
	trackTrialLeadOnce,
	trialInterestToContentIds,
} from '@/lib/metaPixel'
import { getClientAttribution } from '@/lib/attribution'
import { acquireLeadIntent, clearLeadIntentCache } from '@/lib/leadFormClient'
import { usePhoneInput } from '@/lib/usePhoneInput'
import PhoneField from '@/components/PhoneField/PhoneField'
import phoneStyles from '@/components/PhoneField/PhoneField.module.css'
import styles from './TrialSignupBlock.module.css'
import { LEAD_MESSAGE_MAX_LENGTH } from '@/lib/sanitizeLeadText'
import { useTranslations, useLocale } from 'next-intl'
import DataProcessingConsentNote from '@/components/Legal/DataProcessingConsentNote'

const COURSE_KEYS = ['roblox', 'python', 'webDev', 'unity', 'unsure']

export default function TrialSignupBlock() {
	const t = useTranslations('trial')
	const tc = useTranslations('common')
	const locale = useLocale()
	const [preferredContactMethod, setPreferredContactMethod] = useState('phone_call')
	const [formData, setFormData] = useState({ course: '', message: '' })
	const [touched, setTouched] = useState({ phone: false, course: false })
	const [submitting, setSubmitting] = useState(false)
	const [done, setDone] = useState(false)

	const phoneInput = usePhoneInput('UA')

	const handleFormFocusCapture = (e) => {
		const t = e.target
		if (t instanceof HTMLInputElement || t instanceof HTMLSelectElement || t instanceof HTMLTextAreaElement || t instanceof HTMLButtonElement) {
			trackTrialInitiateCheckoutOnce()
			acquireLeadIntent().catch(() => {})
		}
	}

	const handleInputChange = (e) => {
		const { name: field, value } = e.target
		const next =
			field === 'message' ? value.slice(0, LEAD_MESSAGE_MAX_LENGTH) : value
		setFormData((prev) => ({ ...prev, [field]: next }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setTouched({ phone: true, course: true })
		if (!phoneInput.validateOnSubmit()) {
			return
		}
		if (!formData.course) return

		setSubmitting(true)
		try {
			const { eventId, leadToken } = await acquireLeadIntent()
			const response = await fetch('/api/telegram', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					phone: phoneInput.getFullNumber(),
					course: formData.course,
					message: formData.message,
					contactMethod: 'phone',
					preferredContactMethod,
					eventId,
					leadToken,
					sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://smartcode-academy.com',
					attribution: getClientAttribution(),
					locale,
				}),
			})
			const data = await response.json().catch(() => ({}))
			if (!response.ok || !data?.ok) {
				alert(tc('errorSubmit'))
				return
			}
			if (data?.trackLead) {
				trackTrialLeadOnce(formData.course, trialInterestToContentIds(formData.course), eventId)
			}
			clearLeadIntentCache()
			setDone(true)
			setFormData({ course: '', message: '' })
			setPreferredContactMethod('phone_call')
			phoneInput.reset()
		} catch {
			alert(tc('errorNetwork'))
		} finally {
			setSubmitting(false)
		}
	}

	// Map shared PhoneField classes using TrialSignupBlock styles where possible
	const phoneClasses = {
		field: styles.field,
		fieldError: phoneStyles.fieldError,
		label: styles.label,
		phoneContainer: phoneStyles.phoneContainer,
		countryBtn: phoneStyles.countryBtn,
		flagEmoji: phoneStyles.flagEmoji,
		dropdownArrow: phoneStyles.dropdownArrow,
		divider: phoneStyles.divider,
		phoneInputWrap: phoneStyles.phoneInputWrap,
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
				<div className={styles.decor} aria-hidden />
				<div className={styles.inner}>
					<div className={`${styles.card} ${styles.cardSuccess}`}>
						<div className={styles.successIconWrap}>
							<Sparkles size={28} className={styles.successIcon} />
						</div>
						<h2 className={styles.successTitle}>{t('successTitle')}</h2>
						<p className={styles.successText}>{t('successText')}</p>
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
						<h2 className={styles.title}>{t('title')}</h2>
						<p className={styles.subtitle}>{t('subtitle')}</p>
					</div>

					<form className={styles.form} onSubmit={handleSubmit} onFocusCapture={handleFormFocusCapture}>
						<PhoneField phoneInput={phoneInput} classes={phoneClasses} id="trial-phone" />

						<div className={styles.field}>
							<span className={styles.label}>{t('contactMethodLabel')}</span>
							<div className={styles.segment} role='group' aria-label={t('contactMethodAria')}>
								<button
									type='button'
									className={`${styles.segmentBtn} ${preferredContactMethod === 'phone_call' ? styles.segmentBtnActive : ''}`}
									onClick={() => setPreferredContactMethod('phone_call')}
								>
									<Phone size={16} aria-hidden />
									{t('phoneCall')}
								</button>
								<button
									type='button'
									className={`${styles.segmentBtn} ${preferredContactMethod === 'telegram_phone' ? styles.segmentBtnActive : ''}`}
									onClick={() => setPreferredContactMethod('telegram_phone')}
								>
									<MessageSquare size={16} aria-hidden />
									{t('telegram')}
								</button>
							</div>
						</div>

						<div className={styles.field}>
							<label className={styles.label} htmlFor='trial-course'>
								<span className={styles.labelInner}>
									<Briefcase size={15} className={styles.labelIcon} aria-hidden />
									{t('courseLabel')}
								</span>
							</label>
							<select
								id='trial-course'
								className={styles.select}
								name='course'
								value={formData.course}
								onChange={handleInputChange}
							>
								<option value=''>{t('coursePlaceholder')}</option>
								{COURSE_KEYS.map((key) => (
									<option key={key} value={t(`courses.${key}`)}>
										{t(`courses.${key}`)}
									</option>
								))}
							</select>
							{touched.course && !formData.course && (
								<span className={styles.error}>{t('courseRequired')}</span>
							)}
						</div>

						<div className={styles.field}>
							<label className={styles.label} htmlFor='trial-msg'>
								<span className={styles.labelInner}>
									<MessageSquare size={15} className={styles.labelIcon} aria-hidden />
									{t('messageLabel')}
								</span>
							</label>
							<textarea
								id='trial-msg'
								className={styles.textarea}
								name='message'
								value={formData.message}
								onChange={handleInputChange}
								rows={3}
								maxLength={LEAD_MESSAGE_MAX_LENGTH}
								placeholder={t('messagePlaceholder')}
							/>
						</div>

						<DataProcessingConsentNote className={styles.consentNote} />

						<button type='submit' className={styles.submit} disabled={submitting}>
							<Send size={18} aria-hidden />
							{submitting ? t('submitting') : t('submit')}
						</button>
					</form>
				</div>
			</div>
		</section>
	)
}
