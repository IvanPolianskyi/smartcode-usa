/**
 * Міжнародні номери: збереження + на початку, не більше 15 цифр (E.164 max).
 */

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

