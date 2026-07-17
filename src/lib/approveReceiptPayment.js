import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'

/**
 * Approve IBAN receipt: локальні lessonCredits лише якщо учень НЕ в CRM.
 * CRM-linked — баланс нараховує CRM ledger (sync status approved).
 */
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
    const existingUser = receipt.userId
      ? await usersCollection.findOne(
          { _id: receipt.userId },
          { projection: { 'studentProfile.crmStudentId': 1 } }
        )
      : null
    const crmLinked = Boolean(String(existingUser?.studentProfile?.crmStudentId || '').trim())
    return { ok: true, alreadyApproved: true, crmLinked, creditedLessons }
  }

  const user = await usersCollection.findOne(
    { _id: claimed.userId },
    { projection: { 'studentProfile.crmStudentId': 1 } }
  )
  const crmLinked = Boolean(String(user?.studentProfile?.crmStudentId || '').trim())

  // CRM-linked: баланс уроків і грошей веде CRM ledger — не дублюємо на LMS.
  if (!crmLinked) {
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
  } else {
    await usersCollection.updateOne(
      { _id: claimed.userId },
      { $set: { updatedAt: new Date() } }
    )
  }

  return { ok: true, alreadyApproved: false, crmLinked, creditedLessons }
}
