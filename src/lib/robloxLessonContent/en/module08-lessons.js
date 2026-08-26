/** Roblox Module 08 EN - 8 уроків (prod-92), Arena */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson81 = {
 lessonId: "lesson-roblox-8-1",
 moduleId: "module-08",
 order: 1,
 title: "8.1 - Humanoid Health",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Build a simple arena with a floor, barriers, and a spawn",
 "Set the player's Humanoid.MaxHealth and Health for combat",
 "Place a test dummy with a Humanoid for future damage",
 "Show/check HP (bar or print) before the Tool appears",
 "Save the Place as the Arena module base"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 57 of 92)",
 content: `Module 8 - **Arena**. Today you do not swing a sword or write dealDamage. Today you build the **battlefield** and learn **Humanoid Health**.
Without an arena, Tools and waves hang in empty space. Without Health, combat has no life bar.

**Do now (2 min):** sketch a square arena in pencil and mark where spawn will sit - not in the center of future enemies.`,
 },
 {
 title: "Humanoid Health in plain words",
 content: `| Property | Meaning |
|-------------|--------|
| **MaxHealth** | Life ceiling |
| **Health** | Current life (0 = death) |
| **Humanoid** | Character / NPC component |

MaxHealth is the **full tank**. Health is **how much is left**. In 8.5, Health=0 will fire Died; today you only set values and observe.

By default the player often has 100. You can change it for your arena genre - but write the number down: tomorrow balance (8.7) will tune exactly that.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Arena build (no oval required)",
 content: `Minimum:
1. Part \`Floor\` - large floor (Anchored).
2. 4 walls / barriers \`Wall\` - CanCollide true so you do not fall out.
3. Part \`Entrance\` or a gap with an "Arena" sign.
4. Optional: different floor color inside vs lobby.

Size: not a stadium. About 40x40 studs is enough for training combat.

Folders:

\`Workspace\`
\` └── Arena\`
\` ├── Floor\`
\` ├── Walls\`
\` ├── Spawn\`
\` └── Dummies\`

**Do now (12 min):** enclosed space; the player does not fall into the void after 10 s of running.

Check corners: wall joints without 1-2 stud gaps. A bright Material on Entrance helps a newcomer see "enter combat here" instead of wandering the lobby.`,
 },
 {
 title: "SpawnLocation and a safe start",
 content: `Place \`SpawnLocation\` **near the entrance**, not in the arena center (dummy/waves will occupy the center).

Properties:
- Duration / ForceField (basic spawn protection - familiar from other modules).
- Neutral / Team - usually simple for a solo arena.

Check Play: you spawn feet on the floor, camera not inside a wall.

Later 8.5 adds custom i-frames - today a smart Spawn is enough.

**Do now (4 min):** run one check from this section in Play and write the result in your Note.`,
 },
 {
 title: "Set MaxHealth for the player on the server",
 content: `Script in ServerScriptService:

\`local START_HP = 100\`

\`local function setupHealth(character)\`
\` local hum = character:WaitForChild("Humanoid")\`
\` hum.MaxHealth = START_HP\`
\` hum.Health = START_HP\`
\`end\`

\`Players.PlayerAdded:Connect(function(player)\`
\` player.CharacterAdded:Connect(setupHealth)\`
\` if player.Character then setupHealth(player.Character) end\`
\`end)\`

Why server: MaxHealth is a world rule. A client can bump its own HP with cheats - so the habit "server sets the ceiling" starts here.

Print to verify: \`print(hum.MaxHealth, hum.Health)\`.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Dummy - a target with Humanoid",
 content: `Build a simple model:
- Part/Model \`Dummy\`
- Humanoid
- HumanoidRootPart (or an R15/R6 rig from Toolbox **as a school template**, without extra AI)

Set:

\`dummyHum.MaxHealth = 80\`
\`dummyHum.Health = 80\`

Anchored dummy at start is fine (it stands as a target). In waves (8.6) you will unanchor/replace with movers.

Optional Billboard "HP test" above the head - helps a mentor.

Do not hang a full AI chase today - that bloats the lesson. Target + Health is enough.

If you take a rig from Toolbox - remove foreign AI Scripts; keep Humanoid and looks. Otherwise the dummy starts "living its own life" and breaks a clean HP test.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "How to see HP",
 content: `| Method | Plus |
|--------|------|
| Default Health bar above Character | Already there |
| print on the server | Exact numbers |
| IntValue / Attribute \`HP\` | For UI later |
| SurfaceGui on dummy | Training target |

For hand-in: default bar + one print after setup is enough.

Do not spend an hour on an AAA HUD. In 8.4-8.8 other priorities appear (damage, fx, waves).

**Do now (4 min):** run one check from this section in Play and write the result in your Note.`,
 },
 {
 title: "Test: change Health on purpose",
 content: `Temporary server test (button / command / delay):

\`hum.Health = hum.Health - 10\`

Expect: the bar drops. Then restore full HP for a clean base:

\`hum.Health = hum.MaxHealth\`

Or kill the dummy as a test:

\`dummyHum.Health = 0\` - you will see the model die; for the player not required yet (deeper in 8.5).

Exercise goal: **you control the numbers**, not random magic drops.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Module 8 Place organization",
 content: `Names:
- Save: \`Lesson 8.1 - Arena Health\`
- Root \`Arena\` in Workspace
- Scripts: \`HealthSetup\` in SSS

Do not mix in an old NPC quest / shop from another Place unless needed. A clean arena means faster debug in 8.3-8.8.

What NOT to do today:
- Tool and animation (8.2)
- dealDamage (8.3)
- waves (8.6)

What IS OK: a "Combat soon" sign, wall color, one light.

If you pull an old Place - Save As under a new name. Otherwise you risk breaking the shop/obby while tuning MaxHealth.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Player Health vs dummy Health - two bars",
 content: `| Who | Why MaxHealth today | What comes next |
|-----|---------------------------|--------------|
| Player | Base combat "tank" | 8.5 death, 8.7 balance |
| Dummy | Target for hits | 8.3 dealDamage, 8.6 waves |

Do not set player MaxHealth = 1 "for fun" - you will break every later playtest.  
Do not set dummy MaxHealth = 10000 - tomorrow TTK will be forever.

Module start guide: player 100, dummy 60-100. Exact numbers get tuned in 8.7; today a **deliberate** setup matters, not a random default "somehow there".

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Arena base playtest",
 content: `| # | Action | Expect |
|---|-----|------------|
| 1 | Play | Spawn near entrance |
| 2 | Run on the floor | You do not fall into the void |
| 3 | Output print HP | MaxHealth/Health as planned |
| 4 | Dummy in place | Humanoid with HP |
| 5 | Test -10 HP | Bar reacts |
| 6 | Explorer | Arena folder is readable |
| 7 | Stop/Play | Everything in place, Anchored on purpose |

If row 2 is red - fix walls first, not the dummy.  
If row 3 is red - script not on CharacterAdded or WaitForChild did not find Humanoid.  
If row 5 does not change the bar - check whether the test is on the server (client properties in Studio can confuse while learning).

**Do now (5 min):** run the test table once and write pass/fail for each row.`,
 },
 {
 title: "Lesson 57 hand-in checklist",
 content: `- [ ] Arena: floor + barriers
- [ ] SpawnLocation in a safe zone
- [ ] Server setup of player MaxHealth/Health
- [ ] Dummy with Humanoid and HP
- [ ] Bar / print check
- [ ] Clean folder names
- [ ] Save: Lesson 8.1 - Arena Health

Next **8.2** puts a Tool in your hands. **8.3** teaches dealDamage. Today's artifact is **field + life**.

Module map ahead: Health → sword → damage judge → fx → respawn → waves → balance → Ship. Every later lesson assumes the arena already stands.

Without Health, swinging a sword has no point. Without an arena, waves have no point. Start the module with ground under your feet. If a mentor walks the arena without void and sees the HP bar + dummy - the base is ready for the sword. Leave the Place saved before closing Studio.

**Do now (3 min):** walk the checklist and tick only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Spawn in the center of the future fight zone",
 explanation: "Later: death loop and angry playtest.",
 correctApproach: "Spawn near entrance / lobby",
 },
 {
 mistake: "No barriers - falling into the void",
 explanation: "An hour of \"where am I?\" instead of Health.",
 correctApproach: "Walls CanCollide",
 },
 {
 mistake: "MaxHealth only on the client",
 explanation: "Cheat habit; desync.",
 correctApproach: "Server setup on CharacterAdded",
 },
 {
 mistake: "Dummy without Humanoid",
 explanation: "No HP for 8.3 tests.",
 correctApproach: "Humanoid + MaxHealth/Health",
 },
 {
 mistake: "An hour on HUD instead of the arena",
 explanation: "No build artifact.",
 correctApproach: "Default bar + print",
 },
 {
 mistake: "Mix an old quest Place without cleanup",
 explanation: "Explorer chaos; mentor gets lost.",
 correctApproach: "Clean Arena Place",
 }
 ],
 summary: "You built the Arena base: enclosed space, safe spawn, server MaxHealth/Health, and a dummy target. The combat module starts with field and life bar - next come Tool and dealDamage.",
 practiceTask: {
 title: "Battlefield (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** arena with player HP and a dummy.

### Part A - Build (12 min)
1. Floor + Walls in the Arena folder.
2. SpawnLocation near the entrance.
3. Confirm you do not fall into the void.

### Part B - Health (10 min)
1. Server setup MaxHealth/Health.
2. Dummy with Humanoid and HP.
3. print or bar to verify.

### Part C - Test (8 min)
1. -10 HP test and restore.
2. Explorer clean.
3. **Save:** Lesson 8.1 - Arena Health`,
 hints: [
 "Box arena first, then HP numbers",
 "Anchored on walls and floor",
 "Dummy can start as 1 Part + Humanoid"
 ],
 optionalChallenge: "BillboardGui above dummy with TextLabel Health (update from server on change - lite).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 8.1?",
 options: [
          "Build the arena and set up Humanoid Health",
          "Write a full shop Remote",
          "Make 10 waves at once",
          "Publish a Race track"
        ],
 correctAnswer: 0,
 explanation: "Arena base.",
 },
 {
 id: "q2",
 type: MC,
 question: "What is MaxHealth?",
 options: [
          "Tool name",
          "Maximum / ceiling of Humanoid life",
          "Terrain type",
          "RemoteEvent count"
        ],
 correctAnswer: 1,
 explanation: "HP ceiling.",
 },
 {
 id: "q3",
 type: MC,
 question: "Where should arena Spawn go?",
 options: [
          "Must be in the void",
          "Only in ServerStorage",
          "Near the entrance, not in the fight center",
          "Inside a Wall with no gap"
        ],
 correctAnswer: 2,
 explanation: "Safe start.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why set MaxHealth on the server?",
 options: [
          "Server cannot use Humanoid",
          "MaxHealth exists only in LocalScript",
          "Otherwise Floor disappears",
          "It is a world rule; we do not trust the client with the HP ceiling"
        ],
 correctAnswer: 3,
 explanation: "Server habit.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why a dummy with Humanoid already in 8.1?",
 options: [
          "Dummy permanently replaces the player",
          "So later lessons have something to test damage on",
          "Without a dummy there is no SpawnLocation",
          "Humanoid is only for Sky"
        ],
 correctAnswer: 1,
 explanation: "Target.",
 },
 {
 id: "q6",
 type: MC,
 question: "What is NOT required today?",
 options: [
          "Arena floor",
          "Barriers",
          "Full dealDamage and waves",
          "Setup Health"
        ],
 correctAnswer: 2,
 explanation: "Those are later lessons.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why barriers?",
 options: [
          "So you do not fall into the void during combat/tests",
          "They create Animation",
          "Barriers = RemoteEvent",
          "Without them MaxHealth = 0"
        ],
 correctAnswer: 0,
 explanation: "Keep you on the field.",
 },
 {
 id: "q8",
 type: MC,
 question: "When to call setupHealth?",
 options: [
          "Only once in the game lifetime with no respawn",
          "Only in Lighting",
          "After Publish, always manually",
          "On CharacterAdded (and if Character already exists)"
        ],
 correctAnswer: 3,
 explanation: "Every Character.",
 },
 {
 id: "q9",
 type: MC,
 question: "How to quickly check that Health changes?",
 options: [
          "Only rename Floor",
          "Delete Humanoid",
          "Server test Health = Health - 10 and watch the bar",
          "Turn Output off forever"
        ],
 correctAnswer: 2,
 explanation: "Deliberate test.",
 },
 {
 id: "q10",
 type: MC,
 question: "Which Explorer structure is convenient?",
 options: [
          "Everything unnamed Part1...Part99 at root",
          "Workspace.Arena with Floor, Walls, Spawn, Dummies",
          "Only SoundService",
          "Everything in Terrain water"
        ],
 correctAnswer: 1,
 explanation: "Readable build.",
 },
 {
 id: "q11",
 type: MC,
 question: "How does 8.1 prepare 8.2-8.3?",
 options: [
          "Health cancels Tool",
          "Arena forbids Humanoid",
          "Must delete dummy before the sword",
          "Field and HP exist - next Tool and server damage"
        ],
 correctAnswer: 3,
 explanation: "Module foundation.",
 },
 {
 id: "q12",
 type: MC,
 question: "What does Health = 0 mean for Humanoid?",
 options: [
          "Death (Died) - you will cover it deeper in 8.5",
          "Required MaxHealth increase",
          "Creating a Tool",
          "Disabling Workspace"
        ],
 correctAnswer: 0,
 explanation: "Zero = death.",
 },
 {
 id: "q13",
 type: MC,
 question: "Why not build an AAA HUD for an hour in 8.1?",
 options: [
          "HUD is forbidden in Roblox",
          "Without HUD Humanoid does not work",
          "Arena and HP numbers matter more; the default bar is enough",
          "Print is illegal"
        ],
 correctAnswer: 2,
 explanation: "Build priority.",
 },
 {
 id: "q14",
 type: MC,
 question: "Anchored on Floor/Walls is needed so…",
 options: [
          "Increase damage",
          "Create AnimationId",
          "Delete Spawn",
          "Arena geometry does not fall from physics"
        ],
 correctAnswer: 3,
 explanation: "Static scene.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 8.1 hand-in artifact?",
 options: [
          "Theory only",
          "Arena + Spawn + Health setup + dummy + Save",
          "Empty Baseplate",
          "Tool with client Health=0"
        ],
 correctAnswer: 1,
 explanation: "Arena base required.",
 }
 ],
 },
}

