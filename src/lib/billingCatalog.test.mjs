/**
 * Billing catalog tests.
 *
 * Env is set before the dynamic import so priceIdFor / courseIdsForPriceId
 * see known IDs. Run: node --test src/lib/billingCatalog.test.mjs
 */

import test from 'node:test'
import assert from 'node:assert/strict'

process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_MONTHLY = 'pri_roblox_m'
process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_ANNUAL = 'pri_roblox_y'
process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_PREMIUM_MONTHLY = 'pri_roblox_pm'
process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_PREMIUM_ANNUAL = 'pri_roblox_py'
process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_MONTHLY = 'pri_python_m'
process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_ANNUAL = 'pri_python_y'
process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_PREMIUM_MONTHLY = 'pri_python_pm'
process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_PREMIUM_ANNUAL = 'pri_python_py'
process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_MONTHLY = 'pri_ai_m'
process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_ANNUAL = 'pri_ai_y'
process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_PREMIUM_MONTHLY = 'pri_ai_pm'
process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_PREMIUM_ANNUAL = 'pri_ai_py'
process.env.NEXT_PUBLIC_PADDLE_PRICE_MONTHLY = 'pri_legacy_m'
process.env.NEXT_PUBLIC_PADDLE_PRICE_ANNUAL = 'pri_legacy_y'

const {
	priceIdFor,
	courseIdsForPriceId,
	tierForPriceId,
	programForCourseId,
	labelForCourseIds,
	tierPricing,
	comparePlans,
	planRank,
	planForPriceId,
} = await import('./billingCatalog.js')

const {
	ROBLOX_COURSE_ID,
	PYTHON_COURSE_ID,
	AI_AT_WORK_COURSE_ID,
	ALL_PROGRAM_COURSE_IDS,
} = await import('./courseIds.js')

test('priceIdFor: monthly standard per program', () => {
	assert.equal(priceIdFor(ROBLOX_COURSE_ID, 'month', 'standard'), 'pri_roblox_m')
	assert.equal(priceIdFor(PYTHON_COURSE_ID, 'monthly', 'standard'), 'pri_python_m')
	assert.equal(priceIdFor(AI_AT_WORK_COURSE_ID, 'month'), 'pri_ai_m')
})

test('priceIdFor: annual and premium aliases', () => {
	assert.equal(priceIdFor(ROBLOX_COURSE_ID, 'year', 'standard'), 'pri_roblox_y')
	assert.equal(priceIdFor(ROBLOX_COURSE_ID, 'annual', 'premium'), 'pri_roblox_py')
	assert.equal(priceIdFor(PYTHON_COURSE_ID, 'month', 'premium'), 'pri_python_pm')
})

test('priceIdFor: unknown course → null', () => {
	assert.equal(priceIdFor('not-a-course', 'month', 'standard'), null)
})

test('courseIdsForPriceId: per-program prices unlock one course', () => {
	assert.deepEqual(courseIdsForPriceId('pri_roblox_m'), [ROBLOX_COURSE_ID])
	assert.deepEqual(courseIdsForPriceId('pri_python_py'), [PYTHON_COURSE_ID])
	assert.deepEqual(courseIdsForPriceId('pri_ai_pm'), [AI_AT_WORK_COURSE_ID])
})

test('courseIdsForPriceId: legacy prices unlock every program', () => {
	assert.deepEqual(courseIdsForPriceId('pri_legacy_m'), [...ALL_PROGRAM_COURSE_IDS])
	assert.deepEqual(courseIdsForPriceId('pri_legacy_y'), [...ALL_PROGRAM_COURSE_IDS])
})

test('courseIdsForPriceId: unknown / empty → []', () => {
	assert.deepEqual(courseIdsForPriceId(null), [])
	assert.deepEqual(courseIdsForPriceId(''), [])
	assert.deepEqual(courseIdsForPriceId('pri_does_not_exist'), [])
})

