'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, RefreshCw, User } from 'lucide-react'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import styles from '../../AdminPanel.module.css'

const WEEKDAY_OPTIONS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

export default function AdminStudentPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: sessionLoading } = useAuthSession()
  const studentId = params?.studentId

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveNotice, setSaveNotice] = useState('')
  const [approvingId, setApprovingId] = useState('')
  const [student, setStudent] = useState(null)
  const [courseNames, setCourseNames] = useState({})
  const [crmTeachers, setCrmTeachers] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [receipts, setReceipts] = useState([])
  const [form, setForm] = useState({
    lessonFormat: 'group',
    regularDays: [],
    regularScheduleByDay: {},
    zoomLink: '',
    crmTeacherId: '',
    crmTeacherName: '',
    onlineCourseIds: [],
    pythonAccessEnabled: false,
    pythonUnlockedLessons: [],
    accountReady: true,
  })
  const [crmGroups, setCrmGroups] = useState([])
  const [groupsLoading, setGroupsLoading] = useState(false)
  const [joinGroupId, setJoinGroupId] = useState('')
  const [joinLoading, setJoinLoading] = useState(false)
  const [showAdvancedGroup, setShowAdvancedGroup] = useState(false)

  const pythonLessons = useMemo(() => pythonCurriculum.modules.flatMap((module) => module.lessons), [])
  const orderedRegularDays = useMemo(
    () => WEEKDAY_OPTIONS.filter((day) => form.regularDays.includes(day)),
    [form.regularDays]
  )

  const loadStudent = async () => {
    if (!studentId) return
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/students/${studentId}`)
      if (response.status === 403) {
        router.push('/dashboard')
        return
      }
      if (!response.ok) {
        throw new Error('Failed to load student')
      }
      const data = await response.json()
      setStudent(data.student || null)
      setCourseNames(data.courseNames || {})
      setCrmTeachers(data.crmTeachers || [])
      setAnalytics(data.analytics || null)
      setReceipts(data.receipts || [])

      const schedule = data.student?.profile?.regularSchedule || []
      const dayList = schedule.map((item) => item.day).filter(Boolean)
      const scheduleByDay = {}
      schedule.forEach((item) => {
        if (item?.day) scheduleByDay[item.day] = item.time || ''
      })
      const onlineCourseIds = data.student?.profile?.activeOnlineCourses || []
      const pythonAccess = data.student?.profile?.courseAccess?.['python-developer-zero-to-junior'] || {}
      const unlockedLessons = pythonAccess.unlockedLessons || []

      setForm({
        lessonFormat: data.student?.profile?.lessonFormat || 'group',
        regularDays: dayList,
        regularScheduleByDay: scheduleByDay,
        zoomLink: data.student?.profile?.zoomLink || '',
        crmTeacherId: data.student?.profile?.crmTeacherId || '',
        crmTeacherName: data.student?.profile?.crmTeacherName || '',
        onlineCourseIds,
        pythonAccessEnabled: Boolean(pythonAccess.enabled),
        pythonUnlockedLessons: unlockedLessons,
        accountReady: data.student?.profile?.accountReady !== false,
      })
      setJoinGroupId('')
      setShowAdvancedGroup(false)
    } catch (error) {
      console.error(error)
      alert('Помилка завантаження учня')
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
    loadStudent()
  }, [sessionLoading, user?.id, user?.role, studentId])

  useEffect(() => {
    if (!studentId || form.lessonFormat !== 'group') return
    let cancelled = false
    const run = async () => {
      setGroupsLoading(true)
      try {
        const res = await fetch('/api/admin/crm-groups')
        const data = await res.json()
        if (!cancelled && res.ok) setCrmGroups(data.groups || [])
      } catch {
        if (!cancelled) setCrmGroups([])
      } finally {
        if (!cancelled) setGroupsLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [studentId, form.lessonFormat])

  const toggleArray = (fieldName, value) => {
    setForm((prev) => {
      const list = prev[fieldName] || []
      const exists = list.includes(value)
      const nextScheduleByDay = { ...(prev.regularScheduleByDay || {}) }
      if (fieldName === 'regularDays') {
        if (exists) {
          delete nextScheduleByDay[value]
        } else if (!nextScheduleByDay[value]) {
          nextScheduleByDay[value] = ''
        }
      }
      return {
        ...prev,
        [fieldName]: exists ? list.filter((item) => item !== value) : [...list, value],
        regularScheduleByDay: nextScheduleByDay,
      }
    })
  }

  const saveStudent = async (e) => {
    e.preventDefault()
    if (!studentId) return
    setSaving(true)
    try {
      const response = await fetch('/api/admin/students', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          lessonFormat: form.lessonFormat,
          regularSchedule: form.regularDays.map((day) => ({
            day,
            time: form.regularScheduleByDay?.[day] || '',
          })),
          zoomLink: form.zoomLink,
          onlineCourseIds: form.onlineCourseIds,
          pythonAccessEnabled: form.pythonAccessEnabled,
          pythonUnlockedLessons: form.pythonUnlockedLessons,
          crmTeacherId: form.crmTeacherId,
          crmTeacherName: form.crmTeacherName,
          accountReady: form.accountReady,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to save student')
      if (data?.studentProfile) {
        setStudent((prev) => (prev ? { ...prev, profile: data.studentProfile } : prev))
      }
      setSaveNotice('Налаштування збережено')
      setTimeout(() => setSaveNotice(''), 2500)
    } catch (error) {
      console.error(error)
      alert(error.message || 'Помилка збереження')
    } finally {
      setSaving(false)
    }
  }

  const joinCrmGroup = async () => {
    if (!studentId || !joinGroupId) {
      alert('Оберіть групу')
      return
    }
    setJoinLoading(true)
    try {
      const response = await fetch(`/api/admin/students/${studentId}/join-crm-group`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: joinGroupId }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Не вдалося підключити')
      if (data?.studentProfile) {
        setStudent((prev) => (prev ? { ...prev, profile: data.studentProfile } : prev))
        const schedule = data.studentProfile?.regularSchedule || []
        const dayList = schedule.map((item) => item.day).filter(Boolean)
        const scheduleByDay = {}
        schedule.forEach((item) => {
          if (item?.day) scheduleByDay[item.day] = item.time || ''
        })
        setForm((prev) => ({
          ...prev,
          lessonFormat: data.studentProfile?.lessonFormat || 'group',
          regularDays: dayList,
          regularScheduleByDay: scheduleByDay,
          zoomLink: data.studentProfile?.zoomLink || '',
          crmTeacherId: data.studentProfile?.crmTeacherId || '',
          crmTeacherName: data.studentProfile?.crmTeacherName || '',
        }))
      }
      setSaveNotice('Учня підключено до групи в CRM')
      setTimeout(() => setSaveNotice(''), 3000)
    } catch (error) {
      alert(error.message || 'Помилка')
    } finally {
      setJoinLoading(false)
    }
  }

  const approveReceipt = async (receiptId) => {
    setApprovingId(receiptId)
    try {
      const response = await fetch(`/api/admin/receipts/${receiptId}/approve`, { method: 'POST' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Не вдалося підтвердити оплату')
      await loadStudent()
    } catch (error) {
      alert(error.message || 'Помилка підтвердження')
    } finally {
      setApprovingId('')
    }
  }

  if (sessionLoading || loading) {
    return <div className={styles.container}><div className={styles.loading}>Завантаження...</div></div>
  }

  if (!student) {
    return <div className={styles.container}><div className={styles.emptyState}>Учня не знайдено.</div></div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}><User size={24} /> {student.name}</h1>
            <p className={styles.subtitle}>{student.email}</p>
            <p className={styles.subtitle}>ID: {student.id}</p>
            {student.profile?.crmStudentId ? (
              <p className={styles.subtitle}>CRM ID: {student.profile.crmStudentId}</p>
            ) : null}
          </div>
          <div className={styles.headerActions}>
            <Link href="/admin" className={styles.certReloadButton}>
              <ArrowLeft size={16} /> Назад до списку
            </Link>
            <button className={styles.refreshButton} onClick={loadStudent}>
              <RefreshCw size={18} /> Оновити
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}><Calendar size={24} /> Менеджмент учня</h2>
          <form onSubmit={saveStudent} className={styles.certForm}>
            <div className={styles.certFormRow}>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>
                  <input
                    type="checkbox"
                    checked={form.accountReady}
                    onChange={(e) => setForm((prev) => ({ ...prev, accountReady: e.target.checked }))}
                    style={{ marginRight: '0.5rem' }}
                  />
                  Акаунт готовий (учень бачить повний кабінет)
                </label>
                <p className={styles.noData} style={{ marginTop: '0.35rem' }}>
                  Якщо зняти прапорець, учень бачитиме повідомлення про очікування налаштування менеджером.
                </p>
              </div>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>Формат занять</label>
                <select
                  className={styles.certInput}
                  value={form.lessonFormat}
                  onChange={(e) => setForm((prev) => ({ ...prev, lessonFormat: e.target.value }))}
                >
                  <option value="group">Групові</option>
                  <option value="individual">Індивідуальні</option>
                </select>
              </div>
            </div>

            {form.lessonFormat === 'group' && (
              <div className={styles.progressCard} style={{ marginBottom: '1rem' }}>
                <h3 className={styles.scheduleEditorTitle}>Підключення до групи в CRM</h3>
                <p className={styles.cardText}>
                  Оберіть групу та натисніть кнопку — розклад, Zoom і викладач підтягнуться з групи. Створити нову групу можна на сторінці{' '}
                  <Link href="/admin/groups" className={styles.receiptLink}>Групи CRM</Link>.
                </p>
                <div className={styles.certFormRow}>
                  <div className={styles.certFormGroup}>
                    <label className={styles.certLabel}>Група</label>
                    <select
                      className={styles.certInput}
                      value={joinGroupId}
                      onChange={(e) => setJoinGroupId(e.target.value)}
                      disabled={groupsLoading}
                    >
                      <option value="">{groupsLoading ? 'Завантаження…' : 'Оберіть групу'}</option>
                      {crmGroups.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name} ({g.teacher_name || 'викладач'}) · {g.student_count ?? (g.students || []).length} учн.
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.certFormActions} style={{ alignSelf: 'flex-end' }}>
                    <button type="button" className={styles.certSubmitButton} disabled={joinLoading || !joinGroupId} onClick={joinCrmGroup}>
                      {joinLoading ? 'Підключення…' : 'Підʼєднати до групи'}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.certReloadButton}
                  onClick={() => setShowAdvancedGroup((v) => !v)}
                >
                  {showAdvancedGroup ? 'Сховати ручні налаштування' : 'Розклад / Zoom вручну (за потреби)'}
                </button>
              </div>
            )}

            {(form.lessonFormat === 'individual' || showAdvancedGroup) && (
            <>
            <div className={styles.certFormRow}>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>Zoom посилання</label>
                <input
                  className={styles.certInput}
                  type="url"
                  value={form.zoomLink}
                  onChange={(e) => setForm((prev) => ({ ...prev, zoomLink: e.target.value }))}
                  placeholder="https://zoom.us/j/..."
                />
              </div>
            </div>
            <div className={styles.certFormRow}>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>Викладач (CRM)</label>
                <select
                  className={styles.certInput}
                  value={form.crmTeacherId}
                  onChange={(e) => {
                    const teacherId = e.target.value
                    const teacherName = teacherId
                      ? (crmTeachers.find((item) => item.id === teacherId)?.fullName || '')
                      : ''
                    setForm((prev) => ({
                      ...prev,
                      crmTeacherId: teacherId,
                      crmTeacherName: teacherName,
                    }))
                  }}
                >
                  <option value="">Без викладача</option>
                  {crmTeachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.fullName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.certFormRow}>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>Дні тижня</label>
                <div className={styles.scheduleCalendar}>
                  {WEEKDAY_OPTIONS.map((day) => {
                    const isActive = form.regularDays.includes(day)
                    return (
                      <button
                        key={day}
                        type="button"
                        className={`${styles.scheduleDayCard} ${isActive ? styles.scheduleDayCardActive : ''}`}
                        onClick={() => toggleArray('regularDays', day)}
                      >
                        <span className={styles.scheduleDayName}>{day}</span>
                        <span className={styles.scheduleDayTime}>
                          {isActive
                            ? (form.regularScheduleByDay?.[day] || 'Оберіть час')
                            : 'Вихідний'}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            </>
            )}

            <div className={styles.certFormRow}>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>Онлайн-курси</label>
                <div className={styles.coursesList}>
                  {Object.entries(courseNames).map(([courseId, courseName]) => (
                    <label key={courseId} className={styles.courseBadge} style={{ cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={form.onlineCourseIds.includes(courseId)}
                        onChange={() => toggleArray('onlineCourseIds', courseId)}
                        style={{ marginRight: '0.4rem' }}
                      />
                      {courseName}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {orderedRegularDays.length > 0 && (form.lessonFormat === 'individual' || showAdvancedGroup) && (
              <div className={styles.scheduleEditor}>
                <h3 className={styles.scheduleEditorTitle}>Розклад уроків</h3>
                <div className={styles.scheduleEditorGrid}>
                  {orderedRegularDays.map((day) => (
                    <div key={day} className={styles.scheduleEditorCard}>
                      <div className={styles.scheduleEditorDay}>{day}</div>
                      <input
                        type="time"
                        className={styles.certInput}
                        value={form.regularScheduleByDay?.[day] || ''}
                        onChange={(e) => setForm((prev) => ({
                          ...prev,
                          regularScheduleByDay: { ...(prev.regularScheduleByDay || {}), [day]: e.target.value },
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.certFormRow}>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>
                  <input
                    type="checkbox"
                    checked={form.pythonAccessEnabled}
                    onChange={(e) => setForm((prev) => ({ ...prev, pythonAccessEnabled: e.target.checked }))}
                    style={{ marginRight: '0.5rem' }}
                  />
                  Увімкнути доступ до Пайтон
                </label>
                <div className={styles.usersTable} style={{ maxHeight: '260px', overflowY: 'auto' }}>
                  <table>
                    <thead><tr><th>Відкрити</th><th>Урок</th></tr></thead>
                    <tbody>
                      {pythonLessons.map((lesson) => (
                        <tr key={lesson.lessonId}>
                          <td>
                            <input
                              type="checkbox"
                              checked={form.pythonUnlockedLessons.includes(lesson.lessonId)}
                              onChange={() => toggleArray('pythonUnlockedLessons', lesson.lessonId)}
                            />
                          </td>
                          <td>{lesson.lessonId} - {lesson.title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.certFormActions}>
              <button className={styles.certSubmitButton} type="submit" disabled={saving}>
                {saving ? 'Збереження...' : 'Зберегти налаштування'}
              </button>
              {saveNotice ? <span className={styles.noData}>{saveNotice}</span> : null}
            </div>
          </form>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Підтвердження оплат</h2>
          {receipts.length === 0 ? (
            <p className={styles.emptyState}>У цього учня ще немає квитанцій.</p>
          ) : (
            <div className={styles.usersTable}>
              <table>
                <thead>
                  <tr>
                    <th>Сума</th>
                    <th>Уроки</th>
                    <th>Статус</th>
                    <th>Дата</th>
                    <th>Квитанція</th>
                    <th>Дія</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.map((receipt) => (
                    <tr key={receipt.id}>
                      <td>{receipt.amount} грн</td>
                      <td>{receipt.creditedLessons}</td>
                      <td>{receipt.approvalStatus === 'approved' ? 'Підтверджено' : 'Очікує'}</td>
                      <td>{new Date(receipt.createdAt).toLocaleDateString('uk-UA')}</td>
                      <td>
                        {receipt.receipt?.dataUrl ? (
                          <a href={receipt.receipt.dataUrl} target="_blank" rel="noreferrer" className={styles.receiptLink}>
                            <img src={receipt.receipt.dataUrl} alt="Квитанція" className={styles.receiptThumb} />
                          </a>
                        ) : 'Немає'}
                      </td>
                      <td>
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', cursor: receipt.approvalStatus === 'approved' ? 'default' : 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={receipt.approvalStatus === 'approved'}
                            disabled={receipt.approvalStatus === 'approved' || approvingId === receipt.id}
                            onChange={(e) => {
                              if (e.target.checked && receipt.approvalStatus !== 'approved') {
                                approveReceipt(receipt.id)
                              }
                            }}
                          />
                          <span>{approvingId === receipt.id ? 'Підтвердження...' : (receipt.approvalStatus === 'approved' ? 'Підтверджено' : 'Підтвердити оплату')}</span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {analytics && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Аналітика учня</h2>
            <div className={styles.progressStats}>
              <div className={styles.progressStat}>
                <span className={styles.progressLabel}>Середній прогрес</span>
                <span className={styles.progressValue}>{analytics.averageProgress || 0}%</span>
              </div>
              <div className={styles.progressStat}>
                <span className={styles.progressLabel}>Завершено уроків</span>
                <span className={styles.progressValue}>{analytics.totalCompletedLessons || 0}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

