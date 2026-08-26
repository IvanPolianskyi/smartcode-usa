import { getRobloxLessonContent } from '@/lib/robloxLessonContent'
import { getAiAtWorkLessonContent } from '@/lib/aiAtWorkLessonContent'
import { lessonContentMap as lessonContentMapEn } from '@/lib/lessonContentMap.en'
import { lessonContentMap as lessonContentMapUk } from '@/lib/lessonContentMap.uk'
import {
  AI_AT_WORK_COURSE_ID,
  ROBLOX_COURSE_ID,
} from '@/lib/courseLessonAccess'

function normalizeLocale(locale) {
  return locale === 'uk' ? 'uk' : 'en'
}

function getPythonLessonContent(lessonId, locale = 'en') {
  const map = normalizeLocale(locale) === 'uk' ? lessonContentMapUk : lessonContentMapEn
  return map[lessonId] || null
}

function getLessonForQuiz(courseId, lessonId, locale = 'en') {
  if (courseId === ROBLOX_COURSE_ID) {
    return getRobloxLessonContent(lessonId, locale)
  }
  if (courseId === AI_AT_WORK_COURSE_ID) {
    return getAiAtWorkLessonContent(lessonId, locale)
  }
  return getPythonLessonContent(lessonId, locale)
}

/** Server-side quiz scoring - never trust client quizScore. */
export function scoreLessonQuiz({ courseId, lessonId, quizAnswers, locale = 'en' }) {
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

export function lessonRequiresPractice(courseId, lessonId, locale = 'en') {
  const lesson = getLessonForQuiz(courseId, lessonId, locale)
  return Boolean(lesson?.practiceTask)
}

export function lessonRequiresQuiz(courseId, lessonId, locale = 'en') {
  const lesson = getLessonForQuiz(courseId, lessonId, locale)
  return Boolean(lesson?.quiz?.questions?.length)
}

export { getPythonLessonContent }
