import { getLessonContent } from './lessonContentLoader.js'

export const DEFAULT_LESSON_MINUTES = 25
export const STUDY_CHART_DAYS = 7

export function dayKeyFromDate(date) {
	const d = date instanceof Date ? date : new Date(date)
	if (Number.isNaN(d.getTime())) return null
	return d.toISOString().slice(0, 10)
}

export function lastNDayKeys({ days = STUDY_CHART_DAYS, now = new Date() } = {}) {
	const keys = []
	const anchor = new Date(now)
	anchor.setUTCHours(12, 0, 0, 0)

	for (let offset = days - 1; offset >= 0; offset -= 1) {
		const d = new Date(anchor)
		d.setUTCDate(d.getUTCDate() - offset)
		keys.push(dayKeyFromDate(d))
	}
	return keys
}

export function estimateLessonMinutes(courseId, lessonId) {
	const lesson = getLessonContent(courseId, lessonId, 'en')
	const minutes = Number(lesson?.estimatedTime)
	if (Number.isFinite(minutes) && minutes > 0) {
		return Math.min(Math.round(minutes), 120)
	}
	return DEFAULT_LESSON_MINUTES
}

function coerceDate(value, fallback) {
	if (!value) return fallback
	const d = value instanceof Date ? value : new Date(value)
	return Number.isNaN(d.getTime()) ? fallback : d
}

/**
 * Build a daily study-time series from per-course progress documents.
 * Uses `lessonCompletedAt` when present; legacy completions are spread across
 * the chart window so older students still see a useful picture.
 */
export function buildStudyActivityFromProgress(
	progressDocs,
	{ days = STUDY_CHART_DAYS, now = new Date() } = {}
) {
	const dayKeys = lastNDayKeys({ days, now })
	const buckets = Object.fromEntries(
		dayKeys.map((key) => [key, { date: key, minutes: 0, lessons: 0 }])
	)

	let legacyCounter = 0

	for (const doc of progressDocs || []) {
		const courseId = doc.courseId
		const completed = Array.isArray(doc.completedLessons) ? doc.completedLessons : []
		const completedAt = doc.lessonCompletedAt || {}
		const fallback = coerceDate(doc.updatedAt, coerceDate(doc.enrolledAt, now))

		for (const lessonId of completed) {
			const minutes = estimateLessonMinutes(courseId, lessonId)
			const stamped = completedAt[lessonId]
			let key = stamped ? dayKeyFromDate(coerceDate(stamped, fallback)) : null

			if (!key || !buckets[key]) {
				const spreadIndex =
					dayKeys.length - 1 - (legacyCounter % dayKeys.length)
				key = dayKeys[spreadIndex]
				legacyCounter += 1
			}

			buckets[key].minutes += minutes
			buckets[key].lessons += 1
		}
	}

	const series = dayKeys.map((key) => buckets[key])
	const totalMinutes = series.reduce((sum, row) => sum + row.minutes, 0)
	const totalLessons = series.reduce((sum, row) => sum + row.lessons, 0)
	const activeDays = series.filter((row) => row.minutes > 0).length
	const peakMinutes = Math.max(0, ...series.map((row) => row.minutes))

	return {
		days: series,
		summary: {
			totalMinutes,
			totalLessons,
			activeDays,
			peakMinutes,
			avgMinutes: activeDays > 0 ? Math.round(totalMinutes / activeDays) : 0,
		},
	}
}
