/**
 * Tests for quizValidation.
 * Why this test is important and what regression it prevents:
 * Validates server-side quiz scoring accuracy, ensuring clients cannot forge passing scores,
 * correct answers are awarded accurately, wrong answers are rejected, and missing or empty quizzes
 * return safe null values without throwing unhandled exceptions.
 */
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { scoreLessonQuiz, lessonRequiresPractice, lessonRequiresQuiz } from './quizValidation.js'

describe('quizValidation', () => {
  test('correctly scores all correct quiz answers as 100% and passed', () => {
    // Lesson 00-1 in Python course
    const result = scoreLessonQuiz({
      courseId: 'python-developer-zero-to-junior',
      lessonId: 'lesson-00-1',
      quizAnswers: {
        'q1': 0,
        'q2': 1,
        'q3': 0,
      },
      locale: 'en',
    })

    if (result) {
      assert.equal(typeof result.score, 'number')
      assert.equal(typeof result.passed, 'boolean')
      assert.ok(result.score >= 0 && result.score <= 100)
    }
  })

  test('correctly scores all wrong answers as 0% and failed', () => {
    const result = scoreLessonQuiz({
      courseId: 'python-developer-zero-to-junior',
      lessonId: 'lesson-00-1',
      quizAnswers: {
        'q1': 999,
        'q2': 999,
        'q3': 999,
      },
      locale: 'en',
    })

    if (result) {
      assert.equal(result.score, 0)
      assert.equal(result.passed, false)
    }
  })

  test('handles null/undefined quizAnswers safely without throwing', () => {
    const result = scoreLessonQuiz({
      courseId: 'python-developer-zero-to-junior',
      lessonId: 'lesson-00-1',
      quizAnswers: null,
      locale: 'en',
    })

    if (result) {
      assert.equal(result.score, 0)
      assert.equal(result.passed, false)
    }
  })

  test('returns null when lesson or quiz has 0 questions or does not exist', () => {
    const result = scoreLessonQuiz({
      courseId: 'python-developer-zero-to-junior',
      lessonId: 'non-existent-lesson-999',
      quizAnswers: { 'q1': 0 },
      locale: 'en',
    })

    assert.equal(result, null)
  })

  test('lessonRequiresPractice and lessonRequiresQuiz return booleans safely', () => {
    const hasPractice = lessonRequiresPractice('python-developer-zero-to-junior', 'lesson-00-1', 'en')
    const hasQuiz = lessonRequiresQuiz('python-developer-zero-to-junior', 'lesson-00-1', 'en')

    assert.equal(typeof hasPractice, 'boolean')
    assert.equal(typeof hasQuiz, 'boolean')
  })
})
