import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'

export async function approveReceiptPayment(receiptId, approvedBy = null, creditedLessonsOverride = null) {
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

  const amount = Number(receipt.amount || 0)
  const storedLessons = Number(receipt.creditedLessons || 0)
  const override = Number(creditedLessonsOverride)
  const creditedLessons =
    Number.isFinite(override) && override >= 1
      ? Math.floor(override)
      : storedLessons >= 1
        ? Math.floor(storedLessons)
        : 0

  if (!creditedLessons) {
    throw new Error('Invalid credited lessons')
  }

  const claimed = await paymentsCollection.findOneAndUpdate(
    {
      _id: receiptObjectId,
      paymentMethod: 'receipt_upload',
      approvalStatus: { $ne: 'approved' },
      status: { $ne: 'completed' },
    },
    {
      $set: {
        status: 'completed',
        approvalStatus: 'approved',
        creditedLessons,
        approvedAt: new Date(),
        ...(approvedBy ? { approvedBy } : {}),
        updatedAt: new Date(),
      },
    },
    { returnDocument: 'after' }
  )

  if (!claimed) {
    return { ok: true, alreadyApproved: true }
  }

  await usersCollection.updateOne(
    { _id: claimed.userId },
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
