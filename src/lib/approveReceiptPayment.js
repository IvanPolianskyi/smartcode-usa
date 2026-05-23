import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'

export async function approveReceiptPayment(receiptId, approvedBy = null) {
  if (!ObjectId.isValid(receiptId)) {
    throw new Error('Invalid receiptId')
  }
  const paymentsCollection = await getCollection('payments')
  const usersCollection = await getCollection('users')
  const receiptObjectId = new ObjectId(receiptId)
  const receipt = await paymentsCollection.findOne({
    _id: receiptObjectId,
    paymentMethod: 'receipt_upload',
  })

  if (!receipt) {
    throw new Error('Receipt not found')
  }
  if (receipt.approvalStatus === 'approved' || receipt.status === 'completed') {
    return { ok: true, alreadyApproved: true }
  }

  const creditedLessons = Number(receipt.creditedLessons || 0)
  const amount = Number(receipt.amount || 0)

  await paymentsCollection.updateOne(
    { _id: receiptObjectId },
    {
      $set: {
        status: 'completed',
        approvalStatus: 'approved',
        approvedAt: new Date(),
        ...(approvedBy ? { approvedBy } : {}),
        updatedAt: new Date(),
      },
    }
  )

  await usersCollection.updateOne(
    { _id: receipt.userId },
    {
      $inc: {
        'studentProfile.accountBalance': amount,
        'studentProfile.lessonCredits': creditedLessons,
      },
      $set: { updatedAt: new Date() },
    }
  )

  return { ok: true, alreadyApproved: false }
}
