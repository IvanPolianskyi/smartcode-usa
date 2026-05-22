/**
 * Generates uk/moduleXX-lessons.js from rich EN module files.
 * Uses MyMemory API with disk cache. Run: node scripts/gen-roblox-lessons-uk.mjs
 * Options: --module=02  --dry-run  --force
 */
import fs from 'fs'
import path from 'path'
import vm from 'vm'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const contentDir = path.join(root, 'src/lib/robloxLessonContent')
const ukDir = path.join(contentDir, 'uk')
const cachePath = path.join(__dirname, '.uk-translation-cache.json')

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const force = args.includes('--force')
const moduleArg = args.find((a) => a.startsWith('--module='))
const onlyModule = moduleArg ? moduleArg.split('=')[1].padStart(2, '0') : null

const DELAY_MS = 400
const MAX_CHUNK = 420

let cache = {}
if (fs.existsSync(cachePath) && !force) {
  cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'))
}

function saveCache() {
  if (!dryRun) fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2))
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function translateChunk(text) {
  const key = `en|uk::${text}`
  if (cache[key]) return cache[key]

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|uk`
  const res = await fetch(url)
  const json = await res.json()
  if (json.quotaFinished) {
    throw new Error('MyMemory quota finished — rerun later or use --force after clearing cache')
  }
  const out = json.responseData?.translatedText || text
  cache[key] = out
  saveCache()
  await sleep(DELAY_MS)
  return out
}

/** Split markdown-ish text; keep ``` fences and `inline` intact */
function splitProtected(text) {
  const parts = []
  const re = /```[\s\S]*?```|`[^`]+`/g
  let last = 0
  let m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ t: text.slice(last, m.index), translate: true })
    parts.push({ t: m[0], translate: false })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push({ t: text.slice(last), translate: true })
  if (parts.length === 0) parts.push({ t: text, translate: true })
  return parts
}

function cleanupUk(text) {
  return text
    .replace(/\* \*/g, '**')
    .replace(/ \*\*/g, ' **')
    .replace(/\*\* /g, '** ')
    .replace(/обов 'язков/g, "обов'язков")
    .replace(/(\p{L}) '(\p{L})/gu, "$1'$2")
    .replace(/  +/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
}

async function translateText(text) {
  if (!text || typeof text !== 'string') return text
  if (!text.trim()) return text

  const parts = splitProtected(text)
  let result = ''
  for (const part of parts) {
    if (!part.translate) {
      result += part.t
      continue
    }
    let chunk = part.t
    while (chunk.length > MAX_CHUNK) {
      const cut = chunk.lastIndexOf('\n', MAX_CHUNK)
      const at = cut > 80 ? cut : MAX_CHUNK
      const piece = chunk.slice(0, at)
      result += await translateChunk(piece)
      chunk = chunk.slice(at)
    }
    if (chunk) result += await translateChunk(chunk)
  }
  return cleanupUk(result)
}

const SKIP_KEYS = new Set([
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

async function translateValue(key, val) {
  if (SKIP_KEYS.has(key)) return val
  if (typeof val === 'string') return translateText(val)
  if (Array.isArray(val)) {
    const out = []
    for (let i = 0; i < val.length; i++) {
      const item = val[i]
      if (typeof item === 'string') out.push(await translateText(item))
      else if (typeof item === 'object' && item !== null) out.push(await translateObject(item))
      else out.push(item)
    }
    return out
  }
  if (typeof val === 'object' && val !== null) return translateObject(val)
  return val
}

async function translateObject(obj) {
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    out[k] = await translateValue(k, v)
  }
  return out
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
  const entries = Object.entries(val)
  const lines = entries.map(([k, v]) => {
    const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k)
    return `${sp2}${key}: ${serializeValue(v, indent + 2)}`
  })
  return `{\n${lines.join(',\n')},\n${sp}}`
}

function loadCurriculumTitles() {
  const curPath = path.join(root, 'src/lib/robloxCurriculum.js')
  const raw = fs.readFileSync(curPath, 'utf8')
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
  code = code.replace(
    /const MC = QUIZ_QUESTION_TYPES\.MULTIPLE_CHOICE/,
    'const MC = "multiple_choice"'
  )
  code = code.replace(/export const (enLesson\w+) =/g, 'exports.$1 =')
  const sandbox = { exports: {} }
  vm.runInNewContext(code, sandbox, { filename: enPath })
  return Object.entries(sandbox.exports).filter(([k]) => k.startsWith('enLesson'))
}

async function processModule(modNum) {
  const pad = String(modNum).padStart(2, '0')
  const enPath = path.join(contentDir, 'en', `module${pad}-lessons.js`)
  if (!fs.existsSync(enPath)) {
    console.warn(`Skip module ${pad} — no ${enPath}`)
    return
  }

  const exports = loadEnModule(enPath)
  if (exports.length === 0) {
    console.warn(`No enLesson exports in module ${pad}`)
    return
  }

  console.log(`\nModule ${pad}: ${exports.length} lessons`)
  const ukExports = []

  for (const [enName, enLesson] of exports) {
    const ukName = enName.replace(/^en/, 'uk')
    process.stdout.write(`  ${enName} → ${ukName}… `)
    const translated = await translateObject(enLesson)
    if (ukTitles[translated.lessonId]) translated.title = ukTitles[translated.lessonId]
    delete translated.comingSoon
    ukExports.push({ ukName, lesson: translated })
    console.log('ok')
  }

  const header = `/** Rich UK content for Roblox Module ${pad} — AUTO from EN via gen-roblox-lessons-uk.mjs */\nimport { QUIZ_QUESTION_TYPES } from '../../courseData'\n\nconst MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE\n\n`
  const body = ukExports
    .map(({ ukName, lesson }) => `export const ${ukName} = ${serializeValue(lesson, 0)}`)
    .join('\n\n')
  const outPath = path.join(ukDir, `module${pad}-lessons.js`)

  if (dryRun) {
    console.log(`[dry-run] would write ${outPath}`)
    return
  }

  fs.mkdirSync(ukDir, { recursive: true })
  fs.writeFileSync(outPath, header + body + '\n', 'utf8')
  console.log(`Written ${outPath}`)
}

async function main() {
  const modules = onlyModule
    ? [Number(onlyModule)]
    : Array.from({ length: 12 }, (_, i) => i + 1)

  for (const n of modules) {
    await processModule(n)
  }
  console.log('\nDone. Run: node scripts/wire-roblox-lessons-uk.mjs')
}

main().catch((e) => {
  console.error(e)
  saveCache()
  process.exit(1)
})
