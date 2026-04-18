"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Phone, Send, CheckCircle, Briefcase, MessageSquare, X } from 'lucide-react'
import {
	trackTrialLessonModalView,
	trackTrialLead,
	trialInterestToContentIds,
} from '@/lib/metaPixel'
import styles from './ContactForm.module.css'

const ContactForm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [contactMethod, setContactMethod] = useState('phone') // 'phone' or 'telegram'
    const [formData, setFormData] = useState({ phone: '', telegram: '', course: '', message: '' })
    const [phoneError, setPhoneError] = useState('')
    const [telegramError, setTelegramError] = useState('')
    const [touched, setTouched] = useState({ phone: false, telegram: false, course: false })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const dialogRef = useRef(null)
    const overlayRef = useRef(null)
    const openedAtRef = useRef(0)
    const scrollPositionRef = useRef(0)

    // Відкриття/закриття через глобальні події (запобігаємо дублюванню)
    useEffect(() => {
        let rafId = null
        const open = () => {
            openedAtRef.current = Date.now()
            if (rafId) cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => {
                setIsOpen(true)
                // Google Analytics: фіксуємо клік на кнопку пробного заняття
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

    // CSS-анімація обробляє появу, JS не потрібен

    // Scroll lock для body, коли модалка відкрита, та закриття по ESC
    useEffect(() => {
        if (!isOpen) return

        // Зберігаємо поточну позицію прокрутки перед блокуванням
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
        scrollPositionRef.current = scrollY
        
        // Використовуємо тільки overflow: hidden замість position: fixed
        // Це не викликає проблем з прокруткою при закритті
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        document.addEventListener('keydown', onKeyDown)

        return () => {
            // Просто видаляємо стилі - прокрутка залишається на тому ж місці
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
    ];

    const handleInputChange = e => {
        const { name, value } = e.target
        if (name === 'phone') {
            const digits = value.replace(/\D/g, '').slice(0, 9)
            setFormData(prev => ({ ...prev, phone: digits }))
            if (digits.length === 0) setPhoneError('Введіть номер телефону')
            else if (digits.length !== 9) setPhoneError('Номер має містити 9 цифр')
            else setPhoneError('')
            return
        }
        if (name === 'telegram') {
            // Remove @ if user types it, we'll add it later if needed
            const cleanedValue = value.replace(/^@/, '').trim()
            setFormData(prev => ({ ...prev, telegram: cleanedValue }))
            if (cleanedValue.length === 0) setTelegramError('Введіть ваш телеграм')
            else setTelegramError('')
            return
        }
        setFormData(prev => ({ ...prev, [name]: value }))
    };

    const handleContactMethodChange = e => {
        const method = e.target.value
        setContactMethod(method)
        // Reset errors when switching methods
        if (method === 'phone') {
            setTelegramError('')
        } else {
            setPhoneError('')
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // позначаємо поля як торкнуті, щоб показати стилі помилок
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
            const submitData = {
                ...formData,
                contactMethod: contactMethod
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
            // Успіх: закриваємо модальне вікно і скидаємо форму
            // Google Analytics: фіксуємо успішну відправку форми
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                window.gtag('event', 'submit_trial_form', {
                    course: formData.course,
                    contact_method: contactMethod,
                })
            }
            trackTrialLead(formData.course, trialInterestToContentIds(formData.course))
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

    return (
        <div className={styles.modalOverlay} ref={overlayRef} onClick={handleOverlayClick}>
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.backgroundElements}>
                    <div className={`${styles.floatingElement} ${styles.element1}`}></div>
                    <div className={`${styles.floatingElement} ${styles.element2}`}></div>
                    <div className={`${styles.floatingElement} ${styles.element3}`}></div>
                    <div className={`${styles.floatingElement} ${styles.element4}`}></div>
                </div>
                <div className={styles.container} ref={dialogRef}>
                    <div className={`${styles.contactCard} ${styles.compact}`}>
                        <button className={styles.modalClose} onClick={() => setIsOpen(false)} aria-label='Закрити форму'>
                            <X size={20} />
                        </button>
                    {/* Мінімалістична форма */}
                    <div className={styles.rightSection}>
                        <div className={styles.formContainer}>
                            {!isSubmitted ? (
                                <>
                                    <div className={styles.formHeader}>
                                        <h3 className={styles.formTitle}>Залишіть контактні дані — ми зв&apos;яжемося</h3>
                                    </div>
                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        <div className={styles.inputWrapper}>
                                            <MessageSquare className={styles.inputIcon} size={18} />
                                            <select 
                                                name='contactMethod' 
                                                value={contactMethod} 
                                                onChange={handleContactMethodChange}
                                                className={styles.select}
                                            >
                                                <option value='phone'>Зв&apos;язатися по номеру телефону</option>
                                                <option value='telegram'>Зв&apos;язатися по телеграму</option>
                                            </select>
                                        </div>
                                        
                                        {contactMethod === 'phone' ? (
                                            <div className={`${styles.inputWrapper} ${(phoneError || (touched.phone && !formData.phone)) ? styles.hasError : ''}`}>
                                                <Phone className={styles.inputIcon} size={18} />
                                                <span className={styles.countryCode}>+380</span>
                                                <input 
                                                    type='tel'
                                                    name='phone'
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                                                    placeholder='__ ___ __ __'
                                                    className={`${styles.input} ${styles.phoneInput}`}
                                                    inputMode='numeric'
                                                    required
                                                    aria-invalid={!!(phoneError || (touched.phone && !formData.phone))}
                                                />
                                                {phoneError && <div className={styles.errorText}>{phoneError}</div>}
                                            </div>
                                        ) : (
                                            <div>
                                                <div className={styles.telegramInfo}>
                                                    <p className={styles.telegramLabel}>Наш телеграм. Якщо пишете перші - залишати заявку необов&apos;язково</p>
                                                    <p className={styles.telegramUsername}>@SmartCode_Academy</p>
                                                </div>
                                                <div className={`${styles.inputWrapper} ${(telegramError || (touched.telegram && !formData.telegram)) ? styles.hasError : ''}`}>
                                                    <MessageSquare className={styles.inputIcon} size={18} />
                                                    <input 
                                                        type='text'
                                                        name='telegram'
                                                        value={formData.telegram}
                                                        onChange={handleInputChange}
                                                        onBlur={() => setTouched(prev => ({ ...prev, telegram: true }))}
                                                        placeholder='Ваш телеграм (наприклад: username)'
                                                        className={styles.input}
                                                        required
                                                        aria-invalid={!!(telegramError || (touched.telegram && !formData.telegram))}
                                                    />
                                                    {telegramError && <div className={styles.errorText}>{telegramError}</div>}
                                                </div>
                                            </div>
                                        )}
                                        <div className={`${styles.inputWrapper} ${(touched.course && !formData.course) ? styles.hasError : ''}`}>
                                            <Briefcase className={styles.inputIcon} size={18} />
                                            <select 
                                                name='course' 
                                                value={formData.course} 
                                                onChange={handleInputChange} 
                                                onBlur={() => setTouched(prev => ({ ...prev, course: true }))}
                                                className={styles.select} 
                                                required
                                                aria-invalid={!!(touched.course && !formData.course)}
                                            >
                                                <option value=''>Оберіть цікавий напрямок</option>
                                                {courses.map((course, index) => (
                                                    <option key={index} value={course}>{course}</option>
                                                ))}
                                            </select>
                                            {(touched.course && !formData.course) && (
                                                <div className={styles.errorText}>Оберіть напрямок</div>
                                            )}
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <MessageSquare className={`${styles.inputIcon} ${styles.textareaIcon}`} size={18} />
                                            <textarea name='message' value={formData.message} onChange={handleInputChange} placeholder="Ваше повідомлення... (необов'язково)" className={styles.textarea} rows={3}></textarea>
                                        </div>
                                        <button 
                                            type='submit' 
                                            className={styles.submitBtn} 
                                        >
                                            <Send size={20} />
                                            Записатися на пробне заняття
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className={styles.successMessage}>
                                    <div className={styles.successIconWrapper}>
                                        <CheckCircle className={styles.successIcon} />
                                    </div>
                                    <h3 className={styles.successTitle}>Дякуємо за заявку!</h3>
                                    <p className={styles.successText}>
                                        Наш менеджер вже готує для вас найкращу пропозицію і зв&apos;яжеться з вами найближчим часом.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm
