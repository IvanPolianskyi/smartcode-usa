/**
 * XP ledger for interactive lesson widgets: XP, levels, daily streak, badges.
 *
 * NOTE ON NAMING: `lessonGamification.js` is a *different*, concurrently
 * developed module that derives missions by parsing "Do now:" blocks out of
 * theory prose and awards ranks per completed lesson. This file is the ledger
 * behind the embedded interactive widgets (tryIt / predictOutput / fillBlank /
 * varTrace) and their server-scored XP. The two overlap conceptually and should
 * probably be merged - see the note in the session that introduced this file.
 *
 * Pure logic, no I/O - imported by both the client HUD and the server progress
 * API. The SERVER is the only thing allowed to award XP; the client renders
 * what the server returns. Keep this file free of React and of `window`.
 *
 * State lives on the per-course `userProgress` document under `gamification`:
 *
 *   gamification: {
 *     awards:       { '<awardKey>': xpNumber },   // idempotent ledger
 *     achievements: [{ id, earnedAt }],
 *     streak:       { count, lastDate },          // 'YYYY-MM-DD'
 *     flawless:     Number,                       // answers correct on 1st try
 *   }
 *
 * Total XP is always recomputed by summing `awards`, so replaying an action can
 * never inflate a score, and a changed XP table self-heals on the next write.
 */

export const XP_PER_LEVEL = 100

/** XP for each scoring event. Interactive types are keyed by their `type`. */
export const XP_AWARDS = {
	tryIt: 10,
	predictOutput: 15,
	fillBlank: 12,
	varTrace: 8,
	practiceTask: 40,
	practiceNoHints: 15,
	quizPassed: 25,
	quizPerfectBonus: 15,
	lessonComplete: 30,
}

/** Interactive widget types the lesson renderer and the API both understand. */
export const INTERACTIVE_TYPES = ['tryIt', 'predictOutput', 'fillBlank', 'varTrace']

export function isInteractiveType(type) {
	return INTERACTIVE_TYPES.includes(type)
}

/* ------------------------------------------------------------------ ledger */

/**
 * Stable key for one XP award. Re-awarding the same key is a no-op, which is
 * what makes every action safe to retry.
 * @param {'interactive'|'practice'|'practiceClean'|'quiz'|'quizPerfect'|'lesson'|'achievement'} kind
 */
export function awardKey(kind, lessonId, suffix) {
	return suffix ? `${kind}:${lessonId}:${suffix}` : `${kind}:${lessonId}`
}

export function emptyGamification() {
	return {
		awards: {},
		achievements: [],
		streak: { count: 0, lastDate: null },
		flawless: 0,
	}
}

/** Coerce whatever is on the document into a well-formed gamification object. */
export function normalizeGamification(raw) {
	const base = emptyGamification()
	if (!raw || typeof raw !== 'object') return base

	const awards = {}
	if (raw.awards && typeof raw.awards === 'object') {
		for (const [key, value] of Object.entries(raw.awards)) {
			const xp = Number(value)
			if (Number.isFinite(xp) && xp > 0) awards[key] = Math.floor(xp)
		}
	}

	const achievements = Array.isArray(raw.achievements)
		? raw.achievements
				.filter((a) => a && typeof a.id === 'string')
				.map((a) => ({ id: a.id, earnedAt: a.earnedAt || null }))
		: []

	return {
		awards,
		achievements,
		streak: {
			count: Math.max(0, Number(raw.streak?.count) || 0),
			lastDate: raw.streak?.lastDate || null,
		},
		flawless: Math.max(0, Number(raw.flawless) || 0),
	}
}

export function totalXp(gamification) {
	const awards = gamification?.awards || {}
	let sum = 0
	for (const value of Object.values(awards)) {
		const xp = Number(value)
		if (Number.isFinite(xp) && xp > 0) sum += xp
	}
	return sum
}

export function levelFromXp(xp) {
	return Math.max(1, Math.floor(Math.max(0, Number(xp) || 0) / XP_PER_LEVEL) + 1)
}

/** Progress within the current level - drives the HUD bar. */
export function xpProgress(xp) {
	const safe = Math.max(0, Number(xp) || 0)
	const into = safe % XP_PER_LEVEL
	return {
		xp: safe,
		level: levelFromXp(safe),
		into,
		need: XP_PER_LEVEL,
		ratio: into / XP_PER_LEVEL,
	}
}

/* ------------------------------------------------------------------ streak */

export function dayKey(date = new Date()) {
	const y = date.getFullYear()
	const m = String(date.getMonth() + 1).padStart(2, '0')
	const d = String(date.getDate()).padStart(2, '0')
	return `${y}-${m}-${d}`
}

