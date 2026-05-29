import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'
import { grantFullCourseAccess, grantEnLiveLessonAccess } from '@/lib/paymentGrants'
import { isMonobankSuccessStatus, mapMonobankStatusToPayment } from '@/lib/monobank'

/**
 * Оновлює запис платежу і надає доступ після успішної оплати.
 * Використовується Monobank webhook і poll status.
 */
export async function applyPaymentProviderUpdate(payment, providerPayload) {
  const paymentsCollection = await getCollection('payments')
  const orderReference =
    providerPayload?.reference ||
    providerPayload?.orderReference ||
    payment.orderId

  const approved =
    providerPayload?.transactionStatus === 'Approved' ||
    isMonobankSuccessStatus(providerPayload?.status)

  const status = providerPayload?.transactionStatus
    ? approved
      ? 'completed'
      : String(providerPayload.transactionStatus).toLowerCase()
    : mapMonobankStatusToPayment(providerPayload?.status)

  const amountFromProvider =
    providerPayload?.finalAmount != null
      ? Number(providerPayload.finalAmount) / 100
      : providerPayload?.amount != null
        ? Number(providerPayload.amount) / 100
        : Number(providerPayload?.amount) || payment.amount

  await paymentsCollection.updateOne(
    { orderId: payment.orderId },
    {
      $set: {
        status,
        paymentData: providerPayload,
        amount: amountFromProvider || payment.amount,
        currency: payment.currency || 'UAH',
        invoiceId: providerPayload?.invoiceId || payment.invoiceId || null,
        updatedAt: new Date(),
      },
    }
  )

  if (!approved && status !== 'completed') {
    return { orderReference, status, fulfilled: false }
  }

  if (payment.status === 'completed') {
    return { orderReference, status: 'completed', fulfilled: false, alreadyDone: true }
  }

  if (payment.paymentType === 'full_course' && payment.userId) {
    await grantFullCourseAccess(payment.userId, payment.courseId)
  } else if (payment.paymentType === 'live_lesson_en') {
    const identifier = payment.userId || payment.guestEmail
    if (identifier) {
      await grantEnLiveLessonAccess(identifier, payment.courseId, {
        lessonFormat: payment.lessonFormat,
        day: payment.scheduleDay,
        time: payment.scheduleTime,
      })
    }
  } else if (
    (payment.paymentType === 'lesson_topup' ||
      payment.paymentType === 'lesson_topup_en') &&
    payment.userId
  ) {
    const usersCollection = await getCollection('users')
    const lessonPrice = Number(payment.lessonPrice || 1)
    const paidAmount = amountFromProvider || Number(payment.amount) || 0
    const fromAmount = Math.floor(paidAmount / lessonPrice)
    const creditedLessons =
      fromAmount > 0 ? fromAmount : Number(payment.creditedLessons || 0)
    await usersCollection.updateOne(
      { _id: new ObjectId(payment.userId) },
      {
        $inc: {
          'studentProfile.lessonCredits': creditedLessons,
          'studentProfile.accountBalance': paidAmount,
        },
        $set: { updatedAt: new Date() },
      }
    )
  }

  return { orderReference, status: 'completed', fulfilled: true }
}
