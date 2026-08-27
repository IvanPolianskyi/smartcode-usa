import { lessonContentMap as pythonLessonsEn } from './lessonContentMap.en.js'
import { getRobloxLessonContent } from './robloxLessonContent/index.js'
import { getAiAtWorkLessonContent } from './aiAtWorkLessonContent/index.js'
import {
  PYTHON_COURSE_ID,
  ROBLOX_COURSE_ID,
  AI_AT_WORK_COURSE_ID,
} from './courseIds.js'

/**
 * Server-only helper to load a single lesson's full content by course and lesson ID.
 * This keeps all course content maps out of the client JavaScript bundles.
 *
 * @param {string} courseId
 * @param {string} lessonId
 * @param {string} locale
 * @returns {object|null}
 */
export function getLessonContent(courseId, lessonId, locale = 'en') {
  if (!lessonId || !courseId) return null

  if (courseId === ROBLOX_COURSE_ID || courseId === 'roblox-studio') {
    return getRobloxLessonContent(lessonId, locale)
  }

  if (courseId === AI_AT_WORK_COURSE_ID || courseId === 'ai-at-work') {
    return getAiAtWorkLessonContent(lessonId, locale)
  }

  if (courseId === PYTHON_COURSE_ID || courseId === 'python-developer-zero-to-junior') {
    return pythonLessonsEn[lessonId] || null
  }

  return null
}
