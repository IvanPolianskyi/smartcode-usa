import { getRobloxLessonContent } from '@/lib/robloxLessonContent'
import { lessonContentMap } from '@/lib/lessonContentMap.uk'
import { ROBLOX_COURSE_ID } from '@/lib/courseLessonAccess'

function getLessonForQuiz(courseId, lessonId) {
  if (courseId === ROBLOX_COURSE_ID) {
    return getRobloxLessonContent(lessonId)
  }
  return lessonContentMap[lessonId] || null
}

/** Server-side quiz scoring — never trust client quizScore. */
export function scoreLessonQuiz({ courseId, lessonId, quizAnswers }) {
  const lesson = getLessonForQuiz(courseId, lessonId)
  const questions = lesson?.quiz?.questions
  if (!questions?.length) return null

  let correct = 0
  for (const q of questions) {
    if (Number(quizAnswers?.[q.id]) === Number(q.correctAnswer)) correct += 1
  }

  const score = Math.round((correct / questions.length) * 100)
  const passingScore = lesson.quiz.passingScore ?? 70

  return {
    score,
    passingScore,
    passed: score >= passingScore,
  }
}

export function lessonRequiresPractice(courseId, lessonId, locale = 'uk') {
  const lesson = getLessonForQuiz(courseId, lessonId, locale)
  return Boolean(lesson?.practiceTask)
}

export function lessonRequiresQuiz(courseId, lessonId, locale = 'uk') {
  const lesson = getLessonForQuiz(courseId, lessonId, locale)
  return Boolean(lesson?.quiz?.questions?.length)
}
