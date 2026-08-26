/**
 * Weekly lesson drip unlock (2 lessons / week).
 * Run: node --test src/lib/lessonDrip.test.mjs
 */
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
	LESSONS_UNLOCKED_PER_WEEK,
	countDripUnlockedLessons,
	getNextDripUnlockAt,
} from './lessonDrip.js'

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

describe('countDripUnlockedLessons', () => {
	it('unlocks first week (2 lessons) on day 0', () => {
		const start = new Date('2026-01-01T00:00:00.000Z')
		assert.equal(countDripUnlockedLessons(start, { now: start }), 2)
	})

	it('stays at 2 until day 7', () => {
		const start = new Date('2026-01-01T00:00:00.000Z')
		const day6 = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000)
		assert.equal(countDripUnlockedLessons(start, { now: day6 }), 2)
	})

	it('unlocks 4 lessons after one full week', () => {
		const start = new Date('2026-01-01T00:00:00.000Z')
		const week1 = new Date(start.getTime() + WEEK_MS)
		assert.equal(countDripUnlockedLessons(start, { now: week1 }), 4)
	})

	it('defaults to first week when start is missing', () => {
		assert.equal(countDripUnlockedLessons(null), LESSONS_UNLOCKED_PER_WEEK)
	})
})

describe('getNextDripUnlockAt', () => {
	it('returns the start of the next week window', () => {
		const start = new Date('2026-01-01T00:00:00.000Z')
		const next = getNextDripUnlockAt(start, 2, 90, { now: start })
		assert.equal(next.toISOString(), new Date(start.getTime() + WEEK_MS).toISOString())
	})

	it('returns null when course is fully unlocked', () => {
		const start = new Date('2026-01-01T00:00:00.000Z')
		assert.equal(getNextDripUnlockAt(start, 90, 90, { now: start }), null)
	})
})
