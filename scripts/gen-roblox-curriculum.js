const blocks = [
  { id: 1, name: 'Мій перший світ', lessons: [
    ['1', '1', 'Ласкаво просимо до Studio'], ['1', '2', 'Будуємо острів'], ['1', '3', "Об'єкти та їх Properties"],
    ['1', '4', 'Перша магія: ClickDetector'], ['1', '5', 'Звук та атмосфера'], ['1', '6', 'Checkpoint: Острів живе'],
  ]},
  { id: 2, name: 'Небезпечна зона', lessons: [
    ['2', '1', 'Блоки-вбивці'], ['2', '2', 'Чекпоінти'], ['2', '3', 'Таймер рівня'],
    ['2', '4', 'Умови if/else'], ['2', '5', 'Переможний екран'], ['2', '6', 'Checkpoint: Obby готовий'],
  ]},
  { id: 3, name: 'Гра, яка тебе пам\'ятає', lessons: [
    ['3', '1', 'Монети на карті'], ['3', '2', 'Збираємо монети'], ['3', '3', 'Рахунок на екрані + leaderstats'],
    ['3', '4', 'Функції'], ['3', '5', 'DataStore: пам\'ять між сесіями'], ['3', '6', 'Checkpoint: Симулятор монет'],
  ]},
  { id: 4, name: 'Будівник імперії', lessons: [
    ['4', '1', 'Архітектура Tycoon'], ['4', '2', 'Дропер монет'], ['4', '3', 'Кнопка покупки'],
    ['4', '4', 'Таблиці та апгрейди'], ['4', '5', 'Власна ділянка для кожного гравця'], ['4', '6', 'Checkpoint: Tycoon працює'],
  ]},
  { id: 5, name: 'Бійцівський клуб', lessons: [
    ['5', '1', 'Гуманоїд і здоров\'я'], ['5', '2', 'Зброя — перший меч'], ['5', '3', 'Система пошкоджень'],
    ['5', '4', 'TweenService: плавні ефекти'], ['5', '5', 'Смерть та респавн'], ['5', '6', 'Checkpoint: Arena готова'],
  ]},
  { id: 6, name: 'Швидше, вище, далі', lessons: [
    ['6', '1', 'Машина з нуля'], ['6', '2', 'Траса'], ['6', '3', 'Таймер гонки'],
    ['6', '4', 'Client-Server: перше знайомство'], ['6', '5', 'Кола та лідерборд'], ['6', '6', 'Checkpoint: Гонка запущена'],
  ]},
  { id: 7, name: 'Пошта між світами', lessons: [
    ['7', '1', 'Два світи: клієнт і сервер'], ['7', '2', 'RemoteEvent'], ['7', '3', 'Магазин: UI частина'],
    ['7', '4', 'Магазин: серверна логіка'], ['7', '5', 'RemoteFunction'], ['7', '6', 'Checkpoint: Магазин працює'],
  ]},
  { id: 8, name: 'Розумна гра', lessons: [
    ['8', '1', 'Живий NPC'], ['8', '2', 'Система діалогів'], ['8', '3', 'NPC що ходить'],
    ['8', '4', 'Квест-система'], ['8', '5', 'Ворог що атакує'], ['8', '6', 'Checkpoint: Жива локація'],
  ]},
  { id: 9, name: 'Архітектор систем', lessons: [
    ['9', '1', 'ModuleScript: спільний код'], ['9', '2', 'Інвентар через таблицю'], ['9', '3', 'Таблиці як об\'єкти'],
    ['9', '4', 'Екіпіровка та статистика'], ['9', '5', 'Серіалізація інвентарю'], ['9', '6', 'Checkpoint: RPG Inventory'],
  ]},
  { id: 10, name: 'Магія деталей', lessons: [
    ['10', '1', 'Фізичні зв\'язки (Constraints)'], ['10', '2', 'TweenService: майстерність'], ['10', '3', 'Raycasting'],
    ['10', '4', 'Загадка з лазером'], ['10', '5', 'Процедурні елементи'], ['10', '6', 'Checkpoint: Puzzle World'],
  ]},
  { id: 11, name: 'Продуктивність та POLISH', lessons: [
    ['11', '1', 'Чистий Explorer'], ['11', '2', 'Loading Screen'], ['11', '3', 'Звуковий дизайн'],
    ['11', '4', 'Оптимізація'], ['11', '5', 'UX та доступність'], ['11', '6', 'Checkpoint: Гра відполірована'],
  ]},
  { id: 12, name: 'День релізу', lessons: [
    ['12', '1', 'Фінальний проект: план'], ['12', '2', 'Збираємо все разом'], ['12', '3', 'Тестування'],
    ['12', '4', 'Публікація'], ['12', '5', 'Портфоліо'], ['12', '6', 'SHOWCASE DAY'],
  ]},
]

const modules = blocks.map((b) => {
  const lessons = b.lessons.map(([blk, les, title], i) => {
    const lessonId = `lesson-roblox-${blk}-${les}`
    return {
      lessonId,
      order: i + 1,
      title: `${blk}.${les} — ${title}`,
      learningObjectives: [],
      estimatedTime: 60,
      prerequisites: i > 0 ? [`lesson-roblox-${blk}-${Number(les) - 1}`] : [],
      isCheckpoint: title.startsWith('Checkpoint') || title === 'SHOWCASE DAY',
    }
  })
  return {
    moduleId: `module-${String(b.id).padStart(2, '0')}`,
    order: b.id - 1,
    title: `${String(b.id).padStart(2, '0')} — ${b.name}`,
    description: b.name,
    duration: { weeks: 3, lessons: 6 },
    learningOutcomes: [],
    lessons,
  }
})

const out = `/**
 * Roblox Studio — 72 lessons / 12 blocks
 * Generated from global curriculum grid
 */

export const robloxCurriculum = ${JSON.stringify({
  courseId: 'roblox-studio',
  title: 'Roblox Studio: від першого Part до власної гри',
  modules,
}, null, 2)}
`

require('fs').writeFileSync('src/lib/robloxCurriculum.js', out)
console.log('Written src/lib/robloxCurriculum.js')
