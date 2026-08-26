'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { Calendar, Play, Sparkles, Video, Youtube } from 'lucide-react'
import styles from './PremiumLiveLessons.module.css'

function formatLessonWhen(startsAt, endsAt) {
	const start = new Date(startsAt)
	const end = endsAt ? new Date(endsAt) : null
	if (Number.isNaN(start.getTime())) return { day: '-', time: '' }

	const day = start.toLocaleDateString(undefined, {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
	})
	const startTime = start.toLocaleTimeString(undefined, {
		hour: '2-digit',
		minute: '2-digit',
	})
	const endTime =
		end && !Number.isNaN(end.getTime())
			? end.toLocaleTimeString(undefined, {
					hour: '2-digit',
					minute: '2-digit',
				})
			: null

	return {
		day,
		time: endTime ? `${startTime} - ${endTime}` : startTime,
	}
}

function LessonRow({ lesson, mode }) {
	const { day, time } = formatLessonWhen(lesson.startsAt, lesson.endsAt)
	const isUpcoming = mode === 'upcoming'

	return (
		<li className={styles.lessonRow}>
			<div className={styles.lessonWhen}>
				<span className={styles.lessonDay}>{day}</span>
				<span className={styles.lessonTime}>{time}</span>
			</div>
			<div className={styles.lessonBody}>
				<span className={styles.lessonTitle}>{lesson.title}</span>
				<span className={styles.lessonMeta}>{lesson.courseLabel}</span>
			</div>
			<div className={styles.lessonAction}>
				{isUpcoming ? (
					<a
						href={lesson.joinUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.primaryBtn}
					>
						<Video size={15} aria-hidden />
						Join
					</a>
				) : lesson.youtubeUrl ? (
					<a
						href={lesson.youtubeUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.primaryBtn}
					>
						<Youtube size={15} aria-hidden />
						Watch recording
					</a>
				) : (
					<span className={styles.soonBadge}>Recording soon</span>
				)}
			</div>
		</li>
	)
}

export default function PremiumLiveLessons({ user }) {
	const [status, setStatus] = useState(null)
	const [calendar, setCalendar] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let cancelled = false

		async function load() {
			try {
				const statusRes = await fetch('/api/billing/status', { credentials: 'include' })
				const statusData = statusRes.ok ? await statusRes.json() : null
				if (cancelled) return
				setStatus(statusData)

				const programs = statusData?.programs || []
				const isPremium =
					user?.role === 'admin' ||
					programs.some((p) => p.active && p.planTier === 'premium')

				if (!isPremium) {
					if (!cancelled) setLoading(false)
					return
				}

				const lessonsRes = await fetch('/api/live-lessons', { credentials: 'include' })
				const lessonsData = lessonsRes.ok ? await lessonsRes.json() : null
				if (!cancelled) setCalendar(lessonsData)
			} catch {
				/* keep empty calendar */
			} finally {
				if (!cancelled) setLoading(false)
			}
		}

		load()
		return () => {
			cancelled = true
		}
	}, [user?.role])

	if (loading) return null

	const programs = status?.programs || []
	const hasActiveSub = status?.active || programs.some((p) => p.active)
	const isPremium =
		user?.role === 'admin' ||
		programs.some((p) => p.active && p.planTier === 'premium')

	if (isPremium) {
		const upcoming = calendar?.upcoming || []
		const past = calendar?.past || []

		return (
			<section
				className={`${styles.card} ${styles.premiumActive}`}
				aria-label="Premium live lessons"
			>
				<header className={styles.header}>
					<div className={styles.headerTitleWrap}>
						<div className={styles.iconWrap}>
							<Calendar size={20} aria-hidden />
						</div>
						<div>
							<h2 className={styles.title}>Live lesson calendar</h2>
						</div>
					</div>
					<span className={styles.badge}>
						<Sparkles size={13} aria-hidden /> Premium
					</span>
				</header>

				<p className={styles.lede}>
					Your Premium plan includes live teacher sessions. Join upcoming classes
					here - if you miss one, the recording stays available below.
				</p>

				<div className={styles.calendarBlock}>
					<h3 className={styles.sectionLabel}>
						<Play size={14} aria-hidden /> Upcoming
					</h3>
					{upcoming.length === 0 ? (
						<p className={styles.emptyState}>
							No upcoming sessions yet. Check back soon - your teacher adds them
							here.
						</p>
					) : (
						<ul className={styles.lessonList}>
							{upcoming.map((lesson) => (
								<LessonRow key={lesson.id} lesson={lesson} mode="upcoming" />
							))}
						</ul>
					)}
				</div>

				<div className={styles.calendarBlock}>
					<h3 className={styles.sectionLabel}>
						<Youtube size={14} aria-hidden /> Recordings
					</h3>
					{past.length === 0 ? (
						<p className={styles.emptyState}>
							Past lessons and YouTube recordings will show up here after each
							session.
						</p>
					) : (
						<ul className={styles.lessonList}>
							{past.map((lesson) => (
								<LessonRow key={lesson.id} lesson={lesson} mode="past" />
							))}
						</ul>
					)}
				</div>
			</section>
		)
	}

	if (hasActiveSub) {
		const firstCourseId = status?.courseIds?.[0] || 'roblox-studio'
		return (
			<section className={`${styles.card} ${styles.upgradeBanner}`} aria-label="Upgrade to premium">
				<div className={styles.upgradeWrap}>
					<div className={styles.upgradeCopy}>
						<h3 className={styles.upgradeTitle}>
							<Sparkles size={18} style={{ color: '#fc6e51' }} aria-hidden />
							Upgrade to Premium: 2 Live Lessons / Week
						</h3>
						<p className={styles.upgradeText}>
							Add live teacher sessions twice a week for just <strong>$20/mo</strong>{' '}
							(or $149/yr). Miss a class? The recording stays in your calendar.
						</p>
					</div>
					<Link
						href={`/plans/${firstCourseId}?tier=premium`}
						className={styles.upgradeCta}
					>
						Upgrade to Premium (+$6/mo)
					</Link>
				</div>
			</section>
		)
	}

	return null
}
