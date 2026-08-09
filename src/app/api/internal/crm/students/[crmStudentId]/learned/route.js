import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { getCurriculum } from '@/lib/getCurriculum'
import { getCollection } from '@/lib/mongodb'

const COURSE_NAMES = {
  'python-developer-zero-to-junior': 'Python',
  'web-development': 'Створення сайтів',
  'roblox-studio': 'Roblox Studio',
  'unity-game-development': 'Unity',
  scratch: 'Scratch',
  'minecraft-education': 'Minecraft Education',
}

function flattenSyllabus(courseId) {
  try {
    const curriculum = getCurriculum(courseId, 'uk')
    const topics = []
    for (const mod of curriculum?.modules || []) {
      const moduleTitle = String(mod.title || '').trim()
      for (const lesson of mod.lessons || []) {
        const lessonId = String(lesson.lessonId || '').trim()
        const title = String(lesson.title || '').trim()
        if (!lessonId || !title) continue
        topics.push({
          lessonId,
          title,
          moduleTitle: moduleTitle || null,
        })
      }
    }
    return {
      courseId,
      courseTitle: String(curriculum?.title || COURSE_NAMES[courseId] || courseId),
      topics,
    }
  } catch {
    return {
      courseId,
      courseTitle: COURSE_NAMES[courseId] || courseId,
      topics: [],
    }
  }
}

function pickPreferredCourse(progressDocs, preferredCourseId) {
  if (!progressDocs.length) return null
  if (preferredCourseId) {
    const match = progressDocs.find((d) => d.courseId === preferredCourseId)
    if (match) return match
  }
  // Беремо курс з найбільшою кількістю пройдених уроків / прогресом.
  return [...progressDocs].sort((a, b) => {
    const ac = Array.isArray(a.completedLessons) ? a.completedLessons.length : 0
    const bc = Array.isArray(b.completedLessons) ? b.completedLessons.length : 0
    if (bc !== ac) return bc - ac
    return Number(b.overallProgress || 0) - Number(a.overallProgress || 0)
  })[0]
}

/**
 * GET /api/internal/crm/students/:crmStudentId/learned
 * Query: courseId?, heldLessons? (кількість проведених ІУ з CRM для оцінки тем)
 */
export async function GET(request, { params }) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError

  try {
    const { crmStudentId } = await params
    const crmId = String(crmStudentId || '').trim()
    if (!crmId) {
      return NextResponse.json({ error: 'crmStudentId required' }, { status: 400 })
    }

    const url = new URL(request.url)
    const preferredCourseId = String(url.searchParams.get('courseId') || '').trim() || null
    const smartcodeUserIdParam =
      String(url.searchParams.get('smartcodeUserId') || '').trim() || null
    const heldRaw = url.searchParams.get('heldLessons')
    const heldLessons = heldRaw != null && heldRaw !== ''
      ? Math.max(0, Math.min(200, parseInt(heldRaw, 10) || 0))
      : null

    const usersCollection = await getCollection('users')
    let user = await usersCollection.findOne({
      'studentProfile.crmStudentId': crmId,
    })
    if (!user && smartcodeUserIdParam && ObjectId.isValid(smartcodeUserIdParam)) {
      user = await usersCollection.findOne({ _id: new ObjectId(smartcodeUserIdParam) })
    }
    if (!user && ObjectId.isValid(crmId)) {
      user = await usersCollection.findOne({ _id: new ObjectId(crmId) })
    }
    let progressDocs = []
    if (user?._id) {
      const progressCollection = await getCollection('userProgress')
      progressDocs = await progressCollection
        .find(
          { userId: user._id },
          {
            projection: {
              courseId: 1,
              completedLessons: 1,
              overallProgress: 1,
              currentModule: 1,
              currentLesson: 1,
            },
          }
        )
        .toArray()
    }

    const preferred =
      preferredCourseId ||
      pickPreferredCourse(progressDocs, preferredCourseId)?.courseId ||
      null

    const progress = pickPreferredCourse(progressDocs, preferredCourseId || preferred)
    const courseId = String(
      progress?.courseId || preferredCourseId || preferred || ''
    ).trim()

    if (!courseId) {
      return NextResponse.json({
        ok: true,
        linked: Boolean(user?._id),
        smartcodeUserId: user?._id ? String(user._id) : null,
        courseId: null,
        courseName: null,
        courseTitle: null,
        source: 'none',
        heldLessons,
        completedCount: 0,
        overallProgress: null,
        topics: [],
        recentTopics: [],
      })
    }

    const syllabus = flattenSyllabus(courseId)
    const byId = new Map(syllabus.topics.map((t) => [t.lessonId, t]))

    const completedIds = Array.isArray(progress?.completedLessons)
      ? progress.completedLessons.map((id) => String(id))
      : []

    let topics = []
    let source = 'none'

    if (completedIds.length > 0) {
      source = 'lms'
      topics = completedIds
        .map((id) => byId.get(id) || { lessonId: id, title: id, moduleTitle: null })
        .filter(Boolean)
    } else if (heldLessons != null && heldLessons > 0 && syllabus.topics.length > 0) {
      // Немає відміток на платформі — орієнтовно за кількістю проведених уроків у CRM.
      source = 'estimated'
      topics = syllabus.topics.slice(0, heldLessons)
    }

    const overallProgress =
      progress && Number.isFinite(Number(progress.overallProgress))
        ? Number(progress.overallProgress)
        : syllabus.topics.length > 0 && topics.length > 0
          ? Math.round((topics.length / syllabus.topics.length) * 100)
          : null

    return NextResponse.json({
      ok: true,
      linked: Boolean(user?._id),
      smartcodeUserId: user?._id ? String(user._id) : null,
      courseId,
      courseName: COURSE_NAMES[courseId] || syllabus.courseTitle || courseId,
      courseTitle: syllabus.courseTitle,
      source,
      heldLessons,
      completedCount: topics.length,
      overallProgress,
      topics: topics.map((t) => ({
        lessonId: t.lessonId,
        title: t.title,
        moduleTitle: t.moduleTitle,
      })),
      // Останні теми зручніше показувати батькам першими в боті.
      recentTopics: topics.slice(-12).reverse(),
    })
  } catch (error) {
    console.error('CRM student learned:', error)
    return NextResponse.json(
      { error: String(error.message || error) },
      { status: 500 }
    )
  }
}