export const enLesson82 = {
 lessonId: "lesson-roblox-8-2",
 moduleId: "module-08",
 order: 2,
 title: "8.2 - Tool + Animation",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Build a Tool with Handle and a clear Grip",
 "Weld the blade/mesh to Handle (Weld/WeldConstraint)",
 "Play a swing animation from LocalScript on Activated",
 "Prepare the Tool for server damage in 8.3 (equip, Touched zone)",
 "Put the Tool in StarterPack so it returns after respawn"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 58 of 92)",
 content: `In **8.1** you have an arena and Health. Today you give the player a **weapon in hand**: Tool + swing animation. Damage does not need to be fair yet - that is 8.3. Today - **feel the sword**.
Without a Tool, tomorrow's dealDamage has nothing to attach to. Without animation, combat looks like an "invisible hand".

**Do now (2 min):** pick a shape - simple Part blade or Mesh. For hand-in, Part is enough.`,
 },
 {
 title: "What is a Tool in Roblox",
 content: `| Element | Role |
|---------|------|
| **Tool** | Object in Backpack / hand |
| **Handle** | Required Part - what you hold |
| **Activated** | "Used the tool" event |
| **Equipped / Unequipped** | Picked up / put away |

Tool is an **item in the hotbar**. Handle is the **grip**. Without Handle, Tool often does not equip properly.

Names:
- Tool.Name = \`ArenaSword\` (visible in inventory)
- Inside, a Part named exactly **\`Handle\`** is required

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Building Handle and blade",
 content: `1. Insert → Tool in StarterPack (or keep in ServerStorage and clone - StarterPack is simpler to start).
2. Add a Part named \`Handle\` - size about 1x1x3.
3. Add Part \`Blade\` (longer, thinner).
4. Align Blade relative to Handle.
5. \`WeldConstraint\` between Handle and Blade (or Weld).
6. CanCollide on the blade is often false at first (less shoving); for Touched damage tomorrow you can add a separate hitbox.

**Grip** (Tool properties): tune GripPos / GripForward so the sword does not stick out sideways from the hand. That is 5-10 min of Play tuning - normal.

**Do now (10 min):** equip the Tool, sword visible in hand, model does not fall apart.`,
 },
 {
 title: "Weld - why the blade flies off otherwise",
 content: `| Symptom | Fix |
|---------|------|
| Blade falls separately | No Weld to Handle |
| Everything Anchored in hand | Clear Anchored on Tool Parts |
| Blade in the floor | Grip / Handle orientation |
| Double sword | Two Tools in StarterPack |

Rule: on an equipped Tool, physics is held by the assembly + character. Do not leave Anchored=true on Handle "for convenience" forever - in hand it will look broken.

If you use MeshPart - same Weld to Handle.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Swing animation: where to get it",
 content: `School options:
1. **Your own** animation in Animation Editor (R15) - export, AnimationId.
2. **Training ID** from mentor / course template (if a list exists).
3. **Lite without custom animation:** briefly rotate Tool.Grip or tween the blade - worse, but better than nothing; still plan for AnimationId.

Working path:
- Create an Animation object (or use \`Instance.new("Animation")\`).
- \`Animation.AnimationId = "rbxassetid://..."\`
- On Character: \`Humanoid.Animator:LoadAnimation(anim)\`
- \`track:Play()\`

Check R6 vs R15: the animation must match the avatar rig in Game Settings.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "LocalScript in the Tool",
 content: `Under Tool add **LocalScript** \`SwingClient\`:

\`local tool = script.Parent\`
\`local anim = Instance.new("Animation")\`
\`anim.AnimationId = "rbxassetid://YOUR_ID"\`

\`local track\`
\`tool.Equipped:Connect(function()\`
\` local char = tool.Parent\`
\` local hum = char:WaitForChild("Humanoid")\`
\` local animator = hum:FindFirstChildOfClass("Animator") or Instance.new("Animator", hum)\`
\` track = animator:LoadAnimation(anim)\`
\`end)\`

\`tool.Activated:Connect(function()\`
\` if track then track:Play() end\`
\`end)\`

Why LocalScript: character animation conveniently starts on the owner's client. Damage tomorrow - **separately on the server**.

Do not put TakeDamage in this LocalScript as final truth.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Activated, animation debounce",
 content: `Click spam = broken mash of animations.

\`local swinging = false\`
\`tool.Activated:Connect(function()\`
\` if swinging then return end\`
\` swinging = true\`
\` track:Play()\`
\` task.delay(0.5, function() swinging = false end)\`
\`end)\`

Align 0.5 s with clip length. In 8.3 server HIT_COOLDOWN can be similar - then "swing = hit" feel matches.

Tool.RequiresHandle = true usually. Tool.CanBeDropped - decide: for arena often false so the sword is not thrown into the void.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Preparing hitbox for 8.3",
 content: `Today you can:
- leave Handle.Touched for later;
- or add an invisible Part \`Hitbox\` with Weld, CanCollide false, slightly larger than the blade.

Do not implement full dealDamage today if time is short - but keep **names ready**:
- Tool \`ArenaSword\`
- Handle
- (optional) Hitbox

In your note: "tomorrow the server listens to Touched / Remote from this Tool".

**Do now (5 min):** Explorer structure is clean; mentor finds the Tool in 5 s.`,
 },
 {
 title: "StarterPack and respawn",
 content: `StarterPack clones the Tool into each player's Backpack at start / often after respawn.

Check:
1. Play → sword in hotbar.
2. (If you already can) death/reset → Tool returns.

If Tool is only in Workspace - the player will not get it automatically.

ServerStorage template + grant script - alternative for later modules; today StarterPack is the fastest path.

After 8.5 (death/respawn) StarterPack usually returns the sword without extra code. If you put Tool in Backpack by script once only - after death you may "lose" the weapon and be surprised at Ship.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Playtest Tool",
 content: `| # | Action | Expect |
|---|-----|------------|
| 1 | Play | ArenaSword in inventory |
| 2 | Equip | Sword in hand, Weld intact |
| 3 | Activated | Swing animation (or lite motion) |
| 4 | Click spam | Debounce holds |
| 5 | Unequip / Equip again | Track does not crash |
| 6 | Output | No Animator/AnimationId errors |

If animation does not play: check AnimationId, R15/R6, whether Animator exists, whether Equipped finished Load.  
If sword not in inventory: Tool not in StarterPack or RequiresHandle without Handle.  
If blade in floor: Grip + model Pivot, do not write a new LocalScript first.

**Do now (5 min):** run the test table once and write pass/fail for each row.`,
 },
 {
 title: "Typical assembly gaps",
 content: `| Symptom | Cause | Fix |
|---------|---------|------|
| "Tool requires a Handle" | No Handle Part | Name it exactly Handle |
| Sword in teeth / feet | Grip | Tune Grip in Play |
| Wrong-rig animation | R6 anim on R15 | Other ID / rig |
| Script on server plays anim poorly | Wrong context | LocalScript in Tool |
| Two swords | Duplicate in StarterPack | Keep one |

Do not spend an hour on a perfect skin. **Equips + swing exists** - done for 8.2.

Link to 8.3: when the swing is already stable, server damage will "sit" on the same debounce rhythm. If animation spam today - Touched spam tomorrow will be worse.

**Do now (3 min):** find one symptom from the table in the Place and fix it or confirm it is gone.`,
 },
 {
 title: "Lesson 58 hand-in checklist",
 content: `- [ ] Tool ArenaSword with Handle
- [ ] Blade on Weld
- [ ] Grip acceptable in hand
- [ ] LocalScript: Activated → Play animation (or honest lite)
- [ ] Swing debounce
- [ ] StarterPack
- [ ] Playtest 1-3 green
- [ ] Save: Lesson 8.2 - Arena Tool

Next **8.3** will hang dealDamage on this Tool. Do not write Health=0 in today's LocalScript "to go faster" - you break the Never trust client habit.

**Do now (3 min):** walk the checklist and tick only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Part not named Handle",
 explanation: "Tool does not equip correctly.",
 correctApproach: "Exact name Handle",
 },
 {
 mistake: "Health damage in Tool LocalScript",
 explanation: "Bypasses server; bad for 8.3.",
 correctApproach: "Today animation only; damage tomorrow on the server",
 },
 {
 mistake: "No Weld - blade separate",
 explanation: "Model falls apart.",
 correctApproach: "WeldConstraint to Handle",
 },
 {
 mistake: "Animation without debounce",
 explanation: "Track mush.",
 correctApproach: "swinging flag + delay",
 },
 {
 mistake: "Tool only in Workspace",
 explanation: "Player does not get the weapon.",
 correctApproach: "StarterPack",
 },
 {
 mistake: "Wrong rig AnimationId",
 explanation: "Quiet \"nothing plays\".",
 correctApproach: "Align R15/R6 with the game",
 }
 ],
 summary: "You built ArenaSword: Handle, blade Weld, LocalScript animation on Activated, and StarterPack. The sword is ready for server dealDamage in 8.3 - without client Health=0.",
 practiceTask: {
 title: "Arena sword (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** equip a Tool and see a swing.

### Part A - Model (12 min)
1. Tool in StarterPack with Handle.
2. Blade + WeldConstraint.
3. Tune Grip in Play.

### Part B - Animation (12 min)
1. LocalScript SwingClient.
2. LoadAnimation on Equipped.
3. Activated + debounce 0.4-0.6 s.

### Part C - Check (6 min)
1. Playtest table 1-4.
2. Name structure clean.
3. **Save:** Lesson 8.2 - Arena Tool`,
 hints: [
 "Sword in hand without animation first - then ID",
 "print('activated') if unsure clicks arrive",
 "CanBeDropped = false is handy for the arena"
 ],
 optionalChallenge: "Short \"whoosh\" Sound on Activated (one Sound in Tool, Play).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 8.2?",
 options: [
          "Build a Tool with Handle and swing animation",
          "Write a full anti-cheat shop",
          "Delete the arena",
          "Make only waveConfig"
        ],
 correctAnswer: 0,
 explanation: "Tool + animation.",
 },
 {
 id: "q2",
 type: MC,
 question: "What must the grip Part in a Tool be named?",
 options: [
          "SwordTipOnly",
          "Handle",
          "Humanoid",
          "SpawnLocation"
        ],
 correctAnswer: 1,
 explanation: "Required name.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why Weld between Handle and Blade?",
 options: [
          "To disable animation",
          "It creates a RemoteEvent",
          "So the blade does not fly off the grip",
          "Weld replaces StarterPack"
        ],
 correctAnswer: 2,
 explanation: "Model link.",
 },
 {
 id: "q4",
 type: MC,
 question: "Where to keep the swing animation script?",
 options: [
          "Only in Terrain",
          "In Lighting as the only option",
          "In SoundService without Tool",
          "LocalScript in the Tool"
        ],
 correctAnswer: 3,
 explanation: "Client swing.",
 },
 {
 id: "q5",
 type: MC,
 question: "Which Tool event fires the click swing?",
 options: [
          "Sky Touched",
          "Activated",
          "PlayerRemoving",
          "BindToClose"
        ],
 correctAnswer: 1,
 explanation: "Activated.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why StarterPack?",
 options: [
          "Delete Humanoid",
          "Create waves",
          "Automatically give the Tool to the player",
          "Replace MaxHealth"
        ],
 correctAnswer: 2,
 explanation: "Weapon grant.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why not set Health=0 in Tool LocalScript today?",
 options: [
          "Damage belongs on the server in 8.3; client is not the judge",
          "Health does not exist",
          "Tool then will not equip",
          "Animation forbids numbers"
        ],
 correctAnswer: 0,
 explanation: "Never trust client.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why debounce on Activated?",
 options: [
          "Increase MaxHealth",
          "Disable Weld",
          "Create Arena",
          "Do not spam swing animation"
        ],
 correctAnswer: 3,
 explanation: "Clean swing.",
 },
 {
 id: "q9",
 type: MC,
 question: "What to tune if the sword sticks out of the hand wrong?",
 options: [
          "Only Skybox",
          "Module 1 name",
          "Tool Grip (position/orientation)",
          "Delete Handle"
        ],
 correctAnswer: 2,
 explanation: "Grip.",
 },
 {
 id: "q10",
 type: MC,
 question: "When is loading the Animation track convenient?",
 options: [
          "Only in Studio Menu without Play",
          "On Equipped (when Tool is on Character)",
          "Always on PlayerRemoving",
          "Only after Publish"
        ],
 correctAnswer: 1,
 explanation: "Equipped.",
 },
 {
 id: "q11",
 type: MC,
 question: "How does 8.2 prepare 8.3?",
 options: [
          "8.3 deletes all Tools",
          "Animation replaces the server",
          "StarterPack forbids damage",
          "Tool/Handle exist for server hit and dealDamage"
        ],
 correctAnswer: 3,
 explanation: "Weapon ready.",
 },
 {
 id: "q12",
 type: MC,
 question: "What if AnimationId is for the wrong rig?",
 options: [
          "Often the animation simply does not play correctly",
          "Baseplate is always deleted",
          "MaxHealth becomes 0",
          "Studio always closes"
        ],
 correctAnswer: 0,
 explanation: "R6/R15.",
 },
 {
 id: "q13",
 type: MC,
 question: "CanBeDropped = false on the arena means…",
 options: [
          "Tool cannot be equipped",
          "Animation disabled",
          "Player will not easily drop the Tool on the ground",
          "Weld destroyed"
        ],
 correctAnswer: 2,
 explanation: "Do not lose the sword.",
 },
 {
 id: "q14",
 type: MC,
 question: "Minimum for hand-in without custom animation?",
 options: [
          "Empty Tool without Handle",
          "Only the name Sword in Workspace",
          "Health=0 on the client",
          "Honest lite motion/tween + working Tool in hand (better with AnimationId)"
        ],
 correctAnswer: 3,
 explanation: "Animation is better, but the sword is required.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 8.2 hand-in artifact?",
 options: [
          "Theory only",
          "Tool in hand with swing + StarterPack + Save",
          "Empty Baseplate",
          "Damage only client Health"
        ],
 correctAnswer: 1,
 explanation: "Sword required.",
 }
 ],
 },
}

export const enLesson83 = {
 lessonId: "lesson-roblox-8-3",
 moduleId: "module-08",
 order: 3,
 title: "8.3 - dealDamage on the server",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Write function dealDamage on the server (Humanoid, amount, source)",
 "Explain Never trust client: client does not write enemy Health directly",
 "Add lite checks: amount type, cooldown, distance, living target",
 "Connect Tool hit to server damage (Touched or Remote lite)",
 "Show the anti-example \"client killed everyone\" and why it is a hole"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 59 of 92)",
 content: `In **8.1** Health is on the arena. In **8.2** the Tool swings. Today you connect them honestly: **damage lives on the server**.
This is the Arena module anchor. Without it, 8.4-8.8 build fireworks and waves on sand.

**Do now (2 min):** write in one sentence who sets the score in sports - the referee or a fan with a phone. That is server vs client.`,
 },
 {
 title: "Never trust client - arena rule",
 content: `| Client can | Server decides |
|-------------|----------------|
| Show swing animation | How much HP to remove |
| Send "I hit X" | Whether X is even in range |
| Draw sparks (later) | Whether hits are spam |
| Lie | World truth |

Client is the **player with a joystick**. Server is the **referee**. The joystick does not write goals into the record.

In Solo Studio it is easy to forget the difference: you are both server and client in one window. Imagine a friend with an exploit - they change LocalScript in a second. So enemy Health is **never** "client truth".

**Do now (4 min):** update HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Anti-example: client kills alone",
 content: `Bad LocalScript (DO NOT copy into hand-in):

\`local hum = workspace.Arena.Dummy.Humanoid\`
\`hum.Health = 0\`

What happens while learning:
- In Solo it "works" - combat seems done.
- On network / with cheats - anyone clears the arena without a sword.

Demo for yourself (5 min):
1. Put this line in a temporary LocalScript.
2. See the dummy fall.
3. **Delete** the script.
4. Replace with the path: hit → server → dealDamage.

This contrast matters more than a perfect particle.

**Do now (3 min):** find one symptom from the table in the Place and fix it or confirm it is gone.`,
 },
 {
 title: "dealDamage signature",
 content: `\`local function dealDamage(humanoid, amount, sourcePlayer)\`
\` if typeof(humanoid) ~= "Instance" then return false end\`
\` if not humanoid:IsA("Humanoid") then return false end\`
\` if humanoid.Health <= 0 then return false end\`
\` if typeof(amount) ~= "number" then return false end\`
\` if amount <= 0 then return false end\`
\` -- then cooldown / distance\`
\` humanoid:TakeDamage(amount)\`
\` -- or: humanoid.Health = math.max(0, humanoid.Health - amount)\`
\` return true\`
\`end\`

Why \`return true/false\`:
- 8.4 will call Fx only after \`true\`.
- Easier to log failed hits in Output.

\`TakeDamage\` respects some engine protections; direct \`Health =\` is also fine for learning if deliberate.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Cooldown on the hit source",
 content: `Without cooldown, Touched/Remote spam = a thousand damage per second.

\`local lastHit = {} -- [player] = os.clock()\`
\`local HIT_COOLDOWN = 0.4\`

\`local function canHit(player)\`
\` local now = os.clock()\`
\` local t = lastHit[player]\`
\` if t and now - t < HIT_COOLDOWN then return false end\`
\` lastHit[player] = now\`
\` return true\`
\`end\`

In dealDamage / before it:

\`if sourcePlayer and not canHit(sourcePlayer) then return false end\`

\`PlayerRemoving\`: \`lastHit[player] = nil\`.

Align 0.4 later with the 8.2 animation and 8.7 balance. Today the main thing is that a **server limit exists**.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Distance check (lite)",
 content: `Even without full Raycast:

\`local MAX_RANGE = 10\`

\`local function nearEnough(attackerChar, targetHum)\`
\` local a = attackerChar and attackerChar:FindFirstChild("HumanoidRootPart")\`
\` local t = targetHum.Parent and targetHum.Parent:FindFirstChild("HumanoidRootPart")\`
\` if not a or not t then return false end\`
\` return (a.Position - t.Position).Magnitude <= MAX_RANGE\`
\`end\`

Call before TakeDamage. If the client says "I hit the boss from 200 studs" - \`return false\`.

Same muscle as in Race (nearFinish) and the shop (do not trust price). Today - arena.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Where the hit signal comes from",
 content: `| Method | Level | Note |
|--------|--------|---------|
| **Handle.Touched** on server (Tool on Character) | Simple start | Lots of spam - need cooldown + filter |
| **RemoteEvent** "Attack" + server finds target in radius | Cleaner | A bit more code |
| Client sends "damage this Humanoid for 999" | Bad | Never trust amount/target blindly |

Course recommendation for today:
1. Tool from 8.2 in hand.
2. Server listens to Touched **or** Remote without trusting amount from the client.
3. Amount comes from **constant** \`DAMAGE = 20\`, not from a client argument.

\`local DAMAGE = 20\` -- single source of truth

**Do now (4 min):** make one Remote call and note who decides - client or server.`,
 },
 {
 title: "Touched on the server: minimal path",
 content: `When Tool is equipped, Character has Handle. On the server (often via Tool.Equipped / Character):

\`handle.Touched:Connect(function(hit)\`
\` local character = handle.Parent.Parent -- Tool.Parent = Character\`
\` local player = Players:GetPlayerFromCharacter(character)\`
\` if not player then return end\`
\` local victimChar = hit.Parent\`
\` local victimHum = victimChar and victimChar:FindFirstChildOfClass("Humanoid")\`
\` if not victimHum then return end\`
\` if victimChar == character then return end -- do not hit yourself\`
\` dealDamage(victimHum, DAMAGE, player)\`
\`end)\`

Required filters: not floor Part, not your Humanoid, not a corpse (\`Health <= 0\` already in dealDamage).

Touched spams - so cooldown in dealDamage is critical.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "ModuleScript DamageService (optional, but useful)",
 content: `\`ServerScriptService/Modules/DamageService\` ModuleScript:

\`local DamageService = {}\`
\`local DAMAGE = 20\`
\`-- lastHit, dealDamage as above\`
\`function DamageService.apply(humanoid, sourcePlayer, amount)\`
\` return dealDamage(humanoid, amount or DAMAGE, sourcePlayer)\`
\`end\`
\`return DamageService\`

Another Script:

\`local DamageService = require(path)\`
\`DamageService.apply(hum, player)\`

Plus: 8.6 waves, 8.7 balance, 8.4 Fx - all \`require\` one API.  
Minus today: you can leave one function in a Script if Module is still heavy - but think of BALANCE table as future-ready.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "What the client may still do",
 content: `| OK on client | NOT ok on client |
|---------------|------------------|
| Swing animation (8.2) | \`enemy.Humanoid.Health = 0\` |
| Hit sound locally | Set enemy MaxHealth |
| "Attacking" FireServer request | Send amount=999999 as truth |
| Own HP UI (replication) | Count a miss as a damage hit |

After successful server damage, Health replicates - the client **will see** the bar drop. It does not need to write Health itself.

**Do now (5 min):** try in Play to change dummy Health from the client properties window during a test - in a real game that is another layer; more important: your hand-in **code** does not do this.`,
 },
 {
 title: "Logging for debug",
 content: `Temporarily:

\`print(player.Name, "hit", humanoid.Parent.Name, "hp", humanoid.Health)\`

Or on \`return false\`:

\`print("deny", reason)\` -- "cooldown" / "range" / "dead"

For hand-in turn off excess spam or leave 1 line. Mentor sees in 10 s: hit → dealDamage → HP.

Do not debug by animation eyes alone: animation can play on \`return false\`.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Playtest Never trust",
 content: `| # | Action | Expect |
|---|-----|------------|
| 1 | Honest Tool hit | HP drops on the server |
| 2 | Hit spam | Not faster than cooldown |
| 3 | Hit from afar (if range exists) | deny |
| 4 | Hit self / floor | No damage |
| 5 | Temporary client Health=0 | You understand the hole; hand-in has no such code |
| 6 | Dummy Health ≤ 0 | Repeat hits do not subtract further |
| 7 | Output | No crash on nil Humanoid |

Rows 1-2 are the hand-in minimum. Row 5 is understanding the rule.

**Do now (5 min):** run the test table once and write pass/fail for each row.`,
 },
 {
 title: "Lesson 59 hand-in checklist",
 content: `- [ ] dealDamage on the server (function / Module)
- [ ] Amount from server constant, not "client truth"
- [ ] Cooldown on sourcePlayer
- [ ] Filter living Humanoid / not self
- [ ] (Lite) distance check
- [ ] Tool hit calls dealDamage
- [ ] No hand-in LocalScript Health=0
- [ ] Playtest 1-2, 4 green
- [ ] Save: Lesson 8.3 - Server Damage

Next **8.4** hangs Fx on \`return true\`. **8.5** adds Died. **8.7** tunes DAMAGE. Everything rests on today's function.

**Do now (3 min):** walk the checklist and tick only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Humanoid.Health = … in LocalScript as damage",
 explanation: "Cheat and desync; Never trust client.",
 correctApproach: "dealDamage on the server",
 },
 {
 mistake: "Trust amount from FireServer without check",
 explanation: "Client will send 999999.",
 correctApproach: "DAMAGE constant on the server",
 },
 {
 mistake: "No cooldown on Touched",
 explanation: "Instant kill by spam.",
 correctApproach: "lastHit[player] + HIT_COOLDOWN",
 },
 {
 mistake: "Hit self / floor as Humanoid",
 explanation: "Weird damage and logs.",
 correctApproach: "Filter victim ~= self, IsA Humanoid",
 },
 {
 mistake: "dealDamage returns void, Fx always plays",
 explanation: "Fireworks on deny.",
 correctApproach: "return true/false",
 },
 {
 mistake: "Forget PlayerRemoving for lastHit",
 explanation: "Reference leak / odd keys.",
 correctApproach: "lastHit[player] = nil",
 }
 ],
 summary: "You built the arena anchor: function dealDamage on the server with cooldown and lite validation. The client can swing the Tool, but only the referee changes HP. This is the base for Fx, death, waves, and balance.",
 practiceTask: {
 title: "Damage judge (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** Tool hit removes HP only through server dealDamage.

### Part A - Function (10 min)
1. dealDamage with typeof / Health / amount checks.
2. DAMAGE constant.
3. return true/false + print for debug.

### Part B - Cooldown and range (10 min)
1. lastHit table + HIT_COOLDOWN.
2. Magnitude lite to target.
3. PlayerRemoving clears lastHit.

### Part C - Connect Tool (10 min)
1. Touched or Remote → dealDamage.
2. Anti-example Health=0 removed.
3. **Save:** Lesson 8.3 - Server Damage`,
 hints: [
 "Server button calling dealDamage on dummy first - then Tool",
 "print deny reason saves 20 min of guessing",
 "DAMAGE one number - do not copy-paste 20 in three places"
 ],
 optionalChallenge: "ModuleScript DamageService.apply + require from one combat Script.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 8.3?",
 options: [
          "Make server dealDamage and do not trust client HP",
          "Delete Tool",
          "Build Particles only",
          "Publish without arena"
        ],
 correctAnswer: 0,
 explanation: "Never trust client.",
 },
 {
 id: "q2",
 type: MC,
 question: "Why is LocalScript Health=0 a bad hand-in?",
 options: [
          "Health does not exist in Roblox",
          "Client can cheat and break combat",
          "LocalScript cannot print",
          "It is required for Tween"
        ],
 correctAnswer: 1,
 explanation: "Anti-example.",
 },
 {
 id: "q3",
 type: MC,
 question: "Where should the damage number come from?",
 options: [
          "Blindly from any client number",
          "From the sky Part name",
          "From a constant/config on the server",
          "From Sound Volume"
        ],
 correctAnswer: 2,
 explanation: "Server truth.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why cooldown in dealDamage?",
 options: [
          "To change Skybox",
          "It disables Humanoid",
          "Cooldown draws Billboard",
          "So Touched/hit spam does not drop HP instantly"
        ],
 correctAnswer: 3,
 explanation: "Rate limit.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why Magnitude check?",
 options: [
          "Increase MaxHealth",
          "Reject a hit \"across half the map\"",
          "Create RemoteFunction",
          "Replace Tool"
        ],
 correctAnswer: 1,
 explanation: "Lite range.",
 },
 {
 id: "q6",
 type: MC,
 question: "What does a successful dealDamage return in the lesson template?",
 options: [
          "Always nil and crash",
          "Only Color3",
          "true (so Fx/logs know success)",
          "SpawnLocation"
        ],
 correctAnswer: 2,
 explanation: "true/false API.",
 },
 {
 id: "q7",
 type: MC,
 question: "Who is the \"referee\" in the lesson metaphor?",
 options: [
          "Server",
          "Only LocalScript UI",
          "Sky",
          "Toolbox Decal"
        ],
 correctAnswer: 0,
 explanation: "Server decides.",
 },
 {
 id: "q8",
 type: MC,
 question: "Can swing animation stay on the client?",
 options: [
          "No - any animation is forbidden",
          "Animation automatically writes Health",
          "Animation replaces dealDamage",
          "Yes - visuals OK, damage still on the server"
        ],
 correctAnswer: 3,
 explanation: "Role split.",
 },
 {
 id: "q9",
 type: MC,
 question: "What to do in PlayerRemoving for lastHit?",
 options: [
          "Delete Workspace",
          "Disable Pathfinding",
          "Clear the player entry",
          "Publish required"
        ],
 correctAnswer: 2,
 explanation: "State cleanup.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why filter a hit on yourself?",
 options: [
          "Your Humanoid does not exist",
          "Otherwise you can damage your own Humanoid by mistake",
          "Tool then disappears",
          "Server forbids Character"
        ],
 correctAnswer: 1,
 explanation: "victim ~= self.",
 },
 {
 id: "q11",
 type: MC,
 question: "How does 8.3 prepare 8.4?",
 options: [
          "Particles replace damage",
          "8.4 deletes server scripts",
          "Tween writes Health",
          "Fx call after return true from dealDamage"
        ],
 correctAnswer: 3,
 explanation: "Damage first, then wow.",
 },
 {
 id: "q12",
 type: MC,
 question: "What risk if Remote lets client send amount?",
 options: [
          "Faked huge damage",
          "Remote then does not compile",
          "Humanoid becomes Part",
          "Required Studio crash"
        ],
 correctAnswer: 0,
 explanation: "Do not trust amount.",
 },
 {
 id: "q13",
 type: MC,
 question: "Why ModuleScript DamageService?",
 options: [
          "It disables Arena",
          "Without the module Tool does not exist",
          "One damage API for waves/balance/different scripts",
          "Module always client-only"
        ],
 correctAnswer: 2,
 explanation: "Reuse.",
 },
 {
 id: "q14",
 type: MC,
 question: "What to check if animation plays but HP stands still?",
 options: [
          "Only sword color",
          "Module 12 name",
          "Turn Output off",
          "Whether dealDamage is called at all and whether it is deny"
        ],
 correctAnswer: 3,
 explanation: "Damage debug.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 8.3 hand-in artifact?",
 options: [
          "Only client Health=0",
          "Server dealDamage with Tool + lite protection + Save",
          "Empty Baseplate",
          "Theory only without Play"
        ],
 correctAnswer: 1,
 explanation: "Damage judge required.",
 }
 ],
 },
}

