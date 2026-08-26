/** Weekly lesson drip: 2 new lessons unlock each week after access starts. */

export const LESSONS_UNLOCKED_PER_WEEK = 2

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export function asDripDate(value) {
	if (!value) return null
	const date = value instanceof Date ? value : new Date(value)
	return Number.isNaN(date.getTime()) ? null : date
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
