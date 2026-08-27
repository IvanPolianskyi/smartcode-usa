import dynamic from 'next/dynamic'
import { loadUserWithAccess } from '@/lib/loadUser'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import {
  canReadCourseProgress,
  getUnlockedLessonSet,
  hasStudentCourseAccess,
  isSubscribedToCourse,
  resolveDripStartedAt,
} from '@/lib/courseLessonAccess'
import { getLocalizedMetadata, buildAlternates } from '@/lib/i18nMetadata'
import { serializeGamification } from '@/lib/lessonInteractiveXp'
import { getLessonContent } from '@/lib/lessonContentLoader'
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
  let courseUser = null
  
  try {
    const userId = await getCurrentUser()
    if (userId) {
      const user = await loadUserWithAccess(userId)
      
      if (user) {
        courseUser = user
        userRole = user.role || 'user'
        isPurchased = (user.purchasedCourses || []).includes(courseId)
        studentProfile = user.studentProfile || null
      }

      const canLoadProgress = user ? canReadCourseProgress(user, courseId) : false
      const progressCollection = await getCollection('userProgress')
      const progress = canLoadProgress
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
          certificates: progress.certificates || [],
          gamification: serializeGamification(progress.gamification),
        }
      }
    }
  } catch (error) {
    console.error('Error fetching user progress:', error)
    // Continue without progress if there's an error
  }
  
  const isEnrolled = Boolean(userProgress)
  const isSubscribed = isSubscribedToCourse(courseUser, courseId)
  const hasCourseAccess = hasStudentCourseAccess(courseUser, courseId)
  const dripStartedAt = resolveDripStartedAt(courseUser, courseId, userProgress)
  const unlockedSet = getUnlockedLessonSet({
    courseId,
    profile: studentProfile,
    progress: userProgress,
    isAdmin: userRole === 'admin',
    isTeacher: userRole === 'teacher',
    isPurchased,
    // Any course entitlement (sub, enroll, purchase) starts the weekly drip.
    isSubscribed: isSubscribed || hasCourseAccess,
    isEnrolled,
    dripStartedAt,
  })

  // Source of truth: unlocked set already includes free preview + drip access.
  const isAccessible = unlockedSet.has(lessonId)
  const lesson = getLessonContent(courseId, lessonId, locale)

  const sharedProps = {
    lessonId,
    courseId,
    lesson,
    userProgress,
    // Entitlement for CTAs - must NOT bypass drip locks in lesson UIs.
    isPurchased: isPurchased || isSubscribed || hasCourseAccess,
    userRole,
    isAccessible,
    allowedLessons: [...unlockedSet],
    // Time drip is authoritative; do not expand unlocks by completing prior lessons.
    sequentialUnlock: false,
  }

  if (courseId === 'roblox-studio' || courseId === 'ai-at-work') {
    return <RobloxLessonPage {...sharedProps} />
  }

  return <LessonPage {...sharedProps} />
}
