import { routing } from '@/i18n/routing'

const BASE_URL = 'https://smartcode-academy.com'

export const SITE_URL = new URL(BASE_URL)

function resolveLocale(locale) {
	if (locale && routing.locales.includes(locale)) {
		return locale
	}
	return routing.defaultLocale
}

export function localePath(locale, path = '') {
	const normalized = path.startsWith('/') ? path : `/${path}`
	return normalized === '/' ? '' : normalized
}

/** Indexing metadata - always UK (no EN noindex branch). */
export function getSearchIndexingMetadata() {
	return {}
}

export function buildAlternates(locale, path = '') {
	const normalized = path || '/'
	const pagePath = normalized === '/' ? '' : normalized
	const url = `${BASE_URL}${pagePath}`

	return {
		canonical: url,
		languages: {
			'en': url,
			'x-default': url,
		},
	}
}

export async function getLocalizedMetadata(locale, pageKey) {
	const resolvedLocale = resolveLocale(locale)
	const { getTranslations } = await import('next-intl/server')
	const t = await getTranslations({
		locale: resolvedLocale,
		namespace: `metadata.${pageKey}`,
	})

	return {
		metadataBase: SITE_URL,
		title: t('title'),
		description: t('description'),
		...getSearchIndexingMetadata(),
		other: {
			'content-language': 'uk-UA',
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			locale: 'uk_UA',
			type: 'website',
			siteName: 'SmartCode Academy',
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
		},
	}
}
