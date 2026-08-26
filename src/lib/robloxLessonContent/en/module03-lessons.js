/** Rich UK content for Roblox Module 03 - Код, що грається */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson31 = {
 lessonId: "lesson-roblox-3-1",
 moduleId: "module-03",
 order: 1,
 title: "3.1 - Interaction",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Compare ClickDetector and ProximityPrompt and choose the right trigger",
 "Add a BillboardGui as a hint above the interaction object",
 "Build a door/gate with an open/closed state using if",
 "Wire a server Script with no LocalScript and no Touched",
 "Submit InteractDoor_v1 based on Park_v1 or the island",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission: the world responds to an action",
 content: `The **"Code That Plays"** module starts with a simple question: the player walked up and did something. What does the world do back?

In Module 1 you already clicked a cube and a party button with a **ClickDetector**. That was a quick "make an effect" button. Today we build interaction **as a system**: two ways to trigger, a floating hint, and a clear open/closed state.

After World craft you have a park and a door on a physical hinge. This is a different skill: a **logical** response to the player's intent. You do not have to shove with your shoulder. You can walk up, read the hint, and press E.

**Artifact:** Model \`InteractDoor_v1\`
- a door leaf or gate near the park / HQ
- **ClickDetector** or **ProximityPrompt** (it helps to understand both; for submission one stable path is enough, plus a short look at the other)
- **BillboardGui** with text like "Open" / "Close"
- a Script with an \`isOpen\` variable and \`if/else\`
- Save: \`Lesson 3.1 - InteractDoor_v1\`

**Start from:** \`Module 2 - Park_v1\` (or Living Island). Do not start from an empty Baseplate. The door should live in a place you already know, or it is hard to feel "in-game interaction".

**Not today:** \`Touched\` and kill blocks (**3.2**), timer and on-screen score (**3.3**), \`while true\` (**3.4**), the full functions lesson (**3.6**), LocalScript in StarterGui (**3.7**).`,
 },
 {
 title: "Two ways to say \"I interact\"",
 content: `| Tool | How the player triggers it | Feel | Good for |
|------------|---------------------|----------|------------|
| **ClickDetector** | Mouse click on a Part | "I pressed the object" | Buttons, levers, cubes from M1 |
| **ProximityPrompt** | Walk up + a key (usually E) | "Interaction like modern games" | Doors, chests, later NPCs |

Both live on a **Part**. A normal server **Script** listens to them, the same type as in MagicCube and Party Mode.

**Do not confuse this with the Hinge from 2.2.** A Hinge is a physical joint: shove with your shoulder and it swings. Today is a different genre: *logical* doors. Trigger the interaction, and the script changes Orientation, Position, or Transparency. You can combine this with a Hinge later. For 3.1, logical open/close is enough.

Short choice rule:
- want a "button on the wall" → ClickDetector
- want "walk up to the door" → ProximityPrompt

**Do this now (3 min):** in your notes, write one line for when you would choose click vs walk-up + E.`,
 },
 {
 title: "InteractDoor_v1 scaffold",
 content: `1. Near \`ParkGate\` or HQ, place:
   - \`DoorFrame\` - Anchored (the opening frame)
   - \`DoorLeaf\` - the swinging panel (Anchored for now; we will move it from code, not necessarily with a Constraint)
2. Group into Model \`InteractDoor_v1\`, PrimaryPart = \`DoorFrame\`.
3. Use PascalCase names. Do not put the Script in Terrain or Lighting.

A closed leaf should block the path. An open leaf should leave a gap (about a 90° turn, or a slide to the side). Pick one approach and stick with it for the rest of the lesson.

If you already have physical Hinge doors from 2.2, do not break them. Place a **separate** practice gate for 3.1 logic next to them or in another arch. That makes it easier to compare "shove" vs "press E".

**Do this now (8 min):** scaffold + Group + PrimaryPart. Play without a script: the Character should bump into the closed leaf.`,
 },
 {
 title: "ClickDetector - a stronger replay",
 content: `You already saw ClickDetector in 1.4 and 1.7. Today we wire it with a ritual you can check easily, not by guesswork.

1. Select \`DoorLeaf\` or a separate \`DoorButton\` on the wall nearby.
2. Insert Object → **ClickDetector**.
3. In Properties, check **MaxActivationDistance**: if it is too small, it feels like "the code is broken" when the real issue is range.
4. Put the Script on the Part that has the detector (or on the Model, but then find the detector with \`FindFirstChild\`).

Minimal event scaffold:

\`\`\`lua
local door = script.Parent
local click = door:FindFirstChild("ClickDetector")
if not click then
	warn("No ClickDetector on", door.Name)
	return
end

click.MouseClick:Connect(function(player)
	print(player.Name, "clicked the door")
end)
\`\`\`

\`player\` is who clicked. A \`print\` is enough at first; you will add door state in the next steps.

If you click and Output stays quiet, check in order: is Play running, are you clicking the Part that has the detector, is MaxActivationDistance not tiny, and is this a normal Script rather than a LocalScript.

In Play, the cursor should change over a clickable Part. If it does not, Studio is often hinting that the detector is not "heard".

**Do this now (6 min):** ClickDetector + a line in Output on click.`,
 },
 {
 title: "ProximityPrompt - walk up and press E",
 content: `ProximityPrompt is a more modern gesture: you do not aim the cursor at a tiny button. You walk up and confirm with a key.

1. On \`DoorLeaf\` or \`DoorFrame\` → Insert **ProximityPrompt**.
2. Properties worth setting right away:
   - **ActionText** - "Open"
   - **ObjectText** - "Gate"
   - **HoldDuration** - 0 for an instant press (or about 0.3 if you want a short hold)
   - **MaxActivationDistance** - so it fires near the door, not from the other end of the island
3. Event in code: \`ProximityPrompt.Triggered\`

\`\`\`lua
local part = script.Parent
local prompt = part:FindFirstChildOfClass("ProximityPrompt")
if not prompt then
	warn("No ProximityPrompt")
	return
end

prompt.Triggered:Connect(function(player)
	print(player.Name, "used the Prompt")
end)
\`\`\`

\`FindFirstChildOfClass\` finds the first child of that class. Handy when the name is still the default "ProximityPrompt".

**Click or Prompt for doors?** For a gate, Prompt usually feels more natural: walk up → E. ClickDetector fits a wall button better. On submission, show that you understand the difference, even if the artifact keeps one working path.

**Do not hang both triggers on the same action unless you need to.** Double-opening from one intent confuses testers. Use either one trigger on the leaf, or a Click button separate from the Prompt.

In Play, the Prompt hint appears when the Character is in range. If you do not see E, you are too far, the Prompt is on another Part, or MaxActivationDistance is too small.

**Do this now (7 min):** ProximityPrompt + a line in Output after E.`,
 },
 {
 title: "BillboardGui - hint above the door",
 content: `**BillboardGui** is a hint that hangs in the world above a Part and faces the camera. It is not the on-screen HUD from lesson 3.7: today **no** StarterGui and **no** LocalScript.

Why use it if Prompt already has ActionText? Because a Billboard is visible from farther away and explains the door even to someone not yet in the E zone. For ClickDetector, a Billboard is often the only "label on the object".

1. Select \`DoorLeaf\` or a separate \`DoorHintAnchor\` Part above the door.
2. Insert → **BillboardGui**.
3. Inside it → **TextLabel**.
4. BillboardGui Properties:
   - **Size** - for example \`{0, 120},{0, 40}\` in pixels (or scale to taste)
   - **StudsOffset** - lift the text above the leaf so it does not sink into the mesh
   - **AlwaysOnTop** - true is convenient for learning; in "grown-up" games it is often false so the hint does not show through walls
5. TextLabel: "Press E" or "Click to open"; turn on TextScaled and use a high-contrast color.

Remember: a Billboard **does not open the door**. It only speaks. Keep the logic in the Script on Click or Prompt.

**Do this now (6 min):** Billboard + TextLabel. In Play, walk up from far away. Can you read the label without guessing?`,
 },
 {
 title: "Open / closed state with if",
 content: `A state flag is the same idea as \`partyOn\` in the party from 1.7. Without it, the door can only "do something once", not live in two modes.

\`\`\`lua
local door = script.Parent
local prompt = door:FindFirstChildOfClass("ProximityPrompt")
local billboard = door:FindFirstChildOfClass("BillboardGui")
local label = billboard and billboard:FindFirstChildOfClass("TextLabel")

local isOpen = false
local closedAngle = door.Orientation
local openAngle = closedAngle + Vector3.new(0, 90, 0)

local function updateHint()
	if label then
		label.Text = isOpen and "Close" or "Open"
	end
	if prompt then
		prompt.ActionText = isOpen and "Close" or "Open"
	end
end

updateHint()

local function toggleDoor()
	isOpen = not isOpen
	if isOpen then
		door.Orientation = openAngle
	else
		door.Orientation = closedAngle
	end
	updateHint()
	print("Door open?", isOpen)
end

if prompt then
	prompt.Triggered:Connect(function()
		toggleDoor()
	end)
end
\`\`\`

What this leans on from earlier lessons:
- \`isOpen\` - boolean
- \`if/else\` - state branches from 1.4
- \`local function\` - a small named block so you do not copy-paste hint updates; the **deep** functions lesson is in **3.6**

The hint and ActionText should tell the truth: if the door is open, the next action is "Close". Otherwise the player clicks at random.

If after rotating the leaf is "in the wrong place", tune the axis to your orientation (often Y, but not always). Sometimes it is simpler to shift \`Position\` or use the Transparency trick from the next section.

**Do this now (10 min):** toggle back and forth + live hint text.`,
 },
 {
 title: "ClickDetector version of the same toggle",
 content: `If you keep a wall button, the logic is the same. Only the trigger changes, and optionally the visual open style.

\`\`\`lua
local button = script.Parent
local door = button.Parent:FindFirstChild("DoorLeaf")
local click = button:FindFirstChild("ClickDetector")

local isOpen = false

if click and door then
	click.MouseClick:Connect(function()
		isOpen = not isOpen
		if isOpen then
			door.Transparency = 0.8
			door.CanCollide = false
		else
			door.Transparency = 0
			door.CanCollide = true
		end
		print("Open?", isOpen)
	end)
end
\`\`\`

Here "open" means the leaf is semi-transparent and has no collision. For learning, that is often calmer than spinning Orientation and chasing a wrong axis. For submission, pick **one** approach (rotate *or* transparency) and do not mix both chaotically on the same door.

Script on the button: \`script.Parent\` is the button; find \`DoorLeaf\` in the parent Model. If the button accidentally sits at the Workspace root, \`button.Parent:FindFirstChild\` will not find the leaf. Move the button back inside \`InteractDoor_v1\`.

**Do this now (5 min):** get a stable toggle working for either the Prompt version or the Click version.`,
 },
 {
 title: "Common interaction breakages",
 content: `| Symptom | Likely cause | What to do |
|---------|------------------|------------|
| Click does nothing | No ClickDetector / MaxActivationDistance too small | Check Properties and the Part |
| E does not appear | Prompt on another Part / player too far | Move the Prompt, increase distance |
| Code exists, Output silent | LocalScript in Workspace or Play not running | Use a normal Script + Play |
| Door opened once and stopped | No toggle, only one direction | \`isOpen = not isOpen\` |
| Hint invisible | Billboard inside the mesh / Size is zero | StudsOffset upward, larger Size |
| Opens twice per action | Both Click and Prompt on the same action | Keep one trigger |

Do not fix the door with \`Touched\`. That is the next lesson. Do not pull ready-made doors from the Toolbox with someone else's scripts. The hygiene from 2.4 still applies.

If you are unsure whether "the Prompt is broken" or "the code is broken", put a \`print\` back on the event first. No line in Output → the problem is before door logic. There is a line, but the leaf does not move → check Orientation / CanCollide.

**Do this now (3 min):** walk the table against your artifact.`,
 },
 {
 title: "Play-test and Save",
 content: `**FunctionsKit_v1 checklist:**
- [ ] At least one meaningful \`local function\` with a parameter
- [ ] Kill (or spawn) calls it, instead of duplicating the old body nearby "just in case"
- [ ] debounce / state lives outside if it must survive across calls
- [ ] return is used in at least one place (a value or an early exit)
- [ ] Play: death / spawn work no worse than before the refactor
- [ ] No global function without local (for this lesson)
- [ ] Save: \`Lesson 3.6 - FunctionsKit_v1\`

On submission, explain in three short phrases: parameter = input; return = output; scope = where the variable is visible.

Before Save, remove dead commented copy-paste half a file long. The instructor reads living code, not archaeology.`,
 },
 {
 title: "Lesson boundary",
 content: `| Not today | When | Why wait |
|-------------|------|-------------|
| ModuleScript + require Config | **M4** | First local function in one Script |
| LocalScript GUI buttons / win UI | **3.7** | Different Script type and different panel |
| Full mini-game integration | **3.8** | Clean refactor first |
| OOP / metatables | far beyond M3 | Not needed for kill/spawn |

Today's win is a **refactor that does not make gameplay worse**. A pretty function name does not help if the player no longer dies on lava or the course stopped appearing.

If you have time left, do the bonus spawnPad. If not, a solid killCharacter and an honest Play-test are enough.`,
 },
 {
 title: "Looking ahead to 3.2",
 content: `Next, the world will react to **touch**: \`Touched\`, Humanoid, debounce, \`task.wait\`, KillBrick. The doors from 3.1 can stay near the entrance to a danger zone, but write death logic in the new lesson. Do not mix everything into one Script today.`,
 },
 ],
 },
 practice: {
 title: "Practice: InteractDoor_v1",
 duration: 30,
 description: `**Goal:** a door with a hint and an open/closed state via Click or Prompt.

Open Park_v1 or the island after M2.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Build \`DoorFrame\` + \`DoorLeaf\` → Model \`InteractDoor_v1\`.
2. Add ProximityPrompt and a Billboard with TextLabel.
3. Together, write a \`print\` on \`Triggered\`.
4. Play: walk up, press E, check Output.

**Pass:** the hint is visible, the Prompt fires.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Add \`isOpen\` and a toggle (rotate *or* Transparency/CanCollide).
2. Update the hint text / ActionText.
3. Optionally add a separate Click button, but do not duplicate the same action without need.
4. Walk the route: open → walk through → close.
5. Save \`Lesson 3.1 - InteractDoor_v1\`.

**Pass:** state toggles both ways with no LocalScript and no Touched.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Pick one:
- a second door with the other trigger (if the first uses Prompt, the second uses Click);
- Billboard AlwaysOnTop false, and tune StudsOffset so the hint stays readable;
- \`HoldDuration = 0.4\` on the Prompt and a short note in the course chat on why holding helps.

**Do not:** KillBrick, \`while true\`, ScreenGui in StarterGui, Free Model doors with someone else's code.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "LocalScript in Workspace for doors",
 fix: "Use a normal Script for this interaction. A LocalScript in the world often does nothing.",
 },
 {
 mistake: "No ClickDetector / Prompt, but Connect is already written",
 fix: "Insert the object on the Part. Code does not create the detector unless you create it in your lines.",
 },
 {
 mistake: "Doors open only once",
 fix: "Add an isOpen flag and use not isOpen; cover both branches in if/else.",
 },
 {
 mistake: "Both Click and Prompt open the same door twice",
 fix: "Keep one trigger for one action, or split the roles (button vs door leaf).",
 },
 {
 mistake: "Billboard not visible",
 fix: "Raise StudsOffset, increase Size, and confirm the TextLabel is not empty and has contrast.",
 },
 {
 mistake: "Looking for Touched in this lesson",
 fix: "Touch is lesson 3.2. Today use click or Prompt.",
 },
 {
 mistake: "CanCollide stayed false after \"close\"",
 fix: "In the closed branch, set CanCollide back to true (if you use the transparent trick).",
 },
 ],
   summary: "You learned how to build interactive world objects using ClickDetector and ProximityPrompt, configure activation distance, and control door state (open/closed) using variables and if/else logic in a server Script.",
  practiceTask: {
    "title": "Hands-on Practice: Interactive Door (InteractDoor_v1)",
    "difficulty": "beginner",
    "description": "**Objective:** Build a toggleable interactive door using ProximityPrompt or ClickDetector with clean server-side state.\n\n### Part A: Door Frame & Model\n1. Place a `DoorFrame` and a `DoorLeaf` part near your base (both Anchored = true).\n2. Group them into a Model named `InteractDoor_v1` and set PrimaryPart = `DoorFrame`.\n3. Add a `BillboardGui` with a `TextLabel` (\"Approach and press E\").\n\n### Part B: Interaction Logic\n1. Insert a `ProximityPrompt` inside `DoorLeaf` (ActionText = \"Open\", ObjectText = \"Gate\", HoldDuration = 0).\n2. Insert a regular server `Script` inside `DoorLeaf`.\n3. Declare `local isOpen = false`.\n4. In `prompt.Triggered:Connect(function() ... end)`, toggle state:\n   - When `not isOpen`: set `Transparency = 0.8`, `CanCollide = false`, `prompt.ActionText = \"Close\"`, `isOpen = true`.\n   - When `isOpen`: set `Transparency = 0`, `CanCollide = true`, `prompt.ActionText = \"Open\"`, `isOpen = false`.\n\n### Part C: Verification\n1. Press Play (F5), walk up to the gate, and press E to open.\n2. Walk through the opening, turn around, and close it.\n3. Verify zero errors in the Output console.\n4. Save Place as `Lesson 3.1 - InteractDoor_v1`.",
    "hints": [
      "Use a regular server Script, not a LocalScript.",
      "Setting CanCollide = false allows the player character to walk through.",
      "Keep MaxActivationDistance around 8-12 studs for intuitive interaction.",
      "Remember to flip the isOpen boolean flag on each activation."
    ],
    "optionalChallenge": "Add a click sound effect or smooth color transition when the door is opened."
  },
  quiz: {
 title: "Quiz 3.1 - Interaction",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "The artifact for lesson 3.1 is:",
 options: [
 "KillBrick with Touched",
 "InteractDoor_v1 with a hint and an open/closed state",
 "leaderstats coins",
 "DataStore save",
 ],
 correctAnswer: 1,
 explanation: "Door interaction, not a simulator and not kill.",
 },
 {
 id: "q2",
 type: MC,
 question: "ProximityPrompt is usually triggered:",
 options: [
 "Only from the Toolbox menu",
 "When the player walks up and presses the interact key",
 "Automatically every second with no player",
 "Only in Terrain Editor",
 ],
 correctAnswer: 1,
 explanation: "Walk up + E (typical).",
 },
 {
 id: "q3",
 type: MC,
 question: "You already met ClickDetector in:",
 options: [
 "M4 DataStore",
 "M1 (logic cube / Party Mode)",
 "Only in M12",
 "Never",
 ],
 correctAnswer: 1,
 explanation: "Spiral: click was in Module 1.",
 },
 {
 id: "q4",
 type: MC,
 question: "BillboardGui in this lesson is:",
 options: [
 "A required ScreenGui in StarterGui",
 "A world-space hint above a Part",
 "A Constraint type",
 "A save service",
 ],
 correctAnswer: 1,
 explanation: "A world hint, not the full HUD from lesson 3.7.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why use an isOpen variable?",
 options: [
 "To enable Atmosphere",
 "To remember door state and switch with if/else",
 "To replace PrimaryPart",
 "To create a MeshPart",
 ],
 correctAnswer: 1,
 explanation: "A state flag, like partyOn.",
 },
 {
 id: "q6",
 type: MC,
 question: "Which Script do you need for a Prompt on doors in Workspace?",
 options: [
 "LocalScript required",
 "A normal Script",
 "ModuleScript in ReplicatedStorage required",
 "Script in Lighting only",
 ],
 correctAnswer: 1,
 explanation: "A server Script, like in M1-M2.",
 },
 {
 id: "q7",
 type: MC,
 question: "The ProximityPrompt event we listen to:",
 options: [
 "Touched",
 "Triggered",
 "Heartbeat",
 "RenderStepped",
 ],
 correctAnswer: 1,
 explanation: "Triggered after interaction.",
 },
 {
 id: "q8",
 type: MC,
 question: "MaxActivationDistance affects:",
 options: [
 "Neon brightness",
 "From what distance click or Prompt fires",
 "Island size",
 "Hinge speed",
 ],
 correctAnswer: 1,
 explanation: "Activation distance.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which of these is NOT a 3.1 topic?",
 options: [
 "BillboardGui",
 "ProximityPrompt",
 "Touched KillBrick",
 "if open/closed",
 ],
 correctAnswer: 2,
 explanation: "Kill/Touched - 3.2.",
 },
 {
 id: "q10",
 type: MC,
 question: "Updating ActionText after opening is worth it so that:",
 options: [
 "Terrain is deleted",
 "The player sees the next action (\"Close\")",
 "DataStore is enabled",
 "The Hinge breaks",
 ],
 correctAnswer: 1,
 explanation: "The hint matches the state.",
 },
 {
 id: "q11",
 type: MC,
 question: "Transparency + CanCollide false as \"open\" is:",
 options: [
 "The only allowed way in Roblox",
 "A valid teaching trick instead of rotating the leaf",
 "Always forbidden",
 "The same as a Union",
 ],
 correctAnswer: 1,
 explanation: "An alternative to Orientation.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why is hanging Click and Prompt on the same action without need a bad idea?",
 options: [
 "Studio will explode",
 "You easily get double fires and confusion",
 "The Billboard disappears",
 "Snap turns off",
 ],
 correctAnswer: 1,
 explanation: "One intent, one trigger.",
 },
 {
 id: "q13",
 type: MC,
 question: "local function updateHint() in this lesson is:",
 options: [
 "The full M4 module",
 "Light code grouping; deep functions come in 3.6",
 "A Model replacement",
 "A required RemoteEvent",
 ],
 correctAnswer: 1,
 explanation: "Spiral: a light function now, the functions lesson later.",
 },
 {
 id: "q14",
 type: MC,
 question: "Recommended Save:",
 options: [
 "Untitled",
 "Lesson 3.1 - InteractDoor_v1",
 "Module 6 Simulator Final",
 "Obby Kill Only",
 ],
 correctAnswer: 1,
 explanation: "The explicit 3.1 artifact.",
 },
 {
 id: "q15",
 type: MC,
 question: "Next M3 lesson:",
 options: [
 "DataStore",
 "Touched + KillBrick",
 "Publish Showcase",
 "Tables insert/remove",
 ],
 correctAnswer: 1,
 explanation: "3.2 - touch and danger.",
 },
 ],
 },
}

