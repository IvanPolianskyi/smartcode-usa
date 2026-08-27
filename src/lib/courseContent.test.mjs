/**
 * Course content integrity tests.
 *
 * Run: node --test src/lib/courseContent.test.mjs
 *
 * Without these checks a curriculum entry can ship without a lesson body, a quiz
 * can mark an out-of-range option as correct (server scores it as wrong forever),
 * an explanation can be blank so a failing student learns nothing, prerequisites
 * can point at a missing lesson or form a cycle that locks progress, module
 * orders can collide, or a TODO/placeholder can reach paying students.
 */

import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../..')

const QUIZ_TYPES = new Set([
  'multiple_choice',
  'code_reading',
  'logic',
  'true_false',
])

// Uppercase TODO only — lowercase "todo" (as in to-do list) is normal English.
function hasPlaceholder(text) {
  if (/\bFIXME\b|\bTBD\b|\bXXX\b|Lorem ipsum|coming soon/i.test(text)) {
    return text.match(/\bFIXME\b|\bTBD\b|\bXXX\b|Lorem ipsum|coming soon/i)?.[0]
  }
  if (/\bTODO\b/.test(text)) return 'TODO'
  return null
}
const CYRILLIC_RE = /[Ѐ-ӿ]/

function rewriteForImport(source) {
  let content = source
  content = content.replace(
    /import\s+\{[^}]*\}\s+from\s+['"][^'"]*courseData[^'"]*['"];?/g,
    `const QUIZ_QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  CODE_READING: 'code_reading',
  LOGIC: 'logic',
  TRUE_FALSE: 'true_false'
};`
  )
  content = content.replace(/import\s+.+from\s+['"][^'"]+['"];?\s*/g, '')
  return content
}

async function loadExportsFromFile(absPath) {
  const raw = fs.readFileSync(absPath, 'utf8')
  const tmp = path.join(
    root,
    `tmp_ctest_${path.basename(absPath)}_${process.pid}_${Math.random().toString(36).slice(2)}.mjs`
  )
  fs.writeFileSync(tmp, rewriteForImport(raw))
  try {
    const mod = await import(pathToFileURL(tmp).href + '?t=' + Date.now())
    return Object.values(mod)
  } finally {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
  }
}

function isLessonObject(v) {
  return v && typeof v === 'object' && typeof v.lessonId === 'string' && !Array.isArray(v)
}

function flattenLessonExports(values) {
  const lessons = []
  for (const v of values) {
    if (isLessonObject(v)) {
      lessons.push(v)
      continue
    }
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      for (const inner of Object.values(v)) {
        if (isLessonObject(inner)) lessons.push(inner)
      }
    }
  }
  return lessons
}

function curriculumLessonIds(fileRel) {
  const text = fs.readFileSync(path.join(root, fileRel), 'utf8')
  const ids = new Set()
  for (const re of [/lessonId:\s*["']([^"']+)["']/g, /"lessonId"\s*:\s*"([^"]+)"/g]) {
    for (const m of text.matchAll(re)) ids.add(m[1])
  }
  return ids
}

function curriculumPrereqs(fileRel) {
  // Parse lesson blocks roughly: lessonId then prerequisites array nearby
  const text = fs.readFileSync(path.join(root, fileRel), 'utf8')
  /** @type {Map<string, string[]>} */
  const map = new Map()
  const blocks = text.split(/(?=lessonId:\s*["']|"lessonId"\s*:\s*")/)
  for (const block of blocks) {
    const idMatch =
      block.match(/^lessonId:\s*["']([^"']+)["']/) ||
      block.match(/^"lessonId"\s*:\s*"([^"]+)"/)
    if (!idMatch) continue
    const id = idMatch[1]
    const prereqMatch = block.match(/prerequisites:\s*\[([^\]]*)\]/)
    if (!prereqMatch) {
      map.set(id, [])
      continue
    }
    const prereqs = [...prereqMatch[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1])
    map.set(id, prereqs)
  }
  return map
}

async function loadDirLessons(dirRel) {
  const dir = path.join(root, dirRel)
  /** @type {Map<string, object>} */
  const byId = new Map()
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) {
    const exports = await loadExportsFromFile(path.join(dir, f))
    for (const lesson of flattenLessonExports(exports)) {
      if (!byId.has(lesson.lessonId)) byId.set(lesson.lessonId, lesson)
    }
  }
  return byId
}

function textBlob(lesson) {
  const parts = []
  const walk = (node) => {
    if (typeof node === 'string') parts.push(node)
    else if (Array.isArray(node)) node.forEach(walk)
    else if (node && typeof node === 'object') Object.values(node).forEach(walk)
  }
  walk(lesson)
  return parts.join('\n')
}

function findCycles(prereqMap) {
  const cycles = []
  const visiting = new Set()
  const visited = new Set()
  const stack = []

  function dfs(node) {
    if (visiting.has(node)) {
      const idx = stack.indexOf(node)
      cycles.push(stack.slice(idx).concat(node))
      return
    }
    if (visited.has(node)) return
    visiting.add(node)
    stack.push(node)
    for (const p of prereqMap.get(node) || []) {
      if (prereqMap.has(p) || true) dfs(p)
    }
    stack.pop()
    visiting.delete(node)
    visited.add(node)
  }

  for (const id of prereqMap.keys()) dfs(id)
  return cycles
}

