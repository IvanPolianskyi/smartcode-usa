'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { logout, getUserProgress } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from './Dashboard.module.css'
import {
  User,
  BookOpen,
  Clock,
  TrendingUp,
  LogOut,
  Code,
  Gamepad2,
  Monitor,
  Box,
  CreditCard,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  Trophy,
  ChevronRight,
  BarChart3,
  Users,
  DollarSign,
  Eye,
} from 'lucide-react'

const getCourseInfo = (courseId) => {
  const courses = {
    'python-developer-zero-to-junior': {
      title: 'Пайтон',
      icon: <Code size={20} />,
      color: '#3b82f6',
      link: '/courses/python-developer-zero-to-junior',
      bannerImage: '/python-logo.png',
      bannerGradient: 'linear-gradient(135deg, #1d4ed8, #4338ca)',
    },
    'unity-game-development': {
      title: 'Розробка ігор на Unity',
      icon: <Gamepad2 size={20} />,
      color: '#10b981',
      link: '/Unity',
      bannerImage: '/logos/unity.svg',
      bannerGradient: 'linear-gradient(135deg, #0f766e, #065f46)',
    },
    'roblox-studio': {
      title: 'Roblox Studio',
      icon: <Box size={20} />,
      color: '#10b981',
      link: '/Roblox',
      bannerImage: '/logos/roblox.svg',
      bannerGradient: 'linear-gradient(135deg, #b91c1c, #dc2626)',
    },
    'web-development': {
      title: 'Веб-розробка',
      icon: <Monitor size={20} />,
      color: '#8b5cf6',
      link: '/courses/web-development',
      bannerImage: '/logos/web.svg',
      bannerGradient: 'linear-gradient(135deg, #0f172a, #1d4ed8)',
    },
  }
  return courses[courseId] || {
    title: courseId,
    icon: <BookOpen size={20} />,
    color: '#6b7280',
    link: '#',
    bannerImage: '/projects/default-project.svg',
    bannerGradient: 'linear-gradient(135deg, #334155, #475569)',
  }
}

function AdminDashboard({ adminStats }) {
  const topCourses = adminStats?.users?.courseEnrollments?.slice(0, 4) || []
  return (
    <div className={styles.gridTwo}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}><ShieldCheck size={18} /> Менеджмент</h3>
        <p className={styles.cardText}>Керуйте учнями, розкладом, доступами до курсів та аналітикою.</p>
        <Link href="/admin" className={styles.primaryBtn}>Відкрити адмін-панель</Link>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}><BarChart3 size={18} /> Dashboard</h3>
        <div className={styles.listRow}><span><Eye size={14} /> Відвідування</span><strong>{adminStats?.visits?.total || 0}</strong></div>
        <div className={styles.listRow}><span><Users size={14} /> Користувачі</span><strong>{adminStats?.users?.total || 0}</strong></div>
        <div className={styles.listRow}><span><DollarSign size={14} /> Дохід</span><strong>{adminStats?.payments?.totalRevenue || 0} грн</strong></div>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}><BookOpen size={18} /> Топ курсів</h3>
        {topCourses.length > 0 ? topCourses.map((course) => (
          <div key={course.courseId} className={styles.listRow}>
            <span>{course.courseName}</span>
            <strong>{course.enrolledCount}</strong>
          </div>
        )) : <p className={styles.cardText}>Ще немає даних по записах.</p>}
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}><TrendingUp size={18} /> Активність 30 днів</h3>
        <div className={styles.metric}>{adminStats?.visits?.last30Days || 0}</div>
        <p className={styles.cardText}>Візити за останній місяць</p>
      </div>
    </div>
  )
}

