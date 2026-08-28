/** Roblox Module 11 EN - 6 уроків (prod-92), фінал 11.6 сліпий playtest */
import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson111 = {
 lessonId: "lesson-roblox-11-1",
 moduleId: "module-11",
 order: 1,
 title: "11.1 - Explorer Audit",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Audit Explorer and find clutter: Part, Script, duplicates",
 "Introduce a naming standard and prefixes for Parts, UI, NPC, Scripts, Audio",
 "Sort objects into Folders in Workspace, RS, SSS, StarterGui",
 "Remove or disable unsafe/extra Scripts from Free Models",
 "Save a clean Place as the base for loading, juice, and Demo Ready"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 81 of 92)",
 content: `This is the **start of the Polish module**. Next come loading, sound/VFX, optimization, Demo Ready, and a blind test. All of that falls apart if Explorer is chaos.

Today you do an **audit and cleanup** - but with a **quick wow**, not "cleanup for perfection":
1. Open your biggest / best Place.
2. Take a **before measure**: how many unnamed \`Part\`/\`Script\` + how many seconds to find the main system Script.
3. Folders, names, Toolbox clutter.
4. **After measure** + a small wow on Save (Neon sign \`Polish_Ready\` or a short SFX).

Speed: when the shop breaks tomorrow, you find \`Srv_Shop\` in \`ServerScriptService/Systems\` in 10 s, not among 80 items named \`Script\`.

**Do now (3 min) - "before" measure:**
1. Count unnamed \`Part\` + \`Script\` → number A.
2. Start a timer: find your main server Script for the shop/loop (or the most important Script) in Explorer. Record seconds T1.
3. That is your "chaos debt". By the end of the lesson A and T1 should be smaller.`,
 },
 {
 title: "Why a clean Explorer (for ages 9-13 and for the teacher)",
 content: `| Messy Explorer | Clean Explorer |
|----------------|----------------|
| Bug hunt takes 20 min | Bug hunt takes 2 min |
| Friend/teacher gets lost | You can show structure in 30 s |
| Duplicate logic | One truth in one folder |
| Scary to delete anything | Clutter is visible at once |

At SHOWCASE they sometimes ask: "show how it is organized". Clean folders look like developer work, not a random pile of blocks.

Also: optimization (11.4) and juice (11.3) are easier when effects and sounds live in clear places.

**Do now (4 min):** rename 3 objects in Explorer by role, not by Script number.`,
 },
 {
 title: "Naming standard (simple and strict)",
 content: `| Was | Became |
|-----|--------|
| Part | Wall_North / Floor_Hub |
| Script | Srv_CoinService / Cli_HUD |
| Frame | UI_ShopPanel |
| Model | NPC_Guide_Maya |
| Sound | SFX_Reward / AMB_Hub |

Rules:
1. **English Latin letters** for object names (use your language for UI Text labels).
2. **PascalCase or Prefix_Name** - no spaces or emoji in Name.
3. The name says **what it is**, not \`fff\`, \`new\`, \`copy2\`.
4. Same scheme across the whole Place.

Prefixes that work well in this course:
- \`NPC_\` - characters
- \`UI_\` - interface elements
- \`SFX_\` / \`AMB_\` - sounds
- \`FX_\` - effects
- \`Srv_\` - server Scripts
- \`Cli_\` - LocalScripts

**Do now (8 min):** rename the 10 worst names in Workspace. Do not touch logic yet - Name only.`,
 },
 {
 title: "Folder map \"course standard\"",
 content: `Bring the Place closer to this layout (adapt to your genre):

Workspace:
- Hub/
- PlayZone/ (or Obby / Arena / Farm)
- NPCs/
- Props/

ReplicatedStorage:
- Remotes/
- Config/
- Audio/ (optional)

ServerScriptService:
- Systems/

StarterGui:
- HUD/
- (later LoadingGui in 11.2)

ServerStorage:
- Tools/ / Templates/ (if you have them)

It does not need to be a perfect copy of this scheme. Required: **logical piles**, not everything in the Workspace root.

How to move: select objects → drag into a Folder. If a Model matters - group first, then put it in a folder.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Audit checklist (top to bottom)",
 content: `| # | Question | If "no" |
|---|----------|----------|
| 1 | Less clutter at Workspace root? | Create Folders, sort |
| 2 | No pile of unnamed \`Part\` / \`Script\`? | Rename |
| 3 | Remotes in one place? | Gather in ReplicatedStorage/Remotes |
| 4 | No two identical ShopGui? | Keep one, Disable/Delete the other |
| 5 | Free Model Scripts reviewed? | Delete suspicious / unknown |
| 6 | Anchored on static where needed? | Enable so things do not fall |
| 7 | No test Parts named "DeleteMe"? | Delete |
| 8 | Can you explain structure to the teacher in 20 s? | Simplify more |

Walk the checklist like a test. Each "no" = a task for Part B practice.

**Do now (5 min):** mark yes/no on the table for your Place.`,
 },
 {
 title: "Toolbox clutter: how not to break the Place",
 content: `Free Models often bring:
- hidden Scripts;
- require of external modules;
- spam Sounds / ParticleEmitter;
- duplicates of systems you already have.

Audit rule:
1. If you insert a model - expand it in Explorer right away.
2. Find all Scripts / LocalScripts.
3. If you do not understand the code and it is not needed for the mesh - **delete the Script**, keep the geometry.
4. Never leave a "magic" Script "because otherwise the model will not stand" unless you verified it.

Safer for the course: your own Parts + your own Scripts. Model - decoration only, no logic.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Duplicates - the quiet killer",
 content: `| Symptom | Likely cause |
|---------|--------------|
| Coins awarded twice | Two Scripts on Touched |
| Two HUDs | Two ScreenGui in StarterGui |
| Remote not found / wrong one | Two Remotes with different paths |
| Loading + old GUI | Extra screen from a past test |

How to find duplicates:
1. In Explorer search type \`Shop\`, \`HUD\`, \`Coin\`, \`Remote\`.
2. If you see 2+ similar - decide which is primary.
3. Extra: Disabled = true first, check Play, then Delete.

Do not delete both "just in case". Keep one working path.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Server / client / shared - what lives where",
 content: `| Place | What to put |
|-------|-------------|
| ServerScriptService | Reward logic, shop on server, DataStore |
| StarterGui / StarterPlayerScripts | LocalScripts for UI, camera, local effects |
| ReplicatedStorage | Remotes, Config ModuleScript, shared templates |
| Workspace | World, triggers, NPC models |
| ServerStorage | Things players should not see directly (Tool templates) |

Typical mistake: put an important server Script inside a Workspace Part and forget. Or a LocalScript in SSS - it will not work as you expect.

During the audit simply check: is there a LocalScript where the server should be, and the other way around.

**Do now (4 min):** do save/load or honestly document mock mode in Output.`,
 },
 {
 title: "Mini-standard for Config and Remotes",
 content: `Even if Config is still thin:
- one ModuleScript \`GameConfig\` or \`EconomyConfig\` in ReplicatedStorage/Config;
- not three copies of price tables in different Scripts.

Remotes:
- folder ReplicatedStorage/Remotes;
- names \`BuyItem\`, \`QuestFinished\` - not \`RemoteEvent1\`.

If you have no time to rewrite logic today - at least **move and rename**, so 11.2-11.5 tomorrow do not hunt for a needle.

**Do now (7 min):** create Remotes and Systems folders (if missing) and put what already exists there.`,
 },
 {
 title: "Cleanup sprint order for 60′",
 content: `| Min | Action |
|-----|--------|
| 0-5 | Yes/no checklist + "before" screenshot (optional) |
| 5-20 | Folders + move from Workspace root |
| 20-35 | Rename Part/Script/UI |
| 35-45 | Duplicates + audit Scripts from models |
| 45-50 | Quick Play: world did not fall apart |
| 50-55 | Small Anchored / visibility fixes |
| 55-60 | Save |

Do not start with a perfect prefix on 200 objects if the root is still a dump. First **structure**, then names.

**Do now (4 min):** rename 3 objects in Explorer by role, not by Script number.`,
 },
 {
 title: "How to hand in the \"audit\" to the teacher in 40 s",
 content: `Show:
1. Workspace root with Hub / PlayZone / NPCs folders.
2. ReplicatedStorage/Remotes (or say Remotes are coming - but the place is ready).
3. One rename example: was \`Script\`, became \`Srv_...\`.
4. Say the number: "had N unnamed Part, left M".

That is proof of the lesson. Not "I cleaned a bit", but **measurable cleanliness**.

**Wow on Save (2-3 min, required):** after cleanup put in the hub/spawn a Part \`Polish_Ready\` (Neon + Billboard "Polish base") **or** Sound \`SFX_SaveReady\` on 1 click of a button/Part. This is not decor for a year - it is a signal "base is ready, juice can start". Tomorrow loading will sit on this Place more nicely.

Save: \`Lesson 11.1 - Explorer Audit\`.

**Do now (4 min):** rename 3 objects in Explorer by role, not by Script number.`,
 },
 {
 title: "Lesson 81 hand-in checklist",
 content: `- [ ] Before/after measures: unnamed count + Script search seconds
- [ ] Main Folders exist in Workspace
- [ ] Unnamed Part/Script noticeably fewer (A_after < A_before)
- [ ] Remotes/Systems/Audio have a logical place (or folder stubs)
- [ ] Suspicious Scripts from Free Models checked/removed
- [ ] GUI/logic duplicates found and neutralized
- [ ] Play: world did not break after moves
- [ ] Wow anchor \`Polish_Ready\` (Neon/Billboard) or short SFX on Save
- [ ] Can explain structure in 40 s
- [ ] Save: \`Lesson 11.1 - Explorer Audit\`

Next **11.2** will put LoadingGui into an already clean StarterGui - and that will feel good.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "You rename everything but leave a dump at the root",
 explanation: "Names exist, structure does not - searching is still hard.",
 correctApproach: "Folders first, then names.",
 },
 {
 mistake: "You delete a Script from a model at random during Play-test of foreign logic with no backup",
 explanation: "You can break the only working system.",
 correctApproach: "Disabled first → Play → then Delete.",
 },
 {
 mistake: "You keep two HUDs \"just in case\"",
 explanation: "Duplicate UI and double events.",
 correctApproach: "One primary ScreenGui.",
 },
 {
 mistake: "Names with spaces, emoji, and `copy copy`",
 explanation: "WaitForChild and team work suffer.",
 correctApproach: "Latin letters, prefixes, no clutter in Name.",
 },
 {
 mistake: "You skip Play after a mass move",
 explanation: "Broken Remotes/script paths show up late.",
 correctApproach: "Short Play after a cleanup wave.",
 }
 ],
 summary:
 "You audited Explorer with a before/after measure: folders, names, duplicates, Script safety, and the Polish_Ready wow anchor. Lesson 81 gives a clean base for the whole Polish module.",
 practiceTask: {
 title: "Practice: Explorer audit (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** cleaner Place + before/after proof + wow on Save.

### Part A - "Before" measure (5 min)
1. Number A: unnamed Part/Script.
2. Timer T1: find the main system Script (shop/loop).
3. Yes/no checklist + (optional) Explorer "before" screenshot.

### Part B - Cleanup (18 min)
1. Folders and Workspace layout.
2. Rename the worst 15-30 objects.
3. GUI/Script duplicates + Free Model Scripts.
4. Short Play.

### Part C - "After" measure + wow (7 min)
1. Numbers A2 and T2 (should beat A/T1).
2. Place \`Polish_Ready\` (Neon/Billboard) or a short SFX.
3. **Save** → \`Lesson 11.1 - Explorer Audit\`.
4. Show the teacher in 40 s: "was A in T1 s → now A2 in T2 s".

### Pass criteria
- Folders + less name chaos
- Before/after numbers exist
- Polish_Ready or SFX exists
- Play is not broken
- Place saved`,
 hints: [
 "Not a year of perfection - a visible cleanliness jump in one hour",
 "Disabled before Delete saves you from panic",
 "Wow anchor = 1 Part or 1 Sound, not a new genre"
 ],
 optionalChallenge:
 "Write 8-10 lines of \"team naming standard\" and apply it fully to StarterGui.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the lesson number for 11.1 in the new grid?",
 options: [
          "81st of 92",
          "96th",
          "1st",
          "11th with no course number"
        ],
 correctAnswer: 0,
 explanation: "11.1 opens the Polish module as lesson 81.",
 },
 {
 id: "q2",
 type: MC,
 question: "Why a clean Explorer in the polish module?",
 options: [
          "To turn Play off forever",
          "To find bugs faster and show structure",
          "It is only needed for Terrain Material",
          "To replace DataStore"
        ],
 correctAnswer: 1,
 explanation: "Speed and team clarity.",
 },
 {
 id: "q3",
 type: MC,
 question: "Which name is better for a shop server script?",
 options: [
          "Script",
          "fff",
          "Srv_Shop",
          "Script (1) copy"
        ],
 correctAnswer: 2,
 explanation: "Prefix + meaning.",
 },
 {
 id: "q4",
 type: MC,
 question: "What is a logical place to start a cleanup sprint?",
 options: [
          "With a perfect prefix on 500 objects while the root is a dump",
          "With Publish Public",
          "With deleting all of Workspace",
          "With Folders and root layout, then names"
        ],
 correctAnswer: 3,
 explanation: "Structure first.",
 },
 {
 id: "q5",
 type: MC,
 question: "Where should Remotes live?",
 options: [
          "Scattered randomly across Parts with no system",
          "ReplicatedStorage/Remotes",
          "Only in Lighting",
          "In SoundService required"
        ],
 correctAnswer: 1,
 explanation: "One place for network endpoints.",
 },
 {
 id: "q6",
 type: MC,
 question: "What to do with a suspicious Script in a Free Model?",
 options: [
          "Always keep it \"for the magic\"",
          "Copy it 10 more times",
          "Check it; if not needed - Disabled, then Delete",
          "Rename it to Part"
        ],
 correctAnswer: 2,
 explanation: "Safety beats laziness.",
 },
 {
 id: "q7",
 type: MC,
 question: "Which symptom often comes from two identical reward Scripts?",
 options: [
          "Double coin awards / double events",
          "Nicer Terrain",
          "Faster loading always",
          "Automatic Badge"
        ],
 correctAnswer: 0,
 explanation: "Logic duplicates.",
 },
 {
 id: "q8",
 type: MC,
 question: "Which lesson comes after 11.1?",
 options: [
          "12.6 SHOWCASE",
          "11.7 (does not exist)",
          "Module 1",
          "11.2 - Loading Screen"
        ],
 correctAnswer: 3,
 explanation: "Order first, then loading.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which Save name does the lesson suggest?",
 options: [
          "Juice Pass",
          "Demo Ready",
          "Lesson 11.1 - Explorer Audit",
          "Final GDD"
        ],
 correctAnswer: 2,
 explanation: "Explorer audit hand-in.",
 },
 {
 id: "q10",
 type: MC,
 question: "Where does server system logic usually live?",
 options: [
          "Only StarterGui",
          "ServerScriptService (for example Systems)",
          "Only Atmosphere",
          "In the Place name"
        ],
 correctAnswer: 1,
 explanation: "SSS for server Scripts.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why are names with emoji/spaces bad for objects?",
 options: [
          "Roblox never displays them physically",
          "They raise FPS",
          "They replace Folders",
          "Hard and fragile to find in code via WaitForChild"
        ],
 correctAnswer: 3,
 explanation: "Clean technical names.",
 },
 {
 id: "q12",
 type: MC,
 question: "What to do before a final Delete of a suspicious Script?",
 options: [
          "Disabled + short Play test",
          "Publish immediately",
          "Check nothing",
          "Duplicate it again"
        ],
 correctAnswer: 0,
 explanation: "Safe order.",
 },
 {
 id: "q13",
 type: MC,
 question: "Why one Config instead of three price copies?",
 options: [
          "Config forbids UI",
          "It is only for the icon",
          "One balance truth, less system drift",
          "To turn Explorer off"
        ],
 correctAnswer: 2,
 explanation: "Single source of truth.",
 },
 {
 id: "q14",
 type: MC,
 question: "What to show the teacher as audit proof?",
 options: [
          "Only an empty chat",
          "Only the sky",
          "Someone else's Place with no changes",
          "Before/after numbers + folders + rename example (+ Polish_Ready)"
        ],
 correctAnswer: 3,
 explanation: "Measurable result + wow anchor.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the submitted artifact for lesson 11.1?",
 options: [
          "Theory only with no changes",
          "Place with folders, before/after measure, wow anchor, and Save",
          "Public Publish with no structure",
          "Entire StarterGui deleted with no need"
        ],
 correctAnswer: 1,
 explanation: "Audit = cleanliness + proof + Polish_Ready.",
 }
 ],
 },
}

