"use client"
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
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
  Globe,
} from 'lucide-react'
import { getCurriculum } from '@/lib/getCurriculum'
import { getRobloxCurriculum } from '@/lib/robloxCurriculumLocale'
import { ROBOX_PHASES } from '@/lib/robloxModuleMeta'
import { getUserProgress, checkCoursePurchase } from '@/lib/authClient'
import { getUnlockedLessonSet, hasStudentCourseAccess } from '@/lib/courseLessonAccess'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from './CoursePage.module.css'

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
  const [hasAutoExpanded, setHasAutoExpanded] = useState(false)
  const [lockedTip, setLockedTip] = useState('')
  const [userProgress, setUserProgress] = useState(initialProgress)
  const [user, setUser] = useState(null)
  const [isPurchased, setIsPurchased] = useState(false)

  const course = useMemo(() => {
    if (courseId === 'roblox-studio') return getRobloxCurriculum(locale)
    return getCurriculum(courseId, locale)
  }, [courseId, locale])

  const hasCourseAccess = useMemo(
    () => hasStudentCourseAccess(user, courseId) || isPurchased,
    [user, courseId, isPurchased]
  )
  const isEnrolled = hasCourseAccess && userProgress !== null
  const progress = userProgress?.overallProgress || 0
  const totalWeeks = course.modules.reduce((sum, m) => sum + (m?.duration?.weeks || 0), 0)
  const totalLessons = course.modules.reduce(
    (sum, m) => sum + (Array.isArray(m?.lessons) ? m.lessons.length : 0),
    0
  )

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
        const purchased = await checkCoursePurchase(courseId)
        if (cancelled) return
        setIsPurchased(purchased || sessionUser.role === 'admin')
        const canLoadProgress =
          sessionUser.role === 'admin' ||
          purchased ||
          hasStudentCourseAccess(sessionUser, courseId)
        if (!canLoadProgress) {
          setUserProgress(null)
          return
        }
        const progressData = await getUserProgress(courseId)
        if (cancelled) return
        if (progressData) setUserProgress(progressData)
        else setUserProgress(null)
      } catch {
        if (!cancelled) setIsPurchased(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [sessionLoading, sessionUser, courseId, course.modules])

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

  const unlockedLessons = useMemo(
    () =>
      getUnlockedLessonSet({
        courseId,
        profile: user?.studentProfile,
        progress: userProgress,
        isAdmin: user?.role === 'admin',
        isTeacher: user?.role === 'teacher',
        isPurchased: isPurchased || user?.role === 'teacher',
        isEnrolled,
      }),
    [courseId, user?.studentProfile, user?.role, userProgress, isPurchased, isEnrolled]
  )

  const isLessonUnlocked = useCallback(
    (lesson) => unlockedLessons.has(lesson.lessonId),
    [unlockedLessons]
  )

  const continueLesson = useMemo(() => {
    for (let moduleIndex = 0; moduleIndex < course.modules.length; moduleIndex++) {
      for (const lesson of course.modules[moduleIndex].lessons) {
        if (isLessonUnlocked(lesson) && !isLessonCompleted(lesson.lessonId)) {
          return lesson
        }
      }
    }
    for (let moduleIndex = 0; moduleIndex < course.modules.length; moduleIndex++) {
      for (const lesson of course.modules[moduleIndex].lessons) {
        if (isLessonUnlocked(lesson)) return lesson
      }
    }
    return course.modules[0]?.lessons[0] ?? null
  }, [course.modules, userProgress, isLessonUnlocked])

  const continueHref = continueLesson
    ? `/courses/${courseId}/lessons/${continueLesson.lessonId}`
    : `#module-${course.modules[0]?.moduleId ?? 'start'}`

  useEffect(() => {
    if (!isLoaded || hasAutoExpanded || !continueLesson) return
    if (typeof window !== 'undefined' && window.location.hash?.startsWith('#module-')) {
      setHasAutoExpanded(true)
      return
    }
    const idx = course.modules.findIndex((mod) =>
      (mod.lessons || []).some((l) => l.lessonId === continueLesson.lessonId)
    )
    if (idx >= 0) {
      setExpandedModule(idx)
      setHasAutoExpanded(true)
    }
  }, [isLoaded, hasAutoExpanded, continueLesson, course.modules])

  const isRoblox = courseId === 'roblox-studio'

  const moduleProgress = useMemo(() => {
    return course.modules.map((mod) => {
      const lessons = mod.lessons || []
      const done = lessons.filter((l) => isLessonCompleted(l.lessonId)).length
      return {
        moduleId: mod.moduleId,
        done,
        total: lessons.length,
        pct: lessons.length ? Math.round((done / lessons.length) * 100) : 0,
        phase: mod.phase || null,
        tagline: mod.tagline || '',
      }
    })
  }, [course.modules, userProgress])

  const phaseStats = useMemo(() => {
    if (!isRoblox) return []
    const map = new Map()
    course.modules.forEach((mod, idx) => {
      const phase = mod.phase || 'A'
      if (!map.has(phase)) {
        map.set(phase, { phase, done: 0, total: 0, moduleIndexes: [] })
      }
      const row = map.get(phase)
      const mp = moduleProgress[idx]
      row.done += mp.done
      row.total += mp.total
      row.moduleIndexes.push(idx)
    })
    return Array.from(map.values())
  }, [isRoblox, course.modules, moduleProgress])

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
    <div className={`${styles.container} ${isLoaded ? styles.loaded : ''}`}>
      <section className={styles.heroSection}>
        <div className={styles.particles} aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className={styles.particle}
              style={{
                '--particle-size': `${4 + (i % 5) * 2}px`,
                '--particle-left': `${(i * 17 + 7) % 100}%`,
                '--particle-top': `${(i * 23 + 11) % 100}%`,
                '--particle-duration': `${6 + (i % 4) * 2}s`,
                '--particle-delay': `${i * -0.35}s`,
              }}
            />
          ))}
        </div>

        <div className={styles.heroContent}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">{tCommon('breadcrumb.home')}</Link>
            <ChevronRight className="w-4 h-4" aria-hidden />
            <span>{tCommon('breadcrumb.courses')}</span>
            <ChevronRight className="w-4 h-4" aria-hidden />
            <span className={styles.breadcrumbCurrent}>{course.title}</span>
          </nav>

          <div className={styles.heroMain}>
            <div className={styles.heroLeft}>
              <h1 className={styles.title}>{course.title}</h1>
              <p className={styles.valueProposition}>{tVariant('valueProposition')}</p>

              <div className={styles.ctaRow}>
                <Link href={continueHref} className={styles.continueBtn} prefetch={false}>
                  <Play className="w-6 h-6" fill="currentColor" aria-hidden />
                  {tCourse('continueLearning')}
                </Link>
                {continueLesson && (
                  <p className={styles.continueHint}>
                    {tCourse('continueHint', { title: continueLesson.title })}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.progressCard}>
                <div className={styles.progressHeader}>
                  <span>{tCourse('progressLabel')}</span>
                  <span className={styles.progressPercent}>{progress}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <p className={styles.progressHint}>
                  {progress === 0
                    ? tCourse('progressStart')
                    : tCourse('progressLessons', {
                        done: userProgress?.completedLessons?.length || 0,
                        total: totalLessons,
                      })}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} data-tone="blue">
                <Clock className="w-6 h-6" aria-hidden />
              </div>
              <div className={styles.statText}>
                <span className={styles.statNumber}>{totalWeeks}</span>
                <span className={styles.statUnit}>{tCommon('stats.weeks')}</span>
                <span className={styles.statCaption}>{tCourse('statLearning')}</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} data-tone="purple">
                <BookOpen className="w-6 h-6" aria-hidden />
              </div>
              <div className={styles.statText}>
                <span className={styles.statNumber}>{totalLessons}</span>
                <span className={styles.statUnit}>{tCommon('stats.lessons')}</span>
                <span className={styles.statCaption}>{tCourse('statMaterials')}</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} data-tone="pink">
                <Target className="w-6 h-6" aria-hidden />
              </div>
              <div className={styles.statText}>
                <span className={styles.statNumber}>{course.modules.length}</span>
                <span className={styles.statUnit}>{tCommon('stats.modules')}</span>
                <span className={styles.statCaption}>{tCourse('statKnowledge')}</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} data-tone="gold">
                <Award className="w-6 h-6" aria-hidden />
              </div>
              <div className={styles.statText}>
                <span className={styles.statNumber}>{tCommon('stats.certificate')}</span>
                <span className={styles.statCaption}>{tCourse('statCertHint')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.roadmapSection} id="course-program">
        <h2 className={styles.sectionTitle}>{tCourse('programTitle')}</h2>
        <p className={styles.sectionDescription}>
          {tCourse('programDescription', { modules: course.modules.length, lessons: totalLessons })}
        </p>

        {isRoblox && phaseStats.length > 0 && (
          <div className={styles.phaseRoadmap} aria-label={tCourse('phaseRoadmapLabel')}>
            {phaseStats.map((p) => {
              const phaseInfo = ROBOX_PHASES.find((x) => x.id === p.phase)
              const phaseTitle = phaseInfo?.titleUk
              return (
                <button
                  key={p.phase}
                  type="button"
                  className={styles.phaseChip}
                  title={phaseTitle || p.phase}
                  onClick={() => {
                    const first = p.moduleIndexes[0]
                    if (first != null) {
                      setExpandedModule(first)
                      const id = course.modules[first]?.moduleId
                      if (id) {
                        document.getElementById(`module-${id}`)?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        })
                      }
                    }
                  }}
                >
                  <span className={styles.phaseLetter}>
                    {p.phase}
                    {phaseTitle ? (
                      <span className={styles.phaseName}> · {phaseTitle}</span>
                    ) : null}
                  </span>
                  <span className={styles.phaseMeta}>
                    {p.done}/{p.total}
                  </span>
                  <span
                    className={styles.phaseBar}
                    style={{
                      '--phase-pct': `${p.total ? Math.round((p.done / p.total) * 100) : 0}%`,
                    }}
                  />
                </button>
              )
            })}
          </div>
        )}

        {lockedTip && (
          <p className={styles.lockedTip} role="status">
            {lockedTip}
          </p>
        )}

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
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex)
                  }
                }}
                aria-expanded={expandedModule === moduleIndex}
              >
                <div className={styles.moduleHeaderLeft}>
                  <div className={styles.moduleIcon}>
                    {getModuleIcon(module.order)}
                  </div>
                  <div>
                    <div className={styles.moduleNumber}>
                      {tCourse('moduleLabel', { order: moduleIndex + 1 })}
                      {module.tagline ? (
                        <span className={styles.moduleTagline}> · {module.tagline}</span>
                      ) : null}
                    </div>
                    <h3 className={styles.moduleTitle}>{module.title}</h3>
                    <p className={styles.moduleDescription}>{module.description}</p>
                    {moduleProgress[moduleIndex] && (
                      <div className={styles.moduleProgressRow}>
                        <div className={styles.moduleProgressTrack}>
                          <div
                            className={styles.moduleProgressFill}
                            style={{ width: `${moduleProgress[moduleIndex].pct}%` }}
                          />
                        </div>
                        <span className={styles.moduleProgressLabel}>
                          {moduleProgress[moduleIndex].done}/{moduleProgress[moduleIndex].total}
                        </span>
                      </div>
                    )}
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
                    aria-hidden
                  />
                </div>
              </div>

              {expandedModule === moduleIndex && (
                <div className={styles.moduleContent}>
                  <div className={styles.learningOutcomes}>
                    <h4>{tCourse('learnTitle')}</h4>
                    <ul>
                      {(Array.isArray(module.learningOutcomes) ? module.learningOutcomes : []).map((outcome, idx) => (
                        <li key={idx}>{outcome}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.lessonsList}>
                    <h4>{tCourse('lessonsTitle')}</h4>
                    {module.lessons.map((lesson) => {
                      const completed = isLessonCompleted(lesson.lessonId)
                      const unlocked = isLessonUnlocked(lesson)
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
                          title={!unlocked ? tCourse('lockedLessonHint') : undefined}
                          onClick={(e) => {
                            if (!unlocked) {
                              e.preventDefault()
                              setLockedTip(tCourse('lockedLessonHint'))
                              window.setTimeout(() => setLockedTip(''), 4000)
                            }
                          }}
                        >
                          <div className={styles.lessonItemLeft}>
                            {completed ? (
                              <CheckCircle2 className="w-5 h-5" aria-hidden />
                            ) : unlocked ? (
                              <Play className="w-5 h-5" aria-hidden />
                            ) : (
                              <Lock className="w-5 h-5" aria-hidden />
                            )}
                            <div>
                              <div className={styles.lessonNumber}>
                                {tCourse('lessonLabel', { order: lesson.order })}
                              </div>
                              <div className={styles.lessonTitle}>{lesson.title}</div>
                              {lesson.isCheckpoint && (
                                <span className={styles.checkpointBadge}>
                                  {tCourse('checkpointBadge')}
                                </span>
                              )}
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
          <Link href={continueHref} className={styles.ctaButton} prefetch={false}>
            <Play className="w-5 h-5" fill="currentColor" aria-hidden />
            {tCourse('continueLearning')}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default CoursePage
