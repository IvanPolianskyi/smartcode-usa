import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/requireAdmin'
import { getCollection } from '@/lib/mongodb'
import { ALL_PROGRAM_COURSE_IDS } from '@/lib/courseIds'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Counts for the admin dashboard. Cheap aggregate reads, no per-row entitlement evaluation. */
export async function GET() {
	const auth = await requireAdmin()
	if (auth.error) return auth.error

	try {
		const [users, subscriptions] = await Promise.all([
			getCollection('users'),
			getCollection('subscriptions'),
		])

		const [totalUsers, statusCounts, manualGrants] = await Promise.all([
			users.countDocuments({}),
			subscriptions
				.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
				.toArray(),
			subscriptions.countDocuments({
				paddleCustomerId: { $in: ['admin_manual', 'local_dev_customer'] },
			}),
		])

		const byStatus = {}
		for (const row of statusCounts) {
			byStatus[row._id || 'unknown'] = row.count
		}

		return NextResponse.json({
			totalUsers,
			byStatus,
			manualGrants,
			courseIds: ALL_PROGRAM_COURSE_IDS,
		})
	} catch (error) {
		console.error('[admin] stats error:', error)
		return NextResponse.json({ error: 'Could not load statistics' }, { status: 500 })
	}
}
