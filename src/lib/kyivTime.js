/** Утиліти «настінного» часу Києва (UTC+2) ↔ UTC. Однакова логіка з smartcode_manager. */

export const KYIV_TZ = 'Europe/Kyiv'

/** Постійний зсув Києва від UTC (хв), Україна з 2024. */
export const KYIV_UTC_OFFSET_MINUTES = 120

const KYIV_OFFSET_MS = KYIV_UTC_OFFSET_MINUTES * 60 * 1000

const WEEKDAY_SHORT_TO_INDEX = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

/** UTC-миттєвість → календарний час у Києві (UTC+2). */
export function kyivPartsFromInstant(ts) {
  const ms = typeof ts === 'number' ? ts : new Date(ts).getTime()
  const shifted = new Date(ms + KYIV_OFFSET_MS)
  const year = shifted.getUTCFullYear()
  const month = shifted.getUTCMonth() + 1
  const day = shifted.getUTCDate()
  const hour = shifted.getUTCHours()
  const minute = shifted.getUTCMinutes()
  const second = shifted.getUTCSeconds()
  const weekdayIndex = new Date(Date.UTC(year, month - 1, day)).getUTCDay()
  return { year, month, day, hour, minute, second, weekdayIndex }
}

export function kyivDateKeyFromParts(p) {
  return `${p.year}-${pad2(p.month)}-${pad2(p.day)}`
}

/**
 * UTC-момент для yyyy-MM-dd і год:хв у Києві (UTC+2).
 */
export function kyivWallToUtc(dateKey, hours, minutes, seconds = 0) {
  const [year, month, day] = dateKey.split('-').map((x) => parseInt(x, 10))
  return new Date(Date.UTC(year, month - 1, day, hours - 2, minutes, seconds))
}

/** Додати календарні дні до yyyy-MM-dd. */
export function addDaysToDateKey(dateKey, days) {
  const [y, m, d] = dateKey.split('-').map((x) => parseInt(x, 10))
  const dt = new Date(Date.UTC(y, m - 1, d + days))
  return `${dt.getUTCFullYear()}-${pad2(dt.getUTCMonth() + 1)}-${pad2(dt.getUTCDate())}`
}

/**
 * Найближчий майбутній слот: день тижня (0=Нд…6=Сб) + год:хв у Києві.
 */
export function nextKyivWeekdaySlot(weekdayIndex, hours, minutes) {
  const now = new Date()
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
  const date = new Date(dateIso)
  if (Number.isNaN(date.getTime())) return null
  const p = kyivPartsFromInstant(date.getTime())
  return `${p.weekdayIndex}-${pad2(p.hour)}:${pad2(p.minute)}`
}

/** Форматування дати/часу для UI — київський настінний час (UTC+2). */
export function formatKyivLocale(date, locale, options = {}) {
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  const shifted = new Date(d.getTime() + KYIV_OFFSET_MS)
  return shifted.toLocaleString(locale, { timeZone: 'UTC', ...options })
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
