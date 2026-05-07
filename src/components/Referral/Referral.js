'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    ChevronDown,
    Users,
    Gift,
    Sparkles,
    Heart,
    Send,
    Star,
    ArrowRight,
    Percent,
    BookOpen,
    X,
    Copy,
    Check,
    Link2,
} from 'lucide-react'
import styles from './Referral.module.css'

const SITE_URL = 'https://smartcode-academy.com'

const Referral = () => {
    const [openFaq, setOpenFaq] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [nickname, setNickname] = useState('')
    const [copied, setCopied] = useState(false)
    const [nicknameError, setNicknameError] = useState('')
    const modalRef = useRef(null)
    const inputRef = useRef(null)

    // Generate referral link from nickname
    const referralLink = nickname.trim()
        ? `${SITE_URL}/referral/${encodeURIComponent(nickname.trim())}`
        : ''

    const handleCtaClick = (e) => {
        e.preventDefault()
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('openContactModal'))
        }
    }

    const openModal = () => {
        setIsModalOpen(true)
        setCopied(false)
        setNicknameError('')
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setCopied(false)
        setNicknameError('')
    }

    // Focus input when modal opens
    useEffect(() => {
        if (isModalOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 150)
        }
    }, [isModalOpen])

    // Close modal on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeModal()
        }
        if (isModalOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = ''
        }
    }, [isModalOpen])

    const handleNicknameChange = (e) => {
        const val = e.target.value
        // Allow only letters, numbers, underscores, hyphens
        if (/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9_\- ]*$/.test(val)) {
            setNickname(val)
            setNicknameError('')
            setCopied(false)
        }
    }

    const handleCopy = async () => {
        if (!nickname.trim()) {
            setNicknameError('Введіть свій нікнейм')
            inputRef.current?.focus()
            return
        }

        try {
            await navigator.clipboard.writeText(referralLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 3000)
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement('textarea')
            textArea.value = referralLink
            textArea.style.position = 'fixed'
            textArea.style.left = '-9999px'
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setCopied(true)
            setTimeout(() => setCopied(false), 3000)
        }
    }

    const steps = [
        {
            number: '01',
            title: 'Скопіюйте ваше реферальне посилання',
            description:
                'Введіть свій нікнейм і скопіюйте унікальне посилання, яке згенерується спеціально для вас.',
        },
        {
            number: '02',
            title: 'Поділіться лінком з другом',
            description:
                'Відправте посилання другу — нехай він перейде за ним та запишеться на курс.',
        },
        {
            number: '03',
            title: 'Отримайте бонус',
            description:
                'Як тільки ваш друг почне навчання — ви обидва отримаєте знижку 500 грн!',
        },
    ]

    const benefits = [
        {
            icon: <Gift size={26} />,
            title: 'Знижка 500 грн для вас',
            description:
                'Отримайте знижку на будь-який наступний місяць навчання. Кількість рефералів не обмежена!',
        },
        {
            icon: <Percent size={26} />,
            title: 'Знижка 500 грн для друга',
            description:
                'Ваш друг також отримує бонус — знижку на перший місяць навчання в SmartCode Academy.',
        },
        {
            icon: <Users size={26} />,
            title: 'Без обмежень по кількості',
            description:
                'Запрошуйте скільки завгодно друзів — кожне запрошення приносить знижку обом!',
        },
        {
            icon: <Star size={26} />,
            title: 'Навчайтесь разом',
            description:
                'Навчання разом з друзями — веселіше та ефективніше. Мотивуйте одне одного!',
        },
    ]

    const faqs = [
        {
            question: 'Як запросити друга?',
            answer: 'Натисніть кнопку «Хочу запросити друга», введіть свій нікнейм, скопіюйте унікальне посилання та відправте його другу. Коли друг перейде за посиланням і запишеться — ви обидва отримаєте знижку.',
        },
        {
            question: 'Скільки друзів я можу запросити?',
            answer: 'Кількість друзів не обмежена! Чим більше друзів ви запросите, тим більше знижок отримаєте. Кожне успішне запрошення — це 500 грн знижки для вас.',
        },
        {
            question: 'Коли я отримаю знижку?',
            answer: 'Знижка нараховується автоматично після того, як ваш друг оплатить перший місяць навчання. Вона буде застосована до вашого наступного платежу.',
        },
        {
            question: 'Чи можна комбінувати знижки?',
            answer: 'Так! Реферальні знижки можна комбінувати. Якщо ви запросили 3 друзів, ви отримаєте 1500 грн знижки.',
        },
        {
            question: 'На які курси поширюється акція?',
            answer: 'Акція діє на всі курси SmartCode Academy: Python, веб-розробка, Unity, Roblox Studio та інші.',
        },
    ]

    return (
        <>
            {/* =========== Referral Modal =========== */}
            {isModalOpen && (
                <div
                    className={styles.modalOverlay}
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className={styles.modal}
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.modalClose}
                            onClick={closeModal}
                            aria-label="Закрити"
                        >
                            <X size={22} />
                        </button>

                        <h2 className={styles.modalTitle}>
                            Порекомендуйте SmartCode друзям
                        </h2>

                        {/* Step 1: Enter nickname */}
                        <div className={styles.modalStep}>
                            <div className={styles.modalStepNumber}>01</div>
                            <div className={styles.modalStepContent}>
                                <h3 className={styles.modalStepTitle}>
                                    Введіть свій нікнейм
                                </h3>
                                <div className={styles.nicknameInputGroup}>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className={`${styles.nicknameInput} ${nicknameError ? styles.nicknameInputError : ''}`}
                                        placeholder="Наприклад: ivan_python"
                                        value={nickname}
                                        onChange={handleNicknameChange}
                                        maxLength={30}
                                        autoComplete="off"
                                    />
                                    {nicknameError && (
                                        <span className={styles.nicknameErrorText}>
                                            {nicknameError}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Copy referral link */}
                        <div className={styles.modalStep}>
                            <div className={styles.modalStepNumber}>02</div>
                            <div className={styles.modalStepContent}>
                                <h3 className={styles.modalStepTitle}>
                                    Скопіюйте ваше реферальне посилання
                                </h3>
                                <div className={styles.referralLinkRow}>
                                    <div className={styles.referralLinkBox}>
                                        <Link2 size={16} className={styles.linkIcon} />
                                        <span className={styles.referralLinkText}>
                                            {nickname.trim()
                                                ? referralLink
                                                : 'Введіть нікнейм вище...'}
                                        </span>
                                    </div>
                                    <button
                                        className={`${styles.copyButton} ${copied ? styles.copyButtonCopied : ''}`}
                                        onClick={handleCopy}
                                        disabled={!nickname.trim()}
                                    >
                                        {copied ? (
                                            <>
                                                <Check size={16} />
                                                Скопійовано
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={16} />
                                                Скопіювати
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Share */}
                        <div className={styles.modalStep}>
                            <div className={styles.modalStepNumber}>03</div>
                            <div className={styles.modalStepContent}>
                                <h3 className={styles.modalStepTitle}>
                                    Поділіться цим лінком з другом
                                </h3>
                                <p className={styles.modalStepDescription}>
                                    Відправте посилання другу. Коли він перейде і запишеться на курс — ви обидва отримаєте знижку 500 грн!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* =========== Hero Section =========== */}
            <section className={styles.heroSection}>
                <div className={styles.heroBackground}>
                    <div className={styles.heroBg1} />
                    <div className={styles.heroBg2} />
                    <div className={styles.heroBg3} />
                </div>

                <div className={styles.heroContainer}>
                    <div className={styles.heroLeft}>
                        <div className={styles.breadcrumb}>
                            <Link href="/">Головна</Link>
                            <span className={styles.breadcrumbSep}>›</span>
                            <span>Запроси друга</span>
                        </div>

                        <h1 className={styles.heroTitle}>
                            Навчайтеся з друзями
                        </h1>

                        <p className={styles.heroSubtitle}>
                            Запросіть друга у SmartCode Academy та отримайте знижку на курс!
                        </p>

                        <div className={styles.heroActions}>
                            <button
                                className={styles.btnPrimary}
                                onClick={openModal}
                            >
                                <Send size={18} />
                                Хочу запросити друга
                            </button>
                            <button
                                className={styles.btnSecondary}
                                onClick={handleCtaClick}
                            >
                                <Heart size={18} />
                                Я друг
                            </button>
                        </div>
                    </div>

                    <div className={styles.heroRight}>
                        <div className={styles.photoCollage}>
                            <div className={`${styles.photoFrame} ${styles.photoFrame1}`}>
                                <Image
                                    src="/images/referral/kid1.png"
                                    alt="Щасливий учень SmartCode Academy"
                                    width={200}
                                    height={230}
                                    priority
                                />
                            </div>
                            <div className={`${styles.photoFrame} ${styles.photoFrame2}`}>
                                <Image
                                    src="/images/referral/kid2.png"
                                    alt="Учениця SmartCode Academy"
                                    width={180}
                                    height={210}
                                    priority
                                />
                            </div>
                            <div className={`${styles.photoFrame} ${styles.photoFrame3}`}>
                                <Image
                                    src="/images/referral/kid3.png"
                                    alt="Учень програмування"
                                    width={170}
                                    height={200}
                                    priority
                                />
                            </div>

                            {/* Decorative shapes */}
                            <div className={`${styles.decoShape} ${styles.decoTriangle}`} />
                            <div className={`${styles.decoShape} ${styles.decoCircle}`} />
                            <div className={`${styles.decoShape} ${styles.decoSquare}`} />
                        </div>
                    </div>
                </div>
            </section>

            {/* =========== Steps Section =========== */}
            <section className={styles.stepsSection}>
                <div className={styles.stepsContainer}>
                    <div className={styles.sectionBadge}>
                        <Sparkles size={16} />
                        Як це працює
                    </div>
                    <h2 className={styles.sectionTitle}>Три простих кроки</h2>
                    <p className={styles.sectionSubtitle}>
                        Запросити друга легко — усього три кроки до вашої знижки
                    </p>

                    <div className={styles.stepsGrid}>
                        {steps.map((step, index) => (
                            <div key={index} className={styles.stepCard}>
                                <div className={styles.stepNumber}>{step.number}</div>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDescription}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========== Benefits Section =========== */}
            <section className={styles.benefitsSection}>
                <div className={styles.benefitsContainer}>
                    <div className={styles.sectionBadge}>
                        <Gift size={16} />
                        Переваги
                    </div>
                    <h2 className={styles.sectionTitle}>Що ви отримуєте</h2>
                    <p className={styles.sectionSubtitle}>
                        Вигідно для вас та вашого друга — обидва отримують знижку
                    </p>

                    <div className={styles.benefitsGrid}>
                        {benefits.map((benefit, index) => (
                            <div key={index} className={styles.benefitCard}>
                                <div className={styles.benefitIcon}>{benefit.icon}</div>
                                <div className={styles.benefitContent}>
                                    <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                                    <p className={styles.benefitDescription}>
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========== FAQ Section =========== */}
            <section className={styles.faqSection}>
                <div className={styles.faqContainer}>
                    <div className={styles.sectionBadge}>
                        <BookOpen size={16} />
                        Часті питання
                    </div>
                    <h2 className={styles.sectionTitle}>Відповіді на ваші питання</h2>

                    <div className={styles.faqList}>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`${styles.faqItem} ${
                                    openFaq === index ? styles.faqItemOpen : ''
                                }`}
                            >
                                <button
                                    className={styles.faqQuestion}
                                    onClick={() =>
                                        setOpenFaq(openFaq === index ? null : index)
                                    }
                                    aria-expanded={openFaq === index}
                                >
                                    <span>{faq.question}</span>
                                    <span
                                        className={`${styles.faqChevron} ${
                                            openFaq === index ? styles.faqChevronOpen : ''
                                        }`}
                                    >
                                        <ChevronDown size={18} />
                                    </span>
                                </button>
                                <div
                                    className={`${styles.faqAnswer} ${
                                        openFaq === index ? styles.faqAnswerOpen : ''
                                    }`}
                                >
                                    <p className={styles.faqAnswerInner}>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========== CTA Section =========== */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaBackground}>
                    <div className={styles.ctaBg1} />
                    <div className={styles.ctaBg2} />
                </div>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>
                        Готові запросити друга?
                    </h2>
                    <p className={styles.ctaSubtitle}>
                        Створіть своє реферальне посилання та поділіться ним з другом — 
                        обидва отримаєте знижку 500 грн!
                    </p>
                    <button className={styles.ctaButton} onClick={openModal}>
                        Отримати моє посилання
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>
        </>
    )
}

export default Referral
