import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'
import { robloxCurriculum } from '@/lib/robloxCurriculum'

export const PYTHON_COURSE_ID = 'python-developer-zero-to-junior'
export const ROBLOX_COURSE_ID = 'roblox-studio'

/** LMS course pages. */
export const COURSE_PAGE_PATHS = {
  [PYTHON_COURSE_ID]: '/courses/python-developer-zero-to-junior',
  [ROBLOX_COURSE_ID]: '/courses/roblox-studio',
}

/** @deprecated use COURSE_PAGE_PATHS */
export const EN_COURSE_PAGE_PATHS = COURSE_PAGE_PATHS

export const KNOWN_COURSE_IDS = new Set([
  PYTHON_COURSE_ID,
  'web-development',
  ROBLOX_COURSE_ID,
])

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

export function isKnownCourseId(courseId) {
  return KNOWN_COURSE_IDS.has(courseId)
}

export function isLessonInCourse(courseId, lessonId) {
  if (!courseId || !lessonId) return false
  return flattenCourseLessons(courseId).some((l) => l.lessonId === lessonId)
}

export function hasActiveOnlineCourse(profile, courseId) {
  return (profile?.activeOnlineCourses || []).includes(courseId)
}

export function isTeacherRole(user) {
  return user?.role === 'teacher'
}

export function hasStudentCourseAccess(user, courseId) {
  if (!courseId) return false
  if (!user) return false
  if (user.role === 'admin' || user.role === 'teacher') return true
  if ((user.purchasedCourses || []).includes(courseId)) return true
  if ((user.enrolledCourses || []).includes(courseId)) return true
  if (hasActiveOnlineCourse(user.studentProfile, courseId)) return true
  const access = user.studentProfile?.courseAccess?.[courseId]
  if (access?.enabled === true || access?.fullAccess === true) return true
  return false
}

/** Читання/запис прогресу: оплачений/онлайн курс або Roblox-прев’ю (урок 1.1). */
export function canReadCourseProgress(user, courseId) {
  if (!user || !courseId || !isKnownCourseId(courseId)) return false
  if (hasStudentCourseAccess(user, courseId)) return true
  if (courseId === ROBLOX_COURSE_ID) return true
  return false
}

/** Запис прогресу по уроку — лише якщо урок відкритий (прев’ю, покупка, онлайн-група). */
export function canUpdateLessonProgress(user, courseId, lessonId, progress = null) {
  if (!user || !courseId || !lessonId) return false
  if (!isKnownCourseId(courseId) || !isLessonInCourse(courseId, lessonId)) return false
  if (user.role === 'admin' || user.role === 'teacher') return true

  const isPurchased = (user.purchasedCourses || []).includes(courseId)
  if (isPurchased) return true

  const unlocked = getUnlockedLessonSet({
    courseId,
    profile: user.studentProfile,
    progress,
    isAdmin: user.role === 'admin',
    isTeacher: user.role === 'teacher',
    isPurchased,
    isEnrolled: Boolean(progress),
  })

  return unlocked.has(lessonId)
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
  isTeacher = false,
  isPurchased = false,
  isEnrolled = false,
}) {
  const allLessons = flattenCourseLessons(courseId)
  const allIds = allLessons.map((l) => l.lessonId)
  if (allIds.length === 0) return new Set()

  const freePreview = new Set(
    courseId === ROBLOX_COURSE_ID ? ['lesson-roblox-1-1'] : []
  )

  if (isAdmin || isTeacher || isPurchased) {
    return new Set(allIds)
  }

  if (isCourseFullAccess(profile, courseId)) {
    return new Set(allIds)
  }

  const hasOnline =
    hasActiveOnlineCourse(profile, courseId) ||
    profile?.courseAccess?.[courseId]?.enabled === true

  const manualUnlocked = new Set(
    (profile?.courseAccess?.[courseId]?.unlockedLessons || []).filter((id) =>
      allIds.includes(id)
    )
  )

  if (!hasOnline) {
    return new Set([...freePreview, ...manualUnlocked])
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
  for (const id of manualUnlocked) {
    unlocked.add(id)
  }
  return unlocked
}

export function isLessonUnlockedInCourse(lessonId, ctx) {
  return getUnlockedLessonSet(ctx).has(lessonId)
}

/** Курси, до яких учень має доступ у кабінеті (CRM онлайн + гранти). */
export function getStudentAccessibleCourseIds(user) {
  if (user?.role === 'admin' || user?.role === 'teacher') {
    return [...KNOWN_COURSE_IDS]
  }
  const ids = new Set()
  ;(user?.purchasedCourses || []).forEach((id) => ids.add(id))
  ;(user?.enrolledCourses || []).forEach((id) => ids.add(id))
  ;(user?.studentProfile?.activeOnlineCourses || []).forEach((id) => ids.add(id))
  const accessMap = user?.studentProfile?.courseAccess || {}
  Object.keys(accessMap).forEach((id) => {
    if (accessMap[id]?.enabled || accessMap[id]?.fullAccess) ids.add(id)
  })
  return [...ids].filter((id) => KNOWN_COURSE_IDS.has(id) || Boolean(id))
}

/** CTA на сторінку курсу (самостійна купівля прибрана). */
export function getCoursePageHref(courseId) {
  return COURSE_PAGE_PATHS[courseId] || `/courses/${courseId}`
}

/** @deprecated use getCoursePageHref */
export function getEnHomeCourseHref(courseId) {
  return getCoursePageHref(courseId)
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
