/**
 * Preflight for the Paddle integration: everything that has to be true before
 * a real customer can pay and get access.
 *
 *   node scripts/paddle-doctor.mjs                 # check the local .env.local
 *   PADDLE_ENV=production node scripts/paddle-doctor.mjs
 *
 * Checks, in the order they break in real life:
 *   1. the env vars exist and the server and browser agree on sandbox vs live
 *   2. the API key works
 *   3. every price the site can sell exists, is active, and charges what the
 *      page promises - including the free trial the copy advertises
 *   4. Paddle has a webhook destination pointing at this deployment and is
 *      subscribed to every subscription event the webhook handles
 *
 * Exits non-zero if anything would stop a purchase from granting access.
 */

import { loadEnv } from './paddleEnv.mjs'
import { apiBase, paddleEnvName, paddleList, paddleRequest } from './paddleApi.mjs'

loadEnv()

const { BILLING_TIERS, allPriceSlots, priceValue } = await import(
	'../src/lib/billingCatalog.js'
)
const { LEGAL } = await import('../src/lib/legalConfig.js')
const { SUBSCRIPTION_EVENT_TYPES, WEBHOOK_PATH } = await import(
	'../src/lib/paddleEvents.js'
)

let failures = 0
let warnings = 0

function pass(message) {
	console.log(`  ok    ${message}`)
}

function fail(message, hint) {
	failures += 1
	console.log(`  FAIL  ${message}`)
	if (hint) console.log(`        ${hint}`)
}

function warn(message, hint) {
	warnings += 1
	console.log(`  warn  ${message}`)
	if (hint) console.log(`        ${hint}`)
}

function section(title) {
	console.log(`\n${title}`)
}

function isPlaceholder(value) {
	return !value || /^<.*>$/.test(value) || /^test_paddle_/.test(value)
}

function checkEnvVars() {
	section('1. Environment')

	const env = paddleEnvName()
	pass(`PADDLE_ENV = ${env} (${apiBase()})`)

	const publicEnv = process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox'
	if (publicEnv !== env) {
		fail(
			`NEXT_PUBLIC_PADDLE_ENV (${publicEnv}) disagrees with PADDLE_ENV (${env})`,
			'The overlay would open against one Paddle account while the server talks to the other.'
		)
	} else {
		pass(`NEXT_PUBLIC_PADDLE_ENV = ${publicEnv}`)
	}

	for (const name of ['PADDLE_API_KEY', 'PADDLE_WEBHOOK_SECRET', 'NEXT_PUBLIC_PADDLE_CLIENT_TOKEN']) {
		const value = process.env[name]
		if (!value) {
			fail(`${name} is not set`, 'Paddle Dashboard > Developer tools.')
		} else if (isPlaceholder(value)) {
			fail(`${name} is a placeholder ("${value.slice(0, 12)}…")`)
		} else {
			pass(`${name} is set`)
		}
	}

	const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || ''
	if (token && !isPlaceholder(token)) {
		const looksLive = token.startsWith('live_')
		if (env === 'production' && !looksLive) {
			fail(
				'NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is a sandbox token but PADDLE_ENV is production'
			)
		} else if (env !== 'production' && looksLive) {
			warn('A live client token is being used against the sandbox API')
		}
	}

	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
	if (!siteUrl) {
		fail('NEXT_PUBLIC_SITE_URL is not set', 'Needed for the checkout success redirect and the legal pages.')
	} else if (env === 'production' && !siteUrl.startsWith('https://')) {
		fail(`NEXT_PUBLIC_SITE_URL is ${siteUrl} - production checkout needs the https public domain`)
	} else {
		pass(`NEXT_PUBLIC_SITE_URL = ${siteUrl}`)
	}

	const missingPriceEnv = allPriceSlots().filter((slot) => !slot.priceId)
	if (missingPriceEnv.length === allPriceSlots().length) {
		fail(
			'No NEXT_PUBLIC_PADDLE_PRICE_* variables are set - nothing can be sold',
			'Run: node scripts/paddle-provision.mjs'
		)
	} else if (missingPriceEnv.length) {
		fail(
			`${missingPriceEnv.length} price variable(s) missing: ${missingPriceEnv
				.map((s) => s.env)
				.join(', ')}`,
			'Those plans fall through to an error at checkout.'
		)
	} else {
		pass(`all ${allPriceSlots().length} price variables are set`)
	}
}

async function checkApiKey() {
	section('2. API key')
	try {
		await paddleRequest('/event-types')
		pass('the API key authenticates against Paddle')
		return true
	} catch (error) {
		fail(error.message)
		return false
	}
}

