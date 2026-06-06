import { ObjectId } from 'mongodb'
import { computeCreditedLessonsFromAmount } from '@/lib/lessonCreditsFromAmount'
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
  const lessonPrice = Number(receipt.lessonPrice || 0)
  const storedLessons = Number(receipt.creditedLessons || 0)
  const override = Number(creditedLessonsOverride)
  const creditCalc =
    Number.isFinite(override) && override >= 0
      ? { creditedLessons: Math.floor(override) }
      : lessonPrice > 0
        ? computeCreditedLessonsFromAmount(amount, lessonPrice, storedLessons)
        : { creditedLessons: storedLessons }
  const creditedLessons = creditCalc.creditedLessons || storedLessons

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
