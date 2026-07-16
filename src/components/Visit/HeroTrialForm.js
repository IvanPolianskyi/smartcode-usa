'use client'

import React, { useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import {
	trackTrialInitiateCheckoutOnce,
	trackTrialLeadOnce,
} from '@/lib/metaPixel'
import { getClientAttribution } from '@/lib/attribution'
import { acquireLeadIntent, clearLeadIntentCache } from '@/lib/leadFormClient'
import { usePhoneInput } from '@/lib/usePhoneInput'
import PhoneField from '@/components/PhoneField/PhoneField'
import phoneStyles from '@/components/PhoneField/PhoneField.module.css'
import styles from './HeroTrialForm.module.css'
import { useTranslations, useLocale } from 'next-intl'

export default function HeroTrialForm() {
	const t = useTranslations('home.heroForm')
	const tc = useTranslations('common')
	const locale = useLocale()
	const [name, setName] = useState('')
	const [nameError, setNameError] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [done, setDone] = useState(false)
	const nameRef = useRef(null)
	const phoneInput = usePhoneInput('UA')

	const phoneClasses = {
		field: styles.phoneField,
		fieldError: styles.fieldError,
		label: styles.srOnly,
		phoneContainer: styles.phoneContainer,
		countryBtn: `${phoneStyles.countryBtn} ${styles.countryBtn}`,
		flagEmoji: phoneStyles.flagEmoji,
		dropdownArrow: `${phoneStyles.dropdownArrow} ${styles.dropdownArrow}`,
		divider: `${phoneStyles.divider} ${styles.divider}`,
		phoneInputWrap: `${phoneStyles.phoneInputWrap} ${styles.phoneInputWrap}`,
		phonePrefix: `${phoneStyles.phonePrefix} ${styles.phonePrefix}`,
		phoneInput: `${phoneStyles.phoneInput} ${styles.phoneInput}`,
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

	const handleFocusCapture = () => {
		trackTrialInitiateCheckoutOnce()
		acquireLeadIntent().catch(() => {})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (submitting) return

		let hasError = false
		if (!name.trim()) {
			setNameError(t('nameRequired'))
			hasError = true
		} else {
			setNameError('')
		}
		if (!phoneInput.validateOnSubmit()) {
			hasError = true
		}
		if (hasError) return

		setSubmitting(true)
		try {
			const submitPayload = (eventId, leadToken) => ({
				name: name.trim(),
				phone: phoneInput.getFullNumber(),
				message: '',
				course: '',
				contactMethod: 'phone',
				preferredContactMethod: 'phone_call',
				eventId,
				leadToken,
				sourceUrl:
					typeof window !== 'undefined'
						? window.location.href
						: 'https://smartcode-academy.com',
				attribution: getClientAttribution(),
				locale,
			})

			const postLead = async (eventId, leadToken) => {
				const response = await fetch('/api/telegram', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(submitPayload(eventId, leadToken)),
				})
				const data = await response.json().catch(() => ({}))
				return { response, data }
			}

			clearLeadIntentCache()
			let { eventId, leadToken } = await acquireLeadIntent()
			let { response, data } = await postLead(eventId, leadToken)

			if (
				!response.ok &&
				(response.status === 403 || data?.code === 'invalid_token')
			) {
				clearLeadIntentCache()
				;({ eventId, leadToken } = await acquireLeadIntent())
				;({ response, data } = await postLead(eventId, leadToken))
			}

			if (!response.ok || !data?.ok) {
				alert(tc('errorSubmit'))
				return
			}
			if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
				window.gtag('event', 'submit_trial_form', { contact_method: 'phone_call' })
			}
			if (data?.trackLead) {
				trackTrialLeadOnce('', [], eventId)
			}
			clearLeadIntentCache()
			setDone(true)
		} catch {
			alert(tc('errorNetwork'))
		} finally {
			setSubmitting(false)
		}
	}

	if (done) {
		return (
			<div className={styles.card} id='trial-signup-hero'>
				<div className={styles.success}>
					<Sparkles size={26} className={styles.successIcon} aria-hidden />
					<p className={styles.successTitle}>{t('successTitle')}</p>
					<p className={styles.successText}>{t('successText')}</p>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.card} id='trial-signup-hero'>
			<h2 className={styles.title}>
				{t('title')}{' '}
				<span className={styles.titleAccent}>{t('titleAccent')}</span>
			</h2>

			<form
				className={styles.form}
				onSubmit={handleSubmit}
				onFocusCapture={handleFocusCapture}
				noValidate
			>
				<div className={styles.formRow}>
					<div className={styles.field}>
						<label className={styles.srOnly} htmlFor='hero-trial-name'>
							{t('nameLabel')}
						</label>
						<input
							ref={nameRef}
							id='hero-trial-name'
							type='text'
							name='name'
							className={`${styles.input} ${nameError ? styles.inputError : ''}`}
							placeholder={t('namePlaceholder')}
							value={name}
							onChange={(e) => {
								setName(e.target.value)
								if (e.target.value.trim()) setNameError('')
							}}
							autoComplete='name'
						/>
						{nameError && <span className={styles.error}>{nameError}</span>}
					</div>

					<PhoneField
						phoneInput={phoneInput}
						classes={phoneClasses}
						id='hero-trial-phone'
						showLabel={false}
					/>
				</div>

				<button type='submit' className={styles.submit} disabled={submitting}>
					<span className={styles.submitLabel}>
						{submitting ? t('submitting') : t('submit')}
					</span>
				</button>

				<p className={styles.hint}>{t('hint')}</p>
			</form>
		</div>
	)
}
