import {
  buildCourseAccessForOnlineCourses,
  getStudentAccessibleCourseIds,
  ROBLOX_COURSE_ID,
} from '@/lib/courseLessonAccess'
import { getCollection } from '@/lib/mongodb'

function buildNextEnrolledCourses(user, activeOnlineCourses, allowed) {
  const enrolled = user.enrolledCourses || []
  const nextEnrolled = enrolled.filter((id) => allowed.has(id))
  for (const id of activeOnlineCourses) {
    if (!nextEnrolled.includes(id)) nextEnrolled.push(id)
  }
  return nextEnrolled
}

function enrolledListsEqual(a, b) {
  if (a.length !== b.length) return false
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  return sortedA.every((id, i) => id === sortedB[i])
}

/**
 * Підтримує courseAccess для активних онлайн-курсів і прибирає застарілі записи enrolledCourses.
 */
export async function syncStudentScheduleAccess(user, usersCollection) {
  if (!user || user.role === 'admin') return user

  const profile = user.studentProfile || {}
  const activeOnlineCourses = Array.isArray(profile.activeOnlineCourses)
    ? profile.activeOnlineCourses
    : []
  const allowed = new Set(getStudentAccessibleCourseIds(user))

  const fullAccessMap = {}
  activeOnlineCourses.forEach((courseId) => {
    if (profile.courseAccess?.[courseId]?.fullAccess === true) {
      fullAccessMap[courseId] = true
    }
  })

  const courseAccess = buildCourseAccessForOnlineCourses(
    {},
    activeOnlineCourses,
    fullAccessMap
  )

  const enrolled = user.enrolledCourses || []
  const nextEnrolled = buildNextEnrolledCourses(user, activeOnlineCourses, allowed)
  const courseAccessChanged =
    JSON.stringify(profile.courseAccess || {}) !== JSON.stringify(courseAccess)
  const enrolledChanged = !enrolledListsEqual(enrolled, nextEnrolled)

  const progressCollection = await getCollection('userProgress')
  const progressRows = await progressCollection
    .find({ userId: user._id }, { projection: { courseId: 1 } })
    .toArray()
  const orphanProgressIds = progressRows
    .map((row) => row.courseId)
    .filter((id) => id && !allowed.has(id) && id !== ROBLOX_COURSE_ID)

  if (orphanProgressIds.length > 0) {
    await progressCollection.deleteMany({
      userId: user._id,
      courseId: { $in: orphanProgressIds },
    })
  }

  if (!courseAccessChanged && !enrolledChanged) {
    return user
  }

  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        'studentProfile.courseAccess': courseAccess,
        enrolledCourses: nextEnrolled,
        updatedAt: new Date(),
      },
    }
  )

  return {
    ...user,
    enrolledCourses: nextEnrolled,
    studentProfile: {
      ...profile,
      courseAccess,
      activeOnlineCourses,
    },
  }
}
