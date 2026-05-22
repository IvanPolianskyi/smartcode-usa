/** Rich EN content for Roblox Module 08 — lessons 8.1–8.3 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson81 = {
  lessonId: 'lesson-roblox-8-1',
  moduleId: 'module-08',
  order: 1,
  title: '8.1 — Living NPC',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Place an NPC model with Humanoid and clear role',
    'Add ProximityPrompt for player interaction',
    'Configure prompt text and hold duration',
    'Give the NPC idle animation and readable naming',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Module 8 — Smart Game** — worlds feel alive with **NPCs**, dialogue, patrols, and quests.

**Lesson flow:**
1. **Theory (40 min)** — NPC rig + ProximityPrompt
2. **Practice (~25 min)** — Guide NPC at spawn
3. **Quiz (10 min)** — **70%** pass

Use **Module 7 — Shop Works** place or new hub: \`Lesson 8.1 — Living NPC\`.`,
      },
      {
        title: 'From prop to character',
        content: `A good NPC has:

| Piece | Purpose |
|-------|---------|
| **Model** | Grouped rig (R15 or R6) |
| **Humanoid** | Walk, health, display name |
| **HumanoidRootPart** | Interaction anchor |
| **Role** | One sentence: guide, merchant, trainer |

**Statue NPC** = no Humanoid, no prompt. **Living NPC** = players can interact.

Players trust worlds that feel **populated**.`,
      },
      {
        title: 'Getting an NPC into your place',
        content: `**Option A — Toolbox (lesson-friendly):**
1. Avatar → **Rig Builder** or search "R15 NPC"
2. Insert model → rename \`NPC_Guide_Maya\`

**Option B — Starter character duplicate:**
1. Copy your character in Play (for learning only)
2. Anchor NPC in place for static guide

**Folder:** \`Workspace/NPCs/NPC_Guide_Maya\`

**Exercise (5 min):** Set Humanoid \`DisplayDistanceType\` so name shows when nearby.`,
      },
      {
        title: 'ProximityPrompt setup',
        content: `Inside **HumanoidRootPart** → insert **ProximityPrompt**:

| Property | Suggested |
|----------|-----------|
| **ActionText** | Talk |
| **ObjectText** | Guide Maya |
| **HoldDuration** | 0 (instant) or 0.5 |
| **MaxActivationDistance** | 8–12 |
| **RequiresLineOfSight** | false (easier for teens) |

**Server Script** in NPC (or NPCService):

\`\`\`lua
local prompt = script.Parent:WaitForChild("HumanoidRootPart")
    :WaitForChild("ProximityPrompt")

prompt.Triggered:Connect(function(player)
    print("[NPC] " .. player.Name .. " talked to Guide Maya")
    -- Lesson 8.2: OpenDialogue:FireClient(player, "guide_intro")
end)
\`\`\`

**Triggered** fires on **server** when player activates prompt.`,
      },
      {
        title: 'Idle animation',
        content: `**Animate** script (often inside NPC) or manual:

1. **Animation Editor** → create idle
2. Or use default idle from rig

\`\`\`lua
local humanoid = script.Parent:FindFirstChildOfClass("Humanoid")
local animator = humanoid:FindFirstChildOfClass("Animator")
if animator then
    local idle = Instance.new("Animation")
    idle.AnimationId = "rbxassetid://YOUR_IDLE_ID"
    local track = animator:LoadAnimation(idle)
    track.Looped = true
    track:Play()
end
\`\`\`

For lesson: even **standing still** with name + prompt is OK if animation ID unavailable.`,
      },
      {
        title: 'Role design and visuals',
        content: `Write one sentence role:
*"Guide Maya welcomes new players and points them to the shop."*

**Visual consistency:**
- Outfit matches hub theme (Module 1 island / shop area)
- **BillboardGui** optional — "Quest Mentor" floating text
- NPC **Anchored** false if walking later; **true** for static guide today

**NPCs** folder keeps Workspace clean.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] NPC_Guide_Maya with Humanoid + ProximityPrompt
- [ ] Prompt shows Talk + NPC name
- [ ] Triggered prints player name in Output
- [ ] Role written in lesson notes
- [ ] Save: \`Lesson 8.1 — Living NPC\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'ProximityPrompt in wrong part', explanation: 'Hard to trigger.', correctApproach: 'HumanoidRootPart' },
    { mistake: 'LocalScript on Triggered', explanation: 'Triggered is server event.', correctApproach: 'Script on server' },
    { mistake: 'No Humanoid on model', explanation: 'Not a character.', correctApproach: 'Rig with Humanoid' },
    { mistake: 'MaxActivationDistance 100', explanation: 'Talk from across map.', correctApproach: '8-12 studs' },
  ],
  summary: `You placed Guide Maya with Humanoid, ProximityPrompt, and a server greeting handler — your hub now has a living NPC ready for dialogue in the next lesson.`,
  practiceTask: {
    title: 'Create Guide NPC (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Interactable guide at spawn.

### Part A — NPC model (10 min)
1. Folder Workspace/NPCs
2. NPC_Guide_Maya — rig + Humanoid
3. Position near spawn or shop

### Part B — Interaction (10 min)
1. ProximityPrompt on HumanoidRootPart
2. Server script prints welcome on Triggered
3. Optional BillboardGui title

### Part C — Save (5 min)
1. Play — hold E / click prompt — see Output
2. **Save to Roblox** → \`Lesson 8.1 — Living NPC\`
3. **Practice complete**`,
    hints: [
      'Rename everything — future you will thank you',
      'Test prompt distance on foot and in car (should not trigger in car if only for walking)',
      'Module 7 shop NPC can reuse same rig later',
    ],
    optionalChallenge: 'BillboardGui "Quest Mentor" above head.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'ProximityPrompt lets players…', options: ['Interact when nearby', 'Fly', 'Edit terrain', 'Publish'], correctAnswer: 0, explanation: 'Context action.' },
      { id: 'q2', type: MC, question: 'Triggered event runs on…', options: ['Server', 'Client only', 'Terrain', 'DataStore'], correctAnswer: 0, explanation: 'Server-side prompt.' },
      { id: 'q3', type: MC, question: 'NPC needs…', options: ['Humanoid', 'Only Part', 'Sky only', 'Sound only'], correctAnswer: 0, explanation: 'Character rig.' },
      { id: 'q4', type: MC, question: 'HumanoidRootPart holds…', options: ['ProximityPrompt anchor', 'Coins only', 'Terrain', 'Atmosphere'], correctAnswer: 0, explanation: 'Interaction point.' },
      { id: 'q5', type: MC, question: 'Clear NPC role helps…', options: ['Design and code stay focused', 'Lag', 'Remove UI', 'Delete shop'], correctAnswer: 0, explanation: 'Game design.' },
      { id: 'q6', type: MC, question: 'Module 8 focus is…', options: ['Smart Game / NPCs and quests', 'Only racing', 'Only shop code', 'Publishing only'], correctAnswer: 0, explanation: 'Living worlds.' },
      { id: 'q7', type: MC, question: 'NPCs folder in Workspace…', options: ['Organizes characters', 'Replaces server', 'Is required by Roblox', 'Blocks scripts'], correctAnswer: 0, explanation: 'Clean hierarchy.' },
      { id: 'q8', type: MC, question: 'ActionText "Talk" tells player…', options: ['What button does', 'Server IP', 'Robux price', 'Version'], correctAnswer: 0, explanation: 'UX label.' },
      { id: 'q9', type: MC, question: 'Lesson 8.2 adds…', options: ['Dialogue UI', 'Only car', 'Only timer', 'DataStore only'], correctAnswer: 0, explanation: 'Next step.' },
      { id: 'q10', type: MC, question: 'Lesson 8.1 save name…', options: ['Lesson 8.1 — Living NPC', 'Living Location', 'Shop Works', 'Race Launched'], correctAnswer: 0, explanation: 'Save NPC lesson.' },
    ],
  },
}

export const enLesson82 = {
  lessonId: 'lesson-roblox-8-2',
  moduleId: 'module-08',
  order: 2,
  title: '8.2 — Dialogue System',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Store dialogue lines in a Lua table by key',
    'Build DialogueGui with speaker, text, Next, Close',
    'Open dialogue from NPC ProximityPrompt via OpenDialogue RemoteEvent',
    'Prevent overlapping dialogue sessions on the client',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Your NPC can be **talked to**. Today they have **lines to say**.

**Lesson flow:**
1. **Theory (40 min)** — dialogue data + UI loop
2. **Practice (~25 min)** — 4+ line conversation
3. **Quiz (10 min)** — **70%** pass

Open **Lesson 8.1 — Living NPC**.`,
      },
      {
        title: 'Dialogue as data',
        content: `**ServerScriptService** → ModuleScript \`DialogueData\`:

\`\`\`lua
local DialogueData = {
    guide_intro = {
        speaker = "Guide Maya",
        lines = {
            "Welcome to the hub, builder!",
            "The shop behind me sells starter gear.",
            "Complete quests to earn more coins.",
            "Good luck — tap Next to continue.",
        },
    },
}

return DialogueData
\`\`\`

**Network sends key** (\`"guide_intro"\`), not full text arrays — smaller and safer.`,
      },
      {
        title: 'DialogueGui layout',
        content: `**StarterGui** → \`DialogueGui\` (ScreenGui)

\`\`\`
DialogueGui
└── Panel (Frame, bottom center)
    ├── SpeakerLabel
    ├── LineLabel (large text, wrapped)
    ├── NextButton
    └── CloseButton
\`\`\`

**Panel.Visible = false** until dialogue opens.

**Accessibility:** large font (18–22), high contrast background.`,
      },
      {
        title: 'Client dialogue loop',
        content: `\`DialogueClient\` LocalScript:

\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local openDialogue = ReplicatedStorage:WaitForChild("OpenDialogue")
local getLines = ReplicatedStorage:WaitForChild("GetDialogue") -- RemoteFunction 8.2

local panel = script.Parent.Panel
local lineLabel = panel.LineLabel
local speakerLabel = panel.SpeakerLabel
local nextBtn = panel.NextButton
local closeBtn = panel.CloseButton

local active = false
local lines = {}
local index = 1

local function showLine()
    lineLabel.Text = lines[index] or ""
end

local function open(key)
    if active then return end
    active = true
    local data = getLines:InvokeServer(key)
    if not data then active = false return end
    speakerLabel.Text = data.speaker
    lines = data.lines
    index = 1
    panel.Visible = true
    showLine()
end

nextBtn.MouseButton1Click:Connect(function()
    if index < #lines then
        index += 1
        showLine()
    else
        panel.Visible = false
        active = false
    end
end)

closeBtn.MouseButton1Click:Connect(function()
    panel.Visible = false
    active = false
end)

openDialogue.OnClientEvent:Connect(function(key)
    open(key)
end)
\`\`\``,
      },
      {
        title: 'Server bridge',
        content: `**ReplicatedStorage:**
- \`OpenDialogue\` RemoteEvent
- \`GetDialogue\` RemoteFunction

**NPC script** (update 8.1):

\`\`\`lua
local openDialogue = game.ReplicatedStorage.OpenDialogue

prompt.Triggered:Connect(function(player)
    openDialogue:FireClient(player, "guide_intro")
end)
\`\`\`

**GetDialogue.OnServerInvoke:**

\`\`\`lua
local DialogueData = require(game.ServerScriptService.DialogueData)

GetDialogue.OnServerInvoke = function(player, key)
    if type(key) ~= "string" then return nil end
    return DialogueData[key]
end
\`\`\`

Server owns dialogue text — client cannot inject fake quest lore easily.`,
      },
      {
        title: 'UX rules',
        content: `| Rule | Why |
|------|-----|
| Block second open while active | No overlapping panels |
| Close always works | Player escape |
| Next on last line closes or hides | Clear end |
| Short lines | Readable on mobile |

**Prevent spam:** cooldown on prompt Triggered (0.5s) optional.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] 4+ lines in guide_intro
- [ ] Next advances, Close exits
- [ ] Prompt opens dialogue panel
- [ ] Speaker name shows
- [ ] Save: \`Lesson 8.2 — Dialogue System\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Hardcoded lines only in LocalScript', explanation: 'Client can tamper / drift.', correctApproach: 'DialogueData on server' },
    { mistake: 'Sending full line array in FireClient', explanation: 'Heavy; harder to update.', correctApproach: 'Send dialogue key string' },
    { mistake: 'No active flag', explanation: 'Double panels.', correctApproach: 'Block while dialogue open' },
    { mistake: 'DialogueGui always visible', explanation: 'Blocks gameplay.', correctApproach: 'Hidden until open' },
  ],
  summary: `You built data-driven dialogue with DialogueData, a Next/Close UI loop, and OpenDialogue from Guide Maya's ProximityPrompt — NPCs now speak in full conversations.`,
  practiceTask: {
    title: 'Dialogue System v1 (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** 4-line conversation from NPC.

### Part A — Data + remotes (10 min)
1. DialogueData module with guide_intro
2. OpenDialogue + GetDialogue in ReplicatedStorage
3. Server handlers

### Part B — UI (12 min)
1. DialogueGui panel + labels + buttons
2. DialogueClient loop
3. Wire NPC prompt → FireClient guide_intro

### Part C — Save (3 min)
1. Play through all lines
2. **Save to Roblox** → \`Lesson 8.2 — Dialogue System\`
3. **Practice complete**`,
    hints: [
      'pcall InvokeServer like Module 7 catalog',
      'UIGradient optional polish on panel',
      'Test Close mid-conversation',
    ],
    optionalChallenge: 'Yes/No choice branches to different line tables.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Dialogue lines stored as…', options: ['Lua table by key', 'Terrain', 'Random strings in UI', 'Welds'], correctAnswer: 0, explanation: 'Data-driven.' },
      { id: 'q2', type: MC, question: 'OpenDialogue sends…', options: ['Dialogue key to client', 'Full game save', 'Terrain id', 'Tool instance'], correctAnswer: 0, explanation: 'Key lookup.' },
      { id: 'q3', type: MC, question: 'Next button…', options: ['Advances line index', 'Deletes NPC', 'Publishes', 'Spawns car'], correctAnswer: 0, explanation: 'UI flow.' },
      { id: 'q4', type: MC, question: 'DialogueGui is…', options: ['ScreenGui on client', 'Server-only', 'Terrain layer', 'Sound'], correctAnswer: 0, explanation: 'Client UI.' },
      { id: 'q5', type: MC, question: 'GetDialogue should run on…', options: ['Server OnServerInvoke', 'Client only', 'Lighting', 'Workspace'], correctAnswer: 0, explanation: 'Server returns lines.' },
      { id: 'q6', type: MC, question: 'active flag prevents…', options: ['Overlapping dialogues', 'Walking', 'Jump', 'Shop'], correctAnswer: 0, explanation: 'One conversation.' },
      { id: 'q7', type: MC, question: 'Lesson 8.2 builds on…', options: ['Lesson 8.1 NPC + prompt', 'Lesson 6 only', 'Empty', 'Publish only'], correctAnswer: 0, explanation: 'NPC trigger.' },
      { id: 'q8', type: MC, question: 'SpeakerLabel shows…', options: ['NPC name', 'Player password', 'Server IP', 'Robux'], correctAnswer: 0, explanation: 'Clarity.' },
      { id: 'q9', type: MC, question: 'Lesson 8.3 adds…', options: ['Walking patrol NPC', 'Only shop', 'Only race', 'DataStore'], correctAnswer: 0, explanation: 'MoveTo patrol.' },
      { id: 'q10', type: MC, question: 'Lesson 8.2 save name…', options: ['Lesson 8.2 — Dialogue System', 'Living NPC', 'Living Location', 'Shop UI'], correctAnswer: 0, explanation: 'Save dialogue lesson.' },
    ],
  },
}

export const enLesson83 = {
  lessonId: 'lesson-roblox-8-3',
  moduleId: 'module-08',
  order: 3,
  title: '8.3 — NPC That Walks',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Create waypoint parts WP_1 through WP_5 for a patrol route',
    'Patrol with Humanoid:MoveTo and MoveToFinished:Wait',
    'Loop route with pauses at each point',
    'Debug stuck NPCs with path spacing and obstacles',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Static guides are fine. **Walking NPCs** make hubs feel **alive**.

**Lesson flow:**
1. **Theory (40 min)** — waypoints + MoveTo loop
2. **Practice (~25 min)** — 5-point patrol
3. **Quiz (10 min)** — **70%** pass

Open **Lesson 8.2 — Dialogue System** — use second NPC or same Maya unanchored.`,
      },
      {
        title: 'Waypoint route design',
        content: `Folder \`Workspace/PatrolRoutes/Route_ShopLoop\`:

| Part | Name | Notes |
|------|------|-------|
| Neon ball | \`WP_1\` | Near shop |
| | \`WP_2\` | Path corner |
| | \`WP_3\` | Mid plaza |
| | \`WP_4\` | Near spawn |
| | \`WP_5\` | Back to shop |

**Properties:** Anchored true, CanCollide false, Transparency 0.5 (debug), then 1 invisible.

**Spacing:** 8–15 studs apart, no sharp 90° through walls.`,
      },
      {
        title: 'Collect waypoints in order',
        content: `\`\`\`lua
local routeFolder = workspace.PatrolRoutes.Route_ShopLoop
local waypoints = {}

for _, wp in ipairs(routeFolder:GetChildren()) do
    if wp:IsA("BasePart") and wp.Name:match("^WP_%d+$") then
        table.insert(waypoints, wp)
    end
end

table.sort(waypoints, function(a, b)
    local na = tonumber(a.Name:match("%d+"))
    local nb = tonumber(b.Name:match("%d+"))
    return na < nb
end)
\`\`\`

Sorting by number keeps route order correct.`,
      },
      {
        title: 'MoveTo patrol loop',
        content: `**NPC_Patrol_Guard** — Server Script:

\`\`\`lua
local npc = script.Parent
local humanoid = npc:WaitForChild("Humanoid")
humanoid.WalkSpeed = 10

local PAUSE = 0.7

local function patrol(waypoints)
    while true do
        for _, wp in ipairs(waypoints) do
            humanoid:MoveTo(wp.Position)
            humanoid.MoveToFinished:Wait()
            task.wait(PAUSE)
        end
    end
end

task.spawn(patrol, waypoints)
\`\`\`

**NPC must not be Anchored** — Humanoid needs to move.

Disable player controls on NPC — it's not a player character.`,
      },
      {
        title: 'Stuck NPC debugging',
        content: `If NPC stops forever:

| Fix | Try |
|-----|-----|
| Stuck on wall | Move waypoint away from geometry |
| Falls through map | Check HipHeight, floor collision |
| Never reaches point | Increase timeout — MoveToFinished still fires |
| Spins in place | Widen turn angle — add midpoint waypoint |

**Debug:** leave WP parts visible (red neon) until route works.

**Print** waypoint name on reach, remove prints when done.`,
      },
      {
        title: 'Patrol + dialogue together',
        content: `**Two NPCs** is OK for lesson:
- **Guide Maya** — static + dialogue (8.1–8.2)
- **Patrol Guard** — walks loop (8.3)

Or pause patrol while player talks (advanced):

\`\`\`lua
local patrolling = true
-- on prompt: patrolling = false, humanoid:MoveTo(npc.PrimaryPart.Position)
\`\`\`

Lesson 8.3 focuses on **continuous patrol**.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] 5 waypoints WP_1..WP_5 sorted
- [ ] NPC walks full loop repeatedly
- [ ] Pause ~0.7s at each point
- [ ] No stuck on 3+ consecutive laps
- [ ] Save: \`Lesson 8.3 — NPC Patrol\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'NPC anchored true', explanation: 'Cannot walk.', correctApproach: 'Unanchor NPC model for patrol' },
    { mistake: 'Waypoints inside walls', explanation: 'MoveTo stuck.', correctApproach: 'Clear path spacing' },
    { mistake: 'Unsorted WP_10 before WP_2', explanation: 'Weird route.', correctApproach: 'Numeric sort' },
    { mistake: 'Patrol script in LocalScript', explanation: 'AI must be server for all players.', correctApproach: 'Server Script on NPC' },
  ],
  summary: `You built a five-waypoint patrol loop with Humanoid MoveTo, pauses, and sorted waypoints — your hub now has an NPC that walks instead of only standing at spawn.`,
  practiceTask: {
    title: 'Patrol NPC route (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Endless 5-point patrol.

### Part A — Waypoints (8 min)
1. Folder PatrolRoutes/Route_ShopLoop
2. WP_1 .. WP_5 — visible for setup

### Part B — Patrol NPC (15 min)
1. NPC_Patrol_Guard — Humanoid WalkSpeed 10
2. Server patrol script — sort + while true loop
3. Play — watch 3 full loops

### Part C — Polish & save (2 min)
1. Hide waypoint transparency
2. **Save to Roblox** → \`Lesson 8.3 — NPC Patrol\`
3. **Practice complete**`,
    hints: [
      'MoveToFinished:Wait() after each MoveTo',
      'task.spawn so script does not block other systems',
      'Optional: random line print at each WP',
    ],
    optionalChallenge: 'Play short sound when reaching each waypoint.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'NPC walks using…', options: ['Humanoid:MoveTo', 'Terrain paint', 'ClickDetector only', 'Atmosphere'], correctAnswer: 0, explanation: 'Pathfinding step.' },
      { id: 'q2', type: MC, question: 'MoveToFinished:Wait()…', options: ['Waits until step done', 'Deletes NPC', 'Opens shop', 'Saves DataStore'], correctAnswer: 0, explanation: 'Sequence sync.' },
      { id: 'q3', type: MC, question: 'Patrol waypoints named…', options: ['WP_1, WP_2, ...', 'Random', 'Only Part', 'SpawnLocation'], correctAnswer: 0, explanation: 'Ordered route.' },
      { id: 'q4', type: MC, question: 'Patrol NPC should be…', options: ['Unanchored', 'Anchored true', 'Invisible only', 'No Humanoid'], correctAnswer: 0, explanation: 'Movement needs physics.' },
      { id: 'q5', type: MC, question: 'while true do loop…', options: ['Repeats patrol forever', 'Runs once', 'Stops game', 'Publishes'], correctAnswer: 0, explanation: 'Continuous patrol.' },
      { id: 'q6', type: MC, question: 'Patrol script runs on…', options: ['Server', 'Client LocalScript only', 'StarterGui', 'Lighting'], correctAnswer: 0, explanation: 'All players see same NPC.' },
      { id: 'q7', type: MC, question: 'Stuck NPC fix includes…', options: ['Move waypoints away from walls', 'Delete Humanoid', 'Remove legs', 'Hide UI'], correctAnswer: 0, explanation: 'Path reliability.' },
      { id: 'q8', type: MC, question: 'Sorting waypoints by number…', options: ['Keeps route order', 'Removes NPC', 'Adds coins', 'Opens dialogue'], correctAnswer: 0, explanation: 'WP_2 before WP_10.' },
      { id: 'q9', type: MC, question: 'Lesson 8.4 adds…', options: ['Quest system', 'Only car', 'Only timer', 'Publish'], correctAnswer: 0, explanation: 'Quest tables next.' },
      { id: 'q10', type: MC, question: 'Lesson 8.3 save name…', options: ['Lesson 8.3 — NPC Patrol', 'Dialogue System', 'Living NPC', 'Shop Works'], correctAnswer: 0, explanation: 'Save patrol lesson.' },
    ],
  },
}

export const enLesson84 = {
  lessonId: 'lesson-roblox-8-4',
  moduleId: 'module-08',
  order: 4,
  title: '8.4 — Quest System',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Define quests in a QuestConfig table with goal and reward',
    'Track per-player quest state on the server',
    'Accept quest from dialogue and increment progress on crystal collect',
    'Sync quest status to QuestUI via QuestUpdate RemoteEvent',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `NPCs give **tasks**. Quests turn tasks into **progress + rewards**.

**Lesson flow:**
1. **Theory (40 min)** — quest tables + per-player state
2. **Practice (~25 min)** — collect 5 crystals quest
3. **Quiz (10 min)** — **70%** pass

Open **Lesson 8.2 — Dialogue System** hub.`,
      },
      {
        title: 'Quest system foundation',
        content: `**ServerScriptService** → ModuleScript \`QuestConfig\`:

\`\`\`lua
local QuestConfig = {
    collect_crystals_01 = {
        title = "Crystal Run",
        goal = 5,
        rewardCoins = 50,
        description = "Collect 5 crystals in the plaza.",
    },
}

return QuestConfig
\`\`\`

**One table** = easy balancing. Change \`goal\` or \`rewardCoins\` in one place.`,
      },
      {
        title: 'Per-player progress',
        content: `**QuestService** Script:

\`\`\`lua
local playerQuestState = {} -- [player] = { [questId] = state }

local function getState(player, questId)
    playerQuestState[player] = playerQuestState[player] or {}
    if not playerQuestState[player][questId] then
        playerQuestState[player][questId] = {
            started = false,
            progress = 0,
            completed = false,
        }
    end
    return playerQuestState[player][questId]
end
\`\`\`

**Never** one global \`progress = 3\` for whole server — Player B would steal Player A's quest.`,
      },
      {
        title: 'Accept quest flow',
        content: `Guide Maya dialogue last line → **Accept** button OR auto-start on dialogue key \`guide_quest\`:

\`\`\`lua
local function startQuest(player, questId)
    local cfg = QuestConfig[questId]
    if not cfg then return end
    local state = getState(player, questId)
    if state.completed then return end
    state.started = true
    QuestUpdate:FireClient(player, questId, state.progress, cfg.goal, false)
end
\`\`\`

**QuestUpdate** RemoteEvent → client updates \`QuestUI\` label:
\`Crystal Run: 0 / 5\``,
      },
      {
        title: 'Increment progress',
        content: `Crystal parts \`Crystal\` tag or name prefix — **Touched** server script:

\`\`\`lua
crystal.Touched:Connect(function(hit)
    local character = hit.Parent
    local player = game.Players:GetPlayerFromCharacter(character)
    if not player then return end

    local state = getState(player, "collect_crystals_01")
    if not state.started or state.completed then return end

    state.progress += 1
    local cfg = QuestConfig.collect_crystals_01

    if state.progress >= cfg.goal then
        completeQuest(player, "collect_crystals_01")
    else
        QuestUpdate:FireClient(player, "collect_crystals_01", state.progress, cfg.goal, false)
    end

    crystal:Destroy() -- or debounce per crystal
end)
\`\`\``,
      },
      {
        title: 'Complete and reward once',
        content: `\`\`\`lua
local function completeQuest(player, questId)
    local state = getState(player, questId)
    if state.completed then return end -- no double reward

    local cfg = QuestConfig[questId]
    state.completed = true
    state.progress = cfg.goal

    local coins = player.leaderstats.Coins
    if coins then
        coins.Value += cfg.rewardCoins
    end

    QuestUpdate:FireClient(player, questId, state.progress, cfg.goal, true)
    print(player.Name, "completed", questId)
end
\`\`\`

**completed** boolean blocks exploit re-claim.`,
      },
      {
        title: 'QuestUI on client',
        content: `**StarterGui** → \`QuestUI\` → \`QuestLabel\`

\`\`\`lua
QuestUpdate.OnClientEvent:Connect(function(questId, progress, goal, done)
    if done then
        QuestLabel.Text = "✓ Quest complete! +" .. QuestConfigDisplay[questId]
    else
        QuestLabel.Text = "Crystal Run: " .. progress .. " / " .. goal
    end
end)
\`\`\`

Display title from small client lookup table OR second arg from server message.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Accept quest → UI shows 0/5
- [ ] Each crystal increments (max 5)
- [ ] Complete grants coins once only
- [ ] Second player has independent progress
- [ ] Save: \`Lesson 8.4 — Quest System\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Global quest progress variable', explanation: 'All players share progress.', correctApproach: 'playerQuestState[player]' },
    { mistake: 'Reward without completed guard', explanation: 'Double coins exploit.', correctApproach: 'if state.completed then return' },
    { mistake: 'Progress on client only', explanation: 'Fake completion.', correctApproach: 'Server Touched + state' },
    { mistake: 'Crystals respawn instantly', explanation: 'Infinite progress.', correctApproach: 'Destroy or debounce per crystal' },
  ],
  summary: `You built QuestConfig, per-player quest state, crystal collection progress, one-time coin rewards, and QuestUI updates — players now have a trackable objective in your hub.`,
  practiceTask: {
    title: 'Build quest tables (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Collect 5 crystals quest end-to-end.

### Part A — Config (8 min)
1. QuestConfig with collect_crystals_01
2. QuestService + playerQuestState
3. QuestUpdate RemoteEvent

### Part B — Gameplay (12 min)
1. 5 crystal parts in plaza
2. Start quest from Guide dialogue or prompt option
3. Touch increments → complete at 5 → +50 coins

### Part C — Save (5 min)
1. QuestLabel updates live
2. **Save to Roblox** → \`Lesson 8.4 — Quest System\`
3. **Practice complete**`,
    hints: [
      'Use quest id strings everywhere — collect_crystals_01',
      'Test 2 players — separate progress',
      'Module 7 Coins leaderstat for reward',
    ],
    optionalChallenge: 'Second quest unlocks only after first completed.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Quest progress stored per…', options: ['Player on server', 'Whole server globally', 'Client only', 'Terrain'], correctAnswer: 0, explanation: 'Multiplayer safe.' },
      { id: 'q2', type: MC, question: 'completed flag prevents…', options: ['Double reward', 'Walking', 'UI', 'Sound'], correctAnswer: 0, explanation: 'One-time claim.' },
      { id: 'q3', type: MC, question: 'QuestConfig holds…', options: ['goal and rewardCoins', 'Player passwords', 'Terrain', 'Camera'], correctAnswer: 0, explanation: 'Central balance table.' },
      { id: 'q4', type: MC, question: 'Crystal touch should run on…', options: ['Server', 'LocalScript only', 'StarterGui', 'Lighting'], correctAnswer: 0, explanation: 'Trusted progress.' },
      { id: 'q5', type: MC, question: 'QuestUpdate sends…', options: ['progress and goal to UI', 'Free Robux', 'Terrain', 'Tool only'], correctAnswer: 0, explanation: 'Client display.' },
      { id: 'q6', type: MC, question: 'Quest flow order…', options: ['Accept → progress → complete → reward', 'Reward first', 'No accept', 'Delete player'], correctAnswer: 0, explanation: 'Standard loop.' },
      { id: 'q7', type: MC, question: 'quest id keys like collect_crystals_01…', options: ['Stay consistent in code', 'Change every line', 'Are optional', 'Replace Humanoid'], correctAnswer: 0, explanation: 'Naming discipline.' },
      { id: 'q8', type: MC, question: 'Lesson 8.4 builds on…', options: ['8.1-8.3 NPC hub', 'Only racing', 'Only shop UI', 'Empty'], correctAnswer: 0, explanation: 'Hub systems.' },
      { id: 'q9', type: MC, question: 'Lesson 8.5 adds…', options: ['Enemy attack', 'Only dialogue', 'Only patrol', 'Publish'], correctAnswer: 0, explanation: 'Combat enemy.' },
      { id: 'q10', type: MC, question: 'Lesson 8.4 save name…', options: ['Lesson 8.4 — Quest System', 'NPC Patrol', 'Living Location', 'Shop Works'], correctAnswer: 0, explanation: 'Save quest lesson.' },
    ],
  },
}

export const enLesson85 = {
  lessonId: 'lesson-roblox-8-5',
  moduleId: 'module-08',
  order: 5,
  title: '8.5 — Enemy That Attacks',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Build enemy with idle, chase, attack, cooldown states',
    'Chase nearest player in range on the server',
    'Apply TakeDamage with attack cooldown and telegraph',
    'Tag enemies with CollectionService for clean scripts',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `A living location needs **danger**. Today one **enemy** chases and attacks fairly.

**Lesson flow:**
1. **Theory (40 min)** — states + server damage
2. **Practice (~25 min)** — attack prototype
3. **Quiz (10 min)** — **70%** pass

Reuse Module 5 **Humanoid** / **TakeDamage** knowledge.`,
      },
      {
        title: 'Enemy behavior states',
        content: `| State | Behavior |
|-------|----------|
| **idle** | Stand or patrol small area |
| **chase** | MoveTo nearest player in aggro range |
| **attack** | Telegraph → damage |
| **cooldown** | Wait before next attack |

\`NPC_Enemy_Slime\` in \`Workspace/Enemies/\`

**CollectionService** tag \`Enemy\` — one script handles all tagged models.`,
      },
      {
        title: 'Aggro and chase',
        content: `\`\`\`lua
local AGGRO_RANGE = 40
local ATTACK_RANGE = 6

local function getNearestPlayer(position)
    local nearest, dist = nil, AGGRO_RANGE
    for _, player in ipairs(game.Players:GetPlayers()) do
        local char = player.Character
        local root = char and char:FindFirstChild("HumanoidRootPart")
        if root then
            local d = (root.Position - position).Magnitude
            if d < dist then
                nearest, dist = player, d
            end
        end
    end
    return nearest
end
\`\`\`

**Chase:** \`humanoid:MoveTo(targetRoot.Position)\` each 0.5s while in aggro.`,
      },
      {
        title: 'Attack with cooldown',
        content: `\`\`\`lua
local DAMAGE = 12
local COOLDOWN = 1.2
local onCooldown = false

local function tryAttack(enemy, targetChar)
    local root = targetChar:FindFirstChild("HumanoidRootPart")
    local hum = targetChar:FindFirstChildOfClass("Humanoid")
    if not root or not hum or onCooldown then return end

    if (enemy.PrimaryPart.Position - root.Position).Magnitude > ATTACK_RANGE then
        return
    end

    onCooldown = true
    -- Telegraph: red highlight or sound here
    task.wait(0.4) -- wind-up
    hum:TakeDamage(DAMAGE)
    task.delay(COOLDOWN, function()
        onCooldown = false
    end)
end
\`\`\`

**Damage on server** — same rule as Module 5 arena.`,
      },
      {
        title: 'Telegraph and fairness',
        content: `Before damage:
- **Play** short sound
- **Flash** Part color or ParticleEmitter burst
- **0.3–0.5s** wind-up delay

Players learn to **dodge** during wind-up — feels skill-based.

**WalkSpeed** enemy ~14, player default 16 — player can run away.`,
      },
      {
        title: 'Enemy setup checklist',
        content: `| Piece | Setting |
|-------|---------|
| Humanoid | MaxHealth 80 |
| WalkSpeed | 12–14 |
| PrimaryPart | HumanoidRootPart |
| Tag | Enemy (CollectionService) |

**Spawn zone** near quest crystals — quest flow: collect → fight → return.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Enemy chases within AGGRO_RANGE
- [ ] Damage only within ATTACK_RANGE + cooldown
- [ ] Telegraph visible before hit
- [ ] 2-player test — targets nearest correctly
- [ ] Save: \`Lesson 8.5 — Enemy Attack\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Damage in LocalScript', explanation: 'Exploitable.', correctApproach: 'Server TakeDamage' },
    { mistake: 'No cooldown', explanation: 'Instant melt.', correctApproach: '1.2s+ between hits' },
    { mistake: 'No telegraph', explanation: 'Feels unfair.', correctApproach: 'Wind-up delay + VFX' },
    { mistake: 'Enemy anchored', explanation: 'Cannot chase.', correctApproach: 'Unanchored with Humanoid' },
  ],
  summary: `You created an enemy with chase, telegraphed server-side attacks, cooldown damage, and CollectionService tagging — the hub now has combat that fits the quest loop.`,
  practiceTask: {
    title: 'Enemy attack prototype (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** One fair attacking enemy.

### Part A — Enemy rig (8 min)
1. NPC_Enemy_Slime + Humanoid + tag Enemy
2. Place near quest area

### Part B — AI script (15 min)
1. State loop: find nearest → chase → attack
2. TakeDamage 12, cooldown 1.2s, 0.4s telegraph

### Part C — Test & save (2 min)
1. 2-player aggro test
2. **Save to Roblox** → \`Lesson 8.5 — Enemy Attack\`
3. **Practice complete**`,
    hints: [
      'Module 5 respawn still works if player dies',
      'CollectionService:GetTagged("Enemy") scales to many enemies',
      'Print state changes while debugging',
    ],
    optionalChallenge: 'Jump during telegraph → half damage.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Enemy damage uses…', options: ['Humanoid:TakeDamage on server', 'Client print', 'Terrain', 'Coins'], correctAnswer: 0, explanation: 'Server authority.' },
      { id: 'q2', type: MC, question: 'Cooldown prevents…', options: ['Damage every frame', 'Walking', 'Quest', 'Dialogue'], correctAnswer: 0, explanation: 'Fair attack rate.' },
      { id: 'q3', type: MC, question: 'Telegraph gives player time to…', options: ['React and dodge', 'Fly', 'Shop', 'Publish'], correctAnswer: 0, explanation: 'Fairness.' },
      { id: 'q4', type: MC, question: 'Chase uses…', options: ['Humanoid:MoveTo', 'Terrain paint', 'RemoteFunction only', 'Atmosphere'], correctAnswer: 0, explanation: 'NPC movement.' },
      { id: 'q5', type: MC, question: 'CollectionService tag Enemy…', options: ['Groups enemies for scripts', 'Deletes players', 'Saves data', 'Opens UI'], correctAnswer: 0, explanation: 'Clean architecture.' },
      { id: 'q6', type: MC, question: 'ATTACK_RANGE 6 means…', options: ['Damage only when close', 'Damage from map-wide', 'No damage ever', 'Heal player'], correctAnswer: 0, explanation: 'Melee range.' },
      { id: 'q7', type: MC, question: 'States include…', options: ['idle chase attack cooldown', 'Only idle', 'Only shop', 'Only race'], correctAnswer: 0, explanation: 'Behavior machine.' },
      { id: 'q8', type: MC, question: 'Lesson 8.5 uses skills from…', options: ['Module 5 Humanoid damage', 'Module 1 terrain only', 'Module 12 publish', 'None'], correctAnswer: 0, explanation: 'Combat foundation.' },
      { id: 'q9', type: MC, question: 'Lesson 8.6 is…', options: ['Living Location checkpoint', 'Shop only', 'Race only', 'Empty'], correctAnswer: 0, explanation: 'Module finale.' },
      { id: 'q10', type: MC, question: 'Lesson 8.5 save name…', options: ['Lesson 8.5 — Enemy Attack', 'Quest System', 'Dialogue System', 'Arena Ready'], correctAnswer: 0, explanation: 'Save enemy lesson.' },
    ],
  },
}

export const enLesson86 = {
  lessonId: 'lesson-roblox-8-6',
  moduleId: 'module-08',
  order: 6,
  title: '8.6 — Checkpoint: Living Location',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Integrate guide NPC, patrol, dialogue, quest, and enemy',
    'Pass full player loop QA from spawn to reward',
    'Keep systems in separate modules for maintainability',
    'Ship Module 8 — Living Location portfolio save',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Living Location** = Module 8 portfolio — a mini zone that feels **alive**.

**Required:**
- Guide NPC + dialogue (8.1–8.2)
- Patrol NPC (8.3)
- Quest collect crystals (8.4)
- Attacking enemy (8.5)
- Shop from Module 7 optional nearby

**Save:** \`Module 8 — Living Location\``,
      },
      {
        title: 'Living location blueprint',
        content: `\`\`\`
Workspace
├── NPCs/
│   ├── NPC_Guide_Maya      (dialogue + quest giver)
│   └── NPC_Patrol_Guard    (patrol loop)
├── Enemies/
│   └── NPC_Enemy_Slime
├── QuestProps/
│   └── Crystals x5
├── PatrolRoutes/
│   └── Route_ShopLoop
└── ShopArea (from Module 7)

ServerScriptService
├── DialogueData
├── QuestConfig + QuestService
├── ShopConfig (optional)
└── EnemyAI / NPC scripts
\`\`\``,
      },
      {
        title: 'Experience flow test',
        content: `**Golden path** (one player, ~3 min):

| Step | Action | Pass? |
|------|--------|-------|
| 1 | Spawn in hub | |
| 2 | Talk to Guide Maya — dialogue | |
| 3 | Accept / start crystal quest | |
| 4 | Collect 5 crystals — UI updates | |
| 5 | Fight slime enemy — survive | |
| 6 | Complete quest — coins reward | |
| 7 | See patrol NPC walking | |

If confused at any step → fix signposting (arrows, dialogue hint).`,
      },
      {
        title: 'Multiplayer QA',
        content: `**2 players:**
- Independent quest progress
- Enemy targets nearest — no shared HP bugs
- Dialogue does not block other player's UI
- Patrol visible to both

**Output:** zero red errors during golden path × 2.`,
      },
      {
        title: 'Checkpoint quality bar',
        content: `| Bar | Standard |
|-----|----------|
| Scripts | Separated by system (Quest, Dialogue, Enemy) |
| UI text | Readable, no overlap |
| Quest | Progress accurate, reward once |
| Combat | Telegraph + cooldown |
| Polish | No debug prints spamming |

**Reliability > extra features** for checkpoint.`,
      },
      {
        title: '60-second demo script',
        content: `1. Spawn — pan hub (patrol + guide)
2. Talk — 2 dialogue lines
3. Quest appears 0/5
4. Collect 2 crystals — counter updates
5. Quick fight with slime
6. Finish quest — coin popup / label
7. Open shop optional

Record for portfolio or teacher review.`,
      },
      {
        title: 'Module 9 preview',
        content: `**Module 9** often covers **teams, rounds, match flow** — your living hub can become lobby between rounds.

**Before practice:**
- [ ] Golden path passes
- [ ] 2-player QA passes
- [ ] **Save to Roblox** → \`Module 8 — Living Location\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'All code in one giant script', explanation: 'Unmaintainable.', correctApproach: 'QuestService, DialogueData, EnemyAI separate' },
    { mistake: 'Quest and dialogue ids mismatch', explanation: 'Quest never starts.', correctApproach: 'Shared constants module' },
    { mistake: 'Skipping golden path test', explanation: 'Broken flow at demo.', correctApproach: 'Full loop before save' },
    { mistake: 'Enemy blocks quest crystals', explanation: 'Frustration.', correctApproach: 'Space crystals away from spawn camp' },
  ],
  summary: `You integrated NPCs, dialogue, patrol, quests, and combat into Living Location, passed solo and multiplayer QA, and saved a demo-ready hub — Module 8 is complete.`,
  practiceTask: {
    title: 'Ship Living Location (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Complete living zone checkpoint.

### Part A — Integrate (15 min)
1. Merge 8.1–8.5 into one place
2. Folder structure + separate server modules
3. Signs/arrows if flow unclear

### Part B — Golden path + 2P (20 min)
1. Run experience flow table — fix fails
2. Two-player independent quest test
3. Clear Output errors

### Part C — Demo save (5 min)
1. Rehearse 60s demo
2. **Save to Roblox** → \`Module 8 — Living Location\`
3. **Practice complete**`,
    hints: [
      'Fix one system at a time',
      'Guide dialogue should mention crystals and danger',
      'Patrol NPC is atmosphere — quest is goal',
    ],
    optionalChallenge: 'Lights flicker or banner when quest completes.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Living Location includes…', options: ['NPC + dialogue + quest + enemy', 'Only terrain', 'Only shop', 'No scripts'], correctAnswer: 0, explanation: 'Full module 8.' },
      { id: 'q2', type: MC, question: 'Golden path ends with…', options: ['Quest reward claimed', 'Publish only', 'Delete NPCs', 'Empty baseplate'], correctAnswer: 0, explanation: 'Complete loop.' },
      { id: 'q3', type: MC, question: '2-player quest test checks…', options: ['Independent progress', 'Shared one quest', 'No server', 'UI only'], correctAnswer: 0, explanation: 'Per-player state.' },
      { id: 'q4', type: MC, question: 'Separate scripts help…', options: ['Maintainability', 'Lag only', 'Remove UI', 'Ban players'], correctAnswer: 0, explanation: 'Clean architecture.' },
      { id: 'q5', type: MC, question: 'Patrol NPC adds…', options: ['Alive atmosphere', 'Shop prices', 'DataStore', 'Publishing'], correctAnswer: 0, explanation: 'World feel.' },
      { id: 'q6', type: MC, question: 'Module 8 save name…', options: ['Module 8 — Living Location', 'Shop Works', 'Race Launched', 'Lesson 8.1'], correctAnswer: 0, explanation: 'Checkpoint.' },
      { id: 'q7', type: MC, question: 'Checkpoint prioritizes…', options: ['Clear flow and reliability', 'Most enemies possible', 'No tests', 'Client quests'], correctAnswer: 0, explanation: 'Quality bar.' },
      { id: 'q8', type: MC, question: 'Lesson 8.6 completes…', options: ['Module 8 Smart Game', 'Module 12', 'Module 1', 'UK only'], correctAnswer: 0, explanation: 'End module 8.' },
      { id: 'q9', type: MC, question: 'Guide should mention…', options: ['Quest objective in dialogue', 'Server IP', 'Robux', 'Version only'], correctAnswer: 0, explanation: 'UX signposting.' },
      { id: 'q10', type: MC, question: 'Enemy near quest should be…', options: ['Fair spacing — not blocking all crystals', 'On every crystal', 'Removed', 'Invisible'], correctAnswer: 0, explanation: 'Fun pacing.' },
    ],
  },
}