export const enLesson112 = {
 lessonId: "lesson-roblox-11-2",
 moduleId: "module-11",
 order: 2,
 title: "11.2 - Loading Screen",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Build LoadingGui in StarterGui with background, game title, and status",
 "Drive the screen with a LocalScript (show → stages → hide)",
 "Make a smooth fade with TweenService (or simple Transparency)",
 "Know why ContentProvider / preloading matters (lite)",
 "Do not leave the player forever on the loading screen"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 82 of 92)",
 content: `The first thing a player sees after joining is not your cool obby, but a **waiting moment**. If that is a black screen or UI chaos - the impression is already ruined.

Today you build a **Loading Screen**:
1. Full-screen panel with the game title.
2. Status text ("Preparing the world…").
3. LocalScript that shows the screen, runs/simulates stages, then hides.
4. Smooth fade (Tween).

Work on the Place after **11.1** (clean Explorer helps). Put LoadingGui in **StarterGui**. After hide, check that nothing covers spawn and Output has no red on the LocalScript.

**Do now (2 min):** write the game title in one line - it will appear on the loading screen. Keep it short: a long title reads poorly on loading.`,
 },
 {
 title: "Why loading if the game opens anyway",
 content: `| Without a screen | With a screen |
|------------------|---------------|
| Player clicks into emptiness | Understands: "still loading" |
| HUD/buttons pop in roughly | Brand first, then play |
| Teleport "silent pause" | Status "Moving to zone…" |

Loading is not an "AAA adult feature". It is courtesy: tell the player what is happening.

For Demo Ready and SHOWCASE, 3 seconds with a title look far more polished than an instant spawn into an underloaded hub.

**Do now (4 min):** run Play and confirm the loading screen disappears after load.`,
 },
 {
 title: "Where LoadingGui lives (map)",
 content: `\`\`\`
StarterGui/
  LoadingGui/          -- ScreenGui
    Background/        -- Frame full screen
    Title/             -- TextLabel title
    Status/            -- TextLabel status
    Tip/               -- TextLabel tip (optional)
    LocalScript        -- show/hide logic
\`\`\`

Important:
- this is a **LocalScript** (the client sees its own UI);
- \`ScreenGui.IgnoreGuiInset = true\` is often useful for full screen;
- set \`DisplayOrder\` high (for example 100) so loading sits above other panels;
- when done: \`LoadingGui.Enabled = false\` or destroy/hide Background.

Do not put loading logic in a Server Script "for everyone" as the only screen without a LocalScript - each player has their own client UI.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Build the UI in 10-12 minutes (steps)",
 content: `1. StarterGui → Insert **ScreenGui** → name it \`LoadingGui\`.
2. Add **Frame** \`Background\`: Size \`{1,0},{1,0}\`, dark color, AnchorPoint 0.5 / center Position if needed.
3. **TextLabel** \`Title\`: large game title, white/bright text, top center.
4. **TextLabel** \`Status\`: "Loading…", smaller font under the title.
5. (Optional) \`Tip\`: one short control tip.
6. Check in Play: is the panel visible right away. If not - \`Enabled = true\`, higher DisplayOrder.

Design lite:
- 1 background + 2 texts is enough;
- do not glue 10 buttons on loading;
- contrast: light text on dark background.

**Do now:** build the UI until Title and Status appear on screen.`,
 },
 {
 title: "Loading stages (what to write in Status)",
 content: `Players like seeing progress in words, even if you do not count real % yet:

| Stage | Status text (example) | What you do in code |
|-------|-----------------------|---------------------|
| 1 | "Preparing interface…" | Short pause / UI init |
| 2 | "Loading resources…" | ContentProvider lite or wait |
| 3 | "Almost ready…" | Final pause |
| 4 | "Come in!" | Hide the screen |

For a school MVP you can use **honest stages with \`task.wait\`** + text changes. That already looks professional on a demo.

Later (if you have time) you can hook real asset waits. But **never** leave the screen with no timeout "just in case".

**Do now (4 min):** run Play and confirm the loading screen disappears after load.`,
 },
 {
 title: "LocalScript: logic skeleton",
 content: `Idea (match names to your UI):

\`\`\`lua
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local ContentProvider = game:GetService("ContentProvider")

local player = Players.LocalPlayer
local gui = script.Parent
local background = gui:WaitForChild("Background")
local status = background:WaitForChild("Status")

local function setStatus(text)
	status.Text = text
end

local function hideLoading()
	local tween = TweenService:Create(
		background,
		TweenInfo.new(0.6),
		{ BackgroundTransparency = 1 }
	)
	-- if Title/Status should fade too - tween their TextTransparency
	tween:Play()
	tween.Completed:Wait()
	gui.Enabled = false
end

-- start
gui.Enabled = true
setStatus("Preparing interface...")
task.wait(0.4)
setStatus("Loading resources...")
-- you can PreloadAsync here (see below)
task.wait(0.6)
setStatus("Almost ready...")
task.wait(0.3)
hideLoading()
\`\`\`

This is a teaching skeleton: the main idea is **showed → stages → hid**.

**Do now (4 min):** one hit/effect in Play - feedback should be short and not spammy.`,
 },
 {
 title: "ContentProvider lite (preloading)",
 content: `**ContentProvider:PreloadAsync(list)** asks the client to load assets (images, sounds…) ahead of time.

Why:
- UI icons do not "blink" empty;
- reward sound can finish loading before the first click.

How to use carefully:
1. Build an array of instances (ImageLabel, Sound…) that matter at start.
2. Call PreloadAsync inside pcall.
3. Always have a timeout: if an asset hangs - the screen must not hang forever.

\`\`\`lua
local ok, err = pcall(function()
	ContentProvider:PreloadAsync({ /* your instances */ })
end)
if not ok then
	warn("Preload failed:", err)
end
\`\`\`

If the list is empty / hard - for lesson hand-in, stages with \`task.wait\` + good UI are enough. Preload is a bonus "almost like big games".

**Do now (4 min):** run Play and confirm the loading screen disappears after load.`,
 },
 {
 title: "TweenService: fade without a hard cut",
 content: `Turning a Frame off hard (\`Visible = false\`) works, but a tween feels softer.

Minimum:
- tween \`BackgroundTransparency\` 0 → 1;
- in parallel \`TextTransparency\` on Title/Status;
- \`TweenInfo.new(0.5-0.8)\`.

After Completed → \`gui.Enabled = false\`.

Do not tween for 5 seconds - the player thinks it froze. 0.4-0.8 s is the sweet zone.

**Do now (8 min):** wire hideLoading with a tween and check Stop→Play twice.`,
 },
 {
 title: "Safety: the screen must not \"stick\"",
 content: `| Risk | Protection |
|------|------------|
| Preload hangs | pcall + max wait time |
| Error in LocalScript | \`warn\` + still hide GUI after N seconds |
| ResetOnSpawn shows loading again | Set ScreenGui.ResetOnSpawn = false (often what you want) |
| Loading under other panels | Higher DisplayOrder |

Required "emergency exit" in your head:

\`\`\`lua
task.delay(8, function()
	if gui.Enabled then
		gui.Enabled = false
		warn("Loading force-closed")
	end
end)
\`\`\`

8 seconds is an example. A shorter max is better than an endless black screen at SHOWCASE.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Tips on screen (Tip)",
 content: `One Tip line changes the feel:

- "Walk to the yellow zone and press E"
- "Collect coins in the park behind the hub"
- "Do not jump into lava - it hurts :)"

Changing tip every 10 s on loading is optional. For MVP **one** static sentence is enough.

Do not write a novel. Do not spoil the whole plot. One action for the first 30 s of play.

**Do now (4 min):** run Play and confirm the loading screen disappears after load.`,
 },
 {
 title: "Link to teleport and module 12",
 content: `If the finale has hub → zone teleport:
- a short loading/status "Moving…" will help again;
- same LocalScript + status pattern.

Today build the habit: **any pause is explained with text**.

After loading, check right away: spawn + onboarding are visible. Loading does not replace a world sign.

Save: \`Lesson 11.2 - Loading Screen\`.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "Lesson 82 hand-in checklist",
 content: `- [ ] LoadingGui in StarterGui with background, Title, Status
- [ ] LocalScript shows stages and hides the screen
- [ ] Smooth fade (Tween) or a clean simple hide
- [ ] ResetOnSpawn set on purpose
- [ ] Protection against an endless screen (timeout)
- [ ] After hide, spawn / game is visible
- [ ] (Bonus) PreloadAsync on at least 1-2 assets
- [ ] Save: \`Lesson 11.2 - Loading Screen\`

Next **11.3** adds juice; **11.5** checks whether loading blocks the demo.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Screen hangs forever due to an error or Preload",
 explanation: "Player thinks the game broke.",
 correctApproach: "Force-close timeout + pcall.",
 },
 {
 mistake: "Loading appears again after death because of ResetOnSpawn",
 explanation: "Annoying on every respawn.",
 correctApproach: "ResetOnSpawn = false for LoadingGui (usually).",
 },
 {
 mistake: "No status - just a black square",
 explanation: "Unclear whether anything is happening.",
 correctApproach: "Title + Status with stages.",
 },
 {
 mistake: "Tween lasting 5+ seconds",
 explanation: "Looks like a freeze.",
 correctApproach: "0.4-0.8 s for fade-out.",
 },
 {
 mistake: "Loading logic in the wrong place without a LocalScript",
 explanation: "Player UI is not driven correctly.",
 correctApproach: "LocalScript in StarterGui/LoadingGui.",
 }
 ],
 summary:
 "You built a Loading Screen on LocalScript with status stages, a smooth fade, and hang protection. Lesson 82 gives the first \"grown-up\" impression before juice and Demo Ready.",
 practiceTask: {
 title: "Practice: Loading Screen (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** working LoadingGui with stages and fade-out.

### Part A - UI (10 min)
1. ScreenGui LoadingGui + Background + Title + Status (+ Tip).
2. High DisplayOrder, contrast text.
3. Check visibility in Play.

### Part B - Logic (15 min)
1. LocalScript: Status stages + wait.
2. Tween hide + Enabled = false.
3. Force-close timeout.
4. ResetOnSpawn set on purpose.
5. (Bonus) PreloadAsync on 1-2 assets.

### Part C - Hand-in (5 min)
1. Stop→Play twice: screen appears and disappears.
2. **File → Save to Roblox** → \`Lesson 11.2 - Loading Screen\`.
3. Mark practice complete in LMS.

### Pass criteria
- Title and changing Status exist
- Screen hides on its own
- No endless hang
- Game is available after hide
- Place saved`,
 hints: [
 "UI and simple wait stages first, then Preload",
 "If text is not visible - check Z-order and color",
 "Force-close at 6-8 s saves the demo even with a bug"
 ],
 optionalChallenge:
 "Add a progress bar (Frame grow by Width) synced with status stages.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the lesson number for 11.2 in the new grid?",
 options: [
          "82nd of 92",
          "96th",
          "1st",
          "40th"
        ],
 correctAnswer: 0,
 explanation: "11.2 = lesson 82.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where should LoadingGui live?",
 options: [
          "In ServerStorage as the only option",
          "In StarterGui as a ScreenGui",
          "In Terrain",
          "In DataStoreService"
        ],
 correctAnswer: 1,
 explanation: "Client UI from StarterGui.",
 },
 {
 id: "q3",
 type: MC,
 question: "Which script drives the player's loading screen?",
 options: [
          "Only a ModuleScript in SSS with no UI",
          "Only a command in Output",
          "LocalScript",
          "SoundService"
        ],
 correctAnswer: 2,
 explanation: "Player UI = client.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why Status text with stages?",
 options: [
          "To replace the whole game",
          "It is only needed for Terrain",
          "Status is forbidden in ScreenGui",
          "So the player knows the game is preparing, not frozen"
        ],
 correctAnswer: 3,
 explanation: "Explained pause = better UX.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why TweenService when hiding loading?",
 options: [
          "To raise sound Volume",
          "Soft fade instead of a hard cut",
          "To create a RemoteEvent",
          "It replaces Title"
        ],
 correctAnswer: 1,
 explanation: "Fade looks more professional.",
 },
 {
 id: "q6",
 type: MC,
 question: "What does ContentProvider:PreloadAsync do?",
 options: [
          "Publishes the game to Public",
          "Cleans Explorer",
          "Asks the client to preload assets ahead of time",
          "Creates a Badge"
        ],
 correctAnswer: 2,
 explanation: "Preloading resources.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why is a force-close timeout needed?",
 options: [
          "So the screen does not hang forever on an error",
          "To turn Anchored off",
          "It is only required for Atmosphere",
          "Timeout is forbidden"
        ],
 correctAnswer: 0,
 explanation: "Demo and player safety.",
 },
 {
 id: "q8",
 type: MC,
 question: "Which ResetOnSpawn is often logical for LoadingGui?",
 options: [
          "Always true required",
          "No such property",
          "Only for Parts",
          "false - so loading does not show on every respawn"
        ],
 correctAnswer: 3,
 explanation: "Otherwise loading annoys after death.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which lesson comes after 11.2?",
 options: [
          "12.6 SHOWCASE",
          "11.7 (does not exist)",
          "11.3 - Sound + Particles + Atmosphere",
          "Module 1"
        ],
 correctAnswer: 2,
 explanation: "Loading → juice → opt/UX.",
 },
 {
 id: "q10",
 type: MC,
 question: "Which Save name does the lesson suggest?",
 options: [
          "Juice Pass",
          "Lesson 11.2 - Loading Screen",
          "Demo Ready",
          "Final GDD"
        ],
 correctAnswer: 1,
 explanation: "Loading-day hand-in.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why set DisplayOrder high for LoadingGui?",
 options: [
          "To speed up DataStore",
          "To turn Lighting off",
          "It is only for Trail",
          "So the screen sits above other panels"
        ],
 correctAnswer: 3,
 explanation: "Loading should cover HUD at start.",
 },
 {
 id: "q12",
 type: MC,
 question: "What fade-out duration is a good target?",
 options: [
          "About 0.4-0.8 seconds",
          "At least 10 seconds always",
          "0 seconds and only destroy the world",
          "Exactly 1 hour"
        ],
 correctAnswer: 0,
 explanation: "Soft enough, not like a freeze.",
 },
 {
 id: "q13",
 type: MC,
 question: "What to put in Tip on loading?",
 options: [
          "Full code of all Scripts",
          "Nothing ever",
          "One short tip for the first action",
          "List of all GamePass"
        ],
 correctAnswer: 2,
 explanation: "Short onboarding while waiting.",
 },
 {
 id: "q14",
 type: MC,
 question: "Are task.wait stages without Preload enough for MVP hand-in?",
 options: [
          "No, without Preload the lesson is impossible",
          "Only Publish is required",
          "Only Terrain is required",
          "Yes, if UI and hide work; Preload is a bonus"
        ],
 correctAnswer: 3,
 explanation: "Reliable screen first, then complexity.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the submitted artifact for lesson 11.2?",
 options: [
          "Empty Baseplate",
          "LoadingGui with stages, hide/tween, no endless hang + Save",
          "Theory only",
          "Public Publish with no UI"
        ],
 correctAnswer: 1,
 explanation: "A working loading screen is required.",
 }
 ],
 },
}

