/**
 * Create (or repair) the Paddle catalogue this app expects.
 *
 *   node scripts/paddle-provision.mjs            # create what is missing
 *   node scripts/paddle-provision.mjs --dry-run  # show the plan, change nothing
 *   node scripts/paddle-provision.mjs --fix      # also correct drifted prices
 *
 * Runs against PADDLE_ENV (sandbox unless set to production). Idempotent:
 * every product and price is tagged in custom_data with a stable key, so a
 * second run finds what the first run made instead of duplicating it.
 *
 * Prices, tiers, and the trial length all come from src/lib - this script
 * never invents a number. Change the catalogue there, re-run with --fix.
 */

import { loadEnv } from './paddleEnv.mjs'
import { apiBase, paddleEnvName, paddleList, paddleRequest } from './paddleApi.mjs'

loadEnv()

const { BILLING_PROGRAMS, BILLING_TIERS, allPriceSlots, priceValue } = await import(
	'../src/lib/billingCatalog.js'
)
const { LEGAL } = await import('../src/lib/legalConfig.js')

const DRY_RUN = process.argv.includes('--dry-run')
const FIX = process.argv.includes('--fix')
const CURRENCY = (process.env.PADDLE_CURRENCY || 'USD').toUpperCase()
/** Non-standard tax categories must be enabled on the account first. */
const TAX_CATEGORY = process.env.PADDLE_TAX_CATEGORY || 'standard'

const productKey = (courseId, tier) => `${courseId}:${tier}`
const priceKey = (courseId, tier, interval) => `${courseId}:${tier}:${interval}`

/** Display price ("$14") to Paddle minor units ("1400"). */
function minorUnits(display) {
	return String(Math.round(priceValue(display) * 100))
}

function displayPriceFor(tier, interval) {
	const entry = BILLING_TIERS[tier]
	return interval === 'year' ? entry.annualPrice : entry.monthlyPrice
}

function log(...args) {
	console.log(...args)
}

async function ensureProduct(existingProducts, program, tier) {
	const key = productKey(program.courseId, tier)
	const tierLabel = BILLING_TIERS[tier].label
	const name = `${program.label} - ${tierLabel}`
	const found = existingProducts.find((p) => p.custom_data?.smartcode_key === key)

	if (found) {
		log(`  product ok      ${name}  ${found.id}`)
		return found
	}

	if (DRY_RUN) {
		log(`  product CREATE  ${name}  (dry run)`)
		return { id: `pro_dryrun_${key}`, custom_data: { smartcode_key: key } }
	}

	const payload = await paddleRequest('/products', {
		method: 'POST',
		body: {
			name,
			tax_category: TAX_CATEGORY,
			description: `${program.blurb} ${BILLING_TIERS[tier].includesDetail}`,
			custom_data: {
				smartcode_key: key,
				courseId: program.courseId,
				tier,
			},
		},
	})
	const created = payload.data
	log(`  product CREATED ${name}  ${created.id}`)
	existingProducts.push(created)
	return created
}

/** What the price must look like for the site's copy to be true. */
function expectedPriceBody(program, tier, interval, productId) {
	const display = displayPriceFor(tier, interval)
	return {
		product_id: productId,
		name: interval === 'year' ? 'Annual' : 'Monthly',
		description: `${program.label} ${BILLING_TIERS[tier].label} - billed ${
			interval === 'year' ? 'yearly' : 'monthly'
		}`,
		billing_cycle: { interval, frequency: 1 },
		// The site advertises "$0 today". Without this the customer is charged
		// at checkout and the claim on /pricing becomes false advertising.
		trial_period: { interval: 'day', frequency: LEGAL.trialDays },
		unit_price: { amount: minorUnits(display), currency_code: CURRENCY },
		quantity: { minimum: 1, maximum: 1 },
		tax_mode: 'account_setting',
		custom_data: {
			smartcode_key: priceKey(program.courseId, tier, interval),
			courseId: program.courseId,
			tier,
			interval,
		},
	}
}

