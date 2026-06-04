'use client'

import React, { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Play,
  Lock,
  GripVertical,
} from 'lucide-react'
import styles from './LessonPage.module.css'

/**
 * Course lesson layout with resizable module/lesson sidebar (same as Python LMS).
 */
export default function LessonPageWithSidebar({
  courseId,
  curriculum,
  currentLessonId,
  lessonModuleIndex,
  isLessonUnlocked,
  isLessonCompleted,
  children,
}) {
  const t = useTranslations('lms.lesson')

  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isSidebarClosed, setIsSidebarClosed] = useState(false)
  const [sidebarPrefsHydrated, setSidebarPrefsHydrated] = useState(false)

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
    } else if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
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
      if (window.innerWidth <= 1024) {
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

  const handleResizeStart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)

    const startX = e.clientX
    const startWidth = isSidebarClosed ? 0 : sidebarWidth
    let currentWidth = startWidth
    let isClosed = isSidebarClosed

    let rafId = null

    const handleMouseMove = (moveEvent) => {
      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const diff = moveEvent.clientX - startX
        const newWidth = Math.max(0, startWidth + diff)
        const maxWidth = Math.min(600, window.innerWidth * 0.5)

        if (newWidth <= 0) {
          currentWidth = 0
          isClosed = true
          setIsSidebarClosed(true)
          setSidebarWidth(0)
        } else if (newWidth > 0 && newWidth < 50) {
          currentWidth = 50
          isClosed = false
          setSidebarWidth(50)
          setIsSidebarClosed(false)
        } else if (newWidth >= 50 && newWidth <= maxWidth) {
          currentWidth = newWidth
          isClosed = false
          setSidebarWidth(newWidth)
          setIsSidebarClosed(false)
        } else if (newWidth > maxWidth) {
          currentWidth = maxWidth
          isClosed = false
          setSidebarWidth(maxWidth)
          setIsSidebarClosed(false)
        }
      })
    }

    const handleMouseUp = () => {
      if (rafId) cancelAnimationFrame(rafId)
      setIsResizing(false)
      localStorage.setItem('lessonSidebarWidth', currentWidth.toString())
      localStorage.setItem('lessonSidebarClosed', isClosed.toString())
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.body.style.pointerEvents = ''
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.body.style.pointerEvents = 'auto'
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleEdgeDragStart = (e) => {
    if (!isSidebarClosed) return

    e.preventDefault()
    setIsResizing(true)

    const startX = e.clientX
    const savedWidth = sidebarWidth > 0 ? sidebarWidth : 320
    let currentWidth = 0
    let isClosed = true

    let rafId = null

    const handleMouseMove = (moveEvent) => {
      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const newWidth = Math.max(0, moveEvent.clientX)
        const maxWidth = Math.min(600, window.innerWidth * 0.5)

        if (newWidth >= 50 && newWidth <= maxWidth) {
          currentWidth = newWidth
          isClosed = false
          setSidebarWidth(newWidth)
          setIsSidebarClosed(false)
        } else if (newWidth > maxWidth) {
          currentWidth = maxWidth
          isClosed = false
          setSidebarWidth(maxWidth)
          setIsSidebarClosed(false)
        } else if (newWidth < 50 && newWidth > 0) {
          currentWidth = 50
          isClosed = false
          setSidebarWidth(50)
          setIsSidebarClosed(false)
        }
      })
    }

    const handleMouseUp = () => {
      if (rafId) cancelAnimationFrame(rafId)
      setIsResizing(false)
      localStorage.setItem(
        'lessonSidebarWidth',
        currentWidth > 0 ? currentWidth.toString() : savedWidth.toString()
      )
      localStorage.setItem('lessonSidebarClosed', isClosed.toString())
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseup', handleMouseUp)
  }

  const toggleSidebar = () => {
    if (isSidebarClosed) {
      setIsSidebarClosed(false)
      const savedWidth = sidebarWidth > 0 ? sidebarWidth : 320
      setSidebarWidth(savedWidth)
      localStorage.setItem('lessonSidebarClosed', 'false')
      localStorage.setItem('lessonSidebarWidth', savedWidth.toString())
    } else {
      setIsSidebarClosed(true)
      setSidebarWidth(0)
      localStorage.setItem('lessonSidebarClosed', 'true')
    }
  }

  return (
    <>
      {isSidebarClosed && (
        <div
          className={styles.edgeDragArea}
          onMouseDown={handleEdgeDragStart}
          title={t('dragOpenMenu')}
        />
      )}

      {isSidebarClosed && (
        <button
          type="button"
          className={styles.sidebarToggleClosed}
          onClick={toggleSidebar}
          title={t('openMenu')}
        >
          <ChevronRight className={styles.toggleIcon} />
        </button>
      )}

      {!isSidebarClosed && (
        <button
          type="button"
          className={styles.sidebarToggle}
          style={{
            left: isSidebarCollapsed ? '45px' : `calc(${sidebarWidth}px - 25px)`,
          }}
          onClick={toggleSidebar}
          title={isSidebarCollapsed ? t('expandMenu') : t('collapseMenu')}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className={styles.toggleIcon} />
          ) : (
            <ChevronLeft className={styles.toggleIcon} />
          )}
        </button>
      )}

      <div className={`${styles.pageWrapper} ${isResizing ? styles.resizing : ''}`}>
        <aside
          className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''} ${isSidebarClosed ? styles.closed : ''}`}
          style={{
            width: isSidebarClosed
              ? '0px'
              : isSidebarCollapsed
                ? '60px'
                : `${sidebarWidth}px`,
            '--sidebar-width': `${sidebarWidth}px`,
          }}
        >
          {!isSidebarCollapsed && (
            <div
              className={styles.resizeHandle}
              onMouseDown={handleResizeStart}
              title={t('resizeMenu')}
            >
              <GripVertical className={styles.resizeIcon} />
            </div>
          )}

          <div className={styles.sidebarHeader}>
            {!isSidebarCollapsed && <h3>{t('sidebarTitle')}</h3>}
          </div>

          {!isSidebarCollapsed && (
            <nav className={styles.sidebarNav}>
              {curriculum.modules.map((module, moduleIndex) => (
                <div key={module.moduleId} className={styles.moduleSection}>
                  <div className={styles.moduleHeader}>
                    <span className={styles.moduleTitle}>
                      {t('sidebarModule', { order: module.order, title: module.title })}
                    </span>
                  </div>
                  <div className={styles.lessonsList}>
                    {module.lessons.map((lesson) => {
                      const completed = isLessonCompleted(lesson.lessonId)
                      const unlocked = isLessonUnlocked(lesson)
                      const isActive = lesson.lessonId === currentLessonId

                      return (
                        <Link
                          key={lesson.lessonId}
                          href={`/courses/${courseId}/lessons/${lesson.lessonId}`}
                          className={`${styles.lessonLink} ${isActive ? styles.active : ''} ${!unlocked ? styles.locked : ''} ${completed ? styles.completed : ''}`}
                          onClick={(e) => {
                            if (!unlocked) e.preventDefault()
                          }}
                        >
                          <div className={styles.lessonLinkContent}>
                            {completed ? (
                              <CheckCircle2 className={styles.lessonIcon} />
                            ) : unlocked ? (
                              <Play className={styles.lessonIcon} />
                            ) : (
                              <Lock className={styles.lessonIcon} />
                            )}
                            <span className={styles.lessonNumber}>{lesson.order}</span>
                            <span className={styles.lessonTitle}>{lesson.title}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </nav>
          )}
        </aside>

        <div className={styles.mainContent}>{children}</div>
      </div>
    </>
  )
}
