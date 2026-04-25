import { validateEuropeanPhone } from './phoneEurope'

/**
 * @returns {string | null} нормалізований E.164 або null
 */
export function normalizePhoneE164(phone) {
  const r = validateEuropeanPhone(phone)
  if (!r.ok) return null
  return r.e164
}
