import { buildCourseAccessForOnlineCourses } from '@/lib/courseLessonAccess'

/**
 * Підтримує enabled для активних онлайн-курсів без ручного відкриття уроків за розкладом.
 */
export async function syncStudentScheduleAccess(user, usersCollection) {
  if (!user || user.role === 'admin') return user

  const profile = user.studentProfile || {}
  const activeOnlineCourses = Array.isArray(profile.activeOnlineCourses) ? profile.activeOnlineCourses : []
  if (activeOnlineCourses.length === 0) return user

  const fullAccessMap = {}
  activeOnlineCourses.forEach((courseId) => {
    if (profile.courseAccess?.[courseId]?.fullAccess === true) {
      fullAccessMap[courseId] = true
    }
  })

  const courseAccess = buildCourseAccessForOnlineCourses(
    profile.courseAccess || {},
    activeOnlineCourses,
    fullAccessMap
  )

  const changed =
    JSON.stringify(profile.courseAccess || {}) !== JSON.stringify(courseAccess)

  if (!changed) return user

  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        'studentProfile.courseAccess': courseAccess,
        updatedAt: new Date(),
      },
      $addToSet: {
        enrolledCourses: { $each: activeOnlineCourses },
      },
    }
  )

  return {
    ...user,
    studentProfile: {
      ...profile,
      courseAccess,
      activeOnlineCourses,
    },
  }
}
