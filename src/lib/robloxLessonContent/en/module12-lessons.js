/** Roblox Module 12 EN - 6 уроків (prod-92), фінал 12.6 SHOWCASE DAY */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson121 = {
 lessonId: "lesson-roblox-12-1",
 moduleId: "module-12",
 order: 1,
 title: "12.1 - Pitch + MVP + systems table",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Write a one-sentence game pitch",
 "Describe your main player and core loop (action → reward → again)",
 "Build a systems table: must have / if time / later",
 "Move the MVP table into the Place (Folder + Attributes / StringValues)",
 "Sketch a rough timeline for 12.2-12.6 with buffer",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 87 of 92)",
 content: `This is the **first lesson of the Release module**. You **plan the finale** so you do not drown in "one more feature" - and you lock the plan **in the Place**, not only in a notebook.

By the end you will have:
1. A **pitch** (1 sentence) in a document **and** as an Attribute on the Place.
2. A **core loop** of 5-7 steps.
3. A **systems table** with three columns.
4. A Folder \`MVP_Board\` in Workspace with the "must have" list.
5. A **timeline** through SHOWCASE.

Tomorrow (**12.2**) you assemble only from the **must have** column. If that column is bloated, the build falls apart.

**Do now (3 min):** open your finale candidate Place (or a new Baseplate \`Final_WIP\`). Create Folder \`Workspace/MVP_Board\`. You will fill it after the table.`,
 },
 {
 title: "Why plan if \"it is clear in my head\"",
 content: `| Without a plan | With a plan |
|----------------|-------------|
| A new idea every session | The list is frozen until the build |
| At SHOWCASE "almost everything" | Something complete to show |
| Hard to explain the game to a friend | The pitch lands in 10 seconds |
| Parents / teacher cannot see progress | There is a table and checkboxes |

A plan is not office bureaucracy. It is **protection from your own enthusiasm**. Ideas come fast; the document says "stop, ship this first."

**Do now (2 min):** write in one line which game you *want* to submit. Do not edit. This is a pitch draft.`,
 },
 {
 title: "One-sentence pitch",
 content: `Formula:

**"This is [genre/setting] where the player [does X] to [get Y]."**

Examples (adapt to your game):
- *"A hub simulator where you collect coins and buy an upgrade to collect faster."*
- *"A 3-biome obby with checkpoints where the player races to the finish for their best time."*
- *"A tycoon with one dropper and an upgrade shop on the player's plot."*
- *"A hub with an NPC quest and a shop where you complete tasks for coins."*

Pitch checks:
1. Can you say it aloud in **one breath**?
2. Is it clear **what to do in the first 30 s**?
3. Are there no "and also, and also, and also" lists?

Weak pitch: *"A super game with RPG, racing, arena, farm, seasons, and friends."*  
That pitch signals the MVP is not chosen yet.

**Do now (5 min):** 3 pitch drafts → keep 1. Read it aloud to a friend / teacher / yourself.`,
 },
 {
 title: "Who your player is (brief)",
 content: `Do not write "everyone in the world." For this course finale, this is enough:

| Question | Your answer |
|----------|-------------|
| Approx. age | e.g. 9-12 |
| Plays on PC / phone? | ... |
| What should feel fun in 2 min? | ... |
| What should they NOT need a lecture for? | ... |

If the target player is "like me" - fine. Onboarding can be shorter, but you still need a spawn tip: a newcomer to your game is not you-the-creator.

This block exists so tomorrow you do not ship UI with microscopic text "because I can read it."`,
 },
 {
 title: "Core loop: the heart of the game",
 content: `**Core loop** = what the player repeats again and again.

Template:
\`\`\`
Spawn / hub
→ understood the goal
→ did the main action
→ got a reward
→ got a bit stronger / closer to the goal
→ repeated
\`\`\`

Examples by course genre:

| Genre | Short loop |
|-------|------------|
| Sim | Collected → +coins → upgrade → collect more |
| Obby | Run → checkpoint → continue → finish / better time |
| Tycoon | Dropper → collect → buy upgrade → more income |
| Hub+quest | Prompt NPC → do task → reward → next step |
| Arena | Wave → damage → reward → next wave |

**Rule:** the loop should be explainable to a friend in **30 seconds**. If the explanation is longer than the game, the loop is fuzzy.

**Do now (7 min):** draw 5-7 arrows for your loop. Under each arrow - what is visible on screen (coin, Prompt, finish…).`,
 },
 {
 title: "Course systems inventory (where to pull details)",
 content: `You do not have to pull **every** module. Pick for your pitch.

| Module | What you can take into the finale |
|--------|-----------------------------------|
| M1-M2 | World, building/park, atmosphere |
| M3 | Prompt, Touched, debounce, while/for, GUI |
| M4 | table, Config, DataStore lite |
| M5 | Obby zone, checkpoints, juice |
| M6 | leaderstats, HUD, collecting |
| M7 | Dropper / plot purchases |
| M8 | Tool, damage, waves |
| M9 | Client/server, RemoteEvent, a race slice |
| M10 | Shop Remotes, NPC, quest, raycast |
| M11 | Loading, sound, Explorer cleanup |

For SHOWCASE, **2-3 strong systems** you actually understand are enough. An honest shop + leaderstats beats a "sort of RPG inventory" that crashes.

**Do now (5 min):** check off 4-6 systems that *almost already exist* in your Places. Those are easier to assemble tomorrow than writing from scratch.`,
 },
 {
 title: "Systems table: must have / if time / later",
 content: `Copy and fill in:

| System | Must have (MVP) | If time | Later (after release/course) |
|--------|-----------------|---------|------------------------------|
| Spawn + start tip | ☐ | | |
| Main loop / reward | ☐ | | |
| Teleport hub ↔ zone | ☐ | | |
| leaderstats / HUD | | ☐ | |
| Shop 1 item | | ☐ | |
| NPC + 1 quest | | ☐ | |
| DataStore save | | ☐ | |
| Badge | | ☐ | |
| Second zone / boss / skins | | | ☐ |

Column rules:
- **Must have** = without this the game is not submittable in 12.2-12.6. Usually **5-7** items, not 20.
- **If time** = only after a stable golden path.
- **Later** = ideas you deliberately **do not** build in the module 12 sprint.

If "must have" has more than 8 rows - cut. Ask: *"Will a player see this in a 2-minute demo?"* If no - move to "later."

This is the same table that tomorrow becomes the FREEZE law for the build.`,
 },
 {
 title: "Filled table example (shorten for yourself)",
 content: `**Pitch:** "Hub simulator: collect coins, buy 1 upgrade, take 1 quest from an NPC."

| System | Must have | If time | Later |
|--------|-----------|---------|-------|
| Hub + spawn + sign | yes | | |
| Collect zone + teleport | yes | | |
| leaderstats Coins | yes | | |
| Coins HUD | yes | | |
| Shop 1 upgrade (server) | yes | | |
| NPC Prompt + 1 quest | | yes | |
| DataStore | | yes | |
| Badge on first upgrade | | yes | |
| Second currency / pet | | | yes |
| PvP arena | | | yes |

Notice: even "cool" PvP went to **later**. That is normal. A small finished game beats a giant dream at 10%.

**Studio anchor (8-10 min, required):** in \`MVP_Board\` do:
1. StringValue / Attribute on the Folder: \`Pitch\` = your sentence.
2. Folder \`Must\` - one StringValue per "must have" row (name = system, Value = "must").
3. Folders \`Stretch\` and \`Later\` - the same for the other columns.
4. Billboard on a Part near spawn: first line of the pitch (the player "sees the plan" too).

Then the plan cannot get lost in chat. Tomorrow in 12.2 you open Explorer → \`Must\` and glue only that.`,
 },
 {
 title: "MVP in plain words",
 content: `**MVP** = the minimum version you can already:
- assemble in 12.2;
- test in 12.3;
- publish in 12.4;
- show at SHOWCASE.

MVP does **not** mean "a bad game." It means "a full loop without extras."

MVP test:
1. Is there a start, an action, a reward?
2. Can someone walk the golden path without a teacher as a guide?
3. Will an honest game description match what exists?
4. Can you stabilize this by 12.6?

If question 4 is "no" - cut systems today, not in panic on 12.5.

**Do now (4 min):** write the MVP as one paragraph of 3-4 sentences. If the paragraph is long - the MVP is still bloated.`,
 },
 {
 title: "Module 12 timeline with buffer",
 content: `| Lesson | What you submit | Work guide |
|--------|-----------------|------------|
| **12.1** (today) | Plan + MVP_Board in Place | 1 session |
| **12.2** | Place assembly + teleport | 1 dense session (+ homework if needed) |
| **12.3** | Test 10 required cases + P0 fixes | 1 session |
| **12.4** | Publish + Badge/GamePass lite | 1 session |
| **12.5** | Portfolio post | 1 session |
| **12.6** | SHOWCASE | 1 session |

Add **~30% buffer** in your head: something will break on assembly or in live. So do not plan "must have" as if every minute is perfect.

Home buffer (if you have it): 1-2 hours only on golden-path fixes between 12.2 and 12.3 - better than new features.`,
 },
 {
 title: "Art / sound / mood (brief, so you do not scatter)",
 content: `Pick **3 mood words**, for example: *bright, night, arcade* or *cozy, island, calm*.

Then only 3 decisions for that mood:
1. Main Material / hub color.
2. 1-2 sounds (click / reward), not a 40-track playlist.
3. Whether night (ClockTime) is a feature, or day for readability.

Do not start the finale with a full soundtrack and 50 Decals. Loop and systems table first. Mood can catch up in 12.2 / M11 polish skills if time remains in "if time."`,
 },
 {
 title: "How this document lives through the module",
 content: `| Plan section | Where you use it |
|--------------|------------------|
| Pitch | Publish description (12.4), opening words at SHOWCASE (12.6) |
| Core loop | Golden path of the build (12.2) and test cases (12.3) |
| Must-have table | FREEZE on 12.2 |
| "If time" | Only after P0s are closed |
| "Later" | "What's next" block in the portfolio (12.5) |
| Timeline | So you do not jump straight to Publish without a test |

Save the file so it opens tomorrow in 10 seconds: \`Lesson 12.1 - Final GDD\`.

**Do now (3 min):** bookmark the document / pin it in class Discord if that is how you submit.`,
 },
 {
 title: "Lesson 87 submit checklist",
 content: `- [ ] Pitch in 1 sentence (aloud + in MVP_Board)
- [ ] 2-3 lines about the player
- [ ] Core loop 5-7 steps
- [ ] Systems table with 3 columns (in Doc **and** in Folders Must/Stretch/Later)
- [ ] "Must have" / Must ≤ 8 items
- [ ] Timeline 12.2-12.6 + buffer understood
- [ ] 3 mood words (optional)
- [ ] Doc saved: \`Lesson 12.1 - Final GDD\`
- [ ] Place saved with \`MVP_Board\` (name like \`Lesson 12.1 - Final WIP\`)

Without a table **and** without MVP_Board in the Place, **do not start** a big "by eye" build in 12.2.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Everything in the \"must have\" column",
 explanation: "That is not an MVP, it is a dream. Build and test will not finish in time.",
 correctApproach: "At most 5-8 must-have items; the rest go to if time / later.",
 },
 {
 mistake: "A pitch full of \"and also\"",
 explanation: "Neither the player nor you understand the main point.",
 correctApproach: "One sentence: genre + action + reward.",
 },
 {
 mistake: "No core loop on paper",
 explanation: "Tomorrow you glue systems with no player route.",
 correctApproach: "5-7 loop arrows + the same steps in a note / MVP_Board.",
 },
 {
 mistake: "Planning systems you never built in the course",
 explanation: "Risk of zero progress by the module deadline.",
 correctApproach: "Check off first what almost already exists in your Places.",
 },
 {
 mistake: "Plan only in Doc/chat, Place with no MVP_Board",
 explanation: "Tomorrow you forget the scope and pull in extras.",
 correctApproach: "Folder MVP_Board with Must/Stretch/Later in the final Place",
 },
 {
 mistake: "Zero buffer in the timeline",
 explanation: "One DataStore bug eats Publish and the portfolio.",
 correctApproach: "+30% slack; cut features early, not the night before SHOWCASE.",
 },
 ],
 summary:
 "You built the finale plan: pitch, loop, MVP table, and MVP_Board in the Place. Lesson 87 is done - tomorrow assemble only from the Must folder.",
 practiceTask: {
 title: "Practice: Final GDD + MVP_Board (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** a plan document + the same MVP in Explorer.

### Part A - Identity (8 min)
1. 3 pitch drafts → 1 final.
2. Who the player is (brief).
3. Core loop 5-7 steps.

### Part B - Table (10 min)
1. Systems list → must have / if time / later.
2. Must have ≤ 8.
3. Timeline 12.2-12.6 + buffer.

### Part C - Studio anchor (12 min)
1. Folder \`MVP_Board\` + Pitch + Must/Stretch/Later.
2. Billboard with the pitch near spawn.
3. Save Doc \`Lesson 12.1 - Final GDD\` + Save Place \`Lesson 12.1 - Final WIP\`.

### Pass criteria
- Pitch + loop + table
- Must ≤ 8 and visible in Explorer
- Doc and Place open for the teacher`,
 hints: [
 "Table first for 5′, then straight into Must - do not postpone Studio",
 "Must have = what you will show at SHOWCASE",
 "If you hesitate between two features - put one in Later",
 ],
 optionalChallenge:
 "5 honest monetization lines in a StringValue MonetizationNote under MVP_Board (no implementation).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What lesson number is 12.1 in the new grid?",
 options: ["87th of 92", "96th", "1st", "50th"],
 correctAnswer: 0,
 explanation: "12.1 opens the release module as lesson 87.",
 },
 {
 id: "q2",
 type: MC,
 question: "Why a GDD / finale plan?",
 options: [
 "To stop feature bloat and still have something to submit on time",
 "To replace Play in Studio forever",
 "To turn off Output",
 "It is only needed for Terrain",
 ],
 correctAnswer: 0,
 explanation: "A plan protects the deadline and quality.",
 },
 {
 id: "q3",
 type: MC,
 question: "What makes a good pitch in this lesson?",
 options: [
 "One clear sentence: genre + action + reward",
 "A list of 40 systems with no main action",
 "An empty line",
 "Only RemoteEvent code",
 ],
 correctAnswer: 0,
 explanation: "The pitch should fit in one breath.",
 },
 {
 id: "q4",
 type: MC,
 question: "What does the core loop describe?",
 options: [
 "The player's repeated steps from action to reward",
 "The Roblox server IP",
 "The Robux price for the whole catalog",
 "Font size in Studio",
 ],
 correctAnswer: 0,
 explanation: "Loop = the heart of gameplay.",
 },
 {
 id: "q5",
 type: MC,
 question: "What does MVP mean here?",
 options: [
 "The minimum complete loop you can actually submit in module 12",
 "The maximum of every idea at once",
 "A game with zero features",
 "A random Free Model",
 ],
 correctAnswer: 0,
 explanation: "The minimum for release, not a year-long dream.",
 },
 {
 id: "q6",
 type: MC,
 question: "About how many items should stay in \"must have\"?",
 options: [
 "About 5-8, not dozens",
 "At least 30",
 "Exactly 0",
 "Only 1 with no loop",
 ],
 correctAnswer: 0,
 explanation: "Otherwise FREEZE on 12.2 will not work.",
 },
 {
 id: "q7",
 type: MC,
 question: "Where do you put the idea \"PvP arena from scratch\" if time is short?",
 options: [
 "In the \"later\" column",
 "Must have in MVP with no discussion",
 "Delete the pitch",
 "In the Publish icon instead of the game",
 ],
 correctAnswer: 0,
 explanation: "Deliberate deferral is part of the plan.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why ~30% buffer in the timeline?",
 options: [
 "For unexpected bugs and delays",
 "To delete the 12.3 test",
 "So you do not write a pitch",
 "Buffer is forbidden",
 ],
 correctAnswer: 0,
 explanation: "Build reality always eats time.",
 },
 {
 id: "q9",
 type: MC,
 question: "What should you take into the finale first?",
 options: [
 "Systems you already almost built in the course",
 "Only things you have never seen",
 "Someone else's Place with no changes",
 "An empty Baseplate with no plan",
 ],
 correctAnswer: 0,
 explanation: "A faster and more stable MVP.",
 },
 {
 id: "q10",
 type: MC,
 question: "Which lesson comes after 12.1?",
 options: [
 "12.2 - Finale assembly + TeleportService",
 "12.6 SHOWCASE immediately",
 "Module 1 from scratch",
 "12.7 (not in the new grid)",
 ],
 correctAnswer: 0,
 explanation: "Plan → build.",
 },
 {
 id: "q11",
 type: MC,
 question: "Where will the 12.1 pitch be used later?",
 options: [
 "In the Publish description and at the start of SHOWCASE",
 "Only in Terrain Editor",
 "Nowhere else",
 "Only in a Part name",
 ],
 correctAnswer: 0,
 explanation: "The pitch lives through the end of the module.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why is a \"finished small game\" better than a giant unfinished one?",
 options: [
 "You can test it, publish it, and show it honestly",
 "Because Roblox bans large games",
 "Because then LocalScript is not needed",
 "Because DataStore exists only for small games",
 ],
 correctAnswer: 0,
 explanation: "Scope discipline = a real release.",
 },
 {
 id: "q13",
 type: MC,
 question: "What should the \"must have\" column include about the start?",
 options: [
 "Spawn and a clear first action / tip",
 "Only a trailer with no game",
 "Only a GamePass",
 "Only sky Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Without a start there is no golden path.",
 },
 {
 id: "q14",
 type: MC,
 question: "What document save name does the lesson suggest?",
 options: [
 "Lesson 12.1 - Final GDD",
 "SHOWCASE DAY",
 "Playtest Pass",
 "Final Integration",
 ],
 correctAnswer: 0,
 explanation: "The only accepted name for submitting the plan.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the submitted artifact for lesson 12.1?",
 options: [
 "Doc with pitch/table + Place with MVP_Board (Must)",
 "A published Public game with no plan",
 "Only an icon",
 "An empty chat with no file",
 ],
 correctAnswer: 0,
 explanation: "The plan on paper and in Explorer.",
 },
 ],
 },
}

