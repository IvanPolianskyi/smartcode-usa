/**
 * Чи учень уже налаштований менеджером (не показувати «чекайте…»).
 * accountReady === false лишається лише для нових реєстрацій без курсів/групи.
 */
export function isStudentDashboardReady(profile) {
  if (!profile || typeof profile !== 'object') return true
  if (profile.accountReady === true) return true
  if (profile.accountReady !== false) return true

  const onlineCourses = Array.isArray(profile.activeOnlineCourses)
    ? profile.activeOnlineCourses.filter(Boolean)
    : []
  if (onlineCourses.length > 0) return true

  const courseAccess = profile.courseAccess || {}
  for (const courseId of Object.keys(courseAccess)) {
    const entry = courseAccess[courseId]
    if (!entry || entry.enabled === false) continue
    const unlocked = Array.isArray(entry.unlockedLessons) ? entry.unlockedLessons : []
    if (unlocked.length > 0 || entry.enabled === true) return true
    if (onlineCourses.includes(courseId)) return true
  }

  const schedule = Array.isArray(profile.regularSchedule) ? profile.regularSchedule : []
  if (schedule.some((s) => s?.day)) return true

  if (Number(profile.lessonCredits || 0) > 0) return true

  return false
}

export function shouldPersistAccountReady(profile) {
  return profile?.accountReady === false && isStudentDashboardReady(profile)
}
