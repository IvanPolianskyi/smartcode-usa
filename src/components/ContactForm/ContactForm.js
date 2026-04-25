"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Phone, Send, CheckCircle, Briefcase, MessageSquare, X, Sparkles } from 'lucide-react'
import {
	trackTrialInitiateCheckoutOnce,
	trackTrialLeadOnce,
	trialInterestToContentIds,
	generateEventId,
} from '@/lib/metaPixel'
import { getClientAttribution } from '@/lib/attribution'
import { isValidPhoneBasic, sanitizePhoneInput, getPhoneDigitCount } from '@/lib/phoneField'
import styles from './ContactForm.module.css'

const ContactForm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [preferredContactMethod, setPreferredContactMethod] = useState('phone_call')
    const [formData, setFormData] = useState({ phone: '', course: '', message: '' })
    const [phoneError, setPhoneError] = useState('')
    const [touched, setTouched] = useState({ phone: false, course: false })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const overlayRef = useRef(null)
    const openedAtRef = useRef(0)
    const scrollPositionRef = useRef(0)

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

    const courses = [
        'Roblox Studio',
        'Python',
        'JavaScript та веб-розробка',
        'Розробка ігор на Unity',
        'Не впевнений(а), потрібна консультація'
    ]

    const handleInputChange = e => {
        const { name, value } = e.target
        if (name === 'phone') {
            const next = sanitizePhoneInput(value)
            setFormData(prev => ({ ...prev, phone: next }))
            const n = getPhoneDigitCount(next)
            if (n === 0) setPhoneError('Введіть номер телефону')
            else if (!isValidPhoneBasic(next)) setPhoneError('Від 7 до 15 цифр (код країни разом з номером)')
            else setPhoneError('')
            return
        }
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (submitting) return
        setTouched(prev => ({ ...prev, phone: true, course: true }))
        const isCourseSelected = !!formData.course
        if (!isValidPhoneBasic(formData.phone)) {
            setPhoneError(
                getPhoneDigitCount(formData.phone) === 0
                    ? 'Введіть номер телефону'
                    : 'Від 7 до 15 цифр (код країни разом з номером)'
            )
            return
        }
        if (!isCourseSelected) {
            return
        }
        setSubmitting(true)
        try {
            const eventId = generateEventId()
            const submitData = {
                ...formData,
                contactMethod: 'phone',
                preferredContactMethod,
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
                    course: formData.course,
                    contact_method: preferredContactMethod,
                })
            }
            if (data?.trackLead) {
                trackTrialLeadOnce(formData.course, trialInterestToContentIds(formData.course), eventId)
            }
            setIsSubmitted(false)
            setFormData({ phone: '', course: '', message: '' })
            setPhoneError('')
            setPreferredContactMethod('phone_call')
            setTouched({ phone: false, course: false })
            setIsOpen(false)
        } catch (err) {
            console.error(err)
            alert('Сталася помилка мережі. Перевірте підключення та спробуйте ще раз.')
        } finally {
            setSubmitting(false)
        }
    }

    if (!isOpen) return null

    const phoneInvalid = !!(phoneError || (touched.phone && !isValidPhoneBasic(formData.phone)))
    const courseInvalid = !!(touched.course && !formData.course)

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
                                    <span className={styles.modalPill}>
                                        <Sparkles size={14} aria-hidden />
                                        Пробне заняття
                                    </span>
                                    <h2 className={styles.modalTitle}>Запишіться без зайвих кроків</h2>
                                    <p className={styles.modalSubtitle}>
                                        Оберіть зручний спосіб зв&apos;язку та напрямок - відповімо і підберемо час.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className={styles.modalForm}>
                                    <div className={styles.modalField}>
                                        <label className={styles.modalLabel} htmlFor='modal-phone'>
                                            Номер телефону
                                        </label>
                                        <input
                                            id='modal-phone'
                                            type='tel'
                                            name='phone'
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                                            placeholder='+380…, +48…, будь-який код країни'
                                            className={styles.modalInput}
                                            inputMode='tel'
                                            autoComplete='tel'
                                            aria-invalid={phoneInvalid}
                                        />
                                        {phoneError && <span className={styles.modalError}>{phoneError}</span>}
                                    </div>

                                    <div className={styles.modalField}>
                                        <span className={styles.modalLabel}>Як вам зручно отримати контакт?</span>
                                        <div className={styles.modalSegment} role='group' aria-label="Спосіб зв'язку">
                                            <button
                                                type='button'
                                                className={`${styles.modalSegmentBtn} ${preferredContactMethod === 'phone_call' ? styles.modalSegmentBtnActive : ''}`}
                                                onClick={() => setPreferredContactMethod('phone_call')}
                                            >
                                                <Phone size={16} aria-hidden />
                                                Подзвонити вам
                                            </button>
                                            <button
                                                type='button'
                                                className={`${styles.modalSegmentBtn} ${preferredContactMethod === 'telegram_phone' ? styles.modalSegmentBtnActive : ''}`}
                                                onClick={() => setPreferredContactMethod('telegram_phone')}
                                            >
                                                <MessageSquare size={16} aria-hidden />
                                                в Telegram за номером
                                            </button>
                                        </div>
                                    </div>

                                    <div className={`${styles.modalField} ${courseInvalid ? styles.modalFieldError : ''}`}>
                                        <label className={styles.modalLabel} htmlFor='modal-course'>
                                            <span className={styles.modalLabelInner}>
                                                <Briefcase size={15} className={styles.modalLabelIcon} aria-hidden />
                                                Напрямок навчання
                                            </span>
                                        </label>
                                        <select
                                            id='modal-course'
                                            name='course'
                                            value={formData.course}
                                            onChange={handleInputChange}
                                            onBlur={() => setTouched(prev => ({ ...prev, course: true }))}
                                            className={styles.modalSelect}
                                            aria-invalid={courseInvalid}
                                        >
                                            <option value=''>Оберіть напрямок</option>
                                            {courses.map((course, index) => (
                                                <option key={index} value={course}>{course}</option>
                                            ))}
                                        </select>
                                        {courseInvalid && <span className={styles.modalError}>Оберіть напрямок</span>}
                                    </div>

                                    <div className={`${styles.modalField} ${styles.modalFieldStretch}`}>
                                        <label className={styles.modalLabel} htmlFor='modal-msg'>
                                            <span className={styles.modalLabelInner}>
                                                <MessageSquare size={15} className={styles.modalLabelIcon} aria-hidden />
                                                Коментар (за бажанням)
                                            </span>
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
                                </form>
                            </>
                        ) : (
                            <div className={styles.modalSuccess}>
                                <div className={styles.modalSuccessIconWrap}>
                                    <CheckCircle size={28} className={styles.modalSuccessIcon} />
                                </div>
                                <h3 className={styles.modalSuccessTitle}>Дякуємо за заявку!</h3>
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
