import { pythonCurriculum as pythonUk } from './pythonCurriculum'
import { pythonCurriculum as pythonEn } from './pythonCurriculum.en'
import { enrichPythonModules } from './pythonModuleMeta'
import { webDevCurriculum as webDevUk } from './webDevCurriculum'
import { webDevCurriculum as webDevEn } from './webDevCurriculum.en'
import { getRobloxCurriculum } from './robloxCurriculumLocale'

export function getPythonCurriculum(locale) {
	const loc = locale === 'en' ? 'en' : 'uk'
	const base = loc === 'en' ? pythonEn : pythonUk
	return {
		...base,
		modules: enrichPythonModules(base.modules, loc),
	}
}

export function getWebDevCurriculum(locale) {
	return locale === 'en' ? webDevEn : webDevUk
}

export function getCurriculum(courseId, locale) {
	if (courseId === 'web-development') {
		return getWebDevCurriculum(locale)
	}
	if (courseId === 'roblox-studio') {
		return getRobloxCurriculum(locale)
	}
	return getPythonCurriculum(locale)
}
