/**
 * Module descriptions and learning outcomes for Roblox curriculum UI.
 * Keeps robloxCurriculum.js focused on structure/IDs.
 */

export const ROBOX_PHASES = [
  { id: 'A', titleUk: 'Основи Studio', modules: [1, 2, 3, 4] },
  { id: 'B', titleUk: 'Жанри', modules: [5, 6, 7, 8, 9] },
  { id: 'C', titleUk: 'Хаб і поліш', modules: [10, 11] },
  { id: 'D', titleUk: 'Реліз', modules: [12] },
]

export const ROBOX_MODULE_META_UK = {
  'module-01': {
    tagline: 'Старт творця',
    description:
      'Інструменти Studio, будинок з Union, Terrain, Properties, змінні, if, атмосфера і Party Mode.',
    learningOutcomes: [
      'Будувати з Parts, Move/Scale/Rotate і Union',
      'Працювати з Terrain і Properties',
      'Писати перші скрипти зі змінними та if',
    ],
    phase: 'A',
  },
  'module-02': {
    tagline: 'World craft',
    description:
      'Model, фізика, Weld/Hinge/Rope, атракціони та безпечна здача парку з Toolbox.',
    learningOutcomes: [
      'Групувати світ у Model і Folders',
      'Збирати двері й міст на Constraints',
      'Здати park-білд після playtest',
    ],
    phase: 'A',
  },
  'module-03': {
    tagline: 'Код, що грається',
    description:
      'ClickDetector, ProximityPrompt, Touched, while/for, functions і LocalScript з GUI.',
    learningOutcomes: [
      'Робити інтерактив і пастки з debounce',
      'Писати цикли та функції без копіпасти',
      'Розуміти Script vs LocalScript',
    ],
    phase: 'A',
  },
  'module-04': {
    tagline: 'Tables і дані',
    description:
      'Масиви, словники, інвентар, ModuleScript Config і перший DataStore.',
    learningOutcomes: [
      'Зберігати дані в table',
      'Виносити баланс у ModuleScript',
      'Зберігати прогрес через DataStore',
    ],
    phase: 'B',
  },
  'module-05': {
    tagline: 'Obby',
    description:
      'Повний obby-продукт: біоми, hazards, чекпоінти, баланс, juice і ship з Badge.',
    learningOutcomes: [
      'Зібрати прохідний obby на кілька зон',
      'Ітерувати складність після playtest',
      'Додати polish і здати рівень',
    ],
    phase: 'B',
  },
  'module-06': {
    tagline: 'Simulator',
    description:
      'Core loop, leaderstats, HUD, нагороди, Attributes, DataStore і ship симулятора.',
    learningOutcomes: [
      'Зробити робочі leaderstats',
      'Показати HUD на LocalScript',
      'Зберегти Coins/Power між сесіями',
    ],
    phase: 'B',
  },
  'module-07': {
    tagline: 'Tycoon',
    description:
      'Plot, дропер, покупки з leaderstats, апгрейди з table і здача міні-фабрики.',
    learningOutcomes: [
      'Зібрати ланцюжок дропер → колектор',
      'Робити покупки з перевіркою монет',
      'Масштабувати апгрейди через table',
    ],
    phase: 'C',
  },
  'module-08': {
    tagline: 'Arena',
    description:
      'Health, Tool, урон на сервері, Tween/Particles, хвилі ворогів і ship арени.',
    learningOutcomes: [
      'Керувати Humanoid і шкодою на сервері',
      'Додати зброю та візуальні ефекти',
      'Зібрати хвилі з waveConfig',
    ],
    phase: 'C',
  },
  'module-09': {
    tagline: 'Race + мережа',
    description:
      'Машина, кола, client/server, RemoteEvent, лідерборд і анти-чит playtest.',
    learningOutcomes: [
      'Зібрати трасу й таймер кіл',
      'Пояснити клієнт vs сервер',
      'Надіслати чесний сигнал через RemoteEvent',
    ],
    phase: 'D',
  },
  'module-10': {
    tagline: 'Живий хаб',
    description:
      'Магазин на Remotes, NPC, Pathfinding, квести, інвентар і Raycast-пазл.',
    learningOutcomes: [
      'Зробити безпечний магазин RemoteEvent/Function',
      'Додати NPC з діалогом і квестом',
      'Зібрати хаб до здачі',
    ],
    phase: 'D',
  },
  'module-11': {
    tagline: 'Polish',
    description:
      'Аудит Explorer, loading screen, juice, оптимізація/UX, Demo Ready і сліпий playtest.',
    learningOutcomes: [
      'Навести лад у проєкті',
      'Підняти відчуття гри (звук/VFX/UX)',
      'Підготувати demo до релізу',
    ],
    phase: 'D',
  },
  'module-12': {
    tagline: 'Реліз',
    description:
      'Пітч і MVP, збірка з TeleportService, тест-план, Publish, портфоліо і SHOWCASE DAY.',
    learningOutcomes: [
      'Спланувати й зібрати фіналку',
      'Протестувати та опублікувати',
      'Провести фінальний showcase',
    ],
    phase: 'E',
  },
}

