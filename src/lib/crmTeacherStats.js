import { crmJson } from '@/lib/crmStudentSchedulePull'
import { isReliableStudentDisplayName } from '@/lib/crmLmsSync'

/** Імʼя учня для кабінету викладача — без контактів. */
export function teacherStudentDisplayName(rawName, shortId) {
  const name = String(rawName || '').trim()
  if (name && isReliableStudentDisplayName(name)) return name
  const code = String(shortId || '').trim()
  return code ? `Учень · ${code}` : 'Учень'
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
