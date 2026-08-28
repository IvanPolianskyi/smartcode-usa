/**
 * Shared checkout helpers - used by CheckoutButton and /start page.
 */

import { comparePlans, priceIdFor } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'

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

/**
 * Where a signed-out visitor goes to buy: make an account, then resume at
 * /start, which opens Paddle. Skipping the /start round trip on the way in
 * saves a full page load and a spinner flash.
 */
export function registerPath({ courseId, plan = 'monthly', tier = 'standard' }) {
	const resume = startPath({ courseId, plan, tier })
	return `/register?redirect=${encodeURIComponent(resume)}`
}

const PROMO_STORAGE_KEY = 'sc_promo'

/**
 * Campaign code from `?promo=` (or `?discount=`), remembered for the session.
 *
 * It has to survive the register → /start round trip, otherwise every code sent
 * to a signed-out audience is lost the moment they make an account - which is
 * most of the people a campaign is aimed at.
 *
 * @returns {string|null}
 */
export function readPromoCode() {
	if (typeof window === 'undefined') return null
	try {
		const params = new URLSearchParams(window.location.search)
		const fromUrl = String(params.get('promo') || params.get('discount') || '').trim()
		if (fromUrl) {
			// Paddle codes are short and alphanumeric; anything else is noise.
			const clean = fromUrl.slice(0, 40)
			window.sessionStorage.setItem(PROMO_STORAGE_KEY, clean)
			return clean
		}
		return window.sessionStorage.getItem(PROMO_STORAGE_KEY) || null
	} catch {
		// Private mode / blocked storage - a missing promo must never block a sale.
		return null
	}
}

export function normalizePlan(plan) {
	return plan === 'annual' || plan === 'year' ? 'annual' : 'monthly'
}

export function normalizeTier(tier) {
	return tier === 'premium' ? 'premium' : 'standard'
}

/**
 * Read a `?redirect=` resume target back into a checkout intent.
 *
 * Only a `/start` link carrying a course is a purchase in progress. Anything
 * else - a login resume, a deep link into a lesson - returns null and must be
 * followed as an ordinary navigation, never treated as "open Paddle".
 *
 * @returns {{ courseId: string, plan: string, tier: string } | null}
 */
export function parseStartRedirect(redirect) {
	const value = String(redirect || '')
	// `//evil.com` is a protocol-relative URL, not a local path.
	if (!value.startsWith('/start') || value.startsWith('//')) return null

	const queryStart = value.indexOf('?')
	if (queryStart === -1) return null

	const params = new URLSearchParams(value.slice(queryStart + 1))
	const courseId = String(params.get('course') || '').trim()
	if (!courseId) return null

	return {
		courseId,
		plan: normalizePlan(params.get('plan')),
		tier: normalizeTier(params.get('tier')),
	}
}

/**
 * Run subscription checkout for a signed-in user.
 *
 * @param {object} options
 * @param {Array<object>} [options.programs] live subscriptions from
 *   /api/billing/status. Without them an existing subscriber cannot be told
 *   apart from a new one, and an upgrade would open a second checkout.
 * @param {string|null} [options.discountCode] Paddle discount to pre-apply.
 * @returns {Promise<{ action: 'dashboard'|'paddle'|'change-plan'|'error', path?: string, coursePath?: string, message?: string }>}
 */
export async function runAuthenticatedCheckout({
	courseId,
	plan = 'monthly',
	tier = 'standard',
	user,
	loadPaddle,
	programs = [],
	discountCode = null,
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

	// Staff and one-off purchases never route through billing.
	if (
		user.role === 'admin' ||
		user.role === 'teacher' ||
		(Array.isArray(user.purchasedCourses) && user.purchasedCourses.includes(courseId))
	) {
		return { action: 'dashboard', path: dashboardPath, coursePath }
	}

	// The live subscription covering this program, if any. Holding a Standard
	// plan is not a reason to refuse a Premium purchase - treating "has any
	// subscription for this course" as "done" is what silently killed every
	// upgrade: the customer was bounced to the dashboard they came from.
	const current = (programs || []).find(
		(program) =>
			program?.active !== false && (program?.courseIds || []).includes(courseId)
	)

	if (current) {
		const move = comparePlans(current.priceId, priceId)

		// Already on exactly this plan - nothing to sell.
		if (!priceId || move?.same) {
			return { action: 'dashboard', path: dashboardPath, coursePath }
		}

		// A live Paddle subscription is re-priced in place. Opening a second
		// checkout would leave the customer paying for two subscriptions to the
		// same program.
		if (current.canChangePlan && current.paddleSubscriptionId) {
			return {
				action: 'change-plan',
				paddleSubscriptionId: current.paddleSubscriptionId,
				priceId,
				upgrade: move ? move.upgrade : true,
				courseId,
				plan: planLabel,
				tier: planTier,
				coursePath,
				path: dashboardPath,
			}
		}

		// Manual/admin grant, or a price we no longer recognise: there is no
		// Paddle subscription to move, so leave it alone rather than double-bill.
		return { action: 'dashboard', path: dashboardPath, coursePath }
	}

	if (!priceId) {
		// No Paddle price configured for this plan. In production that is a
		// deployment gap, not something the visitor did - say so and give them a
		// way to buy anyway, instead of a 404 from the dev-only grant route.
		if (process.env.NODE_ENV === 'production') {
			return {
				action: 'error',
				message: `Checkout for this plan is not available right now. Email ${LEGAL.supportEmail} and we will get you started today.`,
			}
		}

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
		// Include the course so polling waits for *this* grant, not an older one.
		return {
			action: 'dashboard',
			path: `${dashboardPath}?checkout=success&course=${encodeURIComponent(courseId)}`,
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
		// Campaign / win-back codes arrive as ?promo= and are handed straight to
		// Paddle, which is the only thing that may decide a code is valid.
		discountCode: discountCode || undefined,
		customData: {
			userId: String(userId),
			courseId: String(courseId),
			tier: planTier,
		},
		settings: {
			displayMode: 'overlay',
			variant: 'one-page',
			allowLogout: !user.email,
			// Welcome page polls until *this* course unlocks, then sends them to
			// the dashboard. Never grant access from this redirect — entitlements.js
			// is the source of truth. The course query is required so a second
			// purchase is not mistaken for "already activated" via an older sub.
			successUrl: `${window.location.origin}/welcome?checkout=success&course=${encodeURIComponent(courseId)}`,
		},
	})
	return { action: 'paddle' }
}
