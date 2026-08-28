'use client'

import React, { useMemo } from 'react'
import { Target, Lock, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { markdownToHtml } from '@/lib/markdownToHtml'
import Pip from '@/components/Mascot/Pip'
import styles from './LessonPage.module.css'

export default function LessonQuiz({
  fullLesson,
  t,
  practiceCompleted = false,
  setActiveTab,
  quizAnswers = {},
  handleQuizAnswer,
  quizSubmitted = false,
  handleQuizSubmit,
  quizScore = null,
  isQuizPassed = false,
  isSaving = false,
}) {
  const renderedQuestions = useMemo(() => {
    return (fullLesson.quiz?.questions || []).map((question) => ({
      ...question,
      htmlQuestion: markdownToHtml(question.question || ''),
      htmlExplanation: question.explanation ? markdownToHtml(question.explanation) : '',
      renderedOptions: (question.options || []).map((option) => markdownToHtml(option || '')),
    }))
  }, [fullLesson.quiz?.questions])

  if (!practiceCompleted && fullLesson.practiceTask) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.practiceError}>
          <Lock className="w-5 h-5" aria-hidden="true" />
          <div>
            <strong>{t('quizLockedTitle')}</strong>
            <p>{t('quizLockedDescription')}</p>
            <button
              type="button"
              className={styles.ctaButton}
              onClick={() => setActiveTab('practice')}
              style={{ marginTop: '1rem' }}
            >
              {t('goToPractice')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!fullLesson.quiz?.questions?.length) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.noContent}>
          <p>{t('noQuizYet') || 'No quiz available for this lesson.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.tabContent}>
      <div className={`${styles.quizHeader} navigable-block`}>
        <h3 className={styles.sectionTitle}>
          <Target className="w-5 h-5" aria-hidden="true" />
          {t('quizTitle')}
        </h3>
        <p className={styles.quizInfo}>
          {t('quizInfo', {
            count: fullLesson.quiz.questions.length,
            passingScore: fullLesson.quiz?.passingScore || 60,
          })}
          {fullLesson.quiz.timeLimit > 0 &&
            t('quizTimeLimit', { minutes: fullLesson.quiz.timeLimit })}
        </p>
      </div>

      <div className={styles.quizQuestions}>
        {renderedQuestions.map((question, index) => {
          const userAnswer = quizAnswers[question.id]
          const isCorrect =
            userAnswer !== undefined &&
            userAnswer !== null &&
            Number(userAnswer) === Number(question.correctAnswer)
          const showAnswer = quizSubmitted

          return (
            <div
              key={question.id}
              className={`${styles.quizQuestion} navigable-block ${
                showAnswer ? (isCorrect ? styles.correct : styles.incorrect) : ''
              }`}
            >
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>
                  {t('questionNumber', { number: index + 1 })}
                </span>
                {showAnswer && (
                  <span className={styles.questionResult} role="status" aria-live="polite">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-green-500" aria-hidden="true" />{' '}
                        {t('correct')}
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-500" aria-hidden="true" />{' '}
                        {t('incorrect')}
                      </>
                    )}
                  </span>
                )}
              </div>

              <div
                className={styles.questionText}
                dangerouslySetInnerHTML={{ __html: question.htmlQuestion }}
              />

              {question.type === 'code_reading' && question.code && (
                <pre className={styles.questionCode}>
                  <code>{question.code}</code>
                </pre>
              )}

              <div
                className={styles.questionOptions}
                role="radiogroup"
                aria-label={`Question ${index + 1} options`}
              >
                {question.renderedOptions.map((optHtml, optionIndex) => {
                  const isSelected =
                    userAnswer !== undefined &&
                    userAnswer !== null &&
                    Number(userAnswer) === optionIndex
                  const isCorrectAnswer = optionIndex === Number(question.correctAnswer)

                  return (
                    <button
                      type="button"
                      key={optionIndex}
                      role="radio"
                      aria-checked={isSelected}
                      className={`${styles.optionButton} ${
                        isSelected ? styles.selected : ''
                      } ${showAnswer && isCorrectAnswer ? styles.correctAnswer : ''} ${
                        showAnswer && isSelected && !isCorrect ? styles.wrongAnswer : ''
                      }`}
                      onClick={() => handleQuizAnswer(question.id, optionIndex)}
                      disabled={quizSubmitted}
                    >
                      <span className={styles.optionLetter} aria-hidden="true">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span
                        className={styles.optionText}
                        dangerouslySetInnerHTML={{ __html: optHtml }}
                      />
                      {showAnswer && isCorrectAnswer && (
                        <CheckCircle2
                          className={`${styles.optionIcon} text-green-500`}
                          aria-hidden="true"
                        />
                      )}
                      {showAnswer && isSelected && !isCorrect && (
                        <XCircle
                          className={`${styles.optionIcon} text-red-500`}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              {showAnswer && question.htmlExplanation && (
                <div
                  className={styles.questionExplanation}
                  dangerouslySetInnerHTML={{
                    __html: `<strong>${t('explanation')}</strong> ${question.htmlExplanation}`,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      <div className={styles.quizActions}>
        {!quizSubmitted ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              width: '100%',
            }}
          >
            <button
              type="button"
              className={styles.submitButton}
              onClick={handleQuizSubmit}
              disabled={
                isSaving || Object.keys(quizAnswers).length < fullLesson.quiz.questions.length
              }
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  {t('saving') || 'Saving...'}
                </>
              ) : (
                t('submitQuiz')
              )}
            </button>
            {Object.keys(quizAnswers).length < fullLesson.quiz.questions.length && (
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                ({Object.keys(quizAnswers).length}/{fullLesson.quiz.questions.length})
              </span>
            )}
          </div>
        ) : (
          <div id="quiz-results" className={styles.quizResults} role="status" aria-live="polite">
            <div className={styles.scoreCard}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Pip
                  mood={isQuizPassed ? 'cheer' : 'sad'}
                  size={72}
                  label={isQuizPassed ? 'Pip celebrating quiz pass' : 'Pip encouraging quiz retake'}
                />
              </div>
              <h4>{t('yourScore')}</h4>
              <div className={styles.scoreValue}>{quizScore}%</div>
              <div className={styles.scoreStatus}>
                {isQuizPassed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-500" aria-hidden="true" />{' '}
                    {t('quizPassed')}
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" aria-hidden="true" />{' '}
                    {t('quizFailed')}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
