/** Rich EN content for Roblox Module 05 - lessons 5.1-5.6 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson51 = {
  lessonId: 'lesson-roblox-5-1',
  moduleId: 'module-05',
  order: 1,
  title: '5.1 - Humanoid and Health',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Understand Humanoid Health and MaxHealth',
    'Apply damage with TakeDamage on the server',
    'React to death with the Died event',
    'Build damage and heal zones in a test arena',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Module 5 - Fighting Club** - combat starts with **health**, not swords yet.

**Lesson flow:**
1. **Theory (40 min)** - Humanoid, damage, death
2. **Practice (~25 min)** - health test arena
3. **Quiz (10 min)** - **70%** pass

Use **Module 4 - Tycoon Works** place or new Baseplate \`Lesson 5.1 - Health Arena\`.`,
      },
      {
        title: 'Humanoid - the character brain',
        content: `Your character model contains:

| Object | Role |
|--------|------|
| **Humanoid** | Health, jump, walk speed |
| **HumanoidRootPart** | Physics center |
| **Head, Torso, limbs** | Body parts |

**Key properties:**
- \`Health\` - current HP (100 default)
- \`MaxHealth\` - maximum HP cap
- \`WalkSpeed\` - move speed

**Exercise (3 min):** Play → expand your character in Explorer → watch Health while testing.`,
      },
      {
        title: 'TakeDamage vs Health subtraction',
        content: `**Preferred:**

\`\`\`lua
humanoid:TakeDamage(15)
\`\`\`

**Avoid for lessons:**

\`\`\`lua
humanoid.Health -= 15  -- works but hides game rules
\`\`\`

\`TakeDamage\` can respect future armor, shields, and team rules.

**Heal:**

\`\`\`lua
humanoid.Health = math.min(humanoid.Health + 10, humanoid.MaxHealth)
\`\`\``,
      },
      {
        title: 'Damage zone script',
        content: `Build red pad \`DamageZone_Lava\` - Anchored, Neon red.

**Server Script** inside pad:

\`\`\`lua
local zone = script.Parent
local DAMAGE = 15

zone.Touched:Connect(function(hit)
    local character = hit.Parent
    if not character then
        return
    end

    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then
        return
    end

    humanoid:TakeDamage(DAMAGE)
end)
\`\`\`

**Exercise (8 min):** Touch zone 3 times - Health drops 15 each time until respawn.`,
      },
      {
        title: 'Debounce damage zones',
        content: `\`Touched\` spams while standing inside zone.

\`\`\`lua
local zone = script.Parent
local DAMAGE = 10
local cooldown = {}

zone.Touched:Connect(function(hit)
    local character = hit.Parent
    if not character then return end

    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then return end

    if cooldown[humanoid] then return end
    cooldown[humanoid] = true

    humanoid:TakeDamage(DAMAGE)

    task.delay(0.5, function()
        cooldown[humanoid] = nil
    end)
end)
\`\`\`

Damage every **0.5s** while standing - fair lava feel.`,
      },
      {
        title: 'Died event',
        content: `\`\`\`lua
humanoid.Died:Connect(function()
    print("Character defeated!")
end)
\`\`\`

Put in **ServerScriptService** test script or on zone after finding player:

\`\`\`lua
local Players = game:GetService("Players")
local player = Players:GetPlayerFromCharacter(character)
if player then
    print(player.Name .. " died in arena")
end
\`\`\`

**Respawn:** Roblox auto-respawns by default - you customize later in 5.5.`,
      },
      {
        title: 'Heal zone (optional)',
        content: `Green pad \`HealZone\`:

\`\`\`lua
humanoid.Health = math.min(humanoid.Health + 10, humanoid.MaxHealth)
\`\`\`

Use same debounce pattern - heal every 0.5s max.

**Arena layout:** spawn → damage zone A (10 dmg) → damage zone B (25 dmg) → heal zone.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Damage zone uses server Script + Humanoid check
- [ ] Debounce prevents instant melt
- [ ] Died prints to Output on zero HP
- [ ] Save: \`Lesson 5.1 - Health Arena\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'LocalScript on damage zone', explanation: 'Damage may not apply consistently for all players.', correctApproach: 'Server Script for world hazards' },
    { mistake: 'No Humanoid check', explanation: 'Parts trigger errors or weird behavior.', correctApproach: 'FindFirstChildOfClass Humanoid' },
    { mistake: 'No debounce in lava', explanation: 'Instant death from one touch frame.', correctApproach: 'cooldown table per humanoid' },
    { mistake: 'Heal above MaxHealth', explanation: 'Overheal bugs.', correctApproach: 'math.min with MaxHealth' },
  ],
  summary: `You learned Humanoid Health, applied TakeDamage with debounced zones, listened for Died, and built a heal pad - the foundation of every combat game on Roblox.`,
  practiceTask: {
    title: 'Health test arena (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Two damage zones + heal zone working.

### Part A - Arena (5 min)
1. Room with spawn, walls, signs
2. \`DamageZone_A\` (10 dmg) and \`DamageZone_B\` (25 dmg)

### Part B - Scripts (12 min)
1. Server damage scripts with 0.5s debounce
2. Print on Died when Health hits 0
3. Test walk through both zones

### Part C - Heal & save (8 min)
1. Green \`HealZone\` restores 10 HP (capped)
2. **Save to Roblox** → \`Lesson 5.1 - Health Arena\`
3. **Practice complete**`,
    hints: [
      'Print humanoid.Health after each damage while testing',
      'Use TakeDamage not direct Health hack unless teaching why',
      'Stand in zone 2s to verify debounce timing',
    ],
    optionalChallenge: 'HUD health bar LocalScript reading Humanoid.Health (preview Module 5 UI).',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Humanoid controls…', options: ['Health and movement', 'Only terrain', 'DataStore', 'Skybox only'], correctAnswer: 0, explanation: 'Humanoid is character controller.' },
      { id: 'q2', type: MC, question: 'TakeDamage(15) reduces…', options: ['Health by 15', 'MaxHealth forever', 'Coins', 'Terrain'], correctAnswer: 0, explanation: 'Standard damage API.' },
      { id: 'q3', type: MC, question: 'Health at 0 causes…', options: ['Death / respawn', 'More coins', 'Faster walk', 'Save file'], correctAnswer: 0, explanation: 'Zero health = defeated.' },
      { id: 'q4', type: MC, question: 'Died event fires when…', options: ['Humanoid dies', 'Tool equipped', 'Coin collected', 'UI opens'], correctAnswer: 0, explanation: 'Death listener.' },
      { id: 'q5', type: MC, question: 'Damage zone should use…', options: ['Server Script', 'LocalScript only', 'Sound only', 'Atmosphere'], correctAnswer: 0, explanation: 'Server authority for combat.' },
      { id: 'q6', type: MC, question: 'Debounce on lava prevents…', options: ['Instant multi-hit melt', 'Jumping', 'Saving', 'Spawning'], correctAnswer: 0, explanation: 'Touched fires many times.' },
      { id: 'q7', type: MC, question: 'Heal uses math.min to…', options: ['Cap at MaxHealth', 'Delete player', 'Remove tool', 'Publish'], correctAnswer: 0, explanation: 'Prevent overheal.' },
      { id: 'q8', type: MC, question: 'FindFirstChildOfClass Humanoid finds…', options: ['Humanoid in character', 'Only Part', 'Tool', 'SpawnLocation'], correctAnswer: 0, explanation: 'Character health component.' },
      { id: 'q9', type: MC, question: 'Module 5 focus is…', options: ['Combat', 'Only tycoon', 'Only terrain', 'Publishing only'], correctAnswer: 0, explanation: 'Fighting Club module.' },
      { id: 'q10', type: MC, question: 'Lesson 5.1 save name…', options: ['Lesson 5.1 - Health Arena', 'Tycoon Works', 'Obby Ready', 'Coin Simulator'], correctAnswer: 0, explanation: 'Save arena lesson.' },
    ],
  },
}

export const enLesson52 = {
  lessonId: 'lesson-roblox-5-2',
  moduleId: 'module-05',
  order: 2,
  title: '5.2 - Weapons - First Sword',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Create a Tool sword with a Handle part in StarterPack',
    'Use Activated to detect player clicks to swing',
    'Understand equip flow from backpack to character',
    'Prepare server-side hit detection architecture',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Damage zones hurt passively. **Weapons** let the player **choose** to attack.

**Lesson flow:**
1. **Theory (40 min)** - Tool + Handle + Activated
2. **Practice (~25 min)** - TrainingSword equip and swing
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 5.1 - Health Arena** or fresh Baseplate.`,
      },
      {
        title: 'Tool system overview',
        content: `| Piece | Requirement |
|-------|-------------|
| **Tool** | Parent object in StarterPack |
| **Handle** | Part named exactly \`Handle\` |
| **Script** | Inside Tool (LocalScript common for input) |

**Flow:**
1. Tool in **StarterPack** → appears in **Backpack** on spawn
2. Player presses **1** or clicks tool → **equipped** to character
3. **Click** while equipped → \`Activated\` fires`,
      },
      {
        title: 'Build TrainingSword',
        content: `**StarterPack** → Insert **Tool** → rename \`TrainingSword\`

Inside tool:
- **Part** named \`Handle\` (required name)
- Size blade shape \`0.3, 4, 0.8\` or use MeshPart
- **CanCollide false** on handle while equipped (default tool behavior)
- Neon metal color

**Grip:** set Tool **Grip** properties if sword points wrong (rotate GripPos/GripForward).

**Exercise (5 min):** Play → equip sword → see it in character hand.`,
      },
      {
        title: 'Activated - swing detection',
        content: `**LocalScript** inside \`TrainingSword\` (client input OK for swing start):

\`\`\`lua
local tool = script.Parent

tool.Activated:Connect(function()
    print("Sword swing!")
end)
\`\`\`

**Activated** = player clicked while tool equipped (PC: left click).

**Exercise (5 min):** Swing 5 times - 5 prints in Output.`,
      },
      {
        title: 'Equip and Unequipped events',
        content: `\`\`\`lua
tool.Equipped:Connect(function()
    print("Sword equipped")
end)

tool.Unequipped:Connect(function()
    print("Sword stored")
end)
\`\`\`

Use for:
- Play equip sound
- Enable trail effect
- Stop effects on unequip`,
      },
      {
        title: 'Why damage stays on server (preview)',
        content: `**Never** trust client-only damage - exploiters could one-shot everyone.

**Lesson 5.3 pattern:**
- Client: swing animation + optional sound
- Server: verify hit, apply TakeDamage

Today: **no damage yet** - only reliable equip + Activated.`,
      },
      {
        title: 'Tool troubleshooting',
        content: `| Problem | Fix |
|---------|-----|
| Tool not in backpack | Must be in StarterPack |
| Cannot equip | Missing part named \`Handle\` |
| Activated never fires | Tool not equipped; click in 3D view |
| Sword wrong angle | Adjust Tool Grip properties |
| Script error | LocalScript vs Script - Activated works in LocalScript |

**CanBeDropped false** on Tool prevents losing sword in obby.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] TrainingSword in StarterPack with Handle
- [ ] Activated prints on click
- [ ] Equipped / Unequipped optional sounds
- [ ] Save: \`Lesson 5.2 - First Sword\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Part named Blade not Handle', explanation: 'Tool will not equip.', correctApproach: 'Exact name Handle required' },
    { mistake: 'Tool in Workspace not StarterPack', explanation: 'Players do not receive it on spawn.', correctApproach: 'StarterPack for default loadout' },
    { mistake: 'Server Script for Activated only', explanation: 'Activated often wired in LocalScript.', correctApproach: 'LocalScript inside Tool for input' },
    { mistake: 'Expect damage today', explanation: '5.2 is input only.', correctApproach: 'Print swing; damage in 5.3' },
  ],
  summary: `You built a TrainingSword Tool with Handle, detected swings with Activated, and learned equip flow - ready to add fair server damage next lesson.`,
  practiceTask: {
    title: 'Equip and swing (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Sword equips and logs every swing.

### Part A - Build tool (10 min)
1. \`TrainingSword\` in StarterPack + \`Handle\` part
2. Style blade; fix Grip if needed
3. CanBeDropped false optional

### Part B - LocalScript (10 min)
1. Activated → print swing
2. Equipped / Unequipped prints or sounds

### Part C - Test & save (5 min)
1. Play - equip - swing 10 times
2. **Save to Roblox** → \`Lesson 5.2 - First Sword\`
3. **Practice complete**`,
    hints: [
      'Handle must be direct child of Tool',
      'Click while tool is equipped, not in backpack',
      'Equip sound confirms flow before adding damage',
    ],
    optionalChallenge: 'Equip sound + swing sound different audio IDs.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Tool requires child named…', options: ['Handle', 'Blade', 'Humanoid', 'Spawn'], correctAnswer: 0, explanation: 'Roblox tool convention.' },
      { id: 'q2', type: MC, question: 'StarterPack tools appear in…', options: ['Backpack on spawn', 'Terrain', 'Lighting', 'Output'], correctAnswer: 0, explanation: 'Default loadout.' },
      { id: 'q3', type: MC, question: 'Activated fires when…', options: ['Player clicks while equipped', 'Saving game', 'Touching lava', 'ClockTime'], correctAnswer: 0, explanation: 'Attack input.' },
      { id: 'q4', type: MC, question: 'LocalScript in Tool is OK for…', options: ['Swing input detection', 'Server economy', 'DataStore', 'Plot claim'], correctAnswer: 0, explanation: 'Client input layer.' },
      { id: 'q5', type: MC, question: 'Damage in 5.2 lesson is…', options: ['Not yet - next lesson', 'Required today', 'On terrain', 'Via leaderstats'], correctAnswer: 0, explanation: '5.3 adds damage.' },
      { id: 'q6', type: MC, question: 'Equipped event fires when…', options: ['Tool moves to character', 'Player dies', 'Coin touch', 'UI close'], correctAnswer: 0, explanation: 'Equip lifecycle.' },
      { id: 'q7', type: MC, question: 'Server should apply damage because…', options: ['Anti-cheat trust', 'UI color', 'Sky', 'Sound'], correctAnswer: 0, explanation: 'Server authority.' },
      { id: 'q8', type: MC, question: 'CanBeDropped false prevents…', options: ['Dropping tool on ground', 'Equipping', 'Jumping', 'Health'], correctAnswer: 0, explanation: 'Keep weapon on player.' },
      { id: 'q9', type: MC, question: 'Grip properties adjust…', options: ['How sword sits in hand', 'MaxHealth', 'Coins', 'Terrain'], correctAnswer: 0, explanation: 'Tool orientation.' },
      { id: 'q10', type: MC, question: 'Lesson 5.2 save name…', options: ['Lesson 5.2 - First Sword', 'Health Arena', 'Damage System', 'Tycoon Works'], correctAnswer: 0, explanation: 'Save sword tool lesson.' },
    ],
  },
}

export const enLesson53 = {
  lessonId: 'lesson-roblox-5-3',
  moduleId: 'module-05',
  order: 3,
  title: '5.3 - Damage System',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Apply sword damage via Handle Touched on the server',
    'Prevent self-damage and spam hits with cooldown',
    'Identify valid enemy characters with Humanoid checks',
    'Run fair 1v1 duel tests in the arena',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Your sword **swings**. Now it **hurts**.

**Lesson flow:**
1. **Theory (40 min)** - server damage + cooldown + no self-hit
2. **Practice (~25 min)** - fair PvP duels
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 5.2 - First Sword**.`,
      },
      {
        title: 'Server damage on Handle',
        content: `**Script** (server) inside \`TrainingSword\` - Roblox runs Tool scripts on server when equipped.

\`\`\`lua
local tool = script.Parent
local handle = tool:WaitForChild("Handle")
local DAMAGE = 20
local canHit = true

handle.Touched:Connect(function(hit)
    if not canHit then
        return
    end

    local character = hit.Parent
    if not character then
        return
    end

    -- No self damage: when equipped, tool.Parent IS the character
    if character == tool.Parent then
        return
    end

    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then
        return
    end

    canHit = false
    humanoid:TakeDamage(DAMAGE)
    print("Hit for " .. DAMAGE)

    task.wait(0.45)
    canHit = true
end)
\`\`\``,
      },
      {
        title: 'Self-hit prevention explained',
        content: `When **equipped**, \`tool.Parent\` = **Character model**.

If Handle touches your own leg, \`hit.Parent\` might equal \`tool.Parent\` → **skip**.

**Also check player:**

\`\`\`lua
local attackerPlayer = game.Players:GetPlayerFromCharacter(tool.Parent)
local victimPlayer = game.Players:GetPlayerFromCharacter(character)
if attackerPlayer and victimPlayer and attackerPlayer == victimPlayer then
    return
end
\`\`\`

**NPCs later:** victimPlayer nil but humanoid exists - still damage NPC.`,
      },
      {
        title: 'Hit cooldown (debounce)',
        content: `One swing can touch **arm + torso** in same frame = double damage.

\`canHit = false\` for **0.4-0.6 seconds** after successful hit.

| Setting | Feel |
|---------|------|
| DAMAGE 15, wait 0.5 | Beginner duels |
| DAMAGE 25, wait 0.35 | Faster fights |
| DAMAGE 10, wait 0.6 | Longer duels |

**Balance:** 5 hits to defeat 100 HP → DAMAGE 20, no armor.`,
      },
      {
        title: 'Combine with Activated (optional)',
        content: `Only damage during "swing window":

\`\`\`lua
local swinging = false

tool.Activated:Connect(function()
    swinging = true
    task.delay(0.35, function()
        swinging = false
    end)
end)

-- In Touched: if not swinging then return end
\`\`\`

Prevents damage while idle bumping into friends.`,
      },
      {
        title: 'Duel test protocol',
        content: `**3 duel tests** with friend or Studio 2 players:

1. **Trade hits** - both take damage, no self-hit
2. **Spam click** - cooldown blocks machine-gun damage
3. **Winner** - Died event fires, respawn works

**Log:** attacker name, victim name, damage amount.

**Arena:** flat floor, spawn two pads, no lava interference.`,
      },
      {
        title: 'NPC test dummy (optional)',
        content: `Insert **Rig** or dummy with Humanoid in arena \`Dummy_Target\`.

Stand still - swing - Health drops - good for solo testing.

**Anchor** dummy root; Humanoid still receives damage.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Server damage on Handle with Humanoid check
- [ ] Self-hit blocked
- [ ] Cooldown between hits
- [ ] 3 duels completed
- [ ] Save: \`Lesson 5.3 - Damage System\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Client-only damage LocalScript', explanation: 'Exploiters and inconsistency.', correctApproach: 'Server Script on Tool for TakeDamage' },
    { mistake: 'No self-hit check', explanation: 'Sword damages wielder.', correctApproach: 'character == tool.Parent return' },
    { mistake: 'No cooldown', explanation: 'One swing = 200 damage.', correctApproach: 'canHit flag + task.wait' },
    { mistake: 'Damage when tool in Backpack', explanation: 'Handle should not hit while unequipped.', correctApproach: 'Only equipped tool active' },
  ],
  summary: `You added server TakeDamage on sword Handle with self-hit prevention and hit cooldown, and ran duel tests - your arena now has real PvP combat.`,
  practiceTask: {
    title: 'Fair sword combat (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Reliable duels with fair damage.

### Part A - Server damage (12 min)
1. Script on TrainingSword - DAMAGE 20, cooldown 0.45s
2. Self-hit prevention
3. Solo test on dummy OR friend

### Part B - Duels (10 min)
1. Three 1v1 rounds - log hits
2. Tune DAMAGE if fights too long/short

### Part C - Save (3 min)
1. Optional swing window with Activated
2. **Save to Roblox** → \`Lesson 5.3 - Damage System\`
3. **Practice complete**`,
    hints: [
      'Print victim name on each successful hit',
      'If no damage, confirm Script is server-side and tool equipped',
      'Lower DAMAGE to 15 for longer practice duels',
    ],
    optionalChallenge: 'Hit sound on server when TakeDamage succeeds.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Sword damage should run on…', options: ['Server', 'Client only', 'Terrain', 'StarterGui'], correctAnswer: 0, explanation: 'Trusted combat.' },
      { id: 'q2', type: MC, question: 'character == tool.Parent prevents…', options: ['Self damage', 'Jumping', 'Saving', 'Coins'], correctAnswer: 0, explanation: 'Same character hit.' },
      { id: 'q3', type: MC, question: 'canHit false blocks…', options: ['Damage spam between hits', 'Equipping', 'Respawn', 'Tab menu'], correctAnswer: 0, explanation: 'Hit cooldown.' },
      { id: 'q4', type: MC, question: 'TakeDamage(20) on 100 HP needs…', options: ['5 hits without heal', '1 hit', '100 hits', '0 hits'], correctAnswer: 0, explanation: 'Simple TTK math.' },
      { id: 'q5', type: MC, question: 'Handle Touched detects…', options: ['What part the blade touches', 'ClockTime', 'DataStore', 'Atmosphere'], correctAnswer: 0, explanation: 'Collision hit detection.' },
      { id: 'q6', type: MC, question: 'Humanoid check ignores…', options: ['Walls and non-characters', 'Players', 'NPCs', 'Health'], correctAnswer: 0, explanation: 'Only characters have Humanoid.' },
      { id: 'q7', type: MC, question: 'Swing window with Activated…', options: ['Limits damage to active swings', 'Deletes tool', 'Adds coins', 'Claims plot'], correctAnswer: 0, explanation: 'Optional fairness layer.' },
      { id: 'q8', type: MC, question: 'Duel testing needs…', options: ['Humanoid targets', 'Only terrain', 'No Output', 'Publish first'], correctAnswer: 0, explanation: 'Characters to damage.' },
      { id: 'q9', type: MC, question: 'Lesson 5.2 added…', options: ['Tool equip and Activated', 'DataStore', 'Tycoon plots', 'Terrain'], correctAnswer: 0, explanation: 'Prerequisite sword setup.' },
      { id: 'q10', type: MC, question: 'Lesson 5.3 save name…', options: ['Lesson 5.3 - Damage System', 'First Sword', 'Health Arena', 'Upgrade Tables'], correctAnswer: 0, explanation: 'Save combat lesson.' },
    ],
  },
}

export const enLesson54 = {
  lessonId: 'lesson-roblox-5-4',
  moduleId: 'module-05',
  order: 4,
  title: '5.4 - TweenService: Smooth Effects',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Create tweens with TweenInfo for timing and easing',
    'Animate arena gates and hit flash feedback',
    'Use short durations for action-game polish',
    'Improve combat feel without heavy assets',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Numbers changing instantly feel like a spreadsheet. **TweenService** adds **motion** - games feel premium.

**Lesson flow:**
1. **Theory (40 min)** - TweenInfo, easing, combat polish
2. **Practice (~25 min)** - gate + hit flash
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 5.3 - Damage System** arena.`,
      },
      {
        title: 'What TweenService does',
        content: `**Tween** = smooth change from **current** property → **goal** value over time.

\`\`\`lua
local TweenService = game:GetService("TweenService")
local part = workspace.Arena.Gate

local info = TweenInfo.new(
    1.2,                              -- duration (seconds)
    Enum.EasingStyle.Quad,            -- curve shape
    Enum.EasingDirection.Out          -- slow at end
)

local goal = { Position = part.Position + Vector3.new(0, 10, 0) }
local tween = TweenService:Create(part, info, goal)
tween:Play()
\`\`\`

**Can tween:** Position, Size, Transparency, Color, CFrame, and more.`,
      },
      {
        title: 'TweenInfo - pick the feel',
        content: `| EasingStyle | Feel |
|-------------|------|
| **Linear** | Robotic, constant speed |
| **Quad** | Smooth general purpose |
| **Sine** | Soft start/stop |
| **Back** | Slight overshoot (bouncy doors) |

| Direction | Feel |
|-----------|------|
| **Out** | Fast start, gentle landing |
| **In** | Slow start, fast end |
| **InOut** | Smooth both ends |

**Action games:** durations **0.15 - 0.8** seconds for feedback.`,
      },
      {
        title: 'Arena gate opens',
        content: `Build \`ArenaGate\` - vertical slab blocking entrance.

\`\`\`lua
local gate = workspace.Arena.Gate
local closedPos = gate.Position
local openPos = closedPos + Vector3.new(0, 12, 0)

local function openGate()
    local tween = TweenService:Create(gate, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
        Position = openPos,
    })
    tween:Play()
end

local function closeGate()
    local tween = TweenService:Create(gate, TweenInfo.new(0.8, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {
        Position = closedPos,
    })
    tween:Play()
end
\`\`\`

**Touch pad** at arena start calls \`openGate()\` once.`,
      },
      {
        title: 'Hit flash on damage',
        content: `When sword hits, flash victim **torso** briefly:

\`\`\`lua
local function flashHit(character)
    local torso = character:FindFirstChild("UpperTorso") or character:FindFirstChild("Torso")
    if not torso then return end

    local original = torso.Transparency
    local flashIn = TweenService:Create(torso, TweenInfo.new(0.08), { Transparency = 0.5 })
    local flashOut = TweenService:Create(torso, TweenInfo.new(0.12), { Transparency = original })

    flashIn:Play()
    flashIn.Completed:Wait()
    flashOut:Play()
end
\`\`\`

Call \`flashHit(character)\` in sword script after \`TakeDamage\`.`,
      },
      {
        title: 'UI scale punch (optional)',
        content: `**TextLabel** \`HitLabel\` in ScreenGui - shows \`HIT!\` on damage.

\`\`\`lua
label.Text = "HIT!"
label.TextTransparency = 0
label.Size = UDim2.fromScale(0.2, 0.1)

local punch = TweenService:Create(label, TweenInfo.new(0.2, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {
    Size = UDim2.fromScale(0.28, 0.14),
})

local fade = TweenService:Create(label, TweenInfo.new(0.3), { TextTransparency = 1 })

punch:Play()
punch.Completed:Wait()
fade:Play()
\`\`\`

LocalScript can listen to RemoteEvent later - for lesson, server print is enough.`,
      },
      {
        title: 'Performance and rules',
        content: `**Do:**
- Short tweens on key moments
- Reuse same parts/labels

**Avoid:**
- 50 simultaneous tweens
- Tweening every coin forever
- 3+ second combat feedback (blocks vision)

**Cancel tween:** \`tween:Cancel()\` if player dies mid-animation.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Gate open/close tweens work
- [ ] Hit flash on successful damage
- [ ] Durations under 1 second for combat FX
- [ ] Save: \`Lesson 5.4 - Tween Polish\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Tweening anchored gate with physics', explanation: 'Fights physics engine.', correctApproach: 'Anchored true on gates' },
    { mistake: 'Forgot to store closedPos', explanation: 'Gate cannot return.', correctApproach: 'Save position before first open' },
    { mistake: 'Flash never resets Transparency', explanation: 'Character stays ghost.', correctApproach: 'Tween back to original value' },
    { mistake: '10 second hit tween', explanation: 'Blocks duel readability.', correctApproach: '0.1-0.2s flash total' },
  ],
  summary: `You used TweenService with TweenInfo and easing to open arena gates and flash hits on damage - combat now feels responsive and polished, not instant and dry.`,
  practiceTask: {
    title: 'Arena motion polish (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Two tween effects in your arena.

### Part A - Gate (10 min)
1. \`ArenaGate\` + openGate / closeGate functions
2. Trigger open when entering arena

### Part B - Hit flash (12 min)
1. \`flashHit(character)\` after TakeDamage in sword script
2. Test in duel - white flash on each hit

### Part C - Save (3 min)
1. Optional HIT label scale tween
2. **Save to Roblox** → \`Lesson 5.4 - Tween Polish\`
3. **Practice complete**`,
    hints: [
      'Start with Quad Out - easiest to tune',
      'Print tween.Completed once to debug stuck gate',
      'Flash UpperTorso for R15, Torso for R6',
    ],
    optionalChallenge: 'Combo label scales up after 3 hits in 5 seconds.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'TweenService animates properties…', options: ['Smoothly over time', 'Instantly only', 'Never', 'Only sound'], correctAnswer: 0, explanation: 'Interpolation between values.' },
      { id: 'q2', type: MC, question: 'TweenInfo.new first number is…', options: ['Duration in seconds', 'Damage amount', 'Player ID', 'Coin value'], correctAnswer: 0, explanation: 'How long tween runs.' },
      { id: 'q3', type: MC, question: 'EasingDirection.Out means…', options: ['Slow at the end', 'Never stops', 'Deletes part', 'Adds coins'], correctAnswer: 0, explanation: 'Deceleration at finish.' },
      { id: 'q4', type: MC, question: 'Hit flash should be…', options: ['Very short (~0.2s total)', '10 seconds', 'Permanent', 'Only in Edit'], correctAnswer: 0, explanation: 'Quick combat feedback.' },
      { id: 'q5', type: MC, question: 'Create(part, info, goal) needs…', options: ['Instance to tween + goal table', 'Only print', 'Terrain', 'DataStore'], correctAnswer: 0, explanation: 'Standard tween pattern.' },
      { id: 'q6', type: MC, question: 'Quad EasingStyle is…', options: ['Smooth general purpose', 'Only for UI', 'Broken', 'Lava only'], correctAnswer: 0, explanation: 'Good default easing.' },
      { id: 'q7', type: MC, question: 'Store closedPos so gate can…', options: ['Close again', 'Never move', 'Delete player', 'Remove sword'], correctAnswer: 0, explanation: 'Return to start position.' },
      { id: 'q8', type: MC, question: 'Too many tweens cause…', options: ['Lag and clutter', 'Free Robux', 'Auto save', 'More health'], correctAnswer: 0, explanation: 'Use tweens sparingly.' },
      { id: 'q9', type: MC, question: 'flashHit goes after…', options: ['Successful TakeDamage', 'Player joins', 'Terrain paint', 'Publish'], correctAnswer: 0, explanation: 'Feedback on hit moment.' },
      { id: 'q10', type: MC, question: 'Lesson 5.4 save name…', options: ['Lesson 5.4 - Tween Polish', 'Damage System', 'First Sword', 'Arena Ready'], correctAnswer: 0, explanation: 'Save tween lesson.' },
    ],
  },
}

export const enLesson55 = {
  lessonId: 'lesson-roblox-5-5',
  moduleId: 'module-05',
  order: 5,
  title: '5.5 - Death and Respawn',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Handle Humanoid.Died on the server for each life',
    'Configure SpawnLocation respawn in the arena',
    'Reset combat state on CharacterAdded',
    'Build a stable fight-defeat-respawn loop',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Winning a duel means someone **dies** and **comes back**. If that loop breaks, arena dies.

**Lesson flow:**
1. **Theory (40 min)** - Died, respawn, state reset
2. **Practice (~25 min)** - stable 3-death test
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 5.4 - Tween Polish** arena.`,
      },
      {
        title: 'Arena lifecycle',
        content: `**Fight** → **Defeat** (Health = 0) → **Respawn** → **Fight again**

| Broken loop | Good loop |
|-------------|-----------|
| Stuck on death screen | Back in arena in 2-4 sec |
| Sword stops working | Tool + damage reset each life |
| Spawn in lava | Spawn on ArenaSpawn pad |`,
      },
      {
        title: 'Died event on server',
        content: `\`\`\`lua
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")

        humanoid.Died:Connect(function()
            print(player.Name .. " was defeated in the arena")
            -- Later: +1 Wins to leaderstats for killer
        end)
    end)
end)
\`\`\`

**CharacterAdded** runs **every respawn** - connect Died **inside** it each new life.`,
      },
      {
        title: 'Arena SpawnLocation',
        content: `**ArenaSpawn** - SpawnLocation on duel floor:
- Size \`8, 1, 8\`
- Neutral **true**
- Bright color, Anchored
- **Not** inside damage lava

**RespawnLocation** from checkpoints does not apply here unless you set it - default Roblox respawn uses SpawnLocations in Workspace.

**Multiple spawns:** \`Spawn_Red\`, \`Spawn_Blue\` for team duels later.`,
      },
      {
        title: 'Reset combat state per life',
        content: `Sword \`canHit\` flag may stay false if player died mid-cooldown.

**Pattern:** store cooldown on character or reset in CharacterAdded:

\`\`\`lua
-- In sword script, use humanoid as key:
local canHitByHumanoid = {}

-- On successful hit setup:
canHitByHumanoid[humanoid] = false
task.delay(0.45, function()
    if humanoid.Parent then
        canHitByHumanoid[humanoid] = nil
    end
end)
\`\`\`

Or simpler: **new character = new humanoid** - reconnect Touched each CharacterAdded if needed.`,
      },
      {
        title: 'Respawn timing options',
        content: `**Default:** instant respawn - fine for training arena.

**Delayed (optional):**

\`\`\`lua
player.RespawnTime = 3
\`\`\`

Or disable auto respawn and call \`player:LoadCharacter()\` after countdown UI.

**For lesson:** keep fast respawn; optional 3s \`RespawnTime\` for drama.`,
      },
      {
        title: 'Three-death stress test',
        content: `**Mandatory test:**
1. Duel until death - respawn on ArenaSpawn
2. Equip sword - damage still works
3. Die again - repeat
4. Die third time - still no Output errors

**Log:** death count, respawn position OK, sword hits after each respawn.

**Kill feed preview:** print \`"[Victim] was defeated"\``,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Died connected inside CharacterAdded
- [ ] ArenaSpawn works every respawn
- [ ] 3 deaths - sword still damages
- [ ] Save: \`Lesson 5.5 - Death Respawn\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Died connected only once on join', explanation: 'Misses respawn lives.', correctApproach: 'Died inside each CharacterAdded' },
    { mistake: 'Spawn inside damage zone', explanation: 'Death loop on respawn.', correctApproach: 'ArenaSpawn on safe floor' },
    { mistake: 'canHit stuck false after death', explanation: 'No damage after respawn.', correctApproach: 'Reset per humanoid or new character' },
    { mistake: 'CharacterAdded not used', explanation: 'One-life setup only.', correctApproach: 'Per-life listeners for combat' },
  ],
  summary: `You wired Humanoid.Died on the server, set arena SpawnLocation, reset combat state each life, and passed the three-death stress test - the arena loop is stable for repeated duels.`,
  practiceTask: {
    title: 'Stable respawn loop (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Fight → die → respawn → fight works 3 times.

### Part A - Death handler (8 min)
1. Server script - Died inside CharacterAdded
2. Print player name on defeat

### Part B - Spawn (7 min)
1. \`ArenaSpawn\` SpawnLocation - test respawn position
2. Optional RespawnTime = 3

### Part C - Stress test (10 min)
1. Three deaths in a row - sword works each life
2. Fix any stuck cooldown
3. **Save to Roblox** → \`Lesson 5.5 - Death Respawn\`
4. **Practice complete**`,
    hints: [
      'If spawn wrong, move ArenaSpawn and test again',
      'New character = new Humanoid - reconnect if scripts parent to old char',
      'Read Output on third death for red errors',
    ],
    optionalChallenge: 'Respawn countdown UI 3-2-1 on ScreenGui.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Died fires when…', options: ['Humanoid health reaches 0', 'Tool equipped', 'Coin touch', 'Gate opens'], correctAnswer: 0, explanation: 'Death event.' },
      { id: 'q2', type: MC, question: 'CharacterAdded runs…', options: ['Each new life/respawn', 'Once ever', 'Only in Edit', 'On save'], correctAnswer: 0, explanation: 'Every character spawn.' },
      { id: 'q3', type: MC, question: 'Connect Died inside CharacterAdded because…', options: ['Each life needs new listener', 'UI only', 'Terrain', 'Atmosphere'], correctAnswer: 0, explanation: 'New humanoid each respawn.' },
      { id: 'q4', type: MC, question: 'ArenaSpawn should be…', options: ['On safe arena floor', 'In lava', 'Outside Workspace', 'In StarterGui'], correctAnswer: 0, explanation: 'Fair respawn point.' },
      { id: 'q5', type: MC, question: 'RespawnTime = 3 adds…', options: ['Delay before respawn', 'More damage', 'Coins', 'Terrain'], correctAnswer: 0, explanation: 'Seconds to respawn.' },
      { id: 'q6', type: MC, question: 'After respawn, sword must…', options: ['Still deal damage', 'Never equip', 'Delete DataStore', 'Remove plots'], correctAnswer: 0, explanation: 'State reset test.' },
      { id: 'q7', type: MC, question: 'Three-death test checks…', options: ['Stability over multiple lives', 'Only one life', 'Publishing', 'Sky only'], correctAnswer: 0, explanation: 'Stress test loop.' },
      { id: 'q8', type: MC, question: 'Broken canHit after death causes…', options: ['No damage after respawn', 'More health', 'Faster gate', 'Auto win'], correctAnswer: 0, explanation: 'Cooldown state bug.' },
      { id: 'q9', type: MC, question: 'Death handler belongs on…', options: ['Server', 'Client only HUD', 'Terrain brush', 'Sound'], correctAnswer: 0, explanation: 'Authoritative game events.' },
      { id: 'q10', type: MC, question: 'Lesson 5.5 save name…', options: ['Lesson 5.5 - Death Respawn', 'Tween Polish', 'First Sword', 'Tycoon Works'], correctAnswer: 0, explanation: 'Save respawn lesson.' },
    ],
  },
}

export const enLesson56 = {
  lessonId: 'lesson-roblox-5-6',
  moduleId: 'module-05',
  order: 6,
  title: '5.6 - Checkpoint: Arena Ready',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Ship Arena Ready with sword, damage, tweens, and respawn',
    'Pass duel fairness and stability QA tests',
    'Add optional Wins leaderstat on kills',
    'Prepare for Module 6 racing systems',
  ],
  theory: {
    sections: [
      {
        title: 'Module 5 checkpoint (about 40 minutes)',
        content: `**Arena Ready** = mini PvP arena you can demo in 2 minutes.

**Required systems:**
- Health + damage zones (5.1)
- TrainingSword + damage (5.2-5.3)
- Tween gate or hit flash (5.4)
- Death + respawn loop (5.5)`,
      },
      {
        title: 'Integration build order',
        content: `1. Spawn + arena layout
2. Sword equip + server damage + cooldown
3. Self-hit block
4. Died + ArenaSpawn
5. Tween polish
6. Balance pass (DAMAGE 15-25, cooldown 0.4-0.5)`,
      },
      {
        title: 'Duel QA matrix',
        content: `| # | Test |
|---|------|
| 1 | 1v1 - both take damage fairly |
| 2 | No self-sword damage |
| 3 | Cooldown blocks spam kills |
| 4 | Death → respawn on ArenaSpawn |
| 5 | After respawn, combat works |
| 6 | Hit flash visible, not blocking view |
| 7 | No red Output during 2-min duel |`,
      },
      {
        title: 'Balance targets',
        content: `**Time to kill:** ~8-15 seconds for equal skill (100 HP, 20 damage, 0.45 cd)

**First 2 minutes** new player:
- See arena sign
- Get sword from backpack
- Land hits with feedback
- Understand respawn

Tune DAMAGE down if fights feel too fast.`,
      },
      {
        title: 'Optional Wins stat',
        content: `\`\`\`lua
-- In leaderstats setup:
local wins = Instance.new("IntValue")
wins.Name = "Wins"
wins.Value = 0
wins.Parent = leaderstats

-- On Died (track last attacker later); simple version:
-- increment winner when implementing kill credit
\`\`\`

For checkpoint: **Wins** column in Tab is impressive in demo.`,
      },
      {
        title: 'Presentation',
        content: `- Arena name sign: **SmartCode Arena**
- Team-colored spawns optional
- No lava in duel floor unless intentional hazard
- Pickup sound + hit flash

**Save:** \`Module 5 - Arena Ready\``,
      },
      {
        title: 'Module 6 preview',
        content: `**Faster, Higher, Further** - build cars, race tracks, lap timers, client-server basics.

Combat skills (server authority, tweens, loops) transfer to **racing game feel** and **finish lines**.`,
      },
      {
        title: 'Demo script (2 min)',
        content: `1. Spawn - show sword
2. Open gate tween into arena
3. Trade hits - flash feedback
4. Win duel - Died message
5. Loser respawns - fight again
6. Show Tab **Wins** if added`,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Skipped respawn stress test', explanation: 'Breaks on second life in publish.', correctApproach: 'Three deaths minimum' },
    { mistake: 'One-shot 100 damage', explanation: 'Duels not fun.', correctApproach: 'Balance DAMAGE and cooldown' },
    { mistake: 'No combat feedback', explanation: 'Feels bland.', correctApproach: 'Tween flash or sound on hit' },
    { mistake: 'Client-only damage in final build', explanation: 'Exploits on publish.', correctApproach: 'Server TakeDamage' },
  ],
  summary: `You integrated the full combat stack into Arena Ready, passed duel QA, tuned time-to-kill, and saved a demo-ready PvP slice - Module 6 racing begins next.`,
  practiceTask: {
    title: 'Ship Arena Ready (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Pass QA matrix + demo-ready save.

### Part A - Full audit (15 min)
1. Run integration order checklist
2. Fix any missing system from 5.1-5.5

### Part B - QA duels (15 min)
1. Complete tests 1-7 with friend or 2 Studio players
2. Tune DAMAGE for 8-15s TTK

### Part C - Save & demo (10 min)
1. Optional Wins in leaderstats
2. **Save to Roblox** → \`Module 5 - Arena Ready\`
3. **Practice complete** + 2-min recording`,
    hints: [
      'Balance before adding Wins stat',
      'Watch duel from both cameras for visibility',
      'Conservative damage > flashy broken combat',
    ],
    optionalChallenge: 'Kill credit - last hitter gets +1 Wins on victim Died.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Arena Ready includes…', options: ['Sword + damage + respawn + polish', 'Only terrain', 'Only coins', 'No scripts'], correctAnswer: 0, explanation: 'Full Module 5 stack.' },
      { id: 'q2', type: MC, question: 'Test 4 verifies…', options: ['Respawn at arena spawn', 'DataStore', 'Tycoon plot', 'Terrain gen'], correctAnswer: 0, explanation: 'Death loop.' },
      { id: 'q3', type: MC, question: 'Good TTK is about…', options: ['8-15 seconds', '0.1 seconds', '5 minutes', 'No combat'], correctAnswer: 0, explanation: 'Readable duel length.' },
      { id: 'q4', type: MC, question: 'Server damage prevents…', options: ['Client exploits', 'Jumping', 'UI', 'Sound'], correctAnswer: 0, explanation: 'Trusted combat.' },
      { id: 'q5', type: MC, question: 'Tween hit flash should not…', options: ['Block vision for seconds', 'Exist', 'Use TweenService', 'Help feedback'], correctAnswer: 0, explanation: 'Short FX only.' },
      { id: 'q6', type: MC, question: 'Wins leaderstat shows…', options: ['Kill count in Tab', 'Health only', 'Terrain', 'ClockTime'], correctAnswer: 0, explanation: 'Optional arena stat.' },
      { id: 'q7', type: MC, question: 'Module 6 theme is…', options: ['Racing / vehicles', 'Only obby', 'Only shop', 'Empty'], correctAnswer: 0, explanation: 'Faster Higher Further.' },
      { id: 'q8', type: MC, question: 'Red Output during duel means…', options: ['Fix before shipping', 'Perfect', 'Add lava', 'Publish now'], correctAnswer: 0, explanation: 'Errors = bugs.' },
      { id: 'q9', type: MC, question: 'Three-death test belongs to…', options: ['Lesson 5.5 respawn stability', 'Coin placement', 'Terrain only', 'Publishing'], correctAnswer: 0, explanation: 'Respawn stress test.' },
      { id: 'q10', type: MC, question: 'Module 5 save name…', options: ['Module 5 - Arena Ready', 'Lesson 5.1', 'Tycoon Works', 'Untitled'], correctAnswer: 0, explanation: 'Checkpoint portfolio name.' },
    ],
  },
}
