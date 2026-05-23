import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { syncStudentScheduleAccess } from '@/lib/syncStudentScheduleAccess'
import { maybePullCrmScheduleForStudent } from '@/lib/crmStudentSchedulePull'
import { isStudentDashboardReady, shouldPersistAccountReady } from '@/lib/studentAccountReady'

export async function GET() {
  try {
    const userId = await getCurrentUser()

    // 200 + user: null - звичайний стан «гість», без 401 (інакше DevTools шумить на кожній сторінці)
    if (!userId) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    // Get user from database
    const usersCollection = await getCollection('users')
    let user = await usersCollection.findOne({ _id: new ObjectId(userId) })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    user = await maybePullCrmScheduleForStudent(user, usersCollection)
    user = await syncStudentScheduleAccess(user, usersCollection)

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

    // Синхронізація: якщо є прогрес, але немає курсу в enrolledCourses, додати його
    const progressCollection = await getCollection('userProgress')
    const userProgresses = await progressCollection.find({ userId: new ObjectId(userId) }).toArray()
    const progressCourseIds = userProgresses.map(p => p.courseId)
    const currentEnrolledCourses = user.enrolledCourses || []
    
    // Знайти курси які є в прогресі, але немає в enrolledCourses
    const missingCourses = progressCourseIds.filter(courseId => !currentEnrolledCourses.includes(courseId))
    
    if (missingCourses.length > 0) {
      console.log('Syncing enrolledCourses: adding missing courses', missingCourses)
      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $addToSet: { enrolledCourses: { $each: missingCourses } },
          $set: { updatedAt: new Date() }
        }
      )
      // Оновити дані користувача
      const updatedUser = await usersCollection.findOne({ _id: new ObjectId(userId) })
      user.enrolledCourses = updatedUser.enrolledCourses || []
    }

    // Return user (without password)
    const baseProfile = user.studentProfile || {
      lessonFormat: 'group',
      regularSchedule: [],
      zoomLink: '',
      activeOnlineCourses: [],
      courseAccess: {},
      accountBalance: 0,
      lessonCredits: 0,
      scheduleSyncStartAt: null,
    }
    const userResponse = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role || 'user',
      studentProfile: {
        ...baseProfile,
        accountReady: isStudentDashboardReady(baseProfile),
      },
      purchasedCourses: user.purchasedCourses || [],
      enrolledCourses: user.enrolledCourses || [],
      createdAt: user.createdAt
    }

    return NextResponse.json({ user: userResponse }, { status: 200 })
  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

