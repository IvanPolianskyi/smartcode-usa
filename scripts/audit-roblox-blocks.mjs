import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../src/lib/robloxLessonContent')
const curriculumText = fs.readFileSync(path.join(__dirname, '../src/lib/robloxCurriculum.js'), 'utf8')
const allIds = [...curriculumText.matchAll(/lessonId["']?\s*:\s*["']([^"']+)["']/g)].map((m) => m[1])

function parseBlocks(locale) {
  const dir = path.join(root, locale)
  const lessons = []
  for (const file of fs.readdirSync(dir).filter((f) => /^module\d+-lessons\.js$/.test(f))) {
    const text = fs.readFileSync(path.join(dir, file), 'utf8')
    const parts = text.split(/export const (?:uk|en)Lesson\d+ = \{/)
    for (let i = 1; i < parts.length; i++) {
      const block = parts[i]
      const lessonId = block.match(/lessonId:\s*["']([^"']+)["']/)?.[1]
      if (!lessonId) continue
      const lines = block.split('\n').length
      const contentSections = (block.match(/content:\s*`/g) || []).length
      const quizQs = (block.match(/id:\s*["']q\d+["']/g) || []).length
      const hasPractice = /practiceTask:\s*\{/.test(block)
      const theoryMin = Number(block.match(/theoryMinutes:\s*(\d+)/)?.[1] || 0)
      lessons.push({
        lessonId,
        lines,
        contentSections,
        quizQs,
        hasPractice,
        theoryMin,
        chars: block.length,
      })
    }
  }
  return lessons
}

function report(locale) {
  const lessons = parseBlocks(locale)
  const byId = Object.fromEntries(lessons.map((l) => [l.lessonId, l]))
  const ready = allIds.map((id) => byId[id]).filter(Boolean)
  const missing = allIds.filter((id) => !byId[id])

  console.log(`\n=== ${locale.toUpperCase()} (block size) ===`)
  console.log(`Parsed: ${lessons.length}, mapped to curriculum: ${ready.length}, missing: ${missing.length}`)
  const avgLines = Math.round(ready.reduce((s, l) => s + l.lines, 0) / ready.length)
  const avgSec = (ready.reduce((s, l) => s + l.contentSections, 0) / ready.length).toFixed(1)
  const avgQuiz = (ready.reduce((s, l) => s + l.quizQs, 0) / ready.length).toFixed(1)
  const avgChars = Math.round(ready.reduce((s, l) => s + l.chars, 0) / ready.length)
  console.log(`Avg block: ${avgLines} lines, ${avgChars} chars, ${avgSec} theory sections, ${avgQuiz} quiz Qs`)
  console.log(`Practice: ${ready.filter((l) => l.hasPractice).length}/${ready.length}`)
  console.log(`theoryMinutes=40: ${ready.filter((l) => l.theoryMin === 40).length}/${ready.length}`)

  const small = ready.filter((l) => l.lines < 200).sort((a, b) => a.lines - b.lines)
  console.log(`Small blocks (<200 lines): ${small.length}`)
  small.slice(0, 10).forEach((l) => {
    console.log(`  ${l.lessonId}: ${l.lines} lines, ${l.contentSections} sections, ${l.quizQs} quiz`)
  })

  console.log('\nPer module (avg lines):')
  for (let mod = 1; mod <= 12; mod++) {
    const modL = ready.filter((l) => l.lessonId.startsWith(`lesson-roblox-${mod}-`))
    const avg = Math.round(modL.reduce((s, l) => s + l.lines, 0) / modL.length)
    console.log(`  M${String(mod).padStart(2)}: ${avg} lines/lesson (${modL.length} lessons)`)
  }
  return { ready, byId }
}

console.log('Roblox content audit — 72 lessons')
const uk = report('uk')
const en = report('en')

const thinEn = uk.ready.filter((u) => {
  const e = en.byId[u.lessonId]
  return e && e.lines < u.lines * 0.75
})
console.log(`\nEN noticeably shorter than UK (<75% lines): ${thinEn.length}`)
thinEn.slice(0, 8).forEach((u) => {
  const e = en.byId[u.lessonId]
  console.log(`  ${u.lessonId}: UK ${u.lines} vs EN ${e.lines} lines`)
})
