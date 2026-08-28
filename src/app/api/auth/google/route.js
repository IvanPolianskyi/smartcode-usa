import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
	buildGoogleAuthUrl,
	createOAuthState,
	getGoogleOAuthConfig,
	getSiteUrl,
	GOOGLE_OAUTH_REDIRECT_COOKIE,
	GOOGLE_OAUTH_STATE_COOKIE,
	sanitizeOAuthRedirect,
} from '@/lib/googleOAuth'

const OAUTH_COOKIE_MAX_AGE = 60 * 10

function oauthCookieOptions() {
	return {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: OAUTH_COOKIE_MAX_AGE,
	}
}

/**
 * GET /api/auth/google?redirect=/dashboard
 * Starts the Google OAuth flow (CSRF state stored in httpOnly cookies).
 */
export async function GET(request) {
	const config = getGoogleOAuthConfig()
	if (!config) {
		return NextResponse.redirect(
			new URL('/login?error=google_config', getSiteUrl())
		)
	}

	const { searchParams } = new URL(request.url)
	const redirectTo = sanitizeOAuthRedirect(searchParams.get('redirect'))
	const state = createOAuthState()

	const cookieStore = await cookies()
	cookieStore.set(GOOGLE_OAUTH_STATE_COOKIE, state, oauthCookieOptions())
	cookieStore.set(
		GOOGLE_OAUTH_REDIRECT_COOKIE,
		redirectTo,
		oauthCookieOptions()
	)

	const authUrl = buildGoogleAuthUrl({ state })
	return NextResponse.redirect(authUrl)
}
