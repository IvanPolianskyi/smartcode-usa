import dynamic from 'next/dynamic'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { syncStudentScheduleAccess } from '@/lib/syncStudentScheduleAccess'
import {
  getUnlockedLessonSet,
  hasStudentCourseAccess,
  isLessonUnlockedInCourse,
} from '@/lib/courseLessonAccess'
import { getLocalizedMetadata, buildAlternates } from '@/lib/i18nMetadata'
import LessonPageLoading from '@/components/Lesson/LessonPageLoading'

const LessonPage = dynamic(() => import('@/components/Lesson/LessonPage'), {
	loading: () => <LessonPageLoading />,
	ssr: true,
})

const RobloxLessonPage = dynamic(() => import('@/components/Lesson/RobloxLessonPage'), {
	loading: () => <LessonPageLoading />,
	ssr: true,
})

export async function generateMetadata({ params }) {
	const { locale, courseId, lessonId } = await params
	const meta = await getLocalizedMetadata(locale, 'lesson')
	const path = `/courses/${courseId}/lessons/${lessonId}`

	return {
		...meta,
		alternates: buildAlternates(locale, path),
		robots: 'noindex, nofollow',
	}
}

export default async function LessonPageRoute({ params }) {
  const { lessonId, courseId, locale } = await params

  // Fetch user progress and purchase status if user is authenticated
  let userProgress = null
  let isPurchased = false
  let userRole = 'user'
  let studentProfile = null
  
  try {
    const userId = await getCurrentUser()
    if (userId) {
      const usersCollection = await getCollection('users')
      let user = await usersCollection.findOne({ _id: new ObjectId(userId) })
      user = await syncStudentScheduleAccess(user, usersCollection)
      
      if (user) {
        userRole = user.role || 'user'
        isPurchased = user.role === 'admin' || (user.purchasedCourses || []).includes(courseId)
        studentProfile = user.studentProfile || null
      }

      const hasAccess = user ? hasStudentCourseAccess(user, courseId) : false
      const progressCollection = await getCollection('userProgress')
      const progress = hasAccess
        ? await progressCollection.findOne({
            userId: new ObjectId(userId),
            courseId,
          })
        : null
      
      if (progress) {
        userProgress = {
          userId: progress.userId.toString(),
          courseId: progress.courseId,
          enrolledAt: progress.enrolledAt,
          completedLessons: progress.completedLessons || [],
          completedQuizzes: progress.completedQuizzes || {},
          completedPracticeTasks: progress.completedPracticeTasks || [],
          currentModule: progress.currentModule || 0,
          currentLesson: progress.currentLesson || 0,
          overallProgress: progress.overallProgress || 0,
          certificates: progress.certificates || []
        }
      }
    }
  } catch (error) {
    console.error('Error fetching user progress:', error)
    // Continue without progress if there's an error
  }
  
  const isEnrolled = Boolean(userProgress)
  const unlockedSet = getUnlockedLessonSet({
    courseId,
    profile: studentProfile,
    progress: userProgress,
    isAdmin: userRole === 'admin',
    isPurchased,
    isEnrolled,
  })

  const isFreePreviewLesson =
    courseId === 'roblox-studio' && lessonId === 'lesson-roblox-1-1'

  const isAccessible =
    isFreePreviewLesson ||
    userRole === 'admin' ||
    isPurchased ||
    isLessonUnlockedInCourse(lessonId, {
      courseId,
      profile: studentProfile,
      progress: userProgress,
      isAdmin: userRole === 'admin',
      isPurchased,
      isEnrolled,
    })

  const sharedProps = {
    lessonId,
    courseId,
    userProgress,
    isPurchased,
    userRole,
    isAccessible,
    allowedLessons: [...unlockedSet],
  }

  if (courseId === 'roblox-studio') {
    return <RobloxLessonPage {...sharedProps} />
  }

  return <LessonPage {...sharedProps} />
}
