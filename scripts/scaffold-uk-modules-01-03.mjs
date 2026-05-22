import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dir = path.join(__dirname, '../src/lib/robloxLessonContent')

const titles = {
  'lesson-roblox-1-1': '1.1 — Ласкаво просимо до Studio',
  'lesson-roblox-1-2': '1.2 — Будуємо острів',
  'lesson-roblox-1-3': "1.3 — Об'єкти та їх Properties",
  'lesson-roblox-1-4': '1.4 — Перша магія: ClickDetector',
  'lesson-roblox-1-5': '1.5 — Звук та атмосфера',
  'lesson-roblox-1-6': '1.6 — Checkpoint: Острів живе',
  'lesson-roblox-2-1': '2.1 — Блоки-вбивці',
  'lesson-roblox-2-2': '2.2 — Чекпоінти',
  'lesson-roblox-2-3': '2.3 — Таймер рівня',
  'lesson-roblox-2-4': '2.4 — Умови if/else',
  'lesson-roblox-2-5': '2.5 — Переможний екран',
  'lesson-roblox-2-6': '2.6 — Checkpoint: Obby готовий',
  'lesson-roblox-3-1': '3.1 — Монети на карті',
  'lesson-roblox-3-2': '3.2 — Збираємо монети',
  'lesson-roblox-3-3': '3.3 — Рахунок на екрані + leaderstats',
  'lesson-roblox-3-4': '3.4 — Функції',
  'lesson-roblox-3-5': "3.5 — DataStore: пам'ять між сесіями",
  'lesson-roblox-3-6': '3.6 — Checkpoint: Симулятор монет',
}

for (const m of ['01', '02', '03']) {
  const modNum = parseInt(m, 10)
  const enPath = path.join(dir, 'en', `module${m}-lessons.js`)
  let uk = fs.readFileSync(enPath, 'utf8')
  uk = uk.replace(/\/\*\* Rich EN content[^*]*\*\//, `/** Rich UK content for Roblox Module ${m} */`)
  uk = uk.replace(/export const enLesson/g, 'export const ukLesson')
  for (const [lessonId, title] of Object.entries(titles)) {
    if (!lessonId.startsWith(`lesson-roblox-${modNum}-`)) continue
    if (!uk.includes(`lessonId: '${lessonId}'`)) continue
    uk = uk.replace(
      new RegExp(`(lessonId: '${lessonId}',[\\s\\S]*?title: )'[^']*'`),
      `$1'${title.replace(/'/g, "\\'")}'`
    )
  }
  fs.mkdirSync(path.join(dir, 'uk'), { recursive: true })
  fs.writeFileSync(path.join(dir, 'uk', `module${m}-lessons.js`), uk)
  console.log(`Scaffolded module${m}-lessons.js`)
}
