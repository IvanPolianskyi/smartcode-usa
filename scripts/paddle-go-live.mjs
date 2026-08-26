/**
 * One-shot live bootstrap after you have a live API key:
 *
 *   1. Recreate the SmartCode catalogue (same as paddle:provision)
 *   2. Create a live client-side token
 *   3. Create the production webhook destination
 *   4. Print the env block to paste into .env.local / Vercel (Preview only until go-live)
 *
 *   PADDLE_ENV=production PADDLE_API_KEY=pdl_live_apikey_... node scripts/paddle-go-live.mjs
 *
 * Does NOT touch sandbox. Does NOT write Vercel for you.
 */

import { loadEnv } from './paddleEnv.mjs'
import { apiBase, paddleEnvName, paddleList, paddleRequest } from './paddleApi.mjs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

loadEnv()

const { WEBHOOK_PATH, SUBSCRIPTION_EVENT_TYPES } = await import(
	'../src/lib/paddleEvents.js'
)
const { allPriceSlots, priceEnvNameFor } = await import('../src/lib/billingCatalog.js')

if (paddleEnvName() !== 'production') {
	console.error('Refusing to run: set PADDLE_ENV=production and a live PADDLE_API_KEY.')
	process.exit(1)
}

const key = process.env.PADDLE_API_KEY || ''
if (!key.startsWith('pdl_live_') && !key.includes('live')) {
	console.warn(
		'Warning: PADDLE_API_KEY does not look like a live key (expected pdl_live_apikey_…).'
	)
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcode.academy').replace(
	/\/$/,
	''
)
const webhookUrl = `${siteUrl}${WEBHOOK_PATH}`

const root = path.dirname(fileURLToPath(import.meta.url))
const provision = spawnSync(
	process.execPath,
	[path.join(root, 'paddle-provision.mjs')],
	{ stdio: 'inherit', env: process.env }
)
if (provision.status !== 0) {
	process.exit(provision.status || 1)
}

console.log('\n--- Live client token ---')
let clientToken = null
const existingTokens = await paddleList('/client-tokens')
const named = existingTokens.find(
	(t) => t.name === 'SmartCode live frontend' && t.status === 'active'
)
if (named?.token) {
	clientToken = named.token
	console.log(`  reusing ${named.id}`)
} else {
	const created = await paddleRequest('/client-tokens', {
		method: 'POST',
		body: { name: 'SmartCode live frontend' },
	})
	clientToken = created.data?.token
	console.log(`  created ${created.data?.id}`)
}

console.log('\n--- Live webhook destination ---')
const settings = await paddleList('/notification-settings')
let match = settings.find((s) => (s.destination || '').replace(/\/$/, '') === webhookUrl)
let webhookSecret = match?.endpoint_secret_key || null

if (!match) {
	const created = await paddleRequest('/notification-settings', {
		method: 'POST',
		body: {
			description: 'SmartCode production billing',
			type: 'url',
			destination: webhookUrl,
			subscribed_events: [...SUBSCRIPTION_EVENT_TYPES],
			include_sensitive_fields: false,
			traffic_source: 'platform',
		},
	})
	match = created.data
	webhookSecret = match?.endpoint_secret_key
	console.log(`  created ${match?.id} → ${webhookUrl}`)
} else {
	console.log(`  already exists ${match.id} → ${webhookUrl}`)
	if (!webhookSecret) {
		console.log(
			'  endpoint_secret_key is not returned on list — copy it from the dashboard if you do not already have it.'
		)
	}
}

console.log('\n--- Env block (Preview / local live test only — do not flip Production until Part 3) ---\n')
console.log(`PADDLE_ENV=production`)
console.log(`NEXT_PUBLIC_PADDLE_ENV=production`)
console.log(`PADDLE_API_KEY=${key}`)
if (webhookSecret) console.log(`PADDLE_WEBHOOK_SECRET=${webhookSecret}`)
else console.log(`PADDLE_WEBHOOK_SECRET=<paste from Paddle Dashboard > Notifications>`)
if (clientToken) console.log(`NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=${clientToken}`)
else console.log(`NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=<from Authentication > Client-side tokens>`)
console.log(`NEXT_PUBLIC_SITE_URL=${siteUrl}`)
console.log(`PADDLE_WEBHOOK_IP_ALLOWLIST=1`)

// Re-read live prices by smartcode_key (env still has sandbox IDs until you paste).
const livePrices = await paddleList('/prices?status=active')
const byKey = new Map()
for (const price of livePrices) {
	const key = price.custom_data?.smartcode_key
	if (key) byKey.set(key, price.id)
}
for (const slot of allPriceSlots()) {
	const envName = priceEnvNameFor(slot.courseId, slot.interval, slot.tier)
	const key = `${slot.courseId}:${slot.tier}:${slot.interval}`
	const id = byKey.get(key)
	if (envName) console.log(`${envName}=${id || '<missing — re-run paddle:provision>'}`)
}

console.log('\n--- Sandbox → live price map ---')
for (const slot of allPriceSlots()) {
	const key = `${slot.courseId}:${slot.tier}:${slot.interval}`
	console.log(`  ${slot.priceId || '(unset sandbox)'}  →  ${byKey.get(key) || '?'}  (${key})`)
}

console.log(`\nAPI base in use: ${apiBase()}`)
console.log('Done. Keep Production Vercel on sandbox until verification + domain approval.')
