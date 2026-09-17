import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { robloxCurriculum } from '@/lib/robloxCurriculum'
import { aiAtWorkCurriculum } from '@/lib/aiAtWorkCurriculum'
import {
	AI_AT_WORK_COURSE_ID,
	PYTHON_COURSE_ID,
	ROBLOX_COURSE_ID,
} from '@/lib/courseIds'
import {
	asDripDate,
	countDripUnlockedLessons,
	countPaidPeriods,
	FREE_TRIAL_LESSON_COUNT,
} from '@/lib/lessonDrip'

export {
	AI_AT_WORK_COURSE_ID,
	PYTHON_COURSE_ID,
	ROBLOX_COURSE_ID,
} from '@/lib/courseIds'

export {
	LESSONS_UNLOCKED_PER_WEEK,
	FREE_TRIAL_LESSON_COUNT,
	countDripUnlockedLessons,
	getNextDripUnlockAt,
} from '@/lib/lessonDrip'

/** LMS course pages. */
export const COURSE_PAGE_PATHS = {
	[PYTHON_COURSE_ID]: '/courses/python-developer-zero-to-junior',
	[ROBLOX_COURSE_ID]: '/courses/roblox-studio',
	[AI_AT_WORK_COURSE_ID]: '/courses/ai-at-work',
}

/** @deprecated use COURSE_PAGE_PATHS */
export const EN_COURSE_PAGE_PATHS = COURSE_PAGE_PATHS

export const KNOWN_COURSE_IDS = new Set([
	PYTHON_COURSE_ID,
	ROBLOX_COURSE_ID,
	AI_AT_WORK_COURSE_ID,
])

export const ONLINE_COURSE_CURRICULA = {
	[PYTHON_COURSE_ID]: pythonCurriculum,
	[ROBLOX_COURSE_ID]: robloxCurriculum,
	[AI_AT_WORK_COURSE_ID]: aiAtWorkCurriculum,
}

export function flattenCourseLessons(courseId) {
	const curriculum = ONLINE_COURSE_CURRICULA[courseId]
	if (!curriculum?.modules) return []
	return curriculum.modules.flatMap((module) => module.lessons || [])
}

export function isKnownCourseId(courseId) {
	return KNOWN_COURSE_IDS.has(courseId)
}

export function isLessonInCourse(courseId, lessonId) {
	if (!courseId || !lessonId) return false
	return flattenCourseLessons(courseId).some((l) => l.lessonId === lessonId)
}

export function hasActiveOnlineCourse(profile, courseId) {
	return (profile?.activeOnlineCourses || []).includes(courseId)
}

export function isTeacherRole(user) {
	return user?.role === 'teacher'
}

/** True when billing (or staff) unlocks this specific course. */
export function isSubscribedToCourse(user, courseId) {
	if (!user || !courseId) return false
	if (user.role === 'admin' || user.role === 'teacher') return true
	const ids = user.subscribedCourseIds
	if (Array.isArray(ids)) return ids.includes(courseId)
	// Legacy payload without per-course list: treat as catalogue unlock.
	return user.subscriptionActive === true && isKnownCourseId(courseId)
}

export function hasStudentCourseAccess(user, courseId) {
	if (!courseId) return false
	if (!user) return false
	if (user.role === 'admin' || user.role === 'teacher') return true
	if (isSubscribedToCourse(user, courseId)) return true
	if ((user.purchasedCourses || []).includes(courseId)) return true
	if ((user.enrolledCourses || []).includes(courseId)) return true
	if (hasActiveOnlineCourse(user.studentProfile, courseId)) return true
	const access = user.studentProfile?.courseAccess?.[courseId]
	if (access?.enabled === true || access?.fullAccess === true) return true
	return false
}

/**
 * Earliest access-start timestamp for drip unlock (subscription grant, else enroll).
 * @returns {Date|null}
 */
export function resolveDripStartedAt(user, courseId, progress = null) {
	if (!courseId) return null
	const candidates = [
		progress?.dripStartedAt,
		progress?.enrolledAt,
		user?.courseDripStartedAt?.[courseId],
	]
		.map(asDripDate)
		.filter(Boolean)
	if (candidates.length === 0) return null
	return new Date(Math.min(...candidates.map((d) => d.getTime())))
}

/**
 * Map courseId → ISO start date from active subscription rows (earliest wins).
 * Used by loadUserWithAccess so client + server share the same drip clock.
 */
