import { crmJson } from '@/lib/crmStudentSchedulePull'
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
      `lessons/range?start=${encodeURIComponent(rangeStart)}&end=${encodeURIComponent(rangeEnd)}&kinds=${encodeURIComponent('individual,trial')}`
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
          : lesson.group_id || lesson.is_group_slot
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
 * Агрегує уроки викладача з CRM: проведені та підтверджені записами бота.
 * @param {string} crmStaffId
 * @returns {Promise<{
 *   students: Record<string, { code: string, name: string, completedLessons: number, recordedLessons: number }>,
 *   totals: { completed: number, recorded: number, individualCompleted: number, trialCompleted: number },
 *   crmError?: string
 * }>}
 */
export async function fetchTeacherCrmLessonStats(crmStaffId) {
  const staffId = String(crmStaffId || '').trim()
  const empty = {
    students: {},
    totals: {
      completed: 0,
      recorded: 0,
      individualCompleted: 0,
      trialCompleted: 0,
    },
  }
  if (!staffId) return empty

  let lessons = []
  try {
    lessons = await crmJson(
      'GET',
      `lessons?teacher_id=${encodeURIComponent(staffId)}&limit=2000&sort=-1`
    )
  } catch (error) {
    console.warn('fetchTeacherCrmLessonStats:', error?.message || error)
    return { ...empty, crmError: error?.message || 'CRM unavailable' }
  }

  if (!Array.isArray(lessons)) return empty

  const students = {}
  const totals = {
    completed: 0,
    recorded: 0,
    individualCompleted: 0,
    trialCompleted: 0,
  }

  for (const lesson of lessons) {
    const kind = String(lesson?.kind || 'individual')
    if (kind === 'availability') continue

    const status = String(lesson?.status || 'scheduled')
    const isCompleted = status === 'completed'
    const hasRecording = Boolean(lesson?.recording_submitted_at)

    if (isCompleted) totals.completed += 1
    if (hasRecording) totals.recorded += 1
    if (kind === 'trial' && isCompleted) totals.trialCompleted += 1
    if (kind === 'individual' && isCompleted) totals.individualCompleted += 1

    const shortId = String(lesson?.student_short_id || '').trim()
    if (!shortId) continue

    if (!students[shortId]) {
      students[shortId] = {
        code: shortId,
        name: teacherStudentDisplayName(lesson?.student_name, shortId),
        completedLessons: 0,
        recordedLessons: 0,
      }
    }

    const cell = students[shortId]
    if (isCompleted) cell.completedLessons += 1
    if (hasRecording) cell.recordedLessons += 1

    const nextName = teacherStudentDisplayName(lesson?.student_name, shortId)
    if (isBetterTeacherName(nextName, cell.name)) {
      cell.name = nextName
    }
  }

  return { students, totals }
}
