/**
 * Generate Roblox v2 LMS curriculum + bilingual lesson content from
 * curriculum/roblox-v2 markdown + course-grid.mjs
 *
 * Usage: node scripts/gen-roblox-v2.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  MODULES,
  COURSE_TITLE_UK,
  COURSE_TITLE_EN,
  PHASES,
  flattenLessons,
} from './roblox-v2/course-grid.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const MD_DIR = path.join(ROOT, 'curriculum', 'roblox-v2')
const CONTENT = path.join(ROOT, 'src', 'lib', 'robloxLessonContent')

function esc(s) {
  return String(s ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
}

function parseQuizBlock(block) {
  const questions = []
  // Match: 1. text ... a) ... b) ... **Відповідь: x**
  const re =
    /(\d+)\.\s+([\s\S]*?)\r?\n\s*a\)\s*(.+)\r?\n\s*b\)\s*(.+)\r?\n\s*c\)\s*(.+)\r?\n\s*d\)\s*(.+)\r?\n\s*\*\*Відповідь:\s*([abcd])\*\*/gi
  let m
  while ((m = re.exec(block)) !== null) {
    const letter = m[7].toLowerCase()
    const idx = { a: 0, b: 1, c: 2, d: 3 }[letter] ?? 0
    questions.push({
      question: m[2].replace(/\s+/g, ' ').trim(),
      options: [m[3], m[4], m[5], m[6]].map((o) => o.trim()),
      correctAnswer: idx,
      explanation:
        letter === 'a'
          ? m[3].trim()
          : `Правильна відповідь: ${[m[3], m[4], m[5], m[6]][idx].trim()}`,
    })
  }
  return questions.slice(0, 10)
}

function extractMdSection(body, headingPattern) {
  const re = new RegExp(
    `### (?:${headingPattern})[^\\n]*\\r?\\n([\\s\\S]*?)(?=\\r?\\n###|\\r?\\n##|$)`,
    'i'
  )
  return body.match(re)?.[1]?.trim() || ''
}

function parseBulletMistakes(block) {
  if (!block) return []
  return block
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*•]\s+/, '').trim())
    .filter((line) => line.length > 2)
    .slice(0, 5)
    .map((mistake) => ({
      mistake,
      explanation: 'Типова помилка з цього уроку — змінити підхід і перевірити артефакт.',
      correctApproach: 'Повторюй кроки з чекліста «разом», потім кастомізуй.',
    }))
}

