import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { startMonobankPayment } from '@/lib/createMonobankPayment'
import { getLessonPrice, getLessonChargeAmount } from '@/lib/coursePrices'
import { reserveLessonSlot } from '@/lib/lessonSlotReserve'

const VALID_COURSES = ['roblox-studio', 'python-developer-zero-to-junior', 'web-development']

/**
 * English site: book a live lesson via Monobank
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
    if (!day || !time) {
      return NextResponse.json({ error: 'Please select a time slot' }, { status: 400 })
    }

    let user = null
    if (userId) {
      const usersCollection = await getCollection('users')
      user = await usersCollection.findOne({ _id: new ObjectId(userId) })
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
    }

    const customerEmail = user ? user.email : guestEmail
    const reservedBy = userId ? userId.toString() : customerEmail

    const slotsCollection = await getCollection('availableSlots')
    const slot = await reserveLessonSlot(slotsCollection, {
      courseId,
      lessonFormat,
      day,
      time,
      reservedBy,
    })

    if (!slot) {
      return NextResponse.json({ error: 'This time slot is no longer available' }, { status: 400 })
    }

    const priceInfo = getLessonPrice(lessonFormat, 'en')
    const chargeUah = getLessonChargeAmount(priceInfo)

    const orderIdPrefix = userId ? userId.toString() : `guest_${customerEmail.replace(/[^a-zA-Z0-9]/g, '')}`
    const orderId = `lesson_${courseId}_${lessonFormat}_${day}_${time.replace(':', '')}_${orderIdPrefix}_${Date.now()}`

    const productLabel =
      lessonFormat === 'individual'
        ? `Individual live lesson — ${courseId}`
        : `Group live lesson — ${courseId}`

    const { invoiceId, paymentUrl } = await startMonobankPayment({
      orderId,
      amountUah: chargeUah,
      description: productLabel,
      locale: 'en',
      basketName: productLabel,
    })

    const paymentsCollection = await getCollection('payments')

    const paymentRecord = {
      courseId,
      orderId,
      invoiceId,
      amount: chargeUah,
      currency: priceInfo.chargeCurrency || 'UAH',
      status: 'pending',
      paymentMethod: 'monobank',
      paymentType: 'live_lesson_en',
      lessonFormat,
      lessonPrice: chargeUah,
      creditedLessons: 1,
      scheduleDay: day,
      scheduleTime: time,
      slotId: slot._id,
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

    return NextResponse.json({ paymentUrl, orderId, invoiceId, provider: 'monobank' })
  } catch (error) {
    console.error('EN lesson payment error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
