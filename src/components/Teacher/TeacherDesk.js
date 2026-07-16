'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { BookOpen, LogOut, Users, FileText, RefreshCw } from 'lucide-react'
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

export default function TeacherDesk() {
  const t = useTranslations('teacher')
  const router = useRouter()
  const { user, loading: sessionLoading, refresh } = useAuthSession()
  const [tab, setTab] = useState('courses')
  const [students, setStudents] = useState([])
  const [materials, setMaterials] = useState([])
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [loadingMaterials, setLoadingMaterials] = useState(false)
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

  const loadStudents = useCallback(async () => {
    setLoadingStudents(true)
    setError('')
    try {
      const res = await fetch('/api/teacher/students', { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('students.error'))
      setStudents(data.students || [])
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

  useEffect(() => {
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) return
    if (tab === 'students') loadStudents()
    if (tab === 'materials') loadMaterials()
  }, [tab, user, loadStudents, loadMaterials])

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

        <div className={styles.tabs}>
          {[
            { id: 'courses', icon: BookOpen, label: t('tabs.courses') },
            { id: 'students', icon: Users, label: t('tabs.students') },
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
            {loadingStudents ? (
              <p className={styles.empty}>{t('loading')}</p>
            ) : students.length === 0 ? (
              <p className={styles.empty}>{t('students.empty')}</p>
            ) : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{t('students.code')}</th>
                      <th>{t('students.courses')}</th>
                      <th>{t('students.progress')}</th>
                      <th>{t('students.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((row) => (
                      <tr key={row.code}>
                        <td className={styles.code}>{row.code}</td>
                        <td>{(row.courseIds || []).join(', ') || '—'}</td>
                        <td>
                          {Object.entries(row.progress || {}).map(([courseId, p]) => (
                            <div key={courseId}>
                              {courseId}: {p.pct}%
                            </div>
                          ))}
                        </td>
                        <td>
                          <button
                            type="button"
                            className={styles.btn}
                            onClick={() => openDetail(row.code)}
                          >
                            {t('students.viewProgress')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedCode && detail && (
              <div className={styles.drawer}>
                <h3 className={styles.code}>{selectedCode}</h3>
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
