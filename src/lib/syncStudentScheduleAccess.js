import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'
import { robloxCurriculum } from '@/lib/robloxCurriculum'

const DAY_MAP = {
  'Нд': 0,
  'Пн': 1,
  'Вт': 2,
  'Ср': 3,
  'Чт': 4,
  'Пт': 5,
  'Сб': 6,
}

const COURSE_CURRICULUM = {
  'python-developer-zero-to-junior': pythonCurriculum,
  'web-development': webDevCurriculum,
  'roblox-studio': robloxCurriculum,
}

function getAllLessons(courseId) {
  const curriculum = COURSE_CURRICULUM[courseId]
  if (!curriculum?.modules) return []
  return curriculum.modules.flatMap((module) => module.lessons || [])
}

function getOccurredSlotsCount(schedule = [], startDate, now = new Date()) {
  if (!Array.isArray(schedule) || schedule.length === 0) return 0
  if (!(startDate instanceof Date) || Number.isNaN(startDate.getTime())) return 0

  const nowTs = now.getTime()
  const startTs = startDate.getTime()
  if (startTs > nowTs) return 0

  const weekMs = 7 * 24 * 60 * 60 * 1000

  return schedule.reduce((sum, slot) => {
    const targetDay = DAY_MAP[slot?.day]
    if (targetDay === undefined) return sum
    const [hh, mm] = String(slot?.time || '').split(':')
    const hours = Number(hh)
    const minutes = Number(mm)
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return sum

    const first = new Date(startDate)
    first.setHours(hours, minutes, 0, 0)

    const diffToDay = (targetDay - first.getDay() + 7) % 7
    first.setDate(first.getDate() + diffToDay)
    if (first.getTime() < startTs) {
      first.setDate(first.getDate() + 7)
    }
    if (first.getTime() > nowTs) return sum

    const slots = Math.floor((nowTs - first.getTime()) / weekMs) + 1
    return sum + Math.max(0, slots)
  }, 0)
}

export async function syncStudentScheduleAccess(user, usersCollection) {
  if (!user || user.role === 'admin') return user

  const profile = user.studentProfile || {}
  const activeOnlineCourses = Array.isArray(profile.activeOnlineCourses) ? profile.activeOnlineCourses : []
  const regularSchedule = Array.isArray(profile.regularSchedule) ? profile.regularSchedule : []
  const scheduleSyncStartAt = profile.scheduleSyncStartAt
    ? new Date(profile.scheduleSyncStartAt)
    : new Date(user.createdAt || Date.now())

  const occurredSlots = getOccurredSlotsCount(regularSchedule, scheduleSyncStartAt)
  const nextUnlockCount = Math.max(1, occurredSlots + 1)
  const courseAccess = { ...(profile.courseAccess || {}) }

  let changed = false

  activeOnlineCourses.forEach((courseId) => {
    const allLessons = getAllLessons(courseId)
    if (allLessons.length === 0) return

    const existingAccess = courseAccess[courseId] || {}
    const existingUnlocked = Array.isArray(existingAccess.unlockedLessons) ? existingAccess.unlockedLessons : []
    const existingCount = existingUnlocked.length
    const desiredCount = Math.min(allLessons.length, Math.max(existingCount, nextUnlockCount))
    const desiredUnlocked = allLessons.slice(0, desiredCount).map((lesson) => lesson.lessonId)

    const nextAccess = {
      enabled: existingAccess.enabled !== false,
      unlockedLessons: desiredUnlocked,
    }

    if (
      existingAccess.enabled !== nextAccess.enabled ||
      JSON.stringify(existingUnlocked) !== JSON.stringify(desiredUnlocked)
    ) {
      courseAccess[courseId] = nextAccess
      changed = true
    }
  })

  if (!changed) return user

  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        'studentProfile.courseAccess': courseAccess,
        updatedAt: new Date(),
      },
    }
  )

  return {
    ...user,
    studentProfile: {
      ...profile,
      courseAccess,
    },
  }
}

