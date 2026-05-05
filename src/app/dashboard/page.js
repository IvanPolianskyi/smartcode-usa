'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { logout, getUserProgress } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
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
  Box,
  Users,
  CreditCard,
  Settings,
  Gift
} from 'lucide-react'

// --- HELPER FUNCTIONS ---
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

// --- MOCK DATA ---
const upcomingLesson = {
  id: 1,
  courseName: 'Python: Основи ООП',
  date: 'Сьогодні, 16:00',
  link: 'https://zoom.us/j/1234567890',
  active: true,
}

const mockSchedule = [
  { id: 1, day: '12', month: 'Трав', title: 'Python: Основи ООП', time: '16:00 - 17:00', status: 'upcoming' },
  { id: 2, day: '15', month: 'Трав', title: 'Python: Робота з файлами', time: '16:00 - 17:00', status: 'upcoming' },
  { id: 3, day: '09', month: 'Трав', title: 'Python: Функції', time: '16:00 - 17:00', status: 'completed' },
  { id: 4, day: '05', month: 'Трав', title: 'Python: Цикли', time: '16:00 - 17:00', status: 'completed' },
]

const mockAttendance = [
  { id: 1, date: '09 Травня 2026', title: 'Python: Функції', status: 'Присутній', feedback: 'Гарно попрацював на уроці, швидко вирішив усі задачі.' },
  { id: 2, date: '05 Травня 2026', title: 'Python: Цикли', status: 'Присутній', feedback: 'Трохи плутався в циклах while, але домашнє завдання виконав ідеально.' },
  { id: 3, date: '02 Травня 2026', title: 'Python: Умови', status: 'Пропустив', feedback: 'Пропустив заняття. Перегляньте запис уроку.' },
]

// --- STUDENT DASHBOARD ---
const StudentDashboard = ({ user, progressData, refreshData, handleLogout }) => {
  return (
    <>
      <div className={styles.upcomingLessonCard}>
        <div className={styles.upcomingLessonInfo}>
          <div className={styles.upcomingLabel}>
            <Clock size={16} /> Найближчий урок
          </div>
          <h3 className={styles.upcomingTitle}>{upcomingLesson.courseName}</h3>
          <div className={styles.upcomingTime}>{upcomingLesson.date}</div>
        </div>
        <button 
          className={`${styles.joinButton} ${!upcomingLesson.active ? styles.disabled : ''}`}
          onClick={() => {
            if (upcomingLesson.active) window.open(upcomingLesson.link, '_blank');
          }}
          disabled={!upcomingLesson.active}
        >
          <Monitor size={20} />
          Приєднатися до уроку
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#dcfce7' }}>
            <Award size={24} color="#10b981" />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>15</div>
            <div className={styles.statLabel}>Балів (Смарткоїнів)</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7' }}>
            <Clock size={24} color="#f59e0b" />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>12</div>
            <div className={styles.statLabel}>Завершених уроків</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#e0e7ff' }}>
            <BookOpen size={24} color="#8b5cf6" />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>2</div>
            <div className={styles.statLabel}>Домашні завдання</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Мій розклад</h2>
          <button onClick={refreshData} className={styles.refreshButton}>
            <TrendingUp size={16} />
            <span className={styles.refreshButtonText}>Оновити</span>
          </button>
        </div>
        
        <div className={styles.scheduleList}>
          {mockSchedule.map((lesson) => (
            <div key={lesson.id} className={styles.scheduleItem}>
              <div className={styles.scheduleItemLeft}>
                <div className={styles.scheduleDate}>
                  <div className={styles.scheduleDay}>{lesson.day}</div>
                  <div className={styles.scheduleMonth}>{lesson.month}</div>
                </div>
                <div className={styles.scheduleDetails}>
                  <h4>{lesson.title}</h4>
                  <div className={styles.scheduleTime}>
                    <Clock size={14} /> {lesson.time}
                  </div>
                </div>
              </div>
              <div className={`${styles.scheduleStatus} ${lesson.status === 'completed' ? styles.statusCompleted : styles.statusUpcoming}`}>
                {lesson.status === 'completed' ? 'Пройдено' : 'Заплановано'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// --- PARENT DASHBOARD ---
const ParentDashboard = ({ user, refreshData }) => {
  return (
    <>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#dbeafe' }}>
            <Users size={24} color="#3b82f6" />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>Олексій</div>
            <div className={styles.statLabel}>Профіль дитини</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#dcfce7' }}>
            <CreditCard size={24} color="#10b981" />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>18</div>
            <div className={styles.statLabel}>Оплачених уроків залишилось</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7' }}>
            <Gift size={24} color="#f59e0b" />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>0</div>
            <div className={styles.statLabel}>Запрошених друзів</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Історія відвідувань та відгуки</h2>
        </div>
        <div className={styles.attendanceList}>
          {mockAttendance.map((record) => (
            <div key={record.id} className={styles.scheduleItem} style={{ alignItems: 'flex-start' }}>
              <div className={styles.scheduleItemLeft}>
                <div className={styles.scheduleDetails}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h4>{record.title}</h4>
                    <div className={`${styles.scheduleStatus} ${record.status === 'Присутній' ? styles.statusCompleted : styles.statusMissed}`}>
                      {record.status}
                    </div>
                  </div>
                  <div className={styles.scheduleTime}>
                    <Clock size={14} /> {record.date}
                  </div>
                  {record.feedback && (
                    <div className={styles.feedbackBox}>
                      <div className={styles.feedbackTitle}>Коментар викладача:</div>
                      <p className={styles.feedbackText}>{record.feedback}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Швидкі дії</h2>
        </div>
        <div className={styles.coursesGrid}>
          <Link href="/tariff" className={styles.courseCard}>
             <div className={styles.courseHeader}>
                <div className={styles.courseIcon} style={{ color: '#10b981' }}>
                  <CreditCard size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className={styles.courseTitle}>Поповнити баланс занять</h3>
                  <div className={styles.courseSubtitle}>Оплатити наступні уроки</div>
                </div>
              </div>
          </Link>

          <Link href="/invite" className={styles.courseCard}>
             <div className={styles.courseHeader}>
                <div className={styles.courseIcon} style={{ color: '#f59e0b' }}>
                  <Gift size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className={styles.courseTitle}>Реферальна програма</h3>
                  <div className={styles.courseSubtitle}>Запросити друзів і отримати бонус</div>
                </div>
              </div>
          </Link>
        </div>
      </div>
    </>
  )
}

// --- MAIN PAGE ---
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
            getUserProgress(courseId).then(progress => ({ courseId, progress }))
            .catch(error => ({ courseId, progress: null }))
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

    if (user.role !== 'parent') {
      loadProgress()
    } else {
      setProgressLoading(false) // Parents don't fetch progress the same way yet
    }
  }, [sessionLoading, user, router])

  const loading = sessionLoading || progressLoading

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
              <p className={styles.email}>
                {user.email} &bull; <span style={{textTransform:'capitalize'}}>{user.role === 'parent' ? 'Батьки' : 'Учень'}</span>
              </p>
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
        {user.role === 'parent' ? (
          <ParentDashboard user={user} refreshData={refreshData} />
        ) : (
          <StudentDashboard user={user} progressData={progressData} refreshData={refreshData} handleLogout={handleLogout} />
        )}
      </div>
    </div>
  )
}

