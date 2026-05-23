'use client'

import React, { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  LogOut,
  CalendarDays,
  Clock,
  Video,
  RefreshCw,
  BookOpen,
} from 'lucide-react'
import { DAY_KEY_MAP } from '@/hooks/useDashboardCourses'
import EnCourseStore from './EnCourseStore'
import EnLiveLessonBooking from './EnLiveLessonBooking'
import styles from './EnDashboard.module.css'

function formatScheduleDay(day, t) {
  const key = DAY_KEY_MAP[day]
  return key ? t(`days.${key}`) : day
}

function getInitials(name) {
  if (!name) return '?'
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function EnStudentDashboard({
  user,
  progressData,
  refreshData,
  getCourseInfo,
  onLogout,
}) {
  const t = useTranslations('dashboard')
  const [activeTab, setActiveTab] = useState('overview')

  const profile = user?.studentProfile || {}
  const schedule = profile.regularSchedule || []
  const zoomLink = profile.zoomLink || ''

  const completedTotal = Object.values(progressData || {}).reduce(
    (sum, p) => sum + (p?.completedLessons?.length || 0),
    0
  )

  const ownedCount = useMemo(() => {
    const ids = new Set()
    ;(user?.purchasedCourses || []).forEach((id) => ids.add(id))
    ;(profile.activeOnlineCourses || []).forEach((id) => ids.add(id))
    ;(user?.enrolledCourses || []).forEach((id) => ids.add(id))
    return ids.size
  }, [user, profile.activeOnlineCourses])

  const lessonHistory = Object.entries(progressData || {}).flatMap(([courseId, progress]) =>
    (progress?.completedLessons || []).map((lessonId) => ({ courseId, lessonId }))
  )

  const nextLessonText = useMemo(() => {
    if (schedule.length === 0) return t('enLayout.noUpcoming')
    const slot = schedule[0]
    return `${formatScheduleDay(slot.day, t)} · ${slot.time || '—'}`
  }, [schedule, t])

  return (
    <div className={styles.shell}>
      <div className={styles.inner}>
        <header className={styles.topBar}>
          <div className={styles.brand}>
            <div className={styles.avatar}>{getInitials(user.name)}</div>
            <div className={styles.userMeta}>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </div>
          </div>
          <div className={styles.topActions}>
            <button type="button" className={styles.btnGhost} onClick={refreshData}>
              <RefreshCw size={16} />
              {t('enLayout.refresh')}
            </button>
            <button type="button" className={styles.btnGhost} onClick={onLogout}>
              <LogOut size={16} />
              {t('logout')}
            </button>
          </div>
        </header>

        <div className={styles.welcome}>
          <div>
            <div className={styles.welcomeLabel}>{t('enLayout.welcomeLabel')}</div>
            <h2 className={styles.welcomeTitle}>
              {t('student.greeting', { name: user.name.split(' ')[0] })}
            </h2>
            <p className={styles.welcomeSub}>{t('enLayout.welcomeSub')}</p>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statChip}>
              <strong>{ownedCount}</strong>
              <span>{t('student.metrics.activeCourses')}</span>
            </div>
            <div className={styles.statChip}>
              <strong>{completedTotal}</strong>
              <span>{t('student.metrics.completedLessons')}</span>
            </div>
            <div className={styles.statChip}>
              <strong>{schedule.length}</strong>
              <span>{t('enLayout.scheduledSlots')}</span>
            </div>
          </div>
        </div>

        <nav className={styles.tabs} aria-label="Dashboard sections">
          <button
            type="button"
            className={`${styles.tab} ${activeTab === 'overview' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            {t('student.tabs.overview')}
          </button>
          <button
            type="button"
            className={`${styles.tab} ${activeTab === 'history' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('history')}
          >
            {t('student.tabs.history')}
          </button>
        </nav>

        {activeTab === 'overview' ? (
          <div className={styles.layout}>
            <div className={styles.mainCol}>
              <EnCourseStore
                user={user}
                progressData={progressData}
                getCourseInfo={getCourseInfo}
              />
              <EnLiveLessonBooking />
            </div>

            <aside className={styles.sideCol}>
              <section className={styles.section}>
                <div className={styles.sectionHead}>
                  <h2>
                    <CalendarDays size={20} />
                    {t('student.zoom.title')}
                  </h2>
                  <p>{t('enLayout.scheduleHint')}</p>
                </div>
                {schedule.length > 0 ? (
                  <ul className={styles.scheduleList}>
                    {schedule.map((item, i) => (
                      <li key={`${item.day}-${item.time}-${i}`} className={styles.scheduleItem}>
                        <span className={styles.scheduleDay}>
                          {formatScheduleDay(item.day, t)}
                        </span>
                        <span className={styles.scheduleTime}>
                          {item.time || t('student.schedule.timePending')}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={styles.emptyState}>
                    <CalendarDays size={32} />
                    <p>{t('student.zoom.empty')}</p>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      {t('enLayout.bookToSchedule')}
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  className={`${styles.btnPrimary} ${styles.btnBlock}`}
                  style={{ marginTop: '1rem' }}
                  disabled={!zoomLink}
                  onClick={() => zoomLink && window.open(zoomLink, '_blank', 'noopener,noreferrer')}
                >
                  <Video size={18} />
                  {zoomLink ? t('student.zoom.join') : t('student.zoom.waiting')}
                </button>
                <p className={styles.payNote} style={{ marginTop: '0.75rem' }}>
                  {t('enLayout.nextSlot')}: {nextLessonText}
                </p>
              </section>
            </aside>
          </div>
        ) : (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2>
                <Clock size={20} />
                {t('student.history.title')}
              </h2>
            </div>
            {lessonHistory.length > 0 ? (
              <div className={styles.historyList}>
                {lessonHistory.slice(0, 50).map((entry, idx) => (
                  <div key={`${entry.lessonId}-${idx}`} className={styles.historyItem}>
                    <span>{getCourseInfo(entry.courseId).title}</span>
                    <span>{entry.lessonId}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <BookOpen size={32} />
                <p>{t('student.history.empty')}</p>
                <Link href="/courses" className={styles.btnPrimary} style={{ marginTop: '1rem', display: 'inline-flex' }}>
                  {t('enLayout.browseCourses')}
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
