import { defaultCountries } from 'react-international-phone'
import { EUROPE_COUNTRY } from './phoneEurope'

/**
 * Список країн тільки для `react-international-phone` (європа з phoneEurope).
 */
export const phoneInputEuropeCountries = defaultCountries.filter((row) =>
	EUROPE_COUNTRY.has(String(row[1]).toUpperCase())
)

const PREFERRED = [
	'ua',
	'pl',
	'de',
	'ro',
	'md',
	'gb',
	'fr',
	'it',
	'es',
	'cz',
	'sk',
	'hu',
	'at',
	'ch',
	'be',
	'nl',
	'se',
	'no',
	'dk',
	'fi',
	'ie',
	'pt',
	'gr',
	'ee',
	'lv',
	'lt',
	'li',
	'lu',
	'is',
	'mt',
	'cy',
	'si',
	'hr',
	'bg',
	'me',
	'rs',
	'ba',
	'mk',
	'xk',
	'al',
	'ad',
	'sm',
	'mc',
	'ge',
	'fo',
	'gg',
	'je',
	'im',
	'gi',
	'va',
]

const hasIso2 = (iso) => phoneInputEuropeCountries.some((r) => r[1] === iso)

export const phoneInputPreferredCountries = PREFERRED.filter((iso) => hasIso2(iso))
