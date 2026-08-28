'use client'

import React from 'react'
import { Code, Lightbulb, Terminal, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import Pip from '@/components/Mascot/Pip'
import styles from './LessonPage.module.css'

export default function LessonPractice({
  fullLesson,
  t,
  userCode,
  setUserCode,
  handleCodeKeyDown,
  handleRunCode,
  codeExecution,
  isPyodideLoading,
  showPracticeSolution,
  setShowPracticeSolution,
  setRevealedSolution,
  outputErrors = [],
  failedExampleIndexes = [],
  practiceTestCount = 0,
  practiceChecked = false,
  practiceCompleted = false,
}) {
  if (!fullLesson.practiceTask) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.noContent}>
          <p>
            {(fullLesson?.moduleId === 'module-09' && fullLesson?.lessonId !== 'lesson-09-1') ||
            fullLesson?.moduleId === 'module-10' ||
            fullLesson?.moduleId === 'module-11' ||
            fullLesson?.moduleId === 'module-12' ||
            fullLesson?.moduleId === 'module-13'
              ? t('noPracticeAdvanced')
              : t('noPracticeYet')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.tabContent}>
      <div className={`${styles.practiceTask} navigable-block`}>
        <h3 className={styles.sectionTitle}>
          <Code className="w-5 h-5" aria-hidden="true" />
          {t('practiceTitle')}
        </h3>

        <div className={styles.taskHeader}>
          <h4>{fullLesson.practiceTask.title}</h4>
          <span className={styles.difficultyBadge}>
            {fullLesson.practiceTask.difficulty === 'beginner'
              ? t('difficulty.beginner')
              : fullLesson.practiceTask.difficulty === 'intermediate'
                ? t('difficulty.intermediate')
                : t('difficulty.advanced')}
          </span>
        </div>

        <p className={styles.taskDescription}>{fullLesson.practiceTask.description}</p>

        <div className={styles.taskSection}>
          <h5>{t('taskCondition')}</h5>
          <p>{fullLesson.practiceTask.problemStatement}</p>
        </div>

        {fullLesson.practiceTask.examples && fullLesson.practiceTask.examples.length > 0 && (
          <div className={styles.taskSection}>
            <h5>{t('examplesTitle')}</h5>
            {fullLesson.practiceTask.examples.map((example, index) => (
              <div key={index} className={styles.exampleBox}>
                {example.input && (
                  <div className={styles.exampleInput}>
                    <strong>{t('inputLabel')}</strong>
                    <pre>{example.input}</pre>
                  </div>
                )}
                <div className={styles.exampleOutput}>
                  <strong>{t('outputLabel')}</strong>
                  <pre>{example.output}</pre>
                </div>
                {example.explanation && (
                  <p className={styles.exampleExplanation}>{example.explanation}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {fullLesson.practiceTask.hints && fullLesson.practiceTask.hints.length > 0 && (
          <div className={styles.hintsSection}>
            <h5>
              <Lightbulb className="w-4 h-4" aria-hidden="true" />
              {t('hintsTitle')}
            </h5>
            <ul>
              {fullLesson.practiceTask.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.codeEditor}>
          <div className={styles.editorHeader}>
            <label htmlFor="practice-code-input">{t('yourCode')}</label>
            <button
              type="button"
              className={styles.solutionButton}
              onClick={() => {
                if (!showPracticeSolution) setRevealedSolution(true)
                setShowPracticeSolution(!showPracticeSolution)
              }}
            >
              {t('solutionToggle', {
                action: showPracticeSolution ? t('hideSolution') : t('showSolution'),
              })}
            </button>
          </div>
          <textarea
            id="practice-code-input"
            className={styles.codeInput}
            placeholder={t('codePlaceholder')}
            rows={15}
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            onKeyDown={handleCodeKeyDown}
            disabled={codeExecution.isRunning}
          />
          <button
            type="button"
            className={styles.runButton}
            onClick={handleRunCode}
            disabled={codeExecution.isRunning}
            title={`${t('runCode')} (Ctrl+Enter)`}
          >
            {codeExecution.isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                {isPyodideLoading ? t('pyodideLoading') : t('running')}
              </>
            ) : (
              <>
                <Terminal className="w-4 h-4" aria-hidden="true" />
                {t('runCode')}
              </>
            )}
          </button>
        </div>

        {/* Code Execution Results */}
        {codeExecution.output !== null || codeExecution.error ? (
          <div className={styles.executionResults}>
            <h5>
              <Terminal className="w-4 h-4" aria-hidden="true" />
              {t('executionResult')}
            </h5>
            {codeExecution.success !== false && codeExecution.output && (
              <div className={styles.executionOutput}>
                <strong>{t('outputResult')}</strong>
                <pre>
                  {codeExecution.output.split('\n').map((line, index) => {
                    const isError = outputErrors.includes(index)
                    return (
                      <React.Fragment key={index}>
                        <span
                          className={isError ? styles.outputErrorLine : ''}
                          style={{
                            color: isError ? '#ef4444' : undefined,
                            backgroundColor: isError ? 'rgba(239, 68, 68, 0.2)' : undefined,
                            padding: isError ? '2px 4px' : undefined,
                            borderRadius: isError ? '3px' : undefined,
                            display: 'inline-block',
                            width: '100%',
                          }}
                        >
                          {line || '\u00A0'}
                        </span>
                        {'\n'}
                      </React.Fragment>
                    )
                  })}
                </pre>
              </div>
            )}
            {codeExecution.error && (
              <div className={styles.executionError}>
                <strong>{t('errorLabel')}</strong>
                <pre>{codeExecution.error}</pre>
              </div>
            )}
            {codeExecution.success === false && !codeExecution.error && codeExecution.output && (
              <div className={styles.executionError}>
                <strong>{t('executionError')}</strong>
                <pre>{codeExecution.output}</pre>
              </div>
            )}
            {/* Practice verification status */}
            {practiceChecked && fullLesson.practiceTask && (
              <div
                role="status"
                aria-live="polite"
                className={practiceCompleted ? styles.practiceSuccess : styles.practiceError}
              >
                <div style={{ flexShrink: 0 }}>
                  <Pip
                    mood={practiceCompleted ? 'cheer' : 'sad'}
                    size={48}
                    label={practiceCompleted ? 'Pip cheering practice success' : 'Pip sad practice fail'}
                  />
                </div>
                <div>
                  {practiceCompleted ? (
                    <>
                      <strong>{t('practiceSuccess')}</strong>
                      <p>{t('practiceSuccessHint')}</p>
                    </>
                  ) : (
                    <>
                      <strong>{t('practiceFail')}</strong>
                      <p>{t('practiceFailHint')}</p>
                      {practiceTestCount > 1 && failedExampleIndexes.length > 0 && (
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#ef4444' }}>
                          {t('failedTestsFound', {
                            failed: failedExampleIndexes.map((i) => i + 1).join(', '),
                            total: practiceTestCount,
                          })}
                        </p>
                      )}
                      {outputErrors.length > 0 && (
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#ef4444' }}>
                          {t('outputErrorsFound', { count: outputErrors.length })}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {showPracticeSolution && fullLesson.practiceTask.solution && (
          <div className={styles.solutionSection}>
            <h5>{t('exampleSolution')}</h5>
            <pre className={styles.codeBlock}>
              <code>{fullLesson.practiceTask.solution.code}</code>
            </pre>
            <button
              type="button"
              className={styles.solutionButton}
              onClick={() => {
                setUserCode(fullLesson.practiceTask.solution.code)
                setShowPracticeSolution(false)
              }}
              style={{ marginTop: '1rem' }}
            >
              {t('insertCode')}
            </button>
            <p className={styles.solutionExplanation}>
              {fullLesson.practiceTask.solution.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
