/** Rich EN content for Roblox Module 06 - lessons 6.1-6.3 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson61 = {
  lessonId: 'lesson-roblox-6-1',
  moduleId: 'module-06',
  order: 1,
  title: '6.1 - Car from Scratch',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Build a StarterCar model with chassis, wheels, and VehicleSeat',
    'Attach parts with WeldConstraint',
    'Tune MaxSpeed, Torque, and TurnSpeed for beginners',
    'Test drive stability on flat ground',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Module 6 - Faster, Higher, Further** - you build a **drivable car**, then a track, then a timer.

**Lesson flow:**
1. **Theory (40 min)** - VehicleSeat + welds
2. **Practice (~25 min)** - StarterCar you can drive
3. **Quiz (10 min)** - **70%** pass

New place: **Baseplate** or flat area on your island → \`Lesson 6.1 - Starter Car\`.`,
      },
      {
        title: 'Car parts you need',
        content: `| Part | Role |
|------|------|
| **Chassis** | Main body (heavy, low) |
| **4 Wheels** | Touch ground, visual |
| **VehicleSeat** | Player sits here - drives the car |

**Model** \`StarterCar\` in Workspace (later move to \`ReplicatedStorage\` for spawning).

**Not a normal Seat** - VehicleSeat has throttle and steering built in.`,
      },
      {
        title: 'Build the chassis and wheels',
        content: `**Chassis:**
- Block \`6, 1, 10\` studs
- Material Metal, grey
- Name \`Chassis\`

**Wheels (4):**
- Size \`2, 2, 1\`
- Cylinder shape (rotate 90°) or block
- Names \`Wheel_FL\`, \`Wheel_FR\`, \`Wheel_RL\`, \`Wheel_RR\`
- Place at corners, slightly below chassis

**Exercise (10 min):** Group all parts into Model \`StarterCar\` - Move tool on whole model.`,
      },
      {
        title: 'WeldConstraint - glue parts',
        content: `Each wheel → **WeldConstraint** to chassis:

1. Select wheel + chassis
2. **Create** → WeldConstraint (or Constraint menu)
3. Repeat for all 4 wheels
4. **VehicleSeat** on top of chassis - weld to chassis

\`\`\`lua
-- Optional: script verifies welds exist
for _, w in ipairs(car:GetDescendants()) do
    if w:IsA("WeldConstraint") then
        print("Weld ok:", w.Parent.Name)
    end
end
\`\`\`

**Before driving:** unanchor **wheels and chassis** (VehicleSeat unanchors car when occupied).`,
      },
      {
        title: 'VehicleSeat tuning',
        content: `Select **VehicleSeat** - Properties:

| Property | Beginner start |
|----------|----------------|
| **MaxSpeed** | 40-60 |
| **Torque** | 2-4 |
| **TurnSpeed** | 1-2 |
| **SeatMaterial** | Fabric or Plastic |

**Too fast** = crashes into walls. **Too slow** = boring track.

**Exercise (5 min):** Play → sit in seat (click seat or walk into car) → WASD or arrow keys to drive.`,
      },
      {
        title: 'Stability tips',
        content: `**Flips?**
- Lower chassis (wide and flat)
- Spread wheels wider
- Lower **CenterOfMass** - insert Attachment + set in chassis (advanced) or keep mass low on top

**Wheels fall off?**
- Missing WeldConstraint
- Parts still anchored separately wrong

**Cannot enter seat?**
- Seat not welded / floating
- Another part blocking seat

**Test drive checklist:**
- [ ] Forward and reverse
- [ ] Left/right turn
- [ ] Brake (S or down throttle)`,
      },
      {
        title: 'Prefab for later',
        content: `When car works:
1. Move \`StarterCar\` to **ReplicatedStorage**
2. Clone to track start on Lesson 6.2

Or leave in Workspace at spawn for now.

**CanCollide** on wheels true; chassis true.

**Before practice checklist:**
- [ ] Model StarterCar with 6 parts + welds
- [ ] Drivable in Play without parts falling off
- [ ] Save: \`Lesson 6.1 - Starter Car\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Using Seat instead of VehicleSeat', explanation: 'Seat does not drive wheels.', correctApproach: 'VehicleSeat for cars' },
    { mistake: 'Forgot to weld wheels', explanation: 'Wheels roll away when car moves.', correctApproach: 'WeldConstraint each wheel to chassis' },
    { mistake: 'Everything anchored true', explanation: 'Car cannot move.', correctApproach: 'Unanchor car parts for physics drive' },
    { mistake: 'MaxSpeed 200 for first test', explanation: 'Uncontrollable for learners.', correctApproach: 'Start 40-60 MaxSpeed' },
  ],
  summary: `You built StarterCar with chassis, four welded wheels, and a tuned VehicleSeat - your first drivable vehicle ready for the race track in the next lesson.`,
  practiceTask: {
    title: 'Build StarterCar (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** One stable drivable car.

### Part A - Body (10 min)
1. Model \`StarterCar\` - chassis + 4 wheels positioned
2. VehicleSeat on top, welded

### Part B - Tune (10 min)
1. MaxSpeed ~50, Torque ~3, TurnSpeed ~1.5
2. Play - drive 30 seconds on baseplate
3. Fix flips / detached wheels

### Part C - Save (5 min)
1. Move to ReplicatedStorage optional
2. **Save to Roblox** → \`Lesson 6.1 - Starter Car\`
3. **Practice complete**`,
    hints: [
      'Weld before unanchoring for final test',
      'If wild physics, halve MaxSpeed first',
      'Sit in VehicleSeat by clicking it in Play',
    ],
    optionalChallenge: 'Script toggles Safe (slow) vs Fast seat presets.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Drivable cars use…', options: ['VehicleSeat', 'SpawnLocation only', 'ClickDetector', 'Terrain'], correctAnswer: 0, explanation: 'VehicleSeat has drive inputs.' },
      { id: 'q2', type: MC, question: 'WeldConstraint…', options: ['Joins parts rigidly', 'Adds coins', 'Saves DataStore', 'Kills player'], correctAnswer: 0, explanation: 'Keeps wheels on chassis.' },
      { id: 'q3', type: MC, question: 'MaxSpeed controls…', options: ['Top driving speed', 'Jump height', 'Coin value', 'Sky color'], correctAnswer: 0, explanation: 'Seat property for speed cap.' },
      { id: 'q4', type: MC, question: 'Anchored true on driving car…', options: ['Prevents movement', 'Required always', 'Adds HP', 'Opens UI'], correctAnswer: 0, explanation: 'Physics needs unanchored parts.' },
      { id: 'q5', type: MC, question: 'StarterCar should be a…', options: ['Model', 'Script only', 'Sound only', 'Atmosphere'], correctAnswer: 0, explanation: 'Grouped vehicle prefab.' },
      { id: 'q6', type: MC, question: 'Wide low chassis helps…', options: ['Prevent flipping', 'Delete track', 'Remove seat', 'Ban players'], correctAnswer: 0, explanation: 'Stability.' },
      { id: 'q7', type: MC, question: 'Module 6 focus is…', options: ['Racing', 'Only combat', 'Only tycoon', 'Publishing'], correctAnswer: 0, explanation: 'Racing module.' },
      { id: 'q8', type: MC, question: 'Four wheels are for…', options: ['Stability and look', 'Flying only', 'Swimming', 'UI'], correctAnswer: 0, explanation: 'Car layout.' },
      { id: 'q9', type: MC, question: 'Torque affects…', options: ['Acceleration power', 'Leaderboard', 'Lap count', 'Heal amount'], correctAnswer: 0, explanation: 'Seat drive property.' },
      { id: 'q10', type: MC, question: 'Lesson 6.1 save name…', options: ['Lesson 6.1 - Starter Car', 'Arena Ready', 'Race Track', 'Tycoon Works'], correctAnswer: 0, explanation: 'Save car lesson.' },
    ],
  },
}

export const enLesson62 = {
  lessonId: 'lesson-roblox-6-2',
  moduleId: 'module-06',
  order: 2,
  title: '6.2 - Race Track',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Design a readable circuit with start line and barriers',
    'Build modular track segments with consistent lane width',
    'Place checkpoint gates and direction signs',
    'Playtest five laps for driveability',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `A car without a track is a parking lot. Today you build a **circuit** your StarterCar can lap.

**Lesson flow:**
1. **Theory (40 min)** - track design
2. **Practice (~25 min)** - first circuit
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 6.1 - Starter Car**.`,
      },
      {
        title: 'Readable track design',
        content: `Good teen-friendly tracks have:

| Feature | Why |
|---------|-----|
| **Wide lanes** | Recovery from mistakes |
| **Clear start** | Everyone knows where to begin |
| **Guard rails** | No falling off island |
| **Gentle turns** | Match car TurnSpeed |

**Avoid:** hairpin at MaxSpeed 60, narrow bridges first version.`,
      },
      {
        title: 'Modular segments',
        content: `Folder \`Track\`:

\`Straight_32\` - 32 stud road part
\`Turn_45\` - 45° bend
\`Turn_90\` - 90° bend

**Duplicate** segments - snap with Move grid **4 studs**.

**Road:** dark asphalt color, \`Anchored true\`, slight rise on edges for curbs.

**Lane width:** **16-20 studs** minimum for StarterCar.`,
      },
      {
        title: 'Start line and barriers',
        content: `**StartLine** - white neon parts across track width.

**Barriers:**
- Red neon walls on **outside** edges only
- **Anchored true**, CanCollide true
- Height \`3-4 studs\` - stops cars leaving track

**Recovery zone:** extra flat asphalt outside sharp turns.

**Exercise (8 min):** Place StarterCar on StartLine - drive one lap slowly.`,
      },
      {
        title: 'Checkpoints and signs',
        content: `Place **3-4** gate parts \`CP_1\`, \`CP_2\`, \`CP_3\` around the lap:
- Neon arches over track
- Numbered on sign
- **CanCollide false** (drive through)

**Arrows** on ground before confusing turns.

These prepare **Lesson 6.5** lap validation - today visual only.

**Wrong-way sign** optional at one-way sections.`,
      },
      {
        title: 'Five-lap playtest',
        content: `**You** drive 5 laps:

| Check | Pass? |
|-------|-------|
| Complete lap without leaving track | |
| No getting stuck on seams | |
| Turns fair at current MaxSpeed | |
| Barriers stop flying off map | |
| Fun to drive repeated laps | |

**Fix geometry** before timers in 6.3 - do not tune timer on broken track.`,
      },
      {
        title: 'Car placement on track',
        content: `Park \`StarterCar\` on StartLine:
- Facing first turn
- Slightly before line (fair start)

Later: clone from ReplicatedStorage at race start.

**Folder structure:**
\`Workspace/Track/\` - all road parts
\`Workspace/Track/Props/\` - signs, CP gates`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Full loop circuit (no dead ends)
- [ ] StartLine + 3 checkpoints visible
- [ ] 5-lap test done, notes written
- [ ] Save: \`Lesson 6.2 - Race Track\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Lane too narrow', explanation: 'Frustrating for new drivers.', correctApproach: '16+ studs wide' },
    { mistake: 'Gaps between road parts', explanation: 'Car launches or snags.', correctApproach: 'Snap grid, overlap slightly' },
    { mistake: 'No barriers on cliff edge', explanation: 'Cars fall forever.', correctApproach: 'Walls on dangerous sides' },
    { mistake: 'Track not closed loop', explanation: 'No lap concept.', correctApproach: 'Circuit returns to start' },
  ],
  summary: `You designed a modular race circuit with start line, barriers, checkpoint gates, and passed a five-lap drive test - the track is ready for race timers next lesson.`,
  practiceTask: {
    title: 'First circuit (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Drivable closed loop with guides.

### Part A - Layout (12 min)
1. Folder \`Track\` - straight + 2 turn types
2. Closed loop ~60-120 stud perimeter
3. StartLine at start/finish area

### Part B - Safety & guides (8 min)
1. Outside barriers on risky edges
2. CP_1, CP_2, CP_3 gates + 2 arrow signs

### Part C - Playtest & save (5 min)
1. Five laps - fix stuck spots
2. **Save to Roblox** → \`Lesson 6.2 - Race Track\`
3. **Practice complete**`,
    hints: [
      'Drive slow first lap to feel width',
      'Elevated curbs help see track edges',
      'Same road height for all segments',
    ],
    optionalChallenge: 'Risky shortcut path - faster but narrower.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Race track should be…', options: ['A closed loop circuit', 'One straight only', 'Empty baseplate', 'Underwater'], correctAnswer: 0, explanation: 'Laps need a loop.' },
      { id: 'q2', type: MC, question: 'Wide lanes help…', options: ['Recovery from mistakes', 'Deleting car', 'More lava', 'No UI'], correctAnswer: 0, explanation: 'Forgiving design.' },
      { id: 'q3', type: MC, question: 'Barriers on outside edges…', options: ['Stop cars leaving track', 'Block start', 'Remove seat', 'Disable drive'], correctAnswer: 0, explanation: 'Safety walls.' },
      { id: 'q4', type: MC, question: 'Checkpoints prepare for…', options: ['Lap order validation later', 'Terrain only', 'Combat', 'Shop'], correctAnswer: 0, explanation: 'Used in lap systems.' },
      { id: 'q5', type: MC, question: 'Five-lap test finds…', options: ['Stuck spots and unfair turns', 'Robux', 'DataStore bugs', 'Skybox'], correctAnswer: 0, explanation: 'QA before timers.' },
      { id: 'q6', type: MC, question: 'StartLine shows…', options: ['Where races begin', 'Shop location', 'Spawn only', 'Kill zone'], correctAnswer: 0, explanation: 'Clear race start.' },
      { id: 'q7', type: MC, question: 'Track parts should be…', options: ['Anchored true', 'Unanchored all', 'Invisible', 'Scripts only'], correctAnswer: 0, explanation: 'Road does not move.' },
      { id: 'q8', type: MC, question: 'Modular segments allow…', options: ['Consistent reuse and edits', 'Random sizes', 'No turns', 'Flying'], correctAnswer: 0, explanation: 'Build efficiently.' },
      { id: 'q9', type: MC, question: 'Lesson 6.2 builds on…', options: ['Lesson 6.1 car', 'Only obby', 'Only coins', 'NPC only'], correctAnswer: 0, explanation: 'Need drivable car.' },
      { id: 'q10', type: MC, question: 'Lesson 6.2 save name…', options: ['Lesson 6.2 - Race Track', 'Starter Car', 'Race Timer', 'Arena Ready'], correctAnswer: 0, explanation: 'Save track lesson.' },
    ],
  },
}

export const enLesson63 = {
  lessonId: 'lesson-roblox-6-3',
  moduleId: 'module-06',
  order: 3,
  title: '6.3 - Race Timer',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Start race timer on RaceStart touch',
    'Stop timer on RaceFinish and show elapsed time',
    'Display live lap time on ScreenGui HUD',
    'Track session best time per player',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Fast driving is fun. **Timed driving** is a game.

**Lesson flow:**
1. **Theory (40 min)** - start/finish + os.clock + HUD
2. **Practice (~25 min)** - timed circuit with best lap
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 6.2 - Race Track** with StarterCar.`,
      },
      {
        title: 'Race timer flow',
        content: `| Step | What happens |
|------|----------------|
| 1 | Player crosses **RaceStart** → save \`startTime\` |
| 2 | Timer runs - HUD updates |
| 3 | Cross **RaceFinish** → compute elapsed |
| 4 | Compare to **session best** |

**One lap** = start to finish on same line (simple circuit).`,
      },
      {
        title: 'RaceStart and RaceFinish parts',
        content: `Parts on track (CanCollide false, thin neon):

\`RaceStart\` - green, at start line
\`RaceFinish\` - checkered pattern or red, **same line** for lap 1

For single lap timing, Start and Finish can be **same pad** with two scripts OR one pad that toggles state.

**Simpler:** one pad \`StartFinish\` - first touch starts, second touch stops (same lap).`,
      },
      {
        title: 'Server timing script',
        content: `\`RaceStart\` - **Script**:

\`\`\`lua
local startPad = script.Parent
local racing = {} -- [player] = startTime

startPad.Touched:Connect(function(hit)
    local seat = hit.Parent:FindFirstChildWhichIsA("VehicleSeat", true)
    if not seat then return end

    local character = seat.Parent
    local player = game:GetService("Players"):GetPlayerFromCharacter(character)
    if not player then return end

    if racing[player] then return end -- already racing

    racing[player] = os.clock()
    print(player.Name .. " race started")
end)
\`\`\`

Detect **VehicleSeat** touch so only cars trigger, not walking players.`,
      },
      {
        title: 'RaceFinish stop logic',
        content: `\`RaceFinish\` Script:

\`\`\`lua
local finishPad = script.Parent
local racing = -- shared or _G / module; lesson: find start script state

finishPad.Touched:Connect(function(hit)
    local seat = hit.Parent:FindFirstChildWhichIsA("VehicleSeat", true)
    if not seat then return end

    local player = game.Players:GetPlayerFromCharacter(seat.Parent)
    if not player then return end

    local startTime = racing[player]
    if not startTime then
        print("Finish ignored - race not started")
        return
    end

    local elapsed = os.clock() - startTime
    racing[player] = nil

    print(player.Name .. " finished: " .. string.format("%.2f", elapsed) .. "s")
    -- Fire to client for HUD / best time
end)
\`\`\`

**Better:** one **RaceService** script in ServerScriptService holds \`racing\` table for both pads.`,
      },
      {
        title: 'HUD - live timer LocalScript',
        content: `**StarterGui** → \`RaceUI\` → \`TimeLabel\`

LocalScript (simplified - uses attribute or RemoteEvent later):

For lesson, **LocalScript** polls a **NumberValue** \`RaceTime\` in player replicated by server, OR pure local timer after start touch on client pad copy.

**Simple local-only practice** (solo):

\`\`\`lua
local label = script.Parent
local running = false
local startTime = 0

-- Connect to start/finish via BindableEvent in ReplicatedStorage for lesson bridge
\`\`\`

**Minimum:** server prints time; add \`TimeLabel\` updated from server via \`player:SetAttribute("RaceElapsed", elapsed)\` each 0.05s in server loop.

\`\`\`lua
-- Server after start:
task.spawn(function()
    while racing[player] do
        player:SetAttribute("RaceElapsed", os.clock() - racing[player])
        task.wait(0.05)
    end
end)
\`\`\`

Client reads attribute - updates label.`,
      },
      {
        title: 'Session best time',
        content: `\`\`\`lua
local best = player:GetAttribute("RaceBest") or math.huge
if elapsed < best then
    player:SetAttribute("RaceBest", elapsed)
    print("New best lap!")
end
\`\`\`

**BestLabel:** \`Best: 42.35s\`

**Prevent finish before start:** if no \`racing[player]\`, ignore finish touch.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Start only fires once per lap attempt
- [ ] Finish ignored if race not started
- [ ] HUD or Output shows elapsed time
- [ ] Best time updates when beaten
- [ ] Save: \`Lesson 6.3 - Race Timer\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Finish fires before start', explanation: 'elapsed nonsense.', correctApproach: 'Require racing[player] exists' },
    { mistake: 'Walking player starts race', explanation: 'Not in car.', correctApproach: 'Detect VehicleSeat in hit' },
    { mistake: 'Timer never stops', explanation: 'racing[player] not cleared.', correctApproach: 'nil after finish' },
    { mistake: 'Client-only trusted time', explanation: 'Exploitable.', correctApproach: 'Server os.clock for official time' },
  ],
  summary: `You wired RaceStart and RaceFinish with server os.clock timing, live HUD via attributes, and session best lap tracking - your circuit is now a timed race.`,
  practiceTask: {
    title: 'Timed circuit (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Start → drive lap → finish time + best.

### Part A - Start/Finish pads (8 min)
1. RaceStart + RaceFinish (or combined flow)
2. Server racing table + VehicleSeat detection

### Part B - Timing (12 min)
1. Finish computes elapsed, clears state
2. Attribute RaceElapsed for HUD
3. RaceBest updates on new record

### Part C - Test & save (5 min)
1. Three laps - beat your best once
2. **Save to Roblox** → \`Lesson 6.3 - Race Timer\`
3. **Practice complete**`,
    hints: [
      'One RaceService script beats two disconnected tables',
      'Print "finish ignored" when testing order',
      'Use same start/finish line for first lap simplicity',
    ],
    optionalChallenge: 'Split pad at halfway shows split time.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Race timer uses…', options: ['os.clock on server', 'BrickColor only', 'Terrain paint', 'Atmosphere'], correctAnswer: 0, explanation: 'Elapsed time measurement.' },
      { id: 'q2', type: MC, question: 'Finish ignored if…', options: ['Race never started', 'Car is fast', 'Track is long', 'UI exists'], correctAnswer: 0, explanation: 'No startTime saved.' },
      { id: 'q3', type: MC, question: 'VehicleSeat detection ensures…', options: ['Car crossed line not walking', 'Flying', 'Swimming', 'Shop'], correctAnswer: 0, explanation: 'Car-only triggers.' },
      { id: 'q4', type: MC, question: 'Session best updates when…', options: ['New time is lower', 'Always', 'Never', 'On death'], correctAnswer: 0, explanation: 'Lower is faster.' },
      { id: 'q5', type: MC, question: 'racing[player] = nil after finish…', options: ['Allows next race start', 'Deletes player', 'Removes car', 'Publishes'], correctAnswer: 0, explanation: 'Reset state.' },
      { id: 'q6', type: MC, question: 'Live HUD can read…', options: ['Player attributes from server', 'Only chat', 'Terrain', 'Kill blocks'], correctAnswer: 0, explanation: 'Replicated attributes.' },
      { id: 'q7', type: MC, question: 'RaceStart saves…', options: ['startTime with os.clock', 'Robux', 'Lap count', 'Weapon damage'], correctAnswer: 0, explanation: 'Timestamp at start.' },
      { id: 'q8', type: MC, question: 'Official race time should be…', options: ['Calculated on server', 'Client chat only', 'Random', 'Guess'], correctAnswer: 0, explanation: 'Server authority.' },
      { id: 'q9', type: MC, question: 'Lesson 6.3 needs…', options: ['Track from 6.2 and car from 6.1', 'Only sword', 'Only coins', 'Empty'], correctAnswer: 0, explanation: 'Full race setup.' },
      { id: 'q10', type: MC, question: 'Lesson 6.3 save name…', options: ['Lesson 6.3 - Race Timer', 'Race Track', 'Starter Car', 'Obby Ready'], correctAnswer: 0, explanation: 'Save timer lesson.' },
    ],
  },
}

export const enLesson64 = {
  lessonId: 'lesson-roblox-6-4',
  moduleId: 'module-06',
  order: 4,
  title: '6.4 - Client-Server: First Look',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Explain client vs server roles in a racing game',
    'Create RaceEvent RemoteEvent in ReplicatedStorage',
    'FireServer from client and validate on server',
    'Use FireClient for trusted UI updates from server',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Until now, timing lived mostly on the **server**. Today you connect **client UI** and **server truth** with **RemoteEvents**.

**Lesson flow:**
1. **Theory (40 min)** - two worlds + RaceEvent
2. **Practice (~25 min)** - event-driven race flow
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 6.3 - Race Timer**.`,
      },
      {
        title: 'Two worlds in Roblox',
        content: `| Side | Runs on | Good for |
|------|---------|----------|
| **Client** | Player device | HUD, input, camera, sounds |
| **Server** | Roblox host | Rules, scoring, anti-cheat |

**Racing rule:** client may **request** "I crossed finish" - server **decides** if it is true and what the time is.

**Never** let client set official lap time with \`FireServer(1.0)\` as the final score.`,
      },
      {
        title: 'What each side owns',
        content: `**Client owns:**
- Updating \`TimeLabel\` every frame
- Button "Ready to race"
- Showing "Final Lap!" banner

**Server owns:**
- \`racing[player]\` start time
- Checkpoint order validation
- Winner announcement
- Leaderstats \`Laps\` value

If client and server disagree, **server wins**.`,
      },
      {
        title: 'RemoteEvent setup',
        content: `**ReplicatedStorage** → insert **RemoteEvent** → rename \`RaceEvent\`

Both client and server can see it after replication.

**Naming actions** (strings):
- \`"StartRace"\`
- \`"FinishRace"\`
- \`"UpdateHUD"\` (server → client)

Keep names short and **exact** - typos break games silently.`,
      },
      {
        title: 'Client → server: FireServer',
        content: `**StarterGui** → \`RaceUI\` → **LocalScript**:

\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local raceEvent = ReplicatedStorage:WaitForChild("RaceEvent")

local readyButton = script.Parent:WaitForChild("ReadyButton")

readyButton.MouseButton1Click:Connect(function()
    raceEvent:FireServer("StartRace")
end)
\`\`\`

**ServerScriptService** → \`RaceServer\` Script:

\`\`\`lua
local raceEvent = game.ReplicatedStorage:WaitForChild("RaceEvent")
local racing = {}

raceEvent.OnServerEvent:Connect(function(player, action)
    print("[RaceEvent]", player.Name, action)

    if action == "StartRace" then
        if racing[player] then return end
        racing[player] = os.clock()
        raceEvent:FireClient(player, "RaceStarted")
    end
end)
\`\`\`

Server **logs** every action while you build.`,
      },
      {
        title: 'Server → client: FireClient',
        content: `After server validates finish:

\`\`\`lua
raceEvent:FireClient(player, "RaceFinished", elapsed, isNewBest)
\`\`\`

Client LocalScript:

\`\`\`lua
raceEvent.OnClientEvent:Connect(function(action, ...)
    if action == "RaceStarted" then
        script.Parent.TimeLabel.Text = "GO!"
    elseif action == "RaceFinished" then
        local elapsed, isNewBest = ...
        script.Parent.TimeLabel.Text = string.format("Time: %.2fs", elapsed)
        if isNewBest then
            script.Parent.BestLabel.Text = "NEW BEST!"
        end
    end
end)
\`\`\`

**Display only** - numbers came from server, not guessed on client.`,
      },
      {
        title: 'Security mindset',
        content: `**Bad (exploitable):**
\`\`\`lua
-- Server blindly trusts client time
raceEvent.OnServerEvent:Connect(function(player, action, clientTime)
    if action == "FinishRace" then
        saveBest(clientTime) -- HACK: player sends 0.01
    end
end)
\`\`\`

**Good:**
- Server detects pad touch OR server tracks checkpoints
- Server computes \`os.clock() - start\`
- Client only shows result via \`FireClient\`

**Teen rule:** *Client suggests. Server decides.*`,
      },
      {
        title: 'Refactor Lesson 6.3 timer',
        content: `Move \`racing\` table to **RaceServer** in ServerScriptService.

Pads call internal functions - not separate disconnected tables.

Flow:
1. Pad touch → server starts timer
2. Finish touch → server computes time → \`FireClient\` with result
3. Client updates labels

**Before practice checklist:**
- [ ] RaceEvent in ReplicatedStorage
- [ ] Server prints all incoming actions
- [ ] Finish time never sent from client as authority
- [ ] Save: \`Lesson 6.4 - Client Server Race\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'RemoteEvent in Workspace only', explanation: 'Clients may not see it reliably.', correctApproach: 'ReplicatedStorage for shared events' },
    { mistake: 'Trusting client finish time', explanation: 'Exploiters fake fast times.', correctApproach: 'Server os.clock on validated touch' },
    { mistake: 'Typo in action string', explanation: 'Server ignores event.', correctApproach: 'Constants table for action names' },
    { mistake: 'LocalScript in ServerScriptService', explanation: 'Never runs for players.', correctApproach: 'LocalScript under StarterGui' },
  ],
  summary: `You connected RaceEvent RemoteEvent so clients request race actions, the server validates and owns timing, and FireClient pushes trusted results to the HUD - the foundation for fair multiplayer racing.`,
  practiceTask: {
    title: 'Event-driven race flow (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** RemoteEvent path with server authority.

### Part A - Setup (8 min)
1. \`RaceEvent\` in ReplicatedStorage
2. \`RaceServer\` script with \`racing\` table
3. ReadyButton → FireServer("StartRace")

### Part B - Two-way events (12 min)
1. Server starts timer on valid StartRace
2. Finish pad → server computes time → FireClient("RaceFinished", elapsed)
3. Client updates TimeLabel / BestLabel from server data

### Part C - Test & save (5 min)
1. Output shows server logs for each action
2. **Save to Roblox** → \`Lesson 6.4 - Client Server Race\`
3. **Practice complete**`,
    hints: [
      'Print player + action on every OnServerEvent',
      'Keep Lesson 6.3 pad logic but centralize in RaceServer',
      'FireClient only after server computed elapsed',
    ],
    optionalChallenge: 'Broadcast "Player X finished" to all clients with FireAllClients.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Server is trusted for…', options: ['Final race rules and scores', 'Only graphics', 'Only music', 'Camera only'], correctAnswer: 0, explanation: 'Authoritative game logic.' },
      { id: 'q2', type: MC, question: 'RemoteEvent lives in…', options: ['ReplicatedStorage', 'Lighting only', 'Terrain', 'StarterPack'], correctAnswer: 0, explanation: 'Replicated to client and server.' },
      { id: 'q3', type: MC, question: 'FireServer sends…', options: ['Client request to server', 'Server to all clients only', 'Terrain data', 'Welds'], correctAnswer: 0, explanation: 'Client → server.' },
      { id: 'q4', type: MC, question: 'FireClient sends…', options: ['Server message to one player', 'Exploit', 'Delete car', 'Save place'], correctAnswer: 0, explanation: 'Server → specific client.' },
      { id: 'q5', type: MC, question: 'Client should not send…', options: ['Trusted official lap time as fact', 'Button clicks', 'UI requests', 'Ready signal'], correctAnswer: 0, explanation: 'Server calculates time.' },
      { id: 'q6', type: MC, question: 'LocalScript runs on…', options: ['Player client', 'Server only', 'Roblox website', 'DataStore'], correctAnswer: 0, explanation: 'Client-side scripts.' },
      { id: 'q7', type: MC, question: 'OnServerEvent runs on…', options: ['Server', 'Client HUD only', 'Both equally', 'Terrain'], correctAnswer: 0, explanation: 'Server handles FireServer.' },
      { id: 'q8', type: MC, question: 'Racing games need both sides because…', options: ['Fast UI + trusted rules', 'No scripts', 'Only welds', 'Only coins'], correctAnswer: 0, explanation: 'Client display + server truth.' },
      { id: 'q9', type: MC, question: 'Lesson 6.4 builds on…', options: ['Lesson 6.3 timer', 'Only obby', 'Only tycoon', 'Empty place'], correctAnswer: 0, explanation: 'Adds networking layer.' },
      { id: 'q10', type: MC, question: 'Lesson 6.4 save name…', options: ['Lesson 6.4 - Client Server Race', 'Race Timer', 'Starter Car', 'Arena Ready'], correctAnswer: 0, explanation: 'Save networking lesson.' },
    ],
  },
}

export const enLesson65 = {
  lessonId: 'lesson-roblox-6-5',
  moduleId: 'module-06',
  order: 5,
  title: '6.5 - Laps and Leaderboard',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Track ordered checkpoints CP_1 → CP_2 → CP_3 → Finish',
    'Increment Laps leaderstat only on valid full lap',
    'Show lap progress on HUD and leaderboard',
    'Declare winner at target laps with time tie-breaker',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `One timed lap is a sprint. **Three laps with checkpoint order** is a real race.

**Lesson flow:**
1. **Theory (40 min)** - lap rules + leaderstats
2. **Practice (~25 min)** - 3-lap race logic
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 6.4 - Client Server Race**.`,
      },
      {
        title: 'Fair lap rules',
        content: `Without order, players skip half the track.

**Required:**
| Rule | Why |
|------|-----|
| Checkpoints in order | No shortcuts |
| Finish only after last CP | Valid lap completion |
| Reset CP index after lap | Next lap starts clean |
| Target laps (e.g. 3) | Clear win condition |

**Track from 6.2:** \`CP_1\`, \`CP_2\`, \`CP_3\` → then \`RaceFinish\`.`,
      },
      {
        title: 'Per-player checkpoint state',
        content: `In **RaceServer**:

\`\`\`lua
local progress = {} -- [player] = nextCheckpointIndex

local ORDER = {
    [1] = workspace.Track.CP_1,
    [2] = workspace.Track.CP_2,
    [3] = workspace.Track.CP_3,
    [4] = workspace.Track.RaceFinish,
}

local function resetProgress(player)
    progress[player] = 1
end
\`\`\`

On race start → \`resetProgress(player)\`.

Wrong CP touched → print warning, **no advance**.`,
      },
      {
        title: 'Checkpoint touch handler',
        content: `For each CP part, **Script** or one central loop:

\`\`\`lua
cp.Touched:Connect(function(hit)
    local seat = hit.Parent:FindFirstChildWhichIsA("VehicleSeat", true)
    if not seat then return end

    local player = game.Players:GetPlayerFromCharacter(seat.Parent)
    if not player then return end

    local expected = progress[player]
    if not expected then return end

    local expectedPart = ORDER[expected]
    if hit:IsDescendantOf(expectedPart) or hit.Parent == expectedPart then
        print(player.Name, "hit CP", expected)
        progress[player] = expected + 1
    else
        print(player.Name, "wrong checkpoint order")
    end
end)
\`\`\`

When \`progress[player]\` becomes **5** (past finish index), you incremented lap - see next section.`,
      },
      {
        title: 'Increment laps on finish',
        content: `When player crosses **RaceFinish** and \`expected == 4\`:

\`\`\`lua
local leaderstats = player:FindFirstChild("leaderstats")
local laps = leaderstats and leaderstats:FindFirstChild("Laps")
if laps then
    laps.Value += 1
end

local TARGET_LAPS = 3
if laps.Value >= TARGET_LAPS then
    print(player.Name .. " WINS!")
    raceEvent:FireClient(player, "YouWin")
end

resetProgress(player) -- next lap if race continues
\`\`\`

Create **leaderstats** on join if missing:

\`\`\`lua
local ls = Instance.new("Folder")
ls.Name = "leaderstats"
ls.Parent = player
local laps = Instance.new("IntValue")
laps.Name = "Laps"
laps.Value = 0
laps.Parent = ls
\`\`\``,
      },
      {
        title: 'HUD lap display',
        content: `**RaceUI** labels:
- \`LapLabel\` → \`Lap 2 / 3\`
- \`CPHint\` → \`Next: CP_2\`

Update from:
- \`GetPropertyChangedSignal\` on Laps IntValue (client)
- Or \`FireClient("LapUpdate", current, target)\` from server

**Leaderboard** automatically shows \`Laps\` when in leaderstats.

**Final Lap banner:** when \`laps.Value == TARGET_LAPS - 1\` and new lap starts → show "FINAL LAP!"`,
      },
      {
        title: 'Winner and tie-breaker',
        content: `**Win condition:** first to \`TARGET_LAPS\` (3).

**Tie at same lap count?**
- Compare **total race time** (server tracked from first StartRace)
- Lower total time wins

\`\`\`lua
-- Optional total timer per player
local raceStartTotal = {} -- on first StartRace of match
\`\`\`

Announce winner in **StatusLabel** for all players via \`FireAllClients\`.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Skipping CP_2 does not count lap
- [ ] Laps leaderstat increments only on valid finish
- [ ] HUD shows lap X / 3
- [ ] Winner prints at 3 laps
- [ ] Save: \`Lesson 6.5 - Laps Leaderboard\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Finish without CP_3', explanation: 'Lap skip exploit.', correctApproach: 'Require expected == finish index' },
    { mistake: 'Never reset progress after lap', explanation: 'Stuck on finish index.', correctApproach: 'resetProgress after each lap' },
    { mistake: 'Laps on client only', explanation: 'Not on leaderboard.', correctApproach: 'leaderstats on server' },
    { mistake: 'Walking player triggers CP', explanation: 'False progress.', correctApproach: 'VehicleSeat check' },
  ],
  summary: `You implemented ordered checkpoint lap tracking with Laps leaderstats, HUD progress, and a three-lap winner rule - players can no longer skip the track to cheat a victory.`,
  practiceTask: {
    title: '3-lap race logic (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Fair multi-lap race with leaderboard.

### Part A - State (10 min)
1. progress[player] + ORDER table in RaceServer
2. leaderstats.Laps on PlayerAdded
3. Touch handlers on CP_1..3 and RaceFinish

### Part B - Rules (10 min)
1. Wrong order → no advance
2. Valid finish → Laps += 1, reset progress
3. LapLabel shows current / 3

### Part C - Win test (5 min)
1. Drive 3 valid laps - see winner message
2. Try skip CP_2 - lap must not count
3. **Save to Roblox** → \`Lesson 6.5 - Laps Leaderboard\`
4. **Practice complete**`,
    hints: [
      'Test wrong-order touch before celebrating lap logic',
      'Print expected index on every CP touch',
      'TARGET_LAPS = 3 keeps scope small',
    ],
    optionalChallenge: '"FINAL LAP!" banner when starting lap 3.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Checkpoint order prevents…', options: ['Lap skipping exploits', 'Driving', 'Welds', 'Sound'], correctAnswer: 0, explanation: 'Fair path enforcement.' },
      { id: 'q2', type: MC, question: 'Laps stored in…', options: ['leaderstats IntValue', 'Terrain', 'Sky', 'Weld only'], correctAnswer: 0, explanation: 'Leaderboard integration.' },
      { id: 'q3', type: MC, question: 'After valid lap, progress resets to…', options: ['CP_1 (index 1)', 'Finish only', '999', 'nil forever'], correctAnswer: 0, explanation: 'Next lap starts at first CP.' },
      { id: 'q4', type: MC, question: 'Wrong checkpoint touch should…', options: ['Not advance progress', 'Win instantly', 'Delete car', 'Publish'], correctAnswer: 0, explanation: 'Ignore invalid order.' },
      { id: 'q5', type: MC, question: 'TARGET_LAPS = 3 means…', options: ['Win after three valid laps', 'Three players only', 'Three cars', 'Three tracks'], correctAnswer: 0, explanation: 'Win condition.' },
      { id: 'q6', type: MC, question: 'Tie-breaker can use…', options: ['Lower total race time', 'Random Robux', 'Jump height', 'BrickColor'], correctAnswer: 0, explanation: 'Faster total time wins.' },
      { id: 'q7', type: MC, question: 'VehicleSeat check ensures…', options: ['Car triggers CP not walking', 'Flying', 'Swim', 'Shop'], correctAnswer: 0, explanation: 'Racing context.' },
      { id: 'q8', type: MC, question: 'Leaderboard shows Laps because…', options: ['It is in leaderstats folder', 'It is in Lighting', 'Client only text', 'No folder'], correctAnswer: 0, explanation: 'Roblox leaderboard convention.' },
      { id: 'q9', type: MC, question: 'Lesson 6.5 needs track CPs from…', options: ['Lesson 6.2', 'Lesson 1.1 only', 'Coin sim', 'Arena'], correctAnswer: 0, explanation: 'Checkpoint gates on track.' },
      { id: 'q10', type: MC, question: 'Lesson 6.5 save name…', options: ['Lesson 6.5 - Laps Leaderboard', 'Race Timer', 'Starter Car', 'Tycoon Works'], correctAnswer: 0, explanation: 'Save laps lesson.' },
    ],
  },
}

export const enLesson66 = {
  lessonId: 'lesson-roblox-6-6',
  moduleId: 'module-06',
  order: 6,
  title: '6.6 - Checkpoint: Race Launched',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Ship Race Launched with car, track, timer, laps, and RemoteEvents',
    'Pass multiplayer QA: timer, checkpoints, winner, UI',
    'Tune car handling and race length for fair fun',
    'Deliver a demo-ready racing prototype',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Race Launched** = full Module 6 portfolio in one place.

**Required stack:**
- 6.1 StarterCar
- 6.2 Track + barriers
- 6.3 Timer + session best
- 6.4 RaceEvent client/server
- 6.5 Three-lap checkpoints + Laps leaderboard

**Lesson flow:**
1. **Theory (40 min)** - launch checklist
2. **Practice (~40 min)** - QA + final save
3. **Quiz (10 min)** - **70%** pass`,
      },
      {
        title: 'Race Launched scope',
        content: `Folder \`RaceSystems\` in ServerScriptService:
- \`RaceServer\` - timing, checkpoints, winner
- \`CarSpawner\` - clone StarterCar to StartLine

**ReplicatedStorage:**
- \`StarterCar\` model
- \`RaceEvent\`

**Workspace:**
- \`Track\` complete circuit
- \`RaceUI\` via StarterGui

**Save name:** \`Module 6 - Race Launched\``,
      },
      {
        title: 'Launch readiness checklist',
        content: `| # | Test | Pass |
|---|------|------|
| 1 | Car spawns, drives from StartLine | |
| 2 | Timer starts on race start, stops on valid finish | |
| 3 | CP order enforced - skip fails | |
| 4 | 3 laps → winner message | |
| 5 | 2 players - both see Laps on leaderboard | |
| 6 | UI readable (time, lap, best) | |

Fix **reliability** before optional polish.`,
      },
      {
        title: 'QA matrix - play like a studio',
        content: `**Solo onboarding (5 min):**
- New player sits in car within 30 seconds
- First lap completes without confusion

**2-player race (10 min):**
- Both can race without breaking each other's state
- Winner only when 3 valid laps

**Exploit test (5 min):**
- Walk through CPs on foot - no lap gain
- Touch finish first - ignored
- FireServer fake time - server ignores

**Stress (5 min):**
- 5 races back-to-back - no stuck \`racing[player]\``,
      },
      {
        title: 'Tuning for fun',
        content: `| Knob | Sweet spot |
|------|------------|
| MaxSpeed | 45-55 for this track |
| TARGET_LAPS | 3 |
| Track width | 16-20 studs |
| Race length | ~60-90 sec per lap |

**Too long** = boredom. **Too short** = no skill expression.

Ask: *Would I race again immediately?*`,
      },
      {
        title: 'Sellable classroom quality',
        content: `Demo-ready means:
- Systems work **every** test run
- Learning visible (checkpoints, timer, laps on screen)
- Clear win moment
- No scripts spamming errors in Output

**2-minute demo script:**
1. Spawn → enter car
2. Show HUD timer running
3. Complete one lap - lap counter updates
4. Show leaderboard Laps
5. Win on lap 3 - celebration UI`,
      },
      {
        title: 'Up next: Module 8',
        content: `Next up - **NPCs, dialogue, and quests** (Module 8). Your race arena can stay as a side hub, or start a fresh place for the next lessons.

**Before practice:**
- [ ] All 6 checklist rows pass
- [ ] One full recording from spawn to winner
- [ ] **Save to Roblox** → \`Module 6 - Race Launched\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Shipping with broken CP order', explanation: 'Unfair races.', correctApproach: 'Exploit test before save' },
    { mistake: 'Only tested solo once', explanation: 'Multiplayer bugs missed.', correctApproach: '2-player + stress tests' },
    { mistake: 'Too many features, broken core', explanation: 'Checkpoint fails QA.', correctApproach: 'Reliability first' },
    { mistake: 'Car still in Workspace not ReplicatedStorage', explanation: 'Spawn issues for all players.', correctApproach: 'Clone from ReplicatedStorage' },
  ],
  summary: `You integrated the full racing stack into Race Launched, passed solo and multiplayer QA, tuned lap pacing, and saved a demo-ready prototype - Module 6 is complete.`,
  practiceTask: {
    title: 'Ship Race Launched (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Pass QA + portfolio save.

### Part A - Integrate (15 min)
1. Merge 6.1-6.5 into one place
2. RaceServer + CarSpawner + RaceUI
3. Clear folder structure

### Part B - QA matrix (20 min)
1. Run all 6 checklist tests
2. 2-player race + exploit test
3. Fix any fail before continuing

### Part C - Demo save (5 min)
1. Tune MaxSpeed / track if lap too hard
2. **Save to Roblox** → \`Module 6 - Race Launched\`
3. **Practice complete** + optional 2-min recording`,
    hints: [
      'One bug at a time - retest after each fix',
      'Print statements beat guessing in Output',
      'Prioritize 3-lap win over podium extras',
    ],
    optionalChallenge: 'Podium zone teleports top 3 after race with standings board.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Race Launched includes…', options: ['Car + track + timer + laps + events', 'Only car', 'Only terrain', 'No scripts'], correctAnswer: 0, explanation: 'Full Module 6.' },
      { id: 'q2', type: MC, question: 'Exploit test checks…', options: ['Checkpoint skip fails', 'Sky color', 'Music volume', 'Font size'], correctAnswer: 0, explanation: 'Anti-shortcut.' },
      { id: 'q3', type: MC, question: 'Winner at…', options: ['3 valid laps', '1 touch', '0 time', '10 deaths'], correctAnswer: 0, explanation: 'TARGET_LAPS.' },
      { id: 'q4', type: MC, question: 'StarterCar should spawn from…', options: ['ReplicatedStorage clone', 'Terrain only', 'Chat', 'Kill brick'], correctAnswer: 0, explanation: 'Prefab pattern.' },
      { id: 'q5', type: MC, question: 'Server owns official…', options: ['Time and lap count', 'Only UI color', 'Client guesses', 'Camera'], correctAnswer: 0, explanation: 'Authority.' },
      { id: 'q6', type: MC, question: '2-player test finds…', options: ['Shared state bugs', 'Robux', 'DataStore only', 'Publishing'], correctAnswer: 0, explanation: 'Multiplayer QA.' },
      { id: 'q7', type: MC, question: 'Reliability before extras means…', options: ['Core loop works first', 'Add podium first', 'Skip QA', 'Remove track'], correctAnswer: 0, explanation: 'Checkpoint mindset.' },
      { id: 'q8', type: MC, question: 'Module 6 save name…', options: ['Module 6 - Race Launched', 'Arena Ready', 'Obby Ready', 'Coin Simulator'], correctAnswer: 0, explanation: 'Portfolio checkpoint.' },
      { id: 'q9', type: MC, question: 'Lesson 6.6 completes…', options: ['Module 6 racing', 'Module 1 only', 'Publishing only', 'UK translation'], correctAnswer: 0, explanation: 'End of module 6.' },
      { id: 'q10', type: MC, question: 'Demo should show…', options: ['Spawn to winner in ~2 min', 'Only Explorer', 'Only terrain edit', 'Empty baseplate'], correctAnswer: 0, explanation: 'Sellable demo.' },
    ],
  },
}
