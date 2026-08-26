/** Roblox Module 06 EN - 10 уроків (prod-92), Sim */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson61 = {
  lessonId: "lesson-roblox-6-1",
  moduleId: "module-06",
  order: 1,
  title: "6.1 - Core loop + scene",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Explain the Simulator core loop as collect → reward → upgrade → faster collect",
    "Draw a paper sketch of the scene and answer five design questions",
    "Create Folders Collectables and SpawnPoints with sequential Part names",
    "Compare Touched and ProximityPrompt and choose Touched for collection in writing",
    "Build a small island and walk the empty loop before leaderstats in 6.2"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 39 of 92)",
        content: `In **5.10** you finished the Obby Ship + Badge. Module 6 is a new genre: **Simulator**. Ten lessons take you from scene to Ship Sim: 6.1 loop and island, 6.2 leaderstats, 6.3 HUD, 6.4 giveCoins, 6.5-6.6 spawn and Power, 6.7 DataStore, 6.8 daily goals, 6.9 balance and juice, 6.10 hand-in.

There is no economy today. No leaderstats, HUD, giveCoins, or DataStore. You decide only **what** the player repeats in a loop and **where** they do it. The rest of the module only wires numbers onto that frame.
| After 5.10 | Result of 6.1 |
|------------|---------------|
| Studio skills and playtest | Different genre: farming, not clearing a level |
| Empty or borrowed Place | Island ready for a Simulator loop |
| No collect structure | Folders and names ready for 6.4-6.5 |

6.1 is the track layout; 6.2-6.10 are the engine, gauges, and finish flag on that same track.

**Do now (2 min):** open a new Place or clean template and save as Lesson 6.1 - Core Loop.`,
      },
      {
        title: "What a Simulator core loop is",
        content: `A core loop is a short sequence of actions the player repeats, and each pass slightly improves their position. In a Roblox Simulator the chain is almost always:

**collect → reward → upgrade → faster collect → (again)**

| Step | What the player feels | Where it appears in module 6 |
|------|------------------------|------------------------------|
| Collect | Touches a Collectable | Scene in 6.1, code in 6.4 |
| Reward | Coin number grows | 6.2 leaderstats, 6.3 HUD |
| Upgrade | Coins buy power | 6.6 Power |
| Faster collect | Same route pays more | Closes the loop and pulls into the next lap |

If after a few laps the player feels no progress, the loop is dead even with a nice scene. Today you build only the physical **collect** step, but you already know where the rest of the chain goes - otherwise Folders and Part layout will fight 6.4-6.6.

Image: the loop is a conveyor; each station in module 6 adds a part, but the belt must already turn without jams.

**Do now (3 min):** write the chain in your own words in one line and name what will be the Collectable in your first version.`,
      },
      {
        title: "Why paper first, not Studio",
        content: `Dropping Parts into Studio is tempting, but expensive at the start. Paper is cheaper in three ways:

| Paper | Studio without a plan |
|-------|------------------------|
| Sketch in 2 minutes | Mock of the same idea - 20+ minutes |
| Easy to redraw | Deleting and dragging Parts gets annoying |
| Whole zone at a glance | Camera loses the big picture |

The sketch does not need to be art. A boundary rectangle, a few Collectable dots, and an arrow from spawn to the first collect are enough. The goal is to answer: how many items, how far apart, where the zone edge is so the player does not fall into the void.

Experienced Sim builders almost always sketch that plan before Explorer. Even if the scene changes later, the act of drawing forces decisions that otherwise pile up into chaos.

A map before a walk in the woods; without it you can run in circles and call it progress.

**Do now (5 min):** draw or describe the boundary, 3-5 Collectables, and the route from spawn.`,
      },
      {
        title: "Five paper design questions",
        content: `A good sketch closes a concrete list before Studio:

1. How many Collectable **types** in the first version?
2. How many **instances** of one type in the zone at once?
3. What happens to the Part on touch - vanish, cooldown, immediate new one?
4. Where is the zone **boundary** - wall, cliff, curb?
5. Where is the **start**, and how many steps to the first Collectable?

Typical answers for 6.1 are simple: **one type**, **3-8 instances**, Part **vanishes** (no real respawn yet - that comes in 6.5), boundary is a **small island with a curb**, start is **1 SpawnPoint** near the first coins.

Do not invent final economy on this sheet. DataStore, daily goals, and balance are topics for 6.7-6.9. Today you only check that the empty route is physically walkable and feels logical.

| Question | Typical 6.1 answer | Why not more |
|----------|--------------------|--------------|
| Types | 1 | A second type complicates names and spawn |
| Count | 3-8 | Enough to feel "farm" without chaos |
| After touch | Vanish (manual for now) | Return code is 6.4-6.5 |
| Boundary | Visible curb | Without it playtest lies |
| Start | 1 marker near the zone | Far away = player gets lost |

**Do now (4 min):** write answers to all five questions next to the sketch. If stuck, shrink the scale.`,
      },
      {
        title: "Folders: Collectables and SpawnPoints",
        content: `Parts scattered in the Workspace root are the first cause of chaos by the second lesson, when objects number in the dozens. A Folder only groups; it does not affect physics or render.

Minimum structure for 6.1:

\`Workspace\`
\` └ Collectables\`
\` └ SpawnPoints\`

| Folder | What is inside | Why separate |
|--------|----------------|--------------|
| Collectables | Parts the player touches now | Easy to list active collects |
| SpawnPoints | Empty position markers | 6.5 will read only these for spawn |

SpawnPoints markers: Part with Transparency 1, CanCollide false, Anchored true - or an Attachment. These are not Collectables; they are addresses "a coin will appear here later".

Splitting the two Folders prepares 6.5: a Script will walk \`SpawnPoints:GetChildren()\` and create a Collectable at each position. If markers and ready items share one Folder, spawn will start cloning or deleting the wrong things.

In 6.4 giveCoins will hook into Parts in Collectables via Touched. Clean Folders today save hours of renaming tomorrow.

**Do now (6 min):** create both Folders in Workspace. If you already have test Parts, sort them by role.`,
      },
      {
        title: "Names Collectable_01, not Part1",
        content: `Studio names new Parts Part, Part1, Part2. Fine for a quick test, bad for Scripts. Already in 6.1 lay down sequential names: 6.4-6.6 will find objects by prefix and number.

| Object | Example | Rule |
|--------|---------|------|
| Collectable | Collectable_01 | Prefix + zero-padded number |
| SpawnPoint | SpawnPoint_01 | Same number in the pair |
| Boundary (optional) | ZoneBorder | Singular, no number |

Zero-padded numbers (\`01\` instead of \`1\`) keep Explorer sorting: without the zero, Collectable_10 lands between Collectable_1 and Collectable_2 and confuses debugging.

Naming is not cosmetics. In 6.5 it is handy to match SpawnPoint_03 with the spot for Collectable_03. Name chaos today means rewriting Folders mid-spawn code.

Do not use spaces, emoji, or random casing: Coin Cool, COIN, coin_a. One style for the whole Place.

Warehouse bay numbers; without them the loader does not know where to put the crate.

**Do now (5 min):** rename Parts in both Folders so numbers match in pairs.`,
      },
      {
        title: "Island scale and visible boundary",
        content: `The goal of 6.1 is to verify the loop, not impress with visuals. An oversized island full of decor eats hours before you know whether the route even works.

| Parameter | Guideline |
|-----------|-----------|
| Zone size | 40×40 - 60×60 studs |
| Collectable | 3-8 |
| Start → first collect | 5-15 studs |
| Boundary | Curb, cliff, or low wall |

The boundary matters even without coins: in playtest the player must not fall into the void and lose orientation. Anchored true + CanCollide true on the curb solves that in a few minutes.

Do not build multiple biomes and teleports. One closed space. Expand after the base loop is confirmed in 6.4-6.9.

Distance between Collectables should allow a short run, not a marathon and not a crush where Parts merge. If two sketch dots share almost the same point, spread them in Studio.

**Do now (10 min):** build or trim the zone to the table, place SpawnPoint and Collectable from the sketch.`,
      },
      {
        title: "Touched vs ProximityPrompt",
        content: `Two main ways a Part reacts to the player. The choice sets the feel of the whole farm.

| Criterion | Touched | ProximityPrompt |
|-----------|---------|-----------------|
| Action | Walk up / touch | Walk up and press (E) |
| Mass collect | Fast, many in a row | Slower, one action per item |
| Hint | No built-in | Icon with text |
| Typical in Sim | Coins, resources | Doors, NPCs, rare actions |
| Accidental trigger | Higher | Lower |
| First script | Simpler Connect | More Instance setup |

Simulators historically use **Touched** for the main resource: the player runs and collects dozens of items per second. That speed is what makes farming feel right. ProximityPrompt is better for deliberate rare actions - shop, dialog, one-shot chest.

In 6.4 giveCoins will hook into Touched on Parts in Collectables. Today's choice directly decides which code you write in three lessons.

Image: Touched is picking apples in an orchard at a run; Prompt is the key to one gate.

**Do now (4 min):** run your sketch in your head first with Touched, then with Prompt - feel the pace difference.`,
      },
      {
        title: "6.1 decision: Touched for Collectables",
        content: `For the main Collectable the lesson recommends **Touched**. Three reasons:

1. The "collect → reward" cycle only feels alive when several items are collected in seconds without stopping for a button.
2. A Prompt on each of 5-8 coins quickly turns into fatigue, not fun.
3. The first server script is simpler: fewer Instances and fewer failure points on the first test.

ProximityPrompt is not "bad" - it is for a different role. Rule: **Touched for mass farming, Prompt for rare deliberate action**. Shop or NPC will come later with Prompt; coins stay on Touched.

In 6.1 do not write an award Script. Only **write down** the decision in one sentence in your design notes. Without a record it is easy to "change your mind" in 6.4 and break the genre feel.

| Role | Choice | Lesson |
|------|--------|--------|
| Collectable coin | Touched | 6.1 decision, 6.4 code |
| Shop / NPC | ProximityPrompt | later in the module |
| Test Part with no logic | No script yet | exactly 6.1 |

**Do now (3 min):** write: "Collectables use Touched because ..." in your own words.`,
      },
      {
        title: "What not to build today on purpose",
        content: `The urge to jump ahead is the main reason 6.1 stretches into a week. Artifact boundaries:

| Do not do now | When it comes |
|---------------|---------------|
| leaderstats / IntValue Coins | 6.2 |
| HUD / TextLabel with a number | 6.3 |
| Touch award Script | 6.4 |
| Auto-respawn Collectable | 6.5-6.6 |
| DataStore | 6.7 |
| Shop and upgrades for coins | 6.6+ |

Each next layer is simpler on a proven scene and clean Folders. DataStore on name chaos forces you to fix geometry and save at the same time.

Write shop or second-island ideas in "later" notes and return to the limited task. Scope discipline in 6.1 makes 6.2-6.10 faster, not slower.

If the Place already has a test Script with Coins, mark it "draft 6.2+", not part of the 6.1 hand-in.

**Do now (2 min):** glance at Explorer: are there leftover Value / ScreenGui / DataStore scripts in the hand-in?`,
      },
      {
        title: "Playtest the empty loop",
        content: `A test without coins checks that the scene is ready to accept logic from later lessons.

| # | Action | Expectation |
|---|--------|-------------|
| 1 | Play, appear near SpawnPoint | Start in the zone, not in the void |
| 2 | Walk to each Collectable | No stuck geometry |
| 3 | Try to leave the boundary | Curb holds; you do not fall |
| 4 | Explorer during Play | Folders in place, same names |
| 5 | Output | Empty of errors (no scripts yet) |
| 6 | Compare to sketch | Route matches the plan |

Item 2 is the main hand-in check: if you cannot reach a Part, future giveCoins will not save the game feel. Fix now - minutes; after scripts you must test geometry and logic together.

Item 3 prevents the classic published Sim complaint: "fell off the map and got stuck".

Do not measure Coins per minute today - there is no economy yet. Measure only: is the route comfortable and does the boundary work.

**Do now (8 min):** walk all six items; fix stuck spots immediately.`,
      },
      {
        title: "Hand-in checklist and bridge to 6.2",
        content: `Before Save, check briefly:

Paper sketch with the chain collect → reward → upgrade → faster collect and answers to five questions. Folders Collectables and SpawnPoints in Workspace. Names Collectable_0N / SpawnPoint_0N with paired numbers. Written "Touched because ...". Island 40×40-60×60, 3-8 Collectables, visible boundary. Playtest without stuck spots. Save: **Lesson 6.1 - Core Loop**.

Next, **6.2 - leaderstats** adds server truth for Coins on Player. Scene and Folders stay: you do not rebuild the island, you only add a Script in ServerScriptService. In 6.4 Touched on the same Collectables will call giveCoins. In 6.5 SpawnPoints become auto-spawn addresses.

If names are chaos now or you have no Touched/Prompt decision, close that before 6.2. Otherwise leaderstats sits on a shaky frame, and debugging mixes geometry with player data.

Day artifact: **a thought-through loop on paper + a clean scene with Folders and a written collection-method choice**, ready to accept leaderstats without reworking the track.

**Do now (2 min):** Save the Place with the exact name Lesson 6.1 - Core Loop and close extra Explorer tabs.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Opened Studio and placed Parts without a sketch",
      explanation: "Without a plan the scene grows chaotically, and you end up breaking geometry while wiring code.",
      correctApproach: "Sketch and five design questions first, then Studio",
    },
    {
      mistake: "Collectables sit in the Workspace root with no Folder",
      explanation: "With dozens of Parts you cannot quickly list active collects or wire 6.4-6.5.",
      correctApproach: "Folder Collectables and Folder SpawnPoints from day one",
    },
    {
      mistake: "Names stayed Part, Part1, Part2",
      explanation: "Future spawn cannot match SpawnPoint to Collectable unambiguously.",
      correctApproach: "Collectable_01 / SpawnPoint_01 with zero padding and paired numbers",
    },
    {
      mistake: "ProximityPrompt for mass coin collection",
      explanation: "A button on every item breaks Simulator farm pace.",
      correctApproach: "Touched for Collectables; leave Prompt for rare actions",
    },
    {
      mistake: "Started leaderstats, HUD, or DataStore in 6.1",
      explanation: "Economy layers land on an untested scene and mix bugs together.",
      correctApproach: "Only scene, Folders, and written Touched - the rest from 6.2",
    },
    {
      mistake: "Huge island with several zones before the first playtest",
      explanation: "Hours of decor spent before checking whether the loop is walkable.",
      correctApproach: "One small island 40×40-60×60 and 3-8 Collectables",
    },
    {
      mistake: "No visible zone boundary",
      explanation: "In playtest the player falls into the void and loses orientation.",
      correctApproach: "Curb or low wall around the collect zone",
    }
  ],
  summary: "You defined the Simulator core loop (collect → reward → upgrade → faster collect), answered five design questions, built Folders Collectables and SpawnPoints with paired names, chose Touched for mass collect in writing, and walked an empty playtest of a small island. This is the frame that 6.2-6.10 will layer with leaderstats, HUD, giveCoins, spawn, Power, DataStore, and Ship without reworking the scene.",
  practiceTask: {
    title: "Core loop and scene (~35 min)",
    difficulty: "beginner",
    description: `**Goal:** paper design of the core loop + clean scene in Studio, ready for leaderstats from 6.2.

### Part A - Paper design (10 min)
1. Describe the chain collect → reward → upgrade → faster collect.
2. Answer five questions: types, count, behavior after touch, boundary, start.
3. Write: Collectables = Touched, because ...

### Part B - Scene in Studio (18 min)
1. Folder Collectables and Folder SpawnPoints in Workspace.
2. Zone 40×40-60×60 studs with a visible boundary.
3. 3-8 Parts Collectable_01... and paired SpawnPoint_01...

### Part C - Playtest and Save (7 min)
1. Play - walk to each Collectable, check the boundary.
2. Output with no errors.
3. **Save:** Lesson 6.1 - Core Loop`,
    hints: [
      "The sketch does not need to look good - the main thing is closing five questions",
      "Numbers Collectable_XX and SpawnPoint_XX must match",
      "Touched for fast farming is the genre standard at this stage"
    ],
    optionalChallenge: "Add a second Collectable color with prefix CollectableB_01 as prep for multiple resource types later - with no new script.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the correct order of the Simulator core loop?",
        options: [
          "Upgrade → collect → faster collect → reward",
          "Collect → reward → upgrade → faster collect",
          "Reward → upgrade → collect → slower collect",
          "Faster collect → collect → upgrade → reward"
        ],
        correctAnswer: 1,
        explanation: "The standard Simulator genre chain.",
      },
      {
        id: "q2",
        type: MC,
        question: "Why sketch before Studio?",
        options: [
          "Cheaper and faster to change ideas than to move Parts",
          "Roblox requires paper before Publish",
          "Studio blocks deleting Parts without a sketch",
          "Paper replaces Folders in Workspace"
        ],
        correctAnswer: 0,
        explanation: "Cheap iteration before spending time in Explorer.",
      },
      {
        id: "q3",
        type: MC,
        question: "What is NOT one of the five design questions in 6.1?",
        options: [
          "How many Collectable types in the first version",
          "Where the zone boundary is",
          "How many DataStore keys are needed for save",
          "What happens to the Part after touch"
        ],
        correctAnswer: 2,
        explanation: "DataStore is a 6.7 topic, not paper design for 6.1.",
      },
      {
        id: "q4",
        type: MC,
        question: "Why keep Collectables and SpawnPoints in separate Folders?",
        options: [
          "Roblox forbids two Part types in one Folder",
          "SpawnPoints must be visible, Collectables must not",
          "It is only a mentor rule with no technical benefit",
          "So the spawn Script in 6.5 does not mix markers with ready items"
        ],
        correctAnswer: 3,
        explanation: "Separation prepares a clean spawn cycle.",
      },
      {
        id: "q5",
        type: MC,
        question: "Which name matches the 6.1 scheme?",
        options: [
          "Part2",
          "Collectable_01",
          "coin cool",
          "PART"
        ],
        correctAnswer: 1,
        explanation: "Type prefix + zero-padded number in front.",
      },
      {
        id: "q6",
        type: MC,
        question: "Why prefer 01, 02 over 1, 2?",
        options: [
          "Roblox requires a zero in every Part name",
          "The zero speeds up touch physics",
          "Keeps correct sorting in Explorer after ten instances",
          "Lets you skip Folders"
        ],
        correctAnswer: 2,
        explanation: "Without the zero, Collectable_10 gets mixed between _1 and _2.",
      },
      {
        id: "q7",
        type: MC,
        question: "Main difference between Touched and ProximityPrompt?",
        options: [
          "ProximityPrompt works only in a LocalScript",
          "Touched always shows an icon with a label",
          "No difference for the player",
          "Touched fires on contact; Prompt requires a button press"
        ],
        correctAnswer: 3,
        explanation: "Automatic touch versus deliberate action.",
      },
      {
        id: "q8",
        type: MC,
        question: "Why does 6.1 recommend Touched for Collectables?",
        options: [
          "ProximityPrompt is technically impossible on a Part",
          "Gives fast mass collect with no button on every item",
          "Touched itself saves progress to DataStore",
          "Touched creates leaderstats with no code"
        ],
        correctAnswer: 1,
        explanation: "Farm pace is the key genre feel.",
      },
      {
        id: "q9",
        type: MC,
        question: "When is ProximityPrompt better than Touched?",
        options: [
          "For collecting dozens of coins in a row",
          "Always in any Simulator game",
          "For a rare deliberate action: shop or NPC dialog",
          "Only for decorative Parts with no logic"
        ],
        correctAnswer: 2,
        explanation: "Intent and Prompt's built-in hint.",
      },
      {
        id: "q10",
        type: MC,
        question: "What is NOT part of the 6.1 hand-in?",
        options: [
          "Folder Collectables and SpawnPoints",
          "Paper sketch of the core loop",
          "Written Touched vs Prompt decision",
          "Script that awards coins on touch"
        ],
        correctAnswer: 3,
        explanation: "Awarding is a 6.4 topic (giveCoins).",
      },
      {
        id: "q11",
        type: MC,
        question: "What approximate scene scale for the first test?",
        options: [
          "Island 40×40-60×60 studs and 3-8 Collectables",
          "Several large islands with dozens of zones",
          "The whole Baseplate with no boundaries",
          "One Collectable with no zone at all"
        ],
        correctAnswer: 0,
        explanation: "Small scale for a fast loop check.",
      },
      {
        id: "q12",
        type: MC,
        question: "Why a visible zone boundary already without economy?",
        options: [
          "Boundary is only needed for DataStore",
          "Roblox requires a boundary to create a Folder",
          "So playtest does not drop you into the void or lose orientation",
          "Boundary replaces SpawnPoints"
        ],
        correctAnswer: 2,
        explanation: "Safety and orientation during the empty test.",
      },
      {
        id: "q13",
        type: MC,
        question: "Main check in the empty-loop playtest?",
        options: [
          "HUD shows correct Coins",
          "DataStore saves progress between sessions",
          "Player can walk to each Collectable without getting stuck",
          "Power already multiplies the reward"
        ],
        correctAnswer: 2,
        explanation: "Geometry and reachability matter more than code at this stage.",
      },
      {
        id: "q14",
        type: MC,
        question: "How does 6.1 prepare for 6.2?",
        options: [
          "6.2 deletes all Folders from 6.1",
          "leaderstats replaces Folder Collectables",
          "6.1 and 6.2 are unrelated",
          "A ready scene lets you add leaderstats without reworking geometry"
        ],
        correctAnswer: 3,
        explanation: "The scene frame stays; 6.2 adds server data.",
      },
      {
        id: "q15",
        type: MC,
        question: "Exact Save name for hand-in?",
        options: [
          "Lesson 6.2 - leaderstats",
          "Lesson 6.1 - Core Loop",
          "Sim Draft Final",
          "Lesson 5.10 - Ship Badge"
        ],
        correctAnswer: 1,
        explanation: "Checklist requires Lesson 6.1 - Core Loop.",
      }
    ],
  },
};

export const enLesson62 = {
  lessonId: "lesson-roblox-6-2",
  moduleId: "module-06",
  order: 2,
  title: "6.2 - leaderstats",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Explain why TAB reads specifically a Folder named leaderstats",
    "Create Folder leaderstats and IntValue Coins on the server via PlayerAdded",
    "Optionally add IntValue Power starting at 1 next to Coins",
    "Handle already connected players with a for loop and FindFirstChild",
    "Keep Parent = player, not Character, and do not create stats in a LocalScript"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 40 of 92)",
        content: `In 6.1 you built the island scene: there is something to collect and somewhere to run. But player progress is still counted nowhere. Today you build the number: **leaderstats** with IntValue Coins on the server. This is the anchor of module 6 - HUD, giveCoins, spawn, Power, and DataStore will read or write exactly here.
| Was in 6.1 | Becomes in 6.2 |
|------------|----------------|
| Scene and collect markers | A Coins number that actually counts |
| Player sees the world | Player sees progress in TAB |
| No server truth | One Folder on Player |

In 6.3 the HUD only reads that same Coins. In 6.4 giveCoins writes to it. In 6.7 DataStore loads the saved number into this same IntValue.

leaderstats is the player's passport; TAB is the window everyone reads it through.

**Do now (2 min):** open ServerScriptService and prepare a place for the first server Script about player data.`,
      },
      {
        title: "What leaderstats is",
        content: `leaderstats is not an arbitrary folder. It is a contract with Roblox's built-in UI: if a Folder named exactly **leaderstats** appears under Player, Roblox takes each Value inside and draws a column in the TAB list.

You do not draw a Frame or write separate UI code. Correct Instance structure is enough.

\`Player\`
\` └ leaderstats (Folder)\`
\`   └ Coins (IntValue)\`

| Element | Role |
|---------|------|
| Folder leaderstats | Container TAB finds by name |
| IntValue Coins | Coin number |
| Child order | Column order in TAB |

Add Power beside it - a second column appears on its own. No ScreenGui needed for this check.

Image: the stadium scoreboard is already hanging; your job is to wire the right sensors.

**Do now (2 min):** open Explorer → Players and confirm leaderstats is not there yet.`,
      },
      {
        title: "Name exactly leaderstats",
        content: `Roblox looks for the string exactly **leaderstats** - lowercase, no spaces or variants. LeaderStats, Leaderstats, leader_stats, PlayerStats - none of these work. TAB simply will not see the Folder.

Classic trap: code compiles, print shows the number, but TAB is empty because of one letter.

| Spelling | TAB |
|----------|-----|
| leaderstats | Yes |
| Leaderstats | No |
| LeaderStats | No |
| leader_stats | No |

Tip: set the name once as a constant or copy it from a trusted place. For Coins use IntValue - a whole number with no decimal leftovers.

The most common beginner hole - an hour of debugging with no Output error, because the name case does not match.

A scoreboard password is case-sensitive; one capital letter and the door stays shut.

**Do now (2 min):** type leaderstats in the Script and compare character by character.`,
      },
      {
        title: "Folder + IntValue Coins",
        content: `Creating stats is a few Instance.new calls:

\`local leaderstats = Instance.new("Folder")\`
\`leaderstats.Name = "leaderstats"\`
\`leaderstats.Parent = player\`

\`local coins = Instance.new("IntValue")\`
\`coins.Name = "Coins"\`
\`coins.Value = 0\`
\`coins.Parent = leaderstats\`

| Instance | Name | Start |
|----------|------|-------|
| Folder | leaderstats | - |
| IntValue | Coins | 0 |

Coins starts at 0 - the player has collected nothing yet. Do not set a random "pretty" number: in 6.7 DataStore must understand that 0 means a new player or empty session progress.

Assignment order: Name and Value first, then Parent. That lowers the chance of seeing a half-ready object in TAB for one frame.

Image: fill the passport fields first, then hand it to the player.

**Do now (5 min):** write this block inside a createStats function without running Play.`,
      },
      {
        title: "Power optional: start at 1, not 0",
        content: `In 6.6 Power appears as a reward multiplier. You can lay the column today.

\`local power = Instance.new("IntValue")\`
\`power.Name = "Power"\`
\`power.Value = 1\`
\`power.Parent = leaderstats\`

| Value | Why |
|-------|-----|
| Coins = 0 | Nothing collected yet |
| Power = 1 | Neutral multiplier |

Why not 0: the formula \`final = amount * Power\` with Power 0 zeros every reward. Neutral "no bonus" is 1.

Minimum hand-in is Coins only. Power is recommended: in 6.6 you will not have to remember where stats are created, and DataStore in 6.7 already has a second field.

Power=1 is a neutral gear; Power=0 is a locked brake.

**Do now (2 min):** decide now or later; if now, add Power right after Coins.`,
      },
      {
        title: "PlayerAdded - player join",
        content: `Players.PlayerAdded fires once when a player joins. This is the natural place to create stats: the player just appeared, and the Folder does not exist yet.

\`local Players = game:GetService("Players")\`
\`Players.PlayerAdded:Connect(function(player)\`
\`  createStats(player)\`
\`end)\`

The player argument is that player's Instance. Parent = player goes to that Instance. Connect the subscription once at the top level of the Script, not inside a loop.

| Event | When |
|-------|------|
| PlayerAdded | Player joined |
| PlayerRemoving | Player is leaving (for save in 6.7) |
| CharacterAdded | Body appeared / respawned |

Today you need PlayerAdded, not CharacterAdded. Stats outlive the body.

Image: PlayerAdded is the moment you hand out a passport at the building entrance.

**Do now (4 min):** connect print(player.Name, "joined") and check Output in Play.`,
      },
      {
        title: "for existing players",
        content: `Studio and Team Test nuance: if the Script starts after the player is already in the game, PlayerAdded will not fire again for them. They stay without leaderstats.

Protection - one createStats function and two call sites:

\`Players.PlayerAdded:Connect(createStats)\`
\`for _, player in ipairs(Players:GetPlayers()) do\`
\`  createStats(player)\`
\`end\`

| Order | Why |
|-------|-----|
| Connect first | Do not miss new players during the loop |
| Then GetPlayers | Cover those already present |

In Solo Play the difference often does not show. In Team Test or on a live server the loop saves the first players from an empty TAB.

Do not put the loop before Connect without a reason: in theory a new player could join between the loop and the subscription. Standard pattern: Connect, then for.

Put a guard on the door first, then check who is already in the hall.

**Do now (5 min):** add the loop even if it seems to do nothing right now.`,
      },
      {
        title: "Only a Script in ServerScriptService",
        content: `leaderstats is created by a normal Script in ServerScriptService. This is a requirement, not style: only the server decides how many coins a player has, and only a server Script sees everyone equally through PlayerAdded.

| Type | Where | Suitable? |
|------|-------|-----------|
| Script | ServerScriptService | Yes |
| LocalScript | Client | No |
| ModuleScript | Only via require | No as auto-run |

ServerScriptService runs only on the server and does not hand its code to clients as a working Script.

If the Place already has server Scripts from 6.1, add a separate Script for stats or a clear function in an existing one, but do not scatter leaderstats creation across five places.

Image: the server is a notary; the client does not issue its own passport.

**Do now (3 min):** confirm the Script lives in ServerScriptService, not in Workspace and not in StarterPlayer.`,
      },
      {
        title: "Parent = player, not Character",
        content: `Folder leaderstats must have Parent = player, not player.Character. Character is the body model - destroyed on death, Stop/Play, and respawn. If you parent stats to Character, Coins vanish every time.

| Parent | After death |
|--------|-------------|
| player | leaderstats stays |
| player.Character | Folder is destroyed with the body |

Player lives from PlayerAdded to PlayerRemoving. Character is only the current body. The bug is sneaky: the first seconds look fine; the crack shows after the first death.

This is the main playtest check for lesson 40.

Passport in the person's pocket, not on a temporary jacket swapped after rain.

**Do now (3 min):** find .Parent = for leaderstats and confirm it is player.`,
      },
      {
        title: "FindFirstChild against duplicates",
        content: `Even with the correct Parent, protect against creating twice:

\`local function createStats(player)\`
\`  if player:FindFirstChild("leaderstats") then return end\`
\`  -- Instance.new ...\`
\`end\`

FindFirstChild returns Instance or nil and does not yield. Ideal for "does it already exist". WaitForChild waits - you do not need it here.

| Situation | Action |
|-----------|--------|
| leaderstats already exists | return |
| Missing | Create Folder and Values |
| Script ran twice | Second call is safe |

The same FindFirstChild will save giveCoins in 6.4: before writing, check that stats exist. Do not confuse with bare player.leaderstats - direct access to a missing field throws an error.

Image: before issuing a new passport, check whether the old one is already in hand.

**Do now (4 min):** add the FindFirstChild check at the start of createStats.`,
      },
      {
        title: "Never create leaderstats on the client",
        content: `A LocalScript can technically do Instance.new("Folder") named leaderstats with Parent = LocalPlayer. Lua will not forbid it. The result is an illusion:

| What happens | Why it is bad |
|--------------|---------------|
| Instance only on this client | Server and others do not see it |
| Others do not see your row in TAB | No client → world replication |
| Player controls the number | That is cheating |

Module 6 rule: client shows, server decides. In 6.2 that means: no Instance.new for leaderstats in a LocalScript.

Useful break-exercise: in a test LocalScript set Coins = 999, watch TAB, then delete the code. That demonstrates the mistake; it is not the hand-in.

A drawn passport in a mirror will not get you through the border.

**Do now (4 min):** do a short demo and remove the client code immediately.`,
      },
      {
        title: "Playtest and typical holes",
        content: `| # | Action | Expectation |
|---|--------|-------------|
| 1 | Play | TAB: name and Coins = 0 |
| 2 | Power (if any) | Power = 1 |
| 3 | Command Bar changes Coins | TAB updates |
| 4 | Team Test two clients | Both rows visible |
| 5 | Death / respawn | Coins do not vanish |
| 6 | Stop → Play | Stats again from 0 (normal until 6.7) |
| 7 | Output | No nil warn |
| 8 | Search in LocalScript | No leaderstats creation |

| Symptom | Cause | Fix |
|---------|-------|-----|
| TAB empty | Name is not leaderstats | Check case |
| Coins vanish on death | Parent = Character | Parent = player |
| First player has no stats | No for existing | Add GetPlayers |
| Two conflicting Folders | LocalScript also creates | Remove client |
| Power = 0 | Forgot Value = 1 | Set 1 |

Item 5 is the heart of the hand-in.

playtest is the check that the passport does not wash away in the rain.

**Do now (8 min):** walk items 1, 5, and 8 for sure.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Folder named Leaderstats or LeaderStats",
      explanation: "TAB looks for the string exactly leaderstats in lowercase and ignores other variants.",
      correctApproach: "Set the Folder name exactly to leaderstats with no capitals or underscores.",
    },
    {
      mistake: "Parent leaderstats = player.Character",
      explanation: "Character is destroyed on death, so Coins vanish or reset after respawn.",
      correctApproach: "Set Parent = player - the player Instance that lives the whole session.",
    },
    {
      mistake: "leaderstats is created by a LocalScript",
      explanation: "The Instance exists only on this client; the server and other players do not see it.",
      correctApproach: "Create stats only with a Script in ServerScriptService.",
    },
    {
      mistake: "No for loop over existing players",
      explanation: "Players connected before the Script starts stay without leaderstats.",
      correctApproach: "After Connect, call createStats for each of Players:GetPlayers().",
    },
    {
      mistake: "Power starts at 0",
      explanation: "A 0 multiplier in 6.6 will zero every giveCoins reward.",
      correctApproach: "Set Power.Value = 1 as a neutral multiplier.",
    },
    {
      mistake: "Coins made as StringValue or only an Attribute",
      explanation: "TAB and later code expect a numeric IntValue in leaderstats.",
      correctApproach: "Create an IntValue named Coins inside the Folder.",
    },
    {
      mistake: "No FindFirstChild before creating",
      explanation: "A repeat call can create a duplicate Folder and break code expectations.",
      correctApproach: "If leaderstats already exists - return immediately.",
    }
  ],
  summary: "You created leaderstats on the server: Folder leaderstats, IntValue Coins, and optionally Power=1 via PlayerAdded and a loop for already connected players. Parent = player, TAB shows progress - the base for HUD, giveCoins, and DataStore.",
  practiceTask: {
    title: "First server truth (~30 min)",
    difficulty: "beginner",
    description: `### Part A - Folder + IntValue (8 min)
1. Script in ServerScriptService.
2. PlayerAdded → Folder leaderstats + IntValue Coins = 0.
3. (Optional) IntValue Power = 1.

### Part B - Existing players + protection (12 min)
1. Function createStats(player) with FindFirstChild.
2. for loop through Players:GetPlayers().
3. Check Parent = player, not Character.

### Part C - Break and verify (10 min)
1. Temporarily create a client leaderstats with 999 and see the illusion, then delete.
2. Play: TAB shows Coins; death does not reset the number.
3. Save the Place as **Lesson 6.2 - leaderstats**.`,
    hints: [
      "Folder name exactly leaderstats - no capitals.",
      "Parent Folder = player, not player.Character.",
      "Connect to PlayerAdded first, then loop existing players.",
      "Power = 1 if you add the multiplier today."
    ],
    optionalChallenge: "Add a third IntValue (for example Gems = 0) and check that TAB shows three columns with no UI code.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the main artifact of lesson 6.2?",
        options: [
          "HUD on a LocalScript",
          "leaderstats.Coins on the server, visible in TAB",
          "giveCoins with anti-double",
          "DataStore rejoin"
        ],
        correctAnswer: 1,
        explanation: "The lesson builds server truth for progress.",
      },
      {
        id: "q2",
        type: MC,
        question: "What exact Folder name does TAB see?",
        options: [
          "leaderstats",
          "LeaderStats",
          "Leaderstats",
          "leader_stats"
        ],
        correctAnswer: 0,
        explanation: "Needs the string exactly in lowercase.",
      },
      {
        id: "q3",
        type: MC,
        question: "Where should leaderstats creation code live?",
        options: [
          "In a LocalScript in StarterPlayerScripts",
          "In a ModuleScript with no require",
          "In a Script in ServerScriptService",
          "In Lighting"
        ],
        correctAnswer: 2,
        explanation: "Only the server decides player data.",
      },
      {
        id: "q4",
        type: MC,
        question: "Which event creates stats for a new player?",
        options: [
          "Players.PlayerRemoving",
          "Workspace.ChildAdded",
          "RunService.Heartbeat",
          "Players.PlayerAdded"
        ],
        correctAnswer: 3,
        explanation: "Fires once on join.",
      },
      {
        id: "q5",
        type: MC,
        question: "Why a for loop over existing players?",
        options: [
          "Delete leaderstats for everyone",
          "Give stats to players connected before the Script started",
          "Replace PlayerAdded forever",
          "Create Power = 0"
        ],
        correctAnswer: 1,
        explanation: "PlayerAdded will not fire again for those already present.",
      },
      {
        id: "q6",
        type: MC,
        question: "What should Parent be for Folder leaderstats?",
        options: [
          "player.Character",
          "player.Character.Humanoid",
          "player",
          "Workspace"
        ],
        correctAnswer: 2,
        explanation: "Player lives the whole session; Character does not.",
      },
      {
        id: "q7",
        type: MC,
        question: "What happens with Parent = player.Character?",
        options: [
          "Coins become faster",
          "TAB shows a doubled number",
          "This is the recommended option",
          "Coins vanish when the character dies"
        ],
        correctAnswer: 3,
        explanation: "The Folder is destroyed with the body.",
      },
      {
        id: "q8",
        type: MC,
        question: "What starting value is correct for Power?",
        options: [
          "0",
          "1",
          "100",
          "-1"
        ],
        correctAnswer: 1,
        explanation: "1 - neutral multiplier for the future formula.",
      },
      {
        id: "q9",
        type: MC,
        question: "Why FindFirstChild before creating?",
        options: [
          "To delete Coins",
          "Required for TAB at all",
          "Protection against a duplicate leaderstats",
          "Replacement for PlayerAdded"
        ],
        correctAnswer: 2,
        explanation: "A repeat call does not create a second Folder.",
      },
      {
        id: "q10",
        type: MC,
        question: "Can you hand in leaderstats created in a LocalScript?",
        options: [
          "Yes, that is faster",
          "Yes, only in Studio",
          "Yes, if Power = 1",
          "No - other players and the server will not see it"
        ],
        correctAnswer: 3,
        explanation: "A client Instance is not server truth.",
      },
      {
        id: "q11",
        type: MC,
        question: "What does TAB show with no extra UI code?",
        options: [
          "Player name and columns from leaderstats",
          "List of all Scripts",
          "Contents of ServerStorage",
          "Output log"
        ],
        correctAnswer: 0,
        explanation: "Roblox built-in UI reads leaderstats automatically.",
      },
      {
        id: "q12",
        type: MC,
        question: "Which Instance type is correct for Coins?",
        options: [
          "StringValue",
          "BoolValue",
          "IntValue",
          "CFrameValue"
        ],
        correctAnswer: 2,
        explanation: "Whole number of coins.",
      },
      {
        id: "q13",
        type: MC,
        question: "Main playtest check for 6.2?",
        options: [
          "HUD draws an animation",
          "DataStore already saves progress",
          "Coins do not vanish after death and respawn",
          "Power is visible only in chat"
        ],
        correctAnswer: 2,
        explanation: "Parent = player guarantees stability.",
      },
      {
        id: "q14",
        type: MC,
        question: "How does 6.2 prepare for 6.3?",
        options: [
          "6.3 deletes leaderstats",
          "HUD creates its own leaderstats",
          "Power disappears in 6.3",
          "HUD will read the same Coins.Value via WaitForChild"
        ],
        correctAnswer: 3,
        explanation: "HUD is a display case for that same server truth.",
      },
      {
        id: "q15",
        type: MC,
        question: "Exact Save name?",
        options: [
          "Lesson 6.3 - HUD",
          "Lesson 6.2 - leaderstats",
          "Lesson 6.1 - Core loop",
          "Stats Draft Final"
        ],
        correctAnswer: 1,
        explanation: "Checklist requires Lesson 6.2 - leaderstats.",
      }
    ],
  },
};

export const enLesson63 = {
  lessonId: "lesson-roblox-6-3",
  moduleId: "module-06",
  order: 3,
  title: "6.3 - HUD on LocalScript",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Create a ScreenGui with TextLabel CoinsLabel in StarterGui",
    "Write a LocalScript that safely waits for leaderstats and Coins via WaitForChild",
    "Update the HUD via GetPropertyChangedSignal(\"Value\") or Changed",
    "Show the starting value immediately, not only after the first change",
    "Do not write Coins.Value from the client and prepare bindLabel for Power"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 41 of 92)",
        content: `In 6.2 you got leaderstats with IntValue Coins - server truth already exists. Today you build a display case for that truth: an on-screen HUD that shows Coins without opening TAB. The LocalScript only reads Value and draws text. No writes, no award logic.
Without a stable HUD, 6.4-6.10 would wire giveCoins, spawn, Power, and DataStore into a system the player only sees through TAB. That is awkward and unlike a real Simulator game.

| Was in 6.2 | Becomes in 6.3 |
|------------|----------------|
| leaderstats.Coins on the server | On-screen text reads the same Value |
| TAB shows Coins | Persistent HUD without TAB |
| Growth in the player list | Growth in a screen corner |

TAB is the tournament board between rounds; HUD is the speedometer while moving.

**Do now (3 min):** open the Place from 6.2 and confirm Coins exists and grows in TAB.`,
      },
      {
        title: "Why a HUD if TAB already exists",
        content: `TAB shows leaderstats automatically. But the player must press a key, the list covers the screen, and during collecting nobody opens TAB every second for +1.

| TAB | HUD |
|-----|-----|
| Opens with a key | Always on screen |
| Shows all players | Focus on your Coins |
| Good for comparison | Good for instant feedback |
| Standard look | Your style and position |
| No code | ScreenGui + LocalScript |

In a Simulator, the decision "keep collecting or move on" is made while looking at the number in the corner. That is why almost every published Sim has its own HUD from the first second.

You do not need to turn TAB off. It stays as a debug backup: if the HUD breaks, TAB still shows server truth.

Image: a speedometer is needed every moment; a results board is once per lap.

**Do now (2 min):** recall any Simulator game and where its coin HUD sits - usually top left or right corner.`,
      },
      {
        title: "ScreenGui, Frame, TextLabel",
        content: `HUD is an Instance tree in StarterGui. Roblox copies it into each player's PlayerGui on join.

\`StarterGui\`
\` └ ScreenGui "HUD"\`
\`   └ Frame "CoinsFrame"\`
\`     └ TextLabel "CoinsLabel"\`

| Instance | Property | Value | Why |
|----------|----------|-------|-----|
| ScreenGui | ResetOnSpawn | false | HUD does not vanish on death |
| Frame | BackgroundTransparency | 0.4-0.6 | Text readable on any background |
| Frame | Position | top corner | Does not block center |
| TextLabel | Text | "Coins: 0" | Placeholder until first update |
| TextLabel | TextScaled | true | Fine on phone and PC |
| TextLabel | Name | CoinsLabel | LocalScript looks for this exact name |

ResetOnSpawn true recreates the GUI on every respawn. For a currency counter that hurts: subscriptions duplicate or the HUD flickers. Set false once.

Do not draw a personal HUD as a SurfaceGui on a Part in Workspace. StarterGui + ScreenGui is the standard path for player UI.

ScreenGui is the helmet glass; Frame is the instrument panel on that glass.

**Do now (6 min):** create ScreenGui (ResetOnSpawn false) → Frame → CoinsLabel with text "Coins: 0".`,
      },
      {
        title: "LocalScript: client, not server",
        content: `A LocalScript runs only on one player's client. A Script in ServerScriptService sees everyone; a LocalScript sees one person and does not decide economy for others.

HUD is an ideal LocalScript candidate: each player needs their own text with their own Coins number.

| Placement | When to use |
|-----------|-------------|
| Inside ScreenGui | Logic tightly tied to this UI |
| StarterPlayerScripts | General client logic |
| ReplicatedStorage | Module storage only, not auto-run |

\`local player = game.Players.LocalPlayer\`
\`local playerGui = player:WaitForChild("PlayerGui")\`

LocalPlayer exists only in a LocalScript. In a server Script it is nil - a typical beginner mistake.

A LocalScript in StarterGui or StarterPlayerScripts starts automatically. You do not need to start anything by hand. Confirm the type is LocalScript, not a normal Script.

Image: LocalScript is the pilot's personal display; server Script is the control tower.

**Do now (3 min):** put a LocalScript in HUD and print(player.Name) to confirm it runs.`,
      },
      {
        title: "WaitForChild for leaderstats and Coins",
        content: `Between HUD appearing and leaderstats being created on the server there is a short delay. Direct access \`player.leaderstats.Coins\` can yield nil and crash.

\`local leaderstats = player:WaitForChild("leaderstats")\`
\`local coins = leaderstats:WaitForChild("Coins")\`

| Approach | Risk |
|----------|------|
| player.leaderstats.Coins | nil at start |
| FindFirstChild without waiting | nil once with no handling |
| WaitForChild | Waits safely |

For the HUD startup chain, WaitForChild without a timeout is fine. For debugging you can add:

\`local coins = leaderstats:WaitForChild("Coins", 10)\`
\`if not coins then warn("Coins did not appear") return end\`

Call WaitForChild once at start and store the result in a variable. Do not call it on every text update.

If WaitForChild never finishes - go back to 6.2 and check that the server creates leaderstats.Coins.

WaitForChild is the queue at the register; do not read the receipt while the register is still closed.

**Do now (4 min):** write the WaitForChild chain and print(coins.Value).`,
      },
      {
        title: "Changed and GetPropertyChangedSignal",
        content: `Text must update whenever the server changes Coins.Value.

| Method | Trait |
|--------|-------|
| coins.Changed | Any Instance property change |
| GetPropertyChangedSignal("Value") | Only Value changes |

For IntValue the difference is small, but GetPropertyChangedSignal is a clearer contract: "I care only about Value". That helps when Power and several subscriptions appear.

\`coins:GetPropertyChangedSignal("Value"):Connect(function()\`
\`  coinsLabel.Text = "Coins: " .. coins.Value\`
\`end)\`

Or via Changed:

\`coins.Changed:Connect(function(newValue)\`
\`  coinsLabel.Text = "Coins: " .. newValue\`
\`end)\`

Both are fine for hand-in. Course recommendation is GetPropertyChangedSignal, especially if you later make bindLabel.

Check: change Coins via Command Bar on the server - HUD should update with no Stop/Play.

Image: the subscription is the cashier's bell; HUD reacts to every new total on the receipt.

**Do now (5 min):** connect one of the two variants and change Coins via Command Bar.`,
      },
      {
        title: "update() immediately + subscription",
        content: `A subscription updates text only after the first change. If the player joins with already saved Coins (after DataStore in 6.7), the "Coins: 0" placeholder lies until the first collect.

Correct order:

\`local function updateCoins()\`
\`  coinsLabel.Text = "Coins: " .. coins.Value\`
\`end\`
\`updateCoins()\`
\`coins:GetPropertyChangedSignal("Value"):Connect(updateCoins)\`

| Step | Why |
|------|-----|
| One update function | Same format always |
| Call immediately | Starting number with no wait |
| Connect the same function | No duplicated formatting |

Do not hardcode "Coins: 0" in one place and another format in Changed. Classic cause of text "jumping" on first update.

After DataStore this pattern becomes critical: load may set 50 Coins before the first collect, and HUD must show 50 immediately.

Read the current receipt first, then listen for new purchases.

**Do now (6 min):** make updateCoins() immediately + Connect and check Play with no flicker.`,
      },
      {
        title: "Never write Coins from the client",
        content: `HUD is a display case, not the register. LocalScript only reads coins.Value.

| Allowed on client | Not allowed on client |
|-------------------|------------------------|
| Read coins.Value | Write coins.Value = |
| Format text and color | Decide how many coins the player has |
| Local number animation | Change economic truth |

A client write does not become server truth. In Studio you only fool yourself; in a live game an exploit can paint a million in the HUD while a server purchase rejects.

Module 6 mantra: client shows, server decides. HUD shows; giveCoins in 6.4 decides.

If you want to check HUD design - change Coins via Command Bar (server context), not from a LocalScript.

Search the LocalScript for \`coins.Value =\`. If that is an assignment, not a read - delete it.

A shop window does not print its own price tags in place of the cashier.

**Do now (2 min):** search coins.Value = in the LocalScript and remove any write.`,
      },
      {
        title: "Replication lite: why Remote is not needed",
        content: `IntValue in leaderstats replicates automatically. Server changes Value - client gets a copy - LocalScript hears the signal.

| Step | Where |
|------|-------|
| 1. Server changes coins.Value | Script / future giveCoins |
| 2. Replication engine notices the change | Roblox |
| 3. Client gets the new Value | Automatically |
| 4. LocalScript updates TextLabel | Your 6.3 code |

Client-to-server actions need a RemoteEvent. Server → client for Instances under Player is already built in.

Important: a Lua table in a ModuleScript does not replicate by itself. HUD works without a Remote precisely because Coins is an IntValue in the tree, not a local table.

Do not add a Remote "so HUD learns about Coins". That is extra complexity and a common mistake on top of replication that already works.

Image: leaderstats is a scoreboard the stadium already broadcasts; do not build a second radio channel for the same number.

**Do now (2 min):** change Coins via Command Bar and watch HUD reaction speed with no Remote at all.`,
      },
      {
        title: "Ready for Power: bindLabel",
        content: `In 6.6 Power appears. Instead of copying WaitForChild + Connect for every Value, make a shared function today.

\`local function bindLabel(valueInstance, label, prefix)\`
\`  local function update()\`
\`    label.Text = prefix .. valueInstance.Value\`
\`  end\`
\`  update()\`
\`  valueInstance:GetPropertyChangedSignal("Value"):Connect(update)\`
\`end\`
\`bindLabel(coins, coinsLabel, "Coins: ")\`

| Without bindLabel | With bindLabel |
|-------------------|----------------|
| Copied code per Value | One call per label |
| Easy to forget starting update | update always inside |
| Different text formats | Single prefix .. Value |

For the 6.3 hand-in a working CoinsLabel is enough. bindLabel is an optional investment. Do not create PowerLabel while Power is not yet in leaderstats.

bindLabel is a universal socket for any counter on the panel.

**Do now (5 min, optional):** rewrite CoinsLabel through bindLabel and confirm the same behavior.`,
      },
      {
        title: "Typical holes and playtest",
        content: `| Symptom | Cause | Fix |
|---------|-------|-----|
| Text stuck at 0 | No Connect | Add subscription |
| nil crash at start | No WaitForChild | Wait for leaderstats/Coins |
| HUD vanishes after death | ResetOnSpawn true | Set false |
| Updates duplicate | Connect in CharacterAdded | Subscribe once |
| Wrong number | Write from LocalScript | Read only |
| Nothing visible | Visible false / Transparency 1 | Check Properties |

| # | Action | Expectation |
|---|--------|-------------|
| 1 | Play | HUD visible, text = starting Coins |
| 2 | Command Bar changes Coins | HUD updates |
| 3 | Compare with TAB | Same number |
| 4 | Die / respawn | HUD stays, no double Connect |
| 5 | Output | No nil warn |
| 6 | Search Value= | No write in LocalScript |

Item 3 is the heart of the hand-in. If HUD and TAB disagree - subscription or format is broken.

Image: playtest is matching the display case to the register receipt.

**Do now (8 min):** walk rows 1-4 and record facts.`,
      },
      {
        title: "Lesson 41 hand-in checklist",
        content: `- [ ] ScreenGui in StarterGui with CoinsLabel
- [ ] ResetOnSpawn false for the counter
- [ ] LocalScript with WaitForChild to leaderstats.Coins
- [ ] Subscription Changed or GetPropertyChangedSignal("Value")
- [ ] update() called immediately at start
- [ ] No coins.Value = in LocalScript
- [ ] HUD and TAB show the same number
- [ ] (Optional) bindLabel ready for Power
- [ ] Save: Lesson 6.3 - HUD

Next, **6.4** adds giveCoins. Your HUD will automatically show every increment because it already listens to the same Coins.Value - with no HUD code changes. That is the point of the split: server counts, client displays.

If Coins is still missing - return to 6.2 before waiting on WaitForChild here.

Final Save locks the display case before the register starts running real sales.

**Do now (3 min):** hand-in ritual - Play → correct number → Command Bar → update → match TAB → Save.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Coins.Value = X in LocalScript",
      explanation: "That is a local lie and a path to cheating; the server does not know about that change.",
      correctApproach: "Only read coins.Value; write only on the server.",
    },
    {
      mistake: "player.leaderstats without WaitForChild",
      explanation: "On a fast Join the Instance is not ready yet; LocalScript crashes on nil.",
      correctApproach: "Use player:WaitForChild(\"leaderstats\") then WaitForChild(\"Coins\").",
    },
    {
      mistake: "Changed subscription inside CharacterAdded",
      explanation: "Every respawn adds a new Connection, and updates start duplicating.",
      correctApproach: "Subscribe once at LocalScript start.",
    },
    {
      mistake: "ResetOnSpawn true on a HUD with counters",
      explanation: "GUI recreates on death; HUD flickers or loses subscription state.",
      correctApproach: "Set ResetOnSpawn false for persistent Value counters.",
    },
    {
      mistake: "No update() call right after defining it",
      explanation: "HUD keeps the placeholder until the first Value change.",
      correctApproach: "Call update() once, then Connect that same function.",
    },
    {
      mistake: "Text format written in two different places",
      explanation: "Starting line and Changed look different; text \"jumps\".",
      correctApproach: "Keep one update for start and for all later changes.",
    }
  ],
  summary: "You built a live HUD on LocalScript: CoinsLabel reads leaderstats via WaitForChild and updates via the Value signal with no client write. HUD and TAB show one number - the base for giveCoins, Power, and DataStore.",
  practiceTask: {
    title: "Live Coins HUD (~30 min)",
    difficulty: "beginner",
    description: `### Part A - ScreenGui (8 min)
1. ScreenGui + Frame + TextLabel CoinsLabel in StarterGui.
2. Starting text "Coins: 0", TextScaled true.
3. ResetOnSpawn false.

### Part B - LocalScript (14 min)
1. WaitForChild chain to leaderstats.Coins.
2. Function update() + call immediately.
3. Subscription GetPropertyChangedSignal("Value") or Changed.

### Part C - Verify (8 min)
1. Play, change Coins via Command Bar, compare with TAB.
2. Check Output and no coins.Value = in LocalScript.
3. Save the Place as **Lesson 6.3 - HUD**.`,
    hints: [
      "WaitForChild without a timeout at start is fine.",
      "Call update() once before Connect.",
      "Never write coins.Value = in a LocalScript.",
      "If HUD is empty - check Visible and TextTransparency."
    ],
    optionalChallenge: "Add bindLabel(valueInstance, label, prefix) as a draft for Power in 6.6.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What does the HUD show in lesson 6.3?",
        options: [
          "A new way to award coins",
          "Coins.Value from leaderstats, read-only",
          "List of all players on the server",
          "Character speed"
        ],
        correctAnswer: 1,
        explanation: "HUD is a display case for server truth, not the register.",
      },
      {
        id: "q2",
        type: MC,
        question: "Where is LocalPlayer available as non-nil?",
        options: [
          "Only in a LocalScript",
          "In any Script the same way",
          "Only in a ModuleScript",
          "In Lighting"
        ],
        correctAnswer: 0,
        explanation: "LocalPlayer exists on the client.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why WaitForChild in the HUD script?",
        options: [
          "To speed up the game",
          "To replace ScreenGui",
          "To safely wait for leaderstats and Coins",
          "To remove TAB"
        ],
        correctAnswer: 2,
        explanation: "At start the Instance may still be missing.",
      },
      {
        id: "q4",
        type: MC,
        question: "How is GetPropertyChangedSignal(\"Value\") useful?",
        options: [
          "It writes Value itself",
          "It works only on the server",
          "It replaces WaitForChild",
          "It watches only the specific Value property"
        ],
        correctAnswer: 3,
        explanation: "The subscription contract is tighter than general Changed.",
      },
      {
        id: "q5",
        type: MC,
        question: "Why call update() immediately?",
        options: [
          "To delete ScreenGui",
          "So the text shows the correct number from the first second",
          "Roblox requires this for every function",
          "Otherwise the signal never fires"
        ],
        correctAnswer: 1,
        explanation: "A subscription does not show the value until the first change.",
      },
      {
        id: "q6",
        type: MC,
        question: "Can writing coins.Value from LocalScript count as hand-in?",
        options: [
          "Yes, if it is fast",
          "Yes, only in Studio",
          "No, the client only reads",
          "Yes, if ResetOnSpawn false"
        ],
        correctAnswer: 2,
        explanation: "Writing value belongs to the server.",
      },
      {
        id: "q7",
        type: MC,
        question: "What does ResetOnSpawn do on ScreenGui?",
        options: [
          "Controls text animation speed",
          "Lets the client write Value",
          "Changes Frame background color",
          "Decides whether HUD recreates on respawn"
        ],
        correctAnswer: 3,
        explanation: "For currency counters you usually set false.",
      },
      {
        id: "q8",
        type: MC,
        question: "Why does HUD work without a RemoteEvent?",
        options: [
          "Because IntValue in leaderstats replicates automatically",
          "Because LocalScript can write to the server by itself",
          "Because TAB turns off replication",
          "Because WaitForChild creates a Remote"
        ],
        correctAnswer: 0,
        explanation: "Replication of Instances under Player is already built in.",
      },
      {
        id: "q9",
        type: MC,
        question: "How does 6.3 prepare for 6.4?",
        options: [
          "giveCoins must be written in a LocalScript",
          "HUD will already show increments from the server register with no code changes",
          "Anti-double is no longer needed",
          "TAB replaces giveCoins"
        ],
        correctAnswer: 1,
        explanation: "The Value subscription automatically reflects server changes.",
      },
      {
        id: "q10",
        type: MC,
        question: "What is bindLabel in this lesson's context?",
        options: [
          "Server award function",
          "Replacement for ScreenGui",
          "Universal binding of a Value to a TextLabel",
          "A way to turn off TAB"
        ],
        correctAnswer: 2,
        explanation: "The pattern prepares HUD for Power and other counters.",
      },
      {
        id: "q11",
        type: MC,
        question: "What symptom does a subscription inside CharacterAdded cause?",
        options: [
          "Double or triple Connect after respawns",
          "WaitForChild becomes faster",
          "Coins disappear from leaderstats",
          "ResetOnSpawn turns itself off"
        ],
        correctAnswer: 0,
        explanation: "Every respawn adds a new Connection.",
      },
      {
        id: "q12",
        type: MC,
        question: "What does the main HUD vs TAB playtest item check?",
        options: [
          "Whether the on-screen number matches TAB",
          "Whether ScreenGui has a ParticleEmitter",
          "Whether LocalScript writes Value",
          "Whether Baseplate is Anchored"
        ],
        correctAnswer: 0,
        explanation: "Both UIs should mirror one server truth.",
      },
      {
        id: "q13",
        type: MC,
        question: "Where should ScreenGui for a personal HUD live?",
        options: [
          "In Workspace as a SurfaceGui on the floor",
          "In StarterGui",
          "In ServerStorage as the only option",
          "In Lighting"
        ],
        correctAnswer: 1,
        explanation: "StarterGui is copied into the player's PlayerGui.",
      },
      {
        id: "q14",
        type: MC,
        question: "Exact Save name?",
        options: [
          "Lesson 6.2 - leaderstats",
          "Lesson 6.4 - GiveCoins",
          "Lesson 6.3 - HUD",
          "HUD Draft Final"
        ],
        correctAnswer: 2,
        explanation: "Checklist requires Lesson 6.3 - HUD.",
      },
      {
        id: "q15",
        type: MC,
        question: "What if WaitForChild(\"Coins\") never finishes?",
        options: [
          "Write Coins.Value on the client",
          "Delete ScreenGui",
          "Turn off Output",
          "Return to 6.2 and check server-side leaderstats creation"
        ],
        correctAnswer: 3,
        explanation: "HUD waits for an Instance the previous lesson should create.",
      }
    ],
  },
};

export const enLesson64 = {
  lessonId: "lesson-roblox-6-4",
  moduleId: "module-06",
  order: 4,
  title: "6.4 - Reward functions + anti-double",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Write a server function giveCoins(player, amount) with validation",
    "Wire coin collect to giveCoins, not to direct Coins.Value +=",
    "Add anti-double: Collected before reward and Destroy after success",
    "Return true/false from giveCoins and tryCollect for future Fx and goals",
    "Prepare a single register for spawn, Power, and balance in later lessons"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 42 of 92)",
        content: `In 6.2-6.3 you already have Coins in leaderstats and a HUD that reads server truth. Today the reward register appears: one function giveCoins and protection against double collect. Without this, 6.5-6.10 build economy on a leaky bucket.
In 6.5 a for loop will spawn many coins onto this register. In 6.6 Power appears inside giveCoins. In 6.8-6.9 goals and juice fire only after a successful return true.

| Was in 6.2-6.3 | Becomes in 6.4 |
|----------------|----------------|
| leaderstats.Coins | Single award entry point |
| HUD reads Value | Server writes only through giveCoins |
| TAB shows progress | Collect = one payout |

giveCoins is the bank register; collect asks the register, and does not climb into the vault alone.

**Do now (3 min):** place one test coin (Anchored, CanTouch true) and decide how you mark "already collected": Destroy, Collected, or both.`,
      },
      {
        title: "Why one function giveCoins",
        content: `If \`Coins.Value +=\` is scattered across ten places, tomorrow Power and goals will need a flashlight hunt. One register keeps validation, logging, and the future formula together.

\`local function giveCoins(player, amount)\`
\`  if typeof(amount) ~= "number" or amount <= 0 then return false end\`
\`  local ls = player:FindFirstChild("leaderstats")\`
\`  local coins = ls and ls:FindFirstChild("Coins")\`
\`  if not coins then return false end\`
\`  coins.Value += amount\`
\`  return true\`
\`end\`

| Coins.Value += in 10 places | giveCoins |
|-----------------------------|-----------|
| Easy to forget a check | One entry with validation |
| Power hurts tomorrow | Multiplier in one body |
| Hard to log | print in the function |
| Fx does not know success | return true/false |

FindFirstChild is needed because a player may touch a coin before stats are ready. return false without a crash is normal behavior, not a "game bug".

In 6.6 the formula becomes \`final = amount * Power\`, but the call stays giveCoins(player, amount). Do not complicate today: only the register and checks.

Image: the register is the only door into the vault; anyone who bypasses the door breaks inventory.

**Do now (5 min):** write giveCoins and call giveCoins(player, 1) from a temporary server test - TAB should grow.`,
      },
      {
        title: "Never trust client on reward",
        content: `The client may play animation, sound, and even say "I collected". It does not decide how much to add to Coins.

| Client | Server |
|--------|--------|
| Pickup animation | Reward size |
| "I collected" via Remote | Whether the coin still exists |
| HUD reads Coins | Writes Coins only via giveCoins |
| Can lie about amount | Takes amount from Attribute or constant |

LocalScript \`Coins.Value = 999\` is an anti-example, not a hand-in. Classic trap: RemoteEvent CollectCoin with amount from the client. An exploiter sends FireServer(999999). Correct: client only asks to verify collect; server itself reads CoinValue from the Part.

| Attack / mistake | 6.4 defense |
|------------------|-------------|
| FireServer(999999) | amount from server Attribute |
| Double Remote | Collected + Destroy |
| LocalScript Value= | No client write |
| Client-side "pretty" Touch | Touched on the server |

In 6.4 server Touched is enough. A Remote for collect can come later, but giveCoins remains the only place Coins grow.

Client rings the bell; the cashier opens the safe.

**Do now (3 min):** find any LocalScript that writes leaderstats - if present, remove it or mark "not hand-in".`,
      },
      {
        title: "Touched: thin handler, thick register",
        content: `A Part fires Touched when another Part touches it. You need a player, not the floor and not a random Tool.

\`coin.Touched:Connect(function(hit)\`
\`  local player = Players:GetPlayerFromCharacter(hit.Parent)\`
\`  if not player then return end\`
\`  tryCollect(coin, player)\`
\`end)\`

The Touched handler stays thin. All register and anti-double logic lives in tryCollect.

| Filter | Why |
|--------|-----|
| GetPlayerFromCharacter nil | Not a player |
| Collected already true | Repeat touch |
| CanTouch false | Events will not arrive |
| Size too small | HRP may miss contact |

Touched spams: one run can fire many events in a frame. That is why anti-double is critical even on one test coin.

Part setup: Anchored true, CanTouch true, Size enough for contact. If the coin is in a Model, hang Touched on the Part that actually touches Character, or on PrimaryPart.

Image: Touched is the doorbell; tryCollect decides whether to open the register.

**Do now (6 min):** wire Touched to one coin and Play - TAB should show one increment, not ten.`,
      },
      {
        title: "Anti-double: Collected before giveCoins",
        content: `Without a lock, one coin pays a stack of rewards. Minimum hand-in is Destroy. Stronger - Attribute Collected before the reward.

\`local function tryCollect(coin, player)\`
\`  if coin:GetAttribute("Collected") then return false end\`
\`  coin:SetAttribute("Collected", true)\`
\`  local amount = coin:GetAttribute("CoinValue") or 1\`
\`  if not giveCoins(player, amount) then\`
\`    coin:SetAttribute("Collected", nil)\`
\`    return false\`
\`  end\`
\`  coin:Destroy()\`
\`  return true\`
\`end\`

| Step | Why |
|------|-----|
| Collected first | Second Touched exits immediately |
| giveCoins before Destroy | Do not destroy the coin without a reward |
| Rollback Collected on false | Can try again when stats are ready |
| Destroy at the end | Object vanishes physically |

Race of two Touched in one frame without Collected: both see "free", both call giveCoins. That is why SetAttribute sits before the register.

A debounce map will be needed in 6.5 when the coin respawns. Today Destroy + Collected is enough.

Anti-double is a turnstile that closes before the ticket is issued.

**Do now (5 min):** temporarily remove Collected, spam touch, see +10; restore Collected and Destroy - again +1.`,
      },
      {
        title: "How much amount today",
        content: `While CoinConfig from 6.5 may not exist yet, you set amount simply, but always on the server.

| Source | Example | Rating |
|--------|---------|--------|
| Constant | DEFAULT_COIN = 1 | Fine for first test |
| Attribute CoinValue | Properties on Part | Better, prepares 6.5 |
| Name suffix Coin_5 | Parsing the name | Temporary hack |

\`local amount = coin:GetAttribute("CoinValue") or 1\`
\`giveCoins(player, amount)\`

Main point: amount enters giveCoins as one number from the server, not from a client FireServer as truth. If amount = 0 or a string - giveCoins returns false and does not touch Coins.

Put CoinValue=1 on one coin, CoinValue=3 on another. Collect should give +1 and +3, not +1 twice.

Tomorrow spawn will set Attribute from table cfg.value. Today's manual CoinValue already trains that same read path.

Image: amount is the total on the receipt; the register does not take a total "from the buyer's head".

**Do now (4 min):** make two coins with different CoinValue and check TAB after both collects.`,
      },
      {
        title: "return true for Fx and future systems",
        content: `giveCoins and tryCollect return true/false. That is the contract: juice, quests, and a "collected" Remote run only after register success.

\`if tryCollect(coin, player) then\`
\`  -- later: playCollectFx(player)\`
\`  -- later: bumpQuestProgress(player, amount)\`
\`end\`

| Event | Who decides | Signal |
|-------|-------------|--------|
| Coin vanished | tryCollect → Destroy | return true |
| Coins not added | giveCoins → false | tryCollect false |
| Juice sound | After server true | Not on every touch |

In 6.9 juice plays after truth. In 6.8 goal progress moves only when giveCoins actually added amount. If Fx plays before giveCoins, the player hears a collect while TAB stands still - the system lies.

Do not call Destroy before giveCoins without Collected: you can destroy the coin and fail to award when leaderstats is nil.

Put print("collect ok", player.Name) only in the true branch. Touch spam must not flood Output.

true is the green check on the register before the applause.

**Do now (3 min):** add print only after successful tryCollect and check touch spam.`,
      },
      {
        title: "CollectionService tags lite",
        content: `For a single test coin, a tag is optional. For 6.5 it already helps: for will create many Clones, and one hook will catch all of them.

\`CollectionService:AddTag(coin, "Coin")\`

\`local function hookCoin(coin)\`
\`  if coin:GetAttribute("_Hooked") then return end\`
\`  coin:SetAttribute("_Hooked", true)\`
\`  coin.Touched:Connect(function(hit)\`
\`    local player = Players:GetPlayerFromCharacter(hit.Parent)\`
\`    if player then tryCollect(coin, player) end\`
\`  end)\`
\`end\`

| Without tag | With tag Coin |
|-------------|---------------|
| Touched on every Clone | One hookCoin |
| Forgot hook on a new coin | GetInstanceAddedSignal |
| Debug by Name Coin_1..N | GetTagged("Coin") |

The _Hooked flag prevents connecting Touched twice. A tag does not replace giveCoins; it only finds coins for the hook.

You can submit the lesson without CollectionService. With a tag, you will not rewrite collect logic when for-spawn arrives.

Image: a tag is a "checkout here" sticker on every coin in the warehouse.

**Do now (5 min):** if you already have two coins, add the Coin tag and one hook Script instead of two Touched copies.`,
      },
      {
        title: "CoinController structure",
        content: `Recommended order in ServerScriptService:

1. Services: Players, CollectionService.
2. giveCoins - the checkout.
3. tryCollect - Collected + giveCoins + Destroy.
4. hookCoin - Touched or tag.
5. Existing coins + GetInstanceAddedSignal.

Do not scatter giveCoins across CharacterAdded, a separate pickup Script, and a "temporary test". Tomorrow you will wire Power into the wrong place.

| Rule | Result |
|------|--------|
| One file / Module for checkout | Easy to find the formula |
| Template in ServerStorage without Touched | Hook only on Clones in Workspace |
| leaderstats created in 6.2 | giveCoins only adds |
| Coins in a Coins folder | Clear Explorer order |

If the coin lives in ServerStorage as a template, do not put Touched on the template. Otherwise submit "works on one" and 6.5 will break.

Startup order: stats from 6.2 first, then CoinController. The first touch may return false once if stats are still nil; that is acceptable with Collected rollback.

CoinController is checkout plus entry guard, not scripts scattered on every shelf.

**Do now (8 min):** put giveCoins + tryCollect + hook in one Script and remove duplicate Touched handlers.`,
      },
      {
        title: "leaderstats and early Join",
        content: `giveCoins assumes the player already has leaderstats with Coins. If a coin sits near Spawn, a touch can theoretically happen before stats exist.

| Situation | giveCoins behavior |
|-----------|--------------------|
| leaderstats and Coins exist | += amount, true |
| leaderstats nil | false, no crash |
| Coins nil | false |
| amount not a number / <= 0 | false |

tryCollect rolls back Collected on false. The player can collect again when stats are ready. Do not create Coins "on the fly" inside giveCoins as a permanent fix; leaderstats should live in one place from 6.2.

Test a sprint from Spawn straight into the coin. If the first touch sometimes returns false, either move the coin farther or accept one safe false without losing the object.

Do not fix nil stats with a client Value. Find the cause on the server.

Image: the checkout does not open an account for a customer who is not in the system yet.

**Do now (3 min):** place a coin near Spawn and confirm there is no crash and no "vanished without Coins".`,
      },
      {
        title: "Reward playtest",
        content: `Fill in facts before submit.

| # | Action | Expectation | Fact |
|---|--------|-------------|------|
| 1 | Touch coin | Coins++ in TAB | |
| 2 | HUD from 6.3 | Matches TAB | |
| 3 | Spam touch / stand on Part | One payout | |
| 4 | After collect | Destroy or Collected | |
| 5 | giveCoins(player, -5) | false, Coins unchanged | |
| 6 | Second coin CoinValue=3 | +3 | |
| 7 | Output | No spam warn | |

Rows 1 and 3 are the heart of the lesson. If 3 is red, Collected is set too late or missing.

"Stand on coin" scenario: HRP inside the Part → Touched almost every frame. Without anti-double, TAB becomes 500 per second.

After Play, check Explorer: coins are gone, not left as transparent "dead" Parts.

playtest is checkout receipt control, not "it seems to have added".

**Do now (7 min):** walk rows 1-4, then Stop + Play. In Studio, stats reset until DataStore; that is normal.`,
      },
      {
        title: "Lesson 42 submit checklist",
        content: `- [ ] giveCoins on the server with amount and leaderstats checks
- [ ] Collect calls giveCoins, not a direct +=
- [ ] Collected is set before giveCoins
- [ ] Destroy after success or an equivalent block
- [ ] amount from Attribute or a server constant
- [ ] return true/false from giveCoins and tryCollect
- [ ] No client Coins.Value= as the submit path
- [ ] Spam touch = one payout
- [ ] Save: Lesson 6.4 - GiveCoins

Next, **6.5** will spawn many coins into this checkout. **6.6** will add Power into the formula inside giveCoins. **6.8-6.9** will wire goals and juice to return true.

Short ritual: spam the coin → TAB + exactly one payout → coin gone → Output without chaos.

The final Save locks the checkout door before the warehouse fills with dozens of items.

**Do now (3 min):** run the ritual and save the Place under the exact name.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Coins.Value += in a LocalScript",
      explanation: "The client becomes the source of value, TAB and server can diverge, and cheating becomes easy.",
      correctApproach: "Award only through server giveCoins.",
    },
    {
      mistake: "No anti-double on Touched",
      explanation: "One run or standing on the Part gives many payouts per second.",
      correctApproach: "Set Collected before giveCoins and Destroy after success.",
    },
    {
      mistake: "Ten copies of reward logic in different Scripts",
      explanation: "Power, goals, and juice will have to be duplicated or they will bypass checkout.",
      correctApproach: "Keep one giveCoins function and call it from everywhere.",
    },
    {
      mistake: "Destroy before giveCoins without Collected and rollback",
      explanation: "With nil leaderstats the coin vanishes and the reward is not granted.",
      correctApproach: "Checkout first; on false, roll back Collected and leave the Part.",
    },
    {
      mistake: "amount arrives from FireServer as truth",
      explanation: "The client can send any number and lock in a cheat.",
      correctApproach: "Read amount from a server Attribute or constant.",
    },
    {
      mistake: "giveCoins crashes on nil leaderstats",
      explanation: "Early Join or a race with Spawn breaks the Script instead of a safe false.",
      correctApproach: "Check FindFirstChild and return false without crashing.",
    }
  ],
  summary: "You built giveCoins and anti-double: one server checkout, one coin, one payout, true only after a real reward. This is the base for spawn, Power, goals, and Ship.",
  practiceTask: {
    title: "Collect checkout (~30 min)",
    difficulty: "intermediate",
    description: `### Part A - giveCoins (8 min)
1. Write a function with amount and leaderstats checks.
2. Return true/false.
3. Add a short success print.

### Part B - Collect (14 min)
1. Touched → tryCollect.
2. Collected Attribute → giveCoins → Destroy.
3. Spam test: one payout.
4. Two coins with different CoinValue.

### Part C - Cleanup (8 min)
1. Remove client Coins.Value=.
2. (Optional) CollectionService tag Coin + one hook.
3. Save the Place as **Lesson 6.4 - GiveCoins**.`,
    hints: [
      "Start with one Anchored coin with CanTouch true.",
      "SetAttribute Collected before giveCoins, not after Destroy.",
      "Do not trust a client amount in a Remote.",
      "If the coin vanished without Coins, check Destroy order."
    ],
    optionalChallenge: "Move giveCoins into a CoinService ModuleScript and require it from one collect Script.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the main artifact of lesson 6.4?",
        options: [
          "A HUD that writes Coins itself",
          "Server giveCoins + anti-double for one payout",
          "A new island with no collect",
          "A Remote that trusts client amount"
        ],
        correctAnswer: 1,
        explanation: "The lesson builds a single checkout and protection against double rewards.",
      },
      {
        id: "q2",
        type: MC,
        question: "Where should Coins.Value change?",
        options: [
          "In server giveCoins",
          "In a LocalScript on every touch",
          "In a ParticleEmitter",
          "In the coin name"
        ],
        correctAnswer: 0,
        explanation: "The server is the source of truth for value.",
      },
      {
        id: "q3",
        type: MC,
        question: "When should you set Attribute Collected?",
        options: [
          "After Destroy",
          "After the collect sound",
          "Before giveCoins, to block parallel Touched",
          "Only on the client"
        ],
        correctAnswer: 2,
        explanation: "Early locking stops a double-payout race.",
      },
      {
        id: "q4",
        type: MC,
        question: "Why does Touched need anti-double even on one coin?",
        options: [
          "Because Touched is banned in Studio",
          "Because Attribute does not exist without for",
          "Because CanTouch is always false",
          "Because one run can generate many events"
        ],
        correctAnswer: 3,
        explanation: "Touched spam inflates the economy without protection.",
      },
      {
        id: "q5",
        type: MC,
        question: "Where should amount for giveCoins come from?",
        options: [
          "Blindly from the client FireServer",
          "From a server Attribute or constant",
          "From the Part color",
          "From Sound Volume"
        ],
        correctAnswer: 1,
        explanation: "A client number is not trusted.",
      },
      {
        id: "q6",
        type: MC,
        question: "What should giveCoins do when amount <= 0?",
        options: [
          "Still add 1",
          "Delete leaderstats",
          "Return false and leave Coins unchanged",
          "Set Coins = 999"
        ],
        correctAnswer: 2,
        explanation: "Validation protects the checkout from bad data.",
      },
      {
        id: "q7",
        type: MC,
        question: "Why return true from tryCollect?",
        options: [
          "So FX and future goals run only after a real reward",
          "To disable the HUD",
          "To create Terrain",
          "To replace leaderstats"
        ],
        correctAnswer: 0,
        explanation: "A success contract is needed for juice and quest systems.",
      },
      {
        id: "q8",
        type: MC,
        question: "What if giveCoins returned false after Collected?",
        options: [
          "Leave Collected and Destroy",
          "Roll back Collected and leave the coin",
          "Set Coins on the client",
          "Delete the Player"
        ],
        correctAnswer: 1,
        explanation: "Rollback lets the player collect again when stats are ready.",
      },
      {
        id: "q9",
        type: MC,
        question: "How does 6.4 prepare 6.5?",
        options: [
          "6.5 removes giveCoins",
          "Spawn is no longer needed",
          "All Clones can go through the same tryCollect/giveCoins",
          "Config replaces anti-double"
        ],
        correctAnswer: 2,
        explanation: "A single checkout scales to many coins.",
      },
      {
        id: "q10",
        type: MC,
        question: "Why use a CollectionService Coin tag?",
        options: [
          "So one hook catches all coins, including new Clones",
          "So the client can write Coins",
          "To disable Touched",
          "To replace Attribute CoinValue"
        ],
        correctAnswer: 0,
        explanation: "A tag is handy for a central hook before for-spawn.",
      },
      {
        id: "q11",
        type: MC,
        question: "What is the correct order after a successful collect?",
        options: [
          "Destroy → giveCoins → Collected",
          "giveCoins → Collected → Destroy",
          "Collected → giveCoins → Destroy",
          "Fx → Destroy → giveCoins"
        ],
        correctAnswer: 2,
        explanation: "First block, then checkout, then remove the object.",
      },
      {
        id: "q12",
        type: MC,
        question: "What counts as P0 in the 6.4 playtest?",
        options: [
          "Imperfect coin color",
          "One coin gives multiple payouts on spam",
          "Billboard is a bit crooked",
          "Ambient could be warmer"
        ],
        correctAnswer: 1,
        explanation: "Double payout breaks the whole economy that follows.",
      },
      {
        id: "q13",
        type: MC,
        question: "How does 6.4 prepare 6.6?",
        options: [
          "Power can go inside giveCoins without hunting ten += sites",
          "Power replaces anti-double",
          "Attribute CoinValue is no longer needed",
          "The HUD starts writing Power itself"
        ],
        correctAnswer: 0,
        explanation: "One checkout: one place for the multiplier.",
      },
      {
        id: "q14",
        type: MC,
        question: "Exact Save name?",
        options: [
          "Lesson 6.5 - Coin Config Spawn",
          "Lesson 6.4 - GiveCoins",
          "Lesson 6.3 - HUD",
          "Coins Draft Final"
        ],
        correctAnswer: 1,
        explanation: "The checklist requires Lesson 6.4 - GiveCoins.",
      },
      {
        id: "q15",
        type: MC,
        question: "Why not play juice before giveCoins?",
        options: [
          "Because Sound is louder then",
          "Because Destroy becomes impossible",
          "Because the Attribute will disappear",
          "Because the player hears success even when Coins did not change"
        ],
        correctAnswer: 3,
        explanation: "Feedback should confirm server truth.",
      }
    ],
  },
};

export const enLesson65 = {
  lessonId: "lesson-roblox-6-5",
  moduleId: "module-06",
  order: 5,
  title: "6.5 - Spawn with Config + for",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Describe collectable types in CoinConfig with id, value, and respawn",
    "Lay out coins with a for loop over CoinSpawns markers",
    "Set CoinValue and CoinId Attributes in spawnCoin",
    "Respawn a collected coin with Destroy, Occupied, and task.delay",
    "Wire all spawned coins to server giveCoins from 6.4"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 43 of 92)",
        content: `In 6.4 you built the checkout: giveCoins, anti-double, and one server reward entry. One test coin proves the formula, but the island is not alive yet. Today the layout system appears: a rules table, for over points, and respawn after collect.
In 6.6 giveCoins will multiply CoinValue by Power. In 6.9 you will tune value and respawn in the same table for TTG1. Without today's Config, balance spreads across ten Scripts again.

| Was in 6.4 | Becomes in 6.5 |
|------------|----------------|
| One test coin | Automatic layout |
| Hardcoded value in Script | value in CoinConfig |
| World empties after collect | Respawn via cfg.respawn |
| Checkout ready | Checkout gets an item stream |

Config is the menu; for is the waiter who delivers by table list.

**Do now (3 min):** declare CoinConfig with small value=1 respawn=5 and big value=5 respawn=12, still without spawn.`,
      },
      {
        title: "Why CoinConfig instead of manual Clones",
        content: `Hardcoded Parts feel fast on day one and break the prod cycle by day two. Cost lives in your head, respawn is "by eye", a new coin is copy-paste with a new Script.

\`local CoinConfig = {\`
\`  { id = "small", value = 1, respawn = 5 },\`
\`  { id = "big", value = 5, respawn = 12 },\`
\`}\`

| Hardcoded Parts | CoinConfig + spawn |
|-----------------|--------------------|
| Cost in your head | value in a table row |
| New coin = copy-paste | New row or point |
| Respawn by guess | respawn in seconds |
| Balance in 20 Scripts | Tune 2-3 numbers in one place |

Config says "what"; the point says "where". Do not hide value in a Part name like Coin5: renaming breaks payout. Do not put different values only in Mesh color; the server does not trust color.

Image: Config is the warehouse price list; shelf color does not replace the number on the invoice.

**Do now (4 min):** move CoinConfig into a ModuleScript or a clear block at the top of the server Script.`,
      },
      {
        title: "CoinConfigById for lookup after Destroy",
        content: `After collect the coin vanishes, but respawn still needs value and respawn for that same type. So put CoinId on the Part, and build the dictionary once at start.

\`local CoinConfigById = {}\`
\`for _, cfg in ipairs(CoinConfig) do\`
\`  CoinConfigById[cfg.id] = cfg\`
\`end\`

| Source | When to read |
|--------|--------------|
| CoinConfig | Start, type menu |
| CoinConfigById[id] | Respawn and debug after Destroy |
| CoinValue Attribute | At giveCoins |

Attribute CoinValue is runtime truth for payout. Config is the source of truth at spawn and scheduleRespawn. If you add a third rare type, one CoinConfig row updates the dictionary without copying functions.

Do not hunt respawn in ten places. One lookup lowers the risk that small returns in 5 s in one Script and 1 s in another.

CoinId is a barcode; CoinConfigById is the warehouse scanner.

**Do now (4 min):** build CoinConfigById and print the key count after the loop.`,
      },
      {
        title: "Spawn points separate from live coins",
        content: `Markers and collectables should not live in one pile. Folder **CoinSpawns** holds SP1..n. Folder **Coins** or Workspace.Coins holds live Clones.

Marker:
- Anchored true
- CanCollide false
- small Part
- Transparency 0.5 while debugging, 1 before submit

| Object | Folder | Role |
|--------|--------|------|
| SP1..SP12 | CoinSpawns | Where a coin will appear |
| Coin Clone | Coins | What you can collect |
| Template | ServerStorage | Prefab for Clone |

GetChildren does not guarantee order. If order matters, name SP01..SP12 or sort a table. Do not place 100 points on day one: 6-12 is enough for for, respawn, and playtest without lag.

Do not spawn by looping workspace.Coins. Then you clone already collected or live coins instead of markers.

Image: CoinSpawns is a floor outlet; Coins is the lamp you turn on and replace.

**Do now (6 min):** place 6-8 markers and check that most points are visible from Spawn.`,
      },
      {
        title: "spawnCoin(point, cfg) - single factory",
        content: `One function creates a live coin. The template lives in ServerStorage: the server clones; the client does not birth rewards itself.

\`local function spawnCoin(point, cfg)\`
\`  if point:GetAttribute("Occupied") then return end\`
\`  local coin = template:Clone()\`
\`  coin:SetAttribute("CoinValue", cfg.value)\`
\`  coin:SetAttribute("CoinId", cfg.id)\`
\`  coin:SetAttribute("Collected", false)\`
\`  coin.CFrame = point.CFrame * CFrame.new(0, 2, 0)\`
\`  coin.Parent = coinsFolder\`
\`  point:SetAttribute("Occupied", true)\`
\`  coin:SetAttribute("SpawnPointName", point.Name)\`
\`  hookCoin(coin)\`
\`  return coin\`
\`end\`

| Step | Why |
|------|-----|
| Clone template | Same look and physics |
| SetAttribute value/id | Data for checkout and respawn |
| Occupied true | One coin per point |
| hookCoin | Same collect path as 6.4 |

spawnCoin does not call giveCoins. It only creates the object. After for, Explorer should show coins, and Attributes should show CoinValue 1 or 5.

spawnCoin is the factory stamp; checkout stands separately at the warehouse exit.

**Do now (7 min):** write spawnCoin and call it manually for one small point.`,
      },
      {
        title: "for as a layout skill",
        content: `Here for is not math for its own sake; it is the same action on a list of points. You describe spawnCoin once; the loop repeats it N times.

\`local points = coinSpawns:GetChildren()\`
\`for i, point in ipairs(points) do\`
\`  local cfg = CoinConfig[((i - 1) % #CoinConfig) + 1]\`
\`  spawnCoin(point, cfg)\`
\`end\`

| Approach | Rating |
|----------|--------|
| One for at start | Good for MVP |
| Ten manual Clones | Bad for balance |
| while true spawn with no limit | Spam and lag |
| Loop Coins instead of CoinSpawns | Wrong address |

You can start with all small. Then alternate big/small with modulo or a separate SpawnPlan. The main rule: do not multiply Spawn code.

After Stop + Play, for lays out the starting set again. That is expected until DataStore.

Image: for is a conveyor that visits every outlet once at the start of the shift.

**Do now (5 min):** make the start for and count coins in the Coins folder.`,
      },
      {
        title: "Respawn: Destroy, delay, spawn again",
        content: `Coin life cycle: spawn → touch → giveCoins → Destroy → delay → spawn again. Without the last steps the island empties in a minute, and TTG in 6.9 plays into emptiness.

\`local function scheduleRespawn(pointName, cfgId)\`
\`  local point = coinSpawns:FindFirstChild(pointName)\`
\`  local cfg = CoinConfigById[cfgId]\`
\`  if not point or not cfg then return end\`
\`  task.delay(cfg.respawn, function()\`
\`    point:SetAttribute("Occupied", false)\`
\`    spawnCoin(point, cfg)\`
\`  end)\`
\`end\`

Save SpawnPointName and CoinId **before** Destroy. After Destroy, searching for the coin is useless.

| Rule | Why |
|------|-----|
| Destroy after successful giveCoins | No re-collect |
| Occupied on the point | No Clone stack |
| One delay per point | No double respawn |
| cfg.respawn > 0 | Touched has time to finish |

Do not set respawn=0 "for wow". Do not while spawn do on one point.

respawn returns goods to the shelf after a sale; it is not a second checkout on top of the first.

**Do now (6 min):** collect one coin and wait for it to return with the same CoinValue.`,
      },
      {
        title: "Different values: eyes vs server",
        content: `The player tells coins apart by size, color, or Billboard. The server tells them apart by the CoinValue number. Visuals are a hint, not the payout source.

| What the player sees | What the server reads |
|----------------------|-----------------------|
| Small yellow coin | CoinValue = 1 |
| Large bright coin | CoinValue = 5 |
| Rare color later | CoinValue from Config |

With Power=1 from 6.6 you can still test the clean base: small gives +1, big gives +5 in TAB. If they match, the Attribute was not set or giveCoins ignores it.

Different respawn strengthens the feel: small often, big less often. That is already number balance with no new code.

A LocalScript can recolor the Part. giveCoins still reads the Attribute on the server. Do not treat "yellower = more valuable" as checkout truth.

Image: the display can lie with color; the Attribute price tag cannot.

**Do now (4 min):** collect small and big in a row and write down both Coins gains.`,
      },
      {
        title: "One collect path for all Clones",
        content: `After spawn, every coin must enter the same system as in 6.4. Convenient options:
1. hookCoin right in spawnCoin;
2. CollectionService tag Coin + GetInstanceAddedSignal.

\`local function tryCollect(coin, player)\`
\`  if coin:GetAttribute("Collected") then return end\`
\`  coin:SetAttribute("Collected", true)\`
\`  local amount = coin:GetAttribute("CoinValue") or 1\`
\`  local pointName = coin:GetAttribute("SpawnPointName")\`
\`  local cfgId = coin:GetAttribute("CoinId")\`
\`  if giveCoins(player, amount) then\`
\`    coin:Destroy()\`
\`    scheduleRespawn(pointName, cfgId)\`
\`  end\`
\`end\`

| Do not | Why |
|--------|-----|
| Coins.Value += in the spawn script | Bypasses anti-double and future Power |
| Separate Touched script on every Clone | Ten copies of logic |
| Respawn before giveCoins | You can get a double |

Collected resets to false on a new Clone. A respawned coin is a new collect chance.

All goods go through one checkout, even when many sit on the shelves.

**Do now (5 min):** confirm for-spawned coins use the same tryCollect as the 6.4 test coin.`,
      },
      {
        title: "Anti-lag and live pile limit",
        content: `If respawn is faster than collect or Destroy was forgotten, an AFK player farms a stack of Parts. Touched may grant several payouts before Collected. FPS drops from hundreds of coins in Coins.

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Stack on one point | No Occupied / Destroy | One coin per point |
| Double payout | Anti-double after reward | Collected before giveCoins |
| Hundreds of Parts | while spawn or respawn=0 | delay from Config |
| nil cfg in Output | Lost CoinId | Attribute before Destroy |

Optionally add maxLiveCoins: if Coins children exceed 80, do not scheduleRespawn until the count drops. For submit, Occupied + Destroy + one delay is enough.

Playtest: stand on one point, collect three times. There should be one coin now, a new one after delay, no floating pile.

anti-lag is a shelf limiter: a new box only when the old one is removed.

**Do now (5 min):** do three collects on SP1 and count Coins children while waiting.`,
      },
      {
        title: "Spawn playtest table",
        content: `Before submit, fill in facts, not impressions.

| # | Action | Expectation | Fact |
|---|--------|-------------|------|
| 1 | Play | Coins on SP1..n | |
| 2 | Attributes big/small | CoinValue 5 and 1 | |
| 3 | Collect small | +1, coin gone | |
| 4 | Collect big | +5 | |
| 5 | Wait for respawn | New coin of same type | |
| 6 | Spam touch | One payout | |
| 7 | 10 collects | No stack | |
| 8 | Stop + Play | for laid out the set again | |
| 9 | Output | No spam nil cfg | |

If row 5 is red, check SpawnPointName, Occupied, and CoinConfigById. If 3 and 4 match, Attribute did not come from Config.

The table is the warehouse intake invoice before the shop opens.

**Do now (7 min):** walk rows 1-5 and mark statuses.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Ten manual Clones without for and CoinConfig",
      explanation: "Changing value or respawn means editing many places, and balance breaks.",
      correctApproach: "Describe types in CoinConfig and lay them out with one for over points.",
    },
    {
      mistake: "No respawn after Destroy",
      explanation: "The island empties; goals and TTG in later lessons have nothing to measure.",
      correctApproach: "After successful giveCoins, schedule task.delay(cfg.respawn) and a new spawnCoin.",
    },
    {
      mistake: "Value is defined only by color or Part name",
      explanation: "The client can change look, and Rename breaks any name-based logic.",
      correctApproach: "Set CoinValue and CoinId Attributes from Config at spawn.",
    },
    {
      mistake: "Respawn without Destroy or without Occupied",
      explanation: "A coin stack appears on one point and double-collect risk rises.",
      correctApproach: "Destroy the collected coin first, keep Occupied, and one delay per point.",
    },
    {
      mistake: "Coins.Value += directly in spawn or touch script",
      explanation: "Bypassing giveCoins breaks anti-double, future Power, and the single checkout.",
      correctApproach: "Route all rewards only through server giveCoins.",
    },
    {
      mistake: "A hundred points on day one",
      explanation: "No time to stabilize any of them; playtest and debug become chaotic.",
      correctApproach: "Start with 6-12 markers and two value types.",
    }
  ],
  summary: "You lay out collectables with CoinConfig and for: different values in Attributes, respawn after collect, and a single giveCoins checkout. The island keeps its own cycle for Power and balance.",
  practiceTask: {
    title: "Coin layout (~30 min)",
    difficulty: "intermediate",
    description: `### Part A - Config and points (8 min)
1. Create CoinConfig small/big with value and respawn.
2. Build CoinConfigById.
3. Place 6+ markers in CoinSpawns and a Coins folder.

### Part B - Spawn loop (14 min)
1. spawnCoin sets CoinValue, CoinId, Collected, SpawnPointName.
2. for lays out coins at start.
3. tryCollect → giveCoins → Destroy → scheduleRespawn.
4. Occupied prevents a stack on the point.

### Part C - Test (8 min)
1. Compare small and big payout.
2. Wait for respawn of the same type.
3. Save the Place as **Lesson 6.5 - Coin Config Spawn**.`,
    hints: [
      "All small first, then alternate big with modulo.",
      "print(cfg.id, cfg.value) at spawn and at respawn.",
      "Transparency 0.5 on markers while debugging, 1 before submit.",
      "Save SpawnPointName and CoinId before Destroy."
    ],
    optionalChallenge: "Add a third rare type with only a new Config row: higher value and longer respawn.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the main artifact of lesson 6.5?",
        options: [
          "Remove giveCoins and leave manual Clones",
          "CoinConfig, for-spawn, Attributes, and respawn after collect",
          "Only a new Skybox",
          "DataStore with no coins on the scene"
        ],
        correctAnswer: 1,
        explanation: "The lesson builds automatic collectable layout with data in Config.",
      },
      {
        id: "q2",
        type: MC,
        question: "Why for over CoinSpawns?",
        options: [
          "Place coins the same way from a marker list",
          "for replaces Humanoid",
          "Without for, Attribute does not exist",
          "for draws Terrain"
        ],
        correctAnswer: 0,
        explanation: "The loop repeats spawnCoin on every point.",
      },
      {
        id: "q3",
        type: MC,
        question: "Where should coin value come from at spawn?",
        options: [
          "Randomly from the client",
          "From the Skybox name",
          "From CoinConfig and set an Attribute",
          "Always 999999"
        ],
        correctAnswer: 2,
        explanation: "The table is the source of truth; the Attribute carries the runtime value.",
      },
      {
        id: "q4",
        type: MC,
        question: "Why have a respawn field in Config?",
        options: [
          "To disable Touched",
          "To replace DisplayName",
          "To stop for forever",
          "To set how long until the coin returns after collect"
        ],
        correctAnswer: 3,
        explanation: "Different types can return with different pauses.",
      },
      {
        id: "q5",
        type: MC,
        question: "How do you avoid a coin stack on one point?",
        options: [
          "Spawn faster than collect",
          "Destroy on collect plus Occupied / one delay",
          "Remove giveCoins",
          "Make CanCollide a wall forever"
        ],
        correctAnswer: 1,
        explanation: "One live coin per marker is the basic anti-lag rule.",
      },
      {
        id: "q6",
        type: MC,
        question: "Who should award the reward from a spawned coin?",
        options: [
          "LocalScript Coins =",
          "Lighting",
          "giveCoins on the server",
          "SpawnLocation by itself"
        ],
        correctAnswer: 2,
        explanation: "The single checkout from 6.4 stays required.",
      },
      {
        id: "q7",
        type: MC,
        question: "Why CoinConfigById?",
        options: [
          "To quickly find cfg by CoinId after Destroy",
          "To delete leaderstats",
          "So the client can change value",
          "To replace the CoinSpawns Folder"
        ],
        correctAnswer: 0,
        explanation: "Lookup is needed for correct respawn of the same type.",
      },
      {
        id: "q8",
        type: MC,
        question: "Where should the coin template live?",
        options: [
          "In SoundService",
          "In client Temporary",
          "No template needed",
          "In ServerStorage for server Clone"
        ],
        correctAnswer: 3,
        explanation: "The server clones the prefab, not the client.",
      },
      {
        id: "q9",
        type: MC,
        question: "How does 6.5 prepare 6.6?",
        options: [
          "6.6 deletes all coins",
          "Attributes after spawn are banned",
          "CoinValue Attribute becomes the clean base for Power",
          "Power replaces Config"
        ],
        correctAnswer: 2,
        explanation: "The multiplier will read the same server base.",
      },
      {
        id: "q10",
        type: MC,
        question: "How many value types are the minimum for submit?",
        options: [
          "Must be 50",
          "At least 2, for example 1 and 5",
          "0",
          "Only color with no numbers"
        ],
        correctAnswer: 1,
        explanation: "Value difference proves Config works.",
      },
      {
        id: "q11",
        type: MC,
        question: "What happens without Destroy on collect?",
        options: [
          "You can collect again or get duplicates",
          "FPS must go higher",
          "Config deletes itself",
          "for stops forever"
        ],
        correctAnswer: 0,
        explanation: "Cleanup is needed for both anti-double and respawn.",
      },
      {
        id: "q12",
        type: MC,
        question: "Why is color not the source of value?",
        options: [
          "Part has no Color",
          "giveCoins reads only BrickColor",
          "Color is always exact on the server",
          "Server truth is Attribute/Config; look can change visually"
        ],
        correctAnswer: 3,
        explanation: "Data matters more than an eye hint.",
      },
      {
        id: "q13",
        type: MC,
        question: "Rough point count for MVP?",
        options: [
          "About 6-12, not a hundred",
          "Must be 1000",
          "Exactly 0",
          "Only 1 for the whole module forever"
        ],
        correctAnswer: 0,
        explanation: "A small set is easier to stabilize and test.",
      },
      {
        id: "q14",
        type: MC,
        question: "How does 6.5 prepare 6.9?",
        options: [
          "Balance deletes Config",
          "TTG does not depend on spawn",
          "Balance tunes value and respawn in the same table",
          "Juice replaces spawn"
        ],
        correctAnswer: 2,
        explanation: "The same Config fields become economy levers.",
      },
      {
        id: "q15",
        type: MC,
        question: "Exact Save name?",
        options: [
          "Lesson 6.4 - GiveCoins",
          "Lesson 6.6 - Power Attributes",
          "Coin Spawn Draft Final",
          "Lesson 6.5 - Coin Config Spawn"
        ],
        correctAnswer: 3,
        explanation: "The checklist requires Lesson 6.5 - Coin Config Spawn.",
      }
    ],
  },
};

export const enLesson66 = {
  lessonId: "lesson-roblox-6-6",
  moduleId: "module-06",
  order: 6,
  title: "6.6 - Attributes / Power",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Use GetAttribute and SetAttribute for collectable value",
    "Add IntValue Power in leaderstats starting at no less than 1",
    "Compute the final reward in giveCoins with one formula that includes Power",
    "Raise Power on the server via Prompt or Remote and show it in TAB/HUD",
    "Prepare the multiplier for DataStore, daily goals, and TTG measures"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 44 of 92)",
        content: `In 6.5 you taught spawn to read Config and set Attribute CoinValue on coins. Today a second multiplier appears: player Power. The base stays on the collectable; strength lives in leaderstats. Together they change how collect feels without a new island.
In 6.7 Power will ride into DataStore next to Coins. In 6.8 goals can require collecting with higher Power. In 6.9 TTG1 will compare income at Power 1 and Power 2.

| Was in 6.5 | Becomes in 6.6 |
|------------|----------------|
| Different coins via CoinValue | Same CoinValue * Power |
| giveCoins with base | One formula with multiplier |
| Config holds value | Config stays a clean base |
| Collect identical for all | Stronger player earns faster |

CoinValue is the weight; Power is the lever you lift it with.

**Do now (3 min):** write the formula \`final = base * Power\` in a comment above giveCoins and do not change it today.`,
      },
      {
        title: "Attribute - a sticker on an Instance",
        content: `An Attribute stores simple data directly on a Part, Model, or Player without a separate child. For collectables that is handy: the coin states its own value.

\`coin:SetAttribute("CoinValue", 5)\`
\`local base = coin:GetAttribute("CoinValue") or 1\`

| | Attribute | IntValue |
|--|-----------|----------|
| Where it lives | On the Instance | Separate object in the tree |
| API | Get/SetAttribute | .Value |
| Handy for | Labels on coins and zones | leaderstats / UI Values |
| Types | number, string, boolean | By Value type |

Do not put a table in an Attribute. For complex structures use a ModuleScript Config and a short id on the Part.

GetAttribute returns nil if the key is missing. Always set a default before multiplying. The Attribute vanishes with Destroy of the Part; for a one-shot coin that is fine.

Image: an Attribute is like a price tag on goods; checkout reads it, not the shelf name.

**Do now (4 min):** open one coin from 6.5 and check CoinValue in Properties - Attributes.`,
      },
      {
        title: "Power in leaderstats, not on Character",
        content: `Next to Coins in PlayerAdded, create an IntValue:

\`local power = Instance.new("IntValue")\`
\`power.Name = "Power"\`
\`power.Value = 1\`
\`power.Parent = leaderstats\`

Why leaderstats:
1. TAB shows Power immediately.
2. The value lives on Player, not Character.
3. In 6.7 it is easier to save \`power.Value\` in the payload.

| Power location | Rating | Risk |
|----------------|--------|------|
| leaderstats IntValue | Good | Forget Name = "Power" |
| Attribute on Character | Bad for progress | Gone after respawn |
| Variable in LocalScript | Unusable | Cheat and desync |
| Attribute + IntValue together | Confusion | Two sources of truth |

Starting Power = 1 means "no boost". Do not start at 0: then all rewards become zero. In giveCoins also guard with \`if power < 1 then power = 1 end\`.

Power in leaderstats is a strength passport that does not get lost on respawn.

**Do now (5 min):** enter Play and find Power in TAB before the first collect.`,
      },
      {
        title: "One formula in giveCoins",
        content: `Update the checkout from 6.4. Base arrives as an argument; Power is read on the server:

\`local function giveCoins(player, baseAmount)\`
\`  if typeof(baseAmount) ~= "number" or baseAmount <= 0 then return 0 end\`
\`  local stats = player:FindFirstChild("leaderstats")\`
\`  if not stats then return 0 end\`
\`  local coins = stats:FindFirstChild("Coins")\`
\`  local powerVal = stats:FindFirstChild("Power")\`
\`  if not coins or not powerVal then return 0 end\`
\`  local power = math.max(1, powerVal.Value)\`
\`  local final = math.floor(baseAmount * power)\`
\`  coins.Value += final\`
\`  return final\`
\`end\`

| Check | Expectation |
|-------|-------------|
| base 5, Power 1 | +5 |
| base 5, Power 2 | +10 |
| base 1, Power 2 | +2 |
| base nil | do not call or default to 1 |

Do not multiply twice. Config holds the clean coin base. Power is a separate player multiplier. If Config.value already "includes Power", balance in 6.9 will lie.

math.floor is needed because IntValue does not like fractions. If you choose a linear bonus instead of a multiplier, lock one formula and do not mix both in different Scripts.

giveCoins is the single checkout; the multiplier must not sit again at both entry and exit.

**Do now (6 min):** add print(base, power, final) and do one collect at Power 1.`,
      },
      {
        title: "Where to get base on collect",
        content: `In tryCollect or Touched, read the Attribute that spawn from 6.5 set:

\`local base = coin:GetAttribute("CoinValue")\`
\`if typeof(base) ~= "number" then\`
\`  local id = coin:GetAttribute("CoinId")\`
\`  base = (id and CoinConfigById[id] and CoinConfigById[id].value) or 1\`
\`end\`
\`local paid = giveCoins(player, base)\`

| Source | When | Risk |
|--------|------|------|
| CoinValue Attribute | Normal path after 6.5 | Forgot SetAttribute |
| CoinId + Config | Fallback | Second lookup |
| Hardcoded 1 | Temporary test | Left in submit |

Do not take base from Part color or Mesh name. Names can change; Attribute and Config are stable contracts.

After Destroy, the coin Attribute vanishes with it. So first read base and Collected, then call giveCoins, then Destroy.

Image: first read the price tag, then hand the coin to checkout, then clear the shelf.

**Do now (5 min):** compare small CoinValue=1 and big CoinValue=5 at Power=1; the difference should be obvious.`,
      },
      {
        title: "How to raise Power on the server",
        content: `Without a way to change Power, the lesson is not proven. Minimum for today: one server entry point.

\`local function addPower(player, delta)\`
\`  local power = player.leaderstats and player.leaderstats:FindFirstChild("Power")\`
\`  if not power then return end\`
\`  power.Value = math.max(1, power.Value + delta)\`
\`end\`

| Option | Plus | Minus |
|--------|------|-------|
| ProximityPrompt on an altar | Fast to see | Free AFK farm |
| Remote from a HUD button | Convenient in UI | Needs debounce |
| Buy with Coins | Sense of cost | A bit more code |

Prompt:

\`prompt.Triggered:Connect(function(player)\`
\`  addPower(player, 1)\`
\`end)\`

A Remote may only request an upgrade. The server itself changes Power. Do not accept \`FireServer(99)\` as a new absolute strength without checks.

Add a short cooldown so spam Triggered does not push Power to absurd levels during a demo.

A strength upgrade is like a machine lever; a server operator turns it, not text on screen.

**Do now (7 min):** make an altar +1 Power and check TAB before and after press.`,
      },
      {
        title: "TAB and HUD show strength",
        content: `TAB will already show IntValue Power if Name is correct. That is the submit minimum. Optionally add PowerLabel in the CoinsHUD pattern from 6.3:

\`local power = stats:WaitForChild("Power")\`
\`local function refresh()\`
\`  PowerLabel.Text = "Power: " .. power.Value\`
\`end\`
\`refresh()\`
\`power:GetPropertyChangedSignal("Value"):Connect(refresh)\`

| Signal | What the player should see |
|--------|----------------------------|
| Join | Power: 1 |
| Upgrade | New number right away |
| Collect | Coins grow faster |
| Character respawn | Power stays |

Near the first big coin, place a sign: "Coin × Power = reward". Without explanation, the +Power button looks like decoration.

Do not write Power from a LocalScript. The HUD only reads the server Value.

Image: TAB and HUD are two boards over one strength, not two different trainers.

**Do now (4 min):** raise Power and confirm TAB and HUD show the same without Stop.`,
      },
      {
        title: "Attributes on the coin vs player state",
        content: `Split responsibility clearly.

| On the coin | On the player / leaderstats |
|-------------|-----------------------------|
| CoinValue, CoinId, Collected | Power, Coins |
| Set at spawn | Lives across respawns |
| Gone with Destroy | Kept until exit / DataStore |
| Describes the item | Describes progress |

Do not put Power Attribute on Character as the main source. Character changes. Do not duplicate Power as both Attribute on Player and IntValue; choose leaderstats.

Collected from 6.4 and CoinValue from 6.5 can live together on one coin. Do not hang Power on the coin: strength belongs to the player.

| Mistake | Result |
|---------|--------|
| Power only on Character | Multiplier gone after death |
| CoinValue only in Part name | Rename breaks the economy |
| Two giveCoins in different Scripts | Different formulas |
| LocalScript sets Power | Cheat and lying TAB |

The coin carries the price tag; the player carries the strength rank.

**Do now (3 min):** write in a note three Attributes on the coin and one Power location on the player.`,
      },
      {
        title: "Multiplier playtest",
        content: `Fill in facts before changing the formula again.

| # | Action | Expectation | Fact |
|---|--------|-------------|------|
| 1 | Power 1, coin 5 | +5 | |
| 2 | Power 2, coin 5 | +10 | |
| 3 | Power 2, coin 1 | +2 | |
| 4 | No CoinValue | default base 1 | |
| 5 | +Power on altar | TAB Power ++ | |
| 6 | Collect after upgrade | larger payout | |
| 7 | LocalScript Power=99 | server ignores | |
| 8 | Respawn big from 6.5 | CoinValue from Config | |
| 9 | Output | base / power / final | |

Rows 1, 2, and 6 are the heart of the lesson. If after upgrade the reward is the same, Power is not read or collect bypasses giveCoins.

In Team Test, two players with different Power must not share a multiplier. Each payout takes Power of who collected.

playtest is scales: first weight 5, then lever ×2.

**Do now (8 min):** walk rows 1-2 and 5-6 with no pause for decor.`,
      },
      {
        title: "Common holes and fast debug",
        content: `| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Always +base | No * Power | One formula in giveCoins |
| Always 0 | Power starts at 0 | Start 1 + math.max |
| Big and small match | Attribute not at spawn | Check 6.5 SetAttribute |
| Same after upgrade | addPower on client | Server Triggered |
| Crash on nil | No or default | GetAttribute(...) or 1 |
| Power gone after death | Attribute on Character | leaderstats on Player |
| Different sums in two places | Direct Coins.Value += | Remove giveCoins bypass |

Fastest diagnostic line:

\`print("[payout]", player.Name, "base", base, "power", power, "final", final)\`

If base is right and final is not, check Power. If base is always 1, check Attribute at spawn.

Do not keep two giveCoins copies in different Scripts. One Module or one server Script with the function.

Image: print is a flashlight at checkout; it shows where the multiplier vanished.

**Do now (4 min):** do one collect and match three numbers in Output with TAB.`,
      },
      {
        title: "Lesson 44 submit checklist",
        content: `- [ ] Power in leaderstats, start ≥ 1
- [ ] giveCoins multiplies base * Power with math.floor
- [ ] CoinValue Attribute is read on the server
- [ ] nil Attribute has a default
- [ ] There is a server way to +Power
- [ ] TAB or HUD shows Power
- [ ] print base / power / final on collect
- [ ] Playtest 1-2 and 6 are green
- [ ] No Coins.Value += outside giveCoins
- [ ] Save: Lesson 6.6 - Power Attributes

Short ritual: big at Power 1 → +Power → same big after respawn → Coins difference is obvious without a lecture.

In 6.7 this Power becomes a vault field. Do not move on until the multiplier is visible in TAB and Output.

The final Save locks the lever you can already use.

**Do now (3 min):** run the submit ritual and save the Place under the exact name.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Power changes only in a LocalScript",
      explanation: "The client can set any multiplier, and TAB and server will diverge.",
      correctApproach: "Keep Power in server leaderstats and change it through addPower on the server.",
    },
    {
      mistake: "Power starts at 0",
      explanation: "Formula base * Power zeroes all rewards and hides collect bugs.",
      correctApproach: "Start at 1 and protect with math.max(1, power) in giveCoins.",
    },
    {
      mistake: "GetAttribute(\"CoinValue\") with no default",
      explanation: "nil breaks multiplication or yields an unpredictable payout.",
      correctApproach: "Use or 1 or a fallback via CoinId and Config.",
    },
    {
      mistake: "Multiplication already in Config and again in giveCoins",
      explanation: "Double boost warps balance and TTG1 in later lessons.",
      correctApproach: "Config stores a clean base; Power applies only in giveCoins.",
    },
    {
      mistake: "Power saved as Attribute on Character",
      explanation: "After death or Character respawn the Character is new, and the multiplier vanishes.",
      correctApproach: "Keep IntValue Power in leaderstats on Player.",
    },
    {
      mistake: "No way to raise Power in Play",
      explanation: "Impossible to prove the multiplier effect to a mentor in one run.",
      correctApproach: "Add a server Prompt or Remote with +1 Power and compare two collects.",
    }
  ],
  summary: "You added CoinValue Attributes and Power in leaderstats: giveCoins multiplies base by player strength in one place. The multiplier shows in TAB and is ready for save, goals, and balance.",
  practiceTask: {
    title: "Strength multiplier (~30 min)",
    difficulty: "intermediate",
    description: `### Part A - Power stats (8 min)
1. Create IntValue Power = 1 in leaderstats.
2. Check TAB before the first collect.
3. Write addPower(player, delta) on the server.

### Part B - Formula and Attribute (14 min)
1. Read CoinValue on collect with a default.
2. Update giveCoins: final = math.floor(base * power).
3. Add print base / power / final.
4. Make an altar or +1 Power button.

### Part C - Proof (8 min)
1. Compare the same big coin at Power 1 and Power 2.
2. Confirm there is no direct Coins.Value += outside giveCoins.
3. Save the Place as **Lesson 6.6 - Power Attributes**.`,
    hints: [
      "Hardcode Power=2 for a test first, then wire the Prompt.",
      "math.floor keeps IntValue clean.",
      "If big and small match, first check SetAttribute in spawn from 6.5.",
      "Do not accept absolute Power from client FireServer without checks."
    ],
    optionalChallenge: "Add a short cooldown on addPower and text on the altar: \"Coin × Power = reward\".",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the main artifact of lesson 6.6?",
        options: [
          "Delete Config and leave only coin color",
          "Power in leaderstats and Attribute CoinValue that together change payout",
          "A new island without giveCoins",
          "A LocalScript that writes Coins itself"
        ],
        correctAnswer: 1,
        explanation: "The lesson joins item value and player strength in one checkout.",
      },
      {
        id: "q2",
        type: MC,
        question: "Where is best to keep Power for TAB and save?",
        options: [
          "IntValue in leaderstats on Player",
          "Only a variable in LocalScript",
          "Attribute only on Character",
          "In the Baseplate name"
        ],
        correctAnswer: 0,
        explanation: "leaderstats is stable across respawns and visible in TAB.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why GetAttribute(\"CoinValue\")?",
        options: [
          "To delete Humanoid",
          "To create a RemoteEvent",
          "To read the coin base value on the server",
          "To disable the HUD"
        ],
        correctAnswer: 2,
        explanation: "Attribute stores the item base for the reward formula.",
      },
      {
        id: "q4",
        type: MC,
        question: "Why should Power not start at 0?",
        options: [
          "Because IntValue bans 0",
          "Because TAB then runs faster",
          "Because the Attribute will disappear",
          "Because base * 0 zeroes all rewards"
        ],
        correctAnswer: 3,
        explanation: "Start 1 keeps base collect meaningful.",
      },
      {
        id: "q5",
        type: MC,
        question: "What is the typical formula in this lesson?",
        options: [
          "final is always 999999",
          "final = math.floor(base * Power)",
          "final = Power only, no base",
          "final is written by the client into a TextLabel"
        ],
        correctAnswer: 1,
        explanation: "One server formula multiplies clean base by strength.",
      },
      {
        id: "q6",
        type: MC,
        question: "What if CoinValue Attribute is missing?",
        options: [
          "Must crash the Script",
          "Delete the player",
          "Take a default or fallback via CoinId and Config",
          "Put Coins in the negative"
        ],
        correctAnswer: 2,
        explanation: "A default protects the checkout from nil.",
      },
      {
        id: "q7",
        type: MC,
        question: "Who should call addPower?",
        options: [
          "A server Prompt or Remote handler",
          "Any LocalScript with no check",
          "ParticleEmitter after burst",
          "A Sign with SurfaceGui by itself"
        ],
        correctAnswer: 0,
        explanation: "Strength changes only through server logic.",
      },
      {
        id: "q8",
        type: MC,
        question: "Why is Power on Character risky as the main source?",
        options: [
          "Character does not exist in Roblox",
          "Attribute on Character is always better than Value",
          "Character can vanish on respawn",
          "leaderstats are then banned"
        ],
        correctAnswer: 2,
        explanation: "Strength progress should live on Player.",
      },
      {
        id: "q9",
        type: MC,
        question: "How does 6.6 prepare 6.7?",
        options: [
          "DataStore bans saving Power",
          "You must delete Power before save",
          "Save must be client-only",
          "Power becomes a numeric payload field next to Coins"
        ],
        correctAnswer: 3,
        explanation: "The multiplier must survive rejoin in the next lesson.",
      },
      {
        id: "q10",
        type: MC,
        question: "What does double multiplication mean?",
        options: [
          "Config already includes Power, and giveCoins multiplies again",
          "Two coins on the scene",
          "Two TextLabels in the HUD",
          "Two SpawnPoints"
        ],
        correctAnswer: 0,
        explanation: "Base must be clean; the multiplier only in giveCoins.",
      },
      {
        id: "q11",
        type: MC,
        question: "What is the minimum multiplier proof for a mentor?",
        options: [
          "Explorer screenshot without Play",
          "The same collectable gives a larger payout after +Power",
          "A new Skybox",
          "Removing anti-double"
        ],
        correctAnswer: 1,
        explanation: "Before/after upgrade comparison shows a live formula.",
      },
      {
        id: "q12",
        type: MC,
        question: "What should the HUD do with Power?",
        options: [
          "Write any number from the client",
          "Replace giveCoins",
          "Read the server Value and display it",
          "Delete CoinValue Attribute"
        ],
        correctAnswer: 2,
        explanation: "HUD is a display, not the checkout.",
      },
      {
        id: "q13",
        type: MC,
        question: "Why print base, power, final?",
        options: [
          "To find faster exactly where the formula breaks",
          "To raise MaxHealth",
          "To disable DataStore",
          "To replace TAB"
        ],
        correctAnswer: 0,
        explanation: "Three numbers show the error source in seconds.",
      },
      {
        id: "q14",
        type: MC,
        question: "Exact Save name?",
        options: [
          "Lesson 6.7 - Sim DataStore",
          "Lesson 6.6 - Power Attributes",
          "Lesson 6.5 - Spawn Config",
          "Power Draft Final"
        ],
        correctAnswer: 1,
        explanation: "The checklist requires Lesson 6.6 - Power Attributes.",
      },
      {
        id: "q15",
        type: MC,
        question: "How will Power help in 6.9?",
        options: [
          "Balance can compare income at different strength values",
          "TTG1 is no longer needed",
          "Config value becomes unnecessary",
          "Anti-double can be turned off"
        ],
        correctAnswer: 0,
        explanation: "Different Power gives a measurable Coins/min and TTG difference.",
      }
    ],
  },
};

export const enLesson67 = {
  lessonId: "lesson-roblox-6-7",
  moduleId: "module-06",
  order: 7,
  title: "6.7 - Progress DataStore",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Create a versioned DataStore and a key based on UserId",
    "Load Coins and Power through pcall with type checks and defaults",
    "Save the server payload through UpdateAsync with no trust in the client",
    "Add PlayerRemoving, BindToClose, and moderate autosave with a dirty flag",
    "Run a rejoin test and prepare the data format for daily goals"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 45 of 92)",
        content: `In 6.6 you added Power and Attributes: within one session the player already collects Coins faster. Today progress survives leaving the game. You will save server Coins and Power, then prove the result with Stop - Play or rejoin.
In 6.8 the payload can gain activeId, progress, and completed daily goals. In 6.9 rejoin must not spoil economy measures, and in 6.10 stable restore becomes a Ship item.

| Was in 6.6 | Becomes in 6.7 |
|------------|----------------|
| Coins and Power live in the session | Values return after rejoin |
| Server computes reward | Server builds save payload |
| HUD shows current numbers | HUD shows loaded numbers |
| Exit zeroes progress | DataStore keeps state |

leaderstats is the desk; DataStore is the locked cabinet between shifts.

**Do now (3 min):** write two fields to save and their defaults: Coins = 0, Power = 1.`,
      },
      {
        title: "What DataStore does and does not do",
        content: `DataStoreService stores data across servers and sessions. It is not a Folder in Explorer and does not work like a local file. Calls can fail due to network, limits, or Studio settings, so every request is wrapped in pcall.

| System | Lives where | How long | Who changes |
|--------|-------------|----------|-------------|
| leaderstats | Current server | Until exit | Server |
| DataStore | Roblox backend | Between visits | Server Script |
| CoinsHUD | Client | Current screen | Display only |

Do not call DataStoreService from a LocalScript. The client must not know keys, build the final payload, or decide what to save.

For Studio tests you must publish the experience and enable **Enable Studio Access to API Services** in Game Settings - Security. Use a separate test Place or store so Studio does not corrupt live data.

Image: DataStore is like a remote vault; the server has the key, but the vault is sometimes temporarily unavailable.

**Do now (4 min):** check Publish and Studio Access, then note that you are not testing the production store.`,
      },
      {
        title: "Store version and stable key",
        content: `Create the DataStore once in a server Script:

\`local DataStoreService = game:GetService("DataStoreService")\`
\`local ProgressStore = DataStoreService:GetDataStore("SimProgress_v1")\`

The key must be stable and unique:
\`local key = "player_" .. player.UserId\`

| Key variant | Rating | Reason |
|-------------|--------|--------|
| player_123456 | Good | UserId does not change |
| DisplayName | Bad | Not unique and can change |
| One "global" | Dangerous | All players share one record |
| Random number | Unusable | Next load will not find the save |

The **_v1** suffix describes the format. If the structure later changes incompatibly, you can make v2 or a migration. Do not change the store name between Save and Load, or you get empty defaults while old data still exists.

Store name is the vault number; UserId is the personal locker number.

**Do now (3 min):** create ProgressStore and a function that returns the player_UserId key.`,
      },
      {
        title: "Payload format and data checks",
        content: `Store a small table of numbers, not Instances or the whole Character:

\`local payload = { version = 1, coins = coins.Value, power = power.Value }\`

After GetAsync, data may be nil for a new player or have an old format. Check types before writing to Value.

| Field | Default | Check |
|-------|---------|-------|
| version | 1 | number |
| coins | 0 | number, not less than 0 |
| power | 1 | number, not less than 1 |
| quest | later | table |

For example, \`local coins = type(data.coins) == "number" and math.max(0, data.coins) or 0\`. That normalization protects the Script from nil, a string instead of a number, or an old record.

Do not store UI text. GoalHUD in 6.8 can restore text from a goal id in Config. Data should describe state, not appearance.

payload is a suitcase for rejoin; take the numbers you need, do not pack the whole house.

**Do now (4 min):** create defaultData and a normalizeData function for coins and power.`,
      },
      {
        title: "Load through pcall without losing the old save",
        content: `GetAsync can fail. It is important to tell **a new player with no record** from a **load error**.

\`local ok, result = pcall(function() return ProgressStore:GetAsync(key) end)\`

| Result | Action |
|--------|--------|
| ok=true, result=nil | Use defaults, allow save |
| ok=true, result=table | Normalize, allow save |
| ok=false | Show warn, give temporary defaults, **do not overwrite the store** |

Keep \`sessionLoaded[player] = ok\`. If load failed, the player may continue the session on defaults, but this session's save must be blocked. Otherwise a temporary network error overwrites real Coins with zero.

After a successful load, set leaderstats, then mark the player ready. That way the HUD does not flash from 0 to the loaded number.

Image: if the vault did not open, do not dump its contents and do not put an empty box inside.

**Do now (7 min):** write loadPlayer with the three table branches and a separate sessionLoaded.`,
      },
      {
        title: "Save through UpdateAsync from server truth",
        content: `Save reads Coins and Power only from server Values. A RemoteEvent may request a save, but it does not pass arbitrary numbers.

\`local ok, err = pcall(function()\`
\`  ProgressStore:UpdateAsync(key, function(oldData)\`
\`    return { version = 1, coins = coins.Value, power = power.Value }\`
\`  end)\`
\`end)\`

UpdateAsync is better for safe updates when different server attempts may touch one key. The callback must not yield and must return the new payload.

Before the call, check:
1. sessionLoaded[player] == true;
2. leaderstats and the needed Values exist;
3. a save for this player is not already running.

The \`saving[player]\` flag protects against concurrent autosave and PlayerRemoving. After pcall, clear it even on error.

The server fills the receipt from its own checkout; it does not rewrite a number from a client note.

**Do now (7 min):** write savePlayer, add sessionLoaded and saving guards, and one clear warn.`,
      },
      {
        title: "Dirty flag and moderate autosave",
        content: `Do not call UpdateAsync on every giveCoins. DataStore has request budgets, and frequent writes create extra load. For the lesson, autosave every 60-120 seconds is enough.

| Event | Action |
|-------|--------|
| Coins or Power changed | dirty[player] = true |
| Autosave interval passed | Save only dirty and loaded |
| Save succeeded | dirty[player] = false |
| Save failed | dirty stays true for the next try |
| No changes | Do not spend a request |

The autosave loop runs on the server and walks Players:GetPlayers(). Do not set interval to 1 second for "reliability". Reliability comes from several checkpoints, not API spam.

If data changes during save, a simple dirty flag may need care: clear dirty only after a successful write and capture the payload that was sent. For a teaching MVP, not running parallel saves is enough.

autosave is a regular progress photo, not a video of every frame.

**Do now (5 min):** mark dirty after successful giveCoins and add a 60 s autosave interval.`,
      },
      {
        title: "PlayerRemoving and BindToClose",
        content: `Autosave does not guarantee the last seconds of a session. Add two checkpoints:

| Event | Why |
|-------|-----|
| Players.PlayerRemoving | Player leaves the server |
| game:BindToClose | Server or Studio is shutting down |

In PlayerRemoving call savePlayer if sessionLoaded. In BindToClose walk current players and save them. Do not wait forever: shutdown has a limited time.

In Studio, Stop may fire PlayerRemoving and BindToClose close together. The saving flag stops two writes from running in parallel. Do not clear questState or sessionLoaded before the save attempt finishes.

BindToClose does not replace PlayerRemoving, and PlayerRemoving does not replace autosave. Together they cover different scenarios.

autosave is a scheduled flight; PlayerRemoving is the last bus; BindToClose is building evacuation.

**Do now (5 min):** wire both events and check in Output that Stop does not start an endless save loop.`,
      },
      {
        title: "Server vs client",
        content: `The course rule does not change: the client shows; the server decides.

| Client may | Server must |
|------------|-------------|
| Show "Saving..." | Choose the payload |
| Request SaveNow | Ignore numbers from arguments |
| Show "Saved" after confirmation | Call UpdateAsync |
| Try to send 999999 | Take Coins from server leaderstats |

Unsafe design: \`SaveRemote.OnServerEvent(player, clientCoins)\` and writing clientCoins to the store. Correct design: Remote may only place a request, and savePlayer itself reads server Values.

Do not show "Saved!" before a successful pcall. On error the UI may show "Save pending" or nothing; Output should have a short warn without private data.

Image: the client presses the doorbell, but only the server opens the vault.

**Do now (3 min):** find all RemoteEvents related to save and confirm their numeric payloads do not enter the DataStore.`,
      },
      {
        title: "Rejoin test with evidence",
        content: `DataStore is not submitted until there is a rejoin with restored numbers. Write expectations before Play.

| # | Action | Expectation | Fact |
|---|--------|-------------|------|
| 1 | Join new test | Coins 0, Power 1 | |
| 2 | Get 25 Coins / Power 2 | Server Values changed | |
| 3 | Wait for autosave or Leave | Save success | |
| 4 | Rejoin same UserId | Coins 25, Power 2 | |
| 5 | Other UserId | Own defaults | |
| 6 | Load fail | Game alive, save blocked | |
| 7 | Output | Clear warns without spam | |

Test on a published test Place with API Access allowed. Stop - Play in Studio can be enough for teaching proof if it uses the same account and store.

Do not change the store name between runs 3 and 4. If restore failed, check key, store name, sessionLoaded, and Output.

rejoin is a control opening of the vault, not faith in a green print after Save.

**Do now (8 min):** run rows 1-4 and write exact numbers in Fact.`,
      },
      {
        title: "API errors and clear Output",
        content: `pcall does not make the request succeed; it only stops the error from breaking the Script. After pcall always check ok.

| Symptom | Likely cause | Next step |
|---------|--------------|-----------|
| 403 in Studio | API Access off | Check Game Settings |
| Always defaults | Different store/key or load fail | Print key and a short warn |
| Save success, restore old | Parallel write / other version | Check UpdateAsync and store |
| Many warnings | Autosave too frequent | Raise interval, dirty |
| Zeros after load fail | Default overwrote save | Block save via sessionLoaded |

Do not print the whole payload every second. For debug, UserId, operation type, and error message are enough. After the fix, remove noisy prints.

Image: Output is the cashier journal; a short entry helps; a hundred identical lines hide the problem.

**Do now (4 min):** model one controlled fail or read an existing warn and write the cause.`,
      },
      {
        title: "Format for daily goals",
        content: `In 6.8 you can add to the payload:

\`quest = { activeId = "coins50", progress = 0, completed = {} }\`

Today you do not need to implement DailyGoals. You only need not to lock the format to two separate numbers with no room to grow.

| Field today | Field tomorrow |
|-------------|----------------|
| coins | quest.activeId |
| power | quest.progress |
| version | quest.completed |

On load of old v1 without quest, use a default quest. Do not assume every record already has the new field. This is a simple migration: a missing field gets a default; existing Coins and Power are kept.

Do not write the goals Config table into the save. Config is the same for everyone; DataStore stores only that player's state.

Payload format is a shelf with free space for the next box.

**Do now (3 min):** add a comment with the future quest field and confirm normalizeData survives its absence.`,
      },
      {
        title: "Lesson 45 submit checklist",
        content: `Before Save check:

- [ ] Store is named SimProgress_v1.
- [ ] Key contains a stable UserId.
- [ ] GetAsync and UpdateAsync are wrapped in pcall.
- [ ] Payload contains version, coins, and power.
- [ ] Data is normalized before leaderstats.
- [ ] Load fail does not let defaults overwrite a real save.
- [ ] Save reads only server Values.
- [ ] dirty + autosave do not write on every collect.
- [ ] PlayerRemoving and BindToClose are wired.
- [ ] Rejoin restored exact test Coins and Power.
- [ ] Output is clean or has a clear controlled warn.
- [ ] Save: Lesson 6.7 - Sim DataStore.

In 6.8 you will add daily goals as server state; part of quest can go into this payload. Do not expand the system now until basic Coins and Power restore is green.

The final Place Save locks not a promise, but a verified data path out and back.

**Do now (3 min):** show the mentor numbers before exit and after rejoin, then save the Place under the exact name.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "GetAsync or UpdateAsync called without pcall",
      explanation: "A temporary API error stops the server Script and leaves the player without a correct state.",
      correctApproach: "Wrap every DataStore request in pcall, check ok, and write a short warn.",
    },
    {
      mistake: "After load fail, default zeros are saved immediately",
      explanation: "A temporary network error can overwrite real player progress with an empty payload.",
      correctApproach: "Block save for this session if the initial load did not succeed.",
    },
    {
      mistake: "Save accepts Coins from a client RemoteEvent",
      explanation: "The client can send any number and lock a cheat into DataStore.",
      correctApproach: "Build the payload only from server leaderstats and Attributes.",
    },
    {
      mistake: "UpdateAsync runs after every giveCoins",
      explanation: "Requests spend the DataStore budget, create load, and may fail more often.",
      correctApproach: "Mark dirty and save via moderate autosave, PlayerRemoving, and BindToClose.",
    },
    {
      mistake: "All players use one key or DisplayName",
      explanation: "Records mix, and DisplayName is not a stable unique id.",
      correctApproach: "Build the key from stable player.UserId.",
    },
    {
      mistake: "Autosave and PlayerRemoving write the same key at once",
      explanation: "Parallel writes can conflict or spend extra requests.",
      correctApproach: "Use a saving flag and UpdateAsync; do not start a second save before the first finishes.",
    }
  ],
  summary: "You built a safe DataStore for Coins and Power: load/save through pcall, UpdateAsync, autosave, and protection against overwrite after load fail. Rejoin now returns server progress and prepares the payload for daily goals.",
  practiceTask: {
    title: "Simulator progress vault (~30 min)",
    difficulty: "intermediate",
    description: `### Part A - Store and load (10 min)
1. Create SimProgress_v1 and key player_UserId.
2. Write defaultData and normalizeData.
3. GetAsync through pcall; tell nil from load fail.
4. Set Coins and Power in server leaderstats.

### Part B - Save and checkpoints (12 min)
1. Build payload from server Values.
2. UpdateAsync through pcall with sessionLoaded and saving guards.
3. Add dirty, autosave 60-120 s, PlayerRemoving, and BindToClose.
4. Do not accept numeric save data from the client.

### Part C - Rejoin (8 min)
1. Get 25 Coins and Power 2.
2. Leave/Stop, then Rejoin/Play with the same UserId.
3. Record restored numbers and save the Place as **Lesson 6.7 - Sim DataStore**.`,
    hints: [
      "If load failed, do not save defaults over unknown old data.",
      "Check store name and key in both functions.",
      "Do not set autosave to every second or every collectable.",
      "Studio needs Publish and Enable Studio Access to API Services."
    ],
    optionalChallenge: "Add a saveRevision counter in the payload and show in Output which successful version restored after rejoin.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the main artifact of lesson 6.7?",
        options: [
          "A HUD that invents saved Coins locally",
          "A new island with no server state",
          "DataStore load/save of Coins and Power with successful rejoin",
          "SetAsync after every touch"
        ],
        correctAnswer: 2,
        explanation: "The artifact must prove restore of server progress across sessions.",
      },
      {
        id: "q2",
        type: MC,
        question: "Which key fits best for a player save?",
        options: [
          "\"player_\" .. player.UserId",
          "One global key for everyone",
          "DisplayName without UserId",
          "A new random number on every join"
        ],
        correctAnswer: 0,
        explanation: "UserId is stable and unique.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why pcall around GetAsync and UpdateAsync?",
        options: [
          "To auto-increase Coins",
          "To bypass all DataStore budgets",
          "So the client gets store access",
          "To catch an API error and not break the Script"
        ],
        correctAnswer: 3,
        explanation: "DataStore requests can end in errors.",
      },
      {
        id: "q4",
        type: MC,
        question: "What if the initial GetAsync returned an error?",
        options: [
          "Immediately save default zeros",
          "Give temporary defaults, but block save for this session",
          "Trust save to the client",
          "Delete DataStore"
        ],
        correctAnswer: 1,
        explanation: "That way real data will not be overwritten after a temporary load fail.",
      },
      {
        id: "q5",
        type: MC,
        question: "Where should savePlayer take Coins from?",
        options: [
          "From a FireServer argument",
          "From the collectable name",
          "From CoinsHUD text",
          "From server leaderstats.Coins.Value"
        ],
        correctAnswer: 3,
        explanation: "Server state is the source of truth.",
      },
      {
        id: "q6",
        type: MC,
        question: "Why the _v1 suffix in the store name?",
        options: [
          "It auto-creates Power",
          "Without it UserId does not work",
          "To mark the format and prepare a future migration",
          "It replaces pcall"
        ],
        correctAnswer: 2,
        explanation: "Version helps manage data structure changes.",
      },
      {
        id: "q7",
        type: MC,
        question: "Why not save after every giveCoins?",
        options: [
          "Because it spends the request budget and creates load",
          "Because Coins would become a string",
          "Because UpdateAsync is allowed only once",
          "Because leaderstats then vanishes"
        ],
        correctAnswer: 0,
        explanation: "Dirty and autosave give reliability without API spam.",
      },
      {
        id: "q8",
        type: MC,
        question: "When should dirty be cleared to false?",
        options: [
          "Before every save starts",
          "Right after Coins change",
          "After successful save of the matching payload",
          "After any API error"
        ],
        correctAnswer: 2,
        explanation: "After fail, changes still need another try.",
      },
      {
        id: "q9",
        type: MC,
        question: "Why saving[player]?",
        options: [
          "So LocalScript can change the payload",
          "So autosave and PlayerRemoving do not write one key in parallel",
          "To disable BindToClose",
          "To replace the DataStore key"
        ],
        correctAnswer: 1,
        explanation: "The flag blocks concurrent saves of one session.",
      },
      {
        id: "q10",
        type: MC,
        question: "What does the main rejoin test check?",
        options: [
          "Whether HUD color was saved",
          "Whether LocalScript fired a RemoteEvent",
          "Whether DisplayName changed",
          "Whether the same Coins and Power restored after rejoin"
        ],
        correctAnswer: 3,
        explanation: "Restored server numbers are proof that DataStore works.",
      },
      {
        id: "q11",
        type: MC,
        question: "What is needed for a DataStore test in Studio?",
        options: [
          "Publish the experience and enable Studio Access to API Services",
          "Move the Script into StarterGui",
          "Delete Baseplate",
          "Save only from LocalScript"
        ],
        correctAnswer: 0,
        explanation: "Studio needs API access for this kind of test.",
      },
      {
        id: "q12",
        type: MC,
        question: "Which statement about the UpdateAsync callback is correct?",
        options: [
          "It must get numbers from the client",
          "It returns a new table and must not yield",
          "It may not return a payload",
          "It must wait with task.wait inside"
        ],
        correctAnswer: 1,
        explanation: "The callback builds the new key value synchronously.",
      },
      {
        id: "q13",
        type: MC,
        question: "Why normalize loaded data?",
        options: [
          "To disable the store version",
          "So the client can pick any Power",
          "So nil or a wrong type does not break leaderstats",
          "To save the whole Character"
        ],
        correctAnswer: 2,
        explanation: "Type checks give safe numbers and defaults.",
      },
      {
        id: "q14",
        type: MC,
        question: "What belongs in the payload in 6.8?",
        options: [
          "activeId, progress, and completed goals",
          "The entire Workspace",
          "Client-side passwords",
          "A copy of DailyGoals Config for every player"
        ],
        correctAnswer: 0,
        explanation: "DataStore stores individual goal state, not shared Config.",
      },
      {
        id: "q15",
        type: MC,
        question: "What is the exact Save name for lesson 45?",
        options: [
          "Lesson 6.8 - Daily Goals",
          "Simulator Save Final Copy",
          "Lesson 6.6 - Power Attributes",
          "Lesson 6.7 - Sim DataStore"
        ],
        correctAnswer: 3,
        explanation: "The checklist requires Save Lesson 6.7 - Sim DataStore.",
      }
    ],
  },
};

export const enLesson68 = {
  lessonId: "lesson-roblox-6-8",
  moduleId: "module-06",
  order: 8,
  title: "6.8 - Daily goals with a table",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Describe 1-2 daily goals in a DailyGoals table with need, text, and reward",
    "Track activeId, progress, and completed on the server from real giveCoins",
    "Show GoalHUD with text and an X / N counter from one source of truth",
    "Run completeGoal once without a repeat reward",
    "Prepare a measurable goal for TTG1 in 6.9 and the Ship demo in 6.10"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 46 of 92)",
        content: `In 6.7 you learned to keep Simulator progress between sessions. Today collecting gets a direction: the player sees a concrete daily goal and understands why to run between collectables. Without this, 6.9 has no TTG1, and Ship in 6.10 looks like aimless collecting.
| Was in 6.7 | Becomes in 6.8 |
|------------|----------------|
| Coins between sessions | Why collect right now |
| giveCoins as the cashier | Source of goal progress |
| Score HUD | Separate GoalHUD for the mission |
| DataStore payload | Room for activeId / completed later |

Coins are steps, and the daily goal is the arrow on the map.

**Do now (3 min):** write one goal in words, for example "Collect 50 Coins", and separately write its reward.`,
      },
      {
        title: "Why goals live in a table",
        content: `A single \`if progress >= 50\` in a Script quickly becomes chaos: UI text, need, and reward drift apart. A table keeps the mission menu in one place.

\`local DailyGoals = {\`
\`  coins50 = { need = 50, rewardCoins = 20, rewardPower = 0, text = "Collect 50 coins" },\`
\`  coins100 = { need = 100, rewardCoins = 0, rewardPower = 1, text = "Collect 100 coins" },\`
\`}\`

| Approach | Plus | Minus |
|----------|------|-------|
| Hardcoded if | Fast for one goal | A new mission means new code |
| DailyGoals table | need/text/reward together | You must look up by id |
| UI text only | Looks fine | Server does not know the threshold |

For submission, one active goal is enough. You can leave a second row in the table "for tomorrow" or for optionalChallenge.

Image: the table is the day's mission schedule, not a random sticker on the screen.

**Do now (4 min):** create a ModuleScript or DailyGoals block with two entries and set activeId = "coins50".`,
      },
      {
        title: "questState belongs on the server",
        content: `Goal progress is valuable, like Coins. The client can show numbers, but it must not decide that the mission is already done.

\`questState[player] = {\`
\`  activeId = "coins50",\`
\`  progress = 0,\`
\`  completed = {},\`
\`}\`

An alternative is Folder Values on Player. The key point: the write happens from a server Script after validation.

| Field | Role |
|-------|------|
| activeId | Which goal is open now |
| progress | Current number in the scheme's units |
| completed[id] | Whether the reward for id was already given |

Create state in PlayerAdded. Clear it in PlayerRemoving so the table does not grow forever during Studio tests.

questState is the completion log, and GoalHUD is only its display.

**Do now (5 min):** initialize questState for a test player and \`print\` activeId with progress on Join.`,
      },
      {
        title: "One progress scheme",
        content: `Before you wire giveCoins, choose a number language and do not mix it.

| Scheme | How progress grows | How to read need |
|--------|--------------------|------------------|
| A - Coins sum | \`progress += amount\` | need = how many coins to collect |
| B - collect counts | \`progress += 1\` | need = how many successful collects |

Both schemes are valid. It is bad when the UI says "collect 50 coins" but the code adds 1 per touch with need = 50 under the count scheme with no explanation. Write the scheme in a comment next to DailyGoals.

After a successful giveCoins:

\`local st = questState[player]\`
\`local goal = DailyGoals[st.activeId]\`
\`if goal and not st.completed[st.activeId] then\`
\`  st.progress += amount\`
\`  if st.progress >= goal.need then\`
\`    completeGoal(player, st.activeId)\`
\`  end\`
\`  pushGoalUI(player)\`
\`end\`

Use \`>=\`, not only \`>\`. Otherwise the exact need never fires on equality.

**Do now (4 min):** choose scheme A or B and label need so the text and the number mean the same thing.`,
      },
      {
        title: "completeGoal exactly once",
        content: `Complete is an event with a reward. Without a completed flag, every later giveCoins past the threshold pays reward again and breaks the 6.9 balance.

\`local function completeGoal(player, goalId)\`
\`  local st = questState[player]\`
\`  if st.completed[goalId] then return end\`
\`  local goal = DailyGoals[goalId]\`
\`  if not goal then return end\`
\`  st.completed[goalId] = true\`
\`  if goal.rewardCoins > 0 then giveCoins(player, goal.rewardCoins) end\`
\`  if goal.rewardPower > 0 then addPower(player, goal.rewardPower) end\`
\`end\`

Order matters: set \`completed[goalId] = true\` first, then give the reward. If reward goes through giveCoins, that call can enter progress again. Protection options:
1. do not add rewardCoins to the active goal's progress;
2. a temporary \`st.locking = true\` flag around reward.

| Step | Action |
|------|--------|
| 1 | Check completed |
| 2 | Mark completed |
| 3 | Give reward |
| 4 | Update UI / FireClient |

complete is a stamp in the log, not a button you can press every second.

**Do now (6 min):** temporarily set need = 5, prove one complete and no second reward.`,
      },
      {
        title: "GoalHUD reads server truth",
        content: `StarterGui \`GoalHud\` with two TextLabels is enough: GoalText and GoalProgress. You do not have to draw a bar.

Two working channels:
1. RemoteEvent: the server sends \`{ text, progress, need, done }\`.
2. Values on Player: IntValue Progress / Need + StringValue Text, LocalScript listens to Changed.

Take text from \`DailyGoals[id].text\`. Do not hardcode "Collect 50" in the UI if Config.need is already 80 - otherwise the player and the server live in different worlds.

| State | What the player sees |
|-------|----------------------|
| Start | Goal text + 0 / need |
| Collect | X / N grows |
| Complete | "Done!" or the next goal |
| After threshold | No repeat reward spam |

Before you subscribe, call the first render right after Join, or the screen stays empty until the first collect.

Image: GoalHUD is the match board that repeats the referee's score, not invents its own.

**Do now (8 min):** make a \`0 / need\` line and check growth after two successful collects.`,
      },
      {
        title: "A goal chain or one mission",
        content: `For Ship, one goal for the demo is enough. If you want a chain, keep order separate from the dictionary:

\`local GoalOrder = { "coins50", "coins100" }\`

After complete:
\`local nextId = GoalOrder[index + 1]\`
\`if nextId and DailyGoals[nextId] then\`
\`  st.activeId = nextId\`
\`  st.progress = 0\`
\`end\`

Always check that the id exists in DailyGoals. A fake next key gives a silent nil and a "dead" UI.

| Option | When to choose |
|--------|----------------|
| One goal | Fast submission and a clean TTG1 |
| Two goals with switching | optionalChallenge |
| Many branches | Later, not today |

Do not build a tree of ten missions until one passes playtest.

One clean finish flag is better than a maze of arrows with no finish.

**Do now (5 min):** either close one goal end-to-end, or add a second with explicit switching.`,
      },
      {
        title: "Link to Power, giveCoins, and DataStore",
        content: `Goals do not replace the economy - they use it.

| System | Role for goals |
|--------|----------------|
| giveCoins | Single source of progress |
| Power | A larger amount closes scheme A faster |
| Collect anti-dupe | Otherwise progress lies |
| DataStore 6.7 | Can store activeId, progress, completed |
| CoinsHUD | Shows currency; GoalHUD shows the mission |

If save is still unstable, goals may reset on rejoin. That is fine for learning, but note it. Within a session, complete must still work honestly.

Do not store only the UI string. Store ids and numbers. Text can always come from DailyGoals after load.

**Do now (3 min):** confirm a rejected repeat touch does not move progress.`,
      },
      {
        title: "Onboarding and visibility",
        content: `Near Spawn, place a short sign: "Look at the goal at the top. Collect coins until the counter reaches N". If GoalHUD is covered by another Gui or sits off-screen in a small Studio window, the player will not understand the mission even with perfect code.

| Check | Expectation |
|-------|-------------|
| Join | Goal visible without TAB |
| Collect | X / N changes |
| Complete | Short "Done!" signal |
| Phone / narrow window | Text is not fully clipped |

Cheap polish: for a second, change the text color to green after complete. That does not replace the reward, but it makes the event noticeable before VFX in 6.9.

Image: onboarding is the sign at the park entrance, not a 20-line instruction sheet.

**Do now (3 min):** step back from the monitor and check whether the goal is readable from Spawn in 5 seconds.`,
      },
      {
        title: "Goal playtest table",
        content: `Fill in facts before you change dozens of need values.

| # | Action | Expectation | Fact |
|---|--------|-------------|------|
| 1 | Join | Text + 0 / need | |
| 2 | One collect | progress + by scheme | |
| 3 | Reach need | complete once | |
| 4 | Another collect | no repeat reward | |
| 5 | UI | text and need from DailyGoals | |
| 6 | need = 5 test | fast complete | |
| 7 | Restore need | value for 6.9 | |
| 8 | Output | no red errors | |

Rows 3-4 are critical. If they are red, do not measure TTG1 in 6.9: you would be balancing a broken reward.

The table is the stopwatch before the race, not a memory after the finish.

**Do now (6 min):** walk rows 1-4 and set statuses.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "progress and completed are tracked only in LocalScript",
      explanation: "The client can fake completion and take a reward without a real collect.",
      correctApproach: "Keep questState on the server and update it after giveCoins.",
    },
    {
      mistake: "No completed flag, so reward pours out after every collect past the threshold",
      explanation: "The economy explodes, and TTG1 and balance in 6.9 become a lie.",
      correctApproach: "Set completed[id] = true before giving the reward and check the flag every time.",
    },
    {
      mistake: "UI shows old text when DailyGoals has a new need",
      explanation: "The player does not know when the goal ends and thinks the server is broken.",
      correctApproach: "Take text and need from the same DailyGoals entry.",
    },
    {
      mistake: "progress counts items, but text and need talk about Coins sum",
      explanation: "The goal finishes too early or never reaches the threshold.",
      correctApproach: "Choose one scheme A or B and align the UI with it.",
    },
    {
      mistake: "rewardCoins through giveCoins pumps the same goal's progress again",
      explanation: "You get an instant complete chain or a double economy.",
      correctApproach: "Do not add reward to the active goal's progress, or set locking during the reward.",
    },
    {
      mistake: "The goal works, but GoalHUD is missing or hidden",
      explanation: "The player sees no direction, so the demo and TTG1 lose meaning.",
      correctApproach: "Show visible text + X / N right after Join.",
    }
  ],
  summary: "You built daily goals with a DailyGoals table: server progress from giveCoins, one-time complete, and GoalHUD X / N. The Simulator has direction before balance and Ship.",
  practiceTask: {
    title: "Daily mission with a table (~30 min)",
    difficulty: "intermediate",
    description: `### Part A - Config and state (8 min)
1. Create DailyGoals with 1-2 entries: need, text, rewardCoins or rewardPower.
2. Initialize questState[player] with activeId, progress, completed.
3. Choose progress scheme A or B and write it in a comment.

### Part B - Complete and UI (14 min)
1. After a successful giveCoins, update progress.
2. If progress >= need and not yet completed - completeGoal once.
3. Build GoalHUD: text from Config + X / N.
4. Protect reward from feeding the same goal's progress again.

### Part C - Test (8 min)
1. Temporarily set need = 5 and verify one-time complete.
2. Restore need for a 1-3 minute play session.
3. Save the Place as **Lesson 6.8 - Daily Goals**.`,
    hints: [
      "First print progress on every successful collect.",
      "Set completed before calling reward.",
      "Take goal text only from DailyGoals[id].text.",
      "A rejected repeat touch must not move progress."
    ],
    optionalChallenge: "After complete, automatically activate the second goal from GoalOrder and reset progress to 0.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the main artifact of lesson 6.8?",
        options: [
          "Remove giveCoins and leave only UI",
          "DailyGoals table, server progress, GoalHUD, and one-time complete",
          "A new island with no goals",
          "Only a ParticleEmitter on Spawn"
        ],
        correctAnswer: 1,
        explanation: "The lesson adds the daily mission as data and server logic.",
      },
      {
        id: "q2",
        type: MC,
        question: "Where should goal progress live?",
        options: [
          "On the server in the player's questState",
          "Only in LocalScript as the single source of truth",
          "In the collectable name",
          "In SoundService"
        ],
        correctAnswer: 0,
        explanation: "Progress and reward belong on the server.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why does DailyGoals have a need field?",
        options: [
          "To replace CoinsHUD",
          "To disable Power",
          "To set the completion threshold from one place",
          "To create Terrain"
        ],
        correctAnswer: 2,
        explanation: "need is the complete threshold for the chosen scheme.",
      },
      {
        id: "q4",
        type: MC,
        question: "Why completed[id]?",
        options: [
          "To increase the coin size",
          "To delete Config after Join",
          "So GoalHUD can write Coins",
          "So the goal reward is not given again"
        ],
        correctAnswer: 3,
        explanation: "The flag blocks a repeat reward after the threshold.",
      },
      {
        id: "q5",
        type: MC,
        question: "Where should GoalHUD get the goal text?",
        options: [
          "From a random string every second",
          "From DailyGoals[id].text",
          "From the Baseplate name",
          "Text is not needed if you have Coins"
        ],
        correctAnswer: 1,
        explanation: "UI reads data from the same table.",
      },
      {
        id: "q6",
        type: MC,
        question: "When should you call completeGoal?",
        options: [
          "On every local Touched",
          "Once a minute regardless of collecting",
          "When progress >= need and the goal is not yet completed",
          "Only after Stop Play"
        ],
        correctAnswer: 2,
        explanation: "Complete is tied to the threshold and one-time behavior.",
      },
      {
        id: "q7",
        type: MC,
        question: "Why does one progress scheme matter?",
        options: [
          "So need, text, and UI speak the same language",
          "Because Lua forbids two variables",
          "To disable DataStore",
          "So Mouth works in Tycoon"
        ],
        correctAnswer: 0,
        explanation: "Mixed units break the complete moment.",
      },
      {
        id: "q8",
        type: MC,
        question: "What is the risk of rewardCoins through giveCoins with no protection?",
        options: [
          "GoalHUD will always disappear",
          "Reward can increase the same goal's progress again",
          "Power will always become 0",
          "Config cannot be required"
        ],
        correctAnswer: 1,
        explanation: "You need a lock or exclude reward from progress.",
      },
      {
        id: "q9",
        type: MC,
        question: "How does 6.8 prepare 6.9?",
        options: [
          "6.9 deletes all goals before balance",
          "Juice replaces questState",
          "TTG1 measures time to complete the daily goal",
          "Balance no longer needs need"
        ],
        correctAnswer: 2,
        explanation: "Without a working goal there is no TTG1 metric.",
      },
      {
        id: "q10",
        type: MC,
        question: "What should GoalProgress show?",
        options: [
          "Only the player name",
          "A list of all Scripts",
          "Volume of the active Sound",
          "Current progress and need in X / N format"
        ],
        correctAnswer: 3,
        explanation: "The player sees the distance to complete.",
      },
      {
        id: "q11",
        type: MC,
        question: "What should you do with an unknown goal id?",
        options: [
          "Check it exists in DailyGoals and do not run complete",
          "Always give a large pack of Coins",
          "Delete leaderstats",
          "Move progress into LocalScript"
        ],
        correctAnswer: 0,
        explanation: "Validating id protects against nil and fake rewards.",
      },
      {
        id: "q12",
        type: MC,
        question: "Why must progress not update from a rejected touch?",
        options: [
          "Because then Config becomes read-only",
          "Because anti-dupe and the cashier must define real success",
          "Because GoalHUD cannot handle numbers",
          "Because need then becomes a string"
        ],
        correctAnswer: 1,
        explanation: "Only a confirmed giveCoins feeds the goal.",
      },
      {
        id: "q13",
        type: MC,
        question: "What minimum is enough to pass 6.8?",
        options: [
          "Required: 20 different goals",
          "Only an empty table with no UI",
          "One working goal with UI and one-time complete",
          "A goal with no need, only text"
        ],
        correctAnswer: 2,
        explanation: "One honest daily mission matters more than a large menu.",
      },
      {
        id: "q14",
        type: MC,
        question: "Exact Save name?",
        options: [
          "Lesson 6.9 - Sim Balance Juice",
          "Lesson 6.8 - Daily Goals",
          "Lesson 6.10 - Sim Ship",
          "Goals Draft Final"
        ],
        correctAnswer: 1,
        explanation: "The checklist requires Lesson 6.8 - Daily Goals.",
      },
      {
        id: "q15",
        type: MC,
        question: "How do goals help Ship in 6.10?",
        options: [
          "Ship forbids GoalHUD",
          "Goals replace collectables",
          "Without goals, giveCoins is technically impossible",
          "The demo gets a direction: collect → progress → complete"
        ],
        correctAnswer: 3,
        explanation: "A short demo needs a clear mission.",
      }
    ],
  },
};

export const enLesson69 = {
  lessonId: "lesson-roblox-6-9",
  moduleId: "module-06",
  order: 9,
  title: "6.9 - Playtest economy + VFX",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Measure Coins per minute and time to the first Simulator goal",
    "Make controlled balance changes through a single Config",
    "Check how Power, anti-dupe, HUD, and DataStore affect test results",
    "Add a short Sound and ParticleEmitter after a confirmed reward",
    "Prepare an evidence table and a stable Save before the final Ship Sim"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 47 of 92)",
        content: `In 6.8 you added daily goals with a table: the player already sees how much to collect and when the task is done. Today you check whether that goal is reachable, whether Power is actually useful, and whether the reward feels good. In 6.10 this Simulator faces the final Ship rubric, so you need numbers and facts, not a "seems fine" impression.
| Input | Lesson result |
|-------|---------------|
| Daily goal from 6.8 | Known real time to complete |
| Reward and spawn Config | Verified values without magic numbers |
| Power | Measured income difference |
| Server giveCoins | Honest signal for VFX |

Today you are not painting the scales; you are checking whether they weigh correctly.

**Do now (3 min):** write down BaseReward, GoalNeed, SpawnCount, RespawnSeconds, and your Power value.`,
      },
      {
        title: "Balance is the pace of player decisions",
        content: `Simulator balance does not mean making everything more expensive. The player should quickly understand the loop, get a first result, and see a reason to continue. If the first goal finishes in ten seconds, Power never becomes desirable. If it needs fifteen minutes of the same touches, the demo feels empty.

| State | Sign | What to check |
|-------|------|---------------|
| Too fast | Goal complete after 1-2 collects | GoalNeed, BaseReward |
| Too slow | After a minute, progress barely moves | Reward, SpawnCount, path |
| Power not felt | Income almost the same | Multiplier and formula |
| Chaotic | Two runs differ by large multiples | Anti-dupe and spawn |
| Comfortable | First goal in about 60-180 s | Lock the numbers |

The 60-180 second target is for a learning artifact, not for every commercial game. It lets you see progress, complete, and feedback in a short playtest.

Balance sets the rhythm in which the player has time to understand the loop.

**Do now (3 min):** predict TTG1 with GoalNeed / expected Coins per second, then check the prediction by playing.`,
      },
      {
        title: "Metrics you can repeat",
        content: `For this lesson, three main metrics are enough. **Coins/min** shows income pace over 60 seconds. **TTG1** is time from Spawn to finishing the first goal. **Power ratio** compares income at Power 1 and a higher Power for the same duration.

| Metric | Start | Stop | Record |
|--------|-------|------|--------|
| Coins/min | First controlled action | 60 seconds | Coins difference |
| TTG1 | Spawn or 0 progress | goal complete | Seconds |
| Power ratio | Same scene | 30 seconds | Coins Power 2 / Coins Power 1 |
| Duplicate rate | First touch of one Part | 2 seconds of spam | Payout count |

Do not compare one run on an empty server with another where you hunted a collectable for twenty seconds. Start from the same Spawn, use the same route, and do not change two conditions at once.

For diagnosis you can temporarily add \`print("reward", reward, os.clock())\` on the server reward path. Before submission, remove noisy prints or keep only useful warnings.

Without numbers, playtest turns into an argument about taste.

**Do now (5 min):** run a baseline 60-second pass and record starting Coins, final Coins, and how many Parts you collected.`,
      },
      {
        title: "Economy playtest table",
        content: `Create the table before you change Config. The "Expectation" column locks the hypothesis, "Fact" is the measurement, and "Verdict" keeps a failed result from being hidden.

| # | Scenario | Expectation | Fact | Verdict |
|---|----------|-------------|------|---------|
| 1 | 60 s at Power 1 | Stable Coins/min | | |
| 2 | First goal | TTG1 60-180 s | | |
| 3 | 30 s at Power 1 | Baseline income | | |
| 4 | 30 s at Power 2 | Clearly higher income | | |
| 5 | Spam one collectable | One payout | | |
| 6 | TAB vs HUD | Same values | | |
| 7 | Goal complete | One complete | | |
| 8 | Rejoin | Expected restore | | |
| 9 | 20 collects with VFX | No junk or errors | | |

Use verdicts **ok**, **slow**, **fast**, **broken**. Broken beats balance: if one coin pays three times, Coins/min does not describe the real economy.

The table records the match so you can review it tomorrow.

**Do now (4 min):** fill expectations in all nine rows without peeking at the future fact.`,
      },
      {
        title: "One change, one conclusion",
        content: `After the baseline run, pick one cause of bad pace. Change one Config field, repeat the same scenario, and record the result. If you change Reward, GoalNeed, SpawnCount, and Power at once, you will not know what helped.

| Was | Change | Became | Conclusion |
|-----|--------|--------|------------|
| Reward 1, TTG1 420 s | Reward 1 -> 3 | TTG1 165 s | Reward was too small |
| GoalNeed 100, TTG1 165 s | GoalNeed 100 -> 75 | TTG1 118 s | Goal fits the demo |

Config may hold \`BaseReward = 3\` and \`GoalNeed = 75\`. The server reads these values, GoalHUD shows the same GoalNeed, and the collectable does not keep another copy of the number in a Script.

Changing coin color is not a balance iteration. Changing a formula without measuring again is also not evidence.

Turn one knob, or you will not know what helped.

**Do now (6 min):** make the first Config change, repeat the matching table row, and record the difference in seconds or Coins.`,
      },
      {
        title: "Power must change the experience",
        content: `Power is not there for a pretty leaderstats number. After an upgrade, the player should feel faster progress. Check the server formula and make sure it uses the current Attribute or Value.

| Check | Power 1 | Power 2 |
|-------|---------|---------|
| Reward for a base Part | 3 | 6 |
| Collects to GoalNeed 60 | 20 | 10 |
| Rough time | Longer | Clearly shorter |

Short server formula: \`local reward = Config.BaseReward * power\`. Do not take power from an arbitrary number sent by the client. The server reads its own player state and computes payout itself.

If Power 2 gives only 3% more than Power 1, the difference can vanish in pathing and random spawn. If it gives a hundred times more, the first goal instantly loses meaning. Record the actual ratio, not only the expected formula.

Power should change progress speed, not only the number in TAB.

**Do now (5 min):** run two 30-second passes on the same route and compare income.`,
      },
      {
        title: "Anti-dupe before any conclusion",
        content: `Touched can fire from several character parts. If locking happens after payout, one sphere artificially raises Coins/min and shortens TTG1. That "successful balance" breaks as soon as anti-dupe is fixed.

| Test | Correct result |
|------|----------------|
| Normal touch | One payout |
| Jump on Part | One payout |
| Stand on Part 2 s | No repeat payout |
| Two players at once | One payout by the server's rule |
| Respawn of a new Part | New Part is available again |

Minimum sequence: \`if collected then return end; collected = true\`. Set the lock before changing Coins, progress, and VFX. After that the item disappears or enters a respawn wait state.

Also check autosave. SaveService must not add Coins while saving, and a late load must not wipe an already earned reward.

Anti-dupe is the seal on the measuring instrument.

**Do now (4 min):** spam-test one collectable and match the count of server prints to the actual Coins gain.`,
      },
      {
        title: "VFX and SFX only after truth",
        content: `Juice makes collecting readable: a short sound confirms success, a particle burst marks the place, and GoalHUD shows the consequence. But feedback runs only after the server accepted the collectable and changed Coins.

| Event | Feedback |
|-------|----------|
| Successful payout | Sound + ParticleEmitter:Emit |
| Repeat touch blocked | No reward effect |
| Goal progress changed | Short text update |
| Goal complete | One separate complete signal |
| Item respawn | Calm spawn effect |

For a short burst, \`emitter:Emit(Config.CollectParticles)\` is enough. A value of 12-20 particles is often visible without a constant cloud, but check it in your scene. Sound should be short and not cover the next collect.

If VFX runs in a LocalScript through a RemoteEvent, the server sends the event only after a successful reward. The client does not decide whether there was a payout.

The effect is a receipt after purchase, not a promise before payment.

**Do now (6 min):** add one Sound and one burst, then compare a successful touch with a blocked repeat.`,
      },
      {
        title: "Cleanup after twenty collects",
        content: `An effect that looks good once can create dozens of undeleted Parts or Sounds. Run a series of twenty collects and check Workspace, Folder **SimFx**, Output, and frame smoothness.

| Risk | Symptom | Fix |
|------|---------|-----|
| Enabled forever | Constant particle cloud | Use Emit(n) |
| Cloned Sound not deleted | Hundreds of objects | Debris:AddItem |
| Fx Part left behind | Folder grows after every collect | Cleanup after Lifetime |
| Very long Sound | Sounds stack | Shorten TimeLength or Volume |
| Error from Destroy | Code touches a deleted Part | Finish work before cleanup |

Debris is handy for a temporary anchor: \`Debris:AddItem(fxPart, 2)\`. The time should cover ParticleEmitter Lifetime and Sound length, but not leave junk for minutes.

A good fireworks show leaves a memory, not a pile of boxes on the stage.

**Do now (4 min):** do twenty collects, count objects in SimFx before and after waiting for cleanup.`,
      },
      {
        title: "HUD, GoalHUD, and DataStore after tuning",
        content: `After you change GoalNeed or BaseReward, check every place where the player sees numbers. If Config already has GoalNeed 75 but the text says "Collect 500", the system works technically, but the player gets the wrong task.

| System | What must match |
|--------|-----------------|
| TAB and CoinsHUD | Current server Coins |
| GoalHUD | progress and the current GoalNeed |
| Complete | Condition progress >= GoalNeed |
| DataStore | Loaded Coins without double payout |
| VFX | Only a confirmed increase |

Do not hardcode goal text into several TextLabels. Let the UI get need from the same table or server state. After rejoin, check that GoalHUD immediately shows loaded progress and does not wait for the next collect.

If API Services are unavailable, mark rejoin as unverified. Do not invent a green status.

Config writes the score; HUD and server must play the same melody.

**Do now (4 min):** change a test GoalNeed, press Play, and find every place where the old number is still visible.`,
      },
      {
        title: "Mentor report and Ship prep",
        content: `The report should fit in 30 seconds and contain measurable facts. Say: "Coins/min was 24, became 51. TTG1 was 260 seconds, became 112. I changed BaseReward and GoalNeed one at a time. Power 2 gave roughly double income. Sound and particles run after server payout".

| Show | Do not replace evidence with this |
|------|-----------------------------------|
| Before-after table | "I just like it more" |
| Config with two changes | Random numbers in Scripts |
| One successful and one repeat touch | Only a pretty burst |
| TAB, HUD, and progress | A separate TextLabel screenshot |
| Clean SimFx after a series | One perfect collect |

In 6.10 you will not have time to hunt the cause of odd income again. Final Ship will use today's table as proof of a predictable economy.

A report is a receipt with numbers, not an ad poster.

**Do now (3 min):** prepare four report sentences and show the table without verbally excusing red rows.`,
      },
      {
        title: "Lesson 47 submission checklist",
        content: `Before Save, walk the full list:

- [ ] Starting BaseReward, GoalNeed, SpawnCount, and Power are recorded.
- [ ] You have Coins/min for an honest 60 seconds.
- [ ] You have TTG1 in seconds and a verdict of slow, fast, broken, or ok.
- [ ] Power 1 and Power 2 were checked on the same route.
- [ ] Two Config changes were done one at a time with a "was - became" record.
- [ ] One sphere gives exactly one payout when Touched is spammed.
- [ ] TAB, CoinsHUD, and GoalHUD show consistent numbers.
- [ ] Sound and ParticleEmitter run after a successful giveCoins.
- [ ] SimFx cleans up after a series of twenty collects.
- [ ] Goal complete fires once.
- [ ] Rejoin state is checked or honestly marked.
- [ ] Output has no red errors during the test.
- [ ] Save: Lesson 6.9 - Sim Balance Juice.

Next is 6.10 - Ship Sim. What moves forward is not just a pretty island, but a verified economy, short feedback, and a table you can use to repeat the result.

This Save is the dress rehearsal before opening night.

**Do now (3 min):** close the last broken row, repeat a short run, and save the Place under the exact name.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Reward, GoalNeed, spawn, and Power change at the same time",
      explanation: "After a retest you cannot tell which change affected the result.",
      correctApproach: "Change one Config field and repeat the same scenario.",
    },
    {
      mistake: "Coins/min is measured before anti-dupe is checked",
      explanation: "Repeat Touched events artificially raise income and invalidate balance.",
      correctApproach: "First confirm one payout per collectable.",
    },
    {
      mistake: "Power is compared on different routes and for different durations",
      explanation: "Spawn and search time affect the result, not only the multiplier.",
      correctApproach: "Use the same route and duration for both Power values.",
    },
    {
      mistake: "VFX runs on every local touch",
      explanation: "The effect can fire without a server reward and give false feedback.",
      correctApproach: "Send the VFX signal only after a successful server payout.",
    },
    {
      mistake: "GoalHUD still shows an old number after a Config change",
      explanation: "The player sees a requirement that does not match the server complete condition.",
      correctApproach: "Read GoalNeed from a single Config or confirmed server state.",
    },
    {
      mistake: "Temporary Fx Parts and Sounds are not deleted",
      explanation: "After a collect series Workspace grows and performance drops.",
      correctApproach: "Use Emit(n), Debris, or explicit cleanup after the effect ends.",
    }
  ],
  summary: "You measured Simulator pace, made two controlled Config changes, and confirmed Power's impact. Reward VFX now runs after server truth, and the table prepares the project for Ship Sim.",
  practiceTask: {
    title: "Economy balance and collect juice (~30 min)",
    difficulty: "intermediate",
    description: `### Part A - Baseline measurement (8 min)
1. Record BaseReward, GoalNeed, SpawnCount, and Power.
2. Measure Coins/min, TTG1, and spam of one collectable.
3. Fill fact and verdict in the playtest table.

### Part B - Two iterations and VFX (15 min)
1. Change one Config field and repeat the matching test.
2. Record "was - became", then make a second separate change.
3. Add Sound and ParticleEmitter:Emit after server payout.
4. Check cleanup with a series of twenty collects.

### Part C - Control before Ship (7 min)
1. Compare Power 1 and Power 2 on the same route.
2. Check TAB, CoinsHUD, GoalHUD, complete, Output, and rejoin state.
3. Save the Place as **Lesson 6.9 - Sim Balance Juice**.`,
    hints: [
      "A phone stopwatch is enough if start and stop are the same for every run.",
      "If one Part gives multiple payouts, do not balance numbers until anti-dupe is fixed.",
      "For VFX use a short burst, not a permanently Enabled ParticleEmitter.",
      "After changing GoalNeed, check both the server condition and GoalHUD text."
    ],
    optionalChallenge: "Add a third run to the playtest table and compute average Coins/min without changing Config between attempts.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Which set best describes the lesson 6.9 artifact?",
        options: [
          "A metrics table with no retests after Config changes",
          "VFX on local touch without checking server reward",
          "Metrics table, two Config changes, checks, and VFX after payout",
          "Only final Coins/min with no Power or anti-dupe test"
        ],
        correctAnswer: 2,
        explanation: "The lesson needs measured balance and honest feedback.",
      },
      {
        id: "q2",
        type: MC,
        question: "What does TTG1 measure?",
        options: [
          "Time to finish the first goal",
          "Cleanup time for one Fx Part",
          "Interval between autosaves",
          "Duration of one ParticleEmitter burst"
        ],
        correctAnswer: 0,
        explanation: "TTG1 means time to first goal.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why change only one Config field in a single iteration?",
        options: [
          "So you do not repeat playtest after a change",
          "So GoalHUD can store a separate number",
          "So all metrics automatically turn green",
          "So you can identify why the result changed"
        ],
        correctAnswer: 3,
        explanation: "A controlled change gives a clear conclusion.",
      },
      {
        id: "q4",
        type: MC,
        question: "What should you do before measuring Coins/min?",
        options: [
          "Change Reward and GoalNeed at the same time",
          "Confirm one payout per collectable",
          "Measure Power on a different route",
          "Run VFX before the server check"
        ],
        correctAnswer: 1,
        explanation: "Without anti-dupe, income results will be artificially high.",
      },
      {
        id: "q5",
        type: MC,
        question: "Which TTG1 target is used for the learning demo?",
        options: [
          "Under 10 seconds regardless of GoalNeed",
          "Over 15 minutes without Power",
          "About 60-180 seconds",
          "Any time, if the HUD looks right"
        ],
        correctAnswer: 2,
        explanation: "This range lets you show the full loop in a short test.",
      },
      {
        id: "q6",
        type: MC,
        question: "How do you correctly compare Power 1 and Power 2?",
        options: [
          "Change GoalNeed and spawn at the same time",
          "Run the same route for the same duration",
          "Compare different Places",
          "Judge only by HUD color"
        ],
        correctAnswer: 1,
        explanation: "Same conditions isolate Power's effect.",
      },
      {
        id: "q7",
        type: MC,
        question: "Who should compute reward from BaseReward and Power?",
        options: [
          "The LocalScript that saw the touch first",
          "GoalHUD after text changes",
          "A client RemoteEvent with no check",
          "Server reward logic"
        ],
        correctAnswer: 3,
        explanation: "The server owns value and does not trust a client amount.",
      },
      {
        id: "q8",
        type: MC,
        question: "When do reward Sound and particle burst run?",
        options: [
          "After a confirmed server payout",
          "Immediately before the collected check",
          "After any local touch, even a rejected one",
          "During respawn as a reward substitute"
        ],
        correctAnswer: 0,
        explanation: "Feedback should confirm a real reward.",
      },
      {
        id: "q9",
        type: MC,
        question: "What should happen on a repeat touch of an already collected Part?",
        options: [
          "A repeat payout without goal progress",
          "No new payout and no reward VFX",
          "VFX without payout to confirm the touch",
          "A new payout if the HUD has not updated yet"
        ],
        correctAnswer: 1,
        explanation: "Anti-dupe blocks both the reward and its feedback.",
      },
      {
        id: "q10",
        type: MC,
        question: "Why run twenty collects with VFX?",
        options: [
          "To judge balance without checking Coins",
          "To leave all Fx Parts for the next run",
          "To replace the anti-dupe test with a performance test",
          "To find undeleted Fx Parts, Sounds, and errors"
        ],
        correctAnswer: 3,
        explanation: "A series reveals buildup of temporary objects.",
      },
      {
        id: "q11",
        type: MC,
        question: "Where should GoalHUD get the current GoalNeed?",
        options: [
          "From a single Config or server state",
          "From a separate number typed into every TextLabel",
          "From the last local touch regardless of payout",
          "From the previous Save without checking Config"
        ],
        correctAnswer: 0,
        explanation: "One source keeps UI from drifting from the server condition.",
      },
      {
        id: "q12",
        type: MC,
        question: "What does a broken verdict mean in the table?",
        options: [
          "Pace is a bit off the forecast, but the loop works",
          "VFX needs fewer particles",
          "The core reward or test system is not working correctly",
          "Another control run is needed for an average"
        ],
        correctAnswer: 2,
        explanation: "Broken must be fixed before balance conclusions.",
      },
      {
        id: "q13",
        type: MC,
        question: "What is valid proof of a balance change?",
        options: [
          "One run after several simultaneous changes",
          "A metric record before and after one Config change",
          "Comparing different routes with no fixed time",
          "Judging only by VFX brightness"
        ],
        correctAnswer: 1,
        explanation: "Comparable measurements show the real impact.",
      },
      {
        id: "q14",
        type: MC,
        question: "What if rejoin could not be checked because of API Services?",
        options: [
          "Honestly record the state as unverified",
          "Treat restore as successful based on HUD",
          "Change the DataStore key and mark ok without rejoin",
          "Replace rejoin with a repeat touch test"
        ],
        correctAnswer: 0,
        explanation: "The artifact must separate fact from assumption.",
      },
      {
        id: "q15",
        type: MC,
        question: "What is the exact Save name for lesson 47?",
        options: [
          "Lesson 6.9 - Sim Ship",
          "Lesson 6.8 - Daily Goals Final",
          "Lesson 6.9 - Simulator VFX Only",
          "Lesson 6.9 - Sim Balance Juice"
        ],
        correctAnswer: 3,
        explanation: "The checklist requires Save Lesson 6.9 - Sim Balance Juice.",
      }
    ],
  },
};

export const enLesson610 = {
  lessonId: "lesson-roblox-6-10",
  moduleId: "module-06",
  order: 10,
  title: "6.10 - Ship Sim",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Stitch Simulator systems into one clear golden path",
    "Verify server Coins credit, anti-dupe, and a synced HUD",
    "Run playtest from a table and separate blockers from cosmetic defects",
    "Prepare a short demo with a daily goal, VFX, and honest progress",
    "Save the module's final Place and write a post-release improvement list"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 48 of 92)",
        content: `You reached the end of module 6 - **Simulator**. In 6.9 you checked the economy, changed Config numbers, and added VFX after a successful reward. Today is not the time to build a second island or a new currency. The goal is to stitch ready systems into one short route the player understands without your explanation.
In the next lesson, module 7 - Tycoon begins. Decor and earning mechanics change, but the rule stays: the server owns Coins, Config holds balance, and the client shows the result.

| Was in 6.9 | Should be after 6.10 |
|-------------|----------------------|
| Separate economy measurements | One stable golden path |
| VFX on a test reward | VFX only after a real payout |
| List of suspicious places | A table with fact and status |
| Tuned Config numbers | A demo that fits in 60-90 s |

Ship is not a new floor of the house; it is checking every door before opening.

**Do now (3 min):** write in one sentence what the player does from Spawn to finishing the first goal.`,
      },
      {
        title: "Ship means a ready loop, not a perfect game",
        content: `Ship Sim is the state where the core loop can be played from start to finish without the author's manual help. The player sees a collectable, touches it, gets a server reward, sees the same number in TAB and HUD, advances the goal, and gets clear feedback. At the end they know what to do next.

| Ship | Not yet ship |
|------|--------------|
| One finished loop | Five unfinished mechanics |
| Server changes Coins | LocalScript paints a fake reward |
| Goal reachable during the demo | Goal needs twenty minutes |
| Output with no red errors | Errors labeled "unimportant" |
| Defects recorded and prioritized | Author fixes random cosmetics |

Do not confuse polish with readiness. A nice ParticleEmitter does not offset a double payout, and a new Sky does not fix a HUD that lags leaderstats. For submission, one collectable type, one Coins currency, and one daily goal are enough if they work together.

One complete short road is more useful than ten pretty bridges with no connection.

**Do now (3 min):** make a P0, P1, P2 list. In P0 write only what breaks collect, reward, goal, or launch.`,
      },
      {
        title: "System map in Explorer",
        content: `Before playtest, open Explorer and find every system node. Names in your Place may differ a little, but responsibility should be obvious.

| Place | Example | Responsibility |
|-------|---------|----------------|
| Workspace | Collectables, SpawnPoints | Visible objects and positions |
| ReplicatedStorage | Config, Remotes | Shared settings and the event channel |
| ServerScriptService | Leaderstats, CollectService, SaveService | Server truth and DataStore |
| StarterGui | CoinsHUD, GoalHUD | Score and goal display |
| StarterPlayerScripts | HUDController | Client reaction to server data |

Config must not be duplicated across Scripts. If BaseReward is 5 in a ModuleScript, do not write a separate 5 in CollectService and GoalHUD. HUD reads progress but does not decide reward size. Folder **Collectables** holds items, not server business logic.

Quick Lua check: \`local Config = require(ReplicatedStorage:WaitForChild("Config"))\`. WaitForChild is fine at the load boundary, but it does not fix a wrong Folder name.

Explorer is a city map where each service should have one address.

**Do now (4 min):** point to Config, server giveCoins, CoinsHUD, and Collectables. If you search longer than ten seconds, rename unclear objects.`,
      },
      {
        title: "Player golden path",
        content: `The golden path is the shortest action sequence that shows Simulator value. For this lesson it should be 6-8 steps and fit in 60-90 seconds.

| Step | Player action | Visible proof |
|------|---------------|---------------|
| 1 | Appears on Spawn | Sees instruction and a collectable |
| 2 | Approaches the item | Understands it can be collected |
| 3 | Touches the item | Item locks or disappears |
| 4 | Gets Coins | TAB and HUD show the same |
| 5 | Sees juice | Sound or particles follow payout |
| 6 | Collects again | GoalHUD shows progress |
| 7 | Reaches the goal | Complete state with no repeat reward |
| 8 | Rejoins if needed | Save behaves predictably |

The starting sign can hold three short commands: "Collect spheres", "Raise Coins", "Close the 25 Coins goal". Do not explain architecture to the player. They need action, direction, and result.

The golden path is a trailer the player steers themselves.

**Do now (4 min):** walk the route without Explorer and without Command Bar. Note the first pause or confusion.`,
      },
      {
        title: "Server cashier in the Ship rubric",
        content: `In 6.9 you already measured server payout. Today the task is different: prove that cashier, HUD, and goal work **in one Place during the demo**, without manual crutches. Search for every \`Coins.Value =\` and \`Coins.Value +=\` in LocalScript - for Ship that is a rubric blocker, even if the numbers "look good".

| Ship check | Green result |
|------------|--------------|
| Search for client Coins writes | None |
| One collect in the demo | TAB and HUD match |
| giveCoins prints reward | Number = Config * Power |
| FireClient Fx | Only after successful payout |

Short server form: \`coins.Value += Config.BaseReward * power.Value\`. The client stays a storefront: \`RewardFx:FireClient(player, reward)\` after confirmation.

On Ship the cashier is either open and honest, or the demo is cancelled.

**Do now (5 min):** do one collect in front of the mentor and show the Script that actually changed Coins.`,
      },
      {
        title: "Anti-dupe as a rubric item",
        content: `You already set collected in 6.4 and checked it in 6.9. For Ship it is enough to prove the fact: one Part = one payout in a live demo. If the flag is set after Sound, the honesty rubric fails even with correct Config.

| Demo step | What the mentor watches |
|-----------|-------------------------|
| Jump on Part | One Coins increase |
| Stand 2 s | No second payout |
| Repeat touch | No reward Fx |
| Respawn | New Part pays once again |

Minimum logic stays: \`if collected then return end; collected = true\` **before** changing Coins. Do not rewrite the system - close the hole and mark the table row as "yes".

Anti-dupe on Ship is the stamp on the receipt before the show.

**Do now (4 min):** run the three table scenarios and put statuses in the rubric.`,
      },
      {
        title: "HUD and goal in a 90-second demo",
        content: `Ship does not ask for a new GoalHUD. It asks that the existing HUD and goal be readable to a newcomer in a minute. Need should be reachable in 5-7 collects; otherwise the demo stalls halfway and hides complete.

| Signal | What should be visible in 90 s |
|--------|--------------------------------|
| Start | Coins on screen without a TAB ritual |
| Collect | HUD reacts immediately |
| Progress | GoalHUD moves |
| Complete | One clear finale |
| Rejoin lite | Honest status in the rubric |

The subscription was already in 6.3: \`coins:GetPropertyChangedSignal("Value"):Connect(render)\` plus an immediate first render. Today only verify it is alive in the integrated Place.

The demo is a trailer where the viewer presses "Play" themselves.

**Do now (5 min):** lower need for the demo if needed, and walk the path to complete without Explorer.`,
      },
      {
        title: "Playtest table instead of memory testing",
        content: `Playtest without a record quickly becomes "seems to work". Create the table before you press Play. In expectation write a concrete measurable result; in fact write a number, Output message, or behavior.

| # | Action | Expectation | Fact | Status |
|---|--------|-------------|------|--------|
| 1 | Play | Spawn, instruction, 3+ collectables | | |
| 2 | First touch | +5 Coins once | | |
| 3 | Stand on Part | No second payout | | |
| 4 | Check TAB/HUD | Same numbers | | |
| 5 | Reach need | Complete exactly once | | |
| 6 | Check Fx | After server reward | | |
| 7 | Wait for respawn | New Part collects | | |
| 8 | Stop and Play | Expected load behavior | | |
| 9 | Review Output | No red errors | | |

Do not change expectations after a failure to make the test green. If Config says BaseReward 5 and the fact is +10 without Power, that is a defect or an unaccounted multiplier.

The table is a flight black box, not a decorative diary.

**Do now (6 min):** run rows 1-5 without pausing to edit, and mark the first red status.`,
      },
      {
        title: "Defect priorities and a short fix cycle",
        content: `After the test, do not fix everything in a row. P0 blocks launch or honest reward. P1 breaks understanding of the loop or important feedback. P2 is cosmetics you can defer.

| Level | Example | Decision today |
|-------|---------|----------------|
| P0 | LocalScript changes Coins | Fix before submission |
| P0 | One sphere pays three times | Fix anti-dupe |
| P0 | Goal complete never happens | Fix condition or progress |
| P1 | HUD updates late | Fix the subscription |
| P1 | Unclear what to collect | Add short onboarding |
| P2 | ParticleEmitter too large | Note for later |
| P2 | Second island color is weak | Do not expand scope |

The fix cycle is short: reproduce - find the system owner - change one cause - repeat the same table row - walk neighboring rows. After fixing giveCoins, recheck anti-dupe, HUD, and goal, because they depend on reward.

First seal the hole in the boat, then polish the handrails.

**Do now (5 min):** pick one P0, write exact repro steps, and verify it twice after the fix.`,
      },
      {
        title: "Juice in the polish rubric",
        content: `In 6.9 juice already had to follow giveCoins. For Ship show it in the demo: sparks and sound appear at the same moment as the Coins increase. If there is sparkle but TAB stands still - the polish item is red.

| Event during demo | Feedback |
|-------------------|----------|
| Successful payout | One short Sound + burst |
| Rejected repeat | Silence |
| Goal complete | Separate signal, not the same collect sound |
| Respawn | Calm effect without a reward chime |

Do not overgrow ParticleEmitter: the mentor cares more about seeing sync "ding + +5" than fireworks across half the map. Cleanup from 6.9 should remain: after the demo Folder SimFx does not grow.

Polish on Ship is applause after a goal that already counted.

**Do now (3 min):** one successful and one blocked touch in front of the demo timer.`,
      },
      {
        title: "Demo rehearsal and the DataStore decision",
        content: `A demo is not an Explorer tour. Start with Play and show the experience through the player's eyes: Spawn, instruction, collect, synced score, goal progress, complete, and Output. Only after that, if the mentor asks, open the server Script or Config.

| Time | What to show |
|------|--------------|
| 0-15 s | Spawn and a clear goal |
| 15-45 s | Several collects, TAB/HUD, juice |
| 45-70 s | Reaching complete |
| 70-90 s | Clean Output and a short conclusion |

DataStore is desirable because it was the 6.7 topic, but do not hide its state. If API Services are unavailable or save is still unstable, mark the check "almost" and do not claim rejoin works. The core local loop must still be honest and complete. If DataStore is on, test loading in a published test Place with a safe key, and do not endlessly overwrite production data.

Rehearsal is compressing an hour of work into one clear minute.

**Do now (4 min):** start a timer and run the demo without switching to Edit. Note the second where a pause appeared.`,
      },
      {
        title: "Submission checklist and bridge to Tycoon",
        content: `Before you finish, walk the list top to bottom. One unfinished P0 means return to the fix, not add new decorations.

- [ ] The Place has one golden path of 6-8 steps.
- [ ] Folder Collectables and Config have clear names.
- [ ] Coins change only through server logic.
- [ ] One coin gives one reward even with multiple Touched events.
- [ ] TAB and CoinsHUD show the same value.
- [ ] GoalHUD moves from confirmed Coins and completes once.
- [ ] Sound and ParticleEmitter run after a successful reward.
- [ ] The playtest table has expectation, fact, and status.
- [ ] P0 items are closed; P2 items are on the post-release list.
- [ ] The demo fits in 60-90 seconds without a prompter.
- [ ] Output is clean during the full loop.
- [ ] DataStore state is marked honestly.
- [ ] Save: Lesson 6.10 - Sim Ship.

In module 7 Tycoon, collectables become dropper and collector, but the architecture habit stays. The server credits Coins, Config owns the numbers, HUD shows one truth, and playtest checks the player route.

The final Save is a checkpoint before the course moves to a new map.

**Do now (3 min):** save the Place under the exact name, close the last P0, and show the mentor the demo.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Coins increase in LocalScript along with HUD animation",
      explanation: "The client becomes the source of value, and TAB, HUD, and server can show different numbers.",
      correctApproach: "Credit Coins in server giveCoins; use LocalScript only for display.",
    },
    {
      mistake: "The collected flag is set after Coins change",
      explanation: "Several simultaneous Touched events pass the check and pay a repeat reward.",
      correctApproach: "Lock the collectable before computing and giving payout.",
    },
    {
      mistake: "GoalHUD counts local touches itself",
      explanation: "A server-rejected touch still moves the client goal.",
      correctApproach: "Build goal progress from a confirmed server value.",
    },
    {
      mistake: "VFX runs before a successful giveCoins",
      explanation: "The player gets a reward signal even when Coins did not change.",
      correctApproach: "Start Sound and particles after server confirmation of the reward.",
    },
    {
      mistake: "After each fix only the changed button is tested",
      explanation: "A reward change can break HUD, goal, anti-dupe, or DataStore.",
      correctApproach: "Repeat the defect row and neighboring dependent playtest table rows.",
    },
    {
      mistake: "Before submission a new island is built",
      explanation: "Scope grows while critical defects in the ready loop remain.",
      correctApproach: "Close P0 and P1 of one MVP loop; put expansions in the backlog.",
    }
  ],
  summary: "You stitched Simulator systems into one honest golden path, verified it with a table, and prepared a short demo. The final Save locks the finished module before moving to Tycoon.",
  practiceTask: {
    title: "Ship Sim: integration, playtest, and demo (~30 min)",
    difficulty: "intermediate",
    description: `### Part A - Map and test (8 min)
1. Write a golden path of 6-8 steps.
2. In Explorer find Collectables, Config, server giveCoins, CoinsHUD, and GoalHUD.
3. Fill expectations in the playtest table and run the first five rows.

### Part B - Fixes and recheck (15 min)
1. Close the first P0 in server reward, anti-dupe, HUD, or goal.
2. Repeat the defect row twice and check dependent rows.
3. Confirm juice runs only after a successful payout.
4. Walk the goal to complete and check Output.

### Part C - Ship (7 min)
1. Run a 60-90 second demo without Explorer or prompts.
2. Honestly mark DataStore state and put P2 items in the backlog.
3. Save the Place as **Lesson 6.10 - Sim Ship**.`,
    hints: [
      "First compare TAB and HUD after one collect, then check VFX.",
      "If one coin pays twice, set the lock before changing Coins.",
      "For the demo, lower need in Config so complete happens in 5-7 collects.",
      "After a server fix, recheck anti-dupe, GoalHUD, and Output."
    ],
    optionalChallenge: "Add a one-time complete banner that receives confirmed goal state and does not grant extra Coins.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the main artifact of lesson 6.10?",
        options: [
          "A separate Place only for VFX",
          "Explorer screenshot without Play",
          "One Place with a full loop, playtest table, and short demo",
          "A new island with no reward systems"
        ],
        correctAnswer: 2,
        explanation: "Ship checks the integrated loop in one Place.",
      },
      {
        id: "q2",
        type: MC,
        question: "Which defect has P0 priority?",
        options: [
          "One sphere grants Coins multiple times",
          "ParticleEmitter is a bit too large",
          "Secondary coin color is imperfect",
          "Ambient could be warmer"
        ],
        correctAnswer: 0,
        explanation: "A repeat payout breaks loop honesty.",
      },
      {
        id: "q3",
        type: MC,
        question: "Where should the Coins value change?",
        options: [
          "In a TextLabel inside CoinsHUD",
          "In the local collectable script",
          "In ParticleEmitter after a burst",
          "In server giveCoins logic"
        ],
        correctAnswer: 3,
        explanation: "The server is the source of truth for value.",
      },
      {
        id: "q4",
        type: MC,
        question: "When should collected or another lock be set?",
        options: [
          "After Sound finishes",
          "Before changing Coins and starting the reward",
          "After the second Touched",
          "After the item respawns"
        ],
        correctAnswer: 1,
        explanation: "Early locking stops parallel Touched events.",
      },
      {
        id: "q5",
        type: MC,
        question: "What should the TAB and CoinsHUD check show?",
        options: [
          "HUD is always 10 Coins higher",
          "TAB updates only after Stop",
          "The same server value after every collect",
          "Each interface keeps its own score"
        ],
        correctAnswer: 2,
        explanation: "Both interfaces mirror one server truth.",
      },
      {
        id: "q6",
        type: MC,
        question: "Which need value is best for the final demo?",
        options: [
          "One that needs at least an hour",
          "Zero, so the goal finishes without playing",
          "A random value outside Config",
          "Reachable in about 5-7 collects"
        ],
        correctAnswer: 3,
        explanation: "The viewer should see progress and complete in 60-90 s.",
      },
      {
        id: "q7",
        type: MC,
        question: "What is GoalHUD's role in a finished Simulator?",
        options: [
          "Grant Coins on its own",
          "Show progress of a server-confirmed goal",
          "Decide BaseReward instead of Config",
          "Create collectables in Workspace"
        ],
        correctAnswer: 1,
        explanation: "GoalHUD displays progress and does not create value.",
      },
      {
        id: "q8",
        type: MC,
        question: "When should reward Sound or particles run?",
        options: [
          "Immediately on any Touched",
          "While Config is loading",
          "After a confirmed server payout",
          "On every rejected repeat touch"
        ],
        correctAnswer: 2,
        explanation: "Juice confirms a real reward.",
      },
      {
        id: "q9",
        type: MC,
        question: "Why does the playtest table have separate \"Expectation\" and \"Fact\" columns?",
        options: [
          "So you do not start Play",
          "So you can compare the requirement with real behavior",
          "To replace Output",
          "To record only color names"
        ],
        correctAnswer: 1,
        explanation: "The gap between expectation and fact makes the defect visible.",
      },
      {
        id: "q10",
        type: MC,
        question: "What should you do right after fixing giveCoins?",
        options: [
          "Build a new island",
          "Delete the playtest table",
          "Move Coins into LocalScript",
          "Retest reward, anti-dupe, HUD, and goal"
        ],
        correctAnswer: 3,
        explanation: "Dependent systems must be checked after changing the cashier.",
      },
      {
        id: "q11",
        type: MC,
        question: "What if DataStore is still unstable in the final test?",
        options: [
          "Honestly mark the state \"almost\" and keep a working local loop",
          "Hide the problem from the mentor",
          "Claim rejoin works without testing",
          "Move the entire reward to the client"
        ],
        correctAnswer: 0,
        explanation: "Describe save state honestly without breaking the core loop.",
      },
      {
        id: "q12",
        type: MC,
        question: "What should you not show first in the 6.10 demo?",
        options: [
          "Spawn and instruction",
          "Collect and synced score",
          "A long tour of every Script in Explorer",
          "Finishing the goal"
        ],
        correctAnswer: 2,
        explanation: "The demo starts with the player experience.",
      },
      {
        id: "q13",
        type: MC,
        question: "What should you do with a cosmetic P2 defect before submission?",
        options: [
          "Stop all playtest for an hour",
          "Put it in the backlog and close P0 and P1 first",
          "Replace the server cashier check with it",
          "Call it critical without reproduction"
        ],
        correctAnswer: 1,
        explanation: "Cosmetics do not block Ship if P0 and P1 are closed.",
      },
      {
        id: "q14",
        type: MC,
        question: "What is the exact final Save name?",
        options: [
          "Lesson 6.9 - Sim Balance Juice",
          "Lesson 7.1 - Tycoon Plot",
          "Simulator Final Draft",
          "Lesson 6.10 - Sim Ship"
        ],
        correctAnswer: 3,
        explanation: "The checklist requires Save Lesson 6.10 - Sim Ship.",
      },
      {
        id: "q15",
        type: MC,
        question: "Which habit from 6.10 carries into the Tycoon module?",
        options: [
          "Each HUD stores its own Coins",
          "The client decides reward value",
          "Server owns Coins, Config owns numbers, HUD owns display",
          "Playtest is needed only for Simulator"
        ],
        correctAnswer: 2,
        explanation: "The responsibility split stays useful in Tycoon.",
      }
    ],
  },
};
