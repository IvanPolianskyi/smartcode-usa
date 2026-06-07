import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { resolveCreditedLessons } from '@/lib/lessonCreditsFromAmount'
import { syncReceiptToCrm } from '@/lib/syncReceiptToCrm'

const MAX_RECEIPT_SIZE_BYTES = 5 * 1024 * 1024

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

    const formData = await request.formData()
    const amount = toSafeAmount(formData.get('amount'))
    const requestedLessons = formData.get('creditedLessons')
    const file = formData.get('receipt')

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Вкажіть коректну суму оплати' }, { status: 400 })
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Додайте файл квитанції' }, { status: 400 })
    }

    if (file.size > MAX_RECEIPT_SIZE_BYTES) {
      return NextResponse.json({ error: 'Максимальний розмір файлу 5MB' }, { status: 400 })
    }

    const creditCalc = resolveCreditedLessons(requestedLessons)
    if (!creditCalc.creditedLessons) {
      return NextResponse.json({ error: 'Вкажіть кількість уроків (мінімум 1)' }, { status: 400 })
    }
    const creditedLessons = creditCalc.creditedLessons

    const usersCollection = await getCollection('users')
    const paymentsCollection = await getCollection('payments')
    const userObjectId = new ObjectId(userId)
    const user = await usersCollection.findOne({ _id: userObjectId })

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    const insertResult = await paymentsCollection.insertOne({
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
      lessonPrice: 0,
      lessonFormat: 'manual',
      creditedLessons,
      approvalStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const paymentId = insertResult.insertedId.toString()

    let crmSync = { ok: false, skipped: false, reason: '' }
    try {
      const crmResult = await syncReceiptToCrm({
        lms_payment_id: paymentId,
        user_id: userId,
        student_name: user?.name || '',
        student_email: user?.email || '',
        crm_student_id: String(user?.studentProfile?.crmStudentId || ''),
        amount,
        currency: 'UAH',
        lesson_price: 0,
        lesson_format: 'manual',
        credited_lessons: creditedLessons,
        receipt: {
          fileName: file.name,
          mimeType: file.type,
          dataUrl,
        },
      })
      if (crmResult?.skipped) {
        crmSync = { ok: false, skipped: true, reason: crmResult.reason || 'CRM not configured' }
      } else if (crmResult?.id) {
        crmSync = { ok: true, skipped: false, reason: '' }
        const crmReceiptId = String(crmResult.id)
        await paymentsCollection.updateOne(
          { _id: insertResult.insertedId },
          { $set: { crmReceiptId, updatedAt: new Date() } }
        )
      } else {
        crmSync = { ok: true, skipped: false, reason: '' }
      }
    } catch (crmError) {
      console.error('CRM receipt sync failed:', crmError)
      crmSync = {
        ok: false,
        skipped: false,
        reason: String(crmError?.message || crmError),
      }
    }

    return NextResponse.json(
      {
        ok: true,
        creditedLessonsPreview: creditedLessons,
        requiresApproval: true,
        autoApproved: false,
        crmSync,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Payment receipt upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