export const enLesson32 = {
 lessonId: "lesson-roblox-3-2",
 moduleId: "module-03",
 order: 2,
 title: "3.2 - Touched + KillBrick",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Subscribe to Touched and tell a player touch from another Part's touch",
 "Find Humanoid on the Character and safely change Health",
 "Add debounce so one hazard does not spam death dozens of times",
 "Use task.wait for a short pause in the handler",
 "Submit KillLane_v1 with honest neon hazards near InteractDoor",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission: the world reacts to touch",
 content: `In 3.1 the door answered the player's **intent** (click or E). Today the world answers **contact**: a foot steps on a hazard plate, and something should happen.

This is a different kind of gameplay. You open doors on purpose. You often step on lava by accident, so the code must be both strict and restrained: kill the player, but do not spam the event for every millimeter of a toe.

**Artifact:** zone \`KillLane_v1\`
- a Folder or Model with **3+** neon hazard Parts (\`Kill_01\`…)
- each has a Script with \`Touched\`, a Humanoid check, \`debounce\`, and a short \`task.wait\`
- hazards **look** dangerous (Neon, bright color). Honest design
- Save: \`Lesson 3.2 - KillLane_v1\`

**Start from:** the Place after 3.1. Put the lane **past** \`InteractDoor_v1\` or near the park entrance so the route reads: open the door → then a careful zone. That way the "Code That Plays" module grows on your existing world, not on an empty Baseplate.

**Not today:** checkpoints and a timer (**3.3**), \`while true\` platforms (**3.4**), refactor into functions (**3.6**), on-screen GUI (**3.7**). Death via Health is yes; a separate "You Died" screen is no.`,
 },
 {
 title: "Touched in plain words",
 content: `**Touched** is a Part event: "something touched me". The \`hit\` parameter is the Part that touched. On a character that is often a foot, the torso, or \`HumanoidRootPart\`.

Compare with what you already know:

| | Click / Prompt (3.1) | Touched (today) |
|--|----------------------|--------------------|
| Player intent | Deliberate | Often accidental |
| Typical use | Doors, buttons | Lava, coins, zone triggers |
| Risk | Almost no spam | Easily fires **many times** in a row |

That is why **debounce** and a pause appear. Without them, one second of standing on a plate turns Output into a waterfall of lines, and death into a flickering mess.

Touched is not "better" than Prompt and not "worse". It is simply a different sensor. Keep doors on Prompt/Click; keep underfoot hazards on Touched. If you hang kill on the same door via Touched, the player dies the moment they brush the handle. That is usually bad UX.

CanTouch on the Part (mentioned in 2.3) should stay on for a kill plate, or touch events may not arrive the way you expect. For practice plates, do not turn CanTouch off "just in case".

**Do this now (2 min):** in your notes, one line: Touched = contact; Prompt = intent.`,
 },
 {
 title: "Honest danger you can see",
 content: `The player should **see** the risk before they die. Otherwise it is not game design, it is a cheap trick.

1. Create Folder or Model \`KillLane_v1\`.
2. Add 3+ Parts: \`Kill_01\`, \`Kill_02\`, \`Kill_03\`.
3. Material **Neon**, color Really red or bright orange.
4. Anchored true, CanCollide true. Players stand and slide on the plates.
5. Use different sizes and jump gaps. Three identical squares "for the checkbox" look lazy and teach the eye less about reading a level.

**Dishonest:** an invisible thin strip, a gray Part that looks like normal floor, a hazard under decor with no signal. The honesty rule from the park (M2) is the same here: a guest should understand the world without a teacher explaining it.

Place the lane so a beginner can **jump over** or go around. A dead end of "only path = instant death with no read" frustrates more than difficulty. Even in hard obbies, hazards are usually lit up.

Composition with 3.1: if the door leads straight into a lava wall right against Spawn, the player gets angry before they can judge your code. Leave half a step of air after the door.

**Do this now (8 min):** three clear neon hazards, visible from the 3.1 doors.`,
 },
 {
 title: "First Touched - print only",
 content: `Start without death. That way you see the truth of the event with your eyes, not through "why did it kill me a hundred times".

Script in \`Kill_01\`:

\`\`\`lua
local part = script.Parent

part.Touched:Connect(function(hit)
	print("Touched:", hit.Name, "parent:", hit.Parent and hit.Parent.Name)
end)
\`\`\`

Run Play and stand on the plate. Output will flood with lines, sometimes many for one step. That is not "Studio broken". Raw Touched is showing why debounce comes next.

Names like \`LeftFoot\` or \`HumanoidRootPart\` are character Parts. The parent (\`hit.Parent\`) is usually the Character (Model). Sometimes several Parts of the same body arrive in a row, a foot, then something else. That is why "one step" ≠ "one line in Output".

Do not rush to set Health = 0. Five minutes with \`print\` save half an hour on "mystery" bugs and teach you to read the event.

If there are no lines at all, check Play, whether the Script is on that Part, whether it is not a LocalScript, and whether you are actually standing on \`Kill_01\` rather than neighboring floor.

**Do this now (5 min):** print only. Roughly count how many lines one slow step produces.`,
 },
 {
 title: "Find Humanoid - touch the player only",
 content: `Not every touch is a player. A plate can touch another Part, decor, or even a park pendulum if it swung close.

Search chain:
1. \`hit\` - the Part that touched
2. \`hit.Parent\` - usually the Character (Model)
3. On the Character, find **Humanoid**

\`\`\`lua
local part = script.Parent

part.Touched:Connect(function(hit)
	local character = hit.Parent
	if not character then
		return
	end

	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if humanoid then
		print("Found Humanoid on", character.Name)
	end
end)
\`\`\`

\`FindFirstChildOfClass("Humanoid")\` is the same class-search trick you used for ProximityPrompt in 3.1. You are already used to finding an object by type, not only by name. That helps across the whole course.

If there is no Humanoid, \`return\` and stay quiet. That way you do not try to "kill" a random cube or clutter the logic. In more advanced games, the same filter cuts noise before awarding coins, opening a zone door, and so on.

Sometimes Character sits deeper (rare nonstandard avatar builds). For Baseplate / standard R15/R6 in this course, hit → Parent → Humanoid is enough. If Humanoid suddenly is not found on a standard avatar, tell the instructor. Do not invent a deep tree walk right away.

**Do this now (6 min):** print only when Humanoid is found.`,
 },
 {
 title: "KillBrick - Health = 0",
 content: `Once you have Humanoid, the classic teaching trick for a hazard plate is:

\`\`\`lua
local part = script.Parent

part.Touched:Connect(function(hit)
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

The character dies, and Roblox runs the standard respawn. If the world has a SpawnLocation, you appear there. Fine-tuning recovery points and checkpoints is topic **3.3**, not today.

Why Health = 0 instead of Destroy Character? Because you follow the engine's standard path: death animation, respawn, fewer surprises. Destroy is sometimes left for later experiments, once you understand the side effects.

Do not set Health = 0 "just in case" without a Humanoid check. Filter first, then act. That rule will help for collecting items in later modules too: first make sure it was actually the player who touched.

Check neighboring normal floor: it should not kill. If it does, the Script landed on the wrong Part, or you made the whole level floor a kill.

After the first death, do not panic if respawn feels "far". For this lesson, what matters is that kill fired once in a logical way, not a hundred times in a row.

**Do this now (5 min):** death on one plate. Safe floor next to it stays alive.`,
 },
 {
 title: "Debounce - so death does not fire in a queue",
 content: `**Debounce** is protection against extra repeats. A flag says: "I am already handling a touch; ignore the next signals until a short pause ends".

Without it, Roblox can send Touched again and again while a foot slides on the surface. You saw that on the \`print\` step. The same thing would happen with death, only worse for testing and for nerves.

In spirit the flag is like \`isOpen\` or \`partyOn\`: a boolean remembers state. Here the state is not "open", it is "busy for a moment".

\`\`\`lua
local part = script.Parent
local debounce = false

part.Touched:Connect(function(hit)
	if debounce then
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

	debounce = true
	humanoid.Health = 0
	task.wait(1)
	debounce = false
end)
\`\`\`

Order matters. Do not reshuffle at random:
1. If debounce is already on, exit
2. Check Character and Humanoid
3. Set \`debounce = true\`
4. Do the action (death)
5. \`task.wait(...)\`
6. Set \`debounce = false\` again

Common self-owns:
- \`debounce = true\` forever at script start → the plate goes silent after the first test
- skipped step 1 → spam again
- wait placed before the Humanoid check → wasted pauses even on junk touches

**Do this now (8 min):** debounce on \`Kill_01\`. Compare how calm Output is versus the "print only" version.`,
 },
 {
 title: "task.wait - a pause without the while lesson",
 content: `\`task.wait(1)\` means: "wait about one second, then continue this handler".

Today wait is needed **inside** the Touched handler to hold debounce. This is not yet the lesson on \`while true do\` and endless platforms. That is **3.4**. Do not wrap kill in an endless loop "just in case": Touched already fires on its own when there is a touch.

Older tutorials often write plain \`wait(1)\`. In modern Luau, prefer \`task.wait\`. Learn it now so you do not relearn later.

For death debounce, 0.5-1.5 s is usually enough. Too long a pause and the plate stays "silent" when you want to retest quickly. Too short and you risk extra repeats while sliding.

Important: \`task.wait\` here does not "make a platform", spin a ride, or replace the level timer from 3.3. It only holds the debounce flag. If you want richer on-screen time logic, wait for the next lesson.

**Do this now (2 min):** set 1 s, then try 0.5 s and feel the difference while testing.`,
 },
 {
 title: "One template for every plate",
 content: `Copy the working Script onto \`Kill_02\` and \`Kill_03\`. Yes, that is repetition. For 3.2 it is honest and useful: you feel by hand that the template is reusable.

Later the course will cut copy-paste on purpose: in **3.5** you will duplicate objects faster, in **3.6** you will gather a shared kill function. If you rush now into a "universal manager of every hazard in Workspace", it is easy to jump past the lesson boundary and mix half the module ahead of time.

Mini-checklist per plate:
- Neon + a clear color
- Touched → Humanoid → Health
- debounce + task.wait
- no waterfall of \`print\` in the final (one diagnostic line for submission is fine)
- the plate is not on Spawn

After copy-paste, test **every** plate, not only the first. Classic: forgot the Script on the second, forgot debounce on the third.

**Do this now (6 min):** all 3+ plates kill with repeat protection.`,
 },
 {
 title: "Play-test and route safety",
 content: `1. Open the 3.1 doors if they are on the path.
2. Step on \`Kill_01\` on purpose. Death and respawn.
3. Jump the gap or go around. Survival should be possible.
4. Output should not dump hundreds of lines for one step.
5. Normal floor nearby does not kill.
6. Plates are not sitting on the spawn point. Otherwise you get endless respawn into lava.

If after death you appear in danger again, move SpawnLocation or the lane itself. A deep checkpoint system comes in 3.3. Today it is enough not to make world start a torture device.

A guest route should read in a minute: doors → neon danger visible → you can die or pass. Ask a partner to walk it silently. If they instantly know where the risk is, the design worked.

On submission the instructor often checks two things: is there debounce (no spam), and is the hazard visually honest. Code with gray "silent death" and no Neon may get sent back even if Health = 0 works.

**Save:** \`Lesson 3.2 - KillLane_v1\`.`,
 },
 {
 title: "Lesson boundary",
 content: `| Not today | When |
|-------------|------|
| SpawnLocation as a checkpoint system, timer, TextLabel HUD | **3.3** |
| \`while true\` moving platforms | **3.4** |
| function killPlayer(humanoid) for the whole world | **3.6** |
| LocalScript GUI "You Died" | **3.7** |
| DataStore of deaths | M4+ |

Today's win is **controlled Touched**, not a whole obby genre.`,
 },
 {
 title: "Looking ahead to 3.3",
 content: `In **3.3** checkpoints and a timer appear: SpawnLocation / recovery point, a stopwatch, a simple TextLabel from a template. Then \`KillLane_v1\` becomes fairer for the player: die, and you return closer to progress, not always to the edge of the world.

Today do not build a complex respawn system or a full HUD. Stable neon plates with debounce and a "doors → danger" route are enough.

If you leave \`InteractDoor_v1\` before the lane, in 3.3 that chain easily becomes a short timed challenge. So do not tear down the doors and plates before the next lesson. Save As a 3.3 copy when the time comes.`,
 },
 ],
 },
 practice: {
 title: "Practice: KillLane_v1",
 duration: 30,
 description: `**Goal:** a neon hazard lane with Touched, Humanoid, debounce, and task.wait.

Open the Place after 3.1.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Build \`Kill_01\` (Neon).
2. Together: Touched → print only.
3. Add the Humanoid check.
4. Show Output spam without debounce.

**Pass:** everyone sees why repeat protection matters.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Health = 0 + debounce + task.wait.
2. 2+ more plates with the same template.
3. Honest look and a way around / over.
4. A route from the 3.1 doors.
5. Save \`Lesson 3.2 - KillLane_v1\`.

**Pass:** death fires, Output does not go crazy, safe floor nearby stays alive.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Pick one:
- different plate shapes (thin strip / square / wider "lava") with the same code;
- \`print\` only the first touch after debounce (for submission), then remove it;
- a short Billboard plaque "DANGER" above the lane (skill from 3.1), with no new screen GUI.

**Do not:** while-platforms, DataStore, a "You Died" screen, invisible kill zones.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "No Humanoid check",
 fix: "First FindFirstChildOfClass(\"Humanoid\"). Otherwise you are touching a non-player.",
 },
 {
 mistake: "No debounce - Output and death spam",
 fix: "Use a debounce flag + task.wait after the action.",
 },
 {
 mistake: "debounce = true forever at script start",
 fix: "Set it to true only inside the handler during the pause, then set it back to false.",
 },
 {
 mistake: "Kill on the spawn point",
 fix: "Move the plates away from Spawn. Otherwise you get an endless death loop before the game starts.",
 },
 {
 mistake: "Gray, hard-to-see hazard",
 fix: "Neon + a bright color. Honest design is required.",
 },
 {
 mistake: "Writes while true around Touched",
 fix: "Not needed. Touched is already an event. while is lesson 3.4.",
 },
 {
 mistake: "LocalScript on the Kill Part",
 fix: "A normal Script in Workspace, same as for doors and cubes.",
 },
 ],
   summary: "You mastered the Touched event for collision detection, learned to find the Humanoid in character models, change Health safely, and apply debounce with task.wait to avoid event spam.",
  practiceTask: {
    "title": "Hands-on Practice: Hazard Lane (KillLane_v1)",
    "difficulty": "beginner",
    "description": "**Objective:** Create a hazard lane with neon hazard parts and a robust debounce damage script.\n\n### Part A: Hazard Zone\n1. Create a Folder named `KillLane_v1`.\n2. Add 3 hazard parts (`Kill_01`, `Kill_02`, `Kill_03`) with Neon material, Really red color, Anchored = true.\n\n### Part B: Debounce Damage Script\n1. Add a server `Script` inside `Kill_01`.\n2. Add debounce logic:\n```lua\nlocal part = script.Parent\nlocal isDebounced = false\n\npart.Touched:Connect(function(hit)\n    local humanoid = hit.Parent:FindFirstChild(\"Humanoid\")\n    if humanoid and not isDebounced then\n        isDebounced = true\n        humanoid.Health = 0\n        task.wait(1)\n        isDebounced = false\n    end\nend)\n```\n\n### Part C: Verification\n1. Duplicate the script into the other hazard parts.\n2. Playtest: step on the lava part - the character dies cleanly once without spamming Output.\n3. Drop an unanchored test part onto the hazard - verify no nil indexing errors.\n4. Save Place as `Lesson 3.2 - KillLane_v1`.",
    "hints": [
      "Always check hit.Parent:FindFirstChild(\"Humanoid\") before reading Health.",
      "Debounce guards your game against multiple rapid triggers on each footstep.",
      "Ensure hazard parts are Anchored = true so they don't fall through the floor.",
      "Use task.wait instead of legacy wait."
    ],
    "optionalChallenge": "Create a poison pad that deals 25 damage every 0.5 seconds instead of instant death."
  },
  quiz: {
 title: "Quiz 3.2 - Touched + KillBrick",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "The artifact for lesson 3.2 is:",
 options: [
 "InteractDoor with no changes",
 "KillLane_v1 with neon plates on Touched",
 "A full timer GUI",
 "DataStore",
 ],
 correctAnswer: 1,
 explanation: "A hazard lane, not a HUD and not a save.",
 },
 {
 id: "q2",
 type: MC,
 question: "The Touched event means:",
 options: [
 "The player pressed E",
 "Something touched the Part",
 "ClockTime changed",
 "The game was saved",
 ],
 correctAnswer: 1,
 explanation: "Contact with a Part.",
 },
 {
 id: "q3",
 type: MC,
 question: "The hit parameter in Touched is usually:",
 options: [
 "Lighting",
 "The Part that touched",
 "SoundService",
 "ModuleScript",
 ],
 correctAnswer: 1,
 explanation: "Often a Character piece.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why look for Humanoid?",
 options: [
 "To change the floor Material",
 "To know a character touched, and to control Health",
 "To create Terrain",
 "To open the Toolbox",
 ],
 correctAnswer: 1,
 explanation: "Player/NPC filter.",
 },
 {
 id: "q5",
 type: MC,
 question: "humanoid.Health = 0 in KillBrick teaching:",
 options: [
 "Changes the sky color",
 "Kills the character (standard death)",
 "Saves DataStore",
 "Enables a Hinge",
 ],
 correctAnswer: 1,
 explanation: "Classic kill.",
 },
 {
 id: "q6",
 type: MC,
 question: "Debounce is needed because Touched:",
 options: [
 "Never fires twice",
 "Can fire many times in a short span",
 "Only works in Studio without Play",
 "Replaces Anchored",
 ],
 correctAnswer: 1,
 explanation: "Handler anti-spam.",
 },
 {
 id: "q7",
 type: MC,
 question: "task.wait(1) in this lesson most often sits:",
 options: [
 "To spin a while-platform forever",
 "To hold the debounce pause after the action",
 "To load a RemoteEvent",
 "To draw a Decal",
 ],
 correctAnswer: 1,
 explanation: "A pause in the handler, not the while lesson.",
 },
 {
 id: "q8",
 type: MC,
 question: "If Humanoid is not found, better to:",
 options: [
 "Set Health = 0 anyway",
 "return and do nothing",
 "Delete the Baseplate",
 "Turn on Party Mode",
 ],
 correctAnswer: 1,
 explanation: "Do not touch random Parts.",
 },
 {
 id: "q9",
 type: MC,
 question: "An honest KillBrick looks:",
 options: [
 "Like normal gray floor with no signal",
 "Neon and clearly dangerous",
 "Fully transparent always",
 "Only in ServerStorage",
 ],
 correctAnswer: 1,
 explanation: "The player should see the risk.",
 },
 {
 id: "q10",
 type: MC,
 question: "Which of these is NOT a 3.2 topic?",
 options: [
 "debounce",
 "Touched",
 "while true platforms",
 "Humanoid.Health",
 ],
 correctAnswer: 2,
 explanation: "while - 3.4.",
 },
 {
 id: "q11",
 type: MC,
 question: "ClickDetector differs from Touched in that:",
 options: [
 "Touched is always safer",
 "Click is deliberate intent, Touched is contact (often accidental)",
 "Touched exists only in Terrain",
 "Click requires DataStore",
 ],
 correctAnswer: 1,
 explanation: "Intent vs contact.",
 },
 {
 id: "q12",
 type: MC,
 question: "Which Script goes on the Kill Part?",
 options: [
 "LocalScript in StarterGui required",
 "A normal Script",
 "Only ModuleScript",
 "Script in Lighting only",
 ],
 correctAnswer: 1,
 explanation: "A server Script in the world.",
 },
 {
 id: "q13",
 type: MC,
 question: "Copy-pasting the script onto 3 plates in 3.2:",
 options: [
 "Forbidden forever",
 "Allowed; the functions lesson (3.6) will help remove repeats",
 "Replaces PrimaryPart",
 "Automatically creates checkpoints",
 ],
 correctAnswer: 1,
 explanation: "Refactor spiral.",
 },
 {
 id: "q14",
 type: MC,
 question: "Recommended Save:",
 options: [
 "Untitled",
 "Lesson 3.2 - KillLane_v1",
 "Module 9 Remotes",
 "Lesson 1.1 House",
 ],
 correctAnswer: 1,
 explanation: "Explicit artifact.",
 },
 {
 id: "q15",
 type: MC,
 question: "Next lesson:",
 options: [
 "Checkpoints + timer",
 "Tables DataStore",
 "Publish Showcase",
 "BallSocket only",
 ],
 correctAnswer: 0,
 explanation: "3.3 - respawn and time.",
 },
 ],
 },
}

