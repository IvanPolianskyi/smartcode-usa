'use client'

import React, { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { BookOpen, CreditCard, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'
import { createPayment } from '@/lib/authClient'
import { formatPrice, getEnPurchasableFullCourses } from '@/lib/coursePrices'
import styles from './EnDashboard.module.css'

const COURSE_PATHS = {
  'roblox-studio': '/courses/roblox-studio',
  'python-developer-zero-to-junior': '/courses/python-developer-zero-to-junior',
}

const COURSE_THEMES = {
  'roblox-studio': 'linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #991b1b 100%)',
  'python-developer-zero-to-junior': 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #1e40af 100%)',
}

export default function EnCourseStore({ user, progressData, getCourseInfo }) {
  const t = useTranslations('dashboard.student.courses')
  const tStore = useTranslations('dashboard.enCourses')
  const [loadingId, setLoadingId] = useState(null)
  const [error, setError] = useState('')

  const purchasedSet = useMemo(
    () => new Set(user?.purchasedCourses || []),
    [user?.purchasedCourses]
  )

  const ownedIds = useMemo(() => {
    const ids = new Set()
    ;(user?.purchasedCourses || []).forEach((id) => ids.add(id))
    ;(user?.studentProfile?.activeOnlineCourses || []).forEach((id) => ids.add(id))
    ;(user?.enrolledCourses || []).forEach((id) => ids.add(id))
    return [...ids]
  }, [user])

  const storeCourses = getEnPurchasableFullCourses()
  const toBuy = storeCourses.filter((c) => !purchasedSet.has(c.courseId))

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

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2>
          <BookOpen size={20} />
          {t('title')}
        </h2>
        <p>{ownedIds.length > 0 ? t('buyMore') : t('buyIntro')}</p>
      </div>

      <div className={styles.courseGrid}>
        {ownedIds.map((courseId) => {
          const info = getCourseInfo(courseId)
          const progress = progressData?.[courseId]?.overallProgress || 0
          const href = COURSE_PATHS[courseId] || info.link
          const theme = COURSE_THEMES[courseId] || info.bannerGradient

          return (
            <Link key={courseId} href={href} className={`${styles.courseCard} ${styles.courseCardOwned}`}>
              <div className={styles.courseHero} style={{ background: theme }}>
                {info.bannerImage && (
                  <img src={info.bannerImage} alt="" />
                )}
              </div>
              <div className={styles.courseBody}>
                <h3 className={styles.courseTitle}>{info.title}</h3>
                <span className={styles.badgeOwned}>
                  <CheckCircle2 size={12} />
                  {purchasedSet.has(courseId) ? tStore('owned') : t('active')}
                </span>
                <div className={styles.progressMini}>
                  <span style={{ width: `${progress}%` }} />
                </div>
                <p className={styles.courseDesc} style={{ marginTop: '0.5rem' }}>
                  {t('progress', { percent: progress })}
                </p>
                <div className={styles.courseActions}>
                  <span className={styles.btnPrimary}>
                    {t('goTo')} <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}

        {toBuy.map((course) => {
          const info = getCourseInfo(course.courseId)
          const href = COURSE_PATHS[course.courseId]
          const theme = COURSE_THEMES[course.courseId] || info.bannerGradient
          const loading = loadingId === course.courseId

          return (
            <article key={course.courseId} className={styles.courseCard}>
              <div className={styles.courseHero} style={{ background: theme }}>
                {info.bannerImage && <img src={info.bannerImage} alt="" />}
              </div>
              <div className={styles.courseBody}>
                <h3 className={styles.courseTitle}>{info.title}</h3>
                <p className={styles.courseDesc}>
                  {tStore(`descriptions.${course.courseId}`)}
                </p>
                <div className={styles.courseMeta}>
                  <span className={styles.priceTag}>
                    {formatPrice(course.price, course.currency, 'en')}
                  </span>
                  <span className={styles.priceNote}>{tStore('oneTime')}</span>
                </div>
                <div className={styles.courseActions}>
                  <button
                    type="button"
                    className={styles.btnPrimary}
                    disabled={loading}
                    onClick={() => handleBuy(course.courseId)}
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <CreditCard size={16} />
                    )}
                    {loading ? tStore('processing') : tStore('buyButton')}
                  </button>
                  <Link href={href} className={styles.btnOutline}>
                    {tStore('preview')}
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <p className={styles.payNote}>{tStore('payMethods')}</p>
      {error && <p className={styles.errorText}>{error}</p>}
    </section>
  )
}
