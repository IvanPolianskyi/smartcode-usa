import { robloxCurriculum } from './robloxCurriculum'
import { enrichRobloxModules } from './robloxModuleMeta'

const EN_MODULE_TITLES = {
  'module-01': '01 - My First World',
  'module-02': '02 - Danger Zone',
  'module-03': '03 - A Game That Remembers You',
  'module-04': '04 - Empire Builder',
  'module-05': '05 - Fighting Club',
  'module-06': '06 - Faster, Higher, Further',
  'module-07': '07 - Network & Shop',
  'module-08': '08 - Smart Game',
  'module-09': '09 - Systems Architect',
  'module-10': '10 - Magic of Details',
  'module-11': '11 - Performance & Polish',
  'module-12': '12 - Release Day',
}

const EN_LESSON_TITLES = {
  'lesson-roblox-1-1': '1.1 - Welcome to Studio',
  'lesson-roblox-1-2': '1.2 - Building an Island',
  'lesson-roblox-1-3': '1.3 - Objects and Properties',
  'lesson-roblox-1-4': '1.4 - First Magic: ClickDetector',
  'lesson-roblox-1-5': '1.5 - Sound and Atmosphere',
  'lesson-roblox-1-6': '1.6 - Checkpoint: The Island Lives',
  'lesson-roblox-2-1': '2.1 - Kill Blocks',
  'lesson-roblox-2-2': '2.2 - Checkpoints',
  'lesson-roblox-2-3': '2.3 - Level Timer',
  'lesson-roblox-2-4': '2.4 - if/else Conditions',
  'lesson-roblox-2-5': '2.5 - Victory Screen',
  'lesson-roblox-2-6': '2.6 - Checkpoint: Obby Ready',
  'lesson-roblox-3-1': '3.1 - Coins on the Map',
  'lesson-roblox-3-2': '3.2 - Collecting Coins',
  'lesson-roblox-3-3': '3.3 - Score on Screen + leaderstats',
  'lesson-roblox-3-4': '3.4 - Functions',
  'lesson-roblox-3-5': '3.5 - DataStore: Memory Between Sessions',
  'lesson-roblox-3-6': '3.6 - Checkpoint: Coin Simulator',
  'lesson-roblox-4-1': '4.1 - Tycoon Architecture',
  'lesson-roblox-4-2': '4.2 - Coin Dropper',
  'lesson-roblox-4-3': '4.3 - Purchase Button',
  'lesson-roblox-4-4': '4.4 - Tables and Upgrades',
  'lesson-roblox-4-5': '4.5 - A Plot for Every Player',
  'lesson-roblox-4-6': '4.6 - Checkpoint: Tycoon Works',
  'lesson-roblox-5-1': '5.1 - Humanoid and Health',
  'lesson-roblox-5-2': '5.2 - Weapons - First Sword',
  'lesson-roblox-5-3': '5.3 - Damage System',
  'lesson-roblox-5-4': '5.4 - TweenService: Smooth Effects',
  'lesson-roblox-5-5': '5.5 - Death and Respawn',
  'lesson-roblox-5-6': '5.6 - Checkpoint: Arena Ready',
  'lesson-roblox-6-1': '6.1 - Car from Scratch',
  'lesson-roblox-6-2': '6.2 - Race Track',
  'lesson-roblox-6-3': '6.3 - Race Timer',
  'lesson-roblox-6-4': '6.4 - Client-Server: First Look',
  'lesson-roblox-6-5': '6.5 - Laps and Leaderboard',
  'lesson-roblox-6-6': '6.6 - Checkpoint: Race Launched',
  'lesson-roblox-7-1': '7.1 - Two Worlds: Client and Server',
  'lesson-roblox-7-2': '7.2 - RemoteEvent',
  'lesson-roblox-7-3': '7.3 - Shop: UI Part',
  'lesson-roblox-7-4': '7.4 - Shop: Server Logic',
  'lesson-roblox-7-5': '7.5 - RemoteFunction',
  'lesson-roblox-7-6': '7.6 - Checkpoint: Shop Works',
  'lesson-roblox-8-1': '8.1 - Living NPC',
  'lesson-roblox-8-2': '8.2 - Dialogue System',
  'lesson-roblox-8-3': '8.3 - NPC That Walks',
  'lesson-roblox-8-4': '8.4 - Quest System',
  'lesson-roblox-8-5': '8.5 - Enemy That Attacks',
  'lesson-roblox-8-6': '8.6 - Checkpoint: Living Location',
  'lesson-roblox-9-1': '9.1 - ModuleScript: Shared Code',
  'lesson-roblox-9-2': '9.2 - Inventory with Tables',
  'lesson-roblox-9-3': '9.3 - Tables as Objects',
  'lesson-roblox-9-4': '9.4 - Gear and Stats',
  'lesson-roblox-9-5': '9.5 - Inventory Serialization',
  'lesson-roblox-9-6': '9.6 - Checkpoint: RPG Inventory',
  'lesson-roblox-10-1': '10.1 - Physical Constraints',
  'lesson-roblox-10-2': '10.2 - TweenService Mastery',
  'lesson-roblox-10-3': '10.3 - Raycasting',
  'lesson-roblox-10-4': '10.4 - Laser Puzzle',
  'lesson-roblox-10-5': '10.5 - Procedural Elements',
  'lesson-roblox-10-6': '10.6 - Checkpoint: Puzzle World',
  'lesson-roblox-11-1': '11.1 - Clean Explorer',
  'lesson-roblox-11-2': '11.2 - Loading Screen',
  'lesson-roblox-11-3': '11.3 - Sound Design',
  'lesson-roblox-11-4': '11.4 - Optimization',
  'lesson-roblox-11-5': '11.5 - UX and Accessibility',
  'lesson-roblox-11-6': '11.6 - Checkpoint: Game Polished',
  'lesson-roblox-12-1': '12.1 - Final Project: Plan',
  'lesson-roblox-12-2': '12.2 - Putting It All Together',
  'lesson-roblox-12-3': '12.3 - Testing',
  'lesson-roblox-12-4': '12.4 - Publishing',
  'lesson-roblox-12-5': '12.5 - Portfolio',
  'lesson-roblox-12-6': '12.6 - SHOWCASE DAY',
}

/** Curriculum with localized module/lesson titles (content stays in lesson files). */
export function getRobloxCurriculum(locale = 'uk') {
  const loc = locale === 'en' ? 'en' : 'uk'
  const base =
    loc === 'en'
      ? {
          ...robloxCurriculum,
          title: 'Roblox Studio: From Your First Part to Your Own Game',
          modules: robloxCurriculum.modules.map((m) => ({
            ...m,
            title: EN_MODULE_TITLES[m.moduleId] || m.title,
            lessons: (m.lessons || []).map((l) => ({
              ...l,
              title: EN_LESSON_TITLES[l.lessonId] || l.title,
            })),
          })),
        }
      : robloxCurriculum

  return {
    ...base,
    modules: enrichRobloxModules(base.modules, loc),
  }
}
