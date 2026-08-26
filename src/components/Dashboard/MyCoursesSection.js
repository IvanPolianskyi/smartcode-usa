'use client'

import React, { useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { BookOpen, CheckCircle2, Play, Lock } from 'lucide-react'
import { DASHBOARD_COURSE_IDS } from '@/hooks/useDashboardCourses'
import { hasStudentCourseAccess } from '@/lib/courseLessonAccess'
import ProgressRing from './ProgressRing'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

const COURSE_PATHS = {
  'roblox-studio': '/courses/roblox-studio',
  'python-developer-zero-to-junior': '/courses/python-developer-zero-to-junior',
  'ai-at-work': '/courses/ai-at-work',
}

const LOCKED_HINT_KEYS = {
  'roblox-studio': 'lockedViaLessonsRoblox',
  'python-developer-zero-to-junior': 'lockedViaLessonsPython',
  'ai-at-work': 'lockedViaLessonsAi',
}

export default function MyCoursesSection({
  user,
  progressData,
  getCourseInfo,
}) {
  const t = useTranslations('dashboard.student.courses')
  const primaryCourseId = String(user?.studentProfile?.primaryCourseId || '').trim()

  const orderedCourseIds = useMemo(() => {
    const ids = [...DASHBOARD_COURSE_IDS]
    if (!primaryCourseId || !ids.includes(primaryCourseId)) return ids
    return [primaryCourseId, ...ids.filter((id) => id !== primaryCourseId)]
  }, [primaryCourseId])

  const renderCourseCard = (courseId) => {
    const owned = hasStudentCourseAccess(user, courseId)
    const course = getCourseInfo(courseId)
    const progress = owned ? progressData?.[courseId]?.overallProgress || 0 : 0
    const href = COURSE_PATHS[courseId] || course.link
    const lockedHintKey = LOCKED_HINT_KEYS[courseId]
    const isPrimary = primaryCourseId === courseId

    return (
      <article
        key={courseId}
        className={[
          styles.courseCard,
          owned ? null : styles.courseCardLocked,
          owned && isPrimary ? styles.courseCardPrimary : null,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          className={styles.courseThumb}
          style={{ '--course-accent': course.color, background: course.bannerGradient }}
        >
          {course.bannerImage ? (
            <img src={course.bannerImage} alt="" className={styles.courseThumbImg} />
          ) : (
            <div className={styles.courseThumbFallback}>{course.icon}</div>
          )}
        </div>

        <div className={styles.courseBody}>
          <div className={styles.courseMeta}>
            <div className={styles.courseTitleRow}>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              {owned ? (
                <span className={styles.statusActive}>
                  <CheckCircle2 size={12} aria-hidden />
                  {t('active')}
                </span>
              ) : (
                <span className={styles.statusLocked}>
                  <Lock size={12} aria-hidden />
                  {t('locked')}
                </span>
              )}
            </div>

            {owned ? (
              <>
                <div className={styles.progressRow}>
                  <div className={styles.progressTrack} aria-hidden>
                    <span style={{ width: `${progress}%` }} />
                  </div>
                  <span className={styles.progressLabel}>
                    {t('progress', { percent: Math.round(progress) })}
                  </span>
                </div>
              </>
            ) : (
              <p className={styles.courseDesc}>
                {lockedHintKey ? t(lockedHintKey) : t('lockedHint')}
              </p>
            )}
          </div>

          <div className={styles.courseAside}>
            {owned ? (
              <ProgressRing value={progress} size={48} stroke={4} />
            ) : (
              <ProgressRing value={0} size={48} stroke={4} muted />
            )}
            <Link
              href={href}
              className={owned ? styles.courseCta : styles.courseCtaGhost}
            >
              {owned ? (
                <>
                  <Play size={15} aria-hidden />
                  {isPrimary ? t('openTrack') : t('resume')}
                </>
              ) : (
                <>
                  <BookOpen size={15} aria-hidden />
                  {t('preview')}
                </>
              )}
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <section className={styles.coursesSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t('title')}</h2>
        <p className={styles.sectionHint}>{t('subtitle')}</p>
      </div>

      <div className={styles.courseList}>
        {orderedCourseIds.map(renderCourseCard)}
      </div>
    </section>
  )
}
