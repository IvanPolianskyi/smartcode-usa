import { DAY_KEY_MAP } from '@/hooks/useDashboardCourses'
import {
  formatKyivLocale,
  kyivSlotInCurrentWeek,
  kyivWeekRange,
  nextKyivWeekdaySlot,
  parseUtcInstant,
} from '@/lib/kyivTime'

const WEEKDAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

/** Нормалізує день з CRM/LMS до ключа DAY_KEY_MAP (Пн, mon, …). */
export function normalizeScheduleDay(day) {
  const raw = String(day || '').trim()
  if (DAY_KEY_MAP[raw] !== undefined) return raw
  const lower = raw.toLowerCase()
  const fromEn = {
    mon: 'Пн',
    tue: 'Вт',
    wed: 'Ср',
    thu: 'Чт',
    fri: 'Пт',
    sat: 'Сб',
    sun: 'Нд',
  }[lower]
  if (fromEn) return fromEn
  return raw
}

export function parseScheduleSlots(schedule) {
  return (schedule || [])
    .map((item) => {
      const dayNorm = normalizeScheduleDay(item?.day)
      const dayKey = DAY_KEY_MAP[dayNorm]
      const dayIndex =
        dayKey !== undefined ? WEEKDAY_KEYS.indexOf(dayKey) : undefined
      const [hh, mm] = String(item?.time || '').split(':')
      const hours = Number(hh)
      const minutes = Number(mm)
      if (
        dayIndex === undefined ||
        dayIndex < 0 ||
        !Number.isFinite(hours) ||
        !Number.isFinite(minutes)
      ) {
        return null
      }
      return {
        dayIndex,
        hours,
        minutes,
        zoomLink: item?.zoomLink,
        time: item?.time,
      }
    })
    .filter(Boolean)
}

/**
 * Статистика розкладу: усі «настінні» години — київський час (Europe/Kyiv).
 * Якщо є upcomingLessons (реальні CRM-уроки) — рахуємо по них, як у боті.
 */
export function computeScheduleStats(schedule, { t, dateLocale, upcomingLessons } = {}) {
  const now = new Date()

  // Порожній snapshot CRM-уроків при наявному regularSchedule → рахуємо за шаблоном.
  const hasScheduleTemplate = Array.isArray(schedule) && schedule.length > 0
  const useInstances =
    Array.isArray(upcomingLessons) &&
    (upcomingLessons.length > 0 || !hasScheduleTemplate)

  if (useInstances) {
    const { start, end } = kyivWeekRange(now)
    const thisWeekAll = []
    const upcomingThisWeek = []
    const upcomingAll = []

    for (const item of upcomingLessons) {
      const at = parseUtcInstant(item?.startAt)
      if (Number.isNaN(at.getTime())) continue
      const endAt = item?.endAt ? parseUtcInstant(item.endAt) : null
      const conducted =
        item?.conducted === true ||
        (endAt != null &&
          !Number.isNaN(endAt.getTime()) &&
          endAt.getTime() < now.getTime())
      if (at >= start && at < end) {
        thisWeekAll.push(at)
        // Залишок тижня: ще не проведено (майбутні + ті, що зараз ідуть).
        if (!conducted) upcomingThisWeek.push(at)
      }
      if (
        !conducted &&
        at.getTime() >= now.getTime() - 60 * 60 * 1000
      ) {
        upcomingAll.push(at)
      }
    }

    const nextLesson = upcomingAll.sort((a, b) => a.getTime() - b.getTime())[0]
    const nextLessonText = nextLesson
      ? formatKyivLocale(nextLesson, dateLocale, {
          weekday: 'short',
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
      : t('student.schedule.noLessons')

    return {
      weeklyTotal: thisWeekAll.length,
      weeklyCompleted: Math.max(0, thisWeekAll.length - upcomingThisWeek.length),
      weeklyRemaining: upcomingThisWeek.length,
      nextLessonText,
    }
  }

  const slots = parseScheduleSlots(schedule)
  if (slots.length === 0) {
    return {
      weeklyTotal: 0,
      weeklyCompleted: 0,
      weeklyRemaining: 0,
      nextLessonText: t('student.schedule.noLessons'),
    }
  }

  const upcomingThisWeek = []
  const upcomingAll = []
  const thisWeekAll = []

  slots.forEach((slot) => {
    const next = nextKyivWeekdaySlot(slot.dayIndex, slot.hours, slot.minutes, now)
    upcomingAll.push(next)

    const thisWeekOcc = kyivSlotInCurrentWeek(
      slot.dayIndex,
      slot.hours,
      slot.minutes,
      now
    )
    if (thisWeekOcc) {
      thisWeekAll.push(thisWeekOcc)
      if (thisWeekOcc > now) upcomingThisWeek.push(thisWeekOcc)
    }
  })

  const nextLesson = upcomingAll.sort((a, b) => a.getTime() - b.getTime())[0]
  const nextLessonText = nextLesson
    ? formatKyivLocale(nextLesson, dateLocale, {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : t('student.schedule.noLessons')

  return {
    weeklyTotal: thisWeekAll.length,
    weeklyCompleted: Math.max(0, thisWeekAll.length - upcomingThisWeek.length),
    weeklyRemaining: upcomingThisWeek.length,
    nextLessonText,
  }
}