export const enLesson122 = {
 lessonId: "lesson-roblox-12-2",
 moduleId: "module-12",
 order: 2,
 title: "12.2 - Finale assembly + TeleportService",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Assemble the final Place from the MVP plan in lesson 12.1",
 "Freeze scope: only systems from the \"must have\" list",
 "Clean up Explorer (Folders, Remotes, one Config)",
 "Connect systems into one golden path with no red Output errors",
 "Add teleport hub → zone (TeleportService or teleport pad)",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 88 of 92)",
 content: `Today is **assembly day**, not new-ideas day.

In **12.1** you already have a pitch and a systems table (must have / if time / later). Today you:
1. Open (or create) **one** final Place.
2. Put in only what is in the **must have** column.
3. Connect it into a **golden path**: spawn → action → reward.
4. Add a **teleport** from hub to play zone (and back).
5. Save the build for tomorrow's test (**12.3**).

**Rule of the day:** if an idea is not on the 12.1 MVP list - it waits. Otherwise the build never stabilizes.

Open your 12.1 notes and the Place you will pull parts from (park zone, sim, hub…).`,
 },
 {
 title: "What \"finale assembly\" means in plain words",
 content: `| Not assembly | Assembly |
|--------------|----------|
| Three separate Places "almost done" | One Place you can play from start to reward |
| New features every hour | MVP list frozen |
| Scripts with the same names in a pile | Folders + one Config / one price source |
| "It works in my head" | Golden path passes in Play |

You are not rewriting the course. You **connect** what you already learned: Parts/Terrain, scripts, UI, maybe leaderstats, Prompt, shop, save - whatever you chose in 12.1.

**Do now (3 min):** write on paper 5-7 "must have today" items. If more than 7 - cut to 7. A narrow working MVP beats a mountain of unfinished work.`,
 },
 {
 title: "Scope freeze (feature freeze)",
 content: `**Freeze** = during this lesson you **do not add** new genres, new currencies, or new bosses "because it would be cool."

Allowed:
- copy/paste systems that already work from earlier Places;
- fix what breaks the golden path;
- remove duplicate Scripts;
- add teleport hub ↔ zone.

Forbidden (today):
- "and also a second quest tree";
- "and also a PvP arena from scratch";
- "and also a full seasonal battle pass".

Write on a sticky note: **FREEZE**. If a friend / your brain suggests a feature - put it in the 12.1 "later" column, not today's build.

Why so strict: tomorrow is **10 required test cases + fixes**. There is no point testing what is not stable yet.`,
 },
 {
 title: "60-minute assembly order",
 content: `| Step | Time | What you do | Done when… |
|------|------|-------------|------------|
| 1 | 8 min | Clean Place skeleton + Folders | Explorer is readable |
| 2 | 10 min | Hub: spawn, tip, lighting | Player understands the start |
| 3 | 15 min | Main loop (collect / obby / dropper / combat - your MVP) | There is a reward |
| 4 | 10 min | Teleport hub → zone → hub | Pad works |
| 5 | 10 min | Mini system link (UI / coins / Prompt) | No red on the path |
| 6 | 7 min | Play run + Save | Golden path OK |

Do not jump to step 4 until step 3 gives at least one reward. Teleporting to an empty zone wastes time.`,
 },
 {
 title: "Explorer skeleton for the finale",
 content: `Build (or bring to this shape):

\`\`\`
Workspace/
  Hub/          -- spawn, signs, teleport pads
  PlayZone/     -- obby / farm / arena / factory
  NPCs/         -- if any
ReplicatedStorage/
  Remotes/      -- RemoteEvent / RemoteFunction
  Config/       -- ModuleScript with prices/timings (one!)
ServerScriptService/
  Systems/      -- server logic
StarterGui/     -- HUD / shop / quest (what is in MVP)
ServerStorage/  -- Tools / templates (as needed)
\`\`\`

Naming rules:
- no \`Script\`, \`Script1\`, \`fff\`;
- one source of truth for prices: **one** Config, not three table copies in different Scripts;
- Remotes live in \`ReplicatedStorage/Remotes\`, names match the code.

**Do now (7 min):** create folders, drag junk from old Places, delete duplicate "LoadingScreen" / "ShopGui" if there are two.`,
 },
 {
 title: "How to move systems from old Places",
 content: `1. Open the old Place (where the feature already worked) in a second Studio tab or save a model.
2. Copy the **minimal** set: Parts + needed Scripts + Remotes + ModuleScript.
3. Paste into the finale in the correct folder.
4. Immediately press **Play** and test only that feature for 60-90 s.
5. If Output is red - **do not glue the next system**; fix first.

Typical glitches after copy:
| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| "Remote not found" | Different name / different folder | Match \`WaitForChild\` to Explorer |
| UI not visible | LocalScript not in StarterGui / PlayerGui | Check Parent |
| Wrong coins | Two leaderstats or two Configs | Keep one |
| Double sound / double effect | Script pasted twice | Delete the copy |

Copy **working** pieces, not "almost." One stable mechanic beats five broken ones.`,
 },
 {
 title: "Finale golden path (minimum)",
 content: `Lock the route on paper **before** an hour of copying:

1. **Spawn** in Hub.
2. Player sees **what to do** (sign / light / arrow / NPC).
3. Goes to **teleport** into PlayZone (or starts the loop in the hub if that is the MVP).
4. Does the **main action** (collect, obby stage, purchase, wave…).
5. Gets a **reward** (coin, quest step, finish, Badge plan - whatever exists).
6. (Optional) returns to Hub by teleport.

This route becomes the base of the 12.3 test plan and the SHOWCASE demo.

**Do now (4 min):** draw 6 steps with arrows. If you cannot draw them - the MVP is still fuzzy; return to the 12.1 list.`,
 },
 {
 title: "TeleportService: why it is in the finale",
 content: `Large Roblox games often have a **hub** and separate **Places** for modes. \`TeleportService\` moves a player from one Place to another (by PlaceId).

For a school MVP there are two difficulty levels:

| Level | What you do | When to choose |
|-------|-------------|----------------|
| **A. Teleport pad in the same Place** | Part + Touched / Prompt → \`PivotTo\` / CFrame to another map point | Fast, fewer settings, ideal for one Place |
| **B. TeleportService to another Place** | Separate Place "Arena" / "Obby" + teleport by PlaceId | If you already have 2 Places and want a "real" hub |

For most course finales **level A is enough** and still feels like a hub. Level B is a challenge if you have time and the teacher is OK with a second Place.

Important: teleport is not decoration. It belongs on the golden path: hub → play → (preferably) back.`,
 },
 {
 title: "Level A: teleport pad in one Place (steps)",
 content: `1. In \`Workspace/Hub\` make Part \`TeleportToZone\` (Neon, Anchor = true).
2. In \`PlayZone\` place Part \`ArriveHere\` (can be transparent) - arrival point.
3. Add a **Script** (server) near the pad or in Systems:

\`\`\`lua
local pad = workspace.Hub:WaitForChild("TeleportToZone")
local arrive = workspace.PlayZone:WaitForChild("ArriveHere")

pad.Touched:Connect(function(hit)
	local character = hit.Parent
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	if not humanoid then return end
	-- simple debounce on the character
	if character:GetAttribute("TeleportCD") then return end
	character:SetAttribute("TeleportCD", true)
	character:PivotTo(arrive:GetPivot())
	task.delay(1.5, function()
		if character then character:SetAttribute("TeleportCD", nil) end
	end)
end)
\`\`\`

4. Make a return pad \`TeleportToHub\` in the zone.
5. Add a sign: "Stand on the pad → play zone."

**Debounce is required:** without it Touched teleports 20 times in a row.

Alternative to Touched - **ProximityPrompt** on the pad ("Press E - enter zone"). For newcomers Prompt is often clearer: fewer accidental triggers when you just run past.

Checks before submitting pads:
1. Anchored = true on the pad (otherwise physics flings the Part).
2. CanCollide can stay true, but ArriveHere is better invisible and non-colliding so it does not push.
3. If the character teleports "into the floor" - raise ArriveHere 3-4 studs.
4. After PivotTo the camera sometimes faces a wall - acceptable in MVP; for SHOWCASE place ArriveHere with a clear view of hub/zone.

**Do now (12 min):** both pads there-and-back + signs. Test in Play 3 times.`,
 },
 {
 title: "Level B (challenge): TeleportService to another Place",
 content: `If you make a separate Place:

1. **File → Publish / Save** both Places into one Experience (or a clear link in Creator Dashboard).
2. Find the target **PlaceId** (on the experience page / in the URL / in Dashboard).
3. On the server:

\`\`\`lua
local TeleportService = game:GetService("TeleportService")
local TARGET_PLACE_ID = 0000000000 -- put your PlaceId

-- example: button/pad calls player teleport
local function sendToMode(player)
	local ok, err = pcall(function()
		TeleportService:TeleportAsync(TARGET_PLACE_ID, { player })
	end)
	if not ok then
		warn("Teleport failed:", err)
	end
end
\`\`\`

4. Teleport **from the server** (or via a Remote the server confirms) - not a "magic" LocalScript with a foreign PlaceId and no control.
5. In Studio, teleport to another Place can behave differently than live. For lesson submit it is enough: the pad runs code without error + PlaceId in your notes; full live teleport you can check after Publish (12.4) if needed.

If time is burning - **submit level A**. Challenge B does not block moving to 12.3.`,
 },
 {
 title: "Linking systems without chaos",
 content: `After hub, zone, and teleport, connect only what is in MVP:

| If MVP has… | Minimum for today |
|-------------|-------------------|
| Coins | leaderstats or IntValue + one way to earn a coin in the zone |
| Shop | one purchase, price from Config, server check |
| Quest | one Prompt → one flag → reward |
| Obby | 1 checkpoint + finish |
| Combat | 1 Tool / 1 wave - no new enemy types "for later" |

Connection order:
1. First the zone loop gives a reward.
2. Then UI shows the reward.
3. Then save (if any) - leave Play / join again.
4. Only then polish sound.

**Bug isolation:** if something broke - disable the last added Script (Disabled = true) and check whether the golden path revived. Faster than reading all the code.

Another quick tip: in Output filter by your \`print\` prefix, e.g. \`[SHOP]\`, \`[TP]\`, \`[QUEST]\`. Then you see which system answered. Without prefixes the log becomes 40-line mush and you lose 10 minutes.

If DataStore is still raw - **do not block** the whole build on it. The golden path can live on session coins in server memory. Finish save after loop and teleport are stable (or leave as P1 for 12.3).`,
 },
 {
 title: "Reset command for testing (lite)",
 content: `During assembly you often want "like a new player." Make yourself a **temporary** server reset (Studio / your UserId only):

\`\`\`lua
-- idea example, adapt to your variables
local ALLOWED = { [123456789] = true } -- your UserId

local function resetMyTest(player)
	if not ALLOWED[player.UserId] then return end
	-- zero coins / quest / inventory in memory
	-- and save if you have DataStore
	print("TEST RESET", player.Name)
end
\`\`\`

Or simpler for MVP without save: just **Stop → Play** and teleport from zero. Do not spend half a lesson on a dream admin panel.

Tomorrow on 12.3 you will need to reset progress even more often - set up a convenient way today.`,
 },
 {
 title: "Lesson 88 submit checklist",
 content: `- [ ] One final Place, not three "almost"
- [ ] MVP list frozen (no new features outside the list)
- [ ] Explorer with folders Hub / PlayZone / Remotes / Systems
- [ ] Golden path: spawn → action → reward passes in Play
- [ ] Teleport hub ↔ zone (level A minimum)
- [ ] No red Output errors on the golden path
- [ ] Note: what went in / what you deferred (needed in 12.5)
- [ ] Save: \`Lesson 12.2 - Final Integration\`

Next: **12.3** runs the build through a test plan (10 required cases + P0 fixes). Do not publish or write portfolio today - stable build first.`,
 },
 {
 title: "What to show the teacher / yourself at the end of class",
 content: `Show in 60-90 seconds (no long lecture):

1. Explorer: folders in place.
2. Play: spawn in Hub.
3. Teleport into the zone.
4. One reward / one main action.
5. Teleport back (if you have it).
6. Output with no red on this route.

If any of this is missing - do not say "almost done." Fix that hole. Tomorrow's test plan hits missing onboarding and broken teleport hard.

Note for later (12.5): one line "biggest snag today" - e.g. "two ShopGui" or "pad without debounce." That is already a draft for the portfolio challenge block.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Adding new features during assembly",
 explanation: "The Place never stabilizes; tomorrow's test fails.",
 correctApproach: "FREEZE: only MVP from 12.1 + teleport + path fixes.",
 },
 {
 mistake: "Two Config copies / two leaderstats",
 explanation: "Prices and coins drift apart; \"sometimes\" bugs.",
 correctApproach: "One source of truth in ReplicatedStorage/Config.",
 },
 {
 mistake: "Teleport without debounce on Touched",
 explanation: "Player gets flung back and forth or spams errors.",
 correctApproach: "Attribute / flag + task.delay 1-2 s.",
 },
 {
 mistake: "Gluing five systems with no Play between them",
 explanation: "You do not know which one broke the build.",
 correctApproach: "After each paste - 60-90 s Play.",
 },
 {
 mistake: "No return teleport to hub",
 explanation: "Golden path breaks; tester \"stuck in the zone.\"",
 correctApproach: "Return pad or return button in MVP.",
 },
 ],
 summary:
 "You assembled one final Place from a frozen MVP, cleaned Explorer, walked the golden path, and added teleport hub ↔ zone. Lesson 88 is ready for the 12.3 test plan.",
 practiceTask: {
 title: "Practice: final assembly + teleport (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** one Place with a golden path and teleport hub ↔ zone.

### Part A - Skeleton and MVP (10 min)
1. Open/create the final Place.
2. Make folders Hub, PlayZone, Remotes, Systems.
3. Paste only "must have" items (12.1). After each paste - short Play.

### Part B - Loop + teleport (15 min)
1. Build the minimum: action → reward in PlayZone.
2. Make pads TeleportToZone and TeleportToHub with debounce.
3. Walk the golden path twice with no red Output.
4. (Challenge) TeleportService to a second Place - only if Part A/B are already stable.

### Part C - Submit (5 min)
1. Write: what went in / what you deferred.
2. **File → Save to Roblox** → \`Lesson 12.2 - Final Integration\`.
3. Mark the practice complete in the LMS.

### Pass criteria
- One final Place
- MVP with no "from my head" features
- Golden path passes
- Teleport there-and-back works
- Output clean on this route
- Place saved`,
 hints: [
 "Reward in the zone first, pretty hub second",
 "A sign on the pad reduces confusion on tomorrow's test",
 "If a Remote is not found - match the name character by character",
 ],
 optionalChallenge:
 "Separate mode Place + TeleportAsync by PlaceId + return to hub Place (record PlaceId in notes).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What lesson number is 12.2 in the new grid?",
 options: ["88th of 92", "96th", "1st", "12th with no course number"],
 correctAnswer: 0,
 explanation: "12.2 = lesson 88; next 12.3 (89) … 12.6 (92).",
 },
 {
 id: "q2",
 type: MC,
 question: "What does scope freeze mean in this lesson?",
 options: [
 "Do not add features outside the 12.1 MVP",
 "Delete all Scripts",
 "Publish to Public immediately",
 "Turn off Explorer forever",
 ],
 correctAnswer: 0,
 explanation: "Freeze keeps the build stable.",
 },
 {
 id: "q3",
 type: MC,
 question: "What is a logical start for an assembly hour?",
 options: [
 "Place skeleton + folders, then hub and main loop",
 "Trailer and portfolio immediately",
 "GamePass for Robux immediately",
 "Random Free Models with no check",
 ],
 correctAnswer: 0,
 explanation: "Foundation → loop → teleport.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why one Config / one price table?",
 options: [
 "So shop, rewards, and balance do not drift apart",
 "Because Terrain requires it",
 "To turn off Output",
 "It is only for the game icon",
 ],
 correctAnswer: 0,
 explanation: "One source of truth for data.",
 },
 {
 id: "q5",
 type: MC,
 question: "What is the golden path in the finale?",
 options: [
 "Spawn → clear action → reward (often via teleport into the zone)",
 "Only Lighting settings",
 "Full code with no game",
 "Random wandering with no goal",
 ],
 correctAnswer: 0,
 explanation: "A short quality route.",
 },
 {
 id: "q6",
 type: MC,
 question: "What teleport minimum is needed to submit?",
 options: [
 "Hub ↔ zone pad in one Place with debounce",
 "Required: 10 separate Places",
 "Teleport only in description with no code",
 "TeleportService with no test at all",
 ],
 correctAnswer: 0,
 explanation: "Level A is enough; B is a challenge.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why does a Touched teleport need debounce?",
 options: [
 "Touched can fire many times in a row",
 "Because then Anchored turns off",
 "Because otherwise LocalScript does not exist",
 "Debounce is only needed for sound",
 ],
 correctAnswer: 0,
 explanation: "Without a pause the player gets flung / the event spams.",
 },
 {
 id: "q8",
 type: MC,
 question: "Where should you call TeleportService:TeleportAsync?",
 options: [
 "On the server (or after a Remote with a check)",
 "Only in a Properties comment",
 "Required every frame in RenderStepped on the client with no server",
 "In Terrain Editor",
 ],
 correctAnswer: 0,
 explanation: "The server controls Place transitions.",
 },
 {
 id: "q9",
 type: MC,
 question: "What do you do after pasting another system from an old Place?",
 options: [
 "Short Play 60-90 s and check Output",
 "Immediately paste five more systems",
 "Delete Hub",
 "Skip checking until SHOWCASE",
 ],
 correctAnswer: 0,
 explanation: "You isolate the break source.",
 },
 {
 id: "q10",
 type: MC,
 question: "Which lesson comes after 12.2?",
 options: [
 "12.3 - Test plan + P0 fixes",
 "12.6 SHOWCASE with no test",
 "Module 1 from scratch",
 "12.7 (not in the new grid)",
 ],
 correctAnswer: 0,
 explanation: "Test first, then Publish.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why a return teleport to hub?",
 options: [
 "So the golden path and test do not break off in the zone",
 "To delete DataStore",
 "It is only needed for the icon",
 "Return pad is forbidden",
 ],
 correctAnswer: 0,
 explanation: "Return completes the route.",
 },
 {
 id: "q12",
 type: MC,
 question: "What if after merge you get \"Remote not found\"?",
 options: [
 "Match Remotes name and path in Explorer to WaitForChild",
 "Delete all of Workspace",
 "Ignore until the portfolio",
 "Set Public in Publish",
 ],
 correctAnswer: 0,
 explanation: "A typical error after copying.",
 },
 {
 id: "q13",
 type: MC,
 question: "What is the 12.2 build based on?",
 options: [
 "On the MVP plan / systems table from 12.1",
 "On an empty Baseplate with no plan",
 "Only on module 11 with no pitch",
 "On someone else's catalog game with no changes",
 ],
 correctAnswer: 0,
 explanation: "Plan first, then build.",
 },
 {
 id: "q14",
 type: MC,
 question: "What Save name does the lesson suggest?",
 options: [
 "Lesson 12.2 - Final Integration",
 "SHOWCASE DAY",
 "Portfolio Post",
 "Playtest Pass",
 ],
 correctAnswer: 0,
 explanation: "The only accepted name for submitting the build.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the submitted artifact for lesson 12.2?",
 options: [
 "One Place with MVP, golden path, and teleport hub↔zone + Save",
 "Only an idea list with no Play",
 "Only the game icon",
 "Publish Public with no build",
 ],
 correctAnswer: 0,
 explanation: "Assembly = a playable final Place.",
 },
 ],
 },
}

