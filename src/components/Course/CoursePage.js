"use client"
import React, { useState, useEffect, useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { 
  Clock, 
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
import { getCurriculum } from '@/lib/getCurriculum'
import { getRobloxCurriculum } from '@/lib/robloxCurriculumLocale'
import { getUserProgress, checkCoursePurchase } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from './CoursePage.module.css'

function normalizeRawList(raw) {
  if (Array.isArray(raw)) return raw
  if (raw && typeof raw === 'object') {
    return Object.keys(raw)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => raw[k])
  }
  return []
}

const CoursePage = ({ courseId = "python-developer-zero-to-junior", userProgress: initialProgress = null }) => {
  const locale = useLocale()
  const courseSlug =
    courseId === 'web-development'
      ? 'webdev'
      : courseId === 'roblox-studio'
        ? 'roblox'
        : 'python'
  const tCommon = useTranslations('lms.common')
  const tCourse = useTranslations('lms.course')
  const tVariant = useTranslations(`lms.course.${courseSlug}`)
  const { user: sessionUser, loading: sessionLoading } = useAuthSession()
  const [isLoaded, setIsLoaded] = useState(false)
  const [expandedModule, setExpandedModule] = useState(null)
  const [userProgress, setUserProgress] = useState(initialProgress)
  const [user, setUser] = useState(null)
  const [isPurchased, setIsPurchased] = useState(false)
  const [allowedLessons, setAllowedLessons] = useState(new Set())

  const skills = useMemo(() => normalizeRawList(tVariant.raw('skills')), [tVariant])
  const formatItems = useMemo(() => normalizeRawList(tVariant.raw('format')), [tVariant])
  const requirements = useMemo(() => normalizeRawList(tVariant.raw('requirements')), [tVariant])
  
  const course = useMemo(() => {
    if (courseId === 'roblox-studio') return getRobloxCurriculum(locale)
    return getCurriculum(courseId, locale)
  }, [courseId, locale])
  const isEnrolled = userProgress !== null
  const progress = userProgress?.overallProgress || 0
  const totalWeeks = course.modules.reduce((sum, m) => sum + m.duration.weeks, 0)
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0)

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
  
  const isLessonUnlocked = (lesson, moduleIndex) => {
    const hasOnlineAccess = user?.studentProfile?.activeOnlineCourses?.includes(courseId)
    if (allowedLessons.size > 0) {
      return allowedLessons.has(lesson.lessonId)
    }
    const explicitEnabled = user?.studentProfile?.courseAccess?.[courseId]?.enabled
    if (explicitEnabled === false) return false
    if (hasOnlineAccess) {
      return moduleIndex === 0 && lesson.order === 1
    }
    if (user?.role === 'admin') return true
    if (isPurchased) return true
    if (!isEnrolled) {
      return moduleIndex === 0 && lesson.order === 1
    }
    if (moduleIndex === 0 && lesson.order === 1) return true
    return false
  }
  
  const getLevelBadge = (level) => {
    const levelKey = level === 'Intermediate' ? 'intermediate' : level === 'Advanced' ? 'advanced' : 'beginner'
    const colors = {
      beginner: "var(--accent-green)",
      intermediate: "var(--accent-yellow)",
      advanced: "var(--accent-red)",
    }
    return { text: tCommon(`levels.${levelKey}`), color: colors[levelKey] }
  }
  
  const courseLevel = courseId === "web-development" ? "Intermediate" : "Beginner"
  const courseAge = courseId === "web-development" ? "12-18" : "13-17"
  const levelBadge = getLevelBadge(courseLevel)

  const getQuizScore = (lessonId) => {
    const quizData = userProgress?.completedQuizzes?.[lessonId]
    return quizData?.score ?? null
  }

  const getLessonColor = (lessonId) => {
    const score = getQuizScore(lessonId)
    if (score === null) return null
    if (score >= 80) return 'green'
    if (score >= 50) return 'yellow'
    return 'red'
  }
  
  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <Link href="/">{tCommon('breadcrumb.home')}</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{tCommon('breadcrumb.courses')}</span>
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
                  {tCommon('age', { age: courseAge })}
                </span>
              </div>
              
              <h1 className={styles.title}>{course.title}</h1>
              
              <p className={styles.valueProposition}>
                {tVariant('valueProposition')}
              </p>
            </div>
            
            {isEnrolled && (
              <div className={styles.progressCard}>
                <div className={styles.progressHeader}>
                  <span>{tCourse('progressLabel')}</span>
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
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <Clock className="w-5 h-5" />
              <div>
                <div className={styles.statValue}>
                  {totalWeeks} {tCommon('stats.weeks')}
                </div>
                <div className={styles.statLabel}>{tCommon('stats.duration')}</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <BookOpen className="w-5 h-5" />
              <div>
                <div className={styles.statValue}>
                  {totalLessons} {tCommon('stats.lessons')}
                </div>
                <div className={styles.statLabel}>{tCommon('stats.materials')}</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <Target className="w-5 h-5" />
              <div>
                <div className={styles.statValue}>
                  {course.modules.length} {tCommon('stats.modules')}
                </div>
                <div className={styles.statLabel}>{tCommon('stats.modulesLabel')}</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <Award className="w-5 h-5" />
              <div>
                <div className={styles.statValue}>{tCommon('stats.certificate')}</div>
                <div className={styles.statLabel}>{tCommon('stats.afterCompletion')}</div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoCardTitle}>
              <Target className="w-5 h-5" />
              {tCourse('skillsTitle')}
            </h3>
            <ul className={styles.skillsList}>
              {skills.map((skill, index) => (
                <li key={index} className={styles.skillItem}>
                  <CheckCircle2 className="w-4 h-4" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.infoCard}>
            <h3 className={styles.infoCardTitle}>
              <Play className="w-5 h-5" />
              {tCourse('formatTitle')}
            </h3>
            <ul className={styles.formatList}>
              {formatItems.map((item, index) => (
                <li key={index}>
                  <CheckCircle2 className="w-4 h-4" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.infoCard}>
            <h3 className={styles.infoCardTitle}>
              <BookOpen className="w-5 h-5" />
              {tCourse('requirementsTitle')}
            </h3>
            <ul className={styles.requirementsList}>
              {requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles.infoCard}>
            <h3 className={styles.infoCardTitle}>
              <Award className="w-5 h-5" />
              {tCourse('certificateTitle')}
            </h3>
            <p className={styles.certificateInfo}>
              {tVariant('certificateText')}
            </p>
          </div>
        </div>
      </section>
      
      <section className={styles.roadmapSection}>
        <h2 className={styles.sectionTitle}>{tCourse('programTitle')}</h2>
        <p className={styles.sectionDescription}>
          {tCourse('programDescription', { modules: course.modules.length, lessons: totalLessons })}
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
                      {tCourse('moduleLabel', { order: module.order })}
                    </div>
                    <h3 className={styles.moduleTitle}>{module.title}</h3>
                    <p className={styles.moduleDescription}>{module.description}</p>
                  </div>
                </div>
                <div className={styles.moduleHeaderRight}>
                  <div className={styles.moduleMeta}>
                    <span>{tCourse('moduleWeeks', { count: module.duration.weeks })}</span>
                    <span>•</span>
                    <span>{tCourse('moduleLessons', { count: module.lessons.length })}</span>
                  </div>
                  <ChevronRight 
                    className={`${styles.expandIcon} ${expandedModule === moduleIndex ? styles.expanded : ''}`}
                  />
                </div>
              </div>
              
              {expandedModule === moduleIndex && (
                <div className={styles.moduleContent}>
                  <div className={styles.learningOutcomes}>
                    <h4>{tCourse('learnTitle')}</h4>
                    <ul>
                      {module.learningOutcomes.map((outcome, idx) => (
                        <li key={idx}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.lessonsList}>
                    <h4>{tCourse('lessonsTitle')}</h4>
                    {module.lessons.map((lesson) => {
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
                                {tCourse('lessonLabel', { order: lesson.order })}
                              </div>
                              <div className={styles.lessonTitle}>{lesson.title}</div>
                              {lesson.isProject && (
                                <span className={styles.projectBadge}>{tCourse('projectBadge')}</span>
                              )}
                            </div>
                          </div>
                          <div className={styles.lessonItemRight}>
                            <span className={styles.lessonTime}>
                              {tCourse('minutes', { count: lesson.estimatedTime })}
                            </span>
                            {quizScore !== null && (
                              <span className={styles.quizScore} style={{
                                color: lessonColor === 'green' ? '#10b981' :
                                       lessonColor === 'yellow' ? '#f59e0b' :
                                       '#ef4444'
                              }}>
                                {tCourse('quizScore', { score: quizScore })}
                              </span>
                            )}
                            {!unlocked && (
                              <span className={styles.lockedLabel}>{tCourse('locked')}</span>
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
      
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>{tCourse('ctaTitle')}</h2>
          <p className={styles.ctaDescription}>
            {tCourse('ctaDescription', { progress })}
          </p>
          <Link 
            href={`/courses/${courseId}`}
            className={styles.ctaButton}
          >
            <Play className="w-5 h-5" />
            {tCourse('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default CoursePage
