'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Code, 
  Gamepad2, 
  Monitor, 
  Box,
  Clock,
  Users,
  Award,
  Star,
  ChevronRight,
  BookOpen,
  Target,
  Lock
} from 'lucide-react'
import { getCurrentUser, getUserProgress } from '@/lib/authClient'
import styles from './CoursesPage.module.css'

const courses = [
  {
    courseId: 'python-developer-zero-to-junior',
    title: 'Повний курс Пайтон',
    shortDescription: 'Повний курс програмування на Python від основ до рівня впевненого джуніора',
    description: 'Навчись створювати реальні проекти на Python та отримай навички, необхідні для початку кар\'єри в IT.',
    icon: <Code size={32} />,
    color: '#3b82f6',
    theme: 'blue',
    link: '/python',
    courseLink: '/courses/python-developer-zero-to-junior',
    age: '13-17 років',
    level: 'Beginner',
    duration: {
      weeks: 41,
      lessons: 96,
      hours: 192
    },
    skills: [
      'Основи програмування на Python',
      'ООП та алгоритми',
      'Робота з базами даних',
      'Веб-розробка з Flask',
      'REST API',
      'Деплой проектів'
    ],
    popular: true,
    rating: 4.9
  },
  {
    courseId: 'unity-game-development',
    title: 'Розробка ігор на Unity',
    shortDescription: 'Створення захоплюючих ігор на Unity з використанням C#',
    description: 'Розробляй захоплюючі ігри на Unity. Від простих 2D до складних 3D проектів.',
    icon: <Gamepad2 size={32} />,
    color: '#10b981',
    theme: 'green',
    link: '/Unity',
    courseLink: '/courses/unity-game-development',
    age: '8-17 років',
    level: 'Beginner',
    duration: {
      weeks: 20,
      lessons: 40,
      hours: 80
    },
    skills: [
      'C# програмування',
      'Unity 3D',
      'Дизайн персонажів',
      'Логіка геймплею',
      'Фізика та анімація',
      'Публікація ігор'
    ],
    popular: false,
    rating: 4.8
  },
  {
    courseId: 'roblox-studio',
    title: 'Roblox Studio',
    shortDescription: 'Створення ігор у Roblox Studio',
    description: 'Навчись створювати власні ігри в Roblox Studio та публікувати їх для мільйонів гравців.',
    icon: <Box size={32} />,
    color: '#10b981',
    theme: 'green',
    link: '/Roblox',
    courseLink: '/courses/roblox-studio',
    age: '8-16 років',
    level: 'Beginner',
    duration: {
      weeks: 16,
      lessons: 32,
      hours: 64
    },
    skills: [
      'Lua програмування',
      'Roblox Studio',
      '3D моделювання',
      'Геймдизайн',
      'Монетизація',
      'Публікація ігор'
    ],
    popular: false,
    rating: 4.7
  },
  {
    courseId: 'web-development',
    title: 'Веб-розробка',
    shortDescription: 'HTML, CSS, React, дизайн',
    description: 'Створюй сучасні веб-сайти та додатки з використанням найновіших технологій.',
    icon: <Monitor size={32} />,
    color: '#8b5cf6',
    theme: 'purple',
    link: '/webDev',
    courseLink: '/courses/web-development',
    age: '12-18 років',
    level: 'Intermediate',
    duration: {
      weeks: 22,
      lessons: 44,
      hours: 88
    },
    skills: [
      'HTML & CSS',
      'JavaScript',
      'React',
      'Responsive дизайн',
      'API інтеграція',
      'Деплой веб-додатків'
    ],
    popular: false,
    rating: 4.8
  }
]

