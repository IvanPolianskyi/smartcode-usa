import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../src/lib/robloxLessonContent')
const curriculumPath = path.join(__dirname, '../src/lib/robloxCurriculum.js')

const curriculumText = fs.readFileSync(curriculumPath, 'utf8')
const allLessonIds = [...curriculumText.matchAll(/lessonId["']?\s*:\s*["']([^"']+)["']/g)].map((m) => m[1])

console.log(`Loaded ${allLessonIds.length} lesson IDs from robloxCurriculum.js`)

function parseModuleFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  // We can strip imports and safely evaluate the exported objects
  const sanitized = text
    .replace(/import\s+.*?from\s+['"].*?['"]/g, '')
    .replace(/export const /g, 'exports.')

  const header = `
    var QUIZ_QUESTION_TYPES = {
      MULTIPLE_CHOICE: 'multiple_choice',
      CODE_READING: 'code_reading',
      LOGIC: 'logic',
      TRUE_FALSE: 'true_false',
    };
  `

  const exportsObj = {}
  try {
    const fn = new Function('exports', header + '\n' + sanitized)
    fn(exportsObj)
  } catch (err) {
    console.error(`Error parsing ${filePath}:`, err.message)
  }
  return exportsObj
}

for (const locale of ['uk', 'en']) {
  console.log(`\n========================================`)
  console.log(`AUDITING LOCALE: ${locale.toUpperCase()}`)
  console.log(`========================================`)

  const locDir = path.join(root, locale)
  const moduleFiles = fs.readdirSync(locDir).filter(f => /^module\d+-lessons\.js$/.test(f)).sort()

  const allLessons = {}
  for (const file of moduleFiles) {
    const parsed = parseModuleFile(path.join(locDir, file))
    for (const [key, lesson] of Object.entries(parsed)) {
      if (lesson && lesson.lessonId) {
        allLessons[lesson.lessonId] = lesson
      }
    }
  }

  console.log(`Parsed ${Object.keys(allLessons).length} lessons for ${locale}`)

  let missingLessons = []
  let missingPractice = []
  let missingQuiz = []
  let quizErrors = []
  let thinLessons = []
  let thinQuiz = []
  let missingObjectives = []
  let missingMistakes = []
  let missingSummary = []
  let suspiciousStrings = []

  for (const id of allLessonIds) {
    const lesson = allLessons[id]
    if (!lesson) {
      missingLessons.push(id)
      continue
    }

    if (!lesson.title || lesson.title.length < 3) {
      console.log(`[INVALID TITLE] ${id}: "${lesson.title}"`)
    }

    if (!lesson.learningObjectives || lesson.learningObjectives.length === 0) {
      missingObjectives.push(id)
    }

    const sections = lesson.theory?.sections || []
    const totalChars = sections.reduce((acc, s) => acc + (s.content?.length || 0), 0)
    if (sections.length < 3 || totalChars < 1800) {
      thinLessons.push({ id, sections: sections.length, chars: totalChars })
    }

    if (!lesson.practiceTask) {
      missingPractice.push(id)
    } else {
      if (!lesson.practiceTask.title || !lesson.practiceTask.description) {
        console.log(`[INVALID PRACTICE] ${id}: missing title or description`)
      }
    }

    if (!lesson.commonMistakes || lesson.commonMistakes.length === 0) {
      missingMistakes.push(id)
    }

    if (!lesson.summary || lesson.summary.length < 20) {
      missingSummary.push(id)
    }

    const quiz = lesson.quiz
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      missingQuiz.push(id)
    } else {
      if (quiz.questions.length < 10) {
        thinQuiz.push(`${id} (${quiz.questions.length} Qs)`)
      }
      quiz.questions.forEach((q, idx) => {
        if (!q.question || q.question.trim().length === 0) {
          quizErrors.push(`${id} q#${idx + 1}: empty question text`)
        }
        if (!q.options || q.options.length < 2) {
          quizErrors.push(`${id} q#${idx + 1} (${q.id}): less than 2 options`)
        }
        if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
          quizErrors.push(`${id} q#${idx + 1} (${q.id}): invalid correctAnswer ${q.correctAnswer} for ${q.options?.length} options`)
        }
        if (!q.explanation || q.explanation.trim().length === 0) {
          quizErrors.push(`${id} q#${idx + 1} (${q.id}): empty explanation`)
        }
        // Check for duplicate options in a question
        const uniqueOptions = new Set(q.options)
        if (uniqueOptions.size !== q.options.length) {
          quizErrors.push(`${id} q#${idx + 1} (${q.id}): duplicate options [${q.options.join(' | ')}]`)
        }
      })
    }

    const allText = JSON.stringify(lesson)
    if (locale === 'uk') {
      const suspiciousUk = [
        'польська мова', 'польський.', 'підлітковий UX', 'помилковий',
        'гуманоїд', 'клікдетектор'
      ]
      for (const s of suspiciousUk) {
        if (allText.includes(s)) {
          suspiciousStrings.push({ id, word: s })
        }
      }
    }
  }

  console.log(`Missing lessons: ${missingLessons.length} ${missingLessons.join(', ')}`)
  console.log(`Missing practice tasks (${missingPractice.length}): ${missingPractice.join(', ')}`)
  console.log(`Missing quizzes (${missingQuiz.length}): ${missingQuiz.join(', ')}`)
  console.log(`Thin quizzes (<10 Qs) (${thinQuiz.length}): ${thinQuiz.join(', ')}`)
  console.log(`Quiz errors (${quizErrors.length}):`)
  quizErrors.forEach(e => console.log('  - ' + e))
  console.log(`Thin lessons (<1800 chars) (${thinLessons.length}):`)
  thinLessons.forEach(t => console.log(`  - ${t.id}: ${t.sections} sections, ${t.chars} chars`))
  console.log(`Missing objectives: ${missingObjectives.length}`)
  console.log(`Missing common mistakes: ${missingMistakes.length}`)
  console.log(`Missing summary: ${missingSummary.length}`)
  if (suspiciousStrings.length > 0) {
    console.log(`Suspicious strings in UK (${suspiciousStrings.length}):`)
    suspiciousStrings.slice(0, 20).forEach(s => console.log(`  - ${s.id}: ${s.word}`))
  }
}