export const enLesson84 = {
 lessonId: "lesson-roblox-8-4",
 moduleId: "module-08",
 order: 4,
 title: "8.4 - TweenService + Particles",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Make a short Tween on hit (Part size/transparency/color)",
 "Add a ParticleEmitter burst on hit",
 "Wire feedback to the moment of server dealDamage (not instead of it)",
 "Remove effects after play (Destroy / Enabled=false), without lag",
 "Prepare a \"felt\" hit before death/respawn and waves"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 60 of 92)",
 content: `In **8.3** damage is already honest on the server. Today you add **hit feel**: the player should see a hit, not only believe the HP number.
Without feedback combat is "mute". With feedback, the 8.8 Ship demo looks alive even on 2 waves.

**Do now (2 min):** pick one style - "metal spark" or "green slime" for your enemy.`,
 },
 {
 title: "Feedback ≠ damage",
 content: `| Damage (8.3) | Feedback (today) |
|------------|---------------------|
| Changes Health on the server | Shows the hit to eyes |
| dealDamage | Tween + Particles |
| Combat truth | Combat spectacle |
| Without this combat is cheaty/dead | Without this combat is dry |

Damage is the **referee removing points**. Tween/particles are the **scoreboard fireworks**. Fireworks without a referee - a lie; referee without fireworks - dull.

Rule: **first** successful dealDamage, **then** the effect. Not the reverse ("nice flash" but HP stands still).

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "TweenService in 5 minutes",
 content: `\`local TweenService = game:GetService("TweenService")\`

\`local info = TweenInfo.new(\`
\` 0.15, -- time\`
\` Enum.EasingStyle.Quad,\`
\` Enum.EasingDirection.Out\`
\`)\`

\`local tween = TweenService:Create(part, info, { Transparency = 0.5, Size = part.Size * 1.1 })\`
\`tween:Play()\`

Typical hit properties:
- \`Transparency\`, \`Color\`, \`Size\`, \`CFrame\` (careful with physics)

For a "flash":
1. Clone a small Part at the hit point.
2. Tween Transparency 0 → 1.
3. On \`Completed\` → Destroy.

Do not tween Humanoid.Health - Health is not for Tween; that is dealDamage's job.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "ParticleEmitter: burst, not eternal smoke",
 content: `On an anchor Part (or Attachment on Character):

\`local p = Instance.new("ParticleEmitter")\`
\`p.Texture = "rbxasset://textures/particles/sparkles_main.dds" -- or your asset\`
\`p.Rate = 0 -- not a constant stream\`
\`p.Lifetime = NumberRange.new(0.3, 0.6)\`
\`p.Speed = NumberRange.new(4, 10)\`
\`p.Parent = anchor\`

Burst:

\`p:Emit(20)\`

Or short Enabled:

\`p.Enabled = true\`
\`task.delay(0.2, function() p.Enabled = false end)\`

| Mode | When |
|-------|------|
| \`Emit(n)\` | One hit - ideal |
| \`Enabled\` constantly | Aura / zone - not every hit |
| New Emitter every frame | Lag - **do not** |

**Do now (8 min):** button/hit → Emit(15) once, no spam.`,
 },
 {
 title: "Where to run the effect: client or server",
 content: `| Approach | Plus | Minus |
|--------|------|-------|
| **Server** creates Part/Particle | Simple in one Script with dealDamage | A bit heavier for network / everyone sees the same |
| **Server** FireClient "hit here" → LocalScript effect | Lighter client polish | Needs Remote (if you already have one) |
| **LocalScript only** without damage | Pretty, but a lie | Not for HP truth |

For Arena module today OK:
- minimum: effect on the same server path after TakeDamage;
- or LocalScript listens to Health change / its own hit-detect **plus** server damage separately (careful with desync).

If Remotes still feel scary - do a server Part flash. Beauty can come later; honesty already exists from 8.3.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Hit point and effect anchor",
 content: `Where to get position:
1. \`targetPart.Position\` (HumanoidRootPart / UpperTorso).
2. Tool hit-detect result (Handle.Touched → hit.Position) - with server validation.
3. Attachment \`HitFx\` on the enemy model.

Flash template:

\`local fx = Instance.new("Part")\`
\`fx.Size = Vector3.new(0.4, 0.4, 0.4)\`
\`fx.Anchored = true\`
\`fx.CanCollide = false\`
\`fx.Material = Enum.Material.Neon\`
\`fx.CFrame = CFrame.new(position)\`
\`fx.Parent = workspace.Arena.Fx\`
\`-- Particle on fx + Tween Transparency\`
\`task.delay(0.4, function() fx:Destroy() end)\`

Folder \`Arena.Fx\` helps you not lose trash in Explorer while debugging.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Link to Tool animation (8.2)",
 content: `Order of a "tasty" hit:
1. Player activates Tool (swing animation).
2. Hit window / Touched / remote hit.
3. Server \`dealDamage\` succeeds.
4. **Then** Tween + Emit.

If the effect always fires at animation start - you get "fireworks in air" with no damage.  
If effect without animation - also OK for hand-in, but weaker juice.

Lite: even without perfect frame sync - effect **after** successful damage already passes the Ship rubric "has feedback".

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Cleanup and performance",
 content: `| Bad | Good |
|--------|-------|
| Emitter Enabled forever on every enemy x50 | Emit(n) on hit |
| Tween without Destroying the anchor | Completed / delay → Destroy |
| 200 flash Parts per minute without cleanup | Limit / one Fx folder |
| Tween enemy body physics every frame | Short 0.1-0.2 s or separate Fx Part |

Rule: every created Fx **needs a death plan** (lifetime < 1 s for a hit flash).

Playtest on waves (when 8.6 arrives): after 30 hits Explorer must not drown in Part1...Part200.

**Do now (4 min):** run one check from this section in Play and write the result in your Note.`,
 },
 {
 title: "Mini pack \"one hit = one wow\"",
 content: `Build a function pack:

\`local function playHitFx(position)\`
\` local fx = makeAnchor(position)\`
\` emitSparks(fx)\`
\` tweenFade(fx)\`
\` task.delay(0.5, function() fx:Destroy() end)\`
\`end\`

Call after successful dealDamage:

\`if dealDamage(hum, amount, player) then\`
\` playHitFx(hum.RootPart.Position)\`
\`end\`

(If dealDamage is void - then call playHitFx only when Health actually changed.)

Match color to the enemy: slime - green, metal - yellow Neon. One palette beats a rainbow.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Playtest feedback",
 content: `| # | Action | Expect |
|---|-----|------------|
| 1 | Hit with damage | HP drops **and** flash/sparks appear |
| 2 | Swing at air (miss) | No effect (or other "whoosh" - optional) |
| 3 | 10 hits in a row | No lag, Fx disappear |
| 4 | Output | No Tween errors on nil Part |
| 5 | Another player (if any) | Sees the effect (if server-side) |
| 6 | Without dealDamage (temporarily off) | Effect must not "mask" missing damage on hand-in |

Row 1 is the lesson heart. Row 3 is the polish heart.

If row 1 is red - first check playHitFx call after dealDamage, do not tune Texture for an hour. If row 3 is red - look for Emit in a loop without Destroy or Enabled=true forever.

**Do now (5 min):** run the test table once and write pass/fail for each row.`,
 },
 {
 title: "Lesson 60 hand-in checklist",
 content: `- [ ] TweenInfo + Create + Play on hit anchor
- [ ] ParticleEmitter with Emit or short Enabled
- [ ] Effect after successful damage
- [ ] Destroy / disable after play
- [ ] Fx folder or equivalent cleanup
- [ ] Playtest 1 and 3 green
- [ ] Save: Lesson 8.4 - Hit Feedback

Next **8.5** adds death/respawn - effects will not replace i-frames, but make death/hit readable. In **8.8** the rubric asks: "is there feedback?"

Do not spend the remaining hour on a fifth VFX layer. One readable pack (flash + sparks) beats a pile of half-alive emitters.

**Do now (3 min):** walk the checklist and tick only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Pretty VFX without dealDamage",
 explanation: "Lying combat: sparkles, HP stands still.",
 correctApproach: "Damage first, then effect",
 },
 {
 mistake: "High Particle Rate Enabled forever on every hit anchor",
 explanation: "Lag and mush.",
 correctApproach: "Emit(n) or short Enabled",
 },
 {
 mistake: "No Destroy on Fx Parts",
 explanation: "Trash in Workspace, FPS drop.",
 correctApproach: "delay/Completed → Destroy",
 },
 {
 mistake: "Tween Health",
 explanation: "Wrong tool; confusion with damage.",
 correctApproach: "TakeDamage/dealDamage + visual tween",
 },
 {
 mistake: "Effect on miss same as on hit",
 explanation: "Player cannot read a hit.",
 correctApproach: "Fx only after successful damage",
 },
 {
 mistake: "Create 20 Emitters in a loop without Parent cleanup",
 explanation: "Memory and visual noise.",
 correctApproach: "One Emit per anchor / reuse",
 }
 ],
 summary: "You added hit feedback: short Tween and Particle burst after server damage, with cleanup. Combat became readable to the eyes - base for death/waves and the Ship rubric \"has feedback\".",
 practiceTask: {
 title: "Wow on hit (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** every successful hit gives short visual feedback.

### Part A - Tween (10 min)
1. Anchor Part at hit point (Anchored, CanCollide false).
2. Tween Transparency or Size 0.15 s.
3. Destroy after Completed/delay.

### Part B - Particles (10 min)
1. ParticleEmitter on the anchor.
2. Emit(15-30) on hit.
3. Do not leave Enabled forever.

### Part C - Link to damage (10 min)
1. Call playHitFx only after successful dealDamage.
2. 10 hits - no trash in Explorer.
3. **Save:** Lesson 8.4 - Hit Feedback`,
 hints: [
 "Fx from a button first, then insert after dealDamage",
 "Neon + short time = readable even without textures",
 "workspace.Arena.Fx:ClearAllChildren() while debugging - OK"
 ],
 optionalChallenge: "Second layer: light SoundService hit sound with Emit (one Sound, not 50 clones without Destroy).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 8.4?",
 options: [
          "Add Tween/Particles as feedback after damage",
          "Remove dealDamage",
          "Build Race Remote",
          "Delete Tool"
        ],
 correctAnswer: 0,
 explanation: "Hit feedback.",
 },
 {
 id: "q2",
 type: MC,
 question: "Why feedback does not replace damage?",
 options: [
          "Tween always changes MaxHealth",
          "Sparkle without Health change - lying combat",
          "Particles forbidden with Humanoid",
          "Server cannot see Parts"
        ],
 correctAnswer: 1,
 explanation: "HP truth first.",
 },
 {
 id: "q3",
 type: MC,
 question: "Which service creates Tween?",
 options: [
          "ChatService",
          "BadgeService",
          "TweenService",
          "TeleportService"
        ],
 correctAnswer: 2,
 explanation: "TweenService.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why ParticleEmitter:Emit(n)?",
 options: [
          "Disable Humanoid",
          "Replace MaxHealth",
          "Create RemoteEvent",
          "One controlled burst per hit"
        ],
 correctAnswer: 3,
 explanation: "Burst.",
 },
 {
 id: "q5",
 type: MC,
 question: "When is it better to start hit Fx?",
 options: [
          "Always at animation start even on miss as the only damage signal",
          "After successful dealDamage",
          "Only when Sky changes",
          "Once an hour"
        ],
 correctAnswer: 1,
 explanation: "Sync with damage.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why Destroy the effect anchor?",
 options: [
          "Otherwise Tween does not exist",
          "Destroy increases damage",
          "Clear trash and keep performance",
          "Required for SpawnLocation"
        ],
 correctAnswer: 2,
 explanation: "Cleanup.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why is tweening Health bad?",
 options: [
          "Health is not a visual tween target; damage is dealDamage",
          "Health is always a string",
          "TweenService breaks Studio",
          "Humanoid forbids any numbers"
        ],
 correctAnswer: 0,
 explanation: "Different tools.",
 },
 {
 id: "q8",
 type: MC,
 question: "Which Part properties are handy for hit tween?",
 options: [
          "Only Name as Tween target",
          "Only Parent",
          "Must be Terrain.WaterColor",
          "Transparency, Size, Color (briefly)"
        ],
 correctAnswer: 3,
 explanation: "Visual props.",
 },
 {
 id: "q9",
 type: MC,
 question: "Why constant Rate on every hit anchor is a risk?",
 options: [
          "Emit then compiles better",
          "Roblox requires Rate=999",
          "Lag and visual noise",
          "Only way to see sparks"
        ],
 correctAnswer: 2,
 explanation: "Performance.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why folder Arena.Fx?",
 options: [
          "Without it Humanoid does not work",
          "Convenient to see and clean temporary effects",
          "It replaces ServerStorage",
          "Fx folder creates waves"
        ],
 correctAnswer: 1,
 explanation: "Cleanup organization.",
 },
 {
 id: "q11",
 type: MC,
 question: "How does 8.4 prepare 8.8 Ship?",
 options: [
          "Ship forbids Particles",
          "Must delete Tween before Ship",
          "Feedback cancels server damage",
          "Rubric asks about readable hit feedback"
        ],
 correctAnswer: 3,
 explanation: "Juice for the demo.",
 },
 {
 id: "q12",
 type: MC,
 question: "What is TweenInfo.new(0.15, …)?",
 options: [
          "Duration and easing style for property animation",
          "0.15 HP damage",
          "Enemy count",
          "Remote name"
        ],
 correctAnswer: 0,
 explanation: "Tween parameters.",
 },
 {
 id: "q13",
 type: MC,
 question: "What is today's artifact minimum?",
 options: [
          "12 AAA VFX systems",
          "Sound only with nothing else",
          "1 Tween + 1 particle burst per hit + cleanup",
          "Empty Baseplate"
        ],
 correctAnswer: 2,
 explanation: "MVP feedback.",
 },
 {
 id: "q14",
 type: MC,
 question: "Why CanCollide=false on Fx Part?",
 options: [
          "Otherwise Tween does not play",
          "CanCollide disables Particles",
          "It increases MaxHealth",
          "So the flash does not shove player/enemy"
        ],
 correctAnswer: 3,
 explanation: "Pure visual anchor.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 8.4 hand-in artifact?",
 options: [
          "Theory only",
          "Effect after damage + cleanup + Save",
          "VFX without any damage as the finale",
          "Emitter Enabled forever without Emit"
        ],
 correctAnswer: 1,
 explanation: "Hit juice required.",
 }
 ],
 },
}

export const enLesson85 = {
 lessonId: "lesson-roblox-8-5",
 moduleId: "module-08",
 order: 5,
 title: "8.5 - Death + respawn",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Handle Humanoid.Died on the server for the player",
 "Make predictable respawn (LoadCharacter / SpawnLocation)",
 "Add i-frames lite after spawn to avoid death loop",
 "Reset or keep combat state on purpose (Tool, wave - write the rule)",
 "Prepare a stable life cycle before waves (8.6) and balance (8.7)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 61 of 92)",
 content: `In **8.1-8.4** you already fight: Health, Tool, dealDamage, feedback. Today you close the **life** cycle: what happens when HP = 0.
Without this, waves in 8.6 turn into "spawn into a pile of enemies → instant death x10".

**Do now (2 min):** stand in a dangerous arena spot and imagine: where should you appear after death - safe Spawn or middle of the wave?`,
 },
 {
 title: "Death in Roblox in plain words",
 content: `| Event | Who owns it | What the player feels |
|-------|----------------|---------------------|
| Health → 0 | Server / Humanoid | You fall / ragdoll |
| Died | Humanoid signal | "I am dead" |
| Character disappears | Engine / your code | Death screen / pause |
| New Character | Respawn | Back in the world |

Died is the **referee's whistle**. Respawn is **coming off the bench**. i-frames are a **short shield** so you are not hit the moment you exit.

By default Roblox already respawns via SpawnLocation. Today you **control** that moment for the arena: when, where, with what immunity.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Subscribe to Died (server)",
 content: `On \`Players.PlayerAdded\` and every new Character:

\`local function hookCharacter(player, character)\`
\` local hum = character:WaitForChild("Humanoid")\`
\` hum.Died:Connect(function()\`
\` onPlayerDied(player)\`
\` end)\`
\`end\`

\`Players.PlayerAdded:Connect(function(player)\`
\` player.CharacterAdded:Connect(function(character)\`
\` hookCharacter(player, character)\`
\` end)\`
\` if player.Character then hookCharacter(player, player.Character) end\`
\`end)\`

Why server: death and respawn are world rules. Client can lie about HP; Died from server Humanoid is a more reliable anchor.

In \`onPlayerDied\` for now enough: print name, start respawn timer, set flag \`player:SetAttribute("Dead", true)\`.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Respawn: LoadCharacter vs SpawnLocation",
 content: `| Method | Plus | Minus |
|--------|------|-------|
| **SpawnLocation** (auto) | Simple, engine does it | Less timing control |
| **LoadCharacter()** from server | You decide "after 3 s" | You must call it yourself |
| Teleport living Character | Fast | Not a real "death" |

Training template:

\`local RESPAWN_DELAY = 3\`

\`local function onPlayerDied(player)\`
\` task.delay(RESPAWN_DELAY, function()\`
\` if not player.Parent then return end\`
\` player:LoadCharacter()\`
\` end)\`
\`end\`

After LoadCharacter, \`CharacterAdded\` fires → hookCharacter again + start i-frames.

Ensure there is **at least one** SpawnLocation in a safe zone (not inside EnemySpawn).

**Do now (4 min):** run one check from this section in Play and write the result in your Note.`,
 },
 {
 title: "i-frames lite - shield after spawn",
 content: `Problem: respawn into aggro zone → hit → Died again in 0.2 s.

Lite fix (pick one):

**A. Attribute \`Invulnerable\`**
\`character:SetAttribute("Invulnerable", true)\`
\`task.delay(1.5, function()\`
\` if character.Parent then character:SetAttribute("Invulnerable", false) end\`
\`end)\`

In \`dealDamage\` / damage to player:
\`if character:GetAttribute("Invulnerable") then return end\`

**B. Temporary ForceField**
\`local ff = Instance.new("ForceField")\`
\`ff.Parent = character\`
\`task.delay(1.5, function() ff:Destroy() end)\`

ForceField is visible - OK for learning ("I see the shield"). Attribute is cleaner for your own damage.

**Do now (8 min):** after respawn, 1.5 s of damage to you is ignored (test dealDamage / enemy).`,
 },
 {
 title: "Where to respawn on the arena",
 content: `| Spawn place | When OK | When bad |
|-------------|---------|-------------|
| Lobby / behind barrier | Always safe | Far from fight - boring run |
| Arena edge | Quick back into fight | If wave is already there - need i-frames |
| Arena center | Almost never | Death loop |

School rule for today:
1. Spawn **outside** the main enemy spawn.
2. i-frames **required** if Spawn is near combat.
3. Sign: "After death you appear near the entrance".

Do not teleport a dead Character "by hand" instead of respawn - you get odd Tool/animation states.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Tool, combat state, and \"what we keep\"",
 content: `After death Character disappears - Tool on Character too. StarterPack / Backpack logic returns the weapon on new Character **if** Tool is in StarterPack.

Write one lesson rule:
- **A:** after death Tool again from StarterPack - waves (when they appear) **continue**.
- **B:** death = fail run, waves stop (for 8.6 decide explicitly).

Waves may not exist yet today - still think about Tool:
- StarterPack sword → after respawn again in hand/inventory.
- If Tool was only cloned into Backpack by script - clone again on CharacterAdded.

Do not leave \`Dead=true\` forever after LoadCharacter - clear the Attribute.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Enemy death vs player death",
 content: `| | Player | Enemy (dummy/NPC) |
|--|---------|-------------------|
| Died | Respawn + i-frames | Despawn / +wave progress (8.6) |
| LoadCharacter | Yes | Usually Destroy model |
| i-frames | Yes | Rarely needed |

Do not hang the same \`LoadCharacter\` on the enemy - that is for Player.

For enemy from 8.3-8.4:
\`hum.Died:Connect(function()\`
\` task.delay(0.5, function() enemy:Destroy() end)\`
\`end)\`

Today focus is the **player**. For enemy Died only confirm it does not crash when you test your damage.

**Do now (4 min):** run one check from this section in Play and write the result in your Note.`,
 },
 {
 title: "Death playtest (checklist)",
 content: `| # | Action | Expect |
|---|-----|------------|
| 1 | Drop to 0 HP (own damage / test button / enemy) | Died fires (print) |
| 2 | After RESPAWN_DELAY | New Character at Spawn |
| 3 | Take damage right after appear | i-frames hold 1-2 s |
| 4 | After i-frames end | Damage works again |
| 5 | Tool | Available after respawn (StarterPack) |
| 6 | Two deaths in a row | No crash, hook works again |
| 7 | Output | No red spam |

Optional server test button: \`hum.Health = 0\` for quick Died without a long fight.

**Do now (3 min):** walk the checklist and tick only items you really finished.`,
 },
 {
 title: "Typical death loop gaps",
 content: `| Symptom | Cause | Fix |
|---------|---------|------|
| Death every 0.2 s | Spawn in hazard, no i-frames | Spawn farther + ForceField/Attribute |
| No respawn | No LoadCharacter / Disabled Spawn | Call + SpawnLocation |
| Double respawn | Died + engine auto-respawn together | Pick one path |
| No Died hook on 2nd life | Subscribed only once to old Character | CharacterAdded every time |
| Damage ignored forever | Invulnerable never cleared | delay + false / Destroy FF |

**Do now (5 min):** deliberately put Spawn near hazard - confirm i-frames save you; then move Spawn back to a safe place.`,
 },
 {
 title: "Lesson 61 hand-in checklist",
 content: `- [ ] Died hooked on every Character (server)
- [ ] Respawn via delay (LoadCharacter or stable SpawnLocation)
- [ ] Spawn not in center of enemy spawn
- [ ] i-frames 1-2 s after appear
- [ ] dealDamage / enemy damage to player respects i-frames
- [ ] Tool returns (StarterPack or clone)
- [ ] Playtest 1-6 green
- [ ] Save: Lesson 8.5 - Death Respawn

Next **8.6** adds waves: respawn must not "eat" the player at wave start. In **8.7** you check that death loop is not masking as "hard balance".

**Do now (3 min):** walk the checklist and tick only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "No i-frames near dangerous Spawn",
 explanation: "Death loop, anger, waves impossible to test.",
 correctApproach: "1-2 s ForceField or Attribute Invulnerable",
 },
 {
 mistake: "Died subscription only for first Character",
 explanation: "Second life without death logic.",
 correctApproach: "CharacterAdded → hook every time",
 },
 {
 mistake: "Respawn only by teleport without LoadCharacter",
 explanation: "Broken animation/Tool/Humanoid state.",
 correctApproach: "Real Character respawn",
 },
 {
 mistake: "Leave Invulnerable true forever",
 explanation: "Player immortal - balance dead.",
 correctApproach: "Required clear after delay",
 },
 {
 mistake: "SpawnLocation inside EnemySpawn",
 explanation: "Instant death even with a short shield.",
 correctApproach: "Safe entrance zone",
 },
 {
 mistake: "Client \"fake\" respawn UI without server",
 explanation: "Desync with real Character.",
 correctApproach: "Server Died + LoadCharacter",
 }
 ],
 summary: "You built the death and respawn cycle: Died on the server, predictable appear, i-frames lite against death loop, and Tool return. This is the foundation for stable waves in 8.6 and honest balance in 8.7.",
 practiceTask: {
 title: "Life after death (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** die → wait → appear with shield → back into fight.

### Part A - Died and respawn (10 min)
1. Hook Humanoid.Died on every Character (server).
2. task.delay + LoadCharacter (or stable SpawnLocation).
3. Spawn in a safe zone.

### Part B - i-frames (12 min)
1. ForceField or Attribute Invulnerable for 1.5 s.
2. dealDamage / damage to player ignores the shield.
3. After delay damage works again.
4. Check Tool after respawn.

### Part C - Playtest (8 min)
1. Table 1-6.
2. Two deaths in a row without crash.
3. **Save:** Lesson 8.5 - Death Respawn`,
 hints: [
 "Test: set Health=0 on server for quick Died",
 "print on Died and at end of i-frames",
 "Safe Spawn first, then deliberate stress test near hazard"
 ],
 optionalChallenge: "Short Sound or TextLabel \"Respawn in 3…2…1\" (client UI from server signal lite).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 8.5?",
 options: [
          "Make death, respawn, and i-frames without death loop",
          "Delete Humanoid",
          "Build a Remotes shop",
          "Publish a Race track"
        ],
 correctAnswer: 0,
 explanation: "Life cycle.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where should you listen to player Humanoid.Died?",
 options: [
          "Only once in a sky LocalScript",
          "On the server for every Character",
          "In Terrain",
          "In the Tool name"
        ],
 correctAnswer: 1,
 explanation: "Server anchor.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why i-frames after respawn?",
 options: [
          "To raise MaxHealth forever",
          "It replaces dealDamage",
          "So you do not die instantly again near danger",
          "i-frames draw Skybox"
        ],
 correctAnswer: 2,
 explanation: "Anti death loop.",
 },
 {
 id: "q4",
 type: MC,
 question: "What does LoadCharacter do?",
 options: [
          "Deletes Workspace",
          "Creates RemoteEvent",
          "Disables SpawnLocation forever",
          "Creates a new player Character (respawn)"
        ],
 correctAnswer: 3,
 explanation: "Respawn from server.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why is Spawn in the center of EnemySpawn bad?",
 options: [
          "Humanoid then does not exist",
          "High death loop risk even with a short shield",
          "Studio does not save Place",
          "Tool becomes Anchored"
        ],
 correctAnswer: 1,
 explanation: "Safe zone.",
 },
 {
 id: "q6",
 type: MC,
 question: "How does ForceField help in the lesson?",
 options: [
          "Replaces all waves",
          "Removes damage from the game forever",
          "Temporary visible protection after appear",
          "Required for Billboard"
        ],
 correctAnswer: 2,
 explanation: "Lite i-frames.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why hook Died in CharacterAdded every time?",
 options: [
          "Every new Character is a new Humanoid after respawn",
          "CharacterAdded forbidden after death",
          "Otherwise MaxHealth becomes a string",
          "It disables Tool"
        ],
 correctAnswer: 0,
 explanation: "New life = new hook.",
 },
 {
 id: "q8",
 type: MC,
 question: "What to do with Attribute Invulnerable after delay?",
 options: [
          "Leave true forever",
          "Remove player from the game",
          "Must Destroy Workspace",
          "Set false (remove immunity)"
        ],
 correctAnswer: 3,
 explanation: "Otherwise immortality.",
 },
 {
 id: "q9",
 type: MC,
 question: "How does Tool usually return after death?",
 options: [
          "Clones itself from Lighting",
          "Only if you name a Part \"Sword\"",
          "Via StarterPack onto the new Character",
          "Tool never returns in Roblox"
        ],
 correctAnswer: 2,
 explanation: "StarterPack.",
 },
 {
 id: "q10",
 type: MC,
 question: "How does enemy death differ from player death here?",
 options: [
          "Enemy always LoadCharacter",
          "Enemy Destroy, player respawns via LoadCharacter/Spawn",
          "Player always Destroy forever",
          "Never any difference"
        ],
 correctAnswer: 1,
 explanation: "Different model fates.",
 },
 {
 id: "q11",
 type: MC,
 question: "How does 8.5 prepare 8.6 waves?",
 options: [
          "Waves forbid respawn",
          "Must delete Died before waves",
          "waveConfig replaces Humanoid",
          "Respawn with shield lets you test waves without instant fail-loop"
        ],
 correctAnswer: 3,
 explanation: "Stable life cycle.",
 },
 {
 id: "q12",
 type: MC,
 question: "What to check in dealDamage for i-frames?",
 options: [
          "If Invulnerable/ForceField - do not apply damage",
          "Always ignore all checks",
          "i-frames only work on Terrain",
          "dealDamage then compiles worse"
        ],
 correctAnswer: 0,
 explanation: "Respect the shield.",
 },
 {
 id: "q13",
 type: MC,
 question: "What i-frames duration guide in the lesson?",
 options: [
          "Must be 5 minutes",
          "0 ms always",
          "About 1-2 seconds",
          "Only during Publish"
        ],
 correctAnswer: 2,
 explanation: "Short shield.",
 },
 {
 id: "q14",
 type: MC,
 question: "What does death loop mean?",
 options: [
          "Winning wave",
          "ModuleScript name",
          "Required Studio mode",
          "Repeat deaths right after respawn with no chance to recover"
        ],
 correctAnswer: 3,
 explanation: "Death loop.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 8.5 hand-in artifact?",
 options: [
          "Theory only without Play",
          "Died + respawn + i-frames + Save",
          "Empty Baseplate",
          "Immortality Invulnerable=true forever"
        ],
 correctAnswer: 1,
 explanation: "Life cycle required.",
 }
 ],
 },
}

