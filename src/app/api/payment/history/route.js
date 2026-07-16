import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { getStudentReceiptReviewState } from '@/lib/studentPaymentReceiptStatus'
import { fetchCrmStudentPaymentStatus } from '@/lib/crmStudentPaymentStatus'
import { resolveStudentPaymentBalance } from '@/lib/studentPaymentBalance'

export async function GET() {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({
        stats: {
          completed: 0,
          pending: 0,
          failed: 0,
          totalAmount: 0,
          creditedLessons: 0,
          accountBalance: 0,
          lessonCredits: 0,
          debtLessons: 0,
          hasDebt: false,
          shouldRequestPayment: false,
          balanceSource: 'local',
          debtItems: [],
        },
        payments: [],
      }, { status: 200 })
    }

    const paymentsCollection = await getCollection('payments')
    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    const payments = await paymentsCollection
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray()

    const completed = payments.filter((p) => p.status === 'completed').length
    const pending = payments.filter((p) => p.status === 'pending').length
    const failed = payments.filter((p) => p.status === 'failed').length
    const totalAmount = payments
      .filter((p) => p.status === 'completed')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0)
    const creditedLessons = payments
      .filter((p) => p.status === 'completed')
      .reduce((sum, p) => sum + Number(p.creditedLessons || 0), 0)

    const receiptReview = getStudentReceiptReviewState(
      payments.map((p) => ({
        paymentMethod: p.paymentMethod,
        status: p.status,
        approvalStatus: p.approvalStatus,
        createdAt: p.createdAt,
      }))
    )

    const localLessonCredits = Number(user?.studentProfile?.lessonCredits || 0)
    const scheduleCount = Array.isArray(user?.studentProfile?.regularSchedule)
      ? user.studentProfile.regularSchedule.length
      : 0
    const crmStudentId = String(user?.studentProfile?.crmStudentId || '').trim()
    const crmStatus = crmStudentId
      ? await fetchCrmStudentPaymentStatus(crmStudentId)
      : null

    const balance = resolveStudentPaymentBalance(crmStatus, {
      localLessonCredits,
      scheduleCount,
      hasPendingReceiptReview: receiptReview.hasPendingReceiptReview,
      hasRejectedReceipt: receiptReview.hasRejectedReceipt,
    })

    // Дзеркалимо CRM ledger у studentProfile.lessonCredits (кеш для адмінки / ready-checks).
    if (
      balance.balanceSource === 'crm' &&
      user?._id &&
      Number(balance.lessonCredits) !== localLessonCredits
    ) {
      try {
        await usersCollection.updateOne(
          { _id: user._id },
          {
            $set: {
              'studentProfile.lessonCredits': Number(balance.lessonCredits) || 0,
              updatedAt: new Date(),
            },
          }
        )
      } catch (syncErr) {
        console.error('Failed to mirror CRM balance to lessonCredits:', syncErr)
      }
    }

    return NextResponse.json(
      {
        stats: {
          completed,
          pending,
          failed,
          totalAmount,
          creditedLessons,
          accountBalance: Number(user?.studentProfile?.accountBalance || 0),
          lessonCredits: balance.lessonCredits,
          debtLessons: balance.debtLessons,
          hasDebt: balance.hasDebt,
          shouldRequestPayment: balance.shouldRequestPayment,
          balanceSource: balance.balanceSource,
          debtItems: balance.debtItems,
          hasPendingReceiptReview: balance.hasPendingReceiptReview,
          hasRejectedReceipt: balance.hasRejectedReceipt,
          pendingReceiptUploadCount: receiptReview.pendingReceiptUploadCount,
          pendingReceiptsCount: balance.pendingReceiptsCount,
        },
        payments: payments.map((p) => ({
          id: p._id.toString(),
          courseId: p.courseId,
          amount: p.amount || 0,
          currency: p.currency || 'UAH',
          status: p.status || 'pending',
          paymentMethod: p.paymentMethod || null,
          approvalStatus: p.approvalStatus || null,
          createdAt: p.createdAt,
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Payment history error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