export const enLesson33 = {
 lessonId: "lesson-roblox-3-3",
 moduleId: "module-03",
 order: 3,
 title: "3.3 - Checkpoints + timer",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Place SpawnLocation as start and mid checkpoints",
 "Change the player's RespawnLocation after touching a checkpoint",
 "Build a stopwatch with a light update loop",
 "Show time on a TextLabel from a GUI template",
 "Submit CheckpointRun_v1 with KillLane, without unfair respawn into lava",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission: die without starting from zero",
 content: `In 3.2 you taught the world to kill. Without checkpoints that quickly becomes cruelty: every mistake sends you back to the edge of the map. Today we add **run progress memory** and a **stopwatch**.

This is the logical next step in the "Code That Plays" module: first interaction, then danger, now fair respawn and a sense of time. We are not building a full obby genre yet (that is M5). We assemble bricks that later become the mini-game on boss submission 3.8.

**Artifact:** \`CheckpointRun_v1\`
- start \`Spawn_Start\` (SpawnLocation)
- 2+ checkpoints \`Checkpoint_A\`, \`Checkpoint_B\`
- after a touch the player respawns closer to progress (\`RespawnLocation\`)
- an on-screen stopwatch (TextLabel in a simple ScreenGui)
- Save: \`Lesson 3.3 - CheckpointRun_v1\`

**Start from:** the Place after 3.2. Do not tear down \`KillLane_v1\` and the 3.1 doors. They are what show why a checkpoint exists. If the Place is lost, restore a minimal neon lane from 3.2, or there is nothing to test respawn on.

**Spiral:** you already know Touched, Humanoid, and debounce. New pieces are SpawnLocation / RespawnLocation and a GUI template for time. Full LocalScript+GUI is **3.7**; deep \`while\` for platforms is **3.4**. Today a light loop only for the stopwatch, always with wait inside.`,
 },
 {
 title: "SpawnLocation - spawn point",
 content: `**SpawnLocation** is a special Part Roblox uses to spawn the player after joining the Place or after death (unless set otherwise).

1. Insert → **SpawnLocation** (easiest from the menu, not "convert a Block by hand").
2. Place it on safe ground **before** the kill lane. Name: \`Spawn_Start\`.
3. Anchored true. Do not put neon kill right against the spawn point. In 3.2 you already saw what a nightmare that is for testing.
4. Properties: **Duration** (short protection after spawn). Neutral usually works for the course.

A world can have several SpawnLocations. Without your code the engine picks by its own rules. So we **explicitly** drive \`player.RespawnLocation\`: "after death, appear here".

Do not confuse SpawnLocation with a normal Part, even a green one with a "START" Decal. RespawnLocation needs a real SpawnLocation class object. Decor can sit nearby, but the assignment goes to the Spawn.

If the Place already had an old Spawn from the Baseplate template, either use it as \`Spawn_Start\` (rename it) or remove extras so tests stay clear.

**Do this now (5 min):** \`Spawn_Start\` on a safe zone. Play → die on kill (or Reset) → make sure you do not appear inside lava.`,
 },
 {
 title: "Checkpoint = a new home after death",
 content: `The idea is simple: you touch a flag or checkpoint plate, and the game remembers **where** to revive you next. That is fairness after KillLane.

Typical teaching scaffold:
- a visible Part \`Checkpoint_A\` (green / teal, not like kill)
- nearby or inside it, a SpawnLocation \`Spawn_A\` (can be nearly transparent, CanCollide false, so it does not block the jump)
- a Script on the trigger Part: Touched → find the player → \`player.RespawnLocation = spawnA\`

How to get Player from a touch:

\`\`\`lua
local players = game:GetService("Players")
local player = players:GetPlayerFromCharacter(character)
if player then
	player.RespawnLocation = spawnA
end
\`\`\`

\`GetPlayerFromCharacter\` is the bridge from Character to Player. In 3.2, Humanoid was enough to change Health. To change the respawn point you need Player itself: RespawnLocation is its property.

Do not mix the roles: the flag/plate is the **trigger** ("I was touched"). SpawnLocation is the **home** ("come back here"). You can place them visually close, but in Explorer keep the names different and clear.

**Do this now (8 min):** \`Checkpoint_A\` + \`Spawn_A\` after the first third of the kill lane. At first a print "checkpoint taken" is enough.`,
 },
 {
 title: "Full checkpoint template with debounce",
 content: `We reuse Touched hygiene from 3.2 and add a new action. Same scaffold "filter → act → pause", only the action is different: not Health, but RespawnLocation.

\`\`\`lua
local checkpoint = script.Parent
local spawnA = workspace:FindFirstChild("Spawn_A")
local players = game:GetService("Players")
local debounce = false

checkpoint.Touched:Connect(function(hit)
	if debounce then
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

	local player = players:GetPlayerFromCharacter(character)
	if not player or not spawnA or not spawnA:IsA("SpawnLocation") then
		return
	end

	debounce = true
	player.RespawnLocation = spawnA
	print(player.Name, "checkpoint A")
	task.wait(1)
	debounce = false
end)
\`\`\`

Note \`spawnA:IsA("SpawnLocation")\`: if a normal Block accidentally sits under that name, better assign nothing than catch a weird respawn.

\`game:GetService("Players")\` is the standard way to get the players service. You have already met services indirectly (Workspace as the world); here the service is needed explicitly.

Submission check: take the checkpoint → die on kill on purpose → appear near A, not at start. Without that test, "code kind of exists" does not count. Instructors almost always ask for the death test, not only a print.

If you still land at start, check the name \`Spawn_A\`, the object class, whether print fired, whether the Script is on the Part you walk on, and whether you are not standing on another plate by accident.

**Do this now (10 min):** working checkpoint A with a "death after it" test.`,
 },
 {
 title: "Second checkpoint and readable course",
 content: `Add \`Checkpoint_B\` / \`Spawn_B\` farther along the route. The code is the same (copy-paste is fine for now; 3.6 will help remove repeats).

Course design:
- checkpoints do **not** disguise as kill (different color; a Billboard "Checkpoint" from 3.1 is fine)
- between A and B there is real risk (a KillLane stretch), or the second checkpoint proves nothing
- do not put a checkpoint and its Spawn inside lava
- after taking B, death should return to B, not to A

Test exactly that RespawnLocation "override": take A → die → near A; then take B → die → near B. If after B you still get A, you either did not update the assignment or you are testing the wrong Script.

Habit from World craft: keep start and checkpoints in Folder/Model \`CheckpointRun_v1\` so Explorer does not become a dump of unnamed \`SpawnLocation\`s.

**Do this now (7 min):** second checkpoint + a short playtest of A and B separately with death.`,
 },
 {
 title: "Stopwatch - why it belongs in a mini-game",
 content: `A timer turns "just finished" into a **run**: how long you have been in this attempt. Even without a leaderboard, tension appears and you want a cleaner pass, fewer deaths, a surer route.

Today we make a stopwatch from Play start (or from when the GUI appears). A finish trigger that saves a record to DataStore is not this lesson and not Module 3 at all (data goes deeper in M4).

Time is shown with a **TextLabel**. The full GUI course on LocalScript is **3.7**, but we touch a basic template now. Otherwise the stopwatch exists only in your head and there is nothing to show on submission.

Do not confuse this TextLabel with the Billboard above the door from 3.1. A Billboard hangs in the world and faces the camera; ScreenGui is a UI layer on the player's screen. Different jobs.

For a peer demo, a short line is enough: "here is attempt time, here is the checkpoint, here is death and return". Without that, the timer easily looks like extra decoration.

**Do this now (2 min):** decide for yourself whether the timer starts right with Play. For submission, one simple option is enough.`,
 },
 {
 title: "GUI template: ScreenGui + TextLabel",
 content: `1. In **StarterGui** create **ScreenGui** → name \`TimerGui\`.
2. Inside it, a **TextLabel** \`TimerLabel\`.
3. Label properties: a strip at the top or a screen corner, TextScaled true, text \`00:00\`, high-contrast color. Tune AnchorPoint / Position so the label does not cover half the world and does not run off the edge on different aspect ratios.
4. In the ScreenGui or directly under the Label, a **LocalScript**.

Why LocalScript when kill used a normal Script? A ScreenGui from StarterGui is cloned **to each player** on their client. Updating the digits locally is convenient. A server Script in Workspace for this template only makes the lesson harder with no gain.

This is **not** the full 3.7 lesson: one Label, one counter. No buttons, no Frame animations, no win screen, no shop. If you want a "pretty UI pack", first make time tick correctly and stably.

In Play, check that the GUI is visible at all. If not: ScreenGui.Enabled, Size, Position, and whether the Label has transparent text on a transparent background.

Keep the 3.1 Billboard for world hints. The stopwatch lives on screen. Different jobs, different containers.

**Do this now (8 min):** TimerGui + TimerLabel visible in Play before you write the loop (even a static \`00:00\`).`,
 },
 {
 title: "Stopwatch code (light loop)",
 content: `In the LocalScript under the Label:

\`\`\`lua
local label = script.Parent
local start = os.clock()

while true do
	local elapsed = os.clock() - start
	local minutes = math.floor(elapsed / 60)
	local seconds = math.floor(elapsed % 60)
	label.Text = string.format("%02d:%02d", minutes, seconds)
	task.wait(0.1)
end
\`\`\`

There is a \`while true\` here, and that is a deliberate mini-contact with topic 3.4. One rule: **an endless loop without \`task.wait\` = freeze**. In the next lesson you will dig into while on platforms; today learn the safety rule on a safe example (digits on screen, not world physics).

\`os.clock()\` gives a handy second count from a relative start. The difference \`os.clock() - start\` is how many seconds the attempt has already lasted.

\`math.floor\` drops the fractional part. \`string.format\` builds neat time like \`01:05\` with leading zeros so the timer does not "jump" in width (1:5 vs 01:05).

Updating every 0.1 s is smooth enough for a teaching stopwatch. Do not drive every frame without wait. That risks load and a bad habit.

If \`script.Parent\` is somehow not the Label, time will not appear or Output will show an error. Put the LocalScript as a child of TimerLabel or fix the path.

**Do this now (8 min):** time ticks, Play does not freeze, minute:second format is readable at a glance.`,
 },
 {
 title: "Tie the route: start → checkpoints → kill",
 content: `Ideal teaching loop:
1. Appear on \`Spawn_Start\`
2. See the timer
3. Optionally open the 3.1 doors
4. Take checkpoint A
5. Risk KillLane
6. Take checkpoint B
7. Deliberate death → respawn at the last checkpoint
8. The timer keeps running (no need to reset). Fine for this lesson

We do not require a leaderboard or DataStore. The goal is to feel **progress + time** in one Place built from 3.1-3.3 bricks.

If the loop falls apart (respawn into lava, timer invisible, checkpoint looks like kill), fix the route first. Do not add new systems or download a Free Model "checkpoint pack".

Ask a partner to walk it silently. If after death they understand *why* they appeared exactly there, the checkpoint is done right.

**Do this now (5 min):** walk steps 1-7 with no instructor hints.`,
 },
 {
 title: "Common checkpoint and timer breakages",
 content: `| Symptom | Likely cause | Fix |
|---------|------------------|------|
| Respawn always at start | RespawnLocation not assigned / not a SpawnLocation | Check type and assignment line |
| Checkpoint "does not take" | No Humanoid / debounce / wrong Spawn name | print + IsA |
| Timer not visible | Label off-screen / ScreenGui disabled | Size, Position, Enabled |
| Game froze | while without wait | add task.wait |
| LocalScript in Workspace | GUI script in the wrong place | StarterGui / under Label |
| Respawn into lava | Checkpoint Spawn on Kill | move to a safe patch |
| Time does not change | Loop not running / LocalScript error | client Output, script.Parent path |

Debug order: print on the checkpoint first, then the death test, then look at the GUI. Do not fix three systems at once. You will confuse yourself.

**Do this now (3 min):** walk the table against your Place.`,
 },
 {
 title: "Play-test and Save",
 content: `**CheckpointRun_v1 checklist:**
- [ ] Spawn_Start is safe
- [ ] ≥2 checkpoints change RespawnLocation
- [ ] Test: death after A → appear near A
- [ ] TimerGui shows changing time
- [ ] while has task.wait
- [ ] KillLane stays visually honest
- [ ] Save: \`Lesson 3.3 - CheckpointRun_v1\`

On submission, explain in one sentence: SpawnLocation is the point; RespawnLocation is "which Spawn to pick after death".`,
 },
 {
 title: "Looking ahead to 3.4",
 content: `In **3.4**, \`while true\` goes deeper: show and hide platforms, periods, the danger of a loop without wait. Today's stopwatch is the first careful contact with an endless loop.

Do not start building complex vanishing floors now "because while already appeared". First lock checkpoints and a stable timer, Save, and only then move on.`,
 },
 ],
 },
 practice: {
 title: "Practice: CheckpointRun_v1",
 duration: 30,
 description: `**Goal:** checkpoints with RespawnLocation + a stopwatch on TextLabel.

Open the Place after 3.2.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Spawn_Start before KillLane.
2. Checkpoint_A + Spawn_A.
3. Together: Touched → GetPlayerFromCharacter → RespawnLocation.
4. Death test after the checkpoint.

**Pass:** respawn not at start, but near A.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Second checkpoint B.
2. StarterGui → TimerGui → TimerLabel.
3. LocalScript with the stopwatch (while + task.wait).
4. Full route with doors/kill.
5. Save \`Lesson 3.3 - CheckpointRun_v1\`.

**Pass:** two checkpoints + a live timer with no freeze.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Pick one:
- Billboard "Checkpoint!" above A/B;
- checkpoint color changes after taking it (once, with a flag);
- timer format with tenths (slightly change format). Explain the difference.

**Do not:** DataStore records, vanishing while-platforms, full win-UI from 3.7-3.8.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "RespawnLocation = a normal Part",
 fix: "It must be a SpawnLocation. Otherwise respawn ignores it or behaves oddly.",
 },
 {
 mistake: "No GetPlayerFromCharacter",
 fix: "From Character to Player - use Players:GetPlayerFromCharacter.",
 },
 {
 mistake: "while true without task.wait in the timer",
 fix: "That freezes immediately. A pause is required; more depth in 3.4.",
 },
 {
 mistake: "Timer LocalScript sits in Workspace",
 fix: "Keep it in StarterGui / under TimerLabel.",
 },
 {
 mistake: "Checkpoint looks like kill",
 fix: "Use a different color/material plus a hint. Do not confuse the player.",
 },
 {
 mistake: "Checkpoint Spawn inside KillLane",
 fix: "Add a safe pad nearby, otherwise respawn means endless death.",
 },
 {
 mistake: "Waiting for the full GUI lesson before the stopwatch",
 fix: "Today only the Label template; deeper GUI is 3.7.",
 },
 ],
   summary: "You learned how to use numeric variables to track score and countdown timers, increment/decrement values on player actions, and display live counts using BillboardGui.",
  practiceTask: {
    "title": "Hands-on Practice: Coin Counter & Timer (Counter_v1)",
    "difficulty": "beginner",
    "description": "**Objective:** Build an interactive score-tracking object with live in-world BillboardGui counter updates.\n\n### Part A: Coin Stand Model\n1. Create a neon gold part named `CoinStand` (Anchored = true).\n2. Insert a `BillboardGui` (AlwaysOnTop = true, ExtentsOffset = Vector3.new(0, 2, 0)).\n3. Add a `TextLabel` inside (\"Coins: 0\", TextScaled = true).\n\n### Part B: Increment Logic\n1. Insert a `ClickDetector` or `ProximityPrompt` into `CoinStand`.\n2. Insert a `Script` tracking `local coins = 0`.\n3. On trigger, increment `coins = coins + 1` and set `textLabel.Text = \"Coins: \" .. coins`.\n\n### Part C: Playtest\n1. Click the stand 5 times in Play mode and confirm the display updates smoothly 0 → 5.\n2. Save Place as `Lesson 3.3 - Counter_v1`.",
    "hints": [
      "Use Lua string concatenation: \"Coins: \" .. coins.",
      "AlwaysOnTop ensures the score is visible even behind obstacles.",
      "Initialize coins = 0 outside the event handler so it doesn't reset on each click."
    ],
    "optionalChallenge": "Add a goal trigger: when coins reach 10, turn the stand green and play a victory chime."
  },
  quiz: {
 title: "Quiz 3.3 - Checkpoints + timer",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "The artifact for lesson 3.3 is:",
 options: [
 "KillLane only, unchanged",
 "CheckpointRun_v1 with checkpoints and a stopwatch",
 "DataStore leaderboard",
 "Full Prompt shop",
 ],
 correctAnswer: 1,
 explanation: "Checkpoints + timer.",
 },
 {
 id: "q2",
 type: MC,
 question: "SpawnLocation is:",
 options: [
 "A Constraint type",
 "The player's spawn point",
 "A required ModuleScript",
 "An HTTP service",
 ],
 correctAnswer: 1,
 explanation: "Spawn point.",
 },
 {
 id: "q3",
 type: MC,
 question: "player.RespawnLocation sets:",
 options: [
 "Sky color",
 "Which SpawnLocation to use after death",
 "Music volume",
 "Baseplate size",
 ],
 correctAnswer: 1,
 explanation: "Checkpoint memory for respawn.",
 },
 {
 id: "q4",
 type: MC,
 question: "GetPlayerFromCharacter is needed to:",
 options: [
 "Create Terrain",
 "Get Player from Character after Touched",
 "Replace Humanoid",
 "Turn off Lighting",
 ],
 correctAnswer: 1,
 explanation: "Bridge Character → Player.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why keep debounce on the checkpoint?",
 options: [
 "Because Neon looks nicer that way",
 "Touched can spam RespawnLocation assignment again",
 "Because Snap does not work without it",
 "Because DataStore requires it",
 ],
 correctAnswer: 1,
 explanation: "Same hygiene as in 3.2.",
 },
 {
 id: "q6",
 type: MC,
 question: "The stopwatch TextLabel today lives in:",
 options: [
 "Terrain",
 "ScreenGui in StarterGui (template)",
 "ServerStorage required",
 "SoundService",
 ],
 correctAnswer: 1,
 explanation: "A simple GUI template.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why is the timer often on a LocalScript?",
 options: [
 "Because Script is banned everywhere in Roblox",
 "Player GUI is convenient to update on the client",
 "Because Touched does not exist",
 "Because Anchored requires it",
 ],
 correctAnswer: 1,
 explanation: "Client HUD.",
 },
 {
 id: "q8",
 type: MC,
 question: "while true in the stopwatch without task.wait:",
 options: [
 "Runs faster and better",
 "Risks freezing",
 "Automatically creates a checkpoint",
 "Fixes Orientation",
 ],
 correctAnswer: 1,
 explanation: "A pause is required.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which of these is NOT a 3.3 topic?",
 options: [
 "RespawnLocation",
 "Stopwatch on TextLabel",
 "Vanishing while-platforms as the main artifact",
 "SpawnLocation",
 ],
 correctAnswer: 2,
 explanation: "While platforms are 3.4.",
 },
 {
 id: "q10",
 type: MC,
 question: "A checkpoint should look:",
 options: [
 "Identical to neon kill",
 "Different from danger, so players can read it",
 "Fully invisible always",
 "Only in ServerScriptService",
 ],
 correctAnswer: 1,
 explanation: "Course readability.",
 },
 {
 id: "q11",
 type: MC,
 question: "os.clock() in the timer template helps:",
 options: [
 "Draw Terrain",
 "Measure elapsed time",
 "Create a Weld",
 "Publish the Place",
 ],
 correctAnswer: 1,
 explanation: "Count seconds.",
 },
 {
 id: "q12",
 type: MC,
 question: "If after a checkpoint death returns you to start, check first:",
 options: [
 "Atmosphere",
 "Whether RespawnLocation is assigned to a SpawnLocation",
 "Whether there is a Decal on the roof",
 "Whether Snap is off",
 ],
 correctAnswer: 1,
 explanation: "Checkpoint chain.",
 },
 {
 id: "q13",
 type: MC,
 question: "The full LocalScript + GUI lesson is in:",
 options: [
 "3.7",
 "1.1",
 "2.4 only",
 "M12 only",
 ],
 correctAnswer: 0,
 explanation: "Template today; depth in 3.7.",
 },
 {
 id: "q14",
 type: MC,
 question: "Recommended Save:",
 options: [
 "Untitled",
 "Lesson 3.3 - CheckpointRun_v1",
 "Module 6 HUD Final",
 "Lesson 2.1 Island only",
 ],
 correctAnswer: 1,
 explanation: "Explicit 3.3 artifact.",
 },
 {
 id: "q15",
 type: MC,
 question: "Next lesson:",
 options: [
 "while + platforms",
 "DataStore",
 "RemoteEvent race",
 "Toolbox hygiene M2",
 ],
 correctAnswer: 0,
 explanation: "3.4 - while deeper.",
 },
 ],
 },
}

