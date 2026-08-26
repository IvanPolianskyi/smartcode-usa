/**
 * Shared checkout helpers - used by CheckoutButton and /start page.
 */

import { priceIdFor } from '@/lib/billingCatalog'

/** Plan-picker page for one program - step 2 of the purchase. */
export function planPath(courseId, plan = null) {
	if (!courseId) return '/pricing'
	const base = `/plans/${encodeURIComponent(courseId)}`
	return plan ? `${base}?plan=${encodeURIComponent(plan)}` : base
}

export function startPath({ courseId, plan = 'monthly', tier = 'standard' }) {
	const params = new URLSearchParams()
	if (courseId) params.set('course', courseId)
	if (plan) params.set('plan', plan)
	if (tier) params.set('tier', tier)
	const qs = params.toString()
	return qs ? `/start?${qs}` : '/start'
}

export function normalizePlan(plan) {
	return plan === 'annual' || plan === 'year' ? 'annual' : 'monthly'
}

export function normalizeTier(tier) {
	return tier === 'premium' ? 'premium' : 'standard'
}

/**
 * Run subscription checkout for a signed-in user.
 * @returns {Promise<{ action: 'dashboard'|'paddle'|'error', path?: string, coursePath?: string, message?: string }>}
 */
export async function runAuthenticatedCheckout({
	courseId,
	plan = 'monthly',
	tier = 'standard',
	user,
	loadPaddle,
}) {
	if (!courseId) return { action: 'error', message: 'Pick a program first' }
	if (!user?._id && !user?.id) {
		return { action: 'error', message: 'Sign in required' }
	}

	const planLabel = normalizePlan(plan)
	const planTier = normalizeTier(tier)
	const interval = planLabel === 'annual' ? 'year' : 'month'
	const priceId = priceIdFor(courseId, interval, planTier)
	const coursePath = `/courses/${encodeURIComponent(courseId)}`
	const dashboardPath = '/dashboard'
	const userId = user._id || user.id

	const entitled =
		user.role === 'admin' ||
		user.role === 'teacher' ||
		(Array.isArray(user.subscribedCourseIds) &&
			user.subscribedCourseIds.includes(courseId)) ||
		(Array.isArray(user.purchasedCourses) &&
			user.purchasedCourses.includes(courseId))

	if (entitled) {
		return { action: 'dashboard', path: dashboardPath, coursePath }
	}

	if (!priceId) {
		const grant = await fetch('/api/billing/local-grant', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				courseId,
				plan: planLabel,
				tier: planTier,
			}),
		})
		if (!grant.ok) {
			const payload = await grant.json().catch(() => ({}))
			return {
				action: 'error',
				message: payload.error || 'This plan is not available right now',
			}
		}
		// Force the dashboard to re-sync session + billing (same as Paddle return).
		return {
			action: 'dashboard',
			path: `${dashboardPath}?checkout=success`,
			coursePath,
		}
	}

	if (typeof loadPaddle !== 'function') {
		return { action: 'error', message: 'Payments are not configured' }
	}

	const Paddle = await loadPaddle()
	Paddle.Checkout.open({
		items: [{ priceId, quantity: 1 }],
		customer: user.email ? { email: user.email } : undefined,
		customData: {
			userId: String(userId),
			courseId: String(courseId),
			tier: planTier,
		},
		settings: {
			successUrl: `${window.location.origin}/dashboard?checkout=success`,
		},
	})
	return { action: 'paddle' }
}
