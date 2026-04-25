/**
 * Міжнародні номери: базова перевірка діапазону цифр (як E.164, 7–15) та збереження + на початку.
 */

const MIN_DIGITS = 7
const MAX_DIGITS = 15

/**
 * + лише на початку, далі — цифри, не більше MAX_DIGITS.
 */
export function sanitizePhoneInput(raw) {
  const s = String(raw ?? '')
  const hasPlus = s.startsWith('+')
  const d = s.replace(/\D/g, '')
  const limited = d.slice(0, MAX_DIGITS)
  if (hasPlus) {
    if (!limited) return '+'
    return `+${limited}`
  }
  return limited
}

export function getPhoneDigitCount(value) {
  return String(value ?? '')
    .replace(/\D/g, '')
    .length
}

/**
 * 7–15 цифр, без урахування коду конкретної країни.
 */
export function isValidPhoneBasic(value) {
  const n = getPhoneDigitCount(value)
  return n >= MIN_DIGITS && n <= MAX_DIGITS
}
