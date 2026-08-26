/**
 * UK → EN content pipeline for lesson files, in two passes.
 *
 *   extract  — pull translatable strings out of the lesson JS into flat JSON
 *              chunks that a translator (Cursor) can edit safely.
 *   inject   — splice the translated strings back into the JS via AST offsets
 *              and verify the result still parses.
 *
 * The translator never sees or edits JavaScript, so code samples inside lesson
 * content cannot be damaged. Strings are keyed by a hash of the source text,
 * so duplicates collapse to one unit of work and order does not matter.
 *
 * Only string values under whitelisted keys are extracted, and only when they
 * contain Cyrillic — identifiers, URLs, code and already-English options like
 * "True"/"False" are never touched.
 *
 *   node scripts/translate-content.mjs extract \
 *     --src src/lib/robloxLessonContent/uk --out i18n-work/roblox
 *
 *   node scripts/translate-content.mjs inject \
 *     --src src/lib/robloxLessonContent/uk --translations i18n-work/roblox \
 *     --out src/lib/robloxLessonContent/en
 *
 *   node scripts/translate-content.mjs stats --src <dir>
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import * as acorn from 'acorn'

/** Char budget per chunk file — sized so one chunk is a comfortable single task. */
const CHUNK_CHARS = 12000

/** Keys whose string values are prose meant for the learner. */
const TRANSLATE_KEYS = new Set([
  'title',
  'content',
  'description',
  'summary',
  'question',
  'explanation',
  'learningObjectives',
  'hints',
  'mistake',
  'correctApproach',
  'fix',
  'problemStatement',
  'outputFormat',
  'optionalChallenge',
  'options',
  'label',
  'lessonsLabel',
  'name',
])

/** Keys that must never be touched even if they hold Cyrillic. */
const NEVER_TRANSLATE = new Set([
  'code',
  'solution',
  'input',
  'output',
  'id',
  'lessonId',
  'moduleId',
  'courseId',
  'type',
  'videoUrl',
  'url',
  'difficulty',
  'correctAnswer',
  'prerequisites',
  'sound',
  'music',
  'imageUrl',
])

const CYRILLIC = /[Ѐ-ӿ]/

function parseArgs() {
  const [mode, ...rest] = process.argv.slice(2)
  const out = { mode }
  for (let i = 0; i < rest.length; i++) {
    const key = rest[i]
    if (key === '--src') out.src = rest[++i]
    else if (key === '--out') out.out = rest[++i]
    else if (key === '--translations') out.translations = rest[++i]
    else if (key === '--chunk') out.chunk = Number(rest[++i])
  }
  return out
}

/** Collect translatable string segments with their exact source ranges. */
function collectSegments(source) {
  const ast = acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' })
  const segments = []

  function keyName(node) {
    if (!node) return null
    if (node.type === 'Identifier') return node.name
    if (node.type === 'Literal') return String(node.value)
    return null
  }

  function pushString(node) {
    if (node.type === 'Literal' && typeof node.value === 'string') {
      if (!CYRILLIC.test(node.value)) return
      segments.push({ start: node.start, end: node.end, text: node.value, kind: 'string' })
      return
    }
    if (node.type === 'TemplateLiteral') {
      for (const quasi of node.quasis) {
        const value = quasi.value.cooked ?? quasi.value.raw
        if (!CYRILLIC.test(value)) continue
        segments.push({ start: quasi.start, end: quasi.end, text: value, kind: 'template' })
      }
      for (const expr of node.expressions) walk(expr, null)
    }
  }

  function walk(node, activeKey) {
    if (!node || typeof node.type !== 'string') return

    if (node.type === 'Property' || node.type === 'PropertyDefinition') {
      const key = keyName(node.key)
      if (key && NEVER_TRANSLATE.has(key)) return
      walk(node.value, key && TRANSLATE_KEYS.has(key) ? key : null)
      return
    }

    if (activeKey) {
      if (node.type === 'Literal' || node.type === 'TemplateLiteral') {
        pushString(node)
        return
      }
      if (node.type === 'ArrayExpression') {
        for (const el of node.elements) walk(el, activeKey)
        return
      }
      if (node.type === 'ObjectExpression') {
        for (const prop of node.properties) walk(prop, null)
        return
      }
    }

    for (const key of Object.keys(node)) {
      if (key === 'start' || key === 'end' || key === 'type') continue
      const child = node[key]
      if (Array.isArray(child)) {
        for (const item of child) {
          if (item && typeof item.type === 'string') walk(item, activeKey)
        }
      } else if (child && typeof child.type === 'string') {
        walk(child, activeKey)
      }
    }
  }

  walk(ast, null)
  segments.sort((a, b) => a.start - b.start)
  return segments
}

