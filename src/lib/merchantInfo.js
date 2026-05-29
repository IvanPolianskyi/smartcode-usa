/**
 * Merchant / seller details for legal pages and footer.
 * Override via NEXT_PUBLIC_MERCHANT_* in .env when needed.
 */

const DEFAULT_LEGAL_NAME_UK = 'ФОП Полянський Іван Іванович'
const DEFAULT_LEGAL_NAME_EN =
	'Private Entrepreneur Ivan Ivanovych Polyanskyi (FOP)'
const DEFAULT_TAX_ID = '3923908357'
const DEFAULT_LEGAL_ADDRESS =
	'79000, м. Львів, вул. Пасічна, буд. 162 (офісний центр IQ Park)'
const DEFAULT_ACTUAL_ADDRESS = DEFAULT_LEGAL_ADDRESS
const DEFAULT_PHONE = '+380951457248'
const DEFAULT_EMAIL = 'smartcodeacadem@gmail.com'

const DEFAULT_BANK = {
	iban: 'UA123220010000026002380006329',
	bankNameUk: 'АТ «УНІВЕРСАЛ БАНК»',
	bankNameEn: 'JSC Universal Bank',
	mfo: '322001',
	bankEdrpou: '21133352',
}

export function getMerchantInfo(locale = 'en') {
	const legalNameUk =
		process.env.NEXT_PUBLIC_MERCHANT_LEGAL_NAME_UK || DEFAULT_LEGAL_NAME_UK
	const legalNameEn =
		process.env.NEXT_PUBLIC_MERCHANT_LEGAL_NAME ||
		process.env.NEXT_PUBLIC_MERCHANT_LEGAL_NAME_EN ||
		DEFAULT_LEGAL_NAME_EN
	const taxId = process.env.NEXT_PUBLIC_MERCHANT_TAX_ID || DEFAULT_TAX_ID
	const legalAddress =
		process.env.NEXT_PUBLIC_MERCHANT_LEGAL_ADDRESS || DEFAULT_LEGAL_ADDRESS
	const actualAddress =
		process.env.NEXT_PUBLIC_MERCHANT_ACTUAL_ADDRESS || DEFAULT_ACTUAL_ADDRESS
	const phone = process.env.NEXT_PUBLIC_MERCHANT_PHONE || DEFAULT_PHONE
	const email =
		process.env.NEXT_PUBLIC_MERCHANT_EMAIL || DEFAULT_EMAIL
	const website =
		process.env.NEXT_PUBLIC_MERCHANT_WEBSITE || 'https://smartcode-academy.com'

	const resolvedLocale = locale === 'uk' ? 'uk' : 'en'

	return {
		legalName: resolvedLocale === 'uk' ? legalNameUk : legalNameEn,
		legalNameUk,
		legalNameEn,
		taxId,
		legalAddress,
		actualAddress,
		phone,
		phoneDisplay: phone ? formatPhoneDisplay(phone) : '',
		email,
		website,
		brandName: 'SmartCode Academy',
		bank: {
			iban: process.env.NEXT_PUBLIC_MERCHANT_IBAN || DEFAULT_BANK.iban,
			bankName:
				resolvedLocale === 'uk'
					? process.env.NEXT_PUBLIC_MERCHANT_BANK_NAME_UK ||
						DEFAULT_BANK.bankNameUk
					: process.env.NEXT_PUBLIC_MERCHANT_BANK_NAME_EN ||
						DEFAULT_BANK.bankNameEn,
			mfo: process.env.NEXT_PUBLIC_MERCHANT_MFO || DEFAULT_BANK.mfo,
			bankEdrpou:
				process.env.NEXT_PUBLIC_MERCHANT_BANK_EDRPOU ||
				DEFAULT_BANK.bankEdrpou,
		},
	}
}

function formatPhoneDisplay(phone) {
	const digits = String(phone).replace(/\D/g, '')
	if (digits.length === 12 && digits.startsWith('380')) {
		return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`
	}
	return phone.startsWith('+') ? phone : `+${phone}`
}

/** Map merchant fields onto oferta section 5 field keys */
export function getOfertaContactFields(merchant) {
	return {
		companyName: { value: merchant.legalName },
		taxId: { value: merchant.taxId || null },
		legalAddress: { value: merchant.legalAddress || null },
		actualAddress: { value: merchant.actualAddress || null },
		phone: merchant.phoneDisplay ? { value: merchant.phoneDisplay } : null,
		email: { value: merchant.email },
		website: { value: merchant.website },
	}
}
