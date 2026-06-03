'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Phone, Send, CheckCircle, X, User } from 'lucide-react'
import {
	trackTrialInitiateCheckoutOnce,
	trackTrialLeadOnce,
} from '@/lib/metaPixel'
import { getClientAttribution } from '@/lib/attribution'
import { acquireLeadIntent, clearLeadIntentCache } from '@/lib/leadFormClient'
import { usePhoneInput } from '@/lib/usePhoneInput'
import PhoneField from '@/components/PhoneField/PhoneField'
import phoneStyles from '@/components/PhoneField/PhoneField.module.css'
import styles from './ContactForm.module.css'

const ContactForm = () => {
	const t = useTranslations('contact')
	const tc = useTranslations('common')
	const locale = useLocale()
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({ name: '', message: '' })
    const [nameError, setNameError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const overlayRef = useRef(null)
    const openedAtRef = useRef(0)
    const scrollPositionRef = useRef(0)
    const nameInputRef = useRef(null)

    const phoneInput = usePhoneInput('UA')

    useEffect(() => {
        let rafId = null
        const open = () => {
            openedAtRef.current = Date.now()
            if (rafId) cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => {
                setIsOpen(true)
                if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                    window.gtag('event', 'click_trial_button')
                }
                trackTrialInitiateCheckoutOnce()
                acquireLeadIntent().catch(() => {})
            })
        }
        const close = () => {
            if (rafId) cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => setIsOpen(false))
        }
        window.addEventListener('openContactModal', open)
        window.addEventListener('closeContactModal', close)
        return () => {
            window.removeEventListener('openContactModal', open)
            window.removeEventListener('closeContactModal', close)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [])

    // Focus name input when modal opens
    useEffect(() => {
        if (isOpen && nameInputRef.current && !isSubmitted) {
            setTimeout(() => nameInputRef.current?.focus(), 200)
        }
    }, [isOpen, isSubmitted])

    const handleOverlayClick = () => {
        if (Date.now() - (openedAtRef.current || 0) < 250) return
        setIsOpen(false)
    }

    useEffect(() => {
        if (!isOpen) return

        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
        scrollPositionRef.current = scrollY

        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
            scrollPositionRef.current = 0
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen])

    const handleInputChange = e => {
        const { name, value } = e.target
        if (name === 'name') {
            setFormData(prev => ({ ...prev, name: value }))
            if (!value.trim()) setNameError(t('nameRequired'))
            else setNameError('')
            return
        }
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (submitting) return

        // Validate
        let hasError = false
        if (!formData.name.trim()) {
            setNameError(t('nameRequired'))
            hasError = true
        }
        if (!phoneInput.validateOnSubmit()) {
            hasError = true
        }
        if (hasError) return

        setSubmitting(true)
        try {
            const submitPayload = (eventId, leadToken) => ({
                name: formData.name.trim(),
                phone: phoneInput.getFullNumber(),
                message: formData.message,
                course: '',
                contactMethod: 'phone',
                preferredContactMethod: 'phone_call',
                eventId,
                leadToken,
                sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://smartcode-academy.com',
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
                console.error('Failed to send telegram message', response.status, data)
                if (
                    response.status === 503 &&
                    (data?.code === 'telegram_not_configured' ||
                        String(data?.error || '').includes('TELEGRAM'))
                ) {
                    alert(t('errorTelegramConfig'))
                    return
                }
                if (response.status === 429 || data?.code === 'rate_limited') {
                    alert(t('errorRateLimit'))
                    return
                }
                alert(t('errorSubmit'))
                return
            }
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                window.gtag('event', 'submit_trial_form', {
                    contact_method: 'phone_call',
                })
            }
            if (data?.trackLead) {
                trackTrialLeadOnce('', [], eventId)
            }
            clearLeadIntentCache()
            setIsSubmitted(true)
            
            // Auto-close after success
            setTimeout(() => {
                setIsSubmitted(false)
                setFormData({ name: '', message: '' })
                setNameError('')
                phoneInput.reset()
                setIsOpen(false)
            }, 2500)
        } catch (err) {
            console.error(err)
            if (err?.message === 'Lead form signing is not configured' || err?.status === 503) {
                alert(t('errorLeadConfig'))
                return
            }
            if (err?.status === 429) {
                alert(t('errorRateLimit'))
                return
            }
            alert(t('errorNetwork'))
        } finally {
            setSubmitting(false)
        }
    }

    if (!isOpen) return null

    // Map shared PhoneField classes
    const phoneClasses = {
        field: styles.modalField,
        fieldError: styles.modalFieldError,
        label: styles.modalLabel,
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
        error: styles.modalError,
    }

    return (
        <div className={styles.modalOverlay} ref={overlayRef} onClick={handleOverlayClick}>
            <div className={styles.modalShell} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalInner}>
                    <div className={styles.modalCard}>
                        <button type='button' className={styles.modalClose} onClick={() => setIsOpen(false)} aria-label={t('closeAria')}>
                            <X size={20} />
                        </button>

                        {!isSubmitted ? (
                            <>
                                <div className={styles.modalCardHeader}>
                                    <div className={styles.modalIconCircle}>
                                        <Phone size={24} />
                                    </div>
                                    <h2 className={styles.modalTitle}>{t('title')}</h2>
                                    <p className={styles.modalSubtitle}>
                                        {t('subtitle')}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className={styles.modalForm}>
                                    {/* Name */}
                                    <div className={`${styles.modalField} ${nameError ? styles.modalFieldError : ''}`}>
                                        <label className={styles.modalLabel} htmlFor='modal-name'>
                                            {t('nameLabel')}
                                        </label>
                                        <div className={styles.modalInputWrap}>
                                            <User size={18} className={styles.modalInputIcon} />
                                            <input
                                                ref={nameInputRef}
                                                id='modal-name'
                                                type='text'
                                                name='name'
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder={t('namePlaceholder')}
                                                className={styles.modalInput}
                                                autoComplete='name'
                                            />
                                        </div>
                                        {nameError && <span className={styles.modalError}>{nameError}</span>}
                                    </div>

                                    {/* Phone */}
                                    <PhoneField phoneInput={phoneInput} classes={phoneClasses} id="modal-phone" />

                                    {/* Comment (optional) */}
                                    <div className={styles.modalField}>
                                        <label className={styles.modalLabel} htmlFor='modal-msg'>
                                            {t('messageLabel')}{' '}
											<span className={styles.modalLabelOptional}>
												{t('messageOptional')}
											</span>
                                        </label>
                                        <textarea
                                            id='modal-msg'
                                            name='message'
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={2}
                                            placeholder={t('messagePlaceholder')}
                                            className={styles.modalTextarea}
                                        />
                                    </div>

                                    <button type='submit' className={styles.modalSubmit} disabled={submitting}>
                                        <Send size={18} aria-hidden />
                                        {submitting ? tc('submitting') : t('submit')}
                                    </button>

                                    <p className={styles.modalNote}>
                                        {t('note')}
                                    </p>
                                </form>
                            </>
                        ) : (
                            <div className={styles.modalSuccess}>
                                <div className={styles.modalSuccessIconWrap}>
                                    <CheckCircle size={32} className={styles.modalSuccessIcon} />
                                </div>
                                <h3 className={styles.modalSuccessTitle}>{t('successTitle')}</h3>
                                <p className={styles.modalSuccessText}>
                                    {t('successText')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm
