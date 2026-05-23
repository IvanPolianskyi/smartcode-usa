/**
 * Translate Ukrainian lesson content strings to English.
 * Preserves code structure, exports, and non-Cyrillic strings.
 */
import fs from 'fs'
import path from 'path'

const DEFAULT_STEMS = [
  'lesson-05-5', 'lesson-06-4', 'lesson-07-1', 'lesson-07-2', 'lesson-07-3', 'lesson-07-4',
  'lesson-08-1', 'lesson-08-2', 'lesson-08-3', 'lesson-08-4', 'lesson-08-5', 'lesson-08-6',
  'lesson-09-1', 'lesson-09-2', 'lesson-09-3', 'lesson-09-4',
]
const STEMS = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_STEMS

const CYRILLIC = /[\u0400-\u04FF]/
const cache = new Map()

async function translateText(text) {
  if (!CYRILLIC.test(text)) return text
  if (cache.has(text)) return cache.get(text)

  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=uk&tl=en&dt=t&q=' +
    encodeURIComponent(text)

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Translate HTTP ${res.status}`)
  const data = await res.json()
  const translated = data[0].map((part) => part[0]).join('')
  cache.set(text, translated)
  await new Promise((r) => setTimeout(r, 120))
  return translated
}

/** Split content into translatable segments (outside template/code may still have UA in strings) */
function extractStringLiterals(content) {
  const segments = []
  const re =
    /(`(?:\\`|[^`])*`|"(?:\\"|[^"])*"|'(?:\\'|[^'])*')/gs
  let m
  while ((m = re.exec(content)) !== null) {
    const raw = m[0]
    const inner =
      raw[0] === '`' ? raw.slice(1, -1) : raw.slice(1, -1)
    if (CYRILLIC.test(inner)) {
      segments.push({ start: m.index, end: m.index + raw.length, raw, inner })
    }
  }
  return segments
}

async function translateFile(stem) {
  const srcPath = path.join('src/lib/lessonContent', `${stem}.js`)
  const destPath = path.join('src/lib/lessonContent/en', `${stem}.js`)
  let content = fs.readFileSync(srcPath, 'utf8')

  content = content.replace(
    "import { QUIZ_QUESTION_TYPES } from '../courseData'",
    "import { QUIZ_QUESTION_TYPES } from '../../courseData'"
  )

  const segments = extractStringLiterals(content)
  // Process longest first to avoid partial overlaps (sorted by start desc)
  segments.sort((a, b) => b.start - a.start)

  for (const seg of segments) {
    const translated = await translateText(seg.inner)
    const quote = seg.raw[0]
    let escaped = translated
    if (quote === '`') {
      escaped = translated.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')
    } else if (quote === '"') {
      escaped = translated.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    } else {
      escaped = translated.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    }
    const newRaw = quote + escaped + quote
    content = content.slice(0, seg.start) + newRaw + content.slice(seg.end)
  }

  fs.writeFileSync(destPath, content, 'utf8')
  return { stem, segments: segments.length }
}

async function main() {
  fs.mkdirSync('src/lib/lessonContent/en', { recursive: true })
  const results = []
  const failures = []

  for (const stem of STEMS) {
    try {
      const r = await translateFile(stem)
      results.push(r)
      console.log(`OK ${stem} (${r.segments} strings)`)
    } catch (e) {
      failures.push({ stem, error: e.message })
      console.error(`FAIL ${stem}: ${e.message}`)
    }
  }

  console.log('\n--- Summary ---')
  console.log(`Translated: ${results.length}`)
  console.log(`Failed: ${failures.length}`)
  if (failures.length) {
    failures.forEach((f) => console.log(`  ${f.stem}: ${f.error}`))
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
