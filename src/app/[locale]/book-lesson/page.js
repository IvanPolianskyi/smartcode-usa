'use client'

import React, { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import {
	Video,
	CreditCard,
	Users,
	User,
	Loader2,
	UserPlus,
	LogIn,
	Shield,
	Globe,
	Clock,
	Calendar,
} from 'lucide-react'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { createEnLessonPayment } from '@/lib/authClient'
import { formatPrice, getLessonPrice } from '@/lib/coursePrices'
import styles from './BookLesson.module.css'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const TIMES = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

const COURSES = [
	{ id: 'roblox-studio', icon: '/logos/roblox.svg', theme: '#dc2626' },
	{ id: 'python-developer-zero-to-junior', icon: '/python-logo.png', theme: '#3b82f6' },
]

export default function BookLessonPage() {
	const t = useTranslations('bookLesson')
	const tCourses = useTranslations('dashboard.courses')
	const { user, loading: authLoading } = useAuthSession()

	const [courseId, setCourseId] = useState('roblox-studio')
	const [lessonFormat, setLessonFormat] = useState('group')
	const [day, setDay] = useState('mon')
	const [time, setTime] = useState('18:00')
	const [guestName, setGuestName] = useState('')
	const [guestEmail, setGuestEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const priceInfo = getLessonPrice(lessonFormat, 'en')

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			const { paymentUrl } = await createEnLessonPayment({
				courseId,
				lessonFormat,
				day,
				time,
				guestName,
				guestEmail,
			})
			if (paymentUrl) window.location.href = paymentUrl
		} catch (err) {
			setError(err.message || t('errors.failed'))
		} finally {
			setLoading(false)
		}
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

	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<div className={styles.card}>
					<div className={styles.header}>
						<div className={styles.headerIcon}>
							<Video size={28} />
						</div>
						<h1 className={styles.title}>{t('title')}</h1>
						<p className={styles.subtitle}>{t('subtitle')}</p>
					</div>

					<form onSubmit={handleSubmit} className={styles.form}>
						{!user && (
							<div className={styles.fieldRow}>
								<div className={styles.field}>
									<label htmlFor="bl-name" className={styles.label}>
										<User size={16} />
										Name
									</label>
									<input
										type="text"
										id="bl-name"
										className={styles.input}
										value={guestName}
										onChange={(e) => setGuestName(e.target.value)}
										required
										placeholder="Your Name"
									/>
								</div>
								<div className={styles.field}>
									<label htmlFor="bl-email" className={styles.label}>
										<User size={16} />
										Email
									</label>
									<input
										type="email"
										id="bl-email"
										className={styles.input}
										value={guestEmail}
										onChange={(e) => setGuestEmail(e.target.value)}
										required
										placeholder="your@email.com"
									/>
								</div>
							</div>
						)}

						{/* Course selector */}
						<div className={styles.field}>
							<label htmlFor="bl-course" className={styles.label}>
								<Globe size={16} />
								{t('courseLabel')}
							</label>
							<select
								id="bl-course"
								className={styles.select}
								value={courseId}
								onChange={(e) => setCourseId(e.target.value)}
							>
								{COURSES.map((c) => (
									<option key={c.id} value={c.id}>
										{tCourses(`${c.id}.title`)}
									</option>
								))}
							</select>
						</div>

						{/* Format toggle */}
						<div className={styles.field}>
							<label className={styles.label}>
								<Users size={16} />
								{t('formatLabel')}
							</label>
							<div className={styles.formatRow}>
								<button
									type="button"
									className={`${styles.formatOption} ${lessonFormat === 'group' ? styles.formatActive : ''}`}
									onClick={() => setLessonFormat('group')}
								>
									<Users size={20} />
									<strong>{t('group')}</strong>
									<span>{formatPrice(10, 'USD', 'en')} / {t('perLesson')}</span>
								</button>
								<button
									type="button"
									className={`${styles.formatOption} ${lessonFormat === 'individual' ? styles.formatActive : ''}`}
									onClick={() => setLessonFormat('individual')}
								>
									<User size={20} />
									<strong>{t('individual')}</strong>
									<span>{formatPrice(15, 'USD', 'en')} / {t('perLesson')}</span>
								</button>
							</div>
						</div>

						{/* Day + Time */}
						<div className={styles.fieldRow}>
							<div className={styles.field}>
								<label htmlFor="bl-day" className={styles.label}>
									<Calendar size={16} />
									{t('dayLabel')}
								</label>
								<select
									id="bl-day"
									className={styles.select}
									value={day}
									onChange={(e) => setDay(e.target.value)}
								>
									{DAYS.map((d) => (
										<option key={d} value={d}>
											{t(`days.${d}`)}
										</option>
									))}
								</select>
							</div>
							<div className={styles.field}>
								<label htmlFor="bl-time" className={styles.label}>
									<Clock size={16} />
									{t('timeLabel')}
								</label>
								<select
									id="bl-time"
									className={styles.select}
									value={time}
									onChange={(e) => setTime(e.target.value)}
								>
									{TIMES.map((slot) => (
										<option key={slot} value={slot}>
											{slot}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Pay note */}
						<p className={styles.payNote}>{t('payMethods')}</p>

						{/* Submit */}
						<button
							type="submit"
							className={styles.submitBtn}
							disabled={loading}
						>
							{loading ? (
								<Loader2 size={20} className={styles.spin} />
							) : (
								<CreditCard size={20} />
							)}
							{loading
								? t('processing')
								: t('payButton', { price: formatPrice(priceInfo.price, priceInfo.currency, 'en') })}
						</button>

						{error && <p className={styles.errorText}>{error}</p>}
					</form>
				</div>
			</div>
		</div>
	)
}
