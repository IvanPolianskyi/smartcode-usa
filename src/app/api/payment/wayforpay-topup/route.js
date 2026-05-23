import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { createInvoice } from '@/lib/wayforpay'

const GROUP_LESSON_PRICE_UAH = 350
const INDIVIDUAL_LESSON_PRICE_UAH = 500

function toSafeAmount(value) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return 0
  return Math.round(parsed * 100) / 100
}

function isMultipleOf(amount, step) {
  if (!step) return false
  return Number.isInteger(amount / step)
}

export async function POST(request) {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    const amount = toSafeAmount(body.amount)
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Вкажіть коректну суму оплати' }, { status: 400 })
    }

    const usersCollection = await getCollection('users')
    const userIdObj = new ObjectId(userId)
    const user = await usersCollection.findOne({ _id: userIdObj })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const lessonFormat = user?.studentProfile?.lessonFormat === 'individual' ? 'individual' : 'group'
    const lessonPrice = lessonFormat === 'individual' ? INDIVIDUAL_LESSON_PRICE_UAH : GROUP_LESSON_PRICE_UAH
    if (!isMultipleOf(amount, lessonPrice)) {
      return NextResponse.json(
        { error: `Сума має бути кратною ${lessonPrice} грн для вашого плану` },
        { status: 400 }
      )
    }

    const creditedLessons = Math.floor(amount / lessonPrice)
    const orderId = `topup_${userId}_${Date.now()}`
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

    const formatLabel = lessonFormat === 'individual' ? 'індивідуальний' : 'груповий'
    const productName = `Оплата уроків SmartCode (${formatLabel}, ${creditedLessons} шт.)`

    const { invoiceUrl } = await createInvoice({
      orderReference: orderId,
      amount,
      currency: 'UAH',
      productName: [productName],
      productPrice: [amount],
      productCount: [1],
      language: 'UA',
      serviceUrl: `${baseUrl}/api/payment/wayforpay/webhook`,
      clientEmail: user.email,
      clientFirstName: user.name?.split(' ')[0] || 'Учень',
      clientLastName: user.name?.split(' ').slice(1).join(' ') || '',
      paymentSystems: 'card;googlePay;applePay',
    })

    const paymentsCollection = await getCollection('payments')
    await paymentsCollection.insertOne({
      userId: userIdObj,
      courseId: 'manual-topup',
      orderId,
      amount,
      currency: 'UAH',
      status: 'pending',
      paymentMethod: 'wayforpay',
      paymentType: 'lesson_topup',
      lessonPrice,
      lessonFormat,
      creditedLessons,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      paymentUrl: invoiceUrl,
      orderId,
      provider: 'wayforpay',
    })
  } catch (error) {
    console.error('WayForPay topup error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