export const enLesson34 = {
 lessonId: "lesson-roblox-3-4",
 moduleId: "module-03",
 order: 4,
 title: "3.4 - while + platforms",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Explain while true do and why wait is always needed inside",
 "Build platforms that appear and disappear on a period",
 "Drive CanCollide and Transparency in a loop",
 "Tune the period (visible time / pause) for an honest jump",
 "Submit BlinkPlatforms_v1 on a checkpoint course without freezing Studio",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission: platforms with a rhythm",
 content: `In 3.3 you already saw \`while true\` in the stopwatch. Today the same tool drives the **world**: platforms appear and disappear on a period.

This is a different flavor of loop. The timer only changed text on screen. Here the loop touches physics under the player's feet, so a CanCollide or wait mistake is felt at once as a fall or a freeze.

**Artifact:** \`BlinkPlatforms_v1\`
- 2+ platforms (\`Blink_01\`, \`Blink_02\`…)
- a Script with \`while true do\` + \`task.wait\`
- visibility via Transparency and walkability via CanCollide
- a period tuned so the jump is hard but honest
- Save: \`Lesson 3.4 - BlinkPlatforms_v1\`

**Start from:** the Place after 3.3. Put blinking platforms **after** checkpoint A or between A and B so a fall does not dump you at the very start of the world. Keep KillLane aside or farther along the course. Do not mix "lava" and "blink" on one Part without need.

**Not today:** \`for\`/\`ipairs\` to spawn a whole course (**3.5**), function refactor (**3.6**), pretty win-GUI (**3.7**). One clear while on platforms is worth more than five half-alive systems.`,
 },
 {
 title: "while true - a loop that does not end on its own",
 content: `**while** repeats a block while the condition is true. The simplest "endless" form:

\`\`\`lua
while true do
	-- loop body
	task.wait(1)
end
\`\`\`

\`true\` is always true → the loop runs while the Script lives (or until you press Stop).

Compare with what you already know:

| Construct | When it fires | Example |
|-------------|-----------------|---------|
| \`if\` | Once, when you reach the line | Open a door |
| \`Touched\` | When there was a touch | Kill / checkpoint |
| \`while true\` | Again and again over time | Timer, blinking platform |

A loop does **not** replace Touched. It is for rhythm: "here now → then gone → here again". If you catch yourself thinking "I will hang a while to catch touches", stop. Keep an event for touches.

You can write while conditions other ways (not only true), but today we deliberately train a safe endless loop with wait. Other forms will come when you need them.

**Do this now (2 min):** in your notes: while = repeat over time; if = a one-time branch; Touched = reaction to contact.`,
 },
 {
 title: "Main rule: without wait the loop kills Play",
 content: `If you write:

\`\`\`lua
while true do
	print("hello")
end
\`\`\`

Studio or the client can **freeze**: the script spins the body with no pause and never yields to other work. In 3.3 you already had to put \`task.wait\` in the timer. Today that rule becomes law for world logic.

**Always** in an endless platform loop:
1. make a change (hide / show)
2. \`task.wait(...)\` - period pause
3. next change
4. wait again

No wait between changes → trouble. Wait present → a rhythm you can tune with numbers.

In class it is better **not** to demo a freeze "for fun": you lose time on Force Close and group nerves. Put wait in the first draft while right away, before the first Play.

A separate myth: "I will use wait(0) or a tiny number, almost like no wait, but safe". Too small a wait can still load Play and make blinking unreadable. For platforms, think in seconds, not milliseconds, until you have a reason otherwise.

**Do this now (3 min):** open your timer from 3.3 and look again at where wait sits. Carry that same reflex to platforms.`,
 },
 {
 title: "BlinkPlatforms_v1 scaffold",
 content: `1. Build 2+ Parts over a gap or between islets: \`Blink_01\`, \`Blink_02\`.
2. Anchored true, CanCollide true at start (visible phase).
3. Color and material distinct from kill: blue Neon, green Plastic, and so on, so the eye reads "this is a platform, not lava".
4. Folder or Model \`BlinkPlatforms_v1\`.
5. To start, one Script per platform (copy-paste is fine). In 3.5-3.6 we will shrink the copy-paste.

Keep jump distances human: a beginner after doors and a checkpoint should have a chance, not a lottery. If needed, put temporary safety below for tests and remove it before submission.

Do not put blink platforms right on \`Spawn_Start\`: otherwise the first second of the game is a fall lottery. After checkpoint A is ideal: progress already exists, and risk reads as a challenge.

**Do this now (8 min):** two platforms on the route after the checkpoint, no loop yet, just layout and PascalCase names.`,
 },
 {
 title: "Show / hide: Transparency + CanCollide",
 content: `For a platform to "vanish" for the player, changing color is not enough. You must align look and physics:

| Property | When visible | When "gone" |
|-------------|------------|--------------|
| **Transparency** | 0 | 1 (fully transparent) |
| **CanCollide** | true | false (otherwise an invisible wall) |

Classic mistake #1: Transparency = 1 but CanCollide true → you bump into air. Mistake #2: CanCollide false with Transparency 0 → looks like floor, but you fall through. Sometimes a fake plate is its own trick genre; today we do **synced** blinking, without cheap tricks.

\`\`\`lua
local platform = script.Parent

local function setVisible(isVisible)
	if isVisible then
		platform.Transparency = 0
		platform.CanCollide = true
	else
		platform.Transparency = 1
		platform.CanCollide = false
	end
end
\`\`\`

A light \`local function\` again only for neatness; the deep functions lesson is **3.6**. You can also write those same four lines straight in the while. Fine for submission too.

**Do this now (5 min):** in Properties, play both mistakes by hand, feel them, then restore the visible state.`,
 },
 {
 title: "First while for one platform",
 content: `Script in \`Blink_01\`:

\`\`\`lua
local platform = script.Parent

while true do
	-- visible
	platform.Transparency = 0
	platform.CanCollide = true
	task.wait(2)

	-- hide
	platform.Transparency = 1
	platform.CanCollide = false
	task.wait(1.5)
end
\`\`\`

Play: the platform breathes a "2 s on / 1.5 s off" rhythm. Stand during the "on" phase, jump before it vanishes. If you stand and wait for it to disappear under you, you should fall through, not hang in the air on an invisible wall.

Read the loop like a stage script: first the set is on stage (visible + collision), a pause for the player, then intermission (hide), another pause, repeat. If you cut the pauses, the show collapses into one frame and Studio "dies".

If the world freezes, look for a while without wait. If the platform only fades but still holds, you forgot CanCollide false. If you fall through while it is still bright, CanCollide is false in the "on" phase.

Do not stuff Humanoid kill into this while "just in case". Different hazards need different scripts and different eye signals. Blink teaches rhythm; kill teaches contact.

After the first successful cycle, Stop Play and run again: the Script should breathe from the start again. If it "sticks" invisible, check Anchored and whether the Part is still in place.

**Do this now (8 min):** one working blinking platform with two waits.`,
 },
 {
 title: "Period - honesty balance",
 content: `**Period** is how many seconds each phase lasts. That is game design, not magic numbers from a random tutorial.

| "On" too short | "Off" too long | A comfortable teaching start |
|---------------------|------------------------|------------------------------|
| You cannot step on in time | You stand and get bored | 1.5-2.5 s visible, 1-2 s hidden |

Honesty rules (same spirit as Neon kill and readable checkpoints):
- when the platform is "on", it really holds and is clearly visible
- the rhythm is stable, no random chaos on the first while
- a checkpoint is nearby so a fall does not wipe the whole module's progress
- the player understands the rule in 10 seconds of watching, before the jump
- no "almost transparent" floor with CanCollide true in the "on" phase

Tune \`task.wait\` numbers and test with a **jump in Play**, not only from the creator camera. From the camera everything feels easier: Character is heavier and slower than your E/Q flight.

Write your chosen numbers in notes (for example 2.0 / 1.5). On submission the instructor may ask "why exactly that". It is a normal designer question, not a trick.

**Do this now (5 min):** change the period three times and pick your "honest" rhythm for submission.`,
 },
 {
 title: "Second platform and phase offset",
 content: `Copy the Script onto \`Blink_02\`. If both blink **in sync**, a jump "from left to right" during a shared "off" phase becomes either cruel or boringly predictable.

A simple trick without new topics: on the second platform add a pause **before** the loop, or change phase lengths.

\`\`\`lua
local platform = script.Parent
task.wait(0.7) -- phase offset

while true do
	platform.Transparency = 0
	platform.CanCollide = true
	task.wait(2)
	platform.Transparency = 1
	platform.CanCollide = false
	task.wait(1.5)
end
\`\`\`

Now the platforms do not breathe in unison. This is not yet \`for\` over a list of children, just two deliberate copies with different starts. In 3.5 you will learn to duplicate objects more neatly; in 3.6 you will remove copy-paste with a function.

Test the jump for 20-30 seconds: are there windows when at least one platform holds? A full synced "pit" for two seconds often frustrates more than it teaches timing.

If a 0.7 s offset feels weak, try 1.0 or a different wait inside the phases on the second platform only. Write down what worked.

**Do this now (7 min):** two platforms with a phase offset, transition between them possible.`,
 },
 {
 title: "Where to put the Script and what not to do",
 content: `- A normal **Script** on the Part or in the Model (not LocalScript): world physics is a server job.
- Do not put platform while loops in the timer LocalScript "just in case". Different jobs, different scripts.
- Do not mix kill and blink on one Part without need: the player will not understand the rule.
- Do not use \`while true\` without wait "because it updates faster". That is a fast path to a freeze.
- Do not replace checkpoints with blinking: progress safety first (3.3), then platform rhythm.

If you want to move a platform by Position in a loop, you can carefully (a small axis shift between waits). For submission, show/hide is enough. Track motion via Prismatic you already saw in M2; today the focus is while and period.

**Do this now (3 min):** check Explorer. All blink scripts are Scripts, names are PascalCase.`,
 },
 {
 title: "Play-test on the route",
 content: `1. Appear at start or the checkpoint before the blink zone.
2. Wait for the "on" phase on \`Blink_01\`, step on.
3. Move to \`Blink_02\` with the offset.
4. Deliberately get stuck in the "off" phase. Fall; respawn should be at the checkpoint (if 3.3 is in place).
5. Play does not freeze; Output has no red spam.
6. The 3.3 timer (if you kept it) still ticks on its own while. Do not break it.
7. Platforms do not look like kill and do not sit on Spawn.

Ask a partner to walk it silently: if in 15 seconds they understood the rhythm, the design worked. If they ask "bug or feature?" about an invisible wall, fix CanCollide.

On submission, be ready to show both waits in code and say your period numbers out loud.

**Save:** \`Lesson 3.4 - BlinkPlatforms_v1\`.`,
 },
 {
 title: "Lesson boundary",
 content: `| Not today | When |
|-------------|------|
| \`for i = 1, n\` / \`ipairs\` spawning a whole course | **3.5** |
| function setPlatformVisible(...) for the module | **3.6** |
| GUI buttons driving the phase | **3.7** |
| TweenService transparency animation | later (Arena and so on) |

Today's win is a **safe while** and a readable platform rhythm.`,
 },
 {
 title: "Looking ahead to 3.5",
 content: `In **3.5**, \`for\` / \`ipairs\` appear: duplicate course pieces without copy-paste. Today's two or three platforms with a manual phase offset are the foundation.

Do not try to write a level generator "for 40 platforms" right now. First feel the loop on one Part, Save, and only then move to for.`,
 },
 ],
 },
 practice: {
 title: "Practice: BlinkPlatforms_v1",
 duration: 30,
 description: `**Goal:** blinking platforms on while true with wait and an honest period.

Open the Place after 3.3.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Place \`Blink_01\`.
2. Together: while with show/hide + two task.wait.
3. Show that without CanCollide false you still get "glass".
4. Tune the period as a group.

**Pass:** one platform breathes, Play is stable.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Second platform with a phase offset.
2. Embed it in the route after a checkpoint.
3. Playtest with a jump and a fall.
4. Remove any while without wait if an experiment remains.
5. Save \`Lesson 3.4 - BlinkPlatforms_v1\`.

**Pass:** two platforms, different rhythm, honest jump.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Pick one:
- a third platform with a different period;
- a short "fake" plate nearby (always CanCollide false). Label it with a Billboard "DO NOT STAND" so it is not confused with blink;
- a light Position shift up and down in the while (small amplitude) instead of Transparency only.

**Do not:** a for-generator for the whole map, a Tween pack from the Toolbox, while without wait.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "while true without task.wait",
 fix: "Add a pause immediately. Otherwise Play/Studio freezes.",
 },
 {
 mistake: "Transparency = 1, but CanCollide true",
 fix: "Invisible wall. Hide both toggles together.",
 },
 {
 mistake: "CanCollide false with Transparency 0 in the \"on\" phase",
 fix: "It looks like a floor, but you fall through. On the visible phase, CanCollide must be true.",
 },
 {
 mistake: "LocalScript on a blink platform",
 fix: "Normal Script: this is world logic, not HUD.",
 },
 {
 mistake: "Synced blinking of two platforms with no offset",
 fix: "Add task.wait before the loop on the second platform, or use other durations.",
 },
 {
 mistake: "Platforms before the first checkpoint with no Spawn",
 fix: "Place the zone after a checkpoint, otherwise every fall means rage.",
 },
 {
 mistake: "Confuses while with Touched",
 fix: "Touched is a contact event; while is a timed repeat. Different tools.",
 },
 ],
   summary: "You learned how while true do loops work in Roblox, why task.wait() is mandatory to prevent Studio crashes, and how to create periodic hazard spawners.",
  practiceTask: {
    "title": "Hands-on Practice: Hazard Spawner (HazardSpawner_v1)",
    "difficulty": "intermediate",
    "description": "**Objective:** Build a repeating hazard spawner using a safe while loop and Debris cleanup.\n\n### Part A: Spawner Setup\n1. Create a platform part named `SpawnerPlatform` elevated high in the air (Anchored = true).\n\n### Part B: While Loop with task.wait\n1. Add a server `Script` inside the spawner:\n```lua\nlocal Debris = game:GetService(\"Debris\")\n\nwhile true do\n    task.wait(2)\n    local hazard = Instance.new(\"Part\")\n    hazard.Name = \"FallingHazard\"\n    hazard.Size = Vector3.new(2, 2, 2)\n    hazard.Material = Enum.Material.Neon\n    hazard.BrickColor = BrickColor.new(\"Bright red\")\n    hazard.Position = script.Parent.Position - Vector3.new(0, 3, 0)\n    hazard.Anchored = false\n    hazard.Parent = workspace\n    \n    Debris:AddItem(hazard, 5)\nend\n```\n\n### Part C: Verification\n1. Playtest: ensure hazards spawn every 2 seconds and delete after 5 seconds without lagging the game.\n2. Save Place as `Lesson 3.4 - HazardSpawner_v1`.",
    "hints": [
      "NEVER run a while true loop without task.wait() - it will freeze Studio.",
      "Debris:AddItem automatically removes objects after a lifetime.",
      "Set Anchored = false so the spawned parts fall with gravity."
    ],
    "optionalChallenge": "Attach a Touched damage script to spawned hazards so they eliminate players on contact."
  },
  quiz: {
 title: "Quiz 3.4 - while + platforms",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "The artifact for lesson 3.4 is:",
 options: [
 "Stopwatch only, unchanged",
 "BlinkPlatforms_v1 with while and periods",
 "DataStore",
 "RemoteEvent shop",
 ],
 correctAnswer: 1,
 explanation: "Blinking platforms.",
 },
 {
 id: "q2",
 type: MC,
 question: "while true do repeats the loop body:",
 options: [
 "Only once",
 "While the Script lives (condition always true)",
 "Only on mouse click",
 "Only in Terrain Editor",
 ],
 correctAnswer: 1,
 explanation: "An endless loop by design.",
 },
 {
 id: "q3",
 type: MC,
 question: "Without task.wait in while true, the typical risk is:",
 options: [
 "Always better FPS",
 "Play/client freeze",
 "Automatic Save",
 "Terrain disappearing",
 ],
 correctAnswer: 1,
 explanation: "The main rule of the lesson.",
 },
 {
 id: "q4",
 type: MC,
 question: "For a platform to vanish under the player's feet, you need:",
 options: [
 "Only change BrickColor",
 "Transparency and CanCollide in sync",
 "Delete Lighting",
 "Turn on Party Mode",
 ],
 correctAnswer: 1,
 explanation: "Look + collision.",
 },
 {
 id: "q5",
 type: MC,
 question: "An invisible wall is when:",
 options: [
 "Transparency 1 and CanCollide false",
 "Transparency 1, but CanCollide true",
 "No Script",
 "Part in ServerStorage",
 ],
 correctAnswer: 1,
 explanation: "Transparent but solid.",
 },
 {
 id: "q6",
 type: MC,
 question: "Period in this lesson means:",
 options: [
 "The Place name",
 "Duration of the visible/hide phases",
 "A Constraint type",
 "Studio version",
 ],
 correctAnswer: 1,
 explanation: "task.wait rhythm.",
 },
 {
 id: "q7",
 type: MC,
 question: "A second platform's phase offset is often done with:",
 options: [
 "DataStore",
 "task.wait before the while",
 "Deleting Humanoid",
 "A Union with Baseplate",
 ],
 correctAnswer: 1,
 explanation: "A simple rhythm offset.",
 },
 {
 id: "q8",
 type: MC,
 question: "Which Script goes on a blink platform?",
 options: [
 "LocalScript in StarterGui required",
 "A normal Script",
 "Only ModuleScript",
 "Script in SoundService",
 ],
 correctAnswer: 1,
 explanation: "World logic on the server.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which of these is NOT a 3.4 topic?",
 options: [
 "while true + wait",
 "Transparency/CanCollide rhythm",
 "for/ipairs spawning a whole course",
 "Honest jump period",
 ],
 correctAnswer: 2,
 explanation: "for - 3.5.",
 },
 {
 id: "q10",
 type: MC,
 question: "Touched and while differ in that:",
 options: [
 "While is always about GUI",
 "Touched reacts to contact, while sets repeat over time",
 "While exists only in M1",
 "Touched is banned after 3.2",
 ],
 correctAnswer: 1,
 explanation: "Different roles.",
 },
 {
 id: "q11",
 type: MC,
 question: "In the \"platform on\" phase it is logical that:",
 options: [
 "Transparency 1, CanCollide false",
 "Transparency 0, CanCollide true",
 "Delete the Part",
 "Anchored false required with no Constraint",
 ],
 correctAnswer: 1,
 explanation: "Visible and holding.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why did while already appear in 3.3, but the while lesson is now?",
 options: [
 "Grid error",
 "In 3.3 it was a light contact for the timer; here while drives the world and balance",
 "While was banned in 3.3",
 "Because LocalScript vanished",
 ],
 correctAnswer: 1,
 explanation: "Deepening spiral.",
 },
 {
 id: "q13",
 type: MC,
 question: "Best place for a blink zone:",
 options: [
 "Right on Spawn_Start in lava",
 "After a checkpoint, with a chance at an honest jump",
 "In Lighting",
 "In ReplicatedStorage only",
 ],
 correctAnswer: 1,
 explanation: "Progress fairness.",
 },
 {
 id: "q14",
 type: MC,
 question: "Recommended Save:",
 options: [
 "Untitled",
 "Lesson 3.4 - BlinkPlatforms_v1",
 "Module 9 Remotes",
 "Lesson 1.8 only",
 ],
 correctAnswer: 1,
 explanation: "Explicit artifact.",
 },
 {
 id: "q15",
 type: MC,
 question: "Next lesson:",
 options: [
 "for / ipairs",
 "DataStore",
 "Publish Showcase",
 "Toolbox Free Model admin",
 ],
 correctAnswer: 0,
 explanation: "3.5 - for loops.",
 },
 ],
 },
}

