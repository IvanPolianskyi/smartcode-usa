/**
 * Local arcade progress (XP / level / streak / best score).
 * Client-only - keyed per user id in localStorage.
 */

const STORAGE_PREFIX = 'sc-arcade:'

/** XP needed to reach each next level (level 1 starts at 0). */
export const XP_PER_LEVEL = 120

export function emptyArcadeProgress() {
	return {
		xp: 0,
		level: 1,
		streak: 0,
		lastPlayDate: null,
		bestScore: 0,
	}
}

function storageKey(userId) {
	return `${STORAGE_PREFIX}${userId || 'anon'}`
}

function todayKey(date = new Date()) {
	const y = date.getFullYear()
	const m = String(date.getMonth() + 1).padStart(2, '0')
	const d = String(date.getDate()).padStart(2, '0')
	return `${y}-${m}-${d}`
}

function daysBetween(a, b) {
	const ms = Date.parse(`${b}T12:00:00`) - Date.parse(`${a}T12:00:00`)
	return Math.round(ms / 86400000)
}

export function levelFromXp(xp) {
	return Math.max(1, Math.floor(Number(xp) / XP_PER_LEVEL) + 1)
}

export function xpProgressInLevel(xp) {
	const raw = Math.max(0, Number(xp) || 0)
	const into = raw % XP_PER_LEVEL
	return { into, need: XP_PER_LEVEL, ratio: into / XP_PER_LEVEL }
}

export function loadArcadeProgress(userId) {
	if (typeof window === 'undefined') return emptyArcadeProgress()
	try {
		const raw = window.localStorage.getItem(storageKey(userId))
		if (!raw) return emptyArcadeProgress()
		const parsed = JSON.parse(raw)
		const xp = Math.max(0, Number(parsed.xp) || 0)
		return {
			xp,
			level: levelFromXp(xp),
			streak: Math.max(0, Number(parsed.streak) || 0),
			lastPlayDate: parsed.lastPlayDate || null,
			bestScore: Math.max(0, Number(parsed.bestScore) || 0),
		}
	} catch {
		return emptyArcadeProgress()
	}
}

export function saveArcadeProgress(userId, progress) {
	if (typeof window === 'undefined') return
	try {
		window.localStorage.setItem(
			storageKey(userId),
			JSON.stringify({
				xp: progress.xp,
				streak: progress.streak,
				lastPlayDate: progress.lastPlayDate,
				bestScore: progress.bestScore,
			})
		)
	} catch {
		/* quota / private mode */
	}
}

/**
 * Convert a round score into XP and update streak / best.
 * @returns {{ progress, xpGained }}
 */
export function applyRoundResult(userId, score, previous = null) {
	const base = previous || loadArcadeProgress(userId)
	const safeScore = Math.max(0, Math.floor(Number(score) || 0))
	const xpGained = Math.max(1, Math.round(safeScore / 12))
	const today = todayKey()
	let streak = base.streak || 0

	if (base.lastPlayDate === today) {
		/* same day - keep streak */
	} else if (base.lastPlayDate && daysBetween(base.lastPlayDate, today) === 1) {
		streak += 1
	} else {
		streak = 1
	}

	const xp = (base.xp || 0) + xpGained
	const progress = {
		xp,
		level: levelFromXp(xp),
		streak,
		lastPlayDate: today,
		bestScore: Math.max(base.bestScore || 0, safeScore),
	}
	saveArcadeProgress(userId, progress)
	return { progress, xpGained }
}
