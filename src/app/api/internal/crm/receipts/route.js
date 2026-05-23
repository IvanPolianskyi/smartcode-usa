import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { getCollection } from '@/lib/mongodb'

/**
 * Список квитанцій IBAN для підтягування в CRM (server-to-server, JWT_SECRET).
 */
export async function GET(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get('status') || 'pending'
    const limit = Math.min(Number(searchParams.get('limit') || 100), 200)

    const paymentsCollection = await getCollection('payments')
    const usersCollection = await getCollection('users')

    const query = { paymentMethod: 'receipt_upload' }
    if (statusFilter === 'pending') {
      query.status = 'pending'
      query.approvalStatus = { $ne: 'approved' }
    } else if (statusFilter === 'approved') {
      query.$or = [{ status: 'completed' }, { approvalStatus: 'approved' }]
    }

    const payments = await paymentsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()

    const userIds = [...new Set(payments.map((p) => p.userId?.toString()).filter(Boolean))]
    const users = await usersCollection
      .find({ _id: { $in: userIds.map((id) => new ObjectId(id)) } })
      .project({ name: 1, email: 1, studentProfile: 1 })
      .toArray()
    const userMap = new Map(users.map((u) => [u._id.toString(), u]))

    const receipts = payments.map((p) => {
      const uid = p.userId?.toString() || ''
      const user = userMap.get(uid)
      const profile = user?.studentProfile || {}
      const rec = p.receipt || {}
      return {
        lms_payment_id: p._id.toString(),
        user_id: uid,
        student_name: user?.name || '',
        student_email: user?.email || '',
        crm_student_id: String(profile.crmStudentId || ''),
        crm_receipt_id: String(p.crmReceiptId || ''),
        amount: Number(p.amount || 0),
        currency: p.currency || 'UAH',
        lesson_price: Number(p.lessonPrice || 0),
        lesson_format: p.lessonFormat || 'group',
        credited_lessons: Number(p.creditedLessons || 0),
        status: p.approvalStatus === 'approved' || p.status === 'completed' ? 'approved' : 'pending',
        created_at: p.createdAt,
        receipt: rec.dataUrl
          ? {
              fileName: rec.fileName,
              mimeType: rec.mimeType,
              dataUrl: rec.dataUrl,
            }
          : null,
      }
    })

    return NextResponse.json({ receipts })
  } catch (error) {
    console.error('internal crm receipts GET:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