export const enLesson123 = {
 lessonId: "lesson-roblox-12-3",
 moduleId: "module-12",
 order: 3,
 title: "12.3 - Test plan + P0 fixes",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Walk 10 required golden-path cases (+ up to 10 optional)",
 "Distinguish P0-P3 and close critical issues before Publish",
 "Run a blind playtest with no hints",
 "Close at least 2 live P0/P1s with a timer",
 "Confirm the golden path and save the bug list for 12.5",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 89 of 92)",
 content: `Today you do not "just play." You are a **tester with a timer** - because tomorrow is **Publish (12.4)**.

Hour goals:
1. Walk **10 required cases** (start + loop).
2. Optionally / if time - up to **10 more optional** (systems / polish).
3. Write a bug list.
4. **Live fixes:** at least **2 P0 or painful P1** before class ends.
5. Walk the golden path again.

Teaser: *"Tomorrow the game goes to Roblox. Today we do not let embarrassing bugs through."*

Open the build from **12.2**. Turn Output on immediately.

**Do now (2 min):** Play → spawn is not in the void → Stop → note title \`Test 12.3\`.`,
 },
 {
 title: "Why you need a plan, not random clicks",
 content: `| Random play | Test by plan |
|-------------|--------------|
| "Seems OK" | Concrete checks yes / no / N/A |
| Forget bugs in an hour | A prioritized list |
| Fix pretty things while the loop is dead | First what blocks the game |
| Embarrassing at SHOWCASE | Fewer live surprises |

The plan does not need to be "10 pages of Excel." **10 required** cases are enough. Cases 11-20 are bonus if time allows.

Without a plan you only check your favorite route. Bugs hide in a **newcomer's first minute**.

**Do now:** in notes, title \`Test 12.3\` + space for cases **1-10** (required) and **11-20** (optional).`,
 },
 {
 title: "Priorities: what to fix first",
 content: `| Code | Name | Examples | Before Publish? |
|------|------|----------|-----------------|
| **P0** | Critical | Crash, soft-lock, save loss, shop charges coins twice | **Must fix** |
| **P1** | Strong UX | Unclear what to do at start, invisible button, no tip to the shop | **Prefer today** |
| **P2** | Balance | Too long to first reward, enemy one-shots | If time remains |
| **P3** | Cosmetic | Crooked sign color, tiny decor | After P0/P1 |

Rule of the day: **do not paint the sign while the player is stuck in a wall.**

Quick priority check: "If we leave this - can a new player walk the golden path in 3-5 min?" If no - at least **P1**, often **P0**.

Finale example: Prompt near the NPC exists, but **MaxActivationDistance** is too small - it feels like "the quest is broken." That is **P1** (sometimes P0 if without Prompt there is no loop at all). Hub roof color - **P3**.`,
 },
 {
 title: "How to run a session (15 min)",
 content: `1. Tester sits / takes the mouse. You **do not hint** for the first **5 minutes**.
2. Ask them to **think aloud**: "looking for the shop… do not see a button…".
3. Write time and fact: \`03:40 - did not find Prompt near NPC\`.
4. After the session three short questions:
   - What was clearest?
   - Where did you get stuck?
   - What broke?
5. Repeat with another tester or a new "blind" run yourself.

If 2 of 3 stuck in the same place - that is not "bad luck." That is a **P1** you must fix.

**Studio technique during the session:**
- Keep **Output** open (View → Output). A red line at the moment of a button click goes straight into the bug list with a timestamp.
- If the tester is "stuck" - do not move the camera toward the goal for them. Note where they look.
- After Stop take a screenshot or short note: \`Spawn → left to the cliff → dead end\`.

Self-test: close your eyes for 3 seconds before Play and tell yourself "I am a new player, I did not read the instructions." Then follow only what is visible in the world.`,
 },
 {
 title: "Test plan: start (cases 1-5) - REQUIRED",
 content: `| # | Case | How to check | OK? |
|---|------|--------------|-----|
| 1 | Spawn works | Enter Play - character appears at start | |
| 2 | In 60 s it is clear what to do | New player with no hints | |
| 3 | There is a visible landmark | Arrow, light, sign, bright NPC… | |
| 4 | First action is obvious | Click / Prompt / run to the zone | |
| 5 | No instant soft-lock | Do not fall into void / do not stick in a Part | |

Write notes next to the case number, not "somewhere it was bad."

**Where to look in Studio:** SpawnLocation in Workspace (or your start point), CanCollide on walls near spawn, Anchored on the floor. If you fall through the floor - check **CanCollide = true** and whether Terrain has a hole.

**Do now:** run cases 1-5 once "blind." If case 2 fails - before the shop place a BillboardGui / Part with an arrow to the first goal.`,
 },
 {
 title: "Test plan: loop (cases 6-10) - REQUIRED",
 content: `| # | Case | How to check | OK? |
|---|------|--------------|-----|
| 6 | Main action gives a result | Collect / jump / buy / hit / round - something changes | |
| 7 | First reward in a reasonable time | Not 20 min of empty running | |
| 8 | Loop can repeat | You can do the action again | |
| 9 | UI shows progress | Coins, timer, quest, rounds - something readable | |
| 10 | Defeat / death does not break the game | Respawn or clear restart | |

This is the heart of the finale. If there are holes here - Publish is early.

MVP time guide: **first reward in 1-3 minutes** of honest play (not 20). If the "do → get → repeat" loop breaks after the first time (coin does not respawn, quest stuck on "done"), that is **P0/P1**.

Case 10 check: deliberately die / fall into a hazard. Do you appear again in a clear state (HP, coins, quest not broken)? No black screen / dead UI left behind?`,
 },
 {
 title: "Optional: systems (cases 11-15)",
 content: `If 1-10 are green and time remains - run systems. Otherwise **move to P0 fixes**.

| # | Case | How to check | OK? |
|---|------|--------------|-----|
| 11 | Shop / purchase (if any) | Charged exactly once; not twice | |
| 12 | Quest / NPC / Prompt (if any) | Text and action OK | |
| 13 | Save (if DataStore) | Stop→Play, progress | |
| 14 | Hazard / damage (if any) | Fair, with debounce | |
| 15 | Output with no red on golden path | Watch during the run | |

N/A for missing systems is fine.

**Shop:** double-click Buy - did it charge twice?
**DataStore:** in Studio it can be flaky - note that.`,
 },
 {
 title: "Optional: feel (cases 16-20)",
 content: `| # | Case | How to check | OK? |
|---|------|--------------|-----|
| 16 | Sound does not hurt ears | Volume / Looped | |
| 17 | UI is readable | Small Studio window | |
| 18 | Lag is tolerable | Not "10 FPS on empty" | |
| 19 | Small screen | Emulator or shrink the window | |
| 20 | "Would I come back?" | Honest answer after the session | |

Case 20 signals onboarding/balance, not ego.

LTV rule: **better 10 cases + 2 fixes** than 20 checkmarks with no edits.`,
 },
 {
 title: "Live fixes: 2 bugs with a timer",
 content: `After the first 1-10 run, pick the **2 worst** bugs (P0 or repeating P1).

Sprint format (≈12-15 min):
1. Set 6-7 min on bug A → fix → short Play of that spot.
2. 6-7 min on bug B → fix → Play.
3. Full golden path again (start → action → reward) + Output.

Do not touch P3 "roof color" while A/B are open.

If one P0 is heavy - finish it fully; the second can be a world-hint workaround (sign/arrow) so a newcomer does not stand still.

**Do now:** write bugs A and B in the bug list with "fix by __:__".`,
 },
 {
 title: "Golden path and regression after fixes",
 content: `**Golden path** - a short quality control route: **start → main action → first reward**. Not "everything in the game," just the path a guest should walk in a few minutes.

Write it in three lines, for example:
1. Spawn near the hub.
2. Prompt at NPC → take quest / tip.
3. Collect 3 coins → open shop → buy 1 upgrade.

After every **P0/P1** fix, walk this path again (**regression**). Typical surprise: you fixed purchase - broke coin UI update; you moved a Part for Prompt - player falls into a hole again.

**Do now:** write your golden path in notes before mass fixing. After fixes check "passed after edits."`,
 },
 {
 title: "Bug list template",
 content: `Copy for yourself:

| ID | What is wrong | Case # | Priority | Status |
|----|---------------|--------|----------|--------|
| 1 | Prompt not visible near doors | 4 | P1 | open |
| 2 | Coins vanish after restart | 13 | P0 | open |
| 3 | Sign sits crooked | 17 | P3 | later |

A good bug row = **time + place + expectation + fact**. Weak: "shop is glitchy." Better: \`07:10 - near ShopPart - expected charge 50, charged 100 after double click\`.

After fixes:
1. Set status to **fixed** (or "deferred" for P3).
2. Walk the **golden path** fully again (start → main action → reward).
3. Only then consider the lesson ready for **12.4**.

Do not throw away the bug list: in **12.5** it becomes the "hardest challenge" story for the portfolio.`,
 },
 {
 title: "What counts as \"ready to Publish\" today",
 content: `- All **P0** closed.
- Critical **P1**s that repeated in 2+ runs closed, or a temporary world hint workaround (sign / arrow / bright Part).
- Golden path passes with no Output red on that route.
- Bug list saved (Doc / sheet) - needed for portfolio.

Cosmetics can wait for polish if time ran out. Better an honest **P3** list than a hidden soft-lock.

If one hard **P1** remains and the hour ended - document it clearly (repro steps) and add a minimal world workaround so a guest is not stuck. Full fix can finish before **12.4**, but do not publish with an open **P0**.`,
 },
 {
 title: "Lesson 89 submit checklist",
 content: `- [ ] Cases **1-10** marked ok / no / N/A
- [ ] (Optional) 11-20 if time remained
- [ ] ≥1 run with no hints
- [ ] Bug list P0-P3
- [ ] **≥2 live fixes** P0/P1 done today
- [ ] Golden path after fixes + Output clean on the route
- [ ] Save: \`Lesson 12.3 - Playtest Pass\`

End teaser: tomorrow Publish - today the till and the start are not embarrassing.

If a P0 is still open - **do not** go to 12.4.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Hinting the tester from the first second",
 explanation: "You do not see real onboarding.",
 correctApproach: "Stay silent ≥5 min, write facts.",
 },
 {
 mistake: "20 checkmarks with zero fixes",
 explanation: "Bureaucracy instead of Publish readiness.",
 correctApproach: "10 cases + at least 2 live fixes",
 },
 {
 mistake: "Fixing sign color while the game crashes",
 explanation: "Wrong priority.",
 correctApproach: "P0 first, then P1.",
 },
 {
 mistake: "No golden-path recheck after fixes",
 explanation: "A fix breaks a neighboring system.",
 correctApproach: "Regression after A/B fixes.",
 },
 {
 mistake: "Writing \"everything is bad\" with no case number",
 explanation: "No way to reproduce.",
 correctApproach: "Time + case # + expectation / fact.",
 },
 ],
 summary:
 "You ran 10 required cases, closed at least 2 live P0/P1s, and confirmed the golden path. Lesson 89 is ready for Publish in 12.4.",
 practiceTask: {
 title: "Practice: 10 cases + 2 fixes (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** cases 1-10 + 2 live fixes + a passing golden path.

### Part A - Run (10 min)
1. Cases 1-10 into notes (ok / no / N/A + time).
2. Output open; 1 "blind" run.

### Part B - Live fixes (15 min)
1. Pick the 2 worst P0/P1s.
2. Timer ~7 min each → fix → short Play.
3. Full golden path + Output.

### Part C - Submit (5 min)
1. (Optional) cases 11-20 if you had time.
2. Save \`Lesson 12.3 - Playtest Pass\` + bug list for 12.5.
3. Mark practice in the LMS.

### Pass criteria
- 1-10 marked
- ≥2 fixes today
- P0 closed (or honest workaround + docs)
- Golden path after fixes
- Place saved`,
 hints: [
 "Better 10+2 fixes than 20 checkmarks with no edits",
 "A repeated snag in 2 runs = almost always P1",
 "Keep Output open on the golden path",
 ],
 optionalChallenge:
 "Ask a friend to walk cases 1-10 and compare notes; or walk 11-15 yourself.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What lesson number is 12.3 in the new grid?",
 options: ["89th of 92", "96th", "1st", "50th"],
 correctAnswer: 0,
 explanation: "12.3 = 89; next 12.4 (90), 12.5 (91), 12.6 (92).",
 },
 {
 id: "q2",
 type: MC,
 question: "What is P0 in the test plan?",
 options: [
 "A critical bug that blocks a normal launch",
 "A tiny sign color",
 "A trailer idea",
 "Optional decor",
 ],
 correctAnswer: 0,
 explanation: "P0s are fixed before Publish.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why stay quiet in the first playtest minutes?",
 options: [
 "To see real onboarding without hints",
 "Because talking is banned on Roblox",
 "To close Output faster",
 "Because then the test is not needed",
 ],
 correctAnswer: 0,
 explanation: "Hints hide UX problems.",
 },
 {
 id: "q4",
 type: MC,
 question: "How many required cases are in this lesson's plan?",
 options: [
 "10 required (+ up to 10 optional)",
 "Exactly 2",
 "100 required",
 "0 - no plan needed",
 ],
 correctAnswer: 0,
 explanation: "1-10 first; the rest if you have time.",
 },
 {
 id: "q5",
 type: MC,
 question: "If 2 of 3 testers stuck near the shop, that is…",
 options: [
 "A repeating UX signal you must fix",
 "Random chance, can ignore",
 "A reason to delete the whole game",
 "A sign that Publish is already done",
 ],
 correctAnswer: 0,
 explanation: "Pattern matters more than one opinion.",
 },
 {
 id: "q6",
 type: MC,
 question: "What to fix earlier: soft-lock or sign color?",
 options: [
 "Soft-lock (P0) before cosmetics (P3)",
 "Color first, because it looks nice",
 "Fix nothing",
 "Music only",
 ],
 correctAnswer: 0,
 explanation: "Priority before release.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why open Output during the golden path?",
 options: [
 "To see red script errors on the player route",
 "To delete Terrain",
 "To change the module name",
 "Output is unrelated to testing",
 ],
 correctAnswer: 0,
 explanation: "Errors on the golden path are P0/P1 candidates.",
 },
 {
 id: "q8",
 type: MC,
 question: "What should happen after bug fixes?",
 options: [
 "A second pass of the golden path",
 "Delete the bug list immediately",
 "Skip Publish forever",
 "Start a new course from 1.1",
 ],
 correctAnswer: 0,
 explanation: "A fix can break a neighbor - check again.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which lesson comes after a successful 12.3?",
 options: [
 "12.4 - Publish + Badge + GamePass-lite",
 "12.6 SHOWCASE with no Publish",
 "Only module 2",
 "12.7 (not in the new grid)",
 ],
 correctAnswer: 0,
 explanation: "Test → publish.",
 },
 {
 id: "q10",
 type: MC,
 question: "What is a soft-lock in this context?",
 options: [
 "The player is stuck and cannot continue normally",
 "A nice door animation",
 "A Badge name",
 "A GamePass type",
 ],
 correctAnswer: 0,
 explanation: "Soft-lock = a typical P0.",
 },
 {
 id: "q11",
 type: MC,
 question: "How do you mark a system that is not in your finale?",
 options: [
 "N/A on the case, do not invent a bug",
 "Must set P0",
 "Delete the whole test plan",
 "Write that the game is perfect",
 ],
 correctAnswer: 0,
 explanation: "Test only what actually exists.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why keep the bug list after the lesson?",
 options: [
 "For fixes and for the challenge story in the portfolio",
 "To replace Publish",
 "Terrain Editor requires it",
 "The bug list is deleted immediately",
 ],
 correctAnswer: 0,
 explanation: "12.5 loves real challenges from testing.",
 },
 {
 id: "q13",
 type: MC,
 question: "What is in the \"golden path\"?",
 options: [
 "A short route: start → main action → reward",
 "Only lighting settings",
 "Full code of every ModuleScript with no game",
 "Random wandering with no goal",
 ],
 correctAnswer: 0,
 explanation: "It is the quality control route.",
 },
 {
 id: "q14",
 type: MC,
 question: "What Place save name does the lesson suggest?",
 options: [
 "Lesson 12.3 - Playtest Pass",
 "SHOWCASE DAY",
 "Portfolio Post",
 "Untitled Experience",
 ],
 correctAnswer: 0,
 explanation: "The only accepted name for submitting this lesson.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the submitted artifact for lesson 12.3?",
 options: [
 "Cases 1-10 + ≥2 live fixes + bug list + golden path",
 "Only one screenshot with no notes",
 "An empty checklist",
 "Publish with no test",
 ],
 correctAnswer: 0,
 explanation: "Test day = cases + fixes before release.",
 },
 ],
 },
}

