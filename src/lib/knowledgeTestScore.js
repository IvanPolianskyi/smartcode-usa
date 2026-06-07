import { TEST_QUESTIONS } from '@/lib/testQuestions'

export const KNOWLEDGE_TEST_DIRECTIONS = ['python', 'roblox', 'webdev', 'unity']

function getAnswer(answers, questionId) {
  if (!answers || typeof answers !== 'object') return undefined
  return answers[questionId] ?? answers[String(questionId)]
}

export function validateKnowledgeTestAnswers(direction, answers) {
  if (!KNOWLEDGE_TEST_DIRECTIONS.includes(direction)) {
    return { ok: false, reason: 'invalid_direction' }
  }

  const questions = TEST_QUESTIONS[direction]
  if (!questions?.length) {
    return { ok: false, reason: 'invalid_direction' }
  }

  for (const q of questions) {
    const value = getAnswer(answers, q.id)
    if (value === undefined || value === null) {
      return { ok: false, reason: 'incomplete_answers' }
    }
    if (!Number.isInteger(value) || value < 0 || value >= q.options.length) {
      return { ok: false, reason: 'invalid_answer' }
    }
  }

  return { ok: true, questions }
}

export function scoreKnowledgeTest(direction, answers) {
  const validated = validateKnowledgeTestAnswers(direction, answers)
  if (!validated.ok) return null

  let correct = 0
  for (const q of validated.questions) {
    if (getAnswer(answers, q.id) === q.correct) {
      correct++
    }
  }

  const totalQuestions = validated.questions.length
  const percentage =
    totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0

  return { score: correct, totalQuestions, percentage }
}
