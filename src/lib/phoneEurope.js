import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js'
import { PHONE_VALIDATION, resolveLocale } from './localeStrings'

/**
 * ISO 3166-1 alpha-2, які вважаємо «Європа» для заявок (ЄС/ЄПЗ/Євр. економ. простір + сусіди, без RU/KZ/NA).
 */
/** @type {Set<string>} ISO2 upper case */
export const EUROPE_COUNTRY = new Set([
	'AD',
	'AL',
	'AT',
	'AX',
	'BA',
	'BE',
	'BG',
	'CH',
	'CY',
	'CZ',
	'DE',
	'DK',
	'EE',
	'ES',
	'FI',
	'FO',
	'FR',
	'GB',
	'GE',
	'GG',
	'GI',
	'GR',
	'HR',
	'HU',
	'IE',
	'IS',
	'IT',
	'IM',
	'JE',
	'LI',
	'LT',
	'LU',
	'LV',
	'MC',
	'MD',
	'ME',
	'MK',
	'MT',
	'NL',
	'NO',
	'PL',
	'PT',
	'RO',
	'RS',
	'SE',
	'SI',
	'SK',
	'SM',
	'UA',
	'VA',
	'XK',
])

/**
 * @returns {string | null} кандидат E.164: + + лише цифри, без зайвого
 */
function toE164Candidate(raw) {
	const t = String(raw ?? '').trim()
	if (!t) return null
	if (t.startsWith('+')) {
		const d = t.slice(1).replace(/\D/g, '')
		if (!d) return '+'
		return `+${d}`
	}
	const d = t.replace(/\D/g, '')
	return d ? `+${d}` : null
}

/**
 * @param {string} raw
 * @param {'uk'|'en'|string} [locale]
 */
export function validateEuropeanPhone(raw, locale = 'uk') {
	const m = PHONE_VALIDATION[resolveLocale(locale)]
	const e164 = toE164Candidate(raw)
	if (!e164) {
		return { ok: false, message: m.empty }
	}
	const digits = e164.replace(/\D/g, '')
	if (digits.length === 0) {
		return { ok: false, message: m.empty }
	}
	if (digits.length < 8) {
		return { ok: false, message: m.tooShort }
	}
	if (digits.length > 15) {
		return { ok: false, message: m.tooLong }
	}
	const p = parsePhoneNumberFromString(e164)
	if (!p) {
		return { ok: false, message: m.badFormat }
	}
	if (!isValidPhoneNumber(e164) || !p.isValid()) {
		return { ok: false, message: m.badDigits }
	}
	const c = p.country
	if (!c || !EUROPE_COUNTRY.has(c)) {
		return { ok: false, message: m.notEurope }
	}
	return { ok: true, e164: p.format('E.164') }
}

export function isValidEuropeanPhone(value, locale = 'uk') {
	return validateEuropeanPhone(value, locale).ok
}
