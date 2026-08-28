import test from 'node:test'
import assert from 'node:assert/strict'

import {
	ACHIEVEMENTS,
	XP_AWARDS,
	XP_PER_LEVEL,
	awardKey,
	buildAchievementStats,
	checkInteractiveSubmission,
	grantAchievements,
	levelFromXp,
	normalizeGamification,
	serializeGamification,
	touchStreak,
	totalXp,
	xpProgress,
} from './lessonInteractiveXp.js'

const emptyState = () => normalizeGamification(null)

/* ------------------------------------------------------------------ ledger */

test('totalXp sums the ledger and ignores junk entries', () => {
	const state = normalizeGamification({
		awards: { a: 10, b: 25, c: 0, d: -5, e: 'nope' },
	})
	assert.equal(totalXp(state), 35)
})

test('re-awarding the same key cannot inflate XP', () => {
	const awards = {}
	awards[awardKey('practice', 'lesson-00-1')] = XP_AWARDS.practiceTask
	awards[awardKey('practice', 'lesson-00-1')] = XP_AWARDS.practiceTask
	assert.equal(totalXp({ awards }), XP_AWARDS.practiceTask)
})

test('levels advance every XP_PER_LEVEL points', () => {
	assert.equal(levelFromXp(0), 1)
	assert.equal(levelFromXp(XP_PER_LEVEL - 1), 1)
	assert.equal(levelFromXp(XP_PER_LEVEL), 2)
	assert.equal(levelFromXp(XP_PER_LEVEL * 4), 5)

	const bar = xpProgress(XP_PER_LEVEL + 40)
	assert.equal(bar.level, 2)
	assert.equal(bar.into, 40)
	assert.equal(bar.need, XP_PER_LEVEL)
})

test('normalizeGamification repairs a malformed document', () => {
	const state = normalizeGamification({
		awards: { good: 5 },
		achievements: [{ id: 'graduate' }, null, { nope: true }],
		streak: { count: -3, lastDate: '2026-08-01' },
		flawless: 'x',
	})
	assert.deepEqual(Object.keys(state.awards), ['good'])
	assert.equal(state.achievements.length, 1)
	assert.equal(state.streak.count, 0)
	assert.equal(state.flawless, 0)
})

/* ------------------------------------------------------------------ streak */

test('streak keeps, extends, or resets by calendar day', () => {
	const start = { count: 4, lastDate: '2026-08-26' }
	assert.equal(touchStreak(start, '2026-08-26').count, 4, 'same day keeps')
	assert.equal(touchStreak(start, '2026-08-27').count, 5, 'next day extends')
	assert.equal(touchStreak(start, '2026-08-29').count, 1, 'a gap resets')
	assert.equal(touchStreak({ count: 0, lastDate: null }, '2026-08-27').count, 1)
})

test('streak extends across a month boundary', () => {
	const state = { count: 2, lastDate: '2026-08-31' }
	assert.equal(touchStreak(state, '2026-09-01').count, 3)
})

/* -------------------------------------------------------- answer checking */

test('predictOutput accepts only the correct index', () => {
	const interactive = { id: 'p1', type: 'predictOutput', correctAnswer: 2 }
	assert.equal(checkInteractiveSubmission(interactive, { choice: 2 }).ok, true)
	assert.equal(checkInteractiveSubmission(interactive, { choice: 0 }).ok, false)
	assert.equal(checkInteractiveSubmission(interactive, {}).ok, false)
})

test('fillBlank is case and whitespace tolerant but not answer tolerant', () => {
	const interactive = {
		id: 'f1',
		type: 'fillBlank',
		blanks: [
			{ id: 'b1', answer: 'print' },
			{ id: 'b2', answer: 'int', accept: ['int', 'integer'] },
		],
	}
	assert.equal(
		checkInteractiveSubmission(interactive, { blanks: { b1: '  PRINT ', b2: 'Integer' } }).ok,
		true
	)
	assert.equal(
		checkInteractiveSubmission(interactive, { blanks: { b1: 'print', b2: 'float' } }).ok,
		false
	)
	assert.equal(checkInteractiveSubmission(interactive, { blanks: { b1: 'print' } }).ok, false)
})

test('tryIt without expectations passes on participation', () => {
	const interactive = { id: 't1', type: 'tryIt' }
	assert.equal(checkInteractiveSubmission(interactive, { output: 'anything' }).ok, true)
})

test('tryIt with expectations checks the real output', () => {
	const interactive = {
		id: 't2',
		type: 'tryIt',
		expect: { mustContain: ['hello'], minLines: 2 },
	}
	assert.equal(checkInteractiveSubmission(interactive, { output: 'Hello\nthere' }).ok, true)
	assert.equal(checkInteractiveSubmission(interactive, { output: 'Hello' }).ok, false, 'too few lines')
	assert.equal(checkInteractiveSubmission(interactive, { output: 'bye\nnow' }).ok, false)
	assert.equal(checkInteractiveSubmission(interactive, { output: '' }).ok, false)
})

test('tryIt survives a malformed author regex instead of throwing', () => {
	const interactive = { id: 't3', type: 'tryIt', expect: { mustMatch: '([' } }
	assert.equal(checkInteractiveSubmission(interactive, { output: 'x' }).ok, false)
})