export const enLesson113 = {
 lessonId: "lesson-roblox-11-3",
 moduleId: "module-11",
 order: 3,
 title: "11.3 - Sound + Particles + Atmosphere",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Add sound layers: ambient, UI, gameplay on the golden path",
 "Wire SFX to real events (reward, click, Prompt)",
 "Place a point ParticleEmitter / Trail on wow moments",
 "Tune Lighting/Atmosphere (and Bloom lite) to the scene mood",
 "Do not overload the path with noise and constant effects"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 83 of 92)",
 content: `Today the Place should **sound and feel**, not only look like blocks.

Three polish tools:
1. **Sound** - what you hear at start, click, reward.
2. **Particles / Trail** - short visual wow.
3. **Atmosphere / Lighting** - world mood (morning, night, fog).

Work on your Place from module 11 (after clean Explorer from 11.1 and loading from 11.2, if you have them). Attach everything to the **golden path**: spawn → action → reward.

**Rule of the day:** better 4 precise effects than 40 constant noisy "decorations".

**Do now (2 min):** walk the path silently and write down 3 moments where you want sound or sparks.

If it feels "already pretty" - still add feedback on reward. Without it the demo feels mute even with nice Terrain. Put those 3 moments in a note - you will check the lesson checklist against them.`,
 },
 {
 title: "Why juice on events specifically",
 content: `| Constant noise/smoke everywhere | Point juice on events |
|--------------------------------|------------------------|
| Tires you in a minute | Memorable |
| Lags weak PCs | Cheaper for FPS |
| Unclear what matters | Reward "clicks" in the head |

Juice = feedback. Player did an action → the world **answered** with sound and a short spark.

If orchestra music always plays at 1.0 and the coin has no sound - priorities are backwards.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "Three sound layers",
 content: `| Layer | Volume (guide) | Examples | Where it lives |
|-------|----------------|----------|----------------|
| **Ambient** | 0.2-0.4 | Wind, quiet hub hum | SoundService or Part in hub, Looped |
| **UI** | 0.45-0.7 | Button click, panel open | LocalScript near GUI |
| **Gameplay** | 0.7-1.0 | Coin, quest done, finish, hit | Script/LocalScript on event |

Critical signals (reward, purchase error) should be **louder** than ambient.

Folder for order (if missing):
\`ReplicatedStorage/Audio/\` or \`SoundService\` with names \`SFX_Coin\`, \`SFX_Click\`, \`AMB_Hub\`.

**Do now (4 min):** update the HUD after a server value change without manually faking it on the client.`,
 },
 {
 title: "How to add Sound in Studio (steps)",
 content: `1. Select an object (Part / SoundService) → Insert Object → **Sound**.
2. In Properties:
   - **SoundId** - rbxassetid from Toolbox (official / allowed sounds) or your asset;
   - **Volume** - start at 0.5 and tune;
   - **Looped** - true only for ambient;
   - **RollOff** / MaxDistance - if the sound is in the world (3D).
3. For UI click, Sound in \`SoundService\` and \`Play()\` from LocalScript is often easier.
4. For a server reward - play from Script after validating the action (or via Remote if UI is on the client).

Mini idea example (local click):
\`\`\`lua
local sound = game:GetService("SoundService"):WaitForChild("SFX_Click")
button.MouseButton1Click:Connect(function()
	sound:Play()
end)
\`\`\`

**Do now (10 min):** place 1 ambient (quiet) + 1 UI click + 1 reward SFX. Check in Play at normal Windows volume.`,
 },
 {
 title: "Volume balance and ear fatigue",
 content: `| Problem | Fix |
|---------|-----|
| Everything at Volume 1 | Lower ambient, keep reward louder |
| Same sound 20 times in a row | Slight Pitch change (0.95-1.05) or rarer trigger |
| Sound plays across the whole map | Lower MaxDistance / RollOffMode |
| Scary screamer in a kids game | Replace with soft "ding / whoosh" |

Demo rule: teacher and parents should not flinch from the first click.

Check: headphones at medium volume + 1 minute on the path. If you want to take them off - cut Volume.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "ParticleEmitter: short and purposeful",
 content: `**ParticleEmitter** - sparks / smoke / glow from a Part.

Basic Properties you touch today:
- **Rate** - how many particles (start low: 5-20);
- **Lifetime** - how long they live;
- **Speed / SpreadAngle** - direction;
- **Color / Size / Transparency** - look;
- **Enabled** - on/off.

For Demo Ready better:
1. Emitter **off** by default.
2. On event: \`Enabled = true\` for 0.4-1.5 s → false again.
3. Or \`Emit(20)\` once (if you know this method in your API version) / short pulse.

Do not put 5 Emitters at Rate 200 across the whole hub "for beauty". Tomorrow's optimization (11.4) will hurt, and it will lag already today.

**Do now (8 min):** one Part near the reward spot + ParticleEmitter that flashes only when the player gets a reward (or a test button).`,
 },
 {
 title: "Trail (lite)",
 content: `**Trail** draws a trail behind a moving object (often Attachment0 / Attachment1 on character Parts or a projectile).

When it fits:
- finish ribbon;
- sword / projectile trail;
- "wow" after upgrade for 1-2 s.

When not needed:
- constant rainbow trail on every NPC in the hub;
- Trail on a static floor (no point).

If time is short - **skip Trail**, make a solid Particle on reward. Better one strong moment than three weak systems.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "Atmosphere and Lighting for mood",
 content: `Open **Lighting** in Explorer.

Useful today:
| Property / object | Why |
|-------------------|-----|
| **ClockTime** | Day / evening / night |
| **Ambient / OutdoorAmbient** | Overall shadow tint |
| **Brightness** | How bright |
| **Atmosphere** (child) | Fog, horizon color, density |
| **Bloom** (post effect lite) | Soft Neon glow (careful with strength) |

Preset ideas:
- **Bright arcade hub:** day, higher Brightness, light Bloom.
- **Night party:** ClockTime ~20-22, some Neon, do not max Bloom.
- **Foggy island:** Atmosphere Density a bit higher, not "white mush".

**Do now (7 min):** make 2 presets (day / mood) and be able to switch ClockTime by hand. If you already have Party Mode from M1 - you can wire it later; today a manual preset is enough.`,
 },
 {
 title: "Golden path: juice map",
 content: `Fill in for your Place:

| Path step | Sound | Particle/Trail | Atmosphere/light |
|-----------|-------|----------------|------------------|
| Spawn | quiet ambient | - | base preset |
| First tip / Prompt | UI click (optional) | - | - |
| Main action | action SFX | short pulse (optional) | - |
| Reward | loud positive SFX | sparks 0.5-1 s | (optional) Neon flash |
| Error (no coins) | short "no" / soft buzz | - | - |

Minimum for lesson hand-in:
- ambient;
- 1 UI or gameplay click;
- 1 reward SFX;
- 1 particle pulse on reward;
- 1 intentional Lighting/Atmosphere preset.

**Do now (5 min):** check boxes in this table for your path.`,
 },
 {
 title: "Organization and typical glitches",
 content: `| Glitch | Likely cause | Fix |
|--------|--------------|-----|
| No sound | Empty SoundId / Volume 0 / no Play() | Check Id and Play call |
| Sound only in Edit | Wrong mode / muted Windows | Play (F5), OS volume |
| Particles always on | Enabled = true constantly | Enable only on event |
| Soft blurry image | Bloom too strong | Lower Intensity/Size |
| Lag near effect | Rate too high | Rate ↓ or shorter time |

Names: \`SFX_Reward\`, \`AMB_Hub\`, \`FX_RewardSpark\` - so 11.4 / 11.5 find them fast.

**Do now (3 min):** find one symptom from the table in your Place and fix it or confirm it is absent.`,
 },
 {
 title: "Link to 11.4 and 11.5",
 content: `| Today | Next |
|-------|------|
| Point juice | 11.4 removes excess if you overdid it |
| Sounds on events | Demo Ready rubric "has feedback" |
| Atmosphere preset | Demo looks "like a game", not gray Baseplate |

If you place 20 Looped sounds - tomorrow optimization eats half the lesson. Place few, but precise.

Save: \`Lesson 11.3 - Juice Pass\`.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "Lesson 83 hand-in checklist",
 content: `- [ ] Quiet ambient on hub/start
- [ ] SFX on UI or action
- [ ] Louder reward SFX
- [ ] Particle pulse (not an eternal fountain)
- [ ] Lighting/Atmosphere set on purpose (not default "as it came")
- [ ] On the golden path effects do not cut ears or tank FPS hard
- [ ] Sound/FX names readable in Explorer
- [ ] Save: \`Lesson 11.3 - Juice Pass\`

Next **11.4** cleans lag and UX; **11.5** packs it into Demo Ready.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "All sounds Volume = 1 and Looped",
 explanation: "Ears and attention die in a minute.",
 correctApproach: "Ambient quiet, reward louder, Looped only where needed.",
 },
 {
 mistake: "ParticleEmitter always Enabled across the whole hub",
 explanation: "Lag + visual noise.",
 correctApproach: "Short pulse on the reward event.",
 },
 {
 mistake: "Bloom maxed \"because cinema\"",
 explanation: "Soft blurry image, hard to read UI.",
 correctApproach: "Light Bloom or none.",
 },
 {
 mistake: "Sound exists in Toolbox, but Play() is never called",
 explanation: "Silence in the game.",
 correctApproach: "Hook Play() to click / reward / Prompt.",
 },
 {
 mistake: "Scary/harsh sounds in a kids game",
 explanation: "Fragile experience on a demo with parents.",
 correctApproach: "Soft positive SFX.",
 }
 ],
 summary:
 "You built a juice pass: sound layers, a point particle on reward, and Atmosphere/Lighting for mood. Lesson 83 makes the golden path feel before optimization and Demo Ready.",
 practiceTask: {
 title: "Practice: juice on the golden path (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** a path with sound, short VFX, and lighting mood.

### Part A - Sound (12 min)
1. Quiet ambient (Looped).
2. UI/action click.
3. Louder reward SFX.
4. Check volume in Play.

### Part B - Particles + Atmosphere (12 min)
1. Particle pulse on reward (not eternal).
2. (Optional) short Trail on one object.
3. Tune ClockTime + Atmosphere (and Bloom lite carefully).

### Part C - Hand-in (6 min)
1. Walk the golden path 2 times.
2. Fill the "step → effect" table.
3. **File → Save to Roblox** → \`Lesson 11.3 - Juice Pass\`.
4. Mark practice complete in LMS.

### Pass criteria
- ≥3 sound roles (ambient/UI/reward)
- ≥1 particle on event
- ≥1 intentional Lighting/Atmosphere preset
- Path does not cut ears
- Place saved`,
 hints: [
 "Reward first, then hub decorations",
 "If it lags near an effect - cut Rate, do not add another Emitter",
 "SFX_/AMB_/FX_ names will help tomorrow in 11.4"
 ],
 optionalChallenge:
 "Make a day/night toggle (button or Part) that changes ClockTime + different ambient.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the lesson number for 11.3 in the new grid?",
 options: [
          "83rd of 92",
          "96th",
          "1st",
          "50th"
        ],
 correctAnswer: 0,
 explanation: "11.3 = lesson 83.",
 },
 {
 id: "q2",
 type: MC,
 question: "Which sound should logically be loudest?",
 options: [
          "Always only ambient at 1.0",
          "Reward / important event signal",
          "Silence instead of all SFX",
          "Only sound in Edit without Play"
        ],
 correctAnswer: 1,
 explanation: "Critical signals louder than atmosphere.",
 },
 {
 id: "q3",
 type: MC,
 question: "What is Looped most often for?",
 options: [
          "Required for every UI click",
          "Only for ParticleEmitter",
          "Ambient / background hum",
          "Instead of SoundId"
        ],
 correctAnswer: 2,
 explanation: "Loop for background, not for every reward.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why enable particle briefly on an event?",
 options: [
          "Because otherwise ParticleEmitter does not exist",
          "Because Atmosphere then breaks",
          "Because SoundId requires it",
          "Less lag and a stronger wow"
        ],
 correctAnswer: 3,
 explanation: "Point juice > eternal fountain.",
 },
 {
 id: "q5",
 type: MC,
 question: "What does ClockTime control?",
 options: [
          "GamePass price",
          "Time of day in scene lighting",
          "Baseplate Part size",
          "RemoteEvent name"
        ],
 correctAnswer: 1,
 explanation: "Day/night via Lighting.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why Atmosphere in Lighting?",
 options: [
          "DataStore save",
          "Creating a Script",
          "Fog / air color / horizon depth",
          "Deleting UI"
        ],
 correctAnswer: 2,
 explanation: "Scene air mood.",
 },
 {
 id: "q7",
 type: MC,
 question: "What is dangerous about strong Bloom?",
 options: [
          "Soft blurry image and worse UI readability",
          "It always raises FPS",
          "It turns Sound off",
          "It is required for Publish"
        ],
 correctAnswer: 0,
 explanation: "Light Bloom or none.",
 },
 {
 id: "q8",
 type: MC,
 question: "Which lesson comes after 11.3?",
 options: [
          "12.6 SHOWCASE",
          "11.7 (does not exist)",
          "Module 1",
          "11.4 - Optimization + UX"
        ],
 correctAnswer: 3,
 explanation: "Juice → opt/UX → Demo Ready.",
 },
 {
 id: "q9",
 type: MC,
 question: "Where should an SFX set live?",
 options: [
          "Randomly in ServerStorage with no names",
          "Only in the game description",
          "SoundService or ReplicatedStorage/Audio with clear names",
          "In Terrain Material"
        ],
 correctAnswer: 2,
 explanation: "Order = faster polish later.",
 },
 {
 id: "q10",
 type: MC,
 question: "Which Save name does the lesson suggest?",
 options: [
          "Demo Ready",
          "Lesson 11.3 - Juice Pass",
          "Final GDD",
          "SHOWCASE DAY"
        ],
 correctAnswer: 1,
 explanation: "Juice-pass hand-in.",
 },
 {
 id: "q11",
 type: MC,
 question: "What to do if you hear no sound in Play?",
 options: [
          "Delete Lighting immediately",
          "Enable Streaming as the only fix",
          "Ignore until module 12",
          "Check SoundId, Volume, and whether Play() is called"
        ],
 correctAnswer: 3,
 explanation: "Typical Sound diagnosis.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why change Pitch a bit on a repeating SFX?",
 options: [
          "So the ear gets less tired of the same copy",
          "To turn Anchored off",
          "It replaces ParticleEmitter",
          "Pitch is forbidden in Roblox"
        ],
 correctAnswer: 0,
 explanation: "Anti-fatigue from repetition.",
 },
 {
 id: "q13",
 type: MC,
 question: "When is Trail appropriate in this lesson?",
 options: [
          "Required on every floor",
          "Instead of all Sound",
          "Short trail on a moving wow object, not across the whole hub",
          "Only in DataStore"
        ],
 correctAnswer: 2,
 explanation: "Lite option, not required.",
 },
 {
 id: "q14",
 type: MC,
 question: "What is the juice minimum for hand-in?",
 options: [
          "Only one sky with no sound",
          "20 Looped tracks",
          "Only Bloom at maximum",
          "Ambient + UI/action SFX + reward SFX + particle pulse + Lighting preset"
        ],
 correctAnswer: 3,
 explanation: "Layer balance and point VFX.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the submitted artifact for lesson 11.3?",
 options: [
          "Empty Baseplate",
          "Golden path with sounds, point VFX, lighting mood, and Save Juice Pass",
          "Theory only with no Studio",
          "Publish Public with no effects"
        ],
 correctAnswer: 1,
 explanation: "Felt juice on the route is required.",
 }
 ],
 },
}