export const enLesson124 = {
 lessonId: "lesson-roblox-12-4",
 moduleId: "module-12",
 order: 4,
 title: "12.4 - Publish + Badge + GamePass-lite",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Publish the Place on Roblox with name, description, icon, and thumbnail",
 "Set access (private / friends / public) and test the game from another account",
 "Enable API Services if the game saves data (DataStore)",
 "Create or plan a simple Badge and know when to award it",
 "Explain GamePass vs DevProduct (lite, no complex Roblox shop)",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 90 of 92)",
 content: `Today the game leaves **Studio for Roblox** for real players - not only Play in the editor.

You already have the build from **12.2** and the test from **12.3**. Now four blocks:
1. **Publish** in Studio + metadata on **Creator Dashboard** (name, description, icon, thumbnails, access)
2. **Live test** from another account via the link
3. **Badge** lite - one achievement badge (create + when to award)
4. **GamePass** lite - understand the difference from DevProduct and school policy on Robux

Tomorrow (**12.5**) the link goes into the portfolio. The day after (**12.6**) - SHOWCASE.

Open the final Place. In a browser nearby keep **create.roblox.com** (Creator Dashboard) under the same account you publish from.`,
 },
 {
 title: "Checklist before Publish",
 content: `| Check | Why |
|-------|-----|
| Latest **File → Save to Roblox** done | You will not publish an old local copy |
| No "Studio-only cheats" left | In live they break economy or the loop |
| If DataStore - you know where to enable **API Services** | Otherwise live save stays silent |
| Golden path from 12.3 passes in Studio | Do not knowingly ship a broken build |
| Name ready (not Untitled / Place1) | Search, portfolio, teacher |
| Honest description - no features that do not exist | Trust after first join |
| A place to save the URL | Tomorrow 12.5 without hunting history |

**Do now (3 min):** walk the table and check boxes in notes. If an open P0 remains from 12.3 - fix first, then Publish.`,
 },
 {
 title: "Publish in Studio step by step",
 content: `Work in Studio from the Place owner account.

1. **File → Publish to Roblox**. If the Place is already in the cloud - often **Save to Roblox** is enough (updates the same experience). First time - Publish and choose "new experience" or an existing one.
2. In the Publish window fill **Name** (short, in the language your class agreed on).
3. **Description** - paste a draft from the template below (you can refine on Dashboard).
4. Choose / confirm **Experience** and **Place** (do not create a "copy of a copy" if a main game already exists).
5. Press Publish and wait for the green confirmation. Error / gray button: check internet, login, whether the file is saved, whether the account is blocked.
6. After success: **Home → Game Settings** in Studio (or the experience page on Dashboard) - access, age, services live there too.
7. Copy the **game link** (Experience / Place URL) into notes for 12.5 immediately.

Code updates after first Publish: Save/Publish again to the same Place. The link usually stays the same - do not hand out three different URLs "just in case."`,
 },
 {
 title: "Creator Dashboard: metadata after Publish",
 content: `Studio puts the game in the cloud. The "storefront" is edited on **Creator Dashboard**.

1. Open **create.roblox.com** → sign in with the same account.
2. Find your **Experience** (Creations / Experiences).
3. Open the experience page. Blocks are usually: **Overview**, **Places**, **Configure** (names may differ slightly in the UI - look for Icon, Thumbnails, Description, Permissions).
4. **Name / Description** - align with what you put in Publish. Description can be longer and cleaner here.
5. **Icon** - upload a square file (see the icon section).
6. **Thumbnails** - 1-2 gameplay frames. No empty Baseplate and no screenshot with Explorer open.
7. **Permissions / Playability** - Private / Friends / Public (details below).
8. If you need to show the teacher a place separately - in Places confirm the published start Place is the one players spawn in.

Save Dashboard changes. Then open the link in incognito or from a second account - that is what a player sees, not only you in Studio.`,
 },
 {
 title: "Honest game description (template)",
 content: `Copy and fill before Publish:

\`\`\`
[1-sentence pitch from the 12.1 plan]

What you do in the game:
• …
• …
• …

Tip: at spawn first …

Made in the SmartCode Academy course (Roblox Studio).
\`\`\`

**Yes:** "One dropper, coin save, 1 quest."  
**No:** "100 zones, PvP arena, seasonal battle pass!" - if that does not exist.

Length: 3-8 short lines are enough. Write what a player will do in the first 2 minutes. Do not claim "1000 online players" or promise a VIP GamePass that does not exist.

An honest description = less broken trust after Publish and a calmer SHOWCASE.`,
 },
 {
 title: "Icon and thumbnails: practical tips",
 content: `| Asset | Size / format in practice | Tip |
|-------|---------------------------|-----|
| **Icon** | Square, clear center | 1 bright object / character / finish; almost no text |
| **Thumbnail 1** | Wide gameplay frame | Main action: run, collect, shop, finish |
| **Thumbnail 2** | Another angle | Hub / map / NPC - so the "world" is visible |
| **Contrast** | Dark on light or the reverse | On a phone the icon is a tiny tile |

How to capture in Studio:
1. Hide extra UI gadgets (if they clutter the frame).
2. Point the camera at a "wow moment" on the golden path.
3. **View → Screen Shot** or Print Screen → crop in Paint / Photos.
4. For the icon crop **square** around the main object. Remove tiny title text - in the catalog it becomes mush.

Do not use an empty Baseplate, Output full of errors, or the Properties window as a thumbnail. Teachers and friends notice immediately.

**Do now (8 min):** 1 square for Icon + 1-2 frames for Thumbnails → upload on Dashboard.`,
 },
 {
 title: "Access modes (privacy) and when to use which",
 content: `| Mode | Who can join | When to use in the course |
|------|--------------|---------------------------|
| **Private** | You (and anyone you explicitly grant per experience rules) | First hours after Publish, raw fixes |
| **Friends** | Roblox friends + you | Class show, teacher, live test with a classmate |
| **Public** | Anyone with the link / catalog | When the live golden path is OK and the teacher said "yes" |

Before **Public**:
- walk the golden path in live (not only Studio Play);
- check in-game purchases / save if they exist;
- remember: live can have exploiters - important actions are checked on the **server** (as in networking lessons).

For most module 12 submits, **Friends** is enough. Public without permission is extra risk and extra eyes. Confirm class rules with the teacher and write the chosen mode next to the URL in notes.`,
 },
 {
 title: "API Services and required live test from a second account",
 content: `If the game writes to **DataStore** (coins, inventory, progress):

1. In Studio: **Home → Game Settings → Security** (or similar) → enable **Enable Studio Access to API Services** so you can test save in Play in Studio.
2. On **create.roblox.com** open Experience → settings / Security / API and confirm services for the published game are not disabled where your case needs them.
3. After Publish: join live, do a save action, leave fully, join again. No progress - do not mark "done" until you find the cause (API, Output error, wrong Place).

**Required live test from another account** (alt / friend / incognito with second login):
1. Copy the experience URL from Dashboard or the Share button.
2. On the second account open the link. If Friends - accounts must be friends; if Private - alt cannot join (temporarily Friends for the test).
3. Spawn → one main golden-path action (collect / buy / finish) → if save exists, leave and join again.
4. Write in notes: time, what worked, what did not (1-3 lines).

Without this run Publish is not "submitted" yet. For the creator in Studio "all OK" often lies compared to a new player's eyes.`,
 },
 {
 title: "Badge lite - create on Dashboard and award",
 content: `**Badge** - an achievement icon for an event (finish, first purchase, N coins…). It is not a GamePass and not a coin in leaderstats.

Why in the finale: a short "wow" at SHOWCASE + proof you can reward progress.

**Create (Creator Dashboard):**
1. Open your Experience on create.roblox.com.
2. Find the **Badges** section (Associated Items / near Monetization - depends on UI; search Badges).
3. **Create Badge** → name (short: "First Finish"), description ("Reached the finish for the first time"), badge icon (simple square art, readable small).
4. Save. Open the created Badge and copy **BadgeId** (number) into notes.

**Hook up in game (lite):**
1. On the **server** (Script in ServerScriptService) at the condition moment call award via **BadgeService** (e.g. AwardBadge), checking UserId and that the badge is not already owned.
2. Condition - one clear event: Touched finish with debounce, first successful purchase, coins >= N once.
3. Do not award from a **LocalScript**. Do not call AwardBadge every second in a loop.

If time ran out: create the Badge on Dashboard, and in code leave \`TODO: AwardBadge(BadgeId) on first finish\` + in the portfolio describe *when* the badge is given. For lesson 90 a written condition plan is also accepted, but having the Id in notes is better.

**1 badge** is enough. One working badge beats five empty names.`,
 },
 {
 title: "GamePass vs DevProduct and school policy",
 content: `| | **GamePass** | **DevProduct** |
|---|--------------|----------------|
| What you buy | Permanent pass (often "forever") | One-time purchase |
| Typical example | VIP doors, x2 reward, skin access | Pack of 100 coins, one-time boost |
| In-game check | Whether the player owns the pass (server) | Purchase receipt handling (ProcessReceipt) |
| In our course | Understanding + plan / button mockup | Full Robux shop is **not built** |

**School policy (read carefully):**
- You **may explain** GamePass vs DevProduct in notes and at SHOWCASE.
- You may draw a "VIP (GamePass)" button as a UI **mockup** with no real purchase.
- Creating paid passes, setting Robux prices, connecting payouts / money - **only with explicit teacher permission and (if needed) parent permission**.
- In the **game description** do not promise paid features that do not exist. Do not make pay-to-win "without VIP you cannot finish MVP."

In class three note lines are enough:
1. GamePass = permanent pass; DevProduct = one-time purchase.
2. "If there were VIP, it would give … and be checked on the server."
3. Status: mockup / we do not create / teacher allowed one test GamePass.

If a test GamePass is allowed - make **one**, with a soft bonus (cosmetics, small x2), without blocking the main loop for non-buyers.`,
 },
 {
 title: "Where this leads next",
 content: `| Today | Next |
|-------|------|
| Live URL + metadata + access mode | **12.5** puts link and screens into the portfolio |
| Badge (or plan + BadgeId) | At **SHOWCASE** as a "reward system" |
| GamePass lite in notes | Do not confuse with in-game coins / leaderstats |

Save notes as one block:

\`\`\`
Game URL: …
BadgeId (if any): …
Badge condition: …
Access: Private / Friends / Public
API / DataStore checked live: yes/no
GamePass lite (2 sentences): …
\`\`\`

Place in Studio: **Save to Roblox** → \`Lesson 12.4 - Published\`. This save and URL are the entry to tomorrow's lesson without chaos.`,
 },
 {
 title: "Lesson 90 submit checklist",
 content: `- [ ] Publish / Place update done (Studio)
- [ ] On Dashboard: name + honest description
- [ ] Icon + ≥1 Thumbnail uploaded
- [ ] Access chosen deliberately (often Friends)
- [ ] Live test from another account 1-2 min (golden path)
- [ ] If DataStore - save checked in live or status written
- [ ] Badge created **or** written plan "when we award" (+ Id if any)
- [ ] In notes: GamePass vs DevProduct + school policy briefly
- [ ] Game URL saved for 12.5
- [ ] Save: \`Lesson 12.4 - Published\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Description promises features that do not exist",
 explanation: "Players and teacher see the gap immediately.",
 correctApproach: "Write only what exists after 12.3.",
 },
 {
 mistake: "Did not check the link from another account",
 explanation: "For the creator \"all OK\"; for the player - crash or empty world.",
 correctApproach: "Required live check 1-2 minutes.",
 },
 {
 mistake: "DataStore in the game, but live saves nothing",
 explanation: "Forgot API / did not test after Publish.",
 correctApproach: "Enable services and check rejoining.",
 },
 {
 mistake: "Badge awarded from LocalScript or every frame",
 explanation: "Cheats and badge spam.",
 correctApproach: "One verified condition on the server.",
 },
 {
 mistake: "Description already says \"buy VIP GamePass,\" but no pass exists",
 explanation: "Dishonest advertising.",
 correctApproach: "Understand GamePass lite first; put only real things in the description.",
 },
 ],
 summary:
 "You published the game with honest metadata, checked the live link, covered Badge and GamePass/DevProduct. Lesson 90 is done - the link goes into the 12.5 portfolio.",
 practiceTask: {
 title: "Practice: Publish + Badge lite (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** a live game link + notes with Badge/GamePass lite.

### Part A - Metadata (10 min)
1. Write an honest description from the template.
2. Prepare icon (square) + 1-2 thumbnails.

### Part B - Publish and live (12 min)
1. File → Publish to Roblox / update Place.
2. Set access (often Friends for school).
3. Join from another account for 1-2 min on the golden path.
4. If DataStore - check save.

### Part C - Badge / GamePass lite (8 min)
1. Create 1 Badge **or** write the award condition plan.
2. In notes: 2 sentences "GamePass vs DevProduct" + what VIP could give.
3. Save the URL. **Save to Roblox** → \`Lesson 12.4 - Published\`.
4. Mark practice complete in the LMS.

### Pass criteria
- Game published / updated
- Honest description + icon
- Live test from another account
- URL saved
- Badge exists or written plan + short GamePass lite explanation`,
 hints: [
 "Friends/Private first; Public when the teacher says so",
 "An icon without tiny text reads better",
 "Paste the URL into the 12.5 post draft immediately",
 ],
 optionalChallenge:
 "Hook Badge award on the server at first finish / first purchase and show a \"Badge awarded\" screenshot in notes.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What lesson number is 12.4 in the new grid?",
 options: ["90th of 92", "96th", "1st", "12th of 12 only in the module with no course number"],
 correctAnswer: 0,
 explanation: "12.4 = lesson 90; next 12.5 (91) and 12.6 (92).",
 },
 {
 id: "q2",
 type: MC,
 question: "What belongs in a normal Publish?",
 options: [
 "Name, description, icon/thumbnails, access, and link check",
 "Only press Play in Studio",
 "Only write a GDD with no game",
 "Only Terrain with no metadata",
 ],
 correctAnswer: 0,
 explanation: "Publishing is metadata + live check.",
 },
 {
 id: "q3",
 type: MC,
 question: "Which description is right for an MVP?",
 options: [
 "An honest list of what is actually in the game",
 "A promise of 50 zones that do not exist",
 "An empty description",
 "Only the word \"cool\"",
 ],
 correctAnswer: 0,
 explanation: "Honesty beats hype.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why test from another account?",
 options: [
 "To see the game through a new player's eyes in live",
 "To delete the Place",
 "To turn off Explorer",
 "It is never needed",
 ],
 correctAnswer: 0,
 explanation: "Creator and player have different experiences.",
 },
 {
 id: "q5",
 type: MC,
 question: "If the game uses DataStore, what is important to check?",
 options: [
 "That saving works after Publish / in live",
 "That Terrain is off",
 "That there is no Script at all",
 "That the game is offline only",
 ],
 correctAnswer: 0,
 explanation: "Save must work for real players.",
 },
 {
 id: "q6",
 type: MC,
 question: "What is a Badge in this lesson?",
 options: [
 "An achievement icon for an in-game event",
 "A Part type in Workspace",
 "A Publish replacement",
 "A required GamePass for Robux",
 ],
 correctAnswer: 0,
 explanation: "Badge = achievement badge.",
 },
 {
 id: "q7",
 type: MC,
 question: "Where is it logical to award a Badge?",
 options: [
 "On the server after checking the condition",
 "In a LocalScript every frame",
 "In camera Properties",
 "Only in the description with no game",
 ],
 correctAnswer: 0,
 explanation: "We do not trust the client with rewards.",
 },
 {
 id: "q8",
 type: MC,
 question: "How does GamePass differ from DevProduct (lite)?",
 options: [
 "GamePass is more often \"forever\"; DevProduct is a one-time purchase",
 "They are the same thing with no difference",
 "DevProduct exists only in Terrain",
 "GamePass can only be created with LocalScript",
 ],
 correctAnswer: 0,
 explanation: "A basic difference for understanding monetization.",
 },
 {
 id: "q9",
 type: MC,
 question: "What to do about Robux purchases in class?",
 options: [
 "Understand the difference first; full purchases only with teacher/parent permission",
 "Must connect pay-to-win for everyone",
 "Hide all prices and promise VIP in the description with no pass",
 "Delete Publish",
 ],
 correctAnswer: 0,
 explanation: "In the course - GamePass lite + school policy.",
 },
 {
 id: "q10",
 type: MC,
 question: "When is Public logical?",
 options: [
 "When the game is ready for strangers and passed in live",
 "Immediately, even if the loop is broken",
 "Never in principle",
 "Only without a name and description",
 ],
 correctAnswer: 0,
 explanation: "Public = responsibility to players.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why must an icon read on a small screen?",
 options: [
 "In the catalog / on a phone it is very small",
 "Because Roblox prints it on A0 paper",
 "Because the icon replaces code",
 "It does not matter",
 ],
 correctAnswer: 0,
 explanation: "Tiny text on the icon disappears.",
 },
 {
 id: "q12",
 type: MC,
 question: "What must you save for lesson 12.5?",
 options: [
 "The published game URL",
 "Only a random screenshot with no link",
 "An empty Baseplate",
 "Someone else's Place from the catalog",
 ],
 correctAnswer: 0,
 explanation: "The portfolio needs a working Play link.",
 },
 {
 id: "q13",
 type: MC,
 question: "Which lesson comes after 12.4?",
 options: [
 "12.5 - Portfolio",
 "12.6 immediately with no portfolio",
 "Module 1",
 "12.7 (not in the new grid)",
 ],
 correctAnswer: 0,
 explanation: "90 → 91 → 92.",
 },
 {
 id: "q14",
 type: MC,
 question: "Why should the server check important actions in live?",
 options: [
 "A published game can face client exploits",
 "Because LocalScript is always faster than the server",
 "Because Publish bans Scripts",
 "Because Badge does not exist",
 ],
 correctAnswer: 0,
 explanation: "Never trust the client - especially after release.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the submitted artifact for lesson 12.4?",
 options: [
 "Published game + live test + URL (+ Badge or plan) + GamePass lite notes",
 "Only an open Toolbox",
 "Only theory with no Publish",
 "An empty description with no link",
 ],
 correctAnswer: 0,
 explanation: "End of Publish day = a live game and portfolio prep.",
 },
 ],
 },
}

