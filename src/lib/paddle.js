import crypto from 'node:crypto'

/**
 * Paddle Billing client and webhook signature verification.
 *
 * Everything provider-specific lives here. The rest of the app reads access
 * through `entitlements.js` and never learns which processor is behind it.
 */

const LIVE_API = 'https://api.paddle.com'
const SANDBOX_API = 'https://sandbox-api.paddle.com'

/** Reject signatures older than this — a captured request must not replay later. */
const MAX_SIGNATURE_AGE_SEC = 5 * 60

export function isSandbox() {
	return (process.env.PADDLE_ENV || 'sandbox') !== 'production'
}

export function getApiBase() {
	return isSandbox() ? SANDBOX_API : LIVE_API
}

function requireEnv(name) {
	const value = process.env[name]
	if (!value) throw new Error(`Missing ${name} environment variable`)
	return value
}

/**
 * Verify a `Paddle-Signature` header against the raw request body.
 *
 * The body must be the exact bytes Paddle sent. Parsing the JSON first and
 * re-serialising it changes key order and whitespace, and the signature will
 * never match — this is the single most common way this integration breaks.
 *
 * @param {string} rawBody exact request body as text
 * @param {string} signatureHeader value of the `Paddle-Signature` header
 * @param {string} [secret] webhook secret; defaults to PADDLE_WEBHOOK_SECRET
 * @returns {{ ok: boolean, reason?: string }}
 */
export function verifyWebhookSignature(rawBody, signatureHeader, secret = process.env.PADDLE_WEBHOOK_SECRET) {
	if (!secret) return { ok: false, reason: 'missing_secret' }
	if (!signatureHeader) return { ok: false, reason: 'missing_signature' }
	if (typeof rawBody !== 'string') return { ok: false, reason: 'missing_body' }

	// Header format: `ts=1671552777;h1=eb4d0dc8...`
	const parts = new Map()
	for (const chunk of signatureHeader.split(';')) {
		const index = chunk.indexOf('=')
		if (index === -1) continue
		parts.set(chunk.slice(0, index).trim(), chunk.slice(index + 1).trim())
	}

	const ts = parts.get('ts')
	const h1 = parts.get('h1')
	if (!ts || !h1) return { ok: false, reason: 'malformed_signature' }

	const timestamp = Number(ts)
	if (!Number.isFinite(timestamp)) return { ok: false, reason: 'bad_timestamp' }

	const ageSec = Math.abs(Date.now() / 1000 - timestamp)
	if (ageSec > MAX_SIGNATURE_AGE_SEC) return { ok: false, reason: 'stale_signature' }

	const expected = crypto
		.createHmac('sha256', secret)
		.update(`${ts}:${rawBody}`)
		.digest('hex')

	const expectedBuffer = Buffer.from(expected, 'hex')
	const receivedBuffer = Buffer.from(h1, 'hex')

	if (expectedBuffer.length !== receivedBuffer.length) {
		return { ok: false, reason: 'signature_mismatch' }
	}

	if (!crypto.timingSafeEqual(expectedBuffer, receivedBuffer)) {
		return { ok: false, reason: 'signature_mismatch' }
	}

	return { ok: true }
}

async function paddleRequest(path, { method = 'GET', body } = {}) {
	const response = await fetch(`${getApiBase()}${path}`, {
		method,
		headers: {
			authorization: `Bearer ${requireEnv('PADDLE_API_KEY')}`,
			'content-type': 'application/json',
		},
		body: body ? JSON.stringify(body) : undefined,
	})

	const text = await response.text()
	let payload = null
	try {
		payload = text ? JSON.parse(text) : null
	} catch {
		// fall through — reported below with the raw text
	}

	if (!response.ok) {
		const detail = payload?.error?.detail || text.slice(0, 300)
		throw new Error(`Paddle ${method} ${path} failed (${response.status}): ${detail}`)
	}

	return payload?.data ?? null
}

/**
 * A hosted portal session where the customer can update their card, see
 * invoices and cancel. Cancellation must be self-service — a processor treats
 * "email us to cancel" as a red flag, and so do customers.
 */
export async function createPortalSession(paddleCustomerId, subscriptionIds = []) {
	if (!paddleCustomerId) throw new Error('paddleCustomerId is required')

	const data = await paddleRequest(`/customers/${paddleCustomerId}/portal-sessions`, {
		method: 'POST',
		body: subscriptionIds.length ? { subscription_ids: subscriptionIds } : {},
	})

	const subscriptionUrls = data?.urls?.subscriptions?.[0] || {}

	return {
		overviewUrl: data?.urls?.general?.overview || null,
		cancelUrl: subscriptionUrls.cancel_subscription || null,
		updatePaymentUrl: subscriptionUrls.update_subscription_payment_method || null,
	}
}

export async function getSubscriptionFromPaddle(subscriptionId) {
	if (!subscriptionId) throw new Error('subscriptionId is required')
	return paddleRequest(`/subscriptions/${subscriptionId}`)
}

/** Cancel at period end rather than immediately — the customer paid for it. */
export async function cancelSubscription(subscriptionId, { immediately = false } = {}) {
	return paddleRequest(`/subscriptions/${subscriptionId}/cancel`, {
		method: 'POST',
		body: { effective_from: immediately ? 'immediately' : 'next_billing_period' },
	})
}

function firstItem(subscription) {
	const items = subscription?.items
	return Array.isArray(items) && items.length ? items[0] : null
}

/**
 * Flatten a Paddle subscription object into the shape we store.
 * Everything downstream reads these fields, not Paddle's payload.
 */
export function normalizeSubscription(subscription) {
	const item = firstItem(subscription)

	const trialEndsAtRaw = item?.trial_dates?.ends_at || null
	const periodEndRaw = subscription?.current_billing_period?.ends_at || null
	const scheduledChange = subscription?.scheduled_change || null

	return {
		paddleSubscriptionId: subscription?.id || null,
		paddleCustomerId: subscription?.customer_id || null,
		priceId: item?.price?.id || null,
		productId: item?.price?.product_id || null,
		status: subscription?.status || null,
		billingInterval: subscription?.billing_cycle?.interval || null,
		trialEndsAt: trialEndsAtRaw ? new Date(trialEndsAtRaw) : null,
		currentPeriodEnd: periodEndRaw ? new Date(periodEndRaw) : null,
		cancelAtPeriodEnd: scheduledChange?.action === 'cancel',
		scheduledChangeAt: scheduledChange?.effective_at
			? new Date(scheduledChange.effective_at)
			: null,
		customData: subscription?.custom_data || null,
	}
}

/**
 * The userId we attached at checkout, in `custom_data`. Without it a webhook
 * cannot be matched to an account, so checkout must always send it.
 */
export function readUserIdFromCustomData(customData) {
	const value = customData?.userId ?? customData?.user_id
	return value ? String(value) : null
}
