'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { logout, getUserProgress } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import styles from './Dashboard.module.css'
import {
  User, 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp,
  LogOut,
  Code,
  Gamepad2,
  Monitor,
  Box
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: sessionLoading, refresh } = useAuthSession()
  const [progressData, setProgressData] = useState({})
  const [progressLoading, setProgressLoading] = useState(true)

  useEffect(() => {
    if (sessionLoading) return
    if (!user) {
      router.push('/login')
      return
    }

    const loadProgress = async () => {
      setProgressLoading(true)
      try {
        if (user.enrolledCourses?.length > 0) {
          const progressPromises = user.enrolledCourses.map(courseId =>
            getUserProgress(courseId).then(progress => {
              return { courseId, progress }
            }).catch(error => {
              console.error('Dashboard: Error loading progress for', courseId, ':', error)
              return { courseId, progress: null }
            })
          )
          const progressResults = await Promise.all(progressPromises)
          const progressMap = {}
          progressResults.forEach(({ courseId, progress }) => {
            progressMap[courseId] = progress
          })
          setProgressData(progressMap)
        } else {
          setProgressData({})
        }
      } catch (error) {
        console.error('Error loading progress:', error)
      } finally {
        setProgressLoading(false)
      }
    }

    loadProgress()
  }, [sessionLoading, user, router])

  const loading = sessionLoading || progressLoading

  // Додати можливість оновити дані
  const refreshData = () => {
    refresh(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
      window.dispatchEvent(new Event('auth:logout'))
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getCourseInfo = (courseId) => {
    const courses = {
      'python-developer-zero-to-junior': {
        title: 'Python Developer: From Zero to Confident Junior',
        icon: <Code size={24} />,
        color: '#3b82f6',
        link: '/courses/python-developer-zero-to-junior'
      },
      'unity-game-development': {
        title: 'Розробка ігор на Unity',
        icon: <Gamepad2 size={24} />,
        color: '#10b981',
        link: '/Unity'
      },
      'roblox-studio': {
        title: 'Roblox Studio',
        icon: <Box size={24} />,
        color: '#10b981',
        link: '/Roblox'
      },
      'web-development': {
        title: 'Веб-розробка',
        icon: <Monitor size={24} />,
        color: '#8b5cf6',
        link: '/courses/web-development'
      }
    }
    return courses[courseId] || { title: courseId, icon: <BookOpen size={24} />, color: '#6b7280', link: '#' }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Завантаження...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <User size={32} />
            </div>
            <div>
              <h1 className={styles.welcome}>Вітаємо, {user.name}!</h1>
              <p className={styles.email}>{user.email}</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button 
              onClick={refreshData} 
              className={styles.logoutButton}
              style={{ backgroundColor: 'var(--primary-blue)' }}
              title="Оновити дані"
            >
              <TrendingUp size={20} />
              Оновити
            </button>
            {user.role === 'admin' && (
              <Link href="/admin" className={styles.adminButton}>
                Адмін Панель
              </Link>
            )}
            <button onClick={handleLogout} className={styles.logoutButton}>
              <LogOut size={20} />
              Вийти
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Statistics */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#dbeafe' }}>
              <BookOpen size={24} color="#3b82f6" />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{user.enrolledCourses?.length || 0}</div>
              <div className={styles.statLabel}>Активних курсів</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#dcfce7' }}>
              <Award size={24} color="#10b981" />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {Object.values(progressData).reduce((sum, p) => sum + (p?.certificates?.length || 0), 0)}
              </div>
              <div className={styles.statLabel}>Сертифікатів</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7' }}>
              <Clock size={24} color="#f59e0b" />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {Object.values(progressData).reduce((sum, p) => sum + (p?.completedLessons?.length || 0), 0)}
              </div>
              <div className={styles.statLabel}>Завершених уроків</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#e0e7ff' }}>
              <TrendingUp size={24} color="#8b5cf6" />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {Object.values(progressData).length > 0
                  ? Math.round(
                      Object.values(progressData).reduce((sum, p) => sum + (p?.overallProgress || 0), 0) /
                        Object.values(progressData).length
                    )
                  : 0}%
              </div>
              <div className={styles.statLabel}>Середній прогрес</div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Мої курси</h2>
            <button 
              onClick={refreshData}
              className={styles.refreshButton}
            >
              <TrendingUp size={16} />
              <span className={styles.refreshButtonText}>Оновити</span>
            </button>
          </div>
          {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
            <div className={styles.coursesGrid}>
              {user.enrolledCourses.map((courseId) => {
                const courseInfo = getCourseInfo(courseId)
                const progress = progressData[courseId]
                const progressPercent = progress?.overallProgress || 0
                const completedLessons = progress?.completedLessons?.length || 0
                const hasProgress = progress !== null && progress !== undefined

                return (
                  <Link key={courseId} href={courseInfo.link} className={styles.courseCard}>
                    <div className={styles.courseHeader}>
                      <div className={styles.courseIcon} style={{ color: courseInfo.color }}>
                        {courseInfo.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 className={styles.courseTitle}>{courseInfo.title}</h3>
                        {hasProgress && (
                          <div className={styles.courseSubtitle}>
                            {completedLessons > 0 ? `Пройдено ${completedLessons} уроків` : 'Ще не почато'}
                          </div>
                        )}
                      </div>
                    </div>
                    {hasProgress ? (
                      <>
                        <div className={styles.progressSection}>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressFill}
                              style={{ width: `${progressPercent}%`, backgroundColor: courseInfo.color }}
                            />
                          </div>
                          <div className={styles.progressText}>
                            <span>{progressPercent}% завершено</span>
                            <span>{completedLessons} уроків</span>
                          </div>
                        </div>
                        {progress?.enrolledAt && (
                          <div className={styles.courseMeta}>
                            Записався: {new Date(progress.enrolledAt).toLocaleDateString('uk-UA')}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={styles.progressSection}>
                        <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          Прогрес завантажується...
                        </div>
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <BookOpen size={48} color="#9ca3af" />
              <p>Ви ще не записались на жоден курс</p>
              <Link href="/courses" className={styles.browseButton}>
                Переглянути курси
              </Link>
            </div>
          )}
          {user.enrolledCourses && user.enrolledCourses.length > 0 && (
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link href="/courses" className={styles.browseButton}>
                Подивитися всі курси
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

