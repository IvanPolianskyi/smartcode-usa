'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations, useLocale } from 'next-intl'
import {
  ArrowLeft,
  BookOpen,
  Target,
  CheckCircle2,
  Lock,
  ChevronRight,
  Code,
  Loader2,
  ClipboardCheck,
  HelpCircle,
  XCircle,
} from 'lucide-react'
import { getRobloxCurriculum } from '@/lib/robloxCurriculumLocale'
import { getRobloxLessonContent } from '@/lib/robloxLessonContent'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { updateProgress } from '@/lib/authClient'
import styles from './RobloxLessonPage.module.css'
import FloatingNavArrows from './FloatingNavArrows'
import LessonPageWithSidebar from './LessonPageWithSidebar'
import { useCopyCodeBlocks } from '@/hooks/useCopyCodeBlocks'

const STEPS = ['theory', 'practice', 'quiz']

const RobloxLessonPage = ({
  lessonId,
  courseId = 'roblox-studio',
  userProgress = null,
  isPurchased = false,
  userRole = 'user',
  isAccessible = false,
  allowedLessons = [],
  sequentialUnlock = false,
}) => {
  const t = useTranslations('lms.lesson')
  const tRoblox = useTranslations('lms.lesson.roblox')
  const locale = useLocale()
  const router = useRouter()
  const [activeStep, setActiveStep] = useState('theory')
  const [progressError, setProgressError] = useState('')
  const [gateHint, setGateHint] = useState('')
  const [markingPractice, setMarkingPractice] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(null)
  const [quizSubmitting, setQuizSubmitting] = useState(false)
  const [localProgress, setLocalProgress] = useState(userProgress)
  const [practiceChecks, setPracticeChecks] = useState({
    studio: false,
    steps: false,
    saved: false,
  })
  const panelRef = useRef(null)
  useCopyCodeBlocks(panelRef, {
    copyLabel: t('copyCode'),
    copiedLabel: t('copiedCode'),
    deps: [activeStep, lessonId, locale],
  })

  useEffect(() => {
    setLocalProgress(userProgress)
  }, [userProgress, lessonId])

  useEffect(() => {
    setPracticeChecks({ studio: false, steps: false, saved: false })
  }, [lessonId])

  const practiceChecklistReady =
    practiceChecks.studio && practiceChecks.steps && practiceChecks.saved

  const curriculum = getRobloxCurriculum(locale)
  const lessonContent = getRobloxLessonContent(lessonId, locale)
  const allLessons = useMemo(
    () => curriculum.modules.flatMap((m) => m.lessons),
    [curriculum]
  )
  const curriculumLesson = allLessons.find((l) => l.lessonId === lessonId)
  const lessonModuleIndex = curriculum.modules.findIndex((m) =>
    m.lessons.some((l) => l.lessonId === lessonId)
  )
  const currentModule = curriculum.modules[lessonModuleIndex]
  const moduleNum = Number(String(lessonId || '').match(/lesson-roblox-(\d+)/)?.[1] || 0)
  const isFirstLesson = lessonId === 'lesson-roblox-1-1'
  const showStarterTip = !isFirstLesson && moduleNum > 0 && moduleNum <= 4
  const allowedSet = useMemo(() => new Set(allowedLessons || []), [allowedLessons])

  const practiceDone =
    (Array.isArray(localProgress?.completedPracticeTasks)
      ? localProgress.completedPracticeTasks.includes(lessonId)
      : false) || false
  const quizRecord = localProgress?.completedQuizzes?.[lessonId]
  const lessonComplete = localProgress?.completedLessons?.includes(lessonId) || false

  useEffect(() => {
    if (quizRecord) {
      setQuizScore(quizRecord.score)
      setQuizSubmitted(true)
      if (quizRecord.answers) {
        const normalized = {}
        Object.keys(quizRecord.answers).forEach((key) => {
          normalized[key] = Number(quizRecord.answers[key])
        })
        setQuizAnswers(normalized)
      }
    } else {
      setQuizScore(null)
      setQuizSubmitted(false)
      setQuizAnswers({})
    }
  }, [quizRecord, lessonId])

  const unlockedLessonIds = useMemo(() => {
    const set = new Set(allowedSet)
    if (userRole === 'admin' || isPurchased) {
      allLessons.forEach((l) => set.add(l.lessonId))
      return set
    }
    if (!sequentialUnlock) return set
    const completed = new Set(localProgress?.completedLessons || [])
    for (let i = 1; i < allLessons.length; i++) {
      const prevId = allLessons[i - 1].lessonId
      if (set.has(prevId) && completed.has(prevId)) {
        set.add(allLessons[i].lessonId)
      }
    }
    return set
  }, [allowedSet, allLessons, localProgress, sequentialUnlock, userRole, isPurchased])

  const isLessonUnlocked = (lesson) => unlockedLessonIds.has(lesson.lessonId)

  const isLessonCompleted = (id) =>
    localProgress?.completedLessons?.includes(id) || false

  const handleMarkPractice = async () => {
    setMarkingPractice(true)
    setProgressError('')
    setGateHint('')
    try {
      const next = await updateProgress(courseId, {
        action: 'completePracticeTask',
        lessonId,
        locale,
      })
      setLocalProgress(
        next || {
          ...(localProgress || {}),
          completedPracticeTasks: [
            ...new Set([...(localProgress?.completedPracticeTasks || []), lessonId]),
          ],
        }
      )
      const quizReady = (lessonContent?.quiz?.questions?.length || 0) > 0
      if (quizReady) setActiveStep('quiz')
    } catch {
      setProgressError(t('progressError'))
    } finally {
      setMarkingPractice(false)
    }
  }

  const handleQuizAnswer = (questionId, answerIndex) => {
    if (quizSubmitted) return
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
  }

  const handleQuizSubmit = async () => {
    const fullLesson = lessonContent
    if (!fullLesson?.quiz?.questions?.length) return

    let correct = 0
    fullLesson.quiz.questions.forEach((q) => {
      if (Number(quizAnswers[q.id]) === Number(q.correctAnswer)) correct += 1
    })
    const score = Math.round((correct / fullLesson.quiz.questions.length) * 100)
    setQuizScore(score)
    setQuizSubmitted(true)
    setQuizSubmitting(true)
    setProgressError('')

    try {
      const passing = fullLesson.quiz.passingScore || 70
      let next = await updateProgress(courseId, {
        action: 'completeQuiz',
        lessonId,
        quizAnswers,
        locale,
      })
      if (score >= passing) {
        next =
          (await updateProgress(courseId, {
            action: 'completeLesson',
            lessonId,
            locale,
          })) || next
      }
      if (next) {
        setLocalProgress(next)
      } else {
        setLocalProgress((prev) => ({
          ...(prev || {}),
          completedQuizzes: {
            ...(prev?.completedQuizzes || {}),
            [lessonId]: { score, answers: quizAnswers },
          },
          completedLessons:
            score >= passing
              ? [...new Set([...(prev?.completedLessons || []), lessonId])]
              : prev?.completedLessons || [],
        }))
      }
    } catch {
      setProgressError(t('progressError'))
    } finally {
      setQuizSubmitting(false)
    }
  }

  if (!curriculumLesson) {
    return (
      <div className={styles.page}>
        <p>{t('notFound')}</p>
      </div>
    )
  }

  if (!isAccessible && userRole !== 'admin' && !isPurchased) {
    return (
      <div className={styles.page}>
        <div className={styles.shell}>
          <div className={styles.panel}>
            <div className={styles.lockedBox}>
              <Lock size={48} style={{ opacity: 0.4, marginBottom: '1rem' }} />
              <h2>{t('lockedTitle')}</h2>
              <p style={{ color: '#64748b', maxWidth: 480, margin: '1rem auto' }}>
                {tRoblox('lockedDescriptionUk')}
              </p>
              <div className={styles.footerActions} style={{ justifyContent: 'center' }}>
                <Link href={`/courses/${courseId}`} className={styles.btnPrimary}>
                  {t('returnToCourse')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const fullLesson = lessonContent || {
    ...curriculumLesson,
    theory: { sections: [] },
  }
  const theoryMin = fullLesson.theoryMinutes || 40
  const quizMin = fullLesson.quizMinutes || 10
  const hasQuiz = fullLesson.quiz?.questions?.length > 0
  const hasPractice = !!fullLesson.practiceTask
  const passingScore = fullLesson.quiz?.passingScore || 70
  const quizPassed = quizScore !== null && quizScore >= passingScore

  const globalLessonIndex = allLessons.findIndex((l) => l.lessonId === lessonId)
  const nextLesson =
    globalLessonIndex >= 0 ? allLessons[globalLessonIndex + 1] : null
  const nextLessonUnlocked = nextLesson && isLessonUnlocked(nextLesson)
  const completedCount = localProgress?.completedLessons?.length || 0
  const courseProgressPct = Math.min(
    100,
    Math.round((completedCount / (allLessons.length || 1)) * 100)
  )
  const isCheckpoint = !!curriculumLesson?.isCheckpoint
  const showCheckpointCelebrate = lessonComplete && isCheckpoint

  const stepLabels = {
    theory: t('tabs.theory'),
    practice: t('tabs.practice'),
    quiz: t('tabs.quiz'),
  }

  const goStep = (step) => {
    setGateHint('')
    if (step === 'quiz' && hasPractice && !practiceDone) {
      setGateHint(tRoblox('quizLockedHint'))
      setActiveStep('practice')
      return
    }
    setActiveStep(step)
  }

  const handleNextAction = () => {
    setGateHint('')
    if (activeStep === 'theory') {
      if (hasPractice) {
        setActiveStep('practice')
      } else if (hasQuiz) {
        setActiveStep('quiz')
      } else if (nextLesson && nextLessonUnlocked) {
        router.push(`/courses/${courseId}/lessons/${nextLesson.lessonId}`)
      }
    } else if (activeStep === 'practice') {
      if (hasQuiz) {
        if (!practiceDone) {
          setGateHint(tRoblox('quizLockedHint'))
        } else {
          setActiveStep('quiz')
        }
      } else if (nextLesson && nextLessonUnlocked) {
        router.push(`/courses/${courseId}/lessons/${nextLesson.lessonId}`)
      }
    } else if (activeStep === 'quiz') {
      if (nextLesson && quizPassed && nextLessonUnlocked) {
        router.push(`/courses/${courseId}/lessons/${nextLesson.lessonId}`)
      }
    }
  }

  const handlePrevAction = () => {
    if (activeStep === 'quiz') {
      if (hasPractice) {
        setActiveStep('practice')
      } else {
        setActiveStep('theory')
      }
    } else if (activeStep === 'practice') {
      setActiveStep('theory')
    }
  }

  return (
    <>
      <FloatingNavArrows
        onNextAction={handleNextAction}
        onPrevAction={handlePrevAction}
      />
      <LessonPageWithSidebar
        courseId={courseId}
        curriculum={curriculum}
        currentLessonId={lessonId}
        lessonModuleIndex={lessonModuleIndex}
        isLessonUnlocked={isLessonUnlocked}
        isLessonCompleted={isLessonCompleted}
      >
        <div className={styles.page}>
          <div className={styles.shell}>
        <Link href={`/courses/${courseId}`} className={styles.backLink}>
          <ArrowLeft size={18} />
          {t('backToCourse')}
        </Link>

        <div className={styles.heroCard}>
          <div className={styles.courseProgressStrip} aria-hidden={!allLessons.length}>
            <div className={styles.courseProgressTrack}>
              <div
                className={styles.courseProgressFill}
                style={{ width: `${courseProgressPct}%` }}
              />
            </div>
            <span className={styles.courseProgressLabel}>
              {tRoblox('courseProgress', {
                done: completedCount,
                total: allLessons.length,
                pct: courseProgressPct,
              })}
            </span>
          </div>
          {currentModule && (
            <p className={styles.moduleLabel}>
              {currentModule.tagline
                ? `${currentModule.title} · ${currentModule.tagline}`
                : currentModule.title}
            </p>
          )}
          <h1 className={styles.title}>{fullLesson.title}</h1>
          <div className={styles.metaRow}>
            <span className={styles.metaPill}>
              <BookOpen size={14} />
              {tRoblox('theoryDuration', { minutes: theoryMin })}
            </span>
            {hasQuiz && (
              <span className={styles.metaPill}>
                <HelpCircle size={14} />
                {tRoblox('quizDuration', { minutes: quizMin })}
              </span>
            )}
            {hasPractice && practiceDone && (
              <span className={`${styles.metaPill} ${styles.metaPillDone}`}>
                <ClipboardCheck size={14} />
                {tRoblox('statusPracticeDone')}
              </span>
            )}
            {hasQuiz && quizPassed && (
              <span className={`${styles.metaPill} ${styles.metaPillDone}`}>
                <Target size={14} />
                {tRoblox('statusQuizDone')}
              </span>
            )}
            {isCheckpoint && (
              <span className={`${styles.metaPill} ${styles.metaPillCheckpoint}`}>
                {tRoblox('checkpointPill')}
              </span>
            )}
            {lessonComplete && (
              <span className={`${styles.metaPill} ${styles.metaPillDone}`}>
                <CheckCircle2 size={14} />
                {t('completed')}
              </span>
            )}
            {fullLesson.comingSoon && (
              <span className={styles.metaPill}>{tRoblox('comingSoon')}</span>
            )}
          </div>
        </div>

        {(gateHint || progressError) && (
          <div
            className={`${styles.inlineNotice} ${progressError ? styles.inlineNoticeError : ''}`}
            role="status"
          >
            {progressError || gateHint}
          </div>
        )}

        {showCheckpointCelebrate && (
          <div className={styles.celebrateBanner} role="status">
            <CheckCircle2 size={22} />
            <div>
              <strong>{tRoblox('checkpointCelebrateTitle')}</strong>
              <p>{tRoblox('checkpointCelebrateBody')}</p>
            </div>
          </div>
        )}

        {showStarterTip && !fullLesson.comingSoon && (
          <div className={styles.starterTip} role="note">
            <Code size={20} />
            <div>
              <strong>{tRoblox('starterTipTitle')}</strong>
              <p>{tRoblox('starterTipBody')}</p>
            </div>
          </div>
        )}

        {!isFirstLesson && !fullLesson.comingSoon && (
          <div className={`${styles.starterTip} ${styles.desktopTip}`} role="note">
            <BookOpen size={20} />
            <div>
              <strong>{tRoblox('desktopTipTitle')}</strong>
              <p>{tRoblox('desktopTipBody')}</p>
            </div>
          </div>
        )}

        {!fullLesson.comingSoon && (
          <div className={styles.steps}>
            {STEPS.filter((s) => s !== 'practice' || hasPractice).filter(
              (s) => s !== 'quiz' || hasQuiz
            ).map((step) => {
              const done =
                (step === 'practice' && practiceDone) ||
                (step === 'quiz' && quizPassed) ||
                (step === 'theory' && (practiceDone || activeStep !== 'theory'))
              const disabled = step === 'quiz' && hasPractice && !practiceDone
              return (
                <button
                  key={step}
                  type="button"
                  className={`${styles.stepBtn} ${activeStep === step ? styles.stepBtnActive : ''} ${done ? styles.stepBtnDone : ''} ${disabled ? styles.stepBtnLocked : ''}`}
                  onClick={() => goStep(step)}
                  aria-disabled={disabled}
                  title={disabled ? tRoblox('quizLockedHint') : ''}
                >
                  {step === 'theory' && <BookOpen size={16} />}
                  {step === 'practice' && <Code size={16} />}
                  {step === 'quiz' && <Target size={16} />}
                  {stepLabels[step]}
                  {disabled && <Lock size={12} />}
                </button>
              )
            })}
          </div>
        )}

        <div className={styles.panel} ref={panelRef}>
          {fullLesson.learningObjectives?.length > 0 && activeStep === 'theory' && (
            <section className={`${styles.objectives} navigable-block`}>
              <h2>
                <Target size={18} />
                {t('objectivesTitle')}
              </h2>
              <ul>
                {fullLesson.learningObjectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </section>
          )}

          {activeStep === 'theory' &&
            fullLesson.theory?.sections?.map((section, index) => (
              <article key={index} className={`${styles.theoryBlock} navigable-block`}>
                <h3 className={styles.theoryTitle}>{section.title}</h3>
                <div
                  className={styles.theoryBody}
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(section.content) }}
                />
              </article>
            ))}

          {activeStep === 'theory' && fullLesson.commonMistakes?.length > 0 && (
            <div className={`${styles.mistakes} navigable-block`}>
              <h3>{t('mistakesTitle')}</h3>
              {fullLesson.commonMistakes.map((m, i) => (
                <div key={i} className={styles.mistakeItem}>
                  <strong>{m.mistake}</strong>
                  <p>{m.explanation}</p>
                  <p>
                    <strong>{t('correctLabel')}</strong> {m.correctApproach}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeStep === 'theory' && fullLesson.summary && (
            <div className={`${styles.summary} navigable-block`}>
              <h3>{t('summaryTitle')}</h3>
              <p>{fullLesson.summary}</p>
            </div>
          )}

          {activeStep === 'practice' && hasPractice && (
            <div className="navigable-block">
              <h3 className={styles.practiceTitle}>{fullLesson.practiceTask.title}</h3>
              <div
                className={styles.theoryBody}
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(fullLesson.practiceTask.description),
                }}
              />
              {fullLesson.practiceTask.hints?.length > 0 && (
                <div className={styles.hintBox}>
                  <p className={styles.hintBoxTitle}>{t('hintsTitle')}</p>
                  <div
                    className={styles.theoryBody}
                    dangerouslySetInnerHTML={{
                      __html: markdownToHtml(
                        fullLesson.practiceTask.hints.map((h) => `- ${h}`).join('\n')
                      ),
                    }}
                  />
                </div>
              )}
              {fullLesson.practiceTask.optionalChallenge && (
                <div className={styles.challenge}>
                  <p className={styles.challengeLabel}>{tRoblox('optionalChallenge')}</p>
                  <div
                    className={styles.challengeBody}
                    dangerouslySetInnerHTML={{
                      __html: markdownToHtml(fullLesson.practiceTask.optionalChallenge),
                    }}
                  />
                </div>
              )}
              {!practiceDone && (
                <div className={styles.practiceGate}>
                  <p className={styles.practiceGateTitle}>{tRoblox('checklistTitle')}</p>
                  <label className={styles.checkRow}>
                    <input
                      type="checkbox"
                      checked={practiceChecks.studio}
                      onChange={(e) =>
                        setPracticeChecks((prev) => ({ ...prev, studio: e.target.checked }))
                      }
                    />
                    <span>{tRoblox('checklistOpenStudio')}</span>
                  </label>
                  <label className={styles.checkRow}>
                    <input
                      type="checkbox"
                      checked={practiceChecks.steps}
                      onChange={(e) =>
                        setPracticeChecks((prev) => ({ ...prev, steps: e.target.checked }))
                      }
                    />
                    <span>{tRoblox('checklistDidSteps')}</span>
                  </label>
                  <label className={styles.checkRow}>
                    <input
                      type="checkbox"
                      checked={practiceChecks.saved}
                      onChange={(e) =>
                        setPracticeChecks((prev) => ({ ...prev, saved: e.target.checked }))
                      }
                    />
                    <span>{tRoblox('checklistSaved')}</span>
                  </label>
                  {!practiceChecklistReady ? (
                    <p className={styles.checklistHint}>{tRoblox('checklistHint')}</p>
                  ) : null}
                  <div className={styles.footerActions}>
                    <button
                      type="button"
                      className={styles.btnPrimary}
                      onClick={handleMarkPractice}
                      disabled={markingPractice || !practiceChecklistReady}
                    >
                      {markingPractice ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <ClipboardCheck size={18} />
                      )}
                      {tRoblox('markPracticeComplete')}
                    </button>
                  </div>
                </div>
              )}
              {practiceDone && (
                <p className={styles.practiceDoneMsg}>
                  <CheckCircle2 size={16} style={{ verticalAlign: 'middle' }} />{' '}
                  {tRoblox('practiceDone')}
                </p>
              )}
            </div>
          )}

          {activeStep === 'quiz' && hasQuiz && (
            <>
              {!practiceDone && hasPractice ? (
                <div className={`${styles.lockedBox} navigable-block`}>
                  <Lock size={32} />
                  <p>{tRoblox('quizLockedDescription')}</p>
                  <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={() => setActiveStep('practice')}
                  >
                    {t('goToPractice')}
                  </button>
                </div>
              ) : (
                <>
                  <div className={`${styles.quizHeader} navigable-block`}>
                    <h3>{t('quizTitle')}</h3>
                    <p className={styles.quizInfo}>
                      {t('quizInfo', {
                        count: fullLesson.quiz.questions.length,
                        passingScore,
                      })}
                      {fullLesson.quiz.timeLimit > 0 &&
                        t('quizTimeLimit', { minutes: fullLesson.quiz.timeLimit })}
                    </p>
                  </div>

                  {fullLesson.quiz.questions.map((question, index) => {
                    const userAnswer = quizAnswers[question.id]
                    const isCorrect =
                      userAnswer !== undefined &&
                      Number(userAnswer) === Number(question.correctAnswer)
                    const show = quizSubmitted

                    return (
                      <div
                        key={question.id}
                        className={`${styles.quizQuestion} navigable-block ${show ? (isCorrect ? styles.quizQuestionCorrect : styles.quizQuestionWrong) : ''}`}
                      >
                        <div className={styles.questionHead}>
                          <span>{t('questionNumber', { number: index + 1 })}</span>
                          {show &&
                            (isCorrect ? (
                              <span style={{ color: '#059669' }}>
                                <CheckCircle2 size={16} /> {t('correct')}
                              </span>
                            ) : (
                              <span style={{ color: '#dc2626' }}>
                                <XCircle size={16} /> {t('incorrect')}
                              </span>
                            ))}
                        </div>
                        <div
                          className={styles.questionText}
                          dangerouslySetInnerHTML={{
                            __html: markdownToHtml(question.question),
                          }}
                        />
                        <div className={styles.options}>
                          {question.options.map((option, oi) => {
                            const selected =
                              userAnswer !== undefined && Number(userAnswer) === oi
                            const isAns = oi === Number(question.correctAnswer)
                            return (
                              <button
                                key={oi}
                                type="button"
                                className={`${styles.optionBtn} ${selected ? styles.optionSelected : ''} ${show && isAns ? styles.optionCorrect : ''} ${show && selected && !isCorrect ? styles.optionWrong : ''}`}
                                onClick={() => handleQuizAnswer(question.id, oi)}
                                disabled={quizSubmitted}
                              >
                                <span className={styles.optionLetter}>
                                  {String.fromCharCode(65 + oi)}
                                </span>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: markdownToHtml(option),
                                  }}
                                />
                              </button>
                            )
                          })}
                        </div>
                        {show && question.explanation && (
                          <div className={styles.explanation}>
                            <strong>{t('explanation')}</strong> {question.explanation}
                          </div>
                        )}
                      </div>
                    )
                  })}

                  <div className={styles.footerActions}>
                    {!quizSubmitted ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                        <button
                          type="button"
                          className={styles.btnPrimary}
                          onClick={handleQuizSubmit}
                          disabled={
                            quizSubmitting ||
                            Object.keys(quizAnswers).length <
                              fullLesson.quiz.questions.length
                          }
                        >
                          {quizSubmitting ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : null}
                          {t('submitQuiz')}
                        </button>
                        {Object.keys(quizAnswers).length < fullLesson.quiz.questions.length && (
                          <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                            ({Object.keys(quizAnswers).length}/{fullLesson.quiz.questions.length})
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className={styles.scoreCard} style={{ width: '100%' }}>
                        <p>{t('yourScore')}</p>
                        <div className={styles.scoreValue}>{quizScore}%</div>
                        <p style={{ fontWeight: 700 }}>
                          {quizPassed ? t('quizPassed') : t('quizFailed')}
                        </p>
                        {!quizPassed && (
                          <button
                            type="button"
                            className={styles.btnSecondary}
                            style={{ marginTop: '0.75rem' }}
                            onClick={() => {
                              setQuizAnswers({})
                              setQuizSubmitted(false)
                              setQuizScore(null)
                            }}
                          >
                            {t('retakeQuiz')}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {fullLesson.comingSoon && (
            <p style={{ color: '#64748b', textAlign: 'center' }}>{tRoblox('comingSoon')}</p>
          )}
        </div>

        <div className={styles.footerActions}>
          {lessonComplete && nextLesson && nextLessonUnlocked && (
            <Link
              href={`/courses/${courseId}/lessons/${nextLesson.lessonId}`}
              className={styles.btnPrimary}
            >
              {t('nextLesson', { title: nextLesson.title })}
              <ChevronRight size={18} />
            </Link>
          )}
          {lessonComplete && !nextLesson && (
            <Link href={`/courses/${courseId}`} className={styles.btnPrimary}>
              {tRoblox('backToRoadmap')}
              <ChevronRight size={18} />
            </Link>
          )}
          {lessonComplete && nextLesson && !nextLessonUnlocked && (
            <p className={styles.unlockHint}>
              {sequentialUnlock
                ? tRoblox('nextLockedHintSequential')
                : tRoblox('nextLockedHint')}
            </p>
          )}
          {!lessonComplete && practiceDone && hasQuiz && !quizPassed && activeStep !== 'quiz' && (
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setActiveStep('quiz')}
            >
              {tRoblox('goQuizCta')}
            </button>
          )}
          {!lessonComplete &&
            hasQuiz &&
            !quizPassed &&
            hasPractice &&
            !practiceDone &&
            activeStep === 'theory' && (
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setActiveStep('practice')}
              >
                {t('goToPractice')}
              </button>
            )}
        </div>
          </div>
        </div>
      </LessonPageWithSidebar>
    </>
  )
}

export default RobloxLessonPage
