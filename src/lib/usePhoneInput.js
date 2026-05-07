'use client'
import { useState, useCallback, useRef, useEffect } from 'react'

export const COUNTRIES = [
	{ code: 'UA', dialCode: '380', prefix: '+380', flag: 'https://flagcdn.com/w40/ua.png', length: 9 },
	{ code: 'PL', dialCode: '48',  prefix: '+48',  flag: 'https://flagcdn.com/w40/pl.png', length: 9 },
	{ code: 'DE', dialCode: '49',  prefix: '+49',  flag: 'https://flagcdn.com/w40/de.png', length: 11 },
	{ code: 'CZ', dialCode: '420', prefix: '+420', flag: 'https://flagcdn.com/w40/cz.png', length: 9 },
	{ code: 'SK', dialCode: '421', prefix: '+421', flag: 'https://flagcdn.com/w40/sk.png', length: 9 },
	{ code: 'GB', dialCode: '44',  prefix: '+44',  flag: 'https://flagcdn.com/w40/gb.png', length: 10 },
]

/**
 * Formats raw digits for display: +380 (XX) XXX XX XX
 */
function formatForDisplay(digits, country) {
	if (!digits) return country.prefix + ' '
	if (country.code === 'UA') {
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
	return country.prefix + ' ' + digits
}

const UA_MOBILE_PREFIXES = new Set([
	'39', '50', '63', '66', '67', '68', '73',
	'89', '91', '92', '93', '94', '95', '96', '97', '98', '99',
])
const UA_MOBILE_PREFIX_FIRST_DIGITS = new Set(
	Array.from(UA_MOBILE_PREFIXES).map(prefix => prefix[0])
)

function normalizeDigits(inputDigits, country) {
	if (!inputDigits) return ''
	let digits = inputDigits
	if (digits.startsWith(country.dialCode)) {
		digits = digits.slice(country.dialCode.length)
	}
	digits = digits.replace(/^0+/, '')
	return digits.slice(0, country.length)
}

/**
 * Validates phone input and returns error message or empty string.
 */
function validate(rawDigits, rawInput, country) {
	const normalized = normalizeDigits(rawDigits, country)
	if (!normalized || normalized.length === 0) {
		return 'Введіть номер телефону після коду країни'
	}
	const inputDigits = (rawInput || '').replace(/\D/g, '')
	if (inputDigits.startsWith(country.dialCode)) {
		return `Не дублюйте код країни (${country.prefix} лише один раз)`
	}
	if (normalized.length !== country.length) {
		if (country.code === 'UA') {
			if (normalized.length >= 1 && !UA_MOBILE_PREFIX_FIRST_DIGITS.has(normalized[0])) {
				return 'Некоректний код мобільного оператора України'
			}
			if (normalized.length >= 2 && !UA_MOBILE_PREFIXES.has(normalized.slice(0, 2))) {
				return 'Некоректний код мобільного оператора України'
			}
		}
		return 'Введіть повний номер телефону після коду країни'
	}
	if (country.code === 'UA' && !UA_MOBILE_PREFIXES.has(normalized.slice(0, 2))) {
		return 'Введіть коректний мобільний номер України (наприклад, +380 96 123 45 67)'
	}
	return ''
}

/**
 * Shared hook for phone input with country selector.
 */
export function usePhoneInput(initialCountryCode = 'UA') {
	const [country, setCountry] = useState(
		() => COUNTRIES.find(c => c.code === initialCountryCode) || COUNTRIES[0]
	)
	const [rawDigits, setRawDigits] = useState('')
	const [phoneError, setPhoneError] = useState('')
	const [showDropdown, setShowDropdown] = useState(false)
	const dropdownRef = useRef(null)

	// Close dropdown on outside click
	useEffect(() => {
		if (!showDropdown) return
		const handler = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setShowDropdown(false)
			}
		}
		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [showDropdown])

	const handlePhoneChange = useCallback((value) => {
		const allDigits = value.replace(/\D/g, '')
		const capped = normalizeDigits(allDigits, country)
		setRawDigits(capped)
		setPhoneError(validate(capped, value, country))
	}, [country])

	const handlePhoneKeyDown = useCallback((event) => {
		if (event.key !== 'Backspace') return
		const target = event.target
		if (!(target instanceof HTMLInputElement)) return
		if (target.selectionStart !== target.selectionEnd) return
		if (target.selectionStart !== target.value.length) return
		if (!rawDigits) return
		event.preventDefault()
		const nextDigits = rawDigits.slice(0, -1)
		setRawDigits(nextDigits)
		setPhoneError(validate(nextDigits, target.value.slice(0, -1), country))
	}, [rawDigits, country])

	const selectCountry = useCallback((c) => {
		setCountry(c)
		setShowDropdown(false)
		// Re-validate with new country
		const capped = rawDigits.slice(0, c.length)
		setRawDigits(capped)
		if (capped.length > 0) {
			setPhoneError(validate(capped, capped, c))
		} else {
			setPhoneError('')
		}
	}, [rawDigits])

	const validateOnSubmit = useCallback(() => {
		const err = validate(rawDigits, rawDigits, country)
		setPhoneError(err)
		return !err
	}, [rawDigits, country])

	/** Returns the full international phone number */
	const getFullNumber = useCallback(() => {
		return country.prefix + normalizeDigits(rawDigits, country)
	}, [rawDigits, country])

	const reset = useCallback(() => {
		setRawDigits('')
		setPhoneError('')
		setCountry(COUNTRIES[0])
		setShowDropdown(false)
	}, [])

	const displayValue = formatForDisplay(rawDigits, country)

	return {
		country,
		rawDigits,
		displayValue,
		phoneError,
		showDropdown,
		dropdownRef,
		setShowDropdown,
		handlePhoneChange,
		handlePhoneKeyDown,
		selectCountry,
		validateOnSubmit,
		getFullNumber,
		reset,
		setPhoneError,
	}
}
