import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { issueAuthSession } from '@/lib/auth'
import { sendWelcomeEmail } from '@/lib/email'
import { resolveGoogleAuthUser } from '@/lib/googleAuthUser'
import {
	exchangeGoogleCode,
	fetchGoogleUserInfo,
	getGoogleOAuthConfig,
	GOOGLE_OAUTH_REDIRECT_COOKIE,
	GOOGLE_OAUTH_STATE_COOKIE,
	sanitizeOAuthRedirect,
} from '@/lib/googleOAuth'
import {
	recordFunnelEvent,
	stitchVisitorToUser,
	VISITOR_COOKIE,
} from '@/lib/analyticsStore'

function clearOAuthCookies(cookieStore) {
	const base = {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 0,
	}
	cookieStore.set(GOOGLE_OAUTH_STATE_COOKIE, '', base)
	cookieStore.set(GOOGLE_OAUTH_REDIRECT_COOKIE, '', base)
}

function loginErrorRedirect(siteUrl, code) {
	return NextResponse.redirect(
		new URL(`/login?error=${encodeURIComponent(code)}`, siteUrl)
	)
}

/**
 * GET /api/auth/google/callback?code=...&state=...
 */
export async function GET(request) {
	const config = getGoogleOAuthConfig()
	const siteUrl = config?.siteUrl || 'http://localhost:3000'
	const cookieStore = await cookies()

	const { searchParams } = new URL(request.url)
	const oauthError = searchParams.get('error')
	if (oauthError) {
		clearOAuthCookies(cookieStore)
		return loginErrorRedirect(siteUrl, 'google_denied')
	}

	const code = searchParams.get('code') || ''
	const state = searchParams.get('state') || ''
	const savedState = cookieStore.get(GOOGLE_OAUTH_STATE_COOKIE)?.value || ''
	const redirectTo = sanitizeOAuthRedirect(
		cookieStore.get(GOOGLE_OAUTH_REDIRECT_COOKIE)?.value
	)

	clearOAuthCookies(cookieStore)

	if (!config) {
		return loginErrorRedirect(siteUrl, 'google_config')
	}

	if (!code || !state || !savedState || state !== savedState) {
		return loginErrorRedirect(siteUrl, 'google_state')
	}

	let profile
	try {
		const tokens = await exchangeGoogleCode(code)
		profile = await fetchGoogleUserInfo(tokens.access_token)
	} catch (err) {
		console.error('[google-callback] OAuth exchange failed:', err?.message || err)
		return loginErrorRedirect(siteUrl, 'google_token')
	}

	const referralId = cookieStore.get('referralId')?.value || null

	let user
	let isNewUser = false
	try {
		const resolved = await resolveGoogleAuthUser({
			sub: profile.sub,
			email: profile.email,
			emailVerified: Boolean(profile.email_verified),
			name: profile.name,
			referralId,
		})
		user = resolved.user
		isNewUser = resolved.isNewUser
	} catch (err) {
		const code = String(err?.message || 'google_internal')
		const known = new Set([
			'google_email_unverified',
			'google_admin_blocked',
			'google_account_conflict',
			'google_profile',
		])
		return loginErrorRedirect(
			siteUrl,
			known.has(code) ? code : 'google_internal'
		)
	}

	const userId = user._id.toString()
	await issueAuthSession(userId)

	if (isNewUser) {
		const visitorId = cookieStore.get(VISITOR_COOKIE)?.value || null
		const now = new Date()
		await stitchVisitorToUser({ visitorId, userId })
		await recordFunnelEvent({
			step: 'sign_up',
			visitorId,
			userId,
			path: '/register',
			params: { method: 'google' },
			dedupeKey: `sign_up:${userId}`,
			occurredAt: now,
		})

		sendWelcomeEmail({
			to: user.email,
			name: user.name,
		}).catch((err) => {
			console.error('[google-callback] Welcome email failed:', err)
		})
	}

	return NextResponse.redirect(new URL(redirectTo, siteUrl))
}
