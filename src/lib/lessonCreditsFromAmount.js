/**
 * Скільки уроків зарахувати за сумою оплати (не більше, ніж оплачено).
 */
export function computeCreditedLessonsFromAmount(amount, lessonPrice, requestedLessons) {
  const amt = Number(amount)
  const price = Number(lessonPrice)
  if (!Number.isFinite(amt) || amt <= 0) {
    return { creditedLessons: 0, error: 'invalid_amount' }
  }
  if (!Number.isFinite(price) || price <= 0) {
    return { creditedLessons: 0, error: 'invalid_price' }
  }

  const fromAmount = Math.floor(amt / price)
  if (fromAmount < 1) {
    return { creditedLessons: 0, error: 'amount_too_low', lessonPrice: price }
  }

  const requested = Math.floor(Number(requestedLessons) || 0)
  const creditedLessons = fromAmount

  return {
    creditedLessons,
    fromAmount,
    requestedLessons: requested > 0 ? requested : fromAmount,
    adjusted: requested > 0 && requested !== fromAmount,
  }
}
