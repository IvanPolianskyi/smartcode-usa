"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Phone, Send, CheckCircle, X, User } from 'lucide-react'
import {
	trackTrialInitiateCheckoutOnce,
	trackTrialLeadOnce,
	generateEventId,
} from '@/lib/metaPixel'
import { getClientAttribution } from '@/lib/attribution'
import { usePhoneInput } from '@/lib/usePhoneInput'
import PhoneField from '@/components/PhoneField/PhoneField'
import phoneStyles from '@/components/PhoneField/PhoneField.module.css'
import styles from './ContactForm.module.css'

const ContactForm = () => {
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
            if (!value.trim()) setNameError('Введіть ваше ім\'я')
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
            setNameError('Введіть ваше ім\'я')
            hasError = true
        }
        if (!phoneInput.validateOnSubmit()) {
            hasError = true
        }
        if (hasError) return

        setSubmitting(true)
        try {
            const eventId = generateEventId()
            const submitData = {
                name: formData.name.trim(),
                phone: phoneInput.getFullNumber(),
                message: formData.message,
                course: '',
                contactMethod: 'phone',
                preferredContactMethod: 'phone_call',
                eventId,
                sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://smartcode-academy.com',
                attribution: getClientAttribution(),
            }
            const response = await fetch('/api/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            })
            const data = await response.json().catch(() => ({}))
            if (!response.ok || !data?.ok) {
                console.error('Failed to send telegram message', data)
                alert('На жаль, сталася помилка при відправці. Спробуйте ще раз або напишіть нам у Telegram.')
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
            alert('Сталася помилка мережі. Перевірте підключення та спробуйте ще раз.')
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
        dropdownItem: phoneStyles.dropdownItem,
        dropdownItemActive: phoneStyles.dropdownItemActive,
        dropdownItemFlag: phoneStyles.dropdownItemFlag,
        dropdownItemCode: phoneStyles.dropdownItemCode,
        dropdownItemDial: phoneStyles.dropdownItemDial,
        error: styles.modalError,
    }

    return (
        <div className={styles.modalOverlay} ref={overlayRef} onClick={handleOverlayClick}>
            <div className={styles.modalShell} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalInner}>
                    <div className={styles.modalCard}>
                        <button type='button' className={styles.modalClose} onClick={() => setIsOpen(false)} aria-label='Закрити форму'>
                            <X size={20} />
                        </button>

                        {!isSubmitted ? (
                            <>
                                <div className={styles.modalCardHeader}>
                                    <div className={styles.modalIconCircle}>
                                        <Phone size={24} />
                                    </div>
                                    <h2 className={styles.modalTitle}>Запишіться на пробний урок</h2>
                                    <p className={styles.modalSubtitle}>
                                        Залиште контакт — ми зателефонуємо та підберемо зручний час
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className={styles.modalForm}>
                                    {/* Name */}
                                    <div className={`${styles.modalField} ${nameError ? styles.modalFieldError : ''}`}>
                                        <label className={styles.modalLabel} htmlFor='modal-name'>
                                            Ваше ім&apos;я
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
                                                placeholder="Ім'я дитини або батьків"
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
                                            Коментар <span className={styles.modalLabelOptional}>(за бажанням)</span>
                                        </label>
                                        <textarea
                                            id='modal-msg'
                                            name='message'
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={2}
                                            placeholder='Вік дитини, зручний час, питання…'
                                            className={styles.modalTextarea}
                                        />
                                    </div>

                                    <button type='submit' className={styles.modalSubmit} disabled={submitting}>
                                        <Send size={18} aria-hidden />
                                        {submitting ? 'Відправка…' : 'Надіслати заявку'}
                                    </button>

                                    <p className={styles.modalNote}>
                                        Перший урок — безкоштовно. Ми зателефонуємо протягом 15 хвилин.
                                    </p>
                                </form>
                            </>
                        ) : (
                            <div className={styles.modalSuccess}>
                                <div className={styles.modalSuccessIconWrap}>
                                    <CheckCircle size={32} className={styles.modalSuccessIcon} />
                                </div>
                                <h3 className={styles.modalSuccessTitle}>Дякуємо! 🎉</h3>
                                <p className={styles.modalSuccessText}>
                                    Наш менеджер зв&apos;яжеться з вами найближчим часом.
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
