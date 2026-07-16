import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { getCollection } from '@/lib/mongodb'

/**
 * Aggregate Completion Rate for CRM-linked LMS users.
 * Completion = average overallProgress across userProgress for linked students.
 */
export async function GET(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError

  try {
    const usersCollection = await getCollection('users')
    const linkedUsers = await usersCollection
      .find(
        {
          'studentProfile.crmStudentId': { $exists: true, $nin: [null, ''] },
        },
        { projection: { _id: 1 } }
      )
      .toArray()

    const linkedIds = linkedUsers.map((u) => u._id)
    if (linkedIds.length === 0) {
      return NextResponse.json({
        completion_rate: null,
        linked_students: 0,
        students_with_progress: 0,
        note: 'Немає привʼязаних LMS-учнів.',
      })
    }

    const progressCollection = await getCollection('userProgress')
    const progressDocs = await progressCollection
      .find(
        { userId: { $in: linkedIds } },
        { projection: { userId: 1, overallProgress: 1, completedLessons: 1 } }
      )
      .toArray()

    if (progressDocs.length === 0) {
      return NextResponse.json({
        completion_rate: 0,
        linked_students: linkedIds.length,
        students_with_progress: 0,
        note: 'У привʼязаних учнів ще немає записів прогресу.',
      })
    }

    // Один учень може мати кілька курсів — беремо max overallProgress на userId
    const byUser = new Map()
    for (const doc of progressDocs) {
      const uid = String(doc.userId)
      const p = Number(doc.overallProgress)
      const fallback =
        Array.isArray(doc.completedLessons) && doc.completedLessons.length > 0
          ? Math.min(100, doc.completedLessons.length * 2)
          : 0
      const score = Number.isFinite(p) ? p : fallback
      const prev = byUser.get(uid)
      if (prev == null || score > prev) byUser.set(uid, score)
    }

    const scores = [...byUser.values()]
    const avg =
      scores.length > 0
        ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
        : 0

    return NextResponse.json({
      completion_rate: avg,
      linked_students: linkedIds.length,
      students_with_progress: byUser.size,
      note: null,
    })
  } catch (error) {
    console.error('CRM completion analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to compute completion analytics' },
      { status: 500 }
    )
  }
}
