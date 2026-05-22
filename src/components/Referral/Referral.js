'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
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

const BENEFIT_ICONS = [Gift, Percent, Users, Star]

const Referral = () => {
    const t = useTranslations('pages.referral')
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
            setNicknameError(t('nicknameRequired'))
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

    const steps = useMemo(() => {
        const items = t.raw('steps.items')
        return Object.keys(items).map((key) => items[key])
    }, [t])

    const benefits = useMemo(() => {
        const items = t.raw('benefits.items')
        return Object.keys(items).map((key, index) => {
            const Icon = BENEFIT_ICONS[index]
            return { ...items[key], icon: <Icon size={26} /> }
        })
    }, [t])

    const faqs = useMemo(() => {
        const items = t.raw('faq.items')
        return Object.keys(items).map((key) => items[key])
    }, [t])

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
                            aria-label={t('close')}
                        >
                            <X size={22} />
                        </button>

                        <h2 className={styles.modalTitle}>{t('modalTitle')}</h2>

                        {/* Step 1: Enter nickname */}
                        <div className={styles.modalStep}>
                            <div className={styles.modalStepNumber}>01</div>
                            <div className={styles.modalStepContent}>
                                <h3 className={styles.modalStepTitle}>
                                    {t('modalSteps.enterNickname.title')}
                                </h3>
                                <div className={styles.nicknameInputGroup}>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className={`${styles.nicknameInput} ${nicknameError ? styles.nicknameInputError : ''}`}
                                        placeholder={t('nicknamePlaceholder')}
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
                                    {t('modalSteps.copyLink.title')}
                                </h3>
                                <div className={styles.referralLinkRow}>
                                    <div className={styles.referralLinkBox}>
                                        <Link2 size={16} className={styles.linkIcon} />
                                        <span className={styles.referralLinkText}>
                                            {nickname.trim()
                                                ? referralLink
                                                : t('linkPlaceholder')}
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
                                                {t('copied')}
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={16} />
                                                {t('copy')}
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
                                    {t('modalSteps.share.title')}
                                </h3>
                                <p className={styles.modalStepDescription}>
                                    {t('modalSteps.share.description')}
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
                            <Link href="/">{t('breadcrumb.home')}</Link>
                            <span className={styles.breadcrumbSep}>›</span>
                            <span>{t('breadcrumb.current')}</span>
                        </div>

                        <h1 className={styles.heroTitle}>{t('hero.title')}</h1>

                        <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>

                        <div className={styles.heroActions}>
                            <button
                                className={styles.btnPrimary}
                                onClick={openModal}
                            >
                                <Send size={18} />
                                {t('hero.inviteFriend')}
                            </button>
                            <button
                                className={styles.btnSecondary}
                                onClick={handleCtaClick}
                            >
                                <Heart size={18} />
                                {t('hero.imFriend')}
                            </button>
                        </div>
                    </div>

                    <div className={styles.heroRight}>
                        <div className={styles.photoCollage}>
                            <div className={`${styles.photoFrame} ${styles.photoFrame1}`}>
                                <Image
                                    src="/images/referral/kid1.png"
                                    alt={t('hero.imageAlts.student1')}
                                    width={200}
                                    height={230}
                                    priority
                                />
                            </div>
                            <div className={`${styles.photoFrame} ${styles.photoFrame2}`}>
                                <Image
                                    src="/images/referral/kid2.png"
                                    alt={t('hero.imageAlts.student2')}
                                    width={180}
                                    height={210}
                                    priority
                                />
                            </div>
                            <div className={`${styles.photoFrame} ${styles.photoFrame3}`}>
                                <Image
                                    src="/images/referral/kid3.png"
                                    alt={t('hero.imageAlts.student3')}
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
                        {t('steps.badge')}
                    </div>
                    <h2 className={styles.sectionTitle}>{t('steps.title')}</h2>
                    <p className={styles.sectionSubtitle}>{t('steps.subtitle')}
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
                        {t('benefits.badge')}
                    </div>
                    <h2 className={styles.sectionTitle}>{t('benefits.title')}</h2>
                    <p className={styles.sectionSubtitle}>{t('benefits.subtitle')}
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
                        {t('faq.badge')}
                    </div>
                    <h2 className={styles.sectionTitle}>{t('faq.title')}</h2>

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
                        {t('cta.title')}
                    </h2>
                    <p className={styles.ctaSubtitle}>{t('cta.subtitle')}</p>
                    <button className={styles.ctaButton} onClick={openModal}>
                        {t('cta.button')}
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>
        </>
    )
}

export default Referral
