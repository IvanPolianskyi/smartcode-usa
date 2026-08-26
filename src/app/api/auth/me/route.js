import { NextResponse } from 'next/server'
import { getEntitlement } from '@/lib/entitlements'
import { getCurrentUser, issueAuthSession } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { getStudentAccessibleCourseIds, KNOWN_COURSE_IDS, buildCourseDripStartedAt } from '@/lib/courseLessonAccess'
import { isStudentDashboardReady, shouldPersistAccountReady } from '@/lib/studentAccountReady'
import { toAuthUserResponse } from '@/lib/authUserResponse'

export async function GET() {
  try {
    const userId = await getCurrentUser()

    // 200 + user: null - звичайний стан «гість», без 401 (інакше DevTools шумить на кожній сторінці)
    if (!userId) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    // Sliding session: кожен візит подовжує cookie/JWT, щоб учні не вилітали з акаунта.
    try {
      await issueAuthSession(userId)
    } catch (sessionErr) {
      console.error('Auth session refresh failed:', sessionErr)
    }

    const usersCollection = await getCollection('users')
    let user = await usersCollection.findOne({ _id: new ObjectId(userId) })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const profileAfterSync = user.studentProfile || {}
    if (shouldPersistAccountReady(profileAfterSync)) {
      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            'studentProfile.accountReady': true,
            updatedAt: new Date(),
          },
        }
      )
      user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    }

    const progressCollection = await getCollection('userProgress')
    const entitlement = await getEntitlement(userId).catch(() => null)
    const subscribedCourseIds =
      user.role === 'admin' || user.role === 'teacher'
        ? [...KNOWN_COURSE_IDS]
        : entitlement?.courseIds || []
    user.subscribedCourseIds = subscribedCourseIds
    user.subscriptionActive =
      user.role === 'admin' || user.role === 'teacher' || subscribedCourseIds.length > 0
    user.courseDripStartedAt =
      user.role === 'admin' || user.role === 'teacher'
        ? {}
        : buildCourseDripStartedAt(entitlement?.subscriptions || [])
    const allowedCourseIds = new Set(getStudentAccessibleCourseIds(user))
    let currentEnrolledCourses = user.enrolledCourses || []

    const staleEnrolled = currentEnrolledCourses.filter((id) => !allowedCourseIds.has(id))
    if (staleEnrolled.length > 0) {
      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $pull: { enrolledCourses: { $in: staleEnrolled } },
          $set: { updatedAt: new Date() },
        }
      )
      currentEnrolledCourses = currentEnrolledCourses.filter((id) => allowedCourseIds.has(id))
      user.enrolledCourses = currentEnrolledCourses
    }

    const userProgresses = await progressCollection
      .find({ userId: new ObjectId(userId) })
      .toArray()
    const progressCourseIds = userProgresses.map((p) => p.courseId)
    const orphanProgress = progressCourseIds.filter(
      (id) => !allowedCourseIds.has(id) && id !== 'roblox-studio'
    )
    if (orphanProgress.length > 0) {
      await progressCollection.deleteMany({
        userId: new ObjectId(userId),
        courseId: { $in: orphanProgress },
      })
    }

    const missingCourses = progressCourseIds.filter(
      (courseId) =>
        allowedCourseIds.has(courseId) && !currentEnrolledCourses.includes(courseId)
    )
    if (missingCourses.length > 0) {
      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $addToSet: { enrolledCourses: { $each: missingCourses } },
          $set: { updatedAt: new Date() },
        }
      )
      const updatedUser = await usersCollection.findOne({ _id: new ObjectId(userId) })
      user.enrolledCourses = updatedUser.enrolledCourses || []
    }

    const baseProfile = user.studentProfile || {
      regularSchedule: [],
      zoomLink: '',
      activeOnlineCourses: [],
      courseAccess: {},
      accountBalance: 0,
      lessonCredits: 0,
      scheduleSyncStartAt: null,
    }

    const userForClient = {
      ...user,
      studentProfile: {
        ...baseProfile,
        accountReady: isStudentDashboardReady(baseProfile),
      },
    }

    return NextResponse.json({ user: toAuthUserResponse(userForClient) }, { status: 200 })
  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
