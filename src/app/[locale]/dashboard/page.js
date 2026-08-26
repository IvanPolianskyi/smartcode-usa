'use client'

import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, Link } from '@/i18n/navigation'
import { logout, getUserProgress } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { isStudentDashboardReady } from '@/lib/studentAccountReady'
import { useDashboardCourses, DASHBOARD_COURSE_IDS } from '@/hooks/useDashboardCourses'
import { getStudentAccessibleCourseIds, hasStudentCourseAccess } from '@/lib/courseLessonAccess'
import { useArcadeProgress } from '@/hooks/useArcadeProgress'
import MyCoursesSection from '@/components/Dashboard/MyCoursesSection'
import ProfileAccountSection from '@/components/Dashboard/ProfileAccountSection'
import PremiumLiveLessons from '@/components/Dashboard/PremiumLiveLessons'
import CodeCrushGame from '@/components/Dashboard/CodeCrushGame'
import LmsHeader from '@/components/Nav/LmsHeader'
import styles from './Dashboard.module.css'
import { BookOpen, Flame, LogOut, Play, Zap } from 'lucide-react'

const COURSE_PATHS = {
	'roblox-studio': '/courses/roblox-studio',
	'python-developer-zero-to-junior': '/courses/python-developer-zero-to-junior',
	'ai-at-work': '/courses/ai-at-work',
}

function PendingDashboard({ user, onLogout, t, getCourseInfo }) {
	const userId = String(user?._id || user?.id || '')
	const { progress: arcade, recordRound } = useArcadeProgress(userId)
	const displayName =
		String(user?.name || '').trim() ||
		String(user?.email || '').split('@')[0] ||
		'there'

	return (
		<div className={styles.dashBody}>
			<header className={styles.hero}>
				<div className={styles.heroCopy}>
					<h1 className={styles.pageTitle}>
						{t('student.greetingNamed', { name: displayName })}
					</h1>
					<p className={styles.pageLede}>{t('student.lede')}</p>
					<ProfileAccountSection user={user} variant="inline" />
				</div>
				<div className={styles.heroStats}>
					<button type="button" className={styles.refreshBtn} onClick={onLogout}>
						<LogOut size={15} aria-hidden /> {t('logout')}
					</button>
				</div>
			</header>

			<div className={styles.dashMain}>
				<PremiumLiveLessons user={user} />
				<Suspense
					fallback={
						<p className={styles.softLoading}>{t('student.courses.billingLoading')}</p>
					}
				>
					<MyCoursesSection
						user={user}
						progressData={{}}
						getCourseInfo={getCourseInfo}
					/>
				</Suspense>
				<CodeCrushGame bestScore={arcade.bestScore} onRoundEnd={recordRound} />
			</div>
		</div>
	)
}

function StudentDashboard({
	user,
	progressData,
	progressLoading,
	t,
	getCourseInfo,
}) {
	const userId = String(user?._id || user?.id || '')
	const {
		progress: arcade,
		recordRound,
		xpIntoLevel,
		xpNeed,
		xpRatio,
	} = useArcadeProgress(userId)

	const platformCompletedTotal = Object.values(progressData || {}).reduce(
		(sum, p) => sum + (p?.completedLessons?.length || 0),
		0
	)

	const displayName =
		String(user?.name || '').trim() ||
		String(user?.email || '').split('@')[0] ||
		'there'

	const continueTarget = useMemo(() => {
		const primary = String(user?.studentProfile?.primaryCourseId || '').trim()
		const owned = DASHBOARD_COURSE_IDS.filter((id) =>
			hasStudentCourseAccess(user, id)
		)
		const ordered = primary && owned.includes(primary)
			? [primary, ...owned.filter((id) => id !== primary)]
			: owned
		const courseId = ordered[0]
		if (!courseId) return null
		const course = getCourseInfo(courseId)
		const progress = progressData?.[courseId]?.overallProgress || 0
		return {
			courseId,
			title: course.title,
			progress: Math.round(progress),
			href: COURSE_PATHS[courseId] || course.link,
		}
	}, [user, progressData, getCourseInfo])

	const activeCourseCount = DASHBOARD_COURSE_IDS.filter((id) =>
		hasStudentCourseAccess(user, id)
	).length

	return (
		<div className={styles.dashBody}>
			{progressLoading ? (
				<p className={styles.softLoading} aria-live="polite">
					{t('loading')}
				</p>
			) : null}

			<header className={styles.hero}>
				<div className={styles.heroCopy}>
					<div className={styles.heroIntro}>
						<div className={styles.heroGreeting}>
							<h1 className={styles.pageTitle}>
								{t('student.greetingNamed', { name: displayName })}
							</h1>
							<p className={styles.pageLede}>{t('student.lede')}</p>
						</div>
					</div>
					<ProfileAccountSection user={user} variant="inline" />
				</div>

				<div className={styles.heroStats}>
					<div className={styles.xpCard}>
						<div className={styles.xpTop}>
							<span className={styles.xpLevel}>
								<Zap size={14} aria-hidden />
								{t('student.arcade.level', { level: arcade.level })}
							</span>
							<span className={styles.xpMeta}>
								{xpIntoLevel}/{xpNeed} XP
							</span>
						</div>
						<div className={styles.xpTrack} aria-hidden>
							<span style={{ width: `${Math.round(xpRatio * 100)}%` }} />
						</div>
						<div className={styles.xpFooter}>
							<span>
								<Flame size={13} aria-hidden />{' '}
								{t('student.arcade.streak', { count: arcade.streak })}
							</span>
							<span>{t('student.arcade.bestScore', { score: arcade.bestScore })}</span>
						</div>
					</div>

					<dl className={styles.statStrip}>
						<div className={styles.statItem}>
							<dt>{t('student.metrics.activeCourses')}</dt>
							<dd>{activeCourseCount}</dd>
						</div>
						<div className={styles.statItem}>
							<dt>{t('student.metrics.platformLessons')}</dt>
							<dd>{platformCompletedTotal}</dd>
						</div>
					</dl>

					{continueTarget ? (
						<Link href={continueTarget.href} className={styles.continueCta}>
							<span className={styles.continueIcon} aria-hidden>
								<Play size={16} />
							</span>
							<span className={styles.continueText}>
								<strong>{t('student.continueLearning')}</strong>
								<span>
									{continueTarget.title} · {continueTarget.progress}%
								</span>
							</span>
						</Link>
					) : (
						<Link href="/pricing" className={styles.continueCta}>
							<span className={styles.continueIcon} aria-hidden>
								<BookOpen size={16} />
							</span>
							<span className={styles.continueText}>
								<strong>{t('student.pickProgram')}</strong>
								<span>{t('student.pickProgramHint')}</span>
							</span>
						</Link>
					)}
				</div>
			</header>

			<div className={styles.dashMain}>
				<PremiumLiveLessons user={user} />
				<Suspense
					fallback={
						<p className={styles.softLoading}>{t('student.courses.billingLoading')}</p>
					}
				>
					<MyCoursesSection
						user={user}
						progressData={progressData}
						getCourseInfo={getCourseInfo}
					/>
				</Suspense>
				<CodeCrushGame
					bestScore={arcade.bestScore}
					onRoundEnd={recordRound}
				/>
			</div>
		</div>
	)
}

