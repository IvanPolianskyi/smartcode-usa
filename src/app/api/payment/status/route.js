import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

/**
 * Check payment status by orderId
 */
export async function GET(request) {
  try {
    const userId = await getCurrentUser()

    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const paymentsCollection = await getCollection('payments')
    const payment = await paymentsCollection.findOne({ orderId })

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    // Verify payment belongs to user
    if (payment.userId.toString() !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const isPurchased = payment.status === 'completed'

    return NextResponse.json({
      orderId: payment.orderId,
      status: payment.status,
      purchased: isPurchased,
      courseId: payment.courseId,
      amount: payment.amount,
      currency: payment.currency
    }, { status: 200 })
  } catch (error) {
    console.error('Check payment status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}












