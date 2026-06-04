'use client'

import React, { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  BookOpen,
  Clock,
  TrendingUp,
  LogOut,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { getStudentAccessibleCourseIds } from '@/lib/courseLessonAccess'
import EnCourseStore from './EnCourseStore'
import ProfileAccountSection from './ProfileAccountSection'
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

  const ownedCount = useMemo(
    () => getStudentAccessibleCourseIds(user).length,
    [user]
  )

  const completedTotal = Object.values(progressData || {}).reduce(
    (sum, p) => sum + (p?.completedLessons?.length || 0),
    0
  )

  const lessonHistory = Object.entries(progressData || {}).flatMap(([courseId, progress]) =>
    (progress?.completedLessons || []).map((lessonId) => ({ courseId, lessonId }))
  )

  const firstName = user.name?.split(/\s+/)[0] || user.name

  return (
    <div className={styles.dashBody}>
      <div className={styles.dashHeroGroup}>
        <div className={styles.heroCard}>
          <div>
            <div className={styles.heroLabel}>
              <Sparkles size={16} /> {t('enLayout.welcomeLabel')}
            </div>
            <h2 className={styles.heroTitle}>{t('student.greeting', { name: firstName })}</h2>
            <p className={styles.heroText}>{t('enLayout.welcomeSub')}</p>
          </div>
          <div className={styles.goalBox}>
            <div className={styles.goalTop}>
              <Trophy size={16} /> {t('student.goalTitle')}
            </div>
            <div className={styles.goalProgress}>
              {completedTotal} {t('student.metrics.completedLessons').toLowerCase()}
            </div>
            <Link href="/#our-courses" className={styles.secondaryBtn} style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
              <BookOpen size={16} />
              {t('enLayout.browseCourses')}
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.tabRowPill}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          {t('student.tabs.overview')}
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'history' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('history')}
        >
          {t('student.tabs.history')}
        </button>
      </div>

      <div className={styles.metricCards}>
        <div className={styles.metricCard}>
          <div className={styles.metricCardIcon}>
            <BookOpen size={18} />
          </div>
          <div>
            <strong>{ownedCount}</strong>
            <span>{t('student.metrics.activeCourses')}</span>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricCardIcon}>
            <Trophy size={18} />
          </div>
          <div>
            <strong>{completedTotal}</strong>
            <span>{t('student.metrics.completedLessons')}</span>
          </div>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <EnCourseStore user={user} progressData={progressData} getCourseInfo={getCourseInfo} />
      ) : (
        <section className={styles.historyCard}>
          <div className={styles.sectionHeader}>
            <h3>
              <Clock size={20} /> {t('student.history.title')}
            </h3>
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

      <ProfileAccountSection user={user} onDeleted={onLogout} />

      <div className={styles.toolbar}>
        <button className={styles.secondaryBtn} onClick={refreshData}>
          <TrendingUp size={16} /> {t('student.refresh')}
        </button>
        <button className={styles.secondaryBtn} onClick={onLogout}>
          <LogOut size={16} /> {t('logout')}
        </button>
      </div>
    </div>
  )
}
