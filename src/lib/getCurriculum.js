import { pythonCurriculum } from './pythonCurriculum'
import { enrichPythonModules } from './pythonModuleMeta'
import { webDevCurriculum } from './webDevCurriculum'
import { getRobloxCurriculum } from './robloxCurriculumLocale'

export function getPythonCurriculum() {
	return {
		...pythonCurriculum,
		modules: enrichPythonModules(pythonCurriculum.modules),
	}
}

export function getWebDevCurriculum() {
	return webDevCurriculum
}

export function getCurriculum(courseId) {
	if (courseId === 'web-development') {
		return getWebDevCurriculum()
	}
	if (courseId === 'roblox-studio') {
		return getRobloxCurriculum()
	}
	return getPythonCurriculum()
}
