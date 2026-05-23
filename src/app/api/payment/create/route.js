import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { generatePaymentLink } from '@/lib/liqpay'
import { createInvoice } from '@/lib/wayforpay'
import { getCoursePrice } from '@/lib/coursePrices'
import { paymentDescription } from '@/lib/localeStrings'

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
    const { courseId, locale = 'uk' } = body

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

    const courseInfo = getCoursePrice(courseId, locale)
    if (!courseInfo || courseInfo.price === 0 || courseInfo.purchasable === false) {
      return NextResponse.json(
        { error: 'Course price not configured or not available for purchase' },
        { status: 400 }
      )
    }

    const orderId = `course_${courseId}_${userId}_${Date.now()}`
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

    const paymentsCollection = await getCollection('payments')

    if (courseInfo.paymentProvider === 'wayforpay') {
      const productName = courseInfo.nameEn || courseInfo.name
      const { invoiceUrl } = await createInvoice({
        orderReference: orderId,
        amount: courseInfo.price,
        currency: courseInfo.currency,
        productName: [productName],
        productPrice: [courseInfo.price],
        productCount: [1],
        language: locale === 'uk' ? 'UA' : 'EN',
        serviceUrl: `${baseUrl}/api/payment/wayforpay/webhook`,
        clientEmail: user.email,
        clientFirstName: user.name?.split(' ')[0] || 'Student',
        clientLastName: user.name?.split(' ').slice(1).join(' ') || '',
        paymentSystems: 'card;googlePay;applePay',
      })

      await paymentsCollection.insertOne({
        userId: userIdObj,
        courseId,
        orderId,
        amount: courseInfo.price,
        currency: courseInfo.currency,
        status: 'pending',
        paymentMethod: 'wayforpay',
        paymentType: 'full_course',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return NextResponse.json({
        paymentUrl: invoiceUrl,
        orderId,
        provider: 'wayforpay',
      })
    }

    const productLabel = courseInfo.nameEn || courseInfo.name
    const paymentLink = generatePaymentLink({
      orderId,
      amount: courseInfo.price,
      description: paymentDescription(productLabel, locale),
      resultUrl: `${baseUrl}/payment/success?orderId=${orderId}`,
      serverUrl: `${baseUrl}/api/payment/webhook`,
      currency: courseInfo.currency,
    })

    await paymentsCollection.insertOne({
      userId: userIdObj,
      courseId,
      orderId,
      amount: courseInfo.price,
      currency: courseInfo.currency,
      status: 'pending',
      paymentMethod: 'liqpay',
      paymentType: 'full_course',
      paymentData: {
        data: paymentLink.data,
        signature: paymentLink.signature,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      paymentUrl: paymentLink.url,
      data: paymentLink.data,
      signature: paymentLink.signature,
      orderId,
      provider: 'liqpay',
    })
  } catch (error) {
    console.error('Create payment error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}





















