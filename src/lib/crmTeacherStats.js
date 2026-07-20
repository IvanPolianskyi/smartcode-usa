import { crmJson, isCrmGroupLessonSlot } from '@/lib/crmStudentSchedulePull'
import { isReliableStudentDisplayName, LMS_COURSE_CATALOG } from '@/lib/crmLmsSync'
import {
  flattenCourseLessons,
  getCoursePageHref,
  isKnownCourseId,
} from '@/lib/courseLessonAccess'
import { parseUtcInstant } from '@/lib/kyivTime'
import { getCollection } from '@/lib/mongodb'

/** Імʼя учня для кабінету викладача — без контактів. */
export function teacherStudentDisplayName(rawName, shortId) {
  const name = String(rawName || '').trim()
  if (name && isReliableStudentDisplayName(name)) return name
  const code = String(shortId || '').trim()
  return code ? `Учень · ${code}` : 'Учень'
}

const COURSE_NAME_BY_ID = Object.fromEntries(
  LMS_COURSE_CATALOG.map((c) => [c.id, c.name])
)

/** Grace: урок, що вже почався, ще вважаємо «наступним», поки не завершився. */
const NEXT_LESSON_GRACE_MS = 60 * 60 * 1000
const NEXT_LESSON_HORIZON_MS = 21 * 24 * 60 * 60 * 1000

/**
 * Наступний урок курсу для розбору з учнем (перший незавершений у curriculum).
 */
export function resolveContinueLesson(courseId, completedLessonIds = []) {
  if (!isKnownCourseId(courseId)) return null
  const lessons = flattenCourseLessons(courseId)
  if (!lessons.length) return null
  const done = new Set((completedLessonIds || []).map(String))
  const next = lessons.find((l) => !done.has(String(l.lessonId))) || lessons[0]
  return {
    courseId,
    courseName: COURSE_NAME_BY_ID[courseId] || courseId,
    lessonId: next.lessonId,
    lessonTitle: String(next.title || next.lessonId),
    href: `/courses/${courseId}/lessons/${next.lessonId}`,
    courseHref: getCoursePageHref(courseId),
  }
}

async function resolveLmsContinueForStudent({ shortId, crmStudentId, preferredCourseId }) {
  const usersCollection = await getCollection('users')
  const progressCollection = await getCollection('userProgress')

  let user = null
  const sid = String(shortId || '').trim()
  const crmId = String(crmStudentId || '').trim()
  if (sid) {
    user = await usersCollection.findOne({
      role: { $nin: ['teacher', 'admin'] },
      'studentProfile.crmShortId': sid,
    })
  }
  if (!user && crmId) {
    user = await usersCollection.findOne({
      role: { $nin: ['teacher', 'admin'] },
      'studentProfile.crmStudentId': crmId,
    })
  }
  if (!user) {
    const preferred = String(preferredCourseId || '').trim()
    if (preferred && isKnownCourseId(preferred)) {
      return resolveContinueLesson(preferred, [])
    }
    return null
  }

  const profile = user.studentProfile || {}
  const candidates = [
    preferredCourseId,
    profile.primaryCourseId,
    ...(profile.activeOnlineCourses || []),
    ...(user.purchasedCourses || []),
    ...(user.enrolledCourses || []),
  ]
    .map((id) => String(id || '').trim())
    .filter((id) => isKnownCourseId(id))

  const courseId = [...new Set(candidates)][0]
  if (!courseId) return null

  const progress = await progressCollection.findOne({
    userId: user._id,
    courseId,
  })
  return resolveContinueLesson(courseId, progress?.completedLessons || [])
}

/**
 * Найближчий запланований урок викладача з CRM + посилання на урок курсу в LMS.
 */
