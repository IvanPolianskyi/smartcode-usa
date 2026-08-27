/**
 * Tests for lessonContentLoader.
 * Why this test is important and what regression it prevents:
 * Ensures the on-demand server content loader correctly resolves single lesson modules
 * without loading the whole 7MB dataset into client memory, and safely handles missing courses or invalid lesson IDs
 * returning null instead of throwing unhandled exceptions that would crash the server route (500 error).
 */
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { getLessonContent } from './lessonContentLoader.js'

describe('lessonContentLoader', () => {
  test('returns lesson content for valid Python lesson', () => {
    const lesson = getLessonContent('python-developer-zero-to-junior', 'lesson-00-1', 'en')
    assert.ok(lesson, 'Should return lesson object')
    assert.equal(lesson.lessonId, 'lesson-00-1')
    assert.ok(lesson.title, 'Lesson should have a title')
    assert.ok(lesson.theory, 'Lesson should contain theory')
  })

  test('returns lesson content for valid Roblox lesson', () => {
    const lesson = getLessonContent('roblox-studio', 'lesson-roblox-1-1', 'en')
    assert.ok(lesson, 'Should return Roblox lesson object')
    assert.equal(lesson.lessonId, 'lesson-roblox-1-1')
    assert.ok(lesson.title, 'Roblox lesson should have a title')
  })

  test('returns null for non-existent lessonId', () => {
    const lesson = getLessonContent('python-developer-zero-to-junior', 'non-existent-lesson-999', 'en')
    assert.equal(lesson, null, 'Should return null for non-existent lesson')
  })

  test('returns null for non-existent courseId', () => {
    const lesson = getLessonContent('fake-course-id', 'lesson-00-1', 'en')
    assert.equal(lesson, null, 'Should return null for unknown course')
  })

  test('handles null / undefined parameters gracefully without throwing', () => {
    assert.equal(getLessonContent(null, null, null), null)
    assert.equal(getLessonContent('python-developer-zero-to-junior', undefined, 'en'), null)
    assert.equal(getLessonContent(undefined, 'lesson-00-1', 'en'), null)
  })
})
