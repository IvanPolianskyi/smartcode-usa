'use client'

import React, { useMemo } from 'react'
import { Play, Code, AlertCircle, XCircle, CheckCircle2, Lightbulb } from 'lucide-react'
import { markdownToHtml } from '@/lib/markdownToHtml'
import InteractiveBlock from '@/components/Lesson/Interactive/InteractiveBlock'
import styles from './LessonPage.module.css'

export default function LessonTheory({
  fullLesson,
  t,
  completedInteractiveIds = [],
  pendingInteractiveId = null,
  submitInteractive,
}) {
  const renderedSections = useMemo(() => {
    return (fullLesson.theory?.sections || []).map((section) => ({
      ...section,
      htmlContent: markdownToHtml(section.content || ''),
    }))
  }, [fullLesson.theory?.sections])

  return (
    <div className={styles.tabContent}>
      {/* Video Placeholder */}
      {fullLesson.videoUrl && (
        <div className={styles.videoSection}>
          <div className={styles.videoPlaceholder}>
            <Play className="w-16 h-16" aria-hidden="true" />
            <p>{t('videoLesson')}</p>
          </div>
        </div>
      )}

      {/* Theory Sections */}
      {renderedSections.map((section, index) => (
        <div key={index} className={`${styles.theorySection} navigable-block`}>
          <h3 className={styles.theorySectionTitle}>{section.title}</h3>
          <div
            className={styles.theoryContent}
            dangerouslySetInnerHTML={{ __html: section.htmlContent }}
          />
          {(section.interactives || []).map((interactive) => (
            <InteractiveBlock
              key={interactive.id}
              interactive={interactive}
              moduleId={fullLesson.moduleId}
              completedIds={completedInteractiveIds}
              pendingId={pendingInteractiveId}
              onSubmit={submitInteractive}
            />
          ))}
        </div>
      ))}

      {/* Code Examples */}
      {fullLesson.codeExamples && fullLesson.codeExamples.length > 0 && (
        <div className={`${styles.codeExamplesSection} navigable-block`}>
          <h3 className={styles.sectionTitle}>
            <Code className="w-5 h-5" aria-hidden="true" />
            {t('codeExamplesTitle')}
          </h3>
          {fullLesson.codeExamples.map((example, index) => (
            <div key={index} className={styles.codeExample}>
              <h4 className={styles.codeExampleTitle}>{example.title}</h4>
              <pre className={styles.codeBlock}>
                <code>{example.code}</code>
              </pre>
              <p className={styles.codeExplanation}>{example.explanation}</p>
            </div>
          ))}
        </div>
      )}

      {/* Common Mistakes */}
      {fullLesson.commonMistakes && fullLesson.commonMistakes.length > 0 && (
        <div className={`${styles.mistakesSection} navigable-block`}>
          <h3 className={styles.sectionTitle}>
            <AlertCircle className="w-5 h-5" aria-hidden="true" />
            {t('mistakesTitle')}
          </h3>
          {fullLesson.commonMistakes.map((mistake, index) => (
            <div key={index} className={styles.mistakeItem}>
              <div className={styles.mistakeHeader}>
                <XCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
                <strong>{mistake.mistake}</strong>
              </div>
              <p className={styles.mistakeExplanation}>{mistake.explanation}</p>
              <div className={styles.mistakeCorrect}>
                <CheckCircle2 className="w-5 h-5 text-green-500" aria-hidden="true" />
                <strong>{t('correctLabel')}</strong> {mistake.correctApproach}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {fullLesson.summary && (
        <div className={`${styles.summarySection} navigable-block`}>
          <h3 className={styles.sectionTitle}>
            <Lightbulb className="w-5 h-5" aria-hidden="true" />
            {t('summaryTitle')}
          </h3>
          <div className={styles.summaryContent}>
            {fullLesson.summary.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
