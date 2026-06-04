'use client'

import React, { useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import {
  ChevronRight,
  BookOpen,
  Sparkles,
  Globe,
  Clock,
  GraduationCap,
} from 'lucide-react'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { formatPrice, getEnPurchasableFullCourses } from '@/lib/coursePrices'
import { getEnHomeCourseHref } from '@/lib/courseLessonAccess'
import styles from './HeroEnCta.module.css'

export default function HeroEnCta() {
  const t = useTranslations('home.heroEnCta')
  const { user } = useAuthSession()
  const courses = getEnPurchasableFullCourses()
  const courseHrefs = useMemo(
    () =>
      Object.fromEntries(
        courses.map((c) => [c.courseId, getEnHomeCourseHref(c.courseId, user)])
      ),
    [courses, user]
  )

  return (
    <div className={styles.card} id="hero-en-cta">
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.lead}>{t('lead')}</p>

      <div className={styles.benefits}>
        <div className={styles.benefitItem}>
          <BookOpen size={16} className={styles.benefitIcon} />
          <span>{t('benefitPlatform')}</span>
        </div>
        <div className={styles.benefitItem}>
          <Globe size={16} className={styles.benefitIcon} />
          <span>{t('benefitEnglish')}</span>
        </div>
        <div className={styles.benefitItem}>
          <Clock size={16} className={styles.benefitIcon} />
          <span>{t('benefitPace')}</span>
        </div>
        <div className={styles.benefitItem}>
          <GraduationCap size={16} className={styles.benefitIcon} />
          <span>{t('benefitCertificate')}</span>
        </div>
      </div>

      <div className={styles.offers}>
        {courses.map((course) => {
          return (
            <Link
              key={course.courseId}
              href={courseHrefs[course.courseId]}
              className={styles.offerRow}
            >
              <div className={styles.offerLeft}>
                <div className={styles.offerText}>
                  <strong>{t(`courses.${course.courseId}.name`)}</strong>
                  <span>{t(`courses.${course.courseId}.desc`)}</span>
                </div>
              </div>
              <div className={styles.offerRight}>
                <span className={styles.offerPrice}>
                  {formatPrice(course.price, course.currency, 'en')}
                </span>
                <span className={styles.offerChevron} aria-hidden>
                  <ChevronRight size={18} />
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      <Link href="/register" className={styles.primaryBtn}>
        <div className={styles.primaryBtnInner}>
          <Sparkles size={22} className={styles.primaryBtnIcon} />
          <div className={styles.primaryBtnText}>
            <strong>{t('primaryCtaTitle')}</strong>
            <span>{t('primaryCtaSub')}</span>
          </div>
        </div>
        <ChevronRight size={20} className={styles.primaryBtnChevron} />
      </Link>

      <p className={styles.hint}>{t('hint')}</p>
    </div>
  )
}
