import { randomBytes, timingSafeEqual } from 'crypto'

export function createPaymentStatusToken() {
  return randomBytes(24).toString('hex')
}

export function paymentStatusTokenMatches(payment, provided) {
  const expected = payment?.statusToken
  if (!expected || !provided || typeof provided !== 'string') {
    return false
  }
  try {
    const a = Buffer.from(expected, 'utf8')
    const b = Buffer.from(provided, 'utf8')
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}
