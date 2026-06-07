import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { startMonobankPayment } from '@/lib/createMonobankPayment'
import { createPaymentStatusToken } from '@/lib/paymentStatusToken'
import { resolveCreditedLessons } from '@/lib/lessonCreditsFromAmount'

function toSafeAmount(value) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return 0
  return Math.round(parsed * 100) / 100
}

export async function POST(request) {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    const amount = toSafeAmount(body.amount)
    const creditCalc = resolveCreditedLessons(body.creditedLessons)
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Вкажіть коректну суму оплати' }, { status: 400 })
    }
    if (!creditCalc.creditedLessons) {
      return NextResponse.json({ error: 'Вкажіть кількість уроків (мінімум 1)' }, { status: 400 })
    }

    const usersCollection = await getCollection('users')
    const userIdObj = new ObjectId(userId)
    const user = await usersCollection.findOne({ _id: userIdObj })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const creditedLessons = creditCalc.creditedLessons
    const orderId = `topup_${userId}_${Date.now()}`
    const statusToken = createPaymentStatusToken()
    const description = `Оплата уроків SmartCode (${creditedLessons} шт.)`

    const { invoiceId, paymentUrl } = await startMonobankPayment({
      orderId,
      amountUah: amount,
      description,
      locale: 'uk',
      basketName: description,
      statusToken,
    })

    const paymentsCollection = await getCollection('payments')
    await paymentsCollection.insertOne({
      userId: userIdObj,
      courseId: 'manual-topup',
      orderId,
      statusToken,
      invoiceId,
      amount,
      currency: 'UAH',
      status: 'pending',
      paymentMethod: 'monobank',
      paymentType: 'lesson_topup',
      lessonPrice: 0,
      lessonFormat: 'manual',
      creditedLessons,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      paymentUrl,
      orderId,
      invoiceId,
      provider: 'monobank',
    })
  } catch (error) {
    console.error('Monobank topup error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
