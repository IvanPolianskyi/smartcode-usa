import { pythonCurriculum } from './pythonCurriculum'
import { enrichPythonModules } from './pythonModuleMeta'
import { getRobloxCurriculum } from './robloxCurriculumLocale'
import { aiAtWorkCurriculum } from './aiAtWorkCurriculum'

export function getPythonCurriculum() {
	return {
		...pythonCurriculum,
		modules: enrichPythonModules(pythonCurriculum.modules),
	}
}

export function getCurriculum(courseId, locale = 'en') {
	if (courseId === 'roblox-studio') {
		return getRobloxCurriculum(locale)
	}
	if (courseId === 'ai-at-work') {
		return aiAtWorkCurriculum
	}
	return getPythonCurriculum()
}
