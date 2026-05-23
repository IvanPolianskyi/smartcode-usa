import { pythonCurriculum as pythonUk } from './pythonCurriculum'
import { pythonCurriculum as pythonEn } from './pythonCurriculum.en'
import { webDevCurriculum as webDevUk } from './webDevCurriculum'
import { webDevCurriculum as webDevEn } from './webDevCurriculum.en'
import { getRobloxCurriculum } from './robloxCurriculumLocale'

export function getPythonCurriculum(locale) {
	return locale === 'en' ? pythonEn : pythonUk
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
