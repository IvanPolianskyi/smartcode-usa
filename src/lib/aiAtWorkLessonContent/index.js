import { aiAtWorkCurriculum } from '../aiAtWorkCurriculum.js'
import { module00Lessons } from './en/module00.js'
import { module01Lessons } from './en/module01.js'
import { module02Lessons } from './en/module02.js'
import { module03Lessons } from './en/module03.js'
import { module04Lessons } from './en/module04.js'
import { module05Lessons } from './en/module05.js'

const enMap = {
	...module00Lessons,
	...module01Lessons,
	...module02Lessons,
	...module03Lessons,
	...module04Lessons,
	...module05Lessons,
}

const allLessonIds = aiAtWorkCurriculum.modules.flatMap((m) =>
	(m.lessons || []).map((l) => l.lessonId)
)

function createPlaceholder(lessonId, title) {
	return {
		lessonId,
		title,
		comingSoon: true,
		theory: { sections: [] },
		practiceTask: null,
		quiz: { questions: [] },
	}
}

function buildMap() {
	const placeholders = Object.fromEntries(
		allLessonIds.map((id) => {
			const meta = aiAtWorkCurriculum.modules
				.flatMap((m) => m.lessons || [])
				.find((l) => l.lessonId === id)
			return [id, createPlaceholder(id, meta?.title || id)]
		})
	)
	return { ...placeholders, ...enMap }
}

const cache = { map: null }

/** English is the only shipped locale for AI for Real Life. */
export function getAiAtWorkLessonContent(lessonId, _locale = 'en') {
	if (!cache.map) cache.map = buildMap()
	return cache.map[lessonId] || null
}

export function getAiAtWorkLessonStats() {
	if (!cache.map) cache.map = buildMap()
	const total = allLessonIds.length
	const ready = allLessonIds.filter(
		(id) => cache.map[id] && !cache.map[id].comingSoon
	).length
	return { total, ready }
}

export { allLessonIds as aiAtWorkLessonIds }
