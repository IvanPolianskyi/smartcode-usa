/**
 * Roblox progress helpers for the production 92-lesson course.
 * Grid: M1×8 + M2×4 + M3×8 + M4×8 + M5×10 + M6×10 + M7-M10×8 + M11×6 + M12×6
 * Filters stale IDs and keeps overallProgress in sync with robloxCurriculum.
 */

import { robloxCurriculum } from './robloxCurriculum.js'

export const ROBLOX_CURRICULUM_REVISION = 'prod-92'

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

function filterIdList(list, validIds) {
  const out = []
  const seen = new Set()
  for (const id of Array.isArray(list) ? list : []) {
    if (!validIds.has(id) || seen.has(id)) continue
    seen.add(id)
    out.push(id)
  }
  return out
}

function filterQuizMap(quizzes, validIds) {
  const src = quizzes && typeof quizzes === 'object' ? quizzes : {}
  const out = {}
  for (const [id, record] of Object.entries(src)) {
    if (!validIds.has(id)) continue
    out[id] = record
  }
  return out
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
  const alreadyCurrent = progress.robloxCurriculumRevision === ROBLOX_CURRICULUM_REVISION

  const completedLessons = filterIdList(progress.completedLessons, validIds)
  const completedPracticeTasks = filterIdList(progress.completedPracticeTasks, validIds)
  const completedQuizzes = filterQuizMap(progress.completedQuizzes, validIds)

  let currentLesson = progress.currentLesson || 0
  if (typeof currentLesson === 'string' && !validIds.has(currentLesson)) {
    currentLesson = 0
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
    progress.overallProgress !== overallProgress ||
    JSON.stringify(progress.completedLessons || []) !== JSON.stringify(completedLessons) ||
    JSON.stringify(progress.completedPracticeTasks || []) !==
      JSON.stringify(completedPracticeTasks) ||
    JSON.stringify(progress.completedQuizzes || {}) !== JSON.stringify(completedQuizzes)

  return { progress: next, changed }
}