function escapeTemplate(text) {
  return text.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function renderSegment(segment, translated) {
  return segment.kind === 'template' ? escapeTemplate(translated) : JSON.stringify(translated)
}

function hashText(text) {
  return crypto.createHash('sha256').update(text).digest('hex').slice(0, 16)
}

async function listSourceFiles(src) {
  const stat = await fs.stat(src)
  if (stat.isFile()) return [src]
  const entries = await fs.readdir(src, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile() && /\.m?js$/.test(e.name))
    .map((e) => path.join(src, e.name))
    .sort()
}

async function readAllSegments(files) {
  const perFile = []
  for (const file of files) {
    const source = await fs.readFile(file, 'utf8')
    perFile.push({ file, source, segments: collectSegments(source) })
  }
  return perFile
}

async function runExtract(options) {
  const files = await listSourceFiles(options.src)
  const perFile = await readAllSegments(files)
  const chunkChars = options.chunk || CHUNK_CHARS

  // Dedupe by content hash — identical strings become one unit of work.
  const unique = new Map()
  for (const entry of perFile) {
    for (const segment of entry.segments) {
      const key = hashText(segment.text)
      if (!unique.has(key)) unique.set(key, segment.text)
    }
  }

  await fs.mkdir(options.out, { recursive: true })

  // Clear stale chunks so a re-extract never leaves orphans behind.
  for (const name of await fs.readdir(options.out).catch(() => [])) {
    if (/^part-\d+\.json$/.test(name) || name === 'manifest.json') {
      await fs.unlink(path.join(options.out, name))
    }
  }

  const chunks = []
  let current = {}
  let size = 0

  for (const [key, text] of unique) {
    if (size > 0 && size + text.length > chunkChars) {
      chunks.push(current)
      current = {}
      size = 0
    }
    current[key] = text
    size += text.length
  }
  if (size > 0) chunks.push(current)

  for (let i = 0; i < chunks.length; i++) {
    const name = `part-${String(i + 1).padStart(3, '0')}.json`
    await fs.writeFile(
      path.join(options.out, name),
      `${JSON.stringify(chunks[i], null, 2)}\n`,
      'utf8'
    )
  }

  const totalChars = [...unique.values()].reduce((sum, t) => sum + t.length, 0)
  await fs.writeFile(
    path.join(options.out, 'manifest.json'),
    `${JSON.stringify(
      {
        src: options.src,
        files: files.map((f) => path.basename(f)),
        uniqueSegments: unique.size,
        totalChars,
        chunks: chunks.length,
      },
      null,
      2
    )}\n`,
    'utf8'
  )

  console.log(`Extracted from ${files.length} file(s)`)
  console.log(`  ${unique.size} unique strings, ${totalChars} chars`)
  console.log(`  ${chunks.length} chunk file(s) in ${options.out}`)
  console.log(`\nTranslate the VALUES in each part-*.json. Never change a key.`)
}

async function runInject(options) {
  const files = await listSourceFiles(options.src)
  const perFile = await readAllSegments(files)

  const translations = new Map()
  const chunkNames = (await fs.readdir(options.translations)).filter((n) =>
    /^part-\d+\.json$/.test(n)
  )

  if (!chunkNames.length) {
    throw new Error(`No part-*.json found in ${options.translations}`)
  }

  for (const name of chunkNames.sort()) {
    const raw = await fs.readFile(path.join(options.translations, name), 'utf8')
    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch (error) {
      throw new Error(`${name} is not valid JSON — ${error.message}`)
    }
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value !== 'string') {
        throw new Error(`${name}: key ${key} is not a string`)
      }
      translations.set(key, value)
    }
  }

  // Refuse to write a half-translated tree — report everything missing first.
  const missing = new Map()
  for (const entry of perFile) {
    for (const segment of entry.segments) {
      const key = hashText(segment.text)
      if (!translations.has(key)) {
        const list = missing.get(path.basename(entry.file)) || []
        list.push(segment.text.slice(0, 60))
        missing.set(path.basename(entry.file), list)
      }
    }
  }

  if (missing.size) {
    console.error(`Missing translations in ${missing.size} file(s):\n`)
    for (const [file, samples] of missing) {
      console.error(`  ${file}: ${samples.length} missing`)
      for (const sample of samples.slice(0, 3)) console.error(`    "${sample}…"`)
    }
    console.error(`\nRe-run extract, or finish translating the chunk files.`)
    process.exit(1)
  }

  // Warn about anything left untranslated rather than silently shipping it.
  let untouched = 0

  await fs.mkdir(options.out, { recursive: true })

  for (const entry of perFile) {
    let output = entry.source
    for (let i = entry.segments.length - 1; i >= 0; i--) {
      const segment = entry.segments[i]
      const translated = translations.get(hashText(segment.text))
      if (translated === segment.text) untouched++
      output =
        output.slice(0, segment.start) +
        renderSegment(segment, translated) +
        output.slice(segment.end)
    }

    try {
      acorn.parse(output, { ecmaVersion: 'latest', sourceType: 'module' })
    } catch (error) {
      throw new Error(
        `${path.basename(entry.file)}: injected output is not valid JS — ${error.message}`
      )
    }

    const outPath = path.join(options.out, path.basename(entry.file))
    await fs.writeFile(outPath, output, 'utf8')
    console.log(`  ${path.basename(entry.file)}: ${entry.segments.length} segments`)
  }

  console.log(`\nWrote ${perFile.length} file(s) to ${options.out}`)
  if (untouched) {
    console.warn(`Warning: ${untouched} segment(s) are identical to the source — still Ukrainian?`)
  }
}

