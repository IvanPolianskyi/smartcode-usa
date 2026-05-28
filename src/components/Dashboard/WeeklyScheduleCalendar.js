'use client'

import React, { useMemo } from 'react'
import { CalendarDays, Video, Clock } from 'lucide-react'
import { DAY_KEY_MAP } from '@/hooks/useDashboardCourses'
import {
  addDaysToDateKey,
  formatKyivLocale,
  isKyivDateKeyToday,
  kyivWeekRange,
  nextKyivWeekdaySlot,
} from '@/lib/kyivTime'
import { normalizeScheduleDay } from '@/lib/studentScheduleStats'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

const WEEK_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const DAY_INDEX = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 }

function parseSlot(item) {
  const dayNorm = normalizeScheduleDay(item?.day)
  const dayKey = DAY_KEY_MAP[dayNorm]
  if (!dayKey || DAY_INDEX[dayKey] === undefined) return null
  const [hh, mm] = String(item?.time || '').split(':')
  const hours = Number(hh)
  const minutes = Number(mm)
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null
  return {
    dayKey,
    dayIndex: DAY_INDEX[dayKey],
    hours,
    minutes,
    time: item.time,
    zoomLink: item.zoomLink,
  }
}

function isJoinWindow(lessonDate, now = new Date()) {
  const start = lessonDate.getTime()
  const openFrom = start - 15 * 60 * 1000
  const openUntil = start + 2 * 60 * 60 * 1000
  const t = now.getTime()
  return t >= openFrom && t <= openUntil
}

export default function WeeklyScheduleCalendar({
  schedule,
  zoomLink,
  t,
  dateLocale,
}) {
  const now = new Date()
  const kyivWeek = kyivWeekRange(now)

  const slots = useMemo(
    () => (schedule || []).map(parseSlot).filter(Boolean),
    [schedule]
  )

  const weekRows = useMemo(() => {
    const { mondayKey } = kyivWeek
    return WEEK_DAYS.map((dayKey) => {
      const daySlots = slots.filter((s) => s.dayKey === dayKey)
      const daysFromMonday = DAY_INDEX[dayKey] === 0 ? 6 : DAY_INDEX[dayKey] - 1
      const cellDateKey = addDaysToDateKey(mondayKey, daysFromMonday)
      const isToday = isKyivDateKeyToday(cellDateKey)

      const enriched = daySlots
        .map((slot) => {
          const lessonAt = nextKyivWeekdaySlot(
            slot.dayIndex,
            slot.hours,
            slot.minutes
          )
          const slotZoomLink = slot.zoomLink || zoomLink
          const joinActive = Boolean(slotZoomLink) && isJoinWindow(lessonAt, now)
          return { ...slot, lessonAt, joinActive, slotZoomLink }
        })
        .sort((a, b) => a.hours * 60 + a.minutes - (b.hours * 60 + b.minutes))

      return {
        dayKey,
        label: t(`days.${dayKey}`),
        isToday,
        slots: enriched,
      }
    })
  }, [slots, kyivWeek, now, zoomLink, t])

  const nextLesson = useMemo(() => {
    const all = slots.map((s) => ({
      slot: s,
      at: nextKyivWeekdaySlot(s.dayIndex, s.hours, s.minutes),
    }))
    return all.sort((a, b) => a.at - b.at)[0]
  }, [slots])

  return (
    <section className={styles.calendarCard}>
      <div className={styles.sectionHeader}>
        <h3>
          <CalendarDays size={20} />
          {t('student.calendar.title')}
        </h3>
        {nextLesson ? (
          <p className={styles.sectionHint}>
            {t('student.calendar.next')}:{' '}
            {formatKyivLocale(nextLesson.at, dateLocale, {
              weekday: 'short',
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        ) : (
          <p className={styles.sectionHint}>{t('student.zoom.empty')}</p>
        )}
      </div>

      <ul className={styles.scheduleList}>
        {weekRows.map((row) => (
          <li
            key={row.dayKey}
            className={`${styles.scheduleRow} ${row.isToday ? styles.scheduleRowToday : ''} ${row.slots.length === 0 ? styles.scheduleRowEmpty : ''}`}
          >
            <div className={styles.scheduleRowDay}>
              <span className={styles.scheduleDayBadge}>{row.label}</span>
              {row.isToday ? (
                <span className={styles.scheduleTodayTag}>
                  {t('student.calendar.today')}
                </span>
              ) : null}
            </div>

            <div className={styles.scheduleRowBody}>
              {row.slots.length === 0 ? (
                <span className={styles.scheduleRowFree}>
                  {t('student.calendar.noLesson')}
                </span>
              ) : (
                row.slots.map((slot, i) => (
                  <div
                    key={`${row.dayKey}-${slot.time}-${i}`}
                    className={`${styles.scheduleLesson} ${slot.joinActive ? styles.scheduleLessonLive : ''}`}
                  >
                    <div className={styles.scheduleLessonInfo}>
                      <span className={styles.scheduleLessonTime}>
                        <Clock size={14} />
                        {slot.time || t('student.schedule.timePending')}
                      </span>
                      <span className={styles.scheduleLessonTopic}>
                        {t('student.calendar.liveLesson')}
                      </span>
                    </div>
                    <button
                      type="button"
                      className={styles.scheduleJoinBtn}
                      disabled={!slot.slotZoomLink}
                      onClick={() =>
                        slot.slotZoomLink &&
                        window.open(
                          slot.slotZoomLink,
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
                    >
                      <Video size={15} />
                      {slot.slotZoomLink
                        ? t('student.calendar.joinNow')
                        : t('student.calendar.joinSoon')}
                    </button>
                  </div>
                ))
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
