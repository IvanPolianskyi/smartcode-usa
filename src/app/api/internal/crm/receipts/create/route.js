import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { getCollection } from '@/lib/mongodb'
import { syncReceiptToCrm } from '@/lib/syncReceiptToCrm'

function toSafeAmount(value) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) return 0
  return Math.round(parsed * 100) / 100
}

/**
 * CRM/Telegram створює квитанцію для вже існуючого LMS-учня (server-to-server).
 */
export async function POST(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const userId = String(body.userId || body.user_id || '').trim()
    const amount = toSafeAmount(body.amount)
    const creditedLessons = Math.max(1, Math.floor(Number(body.creditedLessons ?? body.credited_lessons) || 0))
    const receipt = body.receipt || {}

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }
    if (!amount) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }
    if (!receipt.dataUrl && !receipt.data_url) {
      return NextResponse.json({ error: 'receipt image required' }, { status: 400 })
    }

    const usersCollection = await getCollection('users')
    const paymentsCollection = await getCollection('payments')
    const userObjectId = new ObjectId(userId)
    const user = await usersCollection.findOne({ _id: userObjectId })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const dataUrl = receipt.dataUrl || receipt.data_url
    const fileName = receipt.fileName || receipt.file_name || 'receipt.jpg'
    const mimeType = receipt.mimeType || receipt.mime_type || 'image/jpeg'

    const insertResult = await paymentsCollection.insertOne({
      userId: userObjectId,
      courseId: 'manual-topup',
      amount,
      currency: 'UAH',
      status: 'pending',
      paymentMethod: 'receipt_upload',
      receipt: {
        fileName,
        mimeType,
        dataUrl,
      },
      lessonPrice: 0,
      lessonFormat: String(body.lessonFormat || body.lesson_format || 'manual'),
      creditedLessons,
      approvalStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const paymentId = insertResult.insertedId.toString()
    const crmStudentId = String(
      body.crmStudentId || body.crm_student_id || user?.studentProfile?.crmStudentId || ''
    )

    try {
      const crmResult = await syncReceiptToCrm({
        lms_payment_id: paymentId,
        user_id: userId,
        student_name: body.studentName || body.student_name || user?.name || '',
        student_email: body.studentEmail || body.student_email || user?.email || '',
        crm_student_id: crmStudentId,
        amount,
        currency: 'UAH',
        lesson_price: 0,
        lesson_format: String(body.lessonFormat || body.lesson_format || 'manual'),
        credited_lessons: creditedLessons,
        receipt: { fileName, mimeType, dataUrl },
      })
      if (crmResult?.id) {
        await paymentsCollection.updateOne(
          { _id: insertResult.insertedId },
          { $set: { crmReceiptId: String(crmResult.id), updatedAt: new Date() } }
        )
      }
    } catch (crmError) {
      console.error('CRM receipt sync from create route:', crmError)
    }

    return NextResponse.json({
      ok: true,
      lmsPaymentId: paymentId,
    })
  } catch (error) {
    console.error('internal crm receipts create:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
