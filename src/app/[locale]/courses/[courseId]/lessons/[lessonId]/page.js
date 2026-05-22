import dynamic from 'next/dynamic'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { getCurriculum } from '@/lib/getCurriculum'
import { syncStudentScheduleAccess } from '@/lib/syncStudentScheduleAccess'
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

  const curriculum = getCurriculum(courseId, locale)
  const allLessons = curriculum.modules.flatMap(m => m.lessons)
  const currentLesson = allLessons.find(l => l.lessonId === lessonId)
  const lessonModuleIndex = curriculum.modules.findIndex(m => 
    m.lessons.some(l => l.lessonId === lessonId)
  )
  const isFirstLesson = lessonModuleIndex === 0 && currentLesson?.order === 1
  
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
      
      const progressCollection = await getCollection('userProgress')
      const progress = await progressCollection.findOne({
        userId: new ObjectId(userId),
        courseId
      })
      
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
  
  const explicitCourseAccess = studentProfile?.courseAccess?.[courseId]
  const explicitUnlockedLessons = explicitCourseAccess?.unlockedLessons || []
  const explicitEnabled = explicitCourseAccess?.enabled
  const hasOnlineCourseAccess = (studentProfile?.activeOnlineCourses || []).includes(courseId)
  const explicitUnlockedSet = new Set(explicitUnlockedLessons)

  const unlockedIndices = allLessons
    .map((lesson, index) => (explicitUnlockedSet.has(lesson.lessonId) ? index : -1))
    .filter(index => index >= 0)
  const highestUnlockedIndex = unlockedIndices.length > 0 ? Math.max(...unlockedIndices) : -1
  const nextLessonId = highestUnlockedIndex >= 0 && highestUnlockedIndex + 1 < allLessons.length
    ? allLessons[highestUnlockedIndex + 1].lessonId
    : null

  const isExplicitlyAccessible = (hasOnlineCourseAccess || explicitEnabled) && (
    explicitUnlockedSet.has(lessonId) || nextLessonId === lessonId
  )

  // Check if lesson is accessible
  const isAccessible = userRole === 'admin' ||
    isPurchased ||
    isExplicitlyAccessible ||
    ((hasOnlineCourseAccess || explicitEnabled !== false) && isFirstLesson)
  
  const sharedProps = {
    lessonId,
    courseId,
    userProgress,
    isPurchased,
    userRole,
    isAccessible,
    allowedLessons: [...explicitUnlockedSet, ...(nextLessonId ? [nextLessonId] : [])],
  }

  if (courseId === 'roblox-studio') {
    return <RobloxLessonPage {...sharedProps} />
  }

  return <LessonPage {...sharedProps} />
}
