import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'

export async function GET(request) {
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

    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get('status') || 'pending'

    const paymentsCollection = await getCollection('payments')
    const query = {}
    if (statusFilter === 'pending') {
      query.status = 'pending'
    }

    const payments = await paymentsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(300)
      .toArray()

    const userIds = [...new Set(payments.map((item) => item.userId?.toString()).filter(Boolean))]
    const students = await usersCollection
      .find({ _id: { $in: userIds.map((id) => new ObjectId(id)) } })
      .project({ name: 1, email: 1 })
      .toArray()
    const studentsMap = new Map(students.map((s) => [s._id.toString(), s]))

    return NextResponse.json({
      payments: payments.map((item) => {
        const student = studentsMap.get(item.userId?.toString() || '')
        const approvalStatus = item.approvalStatus || (item.status === 'completed' ? 'approved' : 'pending')
        const paymentMethod = item.paymentMethod || 'unknown'
        return {
          id: item._id.toString(),
          studentName: student?.name || 'Без імені',
          studentEmail: student?.email || 'Н/Д',
          studentId: item.userId?.toString() || null,
          amount: Number(item.amount || 0),
          status: item.status || 'pending',
          approvalStatus,
          paymentMethod,
          canApprove: paymentMethod === 'receipt_upload' && approvalStatus !== 'approved' && item.status === 'pending',
          creditedLessons: Number(item.creditedLessons || 0),
          lessonPrice: Number(item.lessonPrice || 0),
          lessonFormat: item.lessonFormat || 'group',
          courseId: item.courseId || null,
          createdAt: item.createdAt,
          receipt: item.receipt || null,
        }
      }),
    }, { status: 200 })
  } catch (error) {
    console.error('Admin payments GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
