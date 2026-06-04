import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../src/lib/robloxLessonContent')

function analyzeLesson(obj, source) {
  const theorySections = obj.theory?.sections?.length ?? 0
  const theoryChars = (obj.theory?.sections || []).reduce((n, s) => n + (s.content?.length || 0), 0)
  const quizCount = obj.quiz?.questions?.length ?? 0
  const hasPractice = !!obj.practiceTask
  const comingSoon = !!obj.comingSoon
  const placeholder = comingSoon || /готується|being prepared|TODO|placeholder/i.test(
    JSON.stringify(obj.theory?.sections || [])
  )
  return { theorySections, theoryChars, quizCount, hasPractice, comingSoon, placeholder, source }
}

function scanFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const lines = text.split('\n').length
  const idMatch = text.match(/lessonId:\s*["']([^"']+)["']/)
  const comingSoon = /comingSoon:\s*true/.test(text)
  const sections = (text.match(/title:\s*["'`]/g) || []).length
  const quizQs = (text.match(/id:\s*["']q\d/g) || []).length
  const hasPractice = /practiceTask:\s*\{/.test(text)
  const placeholder = comingSoon || /готується|being prepared|createPlaceholder/i.test(text)
  const theoryBlocks = (text.match(/theory:\s*\{[\s\S]*?sections:/g) || []).length
  return {
    file: path.basename(filePath),
    lessonId: idMatch?.[1] || '?',
    lines,
    sections,
    quizQs,
    hasPractice,
    comingSoon,
    placeholder,
  }
}

// Legacy flat files
const legacy = fs.readdirSync(root).filter((f) => /^lesson-roblox-.*\.js$/.test(f))
const legacyStats = legacy.map((f) => scanFile(path.join(root, f))).sort((a, b) => a.lines - b.lines)

// UK module bundles
const ukDir = path.join(root, 'uk')
const ukModules = fs.readdirSync(ukDir).filter((f) => /^module\d+-lessons\.js$/.test(f))

console.log('=== LEGACY lesson-roblox-*.js (root) ===')
console.log(`Count: ${legacyStats.length}`)
const legacySparse = legacyStats.filter((r) => r.lines < 200 || r.quizQs < 3 || r.placeholder)
console.log(`Sparse (<200 lines OR <3 quiz OR placeholder): ${legacySparse.length}`)
console.log('\nThinnest 15:')
legacySparse.slice(0, 15).forEach((r) => {
  console.log(`  ${r.lessonId} ${r.file} lines:${r.lines} quiz:${r.quizQs} practice:${r.hasPractice} placeholder:${r.placeholder}`)
})

const legacyOk = legacyStats.filter((r) => !r.placeholder && r.lines >= 200 && r.quizQs >= 3)
console.log(`\nSolid (200+ lines, 3+ quiz, not placeholder): ${legacyOk.length}/${legacyStats.length}`)

console.log('\n=== UK module*.js bundles ===')
for (const f of ukModules.sort()) {
  const text = fs.readFileSync(path.join(ukDir, f), 'utf8')
  const lines = text.split('\n').length
  const exports = (text.match(/export const lesson_/g) || []).length
  const comingSoon = (text.match(/comingSoon:\s*true/g) || []).length
  const quizQs = (text.match(/id:\s*["']q\d/g) || []).length
  const sections = (text.match(/title:\s*["'`]/g) || []).length
  console.log(`  ${f}: ${lines} lines, ~${exports} lessons, comingSoon:${comingSoon}, quiz refs:${quizQs}`)
}

// Sample module01 uk
const m1 = path.join(ukDir, 'module01-lessons.js')
const m1text = fs.readFileSync(m1, 'utf8')
const m1lines = m1text.split('\n').length
const m1theoryLen = m1text.length
console.log(`\nmodule01 UK: ${m1lines} lines, ${m1theoryLen} chars total file`)
