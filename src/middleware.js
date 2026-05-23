import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import { routing } from './i18n/routing'

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

export default function middleware(request) {
	const { pathname } = request.nextUrl

	if (shouldSkip(pathname)) {
		return NextResponse.next()
	}

	return intlMiddleware(request)
}

export const config = {
	matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
