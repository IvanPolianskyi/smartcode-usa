'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { isCourseFullAccess } from '@/lib/courseLessonAccess'
import styles from './AdminPanel.module.css'
import {
  Users,
  ShoppingCart,
  Eye,
  TrendingUp,
  BookOpen,
  DollarSign,
  Calendar,
  RefreshCw,
  LogOut,
  Clock,
} from 'lucide-react'

export default function AdminPanelPage() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('admin')
  const { user, loading: sessionLoading } = useAuthSession()
  const weekdayOptions = t.raw('weekdays')
  const dateLocale = locale === 'uk' ? 'uk-UA' : 'en-US'
  const [stats, setStats] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [students, setStudents] = useState([])
  const [receipts, setReceipts] = useState([])
  const [receiptsLoading, setReceiptsLoading] = useState(false)
  const [receiptsTab, setReceiptsTab] = useState('pending')
  const [slots, setSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotCreating, setSlotCreating] = useState(false)
  const [slotForm, setSlotForm] = useState({
    courseId: 'roblox-studio',
    lessonFormat: 'individual',
    day: 'mon',
    time: '18:00',
    zoomLink: ''
  })
  const [courseNames, setCourseNames] = useState({})
  const [crmTeachers, setCrmTeachers] = useState([])
  const [crmTeachersError, setCrmTeachersError] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [studentSaving, setStudentSaving] = useState(false)
  const [studentSaveNotice, setStudentSaveNotice] = useState('')
  const [studentSearch, setStudentSearch] = useState('')
  const [showDebtOnly, setShowDebtOnly] = useState(false)
  const [studentForm, setStudentForm] = useState({
    lessonFormat: 'group',
    regularDays: [],
    regularScheduleByDay: {},
    zoomLink: '',
    crmTeacherId: '',
    crmTeacherName: '',
    onlineCourseIds: [],
    courseFullAccess: {},
    accountReady: true,
  })
  const studentEditorRef = useRef(null)
  const selectedStudent = students.find((student) => student.id === selectedStudentId) || null
  const filteredStudents = useMemo(() => {
    let result = students
    if (showDebtOnly) {
      result = result.filter(student => {
        const balance = student.profile?.accountBalance || 0;
        const credits = student.profile?.lessonCredits || 0;
        const completed = student.analytics?.totalCompletedLessons || 0;
        const hasSchedule = (student.profile?.regularSchedule || []).length > 0;
        return balance < 0 || (credits < 1 && (completed > 0 || hasSchedule));
      })
    }
    const query = studentSearch.trim().toLowerCase()
    if (!query) return result
    return result.filter((student) =>
      (student.name || '').toLowerCase().includes(query) ||
      (student.email || '').toLowerCase().includes(query)
    )
  }, [students, studentSearch, showDebtOnly])

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
    loadStatistics()
    loadStudents()
    loadReceipts()
    loadSlots()
  }, [sessionLoading, user?.id, user?.role, router])

  const loadStatistics = async () => {
    try {
      setRefreshing(true)
      const response = await fetch('/api/admin/statistics')
      
      if (response.status === 403) {
        router.push('/dashboard')
        return
      }
      
      if (!response.ok) {
        throw new Error('Failed to load statistics')
      }
      
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error loading statistics:', error)
      alert(t('errors.loadStatistics'))
    } finally {
      setRefreshing(false)
    }
  }

  const loadStudents = async () => {
    try {
      const response = await fetch('/api/admin/students')
      if (response.status === 403) {
        router.push('/dashboard')
        return
      }
      if (!response.ok) {
        throw new Error('Failed to load students')
      }
      const data = await response.json()
      setStudents(data.students || [])
      setCourseNames(data.courseNames || {})
      setCrmTeachers(data.crmTeachers || [])
      setCrmTeachersError(data.crmTeachersError || '')
    } catch (error) {
      console.error('Error loading students:', error)
      alert(t('errors.loadStudents'))
    }
  }

  const loadReceipts = async () => {
    try {
      setReceiptsLoading(true)
      const response = await fetch('/api/admin/receipts')
      if (response.status === 403) {
        router.push('/dashboard')
        return
      }
      if (!response.ok) {
        throw new Error('Failed to load receipts')
      }
      const data = await response.json()
      setReceipts(data.receipts || [])
    } catch (error) {
      console.error('Error loading receipts:', error)
      alert(t('errors.loadReceipts'))
    } finally {
      setReceiptsLoading(false)
    }
  }

  const updateReceiptLessons = async (receiptId, newLessons) => {
    try {
      const response = await fetch(`/api/admin/receipts/${receiptId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creditedLessons: parseInt(newLessons, 10) })
      })
      if (!response.ok) {
        throw new Error('Failed to update lessons')
      }
      setReceipts(prev => prev.map(r => 
        r.id === receiptId ? { ...r, creditedLessons: parseInt(newLessons, 10) } : r
      ))
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  const loadSlots = async () => {
    try {
      setSlotsLoading(true)
      const response = await fetch('/api/admin/lesson-slots')
      if (response.ok) {
        const data = await response.json()
        setSlots(data.slots || [])
      }
    } catch (error) {
      console.error('Error loading slots:', error)
    } finally {
      setSlotsLoading(false)
    }
  }

  const handleCreateSlot = async (e) => {
    e.preventDefault()
    setSlotCreating(true)
    try {
      const response = await fetch('/api/admin/lesson-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slotForm),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create slot')
      }
      setSlotForm({ courseId: 'roblox-studio', lessonFormat: 'individual', day: 'mon', time: '18:00', zoomLink: '' })
      loadSlots()
    } catch (error) {
      alert(error.message)
    } finally {
      setSlotCreating(false)
    }
  }

  const handleDeleteSlot = async (id) => {
    if (!confirm('Are you sure you want to delete this slot?')) return
    try {
      const response = await fetch(`/api/admin/lesson-slots?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete slot')
      loadSlots()
    } catch (error) {
      alert(error.message)
    }
  }

  const handleDeleteStudent = async (id, name) => {
    if (!confirm(`Are you sure you want to delete account for ${name}?`)) return
    try {
      const response = await fetch(`/api/admin/students?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete student')
      loadStudents()
    } catch (error) {
      alert(error.message)
    }
  }

  const handleSelectStudent = (student) => {
    const schedule = student.profile?.regularSchedule || []
    const dayList = schedule.map((item) => item.day).filter(Boolean)
    const scheduleByDay = {}
    schedule.forEach((item) => {
      if (item?.day) scheduleByDay[item.day] = item.time || ''
    })
    const onlineCourseIds = student.profile?.activeOnlineCourses || []
    const courseFullAccess = {}
    onlineCourseIds.forEach((courseId) => {
      courseFullAccess[courseId] = isCourseFullAccess(student.profile, courseId)
    })

    setSelectedStudentId(student.id)
    setStudentForm({
      lessonFormat: student.profile?.lessonFormat || 'group',
      regularDays: dayList,
      regularScheduleByDay: scheduleByDay,
      zoomLink: student.profile?.zoomLink || '',
      crmTeacherId: student.profile?.crmTeacherId || '',
      crmTeacherName: student.profile?.crmTeacherName || '',
      onlineCourseIds,
      courseFullAccess,
      accountReady: student.profile?.accountReady !== false,
    })
    setTimeout(() => {
      studentEditorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const handleStudentFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setStudentForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const toggleStudentArrayItem = (fieldName, value) => {
    setStudentForm((prev) => {
      const list = prev[fieldName] || []
      const exists = list.includes(value)
      const nextScheduleByDay = { ...(prev.regularScheduleByDay || {}) }
      const nextFullAccess = { ...(prev.courseFullAccess || {}) }
      if (fieldName === 'regularDays') {
        if (exists) {
          delete nextScheduleByDay[value]
        } else if (!nextScheduleByDay[value]) {
          nextScheduleByDay[value] = ''
        }
      }
      if (fieldName === 'onlineCourseIds' && exists) {
        delete nextFullAccess[value]
      }
      return {
        ...prev,
        [fieldName]: exists ? list.filter((item) => item !== value) : [...list, value],
        regularScheduleByDay: nextScheduleByDay,
        courseFullAccess: nextFullAccess,
      }
    })
  }

  const handleSaveStudent = async (e) => {
    e.preventDefault()
    if (!selectedStudentId) {
      alert(t('errors.selectStudentFirst'))
      return
    }
    setStudentSaving(true)
    try {
      const response = await fetch('/api/admin/students', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudentId,
          lessonFormat: studentForm.lessonFormat,
          regularSchedule: studentForm.regularDays.map((day) => ({
            day,
            time: studentForm.regularScheduleByDay?.[day] || '',
          })),
          zoomLink: studentForm.zoomLink,
          onlineCourseIds: studentForm.onlineCourseIds,
          courseFullAccess: studentForm.courseFullAccess,
          crmTeacherId: studentForm.crmTeacherId,
          crmTeacherName: studentForm.crmTeacherName,
          accountReady: studentForm.accountReady,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save student settings')
      }
      if (data?.studentProfile && selectedStudentId) {
        setStudents((prev) =>
          prev.map((item) =>
            item.id === selectedStudentId
              ? { ...item, profile: data.studentProfile }
              : item
          )
        )
      }
      setStudentSaveNotice(t('students.saved'))
      setTimeout(() => setStudentSaveNotice(''), 2500)
    } catch (error) {
      console.error('Save student settings error:', error)
      alert(error.message || t('errors.saveStudent'))
    } finally {
      setStudentSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      const { logout } = await import('@/lib/authClient')
      await logout()
      window.dispatchEvent(new Event('auth:logout'))
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(dateLocale, {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (date) => {
    if (!date) return t('notAvailable')
    return new Date(date).toLocaleDateString(dateLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (sessionLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{t('loading')}</div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </div>
          <div className={styles.headerActions}>
            <button 
              onClick={loadStatistics} 
              className={styles.refreshButton}
              disabled={refreshing}
            >
              <RefreshCw size={20} className={refreshing ? styles.spinning : ''} />
              {t('refresh')}
            </button>
            <Link href="/admin/groups" className={styles.certReloadButton}>
              {t('crmGroups')}
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <LogOut size={20} />
              {t('logout')}
            </button>
          </div>
        </div>
      </div>

      {stats && (
        <div className={styles.content}>
          {/* Main Statistics Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: '#dbeafe' }}>
                <Eye size={24} color="#3b82f6" />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stats.visits?.total || 0}</div>
                <div className={styles.statLabel}>{t('stats.totalVisits')}</div>
                <div className={styles.statSubLabel}>
                  {t('stats.visitsLast30Days', { count: stats.visits?.last30Days || 0 })}
                </div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: '#dcfce7' }}>
                <Users size={24} color="#10b981" />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stats.users?.total || 0}</div>
                <div className={styles.statLabel}>{t('stats.totalUsers')}</div>
                <div className={styles.statSubLabel}>
                  {t('stats.usersWithPurchases', { count: stats.users?.withPurchases || 0 })}
                </div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7' }}>
                <ShoppingCart size={24} color="#f59e0b" />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stats.payments?.completed || 0}</div>
                <div className={styles.statLabel}>{t('stats.completedPurchases')}</div>
                <div className={styles.statSubLabel}>
                  {t('stats.totalPaymentAttempts', { count: stats.payments?.total || 0 })}
                </div>
              </div>
            </div>

            <Link
              href="/admin/payments"
              className={`${styles.statCard} ${styles.statCardLink}`}
              aria-label={t('stats.pendingPaymentsLink')}
            >
              <div className={styles.statIcon} style={{ backgroundColor: '#e0e7ff' }}>
                <DollarSign size={24} color="#8b5cf6" />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  {formatCurrency(stats.payments?.totalRevenue || 0)}
                </div>
                <div className={styles.statLabel}>{t('stats.totalRevenue')}</div>
                <div
                  className={
                    (stats.payments?.pending || 0) > 0
                      ? styles.statSubLink
                      : styles.statSubLabel
                  }
                >
                  {t('stats.pendingPayments', { count: stats.payments?.pending || 0 })}
                </div>
              </div>
            </Link>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: '#fee2e2' }}>
                <ShoppingCart size={24} color="#ef4444" />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stats.comingSoonClicks || 0}</div>
                <div className={styles.statLabel}>EN Buy Clicks</div>
                <div className={styles.statSubLabel}>
                  Interest in EN courses
                </div>
              </div>
            </div>
          </div>

          {/* Course Enrollments */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <BookOpen size={24} />
              {t('enrollments.title')}
            </h2>
            {stats.users?.courseEnrollments && stats.users.courseEnrollments.length > 0 ? (
              <div className={styles.courseGrid}>
                {stats.users.courseEnrollments.map((course) => (
                  <div key={course.courseId} className={styles.courseCard}>
                    <h3 className={styles.courseTitle}>{course.courseName}</h3>
                    <div className={styles.courseStat}>
                      <Users size={20} />
                      <span>{t('enrollments.enrollmentsCount', { count: course.enrolledCount })}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyState}>{t('enrollments.empty')}</p>
            )}
          </div>

          {/* Course Progress */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <TrendingUp size={24} />
              {t('progress.title')}
            </h2>
            {stats.courseProgress && stats.courseProgress.length > 0 ? (
              <div className={styles.progressGrid}>
                {stats.courseProgress.map((course) => (
                  <div key={course.courseId} className={styles.progressCard}>
                    <h3 className={styles.courseTitle}>{course.courseName}</h3>
                    <div className={styles.progressStats}>
                      <div className={styles.progressStat}>
                        <span className={styles.progressLabel}>{t('progress.enrolled')}</span>
                        <span className={styles.progressValue}>{course.totalEnrolled}</span>
                      </div>
                      <div className={styles.progressStat}>
                        <span className={styles.progressLabel}>{t('progress.averageProgress')}</span>
                        <span className={styles.progressValue}>{course.averageProgress}%</span>
                      </div>
                      <div className={styles.progressStat}>
                        <span className={styles.progressLabel}>{t('progress.completedLessons')}</span>
                        <span className={styles.progressValue}>{course.totalCompletedLessons}</span>
                      </div>
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill}
                        style={{ width: `${course.averageProgress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyState}>{t('progress.empty')}</p>
            )}
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <DollarSign size={24} />
              {t('receipts.title')}
            </h2>
            <div className={styles.certFormActions} style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  className={receiptsTab === 'pending' ? styles.certSubmitButton : styles.certReloadButton}
                  onClick={() => setReceiptsTab('pending')}
                  style={receiptsTab === 'pending' ? { padding: '0.5rem 1rem', margin: 0 } : { padding: '0.5rem 1rem' }}
                >
                  Очікують підтвердження
                </button>
                <button
                  type="button"
                  className={receiptsTab === 'history' ? styles.certSubmitButton : styles.certReloadButton}
                  onClick={() => setReceiptsTab('history')}
                  style={receiptsTab === 'history' ? { padding: '0.5rem 1rem', margin: 0 } : { padding: '0.5rem 1rem' }}
                >
                  Історія
                </button>
              </div>
              <button
                type="button"
                className={styles.certReloadButton}
                onClick={loadReceipts}
                disabled={receiptsLoading}
              >
                <RefreshCw size={16} className={receiptsLoading ? styles.spinning : ''} />
                {t('receipts.refresh')}
              </button>
            </div>
            {(() => {
              const filteredReceipts = receipts.filter(r => receiptsTab === 'pending' ? r.status === 'pending' : r.status !== 'pending');
              if (receiptsLoading) {
                return <p className={styles.emptyState}>{t('receipts.loading')}</p>
              }
              if (filteredReceipts.length === 0) {
                return <p className={styles.emptyState}>{t('receipts.empty')}</p>
              }
              return (
                <div className={styles.usersTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>{t('receipts.columns.student')}</th>
                        <th>{t('receipts.columns.amount')}</th>
                        <th>{t('receipts.columns.formatPrice')}</th>
                        <th>{t('receipts.columns.lessons')}</th>
                        <th>{t('receipts.columns.date')}</th>
                        <th>{t('receipts.columns.receipt')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReceipts.map((receipt) => (
                        <tr key={receipt.id}>
                          <td>{receipt.studentName}<br />{receipt.studentEmail}</td>
                          <td>{formatCurrency(receipt.amount)}</td>
                          <td>
                            {receipt.lessonFormat === 'individual' ? t('receipts.individual') : t('receipts.group')}
                            <br />
                            {t('receipts.pricePerLesson', { price: receipt.lessonPrice })}
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              className={styles.certInput}
                              style={{ width: '70px', padding: '0.25rem', textAlign: 'center' }}
                              value={receipt.creditedLessons}
                              onChange={(e) => {
                                const val = e.target.value;
                                setReceipts(prev => prev.map(r => r.id === receipt.id ? { ...r, creditedLessons: val } : r));
                              }}
                              onBlur={(e) => {
                                if (e.target.value !== '') {
                                  updateReceiptLessons(receipt.id, e.target.value);
                                }
                              }}
                            />
                          </td>
                          <td>{formatDate(receipt.createdAt)}</td>
                          <td>
                            {receipt.receipt?.hasImage ? (
                              <a href={`/api/admin/receipts/${receipt.id}/image`} target="_blank" rel="noreferrer" className={styles.receiptLink}>
                                <img
                                  src={`/api/admin/receipts/${receipt.id}/image`}
                                  alt={t('receipts.receiptAlt', { name: receipt.studentName })}
                                  className={styles.receiptThumb}
                                />
                              </a>
                            ) : (
                              <span className={styles.noData}>{t('receipts.noFile')}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            })()}
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Clock size={24} />
              Lesson Slots
            </h2>
            <div className={styles.certFormRow} style={{ marginBottom: '1rem' }}>
              <div className={styles.certFormGroup} style={{ flex: 1 }}>
                <p className={styles.emptyState} style={{ textAlign: 'left', marginBottom: '1rem', padding: 0 }}>
                  Manage recurring weekly slots for live lessons.
                </p>
                <form onSubmit={handleCreateSlot} className={styles.certFormRow} style={{ alignItems: 'flex-end', gap: '1rem' }}>
                  <div className={styles.certFormGroup}>
                    <label className={styles.certLabel}>Course</label>
                    <select
                      className={styles.certInput}
                      value={slotForm.courseId}
                      onChange={(e) => setSlotForm({ ...slotForm, courseId: e.target.value })}
                    >
                      <option value="roblox-studio">Roblox Studio</option>
                      <option value="python-developer-zero-to-junior">Python</option>
                      <option value="web-development">Web Development</option>
                    </select>
                  </div>
                  <div className={styles.certFormGroup}>
                    <label className={styles.certLabel}>Format</label>
                    <select
                      className={styles.certInput}
                      value={slotForm.lessonFormat}
                      onChange={(e) => setSlotForm({ ...slotForm, lessonFormat: e.target.value })}
                    >
                      <option value="group">Group</option>
                      <option value="individual">Individual</option>
                    </select>
                  </div>
                  <div className={styles.certFormGroup}>
                    <label className={styles.certLabel}>Day</label>
                    <select
                      className={styles.certInput}
                      value={slotForm.day}
                      onChange={(e) => setSlotForm({ ...slotForm, day: e.target.value })}
                    >
                      {weekdayOptions.map(d => {
                        const val = d === 'Пн' ? 'mon' : d === 'Вт' ? 'tue' : d === 'Ср' ? 'wed' : d === 'Чт' ? 'thu' : d === 'Пт' ? 'fri' : d === 'Сб' ? 'sat' : d === 'Нд' ? 'sun' : String(d).toLowerCase().substring(0,3)
                        return <option key={d} value={val}>{d}</option>
                      })}
                    </select>
                  </div>
                  <div className={styles.certFormGroup}>
                    <label className={styles.certLabel}>Time (Kyiv)</label>
                    <input
                      type="time"
                      className={styles.certInput}
                      value={slotForm.time}
                      onChange={(e) => setSlotForm({ ...slotForm, time: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.certFormGroup}>
                    <label className={styles.certLabel}>Zoom Link</label>
                    <input
                      type="url"
                      className={styles.certInput}
                      value={slotForm.zoomLink}
                      onChange={(e) => setSlotForm({ ...slotForm, zoomLink: e.target.value })}
                      placeholder="https://zoom.us/j/..."
                    />
                  </div>
                  <button type="submit" className={styles.certSubmitButton} disabled={slotCreating}>
                    {slotCreating ? 'Adding...' : 'Add Slot'}
                  </button>
                </form>
              </div>
            </div>

            {slotsLoading ? (
              <p className={styles.emptyState}>Loading slots...</p>
            ) : slots.length === 0 ? (
              <p className={styles.emptyState}>No slots available.</p>
            ) : (
              <div className={styles.usersTable}>
                <table>
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Format</th>
                      <th>Day</th>
                      <th>Time (Kyiv)</th>
                      <th>Zoom Link</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((slot) => (
                      <tr key={slot._id}>
                        <td>{slot.courseId}</td>
                        <td>{slot.lessonFormat}</td>
                        <td>{slot.day}</td>
                        <td>{slot.time}</td>
                        <td>
                          {slot.zoomLink ? (
                            <a href={slot.zoomLink} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                              Link
                            </a>
                          ) : '-'}
                        </td>
                        <td>
                          {slot.isBooked ? (
                            <span style={{ color: '#ef4444', fontWeight: 500 }}>Booked ({slot.bookedBy})</span>
                          ) : (
                            <span style={{ color: '#10b981', fontWeight: 500 }}>Available</span>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className={styles.certReloadButton}
                            style={{ color: '#ef4444', borderColor: '#ef4444' }}
                            onClick={() => handleDeleteSlot(slot._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Calendar size={24} />
              {t('students.title')}
            </h2>
            <div className={styles.certFormRow} style={{ marginBottom: '1rem' }}>
              <div className={styles.certFormGroup}>
                <label className={styles.certLabel}>{t('students.searchLabel')}</label>
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className={styles.certInput}
                  placeholder={t('students.searchPlaceholder')}
                />
              </div>
              <div className={styles.certFormGroup} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showDebtOnly}
                    onChange={(e) => setShowDebtOnly(e.target.checked)}
                  />
                  Тільки боржники (Баланс &lt; 0 або Кредити &lt; 1)
                </label>
              </div>
            </div>
            <div className={styles.usersTable}>
              <table>
                <thead>
                  <tr>
                    <th>{t('students.columns.student')}</th>
                    <th>Баланс</th>
                    <th>{t('students.columns.format')}</th>
                    <th>{t('students.columns.onlineCourses')}</th>
                    <th>{t('students.columns.progress')}</th>
                    <th>{t('students.columns.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      style={{
                        backgroundColor: selectedStudentId === student.id ? '#eff6ff' : undefined,
                      }}
                    >
                      <td>{student.name}<br />{student.email}</td>
                      <td style={{ color: ((student.profile?.accountBalance || 0) < 0 || (student.profile?.lessonCredits || 0) < 1) ? '#ef4444' : 'inherit' }}>
                        {student.profile?.accountBalance || 0} грн<br/>
                        <span style={{ fontSize: '0.85em', color: '#6b7280' }}>Кредити: {student.profile?.lessonCredits || 0}</span>
                      </td>
                      <td>{student.profile?.lessonFormat === 'individual' ? t('students.individual') : t('students.group')}</td>
                      <td>
                        {(student.profile?.activeOnlineCourses || []).length > 0
                          ? student.profile.activeOnlineCourses.map((courseId) => courseNames[courseId] || courseId).join(', ')
                          : t('students.noCourses')}
                      </td>
                      <td>
                        {t('students.progressSummary', {
                          percent: student.analytics?.averageProgress || 0,
                          lessons: student.analytics?.totalCompletedLessons || 0,
                        })}
                      </td>
                      <td>
                        <button
                          type="button"
                          className={styles.certReloadButton}
                          onClick={() => router.push(`/admin/students/${student.id}`)}
                          style={{ marginBottom: '0.5rem', display: 'block', width: '100%' }}
                        >
                          {t('students.openProfile')}
                        </button>
                        <button
                          type="button"
                          className={styles.certReloadButton}
                          onClick={() => handleDeleteStudent(student.id, student.name)}
                          style={{ color: '#ef4444', borderColor: '#ef4444', display: 'block', width: '100%' }}
                        >
                          Видалити
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', color: '#6b7280' }}>
                        {t('students.noResults')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <form ref={studentEditorRef} onSubmit={handleSaveStudent} className={styles.certForm}>
              {!selectedStudentId && (
                <p className={styles.emptyState} style={{ padding: '0.5rem 0 1rem 0' }}>
                  {t('students.selectHint')}
                </p>
              )}
              <div className={styles.certFormRow}>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>
                    <input
                      type="checkbox"
                      name="accountReady"
                      checked={studentForm.accountReady}
                      onChange={handleStudentFormChange}
                      style={{ marginRight: '0.5rem' }}
                    />
                    {t('students.accountReady')}
                  </label>
                </div>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>{t('students.lessonFormatLabel')}</label>
                  <select
                    name="lessonFormat"
                    value={studentForm.lessonFormat}
                    onChange={handleStudentFormChange}
                    className={styles.certInput}
                  >
                    <option value="group">{t('students.lessonFormatGroup')}</option>
                    <option value="individual">{t('students.lessonFormatIndividual')}</option>
                  </select>
                </div>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>{t('students.weekdaysLabel')}</label>
                  <div className={styles.coursesList}>
                    {weekdayOptions.map((day) => (
                      <label key={day} className={styles.courseBadge} style={{ cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={studentForm.regularDays.includes(day)}
                          onChange={() => toggleStudentArrayItem('regularDays', day)}
                          style={{ marginRight: '0.4rem' }}
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>{t('students.zoomLinkLabel')}</label>
                  <input
                    type="url"
                    name="zoomLink"
                    value={studentForm.zoomLink}
                    onChange={handleStudentFormChange}
                    className={styles.certInput}
                    placeholder={t('students.zoomPlaceholder')}
                  />
                </div>
              </div>
              <div className={styles.certFormRow}>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>{t('students.crmTeacherLabel')}</label>
                  <select
                    name="crmTeacherId"
                    value={studentForm.crmTeacherId}
                    onChange={(e) => {
                      const teacherId = e.target.value
                      const teacherName = teacherId
                        ? (crmTeachers.find((item) => item.id === teacherId)?.fullName || '')
                        : ''
                      setStudentForm((prev) => ({
                        ...prev,
                        crmTeacherId: teacherId,
                        crmTeacherName: teacherName,
                      }))
                    }}
                    className={styles.certInput}
                  >
                    <option value="">{t('students.noTeacher')}</option>
                    {crmTeachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.fullName}
                      </option>
                    ))}
                  </select>
                  {crmTeachersError ? (
                    <p style={{ marginTop: '0.35rem', fontSize: '0.85rem', color: '#b45309' }}>
                      CRM: {crmTeachersError}
                    </p>
                  ) : null}
                </div>
              </div>

              {studentForm.regularDays.length > 0 && (
                <div className={styles.certFormRow}>
                  <div className={styles.certFormGroup}>
                    <label className={styles.certLabel}>{t('students.scheduleByDayLabel')}</label>
                    <div className={styles.usersTable}>
                      <table>
                        <thead>
                          <tr>
                            <th>{t('students.scheduleColumns.day')}</th>
                            <th>{t('students.scheduleColumns.time')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentForm.regularDays.map((day) => (
                            <tr key={day}>
                              <td>{day}</td>
                              <td>
                                <input
                                  type="time"
                                  className={styles.certInput}
                                  value={studentForm.regularScheduleByDay?.[day] || ''}
                                  onChange={(e) =>
                                    setStudentForm((prev) => ({
                                      ...prev,
                                      regularScheduleByDay: {
                                        ...(prev.regularScheduleByDay || {}),
                                        [day]: e.target.value,
                                      },
                                    }))
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.certFormRow}>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>{t('students.onlineCoursesLabel')}</label>
                  <div className={styles.coursesList}>
                    {Object.entries(courseNames).map(([courseId, courseName]) => (
                      <label key={courseId} className={styles.courseBadge} style={{ cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={studentForm.onlineCourseIds.includes(courseId)}
                          onChange={() => toggleStudentArrayItem('onlineCourseIds', courseId)}
                          style={{ marginRight: '0.4rem' }}
                        />
                        {courseName}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {studentForm.onlineCourseIds.length > 0 && (
                <div className={styles.certFormRow}>
                  <div className={styles.certFormGroup}>
                    <label className={styles.certLabel}>{t('students.onlineAccessLabel')}</label>
                    <p className={styles.noData}>{t('students.onlineAccessHint')}</p>
                    <div className={styles.coursesList} style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
                      {studentForm.onlineCourseIds.map((courseId) => (
                        <div key={courseId} className={styles.certFormActions} style={{ justifyContent: 'space-between' }}>
                          <span>{courseNames[courseId] || courseId}</span>
                          <button
                            type="button"
                            className={studentForm.courseFullAccess?.[courseId] ? styles.certSubmitButton : styles.certReloadButton}
                            onClick={() =>
                              setStudentForm((prev) => ({
                                ...prev,
                                courseFullAccess: {
                                  ...(prev.courseFullAccess || {}),
                                  [courseId]: !prev.courseFullAccess?.[courseId],
                                },
                              }))
                            }
                          >
                            {studentForm.courseFullAccess?.[courseId]
                              ? t('students.fullAccessOn')
                              : t('students.fullAccessOff')}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.certFormActions}>
                <button
                  type="submit"
                  className={styles.certSubmitButton}
                  disabled={studentSaving || !selectedStudentId}
                >
                  {studentSaving ? t('students.saving') : t('students.save')}
                </button>
                {studentSaveNotice ? <span className={styles.noData}>{studentSaveNotice}</span> : null}
              </div>
            </form>
            {selectedStudent && (
              <div className={styles.progressCard} style={{ marginTop: '1rem' }}>
                <h3 className={styles.courseTitle}>{t('students.analyticsTitle', { name: selectedStudent.name })}</h3>
                <div className={styles.progressStats}>
                  <div className={styles.progressStat}>
                    <span className={styles.progressLabel}>{t('students.analyticsAverageProgress')}</span>
                    <span className={styles.progressValue}>{selectedStudent.analytics?.averageProgress || 0}%</span>
                  </div>
                  <div className={styles.progressStat}>
                    <span className={styles.progressLabel}>{t('students.analyticsCompletedLessons')}</span>
                    <span className={styles.progressValue}>{selectedStudent.analytics?.totalCompletedLessons || 0}</span>
                  </div>
                </div>
                {(selectedStudent.analytics?.perCourse || []).length > 0 ? (
                  <div className={styles.usersTable}>
                    <table>
                      <thead>
                        <tr>
                          <th>{t('students.analyticsColumns.course')}</th>
                          <th>{t('students.analyticsColumns.progress')}</th>
                          <th>{t('students.analyticsColumns.completedLessons')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudent.analytics.perCourse.map((course) => (
                          <tr key={course.courseId}>
                            <td>{course.courseName}</td>
                            <td>{course.progress}%</td>
                            <td>{course.completedLessons}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className={styles.emptyState}>{t('students.noCourseProgress')}</p>
                )}
              </div>
            )}
          </div>

        </div>
      )}

      {!stats && !sessionLoading && (
        <div className={styles.errorState}>
          <p>{t('errorState.loadFailed')}</p>
          <button onClick={loadStatistics} className={styles.retryButton}>
            {t('errorState.retry')}
          </button>
        </div>
      )}
    </div>
  )
}

