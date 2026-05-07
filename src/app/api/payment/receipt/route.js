import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'

const MAX_RECEIPT_SIZE_BYTES = 5 * 1024 * 1024
const GROUP_LESSON_PRICE_UAH = 350
const INDIVIDUAL_LESSON_PRICE_UAH = 500

function toSafeAmount(value) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return 0
  return Math.round(parsed * 100) / 100
}

function isMultipleOf(amount, step) {
  if (!step) return false
  const quotient = amount / step
  return Number.isInteger(quotient)
}

export async function POST(request) {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const formData = await request.formData()
    const amount = toSafeAmount(formData.get('amount'))
    const file = formData.get('receipt')

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Вкажіть коректну суму оплати' }, { status: 400 })
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Додайте фото квитанції' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Квитанція має бути зображенням' }, { status: 400 })
    }

    if (file.size > MAX_RECEIPT_SIZE_BYTES) {
      return NextResponse.json({ error: 'Максимальний розмір файлу 5MB' }, { status: 400 })
    }

    const usersCollection = await getCollection('users')
    const paymentsCollection = await getCollection('payments')
    const userObjectId = new ObjectId(userId)
    const user = await usersCollection.findOne({ _id: userObjectId })
    const lessonFormat = user?.studentProfile?.lessonFormat === 'individual' ? 'individual' : 'group'
    const lessonPrice = lessonFormat === 'individual' ? INDIVIDUAL_LESSON_PRICE_UAH : GROUP_LESSON_PRICE_UAH
    if (!isMultipleOf(amount, lessonPrice)) {
      return NextResponse.json(
        { error: `Сума має бути кратною ${lessonPrice} грн для вашого плану` },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    const creditedLessons = Math.floor(amount / lessonPrice)

    await paymentsCollection.insertOne({
      userId: userObjectId,
      courseId: 'manual-topup',
      amount,
      currency: 'UAH',
      status: 'pending',
      paymentMethod: 'receipt_upload',
      receipt: {
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
        dataUrl,
      },
      lessonPrice,
      lessonFormat,
      creditedLessons,
      approvalStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        ok: true,
        creditedLessonsPreview: creditedLessons,
        lessonPrice,
        requiresApproval: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Payment receipt upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

