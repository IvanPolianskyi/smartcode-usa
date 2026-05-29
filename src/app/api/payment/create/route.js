import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { generatePaymentLink } from '@/lib/liqpay'
import { startMonobankPayment } from '@/lib/createMonobankPayment'
import { getCoursePrice } from '@/lib/coursePrices'
import { paymentDescription } from '@/lib/localeStrings'
import { getPaymentBaseUrl } from '@/lib/paymentUrls'

/**
 * Create payment link for course purchase
 */
export async function POST(request) {
  try {
    const userId = await getCurrentUser()
    const body = await request.json()
    const { courseId, locale = 'uk', guestEmail, guestName } = body

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    if (!userId && (!guestEmail || !guestName)) {
      return NextResponse.json(
        { error: 'Authentication or guest details required' },
        { status: 401 }
      )
    }

    let user = null
    const usersCollection = await getCollection('users')

    if (userId) {
      user = await usersCollection.findOne({ _id: new ObjectId(userId) })
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      if (user.role === 'admin') {
        return NextResponse.json({ error: 'Admin has access to all courses' }, { status: 400 })
      }
      if ((user.purchasedCourses || []).includes(courseId)) {
        return NextResponse.json({ error: 'Course already purchased' }, { status: 400 })
      }
    }

    const courseInfo = getCoursePrice(courseId, locale)
    if (!courseInfo || courseInfo.price === 0 || courseInfo.purchasable === false) {
      return NextResponse.json(
        { error: 'Course price not configured or not available for purchase' },
        { status: 400 }
      )
    }

    const customerEmail = user ? user.email : guestEmail
    const orderIdPrefix = userId ? userId.toString() : `guest_${customerEmail.replace(/[^a-zA-Z0-9]/g, '')}`
    const orderId = `course_${courseId}_${orderIdPrefix}_${Date.now()}`

    const baseUrl = getPaymentBaseUrl()
    const paymentsCollection = await getCollection('payments')

    const paymentRecord = {
      courseId,
      orderId,
      amount: courseInfo.price,
      currency: courseInfo.currency,
      status: 'pending',
      paymentMethod: courseInfo.paymentProvider || 'liqpay',
      paymentType: 'full_course',
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

    if (courseInfo.paymentProvider === 'monobank') {
      const productName = courseInfo.nameEn || courseInfo.name
      const description = paymentDescription(productName, locale)

      const { invoiceId, paymentUrl } = await startMonobankPayment({
        orderId,
        amountUah: courseInfo.price,
        description,
        locale,
        basketName: productName,
      })

      paymentRecord.invoiceId = invoiceId
      paymentRecord.paymentMethod = 'monobank'
      await paymentsCollection.insertOne(paymentRecord)

      return NextResponse.json({
        paymentUrl,
        orderId,
        invoiceId,
        provider: 'monobank',
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

    paymentRecord.paymentData = {
      data: paymentLink.data,
      signature: paymentLink.signature,
    }

    await paymentsCollection.insertOne(paymentRecord)

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
