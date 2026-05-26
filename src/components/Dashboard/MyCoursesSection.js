'use client'

import React, { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { BookOpen, CheckCircle2, Play, Lock } from 'lucide-react'
import { createPayment } from '@/lib/authClient'
import { formatPrice, getCoursePrice, getEnPurchasableFullCourses } from '@/lib/coursePrices'
import { DASHBOARD_COURSE_IDS } from '@/hooks/useDashboardCourses'
import ProgressRing from './ProgressRing'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

const COURSE_PATHS = {
  'roblox-studio': '/courses/roblox-studio',
  'python-developer-zero-to-junior': '/courses/python-developer-zero-to-junior',
}

function isCourseOwned(user, courseId) {
  if ((user?.purchasedCourses || []).includes(courseId)) return true
  if ((user?.studentProfile?.activeOnlineCourses || []).includes(courseId)) return true
  return false
}

export default function MyCoursesSection({
  user,
  progressData,
  getCourseInfo,
  locale,
  onRequestAccess,
}) {
  const t = useTranslations('dashboard.student.courses')
  const tStore = useTranslations('dashboard.enCourses')
  const [loadingId, setLoadingId] = useState(null)
  const [error, setError] = useState('')

  const purchasedSet = useMemo(
    () => new Set(user?.purchasedCourses || []),
    [user?.purchasedCourses]
  )

  const enPurchasableIds = useMemo(
    () => new Set(getEnPurchasableFullCourses().map((c) => c.courseId)),
    []
  )

  const handleBuy = async (courseId) => {
    setError('')
    setLoadingId(courseId)
    try {
      const { paymentUrl } = await createPayment(courseId, locale)
      if (paymentUrl) window.location.href = paymentUrl
    } catch (err) {
      setError(err.message || tStore('errors.failed'))
    } finally {
      setLoadingId(null)
    }
  }

  const renderCourseCard = (courseId) => {
    const owned = isCourseOwned(user, courseId)
    const course = getCourseInfo(courseId)
    const progress = owned ? progressData?.[courseId]?.overallProgress || 0 : 0
    const href = COURSE_PATHS[courseId] || course.link
    const priceInfo = getCoursePrice(courseId, locale)
    const canBuyOnline =
      locale === 'en'
        ? enPurchasableIds.has(courseId)
        : Boolean(priceInfo?.price > 0 && priceInfo.purchasable !== false)

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
            <p className={styles.courseCardDesc}>{t('lockedHint')}</p>
            {canBuyOnline && priceInfo?.price > 0 ? (
              <p className={styles.courseCardPrice}>
                {formatPrice(priceInfo.price, priceInfo.currency, locale)}
              </p>
            ) : null}
            <div className={styles.courseCardActions}>
              <button
                type="button"
                className={styles.resumeBtn}
                disabled={canBuyOnline && loadingId === courseId}
                onClick={() =>
                  canBuyOnline ? handleBuy(courseId) : onRequestAccess?.()
                }
              >
                <Lock size={16} />
                {canBuyOnline && loadingId === courseId
                  ? tStore('processing')
                  : t('unlockCta')}
              </button>
            </div>
          </div>
        </article>
      )
    }

    return (
      <article key={courseId} className={styles.courseCard}>
        <div className={styles.courseCardHero} style={{ background: course.bannerGradient }}>
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
            {purchasedSet.has(courseId) ? t('purchased') : t('active')}
          </span>
          <div className={styles.progressBarAnimated}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <Link href={href} className={styles.resumeBtn}>
            <Play size={16} />
            {t('resume')}
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
        {DASHBOARD_COURSE_IDS.map(renderCourseCard)}
      </div>

      {error && <p className={styles.formError}>{error}</p>}
    </section>
  )
}