export const enLesson125 = {
 lessonId: "lesson-roblox-12-5",
 moduleId: "module-12",
 order: 5,
 title: "12.5 - Portfolio",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Build a portfolio post: pitch, systems, challenge, lessons, link",
 "Add 3-5 screenshots (or a short GIF) of the golden path",
 "Highlight 3 technical course systems in plain words",
 "Verify the game link opens",
 "Prepare the text so tomorrow at SHOWCASE you have something to show",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 91 of 92)",
 content: `Tomorrow is **SHOWCASE DAY (12.6)**. Today you gather **proof** in ~30 min, not a 3-screen essay.

"Portfolio sprint" format:
1. **0-5′** - open the game from 12.4 + section template.
2. **5-20′** - fill briefly: pitch, 3 systems, 1 challenge, lessons, link.
3. **20-28′** - 3 golden-path screenshots (preferably from Player) + Publish/game page screenshot.
4. **28-30′** - click the link from another account / incognito.

Goal: **one page** you can send parents in a messenger without "wait, I will explain."`,
 },
 {
 title: "Why a portfolio right now",
 content: `| Without a post | With a post |
|----------------|-------------|
| At the show you recall details from memory | You have a cheat sheet and a link |
| Screenshot "just pretty" | Screenshot explains systems |
| Hard to show parents / a friend | One page: "here is my game" |

After the course the post stays in Notion / Google Doc / DevForum / class Discord - as your creator calling card.

Another practical plus: tomorrow at SHOWCASE you are less nervous. The pitch is already written. Three systems are already worded. If live demo freezes - you open screenshots from the post and still explain the game. Without a post you improvise from zero under a timer.`,
 },
 {
 title: "Post structure (copy and fill)",
 content: `\`\`\`
# [Game title] - Roblox Studio final project

**Pitch (1 sentence):**
...

**What I built:**
- ...
- ...
- ...

**3 systems (how it works):**
1. ...
2. ...
3. ...

**Hardest challenge:**
Problem → what I tried → what worked

**What I learned in the course (3 points):**
- ...
- ...
- ...

**What's next (1 step):**
...

**Play:** [Roblox link]

**Media:** 3-5 screenshots / 1 short GIF
\`\`\`

Do not write a novel. **Clear and short** beats a wall of text. Guide: one screen on a computer without long scrolling - enough for submit and for SHOWCASE.`,
 },
 {
 title: "Pitch and \"what I built\" list",
 content: `**Pitch** - the same one sentence you will use tomorrow at SHOWCASE:

*"This is [genre] where the player [does X] to [get Y]."*

In **"what I built"** write facts, not hype:
- good: "shop with server check", "3-biome obby", "leaderstats + HUD";
- bad: "THE BEST GAME IN ALL OF ROBLOX!!!".

Take only what **actually exists** in the game after 12.2-12.4. If a zone is "almost ready" but not in Play - do not put it in the post.

**Mini exercise (4 min):** write the pitch and exactly **4** "what I built" bullets. Cross out anything you cannot show in Play in 2 minutes.`,
 },
 {
 title: "Three systems - what exactly to write",
 content: `Pick **3 systems** from the course that you actually used in the finale. Line formula: **name + what it does for the player + where it is visible**.

| System | How to write in one line |
|--------|--------------------------|
| leaderstats | "Coins on the server; TAB shows the score" |
| RemoteEvent | "Client requests a purchase; server checks the price" |
| DataStore | "Progress saves between sessions (pcall)" |
| Touched + debounce | "Trap does not hit 20 times in a row" |
| ProximityPrompt | "Walk up - press - action opens" |
| Pathfinding / NPC | "NPC walks a route and gives a quest" |

**What to write and what not:**
- yes: "RemoteEvent: shop button sends a request; Script on the server checks coins and price";
- no: "I used RemoteEvent" with no why;
- no: a list of every course lesson "because I touched it somehow".

Under each system you can add **1 screenshot** where it is visible in game (HUD with coins, shop window, Prompt near NPC).`,
 },
 {
 title: "\"Hardest challenge\" block - how to fill it",
 content: `Template for 4-6 sentences:

1. **What broke** (symptom: what the player saw)
2. **Why that is bad** for the player
3. **What you tried** (even if it failed)
4. **What worked**
5. **Lesson for later** (1 sentence)

Take material from the **12.3** bug list: real P0/P1s are already there. Do not invent drama "everything was perfect" - an honest bug is more valuable.

**Weak:** "The shop was hard."  
**Strong:** "The shop sometimes charged coins twice. At first I only fixed the LocalScript - that did not help. I moved the check to the server and added a short pause between clicks. Lesson: the client cannot be trusted with price."

If there were almost no bugs - take an integration problem from 12.2 (two systems conflicted) or polish from 12.3. The chain matters: problem → attempt → solution → lesson.`,
 },
 {
 title: "Full post example (shorten for your game)",
 content: `Below is a **ready sample**. Do not copy the title and features blindly: substitute yours. The level of detail is what your text should reach.

\`\`\`
# Coin Hub Rush - Roblox Studio final project

**Pitch:** A hub simulator where you collect coins, buy a speed upgrade, and complete 1 NPC quest.

**What I built:**
- hub with spawn and 2 coin collect zones
- upgrade shop with server-side price check
- 1 quest via ProximityPrompt near an NPC
- leaderstats + simple coins HUD
- Publish after 12.3 tests (Friends access)

**3 systems (how it works):**
1. leaderstats - coins are created on the server; the client only shows the number in HUD and TAB.
2. RemoteEvent - the Buy button sends a request; Script checks balance and price, then deducts coins.
3. ProximityPrompt - near the NPC the player presses E; the server sets quest status and gives a reward after the condition.

**Hardest challenge:**
After purchase, coins sometimes went negative twice if you clicked fast. At first I thought only the UI was broken. Then I moved all checks to the server and added a short 0.5 s button lock. Lesson: client UI is not the till; the till belongs on the server.

**What I learned in the course:**
- separate client and server in purchases
- test the golden path before Publish
- write a short pitch instead of a long "I did everything"

**What's next:** a second map zone with a new collect type (not in this week's MVP).

**Play:** https://www.roblox.com/games/0000000000/Coin-Hub-Rush

**Media:** 4 screenshots - hub, coin collect, shop, NPC with Prompt.
\`\`\`

At the end you can add a line: "Happy for feedback - what you liked and what broke."`,
 },
 {
 title: "Screenshots on Windows: how to capture cleanly",
 content: `Take **3-5** frames (or 1 GIF 10-20 s) of the golden path.

| # | What is in the frame |
|---|----------------------|
| 1 | Start / hub / first world frame |
| 2 | Main action (collect, jump, buy, combat…) |
| 3 | UI / leaderstats / shop |
| 4 | "Wow" (particles, night, finish) |
| 5 | (Optional) Prompt near NPC or before/after UI |

**Windows - practical:**
1. Join the game through Roblox Player (not necessarily Studio) so Explorer panels are not in the frame.
2. **Win + Shift + S** - select the game area; paste into Doc/Notion with **Ctrl + V**.
3. Or **Win + PrtSc** - full screen into "Pictures → Screenshots"; then insert the frames you need.
4. For a short clip: **Win + G** (Xbox Game Bar) → Record, or GIF via any light recorder for 10-20 s.

**Quality tips:**
- hide extra Studio panels if you capture in Play Solo;
- do not cover important UI with the Roblox chat window;
- one clear action frame beats 10 identical blurry ones;
- caption under the screenshot in one sentence: "shop after purchase" / "quest at NPC".`,
 },
 {
 title: "Play link - required check",
 content: `The link is the main proof the game exists. Text without a working Play is not a portfolio yet.

**Check checklist (5 min):**
1. Copy the URL from the experience page after **12.4** (full \`https://www.roblox.com/games/...\`).
2. Paste into the post **as one line**, not "message me in private".
3. Open the link from **another** account (or incognito / friend / phone).
4. Join for 1-2 minutes: spawn → one main action.
5. If it is Private and the teacher cannot join - switch to Friends (or as your class agreed) and check again.

If the link does not open, leads to an empty Place, or "no access" - the post is **not ready yet**, even if the text looks nice. Fix access or Publish, then update the Play line in Doc/Notion.`,
 },
 {
 title: "Text tone (for people, not ads)",
 content: `**Yes:**
- concrete system names;
- honest about MVP scope;
- "happy for feedback".

**No:**
- ALL CAPS and piles of "!!!";
- "it was hard" with no explanation;
- promises of features that are not in the game;
- pasted English AI fluff.

Write **in your own words**, as if explaining to a classmate. If a sentence sounds like a shop ad - cut it to a fact: what exists, how it works, where to play.`,
 },
 {
 title: "Where to save the post (Doc / Notion) and how to submit",
 content: `| Place | When it is handy | How to share |
|-------|------------------|--------------|
| **Google Doc** | Fast text + paste screenshots | Link with "viewer" rights to the teacher |
| **Notion** | Convenient blocks, image gallery | Share link (can view) to class chat |
| Discord / class chat | Fast submit | Message with Doc/Notion link + Play |
| DevForum (if allowed) | Longer "adult" format | Separate post after class submit |

**Save order:**
1. Create page \`Lesson 12.5 - Portfolio Post\` (or with the game title).
2. Paste template → fill → add screenshots under "Media".
3. Check that images are visible **not only to you** (open the Doc link in incognito or from another Google account).
4. Copy the document link into LMS / Discord as the teacher asks.
5. Optionally in Studio: **Save to Roblox** → \`Lesson 12.5 - Portfolio Post\` (Place does not replace the post - the post in Doc/Notion is required).

If they ask for one file - **File → Download → PDF** in Google Doc or Export in Notion. PDF is good for archive, but for edits keep a live Doc.`,
 },
 {
 title: "Link to tomorrow's SHOWCASE",
 content: `Today's post is the **speech script** for 12.6, written in advance.

| Today in the post | Tomorrow in the talk (5-8 min) |
|-------------------|--------------------------------|
| Pitch | First ~20 seconds |
| "What I built" list | Short feature tour before demo |
| 3 systems | "How it works" block (~30-40 s each) |
| Challenge | Story for ~1 min |
| Screenshots / GIF | Plan B if live fails |
| Play link | "You can play here" |
| "What's next" | Closing line before questions |

**How to use tomorrow:**
1. Open Doc/Notion on a second monitor or phone.
2. Read the pitch from the screen, not from memory.
3. During the demo show the same 3 systems as in the post - do not invent new ones on camera.
4. If Roblox will not open - show screenshots 1→2→3 from the post and tell the challenge.

After the post you already have answers to typical teacher questions: "what is this game?", "how was it made?", "what broke?", "where can I play?".`,
 },
 {
 title: "Lesson 91 submit checklist",
 content: `- [ ] All template sections filled
- [ ] Pitch in 1 sentence
- [ ] 3 systems described (name + what it does + where visible)
- [ ] Challenge block (problem → attempt → solution → lesson)
- [ ] 3+ screenshots or 1 GIF (preferably captured in Player on Windows)
- [ ] Play link checked by clicking from another account
- [ ] 3 "what I learned" points + 1 "what's next"
- [ ] Post saved in **Google Doc or Notion** and the link opens for others
- [ ] Place optional: \`Lesson 12.5 - Portfolio Post\`
- [ ] Ready to open this post tomorrow at SHOWCASE as a cheat sheet`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Only screenshots with no text about systems",
 explanation: "It does not show you are a developer, just that you took a screenshot.",
 correctApproach: "Add 3 systems + challenge in your own words.",
 },
 {
 mistake: "The link does not open",
 explanation: "The most important proof of the game dies in one click.",
 correctApproach: "Check the link from another account before submit.",
 },
 {
 mistake: "Hype instead of facts",
 explanation: "\"Best game\" with no details does not build trust.",
 correctApproach: "Write what is in the MVP and how it works.",
 },
 {
 mistake: "No challenge story",
 explanation: "The strongest proof of growth disappears.",
 correctApproach: "Problem → attempt → solution → lesson.",
 },
 {
 mistake: "A wall of text with no pictures",
 explanation: "Nobody reads to the link.",
 correctApproach: "3-5 screenshots or a short golden-path GIF.",
 },
 ],
 summary:
 "You built a portfolio post: pitch, 3 systems, challenge, lessons, media, and a working Play link. This is lesson 91 - prep for the final SHOWCASE DAY.",

 practiceTask: {
 title: "Practice: portfolio post (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** one page in a 30′ sprint, not a novel.

### Part A - Text (12 min)
1. Paste the template.
2. Pitch + 3 systems + 1 challenge + lessons + "next" - short (1 screen).

### Part B - Media + link (12 min)
1. 3 golden-path screenshots + 1 game page / Publish screenshot.
2. Play link - click from another account.

### Part C - Submit (6 min)
1. Save Doc/Notion.
2. (Optional) Save Place \`Lesson 12.5 - Portfolio Post\`.
3. Send the page link to teacher / parents (test: "do they get it without you?").

### Pass criteria
- Template filled briefly
- ≥3 systems
- Challenge with a solution
- ≥3 screenshots (one of the game page)
- Play link opens`,
 hints: [
 "1 screen of text > 3 screens of fluff",
 "Publish/page screenshot = proof for parents",
 "Bug list from 12.3 = ready \"challenge\" paragraph",
 ],
 optionalChallenge:
 "60-90 s screen recording of the golden path as plan B for SHOWCASE.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What lesson number is 12.5 in the new course grid?",
 options: ["91st of 92", "96th of 96", "1st", "48th"],
 correctAnswer: 0,
 explanation: "After the portfolio comes the final 12.6 (lesson 92).",
 },
 {
 id: "q2",
 type: MC,
 question: "What matters most in a strong portfolio?",
 options: [
 "Process, systems, challenge, and a working link - not only pictures",
 "Only ALL CAPS and \"best game\"",
 "A post with no game link",
 "An empty template with no text",
 ],
 correctAnswer: 0,
 explanation: "Portfolio = developer story + proof.",
 },
 {
 id: "q3",
 type: MC,
 question: "How many technical systems should you highlight in the post?",
 options: ["About three", "Zero", "Required: all 92", "Only one with no name"],
 correctAnswer: 0,
 explanation: "Three concrete systems show depth.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why a \"hardest challenge\" block?",
 options: [
 "To show how you think and fix problems",
 "To replace Publish",
 "To delete DataStore",
 "To hide the game link",
 ],
 correctAnswer: 0,
 explanation: "The challenge story = proof of growth.",
 },
 {
 id: "q5",
 type: MC,
 question: "The Play link in the post should…",
 options: [
 "Open and lead into the game",
 "Be hidden \"in private\"",
 "Be made up",
 "Never be checked",
 ],
 correctAnswer: 0,
 explanation: "The link is the main proof the game exists.",
 },
 {
 id: "q6",
 type: MC,
 question: "What text tone is best?",
 options: [
 "Clear, concrete, without empty hype",
 "Only ALL CAPS and \"!!!\"",
 "Rude trolling",
 "A completely empty post",
 ],
 correctAnswer: 0,
 explanation: "Write as a developer for people.",
 },
 {
 id: "q7",
 type: MC,
 question: "Where should the portfolio link come from?",
 options: [
 "From the published / updated game after 12.4",
 "From a random someone else's Place",
 "No link needed",
 "Only from lesson 1.1 with no finale",
 ],
 correctAnswer: 0,
 explanation: "12.4 delivers Publish; 12.5 packs it into a post.",
 },
 {
 id: "q8",
 type: MC,
 question: "What is logical to capture in screenshots?",
 options: [
 "Start, main action, UI/systems, wow moment",
 "Only an empty Baseplate",
 "Only the Properties window full screen",
 "Other people's games from the catalog",
 ],
 correctAnswer: 0,
 explanation: "Media should show the golden path.",
 },
 {
 id: "q9",
 type: MC,
 question: "How does the portfolio help on SHOWCASE DAY?",
 options: [
 "Gives pitch, systems, story, link, and a screenshot plan B",
 "Fully replaces the talk with no prep",
 "Cancels the need for a demo",
 "Needed only for Terrain",
 ],
 correctAnswer: 0,
 explanation: "Tomorrow's talk is assembled from today's post.",
 },
 {
 id: "q10",
 type: MC,
 question: "What counts as the submitted artifact for lesson 12.5?",
 options: [
 "A filled post with media and a working Play link",
 "Only an open Explorer",
 "An empty template",
 "Only an icon with no text",
 ],
 correctAnswer: 0,
 explanation: "You need a finished portfolio post.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why is \"it was hard\" with no detail weak text?",
 options: [
 "You cannot see the problem, attempt, and solution",
 "Because adjectives are banned on Roblox",
 "Because then Publish is impossible",
 "Because LocalScript does not exist",
 ],
 correctAnswer: 0,
 explanation: "You need a concrete challenge story.",
 },
 {
 id: "q12",
 type: MC,
 question: "How many screenshots should you add at minimum?",
 options: ["3-5 (or 1 short GIF)", "0", "Exactly 100", "Only one pixel"],
 correctAnswer: 0,
 explanation: "Visual proof supports the text.",
 },
 {
 id: "q13",
 type: MC,
 question: "What is better in the \"what I built\" list?",
 options: [
 "Facts about the MVP that exist in the game",
 "A list of future features as if already done",
 "Other people's modules with no explanation",
 "Write nothing",
 ],
 correctAnswer: 0,
 explanation: "Honest scope beats promises.",
 },
 {
 id: "q14",
 type: MC,
 question: "Which lesson comes after 12.5?",
 options: [
 "12.6 - SHOWCASE DAY (lesson 92)",
 "12.7 - another polish",
 "Module 1 from scratch",
 "Only a test with no show",
 ],
 correctAnswer: 0,
 explanation: "In the new grid the finale is 12.6.",
 },
 {
 id: "q15",
 type: MC,
 question: "Why ask for feedback at the end?",
 options: [
 "It invites the viewer to reply and play",
 "It is a required Roblox API command",
 "It deletes the game",
 "It replaces DataStore",
 ],
 correctAnswer: 0,
 explanation: "A short CTA makes the post alive.",
 },
 ],
 },
}

