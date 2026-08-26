import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getEntitlement } from '@/lib/entitlements'
import { getCollection } from '@/lib/mongodb'
import {
	getLiveLessonsCollection,
	partitionLiveLessons,
	serializeLiveLesson,
} from '@/lib/liveLessons'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Premium lesson calendar for the student dashboard.
 * Upcoming sessions (Join) + past sessions (YouTube when available).
 */
export async function GET() {
	const userId = await getCurrentUser()
	if (!userId) {
		return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
	}

	try {
		const users = await getCollection('users')
		const user = await users.findOne(
			{ _id: new ObjectId(userId) },
			{ projection: { role: 1 } }
		)
		const isAdmin = user?.role === 'admin'

		if (!isAdmin) {
			const entitlement = await getEntitlement(userId)
			const isPremium = (entitlement.subscriptions || []).some(
				(sub) => sub.active && sub.planTier === 'premium'
			)
			if (!isPremium) {
				return NextResponse.json({ error: 'premium required' }, { status: 403 })
			}
		}

		const col = await getLiveLessonsCollection()
		const rows = await col.find({}).sort({ startsAt: -1 }).limit(100).toArray()
		const lessons = rows.map(serializeLiveLesson)
		const { upcoming, past } = partitionLiveLessons(lessons)

		return NextResponse.json({ upcoming, past })
	} catch (error) {
		console.error('[live-lessons] list error:', error)
		return NextResponse.json({ error: 'could not load live lessons' }, { status: 500 })
	}
}
