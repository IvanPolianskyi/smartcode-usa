/**
 * Paddle price IDs → which courses a subscription unlocks.
 *
 * Tiers:
 *   standard - platform + Discord ($14/mo or $99/yr)
 *   premium  - platform + Discord + 2 live lessons/week ($20/mo or $149/yr)
 *
 * NEXT_PUBLIC_* must be read as static property access so Next can inline
 * them into the client bundle.
 */

import {
	AI_AT_WORK_COURSE_ID,
	PYTHON_COURSE_ID,
	ROBLOX_COURSE_ID,
	ALL_PROGRAM_COURSE_IDS,
} from './courseIds.js'

export const BILLING_TIERS = {
	standard: {
		id: 'standard',
		label: 'Standard',
		monthlyPrice: '$14',
		annualPrice: '$99',
		includes: 'Platform + Discord',
		includesDetail: 'Self-paced lessons on the platform and the private Discord community.',
		tagline: 'Everything you need to learn on your own time.',
		features: [
			'Every lesson in your program',
			'Your code checked the moment you run it',
			'Private Discord with other builders',
			'Your finished project promoted on our Instagram',
		],
	},
	premium: {
		id: 'premium',
		label: 'Premium',
		monthlyPrice: '$20',
		annualPrice: '$149',
		includes: 'Platform + Discord + 2 live lessons',
		includesDetail:
			'Everything in Standard, plus two live teacher sessions every week (recordings if you miss one).',
		tagline: 'Standard, plus a real teacher twice a week.',
		features: [
			'Everything in Standard',
			'2 live lessons every week',
			'Recordings if you miss one',
			'Ask a teacher when you get stuck',
		],
	},
}

/** Numeric value of a display price like "$14" - used for savings math. */
export function priceValue(display) {
	const n = Number(String(display || '').replace(/[^0-9.]/g, ''))
	return Number.isFinite(n) ? n : 0
}

/**
 * What a year on the annual plan saves versus paying monthly.
 * @returns {{ amount: number, display: string } | null}
 */
export function annualSaving(tier = 'standard') {
	const entry = BILLING_TIERS[normalizeTier(tier)]
	if (!entry) return null
	const monthly = priceValue(entry.monthlyPrice)
	const annual = priceValue(entry.annualPrice)
	if (!monthly || !annual) return null
	const amount = monthly * 12 - annual
	if (amount <= 0) return null
	return { amount, display: `$${Math.round(amount)}` }
}

export const BILLING_PROGRAMS = [
	{
		courseId: ROBLOX_COURSE_ID,
		label: 'Roblox Studio',
		blurb: 'Build and publish a real game in Roblox Studio.',
		prices: {
			standard: {
				monthlyPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_MONTHLY || null,
				annualPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_ANNUAL || null,
			},
			premium: {
				monthlyPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_PREMIUM_MONTHLY || null,
				annualPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_PREMIUM_ANNUAL || null,
			},
		},
	},
	{
		courseId: PYTHON_COURSE_ID,
		label: 'Python',
		blurb: 'Write and run Python in the browser from lesson one.',
		prices: {
			standard: {
				monthlyPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_MONTHLY || null,
				annualPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_ANNUAL || null,
			},
			premium: {
				monthlyPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_PREMIUM_MONTHLY || null,
				annualPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_PREMIUM_ANNUAL || null,
			},
		},
	},
	{
		courseId: AI_AT_WORK_COURSE_ID,
		label: 'AI for Real Life',
		blurb: 'Prompting, generative media, and a content system you can run.',
		prices: {
			standard: {
				monthlyPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_MONTHLY || null,
				annualPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_ANNUAL || null,
			},
			premium: {
				monthlyPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_PREMIUM_MONTHLY || null,
				annualPriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_PREMIUM_ANNUAL || null,
			},
		},
	},
]

function cleanId(value) {
	return value && String(value).trim() ? String(value).trim() : null
}

function normalizeTier(tier) {
	return tier === 'premium' ? 'premium' : 'standard'
}

function normalizeInterval(interval) {
	return interval === 'year' || interval === 'annual' ? 'year' : 'month'
}

/**
 * Read price IDs from env at call time (static property access so Next can
 * inline NEXT_PUBLIC_* into the client bundle). Avoids a stale module-load
 * cache when tests set env before exercising the helpers.
 */
