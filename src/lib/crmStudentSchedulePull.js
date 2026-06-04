import { ObjectId } from 'mongodb'
import {
  DEFAULT_LMS_STUDENT_NAME,
  isPlaceholderStudentName,
  isReliableStudentDisplayName,
} from '@/lib/crmLmsSync'
import { kyivPartsFromInstant } from '@/lib/kyivTime'

const CRM_BASE_URL = process.env.CRM_API_URL || process.env.SMARTCODE_CRM_API_URL || ''
const CRM_NICKNAME = process.env.CRM_ACCOUNT_NICKNAME || process.env.ACCOUNT_NICKNAME || ''
const CRM_PASSWORD = process.env.CRM_ACCOUNT_PASSWORD || process.env.ACCOUNT_PASSWORD || ''
const CRM_STATIC_TOKEN =
  process.env.CRM_BEARER_TOKEN ||
  process.env.CRM_JWT_SECRET ||
  process.env.JWT_SECRET ||
  ''

const KYIV_WEEKDAY_UK = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

/** Мінімальний інтервал між auto-pull з CRM на /api/auth/me (секунди). */
const CRM_AUTO_PULL_MIN_MS = 15 * 1000

const CRM_FETCH_NO_STORE = { cache: 'no-store' }

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
 */
export async function crmJson(method, pathAndQuery, jsonBody) {
  if (!CRM_BASE_URL) throw new Error('CRM не налаштовано (немає CRM_API_URL)')
  const base = CRM_BASE_URL.replace(/\/$/, '')
  const path = String(pathAndQuery || '').replace(/^\//, '')
  const url = `${base}/${path}`
  const token = await resolveCrmToken()
  const init = {
    method,
    headers: buildCrmHeaders(token),
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
  if (CRM_STATIC_TOKEN) return CRM_STATIC_TOKEN
  if (!CRM_BASE_URL || !CRM_NICKNAME || !CRM_PASSWORD) return ''

  if (cachedCrmToken && Date.now() < crmTokenExpiresAt) {
    return cachedCrmToken
  }

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
  }
  return token
}

export async function fetchCrmTeachers() {
  if (!CRM_BASE_URL) return []
  const token = await resolveCrmToken()
  const response = await fetchCrmWithTimeout(`${CRM_BASE_URL.replace(/\/$/, '')}/staff?limit=200&active_only=true`, {
    headers: buildCrmHeaders(token),
    next: { revalidate: 300 },
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
  const formatText = profile.lessonFormat === 'individual' ? 'Індивідуальні' : 'Групові'
  const zoom = String(profile.zoomLink || '').trim()
  const onlineCourses = (profile.activeOnlineCourses || []).filter(Boolean)
  const teacherName = String(profile.crmTeacherName || '').trim()

  const notesParts = [
    'Синхронізовано з SmartCode admin.',
    `Формат: ${formatText}.`,
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

/** Створює або оновлює картку учня в CRM; повертає об'єкт з полем id або null. */
export async function syncStudentToCrm(studentDoc) {
  if (!CRM_BASE_URL) return null
  const profile = studentDoc?.studentProfile || {}
  let crmStudentId = String(profile.crmStudentId || '').trim()
  const token = await resolveCrmToken()
  const body = crmPayloadFromStudent(studentDoc)
  const base = CRM_BASE_URL.replace(/\/$/, '')

  if (!crmStudentId) {
    const existing = await findCrmStudentByEmailOrLmsId(studentDoc)
    if (existing?.id) crmStudentId = String(existing.id)
  }

  if (crmStudentId) {
    const patchResponse = await fetchCrmWithTimeout(`${base}/students/${crmStudentId}`, {
      method: 'PATCH',
      headers: buildCrmHeaders(token),
      body: JSON.stringify(body),
    })
    if (patchResponse.ok) {
      return patchResponse.json()
    }
  }

  const createResponse = await fetchCrmWithTimeout(`${base}/students`, {
    method: 'POST',
    headers: buildCrmHeaders(token),
    body: JSON.stringify(body),
  })
  if (!createResponse.ok) {
    const message = await createResponse.text()
    throw new Error(message || `CRM student sync failed (${createResponse.status})`)
  }
  return createResponse.json()
}

/** Груповий слот у CRM зберігається як kind=individual + series_id group:… або нотатка GROUP_LESSON. */
export function isCrmGroupLessonSlot(lesson) {
  const series = String(lesson?.series_id || '')
  if (series.startsWith('group:')) return true
  if (String(lesson?.notes_internal || '').trim() === 'GROUP_LESSON') return true
  return false
}

export function scheduleFromCrmLessons(lessons) {
  const byDay = new Map()
  for (const lesson of lessons) {
    if (String(lesson?.kind || '') !== 'individual') continue
    if (String(lesson?.status || '') === 'cancelled') continue
    const start = new Date(lesson.start_at)
    if (Number.isNaN(start.getTime())) continue
    const p = kyivPartsFromInstant(start.getTime())
    const day = KYIV_WEEKDAY_UK[p.weekdayIndex]
    if (!day) continue
    const time = `${String(p.hour).padStart(2, '0')}:${String(p.minute).padStart(2, '0')}`
    if (!byDay.has(day)) byDay.set(day, new Set())
    byDay.get(day).add(time)
  }
  const orderedDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
  const out = []
  for (const day of orderedDays) {
    const times = [...(byDay.get(day) || [])].sort()
    if (times.length > 0) {
      out.push({ day, time: times[0] })
    }
  }
  return out
}

export function lessonFormatFromCrmLessons(lessons, fallbackProfile) {
  const list = Array.isArray(lessons) ? lessons : []
  const active = list.filter((l) => String(l?.status || '') !== 'cancelled')
  const hasPureIndividual = active.some(
    (l) => String(l?.kind || '') === 'individual' && !isCrmGroupLessonSlot(l)
  )
  if (hasPureIndividual) return 'individual'
  const hasGroupSlot = active.some(
    (l) => String(l?.kind || '') === 'individual' && isCrmGroupLessonSlot(l)
  )
  if (hasGroupSlot) return 'group'
  return fallbackProfile?.lessonFormat || 'group'
}

/** Групи CRM, де є учень — zoom і онлайн-курси для профілю LMS. */
async function fetchCrmGroupsForStudent(crmStudentId) {
  if (!CRM_BASE_URL || !crmStudentId) return []
  try {
    const groups = await crmJson('GET', 'groups?limit=200&active_only=true')
    if (!Array.isArray(groups)) return []
    return groups.filter((g) =>
      (g.student_ids || []).some((sid) => String(sid) === String(crmStudentId))
    )
  } catch (e) {
    console.error('CRM groups fetch for student failed:', e)
    return []
  }
}

function mergeGroupContextIntoProfile(prev, crmGroups) {
  const next = { ...prev }
  if (!crmGroups.length) return next

  const zoom = crmGroups.map((g) => String(g.zoom_link || '').trim()).find(Boolean)
  if (zoom) next.zoomLink = zoom

  const courseIds = new Set(next.activeOnlineCourses || [])
  for (const g of crmGroups) {
    for (const cid of g.online_course_ids || []) {
      if (cid) courseIds.add(String(cid))
    }
  }
  if (courseIds.size > 0) {
    next.activeOnlineCourses = [...courseIds]
  }
  return next
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
  const lessonsParams = new URLSearchParams({
    kind: 'individual',
    student_id: String(crmStudent.id),
    limit: '500',
  })

  const [lessonsResponse, teachers, crmGroups] = await Promise.all([
    fetchCrmWithTimeout(`${CRM_BASE_URL.replace(/\/$/, '')}/lessons?${lessonsParams}`, {
      headers: buildCrmHeaders(token),
      ...CRM_FETCH_NO_STORE,
    }),
    fetchCrmTeachers().catch(() => []),
    fetchCrmGroupsForStudent(crmStudent.id)
  ])

  const lessons = lessonsResponse.ok ? await lessonsResponse.json() : []
  const rawLessons = Array.isArray(lessons) ? lessons : []
  const schedule = scheduleFromCrmLessons(rawLessons)

  let teacherId = ''
  if (rawLessons.length > 0) {
    const firstLesson = rawLessons.find((item) => String(item?.teacher_id || '').trim())
    teacherId = String(firstLesson?.teacher_id || '').trim()
  }

  let teacherName = ''
  if (teacherId) {
    teacherName = String(
      teachers.find((item) => item.id === teacherId)?.fullName ||
        student?.studentProfile?.crmTeacherName ||
        ''
    )
  }
  const prev = student?.studentProfile || {}
  const nextLessonFormat =
    rawLessons.length > 0 ? lessonFormatFromCrmLessons(rawLessons, prev) : prev.lessonFormat || 'group'

  let nextProfile = {
    ...prev,
    crmStudentId: String(crmStudent.id || ''),
    crmShortId: String(crmStudent.short_id || ''),
    regularSchedule: schedule.length > 0 ? schedule : prev.regularSchedule || [],
    lessonFormat: nextLessonFormat,
    crmTeacherId: teacherId || String(prev.crmTeacherId || ''),
    crmTeacherName: teacherName || String(prev.crmTeacherName || ''),
    crmScheduleSyncedAt: new Date().toISOString(),
  }
  nextProfile = mergeGroupContextIntoProfile(nextProfile, crmGroups)
  if (
    nextProfile.accountReady === false &&
    (schedule.length > 0 || (nextProfile.activeOnlineCourses || []).length > 0)
  ) {
    nextProfile.accountReady = true
  }

  const crmFullName = String(crmStudent.full_name || '').trim()
  const profileSet = { studentProfile: nextProfile, updatedAt: new Date() }
  let nextName = student.name
  if (
    crmFullName &&
    isReliableStudentDisplayName(crmFullName) &&
    isPlaceholderStudentName(student.name)
  ) {
    profileSet.name = crmFullName
    nextName = crmFullName
  }

  await usersCollection.updateOne(
    { _id: new ObjectId(student.id) },
    { $set: profileSet }
  )

  return { ...student, name: nextName, studentProfile: nextProfile }
}

/**
 * Синхронізація розкладу LMS за CRM student id (виклик з internal API після змін у CRM).
 */
export async function syncScheduleFromCrmStudentId(crmStudentId) {
  const id = String(crmStudentId || '').trim()
  if (!id) throw new Error('crmStudentId is required')

  const { getCollection } = await import('@/lib/mongodb')
  const { findUserByCrmStudentId, grantCourseAccessForCrmStudent } = await import('@/lib/crmLmsSync')

  const usersCollection = await getCollection('users')
  const user = await findUserByCrmStudentId(id, usersCollection)
  if (!user) {
    return { ok: false, message: 'Користувача LMS не знайдено (спочатку привʼяжіть учня)' }
  }

  const pulled = await pullCrmScheduleToSmartcodeStudent(
    {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      studentProfile: user.studentProfile || {},
    },
    usersCollection
  )

  const courseIds = pulled.studentProfile?.activeOnlineCourses || []
  for (const courseId of courseIds) {
    try {
      await grantCourseAccessForCrmStudent(id, courseId, { enabled: true })
    } catch (e) {
      console.error('grant course after CRM schedule sync:', courseId, e)
    }
  }

  return {
    ok: true,
    userId: user._id.toString(),
    crmStudentId: id,
    syncedAt: pulled.studentProfile?.crmScheduleSyncedAt || null,
  }
}

/**
 * Те саме, що pullCrmScheduleToSmartcodeStudent, але не частіше ніж раз на CRM_AUTO_PULL_MIN_MS (для /api/auth/me).
 */
export async function maybePullCrmScheduleForStudent(user, usersCollection) {
  if (!user || user.role === 'admin' || !CRM_BASE_URL) return user
  const profile = user.studentProfile || {}
  const last = profile.crmScheduleSyncedAt
  const hasSchedule = (profile.regularSchedule || []).length > 0
  const linkedCrm = Boolean(String(profile.crmStudentId || '').trim())
  if (last) {
    const ts = new Date(last).getTime()
    const throttled =
      Number.isFinite(ts) && Date.now() - ts < CRM_AUTO_PULL_MIN_MS
    if (throttled && (hasSchedule || !linkedCrm)) {
      return user
    }
  }

  try {
    const pulled = await pullCrmScheduleToSmartcodeStudent(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        studentProfile: profile,
      },
      usersCollection
    )
    return {
      ...user,
      name: pulled.name ?? user.name,
      studentProfile: pulled.studentProfile,
    }
  } catch (e) {
    console.error('CRM schedule auto-pull failed:', e)
    return user
  }
}
