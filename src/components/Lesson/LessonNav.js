'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Target,
  BookOpen,
  Code,
  Lock,
} from 'lucide-react'
import XpHud from '@/components/Lesson/Gamification/XpHud'
import styles from './LessonPage.module.css'

export default function LessonNav({
  courseId,
  currentModule,
  fullLesson,
  activeTab,
  setActiveTab,
  practiceCompleted,
  userProgress,
  lessonId,
  gamification,
  lessonInteractives = [],
  completedInteractiveIds = new Set(),
  isCompleted = false,
  t,
  tCommon,
}) {
  const isPracticeDone =
    practiceCompleted ||
    (Array.isArray(userProgress?.completedPracticeTasks)
      ? userProgress.completedPracticeTasks.includes(lessonId)
      : false)
  const isQuizLocked = !isPracticeDone && Boolean(fullLesson.practiceTask)

  return (
    <>
      <header className={styles.header}>
        <div className={styles.backButtons}>
          <Link href={`/courses/${courseId}`} className={styles.backButton}>
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            {t('backToCourse')}
          </Link>
          {currentModule && (
            <Link
              href={`/courses/${courseId}#module-${currentModule.moduleId}`}
              className={styles.backButton}
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              {t('backToModule')}
            </Link>
          )}
        </div>

        <div className={styles.headerInfo}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">{tCommon('breadcrumb.home')}</Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <Link href={`/courses/${courseId}`}>{t('breadcrumb.course')}</Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            {currentModule ? (
              <Link href={`/courses/${courseId}#module-${currentModule.moduleId}`}>
                {t('breadcrumb.module')}
              </Link>
            ) : (
              <span>{t('breadcrumb.module')}</span>
            )}
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <span aria-current="page">{t('breadcrumb.lesson')}</span>
          </nav>

          <h1 className={styles.title}>{fullLesson.title}</h1>

          <XpHud
            gamification={gamification}
            lessonQuest={{
              total: lessonInteractives.length,
              done: lessonInteractives.filter((i) =>
                completedInteractiveIds.has ? completedInteractiveIds.has(i.id) : false
              ).length,
            }}
          />

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{t('minutes', { count: fullLesson.estimatedTime || 60 })}</span>
            </div>
            {isCompleted && (
              <div className={styles.metaItem}>
                <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
                <span>{t('completed')}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Learning Objectives */}
      {fullLesson.learningObjectives && fullLesson.learningObjectives.length > 0 && (
        <section className={styles.objectivesSection} aria-labelledby="objectives-title">
          <h2 id="objectives-title" className={styles.sectionTitle}>
            <Target className="w-5 h-5" aria-hidden="true" />
            {t('objectivesTitle')}
          </h2>
          <ul className={styles.objectivesList}>
            {fullLesson.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Tabs with accessibility attributes */}
      <div className={styles.tabs} role="tablist" aria-label="Lesson steps">
        <button
          type="button"
          role="tab"
          id="tab-theory"
          aria-controls="panel-theory"
          aria-selected={activeTab === 'theory'}
          className={`${styles.tab} ${activeTab === 'theory' ? styles.active : ''}`}
          onClick={() => setActiveTab('theory')}
        >
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          {t('tabs.theory')}
        </button>

        <button
          type="button"
          role="tab"
          id="tab-practice"
          aria-controls="panel-practice"
          aria-selected={activeTab === 'practice'}
          className={`${styles.tab} ${activeTab === 'practice' ? styles.active : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          <Code className="w-4 h-4" aria-hidden="true" />
          {t('tabs.practice')}
        </button>

        <button
          type="button"
          role="tab"
          id="tab-quiz"
          aria-controls="panel-quiz"
          aria-selected={activeTab === 'quiz'}
          className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''} ${
            isQuizLocked ? styles.disabled : ''
          }`}
          onClick={() => {
            if (isQuizLocked) {
              alert(t('practiceRequiredAlert'))
              setActiveTab('practice')
            } else {
              setActiveTab('quiz')
            }
          }}
          disabled={isQuizLocked}
          title={isQuizLocked ? t('practiceRequiredTitle') : ''}
        >
          <Target className="w-4 h-4" aria-hidden="true" />
          {t('tabs.quiz')}
          {isQuizLocked && <Lock className="w-3 h-3 ml-1" aria-hidden="true" />}
        </button>
      </div>
    </>
  )
}