test('tierForPriceId distinguishes standard vs premium', () => {
	assert.equal(tierForPriceId('pri_roblox_m'), 'standard')
	assert.equal(tierForPriceId('pri_roblox_pm'), 'premium')
	assert.equal(tierForPriceId('pri_legacy_m'), 'standard')
	assert.equal(tierForPriceId('pri_unknown'), null)
})

test('programForCourseId and label helpers', () => {
	assert.equal(programForCourseId(ROBLOX_COURSE_ID)?.label, 'Roblox Studio')
	assert.equal(programForCourseId('nope'), null)
	assert.equal(labelForCourseIds([ROBLOX_COURSE_ID]), 'Roblox Studio')
	assert.equal(labelForCourseIds([...ALL_PROGRAM_COURSE_IDS]), 'All programs')
	assert.equal(labelForCourseIds([]), 'Subscription')
})

test('tierPricing returns display amounts', () => {
	assert.equal(tierPricing('standard').monthlyPrice, '$14')
	assert.equal(tierPricing('premium').annualPrice, '$149')
	assert.equal(tierPricing('nonsense').id, 'standard')
})


/**
 * Plan comparison decides whether a switch bills now or at renewal, and
 * whether the upgrade CTA appears at all. Getting `same` wrong is what made
 * Premium unsellable to existing Standard subscribers.
 */

test('comparePlans recognises the plan the customer is already on', () => {
	assert.deepEqual(comparePlans('pri_roblox_m', 'pri_roblox_m'), {
		same: true,
		upgrade: false,
	})
})

test('comparePlans treats standard -> premium as an upgrade', () => {
	const move = comparePlans('pri_roblox_m', 'pri_roblox_pm')
	assert.equal(move.same, false)
	assert.equal(move.upgrade, true)
})

test('comparePlans treats premium -> standard as a downgrade', () => {
	const move = comparePlans('pri_roblox_pm', 'pri_roblox_m')
	assert.equal(move.same, false)
	assert.equal(move.upgrade, false)
})

test('comparePlans treats monthly -> annual as an upgrade at the same tier', () => {
	assert.equal(comparePlans('pri_roblox_m', 'pri_roblox_y').upgrade, true)
})

test('comparePlans returns null when the current price is not in the catalogue', () => {
	// A legacy or foreign price must not be classified - the caller falls back
	// to billing at the next period rather than charging immediately.
	assert.equal(comparePlans('pri_not_ours', 'pri_roblox_pm'), null)
})

test('comparePlans returns null without a target price', () => {
	assert.equal(comparePlans('pri_roblox_m', null), null)
})

test('planRank puts premium above standard and annual above monthly', () => {
	assert.equal(planRank({ tier: 'premium', interval: 'month' }).tier, 1)
	assert.equal(planRank({ tier: 'standard', interval: 'month' }).tier, 0)
	assert.equal(planRank({ tier: 'standard', interval: 'year' }).interval, 1)
	assert.equal(planRank({ tier: 'standard', interval: 'month' }).interval, 0)
})

test('a tier change outranks the billing period', () => {
	// Premium monthly over Standard annual is still an upgrade, even though the
	// annual plan costs more per payment.
	assert.equal(comparePlans('pri_roblox_y', 'pri_roblox_pm').upgrade, true)
	assert.equal(comparePlans('pri_roblox_py', 'pri_roblox_m').upgrade, false)
})

test('annual -> monthly at the same tier is a downgrade', () => {
	assert.equal(comparePlans('pri_roblox_y', 'pri_roblox_m').upgrade, false)
})

test('planForPriceId resolves catalogue details and nothing else', () => {
	assert.equal(planForPriceId('pri_python_py').tier, 'premium')
	assert.equal(planForPriceId('pri_python_py').interval, 'year')
	assert.equal(planForPriceId('pri_nope'), null)
	assert.equal(planForPriceId(null), null)
})
