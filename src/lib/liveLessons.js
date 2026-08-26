/**
 * Live lesson calendar for Premium students.
 * Admin CRUD writes to Mongo `liveLessons`; students read via /api/live-lessons.
 */

import { ALL_PROGRAM_COURSE_IDS } from '@/lib/courseIds'
import { BILLING_PROGRAMS } from '@/lib/billingCatalog'
import { getCollection } from '@/lib/mongodb'

const DEFAULT_JOIN_URL =
	process.env.NEXT_PUBLIC_DEFAULT_ZOOM_URL || 'https://zoom.us/join'

let indexReady = false

export async function getLiveLessonsCollection() {
	const col = await getCollection('liveLessons')
	if (!indexReady) {
		await col.createIndex({ startsAt: 1 }).catch(() => {})
		indexReady = true
	}
	return col
}

export function labelForLiveCourseId(courseId) {
	if (!courseId) return 'All programs'
	const program = BILLING_PROGRAMS.find((p) => p.courseId === courseId)
	return program?.label || courseId
}

/**
 * @param {object} doc
 */
export function serializeLiveLesson(doc) {
	if (!doc) return null
	const joinUrl = String(doc.joinUrl || '').trim() || DEFAULT_JOIN_URL
	const youtubeUrl = String(doc.youtubeUrl || '').trim()
	return {
		id: String(doc._id),
		title: String(doc.title || '').trim(),
		courseId: doc.courseId || null,
		courseLabel: labelForLiveCourseId(doc.courseId || null),
		startsAt: doc.startsAt ? new Date(doc.startsAt).toISOString() : null,
		endsAt: doc.endsAt ? new Date(doc.endsAt).toISOString() : null,
		joinUrl,
		youtubeUrl: youtubeUrl || null,
		createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null,
		updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : null,
	}
}

/**
 * Validate create/update body. Returns { error } or { data }.
 * @param {object} body
 * @param {{ partial?: boolean }} [opts]
 */
export function parseLiveLessonBody(body, opts = {}) {
	const partial = Boolean(opts.partial)
	const data = {}

	if (!partial || body.title !== undefined) {
		const title = String(body?.title || '').trim()
		if (!title) return { error: 'Title is required' }
		if (title.length > 160) return { error: 'Title is too long' }
		data.title = title
	}

	if (!partial || body.courseId !== undefined) {
		const raw = body?.courseId
		if (raw === null || raw === '' || raw === 'all') {
			data.courseId = null
		} else {
			const courseId = String(raw).trim()
			if (!ALL_PROGRAM_COURSE_IDS.includes(courseId)) {
				return { error: 'Invalid courseId' }
			}
			data.courseId = courseId
		}
	}

	if (!partial || body.startsAt !== undefined) {
		const startsAt = new Date(body?.startsAt)
		if (Number.isNaN(startsAt.getTime())) {
			return { error: 'Valid startsAt is required' }
		}
		data.startsAt = startsAt
	}

	if (!partial || body.endsAt !== undefined) {
		const endsAt = new Date(body?.endsAt)
		if (Number.isNaN(endsAt.getTime())) {
			return { error: 'Valid endsAt is required' }
		}
		data.endsAt = endsAt
	}

	if (data.startsAt && data.endsAt && data.endsAt <= data.startsAt) {
		return { error: 'endsAt must be after startsAt' }
	}

	if (!partial || body.joinUrl !== undefined) {
		const joinUrl = String(body?.joinUrl || '').trim()
		data.joinUrl = joinUrl || DEFAULT_JOIN_URL
	}

	if (!partial || body.youtubeUrl !== undefined) {
		const youtubeUrl = String(body?.youtubeUrl || '').trim()
		if (youtubeUrl && !/^https?:\/\//i.test(youtubeUrl)) {
			return { error: 'youtubeUrl must be an http(s) URL' }
		}
		data.youtubeUrl = youtubeUrl
	}

	return { data }
}

/**
 * Split lessons into upcoming (endsAt >= now) and past (endsAt < now).
 * @param {object[]} lessons serialized
 * @param {Date} [now]
 */
export function partitionLiveLessons(lessons, now = new Date()) {
	const upcoming = []
	const past = []
	for (const lesson of lessons) {
		const end = lesson.endsAt ? new Date(lesson.endsAt) : null
		if (end && end.getTime() < now.getTime()) {
			past.push(lesson)
		} else {
			upcoming.push(lesson)
		}
	}
	upcoming.sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))
	past.sort((a, b) => new Date(b.startsAt) - new Date(a.startsAt))
	return { upcoming, past }
}