/** @type {{ name: string, curriculumFile: string, contentDir: string }[]} */
const COURSES = [
  {
    name: 'Python',
    curriculumFile: 'src/lib/pythonCurriculum.js',
    contentDir: 'src/lib/lessonContent/en',
  },
  {
    name: 'Roblox',
    curriculumFile: 'src/lib/robloxCurriculum.js',
    contentDir: 'src/lib/robloxLessonContent/en',
  },
  {
    name: 'AI at Work',
    curriculumFile: 'src/lib/aiAtWorkCurriculum.js',
    contentDir: 'src/lib/aiAtWorkLessonContent/en',
  },
]

/** @type {Map<string, { curriculumIds: Set<string>, lessons: Map<string, object>, prereqs: Map<string, string[]> }>} */
const loaded = new Map()

test('load all EN course content once', async () => {
  for (const course of COURSES) {
    const curriculumIds = curriculumLessonIds(course.curriculumFile)
    const lessons = await loadDirLessons(course.contentDir)
    const prereqs = curriculumPrereqs(course.curriculumFile)
    // Prefer content prerequisites when present
    for (const [id, lesson] of lessons) {
      if (Array.isArray(lesson.prerequisites)) {
        prereqs.set(id, lesson.prerequisites)
      }
    }
    loaded.set(course.name, { curriculumIds, lessons, prereqs })
    assert.ok(curriculumIds.size > 0, `${course.name}: empty curriculum`)
    assert.ok(lessons.size > 0, `${course.name}: no lesson content loaded`)
  }
})

test('every curriculum lesson has content and every content lesson is in curriculum', () => {
  const problems = []
  for (const course of COURSES) {
    const { curriculumIds, lessons } = loaded.get(course.name)
    for (const id of curriculumIds) {
      if (!lessons.has(id)) problems.push(`${course.name}: curriculum ${id} missing content`)
    }
    for (const id of lessons.keys()) {
      if (!curriculumIds.has(id)) problems.push(`${course.name}: orphan content ${id}`)
    }
  }
  assert.deepEqual(problems, [], problems.join('\n'))
})

test('quiz correctAnswer is a valid options index and explanation is non-empty', () => {
  const problems = []
  for (const course of COURSES) {
    const { lessons } = loaded.get(course.name)
    for (const [id, lesson] of lessons) {
      const questions = lesson.quiz?.questions
      if (!Array.isArray(questions) || !questions.length) {
        problems.push(`${course.name}/${id}: missing quiz.questions`)
        continue
      }
      questions.forEach((q, i) => {
        if (!QUIZ_TYPES.has(q?.type)) {
          problems.push(`${course.name}/${id} q${i}: bad type ${q?.type}`)
        }
        const options = q?.options
        if (!Array.isArray(options) || options.length < 2) {
          problems.push(`${course.name}/${id} q${i}: need ≥2 options`)
          return
        }
        const ca = q.correctAnswer
        if (typeof ca !== 'number' || !Number.isInteger(ca) || ca < 0 || ca >= options.length) {
          problems.push(`${course.name}/${id} q${i}: correctAnswer ${ca} out of range`)
        }
        if (!q.explanation || !String(q.explanation).trim()) {
          problems.push(`${course.name}/${id} q${i}: empty explanation`)
        }
      })
    }
  }
  assert.deepEqual(problems, [], problems.join('\n'))
})

test('prerequisites reference existing lessons and form no cycles', () => {
  const problems = []
  for (const course of COURSES) {
    const { curriculumIds, prereqs } = loaded.get(course.name)
    for (const [id, deps] of prereqs) {
      for (const dep of deps) {
        if (!curriculumIds.has(dep)) {
          problems.push(`${course.name}/${id}: prereq ${dep} does not exist`)
        }
      }
    }
    const cycles = findCycles(prereqs)
    for (const cycle of cycles) {
      problems.push(`${course.name}: prerequisite cycle ${cycle.join(' → ')}`)
    }
  }
  assert.deepEqual(problems, [], problems.join('\n'))
})

test('order is unique within each module', () => {
  const problems = []
  for (const course of COURSES) {
    const { lessons } = loaded.get(course.name)
    /** @type {Map<string, Map<number, string[]>>} */
    const byModule = new Map()
    for (const [id, lesson] of lessons) {
      const mid = lesson.moduleId || '?'
      if (!byModule.has(mid)) byModule.set(mid, new Map())
      const orders = byModule.get(mid)
      const order = lesson.order
      if (typeof order !== 'number') {
        problems.push(`${course.name}/${id}: missing numeric order`)
        continue
      }
      if (!orders.has(order)) orders.set(order, [])
      orders.get(order).push(id)
    }
    for (const [mid, orders] of byModule) {
      for (const [order, ids] of orders) {
        if (ids.length > 1) {
          problems.push(
            `${course.name}/${mid}: duplicate order ${order}: ${ids.join(', ')}`
          )
        }
      }
    }
  }
  assert.deepEqual(problems, [], problems.join('\n'))
})

test('production EN content has no placeholders or Cyrillic', () => {
  const problems = []
  for (const course of COURSES) {
    const { lessons } = loaded.get(course.name)
    for (const [id, lesson] of lessons) {
      const blob = textBlob(lesson)
      const ph = hasPlaceholder(blob)
      if (ph) problems.push(`${course.name}/${id}: placeholder "${ph}"`)
      if (CYRILLIC_RE.test(blob)) problems.push(`${course.name}/${id}: Cyrillic in EN content`)
    }
  }
  assert.deepEqual(problems, [], problems.join('\n'))
})
