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
	const [lessonFormat, setLessonFormat] = useState('individual')
	const [day, setDay] = useState('')
	const [time, setTime] = useState('')
	const [slots, setSlots] = useState([])
	const [slotsLoading, setSlotsLoading] = useState(true)

	const [guestName, setGuestName] = useState('')
	const [guestEmail, setGuestEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const priceInfo = getLessonPrice(lessonFormat, 'en')

	React.useEffect(() => {
		const fetchSlots = async () => {
			setSlotsLoading(true)
			try {
				const res = await fetch(`/api/lesson-slots?courseId=${courseId}&lessonFormat=${lessonFormat}`)
				if (res.ok) {
					const data = await res.json()
					setSlots(data.slots || [])
					if (data.slots && data.slots.length > 0) {
						setDay(data.slots[0].day)
						setTime(data.slots[0].time)
					} else {
						setDay('')
						setTime('')
					}
				}
			} catch (err) {
				console.error('Failed to fetch slots', err)
			} finally {
				setSlotsLoading(false)
			}
		}
		fetchSlots()
	}, [courseId, lessonFormat])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!day || !time) {
			setError(t('noSlots'))
			return
		}
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

	const availableDays = [...new Set(slots.map(s => s.day))]
	const availableTimes = slots.filter(s => s.day === day).map(s => s.time)

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
						{slotsLoading ? (
							<div className={styles.fieldRow}>
								<p className={styles.payNote}>{t('loading')}</p>
							</div>
						) : availableDays.length === 0 ? (
							<div className={styles.emptySlotsAlert}>
								{t('noSlots')}
							</div>
						) : (
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
										onChange={(e) => {
											setDay(e.target.value)
											const timesForNewDay = slots.filter(s => s.day === e.target.value).map(s => s.time)
											if (timesForNewDay.length > 0) setTime(timesForNewDay[0])
										}}
									>
										{availableDays.map((d) => (
											<option key={d} value={d}>
												{t(`days.${String(d).toLowerCase().substring(0,3)}`)}
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
										{availableTimes.map((slotTime) => (
											<option key={slotTime} value={slotTime}>
												{slotTime}
											</option>
										))}
									</select>
								</div>
							</div>
						)}

						<p className={styles.timezoneNote}>
							{t('timezoneNote')}
						</p>

						{/* Pay note */}
						<p className={styles.payNote}>{t('payMethods')}</p>

						{/* Submit */}
						<button
							type="submit"
							className={`${styles.submitBtn} ${loading ? styles.loadingBtn : ''}`}
							disabled={loading || availableDays.length === 0}
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
