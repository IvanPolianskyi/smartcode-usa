/**
 * Generate robloxCurriculum.js for 92-lesson grid and apply structural migration.
 * Run from smartcode root: node scripts/migrate-roblox-prod-92.js
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')

function lesson(moduleNum, order, title, opts = {}) {
  const lessonId = `lesson-roblox-${moduleNum}-${order}`
  const prev =
    order === 1
      ? []
      : [`lesson-roblox-${moduleNum}-${order - 1}`]
  return {
    lessonId,
    order,
    title,
    learningObjectives: [],
    estimatedTime: opts.estimatedTime || 60,
    prerequisites: opts.prerequisites || prev,
    isCheckpoint: Boolean(opts.isCheckpoint),
  }
}

function moduleBlock(moduleId, order, title, description, lessonCount, lessons) {
  return {
    moduleId,
    order,
    title,
    description,
    duration: { weeks: Math.max(2, Math.ceil(lessonCount / 2)), lessons: lessonCount },
    learningOutcomes: [],
    lessons,
  }
}

const modules = [
  moduleBlock('module-01', 0, '01 - Старт творця', 'Старт творця', 8, [
    lesson(1, 1, '1.1 - Інструменти Studio + будинок з вікнами'),
    lesson(1, 2, '1.2 - Terrain Editor: повний острів'),
    lesson(1, 3, '1.3 - Properties + змінні + перший Script'),
    lesson(1, 4, '1.4 - Арифметика + if/else'),
    lesson(1, 5, '1.5 - Materials, Decal, оздоба'),
    lesson(1, 6, '1.6 - Lighting + Atmosphere + Sound'),
    lesson(1, 7, '1.7 - Party Mode'),
    lesson(1, 8, '1.8 - Checkpoint: острів живе', { isCheckpoint: true, estimatedTime: 60 }),
  ]),
  moduleBlock('module-02', 1, '02 - World craft', 'World craft: Model, Constraints, парк', 4, [
    lesson(2, 1, '2.1 - Штаб острова (Model + фізика)'),
    lesson(2, 2, '2.2 - Вхід у парк (Weld + Hinge + Rope)'),
    lesson(2, 3, '2.3 - Атракціони + колізії'),
    lesson(2, 4, '2.4 - Здача парку (Toolbox + ship)'),
  ]),
  moduleBlock('module-03', 2, '03 - Код, що грається', 'Взаємодія, цикли, functions, LocalScript', 8, [
    lesson(3, 1, '3.1 - ClickDetector + ProximityPrompt'),
    lesson(3, 2, '3.2 - Touched + debounce + KillBrick'),
    lesson(3, 3, '3.3 - Чекпоінти + таймер'),
    lesson(3, 4, '3.4 - while + платформи-привиди'),
    lesson(3, 5, '3.5 - for / ipairs + спавн траси'),
    lesson(3, 6, '3.6 - Functions'),
    lesson(3, 7, '3.7 - LocalScript + GUI'),
    lesson(3, 8, '3.8 - Бос-здача міні-гри', { isCheckpoint: true }),
  ]),
  moduleBlock('module-04', 3, '04 - Tables і дані', 'Масиви, словники, ModuleScript, DataStore', 8, [
    lesson(4, 1, '4.1 - Масиви + for'),
    lesson(4, 2, '4.2 - Словники + прайс'),
    lesson(4, 3, '4.3 - insert / remove — інвентар'),
    lesson(4, 4, '4.4 - Масив записів (table в table)'),
    lesson(4, 5, '4.5 - ModuleScript + Config'),
    lesson(4, 6, '4.6 - DataStore lite'),
    lesson(4, 7, '4.7 - Бос: data-driven вітрина'),
    lesson(4, 8, '4.8 - Checkpoint: Tables', { isCheckpoint: true }),
  ]),
  moduleBlock('module-05', 4, '05 - Obby', 'Повноцінний obby-продукт', 10, [
    lesson(5, 1, '5.1 - Дизайн 3 біомів'),
    lesson(5, 2, '5.2 - Hazards + debounce'),
    lesson(5, 3, '5.3 - Чекпоінти + таймер + GUI'),
    lesson(5, 4, '5.4 - while-платформи + Config'),
    lesson(5, 5, '5.5 - Секрети + ключ-двері'),
    lesson(5, 6, '5.6 - Playtest #1 + багліст'),
    lesson(5, 7, '5.7 - Difficulty curve'),
    lesson(5, 8, '5.8 - Checkpoint: повний прохід', { isCheckpoint: true }),
    lesson(5, 9, '5.9 - Juice: Sound + Particles'),
    lesson(5, 10, '5.10 - Ship + Badge'),
  ]),
  moduleBlock('module-06', 5, '06 - Simulator', 'Core loop, leaderstats, HUD, DataStore', 10, [
    lesson(6, 1, '6.1 - Core loop + сцена'),
    lesson(6, 2, '6.2 - leaderstats'),
    lesson(6, 3, '6.3 - HUD на LocalScript'),
    lesson(6, 4, '6.4 - Функції нагород + анти-дубль'),
    lesson(6, 5, '6.5 - Спавн з Config + for'),
    lesson(6, 6, '6.6 - Attributes / Power'),
    lesson(6, 7, '6.7 - DataStore прогресу'),
    lesson(6, 8, '6.8 - Цілі дня з table'),
    lesson(6, 9, '6.9 - Playtest економіка + VFX'),
    lesson(6, 10, '6.10 - Ship Sim', { isCheckpoint: true }),
  ]),
  moduleBlock('module-07', 6, '07 - Tycoon', 'Plot, дропер, покупки, апгрейди', 8, [
    lesson(7, 1, '7.1 - Plot / dropper / collector'),
    lesson(7, 2, '7.2 - Дропер while/for + Config'),
    lesson(7, 3, '7.3 - Покупки + leaderstats'),
    lesson(7, 4, '7.4 - Апгрейди з table'),
    lesson(7, 5, '7.5 - Plot на гравця'),
    lesson(7, 6, '7.6 - Playtest + баланс цін'),
    lesson(7, 7, '7.7 - Проєкт: міні-фабрика'),
    lesson(7, 8, '7.8 - Ship Tycoon', { isCheckpoint: true }),
  ]),
  moduleBlock('module-08', 7, '08 - Arena', 'Health, Tool, урон, Tween, хвилі', 8, [
    lesson(8, 1, '8.1 - Humanoid Health'),
    lesson(8, 2, '8.2 - Tool + Animation'),
    lesson(8, 3, '8.3 - dealDamage на сервері'),
    lesson(8, 4, '8.4 - TweenService + Particles'),
    lesson(8, 5, '8.5 - Смерть + респавн'),
    lesson(8, 6, '8.6 - Хвилі + waveConfig'),
    lesson(8, 7, '8.7 - Playtest баланс бою'),
    lesson(8, 8, '8.8 - Ship Arena', { isCheckpoint: true }),
  ]),
  moduleBlock('module-09', 8, '09 - Race + мережа', 'Гонки, client/server, RemoteEvent', 8, [
    lesson(9, 1, '9.1 - Машина + траса'),
    lesson(9, 2, '9.2 - Таймер / кола / UI'),
    lesson(9, 3, '9.3 - Client vs Server'),
    lesson(9, 4, '9.4 - RemoteEvent'),
    lesson(9, 5, '9.5 - Лідерборд кіл'),
    lesson(9, 6, '9.6 - Пастки + collision'),
    lesson(9, 7, '9.7 - Playtest анти-чит'),
    lesson(9, 8, '9.8 - Ship Race', { isCheckpoint: true }),
  ]),
  moduleBlock('module-10', 9, '10 - Живий хаб', 'Магазин Remotes, NPC, квести, Raycast', 8, [
    lesson(10, 1, '10.1 - Хаб-білд + RS/SSS'),
    lesson(10, 2, '10.2 - Магазин: RemoteEvent + RemoteFunction'),
    lesson(10, 3, '10.3 - Анти-чит + GamePass lite'),
    lesson(10, 4, '10.4 - NPC + Prompt + діалог'),
    lesson(10, 5, '10.5 - Pathfinding + while'),
    lesson(10, 6, '10.6 - Квест з table'),
    lesson(10, 7, '10.7 - Інвентар + Raycast'),
    lesson(10, 8, '10.8 - Ship хаб', { isCheckpoint: true }),
  ]),
  moduleBlock('module-11', 10, '11 - Polish', 'Explorer, loading, juice, UX, demo', 6, [
    lesson(11, 1, '11.1 - Аудит Explorer'),
    lesson(11, 2, '11.2 - Loading Screen'),
    lesson(11, 3, '11.3 - Sound + Particles + Atmosphere'),
    lesson(11, 4, '11.4 - Оптимізація + UX'),
    lesson(11, 5, '11.5 - Demo Ready'),
    lesson(11, 6, '11.6 - Сліпий playtest + фікси', { isCheckpoint: true }),
  ]),
  moduleBlock('module-12', 11, '12 - Реліз', 'Пітч, збірка, тест, publish, портфоліо, SHOWCASE', 6, [
    lesson(12, 1, '12.1 - Пітч + MVP + table систем'),
    lesson(12, 2, '12.2 - Збірка фіналки + TeleportService'),
    lesson(12, 3, '12.3 - Тест-план 20 кейсів'),
    lesson(12, 4, '12.4 - Publish + Badge + GamePass-lite'),
    lesson(12, 5, '12.5 - Портфоліо'),
    lesson(12, 6, '12.6 - SHOWCASE DAY', { isCheckpoint: true, estimatedTime: 75 }),
  ]),
]

const total = modules.reduce((s, m) => s + m.lessons.length, 0)
if (total !== 92) {
  console.error('Expected 92, got', total)
  process.exit(1)
}

const curriculum = {
  courseId: 'roblox-studio',
  title: 'Roblox Studio: 92 уроки — від острова до релізу',
  modules,
}

const curriculumJs = `/**
 * Roblox Studio — 92 lessons / 12 modules
 * Grid: M1×8 + M2×4 + M3×8 + M4×8 + M5×10 + M6×10 + M7×8 + M8×8 + M9×8 + M10×8 + M11×6 + M12×6
 */

