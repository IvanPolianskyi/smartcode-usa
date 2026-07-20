'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { BookOpen, LogOut, CalendarClock } from 'lucide-react'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { logout } from '@/lib/authClient'
import styles from './TeacherDesk.module.css'

const COURSE_CARDS = [
  {
    id: 'roblox-studio',
    titleKey: 'courses.roblox',
    href: '/courses/roblox-studio',
  },
  {
    id: 'python-developer-zero-to-junior',
    titleKey: 'courses.python',
    href: '/courses/python-developer-zero-to-junior',
  },
  {
    id: 'web-development',
    titleKey: 'courses.web',
    href: '/courses/web-development',
  },
]

function formatNextLessonWhen(startAt) {
  if (!startAt) return ''
  try {
    return new Date(startAt).toLocaleString('uk-UA', {
      timeZone: 'Europe/Kyiv',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return String(startAt)
  }
}

export default function TeacherDesk() {
  const t = useTranslations('teacher')
  const router = useRouter()
  const { user, loading: sessionLoading, refresh } = useAuthSession()
  const [nextLesson, setNextLesson] = useState(null)
  const [nextLessonError, setNextLessonError] = useState('')
  const [loadingNextLesson, setLoadingNextLesson] = useState(false)
  const [batchStats, setBatchStats] = useState(null)
  const [batchCrmError, setBatchCrmError] = useState('')
  const [loadingBatch, setLoadingBatch] = useState(false)

  const linked = Boolean(user?.teacherProfile?.crmStaffId)

  useEffect(() => {
    if (sessionLoading) return
    if (!user) {
      router.push('/login')
      return
    }
    if (user.role !== 'teacher' && user.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [sessionLoading, user, router])

  const loadNextLesson = useCallback(async () => {
    if (!linked && user?.role !== 'admin') {
      setNextLesson(null)
      setNextLessonError('')
      return
    }
    setLoadingNextLesson(true)
    setNextLessonError('')
    try {
      const res = await fetch('/api/teacher/next-lesson', { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('recordings.crmError'))
      setNextLesson(data.nextLesson || null)
      if (data.crmError) setNextLessonError(data.crmError)
    } catch (e) {
      setNextLesson(null)
      setNextLessonError(e.message || t('recordings.crmError'))
    } finally {
      setLoadingNextLesson(false)
    }
  }, [linked, user?.role, t])

  const loadSalaryBatch = useCallback(async () => {
    if (!linked && user?.role !== 'admin') {
      setBatchStats(null)
      setBatchCrmError('')
      return
    }
    setLoadingBatch(true)
    setBatchCrmError('')
    try {
      const res = await fetch('/api/teacher/salary-batch', { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('recordings.crmError'))
      setBatchStats(data.totals || null)
      setBatchCrmError(data.crmError || '')
    } catch (e) {
      setBatchStats(null)
      setBatchCrmError(e.message || t('recordings.crmError'))
    } finally {
      setLoadingBatch(false)
    }
  }, [linked, user?.role, t])

  useEffect(() => {
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) return
    void loadNextLesson()
    void loadSalaryBatch()
  }, [user, loadNextLesson, loadSalaryBatch])

  const onLogout = async () => {
    await logout()
    await refresh()
    router.push('/login')
  }

  if (sessionLoading || !user) {
    return (
      <div className={styles.page}>
        <p className={styles.empty}>{t('loading')}</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.btn} onClick={onLogout}>
              <LogOut size={16} />
              {t('logout')}
            </button>
          </div>
        </header>

        {(linked || user.role === 'admin') && (
          <section className={styles.nextLesson} aria-label={t('nextLesson.title')}>
            <div className={styles.nextLessonHead}>
              <CalendarClock size={18} aria-hidden />
              <h2 className={styles.nextLessonTitle}>{t('nextLesson.title')}</h2>
            </div>
            {loadingNextLesson ? (
              <p className={styles.nextLessonEmpty}>{t('nextLesson.loading')}</p>
            ) : nextLessonError && !nextLesson ? (
              <p className={styles.warn}>{t('recordings.crmError')}</p>
            ) : !nextLesson ? (
              <p className={styles.nextLessonEmpty}>{t('nextLesson.empty')}</p>
            ) : (
              <div className={styles.nextLessonBody}>
                <div className={styles.nextLessonInfo}>
                  <p className={styles.nextLessonWhen}>
                    <span className={styles.nextLessonKind}>{nextLesson.kindLabel}</span>
                    {formatNextLessonWhen(nextLesson.startAt)}
                  </p>
                  <p className={styles.nextLessonStudent}>
                    {t('nextLesson.with')}{' '}
                    <strong>{nextLesson.studentName}</strong>
                    {nextLesson.studentCode ? (
                      <span className={styles.codeInline}> · {nextLesson.studentCode}</span>
                    ) : null}
                    {nextLesson.groupName ? (
                      <span className={styles.muted}> · {nextLesson.groupName}</span>
                    ) : null}
                  </p>
                  {nextLesson.lmsLessonTitle ? (
                    <p className={styles.nextLessonLms}>
                      <span className={styles.nextLessonLmsLabel}>{t('nextLesson.lmsLesson')}:</span>{' '}
                      {nextLesson.courseName ? `${nextLesson.courseName} — ` : ''}
                      {nextLesson.lmsLessonTitle}
                    </p>
                  ) : (
                    <p className={styles.nextLessonLms}>{t('nextLesson.noCourse')}</p>
                  )}
                </div>
                <div className={styles.nextLessonActions}>
                  {nextLesson.openHref ? (
                    <Link
                      href={nextLesson.openHref}
                      className={`${styles.btn} ${styles.btnPrimary}`}
                    >
                      <BookOpen size={16} />
                      {t('nextLesson.openLesson')}
                    </Link>
                  ) : null}
                  {nextLesson.courseHref ? (
                    <Link href={nextLesson.courseHref} className={styles.btn}>
                      {t('nextLesson.openCourse')}
                    </Link>
                  ) : null}
                </div>
              </div>
            )}
          </section>
        )}

        {(linked || user.role === 'admin') && (
          <section className={styles.recordingsSummary} aria-label={t('recordings.title')}>
            <div className={styles.recordingsHead}>
              <div className={styles.recordingsHeadText}>
                <h2 className={styles.recordingsTitle}>{t('recordings.title')}</h2>
              </div>
              <button
                type="button"
                className={styles.refreshBtn}
                onClick={() => loadSalaryBatch()}
                disabled={loadingBatch}
              >
                {t('recordings.refresh')}
              </button>
            </div>
            {batchCrmError ? (
              <p className={styles.warn}>{t('recordings.crmError')}</p>
            ) : null}
            {loadingBatch && !batchStats ? (
              <p className={styles.empty}>{t('loading')}</p>
            ) : null}
            {batchStats ? (
              <div className={styles.statsRow}>
                <div className={`${styles.statCard} ${styles.statCardAccent}`}>
                  <span className={styles.statLabel}>{t('recordings.batchIu')}</span>
                  <strong className={styles.statValue}>
                    {batchStats.individualCount ?? 0}
                  </strong>
                </div>
                <div className={`${styles.statCard} ${styles.statCardAccent}`}>
                  <span className={styles.statLabel}>{t('recordings.batchGu')}</span>
                  <strong className={styles.statValue}>
                    {batchStats.groupCount ?? 0}
                  </strong>
                </div>
                {batchStats.payoutUah != null ? (
                  <div className={styles.statCard}>
                    <span className={styles.statLabel}>{t('recordings.payoutAmount')}</span>
                    <strong className={styles.statValue}>
                      {Number(batchStats.payoutUah).toLocaleString('uk-UA')} ₴
                    </strong>
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        )}

        <section className={styles.panel} aria-label={t('courses.title')}>
          <h2 className={styles.recordingsTitle}>{t('courses.title')}</h2>
          <div className={styles.courseGrid}>
            {COURSE_CARDS.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                <h3>{t(course.titleKey)}</h3>
                <p className={styles.courseMeta}>{t('courses.fullAccess')}</p>
                <Link href={course.href} className={`${styles.btn} ${styles.btnPrimary}`}>
                  {t('courses.open')}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
