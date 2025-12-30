import LessonPage from '@/components/Lesson/LessonPage'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export const metadata = {
  title: 'Lesson - SmartCode Academy',
  description: 'Learn Python programming with interactive lessons, code examples, and quizzes.',
}

export default async function LessonPageRoute({ params }) {
  // Await params in Next.js 15
  const { lessonId, courseId } = await params
  
  // Fetch user progress if user is authenticated
  let userProgress = null
  try {
    const userId = await getCurrentUser()
    if (userId) {
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
  
  return (
    <LessonPage 
      lessonId={lessonId} 
      courseId={courseId}
      userProgress={userProgress}
    />
  )
}

