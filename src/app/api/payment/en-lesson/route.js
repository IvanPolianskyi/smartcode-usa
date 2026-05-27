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
    const body = await request.json()
    const { courseId, lessonFormat, day, time, guestEmail, guestName } = body

    if (!userId && (!guestEmail || !guestName)) {
      return NextResponse.json({ error: 'Authentication or guest details required' }, { status: 401 })
    }

    if (!VALID_COURSES.includes(courseId)) {
      return NextResponse.json({ error: 'Invalid course' }, { status: 400 })
    }
    if (!['group', 'individual'].includes(lessonFormat)) {
      return NextResponse.json({ error: 'Invalid lesson format' }, { status: 400 })
    }
    let slot = null
    if (day && time) {
      const slotsCollection = await getCollection('availableSlots')
      slot = await slotsCollection.findOne({
        courseId,
        lessonFormat,
        day,
        time,
        isBooked: false
      })

      if (!slot) {
        return NextResponse.json({ error: 'This time slot is no longer available' }, { status: 400 })
      }
    }

    const priceInfo = getLessonPrice(lessonFormat, 'en')
    let user = null

    if (userId) {
      const usersCollection = await getCollection('users')
      user = await usersCollection.findOne({ _id: new ObjectId(userId) })
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
    }

    const customerEmail = user ? user.email : guestEmail
    const customerName = user ? user.name : guestName
    const orderIdPrefix = userId ? userId.toString() : `guest_${customerEmail.replace(/[^a-zA-Z0-9]/g, '')}`
    const orderIdSuffix = (day && time) ? `${day}_${time.replace(':', '')}` : 'topup'
    const orderId = `lesson_${courseId}_${lessonFormat}_${orderIdSuffix}_${orderIdPrefix}_${Date.now()}`
    
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
      clientEmail: customerEmail,
      clientFirstName: customerName?.split(' ')[0] || 'Student',
      clientLastName: customerName?.split(' ').slice(1).join(' ') || '',
      paymentSystems: 'card;googlePay;applePay',
    })

    const paymentsCollection = await getCollection('payments')
    
    const paymentRecord = {
      courseId,
      orderId,
      amount: priceInfo.price,
      currency: priceInfo.currency,
      status: 'pending',
      paymentMethod: 'wayforpay',
      paymentType: (day && time) ? 'live_lesson_en' : 'lesson_topup_en',
      lessonFormat: lessonFormat || null,
      lessonPrice: priceInfo.price,
      creditedLessons: 1,
      scheduleDay: day || null,
      scheduleTime: time || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    if (userId) {
      paymentRecord.userId = new ObjectId(userId)
    } else {
      paymentRecord.isGuest = true
      paymentRecord.guestEmail = guestEmail
      paymentRecord.guestName = guestName
    }

    await paymentsCollection.insertOne(paymentRecord)

    if (slot && day && time) {
      const slotsCollection = await getCollection('availableSlots')
      await slotsCollection.updateOne(
        { _id: slot._id },
        { 
          $set: { 
            reservedAt: new Date(),
            reservedBy: userId ? userId.toString() : customerEmail,
            updatedAt: new Date()
          } 
        }
      )
    }

    return NextResponse.json({ paymentUrl: invoiceUrl, orderId })
  } catch (error) {
    console.error('EN lesson payment error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
