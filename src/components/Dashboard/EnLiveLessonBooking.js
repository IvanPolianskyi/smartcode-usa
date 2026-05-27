'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Video, CreditCard, Users, User, Loader2 } from 'lucide-react'
import { createEnLessonPayment } from '@/lib/authClient'
import { formatPrice, getLessonPrice } from '@/lib/coursePrices'
import styles from './EnDashboard.module.css'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const TIMES = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

const COURSES = [
  { id: 'roblox-studio', key: 'roblox-studio' },
  { id: 'python-developer-zero-to-junior', key: 'python-developer-zero-to-junior' },
]

export default function EnLiveLessonBooking() {
  const t = useTranslations('dashboard.enBooking')
  const tCourses = useTranslations('dashboard.courses')
  const [courseId, setCourseId] = useState('roblox-studio')
  const [lessonFormat, setLessonFormat] = useState('group')
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [slots, setSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const priceInfo = getLessonPrice(lessonFormat, 'en')

  React.useEffect(() => {
    const fetchSlots = async () => {
      setSlotsLoading(true)
      try {
        const res = await fetch(`/api/lesson-slots?courseId=${courseId}&lessonFormat=${lessonFormat}`)
        if (res.ok) {
          const data = await res.json()
          setSlots(data.slots || [])
          if (data.slots && data.slots.length > 0) {
            setDay(data.slots[0].day)
            setTime(data.slots[0].time)
          } else {
            setDay('')
            setTime('')
          }
        }
      } catch (err) {
        console.error('Failed to fetch slots', err)
      } finally {
        setSlotsLoading(false)
      }
    }
    fetchSlots()
  }, [courseId, lessonFormat])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { paymentUrl } = await createEnLessonPayment({ courseId, lessonFormat, day, time })
      if (paymentUrl) window.location.href = paymentUrl
    } catch (err) {
      setError(err.message || t('errors.failed'))
    } finally {
      setLoading(false)
    }
  }

  const availableDays = [...new Set(slots.map(s => s.day))]
  const availableTimes = slots.filter(s => s.day === day).map(s => s.time)

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2>
          <Video size={20} />
          {t('title')}
        </h2>
        <p>{t('description')}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label htmlFor="en-course">{t('courseLabel')}</label>
            <select
              id="en-course"
              className={styles.select}
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              {COURSES.map((c) => (
                <option key={c.id} value={c.id}>
                  {tCourses(`${c.key}.title`)}
                </option>
              ))}
            </select>
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label>{t('formatLabel')}</label>
            <div className={styles.formatRow}>
              <button
                type="button"
                className={`${styles.formatOption} ${lessonFormat === 'group' ? styles.formatActive : ''}`}
                onClick={() => setLessonFormat('group')}
              >
                <Users size={18} />
                <strong>{t('group')}</strong>
                <span>{formatPrice(10, 'USD', 'en')} / {t('perLesson')}</span>
              </button>
              <button
                type="button"
                className={`${styles.formatOption} ${lessonFormat === 'individual' ? styles.formatActive : ''}`}
                onClick={() => setLessonFormat('individual')}
              >
                <User size={18} />
                <strong>{t('individual')}</strong>
                <span>{formatPrice(15, 'USD', 'en')} / {t('perLesson')}</span>
              </button>
            </div>
          </div>

        {slotsLoading ? (
          <div className={styles.fieldRow}>
            <p className={styles.payNote}>{t('loading')}</p>
          </div>
        ) : availableDays.length === 0 ? (
          <div className={styles.emptySlotsAlert} style={{ margin: '1rem 0', color: '#64748b', textAlign: 'center', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
            {t('noSlots')}
          </div>
        ) : (
          <>
            <div className={styles.field}>
              <label htmlFor="en-day">{t('dayLabel')}</label>
              <select
                id="en-day"
                className={styles.select}
                value={day}
                onChange={(e) => {
                  setDay(e.target.value)
                  const timesForNewDay = slots.filter(s => s.day === e.target.value).map(s => s.time)
                  if (timesForNewDay.length > 0) setTime(timesForNewDay[0])
                }}
              >
                {availableDays.map((d) => (
                  <option key={d} value={d}>
                    {t(`days.${d}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="en-time">{t('timeLabel')}</label>
              <select
                id="en-time"
                className={styles.select}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {availableTimes.map((slotTime) => (
                  <option key={slotTime} value={slotTime}>
                    {slotTime}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        </div>

        <p className={styles.payNote} style={{ marginBottom: '0.25rem' }}>{t('payMethods')}</p>
        <p className={styles.payNote} style={{ marginTop: '0', color: '#64748b' }}>{t('timezoneNote')}</p>

        <button
          type="submit"
          className={`${styles.btnSuccess} ${styles.btnBlock}`}
          disabled={loading || slotsLoading || availableDays.length === 0}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
          {loading ? t('processing') : t('payButton', { price: formatPrice(priceInfo.price, priceInfo.currency, 'en') })}
        </button>

        {error && <p className={styles.errorText}>{error}</p>}
      </form>
    </section>
  )
}
