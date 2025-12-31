import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

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

    // Add course to user's enrolled courses
    const usersCollection = await getCollection('users')
    await usersCollection.updateOne(
      { _id: userIdObj },
      { 
        $addToSet: { enrolledCourses: courseId },
        $set: { updatedAt: new Date() }
      }
    )

    // Create progress entry
    const progressCollection = await getCollection('userProgress')
    const existingProgress = await progressCollection.findOne({
      userId: userIdObj,
      courseId
    })

    if (!existingProgress) {
      await progressCollection.insertOne({
        userId: userIdObj,
        courseId,
        enrolledAt: new Date(),
        completedLessons: [],
        completedQuizzes: {},
        completedPracticeTasks: [],
        currentModule: 0,
        currentLesson: 0,
        overallProgress: 0,
        certificates: []
      })
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


