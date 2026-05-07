"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Clock, 
  Users, 
  Award, 
  Target, 
  BookOpen, 
  Play, 
  CheckCircle2,
  Lock,
  ChevronRight,
  Rocket,
  Code,
  Brain,
  Database,
  Globe
} from 'lucide-react'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'
import { getUserProgress, checkCoursePurchase } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from './CoursePage.module.css'

const CoursePage = ({ courseId = "python-developer-zero-to-junior", userProgress: initialProgress = null }) => {
  const router = useRouter()
  const { user: sessionUser, loading: sessionLoading } = useAuthSession()
  const [isLoaded, setIsLoaded] = useState(false)
  const [expandedModule, setExpandedModule] = useState(null)
  const [userProgress, setUserProgress] = useState(initialProgress)
  const [user, setUser] = useState(null)
  const [isPurchased, setIsPurchased] = useState(false)
  const [allowedLessons, setAllowedLessons] = useState(new Set())
  
  // Get the appropriate curriculum based on courseId
  const getCurriculum = () => {
    if (courseId === "web-development") {
      return webDevCurriculum
    }
    return pythonCurriculum
  }
  
  const course = getCurriculum()
  const isEnrolled = userProgress !== null
  const progress = userProgress?.overallProgress || 0


  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!course.modules || !isLoaded) return
    const handleHashNavigation = () => {
      if (typeof window !== 'undefined' && course.modules) {
        const hash = window.location.hash
        if (hash) {
          const moduleId = hash.replace('#module-', '')
          if (moduleId) {
            const moduleIndex = course.modules.findIndex(m => m.moduleId === moduleId)
            if (moduleIndex >= 0) {
              setExpandedModule(moduleIndex)
              setTimeout(() => {
                const element = document.getElementById(`module-${moduleId}`)
                if (element) {
                  const headerOffset = 100
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerOffset
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              }, 500)
            }
          }
        }
      }
    }
    handleHashNavigation()
    window.addEventListener('hashchange', handleHashNavigation)
    return () => window.removeEventListener('hashchange', handleHashNavigation)
  }, [courseId, course.modules, isLoaded])

  useEffect(() => {
    if (sessionLoading) return
    setUser(sessionUser)
    if (!sessionUser) {
      setIsPurchased(false)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const explicitAccess = sessionUser?.studentProfile?.courseAccess?.[courseId]
        const explicitUnlocked = explicitAccess?.unlockedLessons || []
        const unlockedSet = new Set(explicitUnlocked)
        const allLessons = course.modules.flatMap(m => m.lessons)
        const unlockedIndexes = allLessons
          .map((lesson, index) => (unlockedSet.has(lesson.lessonId) ? index : -1))
          .filter(index => index >= 0)
        const highestUnlockedIndex = unlockedIndexes.length > 0 ? Math.max(...unlockedIndexes) : -1
        if (highestUnlockedIndex >= 0 && highestUnlockedIndex + 1 < allLessons.length) {
          unlockedSet.add(allLessons[highestUnlockedIndex + 1].lessonId)
        }
        setAllowedLessons(unlockedSet)

        const purchased = await checkCoursePurchase(courseId)
        if (cancelled) return
        setIsPurchased(purchased || sessionUser.role === 'admin')
        const progressData = await getUserProgress(courseId)
        if (cancelled) return
        if (progressData) setUserProgress(progressData)
      } catch {
        if (!cancelled) setIsPurchased(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [sessionLoading, sessionUser, courseId])
  
  const getModuleIcon = (moduleOrder) => {
    const icons = [
      <Code className="w-6 h-6" />,
      <Brain className="w-6 h-6" />,
      <BookOpen className="w-6 h-6" />,
      <Database className="w-6 h-6" />,
      <Target className="w-6 h-6" />,
      <Globe className="w-6 h-6" />,
      <Rocket className="w-6 h-6" />
    ]
    return icons[moduleOrder - 1] || <BookOpen className="w-6 h-6" />
  }
  
  const isLessonCompleted = (lessonId) => {
    return userProgress?.completedLessons?.includes(lessonId) || false
  }
  
  const isQuizPassed = (lessonId) => {
    const quizData = userProgress?.completedQuizzes?.[lessonId]
    return quizData?.passed === true || quizData?.score >= 60
  }

  // Отримати оцінку тесту для уроку
  const getQuizScore = (lessonId) => {
    const quizData = userProgress?.completedQuizzes?.[lessonId]
    return quizData?.score || null
  }

  // Отримати колір для уроку на основі оцінки тесту
  const getLessonColor = (lessonId) => {
    const score = getQuizScore(lessonId)
    if (score === null) {
      return null // Немає оцінки
    }
    if (score >= 80) {
      return 'green' // Зелений - хороша оцінка
    } else if (score >= 50) {
      return 'yellow' // Жовтий - середня оцінка
    } else {
      return 'red' // Червоний - погана оцінка
    }
  }
  
  const isLessonUnlocked = (lesson, moduleIndex) => {
    const hasOnlineAccess = user?.studentProfile?.activeOnlineCourses?.includes(courseId)
    if (allowedLessons.size > 0) {
      return allowedLessons.has(lesson.lessonId)
    }
    const explicitEnabled = user?.studentProfile?.courseAccess?.[courseId]?.enabled
    if (explicitEnabled === false) return false
    if (hasOnlineAccess) {
      // Для онлайн-учнів без явного списку уроків лишаємо стартовий урок доступним.
      return moduleIndex === 0 && lesson.order === 1
    }
    // Admin has access to all lessons
    if (user?.role === 'admin') return true
    
    // If course is purchased, all lessons are unlocked
    if (isPurchased) return true
    
    // If not enrolled, only first lesson of first module is available (free preview)
    if (!isEnrolled) {
      return moduleIndex === 0 && lesson.order === 1
    }
    
    // Free preview: only first lesson of first module
    if (moduleIndex === 0 && lesson.order === 1) return true
    
    // All other lessons require purchase
    return false
  }
  
  const getLevelBadge = (level) => {
    const badges = {
      "Beginner": { text: "Початківець", color: "var(--accent-green)" },
      "Intermediate": { text: "Середній", color: "var(--accent-yellow)" },
      "Advanced": { text: "Просунутий", color: "var(--accent-red)" }
    }
    return badges[level] || badges["Beginner"]
  }
  
  const courseLevel = courseId === "web-development" ? "Intermediate" : "Beginner"
  const courseAge = courseId === "web-development" ? "12-18" : "13-17"
  const levelBadge = getLevelBadge(courseLevel)
  
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <Link href="/">Головна</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Курси</span>
            <ChevronRight className="w-4 h-4" />
            <span>{course.title}</span>
          </div>
          
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <div className={styles.badges}>
                <span 
                  className={styles.levelBadge}
                  style={{ backgroundColor: levelBadge.color }}
                >
                  {levelBadge.text}
                </span>
                <span className={styles.ageBadge}>
                  Вік: {courseAge}
                </span>
              </div>
              
              <h1 className={styles.title}>{course.title}</h1>
              
              <p className={styles.valueProposition}>
                {courseId === "web-development" 
                  ? "Створюй сучасні веб-додатки з нуля. Навчись HTML, CSS, JavaScript, React та Node.js для повноцінної веб-розробки."
                  : "Навчись створювати реальні проекти на Python та отримай навички, необхідні для початку кар'єри в IT."
                }
              </p>
            </div>
            
            {isEnrolled && (
              <div className={styles.progressCard}>
                <div className={styles.progressHeader}>
                  <span>Прогрес курсу</span>
                  <span className={styles.progressPercent}>{progress}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Course Stats */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <Clock className="w-5 h-5" />
              <div>
                <div className={styles.statValue}>
                  {course.modules.reduce((sum, m) => sum + m.duration.weeks, 0)} тижнів
                </div>
                <div className={styles.statLabel}>Тривалість</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <BookOpen className="w-5 h-5" />
              <div>
                <div className={styles.statValue}>
                  {course.modules.reduce((sum, m) => sum + m.lessons.length, 0)} уроків
                </div>
                <div className={styles.statLabel}>Матеріалів</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <Target className="w-5 h-5" />
              <div>
                <div className={styles.statValue}>
                  {course.modules.length} модулів
                </div>
                <div className={styles.statLabel}>Модулів</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <Award className="w-5 h-5" />
              <div>
                <div className={styles.statValue}>Сертифікат</div>
                <div className={styles.statLabel}>Після завершення</div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* Course Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          {/* Skills */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoCardTitle}>
              <Target className="w-5 h-5" />
              Навички, які ти отримаєш
            </h3>
            <ul className={styles.skillsList}>
              {[
                "Основи програмування на Python",
                "Робота з даними та файлами",
                "Об'єктно-орієнтоване програмування",
                "Робота з базами даних",
                "Веб-розробка з Flask",
                "Тестування коду",
                "Версійний контроль Git",
                "Розробка REST API",
                "Деплой проектів"
              ].map((skill, index) => (
                <li key={index} className={styles.skillItem}>
                  <CheckCircle2 className="w-4 h-4" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Learning Format */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoCardTitle}>
              <Play className="w-5 h-5" />
              Формат навчання
            </h3>
            <ul className={styles.formatList}>
              <li>
                <CheckCircle2 className="w-4 h-4" />
                Відео-уроки з поясненнями
              </li>
              <li>
                <CheckCircle2 className="w-4 h-4" />
                Практичні завдання після кожного уроку
              </li>
              <li>
                <CheckCircle2 className="w-4 h-4" />
                Тести для перевірки знань
              </li>
              <li>
                <CheckCircle2 className="w-4 h-4" />
                Реальні проекти для портфоліо
              </li>
              <li>
                <CheckCircle2 className="w-4 h-4" />
                Code review від менторів
              </li>
            </ul>
          </div>
          
          {/* Requirements */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoCardTitle}>
              <BookOpen className="w-5 h-5" />
              Вимоги
            </h3>
            <ul className={styles.requirementsList}>
              <li>Базові знання англійської мови</li>
              <li>Доступ до комп'ютера з інтернетом</li>
              <li>Мотивація та готовність до навчання</li>
            </ul>
          </div>
          
          {/* Certificate */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoCardTitle}>
              <Award className="w-5 h-5" />
              Сертифікат
            </h3>
            <p className={styles.certificateInfo}>
              Після успішного завершення всіх модулів та фінального проекту ти отримаєш міжнародний сертифікат SmartCode Academy, який підтверджує твої навички {courseId === "web-development" ? "веб-розробника" : "Python розробника"}.
            </p>
          </div>
        </div>
      </section>
      
      {/* Course Roadmap */}
      <section className={styles.roadmapSection}>
        <h2 className={styles.sectionTitle}>Програма курсу</h2>
        <p className={styles.sectionDescription}>
          {course.modules.length} модулів, {course.modules.reduce((sum, m) => sum + m.lessons.length, 0)} уроків - від основ до створення повноцінних проектів
        </p>
        
        <div className={styles.modulesList}>
          {course.modules.map((module, moduleIndex) => (
            <div 
              key={module.moduleId}
              id={`module-${module.moduleId}`}
              className={`${styles.moduleCard} ${expandedModule === moduleIndex ? styles.expanded : ''}`}
            >
              <div 
                className={styles.moduleHeader}
                onClick={() => setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex)}
              >
                <div className={styles.moduleHeaderLeft}>
                  <div className={styles.moduleIcon}>
                    {getModuleIcon(module.order)}
                  </div>
                  <div>
                    <div className={styles.moduleNumber}>
                      Модуль {module.order}
                    </div>
                    <h3 className={styles.moduleTitle}>{module.title}</h3>
                    <p className={styles.moduleDescription}>{module.description}</p>
                  </div>
                </div>
                <div className={styles.moduleHeaderRight}>
                  <div className={styles.moduleMeta}>
                    <span>{module.duration.weeks} тижні</span>
                    <span>•</span>
                    <span>{module.lessons.length} уроків</span>
                  </div>
                  <ChevronRight 
                    className={`${styles.expandIcon} ${expandedModule === moduleIndex ? styles.expanded : ''}`}
                  />
                </div>
              </div>
              
              {expandedModule === moduleIndex && (
                <div className={styles.moduleContent}>
                  <div className={styles.learningOutcomes}>
                    <h4>Що ти навчишся:</h4>
                    <ul>
                      {module.learningOutcomes.map((outcome, idx) => (
                        <li key={idx}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.lessonsList}>
                    <h4>Уроки модуля:</h4>
                    {module.lessons.map((lesson, lessonIndex) => {
                      const completed = isLessonCompleted(lesson.lessonId)
                      const unlocked = isLessonUnlocked(lesson, moduleIndex)
                      const lessonColor = getLessonColor(lesson.lessonId)
                      const quizScore = getQuizScore(lesson.lessonId)
                      
                      return (
                        <Link
                          key={lesson.lessonId}
                          href={`/courses/${courseId}/lessons/${lesson.lessonId}`}
                          prefetch={false}
                          className={`${styles.lessonItem} ${!unlocked ? styles.locked : ''} ${completed ? styles.completed : ''} ${lessonColor ? styles[`lesson${lessonColor.charAt(0).toUpperCase() + lessonColor.slice(1)}`] : ''}`}
                          style={lessonColor ? {
                            borderLeft: `4px solid ${
                              lessonColor === 'green' ? '#10b981' :
                              lessonColor === 'yellow' ? '#f59e0b' :
                              '#ef4444'
                            }`
                          } : {}}
                          onClick={(e) => {
                            if (!unlocked) {
                              e.preventDefault()
                            }
                          }}
                        >
                          <div className={styles.lessonItemLeft}>
                            {completed ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : unlocked ? (
                              <Play className="w-5 h-5" />
                            ) : (
                              <Lock className="w-5 h-5" />
                            )}
                            <div>
                              <div className={styles.lessonNumber}>
                                Урок {lesson.order}
                              </div>
                              <div className={styles.lessonTitle}>{lesson.title}</div>
                              {lesson.isProject && (
                                <span className={styles.projectBadge}>Проект</span>
                              )}
                            </div>
                          </div>
                          <div className={styles.lessonItemRight}>
                            <span className={styles.lessonTime}>
                              {lesson.estimatedTime} хв
                            </span>
                            {quizScore !== null && (
                              <span className={styles.quizScore} style={{
                                color: lessonColor === 'green' ? '#10b981' :
                                       lessonColor === 'yellow' ? '#f59e0b' :
                                       '#ef4444'
                              }}>
                                Тест: {quizScore}%
                              </span>
                            )}
                            {!unlocked && (
                              <span className={styles.lockedLabel}>Заблоковано</span>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Продовжуй навчання</h2>
          <p className={styles.ctaDescription}>
            Ти вже на {progress}% шляху до завершення курсу. Продовжуй вивчати нові уроки!
          </p>
          <Link 
            href={`/courses/${courseId}`}
            className={styles.ctaButton}
          >
            <Play className="w-5 h-5" />
            Перейти до уроків
          </Link>
        </div>
      </section>
    </div>
  )
}

export default CoursePage

