/**
 * Roblox v2 progress helpers — after curriculum cut 96 → 92 (M12/M13: 8 → 6).
 *
 * Same lesson IDs (12-5, 12-6, 13-5, 13-6) changed meaning, so we only apply the
 * full remaps when the document still has orphan IDs from the 8-lesson tails.
 */

import { robloxCurriculum } from './robloxCurriculum.js'

export const ROBLOX_CURRICULUM_REVISION = 'v2-92'

/** Present only in the pre-cut 8-lesson M12 / M13 tails */
export const ROBLOX_ORPHAN_LESSON_IDS = [
  'lesson-roblox-12-7',
  'lesson-roblox-12-8',
  'lesson-roblox-13-7',
  'lesson-roblox-13-8',
]

/**
 * Single-pass map (do not chain). Applied only when orphans are present.
 * Old meaning → new ID after cut.
 */
export const ROBLOX_LESSON_ID_REMAP_FROM_V96 = {
  'lesson-roblox-12-5': 'lesson-roblox-12-4', // shop → GUI+shop
  'lesson-roblox-12-6': 'lesson-roblox-12-5', // arena → arena+juice
  'lesson-roblox-12-7': 'lesson-roblox-12-5', // juice → arena+juice
  'lesson-roblox-12-8': 'lesson-roblox-12-6', // checkpoint
  'lesson-roblox-13-6': 'lesson-roblox-13-5', // publish → publish+boost
  'lesson-roblox-13-7': 'lesson-roblox-13-6', // freeze → freeze+showcase
  'lesson-roblox-13-8': 'lesson-roblox-13-6', // showcase
}

export function getRobloxTotalLessons() {
  return robloxCurriculum.modules.reduce((sum, m) => sum + m.lessons.length, 0)
}

export function getValidRobloxLessonIds() {
  const ids = new Set()
  for (const mod of robloxCurriculum.modules) {
    for (const lesson of mod.lessons) {
      ids.add(lesson.lessonId)
    }
  }
  return ids
}

function remapLessonId(id, applyV96Remap) {
  if (!applyV96Remap) return id
  return ROBLOX_LESSON_ID_REMAP_FROM_V96[id] || id
}

function remapIdList(list, applyV96Remap, validIds) {
  const out = []
  const seen = new Set()
  for (const id of Array.isArray(list) ? list : []) {
    const next = remapLessonId(id, applyV96Remap)
    if (!validIds.has(next) || seen.has(next)) continue
    seen.add(next)
    out.push(next)
  }
  return out
}

function remapQuizMap(quizzes, applyV96Remap, validIds) {
  const src = quizzes && typeof quizzes === 'object' ? quizzes : {}
  const out = {}
  for (const [id, record] of Object.entries(src)) {
    const next = remapLessonId(id, applyV96Remap)
    if (!validIds.has(next)) continue
    // Keep the better attempt if two old IDs collapse onto one
    const prev = out[next]
    if (!prev || (record?.score || 0) >= (prev?.score || 0)) {
      out[next] = record
    }
  }
  return out
}

export function needsRobloxV96Remap(progress) {
  const lessons = progress?.completedLessons || []
  const quizzes = Object.keys(progress?.completedQuizzes || {})
  const practice = Array.isArray(progress?.completedPracticeTasks)
    ? progress.completedPracticeTasks
    : []
  const all = [...lessons, ...quizzes, ...practice]
  return all.some((id) => ROBLOX_ORPHAN_LESSON_IDS.includes(id))
}

/**
 * Normalize a roblox-studio progress document for the current 92-lesson grid.
 * Returns { progress, changed }.
 */
export function migrateRobloxProgressDoc(progress) {
  if (!progress || progress.courseId !== 'roblox-studio') {
    return { progress, changed: false }
  }

  const validIds = getValidRobloxLessonIds()
  const applyV96Remap = needsRobloxV96Remap(progress)
  const alreadyCurrent = progress.robloxCurriculumRevision === ROBLOX_CURRICULUM_REVISION

  const completedLessons = remapIdList(progress.completedLessons, applyV96Remap, validIds)
  const completedPracticeTasks = remapIdList(
    progress.completedPracticeTasks,
    applyV96Remap,
    validIds
  )
  const completedQuizzes = remapQuizMap(progress.completedQuizzes, applyV96Remap, validIds)

  let currentLesson = progress.currentLesson || 0
  if (typeof currentLesson === 'string') {
    currentLesson = remapLessonId(currentLesson, applyV96Remap)
    if (!validIds.has(currentLesson)) currentLesson = 0
  }

  const total = getRobloxTotalLessons()
  const overallProgress =
    total > 0 ? Math.round((completedLessons.length / total) * 100) : 0

  const next = {
    ...progress,
    completedLessons,
    completedPracticeTasks,
    completedQuizzes,
    currentLesson,
    overallProgress,
    robloxCurriculumRevision: ROBLOX_CURRICULUM_REVISION,
  }

  const changed =
    !alreadyCurrent ||
    applyV96Remap ||
    progress.overallProgress !== overallProgress ||
    JSON.stringify(progress.completedLessons || []) !== JSON.stringify(completedLessons) ||
    JSON.stringify(progress.completedPracticeTasks || []) !==
      JSON.stringify(completedPracticeTasks) ||
    JSON.stringify(progress.completedQuizzes || {}) !== JSON.stringify(completedQuizzes)

  return { progress: next, changed }
}
