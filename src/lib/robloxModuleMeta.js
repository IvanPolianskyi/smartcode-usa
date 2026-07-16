/**
 * Module descriptions for Roblox v2 (UK only).
 */

export const ROBOX_MODULE_META_UK = {
  "module-01": {
    "tagline": "Studio і Parts",
    "description": "Studio, Explorer, Parts, Properties, Snap — фундамент без скриптів. Артефакт: «Мій перший двір».",
    "learningOutcomes": [
      "Орієнтуватися в Studio та Explorer",
      "Створювати Parts з Anchored/CanCollide",
      "Зібрати двір за чеклістом"
    ],
    "phase": "A"
  },
  "module-02": {
    "tagline": "Solid modeling",
    "description": "Model vs Folder, PrimaryPart, Union/Negate, Decal. Артефакт: будинок з вікнами.",
    "learningOutcomes": [
      "Групувати Parts у Model",
      "Різати отвори Negate+Union",
      "Зібрати House з PrimaryPart"
    ],
    "phase": "A"
  },
  "module-03": {
    "tagline": "Біом і світло",
    "description": "Terrain, Lighting, Sky, ambient-звук. Артефакт: живий біом навколо двору.",
    "learningOutcomes": [
      "Малювати базовий terrain",
      "Налаштувати Lighting/Sky",
      "Додати ambient звук"
    ],
    "phase": "A"
  },
  "module-04": {
    "tagline": "Перше «вау»",
    "description": "Output, шаблони Kill/CP/монети/двері/телепорт/меню. Артефакт: іскровий двір.",
    "learningOutcomes": [
      "Читати Output",
      "Вставляти й кастомізувати шаблони",
      "Зібрати 5+ механік у loop"
    ],
    "phase": "B"
  },
  "module-05": {
    "tagline": "Пишемо самі",
    "description": "local, number/string/boolean, Part через змінну, Vector3. Проєкт: Пульт кольору.",
    "learningOutcomes": [
      "Створювати local змінні",
      "Змінювати Properties з коду",
      "Зібрати Пульт кольору"
    ],
    "phase": "C"
  },
  "module-06": {
    "tagline": "Рішення в коді",
    "description": "Порівняння, if/elseif/else, Touched+умова, прапорці. Проєкт: VIP-двері.",
    "learningOutcomes": [
      "Писати порівняння і if",
      "Фільтрувати Touched",
      "Зробити toggle/VIP логіку"
    ],
    "phase": "C"
  },
  "module-07": {
    "tagline": "Повтори й фабрика",
    "description": "for, while, спавн Parts, таймер, цикл+if. Проєкт: Фабрика блоків.",
    "learningOutcomes": [
      "Писати for і while",
      "Спавнити Parts безпечно",
      "Комбінувати цикл з if"
    ],
    "phase": "C"
  },
  "module-08": {
    "tagline": "Код як інструменти",
    "description": "function, параметри, return, Connect, ModuleScript, tables. Проєкт: інвентар + NPC.",
    "learningOutcomes": [
      "Писати функції з return",
      "Підключати події іменовано",
      "Використовувати таблиці й ModuleScript"
    ],
    "phase": "C"
  },
  "module-09": {
    "tagline": "Рівень своїм кодом",
    "description": "Дизайн маршруту, пастки-системою, CP, movers, фініш, таймер. Здача run.",
    "learningOutcomes": [
      "Зібрати playable obby",
      "Масштабувати пастки функціями",
      "Додати фініш і таймер"
    ],
    "phase": "D"
  },
  "module-10": {
    "tagline": "Прогресія чисел",
    "description": "Збір, Power, магазин, RemoteEvent GUI, мета. Артефакт: міні-симулятор.",
    "learningOutcomes": [
      "Звʼязати збір і Power",
      "Зробити серверні покупки",
      "Збалансувати сесію"
    ],
    "phase": "D"
  },
  "module-11": {
    "tagline": "База і економіка",
    "description": "Plot, dropper, collector, кнопки, апгрейди, rebirth, save lite.",
    "learningOutcomes": [
      "Побудувати drop→collect→cash",
      "Робити покупки на plot",
      "Додати rebirth або save"
    ],
    "phase": "D"
  },
  "module-12": {
    "tagline": "Інструменти в руках",
    "description": "Tool → урон → HP UI + магазин → арена з juice → здача.",
    "learningOutcomes": [
      "Створити Tool з дією",
      "Показати HP у GUI",
      "Продати Tool через whitelist"
    ],
    "phase": "D"
  },
  "module-13": {
    "tagline": "Доводимо до кінця",
    "description": "Пітч, vertical slice, Must, UX, publish+буст lite, freeze+Showcase Day.",
    "learningOutcomes": [
      "Довести гру до v1",
      "Пройти UX-чекліст",
      "Презентувати на Showcase"
    ],
    "phase": "E"
  }
}

export const ROBOX_MODULE_TITLE_UK = {
  "module-01": "01 — Робочий стіл будівельника",
  "module-02": "02 — Models, Union і будинок",
  "module-03": "03 — Світ, ландшафт і атмосфера",
  "module-04": "04 — Іскри: готовий код",
  "module-05": "05 — Змінні та типи",
  "module-06": "06 — Умови if / else",
  "module-07": "07 — Цикли",
  "module-08": "08 — Функції, події, таблиці",
  "module-09": "09 — Obby / платформер",
  "module-10": "10 — Симулятор",
  "module-11": "11 — Tycoon",
  "module-12": "12 — Tools і GUI",
  "module-13": "13 — Реліз і Showcase"
}

export const ROBOX_PHASES = [
  {
    "id": "A",
    "titleUk": "Студія і моделі",
    "modules": [1, 2, 3]
  },
  {
    "id": "B",
    "titleUk": "Іскри з кодом",
    "modules": [4]
  },
  {
    "id": "C",
    "titleUk": "Серйозний Lua",
    "modules": [5, 6, 7, 8]
  },
  {
    "id": "D",
    "titleUk": "Ігрові механіки",
    "modules": [9, 10, 11, 12]
  },
  {
    "id": "E",
    "titleUk": "Реліз",
    "modules": [13]
  }
]

export function enrichRobloxModules(modules) {
  return (modules || []).map((mod) => {
    const m = ROBOX_MODULE_META_UK[mod.moduleId] || {}
    return {
      ...mod,
      title: ROBOX_MODULE_TITLE_UK[mod.moduleId] || mod.title,
      tagline: m.tagline || '',
      description: m.description || mod.description,
      learningOutcomes: m.learningOutcomes || mod.learningOutcomes || [],
      phase: m.phase || null,
    }
  })
}
