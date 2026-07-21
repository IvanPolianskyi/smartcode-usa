'use client'

import React, { useMemo } from 'react'
import { CalendarDays, Video, Clock } from 'lucide-react'
import { DAY_KEY_MAP } from '@/hooks/useDashboardCourses'
import {
  addDaysToDateKey,
  formatKyivLocale,
  isKyivDateKeyToday,
  kyivDateKeyFromParts,
  kyivPartsFromInstant,
  kyivWallToUtc,
  kyivWeekRange,
  nextKyivWeekdaySlot,
  parseUtcInstant,
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

/**
 * Тижневий календар: пріоритет — реальні уроки CRM (upcomingLessons), як у Telegram-боті.
 * regularSchedule лише як fallback для старих профілів без upcomingLessons.
 */
export default function WeeklyScheduleCalendar({
  schedule,
  upcomingLessons,
  zoomLink,
  t,
  dateLocale,
}) {
  const now = new Date()
  const kyivWeek = kyivWeekRange(now)
  // Порожній кеш CRM-уроків не авторитетний: якщо є regularSchedule — показуємо його,
  // а не тиждень «вільних днів» (симптом застарілого snapshot до pull).
  const useInstances =
    Array.isArray(upcomingLessons) &&
    (upcomingLessons.length > 0 || !(schedule || []).length)

  const slots = useMemo(
    () => (schedule || []).map(parseSlot).filter(Boolean),
    [schedule]
  )

  const weekRows = useMemo(() => {
    const { mondayKey, start, end } = kyivWeek

    if (useInstances) {
      const byDateKey = new Map()
      for (const item of upcomingLessons) {
        const at = parseUtcInstant(item?.startAt)
        if (Number.isNaN(at.getTime())) continue
        if (at < start || at >= end) continue
        const dateKey = kyivDateKeyFromParts(kyivPartsFromInstant(at.getTime()))
        const list = byDateKey.get(dateKey) || []
        const [hh, mm] = String(item?.time || '').split(':')
        const conducted =
          item?.conducted === true || at.getTime() < now.getTime()
        list.push({
          time: item.time,
          hours: Number(hh),
          minutes: Number(mm),
          lessonAt: at,
          conducted,
          isGroup: item?.isGroup === true,
          teacherName: String(item?.teacherName || '').trim(),
          slotZoomLink: conducted ? null : item.zoomLink || zoomLink,
        })
        byDateKey.set(dateKey, list)
      }

      return WEEK_DAYS.map((dayKey) => {
        const daysFromMonday = DAY_INDEX[dayKey] === 0 ? 6 : DAY_INDEX[dayKey] - 1
        const cellDateKey = addDaysToDateKey(mondayKey, daysFromMonday)
        const isToday = isKyivDateKeyToday(cellDateKey)
        const enriched = (byDateKey.get(cellDateKey) || [])
          .map((slot) => ({
            ...slot,
            joinActive:
              !slot.conducted &&
              Boolean(slot.slotZoomLink) &&
              isJoinWindow(slot.lessonAt, now),
          }))
          .sort(
            (a, b) =>
              a.lessonAt.getTime() - b.lessonAt.getTime() ||
              (a.hours || 0) * 60 + (a.minutes || 0) - ((b.hours || 0) * 60 + (b.minutes || 0))
          )

        return {
          dayKey,
          label: t(`days.${dayKey}`),
          isToday,
          slots: enriched,
        }
      })
    }

    return WEEK_DAYS.map((dayKey) => {
      const daySlots = slots.filter((s) => s.dayKey === dayKey)
      const daysFromMonday = DAY_INDEX[dayKey] === 0 ? 6 : DAY_INDEX[dayKey] - 1
      const cellDateKey = addDaysToDateKey(mondayKey, daysFromMonday)
      const isToday = isKyivDateKeyToday(cellDateKey)

      const enriched = daySlots
        .map((slot) => {
          const lessonAt = kyivWallToUtc(cellDateKey, slot.hours, slot.minutes)
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
  }, [useInstances, upcomingLessons, slots, kyivWeek, now, zoomLink, t])

  const nextLesson = useMemo(() => {
    if (useInstances) {
      const future = upcomingLessons
        .filter((item) => {
          if (item?.conducted === true) return false
          const at = parseUtcInstant(item?.startAt)
          if (Number.isNaN(at.getTime())) return false
          return at.getTime() >= now.getTime() - 60 * 60 * 1000
        })
        .map((item) => parseUtcInstant(item.startAt))
        .sort((a, b) => a.getTime() - b.getTime())
      return future[0] ? { at: future[0] } : null
    }

    const all = slots.map((s) => ({
      slot: s,
      at: nextKyivWeekdaySlot(s.dayIndex, s.hours, s.minutes, now),
    }))
    return all.sort((a, b) => a.at.getTime() - b.at.getTime())[0]
  }, [useInstances, upcomingLessons, slots, now])

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
                    className={`${styles.scheduleLesson} ${
                      slot.conducted
                        ? styles.scheduleLessonConducted
                        : slot.joinActive
                          ? styles.scheduleLessonLive
                          : ''
                    }`}
                  >
                    <div className={styles.scheduleLessonInfo}>
                      <span className={styles.scheduleLessonTime}>
                        <Clock size={14} />
                        {slot.time || t('student.schedule.timePending')}
                        {slot.isGroup !== undefined && useInstances
                          ? ` (${slot.isGroup ? t('student.calendar.kindGroup') : t('student.calendar.kindIndividual')})`
                          : ''}
                        {slot.conducted
                          ? ` · ${t('student.calendar.conducted')}`
                          : ''}
                      </span>
                      <span className={styles.scheduleLessonTopic}>
                        {slot.teacherName
                          ? slot.teacherName
                          : slot.conducted
                            ? t('student.calendar.conductedLesson')
                            : t('student.calendar.liveLesson')}
                      </span>
                    </div>
                    {slot.conducted ? (
                      <span className={styles.scheduleConductedBadge}>
                        {t('student.calendar.conducted')}
                      </span>
                    ) : (
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
                    )}
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
