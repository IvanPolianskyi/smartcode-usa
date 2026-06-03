import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { syncStudentScheduleAccess } from '@/lib/syncStudentScheduleAccess'
import { getStudentAccessibleCourseIds } from '@/lib/courseLessonAccess'
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
    try {
      user = await maybePullCrmScheduleForStudent(user, usersCollection)
    } catch (crmErr) {
      console.error('CRM schedule auto-pull failed:', crmErr)
    }
    try {
      user = await syncStudentScheduleAccess(user, usersCollection)
    } catch (syncErr) {
      console.error('syncStudentScheduleAccess failed:', syncErr)
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

    try {
      if (baseProfile.regularSchedule && baseProfile.regularSchedule.length > 0) {
        const slotsCollection = await getCollection('availableSlots')
        
        // Find any slot that matches the day/time in the student's schedule
        const scheduleQueries = baseProfile.regularSchedule.map(item => ({
          day: item.day,
          time: item.time
        }))

        const matchingSlots = await slotsCollection.find({ 
          $or: scheduleQueries
        }).toArray()

        // Give priority to slots specifically booked by this user, or just matching day/time
        baseProfile.regularSchedule = baseProfile.regularSchedule.map(item => {
          const slotsForThisTime = matchingSlots.filter(s => s.day === item.day && s.time === item.time)
          
          let bestSlot = slotsForThisTime.find(s => 
            (s.bookedBy && s.bookedBy.toString() === userId.toString()) || 
            s.bookedBy === user.email
          )
          
          if (!bestSlot) {
            bestSlot = slotsForThisTime.find(s => s.zoomLink) // just grab any that has a zoom link
          }

          return {
            ...item,
            zoomLink: bestSlot?.zoomLink || null
          }
        })
      }
    } catch (err) {
      console.error('Error fetching booked slots for zoom links:', err)
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