export const enLesson35 = {
 lessonId: "lesson-roblox-3-5",
 moduleId: "module-03",
 order: 5,
 title: "3.5 - for / ipairs",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Write for i = 1, n do and explain the counter i",
 "Walk a list with ipairs and understand the difference from numeric for",
 "Spawn a row of course platforms without copy-pasting Parts by hand",
 "Set Position from the index (studs step)",
 "Submit TrackSpawn_v1 with a Folder and a short generator Script",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission: a course without copy-paste",
 content: `In 3.4 you placed two or three blink platforms by hand and copy-pasted the Script. Today we learn to **duplicate geometry with code**: one template → many plates in a row.

This is the moment the course stops rewarding Ctrl+D for every brick. If you need six identical pads, a loop does it faster and with fewer name mistakes (Pad_1, Pad_2… instead of Part, Part1, asdasd).

**Artifact:** \`TrackSpawn_v1\`
- Folder \`TrackSpawn_v1\`
- a Script that creates **6+** platforms with \`for\`
- names like \`Pad_1\`…\`Pad_6\`
- a step on an axis (for example +8 studs on X or Z)
- Save: \`Lesson 3.5 - TrackSpawn_v1\`

**Start from:** the Place after 3.4. Do not tear down checkpoints and kill. The new course can lead **farther** along the route or sit parallel as a practice lane. What matters is somewhere to jump and something to show on submission.

**Spiral:** you already saw \`ipairs\` + \`GetChildren\` in M2 audits. Today for becomes a **building** tool, not only a review tool. The full functions lesson is **3.6**; GUI is **3.7**. For now do not hide spawn in a function "for later". First get a working for in one Script.`,
 },
 {
 title: "for i = 1, n - a step counter",
 content: `Numeric loop:

\`\`\`lua
for i = 1, 5 do
	print("Step", i)
end
\`\`\`

What happens: \`i\` becomes 1, then 2, … through 5 inclusive. The body runs for each value. That is not magic. It is a counter Studio runs for you.

| Part | Meaning |
|---------|----------|
| \`i\` | counter (loop variable) |
| \`1\` | where to start |
| \`5\` | where to end (inclusive) |

You can add a step: \`for i = 1, 9, 2 do\` → 1, 3, 5, 7, 9. For today's course, step 1 is usually enough: just "make count plates".

Compare with \`while true\`: while runs until you stop it yourself (and in the endless case wait is required). \`for i = 1, n\` already knows **how many** repeats. Ideal for "make 8 platforms and stop".

Classic mix-up after 3.4: put spawn in while true with no exit. Then plates rain forever (or you freeze without wait). Geometry spawn is almost always a for with a known count.

Do not put a for inside Touched on every foot contact unless you need to. Spawn the course when the Script starts, once per script lifetime (with cleanup), not on every player step.

**Do this now (3 min):** a temporary Script that prints 1…5 in Output, check the order, then remove the experiment.`,
 },
 {
 title: "ipairs - walk an existing list",
 content: `When a list already exists (Folder children), \`ipairs\` is handy:

\`\`\`lua
local folder = workspace:FindFirstChild("TrackSpawn_v1")
for index, child in ipairs(folder:GetChildren()) do
	print(index, child.Name, child.ClassName)
end
\`\`\`

| | \`for i = 1, n\` | \`ipairs\` |
|--|------------------------|-----------------|
| Where the count comes from | You set n | From list length |
| What is inside | Often **create** new | Often **process** existing |
| Typical use today | Spawn plates | Cleanup / audit of what already exists |

\`index\` is the 1-based number. \`child\` is the element. You can use \`_\` instead of index when the number is not needed, as in M2 audits.

Do not confuse: ipairs does not create a Part by itself. It only walks what already sits in the Folder. Creation is \`Instance.new\` in a numeric for.

**Do this now (4 min):** once the first plates appear, run an ipairs print of their names.`,
 },
 {
 title: "Instance.new - create a Part from code",
 content: `By hand you clicked Part on the Home ribbon. From code:

\`\`\`lua
local pad = Instance.new("Part")
pad.Name = "Pad_1"
pad.Size = Vector3.new(6, 1, 6)
pad.Anchored = true
pad.Parent = workspace
\`\`\`

Habit order: properties first (Name, Size, Anchored, Color…), **Parent = ...** last. That way the object enters the world already assembled, not as a "gray cube for a moment" that jumps while you finish the lines.

Today Parent is your Folder \`TrackSpawn_v1\`, not a Workspace root dump. Otherwise in a week you will not tell generated pads from junk and from a house.

You already met \`Vector3.new\` and color from code in M1. Here they serve a plate **template** that for simply repeats.

If you forget Parent, the Part "hangs" in memory and you never see it in the world. If you forget Anchored, plates can tumble the moment they appear (depending on place). For a course, Anchored true is basic hygiene.

**Do this now (5 min):** create Folder \`TrackSpawn_v1\`. You can leave one Part by hand as a size sample, but we will build the row with a loop.`,
 },
 {
 title: "Spawn a row in for - the heart of the artifact",
 content: `Script in Folder \`TrackSpawn_v1\` (or nearby, with a reference to the Folder. The main thing is not to destroy the Script during cleanup):

\`\`\`lua
local folder = script.Parent
local start = Vector3.new(0, 5, 0) -- replace with your coords near the course
local step = 8 -- studs between centers
local count = 6

for i = 1, count do
	local pad = Instance.new("Part")
	pad.Name = "Pad_" .. i
	pad.Size = Vector3.new(6, 1, 6)
	pad.Anchored = true
	pad.Material = Enum.Material.Neon
	pad.Color = Color3.fromRGB(80, 180, 255)
	pad.Position = start + Vector3.new(step * (i - 1), 0, 0)
	pad.Parent = folder
end

print("Platforms created:", count)
\`\`\`

Ideas in the lines:
- \`"Pad_" .. i\` glues the name to the number
- \`i - 1\` gives offsets 0, 8, 16… so the first plate sits exactly on \`start\`
- change X/Z/Y to match your island and route direction
- keep \`count\` in a variable at the top. Easier to turn 6 → 8 → 10 without searching the whole script

**Watch out:** every Play of a Script that always spawns can **breed duplicates**. So the next section is cleanup. Without it you submit a "forest" of Pad_1…Pad_6 three times over, and the instructor will see it in Explorer at once.

How to pick a good start: place a temporary marker Part where the course should begin, copy its Position into the code, delete the marker. Do not plug in (0,5,0) at random if your island is far off to the side.

First set count = 3 for a fast test, then raise to 6+. That way you spend less time on "where are my plates?" in a fog of coordinates.

**Do this now (10 min):** at least 6 platforms in a row from a chosen point.`,
 },
 {
 title: "Cleanup before spawn (anti-duplicates)",
 content: `Simple protection: remove old Folder plates first:

\`\`\`lua
local folder = script.Parent

for _, child in ipairs(folder:GetChildren()) do
	if child:IsA("BasePart") and string.sub(child.Name, 1, 4) == "Pad_" then
		child:Destroy()
	end
end

-- then for i = 1, count do ... Instance.new ... end
\`\`\`

Here \`ipairs\` walks what exists, and numeric \`for\` creates the new. Two loops, two roles. Do not try to do both with one while "because while is cooler". while is not needed here.

\`string.sub(name, 1, 4) == "Pad_"\` checks the prefix. If the Folder only has the generator and its plates, you can Destroy every BasePart. If the Script lives in that same Folder, do **not** destroy all children with no filter, or you kill the Script on the first Play.

Practical setups:
1. Script in the Folder, plates only with Pad_ prefix, cleanup only Pad_
2. Script elsewhere (for example a Scripts Folder), plates in TrackSpawn_v1, you can clear the whole plate Folder

Check: Stop → Play → Stop → Play. Explorer should show exactly count plates (plus the Script if it is there). If you see Pad_1..Pad_6 and then Pad_1..Pad_6 again, cleanup did not run.

**Do this now (6 min):** two or three Stop/Play cycles in a row with no growing count.`,
 },
 {
 title: "Fit the course to the world",
 content: `1. Set \`start\` so the first plate is reachable from a path or checkpoint.
2. Tune \`step\` to Character jump length (often 6-10 studs for flat plates of this Size).
3. Height Y: above a gap or water, not inside Baseplate.
4. Optionally alternate color from \`i\`: even/odd with \`if i % 2 == 0 then\`.

That is again \`if\` from 1.4 inside for. Combining what you know, not a brand-new topic. You can also nudge Size a little, but do not make the third plate gigantic "because you can". Even jumps first.

Blink scripts from 3.4 are **not required** on every generated plate today. You can submit a static spawn course as a clean for artifact. If you really want rhythm, hang blink by hand on 1-2 plates after generation, without automating functions.

Do not run the generated course through KillLane so Pad_1 looks like normal death floor with no signal. Either separate the zones in space, or make the course color clearly "safe parkour" (not Really red Neon like kill).

After fitting, walk the whole jump chain in Play from Pad_1 to the last one. If you "cannot reach" in the middle, shrink step. Do not blame for.

**Do this now (7 min):** the course reads in Play, jumps are possible, names Pad_1…Pad_n in Explorer.`,
 },
 {
 title: "ipairs after spawn - a quick audit",
 content: `Add at the end of the generator:

\`\`\`lua
local n = 0
for _, child in ipairs(folder:GetChildren()) do
	if child:IsA("BasePart") then
		n = n + 1
		print(child.Name, child.Position)
	end
end
print("Total BasePart in Folder:", n)
\`\`\`

That way Output shows both the count and whether Position really steps (X or Z growing). Same audit spirit as HQ, gates, and rides, just for the course.

If every Position is the same, the step formula is broken. If n is bigger than count, cleanup failed or extra junk sits in the Folder.

**Do this now (4 min):** audit after generation; match it to what you see in the Viewport.`,
 },
 {
 title: "Common for-spawn breakages",
 content: `| Symptom | Likely cause | Fix |
|---------|------------------|------|
| Duplicates after every Play | No cleanup | ipairs + Destroy before spawn |
| All pads in one spot | Forgot step * (i-1) | Check the Position formula |
| Script disappears / goes silent | Destroyed all Folder children | Filter Pad_ or keep Script outside the pad folder |
| No pads | Wrong Parent / count = 0 | print in the loop |
| Track in the sky / underground | Bad start | Take Position from a marker |
| Names without numbers | Forgot .. i | "Pad_" .. i |

Debug order: first print(i) in the loop, then one Part, then count=6, then cleanup.

**Do this now (3 min):** walk the table against your generator.`,
 },
 {
 title: "Play-test and Save",
 content: `**TrackSpawn_v1 checklist:**
- [ ] Folder with an isolated generator
- [ ] for creates ≥6 pads
- [ ] Pad_ names with numbers
- [ ] Position step visible by eye and in Output
- [ ] replaying Play does not pile up duplicates
- [ ] track is reachable from the module route
- [ ] Save: \`Lesson 3.5 - TrackSpawn_v1\`

At hand-in, say in one sentence: for i is "how many to create"; ipairs is "what is already in the list".`,
 },
 {
 title: "Lesson boundary",
 content: `| Not today | When |
|-------------|------|
| function spawnPad(i) for the whole module | **3.6** |
| LocalScript GUI with a pad list | **3.7** |
| Tables as a major separate topic | **M4** |
| DataStore for track length | M4+ |

Today's win is **stop copy-pasting geometry by hand** when a loop is enough.`,
 },
 {
 title: "Looking ahead to 3.6",
 content: `In **3.6**, functions become the main topic: parameters, return, scope, KillBrick refactor, and logically \`spawnPad(i)\` instead of a fat for body.

Today's loop is the perfect stub for that refactor. Do not inflate it into "the whole game" with blink, kill, and GUI inside one for. Keep the generator clean. Tomorrow you will move steps into a function calmly.`,
 },
 ],
 },
 practice: {
 title: "Practice: TrackSpawn_v1",
 duration: 30,
 description: `**Goal:** a row of platforms via for without manual Ctrl+D on each one.

Open the Place after 3.4.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Folder \`TrackSpawn_v1\`.
2. Together: for i = 1, 5 print.
3. Instance.new Part in the loop with Position from i.
4. Look at duplicates after a second Play. Discuss cleanup.

**Criterion:** everyone sees the i counter in names and positions.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. count ≥ 6, your own start and step.
2. Clean old Pad_ via ipairs before spawn.
3. Audit print at the end.
4. Place the track in the world after the checkpoint / park.
5. Save \`Lesson 3.5 - TrackSpawn_v1\`.

**Criterion:** stable pad count after 2-3 Stop/Play.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Pick one:
- zigzag: alternate Z offset from \`i % 2\`;
- different Size from i (careful with jumps);
- after spawn, ipairs paints every third pad a different color.

**Do not:** DataStore, Remote, a full function module "for later growth", while without wait for spawn (spawn is for, not an endless while).`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Each Play adds another row of pads",
 fix: "Before spawning, clear old Pad_ instances with ipairs + Destroy.",
 },
 {
 mistake: "Position is the same for every i",
 fix: "Add step * (i - 1) (or equivalent) to start.",
 },
 {
 mistake: "Destroy() of the whole Folder including the Script",
 fix: "Filter by name, or keep the Script outside the pads folder.",
 },
 {
 mistake: "Confuses for i with while true",
 fix: "for is a known step count; while true is a timed rhythm with wait.",
 },
 {
 mistake: "Spawn at Workspace root without a Folder",
 fix: "Isolate it in TrackSpawn_v1 - easier to clean and ship.",
 },
 {
 mistake: "LocalScript for Instance.new in Workspace",
 fix: "Normal Script: world building on the server.",
 },
 {
 mistake: "Waits for tables in M4 to make a list",
 fix: "GetChildren already gives a list for ipairs; separate tables come later.",
 },
 ],
   summary: "You mastered numeric for loops to generate staircases, platform rows, and object iterations using ipairs, generating procedural geometry in just a few lines of code.",
  practiceTask: {
    "title": "Hands-on Practice: Staircase Builder (StairBuilder_v1)",
    "difficulty": "intermediate",
    "description": "**Objective:** Procedurally generate a 10-step staircase using a numeric for loop.\n\n### Part A: Generator Anchor\n1. Create a `StairBase` part on the ground (Anchored = true).\n2. Insert a server `Script` named `StairBuilder`.\n\n### Part B: For Loop Generation\n1. Write the generation loop:\n```lua\nlocal basePos = script.Parent.Position\n\nfor i = 1, 10 do\n    local step = Instance.new(\"Part\")\n    step.Name = \"Step_\" .. i\n    step.Size = Vector3.new(6, 1, 3)\n    step.Position = basePos + Vector3.new(0, i * 1.2, i * 3)\n    step.Anchored = true\n    step.Material = Enum.Material.SmoothPlastic\n    step.BrickColor = BrickColor.new(i % 2 == 0 and \"Bright blue\" or \"Bright yellow\")\n    step.Parent = workspace\nend\n```\n\n### Part C: Verification\n1. Press Play: 10 alternating colored stairs appear instantly.\n2. Climb from bottom to top to confirm proper step height.\n3. Save Place as `Lesson 3.5 - StairBuilder_v1`.",
    "hints": [
      "A numeric for i = 1, 10 loop automatically increments i by 1 each step.",
      "Calculate offsets using multiplication: i * height and i * depth.",
      "Ensure step.Anchored = true so steps stay in place."
    ],
    "optionalChallenge": "Make the final 10th step twice as wide with a golden trophy platform."
  },
  quiz: {
 title: "Quiz 3.5 - for / ipairs",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "The lesson 3.5 artifact is:",
 options: [
 "Only one Part by hand",
 "TrackSpawn_v1 with a for platform generator",
 "DataStore save",
 "Win ScreenGui",
 ],
 correctAnswer: 1,
 explanation: "Spawn a track with a loop.",
 },
 {
 id: "q2",
 type: MC,
 question: "In for i = 1, 6 do, the variable i:",
 options: [
 "Always 0",
 "Runs through values 1…6",
 "It is a RemoteEvent",
 "It is Material",
 ],
 correctAnswer: 1,
 explanation: "The loop counter.",
 },
 {
 id: "q3",
 type: MC,
 question: "ipairs is handy when:",
 options: [
 "You need an endless rhythm with no list",
 "You have a list of children / items and need to walk them",
 "You only need to change Lighting",
 "GetChildren is forbidden",
 ],
 correctAnswer: 1,
 explanation: "Walking an existing list.",
 },
 {
 id: "q4",
 type: MC,
 question: "Instance.new(\"Part\") creates:",
 options: [
 "SoundService",
 "A new Part in memory (needs a Parent)",
 "SpawnLocation required",
 "ScreenGui",
 ],
 correctAnswer: 1,
 explanation: "Creating an instance.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why step * (i - 1) in Position?",
 options: [
 "To enable Neon",
 "To shift each next pad by one step",
 "To delete Humanoid",
 "To save DataStore",
 ],
 correctAnswer: 1,
 explanation: "A row in space.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why clean old Pad_ before spawn?",
 options: [
 "Because Roblox requires it for Terrain",
 "So Stop/Play does not spawn duplicates",
 "Because ipairs is otherwise forbidden",
 "To turn off Snap",
 ],
 correctAnswer: 1,
 explanation: "Anti-duplicates.",
 },
 {
 id: "q7",
 type: MC,
 question: "while true and for i = 1, n differ in that:",
 options: [
 "for always hangs",
 "for has a known repeat count; while true runs until stopped (with wait)",
 "while does not exist in Luau",
 "for only works in LocalScript",
 ],
 correctAnswer: 1,
 explanation: "Different jobs for loops.",
 },
 {
 id: "q8",
 type: MC,
 question: "\"Pad_\" .. i gives:",
 options: [
 "Deleting a Part",
 "A name string with a number",
 "Constraint",
 "Atmosphere",
 ],
 correctAnswer: 1,
 explanation: "String concatenation.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which of these is NOT a 3.5 topic?",
 options: [
 "for i = 1, n",
 "ipairs + GetChildren",
 "A full lesson on function / return / scope",
 "Instance.new for pads",
 ],
 correctAnswer: 2,
 explanation: "Functions - 3.6.",
 },
 {
 id: "q10",
 type: MC,
 question: "Which Script for spawning pads in the world?",
 options: [
 "LocalScript in StarterGui required",
 "A normal Script",
 "Only a ModuleScript with no Parent",
 "Script in Lighting only",
 ],
 correctAnswer: 1,
 explanation: "Server-side building.",
 },
 {
 id: "q11",
 type: MC,
 question: "if i % 2 == 0 inside for is:",
 options: [
 "A new forbidden topic",
 "Already-known if + arithmetic for alternating",
 "DataStore",
 "HingeConstraint",
 ],
 correctAnswer: 1,
 explanation: "Spiral 1.4.",
 },
 {
 id: "q12",
 type: MC,
 question: "An ipairs audit after spawn helps:",
 options: [
 "Publish the Place",
 "Check names and Position in Output",
 "Turn off CanQuery globally",
 "Create a RemoteFunction",
 ],
 correctAnswer: 1,
 explanation: "Checking the result.",
 },
 {
 id: "q13",
 type: MC,
 question: "The next logical refactor in 3.6:",
 options: [
 "Remove all loops forever",
 "Extract pad creation into a function",
 "Replace Part with Terrain mandatorily",
 "Delete checkpoints",
 ],
 correctAnswer: 1,
 explanation: "Functions spiral.",
 },
 {
 id: "q14",
 type: MC,
 question: "Recommended Save:",
 options: [
 "Untitled",
 "Lesson 3.5 - TrackSpawn_v1",
 "Module 12 Showcase",
 "Lesson 2.2 only",
 ],
 correctAnswer: 1,
 explanation: "Explicit artifact.",
 },
 {
 id: "q15",
 type: MC,
 question: "Next lesson:",
 options: [
 "Functions",
 "Publish only",
 "Toolbox admin",
 "Race Remotes",
 ],
 correctAnswer: 0,
 explanation: "3.6 - functions.",
 },
 ],
 },
}