export function buildCourseDripStartedAt(subscriptions = []) {
	const map = {}
	for (const sub of subscriptions || []) {
		const started = asDripDate(sub?.createdAt)
		if (!started) continue
		const ids = Array.isArray(sub.courseIds) ? sub.courseIds : []
		for (const courseId of ids) {
			if (!courseId || !isKnownCourseId(String(courseId))) continue
			const key = String(courseId)
			const existing = asDripDate(map[key])
			if (!existing || started < existing) {
				map[key] = started.toISOString()
			}
		}
	}
	return map
}

/**
 * Map courseId → { trialing, paidPeriods } from active subscription rows.
 *
 * `trialing: true` means the free trial (no payment yet) - unlock exactly
 * FREE_TRIAL_LESSON_COUNT lessons. Otherwise `paidPeriods` is how many
 * billing cycles have been paid, one whole curriculum module per cycle.
 * Only courses with a real Paddle subscription row get an entry here -
 * purchased/manually-granted/online-course access keeps the weekly drip.
 * Admin comps (`isManualGrant`) are not billing cycles to count, so they are
 * skipped here too and fall through to the same weekly-drip treatment.
 */
export function buildCourseModuleAccess(subscriptions = []) {
	const map = {}
	for (const sub of subscriptions || []) {
		if (sub?.isManualGrant) continue
		const ids = Array.isArray(sub?.courseIds) ? sub.courseIds : []
		if (!ids.length) continue

		const trialing = Boolean(sub.trialing)
		const paidStartAt = sub.trialEndsAt || sub.createdAt
		const paidPeriods = trialing
			? 0
			: countPaidPeriods(paidStartAt, sub.currentPeriodEnd, sub.billingInterval)

		for (const courseId of ids) {
			if (!courseId || !isKnownCourseId(String(courseId))) continue
			const key = String(courseId)
			const existing = map[key] || { trialing: true, paidPeriods: 0 }
			map[key] = {
				trialing: existing.trialing && trialing,
				paidPeriods: Math.max(existing.paidPeriods, paidPeriods),
			}
		}
	}
	return map
}

/** Читання/запис прогресу: оплачений/онлайн курс або Roblox-прев’ю (урок 1.1). */
export function canReadCourseProgress(user, courseId) {
	if (!user || !courseId || !isKnownCourseId(courseId)) return false
	if (hasStudentCourseAccess(user, courseId)) return true
	if (courseId === ROBLOX_COURSE_ID) return true
	return false
}

/** Запис прогресу по уроку - лише якщо урок відкритий drip/прев’ю. */
export function canUpdateLessonProgress(user, courseId, lessonId, progress = null) {
	if (!user || !courseId || !lessonId) return false
	if (!isKnownCourseId(courseId) || !isLessonInCourse(courseId, lessonId)) return false
	if (user.role === 'admin' || user.role === 'teacher') return true

	const isPurchased = (user.purchasedCourses || []).includes(courseId)
	const unlocked = getUnlockedLessonSet({
		courseId,
		profile: user.studentProfile,
		progress,
		isAdmin: false,
		isTeacher: false,
		isPurchased,
		isSubscribed: isSubscribedToCourse(user, courseId),
		isEnrolled: Boolean(progress),
		dripStartedAt: resolveDripStartedAt(user, courseId, progress),
		moduleAccess: user.courseModuleAccess?.[courseId] || null,
	})

	return unlocked.has(lessonId)
}

export function isCourseFullAccess(profile, courseId) {
	const access = profile?.courseAccess?.[courseId]
	if (!access) return false
	if (access.fullAccess === true) return true
	const all = flattenCourseLessons(courseId)
	const unlocked = access.unlockedLessons || []
	return all.length > 0 && unlocked.length >= all.length
}

/**
 * Open lesson IDs for a user.
 * Staff: all lessons.
 * Paddle subscribers (moduleAccess given): free trial unlocks the first
 *   FREE_TRIAL_LESSON_COUNT lessons; each paid billing cycle then unlocks one
 *   whole curriculum module (cycle 1 → module 1, cycle 2 → +module 2, ...).
 * Other entitled students (purchased/online/manually granted): weekly drip
 *   (2 new lessons per week from access start).
 * Everyone else: free preview (first lesson) + any manual unlocks.
 */
