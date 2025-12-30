import LessonPage from '@/components/Lesson/LessonPage'

export const metadata = {
  title: 'Lesson - SmartCode Academy',
  description: 'Learn Python programming with interactive lessons, code examples, and quizzes.',
}

export default async function LessonPageRoute({ params }) {
  // In a real app, you would fetch user progress from the database
  // For now, we'll pass null to show the public view
  const userProgress = null
  
  // Await params in Next.js 15
  const { lessonId, courseId } = await params
  
  return (
    <LessonPage 
      lessonId={lessonId} 
      courseId={courseId}
      userProgress={userProgress}
    />
  )
}

