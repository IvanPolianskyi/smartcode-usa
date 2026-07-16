/**
 * Bulk-migrate userProgress for roblox-studio after curriculum cut 96 → 92.
 *
 * Usage:
 *   node scripts/migrate-roblox-progress.mjs           # dry-run
 *   node scripts/migrate-roblox-progress.mjs --apply    # write changes
 *
 * Loads MONGODB_URI from .env.local / .env
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module'
import { MongoClient } from 'mongodb'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

for (const envFile of ['.env.local', '.env']) {
  const full = path.join(ROOT, envFile)
  if (fs.existsSync(full)) {
    require('dotenv').config({ path: full })
    break
  }
}

const APPLY = process.argv.includes('--apply')
const COURSE_ID = 'roblox-studio'
const REVISION = 'v2-92'

const ORPHANS = new Set([
  'lesson-roblox-12-7',
  'lesson-roblox-12-8',
  'lesson-roblox-13-7',
  'lesson-roblox-13-8',
])

const REMAP = {
  'lesson-roblox-12-5': 'lesson-roblox-12-4',
  'lesson-roblox-12-6': 'lesson-roblox-12-5',
  'lesson-roblox-12-7': 'lesson-roblox-12-5',
  'lesson-roblox-12-8': 'lesson-roblox-12-6',
  'lesson-roblox-13-6': 'lesson-roblox-13-5',
  'lesson-roblox-13-7': 'lesson-roblox-13-6',
  'lesson-roblox-13-8': 'lesson-roblox-13-6',
}

async function loadValidIds() {
  const { robloxCurriculum } = await import(
    pathToFileURL(path.join(ROOT, 'src/lib/robloxCurriculum.js')).href
  )
  const ids = new Set()
  for (const mod of robloxCurriculum.modules) {
    for (const lesson of mod.lessons) ids.add(lesson.lessonId)
  }
  return { ids, total: ids.size }
}

function needsV96Remap(doc) {
  const bag = [
    ...(doc.completedLessons || []),
    ...Object.keys(doc.completedQuizzes || {}),
    ...(Array.isArray(doc.completedPracticeTasks) ? doc.completedPracticeTasks : []),
  ]
  return bag.some((id) => ORPHANS.has(id))
}

function remapList(list, applyRemap, validIds) {
  const out = []
  const seen = new Set()
  for (const id of Array.isArray(list) ? list : []) {
    const next = applyRemap ? REMAP[id] || id : id
    if (!validIds.has(next) || seen.has(next)) continue
    seen.add(next)
    out.push(next)
  }
  return out
}

function remapQuizzes(quizzes, applyRemap, validIds) {
  const out = {}
  for (const [id, record] of Object.entries(quizzes || {})) {
    const next = applyRemap ? REMAP[id] || id : id
    if (!validIds.has(next)) continue
    const prev = out[next]
    if (!prev || (record?.score || 0) >= (prev?.score || 0)) out[next] = record
  }
  return out
}

async function main() {
  const mongoUri = process.env.MONGODB_URI
  const databaseName = process.env.MONGODB_DB || 'SmartCodeLogs'
  if (!mongoUri) {
    console.error('MONGODB_URI is not set')
    process.exit(1)
  }

  const { ids: validIds, total } = await loadValidIds()
  const client = new MongoClient(mongoUri)
  await client.connect()
  const col = client.db(databaseName).collection('userProgress')
  const docs = await col.find({ courseId: COURSE_ID }).toArray()

  let scanned = 0
  let wouldChange = 0
  let applied = 0

  for (const doc of docs) {
    scanned += 1
    const applyRemap = needsV96Remap(doc)
    const completedLessons = remapList(doc.completedLessons, applyRemap, validIds)
    const completedPracticeTasks = remapList(doc.completedPracticeTasks, applyRemap, validIds)
    const completedQuizzes = remapQuizzes(doc.completedQuizzes, applyRemap, validIds)
    let currentLesson = doc.currentLesson || 0
    if (typeof currentLesson === 'string') {
      currentLesson = applyRemap ? REMAP[currentLesson] || currentLesson : currentLesson
      if (!validIds.has(currentLesson)) currentLesson = 0
    }
    const overallProgress =
      total > 0 ? Math.round((completedLessons.length / total) * 100) : 0

    const changed =
      doc.robloxCurriculumRevision !== REVISION ||
      applyRemap ||
      doc.overallProgress !== overallProgress ||
      JSON.stringify(doc.completedLessons || []) !== JSON.stringify(completedLessons) ||
      JSON.stringify(doc.completedPracticeTasks || []) !== JSON.stringify(completedPracticeTasks) ||
      JSON.stringify(doc.completedQuizzes || {}) !== JSON.stringify(completedQuizzes)

    if (!changed) continue
    wouldChange += 1
    console.log(
      `${APPLY ? 'UPDATE' : 'DRY'} ${doc.userId} remap=${applyRemap} ` +
        `${(doc.completedLessons || []).length}→${completedLessons.length} lessons, ` +
        `progress ${doc.overallProgress}→${overallProgress}`
    )

    if (APPLY) {
      await col.updateOne(
        { _id: doc._id },
        {
          $set: {
            completedLessons,
            completedPracticeTasks,
            completedQuizzes,
            currentLesson,
            overallProgress,
            robloxCurriculumRevision: REVISION,
            updatedAt: new Date(),
          },
        }
      )
      applied += 1
    }
  }

  console.log(
    `\nDone. scanned=${scanned} needChange=${wouldChange} applied=${applied} mode=${APPLY ? 'apply' : 'dry-run'}`
  )
  if (!APPLY && wouldChange > 0) {
    console.log('Re-run with --apply to write changes.')
  }

  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
