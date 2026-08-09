import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'
import { scratchCurriculum } from '@/lib/scratchCurriculum'
import { minecraftCurriculum } from '@/lib/minecraftCurriculum'
import { createProgressEntry } from '@/lib/courseUtils'
import {
  canReadCourseProgress,
  canUpdateLessonProgress,
  hasStudentCourseAccess,
  isKnownCourseId,
  isLessonInCourse,
  ROBLOX_COURSE_ID,
  SCRATCH_COURSE_ID,
  MINECRAFT_COURSE_ID,
} from '@/lib/courseLessonAccess'
import { robloxCurriculum } from '@/lib/robloxCurriculum'
import { lessonContentMap } from '@/lib/lessonContentMap.uk'
import { checkPracticeOutputs } from '@/lib/practiceValidation'
import {
  lessonRequiresPractice,
  lessonRequiresQuiz,
  scoreLessonQuiz,
} from '@/lib/quizValidation'
import {
  migrateRobloxProgressDoc,
  ROBLOX_CURRICULUM_REVISION,
} from '@/lib/robloxProgressMigrate'

const ALLOWED_ACTIONS = new Set([
  'completeLesson',
  'completeQuiz',
  'completePracticeTask',
  'updateCurrentLesson',
])

function lessonPrerequisitesMet({ courseId, lessonId, progress, locale }) {
  const practiceTasks = Array.isArray(progress.completedPracticeTasks)
    ? progress.completedPracticeTasks
    : []

  if (lessonRequiresPractice(courseId, lessonId, locale) && !practiceTasks.includes(lessonId)) {
    return { ok: false, error: 'Complete the practice task first' }
  }

  if (lessonRequiresQuiz(courseId, lessonId, locale)) {
    const quizRecord = progress.completedQuizzes?.[lessonId]
    if (!quizRecord?.passed) {
      return { ok: false, error: 'Pass the quiz first' }
    }
  }

  return { ok: true }
}

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

    if (!courseId || !isKnownCourseId(courseId)) {
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

    let doc = progress
    if (courseId === ROBLOX_COURSE_ID) {
      const { progress: migrated, changed } = migrateRobloxProgressDoc(progress)
      if (changed) {
        await progressCollection.updateOne(
          { _id: progress._id },
          {
            $set: {
              completedLessons: migrated.completedLessons,
              completedPracticeTasks: migrated.completedPracticeTasks,
              completedQuizzes: migrated.completedQuizzes,
              currentLesson: migrated.currentLesson,
              overallProgress: migrated.overallProgress,
              robloxCurriculumRevision: ROBLOX_CURRICULUM_REVISION,
              updatedAt: new Date(),
            },
          }
        )
      }
      doc = migrated
    }

    const progressResponse = {
      userId: doc.userId.toString(),
      courseId: doc.courseId,
      enrolledAt: doc.enrolledAt,
      completedLessons: doc.completedLessons || [],
      completedQuizzes: doc.completedQuizzes || {},
      completedPracticeTasks: doc.completedPracticeTasks || [],
      currentModule: doc.currentModule || 0,
      currentLesson: doc.currentLesson || 0,
      overallProgress: doc.overallProgress || 0,
      certificates: doc.certificates || [],
      ...(courseId === ROBLOX_COURSE_ID
        ? { robloxCurriculumRevision: doc.robloxCurriculumRevision || ROBLOX_CURRICULUM_REVISION }
        : {}),
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
      quizAnswers,
      practiceOutput,
      practiceOutputs,
      locale = 'uk',
      action,
    } = body

    if (!courseId || !isKnownCourseId(courseId)) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    if (!action || !ALLOWED_ACTIONS.has(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    if (lessonId && !isLessonInCourse(courseId, lessonId)) {
      return NextResponse.json(
        { error: 'Invalid lesson for this course' },
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
    const shouldEnroll = hasStudentCourseAccess(user, courseId)

    let progress = await progressCollection.findOne({
      userId: userIdObj,
      courseId
    })

    if (!progress) {
      progress = await createProgressEntry(userIdObj, courseId, { enroll: shouldEnroll })
    } else if (shouldEnroll) {
      const { ensureUserEnrolled } = await import('@/lib/courseUtils')
      await ensureUserEnrolled(userIdObj, courseId)
    }

    if (courseId === ROBLOX_COURSE_ID && progress) {
      const { progress: migrated, changed } = migrateRobloxProgressDoc(progress)
      if (changed) {
        await progressCollection.updateOne(
          { _id: progress._id },
          {
            $set: {
              completedLessons: migrated.completedLessons,
              completedPracticeTasks: migrated.completedPracticeTasks,
              completedQuizzes: migrated.completedQuizzes,
              currentLesson: migrated.currentLesson,
              overallProgress: migrated.overallProgress,
              robloxCurriculumRevision: ROBLOX_CURRICULUM_REVISION,
              updatedAt: new Date(),
            },
          }
        )
        progress = { ...progress, ...migrated }
      }
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

    const update = { $set: { updatedAt: new Date() } }
    const addToSetOperations = {}

    if (action === 'completeLesson' && lessonId) {
      const prereq = lessonPrerequisitesMet({ courseId, lessonId, progress, locale })
      if (!prereq.ok) {
        return NextResponse.json({ error: prereq.error }, { status: 403 })
      }

      if (!progress.completedLessons || !progress.completedLessons.includes(lessonId)) {
        addToSetOperations.completedLessons = lessonId
      }
    }

    if (action === 'completeQuiz' && lessonId) {
      const practiceTasks = Array.isArray(progress.completedPracticeTasks)
        ? progress.completedPracticeTasks
        : []
      if (lessonRequiresPractice(courseId, lessonId, locale) && !practiceTasks.includes(lessonId)) {
        return NextResponse.json(
          { error: 'Complete the practice task first' },
          { status: 403 }
        )
      }

      const scored = scoreLessonQuiz({ courseId, lessonId, quizAnswers, locale })
      if (!scored) {
        return NextResponse.json(
          { error: 'Quiz not found for this lesson' },
          { status: 400 }
        )
      }

      update.$set[`completedQuizzes.${lessonId}`] = {
        score: scored.score,
        attempts: (progress.completedQuizzes?.[lessonId]?.attempts || 0) + 1,
        passed: scored.passed,
        lastAttempt: new Date(),
        answers: quizAnswers || {},
      }
    }

    if (action === 'completePracticeTask' && lessonId) {
      if (courseId !== ROBLOX_COURSE_ID) {
        const lesson = lessonContentMap[lessonId]
        const practiceTask = lesson?.practiceTask

        if (!practiceTask?.examples?.length) {
          return NextResponse.json(
            { error: 'Practice task not found for this lesson' },
            { status: 400 }
          )
        }

        const outputs = Array.isArray(practiceOutputs)
          ? practiceOutputs.map((o) => (typeof o === 'string' ? o : ''))
          : [typeof practiceOutput === 'string' ? practiceOutput : '']

        const validation = checkPracticeOutputs(outputs, practiceTask)

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

    if (Object.keys(addToSetOperations).length > 0) {
      update.$addToSet = addToSetOperations
    }

    const getTotalLessons = (id) => {
      let curriculum = pythonCurriculum
      if (id === 'web-development') curriculum = webDevCurriculum
      else if (id === ROBLOX_COURSE_ID) curriculum = robloxCurriculum
      else if (id === SCRATCH_COURSE_ID) curriculum = scratchCurriculum
      else if (id === MINECRAFT_COURSE_ID) curriculum = minecraftCurriculum
      return curriculum.modules.reduce((sum, m) => sum + m.lessons.length, 0)
    }

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
