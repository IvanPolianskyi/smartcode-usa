/**
 * Translate Ukrainian lesson content to English into lessonContent/en/.
 * Uses MyMemory API (Google GTX often rate-limits).
 * Usage: node scripts/translate-lesson-uk-en-mymemory.mjs [stem...]
 */
import fs from 'fs'
import path from 'path'

const CYRILLIC = /[\u0400-\u04FF]/
const cache = new Map()
const MAX_CHUNK = 450 // MyMemory free limit ~500 chars

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
    'https://api.mymemory.translated.net/get?q=' +
    encodeURIComponent(text) +
    '&langpair=uk|en'

  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      let translated = data?.responseData?.translatedText
      if (!translated || /MYMEMORY WARNING/i.test(translated)) {
        throw new Error(translated || 'empty translation')
      }
      // MyMemory sometimes returns HTML entities
      translated = translated
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
      cache.set(text, translated)
      await new Promise((r) => setTimeout(r, 120))
      return translated
    } catch (e) {
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)))
      if (attempt === 5) throw e
    }
  }
  return text
}

async function translateText(text) {
  if (!CYRILLIC.test(text)) return text
  if (text.length <= MAX_CHUNK) return translateChunk(text)

  const parts = text.split(/(\n)/)
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
      // split long line by sentences / spaces
      const words = part.split(/(?<=[.!?])\s+|\s+/)
      let wbuf = ''
      for (const w of words) {
        if ((wbuf + ' ' + w).length > MAX_CHUNK && wbuf) {
          out.push(await translateChunk(wbuf))
          wbuf = w
        } else {
          wbuf = wbuf ? wbuf + (wbuf.endsWith('\n') ? '' : ' ') + w : w
        }
      }
      if (wbuf) out.push(CYRILLIC.test(wbuf) ? await translateChunk(wbuf) : wbuf)
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

  let i = 0
  for (const seg of segments) {
    i++
    process.stdout.write(`\r  ${stem}: ${i}/${segments.length}   `)
    const translated = await translateText(seg.inner)
    const quote = seg.raw[0]
    const newRaw = quote + escapeForQuote(translated, quote) + quote
    content = content.slice(0, seg.start) + newRaw + content.slice(seg.end)
  }
  process.stdout.write('\n')

  fs.writeFileSync(destPath, content, 'utf8')
  return { stem, segments: segments.length, remaining: (content.match(/[\u0400-\u04FF]/g) || []).length }
}

async function main() {
  fs.mkdirSync('src/lib/lessonContent/en', { recursive: true })
  const results = []
  const failures = []

  console.log(`Translating ${STEMS.length} lessons via MyMemory...`)
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
  console.log(`With remaining Cyrillic: ${results.filter((r) => r.remaining > 0).length}`)
  for (const f of failures) console.log(`  ${f.stem}: ${f.error}`)
  for (const r of results.filter((x) => x.remaining > 0)) {
    console.log(`  leftover ${r.stem}: ${r.remaining} chars`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
