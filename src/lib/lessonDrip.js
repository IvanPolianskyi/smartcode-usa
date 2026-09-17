/** Weekly lesson drip: 2 new lessons unlock each week after access starts. */

export const LESSONS_UNLOCKED_PER_WEEK = 2

/** Free trial (trialing, not yet paid): exactly this many lessons, course-wide. */
export const FREE_TRIAL_LESSON_COUNT = 2

const WEEK_MS = 7 * 24 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

/** Nominal cycle length per Paddle billing interval - same day-based approximation as WEEK_MS above. */
const CYCLE_DAYS_BY_INTERVAL = { month: 30, year: 365 }

export function asDripDate(value) {
	if (!value) return null
	const date = value instanceof Date ? value : new Date(value)
	return Number.isNaN(date.getTime()) ? null : date
}

/**
 * How many billing cycles a subscription has paid for.
 *
 * Paddle only advances `current_billing_period.ends_at` when a renewal
 * charge succeeds - a failed payment leaves it frozen and the subscription
 * moves to `past_due` instead. So the distance from the first paid period's
 * start to the current period's end, in cycle lengths, IS the number of
 * successful payments: 1 right after the trial converts (or signup, if there
 * was no trial), 2 after the first renewal, and so on. No "now" needed.
 */
export function countPaidPeriods(paidStartAt, currentPeriodEnd, billingInterval) {
	const start = asDripDate(paidStartAt)
	const end = asDripDate(currentPeriodEnd)
	if (!start || !end || end <= start) return 0
	const cycleDays = CYCLE_DAYS_BY_INTERVAL[billingInterval] || CYCLE_DAYS_BY_INTERVAL.month
	const cycleMs = cycleDays * DAY_MS
	return Math.max(1, Math.round((end.getTime() - start.getTime()) / cycleMs))
}

/**
 * How many lessons are open by the weekly drip (2 per week, week 0 included).
 * Without a start date, entitled students still get the first week's lessons.
 */
export function countDripUnlockedLessons(
	dripStartedAt,
	{ now = new Date(), perWeek = LESSONS_UNLOCKED_PER_WEEK } = {}
) {
	const start = asDripDate(dripStartedAt)
	const weeksElapsed = start
		? Math.floor(Math.max(0, now.getTime() - start.getTime()) / WEEK_MS)
		: 0
	return Math.max(perWeek, perWeek * (weeksElapsed + 1))
}

/** When the next pair of lessons unlocks, or null if the course is fully open. */
export function getNextDripUnlockAt(
	dripStartedAt,
	unlockedCount,
	totalLessons,
	{ now = new Date(), perWeek = LESSONS_UNLOCKED_PER_WEEK } = {}
) {
	if (!totalLessons || unlockedCount >= totalLessons) return null
	const start = asDripDate(dripStartedAt) || asDripDate(now)
	if (!start) return null
	const weeksElapsed = Math.floor(Math.max(0, now.getTime() - start.getTime()) / WEEK_MS)
	return new Date(start.getTime() + (weeksElapsed + 1) * WEEK_MS)
}
