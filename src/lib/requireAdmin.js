import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'

/**
 * @returns {Promise<{ userId: string, admin: object } | { error: NextResponse }>}
 */
export async function requireAdmin() {
  const userId = await getCurrentUser()
  if (!userId) {
    return {
      error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }),
    }
  }

  const usersCollection = await getCollection('users')
  const admin = await usersCollection.findOne({ _id: new ObjectId(userId) })
  if (!admin || admin.role !== 'admin') {
    return {
      error: NextResponse.json(
        { error: 'Access denied. Admin role required.' },
        { status: 403 }
      ),
    }
  }

  return { userId, admin }
}