export const enLesson114 = {
 lessonId: "lesson-roblox-11-4",
 moduleId: "module-11",
 order: 4,
 title: "11.4 - Optimization + UX",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Find typical lag causes: extra Parts, VFX spam, heavy loops",
 "Do a simple optimization pass on the golden path",
 "Improve UX: readable UI, contrast, clear start",
 "Know what StreamingEnabled is and when to mention it",
 "Prepare the Place for Demo Ready (11.5) without \"pretty but stutters\""
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 84 of 92)",
 content: `Today two sides of one coin:

1. **Optimization** - the game does not stutter on the golden path.
2. **UX** - the player knows what to do and can read the UI.

Pretty particles from 11.3 are useless if the phone heats up and the button is microscopic. And the other way: perfect FPS with empty onboarding is also not Demo Ready.

Work on **your** Place (the one that goes to 11.5-11.6). Do not start a new world.

**Do now (2 min):** enable Play, walk 60 s of the golden path, and write honestly: "lags? where? / unclear? where?"

If it feels "fine already" - still find at least one small thing: extra Looped sound, tiny text, extra Emitter. The lesson counts for a concrete change, not a feeling of "nothing to do".`,
 },
 {
 title: "Why optimization and UX together",
 content: `| FPS only | "Pretty UI" only | Together |
|----------|------------------|----------|
| Fast, but player stuck | Pretty, but lag | Fast and clear |
| "Technically OK" | "Looks OK" | Ready for demo |

Players rarely say "you have 12 draw calls". They say "it lags" or "I did not get it". Both verdicts = leave the game.

Today's standard: on the golden path there is **no strong lag** and there **is a clear next step**.

**Do now (4 min):** find one extra Part/script and remove it or justify why it stays.`,
 },
 {
 title: "Where to look for lag (honest checklist)",
 content: `| Suspicion | How to check | What often helps |
|-----------|---------------|------------------|
| Thousands of tiny decor Parts | Fly the camera, look at Explorer | Combine into Model / less detail / Mesh |
| Pile of ParticleEmitter always On | Walk to the effect zone | Emit only on event, briefly |
| Many Looped sounds at full | Listen + volume | Fewer loops, quieter |
| \`while true\` with no wait / heavy work every frame | Output + FPS feel | Events (Touched/Changed), \`task.wait\` |
| Huge world all at once | Far from spawn everything is "heavy" | Streaming (see below), split zones |

Do not optimize the whole Place blindly for an hour. First find **one** bottleneck on the golden path.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 },
 {
 title: "Optimization pass in 20-25 minutes",
 content: `1. **Lock the route:** spawn → action → reward (same as for the demo).
2. **Play 2 times** and mark places that "hitch".
3. In the lag zone open Explorer: how many Emitter / Parts / Lights?
4. Reduce or disable extras (Disabled / lower Rate / remove duplicates).
5. Find suspicious Scripts with loops; add \`task.wait\` or move to an event.
6. Play the route again. Better? Write "before/after" in one line.

Rule: **optimize what the player feels**, not abstract "perfect architecture".

**Do now (12 min):** do one such pass. Minimum one concrete change with a measurable effect ("stuttered near the fountain → removed 3 Emitter").

Extra quick wins:
- turn off \`CastShadow\` on tiny decor nobody notices;
- cut ParticleEmitter \`Rate\` 2-3x instead of full delete;
- check there are no duplicate Scripts of the same thing in two folders (double logic = double load).
- in Lighting remove extra Bloom/Blur at max if the image is "soapy" and heavy.

You do not need pro FPS software. Feel is enough: "was hitching → now runs" + a note of what you changed.`,
 },
 {
 title: "StreamingEnabled - short and clear",
 content: `**StreamingEnabled** (in Workspace / experience settings) tells Roblox to load the world **near the player**, not the whole Remodel at once.

When to mention:
- large map, many zones;
- weak devices;
- far decor "on the horizon".

When not to panic:
- small hub / one arena;
- you do not yet understand streaming bugs (objects appear later).

For the lesson it is enough to:
1. Know the name and why.
2. If the map is large - try enabling and check the golden path.
3. If something "vanishes / appears oddly" - note it and align with the teacher.

Do not treat Streaming as a "magic button instead of removing 5000 Parts".

**Do now (4 min):** find one extra Part/script and remove it or justify why it stays.`,
 },
 {
 title: "Scripts: expensive habits",
 content: `| Bad | Better |
|-----|--------|
| \`while true do\` heavy work with no pause | \`task.wait(0.1)\` or less often |
| Copy of logic on every coin as a separate Script | One script + CollectionService / folder |
| Check every Part in Workspace every second | Touched / Prompt / Changed event |
| Endless effect spawn | One effect on event + Destroy/after time |

You do not have to rewrite the whole course today. Find **1** clear heavy loop or Clone spam and lighten it.

If you cannot safely touch foreign code - cut VFX/Parts first. That is optimization too.

**Do now (4 min):** find one extra Part/script and remove it or justify why it stays.`,
 },
 {
 title: "UX: the player always has a next step",
 content: `UX here = **clarity**, not "trendy design".

Ask every 10-15 s on the path:
1. Do I know what to do now?
2. Do I see the goal (marker/sign/Prompt)?
3. Did I get feedback on the action (sound/UI/effect)?

If any answer is "no" longer than ~30 s - that is a UX hole. Close it **before** Demo Ready.

Minimum fixes:
- sign at spawn (1-2 sentences);
- ActionText on ProximityPrompt;
- highlight the first zone (Neon / Highlight);
- message "+coins" / "purchased".

**Do now (3 min):** walk to a Prompt in Play and confirm Triggered once.`,
 },
 {
 title: "UI: readability and control",
 content: `| Check | Goal |
|-------|------|
| Text size | Not microscopic on main labels |
| Contrast | Light text on dark panel (or reverse) |
| Buttons | Large enough to hit with mouse/finger |
| Color | Not only red/green without icon/text |
| Panel spam | 1-2 main elements on demo, not 8 windows |

**Do now (8 min):** shrink the Studio window (small screen simulation) and walk the HUD. If unreadable - grow text / simplify the panel.

Extra (lite): if there is strong camera shake / flashes - soften or disable for the demo. That is UX for sensitive players too.

Typical UX mistakes at this course stage:
1. Button exists but blends into the background.
2. Prompt exists but ActionText is empty or English without meaning for the class.
3. Tip exists but faces away from spawn - player never sees it.
4. After purchase, silence: unclear whether it worked.

Each of these holes can close in 5-10 minutes. Those are the fixes Demo Ready rubric points will love tomorrow.`,
 },
 {
 title: "Onboarding in 60 seconds (link to optimization)",
 content: `Bad onboarding makes the player wander the whole map → more draw → more lag + more anger.

So UX and FPS are friends:
1. Clear goal near spawn.
2. Short path to first reward.
3. Heavy effects - **on reward**, not on empty wandering.

Example: do not leave 10 Emitters on across the whole hub. Fire fireworks on "quest done" for 1-2 s.

**Do now (6 min):** shorten the path to first reward (closer collect / easier first stage / brighter arrow).`,
 },
 {
 title: "Lesson mini-rubric (self-check)",
 content: `| # | Question | Yes/no |
|---|----------|--------|
| 1 | No strong hitching on the golden path | |
| 2 | Removed at least one clear heavy effect/decor/loop | |
| 3 | Know what StreamingEnabled is | |
| 4 | Clear what to do at spawn | |
| 5 | Main UI labels are readable | |
| 6 | Reward gives feedback | |
| 7 | Output has no red on the route | |
| 8 | Ready to take this Place into 11.5 | |

Goal: as many **yes** as possible. Every "no" is a fix list until practice ends.

**Do now (4 min):** find one extra Part/script and remove it or justify why it stays.`,
 },
 {
 title: "What NOT to do today",
 content: `- Rewrite the whole architecture "perfectly".
- Enable Streaming and ignore new bugs with no note.
- Add another 50 decor Parts "for beauty".
- Full UI redesign from scratch for 3 hours.
- Publish Public.

Today = **lighten + clarify** the golden path. Deeper Demo Ready is tomorrow (11.5), blind test after that.

**Do now (2 min):** remove from the hand-in route anything outside this lesson.`,
 },
 {
 title: "Lesson 84 hand-in checklist",
 content: `- [ ] Note "where it lagged / what I changed"
- [ ] Golden path plays smoother or without clear hitching
- [ ] At least 1 UX fix for start or UI
- [ ] Reward has feedback
- [ ] Understand StreamingEnabled at "why" level
- [ ] Output clean on the route
- [ ] Save: \`Lesson 11.4 - Opt and UX\`

Next **11.5 Demo Ready** packs this into a ~15-point rubric.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 },
 {
 title: "Sample short report to the teacher (30-40 s)",
 content: `By the end of class be able to say:

*"On the path near the fountain it hitched - I removed 3 constant Emitters, left the effect only on reward. At spawn I added a sign and grew HUD text. I know Streaming: for a large map you can enable it; my hub is small - I left it. Output on the route is clean."*

That is lesson proof: not "I thought about optimization", but **what you changed**.

If the teacher asks "what about UX?" - answer concretely: which text you grew, which sign you added, which Prompt you labeled. Vague "improved the interface" with no example does not count.

**Do now (4 min):** find one extra Part/script and remove it or justify why it stays.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "You add even more VFX to \"cure\" lag with beauty",
 explanation: "It gets worse.",
 correctApproach: "Remove/shorten effects first, then point wow on reward.",
 },
 {
 mistake: "You optimize far decor while ignoring lag at spawn",
 explanation: "The player suffers on the golden path itself.",
 correctApproach: "Optimize the demo route first.",
 },
 {
 mistake: "Microscopic UI \"because I can see it\"",
 explanation: "On demo/phone nothing is readable.",
 correctApproach: "Check in a small window, grow key text.",
 },
 {
 mistake: "No onboarding, but perfect FPS",
 explanation: "Fast game where it is unclear what to do.",
 correctApproach: "Sign/Prompt + landmark required.",
 },
 {
 mistake: "Heavy while-true loop with no pause",
 explanation: "Classic FPS killer.",
 correctApproach: "task.wait or events instead of constant polling.",
 }
 ],
 summary:
 "You lightened the golden path (optimization) and clarified it for the player (UX): less lag, clearer start, readable UI. Lesson 84 is ready for Demo Ready in 11.5.",
 practiceTask: {
 title: "Practice: opt + UX pass (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** golden path without strong lag + clear start/UI + **measurable** before/after.

### Part A - Optimization with measure (12 min)
1. Walk the path in a "weak" mode: shrink the Studio window or (better) check on the teacher's phone/tablet / Device Emulator.
2. Write 1 "before" line: where it hitches / what annoys.
3. Remove/soften 1-3 heavy things (Emitter, Looped Sound, decor, loop).
4. Same path "after" - 1 line in the note (should differ).

### Part B - UX (12 min)
1. Onboarding at spawn.
2. UI in a small window.
3. Reward feedback (sound/text/effect).

### Part C - Hand-in (6 min)
1. Self-rubric of 8 points.
2. Show the teacher a pair of before/after sentences out loud (30 s).
3. Save \`Lesson 11.4 - Opt and UX\`.

### Pass criteria
- Concrete opt change + before/after line
- UX fix exists
- Golden path more stable/clearer
- Place saved`,
 hints: [
 "Start where the player actually walks",
 "One loud Looped Sound often breaks both ears and attention",
 "If \"fine already\" - still find 1 small thing and measure it"
 ],
 optionalChallenge:
 "Enable StreamingEnabled on a large map, walk the path, and write 2 observations (what improved / what is odd).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the lesson number for 11.4 in the new grid?",
 options: [
          "84th of 92",
          "96th",
          "1st",
          "40th"
        ],
 correctAnswer: 0,
 explanation: "11.4 = lesson 84.",
 },
 {
 id: "q2",
 type: MC,
 question: "Why optimization and UX in one lesson?",
 options: [
          "UX replaces Scripts",
          "The game must be both smooth and clear on one path",
          "Optimization is only needed for icons",
          "It is random"
        ],
 correctAnswer: 1,
 explanation: "Both affect whether players stay.",
 },
 {
 id: "q3",
 type: MC,
 question: "Where to start optimization?",
 options: [
          "With random far decor with no check",
          "With Publish Public",
          "With lag spots on the golden path",
          "With deleting all UI"
        ],
 correctAnswer: 2,
 explanation: "First what the player feels.",
 },
 {
 id: "q4",
 type: MC,
 question: "What often causes lag in pretty scenes?",
 options: [
          "One Anchored Part",
          "One print in Output",
          "Place name",
          "Many constant ParticleEmitter / heavy decor / heavy loops"
        ],
 correctAnswer: 3,
 explanation: "Effect spam and heavy logic.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why StreamingEnabled?",
 options: [
          "To replace DataStore",
          "Load the world near the player on large maps",
          "Turn sound off",
          "Create a Badge"
        ],
 correctAnswer: 1,
 explanation: "Map streaming, not magic for everything.",
 },
 {
 id: "q6",
 type: MC,
 question: "What is better than a heavy while true with no pause?",
 options: [
          "An even faster while with no wait",
          "Delete Workspace",
          "Events or a loop with task.wait",
          "Only a LocalScript every frame with heavy pointless work"
        ],
 correctAnswer: 2,
 explanation: "Do not eat CPU constantly.",
 },
 {
 id: "q7",
 type: MC,
 question: "What is the minimum UX at spawn?",
 options: [
          "Clear next step: sign / marker / Prompt",
          "Total lack of tips is always better",
          "Only 10 settings panels",
          "Only Atmosphere with no world"
        ],
 correctAnswer: 0,
 explanation: "Onboarding = part of UX.",
 },
 {
 id: "q8",
 type: MC,
 question: "How to check UI readability quickly?",
 options: [
          "Never look at the UI",
          "Delete all text",
          "Write only white on white",
          "Shrink the window / view as on a small screen"
        ],
 correctAnswer: 3,
 explanation: "A small screen shows problems immediately.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which lesson comes after 11.4?",
 options: [
          "12.6 SHOWCASE",
          "11.7 (not in the new grid)",
          "11.5 - Demo Ready",
          "Module 1"
        ],
 correctAnswer: 2,
 explanation: "Opt/UX → Demo Ready → blind test.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why heavy effects better on reward than across the whole hub?",
 options: [
          "Because Roblox forbids effects in the hub",
          "Less lag while wandering + stronger wow in the moment",
          "Because ParticleEmitter does not work on events",
          "It is only for the icon"
        ],
 correctAnswer: 1,
 explanation: "Point juice is cheaper and more effective.",
 },
 {
 id: "q11",
 type: MC,
 question: "Which Save name does the lesson suggest?",
 options: [
          "Demo Ready",
          "SHOWCASE DAY",
          "Final GDD",
          "Lesson 11.4 - Opt and UX"
        ],
 correctAnswer: 3,
 explanation: "Hand-in for this day specifically.",
 },
 {
 id: "q12",
 type: MC,
 question: "What should you not do today?",
 options: [
          "Full redesign of all UI for 3 hours instead of the path",
          "Remove an extra Emitter",
          "Add a sign at spawn",
          "Check Output"
        ],
 correctAnswer: 0,
 explanation: "Focus on the golden path.",
 },
 {
 id: "q13",
 type: MC,
 question: "Why feedback on reward?",
 options: [
          "It replaces optimization",
          "It turns Streaming off",
          "The player knows the action worked",
          "Needed only for Terrain"
        ],
 correctAnswer: 2,
 explanation: "UX feedback is required.",
 },
 {
 id: "q14",
 type: MC,
 question: "If the map is small, StreamingEnabled…",
 options: [
          "Always required or the game will not start",
          "Replaces all Scripts",
          "Deletes UI",
          "Not always critical; first remove clutter on the path"
        ],
 correctAnswer: 3,
 explanation: "A tool when needed.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the submitted artifact for lesson 11.4?",
 options: [
          "Theory only with no Studio changes",
          "Place with a clear opt change + UX fix on the path and Save",
          "Empty Baseplate",
          "Publish with no check"
        ],
 correctAnswer: 1,
 explanation: "Concrete build fixes are required.",
 }
 ],
 },
}

