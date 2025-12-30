import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'

// Get user progress for a course
export async function GET(request) {
  try {
    const userId = await getCurrentUser()

    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    const progressCollection = await getCollection('userProgress')
    const progress = await progressCollection.findOne({
      userId: new ObjectId(userId),
      courseId
    })

    if (!progress) {
      return NextResponse.json({ progress: null }, { status: 200 })
    }

    // Convert ObjectId to string
    const progressResponse = {
      userId: progress.userId.toString(),
      courseId: progress.courseId,
      enrolledAt: progress.enrolledAt,
      completedLessons: progress.completedLessons || [],
      completedQuizzes: progress.completedQuizzes || {},
      completedPracticeTasks: progress.completedPracticeTasks || [],
      currentModule: progress.currentModule || 0,
      currentLesson: progress.currentLesson || 0,
      overallProgress: progress.overallProgress || 0,
      certificates: progress.certificates || []
    }

    return NextResponse.json({ progress: progressResponse }, { status: 200 })
  } catch (error) {
    console.error('Get progress error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update user progress
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
    const { courseId, lessonId, quizScore, practiceCompleted, action } = body

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    const progressCollection = await getCollection('userProgress')
    const userIdObj = new ObjectId(userId)

    // Find or create progress
    let progress = await progressCollection.findOne({
      userId: userIdObj,
      courseId
    })

    if (!progress) {
      // Create new progress entry
      progress = {
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
      }
      await progressCollection.insertOne(progress)
    }

    // Update based on action
    const update = { $set: { updatedAt: new Date() } }

    if (action === 'completeLesson' && lessonId) {
      if (!progress.completedLessons.includes(lessonId)) {
        update.$push = { completedLessons: lessonId }
      }
    }

    if (action === 'completeQuiz' && lessonId && quizScore !== undefined) {
      update.$set = {
        ...update.$set,
        [`completedQuizzes.${lessonId}`]: {
          score: quizScore,
          attempts: (progress.completedQuizzes[lessonId]?.attempts || 0) + 1,
          passed: quizScore >= 60,
          lastAttempt: new Date()
        }
      }
    }

    if (action === 'completePractice' && lessonId) {
      if (!progress.completedPracticeTasks.includes(lessonId)) {
        update.$push = { completedPracticeTasks: lessonId }
      }
    }

    if (action === 'updateCurrentLesson' && lessonId) {
      update.$set.currentLesson = lessonId
    }

    // Calculate overall progress using actual course data
    const getTotalLessons = (courseId) => {
      let curriculum
      if (courseId === "web-development") {
        curriculum = webDevCurriculum
      } else {
        curriculum = pythonCurriculum
      }
      return curriculum.modules.reduce((sum, m) => sum + m.lessons.length, 0)
    }
    
    // Get updated completed lessons count after applying updates
    let updatedCompletedLessons = [...(progress.completedLessons || [])]
    if (action === 'completeLesson' && lessonId && !updatedCompletedLessons.includes(lessonId)) {
      updatedCompletedLessons.push(lessonId)
    }
    
    const totalLessons = getTotalLessons(courseId)
    const completedCount = updatedCompletedLessons.length
    const newProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

    update.$set.overallProgress = newProgress

    await progressCollection.updateOne(
      { userId: userIdObj, courseId },
      update
    )

    // Get updated progress
    const updatedProgress = await progressCollection.findOne({
      userId: userIdObj,
      courseId
    })

    const progressResponse = {
      userId: updatedProgress.userId.toString(),
      courseId: updatedProgress.courseId,
      enrolledAt: updatedProgress.enrolledAt,
      completedLessons: updatedProgress.completedLessons || [],
      completedQuizzes: updatedProgress.completedQuizzes || {},
      completedPracticeTasks: updatedProgress.completedPracticeTasks || [],
      currentModule: updatedProgress.currentModule || 0,
      currentLesson: updatedProgress.currentLesson || 0,
      overallProgress: updatedProgress.overallProgress || 0,
      certificates: updatedProgress.certificates || []
    }

    return NextResponse.json({ progress: progressResponse }, { status: 200 })
  } catch (error) {
    console.error('Update progress error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