export default function DashboardPage() {
	const router = useRouter()
	const t = useTranslations('dashboard')
	const getCourseInfo = useDashboardCourses()
	const { user, loading: sessionLoading } = useAuthSession()
	const [progressData, setProgressData] = useState({})
	const [progressLoading, setProgressLoading] = useState(true)

	const loadData = useCallback(async () => {
		if (!user) return
		setProgressLoading(true)
		try {
			const accessibleCourseIds = getStudentAccessibleCourseIds(user)
			if (accessibleCourseIds.length === 0) {
				setProgressData({})
				return
			}
			const progressResults = await Promise.all(
				accessibleCourseIds.map((courseId) =>
					getUserProgress(courseId)
						.then((progress) => ({ courseId, progress }))
						.catch(() => ({ courseId, progress: null }))
				)
			)
			const map = {}
			progressResults.forEach(({ courseId, progress }) => {
				map[courseId] = progress
			})
			setProgressData(map)
		} finally {
			setProgressLoading(false)
		}
	}, [user])

	useEffect(() => {
		if (sessionLoading) return
		if (!user) {
			router.push('/login')
			return
		}
		loadData()
	}, [sessionLoading, user, router, loadData])

	const roleLabel = useMemo(() => {
		if (user?.role === 'admin') return t('roles.admin')
		if (user?.role === 'teacher') return t('roles.teacher')
		return t('roles.student')
	}, [user?.role, t])

	const accountPendingSetup =
		user?.role !== 'admin' &&
		user?.role !== 'teacher' &&
		!isStudentDashboardReady(user?.studentProfile)

	const handleLogout = async () => {
		try {
			await logout()
			window.dispatchEvent(new Event('auth:logout'))
			router.push('/')
			router.refresh()
		} catch {
			/* ignore */
		}
	}

	// Don't mount the LMS pill on an empty shell - it looks like a broken page.
	if (sessionLoading || !user) {
		return (
			<div className={styles.shell}>
				<div className={styles.loading}>{t('loading')}</div>
			</div>
		)
	}

	const isAdmin = user.role === 'admin'

	return (
		<div className={styles.shell}>
			<LmsHeader onLogout={handleLogout} />

			<main className={styles.container}>
				{isAdmin ? (
					<header className={styles.adminBar}>
						<div>
							<p className={styles.adminEyebrow}>{roleLabel}</p>
							<h1 className={styles.adminTitle}>{t('title')}</h1>
							<p className={styles.adminMeta}>
								{user.name} · {user.email}
							</p>
						</div>
					</header>
				) : null}

				{accountPendingSetup ? (
					<div className={styles.pendingNotice}>
						<strong>{t('pending.title')}</strong>
						<p>{t('pending.text')}</p>
					</div>
				) : null}

				{isAdmin ? (
					<div className={styles.dashBody}>
						<div className={styles.card}>
							<h3 className={styles.cardTitle}>
								<BookOpen size={18} aria-hidden /> {t('adminView.management.title')}
							</h3>
							<p className={styles.cardText}>{t('adminView.management.text')}</p>
							<Link href="/admin" className={styles.primaryLink}>
								{t('adminView.management.button')}
							</Link>
						</div>
					</div>
				) : accountPendingSetup ? (
					<PendingDashboard
						user={user}
						onLogout={handleLogout}
						t={t}
						getCourseInfo={getCourseInfo}
					/>
				) : (
					<StudentDashboard
						user={user}
						progressData={progressData}
						progressLoading={progressLoading}
						t={t}
						getCourseInfo={getCourseInfo}
					/>
				)}
			</main>
		</div>
	)
}
