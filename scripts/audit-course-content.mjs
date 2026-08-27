/**
 * Course content inventory & quality audit for SmartCode Academy (EN).
 *
 * Usage: node scripts/audit-course-content.mjs
 * Writes: docs/agents/reports/content-inventory.md
 * Exit 1 if any blocking issues are found.
 *
 * Pure Node — no extra deps. Loads lesson modules via temp rewrite
 * (extensionless imports + courseData mock), same pattern as verify_python_solutions.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const QUIZ_TYPES = new Set([
  'multiple_choice',
  'code_reading',
  'logic',
  'true_false',
])

const PLACEHOLDER_RE =
  /\b(TODO|FIXME|Lorem|coming soon|TBD|XXX)\b/i
const CYRILLIC_RE = /[Ѐ-ӿ]/

const MIN_SECTION_CHARS = 200
const MIN_QUIZ_QUESTIONS = 3
const MIN_EXAMPLES = 2
const MIN_HINTS = 2

/** @typedef {{ file: string, lessonId: string, problem: string, blocking: boolean }} Issue */

/** @type {Issue[]} */
const issues = []

function addIssue(file, lessonId, problem, blocking = true) {
  issues.push({ file, lessonId: lessonId || '—', problem, blocking })
}

function rel(p) {
  return path.relative(root, p).replace(/\\/g, '/')
}

function extractQuotedIds(text, keyPatterns) {
  const ids = new Set()
  for (const re of keyPatterns) {
    for (const m of text.matchAll(re)) {
      ids.add(m[1])
    }
  }
  return ids
}

function curriculumLessonIds(fileRel) {
  const text = fs.readFileSync(path.join(root, fileRel), 'utf8')
  return extractQuotedIds(text, [
    /lessonId:\s*["']([^"']+)["']/g,
    /"lessonId"\s*:\s*"([^"]+)"/g,
  ])
}