/** Fields that must match; anything else on the Paddle price is left alone. */
function priceDrift(price, expected) {
	const drift = []
	if (price.unit_price?.amount !== expected.unit_price.amount) {
		drift.push(`amount ${price.unit_price?.amount} != ${expected.unit_price.amount}`)
	}
	if (price.unit_price?.currency_code !== expected.unit_price.currency_code) {
		drift.push(
			`currency ${price.unit_price?.currency_code} != ${expected.unit_price.currency_code}`
		)
	}
	if (
		price.billing_cycle?.interval !== expected.billing_cycle.interval ||
		price.billing_cycle?.frequency !== expected.billing_cycle.frequency
	) {
		drift.push('billing cycle')
	}
	const trial = price.trial_period
	if (
		trial?.interval !== expected.trial_period.interval ||
		trial?.frequency !== expected.trial_period.frequency
	) {
		drift.push(
			`trial ${trial ? `${trial.frequency} ${trial.interval}` : 'none'} != ${
				expected.trial_period.frequency
			} day`
		)
	}
	if (price.status && price.status !== 'active') drift.push(`status ${price.status}`)
	return drift
}

async function ensurePrice(existingPrices, program, tier, interval, product) {
	const key = priceKey(program.courseId, tier, interval)
	const expected = expectedPriceBody(program, tier, interval, product.id)
	const found = existingPrices.find((p) => p.custom_data?.smartcode_key === key)
	const label = `${program.label} ${BILLING_TIERS[tier].label} ${interval}ly`.padEnd(38)

	if (found) {
		const drift = priceDrift(found, expected)
		if (!drift.length) {
			log(`  price ok        ${label}${found.id}`)
			return found
		}
		if (!FIX) {
			log(
				`  price DRIFT     ${label}${found.id}  (${drift.join(', ')}) - re-run with --fix`
			)
			return found
		}
		if (DRY_RUN) {
			log(`  price FIX       ${label}${found.id}  (${drift.join(', ')}) (dry run)`)
			return found
		}
		const patched = await paddleRequest(`/prices/${found.id}`, {
			method: 'PATCH',
			body: {
				status: 'active',
				billing_cycle: expected.billing_cycle,
				trial_period: expected.trial_period,
				unit_price: expected.unit_price,
				custom_data: expected.custom_data,
			},
		})
		log(`  price FIXED     ${label}${found.id}  (${drift.join(', ')})`)
		return patched.data
	}

	if (DRY_RUN) {
		log(`  price CREATE    ${label}(dry run)`)
		return { id: `pri_dryrun_${key}` }
	}

	const payload = await paddleRequest('/prices', { method: 'POST', body: expected })
	log(`  price CREATED   ${label}${payload.data.id}`)
	existingPrices.push(payload.data)
	return payload.data
}

async function main() {
	const env = paddleEnvName()
	log('Paddle catalogue provisioning')
	log(`  environment : ${env} (${apiBase()})`)
	log(`  currency    : ${CURRENCY}`)
	log(`  trial       : ${LEGAL.trialDays} days`)
	log(`  tax category: ${TAX_CATEGORY}`)
	if (DRY_RUN) log('  mode        : DRY RUN - nothing will be written')
	log('')

	const products = await paddleList('/products?status=active')
	const prices = await paddleList('/prices?status=active')
	log(
		`Found ${products.length} products and ${prices.length} prices already in this account.\n`
	)

	const resolved = new Map()

	for (const program of BILLING_PROGRAMS) {
		log(program.label)
		for (const tier of ['standard', 'premium']) {
			const product = await ensureProduct(products, program, tier)
			for (const interval of ['month', 'year']) {
				const price = await ensurePrice(prices, program, tier, interval, product)
				resolved.set(priceKey(program.courseId, tier, interval), price.id)
			}
		}
		log('')
	}

	const lines = allPriceSlots().map((slot) => {
		const id = resolved.get(priceKey(slot.courseId, slot.tier, slot.interval))
		return `${slot.env}=${id || ''}`
	})

	log('-'.repeat(72))
	log(`Price IDs for your ${env} environment - put these in .env.local and in Vercel:\n`)
	log(lines.join('\n'))
	log('')
	log('Vercel (one command per line, then redeploy):')
	for (const line of lines) {
		const [name] = line.split('=')
		log(`  vercel env add ${name} production`)
	}
	log('')
	log('Then verify end to end with:  node scripts/paddle-doctor.mjs')
	if (DRY_RUN) log('\n(dry run - no products or prices were created)')
}

main().catch((error) => {
	console.error(`\n${error.message}`)
	process.exit(1)
})
