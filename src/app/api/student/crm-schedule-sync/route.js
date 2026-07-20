import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { maybePullCrmScheduleForStudent } from '@/lib/crmStudentSchedulePull'
import { toAuthUserResponse } from '@/lib/crmLmsSync'

/**
 * Фоновий sync розкладу з CRM для кабінету учня.
 * Не блокує GET /api/auth/me — клієнт викликає після першого render.
 */
export async function POST() {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    if (user.role === 'teacher' || user.role === 'admin') {
      return NextResponse.json({ ok: true, skipped: true, reason: 'not_student' })
    }

    const before = user.studentProfile?.crmScheduleSyncedAt || null
    const synced = await maybePullCrmScheduleForStudent(user, usersCollection)
    const after = synced?.studentProfile?.crmScheduleSyncedAt || null
    const changed = Boolean(after && after !== before)

    return NextResponse.json({
      ok: true,
      synced: changed || Boolean(after),
      crmScheduleSyncedAt: after,
      user: toAuthUserResponse({
        ...user,
        studentProfile: synced?.studentProfile || user.studentProfile,
      }),
    })
  } catch (error) {
    console.error('POST /api/student/crm-schedule-sync', error)
    return NextResponse.json(
      { error: error?.message || 'CRM schedule sync failed' },
      { status: 500 }
    )
  }
}