export const enLesson115 = {
 lessonId: "lesson-roblox-11-5",
 moduleId: "module-11",
 order: 5,
 title: "11.5 - Demo Ready",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Pick one genre Place and bring it to Demo Ready",
 "Walk a ~15-point rubric on the golden path",
 "Close onboarding, UI, sound, and stability gaps before the blind test",
 "Prepare a 60-90 s demo route for the show",
 "Save the Place as the base for tomorrow's blind playtest (11.6)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 85 of 92)",
 content: `**Demo Ready** = the game can already be shown in 1-2 minutes without excuses like "I'll hint now".

You already did in module 11:
- **11.1** Explorer order;
- **11.2** loading (if present);
- **11.3** sound / particles / atmosphere;
- **11.4** optimization + UX base.

Today you do not start a new genre from scratch. Today you take **one** of your best Places (obby / sim / hub / arena / tycoon slice…) and bring it through a **~15-point** rubric.

Tomorrow (**11.6**) that same Place goes to a blind playtest. If today is "almost" - tomorrow the tester sinks.

Open the chosen Place and keep the rubric sheet nearby.

**Do now (2 min):** open the Place after the previous lesson and prepare the work area for this session's artifact.`,
 },
 {
 title: "What Demo Ready means (and what it does not)",
 content: `| Demo Ready | Still NOT Demo Ready |
|------------|----------------------|
| Golden path works without a prompter | "I know where to run, a newcomer does not" |
| Start, action, reward exist | Pretty hub with no loop |
| Output clean on the route | Red errors "we ignore" |
| 60-90 s demo can be run | 10 min of explanation instead of play |
| Honest scope | Promises of features that are not there |

Demo Ready does **not** mean "a perfect game for a year". It means: a **short complete experience** is already assembled and looks intentional.

**Do now (3 min):** write in one sentence which Place you pick and what its golden path is (spawn → … → reward).`,
 },
 {
 title: "Pick one Place - not three \"almost\"",
 content: `Lesson rule: **one** candidate.

How to choose:
1. Which Place has the most stable core loop?
2. Where is there already some polish from 11.1-11.4?
3. What can you really show in 90 s?

Do not glue obby + sim + arena today "because cool". That is module 12 work (finale assembly). Today - **depth of one genre**.

If you hesitate between two - take the one with fewer P0. Beauty can be added; a blocker cannot.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "Demo Ready golden path (lock it on paper)",
 content: `Write 5-7 steps **before** edits:

1. Spawn / after loading.
2. Player understands the goal (sign / marker / Prompt).
3. Goes to the main action.
4. Does the action.
5. Sees/hears the reward.
6. (Optional) repeat or next step.
7. No soft-lock.

This list = the rubric, tomorrow's tester route, and a demo draft.

**Do now (5 min):** draw the arrows. If you cannot - the Place is not ready for the rubric yet; finish the loop first.`,
 },
 {
 title: "Demo Ready rubric (~15 points)",
 content: `Mark **yes / no / almost**. Goal today: as many **yes** as possible on the golden path. "Almost" = a concrete fix in the bug note.

### A. Start and clarity (1-4)
| # | Point | Yes? |
|---|-------|------|
| 1 | Spawn works, character does not fall into void | |
| 2 | Within ≤30-60 s it is clear what to do | |
| 3 | Visible landmark (sign / light / NPC / arrow) | |
| 4 | First action is obvious (Prompt / button / zone) | |

### B. Loop and reward (5-8)
| # | Point | Yes? |
|---|-------|------|
| 5 | Main action produces a result | |
| 6 | Reward is noticeable (UI / sound / effect / item) | |
| 7 | Can repeat the loop or go further | |
| 8 | Defeat/death (if any) does not break the game forever | |

### C. Module 11 polish (9-12)
| # | Point | Yes? |
|---|-------|------|
| 9 | Explorer is readable (folders/names from 11.1) | |
| 10 | Loading does not block forever / or is intentionally absent | |
| 11 | Path has ≥1 meaningful SFX or VFX (11.3) | |
| 12 | No terrible lag / sound spam on the route (11.4) | |

### D. Stability and demo (13-15)
| # | Point | Yes? |
|---|-------|------|
| 13 | Output has no red on the golden path | |
| 14 | UI is readable (contrast, size) | |
| 15 | I can run a 60-90 s demo without "I'll explain now" | |

**Do now (8 min):** check boxes honestly in Play. Every "no" = fix list for Part B practice.`,
 },
 {
 title: "How to close points fast (typical fixes)",
 content: `| Red point | Quick move |
|-----------|------------|
| 2-4 onboarding | Sign + Neon landmark + ActionText on Prompt |
| 5-6 reward | Success sound + TextLabel "+10" / particle |
| 8 respawn | Check SpawnLocation / checkpoint |
| 9 Explorer | 10 min of names and Folders, not a year of perfection |
| 11 juice | 1 Sound on reward + 1 ParticleEmitter |
| 13 Output | Open Output, replay the path, fix the first red |
| 14 UI | Larger text, dark panel / light text |
| 15 demo | Cut extra stops; keep 1 wow moment |

Do not start a new 20-stage quest. Demo Ready loves **short wins**.

**Do now (3 min):** find one symptom from the table in your Place and fix it or confirm it is absent.`,
 },
 {
 title: "Spawn onboarding checklist (required minimum)",
 content: `After spawn the player should see at least one of:
- a sign with 1-2 sentences;
- a bright goal marker;
- an NPC with ProximityPrompt and clear ActionText;
- an arrow / Highlight on the first object.

Sign text - like for a friend:
*"1) Walk to the yellow zone. 2) Press E. 3) Collect 3 coins."*

Avoid a 15-line novel. Avoid slang with no explanation ("proc the event").

**Do now (6 min):** place/update the sign and check from a newcomer camera (walk away from spawn and approach again with your eyes).`,
 },
 {
 title: "UI on demo: what must be readable",
 content: `| Element | Minimum |
|---------|---------|
| Coins / score | Always visible or after first reward |
| Shop / quest button | Large enough to hit |
| Error message | "Not enough coins", not silence |
| Mobile/small window | At least shrink Studio window and look |

If HUD is empty the whole demo - the viewer does not see progress. If HUD screams 8 panels at once - also bad. For Demo Ready **1-2 main numbers/buttons** are enough.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "Prepare a 60-90 second demo script",
 content: `Write on a cheat sheet:

| Sec | What you do / say |
|-----|-------------------|
| 0-10 | "This is [genre]: the player [action] to get [reward]." |
| 10-20 | Spawn + show the sign |
| 20-50 | Main action live |
| 50-70 | Reward + 1 polish (sound/VFX) |
| 70-90 | "Next in 11.6 - blind test" / short pause |

Rehearsal: **2 times** with a timer. If you do not fit - cut words, not the action.

This is SHOWCASE muscle for module 12, just a shorter format.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "What to intentionally NOT do today",
 content: `- New genre "from scratch in an hour".
- Three Places in parallel.
- Full refactor of all Scripts "because pretty".
- Publish Public (that is module 12).
- Long trailer instead of a working path.

Today's task is narrow: **rubric → fixes → demo route → Save**.

Write every "later" into a note for 11.6 / 12.1, but do not glue it into the build now.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "Link to 11.6 and module 12",
 content: `| Today | Next |
|-------|------|
| Place with max "yes" in the rubric | Blind playtest 11.6 |
| "no/almost" list | Bug list tomorrow |
| 60-90 s demo | Draft for portfolio/SHOWCASE |
| Honest scope | MVP pitch in 12.1 is easier to write |

If the rubric has many "no" in block A (start) - do not go to 11.6 "on luck". Finish onboarding today: it is the cheapest fix.

Save: \`Lesson 11.5 - Demo Ready\`.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "Lesson 85 hand-in checklist",
 content: `- [ ] One Place chosen
- [ ] Golden path written
- [ ] ~15-point rubric filled
- [ ] Critical "no" (especially 1-8 and 13-15) closed or almost
- [ ] 60-90 s demo cheat sheet exists
- [ ] One timed demo run completed
- [ ] Output clean on the route
- [ ] Save: \`Lesson 11.5 - Demo Ready\`

After this the Place is ready for a hard check through other eyes.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "You polish three Places at once",
 explanation: "None reach Demo Ready.",
 correctApproach: "One candidate for the lesson.",
 },
 {
 mistake: "Pretty world with no reward on the path",
 explanation: "Demo falls apart: \"and then what?\"",
 correctApproach: "Rubric points 5-6 first.",
 },
 {
 mistake: "No sign/landmark at spawn",
 explanation: "Tomorrow's blind test is red immediately.",
 correctApproach: "Onboarding minimum today.",
 },
 {
 mistake: "Demo of 5 minutes of explanation without play",
 explanation: "That is not Demo Ready, that is a lecture.",
 correctApproach: "60-90 s with live action.",
 },
 {
 mistake: "You ignore red Output \"because the game runs\"",
 explanation: "On show/test it will surface at the worst moment.",
 correctApproach: "Rubric point 13 is required.",
 }
 ],
 summary:
 "You brought one Place to Demo Ready with a ~15-point rubric: clear start, loop with reward, base polish, and a short demo route. Lesson 85 is ready for the blind playtest in 11.6.",
 practiceTask: {
 title: "Practice: Demo Ready rubric (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** one Place with as many "yes" as possible and a ready 60-90 s demo.

### Part A - Rubric (10 min)
1. Choose Place and write the golden path.
2. Play and mark 15 points: yes / no / almost.

### Part B - Fixes (15 min)
1. Close the most painful "no" (start, reward, Output, UI).
2. Add minimum onboarding at spawn.
3. Prepare the demo cheat sheet and run the timer 1-2 times.

### Part C - Hand-in (5 min)
1. Final golden path run.
2. **File → Save to Roblox** → \`Lesson 11.5 - Demo Ready\`.
3. Mark practice complete in LMS.

### Pass criteria
- Filled rubric exists
- Golden path works
- 60-90 s demo script exists
- Critical start/loop/stability points are not all "no"
- Place saved`,
 hints: [
 "Start fixes with points 1-6 - they give the biggest demo impact",
 "One good reward SFX often closes both polish and clarity",
 "Write \"no\" separately - tomorrow that is almost a ready bug list for 11.6"
 ],
 optionalChallenge:
 "Take a spawn \"before/after\" screenshot (no sign → with sign/marker) for the portfolio.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the lesson number for 11.5 in the new grid?",
 options: [
          "85th of 92",
          "96th",
          "1st",
          "50th"
        ],
 correctAnswer: 0,
 explanation: "11.5 = lesson 85; next 11.6 = 86.",
 },
 {
 id: "q2",
 type: MC,
 question: "What does Demo Ready mean in this lesson?",
 options: [
          "The game is perfect forever",
          "A short complete experience can be shown without a prompter",
          "Must Publish Public today",
          "Empty Baseplate"
        ],
 correctAnswer: 1,
 explanation: "Ready to show, not endless polish.",
 },
 {
 id: "q3",
 type: MC,
 question: "How many Places should you polish in this lesson?",
 options: [
          "Ten required",
          "Zero",
          "One main",
          "All at once with no priority"
        ],
 correctAnswer: 2,
 explanation: "Depth of one candidate.",
 },
 {
 id: "q4",
 type: MC,
 question: "About how many points are in the Demo Ready rubric?",
 options: [
          "Exactly 2",
          "100 required",
          "No rubric needed",
          "About 15"
        ],
 correctAnswer: 3,
 explanation: "The lesson is built around ~15 quality checkpoints.",
 },
 {
 id: "q5",
 type: MC,
 question: "What should be at spawn for onboarding?",
 options: [
          "Nothing - the player will always guess",
          "A tip: sign / marker / Prompt with clear text",
          "Only 20 settings screens",
          "Only sky with no world"
        ],
 correctAnswer: 1,
 explanation: "Without a landmark, demo and blind test suffer.",
 },
 {
 id: "q6",
 type: MC,
 question: "Which lesson comes after 11.5?",
 options: [
          "12.6 SHOWCASE immediately",
          "Module 1",
          "11.6 - Blind playtest + fixes",
          "11.7 (not in the new grid)"
        ],
 correctAnswer: 2,
 explanation: "Demo Ready first, then blind test.",
 },
 {
 id: "q7",
 type: MC,
 question: "How long is this lesson's demo script?",
 options: [
          "About 60-90 seconds",
          "30 minutes of lecture",
          "0 seconds",
          "Exactly 1 frame"
        ],
 correctAnswer: 0,
 explanation: "Short live show.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why does the Output point on the golden path matter?",
 options: [
          "Output is only needed for Terrain",
          "Errors are always useful on a demo",
          "Output replaces UI",
          "Red errors on the show route will surface at the worst moment"
        ],
 correctAnswer: 3,
 explanation: "Stability is part of Demo Ready.",
 },
 {
 id: "q9",
 type: MC,
 question: "What to do with rubric \"no\" points?",
 options: [
          "Ignore until SHOWCASE",
          "Delete the rubric",
          "Turn them into a fix list and close the most critical ones today",
          "Public Publish immediately"
        ],
 correctAnswer: 2,
 explanation: "A rubric with no fixes is useless.",
 },
 {
 id: "q10",
 type: MC,
 question: "Which Save name does the lesson suggest?",
 options: [
          "SHOWCASE DAY",
          "Lesson 11.5 - Demo Ready",
          "Final GDD",
          "Module 11 - Game Polished"
        ],
 correctAnswer: 1,
 explanation: "Separate name for Demo Ready day; Game Polished - after 11.6.",
 },
 {
 id: "q11",
 type: MC,
 question: "What matters more for Demo Ready today?",
 options: [
          "New genre from scratch in an hour",
          "10 GamePass at once",
          "Only atmosphere with no gameplay",
          "A full short loop with a reward"
        ],
 correctAnswer: 3,
 explanation: "Loop > decorative pile.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why rehearse the demo with a timer?",
 options: [
          "To fit 60-90 s and not replace play with a lecture",
          "To turn Explorer off",
          "Timer is forbidden",
          "Only for music"
        ],
 correctAnswer: 0,
 explanation: "Show discipline.",
 },
 {
 id: "q13",
 type: MC,
 question: "Which module 11 lessons directly support polish points in the rubric?",
 options: [
          "Only module 1",
          "Only Publish",
          "11.1-11.4 (Explorer, loading, juice, UX/opt)",
          "None"
        ],
 correctAnswer: 2,
 explanation: "Demo Ready brings prior polish together.",
 },
 {
 id: "q14",
 type: MC,
 question: "What do we intentionally not do on 11.5?",
 options: [
          "Filling the rubric",
          "Onboarding at spawn",
          "Short demo",
          "Publish Public and inflating three Places at once"
        ],
 correctAnswer: 3,
 explanation: "Narrow focus: ready to show/test.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the submitted artifact for lesson 11.5?",
 options: [
          "Empty checklist",
          "One Place with rubric, golden path, demo script, and Save Demo Ready",
          "Only an icon with no game",
          "Three unfinished Places"
        ],
 correctAnswer: 1,
 explanation: "Demo Ready = measurable readiness of one build.",
 }
 ],
 },
}

