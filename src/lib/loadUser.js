import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'
import { getEntitlement } from '@/lib/entitlements'
import {
	KNOWN_COURSE_IDS,
	buildCourseDripStartedAt,
} from '@/lib/courseLessonAccess'

/**
 * Load a user together with their subscription state.
 *
 * The access checks in `courseLessonAccess.js` are synchronous and are called
 * from a dozen places. Rather than make all of them async, the entitlement is
 * resolved once here and attached as `subscribedCourseIds` (+ boolean
 * `subscriptionActive` for older call sites).
 *
 * Anything that gates paid content must load the user through this function.
 * A plain `users.findOne()` produces a user with no `subscribedCourseIds`,
 * which the access checks read as "no subscription" - failing closed.
 */
export async function loadUserWithAccess(userId) {
	if (!userId) return null

	let objectId
	try {
		objectId = userId instanceof ObjectId ? userId : new ObjectId(String(userId))
	} catch {
		return null
	}

	const users = await getCollection('users')
	const user = await users.findOne({ _id: objectId })
	if (!user) return null

	// Staff never depend on billing state.
	if (user.role === 'admin' || user.role === 'teacher') {
		return {
			...user,
			subscriptionActive: true,
			subscribedCourseIds: [...KNOWN_COURSE_IDS],
			courseDripStartedAt: {},
			entitlement: null,
		}
	}

	let entitlement = null
	try {
		entitlement = await getEntitlement(objectId)
	} catch (error) {
		console.error('[access] entitlement lookup failed:', error?.message || error)
		return {
			...user,
			subscriptionActive: false,
			subscribedCourseIds: [],
			courseDripStartedAt: {},
			entitlement: null,
		}
	}

	const subscribedCourseIds = entitlement.courseIds || []

	return {
		...user,
		subscriptionActive: subscribedCourseIds.length > 0,
		subscribedCourseIds,
		courseDripStartedAt: buildCourseDripStartedAt(entitlement.subscriptions || []),
		entitlement,
	}
}