function StudentDashboard({ user, progressData, paymentStats, refreshData }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showReceiptForm, setShowReceiptForm] = useState(false)
  const [receiptAmount, setReceiptAmount] = useState('')
  const [receiptFile, setReceiptFile] = useState(null)
  const [receiptSubmitting, setReceiptSubmitting] = useState(false)
  const [receiptMessage, setReceiptMessage] = useState('')
  const profile = user?.studentProfile || { regularSchedule: [], activeOnlineCourses: [], lessonFormat: 'group', zoomLink: '' }
  const lessonPrice = profile.lessonFormat === 'individual' ? 500 : 350
  const schedule = profile.regularSchedule || []
  const activeCourses = profile.activeOnlineCourses || []
  const zoomLink = profile.zoomLink || ''
  const completedLessonsTotal = Object.values(progressData || {}).reduce((sum, p) => sum + (p?.completedLessons?.length || 0), 0)
  const lessonHistory = Object.entries(progressData || {}).flatMap(([courseId, progress]) =>
    (progress?.completedLessons || []).map((lessonId) => ({ courseId, lessonId }))
  )
  const scheduleInfo = useMemo(() => {
    const slots = (schedule || [])
      .map((item) => {
        const dayMap = { 'Нд': 0, 'Пн': 1, 'Вт': 2, 'Ср': 3, 'Чт': 4, 'Пт': 5, 'Сб': 6 }
        const dayIndex = dayMap[item?.day]
        const [hh, mm] = String(item?.time || '').split(':')
        const hours = Number(hh)
        const minutes = Number(mm)
        if (dayIndex === undefined || !Number.isFinite(hours) || !Number.isFinite(minutes)) return null
        return { dayIndex, hours, minutes }
      })
      .filter(Boolean)

    if (slots.length === 0) {
      return {
        weeklyTotal: 0,
        weeklyCompleted: 0,
        weeklyRemaining: 0,
        nextLessonText: 'Немає запланованих уроків',
      }
    }

    const now = new Date()
    const currentDay = now.getDay()
    const endOfWeek = new Date(now)
    endOfWeek.setDate(now.getDate() + (7 - currentDay))
    endOfWeek.setHours(0, 0, 0, 0)
    const startOfWeek = new Date(endOfWeek)
    startOfWeek.setDate(endOfWeek.getDate() - 6)
    startOfWeek.setHours(0, 0, 0, 0)

    const upcomingThisWeek = []
    const upcomingAll = []
    const thisWeekAll = []

    slots.forEach((slot) => {
      const next = new Date(now)
      const diff = (slot.dayIndex - now.getDay() + 7) % 7
      next.setDate(now.getDate() + diff)
      next.setHours(slot.hours, slot.minutes, 0, 0)
      if (next <= now) next.setDate(next.getDate() + 7)
      upcomingAll.push(next)
      if (next < endOfWeek) {
        upcomingThisWeek.push(next)
      }

      const currentWeekSlot = new Date(startOfWeek)
      const weekDiff = (slot.dayIndex - startOfWeek.getDay() + 7) % 7
      currentWeekSlot.setDate(startOfWeek.getDate() + weekDiff)
      currentWeekSlot.setHours(slot.hours, slot.minutes, 0, 0)
      if (currentWeekSlot >= startOfWeek && currentWeekSlot < endOfWeek) {
        thisWeekAll.push(currentWeekSlot)
      }
    })

    const nextLesson = upcomingAll.sort((a, b) => a.getTime() - b.getTime())[0]
    const nextLessonText = nextLesson
      ? nextLesson.toLocaleString('uk-UA', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
      : 'Немає запланованих уроків'

    return {
      weeklyTotal: thisWeekAll.length,
      weeklyCompleted: Math.max(0, thisWeekAll.length - upcomingThisWeek.length),
      weeklyRemaining: upcomingThisWeek.length,
      nextLessonText,
    }
  }, [schedule])

  const weeklyGoal = Math.max(1, scheduleInfo.weeklyTotal || 0)
  const weekProgress = Math.min(scheduleInfo.weeklyCompleted || 0, weeklyGoal)

  const motivationalText = scheduleInfo.weeklyRemaining > 0
    ? `Ще ${scheduleInfo.weeklyRemaining} урок(и) цього тижня. Наступний: ${scheduleInfo.nextLessonText}`
    : `На цьому тижні уроків більше немає. Наступний: ${scheduleInfo.nextLessonText}`

  const handleReceiptSubmit = async (event) => {
    event.preventDefault()
    setReceiptMessage('')
    if (!receiptAmount || Number(receiptAmount) <= 0) {
      setReceiptMessage('Вкажіть коректну суму оплати')
      return
    }
    if (Number(receiptAmount) % lessonPrice !== 0) {
      setReceiptMessage(`Сума має бути кратною ${lessonPrice} грн для вашого плану`)
      return
    }
    if (!receiptFile) {
      setReceiptMessage('Додайте фото квитанції')
      return
    }

    setReceiptSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('amount', receiptAmount)
      formData.append('receipt', receiptFile)
      const response = await fetch('/api/payment/receipt', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error || 'Не вдалося відправити квитанцію')
      }
      setReceiptMessage(`Квитанцію відправлено. Після підтвердження адміном буде нараховано уроків: ${data.creditedLessonsPreview || 0}`)
      setReceiptAmount('')
      setReceiptFile(null)
      await refreshData()
    } catch (error) {
      setReceiptMessage(error.message || 'Помилка відправки квитанції')
    } finally {
      setReceiptSubmitting(false)
    }
  }

  return (
    <>
      <div className={styles.heroCard}>
        <div>
          <div className={styles.heroLabel}><Sparkles size={16} /> Прогрес учня</div>
          <h2 className={styles.heroTitle}>Привіт, {user.name}! Продовжуємо навчання</h2>
          <p className={styles.heroText}>{motivationalText}</p>
        </div>
        <div className={styles.goalBox}>
          <div className={styles.goalTop}><Trophy size={16} /> Ціль тижня</div>
          <div className={styles.goalProgress}>{weekProgress}/{weeklyGoal}</div>
          <div className={styles.goalBar}><span style={{ width: `${(weekProgress / weeklyGoal) * 100}%` }} /></div>
        </div>
      </div>

      <div className={styles.tabRow}>
        <button className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab('overview')}>Огляд</button>
        <button className={`${styles.tabBtn} ${activeTab === 'history' ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab('history')}>Історія</button>
      </div>

      <div className={styles.gridThree}>
        <div className={styles.card}><div className={styles.metric}>{activeCourses.length}</div><div className={styles.cardText}>Активних курсів</div></div>
        <div className={styles.card}><div className={styles.metric}>{completedLessonsTotal}</div><div className={styles.cardText}>Завершених уроків</div></div>
        <div className={styles.card}><div className={styles.metric}>{profile.lessonFormat === 'individual' ? 'Індивідуальний' : 'Груповий'}</div><div className={styles.cardText}>Формат навчання</div></div>
      </div>

      {activeTab !== 'history' && (
      <div className={styles.gridTwo}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}><BookOpen size={18} /> Мої курси</h3>
          {activeCourses.length > 0 ? activeCourses.map((courseId) => {
            const course = getCourseInfo(courseId)
            const progress = progressData?.[courseId]?.overallProgress || 0
            return (
              <Link key={courseId} href={course.link} className={styles.courseRow}>
                <div className={styles.courseBanner} style={{ background: course.bannerGradient }}>
                  {course.bannerImage ? (
                    <img src={course.bannerImage} alt={course.title} className={styles.courseBannerImage} />
                  ) : (
                    <div className={styles.courseBannerFallbackIcon}>
                      {course.icon}
                    </div>
                  )}
                  <div className={styles.courseBannerOverlay}>
                    <span className={styles.coursePill}>{course.icon} {course.title}</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
                <div className={styles.courseRowTop}>
                  <span className={styles.courseMeta}>Курс активний</span>
                  <span className={styles.courseMeta}>Перейти</span>
                </div>
                <div className={styles.goalBar}><span style={{ width: `${progress}%` }} /></div>
                <div className={styles.courseMeta}>Прогрес: {progress}%</div>
              </Link>
            )
          }) : <p className={styles.cardText}>Курси ще не призначено.</p>}
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}><CalendarDays size={18} /> Розклад і Zoom</h3>
          {schedule.length > 0 ? schedule.map((item, i) => (
            <div key={`${item.day}-${item.time}-${i}`} className={styles.listRow}>
              <span>{item.day}</span>
              <span>{item.time || 'час уточнюється'}</span>
            </div>
          )) : <p className={styles.cardText}>Розклад ще не налаштовано.</p>}
          <button
            className={styles.primaryBtn}
            disabled={!zoomLink}
            onClick={() => zoomLink && window.open(zoomLink, '_blank', 'noopener,noreferrer')}
          >
            {zoomLink ? 'Приєднатися до уроку в Zoom' : 'Очікує Zoom посилання'}
          </button>
        </div>
      </div>
      )}

      {(activeTab === 'overview' || activeTab === 'history') && (
      <div className={styles.gridTwo}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}><Clock size={18} /> Історія уроків</h3>
          {lessonHistory.length > 0 ? lessonHistory.slice(0, 20).map((entry, idx) => (
            <div key={`${entry.lessonId}-${idx}`} className={styles.listRow}>
              <span>{getCourseInfo(entry.courseId).title}</span>
              <span>{entry.lessonId}</span>
            </div>
          )) : <p className={styles.cardText}>Ще немає завершених уроків.</p>}
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}><CreditCard size={18} /> Статистика оплат</h3>
          <div className={styles.listRow}><span>Успішні</span><strong>{paymentStats.completed}</strong></div>
          <div className={styles.listRow}><span>В очікуванні</span><strong>{paymentStats.pending}</strong></div>
          <div className={styles.listRow}><span>Невдалі</span><strong>{paymentStats.failed}</strong></div>
          <div className={styles.listRow}><span>Сума оплат</span><strong>{paymentStats.totalAmount} грн</strong></div>
          <div className={styles.listRow}><span>Нараховано уроків</span><strong>{paymentStats.lessonCredits || 0}</strong></div>
          <div className={styles.listRow}><span>Баланс акаунта</span><strong>{paymentStats.accountBalance || 0} грн</strong></div>
          <div className={styles.paymentAccount}>
            <strong>Рахунок для оплати уроків:</strong> 5408810042089184
          </div>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => setShowReceiptForm((prev) => !prev)}
          >
            {showReceiptForm ? 'Сховати форму' : 'Прикріпити квитанцію'}
          </button>
          {showReceiptForm && (
            <form className={styles.receiptForm} onSubmit={handleReceiptSubmit}>
              <label className={styles.receiptLabel}>
                Сума оплати (грн)
                <input
                  type="number"
                  min={lessonPrice}
                  step={lessonPrice}
                  value={receiptAmount}
                  onChange={(e) => setReceiptAmount(e.target.value)}
                  className={styles.receiptInput}
                  placeholder={`Наприклад: ${lessonPrice * 2}`}
                  required
                />
              </label>
              <p className={styles.receiptMessage} style={{ marginTop: '-0.15rem' }}>
                Доступні лише суми, кратні {lessonPrice} грн ({profile.lessonFormat === 'individual' ? 'індивідуальний' : 'груповий'} формат).
              </p>
              <label className={styles.receiptLabel}>
                Фото квитанції
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                  className={styles.receiptInput}
                  required
                />
              </label>
              <button type="submit" className={styles.primaryBtn} disabled={receiptSubmitting}>
                {receiptSubmitting ? 'Відправка...' : 'Надіслати квитанцію'}
              </button>
              {receiptMessage && <p className={styles.receiptMessage}>{receiptMessage}</p>}
            </form>
          )}
        </div>
      </div>
      )}

      <div className={styles.toolbar}>
        <button className={styles.secondaryBtn} onClick={refreshData}><TrendingUp size={16} /> Оновити дані</button>
      </div>
    </>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: sessionLoading, refresh } = useAuthSession()
  const [progressData, setProgressData] = useState({})
  const [paymentStats, setPaymentStats] = useState({ completed: 0, pending: 0, failed: 0, totalAmount: 0 })
  const [adminStats, setAdminStats] = useState(null)
  const [progressLoading, setProgressLoading] = useState(true)

  const loadData = useCallback(async () => {
    if (!user) return
    setProgressLoading(true)
    try {
      if (user.role === 'admin') {
        const adminStatsResponse = await fetch('/api/admin/statistics')
        if (adminStatsResponse.ok) {
          const stats = await adminStatsResponse.json()
          setAdminStats(stats)
        }
        return
      }
      if (user.enrolledCourses?.length > 0) {
        const progressResults = await Promise.all(
          user.enrolledCourses.map((courseId) =>
            getUserProgress(courseId).then((progress) => ({ courseId, progress })).catch(() => ({ courseId, progress: null }))
          )
        )
        const map = {}
        progressResults.forEach(({ courseId, progress }) => { map[courseId] = progress })
        setProgressData(map)
      } else {
        setProgressData({})
      }
      const paymentResponse = await fetch('/api/payment/history')
      if (paymentResponse.ok) {
        const data = await paymentResponse.json()
        setPaymentStats(data.stats || { completed: 0, pending: 0, failed: 0, totalAmount: 0, lessonCredits: 0, accountBalance: 0 })
      }
    } finally {
      setProgressLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (sessionLoading) return
    if (!user) {
      router.push('/login')
      return
    }
    loadData()
  }, [sessionLoading, user, router, loadData])

  const loading = sessionLoading || progressLoading
  const roleLabel = useMemo(() => (user?.role === 'admin' ? 'Адміністратор' : 'Учень'), [user?.role])

  const refreshData = async () => {
    await refresh(false)
    await loadData()
  }

  const handleLogout = async () => {
    try {
      await logout()
      window.dispatchEvent(new Event('auth:logout'))
      router.push('/')
      router.refresh()
    } catch {}
  }

  if (loading) return <div className={styles.container}><div className={styles.loading}>Завантаження...</div></div>
  if (!user) return null

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.avatar}><User size={28} /></div>
          <div>
            <h1 className={styles.title}>Особистий кабінет</h1>
            <p className={styles.subtitle}>{user.name} · {user.email} · {roleLabel}</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          {user.role === 'admin' && <Link href="/admin" className={styles.secondaryBtn}>Адмін-панель</Link>}
          <button className={styles.secondaryBtn} onClick={handleLogout}><LogOut size={16} /> Вийти</button>
        </div>
      </header>

      {user.role === 'admin'
        ? <AdminDashboard adminStats={adminStats} />
        : <StudentDashboard user={user} progressData={progressData} paymentStats={paymentStats} refreshData={refreshData} />}
    </div>
  )
}

