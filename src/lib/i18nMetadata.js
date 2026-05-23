const BASE_URL = 'https://smartcode-academy.com'

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
	const { getTranslations } = await import('next-intl/server')
	const t = await getTranslations({ locale, namespace: `metadata.${pageKey}` })
	const ogLocale = locale === 'uk' ? 'uk_UA' : 'en_US'

	return {
		title: t('title'),
		description: t('description'),
		...getSearchIndexingMetadata(locale),
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