async function runStats(options) {
  const files = await listSourceFiles(options.src)
  const perFile = await readAllSegments(files)
  let total = 0
  let chars = 0
  for (const entry of perFile) {
    const c = entry.segments.reduce((sum, s) => sum + s.text.length, 0)
    total += entry.segments.length
    chars += c
    console.log(`  ${path.basename(entry.file)}: ${entry.segments.length} segments, ${c} chars`)
  }
  console.log(`\n${files.length} file(s), ${total} segments, ${chars} chars`)
}

async function main() {
  const options = parseArgs()

  if (options.mode === 'extract') {
    if (!options.src || !options.out) throw new Error('extract needs --src and --out')
    await runExtract(options)
  } else if (options.mode === 'inject') {
    if (!options.src || !options.translations || !options.out) {
      throw new Error('inject needs --src, --translations and --out')
    }
    await runInject(options)
  } else if (options.mode === 'stats') {
    if (!options.src) throw new Error('stats needs --src')
    await runStats(options)
  } else {
    console.error('Usage:')
    console.error('  node scripts/translate-content.mjs extract --src <dir> --out <dir>')
    console.error('  node scripts/translate-content.mjs inject --src <dir> --translations <dir> --out <dir>')
    console.error('  node scripts/translate-content.mjs stats --src <dir>')
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
