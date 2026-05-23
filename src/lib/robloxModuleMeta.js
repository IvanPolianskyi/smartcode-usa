/**
 * Module descriptions and learning outcomes for Roblox curriculum UI.
 * Keeps robloxCurriculum.js focused on structure/IDs.
 */

export const ROBOX_MODULE_META_UK = {
  'module-01': {
    tagline: 'Старт у Studio',
    description:
      'Відкрий Roblox Studio, збудуй острів, додай клік, звук і атмосферу. Урок 1.6 закріплює основи програмування перед obby.',
    learningOutcomes: [
      'Орієнтуватися в Studio та Explorer',
      'Створювати й налаштовувати Parts',
      'Підключати ClickDetector, змінні, if і print',
    ],
  },
  'module-02': {
    tagline: 'Obby',
    description:
      'Збери повноцінний паркур: пастки, чекпоінти, таймер, умови if/else та екран перемоги.',
    learningOutcomes: [
      'Робити небезпечні зони та респавн',
      'Писати прості умови в Lua',
      'Завершити цілісний obby-рівень',
    ],
  },
  'module-03': {
    tagline: 'Симулятор',
    description:
      'Монети, збір, рахунок на екрані, функції та збереження прогресу між сесіями.',
    learningOutcomes: [
      'Збирати предмети через Touched',
      'Показувати рахунок у leaderstats і UI',
      'Зберігати дані в DataStore',
    ],
  },
  'module-04': {
    tagline: 'Tycoon',
    description:
      'Економіка тайкуну: дропер, кнопки покупок, апгрейди та окрема ділянка кожному гравцю.',
    learningOutcomes: [
      'Будувати ланцюжок дропер → колектор',
      'Робити покупки за ігрову валюту',
      'Масштабувати базу через таблиці',
    ],
  },
  'module-05': {
    tagline: 'Арена',
    description:
      'Бійцівський клуб: здоров\'я, меч, урон, TweenService та респавн у PvE-арені.',
    learningOutcomes: [
      'Керувати Humanoid і шкодою',
      'Додавати зброю та візуальні ефекти',
      'Збалансувати бій і смерть гравця',
    ],
  },
  'module-06': {
    tagline: 'Гонки',
    description:
      'Машина, трасса, таймер і кола. У кінці модуля - перший досвід RemoteEvent для чесного мультиплеєру.',
    learningOutcomes: [
      'Зібрати авто на VehicleSeat',
      'Рахувати кола та час',
      'Зв\'язати клієнт і сервер через RemoteEvent',
    ],
  },
  'module-07': {
    tagline: 'Мережа та магазин',
    description:
      'Клієнт і сервер, RemoteEvent і RemoteFunction, безпечний магазин з UI. Поглиблює тему з гонок.',
    learningOutcomes: [
      'Розділяти логіку клієнта й сервера',
      'Будувати магазин із перевіркою на сервері',
      'Захищати гру від читерства',
    ],
  },
  'module-08': {
    tagline: 'NPC і квести',
    description:
      'Живі NPC: діалоги, патруль, квести та ворог, який атакує.',
    learningOutcomes: [
      'Створити NPC з діалогами',
      'Запустити просту квест-систему',
      'Додати ворога з AI-атакою',
    ],
  },
  'module-09': {
    tagline: 'RPG-системи',
    description:
      'ModuleScript, інвентар, екіпіровка та збереження прогресу в стилі RPG.',
    learningOutcomes: [
      'Організувати код у ModuleScript',
      'Зберігати інвентар у таблицях',
      'Серіалізувати дані гравця',
    ],
  },
  'module-10': {
    tagline: 'Головоломки',
    description:
      'Constraints, raycast, лазерні пастки та процедурні елементи для складніших рівнів.',
    learningOutcomes: [
      'Використовувати фізичні зв\'язки',
      'Будувати пазли з Raycast',
      'Підсилити гру візуальними деталями',
    ],
  },
  'module-11': {
    tagline: 'Поліш',
    description:
      'Чистий проєкт, екран завантаження, звук, оптимізація та зручність для гравця.',
    learningOutcomes: [
      'Прибирати зайве в Explorer',
      'Покращувати UX і продуктивність',
      'Готувати гру до публікації',
    ],
  },
  'module-12': {
    tagline: 'Реліз',
    description:
      'Фінальний проєкт: план, збірка, тести, публікація, портфоліо та showcase.',
    learningOutcomes: [
      'Спланувати власну гру',
      'Протестувати та опублікувати',
      'Оформити роботу в портфоліо',
    ],
  },
}