export const ROBOX_MODULE_META_EN = {
  'module-01': {
    tagline: 'Creator start',
    description:
      'Studio tools, Union house, Terrain, Properties, variables, if, atmosphere, and Party Mode.',
    learningOutcomes: [
      'Build with Parts, Move/Scale/Rotate, and Union',
      'Work with Terrain and Properties',
      'Write first scripts with variables and if',
    ],
  },
  'module-02': {
    tagline: 'World craft',
    description:
      'Models, physics, Weld/Hinge/Rope, rides, and a safe Toolbox park handoff.',
    learningOutcomes: [
      'Organize the world with Models and Folders',
      'Build gates and bridges with constraints',
      'Ship a playtested park build',
    ],
  },
  'module-03': {
    tagline: 'Playable code',
    description:
      'ClickDetector, ProximityPrompt, Touched, while/for, functions, and LocalScript GUI.',
    learningOutcomes: [
      'Build interactives and hazards with debounce',
      'Write loops and functions without copy-paste',
      'Tell Script vs LocalScript apart',
    ],
  },
  'module-04': {
    tagline: 'Tables & data',
    description:
      'Arrays, dictionaries, inventory, ModuleScript config, and first DataStore.',
    learningOutcomes: [
      'Store data in tables',
      'Move balance into ModuleScript',
      'Save progress with DataStore',
    ],
  },
  'module-05': {
    tagline: 'Obby',
    description:
      'Full obby product: biomes, hazards, checkpoints, balance, juice, and Badge ship.',
    learningOutcomes: [
      'Build a multi-zone completable obby',
      'Iterate difficulty after playtest',
      'Polish and ship the level',
    ],
  },
  'module-06': {
    tagline: 'Simulator',
    description:
      'Core loop, leaderstats, HUD, rewards, Attributes, DataStore, and sim ship.',
    learningOutcomes: [
      'Create working leaderstats',
      'Show a LocalScript HUD',
      'Save Coins/Power between sessions',
    ],
  },
  'module-07': {
    tagline: 'Tycoon',
    description:
      'Plot, dropper, leaderstats purchases, table upgrades, and mini-factory ship.',
    learningOutcomes: [
      'Chain dropper → collector',
      'Handle coin-checked purchases',
      'Scale upgrades with tables',
    ],
  },
  'module-08': {
    tagline: 'Arena',
    description:
      'Health, Tools, server damage, Tween/Particles, enemy waves, and arena ship.',
    learningOutcomes: [
      'Control Humanoid and server-side damage',
      'Add weapons and VFX',
      'Build waves from waveConfig',
    ],
  },
  'module-09': {
    tagline: 'Race + networking',
    description:
      'Car, laps, client/server, RemoteEvent, leaderboard, and anti-cheat playtest.',
    learningOutcomes: [
      'Build a track and lap timer',
      'Explain client vs server',
      'Send a fair finish via RemoteEvent',
    ],
  },
  'module-10': {
    tagline: 'Living hub',
    description:
      'Remote shop, NPCs, Pathfinding, quests, inventory, and Raycast puzzle.',
    learningOutcomes: [
      'Build a secure RemoteEvent/Function shop',
      'Add NPC dialogue and quests',
      'Ship an integrated hub',
    ],
  },
  'module-11': {
    tagline: 'Polish',
    description:
      'Explorer audit, loading screen, juice, UX/perf, Demo Ready, and blind playtest.',
    learningOutcomes: [
      'Keep the project organized',
      'Raise game feel (SFX/VFX/UX)',
      'Prepare a release-ready demo',
    ],
  },
  'module-12': {
    tagline: 'Release',
    description:
      'Pitch & MVP, final build with TeleportService, test plan, Publish, portfolio, SHOWCASE DAY.',
    learningOutcomes: [
      'Plan and assemble a final game',
      'Test and publish to Roblox',
      'Deliver a final showcase',
    ],
  },
}

export const ROBOX_MODULE_TITLE_UK = {}

export const ROBOX_MODULE_TITLE_EN = {}

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
