import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'
import { robloxCurriculum } from '@/lib/robloxCurriculum'

export const PYTHON_COURSE_ID = 'python-developer-zero-to-junior'

export const ONLINE_COURSE_CURRICULA = {
  [PYTHON_COURSE_ID]: pythonCurriculum,
  'web-development': webDevCurriculum,
  'roblox-studio': robloxCurriculum,
}

export function flattenCourseLessons(courseId) {
  const curriculum = ONLINE_COURSE_CURRICULA[courseId]
  if (!curriculum?.modules) return []
  return curriculum.modules.flatMap((module) => module.lessons || [])
}

export function hasActiveOnlineCourse(profile, courseId) {
  return (profile?.activeOnlineCourses || []).includes(courseId)
}

export function hasStudentCourseAccess(user, courseId) {
  if (!courseId) return false
  if (!user) return false
  if (user.role === 'admin') return true
  if ((user.purchasedCourses || []).includes(courseId)) return true
  return hasActiveOnlineCourse(user.studentProfile, courseId)
}

export function isCourseFullAccess(profile, courseId) {
  const access = profile?.courseAccess?.[courseId]
  if (!access) return false
  if (access.fullAccess === true) return true
  const all = flattenCourseLessons(courseId)
  const unlocked = access.unlockedLessons || []
  return all.length > 0 && unlocked.length >= all.length
}

/**
 * Побудова множини відкритих уроків: повний доступ адміна/покупки; Python — усі уроки для онлайн-учнів;
 * інші курси — перший урок + наступні після завершення попереднього.
 */
export function getUnlockedLessonSet({
  courseId,
  profile,
  progress,
  isAdmin = false,
  isPurchased = false,
  isEnrolled = false,
}) {
  const allLessons = flattenCourseLessons(courseId)
  const allIds = allLessons.map((l) => l.lessonId)
  if (allIds.length === 0) return new Set()

  const freePreview = new Set(
    courseId === 'roblox-studio' ? ['lesson-roblox-1-1'] : []
  )

  if (isAdmin || isPurchased) {
    return new Set(allIds)
  }

  if (isCourseFullAccess(profile, courseId)) {
    return new Set(allIds)
  }

  const hasOnline =
    hasActiveOnlineCourse(profile, courseId) ||
    profile?.courseAccess?.[courseId]?.enabled === true

  if (!hasOnline) {
    return freePreview
  }

  if (courseId === PYTHON_COURSE_ID) {
    return new Set(allIds)
  }

  const completed = new Set(progress?.completedLessons || [])
  const unlocked = new Set(freePreview)
  unlocked.add(allIds[0])
  for (let i = 1; i < allIds.length; i++) {
    if (completed.has(allIds[i - 1])) {
      unlocked.add(allIds[i])
    }
  }
  return unlocked
}

export function isLessonUnlockedInCourse(lessonId, ctx) {
  return getUnlockedLessonSet(ctx).has(lessonId)
}

/** Курси, до яких учень має доступ у кабінеті (CRM/онлайн + куплені). */
export function getStudentAccessibleCourseIds(user) {
  const ids = new Set()
  ;(user?.purchasedCourses || []).forEach((id) => ids.add(id))
  ;(user?.studentProfile?.activeOnlineCourses || []).forEach((id) => ids.add(id))
  return [...ids]
}

export function getRemovedOnlineCourseIds(prevOnlineIds = [], nextOnlineIds = [], purchasedCourses = []) {
  const purchased = new Set(purchasedCourses || [])
  const nextSet = new Set((nextOnlineIds || []).filter(Boolean))
  return (prevOnlineIds || []).filter((id) => id && !nextSet.has(id) && !purchased.has(id))
}

export function buildCourseAccessForOnlineCourses(_prevAccess = {}, onlineCourseIds = [], courseFullAccess = {}) {
  const next = {}
  const ids = (onlineCourseIds || []).filter(Boolean)

  ids.forEach((courseId) => {
    const full = Boolean(courseFullAccess[courseId])
    const lessonIds = flattenCourseLessons(courseId).map((l) => l.lessonId)
    next[courseId] = {
      enabled: true,
      fullAccess: full,
      unlockedLessons: full ? lessonIds : [],
    }
  })

  return next
}
