'use client'

import React, { useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { BookOpen, CheckCircle2, Play, Lock, Sparkles } from 'lucide-react'
import { DASHBOARD_COURSE_IDS } from '@/hooks/useDashboardCourses'
import { hasStudentCourseAccess } from '@/lib/courseLessonAccess'
import ProgressRing from './ProgressRing'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

const COURSE_PATHS = {
  'roblox-studio': '/courses/roblox-studio',
  'python-developer-zero-to-junior': '/courses/python-developer-zero-to-junior',
  'web-development': '/webDev',
}

const LOCKED_HINT_KEYS = {
  'roblox-studio': 'lockedViaLessonsRoblox',
  'python-developer-zero-to-junior': 'lockedViaLessonsPython',
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

    if (!owned) {
      return (
        <article key={courseId} className={`${styles.courseCard} ${styles.courseCardLocked}`}>
          <div className={styles.courseCardHero} style={{ background: course.bannerGradient }}>
            <span className={styles.courseCardLockBadge}>
              <Lock size={12} />
              {t('locked')}
            </span>
            {course.bannerImage ? (
              <img src={course.bannerImage} alt="" className={styles.courseCardImg} />
            ) : (
              <div className={styles.courseCardIconFallback}>{course.icon}</div>
            )}
          </div>
          <div className={styles.courseCardBody}>
            <div className={styles.courseCardTop}>
              <h4>{course.title}</h4>
              <ProgressRing value={0} size={56} stroke={5} muted />
            </div>
            <p className={styles.courseCardDesc}>
              {lockedHintKey ? t(lockedHintKey) : t('lockedHint')}
            </p>
            <div className={styles.courseCardActions}>
              <Link href={href} className={styles.resumeBtn}>
                <BookOpen size={16} />
                {t('preview')}
              </Link>
            </div>
          </div>
        </article>
      )
    }

    return (
      <article
        key={courseId}
        className={`${styles.courseCard}${isPrimary ? ` ${styles.courseCardPrimary}` : ''}`}
      >
        <div className={styles.courseCardHero} style={{ background: course.bannerGradient }}>
          {isPrimary ? (
            <span className={styles.courseCardPrimaryBadge}>
              <Sparkles size={12} />
              {t('yourTrack')}
            </span>
          ) : null}
          {course.bannerImage ? (
            <img src={course.bannerImage} alt="" className={styles.courseCardImg} />
          ) : (
            <div className={styles.courseCardIconFallback}>{course.icon}</div>
          )}
        </div>
        <div className={styles.courseCardBody}>
          <div className={styles.courseCardTop}>
            <h4>{course.title}</h4>
            <ProgressRing value={progress} size={56} stroke={5} />
          </div>
          <span className={styles.courseCardBadge}>
            <CheckCircle2 size={12} />
            {t('active')}
          </span>
          <div className={styles.progressBarAnimated}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <Link href={href} className={styles.resumeBtn}>
            <Play size={16} />
            {isPrimary ? t('openTrack') : t('resume')}
          </Link>
        </div>
      </article>
    )
  }

  return (
    <section className={styles.coursesSection}>
      <div className={styles.sectionHeader}>
        <h3>
          <BookOpen size={20} />
          {t('title')}
        </h3>
        <p className={styles.sectionHint}>{t('subtitle')}</p>
      </div>

      <div className={styles.courseGrid}>
        {orderedCourseIds.map(renderCourseCard)}
      </div>
    </section>
  )
}
