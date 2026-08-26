'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { logout, getUserProgress } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { isStudentDashboardReady } from '@/lib/studentAccountReady'
import { useDashboardCourses } from '@/hooks/useDashboardCourses'
import { getStudentAccessibleCourseIds } from '@/lib/courseLessonAccess'
import MyCoursesSection from '@/components/Dashboard/MyCoursesSection'
import ProfileAccountSection from '@/components/Dashboard/ProfileAccountSection'
import SubscriptionPanel from '@/components/Dashboard/SubscriptionPanel'
import LmsHeader from '@/components/Nav/LmsHeader'
import styles from './Dashboard.module.css'
import { BookOpen, LogOut, RefreshCw } from 'lucide-react'

function StudentDashboard({
  user,
  progressData,
  progressLoading,
  refreshData,
  t,
  getCourseInfo,
}) {
  const profile = user?.studentProfile || {}
  const upcomingLessons = profile.upcomingLessons
  const platformCompletedTotal = Object.values(progressData || {}).reduce(
    (sum, p) => sum + (p?.completedLessons?.length || 0),
    0
  )
  const crmConductedTotal = Math.max(0, Number(profile.conductedLessonsCount) || 0)
  const fromUpcomingConducted = Array.isArray(upcomingLessons)
    ? upcomingLessons.filter((item) => item?.conducted === true).length
    : 0
  const onlineCompletedTotal = Math.max(crmConductedTotal, fromUpcomingConducted)
  const displayName =
    String(user?.name || '').trim() ||
    String(user?.email || '').split('@')[0] ||
    'there'

  return (
    <div className={styles.dashBody}>
      {progressLoading ? (
        <p className={styles.softLoading} aria-live="polite">
          {t('loading')}
        </p>
      ) : null}

      <header className={styles.pageHead}>
        <div className={styles.pageHeadCopy}>
          <p className={styles.pageEyebrow}>{t('student.heroLabel')}</p>
          <h1 className={styles.pageTitle}>
            {t('student.greetingNamed', { name: displayName })}
          </h1>
          <p className={styles.pageLede}>{t('student.lede')}</p>
        </div>
        <dl className={styles.statStrip}>
          <div className={styles.statItem}>
            <dt>{t('student.metrics.platformLessons')}</dt>
            <dd>{platformCompletedTotal}</dd>
          </div>
          <div className={styles.statItem}>
            <dt>{t('student.metrics.onlineLessons')}</dt>
            <dd>{onlineCompletedTotal}</dd>
          </div>
        </dl>
      </header>

      <div className={styles.dashLayout}>
        <div className={styles.dashMain}>
          <MyCoursesSection
            user={user}
            progressData={progressData}
            getCourseInfo={getCourseInfo}
          />
        </div>
        <aside className={styles.dashAside}>
          <SubscriptionPanel />
          <ProfileAccountSection user={user} />
          <button type="button" className={styles.refreshBtn} onClick={refreshData}>
            <RefreshCw size={15} aria-hidden />
            {t('student.refresh')}
          </button>
        </aside>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const t = useTranslations('dashboard')
  const getCourseInfo = useDashboardCourses()
  const { user, loading: sessionLoading, refresh } = useAuthSession()
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

  const refreshData = async () => {
    await refresh(false)
    await loadData()
  }

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

  if (sessionLoading) {
    return (
      <div className={styles.shell}>
        <LmsHeader />
        <div className={styles.loading}>{t('loading')}</div>
      </div>
    )
  }
  if (!user) return null

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
            </div>
          </div>
        ) : accountPendingSetup ? (
          <div className={styles.dashBody}>
            <div className={styles.dashLayout}>
              <div className={styles.dashMain}>
                <SubscriptionPanel />
              </div>
              <aside className={styles.dashAside}>
                <ProfileAccountSection user={user} />
                <button type="button" className={styles.refreshBtn} onClick={handleLogout}>
                  <LogOut size={15} aria-hidden /> {t('logout')}
                </button>
              </aside>
            </div>
          </div>
        ) : (
          <StudentDashboard
            user={user}
            progressData={progressData}
            progressLoading={progressLoading}
            refreshData={refreshData}
            t={t}
            getCourseInfo={getCourseInfo}
          />
        )}
      </main>
    </div>
  )
}