export const enLesson116 = {
 lessonId: "lesson-roblox-11-6",
 moduleId: "module-11",
 order: 6,
 title: "11.6 - Blind playtest + fixes",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Run a blind playtest with no hints for the first minutes",
 "Record confusion in the tester's words and build a bug list",
 "Prioritize fixes: P0 blockers → P1 UX → then polish",
 "Recheck the golden path after fixes with no red Output",
 "Save the Place as the module 11 wrap-up before release (module 12)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 86 of 92)",
 content: `This is the **last lesson of the Polish module**. You already did Explorer, loading, sound/VFX, optimization/UX, and Demo Ready (11.1-11.5). Today the hard check:

**Blind playtest** = someone (or you "as a newcomer") plays **with no hints**, and you only watch and write.

Then:
1. Bug list with priorities.
2. Fix top problems.
3. Golden path again.
4. Save: \`Module 11 - Game Polished\`.

Next is module **12** - plan, assembly, test, Publish, portfolio, SHOWCASE. Today's quality directly affects how painful 12.2-12.3 will be.

Open your best Place after 11.5 (or the main course project).

**Do now (2 min):** open the Place after the previous lesson and prepare the work area for this session's artifact.`,
 },
 {
 title: "How a blind test differs from \"I played it myself\"",
 content: `| You alone | Blind test |
|-----------|------------|
| You know where to run | Tester hunts a button for 40 s |
| "Obvious" | Turns out not obvious |
| You forgive your own bugs | Another person stops |
| You remember a secret bypass | No secret in their head |

A blind test catches **onboarding and UX** the creator does not see.

Who can be the tester:
- classmate / friend / sibling;
- teacher as a "quiet player";
- you yourself, but with a rule: **do not use what "you already know"** - play as if you opened the game for the first time (harder, but better than nothing).

**Do now (2 min):** agree who the tester is and prepare a notes sheet.`,
 },
 {
 title: "Session protocol (10-12 minutes)",
 content: `1. Tester sits / takes control. You **stay silent at least 5 minutes**.
2. Ask them to think aloud: "looking for the shop… can't see…".
3. Write time + fact: \`02:15 - stands by the wall, looking for the quest\`.
4. Do not fix bugs during the session (except a full crash).
5. After play, three questions:
   - What was clearest?
   - Where did you get most confused?
   - What broke / annoyed?
6. If there is a second tester - repeat. A pattern from two people is more valuable than one opinion.

Forbidden in the session:
- "Press E over there";
- "No, run left";
- "That's obvious".

Your job is an **observation camera**, not a prompter.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "What exactly to write (so you can fix later)",
 content: `Do not write "they just didn't like it". Write reproducibly:

| Field | Example |
|-------|----------|
| Time | 03:40 |
| What they did | Looked for Prompt near NPC |
| What they expected | Tip "press E" |
| What happened | Walked up - nothing |
| Mood | Angry / bored / laughing |

Collect **top-3 confusions** required - even if the game is "mostly OK". Those are what you close today.

Also watch Output during their play. A red line on the golden path = P0 candidate.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "Fix priorities after a blind test",
 content: `| Code | What it is | Examples | Today |
|------|------------|----------|-------|
| **P0** | Blocker | Soft-lock, crash, progress loss, button dead | Fix first |
| **P1** | Strong UX | Unclear what to do, invisible Prompt, tiny text | Fix next |
| **P2** | Balance / pace | Long to first reward | If time left |
| **P3** | Cosmetics | Crooked sign, tiny decor | After P0/P1 |

Module 11 finale rule: **do not paint the sky while the tester cannot start the quest.**

If 2 testers stuck in the same place - that is almost always P1, even if it is "clear" to you.

**Do now (5 min):** walk the test table once and write pass/fail for each row.`,
 },
 {
 title: "Bug list template for today",
 content: `Copy:

| ID | Problem | Time/note | P | Status |
|----|---------|-----------|---|--------|
| 1 | Unclear what to do at spawn | 0:40 | P1 | open |
| 2 | Shop charges twice | 6:10 | P0 | open |
| 3 | Loud music | 1:00 | P2 | later |

After a fix:
1. Status → **fixed**.
2. Ask the tester (or yourself blind) to walk **only that spot** again.
3. Then the full golden path.

Keep the bug list - in module 12 it becomes challenge history for the portfolio.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "\"Feels ready\" rubric (1-5)",
 content: `After fixes, score honestly. Goal: **all ≥4**, or a plan for what remains P2/P3.

| Area | 1 = bad | 5 = great | Your score |
|------|---------|-----------|------------|
| Start clarity | Don't know what to do | Clear in 30 s | |
| Action feedback | Click is "mute" | SFX/UI/reward exists | |
| Stability | Red Output | 8-10 min with no crashes | |
| Pace | Boring / too harsh | Want to try again | |
| Neatness | Explorer/UI chaos | Reads like a product | |

These are not school journal grades. This is your honest cut before module 12.

**Do now (4 min):** put numbers. Everything ≤3 needs a bug-list row.`,
 },
 {
 title: "Quick fixes that often save a blind test",
 content: `| Tester problem | Quick fix |
|----------------|-----------|
| "Don't know where to go" | Bright arrow / Neon Part / sign at spawn |
| "Can't see the button" | Larger TextButton, contrast, UIScale |
| "Walked to NPC - silence" | ProximityPrompt with ActionText, MaxActivationDistance |
| "Stuck in a wall" | CanCollide / hole in geometry / Anchored |
| "Sound hurts" | Volume 0.3-0.5, not 1 on everything |
| "Nothing happens for long" | First reward earlier (closer collect / easier first stage) |
| "Don't get what I bought" | Print/UI "Bought X", success sound |

You do not have to rewrite architecture. Often **1 sign + 1 Prompt + 1 sound** saves it.

**Do now (5 min):** walk the test table once and write pass/fail for each row.`,
 },
 {
 title: "Replay after fixes (regression)",
 content: `You fixed three bugs - and broke a fourth. So:

1. Walk the golden path: spawn → main action → reward.
2. Check the bug-list spots (where P0/P1 were).
3. Check Output again.
4. If you have loading from 11.2 - one cold start (Stop → Play).

Minimum regression time: **5-7 minutes**. Without it "fixes" can be worse than bugs.

If the tester is still available - give them 3 minutes only on the previously bad spot. That is the cheapest way to confirm UX really got clearer.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "60-second mini-demo for yourself / the teacher",
 content: `By the end of class be able to show:

1. Start (loading, if any) + spawn.
2. Clear first action.
3. One reward / one "wow" (sound, particle, upgrade).
4. (Optional) a clean Explorer fragment for the teacher.

This rehearses SHOWCASE muscle for module 12, just shorter.

Do not talk theory for 10 minutes. Show the game. If it is unclear in 60 s - return to P1 onboarding.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "Link to module 12",
 content: `| Today | In module 12 |
|-------|--------------|
| Bug list | Challenge history in portfolio (12.5) |
| Blind protocol | Almost the same as test plan 12.3 |
| Game Polished Place | Base for assembly / finale |
| Rubric scores | Hint what to take into MVP 12.1 |

Do not start module 12 from a place where the tester "did not know what to do for 5 minutes". Finish onboarding today first.

Save separately: even if you later make a new finale, \`Module 11 - Game Polished\` remains a control snapshot of polish skills.

**Do now (4 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "If there is no tester: self-blind mode",
 content: `Not ideal, but it works:

1. Set a timer for 10 min.
2. Ban: do not use "secret knowledge" (do not run straight to a hidden Prompt).
3. Pretend you see the game for the first time: read only what is on screen and in the world.
4. Every 2 min write: "right now I think I should…".
5. If in 3 min you do not know the next step - that is already P1, even without a friend.

Then leave the tester role and fix as the creator. Two hats in turn beat zero tests.

**Do now (5 min):** do one check from this section in Play and write the result in Note.`,
 },
 {
 title: "Lesson 86 hand-in checklist",
 content: `- [ ] Blind session ≥10 min (or 2 shorter blind runs)
- [ ] Top-3 confusions in the tester's words
- [ ] Bug list with P0-P3
- [ ] P0 closed; key P1 closed or with a temporary world tip
- [ ] Golden path walked after fixes
- [ ] Output clean on this route
- [ ] 1-5 rubric filled
- [ ] Save: \`Module 11 - Game Polished\`

Module 11 is then essentially complete: not "there are effects", but "a player can finish without a prompter".

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "You hint to the tester from the first second",
 explanation: "You are testing your memory, not the game.",
 correctApproach: "Stay silent ≥5 min, write facts with time.",
 },
 {
 mistake: "You only fix color while the quest cannot start",
 explanation: "P3 instead of P0/P1.",
 correctApproach: "Blockers and onboarding first.",
 },
 {
 mistake: "No written bug list",
 explanation: "You forget problems within an hour.",
 correctApproach: "Table: ID / problem / P / status.",
 },
 {
 mistake: "No replay after fixes",
 explanation: "A fix silently breaks a neighbor system.",
 correctApproach: "Golden path regression 5-7 min.",
 },
 {
 mistake: "You write \"they just didn't like it\"",
 explanation: "Nothing concrete to fix.",
 correctApproach: "Time + expectation + game behavior fact.",
 }
 ],
 summary:
 "You ran a blind playtest, built a bug list, closed critical UX/blockers, and confirmed the golden path. Lesson 86 finishes module 11 - the Place is ready as a base for release module 12.",
 practiceTask: {
 title: "Practice: blind test + fixes (~35 min)",
 difficulty: "beginner",
 description: `**Goal:** Game Polished after a blind test with P0/P1 closed.

### Part A - Blind session (12 min)
1. Prepare a notes sheet.
2. Tester plays 10 min; you stay silent the first 5+.
3. Write top-3 confusions + Output notes.

### Part B - Bug list and fixes (18 min)
1. Fill the P0-P3 table.
2. Close all P0 and the most painful P1 (sign/Prompt/button/volume…).
3. Walk the golden path + problem spots again.

### Part C - Rubric and Save (5 min)
1. Score 5 areas 1-5.
2. **File → Save to Roblox** → \`Module 11 - Game Polished\`.
3. Mark practice complete in LMS.

### Pass criteria
- Blind notes / top-3 exist
- Bug list exists
- P0 closed
- Golden path OK after fixes
- Place saved with module 11 final name`,
 hints: [
 "One bright sign at spawn often clears half of P1",
 "If there is no tester - two self blind runs with a timer and a ban on hinting yourself aloud",
 "Photo/save the bug list - you will need it in 12.5"
 ],
 optionalChallenge:
 "Record a 60-90 s screen video \"before/after\" of one UX fix (for example spawn onboarding).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the lesson number for 11.6 in the new grid?",
 options: [
          "86th of 92",
          "96th",
          "11th only within the module with no course number",
          "1st"
        ],
 correctAnswer: 0,
 explanation: "11.6 = lesson 86; next module 12 starts at 87.",
 },
 {
 id: "q2",
 type: MC,
 question: "What is a blind playtest?",
 options: [
          "A test only with the monitor off",
          "Play with no creator hints, to catch real confusion",
          "Publish with no description",
          "Deleting all Scripts"
        ],
 correctAnswer: 1,
 explanation: "Fresh eyes with no prompter.",
 },
 {
 id: "q3",
 type: MC,
 question: "How long should you stay silent at minimum at session start?",
 options: [
          "0 seconds - hint immediately",
          "Exactly 1 hour",
          "About 5 minutes",
          "Staying silent is forbidden"
        ],
 correctAnswer: 2,
 explanation: "Otherwise you hide onboarding.",
 },
 {
 id: "q4",
 type: MC,
 question: "What to fix first after the test?",
 options: [
          "Sky color first",
          "New genre from scratch first",
          "Fix nothing",
          "P0 blockers, then strong UX (P1)"
        ],
 correctAnswer: 3,
 explanation: "Priority before polish details.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why a golden path replay after fixes?",
 options: [
          "To delete the bug list",
          "To check that the fix did not break the route",
          "It replaces module 12",
          "Only for the game icon"
        ],
 correctAnswer: 1,
 explanation: "Regression is required.",
 },
 {
 id: "q6",
 type: MC,
 question: "Which Save name does the module 11 finale suggest?",
 options: [
          "SHOWCASE DAY",
          "Final GDD",
          "Module 11 - Game Polished",
          "Lesson 1.1 - House"
        ],
 correctAnswer: 2,
 explanation: "Polish control snapshot.",
 },
 {
 id: "q7",
 type: MC,
 question: "What to write in notes instead of \"they just didn't like it\"?",
 options: [
          "Time, what they expected, what happened",
          "Only emoji",
          "Nothing",
          "Only \"bad\""
        ],
 correctAnswer: 0,
 explanation: "A reproducible fact.",
 },
 {
 id: "q8",
 type: MC,
 question: "If two testers stuck in the same place, that is…",
 options: [
          "Random, can ignore",
          "A reason to delete the course",
          "A sign that Publish is already done",
          "A strong P1 signal that needs fixing"
        ],
 correctAnswer: 3,
 explanation: "Pattern > one opinion.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which module comes after 11.6?",
 options: [
          "Module 1 from scratch",
          "Module 11.7 (not in the new grid)",
          "Module 12 - Release",
          "Only Terrain separately"
        ],
 correctAnswer: 2,
 explanation: "Next: plan/assembly/Publish/SHOWCASE.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why a 1-5 score rubric?",
 options: [
          "To replace playtest",
          "To see weak areas honestly before module 12",
          "To turn Output off",
          "It is Roblox auto-scoring"
        ],
 correctAnswer: 1,
 explanation: "Quality self-audit.",
 },
 {
 id: "q11",
 type: MC,
 question: "Which quick fix often saves \"don't know where to go\"?",
 options: [
          "Delete spawn",
          "Add 10 GamePass at once",
          "Turn UI off forever",
          "Sign / arrow / bright landmark at spawn"
        ],
 correctAnswer: 3,
 explanation: "Onboarding decor works.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why is the module 11 bug list useful in 12.5?",
 options: [
          "It supplies challenge history for the portfolio",
          "It replaces Publish",
          "It is only needed for Terrain",
          "It is always deleted"
        ],
 correctAnswer: 0,
 explanation: "Real process > empty text.",
 },
 {
 id: "q13",
 type: MC,
 question: "What is a soft-lock in this lesson?",
 options: [
          "A nice door animation",
          "A Badge name",
          "The player is stuck and cannot continue normally",
          "A Lighting type"
        ],
 correctAnswer: 2,
 explanation: "Typical P0.",
 },
 {
 id: "q14",
 type: MC,
 question: "How many top confusions should you write at minimum?",
 options: [
          "Zero",
          "One hundred required",
          "Only one with no details",
          "About three"
        ],
 correctAnswer: 3,
 explanation: "Three concrete UX signals.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the submitted artifact for lesson 11.6?",
 options: [
          "Only a new Decal",
          "Blind notes + bug list + P0/P1 fixes + Game Polished Save",
          "Empty checklist",
          "Publish Public with no test"
        ],
 correctAnswer: 1,
 explanation: "Polish finale = verified playability.",
 }
 ],
 },
}
