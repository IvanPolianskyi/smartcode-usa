/**
 * Quick unit check for roblox progress remap (no DB).
 * node scripts/test-roblox-progress-migrate.mjs
 */
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const mod = await import(
  pathToFileURL(path.join(ROOT, 'src/lib/robloxProgressMigrate.js')).href
)

const sample = {
  courseId: 'roblox-studio',
  completedLessons: [
    'lesson-roblox-12-4',
    'lesson-roblox-12-5',
    'lesson-roblox-12-6',
    'lesson-roblox-12-7',
    'lesson-roblox-12-8',
    'lesson-roblox-13-6',
    'lesson-roblox-13-8',
    'lesson-roblox-99-1',
  ],
  completedPracticeTasks: ['lesson-roblox-12-7'],
  completedQuizzes: {
    'lesson-roblox-12-5': { score: 80, passed: true },
    'lesson-roblox-12-7': { score: 90, passed: true },
  },
  overallProgress: 50,
}

const { progress, changed } = mod.migrateRobloxProgressDoc(sample)
console.log('changed', changed)
console.log('lessons', progress.completedLessons)
console.log('practice', progress.completedPracticeTasks)
console.log('quizzes', Object.keys(progress.completedQuizzes))
console.log('overall', progress.overallProgress)
console.log('revision', progress.robloxCurriculumRevision)

const expect = [
  'lesson-roblox-12-4',
  'lesson-roblox-12-5',
  'lesson-roblox-12-6',
  'lesson-roblox-13-5',
  'lesson-roblox-13-6',
]
const ok =
  changed &&
  JSON.stringify(progress.completedLessons) === JSON.stringify(expect) &&
  progress.completedPracticeTasks.includes('lesson-roblox-12-5') &&
  progress.completedQuizzes['lesson-roblox-12-5']?.score === 90 &&
  progress.robloxCurriculumRevision === 'v2-92'

if (!ok) {
  console.error('FAIL')
  process.exit(1)
}
console.log('OK')
