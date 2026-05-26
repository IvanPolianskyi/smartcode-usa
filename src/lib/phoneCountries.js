import { getCountryCallingCode, getCountries } from 'libphonenumber-js'
import { EUROPE_COUNTRY } from './phoneEurope'

/** @typedef {{ code: string, dialCode: string, prefix: string, flag: string, nameUk: string, nameEn: string, search: string }} PhoneCountry */

/** @type {Record<string, { nameUk: string, nameEn: string, extra?: string }>} */
const NAMES = {
	AD: { nameUk: 'Андорра', nameEn: 'Andorra' },
	AL: { nameUk: 'Албанія', nameEn: 'Albania', extra: 'albania' },
	AT: { nameUk: 'Австрія', nameEn: 'Austria', extra: 'österreich osterreich' },
	AX: { nameUk: 'Аландські острови', nameEn: 'Åland Islands', extra: 'aland' },
	BA: { nameUk: 'Боснія і Герцеговина', nameEn: 'Bosnia and Herzegovina', extra: 'bosnia' },
	BE: { nameUk: 'Бельгія', nameEn: 'Belgium', extra: 'belgique belgie' },
	BG: { nameUk: 'Болгарія', nameEn: 'Bulgaria', extra: 'bulgaria' },
	CH: { nameUk: 'Швейцарія', nameEn: 'Switzerland', extra: 'suisse schweiz' },
	CY: { nameUk: 'Кіпр', nameEn: 'Cyprus' },
	CZ: { nameUk: 'Чехія', nameEn: 'Czechia', extra: 'czech republic чехия' },
	DE: { nameUk: 'Німеччина', nameEn: 'Germany', extra: 'deutschland germany німечина' },
	DK: { nameUk: 'Данія', nameEn: 'Denmark' },
	EE: { nameUk: 'Естонія', nameEn: 'Estonia' },
	ES: { nameUk: 'Іспанія', nameEn: 'Spain', extra: 'espana españa' },
	FI: { nameUk: 'Фінляндія', nameEn: 'Finland', extra: 'suomi' },
	FO: { nameUk: 'Фарерські острови', nameEn: 'Faroe Islands', extra: 'faroe' },
	FR: { nameUk: 'Франція', nameEn: 'France' },
	GB: { nameUk: 'Великобританія', nameEn: 'United Kingdom', extra: 'uk britain england англія британія' },
	GE: { nameUk: 'Грузія', nameEn: 'Georgia', extra: 'საქართველო' },
	GG: { nameUk: 'Гернсі', nameEn: 'Guernsey' },
	GI: { nameUk: 'Гібралтар', nameEn: 'Gibraltar' },
	GR: { nameUk: 'Греція', nameEn: 'Greece', extra: 'ελλάδα hellas' },
	HR: { nameUk: 'Хорватія', nameEn: 'Croatia', extra: 'hrvatska' },
	HU: { nameUk: 'Угорщина', nameEn: 'Hungary', extra: 'magyarorszag' },
	IE: { nameUk: 'Ірландія', nameEn: 'Ireland', extra: 'eire' },
	IS: { nameUk: 'Ісландія', nameEn: 'Iceland' },
	IT: { nameUk: 'Італія', nameEn: 'Italy', extra: 'italia' },
	IM: { nameUk: 'Острів Мен', nameEn: 'Isle of Man', extra: 'man island' },
	JE: { nameUk: 'Джерсі', nameEn: 'Jersey' },
	LI: { nameUk: 'Ліхтенштейн', nameEn: 'Liechtenstein' },
	LT: { nameUk: 'Литва', nameEn: 'Lithuania', extra: 'lietuva' },
	LU: { nameUk: 'Люксембург', nameEn: 'Luxembourg' },
	LV: { nameUk: 'Латвія', nameEn: 'Latvia', extra: 'latvija' },
	MC: { nameUk: 'Монако', nameEn: 'Monaco' },
	MD: { nameUk: 'Молдова', nameEn: 'Moldova', extra: 'moldova romania' },
	ME: { nameUk: 'Чорногорія', nameEn: 'Montenegro', extra: 'crna gora' },
	MK: { nameUk: 'Північна Македонія', nameEn: 'North Macedonia', extra: 'macedonia македонія' },
	MT: { nameUk: 'Мальта', nameEn: 'Malta' },
	NL: { nameUk: 'Нідерланди', nameEn: 'Netherlands', extra: 'holland голландія' },
	NO: { nameUk: 'Норвегія', nameEn: 'Norway', extra: 'norge' },
	PL: { nameUk: 'Польща', nameEn: 'Poland', extra: 'polska poland' },
	PT: { nameUk: 'Португалія', nameEn: 'Portugal' },
	RO: { nameUk: 'Румунія', nameEn: 'Romania', extra: 'romania românia' },
	RS: { nameUk: 'Сербія', nameEn: 'Serbia', extra: 'srbija' },
	SE: { nameUk: 'Швеція', nameEn: 'Sweden', extra: 'sverige' },
	SI: { nameUk: 'Словенія', nameEn: 'Slovenia' },
	SK: { nameUk: 'Словаччина', nameEn: 'Slovakia', extra: 'slovensko' },
	SM: { nameUk: 'Сан-Марино', nameEn: 'San Marino' },
	UA: { nameUk: 'Україна', nameEn: 'Ukraine', extra: 'ukraine украина україна' },
	VA: { nameUk: 'Ватикан', nameEn: 'Vatican City', extra: 'vatican' },
	XK: { nameUk: 'Косово', nameEn: 'Kosovo', extra: 'kosova' },
}

