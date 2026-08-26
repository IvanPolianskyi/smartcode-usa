import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { requireAdmin } from '@/lib/requireAdmin'
import { getCollection } from '@/lib/mongodb'
import { isKnownCourseId } from '@/lib/courseLessonAccess'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Manually grant course access outside Paddle - comps, support cases, refund
 * disputes resolved in the student's favor. Marked `admin_manual` so it's
 * never mistaken for a real subscription and never touched by the webhook
 * (which only ever matches on `paddleSubscriptionId`).
 */
export async function POST(request, { params }) {
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
		const body = await request.json().catch(() => ({}))
		const courseId = String(body.courseId || '').trim()
		const tier = body.tier === 'premium' ? 'premium' : 'standard'
		const days = Number(body.days)
		const note = String(body.note || '').trim().slice(0, 500)

		if (!isKnownCourseId(courseId)) {
			return NextResponse.json({ error: 'Unknown course' }, { status: 400 })
		}

		const users = await getCollection('users')
		const user = await users.findOne({ _id: objectId }, { projection: { _id: 1 } })
		if (!user) {
			return NextResponse.json({ error: 'Student not found' }, { status: 404 })
		}

		const now = new Date()
		const currentPeriodEnd =
			Number.isFinite(days) && days > 0
				? new Date(now.getTime() + days * 24 * 60 * 60 * 1000)
				: null
		const paddleSubscriptionId = `admin_manual_${objectId}_${courseId}`

		const subscriptions = await getCollection('subscriptions')
		await subscriptions.updateOne(
			{ paddleSubscriptionId },
			{
				$set: {
					userId: objectId,
					paddleCustomerId: 'admin_manual',
					priceId: null,
					productId: null,
					courseIds: [courseId],
					planTier: tier,
					// 'active' grants access regardless of currentPeriodEnd - see entitlements.js.
					status: 'active',
					billingInterval: null,
					trialEndsAt: null,
					currentPeriodEnd,
					cancelAtPeriodEnd: false,
					scheduledChangeAt: null,
					lastEventType: 'admin.manual_grant',
					grantedBy: auth.userId,
					note: note || undefined,
					updatedAt: now,
				},
				$setOnInsert: { createdAt: now },
			},
			{ upsert: true }
		)

		return NextResponse.json({ ok: true, courseId })
	} catch (error) {
		console.error('[admin] manual grant error:', error)
		return NextResponse.json({ error: 'Could not grant access' }, { status: 500 })
	}
}
