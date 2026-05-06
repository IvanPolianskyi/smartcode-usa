import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'

export async function GET() {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({
        stats: {
          completed: 0,
          pending: 0,
          failed: 0,
          totalAmount: 0,
          creditedLessons: 0,
          accountBalance: 0,
          lessonCredits: 0,
        },
        payments: [],
      }, { status: 200 })
    }

    const paymentsCollection = await getCollection('payments')
    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    const payments = await paymentsCollection
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray()

    const completed = payments.filter((p) => p.status === 'completed').length
    const pending = payments.filter((p) => p.status === 'pending').length
    const failed = payments.filter((p) => p.status === 'failed').length
    const totalAmount = payments
      .filter((p) => p.status === 'completed')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0)
    const creditedLessons = payments
      .filter((p) => p.status === 'completed')
      .reduce((sum, p) => sum + Number(p.creditedLessons || 0), 0)

    return NextResponse.json(
      {
        stats: {
          completed,
          pending,
          failed,
          totalAmount,
          creditedLessons,
          accountBalance: Number(user?.studentProfile?.accountBalance || 0),
          lessonCredits: Number(user?.studentProfile?.lessonCredits || 0),
        },
        payments: payments.map((p) => ({
          id: p._id.toString(),
          courseId: p.courseId,
          amount: p.amount || 0,
          currency: p.currency || 'UAH',
          status: p.status || 'pending',
          createdAt: p.createdAt,
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Payment history error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
