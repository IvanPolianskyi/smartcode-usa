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
  const [approvingId, setApprovingId] = useState('')
  const [student, setStudent] = useState(null)
  const [courseNames, setCourseNames] = useState({})
  const [analytics, setAnalytics] = useState(null)
  const [receipts, setReceipts] = useState([])
  const [form, setForm] = useState({
    lessonFormat: 'group',
    regularDays: [],
    regularScheduleByDay: {},
    zoomLink: '',
    onlineCourseIds: [],
    pythonAccessEnabled: false,
    pythonUnlockedLessons: [],
  })

  const pythonLessons = useMemo(() => pythonCurriculum.modules.flatMap((module) => module.lessons), [])

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
        onlineCourseIds,
        pythonAccessEnabled: Boolean(pythonAccess.enabled),
        pythonUnlockedLessons: unlockedLessons,
      })
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
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to save student')
      alert('Налаштування учня збережено')
      await loadStudent()
    } catch (error) {
      console.error(error)
      alert(error.message || 'Помилка збереження')
    } finally {
      setSaving(false)
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
                <label className={styles.certLabel}>Дні тижня</label>
                <div className={styles.coursesList}>
                  {WEEKDAY_OPTIONS.map((day) => (
                    <label key={day} className={styles.courseBadge} style={{ cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={form.regularDays.includes(day)}
                        onChange={() => toggleArray('regularDays', day)}
                        style={{ marginRight: '0.4rem' }}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
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

            {form.regularDays.length > 0 && (
              <div className={styles.usersTable}>
                <table>
                  <thead>
                    <tr><th>День</th><th>Час</th></tr>
                  </thead>
                  <tbody>
                    {form.regularDays.map((day) => (
                      <tr key={day}>
                        <td>{day}</td>
                        <td>
                          <input
                            type="time"
                            className={styles.certInput}
                            value={form.regularScheduleByDay?.[day] || ''}
                            onChange={(e) => setForm((prev) => ({
                              ...prev,
                              regularScheduleByDay: { ...(prev.regularScheduleByDay || {}), [day]: e.target.value },
                            }))}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

