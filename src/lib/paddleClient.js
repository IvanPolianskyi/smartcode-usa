/**
 * Shared Paddle.js loader for checkout and PricePreview.
 * Client-only — never import from a Server Component.
 */

import { initializePaddle } from '@paddle/paddle-js'

let paddlePromise = null
/** @type {string | null} */
let paddlePwCustomerId = null

/**
 * Initialise Paddle.js once per page load.
 * Fails loudly if the public env vars are missing — never silently defaults.
 *
 * @param {{ paddleCustomerId?: string | null }} [options]
 *   When the signed-in user already has a Paddle customer id (`ctm_…`), pass it
 *   so Retain (`pwCustomer`) can recover payments. Never pass email or our
 *   internal Mongo user id here.
 */
export function loadPaddle(options = {}) {
	if (typeof window === 'undefined') {
		return Promise.reject(new Error('Paddle is browser-only'))
	}

	const nextPw =
		options.paddleCustomerId &&
		String(options.paddleCustomerId).startsWith('ctm_')
			? String(options.paddleCustomerId)
			: null

	// Re-init if we later learn the Retain customer id (first call had none).
	if (paddlePromise && nextPw && nextPw !== paddlePwCustomerId) {
		paddlePromise = null
		paddlePwCustomerId = null
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

	paddlePwCustomerId = nextPw
	const init = {
		token,
		environment,
	}
	if (nextPw) {
		init.pwCustomer = { id: nextPw }
	}

	paddlePromise = initializePaddle(init).then((paddle) => {
		if (!paddle) throw new Error('Paddle failed to initialise')
		return paddle
	})

	paddlePromise.catch(() => {
		paddlePromise = null
		paddlePwCustomerId = null
	})

	return paddlePromise
}
