import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../src/lib/robloxLessonContent')
const curriculumPath = path.join(__dirname, '../src/lib/robloxCurriculum.js')

const curriculumText = fs.readFileSync(curriculumPath, 'utf8')
const allLessonIds = [...curriculumText.matchAll(/lessonId["']?\s*:\s*["']([^"']+)["']/g)].map((m) => m[1])

function parseModuleFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const sanitized = text
    .replace(/import\s+.*?from\s+['"].*?['"]/g, '')
    .replace(/export const /g, 'exports.')
  const header = `var QUIZ_QUESTION_TYPES = { MULTIPLE_CHOICE: 'multiple_choice' };`
  const exportsObj = {}
  try {
    const fn = new Function('exports', header + '\n' + sanitized)
    fn(exportsObj)
  } catch (err) {}
  return exportsObj
}

for (const locale of ['uk', 'en']) {
  const locDir = path.join(root, locale)
  const moduleFiles = fs.readdirSync(locDir).filter(f => /^module\d+-lessons\.js$/.test(f)).sort()
  const allLessons = {}
  for (const file of moduleFiles) {
    const parsed = parseModuleFile(path.join(locDir, file))
    for (const [key, lesson] of Object.entries(parsed)) {
      if (lesson && lesson.lessonId) allLessons[lesson.lessonId] = lesson
    }
  }

  const missingMistakes = allLessonIds.filter(id => !allLessons[id]?.commonMistakes || allLessons[id].commonMistakes.length === 0)
  const missingSummary = allLessonIds.filter(id => !allLessons[id]?.summary)
  console.log(`${locale.toUpperCase()} missing commonMistakes (${missingMistakes.length}):`, missingMistakes)
  console.log(`${locale.toUpperCase()} missing summary (${missingSummary.length}):`, missingSummary)
}
