/**
 * Утиліти для роботи з курсами та прогресом
 * Централізована логіка для уникнення дублювання коду
 */

import { getCollection } from './mongodb'
import { ROBLOX_CURRICULUM_REVISION } from './robloxProgressMigrate'

/**
 * Додає курс до enrolledCourses користувача (якщо ще не додано)
 * Використовується при створенні прогресу для автоматичної реєстрації на курс
 */
export async function ensureUserEnrolled(userIdObj, courseId) {
  const usersCollection = await getCollection('users')
  const result = await usersCollection.updateOne(
    { _id: userIdObj },
    { 
      $addToSet: { enrolledCourses: courseId },
      $set: { updatedAt: new Date() }
    }
  )
  
  console.log('ensureUserEnrolled:', {
    userId: userIdObj.toString(),
    courseId,
    modified: result.modifiedCount,
    matched: result.matchedCount
  })
  
  return result
}

/**
 * Створює новий запис прогресу для користувача
 * Також автоматично додає курс до enrolledCourses
 */
export async function createProgressEntry(userIdObj, courseId, { enroll = true } = {}) {
  const progressCollection = await getCollection('userProgress')
  
  const progress = {
    userId: userIdObj,
    courseId,
    enrolledAt: new Date(),
    completedLessons: [],
    completedQuizzes: {},
    completedPracticeTasks: [],
    currentModule: 0,
    currentLesson: 0,
    overallProgress: 0,
    certificates: [],
    ...(courseId === 'roblox-studio'
      ? { robloxCurriculumRevision: ROBLOX_CURRICULUM_REVISION }
      : {}),
  }
  
  await progressCollection.insertOne(progress)
  
  if (enroll) {
    await ensureUserEnrolled(userIdObj, courseId)
  }
  
  return progress
}

