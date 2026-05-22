export default [
  {
    blk: 2,
    les: 1,
    title: '2.1 — Kill Blocks',
    objectives: [
      'Build dangerous obstacles that eliminate the player on touch',
      'Use `Touched` safely with character and Humanoid checks',
      'Differentiate between cosmetic blocks and gameplay hazards',
      'Test and debug kill logic using Play mode and Output',
    ],
    sections: [
      {
        title: 'Lesson Mission and Build Plan',
        content: `In this 60-minute lesson, you build the core mechanic of almost every obby: **kill blocks**.

By the end, your map has:
- A safe path and a danger path
- Red hazard parts that reset players
- Clean script logic that only affects real characters

Time plan:
1. Build hazard layout (15 min)
2. Script the kill behavior (20 min)
3. Add visual feedback and polish (15 min)
4. Test challenge run (10 min)`,
      },
      {
        title: 'Create the Hazard Geometry',
        content: `In **Workspace**, create a folder named \`Hazards\`.

Build 5-8 red platforms with:
- Material: Neon
- BrickColor: Really red
- Anchored: true
- CanCollide: true

Name each part clearly:
- \`Kill_01\`
- \`Kill_02\`
- \`Kill_Final\`

Place them between safe jumps so touching one has a clear consequence.`,
      },
      {
        title: 'Script the Touched + Humanoid Pattern',
        content: `Insert one **Script** in each hazard, or use one shared script if you already know loops. Start with per-block scripts:

\`\`\`lua
local killBlock = script.Parent

killBlock.Touched:Connect(function(hit)
  local character = hit.Parent
  if not character then return end

  local humanoid = character:FindFirstChildOfClass("Humanoid")
  if humanoid then
    humanoid.Health = 0
  end
end)
\`\`\`

Why this works:
- \`Touched\` fires for any colliding part
- \`hit.Parent\` is usually the character model
- Humanoid check prevents random parts from breaking logic`,
      },
      {
        title: 'Polish and Debugging',
        content: `Make hazards feel fair:
- Keep kill blocks visually distinct from safe blocks
- Avoid invisible kills for now
- Keep jump distance realistic for beginner players

Debug checklist:
- If touching does nothing, confirm script is **Script**, not LocalScript
- Confirm player touches that exact Part
- Confirm character has Humanoid (R15 and R6 do)

Fast test loop:
1. Press Play
2. Touch each hazard once
3. Respawn and retry until all hazards work`,
      },
    ],
    practice: {
      title: 'Practice Build: Lava Lane',
      description:
        'Create a mini-lane with 6 safe jumps and 4 lava kill blocks. Every kill block must correctly reset the player and be visually obvious.',
      hints: [
        'Use groups of 2-3 hazards with different widths to vary difficulty without making it unfair.',
        'If scripts repeat, duplicate a working kill block instead of rebuilding from scratch.',
      ],
      optionalChallenge:
        'Add a short burn effect before death by setting `Humanoid.Health = 10` first, waiting 0.2 seconds, then setting it to 0.',
    },
  },
  {
    blk: 2,
    les: 2,
    title: '2.2 — Checkpoints',
    objectives: [
      'Set up SpawnLocation checkpoints across an obby',
      'Update player respawn point during gameplay',
      'Prevent checkpoint confusion with clear visual states',
      'Build a multi-stage level where progress is saved in-session',
    ],
    sections: [
      {
        title: 'Why Checkpoints Matter',
        content: `Without checkpoints, players quit quickly after repeating early jumps. Today you make progress feel rewarding.

Checkpoint design rules:
- One checkpoint every 20-40 seconds of challenge
- Safe landing area near each checkpoint
- Unique color or icon so players know it activated`,
      },
      {
        title: 'Build SpawnLocation Checkpoints',
        content: `Insert 4 **SpawnLocation** parts:
- Rename: \`CP_1\`, \`CP_2\`, \`CP_3\`, \`CP_Final\`
- Set \`Neutral = false\`
- Set \`AllowTeamChangeOnTouch = false\`
- Keep \`Anchored = true\`

Place them at the end of each obstacle segment.

Make checkpoints visible:
- Start with yellow
- Turn green when activated`,
      },
      {
        title: 'Activate Respawn with Touch Script',
        content: `If you prefer scripted checkpoints, add a script to each checkpoint part:

\`\`\`lua
local checkpoint = script.Parent

checkpoint.Touched:Connect(function(hit)
  local character = hit.Parent
  if not character then return end

  local player = game.Players:GetPlayerFromCharacter(character)
  if not player then return end

  player.RespawnLocation = checkpoint
end)
\`\`\`

This writes a new respawn target whenever the player reaches a checkpoint.`,
      },
      {
        title: 'Checkpoint UX and Testing',
        content: `Good checkpoint feedback:
- Small sparkle particle or glow
- "Checkpoint reached!" text popup
- Audio ping for confirmation

Test plan:
1. Reach CP_2
2. Touch kill block
3. Confirm respawn at CP_2, not start
4. Repeat for every checkpoint

If respawn is wrong, inspect:
- Is \`RespawnLocation\` being set?
- Is the part still a SpawnLocation?
- Did player touch the right part?`,
      },
    ],
    practice: {
      title: 'Practice Build: Three-Stage Obby',
      description:
        'Build a three-stage obstacle map with one checkpoint per stage. Confirm every stage respawn works after intentional deaths.',
      hints: [
        'Space checkpoints far enough apart to feel meaningful, but not so far that failing feels punishing.',
        'Use a distinct color progression (yellow -> orange -> green) to communicate depth into the level.',
      ],
      optionalChallenge:
        'Store each player’s latest checkpoint number as an `IntValue` inside their character for future UI display.',
    },
  },
  {
    blk: 2,
    les: 3,
    title: '2.3 — Level Timer',
    objectives: [
      'Measure run time with `os.clock`',
      'Display a live timer in ScreenGui',
      'Format elapsed time in a readable way',
      'Stop timer cleanly at level completion',
    ],
    sections: [
      {
        title: 'Timer Game Loop Design',
        content: `A timer adds pressure and replay value. Your obby now tracks speed-runs.

Today you build:
- Start trigger
- Running timer text
- Finish trigger that freezes final time

You will script this in a **LocalScript** for UI updates.`,
      },
      {
        title: 'Build Timer UI',
        content: `In **StarterGui**, create:
- \`ScreenGui\` named \`RunUI\`
- \`TextLabel\` named \`TimerLabel\`

Set:
- Size: \`{0, 220}, {0, 50}\`
- Position: top-center
- TextScaled: true
- Initial Text: \`Time: 0.00\``,
      },
      {
        title: 'Script os.clock Timer',
        content: `Add LocalScript inside \`RunUI\`:

\`\`\`lua
local label = script.Parent:WaitForChild("TimerLabel")
local startTime = os.clock()
local running = true

while running do
  local elapsed = os.clock() - startTime
  label.Text = string.format("Time: %.2f", elapsed)
  task.wait(0.05)
end
\`\`\`

Later, you connect \`running = false\` when player reaches finish.

Why \`os.clock\`:
- Accurate enough for lesson games
- Simple to understand for first-time coders`,
      },
      {
        title: 'Stop and Save Final Time',
        content: `Create a finish part named \`FinishPad\`. On touch, fire a RemoteEvent or set a local state so timer stops and final text appears.

Example finish text:
- \`Finished in 42.37s!\`
- \`New best! 39.81s\` (future lesson)

Common issue:
- Timer restarts on respawn. For now, this is acceptable in obby mode; later modules cover persistence.`,
      },
    ],
    practice: {
      title: 'Practice Build: Beat Your Time',
      description:
        'Add a timer to your checkpoint obby. Complete three runs and try to improve your best result by at least 10%.',
      hints: [
        'Use a short `task.wait(0.05)` update interval to keep text smooth but not too heavy.',
        'If UI does not appear, verify everything is under `StarterGui` and not `Workspace`.',
      ],
      optionalChallenge:
        'Add minute-second format (`01:23.45`) once elapsed time exceeds 60 seconds.',
    },
  },
  {
    blk: 2,
    les: 4,
    title: '2.4 — if/else Conditions',
    objectives: [
      'Use `if/elseif/else` for gameplay decisions',
      'Gate level logic based on player state',
      'Write readable conditional scripts for teens',
      'Prevent invalid progression with clear condition checks',
    ],
    sections: [
      {
        title: 'Thinking Like a Game Programmer',
        content: `Conditions are how games decide what happens next.

Examples:
- **If** player has key -> open door
- **Else** -> show "Need key"
- **If** timer under 60s -> award medal

Today you turn your obby into a smarter game with simple branching logic.`,
      },
      {
        title: 'if/elseif/else Syntax',
        content: `Core pattern in Luau:

\`\`\`lua
local score = 12

if score >= 20 then
  print("Gold reward")
elseif score >= 10 then
  print("Silver reward")
else
  print("Keep practicing")
end
\`\`\`

Rules:
- Condition must evaluate to true/false
- First true branch runs
- Always close with \`end\``,
      },
      {
        title: 'Apply Conditions to Obby Rewards',
        content: `On finish, check elapsed time and assign rank:

\`\`\`lua
local elapsed = 47.3
local rankText = ""

if elapsed < 35 then
  rankText = "S Rank"
elseif elapsed < 60 then
  rankText = "A Rank"
else
  rankText = "Finish Rank"
end
\`\`\`

Display \`rankText\` on your victory UI to motivate replays.`,
      },
      {
        title: 'Clean Logic Habits',
        content: `Avoid messy condition chains:
- Keep thresholds in one place
- Use comments for game rules
- Prefer descriptive variables (\`elapsedTime\`, not \`x\`)

Test each branch intentionally:
1. Fast run -> should hit S or A
2. Slow run -> should hit fallback
3. Edge case exactly 60.00s`,
      },
    ],
    practice: {
      title: 'Practice Build: Finish Grading',
      description:
        'Add finish grading to your obby with three possible outcomes based on completion time, then show the grade on-screen.',
      hints: [
        'Start by printing grade to Output before wiring it into UI.',
        'Test boundary values like 34.99, 35.00, 59.99, and 60.00 seconds.',
      ],
      optionalChallenge:
        'Add a second condition branch for deaths: if player died 3+ times, downgrade rank by one tier.',
    },
  },
  {
    blk: 2,
    les: 5,
    title: '2.5 — Victory Screen',
    objectives: [
      'Create a polished ScreenGui victory panel',
      'Populate UI text dynamically from gameplay data',
      'Use visible hierarchy: title, stats, actions',
      'Improve retention with replay and next-level prompts',
    ],
    sections: [
      {
        title: 'Designing a Satisfying Win Moment',
        content: `A victory screen is not just decoration. It gives closure and drives replay.

Your win screen should show:
- Completion message
- Final time
- Rank or stars
- Buttons: Retry / Next`,
      },
      {
        title: 'Build the ScreenGui Structure',
        content: `In **StarterGui**, create:
- \`ScreenGui\` -> \`VictoryGui\`
- \`Frame\` -> centered panel
- \`TextLabel\` -> \`TitleLabel\`
- \`TextLabel\` -> \`TimeLabel\`
- \`TextLabel\` -> \`RankLabel\`
- \`TextButton\` -> \`RetryButton\`

Set \`Enabled = false\` initially so it appears only after finishing.`,
      },
      {
        title: 'Open Victory Screen by Script',
        content: `In LocalScript:

\`\`\`lua
local gui = script.Parent
local titleLabel = gui.Frame.TitleLabel
local timeLabel = gui.Frame.TimeLabel
local rankLabel = gui.Frame.RankLabel

local function showVictory(finalTime, rank)
  titleLabel.Text = "Level Complete!"
  timeLabel.Text = string.format("Time: %.2fs", finalTime)
  rankLabel.Text = "Rank: " .. rank
  gui.Enabled = true
end
\`\`\`

Call \`showVictory\` from your finish logic.`,
      },
      {
        title: 'Button Interactions and Flow',
        content: `Basic retry behavior:
- Respawn character
- Hide victory UI
- Restart timer

Best practices for teen-friendly UX:
- Large readable text
- Strong contrast colors
- One clear primary action
- Keep button labels short and obvious`,
      },
    ],
    practice: {
      title: 'Practice Build: Win Panel Polish',
      description:
        'Create a complete victory panel that appears on finish and displays time + rank from your existing systems.',
      hints: [
        'Make sure your script references exact object names to avoid nil errors.',
        'Test with both fast and slow runs so dynamic text updates correctly.',
      ],
      optionalChallenge:
        'Animate panel entry using TweenService so the frame slides in from the top when enabled.',
    },
  },
  {
    blk: 2,
    les: 6,
    title: '2.6 — Checkpoint: Obby Ready',
    objectives: [
      'Combine hazards, checkpoints, timer, conditions, and victory UI',
      'Balance challenge for a first playable obby release',
      'Run structured playtests and collect actionable feedback',
      'Ship a complete mini-game checkpoint build',
    ],
    sections: [
      {
        title: 'Checkpoint Goal',
        content: `Today is a full build day. You ship a playable obby prototype called **Obby Ready**.

Required systems:
- Kill blocks
- Stage checkpoints
- Timer
- Time-based rank condition
- Victory screen`,
      },
      {
        title: 'Production Sprint Plan (60 Minutes)',
        content: `Recommended sprint:
1. 10 min - clean map and naming
2. 15 min - verify hazards and checkpoints
3. 15 min - timer + finish flow
4. 10 min - UI polish
5. 10 min - playtest + bug fixes

Keep all scripts in clear folders:
- \`ServerScriptService\`
- \`StarterGui\`
- \`Workspace/Map\``,
      },
      {
        title: 'Playtest Checklist',
        content: `Run 5 test cases:
1. Die on early hazard -> respawn at latest checkpoint
2. Reach final checkpoint -> die -> respawn correctly
3. Finish quickly -> high rank branch
4. Finish slowly -> lower rank branch
5. Retry button works and UI resets

Record issues in a note:
- Bug
- Repro steps
- Fix status`,
      },
      {
        title: 'Release-Ready Standards',
        content: `Your checkpoint submission should feel complete, not just functional.

Quality bar:
- No obvious script errors in Output
- At least 60-90 seconds of gameplay
- Consistent art style (colors, materials)
- Clear start and finish direction signs`,
      },
    ],
    practice: {
      title: 'Checkpoint Submission: Obby Ready',
      description:
        'Package your final obby level with all module systems integrated and tested. Demo the game from start to finish in one clean run.',
      hints: [
        'Before final testing, reset and run as if you are a new player seeing the map for the first time.',
        'Fix gameplay confusion first (where to go), then polish visuals.',
      ],
      optionalChallenge:
        'Add a hidden shortcut route that saves time but requires higher skill to execute.',
    },
  },
  {
    blk: 3,
    les: 1,
    title: '3.1 — Coins on the Map',
    objectives: [
      'Design collectible coin placements that guide player movement',
      'Build reusable coin prefabs for consistent behavior',
      'Use spacing and visibility to teach level flow',
      'Prepare map layout for simulator-style progression',
    ],
    sections: [
      {
        title: 'From Obby to Simulator',
        content: `Module 3 starts your first **collecting economy** game. Today you place coins in smart patterns.

Good coin placement does three jobs:
- Rewards exploration
- Teaches route direction
- Controls game pacing`,
      },
      {
        title: 'Build a Coin Prefab',
        content: `Create one coin part:
- Shape: Cylinder
- Material: Neon or Metal
- Color: Bright yellow
- Size: \`2, 0.4, 2\`
- Anchored: true
- CanCollide: false

Add a slight hover height above ground and name it \`CoinPrefab\`.

Optional visual: use a PointLight for glow.`,
      },
      {
        title: 'Map Placement Strategy',
        content: `Place at least 30 coins using these patterns:
- **Trail line:** beginner route
- **Risk jump:** harder but faster path
- **Cluster zone:** reward for exploration

Distribution tip:
- Early area: high density
- Mid area: medium
- Advanced area: low but valuable`,
      },
      {
        title: 'Organize for Future Scripting',
        content: `Create folder structure:
- \`Workspace/Coins/Common\`
- \`Workspace/Coins/Rare\` (optional)

Duplicate prefab and rename:
- \`Coin_001\` ... \`Coin_030\`

Clean naming now saves debugging time once collection scripts arrive next lesson.`,
      },
    ],
    practice: {
      title: 'Practice Build: Coin Route',
      description:
        'Place 30+ coins in your map so players naturally travel through three zones: easy, medium, and challenge.',
      hints: [
        'Keep some coins visible from spawn to create an immediate goal.',
        'Avoid placing all coins in one line; mix direct and discovery paths.',
      ],
      optionalChallenge:
        'Add five hidden coins in secret areas that reward careful exploration.',
    },
  },
  {
    blk: 3,
    les: 2,
    title: '3.2 — Collecting Coins',
    objectives: [
      'Detect player touches on coin parts',
      'Use debounce to prevent duplicate coin collection',
      'Remove or hide coins after pickup',
      'Write robust server-side collection logic',
    ],
    sections: [
      {
        title: 'Collection System Requirements',
        content: `A good coin system must:
- Count exactly once per pickup
- Feel instant and responsive
- Prevent farming from one coin by spamming touch

Today you implement **debounce** to keep it fair.`,
      },
      {
        title: 'Basic Coin Touch Script',
        content: `Put this Script inside each coin (or prefab model):

\`\`\`lua
local coin = script.Parent
local collected = false

coin.Touched:Connect(function(hit)
  if collected then return end

  local character = hit.Parent
  if not character then return end

  local player = game.Players:GetPlayerFromCharacter(character)
  if not player then return end

  collected = true
  coin.Transparency = 1
  coin.CanCollide = false
end)
\`\`\``,
      },
      {
        title: 'Why Debounce Matters',
        content: `Without debounce, \`Touched\` can fire multiple times per second, causing:
- Double counting
- Sound spam
- Buggy UI updates

Debounce pattern:
- Start false
- Set true on first valid touch
- Ignore all later touches`,
      },
      {
        title: 'Respawn Behavior Choices',
        content: `Choose one behavior:
- **One-time coins per session:** keep removed
- **Respawn coins every N seconds:** use \`task.delay\`

Respawn example:
\`\`\`lua
task.delay(15, function()
  collected = false
  coin.Transparency = 0
  coin.CanCollide = false
end)
\`\`\`

For simulator style, timed respawn is usually more engaging.`,
      },
    ],
    practice: {
      title: 'Practice Build: Stable Pickup Logic',
      description:
        'Implement coin collection on at least 15 coins with debounce and visual disappearance. Verify every coin triggers exactly once per cycle.',
      hints: [
        'Test by running into one coin repeatedly for 2-3 seconds and confirm it only counts once.',
        'Use Output prints temporarily to verify touch events before removing debug logs.',
      ],
      optionalChallenge:
        'Play a short pickup sound effect only on successful first collection, not on ignored touches.',
    },
  },
  {
    blk: 3,
    les: 3,
    title: '3.3 — Score on Screen + leaderstats',
    objectives: [
      'Create leaderstats with an IntValue coin counter',
      'Display coin count in Roblox leaderboard and UI',
      'Update values safely from server scripts',
      'Connect pickups to persistent in-session scoring',
    ],
    sections: [
      {
        title: 'leaderstats Concept',
        content: `Roblox automatically shows stats in the player list when you use a folder named \`leaderstats\`.

You will add:
- \`leaderstats\` folder
- \`Coins\` IntValue

This gives players immediate feedback and competition.`,
      },
      {
        title: 'Create leaderstats Script',
        content: `In **ServerScriptService**, create Script:

\`\`\`lua
game.Players.PlayerAdded:Connect(function(player)
  local leaderstats = Instance.new("Folder")
  leaderstats.Name = "leaderstats"
  leaderstats.Parent = player

  local coins = Instance.new("IntValue")
  coins.Name = "Coins"
  coins.Value = 0
  coins.Parent = leaderstats
end)
\`\`\``,
      },
      {
        title: 'Award Coins on Pickup',
        content: `In your coin script, after finding \`player\`, add:

\`\`\`lua
local stats = player:FindFirstChild("leaderstats")
if stats then
  local coins = stats:FindFirstChild("Coins")
  if coins then
    coins.Value += 1
  end
end
\`\`\`

Keep this on server for trusted game economy logic.`,
      },
      {
        title: 'Optional UI Mirror',
        content: `You can mirror Coins in a custom ScreenGui with LocalScript listening to value changes.

Flow:
1. Get local player
2. Wait for leaderstats
3. Connect \`GetPropertyChangedSignal("Value")\`
4. Update label text

This gives both:
- Global leaderboard view
- Big readable HUD counter`,
      },
    ],
    practice: {
      title: 'Practice Build: Coins HUD',
      description:
        'Set up leaderstats and connect all coin pickups so score updates live in leaderboard. Add optional top-left HUD text for coin count.',
      hints: [
        'If coins do not increase, verify the script runs on server and references exact names.',
        'Use `WaitForChild("leaderstats")` in UI scripts to avoid timing errors.',
      ],
      optionalChallenge:
        'Create two coin types: common gives +1, rare gives +5, each with different color and glow.',
    },
  },
  {
    blk: 3,
    les: 4,
    title: '3.4 — Functions',
    objectives: [
      'Refactor repeated coin logic into reusable functions',
      'Pass arguments to functions for flexible behavior',
      'Improve script readability and maintainability',
      'Build a mini helper API for simulator systems',
    ],
    sections: [
      {
        title: 'Why Functions Level Up Your Code',
        content: `When scripts repeat the same blocks, bugs multiply. Functions let you write once and reuse everywhere.

Today you build function helpers for:
- Awarding coins
- Hiding and respawning coins
- Formatting UI text`,
      },
      {
        title: 'Function Basics in Luau',
        content: `Example:

\`\`\`lua
local function awardCoins(player, amount)
  local stats = player:FindFirstChild("leaderstats")
  if not stats then return end

  local coins = stats:FindFirstChild("Coins")
  if coins then
    coins.Value += amount
  end
end
\`\`\`

Now call \`awardCoins(player, 1)\` or \`awardCoins(player, 5)\`.`,
      },
      {
        title: 'Refactor Coin Script with Functions',
        content: `Split responsibilities:
- \`isValidPlayerHit(hit)\`
- \`awardCoins(player, amount)\`
- \`consumeCoin(coin)\`

This makes each step easy to test and edit.

If tomorrow you add multipliers, you change one function instead of 30 scripts.`,
      },
      {
        title: 'Readable Coding Standards',
        content: `Function tips for teen teams:
- Use verb names (\`awardCoins\`, \`resetCoin\`)
- Keep functions short (5-20 lines)
- Return early for invalid states
- Comment only when game rule is not obvious

This is how real studios keep projects scalable.`,
      },
    ],
    practice: {
      title: 'Practice Build: Coin Utility Functions',
      description:
        'Refactor at least one coin script so all major actions are handled through named helper functions with clear inputs.',
      hints: [
        'Start by extracting only one repeated block, then continue step by step.',
        'After each refactor, run a quick in-game test before moving on.',
      ],
      optionalChallenge:
        'Create a `formatCoins(value)` function that returns strings like `1,250 Coins` for future UI use.',
    },
  },
  {
    blk: 3,
    les: 5,
    title: '3.5 — DataStore: Memory Between Sessions',
    objectives: [
      'Understand DataStoreService purpose and constraints',
      'Save and load player coin progress safely',
      'Use `pcall` for error handling with DataStores',
      'Prevent common save-loss mistakes in beginner projects',
    ],
    sections: [
      {
        title: 'Why DataStore Changes Everything',
        content: `Without DataStore, players lose all progress when they leave. With DataStore, your game remembers them.

Today you implement:
- Load coins on join
- Save coins on leave
- Error-safe wrappers`,
      },
      {
        title: 'Create DataStore Service Script',
        content: `In **ServerScriptService**:

\`\`\`lua
local DataStoreService = game:GetService("DataStoreService")
local coinStore = DataStoreService:GetDataStore("CoinProgress_v1")
\`\`\`

Use versioned names (\`_v1\`) so you can migrate later without breaking old data.`,
      },
      {
        title: 'Load and Save with pcall',
        content: `Basic pattern:

\`\`\`lua
local function loadCoins(player)
  local success, data = pcall(function()
    return coinStore:GetAsync(player.UserId)
  end)
  if success and data then
    return data
  end
  return 0
end

local function saveCoins(player, amount)
  pcall(function()
    coinStore:SetAsync(player.UserId, amount)
  end)
end
\`\`\`

\`pcall\` protects the game when Roblox services fail temporarily.`,
      },
      {
        title: 'Integrate with leaderstats',
        content: `On player join:
1. Create leaderstats
2. Load saved amount
3. Set \`Coins.Value\`

On player leaving:
1. Read current \`Coins.Value\`
2. Save to DataStore

Important:
- Test using **Publish** + live server or Studio API enabled settings
- Never trust DataStore in Edit mode only`,
      },
    ],
    practice: {
      title: 'Practice Build: Persistent Coins',
      description:
        'Implement DataStore so a player can earn coins, leave, rejoin, and see the same amount restored.',
      hints: [
        'Use one dedicated script for data loading/saving rather than scattering DataStore code across many scripts.',
        'Print success/fail messages in Output during testing to confirm save events.',
      ],
      optionalChallenge:
        'Add a second saved field called `BestRunTime` and initialize it with a large default value.',
    },
  },
  {
    blk: 3,
    les: 6,
    title: '3.6 — Checkpoint: Coin Simulator',
    objectives: [
      'Assemble a complete coin simulator core loop',
      'Validate economy systems across session restarts',
      'Tune map pacing for coin collection fun',
      'Deliver a checkpoint build with reusable architecture',
    ],
    sections: [
      {
        title: 'Checkpoint Goal',
        content: `Ship a playable **Coin Simulator** slice with:
- Coin map placement
- Stable collection + debounce
- leaderstats coin tracking
- Function-based scripts
- DataStore save/load`,
      },
      {
        title: 'Build Sprint Structure',
        content: `60-minute finalization plan:
1. 10 min - clean folders and names
2. 15 min - verify all coin scripts
3. 15 min - test save/load flow
4. 10 min - add UI clarity
5. 10 min - polish and bug fixes`,
      },
      {
        title: 'QA Test Matrix',
        content: `Run these tests:
- Collect 10 coins quickly -> count correct
- Touch one coin repeatedly -> count still +1
- Leave and rejoin -> value restored
- Multiple players -> no cross-account coin leak

Keep a bug log with reproducible steps.`,
      },
      {
        title: 'Checkpoint Submission Standards',
        content: `Your coin simulator should feel like a game, not a demo.

Minimum quality:
- No serious Output errors
- Clear player objective from spawn
- Smooth collection feedback (sound/visual)
- Data survives rejoin`,
      },
    ],
    practice: {
      title: 'Checkpoint Submission: Coin Simulator',
      description:
        'Deliver your coin simulator checkpoint with stable collection, visible progression, and persistent data between sessions.',
      hints: [
        'Do one complete run as a brand-new player to evaluate onboarding clarity.',
        'If DataStore is unstable during tests, keep logs and retry after short waits; never remove pcall safety.',
      ],
      optionalChallenge:
        'Add a simple coin multiplier area where coins are worth double for 20 seconds after stepping on a booster pad.',
    },
  },
  {
    blk: 4,
    les: 1,
    title: '4.1 — Tycoon Architecture',
    objectives: [
      'Plan a tycoon map with clear progression lanes',
      'Separate static world parts from player-owned systems',
      'Define folder structure for scalable tycoon scripts',
      'Prepare plot-based workflow for multiplayer support',
    ],
    sections: [
      {
        title: 'How Tycoon Games Are Structured',
        content: `Tycoons are systems games: earn, buy, upgrade, repeat.

Core loop:
1. Start with basic generator
2. Earn currency
3. Unlock better producers
4. Expand base and income`,
      },
      {
        title: 'Map and Folder Blueprint',
        content: `Create top-level folders:
- \`Workspace/Plots\`
- \`Workspace/TycoonAssets\`
- \`ReplicatedStorage/TycoonConfig\`

Each plot should later contain:
- Dropper area
- Conveyor path
- Purchase buttons
- Upgrade objects`,
      },
      {
        title: 'Design One Starter Plot',
        content: `Build a prototype plot:
- Foundation baseplate
- Empty machine zone
- Currency collector location
- Spawn sign

Name plot objects clearly:
- \`PlotA_Base\`
- \`PlotA_DropperSlot\`
- \`PlotA_BuyButtons\``,
      },
      {
        title: 'Future-Proof Architecture Decisions',
        content: `Good architecture now avoids rewrites later.

Rules:
- Config values in tables, not hard-coded everywhere
- One script responsible for ownership
- One script for purchases
- One script for production flow`,
      },
    ],
    practice: {
      title: 'Practice Build: Tycoon Skeleton',
      description:
        'Create one complete, cleanly named tycoon plot layout with designated zones for droppers, buttons, and upgrades.',
      hints: [
        'Use color-coded placeholder parts to mark system zones before final modeling.',
        'Keep paths wide enough so players can move around machines comfortably.',
      ],
      optionalChallenge:
        'Block off a future expansion area on the plot and mark it with a “Coming Soon” gate for later unlocks.',
    },
  },
  {
    blk: 4,
    les: 2,
    title: '4.2 — Coin Dropper',
    objectives: [
      'Spawn resource parts from a dropper machine',
      'Move resources along a simple conveyor path',
      'Convert dropped resources into player currency',
      'Balance spawn timing for performance and pacing',
    ],
    sections: [
      {
        title: 'Dropper System Overview',
        content: `The dropper is the heart of tycoon progression. It creates value over time.

Today you build:
- Spawner part
- Repeating coin/cube output
- Collector that awards currency`,
      },
      {
        title: 'Create the Spawner Script',
        content: `In a Script under \`Dropper\`:

\`\`\`lua
local dropper = script.Parent
local spawnPoint = dropper:WaitForChild("SpawnPoint")

while true do
  local coin = Instance.new("Part")
  coin.Size = Vector3.new(1, 1, 1)
  coin.Position = spawnPoint.Position
  coin.Anchored = false
  coin.Name = "TycoonCoin"
  coin.Parent = workspace
  task.wait(2)
end
\`\`\`

Later, we improve ownership and cleanup.`,
      },
      {
        title: 'Collector Reward Logic',
        content: `Create a collector pad with script:

\`\`\`lua
local collector = script.Parent

collector.Touched:Connect(function(hit)
  if hit.Name ~= "TycoonCoin" then return end
  hit:Destroy()
  -- add currency to owner here
end)
\`\`\`

Attach ownership checks so only the plot owner earns from their dropper.`,
      },
      {
        title: 'Performance and Cleanup',
        content: `Without cleanup, hundreds of coins can lag the server.

Add safety:
- Destroy coins after 20-30 seconds using Debris
- Keep spawn interval >= 1 second for starter machines
- Avoid unanchored clutter outside plot area`,
      },
    ],
    practice: {
      title: 'Practice Build: Working Starter Dropper',
      description:
        'Implement one dropper that spawns resource parts every 2 seconds and rewards currency when resources reach the collector.',
      hints: [
        'Start simple with one machine before adding upgrades or extra droppers.',
        'Use Debris or timed cleanup to keep the world from filling with old parts.',
      ],
      optionalChallenge:
        'Color generated resources based on value tier (bronze/silver/gold) and award different amounts.',
    },
  },
  {
    blk: 4,
    les: 3,
    title: '4.3 — Purchase Button',
    objectives: [
      'Create buy buttons that unlock machines and upgrades',
      'Check player currency before purchase',
      'Prevent duplicate purchases with state flags',
      'Provide clear success and insufficient-funds feedback',
    ],
    sections: [
      {
        title: 'Purchase Flow Design',
        content: `Each tycoon button should:
1. Detect player touch
2. Verify ownership
3. Check currency
4. Deduct price
5. Reveal new machine`,
      },
      {
        title: 'Script a Basic Buy Button',
        content: `Example Script:

\`\`\`lua
local button = script.Parent
local price = 50
local purchased = false

button.Touched:Connect(function(hit)
  if purchased then return end
  local player = game.Players:GetPlayerFromCharacter(hit.Parent)
  if not player then return end

  local coins = player.leaderstats and player.leaderstats:FindFirstChild("Coins")
  if not coins then return end
  if coins.Value < price then return end

  coins.Value -= price
  purchased = true
  button.Transparency = 1
  button.CanCollide = false
end)
\`\`\``,
      },
      {
        title: 'Unlocking New Assets',
        content: `Create a hidden machine model in plot folder:
- \`Dropper_02\` with \`Parent = nil\` or hidden transparency

On successful purchase:
- Parent to plot
- Enable scripts
- Animate reveal if desired`,
      },
      {
        title: 'UX Feedback for Purchases',
        content: `Give instant feedback:
- Green flash for success
- Red flash or text for not enough coins
- Floating price label above button

Players should never wonder "Did that work?"`,
      },
    ],
    practice: {
      title: 'Practice Build: Unlock Machine Button',
      description:
        'Build one purchase button that costs 50 coins and unlocks a second dropper only once after successful payment.',
      hints: [
        'Use a `purchased` boolean to block repeat triggers even if Touched fires multiple times.',
        'Print the player’s coin value before and after purchase during testing.',
      ],
      optionalChallenge:
        'Add a BillboardGui showing dynamic text: “Buy Dropper 2 - 50 Coins” that changes to “Purchased”.',
    },
  },
  {
    blk: 4,
    les: 4,
    title: '4.4 — Tables and Upgrades',
    objectives: [
      'Store upgrade data in Luau tables',
      'Drive pricing and production values from config',
      'Apply selected upgrade effects dynamically',
      'Avoid hard-coded tycoon logic duplication',
    ],
    sections: [
      {
        title: 'Config-Driven Upgrades',
        content: `Tables let you define upgrade tiers once and reuse data cleanly.

Example benefits:
- Easy balancing
- Faster content updates
- Less copy/paste logic`,
      },
      {
        title: 'Build an Upgrade Table',
        content: `Create ModuleScript or local table:

\`\`\`lua
local upgrades = {
  { id = 1, price = 0, spawnRate = 2.0, value = 1 },
  { id = 2, price = 100, spawnRate = 1.5, value = 2 },
  { id = 3, price = 300, spawnRate = 1.0, value = 4 },
}
\`\`\`

Each tier controls both speed and reward.`,
      },
      {
        title: 'Apply Upgrade by Current Tier',
        content: `When player buys upgrade:
- Increase tier index
- Read matching table entry
- Update dropper settings

\`\`\`lua
local current = upgrades[currentTier]
dropperSpawnRate = current.spawnRate
coinValue = current.value
\`\`\`

Now your machine behavior comes from data, not hard-coded branches.`,
      },
      {
        title: 'Balancing with Data',
        content: `Try these balancing checks:
- Can players reach tier 2 in under 2 minutes?
- Is tier 3 meaningful but not impossible?
- Does each tier feel noticeably stronger?

Adjust only table values, then retest. This is real game economy workflow.`,
      },
    ],
    practice: {
      title: 'Practice Build: Three-Tier Upgrade',
      description:
        'Implement a 3-tier dropper upgrade system using a table that changes both spawn speed and coin value.',
      hints: [
        'Keep upgrade data in one place so future rebalance takes seconds.',
        'Show current tier in UI or print logs to confirm table values are applied.',
      ],
      optionalChallenge:
        'Add a fourth prestige tier with very high cost and a special visual effect around the dropper.',
    },
  },
  {
    blk: 4,
    les: 5,
    title: '4.5 — A Plot for Every Player',
    objectives: [
      'Assign unique tycoon plots to players on join',
      'Track plot ownership securely on server',
      'Block other players from using someone else’s buttons',
      'Reset plot ownership correctly when players leave',
    ],
    sections: [
      {
        title: 'Multiplayer Tycoon Problem',
        content: `In multiplayer, every player needs a personal base. If plots are shared, progression breaks.

Today you solve:
- Plot claiming
- Ownership checks
- Release on leave`,
      },
      {
        title: 'Tag Plots with Owner Value',
        content: `Inside each plot model, add:
- \`StringValue\` named \`OwnerUserId\` (default empty)

On player join:
1. Find first unclaimed plot
2. Set OwnerUserId to player.UserId
3. Teleport player to that plot spawn`,
      },
      {
        title: 'Ownership Check Function',
        content: `Create reusable function:

\`\`\`lua
local function ownsPlot(player, plot)
  local ownerValue = plot:FindFirstChild("OwnerUserId")
  return ownerValue and ownerValue.Value == tostring(player.UserId)
end
\`\`\`

Use this in all purchase and collector scripts.`,
      },
      {
        title: 'Release Plot on PlayerLeaving',
        content: `On leave:
- Clear owner value
- Reset purchased buttons
- Remove spawned machine parts if needed

This prevents stale ownership and keeps servers healthy for new joins.`,
      },
    ],
    practice: {
      title: 'Practice Build: Auto-Claim Plots',
      description:
        'Implement automatic plot assignment for up to two players and ensure each can interact only with their own tycoon systems.',
      hints: [
        'Convert UserId to string if your Owner value type is StringValue.',
        'Test with two Studio test players to confirm no cross-plot purchases occur.',
      ],
      optionalChallenge:
        'Display the owner name on a BillboardGui sign above each claimed plot.',
    },
  },
  {
    blk: 4,
    les: 6,
    title: '4.6 — Checkpoint: Tycoon Works',
    objectives: [
      'Integrate dropper, purchase, upgrades, and ownership systems',
      'Run multiplayer validation on separate player plots',
      'Tune progression pacing for first 5-10 minutes',
      'Deliver a stable mini-tycoon checkpoint build',
    ],
    sections: [
      {
        title: 'Checkpoint Scope',
        content: `Your **Tycoon Works** build must include:
- Personal plot assignment
- Starter dropper income
- At least one purchasable unlock
- One upgrade tier path
- Ownership-safe interactions`,
      },
      {
        title: 'Final Assembly Order',
        content: `Suggested order:
1. Verify plot assignment first
2. Confirm dropper output
3. Connect purchase button unlock
4. Apply upgrade table values
5. Validate ownership gates`,
      },
      {
        title: 'Multiplayer Test Checklist',
        content: `Use 2-player local server test:
- Player A cannot buy on Player B plot
- Player B cannot collect Player A resources
- Leaving player frees plot
- New player can claim freed plot

Log every failed case and fix immediately.`,
      },
      {
        title: 'Quality and Presentation',
        content: `Checkpoint quality standards:
- Consistent naming and folder structure
- Clear visual labels for buttons and machines
- No severe script errors in Output
- Playable progression loop in under 2 minutes to first upgrade`,
      },
    ],
    practice: {
      title: 'Checkpoint Submission: Tycoon Works',
      description:
        'Submit a two-player-ready tycoon prototype where each player owns a unique plot and can progress through at least one unlock + upgrade chain.',
      hints: [
        'Focus on system reliability first; decorative polish comes after mechanics are stable.',
        'If interactions fail, print owner checks and player IDs to debug ownership logic quickly.',
      ],
      optionalChallenge:
        'Add a second unlock path so players can choose between a faster dropper or higher-value drops.',
    },
  },
  {
    blk: 5,
    les: 1,
    title: '5.1 — Humanoid and Health',
    objectives: [
      'Understand how Humanoid controls player health and death',
      'Read and modify health values through scripts',
      'Create safe damage zones with predictable outcomes',
      'Prepare combat systems with clean health handling',
    ],
    sections: [
      {
        title: 'Combat System Foundations',
        content: `Every Roblox character includes a **Humanoid** object. This is where health, movement, and death events live.

Today you learn:
- How to detect Humanoid
- How to change health
- How to react when health reaches zero`,
      },
      {
        title: 'Inspect Humanoid in Play Mode',
        content: `Start Play test and inspect your character model:
- Humanoid
- HumanoidRootPart
- Body parts

Watch values:
- \`Humanoid.Health\`
- \`Humanoid.MaxHealth\``,
      },
      {
        title: 'Damage Zone Script',
        content: `Create a danger zone part:

\`\`\`lua
local zone = script.Parent

zone.Touched:Connect(function(hit)
  local character = hit.Parent
  if not character then return end

  local humanoid = character:FindFirstChildOfClass("Humanoid")
  if humanoid then
    humanoid:TakeDamage(15)
  end
end)
\`\`\`

\`TakeDamage\` is preferred over direct subtraction for clearer intent.`,
      },
      {
        title: 'Death Event Basics',
        content: `Listen for death:

\`\`\`lua
humanoid.Died:Connect(function()
  print("Player defeated")
end)
\`\`\`

You will use this later for kill feed, respawn UI, and round logic.`,
      },
    ],
    practice: {
      title: 'Practice Build: Health Test Arena',
      description:
        'Create a small room with two damage zones that reduce player health by different amounts and verify death triggers correctly.',
      hints: [
        'Use low damage values first so you can test multiple touches in one life.',
        'Check Output logs when death event does not trigger as expected.',
      ],
      optionalChallenge:
        'Add a healing pad that restores 10 health on touch but cannot exceed MaxHealth.',
    },
  },
  {
    blk: 5,
    les: 2,
    title: '5.2 — Weapons — First Sword',
    objectives: [
      'Create a functional Tool-based sword weapon',
      'Understand Tool handle, equip, and activation flow',
      'Trigger attack logic from user input safely',
      'Prepare weapon architecture for PvP combat',
    ],
    sections: [
      {
        title: 'Tool System Overview',
        content: `Roblox weapons are usually **Tool** instances.

A basic sword needs:
- Tool object
- Handle part
- Activation script
- Damage target detection`,
      },
      {
        title: 'Build Sword Tool',
        content: `In **StarterPack**:
1. Insert \`Tool\` -> name \`TrainingSword\`
2. Insert \`Part\` inside tool -> name \`Handle\`
3. Shape and color the handle/blade
4. Ensure Handle is unanchored and lightweight`,
      },
      {
        title: 'Activation Script Example',
        content: `Script inside Tool:

\`\`\`lua
local tool = script.Parent

tool.Activated:Connect(function()
  print("Sword swing!")
end)
\`\`\`

This confirms input works before adding hit damage.`,
      },
      {
        title: 'Combat Safety Basics',
        content: `Do not apply damage client-side only.

For now:
- Detect swing on Tool
- Use server-side hit checks
- Add cooldown later to stop spam

Reliable combat starts with trusted server logic.`,
      },
    ],
    practice: {
      title: 'Practice Build: Equip and Swing',
      description:
        'Create a sword Tool that can be equipped from StarterPack and prints swing actions when activated.',
      hints: [
        'If the tool does not equip, confirm there is a part named exactly `Handle`.',
        'Use simple print debugging before adding full hit detection.',
      ],
      optionalChallenge:
        'Add a short equip sound and a different swing sound to improve weapon feel.',
    },
  },
  {
    blk: 5,
    les: 3,
    title: '5.3 — Damage System',
    objectives: [
      'Apply sword damage to valid enemy Humanoids',
      'Prevent repeated instant hits with cooldown debounce',
      'Ignore self-hits and friendly collisions',
      'Build fair combat logic for arena gameplay',
    ],
    sections: [
      {
        title: 'From Swing Animation to Real Damage',
        content: `Now your sword needs real impact logic.

System goals:
- Damage only on valid hits
- No infinite rapid hit exploit
- Clear and predictable duel outcomes`,
      },
      {
        title: 'Handle Touched Damage Pattern',
        content: `Inside sword script:

\`\`\`lua
local tool = script.Parent
local handle = tool:WaitForChild("Handle")
local canDamage = true

handle.Touched:Connect(function(hit)
  if not canDamage then return end

  local character = hit.Parent
  local humanoid = character and character:FindFirstChildOfClass("Humanoid")
  if humanoid then
    canDamage = false
    humanoid:TakeDamage(20)
    task.wait(0.4)
    canDamage = true
  end
end)
\`\`\``,
      },
      {
        title: 'Prevent Self Damage',
        content: `Add owner checks:
- Identify tool holder character
- Ignore hits on that same character

Concept:
\`\`\`lua
if character == tool.Parent then return end
\`\`\`

This prevents the sword from damaging its own user.`,
      },
      {
        title: 'Balance and Fairness Tuning',
        content: `Balance parameters:
- Damage per hit: 15-30
- Cooldown: 0.3-0.6 sec
- Reach: handle size and hitbox design

Test duels:
- 1v1 expected time-to-defeat
- Hit registration consistency
- No accidental wall or self damage`,
      },
    ],
    practice: {
      title: 'Practice Build: Fair Sword Combat',
      description:
        'Implement a working sword damage system with cooldown and self-hit prevention, then run at least three duel tests.',
      hints: [
        'Start with visible logs showing who hit whom and how much damage was applied.',
        'If damage feels too fast, increase cooldown before lowering damage.',
      ],
      optionalChallenge:
        'Add hit spark particles at impact location for better combat feedback.',
    },
  },
  {
    blk: 5,
    les: 4,
    title: '5.4 — TweenService: Smooth Effects',
    objectives: [
      'Use TweenService for polished combat and UI effects',
      'Animate doors, hit flashes, and reward popups smoothly',
      'Choose easing styles that fit action gameplay',
      'Improve game feel without heavy asset requirements',
    ],
    sections: [
      {
        title: 'Why Tweening Improves Combat Feel',
        content: `Combat without animation feels flat. TweenService gives motion polish with little code.

Great tween use cases:
- Sword slash trails
- Hit flash on target
- Arena gate opening
- Victory panel transitions`,
      },
      {
        title: 'TweenService Basics',
        content: `Example:

\`\`\`lua
local TweenService = game:GetService("TweenService")
local part = workspace.Gate

local info = TweenInfo.new(1.2, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
local goal = { Position = part.Position + Vector3.new(0, 12, 0) }

local tween = TweenService:Create(part, info, goal)
tween:Play()
\`\`\``,
      },
      {
        title: 'Combat Effect Ideas',
        content: `Quick polish effects:
- On hit: briefly tween target transparency from 0 to 0.4 and back
- On low health: pulse UI health bar color
- On kill: fade in "KO!" label for 0.5s

Small visual responses make gameplay feel much more premium.`,
      },
      {
        title: 'Tween Performance Tips',
        content: `Avoid over-tweening everything.

Guidelines:
- Tween key moments, not every frame
- Reuse UI elements instead of creating too many instances
- Keep durations short in action games (0.1-0.8s common)`,
      },
    ],
    practice: {
      title: 'Practice Build: Arena Motion Polish',
      description:
        'Add at least two TweenService effects to your fighting prototype: one world effect (gate/part) and one UI/combat feedback effect.',
      hints: [
        'Use `Quad` or `Sine` easing first; they are easy to tune and usually look good.',
        'Test effects during actual combat to make sure they do not block visibility.',
      ],
      optionalChallenge:
        'Create a combo meter label that scales up and fades out with TweenService after each hit streak.',
    },
  },
  {
    blk: 5,
    les: 5,
    title: '5.5 — Death and Respawn',
    objectives: [
      'Handle player death events cleanly in combat mode',
      'Configure respawn flow for fast arena rounds',
      'Reset temporary combat states on respawn',
      'Prevent stuck or broken states after death',
    ],
    sections: [
      {
        title: 'Arena Lifecycle',
        content: `A combat arena needs smooth loops:
Fight -> Defeat -> Respawn -> Fight again

If this loop breaks, players leave quickly. Today you stabilize it.`,
      },
      {
        title: 'Detect Death and Trigger Logic',
        content: `Server example:

\`\`\`lua
game.Players.PlayerAdded:Connect(function(player)
  player.CharacterAdded:Connect(function(character)
    local humanoid = character:WaitForChild("Humanoid")
    humanoid.Died:Connect(function()
      print(player.Name .. " was defeated")
    end)
  end)
end)
\`\`\`

You can later award points to the attacker.`,
      },
      {
        title: 'Respawn Position and Timing',
        content: `Use SpawnLocation pads for team or free-for-all zones.

Options:
- Immediate respawn (default)
- Delayed respawn with spectator moment

For beginner arena projects, keep respawn fast (2-4 seconds perceived delay).`,
      },
      {
        title: 'Reset Temporary State',
        content: `On respawn, reset:
- Weapon cooldown flags
- Combo counters
- Temporary buffs/debuffs
- UI warnings

Treat each life as a fresh round start to avoid bug carryover.`,
      },
    ],
    practice: {
      title: 'Practice Build: Stable Respawn Loop',
      description:
        'Implement death handling and respawn so players can continuously battle without script state bugs after each defeat.',
      hints: [
        'Use `CharacterAdded` listeners for all per-life setup instead of relying on one-time setup only.',
        'Test three deaths in a row and verify all combat systems still function.',
      ],
      optionalChallenge:
        'Show a short respawn countdown UI (“Respawning in 3...2...1”) before control returns.',
    },
  },
  {
    blk: 5,
    les: 6,
    title: '5.6 — Checkpoint: Arena Ready',
    objectives: [
      'Combine health, sword, damage, tween polish, and respawn systems',
      'Run duel-focused balancing tests for fairness',
      'Package a playable arena checkpoint experience',
      'Document remaining improvements for next iteration',
    ],
    sections: [
      {
        title: 'Checkpoint Deliverable',
        content: `Ship an **Arena Ready** combat slice with:
- Working sword tool
- Reliable damage system
- Death + respawn loop
- At least one polished TweenService effect`,
      },
      {
        title: 'Final Integration Plan',
        content: `Build order:
1. Validate weapon equip and swing
2. Confirm hit damage and cooldown
3. Test death/respawn stability
4. Add feedback polish
5. Run duel balance pass`,
      },
      {
        title: 'Duel Test Scenarios',
        content: `Required tests:
- Equal-skill duel feels fair
- No instant one-touch kill unless intentionally designed
- Respawn always returns players to valid arena area
- Effects do not hide critical combat visibility`,
      },
      {
        title: 'Checkpoint Quality Bar',
        content: `A strong checkpoint build should have:
- Low bug count
- Understandable game objective
- Satisfying first 2 minutes
- Clear room to add advanced systems later (teams, rounds, abilities)`,
      },
    ],
    practice: {
      title: 'Checkpoint Submission: Arena Ready',
      description:
        'Submit a polished mini arena where two players can fight repeatedly with stable combat logic and responsive feedback.',
      hints: [
        'Keep combat values conservative for checkpoint: reliable and readable beats flashy and broken.',
        'Watch one full duel from both players’ perspective to catch visibility or fairness issues.',
      ],
      optionalChallenge:
        'Add a simple win counter in leaderstats that increases when a player defeats an opponent.',
    },
  },
  {
    blk: 6,
    les: 1,
    title: '6.1 — Car from Scratch',
    objectives: [
      'Build a drivable car base with VehicleSeat',
      'Connect parts using basic constraints and welds',
      'Tune car balance for beginner-friendly control',
      'Prepare vehicle prefab for racing module systems',
    ],
    sections: [
      {
        title: 'Racing Module Kickoff',
        content: `Welcome to Module 6. You now build your first playable race prototype.

Today’s goal:
- One simple drivable car
- Stable enough for lap testing
- Reusable as a prefab`,
      },
      {
        title: 'Build Basic Chassis',
        content: `Create model \`StarterCar\`:
- Base chassis part
- Four wheel parts
- One \`VehicleSeat\`

Keep proportions simple:
- Chassis around \`6 x 1 x 10\`
- Wheels around \`2 x 2 x 1\``,
      },
      {
        title: 'Seat and Constraint Setup',
        content: `Use WeldConstraints for rigid attachments first.

VehicleSeat essentials:
- \`MaxSpeed\`
- \`Torque\`
- \`TurnSpeed\`

Start with gentle values so new players can control the car easily.`,
      },
      {
        title: 'Test Drive and Adjust',
        content: `Playtest checklist:
- Player can sit in seat
- Car responds to throttle and steering
- Car does not flip too easily
- No disconnected wheel parts

Tune center of mass by lowering chassis or widening wheel spacing if needed.`,
      },
    ],
    practice: {
      title: 'Practice Build: Starter Car',
      description:
        'Build and test one drivable car model with VehicleSeat and stable movement suitable for a beginner racing track.',
      hints: [
        'If the vehicle behaves wildly, reduce speed and turn values before changing geometry.',
        'Anchor parts only during setup; unanchor correctly before final driving tests.',
      ],
      optionalChallenge:
        'Create two handling presets (safe and fast) by changing seat properties through a script toggle.',
    },
  },
  {
    blk: 6,
    les: 2,
    title: '6.2 — Race Track',
    objectives: [
      'Design a readable race track layout for new players',
      'Use checkpoints and barriers to define legal pathing',
      'Balance straightaways and turns for fun pacing',
      'Prepare track segments for lap detection systems',
    ],
    sections: [
      {
        title: 'Track Design Principles',
        content: `A good track is readable in one glance.

Include:
- Clear start line
- Distinct turns
- Recovery space after difficult curves
- Guard rails on dangerous edges`,
      },
      {
        title: 'Build Track Segments',
        content: `Use modular parts:
- Straight segment
- 45-degree turn
- 90-degree turn
- Ramp (optional)

Duplicate and snap segments to keep lane width consistent.`,
      },
      {
        title: 'Guidance and Safety Props',
        content: `Add:
- Direction arrows
- Colored side rails
- Checkpoint gates
- Respawn fallback points

These reduce frustration for teen players still learning controls.`,
      },
      {
        title: 'Driveability QA',
        content: `Run 5 laps yourself:
- Are corners too sharp at current car speed?
- Can players recover after minor mistakes?
- Is there any place cars get stuck?

Fix geometry before adding timers and leaderboard logic.`,
      },
    ],
    practice: {
      title: 'Practice Build: First Circuit',
      description:
        'Create a complete first racing circuit with start line, turns, barriers, and at least three visible directional aids.',
      hints: [
        'Keep lane width generous during early testing; tighten only after controls feel good.',
        'Use consistent part heights to avoid accidental bumps that launch vehicles.',
      ],
      optionalChallenge:
        'Add one optional shortcut path that is faster but harder to drive cleanly.',
    },
  },
  {
    blk: 6,
    les: 3,
    title: '6.3 — Race Timer',
    objectives: [
      'Start and stop race timers based on track events',
      'Measure lap and total run time accurately',
      'Display live race time to drivers',
      'Store personal best times during server session',
    ],
    sections: [
      {
        title: 'Timer System for Racing',
        content: `Racing without time tracking has no clear winner. Today you create:
- Race start trigger
- Running timer
- Finish stop logic
- Session best comparison`,
      },
      {
        title: 'Start/Finish Trigger Setup',
        content: `Create parts:
- \`RaceStart\`
- \`RaceFinish\`

When player car crosses start:
- Save start timestamp

When crossing finish:
- Compute elapsed = current - start`,
      },
      {
        title: 'Timer Script Core',
        content: `Server/local hybrid example:

\`\`\`lua
local startTime = os.clock()
-- later...
local elapsed = os.clock() - startTime
print(string.format("Race time: %.2f", elapsed))
\`\`\`

For HUD updates, mirror live value in LocalScript every ~0.05 sec.`,
      },
      {
        title: 'Best Time Tracking',
        content: `Keep per-player session best:
- If no best -> set current
- Else replace only when current is lower

Display:
- Current run
- Best session time

Later you can save bests with DataStore.`,
      },
    ],
    practice: {
      title: 'Practice Build: Timed Circuit',
      description:
        'Implement a full start-to-finish race timer and display both current run time and session best for the player.',
      hints: [
        'Use prints first to verify timing flow, then connect values to UI labels.',
        'Prevent finish trigger from firing before race has started.',
      ],
      optionalChallenge:
        'Add a split marker at mid-track and show split time in a temporary popup label.',
    },
  },
  {
    blk: 6,
    les: 4,
    title: '6.4 — Client-Server: First Look',
    objectives: [
      'Understand client vs server responsibility in racing games',
      'Use RemoteEvents for trusted race state communication',
      'Keep authoritative race results on server',
      'Avoid common beginner security mistakes',
    ],
    sections: [
      {
        title: 'Two Worlds in Roblox',
        content: `Client:
- Fast UI updates
- Input handling

Server:
- Trusted game rules
- Final scoring
- Anti-cheat validation

Racing games need both working together.`,
      },
      {
        title: 'RemoteEvent Intro',
        content: `Create in \`ReplicatedStorage\`:
- \`RemoteEvent\` named \`RaceEvent\`

Client can request actions, server validates and responds.`,
      },
      {
        title: 'Basic Event Flow Example',
        content: `Client:
\`\`\`lua
local event = game.ReplicatedStorage:WaitForChild("RaceEvent")
event:FireServer("StartRace")
\`\`\`

Server:
\`\`\`lua
event.OnServerEvent:Connect(function(player, action)
  if action == "StartRace" then
    print(player.Name .. " requested race start")
  end
end)
\`\`\``,
      },
      {
        title: 'Security Mindset for Teens',
        content: `Never trust client claims like:
- "I finished in 1.00 second"
- "Give me 999 wins"

Server should calculate and verify timing with its own data.

Client is for display; server is for truth.`,
      },
    ],
    practice: {
      title: 'Practice Build: Event-Driven Race Flow',
      description:
        'Create a simple RemoteEvent communication path where client requests race actions and server validates before updating game state.',
      hints: [
        'Keep event action names short and consistent (`StartRace`, `FinishRace`, etc.).',
        'Log all incoming actions on server while developing to catch incorrect calls.',
      ],
      optionalChallenge:
        'Have server send race state updates back to clients using `FireClient` for synchronized UI messages.',
    },
  },
  {
    blk: 6,
    les: 5,
    title: '6.5 — Laps and Leaderboard',
    objectives: [
      'Track completed laps per player accurately',
      'Require checkpoint order to prevent lap skipping',
      'Display lap counts in leaderboard and HUD',
      'Determine winner using lap and time rules',
    ],
    sections: [
      {
        title: 'Lap System Rules',
        content: `A fair lap system needs:
- Ordered checkpoints
- Start/finish gate validation
- Max lap target (for example 3 laps)

Without checkpoint order, players can exploit shortcuts unfairly.`,
      },
      {
        title: 'Checkpoint Sequence Logic',
        content: `Store next required checkpoint index per player.

Pseudo flow:
1. Player crosses CP1 -> next = CP2
2. Player crosses CP2 -> next = CP3
3. Player crosses CP3 -> next = Finish
4. Crossing Finish increments lap`,
      },
      {
        title: 'Leaderboard Values',
        content: `Add stats:
- \`Laps\` IntValue
- \`BestLap\` NumberValue or formatted text for UI

Update both during race so players can compare progress live.`,
      },
      {
        title: 'Winner Determination',
        content: `Race ends when player reaches target laps.

Tie-breaker options:
- Faster total time wins
- Faster final lap wins

Announce winner clearly in UI and optionally freeze timer for all racers.`,
      },
    ],
    practice: {
      title: 'Practice Build: 3-Lap Race Logic',
      description:
        'Implement ordered checkpoint lap tracking and show current lap progress in both leaderboard and on-screen UI.',
      hints: [
        'Reset checkpoint progress when a lap is completed so next lap starts clean.',
        'Test wrong-order checkpoint touches to confirm they do not advance lap state.',
      ],
      optionalChallenge:
        'Add “Final Lap!” announcement when a player starts their last lap.',
    },
  },
  {
    blk: 6,
    les: 6,
    title: '6.6 — Checkpoint: Race Launched',
    objectives: [
      'Ship a complete race prototype with car, track, timer, and laps',
      'Validate client-server flow for trusted race results',
      'Tune handling and timing for fair competition',
      'Deliver a race checkpoint ready for player demos',
    ],
    sections: [
      {
        title: 'Final Checkpoint Scope',
        content: `Your **Race Launched** build must include:
- Drivable car prefab
- Complete track
- Start/finish timer
- Lap + leaderboard system
- Basic client-server event flow`,
      },
      {
        title: 'Launch Readiness Checklist',
        content: `Before submission:
1. Car drives reliably from spawn
2. Timer starts/stops correctly
3. Laps count only in valid checkpoint order
4. Winner logic works for at least 2 players
5. UI messages are readable`,
      },
      {
        title: 'Playtest Like a Studio Team',
        content: `Run tests:
- New player onboarding run
- Competitive 2-player race
- Intentional exploit attempt (skip checkpoints)
- Stress test with repeated races

Record fixes quickly and retest after each patch.`,
      },
      {
        title: 'What Makes It Sellable Quality',
        content: `Sellable classroom quality means:
- Systems work reliably
- Learning goals are visible in gameplay
- UI is clear and motivating
- Players want "one more race"

You now have a complete racing prototype built from first principles.`,
      },
    ],
    practice: {
      title: 'Checkpoint Submission: Race Launched',
      description:
        'Submit your playable racing game prototype with complete loop from spawn to winner announcement, including validated laps and timer.',
      hints: [
        'Prioritize reliability over extra features in checkpoint builds.',
        'Use one final end-to-end recording run to verify all race systems together.',
      ],
      optionalChallenge:
        'Add a podium zone that teleports top players after race end and displays final standings.',
    },
  },
]