export const enLesson86 = {
 lessonId: "lesson-roblox-8-6",
 moduleId: "module-08",
 order: 6,
 title: "8.6 - Waves + waveConfig",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Describe combat as a sequence of waves, not one dummy",
 "Store wave parameters in table waveConfig (count, HP, pause)",
 "Spawn enemies on the server and track living count (aliveCount)",
 "Advance to the next wave via while / index when the wave is cleared",
 "Show victory after the last wave without crashing state"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 62 of 92)",
 content: `In **8.1-8.5** you already have arena, Tool, server damage, and death/respawn cycle. Today you add **waves**: combat goes 1 → 2 → … not "one dummy forever".
Without waves, 8.7 has nothing to measure on a difficulty curve, and 8.8 Ship has no second act of combat.

**Do now (2 min):** write: wave 1 = how many enemies and what HP; wave 2 = what changes.`,
 },
 {
 title: "Why waveConfig, not \"hardcode spawn\"",
 content: `| Hardcoded in code | waveConfig table |
|------------------|------------------|
| \`spawn(2); wait; spawn(5)\` scattered | One list of rules |
| Balance hunted in 4 scripts | Change a table row |
| Hard to explain to mentor | Visible: wave 1 / wave 2 |
| New wave = copy-paste | New row in the array |

waveConfig is the **concert setlist**. The script only plays number by number.

Example shape:

\`local waveConfig = {\`
\` { enemies = 2, hp = 60, delay = 1 },\`
\` { enemies = 3, hp = 80, delay = 2 },\`
\` { enemies = 1, hp = 150, delay = 1 }, -- "boss" lite\`
\`}\`

Fields can grow later (speed, prefab name). Today \`enemies\` + \`hp\` (+ optional \`delay\`) is enough.

**Do now (5 min):** change one field in Config/table and confirm the new behavior in Play.`,
 },
 {
 title: "Arena mode state",
 content: `Keep simple state on the server (not on the client):

\`local arena = {\`
\` running = false,\`
\` waveIndex = 0,\`
\` aliveCount = 0,\`
\` victory = false,\`
\`}\`

Rules:
- \`running = true\` after combat start (Prompt / Part "Start Waves").
- \`waveIndex\` - which waveConfig row is current (1-based is nicer for UI).
- \`aliveCount\` increase on spawn, decrease on enemy Death.
- \`victory\` - so you do not spawn wave 99 after the end.

**PlayerRemoving / Stop:** if you run a solo arena session - reset state on leave so counter "ghosts" do not linger.

Do not keep \`aliveCount\` only in LocalScript: client lies, wave "ends" fake.

**Do now (5 min):** change one field in Config/table and confirm the new behavior in Play.`,
 },
 {
 title: "Enemy prefab and spawn point",
 content: `In ServerStorage (or ReplicatedStorage, if deliberate):
- Model \`EnemyTemplate\` with Humanoid (from 8.1/8.3 logic).

In Workspace.Arena:
- Part/Folder \`SpawnPoints\` (1-3 points) **or** one \`EnemySpawn\`.

Clone:

\`local function spawnEnemy(hp)\`
\` local enemy = template:Clone()\`
\` enemy:PivotTo(spawnCFrame)\`
\` local hum = enemy:FindFirstChildOfClass("Humanoid")\`
\` hum.MaxHealth = hp\`
\` hum.Health = hp\`
\` enemy.Parent = workspace.Arena.Enemies\`
\` arena.aliveCount += 1\`
\` hum.Died:Connect(function()\`
\` arena.aliveCount -= 1\`
\` -- then check "wave clear?"\`
\` end)\`
\` return enemy\`
\`end\`

Anchored template in Storage is OK; on the clone clear extra Anchored so it walks/stands as planned.

**Do now (8 min):** one clone with HP from config appears on the start button.`,
 },
 {
 title: "spawnWave(index) - system heart",
 content: `\`local function spawnWave(index)\`
\` local cfg = waveConfig[index]\`
\` if not cfg then\`
\` arena.victory = true\`
\` arena.running = false\`
\` announceVictory()\`
\` return\`
\` end\`
\` arena.waveIndex = index\`
\` arena.aliveCount = 0\`
\` for i = 1, cfg.enemies do\`
\` spawnEnemy(cfg.hp)\`
\` task.wait(0.15) -- light spawn stagger\`
\` end\`
\`end\`

Important: after the for loop \`aliveCount\` should equal \`cfg.enemies\` (if all clones are alive). If Died fired instantly from a floor bug - look for void/teleport, not the "next wave".

Start call: \`spawnWave(1)\` after \`arena.running = true\`.

**Do now (5 min):** change one field in Config/table and confirm the new behavior in Play.`,
 },
 {
 title: "When the wave is \"cleared\"",
 content: `After each \`Died\`:

\`local function onEnemyDied()\`
\` arena.aliveCount -= 1\`
\` if not arena.running or arena.victory then return end\`
\` if arena.aliveCount > 0 then return end\`
\` local nextIndex = arena.waveIndex + 1\`
\` local delay = (waveConfig[arena.waveIndex] and waveConfig[arena.waveIndex].delay) or 1\`
\` task.delay(delay, function()\`
\` if not arena.running then return end\`
\` spawnWave(nextIndex)\`
\` end)\`
\`end\`

Typical gaps:
| Bug | Fix |
|-----|------|
| aliveCount goes negative | Died twice / wrong Humanoid |
| Wave 2 instantly at start | aliveCount > 0 check skipped |
| Victory never | waveConfig[next] nil not handled |
| Double spawnWave | Two Died at once without "cleaning" flag |

Lite protection: flag \`arena.cleaningWave\` so two last deaths do not call spawn twice.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "while as conductor (optional style)",
 content: `Two styles - pick one and stick to it:

**A. Event-driven (Died → next)** - above; good for live combat.

**B. while on the server:**

\`arena.running = true\`
\`local w = 1\`
\`while arena.running and waveConfig[w] do\`
\` spawnWave(w)\`
\` -- wait until aliveCount == 0\`
\` while arena.running and arena.aliveCount > 0 do\`
\` task.wait(0.25)\`
\` end\`
\` if arena.victory then break end\`
\` w += 1\`
\` task.wait(waveConfig[w-1].delay or 1)\`
\`end\`
\`if arena.running then announceVictory() end\`

\`while\` here is the **waiting skill** "while the wave is alive". Do not confuse with while on the client that hangs UI.

Do not do \`while true do spawn() end\` with no condition - you get an enemy avalanche.

**Do now (5 min):** change one field in Config/table and confirm the new behavior in Play.`,
 },
 {
 title: "Start and restart the wave run",
 content: `Start (ProximityPrompt / Touched StartPad / button):

1. If \`running\` - ignore or "already going".
2. Clear old enemies in \`Arena.Enemies\` (Destroy).
3. Reset \`victory = false\`, \`aliveCount = 0\`.
4. \`running = true\` → \`spawnWave(1)\`.

Restart after victory / all dead:
- Same function \`beginWaves()\`.
- Do not leave old models - otherwise aliveCount lies.

Link to 8.5: **player** death does not have to stop waves (solo arena can continue). Or it does stop - but then write the rule clearly on an arena sign.

**Do now (5 min):** StartPad twice in a row does not create 2x wave 1 without cleanup.`,
 },
 {
 title: "UI lite: \"Wave N\"",
 content: `For hand-in enough:
- \`print("Wave", index)\` in Output, **or**
- SurfaceGui / Billboard "Wave 2", **or**
- FireClient / Value \`Wave\` (if you already know Remotes - not required today).

Player-facing text beats "silent spawn off-camera".

Onboarding near Start:
*"Press start. Clear all waves. After the last - victory."*

Do not build a full wave leaderboard now - it distracts from aliveCount.

**Do now (4 min):** run one check from this section in Play and write the result in your Note.`,
 },
 {
 title: "Wave playtest",
 content: `| # | Action | Expect |
|---|-----|------------|
| 1 | Start | Wave 1, enemies from config |
| 2 | Kill all of wave 1 | After delay - wave 2 |
| 3 | Enemy HP | Matches waveConfig.hp |
| 4 | Count | Matches enemies |
| 5 | Last wave cleared | Victory, no new wave |
| 6 | Restart | Cleanup + again from 1 |
| 7 | Output | No error spam / negative alive |

If row 2 is red - log \`aliveCount\` on every Died.  
If row 5 is red - check \`if not cfg then victory\`.

**Do now (5 min):** run the test table once and write pass/fail for each row.`,
 },
 {
 title: "Link to 8.7-8.8",
 content: `| Today | Next |
|----------|------|
| waveConfig with different hp | 8.7 measures TTK per wave |
| Stable aliveCount | 8.8 rubric: combat loop green |
| 2+ waves | 90 s demo has "act 2" |
| Cleanup on restart | Ship without enemy ghosts |

Save: \`Lesson 8.6 - Arena Waves\`.

In **8.7** you will tune numbers in the same table rows. Do not duplicate HP in three scripts.

**Do now (5 min):** change one field in Config/table and confirm the new behavior in Play.`,
 },
 {
 title: "Lesson 62 hand-in checklist",
 content: `- [ ] waveConfig ≥2 rows (enemies + hp)
- [ ] spawnWave on the server
- [ ] aliveCount correct (not negative, not stuck)
- [ ] Transition 1→2 after clear
- [ ] Victory after last
- [ ] Cleanup + restart works
- [ ] Playtest 1-5 green
- [ ] Save Lesson 8.6 - Arena Waves

**Do now (3 min):** walk the checklist and tick only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Waves only in LocalScript",
 explanation: "Client can end a wave fake; desync.",
 correctApproach: "spawnWave + aliveCount on the server",
 },
 {
 mistake: "No aliveCount - next wave after wait(10)",
 explanation: "Too early or too late; not tied to combat.",
 correctApproach: "Died → aliveCount → next",
 },
 {
 mistake: "while true with no condition plus spawn",
 explanation: "Enemy avalanche, lag, crash.",
 correctApproach: "while over config index + wait for alive==0",
 },
 {
 mistake: "Restart without Destroy of old enemies",
 explanation: "Counter and scene lie.",
 correctApproach: "Cleanup Enemies before spawnWave(1)",
 },
 {
 mistake: "HP hardcoded in prefab, config ignored",
 explanation: "Wave 2 not harder.",
 correctApproach: "Set MaxHealth/Health from cfg.hp on clone",
 },
 {
 mistake: "Double Died → two spawnWave",
 explanation: "Wave 2+3 at once.",
 correctApproach: "cleaningWave flag or check aliveCount==0 once",
 }
 ],
 summary: "You built arena waves on waveConfig: server spawnWave, aliveCount, advance to next wave, and victory. The table drives difficulty - base for 8.7 balance and 8.8 Ship.",
 practiceTask: {
 title: "Wave schedule (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** 2+ waves from a table, clear → next → victory.

### Part A - Config and prefab (8 min)
1. waveConfig with 2-3 rows (enemies, hp, delay).
2. EnemyTemplate + SpawnPoint.
3. Clone with HP from config.

### Part B - Wave loop (14 min)
1. spawnWave(index) + aliveCount.
2. Died → when 0 → next (delay).
3. nil config → victory.
4. beginWaves with cleanup.

### Part C - Playtest (8 min)
1. Test table 1-6.
2. Clean restart.
3. **Save:** Lesson 8.6 - Arena Waves`,
 hints: [
 "1 enemy per wave first - easier to debug aliveCount",
 "print(waveIndex, aliveCount) on Died",
 "1-2 s delay between waves so you can see UI/print"
 ],
 optionalChallenge: "Billboard or TextLabel \"Wave N / M\", where M = #waveConfig.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 8.6?",
 options: [
          "Make a wave sequence via waveConfig on the server",
          "Remove Tool from the arena",
          "Build a Race track",
          "Publish without enemies"
        ],
 correctAnswer: 0,
 explanation: "Waves + config.",
 },
 {
 id: "q2",
 type: MC,
 question: "Why waveConfig table?",
 options: [
          "Replace Humanoid",
          "Change wave count/HP in one place",
          "Disable Anchored forever",
          "Create Skybox"
        ],
 correctAnswer: 1,
 explanation: "Combat schedule.",
 },
 {
 id: "q3",
 type: MC,
 question: "Where should aliveCount live?",
 options: [
          "Only in LocalScript for looks",
          "In Lighting",
          "On the server in arena state",
          "In the Part name"
        ],
 correctAnswer: 2,
 explanation: "Server truth.",
 },
 {
 id: "q4",
 type: MC,
 question: "When is it logical to call the next wave?",
 options: [
          "Every 0.01 s always",
          "Only when the sky changes",
          "When the player opened Explorer",
          "When aliveCount became 0 after clearing the current wave"
        ],
 correctAnswer: 3,
 explanation: "Wave cleared.",
 },
 {
 id: "q5",
 type: MC,
 question: "What if waveConfig[index] = nil?",
 options: [
          "Spawn 999 enemies",
          "Victory / end mode, do not spawn further",
          "Delete the arena",
          "Must crash the Place"
        ],
 correctAnswer: 1,
 explanation: "End of schedule.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why set HP from cfg on Clone?",
 options: [
          "Clone always ignores Humanoid",
          "It disables Died",
          "So different waves actually differ in toughness",
          "HP can be set only on the client"
        ],
 correctAnswer: 2,
 explanation: "Config applies.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why cleanup before restart?",
 options: [
          "Old enemies spoil the scene and counter",
          "Roblox requires Destroy every second",
          "Without it Tool disappears",
          "Cleanup replaces dealDamage"
        ],
 correctAnswer: 0,
 explanation: "Clean start.",
 },
 {
 id: "q8",
 type: MC,
 question: "What is the danger of while true with spawn and no condition?",
 options: [
          "Required faster combat always good",
          "while forbidden in Lua",
          "It creates a RemoteEvent",
          "Enemy avalanche and lag"
        ],
 correctAnswer: 3,
 explanation: "Controlled loop.",
 },
 {
 id: "q9",
 type: MC,
 question: "Where is it handy to keep EnemyTemplate?",
 options: [
          "Only in Terrain",
          "In SoundService as the only option",
          "ServerStorage (clone on the server)",
          "In the SpawnLocation name"
        ],
 correctAnswer: 2,
 explanation: "Prefab for clone.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why light task.wait between clones in one wave?",
 options: [
          "It replaces aliveCount",
          "Stagger spawn, less instant stacking",
          "Without wait Humanoid does not exist",
          "wait disables MaxHealth"
        ],
 correctAnswer: 1,
 explanation: "Soft spawn.",
 },
 {
 id: "q11",
 type: MC,
 question: "How does 8.6 prepare 8.7?",
 options: [
          "8.7 deletes all waves",
          "Balance needs no numbers",
          "Must forget the table",
          "Different hp in waveConfig can be measured and tuned"
        ],
 correctAnswer: 3,
 explanation: "Difficulty curve.",
 },
 {
 id: "q12",
 type: MC,
 question: "What is double spawnWave from two Died?",
 options: [
          "Bug: two next waves almost together",
          "Required Roblox feature",
          "That is victory",
          "How you set up i-frames"
        ],
 correctAnswer: 0,
 explanation: "Protection needed.",
 },
 {
 id: "q13",
 type: MC,
 question: "Minimum waves for hand-in?",
 options: [
          "Must be 50",
          "0 - only dummy without config",
          "At least 2 rows in waveConfig",
          "Client print only"
        ],
 correctAnswer: 2,
 explanation: "Act 2 exists.",
 },
 {
 id: "q14",
 type: MC,
 question: "Can player death stop waves?",
 options: [
          "Never in any game",
          "Waves exist only on the client",
          "Player death always deletes waveConfig",
          "Yes, if you decide that explicitly and write the rule"
        ],
 correctAnswer: 3,
 explanation: "Deliberate design rule.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 8.6 hand-in artifact?",
 options: [
          "Theory only without Play",
          "waveConfig + spawnWave + advance/victory + Save",
          "Empty Baseplate",
          "Waves only in LocalScript"
        ],
 correctAnswer: 1,
 explanation: "Wave loop required.",
 }
 ],
 },
}

