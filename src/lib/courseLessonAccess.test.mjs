/**
 * Trial + module-based lesson unlock (Paddle-subscribed students).
 * Run: npm test
 */
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
	getUnlockedLessonSet,
	buildCourseModuleAccess,
	FREE_TRIAL_LESSON_COUNT,
	AI_AT_WORK_COURSE_ID,
} from './courseLessonAccess.js'

const MODULE_00 = ['ai-lesson-00-1', 'ai-lesson-00-2', 'ai-lesson-00-3', 'ai-lesson-00-4']
const MODULE_01 = ['ai-lesson-01-1', 'ai-lesson-01-2', 'ai-lesson-01-3', 'ai-lesson-01-4', 'ai-lesson-01-5']
const MODULE_02 = ['ai-lesson-02-1', 'ai-lesson-02-2', 'ai-lesson-02-3', 'ai-lesson-02-4', 'ai-lesson-02-5']

describe('getUnlockedLessonSet: moduleAccess (Paddle trial + payment-driven unlock)', () => {
	it('trial (no payment yet) unlocks exactly the first FREE_TRIAL_LESSON_COUNT lessons', () => {
		const unlocked = getUnlockedLessonSet({
			courseId: AI_AT_WORK_COURSE_ID,
			moduleAccess: { trialing: true, paidPeriods: 0 },
		})
		assert.equal(unlocked.size, FREE_TRIAL_LESSON_COUNT)
		assert.deepEqual([...unlocked], MODULE_00.slice(0, FREE_TRIAL_LESSON_COUNT))
	})

	it('first payment unlocks the whole first module, not just 2 lessons', () => {
		const unlocked = getUnlockedLessonSet({
			courseId: AI_AT_WORK_COURSE_ID,
			moduleAccess: { trialing: false, paidPeriods: 1 },
		})
		assert.deepEqual([...unlocked], MODULE_00)
	})

	it('second payment additionally unlocks the whole second module', () => {
		const unlocked = getUnlockedLessonSet({
			courseId: AI_AT_WORK_COURSE_ID,
			moduleAccess: { trialing: false, paidPeriods: 2 },
		})
		assert.deepEqual([...unlocked], [...MODULE_00, ...MODULE_01])
	})

	it('third payment unlocks module three on top of the first two', () => {
		const unlocked = getUnlockedLessonSet({
			courseId: AI_AT_WORK_COURSE_ID,
			moduleAccess: { trialing: false, paidPeriods: 3 },
		})
		assert.deepEqual([...unlocked], [...MODULE_00, ...MODULE_01, ...MODULE_02])
	})

	it('paidPeriods beyond the module count unlocks the whole course, no overflow error', () => {
		const unlocked = getUnlockedLessonSet({
			courseId: AI_AT_WORK_COURSE_ID,
			moduleAccess: { trialing: false, paidPeriods: 999 },
		})
		assert.equal(unlocked.size, 28)
	})

	it('manual per-lesson unlocks still apply on top of module access', () => {
		const unlocked = getUnlockedLessonSet({
			courseId: AI_AT_WORK_COURSE_ID,
			profile: { courseAccess: { [AI_AT_WORK_COURSE_ID]: { unlockedLessons: ['ai-lesson-05-1'] } } },
			moduleAccess: { trialing: true, paidPeriods: 0 },
		})
		assert.ok(unlocked.has('ai-lesson-05-1'))
		assert.ok(unlocked.has(MODULE_00[0]))
		assert.equal(unlocked.size, FREE_TRIAL_LESSON_COUNT + 1)
	})

	it('admin/teacher still gets everything regardless of moduleAccess', () => {
		const unlocked = getUnlockedLessonSet({
			courseId: AI_AT_WORK_COURSE_ID,
			isAdmin: true,
			moduleAccess: { trialing: true, paidPeriods: 0 },
		})
		assert.equal(unlocked.size, 28)
	})

	it('no moduleAccess (legacy purchased/online entitlement) keeps the weekly drip', () => {
		const unlocked = getUnlockedLessonSet({
			courseId: AI_AT_WORK_COURSE_ID,
			isPurchased: true,
			dripStartedAt: new Date(),
			now: new Date(),
		})
		assert.equal(unlocked.size, 2)
	})
})

describe('buildCourseModuleAccess', () => {
	it('trialing subscription with no payment yields trialing:true, paidPeriods:0', () => {
		const map = buildCourseModuleAccess([
			{
				courseIds: [AI_AT_WORK_COURSE_ID],
				trialing: true,
				createdAt: new Date('2026-01-01T00:00:00.000Z'),
				trialEndsAt: new Date('2026-01-08T00:00:00.000Z'),
				currentPeriodEnd: new Date('2026-01-08T00:00:00.000Z'),
				billingInterval: 'month',
			},
		])
		assert.deepEqual(map[AI_AT_WORK_COURSE_ID], { trialing: true, paidPeriods: 0 })
	})

	it('converted (paid) subscription yields paidPeriods from the billed cycle', () => {
		const map = buildCourseModuleAccess([
			{
				courseIds: [AI_AT_WORK_COURSE_ID],
				trialing: false,
				createdAt: new Date('2026-01-01T00:00:00.000Z'),
				trialEndsAt: new Date('2026-01-08T00:00:00.000Z'),
				currentPeriodEnd: new Date('2026-02-07T00:00:00.000Z'), // one month after trialEndsAt
				billingInterval: 'month',
			},
		])
		assert.deepEqual(map[AI_AT_WORK_COURSE_ID], { trialing: false, paidPeriods: 1 })
	})

	it('subscription with no trial uses createdAt as the paid start', () => {
		const map = buildCourseModuleAccess([
			{
				courseIds: [AI_AT_WORK_COURSE_ID],
				trialing: false,
				createdAt: new Date('2026-01-01T00:00:00.000Z'),
				trialEndsAt: null,
				currentPeriodEnd: new Date('2026-01-31T00:00:00.000Z'),
				billingInterval: 'month',
			},
		])
		assert.deepEqual(map[AI_AT_WORK_COURSE_ID], { trialing: false, paidPeriods: 1 })
	})

	it('ignores unknown course ids and rows with no courses', () => {
		const map = buildCourseModuleAccess([
			{ courseIds: ['not-a-real-course'], trialing: false, currentPeriodEnd: new Date() },
			{ courseIds: [], trialing: false },
		])
		assert.deepEqual(map, {})
	})

	it('skips admin/local-dev manual grants - they keep the weekly drip, not module gating', () => {
		const map = buildCourseModuleAccess([
			{
				courseIds: [AI_AT_WORK_COURSE_ID],
				isManualGrant: true,
				trialing: false,
				createdAt: new Date('2026-01-01T00:00:00.000Z'),
				currentPeriodEnd: new Date('2026-01-31T00:00:00.000Z'),
				billingInterval: null,
			},
		])
		assert.deepEqual(map, {})
	})
})
