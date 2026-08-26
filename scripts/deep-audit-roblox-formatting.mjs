import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../src/lib/robloxLessonContent')

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
  } catch (err) {
    console.error(`Error in ${filePath}:`, err.message)
  }
  return exportsObj
}

for (const locale of ['uk', 'en']) {
  console.log(`\n========================================`)
  console.log(`CHECKING MARKDOWN & CODE BLOCKS: ${locale.toUpperCase()}`)
  console.log(`========================================`)

  const locDir = path.join(root, locale)
  const moduleFiles = fs.readdirSync(locDir).filter(f => /^module\d+-lessons\.js$/.test(f)).sort()

  let unclosedCodeBlocks = []
  let duplicateQuizOptions = []
  let badQuizAnswers = []

  for (const file of moduleFiles) {
    const parsed = parseModuleFile(path.join(locDir, file))
    for (const [key, lesson] of Object.entries(parsed)) {
      if (!lesson || !lesson.lessonId) continue
      const lid = lesson.lessonId

      // Check theory sections
      for (const [sidx, s] of (lesson.theory?.sections || []).entries()) {
        const content = s.content || ''
        const codeFences = (content.match(/```/g) || []).length
        if (codeFences % 2 !== 0) {
          unclosedCodeBlocks.push(`${lid} section #${sidx + 1} (${s.title}): ${codeFences} backtick fences`)
        }
      }

      // Check practice task
      if (lesson.practiceTask?.description) {
        const descFences = (lesson.practiceTask.description.match(/```/g) || []).length
        if (descFences % 2 !== 0) {
          unclosedCodeBlocks.push(`${lid} practiceTask: ${descFences} backtick fences`)
        }
      }

      // Check quiz
      if (lesson.quiz?.questions) {
        for (const [qidx, q] of lesson.quiz.questions.entries()) {
          const opts = q.options || []
          const set = new Set(opts)
          if (set.size !== opts.length) {
            duplicateQuizOptions.push(`${lid} q#${qidx + 1} (${q.id}): ${opts.join(' | ')}`)
          }
          if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer >= opts.length) {
            badQuizAnswers.push(`${lid} q#${qidx + 1} (${q.id}): ans ${q.correctAnswer} out of ${opts.length}`)
          }
        }
      }
    }
  }

  console.log(`Unclosed code blocks (${unclosedCodeBlocks.length}):`)
  unclosedCodeBlocks.forEach(e => console.log('  - ' + e))
  console.log(`Duplicate quiz options (${duplicateQuizOptions.length}):`)
  duplicateQuizOptions.forEach(e => console.log('  - ' + e))
  console.log(`Bad quiz answers (${badQuizAnswers.length}):`)
  badQuizAnswers.forEach(e => console.log('  - ' + e))
}
