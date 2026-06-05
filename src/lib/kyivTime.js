/** Київський «настінний» час ↔ UTC. Та сама логіка, що в smartcode_manager (Europe/Kyiv). */

import { addDays } from 'date-fns'
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz'

export const KYIV_TZ = 'Europe/Kyiv'

function pad2(n) {
  return String(n).padStart(2, '0')
}

/**
 * CRM API зберігає start_at як UTC; без суфікса Z `new Date()` на сервері в Europe/Kyiv
 * читає рядок як локальний час — зсув на 1–3 години.
 */
export function parseUtcInstant(iso) {
  const s = String(iso ?? '').trim()
  if (!s) return new Date(Number.NaN)
  if (
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s) &&
    !/[zZ]$/.test(s) &&
    !/[+-]\d{2}:?\d{2}$/.test(s)
  ) {
    return new Date(`${s}Z`)
  }
  return new Date(s)
}

/** UTC-миттєвість → календарний час у Києві (Europe/Kyiv, літо/зима). */
export function kyivPartsFromInstant(ts) {
  const d = typeof ts === 'number' ? new Date(ts) : parseUtcInstant(ts)
  if (Number.isNaN(d.getTime())) {
    return {
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      weekdayIndex: 0,
    }
  }
  const z = toZonedTime(d, KYIV_TZ)
  return {
    year: z.getFullYear(),
    month: z.getMonth() + 1,
    day: z.getDate(),
    hour: z.getHours(),
    minute: z.getMinutes(),
    second: z.getSeconds(),
    weekdayIndex: z.getDay(),
  }
}

export function kyivDateKeyFromParts(p) {
  return `${p.year}-${pad2(p.month)}-${pad2(p.day)}`
}

/** yyyy-MM-dd + год:хв у Києві → UTC Date. */
export function kyivWallToUtc(dateKey, hours, minutes, seconds = 0) {
  const wall = `${dateKey} ${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`
  return fromZonedTime(wall, KYIV_TZ)
}

/** +N календарних днів у київській даті. */
export function addDaysToDateKey(dateKey, days) {
  const anchor = kyivWallToUtc(dateKey, 12, 0)
  const p = kyivPartsFromInstant(addDays(anchor, days))
  return kyivDateKeyFromParts(p)
}

/**
 * Найближчий майбутній слот: день тижня (0=Нд…6=Сб) + год:хв у Києві.
 */
export function nextKyivWeekdaySlot(weekdayIndex, hours, minutes, now = new Date()) {
  const nowKyiv = kyivPartsFromInstant(now.getTime())
  const todayKey = kyivDateKeyFromParts(nowKyiv)

  let delta = (weekdayIndex - nowKyiv.weekdayIndex + 7) % 7
  let dateKey = addDaysToDateKey(todayKey, delta)
  let candidate = kyivWallToUtc(dateKey, hours, minutes)

  if (candidate.getTime() <= now.getTime()) {
    dateKey = addDaysToDateKey(todayKey, delta + 7)
    candidate = kyivWallToUtc(dateKey, hours, minutes)
  }
  return candidate
}

/** Підпис слота для порівняння з CRM. */
export function kyivSlotSignature(dateIso) {
  const date = parseUtcInstant(dateIso)
  if (Number.isNaN(date.getTime())) return null
  const p = kyivPartsFromInstant(date.getTime())
  return `${p.weekdayIndex}-${pad2(p.hour)}:${pad2(p.minute)}`
}

/** Форматування для UI — київський час (Intl, Europe/Kyiv). */
export function formatKyivLocale(date, locale, options = {}) {
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleString(locale, { timeZone: KYIV_TZ, ...options })
}

/** Поточний київський тиждень: понеділок 00:00 — наступний понеділок 00:00. */
export function kyivWeekRange(now = new Date()) {
  const p = kyivPartsFromInstant(now.getTime())
  const todayKey = kyivDateKeyFromParts(p)
  const daysFromMonday = p.weekdayIndex === 0 ? 6 : p.weekdayIndex - 1
  const mondayKey = addDaysToDateKey(todayKey, -daysFromMonday)
  const nextMondayKey = addDaysToDateKey(mondayKey, 7)
  return {
    start: kyivWallToUtc(mondayKey, 0, 0),
    end: kyivWallToUtc(nextMondayKey, 0, 0),
    mondayKey,
    todayKey,
  }
}

export function isKyivDateKeyToday(dateKey) {
  const p = kyivPartsFromInstant(Date.now())
  return kyivDateKeyFromParts(p) === dateKey
}

export function kyivSlotInCurrentWeek(weekdayIndex, hours, minutes, now = new Date()) {
  const { start, end, mondayKey } = kyivWeekRange(now)
  const daysFromMonday = weekdayIndex === 0 ? 6 : weekdayIndex - 1
  const slotKey = addDaysToDateKey(mondayKey, daysFromMonday)
  const at = kyivWallToUtc(slotKey, hours, minutes)
  if (at >= start && at < end) return at
  return null
}
