/**
 * Logic audit: wired UK/EN lessons, export names, placeholders, EN/UK hybrids.
 * Run: node scripts/audit-python-logic.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../src/lib/lessonContent')
const enDir = path.join(root, 'en')

const PLACEHOLDER_UK = /Вивчити основні концепції|Застосувати знання на практиці|Розв'язати практичні задачі/
const HYBRID = /[A-Za-z]{3,}[а-яіїєґА-ЯІЇЄҐ]|[а-яіїєґА-ЯІЇЄҐ]{2,}[A-Za-z]{3,}/
const BROKEN_CONTENT = /content: ``/
const ESCAPED_INLINE = /\\\\`[^`]+\\\\`/

function listLessons(dir) {
  return fs.readdirSync(dir).filter((f) => /^lesson-.*\.js$/.test(f))
}

function parseExportName(text, file) {
  const m = text.match(/export const (lesson_[\w]+)\s*=/)
  if (!m) return { error: 'no-export' }
  const expected = file.replace('.js', '').replace(/-/g, '_')
  const name = m[1]
  if (name !== expected) return { error: 'export-mismatch', got: name, expected }
  return { name }
}

function parseLessonId(text) {
  const m = text.match(/lessonId:\s*["']([^"']+)["']/)
  return m ? m[1] : null
}

function scanContent(text, lang) {
  const issues = []
  if (BROKEN_CONTENT.test(text)) issues.push('broken-content-template')
  if (ESCAPED_INLINE.test(text)) issues.push('escaped-inline-code')
  if (PLACEHOLDER_UK.test(text)) issues.push('placeholder-objectives')
  if (lang === 'uk' && HYBRID.test(text)) {
    const samples = [...text.matchAll(new RegExp(HYBRID.source, 'g'))].slice(0, 3).map((x) => x[0])
    issues.push(`hybrid:${samples.join('|')}`)
  }
  return issues
}

function loadWiredIds(mapPath) {
  const t = fs.readFileSync(mapPath, 'utf8')
  const ids = [...t.matchAll(/"(lesson-[^"]+)":/g)].map((m) => m[1])
  return new Set(ids)
}

const ukMap = path.join(__dirname, '../src/lib/lessonContentMap.uk.js')
const enMap = path.join(__dirname, '../src/lib/lessonContentMap.en.js')
const wiredUk = loadWiredIds(ukMap)
const wiredEn = loadWiredIds(enMap)

console.log('=== Wired lesson IDs ===')
console.log(`UK map: ${wiredUk.size}, EN map: ${wiredEn.size}`)
const onlyUkMap = [...wiredUk].filter((id) => !wiredEn.has(id))
const onlyEnMap = [...wiredEn].filter((id) => !wiredUk.has(id))
if (onlyUkMap.length) console.log('Only in UK map:', onlyUkMap.join(', '))
if (onlyEnMap.length) console.log('Only in EN map:', onlyEnMap.join(', '))

function auditDir(dir, lang, wired) {
  const files = listLessons(dir)
  const orphans = files.filter((f) => {
    const id = f.replace('.js', '')
    return !wired.has(id)
  })
  console.log(`\n=== ${lang.toUpperCase()} files on disk: ${files.length}, orphans (not in map): ${orphans.length} ===`)
  if (orphans.length) console.log(orphans.join(', '))

  const problems = []
  for (const f of files.sort()) {
    const fp = path.join(dir, f)
    const text = fs.readFileSync(fp, 'utf8')
    const fileIssues = []
    const exp = parseExportName(text, f)
    if (exp.error) fileIssues.push(exp.error + (exp.got ? `(${exp.got}!=${exp.expected})` : ''))
    const lessonId = parseLessonId(text)
    const stem = f.replace('.js', '')
    if (lessonId && lessonId !== stem) fileIssues.push(`lessonId:${lessonId}!=${stem}`)
    fileIssues.push(...scanContent(text, lang))
    if (fileIssues.length) problems.push({ f, fileIssues })
  }
  return problems
}

const ukProblems = auditDir(root, 'uk', wiredUk)
const enProblems = auditDir(enDir, 'en', wiredEn)

function printProblems(label, problems) {
  console.log(`\n=== ${label} content issues (${problems.length} files) ===`)
  for (const { f, fileIssues } of problems) {
    console.log(f, fileIssues.join(', '))
  }
}

printProblems('UK', ukProblems)
printProblems('EN', enProblems)

// Title parity for wired pairs
console.log('\n=== Title mismatch (wired pairs) ===')
let titleMismatch = 0
for (const id of [...wiredUk].filter((x) => wiredEn.has(x)).sort()) {
  const ukF = path.join(root, `${id}.js`)
  const enF = path.join(enDir, `${id}.js`)
  if (!fs.existsSync(ukF) || !fs.existsSync(enF)) continue
  const ukT = fs.readFileSync(ukF, 'utf8').match(/title:\s*["']([^"']+)["']/)?.[1]
  const enT = fs.readFileSync(enF, 'utf8').match(/title:\s*["']([^"']+)["']/)?.[1]
  const ukSecs = (fs.readFileSync(ukF, 'utf8').match(/title:\s*"/g) || []).length
  const enSecs = (fs.readFileSync(enF, 'utf8').match(/title:\s*"/g) || []).length
  if (ukSecs !== enSecs) {
    console.log(id, `sections~${ukSecs} vs ${enSecs}`)
    titleMismatch++
  }
}
if (!titleMismatch) console.log('(section title counts match for all wired pairs)')