export default function CoursesPage() {
  const [user, setUser] = useState(null)
  const [progressData, setProgressData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const userData = await getCurrentUser()
      setUser(userData)

      if (userData && userData.enrolledCourses) {
        const progressPromises = userData.enrolledCourses.map(courseId =>
          getUserProgress(courseId).then(progress => ({ courseId, progress }))
        )
        const progressResults = await Promise.all(progressPromises)
        const progressMap = {}
        progressResults.forEach(({ courseId, progress }) => {
          progressMap[courseId] = progress
        })
        setProgressData(progressMap)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLevelBadge = (level) => {
    const badges = {
      "Beginner": { text: "Початківець", color: "#10b981" },
      "Intermediate": { text: "Середній", color: "#f59e0b" },
      "Advanced": { text: "Просунутий", color: "#ef4444" }
    }
    return badges[level] || badges["Beginner"]
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <Link href="/">Головна</Link>
            <ChevronRight size={16} />
            <span>Курси</span>
          </div>
          <h1 className={styles.heroTitle}>Наші курси</h1>
          <p className={styles.heroDescription}>
            Обери свій шлях у програмуванні. Всі наші курси розроблені для дітей та підлітків з урахуванням їх віку та рівня підготовки.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className={styles.coursesSection}>
        <div className={styles.coursesGrid}>
          {courses.map((course) => {
            const progress = progressData[course.courseId]
            const isEnrolled = !!progress
            const progressPercent = progress?.overallProgress || 0
            const levelBadge = getLevelBadge(course.level)
            const isPython = course.courseId === 'python-developer-zero-to-junior'
            const isLocked = !isPython

            return (
              <div 
                key={course.courseId} 
                className={`${styles.courseCard} ${isLocked ? styles.lockedCard : ''}`}
              >
                <div className={styles.badgeContainer}>
                  {course.popular && (
                    <div className={styles.popularBadge}>
                      <Star size={14} />
                      <span>Популярний</span>
                    </div>
                  )}
                  {isLocked && (
                    <div className={styles.lockedBadge}>
                      <Lock size={14} />
                      <span>Скоро</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.courseHeader}>
                  <div 
                    className={styles.courseIcon}
                    style={{ backgroundColor: `${course.color}15`, color: course.color }}
                  >
                    {course.icon}
                  </div>
                  <div className={styles.courseTitleSection}>
                    <h2 className={styles.courseTitle}>{course.title}</h2>
                    <div className={styles.courseMeta}>
                      <span 
                        className={styles.levelBadge}
                        style={{ backgroundColor: levelBadge.color }}
                      >
                        {levelBadge.text}
                      </span>
                      <span className={styles.ageBadge}>{course.age}</span>
                      <div className={styles.rating}>
                        <Star size={14} fill="#fbbf24" color="#fbbf24" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className={styles.courseDescription}>{course.shortDescription}</p>

                <div className={styles.courseStats}>
                  <div className={styles.stat}>
                    <Clock size={16} />
                    <span>{course.duration.weeks} тижнів</span>
                  </div>
                  <div className={styles.stat}>
                    <BookOpen size={16} />
                    <span>{course.duration.lessons} уроків</span>
                  </div>
                  <div className={styles.stat}>
                    <Users size={16} />
                    <span>{course.duration.hours} годин</span>
                  </div>
                </div>

                {isEnrolled && (
                  <div className={styles.progressSection}>
                    <div className={styles.progressHeader}>
                      <span>Ваш прогрес</span>
                      <span className={styles.progressPercent}>{progressPercent}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${progressPercent}%`, backgroundColor: course.color }}
                      />
                    </div>
                  </div>
                )}

                <div className={styles.skillsSection}>
                  <h3 className={styles.skillsTitle}>Навички, які ти отримаєш:</h3>
                  <div className={styles.skillsList}>
                    {course.skills.slice(0, 4).map((skill, index) => (
                      <div key={index} className={styles.skillTag}>
                        {skill}
                      </div>
                    ))}
                    {course.skills.length > 4 && (
                      <div className={styles.skillTag}>
                        +{course.skills.length - 4} більше
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.courseActions}>
                  {isLocked ? (
                    <button
                      className={styles.lockedButton}
                      onClick={(e) => {
                        e.preventDefault()
                        window.dispatchEvent(new Event('openContactModal'))
                      }}
                    >
                      <Lock size={18} />
                      Скоро доступно
                    </button>
                  ) : (
                    <>
                      <Link
                        href={course.courseLink}
                        className={styles.primaryButton}
                        style={{ backgroundColor: course.color }}
                      >
                        {isEnrolled ? 'Продовжити навчання' : 'Дізнатися більше'}
                        <ChevronRight size={18} />
                      </Link>
                      {isEnrolled && (
                        <Link
                          href={course.courseLink}
                          className={styles.secondaryButton}
                        >
                          Перейти до курсу
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}














