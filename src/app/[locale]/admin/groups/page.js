'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { ArrowLeft, RefreshCw, Users, Plus, Trash2 } from 'lucide-react'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from '../AdminPanel.module.css'

function GroupCard({ group, courseNames, onSearchInput, searchQuery, studentHits, onPatch, onMember, onDelete, memberBusy, t }) {
  const [localName, setLocalName] = useState(group.name)
  const [localZoom, setLocalZoom] = useState(group.zoom_link || '')
  const [pickId, setPickId] = useState('')

  useEffect(() => {
    setLocalName(group.name)
    setLocalZoom(group.zoom_link || '')
  }, [group.name, group.zoom_link])

  const saveMeta = async () => {
    await onPatch(group.id, { name: localName.trim(), zoom_link: localZoom.trim() || null })
  }

  const studentCount = group.student_count ?? (group.students || []).length

  return (
    <div className={styles.progressCard} style={{ marginBottom: '0.75rem' }}>
      <div className={styles.certFormRow}>
        <div className={styles.certFormGroup}>
          <label className={styles.certLabel}>{t('nameLabel')}</label>
          <input className={styles.certInput} value={localName} onChange={(e) => setLocalName(e.target.value)} />
        </div>
        <div className={styles.certFormGroup}>
          <label className={styles.certLabel}>{t('zoomLabel')}</label>
          <input className={styles.certInput} type="url" value={localZoom} onChange={(e) => setLocalZoom(e.target.value)} />
        </div>
        <div className={styles.certFormActions} style={{ alignSelf: 'flex-end' }}>
          <button type="button" className={styles.certSubmitButton} onClick={saveMeta}>{t('save')}</button>
          <button type="button" className={styles.certReloadButton} onClick={() => onDelete(group.id)}><Trash2 size={16} /></button>
        </div>
      </div>
      <p className={styles.cardText}>
        {t('studentsCount', { count: studentCount })}
        {(group.schedule || []).map((s) => ` · ${s.day} ${s.time}`).join('')}
      </p>
      {(group.online_course_ids || []).length > 0 && (
        <p className={styles.noData}>{t('coursesLabel')} {(group.online_course_ids || []).map((id) => courseNames[id] || id).join(', ')}</p>
      )}
      <div className={styles.usersTable} style={{ marginTop: '0.5rem' }}>
        <table>
          <thead>
            <tr><th>{t('columns.student')}</th><th>{t('columns.code')}</th><th></th></tr>
          </thead>
          <tbody>
            {(group.students || []).map((s) => (
              <tr key={s.id}>
                <td>{s.full_name}</td>
                <td>{s.short_id}</td>
                <td>
                  <button
                    type="button"
                    className={styles.certReloadButton}
                    disabled={memberBusy[`${group.id}-${s.id}-remove`]}
                    onClick={() => onMember(group.id, s.id, 'remove')}
                  >
                    {t('remove')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.certFormRow} style={{ marginTop: '0.75rem' }}>
        <div className={styles.certFormGroup}>
          <label className={styles.certLabel}>{t('searchAddStudent')}</label>
          <input
            className={styles.certInput}
            value={searchQuery}
            onChange={(e) => onSearchInput(e.target.value)}
            placeholder={t('searchAddPlaceholder')}
          />
          {studentHits.length > 0 && (
            <select className={styles.certInput} style={{ marginTop: '0.35rem' }} value={pickId} onChange={(e) => setPickId(e.target.value)}>
              <option value="">{t('selectFromList')}</option>
              {studentHits.map((s) => (
                <option key={s.id} value={s.id}>{s.full_name} ({s.short_id})</option>
              ))}
            </select>
          )}
        </div>
        <div className={styles.certFormActions} style={{ alignSelf: 'flex-end' }}>
          <button
            type="button"
            className={styles.certSubmitButton}
            disabled={!pickId || memberBusy[`${group.id}-${pickId}-add`]}
            onClick={() => {
              if (!pickId) return
              onMember(group.id, pickId, 'add')
              setPickId('')
            }}
          >
            {t('addToGroup')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminGroupsPage() {
  const router = useRouter()
  const t = useTranslations('admin.groups')
  const WEEKDAY_OPTIONS = t.raw('weekdays')
  const emptyScheduleRow = () => ({ day: WEEKDAY_OPTIONS[0], time: '16:00' })

  const { user, loading: sessionLoading } = useAuthSession()
  const [groups, setGroups] = useState([])
  const [crmTeachers, setCrmTeachers] = useState([])
  const [courseNames, setCourseNames] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [createBusy, setCreateBusy] = useState(false)
  const [newName, setNewName] = useState('')
  const [newTeacherId, setNewTeacherId] = useState('')
  const [newZoom, setNewZoom] = useState('')
  const [newSchedule, setNewSchedule] = useState(() => [emptyScheduleRow()])
  const [newCourseIds, setNewCourseIds] = useState([])
  const [newStudentIds, setNewStudentIds] = useState([])
  const [studentSearch, setStudentSearch] = useState('')
  const [studentHits, setStudentHits] = useState([])
  const [memberBusy, setMemberBusy] = useState({})

  const loadMeta = async () => {
    const res = await fetch('/api/admin/students')
    if (!res.ok) throw new Error(t('errors.loadTeachers'))
    const data = await res.json()
    setCrmTeachers(data.crmTeachers || [])
    setCourseNames(data.courseNames || {})
  }

  const loadGroups = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/crm-groups')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'CRM')
      setGroups(data.groups || [])
    } catch (e) {
      setError(e.message || t('errors.loadGroups'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (sessionLoading) return
    if (!user) {
      router.push('/login')
      return
    }
    if (user.role !== 'admin') {
      router.push('/dashboard')
      return
    }
    loadMeta().catch(() => {})
    loadGroups()
  }, [sessionLoading, user?.id, user?.role, router])

  useEffect(() => {
    const q = studentSearch.trim()
    if (q.length < 2) {
      setStudentHits([])
      return
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/crm-students?q=${encodeURIComponent(q)}&limit=40`)
        const data = await res.json()
        if (res.ok) setStudentHits(data.students || [])
      } catch {
        setStudentHits([])
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [studentSearch])

  const toggleCourse = (id) => {
    setNewCourseIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const addStudentId = (id) => {
    if (!id || newStudentIds.includes(id)) return
    setNewStudentIds((prev) => [...prev, id])
    setStudentSearch('')
    setStudentHits([])
  }

  const createGroup = async (e) => {
    e.preventDefault()
    if (!newName.trim() || !newTeacherId) {
      alert(t('errors.nameAndTeacher'))
      return
    }
    setCreateBusy(true)
    try {
      const res = await fetch('/api/admin/crm-groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName.trim(),
          teacher_id: newTeacherId,
          zoom_link: newZoom.trim() || null,
          schedule: newSchedule.filter((r) => r.day && r.time),
          online_course_ids: newCourseIds,
          student_ids: newStudentIds,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('errors.createFailed'))
      setGroups((prev) => [data.group, ...prev])
      setNewName('')
      setNewZoom('')
      setNewSchedule([emptyScheduleRow()])
      setNewCourseIds([])
      setNewStudentIds([])
    } catch (err) {
      alert(err.message || t('errors.generic'))
    } finally {
      setCreateBusy(false)
    }
  }

  const patchGroup = async (groupId, body) => {
    const res = await fetch(`/api/admin/crm-groups/${groupId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || t('errors.saveFailed'))
    setGroups((prev) => prev.map((g) => (g.id === groupId ? data.group : g)))
  }

  const memberAction = async (groupId, studentId, action) => {
    const key = `${groupId}-${studentId}-${action}`
    setMemberBusy((p) => ({ ...p, [key]: true }))
    try {
      const res = await fetch(`/api/admin/crm-groups/${groupId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, action }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('errors.generic'))
      setGroups((prev) => prev.map((g) => (g.id === groupId ? data.group : g)))
    } catch (e) {
      alert(e.message || t('errors.generic'))
    } finally {
      setMemberBusy((p) => ({ ...p, [key]: false }))
    }
  }

  const deleteGroup = async (groupId) => {
    if (!confirm(t('confirmDelete'))) return
    try {
      const res = await fetch(`/api/admin/crm-groups/${groupId}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || t('errors.deleteFailed'))
      }
      setGroups((prev) => prev.filter((g) => g.id !== groupId))
    } catch (e) {
      alert(e.message || t('errors.generic'))
    }
  }

  const groupsByTeacher = useMemo(() => {
    const m = new Map()
    for (const g of groups) {
      const tid = g.teacher_id || '_'
      if (!m.has(tid)) m.set(tid, [])
      m.get(tid).push(g)
    }
    return m
  }, [groups])

  if (sessionLoading || (loading && groups.length === 0 && !error)) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{t('loading')}</div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}><Users size={24} /> {t('title')}</h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/admin" className={styles.certReloadButton}>
              <ArrowLeft size={16} /> {t('backToAdmin')}
            </Link>
            <button type="button" className={styles.refreshButton} onClick={loadGroups}>
              <RefreshCw size={18} /> {t('refresh')}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {error ? <p className={styles.emptyState}>{error}</p> : null}

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}><Plus size={22} /> {t('createSection')}</h2>
          <form onSubmit={createGroup} className={styles.certForm}>
            <div className={styles.certFormRow}>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>{t('groupNameLabel')}</label>
                <input className={styles.certInput} value={newName} onChange={(e) => setNewName(e.target.value)} required />
              </div>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>{t('teacherLabel')}</label>
                <select
                  className={styles.certInput}
                  value={newTeacherId}
                  onChange={(e) => setNewTeacherId(e.target.value)}
                  required
                >
                  <option value="">{t('selectTeacher')}</option>
                  {crmTeachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>{teacher.fullName}</option>
                  ))}
                </select>
              </div>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>{t('zoomOptional')}</label>
                <input className={styles.certInput} type="url" value={newZoom} onChange={(e) => setNewZoom(e.target.value)} placeholder="https://zoom.us/..." />
              </div>
            </div>
            <div className={styles.certFormRow}>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>{t('scheduleSlots')}</label>
                {newSchedule.map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.35rem', alignItems: 'center' }}>
                    <select
                      className={styles.certInput}
                      style={{ maxWidth: '88px' }}
                      value={row.day}
                      onChange={(e) => {
                        const v = e.target.value
                        setNewSchedule((prev) => prev.map((r, j) => (j === i ? { ...r, day: v } : r)))
                      }}
                    >
                      {WEEKDAY_OPTIONS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <input
                      type="time"
                      className={styles.certInput}
                      value={row.time}
                      onChange={(e) => {
                        const v = e.target.value
                        setNewSchedule((prev) => prev.map((r, j) => (j === i ? { ...r, time: v } : r)))
                      }}
                    />
                    <button type="button" className={styles.certReloadButton} onClick={() => setNewSchedule((prev) => prev.filter((_, j) => j !== i))}>✕</button>
                  </div>
                ))}
                <button type="button" className={styles.certReloadButton} onClick={() => setNewSchedule((prev) => [...prev, emptyScheduleRow()])}>
                  {t('addSlot')}
                </button>
              </div>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>{t('groupCourses')}</label>
                <div className={styles.coursesList}>
                  {Object.entries(courseNames).map(([courseId, name]) => (
                    <label key={courseId} className={styles.courseBadge} style={{ cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={newCourseIds.includes(courseId)}
                        onChange={() => toggleCourse(courseId)}
                        style={{ marginRight: '0.35rem' }}
                      />
                      {name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.certFormGroup}>
              <label className={styles.certLabel}>{t('searchStudentsCrm')}</label>
              <input
                className={styles.certInput}
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
              />
              {studentHits.length > 0 && (
                <div className={styles.usersTable} style={{ marginTop: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
                  <table>
                    <tbody>
                      {studentHits.map((s) => (
                        <tr key={s.id}>
                          <td>{s.full_name}</td>
                          <td>{s.short_id}</td>
                          <td>
                            <button type="button" className={styles.certReloadButton} onClick={() => addStudentId(s.id)}>
                              {t('add')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {newStudentIds.length > 0 && (
                <p className={styles.noData} style={{ marginTop: '0.5rem' }}>
                  {t('selectedStudentIds', { ids: newStudentIds.join(', ') })}
                </p>
              )}
            </div>
            <div className={styles.certFormActions}>
              <button type="submit" className={styles.certSubmitButton} disabled={createBusy}>
                {createBusy ? t('creating') : t('createGroup')}
              </button>
            </div>
          </form>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('allGroups')}</h2>
          {[...groupsByTeacher.entries()].map(([teacherId, list]) => {
            const teacherName = list[0]?.teacher_name || (teacherId === '_' ? t('noTeacher') : teacherId)
            return (
              <div key={teacherId} style={{ marginBottom: '1.5rem' }}>
                <h3 className={styles.scheduleEditorTitle}>{teacherName}</h3>
                {list.map((g) => (
                  <GroupCard
                    key={g.id}
                    group={g}
                    courseNames={courseNames}
                    searchQuery={studentSearch}
                    onSearchInput={setStudentSearch}
                    studentHits={studentHits}
                    onPatch={patchGroup}
                    onMember={memberAction}
                    onDelete={deleteGroup}
                    memberBusy={memberBusy}
                    t={t}
                  />
                ))}
              </div>
            )
          })}
          {groups.length === 0 && !error ? <p className={styles.emptyState}>{t('empty')}</p> : null}
        </div>
      </div>
    </div>
  )
}
