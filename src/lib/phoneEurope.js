import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js'

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
	'BY',
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
 * isValid() у бібліотеці враховує кількість цифр після коду країни (напр. +380 → 9 цифр, +48 → 9, тощо).
 */
export function validateEuropeanPhone(raw) {
	const e164 = toE164Candidate(raw)
	if (!e164) {
		return { ok: false, message: 'Введіть номер телефону' }
	}
	const digits = e164.replace(/\D/g, '')
	if (digits.length === 0) {
		return { ok: false, message: 'Введіть номер телефону' }
	}
	if (digits.length < 8) {
		return { ok: false, message: 'Введіть повний номер (код країни + номер)' }
	}
	if (digits.length > 15) {
		return { ok: false, message: 'Надто довгий номер' }
	}
	if (digits.includes('380380')) {
		return { ok: false, message: 'Не дублюйте код країни (+380 лише один раз)' }
	}
	const p = parsePhoneNumberFromString(e164)
	if (!p) {
		return { ok: false, message: 'Перевірте формат номера' }
	}
	if (!isValidPhoneNumber(e164) || !p.isValid()) {
		return { ok: false, message: 'Перевірте кількість цифр (без дубля коду країни)' }
	}
	const c = p.country
	if (!c || !EUROPE_COUNTRY.has(c)) {
		return { ok: false, message: 'Потрібен номер з країни Європи' }
	}
	return { ok: true, e164: p.format('E.164') }
}

export function isValidEuropeanPhone(value) {
	return validateEuropeanPhone(value).ok
}
