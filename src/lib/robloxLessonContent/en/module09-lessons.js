/** Roblox Module 09 EN - 8 уроків (prod-92), Race + мережа */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson91 = {
 lessonId: "lesson-roblox-9-1",
 moduleId: "module-09",
 order: 1,
 title: "9.1 - Car + track",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Build a simple car on a VehicleSeat with welded wheels",
 "Build a closed track with a clear start and direction",
 "Place lap checkpoints with Index attributes for the next HUD lesson",
 "Confirm the player can sit, drive, and not fall through the floor",
 "Save the Place as the Race module base before the timer and networking lessons"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 65 of 92)",
 content: `Module 9 - **Race + networking**. Today you do not write Remotes or build a complex GUI. Today you build the **physical race scene**: a car that drives, and a track you can honestly lap.
Without this lesson, 9.2 (timer/UI) and 9.4 (finish Remote) have nothing to attach to: networking without a track is empty theory.

**Do now (2 min):** pick a scale - a small oval on the Baseplate, not a city with 20 minutes of decor. The goal is to **drive and close a lap**.`,
 },
 {
 title: "What is VehicleSeat (in plain words)",
 content: `| Object | Role |
|--------|------|
| **Seat** | Sit only |
| **VehicleSeat** | Sit + vehicle controls (throttle/steer) |

VehicleSeat exposes properties like \`Throttle\` / \`Steer\` (and related movement logic when the model is assembled correctly). For this course's teaching race, that is enough: you do not need to write a custom chassis from scratch on day one.

VehicleSeat is the **pilot seat with a steering wheel**. Without it, a Part labeled "car" is only decoration.

Typical minimum model:
- Part \`Body\` (chassis)
- VehicleSeat on top of / inside the body
- 4× Part \`Wheel\` (Cylinder works)
- Joints between body and wheels

**Do now (5 min):** drive one track segment / lap and confirm the counter/time updated.`,
 },
 {
 title: "Build Car: body and seat",
 content: `In Workspace (or ServerStorage, then clone later) create Model \`Car\`:

1. Part \`Body\` - size about 6×2×3 (adjust as needed). Set Anchored **true** at first for easier editing.
2. Add \`VehicleSeat\`, place it on the body, rotate so the player faces forward along the track.
3. Parent the Seat under the model: Parent = Car.
4. Set the model's PrimaryPart to Body (helpful for Pivot / teleports later).

Test in Play: walk up, press Sit / E (depending on settings) - you should sit. If you cannot sit, the Seat may be inside geometry or \`Disabled\`.

**Do now (8 min):** Body + VehicleSeat in Model Car; you can sit in Play. Wheels can still be without motion.`,
 },
 {
 title: "Wheels and Weld - so it does not fall apart",
 content: `Add 4 wheels. For setup, keep Anchored=true on everything and align positions.

Connections:
- \`WeldConstraint\` between Body and each Wheel, **or**
- classic Weld in the model tree (as your school template prefers).

After assembly:
1. Unanchor the wheels and body (and the Seat too) so physics can run.
2. Make sure the model does not "explode" at the joints.

| Symptom | Likely cause |
|---------|------------------|
| Wheels fly off | Missing Weld / wrong Part0-Part1 |
| Car falls through | No floor / CanCollide issue |
| Does not drive | Not a VehicleSeat / orientation / assembly |
| Spins in place | Center of mass / crooked wheels |

Do not spend an hour on perfect tuning. Enough: sit → drive forward in a straight line → turn gently.

**Do now (5 min):** drive one track segment / lap and confirm the counter/time updated.`,
 },
 {
 title: "Orientation: which way is \"forward\"",
 content: `If the car drives sideways or backward:
- rotate the VehicleSeat (LookVector forward along the track);
- check that body and wheels agree;
- in the Model, add a small \`Front\` Part marker so you can see the direction.

On the track, rotate the start pad the same way: the player should leave nose-first into the first turn, not into a wall.

**Do now (5 min):** drive 20 studs on flat ground. If it moves - orientation is fine for this lesson.`,
 },
 {
 title: "Track: an oval, not a maze",
 content: `Build a **closed** route:
1. Wide road (Parts or Terrain path) - at least 12-16 studs wide for beginners.
2. Curbs / invisible side walls (CanCollide true).
3. Start: Part \`StartLine\` or a Spawn near the car.
4. No pits in v1 - get a stable lap first.

Karting, not a Dakar rally. Decor (stands, flags) is optional after the lap **closes**.

Shape checklist:
- [ ] You can drive a lap without getting stuck
- [ ] There is a clear "this is the start"
- [ ] No accidental Teleport into the void
- [ ] Camera is not inside a wall at start

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Lap checkpoints: why place them now",
 content: `In 9.2 the HUD will count laps. It needs points on the track.

Create Parts (CanCollide false, Transparency 0.5 for debugging):
- \`CP1\`, \`CP2\`, \`CP3\`, \`CP4\` (or 3 - your call)
- Attribute \`Index\` = 1,2,3,4
- Place them **in order** along the drive path: do not put CP3 before CP1 on the route

Lap close: often after the last CP you return to the start zone / a separate \`LapGate\` with rules in the 9.2 script.

Keep names stable: later a LocalScript will look for \`Workspace.Race.Checkpoints.CP1\` and so on. Prefer a folder now:

\`Workspace\`
\` └── Race\`
\` ├── Track\`
\` ├── Car\`
\` └── Checkpoints\`
\` ├── CP1 (Index=1)\`
\` ├── CP2\`
\` └── ...\`

**Do now (10 min):** 3-4 CPs with Index; drive past them and visually confirm order.`,
 },
 {
 title: "Spawn, respawn, and the \"sit and drive\" test",
 content: `| Step | Action | OK if |
|------|-----|---------|
| 1 | Play | Car is on the track, not under the map |
| 2 | Sit | Camera/controls feel reasonable |
| 3 | Throttle | You drive along the track |
| 4 | Lap | You return to start without resetting the Place |
| 5 | Flipped over | You have a plan: respawn Seat / Reset button (can wait until tomorrow) |

If VehicleSeat does not give useful teaching speed - nudge size/mass a little, but do not turn the lesson into a physics simulator.

Optional: SpawnLocation near StartLine so death does not teleport you to the map edge.

**Do now (5 min):** run the test table once and record pass/fail for each row.`,
 },
 {
 title: "Organize the Place and Save",
 content: `Names for the course:
- Place / file: \`Lesson 9.1 - Race Car Track\`
- Folder \`Race\` as the module scene root
- Do not mix old RPG inventory drafts into this Place

What NOT to do today:
- RemoteEvent "for later" with no need
- Complex timer UI (that is 9.2)
- Anti-cheat and leaderboard

What you CAN do:
- light road color
- one Billboard "Start" above the line
- a second car copy for a friend in Studio (optional)

A clean scene means faster debugging in 9.4-9.7.

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "Playtest the track build",
 content: `| # | Action | Expectation |
|---|-----|------------|
| 1 | Sit in Car | You sit in VehicleSeat |
| 2 | Drive a straight | Wheels do not fall off |
| 3 | Full lap | You return to StartLine |
| 4 | CPs visible / Index set | Order makes sense |
| 5 | Side wall | You do not fly into the void immediately |
| 6 | Stop/Play again | Model intact, Anchored removed on purpose |
| 7 | Explorer | Race folder is clear for a mentor |

If a lap does not close in 30 s of driving - shrink the track. A small stable lap beats a pretty unfinished one.

**Do now (5 min):** run the test table once and record pass/fail for each row.`,
 },
 {
 title: "Lesson 65 hand-in checklist",
 content: `- [ ] Model Car with VehicleSeat
- [ ] Wheels welded, car drives
- [ ] Closed track with curbs
- [ ] Checkpoints with Attribute Index in order
- [ ] Race folder in Explorer
- [ ] Playtest "sit → lap" green
- [ ] Save: Lesson 9.1 - Race Car Track

Next, **9.2** hangs a timer and lap counter on this scene. If CPs are wrong today, tomorrow's HUD will go wild. If the car does not drive, drawing TimeLabel is pointless.

The module artifact starts here: **there is something to race**. Networking arrives on a ready track, not an empty Baseplate.

This is a build lesson: hands in Studio matter more than long formulas. Save the Place before you close.

**Do now (3 min):** walk the checklist and check only items you truly finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Regular Seat instead of VehicleSeat",
 explanation: "You sit, but there is no real car control.",
 correctApproach: "VehicleSeat in the Car model",
 },
 {
 mistake: "Wheels without Weld and chaotic CanCollide",
 explanation: "The model flies apart on the first physics frame.",
 correctApproach: "WeldConstraint to Body, verify in Play",
 },
 {
 mistake: "Track without curbs at the Baseplate edge",
 explanation: "Constant falls into the void; playtest frustration.",
 correctApproach: "Walls/curbs along the route",
 },
 {
 mistake: "Checkpoints without Index or in chaotic order",
 explanation: "In 9.2, laps will not add up.",
 correctApproach: "Attribute Index 1..n along the drive path",
 },
 {
 mistake: "An hour on stand decor instead of a drivable lap",
 explanation: "No artifact for the next lessons.",
 correctApproach: "Drivable oval first, decor later",
 },
 {
 mistake: "Leave everything Anchored=true forever",
 explanation: "The \"car\" stands like a monument.",
 correctApproach: "Unanchor after Weld assembly",
 }
 ],
 summary: "You built the Race base: a VehicleSeat car with Welded wheels, a closed track, and checkpoints with Index. This is the scene for the timer (9.2) and later networking. Without a drivable lap, the module does not start.",
 practiceTask: {
 title: "Karting on Baseplate (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** sit in the car and drive a closed lap with checkpoints.

### Part A - Car (12 min)
1. Model Car: Body + VehicleSeat.
2. 4 wheels + WeldConstraint.
3. Unanchor, test Sit + movement.

### Part B - Track (10 min)
1. Closed oval / rectangular route.
2. Curbs.
3. StartLine near the car spawn.

### Part C - Checkpoints (8 min)
1. Folder Race/Checkpoints.
2. CPs with Attribute Index in order.
3. Drive a visual lap.
4. **Save:** Lesson 9.1 - Race Car Track`,
 hints: [
 "Start with a 30-stud straight - then close the oval",
 "Transparency 0.5 on CPs helps you see the zones",
 "If it does not drive - check that it is a VehicleSeat and check orientation"
 ],
 optionalChallenge: "Second Car copy on the pit lane + Part sign \"P2\" for split-screen playtest tomorrow.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 9.1?",
 options: [
          "Build a VehicleSeat car and a closed track with checkpoints",
          "Write a full anti-cheat shop",
          "Delete all Parts",
          "Make only a RemoteFunction"
        ],
 correctAnswer: 0,
 explanation: "Build the Race scene.",
 },
 {
 id: "q2",
 type: MC,
 question: "How does VehicleSeat differ from a regular Seat in this lesson?",
 options: [
          "It forbids Weld",
          "It gives vehicle controls (throttle/steer), not only sitting",
          "It only works in Lighting",
          "It automatically draws the lap HUD"
        ],
 correctAnswer: 1,
 explanation: "Pilot seat.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why WeldConstraint between body and wheels?",
 options: [
          "To disable Collision",
          "To create a RemoteEvent",
          "So wheels do not fly off Body under physics",
          "It replaces checkpoints"
        ],
 correctAnswer: 2,
 explanation: "Model joints.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why start with a small oval lap?",
 options: [
          "Roblox forbids large tracks",
          "VehicleSeat only works on ovals",
          "Checkpoints cannot be placed on straights",
          "You get a drivable artifact for later lessons faster"
        ],
 correctAnswer: 3,
 explanation: "Stability first.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why Attribute Index on CPs?",
 options: [
          "It is required for Skybox",
          "So 9.2 can count laps in the correct order",
          "Index replaces VehicleSeat",
          "Without Index the car does not drive"
        ],
 correctAnswer: 1,
 explanation: "Prep for the HUD.",
 },
 {
 id: "q6",
 type: MC,
 question: "What to do with Anchored after Weld assembly?",
 options: [
          "Leave true forever, required",
          "Anchored only on RemoteEvent",
          "Unanchor body/wheels so physics and movement work",
          "Delete all Parts"
        ],
 correctAnswer: 2,
 explanation: "Otherwise it is a monument.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why curbs on the track?",
 options: [
          "Fewer void falls and a more stable playtest",
          "They create leaderstats",
          "Without them LocalScript does not start",
          "It is the only way to sit in a Seat"
        ],
 correctAnswer: 0,
 explanation: "They keep you on the road.",
 },
 {
 id: "q8",
 type: MC,
 question: "Which folder structure works well for the module?",
 options: [
          "Everything unnamed at the Lighting root",
          "Only ServerScriptService with no scene",
          "Random names Part1 Part2",
          "Workspace.Race with Track, Car, Checkpoints"
        ],
 correctAnswer: 3,
 explanation: "Clean Explorer.",
 },
 {
 id: "q9",
 type: MC,
 question: "What is NOT required in 9.1?",
 options: [
          "Place a VehicleSeat",
          "Build a closed track",
          "Full RemoteEvent anti-cheat finish",
          "Add checkpoints with Index"
        ],
 correctAnswer: 2,
 explanation: "Networking comes later.",
 },
 {
 id: "q10",
 type: MC,
 question: "If the car drives sideways, what to check first?",
 options: [
          "Deleting Baseplate",
          "VehicleSeat orientation and the model's \"forward\"",
          "Module 12 name",
          "Publish settings only"
        ],
 correctAnswer: 1,
 explanation: "Nose direction.",
 },
 {
 id: "q11",
 type: MC,
 question: "Which CanCollide makes sense for a trigger checkpoint?",
 options: [
          "Always true like a rock",
          "A checkpoint cannot be a Part",
          "Only MeshPart without Attribute",
          "Often false (trigger zone), so it is not a wall on the road"
        ],
 correctAnswer: 3,
 explanation: "Trigger, not barrier.",
 },
 {
 id: "q12",
 type: MC,
 question: "How does 9.1 prepare 9.2?",
 options: [
          "It gives a track and CPs for the timer and lap counter",
          "9.2 deletes the car",
          "Without UI there is already a server leaderboard",
          "9.2 needs only Terrain water"
        ],
 correctAnswer: 0,
 explanation: "Scene for the HUD.",
 },
 {
 id: "q13",
 type: MC,
 question: "What counts as a successful car playtest?",
 options: [
          "Only opened Explorer",
          "Changed the sky color",
          "Sat, drove, lap closes without the model falling apart",
          "Wrote 10 Remotes with no Place"
        ],
 correctAnswer: 2,
 explanation: "Drivable artifact.",
 },
 {
 id: "q14",
 type: MC,
 question: "Why does CP order on the route matter?",
 options: [
          "Roblox always sorts Parts alphabetically correctly",
          "Index is only needed for Sound",
          "Order affects nothing",
          "The lap counter expects rising indices along the drive path"
        ],
 correctAnswer: 3,
 explanation: "Chain for 9.2.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the completed 9.1 artifact?",
 options: [
          "Theory text only",
          "Car + closed track + CP Index + Save",
          "Empty Baseplate",
          "Coin shop with no car"
        ],
 correctAnswer: 1,
 explanation: "Race base.",
 }
 ],
 },
}

export const enLesson92 = {
 lessonId: "lesson-roblox-9-2",
 moduleId: "module-09",
 order: 2,
 title: "9.2 - Timer / laps / UI",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Build the race HUD: laps, time, race status",
 "Count laps through checkpoints from lesson 9.1",
 "Start the race timer and show time in a clear format",
 "Update TextLabels from a LocalScript without breaking camera/car",
 "Prepare the UI for networking: tomorrow 9.3 explains why on-screen numbers are not yet \"server truth\""
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 66 of 92)",
 content: `In **9.1** you built a car and a track with checkpoints. Today you add the **racer dashboard**: how many laps done, what time is running, whether you already finished.
This is still a **teaching HUD**: numbers may live on the client so you can see results quickly. In **9.3-9.5** you will learn why for a fair race with friends the "truth" must be on the server - but first learn to **read the race with your eyes**.

**Do now (2 min):** open the Place from 9.1 and write: how many laps you want in a race (2 or 3) and where the finish line sits.`,
 },
 {
 title: "What we count",
 content: `| Metric | Meaning | Where you show it |
|---------|--------|-------------|
| **Laps** | How many full laps completed | Large number on the HUD |
| **Checkpoint** | Last honest cp (optional) | Small caption |
| **Time** | Seconds from start | \`mm:ss\` or \`12.3s\` |
| **Status** | Waiting / Racing / Finished | Short text |

Speedometer and odometer in the car. Without them you "drive" but do not know if you are already on lap three.

Hand-in rule: the player **sees** progress without Output. Output stays for you as debug.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Build RaceHUD (StarterGui)",
 content: `In **StarterGui** create ScreenGui \`RaceHUD\` (ResetOnSpawn = false so the HUD does not vanish after respawn unless you want that).

Inside Frame \`Panel\` (screen corner, not the full viewport):
- TextLabel \`LapsLabel\` - for example \`Laps: 0 / 3\`
- TextLabel \`TimeLabel\` - \`Time: 0.0\`
- TextLabel \`StatusLabel\` - \`Ready\`
- (optional) TextLabel \`HintLabel\` - \`Drive checkpoints in order\`

Keep style minimal: readable font, contrasting text, no pile of buttons. The HUD should not cover the camera wheel at screen center.

**Do now (8 min):** place 3 labels with placeholders. No script yet - just so they are visible in Play.`,
 },
 {
 title: "LocalScript: who draws the HUD",
 content: `Under \`RaceHUD\` add **LocalScript** \`RaceHudController\`.

Why LocalScript:
- The player's ScreenGui lives on the client.
- You read input/local Touched (for the teaching stage) and write to TextLabels.

Start template:

\`local Players = game:GetService("Players")\`
\`local player = Players.LocalPlayer\`
\`local gui = script.Parent\`
\`local lapsLabel = gui.Panel:WaitForChild("LapsLabel")\`
\`local timeLabel = gui.Panel:WaitForChild("TimeLabel")\`
\`local statusLabel = gui.Panel:WaitForChild("StatusLabel")\`

\`WaitForChild\` saves you from "attempt to index nil" if instances are still loading.

Do not put this controller in ServerScriptService: a server Script does **not** drive your personal ScreenGui the same simple way.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Race state in a table",
 content: `Keep one local state (on the client for now):

\`local race = {\`
\` laps = 0,\`
\` targetLaps = 3,\`
\` lastCheckpoint = 0,\`
\` totalCheckpoints = 4,\`
\` racing = false,\`
\` finished = false,\`
\` startTime = 0,\`
\`}\`

UI updates - a separate function:

\`local function refreshHud()\`
\` lapsLabel.Text = "Laps: " .. race.laps .. " / " .. race.targetLaps\`
\` statusLabel.Text = race.finished and "Finish!" or (race.racing and "Racing" or "Waiting")\`
\`end\`

Do not scatter \`LapsLabel.Text = ...\` in 15 places - one \`refreshHud\` means fewer bugs.

**Do now (5 min):** make Status show "Waiting", and with a button/Part "Start" switch to "Racing" and \`race.racing = true\`.`,
 },
 {
 title: "Timer: os.clock and format",
 content: `When the race starts:

\`race.startTime = os.clock()\`
\`race.racing = true\`

In a loop (Heartbeat or \`task.wait\` in a loop while racing):

\`local elapsed = os.clock() - race.startTime\`
\`timeLabel.Text = "Time: " .. string.format("%.1f", elapsed)\`

Or \`m:ss\` format:

\`local m = math.floor(elapsed / 60)\`
\`local s = math.floor(elapsed % 60)\`
\`timeLabel.Text = string.format("Time: %d:%02d", m, s)\`

Do not use unbounded \`wait()\` in a body that blocks everything. Prefer:

\`game:GetService("RunService").Heartbeat:Connect(function()\`
\` if not race.racing or race.finished then return end\`
\` -- update TimeLabel\`
\`end)\`

On finish, store \`finalTime = os.clock() - race.startTime\` and stop updates.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Laps through checkpoints (order)",
 content: `From 9.1 you have Parts \`CP1\`, \`CP2\`, … and a lap finish (often the same \`CP1\` or a separate \`LapGate\`).

Credit rule:
1. You may take only the **next** index: if \`lastCheckpoint == 2\`, accept only 3.
2. When the last cp is done and a valid "lap close" happens again - \`laps += 1\`, \`lastCheckpoint = 0\` (or 1 - pick one scheme and stick to it).
3. If \`laps >= targetLaps\` - \`finished = true\`, \`racing = false\`.

Pseudocode:

\`local function onCheckpoint(index)\`
\` if not race.racing or race.finished then return end\`
\` if index ~= race.lastCheckpoint + 1 then return end\`
\` race.lastCheckpoint = index\`
\` if index == race.totalCheckpoints then\`
\` race.laps += 1\`
\` race.lastCheckpoint = 0\`
\` if race.laps >= race.targetLaps then\`
\` race.finished = true\`
\` race.racing = false\`
\` end\`
\` end\`
\` refreshHud()\`
\`end\`

Anti-spam: do not count the same cp 20 times in a row - after accept, ignore repeats until another index appears.

**Do now (5 min):** drive one track segment / lap and confirm the counter/time updated.`,
 },
 {
 title: "Wiring Touched without chaos",
 content: `For each checkpoint:

\`cp.Touched:Connect(function(hit)\`
\` local character = hit.Parent\`
\` local hum = character and character:FindFirstChildOfClass("Humanoid")\`
\` if not hum then return end\`
\` local plr = Players:GetPlayerFromCharacter(character)\`
\` if plr ~= player then return end\`
\` onCheckpoint(tonumber(cp:GetAttribute("Index")) or n)\`
\`end)\`

Or read Index from Attribute / from the name \`CP3\`.

Typical bugs:
| Bug | Fix |
|-----|------|
| Lap +1 from a car wheel 40 times/s | debounce + index order |
| Another player gives you a lap | check \`plr == LocalPlayer\` |
| Finish without all cps | require the full chain |

Remember: today Touched on the client is **UI teaching**. Tomorrow in 9.3 you will see why a cheater can fake such a counter. Do not panic - first make an honest race look correct.

**Do now (4 min):** one hit/hazard in Play - Health should change on the server, not in a LocalScript.`,
 },
 {
 title: "Race start: Part, Prompt, or key",
 content: `Start options (pick one):
1. Part \`StartPad\` + Touched → \`beginRace()\`.
2. ProximityPrompt "Start".
3. Key R via UserInputService (careful in a car).

\`beginRace\` should:
- reset \`laps\`, \`lastCheckpoint\`, \`finished\`
- set \`startTime\`
- \`racing = true\`
- \`refreshHud()\`

Do not start the timer at \`script\` top-level without player action - otherwise time runs while still in a menu.

After finish, show Status \`Finish!\` and freeze Time at the final value.

**Do now (3 min):** walk to the Prompt in Play and confirm Triggered once.`,
 },
 {
 title: "Playtest HUD (honest drive)",
 content: `| # | Action | Expectation |
|---|-----|------------|
| 1 | Play, not started yet | Laps 0, waiting status, time not running |
| 2 | Start | Status "Racing", time runs |
| 3 | Drive CPs out of order | Lap does not add |
| 4 | Full chain | Laps 1, lastCheckpoint resets |
| 5 | Reach targetLaps | Finished, time stops |
| 6 | Respawn / exit car | HUD does not "die" for no reason (ResetOnSpawn thought through) |
| 7 | Output | No Touched error spam |

If time runs but laps do not - check Index attributes. If laps jump - debounce.

**Do now (5 min):** run the test table once and record pass/fail for each row.`,
 },
 {
 title: "Lesson 66 hand-in checklist + bridge to 9.3",
 content: `- [ ] RaceHUD with Laps / Time / Status
- [ ] LocalScript updates labels
- [ ] Timer from start, stop on finish
- [ ] Laps only in checkpoint order
- [ ] targetLaps works (2 or 3)
- [ ] Playtest 1-5 green
- [ ] Save: Lesson 9.2 - Race Timer UI

**What's next:** in **9.3** we cover Client vs Server: why this same HUD is only a "cabin display", not the judge. In **9.4-9.5** laps move to the server, and UI stays the shop window.

This lesson is "feel the race", not "win anti-cheat". Anti-cheat comes after the script map.

**Do now (3 min):** walk the checklist and check only items you truly finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Timer starts immediately on Play",
 explanation: "Time lies before you even leave.",
 correctApproach: "startTime only in beginRace()",
 },
 {
 mistake: "Every Touched = +lap",
 explanation: "Spam and instant finish.",
 correctApproach: "Index order + debounce",
 },
 {
 mistake: "TextLabels updated in 10 places by copy-paste",
 explanation: "Easy to desync Status and Laps.",
 correctApproach: "One refreshHud()",
 },
 {
 mistake: "HUD in Workspace as a Billboard on the track instead of ScreenGui",
 explanation: "Hard to read from the car camera.",
 correctApproach: "StarterGui ScreenGui for personal HUD",
 },
 {
 mistake: "ResetOnSpawn wipes UI mid-race without restoring state",
 explanation: "Player \"loses\" the timer visually.",
 correctApproach: "false, or restore state after CharacterAdded",
 },
 {
 mistake: "Treat client laps as final multiplayer truth",
 explanation: "Tomorrow that becomes a hole.",
 correctApproach: "OK for teaching today; 9.3+ moves accounting to the server",
 }
 ],
 summary: "You built a race HUD: laps via checkpoints, timer from start, Status on screen. LocalScript draws progress. Next, 9.3 explains the client/server boundary - so these numbers become fair on the network.",
 practiceTask: {
 title: "Race dashboard (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** see laps and time while driving the track from 9.1.

### Part A - HUD (8 min)
1. StarterGui → RaceHUD → Panel with Laps/Time/Status.
2. LocalScript RaceHudController + WaitForChild.
3. refreshHud() with placeholders.

### Part B - Timer and start (10 min)
1. beginRace(): reset state, startTime, racing=true.
2. Heartbeat updates TimeLabel.
3. Finish stops the timer.

### Part C - Laps (12 min)
1. Wire CPs with Attributes Index.
2. Only next index; full lap → laps++.
3. targetLaps → Finished.
4. **Save:** Lesson 9.2 - Race Timer UI`,
 hints: [
 "First make Time tick without laps - then add CPs",
 "print(index) on Touched quickly shows spam",
 "One refreshHud after every state change"
 ],
 optionalChallenge: "Show \"best time\" in Session (bestTime variable) if you finished faster than the previous race in this Studio session.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 9.2?",
 options: [
          "Show laps and race time on the HUD",
          "Delete the car from 9.1",
          "Immediately make a RemoteEvent shop",
          "Publish the game with no track"
        ],
 correctAnswer: 0,
 explanation: "Timer / laps / UI.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where does a personal RaceHUD usually live?",
 options: [
          "ServerStorage as the only option",
          "StarterGui (ScreenGui)",
          "Lighting",
          "Terrain"
        ],
 correctAnswer: 1,
 explanation: "Player UI.",
 },
 {
 id: "q3",
 type: MC,
 question: "Which script conveniently sets text on the player's ScreenGui?",
 options: [
          "Only ModuleScript in SSS with no client",
          "SoundService",
          "LocalScript",
          "Plugin only"
        ],
 correctAnswer: 2,
 explanation: "Client UI.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why WaitForChild for LapsLabel?",
 options: [
          "It disables the timer forever",
          "Without it the server does not start",
          "WaitForChild replaces Touched",
          "The instance may not have appeared yet"
        ],
 correctAnswer: 3,
 explanation: "Reliable start.",
 },
 {
 id: "q5",
 type: MC,
 question: "When to set race.startTime?",
 options: [
          "Always on the first LocalScript line",
          "At race start (beginRace)",
          "Only after Publish",
          "In the finish Part name"
        ],
 correctAnswer: 1,
 explanation: "Timer from start.",
 },
 {
 id: "q6",
 type: MC,
 question: "How to count laps fairly via checkpoints?",
 options: [
          "Any Touched = +1 lap",
          "Count only Part color",
          "Accept only the next index in order",
          "Increase laps in Lighting"
        ],
 correctAnswer: 2,
 explanation: "CP chain.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why debounce / ignore repeats of the same CP?",
 options: [
          "Touched spams and can inflate progress",
          "Roblox forever forbids Touched without debounce",
          "It replaces VehicleSeat",
          "Without it UI does not exist"
        ],
 correctAnswer: 0,
 explanation: "Anti-spam.",
 },
 {
 id: "q8",
 type: MC,
 question: "What does refreshHud do?",
 options: [
          "Deletes the track",
          "Creates a RemoteEvent",
          "Publishes the Place",
          "In one place updates Laps/Time/Status from the race table"
        ],
 correctAnswer: 3,
 explanation: "Single UI update.",
 },
 {
 id: "q9",
 type: MC,
 question: "Why does the lesson warn that client laps are not final for multiplayer?",
 options: [
          "LocalScript cannot change TextLabel",
          "Timers are forbidden in Roblox",
          "The client can be faked; honest accounting moves to the server later",
          "Checkpoints do not exist on the client"
        ],
 correctAnswer: 2,
 explanation: "Bridge to 9.3+.",
 },
 {
 id: "q10",
 type: MC,
 question: "What should happen when targetLaps is reached?",
 options: [
          "The game must Remove all Parts",
          "finished=true, timer stops, Status finish",
          "Laps reset to negative",
          "Camera turns off forever"
        ],
 correctAnswer: 1,
 explanation: "End of race.",
 },
 {
 id: "q11",
 type: MC,
 question: "Which service is convenient for ticking the timer every frame?",
 options: [
          "ChatService as the only option",
          "TeleportService",
          "BadgeService",
          "RunService.Heartbeat"
        ],
 correctAnswer: 3,
 explanation: "Smooth time updates.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why check that Touched is LocalPlayer?",
 options: [
          "So another character does not spin your HUD",
          "Otherwise the car does not drive",
          "Otherwise Studio closes",
          "Touched only works with NPCs"
        ],
 correctAnswer: 0,
 explanation: "Player filter.",
 },
 {
 id: "q13",
 type: MC,
 question: "What is logical to show before start?",
 options: [
          "Finished immediately",
          "999 laps",
          "Waiting, laps 0, time not running yet",
          "Empty screen with no labels"
        ],
 correctAnswer: 2,
 explanation: "Clean prestart.",
 },
 {
 id: "q14",
 type: MC,
 question: "How does 9.2 prepare 9.5 leaderboard?",
 options: [
          "9.5 deletes the whole HUD",
          "Leaderboard needs no numbers",
          "You must forget checkpoints",
          "You already have lap/time fields on UI - later the server fills them"
        ],
 correctAnswer: 3,
 explanation: "The shop window already exists.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the completed 9.2 artifact?",
 options: [
          "Theory only, no Play",
          "HUD with laps and timer on the 9.1 track + Save",
          "Empty Baseplate",
          "GamePass shop with no race"
        ],
 correctAnswer: 1,
 explanation: "You need a dashboard.",
 }
 ],
 },
}

