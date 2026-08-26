import { notFound } from 'next/navigation'
import CoursePage from '@/components/Course/CoursePage'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { getLocalizedMetadata, buildAlternates } from '@/lib/i18nMetadata'
import { isKnownCourseId } from '@/lib/courseLessonAccess'

export async function generateMetadata({ params }) {
	const { locale, courseId } = await params
	const pageKey =
		courseId === 'roblox-studio'
			? 'roblox'
			: courseId === 'ai-at-work'
				? 'ai'
				: courseId === 'python-developer-zero-to-junior'
					? 'python'
					: 'python'
	const meta = await getLocalizedMetadata(locale, pageKey)
	const path = `/courses/${courseId}`

	return {
		...meta,
		alternates: buildAlternates(locale, path),
	}
}

export default async function CoursePageRoute({ params }) {
	const { courseId } = await params

	if (!isKnownCourseId(courseId)) {
		notFound()
	}

	let userProgress = null
	try {
		const userId = await getCurrentUser()
		if (userId) {
			const progressCollection = await getCollection('userProgress')
			const progress = await progressCollection.findOne({
				userId: new ObjectId(userId),
				courseId,
			})

			if (progress) {
				userProgress = {
					userId: progress.userId.toString(),
					courseId: progress.courseId,
					completedLessons: progress.completedLessons || [],
					overallProgress: progress.overallProgress || 0,
					quizResults: progress.quizResults || {},
					completedPracticeTasks: progress.completedPracticeTasks || [],
				}
			}
		}
	} catch (error) {
		console.error('Error fetching user progress:', error)
	}

	return <CoursePage courseId={courseId} userProgress={userProgress} />
}