export const ROBOX_MODULE_META_EN = {
  'module-01': {
    tagline: 'Studio start',
    description:
      'Open Roblox Studio, build an island, add clicks, sound, and atmosphere. Lesson 1.6 reinforces programming basics before the obby.',
    learningOutcomes: [
      'Navigate Studio and Explorer',
      'Create and tune Parts',
      'Wire ClickDetector, variables, if, and print',
    ],
  },
  'module-02': {
    tagline: 'Obby',
    description:
      'Build a full obstacle course: traps, checkpoints, timer, if/else, and a victory screen.',
    learningOutcomes: [
      'Create hazards and respawn',
      'Write simple Lua conditions',
      'Ship a complete obby level',
    ],
  },
  'module-03': {
    tagline: 'Simulator',
    description:
      'Coins, collection, on-screen score, functions, and saving progress between sessions.',
    learningOutcomes: [
      'Collect items with Touched',
      'Show score in leaderstats and UI',
      'Save data with DataStore',
    ],
  },
  'module-04': {
    tagline: 'Tycoon',
    description:
      'Tycoon economy: dropper, purchase buttons, upgrades, and a plot for every player.',
    learningOutcomes: [
      'Chain dropper → collector',
      'Handle purchases with currency',
      'Scale bases with tables',
    ],
  },
  'module-05': {
    tagline: 'Arena',
    description:
      'Fighting club: health, sword, damage, TweenService, and respawn in a PvE arena.',
    learningOutcomes: [
      'Control Humanoid and damage',
      'Add weapons and visual effects',
      'Balance combat and death',
    ],
  },
  'module-06': {
    tagline: 'Racing',
    description:
      'Car, track, timer, and laps. Ends with your first RemoteEvent for fair multiplayer racing.',
    learningOutcomes: [
      'Build a VehicleSeat car',
      'Track laps and race time',
      'Connect client and server with RemoteEvent',
    ],
  },
  'module-07': {
    tagline: 'Network & shop',
    description:
      'Client vs server, RemoteEvent and RemoteFunction, and a secure shop UI. Goes deeper than the racing teaser.',
    learningOutcomes: [
      'Separate client and server logic',
      'Build a server-validated shop',
      'Protect the game from exploits',
    ],
  },
  'module-08': {
    tagline: 'NPCs & quests',
    description:
      'Living NPCs: dialogue, patrol paths, quests, and an enemy that attacks.',
    learningOutcomes: [
      'Create NPCs with dialogue',
      'Run a simple quest system',
      'Add an attacking enemy',
    ],
  },
  'module-09': {
    tagline: 'RPG systems',
    description:
      'ModuleScript, inventory, gear, and saving RPG-style player progress.',
    learningOutcomes: [
      'Organize code with ModuleScript',
      'Store inventory in tables',
      'Serialize player data',
    ],
  },
  'module-10': {
    tagline: 'Puzzles',
    description:
      'Constraints, raycasting, laser traps, and procedural elements for advanced levels.',
    learningOutcomes: [
      'Use physics constraints',
      'Build puzzles with Raycast',
      'Level up visuals and mechanics',
    ],
  },
  'module-11': {
    tagline: 'Polish',
    description:
      'Clean project, loading screen, sound design, optimization, and player-friendly UX.',
    learningOutcomes: [
      'Keep Explorer organized',
      'Improve UX and performance',
      'Prepare the game for release',
    ],
  },
  'module-12': {
    tagline: 'Release',
    description:
      'Capstone: plan, assemble, test, publish, portfolio, and showcase day.',
    learningOutcomes: [
      'Plan your own game',
      'Test and publish to Roblox',
      'Present work in a portfolio',
    ],
  },
}

export const ROBOX_MODULE_TITLE_UK = {
  'module-07': '07 - Мережа та магазин',
}

export const ROBOX_MODULE_TITLE_EN = {
  'module-07': '07 - Network & Shop',
}

export function enrichRobloxModules(modules, locale = 'uk') {
  const metaMap = locale === 'en' ? ROBOX_MODULE_META_EN : ROBOX_MODULE_META_UK
  const titleOverrides = locale === 'en' ? ROBOX_MODULE_TITLE_EN : ROBOX_MODULE_TITLE_UK

  return modules.map((m) => {
    const meta = metaMap[m.moduleId] || {}
    return {
      ...m,
      title: titleOverrides[m.moduleId] || m.title,
      description: meta.description || m.description,
      tagline: meta.tagline,
      learningOutcomes:
        meta.learningOutcomes?.length > 0
          ? meta.learningOutcomes
          : m.learningOutcomes,
    }
  })
}