function daysBetween(fromKey, toKey) {
	const ms = Date.parse(`${toKey}T12:00:00Z`) - Date.parse(`${fromKey}T12:00:00Z`)
	if (!Number.isFinite(ms)) return null
	return Math.round(ms / 86400000)
}

/**
 * Advance the daily streak. Same day keeps it, the next day extends it,
 * anything longer restarts at 1.
 */
export function touchStreak(streak, today = dayKey()) {
	const count = Math.max(0, Number(streak?.count) || 0)
	const lastDate = streak?.lastDate || null

	if (lastDate === today) return { count: Math.max(count, 1), lastDate: today }
	if (lastDate && daysBetween(lastDate, today) === 1) {
		return { count: count + 1, lastDate: today }
	}
	return { count: 1, lastDate: today }
}

/* ------------------------------------------------------ answer validation */

function normalizeText(value) {
	return String(value ?? '')
		.replace(/\s+/g, ' ')
		.trim()
		.toLowerCase()
}

/**
 * Does this submission satisfy the interactive? Runs on the SERVER against the
 * definition stored in lesson content, so a crafted request cannot claim XP for
 * a wrong answer.
 *
 * `tryIt` and `varTrace` are exploratory: they pass on participation unless the
 * lesson author pinned an `expect` block, because the server has no Python.
 *
 * @param {object} interactive - the definition from lesson content
 * @param {object} submission  - { choice?, blanks?, output?, stepsViewed? }
 * @returns {{ ok: boolean, reason?: string }}
 */
export function checkInteractiveSubmission(interactive, submission) {
	if (!interactive || !isInteractiveType(interactive.type)) {
		return { ok: false, reason: 'unknown-interactive' }
	}

	if (interactive.type === 'predictOutput') {
		const choice = Number(submission?.choice)
		if (!Number.isInteger(choice)) return { ok: false, reason: 'no-choice' }
		return choice === Number(interactive.correctAnswer)
			? { ok: true }
			: { ok: false, reason: 'wrong-choice' }
	}

	if (interactive.type === 'fillBlank') {
		const blanks = Array.isArray(interactive.blanks) ? interactive.blanks : []
		if (!blanks.length) return { ok: false, reason: 'no-blanks' }
		const given = submission?.blanks
		if (!given || typeof given !== 'object') return { ok: false, reason: 'no-blanks' }

		for (const blank of blanks) {
			const accepted = (blank.accept || [blank.answer]).filter(Boolean).map(normalizeText)
			if (!accepted.includes(normalizeText(given[blank.id]))) {
				return { ok: false, reason: 'wrong-blank' }
			}
		}
		return { ok: true }
	}

	if (interactive.type === 'varTrace') {
		const steps = Array.isArray(interactive.steps) ? interactive.steps.length : 0
		const viewed = Number(submission?.stepsViewed) || 0
		return viewed >= steps && steps > 0
			? { ok: true }
			: { ok: false, reason: 'incomplete-trace' }
	}

	// tryIt
	const expect = interactive.expect
	if (!expect) return { ok: true }

	const output = String(submission?.output ?? '')
	if (!output.trim()) return { ok: false, reason: 'no-output' }

	if (Array.isArray(expect.mustContain)) {
		for (const needle of expect.mustContain) {
			if (!normalizeText(output).includes(normalizeText(needle))) {
				return { ok: false, reason: 'missing-text' }
			}
		}
	}

	if (expect.mustMatch) {
		let pattern
		try {
			pattern = new RegExp(expect.mustMatch, expect.flags || 'i')
		} catch {
			return { ok: false, reason: 'bad-pattern' }
		}
		if (!pattern.test(output)) return { ok: false, reason: 'no-match' }
	}

	if (expect.minLines) {
		const lines = output.split('\n').filter((l) => l.trim()).length
		if (lines < Number(expect.minLines)) return { ok: false, reason: 'too-few-lines' }
	}

	return { ok: true }
}

/* ------------------------------------------------------------ achievements */

/**
 * Achievement catalogue. `check` receives a derived stats snapshot; titles and
 * descriptions live in `messages/*\/lms.json` under `lesson.achievements.<id>`
 * so they stay translatable.
 */
