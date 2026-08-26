'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	normalizePlan,
	normalizeTier,
	registerPath,
	runAuthenticatedCheckout,
} from '@/lib/startCheckout'

const PADDLE_SCRIPT = 'https://cdn.paddle.com/paddle/v2/paddle.js'

let paddleLoader = null

function loadPaddle() {
	if (typeof window === 'undefined') return Promise.reject(new Error('browser only'))
	if (paddleLoader) return paddleLoader

	paddleLoader = new Promise((resolve, reject) => {
		if (window.Paddle) {
			resolve(window.Paddle)
			return
		}

		const script = document.createElement('script')
		script.src = PADDLE_SCRIPT
		script.async = true
		script.onload = () => {
			if (!window.Paddle) {
				reject(new Error('Paddle failed to initialise'))
				return
			}
			resolve(window.Paddle)
		}
		script.onerror = () => reject(new Error('Could not load the payment library'))
		document.head.appendChild(script)
	}).then((Paddle) => {
		const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
		if (!token) throw new Error('Payments are not configured')

		if (process.env.NEXT_PUBLIC_PADDLE_ENV !== 'production') {
			Paddle.Environment.set('sandbox')
		}
		Paddle.Initialize({ token })
		return Paddle
	})

	paddleLoader.catch(() => {
		paddleLoader = null
	})

	return paddleLoader
}

/**
 * Opens checkout for a signed-in user, or sends guests to /start.
 */
export default function CheckoutButton({
	courseId,
	plan = 'monthly',
	tier = 'standard',
	className = 'sc-btn sc-btn-primary sc-btn-lg',
	variant,
	children,
	autoStart = false,
}) {
	const router = useRouter()
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState(null)
	const mounted = useRef(true)
	const autoStarted = useRef(false)

	useEffect(() => {
		mounted.current = true
		return () => {
			mounted.current = false
		}
	}, [])

	const openCheckout = useCallback(async () => {
		setError(null)
		setBusy(true)

		try {
			if (!courseId) throw new Error('Pick a program first')

			const planLabel = normalizePlan(plan)
			const planTier = normalizeTier(tier)

			const meResponse = await fetch('/api/auth/me', { credentials: 'include' })
			// 401/404 mean "no usable session", not "something broke" - fall through
			// to the account step rather than dead-ending someone trying to pay.
			if (!meResponse.ok && meResponse.status !== 401 && meResponse.status !== 404) {
				throw new Error('Could not check your account')
			}

			const me = meResponse.ok ? await meResponse.json() : null
			const user = me?.user || null
			if (!user?._id && !user?.id) {
				// We already know they are signed out - send them straight to the
				// account step instead of bouncing through /start to learn it again.
				router.push(registerPath({ courseId, plan: planLabel, tier: planTier }))
				return
			}

			const result = await runAuthenticatedCheckout({
				courseId,
				plan: planLabel,
				tier: planTier,
				user,
				loadPaddle,
			})

			if (result.action === 'dashboard' && result.path) {
				window.dispatchEvent(new Event('auth:login'))
				router.push(result.path)
				return
			}
			if (result.action === 'course' && result.path) {
				router.push(result.path)
				return
			}
			if (result.action === 'error') {
				throw new Error(result.message || 'Checkout could not be opened')
			}
		} catch (caught) {
			if (mounted.current) {
				setError(caught.message || 'Checkout could not be opened')
			}
		} finally {
			if (mounted.current) setBusy(false)
		}
	}, [courseId, plan, tier, router])

	useEffect(() => {
		if (!autoStart || autoStarted.current || !courseId) return
		autoStarted.current = true
		openCheckout()
	}, [autoStart, courseId, openCheckout])

	return (
		<>
			<button
				type="button"
				className={className}
				data-variant={variant}
				onClick={openCheckout}
				disabled={busy}
			>
				{busy ? 'Opening checkout…' : children}
			</button>
			{error ? (
				<p
					role="alert"
					style={{
						color: 'var(--sc-danger)',
						fontSize: 'var(--sc-text-sm)',
						marginTop: 'var(--sc-space-3, 0.75rem)',
					}}
				>
					{error}
				</p>
			) : null}
		</>
	)
}