export function getUnlockedLessonSet({
	courseId,
	profile,
	progress,
	isAdmin = false,
	isTeacher = false,
	isPurchased = false,
	isEnrolled = false,
	isSubscribed = false,
	dripStartedAt = null,
	moduleAccess = null,
	now = new Date(),
}) {
	const allLessons = flattenCourseLessons(courseId)
	const allIds = allLessons.map((l) => l.lessonId)
	if (allIds.length === 0) return new Set()

	// The first lesson of each course is open to everyone: it is the sample that
	// sells the subscription, and it gives a reviewer something to look at.
	const freePreview = new Set(allIds.length ? [allIds[0]] : [])

	const manualUnlocked = new Set(
		(profile?.courseAccess?.[courseId]?.unlockedLessons || []).filter((id) =>
			allIds.includes(id)
		)
	)

	if (isAdmin || isTeacher) {
		return new Set(allIds)
	}

	if (moduleAccess) {
		const unlocked =
			moduleAccess.trialing && moduleAccess.paidPeriods <= 0
				? new Set(allIds.slice(0, FREE_TRIAL_LESSON_COUNT))
				: new Set(
						(ONLINE_COURSE_CURRICULA[courseId]?.modules || [])
							.slice(0, Math.max(1, moduleAccess.paidPeriods))
							.flatMap((module) => (module.lessons || []).map((l) => l.lessonId))
					)
		for (const id of manualUnlocked) unlocked.add(id)
		return unlocked
	}

	const hasOnline =
		hasActiveOnlineCourse(profile, courseId) ||
		profile?.courseAccess?.[courseId]?.enabled === true

	// Progress alone is not entitlement (Roblox free preview also creates a
	// progress row). Drip only starts after billing / online / purchase access.
	const entitled =
		isPurchased ||
		isSubscribed ||
		hasOnline ||
		isCourseFullAccess(profile, courseId)

	if (entitled) {
		const start =
			asDripDate(dripStartedAt) ||
			asDripDate(progress?.dripStartedAt) ||
			asDripDate(progress?.enrolledAt)
		const count = Math.min(
			allIds.length,
			countDripUnlockedLessons(start, { now })
		)
		const unlocked = new Set(allIds.slice(0, count))
		for (const id of manualUnlocked) unlocked.add(id)
		return unlocked
	}

	return new Set([...freePreview, ...manualUnlocked])
}

export function isLessonUnlockedInCourse(lessonId, ctx) {
	return getUnlockedLessonSet(ctx).has(lessonId)
}

/** Курси, до яких учень має доступ у кабінеті. */
export function getStudentAccessibleCourseIds(user) {
	if (user?.role === 'admin' || user?.role === 'teacher') {
		return [...KNOWN_COURSE_IDS]
	}
	const ids = new Set()
	if (Array.isArray(user?.subscribedCourseIds)) {
		user.subscribedCourseIds.forEach((id) => {
			if (isKnownCourseId(id)) ids.add(id)
		})
	} else if (user?.subscriptionActive === true) {
		KNOWN_COURSE_IDS.forEach((id) => ids.add(id))
	}
	;(user?.purchasedCourses || []).forEach((id) => ids.add(id))
	;(user?.enrolledCourses || []).forEach((id) => ids.add(id))
	;(user?.studentProfile?.activeOnlineCourses || []).forEach((id) => ids.add(id))
	const accessMap = user?.studentProfile?.courseAccess || {}
	Object.keys(accessMap).forEach((id) => {
		if (accessMap[id]?.enabled || accessMap[id]?.fullAccess) ids.add(id)
	})
	return [...ids].filter((id) => KNOWN_COURSE_IDS.has(id) || Boolean(id))
}

/** CTA на сторінку курсу (самостійна купівля прибрана). */
export function getCoursePageHref(courseId) {
	return COURSE_PAGE_PATHS[courseId] || `/courses/${courseId}`
}

/** @deprecated use getCoursePageHref */
export function getEnHomeCourseHref(courseId) {
	return getCoursePageHref(courseId)
}

export function getRemovedOnlineCourseIds(prevOnlineIds = [], nextOnlineIds = [], purchasedCourses = []) {
	const purchased = new Set(purchasedCourses || [])
	const nextSet = new Set((nextOnlineIds || []).filter(Boolean))
	return (prevOnlineIds || []).filter((id) => id && !nextSet.has(id) && !purchased.has(id))
}

export function buildCourseAccessForOnlineCourses(_prevAccess = {}, onlineCourseIds = [], courseFullAccess = {}) {
	const next = {}
	const ids = (onlineCourseIds || []).filter(Boolean)

	ids.forEach((courseId) => {
		const full = Boolean(courseFullAccess[courseId])
		const lessonIds = flattenCourseLessons(courseId).map((l) => l.lessonId)
		next[courseId] = {
			enabled: true,
			fullAccess: full,
			unlockedLessons: full ? lessonIds : [],
		}
	})

	return next
}