export const enLesson36 = {
 lessonId: "lesson-roblox-3-6",
 moduleId: "module-03",
 order: 6,
 title: "3.6 - Functions",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Declare a local function and call it from several places",
 "Pass parameters and return a value via return",
 "Explain scope: where a variable lives inside / outside a function",
 "Refactor KillBrick through a shared function",
 "Optionally extract spawnPad(i) from the 3.5 track generator",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission is to remove copy-paste from the head of the code",
 content: `You already wrote \`local function\` around doors and platform visibility "for neatness". Today functions are the **main topic**: named blocks with parameters, \`return\`, and clear scope.

Until now the course allowed copy-paste: three kill scripts, a fat for that creates Parts. That is fine at the start. But the moment you need to change one death rule on every pad, copy-paste becomes a trap. A function gives one place where the rule lives.

This is not a "new game genre". Gameplay stays the same: lava kills, the track spawns. What changes is only **how** you write it in the Script, so tomorrow-you and the instructor can read faster.

**Artifact:** \`FunctionsKit_v1\`
- kill refactor: one \`killCharacter(character)\` (or similar name) + call from Touched
- debounce stays and works as before
- bonus: \`spawnPad(i, folder, start, step)\` in the track generator
- Save: \`Lesson 3.6 - FunctionsKit_v1\`

**Start:** Place after 3.5. Do not start an empty Baseplate. Take KillLane and/or TrackSpawn and **rewrite** the repeats. After the refactor, gameplay must be no worse: if death vanished after "prettying up the code", the refactor failed.

**Not today:** deep LocalScript+GUI (**3.7**), boss hand-in of the whole mini-game (**3.8**), ModuleScript/Config (**M4**). Today is function in a normal Script.`,
 },
 {
 title: "Why use a function if the code already works",
 content: `When the same chunk repeats on three kill pads or fills a for body a screen and a half long, it is easy to fix one copy and forget the others. A function gives **one source of truth**.

| Without function | With function |
|--------------|------------|
| Three almost identical Touched handlers | One \`killCharacter\`, three short calls |
| Fat for that creates Parts | \`spawnPad(...)\` + thin for |
| Hard to name "what the block does" | Function name = action title |

A function does not make the game "more magical" and does not replace Touched or while. It packs a **repeatable action** under a name so your brain and the instructor can read the Script faster.

Good names: \`killCharacter\`, \`spawnPad\`, \`clearPads\`, \`setVisible\`. Bad: \`doStuff\`, \`f1\`, \`aaa\`, \`func\`.

If after renaming into a function you still understand what the call line does a day later, the name is good. If you have to open the body every time, rename it.

**Do this now (2 min):** find two places in your Place with nearly the same code. Those are function candidates.`,
 },
 {
 title: "local function - declaration and call",
 content: `Basic skeleton:

\`\`\`lua
local function sayHi(name)
	print("Hello,", name)
end

sayHi("Misha")
sayHi("Kira")
\`\`\`

- \`local function sayHi\` - declared
- \`name\` - **parameter** (input slot)
- \`sayHi("Misha")\` - **call** with an argument

A declaration with no call is like a tool in a drawer: it sits there but does no work. After a refactor, always find where the function **is called**.

\`local function\` keeps the name in this Script's local scope. For the course that is the right habit. A global \`function sayHi()\` without local easily confuses names across scripts in one Place.

Keep declarations **above** the first call so your eyes do not hunt around the file. You can call many times with different arguments: one body, many uses.

**Do this now (4 min):** mini-Script with sayHi, two calls, Output; then you can delete the experiment.`,
 },
 {
 title: "Parameters - input data",
 content: `Parameters are "holes" in the declaration that you fill with arguments at call time.

\`\`\`lua
local function setPadColor(pad, color)
	if pad and pad:IsA("BasePart") then
		pad.Color = color
	end
end

local p = workspace:FindFirstChild("Pad_1")
setPadColor(p, Color3.fromRGB(255, 200, 50))
\`\`\`

Separate several parameters with commas. Order matters: the first argument lands in the first parameter. If you swap pad and color, you get odd errors or silence.

If an argument is \`nil\` (Part not found), check \`if pad then\` inside. Same caution as Humanoid in kill: make sure the object exists, then touch properties.

Do not confuse a parameter name with an object in Workspace: parameter \`pad\` is a variable **inside** the call. You pass a concrete Part as argument \`p\`.

How many parameters are "normal" at the start? Two to four. If you hit eight, the function may be doing too much and you should split it later.

**Do this now (5 min):** a function with two parameters on your Part (color or Transparency) and two different calls.`,
 },
 {
 title: "return - result outward",
 content: `\`return\` gives a value back to whoever called the function and **ends** it at that moment. Lines after return in the same call will not run.

\`\`\`lua
local function findHumanoid(character)
	if not character then
		return nil
	end
	return character:FindFirstChildOfClass("Humanoid")
end

local character = workspace:FindFirstChild("TestModel")
local hum = findHumanoid(character)
if hum then
	print("Health", hum.Health)
else
	print("No Humanoid")
end
\`\`\`

Without return, a function only "does something in the world" (side effect: print, change Health). With return it also **answers** with a value you can store in \`local hum = ...\`.

You can \`return\` with no value to exit early. You already did that in Touched when there is no Humanoid; now the same move lives inside a named function.

Do not confuse a function return with a return from a Connect callback: the word is the same, but they exit **different** blocks. Return inside \`killCharacter\` does not stop the whole Touched handler by itself, only the function body.

**Do this now (5 min):** a function that returns Humanoid or nil; wrap the call in if and check both branches (present / missing).`,
 },
 {
 title: "Scope - where a variable lives",
 content: `**Scope** is visibility range: from where a variable is still visible and where it has already "died".

\`\`\`lua
local outside = "I am outside"

local function demo()
	local inside = "I am inside"
	print(outside) -- visible: outer local is available
	print(inside)
end

demo()
-- print(inside) -- error: inside does not exist here
\`\`\`

Rules in plain words:
- \`local\` at the top of the Script is visible to functions below in this Script
- \`local\` inside a function lives only for that call
- a parameter is also "inner" for the duration of the call

Typical mistake after a kill refactor: \`local debounce = false\` **inside** \`killCharacter\`. Then every call creates a fresh debounce from scratch, and repeat protection fails. Debounce must stay **outside**, at Script level, as in 3.2.

Another mix-up: two parameters with the same names as outer variables. Allowed, but inside the function the parameter name "shadows" the outer one. Better not play with shadowing unless you need to.

**Do this now (4 min):** declare inside in a function; try print outside and watch the Output error, then remove the experiment.`,
 },
 {
 title: "KillBrick refactor - main artifact",
 content: `Was (on each pad): a long Touched with Humanoid lookup and Health = 0.

Becomes:

\`\`\`lua
local part = script.Parent
local debounce = false

local function killCharacter(character)
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	if not humanoid then
		return false
	end
	humanoid.Health = 0
	return true
end

part.Touched:Connect(function(hit)
	if debounce then
		return
	end
	local character = hit.Parent
	if not character then
		return
	end

	debounce = true
	killCharacter(character)
	task.wait(1)
	debounce = false
end)
\`\`\`

What you gain:
- the name \`killCharacter\` reads like a sentence
- return false/true can help diagnose ("who was not found")
- the next pad gets copy-pasted with the function already ready
- in M4 you may later move this into a ModuleScript, but not today

Note the pattern \`character and character:FindFirstChild...\`: if character = nil, the Humanoid search does not run. Short protection instead of a two-level if.

Important: after the refactor, **run Play**. If the function looks nice but death is gone, you forgot the call in Connect or left old commented code without the new one. A refactor without working gameplay does not count.

Debounce stays outside, because it must survive many Touched firings. The function only does "kill this character now".

Copy the updated Script onto 2-3 KillLane pads. That is how you feel the benefit: change the death rule in one template, then spread a short file by copy-paste.

**Do this now (10 min):** refactor at least one kill pad + test death without Output spam.`,
 },
 {
 title: "Bonus: spawnPad for the 3.5 track",
 content: `If you still have the TrackSpawn generator:

\`\`\`lua
local function spawnPad(i, folder, start, step)
	local pad = Instance.new("Part")
	pad.Name = "Pad_" .. i
	pad.Size = Vector3.new(6, 1, 6)
	pad.Anchored = true
	pad.Position = start + Vector3.new(step * (i - 1), 0, 0)
	pad.Parent = folder
	return pad
end

for i = 1, 6 do
	spawnPad(i, folder, start, step)
end
\`\`\`

For stays thin: only the counter and the call. Part details live in one place. Changing Size on all pads = one edit in \`spawnPad\`. That "one source of truth" feeling is the point of the lesson.

return pad is handy if you immediately want to do something with the new pad (paint it, keep a reference). If not, you can ignore the call result.

You can wrap ipairs cleanup in \`clearPads(folder)\` too. Also a valid bonus instead of spawnPad if you already handed in the track and do not want to touch spawn.

Remember: cleanup still goes **before** the creation loop, or the function will just spawn duplicates nicely.

**Do this now (8 min):** spawnPad or clearPads. For "excellent", one bonus plus the kill refactor is enough.`,
 },
 {
 title: "When you should not force a function",
 content: `Do not extract a single line \`print("ok")\` into a function "because it looks more serious". A function makes sense when:
- the block repeats
- the block is long and wants a clear name
- the block returns something useful for other places in the code

Do not make a function that copy-pastes three almost identical while loops inside itself. See the repeat first, then pack it.

Do not hide Remote, DataStore, or a "future inventory" in a function just in case. Module boundaries matter more than a universal 100-line swiss-army knife.

If after the refactor it became **harder** to read (ten micro-functions of two lines each), roll back the extras. Readability beats function count in the file.

Also do not turn the whole Touched callback into a function just so "everything is in a function". The Connect callback is already a block. Extract what has an action name: kill, spawn, clear, setVisible.

**Do this now (2 min):** cross off from your refactor list anything that does not repeat yet.`,
 },
 {
 title: "Play-test and Save",
 content: `**FunctionsKit_v1 checklist:**
- [ ] At least one meaningful \`local function\` with a parameter
- [ ] Kill (or spawn) calls it instead of duplicating the body
- [ ] debounce / state outside if it must survive calls
- [ ] return used in at least one place (a value or early exit)
- [ ] Play: world behavior no worse than before the refactor
- [ ] Save: \`Lesson 3.6 - FunctionsKit_v1\`

At hand-in, explain: parameter = input, return = output, scope = where the variable is visible.`,
 },
 {
 title: "Lesson boundary",
 content: `| Not today | When |
|-------------|------|
| ModuleScript + require Config | **M4** |
| LocalScript GUI buttons / win UI | **3.7** |
| Full mini-game integration | **3.8** |
| OOP / metatables | far beyond M3 |

Today's win is a **refactor that does not make gameplay worse**.`,
 },
 {
 title: "Looking ahead to 3.7",
 content: `In **3.7** you go deeper on Script vs LocalScript: StarterGui, ScreenGui, Frame, TextButton, win UI. Functions will help there too (for example \`showWin()\` or \`setButtonEnabled(btn, on)\`), but first close the server-side kill/spawn refactor.

Do not start drawing a full victory screen already "because I know functions". Save FunctionsKit first, then the GUI lesson. Otherwise you mix two hard topics in one evening and hand in nothing clean.`,
 },
 ],
 },
 practice: {
 title: "Practice: FunctionsKit_v1",
 duration: 30,
 description: `**Goal:** a function with parameters/return + kill refactor (and preferably spawn).

Open the Place after 3.5.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Mini example sayHi / findHumanoid.
2. Together, extract Humanoid lookup + Health into killCharacter.
3. Wire it to one kill pad.
4. Confirm debounce is outside.

**Criterion:** death works, Touched code is shorter.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Refactor 2-3 kill pads onto the same idea (copy-pasting a Script with a function is fine).
2. Add return true/false and one optional print.
3. Bonus: spawnPad or clearPads in TrackSpawn.
4. Save \`Lesson 3.6 - FunctionsKit_v1\`.

**Criterion:** the instructor sees a named function and a working Play.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Pick one:
- \`setVisible(platform, isVisible)\` for blink from 3.4;
- \`formatTime(elapsed)\` returning a string for the 3.3 timer;
- one function with 3 parameters for spawn (folder, i, step).

**Do not:** ModuleScript "for later growth", RemoteEvent, full win GUI from 3.7.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "debounce declared local inside the function",
 fix: "Move debounce to Script scope - it must live between Touched calls.",
 },
 {
 mistake: "Function declared but never called",
 fix: "After the refactor, a killCharacter(...) call must remain inside Connect.",
 },
 {
 mistake: "Expects an inside variable to be visible outside",
 fix: "That is scope. Return a value with return, or keep a local outside.",
 },
 {
 mistake: "Named a parameter like a Part in Workspace and confuses them",
 fix: "A parameter is a call-local variable; pass pad explicitly.",
 },
 {
 mistake: "Refactor broke the game, but the function \"looks nice\"",
 fix: "Restore Play behavior first, then polish names.",
 },
 {
 mistake: "Global function without local",
 fix: "In this course, write local function inside a Script.",
 },
 {
 mistake: "Writes a ModuleScript instead of a local function",
 fix: "ModuleScript is M4. Today keep everything in one Script.",
 },
 ],
   summary: "You learned how to structure code with reusable functions, parameters, and return values, eliminating code duplication across damage, healing, and effect handlers.",
  practiceTask: {
    "title": "Hands-on Practice: Helper Functions (HelperFunctions_v1)",
    "difficulty": "intermediate",
    "description": "**Objective:** Create modular health-modifying functions and wire them to separate trigger pads.\n\n### Part A: Pad Setup\n1. Place a red `TrapPad` and a green `HealPad` in a Model named `EffectPads` (Anchored = true).\n\n### Part B: Shared Function Script\n1. Add a server `Script` inside `EffectPads`:\n```lua\nlocal function modifyHealth(humanoid, amount)\n    if not humanoid or humanoid.Health <= 0 then return false end\n    humanoid.Health = math.clamp(humanoid.Health + amount, 0, humanoid.MaxHealth)\n    print(\"Health modified by\", amount, \"Current:\", humanoid.Health)\n    return true\nend\n```\n2. Connect `TrapPad.Touched` to `modifyHealth(humanoid, -25)` with debounce.\n3. Connect `HealPad.Touched` to `modifyHealth(humanoid, 25)` with debounce.\n\n### Part C: Verification\n1. Step on TrapPad (Health drops by 25), then step on HealPad (Health recovers).\n2. Save Place as `Lesson 3.6 - HelperFunctions_v1`.",
    "hints": [
      "math.clamp keeps Health cleanly bounded between 0 and MaxHealth.",
      "Functions let you update logic in one central spot instead of duplicating code.",
      "Pass the target Humanoid and numeric amount as explicit parameters."
    ],
    "optionalChallenge": "Add a third function applySpeedBoost(humanoid, boostAmount, duration) for temporary sprint boosts."
  },
  quiz: {
 title: "Quiz 3.6 - Functions",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 3.6:",
 options: [
 "A new Constraint",
 "Functions: parameters, return, scope, kill refactor",
 "DataStore",
 "Publish Showcase",
 ],
 correctAnswer: 1,
 explanation: "Functions lesson.",
 },
 {
 id: "q2",
 type: MC,
 question: "A function parameter is:",
 options: [
 "A required RemoteEvent",
 "An input name/value you pass at call time",
 "A Terrain type",
 "Only Material",
 ],
 correctAnswer: 1,
 explanation: "Function input.",
 },
 {
 id: "q3",
 type: MC,
 question: "return in a function:",
 options: [
 "Always deletes a Part",
 "Returns a value to the caller and ends the function",
 "Enables Lighting",
 "Creates a SpawnLocation",
 ],
 correctAnswer: 1,
 explanation: "Exit and end of the call.",
 },
 {
 id: "q4",
 type: MC,
 question: "local inside a function, from outside:",
 options: [
 "Visible across the whole Place",
 "Usually not visible (different scope)",
 "Automatically becomes a DataStore",
 "Breaks Anchored",
 ],
 correctAnswer: 1,
 explanation: "Scope.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why keep kill debounce outside the function?",
 options: [
 "Because Roblox forbids local in a function",
 "Because the state must live across different Touched calls",
 "Because Snap is faster that way",
 "Because LocalScript requires it",
 ],
 correctAnswer: 1,
 explanation: "State between events.",
 },
 {
 id: "q6",
 type: MC,
 question: "local function is better than bare function in this course because:",
 options: [
 "Otherwise print does not work",
 "It limits the name to the Script's local scope",
 "It disables Touched",
 "It creates GUI",
 ],
 correctAnswer: 1,
 explanation: "Locality habit.",
 },
 {
 id: "q7",
 type: MC,
 question: "A KillBrick refactor means:",
 options: [
 "Delete all hazards",
 "Extract shared logic into a function without making Play worse",
 "Replace Part with Terrain",
 "Turn on Party Mode",
 ],
 correctAnswer: 1,
 explanation: "Cleaner, same behavior.",
 },
 {
 id: "q8",
 type: MC,
 question: "spawnPad(i, folder, start, step) is an example of:",
 options: [
 "Constraint",
 "A function with several parameters",
 "Atmosphere",
 "Toolbox hygiene",
 ],
 correctAnswer: 1,
 explanation: "Bonus track refactor.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which of these is NOT a 3.6 topic?",
 options: [
 "return",
 "scope",
 "ModuleScript + require Config",
 "parameters",
 ],
 correctAnswer: 2,
 explanation: "ModuleScript - M4.",
 },
 {
 id: "q10",
 type: MC,
 question: "If the function is declared but Touched still has the old long code:",
 options: [
 "Refactor is done",
 "You need to call the function from Connect",
 "DataStore is required",
 "Delete Humanoid",
 ],
 correctAnswer: 1,
 explanation: "The call is required.",
 },
 {
 id: "q11",
 type: MC,
 question: "return nil from findHumanoid means:",
 options: [
 "Studio must crash",
 "No human Humanoid found / no character",
 "Successful kill",
 "A new SpawnLocation",
 ],
 correctAnswer: 1,
 explanation: "Empty result.",
 },
 {
 id: "q12",
 type: MC,
 question: "When is a function unnecessary?",
 options: [
 "When the block repeats in three places",
 "When it is one simple line with no repeat",
 "When there are parameters",
 "When there is return",
 ],
 correctAnswer: 1,
 explanation: "Do not force extras.",
 },
 {
 id: "q13",
 type: MC,
 question: "Which Script for a kill refactor in Workspace?",
 options: [
 "LocalScript in StarterGui required",
 "A normal Script",
 "Only ModuleScript",
 "Script in SoundService",
 ],
 correctAnswer: 1,
 explanation: "Server-side world logic.",
 },
 {
 id: "q14",
 type: MC,
 question: "Recommended Save:",
 options: [
 "Untitled",
 "Lesson 3.6 - FunctionsKit_v1",
 "Module 9 Remotes",
 "Lesson 1.1 only",
 ],
 correctAnswer: 1,
 explanation: "Explicit artifact.",
 },
 {
 id: "q15",
 type: MC,
 question: "Next lesson:",
 options: [
 "LocalScript + GUI",
 "DataStore tables",
 "Toolbox Free admin",
 "Publish only",
 ],
 correctAnswer: 0,
 explanation: "3.7 - client GUI.",
 },
 ],
 },
}

