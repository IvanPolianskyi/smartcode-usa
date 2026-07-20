'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { logout, getUserProgress } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { isStudentDashboardReady } from '@/lib/studentAccountReady'
import { useDashboardCourses } from '@/hooks/useDashboardCourses'
import { computeScheduleStats } from '@/lib/studentScheduleStats'
import { getStudentAccessibleCourseIds } from '@/lib/courseLessonAccess'
import MyCoursesSection from '@/components/Dashboard/MyCoursesSection'
import StudentPaymentPanel from '@/components/Dashboard/StudentPaymentPanel'
import PaymentReminderBanner from '@/components/Dashboard/PaymentReminderBanner'
import WeeklyScheduleCalendar from '@/components/Dashboard/WeeklyScheduleCalendar'
import ProfileAccountSection from '@/components/Dashboard/ProfileAccountSection'
import styles from './Dashboard.module.css'
import {
  User,
  BookOpen,
  TrendingUp,
  LogOut,
  ShieldCheck,
  Sparkles,
  Trophy,
  BarChart3,
  Users,
  DollarSign,
  Eye,
  Video,
} from 'lucide-react'

function AdminDashboard({ adminStats, t }) {
  const topCourses = adminStats?.users?.courseEnrollments?.slice(0, 4) || []
  return (
    <div className={styles.gridTwo}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}><ShieldCheck size={18} /> {t('adminView.management.title')}</h3>
        <p className={styles.cardText}>{t('adminView.management.text')}</p>
        <Link href="/admin" className={styles.primaryBtn}>{t('adminView.management.button')}</Link>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}><BarChart3 size={18} /> {t('adminView.stats.title')}</h3>
        <div className={styles.listRow}><span><Eye size={14} /> {t('adminView.stats.visits')}</span><strong>{adminStats?.visits?.total || 0}</strong></div>
        <div className={styles.listRow}><span><Users size={14} /> {t('adminView.stats.users')}</span><strong>{adminStats?.users?.total || 0}</strong></div>
        <div className={styles.listRow}><span><DollarSign size={14} /> {t('adminView.stats.revenue')}</span><strong>{adminStats?.payments?.totalRevenue || 0} {t('adminView.stats.currency')}</strong></div>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}><BookOpen size={18} /> {t('adminView.topCourses.title')}</h3>
        {topCourses.length > 0 ? topCourses.map((course) => (
          <div key={course.courseId} className={styles.listRow}>
            <span>{course.courseName}</span>
            <strong>{course.enrolledCount}</strong>
          </div>
        )) : <p className={styles.cardText}>{t('adminView.topCourses.empty')}</p>}
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}><TrendingUp size={18} /> {t('adminView.activity.title')}</h3>
        <div className={styles.metric}>{adminStats?.visits?.last30Days || 0}</div>
        <p className={styles.cardText}>{t('adminView.activity.text')}</p>
      </div>
    </div>
  )
}

