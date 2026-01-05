import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { generatePaymentLink } from '@/lib/liqpay'
import { getCoursePrice } from '@/lib/coursePrices'

/**
 * Create payment link for course purchase
 */
export async function POST(request) {
  try {
    const userId = await getCurrentUser()

    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { courseId } = body

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    const userIdObj = new ObjectId(userId)
    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: userIdObj })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Admin has access to all courses
    if (user.role === 'admin') {
      return NextResponse.json(
        { error: 'Admin has access to all courses' },
        { status: 400 }
      )
    }

    // Check if already purchased
    if ((user.purchasedCourses || []).includes(courseId)) {
      return NextResponse.json(
        { error: 'Course already purchased' },
        { status: 400 }
      )
    }

    // Get course price
    const courseInfo = getCoursePrice(courseId)
    if (!courseInfo || courseInfo.price === 0) {
      return NextResponse.json(
        { error: 'Course price not configured' },
        { status: 400 }
      )
    }

    // Generate unique order ID
    const orderId = `course_${courseId}_${userId}_${Date.now()}`

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000'

    // Create payment link
    const paymentLink = generatePaymentLink({
      orderId,
      amount: courseInfo.price,
      description: `Оплата курсу: ${courseInfo.name}`,
      resultUrl: `${baseUrl}/payment/success?orderId=${orderId}`,
      serverUrl: `${baseUrl}/api/payment/webhook`,
      currency: courseInfo.currency
    })

    // Create pending payment record
    const paymentsCollection = await getCollection('payments')
    await paymentsCollection.insertOne({
      userId: userIdObj,
      courseId,
      orderId,
      amount: courseInfo.price,
      currency: courseInfo.currency,
      status: 'pending',
      paymentData: {
        data: paymentLink.data,
        signature: paymentLink.signature
      },
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return NextResponse.json({
      paymentUrl: paymentLink.url,
      data: paymentLink.data,
      signature: paymentLink.signature,
      orderId
    }, { status: 200 })
  } catch (error) {
    console.error('Create payment error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
