const enNames = new Intl.DisplayNames(['en'], { type: 'region' });
const ukNames = new Intl.DisplayNames(['uk'], { type: 'region' });

function buildCountry(iso) {
	let dialCode
	try {
		dialCode = getCountryCallingCode(iso)
	} catch {
		return null
	}
	
	const meta = NAMES[iso] || {}
	let nameUk = meta.nameUk
	let nameEn = meta.nameEn
	try {
		if (!nameUk) nameUk = ukNames.of(iso)
		if (!nameEn) nameEn = enNames.of(iso)
	} catch {}
	if (!nameUk) nameUk = iso
	if (!nameEn) nameEn = iso

	const search = [
		iso,
		nameUk,
		nameEn,
		meta.extra || '',
		dialCode,
		`+${dialCode}`,
	].join(' ').toLowerCase()

	return {
		code: iso,
		dialCode,
		prefix: `+${dialCode}`,
		flag: `https://flagcdn.com/w40/${iso.toLowerCase()}.png`,
		nameUk,
		nameEn,
		search,
	}
}

export const GLOBAL_PHONE_COUNTRIES = getCountries()
	.map(buildCountry)
	.filter(Boolean)
	.sort((a, b) => {
		if (a.code === 'UA') return -1
		if (b.code === 'UA') return 1
		return a.nameEn.localeCompare(b.nameEn, 'en')
	})

export const EUROPEAN_PHONE_COUNTRIES = GLOBAL_PHONE_COUNTRIES.filter(c => EUROPE_COUNTRY.has(c.code))
	.sort((a, b) => {
		if (a.code === 'UA') return -1
		if (b.code === 'UA') return 1
		return a.nameUk.localeCompare(b.nameUk, 'uk')
	})

export const PHONE_COUNTRY_BY_CODE = new Map(
	GLOBAL_PHONE_COUNTRIES.map((c) => [c.code, c])
)

export const DIAL_CODES_DESC = [...new Set(GLOBAL_PHONE_COUNTRIES.map((c) => c.dialCode))].sort(
	(a, b) => b.length - a.length
)

export function filterPhoneCountries(query, locale = 'uk') {
	const sourceList = locale === 'en' ? GLOBAL_PHONE_COUNTRIES : EUROPEAN_PHONE_COUNTRIES
	const q = String(query ?? '').trim().toLowerCase()
	if (!q) return sourceList
	const digits = q.replace(/\D/g, '')
	return sourceList.filter((c) => {
		if (c.search.includes(q)) return true
		if (digits && (c.dialCode.includes(digits) || c.dialCode.startsWith(digits))) return true
		return false
	})
}

export function getPhoneCountry(iso) {
	return PHONE_COUNTRY_BY_CODE.get(String(iso ?? '').toUpperCase())
}