export const ACHIEVEMENTS = [
	{
		id: 'first-program',
		icon: '👋',
		xp: 15,
		check: (s) => s.interactivesDone.some((key) => key.startsWith('tryIt:')),
	},
	{
		id: 'curious',
		icon: '🔍',
		xp: 25,
		check: (s) =>
			s.lessonInteractiveIds.length > 0 &&
			s.lessonInteractivesDone >= s.lessonInteractiveIds.length,
	},
	{
		id: 'mind-reader',
		icon: '🔮',
		xp: 30,
		check: (s) => s.flawless >= 3,
	},
	{
		id: 'perfectionist',
		icon: '💯',
		xp: 30,
		check: (s) => s.perfectQuizzes >= 1,
	},
	{
		id: 'no-safety-net',
		icon: '🪂',
		xp: 25,
		check: (s) => s.cleanPractices >= 1,
	},
	{
		id: 'graduate',
		icon: '🎓',
		xp: 20,
		check: (s) => s.completedLessons.length >= 1,
	},
	{
		id: 'streak-3',
		icon: '🔥',
		xp: 35,
		check: (s) => s.streak.count >= 3,
	},
	{
		id: 'level-5',
		icon: '⭐',
		xp: 50,
		check: (s) => s.level >= 5,
	},
]

export function achievementById(id) {
	return ACHIEVEMENTS.find((a) => a.id === id) || null
}

/**
 * Build the snapshot the achievement predicates read.
 *
 * @param {object} args
 * @param {object} args.gamification - normalized gamification state
 * @param {object} args.progress     - the userProgress document
 * @param {string} args.lessonId     - lesson being worked on right now
 * @param {string[]} args.lessonInteractiveIds - interactive ids in that lesson
 */
export function buildAchievementStats({
	gamification,
	progress,
	lessonId,
	lessonInteractiveIds = [],
}) {
	const awards = gamification.awards || {}
	const prefix = `interactive:${lessonId}:`

	// Award keys look like `interactive:<lessonId>:<type>:<interactiveId>`.
	const interactivesDone = Object.keys(awards)
		.filter((key) => key.startsWith('interactive:'))
		.map((key) => key.split(':').slice(2).join(':'))

	const lessonInteractivesDone = Object.keys(awards).filter((key) =>
		key.startsWith(prefix)
	).length

	const completedQuizzes = progress?.completedQuizzes || {}
	const perfectQuizzes = Object.values(completedQuizzes).filter(
		(q) => Number(q?.score) === 100
	).length

	const cleanPractices = Object.keys(awards).filter((key) =>
		key.startsWith('practiceClean:')
	).length

	const xp = totalXp(gamification)

	return {
		interactivesDone,
		lessonInteractivesDone,
		lessonInteractiveIds,
		flawless: gamification.flawless || 0,
		streak: gamification.streak || { count: 0, lastDate: null },
		perfectQuizzes,
		cleanPractices,
		completedLessons: progress?.completedLessons || [],
		completedPracticeTasks: progress?.completedPracticeTasks || [],
		xp,
		level: levelFromXp(xp),
	}
}

/**
 * Grant every achievement whose condition is now met.
 * Mutates nothing - returns the next state plus what was newly earned.
 *
 * Runs in two passes so an achievement whose XP bonus pushes the student over a
 * level threshold can immediately unlock a level-based achievement.
 *
 * @returns {{ gamification: object, unlocked: Array<{id, icon, xp}> }}
 */
export function grantAchievements({
	gamification,
	progress,
	lessonId,
	lessonInteractiveIds = [],
	now = new Date(),
}) {
	const next = {
		...gamification,
		awards: { ...gamification.awards },
		achievements: [...gamification.achievements],
	}
	const unlocked = []

	for (let pass = 0; pass < 2; pass++) {
		const earned = new Set(next.achievements.map((a) => a.id))
		const stats = buildAchievementStats({
			gamification: next,
			progress,
			lessonId,
			lessonInteractiveIds,
		})

		let changed = false
		for (const achievement of ACHIEVEMENTS) {
			if (earned.has(achievement.id)) continue
			let met = false
			try {
				met = Boolean(achievement.check(stats))
			} catch {
				met = false
			}
			if (!met) continue

			next.achievements.push({ id: achievement.id, earnedAt: now })
			next.awards[awardKey('achievement', achievement.id)] = achievement.xp
			unlocked.push({ id: achievement.id, icon: achievement.icon, xp: achievement.xp })
			changed = true
		}

		if (!changed) break
	}

	return { gamification: next, unlocked }
}

/**
 * Shape the gamification state for the client. Never leak the raw ledger keys
 * beyond what the HUD needs.
 */
export function serializeGamification(gamification) {
	const state = normalizeGamification(gamification)
	const xp = totalXp(state)
	return {
		...xpProgress(xp),
		streak: state.streak,
		achievements: state.achievements.map((a) => ({
			id: a.id,
			icon: achievementById(a.id)?.icon || '🏅',
			earnedAt: a.earnedAt,
		})),
		completedInteractives: Object.keys(state.awards)
			.filter((key) => key.startsWith('interactive:'))
			.map((key) => {
				const [, lesson, ...rest] = key.split(':')
				return { lessonId: lesson, interactiveId: rest.slice(1).join(':') }
			}),
	}
}
