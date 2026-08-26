'use client'

import { useCallback, useEffect, useState } from 'react'
import {
	applyRoundResult,
	emptyArcadeProgress,
	loadArcadeProgress,
	xpProgressInLevel,
} from '@/lib/arcadeProgress'

/**
 * Client arcade stats for the student dashboard.
 */
export function useArcadeProgress(userId) {
	const [progress, setProgress] = useState(emptyArcadeProgress)
	const [ready, setReady] = useState(false)

	useEffect(() => {
		if (!userId) {
			setProgress(emptyArcadeProgress())
			setReady(true)
			return
		}
		setProgress(loadArcadeProgress(userId))
		setReady(true)
	}, [userId])

	const recordRound = useCallback(
		(score) => {
			if (!userId) return { xpGained: 0, progress: emptyArcadeProgress() }
			const result = applyRoundResult(userId, score, progress)
			setProgress(result.progress)
			return result
		},
		[userId, progress]
	)

	const bar = xpProgressInLevel(progress.xp)

	return {
		progress,
		ready,
		recordRound,
		xpIntoLevel: bar.into,
		xpNeed: bar.need,
		xpRatio: bar.ratio,
	}
}
