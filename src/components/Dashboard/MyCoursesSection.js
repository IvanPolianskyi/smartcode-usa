'use client'

import React, { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { BookOpen, CreditCard, CheckCircle2, ChevronRight } from 'lucide-react'
import { createPayment } from '@/lib/authClient'
import { formatPrice, getEnPurchasableFullCourses } from '@/lib/coursePrices'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

const COURSE_PATHS = {
  'roblox-studio': '/courses/roblox-studio',
  'python-developer-zero-to-junior': '/courses/python-developer-zero-to-junior',
  'web-development': '/courses/web-development',
}

export default function MyCoursesSection({ user, progressData, getCourseInfo, locale }) {
  const t = useTranslations('dashboard.student.courses')
  const tStore = useTranslations('dashboard.enCourses')
  const [loadingId, setLoadingId] = useState(null)
  const [error, setError] = useState('')

  const purchasedSet = useMemo(
    () => new Set(user?.purchasedCourses || []),
    [user?.purchasedCourses]
  )

  const ownedCourseIds = useMemo(() => {
    const ids = new Set()
    ;(user?.purchasedCourses || []).forEach((id) => ids.add(id))
    ;(user?.studentProfile?.activeOnlineCourses || []).forEach((id) => ids.add(id))
    ;(user?.enrolledCourses || []).forEach((id) => ids.add(id))
    return [...ids]
  }, [user])

  const enStoreCourses = locale === 'en' ? getEnPurchasableFullCourses() : []
  const coursesToBuy = enStoreCourses.filter((c) => !purchasedSet.has(c.courseId))

  const handleBuy = async (courseId) => {
    setError('')
    setLoadingId(courseId)
    try {
      const { paymentUrl } = await createPayment(courseId, 'en')
      if (paymentUrl) window.location.href = paymentUrl
    } catch (err) {
      setError(err.message || tStore('errors.failed'))
    } finally {
      setLoadingId(null)
    }
  }

  const renderOwnedCourse = (courseId) => {
    const course = getCourseInfo(courseId)
    const progress = progressData?.[courseId]?.overallProgress || 0
    const owned = purchasedSet.has(courseId)
    const href = COURSE_PATHS[courseId] || course.link

    return (
      <Link key={courseId} href={href} className={styles.courseRow}>
        <div className={styles.courseBanner} style={{ background: course.bannerGradient }}>
          {course.bannerImage ? (
            <img src={course.bannerImage} alt={course.title} className={styles.courseBannerImage} />
          ) : (
            <div className={styles.courseBannerFallbackIcon}>{course.icon}</div>
          )}
          <div className={styles.courseBannerOverlay}>
            <span className={styles.coursePill}>
              {course.icon} {course.title}
            </span>
            <ChevronRight size={16} />
          </div>
        </div>
        <div className={styles.courseRowTop}>
          <span className={styles.courseMeta}>
            {owned ? t('purchased') : t('active')}
          </span>
          <span className={styles.courseMeta}>{t('goTo')}</span>
        </div>
        <div className={styles.goalBar}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.courseMeta}>{t('progress', { percent: progress })}</div>
      </Link>
    )
  }

  const renderBuyCard = (course) => {
    const info = getCourseInfo(course.courseId)
    const href = COURSE_PATHS[course.courseId] || `/courses/${course.courseId}`

    return (
      <div
        key={course.courseId}
        className={styles.courseRow}
        style={{ cursor: 'default', textDecoration: 'none' }}
      >
        <div className={styles.courseBanner} style={{ background: info.bannerGradient }}>
          {info.bannerImage ? (
            <img src={info.bannerImage} alt={info.title} className={styles.courseBannerImage} />
          ) : (
            <div className={styles.courseBannerFallbackIcon}>{info.icon}</div>
          )}
          <div className={styles.courseBannerOverlay}>
            <span className={styles.coursePill}>
              {info.icon} {info.title}
            </span>
          </div>
        </div>
        <p className={styles.cardText} style={{ margin: '0.5rem 0' }}>
          {tStore(`descriptions.${course.courseId}`)}
        </p>
        <div className={styles.courseRowTop}>
          <span className={styles.metric} style={{ fontSize: '1.1rem', margin: 0 }}>
            {formatPrice(course.price, course.currency, 'en')}
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button
            type="button"
            className={styles.primaryBtn}
            disabled={loadingId === course.courseId}
            onClick={() => handleBuy(course.courseId)}
          >
            <CreditCard size={16} />
            {loadingId === course.courseId ? tStore('processing') : tStore('buyButton')}
          </button>
          <Link href={href} className={styles.secondaryBtn}>
            {tStore('preview')}
          </Link>
        </div>
      </div>
    )
  }

  const hasOwned = ownedCourseIds.length > 0
  const hasStore = coursesToBuy.length > 0

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>
        <BookOpen size={18} /> {t('title')}
      </h3>

      {hasOwned && ownedCourseIds.map(renderOwnedCourse)}

      {locale === 'en' && hasStore && (
        <div style={{ marginTop: hasOwned ? '1.25rem' : 0 }}>
          {!hasOwned && <p className={styles.cardText}>{t('buyIntro')}</p>}
          {hasOwned && (
            <p className={styles.cardText} style={{ marginBottom: '0.75rem' }}>
              {t('buyMore')}
            </p>
          )}
          {coursesToBuy.map(renderBuyCard)}
          <p className={styles.receiptMessage} style={{ marginTop: '0.75rem' }}>
            {tStore('payMethods')}
          </p>
        </div>
      )}

      {!hasOwned && locale !== 'en' && (
        <p className={styles.cardText}>{t('empty')}</p>
      )}

      {!hasOwned && locale === 'en' && !hasStore && (
        <p className={styles.cardText}>{t('empty')}</p>
      )}

      {error && (
        <p className={styles.receiptMessage} style={{ color: '#ef4444', marginTop: '0.5rem' }}>
          {error}
        </p>
      )}
    </div>
  )
}
