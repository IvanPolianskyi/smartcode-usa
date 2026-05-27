import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'

export async function GET() {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const usersCollection = await getCollection('users')
    const admin = await usersCollection.findOne({ _id: new ObjectId(userId) })
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 })
    }

    const paymentsCollection = await getCollection('payments')
    const receipts = await paymentsCollection
      .find({ paymentMethod: 'receipt_upload' })
      .sort({ createdAt: -1 })
      .limit(300)
      .project({ 'receipt.dataUrl': 0 })
      .toArray()

    const userIds = [...new Set(receipts.map((item) => item.userId?.toString()).filter(Boolean))]
    const students = await usersCollection
      .find({ _id: { $in: userIds.map((id) => new ObjectId(id)) } })
      .project({ name: 1, email: 1 })
      .toArray()
    const studentsMap = new Map(students.map((s) => [s._id.toString(), s]))

    return NextResponse.json({
      receipts: receipts.map((item) => {
        const student = studentsMap.get(item.userId?.toString() || '')
        return {
          id: item._id.toString(),
          studentName: student?.name || 'Без імені',
          studentEmail: student?.email || 'Н/Д',
          amount: Number(item.amount || 0),
          status: item.status || 'pending',
          creditedLessons: Number(item.creditedLessons || 0),
          lessonPrice: Number(item.lessonPrice || 0),
          lessonFormat: item.lessonFormat || 'group',
          createdAt: item.createdAt,
          receipt: item.receipt ? { hasImage: true } : null,
        }
      }),
    }, { status: 200 })
  } catch (error) {
    console.error('Admin receipts GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

