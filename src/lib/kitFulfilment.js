import { ObjectId } from 'mongodb'
import { getCollection, ensureUserIndexes } from '@/lib/mongodb'
import { getCustomerFromPaddle, isSandbox } from '@/lib/paddle'
import { createLoginToken } from '@/lib/loginTokens'
import { sendKitAccessEmail } from '@/lib/email'
import { recordFunnelEvent } from '@/lib/analyticsStore'
import { recordKitEvent } from '@/lib/kitEvents'
import { normalizeSiteUrl } from '@/lib/legalConfig'
import { KITS, kitIdsFromTransaction, nameFromEmail } from '@/lib/kits'

const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
const LINK_TTL_MS = 7 * 24 * 60 * 60 * 1000

function toObjectId(value) {
	try {
		return value ? new ObjectId(String(value)) : null
	} catch {
		return null
	}
}

/** Email a fresh one-time login link to /kit/access. */
export async function emailKitAccessLink(user, kitId) {
	const kit = KITS[kitId] || Object.values(KITS)[0]
	const { loginPath } = await createLoginToken(user._id, {
		ttlMs: LINK_TTL_MS,
		purpose: 'kit_access',
		redirectPath: '/kit/access',
	})
	return sendKitAccessEmail({
		to: user.email,
		name: String(user.name || '').split(' ')[0],
		kitTitle: kit.title,
		loginUrl: `${SITE_URL}${loginPath}`,
	})
}

/** Minor units (cents) as a string -> major units number, or null. */
export function majorAmount(minor) {
	const n = Number(minor)
	return Number.isFinite(n) ? Math.round(n) / 100 : null
}

/**
 * Purchase row for the kit landing analytics. Joined to the visit through the
 * `kid` the page put in Paddle custom data. Exactly once per transaction.
 */
async function recordKitPurchase(transaction, { kitIds, occurredAt }) {
	const custom = transaction?.custom_data || {}
	const totals = transaction?.details?.totals || {}
	const payment = Array.isArray(transaction?.payments) ? transaction.payments[0] : null
	await recordKitEvent({
		name: 'purchase',
		kid: custom.kid || null,
		sid: custom.ksid || null,
		props: {
			kit: kitIds[0],
			amount: majorAmount(totals.grand_total ?? totals.total),
			net: majorAmount(totals.earnings),
			currency: transaction?.currency_code || null,
			method: payment?.method_details?.type || null,
			cta: custom.cta || null,
		},
		context: { src: custom.src || null, test: isSandbox() },
		dedupeKey: `kit:purchase:${transaction?.id}`,
		occurredAt,
	}).catch(() => {})
}

/**
 * Handle a `transaction.completed` webhook. Does nothing unless a kit price
 * was paid for. Finds the buyer by custom_data.userId, else by the Paddle
 * customer's email, else creates a passwordless account for that email.
 *
 * @returns {Promise<{ handled: boolean, kits?: string[], userId?: string, created?: boolean }>}
 */
export async function fulfilKitTransaction(transaction, { occurredAt = new Date() } = {}) {
	const kitIds = kitIdsFromTransaction(transaction)
	if (!kitIds.length) return { handled: false }

	const transactionId = String(transaction?.id || '')
	const users = await getCollection('users')
	await ensureUserIndexes().catch(() => {})

	let user = null
	const fromCustomData = toObjectId(transaction?.custom_data?.userId)
	if (fromCustomData) user = await users.findOne({ _id: fromCustomData })

	let email = ''
	if (!user) {
		const customer = transaction?.customer_id ? await getCustomerFromPaddle(transaction.customer_id) : null
		email = String(customer?.email || '').trim().toLowerCase()
		if (!email) throw new Error(`kit transaction ${transactionId} has no customer email`)
		user = await users.findOne({ email })
	}

	let created = false
	if (!user) {
		const now = new Date()
		const doc = {
			email,
			password: null,
			name: nameFromEmail(email),
			phone: null,
			role: 'student',
			studentProfile: {
				regularSchedule: [],
				zoomLink: '',
				activeOnlineCourses: [],
				courseAccess: {},
				accountReady: true,
			},
			purchasedCourses: [],
			enrolledCourses: [],
			kits: [],
			createdVia: 'kit_checkout',
			legalAcceptedAt: now,
			legalAcceptedVia: 'paddle_checkout',
			createdAt: now,
			updatedAt: now,
		}
		try {
			const result = await users.insertOne(doc)
			user = { ...doc, _id: result.insertedId }
			created = true
		} catch (error) {
			if (error?.code !== 11000) throw error
			user = await users.findOne({ email })
		}
	}

	await users.updateOne(
		{ _id: user._id },
		{ $addToSet: { kits: { $each: kitIds } }, $set: { updatedAt: new Date() } }
	)

	const purchases = await getCollection('kitPurchases')
	await purchases.createIndex({ transactionId: 1 }, { unique: true }).catch(() => {})
	let firstTime = true
	try {
		await purchases.insertOne({
			transactionId,
			userId: user._id,
			kits: kitIds,
			customerId: transaction?.customer_id || null,
			source: transaction?.custom_data?.src || null,
			total: transaction?.details?.totals?.grand_total || null,
			currency: transaction?.currency_code || null,
			createdAt: occurredAt,
		})
	} catch (error) {
		if (error?.code !== 11000) throw error
		firstTime = false
	}

	if (firstTime) {
		const sent = await emailKitAccessLink(user, kitIds[0])
		if (!sent.ok) console.error('[kit] access email failed:', sent.error)
		await recordFunnelEvent({
			step: 'purchase',
			userId: String(user._id),
			path: '/api/billing/webhook',
			params: { kits: kitIds, transaction_id: transactionId, source: transaction?.custom_data?.src || null },
			dedupeKey: `purchase:kit:${transactionId}`,
			occurredAt,
		}).catch(() => {})
		await recordKitPurchase(transaction, { kitIds, occurredAt })
	}

	return { handled: true, kits: kitIds, userId: String(user._id), created }
}
