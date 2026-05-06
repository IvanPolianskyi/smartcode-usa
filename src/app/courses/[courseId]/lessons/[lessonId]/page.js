import dynamic from 'next/dynamic'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'
import { syncStudentScheduleAccess } from '@/lib/syncStudentScheduleAccess'

const LessonPage = dynamic(() => import('@/components/Lesson/LessonPage'), {
	loading: () => (
		<div
			style={{
				padding: '3rem 1.5rem',
				textAlign: 'center',
				maxWidth: 480,
				margin: '0 auto',
			}}
		>
			<p style={{ color: 'var(--muted-foreground, #64748b)' }}>Завантаження уроку…</p>
		</div>
	),
	ssr: true,
})

export const metadata = {
  title: 'Урок курсу - SmartCode Academy',
  description: 'Закритий урок курсу SmartCode Academy з практичними завданнями та матеріалами.',
  robots: 'noindex, nofollow',
}

export default async function LessonPageRoute({ params }) {
  // Await params in Next.js 15
  const { lessonId, courseId } = await params
  
  // Get curriculum to check lesson position
  const getCurriculum = () => {
    if (courseId === "web-development") {
      return webDevCurriculum
    }
    return pythonCurriculum
  }
  
  const curriculum = getCurriculum()
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
  
  return (
    <LessonPage 
      lessonId={lessonId} 
      courseId={courseId}
      userProgress={userProgress}
      isPurchased={isPurchased}
      userRole={userRole}
      isAccessible={isAccessible}
      allowedLessons={[...explicitUnlockedSet, ...(nextLessonId ? [nextLessonId] : [])]}
    />
  )
}

