'use client'
import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import {
	parsePhoneNumberFromString,
	isValidPhoneNumber,
	AsYouType,
} from 'libphonenumber-js'
import {
	EUROPEAN_PHONE_COUNTRIES,
	GLOBAL_PHONE_COUNTRIES,
	getPhoneCountry,
	DIAL_CODES_DESC,
	filterPhoneCountries,
} from '@/lib/phoneCountries'
import { EUROPE_COUNTRY } from '@/lib/phoneEurope'

export const COUNTRIES = EUROPEAN_PHONE_COUNTRIES

const UA_MOBILE_PREFIXES = new Set([
	'39', '50', '63', '66', '67', '68', '73',
	'89', '91', '92', '93', '94', '95', '96', '97', '98', '99',
])
const UA_MOBILE_PREFIX_FIRST_DIGITS = new Set(
	Array.from(UA_MOBILE_PREFIXES).map((prefix) => prefix[0])
)

function formatUaDisplay(digits, country) {
	if (!digits) return country.prefix + ' '
	const p1 = digits.slice(0, 2)
	const p2 = digits.slice(2, 5)
	const p3 = digits.slice(5, 7)
	const p4 = digits.slice(7, 9)
	let s = country.prefix + ' '
	if (p1) s += '(' + p1
	if (p1.length === 2) s += ') '
	if (p2) s += p2
	if (p2.length === 3 && digits.length > 5) s += ' '
	if (p3) s += p3
	if (p3.length === 2 && digits.length > 7) s += ' '
	if (p4) s += p4
	return s
}

function formatForDisplay(nationalDigits, country) {
	if (!nationalDigits) return country.prefix + ' '
	if (country.code === 'UA') return formatUaDisplay(nationalDigits, country)
	const formatted = new AsYouType(country.code).input(nationalDigits)
	const stripped = String(formatted).replace(/^\+\d+\s*/, '').trim()
	return `${country.prefix} ${stripped || nationalDigits}`
}

function stripLeadingZeros(digits) {
	return digits.replace(/^0+/, '')
}

function normalizeNationalDigits(inputDigits, country) {
	if (!inputDigits) return ''
	let digits = inputDigits
	if (digits.startsWith(country.dialCode)) {
		digits = digits.slice(country.dialCode.length)
	}
	return stripLeadingZeros(digits)
}

function hasDuplicatedDialCode(allDigits, dialCode) {
	return allDigits.includes(`${dialCode}${dialCode}`)
}

function validateUaPartial(normalized, t) {
	if (!normalized) return ''
	if (normalized.length >= 1 && !UA_MOBILE_PREFIX_FIRST_DIGITS.has(normalized[0])) {
		return t('invalidUaOperator')
	}
	if (normalized.length >= 2 && !UA_MOBILE_PREFIXES.has(normalized.slice(0, 2))) {
		return t('invalidUaOperator')
	}
	return ''
}

function countryDisplayName(country, locale) {
	return locale === 'en' ? country.nameEn : country.nameUk
}

/**
 * @param {string} nationalDigits
 * @param {import('@/lib/phoneCountries').PhoneCountry} country
 * @param {string} [rawInput]
 * @param {{ strict?: boolean }} [opts]
 * @param {(key: string, values?: Record<string, string>) => string} t
 * @param {string} locale
 */
function validateNational(nationalDigits, country, rawInput = '', opts = {}, t, locale) {
	const { strict = false } = opts
	const normalized = normalizeNationalDigits(nationalDigits, country)

	if (!normalized) {
		return strict ? t('enterAfterCountryCode') : ''
	}

	const inputDigits = String(rawInput).replace(/\D/g, '')
	if (inputDigits.startsWith(country.dialCode) && inputDigits.length > country.dialCode.length) {
		return t('duplicateCountry', { prefix: country.prefix })
	}

	const allDigits = country.dialCode + normalized
	if (hasDuplicatedDialCode(allDigits, country.dialCode)) {
		return t('duplicateCountry', { prefix: country.prefix })
	}

	if (country.code === 'UA') {
		const uaErr = validateUaPartial(normalized, t)
		if (uaErr) return uaErr
	}

	const e164 = `${country.prefix}${normalized}`
	const parsed = parsePhoneNumberFromString(e164, country.code)

	if (parsed?.country && parsed.country !== country.code) {
		return t('countryMismatch', { country: countryDisplayName(country, locale) })
	}

	if (!strict) {
		if (country.code === 'UA' && normalized.length === 9 && !UA_MOBILE_PREFIXES.has(normalized.slice(0, 2))) {
			return t('invalidUaMobile')
		}
		return ''
	}

	if (!parsed || !isValidPhoneNumber(e164, country.code) || !parsed.isValid()) {
		if (country.code === 'UA' && normalized.length === 9) {
			return t('invalidUaMobile')
		}
		return t('checkDigitCount')
	}

	if (locale !== 'en' && (!parsed.country || !EUROPE_COUNTRY.has(parsed.country))) {
		return t('europeOnly')
	}

	return ''
}

