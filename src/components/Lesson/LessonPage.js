'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Link, useRouter } from '@/i18n/navigation'
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Lock,
  Loader2,
} from 'lucide-react'
import { updateProgress, updateProgressWithRewards } from '@/lib/authClient'
import { useLocale, useTranslations } from 'next-intl'
import { checkPracticeOutputs } from '@/lib/practiceValidation'
import { parsePracticeStdin } from '@/lib/parsePracticeStdin'
import { hasBlockedPythonCode } from '@/lib/pythonCodeGuard'
import { useLessonGamification } from '@/hooks/useLessonGamification'
import AchievementToast from '@/components/Lesson/Gamification/AchievementToast'
import LessonSidebar from './LessonSidebar'
import LessonNav from './LessonNav'
import LessonTheory from './LessonTheory'
import LessonQuiz from './LessonQuiz'
import styles from './LessonPage.module.css'

const LessonPractice = dynamic(() => import('./LessonPractice'), {
  loading: () => (
    <div className={styles.tabContent}>
      <div className={styles.noContent}>
        <p>Loading practice environment...</p>
      </div>
    </div>
  ),
  ssr: false,
})

const LessonPage = ({
  lessonId,
  lesson: initialLesson = null,
  curriculum = null,
  courseId = 'python-developer-zero-to-junior',
  userProgress = null,
  isPurchased = false,
  userRole = 'user',
  isAccessible = false,
  allowedLessons = [],
}) => {
  const locale = useLocale()
  const t = useTranslations('lms.lesson')
  const tCommon = useTranslations('lms.common')
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('theory')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(null)
  const [showPracticeSolution, setShowPracticeSolution] = useState(false)
  const [revealedSolution, setRevealedSolution] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [codeExecution, setCodeExecution] = useState({
    isRunning: false,
    output: null,
    error: null,
    success: null,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  const [practiceChecked, setPracticeChecked] = useState(false)
  const [outputErrors, setOutputErrors] = useState([])
  const [failedExampleIndexes, setFailedExampleIndexes] = useState([])
  const [practiceTestCount, setPracticeTestCount] = useState(0)
  const [isPyodideLoading, setIsPyodideLoading] = useState(false)

  // Gamification: XP, streak and badges
  const {
    gamification,
    completedIds: completedInteractiveIds,
    pendingId: pendingInteractiveId,
    submitInteractive,
    applyRewards,
    toasts,
    dismissToast,
  } = useLessonGamification({
    courseId,
    lessonId,
    locale,
    initialGamification: userProgress?.gamification || null,
  })

  // Sidebar state
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isSidebarClosed, setIsSidebarClosed] = useState(false)
  const [sidebarPrefsHydrated, setSidebarPrefsHydrated] = useState(false)

  const modulesList = useMemo(() => curriculum?.modules || [], [curriculum])

  const allLessons = useMemo(() => {
    return modulesList.flatMap((m) => m.lessons || [])
  }, [modulesList])

  const curriculumLesson = useMemo(() => {
    return allLessons.find((l) => l.lessonId === lessonId) || null
  }, [allLessons, lessonId])

  const lesson = initialLesson || curriculumLesson || null

  const isCompleted = userProgress?.completedLessons?.includes(lessonId) || false

  const nextLesson = useMemo(() => {
    const currentIndex = allLessons.findIndex((l) => l.lessonId === lessonId)
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1]
    }
    return null
  }, [allLessons, lessonId])

  const prevLesson = useMemo(() => {
    const currentIndex = allLessons.findIndex((l) => l.lessonId === lessonId)
    if (currentIndex > 0) {
      return allLessons[currentIndex - 1]
    }
    return null
  }, [allLessons, lessonId])

  useEffect(() => {
    setIsLoaded(true)

    if (
      Array.isArray(userProgress?.completedPracticeTasks)
        ? userProgress.completedPracticeTasks.includes(lessonId)
        : false
    ) {
      setPracticeCompleted(true)
    }

    if (userProgress?.completedQuizzes?.[lessonId]) {
      const quizData = userProgress.completedQuizzes[lessonId]
      setQuizScore(quizData.score)
      setQuizSubmitted(true)
      if (quizData.answers) {
        const normalizedAnswers = {}
        Object.keys(quizData.answers).forEach((key) => {
          const value = quizData.answers[key]
          normalizedAnswers[key] =
            value !== undefined && value !== null ? Number(value) : value
        })
        setQuizAnswers(normalizedAnswers)
      }
    }
  }, [lessonId, userProgress])

  useEffect(() => {
    if (isLoaded && lesson) {
      const moduleId = lesson.moduleId
      if ((moduleId === 'module-11' || moduleId === 'module-12') && !lesson.practiceTask) {
        setActiveTab('quiz')
      }
    }
  }, [isLoaded, lesson])

  useEffect(() => {
    const savedWidth = localStorage.getItem('lessonSidebarWidth')
    if (savedWidth) {
      const width = parseInt(savedWidth, 10)
      if (!Number.isNaN(width) && width > 0) {
        setSidebarWidth(width)
      }
    }

    const savedCollapsed = localStorage.getItem('lessonSidebarCollapsed')
    if (savedCollapsed === 'true') {
      setIsSidebarCollapsed(true)
    }

    const savedClosed = localStorage.getItem('lessonSidebarClosed')
    if (savedClosed !== null) {
      setIsSidebarClosed(savedClosed === 'true')
    } else if (window.innerWidth <= 1024) {
      setIsSidebarClosed(true)
      localStorage.setItem('lessonSidebarClosed', 'true')
    }

    setSidebarPrefsHydrated(true)
  }, [])

  useEffect(() => {
    if (!sidebarPrefsHydrated || isResizing || !sidebarWidth) return
    localStorage.setItem('lessonSidebarWidth', sidebarWidth.toString())
  }, [sidebarWidth, isResizing, sidebarPrefsHydrated])

  useEffect(() => {
    if (!sidebarPrefsHydrated) return

    const handleResize = () => {
      const isMobile = window.innerWidth <= 1024
      if (isMobile) {
        setIsSidebarClosed((closed) => {
          if (closed) return closed
          localStorage.setItem('lessonSidebarClosed', 'true')
          return true
        })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarPrefsHydrated])

  const fullLesson = useMemo(() => {
    return (
      lesson || {
        ...curriculumLesson,
        theory: { sections: [] },
        codeExamples: [],
        practiceTask: null,
        quiz: { questions: [] },
        commonMistakes: [],
        summary: '',
      }
    )
  }, [lesson, curriculumLesson])

  const lessonInteractives = useMemo(() => {
    return (fullLesson.theory?.sections || []).flatMap(
      (section) => section.interactives || []
    )
  }, [fullLesson.theory?.sections])

  const lessonModuleIndex = useMemo(() => {
    return modulesList.findIndex((m) =>
      (m.lessons || []).some((l) => l.lessonId === lessonId)
    )
  }, [modulesList, lessonId])

  const currentModule = lessonModuleIndex >= 0 ? modulesList[lessonModuleIndex] : null

  const explicitAllowedSet = useMemo(() => new Set(allowedLessons || []), [allowedLessons])
  const hasAccess =
    userRole === 'admin' ||
    userRole === 'teacher' ||
    isAccessible ||
    explicitAllowedSet.has(lessonId)

  const isLessonCompleted = useCallback(
    (id) => userProgress?.completedLessons?.includes(id) || false,
    [userProgress?.completedLessons]
  )

  const isLessonUnlocked = useCallback(
    (l) => {
      if (userRole === 'admin' || userRole === 'teacher') return true
      return explicitAllowedSet.has(l.lessonId)
    },
    [userRole, explicitAllowedSet]
  )

  if (!lesson && !curriculumLesson) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>{t('notFound')}</h2>
          <Link href={`/courses/${courseId}`}>{t('returnToCourse')}</Link>
        </div>
      </div>
    )
  }

  const lockedDescription = isPurchased
    ? t('lockedDescriptionDrip')
    : courseId === 'roblox-studio'
      ? t('lockedDescriptionRoblox')
      : courseId === 'python-developer-zero-to-junior'
        ? t('lockedDescriptionPython')
        : t('lockedDescription')

  if (!hasAccess) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href={`/courses/${courseId}`} className={styles.backButton}>
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            {t('backToCourse')}
          </Link>
        </header>
        <div className={styles.error}>
          <Lock className="w-16 h-16" style={{ marginBottom: '1rem', opacity: 0.5 }} aria-hidden="true" />
          <h2>{t('lockedTitle')}</h2>
          <p style={{ marginBottom: '2rem', textAlign: 'center', maxWidth: '500px' }}>
            {lockedDescription}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {!isPurchased && (
              <Link
                href={`/plans/${courseId}`}
                className={styles.nextLessonButton}
                style={{ textDecoration: 'none' }}
              >
                Start 3 days free trial
              </Link>
            )}
            <Link
              href={`/courses/${courseId}`}
              className={styles.backButton}
              style={{ textDecoration: 'none' }}
            >
              {t('backToCourse')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleQuizSubmit = async (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (!fullLesson.quiz || !fullLesson.quiz.questions) return

    let correct = 0
    fullLesson.quiz.questions.forEach((q) => {
      const userAnswer = quizAnswers[q.id]
      const isCorrect =
        userAnswer !== undefined &&
        userAnswer !== null &&
        Number(userAnswer) === Number(q.correctAnswer)
      if (isCorrect) {
        correct++
      }
    })

    const score = Math.round((correct / fullLesson.quiz.questions.length) * 100)
    setQuizScore(score)
    setQuizSubmitted(true)

    const scrollPosition = window.scrollY || window.pageYOffset

    setIsSaving(true)
    try {
      const quizRewards = await updateProgressWithRewards(courseId, {
        action: 'completeQuiz',
        lessonId,
        quizAnswers,
        locale,
      })
      applyRewards(quizRewards)

      const passingScore = fullLesson.quiz?.passingScore || 60
      if (score >= passingScore) {
        await updateProgress(courseId, {
          action: 'completeLesson',
          lessonId,
          locale,
        })
      }

      router.refresh()

      setTimeout(() => {
        const quizResultsElement = document.getElementById('quiz-results')
        if (quizResultsElement) {
          const headerOffset = window.innerWidth > 1024 ? 100 : 0
          const elementPosition =
            quizResultsElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        } else {
          window.scrollTo({
            top: scrollPosition,
            behavior: 'instant',
          })
        }
      }, 300)
    } catch (error) {
      console.error('Error saving progress:', error)
      alert(t('progressError'))
    } finally {
      setIsSaving(false)
    }
  }

  const handleQuizAnswer = (questionId, answerIndex) => {
    if (quizSubmitted) return
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const isQuizPassed =
    quizScore !== null && quizScore >= (fullLesson.quiz?.passingScore || 60)

  const handleRunCode = async () => {
    if (!userCode.trim()) {
      setCodeExecution({
        isRunning: false,
        output: null,
        error: t('runCodeErrors.emptyCode'),
        success: false,
      })
      return
    }

    const moduleId = fullLesson?.moduleId || curriculumLesson?.moduleId

    if (hasBlockedPythonCode(userCode, moduleId)) {
      setCodeExecution({
        isRunning: false,
        output: null,
        error: t('runCodeErrors.dangerousCode'),
        success: false,
      })
      return
    }

    if (userCode.length > 50000) {
      setCodeExecution({
        isRunning: false,
        output: null,
        error: t('runCodeErrors.codeTooLong'),
        success: false,
      })
      return
    }

    setCodeExecution({
      isRunning: true,
      output: null,
      error: null,
      success: null,
    })
    setPracticeChecked(false)
    setOutputErrors([])
    setFailedExampleIndexes([])
    setPracticeTestCount(0)
    setIsPyodideLoading(true)

    try {
      const { executePythonWithPyodide } = await import('@/lib/pyodideRunner')

      const examples = fullLesson.practiceTask?.examples?.length
        ? fullLesson.practiceTask.examples
        : [null]

      const runMessages = {
        timeout: t('runCodeErrors.executionTimeout'),
        workerError: t('runCodeErrors.workerError'),
        workerStartFailed: t('runCodeErrors.workerStartFailed'),
      }

      const outputs = []
      let lastError = null
      let anySuccess = false

      for (let i = 0; i < examples.length; i++) {
        const example = examples[i]
        const stdinData = example?.input ? parsePracticeStdin(example.input) : ''

        const data = await executePythonWithPyodide(userCode, {
          stdin: stdinData,
          moduleId,
          onLoading: () => setIsPyodideLoading(true),
          messages: runMessages,
        })

        outputs.push(data.output || '')
        if (data.errorOutput) lastError = data.errorOutput
        if (data.success) anySuccess = true
      }

      setIsPyodideLoading(false)

      const displayOutput =
        outputs.length > 1
          ? outputs
              .map((out, i) =>
                `=== ${t('testCaseLabel', { number: i + 1 })} ===\n${out}`.trimEnd()
              )
              .join('\n\n')
          : outputs[0] || ''

      const checkResult = fullLesson.practiceTask?.examples?.length
        ? checkPracticeOutputs(outputs, fullLesson.practiceTask)
        : { isCorrect: null, errors: [], failedExampleIndexes: [] }

      setCodeExecution({
        isRunning: false,
        output: displayOutput,
        error: lastError,
        success: anySuccess && !lastError,
      })

      if (checkResult.isCorrect !== null) {
        setPracticeChecked(true)
        setOutputErrors(checkResult.errors)
        setFailedExampleIndexes(checkResult.failedExampleIndexes || [])
        setPracticeTestCount(examples.length)
        setPracticeCompleted(Boolean(checkResult.isCorrect))

        if (checkResult.isCorrect) {
          try {
            const rewards = await updateProgressWithRewards(courseId, {
              action: 'completePracticeTask',
              lessonId,
              practiceOutput: outputs[0] || '',
              practiceOutputs: outputs,
              hintsUsed: revealedSolution,
              locale,
            })
            applyRewards(rewards)
            router.refresh()
          } catch (error) {
            console.error('Error saving practice task completion:', error)
            setPracticeCompleted(false)
          }
        }
      }
    } catch (error) {
      console.error('Error executing student Python:', error)
      setIsPyodideLoading(false)
      let message = t('runCodeErrors.executionFailed')
      if (error?.message === 'PYODIDE_LOAD_FAILED') {
        message = t('runCodeErrors.pyodideLoadFailed')
      }
      setCodeExecution({
        isRunning: false,
        output: null,
        error: message,
        success: false,
      })
      setPracticeChecked(false)
      setOutputErrors([])
      setFailedExampleIndexes([])
      setPracticeTestCount(0)
      setPracticeCompleted(
        Boolean(
          Array.isArray(userProgress?.completedPracticeTasks)
            ? userProgress.completedPracticeTasks.includes(lessonId)
            : false
        )
      )
    }
  }

  const handleCodeKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      if (!codeExecution.isRunning) {
        handleRunCode()
      }
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = e.target
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const value = userCode
      const indent = '    '
      const indentSize = 4

      if (e.shiftKey) {
        const lines = value.split('\n')
        const startLine = value.substring(0, start).split('\n').length - 1
        const endLine = value.substring(0, end).split('\n').length - 1

        let newValue = ''
        let newStart = start
        let newEnd = end
        let removedChars = 0

        for (let i = 0; i < lines.length; i++) {
          if (i >= startLine && i <= endLine) {
            const line = lines[i]
            const leadingSpaces = line.match(/^(\s*)/)[1].length
            if (leadingSpaces >= indentSize) {
              const newLine = line.substring(indentSize)
              newValue += newLine
              if (i < lines.length - 1) newValue += '\n'
              if (i === startLine) {
                removedChars = Math.min(indentSize, leadingSpaces)
                newStart = start - removedChars
              }
              newEnd -= Math.min(indentSize, leadingSpaces)
            } else {
              newValue += line
              if (i < lines.length - 1) newValue += '\n'
            }
          } else {
            newValue += lines[i]
            if (i < lines.length - 1) newValue += '\n'
          }
        }

        setUserCode(newValue)
        setTimeout(() => {
          textarea.selectionStart = Math.max(0, newStart)
          textarea.selectionEnd = Math.max(0, newEnd)
        }, 0)
      } else {
        if (start === end) {
          const newValue = value.substring(0, start) + indent + value.substring(end)
          setUserCode(newValue)
          setTimeout(() => {
            textarea.selectionStart = start + indent.length
            textarea.selectionEnd = start + indent.length
          }, 0)
        } else {
          const lines = value.split('\n')
          const startLine = value.substring(0, start).split('\n').length - 1
          const endLine = value.substring(0, end).split('\n').length - 1

          let newValue = ''
          let newStart = start + indent.length
          let newEnd = end

          for (let i = 0; i < lines.length; i++) {
            if (i >= startLine && i <= endLine) {
              newValue += indent + lines[i]
              newEnd += indent.length
            } else {
              newValue += lines[i]
            }
            if (i < lines.length - 1) newValue += '\n'
          }

          setUserCode(newValue)
          setTimeout(() => {
            textarea.selectionStart = newStart
            textarea.selectionEnd = newEnd
          }, 0)
        }
      }
    }
  }

  const handleCompleteLesson = async () => {
    setIsSaving(true)
    try {
      await updateProgress(courseId, {
        action: 'completeLesson',
        lessonId,
        locale,
      })

      if (nextLesson) {
        router.push(`/courses/${courseId}/lessons/${nextLesson.lessonId}`)
      } else {
        router.push(`/courses/${courseId}`)
      }
    } catch (error) {
      console.error('Error completing lesson:', error)
      alert(t('progressError'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={styles.pageContainer}>
      <AchievementToast toasts={toasts} onDismiss={dismissToast} />

      <LessonSidebar
        curriculum={curriculum}
        lessonId={lessonId}
        courseId={courseId}
        lessonModuleIndex={lessonModuleIndex}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isSidebarClosed={isSidebarClosed}
        setIsSidebarClosed={setIsSidebarClosed}
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
        isResizing={isResizing}
        setIsResizing={setIsResizing}
        isLessonCompleted={isLessonCompleted}
        isLessonUnlocked={isLessonUnlocked}
        t={t}
      />

      <div className={`${styles.pageWrapper} ${isResizing ? styles.resizing : ''}`}>
        <div className={styles.mainContent}>
          <div className={styles.container}>
            <LessonNav
              courseId={courseId}
              currentModule={currentModule}
              fullLesson={fullLesson}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              practiceCompleted={practiceCompleted}
              userProgress={userProgress}
              lessonId={lessonId}
              gamification={gamification}
              lessonInteractives={lessonInteractives}
              completedInteractiveIds={completedInteractiveIds}
              isCompleted={isCompleted}
              t={t}
              tCommon={tCommon}
            />

            <div className={styles.content}>
              <div
                id="panel-theory"
                role="tabpanel"
                aria-labelledby="tab-theory"
                hidden={activeTab !== 'theory'}
              >
                {activeTab === 'theory' && (
                  <LessonTheory
                    fullLesson={fullLesson}
                    t={t}
                    completedInteractiveIds={completedInteractiveIds}
                    pendingInteractiveId={pendingInteractiveId}
                    submitInteractive={submitInteractive}
                  />
                )}
              </div>

              <div
                id="panel-practice"
                role="tabpanel"
                aria-labelledby="tab-practice"
                hidden={activeTab !== 'practice'}
              >
                {activeTab === 'practice' && (
                  <LessonPractice
                    fullLesson={fullLesson}
                    t={t}
                    userCode={userCode}
                    setUserCode={setUserCode}
                    handleCodeKeyDown={handleCodeKeyDown}
                    handleRunCode={handleRunCode}
                    codeExecution={codeExecution}
                    isPyodideLoading={isPyodideLoading}
                    showPracticeSolution={showPracticeSolution}
                    setShowPracticeSolution={setShowPracticeSolution}
                    setRevealedSolution={setRevealedSolution}
                    outputErrors={outputErrors}
                    failedExampleIndexes={failedExampleIndexes}
                    practiceTestCount={practiceTestCount}
                    practiceChecked={practiceChecked}
                    practiceCompleted={practiceCompleted}
                  />
                )}
              </div>

              <div
                id="panel-quiz"
                role="tabpanel"
                aria-labelledby="tab-quiz"
                hidden={activeTab !== 'quiz'}
              >
                {activeTab === 'quiz' && (
                  <LessonQuiz
                    fullLesson={fullLesson}
                    t={t}
                    practiceCompleted={practiceCompleted}
                    setActiveTab={setActiveTab}
                    quizAnswers={quizAnswers}
                    handleQuizAnswer={handleQuizAnswer}
                    quizSubmitted={quizSubmitted}
                    handleQuizSubmit={handleQuizSubmit}
                    quizScore={quizScore}
                    isQuizPassed={isQuizPassed}
                    isSaving={isSaving}
                  />
                )}
              </div>
            </div>

            {/* Navigation Footer */}
            <footer className={styles.footer}>
              {prevLesson ? (
                <Link
                  href={`/courses/${courseId}/lessons/${prevLesson.lessonId}`}
                  className={styles.prevLessonButton}
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  {t('prevLesson')}
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link
                  href={`/courses/${courseId}/lessons/${nextLesson.lessonId}`}
                  className={styles.nextLessonButton}
                >
                  {t('nextLesson')}
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              ) : (
                <button
                  type="button"
                  className={styles.completeLessonButton}
                  onClick={handleCompleteLesson}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  )}
                  {t('finishCourse')}
                </button>
              )}
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonPage
