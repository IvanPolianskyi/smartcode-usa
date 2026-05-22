import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	locales: ['uk', 'en'],
	defaultLocale: 'uk',
	localePrefix: 'as-needed',
	localeCookie: {
		name: 'NEXT_LOCALE',
		maxAge: 60 * 60 * 24 * 365,
	},
})

export const LOCALE_COOKIE = 'NEXT_LOCALE'
