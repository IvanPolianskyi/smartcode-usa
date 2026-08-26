/**
 * Signature verification tests.
 *
 * Run: node --test src/lib/paddle.test.mjs
 *
 * These cover the ways this check silently fails open: a body that was parsed
 * and re-serialised, a replayed old request, a truncated digest, and a wrong
 * secret. Each of those would hand out free subscriptions if it passed.
 */

import test from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import { verifyWebhookSignature, normalizeSubscription, readCourseIdFromCustomData, isPaddleManagedCustomerId } from './paddle.js'

const SECRET = 'pdl_ntfset_test_secret'

function sign(rawBody, { secret = SECRET, ts = Math.floor(Date.now() / 1000) } = {}) {
	const h1 = crypto.createHmac('sha256', secret).update(`${ts}:${rawBody}`).digest('hex')
	return `ts=${ts};h1=${h1}`
}

const BODY = JSON.stringify({ event_id: 'evt_1', event_type: 'subscription.created' })

test('accepts a correctly signed body', () => {
	const result = verifyWebhookSignature(BODY, sign(BODY), SECRET)
	assert.equal(result.ok, true)
})

test('rejects a body that was re-serialised after parsing', () => {
	const signature = sign(BODY)
	// Same data, different bytes - this is what happens if the route reads
	// req.json() and stringifies it again.
	const reserialised = JSON.stringify(JSON.parse(BODY), null, 2)
	const result = verifyWebhookSignature(reserialised, signature, SECRET)
	assert.equal(result.ok, false)
	assert.equal(result.reason, 'signature_mismatch')
})

test('rejects a replayed signature older than the window', () => {
	const staleTs = Math.floor(Date.now() / 1000) - 60 * 60
	const result = verifyWebhookSignature(BODY, sign(BODY, { ts: staleTs }), SECRET)
	assert.equal(result.ok, false)
	assert.equal(result.reason, 'stale_signature')
})

test('rejects a signature made with the wrong secret', () => {
	const result = verifyWebhookSignature(BODY, sign(BODY, { secret: 'wrong' }), SECRET)
	assert.equal(result.ok, false)
	assert.equal(result.reason, 'signature_mismatch')
})

test('rejects a truncated digest instead of comparing a prefix', () => {
	const valid = sign(BODY)
	const truncated = valid.slice(0, valid.length - 10)
	const result = verifyWebhookSignature(BODY, truncated, SECRET)
	assert.equal(result.ok, false)
})

test('rejects a malformed header', () => {
	assert.equal(verifyWebhookSignature(BODY, 'garbage', SECRET).reason, 'malformed_signature')
	assert.equal(verifyWebhookSignature(BODY, '', SECRET).reason, 'missing_signature')
})

test('rejects when no secret is configured', () => {
	const result = verifyWebhookSignature(BODY, sign(BODY), '')
	assert.equal(result.ok, false)
	assert.equal(result.reason, 'missing_secret')
})

test('normalizeSubscription flattens a trialing subscription', () => {
	const normalized = normalizeSubscription({
		id: 'sub_123',
		customer_id: 'ctm_456',
		status: 'trialing',
		billing_cycle: { interval: 'month', frequency: 1 },
		current_billing_period: { starts_at: '2026-08-26T00:00:00Z', ends_at: '2026-09-02T00:00:00Z' },
		scheduled_change: null,
		custom_data: { userId: '64b7f0c2e1a2b3c4d5e6f708' },
		items: [
			{
				price: { id: 'pri_month', product_id: 'pro_1' },
				trial_dates: { starts_at: '2026-08-26T00:00:00Z', ends_at: '2026-09-02T00:00:00Z' },
			},
		],
	})

	assert.equal(normalized.paddleSubscriptionId, 'sub_123')
	assert.equal(normalized.paddleCustomerId, 'ctm_456')
	assert.equal(normalized.status, 'trialing')
	assert.equal(normalized.priceId, 'pri_month')
	assert.equal(normalized.cancelAtPeriodEnd, false)
	assert.equal(normalized.trialEndsAt.toISOString(), '2026-09-02T00:00:00.000Z')
	assert.equal(normalized.customData.userId, '64b7f0c2e1a2b3c4d5e6f708')
})

test('normalizeSubscription marks a scheduled cancellation', () => {
	const normalized = normalizeSubscription({
		id: 'sub_9',
		customer_id: 'ctm_9',
		status: 'active',
		current_billing_period: { ends_at: '2026-09-26T00:00:00Z' },
		scheduled_change: { action: 'cancel', effective_at: '2026-09-26T00:00:00Z' },
		items: [{ price: { id: 'pri_year', product_id: 'pro_1' } }],
	})

	assert.equal(normalized.cancelAtPeriodEnd, true)
	assert.equal(normalized.trialEndsAt, null)
})

test('normalizeSubscription survives a payload with no items', () => {
	const normalized = normalizeSubscription({ id: 'sub_x', status: 'canceled' })
	assert.equal(normalized.priceId, null)
	assert.equal(normalized.currentPeriodEnd, null)
	assert.equal(normalized.cancelAtPeriodEnd, false)
})

test('readCourseIdFromCustomData reads camelCase and snake_case', () => {
	assert.equal(readCourseIdFromCustomData({ courseId: 'roblox-studio' }), 'roblox-studio')
	assert.equal(readCourseIdFromCustomData({ course_id: 'ai-at-work' }), 'ai-at-work')
	assert.equal(readCourseIdFromCustomData(null), null)
})

test('isPaddleManagedCustomerId rejects placeholders', () => {
	assert.equal(isPaddleManagedCustomerId('ctm_abc'), true)
	assert.equal(isPaddleManagedCustomerId('admin_manual'), false)
	assert.equal(isPaddleManagedCustomerId('local_dev_customer'), false)
	assert.equal(isPaddleManagedCustomerId(''), false)
})
