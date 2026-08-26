/**
 * Translate Ukrainian lesson content to English into lessonContent/en/.
 * Usage: node scripts/translate-lesson-uk-en.mjs [stem...]
 * Default: all lesson-*.js in lessonContent/
 */
import fs from 'fs'
import path from 'path'

const CYRILLIC = /[\u0400-\u04FF]/
const cache = new Map()
const MAX_CHUNK = 1500

const STEMS =
  process.argv.length > 2
    ? process.argv.slice(2)
    : fs
        .readdirSync('src/lib/lessonContent')
        .filter((f) => /^lesson-.*\.js$/.test(f))
        .map((f) => f.replace(/\.js$/, ''))
        .sort()

async function translateChunk(text) {
  if (!CYRILLIC.test(text)) return text
  if (cache.has(text)) return cache.get(text)

  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=uk&tl=en&dt=t&q=' +
    encodeURIComponent(text)

  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const translated = data[0].map((part) => part[0]).join('')
      cache.set(text, translated)
      await new Promise((r) => setTimeout(r, 400))
      return translated
    } catch (e) {
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)))
      if (attempt === 3) throw e
    }
  }
  return text
}

/** Split long text on blank lines / newlines while keeping Cyrillic chunks. */
async function translateText(text) {
  if (!CYRILLIC.test(text)) return text
  if (text.length <= MAX_CHUNK) return translateChunk(text)

  const parts = text.split(/(\n\n+)/)
  const out = []
  let buf = ''

  async function flush() {
    if (!buf) return
    if (CYRILLIC.test(buf)) out.push(await translateChunk(buf))
    else out.push(buf)
    buf = ''
  }

  for (const part of parts) {
    if ((buf + part).length > MAX_CHUNK && buf) await flush()
    if (part.length > MAX_CHUNK && CYRILLIC.test(part)) {
      await flush()
      const lines = part.split(/(\n)/)
      let lineBuf = ''
      for (const line of lines) {
        if ((lineBuf + line).length > MAX_CHUNK && lineBuf) {
          out.push(await translateChunk(lineBuf))
          lineBuf = ''
        }
        lineBuf += line
      }
      if (lineBuf) {
        out.push(CYRILLIC.test(lineBuf) ? await translateChunk(lineBuf) : lineBuf)
      }
    } else {
      buf += part
    }
  }
  await flush()
  return out.join('')
}

function extractStringLiterals(content) {
  const segments = []
  const re = /(`(?:\\`|[^`])*`|"(?:\\"|[^"])*"|'(?:\\'|[^'])*')/gs
  let m
  while ((m = re.exec(content)) !== null) {
    const raw = m[0]
    const inner = raw.slice(1, -1)
    if (CYRILLIC.test(inner)) {
      segments.push({ start: m.index, end: m.index + raw.length, raw, inner })
    }
  }
  return segments
}

function escapeForQuote(translated, quote) {
  if (quote === '`') {
    return translated.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
  }
  if (quote === '"') {
    return translated.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  }
  return translated.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
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
  segments.sort((a, b) => b.start - a.start)

  for (const seg of segments) {
    const translated = await translateText(seg.inner)
    const quote = seg.raw[0]
    const newRaw = quote + escapeForQuote(translated, quote) + quote
    content = content.slice(0, seg.start) + newRaw + content.slice(seg.end)
  }

  fs.writeFileSync(destPath, content, 'utf8')
  return { stem, segments: segments.length, remaining: (content.match(/[\u0400-\u04FF]/g) || []).length }
}

async function main() {
  fs.mkdirSync('src/lib/lessonContent/en', { recursive: true })
  const results = []
  const failures = []

  console.log(`Translating ${STEMS.length} lessons...`)
  for (const stem of STEMS) {
    try {
      const r = await translateFile(stem)
      results.push(r)
      console.log(`OK ${stem} (strings=${r.segments}, cyrillicLeft=${r.remaining})`)
    } catch (e) {
      failures.push({ stem, error: e.message })
      console.error(`FAIL ${stem}: ${e.message}`)
    }
  }

  console.log('\n--- Summary ---')
  console.log(`Translated: ${results.length}`)
  console.log(`Failed: ${failures.length}`)
  const stillCyr = results.filter((r) => r.remaining > 0)
  console.log(`With remaining Cyrillic: ${stillCyr.length}`)
  if (failures.length) failures.forEach((f) => console.log(`  ${f.stem}: ${f.error}`))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
