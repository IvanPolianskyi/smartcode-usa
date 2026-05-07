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

export async function POST(request, { params }) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error

    const { receiptId } = await params
    if (!ObjectId.isValid(receiptId)) {
      return NextResponse.json({ error: 'Invalid receiptId' }, { status: 400 })
    }

    const paymentsCollection = await getCollection('payments')
    const usersCollection = await getCollection('users')
    const receiptObjectId = new ObjectId(receiptId)
    const receipt = await paymentsCollection.findOne({ _id: receiptObjectId, paymentMethod: 'receipt_upload' })

    if (!receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 })
    }
    if (receipt.approvalStatus === 'approved' || receipt.status === 'completed') {
      return NextResponse.json({ ok: true, alreadyApproved: true }, { status: 200 })
    }

    const creditedLessons = Number(receipt.creditedLessons || 0)
    const amount = Number(receipt.amount || 0)

    await paymentsCollection.updateOne(
      { _id: receiptObjectId },
      {
        $set: {
          status: 'completed',
          approvalStatus: 'approved',
          approvedAt: new Date(),
          approvedBy: guard.adminId,
          updatedAt: new Date(),
        },
      }
    )

    await usersCollection.updateOne(
      { _id: receipt.userId },
      {
        $inc: {
          'studentProfile.accountBalance': amount,
          'studentProfile.lessonCredits': creditedLessons,
        },
        $set: { updatedAt: new Date() },
      }
    )

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('Approve receipt POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

