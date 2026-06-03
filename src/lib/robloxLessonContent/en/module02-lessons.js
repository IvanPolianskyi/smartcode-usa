/** Rich EN content for Roblox Module 02 - lessons 2.1-2.6 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson21 = {
  lessonId: 'lesson-roblox-2-1',
  moduleId: 'module-02',
  order: 1,
  title: '2.1 - Kill Blocks',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Build neon hazard Parts that reset the player on touch',
    'Use Touched with Humanoid checks safely',
    'Tell safe platforms apart from kill blocks visually',
    'Debug kill scripts in Play mode and Output',
    'Start with a simple touch + print script before the full kill-block logic',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Module 2 - Danger Zone** starts here. You turn your **Living Island Hub** into the beginning of an **obby** (obstacle course).

**Lesson flow:**
1. **Theory (40 min)** - kill blocks with \`Touched\`
2. **Practice (~25 min)** - lava lane with 4+ hazards
3. **Quiz (10 min)** - **70%** to pass

Open **Module 1 - Living Island** (or duplicate it as \`Lesson 2.1 - Obby Start\`). You will add a jump path beside your dock.`,
      },
      {
        title: 'What is a kill block?',
        content: `A **kill block** (lava, spikes, acid) **touches** the player → **Humanoid.Health = 0** → respawn.

| Safe platform | Kill block |
|---------------|------------|
| Normal color, clear path | **Neon** + **Really red** (or orange) |
| Player walks safely | Touch = instant fail |

**Fair design rules:**
- Hazards look dangerous - never identical to safe floors
- Jump distances a beginner can make
- No invisible thin kill strips (yet)

**Exercise (3 min):** In your place, pick where the obby path leaves the spawn - flat area before first jump.`,
      },
      {
        title: 'Build the Hazards folder',
        content: `1. **Workspace** → Insert **Folder** → \`Obby\`
2. Inside \`Obby\`, Folder \`Hazards\`
3. Also create Folder \`SafePath\` for white/grey platforms

**Each kill Part:**
- Insert **Block** → Name: \`Kill_01\`, \`Kill_02\`, …
- Size: vary (\`4, 1, 4\` or thin \`8, 1, 2\`)
- Material: **Neon** | BrickColor: **Really red**
- Anchored: **true** | CanCollide: **true**

**Exercise (10 min):** Place **4** kill blocks between safe jumps. Player must be able to see all hazards before jumping.`,
      },
      {
        title: 'Bridge from Lesson 1.4 - same ideas, new event',
        content: `In **1.4** you already knew:
- \`local\` variables
- \`script.Parent\`
- \`Connect(function ... end)\` - code on an event
- \`print\` to Output

Today only the **event name** changes:
| Lesson 1.4 | Lesson 2.1 |
|------------|------------|
| \`MouseClick\` | \`Touched\` |
| Mouse click | Body / foot touches a Part |

**New variable \`hit\`** - the Part that touched lava (usually the character's foot).

**New \`if\` checks** - do not hurt everything, only players with a **Humanoid**.

We write a **simple** script first (no death), then the full one.`,
      },
      {
        title: 'Step 1: warmup - touch and print (no death yet)',
        content: `Before kill logic, prove **Touched** works at all.

1. One kill Part → Insert **Script** inside it
2. Paste **test-only** code:

\`\`\`lua
local block = script.Parent

block.Touched:Connect(function(hit)
    print("Something touched: " .. hit.Name)
end)
\`\`\`

3. **Play (F5)** - step on the block
4. **Output** should show e.g. \`Something touched: LeftFoot\`

**What you learn:**
- \`Touched\` can fire many times while contact lasts - normal at this stage
- \`hit.Name\` - name of the touching Part
- If Output stays empty - Script not inside Part, or not in Play mode

**Exercise (5 min):** Stop Play. When warmup works, move to the full script below.`,
      },
      {
        title: 'Step 2: full kill block - Touched + Humanoid',
        content: `**Touched** fires when something collides with the Part.

Replace the warmup code with the **final** script (or add checks step by step):

\`\`\`lua
local killBlock = script.Parent

killBlock.Touched:Connect(function(hit)
    local character = hit.Parent
    if not character then
        return
    end

    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if humanoid then
        humanoid.Health = 0
    end
end)
\`\`\`

**Line by line (classic programming):**
1. \`local killBlock = script.Parent\` - variable for our object
2. \`Connect(function(hit)\` - on touch we get \`hit\`
3. \`local character = hit.Parent\` - foot → character model
4. \`if not character then return end\` - if no parent, exit (do nothing)
5. \`FindFirstChildOfClass("Humanoid")\` - find the player's health
6. \`if humanoid then\` - only if found → \`Health = 0\`

**Why not this script on day one?** Without warmup it is hard to tell **what** broke - the event, the Part, or Humanoid.`,
      },
      {
        title: 'Who gets hurt? - Humanoid only',
        content: `Without the Humanoid check, touching with a tool handle might cause weird bugs.

| Touching object | Usually has Humanoid? |
|-----------------|----------------------|
| Player character | ✅ Yes |
| Random Part falling | ❌ No |
| Another player's accessory | ❌ Usually no |

**Golden rule:** only set \`Health = 0\` when \`FindFirstChildOfClass("Humanoid")\` exists.

**Exercise (8 min):** Play-test one \`Kill_01\`. Touch lava → respawn. Check **Output** for red errors.`,
      },
      {
        title: 'Copy scripts - duplicate smart',
        content: `You do **not** need different code per block.

**Fast workflow:**
1. Perfect **one** kill block + Script
2. **Ctrl + D** duplicate the whole Part (script copies with it)
3. Rename \`Kill_02\`, move into place
4. Repeat for all hazards

If you duplicate only the Part without Script, copy-paste the Script into each kill block.

**Organize Explorer:**
\`Obby → Hazards → Kill_01 … Kill_04\`
\`Obby → SafePath → Platform_01 …\``,
      },
      {
        title: 'Debug checklist',
        content: `| Problem | Fix |
|---------|-----|
| Touch does nothing | Use **Script**, not LocalScript |
| Touch does nothing | Script must be **child of kill Part** |
| Touch does nothing | Part needs **CanCollide true** |
| You never die | Not in **Play** mode |
| Random deaths | Missing Humanoid check |

**Play-test loop:**
1. F5 Play
2. Touch each kill block once
3. Confirm respawn at SpawnLocation
4. Stop Play before moving Parts`,
      },
      {
        title: 'Polish - lava that feels fair',
        content: `**Visual extras (optional):**
- **PointLight** inside Neon block (red, Range 8)
- Slight **Transparency** \`0.1\` on lava (still readable)

**Sound:** insert **Sound** in kill Part, play on touch (short sizzle) - reuse Lesson 1.5 skills.

**Before practice checklist:**
- [ ] Folder \`Obby/Hazards\` exists
- [ ] At least one kill script tested in Play
- [ ] Safe path is a different color than lava`,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'LocalScript on kill block', explanation: 'LocalScripts run per client; server kill is standard for obbies.', correctApproach: 'Use a server Script inside each kill Part' },
    { mistake: 'Kill block not Anchored', explanation: 'Unanchored lava falls away.', correctApproach: 'Anchored true on all hazards' },
    { mistake: 'Safe and lava look identical', explanation: 'Players cannot learn the route.', correctApproach: 'Neon red lava vs matte grey/white safe platforms' },
    { mistake: 'Script under Workspace', explanation: 'script.Parent is wrong object.', correctApproach: 'Script must be direct child of the kill Part' },
  ],
  summary: `You built a hazard lane with Neon kill blocks, connected Touched to Humanoid.Health = 0, and debugged fair obby deaths - the foundation of every Roblox obstacle course.`,
  practiceTask: {
    title: 'Lava lane - obby start (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Safe jumps + obvious lava that kills on touch.

### Part A - Path layout (8 min)
1. In \`Module 1 - Living Island\`, add Folder \`Obby\`
2. Build **6** safe platforms in \`SafePath\` (Anchored, non-Neon)
3. Gap jumps between platforms - testable on foot

### Part B - Lava hazards (10 min)
1. Add **4** kill blocks in \`Hazards\` (Neon Really red)
2. Place between or beside jumps - at least one narrow lava strip
3. Script each (duplicate working Script)

### Part C - Test & save (7 min)
1. **Play** - touch every lava once; all must respawn you
2. Walk full lane without touching lava - possible route
3. **File → Save to Roblox** → \`Lesson 2.1 - Lava Lane\`
4. **Practice complete**`,
    hints: [
      'Duplicate one working kill Part instead of rewriting scripts',
      'Make safe platforms wider than lava for the first jump',
      'F5 Play - Edit mode never fires Touched for your character',
    ],
    optionalChallenge: 'Brief burn: set Health to 10, wait 0.2s with task.wait, then Health = 0.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Kill blocks usually set…', options: ['Humanoid.Health = 0', 'Part.Anchored = false', 'Sky to night', 'Terrain to water'], correctAnswer: 0, explanation: 'Zero health triggers respawn.' },
      { id: 'q2', type: MC, question: 'Touched fires when…', options: ['You save the game', 'Something collides with the Part', 'You rename Explorer', 'ClockTime changes'], correctAnswer: 1, explanation: 'Touched is a collision event.' },
      { id: 'q3', type: MC, question: 'hit.Parent is usually…', options: ['The SoundService', 'The character model', 'Lighting', 'The script'], correctAnswer: 1, explanation: 'Player body parts parent to Character.' },
      { id: 'q4', type: MC, question: 'FindFirstChildOfClass("Humanoid") prevents…', options: ['Lava from glowing', 'Killing non-characters', 'Saving the game', 'Terrain paint'], correctAnswer: 1, explanation: 'Only characters should trigger kill logic.' },
      { id: 'q5', type: MC, question: 'Kill block scripts should be…', options: ['LocalScript in StarterGui', 'Server Script in the Part', 'Inside Lighting', 'A Sound only'], correctAnswer: 1, explanation: 'Server Scripts handle world hazards.' },
      { id: 'q6', type: MC, question: 'Lava should look different using…', options: ['Neon + red color', 'Same as safe floor', 'Transparency 1', 'No Anchored'], correctAnswer: 0, explanation: 'Visual contrast keeps obbies fair.' },
      { id: 'q7', type: MC, question: 'Fastest way to add 4 lava scripts…', options: ['Duplicate one working kill Part', 'Delete Workspace', 'Remove Humanoid', 'Only use Terrain'], correctAnswer: 0, explanation: 'Duplicate keeps the Script attached.' },
      { id: 'q8', type: MC, question: 'Touched is tested in…', options: ['Play mode', 'Only Publish window', 'Asset Manager', 'Team Create only'], correctAnswer: 0, explanation: 'Character collision happens during Play.' },
      { id: 'q9', type: MC, question: 'Kill blocks need Anchored…', options: ['true', 'false always', 'only for players', 'only at night'], correctAnswer: 0, explanation: 'Anchored keeps hazards in place.' },
      { id: 'q10', type: MC, question: 'Lesson 2.1 save name…', options: ['Lesson 2.1 - Lava Lane', 'Module 1 - Living Island', 'Kill', 'Untitled'], correctAnswer: 0, explanation: 'Use lesson-based save names.' },
    ],
  },
}

export const enLesson22 = {
  lessonId: 'lesson-roblox-2-2',
  moduleId: 'module-02',
  order: 2,
  title: '2.2 - Checkpoints',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Place SpawnLocation checkpoints along an obby',
    'Set player.RespawnLocation when a checkpoint is touched',
    'Give clear visual feedback when a checkpoint activates',
    'Test respawn after dying on lava',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Dying on lava is fair only if players **do not restart from zero** every time.

**Checkpoints** save progress **during one play session** (until you leave the game).

**Lesson flow:**
1. **Theory (40 min)** - SpawnLocation + RespawnLocation
2. **Practice (~25 min)** - 3-stage obby with 3 checkpoints
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 2.1 - Lava Lane**.`,
      },
      {
        title: 'Why checkpoints matter',
        content: `| Without checkpoints | With checkpoints |
|---------------------|------------------|
| Die on lava → back to spawn | Die → respawn at last CP |
| Players rage-quit | Players retry and improve |

**Design rule:** place a checkpoint every **20-40 seconds** of jumping - end of each "stage."

**Exercise (2 min):** Walk your lava lane in Play. Count seconds between start and first hard jump - that's stage 1.`,
      },
      {
        title: 'SpawnLocation as checkpoint',
        content: `A **SpawnLocation** is a Part that can spawn characters **and** act as a respawn point.

Insert → **SpawnLocation** at the end of stage 1.

| Property | Value |
|----------|-------|
| **Name** | \`CP_1\` (not SpawnLocation) |
| **Anchored** | true |
| **Size** | \`6, 1, 6\` visible pad |
| **BrickColor** | New Yeller (inactive) |
| **Neutral** | true |
| **AllowTeamChangeOnTouch** | false |

Place **above** the platform - not inside lava.

**Start spawn:** keep your Module 1 \`SpawnLocation\` at the hub - rename \`Spawn_Start\`. Checkpoints are **extra** SpawnLocations.`,
      },
      {
        title: 'Script - save respawn point',
        content: `Insert **Script** inside \`CP_1\`:

\`\`\`lua
local checkpoint = script.Parent

checkpoint.Touched:Connect(function(hit)
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

    player.RespawnLocation = checkpoint
    checkpoint.BrickColor = BrickColor.new("Bright green")
end)
\`\`\`

**GetPlayerFromCharacter** links the body to the account - only then change \`RespawnLocation\`.`,
      },
      {
        title: 'Test the checkpoint loop',
        content: `**Critical test (do not skip):**
1. **Play** - run to \`CP_1\` - pad turns **green**
2. Jump into **lava** on purpose
3. You should respawn on **CP_1**, NOT at island start

If you respawn at start:
- Did you touch \`CP_1\` before dying?
- Is \`CP_1\` still a **SpawnLocation** class?
- Any red errors in Output?

**Exercise (10 min):** Pass this test before building \`CP_2\`.`,
      },
      {
        title: 'Three-stage layout',
        content: `Extend your lava lane into **3 stages:**

| Stage | Content | Checkpoint |
|-------|---------|------------|
| 1 | Easy jumps + 1 lava | \`CP_1\` |
| 2 | Longer gap + 2 lava | \`CP_2\` |
| 3 | Narrow path + finale | \`CP_3\` or \`CP_Final\` |

Duplicate \`CP_1\` Script into each checkpoint Part.

**Color progression:** Yellow (waiting) → Green (saved) - players read progress instantly.`,
      },
      {
        title: 'UX feedback - sound and glow',
        content: `Optional polish from Module 1:
- **Sound** child on checkpoint - short ping on touch
- **PointLight** - green when active

\`\`\`lua
local sound = checkpoint:FindFirstChild("CPSound")
if sound then
    sound:Play()
end
\`\`\`

Add after setting RespawnLocation.

**FAQ:** Touch fires many times - that's OK for this lesson; later you add debounce.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] I understand SpawnLocation vs normal Part
- [ ] I passed the "die after CP_1" test
- [ ] I will build CP_2 and CP_3 with copied scripts
- [ ] Save name ready: \`Lesson 2.2 - Checkpoints\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Used normal Part instead of SpawnLocation', explanation: 'RespawnLocation must be a SpawnLocation instance.', correctApproach: 'Insert → SpawnLocation, then rename to CP_1' },
    { mistake: 'Respawn still at hub after CP_2', explanation: 'Never touched CP_2 before dying.', correctApproach: 'Walk onto each checkpoint pad before testing lava death' },
    { mistake: 'Checkpoint inside kill block', explanation: 'Player dies before saving progress.', correctApproach: 'Place CP on safe platform past the hazard' },
    { mistake: 'No Humanoid check in checkpoint script', explanation: 'Random touches might fire early.', correctApproach: 'Keep the same Humanoid + GetPlayerFromCharacter pattern as kill blocks' },
  ],
  summary: `You placed SpawnLocation checkpoints, set RespawnLocation on touch, turned pads green for feedback, and proved lava deaths respawn at the last checkpoint - real obby progression.`,
  practiceTask: {
    title: 'Three-stage checkpoint obby (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** 3 stages, 3 checkpoints, lava death returns to last CP.

### Part A - Stage 1 + CP_1 (7 min)
1. End of stage 1 safe platform → **SpawnLocation** \`CP_1\`
2. Script: RespawnLocation + green color
3. Test: touch CP_1 → die on lava → respawn on CP_1

### Part B - Stage 2 + CP_2 (9 min)
1. Harder jumps + 2 lava blocks
2. **SpawnLocation** \`CP_2\` with copied script
3. Same death test from CP_2

### Part C - Stage 3 + CP_Final (9 min)
1. Short finale path to \`CP_Final\`
2. Full run: Start → CP_1 → CP_2 → CP_Final → die → respawn at CP_Final
3. **Save to Roblox** → \`Lesson 2.2 - Checkpoints\`
4. **Practice complete**`,
    hints: [
      'Yellow pad = not saved yet, Green = saved',
      'Each checkpoint needs its own SpawnLocation object',
      'Test death after EVERY new checkpoint before continuing',
    ],
    optionalChallenge: 'Add IntValue \`CheckpointNumber\` on character when CP is touched (for future UI).',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Checkpoints save progress…', options: ['During the play session', 'Forever on Roblox website', 'Only in Edit mode', 'Only for admins'], correctAnswer: 0, explanation: 'RespawnLocation lasts until the player leaves.' },
      { id: 'q2', type: MC, question: 'player.RespawnLocation should be a…', options: ['SpawnLocation', 'Sound', 'Terrain', 'LocalScript'], correctAnswer: 0, explanation: 'Respawn uses SpawnLocation instances.' },
      { id: 'q3', type: MC, question: 'GetPlayerFromCharacter gets…', options: ['The Player from a character model', 'The Part color', 'The sky', 'The script name'], correctAnswer: 0, explanation: 'Links character touch to the player object.' },
      { id: 'q4', type: MC, question: 'Green checkpoint color means…', options: ['Lava is active', 'Player saved that respawn point', 'Game is published', 'Terrain deleted'], correctAnswer: 1, explanation: 'Green signals activation in this lesson.' },
      { id: 'q5', type: MC, question: 'After touching CP_2 and dying, spawn at…', options: ['CP_2', 'Always world origin only', 'Toolbox', 'CP_1 only always'], correctAnswer: 0, explanation: 'Last touched checkpoint wins.' },
      { id: 'q6', type: MC, question: 'Checkpoints should be placed…', options: ['On safe ground after hard jumps', 'Inside lava', 'Outside Workspace', 'In ServerScriptService'], correctAnswer: 0, explanation: 'Safe pads let players register progress.' },
      { id: 'q7', type: MC, question: 'Neutral true on SpawnLocation allows…', options: ['Any player to use it', 'No spawning ever', 'Only one color', 'Deleting scripts'], correctAnswer: 0, explanation: 'Neutral spawns work for all teams.' },
      { id: 'q8', type: MC, question: 'Checkpoint scripts are…', options: ['Server Scripts in the checkpoint', 'LocalScripts in Head', 'Inside Terrain', 'Only in chat'], correctAnswer: 0, explanation: 'Server sets RespawnLocation for all players.' },
      { id: 'q9', type: MC, question: 'Ideal spacing between checkpoints…', options: ['Every 20-40 seconds of play', 'Once per game ever', 'Every 2 hours', 'Never'], correctAnswer: 0, explanation: 'Regular saves reduce frustration.' },
      { id: 'q10', type: MC, question: 'Lesson 2.2 save name…', options: ['Lesson 2.2 - Checkpoints', 'Lesson 2.1 - Lava Lane', 'Click Magic', 'Module 12'], correctAnswer: 0, explanation: 'Track obby progress with clear filenames.' },
    ],
  },
}

export const enLesson23 = {
  lessonId: 'lesson-roblox-2-3',
  moduleId: 'module-02',
  order: 3,
  title: '2.3 - Level Timer',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Build a ScreenGui timer with TextLabel',
    'Update elapsed time using os.clock in a LocalScript',
    'Stop the timer when the player touches FinishPad',
    'Format time for speed-run style feedback',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Speed-runners love timers. Your obby will show **live seconds** and freeze on the finish pad.

**Lesson flow:**
1. **Theory (40 min)** - ScreenGui + LocalScript + \`os.clock\`
2. **Practice (~25 min)** - timer on your checkpoint obby
3. **Quiz (10 min)** - **70%** pass

**New idea:** **LocalScript** = runs on **your** screen (perfect for UI). Kill/checkpoint scripts stay **server** Scripts.

Open **Lesson 2.2 - Checkpoints**.`,
      },
      {
        title: 'Client UI vs server gameplay',
        content: `| Script type | Runs where | Lesson use |
|-------------|------------|------------|
| **Script** | Server | Lava, checkpoints |
| **LocalScript** | Player's device | Timer text on screen |

The timer is **only visual for you** in solo Play - that's fine for learning. Later modules sync time with RemoteEvents.

**Exercise (2 min):** In Explorer, expand **StarterGui** - see \`StarterPlayerScripts\` area where UI lives.`,
      },
      {
        title: 'Build RunUI in StarterGui',
        content: `1. **StarterGui** → Insert **ScreenGui** → Name: \`RunUI\`
2. Inside \`RunUI\` → **TextLabel** → Name: \`TimerLabel\`

| Property | Suggested |
|----------|-----------|
| **Size** | \`{0, 240}, {0, 56}\` |
| **Position** | top center \`{0.5, -120}, {0, 16}\` (AnchorPoint 0.5, 0) |
| **BackgroundTransparency** | \`0.2\` dark bar |
| **Text** | \`Time: 0.00\` |
| **TextScaled** | true |
| **Font** | GothamBold or FredokaOne |

**ResetOnSpawn** on ScreenGui: leave default (timer may reset on death - acceptable for this lesson).`,
      },
      {
        title: 'LocalScript - live timer loop',
        content: `Insert **LocalScript** inside \`RunUI\` (sibling of TimerLabel):

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

**\`os.clock()\`** returns seconds with high precision - great for speed runs.

**\`task.wait(0.05)\`** updates ~20 times per second - smooth text without lag.

Press **Play** - timer should count up immediately.`,
      },
      {
        title: 'FinishPad - stop the timer',
        content: `In \`Obby\` folder, add **Part** \`FinishPad\`:
- Size \`8, 1, 8\` | Neon green | Anchored true
- Place after \`CP_Final\`

Extend LocalScript:

\`\`\`lua
local Players = game:GetService("Players")
local label = script.Parent:WaitForChild("TimerLabel")
local finish = workspace:WaitForChild("Obby"):WaitForChild("FinishPad")

local startTime = os.clock()
local running = true

task.spawn(function()
    while running do
        local elapsed = os.clock() - startTime
        label.Text = string.format("Time: %.2f", elapsed)
        task.wait(0.05)
    end
end)

finish.Touched:Connect(function(hit)
    if not running then
        return
    end

    local character = hit.Parent
    local humanoid = character and character:FindFirstChildOfClass("Humanoid")
    if not humanoid then
        return
    end

    if Players.LocalPlayer.Character ~= character then
        return
    end

    running = false
    local elapsed = os.clock() - startTime
    label.Text = string.format("Finished! %.2fs", elapsed)
end)
\`\`\`

**LocalPlayer** check = only **you** finish the run in Play solo.`,
      },
      {
        title: 'Improve display - minutes format',
        content: `For times over 60 seconds:

\`\`\`lua
local function formatTime(seconds)
    if seconds >= 60 then
        local m = math.floor(seconds / 60)
        local s = seconds % 60
        return string.format("%02d:%05.2f", m, s)
    end
    return string.format("%.2f", seconds)
end
\`\`\`

Use \`formatTime(elapsed)\` instead of raw seconds in \`label.Text\`.

**Exercise (5 min):** Complete the obby once - screenshot the **Finished!** time.`,
      },
      {
        title: 'Timer + checkpoints together',
        content: `**Expected behavior:**
- Timer runs from spawn
- Dying on lava → respawn at checkpoint → timer **keeps going** (OK for this lesson)
- Touch \`FinishPad\` → timer **stops**

**Speed-run tip:** after finishing, note your time and try to beat it by 10%.

**Before practice checklist:**
- [ ] \`RunUI\` is under **StarterGui**
- [ ] LocalScript is inside \`RunUI\`
- [ ] \`FinishPad\` path matches script (\`workspace.Obby.FinishPad\`)`,
      },
      {
        title: 'Debug UI issues',
        content: `| Problem | Fix |
|---------|-----|
| No timer visible | ScreenGui under StarterGui, not Workspace |
| Timer stays 0.00 | LocalScript disabled or wrong parent |
| Finish does not stop | Wrong path to FinishPad; fix WaitForChild names |
| Error on Play | Read Output - missing TimerLabel name |

**FAQ:** Timer resets on death - normal now; Module 3+ can persist best times.`,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'ScreenGui in Workspace', explanation: 'UI will not show on player screen.', correctApproach: 'Create RunUI under StarterGui' },
    { mistake: 'Server Script for timer label', explanation: 'Server cannot update your personal GUI easily.', correctApproach: 'Use LocalScript inside RunUI' },
    { mistake: 'FinishPad path typo', explanation: 'WaitForChild infinite yield or nil.', correctApproach: 'Match folder names: Obby and FinishPad exactly' },
    { mistake: 'Timer never stops', explanation: 'Finish touch not detecting local character.', correctApproach: 'Compare Players.LocalPlayer.Character to hit.Parent' },
  ],
  summary: `You built a ScreenGui timer with os.clock, updated it from a LocalScript, and froze the display on FinishPad - your checkpoint obby is now a speed-run challenge.`,
  practiceTask: {
    title: 'Beat your time (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Working timer from spawn to finish.

### Part A - UI (8 min)
1. \`RunUI\` + \`TimerLabel\` in StarterGui (styled, readable)
2. LocalScript counting up with \`os.clock\`
3. **Play** - confirm timer runs

### Part B - Finish pad (8 min)
1. \`FinishPad\` at end of obby after \`CP_Final\`
2. Add finish touch code - timer stops, shows \`Finished! XX.XXs\`
3. Test solo Play - only your character stops timer

### Part C - Three runs (9 min)
1. Run 1 - record time
2. Run 2 - try 10% faster
3. Run 3 - best attempt
4. **Save to Roblox** → \`Lesson 2.3 - Obby Timer\`
5. **Practice complete**`,
    hints: [
      'If FinishPad is not in Obby folder, change WaitForChild path in script',
      'task.wait(0.05) is enough - do not use wait() with no argument',
      'TextScaled helps timer read on mobile',
    ],
    optionalChallenge: 'Use formatTime() for mm:ss display after 60 seconds.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Timer UI belongs in…', options: ['StarterGui', 'Terrain', 'Lighting only', 'ServerStorage only'], correctAnswer: 0, explanation: 'StarterGui clones UI to players.' },
      { id: 'q2', type: MC, question: 'Timer LocalScript runs on…', options: ['The player client', 'Roblox website', 'Every server CPU only', 'Output window'], correctAnswer: 0, explanation: 'LocalScripts run per player device.' },
      { id: 'q3', type: MC, question: 'os.clock() measures…', options: ['Elapsed seconds', 'Player Robux', 'Part size', 'BrickColor index'], correctAnswer: 0, explanation: 'os.clock returns time for intervals.' },
      { id: 'q4', type: MC, question: 'string.format("%.2f", n) shows…', options: ['Two decimal places', 'Random color', 'Player name only', 'Terrain height'], correctAnswer: 0, explanation: '%.2f formats floats.' },
      { id: 'q5', type: MC, question: 'running = false stops…', options: ['The while loop updating the label', 'The entire game server', 'All checkpoints', 'Terrain generation'], correctAnswer: 0, explanation: 'Boolean flag ends the update loop.' },
      { id: 'q6', type: MC, question: 'FinishPad should detect…', options: ['LocalPlayer character touch', 'Only lava', 'Sky changes', 'Save to file'], correctAnswer: 0, explanation: 'LocalPlayer check targets you in solo Play.' },
      { id: 'q7', type: MC, question: 'task.wait(0.05) in the loop…', options: ['Updates text ~20 times per second', 'Deletes UI', 'Anchors Parts', 'Publishes game'], correctAnswer: 0, explanation: 'Short wait balances smooth and light.' },
      { id: 'q8', type: MC, question: 'Kill blocks use Script; timer uses…', options: ['LocalScript', 'Folder', 'Sound only', 'SpawnLocation'], correctAnswer: 0, explanation: 'UI timers are client-side here.' },
      { id: 'q9', type: MC, question: 'If timer missing, first check…', options: ['RunUI under StarterGui and label name', 'Delete Obby', 'Remove Humanoid', 'Change language'], correctAnswer: 0, explanation: 'Wrong GUI location is the top UI bug.' },
      { id: 'q10', type: MC, question: 'Lesson 2.3 save name…', options: ['Lesson 2.3 - Obby Timer', 'Lesson 2.2 - Checkpoints', 'Module 1 - Living Island', 'Lava Lane'], correctAnswer: 0, explanation: 'Save after adding the timer.' },
    ],
  },
}

export const enLesson24 = {
  lessonId: 'lesson-roblox-2-4',
  moduleId: 'module-02',
  order: 4,
  title: '2.4 - if/else Conditions',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Write if, elseif, and else branches in Luau',
    'Assign S / A / B ranks from finish time',
    'Test boundary values like 35.00 and 60.00 seconds',
    'Connect rank logic to your timer finish flow',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Your obby already tracks time. Today the game **decides** how good that time is - **if/elseif/else**.

**Lesson flow:**
1. **Theory (40 min)** - conditions + rank grading
2. **Practice (~25 min)** - S/A/B ranks on finish
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 2.3 - Obby Timer**. You will extend the **FinishPad** LocalScript.`,
      },
      {
        title: 'Games think in questions',
        content: `Every game asks yes/no questions:

| Question | Action |
|----------|--------|
| Did player touch finish? | Stop timer |
| Is time under 35 seconds? | **S Rank** |
| Is time under 60 seconds? | **A Rank** |
| Otherwise? | **B Rank** |

**Conditions** turn questions into code. No AI needed - just clear rules you write.`,
      },
      {
        title: 'if / elseif / else syntax',
        content: `\`\`\`lua
local elapsed = 47.3
local rank = "B Rank"

if elapsed < 35 then
    rank = "S Rank"
elseif elapsed < 60 then
    rank = "A Rank"
else
    rank = "B Rank"
end

print(rank)
\`\`\`

**Rules:**
- Only **one** branch runs - the first true condition
- Conditions use **comparison**: \`<\`, \`>\`, \`==\`, \`<=\`
- Every block ends with \`end\`
- Use \`elseif\` for extra steps between \`if\` and \`else\`

**Exercise (5 min):** In Output, test \`elapsed = 34.9\`, \`35.0\`, \`59.9\`, \`60.0\` - predict rank before running.`,
      },
      {
        title: 'Comparison operators you need',
        content: `| Operator | Meaning | Example |
|----------|---------|---------|
| \`<\` | less than | \`elapsed < 35\` |
| \`<=\` | less or equal | \`deaths <= 3\` |
| \`>\` | greater than | \`score > 10\` |
| \`==\` | equal | \`rank == "S Rank"\` |
| \`~=\` | not equal | \`team ~= "Red"\` |

**Common bug:** writing \`if elapsed = 35\` - single \`=\` **assigns**, it does not compare. Always use \`==\` for equality checks.`,
      },
      {
        title: 'Rank function - clean code',
        content: `Put grading in a **function** so finish code stays readable:

\`\`\`lua
local function getRank(elapsed)
    if elapsed < 35 then
        return "S Rank"
    elseif elapsed < 60 then
        return "A Rank"
    else
        return "B Rank"
    end
end
\`\`\`

**Call it** when FinishPad is touched:

\`\`\`lua
local rank = getRank(elapsed)
print("You earned: " .. rank)
\`\`\`

**Exercise (8 min):** Add \`getRank\` to your timer LocalScript. Print rank to Output on finish.`,
      },
      {
        title: 'Wire rank to timer label',
        content: `After \`running = false\`:

\`\`\`lua
local rank = getRank(elapsed)
label.Text = string.format("Finished! %.2fs - %s", elapsed, rank)
\`\`\`

Players instantly see **time + grade** - motivates replay for S Rank.

**Threshold tuning:** change \`35\` and \`60\` to match **your** obby length. Short obby → tighter times.`,
      },
      {
        title: 'Test every branch on purpose',
        content: `**Structured tests:**
1. **S Rank** - sprint finish under 35s (or lower your thresholds temporarily)
2. **A Rank** - normal careful run 35-59s
3. **B Rank** - walk slowly / wait on a platform past 60s

**Edge cases:**
- Exactly \`35.00\` → goes to **A** (because \`< 35\` is false, \`< 60\` is true)
- Exactly \`60.00\` → **B Rank**

Write thresholds as comments at top of script:

\`\`\`lua
local S_TIME = 35
local A_TIME = 60
\`\`\``,
      },
      {
        title: 'Optional - deaths downgrade rank',
        content: `Track deaths with a counter in the same LocalScript:

\`\`\`lua
local deaths = 0

-- In lava: you cannot detect server death easily in LocalScript yet.
-- For this lesson: manual test variable deaths = 3 before finish
\`\`\`

Challenge branch:

\`\`\`lua
if deaths >= 3 and rank == "S Rank" then
    rank = "A Rank"
elseif deaths >= 3 and rank == "A Rank" then
    rank = "B Rank"
end
\`\`\`

Full death tracking comes in later modules with server events.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] I can explain why \`elseif\` runs only when earlier tests fail
- [ ] \`getRank\` returns a string used in the timer label
- [ ] I tested at least two different finish times
- [ ] Save name ready: \`Lesson 2.4 - Finish Grades\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Used = instead of == in if', explanation: 'Single equals assigns values.', correctApproach: 'Compare with == or < > <= >=' },
    { mistake: 'elseif order wrong (60 before 35)', explanation: 'First match wins - wide condition catches everything.', correctApproach: 'Check strictest threshold first: S, then A, then else' },
    { mistake: 'Rank always B Rank', explanation: 'elapsed never calculated before getRank.', correctApproach: 'Compute elapsed = os.clock() - startTime right before grading' },
    { mistake: 'Changed thresholds but not comments', explanation: 'Future you forgets the rules.', correctApproach: 'Keep S_TIME and A_TIME constants at top of script' },
  ],
  summary: `You used if/elseif/else to grade finish times into S, A, and B ranks, tested boundary seconds, and connected rank text to your obby timer - your game now reacts with rules, not just numbers.`,
  practiceTask: {
    title: 'Finish grading - S / A / B (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Finish shows time + rank from conditions.

### Part A - getRank function (10 min)
1. Open timer LocalScript from Lesson 2.3
2. Add \`S_TIME = 35\`, \`A_TIME = 60\` and \`getRank(elapsed)\`
3. Print rank to Output on FinishPad touch

### Part B - Label display (8 min)
1. Update \`TimerLabel\` text: \`Finished! XX.XXs - S Rank\`
2. Test three runs targeting S, A, and B

### Part C - Tune & save (7 min)
1. Adjust S_TIME / A_TIME if your obby is longer/shorter
2. Document thresholds in a comment
3. **Save to Roblox** → \`Lesson 2.4 - Finish Grades\`
4. **Practice complete**`,
    hints: [
      'Test 34.99 vs 35.00 vs 59.99 vs 60.00 in Studio with temporary short obby',
      'Put getRank above the Touched connection so you can read it easily',
      'Print to Output before changing label text if bugs appear',
    ],
    optionalChallenge: 'If deaths >= 3, downgrade rank one tier (manual deaths variable for now).',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'if/elseif/else picks…', options: ['The first true branch only', 'Every branch at once', 'Random branch', 'No branch'], correctAnswer: 0, explanation: 'First match wins, then stops.' },
      { id: 'q2', type: MC, question: 'elseif elapsed < 60 runs when…', options: ['elapsed < 35 was false and time < 60', 'Always', 'Never after else', 'Only in Edit mode'], correctAnswer: 0, explanation: 'Earlier false conditions allow elseif.' },
      { id: 'q3', type: MC, question: 'Compare equality uses…', options: ['==', '=', '===', '<>'], correctAnswer: 0, explanation: 'Luau uses == for equality.' },
      { id: 'q4', type: MC, question: 'elapsed = 35.00 with if elapsed < 35 gets…', options: ['A Rank (not S)', 'S Rank', 'Error', 'No rank'], correctAnswer: 0, explanation: '35 is not less than 35.' },
      { id: 'q5', type: MC, question: 'Functions like getRank help…', options: ['Reuse logic cleanly', 'Delete UI', 'Remove terrain', 'Ban players'], correctAnswer: 0, explanation: 'Functions organize condition blocks.' },
      { id: 'q6', type: MC, question: 'Strictest time check should be…', options: ['First if', 'Last else only', 'Never used', 'Inside Sound'], correctAnswer: 0, explanation: 'Check S threshold before wider A threshold.' },
      { id: 'q7', type: MC, question: 'S_TIME constant at top makes…', options: ['Tuning thresholds easier', 'Scripts invisible', 'Parts unanchored', 'Sky pink'], correctAnswer: 0, explanation: 'Named constants document game rules.' },
      { id: 'q8', type: MC, question: 'Rank motivates players to…', options: ['Replay for better time', 'Delete Workspace', 'Disable Humanoid', 'Remove checkpoints'], correctAnswer: 0, explanation: 'Grades drive speed-run retries.' },
      { id: 'q9', type: MC, question: 'else runs when…', options: ['No earlier condition was true', 'Always first', 'Only in Play', 'Player has Robux'], correctAnswer: 0, explanation: 'else is the fallback branch.' },
      { id: 'q10', type: MC, question: 'Lesson 2.4 save name…', options: ['Lesson 2.4 - Finish Grades', 'Lesson 2.3 - Obby Timer', 'Lava Lane', 'Module 3'], correctAnswer: 0, explanation: 'Save after adding rank logic.' },
    ],
  },
}

export const enLesson25 = {
  lessonId: 'lesson-roblox-2-5',
  moduleId: 'module-02',
  order: 5,
  title: '2.5 - Victory Screen',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Build a VictoryGui ScreenGui with Frame and labels',
    'Show and hide UI with Enabled property',
    'Display dynamic time and rank from finish logic',
    'Add a Retry button that resets the run feel',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `A number on a timer label is good. A **victory screen** feels like winning a real game.

**Lesson flow:**
1. **Theory (40 min)** - VictoryGui layout + showVictory
2. **Practice (~25 min)** - polished win panel
3. **Quiz (10 min)** - **70%** pass

Keep your **Lesson 2.4** finish grading. Today you move results into a **center panel**.`,
      },
      {
        title: 'What players expect when they win',
        content: `Strong victory screens show:

| Element | Purpose |
|---------|---------|
| **Title** | "Level Complete!" celebration |
| **Time** | Proof of performance |
| **Rank** | S / A / B from Lesson 2.4 |
| **Retry** | One-click play again |

**UX rules:**
- Large readable text (**TextScaled**)
- High contrast panel on blurred world behind
- **Enabled = false** until finish - no spoilers at spawn`,
      },
      {
        title: 'Build VictoryGui hierarchy',
        content: `In **StarterGui**:

\`ScreenGui\` → **VictoryGui** (ResetOnSpawn optional)
└ \`Frame\` → **Panel** (center, Size ~ \`{0, 320}, {0, 280}\`)
   ├ \`TextLabel\` → **TitleLabel** - "Level Complete!"
   ├ \`TextLabel\` → **TimeLabel** - "Time: --"
   ├ \`TextLabel\` → **RankLabel** - "Rank: --"
   └ \`TextButton\` → **RetryButton** - "Play Again"

**Panel style:**
- BackgroundColor3 dark blue/grey
- UICorner radius 12
- UIStroke white thin border

Set **VictoryGui.Enabled = false** in Properties before scripting.`,
      },
      {
        title: 'showVictory function',
        content: `LocalScript inside **VictoryGui** (or inside RunUI if you merge files):

\`\`\`lua
local gui = script.Parent
local panel = gui:WaitForChild("Panel")
local titleLabel = panel:WaitForChild("TitleLabel")
local timeLabel = panel:WaitForChild("TimeLabel")
local rankLabel = panel:WaitForChild("RankLabel")

local function showVictory(finalTime, rank)
    titleLabel.Text = "Level Complete!"
    timeLabel.Text = string.format("Time: %.2fs", finalTime)
    rankLabel.Text = "Rank: " .. rank
    gui.Enabled = true
end

return showVictory
\`\`\`

If Script is sibling structure, use \`script.Parent\` paths that match **your** tree exactly.`,
      },
      {
        title: 'Connect finish pad to victory UI',
        content: `**Option A - one LocalScript** in RunUI handles timer + finish + victory.

On FinishPad touch after computing \`elapsed\` and \`rank\`:

\`\`\`lua
-- Stop timer loop (running = false)
local victoryGui = playerGui:WaitForChild("VictoryGui")
-- OR if VictoryGui is in StarterGui it clones to PlayerGui:
local victoryGui = game:GetService("Players").LocalPlayer:WaitForChild("PlayerGui"):WaitForChild("VictoryGui")

victoryGui.Panel.TitleLabel.Text = "Level Complete!"
victoryGui.Panel.TimeLabel.Text = string.format("Time: %.2fs", elapsed)
victoryGui.Panel.RankLabel.Text = "Rank: " .. rank
victoryGui.Enabled = true
\`\`\`

**Exercise (10 min):** Finish obby - victory panel appears, timer stops underneath.`,
      },
      {
        title: 'Hide RunUI timer when victory shows',
        content: `Optional polish:

\`\`\`lua
local runUI = playerGui:FindFirstChild("RunUI")
if runUI then
    runUI.Enabled = false
end
victoryGui.Enabled = true
\`\`\`

Players focus on the win card, not duplicate numbers.

Restore RunUI when retrying.`,
      },
      {
        title: 'Retry button behavior',
        content: `\`\`\`lua
local retryBtn = panel:WaitForChild("RetryButton")

retryBtn.MouseButton1Click:Connect(function()
    gui.Enabled = false
    local runUI = playerGui:FindFirstChild("RunUI")
    if runUI then
        runUI.Enabled = true
    end
    local char = Players.LocalPlayer.Character
    if char and char:FindFirstChild("Humanoid") then
        char.Humanoid.Health = 0  -- respawn to restart run feel
    end
end)
\`\`\`

**Note:** Full timer reset needs reloading startTime - for lesson, respawn + hide GUI is enough. Perfect reset merges in Module 6 polish.

**Exercise (5 min):** Click Retry - panel hides, you respawn.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] VictoryGui starts **Enabled false**
- [ ] Exact names match script WaitForChild paths
- [ ] Finish shows time **and** rank on panel
- [ ] Retry hides panel
- [ ] Save: \`Lesson 2.5 - Victory Screen\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Nil error on TitleLabel', explanation: 'Wrong path - Panel vs Frame name mismatch.', correctApproach: 'Match Explorer names exactly to WaitForChild strings' },
    { mistake: 'Victory visible at spawn', explanation: 'Enabled left true.', correctApproach: 'VictoryGui.Enabled = false until finish' },
    { mistake: 'Script in Workspace not StarterGui', explanation: 'UI does not clone to player.', correctApproach: 'LocalScript under VictoryGui in StarterGui' },
    { mistake: 'Looking for VictoryGui in StarterGui at runtime', explanation: 'After spawn it lives under PlayerGui.', correctApproach: 'Use LocalPlayer.PlayerGui:WaitForChild("VictoryGui")' },
  ],
  summary: `You built a VictoryGui with title, time, rank, and retry, wired it to FinishPad logic, and learned Enabled plus PlayerGui paths - your obby now celebrates wins like a shipped mini-game.`,
  practiceTask: {
    title: 'Victory panel polish (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Professional win screen on finish.

### Part A - Layout (10 min)
1. Create **VictoryGui** + **Panel** + 3 labels + **RetryButton**
2. Style: corner, stroke, readable fonts, **Enabled false**
3. Position panel center screen

### Part B - Show on finish (10 min)
1. Connect FinishPad to fill labels + \`VictoryGui.Enabled = true\`
2. Hide or disable **RunUI** while victory shows
3. Test S, A, B ranks display correctly

### Part C - Retry & save (5 min)
1. Retry button hides victory, enables RunUI, respawns player
2. **Save to Roblox** → \`Lesson 2.5 - Victory Screen\`
3. **Practice complete**`,
    hints: [
      'Use Explorer copy path to verify object names',
      'If panel nil, print script.Parent:GetFullName() in Output',
      'Test Retry once before saving',
    ],
    optionalChallenge: 'TweenService slide Panel from top when Enabled (Module 5 preview).',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'VictoryGui should start with Enabled…', options: ['false', 'true always', 'nil', 'random'], correctAnswer: 0, explanation: 'Hidden until the player finishes.' },
      { id: 'q2', type: MC, question: 'After spawn, VictoryGui is under…', options: ['PlayerGui', 'Terrain', 'Lighting', 'ServerScriptService only'], correctAnswer: 0, explanation: 'StarterGui clones into PlayerGui.' },
      { id: 'q3', type: MC, question: 'showVictory updates…', options: ['Label Text properties', 'Terrain water', 'SpawnLocation class', 'Kill blocks'], correctAnswer: 0, explanation: 'Dynamic text goes on labels.' },
      { id: 'q4', type: MC, question: 'TextButton click uses…', options: ['MouseButton1Click', 'Touched', 'BrickColor', 'Anchored'], correctAnswer: 0, explanation: 'GUI buttons use mouse events.' },
      { id: 'q5', type: MC, question: 'Victory screen LocalScript runs on…', options: ['Client', 'Server only', 'Roblox API site', 'Output'], correctAnswer: 0, explanation: 'GUI is client-side.' },
      { id: 'q6', type: MC, question: 'RankLabel should show…', options: ['S/A/B from conditions', 'Only player age', 'Terrain seed', 'Script errors'], correctAnswer: 0, explanation: 'Rank comes from Lesson 2.4 logic.' },
      { id: 'q7', type: MC, question: 'UICorner on Panel…', options: ['Rounds corners for polish', 'Kills player', 'Adds lava', 'Saves to cloud'], correctAnswer: 0, explanation: 'UICorner is a visual modifier.' },
      { id: 'q8', type: MC, question: 'Retry should at minimum…', options: ['Hide victory GUI', 'Delete obby', 'Remove checkpoints', 'Publish game'], correctAnswer: 0, explanation: 'Hide UI before another attempt.' },
      { id: 'q9', type: MC, question: 'WaitForChild prevents…', options: ['Nil if UI loads late', 'All scripts', 'Playing sounds', 'Moving camera'], correctAnswer: 0, explanation: 'Waits for instances to exist.' },
      { id: 'q10', type: MC, question: 'Lesson 2.5 save name…', options: ['Lesson 2.5 - Victory Screen', 'Finish Grades', 'Lava Lane', 'Coin Simulator'], correctAnswer: 0, explanation: 'Save the victory UI lesson.' },
    ],
  },
}

export const enLesson26 = {
  lessonId: 'lesson-roblox-2-6',
  moduleId: 'module-02',
  order: 6,
  title: '2.6 - Checkpoint: Obby Ready',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Integrate lava, checkpoints, timer, ranks, and victory UI',
    'Run a five-case playtest checklist',
    'Polish map clarity with signs and consistent naming',
    'Ship Module 2 prototype: Obby Ready',
  ],
  theory: {
    sections: [
      {
        title: 'Module 2 checkpoint (about 40 minutes)',
        content: `You are shipping **Obby Ready** - a complete mini obby, not a homework file.

**Required systems:**
- Kill blocks (2.1)
- Checkpoints (2.2)
- Timer (2.3)
- S/A/B ranks (2.4)
- Victory screen (2.5)

**Lesson flow:** polish + playtest + quiz. Less new code, more **quality bar**.`,
      },
      {
        title: '60-minute sprint plan',
        content: `| Phase | Minutes | Task |
|-------|---------|------|
| 1 | 10 | Explorer cleanup + signs |
| 2 | 15 | Lava + checkpoints retest |
| 3 | 15 | Timer → rank → victory flow |
| 4 | 10 | Visual polish (colors, lights) |
| 5 | 10 | Five playtests + fixes |

**Folder target:**
\`Workspace/Obby\` → Hazards, SafePath, Checkpoints, FinishPad
\`StarterGui\` → RunUI, VictoryGui`,
      },
      {
        title: 'Map clarity - players must not get lost',
        content: `Add **Neon arrow Parts** or sign Models pointing forward.

| Sign | Text idea |
|------|-----------|
| Start | "Obby Start →" |
| Mid | "Checkpoint ahead" |
| End | "Finish!" |

**Color language:**
- Safe = grey/white wood
- Lava = Neon red
- CP inactive = yellow, active = green
- Finish = Neon green pad

**Exercise (8 min):** Stand at spawn in Play - can you see where to go without asking?`,
      },
      {
        title: 'Five playtests (mandatory)',
        content: `Run each case. Mark pass/fail in a note.

1. **Early death** - touch lava before CP_1 → respawn at **start**
2. **CP_1 death** - touch CP_1, die on lava → respawn **CP_1**
3. **Full clear** - reach FinishPad → victory UI + correct rank
4. **Slow finish** - intentional 60s+ run → **B Rank** on panel
5. **Retry** - click Play Again → panel hides, can run again

**If any fail:** fix before calling the obby done.`,
      },
      {
        title: 'Quality bar - feels shippable',
        content: `- **60-120 seconds** of gameplay for average player
- **No red Output spam** during a clean run
- **8+** named Parts in obby (not generic Part)
- **3+** checkpoints working
- **3+** lava blocks
- Victory + timer never show wrong text at same time

**Audio optional:** quiet ambient + checkpoint ping (Module 1 skills).`,
      },
      {
        title: 'Start hub connection',
        content: `Your Module 1 **island spawn** can stay as flavor - connect obby start with a bridge or path from dock.

Players understand: **hub → obby start sign → course**.

Save as **Module 2 - Obby Ready** (new name) or overwrite your 2.5 place with final name.`,
      },
      {
        title: 'Module 3 preview',
        content: `Module 3 builds a **coin simulator** - collecting, UI score, saving data.

Your obby skills (touch, UI, conditions) transfer directly to coin pickups.

**Celebrate:** you now own a playable loop millions of Roblox games use: **try → fail → respawn → improve → win**.`,
      },
      {
        title: 'Demo script for teacher / parents',
        content: `Record or live-show **2 minutes:**
1. Spawn - show start sign
2. Die on lava once - show checkpoint save
3. Finish with rank on victory screen
4. Click Retry

**Say out loud:** what S Rank time threshold is and why you picked it.`,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Victory shows but checkpoints broken', explanation: 'Rushed polish without retest.', correctApproach: 'Run all 5 playtests after every big change' },
    { mistake: 'Obby too short (< 30s)', explanation: 'Not enough stages.', correctApproach: 'Add stage 4 or harder jumps before finish' },
    { mistake: 'Generic Explorer names', explanation: 'Cannot debug 20 scripts named Part.', correctApproach: 'Rename everything before demo' },
    { mistake: 'Timer and victory both enabled at finish', explanation: 'Confusing double UI.', correctApproach: 'Disable RunUI when VictoryGui shows' },
  ],
  summary: `You integrated every Module 2 system into Obby Ready, passed structured playtests, clarified the route with signs, and saved a demo-ready prototype - Module 3 coin games are next.`,
  practiceTask: {
    title: 'Ship Obby Ready (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Pass all 5 playtests + demo-ready place.

### Part A - Cleanup (10 min)
1. Explorer: folders Hazards, SafePath, Checkpoints under Obby
2. Rename stray Parts; add Start + Finish signs
3. No unanchored obby Parts

### Part B - Systems audit (15 min)
1. Re-test lava, CP_1/2/Final, FinishPad
2. Timer + getRank + VictoryGui one clean flow
3. Fix any Output errors

### Part C - Playtests & save (15 min)
1. Complete checklist cases 1-5 (note pass/fail)
2. One full run for best rank attempt
3. **Save to Roblox** → \`Module 2 - Obby Ready\`
4. **Practice complete** + optional 2-min recording`,
    hints: [
      'Fix checkpoint bugs before touching victory colors',
      'Walk the route as if you never saw the map',
      'Thresholds S_TIME/A_TIME must match obby length',
    ],
    optionalChallenge: 'Hidden skill shortcut route - faster but harder jumps.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Obby Ready requires…', options: ['Lava + CP + timer + victory', 'Only terrain', 'Only clicks from 1.4', 'No scripts'], correctAnswer: 0, explanation: 'Module 2 checkpoint merges all systems.' },
      { id: 'q2', type: MC, question: 'After CP_2 then death, spawn at…', options: ['CP_2', 'World origin only', 'FinishPad', 'Toolbox'], correctAnswer: 0, explanation: 'Last checkpoint touched wins.' },
      { id: 'q3', type: MC, question: 'VictoryGui appears when…', options: ['Player touches FinishPad', 'Studio opens', 'Terrain generates', 'Saving file'], correctAnswer: 0, explanation: 'Finish triggers victory UI.' },
      { id: 'q4', type: MC, question: 'Playtest 4 checks…', options: ['B Rank on slow finish', 'Deleting island', 'UK translation', 'Publishing'], correctAnswer: 0, explanation: 'Slow run should hit B branch.' },
      { id: 'q5', type: MC, question: 'Good obby length is about…', options: ['60-120 seconds', '2 seconds', '1 hour minimum', 'No jumping'], correctAnswer: 0, explanation: 'Mini obby targets about a minute.' },
      { id: 'q6', type: MC, question: 'Start signs help…', options: ['Players find the route', 'Increase lava damage', 'Remove Humanoid', 'Disable UI'], correctAnswer: 0, explanation: 'Wayfinding reduces confusion.' },
      { id: 'q7', type: MC, question: 'Retry button should…', options: ['Hide victory and allow another run', 'Delete all checkpoints', 'Remove ranks', 'Close Studio'], correctAnswer: 0, explanation: 'Retry supports replay loop.' },
      { id: 'q8', type: MC, question: 'Red Output during clean run means…', options: ['Fix scripts before shipping', 'Perfect game', 'More lava needed', 'Publish now'], correctAnswer: 0, explanation: 'Errors mean bugs remain.' },
      { id: 'q9', type: MC, question: 'Module 3 topic is…', options: ['Coins and collecting', 'Only cars', 'Only publishing', 'Empty placeholders'], correctAnswer: 0, explanation: 'Module 3 starts coin simulator.' },
      { id: 'q10', type: MC, question: 'Final Module 2 save name…', options: ['Module 2 - Obby Ready', 'Lesson 1.1', 'Untitled', 'Test Obby'], correctAnswer: 0, explanation: 'Checkpoint uses Module 2 portfolio name.' },
    ],
  },
}