function readPriceEntries() {
	return [
		{
			courseId: ROBLOX_COURSE_ID,
			label: 'Roblox Studio',
			tier: 'standard',
			interval: 'month',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_MONTHLY,
		},
		{
			courseId: ROBLOX_COURSE_ID,
			label: 'Roblox Studio',
			tier: 'standard',
			interval: 'year',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_ANNUAL,
		},
		{
			courseId: ROBLOX_COURSE_ID,
			label: 'Roblox Studio',
			tier: 'premium',
			interval: 'month',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_PREMIUM_MONTHLY,
		},
		{
			courseId: ROBLOX_COURSE_ID,
			label: 'Roblox Studio',
			tier: 'premium',
			interval: 'year',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ROBLOX_PREMIUM_ANNUAL,
		},
		{
			courseId: PYTHON_COURSE_ID,
			label: 'Python',
			tier: 'standard',
			interval: 'month',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_MONTHLY,
		},
		{
			courseId: PYTHON_COURSE_ID,
			label: 'Python',
			tier: 'standard',
			interval: 'year',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_ANNUAL,
		},
		{
			courseId: PYTHON_COURSE_ID,
			label: 'Python',
			tier: 'premium',
			interval: 'month',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_PREMIUM_MONTHLY,
		},
		{
			courseId: PYTHON_COURSE_ID,
			label: 'Python',
			tier: 'premium',
			interval: 'year',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PYTHON_PREMIUM_ANNUAL,
		},
		{
			courseId: AI_AT_WORK_COURSE_ID,
			label: 'AI for Real Life',
			tier: 'standard',
			interval: 'month',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_MONTHLY,
		},
		{
			courseId: AI_AT_WORK_COURSE_ID,
			label: 'AI for Real Life',
			tier: 'standard',
			interval: 'year',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_ANNUAL,
		},
		{
			courseId: AI_AT_WORK_COURSE_ID,
			label: 'AI for Real Life',
			tier: 'premium',
			interval: 'month',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_PREMIUM_MONTHLY,
		},
		{
			courseId: AI_AT_WORK_COURSE_ID,
			label: 'AI for Real Life',
			tier: 'premium',
			interval: 'year',
			priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_AI_PREMIUM_ANNUAL,
		},
	]
}

/** Build priceId → { courseIds, interval, tier, label } from the current env. */
function buildPriceMap() {
	const map = new Map()

	for (const entry of readPriceEntries()) {
		const id = cleanId(entry.priceId)
		if (!id) continue
		map.set(id, {
			courseIds: [entry.courseId],
			interval: entry.interval,
			tier: entry.tier,
			label: entry.label,
		})
	}

	const legacyMonthly = cleanId(process.env.NEXT_PUBLIC_PADDLE_PRICE_MONTHLY)
	if (legacyMonthly && !map.has(legacyMonthly)) {
		map.set(legacyMonthly, {
			courseIds: [...ALL_PROGRAM_COURSE_IDS],
			interval: 'month',
			tier: 'standard',
			label: 'All programs',
		})
	}
	const legacyAnnual = cleanId(process.env.NEXT_PUBLIC_PADDLE_PRICE_ANNUAL)
	if (legacyAnnual && !map.has(legacyAnnual)) {
		map.set(legacyAnnual, {
			courseIds: [...ALL_PROGRAM_COURSE_IDS],
			interval: 'year',
			tier: 'standard',
			label: 'All programs',
		})
	}

	return map
}

function priceMap() {
	return buildPriceMap()
}

/** Course IDs unlocked by this Paddle price. Empty array if unknown. */
export function courseIdsForPriceId(priceId) {
	if (!priceId) return []
	const entry = priceMap().get(String(priceId))
	return entry ? [...entry.courseIds] : []
}

/** Tier for a Paddle price: 'standard' | 'premium' | null if unknown. */
export function tierForPriceId(priceId) {
	if (!priceId) return null
	return priceMap().get(String(priceId))?.tier || null
}

/**
 * Resolve the Paddle price ID for a course + billing interval + tier.
 * @param {string} courseId
 * @param {'month'|'year'|'monthly'|'annual'} interval
 * @param {'standard'|'premium'} tier
 */
export function priceIdFor(courseId, interval = 'month', tier = 'standard') {
	const tierId = normalizeTier(tier)
	const wantInterval = normalizeInterval(interval)
	const match = readPriceEntries().find(
		(entry) =>
			entry.courseId === courseId &&
			entry.tier === tierId &&
			entry.interval === wantInterval
	)
	return match ? cleanId(match.priceId) : null
}

export function programForCourseId(courseId) {
	return BILLING_PROGRAMS.find((p) => p.courseId === courseId) || null
}

export function labelForCourseIds(courseIds = []) {
	if (!courseIds.length) return 'Subscription'
	if (courseIds.length > 1) return 'All programs'
	return programForCourseId(courseIds[0])?.label || 'Subscription'
}

/** Display prices for a tier (shared across programs). */
export function tierPricing(tier = 'standard') {
	return BILLING_TIERS[normalizeTier(tier)]
}
