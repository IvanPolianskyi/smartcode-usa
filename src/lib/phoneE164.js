/**
 * Нормалізація для API: один формат E.164-подібно (+ тільки цифри після), 7–15 цифр.
 */

const MIN = 7
const MAX = 15

/**
 * @returns {string | null} на кшталт +48412345678 або null
 */
export function normalizePhoneE164(phone) {
  if (phone == null) return null
  const s = String(phone).trim()
  if (!s) return null
  const d = s.replace(/\D/g, '')
  if (d.length < MIN || d.length > MAX) return null
  return `+${d}`
}
