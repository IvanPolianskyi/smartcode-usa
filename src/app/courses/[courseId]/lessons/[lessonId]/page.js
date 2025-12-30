import LessonPage from '@/components/Lesson/LessonPage'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'

export const metadata = {
  title: 'Lesson - SmartCode Academy',
  description: 'Learn Python programming with interactive lessons, code examples, and quizzes.',
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
  
  try {
    const userId = await getCurrentUser()
    if (userId) {
      const usersCollection = await getCollection('users')
      const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
      
      if (user) {
        userRole = user.role || 'user'
        isPurchased = user.role === 'admin' || (user.purchasedCourses || []).includes(courseId)
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
  
  // Check if lesson is accessible
  const isAccessible = userRole === 'admin' || isPurchased || isFirstLesson
  
  return (
    <LessonPage 
      lessonId={lessonId} 
      courseId={courseId}
      userProgress={userProgress}
      isPurchased={isPurchased}
      userRole={userRole}
      isAccessible={isAccessible}
    />
  )
}

