import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import { routing, LOCALE_COOKIE } from './i18n/routing'

const intlMiddleware = createMiddleware({
	...routing,
	localeDetection: false,
})

const SKIP_PREFIXES = ['/api', '/uploads', '/logos', '/comments', '/projects', '/tiktoklogo', '/referral']

function shouldSkip(pathname) {
	if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) return true
	if (pathname.includes('.')) return true
	return false
}

function getCountry(request) {
	return (
		request.geo?.country ||
		request.headers.get('x-vercel-ip-country') ||
		request.headers.get('cf-ipcountry') ||
		''
	).toUpperCase()
}

function localeFromCountry(country) {
	if (country === 'UA') return 'uk'
	return 'en'
}

export default function middleware(request) {
	const { pathname } = request.nextUrl

	if (shouldSkip(pathname)) {
		return NextResponse.next()
	}

	const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
	const hasEnPrefix = pathname === '/en' || pathname.startsWith('/en/')

	if (!cookieLocale && !hasEnPrefix) {
		const country = getCountry(request)
		const preferred = localeFromCountry(country)

		if (preferred === 'en') {
			const url = request.nextUrl.clone()
			url.pathname = pathname === '/' ? '/en' : `/en${pathname}`
			const response = NextResponse.redirect(url)
			response.cookies.set(LOCALE_COOKIE, 'en', {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				sameSite: 'lax',
			})
			return response
		}
	}

	return intlMiddleware(request)
}

export const config = {
	matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
