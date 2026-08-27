import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

// Static asset folders - skip locale rewrite (matcher already excludes /api).
const SKIP_PREFIXES = [
	'/uploads',
	'/logos',
	'/comments',
	'/tiktoklogo',
	'/referral',
	'/.well-known',
]

function shouldSkip(pathname) {
	if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) return true
	if (pathname.includes('.')) return true
	return false
}

/**
 * Next.js 16 renamed middleware → proxy. Without this rewrite, paths like
 * `/register` are matched as `[locale]=register` and the layout calls notFound().
 */
export default function proxy(request) {
	const { pathname } = request.nextUrl

	if (shouldSkip(pathname)) {
		return NextResponse.next()
	}

	return intlMiddleware(request)
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
