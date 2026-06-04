import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../src/lib/robloxLessonContent')
const curriculumPath = path.join(__dirname, '../src/lib/robloxCurriculum.js')

// Parse lesson ids from curriculum (simple regex)
const curriculumText = fs.readFileSync(curriculumPath, 'utf8')
const allIds = [...curriculumText.matchAll(/lessonId["']?\s*:\s*["']([^"']+)["']/g)].map((m) => m[1])

function analyzeModuleFile(filePath, locale) {
  const text = fs.readFileSync(filePath, 'utf8')
  const lessons = []
  // Split by export const ukLesson / enLesson blocks
  const blocks = text.split(/export const (?:uk|en)Lesson\d+ = \{/)
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i]
    const lessonId = block.match(/lessonId:\s*["']([^"']+)["']/)?.[1]
    const title = block.match(/title:\s*["']([^"']+)["']/)?.[1]
    const comingSoon = /comingSoon:\s*true/.test(block)
    const sectionTitles = (block.match(/title:\s*"([^"]+)"/g) || []).length - 1 // minus lesson title
    const contentChunks = [...block.matchAll(/content:\s*`([\s\S]*?)`/g)]
    const theoryChars = contentChunks.reduce((n, m) => n + m[1].length, 0)
    const quizQs = (block.match(/id:\s*["']q\d+["']/g) || []).length
    const hasPractice = /practiceTask:\s*\{/.test(block)
    const objectives = (block.match(/learningObjectives:\s*\[([\s\S]*?)\]/m)?.[1] || '').split('\n').filter((l) => l.includes('"')).length
    if (lessonId) {
      lessons.push({
        lessonId,
        title,
        locale,
        comingSoon,
        theorySections: Math.max(0, sectionTitles),
        theoryChars,
        quizQs,
        hasPractice,
        objectives,
      })
    }
  }
  return lessons
}

function report(locale) {
  const dir = path.join(root, locale)
  const files = fs.readdirSync(dir).filter((f) => /^module\d+-lessons\.js$/.test(f)).sort()
  const all = files.flatMap((f) => analyzeModuleFile(path.join(dir, f), locale))
  const byId = Object.fromEntries(all.map((l) => [l.lessonId, l]))

  const ready = allIds.map((id) => byId[id]).filter((l) => l && !l.comingSoon)
  const missing = allIds.filter((id) => !byId[id])
  const placeholder = allIds.map((id) => byId[id]).filter((l) => l?.comingSoon)

  const avgChars = ready.length ? Math.round(ready.reduce((s, l) => s + l.theoryChars, 0) / ready.length) : 0
  const avgQuiz = ready.length ? (ready.reduce((s, l) => s + l.quizQs, 0) / ready.length).toFixed(1) : 0
  const avgSec = ready.length ? (ready.reduce((s, l) => s + l.theorySections, 0) / ready.length).toFixed(1) : 0

  console.log(`\n========== ${locale.toUpperCase()} (module bundles) ==========`)
  console.log(`Lessons parsed: ${all.length} | curriculum ids: ${allIds.length}`)
  console.log(`Ready: ${ready.length} | placeholder: ${placeholder.length} | not in bundles: ${missing.length}`)
  console.log(`Avg: ${avgChars} theory chars, ${avgSec} sections, ${avgQuiz} quiz questions`)
  console.log(`With practice: ${ready.filter((l) => l.hasPractice).length}/${ready.length}`)

  const thin = ready.filter((l) => l.theoryChars < 2000)
  const lowQuiz = ready.filter((l) => l.quizQs < 8)
  const fewSec = ready.filter((l) => l.theorySections < 6)

  console.log(`Thin theory (<2000 chars): ${thin.length}`)
  console.log(`Few sections (<6): ${fewSec.length}`)
  console.log(`Low quiz (<8): ${lowQuiz.length}`)

  if (thin.length) {
    console.log('\nThinnest:')
    thin.sort((a, b) => a.theoryChars - b.theoryChars).slice(0, 8).forEach((l) => {
      console.log(`  ${l.lessonId} chars:${l.theoryChars} sec:${l.theorySections} quiz:${l.quizQs} practice:${l.hasPractice}`)
    })
  }

  // Module rollup
  console.log('\nBy module:')
  for (let m = 1; m <= 12; m++) {
    const modLessons = ready.filter((l) => l.lessonId.startsWith(`lesson-roblox-${m}-`))
    if (!modLessons.length) continue
    const avg = Math.round(modLessons.reduce((s, l) => s + l.theoryChars, 0) / modLessons.length)
    const pr = modLessons.filter((l) => l.hasPractice).length
    const q = (modLessons.reduce((s, l) => s + l.quizQs, 0) / modLessons.length).toFixed(0)
    console.log(`  Module ${String(m).padStart(2)}: avg ${avg} chars, ${q} quiz/lesson, practice ${pr}/6`)
  }

  return { ready, thin, lowQuiz }
}

console.log('Roblox Studio curriculum audit (72 lessons, 12 modules x 6)')
const uk = report('uk')
const en = report('en')

// Compare UK vs EN parity
const ukMap = Object.fromEntries(
  fs.readdirSync(path.join(root, 'uk'))
    .filter((f) => /^module/.test(f))
    .flatMap((f) => analyzeModuleFile(path.join(root, 'uk', f), 'uk'))
    .map((l) => [l.lessonId, l])
)
const enMap = Object.fromEntries(
  fs.readdirSync(path.join(root, 'en'))
    .filter((f) => /^module/.test(f))
    .flatMap((f) => analyzeModuleFile(path.join(root, 'en', f), 'en'))
    .map((l) => [l.lessonId, l])
)
const enMissing = allIds.filter((id) => !enMap[id])
const ukOnly = allIds.filter((id) => ukMap[id] && !enMap[id])
console.log(`\nEN lessons in bundles: ${Object.keys(enMap).length}, missing vs curriculum: ${enMissing.length}`)
