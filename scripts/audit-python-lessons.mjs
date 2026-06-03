/**
 * Quick audit: UK/EN lesson parity, zero-width spaces, em/en dashes.
 * Run: node scripts/audit-python-lessons.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../src/lib/lessonContent')
const enDir = path.join(root, 'en')

const EM = '\u2014'
const EN_DASH = '\u2013'
const ZW = /\u200B|\uFEFF| \u200B/g

function listLessons(dir) {
  return fs.readdirSync(dir).filter((f) => /^lesson-.*\.js$/.test(f))
}

function scanFile(fp) {
  const t = fs.readFileSync(fp, 'utf8')
  const issues = []
  let em = 0
  let en = 0
  let zw = 0
  for (const ch of t) {
    if (ch === EM) em++
    if (ch === EN_DASH) en++
  }
  zw = (t.match(ZW) || []).length + (t.match(/ ​​/g) || []).length
  if (em) issues.push(`em-dash:${em}`)
  if (en) issues.push(`en-dash:${en}`)
  if (zw) issues.push(`zero-width:${zw}`)
  // Obvious UK artifact: Polish language confusion
  if (/Польськ|польськ(?!а мова)/i.test(t)) issues.push('polish-word')
  if (/корабл|Ship Game/i.test(t)) issues.push('ship-translation')
  return issues
}

const ukFiles = listLessons(root)
const enFiles = listLessons(enDir)
const ukSet = new Set(ukFiles)
const enSet = new Set(enFiles)

console.log('=== File parity ===')
console.log(`UK: ${ukFiles.length}, EN: ${enFiles.length}`)
const onlyUk = ukFiles.filter((f) => !enSet.has(f))
const onlyEn = enFiles.filter((f) => !ukSet.has(f))
if (onlyUk.length) console.log('Only UK:', onlyUk.join(', '))
if (onlyEn.length) console.log('Only EN:', onlyEn.join(', '))

console.log('\n=== Issues in UK lessons ===')
let ukIssueCount = 0
for (const f of ukFiles.sort()) {
  const issues = scanFile(path.join(root, f))
  if (issues.length) {
    console.log(f, issues.join(', '))
    ukIssueCount++
  }
}

console.log('\n=== Issues in EN lessons ===')
let enIssueCount = 0
for (const f of enFiles.sort()) {
  const issues = scanFile(path.join(enDir, f))
  if (issues.length) {
    console.log(f, issues.join(', '))
    enIssueCount++
  }
}

console.log(`\nFiles with issues: UK ${ukIssueCount}, EN ${enIssueCount}`)
