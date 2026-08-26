/**
 * Paddle price IDs → which courses a subscription unlocks.
 *
 * Tiers:
 *   standard — platform + Discord ($14/mo or $99/yr)
 *   premium  — platform + Discord + 2 live lessons/week ($20/mo or $149/yr)
 *
 * NEXT_PUBLIC_* must be read as static property access so Next can inline
 * them into the client bundle.
 */

import {
	AI_AT_WORK_COURSE_ID,
	PYTHON_COURSE_ID,
	ROBLOX_COURSE_ID,
	ALL_PROGRAM_COURSE_IDS,
} from '@/lib/courseIds'

export const BILLING_TIERS = {
	standard: {
		id: 'standard',
		label: 'Standard',
		monthlyPrice: '$14',
		annualPrice: '$99',
		includes: 'Platform + Discord',
		includesDetail: 'Self-paced lessons on the platform and the private Discord community.',
	},
	premium: {
		id: 'premium',
		label: 'Premium',
		monthlyPrice: '$20',
		annualPrice: '$149',
		includes: 'Platform + Discord + 2 live lessons',
		includesDetail:
			'Everything in Standard, plus two live teacher sessions every week (recordings if you miss one).',
	},
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
		label: 'AI at Work',
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

/** Build priceId → { courseIds, interval, tier, label } from the current env. */
function buildPriceMap() {
	const map = new Map()

	for (const program of BILLING_PROGRAMS) {
		for (const tierId of ['standard', 'premium']) {
			const prices = program.prices?.[tierId] || {}
			const monthly = cleanId(prices.monthlyPriceId)
			if (monthly) {
				map.set(monthly, {
					courseIds: [program.courseId],
					interval: 'month',
					tier: tierId,
					label: program.label,
				})
			}
			const annual = cleanId(prices.annualPriceId)
			if (annual) {
				map.set(annual, {
					courseIds: [program.courseId],
					interval: 'year',
					tier: tierId,
					label: program.label,
				})
			}
		}
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

let cachedMap = null

function priceMap() {
	if (!cachedMap) cachedMap = buildPriceMap()
	return cachedMap
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
	const program = BILLING_PROGRAMS.find((p) => p.courseId === courseId)
	if (!program) return null
	const tierId = normalizeTier(tier)
	const annual = normalizeInterval(interval) === 'year'
	const prices = program.prices?.[tierId]
	if (!prices) return null
	return cleanId(annual ? prices.annualPriceId : prices.monthlyPriceId)
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