export const enLesson93 = {
 lessonId: "lesson-roblox-9-3",
 moduleId: "module-09",
 order: 3,
 title: "9.3 - Client vs Server",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Explain client vs server difference in plain words",
 "Know where Script, LocalScript, and ModuleScript run",
 "Understand replication and FilteringEnabled (on by default)",
 "Show an anti-example: the client gives itself \"coins/laps\"",
 "Sketch the Remotes folder map (RS) before lesson 9.4"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 67 of 92)",
 content: `This is the **networking foundation**. Without it, RemoteEvent in 9.4 looks like magic.

Today you almost do not build a new track. Today you **understand the map**:
1. Who is the **server**, who is the **client**.
2. Which script lives where.
3. Why a LocalScript cannot honestly "give itself 999 laps".
4. Where Remotes will go tomorrow.

**Do now (2 min):** write one sentence: who in your life is the "judge", and who is the "player with a controller". That is the server/client metaphor.`,
 },
 {
 title: "Server and client in plain words",
 content: `| | Server | Client |
|--|--------|--------|
| Who | Roblox computer / "game judge" | Your PC / phone, the screen |
| Sees | All players, world truth | Mostly you + what replicated |
| Decides | Coins, laps, finish, damage | Camera, UI, WASD input |
| Script | \`Script\` | \`LocalScript\` |

Race metaphor: the server is the **judge with a stopwatch**. The client is the **racer with a dashboard**. The dashboard can lie - the stopwatch does not.

In Studio Play you often see both in one window - so it is easy to forget the difference. In a real game there are many clients and one server.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "FilteringEnabled - why the client \"cannot\" change the world",
 content: `In modern Roblox, by default a model is on where the client is **not** world owner.

Consequence:
- LocalScript changed \`leaderstats.Coins\` on its screen? Often that does **not** become truth for the server / others.
- LocalScript created a Part? Others may not see it / the server may not treat it as a game fact.
- To ask the server to change truth - you need a **Remote** (tomorrow).

Do not memorize FilteringEnabled like a spell. Remember the rule: **client asks, server decides**.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server-side action.`,
 },
 {
 title: "Replication: what \"travels\" between worlds",
 content: `| What | Typically |
|----|--------|
| Parts in Workspace (from server) | Players see them |
| leaderstats Values from server | Client sees them in TAB |
| ScreenGui in StarterGui | Copied to each player |
| Variable \`local laps = 0\` in LocalScript | **Only** on that client |
| Variable in Script SSS | On server; client does not read server Lua memory |

Replication = "copy/update for others". Not everything replicates. So client UI can show one thing and a server print another if you desynced logic.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server-side action.`,
 },
 {
 title: "Script vs LocalScript vs ModuleScript",
 content: `| Type | Where it runs | Typical places |
|-----|-----------|--------------|
| **Script** | Server | SSS, Workspace (server context) |
| **LocalScript** | Client | StarterGui, StarterPlayerScripts, Tool |
| **ModuleScript** | Wherever you require it | RS (shared), SSS (server modules) |

Traps:
- LocalScript in SSS does **not** become client UI code.
- Script in StarterGui does not replace LocalScript for player buttons.
- Module in RS is seen by both client and server - **do not put secrets there** (admin passwords, private keys).

**Do now (5 min):** in your Place label each Script with a sticky/note: S or L.`,
 },
 {
 title: "Race folder map (standard before Remotes)",
 content: `Prepare (even empty folders):

\`ReplicatedStorage/\`
\` └── Remotes/\` <- tomorrow RemoteEvent goes here

\`ServerScriptService/\`
\` ├── Systems/\` <- Srv_Race, lap accounting
\` └── Modules/\` <- Race Config (server)

\`StarterGui/\`
\` └── RaceUI/\` <- LocalScripts HUD

\`StarterPlayer/\`
\` └── StarterPlayerScripts/\` <- input, camera lite

\`Workspace/\`
\` └── Track/\` Cars/ Checkpoints/

This is not bureaucracy. It is so in 9.4 you do not spend 15 minutes hunting "where to put the Remote".

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "Anti-example: client gives itself laps",
 content: `Imagine a LocalScript:

\`-- ANTI-EXAMPLE (for teaching)\`
\`player.leaderstats.Laps.Value = 99\`

or

\`lapsLabel.Text = "99"\`

First case: trying to change Value from the client - in correct architecture it does **not** become server truth (or rolls back immediately).
Second: the screen lies, the server knows nothing.

Correct: the server does \`Laps.Value = race[player].laps\` after an honest lap.

**Anti-example practice (8 min):**
1. Try changing Laps from a LocalScript (if leaderstats exist).
2. Look at TAB from "server eyes" / print on the server.
3. Note: what changed visually, and what did not.

**Do now (3 min):** find one symptom from the table in the Place and fix it or confirm it is absent.`,
 },
 {
 title: "What can stay on the client (and that is OK)",
 content: `| OK on client | Server only |
|---------------|-----------------|
| Camera, UI sound | Reward, laps, coins |
| Button highlight | Finish / death / damage |
| Local "approximate" timer tick* | Official finish time |
| Steering animation | race[player] state |

\\*If you show a local tick - label it "approx" or sync with server startTime. Race summary still comes from the server.

Beginner mistake: "UI is on the client, so economy is too". No. UI = shop window.

**Do now (5 min):** drive one track segment / lap and confirm the counter/time updated.`,
 },
 {
 title: "One server - many clients",
 content: `Imagine 4 players on the track:
- 4 LocalScript timers (each in its own head).
- 1 Script for lap accounting on the server with \`race[player1]\`, \`race[player2]\`...

If you do \`laps = laps + 1\` globally without a player key - everyone steals progress. That thought is for today, even before Remotes.

The server asks: "who exactly sent the event / who exactly touched the CP?"

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Studio Play: Server / Client modes",
 content: `In modern Studio it helps to watch:
- the client window (what the player sees);
- server logs in Output (sometimes you switch context).

When testing networking:
1. Watch prints with prefix \`[Server]\` / \`[Client]\`.
2. Do not confuse a LocalScript error with an SSS error.
3. Two players: Start → Players → add players (if available) or two windows.

Today one player plus a clear sense of **which script** the print comes from is enough.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "ModuleScript: shared code without secrets",
 content: `A Module in RS can be required from both LocalScript and Script - handy for UI text constants and Remote names.

But:
- \`NEED_LAPS = 3\` in RS - OK (not a secret).
- \`AdminPassword = "123"\` in RS - **disaster**.
- Shop prices belong in SSS (as in M10), even if the catalog is delivered via Remote.

Rule: **everything in RS, the client can potentially see.**

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Mini map practice (no full Remote yet)",
 content: `1. Create Remotes / Systems / RaceUI folders as above.
2. In SSS Script \`Srv_RaceHello\`: \`print("[Server] race systems ready")\`.
3. In StarterPlayerScripts LocalScript: \`print("[Client] hud ready")\`.
4. Play → both prints appear (in matching contexts).
5. Try the Laps/Label anti-example.
6. Write 3 sentences: what server does / client does / what Remote will be.

Save: \`Lesson 9.3 - Client Server Map\`.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Lesson 67 hand-in checklist",
 content: `- [ ] Can explain server vs client in 30 s
- [ ] Know where Script / LocalScript / Module live
- [ ] Understand: client is not the judge of laps/coins
- [ ] Anti-example noted (what you tried)
- [ ] Remotes/Systems/RaceUI folders exist
- [ ] Print [Server] and [Client] are separated
- [ ] Arrow diagram to Remote is drawn
- [ ] Save Lesson 9.3 - Client Server Map

Without this, 9.4 becomes copy-paste magic.

**Do now (3 min):** walk the checklist and check only items you truly finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Thinking LocalScript = server because \"Studio is one window\"",
 explanation: "In live there will be many clients and one judge.",
 correctApproach: "Always ask: is this code on S or L?",
 },
 {
 mistake: "Writing economy/laps only on the client",
 explanation: "Cheat and desync.",
 correctApproach: "Truth on server, UI displays",
 },
 {
 mistake: "LocalScript in ServerScriptService",
 explanation: "Wrong container - logic is not where it should be.",
 correctApproach: "UI/input in StarterGui / PlayerScripts",
 },
 {
 mistake: "Secrets in ModuleScript in ReplicatedStorage",
 explanation: "The client can see them.",
 correctApproach: "Secrets/critical Config in SSS",
 },
 {
 mistake: "No folder map before Remotes",
 explanation: "Tomorrow name chaos and duplicate Events",
 correctApproach: "RS/Remotes stub today",
 },
 {
 mistake: "Global laps with no player key in the design",
 explanation: "Multiplayer breaks immediately.",
 correctApproach: "Think race[player] already now",
 }
 ],
 summary: "You mapped Client vs Server: judge and player, Script/LocalScript/Module, replication, client \"laps\" anti-example, folder map for Remotes. This is the foundation tomorrow's RemoteEvent stands on.",
 practiceTask: {
 title: "Network map (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** diagram + folders + anti-example + two prints.

### Part A - Diagram (8 min)
1. Draw server / client / arrows "tomorrow Remote".
2. Label 5 examples: what on S, what on L.

### Part B - Place scaffold (12 min)
1. Remotes, Systems, RaceUI folders.
2. Script print [Server], LocalScript print [Client].
3. Anti-example: try changing Laps/Label from client + note the result.

### Part C - Hand-in (10 min)
1. Explain the map to the instructor in 40 s.
2. **Save:** Lesson 9.3 - Client Server Map
3. Do not build full finish Remote logic yet (that is 9.4).`,
 hints: [
 "Words and folders first, then code",
 "Prefixes [Server]/[Client] in print save debug time",
 "Do not put passwords in RS"
 ],
 optionalChallenge: "8-row table \"race system → S or L\" (camera, finish, HUD, VehicleSeat physics, lap accounting, UI sound, hazard penalty, decor).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Who is the \"judge with a stopwatch\" in this lesson's metaphor?",
 options: [
          "Server",
          "LocalScript only",
          "Terrain Editor",
          "Skybox"
        ],
 correctAnswer: 0,
 explanation: "Server holds the truth.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where does LocalScript usually run?",
 options: [
          "Always only in ServerScriptService",
          "On the client (StarterGui / PlayerScripts, etc.)",
          "Only in Lighting",
          "In a Part name"
        ],
 correctAnswer: 1,
 explanation: "Client code.",
 },
 {
 id: "q3",
 type: MC,
 question: "What does \"client asks, server decides\" mean?",
 options: [
          "Server draws all buttons instead of the client",
          "LocalScript is forever forbidden",
          "Economy/laps/finish are confirmed by the server, not UI alone",
          "Remotes are never needed"
        ],
 correctAnswer: 2,
 explanation: "Network architecture.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why is LocalScript in SSS a bad idea for UI?",
 options: [
          "SSS is always faster for buttons",
          "LocalScript there automatically becomes server",
          "VehicleSeat requires it",
          "Wrong container for client UI code"
        ],
 correctAnswer: 3,
 explanation: "Correct script placement.",
 },
 {
 id: "q5",
 type: MC,
 question: "What is replication in this lesson?",
 options: [
          "Deleting Workspace",
          "Update/copy of data or world that clients see",
          "Only changing the sky color",
          "Required DataStore"
        ],
 correctAnswer: 1,
 explanation: "What \"travels\" to players.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why is putting AdminPassword in a ModuleScript in RS bad?",
 options: [
          "ModuleScript does not exist in Roblox",
          "RS disables print",
          "The client can see ReplicatedStorage contents",
          "Passwords are only allowed in TextLabel"
        ],
 correctAnswer: 2,
 explanation: "RS is not a safe.",
 },
 {
 id: "q7",
 type: MC,
 question: "The anti-example \"Laps = 99 on client\" shows…",
 options: [
          "That screen/client attempt ≠ server accounting truth",
          "That leaderstats are forbidden",
          "That server does not exist in Solo",
          "That you must delete the race"
        ],
 correctAnswer: 0,
 explanation: "Never trust client.",
 },
 {
 id: "q8",
 type: MC,
 question: "Where will RemoteEvents live by course standard tomorrow?",
 options: [
          "Only in Terrain",
          "In Camera",
          "Only in the Place name",
          "ReplicatedStorage/Remotes"
        ],
 correctAnswer: 3,
 explanation: "Folder map.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which of these logically stays on the client?",
 options: [
          "Official finish time as the only truth",
          "Giving coins to all players",
          "Camera and UI feedback",
          "Subtracting other players' Laps"
        ],
 correctAnswer: 2,
 explanation: "UI/input vs economy.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why is \"everything in one Studio window\" hard?",
 options: [
          "Studio forbids print",
          "Easy to forget that live = many clients + one server",
          "Studio has no SSS",
          "LocalScript never runs there"
        ],
 correctAnswer: 1,
 explanation: "Play context.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why prefixes [Server]/[Client] in print?",
 options: [
          "It increases FPS",
          "It creates a Remote",
          "It disables FilteringEnabled",
          "Quickly see which side the log comes from"
        ],
 correctAnswer: 3,
 explanation: "Network debug.",
 },
 {
 id: "q12",
 type: MC,
 question: "How to think about lap state already in 9.3?",
 options: [
          "Per player (race[player]), not one global variable for everyone",
          "Only in TextLabel with no server",
          "One laps for the whole server always",
          "Only Sky counts laps"
        ],
 correctAnswer: 0,
 explanation: "Multiplayer design.",
 },
 {
 id: "q13",
 type: MC,
 question: "What does ModuleScript give vs a regular Script?",
 options: [
          "Automatic Publish",
          "Replacing Workspace",
          "Code module via require that you can share",
          "Disabling the client"
        ],
 correctAnswer: 2,
 explanation: "Shared libraries.",
 },
 {
 id: "q14",
 type: MC,
 question: "How does 9.3 prepare 9.4?",
 options: [
          "9.4 cancels the server",
          "Remotes are no longer needed",
          "You must delete all LocalScripts",
          "You understand why a Remote channel between L and S exists"
        ],
 correctAnswer: 3,
 explanation: "Foundation → bridge.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the completed 9.3 artifact?",
 options: [
          "Theory only, no Place",
          "Diagram + Remotes/Systems/UI folders + anti-example + Save",
          "Full finish Remote without understanding (that is 9.4)",
          "Empty Baseplate"
        ],
 correctAnswer: 1,
 explanation: "Network map before Remote.",
 }
 ],
 },
}

export const enLesson94 = {
 lessonId: "lesson-roblox-9-4",
 moduleId: "module-09",
 order: 4,
 title: "9.4 - RemoteEvent",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Explain why RemoteEvent between LocalScript and server",
 "Create RemoteEvent in ReplicatedStorage and wire FireServer / OnServerEvent",
 "Reply to the client via FireClient / OnClientEvent",
 "Validate arguments and finish/lap events on the server (never trust client)",
 "Add anti-spam lite (cooldown) on the Remote"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 68 of 92)",
 content: `This is the **anchor networking lesson**. In **9.3** you already split client and server. Today the "phone" between them appears: **RemoteEvent**.

Practice of the day (race context):
1. Client says: "passed a checkpoint / I want finish".
2. Server checks.
3. Server replies: ok / deny + updates state.
4. UI reacts only to the server reply.

**Do now (3 min):** in \`ReplicatedStorage\` create Folder \`Remotes\` and RemoteEvent \`RaceFinish\`.`,
 },
 {
 title: "Why Remote if Properties exist?",
 content: `| Without Remote | With RemoteEvent |
|------------|---------------|
| LocalScript sets "win" itself | Server decides the win |
| Other players do not know the event | Server can FireAllClients |
| Easy cheat | Server-side check |
| "In Solo it seems OK" | Ready for multiplayer |

FilteringEnabled (default): the client does **not** control the world as it likes. To ask the server to do something - you need a channel. RemoteEvent = **signal** "happened / please".

LocalScript writes a note. RemoteEvent is the courier. Server Script is the cashier / judge.

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "Map: where things live",
 content: `| Object | Place | Who uses it |
|--------|-------|------------------|
| RemoteEvent | \`RS/Remotes/...\` | Both client and server see it |
| OnServerEvent | Script in SSS | Server listens to FireServer |
| FireServer | LocalScript | Client → server |
| FireClient | Script in SSS | Server → one player |
| OnClientEvent | LocalScript | Client listens for reply |
| FireAllClients | Script in SSS | To all players |

Do not put RemoteEvent in Workspace "anywhere". Course standard: \`ReplicatedStorage/Remotes\`.

Do not put secret prices/admin keys in a Remote as "truth" - the client sees the Remote name in RS, but keep **check logic** in SSS.

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "FireServer / OnServerEvent - first bridge",
 content: `Client (LocalScript):

\`local RS = game:GetService("ReplicatedStorage")\`
\`local Remotes = RS:WaitForChild("Remotes")\`
\`local RaceFinish = Remotes:WaitForChild("RaceFinish")\`
\`RaceFinish:FireServer()\`

Server (Script in SSS):

\`local RaceFinish = Remotes:WaitForChild("RaceFinish")\`
\`RaceFinish.OnServerEvent:Connect(function(player)\`
\` print(player.Name, "asks finish")\`
\`end)\`

The first argument on the server is **always** \`player\` - who sent it. Next are what you passed in FireServer.

**Do now (5 min):** FireServer from a button/key → print on the server. No win yet.`,
 },
 {
 title: "Arguments: what you can send",
 content: `| OK to send | Not OK as sole truth |
|----------|----------------------|
| \`cpIndex\` (checkpoint number) | \`laps = 999\` |
| \`"finish"\` action string | \`won = true\` |
| Nothing (empty finish request) | \`time = 0.01\` as official result |

The server **may** accept cpIndex, but checks itself: is the player near that CP, is it the next expected one.

\`FireServer(3)\` → \`OnServerEvent:Connect(function(player, cpIndex)\`
Always: \`typeof(cpIndex) == "number"\`.

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "FireClient / OnClientEvent - the reply",
 content: `Server after deciding:

\`RaceFinish:FireClient(player, true, "Finish!")\`
\`-- or\`
\`RaceFinish:FireClient(player, false, "Too far")\`

Client:

\`RaceFinish.OnClientEvent:Connect(function(ok, message)\`
\` statusLabel.Text = message\`
\` if ok then playWinSound() end\`
\`end)\`

So UI does not invent the result. It **reacts**.

FireAllClients - when everyone needs a board update (tomorrow in 9.5). Today FireClient to one player is enough.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Broken cheat demo (must understand)",
 content: `Bad path (do NOT do in production):

LocalScript:
\`-- PSEUDO ANTI-EXAMPLE\`
\`lapsLabel.Text = "99"\`
\`winFrame.Visible = true\`

That is a "win" only on screen. Server and leaderboard know nothing - or worse, if you write leaderstats from the client.

Correct path:
1. FireServer finish.
2. Server nearFinish + laps.
3. Server sets finished / time.
4. FireClient ok.
5. UI shows ok.

**Do now (4 min):** explain to a friend/instructor the difference between anti-example and correct path in 30 s.`,
 },
 {
 title: "Finish practice: server validation",
 content: `Minimum for RaceFinish:

\`RaceFinish.OnServerEvent:Connect(function(player)\`
\` if typeof(player) ~= "Instance" then return end\`
\` local st = race[player]\`
\` if not st or st.finished then return end\`
\` if st.laps < NEED_LAPS then\`
\` RaceFinish:FireClient(player, false, "Not all laps yet")\`
\` return\`
\` end\`
\` if not nearFinish(player) then\`
\` RaceFinish:FireClient(player, false, "Drive closer")\`
\` return\`
\` end\`
\` st.finished = true\`
\` local t = os.clock() - st.startTime\`
\` RaceFinish:FireClient(player, true, string.format("Time %.1f", t))\`
\`end)\`

\`nearFinish\` - Magnitude to FinishPart, as in 9.7 (today at least a simple check).

**Do now (5 min):** drive one track segment / lap and confirm the counter/time updated.`,
 },
 {
 title: "Checkpoint via Remote (alternative to Touched-only)",
 content: `Option A: server listens to Touched on CP - client stays quiet.
Option B: client FireServer(cpIndex), server validates distance.

For teaching Remotes, **B** is handy (you see the channel). For physics stability, often **A**. You can combine: Touched on server = main; Remote = extra UI signal.

If you do B:

\`CheckpointRE:FireServer(cpIndex)\`
Server: typeof number, cpIndex == expected, Magnitude to CP_Part[cpIndex], then lastCheckpoint = cpIndex, maybe laps++.

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "Anti-spam lite (cooldown)",
 content: `Without a limit a player (or a bug) sends 100 FireServer calls.

\`local lastFinish = {}\`
\`local COOLDOWN = 0.35\`

\`... OnServerEvent:Connect(function(player)\`
\` local now = os.clock()\`
\` if now - (lastFinish[player.UserId] or 0) < COOLDOWN then return end\`
\` lastFinish[player.UserId] = now\`
\` tryFinish(player)\`
\`end)\`

This is not "military anti-cheat". This is Remote hygiene. You will repeat it in the M10 shop.

**Do now (3 min):** find one symptom from the table in the Place and fix it or confirm it is absent.`,
 },
 {
 title: "WaitForChild and typical errors",
 content: `| Symptom | Cause | Fix |
|---------|---------|------|
| nil Remotes | Not replicated yet | WaitForChild |
| OnServerEvent never fires | Script not in SSS / Disabled | Check Parent |
| FireServer from server | Wrong context | FireServer only from client |
| No player in Connect | Forgot 1st arg is player | function(player, ...) |
| Works in Solo "sometimes" | Race on order | WaitForChild chain |

Always:

\`local Remotes = RS:WaitForChild("Remotes")\`
\`local RaceFinish = Remotes:WaitForChild("RaceFinish")\`

**Do now (3 min):** find one symptom from the table in the Place and fix it or confirm it is absent.`,
 },
 {
 title: "RemoteEvent vs RemoteFunction (short)",
 content: `| | RemoteEvent | RemoteFunction |
|--|-------------|----------------|
| Idea | Signal | Request → return |
| Race finish | **Yes** (event) | Rarely |
| Shop catalog | Event possible | Function often nicer (M10) |

Today only **Event**. Function appears fully in hub 10.2. Do not stuff everything into one type "just in case".

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "Three lesson exercises (order)",
 content: `1. **Print bridge:** FireServer → print name on server.
2. **Deny/Allow:** nearFinish + FireClient false/true.
3. **Spam:** 10 presses → only 1 handle thanks to cooldown / finished.

After three exercises you have the artifact: an honest finish channel. Tomorrow (9.5) you hang a leaderboard on it.

Save: \`Lesson 9.4 - RemoteEvent Finish\`.

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "Lesson 68 hand-in checklist",
 content: `- [ ] RemoteEvent in RS/Remotes
- [ ] FireServer from LocalScript
- [ ] OnServerEvent in SSS with player
- [ ] Validation (zone and/or laps) before ok
- [ ] FireClient ok/deny + UI text
- [ ] Cooldown or finished protection
- [ ] No "win" only on client as truth
- [ ] Explained anti-example in 30 s
- [ ] Save Lesson 9.4 - RemoteEvent Finish

Without this, 9.5-9.8 build a board on sand.

**Do now (3 min):** walk the checklist and check only items you truly finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Win only in LocalScript without Remote",
 explanation: "Cheat and no server truth.",
 correctApproach: "FireServer → validation → FireClient",
 },
 {
 mistake: "Trust time/laps from client arguments",
 explanation: "Faked result.",
 correctApproach: "Server counts time and laps itself",
 },
 {
 mistake: "FireServer from a server Script",
 explanation: "Wrong API direction.",
 correctApproach: "FireServer from client; from server - FireClient",
 },
 {
 mistake: "No WaitForChild",
 explanation: "Rare nils at start.",
 correctApproach: "WaitForChild Remotes and Event name",
 },
 {
 mistake: "No cooldown / finished",
 explanation: "Spam multiplies events.",
 correctApproach: "COOLDOWN + finished flag",
 },
 {
 mistake: "Remote in a random Workspace place",
 explanation: "Hard to find, bad standard.",
 correctApproach: "RS/Remotes",
 }
 ],
 summary: "You learned RemoteEvent: client asks finish/lap via FireServer, server validates and replies FireClient, UI only displays. This is Module 9's network anchor before leaderboard, hazards, and anti-cheat.",
 practiceTask: {
 title: "Honest finish via Remote (~30-35 min)",
 difficulty: "intermediate",
 description: `**Goal:** RaceFinish Remote with deny/allow and UI reply.

### Part A - Bridge (8 min)
1. RS/Remotes/RaceFinish.
2. LocalScript: key/button → FireServer.
3. SSS: OnServerEvent → print(player.Name).

### Part B - Validation (15 min)
1. race state / NEED_LAPS (temporarily 0 OK to test zone).
2. nearFinish Magnitude.
3. FireClient(false/true, message).
4. UI StatusLabel on OnClientEvent.
5. finished + COOLDOWN.

### Part C - Anti-example (7 min)
1. Show that changing TextLabel on client does not change server state.
2. Remove test cheat code.
3. **Save:** Lesson 9.4 - RemoteEvent Finish`,
 hints: [
 "Print first, then nearFinish",
 "First OnServerEvent argument is always player",
 "Cooldown 0.35 s catches double-clicks"
 ],
 optionalChallenge: "Second Remote RaceCheckpoint(cpIndex) with lastCheckpoint order check.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Why RemoteEvent in a race?",
 options: [
          "So the client asks for an action, and the server decides and replies",
          "To replace VehicleSeat",
          "To paint Terrain",
          "To disable Explorer"
        ],
 correctAnswer: 0,
 explanation: "Client↔server channel.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where to keep RemoteEvent by course standard?",
 options: [
          "Only in Lighting",
          "ReplicatedStorage/Remotes",
          "In the SpawnLocation name",
          "Only in ServerStorage (client cannot see it for FireServer)"
        ],
 correctAnswer: 1,
 explanation: "Shared Remotes place.",
 },
 {
 id: "q3",
 type: MC,
 question: "Who calls FireServer?",
 options: [
          "Only Script in SSS",
          "Terrain Editor",
          "LocalScript / client",
          "PathfindingService"
        ],
 correctAnswer: 2,
 explanation: "Client → server.",
 },
 {
 id: "q4",
 type: MC,
 question: "The first OnServerEvent argument is…",
 options: [
          "Always FinishPart",
          "Must be number 0",
          "Camera",
          "player who sent the event"
        ],
 correctAnswer: 3,
 explanation: "Who fired the Remote.",
 },
 {
 id: "q5",
 type: MC,
 question: "What does FireClient do?",
 options: [
          "Client writes to leaderstats",
          "Server sends an event to a specific player",
          "Deletes RemoteEvent",
          "Creates Humanoid"
        ],
 correctAnswer: 1,
 explanation: "Server → client.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why is setting \"win\" only by changing client UI bad?",
 options: [
          "UI is forbidden in Roblox",
          "FireServer then breaks",
          "It is not server truth - easy to fake / no accounting",
          "LocalScript cannot do TextLabel"
        ],
 correctAnswer: 2,
 explanation: "Cheat anti-example.",
 },
 {
 id: "q7",
 type: MC,
 question: "What can the client safely send?",
 options: [
          "A request/checkpoint index, not official win time",
          "Any laps = 999 as fact",
          "A command to change others' data with no check",
          "loadstring"
        ],
 correctAnswer: 0,
 explanation: "Signal, not verdict.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why nearFinish on the server?",
 options: [
          "To speed up the camera",
          "It replaces WaitForChild",
          "It is only needed for Sound",
          "Do not credit finish for a player far from the zone"
        ],
 correctAnswer: 3,
 explanation: "Position validation.",
 },
 {
 id: "q9",
 type: MC,
 question: "Why cooldown on OnServerEvent?",
 options: [
          "To change track color",
          "It disables Anchored",
          "So FireServer spam is not handled dozens of times",
          "Cooldown replaces player"
        ],
 correctAnswer: 2,
 explanation: "Anti-spam lite.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why WaitForChild(\"Remotes\") on the client?",
 options: [
          "It deletes SSS",
          "The Remote may not have replicated yet",
          "Without it Parts do not exist",
          "WaitForChild writes DataStore"
        ],
 correctAnswer: 1,
 explanation: "Reliable start.",
 },
 {
 id: "q11",
 type: MC,
 question: "How does RemoteEvent differ from RemoteFunction in this lesson?",
 options: [
          "They are always identical",
          "Event only works on the server",
          "Function is forbidden in Roblox",
          "Event = signal; Function = request with return (Function covered more in M10)"
        ],
 correctAnswer: 3,
 explanation: "Different tools.",
 },
 {
 id: "q12",
 type: MC,
 question: "Where to listen to OnServerEvent?",
 options: [
          "In a server Script (for example SSS)",
          "In LocalScript StarterGui as a server replacement",
          "In Terrain",
          "In Skybox"
        ],
 correctAnswer: 0,
 explanation: "Server handling.",
 },
 {
 id: "q13",
 type: MC,
 question: "What is logical after a successful finish on the server?",
 options: [
          "Delete RemoteEvent",
          "Disable Output",
          "finished=true, compute time, FireClient ok",
          "Let the client write leaderstats itself"
        ],
 correctAnswer: 2,
 explanation: "Locking the result.",
 },
 {
 id: "q14",
 type: MC,
 question: "How does 9.4 prepare 9.5 leaderboard?",
 options: [
          "Leaderboard cancels Remotes",
          "You must remove validation",
          "9.5 works only without a server",
          "An honest lap/finish signal can hang on board updates"
        ],
 correctAnswer: 3,
 explanation: "Channel → board.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the completed 9.4 artifact?",
 options: [
          "Theory only, no Studio",
          "Working RaceFinish Remote with validation, UI reply, and Save",
          "Empty Baseplate",
          "Win only as TextLabel on client"
        ],
 correctAnswer: 1,
 explanation: "You need an honest bridge.",
 }
 ],
 },
}

