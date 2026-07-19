'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import {
  BookOpen,
  LogOut,
  Users,
  FileText,
  RefreshCw,
  CalendarClock,
  History,
} from 'lucide-react'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { logout } from '@/lib/authClient'
import styles from './TeacherDesk.module.css'

const COURSE_CARDS = [
  {
    id: 'roblox-studio',
    titleKey: 'courses.roblox',
    href: '/courses/roblox-studio',
  },
  {
    id: 'python-developer-zero-to-junior',
    titleKey: 'courses.python',
    href: '/courses/python-developer-zero-to-junior',
  },
  {
    id: 'web-development',
    titleKey: 'courses.web',
    href: '/courses/web-development',
  },
]

function formatNextLessonWhen(startAt) {
  if (!startAt) return ''
  try {
    return new Date(startAt).toLocaleString('uk-UA', {
      timeZone: 'Europe/Kyiv',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return String(startAt)
  }
}

function videoStatusRowClass(status, stylesMap) {
  if (status === 'with_video') return stylesMap.rowWithVideo
  if (status === 'text_only') return stylesMap.rowTextOnly
  if (status === 'missing') return stylesMap.rowMissing
  return ''
}

function videoStatusBadge(status, t, stylesMap) {
  if (status === 'with_video') {
    return {
      className: `${stylesMap.badge} ${stylesMap.badgeWithVideo}`,
      label: t('history.statusWithVideo'),
    }
  }
  if (status === 'text_only') {
    return {
      className: `${stylesMap.badge} ${stylesMap.badgeTextOnly}`,
      label: t('history.statusTextOnly'),
    }
  }
  if (status === 'missing') {
    return {
      className: `${stylesMap.badge} ${stylesMap.badgeMissing}`,
      label: t('history.statusMissing'),
    }
  }
  return null
}

export default function TeacherDesk() {
  const t = useTranslations('teacher')
  const router = useRouter()
  const { user, loading: sessionLoading, refresh } = useAuthSession()
  const [tab, setTab] = useState('courses')
  const [students, setStudents] = useState([])
  const [teacherStats, setTeacherStats] = useState(null)
  const [crmError, setCrmError] = useState('')
  const [nextLesson, setNextLesson] = useState(null)
  const [loadingNextLesson, setLoadingNextLesson] = useState(false)
  const [materials, setMaterials] = useState([])
  const [lessonHistory, setLessonHistory] = useState([])
  const [historyStats, setHistoryStats] = useState(null)
  const [historyCrmError, setHistoryCrmError] = useState('')
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [loadingMaterials, setLoadingMaterials] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [selectedCode, setSelectedCode] = useState('')
  const [detail, setDetail] = useState(null)
  const [actionForm, setActionForm] = useState({
    action: 'unlockLesson',
    courseId: 'roblox-studio',
    lessonId: '',
  })
  const [saving, setSaving] = useState(false)
  const [openMaterialId, setOpenMaterialId] = useState('')

  const linked = Boolean(user?.teacherProfile?.crmStaffId)
  const recordingStats = historyStats || teacherStats

  useEffect(() => {
    if (sessionLoading) return
    if (!user) {
      router.push('/login')
      return
    }
    if (user.role !== 'teacher' && user.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [sessionLoading, user, router])

  const loadNextLesson = useCallback(async () => {
    if (!linked && user?.role !== 'admin') {
      setNextLesson(null)
      return
    }
    setLoadingNextLesson(true)
    try {
      const res = await fetch('/api/teacher/next-lesson', { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('students.error'))
      setNextLesson(data.nextLesson || null)
    } catch {
      setNextLesson(null)
    } finally {
      setLoadingNextLesson(false)
    }
  }, [linked, user?.role, t])

  const loadStudents = useCallback(async () => {
    setLoadingStudents(true)
    setError('')
    try {
      const res = await fetch('/api/teacher/students', { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('students.error'))
      setStudents(data.students || [])
      setTeacherStats(data.teacherStats || null)
      setCrmError(data.crmError || '')
    } catch (e) {
      setError(e.message || t('students.error'))
    } finally {
      setLoadingStudents(false)
    }
  }, [t])

  const loadMaterials = useCallback(async () => {
    setLoadingMaterials(true)
    setError('')
    try {
      const res = await fetch('/api/teacher/materials', { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('students.error'))
      setMaterials(data.materials || [])
    } catch (e) {
      setError(e.message || t('students.error'))
    } finally {
      setLoadingMaterials(false)
    }
  }, [t])

  const loadLessonHistory = useCallback(async () => {
    if (!linked && user?.role !== 'admin') {
      setLessonHistory([])
      setHistoryStats(null)
      return
    }
    setLoadingHistory(true)
    setHistoryCrmError('')
    try {
      const res = await fetch('/api/teacher/lessons?limit=200', { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('students.error'))
      setLessonHistory(data.lessons || [])
      setHistoryStats(data.totals || null)
      setHistoryCrmError(data.crmError || '')
    } catch (e) {
      setError(e.message || t('students.error'))
      setHistoryCrmError(e.message || t('recordings.crmError'))
      setLessonHistory([])
    } finally {
      setLoadingHistory(false)
    }
  }, [linked, user?.role, t])

  useEffect(() => {
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) return
    loadNextLesson()
    loadLessonHistory()
  }, [user, loadNextLesson, loadLessonHistory])

  useEffect(() => {
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) return
    if (tab === 'students') loadStudents()
    if (tab === 'materials') loadMaterials()
    if (tab === 'history') loadLessonHistory()
  }, [tab, user, loadStudents, loadMaterials, loadLessonHistory])

  const openDetail = async (code) => {
    setSelectedCode(code)
    setDetail(null)
    setNotice('')
    setError('')
    try {
      const res = await fetch(`/api/teacher/students/${encodeURIComponent(code)}/progress`, {
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('students.error'))
      setDetail(data)
      const firstCourse = data.courseIds?.[0] || 'roblox-studio'
      setActionForm((f) => ({ ...f, courseId: firstCourse }))
    } catch (e) {
      setError(e.message || t('students.error'))
    }
  }

  const applyAction = async () => {
    if (!selectedCode) return
    setSaving(true)
    setNotice('')
    setError('')
    try {
      const res = await fetch(
        `/api/teacher/students/${encodeURIComponent(selectedCode)}/progress`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(actionForm),
        }
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('students.error'))
      setNotice(t('students.saved'))
      setDetail((prev) => (prev ? { ...prev, progress: data.progress } : prev))
      await loadStudents()
    } catch (e) {
      setError(e.message || t('students.error'))
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      window.dispatchEvent(new Event('auth:logout'))
      router.push('/')
      router.refresh()
    } catch {}
  }

  const guideMaterials = useMemo(
    () => materials.filter((m) => m.kind === 'guide'),
    [materials]
  )
  const starterMaterials = useMemo(
    () => materials.filter((m) => m.kind === 'starter'),
    [materials]
  )

  if (sessionLoading || !user) {
    return (
      <div className={styles.page}>
        <div className={styles.shell}>{t('loading')}</div>
      </div>
    )
  }

  if (user.role !== 'teacher' && user.role !== 'admin') return null

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.btn}
              onClick={() => {
                loadNextLesson()
                loadLessonHistory()
                if (tab === 'students') loadStudents()
                if (tab === 'materials') loadMaterials()
                refresh?.(false)
              }}
            >
              <RefreshCw size={16} />
            </button>
            <button type="button" className={styles.btn} onClick={handleLogout}>
              <LogOut size={16} />
              {t('logout')}
            </button>
          </div>
        </header>

        {(linked || user.role === 'admin') && (
          <section className={styles.nextLesson} aria-label={t('nextLesson.title')}>
            <div className={styles.nextLessonHead}>
              <CalendarClock size={18} aria-hidden />
              <h2 className={styles.nextLessonTitle}>{t('nextLesson.title')}</h2>
            </div>
            {loadingNextLesson ? (
              <p className={styles.nextLessonEmpty}>{t('nextLesson.loading')}</p>
            ) : !nextLesson ? (
              <p className={styles.nextLessonEmpty}>{t('nextLesson.empty')}</p>
            ) : (
              <div className={styles.nextLessonBody}>
                <div className={styles.nextLessonInfo}>
                  <p className={styles.nextLessonWhen}>
                    <span className={styles.nextLessonKind}>{nextLesson.kindLabel}</span>
                    {formatNextLessonWhen(nextLesson.startAt)}
                  </p>
                  <p className={styles.nextLessonStudent}>
                    {t('nextLesson.with')}{' '}
                    <strong>{nextLesson.studentName}</strong>
                    {nextLesson.studentCode ? (
                      <span className={styles.codeInline}> · {nextLesson.studentCode}</span>
                    ) : null}
                    {nextLesson.groupName ? (
                      <span className={styles.muted}> · {nextLesson.groupName}</span>
                    ) : null}
                  </p>
                  {nextLesson.lmsLessonTitle ? (
                    <p className={styles.nextLessonLms}>
                      <span className={styles.nextLessonLmsLabel}>{t('nextLesson.lmsLesson')}:</span>{' '}
                      {nextLesson.courseName ? `${nextLesson.courseName} — ` : ''}
                      {nextLesson.lmsLessonTitle}
                    </p>
                  ) : (
                    <p className={styles.nextLessonLms}>{t('nextLesson.noCourse')}</p>
                  )}
                </div>
                <div className={styles.nextLessonActions}>
                  {nextLesson.openHref ? (
                    <Link
                      href={nextLesson.openHref}
                      className={`${styles.btn} ${styles.btnPrimary}`}
                    >
                      <BookOpen size={16} />
                      {t('nextLesson.openLesson')}
                    </Link>
                  ) : null}
                  {nextLesson.courseHref ? (
                    <Link href={nextLesson.courseHref} className={styles.btn}>
                      {t('nextLesson.openCourse')}
                    </Link>
                  ) : null}
                </div>
              </div>
            )}
          </section>
        )}

        {(linked || user.role === 'admin') && (recordingStats || historyCrmError) && (
          <section className={styles.recordingsSummary} aria-label={t('recordings.title')}>
            <div className={styles.recordingsHead}>
              <div className={styles.recordingsHeadText}>
                <h2 className={styles.recordingsTitle}>{t('recordings.title')}</h2>
                <p className={styles.recordingsNote}>{t('recordings.syncNote')}</p>
              </div>
              <button
                type="button"
                className={styles.refreshBtn}
                onClick={() => loadLessonHistory()}
                disabled={loadingHistory}
              >
                {t('recordings.refresh')}
              </button>
            </div>
            {historyCrmError ? (
              <p className={styles.warn}>{t('recordings.crmError')}</p>
            ) : null}
            {recordingStats ? (
              <div className={styles.statsRow}>
                <div className={`${styles.statCard} ${styles.statCardAccent}`}>
                  <span className={styles.statLabel}>{t('recordings.currentBatch')}</span>
                  <strong className={styles.statValue}>
                    {recordingStats.currentBatchRecorded ??
                      recordingStats.currentBatchVideos ??
                      0}
                  </strong>
                </div>
                {recordingStats.payoutUah != null ? (
                  <div className={styles.statCard}>
                    <span className={styles.statLabel}>{t('recordings.payoutAmount')}</span>
                    <strong className={styles.statValue}>
                      {Number(recordingStats.payoutUah).toLocaleString('uk-UA')} ₴
                    </strong>
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        )}

        <div className={styles.tabs}>
          {[
            { id: 'courses', icon: BookOpen, label: t('tabs.courses') },
            { id: 'students', icon: Users, label: t('tabs.students') },
            { id: 'history', icon: History, label: t('tabs.history') },
            { id: 'materials', icon: FileText, label: t('tabs.materials') },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.tab} ${tab === item.id ? styles.tabActive : ''}`}
              onClick={() => setTab(item.id)}
            >
              <item.icon size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              {item.label}
            </button>
          ))}
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {notice && <p className={styles.success}>{notice}</p>}

        {tab === 'courses' && (
          <div className={styles.panel}>
            <div className={styles.courseGrid}>
              {COURSE_CARDS.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <h3>{t(course.titleKey)}</h3>
                  <p className={styles.courseMeta}>{t('courses.fullAccess')}</p>
                  <Link href={course.href} className={`${styles.btn} ${styles.btnPrimary}`}>
                    {t('courses.open')}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'students' && (
          <div className={styles.panel}>
            <p className={styles.note}>{t('students.privacyNote')}</p>
            {!linked && user.role === 'teacher' && (
              <p className={styles.error}>{t('students.notLinked')}</p>
            )}
            {crmError && linked && (
              <p className={styles.warn}>{t('students.crmStatsError')}</p>
            )}
            {teacherStats && linked && (
              <div className={styles.statsRow}>
                <div className={`${styles.statCard} ${styles.statCardAccent}`}>
                  <span className={styles.statLabel}>{t('students.totalRecorded')}</span>
                  <strong className={styles.statValue}>
                    {teacherStats.currentBatchRecorded ??
                      teacherStats.currentBatchVideos ??
                      0}
                  </strong>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>{t('students.studentsCount')}</span>
                  <strong className={styles.statValue}>{students.length}</strong>
                </div>
              </div>
            )}
            {loadingStudents ? (
              <p className={styles.empty}>{t('loading')}</p>
            ) : students.length === 0 ? (
              <p className={styles.empty}>{t('students.empty')}</p>
            ) : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{t('students.name')}</th>
                      <th>{t('students.code')}</th>
                      <th>{t('students.lessonsRecorded')}</th>
                      <th>{t('students.courses')}</th>
                      <th>{t('students.progress')}</th>
                      <th>{t('students.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((row) => (
                      <tr key={row.code}>
                        <td className={styles.studentName}>{row.name || row.code}</td>
                        <td className={styles.code}>{row.code}</td>
                        <td>{row.recordedLessons ?? 0}</td>
                        <td>{(row.courseIds || []).join(', ') || '—'}</td>
                        <td>
                          {Object.keys(row.progress || {}).length === 0 ? (
                            '—'
                          ) : (
                            Object.entries(row.progress || {}).map(([courseId, p]) => (
                              <div key={courseId}>
                                {courseId}: {p.pct}%
                              </div>
                            ))
                          )}
                        </td>
                        <td>
                          {row.inLms !== false ? (
                            <button
                              type="button"
                              className={styles.btn}
                              onClick={() => openDetail(row.code)}
                            >
                              {t('students.viewProgress')}
                            </button>
                          ) : (
                            <span className={styles.muted}>{t('students.noLms')}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedCode && detail && (
              <div className={styles.drawer}>
                <h3 className={styles.drawerTitle}>
                  {detail.name || selectedCode}
                  <span className={styles.codeInline}>{selectedCode}</span>
                </h3>
                <p className={styles.drawerMeta}>
                  {t('students.lessonsRecorded')}: {detail.recordedLessons ?? 0}
                </p>
                <div className={styles.formRow}>
                  <select
                    className={styles.select}
                    value={actionForm.action}
                    onChange={(e) =>
                      setActionForm((f) => ({ ...f, action: e.target.value }))
                    }
                  >
                    <option value="unlockLesson">{t('students.unlockLesson')}</option>
                    <option value="resetLesson">{t('students.resetLesson')}</option>
                    <option value="resetCourse">{t('students.resetCourse')}</option>
                  </select>
                  <select
                    className={styles.select}
                    value={actionForm.courseId}
                    onChange={(e) =>
                      setActionForm((f) => ({ ...f, courseId: e.target.value }))
                    }
                  >
                    {(detail.courseIds?.length
                      ? detail.courseIds
                      : COURSE_CARDS.map((c) => c.id)
                    ).map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                  {actionForm.action !== 'resetCourse' && (
                    <input
                      className={styles.input}
                      placeholder={t('students.lessonId')}
                      value={actionForm.lessonId}
                      onChange={(e) =>
                        setActionForm((f) => ({ ...f, lessonId: e.target.value }))
                      }
                    />
                  )}
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    disabled={saving}
                    onClick={applyAction}
                  >
                    {t('students.apply')}
                  </button>
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={() => {
                      setSelectedCode('')
                      setDetail(null)
                    }}
                  >
                    {t('students.close')}
                  </button>
                </div>
                <pre className={styles.materialBody}>
                  {JSON.stringify(detail.progress || {}, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {tab === 'history' && (
          <div className={styles.panel}>
            <p className={styles.note}>{t('recordings.syncNote')}</p>
            {!linked && user.role === 'teacher' && (
              <p className={styles.error}>{t('history.notLinked')}</p>
            )}
            {historyCrmError && linked && (
              <p className={styles.warn}>{t('history.crmError')}</p>
            )}
            <div className={styles.historyLegend} aria-label={t('history.legendTitle')}>
              <span className={styles.legendItem}>
                <span className={`${styles.legendSwatch} ${styles.legendWithVideo}`} />
                {t('history.legendWithVideo')}
              </span>
              <span className={styles.legendItem}>
                <span className={`${styles.legendSwatch} ${styles.legendTextOnly}`} />
                {t('history.legendTextOnly')}
              </span>
              <span className={styles.legendItem}>
                <span className={`${styles.legendSwatch} ${styles.legendMissing}`} />
                {t('history.legendMissing')}
              </span>
            </div>
            {loadingHistory ? (
              <p className={styles.empty}>{t('loading')}</p>
            ) : lessonHistory.length === 0 ? (
              <p className={styles.empty}>{t('history.empty')}</p>
            ) : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{t('history.date')}</th>
                      <th>{t('history.kind')}</th>
                      <th>{t('history.student')}</th>
                      <th>{t('history.recording')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lessonHistory.map((row) => {
                      const badge = videoStatusBadge(row.videoStatus, t, styles)
                      const rowClass = videoStatusRowClass(row.videoStatus, styles)
                      return (
                        <tr key={row.id || `${row.startAt}-${row.studentCode}`} className={rowClass}>
                          <td>{formatNextLessonWhen(row.startAt)}</td>
                          <td>
                            <span className={styles.nextLessonKind}>{row.kindLabel}</span>
                          </td>
                          <td>
                            <span className={styles.studentName}>{row.studentName}</span>
                            {row.studentCode ? (
                              <span className={styles.codeInline}> · {row.studentCode}</span>
                            ) : null}
                            {row.groupName ? (
                              <div className={styles.muted}>{row.groupName}</div>
                            ) : null}
                          </td>
                          <td>
                            {badge ? (
                              <span className={badge.className}>{badge.label}</span>
                            ) : (
                              '—'
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'materials' && (
          <div className={styles.panel}>
            {loadingMaterials ? (
              <p className={styles.empty}>{t('loading')}</p>
            ) : materials.length === 0 ? (
              <p className={styles.empty}>{t('materials.empty')}</p>
            ) : (
              <>
                {guideMaterials.length > 0 && (
                  <>
                    <h3>{t('materials.guides')}</h3>
                    <div className={styles.materialList}>
                      {guideMaterials.map((m) => (
                        <div key={m.id} className={styles.materialItem}>
                          <button
                            type="button"
                            className={styles.materialHead}
                            onClick={() =>
                              setOpenMaterialId((id) => (id === m.id ? '' : m.id))
                            }
                          >
                            {m.title}
                          </button>
                          {openMaterialId === m.id && (
                            <div className={styles.materialBody}>{m.content}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {starterMaterials.length > 0 && (
                  <>
                    <h3 style={{ marginTop: '1.25rem' }}>{t('materials.starter')}</h3>
                    <div className={styles.materialList}>
                      {starterMaterials.map((m) => (
                        <div key={m.id} className={styles.materialItem}>
                          <button
                            type="button"
                            className={styles.materialHead}
                            onClick={() =>
                              setOpenMaterialId((id) => (id === m.id ? '' : m.id))
                            }
                          >
                            {m.path || m.title}
                          </button>
                          {openMaterialId === m.id && (
                            <div className={styles.materialBody}>{m.content}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
