/**
 * Module descriptions and learning outcomes for Unity curriculum UI.
 * Keeps unityCurriculum.js focused on structure/IDs.
 */

export const UNITY_PHASES = [
  { id: 'A', titleUk: 'Основи Unity та C#', modules: [1, 2] },
  { id: 'B', titleUk: 'Геймплей', modules: [3, 4, 5] },
  { id: 'C', titleUk: 'Світ гри', modules: [6, 7] },
  { id: 'D', titleUk: 'Реліз', modules: [8] },
]

export const UNITY_MODULE_META_UK = {
  'module-01': {
    tagline: 'Старт у Unity',
    description:
      'Unity Hub, встановлення редактора, карта інтерфейсу, перші GameObject і примітиви, Materials/Light/Camera.',
    learningOutcomes: [
      'Встановлювати Unity Hub і створювати проєкти',
      'Впевнено орієнтуватись у Scene, Hierarchy, Inspector, Project',
      'Збирати просту сцену з примітивів, матеріалів і світла',
    ],
    phase: 'A',
  },
  'module-02': {
    tagline: 'C# основи',
    description:
      'MonoBehaviour, Start/Update, змінні та SerializeField, умови й Input, методи та GetComponent.',
    learningOutcomes: [
      'Писати перші скрипти C# на MonoBehaviour',
      'Виводити змінні в Inspector через SerializeField',
      'Керувати об’єктом клавіатурою через Input і GetComponent',
    ],
    phase: 'A',
  },
  'module-03': {
    tagline: 'Фізика',
    description:
      'Rigidbody і гравітація, Colliders, OnCollisionEnter/OnTriggerEnter, Prefabs та Instantiate.',
    learningOutcomes: [
      'Керувати фізичними об’єктами через Rigidbody',
      'Розрізняти зіткнення й тригери в коді',
      'Створювати об’єкти під час гри через Prefab + Instantiate',
    ],
    phase: 'B',
  },
  'module-04': {
    tagline: 'Гравець',
    description:
      'Рух персонажа, камера-слідкувач, стрибок з ground check, базова анімація через Animator.',
    learningOutcomes: [
      'Зробити плавний рух і камеру від третьої особи',
      'Реалізувати стрибок без «подвійних стрибків у повітрі»',
      'Підключити Animator і переходи між станами',
    ],
    phase: 'B',
  },
  'module-05': {
    tagline: 'UI і цикл гри',
    description:
      'Canvas/Text/Button, HUD рахунку, здоров’я гравця, меню паузи й рестарт — повний ігровий цикл.',
    learningOutcomes: [
      'Будувати UI на Canvas і оновлювати текст із коду',
      'Показувати рахунок і здоров’я в реальному часі',
      'Зібрати паузу, game over і рестарт у один цикл',
    ],
    phase: 'B',
  },
  'module-06': {
    tagline: 'Рівень і вороги',
    description:
      'Блокаут рівня, спавн ворогів, проста AI на waypoints, звук через AudioSource.',
    learningOutcomes: [
      'Спроєктувати прохідний рівень із блокаутом',
      'Спавнити ворогів і керувати їх найпростішою AI',
      'Додати звукові ефекти й музику через AudioSource',
    ],
    phase: 'C',
  },
  'module-07': {
    tagline: 'Поліш і білд',
    description:
      'Particle System, ScriptableObjects для даних, LoadScene між рівнями, Build Settings і перша збірка.',
    learningOutcomes: [
      'Додавати візуальний поліш через Particle System',
      'Виносити дані в ScriptableObject окремо від логіки',
      'Зібрати гру у виконуваний файл через Build Settings',
    ],
    phase: 'C',
  },
  'module-08': {
    tagline: 'Фінальний проєкт',
    description:
      'GDD, core loop, поліш контенту, плейтест і виправлення багів, фінальний реліз і портфоліо.',
    learningOutcomes: [
      'Скласти короткий GDD і спланувати core loop',
      'Провести плейтест і виправити знайдені баги',
      'Випустити фінальну збірку і оформити портфоліо',
    ],
    phase: 'D',
  },
}

export const UNITY_MODULE_META_EN = {
  'module-01': {
    tagline: 'Unity start',
    description:
      'Unity Hub, editor install, interface map, first GameObjects and primitives, Materials/Light/Camera.',
    learningOutcomes: [
      'Install Unity Hub and create projects',
      'Navigate Scene, Hierarchy, Inspector, and Project confidently',
      'Assemble a simple scene from primitives, materials, and light',
    ],
  },
  'module-02': {
    tagline: 'C# basics',
    description:
      'MonoBehaviour, Start/Update, variables and SerializeField, conditionals and Input, methods and GetComponent.',
    learningOutcomes: [
      'Write first C# scripts on MonoBehaviour',
      'Expose variables in the Inspector via SerializeField',
      'Control an object with keyboard input and GetComponent',
    ],
  },
  'module-03': {
    tagline: 'Physics',
    description:
      'Rigidbody and gravity, Colliders, OnCollisionEnter/OnTriggerEnter, Prefabs and Instantiate.',
    learningOutcomes: [
      'Drive physical objects with Rigidbody',
      'Tell collisions and triggers apart in code',
      'Spawn objects at runtime with Prefab + Instantiate',
    ],
  },
  'module-04': {
    tagline: 'Player',
    description:
      'Character movement, follow camera, jump with ground check, basic Animator-driven animation.',
    learningOutcomes: [
      'Build smooth movement and a third-person follow camera',
      'Implement a jump without mid-air double jumps',
      'Wire up Animator states and transitions',
    ],
  },
  'module-05': {
    tagline: 'UI & game loop',
    description:
      'Canvas/Text/Button, score HUD, player health, pause menu and restart — a complete game loop.',
    learningOutcomes: [
      'Build UI on a Canvas and update text from code',
      'Show live score and health',
      'Assemble pause, game over, and restart into one loop',
    ],
  },
  'module-06': {
    tagline: 'Level & enemies',
    description:
      'Level blockout, enemy spawning, simple waypoint AI, sound via AudioSource.',
    learningOutcomes: [
      'Design a completable level blockout',
      'Spawn enemies and drive basic AI',
      'Add sound effects and music through AudioSource',
    ],
  },
  'module-07': {
    tagline: 'Polish & build',
    description:
      'Particle System, ScriptableObjects for data, LoadScene between levels, Build Settings and first build.',
    learningOutcomes: [
      'Add visual polish with Particle System',
      'Move data into ScriptableObjects separate from logic',
      'Produce a runnable build via Build Settings',
    ],
  },
  'module-08': {
    tagline: 'Final project',
    description:
      'GDD, core loop, content polish, playtesting and bug fixing, final release and portfolio.',
    learningOutcomes: [
      'Write a short GDD and plan a core loop',
      'Run a playtest and fix the bugs found',
      'Ship a final build and put together a portfolio',
    ],
  },
}

export const UNITY_MODULE_TITLE_UK = {}

export const UNITY_MODULE_TITLE_EN = {}

export function enrichUnityModules(modules, locale = 'uk') {
  const metaMap = locale === 'en' ? UNITY_MODULE_META_EN : UNITY_MODULE_META_UK
  const titleOverrides = locale === 'en' ? UNITY_MODULE_TITLE_EN : UNITY_MODULE_TITLE_UK

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
