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
	if (locale === 'en') {
		return normalized === '/' ? '/en' : `/en${normalized}`
	}
	return normalized === '/' ? '' : normalized
}

/** noindex для /en — лише прямий перехід, не індексація в Google */
export function getSearchIndexingMetadata(locale) {
	if (locale !== 'en') return {}

	return {
		robots: {
			index: false,
			follow: true,
			googleBot: {
				index: false,
				follow: true,
			},
		},
	}
}

export function buildAlternates(locale, path = '') {
	const normalized = path || '/'
	const ukPath = normalized === '/' ? '' : normalized
	const ukUrl = `${BASE_URL}${ukPath}`

	if (locale === 'en') {
		const enPath = localePath('en', normalized)
		return {
			canonical: `${BASE_URL}${enPath}`,
		}
	}

	return {
		canonical: ukUrl,
		languages: {
			'uk-UA': ukUrl,
			'x-default': ukUrl,
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
	const ogLocale = resolvedLocale === 'uk' ? 'uk_UA' : 'en_US'

	return {
		metadataBase: SITE_URL,
		title: t('title'),
		description: t('description'),
		...getSearchIndexingMetadata(resolvedLocale),
		...(resolvedLocale === 'uk'
			? {
					other: {
						'content-language': 'uk-UA',
					},
				}
			: {}),
		openGraph: {
			title: t('title'),
			description: t('description'),
			locale: ogLocale,
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
