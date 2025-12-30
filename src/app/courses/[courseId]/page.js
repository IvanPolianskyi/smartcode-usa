import CoursePage from '@/components/Course/CoursePage'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export const metadata = {
  title: 'Python Developer Course - SmartCode Academy',
  description: 'Повний курс програмування на Python від основ до рівня впевненого джуніора. 7 модулів, 48 уроків, реальні проекти.',
}

export default async function CoursePageRoute({ params }) {
  // Await params in Next.js 15
  const { courseId } = await params
  
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
  
  return <CoursePage courseId={courseId} userProgress={userProgress} />
}

