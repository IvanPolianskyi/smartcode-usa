/** Rich EN content for Roblox Module 03 - lessons 3.1-3.6 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson31 = {
  lessonId: 'lesson-roblox-3-1',
  moduleId: 'module-03',
  order: 1,
  title: '3.1 - Coins on the Map',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Design coin placement that guides player movement',
    'Build a reusable coin prefab Part',
    'Organize coins in folders with clear names',
    'Prepare a map for simulator-style collecting',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Module 3 - A Game That Remembers You** starts the **coin simulator** genre - collect, grow, repeat.

**Lesson flow:**
1. **Theory (40 min)** - coin prefab + smart placement
2. **Practice (~25 min)** - 30+ coins in three zones
3. **Quiz (10 min)** - **70%** pass

Use your **Module 2 - Obby Ready** place or duplicate it as \`Lesson 3.1 - Coin World\`. Today is **building only** - scripts come in 3.2.`,
      },
      {
        title: 'From obby to simulator',
        content: `| Obby (Module 2) | Simulator (Module 3) |
|-----------------|------------------------|
| Reach finish | Collect resources |
| Avoid lava | Chase glowing coins |
| Speed rank | Growing number |

**Good coin maps teach route:**
- Where to go next without a giant arrow
- Risk vs reward paths
- Exploration secrets`,
      },
      {
        title: 'Build the coin prefab',
        content: `Create one master coin:

| Property | Value |
|----------|-------|
| Shape | **Cylinder** (coin look) |
| Size | \`2, 0.4, 2\` |
| Material | **Neon** or Metal |
| BrickColor | **New Yeller** or Bright yellow |
| Anchored | **true** |
| CanCollide | **false** (walk through) |
| Name | \`CoinPrefab\` |

**Polish:**
- Raise Y slightly above ground (hover)
- **PointLight** - yellow, Range 6
- Optional slow spin later (Module 10)

**Exercise (8 min):** Duplicate prefab 5 times in a line - spacing feels rhythmic, not random.`,
      },
      {
        title: 'Placement patterns',
        content: `**Trail line** - coins along safe path (beginners follow)

**Risk jump** - 3 coins over lava gap (skilled players)

**Cluster zone** - 8 coins around a landmark (exploration reward)

**Density guide:**
| Zone | Coins | Difficulty |
|------|-------|------------|
| Spawn area | 10-12 | Easy |
| Mid island | 10-12 | Medium |
| Far / high | 8+ | Harder jumps |

**Exercise (10 min):** Place **15** coins using all three patterns before continuing.`,
      },
      {
        title: 'Folder organization',
        content: `**Workspace** structure:

\`\`\`
Coins/
  Common/     ← Coin_001 ... Coin_030
  Rare/       ← optional CoinRare_01 (cyan, bigger)
\`\`\`

**Naming rules:**
- \`Coin_001\` not \`Part\`
- Leading zeros keep sort order in Explorer
- One prefab duplicated, then rename each copy

**Why folders matter:** Lesson 3.2 adds one script to **all** coins - clean trees = fast debugging.`,
      },
      {
        title: 'Visibility and pacing',
        content: `Players need an **instant goal** at spawn:
- First coin visible within **5 seconds** of walking
- Last coin in zone 3 should take **60+ seconds** to reach

**Avoid:**
- All 30 coins in one flat cluster (boring)
- Coins inside terrain (hard to see)
- Coins floating too high to jump

**Sign at spawn:** \`Collect coins - scripts next lesson!\``,
      },
      {
        title: 'Rare coins (optional preview)',
        content: `Duplicate prefab for **Rare** folder:
- Size \`2.5, 0.5, 2.5\`
- BrickColor **Cyan** or **Gold**
- Brighter PointLight

You will award **+5** in Lesson 3.3 - today only **build** them (5 rare max).

Label \`CoinRare_01\` ... in \`Coins/Rare\`.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] CoinPrefab: cylinder, yellow, CanCollide false
- [ ] Folder \`Coins/Common\` exists
- [ ] **30+** coins placed in 3 zones
- [ ] Every coin has unique name
- [ ] Save: \`Lesson 3.1 - Coin Route\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'CanCollide true on coins', explanation: 'Players bump and miss pickups later.', correctApproach: 'CanCollide false - walk through to collect in 3.2' },
    { mistake: 'All coins named Part', explanation: 'Cannot find broken coin in 30 copies.', correctApproach: 'Coin_001 style names immediately' },
    { mistake: 'Coins buried in terrain', explanation: 'Invisible collectibles frustrate players.', correctApproach: 'Raise Y; test camera angle from spawn' },
    { mistake: 'Only 5 coins total', explanation: 'Not enough for simulator feel.', correctApproach: 'Minimum 30 for practice requirement' },
  ],
  summary: `You built a yellow coin prefab, placed 30+ coins in trail, risk, and cluster patterns, and organized Workspace folders - your map is ready for collection scripts.`,
  practiceTask: {
    title: 'Coin route - 30+ pickups (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Three zones of coins, zero scripts yet.

### Part A - Prefab (5 min)
1. Build \`CoinPrefab\` (cylinder, neon yellow, CanCollide false)
2. Add PointLight glow

### Part B - Zones (15 min)
1. **Easy zone** near spawn: **12** coins in trail
2. **Mid zone** toward obby/dock: **10** coins (one risk jump line)
3. **Hard zone** far side: **8+** coins + optional **5 rare** cyan coins

### Part C - Organize & save (5 min)
1. Move all into \`Coins/Common\` and \`Coins/Rare\`
2. Rename \`Coin_001\` through \`Coin_030\`+
3. **Save to Roblox** → \`Lesson 3.1 - Coin Route\`
4. **Practice complete**`,
    hints: [
      'Ctrl+D duplicate along a path - then rename in Explorer',
      'Stand at spawn in Play - you should see at least one coin immediately',
      'Rare coins belong in harder-to-reach spots',
    ],
    optionalChallenge: 'Five hidden coins behind terrain or dock - reward explorers.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Module 3 focus is...', options: ['Collecting economy', 'Only terrain', 'Publishing only', 'No Parts'], correctAnswer: 0, explanation: 'Module 3 is coin simulator style.' },
      { id: 'q2', type: MC, question: 'Coin CanCollide should be...', options: ['false', 'true always', 'nil', 'only for lava'], correctAnswer: 0, explanation: 'Players walk through to collect.' },
      { id: 'q3', type: MC, question: 'CoinPrefab shape is usually...', options: ['Cylinder', 'SpawnLocation', 'Sky', 'Script'], correctAnswer: 0, explanation: 'Cylinder reads as a coin disc.' },
      { id: 'q4', type: MC, question: 'Trail line placement...', options: ['Guides beginner route', 'Deletes coins', 'Adds lava', 'Removes UI'], correctAnswer: 0, explanation: 'Lines teach where to go.' },
      { id: 'q5', type: MC, question: 'Coins folder helps...', options: ['Organize before scripting', 'Ban players', 'Change language', 'Remove Humanoid'], correctAnswer: 0, explanation: 'Folders keep Explorer clean.' },
      { id: 'q6', type: MC, question: 'Practice requires at least...', options: ['30 coins', '1 coin', '0 coins', '1000 scripts'], correctAnswer: 0, explanation: '30+ coins for simulator density.' },
      { id: 'q7', type: MC, question: 'Good coin names look like...', options: ['Coin_001', 'Part, Part, Part', 'asdf', 'Script1'], correctAnswer: 0, explanation: 'Numbered names sort and debug easily.' },
      { id: 'q8', type: MC, question: 'Scripts for pickup come in...', options: ['Lesson 3.2', 'Lesson 1.1 only', 'Never', 'Module 12 only'], correctAnswer: 0, explanation: '3.1 is layout only.' },
      { id: 'q9', type: MC, question: 'Rare coins are often...', options: ['Harder to reach + different color', 'Invisible', 'Under SpawnLocation', 'Scripts only'], correctAnswer: 0, explanation: 'Rare = reward + visual difference.' },
      { id: 'q10', type: MC, question: 'Lesson 3.1 save name...', options: ['Lesson 3.1 - Coin Route', 'Obby Ready', 'Click Magic', 'Untitled'], correctAnswer: 0, explanation: 'Save after placing coins.' },
    ],
  },
}

export const enLesson32 = {
  lessonId: 'lesson-roblox-3-2',
  moduleId: 'module-03',
  order: 2,
  title: '3.2 - Collecting Coins',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Detect coin collection with Touched on the server',
    'Use a debounce flag to prevent double collection',
    'Hide coins after pickup with Transparency',
    'Optionally respawn coins after a delay',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Your coins are decorations until **Touched** makes them gameplay.

**Lesson flow:**
1. **Theory (40 min)** - server pickup + debounce
2. **Practice (~25 min)** - 15+ working collectors
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 3.1 - Coin Route**.`,
      },
      {
        title: 'Collection requirements',
        content: `A fair coin system must:
- Count **once** per touch cycle
- Feel instant (no laggy delay)
- Work for **every** player in the server
- Not spam **Touched** events

**Server Script** inside each coin (same pattern as lava, different result).`,
      },
      {
        title: 'Basic pickup script',
        content: `Insert **Script** inside \`CoinPrefab\` (or one coin), then duplicate coin **with** script:

\`\`\`lua
local coin = script.Parent
local collected = false

coin.Touched:Connect(function(hit)
    if collected then
        return
    end

    local character = hit.Parent
    if not character then
        return
    end

    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then
        return
    end

    local player = game:GetService("Players"):GetPlayerFromCharacter(character)
    if not player then
        return
    end

    collected = true
    coin.Transparency = 1
    coin.CanCollide = false

    print(player.Name .. " collected " .. coin.Name)
end)
\`\`\`

**Exercise (8 min):** Test one coin in Play - touch once, coin vanishes, print once.`,
      },
      {
        title: 'Debounce explained',
        content: `\`Touched\` can fire **many times per second** while you stand inside the coin.

| Without debounce | With debounce |
|------------------|---------------|
| +10 fake pickups | Exactly 1 pickup |
| Sound spam | One sound |
| Future score bugs | Stable Coins value |

\`collected = true\` at the start of successful pickup blocks repeats.

**Test:** Stand inside coin 3 seconds - Output should show **one** print.`,
      },
      {
        title: 'Deploy to many coins fast',
        content: `**Method 1:** Build script in \`CoinPrefab\` → duplicate coin+script to all slots.

**Method 2:** One working coin → **Ctrl+D** 15 times → rename.

**Method 3 (advanced later):** Single server script loops all coins in folder - Lesson 3.4 functions help.

For today: **Method 1 or 2** on at least **15** coins in \`Coins/Common\`.`,
      },
      {
        title: 'Pickup feedback - sound and VFX',
        content: `Add **Sound** child \`PickupSound\` on coin prefab:

\`\`\`lua
local sound = coin:FindFirstChild("PickupSound")
if sound then
    sound:Play()
end
\`\`\`

Place before hiding coin (Transparency = 1).

**Optional:** small **ParticleEmitter** burst - disable after 0.5s.

Players **feel** the reward before the coin disappears.`,
      },
      {
        title: 'Respawn coins (simulator style)',
        content: `One-time coins = empty map after full clear.

**Respawn** after 15 seconds:

\`\`\`lua
task.delay(15, function()
    collected = false
    coin.Transparency = 0
    -- CanCollide stays false
end)
\`\`\`

Put **after** hiding the coin. Test: wait 15s, coin returns, collect again.

**Pick one** for practice: session-only **or** respawn - document in a comment.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Script is server Script, child of coin
- [ ] Humanoid + GetPlayerFromCharacter checks present
- [ ] Debounce tested with 3-second stand-on-coin
- [ ] 15+ coins collect exactly once per cycle
- [ ] Save: \`Lesson 3.2 - Collecting Coins\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'LocalScript on coin', explanation: 'Other players may not see same behavior.', correctApproach: 'Server Script for world pickups' },
    { mistake: 'No debounce - score jumps +10', explanation: 'Touched fires repeatedly.', correctApproach: 'collected flag set true on first valid touch' },
    { mistake: 'Destroy coin with :Destroy()', explanation: 'Harder to respawn; breaks references.', correctApproach: 'Transparency 1 hide for respawn lessons' },
    { mistake: 'Forgot Humanoid check', explanation: 'Random parts trigger pickup.', correctApproach: 'Same pattern as kill blocks and checkpoints' },
  ],
  summary: `You wired server Touched pickup with debounce, hid coins on collect, added optional sound, and tested repeat touches - your coin route is now playable.`,
  practiceTask: {
    title: 'Stable pickup - 15+ coins (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Every coin collects once per cycle.

### Part A - Template script (10 min)
1. Add pickup Script to \`CoinPrefab\` (debounce + hide + print)
2. Test in Play - one coin, one print

### Part B - Roll out (10 min)
1. Apply to **15+** coins in \`Coins/Common\`
2. Optional PickupSound on prefab
3. Spam-touch test: no double prints

### Part C - Respawn or save (5 min)
1. Add 15s respawn on **3** coins OR keep one-time on rest
2. **Save to Roblox** → \`Lesson 3.2 - Collecting Coins\`
3. **Practice complete**`,
    hints: [
      'Duplicate coin that already has Script - fastest rollout',
      'Print to Output until all 15 work, then remove prints',
      'Rare folder coins can use same script with different name',
    ],
    optionalChallenge: 'PickupSound only plays on successful first collect.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Coin pickup should use...', options: ['Server Script in coin', 'LocalScript only in Head', 'Terrain brush', 'Sky'], correctAnswer: 0, explanation: 'Server handles world pickups.' },
      { id: 'q2', type: MC, question: 'Debounce uses a variable like...', options: ['collected = true', 'Transparency = 5', 'Anchored false', 'Delete Workspace'], correctAnswer: 0, explanation: 'Flag blocks repeat touches.' },
      { id: 'q3', type: MC, question: 'After pickup, hide with...', options: ['Transparency = 1', 'Rename to Part', 'Remove Humanoid', 'Publish'], correctAnswer: 0, explanation: 'Invisible but respawnable.' },
      { id: 'q4', type: MC, question: 'GetPlayerFromCharacter needs...', options: ['Valid character touch', 'Only lava', 'ClockTime', 'Atmosphere'], correctAnswer: 0, explanation: 'Links body to player account.' },
      { id: 'q5', type: MC, question: 'Touched fires many times if...', options: ['Player stays overlapping coin', 'Game is saved', 'Coin is anchored', 'Sky is blue'], correctAnswer: 0, explanation: 'Overlap causes repeat events.' },
      { id: 'q6', type: MC, question: 'task.delay(15, ...) can...', options: ['Respawn coin after 15 seconds', 'Delete player', 'Remove UI', 'Change language'], correctAnswer: 0, explanation: 'Delayed respawn pattern.' },
      { id: 'q7', type: MC, question: 'print on collect helps...', options: ['Debug before leaderstats', 'Publish game', 'Add terrain', 'Remove checkpoints'], correctAnswer: 0, explanation: 'Output verifies pickups.' },
      { id: 'q8', type: MC, question: 'PickupSound should play...', options: ['Once per successful collect', 'Every frame', 'Never', 'Only in Edit'], correctAnswer: 0, explanation: 'Debounce prevents sound spam.' },
      { id: 'q9', type: MC, question: 'Lesson 3.2 builds on...', options: ['Lesson 3.1 coin placement', 'Only Module 1', 'Empty map', 'Web dev'], correctAnswer: 0, explanation: 'Scripts attach to 3.1 coins.' },
      { id: 'q10', type: MC, question: 'Lesson 3.2 save name...', options: ['Lesson 3.2 - Collecting Coins', 'Coin Route', 'Obby Timer', 'Victory Screen'], correctAnswer: 0, explanation: 'Save after pickup works.' },
    ],
  },
}

export const enLesson33 = {
  lessonId: 'lesson-roblox-3-3',
  moduleId: 'module-03',
  order: 3,
  title: '3.3 - Score on Screen + leaderstats',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Create leaderstats with Coins IntValue on PlayerAdded',
    'Increment Coins from coin pickup scripts on the server',
    'Mirror score in a ScreenGui HUD with LocalScript',
    'Use GetPropertyChangedSignal for live UI updates',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Collecting coins is fun. Seeing the number **grow** is addictive.

**Lesson flow:**
1. **Theory (40 min)** - leaderstats + HUD
2. **Practice (~25 min)** - live score on screen and tab list
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 3.2 - Collecting Coins**.`,
      },
      {
        title: 'What is leaderstats?',
        content: `Roblox shows a **leaderboard** (Tab key) when players have a folder named exactly \`leaderstats\` with **IntValue** stats inside.

| Child | Shows as |
|-------|----------|
| \`Coins\` IntValue | Coins column |

**Server creates** leaderstats - clients should not fake scores (cheating).

**Exercise (2 min):** Press Tab in any popular Roblox game - notice Coins, Time, Points columns.`,
      },
      {
        title: 'PlayerAdded - create stats once',
        content: `**ServerScriptService** → new **Script** \`LeaderstatsSetup\`:

\`\`\`lua
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = 0
    coins.Parent = leaderstats
end)
\`\`\`

**Play** - Tab list shows **Coins: 0** for you.

**Why ServerScriptService?** Runs once on server when game starts - perfect for setup.`,
      },
      {
        title: 'Award +1 on coin pickup',
        content: `Inside your coin Script, after \`collected = true\`:

\`\`\`lua
local stats = player:FindFirstChild("leaderstats")
if stats then
    local coinsStat = stats:FindFirstChild("Coins")
    if coinsStat then
        coinsStat.Value += 1
    end
end
\`\`\`

**\`+= 1\`** adds exactly one per successful pickup (debounce protects this).

**Rare coin bonus:**

\`\`\`lua
if string.find(coin.Name, "Rare") then
    coinsStat.Value += 4  -- +5 total if you already added 1, or set +5 only
end
\`\`\`

Pick clear rule: rare = **+5 total** per pickup.`,
      },
      {
        title: 'Coins HUD - ScreenGui',
        content: `**StarterGui** → \`ScreenGui\` \`CoinsHUD\`
→ \`TextLabel\` \`CoinsLabel\`

Style: top-left, dark background, **TextScaled**, text \`Coins: 0\`

**LocalScript** in \`CoinsHUD\`:

\`\`\`lua
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local label = script.Parent:WaitForChild("CoinsLabel")

local function updateDisplay()
    local stats = player:FindFirstChild("leaderstats")
    if not stats then return end
    local coins = stats:WaitForChild("Coins")
    label.Text = "Coins: " .. coins.Value
end

player.ChildAdded:Connect(function(child)
    if child.Name == "leaderstats" then
        updateDisplay()
        child:WaitForChild("Coins"):GetPropertyChangedSignal("Value"):Connect(updateDisplay)
    end
end)

-- If leaderstats already exists (late join script fix):
if player:FindFirstChild("leaderstats") then
    updateDisplay()
    player.leaderstats.Coins:GetPropertyChangedSignal("Value"):Connect(updateDisplay)
end
\`\`\`

**Exercise (10 min):** Collect 5 coins - HUD and Tab list both show 5.`,
      },
      {
        title: 'Timing - WaitForChild',
        content: `Scripts race at spawn:
- Coin touched before leaderstats exists → no points
- HUD loads before leaderstats → nil error

**Fixes:**
- \`player:WaitForChild("leaderstats")\` in coin script if needed
- HUD listens to \`ChildAdded\` and \`GetPropertyChangedSignal\`

**Test:** Reset character (respawn) - Coins value should **stay** (same session).`,
      },
      {
        title: 'Trusted server economy',
        content: `| Do on server | Do NOT on client for score |
|-------------|------------------------------|
| Create leaderstats | Fake +9999 in LocalScript |
| Increment Coins | Trust client touch alone |

Later modules add **DataStore** to save Coins between sessions. Today = **in-session** score only.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] LeaderstatsSetup in ServerScriptService
- [ ] Coin script adds to Coins IntValue
- [ ] CoinsHUD updates when collecting
- [ ] Tab leaderboard matches HUD
- [ ] Save: \`Lesson 3.3 - Coins HUD\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'leaderstats typo', explanation: 'Must be exact name for Tab UI.', correctApproach: 'Folder name leaderstats lowercase, child Coins' },
    { mistake: 'IntValue named Coin not Coins', explanation: 'Script looks for wrong child.', correctApproach: 'Match names in all scripts' },
    { mistake: 'Client adds to Coins', explanation: 'Exploiters can cheat scores.', correctApproach: 'Only server coin Script increments Value' },
    { mistake: 'HUD never updates', explanation: 'No Changed signal connected.', correctApproach: 'GetPropertyChangedSignal("Value") on Coins' },
  ],
  summary: `You created leaderstats with Coins, incremented score from server pickups, and built a CoinsHUD that updates live - your simulator now shows progress on screen and in the player list.`,
  practiceTask: {
    title: 'Coins HUD - live score (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Pickup increases Tab list + HUD.

### Part A - leaderstats (8 min)
1. \`LeaderstatsSetup\` in ServerScriptService
2. Play - Tab shows Coins: 0

### Part B - Wire pickups (10 min)
1. Add \`coinsStat.Value += 1\` to coin scripts (15+ coins)
2. Rare coins +5 if you built them in 3.1
3. Collect 10 - Tab shows 10

### Part C - HUD (7 min)
1. \`CoinsHUD\` + LocalScript mirror
2. Collect coins - label updates instantly
3. **Save to Roblox** → \`Lesson 3.3 - Coins HUD\`
4. **Practice complete**`,
    hints: [
      'If HUD stuck at 0, check leaderstats exists under Player not Workspace',
      'WaitForChild("Coins") after leaderstats exists',
      'Server print coin.Value after pickup to verify increment',
    ],
    optionalChallenge: 'Second stat IntValue "Gems" for rare coins only.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'leaderstats folder name must be...', options: ['leaderstats exactly', 'LeaderStats', 'stats', 'coins'], correctAnswer: 0, explanation: 'Roblox expects exact spelling.' },
      { id: 'q2', type: MC, question: 'Coins stat type is...', options: ['IntValue', 'StringValue', 'BoolValue', 'Terrain'], correctAnswer: 0, explanation: 'Whole numbers use IntValue.' },
      { id: 'q3', type: MC, question: 'PlayerAdded fires when...', options: ['A player joins', 'Coin touches lava', 'UI clicks', 'Terrain paints'], correctAnswer: 0, explanation: 'Setup runs per joining player.' },
      { id: 'q4', type: MC, question: 'coins.Value += 1 should run on...', options: ['Server coin Script', 'LocalScript only HUD', 'Client chat', 'Sky'], correctAnswer: 0, explanation: 'Server trusts economy.' },
      { id: 'q5', type: MC, question: 'GetPropertyChangedSignal("Value")...', options: ['Updates HUD when Coins change', 'Deletes player', 'Adds terrain', 'Publishes'], correctAnswer: 0, explanation: 'Signal fires on stat changes.' },
      { id: 'q6', type: MC, question: 'Tab key shows...', options: ['Leaderboard with leaderstats', 'Explorer', 'Properties', 'Toolbox'], correctAnswer: 0, explanation: 'Tab opens player list stats.' },
      { id: 'q7', type: MC, question: 'CoinsHUD LocalScript belongs in...', options: ['StarterGui', 'Workspace lava', 'Terrain', 'Kill block'], correctAnswer: 0, explanation: 'UI clones from StarterGui.' },
      { id: 'q8', type: MC, question: 'Debounce still matters because...', options: ['Prevents double increment', 'Changes sky', 'Removes obby', 'Disables Tab'], correctAnswer: 0, explanation: 'Multiple Touched would add too many.' },
      { id: 'q9', type: MC, question: 'Between sessions, Coins reset until...', options: ['DataStore in later lesson', 'Saving rbxl only', 'Changing color', 'F key'], correctAnswer: 0, explanation: 'Module 3.5 adds persistence.' },
      { id: 'q10', type: MC, question: 'Lesson 3.3 save name...', options: ['Lesson 3.3 - Coins HUD', 'Collecting Coins', 'Obby Ready', 'Finish Grades'], correctAnswer: 0, explanation: 'Save after HUD works.' },
    ],
  },
}

export const enLesson34 = {
  lessonId: 'lesson-roblox-3-4',
  moduleId: 'module-03',
  order: 4,
  title: '3.4 - Functions',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Write local functions with parameters and return values',
    'Refactor coin pickup into reusable helper functions',
    'Use one server script for all coins in a folder',
    'Apply readable naming and early-return patterns',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `You have **30 scripts** doing the same thing. One bug = fix 30 times. **Functions** fix that.

**Lesson flow:**
1. **Theory (40 min)** - functions + one \`CoinService\` script
2. **Practice (~25 min)** - refactor pickups
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 3.3 - Coins HUD**. You will **remove** duplicate coin scripts and replace with **one** organized script.`,
      },
      {
        title: 'Why functions exist',
        content: `| Without functions | With functions |
|-------------------|----------------|
| Copy-paste 30 blocks | Write once, call many times |
| Fix bug in 30 files | Fix bug in one function |
| Hard to read | Clear steps: validate → award → hide |

**Real studios** use functions everywhere - you are learning pro habits early.`,
      },
      {
        title: 'Function syntax in Luau',
        content: `\`\`\`lua
local function add(a, b)
    return a + b
end

local total = add(3, 5)  -- 8
\`\`\`

**Parts:**
- \`local function name(...)\` - defines the function
- \`return\` - sends a value back (optional)
- Call with \`name(arguments)\`

\`\`\`lua
local function sayHello(playerName)
    print("Hello, " .. playerName)
end

sayHello("Alex")
\`\`\`

**Exercise (5 min):** Make \`double(n)\` that returns n * 2. Print \`double(10)\` in Output.`,
      },
      {
        title: 'awardCoins(player, amount)',
        content: `\`\`\`lua
local function awardCoins(player, amount)
    local stats = player:FindFirstChild("leaderstats")
    if not stats then
        return
    end

    local coinsStat = stats:FindFirstChild("Coins")
    if not coinsStat then
        return
    end

    coinsStat.Value += amount
end
\`\`\`

**Early return** when something is missing - avoids nested \`if\` mess.

Call: \`awardCoins(player, 1)\` for common, \`awardCoins(player, 5)\` for rare.`,
      },
      {
        title: 'getCoinValue(coinName)',
        content: `\`\`\`lua
local function getCoinValue(coinName)
    if string.find(coinName, "Rare") then
        return 5
    end
    return 1
end
\`\`\`

\`string.find\` returns position if "Rare" appears in name - \`CoinRare_03\` gives 5.

**Exercise (3 min):** Predict values for \`Coin_001\` and \`CoinRare_01\`.`,
      },
      {
        title: 'hideCoin(coin) and resetCoin(coin)',
        content: `\`\`\`lua
local function hideCoin(coin)
    coin.Transparency = 1
    coin.CanCollide = false
end

local function resetCoin(coin, collectedFlags)
    task.delay(15, function()
        collectedFlags[coin] = nil
        coin.Transparency = 0
    end)
end
\`\`\`

Use a **table** \`collectedFlags = {}\` keyed by coin instead of one variable per script:

\`\`\`lua
if collectedFlags[coin] then return end
collectedFlags[coin] = true
\`\`\``,
      },
      {
        title: 'One script for all coins',
        content: `**ServerScriptService** → Script \`CoinCollector\`:

\`\`\`lua
local Players = game:GetService("Players")
local coinsFolder = workspace:WaitForChild("Coins")
local collectedFlags = {}

local function getPlayerFromHit(hit)
    local character = hit.Parent
    if not character then return nil end
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then return nil end
    return Players:GetPlayerFromCharacter(character)
end

-- awardCoins, getCoinValue, hideCoin here ...

local function connectCoin(coin)
    coin.Touched:Connect(function(hit)
        if collectedFlags[coin] then return end
        local player = getPlayerFromHit(hit)
        if not player then return end

        collectedFlags[coin] = true
        hideCoin(coin)
        awardCoins(player, getCoinValue(coin.Name))
    end)
end

for _, folder in coinsFolder:GetChildren() do
    if folder:IsA("Folder") then
        for _, coin in folder:GetDescendants() do
            if coin:IsA("BasePart") and coin.Name:find("Coin") then
                connectCoin(coin)
            end
        end
    end
end
\`\`\`

**Delete** old per-coin Scripts after this works.`,
      },
      {
        title: 'formatCoins for UI (optional)',
        content: `\`\`\`lua
local function formatCoins(value)
    if value >= 1000 then
        return string.format("%d Coins", value)
    end
    return "Coins: " .. value
end
\`\`\`

Use in HUD later for **1,250 Coins** style text.

**Before practice checklist:**
- [ ] CoinCollector in ServerScriptService
- [ ] Per-coin Scripts removed (no double awards)
- [ ] Collect common + rare - correct amounts
- [ ] Save: \`Lesson 3.4 - Coin Functions\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Left old scripts AND new CoinCollector', explanation: 'Double pickup and double coins.', correctApproach: 'Disable or delete per-coin Scripts after testing new one' },
    { mistake: 'Forgot return in awardCoins', explanation: 'Code falls through and errors.', correctApproach: 'Early return when leaderstats missing' },
    { mistake: 'connectedFlags uses coin name string only', explanation: 'Two coins named same would conflict.', correctApproach: 'Use collectedFlags[coin] with coin instance as key' },
    { mistake: 'Functions defined after they are called', explanation: 'Local functions must exist before use in same script.', correctApproach: 'Put helper functions at top of CoinCollector' },
  ],
  summary: `You wrote reusable functions for awarding, hiding, and valuing coins, then replaced dozens of duplicate scripts with one CoinCollector - scalable simulator architecture.`,
  practiceTask: {
    title: 'Coin functions refactor (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** One server script handles all coins via functions.

### Part A - Helpers (10 min)
1. Create \`CoinCollector\` in ServerScriptService
2. Add \`awardCoins\`, \`getCoinValue\`, \`hideCoin\`, \`getPlayerFromHit\`

### Part B - Connect all coins (10 min)
1. Loop \`Workspace.Coins\` folders - connect every coin Part
2. Remove/disable old scripts inside coins
3. Test 10 pickups - correct Tab + HUD

### Part C - Save (5 min)
1. Optional \`formatCoins\` for HUD
2. **Save to Roblox** → \`Lesson 3.4 - Coin Functions\`
3. **Practice complete**`,
    hints: [
      'Test one coin before looping all - faster debug',
      'Print getCoinValue(coin.Name) once to verify rare = 5',
      'If nothing happens, check coinsFolder path matches Explorer',
    ],
    optionalChallenge: 'Add resetCoin respawn for Common folder only.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Functions help by...', options: ['Reusing logic in one place', 'Deleting UI', 'Removing terrain', 'Banning Tab'], correctAnswer: 0, explanation: 'DRY - do not repeat yourself.' },
      { id: 'q2', type: MC, question: 'return in a function...', options: ['Sends a value back to caller', 'Deletes player', 'Publishes game', 'Anchors Parts'], correctAnswer: 0, explanation: 'return exits with optional value.' },
      { id: 'q3', type: MC, question: 'awardCoins(player, 5) adds...', options: ['5 to Coins stat', '5 Parts', '5 scripts', '5 terrains'], correctAnswer: 0, explanation: 'Second argument is amount.' },
      { id: 'q4', type: MC, question: 'Early return when stats missing...', options: ['Stops function safely', 'Adds 1000 coins', 'Opens VictoryGui', 'Spawns lava'], correctAnswer: 0, explanation: 'Guard clauses prevent errors.' },
      { id: 'q5', type: MC, question: 'collectedFlags[coin] uses...', options: ['Coin instance as table key', 'Only player name', 'Sky color', 'ClockTime'], correctAnswer: 0, explanation: 'Instance keys track each coin.' },
      { id: 'q6', type: MC, question: 'getCoinValue checks name for...', options: ['"Rare" substring', 'Player age', 'Terrain', 'Spawn'], correctAnswer: 0, explanation: 'Rare in name triggers higher value.' },
      { id: 'q7', type: MC, question: 'CoinCollector should live in...', options: ['ServerScriptService', 'StarterGui only', 'Player Head', 'Lighting'], correctAnswer: 0, explanation: 'Server handles economy.' },
      { id: 'q8', type: MC, question: 'After refactor, per-coin Scripts should be...', options: ['Removed to avoid double award', 'Duplicated 30 times', 'LocalScripts only', 'In Terrain'], correctAnswer: 0, explanation: 'One script replaces many.' },
      { id: 'q9', type: MC, question: 'Verb function names like hideCoin...', options: ['Read like actions', 'Hide code forever', 'Remove Humanoid', 'Disable save'], correctAnswer: 0, explanation: 'Clear naming is studio standard.' },
      { id: 'q10', type: MC, question: 'Lesson 3.4 save name...', options: ['Lesson 3.4 - Coin Functions', 'Coins HUD', 'Obby Ready', 'DataStore'], correctAnswer: 0, explanation: 'Save after refactor works.' },
    ],
  },
}

export const enLesson35 = {
  lessonId: 'lesson-roblox-3-5',
  moduleId: 'module-03',
  order: 5,
  title: '3.5 - DataStore: Memory Between Sessions',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Understand DataStoreService for saving player data',
    'Load coins on join and save on leave with pcall',
    'Integrate saved data with leaderstats Coins value',
    'Handle API errors without crashing the game',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Until now, leaving the game **erased** your Coins. **DataStore** remembers players between sessions.

**Lesson flow:**
1. **Theory (40 min)** - load/save with pcall
2. **Practice (~25 min)** - persistent coins
3. **Quiz (10 min)** - **70%** pass

**Important:** Enable **Game Settings → Security → Enable Studio Access to API Services** for DataStore tests in Studio.`,
      },
      {
        title: 'What DataStore does',
        content: `| Session only (before) | With DataStore |
|-----------------------|----------------|
| Quit → Coins = 0 | Quit → Coins saved |
| No progression feel | Real simulator retention |

Data is keyed by **UserId** (unique per Roblox account).

**You cannot** test real saves in plain Edit mode only - use **Play** with API enabled or **Publish** test.`,
      },
      {
        title: 'Create the DataStore',
        content: `**ServerScriptService** → Script \`CoinDataStore\` (or merge into Leaderstats setup):

\`\`\`lua
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

local coinStore = DataStoreService:GetDataStore("CoinProgress_v1")
\`\`\`

**Version suffix \`_v1\`:** if you change save format later, create \`CoinProgress_v2\` without breaking old data.

**Never** store passwords or personal info - only game stats like coin count.`,
      },
      {
        title: 'loadCoins with pcall',
        content: `\`\`\`lua
local function loadCoins(player)
    local success, data = pcall(function()
        return coinStore:GetAsync(player.UserId)
    end)

    if success and typeof(data) == "number" then
        return data
    end

    if not success then
        warn("Load failed for " .. player.Name)
    end

    return 0
end
\`\`\`

**\`pcall\`** runs risky code safely - if Roblox API fails, game keeps running instead of crashing.

**Exercise (5 min):** Print load result in Output when player joins.`,
      },
      {
        title: 'saveCoins with pcall',
        content: `\`\`\`lua
local function saveCoins(player, amount)
    local success, err = pcall(function()
        coinStore:SetAsync(player.UserId, amount)
    end)

    if not success then
        warn("Save failed for " .. player.Name .. ": " .. tostring(err))
    end
end
\`\`\`

**When to save:**
- \`Players.PlayerRemoving\` - player leaves
- Optional: autosave every 60 seconds (advanced)

**Do not** save every single coin pickup - too many API calls. Save **final total** on leave.`,
      },
      {
        title: 'Wire PlayerAdded and PlayerRemoving',
        content: `\`\`\`lua
Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Parent = leaderstats

    local saved = loadCoins(player)
    coins.Value = saved
end)

Players.PlayerRemoving:Connect(function(player)
    local stats = player:FindFirstChild("leaderstats")
    if stats then
        local coins = stats:FindFirstChild("Coins")
        if coins then
            saveCoins(player, coins.Value)
        end
    end
end)
\`\`\`

**Merge** with your existing LeaderstatsSetup - one script owns join/leave.`,
      },
      {
        title: 'Test persistence correctly',
        content: `**Test steps:**
1. Enable API Services in Studio settings
2. **Play** (F5) - collect **20** coins
3. **Stop** Play (player leaves → save fires)
4. **Play** again - Coins should be **20**

**If always 0:**
- API not enabled
- pcall failing - read yellow warnings in Output
- Saving in Edit without Play session

**Publish test:** real players need published place for live DataStore (Studio works with API flag).`,
      },
      {
        title: 'Safety rules',
        content: `- Never trust **client** to send "I have 9999 coins" - server already owns leaderstats
- Use \`pcall\` on GetAsync and SetAsync
- Keep data **small** (numbers, short tables) - large saves fail
- Rate limits exist - do not spam SetAsync in loops

**Before practice checklist:**
- [ ] API Services enabled
- [ ] load on join, save on leave
- [ ] Stop/Play test shows restored coins
- [ ] Save: \`Lesson 3.5 - Saved Coins\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'DataStore in LocalScript', explanation: 'Clients cannot save trusted global data.', correctApproach: 'ServerScriptService only' },
    { mistake: 'No pcall - script errors on API fail', explanation: 'Temporary Roblox issues crash economy.', correctApproach: 'Wrap GetAsync/SetAsync in pcall' },
    { mistake: 'Expect save in Edit mode without Play', explanation: 'PlayerRemoving never fires.', correctApproach: 'Test with Play then Stop' },
    { mistake: 'Save on every coin touch', explanation: 'Hits rate limits, lag.', correctApproach: 'Save total on PlayerRemoving' },
  ],
  summary: `You used DataStoreService with pcall to load coins when players join and save when they leave, integrated with leaderstats - your simulator now remembers progress between sessions.`,
  practiceTask: {
    title: 'Persistent coins (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Coins survive Stop → Play again.

### Part A - DataStore script (12 min)
1. \`CoinDataStore\` with GetDataStore \`CoinProgress_v1\`
2. \`loadCoins\` / \`saveCoins\` with pcall
3. Enable Studio API Services

### Part B - Join / leave (8 min)
1. PlayerAdded: leaderstats + \`coins.Value = loadCoins(player)\`
2. PlayerRemoving: \`saveCoins(player, coins.Value)\`
3. Merge with CoinCollector / Leaderstats - no duplicate PlayerAdded

### Part C - Persistence test (5 min)
1. Play - earn 25+ coins - Stop
2. Play again - still 25+
3. **Save to Roblox** → \`Lesson 3.5 - Saved Coins\`
4. **Practice complete**`,
    hints: [
      'Yellow warn in Output = read the pcall failure message',
      'UserId key is automatic - do not use player.Name as key',
      'Stop Play to trigger save before re-testing',
    ],
    optionalChallenge: 'Also save BestCoins in same DataStore as a table {coins=, best=}.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'DataStore saves data...', options: ['Between play sessions', 'Only in one Play minute', 'Inside Part color', 'In LocalScript UI'], correctAnswer: 0, explanation: 'Persists after player leaves.' },
      { id: 'q2', type: MC, question: 'Player data key is usually...', options: ['player.UserId', 'player.Name only', 'Part.Name', 'ClockTime'], correctAnswer: 0, explanation: 'UserId is unique and stable.' },
      { id: 'q3', type: MC, question: 'pcall protects against...', options: ['API errors crashing the script', 'Lava kills', 'UI color', 'Terrain paint'], correctAnswer: 0, explanation: 'pcall catches failures safely.' },
      { id: 'q4', type: MC, question: 'GetAsync loads...', options: ['Saved data when player joins', 'Skybox', 'All scripts', 'Terrain'], correctAnswer: 0, explanation: 'Load on join pattern.' },
      { id: 'q5', type: MC, question: 'SetAsync should run when...', options: ['Player leaves (PlayerRemoving)', 'Every frame', 'Only in lobby', 'Never'], correctAnswer: 0, explanation: 'Save on leave is standard.' },
      { id: 'q6', type: MC, question: 'CoinProgress_v1 naming helps...', options: ['Future data migrations', 'Delete players', 'Remove UI', 'Disable sound'], correctAnswer: 0, explanation: 'Versioned store names.' },
      { id: 'q7', type: MC, question: 'Studio DataStore needs...', options: ['Enable API Services', 'Delete Workspace', 'LocalScript only', 'No leaderstats'], correctAnswer: 0, explanation: 'Security setting required.' },
      { id: 'q8', type: MC, question: 'Trusted coin total lives on...', options: ['Server leaderstats', 'Client TextLabel only', 'Chat message', 'Decal'], correctAnswer: 0, explanation: 'Server owns economy.' },
      { id: 'q9', type: MC, question: 'Saving every 0.1 seconds is...', options: ['Bad - rate limits', 'Required', 'Same as never saving', 'UI only'], correctAnswer: 0, explanation: 'Too many API calls.' },
      { id: 'q10', type: MC, question: 'Lesson 3.5 save name...', options: ['Lesson 3.5 - Saved Coins', 'Coin Functions', 'Obby Ready', 'Victory Screen'], correctAnswer: 0, explanation: 'Save after persistence test.' },
    ],
  },
}

export const enLesson36 = {
  lessonId: 'lesson-roblox-3-6',
  moduleId: 'module-03',
  order: 6,
  title: '3.6 - Checkpoint: Coin Simulator',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Ship a complete coin simulator with map, collection, UI, functions, and save',
    'Run a four-player QA test matrix',
    'Polish feedback and onboarding at spawn',
    'Prepare for Module 4 tycoon systems',
  ],
  theory: {
    sections: [
      {
        title: 'Module 3 checkpoint (about 40 minutes)',
        content: `You ship **Coin Simulator** - a playable slice players understand in **10 seconds**:

**"Collect coins. Number goes up. Comes back tomorrow still saved."**

**Required systems:**
- 30+ coin map (3.1)
- CoinCollector + functions (3.4)
- leaderstats + CoinsHUD (3.3)
- DataStore save/load (3.5)`,
      },
      {
        title: '60-minute sprint',
        content: `| Phase | Min | Task |
|-------|-----|------|
| 1 | 10 | Explorer cleanup, spawn sign |
| 2 | 15 | CoinCollector + no duplicate scripts |
| 3 | 15 | DataStore leave/rejoin test |
| 4 | 10 | Sound + HUD polish |
| 5 | 10 | QA matrix + fix bugs |

**Target folders:**
\`Workspace/Coins/\`, \`ServerScriptService/\` (CoinCollector, CoinDataStore), \`StarterGui/CoinsHUD\``,
      },
      {
        title: 'Spawn onboarding',
        content: `At spawn, player sees within 3 seconds:
- **Sign:** \`Collect coins - explore the island!\`
- **Visible coin trail** toward first zone
- **CoinsHUD** top-left: \`Coins: 0\`

**Optional:** arrow Parts pointing to coin dense area.

No tutorial text wall - show, do not tell.`,
      },
      {
        title: 'QA test matrix (required)',
        content: `| # | Test | Pass? |
|---|------|-------|
| 1 | Collect 10 fast - HUD + Tab = 10 | |
| 2 | Stand on one coin 3s - still +1 only | |
| 3 | Rare coin gives +5 (if built) | |
| 4 | Stop Play at 30 coins, Play again - still 30 | |
| 5 | Output: no red errors on clean run | |

**Multiplayer (if possible):** two players - coins do not cross accounts.`,
      },
      {
        title: 'Feel like a game',
        content: `- Pickup **sound** on CoinCollector (one sound, Play on award)
- **PointLight** on coins (from 3.1)
- At least **60 seconds** of coin route content
- **No** broken floating coins inside terrain

**Minimum map:** keep island hub + coin zones - obby optional side path.`,
      },
      {
        title: 'Architecture checklist',
        content: `- [ ] **One** CoinCollector - no scripts inside individual coins
- [ ] **One** join script path (leaderstats + load)
- [ ] **One** save on PlayerRemoving
- [ ] CoinsHUD uses GetPropertyChangedSignal
- [ ] DataStore name \`CoinProgress_v1\`

Future Module 4 adds **tycoon plots** - your coin code stays in ServerScriptService.`,
      },
      {
        title: 'Demo script (2 minutes)',
        content: `Show teacher/parents:
1. Spawn - read sign, see HUD
2. Collect 5 coins - number rises + sound
3. Tab key - leaderboard matches
4. Stop and Play - coins restored
5. Say: "DataStore saves UserId so progress returns"

**Save:** \`Module 3 - Coin Simulator\``,
      },
      {
        title: 'Module 4 preview',
        content: `**Tycoon** games = coins **automatically** from droppers + buy upgrades + your own plot.

You already know:
- Server economy
- UI counters
- Saving progress

Module 4 turns passive income into a business sim on your island.`,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Duplicate PlayerAdded in two scripts', explanation: 'Double leaderstats or wrong load order.', correctApproach: 'Single script handles join: stats + load + connect coins' },
    { mistake: 'Persistence not tested with Stop', explanation: 'Thinking Save to File saves DataStore.', correctApproach: 'Stop Play triggers PlayerRemoving save' },
    { mistake: 'Map has 5 coins only', explanation: 'Does not feel like simulator.', correctApproach: 'Keep 30+ from Lesson 3.1 or add more' },
    { mistake: 'No pickup feedback', explanation: 'Collecting feels boring.', correctApproach: 'Sound + hide coin + HUD tick' },
  ],
  summary: `You shipped Coin Simulator with organized scripts, live HUD, function-based collection, DataStore persistence, and passed QA tests - Module 4 tycoon building starts next.`,
  practiceTask: {
    title: 'Ship Coin Simulator (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Pass all 5 QA tests + demo-ready place.

### Part A - Cleanup (10 min)
1. Folders + names; remove stray scripts
2. Spawn sign + coin trail visible
3. CoinCollector only - delete per-coin Scripts

### Part B - Systems (15 min)
1. leaderstats + load/save DataStore
2. CoinsHUD live
3. Pickup sound in awardCoins path

### Part C - QA & save (15 min)
1. Complete test matrix 1-5
2. Fix any fail before marking done
3. **Save to Roblox** → \`Module 3 - Coin Simulator\`
4. **Practice complete** + optional 2-min recording`,
    hints: [
      'Fix double-award before testing save - wrong count saves wrong data',
      'API Services must stay enabled for DataStore',
      'Run test 4 last - confirms whole module works',
    ],
    optionalChallenge: 'Booster pad: double coins for 20 seconds after touch.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Coin Simulator checkpoint needs...', options: ['Map + collect + HUD + save', 'Only terrain', 'Only obby timer', 'No scripts'], correctAnswer: 0, explanation: 'All Module 3 systems together.' },
      { id: 'q2', type: MC, question: 'Test 2 verifies...', options: ['Debounce still works', 'Sky color', 'Terrain only', 'Publishing'], correctAnswer: 0, explanation: 'Stand-on-coin should not spam +' },
      { id: 'q3', type: MC, question: 'Test 4 verifies...', options: ['DataStore persistence', 'Neon material', 'Kill blocks', 'VictoryGui'], correctAnswer: 0, explanation: 'Stop/Play restores coins.' },
      { id: 'q4', type: MC, question: 'CoinCollector should be the...', options: ['Only pickup script', 'One of 30 duplicate scripts', 'Client chat script', 'Terrain tool'], correctAnswer: 0, explanation: 'Single server collector.' },
      { id: 'q5', type: MC, question: 'Save key uses...', options: ['player.UserId', 'Player display name only', 'Coin Part name', 'Random'], correctAnswer: 0, explanation: 'UserId is unique per account.' },
      { id: 'q6', type: MC, question: 'Module 4 topic is...', options: ['Tycoon / passive income', 'Only publishing', 'Only cars', 'Empty'], correctAnswer: 0, explanation: 'Tycoon builds on coin systems.' },
      { id: 'q7', type: MC, question: 'Onboarding at spawn needs...', options: ['Clear goal + visible first coin', 'No coins', 'Hidden UI', 'Only lava'], correctAnswer: 0, explanation: 'Players need immediate direction.' },
      { id: 'q8', type: MC, question: 'Red Output on clean run means...', options: ['Fix before shipping', 'Perfect', 'Add more lava', 'Delete DataStore'], correctAnswer: 0, explanation: 'Errors = bugs remain.' },
      { id: 'q9', type: MC, question: 'Rare coins should award...', options: ['More than common (+5)', 'Zero', 'Delete save', 'Remove HUD'], correctAnswer: 0, explanation: 'Rare = higher value if implemented.' },
      { id: 'q10', type: MC, question: 'Final Module 3 save name...', options: ['Module 3 - Coin Simulator', 'Lesson 2.1', 'Untitled', 'Click Magic'], correctAnswer: 0, explanation: 'Checkpoint portfolio name.' },
    ],
  },
}
