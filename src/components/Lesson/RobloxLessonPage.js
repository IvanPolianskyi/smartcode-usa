'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations, useLocale } from 'next-intl'
import {
  ArrowLeft,
  BookOpen,
  Target,
  CheckCircle2,
  Clock,
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
import { createPayment, updateProgress } from '@/lib/authClient'
import { formatPrice, getCoursePrice } from '@/lib/coursePrices'
import styles from './RobloxLessonPage.module.css'

const STEPS = ['theory', 'practice', 'quiz']

const RobloxLessonPage = ({
  lessonId,
  courseId = 'roblox-studio',
  userProgress = null,
  isPurchased = false,
  userRole = 'user',
  isAccessible = false,
  allowedLessons = [],
}) => {
  const t = useTranslations('lms.lesson')
  const tRoblox = useTranslations('lms.lesson.roblox')
  const locale = useLocale()
  const [activeStep, setActiveStep] = useState('theory')
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [markingPractice, setMarkingPractice] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(null)
  const [quizSubmitting, setQuizSubmitting] = useState(false)

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
  const allowedSet = useMemo(() => new Set(allowedLessons || []), [allowedLessons])

  const practiceDone =
    userProgress?.completedPracticeTasks?.includes(lessonId) || false
  const quizRecord = userProgress?.completedQuizzes?.[lessonId]
  const lessonComplete = userProgress?.completedLessons?.includes(lessonId) || false

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
    }
  }, [quizRecord])

  const isLessonUnlocked = (lesson) => {
    if (userRole === 'admin' || isPurchased) return true
    return allowedSet.has(lesson.lessonId)
  }

  const handlePurchase = async () => {
    setPaymentError('')
    setIsPurchasing(true)
    try {
      const { paymentUrl } = await createPayment(courseId, locale)
      if (paymentUrl) window.location.href = paymentUrl
    } catch (e) {
      setPaymentError(e.message || t('paymentError'))
    } finally {
      setIsPurchasing(false)
    }
  }

  const handleMarkPractice = async () => {
    setMarkingPractice(true)
    try {
      await updateProgress(courseId, {
        action: 'completePracticeTask',
        lessonId,
      })
      window.location.reload()
    } catch {
      alert(t('progressError'))
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

    try {
      const passing = fullLesson.quiz.passingScore || 70
      await updateProgress(courseId, {
        action: 'completeQuiz',
        lessonId,
        quizScore: score,
        quizAnswers,
      })
      if (score >= passing) {
        await updateProgress(courseId, {
          action: 'completeLesson',
          lessonId,
        })
      }
      window.location.reload()
    } catch {
      alert(t('progressError'))
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
    const coursePrice = getCoursePrice(courseId, locale)
    return (
      <div className={styles.page}>
        <div className={styles.shell}>
          <div className={styles.panel}>
            <div className={styles.lockedBox}>
              <Lock size={48} style={{ opacity: 0.4, marginBottom: '1rem' }} />
              <h2>{t('lockedTitle')}</h2>
              <p style={{ color: '#64748b', maxWidth: 480, margin: '1rem auto' }}>
                {locale === 'en' ? tRoblox('lockedDescriptionEn') : tRoblox('lockedDescriptionUk')}
              </p>
              <div className={styles.footerActions} style={{ justifyContent: 'center' }}>
                <Link href={`/courses/${courseId}`} className={styles.btnPrimary}>
                  {t('returnToCourse')}
                </Link>
                {coursePrice?.price > 0 && coursePrice.purchasable !== false && (
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={handlePurchase}
                    disabled={isPurchasing}
                  >
                    {isPurchasing
                      ? t('processing')
                      : tRoblox('purchaseFullCourse', {
                          price: formatPrice(coursePrice.price, coursePrice.currency, locale),
                        })}
                  </button>
                )}
              </div>
              {paymentError && <p style={{ color: '#ef4444' }}>{paymentError}</p>}
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

  const lessonIndex = currentModule?.lessons.findIndex((l) => l.lessonId === lessonId) ?? 0
  const nextLesson = currentModule?.lessons[lessonIndex + 1]
  const nextLessonUnlocked =
    nextLesson && isLessonUnlocked(nextLesson)

  const stepLabels = {
    theory: t('tabs.theory'),
    practice: t('tabs.practice'),
    quiz: t('tabs.quiz'),
  }

  const goStep = (step) => {
    if (step === 'quiz' && hasPractice && !practiceDone) return
    setActiveStep(step)
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Link href={`/courses/${courseId}`} className={styles.backLink}>
          <ArrowLeft size={18} />
          {t('backToCourse')}
        </Link>

        <div className={styles.heroCard}>
          {currentModule && (
            <p className={styles.moduleLabel}>{currentModule.title}</p>
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
                  className={`${styles.stepBtn} ${activeStep === step ? styles.stepBtnActive : ''} ${done ? styles.stepBtnDone : ''}`}
                  onClick={() => goStep(step)}
                  disabled={disabled}
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

        <div className={styles.panel}>
          {fullLesson.learningObjectives?.length > 0 && activeStep === 'theory' && (
            <section className={styles.objectives}>
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
              <article key={index} className={styles.theoryBlock}>
                <h3 className={styles.theoryTitle}>{section.title}</h3>
                <div
                  className={styles.theoryBody}
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(section.content) }}
                />
              </article>
            ))}

          {activeStep === 'theory' && fullLesson.commonMistakes?.length > 0 && (
            <div className={styles.mistakes}>
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
            <div className={styles.summary}>
              <h3>{t('summaryTitle')}</h3>
              <p>{fullLesson.summary}</p>
            </div>
          )}

          {activeStep === 'practice' && hasPractice && (
            <>
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
                <div className={styles.footerActions}>
                  <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={handleMarkPractice}
                    disabled={markingPractice}
                  >
                    {markingPractice ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <ClipboardCheck size={18} />
                    )}
                    {tRoblox('markPracticeComplete')}
                  </button>
                </div>
              )}
              {practiceDone && (
                <p style={{ color: '#059669', fontWeight: 700, marginTop: '1rem' }}>
                  <CheckCircle2 size={16} style={{ verticalAlign: 'middle' }} />{' '}
                  {tRoblox('practiceDone')}
                </p>
              )}
            </>
          )}

          {activeStep === 'quiz' && hasQuiz && (
            <>
              {!practiceDone && hasPractice ? (
                <div className={styles.lockedBox}>
                  <Lock size={32} />
                  <p>{t('quizLockedDescription')}</p>
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
                  <div className={styles.quizHeader}>
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
                        className={`${styles.quizQuestion} ${show ? (isCorrect ? styles.quizQuestionCorrect : styles.quizQuestionWrong) : ''}`}
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
        </div>
      </div>
    </div>
  )
}

export default RobloxLessonPage