export const enLesson37 = {
 lessonId: "lesson-roblox-3-7",
 moduleId: "module-03",
 order: 7,
 title: "3.7 - LocalScript + GUI",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Explain Script vs LocalScript and when to use which",
 "Build the hierarchy StarterGui → ScreenGui → Frame → TextLabel/TextButton",
 "Show a win screen (win UI) via Visible",
 "Wire TextButton to MouseButton1Click and hide the panel",
 "Link mini-game finish (Touched on server) to GUI via Attribute without Remotes",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission is a screen that says \"you finished\"",
 content: `In 3.3 you already saw a light \`TimerGui\`: one \`TextLabel\` and a \`LocalScript\`. Today GUI is the **main topic**: understand why the interface lives on the client, build a proper hierarchy with \`Frame\` and \`TextButton\`, and make a **win screen** when the player reaches the finish.

This is the logical bridge to the 3.8 boss hand-in: a mini-game without "you won" on screen feels cut off. Doors, kill, checkpoints, platforms, and functions are already there. What remains is the layer the player sees over the world. Without that layer the instructor only sees print in Output, and the player hears silence after the finish.

Think of it this way: Workspace is the stage, StarterGui is the subtitles and credits. A stage without credits can be fine for an experiment. Handing in a module without win credits is like a film that cuts off mid-sentence.

**Artifact:** \`WinUI_v1\`
- \`StarterGui\` → \`WinGui\` (\`ScreenGui\`) with \`WinFrame\`, a label, and a button
- finish Part \`FinishPad\` with a server Script (Touched + debounce)
- server sets Attribute \`HasWon\` on the player
- LocalScript shows \`WinFrame\`, the button hides the panel
- Save: \`Lesson 3.7 - WinUI_v1\`

**Start:** Place after 3.6 (FunctionsKit + route 3.1-3.5). Do not start an empty Baseplate. Finish only makes sense at the end of a track you already built. If there is no track, quickly restore a short path: start → a bit of risk → FinishPad. A short live route beats a pretty GUI on emptiness.

**Not today:** RemoteEvent / RemoteFunction (**M9**), ModuleScript/Config (**M4**), DataStore, shop, TweenService panel animations, full boss hand-in with Badge and a 60" presentation (**3.8**). Today is client UI and an honest bridge: "server decided → screen showed".

If you really want a "restart level" button, jot the idea in a note. Full restart from the client without Remotes easily becomes a hack. In this lesson we honestly close the panel and learn Script/LocalScript roles.`,
 },
 {
 title: "Script vs LocalScript - two different jobs",
 content: `Both look like "code in Explorer". The difference is not Luau syntax. It is **where it runs** and **what it is allowed to do**. While you mix up the place, you hit the nastiest beginner bugs: "code is there, Play is silent".

| | Script | LocalScript |
|--|--------|-------------|
| Where it runs | on the server | on the player's client |
| Typical jobs | doors, kill, checkpoint, finish rule | HUD, buttons, local timer |
| Where to put it in the course | Workspace / ServerScriptService | StarterGui, StarterPlayerScripts |
| If you put it "in the wrong place" | LocalScript on a world Part often **stays silent** | a server Script in ScreenGui is a poor fit for a personal button |

Module rule: **world and game rules** are Script. **Personal screen** is LocalScript. You already did this by instinct: kill on Script, timer on LocalScript. Today the rule becomes conscious. You should be able to explain it to a classmate in 30 seconds.

Why not "everything on LocalScript"? Because then every client decides death and finish alone. In multiplayer that is chaos and cheats. Even in solo testing it is a bad habit: tomorrow a friend joins your Place and the rules drift apart.

Why not "everything on Script in StarterGui"? Because updating a personal label and button clicks is more natural and stable on the client. The server can know the win fact; drawing the frame is easier where PlayerGui lives.

Later (**M9**) Remotes appear so client and server talk explicitly. Today we use Attribute: the server writes the "won" fact, the client only draws. This is not a "permanent hack". It is the right teaching bridge without jumping three modules ahead.

**Do this now (3 min):** in your Place find one world Script and one timer LocalScript. Next to them in a note write "server / client". If a LocalScript sits on KillPart, move the death logic to a normal Script.`,
 },
 {
 title: "StarterGui - why UI does not go in Workspace",
 content: `**StarterGui** is a template folder. When a player joins the Place, Roblox **clones** StarterGui contents into their personal PlayerGui. That is why each player sees their own \`WinGui\`, not a shared Part in the world.

If you build a ScreenGui directly in Workspace "to look nice in Explorer", players either will not see it as HUD or will see it oddly. Course path: **StarterGui → ScreenGui → elements**. Remember this chain like an apartment address: building / floor / room.

In Play during testing, look not only at Workspace but **Players → [YourName] → PlayerGui**. That is where the live copy lives. If you edit only StarterGui during Play, changes may not reach the already cloned PlayerGui. Stop and Play again after template edits. Classic trap: "I changed the text, but the screen still shows the old one" because you are looking in the wrong place.

\`BillboardGui\` from 3.1 stays in the world above a Part. That is a 3D hint. \`ScreenGui\` is a screen layer. Do not swap them: Billboard is not a "Play again" button, ScreenGui does not replace an "Open" label above a door. Different jobs, different containers. At hand-in, saying that difference out loud is good: the instructor hears right away that you are not mixing HUD and world-hint.

One more detail: do not spawn five ScreenGui "just in case". For the lesson, \`TimerGui\` and \`WinGui\` are enough (even one ScreenGui with two Frames is fine if Explorer order is clean).

**Do this now (4 min):** open StarterGui, confirm TimerGui from 3.3 is there (or restore it). Memorize the path in PlayerGui during Play.`,
 },
 {
 title: "Hierarchy: ScreenGui → Frame → Label / Button",
 content: `A bare TextLabel "floats" in screen space. For win UI you need a **container**, a \`Frame\`: background, bounds, room for a title and a button. The container gives the eye hierarchy: first you see the card, then the text, then the action.

Build it like this:

\`\`\`
StarterGui
  WinGui (ScreenGui)
    WinFrame (Frame)
      TitleLabel (TextLabel)
      HintLabel (TextLabel)
      OkButton (TextButton)
\`\`\`

Properties at the start:
- \`WinGui.ResetOnSpawn\` - for the course often \`false\`, so the panel does not vanish oddly after death during tests (you can compare both options later on the boss hand-in)
- \`WinFrame.Visible = false\` - panel hidden until there is a win
- Size / Position / AnchorPoint: frame centered, not a full-screen "wall"
- TitleLabel: for example "Finish!"
- HintLabel: short "You completed the mini-game"
- OkButton: text "OK" or "Next"

UDim2 and Scale: prefer relative sizes (Scale) so the panel does not drift on different screens. Absolute pixels are fine for fine-tuning, but do not build everything in offset "by eye on your monitor". On a partner's laptop it will all shift.

Do not confuse \`Frame\` with Part. Frame is a 2D GUI element. Its "color" is BackgroundColor3, not BrickColor of a wall. Border / UICorner can be tuned for neatness, but do not spend half the lesson on perfect style: Visible logic first, paint later.

ZIndex: if the button "does not click", check whether a transparent Frame is sitting on top. More common than it seems.

**Do this now (10 min):** WinGui hierarchy built; in Play (even with Visible true temporarily) the frame reads centered. Then Visible false again.`,
 },
 {
 title: "Timer polish: Frame around the old Label",
 content: `While you build win UI, also tidy \`TimerGui\` from 3.3. Same container idea. The module should look like one product: time and win from the same UI school.

Was: ScreenGui → TextLabel. Cleaner: ScreenGui → Frame \`TimerFrame\` → TextLabel. Semi-transparent background, padding so digits do not blend into sky and Terrain. Do not make the timer half the screen. It is a helper, not the hero. Today's hero is WinFrame.

Stopwatch code stays almost the same: LocalScript stays near the Label (or finds it via \`script.Parent\` / \`FindFirstChild\`). Do not rewrite time logic "from scratch". Only wrap the look. If while polishing you broke while and removed \`task.wait\`, Studio will remind you with a hang. Put wait back immediately.

This matters for the 3.8 hand-in: the instructor immediately sees the HUD was built on purpose, not "one Label accidentally in a corner". Also easier to explain: "here is the timer Frame, here is the win Frame".

If there is no timer, restore the 3.3 minimum (while + task.wait + format). Do not touch DataStore or a records table. Do not make "pause timer on finish" required. Nice, but not a lesson blocker. If you have time: when HasWon becomes true, you can stop updating the text (carefully exiting the loop). That is a challenge, not the base.

**Do this now (6 min):** TimerFrame looks neater; time still ticks.`,
 },
 {
 title: "FinishPad on the server - who decides the win",
 content: `Finish is a **world rule**, so a Script on Part \`FinishPad\` (or in ServerScriptService with a reference to the Part). This is where "this attempt counts" is decided. GUI only delivers the news.

1. Part at the end of the route: bright color, Anchored, name \`FinishPad\`, optional Billboard "FINISH" (skill from 3.1).
2. Touched + Humanoid + debounce - same frame as kill/checkpoint, only a different action.
3. Action: find Player and set Attribute.

Why this frame again? Because the module trains **template transfer**: touch filter → action → pause. Beginners want a new "magic" code each time. The course does the opposite: same skeleton, different muscle.

\`\`\`lua
local finish = script.Parent
local players = game:GetService("Players")
local debounce = false

finish.Touched:Connect(function(hit)
	if debounce then
		return
	end

	local character = hit.Parent
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	if not humanoid then
		return
	end

	local player = players:GetPlayerFromCharacter(character)
	if not player then
		return
	end

	debounce = true
	player:SetAttribute("HasWon", true)
	print(player.Name, "finish")
	task.wait(1)
	debounce = false
end)
\`\`\`

Why Attribute, not "change GUI directly from this Script"? Because a server Script is a poor fit for personally drawing each player's PlayerGui in the teaching template. Attribute is a fact that **replicates** to the player. LocalScript only reads the fact and shows the frame.

Debounce again outside the "event" logic, as in functions 3.6: state between touches lives at Script level. If you put debounce local inside the Connect callback without an outer variable, you get surprises. Keep it as in the sample.

Do not put FinishPad right after spawn "for a quick UI test" and forget to move it. On hand-in that looks like broken design. For a quick test, temporarily shorten the route, but put finish back at the end before Save.

**Do this now (10 min):** FinishPad + Script. Play → touch → Output has print. You can inspect Attribute on Player in Explorer during Play.`,
 },
 {
 title: "LocalScript: show WinFrame",
 content: `In \`WinGui\` add a LocalScript (for example \`WinController\`). This is the "credits director": it does not decide whether the finish is fair. It only shows the card when the fact already exists.

\`\`\`lua
local players = game:GetService("Players")
local player = players.LocalPlayer

local winGui = script.Parent
local winFrame = winGui:WaitForChild("WinFrame")
local okButton = winFrame:WaitForChild("OkButton")

winFrame.Visible = false

local function showWin()
	winFrame.Visible = true
end

local function hideWin()
	winFrame.Visible = false
end

if player:GetAttribute("HasWon") then
	showWin()
end

player:GetAttributeChangedSignal("HasWon"):Connect(function()
	if player:GetAttribute("HasWon") == true then
		showWin()
	end
end)

okButton.MouseButton1Click:Connect(function()
	hideWin()
end)
\`\`\`

Note: here you already use \`local function\` from 3.6, even in GUI. Names \`showWin\` / \`hideWin\` read better than copying \`Visible = true\` twice.

\`WaitForChild\` waits until the Frame appears in the clone. Useful habit, because GUI load order sometimes trips beginners. If you write \`winGui.WinFrame\` without waiting and catch nil, it is not "GUI broken". It is a load race.

\`MouseButton1Click\` is a GUI button event (not ClickDetector from the world). Different systems: the world clicks a Part, the screen clicks a TextButton. On quizzes this is almost always a separate question, and correctly so.

Today the button only **hides** the panel. A full "restart level" (reset Attribute on the server, teleport to start) needs either a new server trigger or Remotes in M9. For the lesson it is enough: saw the win → pressed OK → keep looking at the world. In 3.8 you can add a simple re-run or character Reset as an organizational gesture, not a new networking topic.

Check the edge case: finish already happened (HasWon true), you Stop/Play. Depending on whether Attribute lives only for the session. For teaching, a session fact is fine. Main point: in a fresh Play, finish can show the frame again.

**Do this now (10 min):** touch finish → frame appears → OK hides it.`,
 },
 {
 title: "Visible, Enabled, and typical \"invisible\" breakages",
 content: `Three different "offs" that confuse even people who already built a Frame:

| Property | Where | Effect |
|-------------|-----|--------|
| \`Frame.Visible\` | Frame / Label / Button | element is not drawn |
| \`ScreenGui.Enabled\` | ScreenGui | whole HUD of this ScreenGui |
| transparent Background / TextTransparency | look | "as if missing", but the object is there |

If win "does not appear", walk the chain, do not thrash randomly:
1. Did print fire on FinishPad?
2. Did \`HasWon\` become true on Player?
3. Is the LocalScript in WinGui (not Script)?
4. Is WinFrame.Visible set to true by code?
5. Is ScreenGui.Enabled true and Size not zero?
6. Are you looking at your own character in Play?

If the button does not react: it must be TextButton (not Label), Active true, not covered by another transparent Frame with higher ZIndex, and the event must be MouseButton1Click. Click the button in Play and check whether the event arrives at all. A temporary print in the callback saves half an hour of guessing.

Another trap: two WinGui in StarterGui (old experiment + new). Then you may edit one template while a mess gets cloned. Leave one clean \`WinGui\`.

**Do this now (4 min):** intentionally break Visible / Enabled and restore with the checklist. You will debug faster before hand-in.`,
 },
 {
 title: "What stays on the server, what on the client (module mini-map)",
 content: `Build the M3 map in your head. This is the "logical module" the course asks for:

| System | Where the code lives | Lesson |
|---------|--------|------|
| Doors Click/Prompt | Script | 3.1 |
| KillBrick | Script (+ function from 3.6) | 3.2 / 3.6 |
| Checkpoint RespawnLocation | Script | 3.3 |
| On-screen timer | LocalScript | 3.3 / polish 3.7 |
| Blink platforms | Script + while | 3.4 |
| Track spawn for | Script + function | 3.5 / 3.6 |
| Win UI | LocalScript + Attribute from server | **3.7** |

If tomorrow you want an "OK button that resurrects all enemies on the server", that is already a client→server talk via Remotes. Do not invent it today with hacks. Honest teaching contract: server sets \`HasWon\`, client draws.

When on the boss hand-in (3.8) you are asked "why is kill not in LocalScript?", answer with the map: world rules on the server, personal screen on the client. That sentence is worth more than ten decorative Parts.

Also check naming hygiene: FinishPad, WinFrame, HasWon, so in a week you still understand the Place. \`Part15\` and unnamed \`Script\` on finish are a readability penalty.

**Do this now (3 min):** walk the table with your finger through Explorer. Is there a LocalScript on KillPart or a Script inside TextButton?`,
 },
 {
 title: "Play-test WinUI_v1 and Save",
 content: `**WinUI_v1 checklist:**
- [ ] FinishPad at the end of the route, visible and labeled (Billboard or bright color)
- [ ] Server Touched sets \`HasWon\` + print
- [ ] WinFrame appears after finish without manually toggling Visible in Properties
- [ ] OkButton hides Frame via MouseButton1Click
- [ ] TimerGui (with Frame) still works and has task.wait
- [ ] No RemoteEvent "for later growth" and no DataStore "for later growth"
- [ ] No second forgotten WinGui duplicate in Explorer
- [ ] Save: \`Lesson 3.7 - WinUI_v1\`

For peer-demo, 20 seconds is enough: run to finish → show the frame → press OK. If the frame is there but finish is "magic without a Script", that is a weaker hand-in for the course: you need the Attribute bridge. The reverse is also bad: Attribute is set, GUI stays silent. Then LocalScript is not listening to the signal or Visible is broken.

If finish fires from any physics (an attraction piece from M2), filter Humanoid like in kill. Otherwise a random debris piece "wins" for you.

Before Save, do Stop → Play again on a clean join: during a long Play, temporary states can pile up and it can look "all fine" until you restart.

Short portfolio note: "server decides HasWon, client draws WinFrame". Worth being able to say that out loud.`,
 },
 {
 title: "Looking ahead to 3.8 - mini-game boss hand-in",
 content: `In **3.8** you do not learn a new language. You **assemble a product**: doors, hazard, checkpoints, platforms, generation, functions, win UI; tune balance; make Badge lite; present in ~60 seconds.

Today close WinUI_v1 so tomorrow you are not fixing the basic win display while polishing the whole module. Worst boss scenario: integration exists, but the finish screen is "we'll finish it in the last five minutes" and you run out of time.

Tomorrow you will also need a readable route map. If FinishPad is in the middle of nowhere "for testing" now, put it back at the logical end of the level today. Future you will thank you.

Do not open M4 and do not drag tables in "to read ahead" instead of Save. The course spiral works when each boss stands on a solid previous artifact.`,
 },
 {
 title: "Practice A - Together (10 min)",
 content: `1. Build WinGui hierarchy (Frame + 2 Label + TextButton), Visible false.
2. Place FinishPad and a server Script with Attribute HasWon.
3. LocalScript: show/hide + MouseButton1Click + WaitForChild.
4. One successful finish in Play with print in Output.

Work in pairs if you can: one builds Frame, the other writes server Touched, then swap and check each other's piece. That catches "Script instead of LocalScript" faster.

**Criterion:** the frame appears from a touch, not from manually toggling Visible in Properties at hand-in. The instructor may ask for Stop/Play and a repeat finish.`,
 },
 {
 title: "Practice B - Solo (12 min)",
 content: `1. Polish the look: colors, text, screen center, so WinFrame does not look like a random gray square.
2. Pack TimerGui into TimerFrame; confirm time still ticks.
3. Test death on kill after finish: how GUI behaves (ResetOnSpawn). Lock in the behavior that is fine for the boss.
4. Remove ScreenGui duplicates and junk test Parts like "Finish2".
5. Save \`Lesson 3.7 - WinUI_v1\`.

**Criterion:** the instructor sees both server print/Attribute and the client frame; timer is alive.`,
 },
 {
 title: "Practice C - Challenge (8 min)",
 content: `Pick one:
- second language / shorter text on TitleLabel and HintLabel (same Frame);
- after showWin, change OkButton color for one "success" beat, then restore;
- small ImageLabel finish icon inside WinFrame (no BadgeService);
- when HasWon is true, stop updating timer text (clean exit from while).

**Do not:** BadgeService / AwardBadge (that is 3.8), RemoteEvent, DataStore, ModuleScript "for later growth", full level restart from the client.

Challenge is a star. Hand in base WinUI_v1 first.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "LocalScript on FinishPad in Workspace",
 fix: "Finish rule - normal Script. Keep LocalScript for UI in StarterGui.",
 },
 {
 mistake: "WinFrame always Visible true",
 fix: "Hide by default; show only after HasWon.",
 },
 {
 mistake: "Server tries to find ScreenGui only in StarterGui during Play",
 fix: "A working copy lives in PlayerGui. Prefer Attribute + LocalScript, as in the template.",
 },
 {
 mistake: "Button made as TextLabel",
 fix: "You need a TextButton and MouseButton1Click.",
 },
 {
 mistake: "No WaitForChild - sometimes nil",
 fix: "Wait for WinFrame/OkButton with WaitForChild.",
 },
 {
 mistake: "Confuses ClickDetector and MouseButton1Click",
 fix: "World - ClickDetector; GUI button - MouseButton1Click.",
 },
 {
 mistake: "Adds RemoteEvent \"just in case\"",
 fix: "In M3, Attribute is enough. Remotes come later.",
 },
 ],
   summary: "You mastered the difference between client LocalScripts and server Scripts, learned how to build UI in StarterGui, and handle on-screen button clicks.",
  practiceTask: {
    "title": "Hands-on Practice: Interactive HUD (PlayerGui_v1)",
    "difficulty": "intermediate",
    "description": "**Objective:** Build a responsive client-side UI in StarterGui with a sprint toggle button.\n\n### Part A: ScreenGui Setup\n1. In `StarterGui`, add a `ScreenGui` named `MainHUD`.\n2. Insert a `TextButton` named `SprintButton` in the bottom-right corner.\n\n### Part B: Client LocalScript\n1. Add a `LocalScript` inside `SprintButton`:\n```lua\nlocal button = script.Parent\nlocal player = game.Players.LocalPlayer\nlocal character = player.Character or player.CharacterAdded:Wait()\nlocal humanoid = character:WaitForChild(\"Humanoid\")\n\nlocal isSprinting = false\n\nbutton.MouseButton1Click:Connect(function()\n    isSprinting = not isSprinting\n    if isSprinting then\n        humanoid.WalkSpeed = 32\n        button.Text = \"Sprint: ON\"\n        button.BackgroundColor3 = Color3.fromRGB(46, 204, 113)\n    else\n        humanoid.WalkSpeed = 16\n        button.Text = \"Sprint: OFF\"\n        button.BackgroundColor3 = Color3.fromRGB(52, 152, 219)\n    end\nend)\n```\n\n### Part C: Verification\n1. Press Play: click the on-screen button and verify instant walk speed toggling between 16 and 32.\n2. Save Place as `Lesson 3.7 - PlayerGui_v1`.",
    "hints": [
      "LocalScripts run only on the client (StarterGui, StarterPlayerScripts, Character).",
      "WalkSpeed changes on the client automatically replicate character movement.",
      "Use game.Players.LocalPlayer to access the local client player."
    ],
    "optionalChallenge": "Add a stamina meter that depletes while sprinting and recharges when walking."
  },
  quiz: {
 title: "Quiz 3.7 - LocalScript + GUI",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 3.7:",
 options: [
 "Coin DataStore",
 "LocalScript + ScreenGui/Frame/TextButton and win UI",
 "SpringConstraint",
 "Publish to the showcase",
 ],
 correctAnswer: 1,
 explanation: "Client GUI and win screen.",
 },
 {
 id: "q2",
 type: MC,
 question: "In this course LocalScript most often goes in:",
 options: [
 "Terrain",
 "StarterGui / next to GUI elements",
 "Lighting",
 "ServerStorage required for doors",
 ],
 correctAnswer: 1,
 explanation: "Client UI.",
 },
 {
 id: "q3",
 type: MC,
 question: "Script on FinishPad is needed because:",
 options: [
 "Otherwise Snap does not work",
 "The win rule is server-side world logic",
 "LocalScript is forbidden in principle",
 "Toolbox requires it",
 ],
 correctAnswer: 1,
 explanation: "World and rules on the server.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why does the server set Attribute HasWon on the player?",
 options: [
 "To delete Terrain",
 "To pass the win fact to the client without Remotes in this lesson",
 "To enable Party Mode",
 "To create a Model",
 ],
 correctAnswer: 1,
 explanation: "Server→client bridge for UI.",
 },
 {
 id: "q5",
 type: MC,
 question: "Frame in ScreenGui is:",
 options: [
 "A 3D Part in Workspace",
 "A 2D container for interface elements",
 "A Constraint type",
 "A required DataStore",
 ],
 correctAnswer: 1,
 explanation: "GUI container.",
 },
 {
 id: "q6",
 type: MC,
 question: "Click event on TextButton:",
 options: [
 "Touched",
 "MouseButton1Click",
 "MouseClick from ClickDetector",
 "GetChildren",
 ],
 correctAnswer: 1,
 explanation: "GUI button.",
 },
 {
 id: "q7",
 type: MC,
 question: "BillboardGui from 3.1 differs from ScreenGui in that:",
 options: [
 "Billboard hangs in the world near a Part, ScreenGui is a screen layer",
 "They are completely the same",
 "ScreenGui always lives in Terrain",
 "Billboard only works with DataStore",
 ],
 correctAnswer: 0,
 explanation: "Different hint spaces.",
 },
 {
 id: "q8",
 type: MC,
 question: "If WinFrame does not appear, first debug step:",
 options: [
 "Delete the whole park",
 "Check print/Attribute on finish, then Visible and Script type",
 "Enable Free Model admin",
 "Remove Anchored from everything",
 ],
 correctAnswer: 1,
 explanation: "Chain finish→fact→UI.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which of these is NOT a 3.7 topic?",
 options: [
 "TextButton",
 "StarterGui",
 "RemoteEvent shop",
 "Visible on Frame",
 ],
 correctAnswer: 2,
 explanation: "Remotes are later modules.",
 },
 {
 id: "q10",
 type: MC,
 question: "ResetOnSpawn on ScreenGui affects:",
 options: [
 "Whether GUI resets/recreates after character respawn",
 "Ocean color in Terrain",
 "SpringConstraint strength",
 "Whether Union works",
 ],
 correctAnswer: 0,
 explanation: "GUI behavior after death.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why not draw win UI with a server Script \"directly\" in this template?",
 options: [
 "Luau forbids print",
 "Personal HUD is cleaner and easier via LocalScript + a fact from the server",
 "Studio deletes Script",
 "Anchored does not work that way",
 ],
 correctAnswer: 1,
 explanation: "Role split.",
 },
 {
 id: "q12",
 type: MC,
 question: "WaitForChild(\"WinFrame\") helps when:",
 options: [
 "You need to generate Terrain",
 "The GUI element may not have appeared in the clone yet",
 "You need to turn off Lighting",
 "Hinge is required",
 ],
 correctAnswer: 1,
 explanation: "Waiting for a child.",
 },
 {
 id: "q13",
 type: MC,
 question: "Recommended Save:",
 options: [
 "Untitled",
 "Lesson 3.7 - WinUI_v1",
 "Lesson 3.1 - Coin Route",
 "Module 6 Simulator only",
 ],
 correctAnswer: 1,
 explanation: "Lesson artifact.",
 },
 {
 id: "q14",
 type: MC,
 question: "The OK button in the lesson template:",
 options: [
 "Must write DataStore",
 "Hides WinFrame (Visible false)",
 "Deletes FinishPad",
 "Creates a RemoteFunction",
 ],
 correctAnswer: 1,
 explanation: "Local panel close.",
 },
 {
 id: "q15",
 type: MC,
 question: "Next lesson 3.8 is:",
 options: [
 "New while syntax",
 "Mini-game boss hand-in: integration, balance, Badge lite, presentation",
 "Toolbox only",
 "Lighting only",
 ],
 correctAnswer: 1,
 explanation: "Module checkpoint.",
 },
 ],
 },
}