export async function fetchTeacherNextLesson(crmStaffId) {
  const staffId = String(crmStaffId || '').trim()
  if (!staffId) return { nextLesson: null }

  const now = Date.now()
  const rangeStart = new Date(now - NEXT_LESSON_GRACE_MS).toISOString()
  const rangeEnd = new Date(now + NEXT_LESSON_HORIZON_MS).toISOString()

  let lessons = []
  try {
    lessons = await crmJson(
      'GET',
      `lessons/range?start=${encodeURIComponent(rangeStart)}&end=${encodeURIComponent(rangeEnd)}&kinds=${encodeURIComponent('individual,trial')}`,
      undefined,
      { timeout: 15000 }
    )
  } catch (error) {
    console.warn('fetchTeacherNextLesson:', error?.message || error)
    return { nextLesson: null, crmError: error?.message || 'CRM unavailable' }
  }

  if (!Array.isArray(lessons)) return { nextLesson: null }

  const upcoming = lessons
    .filter((lesson) => {
      if (String(lesson?.teacher_id || '') !== staffId) return false
      if (String(lesson?.kind || '') === 'availability') return false
      if (lesson?.group_calendar_removed === true) return false
      const status = String(lesson?.status || 'scheduled')
      if (status !== 'scheduled') return false
      const startMs = parseUtcInstant(lesson?.start_at).getTime()
      return Number.isFinite(startMs) && startMs >= now - NEXT_LESSON_GRACE_MS
    })
    .sort(
      (a, b) =>
        parseUtcInstant(a.start_at).getTime() - parseUtcInstant(b.start_at).getTime()
    )

  const lesson = upcoming[0]
  if (!lesson) return { nextLesson: null }

  const shortId = String(lesson.student_short_id || '').trim()
  const studentName = teacherStudentDisplayName(lesson.student_name, shortId)
  const kind = String(lesson.kind || 'individual')
  const preferredCourseId = String(
    lesson.primary_course_id || lesson.direction_label || ''
  ).trim()
  // direction_label may be a human label — only use if it's a known course id
  const courseHint = isKnownCourseId(preferredCourseId)
    ? preferredCourseId
    : String(lesson.primary_course_id || '').trim()

  let continueLesson = await resolveLmsContinueForStudent({
    shortId,
    crmStudentId: lesson.student_id,
    preferredCourseId: courseHint,
  })

  // Якщо в LMS немає курсу — спробувати primary_course з картки учня в CRM
  if (!continueLesson && lesson.student_id) {
    try {
      const crmStudent = await crmJson('GET', `students/${encodeURIComponent(lesson.student_id)}`)
      const crmCourse = String(crmStudent?.primary_course_id || '').trim()
      if (crmCourse && isKnownCourseId(crmCourse)) {
        continueLesson = resolveContinueLesson(crmCourse, [])
      }
    } catch {
      /* ignore */
    }
  }

  return {
    nextLesson: {
      lessonId: String(lesson.id || ''),
      startAt: lesson.start_at,
      endAt: lesson.end_at || null,
      kind,
      kindLabel:
        kind === 'trial'
          ? 'ПУ'
          : isCrmGroupLessonSlot(lesson)
            ? 'ГУ'
            : 'ІУ',
      studentCode: shortId || null,
      studentName,
      groupName: lesson.group_name || null,
      courseId: continueLesson?.courseId || null,
      courseName: continueLesson?.courseName || null,
      lmsLessonId: continueLesson?.lessonId || null,
      lmsLessonTitle: continueLesson?.lessonTitle || null,
      openHref: continueLesson?.href || null,
      courseHref: continueLesson?.courseHref || null,
    },
  }
}

function isBetterTeacherName(nextName, currentName) {
  const next = String(nextName || '').trim()
  const cur = String(currentName || '').trim()
  if (!next || next.startsWith('Учень ·')) return false
  if (!cur || cur.startsWith('Учень ·')) return true
  return false
}

/**
 * Черга ЗП викладача з тієї ж вкладки CRM «Зарплати»
 * (GET /reports/teacher-salaries?outstanding_only=true&teacher_id=…).
 */
export async function fetchTeacherSalaryQueueFromCrm(crmStaffId) {
  const staffId = String(crmStaffId || '').trim()
  const empty = {
    found: false,
    payableCount: 0,
    trialCount: 0,
    recordingsCount: 0,
    payoutUah: null,
    rateUah: null,
    groupRateUah: null,
    recordings: [],
    lessonIds: new Set(),
  }
  if (!staffId) return empty

  const report = await crmJson(
    'GET',
    `reports/teacher-salaries?outstanding_only=true&teacher_id=${encodeURIComponent(staffId)}`,
    undefined,
    { timeout: 12000 }
  )
  const teachers = Array.isArray(report?.teachers) ? report.teachers : []
  const row =
    teachers.find((t) => String(t?.teacher_id || '') === staffId) || null
  if (!row) return empty

  const recordings = Array.isArray(row.recordings) ? row.recordings : []
  const lessonIds = new Set(
    recordings.map((r) => String(r?.lesson_id || '').trim()).filter(Boolean)
  )
  const payableCount = Number(row.payable_count) || 0
  const trialCount = Number(row.trial_count) || 0
  const recordingsCount =
    Number(row.recordings_count) || payableCount + trialCount || recordings.length

  return {
    found: true,
    payableCount,
    trialCount,
    recordingsCount,
    payoutUah: row.payout_uah == null ? null : Number(row.payout_uah),
    rateUah: row.rate_uah == null ? null : Number(row.rate_uah),
    groupRateUah:
      row.group_rate_uah == null ? null : Number(row.group_rate_uah),
    recordings,
    lessonIds,
  }
}

