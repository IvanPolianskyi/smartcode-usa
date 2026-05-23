import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	locales: ['uk', 'en'],
	defaultLocale: 'uk',
	localePrefix: 'as-needed',
	// Локаль лише з URL (/en/...); без cookie та Accept-Language
	localeCookie: false,
})

export const LOCALE_COOKIE = 'NEXT_LOCALE'
