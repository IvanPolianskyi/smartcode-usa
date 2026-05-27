'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  BookOpen,
  Clock,
  TrendingUp,
  LogOut,
  Sparkles,
  Trophy,
  Users,
  Video,
} from 'lucide-react'
import { DAY_KEY_MAP } from '@/hooks/useDashboardCourses'
import { getStudentAccessibleCourseIds } from '@/lib/courseLessonAccess'
import EnCourseStore from './EnCourseStore'
import EnLiveLessonBooking from './EnLiveLessonBooking'
import WeeklyScheduleCalendar from './WeeklyScheduleCalendar'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

export default function EnStudentDashboard({
  user,
  progressData,
  refreshData,
  getCourseInfo,
  onLogout,
}) {
  const t = useTranslations('dashboard')
  const [activeTab, setActiveTab] = useState('overview')

  const dateLocale = 'en-US'
  const profile = user?.studentProfile || {}
  const fallbackSchedule = profile.regularSchedule || []
  const fallbackZoomLink = profile.zoomLink || ''

  const [bookedSlots, setBookedSlots] = useState([])

  useEffect(() => {
    fetch('/api/student/en-slots')
      .then(r => r.ok ? r.json() : { slots: [] })
      .then(data => {
        if (data.slots) {
          setBookedSlots(data.slots)
        }
      })
      .catch(err => console.error('Failed to load slots', err))
  }, [])

  // Override schedule with explicitly booked slots for EN version
  const schedule = bookedSlots.length > 0 
    ? bookedSlots.map(s => ({ day: String(s.day).toLowerCase().substring(0,3), time: s.time, zoomLink: s.zoomLink }))
    : fallbackSchedule
  
  const zoomLink = bookedSlots.length > 0 ? (bookedSlots.find(s => s.zoomLink)?.zoomLink || fallbackZoomLink) : fallbackZoomLink

  const ownedCount = useMemo(
    () => getStudentAccessibleCourseIds(user).length,
    [user, profile.activeOnlineCourses, user?.purchasedCourses]
  )

  const completedTotal = Object.values(progressData || {}).reduce(
    (sum, p) => sum + (p?.completedLessons?.length || 0),
    0
  )

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

  const firstName = user.name?.split(/\s+/)[0] || user.name

  return (
    <div className={styles.dashBody}>
      <div className={styles.dashHeroGroup}>
        <div className={styles.heroCard}>
          <div>
            <div className={styles.heroLabel}><Sparkles size={16} /> {t('student.heroLabel')}</div>
            <h2 className={styles.heroTitle}>{t('student.greeting', { name: firstName })}</h2>
            <p className={styles.heroText}>{motivationalText}</p>
          </div>
          <div className={styles.goalBox} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className={styles.goalTop}><Trophy size={16} /> {t('student.goalTitle')}</div>
            <div className={styles.goalProgress}>{weekProgress}/{weeklyGoal}</div>
            <div className={styles.goalBar}><span style={{ width: `${(weekProgress / weeklyGoal) * 100}%` }} /></div>
            
            <Link href="/book-lesson" className={styles.secondaryBtn} style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
              <Video size={16} />
              Book a Lesson
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.tabRowPill}>
        <button className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab('overview')}>{t('student.tabs.overview')}</button>
        <button className={`${styles.tabBtn} ${activeTab === 'history' ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab('history')}>{t('student.tabs.history')}</button>
      </div>

      <div className={styles.metricCards}>
        <div className={styles.metricCard}>
          <div className={styles.metricCardIcon}><BookOpen size={18} /></div>
          <div><strong>{ownedCount}</strong><span>{t('student.metrics.activeCourses')}</span></div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricCardIcon}><Trophy size={18} /></div>
          <div><strong>{completedTotal}</strong><span>{t('student.metrics.completedLessons')}</span></div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricCardIcon}><Users size={18} /></div>
          <div><strong>{formatLabel}</strong><span>{t('student.metrics.formatLabel')}</span></div>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className={styles.dashLayout}>
          <div className={styles.dashMain}>
            <EnCourseStore user={user} progressData={progressData} getCourseInfo={getCourseInfo} />
            <EnLiveLessonBooking />
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

      <div className={styles.toolbar}>
        <button className={styles.secondaryBtn} onClick={refreshData}><TrendingUp size={16} /> {t('student.refresh')}</button>
        <button className={styles.secondaryBtn} onClick={onLogout}><LogOut size={16} /> {t('logout')}</button>
      </div>
    </div>
  )
}

