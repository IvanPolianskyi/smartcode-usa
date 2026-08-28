/**
 * Fetch and cache Paddle's public webhook source IPs.
 * Source of truth: GET {sandbox-| }api.paddle.com/ips (no auth).
 * Never hard-code the list — Paddle can change it, and sandbox ≠ live.
 */

import { getApiBase } from '@/lib/paddle'

const CACHE_TTL_MS = 60 * 60 * 1000

let cache = { key: '', fetchedAt: 0, ipv4Cidrs: null }

/**
 * @returns {Promise<string[]>} e.g. ["34.237.3.244/32", ...]
 */
export async function getPaddleWebhookIpv4Cidrs() {
	const url = `${getApiBase()}/ips`
	const now = Date.now()
	if (cache.ipv4Cidrs && cache.key === url && now - cache.fetchedAt < CACHE_TTL_MS) {
		return cache.ipv4Cidrs
	}

	const response = await fetch(url, {
		headers: { accept: 'application/json' },
		cache: 'no-store',
	})
	if (!response.ok) {
		throw new Error(`Could not fetch Paddle IPs (${response.status})`)
	}
	const payload = await response.json()
	const cidrs = payload?.data?.ipv4_cidrs
	if (!Array.isArray(cidrs) || !cidrs.length) {
		throw new Error('Paddle /ips returned no ipv4_cidrs')
	}

	cache = { key: url, fetchedAt: now, ipv4Cidrs: cidrs.map(String) }
	return cache.ipv4Cidrs
}

/** Parse "a.b.c.d" → 32-bit int, or null. */
function ipv4ToInt(ip) {
	const parts = String(ip || '').trim().split('.')
	if (parts.length !== 4) return null
	let n = 0
	for (const part of parts) {
		const octet = Number(part)
		if (!Number.isInteger(octet) || octet < 0 || octet > 255) return null
		n = (n << 8) + octet
	}
	return n >>> 0
}

/**
 * @param {string} ip
 * @param {string} cidr e.g. "34.237.3.244/32"
 */
export function ipv4MatchesCidr(ip, cidr) {
	const [base, bitsRaw] = String(cidr).split('/')
	const bits = Number(bitsRaw)
	const ipInt = ipv4ToInt(ip)
	const baseInt = ipv4ToInt(base)
	if (ipInt === null || baseInt === null || !Number.isInteger(bits) || bits < 0 || bits > 32) {
		return false
	}
	if (bits === 0) return true
	const mask = bits === 32 ? 0xffffffff : (~0 << (32 - bits)) >>> 0
	return (ipInt & mask) === (baseInt & mask)
}

export function ipv4InCidrList(ip, cidrs) {
	return (cidrs || []).some((cidr) => ipv4MatchesCidr(ip, cidr))
}

/**
 * Best-effort client IP for an incoming Next.js request.
 * On Vercel, x-forwarded-for / x-real-ip carries the original client.
 */
export function clientIpFromRequest(request) {
	const forwarded = request.headers.get('x-forwarded-for')
	if (forwarded) {
		const first = forwarded.split(',')[0]?.trim()
		if (first) return first
	}
	return (
		request.headers.get('x-real-ip')?.trim() ||
		request.headers.get('cf-connecting-ip')?.trim() ||
		null
	)
}

/**
 * Reject webhooks that do not come from Paddle's published IPv4 ranges.
 * Signature verification remains the primary authenticity check.
 *
 * Set PADDLE_WEBHOOK_IP_ALLOWLIST=0 to disable (local tunnels / simulators).
 *
 * @returns {Promise<{ ok: true } | { ok: false, reason: string, ip?: string }>}
 */
export async function assertPaddleWebhookIp(request) {
	const flag = process.env.PADDLE_WEBHOOK_IP_ALLOWLIST
	if (flag === '0' || flag === 'false') {
		return { ok: true }
	}

	const ip = clientIpFromRequest(request)
	if (!ip) {
		// No client IP to check. The HMAC signature has already authenticated this
		// request, so refusing here would only drop real payments.
		console.warn('[paddle] webhook with no client IP - allowed on signature')
		return { ok: true }
	}

	// Paddle publishes IPv4 ranges only. If the edge hands us an IPv6 address
	// there is nothing to match it against, and failing closed would reject
	// every webhook the moment Vercel routes over IPv6.
	if (ip.includes(':')) {
		console.warn('[paddle] IPv6 webhook source - allowed on signature:', ip)
		return { ok: true }
	}

	// Skip allowlist for obvious loopback / private (local tunnels, simulators).
	if (
		ip === '127.0.0.1' ||
		ip === '::1' ||
		ip.startsWith('10.') ||
		ip.startsWith('192.168.') ||
		/^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
	) {
		return { ok: true }
	}

	let cidrs
	try {
		cidrs = await getPaddleWebhookIpv4Cidrs()
	} catch (error) {
		console.error('[paddle] IP allowlist fetch failed:', error.message)
		// Do not fail closed. If Paddle's /ips endpoint is down, failing closed
		// rejects every real payment webhook for as long as the outage lasts,
		// and the signature check already proves the request came from Paddle.
		// The allowlist is defence in depth, not the authentication.
		return { ok: true }
	}

	if (!ipv4InCidrList(ip, cidrs)) {
		return { ok: false, reason: 'ip_not_allowlisted', ip }
	}
	return { ok: true }
}
