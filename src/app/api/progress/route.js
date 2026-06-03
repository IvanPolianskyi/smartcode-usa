import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'
import { createProgressEntry } from '@/lib/courseUtils'
import {
  canReadCourseProgress,
  canUpdateLessonProgress,
} from '@/lib/courseLessonAccess'
import { robloxCurriculum } from '@/lib/robloxCurriculum'
import { lessonContentMap as lessonContentMapUk } from '@/lib/lessonContentMap.uk'
import { lessonContentMap as lessonContentMapEn } from '@/lib/lessonContentMap.en'
import { checkPracticeOutput } from '@/lib/practiceValidation'

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

    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    if (!user || !canReadCourseProgress(user, courseId)) {
      return NextResponse.json({ progress: null }, { status: 200 })
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
    const {
      courseId,
      lessonId,
      quizScore,
      quizAnswers,
      practiceCompleted,
      practiceOutput,
      locale,
      action,
    } = body

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    if (!canReadCourseProgress(user, courseId)) {
      return NextResponse.json(
        { error: 'No access to this course' },
        { status: 403 }
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
      // Create new progress entry (також автоматично додає курс до enrolledCourses)
      console.log('Creating new progress entry for user:', userIdObj.toString(), 'course:', courseId)
      progress = await createProgressEntry(userIdObj, courseId)
      console.log('Progress entry created, enrolledCourses should be updated')
    } else {
      // Якщо прогрес вже існує, переконатися що курс додано до enrolledCourses
      // (на випадок якщо прогрес був створений до додавання цієї логіки)
      const { ensureUserEnrolled } = await import('@/lib/courseUtils')
      const enrollResult = await ensureUserEnrolled(userIdObj, courseId)
      console.log('Ensured user enrolled (existing progress):', enrollResult.modifiedCount > 0 ? 'updated' : 'already enrolled')
    }

    const lessonScopedActions = ['completeLesson', 'completeQuiz', 'completePracticeTask', 'updateCurrentLesson']
    if (lessonScopedActions.includes(action) && lessonId) {
      if (!canUpdateLessonProgress(user, courseId, lessonId, progress)) {
        return NextResponse.json(
          { error: 'Lesson is locked' },
          { status: 403 }
        )
      }
    }

    // Update based on action
    const update = { $set: { updatedAt: new Date() } }
    const addToSetOperations = {}

    if (action === 'completeLesson' && lessonId) {
      if (!progress.completedLessons || !progress.completedLessons.includes(lessonId)) {
        addToSetOperations.completedLessons = lessonId
      }
    }

    if (action === 'completeQuiz' && lessonId && quizScore !== undefined) {
      update.$set[`completedQuizzes.${lessonId}`] = {
        score: quizScore,
        attempts: (progress.completedQuizzes?.[lessonId]?.attempts || 0) + 1,
        passed: quizScore >= 60,
        lastAttempt: new Date(),
        answers: quizAnswers || {} // Зберігаємо відповіді
      }
    }

    if (action === 'completePracticeTask' && lessonId) {
      if (courseId !== 'roblox-studio') {
        const lessonMap = locale === 'en' ? lessonContentMapEn : lessonContentMapUk
        const lesson = lessonMap[lessonId]
        const practiceTask = lesson?.practiceTask

        if (!practiceTask?.examples?.length) {
          return NextResponse.json(
            { error: 'Practice task not found for this lesson' },
            { status: 400 }
          )
        }

        const validation = checkPracticeOutput(
          typeof practiceOutput === 'string' ? practiceOutput : '',
          practiceTask
        )

        if (!validation.isCorrect) {
          return NextResponse.json(
            { error: 'Practice output does not match the task requirements' },
            { status: 400 }
          )
        }
      }

      const practiceTasks = Array.isArray(progress.completedPracticeTasks)
        ? progress.completedPracticeTasks
        : []
      if (!practiceTasks.includes(lessonId)) {
        update.$set.completedPracticeTasks = [...practiceTasks, lessonId]
      }
    }

    if (action === 'updateCurrentLesson' && lessonId) {
      update.$set.currentLesson = lessonId
    }

    // Add $addToSet operations if any (prevents duplicates)
    if (Object.keys(addToSetOperations).length > 0) {
      update.$addToSet = addToSetOperations
    }

    // Calculate overall progress using actual course data
    const getTotalLessons = (courseId) => {
      let curriculum = pythonCurriculum
      if (courseId === 'web-development') curriculum = webDevCurriculum
      else if (courseId === 'roblox-studio') curriculum = robloxCurriculum
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

    // Виконуємо оновлення
    const updateResult = await progressCollection.updateOne(
      { userId: userIdObj, courseId },
      update
    )

    // Get updated progress
    const updatedProgress = await progressCollection.findOne({
      userId: userIdObj,
      courseId
    })

    // Логування для діагностики
    console.log('Progress update:', {
      action,
      lessonId,
      quizScore,
      updateResult: updateResult.modifiedCount,
      completedLessons: updatedProgress?.completedLessons?.length || 0,
      completedQuizzes: Object.keys(updatedProgress?.completedQuizzes || {}).length
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

