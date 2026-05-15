'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, RefreshCw, Users, Plus, Trash2 } from 'lucide-react'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from '../AdminPanel.module.css'

const WEEKDAY_OPTIONS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

const emptyScheduleRow = () => ({ day: 'Пн', time: '16:00' })

function GroupCard({ group, courseNames, onSearchInput, searchQuery, studentHits, onPatch, onMember, onDelete, memberBusy }) {
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

  return (
    <div className={styles.progressCard} style={{ marginBottom: '0.75rem' }}>
      <div className={styles.certFormRow}>
        <div className={styles.certFormGroup}>
          <label className={styles.certLabel}>Назва</label>
          <input className={styles.certInput} value={localName} onChange={(e) => setLocalName(e.target.value)} />
        </div>
        <div className={styles.certFormGroup}>
          <label className={styles.certLabel}>Zoom</label>
          <input className={styles.certInput} type="url" value={localZoom} onChange={(e) => setLocalZoom(e.target.value)} />
        </div>
        <div className={styles.certFormActions} style={{ alignSelf: 'flex-end' }}>
          <button type="button" className={styles.certSubmitButton} onClick={saveMeta}>Зберегти</button>
          <button type="button" className={styles.certReloadButton} onClick={() => onDelete(group.id)}><Trash2 size={16} /></button>
        </div>
      </div>
      <p className={styles.cardText}>
        Учнів: {group.student_count ?? (group.students || []).length}
        {(group.schedule || []).map((s) => ` · ${s.day} ${s.time}`).join('')}
      </p>
      {(group.online_course_ids || []).length > 0 && (
        <p className={styles.noData}>Курси: {(group.online_course_ids || []).map((id) => courseNames[id] || id).join(', ')}</p>
      )}
      <div className={styles.usersTable} style={{ marginTop: '0.5rem' }}>
        <table>
          <thead>
            <tr><th>Учень</th><th>Код</th><th></th></tr>
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
                    Прибрати
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.certFormRow} style={{ marginTop: '0.75rem' }}>
        <div className={styles.certFormGroup}>
          <label className={styles.certLabel}>Пошук учня для додавання (мін. 2 символи)</label>
          <input
            className={styles.certInput}
            value={searchQuery}
            onChange={(e) => onSearchInput(e.target.value)}
            placeholder="Імʼя, email або код"
          />
          {studentHits.length > 0 && (
            <select className={styles.certInput} style={{ marginTop: '0.35rem' }} value={pickId} onChange={(e) => setPickId(e.target.value)}>
              <option value="">Оберіть зі списку</option>
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
            Додати до групи
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminGroupsPage() {
  const router = useRouter()
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
  const [newSchedule, setNewSchedule] = useState([emptyScheduleRow()])
  const [newCourseIds, setNewCourseIds] = useState([])
  const [newStudentIds, setNewStudentIds] = useState([])
  const [studentSearch, setStudentSearch] = useState('')
  const [studentHits, setStudentHits] = useState([])
  const [memberBusy, setMemberBusy] = useState({})

  const loadMeta = async () => {
    const res = await fetch('/api/admin/students')
    if (!res.ok) throw new Error('Не вдалося завантажити викладачів')
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
      setError(e.message || 'Помилка завантаження груп')
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
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/crm-students?q=${encodeURIComponent(q)}&limit=40`)
        const data = await res.json()
        if (res.ok) setStudentHits(data.students || [])
      } catch {
        setStudentHits([])
      }
    }, 300)
    return () => clearTimeout(t)
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
      alert('Вкажіть назву групи та викладача')
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
      if (!res.ok) throw new Error(data.error || 'Не вдалося створити')
      setGroups((prev) => [data.group, ...prev])
      setNewName('')
      setNewZoom('')
      setNewSchedule([emptyScheduleRow()])
      setNewCourseIds([])
      setNewStudentIds([])
    } catch (err) {
      alert(err.message || 'Помилка')
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
    if (!res.ok) throw new Error(data.error || 'Збереження')
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
      if (!res.ok) throw new Error(data.error || 'Помилка')
      setGroups((prev) => prev.map((g) => (g.id === groupId ? data.group : g)))
    } catch (e) {
      alert(e.message || 'Помилка')
    } finally {
      setMemberBusy((p) => ({ ...p, [key]: false }))
    }
  }

  const deleteGroup = async (groupId) => {
    if (!confirm('Видалити групу? Майбутні групові уроки будуть скасовані в CRM.')) return
    try {
      const res = await fetch(`/api/admin/crm-groups/${groupId}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Видалення')
      }
      setGroups((prev) => prev.filter((g) => g.id !== groupId))
    } catch (e) {
      alert(e.message || 'Помилка')
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
        <div className={styles.loading}>Завантаження...</div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}><Users size={24} /> Групи (CRM)</h1>
            <p className={styles.subtitle}>Створення груп, викладач, учні та розклад синхронізуються з CRM.</p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/admin" className={styles.certReloadButton}>
              <ArrowLeft size={16} /> До адмінки
            </Link>
            <button type="button" className={styles.refreshButton} onClick={loadGroups}>
              <RefreshCw size={18} /> Оновити
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {error ? <p className={styles.emptyState}>{error}</p> : null}

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}><Plus size={22} /> Створити нову групу</h2>
          <form onSubmit={createGroup} className={styles.certForm}>
            <div className={styles.certFormRow}>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>Назва групи</label>
                <input className={styles.certInput} value={newName} onChange={(e) => setNewName(e.target.value)} required />
              </div>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>Викладач</label>
                <select
                  className={styles.certInput}
                  value={newTeacherId}
                  onChange={(e) => setNewTeacherId(e.target.value)}
                  required
                >
                  <option value="">Оберіть викладача</option>
                  {crmTeachers.map((t) => (
                    <option key={t.id} value={t.id}>{t.fullName}</option>
                  ))}
                </select>
              </div>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>Zoom (опційно)</label>
                <input className={styles.certInput} type="url" value={newZoom} onChange={(e) => setNewZoom(e.target.value)} placeholder="https://zoom.us/..." />
              </div>
            </div>
            <div className={styles.certFormRow}>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>Слоти розкладу</label>
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
                  + слот
                </button>
              </div>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>Онлайн-курси групи</label>
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
              <label className={styles.certLabel}>Пошук учнів у CRM (мін. 2 символи)</label>
              <input
                className={styles.certInput}
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Імʼя, email або ID"
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
                              Додати
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
                  Обрані ID учнів: {newStudentIds.join(', ')}
                </p>
              )}
            </div>
            <div className={styles.certFormActions}>
              <button type="submit" className={styles.certSubmitButton} disabled={createBusy}>
                {createBusy ? 'Створення...' : 'Створити групу'}
              </button>
            </div>
          </form>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Усі групи</h2>
          {[...groupsByTeacher.entries()].map(([teacherId, list]) => {
            const teacherName = list[0]?.teacher_name || (teacherId === '_' ? 'Без викладача' : teacherId)
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
                  />
                ))}
              </div>
            )
          })}
          {groups.length === 0 && !error ? <p className={styles.emptyState}>Груп ще немає або CRM недоступний.</p> : null}
        </div>
      </div>
    </div>
  )
}
