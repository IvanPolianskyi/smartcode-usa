import CoursePage from '@/components/Course/CoursePage'

export const metadata = {
  title: 'Python Developer Course - SmartCode Academy',
  description: 'Повний курс програмування на Python від основ до рівня впевненого джуніора. 7 модулів, 48 уроків, реальні проекти.',
}

export default async function CoursePageRoute({ params }) {
  // In a real app, you would fetch user progress from the database
  // For now, we'll pass null to show the public view
  const userProgress = null
  
  // Await params in Next.js 15
  const { courseId } = await params
  
  return <CoursePage courseId={courseId} userProgress={userProgress} />
}

