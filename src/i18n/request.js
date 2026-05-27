import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

async function loadMessages(locale) {
	const [base, homeSections, coursePages, pages, dashboard, lms, admin, ofertaUnified] =
		await Promise.all([
			import(`../../messages/${locale}.json`),
			import(`../../messages/${locale}/homeSections.json`),
			import(`../../messages/${locale}/coursePages.json`),
			import(`../../messages/${locale}/pages.json`),
			import(`../../messages/${locale}/dashboard.json`),
			import(`../../messages/${locale}/lms.json`),
			import(`../../messages/${locale}/admin.json`),
			import(`../../messages/oferta-unified.json`),
		])

	return {
		...base.default,
		homeSections: homeSections.default,
		coursePages: coursePages.default,
		pages: {
			...pages.default,
			oferta: ofertaUnified.default,
		},
		dashboard: dashboard.default,
		lms: lms.default,
		admin: admin.default,
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
