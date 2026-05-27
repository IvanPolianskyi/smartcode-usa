'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations, useLocale } from 'next-intl'
import {
	BookOpen,
	CreditCard,
	CheckCircle2,
	Loader2,
	UserPlus,
	LogIn,
	Shield,
	ArrowRight,
	PlayCircle,
	Infinity,
} from 'lucide-react'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { createPayment, checkCoursePurchase } from '@/lib/authClient'
import { formatPrice, getCoursePrice } from '@/lib/coursePrices'
import styles from './BuyCourse.module.css'

const COURSE_META = {
	'roblox-studio': {
		icon: '/logos/roblox.svg',
		theme: 'linear-gradient(135deg, #b91c1c, #dc2626)',
		bgClass: styles.bgRoblox,
	},
	'python-developer-zero-to-junior': {
		icon: '/python-logo.png',
		theme: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
		bgClass: styles.bgPython,
	},
}

export default function BuyCoursePage({ params }) {
	const { courseId } = React.use(params)
	const t = useTranslations('buyCourse')
	const locale = useLocale()
	const router = useRouter()
	const { user, loading: authLoading } = useAuthSession()

	const [guestName, setGuestName] = useState('')
	const [guestEmail, setGuestEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [isOwned, setIsOwned] = useState(false)

	const meta = COURSE_META[courseId] || {}
	const priceInfo = getCoursePrice(courseId, 'en')

	// Check if already purchased
	useEffect(() => {
		if (user && courseId) {
			checkCoursePurchase(courseId).then((purchased) => {
				setIsOwned(purchased)
			})
		}
	}, [user, courseId])

	const handleBuy = async () => {
		if (!user && (!guestName || !guestEmail)) {
			setError('Please enter your name and email to continue.')
			return
		}
		
		setError('')
		setLoading(true)
		try {
			const { paymentUrl } = await createPayment(courseId, locale, guestEmail, guestName)
			if (paymentUrl) window.location.href = paymentUrl
		} catch (err) {
			setError(err.message || t('errors.failed'))
		} finally {
			setLoading(false)
		}
	}

	if (!priceInfo) {
		return (
			<div className={styles.page}>
				<div className={styles.container}>
					<div className={styles.errorCard}>{t('errors.notFound')}</div>
				</div>
			</div>
		)
	}

	if (authLoading) {
		return (
			<div className={styles.page}>
				<div className={styles.loader}>
					<Loader2 size={32} className={styles.spin} />
				</div>
			</div>
		)
	}

	/* ── Logged in / Guest → buy card ── */
	return (
		<div className={`${styles.page} ${meta.bgClass || ''}`}>
			<div className={styles.container}>
				<div className={styles.card}>
					<div className={styles.hero} style={{ background: meta.theme }}>
						<div className={styles.heroContent}>
							{meta.icon ? (
								<img src={meta.icon} alt="" className={styles.heroIcon} />
							) : (
								<BookOpen size={48} color="#fff" />
							)}
						</div>
					</div>

					<div className={styles.body}>
						<h1 className={styles.title}>{t(`courses.${courseId}.title`)}</h1>
						<p className={styles.description}>{t(`courses.${courseId}.description`)}</p>

						<div className={styles.features}>
							<div className={styles.featureItem}>
								<PlayCircle size={18} className={styles.featureIcon} />
								<span>{t(`courses.${courseId}.lessons`)}</span>
							</div>
							<div className={styles.featureItem}>
								<Infinity size={18} className={styles.featureIcon} />
								<span>{t(`courses.${courseId}.access`)}</span>
							</div>
						</div>

						{isOwned ? (
							<div className={styles.ownedState}>
								<div className={styles.ownedAlert}>
									<CheckCircle2 size={20} className={styles.successIcon} />
									<span>{t('alreadyOwned')}</span>
								</div>
								<Link href={`/courses/${courseId}`} className={styles.btnPrimary}>
									{t('goToCourse')}
									<ArrowRight size={18} />
								</Link>
							</div>
						) : (
							<div className={styles.buyState}>
								<div className={styles.priceWrap}>
									<span className={styles.price}>
										{formatPrice(priceInfo.price, priceInfo.currency, 'en')}
									</span>
									<span className={styles.priceNote}>{t('oneTime')}</span>
								</div>

								{!user && (
									<div className={styles.fieldRow}>
										<div className={styles.field}>
											<label htmlFor="bc-name" className={styles.label}>
												Name
											</label>
											<input
												type="text"
												id="bc-name"
												className={styles.input}
												value={guestName}
												onChange={(e) => setGuestName(e.target.value)}
												required
												placeholder="Your Name"
											/>
										</div>
										<div className={styles.field}>
											<label htmlFor="bc-email" className={styles.label}>
												Email
											</label>
											<input
												type="email"
												id="bc-email"
												className={styles.input}
												value={guestEmail}
												onChange={(e) => setGuestEmail(e.target.value)}
												required
												placeholder="your@email.com"
											/>
										</div>
									</div>
								)}

								<button
									type="button"
									className={styles.submitBtn}
									disabled={loading}
									onClick={handleBuy}
								>
									{loading ? (
										<Loader2 size={20} className={styles.spin} />
									) : (
										<CreditCard size={20} />
									)}
									{loading
										? t('processing')
										: t('buyButton', { price: formatPrice(priceInfo.price, priceInfo.currency, 'en') })}
								</button>

								<p className={styles.payNote}>{t('payMethods')}</p>

								{locale === 'en' ? (
									<p className={styles.legalNote}>
										{t.rich('legalAgree', {
											oferta: (chunks) => (
												<Link href="/oferta">{chunks}</Link>
											),
											privacy: (chunks) => (
												<Link href="/privacy">{chunks}</Link>
											),
											refund: (chunks) => (
												<Link href="/refund">{chunks}</Link>
											),
										})}
									</p>
								) : null}

								{error && <p className={styles.errorText}>{error}</p>}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
