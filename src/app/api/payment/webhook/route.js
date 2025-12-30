import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { verifySignature, decodeData } from '@/lib/liqpay'

/**
 * LiqPay webhook handler
 * This endpoint receives payment status updates from LiqPay
 */
export async function POST(request) {
  try {
    const formData = await request.formData()
    const data = formData.get('data')
    const signature = formData.get('signature')

    if (!data || !signature) {
      console.error('Missing data or signature in webhook')
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Verify signature
    if (!verifySignature(data, signature)) {
      console.error('Invalid signature in webhook')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Decode payment data
    const paymentData = decodeData(data)
    if (!paymentData) {
      return NextResponse.json(
        { error: 'Invalid payment data' },
        { status: 400 }
      )
    }

    const { order_id, status, amount, currency } = paymentData

    // Find payment record
    const paymentsCollection = await getCollection('payments')
    const payment = await paymentsCollection.findOne({ orderId: order_id })

    if (!payment) {
      console.error('Payment not found:', order_id)
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    // Update payment status
    await paymentsCollection.updateOne(
      { orderId: order_id },
      {
        $set: {
          status: status === 'success' ? 'completed' : status,
          paymentData: paymentData,
          updatedAt: new Date()
        }
      }
    )

    // If payment is successful, grant access to course
    if (status === 'success') {
      const usersCollection = await getCollection('users')
      
      // Add course to purchased courses
      await usersCollection.updateOne(
        { _id: payment.userId },
        {
          $addToSet: { 
            purchasedCourses: payment.courseId,
            enrolledCourses: payment.courseId
          },
          $set: { updatedAt: new Date() }
        }
      )

      // Create or update progress entry
      const progressCollection = await getCollection('userProgress')
      const existingProgress = await progressCollection.findOne({
        userId: payment.userId,
        courseId: payment.courseId
      })

      if (!existingProgress) {
        await progressCollection.insertOne({
          userId: payment.userId,
          courseId: payment.courseId,
          enrolledAt: new Date(),
          completedLessons: [],
          completedQuizzes: {},
          completedPracticeTasks: [],
          currentModule: 0,
          currentLesson: 0,
          overallProgress: 0,
          certificates: []
        })
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Also support GET for LiqPay redirects
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const data = searchParams.get('data')
    const signature = searchParams.get('signature')

    if (!data || !signature) {
      console.error('Missing data or signature in webhook GET')
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Create form data for processing
    const formData = new FormData()
    formData.append('data', data)
    formData.append('signature', signature)

    // Create a new request with form data
    const newRequest = new Request(request.url, {
      method: 'POST',
      body: formData
    })

    return POST(newRequest)
  } catch (error) {
    console.error('Webhook GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

