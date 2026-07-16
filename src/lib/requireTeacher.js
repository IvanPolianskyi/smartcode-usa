import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'

/**
 * Вчитель або адмін (для read API / teacher UI).
 * @returns {Promise<{ userId: string, user: object, isAdmin: boolean } | { error: NextResponse }>}
 */
export async function requireTeacher({ allowAdmin = true } = {}) {
  const userId = await getCurrentUser()
  if (!userId) {
    return {
      error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }),
    }
  }

  const usersCollection = await getCollection('users')
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
  const role = user?.role || ''
  const okTeacher = role === 'teacher'
  const okAdmin = allowAdmin && role === 'admin'

  if (!user || (!okTeacher && !okAdmin)) {
    return {
      error: NextResponse.json(
        { error: 'Access denied. Teacher role required.' },
        { status: 403 }
      ),
    }
  }

  return { userId, user, isAdmin: role === 'admin' }
}

export function getTeacherCrmStaffId(user) {
  return String(user?.teacherProfile?.crmStaffId || '').trim()
}
