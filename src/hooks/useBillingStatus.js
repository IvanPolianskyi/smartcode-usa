'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { entitlementCoversCheckout } from '@/lib/billingActivation'

async function fetchStatus() {
	const response = await fetch('/api/billing/status', { credentials: 'include' })
	if (!response.ok) throw new Error('Could not load your subscription')
	return response.json()
}

function formatDate(value) {
	if (!value) return null
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) return null
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

function daysUntil(value) {
	if (!value) return null
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) return null
	const diff = Math.ceil((date.getTime() - Date.now()) / 86400000)
	return diff > 0 ? diff : 0
}

export function statusCopy(program) {
	switch (program?.status) {
		case 'trialing': {
			const left = daysUntil(program.trialEndsAt ?? program.endsAt)
			return {
				tone: 'trial',
				label: 'Free trial',
				line:
					left === null
						? 'Your trial is active.'
						: `${left} ${left === 1 ? 'day' : 'days'} left.`,
			}
		}
		case 'active':
			return {
				tone: 'ok',
				label: 'Active',
				line: program.cancelAtPeriodEnd
					? 'Cancelled. You keep access until the end of this period.'
					: 'Full access to this program.',
			}
		case 'past_due':
			return {
				tone: 'warn',
				label: 'Payment failed',
				line: program.inGrace
					? 'Update your card to keep access.'
					: 'Access has paused because we could not take payment.',
			}
		case 'paused':
			return { tone: 'warn', label: 'Paused', line: 'This subscription is paused.' }
		case 'canceled':
			return {
				tone: program.active ? 'ok' : 'off',
				label: 'Cancelled',
				line: program.active
					? 'You keep access until the end of the period you paid for.'
					: 'Access has ended.',
			}
		default:
			return { tone: 'off', label: 'Inactive', line: '' }
	}
}

export function formatBillingDate(value) {
	return formatDate(value)
}

/**
 * Loads /api/billing/status, polls after checkout success, and exposes
 * cancel + customer-portal helpers for the dashboard course cards.
 */
export function useBillingStatus() {
	const searchParams = useSearchParams()
	const checkoutSuccess = searchParams.get('checkout') === 'success'
	const expectedCourseId = String(searchParams.get('course') || '').trim() || null
	const [status, setStatus] = useState(null)
	const [loading, setLoading] = useState(true)
	const [activating, setActivating] = useState(checkoutSuccess)
	const [activationStalled, setActivationStalled] = useState(false)
	const [syncing, setSyncing] = useState(false)
	const [error, setError] = useState(null)
	const [opening, setOpening] = useState(false)
	const [cancellingId, setCancellingId] = useState(null)

	const markReady = useCallback(() => {
		setActivating(false)
		// The session's subscribedCourseIds decide whether the course card
		// unlocks. It was fetched before the webhook landed, so re-sync it -
		// otherwise a paying customer sees "locked" until they reload.
		window.dispatchEvent(new Event('auth:login'))
	}, [])

	const syncPurchases = useCallback(async () => {
		setSyncing(true)
		setError(null)
		try {
			await fetch('/api/billing/reconcile', {
				method: 'POST',
				credentials: 'include',
			})
			const data = await fetchStatus()
			setStatus(data)
			// Always re-sync the session: reconcile may have added a second
			// program (e.g. Roblox after Python) that the JWT payload still misses.
			window.dispatchEvent(new Event('auth:login'))
			if (entitlementCoversCheckout(data, expectedCourseId)) {
				setActivationStalled(false)
				setActivating(false)
			}
			return data
		} catch (caught) {
			setError(caught.message || 'Could not refresh access')
			return null
		} finally {
			setSyncing(false)
		}
	}, [expectedCourseId])

	useEffect(() => {
		let cancelled = false
		let timer

		async function load({ poll = false } = {}) {
			try {
				const data = await fetchStatus()
				if (cancelled) return false
				setStatus(data)
				setError(null)
				if (poll && entitlementCoversCheckout(data, expectedCourseId)) {
					markReady()
					return true
				}
				return false
			} catch (caught) {
				if (!cancelled) setError(caught.message)
				return false
			} finally {
				if (!cancelled) setLoading(false)
			}
		}

		load()

		if (checkoutSuccess) {
			setActivating(true)
			let attempts = 0
			let repaired = false
			const poll = async () => {
				attempts += 1
				const ready = await load({ poll: true })
				if (cancelled) return
				if (ready) return

				// Ask Paddle directly early when we know which course is missing:
				// an existing Python sub used to stop this loop on the first tick,
				// so a lost Roblox webhook never got repaired.
				const shouldRepair =
					!repaired && (attempts === 1 || attempts === 6)
				if (shouldRepair) {
					repaired = true
					try {
						await fetch('/api/billing/reconcile', {
							method: 'POST',
							credentials: 'include',
						})
						if (await load({ poll: true })) return
						// Allow a second repair pass around the ~15s mark if the
						// first attempt ran before Paddle finished creating the sub.
						if (attempts === 1) repaired = false
					} catch {
						if (attempts === 1) repaired = false
					}
				}

				if (attempts >= 12) {
					// ~30s and Paddle has nothing for us either. The payment is not
					// lost - say so plainly instead of dropping the customer onto a
					// silently locked dashboard.
					setActivating(false)
					setActivationStalled(true)
					return
				}
				timer = setTimeout(poll, 2500)
			}
			timer = setTimeout(poll, 1500)
		}

		return () => {
			cancelled = true
			if (timer) clearTimeout(timer)
		}
	}, [checkoutSuccess, expectedCourseId, markReady])

	const openPortal = useCallback(async () => {
		setOpening(true)
		setError(null)
		try {
			const response = await fetch('/api/billing/portal', {
				method: 'POST',
				credentials: 'include',
			})
			if (!response.ok) throw new Error('Could not open the billing portal')
			const data = await response.json()
			if (!data.overviewUrl) throw new Error('The billing portal is unavailable')
			window.location.href = data.overviewUrl
		} catch (caught) {
			setError(caught.message)
			setOpening(false)
		}
	}, [])

	const cancelSubscription = useCallback(async (program) => {
		const subId = program?.paddleSubscriptionId
		if (!subId) return

		const until = formatDate(program.endsAt)
		const confirmed = window.confirm(
			until
				? `Cancel ${program.label}? You keep access until ${until}. No further charges after that.`
				: `Cancel ${program.label}? You keep access until the end of the period you already paid for.`
		)
		if (!confirmed) return

		setCancellingId(subId)
		setError(null)
		try {
			const response = await fetch('/api/billing/cancel', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ paddleSubscriptionId: subId }),
			})
			if (!response.ok) throw new Error('Could not cancel this subscription')
			const data = await fetchStatus()
			setStatus(data)
		} catch (caught) {
			setError(caught.message)
		} finally {
			setCancellingId(null)
		}
	}, [])

	const programForCourse = useCallback(
		(courseId) =>
			(status?.programs || []).find((program) =>
				(program.courseIds || []).includes(courseId)
			) || null,
		[status]
	)

	return {
		status,
		loading,
		activating,
		activationStalled,
		syncing,
		error,
		opening,
		cancellingId,
		openPortal,
		cancelSubscription,
		syncPurchases,
		programForCourse,
		expectedCourseId,
		canManageBilling: Boolean(status?.canManageBilling),
	}
}