export const robloxCurriculum = ${JSON.stringify(curriculum, null, 2)}
`

fs.writeFileSync(path.join(ROOT, 'src/lib/robloxCurriculum.js'), curriculumJs)
console.log('Wrote robloxCurriculum.js, total', total)

// --- truncate UK modules ---
function truncateExport(file, cutAtExportName) {
  const full = path.join(ROOT, file)
  const s = fs.readFileSync(full, 'utf8')
  const marker = `export const ${cutAtExportName}`
  const i = s.indexOf(marker)
  if (i < 0) throw new Error(`Missing ${cutAtExportName} in ${file}`)
  fs.writeFileSync(full, s.slice(0, i).replace(/\s+$/, '\n'))
  console.log('Truncated', file, 'before', cutAtExportName)
}

truncateExport('src/lib/robloxLessonContent/uk/module02-lessons.js', 'ukLesson25')
truncateExport('src/lib/robloxLessonContent/uk/module11-lessons.js', 'ukLesson117')
truncateExport('src/lib/robloxLessonContent/uk/module12-lessons.js', 'ukLesson127')

// --- delete stub files ---
const toDelete = [
  '2-5', '2-6', '2-7', '2-8',
  '11-7', '11-8',
  '12-7', '12-8',
]
for (const id of toDelete) {
  const p = path.join(ROOT, `src/lib/robloxLessonContent/lesson-roblox-${id}.js`)
  if (fs.existsSync(p)) {
    fs.unlinkSync(p)
    console.log('Deleted', path.basename(p))
  }
}

console.log('Done structural part. Rewrite index + 12.6 + meta separately.')
