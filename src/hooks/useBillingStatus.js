'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

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
	const [status, setStatus] = useState(null)
	const [loading, setLoading] = useState(true)
	const [activating, setActivating] = useState(checkoutSuccess)
	const [error, setError] = useState(null)
	const [opening, setOpening] = useState(false)
	const [cancellingId, setCancellingId] = useState(null)

	useEffect(() => {
		let cancelled = false
		let timer

		async function load({ poll = false } = {}) {
			try {
				const data = await fetchStatus()
				if (cancelled) return false
				setStatus(data)
				setError(null)
				if (poll && data?.hasSubscription && (data.courseIds || []).length > 0) {
					setActivating(false)
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
			const poll = async () => {
				attempts += 1
				const ready = await load({ poll: true })
				if (ready || attempts >= 12 || cancelled) {
					setActivating(false)
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
	}, [checkoutSuccess])

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
		error,
		opening,
		cancellingId,
		openPortal,
		cancelSubscription,
		programForCourse,
		canManageBilling: Boolean(status?.canManageBilling),
	}
}
