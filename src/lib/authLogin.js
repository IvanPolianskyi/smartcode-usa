/**
 * Нормалізація логіна для CRM/Telegram-акаунтів.
 * Код учня (6 символів) → sc-{shortId}@students.smartcode
 */
export function normalizeLoginIdentifier(value) {
  const raw = String(value || '').trim().toLowerCase()
  if (!raw) return ''
  if (!raw.includes('@') && /^[a-z0-9]{4,12}$/.test(raw)) {
    const sid = raw.replace(/[^a-z0-9]/g, '')
    if (sid.length >= 4 && sid.length <= 12) {
      return `sc-${sid}@students.smartcode`
    }
  }
  return raw
}
