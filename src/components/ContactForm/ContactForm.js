"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Phone, Send, CheckCircle, Briefcase, MessageSquare, X, Sparkles } from 'lucide-react'
import {
	trackTrialLessonModalView,
	trackTrialInitiateCheckoutOnce,
	trackTrialLeadOnce,
	trialInterestToContentIds,
	generateEventId,
} from '@/lib/metaPixel'
import styles from './ContactForm.module.css'

const ContactForm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [contactMethod, setContactMethod] = useState('phone')
    const [formData, setFormData] = useState({ phone: '', telegram: '', course: '', message: '' })
    const [phoneError, setPhoneError] = useState('')
    const [telegramError, setTelegramError] = useState('')
    const [touched, setTouched] = useState({ phone: false, telegram: false, course: false })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const overlayRef = useRef(null)
    const openedAtRef = useRef(0)
    const scrollPositionRef = useRef(0)

    const handleFormFocusCapture = (e) => {
        const t = e.target
        if (t instanceof HTMLInputElement || t instanceof HTMLSelectElement || t instanceof HTMLTextAreaElement) {
            trackTrialInitiateCheckoutOnce()
        }
    }

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
                trackTrialLessonModalView()
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
            const digits = value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 9)
            setFormData(prev => ({ ...prev, phone: digits }))
            if (digits.length === 0) setPhoneError('Введіть номер телефону')
            else if (digits.length !== 9) setPhoneError('Номер має містити 9 цифр')
            else setPhoneError('')
            return
        }
        if (name === 'telegram') {
            const cleanedValue = value.replace(/^@/, '').trim()
            setFormData(prev => ({ ...prev, telegram: cleanedValue }))
            if (cleanedValue.length === 0) setTelegramError('Введіть ваш телеграм')
            else setTelegramError('')
            return
        }
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (contactMethod === 'phone') {
            setTouched(prev => ({ ...prev, phone: true, course: true }))
            const isPhoneValid = /^\d{9}$/.test(formData.phone || '')
            const isCourseSelected = !!formData.course
            if (!isPhoneValid) {
                setPhoneError('Введіть коректний номер (9 цифр)')
                return
            }
            if (!isCourseSelected) {
                return
            }
        } else {
            setTouched(prev => ({ ...prev, telegram: true, course: true }))
            const isTelegramValid = formData.telegram && formData.telegram.trim().length > 0
            const isCourseSelected = !!formData.course
            if (!isTelegramValid) {
                setTelegramError('Введіть ваш телеграм')
                return
            }
            if (!isCourseSelected) {
                return
            }
        }
        try {
            const eventId = generateEventId()
            const submitData = {
                ...formData,
                contactMethod: contactMethod,
                eventId,
                sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://smartcode-academy.com',
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
                    contact_method: contactMethod,
                })
            }
            trackTrialLeadOnce(formData.course, trialInterestToContentIds(formData.course), eventId)
            setIsSubmitted(false)
            setFormData({ phone: '', telegram: '', course: '', message: '' })
            setPhoneError('')
            setTelegramError('')
            setContactMethod('phone')
            setTouched({ phone: false, telegram: false, course: false })
            setIsOpen(false)
        } catch (err) {
            console.error(err)
            alert('Сталася помилка мережі. Перевірте підключення та спробуйте ще раз.')
        }
    }

    if (!isOpen) return null

    const phoneInvalid = !!(phoneError || (touched.phone && !formData.phone))
    const telegramInvalid = !!(telegramError || (touched.telegram && !formData.telegram))
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

                                <form onSubmit={handleSubmit} className={styles.modalForm} onFocusCapture={handleFormFocusCapture}>
                                    <div className={styles.modalField}>
                                        <span className={styles.modalLabel}>Як з вами зв&apos;язатися?</span>
                                        <div className={styles.modalSegment} role='group' aria-label="Спосіб зв'язку">
                                            <button
                                                type='button'
                                                className={`${styles.modalSegmentBtn} ${contactMethod === 'phone' ? styles.modalSegmentBtnActive : ''}`}
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
                                                className={`${styles.modalSegmentBtn} ${contactMethod === 'telegram' ? styles.modalSegmentBtnActive : ''}`}
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
                                        <div className={`${styles.modalField} ${phoneInvalid ? styles.modalFieldError : ''}`}>
                                            <label className={styles.modalLabel} htmlFor='modal-phone'>
                                                Номер телефону
                                            </label>
                                            <div className={styles.modalPhoneRow}>
                                                <span className={styles.modalPrefix}>+380</span>
                                                <input
                                                    id='modal-phone'
                                                    type='tel'
                                                    name='phone'
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                                                    placeholder='__ ___ __ __'
                                                    className={styles.modalInput}
                                                    inputMode='numeric'
                                                    autoComplete='tel-national'
                                                    aria-invalid={phoneInvalid}
                                                />
                                            </div>
                                            {phoneError && <span className={styles.modalError}>{phoneError}</span>}
                                        </div>
                                    ) : (
                                        <div className={`${styles.modalField} ${telegramInvalid ? styles.modalFieldError : ''}`}>
                                            <p className={styles.modalHint}>
                                                Наш канал: <span className={styles.modalHintAccent}>@SmartCode_Academy</span>
                                            </p>
                                            <label className={styles.modalLabel} htmlFor='modal-tg'>
                                                Ваш username у Telegram
                                            </label>
                                            <input
                                                id='modal-tg'
                                                type='text'
                                                name='telegram'
                                                value={formData.telegram}
                                                onChange={handleInputChange}
                                                onBlur={() => setTouched(prev => ({ ...prev, telegram: true }))}
                                                placeholder='username'
                                                className={styles.modalInput}
                                                autoComplete='username'
                                                aria-invalid={telegramInvalid}
                                            />
                                            {telegramError && <span className={styles.modalError}>{telegramError}</span>}
                                        </div>
                                    )}

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

                                    <button type='submit' className={styles.modalSubmit}>
                                        <Send size={18} aria-hidden />
                                        Надіслати заявку
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