function StudentDashboard({ user, progressData, paymentStats, progressLoading, refreshData, t, getCourseInfo, onLogout }) {
  const [payPanelOpen, setPayPanelOpen] = useState(false)
  const dateLocale = 'uk-UA'
  const profile = user?.studentProfile || { regularSchedule: [], activeOnlineCourses: [], zoomLink: '' }
  const schedule = profile.regularSchedule || []
  const upcomingLessons = profile.upcomingLessons
  const zoomLink = profile.zoomLink || ''
  const platformCompletedTotal = Object.values(progressData || {}).reduce(
    (sum, p) => sum + (p?.completedLessons?.length || 0),
    0
  )
  const crmConductedTotal = Math.max(0, Number(profile.conductedLessonsCount) || 0)
  const fromUpcomingConducted = Array.isArray(upcomingLessons)
    ? upcomingLessons.filter((item) => item?.conducted === true).length
    : 0
  const onlineCompletedTotal = Math.max(crmConductedTotal, fromUpcomingConducted)
  const scheduleInfo = useMemo(
    () => computeScheduleStats(schedule, { t, dateLocale, upcomingLessons }),
    [schedule, upcomingLessons, dateLocale, t]
  )

  const weeklyGoal = Math.max(1, scheduleInfo.weeklyTotal || 0)
  const weekProgress = Math.min(scheduleInfo.weeklyCompleted || 0, weeklyGoal)

  const motivationalText = scheduleInfo.weeklyRemaining > 0
    ? t('student.schedule.motivationRemaining', { count: scheduleInfo.weeklyRemaining, next: scheduleInfo.nextLessonText })
    : t('student.schedule.motivationDone', { next: scheduleInfo.nextLessonText })

  const lessonCredits = Number(paymentStats?.lessonCredits ?? user?.studentProfile?.lessonCredits ?? 0)
  const hasPendingReceiptReview = Boolean(paymentStats?.hasPendingReceiptReview)
  // Як у CRM: should_request_payment = борг > 0 і немає pending-квитанції.
  const showPaymentReminder =
    paymentStats?.shouldRequestPayment != null
      ? Boolean(paymentStats.shouldRequestPayment)
      : schedule.length > 0 && lessonCredits < 1 && !hasPendingReceiptReview

  const scrollToPayment = () => {
    setPayPanelOpen(true)
    requestAnimationFrame(() => {
      document.getElementById('payment-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const paymentPanel = (
    <div id="payment-panel">
      <StudentPaymentPanel
        t={t}
        paymentStats={paymentStats}
        scheduleCount={schedule.length}
        onRefresh={refreshData}
        defaultOpen={payPanelOpen}
      />
    </div>
  )

  return (
    <div className={styles.dashBody}>
      {progressLoading ? (
        <p className={styles.softLoading} aria-live="polite">
          {t('loading')}
        </p>
      ) : null}
      <div className={styles.dashHeroGroup}>
        <div className={styles.heroCard}>
          <div>
            <div className={styles.heroLabel}><Sparkles size={16} /> {t('student.heroLabel')}</div>
            <h2 className={styles.heroTitle}>{t('student.greeting')}</h2>
            <p className={styles.heroText}>{motivationalText}</p>
          </div>
          <div className={styles.goalBox}>
            <div className={styles.goalTop}><Trophy size={16} /> {t('student.goalTitle')}</div>
            <div className={styles.goalProgress}>{weekProgress}/{weeklyGoal}</div>
            <div className={styles.goalBar}><span style={{ width: `${(weekProgress / weeklyGoal) * 100}%` }} /></div>
          </div>
        </div>

        <PaymentReminderBanner
          visible={showPaymentReminder}
          pendingReceiptReview={hasPendingReceiptReview}
          currency={t('student.payments.currency')}
          deadlineText={scheduleInfo.nextLessonText}
          lessonCredits={lessonCredits}
          pendingCount={paymentStats?.pending || 0}
          onPayClick={scrollToPayment}
          t={t}
        />
      </div>

      <div className={styles.metricCards}>
        <div className={styles.metricCard}>
          <div className={styles.metricCardIcon}><Trophy size={18} /></div>
          <div>
            <strong>{platformCompletedTotal}</strong>
            <span>{t('student.metrics.platformLessons')}</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricCardIcon}><Video size={18} /></div>
          <div>
            <strong>{onlineCompletedTotal}</strong>
            <span>{t('student.metrics.onlineLessons')}</span>
          </div>
        </div>
      </div>

      <div className={styles.dashLayout}>
        <div className={styles.dashMain}>
          <MyCoursesSection
            user={user}
            progressData={progressData}
            getCourseInfo={getCourseInfo}
          />
        </div>
        <aside className={styles.dashAside}>
          <WeeklyScheduleCalendar
            schedule={schedule}
            upcomingLessons={upcomingLessons}
            zoomLink={zoomLink}
            t={t}
            dateLocale={dateLocale}
          />
        </aside>
      </div>

      <div className={styles.payBottomFull}>{paymentPanel}</div>

      <ProfileAccountSection user={user} />

      <div className={styles.toolbar}>
        <button className={styles.secondaryBtn} onClick={refreshData}><TrendingUp size={16} /> {t('student.refresh')}</button>
        <button className={styles.secondaryBtn} onClick={onLogout}><LogOut size={16} /> {t('logout')}</button>
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
  const [paymentStats, setPaymentStats] = useState({ completed: 0, pending: 0, failed: 0, totalAmount: 0 })
  const [adminStats, setAdminStats] = useState(null)
  const [progressLoading, setProgressLoading] = useState(true)

  const loadData = useCallback(async () => {
    if (!user) return
    setProgressLoading(true)
    try {
      if (user.role === 'admin') {
        const adminStatsResponse = await fetch('/api/admin/statistics')
        if (adminStatsResponse.ok) {
          const stats = await adminStatsResponse.json()
          setAdminStats(stats)
        }
        return
      }

      const accessibleCourseIds = getStudentAccessibleCourseIds(user)
      const progressPromise =
        accessibleCourseIds.length > 0
          ? Promise.all(
              accessibleCourseIds.map((courseId) =>
                getUserProgress(courseId)
                  .then((progress) => ({ courseId, progress }))
                  .catch(() => ({ courseId, progress: null }))
              )
            ).then((progressResults) => {
              const map = {}
              progressResults.forEach(({ courseId, progress }) => {
                map[courseId] = progress
              })
              setProgressData(map)
            })
          : Promise.resolve().then(() => setProgressData({}))

      const paymentPromise = fetch('/api/payment/history')
        .then(async (paymentResponse) => {
          if (!paymentResponse.ok) return
          const data = await paymentResponse.json()
          setPaymentStats(
            data.stats || {
              completed: 0,
              pending: 0,
              failed: 0,
              totalAmount: 0,
              lessonCredits: 0,
              accountBalance: 0,
            }
          )
        })
        .catch(() => {})

      await Promise.all([progressPromise, paymentPromise])
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
    if (user.role === 'teacher') {
      router.replace('/teacher')
      return
    }
    loadData()
  }, [sessionLoading, user, router, loadData])

  // Фоновий sync розкладу з CRM після першого render (не блокує спінер).
  const studentUserId =
    user && user.role !== 'admin' && user.role !== 'teacher'
      ? user.id || user._id
      : null
  useEffect(() => {
    if (sessionLoading || !studentUserId) return
    let cancelled = false
    ;(async () => {
      try {
        await fetch('/api/student/crm-schedule-sync', {
          method: 'POST',
          credentials: 'include',
        })
      } catch {
        /* ignore */
      }
      // Підхопити кеш після sync / after() з auth/me (auth/me тепер швидкий).
      if (!cancelled) await refresh(false)
    })()
    return () => {
      cancelled = true
    }
  }, [sessionLoading, studentUserId, refresh])

  const loading = sessionLoading
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
    try {
      await fetch('/api/student/crm-schedule-sync', {
        method: 'POST',
        credentials: 'include',
      })
    } catch {
      /* ignore */
    }
    await refresh(false)
    await loadData()
  }

  const handleLogout = async () => {
    try {
      await logout()
      window.dispatchEvent(new Event('auth:logout'))
      router.push('/')
      router.refresh()
    } catch {}
  }

  if (loading || user?.role === 'teacher') {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          {t('loading')}
        </div>
      </div>
    )
  }
  if (!user) return null

  const isAdmin = user.role === 'admin'

  return (
    <div className={styles.container}>
      {isAdmin ? (
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar}><User size={28} /></div>
            <div>
              <h1 className={styles.title}>{t('title')}</h1>
              <p className={styles.subtitle}>{user.name} · {user.email} · {roleLabel}</p>
            </div>
          </div>
          <div className={styles.headerRight}>
            <Link href="/admin" className={styles.secondaryBtn}>{t('adminPanelLink')}</Link>
            <button className={styles.secondaryBtn} onClick={handleLogout}><LogOut size={16} /> {t('logout')}</button>
          </div>
        </header>
      ) : null}

      {accountPendingSetup ? (
        <div className={styles.pendingNotice}>
          <strong>{t('pending.title')}</strong>
          {t('pending.text')}
        </div>
      ) : null}
      {isAdmin
        ? <AdminDashboard adminStats={adminStats} t={t} />
        : accountPendingSetup
          ? (
              <>
                <ProfileAccountSection user={user} />
                <div className={styles.toolbar}>
                  <button className={styles.secondaryBtn} onClick={handleLogout}>
                    <LogOut size={16} /> {t('logout')}
                  </button>
                </div>
              </>
            )
          : (
              <StudentDashboard
                user={user}
                progressData={progressData}
                paymentStats={paymentStats}
                progressLoading={progressLoading}
                refreshData={refreshData}
                t={t}
                getCourseInfo={getCourseInfo}
                onLogout={handleLogout}
              />
            )}
    </div>
  )
}
