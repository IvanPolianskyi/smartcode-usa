import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { loadUserWithAccess } from '@/lib/loadUser'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { createProgressEntry } from '@/lib/courseUtils'
import {
  canReadCourseProgress,
  canUpdateLessonProgress,
  flattenCourseLessons,
  hasStudentCourseAccess,
  isKnownCourseId,
  isLessonInCourse,
  ROBLOX_COURSE_ID,
} from '@/lib/courseLessonAccess'
import { getPythonLessonContent } from '@/lib/quizValidation'
import { checkPracticeOutputs } from '@/lib/practiceValidation'
import {
  getLessonInteractive,
  getLessonInteractives,
  lessonRequiresPractice,
  lessonRequiresQuiz,
  scoreLessonQuiz,
} from '@/lib/quizValidation'
import {
  awardKey,
  checkInteractiveSubmission,
  grantAchievements,
  normalizeGamification,
  serializeGamification,
  touchStreak,
  totalXp,
  XP_AWARDS,
} from '@/lib/lessonInteractiveXp'
import {
  migrateRobloxProgressDoc,
  ROBLOX_CURRICULUM_REVISION,
} from '@/lib/robloxProgressMigrate'

const ALLOWED_ACTIONS = new Set([
  'completeLesson',
  'completeQuiz',
  'completePracticeTask',
  'completeInteractive',
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

    const user = await loadUserWithAccess(userId)
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
      gamification: serializeGamification(doc.gamification),
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
      interactiveId,
      submission,
      hintsUsed,
      locale = 'en',
      action,
    } = body

    const contentLocale = locale === 'uk' ? 'uk' : 'en'

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

    const user = await loadUserWithAccess(userId)
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

    const lessonScopedActions = ['completeLesson', 'completeQuiz', 'completePracticeTask', 'completeInteractive', 'updateCurrentLesson']
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

    // Filled in by the action blocks below, consumed by the gamification pass.
    let quizResult = null
    let interactiveAward = null

    if (action === 'completeLesson' && lessonId) {
      const prereq = lessonPrerequisitesMet({
        courseId,
        lessonId,
        progress,
        locale: contentLocale,
      })
      if (!prereq.ok) {
        return NextResponse.json({ error: prereq.error }, { status: 403 })
      }

      if (!progress.completedLessons || !progress.completedLessons.includes(lessonId)) {
        addToSetOperations.completedLessons = lessonId
        update.$set[`lessonCompletedAt.${lessonId}`] = new Date()
      }
    }

    if (action === 'completeQuiz' && lessonId) {
      const practiceTasks = Array.isArray(progress.completedPracticeTasks)
        ? progress.completedPracticeTasks
        : []
      if (
        lessonRequiresPractice(courseId, lessonId, contentLocale) &&
        !practiceTasks.includes(lessonId)
      ) {
        return NextResponse.json(
          { error: 'Complete the practice task first' },
          { status: 403 }
        )
      }

      const scored = scoreLessonQuiz({
        courseId,
        lessonId,
        quizAnswers,
        locale: contentLocale,
      })
      if (!scored) {
        return NextResponse.json(
          { error: 'Quiz not found for this lesson' },
          { status: 400 }
        )
      }

      quizResult = scored
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
        const lesson = getPythonLessonContent(lessonId, contentLocale)
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

    if (action === 'completeInteractive') {
      if (!lessonId || !interactiveId) {
        return NextResponse.json(
          { error: 'Lesson and interactive are required' },
          { status: 400 }
        )
      }

      const interactive = getLessonInteractive(
        courseId,
        lessonId,
        interactiveId,
        contentLocale
      )
      if (!interactive) {
        return NextResponse.json(
          { error: 'Interactive not found for this lesson' },
          { status: 400 }
        )
      }

      // Scored against the lesson definition - the client's own verdict is
      // never trusted, only the raw submission it sends.
      const verdict = checkInteractiveSubmission(interactive, submission)
      if (!verdict.ok) {
        return NextResponse.json(
          { error: 'Incorrect answer', reason: verdict.reason },
          { status: 400 }
        )
      }

      interactiveAward = {
        key: awardKey('interactive', lessonId, `${interactive.type}:${interactive.id}`),
        xp: XP_AWARDS[interactive.type] || 0,
        // A first-try correct answer is what "mind reader" counts.
        flawless: Number(submission?.attempts) <= 1,
      }
    }

    if (action === 'updateCurrentLesson' && lessonId) {
      update.$set.currentLesson = lessonId
    }

    if (Object.keys(addToSetOperations).length > 0) {
      update.$addToSet = addToSetOperations
    }

    const getTotalLessons = (id) => {
      return flattenCourseLessons(id).length
    }

    let updatedCompletedLessons = [...(progress.completedLessons || [])]
    if (action === 'completeLesson' && lessonId && !updatedCompletedLessons.includes(lessonId)) {
      updatedCompletedLessons.push(lessonId)
    }

    const totalLessons = getTotalLessons(courseId)
    const completedCount = updatedCompletedLessons.length
    const newProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

    update.$set.overallProgress = newProgress

    /* ---------------------------------------------------------------------
     * Gamification. XP is recorded in an idempotent ledger keyed by action, so
     * replaying a request can never inflate a score, and the total is always
     * recomputed from the ledger rather than incremented in place.
     * ------------------------------------------------------------------- */
    const previousGamification = normalizeGamification(progress.gamification)
    const nextAwards = { ...previousGamification.awards }
    const xpBefore = totalXp(previousGamification)
    let flawless = previousGamification.flawless

    if (interactiveAward) {
      if (!nextAwards[interactiveAward.key]) {
        nextAwards[interactiveAward.key] = interactiveAward.xp
        if (interactiveAward.flawless) flawless += 1
      }
    }

    if (action === 'completePracticeTask' && lessonId) {
      nextAwards[awardKey('practice', lessonId)] = XP_AWARDS.practiceTask
      // Solving without opening a hint earns the "no safety net" bonus - but
      // only if no earlier attempt on this lesson already leaned on one.
      if (!hintsUsed && !previousGamification.awards[awardKey('practice', lessonId)]) {
        nextAwards[awardKey('practiceClean', lessonId)] = XP_AWARDS.practiceNoHints
      }
    }

    if (quizResult?.passed && lessonId) {
      nextAwards[awardKey('quiz', lessonId)] = XP_AWARDS.quizPassed
      if (quizResult.score === 100) {
        nextAwards[awardKey('quizPerfect', lessonId)] = XP_AWARDS.quizPerfectBonus
      }
    }

    if (action === 'completeLesson' && lessonId) {
      nextAwards[awardKey('lesson', lessonId)] = XP_AWARDS.lessonComplete
    }

    // Achievement predicates read the post-update picture, not the stale doc.
    const projectedProgress = {
      ...progress,
      completedLessons: updatedCompletedLessons,
      completedPracticeTasks:
        update.$set.completedPracticeTasks || progress.completedPracticeTasks || [],
      completedQuizzes: {
        ...(progress.completedQuizzes || {}),
        ...(quizResult && lessonId
          ? { [lessonId]: { score: quizResult.score, passed: quizResult.passed } }
          : {}),
      },
    }

    const { gamification: grantedGamification, unlocked } = grantAchievements({
      gamification: {
        ...previousGamification,
        awards: nextAwards,
        flawless,
        streak: touchStreak(previousGamification.streak),
      },
      progress: projectedProgress,
      lessonId,
      lessonInteractiveIds: lessonId
        ? getLessonInteractives(courseId, lessonId, contentLocale).map((i) => i.id)
        : [],
    })

    update.$set.gamification = grantedGamification
    const xpGained = Math.max(0, totalXp(grantedGamification) - xpBefore)

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
      certificates: updatedProgress.certificates || [],
      gamification: serializeGamification(updatedProgress.gamification),
    }

    return NextResponse.json(
      {
        progress: progressResponse,
        xpGained,
        unlockedAchievements: unlocked,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update progress error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
