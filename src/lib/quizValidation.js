import { getRobloxLessonContent } from '@/lib/robloxLessonContent'
import { lessonContentMap as lessonContentMapUk } from '@/lib/lessonContentMap.uk'
import { lessonContentMap as lessonContentMapEn } from '@/lib/lessonContentMap.en'
import { ROBLOX_COURSE_ID } from '@/lib/courseLessonAccess'

function getLessonForQuiz(courseId, lessonId, locale = 'uk') {
  if (courseId === ROBLOX_COURSE_ID) {
    return getRobloxLessonContent(lessonId, locale)
  }
  const map = locale === 'en' ? lessonContentMapEn : lessonContentMapUk
  return map[lessonId] || null
}

/** Server-side quiz scoring — never trust client quizScore. */
export function scoreLessonQuiz({ courseId, lessonId, quizAnswers, locale = 'uk' }) {
  const lesson = getLessonForQuiz(courseId, lessonId, locale)
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
