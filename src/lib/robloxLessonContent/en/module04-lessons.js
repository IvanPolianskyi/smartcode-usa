/** Rich EN content for Roblox Module 04 - lessons 4.1-4.6 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson41 = {
  lessonId: 'lesson-roblox-4-1',
  moduleId: 'module-04',
  order: 1,
  title: '4.1 - Tycoon Architecture',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Plan a tycoon plot with clear machine zones',
    'Organize Workspace folders for plots and assets',
    'Name objects for dropper, collector, and buy-button systems',
    'Prepare architecture for multiplayer plots later',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Module 4 - Empire Builder** turns your coin skills into a **tycoon**: machines earn money while you expand.

**Lesson flow:**
1. **Theory (40 min)** - map blueprint + folders
2. **Practice (~25 min)** - one starter plot layout
3. **Quiz (10 min)** - **70%** pass

Use **Module 3 - Coin Simulator** place or duplicate as \`Lesson 4.1 - Tycoon Plot\`. Today is **layout only** - droppers script in 4.2.`,
      },
      {
        title: 'Tycoon core loop',
        content: `| Step | Player feeling |
|------|----------------|
| 1 | Stand on my plot |
| 2 | Machine drops value |
| 3 | Collector turns drops into **Coins** |
| 4 | Buy next machine with Coins |
| 5 | Income grows - repeat |

**Different from manual coin running:** tycoon = **passive income** + **purchases**.`,
      },
      {
        title: 'Folder blueprint',
        content: `**Workspace:**

\`\`\`
Plots/
  PlotA/
    Base/
    DropperZone/
    ConveyorPath/
    CollectorZone/
    BuyButtons/
TycoonAssets/     ← models you clone later
\`\`\`

**ReplicatedStorage** (optional this lesson):
\`TycoonConfig\` - prices tables in Lesson 4.4

**ServerScriptService** (later):
\`TycoonService\`, \`PurchaseService\`

**Exercise (5 min):** Create empty Folders with these exact names under Workspace.`,
      },
      {
        title: 'Design Plot A - zones',
        content: `Build one **40×40** stud base (or use island flat sand):

| Zone | Color placeholder | Purpose |
|------|-------------------|---------|
| **Base** | Grey platform | Player stands here |
| **DropperZone** | Blue pad | Machine spawns coins |
| **ConveyorPath** | Dark grey line | Coins slide toward collector |
| **CollectorZone** | Green pad | Converts drops to Coins |
| **BuyButtons** | Yellow pads | Unlock upgrades |

**Name examples:**
- \`PlotA_Base\`
- \`PlotA_DropperSlot\`
- \`PlotA_CollectorPad\`
- \`Buy_Dropper2_Pad\` (empty until 4.3)`,
      },
      {
        title: 'Conveyor path (visual only today)',
        content: `Use **low-friction** parts or slight **tilt** so coins slide (Lesson 4.2 adds real drops).

For layout:
- Dropper at **high** end
- Collector at **low** end
- Path **2 studs** wide minimum

**Signs:** \`Dropper →\` and \`Collector\` with Neon arrows.

**Exercise (10 min):** Walk from dropper zone to collector in Play - path feels obvious.`,
      },
      {
        title: 'Spawn and ownership preview',
        content: `Each plot needs:
- **SpawnLocation** on \`PlotA_Base\` (Neutral true)
- Sign: \`Your Tycoon - Plot A\`

**Multiplayer later (4.5):** each player gets a plot. For 4.1-4.3, **one plot** is yours.

Keep **Coin Simulator** coins elsewhere on island - tycoon plot is a **separate zone** (fence or bridge).`,
      },
      {
        title: 'Architecture rules',
        content: `| Good habit | Bad habit |
|------------|-----------|
| One folder per system | 50 scripts named Script |
| Config in tables (4.4) | Price hard-coded in 20 files |
| Server owns money | Client buys for free |
| Debris cleanup (4.2) | Infinite parts lag server |

**Coming Soon gate:** optional neon wall + sign \`Expansion Zone\` for future tiers.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Plots/PlotA with 5 zone folders
- [ ] Named pads for dropper, path, collector, buy area
- [ ] Spawn on plot base
- [ ] Save: \`Lesson 4.1 - Tycoon Plot\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'No folder structure', explanation: 'Scripts scatter across Workspace.', correctApproach: 'Plots/PlotA subfolders before coding' },
    { mistake: 'Dropper and collector same spot', explanation: 'No gameplay flow.', correctApproach: 'Separate zones with visible path' },
    { mistake: 'Buy button inside lava/obby', explanation: 'Accidental deaths block purchases.', correctApproach: 'Safe flat BuyButtons zone' },
    { mistake: 'Generic Part names only', explanation: 'Cannot wire scripts in 4.2.', correctApproach: 'PlotA_DropperSlot style names' },
  ],
  summary: `You planned the tycoon core loop, created Plots/PlotA folder zones, and built a labeled starter plot ready for droppers, collectors, and purchase pads.`,
  practiceTask: {
    title: 'Tycoon skeleton plot (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** One complete plot layout, no droppers yet.

### Part A - Folders (5 min)
1. \`Workspace/Plots/PlotA\` + zone subfolders
2. \`TycoonAssets\` empty folder for future models

### Part B - Build zones (15 min)
1. Base platform + SpawnLocation
2. DropperZone, ConveyorPath, CollectorZone, BuyButtons pads
3. Neon signs for direction

### Part C - Save (5 min)
1. Optional expansion wall
2. **Save to Roblox** → \`Lesson 4.1 - Tycoon Plot\`
3. **Practice complete**`,
    hints: [
      'Color-code zones now - replace with machines later',
      'Path width ≥ 2 studs for rolling coin parts',
      'Keep buy pads visible from spawn',
    ],
    optionalChallenge: 'Second empty plot PlotB for future multiplayer.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Tycoon loop is earn → buy →…', options: ['Upgrade and expand', 'Delete terrain only', 'Remove UI', 'Never save'], correctAnswer: 0, explanation: 'Repeat growth cycle.' },
      { id: 'q2', type: MC, question: 'PlotA folder holds…', options: ['One player tycoon layout', 'Only sky', 'All Module 1 lessons', 'DataStore files'], correctAnswer: 0, explanation: 'Per-plot organization.' },
      { id: 'q3', type: MC, question: 'CollectorZone converts…', options: ['Drops to currency', 'Players to terrain', 'UI to parts', 'Lava to water'], correctAnswer: 0, explanation: 'Collector awards Coins.' },
      { id: 'q4', type: MC, question: 'Lesson 4.1 is mostly…', options: ['Layout and naming', 'Full DataStore', 'Publishing', 'NPC quests'], correctAnswer: 0, explanation: 'Architecture before scripts.' },
      { id: 'q5', type: MC, question: 'BuyButtons zone is for…', options: ['Purchasing upgrades', 'Kill blocks', 'Spawn only', 'Sound only'], correctAnswer: 0, explanation: 'Unlock machines with Coins.' },
      { id: 'q6', type: MC, question: 'Conveyor path connects…', options: ['Dropper to collector', 'Tab to Output', 'Sky to Terrain', 'HUD to lava'], correctAnswer: 0, explanation: 'Physical flow of drops.' },
      { id: 'q7', type: MC, question: 'TycoonAssets folder stores…', options: ['Reusable models', 'Player passwords', 'Chat logs', 'Quiz answers'], correctAnswer: 0, explanation: 'Prefab models for cloning.' },
      { id: 'q8', type: MC, question: 'Server should own economy because…', options: ['Prevents cheating', 'UI looks nicer', 'Terrain requires it', 'No reason'], correctAnswer: 0, explanation: 'Trusted coin changes on server.' },
      { id: 'q9', type: MC, question: 'Spawn on plot helps…', options: ['Players start at their base', 'Delete coins', 'Remove leaderstats', 'Disable Play'], correctAnswer: 0, explanation: 'Clear start location.' },
      { id: 'q10', type: MC, question: 'Lesson 4.1 save name…', options: ['Lesson 4.1 - Tycoon Plot', 'Coin Simulator', 'Obby Ready', 'Saved Coins'], correctAnswer: 0, explanation: 'Save layout before machines.' },
    ],
  },
}

export const enLesson42 = {
  lessonId: 'lesson-roblox-4-2',
  moduleId: 'module-04',
  order: 2,
  title: '4.2 - Coin Dropper',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Spawn TycoonCoin parts from a dropper on a timer',
    'Award Coins when drops touch the collector pad',
    'Use Debris for automatic part cleanup',
    'Balance spawn rate for performance',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `The **dropper** prints money. The **collector** banks it.

**Lesson flow:**
1. **Theory (40 min)** - spawn loop + collector
2. **Practice (~25 min)** - working starter machine
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 4.1 - Tycoon Plot**.`,
      },
      {
        title: 'Dropper system parts',
        content: `In \`PlotA/DropperZone\`:

| Object | Name |
|--------|------|
| Machine body | \`Dropper_01\` |
| Spawn point | \`SpawnPoint\` (small invisible or neon part) |
| Script parent | \`Dropper_01\` |

**SpawnPoint** Position = where coins appear (above machine).

**Collector** in \`CollectorZone\`:
- Part \`CollectorPad\` - green, Anchored, CanCollide true`,
      },
      {
        title: 'Spawner loop',
        content: `**Script** inside \`Dropper_01\`:

\`\`\`lua
local dropper = script.Parent
local spawnPoint = dropper:WaitForChild("SpawnPoint")
local Debris = game:GetService("Debris")

while true do
    local coin = Instance.new("Part")
    coin.Name = "TycoonCoin"
    coin.Size = Vector3.new(1.2, 1.2, 1.2)
    coin.Shape = Enum.PartType.Ball
    coin.BrickColor = BrickColor.new("Bright yellow")
    coin.Material = Enum.Material.Neon
    coin.Position = spawnPoint.Position + Vector3.new(0, 2, 0)
    coin.Anchored = false
    coin.CanCollide = true
    coin.Parent = workspace

    Debris:AddItem(coin, 25)

    task.wait(2)
end
\`\`\`

**\`Debris:AddItem(part, 25)\`** deletes coin after 25s - prevents lag.`,
      },
      {
        title: 'Collector awards Coins',
        content: `**Script** in \`CollectorPad\`:

\`\`\`lua
local collector = script.Parent
local COIN_VALUE = 1

collector.Touched:Connect(function(hit)
    if hit.Name ~= "TycoonCoin" then
        return
    end

    local character = hit.Parent
    local humanoid = character and character:FindFirstChildOfClass("Humanoid")
    if not humanoid then
        -- Coin touched collector, not player foot
    end

    local Players = game:GetService("Players")
    -- For solo plot: award to any player who owns tycoon - first player for now:
    local player = Players:GetPlayers()[1]
    if not player then return end

    local stats = player:FindFirstChild("leaderstats")
    local coins = stats and stats:FindFirstChild("Coins")
    if coins then
        coins.Value += COIN_VALUE
    end

    hit:Destroy()
end)
\`\`\`

**Exercise (10 min):** Watch Coins rise without touching coins manually.`,
      },
      {
        title: 'Improve collector - player from coin',
        content: `Better pattern: track plot owner IntValue later. For now, award **plot owner** only:

Store \`OwnerUserId\` on PlotA folder (IntValue) set to your UserId in Studio test.

\`\`\`lua
local plot = workspace.Plots.PlotA
local ownerId = plot:FindFirstChild("OwnerUserId")

-- find player where player.UserId == ownerId.Value
\`\`\`

Lesson 4.5 adds full multi-plot ownership. Solo: use \`Players:GetPlayers()[1]\` if alone.`,
      },
      {
        title: 'Conveyor tilt trick',
        content: `Angle **ConveyorPath** parts **2-5 degrees** toward collector so balls roll.

Or use **low friction** material on path (Ice, or custom physical properties later).

**Test:** Coin should reach collector within **10 seconds** of spawn.`,
      },
      {
        title: 'Performance rules',
        content: `| Rule | Why |
|------|-----|
| Spawn every **≥ 1s** | Too fast = hundreds of parts |
| Debris cleanup **20-30s** | Safety net |
| Destroy on collect | Instant free memory |
| Keep coins inside plot fence | Less world clutter |

**If laggy:** increase \`task.wait\` to 3 seconds.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Dropper spawns yellow TycoonCoin every 2s
- [ ] Collector adds +1 Coins and destroys coin
- [ ] Debris removes stray coins
- [ ] Save: \`Lesson 4.2 - Coin Dropper\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'No Debris - hundreds of parts', explanation: 'Server slows down.', correctApproach: 'Debris:AddItem every spawn' },
    { mistake: 'Collector checks wrong Name', explanation: 'TycoonCoin must match exactly.', correctApproach: 'coin.Name = "TycoonCoin" in spawner' },
    { mistake: 'SpawnPoint missing', explanation: 'WaitForChild yields forever.', correctApproach: 'Child part named SpawnPoint under Dropper_01' },
    { mistake: 'Anchored true on drops', explanation: 'Coins never move to collector.', correctApproach: 'Anchored false on TycoonCoin' },
  ],
  summary: `You built a dropper spawn loop with Debris cleanup and a collector that converts TycoonCoins into leaderstats Coins - your tycoon earns passive income.`,
  practiceTask: {
    title: 'Starter dropper machine (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** AFK-style income on your plot.

### Part A - Dropper (12 min)
1. \`Dropper_01\` + \`SpawnPoint\` + spawn Script
2. Debris 25s on each coin
3. Play - coins appear every 2s

### Part B - Collector (10 min)
1. \`CollectorPad\` Script - +1 Coins, Destroy coin
2. Tilt path so coins reach pad
3. Stand 30s - Coins increase without manual collect

### Part C - Save (3 min)
1. **Save to Roblox** → \`Lesson 4.2 - Coin Dropper\`
2. **Practice complete**`,
    hints: [
      'Print coins.Value every 5s to verify passive income',
      'If coins stuck, check Anchored false and path slope',
      'Collector must be server Script',
    ],
    optionalChallenge: 'Bronze/silver/gold coin colors worth 1/2/5 (random spawn).',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'TycoonCoin should be Anchored…', options: ['false', 'true always', 'only for UI', 'only in Terrain'], correctAnswer: 0, explanation: 'Unanchored parts roll.' },
      { id: 'q2', type: MC, question: 'Debris:AddItem prevents…', options: ['Part buildup lag', 'Saving data', 'UI display', 'Checkpoints'], correctAnswer: 0, explanation: 'Auto-destroy old drops.' },
      { id: 'q3', type: MC, question: 'Collector destroys coin after…', options: ['Awarding currency', 'Changing sky', 'Publishing', 'Renaming'], correctAnswer: 0, explanation: 'Destroy prevents double collect.' },
      { id: 'q4', type: MC, question: 'while true loop with task.wait…', options: ['Repeats spawn forever', 'Runs once', 'Deletes player', 'Removes HUD'], correctAnswer: 0, explanation: 'Loop = continuous production.' },
      { id: 'q5', type: MC, question: 'SpawnPoint is…', options: ['Where coins appear', 'Player spawn only', 'DataStore', 'VictoryGui'], correctAnswer: 0, explanation: 'Spawn position reference.' },
      { id: 'q6', type: MC, question: 'COIN_VALUE = 1 means…', options: ['Each coin gives 1 Coin stat', 'Deletes 1 part', 'Waits 1 second', 'Spawns 1 player'], correctAnswer: 0, explanation: 'Value per collected drop.' },
      { id: 'q7', type: MC, question: 'hit.Name check ensures…', options: ['Only TycoonCoins count', 'All parts count', 'Terrain counts', 'Sky counts'], correctAnswer: 0, explanation: 'Filter by part name.' },
      { id: 'q8', type: MC, question: 'Spawn interval too fast causes…', options: ['Lag', 'Better graphics', 'Auto save', 'Free Robux'], correctAnswer: 0, explanation: 'Too many physics parts.' },
      { id: 'q9', type: MC, question: 'Dropper Script runs on…', options: ['Server', 'Client HUD only', 'StarterGui', 'Player Head'], correctAnswer: 0, explanation: 'Server spawns world parts.' },
      { id: 'q10', type: MC, question: 'Lesson 4.2 save name…', options: ['Lesson 4.2 - Coin Dropper', 'Tycoon Plot', 'Coin Functions', 'Obby Timer'], correctAnswer: 0, explanation: 'Save working machine.' },
    ],
  },
}

export const enLesson43 = {
  lessonId: 'lesson-roblox-4-3',
  moduleId: 'module-04',
  order: 3,
  title: '4.3 - Purchase Button',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Build a purchase pad that deducts Coins',
    'Use a purchased flag to prevent double buys',
    'Reveal a second dropper after successful purchase',
    'Give clear feedback for success and insufficient funds',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Passive income is step one. **Spending** on upgrades is step two.

**Lesson flow:**
1. **Theory (40 min)** - buy button flow
2. **Practice (~25 min)** - unlock Dropper_02 for 50 Coins
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 4.2 - Coin Dropper**. Earn ~50 Coins from Dropper_01 before testing buy.`,
      },
      {
        title: 'Purchase flow (5 steps)',
        content: `1. Player touches **buy pad**
2. Verify **not already purchased**
3. Read **leaderstats.Coins**
4. If **Coins >= price** → subtract price
5. **Reveal** new machine + hide button`,
      },
      {
        title: 'Buy pad script',
        content: `On \`BuyButtons/Buy_Dropper2_Pad\` - **Script**:

\`\`\`lua
local button = script.Parent
local PRICE = 50
local purchased = false

local dropper2 = workspace.Plots.PlotA.DropperZone:WaitForChild("Dropper_02")
local revealFolder = dropper2 -- hidden until buy

-- Start hidden:
dropper2.Parent = nil  -- or Transparency 1 on all parts + disabled script

button.Touched:Connect(function(hit)
    if purchased then
        return
    end

    local character = hit.Parent
    if not character then return end
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then return end

    local player = game:GetService("Players"):GetPlayerFromCharacter(character)
    if not player then return end

    local coins = player:FindFirstChild("leaderstats")
    coins = coins and coins:FindFirstChild("Coins")
    if not coins then return end

    if coins.Value < PRICE then
        print(player.Name .. " needs more coins!")
        button.BrickColor = BrickColor.new("Really red")
        task.wait(0.3)
        button.BrickColor = BrickColor.new("New Yeller")
        return
    end

    coins.Value -= PRICE
    purchased = true

    dropper2.Parent = workspace.Plots.PlotA.DropperZone
    button.Transparency = 1
    button.CanCollide = false

    print(player.Name .. " bought Dropper 2!")
end)
\`\`\``,
      },
      {
        title: 'Hide Dropper_02 until purchase',
        content: `**Before Play:**
1. Build \`Dropper_02\` clone of Dropper_01 (same SpawnPoint + Script)
2. Set \`dropper2.Parent = nil\` in Script **once** at top, OR store in \`ReplicatedStorage\`

**On purchase:** \`dropper2.Parent = workspace.Plots.PlotA.DropperZone\`

**Test:** Only one Dropper_01 at start; after buy, two machines spawning.`,
      },
      {
        title: 'Debounce purchased flag',
        content: `\`purchased = true\` blocks repeat **Touched** spam - same idea as coin debounce.

Without it:
- One touch might charge **3 times**
- Coins go negative (bad)

**Always** set \`purchased = true\` **before** revealing machine.`,
      },
      {
        title: 'UX feedback',
        content: `| Result | Feedback |
|--------|----------|
| Success | Button hides, Dropper_02 appears, print sound |
| Not enough Coins | Red flash 0.3s, print message |
| Already bought | Ignore touch |

**BillboardGui** on pad:
\`Buy Dropper 2 - 50 Coins\`
After buy: destroy gui or text \`Purchased ✓\`

**Exercise (5 min):** Touch with 10 Coins → red flash. Touch with 60 → success.`,
      },
      {
        title: 'Connect to DataStore',
        content: `Purchases spend **saved** Coins if you finished Module 3.5 - good.

**Future:** save \`purchasedDropper2 = true\` in DataStore so buy persists between sessions (Lesson 4.6 area).

Today: in-session purchase is enough.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Dropper_02 hidden at start
- [ ] Buy costs 50, debounce works
- [ ] Insufficient funds shows red flash
- [ ] Save: \`Lesson 4.3 - Purchase Button\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'coins.Value -= price on client', explanation: 'Exploiters free upgrades.', correctApproach: 'Server Script on buy pad' },
    { mistake: 'No purchased flag', explanation: 'Triple charge on one touch.', correctApproach: 'purchased = true after success' },
    { mistake: 'Dropper_02 visible from start', explanation: 'No reason to buy.', correctApproach: 'Parent nil or hidden until purchase' },
    { mistake: 'Wrong leaderstats path', explanation: 'Coins never deduct.', correctApproach: 'player.leaderstats.Coins on server' },
  ],
  summary: `You scripted a purchase pad that checks Coins, deducts price once, reveals Dropper_02, and gives red/green feedback - the tycoon upgrade loop is alive.`,
  practiceTask: {
    title: 'Unlock Dropper 2 (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** 50 Coins unlocks second machine.

### Part A - Hidden machine (8 min)
1. Clone \`Dropper_01\` → \`Dropper_02\` (hidden until buy)
2. Buy pad \`Buy_Dropper2_Pad\` in BuyButtons zone

### Part B - Purchase script (12 min)
1. PRICE 50, purchased flag, deduct Coins
2. Reveal Dropper_02, hide button
3. Red flash when broke

### Part C - Test & save (5 min)
1. Earn 50+ from Dropper_01 - buy - two droppers run
2. **Save to Roblox** → \`Lesson 4.3 - Purchase Button\`
3. **Practice complete**`,
    hints: [
      'Print coins.Value before/after purchase while testing',
      'Hide Dropper_02 with Parent = nil at script start',
      'Touch buy pad with Humanoid - stand on pad',
    ],
    optionalChallenge: 'BillboardGui price label updates to Purchased.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Purchase script should run on…', options: ['Server', 'LocalScript only', 'Terrain', 'Sky'], correctAnswer: 0, explanation: 'Server deducts Coins safely.' },
      { id: 'q2', type: MC, question: 'purchased = true prevents…', options: ['Buying twice', 'Spawning coins', 'Saving data', 'Moving camera'], correctAnswer: 0, explanation: 'Debounce for buy pad.' },
      { id: 'q3', type: MC, question: 'coins.Value -= price when…', options: ['Coins >= price', 'Always', 'Never', 'In Edit only'], correctAnswer: 0, explanation: 'Only charge if affordable.' },
      { id: 'q4', type: MC, question: 'Insufficient funds feedback…', options: ['Red flash + message', 'Free machine', 'Delete plot', 'Reset DataStore'], correctAnswer: 0, explanation: 'Clear fail feedback.' },
      { id: 'q5', type: MC, question: 'Dropper_02 hidden using…', options: ['Parent = nil until buy', 'Delete forever', 'LocalScript', 'Atmosphere'], correctAnswer: 0, explanation: 'Reveal by reparenting.' },
      { id: 'q6', type: MC, question: 'PRICE = 50 means…', options: ['Costs 50 Coins', 'Spawns 50 parts', '50 players', '50 seconds only'], correctAnswer: 0, explanation: 'Currency cost.' },
      { id: 'q7', type: MC, question: 'GetPlayerFromCharacter links…', options: ['Touch to player account', 'Part to terrain', 'UI to sky', 'Sound to lava'], correctAnswer: 0, explanation: 'Who is buying.' },
      { id: 'q8', type: MC, question: 'After success, buy pad often…', options: ['Transparency 1 / hidden', 'Duplicates price', 'Spawns lava', 'Removes leaderstats'], correctAnswer: 0, explanation: 'Cannot buy again.' },
      { id: 'q9', type: MC, question: 'Tycoon upgrades use currency from…', options: ['leaderstats Coins', 'Only print()', 'Terrain', 'ClockTime'], correctAnswer: 0, explanation: 'Same Coins stat as Module 3.' },
      { id: 'q10', type: MC, question: 'Lesson 4.3 save name…', options: ['Lesson 4.3 - Purchase Button', 'Coin Dropper', 'Tycoon Plot', 'Coin Simulator'], correctAnswer: 0, explanation: 'Save after unlock works.' },
    ],
  },
}

export const enLesson44 = {
  lessonId: 'lesson-roblox-4-4',
  moduleId: 'module-04',
  order: 4,
  title: '4.4 - Tables and Upgrades',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Store upgrade tiers in Luau tables',
    'Change dropper speed and coin value from config data',
    'Buy upgrades with a tier index instead of hard-coded scripts',
    'Rebalance the economy by editing table numbers only',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Hard-coded \`if tier == 2 then wait(1.5)\` breaks when you have 10 tiers. **Tables** fix that.

**Lesson flow:**
1. **Theory (40 min)** - upgrade table + tier index
2. **Practice (~25 min)** - 3-tier dropper upgrades
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 4.3 - Purchase Button**.`,
      },
      {
        title: 'What is a config table?',
        content: `A **table** in Luau is a collection of entries - like a spreadsheet in code.

\`\`\`lua
local upgrades = {
    { tier = 1, price = 0,   spawnWait = 2.0, coinValue = 1 },
    { tier = 2, price = 100, spawnWait = 1.5, coinValue = 2 },
    { tier = 3, price = 300, spawnWait = 1.0, coinValue = 4 },
}
\`\`\`

**Change balance?** Edit numbers here - not 20 scripts.`,
      },
      {
        title: 'Access table rows by index',
        content: `\`\`\`lua
local currentTier = 2
local data = upgrades[currentTier]

print(data.spawnWait)   -- 1.5
print(data.coinValue)   -- 2
\`\`\`

**\`#upgrades\`** = how many tiers exist.

**Loop all tiers:**

\`\`\`lua
for i, row in ipairs(upgrades) do
    print(i, row.price, row.spawnWait)
end
\`\`\`

**Exercise (5 min):** Print all three tiers to Output.`,
      },
      {
        title: 'Tier IntValue on the plot',
        content: `Inside \`PlotA\` add **IntValue** \`DropperTier\` starting at **1**.

When player buys upgrade pad:
1. Check \`Coins >= upgrades[currentTier + 1].price\`
2. Deduct price
3. \`DropperTier.Value += 1\`

Dropper script reads tier each spawn:

\`\`\`lua
local plot = workspace.Plots.PlotA
local tierValue = plot:WaitForChild("DropperTier")
local tier = tierValue.Value
local data = upgrades[tier] or upgrades[1]

task.wait(data.spawnWait)
-- spawn coin, collector uses data.coinValue
\`\`\``,
      },
      {
        title: 'Refactor dropper loop',
        content: `\`\`\`lua
local upgrades = {
    { tier = 1, price = 0,   spawnWait = 2.0, coinValue = 1 },
    { tier = 2, price = 100, spawnWait = 1.5, coinValue = 2 },
    { tier = 3, price = 300, spawnWait = 1.0, coinValue = 4 },
}

local plot = workspace.Plots.PlotA
local spawnPoint = script.Parent:WaitForChild("SpawnPoint")
local tierValue = plot:WaitForChild("DropperTier")
local Debris = game:GetService("Debris")

while true do
    local tier = math.clamp(tierValue.Value, 1, #upgrades)
    local data = upgrades[tier]

    local coin = Instance.new("Part")
    coin.Name = "TycoonCoin"
    coin.Size = Vector3.new(1.2, 1.2, 1.2)
    coin.Shape = Enum.PartType.Ball
    coin.BrickColor = BrickColor.new("Bright yellow")
    coin.Position = spawnPoint.Position + Vector3.new(0, 2, 0)
    coin.Anchored = false
    coin:SetAttribute("CoinValue", data.coinValue)
    coin.Parent = workspace
    Debris:AddItem(coin, 25)

    task.wait(data.spawnWait)
end
\`\`\`

**SetAttribute** stores value on the part for collector to read.`,
      },
      {
        title: 'Collector reads attribute',
        content: `\`\`\`lua
local value = hit:GetAttribute("CoinValue") or 1
coins.Value += value
\`\`\`

Tier 3 coins worth **4** each - player feels power spike.

**Upgrade buy pad** reads next tier price from table:

\`\`\`lua
local nextTier = tierValue.Value + 1
local nextData = upgrades[nextTier]
if not nextData then return end -- max tier
if coins.Value < nextData.price then return end
coins.Value -= nextData.price
tierValue.Value = nextTier
\`\`\``,
      },
      {
        title: 'Balancing workflow',
        content: `| Test | Target feel |
|------|-------------|
| Tier 2 reachable | ~2 minutes of Dropper_01 |
| Tier 3 meaningful | ~5-8 minutes total |
| spawnWait change | Noticeably faster drops |
| coinValue change | Bigger number jumps on HUD |

**Only edit table** → Play → repeat. Real game designers work this way.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] upgrades table with 3 rows
- [ ] DropperTier IntValue on PlotA
- [ ] Dropper uses spawnWait from table
- [ ] Collector uses CoinValue attribute
- [ ] Save: \`Lesson 4.4 - Upgrade Tables\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'tier index out of range', explanation: 'Tier 4 when table has 3 rows.', correctApproach: 'math.clamp(tier, 1, #upgrades)' },
    { mistake: 'Hard-coded wait(2) still in loop', explanation: 'Table ignored.', correctApproach: 'task.wait(data.spawnWait) only' },
    { mistake: 'Collector still +1 always', explanation: 'Attribute not read.', correctApproach: 'GetAttribute CoinValue on hit' },
    { mistake: 'Price in buy script != table price', explanation: 'Desync confuses players.', correctApproach: 'Always read upgrades[nextTier].price' },
  ],
  summary: `You stored upgrade tiers in tables, drove spawn speed and coin value from data, and bought tiers with prices from the same config - professional tycoon balancing workflow.`,
  practiceTask: {
    title: 'Three-tier upgrades (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Buy tier 2 and 3 - faster drops, higher value.

### Part A - Config (8 min)
1. \`upgrades\` table (3 tiers) in dropper + buy scripts
2. \`DropperTier\` IntValue = 1 on PlotA

### Part B - Wire systems (12 min)
1. Dropper loop uses spawnWait from tier
2. Collector adds GetAttribute CoinValue
3. Buy pad upgrades tier (100, then 300 Coins)

### Part C - Balance & save (5 min)
1. Play-test time to tier 2 - adjust table if needed
2. **Save to Roblox** → \`Lesson 4.4 - Upgrade Tables\`
3. **Practice complete**`,
    hints: [
      'Print current tier after each purchase',
      'Clamp tier index so errors never break spawner',
      'One shared upgrades table - copy to both scripts or use ModuleScript later',
    ],
    optionalChallenge: 'Tier 4 prestige - price 1000, spawnWait 0.6, coinValue 10.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Config tables help…', options: ['Balance without editing many scripts', 'Delete terrain', 'Remove UI', 'Disable save'], correctAnswer: 0, explanation: 'Data-driven design.' },
      { id: 'q2', type: MC, question: 'upgrades[2] gets…', options: ['Second tier row', 'Two players', '2 coins always', 'Error always'], correctAnswer: 0, explanation: 'Numeric index into table.' },
      { id: 'q3', type: MC, question: 'DropperTier IntValue stores…', options: ['Current upgrade level', 'Player name', 'Sky color', 'Terrain seed'], correctAnswer: 0, explanation: 'Tier index on plot.' },
      { id: 'q4', type: MC, question: 'spawnWait in table controls…', options: ['Seconds between spawns', 'Player jump', 'Save file', 'Tab menu'], correctAnswer: 0, explanation: 'Spawn interval per tier.' },
      { id: 'q5', type: MC, question: 'SetAttribute CoinValue lets…', options: ['Collector read per-coin worth', 'UI delete', 'Lava kill', 'Spawn NPC'], correctAnswer: 0, explanation: 'Per-part metadata.' },
      { id: 'q6', type: MC, question: 'ipairs(upgrades) loops…', options: ['Each tier row', 'Every player', 'All terrain', 'Only errors'], correctAnswer: 0, explanation: 'Iterate table entries.' },
      { id: 'q7', type: MC, question: 'math.clamp prevents…', options: ['Invalid tier index', 'Saving', 'Publishing', 'Lighting'], correctAnswer: 0, explanation: 'Keeps tier in range.' },
      { id: 'q8', type: MC, question: 'Next tier price should come from…', options: ['upgrades table', 'Random()', 'Player age', 'Part color'], correctAnswer: 0, explanation: 'Single source of truth.' },
      { id: 'q9', type: MC, question: 'Tier 3 coinValue 4 means…', options: ['Each drop worth 4 Coins', '4 droppers', '4 players', '4 saves'], correctAnswer: 0, explanation: 'Value per collected coin.' },
      { id: 'q10', type: MC, question: 'Lesson 4.4 save name…', options: ['Lesson 4.4 - Upgrade Tables', 'Purchase Button', 'Tycoon Plot', 'Coin Simulator'], correctAnswer: 0, explanation: 'Save tier system.' },
    ],
  },
}

export const enLesson45 = {
  lessonId: 'lesson-roblox-4-5',
  moduleId: 'module-04',
  order: 5,
  title: '4.5 - A Plot for Every Player',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Assign unclaimed plots when players join',
    'Store OwnerUserId on each plot for ownership checks',
    'Block purchases and collection on other players plots',
    'Release plots when players leave the game',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Solo plot was fine. **Multiplayer** needs **one base per player** - otherwise everyone steals each other's machines.

**Lesson flow:**
1. **Theory (40 min)** - claim, ownsPlot, release
2. **Practice (~25 min)** - PlotA + PlotB auto-assign
3. **Quiz (10 min)** - **70%** pass

Duplicate PlotA → **PlotB** with separate spawn and zones.`,
      },
      {
        title: 'The multiplayer problem',
        content: `| Shared plot | Per-player plot |
|-------------|-----------------|
| Player B buys on A's button | Each has own DropperTier |
| A earns B's coins | A only earns on Plot A |
| Chaos in 2-player server | Fair tycoon servers |

**OwnerUserId** = who controls this plot.`,
      },
      {
        title: 'OwnerUserId setup',
        content: `Inside **each** plot (PlotA, PlotB):

**StringValue** named \`OwnerUserId\`
- Default \`""\` (empty = unclaimed)

\`\`\`lua
local function isPlotFree(plot)
    local owner = plot:FindFirstChild("OwnerUserId")
    return owner and owner.Value == ""
end

local function ownsPlot(player, plot)
    local owner = plot:FindFirstChild("OwnerUserId")
    return owner and owner.Value == tostring(player.UserId)
end
\`\`\`

**UserId** is a number - StringValue stores \`tostring(player.UserId)\`.`,
      },
      {
        title: 'Claim plot on join',
        content: `**ServerScriptService** → \`PlotClaimService\`:

\`\`\`lua
local Players = game:GetService("Players")
local plotsFolder = workspace.Plots

local function claimPlot(player)
    for _, plot in plotsFolder:GetChildren() do
        if plot:IsA("Folder") or plot:IsA("Model") then
            local owner = plot:FindFirstChild("OwnerUserId")
            if owner and owner.Value == "" then
                owner.Value = tostring(player.UserId)
                local spawn = plot:FindFirstChild("SpawnLocation", true)
                if spawn and player.Character then
                    player.Character:MoveTo(spawn.Position + Vector3.new(0, 3, 0))
                end
                print(player.Name .. " claimed " .. plot.Name)
                return plot
            end
        end
    end
    warn("No free plot for " .. player.Name)
end

Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function()
        task.wait(0.5)
        claimPlot(player)
    end)
end)
\`\`\``,
      },
      {
        title: 'Gate purchases and collector',
        content: `**Every** buy pad and collector must check:

\`\`\`lua
local plot = workspace.Plots.PlotA -- or find parent plot

local function ownsPlot(player, plot)
    local owner = plot:FindFirstChild("OwnerUserId")
    return owner and owner.Value == tostring(player.UserId)
end

-- In Touched:
if not ownsPlot(player, plot) then
    return
end
\`\`\`

**Find plot from button:** \`button.Parent.Parent\` or store plot reference in attribute \`PlotName\`.

**Exercise (10 min):** Second player cannot buy on first player's plot.`,
      },
      {
        title: 'Release on PlayerRemoving',
        content: `\`\`\`lua
Players.PlayerRemoving:Connect(function(player)
    for _, plot in plotsFolder:GetChildren() do
        local owner = plot:FindFirstChild("OwnerUserId")
        if owner and owner.Value == tostring(player.UserId) then
            owner.Value = ""
            -- Optional: reset DropperTier, hide Dropper_02, clear buttons
            print("Released " .. plot.Name)
        end
    end
end)
\`\`\`

New players can claim freed plots on next join.`,
      },
      {
        title: 'Test with 2 players in Studio',
        content: `**Test** → **Players** tab → add second player.

| Test | Expected |
|------|----------|
| P1 joins | Claims PlotA |
| P2 joins | Claims PlotB |
| P2 touches P1 buy pad | Nothing / message |
| P1 leaves | PlotA freed |
| P3 joins | Can claim PlotA |

**BillboardGui** on plot: \`Owner: PlayerName\` after claim.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] PlotA and PlotB with OwnerUserId
- [ ] PlotClaimService assigns on join
- [ ] Buy/collector check ownsPlot
- [ ] PlayerRemoving clears owner
- [ ] Save: \`Lesson 4.5 - Player Plots\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Compared number UserId to string Value', explanation: 'Never matches - everyone blocked.', correctApproach: 'tostring(player.UserId) both sides' },
    { mistake: 'No release on leave', explanation: 'Plot stuck forever empty or owned.', correctApproach: 'PlayerRemoving clears OwnerUserId' },
    { mistake: 'Forgot ownsPlot on collector', explanation: 'Stealing income.', correctApproach: 'Same check on all plot interactions' },
    { mistake: 'Only one plot in game', explanation: 'Second player has nowhere to go.', correctApproach: 'At least PlotA and PlotB' },
  ],
  summary: `You auto-claimed plots with OwnerUserId, guarded purchases and collectors with ownsPlot, and released plots on leave - your tycoon is two-player ready.`,
  practiceTask: {
    title: 'Auto-claim plots (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Two players, two plots, no cross-use.

### Part A - PlotB + owners (8 min)
1. Duplicate PlotA → PlotB (rename all internals)
2. OwnerUserId StringValue on both (empty default)

### Part B - PlotClaimService (12 min)
1. PlayerAdded claims first free plot
2. ownsPlot in buy + collector scripts
3. PlayerRemoving releases plot

### Part C - Two-player test (5 min)
1. Studio Test with 2 players
2. Verify no cross-buy
3. **Save to Roblox** → \`Lesson 4.5 - Player Plots\`
4. **Practice complete**`,
    hints: [
      'Print owner.Value when touch fails - debug mismatch',
      'MoveTo spawn after claim so player sees their base',
      'Use FindFirstChild OwnerUserId on plot root',
    ],
    optionalChallenge: 'BillboardGui shows owner display name on plot sign.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Empty OwnerUserId means…', options: ['Plot is unclaimed', 'Plot deleted', 'Game published', 'Max tier'], correctAnswer: 0, explanation: 'Free plot available.' },
      { id: 'q2', type: MC, question: 'ownsPlot compares…', options: ['player.UserId to OwnerUserId', 'Part color', 'ClockTime', 'Terrain'], correctAnswer: 0, explanation: 'Ownership verification.' },
      { id: 'q3', type: MC, question: 'tostring(UserId) is needed when…', options: ['Owner stored in StringValue', 'Using IntValue only', 'Never', 'UI only'], correctAnswer: 0, explanation: 'Type must match.' },
      { id: 'q4', type: MC, question: 'PlayerRemoving should…', options: ['Clear plot owner', 'Delete game', 'Ban everyone', 'Remove DataStore'], correctAnswer: 0, explanation: 'Free plot for next join.' },
      { id: 'q5', type: MC, question: 'Second player should get…', options: ['PlotB if PlotA taken', 'Same plot as first', 'No spawn', 'All plots'], correctAnswer: 0, explanation: 'Next free plot.' },
      { id: 'q6', type: MC, question: 'Collector without ownsPlot allows…', options: ['Stealing others income', 'Better graphics', 'Faster save', 'More terrain'], correctAnswer: 0, explanation: 'Must gate collection.' },
      { id: 'q7', type: MC, question: 'PlotClaimService lives in…', options: ['ServerScriptService', 'StarterGui', 'Player Head', 'Lighting'], correctAnswer: 0, explanation: 'Server assigns plots.' },
      { id: 'q8', type: MC, question: 'Two plots minimum for 2 players…', options: ['True', 'False - one is enough', 'Only in Module 1', 'Never'], correctAnswer: 0, explanation: 'Each needs a base.' },
      { id: 'q9', type: MC, question: 'MoveTo spawn after claim helps…', options: ['Player see their plot', 'Delete coins', 'Remove HUD', 'Disable Play'], correctAnswer: 0, explanation: 'Clear onboarding.' },
      { id: 'q10', type: MC, question: 'Lesson 4.5 save name…', options: ['Lesson 4.5 - Player Plots', 'Upgrade Tables', 'Coin Dropper', 'Obby Ready'], correctAnswer: 0, explanation: 'Save multiplayer plots.' },
    ],
  },
}

export const enLesson46 = {
  lessonId: 'lesson-roblox-4-6',
  moduleId: 'module-04',
  order: 6,
  title: '4.6 - Checkpoint: Tycoon Works',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Ship a two-plot tycoon with income, buys, upgrades, and ownership',
    'Pass multiplayer and progression QA checklists',
    'Tune first 5 minutes of player experience',
    'Deliver Module 4 portfolio build Tycoon Works',
  ],
  theory: {
    sections: [
      {
        title: 'Module 4 checkpoint (about 40 minutes)',
        content: `Ship **Tycoon Works** - passive income + purchases + upgrades + **fair multiplayer**.

**Required:**
- Plot layout (4.1)
- Dropper + collector (4.2)
- Buy unlock (4.3)
- Table tiers (4.4)
- Plot claim (4.5)
- Module 3 **Coins** + optional **DataStore**`,
      },
      {
        title: '60-minute assembly sprint',
        content: `| Phase | Min | Task |
|-------|-----|------|
| 1 | 10 | Folder + naming audit |
| 2 | 15 | Dropper + collector + attributes |
| 3 | 10 | Buy Dropper_02 + tier upgrades |
| 4 | 10 | Plot claim 2-player test |
| 5 | 15 | QA matrix + polish signs |

**Save:** \`Module 4 - Tycoon Works\``,
      },
      {
        title: 'Progression pacing target',
        content: `**First 5 minutes** new player:
- Spawn on **their** plot
- See dropper producing coins
- HUD Coins rising without clicking
- Understand yellow **buy** pad label

**By minute 8-10:**
- Afford **Dropper_02** OR **tier 2** upgrade
- Notice faster income

If pacing too slow → lower prices in \`upgrades\` table only.`,
      },
      {
        title: 'Multiplayer QA matrix',
        content: `| # | Test |
|---|------|
| 1 | Player A claims PlotA only |
| 2 | Player B claims PlotB only |
| 3 | B cannot buy on A's pad |
| 4 | A cannot collect on B's collector |
| 5 | A leaves → PlotA free → C can claim |
| 6 | Tier upgrade changes spawn speed |
| 7 | No red Output on 2-min idle run |`,
      },
      {
        title: 'Architecture final check',
        content: `- [ ] \`PlotClaimService\` - join + leave
- [ ] \`ownsPlot\` on **every** plot touch script
- [ ] \`upgrades\` table - single balance source
- [ ] \`DropperTier\` per plot (copy IntValue to PlotB!)
- [ ] Debris on all droppers
- [ ] DataStore still loads Coins (Module 3.5)`,
      },
      {
        title: 'Presentation standards',
        content: `- Signs: \`Your Tycoon\`, \`Buy Upgrade\`, \`Collector\`
- Neon path still visible
- Tab leaderboard shows Coins
- Optional pickup sound on collector

**Demo (2 min):** claim plot → watch income → buy upgrade → show Tab score.`,
      },
      {
        title: 'Module 5 preview',
        content: `**Fighting Club** - Humanoid health, swords, damage, respawn in arena.

Your tycoon Coins and server scripts prepared you for **combat economies** and **server authority** - same patterns, different genre.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] All 7 QA tests pass
- [ ] Two plots for two players
- [ ] Progression to first upgrade < 10 min
- [ ] **Practice complete** on platform`,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'PlotB missing DropperTier', explanation: 'B uses A tier or zero.', correctApproach: 'Each plot has own IntValues' },
    { mistake: 'Skipped ownsPlot after adding claim', explanation: 'Exploit: steal upgrades.', correctApproach: 'Re-audit every Touched script' },
    { mistake: 'Only tested solo', explanation: 'Multiplayer breaks on publish.', correctApproach: 'Studio 2-player Test required' },
    { mistake: 'Prices in GUI != table', explanation: 'Player confusion.', correctApproach: 'Billboard reads upgrades[nextTier].price' },
  ],
  summary: `You integrated droppers, purchases, table upgrades, and per-player plots into Tycoon Works, passed multiplayer QA, and tuned early progression - Module 5 combat is next.`,
  practiceTask: {
    title: 'Ship Tycoon Works (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Full Module 4 checkpoint passing QA.

### Part A - Systems audit (15 min)
1. Run architecture checklist - fix gaps
2. PlotA + PlotB complete with machines
3. upgrades table + DropperTier on **each** plot

### Part B - Multiplayer QA (15 min)
1. Test matrix 1-7 - note pass/fail
2. Fix any cross-plot bug immediately

### Part C - Demo & save (10 min)
1. Solo run: 0 → first upgrade under 10 min
2. **Save to Roblox** → \`Module 4 - Tycoon Works\`
3. **Practice complete** + optional 2-player recording`,
    hints: [
      'Fix claim/ownsPlot before balancing prices',
      'Each plot needs its own DropperTier and OwnerUserId',
      'Print plot.Name in collector when debug needed',
    ],
    optionalChallenge: 'Second buy path: faster dropper OR higher value - player choice.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Tycoon Works needs…', options: ['Income + buy + upgrade + plots', 'Only terrain', 'Only obby', 'No server scripts'], correctAnswer: 0, explanation: 'Full Module 4 integration.' },
      { id: 'q2', type: MC, question: 'Test 3 verifies…', options: ['No cross-plot buying', 'Sky color', 'Terrain only', 'Publishing'], correctAnswer: 0, explanation: 'Ownership isolation.' },
      { id: 'q3', type: MC, question: 'Each plot needs its own…', options: ['DropperTier and OwnerUserId', 'Only one SpawnLocation in world', 'Same owner always', 'No collector'], correctAnswer: 0, explanation: 'Per-plot state.' },
      { id: 'q4', type: MC, question: 'Balance changes should edit…', options: ['upgrades table', 'Only brick colors', 'Player name', 'Roblox URL'], correctAnswer: 0, explanation: 'Config-driven balance.' },
      { id: 'q5', type: MC, question: 'First upgrade target time…', options: ['Under ~10 minutes', 'Never', '1 second', '1 hour minimum'], correctAnswer: 0, explanation: 'Early hook for retention.' },
      { id: 'q6', type: MC, question: 'Player leaves should…', options: ['Free their plot', 'Delete all DataStore', 'Ban others', 'Remove UI forever'], correctAnswer: 0, explanation: 'Release for new players.' },
      { id: 'q7', type: MC, question: 'Debris on droppers prevents…', options: ['Lag from part buildup', 'Saving', 'Leaderboard', 'Checkpoints'], correctAnswer: 0, explanation: 'Cleanup old coins.' },
      { id: 'q8', type: MC, question: 'Module 5 theme is…', options: ['Fighting / combat', 'Only coins again', 'Only publish', 'Empty'], correctAnswer: 0, explanation: 'Fighting Club module.' },
      { id: 'q9', type: MC, question: 'Red Output on idle run means…', options: ['Fix before shipping', 'Ready to publish', 'Add more lava', 'Remove plots'], correctAnswer: 0, explanation: 'Errors = bugs remain.' },
      { id: 'q10', type: MC, question: 'Module 4 save name…', options: ['Module 4 - Tycoon Works', 'Lesson 3.1', 'Obby Ready', 'Untitled'], correctAnswer: 0, explanation: 'Checkpoint portfolio name.' },
    ],
  },
}
