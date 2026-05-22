const BASE_URL = 'https://smartcode-academy.com'

export function localePath(locale, path = '') {
	const normalized = path.startsWith('/') ? path : `/${path}`
	if (locale === 'en') {
		return normalized === '/' ? '/en' : `/en${normalized}`
	}
	return normalized === '/' ? '' : normalized
}

export function buildAlternates(locale, path = '') {
	const ukPath = path || '/'
	const enPath = localePath('en', path || '/')
	return {
		canonical: `${BASE_URL}${locale === 'en' ? enPath : ukPath}`,
		languages: {
			'uk-UA': `${BASE_URL}${ukPath === '/' ? '' : ukPath}`,
			'en-US': `${BASE_URL}${enPath}`,
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
