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
  isLessonUnlocked,
  isLessonCompleted,
  children,
}) {
  const t = useTranslations('lms.lesson')

  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)
  const [isSidebarClosed, setIsSidebarClosed] = useState(false)
  const [sidebarPrefsHydrated, setSidebarPrefsHydrated] = useState(false)

  useEffect(() => {
    const savedWidth = localStorage.getItem('lessonSidebarWidth')
    if (savedWidth) {
      const width = parseInt(savedWidth, 10)
      if (!Number.isNaN(width) && width >= 50) {
        setSidebarWidth(width)
      }
    }

    // Drop a stale "collapsed" flag from older builds: that mode hid the nav
    // while the reopen control still looked like it had opened the menu.
    localStorage.removeItem('lessonSidebarCollapsed')

    const savedClosed = localStorage.getItem('lessonSidebarClosed')
    if (savedClosed !== null) {
      setIsSidebarClosed(savedClosed === 'true')
    }

    setSidebarPrefsHydrated(true)
  }, [])

  useEffect(() => {
    if (!sidebarPrefsHydrated || isResizing || sidebarWidth < 50) return
    localStorage.setItem('lessonSidebarWidth', sidebarWidth.toString())
  }, [sidebarWidth, isResizing, sidebarPrefsHydrated])

  const openSidebar = (width = sidebarWidth) => {
    const nextWidth = width >= 50 ? width : 320
    setIsSidebarClosed(false)
    setSidebarWidth(nextWidth)
    localStorage.setItem('lessonSidebarClosed', 'false')
    localStorage.setItem('lessonSidebarWidth', nextWidth.toString())
  }

  const closeSidebar = () => {
    setIsSidebarClosed(true)
    localStorage.setItem('lessonSidebarClosed', 'true')
  }

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

        if (newWidth < 50) {
          currentWidth = 0
          isClosed = true
          setIsSidebarClosed(true)
          setSidebarWidth(0)
        } else if (newWidth <= maxWidth) {
          currentWidth = newWidth
          isClosed = false
          setSidebarWidth(newWidth)
          setIsSidebarClosed(false)
        } else {
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
      if (currentWidth >= 50) {
        localStorage.setItem('lessonSidebarWidth', currentWidth.toString())
      }
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

    const savedWidth = sidebarWidth >= 50 ? sidebarWidth : 320
    let currentWidth = 0
    let isClosed = true

    let rafId = null

    const handleMouseMove = (moveEvent) => {
      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const maxWidth = Math.min(600, window.innerWidth * 0.5)
        const next = Math.max(0, moveEvent.clientX)

        if (next >= 50 && next <= maxWidth) {
          currentWidth = next
          isClosed = false
          setSidebarWidth(next)
          setIsSidebarClosed(false)
        } else if (next > maxWidth) {
          currentWidth = maxWidth
          isClosed = false
          setSidebarWidth(maxWidth)
          setIsSidebarClosed(false)
        } else if (next > 0 && next < 50) {
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
      if (!isClosed && currentWidth >= 50) {
        localStorage.setItem('lessonSidebarWidth', currentWidth.toString())
        localStorage.setItem('lessonSidebarClosed', 'false')
      } else {
        localStorage.setItem('lessonSidebarWidth', savedWidth.toString())
        localStorage.setItem('lessonSidebarClosed', 'true')
        setIsSidebarClosed(true)
        setSidebarWidth(savedWidth)
      }
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
      openSidebar(sidebarWidth)
    } else {
      closeSidebar()
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
          aria-label={t('openMenu')}
        >
          <ChevronRight className={styles.toggleIcon} />
        </button>
      )}

      {!isSidebarClosed && (
        <button
          type="button"
          className={styles.sidebarToggle}
          style={{
            left: `calc(${Math.max(sidebarWidth, 50)}px - 25px)`,
          }}
          onClick={toggleSidebar}
          title={t('collapseMenu')}
          aria-label={t('collapseMenu')}
        >
          <ChevronLeft className={styles.toggleIcon} />
        </button>
      )}

      <div className={`${styles.pageWrapper} ${isResizing ? styles.resizing : ''}`}>
        <aside
          className={`${styles.sidebar} ${isSidebarClosed ? styles.closed : ''}`}
          style={{
            width: isSidebarClosed ? '0px' : `${Math.max(sidebarWidth, 50)}px`,
            '--sidebar-width': `${Math.max(sidebarWidth, 50)}px`,
          }}
        >
          {!isSidebarClosed && (
            <div
              className={styles.resizeHandle}
              onMouseDown={handleResizeStart}
              title={t('resizeMenu')}
            >
              <GripVertical className={styles.resizeIcon} />
            </div>
          )}

          <div className={styles.sidebarHeader}>
            <h3>{t('sidebarTitle')}</h3>
          </div>

          <nav className={styles.sidebarNav}>
            {(curriculum?.modules || []).map((module) => (
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
                        title={!unlocked ? t('sidebarLockedHint') : undefined}
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
        </aside>

        <div className={styles.mainContent}>{children}</div>
      </div>
    </>
  )
}
