import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { requireAdmin } from '@/lib/requireAdmin'
import { getCollection } from '@/lib/mongodb'
import { cancelSubscription } from '@/lib/paddle'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MANUAL_CUSTOMER_IDS = new Set(['admin_manual', 'local_dev_customer'])

/**
 * Revoke one subscription row. A manual grant is just a local document, so we
 * cancel it directly. A real Paddle subscription must be canceled through
 * Paddle — writing `status: canceled` here without telling Paddle would leave
 * the customer paying for access we just took away.
 */
export async function POST(request, { params }) {
	const auth = await requireAdmin()
	if (auth.error) return auth.error

	const { studentId } = await params
	let studentObjectId
	try {
		studentObjectId = new ObjectId(studentId)
	} catch {
		return NextResponse.json({ error: 'Invalid student id' }, { status: 400 })
	}

	try {
		const body = await request.json().catch(() => ({}))
		const rowId = String(body.subscriptionRowId || '').trim()
		const immediately = Boolean(body.immediately)
		let rowObjectId
		try {
			rowObjectId = new ObjectId(rowId)
		} catch {
			return NextResponse.json({ error: 'Invalid subscription id' }, { status: 400 })
		}

		const subscriptions = await getCollection('subscriptions')
		const row = await subscriptions.findOne({ _id: rowObjectId, userId: studentObjectId })
		if (!row) {
			return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
		}

		if (MANUAL_CUSTOMER_IDS.has(row.paddleCustomerId)) {
			await subscriptions.updateOne(
				{ _id: rowObjectId },
				{ $set: { status: 'canceled', lastEventType: 'admin.manual_revoke', updatedAt: new Date() } }
			)
			return NextResponse.json({ ok: true, mode: 'manual' })
		}

		await cancelSubscription(row.paddleSubscriptionId, { immediately })
		// Paddle's webhook is the source of truth and will land shortly; reflect
		// the intent locally now so the admin UI doesn't look unchanged.
		await subscriptions.updateOne(
			{ _id: rowObjectId },
			{
				$set: immediately
					? { status: 'canceled', lastEventType: 'admin.paddle_cancel', updatedAt: new Date() }
					: { cancelAtPeriodEnd: true, lastEventType: 'admin.paddle_cancel_scheduled', updatedAt: new Date() },
			}
		)

		return NextResponse.json({ ok: true, mode: 'paddle' })
	} catch (error) {
		console.error('[admin] revoke error:', error)
		return NextResponse.json({ error: 'Could not revoke access' }, { status: 500 })
	}
}