export const enLesson87 = {
 lessonId: "lesson-roblox-8-7",
 moduleId: "module-08",
 order: 7,
 title: "8.7 - Combat balance playtest",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Run balance of player HP, enemy HP, and hit damage on numbers",
 "Find one-shot / \"eternal dummy\" / dull fight and record in a table",
 "Tune MaxHealth and dealDamage amount by school rules",
 "Check cooldown / i-frames so spam does not break balance",
 "Prepare stable numbers for Ship Arena (8.8)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 63 of 92)",
 content: `In **8.1-8.6** you built arena, Tool, server damage, feedback, death/respawn, and waves. Today you do **not** add a new genre. Today you **measure combat**.
Without this, 8.8 Ship fails on feel: either the player dies in 1 hit, or the wave is dull.

**Do now (3 min):** write current numbers: Player MaxHealth, Enemy MaxHealth, damage per hit, cooldown if any.`,
 },
 {
 title: "Balance ≠ \"make it harder\"",
 content: `| Bad balance | Good training balance |
|----------------|---------------------------|
| Player one-shot | 3-8 enemy hits to player death (guide) |
| Enemy always one-shot | 3-10 hits to kill dummy/wave 1 |
| Fight 5+ min on one | Wave 1 fits in ~20-40 s |
| Random "too easy then impossible" | Predictable numbers from table/constants |

Kitchen scales. You do not "get angry at soup", you **add salt gradually** and taste again.

School: we tune balance with **constants** (MaxHealth, damage, cooldown), not "magic in 20 copy-paste places".

**Do now (5 min):** run one track/lap segment and confirm the counter/time updated.`,
 },
 {
 title: "What exactly we measure",
 content: `| Metric | How to measure | Why |
|---------|-----------|--------|
| **Enemy TTK** (time to kill) | Stopwatch: start hits → enemy 0 HP | Wave pace |
| **Player TTD** (time to die) | Hits/time until your death | Difficulty |
| **Hits to kill** | MaxHealth / damage (integer) | Quick estimate |
| **Spam DPS** | Hits without cooldown | Is combat broken |
| **After respawn** | Death → i-frames → back into fight | Not "death loop" |

Guide formula:

\`hitsToKillEnemy ≈ enemyMaxHealth / damagePerHit\`
\`hitsToKillPlayer ≈ playerMaxHealth / enemyDamagePerHit\`

If hitsToKillEnemy = 1 always - lower damage or raise enemy HP.  
If hitsToKillPlayer = 1 - lower enemy damage or raise player HP.

**Do now (4 min):** run one check from this section in Play and write the result in your Note.`,
 },
 {
 title: "Balance playtest table",
 content: `Copy into a note and fill with facts from Play:

| # | Scenario | Expect | Fact (s / hits) | Verdict |
|---|----------|------------|------------------|---------|
| 1 | Wave 1 / 1 dummy, honest hits | 3-10 hits | | |
| 2 | Same, click spam | Not 10x faster if CD exists | | |
| 3 | Damage to you (if enemy hits) | Not one-shot | | |
| 4 | Full wave 1 | ≤40-60 s | | |
| 5 | Wave 2 (if any) | A bit harder, not a wall | | |
| 6 | Death → respawn | i-frames, can return | | |
| 7 | Output | No red | | |

Verdict: **ok / easy / hard / broken**.  
Broken = one-shot or immortal dummy from a bug (damage not applied).

**Do now (5 min):** run the test table once and write pass/fail for each row.`,
 },
 {
 title: "Where to tune numbers (one source of truth)",
 content: `Bad: damage = 25 in Tool LocalScript, 40 on server, 10 in a comment.

Good: constants in one Script/Module:

\`local BALANCE = {\`
\` playerMaxHealth = 100,\`
\` enemyHpWave1 = 80,\`
\` enemyHpWave2 = 120,\`
\` damagePerHit = 20,\`
\` hitCooldown = 0.4,\`
\` respawnIFrames = 1.5,\`
\`}\`

On PlayerAdded / CharacterAdded set Humanoid.MaxHealth and Health from BALANCE.  
In dealDamage take \`BALANCE.damagePerHit\`, not "magic 999".

Waves from 8.6: \`waveConfig[i].hp\` should align with this table.

**Do now (5 min):** find all places with damage/HP numbers and gather at least into one block with comment "BALANCE".`,
 },
 {
 title: "Typical symptoms and fixes",
 content: `| Symptom | Likely cause | Fix |
|---------|------------------|------|
| Enemy falls in 1 hit | damage ≥ MaxHealth | ↓ damage or ↑ HP |
| I hit forever, HP does not drop | dealDamage not called | Bug first, not balance |
| Player one-shot | Enemy damage high / no i-frames | ↓ damage, ↑ HP, i-frames |
| Spam = instant wave | No hitCooldown | Server cooldown |
| Wave 2 impossible | HP * 5 with no damage change | Raise HP gradually (+20-50%) |
| Dull | hitsToKill > 15 | ↑ damage or ↓ HP |

Rule: **fix broken first**, then easy/hard. Do not balance a bug.

**Do now (3 min):** find one symptom from the table in the Place and fix it or confirm it is gone.`,
 },
 {
 title: "Tuning protocol (15 min sprint)",
 content: `1. Fill rows 1-3 of the table with facts.
2. Pick the **worst** verdict (broken > hard > easy).
3. Change **one** number in BALANCE.
4. Repeat the same test.
5. Record the new value.
6. Repeat for the second problem.

Example log:
- Was: damage 50, enemy 50 → 1 hit (easy/broken).
- Now: damage 20, enemy 80 → 4 hits (ok).
- Was: player one-shot from 80 damage.
- Now: enemyDamage 15, player HP 100 → ~7 hits.

Do not turn 5 variables at once - you will not know what helped.

**Do now (4 min):** run one check from this section in Play and write the result in your Note.`,
 },
 {
 title: "Cooldown, i-frames, and \"honest\" pace",
 content: `Number balance without pace still breaks:

- **hitCooldown** on the server: even if animation is short, damage no more than once per N s.
- **i-frames** after respawn: 1-2 s without damage, otherwise death loop near wave spawn.
- **Animation vs damage:** if animation is 0.8 s and damage every 0.1 s - feels like "cheat". Align them.

Spam test (table row 2): hold button/click 3 s. Real dealDamage count should be ≈ time / cooldown, not 60.

**Do now (6 min):** print on the server every successful hit with os.clock() - you will see intervals.`,
 },
 {
 title: "Waves: difficulty curve lite",
 content: `| Wave | HP idea | Count idea |
|-------|---------|----------------|
| 1 | Base enemyHp | 1-2 |
| 2 | +25-50% HP or +1 enemy | Not both maxima at once |
| 3 (optional) | Another step or "boss" 2x HP | One boss beats 10 clones |

Check: wave 1 - learn the hit. Wave 2 - a bit of pressure. Not "wave 1 = god, wave 2 = impossible".

If waveConfig is still thin - for 8.7 two table rows with different hp is enough.

**Do now (5 min):** change one field in Config/table and confirm the new behavior in Play.`,
 },
 {
 title: "Lesson 63 hand-in checklist + bridge to 8.8",
 content: `- [ ] Starting HP / damage / cooldown numbers written out
- [ ] Test table 1-7 with facts
- [ ] ≥2 live tunings with log "was → now"
- [ ] No player one-shot on base enemy (or documented as P0)
- [ ] Wave 1 enemy does not die in 1 hit (or deliberate training one-hit with a label)
- [ ] Spam does not give insane DPS (cooldown exists or explained)
- [ ] Respawn not in death loop (i-frames lite)
- [ ] Save: Lesson 8.7 - Arena Balance

Next **8.8 Ship Arena** stitches systems with a rubric. If TTK is "broken" today - tomorrow the 90 s demo will be shame, not wow.

**Do now (3 min):** walk the checklist and tick only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Tune balance while damage is not applied at all",
 explanation: "You are \"balancing\" a bug.",
 correctApproach: "print dealDamage first, then numbers",
 },
 {
 mistake: "Change 7 constants at once",
 explanation: "Unclear what helped.",
 correctApproach: "One number → one test",
 },
 {
 mistake: "Leave one-shot \"because funny\"",
 explanation: "Ship demo looks broken.",
 correctApproach: "3-10 hits on wave 1",
 },
 {
 mistake: "No hitCooldown on the server",
 explanation: "Spam breaks any HP.",
 correctApproach: "Server cooldown in dealDamage",
 },
 {
 mistake: "Different damage numbers in 4 scripts",
 explanation: "Balance drifts tomorrow.",
 correctApproach: "One BALANCE table",
 },
 {
 mistake: "Ignore death loop after respawn",
 explanation: "Player gets angry faster than from wave difficulty",
 correctApproach: "i-frames 1-2 s",
 }
 ],
 summary: "You ran arena balance playtest: measured TTK/hits, gathered numbers into BALANCE, made at least 2 tunings, and checked cooldown/i-frames. Lesson 63 prepares stable combat for Ship Arena in 8.8.",
 practiceTask: {
 title: "Balance lab (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** predictable combat on numbers before Ship.

### Part A - Measure (8 min)
1. Write current HP / damage / cooldown.
2. Fill scenario table 1-4 with facts (stopwatch + hit tally).
3. Mark easy / hard / broken.

### Part B - Tunings (15 min)
1. Gather numbers into BALANCE (or one constants block).
2. Make ≥2 changes (one at a time).
3. Repeat the same tests; record was → now.
4. Add/check hitCooldown and i-frames if rows 2 or 6 are red.

### Part C - Ship readiness (7 min)
1. Wave 1 fits a comfortable time.
2. No one-shot (or P0 recorded).
3. **Save:** Lesson 8.7 - Arena Balance`,
 hints: [
 "Phone stopwatch + hit tally is enough",
 "print(damage, humanoid.Health) on the server",
 "Do not touch VFX while TTK is broken"
 ],
 optionalChallenge: "Separate BALANCE row for \"boss wave\" with 2x HP and a short note on an arena sign.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 8.7?",
 options: [
          "Run and tune HP/damage balance before Ship",
          "Delete dealDamage",
          "Build a Race track",
          "Publish without playtest"
        ],
 correctAnswer: 0,
 explanation: "Combat balance.",
 },
 {
 id: "q2",
 type: MC,
 question: "What is TTK in this lesson?",
 options: [
          "RemoteEvent name",
          "Time (or hits) to kill an enemy",
          "Terrain type",
          "Decal count"
        ],
 correctAnswer: 1,
 explanation: "Time to kill.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why is one-shot on wave 1 bad for ship?",
 options: [
          "Roblox forbids MaxHealth 100",
          "Tool then does not exist",
          "Demo looks broken, no combat feel",
          "Output always red"
        ],
 correctAnswer: 2,
 explanation: "Pace required.",
 },
 {
 id: "q4",
 type: MC,
 question: "Where is it better to keep balance numbers?",
 options: [
          "In 10 different places with different figures",
          "Only in the Part name",
          "Only in Skybox",
          "In one BALANCE / constants"
        ],
 correctAnswer: 3,
 explanation: "One source of truth.",
 },
 {
 id: "q5",
 type: MC,
 question: "What first if enemy HP does not drop?",
 options: [
          "Immediately MaxHealth = 1",
          "Check whether dealDamage is called (bug), do not tune balance blind",
          "Delete the arena",
          "Disable Humanoid forever"
        ],
 correctAnswer: 1,
 explanation: "Bug ≠ balance.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why server hitCooldown?",
 options: [
          "To change floor Material",
          "It replaces MaxHealth",
          "So click spam does not break DPS and balance",
          "Cooldown draws Billboard"
        ],
 correctAnswer: 2,
 explanation: "Hit pace.",
 },
 {
 id: "q7",
 type: MC,
 question: "How many variables to turn in one test?",
 options: [
          "Better one, to understand the effect",
          "Must all at once",
          "Never any",
          "Only sword color"
        ],
 correctAnswer: 0,
 explanation: "Controlled experiment.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why i-frames in balance playtest?",
 options: [
          "Increase sword damage",
          "Disable waves",
          "Replace waveConfig",
          "Avoid death loop right after respawn"
        ],
 correctAnswer: 3,
 explanation: "Life cycle after death.",
 },
 {
 id: "q9",
 type: MC,
 question: "hitsToKill guide for training wave 1?",
 options: [
          "Always exactly 100",
          "0 hits",
          "About several to a dozen hits, not 1 and not 50",
          "Only via Teleport"
        ],
 correctAnswer: 2,
 explanation: "Comfortable pace.",
 },
 {
 id: "q10",
 type: MC,
 question: "How to raise wave 2 difficulty?",
 options: [
          "Immediately HP * 100",
          "Gradually +HP or +count, not both maxima together",
          "Remove all player damage",
          "Delete Tool"
        ],
 correctAnswer: 1,
 explanation: "Curve lite.",
 },
 {
 id: "q11",
 type: MC,
 question: "Minimum live tunings in practice?",
 options: [
          "0 - theory only",
          "Must be 50",
          "Only sky change",
          "At least 2 with was → now log"
        ],
 correctAnswer: 3,
 explanation: "Numbers practice.",
 },
 {
 id: "q12",
 type: MC,
 question: "How does 8.7 prepare 8.8?",
 options: [
          "Stable numbers → Ship 90 s demo does not collapse on one-shot",
          "8.8 forbids MaxHealth",
          "Balance cancels the rubric",
          "Must delete waves before Ship"
        ],
 correctAnswer: 0,
 explanation: "Ship readiness.",
 },
 {
 id: "q13",
 type: MC,
 question: "What to write in the playtest table?",
 options: [
          "Only \"I feel like\"",
          "Only a Plugins list",
          "Facts: seconds/hits and verdict ok/easy/hard/broken",
          "Ambient color"
        ],
 correctAnswer: 2,
 explanation: "Measurement proof.",
 },
 {
 id: "q14",
 type: MC,
 question: "Why is different damage on client and server bad?",
 options: [
          "Studio then does not save Place",
          "Humanoid disappears",
          "Required for ParticleEmitter",
          "Balance and combat truth drift apart"
        ],
 correctAnswer: 3,
 explanation: "One number truth.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 8.7 hand-in artifact?",
 options: [
          "Theory only without Play",
          "Test table + ≥2 tunings + more stable combat + Save",
          "Empty Baseplate",
          "Deliberate one-shot with no note"
        ],
 correctAnswer: 1,
 explanation: "Balance proof required.",
 }
 ],
 },
}