export const enLesson38 = {
 lessonId: "lesson-roblox-3-8",
 moduleId: "module-03",
 order: 8,
 title: "3.8 - Mini-game boss hand-in",
 theoryMinutes: 40,
 quizMinutes: 15,
 estimatedTime: 75,
 learningObjectives: [
 "Assemble one Place where systems from lessons 3.1-3.7 work",
 "Tune balance: kill fairness, platform rhythm, checkpoint spacing",
 "Add Badge lite (visual trophy and/or simple AwardBadge template)",
 "Prepare a ~60 second presentation with a clear script",
 "Hand in the portfolio save Module 3 - PlayableMini_v1",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission is to hand in a mini-game, not a pile of lessons",
 content: `This is the **boss checkpoint** of Module 3. Almost no new "big" language: you **integrate**, **balance**, and **show**. The instructor grades not Part count, but whether one story plays from start to win UI.

At the end you need a Place you can play as a short mini-game: interaction → risk → progress → platform rhythm → finish → win screen. Functions from 3.6 should be visible in code (at least kill or spawn). LocalScript GUI from 3.7 is the required finale.

Think about the difference: "I have seven lesson saves" vs "I have one mini-game". The course built these skills toward this integration. If at hand-in you jump between files "now I'll show kill from 3.2, and doors are in another Place", the integration rubric goes red.

**Artifact:** \`PlayableMini_v1\`
- integration of 3.1-3.7 on one route
- balance pass (not "impossible on first try" and not "boring easy")
- Badge lite: trophy in the world / on win UI + optional BadgeService template
- ~60" presentation
- Save: \`Module 3 - PlayableMini_v1\`

**Start:** \`Lesson 3.7 - WinUI_v1\` or your assembled module Place. Do not start Baseplate from zero. The boss is about stitching. Ugly but live stitching beats perfectly empty.

**Not today:** tables/ModuleScript/DataStore (**M4**), a full 10-lesson Obby product (**M5**), Remotes (**M9**), Publish Showcase as a separate release module (**M12**). You may Save to Roblox for the course portfolio. That is not a "Discover release". Do not spend an hour on an experience icon instead of checkpoint balance.

If time is short: cut level length, do not cut win UI and checkpoint death-tests. That is the module spine.`,
 },
 {
 title: "Hand-in rubric - what they check",
 content: `Grade yourself the same way the instructor does. The rubric is not bureaucracy. It is the module map on one screen:

| Criterion | "Passed" looks like | "Not yet" looks like |
|----------|----------------------|----------------------|
| 3.1 Interaction | Door/gate with Click or Prompt + Billboard | Part with no logic, "just standing" |
| 3.2 Kill | Neon is honest, debounce, Humanoid | Death from everything / death spam |
| 3.3 Checkpoints | ≥2, death-test returns closer | Always only start |
| 3.3/3.7 Timer | Visible, ticking, in a Frame | Missing or while without wait (hang) |
| 3.4 Platforms | Blink with wait, can be completed | Unreadable rhythm |
| 3.5/3.6 Track/functions | for-spawn and/or killCharacter | Only copy-paste with no function names |
| 3.7 Win UI | Finish → Attribute → Frame + button | "Win" only as print in Output |
| Balance | 1-3 deaths in a teaching run are fine | Unpassable or zero challenge |
| Badge lite | Trophy / reward is visible | Empty promise of "later" |
| Presentation | ~60" from a script | Chaotic clicks through Explorer |

You do not need a perfect AAA level. You need a **connected** teaching product for the module. One red critical item (no win, or checkpoints lie) matters more than five yellow ones (ugly Billboard color).

Give yourself a deadline: close all critical "not yet" first, then paint. The reverse is a classic boss fail.

**Do this now (5 min):** print or open the table and mark +/- against your Place.`,
 },
 {
 title: "Mini-game route map (one pass)",
 content: `Build narrative in space. The player should read the level with their feet, without your voice behind them:

1. **Start** - Spawn_Start, timer visible
2. **Gate** - InteractDoor / Prompt (3.1): "the game started on purpose"
3. **Risk** - a KillLane fragment (3.2), but not right in the face from spawn
4. **Checkpoint_A** - fairness after the first risk
5. **Rhythm** - 1-2 blink platforms (3.4)
6. **Checkpoint_B** - before the final challenge
7. **Track/platforms** - a for-spawn piece or carefully placed pads (3.5)
8. **FinishPad** - Attribute HasWon (3.7)
9. **WinFrame** - text + OK + trophy/reward

If something drops out, do not add a new mechanic from M4. Bring back the brick from the matching lesson. "I replaced checkpoints with Free Model teleports" is a bad deal: you lose exactly what the module taught.

Folder/Model \`PlayableMini_v1\` or zones \`Zone_Start\`, \`Zone_Risk\`, \`Zone_Finish\` - World craft habit: Explorer reads in 10 seconds. In the presentation you can open Explorer for a second and show zone order. That looks professional.

Watch for "narrative holes": doors after finish, checkpoint past finish, kill on spawn. The route needs a direction.

**Do this now (8 min):** walk the route silently. Where you got confused yourself is where the hand-in reviewer will get confused.`,
 },
 {
 title: "Balance - fairness beats \"hard\"",
 content: `Balance in a teaching mini-game is not eSports. It is **challenge readability**. The player should understand why they died and what to do next time.

Tune in order (not everything at once):
- **Kill:** neon color, do not disguise as floor; distance from Spawn; CanCollide/size adequate
- **Checkpoints:** after a hard section, not inside lava; death-test required
- **Blink:** visible/hidden period such that a beginner can grasp the rhythm in one observation; do not make phase offset chaotic "RNG"
- **Length:** target a 45-90 second hand-in run, not a 10-minute marathon
- **Finish:** do not hide FinishPad; Billboard "FINISH" is fine

Rule: if you rage-quit 8 times in one spot without understanding why, that is a design bug, not "hardcore". Hardcore without readability on a boss hand-in reads as unfinished work.

Write 3 balance changes in a note (for example: "blink +0.2s visible", "checkpoint closer after the third lava", "finish 2 studs higher"). In the presentation say one of them. That sounds like a developer, not a Studio tourist.

Check balance after each change with a short run. Three "improvements" without playtest often make it worse.

**Do this now (12 min):** one focused balance pass + a repeat run.`,
 },
 {
 title: "Badge lite - reward without overload",
 content: `"Badge lite" in this course = a **tangible reward for finish**, not a full Creator Dashboard guide for an hour. The module is about code that plays. The reward should be visible in the game.

**Option A (required minimum):** visual trophy
- Part/Model \`Trophy_Finish\` near the finish or ImageLabel / text in WinFrame: "Badge: M3 Finisher"
- after HasWon you can highlight the trophy (color / Transparency) with a short Script or leave it as a static win symbol
- main point: the player understands "I got a reward", even if it is not an official Roblox Badge yet

**Option B (optional template):** \`BadgeService\`
A real badge is created on the Roblox site (Creator). In code you only call with an ID:

\`\`\`lua
local BadgeService = game:GetService("BadgeService")
local BADGE_ID = 0 -- put your ID if the badge is already created

local function tryAward(player)
	if BADGE_ID == 0 then
		print("Badge lite: visual trophy / ID not set yet")
		return
	end
	local ok, err = pcall(function()
		BadgeService:AwardBadge(player.UserId, BADGE_ID)
	end)
	if not ok then
		warn("Badge:", err)
	end
end
\`\`\`

Call \`tryAward(player)\` next to setting HasWon on finish. If ID = 0, the game does not crash; the visual trophy remains. \`pcall\` here is only protection from a service error, not a full DataStore lesson from M4.

Do not spend the lesson fighting badge moderation and icons. If Dashboard glitches, hand in option A without shame. The instructor sees the trophy and WinFrame.

Avoid Free Model "badge giver" with foreign Scripts: the 2.4 audit was not cancelled for the boss.

**Do this now (8 min):** trophy + label in WinFrame; optionally tryAward with ID 0.`,
 },
 {
 title: "Code hygiene before hand-in (functions + GUI)",
 content: `A quick audit without refactoring the whole world. Goal is not a perfect code review. It is no embarrassing holes:

1. Kill: is there \`killCharacter\` (or equivalent) from 3.6? If three identical scripts, show at least one refactor.
2. Win: does finish set Attribute while LocalScript only draws?
3. No LocalScript on KillPart and no Script inside TextButton.
4. while on blink and timer has \`task.wait\`.
5. Names PascalCase / clear: FinishPad, Checkpoint_A, WinFrame.
6. No "random" Free Model Scripts from Toolbox without audit (habit from 2.4).

If time is tight: **do not** start ModuleScript. One clean Script with a function is worth more than "architecture for later growth". M4 is exactly about extracting Config. Do not steal that topic in a last-20-minute raid.

Check Output on a clean Play: any red errors before the first step? A hand-in with a startup error looks worse than a simple but clean Place.

**Do this now (7 min):** walk the 6 points and fix only the critical ones.`,
 },
 {
 title: "60-second presentation - script",
 content: `Speak by the second. Do not improvise from zero. 60" is a brevity skill that later polish/demo modules only sharpen.

| Time | What you do / say |
|-----|------------------|
| 0-10" | "This is the module 3 mini-game: from doors to win screen" + start Play |
| 10-20" | Open the door / Prompt (3.1) |
| 20-35" | Show risk + checkpoint (death or briefly explain) |
| 35-45" | Blink or a track piece |
| 45-55" | Finish → WinFrame + trophy/badge lite |
| 55-60" | One sentence about balance or a function in the code |

Forbidden holes: 20 seconds of silent digging in Explorer; "I'll quickly finish writing"; demo of a broken finish; arguing with the phone timer "just one more minute".

Rehearse **twice** before hand-in. The second time is almost always shorter and clearer. If the first rehearsal hit 2 minutes, cut the route or the words, not speaking speed into gibberish.

Useful trick: a partner holds a timer and raises a hand at 50". You still have time for the final line instead of cutting off mid-sentence.

**Do this now (6 min):** one full rehearsal with a phone timer.`,
 },
 {
 title: "Playtest with a partner (required ritual)",
 content: `You already know where to jump. A partner does not. That is why peer-playtest catches holes better than another automatic run of your own.

Hand over the controller / watch from the side and stay quiet for the first 40 seconds:
- where is the first death?
- are the doors clear without your hint?
- is the finish visible?
- does win UI look like a random Frame in the middle of nowhere?
- does the timer block the jump view?

Write down **one** change after the partner and apply it. That is iteration, a skill M5/M11 only deepen. Ten verbal tips with zero applied change = zero.

If there is no partner, record a short video for yourself and watch without clicking in Studio: does the route read from outside? Or ask someone online to just watch the recording.

Do not defend the design with "you have to get used to it". On a teaching-module boss hand-in, player habit does not exist yet. There is only first impression.

**Do this now (10 min):** test with another person or a "cold" review.`,
 },
 {
 title: "Portfolio Save and what to say about the next module",
 content: `**Save to Roblox:** \`Module 3 - PlayableMini_v1\`
Separately, \`Lesson 3.7 - WinUI_v1\` may remain as an intermediate save, but for the module hand-in you show the integrated Place. A name with "Module 3" helps you find the boss a month later, not another experiment.

In a 3-line note:
1. what you can already do (interaction, Touched, loops, functions, GUI)
2. what limped in balance
3. what you deliberately did NOT do (DataStore, Remotes), so you do not promise extras

**M4** will add tables, ModuleScript, and DataStore. Then progress and prices become data. Today's finish with Attribute is the right foundation, not an "extra hack". When save appears in M4, you will already understand the world/UI split from M3.

Do not publish the Place to Discover "because it feels ready". The course release module is separate. Now it is a portfolio save and a live demo hand-in.

**Do this now (4 min):** Save + three lines of notes.`,
 },
 {
 title: "Final checklist before the instructor",
 content: `- [ ] Route 3.1-3.7 assembled in one Place
- [ ] Checkpoint death-test passed today (not "it probably worked last week")
- [ ] Blink does not hang Studio (has wait)
- [ ] Finish opens WinFrame
- [ ] Badge lite is visible (trophy and/or reward text)
- [ ] At least one clear function in world code
- [ ] Output has no red errors at Play start
- [ ] ~60" rehearsal exists
- [ ] Save: \`Module 3 - PlayableMini_v1\`

If an item is red, fix it. Do not add a decorative Toolbox fountain. A fountain does not cover a missing checkpoint.

Put the rubric next to the checklist: they should match. If the rubric says "win UI" and the checklist only says "FinishPad exists", add showing the frame.

Last 3 minutes before the instructor: deep breath, Play open, cursor not in Explorer, 60" script in your head.`,
 },
 {
 title: "Practice A - Together (12 min)",
 content: `1. Rubric check +/- on the Place (out loud, not silently).
2. Finish any missing system (most often: second checkpoint, or win UI, or doors "forgot to move").
3. Place Trophy / reward text in WinFrame.
4. One full start→finish pass without leaving Play.

If working in a pair: one plays, the other holds the rubric and marks. Then swap.

**Criterion:** one continuous Play without "I'll switch to another lesson file now".`,
 },
 {
 title: "Practice B - Solo (15 min)",
 content: `1. Balance pass (exactly 3 concrete changes - write them down).
2. Code hygiene (functions / Script types / while+wait).
3. Rehearse the 60" presentation twice.
4. Short peer or "cold" recording review.
5. Save \`Module 3 - PlayableMini_v1\`.

Do not start a new mechanic at minute 14. If everything critical is green, polish WinFrame text and FinishPad brightness.

**Criterion:** you can name 6 module systems out loud while showing them in-game, and fit the demo in one minute.`,
 },
 {
 title: "Practice C - Challenge (8 min)",
 content: `Pick one:
- tryAward with a real BADGE_ID (if you already created a badge);
- short "next step hint" TextLabel that appears only until the first checkpoint;
- peer-review: write 3 strengths / 1 balance risk for someone else's Place.

**Do not:** DataStore record tables, Remote shop, full rewrite into ModuleScript "because M4 is close".`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Shows separate lessons as files instead of one Place",
 fix: "Boss means integration. Stitch the systems into PlayableMini_v1.",
 },
 {
 mistake: "Finish is only print, no WinFrame",
 fix: "Go back to the 3.7 template: Attribute + LocalScript.",
 },
 {
 mistake: "Unpassable balance \"I meant it that way\"",
 fix: "Tune rhythm and checkpoints; fairness beats hardcore.",
 },
 {
 mistake: "3-minute chaos presentation in Explorer",
 fix: "60s scenario: play → systems → finish.",
 },
 {
 mistake: "BadgeService without pcall and with a junk ID floods Output",
 fix: "Variant A trophy is required; AwardBadge only with a valid ID inside pcall.",
 },
 {
 mistake: "Silent while without wait after polish",
 fix: "Check blink and the timer before handoff.",
 },
 {
 mistake: "Drags DataStore/Remotes into the M3 boss",
 fix: "Leave that for M4/M9. Today integrate what you already learned.",
 },
 ],
   summary: "You completed Module 3 by building the integrated PlayableArena_v1 mini-game, combining ProximityPrompt doors, debounce hazards, spawner loops, helper functions, and client HUD.",
  practiceTask: {
    "title": "Module 3 Final Project: Playable Arena (PlayableArena_v1)",
    "difficulty": "intermediate",
    "description": "**Objective:** Integrate all Module 3 systems into a complete obstacle mini-game arena.\n\n### Part A: Arena Architecture\n1. Assemble a walled arena with an `InteractDoor` (3.1) entrance.\n2. Place a `KillLane` (3.2) hazard zone across the middle floor.\n3. Add a high-altitude `HazardSpawner` (3.4) dropping timed obstacle cubes.\n\n### Part B: Logic & HUD Integration\n1. Wire damage/healing helper functions (3.6) into arena pads.\n2. Add the sprint toggle button (3.7) and coin counter (3.3) to `StarterGui`.\n3. Unlock the exit gate when the player collects 3 coin bonuses.\n\n### Part C: Full Playtest\n1. Test the full course: open door → sprint past falling hazards → jump over lava → collect 3 coins → reach exit.\n2. Confirm clean Output logs on character resets.\n3. Save Place as `Lesson 3.8 - PlayableArena_v1`.",
    "hints": [
      "Check Anchored = true on all static walls and platforms.",
      "Ensure every damage/collection trigger uses debounce.",
      "Verify the HUD continues functioning after character respawns."
    ],
    "optionalChallenge": "Add a 45-second countdown timer: if time expires before reaching the exit, lock the arena."
  },
  quiz: {
 title: "Quiz 3.8 - Mini-game boss hand-in",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 3.8:",
 options: [
 "Learn RemoteFunction",
 "Integrate 3.1-3.7, balance, Badge lite, ~60\" presentation",
 "Terrain Paint only",
 "Publish a paid gamepass",
 ],
 correctAnswer: 1,
 explanation: "Module boss checkpoint.",
 },
 {
 id: "q2",
 type: MC,
 question: "Why does one Place matter more than seven separate lesson saves?",
 options: [
 "Because otherwise Studio deletes Parts",
 "Because hand-in is a playable mini-game, not an archive of fragments",
 "Because Lighting requires it",
 "Because LocalScript does not work otherwise",
 ],
 correctAnswer: 1,
 explanation: "Product integration.",
 },
 {
 id: "q3",
 type: MC,
 question: "Minimum checkpoints for a fair hand-in:",
 options: [
 "0",
 "≥2 with a death-test",
 "20 required",
 "Only Spawn without RespawnLocation",
 ],
 correctAnswer: 1,
 explanation: "Progress after death.",
 },
 {
 id: "q4",
 type: MC,
 question: "Badge lite in this lesson means:",
 options: [
 "A required Remotes shop",
 "A visible reward (trophy/UI) and optionally AwardBadge",
 "Deleting WinFrame",
 "Only a Toolbox Free Model",
 ],
 correctAnswer: 1,
 explanation: "A light reward for finish.",
 },
 {
 id: "q5",
 type: MC,
 question: "If BADGE_ID = 0 in the template:",
 options: [
 "Place must crash",
 "The game continues; visual trophy / print remains",
 "Terrain is deleted",
 "Anchored turns off",
 ],
 correctAnswer: 1,
 explanation: "Safe lite mode.",
 },
 {
 id: "q6",
 type: MC,
 question: "The presentation roughly lasts:",
 options: [
 "5 seconds",
 "~60 seconds from a script",
 "30 minutes of code out loud",
 "No limit",
 ],
 correctAnswer: 1,
 explanation: "Short demo.",
 },
 {
 id: "q7",
 type: MC,
 question: "Teaching mini-game balance is first about:",
 options: [
 "Maximum player pain",
 "Challenge readability and honest hazards",
 "Free Model count",
 "RemoteEvent count",
 ],
 correctAnswer: 1,
 explanation: "Honest design.",
 },
 {
 id: "q8",
 type: MC,
 question: "What is deliberately NOT an M3 boss topic?",
 options: [
 "Win UI",
 "DataStore save tables",
 "Kill debounce",
 "Blink with wait",
 ],
 correctAnswer: 1,
 explanation: "DataStore - M4.",
 },
 {
 id: "q9",
 type: MC,
 question: "Recommended module Save:",
 options: [
 "Untitled",
 "Module 3 - PlayableMini_v1",
 "Lesson 1.1 only",
 "Module 9 Remotes",
 ],
 correctAnswer: 1,
 explanation: "M3 portfolio.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why peer-playtest before hand-in?",
 options: [
 "To delete Script",
 "To see unclear spots through another person's eyes",
 "To enable Atmosphere",
 "To get DataStore",
 ],
 correctAnswer: 1,
 explanation: "Iteration via feedback.",
 },
 {
 id: "q11",
 type: MC,
 question: "Functions on the boss hand-in:",
 options: [
 "Forbidden",
 "Worth showing at least in kill/spawn - hygiene from 3.6",
 "A required ModuleScript",
 "Only in button LocalScripts",
 ],
 correctAnswer: 1,
 explanation: "Module refactor is visible.",
 },
 {
 id: "q12",
 type: MC,
 question: "If while without wait remains in blink:",
 options: [
 "That is fine for hand-in",
 "Studio/Play may hang - fix before the demo",
 "That enables Badge",
 "That replaces finish",
 ],
 correctAnswer: 1,
 explanation: "Loop safety.",
 },
 {
 id: "q13",
 type: MC,
 question: "The mini-game route logically ends with:",
 options: [
 "Deleting Spawn",
 "FinishPad + WinFrame",
 "Toolbox only",
 "Lighting night only",
 ],
 correctAnswer: 1,
 explanation: "Finale from 3.7.",
 },
 {
 id: "q14",
 type: MC,
 question: "After M3 the course's logical next focus is:",
 options: [
 "M4 - tables, ModuleScript, DataStore",
 "Straight to M12 Publish without data",
 "Only a 1.1 redo",
 "Constraints only",
 ],
 correctAnswer: 0,
 explanation: "Spiral toward data.",
 },
 {
 id: "q15",
 type: MC,
 question: "Best way to \"use\" time before hand-in:",
 options: [
 "Add 10 new mechanics from future modules",
 "Close red rubric items and rehearse 60\"",
 "Delete all Scripts",
 "Replace everything with one Free Model",
 ],
 correctAnswer: 1,
 explanation: "Integration and demo.",
 },
 ],
 },
}
