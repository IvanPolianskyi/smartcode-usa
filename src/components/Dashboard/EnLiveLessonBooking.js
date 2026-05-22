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
  const [day, setDay] = useState('mon')
  const [time, setTime] = useState('18:00')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const priceInfo = getLessonPrice(lessonFormat, 'en')

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

          <div className={styles.field}>
            <label htmlFor="en-day">{t('dayLabel')}</label>
            <select
              id="en-day"
              className={styles.select}
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {DAYS.map((d) => (
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
              {TIMES.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className={styles.payNote}>{t('payMethods')}</p>

        <button
          type="submit"
          className={`${styles.btnPrimary} ${styles.btnBlock}`}
          style={{ marginTop: '1rem' }}
          disabled={loading}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
          {loading ? t('processing') : t('payButton', { price: formatPrice(priceInfo.price, priceInfo.currency, 'en') })}
        </button>

        {error && <p className={styles.errorText}>{error}</p>}
      </form>
    </section>
  )
}
