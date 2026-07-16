import { robloxCurriculum } from './robloxCurriculum'
import { enrichRobloxModules, ROBOX_MODULE_TITLE_EN } from './robloxModuleMeta'

const EN_MODULE_TITLES = {
  "module-01": "01 — Builder Desk",
  "module-02": "02 — Models, Unions & House",
  "module-03": "03 — World, Terrain & Atmosphere",
  "module-04": "04 — Sparks: Ready-Made Code",
  "module-05": "05 — Variables and Types",
  "module-06": "06 — Conditionals if / else",
  "module-07": "07 — Loops",
  "module-08": "08 — Functions, Events, Tables",
  "module-09": "09 — Obby / Platformer",
  "module-10": "10 — Simulator",
  "module-11": "11 — Tycoon",
  "module-12": "12 — Tools & GUI",
  "module-13": "13 — Release & Showcase"
}

const EN_LESSON_TITLES = {
  "lesson-roblox-1-1": "1.1 — Welcome to Studio",
  "lesson-roblox-1-2": "1.2 — Camera and first path",
  "lesson-roblox-1-3": "1.3 — Explorer: world order",
  "lesson-roblox-1-4": "1.4 — Parts and Properties",
  "lesson-roblox-1-5": "1.5 — Move, Scale, Rotate + Snap",
  "lesson-roblox-1-6": "1.6 — Building the yard: composition",
  "lesson-roblox-1-7": "1.7 — Workspace and Storage",
  "lesson-roblox-1-8": "1.8 — Checkpoint: My first yard",
  "lesson-roblox-2-1": "2.1 — Model or Folder?",
  "lesson-roblox-2-2": "2.2 — PrimaryPart",
  "lesson-roblox-2-3": "2.3 — Union: merge Parts",
  "lesson-roblox-2-4": "2.4 — NegatePart: cut a window",
  "lesson-roblox-2-5": "2.5 — Separate and repair Unions",
  "lesson-roblox-2-6": "2.6 — Pivot and roof assembly",
  "lesson-roblox-2-7": "2.7 — Decals and facade",
  "lesson-roblox-2-8": "2.8 — Checkpoint: house with windows",
  "lesson-roblox-3-1": "3.1 — Terrain Editor: first land",
  "lesson-roblox-3-2": "3.2 — Terrain materials and biome",
  "lesson-roblox-3-3": "3.3 — Lighting and Atmosphere",
  "lesson-roblox-3-4": "3.4 — Sky and location postcard",
  "lesson-roblox-3-5": "3.5 — Zone sound",
  "lesson-roblox-3-6": "3.6 — Checkpoint: living world",
  "lesson-roblox-4-1": "4.1 — Output, Script and print",
  "lesson-roblox-4-2": "4.2 — Kill brick (ready Touched)",
  "lesson-roblox-4-3": "4.3 — Checkpoint",
  "lesson-roblox-4-4": "4.4 — Coins and leaderstats",
  "lesson-roblox-4-5": "4.5 — Doors with ClickDetector",
  "lesson-roblox-4-6": "4.6 — Teleport",
  "lesson-roblox-4-7": "4.7 — Fading platform",
  "lesson-roblox-4-8": "4.8 — Simple ScreenGui menu",
  "lesson-roblox-4-9": "4.9 — Build: Spark yard",
  "lesson-roblox-4-10": "4.10 — Presentation: living game",
  "lesson-roblox-5-1": "5.1 — What is a variable",
  "lesson-roblox-5-2": "5.2 — Types: number, string, boolean",
  "lesson-roblox-5-3": "5.3 — Variable points to a Part",
  "lesson-roblox-5-4": "5.4 — Number logic and score",
  "lesson-roblox-5-5": "5.5 — Vector3: size and position",
  "lesson-roblox-5-6": "5.6 — Project: Color Console",
  "lesson-roblox-6-1": "6.1 — Comparisons and booleans",
  "lesson-roblox-6-2": "6.2 — if then end",
  "lesson-roblox-6-3": "6.3 — else and elseif",
  "lesson-roblox-6-4": "6.4 — Touched + if: zones",
  "lesson-roblox-6-5": "6.5 — Flags and ClickDetector",
  "lesson-roblox-6-6": "6.6 — Project: VIP / password doors",
  "lesson-roblox-7-1": "7.1 — Why loops + for",
  "lesson-roblox-7-2": "7.2 — for and Part spawn",
  "lesson-roblox-7-3": "7.3 — while and safety",
  "lesson-roblox-7-4": "7.4 — In-game timer",
  "lesson-roblox-7-5": "7.5 — Loop + if: filter",
  "lesson-roblox-7-6": "7.6 — Project: Brick Factory",
  "lesson-roblox-8-1": "8.1 — What is a function",
  "lesson-roblox-8-2": "8.2 — Parameters",
  "lesson-roblox-8-3": "8.3 — return",
  "lesson-roblox-8-4": "8.4 — Events: function as reaction",
  "lesson-roblox-8-5": "8.5 — ModuleScript intro",
  "lesson-roblox-8-6": "8.6 — Tables: lists",
  "lesson-roblox-8-7": "8.7 — Dictionaries + NPC dialog",
  "lesson-roblox-8-8": "8.8 — Project: inventory + NPC",
  "lesson-roblox-9-1": "9.1 — Obby route design",
  "lesson-roblox-9-2": "9.2 — Hazards with functions",
  "lesson-roblox-9-3": "9.3 — Checkpoint system",
  "lesson-roblox-9-4": "9.4 — Moving platforms",
  "lesson-roblox-9-5": "9.5 — Finish and victory",
  "lesson-roblox-9-6": "9.6 — Run timer",
  "lesson-roblox-9-7": "9.7 — Balance and polish",
  "lesson-roblox-9-8": "9.8 — Checkpoint: Obby presentation",
  "lesson-roblox-10-1": "10.1 — Simulator genre core",
  "lesson-roblox-10-2": "10.2 — Collecting and Power",
  "lesson-roblox-10-3": "10.3 — Shop: prices and canAfford",
  "lesson-roblox-10-4": "10.4 — Shop UI + RemoteEvent",
  "lesson-roblox-10-5": "10.5 — Multiplier and goal",
  "lesson-roblox-10-6": "10.6 — Checkpoint: simulator presentation",
  "lesson-roblox-11-1": "11.1 — Plot: my base",
  "lesson-roblox-11-2": "11.2 — Dropper",
  "lesson-roblox-11-3": "11.3 — Collector",
  "lesson-roblox-11-4": "11.4 — Purchase buttons",
  "lesson-roblox-11-5": "11.5 — Income upgrades",
  "lesson-roblox-11-6": "11.6 — Rebirth lite",
  "lesson-roblox-11-7": "11.7 — Saving progress",
  "lesson-roblox-11-8": "11.8 — Checkpoint: Tycoon presentation",
  "lesson-roblox-12-1": "12.1 — What is a Tool",
  "lesson-roblox-12-2": "12.2 — Activated: tool acts",
  "lesson-roblox-12-3": "12.3 — Damage and Humanoid",
  "lesson-roblox-12-4": "12.4 — HP GUI + Tools shop",
  "lesson-roblox-12-5": "12.5 — Arena build + juice",
  "lesson-roblox-12-6": "12.6 — Checkpoint: Tools presentation",
  "lesson-roblox-13-1": "13.1 — Pitch and genre pick",
  "lesson-roblox-13-2": "13.2 — Vertical slice",
  "lesson-roblox-13-3": "13.3 — Must #2 and #3",
  "lesson-roblox-13-4": "13.4 — Bugfix and UX pass",
  "lesson-roblox-13-5": "13.5 — Publish + GamePass/Badge lite",
  "lesson-roblox-13-6": "13.6 — Feature freeze + Showcase Day"
}

const EN_COURSE_TITLE = "Roblox Studio: From Your First Part to Your Own Game"

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
