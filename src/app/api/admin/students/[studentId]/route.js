import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { requireAdmin } from '@/lib/requireAdmin'
import { getCollection } from '@/lib/mongodb'
import { getEntitlement, getSubscriptions, resolvePlanTier } from '@/lib/entitlements'
import { labelForCourseIds } from '@/lib/billingCatalog'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** One student's account + every subscription row (Paddle-sourced and manual grants). */
export async function GET(_request, { params }) {
	const auth = await requireAdmin()
	if (auth.error) return auth.error

	const { studentId } = await params
	let objectId
	try {
		objectId = new ObjectId(studentId)
	} catch {
		return NextResponse.json({ error: 'Invalid student id' }, { status: 400 })
	}

	try {
		const users = await getCollection('users')
		const user = await users.findOne(
			{ _id: objectId },
			{ projection: { password: 0 } }
		)
		if (!user) {
			return NextResponse.json({ error: 'Student not found' }, { status: 404 })
		}

		const [entitlement, subscriptions] = await Promise.all([
			getEntitlement(objectId),
			getSubscriptions(objectId),
		])

		return NextResponse.json({
			student: {
				id: String(user._id),
				name: user.name || '',
				email: user.email || '',
				role: user.role || 'student',
				createdAt: user.createdAt || null,
			},
			entitlement: {
				active: entitlement.active,
				courseIds: entitlement.courseIds,
				trialing: entitlement.trialing,
				inGrace: entitlement.inGrace,
			},
			subscriptions: subscriptions.map((row) => ({
				id: String(row._id),
				paddleSubscriptionId: row.paddleSubscriptionId,
				paddleCustomerId: row.paddleCustomerId,
				courseIds: row.courseIds || [],
				label: labelForCourseIds(row.courseIds || []),
				planTier: resolvePlanTier(row),
				status: row.status,
				billingInterval: row.billingInterval || null,
				currentPeriodEnd: row.currentPeriodEnd || null,
				trialEndsAt: row.trialEndsAt || null,
				cancelAtPeriodEnd: Boolean(row.cancelAtPeriodEnd),
				lastEventType: row.lastEventType || null,
				isManual:
					row.paddleCustomerId === 'admin_manual' ||
					row.paddleCustomerId === 'local_dev_customer',
				createdAt: row.createdAt || null,
				updatedAt: row.updatedAt || null,
			})),
		})
	} catch (error) {
		console.error('[admin] student detail error:', error)
		return NextResponse.json({ error: 'Could not load student' }, { status: 500 })
	}
}