test('varTrace requires every step to have been stepped through', () => {
	const interactive = { id: 'v1', type: 'varTrace', steps: [{}, {}, {}] }
	assert.equal(checkInteractiveSubmission(interactive, { stepsViewed: 3 }).ok, true)
	assert.equal(checkInteractiveSubmission(interactive, { stepsViewed: 2 }).ok, false)
})

test('an unknown interactive type is never scorable', () => {
	assert.equal(checkInteractiveSubmission({ id: 'x', type: 'wat' }, {}).ok, false)
	assert.equal(checkInteractiveSubmission(null, {}).ok, false)
})

/* ------------------------------------------------------------ achievements */

test('every achievement id has a unique icon-bearing definition', () => {
	const ids = ACHIEVEMENTS.map((a) => a.id)
	assert.equal(new Set(ids).size, ids.length, 'ids must be unique')
	for (const a of ACHIEVEMENTS) {
		assert.ok(a.icon, `${a.id} needs an icon`)
		assert.ok(a.xp > 0, `${a.id} needs an XP bonus`)
		assert.equal(typeof a.check, 'function')
	}
})

test('buildAchievementStats reads the interactive ledger key format', () => {
	const gamification = normalizeGamification({
		awards: {
			[awardKey('interactive', 'lesson-00-1', 'tryIt:hello')]: 10,
			[awardKey('interactive', 'lesson-00-1', 'fillBlank:blanks-1')]: 12,
			[awardKey('interactive', 'lesson-00-2', 'predictOutput:guess')]: 15,
		},
	})
	const stats = buildAchievementStats({
		gamification,
		progress: {},
		lessonId: 'lesson-00-1',
		lessonInteractiveIds: ['hello', 'blanks-1'],
	})

	assert.equal(stats.lessonInteractivesDone, 2, 'only counts the current lesson')
	assert.ok(stats.interactivesDone.includes('tryIt:hello'))
	assert.ok(stats.interactivesDone.includes('predictOutput:guess'))
})

test('finishing every interactive in a lesson unlocks first-program and curious', () => {
	const gamification = normalizeGamification({
		awards: {
			[awardKey('interactive', 'lesson-00-1', 'tryIt:hello')]: 10,
			[awardKey('interactive', 'lesson-00-1', 'fillBlank:blanks-1')]: 12,
		},
	})

	const { gamification: next, unlocked } = grantAchievements({
		gamification,
		progress: {},
		lessonId: 'lesson-00-1',
		lessonInteractiveIds: ['hello', 'blanks-1'],
	})

	const ids = unlocked.map((u) => u.id)
	assert.ok(ids.includes('first-program'))
	assert.ok(ids.includes('curious'))
	assert.ok(totalXp(next) > totalXp(gamification), 'bonus XP is credited')
})

test('achievements are never granted twice', () => {
	const first = grantAchievements({
		gamification: normalizeGamification({
			awards: { [awardKey('interactive', 'l1', 'tryIt:a')]: 10 },
		}),
		progress: {},
		lessonId: 'l1',
		lessonInteractiveIds: ['a'],
	})

	const second = grantAchievements({
		gamification: first.gamification,
		progress: {},
		lessonId: 'l1',
		lessonInteractiveIds: ['a'],
	})

	assert.equal(second.unlocked.length, 0)
	assert.equal(totalXp(second.gamification), totalXp(first.gamification))
})

test('an achievement bonus can cascade into a level achievement', () => {
	// Just under level 5; perfectionist + graduate bonuses push it over.
	const awards = { seed: XP_PER_LEVEL * 4 - 40 }
	const { unlocked } = grantAchievements({
		gamification: normalizeGamification({ awards }),
		progress: {
			completedLessons: ['lesson-00-1'],
			completedQuizzes: { 'lesson-00-1': { score: 100, passed: true } },
		},
		lessonId: 'lesson-00-1',
		lessonInteractiveIds: [],
	})

	const ids = unlocked.map((u) => u.id)
	assert.ok(ids.includes('perfectionist'))
	assert.ok(ids.includes('graduate'))
	assert.ok(ids.includes('level-5'), 'second pass sees the XP from the first')
})

test('the no-safety-net badge follows the clean-practice ledger key', () => {
	const { unlocked } = grantAchievements({
		gamification: normalizeGamification({
			awards: { [awardKey('practiceClean', 'lesson-00-1')]: XP_AWARDS.practiceNoHints },
		}),
		progress: {},
		lessonId: 'lesson-00-1',
		lessonInteractiveIds: [],
	})
	assert.ok(unlocked.map((u) => u.id).includes('no-safety-net'))
})

/* -------------------------------------------------------------- serialize */

test('serializeGamification exposes the HUD shape without raw ledger keys', () => {
	const view = serializeGamification({
		awards: {
			[awardKey('interactive', 'lesson-00-2', 'predictOutput:guess-1')]: 15,
			[awardKey('practice', 'lesson-00-2')]: 40,
		},
		achievements: [{ id: 'graduate', earnedAt: null }],
		streak: { count: 2, lastDate: '2026-08-27' },
	})

	assert.equal(view.xp, 55)
	assert.equal(view.level, 1)
	assert.equal(view.streak.count, 2)
	assert.equal(view.achievements[0].icon, '🎓')
	assert.deepEqual(view.completedInteractives, [
		{ lessonId: 'lesson-00-2', interactiveId: 'guess-1' },
	])
	assert.equal(view.awards, undefined, 'ledger stays server-side')
})
