import { getRobloxLessonContent } from '@/lib/robloxLessonContent'
import { getAiAtWorkLessonContent } from '@/lib/aiAtWorkLessonContent'
import { lessonContentMap } from '@/lib/lessonContentMap.en'
import {
  AI_AT_WORK_COURSE_ID,
  ROBLOX_COURSE_ID,
} from '@/lib/courseLessonAccess'

function getPythonLessonContent(lessonId) {
  return lessonContentMap[lessonId] || null
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

/**
 * Every interactive widget declared by a lesson, flattened across its theory
 * sections. The progress API scores submissions against these definitions, so
 * a client can never claim XP for an answer the lesson does not accept.
 *
 * @returns {Array<object>} interactives in document order (may be empty)
 */
export function getLessonInteractives(courseId, lessonId, locale = 'en') {
  const lesson = getLessonForQuiz(courseId, lessonId, locale)
  const sections = lesson?.theory?.sections
  if (!Array.isArray(sections)) return []

  const found = []
  for (const section of sections) {
    if (!Array.isArray(section?.interactives)) continue
    for (const interactive of section.interactives) {
      if (interactive?.id && interactive?.type) found.push(interactive)
    }
  }
  return found
}

export function getLessonInteractive(courseId, lessonId, interactiveId, locale = 'en') {
  return (
    getLessonInteractives(courseId, lessonId, locale).find((i) => i.id === interactiveId) || null
  )
}

export { getPythonLessonContent, getLessonForQuiz }
