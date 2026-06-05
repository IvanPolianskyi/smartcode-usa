import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'
import { grantFullCourseAccess, grantEnLiveLessonAccess } from '@/lib/paymentGrants'
import { paymentStatusTokenMatches } from '@/lib/paymentStatusToken'

/**
 * Атомарно прив'язує гостьовий платіж до нового акаунта.
 * Потрібні збіг email з guestEmail і валідний statusToken з redirect URL.
 */
export async function claimGuestPayment({ orderId, userId, email, statusToken }) {
  if (!orderId || !userId || !email || !statusToken) {
    return { ok: false, reason: 'missing_params' }
  }

  const paymentsCollection = await getCollection('payments')
  const payment = await paymentsCollection.findOne({ orderId })

  if (!payment) {
    return { ok: false, reason: 'not_found' }
  }

  if (!payment.isGuest || payment.status !== 'completed') {
    return { ok: false, reason: 'not_claimable' }
  }

  const normalizedEmail = email.toLowerCase().trim()
  const guestEmail = payment.guestEmail?.toLowerCase().trim()
  if (!guestEmail || guestEmail !== normalizedEmail) {
    return { ok: false, reason: 'email_mismatch' }
  }

  if (!paymentStatusTokenMatches(payment, statusToken)) {
    return { ok: false, reason: 'invalid_token' }
  }

  const userObjectId =
    userId instanceof ObjectId ? userId : new ObjectId(String(userId))

  const claimed = await paymentsCollection.findOneAndUpdate(
    {
      orderId,
      isGuest: true,
      status: 'completed',
      guestEmail: payment.guestEmail,
    },
    {
      $set: { userId: userObjectId, updatedAt: new Date() },
      $unset: { isGuest: '', guestEmail: '', guestName: '' },
    },
    { returnDocument: 'after' }
  )

  if (!claimed) {
    return { ok: false, reason: 'already_claimed' }
  }

  if (claimed.paymentType === 'full_course') {
    await grantFullCourseAccess(userObjectId, claimed.courseId)
  } else if (claimed.paymentType === 'live_lesson_en') {
    await grantEnLiveLessonAccess(userObjectId, claimed.courseId, {
      lessonFormat: claimed.lessonFormat,
      day: claimed.scheduleDay,
      time: claimed.scheduleTime,
    })
  }

  return { ok: true, payment: claimed }
}