/**
 * @param {string} value
 * @returns {{ country: import('@/lib/phoneCountries').PhoneCountry, nationalDigits: string } | null}
 */
function detectFromPaste(value, locale) {
	const trimmed = String(value ?? '').trim()
	if (!trimmed) return null

	const candidate = trimmed.startsWith('+')
		? trimmed
		: `+${trimmed.replace(/\D/g, '')}`

	const parsed = parsePhoneNumberFromString(candidate)
	if (parsed?.country) {
		if (locale !== 'en' && !EUROPE_COUNTRY.has(parsed.country)) {
			// ignore non-europe in non-en locale
		} else {
			const country = getPhoneCountry(parsed.country)
			if (country) {
				return {
					country,
					nationalDigits: String(parsed.nationalNumber || ''),
				}
			}
		}
	}

	const digits = trimmed.replace(/\D/g, '')
	if (!digits) return null

	for (const dialCode of DIAL_CODES_DESC) {
		if (digits.startsWith(dialCode)) {
			const sourceList = locale === 'en' ? GLOBAL_PHONE_COUNTRIES : EUROPEAN_PHONE_COUNTRIES
			const matches = sourceList.filter((c) => c.dialCode === dialCode)
			const country = matches.find((c) => c.code === 'UA') || matches[0]
			if (country) {
				return {
					country,
					nationalDigits: stripLeadingZeros(digits.slice(dialCode.length)),
				}
			}
		}
	}

	return null
}

/**
 * Shared hook for phone input with country selector.
 */
