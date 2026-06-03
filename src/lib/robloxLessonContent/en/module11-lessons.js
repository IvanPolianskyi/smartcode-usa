/** Rich EN content for Roblox Module 11 - lessons 11.1-11.3 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson111 = {
  lessonId: 'lesson-roblox-11-1',
  moduleId: 'module-11',
  order: 1,
  title: '11.1 - Clean Explorer',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Apply naming prefixes for NPCs, FX, UI, SFX, and scripts',
    'Organize ReplicatedStorage, ServerScriptService, and StarterGui folders',
    'Refactor ambiguous Part/Script names in a cleanup sprint',
    'Document a team style note for consistent hierarchy',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Module 11 - Performance & Polish** - ship quality: organization, loading, sound, FPS, UX.

**Lesson flow:**
1. **Theory (40 min)** - Explorer standards
2. **Practice (~25 min)** - cleanup sprint on your best place
3. **Quiz (10 min)** - **70%** pass

Use **Module 10 - Puzzle World** or your largest place file.`,
      },
      {
        title: 'Clean Explorer = faster shipping',
        content: `Messy hierarchy costs hours:

| Bad | Good |
|-----|------|
| \`Part\` | \`Road_Straight_32\` |
| \`Script\` | \`Srv_QuestService\` |
| \`Frame\` | \`UI_ShopPanel\` |
| \`Model\` | \`NPC_Guide_Maya\` |

You fix bugs **where you expect** things to live.`,
      },
      {
        title: 'Naming prefixes',
        content: `| Prefix | Use |
|--------|-----|
| \`NPC_\` | Characters |
| \`FX_\` | Particles, beams |
| \`UI_\` | ScreenGui elements |
| \`SFX_\` | Sound instances in world |
| \`Env_\` | Map props, trees, rocks |
| \`Srv_\` | Server Scripts |
| \`Cli_\` | LocalScripts |
| \`Mod_\` | ModuleScripts |

**Remotes:** \`Shop_RequestPurchase\`, \`Quest_Update\` - domain first.`,
      },
      {
        title: 'Folder structure baseline',
        content: `\`\`\`
ReplicatedStorage/
├── Remotes/
└── SharedAssets/

ServerScriptService/
├── Systems/
│   ├── Srv_InventoryService
│   └── Srv_QuestService
└── Modules/

StarterGui/
└── Screens/
    ├── UI_ShopGui
    └── UI_QuestHud

Workspace/
├── NPCs/
├── PuzzleWorld/
├── Enemies/
└── Map/
\`\`\`

**One folder per system** - not 200 scripts in root.`,
      },
      {
        title: 'Cleanup sprint process',
        content: `**Batch 1 (10 min):** Workspace map props → \`Map/\`
**Batch 2 (10 min):** Rename scripts Srv_/Cli_
**Batch 3 (10 min):** Remotes → \`ReplicatedStorage/Remotes\`
**Test Play** after each batch - nothing breaks.

**Delete:** unused default \`Part\`, empty Models, duplicate scripts.

**Style note** (notepad or README):
- Max name length ~40 chars
- PascalCase for Models, camelCase for locals in code`,
      },
      {
        title: 'Validation script (optional)',
        content: `\`\`\`lua
-- Srv_NameValidator in ServerScriptService (Studio helper)
local BAD = {"Part", "Part1", "Script", "Script2", "Model", "Frame"}

for _, inst in ipairs(workspace:GetDescendants()) do
    if table.find(BAD, inst.Name) then
        warn("[Naming]", inst:GetFullName())
    end
end
\`\`\`

Run once after cleanup - warn should be near zero.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] No generic Part/Script in active systems
- [ ] Remotes folder exists
- [ ] Systems + Modules under ServerScriptService
- [ ] Play test passes after refactor
- [ ] Save: \`Lesson 11.1 - Clean Explorer\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Rename everything at once without testing', explanation: 'Broken require paths.', correctApproach: 'Small batches + Play test' },
    { mistake: 'Moving scripts breaks require paths', explanation: 'Nil module errors.', correctApproach: 'Update require() after move' },
    { mistake: 'Inconsistent prefixes', explanation: 'Still hard to search.', correctApproach: 'Written style note' },
    { mistake: 'Deleting "unused" without check', explanation: 'Removes wired UI.', correctApproach: 'Search references first' },
  ],
  summary: `You applied naming prefixes, grouped systems into predictable folders, and completed an Explorer cleanup sprint - your project is now maintainable for polish and publish phases.`,
  practiceTask: {
    title: 'Explorer cleanup sprint (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Professional hierarchy on main place.

### Part A - Plan (5 min)
1. List systems: shop, quest, puzzle, inventory
2. Write 5 naming rules in notes

### Part B - Refactor (18 min)
1. Workspace + SSS + ReplicatedStorage + StarterGui
2. Rename remotes and key scripts
3. Play test after each batch

### Part C - Save (2 min)
1. **Save to Roblox** → \`Lesson 11.1 - Clean Explorer\`
2. **Practice complete**`,
    hints: [
      'Search Explorer for "Script" and "Part" names',
      'require paths use instance path not file name',
      'Team README optional but valuable',
    ],
    optionalChallenge: 'Srv_NameValidator warns bad names on Play.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Srv_ prefix means...', options: ['Server script', 'Client UI', 'Terrain', 'Sound'], correctAnswer: 0, explanation: 'Server-side.' },
      { id: 'q2', type: MC, question: 'Remotes should live in...', options: ['ReplicatedStorage/Remotes', 'Workspace only', 'Terrain', 'Lighting'], correctAnswer: 0, explanation: 'Shared access.' },
      { id: 'q3', type: MC, question: 'Generic name Part is bad because...', options: ['Hard to find in Explorer', 'Required', 'Faster', 'Free Robux'], correctAnswer: 0, explanation: 'Debugging pain.' },
      { id: 'q4', type: MC, question: 'Cleanup in batches avoids...', options: ['Breaking many systems at once', 'Publishing', 'Sound', 'NPC'], correctAnswer: 0, explanation: 'Safe refactor.' },
      { id: 'q5', type: MC, question: 'NPC_ prefix is for...', options: ['Character models', 'UI buttons', 'Road parts', 'DataStore'], correctAnswer: 0, explanation: 'NPC assets.' },
      { id: 'q6', type: MC, question: 'Module 11 focus is...', options: ['Performance and polish', 'Only racing', 'Only inventory tables', 'Terrain gen'], correctAnswer: 0, explanation: 'Ship quality.' },
      { id: 'q7', type: MC, question: 'UI_ prefix helps...', options: ['Find interface elements', 'Delete Humanoid', 'Remove quests', 'Ban players'], correctAnswer: 0, explanation: 'UI organization.' },
      { id: 'q8', type: MC, question: 'Lesson 11.2 adds...', options: ['Loading screen', 'Laser puzzle', 'DataStore only', 'Sword combat'], correctAnswer: 0, explanation: 'First impression.' },
      { id: 'q9', type: MC, question: 'Shop_RequestPurchase naming is...', options: ['Domain_action pattern', 'Random', 'Banned', 'Client-only'], correctAnswer: 0, explanation: 'Remote clarity.' },
      { id: 'q10', type: MC, question: 'Lesson 11.1 save name...', options: ['Lesson 11.1 - Clean Explorer', 'Game Polished', 'Loading Screen', 'Sound Design'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const enLesson112 = {
  lessonId: 'lesson-roblox-11-2',
  moduleId: 'module-11',
  order: 2,
  title: '11.2 - Loading Screen',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Build branded LoadingGui with tips and progress text',
    'Fade into gameplay with TweenService',
    'Preload key assets with ContentProvider',
    'Handle teleport context with clear status messages',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Loading is **first impression** - players judge polish in 3 seconds.

**Lesson flow:**
1. **Theory (40 min)** - loading UI + preload
2. **Practice (~25 min)** - pro loading sequence
3. **Quiz (10 min)** - **70%** pass

Open cleaned place from **11.1**.`,
      },
      {
        title: 'Loading is part of gameplay',
        content: `Without loading UI:
- Black screen confusion
- "Is game broken?"
- Players leave

**With loading UI:**
- Brand + title
- Rotating tips
- Status text ("Loading world...")
- Smooth fade to spawn`,
      },
      {
        title: 'LoadingGui layout',
        content: `\`StarterGui/LoadingGui\` (ScreenGui, **ResetOnSpawn false** for first load)

\`\`\`
LoadingGui
├── Background (Frame, full screen, dark)
├── Logo (ImageLabel or TextLabel - game name)
├── TipsLabel (rotating hints)
├── StatusLabel ("Loading...")
└── ProgressBar (Frame bar optional)
\`\`\`

**ZIndex** - loading on top of everything until dismissed.`,
      },
      {
        title: 'Preload and status',
        content: `\`Cli_LoadingSequence\` LocalScript:

\`\`\`lua
local ContentProvider = game:GetService("ContentProvider")
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local gui = script.Parent
local status = gui.StatusLabel
local tips = gui.TipsLabel

local TIP_LIST = {
    "Talk to Guide Maya for your first quest.",
    "Check the shop for starter gear.",
    "Complete puzzles to earn coins.",
}

local assetsToPreload = {
    workspace.PuzzleWorld,
    game.ReplicatedStorage.Remotes,
}

status.Text = "Loading assets..."
ContentProvider:PreloadAsync(assetsToPreload)

status.Text = "Syncing profile..."
task.wait(0.5)

status.Text = "Ready!"
task.wait(0.3)

local fade = TweenService:Create(gui.Background, TweenInfo.new(0.6, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {BackgroundTransparency = 1})
fade:Play()
fade.Completed:Wait()
gui.Enabled = false
\`\`\``,
      },
      {
        title: 'Rotating tips',
        content: `\`\`\`lua
task.spawn(function()
    local i = 1
    while gui.Enabled do
        tips.Text = "Tip: " .. TIP_LIST[i]
        i = i % #TIP_LIST + 1
        task.wait(3)
    end
end)
\`\`\`

**Short friendly** tips - one line each.`,
      },
      {
        title: 'Teleport context',
        content: `When using **TeleportService** between places:

\`\`\`lua
local TeleportService = game:GetService("TeleportService")
-- Show loading BEFORE teleport from Cli script
status.Text = "Traveling to Arena..."
TeleportService:TeleportAsync(placeId, {player})
\`\`\`

Destination place also shows LoadingGui on join.

**Duration:** fade 0.4-1.0s - not too slow.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] LoadingGui shows on join with tip + status
- [ ] PreloadAsync runs without error
- [ ] Fade out reveals spawn cleanly
- [ ] ResetOnSpawn behavior tested
- [ ] Save: \`Lesson 11.2 - Loading Screen\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'LoadingGui ResetOnSpawn true', explanation: 'Flashes again every respawn.', correctApproach: 'false for session load' },
    { mistake: 'No preload - hitches after fade', explanation: 'Bad first second.', correctApproach: 'PreloadAsync key folders' },
    { mistake: 'Loading never disabled', explanation: 'Stuck overlay.', correctApproach: 'gui.Enabled = false after fade' },
    { mistake: '5 second black wait with no text', explanation: 'Feels broken.', correctApproach: 'StatusLabel updates' },
  ],
  summary: `You built a branded loading screen with rotating tips, ContentProvider preload, status messages, and a smooth fade into gameplay - the first seconds of your game now feel professional.`,
  practiceTask: {
    title: 'Pro loading sequence (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Polished join experience.

### Part A - UI (10 min)
1. LoadingGui full screen + logo + tips + status
2. Optional progress bar stub

### Part B - Sequence (12 min)
1. Cli_LoadingSequence - preload, status steps, fade
2. Tip rotation loop
3. Test join in Play

### Part C - Save (3 min)
1. **Save to Roblox** → \`Lesson 11.2 - Loading Screen\`
2. **Practice complete**`,
    hints: [
      'Preload Remotes + main world folder',
      'Module 10 TweenService for fade',
      'Teleport optional if single place',
    ],
    optionalChallenge: 'Status tied to real steps: UI, NPCs, Profile.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'ContentProvider:PreloadAsync...', options: ['Loads assets early', 'Deletes player', 'Saves DataStore', 'Publishes'], correctAnswer: 0, explanation: 'Reduce hitches.' },
      { id: 'q2', type: MC, question: 'Loading fade uses...', options: ['TweenService', 'Terrain', 'Humanoid only', 'Weld'], correctAnswer: 0, explanation: 'Smooth transition.' },
      { id: 'q3', type: MC, question: 'StatusLabel tells player...', options: ['What is happening', 'Server password', 'Robux', 'Version only'], correctAnswer: 0, explanation: 'Reduces confusion.' },
      { id: 'q4', type: MC, question: 'Tips rotate to...', options: ['Teach while waiting', 'Lag game', 'Remove UI', 'Ban'], correctAnswer: 0, explanation: 'Engagement.' },
      { id: 'q5', type: MC, question: 'After fade loading gui should...', options: ['Disable or hide', 'Stay forever', 'Block all input forever', 'Delete player'], correctAnswer: 0, explanation: 'Reveal game.' },
      { id: 'q6', type: MC, question: 'TeleportAsync needs...', options: ['Clear loading message', 'No UI', 'Terrain edit', 'Atmosphere only'], correctAnswer: 0, explanation: 'Seamless travel.' },
      { id: 'q7', type: MC, question: 'Lesson 11.2 builds on...', options: ['Lesson 11.1 clean place', 'Empty', 'Module 1 only', 'Publish'], correctAnswer: 0, explanation: 'Organized project.' },
      { id: 'q8', type: MC, question: 'Lesson 11.3 adds...', options: ['Sound design layers', 'Only Explorer', 'Only laser', 'Coins'], correctAnswer: 0, explanation: 'Audio polish.' },
      { id: 'q9', type: MC, question: 'Good fade duration about...', options: ['0.4-1.0 seconds', '10 seconds', '0 seconds', '60 seconds'], correctAnswer: 0, explanation: 'Snappy polish.' },
      { id: 'q10', type: MC, question: 'Lesson 11.2 save name...', options: ['Lesson 11.2 - Loading Screen', 'Clean Explorer', 'Game Polished', 'Optimization'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const enLesson113 = {
  lessonId: 'lesson-roblox-11-3',
  moduleId: 'module-11',
  order: 3,
  title: '11.3 - Sound Design',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Layer ambient, UI, and gameplay feedback sounds',
    'Set volume ranges per layer for clarity',
    'Hook sounds to quest, shop, and puzzle events',
    'Avoid repetitive audio fatigue with pitch variation',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Visuals attract - **audio** keeps players immersed.

**Lesson flow:**
1. **Theory (40 min)** - three sound layers
2. **Practice (~25 min)** - 8+ sounds balanced
3. **Quiz (10 min)** - **70%** pass

Open place with shop, quest, puzzle from prior modules.`,
      },
      {
        title: 'Three key layers',
        content: `| Layer | Volume | Examples |
|-------|--------|----------|
| **Ambient** | 0.2-0.4 | Wind, hub hum, cave drip |
| **UI** | 0.5-0.7 | Click, open shop, close |
| **Gameplay** | 0.7-1.0 | Coin, quest complete, puzzle solve, hit |

**Critical cues** louder than ambience - players hear rewards.`,
      },
      {
        title: 'Folder organization',
        content: `\`SoundService\` or \`ReplicatedStorage/Audio/\`:

\`\`\`
Audio/
├── Ambient/
│   └── SFX_Hub_Loop
├── UI/
│   ├── SFX_UI_Click
│   └── SFX_UI_Purchase
└── Gameplay/
    ├── SFX_Quest_Complete
    ├── SFX_Puzzle_Solve
    └── SFX_Coin_Collect
\`\`\`

**SFX_** prefix matches 11.1 naming.`,
      },
      {
        title: 'Playing sounds from code',
        content: `\`\`\`lua
local function playSFX(soundTemplate, parent)
    local s = soundTemplate:Clone()
    s.Parent = parent or workspace
    s:Play()
    game:GetService("Debris"):AddItem(s, s.TimeLength + 0.5)
end
\`\`\`

**UI click** - LocalScript on buttons:

\`\`\`lua
button.MouseButton1Click:Connect(function()
    playSFX(game.ReplicatedStorage.Audio.UI.SFX_UI_Click, player.PlayerGui)
end)
\`\`\`

**Quest complete** - server after reward:

\`\`\`lua
playSFX(game.ReplicatedStorage.Audio.Gameplay.SFX_Quest_Complete, workspace)
\`\`\``,
      },
      {
        title: 'Ambient loop',
        content: `\`SFX_Hub_Loop\` in \`Workspace/AmbientZone\` or server script:

\`\`\`lua
local ambient = workspace.Audio.Ambient.SFX_Hub_Loop
ambient.Looped = true
ambient.Volume = 0.25
ambient:Play()
\`\`\`

**Fade in** - start Volume 0, tween to 0.25 over 2s.

**Zone ambient (advanced):** volume up inside cave part region.`,
      },
      {
        title: 'Fatigue and ducking',
        content: `**Pitch variation** on spam sounds:

\`\`\`lua
s.PlaybackSpeed = 0.95 + math.random() * 0.1
\`\`\`

**Ducking:** lower ambient 0.1s when quest complete plays.

**No** coin sound 50 times per second - debounce collect SFX.

| Event | Sound |
|-------|-------|
| Shop buy success | SFX_UI_Purchase |
| Shop fail | SFX_UI_Error (short) |
| Puzzle target | SFX_Puzzle_Chime |
| All targets | SFX_Puzzle_Solve |
| Quest complete | SFX_Quest_Complete |`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] 8+ sounds placed and named
- [ ] Ambient + UI + gameplay layers balanced
- [ ] Key events trigger correct SFX
- [ ] Test headphones + speakers
- [ ] Save: \`Lesson 11.3 - Sound Design\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'All sounds Volume 1', explanation: 'Ear fatigue.', correctApproach: 'Layer volume ranges' },
    { mistake: 'Ambient louder than quest complete', explanation: 'Reward unheard.', correctApproach: 'Gameplay loudest' },
    { mistake: 'Looped UI click on ambient', explanation: 'Annoying.', correctApproach: 'UI only on click' },
    { mistake: 'No sound on major reward', explanation: 'Flat experience.', correctApproach: 'Quest/puzzle SFX' },
  ],
  summary: `You organized audio into ambient, UI, and gameplay layers, wired sounds to shop/quest/puzzle events, and balanced volumes - your game now feedbacks success and mood through sound.`,
  practiceTask: {
    title: 'Audio layer pass (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** 8 sounds, balanced layers.

### Part A - Library (10 min)
1. Audio folder - 2 ambient/UI/gameplay mins each
2. Name SFX_ prefix, set base Volume

### Part B - Wire events (12 min)
1. UI shop click + purchase + fail
2. Quest complete + puzzle solve + coin
3. Hub ambient loop fade in

### Part C - Save (3 min)
1. Play through golden path with sound
2. **Save to Roblox** → \`Lesson 11.3 - Sound Design\`
3. **Practice complete**`,
    hints: [
      'Roblox toolbox free SFX - check license',
      'Clone+Play+Debris pattern avoids overlap bugs',
      'Test mute ambient alone then full mix',
    ],
    optionalChallenge: 'Music intensity up when enemy aggro from Module 8.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Ambient layer is for...', options: ['Location mood', 'UI clicks only', 'Server scripts', 'DataStore'], correctAnswer: 0, explanation: 'Background feel.' },
      { id: 'q2', type: MC, question: 'Gameplay SFX should be...', options: ['Louder than ambient', 'Silent', 'Same as ambient', 'Removed'], correctAnswer: 0, explanation: 'Clear feedback.' },
      { id: 'q3', type: MC, question: 'SFX_ prefix matches...', options: ['Lesson 11.1 naming', 'Terrain only', 'Random', 'UK locale'], correctAnswer: 0, explanation: 'Consistency.' },
      { id: 'q4', type: MC, question: 'Pitch variation reduces...', options: ['Audio fatigue', 'FPS', 'Coins', 'Laps'], correctAnswer: 0, explanation: 'Spam sounds.' },
      { id: 'q5', type: MC, question: 'Quest complete needs...', options: ['Clear gameplay SFX', 'No sound', 'Only ambient', 'Terrain'], correctAnswer: 0, explanation: 'Reward feel.' },
      { id: 'q6', type: MC, question: 'Clone Play Debris pattern...', options: ['Cleans up finished sounds', 'Deletes player', 'Saves game', 'Opens shop'], correctAnswer: 0, explanation: 'One-shot SFX.' },
      { id: 'q7', type: MC, question: 'Lesson 11.3 wires to...', options: ['Shop quest puzzle events', 'Only car', 'Only terrain', 'Publish'], correctAnswer: 0, explanation: 'Existing systems.' },
      { id: 'q8', type: MC, question: 'Lesson 11.4 adds...', options: ['Optimization', 'Only loading', 'Only Explorer', 'NPC only'], correctAnswer: 0, explanation: 'Performance.' },
      { id: 'q9', type: MC, question: 'UI click sounds belong on...', options: ['Button interactions', 'Ambient loop', 'Terrain', 'Sky'], correctAnswer: 0, explanation: 'UI layer.' },
      { id: 'q10', type: MC, question: 'Lesson 11.3 save name...', options: ['Lesson 11.3 - Sound Design', 'Loading Screen', 'Game Polished', 'Clean Explorer'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const enLesson114 = {
  lessonId: 'lesson-roblox-11-4',
  moduleId: 'module-11',
  order: 4,
  title: '11.4 - Optimization',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Enable StreamingEnabled for large playable areas',
    'Merge decorative parts and reduce VFX spam',
    'Refactor one expensive while-true loop to event-driven updates',
    'Measure before/after performance in Studio',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Polish means **smooth** - not only pretty. If FPS drops, players leave.

**Lesson flow:**
1. **Theory (40 min)** - optimization levers
2. **Practice (~25 min)** - optimization pass
3. **Quiz (10 min)** - **70%** pass

Audit **Puzzle World** or your largest hub.`,
      },
      {
        title: 'Performance mindset',
        content: `| Symptom | Player reaction |
|---------|-----------------|
| Stutter on spawn | "Broken game" |
| Lag in puzzle room | Quit before solving |
| Mobile heat | Uninstall |

**Optimize before** adding more features.`,
      },
      {
        title: 'StreamingEnabled',
        content: `**Workspace** properties (or Game Settings):

\`StreamingEnabled = true\`

Large maps load **near player** only - less memory.

**StreamingMinRadius / TargetRadius** - tune in Game Settings for big worlds.

**Lesson hub:** enable if map > ~200 stud playable area with many parts.`,
      },
      {
        title: 'Part and VFX budget',
        content: `**Merge** tiny deco:

- 20 grass Parts → 1 Union or larger tiles
- Duplicate trees - use **MeshPart** instances sparingly

**VFX audit:**
- Max 3-5 active ParticleEmitters near player
- Disable emitters **Enabled = false** when far
- No infinite spark spam in puzzle room

**Transparency** stacking hurts GPU - fewer glass layers.`,
      },
      {
        title: 'Script efficiency',
        content: `**Bad:**

\`\`\`lua
while true do
    recheckAllRays() -- every frame cost
    task.wait()
end
\`\`\`

**Better:**

\`\`\`lua
-- Only on mirror rotate + 0.2s debounce batch
mirrorRotated.Event:Connect(recheckAllRays)
\`\`\`

**Ray puzzle** from 10.4 - do not raycast 60/sec if 2/sec enough.

\`\`\`lua
local RunService = game:GetService("RunService")
local acc = 0
RunService.Heartbeat:Connect(function(dt)
    acc += dt
    if acc < 0.25 then return end
    acc = 0
    -- light periodic update only if needed
end)
\`\`\``,
      },
      {
        title: 'Measure before/after',
        content: `Studio **Script Performance** + **Microprofiler** (View tab):

| Metric | Before | After |
|--------|--------|-------|
| Part count in hub | | |
| Active scripts looping | | |
| Feel in Play (stutter?) | | |

**Client** test: Studio → Test → Device emulator lower tier if available.

**Debug panel (challenge):**

\`\`\`lua
-- FPS proxy: 1 / dt smoothed in LocalScript
\`\`\``,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] StreamingEnabled on if large map
- [ ] One merged deco cluster or removed junk parts
- [ ] One loop refactored to events
- [ ] VFX count reduced in puzzle area
- [ ] Save: \`Lesson 11.4 - Optimization\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Raycast every frame for all players', explanation: 'CPU spike.', correctApproach: 'Event-driven recheck' },
    { mistake: 'Thousands of 1-stud parts', explanation: 'Render cost.', correctApproach: 'Merge or remove' },
    { mistake: 'Optimize without measuring', explanation: 'Unknown impact.', correctApproach: 'Before/after notes' },
    { mistake: 'Disable all scripts to fix lag', explanation: 'Breaks game.', correctApproach: 'Target expensive loops' },
  ],
  summary: `You enabled streaming where needed, cut part and VFX cost, refactored an expensive loop to event-driven updates, and measured performance - your game runs smoother on real devices.`,
  practiceTask: {
    title: 'Performance optimization pass (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Measurable improvement in one area.

### Part A - Audit (8 min)
1. Count parts in main play zone
2. List scripts with while true do loops
3. Note stutter locations

### Part B - Fixes (15 min)
1. StreamingEnabled if applicable
2. Merge/remove 1 deco group + cut 2 VFX
3. Refactor 1 loop (puzzle ray or patrol)

### Part C - Save (2 min)
1. Write before/after in notes
2. **Save to Roblox** → \`Lesson 11.4 - Optimization\`
3. **Practice complete**`,
    hints: [
      'Server logic lean - client handles pure visuals',
      'Module 10 ray puzzle common bottleneck',
      'Patrol NPC ok at 0.5s MoveTo refresh not every frame',
    ],
    optionalChallenge: 'Debug UI showing part count + FPS proxy.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'StreamingEnabled helps...', options: ['Large worlds load efficiently', 'Delete scripts', 'Add Robux', 'Remove UI'], correctAnswer: 0, explanation: 'Streaming.' },
      { id: 'q2', type: MC, question: 'Merge small parts reduces...', options: ['Render load', 'Player HP', 'Quest progress', 'Dialogue'], correctAnswer: 0, explanation: 'Part count.' },
      { id: 'q3', type: MC, question: 'Event-driven beats...', options: ['Raycast every frame always', 'No scripts', 'Terrain only', 'Publishing'], correctAnswer: 0, explanation: 'Efficiency.' },
      { id: 'q4', type: MC, question: 'VFX spam causes...', options: ['GPU stress', 'More coins', 'Better FPS', 'DataStore'], correctAnswer: 0, explanation: 'Overdraw.' },
      { id: 'q5', type: MC, question: 'Measure before/after to...', options: ['Prove optimization worked', 'Guess', 'Skip work', 'Remove audio'], correctAnswer: 0, explanation: 'Evidence.' },
      { id: 'q6', type: MC, question: 'Lesson 11.4 builds on...', options: ['Polished place from 11.1-11.3', 'Empty', 'Module 1 only', 'Coins only'], correctAnswer: 0, explanation: 'Full project.' },
      { id: 'q7', type: MC, question: 'Lesson 11.5 adds...', options: ['UX and accessibility', 'Only sound', 'Only loading', 'Laser'], correctAnswer: 0, explanation: 'Accessibility.' },
      { id: 'q8', type: MC, question: 'Server scripts should stay...', options: ['Focused on game rules', 'All visual VFX', 'UI only', 'Terrain'], correctAnswer: 0, explanation: 'Authority lean.' },
      { id: 'q9', type: MC, question: 'Optimization is important because...', options: ['Stutter makes players leave', 'Required for badges', 'Replaces design', 'Removes quests'], correctAnswer: 0, explanation: 'Retention.' },
      { id: 'q10', type: MC, question: 'Lesson 11.4 save name...', options: ['Lesson 11.4 - Optimization', 'Sound Design', 'Game Polished', 'Loading Screen'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const enLesson115 = {
  lessonId: 'lesson-roblox-11-5',
  moduleId: 'module-11',
  order: 5,
  title: '11.5 - UX and Accessibility',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Apply readable fonts, contrast, and UI scaling',
    'Add icons plus text for quest and puzzle states',
    'Improve spawn-to-first-reward onboarding clarity',
    'Optional settings for text size or reduced motion',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**UX is respect** - players should never ask "What do I do now?" for more than 30 seconds.

**Lesson flow:**
1. **Theory (40 min)** - accessibility checklist
2. **Practice (~25 min)** - one journey upgrade
3. **Quiz (10 min)** - **70%** pass`,
      },
      {
        title: 'Accessibility basics',
        content: `| Check | Target |
|-------|--------|
| Font size | 16-22 px equivalent on main labels |
| Contrast | Light text on dark panel (or inverse) |
| Colorblind | Don't use red/green only - add ✓ / ✗ icons |
| Motion | Optional reduce screen shake / flash |
| Subtitles | Key NPC lines as text (dialogue already helps) |

**Teen players** also benefit - small phones, bright rooms.`,
      },
      {
        title: 'Onboarding clarity',
        content: `**Spawn → first reward** path (golden path):

| Step | UX fix |
|------|--------|
| Spawn | Sign: "Talk to Guide Maya (yellow marker)" |
| No quest | QuestLabel visible: "No active quest" |
| Dialogue | Large Next button |
| Puzzle | Targets: 0/3 + arrow beams |
| Shop | Prices readable, fail message clear |

**Objective marker** - BillboardGui arrow on Maya or **Highlight** instance.`,
      },
      {
        title: 'UI consistency',
        content: `**One style guide:**
- Primary button color same across shop, dialogue, puzzle
- **UICorner** radius consistent (8-12 px)
- **UIStroke** on panels for readability
- Status messages same position (bottom center)

\`\`\`lua
-- High contrast example
label.TextColor3 = Color3.fromRGB(255, 255, 255)
panel.BackgroundColor3 = Color3.fromRGB(25, 28, 35)
\`\`\`

Test **1280×720** and **mobile aspect** in Studio device emulator.`,
      },
      {
        title: 'Icons plus text',
        content: `Quest complete:
- Text: "Quest Complete!"
- Icon: ✓ ImageLabel

Shop fail:
- Text: "Not enough coins"
- Icon: coin silhouette + red stroke

Puzzle target:
- **Neon color** + **checkmark** when done - not green alone

**Colorblind-safe** palette: blue/orange for states, not only red/green.`,
      },
      {
        title: 'Settings panel (optional)',
        content: `\`UI_Settings\` in StarterGui:

| Option | Effect |
|--------|--------|
| Text size | Small / Medium / Large scale on QuestLabel |
| Reduced motion | Shorter tweens, no camera shake |
| SFX volume | Slider 0-1 (client) |

Store in player attribute or client table - not security critical.

\`\`\`lua
player:SetAttribute("TextScale", 1.2)
\`\`\``,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Spawn-to-reward path has 3+ clarity improvements
- [ ] Contrast passes squint test
- [ ] Quest/puzzle state uses icon + text
- [ ] Tested two screen sizes
- [ ] Save: \`Lesson 11.5 - UX Accessibility\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Red/green only for success/fail', explanation: 'Colorblind exclusion.', correctApproach: 'Icons and text' },
    { mistake: 'Tiny font on mobile', explanation: 'Unreadable.', correctApproach: '16+ pt equivalent' },
    { mistake: 'No goal after spawn', explanation: 'Players wander.', correctApproach: 'Sign + quest HUD' },
    { mistake: 'Different button styles everywhere', explanation: 'Feels amateur.', correctApproach: 'Style guide' },
  ],
  summary: `You improved onboarding clarity, contrast and font readability, colorblind-safe state indicators, and optional settings - the core loop is now understandable without teacher help.`,
  practiceTask: {
    title: 'Accessibility + UX upgrade (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Clearer spawn-to-reward journey.

### Part A - Audit (8 min)
1. Friend or self play 5 min - note confusion points
2. List top 3 fixes

### Part B - Implement (15 min)
1. Spawn sign + objective marker
2. Contrast/font on QuestLabel + shop status
3. Icon + text on one success and one fail state

### Part C - Save (2 min)
1. Retest golden path
2. **Save to Roblox** → \`Lesson 11.5 - UX Accessibility\`
3. **Practice complete**`,
    hints: [
      'Watch playtester - fix what they say first',
      'Highlight on Guide Maya is built-in easy win',
      'Module 8 dialogue already helps subtitles',
    ],
    optionalChallenge: 'Settings panel text size + reduced motion.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Colorblind-safe UI uses...', options: ['Icons and text not color alone', 'Only red green', 'No labels', 'Tiny fonts'], correctAnswer: 0, explanation: 'Accessibility.' },
      { id: 'q2', type: MC, question: 'High contrast means...', options: ['Readable text on background', 'Invisible UI', 'No UI', 'Random colors'], correctAnswer: 0, explanation: 'Legibility.' },
      { id: 'q3', type: MC, question: 'Onboarding fixes reduce...', options: ['What do I do confusion', 'Robux', 'Terrain', 'Welds'], correctAnswer: 0, explanation: 'Clarity.' },
      { id: 'q4', type: MC, question: 'Consistent UI style...', options: ['Feels professional', 'Required by Roblox', 'Removes quests', 'Bans'], correctAnswer: 0, explanation: 'Polish.' },
      { id: 'q5', type: MC, question: 'Test multiple resolutions to...', options: ['Catch layout breaks', 'Delete saves', 'Publish', 'Remove NPCs'], correctAnswer: 0, explanation: 'Responsive UI.' },
      { id: 'q6', type: MC, question: 'Reduced motion option...', options: ['Helps sensitive players', 'Deletes game', 'Adds lag', 'Removes sound'], correctAnswer: 0, explanation: 'Accessibility.' },
      { id: 'q7', type: MC, question: 'Lesson 11.5 builds on...', options: ['11.1-11.4 polished place', 'Empty', 'Module 12', 'Coins only'], correctAnswer: 0, explanation: 'Full slice.' },
      { id: 'q8', type: MC, question: 'Lesson 11.6 is...', options: ['Game Polished checkpoint', 'Publish', 'GDD only', 'Race'], correctAnswer: 0, explanation: 'Finale.' },
      { id: 'q9', type: MC, question: 'Objective marker helps...', options: ['Find Guide Maya', 'Fly', 'Swim', 'DataStore'], correctAnswer: 0, explanation: 'Wayfinding.' },
      { id: 'q10', type: MC, question: 'Lesson 11.5 save name...', options: ['Lesson 11.5 - UX Accessibility', 'Optimization', 'Sound Design', 'Puzzle World'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const enLesson116 = {
  lessonId: 'lesson-roblox-11-6',
  moduleId: 'module-11',
  order: 6,
  title: '11.6 - Checkpoint: Game Polished',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Pass polish rubric across readability, responsiveness, stability',
    'Integrate Explorer, loading, audio, optimization, UX from Module 11',
    'Prioritize fixes: blockers, UX, performance, then visuals',
    'Ship Module 11 - Game Polished with blind playtest fixes',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Game Polished** = "works" → **feels professional**.

**Module 11 checklist:**
- 11.1 Clean Explorer
- 11.2 Loading screen
- 11.3 Sound layers
- 11.4 Optimization
- 11.5 UX/accessibility

**Save:** \`Module 11 - Game Polished\``,
      },
      {
        title: 'Final polish rubric (1-5)',
        content: `Score each - fix anything **≤3** first:

| Area | Score 1-5 | Notes |
|------|-----------|-------|
| **Readability** | | UI, signs, dialogue |
| **Responsiveness** | | Input, tweens, loading |
| **Consistency** | | Naming, colors, SFX |
| **Stability** | | No Output errors 10 min play |
| **Fun factor** | | Would play again? |

**Target:** all **4+** for checkpoint.`,
      },
      {
        title: 'Fix priority order',
        content: `1. **Blockers** - crash, soft-lock, data wipe
2. **Unclear UX** - stuck players
3. **Performance spikes** - stutter zones
4. **Visual/audio** - volume, contrast, VFX

**Issue tracker** (notes/table):

| Issue | Priority | Status |
|-------|----------|--------|
| Example: quest stuck | P1 | fixed |`,
      },
      {
        title: 'Blind playtest',
        content: `Ask someone who **did not build** the game:

1. Play 10 minutes unguided
2. Note 3 confusion points **in their words**
3. You fix top 3 before save

**No hints** during test - watch only.

Record short clip optional - portfolio proof.`,
      },
      {
        title: '60-second demo script',
        content: `1. Loading screen + tip
2. Spawn sign → talk to Maya
3. Start quest - clear HUD
4. One puzzle solve - SFX + feedback
5. Shop buy - UI sound
6. Show Explorer folders briefly (teacher mode)

**Module 12 next:** GDD, publish, showcase.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Rubric all areas 4+
- [ ] Blind playtest top 3 fixed
- [ ] No red errors in 10 min session
- [ ] Loading + audio + UX on golden path
- [ ] **Save to Roblox** → \`Module 11 - Game Polished\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Skipping blind playtest', explanation: 'Ship blind spots.', correctApproach: '10 min unguided test' },
    { mistake: 'Polish only visuals, broken quest', explanation: 'Blocker ignored.', correctApproach: 'Priority 1 bugs first' },
    { mistake: 'Inconsistent new UI only on shop', explanation: 'Frankenstein UI.', correctApproach: 'Global style pass' },
    { mistake: 'No issue list', explanation: 'Forget fixes.', correctApproach: 'Tracker with status' },
  ],
  summary: `You scored the polish rubric, fixed issues by priority, ran a blind playtest, and saved Game Polished - your core slice is ready for Module 12 release planning.`,
  practiceTask: {
    title: 'Ship Game Polished (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Professional-feeling build.

### Part A - Rubric (10 min)
1. Score 5 areas 1-5
2. List fixes for any ≤3

### Part B - Playtest + fixes (25 min)
1. Blind 10 min test - 3 confusion points
2. Fix blockers + UX first
3. Quick pass loading/audio/performance

### Part C - Demo save (5 min)
1. 60s demo rehearsed
2. **Save to Roblox** → \`Module 11 - Game Polished\`
3. **Practice complete**`,
    hints: [
      'Issue tracker: bug, priority, status',
      'Before/after clips motivate team',
      'Consistency beats one perfect room corner',
    ],
    optionalChallenge: 'Blind playtest + fix top 3 confusion points.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Game Polished includes Module 11...', options: ['All polish lessons integrated', 'Only Explorer', 'Only sound', 'Only publish'], correctAnswer: 0, explanation: 'Full module.' },
      { id: 'q2', type: MC, question: 'Fix priority starts with...', options: ['Blockers and bugs', 'Music volume only', 'New feature', 'Terrain color'], correctAnswer: 0, explanation: 'Priority order.' },
      { id: 'q3', type: MC, question: 'Blind playtest finds...', options: ['Confusion you missed', 'Robux', 'Server IP', 'Version'], correctAnswer: 0, explanation: 'Fresh eyes.' },
      { id: 'q4', type: MC, question: 'Rubric fun factor asks...', options: ['Would players play again', 'Part count', 'Script count', 'Roblox fee'], correctAnswer: 0, explanation: 'Engagement.' },
      { id: 'q5', type: MC, question: 'Module 11 save name...', options: ['Module 11 - Game Polished', 'Puzzle World', 'RPG Inventory', 'SHOWCASE DAY'], correctAnswer: 0, explanation: 'Checkpoint.' },
      { id: 'q6', type: MC, question: 'Lesson 11.6 completes...', options: ['Module 11 Performance and Polish', 'Module 12', 'Course', 'Coins only'], correctAnswer: 0, explanation: 'End module 11.' },
      { id: 'q7', type: MC, question: 'Stability means...', options: ['No major errors in play session', 'No UI', 'No sound', 'No quests'], correctAnswer: 0, explanation: 'Reliability.' },
      { id: 'q8', type: MC, question: 'Module 12 is...', options: ['Release Day', 'Only racing', 'Only inventory', 'Empty'], correctAnswer: 0, explanation: 'Next module.' },
      { id: 'q9', type: MC, question: 'Consistency covers...', options: ['Naming colors audio UI', 'Only scripts', 'Only terrain', 'Only NPC'], correctAnswer: 0, explanation: 'Unified feel.' },
      { id: 'q10', type: MC, question: 'Polish means...', options: ['Works and feels professional', 'More features only', 'Delete tests', 'Skip UX'], correctAnswer: 0, explanation: 'Quality bar.' },
    ],
  },
}
