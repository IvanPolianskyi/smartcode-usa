import * as mod01 from './en/module01-lessons.js'
import * as mod02 from './en/module02-lessons.js'
import * as mod03 from './en/module03-lessons.js'
import * as mod04 from './en/module04-lessons.js'
import * as mod05 from './en/module05-lessons.js'
import * as mod06 from './en/module06-lessons.js'
import * as mod07 from './en/module07-lessons.js'
import * as mod08 from './en/module08-lessons.js'
import * as mod09 from './en/module09-lessons.js'
import * as mod10 from './en/module10-lessons.js'
import * as mod11 from './en/module11-lessons.js'
import * as mod12 from './en/module12-lessons.js'
import { robloxCurriculum } from '../robloxCurriculum.js'

const modules = [
  mod01,
  mod02,
  mod03,
  mod04,
  mod05,
  mod06,
  mod07,
  mod08,
  mod09,
  mod10,
  mod11,
  mod12,
]

function extractLessonsFromModules() {
  const map = {}
  for (const mod of modules) {
    for (const val of Object.values(mod)) {
      if (val && typeof val === 'object' && val.lessonId) {
        map[val.lessonId] = val
      }
    }
  }
  return map
}

const allLessonIds = robloxCurriculum.modules.flatMap((m) =>
  (m.lessons || []).map((l) => l.lessonId)
)

function createPlaceholder(lessonId, title, locale = 'en') {
  const ukContent =
    'Контент цього уроку ще готується за новою програмою (92 уроки). Продовжуй попередні уроки або звернися до викладача на онлайн-занятті.'
  const enContent =
    'This lesson is being prepared for the new 92-lesson curriculum. Continue previous lessons or book a live class with your teacher.'

  return {
    lessonId,
    title,
    learningObjectives: [
      locale === 'en'
        ? 'Lesson content coming soon'
        : 'Матеріал уроку буде додано найближчим часом',
    ],
    estimatedTime: 60,
    theory: {
      sections: [
        {
          title,
          content: locale === 'en' ? enContent : ukContent,
        },
      ],
    },
    practiceTask: null,
    comingSoon: true,
  }
}

let cachedEnMap = null

function getMap() {
  if (cachedEnMap) return cachedEnMap

  const enLessons = extractLessonsFromModules()
  const placeholders = Object.fromEntries(
    allLessonIds
      .filter((id) => !enLessons[id])
      .map((id) => {
        const meta = robloxCurriculum.modules
          .flatMap((m) => m.lessons)
          .find((l) => l.lessonId === id)
        return [id, createPlaceholder(id, meta?.title || id, 'en')]
      })
  )

  cachedEnMap = { ...placeholders, ...enLessons }
  return cachedEnMap
}

export function getRobloxLessonContent(lessonId, _locale = 'en') {
  const map = getMap()
  return map[lessonId] || null
}

/** Count of lessons with full practice (sellable) */
export function getRobloxEnLessonStats() {
  const map = getMap()
  const total = allLessonIds.length
  const ready = allLessonIds.filter((id) => map[id] && !map[id].comingSoon).length
  return { total, ready }
}

export function getRobloxUkLessonStats() {
  return getRobloxEnLessonStats()
}
