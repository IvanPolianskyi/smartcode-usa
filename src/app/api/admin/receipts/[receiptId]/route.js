import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'

async function requireAdmin() {
  const userId = await getCurrentUser()
  if (!userId) return { error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }) }
  const usersCollection = await getCollection('users')
  const admin = await usersCollection.findOne({ _id: new ObjectId(userId) })
  if (!admin || admin.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 }) }
  }
  return { adminId: admin._id }
}

export async function PATCH(request, { params }) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error

    const { receiptId } = await params
    if (!ObjectId.isValid(receiptId)) {
      return NextResponse.json({ error: 'Invalid receiptId' }, { status: 400 })
    }

    const data = await request.json()
    const creditedLessons = parseInt(data.creditedLessons, 10)
    
    if (isNaN(creditedLessons) || creditedLessons < 0) {
      return NextResponse.json({ error: 'Invalid creditedLessons' }, { status: 400 })
    }

    const paymentsCollection = await getCollection('payments')
    
    const receipt = await paymentsCollection.findOne({ _id: new ObjectId(receiptId) })
    if (!receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 })
    }

    const updateResult = await paymentsCollection.updateOne(
      { _id: new ObjectId(receiptId) },
      { $set: { creditedLessons } }
    )

    if ((receipt.approvalStatus === 'approved' || receipt.status === 'completed') && creditedLessons !== (receipt.creditedLessons || 0)) {
      const diff = creditedLessons - (receipt.creditedLessons || 0);
      if (receipt.userId) {
        const usersCollection = await getCollection('users')
        await usersCollection.updateOne(
          { _id: receipt.userId },
          { $inc: { 'studentProfile.lessonCredits': diff } }
        )
      }
    }

    return NextResponse.json({ success: true, creditedLessons })
  } catch (error) {
    console.error('Admin receipt PATCH error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