export function usePhoneInput(initialCountryCode = 'UA') {
	const t = useTranslations('phoneField')
	const locale = useLocale()
	const [country, setCountry] = useState(
		() => getPhoneCountry(initialCountryCode) || EUROPEAN_PHONE_COUNTRIES[0]
	)
	const [rawDigits, setRawDigits] = useState('')
	const [phoneError, setPhoneError] = useState('')
	const [showDropdown, setShowDropdown] = useState(false)
	const [countryQuery, setCountryQuery] = useState('')
	const [intlMode, setIntlMode] = useState(false)
	const [intlInputValue, setIntlInputValue] = useState('')
	const dropdownRef = useRef(null)

	const filteredCountries = useMemo(
		() => filterPhoneCountries(countryQuery, locale),
		[countryQuery, locale]
	)

	useEffect(() => {
		if (!showDropdown) return
		const handler = (e) => {
			const target = e.target
			if (!(target instanceof Node)) return
			if (dropdownRef.current?.contains(target)) return
			if (target instanceof Element && target.closest('[data-phone-country-dropdown]')) return
			setShowDropdown(false)
			setCountryQuery('')
		}
		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [showDropdown])

	const applyDigits = useCallback((nextDigits, nextCountry, rawInput = '', strict = false) => {
		setRawDigits(nextDigits)
		setPhoneError(validateNational(nextDigits, nextCountry, rawInput, { strict }, t, locale))
	}, [t, locale])

	const handlePhoneChange = useCallback(
		(value) => {
			const raw = String(value ?? '')
			const trimmed = raw.trim()
			const prefix = country.prefix // e.g. "+380"

			// Той самий інпут містить і код країни, і номер — не зриваємось у intl-режим.
			if (!intlMode && (raw.startsWith(prefix) || trimmed.startsWith(prefix))) {
				const rest = raw.startsWith(prefix)
					? raw.slice(prefix.length)
					: trimmed.slice(prefix.length)
				const allDigits = rest.replace(/\D/g, '')
				const capped = normalizeNationalDigits(allDigits, country).slice(0, 15)
				applyDigits(capped, country, raw)
				return
			}

			if (trimmed.startsWith('+') || intlMode) {
				const intlRaw = trimmed.startsWith('+')
					? trimmed
					: `+${trimmed.replace(/\D/g, '')}`

				if (!intlRaw || intlRaw === '+') {
					setIntlMode(true)
					setIntlInputValue(intlRaw || '+')
					setRawDigits('')
					setPhoneError('')
					return
				}

				const detected = detectFromPaste(intlRaw, locale)
				if (detected) {
					setIntlMode(false)
					setIntlInputValue('')
					setCountry(detected.country)
					const capped = normalizeNationalDigits(detected.nationalDigits, detected.country)
					applyDigits(capped, detected.country, intlRaw)
					return
				}

				setIntlMode(true)
				setIntlInputValue(intlRaw)
				setRawDigits('')
				setPhoneError('')
				return
			}

			// Національний набір / вставка з пробілами без «+»
			setIntlMode(false)
			setIntlInputValue('')
			const allDigits = raw.replace(/\D/g, '')
			const capped = normalizeNationalDigits(allDigits, country).slice(0, 15)
			applyDigits(capped, country, raw)
		},
		[country, applyDigits, intlMode, locale]
	)

	const handlePhoneKeyDown = useCallback(
		(event) => {
			const target = event.target
			if (!(target instanceof HTMLInputElement)) return

			if (!intlMode) {
				// Не даємо стерти код країни (+380 )
				const prefixLen = country.prefix.length + 1
				const start = target.selectionStart ?? 0
				const end = target.selectionEnd ?? 0
				if (
					(event.key === 'Backspace' && start === end && start <= prefixLen) ||
					(event.key === 'Backspace' && start < prefixLen) ||
					(event.key === 'Delete' && start < prefixLen)
				) {
					event.preventDefault()
					if (start < prefixLen || end <= prefixLen) {
						target.setSelectionRange(prefixLen, prefixLen)
					}
					return
				}
			}

			if (event.key !== 'Backspace') return
			if (target.selectionStart !== target.selectionEnd) return
			if (target.selectionStart !== target.value.length) return

			if (intlMode) {
				if (!intlInputValue || intlInputValue === '+') {
					setIntlMode(false)
					setIntlInputValue('')
					return
				}
				event.preventDefault()
				handlePhoneChange(intlInputValue.slice(0, -1))
				return
			}

			if (!rawDigits) return
			event.preventDefault()
			const nextDigits = rawDigits.slice(0, -1)
			applyDigits(nextDigits, country, target.value.slice(0, -1))
		},
		[rawDigits, country, applyDigits, intlMode, intlInputValue, handlePhoneChange]
	)

	const selectCountry = useCallback(
		(c) => {
			setIntlMode(false)
			setIntlInputValue('')
			setCountry(c)
			setShowDropdown(false)
			setCountryQuery('')
			const capped = normalizeNationalDigits(rawDigits, c)
			applyDigits(capped, c, capped, false)
		},
		[rawDigits, applyDigits]
	)

	const openDropdown = useCallback(() => {
		setShowDropdown(true)
		setCountryQuery('')
	}, [])

	const validateOnSubmit = useCallback(() => {
		if (intlMode && intlInputValue) {
			const detected = detectFromPaste(intlInputValue, locale)
			if (detected) {
				setIntlMode(false)
				setIntlInputValue('')
				setCountry(detected.country)
				const capped = normalizeNationalDigits(detected.nationalDigits, detected.country)
				applyDigits(capped, detected.country, intlInputValue, true)
				const err = validateNational(capped, detected.country, intlInputValue, { strict: true }, t, locale)
				setPhoneError(err)
				return !err
			}
			setPhoneError(t('enterFullNumber'))
			return false
		}
		const err = validateNational(rawDigits, country, rawDigits, { strict: true }, t, locale)
		setPhoneError(err)
		return !err
	}, [rawDigits, country, intlMode, intlInputValue, applyDigits, t, locale])

	const getFullNumber = useCallback(() => {
		if (intlMode && intlInputValue) {
			const detected = detectFromPaste(intlInputValue, locale)
			if (detected) {
				const e164 = `${detected.country.prefix}${detected.nationalDigits}`
				const parsed = parsePhoneNumberFromString(e164, detected.country.code)
				if (parsed?.isValid()) return parsed.format('E.164')
				return e164
			}
		}
		const normalized = normalizeNationalDigits(rawDigits, country)
		const e164 = `${country.prefix}${normalized}`
		const parsed = parsePhoneNumberFromString(e164, country.code)
		if (parsed?.isValid()) return parsed.format('E.164')
		return e164
	}, [rawDigits, country, intlMode, intlInputValue, locale])

	const reset = useCallback(() => {
		setRawDigits('')
		setPhoneError('')
		setIntlMode(false)
		setIntlInputValue('')
		setCountry(getPhoneCountry('UA') || EUROPEAN_PHONE_COUNTRIES[0])
		setShowDropdown(false)
		setCountryQuery('')
	}, [])

	const displayValue = formatForDisplay(rawDigits, country)

	return {
		country,
		rawDigits,
		displayValue,
		intlMode,
		intlInputValue,
		// Код країни в тому ж інпуті, що й номер — без окремого span (вирівнювання).
		showCountryPrefix: false,
		phoneError,
		showDropdown,
		dropdownRef,
		countryQuery,
		setCountryQuery,
		filteredCountries,
		setShowDropdown,
		openDropdown,
		handlePhoneChange,
		handlePhoneKeyDown,
		selectCountry,
		validateOnSubmit,
		getFullNumber,
		reset,
		setPhoneError,
	}
}
