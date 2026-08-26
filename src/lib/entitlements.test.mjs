/**
 * Entitlement evaluation tests (pure - no MongoDB).
 *
 * Run: node --test src/lib/entitlements.test.mjs
 */

import test from 'node:test'
import assert from 'node:assert/strict'
import {
	evaluateSubscription,
	resolveSubscriptionCourseIds,
	GRACE_PERIOD_DAYS,
	SUBSCRIPTION_STATUS,
} from './entitlements.js'

const NOW = new Date('2026-08-26T12:00:00.000Z')

function daysFromNow(days, base = NOW) {
	return new Date(base.getTime() + days * 24 * 60 * 60 * 1000)
}

test('evaluateSubscription: no subscription → inactive', () => {
	const result = evaluateSubscription(null, { now: NOW })
	assert.equal(result.active, false)
	assert.equal(result.reason, 'no_subscription')
	assert.equal(result.cancelAtPeriodEnd, false)
})

test('evaluateSubscription: active grants access', () => {
	const result = evaluateSubscription(
		{
			status: SUBSCRIPTION_STATUS.ACTIVE,
			currentPeriodEnd: daysFromNow(20),
			cancelAtPeriodEnd: false,
		},
		{ now: NOW }
	)
	assert.equal(result.active, true)
	assert.equal(result.trialing, false)
	assert.equal(result.inGrace, false)
	assert.equal(result.reason, 'active')
})

test('evaluateSubscription: trialing grants access and flags trialing', () => {
	const trialEnds = daysFromNow(5)
	const result = evaluateSubscription(
		{
			status: SUBSCRIPTION_STATUS.TRIALING,
			currentPeriodEnd: trialEnds,
			trialEndsAt: trialEnds,
		},
		{ now: NOW }
	)
	assert.equal(result.active, true)
	assert.equal(result.trialing, true)
	assert.equal(result.reason, 'trialing')
})

test('evaluateSubscription: past_due within grace stays active', () => {
	// Period ended yesterday → still inside 3-day grace
	const periodEnd = daysFromNow(-1)
	const result = evaluateSubscription(
		{
			status: SUBSCRIPTION_STATUS.PAST_DUE,
			currentPeriodEnd: periodEnd,
		},
		{ now: NOW }
	)
	assert.equal(result.active, true)
	assert.equal(result.inGrace, true)
	assert.equal(result.reason, 'past_due_grace')
	assert.equal(
		result.endsAt.toISOString(),
		daysFromNow(GRACE_PERIOD_DAYS - 1).toISOString()
	)
})

test('evaluateSubscription: past_due after grace is inactive', () => {
	const periodEnd = daysFromNow(-(GRACE_PERIOD_DAYS + 1))
	const result = evaluateSubscription(
		{
			status: SUBSCRIPTION_STATUS.PAST_DUE,
			currentPeriodEnd: periodEnd,
		},
		{ now: NOW }
	)
	assert.equal(result.active, false)
	assert.equal(result.inGrace, false)
	assert.equal(result.reason, 'past_due_expired')
})

test('evaluateSubscription: past_due with no period end is inactive', () => {
	const result = evaluateSubscription(
		{ status: SUBSCRIPTION_STATUS.PAST_DUE, currentPeriodEnd: null },
		{ now: NOW }
	)
	assert.equal(result.active, false)
	assert.equal(result.inGrace, false)
	assert.equal(result.reason, 'past_due_expired')
})

test('evaluateSubscription: canceled still inside paid period keeps access', () => {
	const result = evaluateSubscription(
		{
			status: SUBSCRIPTION_STATUS.CANCELED,
			currentPeriodEnd: daysFromNow(10),
			cancelAtPeriodEnd: true,
		},
		{ now: NOW }
	)
	assert.equal(result.active, true)
	assert.equal(result.cancelAtPeriodEnd, true)
	assert.equal(result.reason, 'canceled_until_period_end')
})

test('evaluateSubscription: canceled after period end is inactive', () => {
	const result = evaluateSubscription(
		{
			status: SUBSCRIPTION_STATUS.CANCELED,
			currentPeriodEnd: daysFromNow(-1),
		},
		{ now: NOW }
	)
	assert.equal(result.active, false)
	assert.equal(result.reason, 'canceled')
})

test('evaluateSubscription: cancelAtPeriodEnd is surfaced while still active', () => {
	const result = evaluateSubscription(
		{
			status: SUBSCRIPTION_STATUS.ACTIVE,
			currentPeriodEnd: daysFromNow(14),
			cancelAtPeriodEnd: true,
		},
		{ now: NOW }
	)
	assert.equal(result.active, true)
	assert.equal(result.cancelAtPeriodEnd, true)
})

test('evaluateSubscription: paused keeps access until period end', () => {
	const result = evaluateSubscription(
		{
			status: SUBSCRIPTION_STATUS.PAUSED,
			currentPeriodEnd: daysFromNow(3),
		},
		{ now: NOW }
	)
	assert.equal(result.active, true)
	assert.equal(result.reason, 'paused_until_period_end')
})

test('resolveSubscriptionCourseIds prefers stored courseIds', () => {
	const ids = resolveSubscriptionCourseIds({
		courseIds: ['roblox-studio'],
		priceId: 'pri_unknown',
	})
	assert.deepEqual(ids, ['roblox-studio'])
})

test('resolveSubscriptionCourseIds falls back to price map for empty courseIds', () => {
	const ids = resolveSubscriptionCourseIds({ courseIds: [], priceId: null })
	assert.deepEqual(ids, [])
})