export const enLesson88 = {
 lessonId: "lesson-roblox-8-8",
 moduleId: "module-08",
 order: 8,
 title: "8.8 - Ship Arena",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Stitch the arena into one golden path: enter → fight → wave → death/respawn",
 "Walk the Ship Arena rubric (~15 items) and close blockers",
 "Confirm damage goes through server dealDamage, not from the client",
 "Show combat feedback (animation / tween / particles) without breaking balance",
 "Save the Place as the module 8 artifact before Race (M9)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 64 of 92)",
 content: `This is the **Arena module finale**. Not a new arena from scratch and not "one more Tool". Today you **stitch** what you already have into combat you can show in 90 seconds.

In module 8 you (or the group) built:
1. **8.1** - Humanoid Health / arena build.
2. **8.2** - Tool + swing animation.
3. **8.3** - dealDamage on the server (Never trust client).
4. **8.4** - TweenService + Particles as feedback.
5. **8.5** - death, respawn, i-frames lite.
6. **8.6** - waves via waveConfig table.
7. **8.7** - HP / damage balance playtest.

Today's artifact: **one Place** where a player without a coach:
**enters the arena → understands the goal → hits with Tool → enemy/wave reacts → HP is visible → death/respawn are honest → next wave or victory.**

If a system is still missing - make a **lite** path specifically (1 enemy type, 2 waves, 1 Tool), not three unfinished Places.

**Do now (3 min):** write the arena golden path in one sentence. If you cannot - arrows on paper first.`,
 },
 {
 title: "What Ship Arena means (and what it does not)",
 content: `| Ship Arena | Not ship yet |
|------------|-----------|
| Arena + Tool + damage + wave **together** | Separate "pretty sword" and separate dummy with no link |
| Damage via **server** dealDamage | LocalScript sets enemy Health = 0 alone |
| Player sees HP / hit feedback | Only print in the instructor Output |
| Death → respawn without crash | Stuck in void / death spam without i-frames |
| Clean Output on 1-2 waves | Red errors "we ignore" |
| 60-90 s demo without explanations | 5 min "now I will show where enemy spawn is" |

Ship does **not** mean AAA shooter. It means: **a short full fight is already assembled**, named, and honest about damage.

After this lesson, module 9 (Race) will carry the habit: **server decides critical numbers** (here HP/damage, there laps/finish).

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Map of systems we stitch",
 content: `| System | Where it lives | What it gives the golden path |
|---------|---------|------------------------|
| Arena / barriers | Workspace | Fight space, no void fall |
| Health / MaxHealth | Humanoid | Player and enemy life |
| Tool + animation | Backpack / Character | Hit is visible |
| dealDamage | Server Script / Module | Damage truth |
| Tween / Particles | Feedback on hit | "Wow, I hit" |
| Death + respawn + i-frames | Server + Character | Cycle after death |
| waveConfig | Table on the server | Waves 1→2→… |

Integration rule: **one truth about damage and HP** - on the server. Client shows animation/effect, but does not "kill alone".

**Do now (4 min):** in Explorer find dealDamage script, Tool, wave spawn, arena zone. What is missing - P0 for today.`,
 },
 {
 title: "Arena golden path (6-8 steps)",
 content: `Write **before** fixes:

1. Spawn near entrance / sign "Take weapon, survive N waves".
2. Pick up Tool (or already in StarterPack).
3. Enter arena → wave 1 spawns enemy/dummy.
4. Hit → server dealDamage → HP drops / feedback (particle/tween).
5. Enemy dies → wave progress / next from waveConfig.
6. If you die - respawn + short i-frames, wave state clear.
7. After last wave - victory (UI or Part "YOU WIN").
8. Output without red on the path.

This is "integration". Not "all features in files", but **the player feels combat**.

Lite substitute: if waves are few - 1 dummy + 1 "boss" with higher MaxHealth is enough for ship.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Ship Arena rubric (~15 items)",
 content: `Mark **yes / no / almost**. Goal: maximum **yes** on the golden path.

### A. Space and start (1-4)
| # | Item | Yes? |
|---|-------|------|
| 1 | Spawn / entrance clear, Tool available | |
| 2 | Sign states goal ≤30-60 s reading | |
| 3 | Arena holds the player (borders / floor) | |
| 4 | Names/folders readable (Arena/, Enemies/, Tools/) | |

### B. Combat loop (5-8)
| # | Item | Yes? |
|---|-------|------|
| 5 | Hit actually removes HP (visible or leaderstats/bar) | |
| 6 | Feedback exists (animation and/or particle/tween) | |
| 7 | Wave or next enemy appears after previous death | |
| 8 | Player death → respawn without Place crash | |

### C. Damage honesty (9-12)
| # | Item | Yes? |
|---|-------|------|
| 9 | dealDamage on the server (not only client Health=) | |
| 10 | Client cannot kill everyone with one LocalScript "cheat" without server | |
| 11 | Lite protection: hit cooldown / distance check / Tool equipped | |
| 12 | i-frames or immunity after respawn (at least 1-2 s) | |

### D. Ship quality (13-15)
| # | Item | Yes? |
|---|-------|------|
| 13 | Output clean on 1-2 waves | |
| 14 | 60-90 s demo without a coach | |
| 15 | Save Lesson 8.8 - Arena Ship | |

Every "no" in B/C = Part B fix list. Do not draw a second arena - close the loop.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Typical arena integration gaps",
 content: `| Symptom | Likely cause | Quick fix |
|---------|------------------|--------------|
| Sword swings, HP stands | Damage only visual / does not call dealDamage | Wire hit → server |
| Dummy dies from client directly | LocalScript writes Health | Remove; server only |
| Wave 2 never starts | No "all enemies dead" listener | alive counter in waveConfig |
| Respawn death spam | No i-frames | Short immunity after LoadCharacter |
| Particles lag | Emitter every frame without Destroy | One burst + cleanup |
| Balance "one-shot" | Damage > enemy / player MaxHealth | Tune from 8.7 notes |

**Do now (6 min):** walk the path once and mark the first red rubric item. Fix it before new decor.`,
 },
 {
 title: "Mini scheme: damage and wave",
 content: `On the server:

\`dealDamage(targetHumanoid, amount, sourcePlayer)\`
\` - check target exists\`
\` - check amount is number and > 0\`
\` - (lite) distance source → target\`
\` - (lite) cooldown on sourcePlayer\`
\` - Humanoid:TakeDamage(amount) or Health = math.max(0, Health - amount)\`

Waves (8.6 reminder):

\`waveConfig = {\`
\` { enemies = 2, hp = 50 },\`
\` { enemies = 3, hp = 60 },\`
\`}\`

\`spawnWave(index)\` clones NPC, sets MaxHealth/Health from config, keeps \`aliveCount\`.  
When \`aliveCount == 0\` → \`spawnWave(index + 1)\` or victory.

Client: Tool animation / sound / "attacking" request (if Remote already exists). Server: how much HP to remove.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Arena onboarding in 8 minutes",
 content: `A newcomer in combat gets lost: unclear whether to hit the dummy, wait for a wave, or where to get the sword.

Minimum at start:
- sign with 2-3 steps;
- bright arena floor color / entrance barrier;
- Tool in StarterPack or Part "Pick weapon" with a hint.

Text:
*"1) Take the sword. 2) Enter the red arena. 3) Clear enemy waves."*

Check: step away from the monitor and come back - is the entrance visible without your words?

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Integration playtest (checklist)",
 content: `| # | Action | Expect | Fact |
|---|-----|------------|------|
| 1 | New Play | Spawn + Tool OK | |
| 2 | Enter arena | Wave / dummy appears | |
| 3 | Hit | HP drops on the server | |
| 4 | Feedback | Animation/particle at least once | |
| 5 | Finish enemy | Wave progresses / victory | |
| 6 | Fake Health on client (if you can) | Enemies do not "fall alone" from pure client | |
| 7 | Player death | Respawn + i-frames | |
| 8 | Second wave | No crash, config read | |
| 9 | Output | No red | |
| 10 | 90 s demo | You fit | |

Rows 3-7 are the Ship Arena heart. Without them rubric C is red.

**Do now (3 min):** walk the checklist and tick only items you really finished.`,
 },
 {
 title: "What to deliberately postpone",
 content: `Do not do today:
- 12 enemy types and a skill tree;
- full weapon shop on Remotes (closer to M10);
- Ideal CameraMode for an hour;
- Publish Public (closer to M12);
- open-world around the arena.

Do today:
- **one** combat MVP;
- server dealDamage;
- 2 waves from waveConfig;
- respawn + rubric + Save.

Everything "I want more" - into a note for polish / M11. Ship likes a narrow winning circle.

**Do now (4 min):** one hit/hazard in Play - Health must change on the server, not in a LocalScript.`,
 },
 {
 title: "Lesson 64 hand-in checklist + bridge to M9",
 content: `- [ ] Golden path written
- [ ] Rubric ~15 items filled
- [ ] Damage on the server (dealDamage)
- [ ] Tool + some feedback
- [ ] Waves or clear "kill → next" loop
- [ ] Death / respawn without crash
- [ ] i-frames lite or equivalent
- [ ] Playtest table at least once
- [ ] 60-90 s demo
- [ ] Save Lesson 8.8 - Arena Ship

Next **module 9 Race**: same discipline "server decides", but for laps and finish. If the damage register is still on the client - do **not** go into Race proudly: close arena rubric C first.

**Do now (3 min):** walk the checklist and tick only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Damage only in LocalScript (Health = 0 on client)",
 explanation: "Cheat and desync with waves.",
 correctApproach: "dealDamage on the server",
 },
 {
 mistake: "Three Places: Tool / dummy / waves separate",
 explanation: "No integrated combat.",
 correctApproach: "One Place, one golden path",
 },
 {
 mistake: "Wave 2 never starts",
 explanation: "No living enemy count.",
 correctApproach: "aliveCount + waveConfig next index",
 },
 {
 mistake: "Rubric \"almost\", but demo needs a coach",
 explanation: "Not ship for the player.",
 correctApproach: "Onboarding + 90 s without explanations",
 },
 {
 mistake: "No i-frames after respawn",
 explanation: "Instant re-death near enemy spawn.",
 correctApproach: "1-2 s immunity",
 },
 {
 mistake: "Inflate to 10 enemies instead of closing 2 waves",
 explanation: "Hour vanishes, blockers remain.",
 correctApproach: "2 MVP waves + stable damage",
 }
 ],
 summary: "You shipped Arena: one golden path where Tool, server damage, waves, and respawn work together. Rubric and playtest confirm a 60-90 s demo - base before Race in module 9.",
 practiceTask: {
 title: "Ship Arena: stitch and hand in (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** one Place with integrated combat enter → hit → wave → respawn.

### Part A - Map and rubric (8 min)
1. Write golden path 6-8 steps.
2. Walk rubric ~15 items in Play.
3. List P0 from blocks B and C.

### Part B - Integration fixes (15 min)
1. Hits go to server dealDamage.
2. Lite cooldown / distance (if still missing).
3. Wave 2 from waveConfig or victory after last.
4. Respawn + i-frames lite.
5. At least one feedback (animation or particle).

### Part C - Demo and Save (7 min)
1. Playtest table 1-10.
2. Rehearse 60-90 s demo.
3. **Save:** Lesson 8.8 - Arena Ship
4. Practice is done when the rubric has maximum "yes" and Output is clean.`,
 hints: [
 "Server damage first, then VFX beauty",
 "2 waves are enough for ship",
 "If no HP UI - default Humanoid Health bar is OK for hand-in"
 ],
 optionalChallenge: "Short TextLabel \"Wave N / M\" from server truth after each wave starts.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 8.8?",
 options: [
          "Stitch the arena into one golden path and close the Ship rubric",
          "Delete Tool and waves",
          "Start Race track from scratch",
          "Publish Public required today"
        ],
 correctAnswer: 0,
 explanation: "Arena integration.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where should damage truth live?",
 options: [
          "Only in LocalScript Health=",
          "On the server in dealDamage",
          "In Lighting Ambient",
          "In the arena Part name"
        ],
 correctAnswer: 1,
 explanation: "Never trust client.",
 },
 {
 id: "q3",
 type: MC,
 question: "What is the arena golden path?",
 options: [
          "List of all Plugins in Studio",
          "Required open-world",
          "Short player route from enter to victory/loop without a coach",
          "Only Skybox change"
        ],
 correctAnswer: 2,
 explanation: "Integrated combat.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why i-frames after respawn?",
 options: [
          "To disable Tool forever",
          "It replaces waveConfig",
          "i-frames draw Terrain",
          "So you do not die instantly again near danger"
        ],
 correctAnswer: 3,
 explanation: "Protection after death.",
 },
 {
 id: "q5",
 type: MC,
 question: "What does rubric block C check?",
 options: [
          "Only barrier color",
          "Damage honesty: server, anti-client one-shot, cooldown/distance",
          "Module 1 name",
          "Decal count in Toolbox"
        ],
 correctAnswer: 1,
 explanation: "Combat safety.",
 },
 {
 id: "q6",
 type: MC,
 question: "How are waves tied to ship?",
 options: [
          "Waves are only decorative Parts",
          "waveConfig lives only on the client as TextLabel",
          "After enemies die, next from waveConfig or victory must start",
          "Waves forbidden in Arena"
        ],
 correctAnswer: 2,
 explanation: "Combat loop.",
 },
 {
 id: "q7",
 type: MC,
 question: "What NOT to do in 8.8?",
 options: [
          "Build 12 enemy types and a weapon shop instead of closing the loop",
          "Walk the rubric",
          "Check dealDamage",
          "Save the Place"
        ],
 correctAnswer: 0,
 explanation: "Narrow MVP.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why feedback (animation/particles)?",
 options: [
          "It disables server damage",
          "Without it Humanoid does not exist",
          "Particles replace MaxHealth",
          "Player feels the hit, not only dry HP numbers"
        ],
 correctAnswer: 3,
 explanation: "Combat feel.",
 },
 {
 id: "q9",
 type: MC,
 question: "If the sword swings but HP stands - what first?",
 options: [
          "Delete the arena",
          "Change only Sky",
          "Check whether server dealDamage is called",
          "Turn Output off"
        ],
 correctAnswer: 2,
 explanation: "Hit → damage link.",
 },
 {
 id: "q10",
 type: MC,
 question: "How long is the target Ship demo?",
 options: [
          "Must be 40 minutes of explanations",
          "About 60-90 seconds without a coach",
          "Opening Explorer is enough",
          "Screenshot only without Play"
        ],
 correctAnswer: 1,
 explanation: "Short demo.",
 },
 {
 id: "q11",
 type: MC,
 question: "How does 8.8 prepare module 9 Race?",
 options: [
          "Race forbids server scripts",
          "Must delete the whole arena from memory",
          "In Race only the client writes damage",
          "Habit \"server decides critical numbers\" moves to laps/finish"
        ],
 correctAnswer: 3,
 explanation: "Server discipline.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why lite cooldown / distance check?",
 options: [
          "So spam and hits \"across half the map\" do not break combat",
          "To disable Humanoid",
          "Required for Decal",
          "Cooldown draws Billboard"
        ],
 correctAnswer: 0,
 explanation: "dealDamage protection.",
 },
 {
 id: "q13",
 type: MC,
 question: "Which of these is P0 for the arena?",
 options: [
          "Slightly crooked wall color",
          "Imperfect Ambient",
          "Damage or kill fully on the client without server",
          "Small Billboard offset"
        ],
 correctAnswer: 2,
 explanation: "Critical combat hole.",
 },
 {
 id: "q14",
 type: MC,
 question: "Why one Place instead of three separate?",
 options: [
          "Studio allows only one Place in a lifetime",
          "Three Places always faster",
          "Rubric forbids folders",
          "Otherwise there is no integrated golden path for the demo"
        ],
 correctAnswer: 3,
 explanation: "Integration.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 8.8 hand-in artifact?",
 options: [
          "Theory only without Studio",
          "Golden path + rubric + server damage/waves + Save",
          "Empty Baseplate",
          "Client Health= without server"
        ],
 correctAnswer: 1,
 explanation: "Arena ship required.",
 }
 ],
 },
}