function curriculumModuleMeta(fileRel) {
  const text = fs.readFileSync(path.join(root, fileRel), 'utf8')
  /** @type {Map<string, { moduleId: string, order: number }>} */
  const map = new Map()
  // Split roughly by module blocks — good enough for id → module mapping
  const moduleBlocks = text.split(/moduleId:\s*["']|\"moduleId\"\s*:\s*\"/)
  for (let i = 1; i < moduleBlocks.length; i++) {
    const block = moduleBlocks[i]
    const moduleIdMatch = block.match(/^([^"']+)["']/)
    if (!moduleIdMatch) continue
    const moduleId = moduleIdMatch[1]
    const lessons = [
      ...block.matchAll(/lessonId:\s*["']([^"']+)["']/g),
      ...block.matchAll(/"lessonId"\s*:\s*"([^"]+)"/g),
    ]
    const orders = [
      ...block.matchAll(/^\s*order:\s*(\d+)/gm),
      ...block.matchAll(/"order"\s*:\s*(\d+)/g),
    ]
    // Pair lessons with nearby order fields inside lesson objects is fragile;
    // we validate order uniqueness from loaded lesson content instead.
    for (const m of lessons) {
      map.set(m[1], { moduleId, order: 0 })
    }
    void orders
  }
  return map
}

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
  // Drop other relative imports that would fail under plain Node
  content = content.replace(/import\s+.+from\s+['"][^'"]+['"];?\s*/g, '')
  return content
}

async function loadExportsFromFile(absPath) {
  const raw = fs.readFileSync(absPath, 'utf8')
  const rewritten = rewriteForImport(raw)
  const tmp = path.join(root, `tmp_audit_${path.basename(absPath)}_${Date.now()}_${Math.random().toString(36).slice(2)}.mjs`)
  fs.writeFileSync(tmp, rewritten)
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
  /** @type {object[]} */
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

/**
 * @param {object} lesson
 * @param {string} fileRel
 * @param {Set<string>} curriculumIds
 * @param {Map<string, { moduleId: string }>} curriculumModules
 * @param {{ practiceShape: 'python' | 'studio' }} opts
 */
function auditLesson(lesson, fileRel, curriculumIds, curriculumModules, opts) {
  const id = lesson.lessonId || ''

  if (!id) {
    addIssue(fileRel, '—', 'missing lessonId', true)
    return
  }

  if (!curriculumIds.has(id)) {
    addIssue(fileRel, id, 'orphan content: lesson not in curriculum', true)
  }

  const expectedModule = curriculumModules.get(id)?.moduleId
  if (lesson.moduleId && expectedModule && lesson.moduleId !== expectedModule) {
    addIssue(
      fileRel,
      id,
      `moduleId mismatch: content=${lesson.moduleId}, curriculum=${expectedModule}`,
      true
    )
  }

  if (!lesson.title || !String(lesson.title).trim()) {
    addIssue(fileRel, id, 'empty title', true)
  }

  if (!Array.isArray(lesson.learningObjectives) || lesson.learningObjectives.length === 0) {
    addIssue(fileRel, id, 'missing/empty learningObjectives', true)
  }

  if (!lesson.summary || !String(lesson.summary).trim()) {
    addIssue(fileRel, id, 'missing/empty summary', true)
  }

  const sections = lesson.theory?.sections
  if (!Array.isArray(sections) || sections.length === 0) {
    addIssue(fileRel, id, 'missing theory.sections', true)
  } else {
    sections.forEach((sec, i) => {
      const content = String(sec?.content ?? '')
      if (!content.trim()) {
        addIssue(fileRel, id, `theory.sections[${i}] empty content`, true)
      } else if (content.trim().length < MIN_SECTION_CHARS) {
        addIssue(
          fileRel,
          id,
          `theory.sections[${i}] content too short (${content.trim().length} < ${MIN_SECTION_CHARS})`,
          true
        )
      }
    })
  }

  const quiz = lesson.quiz
  const questions = quiz?.questions
  if (!Array.isArray(questions) || questions.length === 0) {
    addIssue(fileRel, id, 'missing quiz.questions', true)
  } else {
    if (questions.length < MIN_QUIZ_QUESTIONS) {
      addIssue(
        fileRel,
        id,
        `quiz has ${questions.length} questions (min ${MIN_QUIZ_QUESTIONS})`,
        true
      )
    }
    questions.forEach((q, qi) => {
      const prefix = `quiz.questions[${qi}]`
      if (!q?.type || !QUIZ_TYPES.has(q.type)) {
        addIssue(fileRel, id, `${prefix} invalid type: ${q?.type}`, true)
      }
      if (!q?.question || !String(q.question).trim()) {
        addIssue(fileRel, id, `${prefix} empty question`, true)
      }
      const options = q?.options
      if (!Array.isArray(options) || options.length < 2) {
        addIssue(fileRel, id, `${prefix} needs ≥2 options`, true)
      } else {
        if (q.type === 'true_false' && options.length !== 2) {
          addIssue(fileRel, id, `${prefix} true_false must have exactly 2 options`, true)
        }
        const ca = q.correctAnswer
        if (typeof ca !== 'number' || !Number.isInteger(ca) || ca < 0 || ca >= options.length) {
          addIssue(
            fileRel,
            id,
            `${prefix} correctAnswer out of range: ${ca}`,
            true
          )
        }
      }
      if (!q?.explanation || !String(q.explanation).trim()) {
        addIssue(fileRel, id, `${prefix} empty explanation`, true)
      }
    })
  }

  const pt = lesson.practiceTask
  if (pt) {
    if (opts.practiceShape === 'python') {
      if (!pt.problemStatement || !String(pt.problemStatement).trim()) {
        addIssue(fileRel, id, 'practiceTask.problemStatement empty', true)
      }
      const examples = pt.examples
      if (!Array.isArray(examples) || examples.length < MIN_EXAMPLES) {
        addIssue(
          fileRel,
          id,
          `practiceTask.examples need ≥${MIN_EXAMPLES} (has ${examples?.length ?? 0})`,
          true
        )
      }
      const sol = pt.solution
      const hasSolution =
        (typeof sol === 'string' && sol.trim()) ||
        (sol && typeof sol === 'object' && String(sol.code || '').trim())
      if (!hasSolution) {
        addIssue(fileRel, id, 'practiceTask.solution missing', true)
      }
    } else {
      // Roblox / AI: studio brief or offline task — description is the brief
      const brief =
        (pt.problemStatement && String(pt.problemStatement).trim()) ||
        (pt.description && String(pt.description).trim())
      if (!brief) {
        addIssue(fileRel, id, 'practiceTask missing description/problemStatement', true)
      }
    }
    const hints = pt.hints
    if (!Array.isArray(hints) || hints.length < MIN_HINTS) {
      addIssue(
        fileRel,
        id,
        `practiceTask.hints need ≥${MIN_HINTS} (has ${hints?.length ?? 0})`,
        true
      )
    }
  }

  const blob = textBlob(lesson)
  if (PLACEHOLDER_RE.test(blob)) {
    const m = blob.match(PLACEHOLDER_RE)
    addIssue(fileRel, id, `placeholder text: "${m?.[0]}"`, true)
  }
  if (CYRILLIC_RE.test(blob)) {
    addIssue(fileRel, id, 'Cyrillic characters in EN content', true)
  }
}

function dedupeLessons(items) {
  const seen = new Set()
  /** @type {{ lesson: object, file: string }[]} */
  const out = []
  for (const item of items) {
    const id = item.lesson.lessonId
    if (!id || seen.has(id)) continue
    seen.add(id)
    out.push(item)
  }
  return out
}

async function loadPythonLessons() {
  const dir = path.join(root, 'src/lib/lessonContent/en')
  /** @type {{ lesson: object, file: string }[]} */
  const out = []
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) {
    const abs = path.join(dir, f)
    const exports = await loadExportsFromFile(abs)
    const lessons = flattenLessonExports(exports)
    for (const lesson of lessons) {
      out.push({ lesson, file: rel(abs) })
    }
  }
  return dedupeLessons(out)
}

async function loadModuleDirLessons(dirRel) {
  const dir = path.join(root, dirRel)
  /** @type {{ lesson: object, file: string }[]} */
  const out = []
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) {
    const abs = path.join(dir, f)
    const exports = await loadExportsFromFile(abs)
    const lessons = flattenLessonExports(exports)
    for (const lesson of lessons) {
      out.push({ lesson, file: rel(abs) })
    }
  }
  return dedupeLessons(out)
}

function checkOrderUniqueness(loaded, courseLabel) {
  /** @type {Map<string, Map<number, string[]>>} */
  const byModule = new Map()
  for (const { lesson, file } of loaded) {
    const mid = lesson.moduleId || '?'
    if (!byModule.has(mid)) byModule.set(mid, new Map())
    const orders = byModule.get(mid)
    const order = lesson.order
    if (typeof order !== 'number') {
      addIssue(file, lesson.lessonId, `${courseLabel}: missing numeric order`, true)
      continue
    }
    if (!orders.has(order)) orders.set(order, [])
    orders.get(order).push(lesson.lessonId)
  }
  for (const [mid, orders] of byModule) {
    for (const [order, ids] of orders) {
      if (ids.length > 1) {
        addIssue(
          mid,
          ids.join(', '),
          `${courseLabel}: duplicate order ${order} in ${mid}: ${ids.join(', ')}`,
          true
        )
      }
    }
  }
}

/**
 * @param {string} name
 * @param {Set<string>} curriculumIds
 * @param {Map<string, { moduleId: string }>} curriculumModules
 * @param {{ lesson: object, file: string }[]} loaded
 * @param {{ requirePractice: boolean, practiceShape: 'python' | 'studio' }} opts
 */
function auditCourse(name, curriculumIds, curriculumModules, loaded, opts) {
  const contentIds = new Set(loaded.map((x) => x.lesson.lessonId))

  for (const id of curriculumIds) {
    if (!contentIds.has(id)) {
      addIssue('curriculum', id, `${name}: curriculum lesson missing content file`, true)
    }
  }

  for (const { lesson, file } of loaded) {
    if (opts.requirePractice && !lesson.practiceTask) {
      addIssue(file, lesson.lessonId, 'missing practiceTask', true)
    } else if (!opts.requirePractice && !lesson.practiceTask) {
      addIssue(file, lesson.lessonId, 'no practiceTask (informational)', false)
    }
    auditLesson(lesson, file, curriculumIds, curriculumModules, {
      practiceShape: opts.practiceShape,
    })
  }

  checkOrderUniqueness(loaded, name)

  return {
    name,
    curriculumCount: curriculumIds.size,
    contentCount: loaded.length,
    quizQuestions: loaded.reduce(
      (n, { lesson }) => n + (lesson.quiz?.questions?.length || 0),
      0
    ),
    withPractice: loaded.filter(({ lesson }) => lesson.practiceTask).length,
    emptyVideo: loaded.filter(
      ({ lesson }) => !lesson.videoUrl || !String(lesson.videoUrl).trim()
    ).length,
    comingSoon: loaded.filter(({ lesson }) => lesson.comingSoon).length,
  }
}

function writeReport(courseStats) {
  const blocking = issues.filter((i) => i.blocking)
  const soft = issues.filter((i) => !i.blocking)
  const totalLessons = courseStats.reduce((n, c) => n + c.contentCount, 0)

  /** @type {Record<string, number>} */
  const categories = {}
  for (const i of issues) {
    let key = i.problem
    key = key.replace(/theory\.sections\[\d+] content too short \(\d+ < \d+\)/, 'theory section too short')
    key = key.replace(/quiz\.questions\[\d+] /, 'quiz: ')
    key = key.replace(/placeholder text: "[^"]+"/, 'placeholder text')
    key = key.replace(/practiceTask\.examples need ≥\d+ \(has \d+\)/, 'practiceTask.examples too few')
    key = key.replace(/practiceTask\.hints need ≥\d+ \(has \d+\)/, 'practiceTask.hints too few')
    categories[key] = (categories[key] || 0) + 1
  }

  const lines = []
  lines.push('# Content inventory — SmartCode Academy (EN)')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push('## Summary by course')
  lines.push('')
  lines.push(
    '| Course | Curriculum | Content | Quiz Qs | With practice | Empty videoUrl | comingSoon |'
  )
  lines.push('|---|---:|---:|---:|---:|---:|---:|')
  for (const c of courseStats) {
    lines.push(
      `| ${c.name} | ${c.curriculumCount} | ${c.contentCount} | ${c.quizQuestions} | ${c.withPractice} | ${c.emptyVideo} | ${c.comingSoon} |`
    )
  }
  lines.push('')
  lines.push(
    `**Totals:** ${totalLessons} lessons, ${issues.length} problems (${blocking.length} blocking, ${soft.length} informational).`
  )
  lines.push('')
  lines.push('## Issue categories')
  lines.push('')
  lines.push('| Count | Category |')
  lines.push('|---:|---|')
  for (const [key, n] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
    lines.push(`| ${n} | ${key} |`)
  }
  lines.push('')

  if (blocking.length) {
    lines.push('## Blocking issues')
    lines.push('')
    for (const i of blocking) {
      lines.push(`- \`${i.file}\` — \`${i.lessonId}\` — ${i.problem}`)
    }
    lines.push('')
  }

  if (soft.length) {
    lines.push('## Informational')
    lines.push('')
    for (const i of soft) {
      lines.push(`- \`${i.file}\` — \`${i.lessonId}\` — ${i.problem}`)
    }
    lines.push('')
  }

  if (!issues.length) {
    lines.push('No issues found.')
    lines.push('')
  }

  const outPath = path.join(root, 'docs/agents/reports/content-inventory.md')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8')
  return { outPath, totalLessons, blocking: blocking.length, soft: soft.length }
}

async function main() {
  const pyIds = curriculumLessonIds('src/lib/pythonCurriculum.js')
  const robloxIds = curriculumLessonIds('src/lib/robloxCurriculum.js')
  const aiIds = curriculumLessonIds('src/lib/aiAtWorkCurriculum.js')

  const pyMods = curriculumModuleMeta('src/lib/pythonCurriculum.js')
  const robloxMods = curriculumModuleMeta('src/lib/robloxCurriculum.js')
  const aiMods = curriculumModuleMeta('src/lib/aiAtWorkCurriculum.js')

  console.log('Loading Python lessons...')
  const pyLoaded = await loadPythonLessons()
  console.log('Loading Roblox lessons...')
  const robloxLoaded = await loadModuleDirLessons('src/lib/robloxLessonContent/en')
  console.log('Loading AI at Work lessons...')
  const aiLoaded = await loadModuleDirLessons('src/lib/aiAtWorkLessonContent/en')

  const courseStats = [
    auditCourse('Python', pyIds, pyMods, pyLoaded, {
      requirePractice: true,
      practiceShape: 'python',
    }),
    auditCourse('Roblox', robloxIds, robloxMods, robloxLoaded, {
      requirePractice: false,
      practiceShape: 'studio',
    }),
    auditCourse('AI at Work', aiIds, aiMods, aiLoaded, {
      requirePractice: false,
      practiceShape: 'studio',
    }),
  ]

  const { outPath, totalLessons, blocking, soft } = writeReport(courseStats)

  console.log('')
  console.log('Course summary:')
  for (const c of courseStats) {
    console.log(
      `  ${c.name}: curriculum=${c.curriculumCount} content=${c.contentCount} quizQs=${c.quizQuestions} practice=${c.withPractice}`
    )
  }
  console.log('')
  console.log(
    `${totalLessons} lessons, ${blocking + soft} problems, of which ${blocking} blocking.`
  )
  console.log(`Report: ${rel(outPath)}`)

  // Console list of blocking (cap for readability)
  const blockingIssues = issues.filter((i) => i.blocking)
  const show = blockingIssues.slice(0, 40)
  for (const i of show) {
    console.log(`  ${i.file} — ${i.lessonId} — ${i.problem}`)
  }
  if (blockingIssues.length > show.length) {
    console.log(`  … and ${blockingIssues.length - show.length} more (see report)`)
  }

  process.exit(blocking > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(2)
})