export const enLesson126 = {
 lessonId: "lesson-roblox-12-6",
 moduleId: "module-12",
 order: 6,
 title: "12.6 - SHOWCASE DAY",
 theoryMinutes: 25,
 quizMinutes: 15,
 estimatedTime: 75,
 learningObjectives: [
 "Deliver a final 5-8 minute talk about your game",
 "Show a live demo of the player's \"golden path\"",
 "Explain 2-3 technical course systems in your own words",
 "Share one challenge, three course lessons, and a next-step plan",
 "Have a backup plan (video/screenshots) if live fails",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission - SHOWCASE DAY",
 content: `This is the **last lesson of the course** (lesson **92** of 92).

Today you do not learn a new Studio button. You present as a **game creator**: briefly tell, show a live demo, explain 2-3 systems, answer questions.

From **12.1-12.5** you should already have:
- plan / MVP;
- assembled finale;
- test;
- Publish (or updated Place);
- portfolio with link and screenshots.

If something is missing - first **5-10 min finish the minimum** (link + one working demo), then present. An honest short show beats promises about features that do not exist.

Goal of the day: after 6-8 minutes the viewer understands **what to play**, **how you made it**, and **where to click** to try it themselves.`,
 },
 {
 title: "Minute by minute - lesson and talk timing",
 content: `Lesson ~75 min. Approximate class schedule:

| Lesson time | What you do |
|-------------|-------------|
| 0-5 min | Check link, Place, plan B, microphone |
| 5-15 min | Last pitch + golden path rehearsal |
| 15-55 min | Talks in turn (5-8 min + short questions) |
| 55-70 min | Q&A, feedback, save Final Showcase |
| 70-75 min | Submit checklist in LMS |

Keep your **personal** talk like this:

| Talk minute | What exactly |
|-------------|--------------|
| 0:00-0:20 | Pitch in one sentence |
| 0:20-3:00 | Live golden-path demo |
| 3:00-4:30 | 2-3 systems "how it works" |
| 4:30-5:30 | One challenge + how you solved it |
| 5:30-6:30 | 3 course lessons + what's next |
| 6:30-7:30 | Link + "you can play" |
| after | Audience questions (1-3) |

Do not stretch to 15 minutes. Clear 6 minutes beats long and messy. If the timer shows 8:00 - cut system talk, **do not cut the demo**.`,
 },
 {
 title: "Pitch - one sentence",
 content: `Formula:

**"This is a game where the player [does X] to [get Y], in a [style/genre] world."**

Examples:
- *"A 3-biome obby: the player runs and collects checkpoints to beat their time."*
- *"A collect simulator: click resources, upgrade power, save progress."*
- *"A hub with a shop and NPC quests: buy upgrades and complete tasks."*

Pitch rules:
- one sentence, not three;
- no "best", "unique", "epic" without a fact;
- name the genre so even a newcomer gets it in 5 seconds.

**Do now (3 min):** write your pitch. Read it aloud. If you run out of breath - shorten.`,
 },
 {
 title: "What a good demo is (golden path)",
 content: `**Golden path** = the shortest route where the game looks alive and clear.

A good demo for young viewers:
1. **Spawn** - clear where you stand and where to go.
2. **One main action** - jump, collect, buy, fight, round.
3. **One reward / progress** - coin, checkpoint, upgrade, finish.
4. **One "wow"** (optional) - sound, particles, Party, day/night change.

Bad demo: wander the map, hunt for a button, explain 10 features that are not visible, or stand in a menu for 2 minutes.

Prepare the demo **before** you go on stage:
- Place open, Play already pressed or ready in 1 click;
- character at the start of the golden path (not in a far zone);
- music quieter than your voice;
- know the route with no "I'll find it now…" pauses;
- Studio camera / game window full screen so UI is visible.

During the demo speak briefly: "collecting now", "here's a purchase", "here's a quest". Do not lecture while running.`,
 },
 {
 title: "Systems - speak like a developer",
 content: `Pick **2-3 systems** you actually built. The viewer wants to understand "button in game → logic in code," not hear the whole Script.

| System | How to say it simply |
|--------|----------------------|
| leaderstats | "Coins on the server in TAB; HUD reads them on the client" |
| RemoteEvent | "Client button asks the server; server checks and replies" |
| DataStore | "Progress saves between sessions via pcall" |
| Touched + debounce | "Trap fires once per approach, not 20 times" |
| ProximityPrompt | "Walk up - press E - action opens" |

Template for one system (~20-25 s): **name → why for the player → where visible in the demo → where logic lives (server/client)**.

Do not read code line by line. Do not apologize ("it's still messy"). State the fact and move on.`,
 },
 {
 title: "Challenge story (1 minute)",
 content: `People remember stories, not feature lists.

Template for ~60 seconds:
1. **Problem:** what broke / did not work
2. **Attempt:** what you tried first
3. **Solution:** what worked
4. **Lesson:** what you learned for good

Example: *"The shop gave coins twice because the check was on the client. At first I just hid the button. Then I moved the price to the server and added a short repeat-click pause. Lesson: do not trust the client with money."*

Pick **one** challenge, not five. A small bug with an honest fix beats an epic story with no detail.`,
 },
 {
 title: "Course lessons + next plan",
 content: `Name **3 things** you take from the course (not "everything was great"):

- one **technical** (RemoteEvent, Union, Terrain, DataStore…);
- one about **process** (test, MVP scope, honest description, Publish);
- one about **yourself** (patience, demo in front of people, reading Output errors).

Then **one** next step after the course:
- second map zone;
- price balance;
- co-op;
- new quest;
- 60 s trailer for the portfolio.

One real step beats ten fantasies. "Next I will do everything" sounds weaker than "next I will add a second collect zone".`,
 },
 {
 title: "Full talk sample (~6 min, nearly word for word)",
 content: `Below is a sample. Substitute your game, but keep the rhythm.

**0:00 pitch:**  
*"This is a hub simulator: you collect coins, buy a power upgrade, and take a quest from an NPC."*

**0:20-3:00 demo (speak under the action):**  
*"Spawn. I run to the collect zone - coins grow in TAB. I open the shop - buy an upgrade. I walk to the NPC - ProximityPrompt, take the quest. That's the short game loop."*

**3:00-4:30 systems:**  
*"Three systems. First - leaderstats on the server; HUD only displays. Second - purchase via RemoteEvent: client asks, server checks price and deducts. Third - quest on ProximityPrompt so we do not catch random Touched."*

**4:30-5:30 challenge:**  
*"Biggest snag - double coin charge. Fixed with a server check and a short button pause."*

**5:30-6:30 lessons + next:**  
*"From the course I take three things: do not trust the client with money, make a test plan before Publish, and that an honest MVP beats empty promises. Next I will add a second collect zone."*

**close:**  
*"Link is in chat and in the portfolio - happy if you come play. Questions?"*

In rehearsal start a timer. If longer than 8 min - cut systems, do not cut the demo.`,
 },
 {
 title: "Q&A - typical questions and ready answers",
 content: `After the show expect 1-3 questions. Answer in **20-30 seconds**, then stop.

| Question | Short answer |
|----------|--------------|
| How long did it take? | "I assembled the finale in module 12; systems came from the whole course." |
| What would you change? | One thing from the bug list or balance, no excuses |
| Can I play? | Drop the link immediately + "also in the portfolio" |
| Did you build it all yourself? | Honestly: what you did alone, what with teacher help |
| Will there be a GamePass? | Only if you actually plan it; otherwise "in-game coins for now" |
| Why this genre? | 1 sentence about what you found interesting to build |
| Where was the hardest place in code? | Name the system from the challenge, not the whole project |

If you do not know: *"I cannot say exactly now - I will write it down and check after class."* Better than inventing.

Do not argue with critique. Write **1 idea** from the room into an "after SHOWCASE" note. Thank them and move on.`,
 },
 {
 title: "Plan B - if live fails",
 content: `Live Studio can freeze, internet can drop, Play may not start. That is fine if you have a backup.

Before the lesson starts prepare at least two items:

| Plan B | When you switch |
|--------|-----------------|
| 60-90 s golden-path video | Studio / Play will not open |
| 4-6 screenshots in the right order | Video will not open either |
| Play link to the published game | Viewer can join while you talk |
| Second device / account | Fast restart without panic |
| Portfolio from 12.5 on screen | Pitch, screenshots, and link even without Studio |

Failure protocol (30-40 s):
1. Calmly say: *"I will switch to the backup demo."*
2. Open video or screenshots.
3. Continue pitch → show → systems on the same timing.
4. At the end still drop the link.

Do not spend 3 minutes on "wait, it will load…". The audience values that the show continues.`,
 },
 {
 title: "Online class: camera, sound, screen",
 content: `If SHOWCASE is on Zoom / Meet / Teams - tech is part of the talk.

**10 minutes before your slot:**
- headphones (no echo);
- mic checked: say "one-two" in class chat;
- camera at eye level, face in frame, light from the front, not behind;
- close extra tabs, notifications, Discord music;
- game / Studio window on the monitor you share;
- turn on **screen share** of the game window specifically (not the whole desktop with passwords).

During the demo:
- show the screen first, then talk;
- if share lags - lower quality or switch to plan B video;
- look at the camera sometimes, not only the game;
- do not shout: mic closer = calmer voice.

If camera is off by class rules - OK, but voice and screen must be clean. Copy the game link to clipboard and into the teacher's chat in advance.`,
 },
 {
 title: "Rehearsal protocol (do it this way)",
 content: `Rehearsal is not "run it in your head." Do it with voice and a timer.

**At least 2 times**, better 3:

1. **Round 1 (dry):** demo only, silent, 2-3 min. Check the route does not break.
2. **Round 2 (full):** pitch → demo → systems → challenge → lessons → link. Timer 6 min. Note where you stuck.
3. **Round 3 (almost real):** same + 2 made-up questions from the Q&A table. If online - turn on screen share as in class.

After each round cut extras. If it does not fit in 8 min - cut adjectives and the third system, keep the demo.

Bonus: ask a friend / sibling / parent to listen for 3 minutes. If they get the genre with no extra explanation - the pitch is OK.`,
 },
 {
 title: "Cheat sheet on paper (not a wall of text)",
 content: `On an A5 sheet / sticky note only anchors:

1. Pitch (1 line)
2. Demo route (4 steps)
3. Names of 2-3 systems
4. One bug story (4 hook words)
5. 3 lessons + 1 "next"
6. Game link (or "link in chat")

During the talk look at people / the camera. The sheet is only if you freeze for 2 seconds.

**Do now (5 min):** rewrite the cheat sheet by hand. If it does not fit on one side of A5 - the talk text is still too long. Shorten, do not write smaller.`,
 },
 {
 title: "Checklist before you go on stage",
 content: `2 minutes before your name in the queue walk the list:

- [ ] Pitch in 1 sentence written and said aloud today
- [ ] Demo walked dry with no explanations
- [ ] 2-3 systems named in plain language
- [ ] Challenge story ready (problem → solution)
- [ ] 3 course lessons + 1 next plan
- [ ] Plan B (video / screenshots / link) open in 1 click
- [ ] Mic / screen share ready (if online)
- [ ] Place saved: \`SmartCode - Final Showcase\`
- [ ] Portfolio from 12.5 open in case of "can I have the link?"
- [ ] Water nearby, extra tabs closed

After the talk: thank them, drop the link again, save the Place, mark practice in the LMS. This is the official end of the course - 92 lessons.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Start with 5 minutes of code and no demo",
 explanation: "The viewer still does not know what to play.",
 correctApproach: "Pitch + demo first, then 2-3 systems.",
 },
 {
 mistake: "Promise features that are not in the demo",
 explanation: "Undermines trust on the last day of the course.",
 correctApproach: "Show what works now; \"next\" as a short separate point.",
 },
 {
 mistake: "No plan B",
 explanation: "One Studio crash = an empty talk.",
 correctApproach: "Video or screenshots ready before you start.",
 },
 {
 mistake: "15+ minute talk with no structure",
 explanation: "Attention drops; it feels like chaos.",
 correctApproach: "Keep 5-8 min by the segment table.",
 },
 {
 mistake: "Forget the game link",
 explanation: "Best CTA after the show - \"come play.\"",
 correctApproach: "Link in portfolio / chat / on the sheet.",
 },
 ],
 summary:
 "You delivered the final SHOWCASE: pitch, live demo, systems and challenge story, course lessons and next plan. This is the official end of Roblox Studio - 92 lessons.",
 practiceTask: {
 title: "Practice: SHOWCASE DAY (~40 min)",
 difficulty: "beginner",
 description: `**Goal:** deliver (or fully rehearse) a final 5-8 min talk.

### Part A - Prep (10 min)
1. Finish pitch and cheat sheet.
2. Walk the golden path silently once.
3. Check plan B.

### Part B - Talk (15-20 min)
1. Timer 6-8 min.
2. Pitch → demo → systems → challenge → lessons → next.
3. 2-3 questions (from teacher / classmates / yourself aloud).

### Part C - Submit (5-10 min)
1. Put the game link in the portfolio (if not yet).
2. **File → Save to Roblox** → \`SmartCode - Final Showcase\`.
3. Mark practice complete in the LMS.

### Pass criteria
- Pitch + live (or video) demo
- ≥2 systems named
- Challenge story + 3 course lessons
- Place saved with the final name`,
 hints: [
 "Better short and clear than long and messy",
 "If you are nervous - read the pitch sitting first, then stand for the demo",
 "Keep the game link copied to the clipboard",
 ],
 optionalChallenge:
 "Record the final talk as a 5-7 min video for the portfolio (separate from live).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "About how long is the main talk on SHOWCASE DAY?",
 options: [
 "5-8 minutes (+ short questions)",
 "30-40 minutes required",
 "Exactly 90 seconds and done",
 "No time limit",
 ],
 correctAnswer: 0,
 explanation: "The day format is a clear short show, not a lecture.",
 },
 {
 id: "q2",
 type: MC,
 question: "What is a logical way to start the talk?",
 options: [
 "With a one-sentence pitch",
 "By reading all the DataStore code",
 "With an empty Baseplate and no game",
 "With 10 minutes of Terrain theory",
 ],
 correctAnswer: 0,
 explanation: "First it is clear what the game is.",
 },
 {
 id: "q3",
 type: MC,
 question: "What is the \"golden path\" in a demo?",
 options: [
 "A short route where the game looks its best",
 "Only Studio settings menus",
 "Deleting all Scripts",
 "Publishing with no description",
 ],
 correctAnswer: 0,
 explanation: "Start → action → reward (and optionally wow).",
 },
 {
 id: "q4",
 type: MC,
 question: "How many technical systems should you briefly explain?",
 options: [
 "2-3 systems in your own words",
 "All 92 lessons one by one",
 "None - screenshots only",
 "Only file names with no meaning",
 ],
 correctAnswer: 0,
 explanation: "Depth matters, but without overload.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why a \"challenge → solution\" story?",
 options: [
 "It shows developer thinking, not only a feature list",
 "It replaces Publish",
 "Needed only for Terrain",
 "It is banned at the show",
 ],
 correctAnswer: 0,
 explanation: "Stories stick better than dry lists.",
 },
 {
 id: "q6",
 type: MC,
 question: "Which of these is a good plan B?",
 options: [
 "A short video or golden-path screenshots",
 "Delete the game from the account",
 "Start a new course from lesson 1.1 during the talk",
 "Stay silent for 5 minutes",
 ],
 correctAnswer: 0,
 explanation: "If live fails - the show continues.",
 },
 {
 id: "q7",
 type: MC,
 question: "How many times should you rehearse aloud at minimum?",
 options: [
 "At least 2 times with a timer",
 "Rehearsal is not needed",
 "Exactly 50 times",
 "Only in your head with no voice",
 ],
 correctAnswer: 0,
 explanation: "Confidence comes from practice.",
 },
 {
 id: "q8",
 type: MC,
 question: "What is better to say about the future after the course?",
 options: [
 "One concrete next step",
 "A list of 40 fantasies with no priority",
 "\"I will do nothing more\" with no explanation",
 "Promise features that do not exist as if already done",
 ],
 correctAnswer: 0,
 explanation: "One real step > a pile of empty promises.",
 },
 {
 id: "q9",
 type: MC,
 question: "What is this lesson's number in the new course grid?",
 options: [
 "92nd (last)",
 "96th",
 "1st",
 "48th",
 ],
 correctAnswer: 0,
 explanation: "The course has 92 lessons; 12.6 is the finale.",
 },
 {
 id: "q10",
 type: MC,
 question: "What should be ready for SHOWCASE from earlier module lessons?",
 options: [
 "Build, test, Publish/link, and portfolio",
 "Only an empty plan with no game",
 "Only one Decal",
 "Only an open Toolbox",
 ],
 correctAnswer: 0,
 explanation: "12.1-12.5 prepare material for the final day.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why not start with a long code reading?",
 options: [
 "The viewer has not seen how the game plays yet",
 "Code is banned on Roblox",
 "Then Publish is impossible",
 "LocalScript does not exist",
 ],
 correctAnswer: 0,
 explanation: "Play experience first, then technique.",
 },
 {
 id: "q12",
 type: MC,
 question: "What belongs on the cheat sheet?",
 options: [
 "Pitch, demo route, 2-3 systems, challenge, lessons, link",
 "All module 1 theory text",
 "Only random English words",
 "Nothing - improvise with no anchor",
 ],
 correctAnswer: 0,
 explanation: "Short anchors, not a sheet.",
 },
 {
 id: "q13",
 type: MC,
 question: "What Place save name does the finale suggest?",
 options: [
 "SmartCode - Final Showcase",
 "Lesson 1.1 - House",
 "Baseplate Copy 17",
 "Untitled Experience",
 ],
 correctAnswer: 0,
 explanation: "The only final name for submit.",
 },
 {
 id: "q14",
 type: MC,
 question: "How many \"course lessons\" should you name at the end of the talk?",
 options: [
 "About three concrete points",
 "Zero - that is extra",
 "Required exactly one hundred",
 "Only the teacher's grade",
 ],
 correctAnswer: 0,
 explanation: "Three meaningful takeaways are enough.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the submitted artifact for SHOWCASE DAY?",
 options: [
 "A delivered (or fully rehearsed) talk + saved Final Showcase",
 "Only an open Explorer",
 "An empty post with no link",
 "A test with no demo and no pitch",
 ],
 correctAnswer: 0,
 explanation: "Finale = show + saved Place.",
 },
 ],
 },
}
