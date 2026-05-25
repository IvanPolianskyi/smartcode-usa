'use client'

import React, { useMemo } from 'react'
import { CalendarDays, Video, Clock } from 'lucide-react'
import { DAY_KEY_MAP } from '@/hooks/useDashboardCourses'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

const WEEK_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const DAY_INDEX = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 }

function parseSlot(item) {
  const dayKey = DAY_KEY_MAP[item?.day]
  if (!dayKey || DAY_INDEX[dayKey] === undefined) return null
  const [hh, mm] = String(item?.time || '').split(':')
  const hours = Number(hh)
  const minutes = Number(mm)
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null
  return { dayKey, dayIndex: DAY_INDEX[dayKey], hours, minutes, time: item.time }
}

function getNextOccurrence(slot, from = new Date()) {
  const next = new Date(from)
  const diff = (slot.dayIndex - from.getDay() + 7) % 7
  next.setDate(from.getDate() + diff)
  next.setHours(slot.hours, slot.minutes, 0, 0)
  if (next <= from) next.setDate(next.getDate() + 7)
  return next
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
  const startOfWeek = useMemo(() => {
    const d = new Date(now)
    const day = d.getDay()
    const diff = day === 0 ? -6 : 1 - day
    d.setDate(d.getDate() + diff)
    d.setHours(0, 0, 0, 0)
    return d
  }, [now])

  const slots = useMemo(
    () => (schedule || []).map(parseSlot).filter(Boolean),
    [schedule]
  )

  const weekRows = useMemo(() => {
    return WEEK_DAYS.map((dayKey) => {
      const daySlots = slots.filter((s) => s.dayKey === dayKey)
      const cellDate = new Date(startOfWeek)
      const offset = (DAY_INDEX[dayKey] - startOfWeek.getDay() + 7) % 7
      cellDate.setDate(startOfWeek.getDate() + offset)
      const isToday =
        cellDate.getDate() === now.getDate() &&
        cellDate.getMonth() === now.getMonth() &&
        cellDate.getFullYear() === now.getFullYear()

      const enriched = daySlots
        .map((slot) => {
          const lessonAt = getNextOccurrence(slot, now)
          const joinActive = Boolean(zoomLink) && isJoinWindow(lessonAt, now)
          return { ...slot, lessonAt, joinActive }
        })
        .sort((a, b) => a.hours * 60 + a.minutes - (b.hours * 60 + b.minutes))

      return {
        dayKey,
        label: t(`days.${dayKey}`),
        isToday,
        slots: enriched,
      }
    })
  }, [slots, startOfWeek, now, zoomLink, t])

  const nextLesson = useMemo(() => {
    const all = slots.map((s) => ({ slot: s, at: getNextOccurrence(s, now) }))
    return all.sort((a, b) => a.at - b.at)[0]
  }, [slots, now])

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
            {nextLesson.at.toLocaleString(dateLocale, {
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
                  <span className={styles.scheduleTodayTag}>{t('student.calendar.today')}</span>
                ) : null}
              </div>

              <div className={styles.scheduleRowBody}>
                {row.slots.length === 0 ? (
                  <span className={styles.scheduleRowFree}>{t('student.calendar.noLesson')}</span>
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
                        disabled={!slot.joinActive}
                        onClick={() =>
                          zoomLink && window.open(zoomLink, '_blank', 'noopener,noreferrer')
                        }
                      >
                        <Video size={15} />
                        {slot.joinActive
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
