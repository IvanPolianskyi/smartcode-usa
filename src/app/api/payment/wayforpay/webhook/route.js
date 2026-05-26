import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import {
  verifyWebhookSignature,
  buildWebhookResponseSignature,
} from '@/lib/wayforpay'
import { grantFullCourseAccess, grantEnLiveLessonAccess } from '@/lib/paymentGrants'

export async function POST(request) {
  try {
    const body = await request.json()

    if (!verifyWebhookSignature(body)) {
      console.error('WayForPay: invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const { orderReference, transactionStatus, amount, currency } = body
    const approved = transactionStatus === 'Approved'

    const paymentsCollection = await getCollection('payments')
    const payment = await paymentsCollection.findOne({ orderId: orderReference })

    if (!payment) {
      console.error('WayForPay: payment not found', orderReference)
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    await paymentsCollection.updateOne(
      { orderId: orderReference },
      {
        $set: {
          status: approved ? 'completed' : transactionStatus?.toLowerCase() || 'failed',
          paymentData: body,
          amount: Number(amount) || payment.amount,
          currency: currency || payment.currency,
          updatedAt: new Date(),
        },
      }
    )

    if (approved) {
      if (payment.userId) {
        if (payment.paymentType === 'full_course') {
          await grantFullCourseAccess(payment.userId, payment.courseId)
        } else if (payment.paymentType === 'live_lesson_en') {
          await grantEnLiveLessonAccess(payment.userId, payment.courseId, {
            lessonFormat: payment.lessonFormat,
            day: payment.scheduleDay,
            time: payment.scheduleTime,
          })
        } else if (payment.paymentType === 'lesson_topup') {
          const usersCollection = await getCollection('users')
          const creditedLessons = Number(
            payment.creditedLessons || Math.floor(Number(payment.amount) / Number(payment.lessonPrice || 1))
          )
          const paidAmount = Number(body.amount) || Number(payment.amount) || 0
          await usersCollection.updateOne(
            { _id: payment.userId },
            {
              $inc: {
                'studentProfile.lessonCredits': creditedLessons,
                'studentProfile.accountBalance': paidAmount,
              },
              $set: { updatedAt: new Date() },
            }
          )
        }
      }
    }

    const time = Math.floor(Date.now() / 1000)
    const status = 'accept'
    const signature = buildWebhookResponseSignature(orderReference, status, time)

    return NextResponse.json({
      orderReference,
      status,
      time,
      signature,
    })
  } catch (error) {
    console.error('WayForPay webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
