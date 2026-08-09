import { pythonCurriculum } from './pythonCurriculum'
import { enrichPythonModules } from './pythonModuleMeta'
import { webDevCurriculum } from './webDevCurriculum'
import { getRobloxCurriculum } from './robloxCurriculumLocale'
import { scratchCurriculum } from './scratchCurriculum'
import { minecraftCurriculum } from './minecraftCurriculum'

export function getPythonCurriculum() {
	return {
		...pythonCurriculum,
		modules: enrichPythonModules(pythonCurriculum.modules),
	}
}

export function getWebDevCurriculum() {
	return webDevCurriculum
}

export function getScratchCurriculum() {
	return scratchCurriculum
}

export function getMinecraftCurriculum() {
	return minecraftCurriculum
}

export function getCurriculum(courseId) {
	if (courseId === 'web-development') {
		return getWebDevCurriculum()
	}
	if (courseId === 'roblox-studio') {
		return getRobloxCurriculum()
	}
	if (courseId === 'scratch') {
		return getScratchCurriculum()
	}
	if (courseId === 'minecraft-education') {
		return getMinecraftCurriculum()
	}
	return getPythonCurriculum()
}
