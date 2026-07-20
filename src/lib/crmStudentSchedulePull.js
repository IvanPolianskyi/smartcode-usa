import { ObjectId } from 'mongodb'
import { kyivPartsFromInstant, kyivWeekRange, parseUtcInstant } from '@/lib/kyivTime'

const CRM_BASE_URL = process.env.CRM_API_URL || process.env.SMARTCODE_CRM_API_URL || ''
const CRM_NICKNAME = process.env.CRM_ACCOUNT_NICKNAME || process.env.ACCOUNT_NICKNAME || ''
const CRM_PASSWORD = process.env.CRM_ACCOUNT_PASSWORD || process.env.ACCOUNT_PASSWORD || ''
const CRM_STATIC_TOKEN = process.env.CRM_BEARER_TOKEN || ''

const KYIV_WEEKDAY_UK = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

/** Мінімальний інтервал між auto-pull з CRM (мс). Не на кожен auth/me. */
const CRM_AUTO_PULL_MIN_MS = 5 * 60 * 1000

const CRM_FETCH_NO_STORE = { cache: 'no-store' }

/** Таймаут CRM для pull розкладу учня (швидкий fail → кеш у Mongo). */
const CRM_SCHEDULE_PULL_TIMEOUT_MS = 5000

/** Скільки останніх ІУ/ГУ тягнути для слотів і upcoming (lean). */
const CRM_SCHEDULE_LESSONS_LIMIT = 400

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase()
}

