'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { logout, getUserProgress } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { isStudentDashboardReady } from '@/lib/studentAccountReady'
import { useDashboardCourses, DAY_KEY_MAP } from '@/hooks/useDashboardCourses'
import EnStudentDashboard from '@/components/Dashboard/EnStudentDashboard'
import MyCoursesSection from '@/components/Dashboard/MyCoursesSection'
import StudentPaymentPanel from '@/components/Dashboard/StudentPaymentPanel'
import PaymentReminderBanner from '@/components/Dashboard/PaymentReminderBanner'
import WeeklyScheduleCalendar from '@/components/Dashboard/WeeklyScheduleCalendar'
import styles from './Dashboard.module.css'
import {
  User,
  BookOpen,
  Clock,
  TrendingUp,
  LogOut,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Trophy,
  BarChart3,
  Users,
  DollarSign,
  Eye,
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

function StudentDashboard({ user, progressData, paymentStats, refreshData, t, locale, getCourseInfo, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [payPanelOpen, setPayPanelOpen] = useState(false)
  const dateLocale = locale === 'uk' ? 'uk-UA' : 'en-US'
  const profile = user?.studentProfile || { regularSchedule: [], activeOnlineCourses: [], lessonFormat: 'group', zoomLink: '' }
  const lessonPrice = profile.lessonFormat === 'individual' ? 500 : 350
  const schedule = profile.regularSchedule || []
  const activeCourses = profile.activeOnlineCourses || []
  const ownedCoursesCount = useMemo(() => {
    const ids = new Set()
    ;(user?.purchasedCourses || []).forEach((id) => ids.add(id))
    ;(profile.activeOnlineCourses || []).forEach((id) => ids.add(id))
    ;(user?.enrolledCourses || []).forEach((id) => ids.add(id))
    return ids.size
  }, [user, profile.activeOnlineCourses])
  const zoomLink = profile.zoomLink || ''
  const completedLessonsTotal = Object.values(progressData || {}).reduce((sum, p) => sum + (p?.completedLessons?.length || 0), 0)
  const lessonHistory = Object.entries(progressData || {}).flatMap(([courseId, progress]) =>
    (progress?.completedLessons || []).map((lessonId) => ({ courseId, lessonId }))
  )
  const scheduleInfo = useMemo(() => {
    const slots = (schedule || [])
      .map((item) => {
        const dayIndex = DAY_KEY_MAP[item?.day] !== undefined
          ? ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(DAY_KEY_MAP[item.day])
          : undefined
        const [hh, mm] = String(item?.time || '').split(':')
        const hours = Number(hh)
        const minutes = Number(mm)
        if (dayIndex === undefined || dayIndex < 0 || !Number.isFinite(hours) || !Number.isFinite(minutes)) return null
        return { dayIndex, hours, minutes }
      })
      .filter(Boolean)

    if (slots.length === 0) {
      return {
        weeklyTotal: 0,
        weeklyCompleted: 0,
        weeklyRemaining: 0,
        nextLessonText: t('student.schedule.noLessons'),
      }
    }

    const now = new Date()
    const currentDay = now.getDay()
    const endOfWeek = new Date(now)
    endOfWeek.setDate(now.getDate() + (7 - currentDay))
    endOfWeek.setHours(0, 0, 0, 0)
    const startOfWeek = new Date(endOfWeek)
    startOfWeek.setDate(endOfWeek.getDate() - 6)
    startOfWeek.setHours(0, 0, 0, 0)

    const upcomingThisWeek = []
    const upcomingAll = []
    const thisWeekAll = []

    slots.forEach((slot) => {
      const next = new Date(now)
      const diff = (slot.dayIndex - now.getDay() + 7) % 7
      next.setDate(now.getDate() + diff)
      next.setHours(slot.hours, slot.minutes, 0, 0)
      if (next <= now) next.setDate(next.getDate() + 7)
      upcomingAll.push(next)
      if (next < endOfWeek) {
        upcomingThisWeek.push(next)
      }

      const currentWeekSlot = new Date(startOfWeek)
      const weekDiff = (slot.dayIndex - startOfWeek.getDay() + 7) % 7
      currentWeekSlot.setDate(startOfWeek.getDate() + weekDiff)
      currentWeekSlot.setHours(slot.hours, slot.minutes, 0, 0)
      if (currentWeekSlot >= startOfWeek && currentWeekSlot < endOfWeek) {
        thisWeekAll.push(currentWeekSlot)
      }
    })

    const nextLesson = upcomingAll.sort((a, b) => a.getTime() - b.getTime())[0]
    const nextLessonText = nextLesson
      ? nextLesson.toLocaleString(dateLocale, { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
      : t('student.schedule.noLessons')

    return {
      weeklyTotal: thisWeekAll.length,
      weeklyCompleted: Math.max(0, thisWeekAll.length - upcomingThisWeek.length),
      weeklyRemaining: upcomingThisWeek.length,
      nextLessonText,
    }
  }, [schedule, dateLocale, t])

  const weeklyGoal = Math.max(1, scheduleInfo.weeklyTotal || 0)
  const weekProgress = Math.min(scheduleInfo.weeklyCompleted || 0, weeklyGoal)

  const motivationalText = scheduleInfo.weeklyRemaining > 0
    ? t('student.schedule.motivationRemaining', { count: scheduleInfo.weeklyRemaining, next: scheduleInfo.nextLessonText })
    : t('student.schedule.motivationDone', { next: scheduleInfo.nextLessonText })

  const formatLabel = profile.lessonFormat === 'individual'
    ? t('student.metrics.individual')
    : t('student.metrics.group')

  const lessonCredits = Number(paymentStats?.lessonCredits ?? user?.studentProfile?.lessonCredits ?? 0)
  const showPaymentReminder =
    schedule.length > 0 && (lessonCredits < 1 || (paymentStats?.pending || 0) > 0)

  const scrollToPayment = () => {
    setPayPanelOpen(true)
    requestAnimationFrame(() => {
      document.getElementById('payment-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const firstName = user.name?.split(/\s+/)[0] || user.name

  const paymentPanel = (
    <div id="payment-panel">
      <StudentPaymentPanel
        t={t}
        lessonPrice={lessonPrice}
        formatLabel={formatLabel}
        paymentStats={paymentStats}
        scheduleCount={schedule.length}
        onRefresh={refreshData}
        defaultOpen={payPanelOpen}
      />
    </div>
  )

  return (
    <div className={styles.dashBody}>
      <div className={styles.dashHeroGroup}>
        <div className={styles.heroCard}>
          <div>
            <div className={styles.heroLabel}><Sparkles size={16} /> {t('student.heroLabel')}</div>
            <h2 className={styles.heroTitle}>{t('student.greeting', { name: firstName })}</h2>
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
          amount={lessonPrice}
          currency={t('student.payments.currency')}
          deadlineText={scheduleInfo.nextLessonText}
          lessonCredits={lessonCredits}
          pendingCount={paymentStats?.pending || 0}
          onPayClick={scrollToPayment}
          t={t}
        />
      </div>

      <div className={styles.tabRowPill}>
        <button className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab('overview')}>{t('student.tabs.overview')}</button>
        <button className={`${styles.tabBtn} ${activeTab === 'history' ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab('history')}>{t('student.tabs.history')}</button>
      </div>

      <div className={styles.metricCards}>
        <div className={styles.metricCard}>
          <div className={styles.metricCardIcon}><BookOpen size={18} /></div>
          <div><strong>{ownedCoursesCount}</strong><span>{t('student.metrics.activeCourses')}</span></div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricCardIcon}><Trophy size={18} /></div>
          <div><strong>{completedLessonsTotal}</strong><span>{t('student.metrics.completedLessons')}</span></div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricCardIcon}><Users size={18} /></div>
          <div><strong>{formatLabel}</strong><span>{t('student.metrics.formatLabel')}</span></div>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className={styles.dashLayout}>
          <div className={styles.dashMain}>
            <MyCoursesSection
              user={user}
              progressData={progressData}
              getCourseInfo={getCourseInfo}
              locale={locale}
              onRequestAccess={scrollToPayment}
            />
          </div>
          <aside className={styles.dashAside}>
            <WeeklyScheduleCalendar
              schedule={schedule}
              zoomLink={zoomLink}
              t={t}
              dateLocale={dateLocale}
            />
          </aside>
        </div>
      ) : (
          <section className={styles.historyCard}>
            <div className={styles.sectionHeader}>
              <h3><Clock size={20} /> {t('student.history.title')}</h3>
            </div>
            {lessonHistory.length > 0 ? (
              <div className={styles.historyList}>
                {lessonHistory.slice(0, 30).map((entry, idx) => (
                  <div key={`${entry.lessonId}-${idx}`} className={styles.historyItem}>
                    <span>{getCourseInfo(entry.courseId).title}</span>
                    <span>{entry.lessonId}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyBlock}>
                <Clock size={36} strokeWidth={1.25} />
                <p>{t('student.history.empty')}</p>
              </div>
            )}
          </section>
      )}

      <div className={styles.payBottomFull}>{paymentPanel}</div>

      <div className={styles.toolbar}>
        <button className={styles.secondaryBtn} onClick={refreshData}><TrendingUp size={16} /> {t('student.refresh')}</button>
        <button className={styles.secondaryBtn} onClick={onLogout}><LogOut size={16} /> {t('logout')}</button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const locale = useLocale()
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
      if (user.enrolledCourses?.length > 0) {
        const progressResults = await Promise.all(
          user.enrolledCourses.map((courseId) =>
            getUserProgress(courseId).then((progress) => ({ courseId, progress })).catch(() => ({ courseId, progress: null }))
          )
        )
        const map = {}
        progressResults.forEach(({ courseId, progress }) => { map[courseId] = progress })
        setProgressData(map)
      } else {
        setProgressData({})
      }
      const paymentResponse = await fetch('/api/payment/history')
      if (paymentResponse.ok) {
        const data = await paymentResponse.json()
        setPaymentStats(data.stats || { completed: 0, pending: 0, failed: 0, totalAmount: 0, lessonCredits: 0, accountBalance: 0 })
      }
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

  const loading = sessionLoading || progressLoading
  const roleLabel = useMemo(
    () => (user?.role === 'admin' ? t('roles.admin') : t('roles.student')),
    [user?.role, t]
  )
  const accountPendingSetup =
    locale === 'uk' &&
    user?.role !== 'admin' &&
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
    } catch {}
  }

  if (loading) {
    return (
      <div className={locale === 'en' ? '' : styles.container}>
        <div className={locale === 'en' ? '' : styles.loading} style={locale === 'en' ? { minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' } : undefined}>
          {t('loading')}
        </div>
      </div>
    )
  }
  if (!user) return null

  if (locale === 'en' && user.role !== 'admin') {
    return (
      <EnStudentDashboard
        user={user}
        progressData={progressData}
        refreshData={refreshData}
        getCourseInfo={getCourseInfo}
        onLogout={handleLogout}
      />
    )
  }

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
          ? null
          : <StudentDashboard user={user} progressData={progressData} paymentStats={paymentStats} refreshData={refreshData} t={t} locale={locale} getCourseInfo={getCourseInfo} onLogout={handleLogout} />}
    </div>
  )
}
