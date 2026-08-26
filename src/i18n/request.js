import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

async function importMessages(locale, name) {
	try {
		if (name === 'base') {
			return (await import(`../../messages/${locale}.json`)).default
		}
		return (await import(`../../messages/${locale}/${name}.json`)).default
	} catch {
		if (locale === 'en') {
			if (name === 'base') {
				return (await import('../../messages/uk.json')).default
			}
			return (await import(`../../messages/uk/${name}.json`)).default
		}
		throw new Error(`Missing messages: ${locale}/${name}`)
	}
}

async function loadMessages(locale) {
	const [base, homeSections, coursePages, pages, dashboard, lms, admin, teacher] =
		await Promise.all([
			importMessages(locale, 'base'),
			importMessages(locale, 'homeSections'),
			importMessages(locale, 'coursePages'),
			importMessages(locale, 'pages'),
			importMessages(locale, 'dashboard'),
			importMessages(locale, 'lms'),
			importMessages(locale, 'admin'),
			importMessages(locale, 'teacher'),
		])

	return {
		...base,
		homeSections,
		coursePages,
		pages,
		dashboard,
		lms,
		admin,
		teacher,
	}
}

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale

	if (!locale || !routing.locales.includes(locale)) {
		locale = routing.defaultLocale
	}

	const messages = await loadMessages(locale)

	return {
		locale,
		messages,
	}
})
