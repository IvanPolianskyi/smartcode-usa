import { getLessonContent } from './lessonContentLoader.js'

/** Server-side quiz scoring - never trust client quizScore. */
export function scoreLessonQuiz({ courseId, lessonId, quizAnswers, locale = 'en' }) {
  const lesson = getLessonContent(courseId, lessonId, locale)
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
  const lesson = getLessonContent(courseId, lessonId, locale)
  return Boolean(lesson?.practiceTask)
}

export function lessonRequiresQuiz(courseId, lessonId, locale = 'en') {
  const lesson = getLessonContent(courseId, lessonId, locale)
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
  const lesson = getLessonContent(courseId, lessonId, locale)
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

export function getPythonLessonContent(lessonId) {
  return getLessonContent('python-developer-zero-to-junior', lessonId, 'en')
}

export function getLessonForQuiz(courseId, lessonId, locale = 'en') {
  return getLessonContent(courseId, lessonId, locale)
}
