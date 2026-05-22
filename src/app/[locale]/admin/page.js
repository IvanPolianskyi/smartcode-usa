'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
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
  const [courseNames, setCourseNames] = useState({})
  const [crmTeachers, setCrmTeachers] = useState([])
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [studentSaving, setStudentSaving] = useState(false)
  const [studentSaveNotice, setStudentSaveNotice] = useState('')
  const [studentSearch, setStudentSearch] = useState('')
  const [studentForm, setStudentForm] = useState({
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
  const studentEditorRef = useRef(null)
  const selectedStudent = students.find((student) => student.id === selectedStudentId) || null
  const pythonLessons = pythonCurriculum.modules.flatMap((module) => module.lessons)
  const filteredStudents = useMemo(() => {
    const query = studentSearch.trim().toLowerCase()
    if (!query) return students
    return students.filter((student) =>
      (student.name || '').toLowerCase().includes(query) ||
      (student.email || '').toLowerCase().includes(query)
    )
  }, [students, studentSearch])

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

  const handleSelectStudent = (student) => {
    const schedule = student.profile?.regularSchedule || []
    const dayList = schedule.map((item) => item.day).filter(Boolean)
    const scheduleByDay = {}
    schedule.forEach((item) => {
      if (item?.day) scheduleByDay[item.day] = item.time || ''
    })
    const onlineCourseIds = student.profile?.activeOnlineCourses || []
    const pythonAccess = student.profile?.courseAccess?.['python-developer-zero-to-junior'] || {}
    const unlockedLessons = pythonAccess.unlockedLessons || []

    setSelectedStudentId(student.id)
    setStudentForm({
      lessonFormat: student.profile?.lessonFormat || 'group',
      regularDays: dayList,
      regularScheduleByDay: scheduleByDay,
      zoomLink: student.profile?.zoomLink || '',
      crmTeacherId: student.profile?.crmTeacherId || '',
      crmTeacherName: student.profile?.crmTeacherName || '',
      onlineCourseIds,
      pythonAccessEnabled: Boolean(pythonAccess.enabled),
      pythonUnlockedLessons: unlockedLessons,
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
          pythonAccessEnabled: studentForm.pythonAccessEnabled,
          pythonUnlockedLessons: studentForm.pythonUnlockedLessons,
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

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: '#e0e7ff' }}>
                <DollarSign size={24} color="#8b5cf6" />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  {formatCurrency(stats.payments?.totalRevenue || 0)}
                </div>
                <div className={styles.statLabel}>{t('stats.totalRevenue')}</div>
                <div className={styles.statSubLabel}>
                  {t('stats.pendingPayments', { count: stats.payments?.pending || 0 })}
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
            <div className={styles.certFormActions} style={{ marginBottom: '1rem' }}>
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
            {receiptsLoading ? (
              <p className={styles.emptyState}>{t('receipts.loading')}</p>
            ) : receipts.length === 0 ? (
              <p className={styles.emptyState}>{t('receipts.empty')}</p>
            ) : (
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
                    {receipts.map((receipt) => (
                      <tr key={receipt.id}>
                        <td>{receipt.studentName}<br />{receipt.studentEmail}</td>
                        <td>{formatCurrency(receipt.amount)}</td>
                        <td>
                          {receipt.lessonFormat === 'individual' ? t('receipts.individual') : t('receipts.group')}
                          <br />
                          {t('receipts.pricePerLesson', { price: receipt.lessonPrice })}
                        </td>
                        <td>{receipt.creditedLessons}</td>
                        <td>{formatDate(receipt.createdAt)}</td>
                        <td>
                          {receipt.receipt?.dataUrl ? (
                            <a href={receipt.receipt.dataUrl} target="_blank" rel="noreferrer" className={styles.receiptLink}>
                              <img
                                src={receipt.receipt.dataUrl}
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
            </div>
            <div className={styles.usersTable}>
              <table>
                <thead>
                  <tr>
                    <th>{t('students.columns.student')}</th>
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
                        >
                          {t('students.openProfile')}
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

              <div className={styles.certFormRow}>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>{t('students.pythonAccessLabel')}</label>
                  <label className={styles.certLabel}>
                    <input
                      type="checkbox"
                      name="pythonAccessEnabled"
                      checked={studentForm.pythonAccessEnabled}
                      onChange={handleStudentFormChange}
                      style={{ marginRight: '0.5rem' }}
                    />
                    {t('students.pythonAccessEnable')}
                  </label>
                </div>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>{t('students.pythonLessonsLabel')}</label>
                  <div className={styles.certFormActions}>
                    <button
                      type="button"
                      className={styles.certReloadButton}
                      onClick={() => {
                        const firstFive = pythonLessons.slice(0, 5).map((lesson) => lesson.lessonId)
                        setStudentForm((prev) => ({ ...prev, pythonUnlockedLessons: firstFive }))
                      }}
                    >
                      {t('students.unlockFirst5')}
                    </button>
                    <button
                      type="button"
                      className={styles.certReloadButton}
                      onClick={() => setStudentForm((prev) => ({ ...prev, pythonUnlockedLessons: [] }))}
                    >
                      {t('students.lockAll')}
                    </button>
                  </div>
                  <div className={styles.usersTable} style={{ maxHeight: '260px', overflowY: 'auto' }}>
                    <table>
                      <thead>
                        <tr>
                          <th>{t('students.pythonLessonsColumns.unlock')}</th>
                          <th>{t('students.pythonLessonsColumns.lesson')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pythonLessons.map((lesson) => (
                          <tr key={lesson.lessonId}>
                            <td>
                              <input
                                type="checkbox"
                                checked={studentForm.pythonUnlockedLessons.includes(lesson.lessonId)}
                                onChange={() => toggleStudentArrayItem('pythonUnlockedLessons', lesson.lessonId)}
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

