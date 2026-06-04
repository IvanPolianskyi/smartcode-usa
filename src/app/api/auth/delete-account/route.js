import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser, removeAuthCookie } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'

export async function POST() {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })

    if (!user) {
      await removeAuthCookie()
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    if (user.role === 'admin') {
      return NextResponse.json(
        { error: 'Admin accounts cannot be deleted this way' },
        { status: 403 }
      )
    }

    const userObjectId = new ObjectId(userId)
    const progressCollection = await getCollection('userProgress')
    const paymentsCollection = await getCollection('payments')

    await Promise.all([
      progressCollection.deleteMany({ userId: userObjectId }),
      paymentsCollection.deleteMany({ userId: userObjectId }),
      usersCollection.deleteOne({ _id: userObjectId, role: { $ne: 'admin' } }),
    ])

    await removeAuthCookie()

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('Delete account error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
