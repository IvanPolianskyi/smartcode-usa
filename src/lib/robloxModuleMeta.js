/**
 * Module descriptions and learning outcomes for Roblox curriculum UI.
 * Keeps robloxCurriculum.js focused on structure/IDs.
 */

export const ROBOX_PHASES = [
  { id: 'A', titleUk: 'Основи Studio', modules: [1, 2, 3] },
  { id: 'B', titleUk: 'Ігрові жанри', modules: [4, 5, 6] },
  { id: 'C', titleUk: 'Мережа і світ', modules: [7, 8] },
  { id: 'D', titleUk: 'Системи і поліш', modules: [9, 10, 11] },
  { id: 'E', titleUk: 'Реліз', modules: [12] },
]

export const ROBOX_MODULE_META_UK = {
  'module-01': {
    tagline: 'Старт творця',
    description:
      'Studio й будинок з Union, повний Terrain, змінні та if, оздоба, Lighting/Sound, Party Mode і checkpoint живої локації.',
    learningOutcomes: [
      'Будувати з Parts, Move/Scale/Rotate, Negate+Union',
      'Ліпити острів у Terrain Editor',
      'Писати перші скрипти зі змінними, if і Party Mode',
    ],
    phase: 'A',
  },
  'module-02': {
    tagline: 'World craft',
    description:
      'Штаб острова на Model, рухомі з’єднання Constraints, атракціони парку й гігієна Toolbox перед здачею Park_v1.',
    learningOutcomes: [
      'Збирати Model з PrimaryPart, Pivot і Folder',
      'Ставити Weld/Hinge/Rope для дверей і мостів',
      'Здати парк після аудиту Free Model і playtest',
    ],
    phase: 'A',
  },
  'module-03': {
    tagline: 'Код, що грається',
    description:
      'Взаємодія Click/Prompt, Touched і чекпоінти, цикли while/for, functions, LocalScript+GUI і здача міні-гри.',
    learningOutcomes: [
      'Відкривати двері й підказки через ClickDetector і ProximityPrompt',
      'Писати Touched, while/for і функції без хаосу',
      'Зібрати міні-гру з GUI на LocalScript',
    ],
    phase: 'A',
  },
  'module-04': {
    tagline: 'Tables і дані',
    description:
      'Масиви й словники, ModuleScript Config, DataStore lite і data-driven вітрина поверх навичок M3.',
    learningOutcomes: [
      'Тримати списки й прайси в table',
      'Виносити Config у ModuleScript через require',
      'Зберегти й завантажити table через DataStore lite',
    ],
    phase: 'B',
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
    phase: 'B',
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
    phase: 'B',
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
    phase: 'C',
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
    phase: 'C',
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
    phase: 'D',
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
    phase: 'D',
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
    phase: 'D',
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
    phase: 'E',
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
    tagline: 'World craft',
    description:
      'Island HQ with Model/Pivot, park gate Constraints, rides, and Toolbox hygiene for Park_v1.',
    learningOutcomes: [
      'Assemble Models with PrimaryPart and Folders',
      'Use Weld/Hinge/Rope for doors and bridges',
      'Ship a park after Free Model audit and playtest',
    ],
  },
  'module-03': {
    tagline: 'Playable code',
    description:
      'Click/Prompt interaction, Touched, checkpoints, while/for, functions, LocalScript GUI, and a mini-game handoff.',
    learningOutcomes: [
      'Open doors and hints with ClickDetector and ProximityPrompt',
      'Write Touched, while/for, and functions cleanly',
      'Ship a mini-game with LocalScript GUI',
    ],
  },
  'module-04': {
    tagline: 'Tables & data',
    description:
      'Arrays and dictionaries, ModuleScript Config, DataStore lite, and a data-driven shop showcase on top of M3 skills.',
    learningOutcomes: [
      'Keep lists and prices in tables',
      'Move Config into a ModuleScript with require',
      'Save and load a table with DataStore lite',
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
      phase: meta.phase || null,
      learningOutcomes:
        meta.learningOutcomes?.length > 0
          ? meta.learningOutcomes
          : m.learningOutcomes,
    }
  })
}
