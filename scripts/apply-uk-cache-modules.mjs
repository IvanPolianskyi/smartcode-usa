import fs from 'fs'
import path from 'path'
import vm from 'vm'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const contentDir = path.join(root, 'src/lib/robloxLessonContent')
const cachePath = path.join(__dirname, '.uk-translation-cache.json')

const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'))
const WARN = 'MYMEMORY WARNING'

function translateString(s) {
  if (!s || typeof s !== 'string') return s
  const key = `en|uk::${s}`
  const hit = cache[key]
  if (hit && !hit.includes(WARN)) return hit
  return s
}

const SKIP = new Set([
  'lessonId',
  'moduleId',
  'order',
  'id',
  'type',
  'correctAnswer',
  'passingScore',
  'timeLimit',
  'theoryMinutes',
  'quizMinutes',
  'estimatedTime',
  'difficulty',
])

function walk(key, val) {
  if (SKIP.has(key)) return val
  if (typeof val === 'string') return translateString(val)
  if (Array.isArray(val)) return val.map((item, i) => walk(String(i), item))
  if (val && typeof val === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(val)) out[k] = walk(k, v)
    return out
  }
  return val
}

function jsString(s) {
  if (typeof s !== 'string') return JSON.stringify(s)
  if (s.includes('\n') || (s.includes('`') && !s.includes("'"))) {
    return '`' + s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`'
  }
  return JSON.stringify(s)
}

function serializeValue(val, indent) {
  const sp = ' '.repeat(indent)
  const sp2 = ' '.repeat(indent + 2)
  if (val === null) return 'null'
  if (typeof val === 'string') return jsString(val)
  if (typeof val === 'number' || typeof val === 'boolean') return String(val)
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]'
    const items = val.map((v) => `${sp2}${serializeValue(v, indent + 2)}`).join(',\n')
    return `[\n${items},\n${sp}]`
  }
  const lines = Object.entries(val).map(([k, v]) => {
    const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k)
    return `${sp2}${key}: ${serializeValue(v, indent + 2)}`
  })
  return `{\n${lines.join(',\n')},\n${sp}}`
}

function loadCurriculumTitles() {
  const raw = fs.readFileSync(path.join(root, 'src/lib/robloxCurriculum.js'), 'utf8')
  const titles = {}
  const re = /"lessonId":\s*"(lesson-roblox-[^"]+)"[\s\S]*?"title":\s*"([^"]+)"/g
  let m
  while ((m = re.exec(raw)) !== null) titles[m[1]] = m[2]
  return titles
}

const ukTitles = loadCurriculumTitles()

function loadEnModule(enPath) {
  let code = fs.readFileSync(enPath, 'utf8')
  code = code.replace(/^import[^\n]+\n?/m, '')
  code = code.replace(/^\/\*\*[\s\S]*?\*\/\s*/m, '')
  code = code.replace(/const MC = QUIZ_QUESTION_TYPES\.MULTIPLE_CHOICE/, 'const MC = "multiple_choice"')
  code = code.replace(/export const (enLesson\w+) =/g, 'exports.$1 =')
  const sandbox = { exports: {} }
  vm.runInNewContext(code, sandbox, { filename: enPath })
  return Object.entries(sandbox.exports).filter(([k]) => k.startsWith('enLesson'))
}

let untranslated = 0
let translated = 0

function countStrings(val, isSkipKey = false) {
  if (typeof val === 'string' && !isSkipKey) {
    const key = `en|uk::${val}`
    const hit = cache[key]
    if (hit && !hit.includes(WARN)) translated++
    else untranslated++
    return
  }
  if (Array.isArray(val)) val.forEach((v) => countStrings(v))
  else if (val && typeof val === 'object') {
    for (const [k, v] of Object.entries(val)) countStrings(v, SKIP.has(k))
  }
}

for (const m of ['01', '02', '03']) {
  const pad = m
  const enPath = path.join(contentDir, 'en', `module${pad}-lessons.js`)
  const exports = loadEnModule(enPath)
  const ukExports = []

  for (const [enName, enLesson] of exports) {
    const ukName = enName.replace(/^en/, 'uk')
    const lesson = walk('', enLesson)
    if (ukTitles[lesson.lessonId]) lesson.title = ukTitles[lesson.lessonId]
    delete lesson.comingSoon
    ukExports.push({ ukName, lesson })
    countStrings(enLesson)
  }

  const header = `/** Rich UK content for Roblox Module ${pad} */\nimport { QUIZ_QUESTION_TYPES } from '../../courseData'\n\nconst MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE\n\n`
  const body = ukExports.map(({ ukName, lesson }) => `export const ${ukName} = ${serializeValue(lesson, 0)}`).join('\n\n')
  fs.writeFileSync(path.join(contentDir, 'uk', `module${pad}-lessons.js`), header + body + '\n')
  console.log(`module${pad}: written ${ukExports.length} lessons`)
}

console.log(`Cache hits: ${translated}, missing/stale: ${untranslated}`)