function expectedAmount(tier, interval) {
	const entry = BILLING_TIERS[tier]
	const display = interval === 'year' ? entry.annualPrice : entry.monthlyPrice
	return { display, minor: String(Math.round(priceValue(display) * 100)) }
}

async function checkPrices() {
	section('3. Catalogue')

	const slots = allPriceSlots().filter((slot) => slot.priceId)
	if (!slots.length) {
		warn('no price IDs configured, nothing to verify')
		return
	}

	for (const slot of slots) {
		const label = `${slot.label} ${slot.tier} ${slot.interval}ly`
		let price
		try {
			const payload = await paddleRequest(`/prices/${slot.priceId}?include=product`)
			price = payload.data
		} catch (error) {
			fail(`${label} (${slot.env}): ${error.message}`)
			continue
		}

		const problems = []
		if (price.status !== 'active') problems.push(`price status ${price.status}`)
		if (price.product && price.product.status !== 'active') {
			problems.push(`product status ${price.product.status}`)
		}

		const expected = expectedAmount(slot.tier, slot.interval)
		if (price.unit_price?.amount !== expected.minor) {
			problems.push(
				`charges ${price.unit_price?.amount} ${price.unit_price?.currency_code}, site says ${expected.display}`
			)
		}
		if (price.billing_cycle?.interval !== slot.interval) {
			problems.push(
				`billed per ${price.billing_cycle?.interval || 'one-off'}, expected per ${slot.interval}`
			)
		}
		const trial = price.trial_period
		if (!trial) {
			problems.push(
				`no trial, but the site advertises ${LEGAL.trialDays} days free ($0 today)`
			)
		} else if (trial.interval !== 'day' || trial.frequency !== LEGAL.trialDays) {
			problems.push(
				`trial is ${trial.frequency} ${trial.interval}, site says ${LEGAL.trialDays} days`
			)
		}

		if (problems.length) {
			fail(`${label} (${slot.priceId}): ${problems.join('; ')}`, 'Fix with: node scripts/paddle-provision.mjs --fix')
		} else {
			pass(`${label} - ${expected.display} after ${LEGAL.trialDays} free days (${slot.priceId})`)
		}
	}
}

async function checkWebhook() {
	section('4. Webhook')

	const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')
	const wanted = siteUrl ? `${siteUrl}${WEBHOOK_PATH}` : null

	let settings
	try {
		settings = await paddleList('/notification-settings')
	} catch (error) {
		fail(error.message)
		return
	}

	const destinations = settings.map((s) => s.destination).filter(Boolean)
	if (!settings.length) {
		fail(
			'Paddle has no notification destinations',
			`Add one pointing at ${wanted || `https://your-domain${WEBHOOK_PATH}`} - without it nobody who pays gets access.`
		)
		return
	}

	const match = wanted
		? settings.find((s) => (s.destination || '').replace(/\/$/, '') === wanted)
		: null

	if (!match) {
		fail(
			`no notification destination points at ${wanted}`,
			`Paddle currently notifies: ${destinations.join(', ') || 'nothing'}`
		)
		return
	}

	pass(`destination ${match.destination}`)

	if (match.active === false) {
		fail('that destination is paused in Paddle')
	}
	if (match.type && match.type !== 'url') {
		warn(`destination type is "${match.type}", expected "url"`)
	}

	const subscribed = new Set(
		(match.subscribed_events || []).map((e) => e.name || e).filter(Boolean)
	)
	const missing = SUBSCRIPTION_EVENT_TYPES.filter((name) => !subscribed.has(name))
	if (missing.length) {
		fail(
			`destination is not subscribed to: ${missing.join(', ')}`,
			'Access is granted and revoked from these events only.'
		)
	} else {
		pass(`subscribed to all ${SUBSCRIPTION_EVENT_TYPES.length} subscription events`)
	}

	if (!process.env.PADDLE_WEBHOOK_SECRET) {
		fail('PADDLE_WEBHOOK_SECRET is unset, so every delivery is rejected as unsigned')
	}
}

async function main() {
	console.log(`Paddle preflight for ${LEGAL.brandName}`)

	checkEnvVars()

	const keyWorks = await checkApiKey()
	if (keyWorks) {
		await checkPrices()
		await checkWebhook()
	} else {
		console.log('\nSkipping catalogue and webhook checks - no working API key.')
	}

	console.log(`\n${'-'.repeat(60)}`)
	if (failures) {
		console.log(`${failures} blocking problem(s), ${warnings} warning(s).`)
		console.log('A customer cannot buy and get access until the failures above are fixed.')
		process.exit(1)
	}
	console.log(`All checks passed${warnings ? `, ${warnings} warning(s)` : ''}.`)
}

main().catch((error) => {
	console.error(`\n${error.message}`)
	process.exit(1)
})
