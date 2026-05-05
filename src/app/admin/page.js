'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from './AdminPanel.module.css'
import {
  Users,
  ShoppingCart,
  Eye,
  TrendingUp,
  BookOpen,
  DollarSign,
  Calendar,
  BarChart3,
  RefreshCw,
  LogOut,
  Award
} from 'lucide-react'

export default function AdminPanelPage() {
  const router = useRouter()
  const { user, loading: sessionLoading } = useAuthSession()
  const [stats, setStats] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [certificates, setCertificates] = useState([])
  const [loadingCertificates, setLoadingCertificates] = useState(false)
  const [certForm, setCertForm] = useState({
    studentEmail: '',
    courseId: '',
    title: '',
    description: ''
  })
  const [certSubmitting, setCertSubmitting] = useState(false)

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
    loadCertificates()
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
      alert('Помилка завантаження статистики')
    } finally {
      setRefreshing(false)
    }
  }

  const loadCertificates = async () => {
    try {
      setLoadingCertificates(true)
      const response = await fetch('/api/admin/certificates')

      if (response.status === 403) {
        router.push('/dashboard')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to load certificates')
      }

      const data = await response.json()
      setCertificates(data.certificates || [])
    } catch (error) {
      console.error('Error loading certificates:', error)
      alert('Помилка завантаження дипломів')
    } finally {
      setLoadingCertificates(false)
    }
  }

  const handleCertFormChange = (e) => {
    const { name, value } = e.target
    setCertForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateCertificate = async (e) => {
    e.preventDefault()
    if (!certForm.studentEmail || !certForm.courseId) {
      alert('Введіть email учня та ID курсу')
      return
    }
    setCertSubmitting(true)
    try {
      const response = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(certForm)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create certificate')
      }

      setCertificates((prev) => [data.certificate, ...prev])
      setCertForm({
        studentEmail: '',
        courseId: '',
        title: '',
        description: ''
      })
      alert('Диплом успішно створено')
    } catch (error) {
      console.error('Create certificate error:', error)
      alert(error.message || 'Помилка створення диплому')
    } finally {
      setCertSubmitting(false)
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
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (date) => {
    if (!date) return 'Н/Д'
    return new Date(date).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (sessionLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Завантаження...</div>
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
            <h1 className={styles.title}>Адмін Панель</h1>
            <p className={styles.subtitle}>Бізнес статистика</p>
          </div>
          <div className={styles.headerActions}>
            <button 
              onClick={loadStatistics} 
              className={styles.refreshButton}
              disabled={refreshing}
            >
              <RefreshCw size={20} className={refreshing ? styles.spinning : ''} />
              Оновити
            </button>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <LogOut size={20} />
              Вийти
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
                <div className={styles.statLabel}>Всього відвідувань</div>
                <div className={styles.statSubLabel}>
                  {stats.visits?.last30Days || 0} за останні 30 днів
                </div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: '#dcfce7' }}>
                <Users size={24} color="#10b981" />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stats.users?.total || 0}</div>
                <div className={styles.statLabel}>Всього користувачів</div>
                <div className={styles.statSubLabel}>
                  {stats.users?.withPurchases || 0} з покупками
                </div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7' }}>
                <ShoppingCart size={24} color="#f59e0b" />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stats.payments?.completed || 0}</div>
                <div className={styles.statLabel}>Успішних покупок</div>
                <div className={styles.statSubLabel}>
                  {stats.payments?.total || 0} всього спроб
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
                <div className={styles.statLabel}>Загальний дохід</div>
                <div className={styles.statSubLabel}>
                  {stats.payments?.pending || 0} в очікуванні
                </div>
              </div>
            </div>
          </div>

          {/* Course Enrollments */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <BookOpen size={24} />
              Записи на курси
            </h2>
            {stats.users?.courseEnrollments && stats.users.courseEnrollments.length > 0 ? (
              <div className={styles.courseGrid}>
                {stats.users.courseEnrollments.map((course) => (
                  <div key={course.courseId} className={styles.courseCard}>
                    <h3 className={styles.courseTitle}>{course.courseName}</h3>
                    <div className={styles.courseStat}>
                      <Users size={20} />
                      <span>{course.enrolledCount} записів</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyState}>Немає записів на курси</p>
            )}
          </div>

          {/* Certificates management */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Award size={24} />
              Дипломи учнів
            </h2>

            <form onSubmit={handleCreateCertificate} className={styles.certForm}>
              <div className={styles.certFormRow}>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>Email учня</label>
                  <input
                    type="email"
                    name="studentEmail"
                    value={certForm.studentEmail}
                    onChange={handleCertFormChange}
                    className={styles.certInput}
                    placeholder="student@example.com"
                    required
                  />
                </div>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>ID курсу</label>
                  <select
                    name="courseId"
                    value={certForm.courseId}
                    onChange={handleCertFormChange}
                    className={styles.certInput}
                    required
                  >
                    <option value="">Оберіть курс</option>
                    <option value="python-developer-zero-to-junior">
                      Python Developer: From Zero to Confident Junior
                    </option>
                    <option value="web-development">Веб-розробка</option>
                    <option value="unity-game-development">Розробка ігор на Unity</option>
                    <option value="roblox-studio">Roblox Studio</option>
                  </select>
                </div>
              </div>

              <div className={styles.certFormRow}>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>Назва диплому</label>
                  <input
                    type="text"
                    name="title"
                    value={certForm.title}
                    onChange={handleCertFormChange}
                    className={styles.certInput}
                    placeholder="Сертифікат про завершення курсу"
                  />
                </div>
              </div>

              <div className={styles.certFormRow}>
                <div className={styles.certFormGroup}>
                  <label className={styles.certLabel}>Опис (необов'язково)</label>
                  <textarea
                    name="description"
                    value={certForm.description}
                    onChange={handleCertFormChange}
                    className={styles.certInput}
                    rows={3}
                    placeholder="Наприклад: Успішно завершив курс та виконав усі практичні завдання"
                  />
                </div>
              </div>

              <div className={styles.certFormActions}>
                <button
                  type="submit"
                  className={styles.certSubmitButton}
                  disabled={certSubmitting}
                >
                  {certSubmitting ? 'Створення...' : 'Створити диплом'}
                </button>
                <button
                  type="button"
                  onClick={loadCertificates}
                  className={styles.certReloadButton}
                  disabled={loadingCertificates}
                >
                  <RefreshCw size={16} className={loadingCertificates ? styles.spinning : ''} />
                  Оновити список
                </button>
              </div>
            </form>

            <div className={styles.certList}>
              {loadingCertificates ? (
                <p className={styles.emptyState}>Завантаження дипломів...</p>
              ) : certificates.length === 0 ? (
                <p className={styles.emptyState}>Поки що немає створених дипломів</p>
              ) : (
                <div className={styles.certTableWrapper}>
                  <table className={styles.certTable}>
                    <thead>
                      <tr>
                        <th>Учень</th>
                        <th>Email</th>
                        <th>Курс</th>
                        <th>Назва диплому</th>
                        <th>Дата видачі</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.map((cert) => (
                        <tr key={cert.id}>
                          <td>{cert.userName}</td>
                          <td>{cert.userEmail}</td>
                          <td>{cert.courseName}</td>
                          <td>{cert.title}</td>
                          <td>
                            {cert.issuedAt
                              ? new Date(cert.issuedAt).toLocaleDateString('uk-UA')
                              : 'Н/Д'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Course Progress */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <TrendingUp size={24} />
              Прогрес по курсах
            </h2>
            {stats.courseProgress && stats.courseProgress.length > 0 ? (
              <div className={styles.progressGrid}>
                {stats.courseProgress.map((course) => (
                  <div key={course.courseId} className={styles.progressCard}>
                    <h3 className={styles.courseTitle}>{course.courseName}</h3>
                    <div className={styles.progressStats}>
                      <div className={styles.progressStat}>
                        <span className={styles.progressLabel}>Записано:</span>
                        <span className={styles.progressValue}>{course.totalEnrolled}</span>
                      </div>
                      <div className={styles.progressStat}>
                        <span className={styles.progressLabel}>Середній прогрес:</span>
                        <span className={styles.progressValue}>{course.averageProgress}%</span>
                      </div>
                      <div className={styles.progressStat}>
                        <span className={styles.progressLabel}>Завершено уроків:</span>
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
              <p className={styles.emptyState}>Немає даних про прогрес</p>
            )}
          </div>

          {/* Users with Courses */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Users size={24} />
              Користувачі та їх курси
            </h2>
            {stats.detailedUsers && stats.detailedUsers.length > 0 ? (
              <div className={styles.usersTable}>
                <table>
                  <thead>
                    <tr>
                      <th>Ім'я</th>
                      <th>Email</th>
                      <th>Куплені курси</th>
                      <th>Записані курси</th>
                      <th>Дата реєстрації</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.detailedUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.purchasedCourses.length > 0 ? (
                            <div className={styles.coursesList}>
                              {user.purchasedCourses.map((course, idx) => (
                                <span key={idx} className={styles.courseBadge}>
                                  {course.courseName}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className={styles.noData}>Немає</span>
                          )}
                        </td>
                        <td>
                          {user.enrolledCourses.length > 0 ? (
                            <div className={styles.coursesList}>
                              {user.enrolledCourses.map((course, idx) => (
                                <span key={idx} className={styles.courseBadge}>
                                  {course.courseName}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className={styles.noData}>Немає</span>
                          )}
                        </td>
                        <td>{formatDate(user.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.emptyState}>Немає користувачів з курсами</p>
            )}
          </div>

          {/* Payment Details */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <BarChart3 size={24} />
              Деталі платежів
            </h2>
            <div className={styles.paymentStats}>
              <div className={styles.paymentStatCard}>
                <div className={styles.paymentStatLabel}>Успішні</div>
                <div className={styles.paymentStatValue} style={{ color: '#10b981' }}>
                  {stats.payments?.completed || 0}
                </div>
              </div>
              <div className={styles.paymentStatCard}>
                <div className={styles.paymentStatLabel}>В очікуванні</div>
                <div className={styles.paymentStatValue} style={{ color: '#f59e0b' }}>
                  {stats.payments?.pending || 0}
                </div>
              </div>
              <div className={styles.paymentStatCard}>
                <div className={styles.paymentStatLabel}>Невдалі</div>
                <div className={styles.paymentStatValue} style={{ color: '#ef4444' }}>
                  {stats.payments?.failed || 0}
                </div>
              </div>
              <div className={styles.paymentStatCard}>
                <div className={styles.paymentStatLabel}>Всього спроб</div>
                <div className={styles.paymentStatValue}>
                  {stats.payments?.total || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!stats && !sessionLoading && (
        <div className={styles.errorState}>
          <p>Не вдалося завантажити статистику</p>
          <button onClick={loadStatistics} className={styles.retryButton}>
            Спробувати знову
          </button>
        </div>
      )}
    </div>
  )
}

