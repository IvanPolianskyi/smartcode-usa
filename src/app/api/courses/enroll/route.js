import { NextResponse } from 'next/server'
import { loadUserWithAccess } from '@/lib/loadUser'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { createProgressEntry, ensureUserEnrolled } from '@/lib/courseUtils'
import { hasStudentCourseAccess } from '@/lib/courseLessonAccess'

export async function POST(request) {
  try {
    const userId = await getCurrentUser()

    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { courseId } = body

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    const userIdObj = new ObjectId(userId)
    const user = await loadUserWithAccess(userIdObj)
    if (!user || !hasStudentCourseAccess(user, courseId)) {
      return NextResponse.json(
        { error: 'No access to this course' },
        { status: 403 }
      )
    }

    // Перевірити чи вже є прогрес
    const progressCollection = await getCollection('userProgress')
    const existingProgress = await progressCollection.findOne({
      userId: userIdObj,
      courseId
    })

    if (!existingProgress) {
      // Створити прогрес (також автоматично додає курс до enrolledCourses)
      await createProgressEntry(userIdObj, courseId)
    } else {
      // Якщо прогрес вже є, просто додати курс до enrolledCourses (на випадок якщо його там немає)
      await ensureUserEnrolled(userIdObj, courseId)
    }

    return NextResponse.json(
      { message: 'Successfully enrolled in course' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Enroll error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



