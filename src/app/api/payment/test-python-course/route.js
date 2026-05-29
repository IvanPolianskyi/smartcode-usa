import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { startMonobankPayment } from '@/lib/createMonobankPayment'
import { coursePrices } from '@/lib/coursePrices'
import { paymentDescription } from '@/lib/localeStrings'

const PYTHON_COURSE_ID = 'python-developer-zero-to-junior'
const TEST_AMOUNT_UAH = 5

/**
 * Публічна тестова оплата Python курсу (5 грн) — той самий флоу, що full_course.
 * POST /api/payment/test-python-course
 */
export async function POST(request) {
  try {
    const userId = await getCurrentUser()
    const body = await request.json()
    const { locale = 'uk', guestEmail, guestName } = body

    if (!userId && (!guestEmail || !guestName)) {
      return NextResponse.json(
        { error: 'Authentication or guest details required' },
        { status: 401 }
      )
    }

    const usersCollection = await getCollection('users')
    let user = null

    if (userId) {
      user = await usersCollection.findOne({ _id: new ObjectId(userId) })
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
    }

    const courseInfo = coursePrices[PYTHON_COURSE_ID]
    if (!courseInfo) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const customerEmail = user ? user.email : guestEmail
    const orderIdPrefix = userId
      ? userId.toString()
      : `guest_${String(customerEmail).replace(/[^a-zA-Z0-9]/g, '')}`
    const orderId = `test_course_${PYTHON_COURSE_ID}_${orderIdPrefix}_${Date.now()}`

    const productName = courseInfo.nameEn || courseInfo.name
    const description = `${paymentDescription(productName, locale)} (test · 5 грн)`

    const { invoiceId, paymentUrl } = await startMonobankPayment({
      orderId,
      amountUah: TEST_AMOUNT_UAH,
      description,
      locale,
      basketName: `${productName} (test)`,
    })

    const paymentsCollection = await getCollection('payments')
    const paymentRecord = {
      courseId: PYTHON_COURSE_ID,
      orderId,
      invoiceId,
      amount: TEST_AMOUNT_UAH,
      currency: 'UAH',
      status: 'pending',
      paymentMethod: 'monobank',
      paymentType: 'full_course',
      isTestCheckout: true,
      description,
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

    return NextResponse.json({
      paymentUrl,
      orderId,
      invoiceId,
      courseId: PYTHON_COURSE_ID,
      amountUah: TEST_AMOUNT_UAH,
      provider: 'monobank',
    })
  } catch (error) {
    console.error('Test python course payment error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
