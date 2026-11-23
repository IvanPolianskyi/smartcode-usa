import { ROBLOX_COURSE_ID } from './courseIds.js'

/**
 * Where a free sign-up lands: the first Roblox lesson, which is open to
 * everyone (see courseLessonAccess `freePreview`). Sending new accounts to the
 * pricing page instead asked for a card before they had built anything.
 */
export const FREE_FIRST_LESSON_PATH = `/courses/${ROBLOX_COURSE_ID}/lessons/lesson-roblox-1-1`
