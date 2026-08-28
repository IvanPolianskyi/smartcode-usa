import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	buildStudyActivityFromProgress,
	dayKeyFromDate,
	lastNDayKeys,
} from './studyActivity.js'

describe('studyActivity', () => {
	it('builds empty week buckets', () => {
		const now = new Date('2026-08-28T12:00:00.000Z')
		const result = buildStudyActivityFromProgress([], { now })
		assert.equal(result.days.length, 7)
		assert.equal(result.summary.totalLessons, 0)
	})

	it('counts timestamped lesson completions on the right day', () => {
		const now = new Date('2026-08-28T12:00:00.000Z')
		const result = buildStudyActivityFromProgress(
			[
				{
					courseId: 'roblox-studio',
					completedLessons: ['lesson-roblox-1-1'],
					lessonCompletedAt: {
						'lesson-roblox-1-1': new Date('2026-08-27T10:00:00.000Z'),
					},
				},
			],
			{ now }
		)
		const target = result.days.find((d) => d.date === '2026-08-27')
		assert.ok(target)
		assert.equal(target.lessons, 1)
		assert.equal(target.minutes, 60)
	})

	it('lastNDayKeys returns consecutive UTC dates', () => {
		const keys = lastNDayKeys({
			days: 3,
			now: new Date('2026-08-28T12:00:00.000Z'),
		})
		assert.deepEqual(keys, ['2026-08-26', '2026-08-27', '2026-08-28'])
		assert.equal(dayKeyFromDate(new Date('2026-08-28T23:59:00.000Z')), '2026-08-28')
	})
})
