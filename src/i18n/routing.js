import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	locales: ['uk', 'en'],
	defaultLocale: 'uk',
	localePrefix: 'as-needed',
	// Локаль зберігатиметься в cookie, щоб користувач залишався на en
})

export const LOCALE_COOKIE = 'NEXT_LOCALE'
