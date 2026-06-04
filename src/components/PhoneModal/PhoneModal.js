'use client'
import React, { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import {
	X,
	Code,
	CheckCircle,
	AlertCircle,
	Loader2,
	Eye,
	Copy,
	Download
} from 'lucide-react'
import styles from './PhoneModal.module.css'
import { validateEuropeanPhone } from '@/lib/phoneEurope'
import { usePhoneInput } from '@/lib/usePhoneInput'
import PhoneField from '@/components/PhoneField/PhoneField'
import DataProcessingConsentNote from '@/components/Legal/DataProcessingConsentNote'
import phoneStyles from '@/components/PhoneField/PhoneField.module.css'

const PhoneModal = ({ 
	isOpen, 
	onClose, 
	project, 
	onSuccess 
}) => {
	const t = useTranslations('pages.phoneModal')
	const locale = useLocale()
	const [name, setName] = useState('')
	const phoneInput = usePhoneInput('UA')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		if (isOpen) {
			phoneInput.reset()
			setName('')
			setError('')
			setSuccess(false)
		}
	}, [isOpen])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setIsSubmitting(true)

		if (!phoneInput.validateOnSubmit()) {
			setIsSubmitting(false)
			return
		}

		const phoneR = validateEuropeanPhone(phoneInput.getFullNumber(), locale)
		if (!phoneR.ok) {
			setError(phoneR.message)
			setIsSubmitting(false)
			return
		}

		if (!name.trim()) {
			setError(t('nameRequired'))
			setIsSubmitting(false)
			return
		}

		try {
			const response = await fetch('/api/phone-collection', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					phone: phoneR.e164,
					name: name.trim(),
					projectId: project?.id,
					projectTitle: project?.title,
					timestamp: new Date().toISOString(),
					locale,
				})
			})

			if (response.ok) {
				setSuccess(true)
				if (onSuccess) {
					onSuccess({ phone: phoneR.e164, name, project })
				}
			} else {
				throw new Error('Failed to submit phone number')
			}
		} catch (err) {
			console.error('Error submitting phone number:', err)
			setError(t('submitError'))
		} finally {
			setIsSubmitting(false)
		}
	}

	const copyCode = () => {
		navigator.clipboard.writeText(project.code)
	}

	const downloadCode = () => {
		const element = document.createElement('a')
		const file = new Blob([project.code], { type: 'text/plain' })
		element.href = URL.createObjectURL(file)
		element.download = `${project.title.replace(/\s+/g, '_')}_code.txt`
		document.body.appendChild(element)
		element.click()
		document.body.removeChild(element)
	}

	if (!isOpen) return null

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.header}>
					<div className={styles.headerContent}>
						<div className={styles.iconContainer}>
							<Code className={styles.icon} />
						</div>
						<div>
							<h2 className={styles.title}>
								{success ? t('titleSuccess') : t('titleDefault')}
							</h2>
							<p className={styles.subtitle}>
								{success ? t('subtitleSuccess') : t('subtitleDefault')}
							</p>
						</div>
					</div>
					<button className={styles.closeButton} onClick={onClose}>
						<X size={24} />
					</button>
				</div>

				<div className={styles.content}>
					{!success ? (
						<form onSubmit={handleSubmit} className={styles.form}>
							<div className={styles.projectInfo}>
								<h3 className={styles.projectTitle}>{project?.title}</h3>
								<p className={styles.projectDescription}>{project?.description}</p>
							</div>

							<div className={styles.formGroup}>
								<label htmlFor="name" className={styles.label}>
									{t('nameLabel')}
								</label>
								<input
									type="text"
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className={styles.input}
									placeholder={t('namePlaceholder')}
									required
								/>
							</div>

							<PhoneField
								phoneInput={phoneInput}
								classes={{
									field: styles.formGroup,
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
									error: phoneStyles.error,
								}}
								id="phone"
								labelText={t('phoneLabel')}
							/>

							{error && (
								<div className={styles.errorMessage}>
									<AlertCircle className={styles.errorIcon} />
									{error}
								</div>
							)}

							<DataProcessingConsentNote
								className={styles.privacyNote}
								iconClassName={styles.privacyIcon}
							/>

							<button
								type="submit"
								disabled={isSubmitting}
								className={styles.submitButton}
							>
								{isSubmitting ? (
									<>
										<Loader2 className={styles.buttonLoader} />
										{t('submitting')}
									</>
								) : (
									<>
										<Eye className={styles.buttonIcon} />
										{t('submit')}
									</>
								)}
							</button>
						</form>
					) : (
						<div className={styles.successContent}>
							<div className={styles.successIcon}>
								<CheckCircle className={styles.checkIcon} />
							</div>
							
							<div className={styles.codeSection}>
								<div className={styles.codeHeader}>
									<h3 className={styles.codeTitle}>{t('codeTitle', { title: project?.title })}</h3>
									<div className={styles.codeActions}>
										<button
											onClick={copyCode}
											className={styles.actionButton}
											title={t('copyCode')}
										>
											<Copy size={16} />
										</button>
										<button
											onClick={downloadCode}
											className={styles.actionButton}
											title={t('downloadCode')}
										>
											<Download size={16} />
										</button>
									</div>
								</div>
								
								<div className={styles.codeContainer}>
									<pre className={styles.codeBlock}>
										<code>{project?.code}</code>
									</pre>
								</div>
							</div>

							<div className={styles.successMessage}>
								<p>🎉 <strong>{t('successMessage')}</strong></p>
							</div>

							<button
								onClick={onClose}
								className={styles.closeSuccessButton}
							>
								{t('close')}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default PhoneModal
