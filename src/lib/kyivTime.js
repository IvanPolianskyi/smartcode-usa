/** Утиліти «настінного» часу Europe/Kyiv ↔ UTC (сервер може бути в UTC). */

export const KYIV_TZ = 'Europe/Kyiv'

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

/** Компоненти календарного часу в Києві для миттєвості UTC `ts`. */
export function kyivPartsFromInstant(ts) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: KYIV_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(new Date(ts))

  const get = (type) => parts.find((p) => p.type === type)?.value || ''
  const weekdayShort = get('weekday')
  return {
    year: parseInt(get('year'), 10),
    month: parseInt(get('month'), 10),
    day: parseInt(get('day'), 10),
    hour: parseInt(get('hour'), 10),
    minute: parseInt(get('minute'), 10),
    second: parseInt(get('second'), 10),
    weekdayIndex: WEEKDAY_SHORT_TO_INDEX[weekdayShort] ?? 0,
  }
}

export function kyivDateKeyFromParts(p) {
  return `${p.year}-${pad2(p.month)}-${pad2(p.day)}`
}

/**
 * UTC-момент для дати yyyy-MM-dd і години:хвилин у Києві.
 */
export function kyivWallToUtc(dateKey, hours, minutes, seconds = 0) {
  const [year, month, day] = dateKey.split('-').map((x) => parseInt(x, 10))
  const targetMin = hours * 60 + minutes

  let lo = Date.UTC(year, month - 1, day, 0, 0, 0)
  let hi = Date.UTC(year, month - 1, day + 1, 0, 0, 0) - 1

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    const p = kyivPartsFromInstant(mid)
    const curMin = p.hour * 60 + p.minute
    if (curMin < targetMin) lo = mid + 60_000
    else if (curMin > targetMin) hi = mid - 60_000
    else return new Date(mid - p.second * 1000 + seconds * 1000)
  }
  return new Date(lo)
}

/** Додати календарні дні до yyyy-MM-dd (без зсуву TZ). */
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

/** Підпис слота для порівняння з CRM: «деньТижня-ГГ:хв» у Києві. */
export function kyivSlotSignature(dateIso) {
  const date = new Date(dateIso)
  if (Number.isNaN(date.getTime())) return null
  const p = kyivPartsFromInstant(date.getTime())
  return `${p.weekdayIndex}-${pad2(p.hour)}:${pad2(p.minute)}`
}
