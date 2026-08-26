/**
 * Shared Paddle.js loader for checkout and PricePreview.
 * Client-only — never import from a Server Component.
 */

import { initializePaddle } from '@paddle/paddle-js'

let paddlePromise = null

/**
 * Initialise Paddle.js once per page load.
 * Fails loudly if the public env vars are missing — never silently defaults.
 */
export function loadPaddle() {
	if (typeof window === 'undefined') {
		return Promise.reject(new Error('Paddle is browser-only'))
	}

	if (paddlePromise) return paddlePromise

	const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
	const environment = process.env.NEXT_PUBLIC_PADDLE_ENV

	if (!token) {
		paddlePromise = Promise.reject(new Error('NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is not set'))
		paddlePromise.catch(() => {
			paddlePromise = null
		})
		return paddlePromise
	}

	if (environment !== 'sandbox' && environment !== 'production') {
		paddlePromise = Promise.reject(
			new Error(
				'NEXT_PUBLIC_PADDLE_ENV must be "sandbox" or "production" (got ' +
					JSON.stringify(environment) +
					')'
			)
		)
		paddlePromise.catch(() => {
			paddlePromise = null
		})
		return paddlePromise
	}

	paddlePromise = initializePaddle({ token, environment }).then((paddle) => {
		if (!paddle) throw new Error('Paddle failed to initialise')
		return paddle
	})

	paddlePromise.catch(() => {
		paddlePromise = null
	})

	return paddlePromise
}
