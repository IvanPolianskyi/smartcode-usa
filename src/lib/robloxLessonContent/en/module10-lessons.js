/** Rich EN content for Roblox Module 10 — lessons 10.1–10.3 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson101 = {
  lessonId: 'lesson-roblox-10-1',
  moduleId: 'module-10',
  order: 1,
  title: '10.1 — Physical Constraints',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Set up Attachment pairs for HingeConstraint and RopeConstraint',
    'Build a hinge door activated by a button',
    'Tune motor speed and damping for readable motion',
    'Add a rope-based hanging platform as second physics demo',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Module 10 — Magic of Details** — polish through **physics**, **tweens**, and **raycasts**.

**Lesson flow:**
1. **Theory (40 min)** — constraints
2. **Practice (~25 min)** — hinge door + rope platform
3. **Quiz (10 min)** — **70%** pass

New area: \`Lesson 10.1 — Constraints\`.`,
      },
      {
        title: 'Constraints bring worlds to life',
        content: `**Constraints** connect parts with physics rules:

| Constraint | Use |
|------------|-----|
| **HingeConstraint** | Doors, gates, spinning platforms |
| **RopeConstraint** | Swings, bridges, hanging signs |
| **BallSocket** | Free rotation joints (advanced) |

Without constraints, you animate every frame manually. With constraints, **Roblox physics** does the work.`,
      },
      {
        title: 'Attachments — anchor points',
        content: `Every constraint needs **two Attachments** (one per part):

1. Select **Part A** (door) → Create **Attachment** \`Att_Door\`
2. Select **Part B** (frame) → Create **Attachment** \`Att_Frame\`
3. Align attachments at the **hinge edge** (door hinge line)

**HingeConstraint** in door part:
- **Attachment0** → Att_Door
- **Attachment1** → Att_Frame

**Frame anchored true.** Door **unanchored** (moves).`,
      },
      {
        title: 'Hinge door with motor',
        content: `\`Door\` + \`DoorFrame\` setup.

**HingeConstraint** properties:

| Property | Start value |
|----------|-------------|
| **ActuatorType** | Motor |
| **AngularVelocity** | 1.5 |
| **MotorMaxTorque** | 5000 |
| **LimitsEnabled** | true |
| **LowerAngle** | 0 |
| **UpperAngle** | 90 |

**Button** → Script toggles motor:

\`\`\`lua
local hinge = workspace.Mechanics.SwingDoor.Hinge
local open = false

script.Parent.ClickDetector.MouseClick:Connect(function()
    open = not open
    hinge.AngularVelocity = open and 1.5 or -1.5
end)
\`\`\`

Or set **TargetAngle** if using Servo mode.`,
      },
      {
        title: 'Rope hanging platform',
        content: `**Platform** (unanchored) + **CeilingBeam** (anchored):

**RopeConstraint:**
- Attachment0 on platform top
- Attachment1 on ceiling
- **Length** = distance between points
- **Restitution** = 0.1 (low bounce)
- **Thickness** = 0.2 visible rope

Platform **swings** when players jump on it.

**Gameplay tuning:** too bouncy = nausea; too stiff = fake.`,
      },
      {
        title: 'Tuning and collision',
        content: `| Problem | Fix |
|---------|-----|
| Door flies off | Lower AngularVelocity, raise MotorMaxTorque |
| Door clips player | Collision groups or slower speed |
| Rope stretches weird | Check attachment positions |
| Platform spins | Add AlignOrientation or second constraint |

**Exercise (5 min):** Walk through door while opening — readable motion?`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Hinge door opens/closes from button
- [ ] Frame anchored, door unanchored
- [ ] Rope platform swings under weight
- [ ] Attachments aligned at hinge/rope points
- [ ] Save: \`Lesson 10.1 — Physical Constraints\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Both parts anchored', explanation: 'Nothing moves.', correctApproach: 'Moving part unanchored' },
    { mistake: 'Attachments misaligned', explanation: 'Wild rotation axis.', correctApproach: 'Snap to hinge edge' },
    { mistake: 'AngularVelocity 50', explanation: 'Chaotic door.', correctApproach: 'Start 1-2' },
    { mistake: 'No attachment on frame', explanation: 'Constraint incomplete.', correctApproach: 'Two attachments required' },
  ],
  summary: `You built a motor-driven hinge door and a rope-suspended platform using Attachments and constraints — mechanical motion that feels physical instead of scripted every frame.`,
  practiceTask: {
    title: 'Mechanical door (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Hinge door + rope platform.

### Part A — Hinge door (15 min)
1. Folder Mechanics — DoorFrame + Door + HingeConstraint
2. ClickDetector or ProximityPrompt toggles open
3. Limits 0–90 degrees

### Part B — Rope platform (8 min)
1. Ceiling + platform + RopeConstraint
2. Test jump — swing feels natural

### Part C — Save (2 min)
1. **Save to Roblox** → \`Lesson 10.1 — Physical Constraints\`
2. **Practice complete**`,
    hints: [
      'Anchor support parts only',
      'Module 5 used tweens — constraints are physics-based motion',
      'Collision groups if door hits players hard',
    ],
    optionalChallenge: 'Timed bridge swings on loop — cross timing challenge.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'HingeConstraint needs…', options: ['Two attachments', 'Terrain only', 'Humanoid', 'DataStore'], correctAnswer: 0, explanation: 'Attachment pair.' },
      { id: 'q2', type: MC, question: 'Door frame should be…', options: ['Anchored true', 'Unanchored always', 'Invisible only', 'Deleted'], correctAnswer: 0, explanation: 'Fixed support.' },
      { id: 'q3', type: MC, question: 'RopeConstraint limits…', options: ['Distance between parts', 'Player coins', 'Quest progress', 'UI size'], correctAnswer: 0, explanation: 'Rope length.' },
      { id: 'q4', type: MC, question: 'ActuatorType Motor spins…', options: ['Hinge with velocity', 'Terrain', 'Sky', 'Sound only'], correctAnswer: 0, explanation: 'Motor drive.' },
      { id: 'q5', type: MC, question: 'Moving door part is…', options: ['Unanchored', 'Anchored true', 'Script only', 'Terrain'], correctAnswer: 0, explanation: 'Physics motion.' },
      { id: 'q6', type: MC, question: 'Module 10 theme is…', options: ['Magic of Details', 'Only inventory', 'Only shop', 'Publishing'], correctAnswer: 0, explanation: 'Polish module.' },
      { id: 'q7', type: MC, question: 'Too fast AngularVelocity…', options: ['Feels chaotic', 'Improves FPS', 'Required', 'Saves data'], correctAnswer: 0, explanation: 'Tuning.' },
      { id: 'q8', type: MC, question: 'Lesson 10.2 covers…', options: ['TweenService', 'DataStore only', 'NPC only', 'Coins only'], correctAnswer: 0, explanation: 'Next lesson.' },
      { id: 'q9', type: MC, question: 'Constraints used for…', options: ['Doors bridges lifts', 'Dialogue text only', 'Leaderstats', 'UK locale'], correctAnswer: 0, explanation: 'Mechanical motion.' },
      { id: 'q10', type: MC, question: 'Lesson 10.1 save name…', options: ['Lesson 10.1 — Physical Constraints', 'Puzzle World', 'Tween Mastery', 'RPG Inventory'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const enLesson102 = {
  lessonId: 'lesson-roblox-10-2',
  moduleId: 'module-10',
  order: 2,
  title: '10.2 — TweenService Mastery',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Create tweens with TweenInfo easing and duration',
    'Tween UI panels and world parts (doors, collectibles)',
    'Chain tweens with Completed event',
    'Choose easing styles for snappy vs dramatic motion',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**TweenService** = smooth animation without keyframes every frame.

You used tweens in Module 5 polish — today you **master** patterns for UI and puzzles.

**Lesson flow:**
1. **Theory (40 min)** — TweenInfo + chains
2. **Practice (~25 min)** — 3 tween demos
3. **Quiz (10 min)** — **70%** pass

Open **Lesson 10.1 — Physical Constraints**.`,
      },
      {
        title: 'Why TweenService matters',
        content: `Instant teleport UI feels cheap. **0.3s Quad Out** feels professional.

**Tween** = interpolate properties over time:
- UI \`Position\`, \`Size\`, \`BackgroundTransparency\`
- Parts \`CFrame\`, \`Size\`, \`Color\`
- \`Camera.CFrame\` (advanced)

**Not for:** continuous physics (use constraints 10.1).`,
      },
      {
        title: 'Core tween pattern',
        content: `\`\`\`lua
local TweenService = game:GetService("TweenService")

local panel = script.Parent.ShopPanel
local goal = { Position = UDim2.fromScale(0.5, 0.5) }
local info = TweenInfo.new(
    0.5,                              -- time
    Enum.EasingStyle.Quad,
    Enum.EasingDirection.Out
)

local tween = TweenService:Create(panel, info, goal)
tween:Play()
\`\`\`

| EasingStyle | Feel |
|-------------|------|
| **Quad** | General UI |
| **Back** | Slight overshoot |
| **Bounce** | Playful (use sparingly) |
| **Linear** | Mechanical doors |`,
      },
      {
        title: 'Three tween demos',
        content: `**1 — UI panel open** (ShopPanel hidden off-screen):

\`\`\`lua
-- from {Position = UDim2.fromScale(0.5, 1.2)} to center
\`\`\`

**2 — Sliding door** (Part CFrame — puzzle door):

\`\`\`lua
local door = workspace.Puzzle.DoorSlide
local openCF = door.CFrame * CFrame.new(0, 0, 8)
TweenService:Create(door, TweenInfo.new(1, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut), {CFrame = openCF}):Play()
\`\`\`

**3 — Collectible pulse** (crystal scale loop):

\`\`\`lua
local crystal = workspace.QuestProps.Crystal
local big = TweenService:Create(crystal, TweenInfo.new(0.6, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true), {Size = crystal.Size * 1.15})
big:Play()
\`\`\`

**\`-1, true\`** = repeat forever, reverse.`,
      },
      {
        title: 'Chain with Completed',
        content: `\`\`\`lua
local function playOpenSequence(door, panel, label)
    local t1 = TweenService:Create(door, TweenInfo.new(0.8, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {CFrame = doorOpenCF})
    t1:Play()
    t1.Completed:Connect(function()
        local t2 = TweenService:Create(panel, TweenInfo.new(0.4, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = centerPos})
        t2:Play()
        t2.Completed:Connect(function()
            label.Text = "Room Unlocked!"
        end)
    end)
end
\`\`\`

**Chains** = puzzle reveals, quest completions, cutscenes.`,
      },
      {
        title: 'Timing guidelines',
        content: `| Action | Duration |
|--------|----------|
| Button feedback | 0.15–0.25s |
| Panel open | 0.4–0.6s |
| Dramatic door | 0.8–1.2s |
| Ambient pulse | 0.5–1s loop |

Store in config:

\`\`\`lua
local TWEEN_UI_OPEN = TweenInfo.new(0.45, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
\`\`\`

**Avoid** bounce on every UI element — looks unprofessional.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] UI panel tween open/close
- [ ] Door part slides with Linear tween
- [ ] Crystal pulse loop
- [ ] One Completed chain (2+ steps)
- [ ] Save: \`Lesson 10.2 — Tween Mastery\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Tweening anchored door wrong axis', explanation: 'Door stuck.', correctApproach: 'CFrame goal tested in Studio' },
    { mistake: 'Bounce on everything', explanation: 'Clown UI.', correctApproach: 'Quad/Back sparingly' },
    { mistake: 'Forgetting :Play()', explanation: 'Nothing happens.', correctApproach: 'tween:Play()' },
    { mistake: 'Conflicting constraint + position tween', explanation: 'Physics fights tween.', correctApproach: 'Pick one motion system' },
  ],
  summary: `You mastered TweenInfo easing, UI and world object tweens, collectible pulse loops, and Completed chains — your game feedback now feels smooth and intentional.`,
  practiceTask: {
    title: 'Tween polish pack (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** 3 tweens + 1 chain.

### Part A — UI (8 min)
1. Shop or puzzle panel — tween from off-screen
2. Close reverses tween

### Part B — World (10 min)
1. Sliding door CFrame tween
2. Crystal pulse Repeat loop

### Part C — Chain & save (7 min)
1. Door opens → panel → text (Completed)
2. **Save to Roblox** → \`Lesson 10.2 — Tween Mastery\`
3. **Practice complete**`,
    hints: [
      'Module 5.4 had TweenService — extend here',
      'Cancel previous tween if spam-click open',
      'UDim2 for UI, CFrame for parts',
    ],
    optionalChallenge: 'Mini cinematic: camera pan → door → quest text.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'TweenService animates…', options: ['Properties over time', 'Only terrain', 'Only Humanoid', 'DataStore'], correctAnswer: 0, explanation: 'Interpolation.' },
      { id: 'q2', type: MC, question: 'TweenInfo.new first arg is…', options: ['Duration in seconds', 'Player name', 'Item id', 'Robux'], correctAnswer: 0, explanation: 'Time length.' },
      { id: 'q3', type: MC, question: 'Completed event fires when…', options: ['Tween finishes', 'Player joins', 'Terrain loads', 'Shop opens'], correctAnswer: 0, explanation: 'Chain tweens.' },
      { id: 'q4', type: MC, question: 'Quad Out good for…', options: ['UI panels', 'Server authority', 'Coins', 'NPC AI'], correctAnswer: 0, explanation: 'Smooth UI.' },
      { id: 'q5', type: MC, question: 'Repeat -1 in TweenInfo means…', options: ['Loop forever', 'Play once', 'Stop server', 'Delete part'], correctAnswer: 0, explanation: 'Pulse loop.' },
      { id: 'q6', type: MC, question: 'Linear easing for door feels…', options: ['Mechanical steady', 'Bouncy', 'Random', 'Invisible'], correctAnswer: 0, explanation: 'Door slide.' },
      { id: 'q7', type: MC, question: 'Lesson 10.2 builds on…', options: ['Lesson 10.1 constraints', 'Module 1 only', 'Empty', 'Publish'], correctAnswer: 0, explanation: 'Same puzzle place.' },
      { id: 'q8', type: MC, question: 'Lesson 10.3 adds…', options: ['Raycasting', 'Only shop', 'Only inventory', 'Racing'], correctAnswer: 0, explanation: 'Sensors next.' },
      { id: 'q9', type: MC, question: ':Play() is required because…', options: ['Tween does not run until Play', 'Auto always', 'Server bans', 'UI deletes'], correctAnswer: 0, explanation: 'Start tween.' },
      { id: 'q10', type: MC, question: 'Lesson 10.2 save name…', options: ['Lesson 10.2 — Tween Mastery', 'Physical Constraints', 'Puzzle World', 'Raycasting'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const enLesson103 = {
  lessonId: 'lesson-roblox-10-3',
  moduleId: 'module-10',
  order: 3,
  title: '10.3 — Raycasting',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Cast rays with RaycastParams and FilterDescendantsInstances',
    'Build emitter-to-target sensor for puzzle unlock',
    'Debug rays with Beam or temporary parts',
    'Tag valid targets with CollectionService',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Raycasting** = invisible laser that asks *what is in the way?*

Perfect for laser puzzles, line-of-sight, hit detection.

**Lesson flow:**
1. **Theory (40 min)** — Raycast API
2. **Practice (~25 min)** — sensor ray unlock
3. **Quiz (10 min)** — **70%** pass

Open **Lesson 10.2 — Tween Mastery**.`,
      },
      {
        title: 'Raycasting in plain English',
        content: `From **origin** shoot **direction** × **distance**:

\`\`\`lua
local origin = emitter.Position
local direction = (target.Position - origin).Unit
local distance = (target.Position - origin).Magnitude

local result = workspace:Raycast(origin, direction * distance, params)
\`\`\`

**result** nil = nothing hit (clear line).
**result.Instance** = first part hit.`,
      },
      {
        title: 'RaycastParams filters',
        content: `\`\`\`lua
local params = RaycastParams.new()
params.FilterType = Enum.RaycastFilterType.Exclude
params.FilterDescendantsInstances = {
    game.Players.LocalPlayer.Character, -- if LocalScript test
    workspace.Debris,
}
params.IgnoreWater = true
\`\`\`

**Include** whitelist — only tagged targets count:

\`\`\`lua
params.FilterType = Enum.RaycastFilterType.Include
params.FilterDescendantsInstances = {workspace.Puzzle.Targets}
\`\`\`

**Server puzzle** — run raycast on **server** for trusted unlock.`,
      },
      {
        title: 'Sensor puzzle logic',
        content: `**Emitter** part → **TargetCrystal** part (tag \`PuzzleTarget\`)

\`PuzzleRayService\` Script (server), every 0.2s or on mirror rotate:

\`\`\`lua
local CollectionService = game:GetService("CollectionService")

local function checkBeam(emitter, target)
    local dir = (target.Position - emitter.Position)
    local result = workspace:Raycast(emitter.Position, dir.Unit * dir.Magnitude, params)

    if not result then
        return false, "blocked" -- should not happen if target in range
    end

    if result.Instance == target or result.Instance:IsDescendantOf(target.Parent) then
        return true, "clear_hit"
    end

    return false, "blocked_by_" .. result.Instance.Name
end
\`\`\`

If **clear** → set \`targetState.A = true\` → check all targets → open door.`,
      },
      {
        title: 'Debug visuals',
        content: `**Beam** between attachments on emitter and hit point:

\`\`\`lua
-- Attachment0 on emitter, Attachment1 on moving hit part
beam.Color = ColorSequence.new(Color3.fromRGB(255, 0, 0))
-- Green when puzzle solved:
beam.Color = ColorSequence.new(Color3.fromRGB(0, 255, 100))
\`\`\`

**Or** temporary thin Part along ray in Studio debugging.

Debug saves hours when "puzzle broken" is actually a stray part in the way.`,
      },
      {
        title: 'Normalize direction',
        content: `**Always** use \`.Unit\` before multiply distance:

\`\`\`lua
local dir = (target.Position - origin)
local result = workspace:Raycast(origin, dir.Unit * dir.Magnitude, params)
\`\`\`

Wrong: \`direction * 100\` with non-unit vector → wrong hit distance.

**Exclude** decorative particles and glass if they should not block.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Ray hits target when line clear
- [ ] Wall between blocks unlock
- [ ] Debug beam shows red/green state
- [ ] Server script owns unlock (not client only)
- [ ] Save: \`Lesson 10.3 — Raycasting\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Non-unit direction vector', explanation: 'Wrong ray length.', correctApproach: 'dir.Unit * magnitude' },
    { mistake: 'Client-only unlock', explanation: 'Exploit.', correctApproach: 'Server ray + door open' },
    { mistake: 'Forgot to exclude player character', explanation: 'Self-block.', correctApproach: 'FilterDescendantsInstances' },
    { mistake: 'Decorative part in ray path', explanation: 'Always blocked.', correctApproach: 'Exclude or move part' },
  ],
  summary: `You implemented RaycastParams filtering, emitter-to-target sensor checks with debug beams, and server-side puzzle unlock logic — ready to combine with mirrors in the laser puzzle lesson.`,
  practiceTask: {
    title: 'Sensor ray system (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Ray clear = unlock step.

### Part A — Setup (10 min)
1. Emitter + TargetCrystal (tag PuzzleTarget)
2. RaycastParams exclude player/debris
3. Debug Beam visual

### Part B — Logic (12 min)
1. Server checkBeam function
2. Blocked → locked message; clear → activate target
3. All targets → tween door open (10.2)

### Part C — Save (3 min)
1. Place wall — verify block; remove — verify unlock
2. **Save to Roblox** → \`Lesson 10.3 — Raycasting\`
3. **Practice complete**`,
    hints: [
      'Print result.Instance.Name when blocked',
      'CollectionService tag for valid targets',
      'Lesson 10.4 combines mirrors + multi-target',
    ],
    optionalChallenge: 'Beam green only on correct target hit.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Raycast returns nil when…', options: ['Nothing hit along ray', 'Player wins', 'Terrain only', 'UI opens'], correctAnswer: 0, explanation: 'No hit.' },
      { id: 'q2', type: MC, question: 'FilterDescendantsInstances…', options: ['Include or exclude parts', 'Delete terrain', 'Save DataStore', 'Spawn NPC'], correctAnswer: 0, explanation: 'Ray filter.' },
      { id: 'q3', type: MC, question: 'Direction should use…', options: ['Unit vector times distance', 'Random', 'Player name', 'Robux'], correctAnswer: 0, explanation: 'Correct length.' },
      { id: 'q4', type: MC, question: 'Puzzle unlock on server prevents…', options: ['Client exploits', 'Lag', 'Sound', 'Welds'], correctAnswer: 0, explanation: 'Authority.' },
      { id: 'q5', type: MC, question: 'result.Instance is…', options: ['First part hit', 'Player only', 'Sky', 'Script'], correctAnswer: 0, explanation: 'Hit part.' },
      { id: 'q6', type: MC, question: 'Beam debug helps…', options: ['See ray path', 'Publish game', 'Remove Humanoid', 'Add coins'], correctAnswer: 0, explanation: 'Visual debug.' },
      { id: 'q7', type: MC, question: 'Lesson 10.3 builds on…', options: ['Lesson 10.2 tweens for door', 'Module 3 only', 'Empty', 'UK only'], correctAnswer: 0, explanation: 'Door open tween.' },
      { id: 'q8', type: MC, question: 'Lesson 10.4 combines…', options: ['Rays + mirrors + puzzle state', 'Only inventory', 'Only shop', 'Only race'], correctAnswer: 0, explanation: 'Laser puzzle.' },
      { id: 'q9', type: MC, question: 'CollectionService tags help…', options: ['Identify puzzle targets', 'Fly', 'Swim', 'Heal'], correctAnswer: 0, explanation: 'Valid targets.' },
      { id: 'q10', type: MC, question: 'Lesson 10.3 save name…', options: ['Lesson 10.3 — Raycasting', 'Tween Mastery', 'Puzzle World', 'Constraints'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const enLesson104 = {
  lessonId: 'lesson-roblox-10-4',
  moduleId: 'module-10',
  order: 4,
  title: '10.4 — Laser Puzzle',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Build laser emitters, mirrors, and three target nodes',
    'Track puzzle state in a server targetState table',
    'Rotate mirrors with debounced input and ray recheck',
    'Open door with tween and sound when all targets active',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Combine **raycasts (10.3)** + **tweens (10.2)** into a **multi-step laser room**.

**Lesson flow:**
1. **Theory (40 min)** — puzzle structure + state table
2. **Practice (~25 min)** — 3 mirrors, 3 targets
3. **Quiz (10 min)** — **70%** pass

Open **Lesson 10.3 — Raycasting**.`,
      },
      {
        title: 'Laser puzzle structure',
        content: `Folder \`Workspace/PuzzleRoom/LaserPuzzle/\`:

| Piece | Role |
|-------|------|
| **Emitter_A** | Ray origin |
| **Mirror_1..3** | Redirect (rotate to aim) |
| **Target_A/B/C** | Tag \`PuzzleTarget\` |
| **DoorLocked** | Opens when all true |
| **PuzzleState** | Server state manager |

Players should see **cause → effect** in 10 seconds.`,
      },
      {
        title: 'targetState table',
        content: `\`Srv_PuzzleLaser\` Script:

\`\`\`lua
local targetState = {
    A = false,
    B = false,
    C = false,
}

local function allActive()
    return targetState.A and targetState.B and targetState.C
end

local function tryOpenDoor()
    if not allActive() then return end
    -- Tween door from 10.2
    local door = workspace.PuzzleRoom.DoorLocked
    local TweenService = game:GetService("TweenService")
    local openCF = door.CFrame * CFrame.new(0, 0, 10)
    TweenService:Create(door, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {CFrame = openCF}):Play()
    -- Sound + StatusLabel "Puzzle Complete!"
end
\`\`\`

**Server owns** targetState — client cannot FireServer(true, true, true).`,
      },
      {
        title: 'Mirror rotation',
        content: `Each mirror — **ClickDetector** or **ProximityPrompt** "Rotate":

\`\`\`lua
local ROTATE_STEP = 45
local lastRotate = 0
local DEBOUNCE = 0.3

mirror.ClickDetector.MouseClick:Connect(function()
    if os.clock() - lastRotate < DEBOUNCE then return end
    lastRotate = os.clock()
    mirror.CFrame = mirror.CFrame * CFrame.Angles(0, math.rad(ROTATE_STEP), 0)
    recheckAllRays() -- server function
end)
\`\`\`

**recheckAllRays** runs ray logic from 10.3 for each emitter→target pair (with mirror redirect simplified: check direct line for lesson, or one bounce).`,
      },
      {
        title: 'Simplified lesson ray path',
        content: `**Beginner version:** each mirror enables a **linked target** when rotated to correct yaw (snapped angles):

\`\`\`lua
local correctAngles = {
    Mirror_1 = 90,
    Mirror_2 = 180,
    Mirror_3 = 0,
}

local function isAngleCorrect(mirror, correct)
    local _, y, _ = mirror.CFrame:ToEulerAnglesYXZ()
    local deg = math.deg(y) % 360
    return math.abs(deg - correct) < 10
end
\`\`\`

**Advanced:** full mirror bounce ray math (optional challenge).

When correct → \`targetState.A = true\` + glow target **Neon green**.`,
      },
      {
        title: 'Feedback loop',
        content: `Each target activation:
- **PointLight** enabled on crystal
- **Sound** ping
- **BillboardGui** checkmark
- **StatusLabel** \`Targets: 2/3\`

When wrong rotation:
- Brief red flash on mirror
- No progress

**Reset button** (optional): sets angles to 0 and state false.`,
      },
      {
        title: 'Anti-bypass',
        content: `| Exploit | Block |
|---------|-------|
| Client opens door | Door tween only in tryOpenDoor server |
| Skip mirrors | Each target needs server true |
| Spam rotate | Debounce 0.3s |

**No dead-end:** if stuck 90s, show hint billboard (challenge).`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] 3 targets + mirror rotation changes state
- [ ] All 3 active opens door with tween + sound
- [ ] Status shows X/3 progress
- [ ] Reset works for replay
- [ ] Save: \`Lesson 10.4 — Laser Puzzle\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Client sets targetState true', explanation: 'Bypass puzzle.', correctApproach: 'Server recheck only' },
    { mistake: 'No debounce on rotate', explanation: 'Spam jitter.', correctApproach: '0.3s cooldown' },
    { mistake: 'Door opens on 2/3 targets', explanation: 'Logic bug.', correctApproach: 'allActive() check' },
    { mistake: 'No feedback on activate', explanation: 'Confusing puzzle.', correctApproach: 'Light + sound + counter' },
  ],
  summary: `You built a three-target laser puzzle with server targetState, debounced mirror rotation, ray or angle checks, and a tween door reward — players understand and solve a multi-step challenge.`,
  practiceTask: {
    title: 'Laser puzzle room (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** 3 targets → open door.

### Part A — Build (10 min)
1. LaserPuzzle folder — emitter, 3 mirrors, 3 targets
2. targetState + tryOpenDoor server script

### Part B — Interaction (12 min)
1. Rotate mirrors — recheck — update state
2. Feedback lights/sounds + Targets X/3 UI
3. All active → door tween

### Part C — Save (3 min)
1. Full solve once; reset and solve again
2. **Save to Roblox** → \`Lesson 10.4 — Laser Puzzle\`
3. **Practice complete**`,
    hints: [
      'Start with angle-snap solution before real mirror bounce',
      'Print targetState table when debugging',
      'Combine 10.2 tween + 10.3 ray in one room',
    ],
    optionalChallenge: 'Gold/Silver/Bronze medals by solve time.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'targetState should live on…', options: ['Server', 'Client only', 'Lighting', 'Terrain'], correctAnswer: 0, explanation: 'Authority.' },
      { id: 'q2', type: MC, question: 'allActive() checks…', options: ['All targets true', 'One target', 'Player name', 'Robux'], correctAnswer: 0, explanation: 'Win condition.' },
      { id: 'q3', type: MC, question: 'Mirror debounce prevents…', options: ['Spam rotation jitter', 'Walking', 'Jump', 'Shop'], correctAnswer: 0, explanation: 'Input spam.' },
      { id: 'q4', type: MC, question: 'Door opens with…', options: ['TweenService after puzzle', 'Client chat', 'Terrain', 'Delete'], correctAnswer: 0, explanation: 'Reward moment.' },
      { id: 'q5', type: MC, question: 'Feedback on target helps…', options: ['Players understand progress', 'Lag', 'Save data', 'NPC'], correctAnswer: 0, explanation: 'UX clarity.' },
      { id: 'q6', type: MC, question: 'Lesson 10.4 uses…', options: ['Rays and puzzle state', 'Only inventory', 'Only coins', 'Only race'], correctAnswer: 0, explanation: 'Combined systems.' },
      { id: 'q7', type: MC, question: 'PuzzleTarget tag identifies…', options: ['Valid crystal targets', 'Enemies', 'Shops', 'Cars'], correctAnswer: 0, explanation: 'Ray targets.' },
      { id: 'q8', type: MC, question: 'Lesson 10.5 adds…', options: ['Procedural variants', 'Only dialogue', 'DataStore', 'Publish'], correctAnswer: 0, explanation: 'Random layouts.' },
      { id: 'q9', type: MC, question: 'Anti-bypass means…', options: ['Server validates completion', 'Trust client', 'No checks', 'Skip puzzle'], correctAnswer: 0, explanation: 'Security.' },
      { id: 'q10', type: MC, question: 'Lesson 10.4 save name…', options: ['Lesson 10.4 — Laser Puzzle', 'Raycasting', 'Puzzle World', 'Constraints'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const enLesson105 = {
  lessonId: 'lesson-roblox-10-5',
  moduleId: 'module-10',
  order: 5,
  title: '10.5 — Procedural Elements',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Pick puzzle room variants with math.random from curated templates',
    'Store variant metadata for difficulty and solve time',
    'Ensure every variant is solvable with fair difficulty',
    'Use seeded random for repeatable Studio tests',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Procedural** does not mean chaotic — it means **variety from templates** players can still beat.

**Lesson flow:**
1. **Theory (40 min)** — template + random pick
2. **Practice (~25 min)** — 4 puzzle variants
3. **Quiz (10 min)** — **70%** pass

Open **Lesson 10.4 — Laser Puzzle**.`,
      },
      {
        title: 'Procedural vs random mess',
        content: `| Good procedural | Bad random |
|-----------------|------------|
| 4 hand-built layouts | Pure noise generation |
| Same difficulty band | Impossible mirror combos |
| Logged variant id | No testing |

**Replayability** without **rage quits**.`,
      },
      {
        title: 'Variant table',
        content: `\`Modules/PuzzleVariants\` ModuleScript:

\`\`\`lua
local PuzzleVariants = {
    {
        id = "layout_alpha",
        difficulty = 1,
        estimatedMinutes = 3,
        mirrorAngles = {90, 180, 0},
    },
    {
        id = "layout_beta",
        difficulty = 2,
        estimatedMinutes = 4,
        mirrorAngles = {45, 135, 270},
    },
    {
        id = "layout_gamma",
        difficulty = 2,
        estimatedMinutes = 5,
        mirrorAngles = {0, 90, 180},
    },
    {
        id = "layout_delta",
        difficulty = 3,
        estimatedMinutes = 6,
        mirrorAngles = {135, 225, 315},
    },
}

return PuzzleVariants
\`\`\``,
      },
      {
        title: 'Pick and spawn variant',
        content: `\`Srv_PuzzleRound\` Script on round start:

\`\`\`lua
local PuzzleVariants = require(game.ServerScriptService.Modules.PuzzleVariants)

local function pickVariant()
    local index = math.random(1, #PuzzleVariants)
    return PuzzleVariants[index]
end

local function applyVariant(variant)
    print("[Puzzle] Spawning", variant.id, "difficulty", variant.difficulty)
    -- Reset targetState
    -- Set mirror correct angles from variant.mirrorAngles
    -- Update UI VariantLabel.Text = variant.id
end

local variant = pickVariant()
applyVariant(variant)
\`\`\`

**Log variant id** every round for balancing.`,
      },
      {
        title: 'Weighted random (optional)',
        content: `\`\`\`lua
local function pickWeighted()
    local roll = math.random()
    if roll < 0.1 then
        return PuzzleVariants[4] -- legendary hard, 10%
    end
    return PuzzleVariants[math.random(1, 3)]
end
\`\`\`

**Fairness rule:** test each variant 5 times — all completable.`,
      },
      {
        title: 'Seeded random for testing',
        content: `\`\`\`lua
local TEST_MODE = false
local TEST_SEED = 12345

if TEST_MODE then
    math.randomseed(TEST_SEED)
end
\`\`\`

Same seed → same variant sequence in Studio — reproduce bugs.

**Never** seed in published live game from client input (predictable exploits) — server picks only.`,
      },
      {
        title: 'Round reset flow',
        content: `After door opens:
1. Wait 5s celebration
2. **Reset** mirrors, targetState, door position
3. \`pickVariant()\` again
4. Announce \`New challenge: layout_beta\`

Connects to future **round-based** games (Module 11+).`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] 4 variants in module, all tested solvable
- [ ] Round start picks random variant
- [ ] VariantLabel shows current layout id
- [ ] Reset + new variant after win works
- [ ] Save: \`Lesson 10.5 — Procedural Elements\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Fully random angles', explanation: 'Unsolvable puzzles.', correctApproach: 'Curated mirrorAngles per variant' },
    { mistake: 'No variant logging', explanation: 'Cannot balance.', correctApproach: 'Print id each round' },
    { mistake: 'Only one layout', explanation: 'Not procedural lesson goal.', correctApproach: 'Minimum 4 templates' },
    { mistake: 'Client picks variant', explanation: 'Cherry-pick easy.', correctApproach: 'Server pickVariant' },
  ],
  summary: `You added curated puzzle variants selected with math.random, metadata for difficulty, optional weighted picks, and round reset flow — the laser room now changes between plays while staying fair.`,
  practiceTask: {
    title: 'Procedural puzzle variants (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** 4 layouts, random each round.

### Part A — Variants module (10 min)
1. PuzzleVariants with 4 entries + mirrorAngles
2. Playtest each — all solvable

### Part B — Round manager (12 min)
1. pickVariant + applyVariant on start
2. After win → reset → new variant
3. VariantLabel UI

### Part C — Save (3 min)
1. Play 4 rounds — see different ids in Output
2. **Save to Roblox** → \`Lesson 10.5 — Procedural Elements\`
3. **Practice complete**`,
    hints: [
      'TEST_SEED for repeatable debug',
      'estimatedMinutes helps teachers balance',
      'Legendary variant 10% optional',
    ],
    optionalChallenge: 'Weighted random — layout_delta 10% only.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Good procedural uses…', options: ['Curated templates', 'Pure chaos', 'No testing', 'Client-only'], correctAnswer: 0, explanation: 'Controlled variety.' },
      { id: 'q2', type: MC, question: 'math.random picks…', options: ['Variant index', 'Player HP', 'Terrain', 'Sky'], correctAnswer: 0, explanation: 'Layout selection.' },
      { id: 'q3', type: MC, question: 'Variant id logging helps…', options: ['Balancing difficulty', 'Deleting saves', 'Banning', 'Publishing'], correctAnswer: 0, explanation: 'Design data.' },
      { id: 'q4', type: MC, question: 'Server picks variant to prevent…', options: ['Client cherry-picking easy', 'Lag', 'Sound', 'UI'], correctAnswer: 0, explanation: 'Fair selection.' },
      { id: 'q5', type: MC, question: 'randomseed in TEST_MODE…', options: ['Reproducible debug runs', 'Live exploits', 'Removes puzzles', 'Deletes UI'], correctAnswer: 0, explanation: 'Studio testing.' },
      { id: 'q6', type: MC, question: 'Every variant must be…', options: ['Solvable and tested', 'Impossible', 'Invisible', 'Empty'], correctAnswer: 0, explanation: 'Fairness rule.' },
      { id: 'q7', type: MC, question: 'Lesson 10.5 builds on…', options: ['Lesson 10.4 laser room', 'Module 1 only', 'Shop only', 'Empty'], correctAnswer: 0, explanation: 'Same puzzle base.' },
      { id: 'q8', type: MC, question: 'Lesson 10.6 is…', options: ['Puzzle World checkpoint', 'RPG only', 'Race only', 'NPC only'], correctAnswer: 0, explanation: 'Module finale.' },
      { id: 'q9', type: MC, question: 'difficulty field in variant…', options: ['Helps balance and label', 'Required by Roblox', 'Replaces Humanoid', 'Opens shop'], correctAnswer: 0, explanation: 'Metadata.' },
      { id: 'q10', type: MC, question: 'Lesson 10.5 save name…', options: ['Lesson 10.5 — Procedural Elements', 'Laser Puzzle', 'Puzzle World', 'Tween Mastery'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const enLesson106 = {
  lessonId: 'lesson-roblox-10-6',
  moduleId: 'module-10',
  order: 6,
  title: '10.6 — Checkpoint: Puzzle World',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Ship Puzzle World with constraints, tweens, rays, and procedural variants',
    'Pass five playtests with clear clues and no dead-ends',
    'Organize puzzle assets in clean folder structure',
    'Deliver Module 10 portfolio save with 60-second demo',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Puzzle World** = Module 10 portfolio — proves you blend **physics, polish, logic, and variety**.

**Required ingredients:**
- Constraint mechanic (door or platform)
- Tween reveal/interaction
- Raycast or laser target logic
- Procedural variant on round start

**Save:** \`Module 10 — Puzzle World\``,
      },
      {
        title: 'World layout blueprint',
        content: `\`\`\`
Workspace/PuzzleWorld/
├── Mechanics/          (hinge door, rope platform)
├── PuzzleRoom/
│   ├── LaserPuzzle/
│   └── DoorReward/
├── RoundSpawn
└── Signs/              (tutorial arrows)

ServerScriptService/
├── Modules/PuzzleVariants.lua
├── Srv_PuzzleLaser.lua
├── Srv_PuzzleRound.lua
└── Srv_Mechanics.lua

StarterGui/
├── PuzzleUI (variant, targets X/3, status)
└── HintUI (optional)
\`\`\``,
      },
      {
        title: 'Player journey (golden path)',
        content: `| Step | Experience |
|------|------------|
| 1 | Spawn → sign explains goal |
| 2 | Optional: cross rope / open hinge demo |
| 3 | Enter laser room — variant announced |
| 4 | Solve 3 targets — feedback each |
| 5 | Door tweens open — celebration SFX |
| 6 | New round — different variant |

**Total time:** 5–8 minutes first try.`,
      },
      {
        title: 'Five playtest protocol',
        content: `Ask tester (or yourself) to play **5 runs**:

| Run | Note stuck point? | Variant id | Time |
|-----|-------------------|------------|------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

**Fix** top 2 confusion points before save.

**No dead-ends:** always a reset or hint path.`,
      },
      {
        title: 'Polish checklist',
        content: `| # | Item | Pass |
|---|------|------|
| 1 | Clues readable from spawn | |
| 2 | Tweens not too slow/fast | |
| 3 | Rays/targets reliable 10/10 tries | |
| 4 | All 4 variants completable | |
| 5 | No Output errors in golden path | |
| 6 | Folder names clear | |
| 7 | 2-player: puzzle state independent if per-player (optional co-op: shared state ok if documented) | |`,
      },
      {
        title: '60-second demo + Module 11 preview',
        content: `**Demo script:**
1. Show Mechanics folder — quick hinge
2. Enter puzzle — read variant label
3. Solve one target — light + sound
4. Complete puzzle — door tween
5. New round — new variant name

**Module 11 — Performance & Polish:** Explorer cleanup, profiling, publish prep.

**Before practice:**
- [ ] Five playtests done
- [ ] Polish checklist 7/7
- [ ] **Save to Roblox** → \`Module 10 — Puzzle World\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Missing one required ingredient', explanation: 'Checkpoint incomplete.', correctApproach: 'Constraints + tween + ray + procedural' },
    { mistake: 'No playtesting', explanation: 'Confusing flow ships.', correctApproach: '5-run protocol' },
    { mistake: 'Messy Explorer', explanation: 'Hard to maintain.', correctApproach: 'PuzzleWorld folder structure' },
    { mistake: 'Unsolvable procedural variant', explanation: 'Bad reviews.', correctApproach: 'Test all 4 variants' },
  ],
  summary: `You integrated constraints, tweens, laser puzzles, and procedural rounds into Puzzle World, passed playtest and polish QA, and saved a demo-ready checkpoint — Module 10 is complete.`,
  practiceTask: {
    title: 'Ship Puzzle World (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Portfolio checkpoint.

### Part A — Integrate (15 min)
1. Merge 10.1–10.5 into PuzzleWorld
2. One golden path signposted
3. PuzzleUI complete

### Part B — Playtests (20 min)
1. Five runs — log stuck points — fix top 2
2. Polish checklist all pass

### Part C — Demo save (5 min)
1. 60s rehearsed demo
2. **Save to Roblox** → \`Module 10 — Puzzle World\`
3. **Practice complete**`,
    hints: [
      'Tune tween timing after playtest 3',
      'Hint after 90s stuck optional',
      'Reliability over extra puzzle types',
    ],
    optionalChallenge: 'Adaptive hint system after 90 seconds.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Puzzle World must include…', options: ['Constraint + tween + ray + procedural', 'Only terrain', 'Only shop', 'No scripts'], correctAnswer: 0, explanation: 'Four ingredients.' },
      { id: 'q2', type: MC, question: 'Five playtests find…', options: ['Where players get stuck', 'Robux', 'DataStore keys', 'Version'], correctAnswer: 0, explanation: 'UX validation.' },
      { id: 'q3', type: MC, question: 'Module 10 save name…', options: ['Module 10 — Puzzle World', 'RPG Inventory', 'Living Location', 'Lesson 10.1'], correctAnswer: 0, explanation: 'Checkpoint.' },
      { id: 'q4', type: MC, question: 'Procedural round after win…', options: ['Picks new variant', 'Deletes player', 'Stops server', 'Publishes'], correctAnswer: 0, explanation: 'Replay loop.' },
      { id: 'q5', type: MC, question: 'No dead-ends means…', options: ['Players always have path forward', 'No puzzles', 'Kill zone', 'Empty map'], correctAnswer: 0, explanation: 'Fair design.' },
      { id: 'q6', type: MC, question: 'Lesson 10.6 completes…', options: ['Module 10 Magic of Details', 'Module 12', 'Module 1', 'UK translation'], correctAnswer: 0, explanation: 'End module 10.' },
      { id: 'q7', type: MC, question: 'Clean folders help…', options: ['Team maintenance', 'Lag only', 'Remove UI', 'Ban'], correctAnswer: 0, explanation: 'Organization.' },
      { id: 'q8', type: MC, question: 'Door reward uses…', options: ['Tween from 10.2', 'Only chat', 'Terrain', 'Atmosphere'], correctAnswer: 0, explanation: 'Polish moment.' },
      { id: 'q9', type: MC, question: 'Module 11 preview is…', options: ['Performance and polish', 'Only NPC', 'Only race', 'Nothing'], correctAnswer: 0, explanation: 'Next module.' },
      { id: 'q10', type: MC, question: 'Checkpoint prioritizes…', options: ['Coherent player journey', 'Most scripts possible', 'No testing', 'Random only'], correctAnswer: 0, explanation: 'Experience quality.' },
    ],
  },
}
