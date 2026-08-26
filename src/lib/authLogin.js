/**
 * Нормалізація логіна для CRM/Telegram-акаунтів.
 * Код учня (4-12 символів) залишаємо як код - пошук по crmShortId на сервері.
 * Старий sc-{shortId}@students.smartcode також підтримується.
 */
export function normalizeLoginIdentifier(value) {
  const raw = String(value || '').trim().toLowerCase()
  if (!raw) return ''
  if (!raw.includes('@') && /^[a-z0-9]{4,12}$/.test(raw)) {
    return raw.replace(/[^a-z0-9]/g, '')
  }
  return raw
}

/** Чи ввід схожий на код учня CRM (без @). */
export function isStudentShortCode(value) {
  const raw = String(value || '').trim().toLowerCase()
  return Boolean(raw) && !raw.includes('@') && /^[a-z0-9]{4,12}$/.test(raw)
}
