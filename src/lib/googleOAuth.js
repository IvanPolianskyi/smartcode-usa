import crypto from 'crypto'

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_URL = 'https://openidconnect.googleapis.com/v1/userinfo'

export const GOOGLE_OAUTH_STATE_COOKIE = 'google_oauth_state'
export const GOOGLE_OAUTH_REDIRECT_COOKIE = 'google_oauth_redirect'

export function getSiteUrl() {
	return (
		process.env.NEXT_PUBLIC_SITE_URL ||
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
		'http://localhost:3000'
	).replace(/\/$/, '')
}

export function getGoogleOAuthConfig() {
	const clientId = String(process.env.GOOGLE_CLIENT_ID || '').trim()
	const clientSecret = String(process.env.GOOGLE_CLIENT_SECRET || '').trim()
	if (!clientId || !clientSecret) return null

	const siteUrl = getSiteUrl()
	return {
		clientId,
		clientSecret,
		redirectUri: `${siteUrl}/api/auth/google/callback`,
		siteUrl,
	}
}

export function isGoogleOAuthConfigured() {
	return Boolean(getGoogleOAuthConfig())
}

/** Only same-origin relative paths — blocks open redirects. */
export function sanitizeOAuthRedirect(redirect) {
	const value = String(redirect || '').trim()
	if (!value.startsWith('/') || value.startsWith('//')) {
		return '/dashboard'
	}
	return value
}

export function createOAuthState() {
	return crypto.randomBytes(32).toString('hex')
}

export function buildGoogleAuthUrl({ state }) {
	const config = getGoogleOAuthConfig()
	if (!config) {
		throw new Error('Google OAuth is not configured')
	}

	const params = new URLSearchParams({
		client_id: config.clientId,
		redirect_uri: config.redirectUri,
		response_type: 'code',
		scope: 'openid email profile',
		state,
		access_type: 'online',
		prompt: 'select_account',
	})
	return `${GOOGLE_AUTH_URL}?${params.toString()}`
}

export async function exchangeGoogleCode(code) {
	const config = getGoogleOAuthConfig()
	if (!config) {
		throw new Error('Google OAuth is not configured')
	}

	const body = new URLSearchParams({
		code: String(code || ''),
		client_id: config.clientId,
		client_secret: config.clientSecret,
		redirect_uri: config.redirectUri,
		grant_type: 'authorization_code',
	})

	const response = await fetch(GOOGLE_TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body,
	})

	const data = await response.json().catch(() => ({}))
	if (!response.ok) {
		const message = data?.error_description || data?.error || 'token_exchange_failed'
		throw new Error(message)
	}

	if (!data.access_token) {
		throw new Error('missing_access_token')
	}

	return data
}

export async function fetchGoogleUserInfo(accessToken) {
	const response = await fetch(GOOGLE_USERINFO_URL, {
		headers: { Authorization: `Bearer ${accessToken}` },
	})
	const data = await response.json().catch(() => ({}))
	if (!response.ok) {
		const message = data?.error_description || data?.error || 'userinfo_failed'
		throw new Error(message)
	}
	return data
}
