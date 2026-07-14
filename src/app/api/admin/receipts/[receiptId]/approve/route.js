import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { approveReceiptPayment } from '@/lib/approveReceiptPayment'
import { syncReceiptStatusToCrm } from '@/lib/syncReceiptToCrm'

async function requireAdmin() {
  const userId = await getCurrentUser()
  if (!userId) return { error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }) }
  const usersCollection = await getCollection('users')
  const admin = await usersCollection.findOne({ _id: new ObjectId(userId) })
  if (!admin || admin.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 }) }
  }
  return { adminId: admin._id }
}

export async function POST(request, { params }) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error

    const { receiptId } = await params
    if (!ObjectId.isValid(receiptId)) {
      return NextResponse.json({ error: 'Invalid receiptId' }, { status: 400 })
    }

    const paymentsCollection = await getCollection('payments')
    const receipt = await paymentsCollection.findOne({
      _id: new ObjectId(receiptId),
      paymentMethod: 'receipt_upload',
    })
    const result = await approveReceiptPayment(receiptId, guard.adminId)
    let crmReceiptId = receipt?.crmReceiptId ? String(receipt.crmReceiptId) : ''
    // Якщо квитанцію ще не заінжестили в CRM — спробувати створити, потім approve.
    if (!crmReceiptId && result?.crmLinked) {
      try {
        const { syncReceiptToCrm } = await import('@/lib/syncReceiptToCrm')
        const usersCollection = await getCollection('users')
        const user = receipt?.userId
          ? await usersCollection.findOne(
              { _id: receipt.userId },
              { projection: { 'studentProfile.crmStudentId': 1, name: 1, email: 1 } }
            )
          : null
        const crmStudentId = String(user?.studentProfile?.crmStudentId || '').trim()
        if (crmStudentId) {
          const created = await syncReceiptToCrm({
            lmsPaymentId: String(receipt._id),
            crmStudentId: crmStudentId,
            userId: String(receipt.userId || ''),
            studentName: user?.name || receipt.studentName || '',
            studentEmail: user?.email || receipt.studentEmail || '',
            amount: Number(receipt.amount || 0),
            currency: receipt.currency || 'UAH',
            creditedLessons: Number(
              result?.creditedLessons || receipt.creditedLessons || 0
            ),
          })
          crmReceiptId = String(created?.id || created?._id || '')
          if (crmReceiptId) {
            await paymentsCollection.updateOne(
              { _id: receipt._id },
              { $set: { crmReceiptId, updatedAt: new Date() } }
            )
          }
        }
      } catch (e) {
        console.error('CRM receipt ensure before approve:', e)
      }
    }
    if (crmReceiptId) {
      try {
        await syncReceiptStatusToCrm(crmReceiptId, 'approved')
      } catch (e) {
        console.error('CRM receipt status sync:', e)
        // Для CRM-linked не мовчати: інакше баланс не нарахується ніде.
        if (result?.crmLinked) {
          return NextResponse.json(
            {
              error: 'CRM credit failed after approve',
              detail: e instanceof Error ? e.message : String(e),
              crmReceiptId,
            },
            { status: 502 }
          )
        }
      }
    } else if (result?.crmLinked) {
      return NextResponse.json(
        {
          error: 'CRM receipt missing: cannot credit linked student',
          alreadyApproved: result.alreadyApproved,
        },
        { status: 502 }
      )
    }
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Approve receipt POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

