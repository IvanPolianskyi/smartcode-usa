import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'

export async function rejectReceiptPayment(receiptId) {
  if (!ObjectId.isValid(receiptId)) {
    throw new Error('Invalid receiptId')
  }

  const paymentsCollection = await getCollection('payments')
  const receiptObjectId = new ObjectId(receiptId)

  const receipt = await paymentsCollection.findOne({
    _id: receiptObjectId,
    paymentMethod: 'receipt_upload',
  })

  if (!receipt) {
    throw new Error('Receipt not found')
  }

  if (receipt.approvalStatus === 'approved' || receipt.status === 'completed') {
    // CRM unapprove: дозволяємо відхилити вже approved, щоб статуси не розʼїжджались.
    await paymentsCollection.updateOne(
      { _id: receiptObjectId },
      {
        $set: {
          status: 'failed',
          approvalStatus: 'rejected',
          rejectedAt: new Date(),
          unapprovedAt: new Date(),
          updatedAt: new Date(),
        },
      }
    )
    return { ok: true, alreadyRejected: false, wasApproved: true }
  }

  if (receipt.approvalStatus === 'rejected' || receipt.status === 'failed') {
    return { ok: true, alreadyRejected: true }
  }

  await paymentsCollection.updateOne(
    { _id: receiptObjectId },
    {
      $set: {
        status: 'failed',
        approvalStatus: 'rejected',
        rejectedAt: new Date(),
        updatedAt: new Date(),
      },
    }
  )

  return { ok: true, alreadyRejected: false }
}