export const enLesson95 = {
 lessonId: "lesson-roblox-9-5",
 moduleId: "module-09",
 order: 5,
 title: "9.5 - Lap leaderboard",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Keep server-side lap (and time) accounting for each player",
 "Update leaderboard UI via FireClient or leaderstats",
 "Lock in Remote: client reports checkpoint/lap, server decides",
 "Sort race top (faster time / more laps) without trusting the client",
 "Prepare clean accounting for hazards (9.6) and anti-cheat (9.7)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 69 of 92)",
 content: `In **9.2** you could already show timer/lap on UI. In **9.4** Remotes appeared. Today you stitch that into a **lap / time leaderboard** - so the race is visible not only in your head.
Without this board, tomorrow's hazards and anti-cheat are harder to debug: you cannot see whether the server credited a lap at all.

**Do now (3 min):** open the race and write: what already counts on the server, and what only in LocalScript?`,
 },
 {
 title: "Leaderboard ≠ pretty TextLabel",
 content: `| Pretty UI only | Real board |
|---------------|-----------------|
| Numbers from client | Numbers from server state |
| Easy to fake | Fakes do not enter the top |
| One player "seems OK" | 2+ players compare fairly |
| Forgotten after Stop | Race state clear in Output |

HUD is the **stadium board**. The judge (server) runs the stopwatch. Spectators do not get to set the score themselves.

In a teaching race the board can be simple: even a \`Frame\` with 3 rows is enough to hand in.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Two ways to show progress",
 content: `| Method | Plus | Minus |
|--------|------|-------|
| **leaderstats** IntValue \`Laps\` | Visible in TAB, simple | Little room for time/top |
| **RemoteEvent FireClient** + ScreenGui | Flexible top UI | You must build Gui |
| **IntValue/StringValue** on Player | Replicates to client | Not a sorted top by itself |

Course recommendation:
- \`Laps\` in leaderstats **or** Attribute - for quick debug;
- \`RaceBoardUpdate\` FireClient with a top table - for a nicer board.

You can start with leaderstats today and add FireClient top in Part B. Main point - one server truth: whatever UI you draw, numbers come from race[player], not client fantasy.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server-side action.`,
 },
 {
 title: "Server race state (reminder)",
 content: `Per player:

\`race[player] = {\`
\` laps = 0,\`
\` lastCheckpoint = 0,\`
\` startTime = os.clock(),\`
\` finished = false,\`
\` bestTime = nil,\`
\`}\`

When the server **honestly** credits a lap (after Remote + validation from 9.4):

\`race[player].laps += 1\`
\`updateLeaderstats(player)\`
\`broadcastBoard()\`

Do not increase \`laps\` in LocalScript. UI only displays.

**PlayerRemoving:** \`race[player] = nil\` so you do not keep dead references.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "leaderstats Laps - minimum in 8 minutes",
 content: `If leaderstats from other modules are missing - create on PlayerAdded:

\`local folder = Instance.new("Folder")\`
\`folder.Name = "leaderstats"\`
\`folder.Parent = player\`
\`local laps = Instance.new("IntValue")\`
\`laps.Name = "Laps"\`
\`laps.Value = 0\`
\`laps.Parent = folder\`

After +lap:

\`player.leaderstats.Laps.Value = race[player].laps\`

TAB shows progress immediately. For finish you can add \`BestTime\` as StringValue (\`"12.34"\`) - IntValue is awkward for fractions.

Remember: only the **server** writes leaderstats.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server-side action.`,
 },
 {
 title: "FireClient board: data format",
 content: `Server builds an array:

\`{\`
\` { name = "Alex", laps = 3, time = 42.1 },\`
\` { name = "Sam", laps = 2, time = 30.0 },\`
\`}\`

Sorting (example logic):
1. Higher \`laps\` ranks higher.
2. On equal laps - lower \`time\` ranks higher (if you track lap/race time).

\`BoardRE:FireAllClients(topList)\`
or \`FireClient(player, topList)\` if the board is personal.

Client:

\`BoardRE.OnClientEvent:Connect(function(list)\`
\` redrawRows(list)\`
\`end)\`

Do not accept a ready sorted top from the client. Client may only **request refresh** (optional); server builds the list again.

**Do now (5 min):** drive one track segment / lap and confirm the counter/time updated.`,
 },
 {
 title: "Leaderboard UI (build)",
 content: `StarterGui \`RaceBoard\`:
- Frame at the back / side (not full screen).
- 3-5 TextLabel rows \`Row1..Row5\`.
- Separate \`MyLaps\` / \`MyTime\` for yourself.

LocalScript:
1. Waits for Remotes (\`WaitForChild\`).
2. Listens to BoardUpdate.
3. Sets text \`i .. ". " .. name .. " - " .. laps .. " laps"\`.

Onboarding: small caption "Leaderboard (server)".

**Do now (7 min):** 3 empty rows + MyLaps, no sorting yet - first get +lap → update working.`,
 },
 {
 title: "Lock in Remote: who fires when",
 content: `| Event | Who | What |
|-------|-----|-----|
| Passed checkpoint | Client FireServer(cpIndex) **or** server Touched | Request |
| Credit lap | Server | laps++ |
| Update board | Server FireClient/All | Data |
| Show numbers | LocalScript | UI |

Typical mistake after 9.4: Remote exists, but UI still runs its own counter and ignores the server. Today **cut** client "fake laps++".

Test: server Output print laps; HUD should match 1:1.

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "Time on the board: what to count",
 content: `| Metric | Formula (idea) | For |
|---------|----------------|----------|
| Current race time | \`os.clock() - startTime\` | HUD while driving |
| Finish time | same at finished | Finisher leaderboard |
| Best | min of previous | Records |

Current time can:
- be sent from server every 0.5 s (FireClient) - simple, some traffic;
- or keep \`startTime\` on client **for display only**, but final result still from server.

For hand-in: final/top time **from server**. Live tick may be client approximate if you label "approx".

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Two players: do not mix states",
 content: `| Bug | Fix |
|-----|------|
| One laps for everyone | \`race[player]\` key |
| FireAllClients with only one player's data | Build list from all race[*] |
| Leaving player leaves a ghost row | PlayerRemoving cleans |
| Respawn resets UI, not state | Listen CharacterAdded only for Character; do not zero laps without a rule |

Playtest: 2 Studio windows / 2 accounts - both +lap independently, board shows both.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Leaderboard playtest",
 content: `| # | Action | Expectation |
|---|-----|------------|
| 1 | Start race | Laps 0, time running / ready |
| 2 | Honest +lap | Laps 1 on TAB/HUD and server |
| 3 | Fake laps on client | Board/TAB does not change (or rolls back) |
| 4 | Finish | Time appears in top / MyTime |
| 5 | Second player | Separate rows |
| 6 | Player leaves | No board crash |
| 7 | Output | No red errors |

Item 3 bridges to 9.7. If the client can change TAB Laps - you write leaderstats from LocalScript: **fix today**.

**Do now (5 min):** run the test table once and record pass/fail for each row.`,
 },
 {
 title: "Lesson 69 hand-in checklist",
 content: `- [ ] Server race state with laps
- [ ] Laps visible (leaderstats and/or HUD)
- [ ] Board or top updates from server
- [ ] No client laps++ as source of truth
- [ ] Lap/checkpoint Remote locked in (from 9.4)
- [ ] PlayerRemoving clears state
- [ ] Playtest 1-4 green
- [ ] Save: Lesson 9.5 - Race Leaderboard

Next **9.6** adds hazards - lap accounting must stay stable. If the board already matches the server 1:1, you will instantly see whether Oil "ate" a lap or only slowed the car.

**Do now (3 min):** walk the checklist and check only items you truly finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Laps++ only in LocalScript",
 explanation: "Leaderboard lies, easy cheat.",
 correctApproach: "Server + replication/FireClient",
 },
 {
 mistake: "Client sends a ready topList",
 explanation: "Faked ranking places.",
 correctApproach: "Server sorts and sends list",
 },
 {
 mistake: "One global laps on server with no player key",
 explanation: "Players steal each other's progress.",
 correctApproach: "race[player]",
 },
 {
 mistake: "Board does not update after a lap",
 explanation: "Forgot broadcast after laps++.",
 correctApproach: "updateLeaderstats + FireClient after change",
 },
 {
 mistake: "BestTime as IntValue with a fraction",
 explanation: "Precision loss / confusion.",
 correctApproach: "StringValue or separate number *100",
 },
 {
 mistake: "Not clearing race on PlayerRemoving",
 explanation: "Leaks and odd rows.",
 correctApproach: "nil + update board",
 }
 ],
 summary: "You built a lap/time leaderboard on server truth: laps in race state, HUD/TAB and board via FireClient or leaderstats, Remote only as a signal. This is the race board before hazards and anti-cheat.",
 practiceTask: {
 title: "Lap board (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** server laps visible to the player + a simple board.

### Part A - State and leaderstats (10 min)
1. race[player] with laps / startTime.
2. leaderstats.Laps or Attribute.
3. After honest +lap (Remote) update Value.

### Part B - Board UI (12 min)
1. RaceBoard with 3 rows + MyLaps.
2. RemoteEvent BoardUpdate.
3. Server sorts list and FireAllClients.
4. Remove client fake counter.

### Part C - Playtest (8 min)
1. Honest lap = Output and HUD match.
2. Trying to change Laps on client does not affect board.
3. **Save:** Lesson 9.5 - Race Leaderboard`,
 hints: [
 "MyLaps 1:1 with server first, then top-3",
 "print on server after laps++ is your best friend",
 "WaitForChild on Remotes in LocalScript"
 ],
 optionalChallenge: "BestTime StringValue + \"Record: …\" line after finish.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 9.5?",
 options: [
          "Show laps/time from server accounting on HUD/leaderboard",
          "Delete RemoteEvent",
          "Only decorate the track",
          "Publish with no race"
        ],
 correctAnswer: 0,
 explanation: "Leaderboard on server truth.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where should laps increase?",
 options: [
          "Only in LocalScript for looks",
          "On the server after a valid lap/checkpoint",
          "In Lighting",
          "In a Part name"
        ],
 correctAnswer: 1,
 explanation: "Server accounting.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why is accepting a ready topList from the client bad?",
 options: [
          "FireClient then does not exist",
          "UI cannot draw TextLabel",
          "Client can fake ranking places",
          "leaderstats are forbidden"
        ],
 correctAnswer: 2,
 explanation: "Server sorts.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why leaderstats.Laps in a race?",
 options: [
          "It replaces VehicleSeat",
          "It disables Touched",
          "Required for Skybox",
          "Quick progress in TAB and easy to debug"
        ],
 correctAnswer: 3,
 explanation: "Simple number replication.",
 },
 {
 id: "q5",
 type: MC,
 question: "What does FireClient with board data do?",
 options: [
          "Writes Coins to everyone with no check",
          "Sends the client a list to draw UI",
          "Deletes RemoteEvent",
          "Creates Terrain"
        ],
 correctAnswer: 1,
 explanation: "Updating the shop window.",
 },
 {
 id: "q6",
 type: MC,
 question: "How to store two players' state?",
 options: [
          "One global laps variable",
          "Only on the first client",
          "Separate race[player] entry for each",
          "In ReplicatedFirst as Sound"
        ],
 correctAnswer: 2,
 explanation: "Player key.",
 },
 {
 id: "q7",
 type: MC,
 question: "What to do in PlayerRemoving?",
 options: [
          "Clear race[player] and update board",
          "Delete Workspace",
          "Disable Pathfinding",
          "Required Publish"
        ],
 correctAnswer: 0,
 explanation: "Cleaning state.",
 },
 {
 id: "q8",
 type: MC,
 question: "How to check the HUD is not lying?",
 options: [
          "Change the sky color",
          "Disable Output",
          "Rename module 1",
          "Compare server print laps with the number on screen"
        ],
 correctAnswer: 3,
 explanation: "1:1 server and UI.",
 },
 {
 id: "q9",
 type: MC,
 question: "Why is client laps++ as source of truth bad?",
 options: [
          "LocalScript cannot draw text",
          "RemoteEvent then compiles worse",
          "Easy to fake progress and break the leaderboard",
          "VehicleSeat requires client laps"
        ],
 correctAnswer: 2,
 explanation: "Never trust client.",
 },
 {
 id: "q10",
 type: MC,
 question: "What sorting is logical for a lap top?",
 options: [
          "Always random order",
          "More laps higher; on ties - better time",
          "Alphabetical by Material",
          "Whoever joined later is always first"
        ],
 correctAnswer: 1,
 explanation: "Fair hierarchy.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why WaitForChild for Remotes on the client?",
 options: [
          "It disables the leaderboard",
          "Without it the server does not exist",
          "WaitForChild replaces OnServerEvent",
          "The object may not have replicated yet"
        ],
 correctAnswer: 3,
 explanation: "Reliable UI start.",
 },
 {
 id: "q12",
 type: MC,
 question: "How does 9.5 prepare 9.7 anti-cheat?",
 options: [
          "If Laps is written by the server, fake client ++ will not enter TAB/board",
          "Anti-cheat cancels all UI",
          "You must delete leaderstats",
          "9.7 forbids FireClient"
        ],
 correctAnswer: 0,
 explanation: "Server truth = fewer holes.",
 },
 {
 id: "q13",
 type: MC,
 question: "What is better for fractional time in leaderstats?",
 options: [
          "Required Part.Transparency",
          "Only Color3",
          "StringValue or integer (ms), not a \"raw\" Int with a fraction",
          "Store time in the SpawnLocation name"
        ],
 correctAnswer: 2,
 explanation: "Convenient time storage.",
 },
 {
 id: "q14",
 type: MC,
 question: "When to call broadcastBoard?",
 options: [
          "Every frame from client with no need",
          "Only when sky changes",
          "Never - board draws itself from nothing",
          "After laps/finish change on the server"
        ],
 correctAnswer: 3,
 explanation: "Update after the fact.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the completed 9.5 artifact?",
 options: [
          "Theory only, no Studio",
          "Server laps + HUD/board from server + Save",
          "Empty Baseplate",
          "Client counter with no server"
        ],
 correctAnswer: 1,
 explanation: "You need an honest board.",
 }
 ],
 },
}

export const enLesson96 = {
 lessonId: "lesson-roblox-9-6",
 moduleId: "module-09",
 order: 6,
 title: "9.6 - Hazards + collision",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Add 1-2 hazards on the track with honest Touched/zone",
 "Understand Collision Groups lite: car vs barrier vs player",
 "Add debounce so a hazard does not hit 20 times per second",
 "Set CameraType lite for racing (optional Follow/Custom)",
 "Prepare hazards so they do not break honest lap accounting (9.5-9.7)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 70 of 92)",
 content: `A track with no danger often feels "empty". Today you add **hazards** and a bit of **collision** order so the race has wow - but not chaos.

You will make:
1. 1-2 hazard zones on the track (oil, spikes, pit reset, bump).
2. Honest reaction: slow / knockback / reset to checkpoint - **on the server** if it affects the result.
3. **Debounce** so Touched does not spam.
4. Collision Groups lite (track barriers vs car).
5. Camera lite (brief): easier to drive from behind the car.

Do not build a 20-hazard amusement park. One or two **readable** dangers beat a lag maze.

**Do now (3 min):** place Part \`Hazard_Oil\` on a turn (bright color, CanCollide as needed).`,
 },
 {
 title: "Why hazards in a race (and when they are bad)",
 content: `| Good | Bad |
|-------|--------|
| Visible from afar, avoidable | Invisible "death" wall |
| Mistake costs time | Mistake = Studio crash / lose all laps for no reason |
| Teaches the track | Random one-shot every 0.1 s |
| Server decides the effect | LocalScript "kills" lap accounting itself |

A hazard is a **turn teacher**, not a teacher of hating the game.

If a hazard breaks VehicleSeat or teleports through finish - tomorrow anti-cheat (9.7) and Ship (9.8) will suffer.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Hazard types for a one-hour lesson",
 content: `| Type | Effect | Difficulty |
|-----|-------|------------|
| **Oil / slow** | For 1-2 s reduce speed / spin | Easy |
| **Bump** | AssemblyLinearVelocity push | Medium |
| **Pit reset** | Teleport to last checkpoint | Medium |
| **Barrier kill brick** | Reset + short i-frame | Easy, careful with spam |

Pick **one main** + optional second lite.

Names: \`Hazard_Oil\`, \`Hazard_Pit\`, folder \`Workspace/Track/Hazards/\`.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Touched vs zone: how to listen to a hazard",
 content: `Common option: \`Hazard.Touched:Connect\`.

Touched problems:
- fires many times in a row;
- wheel, body, accessory can touch;
- sometimes a "ghost" at high speed.

Practice:
1. Check that hit is part of Character **or** the car (look for SeatWeld / Car model).
2. Find \`player\` via \`Players:GetPlayerFromCharacter\` or car owner attribute.
3. \`debounce[player] = true\` → effect → \`task.delay(1.5, …)\`.

Alternative: invisible Part zone with \`GetPartBoundsInBox\` every 0.2 s on server - more stable, a bit harder. For the lesson Touched + debounce is enough.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Effect on the server (honest)",
 content: `If the hazard only spins the camera on the client - OK as juice. If it **resets progress / teleports** - server only.

Slow pseudo:

\`Hazard.Touched:Connect(function(hit)\`
\` local player = resolvePlayer(hit)\`
\` if not player or debounce[player] then return end\`
\` debounce[player] = true\`
\` local car = resolveCar(player)\`
\` if car and car.PrimaryPart then\`
\` -- lite: reduce speed via VectorForce / or small teleport penalty\`
\` applySlow(car, 1.5)\`
\` end\`
\` task.delay(1.5, function() debounce[player] = false end)\`
\`end)\`

For pit reset: teleport car/player to \`LastCheckpoint.CFrame\` **after** checking the player is in a race. Do not lower \`laps\` without a game rule (prefer a time penalty over -lap unless designed).

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Collision Groups lite",
 content: `Sometimes the car sticks in decor, or the player falls through the track, or a barrier hits wheels oddly.

**CollisionGroup** = a named group of Parts between which you can disable collision.

Typical teaching set:
| Group | Who |
|-------|-----|
| \`TrackBarrier\` | Track walls |
| \`RaceCar\` | Car body/wheels |
| \`Default\` | Everything else |

Example idea (PhysicsService):
- barriers do not collide with tiny decor;
- or wheels collide with road, but the car nose does not catch low curbs (careful - easy to break realism).

At course start: **1 change** (for example barrier does not push the walking player at start, only the car). Do not rewrite all physics.

Document in a note: which groups and why - for the instructor in 20 s.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "CanCollide / CanQuery / CanTouch - cheat sheet",
 content: `| Property | Why |
|----------|--------|
| \`CanCollide\` | Physical collision |
| \`CanTouch\` | Whether it generates Touched |
| \`CanQuery\` | Raycast/overlap (later) |
| \`Anchored\` | Whether the hazard stands as a zone |

For Oil often: \`CanCollide = false\`, \`CanTouch = true\`, Transparency 0.4 - visible, but not a wall.

For Pit: collision may be true (pit) or false + Touched teleport - pick one style and do not mix.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Camera lite for racing",
 content: `Full custom camera is another world. Today **lite**:

| Option | How | When |
|---------|-----|------|
| Default | Nothing | If already comfortable |
| \`Camera.CameraType = Enum.CameraType.Follow\` | LocalScript on sit | Quick comfort |
| Scriptable + offset behind car | Harder | Challenge |

On \`VehicleSeat:GetPropertyChangedSignal("Occupant")\` (client):
- sat → Follow or light offset;
- exited → Custom / back.

Do not leave the camera broken forever after exiting the car - a typical playtest complaint.

**Do now (5 min):** if camera causes "seasickness" - set Follow only while driving.`,
 },
 {
 title: "Hazards vs lap accounting (do not break 9.5)",
 content: `| Hazard action | Effect on laps | Recommendation |
|------------|---------------|--------------|
| Slow | None | OK always |
| Bump | None | OK |
| Teleport to CP | None | OK |
| "Death" / respawn | May break Seat | Reseat or reset car |
| Zone on finish as hazard | Fake finishes | **Do not** put Oil on FinishPart |

Rule: a hazard does **not** fire Finish Remote. Finish stays a separate clean zone.

If you teleport - do not place the player inside FinishPart.

**Do now (5 min):** drive one track segment / lap and confirm the counter/time updated.`,
 },
 {
 title: "Hazard playtest (10')",
 content: `| # | Test | Expectation |
|---|------|------------|
| 1 | Drive through Oil once | 1 effect, not 20 |
| 2 | Stand on Oil 3 s | Debounce holds |
| 3 | Drive around | Avoidable |
| 4 | Pit | Returns to CP, laps intact |
| 5 | 2 players (if available) | Effects separate |
| 6 | Output | No error spam |
| 7 | Camera after exit | Normal |

If item 1 is red - fix debounce first, not a new hazard.

**Do now (5 min):** run the test table once and record pass/fail for each row.`,
 },
 {
 title: "Link to 9.7-9.8",
 content: `| Today | Next |
|----------|------|
| Readable hazards | Anti-cheat does not confuse Oil with finish |
| Collision lite | Fewer "stuck in wall" on Ship |
| Camera Follow | 90 s demo more comfortable |
| 1-2 hazards | Ship rubric: wow without chaos |

Save: \`Lesson 9.6 - Race Hazards\`.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Lesson 70 hand-in checklist",
 content: `- [ ] 1-2 named Hazards in Hazards folder
- [ ] Effect with debounce (no Touched spam)
- [ ] Server decides penalty/teleport (if any)
- [ ] Hazard not on FinishPart
- [ ] (Lite) Collision group or intentional CanCollide
- [ ] (Lite) Camera does not break after exit
- [ ] Playtest 1-4 green
- [ ] Save Lesson 9.6 - Race Hazards

Next **9.7** checks whether finish is still honest when the track already has hazard chaos.

**Do now (3 min):** walk the checklist and check only items you truly finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Touched without debounce at high speed",
 explanation: "Effect 30 times, lag and \"random death\".",
 correctApproach: "debounce[player] + delay",
 },
 {
 mistake: "Hazard on the finish zone",
 explanation: "Confusion with finish Remote / fake triggers.",
 correctApproach: "Finish separate, Oil earlier on the track",
 },
 {
 mistake: "LocalScript teleports and changes laps",
 explanation: "Cheat and accounting desync.",
 correctApproach: "Teleport/penalty on the server",
 },
 {
 mistake: "CanCollide true on \"oil\" that becomes a wall",
 explanation: "Car sticks, player frustration.",
 correctApproach: "Oil: CanCollide false, CanTouch true",
 },
 {
 mistake: "Scriptable camera with no restore",
 explanation: "After the race the world is \"broken\".",
 correctApproach: "Restore camera type on exit from Seat",
 },
 {
 mistake: "10 hazards instead of 1 stable one",
 explanation: "Hour burns, none are debugged.",
 correctApproach: "1-2 readable hazards",
 }
 ],
 summary: "You added track hazards with debounce and honest server effects, touched Collision Groups lite and Follow camera for driving. Hazards give wow without breaking lap accounting and finish - a base for anti-cheat 9.7 and Ship 9.8.",
 practiceTask: {
 title: "Hazard on a turn (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** 1-2 hazards + debounce + do not break finish.

### Part A - Build (8 min)
1. Folder Track/Hazards.
2. Hazard_Oil (visible, CanCollide false).
3. Optional Hazard_Pit before a hard spot.

### Part B - Logic (15 min)
1. Touched → resolvePlayer → debounce.
2. Slow or teleport to CP (server).
3. Ensure FinishPart is clean of hazards.
4. (Lite) Collision group or barrier CanCollide tweak.
5. (Lite) Camera Follow while Occupant.

### Part C - Playtest (7 min)
1. Test table 1-4.
2. Output without spam.
3. **Save:** Lesson 9.6 - Race Hazards`,
 hints: [
 "One Oil with stable debounce first",
 "Do not put a hazard on the finish line",
 "On exit from the car, restore the camera"
 ],
 optionalChallenge: "Second hazard type (bump) + Billboard \"Danger!\" 20 studs before the zone.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 9.6?",
 options: [
          "Add readable hazards and collision/camera order on the track",
          "Delete RemoteEvent",
          "Only make a DataStore",
          "Publish Public with no track"
        ],
 correctAnswer: 0,
 explanation: "Hazards + collision lite.",
 },
 {
 id: "q2",
 type: MC,
 question: "Why is debounce needed on Hazard.Touched?",
 options: [
          "Debounce disables VehicleSeat forever",
          "Touched spams many times in a row at speed",
          "Without debounce Parts do not exist",
          "It replaces finish"
        ],
 correctAnswer: 1,
 explanation: "Effect anti-spam.",
 },
 {
 id: "q3",
 type: MC,
 question: "Typical settings for an Oil zone?",
 options: [
          "CanCollide true and fully transparent always",
          "Delete Part after one frame",
          "CanCollide false, CanTouch true, visible to player",
          "Only change laps on the client"
        ],
 correctAnswer: 2,
 explanation: "Trigger zone, not a wall.",
 },
 {
 id: "q4",
 type: MC,
 question: "Who should run teleport/penalty that affects the race?",
 options: [
          "Only LocalScript with no server",
          "Lighting",
          "Terrain Editor",
          "Server Script"
        ],
 correctAnswer: 3,
 explanation: "Honest effect.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why not put Hazard directly on FinishPart?",
 options: [
          "FinishPart then becomes faster",
          "Confusion with finish and extra triggers / accounting bug risk",
          "Touched is forbidden near finish in Roblox",
          "It always raises FPS"
        ],
 correctAnswer: 1,
 explanation: "Separate finish and hazard.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why Collision Groups in this lesson (lite)?",
 options: [
          "To paint the sky",
          "It creates a RemoteEvent",
          "Control which Parts collide with what (barrier/car/player)",
          "It deletes Humanoid"
        ],
 correctAnswer: 2,
 explanation: "Physics order.",
 },
 {
 id: "q7",
 type: MC,
 question: "What to do with the camera after exiting VehicleSeat?",
 options: [
          "Restore normal mode (do not leave broken Scriptable)",
          "Delete Camera forever",
          "Set ClockTime = 0 required",
          "Disable Output"
        ],
 correctAnswer: 0,
 explanation: "Do not break post-race.",
 },
 {
 id: "q8",
 type: MC,
 question: "How many hazards are optimal at lesson start?",
 options: [
          "Required 50",
          "0 and never test",
          "Only invisible with no hint",
          "1-2 stable and visible"
        ],
 correctAnswer: 3,
 explanation: "Quality > quantity.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which of these is bad hazard design?",
 options: [
          "Bright Oil on a turn with debounce",
          "Billboard \"Danger\" before a pit",
          "Invisible death zone with no chance to avoid",
          "Time penalty instead of Studio crash"
        ],
 correctAnswer: 2,
 explanation: "Frustration without learning.",
 },
 {
 id: "q10",
 type: MC,
 question: "Should a hazard itself fire Finish Remote?",
 options: [
          "Yes, always",
          "No - finish is a separate clean zone/logic",
          "Only if Oil is red",
          "Only on the client"
        ],
 correctAnswer: 1,
 explanation: "System separation.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why names Hazard_Oil in the Hazards folder?",
 options: [
          "Otherwise Touched does not work",
          "Roblox requires exactly these names",
          "To disable Pathfinding",
          "Find and explain structure quickly on Ship/to instructor"
        ],
 correctAnswer: 3,
 explanation: "Clean Explorer.",
 },
 {
 id: "q12",
 type: MC,
 question: "Which playtest catches effect spam?",
 options: [
          "Drive Oil and count how many times it fired",
          "Change the sky",
          "Rename Lighting",
          "Delete SpawnLocation"
        ],
 correctAnswer: 0,
 explanation: "Debounce check.",
 },
 {
 id: "q13",
 type: MC,
 question: "CameraType.Follow in a race (lite) why?",
 options: [
          "It increases Coins",
          "It disables Remotes",
          "Easier to keep the car in frame while driving",
          "It always breaks Seat"
        ],
 correctAnswer: 2,
 explanation: "Control comfort.",
 },
 {
 id: "q14",
 type: MC,
 question: "How does 9.6 prepare 9.7?",
 options: [
          "You must delete all Hazards before anti-cheat",
          "9.7 forbids Touched",
          "Collision groups cancel the server",
          "Hazards must not give a fake finish; anti-cheat will check honesty"
        ],
 correctAnswer: 3,
 explanation: "Clean system boundaries.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the completed 9.6 artifact?",
 options: [
          "Theory only, no Studio",
          "1-2 hazards with debounce + lite collision/camera + Save",
          "Empty Baseplate",
          "10 invisible kill-bricks with no test"
        ],
 correctAnswer: 1,
 explanation: "You need working hazards.",
 }
 ],
 },
}

export const enLesson97 = {
 lessonId: "lesson-roblox-9-7",
 moduleId: "module-09",
 order: 7,
 title: "9.7 - Anti-cheat playtest",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Write a short anti-cheat playtest for the race (client lies)",
 "Check finish/lap Remote: distance, checkpoint order, spam",
 "Close at least 2 live holes (P0/P1) with a timer",
 "Keep Output and bug list clean on the golden path",
 "Prepare an honest base for Ship Race (9.8)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 71 of 92)",
 content: `In **9.4-9.5** you already have Remotes and lap accounting. Today one question: **can you break your own race in 5 minutes?**

You work as a tester-attacker (on your Place, not other people's games):
1. Open the race from 9.1-9.6.
2. Try "client lies": fake finish, Remote spam, skip checkpoints.
3. Watch what the server **denied** or **allowed**.
4. Fix holes.
5. Save the Place for tomorrow's Ship (9.8).

This is not a "become a hacker" lesson. This is a **Never trust the client** habit on a live track.

**Do now (2 min):** open Output and find finish/lap \`OnServerEvent\`. If missing - today's P0 #1: add at least lite server accounting.`,
 },
 {
 title: "Why anti-cheat now",
 content: `| Without "client lies" playtest | With playtest |
|-----------------------------|------------|
| "OK in Solo" | You see holes before Ship |
| Leaderboard lies | Time/laps honest |
| Tomorrow rubric C is red | Tomorrow Ship is faster |
| Habit of trusting LocalScript | Habit of validating on server |

In a race the sweetest cheat is **saying "I am at finish"** without driving. If that works - lesson 9.4 is not alive yet.

Remote is a letter "I am submitting work". Server is the teacher who checks whether the student is **in class**, not writing from home "already submitted".

Write today's rule in one line: *"any number from the client (laps, finish, time) is suspicious until the server confirms."* Same principle tomorrow in Ship and later in the hub shop.

**Do now (3 min):** find one symptom from the table in the Place and fix it or confirm it is absent.`,
 },
 {
 title: "Attack map for a student race (lite)",
 content: `| # | Attack / bug | What you expect from server |
|---|-------------|------------------------|
| 1 | FireServer finish from spawn | Deny (far / too few laps) |
| 2 | Spam Finish 20× per second | 1 result or cooldown |
| 3 | FireServer "lap +1" with no checkpoints | Deny / ignore |
| 4 | Skip checkpoint order | Deny |
| 5 | Repeat finish after finished | Deny |
| 6 | Negative / garbage argument | typeof + return |
| 7 | UI writes "win" with no server | Does not affect leaderboard |
| 8 | Two players - state does not mix | Separate race[player] entries |

Today's duty: run **1-5** and close what is red. 6-8 if you have time.

Do not hunt external exploits. A temporary LocalScript in Studio with \`FireServer\` for the test is enough (then delete it).

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "How to \"attack\" safely in Studio",
 content: `1. In \`StarterPlayerScripts\` temporary LocalScript \`Cli_CheatTest\` (name on purpose).
2. Key (for example P) → \`FinishRE:FireServer()\`.
3. Play → stand at spawn → press P.
4. Watch Output and UI: did it credit a win?
5. After lessons **delete** or Disable this Script.

Another test: from start FireServer with garbage \`itemId\` / a number instead of the expected checkpoint argument.

School rule: tests only on **your** Place. Do not touch other people's published games.

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "Finish validation: the minimum that saves you",
 content: `Server before a "win":

1. \`race[player]\` exists and \`not finished\`.
2. \`laps >= NEED_LAPS\` (or checkpoints collected).
3. \`nearFinish(player)\` - HumanoidRootPart in finish zone (Magnitude).
4. (Optional) time > minimum realistic (anti-teleport in 0.1 s).
5. Set \`finished = true\`, compute time, FireClient ok.

Pseudo:

\`local function nearFinish(player)\`
\` local hrp = player.Character and player.Character:FindFirstChild("HumanoidRootPart")\`
\` if not hrp then return false end\`
\` return (hrp.Position - FinishPart.Position).Magnitude <= 25\`
\`end\`

Tune 25 to your zone. Main point - **not zero checks**.

**Do now (4 min):** one hit/hazard in Play - Health should change on the server, not in a LocalScript.`,
 },
 {
 title: "Checkpoints: order and anti-skip",
 content: `| Bad | Good |
|--------|-------|
| Any checkpoint +1 lap | Only next expected index |
| Touched with no debounce | Debounce per player + Part |
| Client says "I am on CP3" | Server checks distance to CP3 |

State: \`lastCheckpoint = 0\`. On CP1 allow only if last==0 → becomes 1. At finish require last==N or laps ready.

Touched spam: one Part can touch 10 times per second. Keep \`lastTouchAt[player]\` or "already visited this CP this lap".

**Do now (3 min):** find one symptom from the table in the Place and fix it or confirm it is absent.`,
 },
 {
 title: "Rate limit on Remote (like in the shop)",
 content: `Same pattern as in the hub:

\`local lastAt = {}\`
\`local COOLDOWN = 0.25\`

\`FinishRE.OnServerEvent:Connect(function(player, ...)\`
\` local now = os.clock()\`
\` if now - (lastAt[player.UserId] or 0) < COOLDOWN then return end\`
\` lastAt[player.UserId] = now\`
\` tryFinish(player)\`
\`end)\`

For checkpoints cooldown can be shorter, but **without** a tight handling loop.

PlayerRemoving clears \`race[player]\` and \`lastAt\`.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "What NOT to do in course \"anti-cheat\"",
 content: `- Write "military" anti-cheat in 2000 lines.
- Auto-ban players in a teaching Place.
- Study other people's exploit tools.
- Hide all logic in obfuscation instead of simple checks.

Enough: **validation + debounce + one truth on the server**. Same muscle tomorrow in Ship and later in the M10 shop.

**Do now (3 min):** find one symptom from the table in the Place and fix it or confirm it is absent.`,
 },
 {
 title: "Anti-cheat bug list (template)",
 content: `| ID | Attack | Result | P | Status |
|----|-------|-----------|---|--------|
| 1 | Finish from spawn | Won / denied | P0 | |
| 2 | Spam Finish | 1 or many? | P0 | |
| 3 | Lap with no CP | +lap / no | P0 | |
| 4 | Garbage argument | Crash / ignore | P1 | |
| 5 | Repeat after finished | | P0 | |

P0 = you can win without driving or break accounting. Fix that **today**.

**Do now (5 min):** fill rows 1-3 with facts from Play.`,
 },
 {
 title: "Live fixes: 2 holes with a timer",
 content: `After the first test wave pick the **2 worst** red rows.

Sprint (~15 min):
1. 7 min - fix A (for example nearFinish).
2. 7 min - fix B (finished / cooldown / CP order).
3. Repeat attacks 1-3 - should be deny.
4. Honest 1-lap race - should be ok.

Do not paint a new track. Anti-cheat is about **checks**, not decor.

**Do now (3 min):** find one symptom from the table in the Place and fix it or confirm it is absent.`,
 },
 {
 title: "Link to 9.8 Ship Race",
 content: `| Today | Tomorrow |
|----------|--------|
| Holes closed or documented | Rubric C (network) greener |
| Attack bug list | Proof for instructor / portfolio |
| Cli_CheatTest deleted/Disabled | Clean Place for demo |
| Validation habit | Faster Ship with no surprises |

If finish is still client-only - do **not** go to 9.8 "on luck". Server truth first.

Save: \`Lesson 9.7 - Race AntiCheat\`.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Lesson 71 hand-in checklist",
 content: `- [ ] Attack list 1-5 with ok/deny facts
- [ ] Finish/lap on server with ≥1 validation (zone or order)
- [ ] Debounce / finished spam protection
- [ ] ≥2 live fixes done today
- [ ] Honest race works after fixes
- [ ] Temporary CheatTest Script removed or Disabled
- [ ] Output no crash on attacks and on honest lap
- [ ] Save Lesson 9.7 - Race AntiCheat

Next **9.8** stitches everything with the Ship rubric - security should not fall apart from one P key.

**Do now (3 min):** walk the checklist and check only items you truly finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Treating Solo Play as proof of security",
 explanation: "Without a \"client lies\" attack the hole stays invisible.",
 correctApproach: "Intentional FireServer from spawn + log",
 },
 {
 mistake: "Trusting finish with no nearFinish / laps",
 explanation: "Win by teleporting the event.",
 correctApproach: "Zone + laps/checkpoints on server",
 },
 {
 mistake: "No finished / cooldown",
 explanation: "Spam multiplies results.",
 correctApproach: "One finish + rate limit",
 },
 {
 mistake: "Leaving Cli_CheatTest in the final Place",
 explanation: "Tomorrow on demo you accidentally \"teach\" a cheat.",
 correctApproach: "Disabled or Delete after tests",
 },
 {
 mistake: "Fixing track color instead of P0 validation",
 explanation: "Ship tomorrow fails rubric C.",
 correctApproach: "Deny on fake finish first",
 },
 {
 mistake: "Mixing two players' state in one table with no player key",
 explanation: "Others' laps/finishes.",
 correctApproach: "race[player] separately",
 }
 ],
 summary: "You ran an anti-cheat race playtest: \"client lies\" attacks, server denies, debounce, and at least 2 fixes. Lesson 71 prepares an honest finish for Ship Race in 9.8.",
 practiceTask: {
 title: "Attacks on finish (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** fake finish fails; honest race passes.

### Part A - Attack bug list (8 min)
1. Attack table 1-5.
2. Temporary Cli_CheatTest (key → FireServer).
3. Record ok/deny for each attack.

### Part B - Fixes (15 min)
1. nearFinish and/or laps/CP check.
2. finished + cooldown.
3. typeof on arguments.
4. Repeat attacks - expect deny.
5. Honest 1 lap - expect ok.

### Part C - Cleanup (7 min)
1. Disabled/Delete CheatTest.
2. Output clean.
3. **Save:** Lesson 9.7 - Race AntiCheat`,
 hints: [
 "Spawn attack first - fastest diagnosis",
 "Tune Magnitude to FinishPart for your zone",
 "Do not publish a Place with CheatTest enabled"
 ],
 optionalChallenge: "Minimum lap time (anti-instant): if t < 5 s with NEED_LAPS=1 - deny with a log.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 9.7?",
 options: [
          "Find and close holes where the client can lie about finish/laps",
          "Draw a new track from scratch",
          "Publish Public immediately",
          "Delete RemoteEvent"
        ],
 correctAnswer: 0,
 explanation: "Race anti-cheat playtest.",
 },
 {
 id: "q2",
 type: MC,
 question: "What does the \"Finish from spawn\" attack mean?",
 options: [
          "Deleting SpawnLocation",
          "FireServer finish while standing far from the finish zone",
          "Changing car color",
          "Disabling Output"
        ],
 correctAnswer: 1,
 explanation: "Fake win with no driving.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why nearFinish on the server?",
 options: [
          "To speed up VehicleSeat",
          "It replaces the timer UI",
          "So finish is not credited for a player far from FinishPart",
          "It is only needed for Skybox"
        ],
 correctAnswer: 2,
 explanation: "Position validation.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why the finished flag?",
 options: [
          "To disable Anchored",
          "It creates Terrain",
          "It replaces Pathfinding",
          "So repeat/spam finish does not give many wins"
        ],
 correctAnswer: 3,
 explanation: "One-shot result.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why is Solo Play without attacks not enough?",
 options: [
          "Play in Studio is forbidden",
          "Honest driving does not show whether the server will deny a client lie",
          "Output does not work in Solo",
          "Remotes never replicate"
        ],
 correctAnswer: 1,
 explanation: "You need an intentional lie test.",
 },
 {
 id: "q6",
 type: MC,
 question: "What to do with Cli_CheatTest after lessons?",
 options: [
          "Leave Enabled forever in prod",
          "Put it in ReplicatedStorage as a secret",
          "Disabled or Delete",
          "Publish as a Tool for everyone"
        ],
 correctAnswer: 2,
 explanation: "Remove the test cheat.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why cooldown on Finish Remote?",
 options: [
          "So event spam does not break accounting",
          "To change track Material",
          "It disables Humanoid",
          "It is required for Decal"
        ],
 correctAnswer: 0,
 explanation: "Rate limit.",
 },
 {
 id: "q8",
 type: MC,
 question: "How do checkpoints protect against \"+lap from thin air\"?",
 options: [
          "Client sets lastCheckpoint with no server",
          "Checkpoints are always decorative only",
          "Renaming the Part is enough",
          "Server requires order / next index and distance"
        ],
 correctAnswer: 3,
 explanation: "Order and validation.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which of these is P0 for a race?",
 options: [
          "Slightly crooked barrier color",
          "Tiny Billboard offset",
          "You can win FireServer from spawn",
          "Imperfect Ambient"
        ],
 correctAnswer: 2,
 explanation: "Critical accounting hole.",
 },
 {
 id: "q10",
 type: MC,
 question: "School rule for \"anti-cheat tests\"?",
 options: [
          "Attack any games in the catalog",
          "Only on your Place; do not touch other people's published games",
          "Must download exploit tools",
          "Auto-ban classmates"
        ],
 correctAnswer: 1,
 explanation: "Learning ethics.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why typeof-check Remote arguments?",
 options: [
          "To increase Volume",
          "It replaces VehicleSeat",
          "typeof only works on the client",
          "Filter garbage (number/table instead of expected)"
        ],
 correctAnswer: 3,
 explanation: "Input validation.",
 },
 {
 id: "q12",
 type: MC,
 question: "How many live fixes does the practice expect at minimum?",
 options: [
          "At least 2 P0/P1 holes",
          "Required 50",
          "0 - theory only",
          "Only change the sky"
        ],
 correctAnswer: 0,
 explanation: "Attacks → fixes.",
 },
 {
 id: "q13",
 type: MC,
 question: "How does 9.7 prepare 9.8 Ship?",
 options: [
          "Ship forbids Remotes",
          "You must delete the whole track",
          "Network rubric tomorrow is greener if fake finish already denies",
          "Anti-cheat cancels UI"
        ],
 correctAnswer: 2,
 explanation: "Security before ship.",
 },
 {
 id: "q14",
 type: MC,
 question: "What must you check after fixes?",
 options: [
          "Only SpawnLocation color",
          "Only module name",
          "Disable Output forever",
          "Attacks deny again AND honest race ok"
        ],
 correctAnswer: 3,
 explanation: "Regression of both paths.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the completed 9.7 artifact?",
 options: [
          "Theory only, no Studio",
          "Attack bug list + server denies + ≥2 fixes + Save",
          "Empty Baseplate",
          "CheatTest Enabled in prod"
        ],
 correctAnswer: 1,
 explanation: "You need anti-cheat proof.",
 }
 ],
 },
}

export const enLesson98 = {
 lessonId: "lesson-roblox-9-8",
 moduleId: "module-09",
 order: 8,
 title: "9.8 - Ship Race",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Assemble one golden race path: start → laps → finish → leaderboard",
 "Check integration of timer/UI, finish Remote, and server lap accounting",
 "Walk the Ship Race rubric (~15 items) and close blockers",
 "Confirm the client cannot \"win\" without server validation",
 "Save the Place as the Module 9 artifact before the hub (M10)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 72 of 92)",
 content: `This is the **finale of Race + networking**. Not a new track from scratch and not "one more Remote". Today you **stitch** what you already have into a race you can show in 90 seconds.

In Module 9 you (or the group) built:
1. **9.1** - car + track + lap checkpoints.
2. **9.2** - timer / laps / UI.
3. **9.3-9.4** - Client vs Server + RemoteEvent (finish/lap).
4. **9.5** - lap leaderboard.
5. **9.6** - hazards / collision.
6. **9.7** - anti-cheat playtest.

Today's artifact: **one Place** where a player with no coach:
**sits in the car → understands the goal → drives laps → server credits → sees time/leaderboard → finish is honest.**

If a system is still missing - make **lite** just for the route (1 lap, 1 hazard, 1 finish Remote), not three half-done Places.

**Do now (3 min):** write the golden race path in one sentence. If you cannot - draw arrows on paper first.`,
 },
 {
 title: "What Ship Race means (and what it does not)",
 content: `| Ship Race | Not ship yet |
|-----------|-----------|
| Track + car + lap/time accounting **together** | Separate "pretty car" and UI with no link |
| Finish via Remote with **server** check | LocalScript sets "win" itself |
| Leaderboard / time visible to player | Only print in instructor Output |
| Output clean on 1-2 laps | Red errors "we ignore" |
| 60-90 s demo with no coaching | 5 min "now I'll show where start is" |

Ship does **not** mean an AAA Formula track. It means: **a short full race is already assembled**, named, and network-honest.

After this lesson Module 10 (hub) has an example: Remotes + server truth already in your head from racing.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Map of systems we stitch",
 content: `| System | Where it lives | What it gives the golden path |
|---------|---------|------------------------|
| Car + track | Workspace | VehicleSeat, start, checkpoints |
| Timer / laps UI | LocalScript + server events | Player sees progress |
| Finish/lap Remote | RS Remotes + SSS | Client asks, server decides |
| Lap / time accounting | Server table / leaderstats | Result truth |
| Leaderboard | FireClient or Values | Compare / own time |
| Hazards | Workspace + server damage/reset | Wow without wall cheats |
| Anti-cheat lite | 9.7 habits | Do not blindly trust "I am at finish" |

Integration rule: **one truth about laps and time** - on the server. UI only shows what the server sent or what replicated from Values.

**Do now (4 min):** in Explorer find finish/lap Remote, accounting script, timer UI. What is missing - P0 for today.`,
 },
 {
 title: "Golden race path (6-8 steps)",
 content: `Write **before** fixes:

1. Spawn near start / sign "Sit in the car, do N laps".
2. Sit in VehicleSeat → car drives.
3. Pass checkpoints in order (if any).
4. Server +1 lap / UI update.
5. After required laps - finish (Remote + validation).
6. See time / place on leaderboard.
7. Repeat race does not break accounting (state reset).
8. Output with no red on the route.

That is "integration". Not "all features in files", but **the player feels a race**.

Lite substitute: if leaderboard is still thin - a TextLabel "Your time: …" from the server is enough.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Ship Race rubric (~15 items)",
 content: `Mark **yes / no / almost**. Goal: maximum **yes** on the golden path.

### A. Track and start (1-4)
| # | Item | Yes? |
|---|-------|------|
| 1 | Spawn / start clear, car available | |
| 2 | Sign or marker states goal in ≤30-60 s | |
| 3 | Track is drivable (not stuck on first turn) | |
| 4 | Names/folders readable (Track/, Cars/, Remotes/) | |

### B. Race loop (5-8)
| # | Item | Yes? |
|---|-------|------|
| 5 | Laps or finish actually count | |
| 6 | UI shows time and/or lap | |
| 7 | Hazard (if any) fires honestly, not 20×/s | |
| 8 | Repeat race possible after reset | |

### C. Network and honesty (9-12)
| # | Item | Yes? |
|---|-------|------|
| 9 | Finish/lap goes through Remote (not client only) | |
| 10 | Server checks at least lite (distance/checkpoint/order) | |
| 11 | Faking "finish" from LocalScript does not give a win | |
| 12 | Anti-spam / debounce on Remote exists | |

### D. Ship quality (13-15)
| # | Item | Yes? |
|---|-------|------|
| 13 | Output clean on 1-2 laps | |
| 14 | Demo 60-90 s with no coach | |
| 15 | Save Lesson 9.8 - Race Ship | |

All "no" in B/C = Part B fix list. Do not paint a second track - close the loop.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Typical race integration holes",
 content: `| Symptom | Likely cause | Quick fix |
|---------|------------------|--------------|
| UI shows finish, server does not | Win only on client | Remote + server state |
| Laps jump / duplicate | No checkpoint order / debounce | lastCheckpoint + cooldown |
| Finish from afar | No position check | Magnitude / finish zone on server |
| Second race breaks | State not reset | resetRace(player) |
| Car does not drive | Anchored / Weld / Seat | Check 9.1 build |
| Empty leaderboard | No FireClient / Value | At least own time on UI |

**Do now (6 min):** walk the path once and mark the first red rubric item. Fix it before new decor.`,
 },
 {
 title: "Mini race data scheme",
 content: `On server per player (table or Folder):

\`laps\` - how many laps credited
\`lastCheckpoint\` - index of last valid checkpoint
\`startTime\` - os.clock() at start
\`finished\` - whether already finished
\`bestTime\` - best time (optional)

Finish pseudo:

\`FinishRE.OnServerEvent:Connect(function(player)\`
\` if race[player].finished then return end\`
\` if race[player].laps < NEED_LAPS then return end\`
\` if not nearFinish(player) then return end\`
\` local t = os.clock() - race[player].startTime\`
\` race[player].finished = true\`
\` updateBoard(player, t)\`
\` FinishRE:FireClient(player, true, t)\`
\`end)\`

Client only says "I finish" or "I passed checkpoint X". Server says "yes/no".

**Do now (4 min):** change one value in table/Config and confirm new behavior.`,
 },
 {
 title: "Track onboarding in 8 minutes",
 content: `A race newbie gets lost faster than in an obby: unclear where to drive and how many laps.

Minimum at start:
- sign with 2-3 steps;
- bright start-line color;
- ActionText / hint "Sit" on VehicleSeat (if Prompt).

Text:
*"1) Sit in the red car. 2) Drive along the arrows. 3) Do 1 lap to the finish."*

Check: look away from the monitor and walk up again - is start visible without your words?

**Do now (5 min):** drive one track segment / lap and confirm the counter/time updated.`,
 },
 {
 title: "Integration playtest (checklist)",
 content: `| # | Action | Expectation | Fact |
|---|-----|------------|------|
| 1 | New Play | Spawn and car OK | |
| 2 | Sit and drive | Controls work | |
| 3 | 1 lap / finish | Server credited | |
| 4 | UI time/lap | Matches the fact | |
| 5 | Fake finish from client (if you can) | Denied | |
| 6 | Spam Remote | Not 10 wins | |
| 7 | Second race | State reset | |
| 8 | Hazard (if any) | Honest effect | |
| 9 | Output | No red | |
| 10 | Demo 90 s | You fit | |

Items 3-6 are the heart of Ship Race. Without them rubric C is red.

**Do now (3 min):** walk the checklist and check only items you truly finished.`,
 },
 {
 title: "What to consciously postpone",
 content: `Do not do today:
- 12 cars and 5 tracks;
- full season / elo rating;
- Ideal CameraMode for an hour;
- Publish Public (closer to M12);
- new open-world around the track.

Do today:
- **one** MVP race;
- honest Remote + server accounting;
- time/lap UI;
- rubric + Save.

Everything "I still want" - into a note for polish / M11. Ship loves a narrow winning loop.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Link to M10 and portfolio",
 content: `| After 9.8 | Next |
|-----------|------|
| Working race with Remotes | Hub 10.x - same Never trust client habit |
| Golden path 90 s | Easier Demo Ready / SHOWCASE |
| Honest finish | Portfolio: "server validates lap" |
| Lite scope | Do not drag 3 genres into the final unless needed |

If finish cash register is still on the client - do **not** move on with pride. Today's P0: server win.

Save: \`Lesson 9.8 - Race Ship\`.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Lesson 72 hand-in checklist",
 content: `- [ ] Golden path written
- [ ] Rubric ~15 items marked
- [ ] Laps/time on server
- [ ] Finish via Remote with lite validation
- [ ] UI shows progress
- [ ] Repeat race does not break state
- [ ] Anti-spam / no blind finish trust
- [ ] Playtest table at least once
- [ ] Demo 60-90 s
- [ ] Save Lesson 9.8 - Race Ship

If everything is there - Module 9 is closed. You can go to the live hub.

**Do now (3 min):** walk the checklist and check only items you truly finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Win only in LocalScript (time/finish with no server)",
 explanation: "Cheat and leaderboard desync.",
 correctApproach: "Remote + server state laps/finished",
 },
 {
 mistake: "Three Places: car / UI / Remote separate",
 explanation: "No integrated race.",
 correctApproach: "One Place, one golden path",
 },
 {
 mistake: "No reset between races",
 explanation: "Second lap breaks accounting.",
 correctApproach: "resetRace(player) on start",
 },
 {
 mistake: "Rubric \"almost\", but demo needs a coach",
 explanation: "That is not ship for a player.",
 correctApproach: "Onboarding + 90 s with no explanation",
 },
 {
 mistake: "Spam Finish Remote gives many wins",
 explanation: "Status/leaderboard economy is dead.",
 correctApproach: "finished flag + debounce",
 },
 {
 mistake: "Inflate 5 tracks instead of closing 1 lap",
 explanation: "Hour vanishes, blockers remain.",
 correctApproach: "1 MVP race + stable Remote",
 }
 ],
 summary: "You assembled Ship Race: one golden path where car, laps/time, and Remote finish share server truth. Rubric and playtest confirm a 60-90 s demo with no coach - a base before the live hub in Module 10.",
 practiceTask: {
 title: "Ship Race: stitch and hand in (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** one Place with integrated race start → lap/finish → UI.

### Part A - Map and rubric (8 min)
1. Write golden path 6-8 steps.
2. Walk rubric ~15 items in Play.
3. List P0 from blocks B and C.

### Part B - Integration fixes (15 min)
1. Finish/lap via Remote + server state.
2. Lite validation (zone / checkpoint order).
3. Time/lap UI from server truth.
4. Reset for repeat race + debounce.
5. Quick "client lies" check (if you can).

### Part C - Demo and Save (7 min)
1. Playtest table 1-10.
2. Rehearse demo 60-90 s.
3. **Save:** Lesson 9.8 - Race Ship
4. Practice is done when the rubric has maximum "yes" and Output is clean.`,
 hints: [
 "Server finished/laps first, then track beauty",
 "1 lap is enough for ship",
 "If there is no leaderboard - TextLabel of your own time is OK"
 ],
 optionalChallenge: "Second player in Studio (or 2 windows) - both finishes correct with no mixed state.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 9.8 is…",
 options: [
          "Stitch the race into one golden path and close the Ship rubric",
          "Start a new sim genre from scratch",
          "Publish Public immediately",
          "Delete all Remotes"
        ],
 correctAnswer: 0,
 explanation: "Integration and Module 9 hand-in.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where should truth about laps and finish time live?",
 options: [
          "Only in the timer LocalScript",
          "On the server (race state / Values)",
          "In the track Part name",
          "In Lighting.ClockTime"
        ],
 correctAnswer: 1,
 explanation: "Server race truth.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why finish via Remote, not only client TextLabel \"Victory\"?",
 options: [
          "RemoteEvent is forbidden in races",
          "UI cannot show time",
          "Otherwise easy to fake the result with no validation",
          "VehicleSeat does not work without Remote"
        ],
 correctAnswer: 2,
 explanation: "Never trust client.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why the finished flag on the server?",
 options: [
          "To disable Anchored",
          "It replaces VehicleSeat",
          "It is only needed for Terrain",
          "So finish spam does not give many wins"
        ],
 correctAnswer: 3,
 explanation: "Anti-duplicate result.",
 },
 {
 id: "q5",
 type: MC,
 question: "What minimum chain counts as race integration?",
 options: [
          "Only a pretty sign",
          "Start → drive/laps → server finish → visible time/result",
          "Only ParticleEmitter",
          "Only change the sky"
        ],
 correctAnswer: 1,
 explanation: "Full short race.",
 },
 {
 id: "q6",
 type: MC,
 question: "What if the 9.5 leaderboard is still missing?",
 options: [
          "Cancel all of Module 9",
          "Set win only on the client",
          "Lite: show your time from server on UI",
          "Ignore onboarding"
        ],
 correctAnswer: 2,
 explanation: "Honest lite substitute.",
 },
 {
 id: "q7",
 type: MC,
 question: "Typical hole: UI says finish, server does not. Cause?",
 options: [
          "Win counted only on the client",
          "Too pretty Billboard",
          "Presence of SpawnLocation",
          "Too short pitch"
        ],
 correctAnswer: 0,
 explanation: "Client/server split.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why reset state between races?",
 options: [
          "To delete RemoteEvent",
          "It disables Pathfinding",
          "To clear Terrain",
          "So the second race counts laps/time correctly"
        ],
 correctAnswer: 3,
 explanation: "Clean repeat.",
 },
 {
 id: "q9",
 type: MC,
 question: "What do we consciously postpone in 9.8?",
 options: [
          "Checking Output",
          "One MVP race",
          "Five tracks and Publish instead of one stable lap",
          "Ship rubric"
        ],
 correctAnswer: 2,
 explanation: "Scope control.",
 },
 {
 id: "q10",
 type: MC,
 question: "Race onboarding minimally needs…",
 options: [
          "12 HUD panels at once",
          "Clear start: car + goal (laps/finish)",
          "Catalog publish",
          "Disabling Explorer"
        ],
 correctAnswer: 1,
 explanation: "A newbie must know what to do.",
 },
 {
 id: "q11",
 type: MC,
 question: "Which rubric item is about networking?",
 options: [
          "Sky color at 18:00",
          "Tree count near the track",
          "Module 1 name",
          "Finish via Remote and lite validation on the server"
        ],
 correctAnswer: 3,
 explanation: "Rubric block C.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why playtest \"fake finish from client\"?",
 options: [
          "Check that the server denies a fake win",
          "To teach hacking to other students",
          "It replaces the rubric",
          "Terrain Editor requires it"
        ],
 correctAnswer: 0,
 explanation: "Anti-cheat from 9.7 in ship context.",
 },
 {
 id: "q13",
 type: MC,
 question: "After a successful 9.8 the logical next course step…",
 options: [
          "Delete the race and start Baseplate",
          "Skip all tests",
          "Module 10 - live hub (same Remotes habits)",
          "Remove VehicleSeat forever"
        ],
 correctAnswer: 2,
 explanation: "Network → hub.",
 },
 {
 id: "q14",
 type: MC,
 question: "What does nearFinish / finish zone on the server check?",
 options: [
          "Car color",
          "Sound volume",
          "Place name",
          "That the player is really near finish, not \"teleporting\" the event"
        ],
 correctAnswer: 3,
 explanation: "Lite position validation.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the completed lesson 9.8 artifact?",
 options: [
          "Theory only, no Studio",
          "Race Ship Place with integrated race, rubric, and clean Output",
          "Empty Baseplate",
          "Timer UI with no server"
        ],
 correctAnswer: 1,
 explanation: "You need an assembled race.",
 }
 ],
 },
}
