'use client'

import { useCallback } from 'react'
import { isInteractiveType } from '@/lib/lessonInteractiveXp'
import FillBlankBlock from './FillBlankBlock'
import PredictOutputBlock from './PredictOutputBlock'
import TryItBlock from './TryItBlock'
import VarTraceBlock from './VarTraceBlock'

const RENDERERS = {
	tryIt: TryItBlock,
	predictOutput: PredictOutputBlock,
	fillBlank: FillBlankBlock,
	varTrace: VarTraceBlock,
}

/**
 * Renders one interactive widget declared by lesson content and forwards its
 * submission to the gamification hook for server-side scoring.
 *
 * Unknown types render nothing rather than breaking the lesson - content can
 * ship ahead of a renderer.
 */
export default function InteractiveBlock({ interactive, moduleId, completedIds, pendingId, onSubmit }) {
	const handleComplete = useCallback(
		(submission) => onSubmit(interactive, submission),
		[interactive, onSubmit]
	)

	if (!interactive?.id || !isInteractiveType(interactive.type)) return null

	const Renderer = RENDERERS[interactive.type]
	if (!Renderer) return null

	return (
		<Renderer
			interactive={interactive}
			moduleId={moduleId}
			completed={completedIds.has(interactive.id)}
			pending={pendingId === interactive.id}
			onComplete={handleComplete}
		/>
	)
}
