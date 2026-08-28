import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { getStudentAccessibleCourseIds } from '@/lib/courseLessonAccess'
import { loadUserWithAccess } from '@/lib/loadUser'
import { buildStudyActivityFromProgress } from '@/lib/studyActivity'

export async function GET() {
	try {
		const userId = await getCurrentUser()
		if (!userId) {
			return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
		}

		const user = await loadUserWithAccess(userId)
		if (!user) {
			return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
		}

		const courseIds = getStudentAccessibleCourseIds(user)
		if (!courseIds.length) {
			return NextResponse.json(
				{
					days: buildStudyActivityFromProgress([]).days,
					summary: buildStudyActivityFromProgress([]).summary,
				},
				{ status: 200 }
			)
		}

		const progressCollection = await getCollection('userProgress')
		const docs = await progressCollection
			.find({
				userId: new ObjectId(userId),
				courseId: { $in: courseIds },
			})
			.project({
				courseId: 1,
				completedLessons: 1,
				lessonCompletedAt: 1,
				enrolledAt: 1,
				updatedAt: 1,
			})
			.toArray()

		const { days, summary } = buildStudyActivityFromProgress(docs)
		const labels = days.map((row) => {
			const d = new Date(`${row.date}T12:00:00.000Z`)
			return d.toLocaleDateString('en-US', { weekday: 'short' })
		})

		return NextResponse.json(
			{
				days: days.map((row, index) => ({
					...row,
					label: labels[index],
				})),
				summary,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('[study-activity] error:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
