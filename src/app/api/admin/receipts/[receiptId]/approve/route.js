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
    if (receipt?.crmReceiptId) {
      try {
        await syncReceiptStatusToCrm(receipt.crmReceiptId, 'approved')
      } catch (e) {
        console.error('CRM receipt status sync:', e)
      }
    }
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Approve receipt POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

