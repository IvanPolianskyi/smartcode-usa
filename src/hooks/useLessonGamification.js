'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { updateProgressWithRewards } from '@/lib/authClient'
import { xpProgress } from '@/lib/lessonInteractiveXp'

let toastSeq = 0

/**
 * Lesson XP, streak and achievement state for one course.
 *
 * The server owns the numbers: every submission round-trips to /api/progress,
 * which scores it against the lesson definition and returns the authoritative
 * total. This hook only mirrors that answer and queues the celebration toasts.
 *
 * @param {object} args
 * @param {string} args.courseId
 * @param {string} args.lessonId
 * @param {string} args.locale
 * @param {object|null} args.initialGamification - serialized state from SSR
 */
export function useLessonGamification({ courseId, lessonId, locale, initialGamification }) {
	const [state, setState] = useState(() => normalize(initialGamification))
	const [toasts, setToasts] = useState([])
	const [pendingId, setPendingId] = useState(null)
	const mounted = useRef(true)

	useEffect(() => {
		mounted.current = true
		return () => {
			mounted.current = false
		}
	}, [])

	// A fresh server render (router.refresh after completing a task) wins over
	// whatever this component accumulated locally.
	useEffect(() => {
		setState(normalize(initialGamification))
	}, [initialGamification])

	const completedIds = useMemo(() => {
		const set = new Set()
		for (const entry of state.completedInteractives || []) {
			if (entry.lessonId === lessonId) set.add(entry.interactiveId)
		}
		return set
	}, [state.completedInteractives, lessonId])

	const pushToast = useCallback((toast) => {
		const id = `t${++toastSeq}`
		setToasts((current) => [...current, { ...toast, id }])
		// Toasts are celebratory, not informational - they can expire on their own.
		setTimeout(() => {
			if (!mounted.current) return
			setToasts((current) => current.filter((t) => t.id !== id))
		}, toast.kind === 'achievement' ? 6000 : 3200)
	}, [])

	const dismissToast = useCallback((id) => {
		setToasts((current) => current.filter((t) => t.id !== id))
	}, [])

	const applyRewards = useCallback(
		({ progress, xpGained, unlockedAchievements }) => {
			if (progress?.gamification) setState(normalize(progress.gamification))
			if (xpGained > 0) pushToast({ kind: 'xp', xp: xpGained })
			for (const achievement of unlockedAchievements || []) {
				pushToast({ kind: 'achievement', achievementId: achievement.id, icon: achievement.icon, xp: achievement.xp })
			}
		},
		[pushToast]
	)

	/**
	 * Send one interactive answer for scoring.
	 * @returns {Promise<{ ok: boolean, reason?: string }>}
	 */
	const submitInteractive = useCallback(
		async (interactive, submission) => {
			if (!interactive?.id) return { ok: false, reason: 'no-interactive' }
			if (completedIds.has(interactive.id)) return { ok: true }

			setPendingId(interactive.id)
			try {
				const result = await updateProgressWithRewards(courseId, {
					action: 'completeInteractive',
					lessonId,
					interactiveId: interactive.id,
					submission,
					locale,
				})
				if (mounted.current) applyRewards(result)
				return { ok: true }
			} catch (error) {
				// A wrong answer is a 400 from the API, not an exception worth logging.
				return { ok: false, reason: error?.reason || 'rejected' }
			} finally {
				if (mounted.current) setPendingId(null)
			}
		},
		[courseId, lessonId, locale, completedIds, applyRewards]
	)

	return {
		gamification: state,
		completedIds,
		pendingId,
		submitInteractive,
		applyRewards,
		toasts,
		dismissToast,
	}
}

function normalize(raw) {
	const xp = Math.max(0, Number(raw?.xp) || 0)
	return {
		...xpProgress(xp),
		streak: {
			count: Math.max(0, Number(raw?.streak?.count) || 0),
			lastDate: raw?.streak?.lastDate || null,
		},
		achievements: Array.isArray(raw?.achievements) ? raw.achievements : [],
		completedInteractives: Array.isArray(raw?.completedInteractives)
			? raw.completedInteractives
			: [],
	}
}