function parseModuleMd(filename) {
  const full = path.join(MD_DIR, filename)
  if (!fs.existsSync(full)) return {}
  const text = fs.readFileSync(full, 'utf8')
  const byLesson = {}
  const parts = text.split(/^## Урок /m).slice(1)
  for (const part of parts) {
    const header = part.match(/^(\d+)\.(\d+)\s+[—\-]\s+(.+)\r?\n/)
    if (!header) continue
    const key = `${header[1]}.${header[2]}`
    const body = part.slice(header[0].length)
    const goal =
      body.match(/\*\*Ціль[^:]*:\*\*\s*(.+)/)?.[1]?.replace(/\r$/, '').trim() ||
      body.match(/\*\*Ціль одним реченням:\*\*\s*(.+)/)?.[1]?.replace(/\r$/, '').trim() ||
      ''
    const artifact =
      body.match(/### (?:Результат уроку \(артефакт\)|Артефакт модуля|Артефакт)\r?\n([\s\S]*?)(?=\r?\n###|\r?\n##|$)/)?.[1]?.trim() ||
      body.match(/\*\*Артефакт[^*]*\*\*[^\n]*\r?\n([\s\S]*?)(?=\r?\n###|\r?\n##|$)/)?.[1]?.trim() ||
      ''
    const timing =
      body.match(/### Таймінг[^\n]*\r?\n([\s\S]*?)(?=\r?\n###|\r?\n##|$)/)?.[1]?.trim() || ''
    const homework =
      body.match(/### ДЗ[^\n]*\r?\n([\s\S]*?)(?=\r?\n###|\r?\n##|$)/)?.[1]?.trim() || ''
    const together =
      extractMdSection(body, 'Робимо разом|Чекліст|Разом') ||
      extractMdSection(body, 'Три шари практики')
    const practiceLayers = extractMdSection(body, 'Три шари практики')
    const mistakesBlock = extractMdSection(body, 'Часті помилки')
    const rubric = extractMdSection(body, 'Рубрика')
    const individual =
      body.match(/\*\*Індивідуал:\*\*\s*(.+)/)?.[1]?.replace(/\r$/, '').trim() || ''
    const challengeFromTiming =
      timing
        .split(/\r?\n/)
        .map((l) => l.trim())
        .find((l) => /челендж/i.test(l))
        ?.replace(/^\|?\s*[\d–\-]+\s*\|?\s*/i, '')
        .replace(/^\|/, '')
        .trim() || ''
    const quizMatch = body.match(/### Тест[^\n]*\r?\n([\s\S]*?)(?=\r?\n---|\r?\n## Урок|\r?\n## Нотатки|$)/)
    const quiz = quizMatch ? parseQuizBlock(quizMatch[1]) : []
    const codeBlocks = []
    const codeRe = /```lua\r?\n([\s\S]*?)```/g
    let cm
    while ((cm = codeRe.exec(body)) !== null) {
      const before = body.slice(Math.max(0, cm.index - 350), cm.index)
      const heading = before.match(/### ([^\n]+)\s*$/)?.[1]?.trim() || ''
      codeBlocks.push({
        heading,
        code: cm[1].replace(/\r\n/g, '\n').trimEnd(),
      })
    }
    byLesson[key] = {
      goal,
      artifact,
      timing,
      homework,
      together,
      practiceLayers,
      mistakes: parseBulletMistakes(mistakesBlock),
      rubric,
      individual,
      challengeFromTiming,
      quiz,
      codeBlocks,
      title: header[3].trim(),
    }
  }
  return byLesson
}

function templateFileName(moduleNum, lessonNum, index) {
  const base = `m${String(moduleNum).padStart(2, '0')}-lesson-${moduleNum}-${lessonNum}`
  return index === 0 ? `${base}.lua` : `${base}-${index + 1}.lua`
}

function fallbackQuiz(lesson, locale) {
  const uk = locale === 'uk'
  const topic = uk ? lesson.shortTitleUk : lesson.shortTitleEn
  const base = uk
    ? [
        [`Що головне на уроці «${topic}»?`, ['Практичний артефакт у Studio', 'Лише перегляд відео', 'Видалити Place', 'Вимкнути Play'], 0],
        ['Скільки хвилин орієнтовно триває урок?', ['60', '5', '180', '10'], 0],
        ['Після теорії треба…', ['Зробити практику в Studio', 'Закрити Studio', 'Купити Robux', 'Видалити акаунт'], 0],
        ['Тест після уроку потрібен щоб…', ['Закріпити знання', 'Видалити прогрес', 'Вимкнути Explorer', 'Змінити нік'], 0],
        ['Якщо щось не працює…', ['Дивимось Output / перевіряємо імена', 'Кричимо в чат', 'Видаляємо Windows', 'Купуємо новий ПК одразу'], 0],
        ['Збереження Place…', ['Важливе після важливих змін', 'Ніколи не треба', 'Ламає гру', 'Дає Badge'], 0],
        ['Anchored для підлоги зазвичай…', ['true', 'false завжди', 'не існує', 'лише для Sound'], 0],
        ['Explorer показує…', ['Дерево обʼєктів', 'Лише чат', 'Лише Robux', 'Лише небо'], 0],
        ['Наступний урок відкриється коли…', ['Пройдеш цей (практика + тест)', 'Пройде місяць', 'Купиш Plugin', 'Зміниш біом словами'], 0],
        ['Мета курсу SmartCode Roblox…', ['Створювати ігри, а не лише грати', 'Лише дивитись меми', 'Лише фарбувати Part без імен', 'Видалити Studio'], 0],
      ]
    : [
        [`What is the focus of “${topic}”?`, ['A practical Studio artifact', 'Only watching videos', 'Deleting the Place', 'Turning Play off'], 0],
        ['Rough lesson length?', ['60 minutes', '5 minutes', '180 minutes', '10 minutes'], 0],
        ['After theory you should…', ['Practice in Studio', 'Close Studio', 'Buy Robux', 'Delete your account'], 0],
        ['The quiz is for…', ['Locking in knowledge', 'Wiping progress', 'Hiding Explorer', 'Renaming your user'], 0],
        ['If something breaks…', ['Check Output / names', 'Spam chat', 'Delete Windows', 'Buy a PC immediately'], 0],
        ['Saving the Place…', ['Matters after key changes', 'Is never needed', 'Breaks the game', 'Gives a Badge'], 0],
        ['Floors are usually…', ['Anchored = true', 'Always unanchored', 'Impossible', 'Sounds only'], 0],
        ['Explorer shows…', ['The object tree', 'Only chat', 'Only Robux', 'Only sky'], 0],
        ['Next lesson unlocks when…', ['You finish this one', 'A month passes', 'You buy a Plugin', 'You rename the biome'], 0],
        ['SmartCode Roblox goal…', ['Create games, not only play', 'Only watch memes', 'Only recolor Parts', 'Delete Studio'], 0],
      ]
  return base.map(([question, options, correctAnswer], i) => ({
    id: `q${i + 1}`,
    type: 'multiple_choice',
    question,
    options,
    correctAnswer,
    explanation: options[correctAnswer],
  }))
}

function buildCodeSection(lesson, parsed, locale) {
  const blocks = parsed?.codeBlocks || []
  if (!blocks.length) return null
  const uk = locale === 'uk'
  const parts = blocks.map((block, i) => {
    const heading = block.heading
      ? `### ${block.heading}`
      : uk
        ? `### Шаблон ${i + 1}`
        : `### Template ${i + 1}`
    return `${heading}

\`\`\`lua
${block.code}
\`\`\``
  })
  return {
    title: uk ? 'Шаблон коду (встав у Studio)' : 'Code template (paste into Studio)',
    content: uk
      ? `Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».

${parts.join('\n\n')}`
      : `Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.

${parts.join('\n\n')}`,
  }
}

function buildStarterPlaceSection(lesson, locale) {
  if (lesson.moduleNum > 4) return null
  const uk = locale === 'uk'
  return {
    title: uk ? 'Твій Place' : 'Your Place',
    content: uk
      ? `Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.

1. Попроси копію Place на уроці  
2. Збережи як \`M${lesson.moduleNum}_ТвоєІмʼя\`  
3. Роби всі кроки уроку саме в цьому Place`
      : `Use a **copy of the school Place** — don’t start from a blank Baseplate every time.

1. Ask for a Place copy in class  
2. Save it as \`M${lesson.moduleNum}_YourName\`  
3. Do all lesson steps in that Place`,
  }
}

function sanitizeStudentText(text, locale, fallback = '') {
  const uk = locale === 'uk'
  let s = String(text || '')
    .replace(/обхід\s+викладача[^.!\n]*/gi, '')
    .replace(/для\s+групи\s*[(\[]?[^)\].!\n]*/gi, '')
    .replace(/міні-презентаці[^.!\n]*/gi, uk ? 'коротке демо 20–30 сек' : 'a short 20–30s demo')
    .replace(/презентаці[^.!\n]*в\s+групі[^.!\n]*/gi, uk ? 'коротке демо' : 'a short demo')
    .replace(/чат\s+груп[іи][^.!\n]*/gi, uk ? 'викладачу' : 'your teacher')
    .replace(/в\s+групі/gi, uk ? 'на уроці' : 'in class')
    .replace(/за\s+рубрикою[^.!\n]*/gi, uk ? 'за чеклістом уроку' : 'against the lesson checklist')
    .replace(/рубрик[ауи]\s*≥?\s*\d*\s*\/?\s*\d*/gi, uk ? 'чекліст уроку' : 'lesson checklist')
    .replace(/\bрубрик[ауи]\b/gi, uk ? 'чекліст' : 'checklist')
    .replace(/здати\s+/gi, uk ? 'показати ' : 'show ')
    .replace(/curriculum\/roblox-v2\/[^\s`]*/gi, '')
    .replace(/starter-place\/?/gi, uk ? 'шкільний Place' : 'school Place')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,;:!])/g, '$1')
    .trim()
  if (!s) return fallback
  return s
}

function sanitizeStudentChallenge(text, locale) {
  const uk = locale === 'uk'
  let s = String(text || '')
    .replace(/^\|?\s*[\d–\-]+\s*\|?\s*/i, '')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  s = sanitizeStudentText(s, locale, '')
  if (!s || s.length < 8) {
    return uk
      ? 'Зроби артефакт трохи крутішим (декор або другий варіант) і будь готовий показати 20 секунд.'
      : 'Polish the artifact a bit more (decor or a second version) and be ready to show it for 20 seconds.'
  }
  return s.slice(0, 280)
}

function buildTheory(lesson, parsed, locale) {
  const uk = locale === 'uk'
  const goalFallback = uk
    ? `Опанувати тему «${lesson.shortTitleUk}».`
    : `Master “${lesson.shortTitleEn}”.`
  const goal = sanitizeStudentText(parsed?.goal, locale, goalFallback) || goalFallback
  const artifact = sanitizeStudentText(
    (parsed?.artifact || '').slice(0, 1200),
    locale,
    uk
      ? `Зроби **видимий результат** у своєму Place і збережи його (Save to Roblox).`
      : `Build a **visible result** in your Place and Save to Roblox.`
  )
  const hw = sanitizeStudentText((parsed?.homework || '').slice(0, 800), locale, '')
  const together = sanitizeStudentText(
    (parsed?.together || parsed?.practiceLayers || '').slice(0, 1600),
    locale,
    ''
  )
  const codeSection = buildCodeSection(lesson, parsed, locale)
  const starterSection = buildStarterPlaceSection(lesson, locale)

  const phase = PHASES.find((p) => p.modules.includes(lesson.moduleNum))
  const phaseName = uk ? phase?.titleUk : phase?.titleEn

  return {
    sections: [
      {
        title: uk ? 'Сьогоднішня мета' : 'Today’s goal',
        content: uk
          ? `**Ціль:** ${goal}

Фаза курсу: **${phaseName}**.

**Твій план:**
1. Прочитай коротко теорію (Studio поруч)
2. Зроби практику за кроками
3. Пройди тест (≥70%)
4. Зроби домашнє завдання`
          : `**Goal:** ${goal}

Course phase: **${phaseName}**.

**Your plan:**
1. Read the short theory (keep Studio open)
2. Complete the practice steps
3. Pass the quiz (≥70%)
4. Do the homework`,
      },
      {
        title: uk ? 'Що має вийти' : 'What you will build',
        content:
          artifact ||
          (uk
            ? `Зроби **видимий результат** у своєму Place і збережи його (Save to Roblox).`
            : `Build a **visible result** in your Place and Save to Roblox.`),
      },
      ...(starterSection ? [starterSection] : []),
      {
        title: uk ? 'Як працювати' : 'How to work',
        content: uk
          ? `Тримай **Roblox Studio** відкритим поруч із цією сторінкою.

1. Спочатку повтори кроки з теорії  
2. Зроби практику за чеклістом  
3. Потім можна ускладнити (челендж)

Якщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**.`
          : `Keep **Roblox Studio** open next to this page.

1. Follow the theory steps first  
2. Complete the practice checklist  
3. Then try the challenge  

If something fails — open **Output**, check **names** in Explorer, and press **Play**.`,
      },
      ...(together
        ? [
            {
              title: uk ? 'Кроки практики' : 'Practice steps',
              content: together,
            },
          ]
        : []),
      ...(codeSection ? [codeSection] : []),
      {
        title: uk ? 'Перед тестом перевір' : 'Before the quiz',
        content: uk
          ? `- [ ] Place збережено
- [ ] Результат уроку готовий
- [ ] Немає безіменних Part1/Part2 у важливій зоні
- [ ] Можу сказати ціль уроку одним реченням`
          : `- [ ] Place saved
- [ ] Lesson result is ready
- [ ] No random Part1/Part2 clutter in the key area
- [ ] I can say today’s goal in one sentence`,
      },
      ...(hw
        ? [
            {
              title: uk ? 'Домашка' : 'Homework',
              content: hw,
            },
          ]
        : [
            {
              title: uk ? 'Домашка' : 'Homework',
              content: uk
                ? 'Попрацюй над результатом ще 15–20 хв і збережи Place. Наступного разу покажи короткий демо 20–30 сек.'
                : 'Polish your result for 15–20 min and save the Place. Next time, show a short 20–30s demo.',
            },
          ]),
    ],
  }
}

function buildPractice(lesson, parsed, locale) {
  const uk = locale === 'uk'
  const art = sanitizeStudentText(parsed?.artifact || '', locale, '')
  const together = sanitizeStudentText(
    (parsed?.together || parsed?.practiceLayers || '').slice(0, 1400),
    locale,
    ''
  )
  const challenge = sanitizeStudentChallenge(
    parsed?.challengeFromTiming ||
      (uk
        ? 'Зроби артефакт трохи крутішим і будь готовий показати 20 секунд.'
        : 'Polish the artifact a bit and be ready to show it for 20 seconds.'),
    locale
  )

  const layersBlock = together
    ? uk
      ? `\n\n### Кроки\n${together}`
      : `\n\n### Steps\n${together}`
    : ''

  return {
    title: uk ? `Практика: ${lesson.shortTitleUk}` : `Practice: ${lesson.shortTitleEn}`,
    difficulty: lesson.moduleNum <= 3 ? 'beginner' : lesson.moduleNum <= 8 ? 'intermediate' : 'advanced',
    description: uk
      ? `### Завдання
${art || `Виконай кроки уроку «${lesson.shortTitleUk}» у своєму Place.`}
${layersBlock}

### Коли готово
1. Збережи Place  
2. Перевір у **Play**  
3. Натисни «Практику в Studio завершено» нижче`
      : `### Task
${art || `Complete the steps for “${lesson.shortTitleEn}” in your Place.`}
${layersBlock}

### When done
1. Save the Place  
2. Check in **Play**  
3. Tap “Studio practice finished” below`,
    hints: uk
      ? [
          'Спочатку зроби кроки 1:1, потім кастомізуй.',
          'Імена обʼєктів латиницею / PascalCase — легше шукати.',
          lesson.moduleNum <= 4
            ? 'Працюй у копії Place від викладача.'
            : parsed?.codeBlocks?.length
              ? 'Шаблон коду — у вкладці «Теорія», кнопка «Копіювати».'
              : 'Якщо щось зникло — перевір, чи зберіг Place.',
        ]
      : [
          'Do the steps 1:1 first, then customize.',
          'Name objects with clear PascalCase labels.',
          lesson.moduleNum <= 4
            ? 'Work in the Place copy from your teacher.'
            : parsed?.codeBlocks?.length
              ? 'Code template is in the Theory tab — use Copy.'
              : 'If work vanished — check that you saved the Place.',
        ],
    optionalChallenge: challenge,
  }
}

function buildLessonObject(lesson, parsed, locale) {
  const uk = locale === 'uk'
  let quizQs = (parsed?.quiz || []).map((q, i) => ({
    id: `q${i + 1}`,
    type: 'multiple_choice',
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }))
  if (quizQs.length < 8) {
    quizQs = fallbackQuiz(lesson, locale)
  }
  while (quizQs.length < 10) {
    const extras = fallbackQuiz(lesson, locale)
    quizQs.push(extras[quizQs.length % extras.length])
  }
  quizQs = quizQs.slice(0, 10).map((q, i) => ({ ...q, id: `q${i + 1}` }))

  const goal = sanitizeStudentText(
    parsed?.goal,
    locale,
    uk ? `Зрозуміти тему «${lesson.shortTitleUk}»` : `Understand “${lesson.shortTitleEn}”`
  )
  return {
    lessonId: lesson.lessonId,
    moduleId: lesson.moduleId,
    order: lesson.lessonNum,
    title: uk ? lesson.titleUk : lesson.titleEn,
    theoryMinutes: 40,
    quizMinutes: 10,
    estimatedTime: 60,
    learningObjectives: uk
      ? [
          goal || `Зрозуміти тему «${lesson.shortTitleUk}»`,
          'Зробити результат у Roblox Studio',
          'Пройти тест на ≥70%',
        ]
      : [
          goal || `Understand “${lesson.shortTitleEn}”`,
          'Build the result in Roblox Studio',
          'Pass the quiz with ≥70%',
        ],
    theory: buildTheory(lesson, parsed, locale),
    commonMistakes: (() => {
      const fromMd = (parsed?.mistakes || []).map((m) => ({
        mistake: m.mistake,
        explanation: uk
          ? 'Так часто ламається урок — виправ і перевір Play.'
          : 'This often breaks the lesson — fix it and check Play.',
        correctApproach: uk
          ? 'Повтори кроки практики, потім зроби по-своєму.'
          : 'Repeat the practice steps, then customize.',
      }))
      if (fromMd.length >= 2) return fromMd
      return uk
        ? [
            {
              mistake: 'Читати теорію без відкритої Studio',
              explanation: 'Без практики складніше запамʼятати.',
              correctApproach: 'Studio поруч із сторінкою. Кожен крок одразу повторюй.',
            },
            {
              mistake: 'Не зберігати Place',
              explanation: 'Після перезапуску робота може зникнути.',
              correctApproach: 'File → Save to Roblox після важливих змін.',
            },
            {
              mistake: 'Безіменні Part1/Part2',
              explanation: 'Потім важко знайти потрібний обʼєкт.',
              correctApproach: 'Давай зрозумілі імена і Folder/Model.',
            },
          ]
        : [
            {
              mistake: 'Reading theory without Studio open',
              explanation: 'Practice makes the steps stick.',
              correctApproach: 'Keep Studio beside the page and repeat every step.',
            },
            {
              mistake: 'Not saving the Place',
              explanation: 'Work can disappear after restart.',
              correctApproach: 'File → Save to Roblox after meaningful changes.',
            },
            {
              mistake: 'Leaving Part1/Part2 clutter',
              explanation: 'Later it is hard to find objects.',
              correctApproach: 'Rename objects and group into Folders/Models.',
            },
          ]
    })(),
    summary: uk
      ? `Урок **${lesson.titleUk}** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.`
      : `**${lesson.titleEn}** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.`,
    practiceTask: buildPractice(lesson, parsed, locale),
    quiz: {
      passingScore: 70,
      timeLimit: 10,
      questions: quizQs,
    },
  }
}

function serializeLesson(obj) {
  return JSON.stringify(obj, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'")
    // Fix - JSON used double quotes; for JS export we want proper template. Better use util.inspect style.
}

// Better: emit as JS with JSON.stringify for data part
function emitLessonConst(name, obj) {
  return `export const ${name} = ${JSON.stringify(obj, null, 2)}\n`
}

function generateCurriculum() {
  const modules = MODULES.map((mod) => {
    const lessons = mod.lessons.map((_, i) => {
      const lessonNum = i + 1
      const lessonId = `lesson-roblox-${mod.id}-${lessonNum}`
      const titleUk = `${mod.id}.${lessonNum} — ${mod.lessons[i][0]}`
      const isCheckpoint =
        /чекпоінт|showcase|презентація|проєкт:/i.test(mod.lessons[i][0]) ||
        lessonNum === mod.lessons.length
      return {
        lessonId,
        order: lessonNum,
        title: titleUk,
        learningObjectives: [],
        estimatedTime: 60,
        prerequisites:
          lessonNum > 1 ? [`lesson-roblox-${mod.id}-${lessonNum - 1}`] : [],
        isCheckpoint,
      }
    })
    // Cross-module first lesson prereq = last of previous module
    return {
      moduleId: `module-${String(mod.id).padStart(2, '0')}`,
      order: mod.id - 1,
      title: `${String(mod.id).padStart(2, '0')} — ${mod.nameUk}`,
      description: mod.nameUk,
      duration: { weeks: mod.weeks, lessons: mod.lessons.length },
      learningOutcomes: [],
      lessons,
    }
  })

  // Fix prerequisites across modules for lesson 1 of each module after 1
  for (let m = 1; m < modules.length; m++) {
    const prev = modules[m - 1]
    const lastPrev = prev.lessons[prev.lessons.length - 1]
    modules[m].lessons[0].prerequisites = [lastPrev.lessonId]
  }

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0)
  const body = `/**
 * Roblox Studio v2 — ${totalLessons} lessons / ${modules.length} modules
 * AUTO-GENERATED by scripts/gen-roblox-v2.mjs — do not edit by hand
 */

export const robloxCurriculum = ${JSON.stringify(
    {
      courseId: 'roblox-studio',
      title: COURSE_TITLE_UK,
      modules,
    },
    null,
    2
  )}
`
  fs.writeFileSync(path.join(ROOT, 'src/lib/robloxCurriculum.js'), body, 'utf8')
  console.log('Wrote robloxCurriculum.js', totalLessons, 'lessons')
  return totalLessons
}

function generateModuleMeta() {
  const uk = {}
  const en = {}
  for (const mod of MODULES) {
    const id = `module-${String(mod.id).padStart(2, '0')}`
    uk[id] = {
      tagline: mod.taglineUk,
      description: mod.descUk,
      learningOutcomes: mod.outcomesUk,
      phase: PHASES.find((p) => p.modules.includes(mod.id))?.id || 'A',
    }
    en[id] = {
      tagline: mod.taglineEn,
      description: mod.descEn,
      learningOutcomes: mod.outcomesEn,
      phase: PHASES.find((p) => p.modules.includes(mod.id))?.id || 'A',
    }
  }

  const titleUk = {}
  const titleEn = {}
  for (const mod of MODULES) {
    const id = `module-${String(mod.id).padStart(2, '0')}`
    titleUk[id] = `${String(mod.id).padStart(2, '0')} — ${mod.nameUk}`
    titleEn[id] = `${String(mod.id).padStart(2, '0')} — ${mod.nameEn}`
  }

  const file = `/**
 * Module descriptions for Roblox v2 — AUTO-GENERATED by scripts/gen-roblox-v2.mjs
 */

export const ROBOX_MODULE_META_UK = ${JSON.stringify(uk, null, 2)}

export const ROBOX_MODULE_META_EN = ${JSON.stringify(en, null, 2)}

export const ROBOX_MODULE_TITLE_UK = ${JSON.stringify(titleUk, null, 2)}

export const ROBOX_MODULE_TITLE_EN = ${JSON.stringify(titleEn, null, 2)}

export const ROBOX_PHASES = ${JSON.stringify(PHASES, null, 2)}

export function enrichRobloxModules(modules, locale = 'uk') {
  const meta = locale === 'en' ? ROBOX_MODULE_META_EN : ROBOX_MODULE_META_UK
  const titles = locale === 'en' ? ROBOX_MODULE_TITLE_EN : ROBOX_MODULE_TITLE_UK
  return (modules || []).map((mod) => {
    const m = meta[mod.moduleId] || {}
    return {
      ...mod,
      title: titles[mod.moduleId] || mod.title,
      tagline: m.tagline || '',
      description: m.description || mod.description,
      learningOutcomes: m.learningOutcomes || mod.learningOutcomes || [],
      phase: m.phase || null,
    }
  })
}
`
  fs.writeFileSync(path.join(ROOT, 'src/lib/robloxModuleMeta.js'), file, 'utf8')
  console.log('Wrote robloxModuleMeta.js')
}

function generateContent() {
  const flat = flattenLessons()
  const parsedByFile = {}
  for (const mod of MODULES) {
    parsedByFile[mod.id] = parseModuleMd(mod.md)
    console.log(
      `Parsed ${mod.md}:`,
      Object.keys(parsedByFile[mod.id]).length,
      'lesson blocks,',
      Object.values(parsedByFile[mod.id]).reduce((s, p) => s + (p.quiz?.length || 0), 0),
      'quiz qs'
    )
  }

  // Group by module
  const byMod = {}
  for (const lesson of flat) {
    byMod[lesson.moduleNum] ||= []
    byMod[lesson.moduleNum].push(lesson)
  }

  for (const [modNum, lessons] of Object.entries(byMod)) {
    const n = Number(modNum)
    const pad = String(n).padStart(2, '0')
    const ukExports = []
    const enExports = []
    const ukParts = []
    const enParts = []

    for (const lesson of lessons) {
      const key = `${lesson.moduleNum}.${lesson.lessonNum}`
      const parsed = parsedByFile[n][key] || {}
      const ukObj = buildLessonObject(lesson, parsed, 'uk')
      const enObj = buildLessonObject(lesson, parsed, 'en')
      // EN quizzes: keep structure but if from UK md, translate label lightly via fallback when needed
      const ukName = `ukLesson${n}${lesson.lessonNum}`
      const enName = `enLesson${n}${lesson.lessonNum}`
      ukExports.push(ukName)
      enExports.push(enName)
      ukParts.push(emitLessonConst(ukName, ukObj))
      enParts.push(emitLessonConst(enName, enObj))
    }

    const ukFile = `/** Roblox v2 Module ${pad} UK — AUTO gen-roblox-v2.mjs */\nimport { QUIZ_QUESTION_TYPES } from '../../courseData'\n\nconst MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE // reserved\nvoid MC\n\n${ukParts.join('\n')}`
    const enFile = `/** Roblox v2 Module ${pad} EN — AUTO gen-roblox-v2.mjs */\nimport { QUIZ_QUESTION_TYPES } from '../../courseData'\n\nconst MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE\nvoid MC\n\n${enParts.join('\n')}`

    fs.writeFileSync(path.join(CONTENT, 'uk', `module${pad}-lessons.js`), ukFile, 'utf8')
    fs.writeFileSync(path.join(CONTENT, 'en', `module${pad}-lessons.js`), enFile, 'utf8')
  }

  // Wrappers + index
  const imports = []
  const mapEntries = []
  for (const lesson of flat) {
    const file = `lesson-roblox-${lesson.moduleNum}-${lesson.lessonNum}`
    const varName = `lesson_roblox_${lesson.moduleNum}_${lesson.lessonNum}`
    const ukName = `ukLesson${lesson.moduleNum}${lesson.lessonNum}`
    const enName = `enLesson${lesson.moduleNum}${lesson.lessonNum}`
    const pad = String(lesson.moduleNum).padStart(2, '0')
    const wrap = `import { ${ukName} } from './uk/module${pad}-lessons'\nimport { ${enName} } from './en/module${pad}-lessons'\n\nexport const ${varName} = { uk: ${ukName}, en: ${enName} }\n`
    fs.writeFileSync(path.join(CONTENT, `${file}.js`), wrap, 'utf8')
    imports.push(`import { ${varName} } from './${file}'`)
    mapEntries.push(`  '${lesson.lessonId}': ${varName}`)
  }

  // Remove obsolete wrappers 1-6 only modules that had 6 lessons when now fewer? 
  // Clean old lesson files that are NOT in new set (e.g. old had only up to 6 per module for 12 modules;
  // new has up to 10 for m4 and 13 modules. Old files like lesson-roblox-1-6 still exist if m1 has 8.
  // Delete any lesson-roblox-*-*.js not in flat set.
  const keep = new Set(flat.map((l) => `lesson-roblox-${l.moduleNum}-${l.lessonNum}.js`))
  for (const f of fs.readdirSync(CONTENT)) {
    if (/^lesson-roblox-\d+-\d+\.js$/.test(f) && !keep.has(f)) {
      fs.unlinkSync(path.join(CONTENT, f))
      console.log('Removed obsolete', f)
    }
  }
  // Remove old module packs 01-12 that we're overwriting; also delete module packs beyond if any
  // uk/en module07-12 still overwritten for 07-12; module13 new; old style ok

  const index = `${imports.join('\n')}
import { robloxCurriculum } from '../robloxCurriculum'

const LESSON_MAP = {
${mapEntries.join(',\n')}
}

function createPlaceholder(lessonId, title, locale = 'uk') {
  const ukContent =
    'Контент цього уроку ще готується. Продовжуй попередні уроки або звернися до викладача на онлайн-занятті.'
  const enContent =
    'This lesson is being prepared. Continue previous lessons or ask your teacher in a live class.'
  const isEn = locale === 'en'
  return {
    lessonId,
    title: title || lessonId,
    theoryMinutes: 40,
    quizMinutes: 10,
    estimatedTime: 50,
    learningObjectives: isEn
      ? ['Continue previous lessons', 'Ask your teacher if stuck']
      : ['Продовжуй попередні уроки', 'Запитай викладача, якщо застряг'],
    theory: {
      sections: [
        {
          title: isEn ? 'Coming soon' : 'Незабаром',
          content: isEn ? enContent : ukContent,
        },
      ],
    },
    commonMistakes: [],
    summary: isEn ? enContent : ukContent,
    practiceTask: {
      title: isEn ? 'Practice coming soon' : 'Практика незабаром',
      difficulty: 'beginner',
      description: isEn ? enContent : ukContent,
      hints: [],
      optionalChallenge: '',
    },
    quiz: { passingScore: 70, timeLimit: 10, questions: [] },
    comingSoon: true,
  }
}

export function getRobloxLessonContent(lessonId, locale = 'uk') {
  const pack = LESSON_MAP[lessonId]
  if (!pack) {
    const all = robloxCurriculum.modules.flatMap((m) => m.lessons)
    const meta = all.find((l) => l.lessonId === lessonId)
    return createPlaceholder(lessonId, meta?.title, locale)
  }
  return locale === 'en' ? pack.en : pack.uk
}

export function getAllRobloxLessonIds() {
  return Object.keys(LESSON_MAP)
}
`
  fs.writeFileSync(path.join(CONTENT, 'index.js'), index, 'utf8')
  console.log('Wrote index.js +', flat.length, 'wrappers')
}

function generateLocaleTitles() {
  const flat = flattenLessons()
  const enModuleTitles = {}
  const enLessonTitles = {}
  for (const mod of MODULES) {
    enModuleTitles[`module-${String(mod.id).padStart(2, '0')}`] =
      `${String(mod.id).padStart(2, '0')} — ${mod.nameEn}`
  }
  for (const l of flat) {
    enLessonTitles[l.lessonId] = l.titleEn
  }

  const localePath = path.join(ROOT, 'src/lib/robloxCurriculumLocale.js')
  const file = `import { robloxCurriculum } from './robloxCurriculum'
import { enrichRobloxModules, ROBOX_MODULE_TITLE_EN } from './robloxModuleMeta'

const EN_MODULE_TITLES = ${JSON.stringify(enModuleTitles, null, 2)}

const EN_LESSON_TITLES = ${JSON.stringify(enLessonTitles, null, 2)}

const EN_COURSE_TITLE = ${JSON.stringify(COURSE_TITLE_EN)}

export function getRobloxCurriculum(locale = 'uk') {
  const base = robloxCurriculum
  if (locale !== 'en') {
    return {
      ...base,
      modules: enrichRobloxModules(base.modules, 'uk'),
    }
  }

  const modules = base.modules.map((mod) => {
    const enriched = enrichRobloxModules([mod], 'en')[0]
    return {
      ...enriched,
      title: EN_MODULE_TITLES[mod.moduleId] || ROBOX_MODULE_TITLE_EN[mod.moduleId] || mod.title,
      lessons: (mod.lessons || []).map((lesson) => ({
        ...lesson,
        title: EN_LESSON_TITLES[lesson.lessonId] || lesson.title,
      })),
    }
  })

  return {
    ...base,
    title: EN_COURSE_TITLE,
    modules,
  }
}
`
  fs.writeFileSync(localePath, file, 'utf8')
  console.log('Wrote robloxCurriculumLocale.js')
}

function main() {
  const total = generateCurriculum()
  generateModuleMeta()
  generateContent()
  generateLocaleTitles()
  console.log('\\nDone. Total lessons:', total)
}

main()
