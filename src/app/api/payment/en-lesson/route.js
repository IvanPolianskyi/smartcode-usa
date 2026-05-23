import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { createInvoice } from '@/lib/wayforpay'
import { getLessonPrice } from '@/lib/coursePrices'

const VALID_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const VALID_COURSES = ['roblox-studio', 'python-developer-zero-to-junior', 'web-development']

/**
 * English site: book a live lesson ($10 group / $15 individual) via WayForPay
 */
export async function POST(request) {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    const { courseId, lessonFormat, day, time } = body

    if (!VALID_COURSES.includes(courseId)) {
      return NextResponse.json({ error: 'Invalid course' }, { status: 400 })
    }
    if (!['group', 'individual'].includes(lessonFormat)) {
      return NextResponse.json({ error: 'Invalid lesson format' }, { status: 400 })
    }
    if (!VALID_DAYS.includes(day)) {
      return NextResponse.json({ error: 'Invalid day' }, { status: 400 })
    }
    if (!/^\d{2}:\d{2}$/.test(time || '')) {
      return NextResponse.json({ error: 'Invalid time (use HH:MM)' }, { status: 400 })
    }

    const priceInfo = getLessonPrice(lessonFormat, 'en')
    const userIdObj = new ObjectId(userId)
    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: userIdObj })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const orderId = `lesson_${courseId}_${lessonFormat}_${userId}_${Date.now()}`
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

    const productLabel =
      lessonFormat === 'individual'
        ? `Individual live lesson — ${courseId}`
        : `Group live lesson — ${courseId}`

    const { invoiceUrl } = await createInvoice({
      orderReference: orderId,
      amount: priceInfo.price,
      currency: priceInfo.currency,
      productName: [productLabel],
      productPrice: [priceInfo.price],
      productCount: [1],
      language: 'EN',
      serviceUrl: `${baseUrl}/api/payment/wayforpay/webhook`,
      clientEmail: user.email,
      clientFirstName: user.name?.split(' ')[0] || 'Student',
      clientLastName: user.name?.split(' ').slice(1).join(' ') || '',
      paymentSystems: 'card;googlePay;applePay',
    })

    const paymentsCollection = await getCollection('payments')
    await paymentsCollection.insertOne({
      userId: userIdObj,
      courseId,
      orderId,
      amount: priceInfo.price,
      currency: priceInfo.currency,
      status: 'pending',
      paymentMethod: 'wayforpay',
      paymentType: 'live_lesson_en',
      lessonFormat,
      scheduleDay: day,
      scheduleTime: time,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({ paymentUrl: invoiceUrl, orderId })
  } catch (error) {
    console.error('EN lesson payment error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
