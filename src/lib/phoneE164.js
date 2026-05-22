import { validateEuropeanPhone } from './phoneEurope'

/**
 * @returns {string | null} нормалізований E.164 або null
 */
export function normalizePhoneE164(phone, locale = 'uk') {
  const r = validateEuropeanPhone(phone, locale)
  if (!r.ok) return null
  return r.e164
}
