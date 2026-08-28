/**
 * Post-checkout readiness: wait for the program that was just bought.
 *
 * A customer who already has Python must not be treated as "activated" the
 * moment they land after buying Roblox - otherwise the welcome page redirects
 * and polling stops before the new webhook can grant access.
 *
 * @param {{ courseIds?: string[], hasSubscription?: boolean } | null | undefined} status
 * @param {string | null | undefined} expectedCourseId course from ?course=
 * @returns {boolean}
 */
export function entitlementCoversCheckout(status, expectedCourseId) {
	const ids = status?.courseIds || []
	const expected = String(expectedCourseId || '').trim()
	if (expected) return ids.includes(expected)
	return Boolean(status?.hasSubscription) && ids.length > 0
}
