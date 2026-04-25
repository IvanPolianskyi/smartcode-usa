'use client'
import React, { useState, useEffect } from 'react'

import {
	X,
	Code,
	Lock,
	CheckCircle,
	AlertCircle,
	Loader2,
	Eye,
	Copy,
	Download
} from 'lucide-react'
import styles from './PhoneModal.module.css'
import { validateEuropeanPhone } from '@/lib/phoneEurope'
import PhoneField from '@/components/PhoneField/PhoneField'

const PhoneModal = ({ 
	isOpen, 
	onClose, 
	project, 
	onSuccess 
}) => {
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	// Reset form when modal opens/closes
	useEffect(() => {
		if (isOpen) {
			setPhone('')
			setName('')
			setError('')
			setSuccess(false)
		}
	}, [isOpen])

	const handlePhoneValueChange = (next) => {
		setPhone(next)
		setError('')
	}

	// Сабміт форми
	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setIsSubmitting(true)

		const phoneR = validateEuropeanPhone(phone)
		if (!phoneR.ok) {
			setError(phoneR.message)
			setIsSubmitting(false)
			return
		}

		if (!name.trim()) {
			setError('Будь ласка, введіть ваше ім\'я')
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
					timestamp: new Date().toISOString()
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
			setError('Помилка при відправці. Спробуйте ще раз.')
		} finally {
			setIsSubmitting(false)
		}
	}

	// Копіювати код
	const copyCode = () => {
		navigator.clipboard.writeText(project.code)
	}

	// Завантажити код
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
								{success ? 'Код отримано!' : 'Отримайте код проєкту'}
							</h2>
							<p className={styles.subtitle}>
								{success 
									? 'Дякуємо! Тепер ви можете переглянути код'
									: 'Введіть ваші дані, щоб отримати доступ до коду'
								}
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
									Ваше ім&apos;я *
								</label>
								<input
									type="text"
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className={styles.input}
									placeholder="Введіть ваше ім'я"
									required
								/>
							</div>

							<div className={styles.formGroup}>
								<label htmlFor="phone" className={styles.label}>
									Номер телефону *
								</label>
								<PhoneField
									id="phone"
									name="phone"
									value={phone}
									onChange={handlePhoneValueChange}
								/>
							</div>

							{error && (
								<div className={styles.errorMessage}>
									<AlertCircle className={styles.errorIcon} />
									{error}
								</div>
							)}

							<div className={styles.privacyNote}>
								<Lock className={styles.privacyIcon} />
								<span>
									Ваші дані захищені та не будуть передані третім особам
								</span>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className={styles.submitButton}
							>
								{isSubmitting ? (
									<>
										<Loader2 className={styles.buttonLoader} />
										Відправляємо...
									</>
								) : (
									<>
										<Eye className={styles.buttonIcon} />
										Отримати код
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
									<h3 className={styles.codeTitle}>Код проєкту: {project?.title}</h3>
									<div className={styles.codeActions}>
										<button
											onClick={copyCode}
											className={styles.actionButton}
											title="Копіювати код"
										>
											<Copy size={16} />
										</button>
										<button
											onClick={downloadCode}
											className={styles.actionButton}
											title="Завантажити код"
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
								<p>
									🎉 <strong>Вітаємо!</strong> Ви отримали доступ до коду проєкту.
								</p>
							</div>

							<button
								onClick={onClose}
								className={styles.closeSuccessButton}
							>
								Закрити
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default PhoneModal
