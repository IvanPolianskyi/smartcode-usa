import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'
import { grantFullCourseAccess, grantEnLiveLessonAccess } from '@/lib/paymentGrants'
import { isMonobankSuccessStatus, mapMonobankStatusToPayment } from '@/lib/monobank'

/**
 * Надає доступ / кредити після підтвердження оплати.
 * Гостьовий full_course очікує claim через реєстрацію.
 */
export async function fulfillCompletedPayment(payment, { amountFromProvider } = {}) {
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
    const paidAmount = amountFromProvider || Number(payment.amount) || 0
    const creditedLessons = Math.max(1, Math.floor(Number(payment.creditedLessons || 0)))
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
}

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

  const setFields = {
    status,
    paymentData: providerPayload,
    amount: amountFromProvider || payment.amount,
    currency: payment.currency || 'UAH',
    invoiceId: providerPayload?.invoiceId || payment.invoiceId || null,
    updatedAt: new Date(),
  }

  if (!approved && status !== 'completed') {
    await paymentsCollection.updateOne(
      { orderId: payment.orderId },
      { $set: setFields }
    )
    return { orderReference, status, fulfilled: false }
  }

  const claimed = await paymentsCollection.findOneAndUpdate(
    { orderId: payment.orderId, status: { $ne: 'completed' } },
    { $set: { ...setFields, status: 'completed' } },
    { returnDocument: 'after' }
  )

  if (!claimed) {
    return {
      orderReference,
      status: 'completed',
      fulfilled: false,
      alreadyDone: true,
    }
  }

  await fulfillCompletedPayment(claimed, { amountFromProvider })
  return { orderReference, status: 'completed', fulfilled: true }
}
