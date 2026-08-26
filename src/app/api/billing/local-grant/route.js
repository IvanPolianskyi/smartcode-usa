import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { isKnownCourseId } from '@/lib/courseLessonAccess'
import { priceIdFor } from '@/lib/billingCatalog'

/**
 * Dev-only: grant an active subscription when Paddle price IDs are not configured.
 * Never runs if a real price ID exists for the requested plan (production path).
 */
export async function POST(request) {
	if (process.env.NODE_ENV === 'production') {
		return NextResponse.json({ error: 'Not available' }, { status: 404 })
	}

	try {
		const userId = await getCurrentUser()
		if (!userId) {
			return NextResponse.json({ error: 'Sign in first' }, { status: 401 })
		}

		const body = await request.json().catch(() => ({}))
		const courseId = String(body.courseId || '').trim()
		const interval = body.plan === 'annual' || body.plan === 'year' ? 'year' : 'month'
		const tier = body.tier === 'premium' ? 'premium' : 'standard'

		if (!isKnownCourseId(courseId)) {
			return NextResponse.json({ error: 'Unknown course' }, { status: 400 })
		}

		if (priceIdFor(courseId, interval, tier)) {
			return NextResponse.json(
				{ error: 'Use Paddle checkout - price IDs are configured' },
				{ status: 400 }
			)
		}

		const objectId = new ObjectId(userId)
		const now = new Date()
		const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
		const paddleSubscriptionId = `local_dev_${userId}_${courseId}_${tier}`

		const subscriptions = await getCollection('subscriptions')
		await subscriptions.updateOne(
			{ paddleSubscriptionId },
			{
				$set: {
					userId: objectId,
					paddleCustomerId: 'local_dev_customer',
					priceId: `pri_local_${courseId}_${tier}_${interval}`,
					productId: `pro_local_${courseId}`,
					courseIds: [courseId],
					planTier: tier,
					status: 'active',
					billingInterval: interval,
					trialEndsAt: null,
					currentPeriodEnd: periodEnd,
					cancelAtPeriodEnd: false,
					scheduledChangeAt: null,
					lastEventType: 'local.dev_grant',
					updatedAt: now,
				},
				$setOnInsert: { createdAt: now },
			},
			{ upsert: true }
		)

		const users = await getCollection('users')
		await users.updateOne(
			{ _id: objectId },
			{
				$set: {
					'studentProfile.accountReady': true,
					updatedAt: now,
				},
				$addToSet: {
					purchasedCourses: courseId,
					enrolledCourses: courseId,
					'studentProfile.activeOnlineCourses': courseId,
				},
			}
		)

		const progress = await getCollection('userProgress')
		const existing = await progress.findOne({ userId: objectId, courseId })
		if (!existing) {
			await progress.insertOne({
				userId: objectId,
				courseId,
				enrolledAt: now,
				completedLessons: [],
				completedQuizzes: {},
				completedPracticeTasks: [],
				currentModule: 0,
				currentLesson: 0,
				overallProgress: 0,
				certificates: [],
			})
		}

		return NextResponse.json({ ok: true, courseId })
	} catch (error) {
		console.error('[local-grant]', error)
		return NextResponse.json({ error: 'Could not grant access' }, { status: 500 })
	}
}
