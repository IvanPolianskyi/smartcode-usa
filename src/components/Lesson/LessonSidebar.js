'use client'

import React, { useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { ChevronRight, ChevronLeft, GripVertical, CheckCircle2, Play, Lock } from 'lucide-react'
import styles from './LessonPage.module.css'

export default function LessonSidebar({
  curriculum,
  lessonId,
  courseId,
  lessonModuleIndex,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  isSidebarClosed,
  setIsSidebarClosed,
  sidebarWidth,
  setSidebarWidth,
  isResizing,
  setIsResizing,
  isLessonCompleted,
  isLessonUnlocked,
  t,
}) {
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
    localStorage.setItem('lessonSidebarCollapsed', (!isSidebarCollapsed).toString())
  }

  const toggleSidebarOpen = () => {
    const newClosed = !isSidebarClosed
    setIsSidebarClosed(newClosed)
    localStorage.setItem('lessonSidebarClosed', newClosed.toString())
  }

  const handleResizeStart = (e) => {
    e.preventDefault()
    setIsResizing(true)
    document.body.classList.add('resizing-sidebar')
  }

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e) => {
      const minWidth = 240
      const maxWidth = 500
      const newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX))
      setSidebarWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.classList.remove('resizing-sidebar')
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.classList.remove('resizing-sidebar')
    }
  }, [isResizing, setSidebarWidth, setIsResizing])

  return (
    <>
      {/* Floating button when closed */}
      {isSidebarClosed && (
        <button
          type="button"
          className={styles.sidebarFloatingToggle}
          onClick={toggleSidebarOpen}
          aria-label={t('openMenu') || 'Open navigation menu'}
          title={t('openMenu')}
        >
          <ChevronRight className={styles.toggleIcon} aria-hidden="true" />
        </button>
      )}

      {/* Toggle button when open */}
      {!isSidebarClosed && (
        <button
          type="button"
          className={styles.sidebarToggle}
          style={{ left: isSidebarCollapsed ? '45px' : `calc(${sidebarWidth}px - 25px)` }}
          onClick={toggleSidebar}
          aria-label={
            isSidebarCollapsed
              ? t('expandMenu') || 'Expand menu'
              : t('collapseMenu') || 'Collapse menu'
          }
          title={isSidebarCollapsed ? t('expandMenu') : t('collapseMenu')}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className={styles.toggleIcon} aria-hidden="true" />
          ) : (
            <ChevronLeft className={styles.toggleIcon} aria-hidden="true" />
          )}
        </button>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''} ${
          isSidebarClosed ? styles.closed : ''
        }`}
        style={{
          width: isSidebarClosed ? '0px' : isSidebarCollapsed ? '60px' : `${sidebarWidth}px`,
          '--sidebar-width': `${sidebarWidth}px`,
        }}
        aria-label="Course navigation"
      >
        {/* Resize Handle */}
        {!isSidebarCollapsed && (
          <div
            className={styles.resizeHandle}
            onMouseDown={handleResizeStart}
            role="separator"
            aria-orientation="vertical"
            tabIndex={0}
            title={t('resizeMenu')}
          >
            <GripVertical className={styles.resizeIcon} aria-hidden="true" />
          </div>
        )}

        <div className={styles.sidebarHeader}>
          {!isSidebarCollapsed && <h3>{t('sidebarTitle')}</h3>}
        </div>
        {!isSidebarCollapsed && (
          <nav className={styles.sidebarNav}>
            {(curriculum?.modules || []).map((module, moduleIndex) => {
              return (
                <div key={module.moduleId || moduleIndex} className={styles.moduleSection}>
                  <div className={styles.moduleHeader}>
                    <span className={styles.moduleTitle}>
                      {t('sidebarModule', { order: module.order, title: module.title })}
                    </span>
                  </div>
                  <div className={styles.lessonsList}>
                    {(module.lessons || []).map((l) => {
                      const isCompleted = isLessonCompleted(l.lessonId)
                      const isUnlocked = isLessonUnlocked(l)
                      const isActive = l.lessonId === lessonId

                      return (
                        <Link
                          key={l.lessonId}
                          href={`/courses/${courseId}/lessons/${l.lessonId}`}
                          className={`${styles.lessonLink} ${isActive ? styles.active : ''} ${
                            !isUnlocked ? styles.locked : ''
                          } ${isCompleted ? styles.completed : ''}`}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={(e) => {
                            if (!isUnlocked) {
                              e.preventDefault()
                            }
                          }}
                        >
                          <div className={styles.lessonLinkContent}>
                            {isCompleted ? (
                              <CheckCircle2
                                className={`${styles.lessonIcon} text-green-500`}
                                aria-hidden="true"
                              />
                            ) : isUnlocked ? (
                              <Play className={styles.lessonIcon} aria-hidden="true" />
                            ) : (
                              <Lock className={styles.lessonIcon} aria-hidden="true" />
                            )}
                            <span className={styles.lessonNumber}>{l.order}</span>
                            <span className={styles.lessonTitle}>{l.title}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </nav>
        )}
      </aside>
    </>
  )
}
