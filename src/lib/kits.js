/**
 * One-time digital kits ("Roblox AI Game Kit" and friends).
 *
 * Bought straight from a landing page with no account first: Paddle collects
 * the email, the webhook (`transaction.completed`) creates or finds the account,
 * records the kit on `users.kits`, and emails a one-time login link to
 * /kit/access. Pure helpers live here; Mongo and email are in the webhook.
 *
 * NEXT_PUBLIC_* must be read with static property access so Next inlines them.
 */

export const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/smart_ai_academy'

export const KITS = {
	'roblox-ai-games': {
		id: 'roblox-ai-games',
		title: 'Roblox AI Game Kit',
		displayPrice: '$27',
		landingPath: '/kit',
		file: 'roblox-ai-game-kit.pdf',
		downloadName: 'SmartCode-Roblox-AI-Game-Kit.pdf',
	},
}

/** Read at call time so tests and server code see the current env. */
export function kitPriceIds() {
	return {
		'roblox-ai-games': cleanId(process.env.NEXT_PUBLIC_PADDLE_PRICE_KIT_GAMES),
	}
}

function cleanId(value) {
	const clean = String(value || '').replace(/^﻿/, '').trim()
	return clean || null
}

export function kitForPriceId(priceId, ids = kitPriceIds()) {
	if (!priceId) return null
	const hit = Object.entries(ids).find(([, id]) => id && id === String(priceId))
	return hit ? KITS[hit[0]] : null
}

/**
 * Kits paid for in a Paddle transaction payload (event.data of
 * `transaction.completed`). Only items whose price id is a known kit count -
 * custom_data from the browser is never trusted to decide what was bought.
 */
export function kitIdsFromTransaction(transaction, ids = kitPriceIds()) {
	const items = Array.isArray(transaction?.items) ? transaction.items : []
	const found = new Set()
	for (const item of items) {
		const priceId = item?.price?.id || item?.price_id
		const kit = kitForPriceId(priceId, ids)
		if (kit) found.add(kit.id)
	}
	return [...found]
}

export function userHasKit(user, kitId) {
	return Array.isArray(user?.kits) && user.kits.includes(kitId)
}

export function userHasAnyKit(user) {
	return Array.isArray(user?.kits) && user.kits.length > 0
}

/** "mike.t@gmail.com" -> "Mike" - a friendly default name for an account made at checkout. */
export function nameFromEmail(email) {
	const local = String(email || '').split('@')[0] || ''
	const word = local.split(/[._+\-\d]+/).find(Boolean) || 'Builder'
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
