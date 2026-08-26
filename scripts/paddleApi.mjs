/**
 * Thin Paddle Billing REST client for the catalogue scripts.
 *
 * The app's own src/lib/paddle.js stays webhook- and portal-shaped; these
 * scripts need list/create/update on products and prices, which the app must
 * never do at runtime.
 */

const LIVE_API = 'https://api.paddle.com'
const SANDBOX_API = 'https://sandbox-api.paddle.com'

export function paddleEnvName() {
	return (process.env.PADDLE_ENV || 'sandbox') === 'production'
		? 'production'
		: 'sandbox'
}

export function apiBase() {
	return paddleEnvName() === 'production' ? LIVE_API : SANDBOX_API
}

export function requireApiKey() {
	const key = process.env.PADDLE_API_KEY
	if (!key) {
		throw new Error(
			'PADDLE_API_KEY is not set. Paddle Dashboard > Developer tools > Authentication.'
		)
	}
	if (/^test_paddle_/.test(key) || /^<.*>$/.test(key)) {
		throw new Error(
			`PADDLE_API_KEY looks like a placeholder ("${key.slice(0, 12)}…"). Paste the real key first.`
		)
	}
	return key
}

export async function paddleRequest(path, { method = 'GET', body } = {}) {
	const response = await fetch(`${apiBase()}${path}`, {
		method,
		headers: {
			authorization: `Bearer ${requireApiKey()}`,
			'content-type': 'application/json',
		},
		body: body ? JSON.stringify(body) : undefined,
	})

	const text = await response.text()
	let payload = null
	try {
		payload = text ? JSON.parse(text) : null
	} catch {
		// reported below with the raw text
	}

	if (!response.ok) {
		const detail =
			payload?.error?.detail ||
			payload?.error?.code ||
			text.slice(0, 400) ||
			`HTTP ${response.status}`
		const error = new Error(`Paddle ${method} ${path} failed (${response.status}): ${detail}`)
		error.status = response.status
		error.payload = payload
		throw error
	}

	return payload
}

/** Walk Paddle's cursor pagination and return every row. */
export async function paddleList(path) {
	const rows = []
	const separator = path.includes('?') ? '&' : '?'
	let after = null

	for (let page = 0; page < 50; page += 1) {
		const url = after
			? `${path}${separator}per_page=100&after=${encodeURIComponent(after)}`
			: `${path}${separator}per_page=100`
		const payload = await paddleRequest(url)
		const data = payload?.data || []
		rows.push(...data)
		if (!payload?.meta?.pagination?.has_more) break
		after = data.length ? data[data.length - 1].id : null
		if (!after) break
	}

	return rows
}