export function buildCrmHeaders(token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

export async function fetchCrmWithTimeout(url, options = {}) {
  const { timeout = 8000, ...fetchOptions } = options
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(url, { ...fetchOptions, signal: controller.signal })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

function formatCrmError(status, data) {
  if (data == null) return `CRM ${status}`
  if (typeof data === 'string') return data
  const d = data.detail
  if (typeof d === 'string') return d
  if (Array.isArray(d)) return d.map((x) => (typeof x === 'string' ? x : x?.msg || JSON.stringify(x))).join('; ')
  if (d && typeof d === 'object') return JSON.stringify(d)
  return JSON.stringify(data)
}

/**
 * Універсальний JSON-запит до CRM API (серверні route).
 * @param {string} method
 * @param {string} pathAndQuery напр. "groups" або "groups?limit=50"
 * @param {object} [jsonBody]
 * @param {{ timeout?: number }} [options]
 */
export async function crmJson(method, pathAndQuery, jsonBody, options = {}) {
  if (!CRM_BASE_URL) throw new Error('CRM не налаштовано (немає CRM_API_URL)')
  const base = CRM_BASE_URL.replace(/\/$/, '')
  const path = String(pathAndQuery || '').replace(/^\//, '')
  const url = `${base}/${path}`
  const token = await resolveCrmToken()
  const timeout = Number(options?.timeout) > 0 ? Number(options.timeout) : 8000
  const init = {
    method,
    headers: buildCrmHeaders(token),
    timeout,
  }
  if (method === 'GET' || method === 'HEAD') {
    init.cache = 'no-store'
  } else {
    init.cache = 'no-store'
  }
  if (jsonBody !== undefined && method !== 'GET' && method !== 'HEAD') {
    init.body = JSON.stringify(jsonBody)
  }
  const res = await fetchCrmWithTimeout(url, init)
  const text = await res.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }
  if (!res.ok) {
    throw new Error(formatCrmError(res.status, data) || res.statusText)
  }
  return data
}

let cachedCrmToken = null
let crmTokenExpiresAt = 0

export async function resolveCrmToken() {
  if (cachedCrmToken && Date.now() < crmTokenExpiresAt) {
    return cachedCrmToken
  }

  if (CRM_BASE_URL && CRM_NICKNAME && CRM_PASSWORD) {
    const loginResponse = await fetchCrmWithTimeout(`${CRM_BASE_URL.replace(/\/$/, '')}/auth/crm-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: CRM_NICKNAME,
        password: CRM_PASSWORD,
      }),
    })
    if (!loginResponse.ok) {
      const message = await loginResponse.text()
      throw new Error(message || `CRM login failed (${loginResponse.status})`)
    }
    const loginData = await loginResponse.json()
    const token = String(loginData?.access_token || '')
    if (token) {
      cachedCrmToken = token
      crmTokenExpiresAt = Date.now() + 55 * 60 * 1000 // 55 minutes
      return token
    }
  }

  if (CRM_STATIC_TOKEN) return CRM_STATIC_TOKEN
  return ''
}

export async function fetchCrmTeachers() {
  if (!CRM_BASE_URL) return []
  const token = await resolveCrmToken()
  const response = await fetchCrmWithTimeout(`${CRM_BASE_URL.replace(/\/$/, '')}/staff?limit=200&active_only=true`, {
    headers: buildCrmHeaders(token),
    timeout: CRM_SCHEDULE_PULL_TIMEOUT_MS,
    ...CRM_FETCH_NO_STORE,
  })
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `CRM staff fetch failed (${response.status})`)
  }
  const data = await response.json()
  return (Array.isArray(data) ? data : [])
    .filter((item) => {
      const role = String(item?.role || '')
      return role === 'teacher' || role === 'admin_teacher'
    })
    .map((item) => ({
      id: String(item.id || ''),
      fullName: String(item.full_name || '').trim(),
      role: String(item.role || ''),
      zoomLink: String(item.zoom_link || '').trim(),
    }))
    .filter((item) => item.id && item.fullName)
}

async function fetchCrmStudentById(studentId) {
  if (!studentId) return null
  const token = await resolveCrmToken()
  const response = await fetchCrmWithTimeout(`${CRM_BASE_URL.replace(/\/$/, '')}/students/${studentId}`, {
    headers: buildCrmHeaders(token),
    next: { revalidate: 60 },
  })
  if (!response.ok) return null
  return response.json()
}

/** Розклад LMS ↔ CRM лише після явної привʼязки (studentProfile.crmStudentId). */
async function resolveCrmStudentForSmartcode(student) {
  if (!CRM_BASE_URL) return null
  const profile = student?.studentProfile || {}
  const linkedCrmStudentId = String(profile.crmStudentId || '').trim()
  if (!linkedCrmStudentId) return null

  const direct = await fetchCrmStudentById(linkedCrmStudentId)
  if (direct?.id) return direct
  return null
}

export function crmPayloadFromStudent(studentDoc) {
  const profile = studentDoc?.studentProfile || {}
  const normalizedSchedule = (profile.regularSchedule || [])
    .filter((item) => item?.day)
    .map((item) => `${item.day}${item.time ? ` ${item.time}` : ''}`)
    .join(', ')
  const scheduleText = normalizedSchedule || 'Не задано'
  const zoom = String(profile.zoomLink || '').trim()
  const onlineCourses = (profile.activeOnlineCourses || []).filter(Boolean)
  const teacherName = String(profile.crmTeacherName || '').trim()

  const notesParts = [
    'Синхронізовано з SmartCode admin.',
    `Регулярний розклад: ${scheduleText}.`,
    teacherName ? `Викладач: ${teacherName}.` : '',
    zoom ? `Zoom: ${zoom}.` : '',
    onlineCourses.length > 0 ? `Онлайн-курси: ${onlineCourses.join(', ')}.` : '',
  ].filter(Boolean)

  const lmsUserId = String(studentDoc?._id || studentDoc?.id || '').trim()
  return {
    full_name: String(studentDoc?.name || '').trim(),
    email: studentDoc?.email || null,
    notes: notesParts.join(' '),
    awaiting_teacher: !teacherName,
    ...(lmsUserId ? { smartcode_user_id: lmsUserId } : {}),
  }
}

async function findCrmStudentByEmailOrLmsId(studentDoc) {
  const email = normalizeEmail(studentDoc?.email)
  const lmsId = String(studentDoc?._id || studentDoc?.id || '').trim()
  if (!email && !lmsId) return null

  const token = await resolveCrmToken()
  const response = await fetchCrmWithTimeout(`${CRM_BASE_URL.replace(/\/$/, '')}/students?limit=200&active_only=true`, {
    headers: buildCrmHeaders(token),
    next: { revalidate: 60 },
  })
  if (!response.ok) return null
  const list = await response.json()
  if (!Array.isArray(list)) return null

  if (lmsId) {
    const byLms = list.find((item) => String(item?.smartcode_user_id || '') === lmsId)
    if (byLms?.id) return byLms
  }
  if (email) {
    return list.find((item) => normalizeEmail(item?.email) === email) || null
  }
  return null
}

/** Оновлює картку учня в CRM лише якщо вже є привʼязка (crmStudentId). Без автопошуку/створення. */
export async function syncStudentToCrm(studentDoc) {
  if (!CRM_BASE_URL) return null
  const profile = studentDoc?.studentProfile || {}
  const crmStudentId = String(profile.crmStudentId || '').trim()
  if (!crmStudentId) return null

  const token = await resolveCrmToken()
  const body = crmPayloadFromStudent(studentDoc)
  const base = CRM_BASE_URL.replace(/\/$/, '')

  const patchResponse = await fetchCrmWithTimeout(`${base}/students/${crmStudentId}`, {
    method: 'PATCH',
    headers: buildCrmHeaders(token),
    body: JSON.stringify(body),
  })
  if (patchResponse.ok) {
    return patchResponse.json()
  }
  const message = await patchResponse.text()
  throw new Error(message || `CRM student sync failed (${patchResponse.status})`)
}

/** Груповий слот у CRM: kind=individual + group_id / series group:… / GROUP_LESSON / legacy kind=group. */
export function isCrmGroupLessonSlot(lesson) {
  if (lesson?.is_group_slot === true) return true
  if (lesson?.is_group_shell === true) return true
  if (String(lesson?.kind || '') === 'group') return true
  const series = String(lesson?.series_id || '')
  if (series.startsWith('group:')) return true
  if (String(lesson?.notes_internal || '').trim() === 'GROUP_LESSON') return true
  return Boolean(lesson?.group_id)
}

/** Пробний урок (ПУ) у CRM — не показувати в regularSchedule учня на сайті. */
export function isCrmTrialLesson(lesson) {
  return String(lesson?.kind || '') === 'trial'
}

const SCHEDULE_SLOT_GRACE_MS = 60 * 60 * 1000

/** ІУ згруповані за series_id (як у CRM). */
export function groupIndividualBySeries(lessons) {
  const map = new Map()
  for (const lesson of Array.isArray(lessons) ? lessons : []) {
    const key =
      String(lesson?.series_id || '').trim() ||
      `lesson:${String(lesson?.id || lesson?._id || '')}`
    const arr = map.get(key) || []
    arr.push(lesson)
    map.set(key, arr)
  }
  return [...map.entries()].map(([seriesKey, seriesLessons]) => ({
    seriesKey,
    lessons: seriesLessons,
  }))
}

/**
 * Для regularSchedule беремо лише регулярні серії ІУ (2+ уроки в серії).
 * Одноразові ІУ (часто залишок після ПУ) не показуємо, якщо є хоча б одна регулярна серія.
 */
export function pickIndividualLessonsForRegularSchedule(lessons) {
  const individuals = (Array.isArray(lessons) ? lessons : []).filter(
    (lesson) => String(lesson?.kind || '') === 'individual' && !isCrmTrialLesson(lesson)
  )
  const groups = groupIndividualBySeries(individuals)
  const recurring = groups.filter((group) => group.lessons.length >= 2)
  const sourceGroups = recurring.length > 0 ? recurring : groups
  return sourceGroups.flatMap((group) => group.lessons)
}

/** Майбутні scheduled ІУ/групові слоти — лише вони формують regularSchedule в LMS. */
export function filterFutureScheduledLessons(lessons) {
  const now = Date.now()
  return (Array.isArray(lessons) ? lessons : []).filter((lesson) => {
    if (isCrmTrialLesson(lesson)) return false
    if (String(lesson?.kind || '') === 'availability') return false
    if (String(lesson?.kind || '') !== 'individual') return false
    if (String(lesson?.status || '') !== 'scheduled') return false
    if (lesson?.group_calendar_removed === true) return false
    const start = parseUtcInstant(lesson.start_at).getTime()
    return Number.isFinite(start) && start >= now - SCHEDULE_SLOT_GRACE_MS
  })
}

/** Як у Telegram-боті: completed або scheduled зі слотом у минулому. */
export function isCrmLessonConducted(lesson, now = new Date()) {
  const status = String(lesson?.status || '')
  if (status === 'completed') return true
  if (status !== 'scheduled') return false
  const startMs = parseUtcInstant(lesson?.start_at).getTime()
  return Number.isFinite(startMs) && startMs < now.getTime()
}

/** Кількість проведених ІУ/ГУ з CRM-уроків (для метрики «Завершених уроків»). */
export function countConductedCrmLessons(lessons, now = new Date()) {
  let n = 0
  for (const lesson of Array.isArray(lessons) ? lessons : []) {
    if (isCrmTrialLesson(lesson)) continue
    if (String(lesson?.kind || '') === 'availability') continue
    const kind = String(lesson?.kind || '')
    if (kind !== 'individual' && kind !== 'group') continue
    if (lesson?.group_calendar_removed === true) continue
    if (isCrmLessonConducted(lesson, now)) n += 1
  }
  return n
}

/**
 * Реальні уроки для календаря тижня (як у Telegram-боті):
 * поточний київський тиждень + горизонт на «наступний урок».
 * Включає проведені (completed / минулий scheduled) з прапорцем conducted.
 */
export function upcomingLessonsFromCrmLessons(
  lessons,
  { now = new Date(), horizonDays = 21 } = {}
) {
  const week = kyivWeekRange(now)
  const from = week.start.getTime()
  const to = now.getTime() + horizonDays * 24 * 60 * 60 * 1000
  const out = []

  for (const lesson of Array.isArray(lessons) ? lessons : []) {
    if (isCrmTrialLesson(lesson)) continue
    if (String(lesson?.kind || '') === 'availability') continue
    if (String(lesson?.kind || '') !== 'individual') continue
    const status = String(lesson?.status || '')
    if (status !== 'scheduled' && status !== 'completed') continue
    if (lesson?.group_calendar_removed === true) continue
    const start = parseUtcInstant(lesson.start_at)
    const startMs = start.getTime()
    if (!Number.isFinite(startMs) || startMs < from || startMs >= to) continue
    const p = kyivPartsFromInstant(startMs)
    const day = KYIV_WEEKDAY_UK[p.weekdayIndex]
    if (!day) continue
    const conducted = isCrmLessonConducted(lesson, now)
    out.push({
      startAt: start.toISOString(),
      day,
      time: `${String(p.hour).padStart(2, '0')}:${String(p.minute).padStart(2, '0')}`,
      conducted,
    })
  }

  return out.sort((a, b) => String(a.startAt).localeCompare(String(b.startAt)))
}

/** Найближчий майбутній урок на кожну series_id (без дублювання серії). */
function nearestFutureLessonBySeries(lessons) {
  const bySeries = new Map()
  for (const lesson of lessons) {
    const seriesKey = String(lesson?.series_id || lesson?.id || '').trim()
    const start = parseUtcInstant(lesson.start_at).getTime()
    if (!seriesKey || Number.isNaN(start)) continue
    const prev = bySeries.get(seriesKey)
    if (!prev || start < prev.start) {
      bySeries.set(seriesKey, { lesson, start })
    }
  }
  return [...bySeries.values()].map((item) => item.lesson)
}

function kyivDayTimeFromLesson(lesson) {
  const start = parseUtcInstant(lesson?.start_at)
  if (Number.isNaN(start.getTime())) return null
  const p = kyivPartsFromInstant(start.getTime())
  const day = KYIV_WEEKDAY_UK[p.weekdayIndex]
  if (!day) return null
  const time = `${String(p.hour).padStart(2, '0')}:${String(p.minute).padStart(2, '0')}`
  return { day, time }
}

/**
 * Регулярний розклад LMS з CRM.
 * - Для учнів у групах: час береться з group.schedule (як у CRM «Групові»), не з UTC уроків.
 * - Індивідуальні (не групові) серії — один слот на series_id.
 */
export function scheduleFromCrmLessons(lessons, crmGroups = []) {
  const orderedDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
  const slotMap = new Map()

  const addSlot = (day, time, priority = 1) => {
    const d = String(day || '').trim()
    const t = String(time || '').trim()
    if (!d || !t) return
    const key = `${d}|${t}`
    const prev = slotMap.get(key)
    if (!prev || priority > prev.priority) {
      slotMap.set(key, { day: d, time: t, priority })
    }
  }

  const groups = Array.isArray(crmGroups) ? crmGroups : []
  const hasGroupSchedule = groups.some((g) => (g.schedule || []).length > 0)

  for (const g of groups) {
    for (const slot of g.schedule || []) {
      addSlot(slot.day, slot.time, 100)
    }
  }

  const future = filterFutureScheduledLessons(lessons)

  // Учень у групі з розкладом — лише групові слоти (ПУ/ІУ іншого викладача не змішуємо).
  if (!hasGroupSchedule) {
    const regularIndividuals = pickIndividualLessonsForRegularSchedule(
      future.filter((l) => !isCrmGroupLessonSlot(l))
    )
    for (const lesson of nearestFutureLessonBySeries(regularIndividuals)) {
      const dt = kyivDayTimeFromLesson(lesson)
      if (dt) addSlot(dt.day, dt.time, 50)
    }
  }

  if (!hasGroupSchedule) {
    for (const lesson of nearestFutureLessonBySeries(
      future.filter((l) => isCrmGroupLessonSlot(l))
    )) {
      const dt = kyivDayTimeFromLesson(lesson)
      if (dt) addSlot(dt.day, dt.time, 10)
    }
  }

  const out = []
  for (const day of orderedDays) {
    const times = [...slotMap.values()]
      .filter((s) => s.day === day)
      .map((s) => s.time)
      .sort()
    for (const time of times) out.push({ day, time })
  }
  return out
}

function resolveTeacherFromCrmData(rawLessons, crmGroups, teachers) {
  const groups = Array.isArray(crmGroups) ? crmGroups : []

  // Груповий учень: викладач і Zoom з групи (ПУ з іншим викладачем не впливає).
  if (groups.length > 0) {
    const teacherId = String(groups[0]?.teacher_id || '').trim()
    let zoomLink =
      groups.map((g) => String(g.zoom_link || '').trim()).find(Boolean) || ''
    let teacherName = ''
    if (teacherId) {
      const teacher = teachers.find((item) => item.id === teacherId)
      teacherName = String(teacher?.fullName || '')
      if (!zoomLink) {
        zoomLink = String(teacher?.zoomLink || '').trim()
      }
    }
    return { teacherId, teacherName, zoomLink }
  }

  const now = Date.now()
  const scheduled = (Array.isArray(rawLessons) ? rawLessons : []).filter(
    (l) => String(l?.status || '') === 'scheduled' && String(l?.kind || '') === 'individual'
  )
  const future = scheduled
    .map((lesson) => ({
      lesson,
      start: parseUtcInstant(lesson.start_at).getTime(),
    }))
    .filter((item) => !Number.isNaN(item.start) && item.start >= now - SCHEDULE_SLOT_GRACE_MS)
    .sort((a, b) => a.start - b.start)

  let teacherId = ''
  if (future.length > 0) {
    const pick =
      future.find((item) => String(item.lesson?.teacher_id || '').trim()) || future[0]
    teacherId = String(pick.lesson?.teacher_id || '').trim()
  }

  let teacherName = ''
  let zoomLink = ''
  if (teacherId) {
    const teacher = teachers.find((item) => item.id === teacherId)
    teacherName = String(teacher?.fullName || '')
    zoomLink = String(teacher?.zoomLink || '').trim()
  }

  return { teacherId, teacherName, zoomLink }
}

/** Групи CRM, де є учень — zoom і онлайн-курси для профілю LMS. */
async function fetchCrmGroupsForStudent(crmStudentId) {
  if (!CRM_BASE_URL || !crmStudentId) return { groups: [], ok: false }
  try {
    const groups = await crmJson('GET', 'groups?limit=200&active_only=true', undefined, {
      timeout: CRM_SCHEDULE_PULL_TIMEOUT_MS,
    })
    if (!Array.isArray(groups)) return { groups: [], ok: false }
    return {
      groups: groups.filter((g) =>
        (g.student_ids || []).some((sid) => String(sid) === String(crmStudentId))
      ),
      ok: true,
    }
  } catch (e) {
    console.error('CRM groups fetch for student failed:', e)
    return { groups: [], ok: false }
  }
}

function mergeGroupContextIntoProfile(prev, crmGroups, { apply = true } = {}) {
  const next = { ...prev }
  if (!apply) return next

  const courseIds = new Set((prev.activeOnlineCourses || []).map(String))
  for (const g of crmGroups) {
    for (const cid of g.online_course_ids || []) {
      if (cid) courseIds.add(String(cid))
    }
  }
  next.activeOnlineCourses = [...courseIds]
  return next
}

/** Зняти привʼязку smartcode_user_id у CRM після видалення акаунта LMS. */
export async function clearCrmSmartcodeLinkForDeletedUser(user) {
  if (!CRM_BASE_URL || !user) return { skipped: true }
  const profile = user.studentProfile || {}
  let crmStudentId = String(profile.crmStudentId || '').trim()
  if (!crmStudentId) {
    const found = await findCrmStudentByEmailOrLmsId(user)
    if (found?.id) crmStudentId = String(found.id)
  }
  if (!crmStudentId) return { skipped: true, reason: 'no_crm_student' }

  const token = await resolveCrmToken()
  const base = CRM_BASE_URL.replace(/\/$/, '')
  const response = await fetchCrmWithTimeout(`${base}/students/${crmStudentId}`, {
    method: 'PATCH',
    headers: buildCrmHeaders(token),
    body: JSON.stringify({ smartcode_user_id: null }),
    cache: 'no-store',
  })
  if (!response.ok) {
    const message = await response.text()
    console.error('CRM clear smartcode link failed:', message || response.status)
    return { ok: false, crmStudentId }
  }
  return { ok: true, crmStudentId }
}

/**
 * Підтягує з CRM розклад і викладача, оновлює Mongo. Завжди викликати з серверних route (адмін).
 * @param {{ id: string, name?: string, email?: string, studentProfile?: object }} student
 */
export async function pullCrmScheduleToSmartcodeStudent(student, usersCollection) {
  if (!CRM_BASE_URL) return student
  const crmStudent = await resolveCrmStudentForSmartcode(student)
  if (!crmStudent?.id) return student

  const token = await resolveCrmToken()
  // lean + DESC + ліміт: не тягнути 2000 уроків з epoch-coverage (було 5–15+ с).
  const lessonsParams = new URLSearchParams({
    kind: 'individual',
    student_id: String(crmStudent.id),
    limit: String(CRM_SCHEDULE_LESSONS_LIMIT),
    lean: 'true',
    sort: '-1',
  })

  const [lessonsResponse, teachers, crmGroupsResult] = await Promise.all([
    fetchCrmWithTimeout(`${CRM_BASE_URL.replace(/\/$/, '')}/lessons?${lessonsParams}`, {
      headers: buildCrmHeaders(token),
      timeout: CRM_SCHEDULE_PULL_TIMEOUT_MS,
      ...CRM_FETCH_NO_STORE,
    }),
    fetchCrmTeachers().catch(() => []),
    fetchCrmGroupsForStudent(crmStudent.id),
  ])

  const lessonsFetchedOk = lessonsResponse.ok
  const lessons = lessonsFetchedOk ? await lessonsResponse.json() : []
  const rawLessons = Array.isArray(lessons) ? lessons : []
  const crmGroups = crmGroupsResult.groups
  const crmGroupsFetchedOk = crmGroupsResult.ok
  const schedule = scheduleFromCrmLessons(rawLessons, crmGroups)
  const prev = student?.studentProfile || {}

  const { teacherId, teacherName, zoomLink } = lessonsFetchedOk
    ? resolveTeacherFromCrmData(rawLessons, crmGroups, teachers)
    : {
        teacherId: String(prev.crmTeacherId || ''),
        teacherName: String(prev.crmTeacherName || ''),
        zoomLink: String(prev.zoomLink || ''),
      }
  // CRM відповів — беремо фактичний розклад (порожній теж), без застарілого шаблону.
  const nextSchedule = lessonsFetchedOk ? schedule : prev.regularSchedule || []
  const nextUpcoming = lessonsFetchedOk
    ? upcomingLessonsFromCrmLessons(rawLessons)
    : Array.isArray(prev.upcomingLessons)
      ? prev.upcomingLessons
      : []

  const crmCountRaw = Number(crmStudent?.completed_lessons_count)
  const crmCount = Number.isFinite(crmCountRaw) ? Math.max(0, Math.floor(crmCountRaw)) : 0
  const fromLessons = lessonsFetchedOk ? countConductedCrmLessons(rawLessons) : 0
  const nextConductedCount = lessonsFetchedOk
    ? Math.max(crmCount, fromLessons)
    : Math.max(0, Number(prev.conductedLessonsCount) || 0)

  let nextProfile = {
    ...prev,
    crmStudentId: String(crmStudent.id || ''),
    crmShortId: String(crmStudent.short_id || ''),
    regularSchedule: nextSchedule,
    upcomingLessons: nextUpcoming,
    conductedLessonsCount: nextConductedCount,
    crmTeacherId: lessonsFetchedOk ? teacherId : String(prev.crmTeacherId || ''),
    crmTeacherName: lessonsFetchedOk ? teacherName : String(prev.crmTeacherName || ''),
    zoomLink: lessonsFetchedOk ? zoomLink : String(prev.zoomLink || ''),
    crmScheduleSyncedAt: new Date().toISOString(),
  }
  nextProfile = mergeGroupContextIntoProfile(nextProfile, crmGroups, {
    apply: crmGroupsFetchedOk,
  })
  if (
    nextProfile.accountReady === false &&
    (nextSchedule.length > 0 || (nextProfile.activeOnlineCourses || []).length > 0)
  ) {
    nextProfile.accountReady = true
  }

  await usersCollection.updateOne(
    { _id: new ObjectId(student.id) },
    { $set: { studentProfile: nextProfile, updatedAt: new Date() } }
  )

  return { ...student, studentProfile: nextProfile }
}

/**
 * Після pull з CRM: відкликати зняті курси, видати нові, підчистити enrolled/progress.
 */
export async function syncCoursesAfterCrmSchedulePull(crmStudentId, user, usersCollection) {
  const id = String(crmStudentId || '').trim()
  if (!id || !user) return user

  const { grantCourseAccessForCrmStudent, revokeCourseAccessForCrmStudent } = await import(
    '@/lib/crmLmsSync'
  )
  const { getRemovedOnlineCourseIds } = await import('@/lib/courseLessonAccess')
  const { syncStudentScheduleAccess } = await import('@/lib/syncStudentScheduleAccess')

  const prevCourses = user.studentProfile?.activeOnlineCourses || []
  const refreshed = await usersCollection.findOne({ _id: user._id })
  const nextCourses = refreshed?.studentProfile?.activeOnlineCourses || []

  const removed = getRemovedOnlineCourseIds(
    prevCourses,
    nextCourses,
    refreshed?.purchasedCourses || user.purchasedCourses || []
  )
  for (const courseId of removed) {
    try {
      await revokeCourseAccessForCrmStudent(id, courseId)
    } catch (e) {
      console.error('revoke course after CRM schedule sync:', courseId, e)
    }
  }

  for (const courseId of nextCourses) {
    try {
      await grantCourseAccessForCrmStudent(id, courseId, { enabled: true })
    } catch (e) {
      console.error('grant course after CRM schedule sync:', courseId, e)
    }
  }

  const afterGrants = await usersCollection.findOne({ _id: user._id })
  if (afterGrants) {
    await syncStudentScheduleAccess(afterGrants, usersCollection)
    return afterGrants
  }
  return refreshed || user
}

/**
 * Синхронізація розкладу LMS за CRM student id (виклик з internal API після змін у CRM).
 */
export async function syncScheduleFromCrmStudentId(crmStudentId) {
  const id = String(crmStudentId || '').trim()
  if (!id) throw new Error('crmStudentId is required')

  const { getCollection } = await import('@/lib/mongodb')
  const { findUserByCrmStudentId } = await import('@/lib/crmLmsSync')

  const usersCollection = await getCollection('users')
  const user = await findUserByCrmStudentId(id, usersCollection)
  if (!user) {
    return { ok: false, message: 'Користувача LMS не знайдено (спочатку привʼяжіть учня)' }
  }

  const prevCourses = user.studentProfile?.activeOnlineCourses || []
  const pulled = await pullCrmScheduleToSmartcodeStudent(
    {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      studentProfile: user.studentProfile || {},
    },
    usersCollection
  )

  const userForCourses = {
    ...user,
    studentProfile: {
      ...(user.studentProfile || {}),
      activeOnlineCourses: prevCourses,
    },
  }
  const finalUser = await syncCoursesAfterCrmSchedulePull(id, userForCourses, usersCollection)

  return {
    ok: true,
    userId: user._id.toString(),
    crmStudentId: id,
    syncedAt: finalUser?.studentProfile?.crmScheduleSyncedAt || pulled.studentProfile?.crmScheduleSyncedAt || null,
  }
}

/**
 * Те саме, що pullCrmScheduleToSmartcodeStudent, але не частіше ніж раз на CRM_AUTO_PULL_MIN_MS (для /api/auth/me).
 */
export async function maybePullCrmScheduleForStudent(user, usersCollection) {
  if (!user || user.role === 'admin' || !CRM_BASE_URL) return user
  const profile = user.studentProfile || {}
  const last = profile.crmScheduleSyncedAt
  if (last) {
    const ts = new Date(last).getTime()
    if (Number.isFinite(ts) && Date.now() - ts < CRM_AUTO_PULL_MIN_MS) {
      return user
    }
  }

  try {
    const prevCourses = profile.activeOnlineCourses || []
    const pulled = await pullCrmScheduleToSmartcodeStudent(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        studentProfile: profile,
      },
      usersCollection
    )
    const crmStudentId = String(
      pulled.studentProfile?.crmStudentId || profile.crmStudentId || ''
    ).trim()
    if (crmStudentId) {
      const userForCourses = {
        ...user,
        ...pulled,
        studentProfile: {
          ...(pulled.studentProfile || {}),
          activeOnlineCourses: prevCourses,
        },
      }
      const finalUser = await syncCoursesAfterCrmSchedulePull(
        crmStudentId,
        userForCourses,
        usersCollection
      )
      return {
        ...user,
        studentProfile: finalUser?.studentProfile ?? pulled.studentProfile,
      }
    }
    return {
      ...user,
      studentProfile: pulled.studentProfile,
    }
  } catch (e) {
    console.error('CRM schedule auto-pull failed:', e)
    return user
  }
}