function applySalaryQueueToTotals(totals, salaryQueue) {
  if (!salaryQueue) return totals
  const n = salaryQueue.recordingsCount || 0
  // currentBatchVideos лишаємо = черга CRM (для старих клієнтів UI).
  totals.currentBatchRecorded = n
  totals.currentBatchVideos = n
  totals.payableCount = salaryQueue.payableCount || 0
  totals.trialCount = salaryQueue.trialCount || 0
  totals.payoutUah = salaryQueue.payoutUah
  totals.rateUah = salaryQueue.rateUah
  totals.groupRateUah = salaryQueue.groupRateUah
  return totals
}

function applySalaryQueueToStudents(students, salaryQueue) {
  if (!salaryQueue?.recordings?.length) {
    for (const cell of Object.values(students)) {
      cell.recordedLessons = 0
    }
    return students
  }
  for (const cell of Object.values(students)) {
    cell.recordedLessons = 0
  }
  for (const rec of salaryQueue.recordings) {
    const code = String(rec?.student_short_id || '').trim()
    if (!code) continue
    if (!students[code]) {
      students[code] = {
        code,
        name: teacherStudentDisplayName(rec?.student_name, code),
        completedLessons: 0,
        recordedLessons: 0,
      }
    }
    students[code].recordedLessons += 1
    const nextName = teacherStudentDisplayName(rec?.student_name, code)
    if (isBetterTeacherName(nextName, students[code].name)) {
      students[code].name = nextName
    }
  }
  return students
}

function emptyTeacherTotals() {
  return {
    completed: 0,
    recorded: 0,
    /**
     * Уроки в поточній пачці ЗП (як CRM /salaries).
     * Історична назва currentBatchVideos — тепер = уся черга, не лише з файлом відео.
     */
    currentBatchVideos: 0,
    /** Те саме, що currentBatchVideos (явна назва). */
    currentBatchRecorded: 0,
    payableCount: 0,
    trialCount: 0,
    payoutUah: null,
    rateUah: null,
    groupRateUah: null,
    recordedWithVideo: 0,
    recordedTextOnly: 0,
    missingRecording: 0,
    individualCompleted: 0,
    trialCompleted: 0,
  }
}

/**
 * Лише черга ЗП (без історії уроків) — для карток «пачка / до виплати».
 */
export async function fetchTeacherSalaryBatchTotals(crmStaffId) {
  const staffId = String(crmStaffId || '').trim()
  const empty = { totals: emptyTeacherTotals() }
  if (!staffId) return empty

  try {
    const queue = await fetchTeacherSalaryQueueFromCrm(staffId)
    const totals = emptyTeacherTotals()
    if (queue?.found) applySalaryQueueToTotals(totals, queue)
    return { totals }
  } catch (error) {
    console.warn('fetchTeacherSalaryBatchTotals:', error?.message || error)
    return {
      ...empty,
      crmError: error?.message || 'CRM unavailable',
    }
  }
}

/**
 * Статистика пачки ЗП по учнях (без повної історії уроків з CRM).
 */
export async function fetchTeacherCrmLessonStats(crmStaffId) {
  const staffId = String(crmStaffId || '').trim()
  const empty = {
    students: {},
    totals: emptyTeacherTotals(),
  }
  if (!staffId) return empty

  try {
    const queue = await fetchTeacherSalaryQueueFromCrm(staffId)
    const students = {}
    const totals = emptyTeacherTotals()
    if (queue?.found) {
      applySalaryQueueToTotals(totals, queue)
      applySalaryQueueToStudents(students, queue)
    }
    return { students, totals }
  } catch (error) {
    console.warn('fetchTeacherCrmLessonStats:', error?.message || error)
    return {
      ...empty,
      crmError: error?.message || 'CRM unavailable',
    }
  }
}
