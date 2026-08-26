/** Roblox Module 05 EN */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson51 = {
  lessonId: "lesson-roblox-5-1",
  moduleId: "module-05",
  order: 1,
  title: "5.1 - Design of 3 biomes",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Explain Obby as a genre of module 5 and the role of the three biomes in the learning curve",
    "Make a paper sketch of the route Spawn → biome 1-2-3 → Finish to Studio",
    "Create folders Biome1/Biome2/Biome3 with contrasting colors and materials",
    "Build a passable skeleton of platforms without hazards, combat scripts, and AAA decor",
    "Leave places under checkpoint, hazard and secret for lessons 5.2-5.5",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 29 of 92)",
        content: `Module 5 is an Obby: designing three biomes and a passable skeleton from Spawn → Finish. Today you design the route and contrasting biomes where we will layer hazards, a checkpoint, a timer, platforms, a secret, and juice.

The rest of the module only layers on top of this framework: 5.2 - hazards, 5.3 - checkpoint + GUI, 5.4 - while-platforms, 5.5 - secret, 5.6 - playtest, 5.7 - curve, 5.8 - full pass, 5.9 - juice, 5.10 - Checkpoint + Ship.

Not topic 5.1:

- Hazard logic, juice, timer;
- Checkpoint system;
- Full juice as the main feature.

Topic 5.1:

- route and biomes;
- readable geometry;
- locations for future systems.`,
      },
      {
        title: "What is Obby and why three biomes",
        content: `Obby is an obstacle course where the player moves forward by jumping, avoids dangers, and accumulates progress. Three biomes provide a sense of place and a natural difficulty curve.

| Biome | Role | Feeling |
| --- | --- | --- |
| 1 | Training | Wider platforms, clear direction |
| 2 | Practice | Narrower gaps, first combos |
| 3 | Test | Most demanding jumps, but still fair |`,
      },
      {
        title: "First paper, then Studio",
        content: `Opening Studio and placing 40 Parts without a plan is classic chaos. A 5-minute sketch is cheaper than an hour of dragging around.

On paper or in notes:

- rectangle of biomes 1, 2, 3 from left to right or bottom to top;
- Spawn point and an arrow to Finish;
- 5-8 platform dots in each biome;
- dashed line "here will be hazard" and "here CP" without building scripts;
- side loop "secret?" near biome 2.

Sketch questions:

- is the direction clear without the author;
- is there a resting spot between difficult jumps;
- does biome 3 not start with the toughest gap immediately after entry.

Do not draw furniture or arches. Only the flow of movement.

**Do this now (5 min):** draw a sketch of the three zones with Spawn, Finish, and an arrow for the main path.`,
      },
      {
        title: "Folders Biome_1 / Biome_2 / Biome_3",
        content: `The Explorer structure has been saving 5.2-5.9 since day one.

\`\`\`
Workspace
├ Biome_1
├ Biome_2
├ Biome_3
├ SpawnLocation (or Pad in Biome_1)
└ FinishLine (placeholder in Biome_3)
\`\`\`

Later you will add Folders Hazards, Checkpoints, Platforms, Secrets, but not today as complete systems. Today you can use empty Part \`HazardSpot_01\` markers with Transparency 0.5 as a reminder.

Why separate a Folder by biome:

- easy to hide or show a zone;
- quickly find Parts;
- peer in 5.8 navigates the tree better.

Don’t keep 80 Parts in the root of the Workspace. Don’t name everything Part1…Part40.

**Do this now (4 min):** create three biome Folders and a FinishLine placeholder in Biome_3.`,
      },
      {
        title: "Biome contrast: color, material, height",
        content: `The player reads the biome with their eyes even before the first difficult jump.

| Tool | Example |
| --- | --- |
| Color | 1: green, 2: orange/red, 3: light blue/white |
| Material | Grass / Neon or Brick / Ice / Glacier |
| Floor height | Each biome at +10…20 studs or shift along X |
| Platform shape | 1: wide slabs, 3: narrower beams |`,
      },
      {
        title: "Platform skeleton: scale and gaps",
        content: `The goal is to complete the route on foot or by jumping without scripts, without making the final Ship yet.

| Parameter | Biome 1 | Biome 2 | Biome 3 |
| --- | --- | --- | --- |
| Platform width | 6-10 studs | 4-8 | 3-6 |
| Gap | 4-8 | 6-10 | 8-12 (fair) |
| Number of platforms | 5-8 | 5-8 | 5-8 |
| Zone length | compact | medium | not a marathon |`,
      },
      {
        title: "Spawn, direction and Finish-plug",
        content: `SpawnLocation or a bright Pad in Biome_1: the player immediately sees the first platform 5-15 studs away, not emptiness.

Navigation without UI arrows:

- a series of platforms leads in one direction;
- walls or curbs block wrong paths;
- the next biome is visible through color contrast ahead.

FinishLine today - an Anchored Part named FinishLine with a distinct color. Timer and Badge logic will come in 5.3 and 5.10, but fix the name now.

Do not place Spawn over a pit. Do not hide Finish in decorations.

**Do this now (5 min):** set up Spawn, finish building Biome_3 to the FinishLine, and check the finish's visibility from the last platforms.`,
      },
      {
        title: "Spaces for future systems",
        content: `Leave the “pockets” unimplemented.

| Location | Current Marker | Lesson |
| --- | --- | --- |
| Pit under the jump | Empty or Part HazardSpot | 5.2 |
| Safe platform after the segment | Wider slab CP_Spot | 5.3 |
| Long gap | Static slab-temporary | 5.4 while |
| Side alcove of biome 2 | Passage to the side SecretSpot | 5.5 |`,
      },
      {
        title: "Playtest of the skeleton without scripts",
        content: `After the first route assembly, check it like a simple walkthrough.

1. Play on Spawn - you can see biome 1 and the direction.
2. Go through biome 1 - no geometry sticking.
3. Entry to biome 2 - contrast is readable.
4. Biome 3 → Finish - the route exists.
5. Attempt to leave the path - curb or obvious edge.
6. Explorer - Parts in their Folder.
7. Output - empty, because there are almost no scripts.`,
      },
      {
        title: "Anti-patterns of biome design",
        content: `| Pattern | Why is it bad | Fix |
| --- | --- | --- |
| One Long Corridor Without Zones | No Memory Place | Three Folder + Contrast |
| Biome 1 is already an "exam" | Newcomer Gives Up | Wider slabs at the start |
| Decor instead of route | Mesh Hours, Zero Playtest | Skeleton First |
| Random Colors Parts | Noise, not a biome | Palette per zone |
| No Finish | No Purpose | FinishLine Plug |
| Script for each platform separately | Copy-paste, out of sync | One Script on a Folder |
| Decor instead of skeleton | Mesh Hours, Zero Playtest | First Pass-Through Frame |`,
      },
      {
        title: "Relationship with Curve 5.7 (Forward)",
        content: `Today you don’t adjust the difficulty curve with numbers - there are still no platform configs and bug lists. But set up the biome roles so that 5.7 has something to tweak.

- Biome 1 forgives mistakes in width;
- Biome 2 requires attention;
- Biome 3 is narrower, but not invisible.

If all three zones are already at a gap of 14 studs, in 5.7 you’ll have to rebuild everything. Better a softer start now.

Write in your notes: “B1 gap ~6, B2 ~8, B3 ~10” - a start for future iterations.

**Do this now (2 min):** add approximate gaps of the three biomes to the sketch.`,
      },
      {
        title: "What NOT to build in 5.1",
        content: `| Do Not Do Now | Lesson |
| --- | --- |
| KillBrick Script / Damage Zone | 5.2 |
| Checkpoint + Timer GUI | 5.3 |
| While-Platforms + Config | 5.4 |
| Key-Door | 5.5 |
| Sound / Particles for the Entire Level | 5.9 |
| Badge / Game Settings Ship | 5.10 |
| Script for Sword or Melee Combat | never in Obby |`,
      },
      {
        title: "Checklist for submission and bridges up to 5.2",
        content: `Before Save:
- [ ] sketch of three biomes and the route
- [ ] Folders Biome_1…3 with contrasting palette
- [ ] passable skeleton Spawn → Finish by walking/jumping
- [ ] FinishLine placeholder with correct name
- [ ] markers for hazard / CP / secret locations
- [ ] no extra code or unrelated scripts

Next 5.2 - Hazards + debounce: in pits and HazardSpot add readable traps and server Touched. Touch the biome skeletons minimally - only fill with hazards.

**Do this now (2 min):** Save Place as Lesson 5.1 - Three Biomes.`,
      },
    ],
  },
    commonMistakes: [
    {
      "mistake": "Platforms fall into the abyss immediately after pressing Play",
      "explanation": "The Anchored property was not set to true on the biome parts.",
      "correctApproach": "Select all platform parts across Biome_1, Biome_2, Biome_3 folders and set Anchored = true."
    },
    {
      "mistake": "Biome 1 is too punishing, preventing beginners from completing the first 3 jumps",
      "explanation": "Platform gaps in the tutorial zone exceed comfortable 6-8 stud distances.",
      "correctApproach": "Make starting platforms wider and keep early gaps between 6-8 studs for a gentle learning curve."
    },
    {
      "mistake": "All biomes look identical, making navigation confusing",
      "explanation": "The same material and color palette were used throughout the entire obby.",
      "correctApproach": "Use distinct color schemes and materials for each folder (e.g., Grass/Green -> Sand/Yellow -> Basalt/Dark Grey)."
    }
  ],
  summary: "You have opened the Obby module with the design of three contrasting biomes: sketch, Folders, a passable skeleton Spawn→Finish, and markers for hazard/CP/secret. The three biomes with contrasts, passable framework, and markers are ready for hazards in 5.2.",
  practiceTask: {
    title: "Practice for 5.1 - Design of 3 biomes",
    difficulty: "beginner",
    description: `**Goal:** a readable skeleton of three zones without scripts.

Part A - Paper (8 min)
1. Name biomes and roles: teach / train / exam.
2. Sketch Spawn → 1 → 2 → 3 → Finish.
3. Mark hazard / CP / secret locations.

Part B - Studio (18 min)
1. Folders Biome_1…3 + contrast palette.
2. 5-8 platforms per biome, Anchored true.
3. Spawn, FinishLine, Spot markers.

Part C - Playthrough (9 min)
1. Play through all three biomes.
2. Fix sticking points and holes.
3. Save: Lesson 5.1 - Three Biomes.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the genre of module 5 and lesson 5.1?",
        options: [
          "FPS with weapons",
          "Tycoon with a dropper",
          "Obby with the design of three biomes",
          "Simulator with leaderstats",
        ],
        correctAnswer: 2,
        explanation: "Module 5 - Obby, and 5.1 lays out three biomes.",
      },
      {
        id: "q2",
        type: MC,
        question: "The role of biome 1 on the curve?",
        options: [
          "Training: a softer start and a readable direction",
          "The toughest exam right away",
          "A place for decoration",
          "Only Skybox without platforms",
        ],
        correctAnswer: 0,
        explanation: "The first biome teaches, it does not examine.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why a paper sketch for Studio?",
        options: [
          "Roblox requires PDF",
          "It's cheaper to determine the route than to move the parts around for hours",
          "The sketch replaces Folders",
          "Play does not work without a sketch",
        ],
        correctAnswer: 1,
        explanation: "A sketch is a cheap way to check the route in advance.",
      },
      {
        id: "q4",
        type: MC,
        question: "Why do Folders Biome_1... 3?",
        options: [
          "To turn off Anchored",
          "To group zones for navigation and subsequent systems",
          "To create a Tool",
          "To replace FinishLine",
        ],
        correctAnswer: 1,
        explanation: "Folders structure Explorer for future lessons.",
      },
      {
        id: "q5",
        type: MC,
        question: "How should the biomes differ?",
        options: [
          "Only a number in the author's mind",
          "Contrast of color, material, or height",
          "Definitely different DataStores",
          "Only with different music without geometry",
        ],
        correctAnswer: 1,
        explanation: "The contrast must be visible in geometry and materials.",
      },
      {
        id: "q6",
        type: MC,
        question: "What is the main artifact of 5.1?",
        options: [
          "Passable skeleton of three biomes from Spawn to Finish",
          "Ready hazard scripts",
          "Full Badge ship",
          "while-platforms with Config",
        ],
        correctAnswer: 0,
        explanation: "Lesson delivery is a pass-through framework.",
      },
      {
        id: "q7",
        type: MC,
        question: "What to do with future hazards today?",
options: [
          "Fully code KillBrick",
          "Place location markers without scripts",
          "Make the entire floor deadly",
          "Remove all potholes",
        ],
        correctAnswer: 1,
        explanation: "The logic of hazards waits until 5.2, today only markers.",
      },
      {
        id: "q8",
        type: MC,
        question: "Why is it bad to make Bio 1 already an 'exam'?",
        options: [
          "A beginner does not have time to learn and gives up early",
          "Studio does not allow wide parts at the start",
          "FinishLine then disappears",
          "Folders become impossible",
        ],
        correctAnswer: 0,
        explanation: "Too complicated a start pushes a new player away.",
      },
      {
        id: "q9",
        type: MC,
        question: "What does the skeleton playtest check?",
        options: [
          "Only FPS",
          "Does the route run and read without scripts",
          "Does AwardBadge work",
          "Is FinishLine visible from the latest biome",
        ],
        correctAnswer: 1,
        explanation: "Playtest in 5.1 checks passability and readability.",
      },
      {
        id: "q10",
        type: MC,
        question: "What is NOT included in version 5.1?",
        options: [
          "Three Folder biomes",
          "Route sketch",
          "Hazard logic as the main mechanic",
          "FinishLine-stub",
        ],
        correctAnswer: 2,
        explanation: "Hazard logic - topic 5.2, not 5.1.",
      },
      {
        id: "q11",
        type: MC,
        question: "Why FinishLine already now?",
        options: [
          "To immediately issue a Badge",
          "To fix the route target for 5.3 and 5.10",
          "To replace Spawn",
          "To enable Atmosphere",
        ],
        correctAnswer: 1,
        explanation: "FinishLine is preparing the ground for timer 5.3 and Badge 5.10.",
      },
      {
        id: "q12",
        type: MC,
        question: "How does 5.1 prepare 5.2?",
        options: [
          "HazardSpot and pits are ready to accept KillBrick with debounce",
          "5.2 removes all biomes",
          "Traps are no longer needed",
          "You need to switch to Tycoon",
        ],
        correctAnswer: 0,
        explanation: "Markers from 5.1 become points for 5.2 hazard scripts.",
      },
      {
        id: "q13",
        type: MC,
        question: "How many biomes does a lesson require?",
        options: [
          "One",
          "Two",
          "Ten",
          "Three",
        ],
        correctAnswer: 3,
        explanation: "5.1 builds exactly three contrasting biomes.",
      },
      {
        id: "q14",
        type: MC,
        question: "What is more important on 5.1?",
        options: [
          "AAA Mesh decor of the entire island",
          "Readable passable route",
          "Full soundtrack",
          "The fifth biome instead of three",
        ],
        correctAnswer: 1,
        explanation: "The readability of the route is more important than decoration or sound.",
      },
      {
        id: "q15",
        type: MC,
        question: "What is the exact name of Save?",
options: [
          "Lesson 5.2 - Hazards Debounce",
          "Lesson 5.3 - Checkpoints Timer GUI",
          "Lesson 5.1 - Hazards",
          "Lesson 5.1 - Three Biomes",
        ],
        correctAnswer: 3,
        explanation: "Practice 5.1 ends with saving Lesson 5.1 - Three Biomes.",
      },
    ],
  },
}

export const enLesson52 = {
  lessonId: "lesson-roblox-5-2",
  moduleId: "module-05",
  order: 2,
  title: "5.2 - Hazards + debounce",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Make a Readable Hazard Part That Penalizes the Jump Error in Obby",
    "Handle Touched on the server and find the player's Humanoid through GetPlayerFromCharacter",
    "Apply death or damage only after checking hit Part",
    "Protect repeated Touched with debounce, so there won't be an instant series of kills",
    "Prepare honest traps at the checkpoint in 5.3 and juice in 5.9",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 30 of 92)",
        content: `In 5.1 you laid out three biomes and the main route. Today the route gets an error cost: hazards - lava, spikes, poisonous water, invisible only if unfair.

This is a lesson about traps that punish mistakes. Genre - Obby: the player jumps, misses, touches danger, dies, and learns.

| Was in 5.1 | Becomes in 5.2 |
| --- | --- |
| Geometry and route | Route with error consequence |
| Death only from falling into the void | Controlled KillBrick / damage |
| No Touched logic | Server handler + debounce |`,
      },
      {
        title: "What is a hazard in Obby",
        content: `Hazard is a Part or model, touching which punishes the player: instant death or damage. It explains the world rule: 'you cannot go here.'

| Type | Example | Feeling |
| --- | --- | --- |
| Instant kill | Lava, saw | Harsh lesson |
| Damage over time | Poison with damage debounce | Tension, chance to escape |
| Moving hazard | Spikes on while later | Rhythm + danger |`,
      },
      {
        title: "Readability: fair death",
        content: `Death is fair when the player understood the risk before touching it.

| State | Why it works |
| --- | --- |
| Fair | Bright red / neon lava, teeth or spikes on Part |
| Unfair | Same color as the floor, transparent CanCollide true without a visual cue |

A trap in an area that can be avoided increases readability. Death after a visible miss is a good mistake, not a random death from a thin edge.`,
      },
      {
        title: "Touched on the server: the path from hit to Humanoid",
        content: `Touched gives \`hit\` - this is a Part of the body, often a leg, arm, or HRP. The Character is searched for as \`hit.Parent\`, and the player - through Players.

\`\`\`
local part = script.Parent
part.Touched:Connect(function(hit)
local character = hit.Parent
local humanoid = character and character:FindFirstChildOfClass("Humanoid")
if not humanoid then return end
local player = game.Players:GetPlayerFromCharacter(character)
if not player then return end
humanoid.Health = 0
end)
\`\`\`

Why server Script: death and damage - this is game truth. A LocalScript could only kill «on your own screen» or be bypassed. For Obby kill it always has to be on the server.

The player filter is needed so that NPCs or other Humanoids in the Workspace do not accidentally trigger the course logic. Even if there are no enemies, it’s still a good habit.

Do not hang a kill on \`hit\` without checking the Humanoid: touching a neighbor’s decorative Part should not break the game.

**Do this now (6 min):** one Script in Hazard_01 with the path hit → Humanoid → Health = 0 and a quick Play test.`,
      },
      {
        title: "Health = 0 vs Damage Zone",
        content: `| Method | Effect | When |
| --- | --- | --- |
| \`humanoid.Health = 0\` | Instant death | Classic KillBrick Obby |
| Damage Zone | Minus HP | Damage zones, not instant kill |`,
      },
      {
        title: "Why debounce is needed",
        content: `Touched in Roblox is a 'noisy' event. While the foot is in the lava, a hit can occur dozens of times per second. Without debounce, you get:

- spammed prints / repeated calls;
- weird behavior with damage zones;
- unnecessary load;
- complicated juice later (sound 40 times).

Debounce is a flag 'we are already processing this player or this Part'.

For instant kill, a 0.5-1 s delay is enough: the Character will disappear anyway. It’s more important to block repeat until death in the same frame or series.

Alternative: debounce at the hazard Part level if the trap is one-time. For lava, better a key per player: multiple people on the server work independently.

**Do this now (5 min):** add debounce[player] in Hazard_01 and check Output: one logical kill on entering the zone.`,
      },
      {
        title: "One Script for many hazards",
        content: `Do not create five almost identical Scripts. Collect the Hazards Folder and connect it with a loop:

\`\`\`
local folder = workspace:WaitForChild("Hazards")
local debounce = {}
local function bind(hazard)
hazard.Touched:Connect(function(hit)
-- checks + debounce + Health = 0
end)
end
for _, child in ipairs(folder:GetChildren()) do
if child:IsA("BasePart") then
bind(child)
end
end
\`\`\`

This way, new traps in the Folder work immediately after copying the Part (after restarting the Script / Play).

The \`DamageMode = "kill"\` attribute can be added later. Today, the same kill on all children of the Folder is enough.

Names: Hazard_Lava_01, Hazard_Spikes_02 - will help in the buglist 5.6.

**Do this now (7 min):** move all traps to the Hazards Folder and connect them with one Script.`,
      },
      {
        title: "Where to set traps on the route",
        content: `| Good | Bad |
| --- | --- |
| Under the jump, where they fall when they miss | All Track = KillBrick |
| Side of the Safe Edge | On SpawnLocation |
| After a short tutorial without a trap | The first step of biome 1 is a momentary lava close |
| Contrast with the color of the biome | Disguise as checkpoint |`,
      },
      {
        title: "Typical Touched bugs",
        content: `| Symptom | Probable Cause | Fix |
| --- | --- | --- |
| Does not kill | Script in LocalScript / no Humanoid | Server Script, FindFirstChildOfClass |
| Kills decorations | No player check | GetPlayerFromCharacter |
| Kills instantly 20 times in logs | No debounce | debounce[player] |
| Does not kill after respawn | debounce was not reset | delay clear or clear on CharacterAdded |
| Kills through walls | Large hitbox / CanCollide of neighbors | Trim Size, check overlaps |`,
      },
      {
        title: "What NOT to build in 5.2",
        content: `| Do not do now | Why | Fix |
| --- | --- | --- |
| Many identical Scripts without Folder | Copy-paste | Use one Script per Folder |
| Checkpoint system | 5.3 | |
| while-platforms | 5.4 | |
| Sound on every touch without debounce | Spam; juice in 5.9 after stable hook | |
| Invisible floor-killer across the whole biome | Unfair | |`,
      },
      {
        title: "Playtest of traps",
        content: `| # | Action | Expectation |
| --- | --- | --- |
| 1 | Step into Hazard_01 | One death |
| 2 | Stand in the zone until Character disappears | No Output spam |
| 3 | Respawn and fall into the trap again | Again, one logical death |
| 4 | Take a detour / correct jump | Can avoid death |
| 5 | All 3 hazards | Same behavior pattern |
| 6 | Visual from 20 studs distance | Trap is recognizable |
| 7 | Script in ServerScriptService / in Part | Works on server |`,
      },
      {
        title: "Checklist for submission and what comes next",
        content: `Before Save:
- [ ] Folder Hazards, 3+ readable BasePart
- [ ] server Touched → Humanoid → Health = 0
- [ ] GetPlayerFromCharacter / player filter
- [ ] debounce per player (or equivalent)
- [ ] no extra code or unrelated scripts
- [ ] there is a safe path next to the traps

**Save**: Lesson 5.2 - Hazards Debounce.

Next 5.3 - checkpoints, timer, and GUI: the same deaths will become cheaper for learning. In 5.6, the baglist will collect unfair invisible KillBrick. In 5.9, juice will land on the hook.

**Do this now (2 min):** Save Place as Lesson 5.2 - Hazards Debounce.`,
      },
    ],
  },
    commonMistakes: [
    {
      "mistake": "Lava block eliminates the player 20 times per second and floods Output logs",
      "explanation": "The Touched event handler lacks a debounce guard.",
      "correctApproach": "Add a local isDebounced = false variable, verify it before damage, and reset after task.wait(0.5)."
    },
    {
      "mistake": "Error 'attempt to index nil with Health' occurs when non-character parts touch lava",
      "explanation": "The script attempts to read Health without confirming a Humanoid exists.",
      "correctApproach": "Always check local humanoid = hit.Parent:FindFirstChild(\"Humanoid\") and only apply damage if humanoid is not nil."
    },
    {
      "mistake": "Hazards look like regular safe platforms, killing players unexpectedly",
      "explanation": "Violates fair visual design principles.",
      "correctApproach": "Always make fatal hazards unmistakably visible with bright Neon materials or lava textures."
    }
  ],
  summary: "You've collected Obby-hazards: readable traps, server-side Touched to Humanoid, debounce against spam, and Folder for scale. Death is honest and ready to accept checkpoint in 5.3 and juice in 5.9.",
  practiceTask: {
    title: "Practice for 5.2 - Hazards + debounce",
    difficulty: "beginner",
    description: `**Goal:** three fair traps with one server template.

Part A - Scene (8 min)
1. Folder Hazards.
2. Three BaseParts with contrasting appearance.
3. Place under/next to jumps, bypass exists.

Part B - Logic (17 min)
1. One Script: for through Folder + Touched.
2. Humanoid + GetPlayerFromCharacter.
3. debounce[player] + Health = 0.

Part C - Check (10 min)
1. One death upon entering the zone.
2. No Output spam.
3. All three traps work.
4. Save: Lesson 5.2 - Hazards Debounce.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "The main purpose of lesson 5.2?",
        options: [
          "Create a tool for close combat",
          "Honest Obby-hazards with Touched and debounce",
          "Open the Coins store",
          "Save DataStore",
        ],
        correctAnswer: 1,
        explanation: "5.2 builds fair hazards on Touched with debounce.",
      },
      {
        id: "q2",
        type: MC,
        question: "Where should the KillBrick logic live?",
        options: [
          "In the LocalScript StarterPlayer",
          "In Script on the server",
          "Only in Lighting",
          "In Bundle without Script",
        ],
        correctAnswer: 1,
        explanation: "Damage and death are counted by the server, not the client.",
      },
      {
        id: "q3",
        type: MC,
        question: "What is a hit in Touched?",
        options: [
          "The player themselves must be the Instance",
          "Always Humanoid",
          "Touched part (often part of Character)",
          "Only SpawnLocation",
        ],
        correctAnswer: 2,
        explanation: "Touched returns the Part that was touched.",
      },
      {
        id: "q4",
        type: MC,
        question: "Why debounce?",
        options: [
          "To speed up WalkSpeed",
          "To prohibit Anchored",
          "To make the Part transparent",
          "So that the Touched series does not spam the same punishment",
        ],
        correctAnswer: 3,
        explanation: "Debounce blocks repeated activations of a single touch.",
      },
      {
        id: "q5",
        type: MC,
        question: "What is the easiest method for KillBrick Obby?",
        options: [
          "humanoid.Health = 0",
          "Delete Workspace",
          "Teleport to Null",
          "LocalScript Destroy(player)",
        ],
        correctAnswer: 0,
        explanation: "Health reset is the simplest reliable kill.",
      },
      {
        id: "q6",
        type: MC,
        question: "What makes death unfair?",
        options: [
          "Bright lava under the misjump",
          "KillBrick the color of the floor without a hint",
          "Spikes with contrasting Neon",
          "Trap with a bypass route",
        ],
        correctAnswer: 1,
        explanation: "An invisible trap of the same color is the main cause of unfair death.",
      },
      {
        id: "q7",
        type: MC,
        question: "Why GetPlayerFromCharacter?",
        options: [
          "To filter specifically the player, and not any Humanoid",
          "To draw the Sky",
          "To create a Tool",
          "To turn off Touched",
        ],
        correctAnswer: 0,
        explanation: "The function checks that the Humanoid belongs to the player.",
      },
      {
        id: "q8",
        type: MC,
        question: "How to connect many traps without copy-paste?",
        options: [
          "A separate Place for each hazard",
          "Folder Hazards + for + shared bind function",
          "Only Studio Plugins",
          "Delete all Parts except one",
        ],
        correctAnswer: 1,
        explanation: "Folder and loop allow one bind for all hazards.",
      },
      {
        id: "q9",
        type: MC,
        question: "Why can ForceField 'break' the test right after respawn?",
        options: [
          "He deletes the Script",
          "Short immunity does not immediately let you die in hazard",
          "It disables debounce forever",
          "He is moving FinishLine",
        ],
        correctAnswer: 1,
        explanation: "Temporary immunity prevents checking a kill immediately after respawn.",
      },
      {
        id: "q10",
        type: MC,
        question: "What NOT to submit in 5.2?",
        options: [
          "Three readable hazards",
          "Debounce",
          "Server Touched",
          "Full juice sound on every hazard",
        ],
        correctAnswer: 3,
        explanation: "Juice is not topic 5.2, it is added after stable hooks.",
      },
      {
        id: "q11",
        type: MC,
        question: "How does 5.2 prepare 5.3?",
        options: [
          "The checkpoint will reduce the cost of these deaths for learning",
          "5.3 removes all hazards",
          "Debounce is no longer needed",
          "GUI will replace KillBrick",
        ],
        correctAnswer: 0,
        explanation: "Checkpoint in 5.3 makes hazards from 5.2 less punishable.",
      },
      {
        id: "q12",
        type: MC,
        question: "Where will the Sound of Death sit in 5.9?",
        options: [
          "Into a separate second Touched without logic",
          "In the same server hook after a confirmed kill",
          "Only in SoundService without Part",
          "In Terrain",
        ],
        correctAnswer: 1,
        explanation: "The sound is added inside the already finished death hook.",
      },
      {
        id: "q13",
        type: MC,
        question: "Where is it better NOT to put the hazard?",
        options: [
          "Under the miss of the jump",
          "Beside the safe edge",
          "At the player's SpawnLocation",
          "In the pit of biome 2",
        ],
        correctAnswer: 2,
        explanation: "The hazard at the SpawnLocation will kill the player instantly and unfairly.",
      },
      {
        id: "q14",
        type: MC,
        question: "What genre is module 5?",
        options: [
          "Simulator with coins",
          "Tycoon with a dropper",
          "Obby with parkour and traps",
          "Simulator with Coins",
        ],
        correctAnswer: 2,
        explanation: "Module 5 - Obby with parkour and traps.",
      },
      {
        id: "q15",
        type: MC,
        question: "What is the exact name of Save?",
        options: [
          "Lesson 5.1 - Biomes",
          "Lesson 5.3 - Checkpoints Timer GUI",
          "Lesson 5.2 - Hazards",
          "Lesson 5.2 - Hazards Debounce",
        ],
        correctAnswer: 3,
        explanation: "Practice 5.2 ends with the saving of Lesson 5.2 - Hazards Debounce.",
      },
    ],
  },
}

export const enLesson53 = {
  lessonId: "lesson-roblox-5-3",
  moduleId: "module-05",
  order: 3,
  title: "5.3 - Checkpoints + timer + GUI",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Save the player's last checkpoint on the server after Touched",
    "Respawn the Character at the saved position, not just at the start of the level",
    "Show the ScreenGui with the checkpoint number and live completion timer",
    "Protect repeated Touched with debounce and prevent rollback to an older CP",
    "Prepare progress and time for while-platforms in 5.4 and playtest in 5.6",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 31 of 92)",
        content: `In 5.2, hazards are already killed with debounce. Without saving progress, each death throws the player back to the beginning - the Obby becomes a punishment, not a learning experience. Today you will build three systems together: checkpoint, respawn on it, and a GUI with a timer.

Genre - Obby: progression through biomes, fair retry after death, visible completion time.

|Was in 5.2|Becomes in 5.3|
|----------|----------|
|Death → level start|Death → last checkpoint|
|Progress only in the author's head|Progress in player data|
|No sense of time|Timer on screen|`,
      },
      {
        title: "Why is a checkpoint in Obby",
        content: `Death in parkour is the norm. The only question is: how much content the player repeats.

|without CP|With CP|
|------|----|
Each bug = full restart|Bug costs a segment, not the entire level|
Rookie Surrenders on Biome 2|Rookie Learns Biome 2 From the Inside|
|The author reduces the difficulty "because of rage"|You can leave the challenge and add CP|`,
      },
      {
        title: "Server truth LastCheckpoint",
        content: `Progress state lives on the server, tied to the Player, not the Character.

| Approach | Advantage |
| --- | --- |
| IntValue CheckpointIndex on player | Simply compare «forward only» |
| Vector3/CFrame in a table on the server | Exact respawn point |
| Attribute on player | Convenient to read from the client for GUI |`,
      },
      {
        title: "Touched at checkpoint with debounce",
        content: `The player stands on a Part for a few frames - Touched spams. Without debounce, saving and GUI flicker.

Template:

\`\`\`
local debounce = {}
part.Touched:Connect(function(hit)
local character = hit.Parent
local player = Players:GetPlayerFromCharacter(character)
if not player then return end
if debounce[player] then return end
debounce[player] = true
-- save CP if index is higher
task.delay(1, function()
debounce[player] = nil
end)
end)
\`\`\`

Alternative: if the same index has already been saved - immediately return without delay. This is even cleaner for 'standing on CP'.

Do not create a second Touched just for the sound - in 5.9 juice, it will go into the same hook.

Names: Checkpoint_01, Checkpoint_02… or a Folder Checkpoints with children. using GetChildren will help connect all Parts in one loop.

**Do this now (8 min):** connect Touched to all CP with debounce and advancing CheckpointIndex only forward.`,
      },
      {
        title: "Respawn at the last checkpoint",
        content: `By default, Roblox returns to the SpawnLocation. You need to override this after a new Character spawns.

\`\`\`
player.CharacterAdded:Connect(function(character)
  local hrp = character:WaitForChild("HumanoidRootPart")
  local data = checkpoints[player.UserId]
  if data and data.cframe then
    hrp.CFrame = data.cframe + Vector3.new(0, 3, 0)
  end
end)
\`\`\`

An offset on Y of 2-4 studs avoids getting stuck in the floor CP.

Also connect Humanoid.Died only if logging is needed; the teleport itself is usually done on CharacterAdded after auto-respawn. Set LoadCharacter / RespawnTime in Players consciously (for example, 2-3 sec).

Check edge cases:

- death before the first CP → Spawn;
- death after CP_02 → CP_02;
- repeated death → the same CP, no rollback.

Do not set Parent of leaderstats in Character - progress will be lost. CheckpointIndex is on Player.

**Do this now (8 min):** die after CP_02 and make sure you appear near it, not at the start.`,
      },
      {
        title: "Only forward: anti-roll back",
        content: `If the player turns back and steps on CP_01 again after CP_03, the state should not jump back.

Rule: update the index only when the new checkpoint is actually higher than the current one.

\`\`\`
if newIndex > currentIndex then
    currentIndex = newIndex
end
\`\`\`

**Do this now (3 min):** after CP_03, intentionally touch CP_01 and check that the index remained 3.`,
      },
      {
        title: "ScreenGui: checkpoint label",
        content: `The GUI shows the server truth, it doesn't make it up.

\`\`\`
StarterGui
└ ScreenGui ProgressGui (ResetOnSpawn = false)
└ TextLabel CheckpointLabel
\`\`\`

LocalScript:

\`\`\`
local player = game.Players.LocalPlayer
local index = player:WaitForChild("CheckpointIndex")
local label = script.Parent:WaitForChild("CheckpointLabel")
local function refresh()
label.Text = "Checkpoint: " .. tostring(index.Value)
end
refresh()
index:GetPropertyChangedSignal("Value"):Connect(refresh)
\`\`\`

ResetOnSpawn false - so that subscriptions and GUI don't multiply with each death. If ResetOnSpawn is true - be careful with script duplicates.

Do not write \`index.Value = 99\` from LocalScript "for testing in production." For debugging in Studio it can be temporary, but for delivery - read-only only.

The text "Checkpoint: 2" is sufficient. Fancy icons are not the minimum.

**Do this now (6 min):** make a ProgressGui with a CheckpointLabel that updates when Value changes.`,
      },
      {
        title: "Passage timer",
        content: `The timer shows how much time the run has taken from the start (or from the first movement) to the current moment / finish.

A simple client-side version for learning:

\`\`\`
local start = os.clock()
RunService.RenderStepped:Connect(function()
local t = os.clock() - start
local m = math.floor(t / 60)
local s = math.floor(t % 60)
timerLabel.Text = string.format("%02d:%02d", m, s)
end)
\`\`\`

Server-side start is more accurate for anti-cheat and leaderboard purposes, but for 5.3 a fair client timer + stopping at Finish later is enough. If you want the server version: RemoteEvent "TimerStart" at Spawn and Attribute Elapsed.

Stopping at the finish: when FinishLine is Touched on the server - FireClient the final time or set Flag Finished and the client stops updating.

Do not reset the timer at every checkpoint - this is the level completion time, not a segment. Separate segment time is an additional call.

**Do this now (6 min):** add TimerLabel mm:ss, starting with the character's appearance.`,
      },
      {
        title: "FinishLine and Timer Stop",
        content: `Part FinishLine at the end of Biome 3:

- Touched → if not yet Finished, mark Finished on the server;
- optionally save FinalTime;
- the client stops updating the timer and shows the final line.

\`\`\`
if player:GetAttribute("Finished") then return end
player:SetAttribute("Finished", true)
\`\`\`

Do not issue a Badge here - this is 5.10. Today only progress and time. But the FinishLine structure is already the same as what will be needed for AwardBadge.

Debounce on Finish is the same as on CP. Repeat touches should not make the GUI flash.

If the player finished and died - normally do not respawn on CP for a “new run” automatically; for the course it is enough to Stop the timer and leave Finished.

**Do this now (5 min):** place the FinishLine, stop the timer on the first valid touch.`,
      },
      {
        title: "Connection with hazards 5.2",
        content: `Hazard kills → Character disappears → CharacterAdded → teleport to CP.

Order in mind:

- Death debounce from 5.2 remains.

- Checkpoint does not cancel KillBrick.

- After respawn, the player is vulnerable again - this is normal.

- GUI with ResetOnSpawn false survives death.

Typical bug: teleport to CP happens before HumanoidRootPart appears - always WaitForChild. Another bug: teleport to the same position as KillBrick - move CP or raise Y.

Do not fix an unfair hazard with a checkpoint "every step." First, make the hazard readable (5.2), CP - a safety net between segments.

**Do this now (4 min):** die on the hazard after CP_01 twice and check stable respawn + GUI.`,
      },
      {
        title: "What NOT to build in 5.3",
          content: `
|Don't do now|When|
|-------------|----|
|Full juice on CP|5.9|
|while-platforms|5.4|
|Key-door|5.5|
|Juice Sound on CP|5.9|
|Badge at the finish|5.10|
|DataStore of time between sessions|later / M4 lite|`,
      },
      {
        title: "Playtest Progress",
        content: `| # | Action | Expectation |
| --- | --- | --- |
| 1 | Start | Index 0, timer is running, Spawn |
| 2 | Touch CP_01 | Index 1, GUI updated |
| 3 | Death | Respawn at CP_01 |
| 4 | CP_02 then CP_01 | Index remains 2 |
| 5 | Standing on CP | No GUI / Output spam |
| 6 | Finish | Timer stops, Finished |
| 7 | ResetOnSpawn | No duplicate ScreenGui |`,
      },
      {
        title: "Checklist for submission and what comes next",
        content: `Before Save:
- [ ] 3+ Checkpoint Parts with sequential indices
- [ ] CheckpointIndex (or equivalent) on the server
- [ ] Touched + debounce + only forward
- [ ] CharacterAdded teleport to the last CP
- [ ] ScreenGui: CheckpointLabel + TimerLabel
- [ ] FinishLine stops the timer
- [ ] ResetOnSpawn false for ProgressGui
- [ ] Save: Lesson 5.3 - Checkpoints Timer GUI

Next 5.4 - while-platforms + Config: make Parts movable after CP, so that timing practice doesn't require a full restart. In 5.6, the tester will measure deaths and pauses specifically between these checkpoints.

**Do this now (2 min):** Save Place as Lesson 5.3 - Checkpoints Timer GUI.`,
      },
    ],
  },
    commonMistakes: [
    {
      "mistake": "Players can jump directly to checkpoint #5 and bypass the level",
      "explanation": "The checkpoint script fails to validate sequential checkpoint order.",
      "correctApproach": "Only activate checkpoint N if the player's current checkpoint equals N - 1."
    },
    {
      "mistake": "Character spawns stuck inside the floor upon respawning",
      "explanation": "Spawn CFrame was set without adding vertical height offset.",
      "correctApproach": "Add a vertical offset: spawnCFrame = checkpoint.CFrame + Vector3.new(0, 3.5, 0)."
    },
    {
      "mistake": "Checkpoints managed in LocalScript fail to sync on server respawns",
      "explanation": "Client LocalScripts lack server authority over respawn logic.",
      "correctApproach": "Manage active checkpoint state strictly inside server Scripts."
    }
  ],
  summary: "You collected Obby progress: server checkpoints only go forward, respawn at the last CP, ScreenGui with an index and timer, Finish stops the time. The framework is ready for while-platforms in 5.4 and Badge at the same FinishLine in 5.10.",
  practiceTask: {
    title: "Practice for 5.3 - Checkpoints + timer + GUI",
    difficulty: "beginner",
    description: `**Goal:** three CPs, honest respawn, GUI, and timer to Finish.

Part A - Parts (7 min)
1. Checkpoint_01…03 on the route.
2. FinishLine at the end.
3. Different colors, Anchored true.

Part B - Server (15 min)
1. CheckpointIndex on Player.
2. Touched + debounce + forward only + save CFrame.
3. CharacterAdded teleports to the last CP.

Part C - GUI and finish (13 min)
1. ProgressGui: CheckpointLabel + TimerLabel.
2. Timer mm:ss from start.
3. Finish stops the timer.
4. Save: Lesson 5.3 - Checkpoints Timer GUI.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the main goal of lesson 5.3?",
        options: [
          "GUI timer settings",
          "Checkpoints, respawn, timer, and GUI for Obby",
          "Between blows",
          "DataStore coins",
        ],
        correctAnswer: 1,
        explanation: "5.3 builds checkpoint, respawn, timer, and GUI.",
      },
      {
        id: "q2",
        type: MC,
        question: "Where to store LastCheckpoint / CheckpointIndex?",
        options: [
          "On the server in Player data",
          "Only in LocalScript variable",
          "In Lighting",
          "In Terrain",
        ],
        correctAnswer: 0,
        explanation: "Progress is stored on the server in player data.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why use debounce on the Touched checkpoint?",
        options: [
          "To delete FinishLine",
          "To speed up Humanoid",
          "To prevent standing on Part from spamming saves and the GUI",
          "To turn off Anchored",
        ],
        correctAnswer: 2,
        explanation: "Debounce does not allow the save and GUI to trigger again.",
      },
      {
        id: "q4",
        type: MC,
        question: "What does the rule 'forward only' mean?",
        options: [
          "newIndex <= current is ignored",
          "Always reset to 0",
          "CP works only in Studio",
          "The timer is counting down",
        ],
        correctAnswer: 0,
        explanation: "Returning to the previous CP does not roll back progress.",
      },
      {
        id: "q5",
        type: MC,
        question: "When to teleport to the checkpoint after death?",
        options: [
          "In Lighting.Changed",
          "In CharacterAdded after WaitForChild HumanoidRootPart",
          "Only in Edit Mode",
          "In the Bundle",
        ],
        correctAnswer: 1,
        explanation: "Teleport occurs after the appearance of the new Character and its HumanoidRootPart.",
      },
      {
        id: "q6",
        type: MC,
        question: "Which ResetOnSpawn is convenient for ProgressGui?",
        options: [
          "true always",
          "false, so as not to multiply GUIs and subscriptions",
          "necessarily nil",
          "Only on mobile",
        ],
        correctAnswer: 1,
        explanation: "false prevents duplication of the GUI and subscriptions on each respawn.",
      },
      {
        id: "q7",
        type: MC,
        question: "What should the LocalScript do with CheckpointIndex?",
        options: [
          "Only read the Value and draw the text",
          "Assign index = 99 to yourself",
          "Remove hazards",
          "Create leaderstats",
        ],
        correctAnswer: 0,
        explanation: "The client only displays the value, it does not change it.",
      },
      {
        id: "q8",
        type: MC,
        question: "Why is there a timer in 5.3?",
        options: [
          "Replace checkpoint",
          "Show level completion time",
          "Increase WalkSpeed",
          "Delete SpawnLocation",
        ],
        correctAnswer: 1,
        explanation: "The timer shows the player the level completion time.",
      },
      {
        id: "q9",
        type: MC,
        question: "Should the timer reset at each checkpoint?",
        options: [
          "So always",
          "No - this is the time of the whole passage, not of a segment",
          "Yes, otherwise the GUI does not work",
          "Only on CP_01",
        ],
        correctAnswer: 1,
        explanation: "The timer counts the entire run, not a separate segment between CPs.",
      },
      {
        id: "q10",
        type: MC,
        question: "What to do at the FinishLine today?",
        options: [
          "AwardBadge immediately",
          "Open the store",
          "Stop the timer and mark as Finished",
          "Delete all CP",
        ],
        correctAnswer: 2,
        explanation: "FinishLine in 5.3 only stops the timer and records the completion.",
      },
      {
        id: "q11",
        type: MC,
        question: "How does the checkpoint interface with hazard 5.2?",
        options: [
          "After death, respawn at the last CP, the debounce hazard remains",
          "Hazard turns off all CP",
          "CP cancels CanCollide in the bench",
          "A new map is needed",
        ],
        correctAnswer: 0,
        explanation: "Checkpoint and hazard-debounce have been working together without conflicts since 5.2.",
      },
      {
        id: "q12",
        type: MC,
        question: "What is NOT the goal of 5.3?",
        options: [
          "Three checkpoints",
          "GUI with index",
          "Full juice at the checkpoint",
          "Timer mm:ss",
        ],
        correctAnswer: 2,
        explanation: "Juice is not version 5.3, it is added in 5.9.",
      },
      {
        id: "q13",
        type: MC,
        question: "How does 5.3 prepare 5.4?",
        options: [
          "While-platforms are placed after CP so that training does not require a full restart",
          "5.4 removes GUI",
          "Platforms replace all CPs",
          "Config is no longer needed",
        ],
        correctAnswer: 0,
        explanation: "Checkpoint makes the following while-platforms safer for learning.",
      },
      {
        id: "q14",
        type: MC,
        question: "Why is there an offset of +3 studs on Y during respawn?",
        options: [
          "To increase WalkSpeed",
          "To avoid getting stuck in CP geometry",
          "To turn off the timer",
          "To create a Badge",
        ],
        correctAnswer: 1,
        explanation: "A slight upward shift prevents the character from getting stuck in the geometry.",
      },
      {
        id: "q15",
        type: MC,
        question: "What is the exact name of Save?",
        options: [
          "Lesson 5.2 - Hazards",
          "Lesson 5.4 - Moving Platforms",
          "Lesson 5.3 - Hazards",
          "Lesson 5.3 - Checkpoints Timer GUI",
        ],
        correctAnswer: 3,
        explanation: "Practice 5.3 ends with saving Lesson 5.3 - Checkpoints Timer GUI.",
      },
    ],
  },
}

export const enLesson54 = {
  lessonId: "lesson-roblox-5-4",
  moduleId: "module-05",
  order: 4,
  title: "5.4 - while-platforms + Config",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Run a server-side while true that moves the platform between two positions",
    "Keep waitUp, waitDown, and offset in the PlatformConfig table",
    "Link several platforms with a for loop over Config without copy-pasting the Script",
    "Make the timing readable: the player sees the loop and has time to jump",
    "Prepare the Config as a balance lever for the difficulty curve in 5.7",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 32 of 92)",
        content: `In 5.3 you collected checkpoints, a timer, and GUI. Today Obby gets movement over time: platforms that appear, disappear, or move back and forth in a \`while\` cycle.

The genre remains Obby: the player reads the platform's rhythm and jumps into the safety window.

|Was in 5.3|Becomes in 5.4|
|----------|----------|
|Static Parts and checkpoints|Parts with repeatable timing|
|Difficulty only from gap and hazard|Difficulty also in time|
|Numbers scattered in code|Numbers in Config|`,
      },
      {
        title: "Why use while instead of a one-time animation",
        content: `Obby requires an infinite loop on the server while the game is running. The player can come on the 10th or 100th second - the platform still needs to move according to the rule.

|Approach|When to use|
|------|----------|
|\`while true do ... task.wait() end\`|Repeated game loop of the platform|
|Tween once|One-time effect (door opening, flash)|
|RunService.Heartbeat every frame|Precise movement, but more complex for the first lesson|`,
      },
      {
        title: "Two platform patterns",
        content: `Choose one pattern for the platform. Do not mix everything in one Part unnecessarily.

|Pattern|What you change|Feeling|
|------|---------------|-------|
|Blink|CanCollide + Transparency|"Catch the moment while there's still a floor"|
|Shuttle|Position / CFrame between A and B|"Jump on the lift and ride down"|`,
      },
      {
        title: "PlatformConfig: numbers in one place",
        content: `Config - a table from which the loop reads timings. Tomorrow in 5.7 you will change the numbers without rewriting the logic.

\`\`\`
local PlatformConfig = {
  { id = "Moving_01", kind = "blink", waitUp = 2.0, waitDown = 1.5 },
  { id = "Moving_02", kind = "shuttle", waitUp = 1.2, waitDown = 1.2, offset = Vector3.new(0, 0, 12) },
}
\`\`\`

|Field|Purpose|
|----|------|
|id|Name of the Part in Workspace / Folder Platforms|
|kind|blink or shuttle|
|waitUp|How many seconds in the "safe" / extreme state A|
|waitDown|How many seconds in state B|
|offset|Offset for shuttle (optional)|`,
      },
      {
        title: "One while for one platform",
        content: `Minimum blink on the server:

\`\`\`
local part = workspace.Platforms.Moving_01
while true do
part.CanCollide = true
part.Transparency = 0
task.wait(2)
part.CanCollide = false
part.Transparency = 0.8
task.wait(1.5)
end
\`\`\`

After Config, substitute numbers from the table. Do not hardcode 2 and 1.5 in five places.

Shuttle idea:

\`\`\`
local start = part.Position
local finish = start + offset
while true do
part.Position = finish
task.wait(waitUp)
part.Position = start
task.wait(waitDown)
end
\`\`\`

Step-like Position for training is fine. Smooth Tween can be added later; today the important thing is a predictable cycle, not cinematic.

If the player stands on the platform while CanCollide is false - they will fall. This is gameplay blink. Place a hazard or a soft pit under it deliberately.

**Do this now (8 min):** run while for Moving_01 in Play and make sure the cycle repeats without Output errors.`,
      },
      {
        title: "for by Config: several platforms without copy-paste",
        content: `Copying the Script to each Part is a path to desynchronization: you change the timing in one, forget in the other.

Better:

\`\`\`
for _, cfg in ipairs(PlatformConfig) do
task.spawn(function()
local part = workspace.Platforms:WaitForChild(cfg.id)
while true do
-- blink or shuttle per cfg.kind
task.wait(cfg.waitUp)
-- second state
task.wait(cfg.waitDown)
end
end)
end
\`\`\`

\`\`\`
task.spawn
\`\`\`
gives each platform its own while, so that one does not block the other. Without spawn, the second loop will never start if the first while true is eternal.

Check the names: cfg.id must match the Part Name. WaitForChild will save you from a loading race.

Don't run 20 while loops "just in case." Two or three platforms to deliver; extra entries in Config without Parts will cause hanging on WaitForChild or warn.

**Do this now (7 min):** connect both platforms through for + task.spawn from one PlatformConfig.`,
      },
      {
        title: "Readable timing: fair window",
        content: `The difficulty of the while-platform is in the window, not in invisibility.

|Symptom|Probable Cause|Fix in Config|
|-------|----------------|-------------|
|No one can keep up|waitUp is too short|Increase waitUp|
|Boring to wait|waitDown / waitUp are too long|Reduce pauses|
|Unclear when to jump|Transparency 1 = completely invisible|Transparency 0.5-0.8 in the "initial" state|
|Death seems random|No rhythm / different cycles chaotically|Same phases or explicit color|`,
      },
      {
        title: "Where to place platforms on the route",
        content: `While-platform - an event on the way, not a decoration in the corner.

| Good | Bad |
| --- | --- |
| After a checkpoint, with room to move | Immediately after Spawn without training |
| Over a visible pit / hazard | Over an endless void with no CP behind |
| One new idea at a time | Blink + shuttle + narrow gap all at once in the first Part |
| Color is different from the floor | Same Material as the safe ground |`,
      },
      {
        title: "Stability: Anchored, Pivot, errors",
        content: `Typical while-platform malfunctions:

|Problem|Fix|
|--------|----|
|Part falls|Anchored true|
|Loop runs once and stops|No while true or error before the next iteration|
|One platform moves, the other doesn't|Forgot task.spawn / second cfg.id|
|Output red Infinite yield|Incorrect id in WaitForChild|
|Player 'sticks'|Rare: CFrame shift; try Position or shorter offset|`,
      },
      {
        title: "Connection with checkpoint and hazards",
        content: `While-platform is in the network of systems 5.2-5.3.

- A checkpoint before a difficult platform reduces frustration from learning the timing.

- Hazard under blink must be visible (color), otherwise death is unfair.

- Debounce hazard remains from 5.2; the platform does not cancel it.

- GUI timer from 5.3 continues running - do not reset it on the while platform.

Do not open the secret door through while - this is confusing with 5.5. The secret will get a Prompt; platforms remain parkour.

If after death the platform is "not where" the player expected - this is normal for the loop. The problem is only if the loop stopped. Respawn should not reset Config.

**Do this now (3 min):** place or check the checkpoint before the first while-platform.`,
      },
      {
        title: "What NOT to do in 5.4",
          content: `
|Don't do now|When|
|-------------|----|
|Full juice on CP|5.9|
|15 unique Scripts without Config|Anti-pattern|
|waitUp = 0.1 as «hardcore»|Unfair; balance in 5.7|
|LocalScript as the only platform movement|Desync between players|
|Full juice Sound on loop|5.9|
|DataStore timing|unnecessary|`,
      },
      {
        title: "Playtest Cycle",
        content: `| # | Action | Expectation |
| --- | --- | --- |
| 1 | Play 20 s near Moving_01 | Cycle repeats |
| 2 | Jump into the safe window | Success without “lottery” |
| 3 | Wait for the full cycle before jumping | Rhythm is readable |
| 4 | Moving_02 with Config | Different timing, same code |
| 5 | Death and respawn at CP | Platforms continue spinning |
| 6 | Output | No infinite yield / spam |
| 7 | Change waitUp in Config by +0.5 | Behavior changed without editing while |`,
      },
      {
        title: "Checklist for submission and what comes next",
        content: `Before Save:
- [ ] Minimum 2 while-platforms on the route
- [ ] PlatformConfig with waitUp/waitDown (and offset for shuttle)
- [ ] for + task.spawn or equivalent without copy-pasting logic
- [ ] Anchored true, cycle stable 30+ s
- [ ] Readable timing (not 0.1 s window)
- [ ] Checkpoint before the first difficult platform is desirable
- [ ] Save: Lesson 5.4 - Moving Platforms

Next 5.5 - Secrets + key-door: the main path already has a rhythm; the secret will remain optional. In 5.6 the tester will evaluate whether the while loop is understandable without hints. In 5.7 you will tweak the Config itself as the lever of the difficulty curve.

**Do this now (2 min):** Save Place as Lesson 5.4 - Moving Platforms.`,
      },
    ],
  },
    commonMistakes: [
    {
      "mistake": "Studio freezes immediately upon launching Play mode",
      "explanation": "The while true loop is missing a task.wait() call.",
      "correctApproach": "Always include task.wait(interval) inside repeating platform loops."
    },
    {
      "mistake": "Player slips off moving platforms during motion",
      "explanation": "Moving platforms by modifying Position directly breaks character physics friction.",
      "correctApproach": "Use TweenService or Constraints for smooth kinematic platform movement."
    },
    {
      "mistake": "Disappearing platforms vanish abruptly without player warning",
      "explanation": "Transparency and collision drop to 0 with zero telegraphing.",
      "correctApproach": "Add a 0.5s flash or fade animation before setting CanCollide = false."
    }
  ],
  summary: "You assembled the Obby while-platforms with PlatformConfig: at least two loops, for + task.spawn, readable waitUp/waitDown. The Config is ready to become a balance controller in 5.7 without rewriting the logic.",
  practiceTask: {
    title: "Practice for 5.4 - while platforms + Config",
    difficulty: "beginner",
    description: `**Goal:** gather rhythmic while-platforms and move the timing to Config.

Part A - Planning (8 min)
1. Open Place from 5.3.
2. Mark two spots where a static jump can be replaced with a rhythmic platform.
3. Write down what rhythm should be readable for the player.

Part B - Build (15 min)
1. Add at least two while-platforms to the route.
2. Move waitUp / waitDown into Config or a separate table with parameters.
3. Make sure that platforms do not disappear without reason.

Part C - Retest (7 min)
1. Go through the route again and make sure the rhythm is readable.
2. Change one timing in Config and check the behavior.
3. Save: Lesson 5.4 - Moving Platforms.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the main goal of lesson 5.4?",
        options: [
          "Changing timings through the DataStore",
          "While-platforms Obby with timing in Config",
          "Coin progress DataStore",
          "Delete all checkpoints",
        ],
        correctAnswer: 1,
        explanation: "5.4 builds while-platforms with timing in Config.",
      },
      {
        id: "q2",
        type: MC,
        question: "Why does while true require task.wait?",
        options: [
          "Otherwise, an empty loop lags the server",
          "Without the wait Part, it cannot be Anchored",
          "wait creates a Badge",
          "LocalScript does not exist otherwise",
        ],
        correctAnswer: 0,
        explanation: "Without delay, the infinite loop overloads the server.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why PlatformConfig?",
        options: [
          "Paint Skybox",
          "Replace Humanoid",
          "Keep waitUp/waitDown in one place for iterations",
          "Turn off Touched",
        ],
        correctAnswer: 2,
        explanation: "The config centralizes platform timings for easier setup.",
      },
      {
        id: "q4",
        type: MC,
        question: "Why is task.spawn in for by platform?",
        options: [
          "So that each while works in parallel",
          "To delete Config",
          "For the platforms to become LocalScript",
          "To turn off Anchored",
        ],
        correctAnswer: 0,
        explanation: "task.spawn allows each platform to have its own independent cycle.",
      },
      {
        id: "q5",
        type: MC,
        question: "What does the blink platform change by default?",
        options: [
          "Player's MaxHealth",
          "CanCollide and Transparency on a schedule",
          "SoundService Volume globally",
          "Name Place",
        ],
        correctAnswer: 1,
        explanation: "The Blink platform cyclically switches CanCollide and Transparency.",
      },
      {
        id: "q6",
        type: MC,
        question: "Where should the platform's logic be executed?",
        options: [
          "Only in the LocalScript of one player",
          "In Script on the server",
          "In Lighting without Script",
          "In the Bundle Marketplace",
        ],
        correctAnswer: 1,
        explanation: "The state of the platform must be the same for everyone, so the server counts.",
      },
      {
        id: "q7",
        type: MC,
        question: "Which waitUp is the worst for a first learning platform?",
        options: [
          "2.0 s",
          "1.8 s",
          "2.5 s",
          "0.15 s",
        ],
        correctAnswer: 3,
        explanation: "0.15 s is too fast for a beginner to understand the rhythm.",
      },
      {
        id: "q8",
        type: MC,
        question: "What to do if WaitForChild hangs with an infinite yield?",
        options: [
          "Check the id in Config and Name Part",
          "Increase Volume",
          "Delete all while",
          "Set the correct answer for the quiz to 0",
        ],
        correctAnswer: 0,
        explanation: "The most common reason is a mismatch between the id in Config and the Name Part.",
      },
      {
        id: "q9",
        type: MC,
        question: "How does 5.4 prepare 5.7?",
        options: [
          "5.7 removes Config",
          "The difficulty curve will twist waitUp/waitDown like a lever",
          "Platforms move randomly without timing",
          "Platforms are no longer needed",
        ],
        correctAnswer: 1,
        explanation: "In 5.7 the same Config parameters will become levers of difficulty.",
      },
      {
        id: "q10",
        type: MC,
        question: "Why is it bad to place the first while-platform directly on Spawn without training?",
        options: [
          "SpawnLocation then disappears",
          "A beginner does not yet read the rhythm - high risk of hitting the wall at the start",
          "while is prohibited near Spawn",
          "Config does not work in biome 1",
        ],
        correctAnswer: 1,
        explanation: "An overly early complex rhythm scares off a new player.",
      },
      {
        id: "q11",
        type: MC,
        question: "What should remain true on a moving platform?",
        options: [
          "Anchored",
          "Looped in Sound",
          "CanQuery = false always",
          "Material = Neon mandatory",
        ],
        correctAnswer: 0,
        explanation: "The platform should remain Anchored, even changing other properties.",
      },
      {
        id: "q12",
        type: MC,
        question: "What proof is there that Config is actually connected?",
        options: [
          "Changing waitUp immediately changes the cycle in Play",
          "Part renamed manually",
          "Changed the sky to Lighting",
          "Added Decal",
        ],
        correctAnswer: 0,
        explanation: "The working connection of the Config cycle is visible by the change in behavior in Play.",
      },
      {
        id: "q13",
        type: MC,
        question: "What is NOT the goal of 5.4?",
        options: [
          "Two while-platforms",
          "PlatformConfig",
          "Stable cycle without Output spam",
          "Constant Enabled on ParticleEmitter",
        ],
        correctAnswer: 3,
        explanation: "This is not included in topic 5.4.",
      },
      {
        id: "q14",
        type: MC,
        question: "How does the while-platform interface with 5.3?",
        options: [
          "Removes the timer GUI",
          "Checkpoint in front of a complex platform reduces training rage",
          "Replaces all checkpoint with while",
          "Turns off respawn",
        ],
        correctAnswer: 1,
        explanation: "Checkpoint from 5.3 reduces the cost of error on a complex platform.",
      },
      {
        id: "q15",
        type: MC,
        question: "What is the exact name of Save?",
        options: [
          "Lesson 5.3 - Checkpoints",
          "Lesson 5.5 - Secrets Key Door",
          "Lesson 5.4 - Hazards",
          "Lesson 5.4 - Moving Platforms",
        ],
        correctAnswer: 3,
        explanation: "Practice 5.4 ends with saving Lesson 5.4 - Moving Platforms.",
      },
    ],
  },
}

export const enLesson55 = {
  lessonId: "lesson-roblox-5-5",
  moduleId: "module-05",
  order: 5,
  title: "5.5 - Secrets + key-door",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Design an optional secret that does not block the main path to Finish",
    "Create a Key Part and Door Part with clear names and a readable hint",
    "Open the door via ProximityPrompt only if the key exists on the server",
    "Store the state of HasKey and Open on the server without LocalScript as truth",
    "Prepare the secret for playtest 5.6: available without the Finish key",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 33 of 92)",
        content: `In 5.4 you added while-platforms from Config. The main Obby route already knows how to teach, punish, and return to the checkpoint. Today you are adding an optional exploration layer: a secret with a key and doors.

This is not an obligatory dead end. The secret rewards curiosity. If the player misses it, they still have to reach the Finish along the main path.

|In 5.4|Becomes in 5.5|
|----------|----------|
|Main route with platforms|The same route + side secret|
|No exploration|Key → door → reward or shortcut|
|Everything is mandatory|Secret is optional|`,
      },
      {
        title: "Secret vs mandatory knot",
        content: `Obby has two types of content.

| Type | Role | Rule |
| --- | --- | --- |
| Main path | Spawn → Finish | Must be completed without secrets |
| Secret | Side route or reward | Does not block the main path |

Bonus, shortcut, room - optional; skipping does not break the game.`,
      },
      {
        title: "Where to place the key and the door",
        content: `Placement determines whether a secret is perceived as a discovery or a disappointment.

| Element | Good | Bad |
| --- | --- | --- |
| Key | Barely noticeable alcove, different color/shape | Under a transparent Part with no hint |
| Door | Visible from the main path, but a bypass exists | Only way through a narrow corridor |
| Hint | Billboard "?", Neon outline, slightly different Material | Full text "press E through the wall" covering the entire screen |
| Distance | 10-40 studs from main path | At the other end of the map for no reason |`,
      },
      {
        title: "ProximityPrompt: intentional action",
        content: `For a key and doors, ProximityPrompt is better than bare Touched. The player consciously presses E (or a button on the UI), rather than accidentally picking up a key with their shoulder.

| Property | Recommendation |
| --- | --- |
| ActionText | "Take key" / "Open" |
| ObjectText | "Key" / "Secret door" |
| MaxActivationDistance | 8-12 |
| HoldDuration | 0 or 0.3 |
| RequiresLineOfSight | true, if you don't want clicks through walls |`,
      },
      {
        title: "Server truth: HasKey and Open",
        content: `The state 'the player has a key' lives on the server. A LocalScript can draw an icon, but it does not decide whether the door will open.

Simple option on the Player:

\`\`\`
local hasKey = Instance.new("BoolValue")
hasKey.Name = "HasKey"
hasKey.Value = false
hasKey.Parent = player
\`\`\`

Or an Attribute on the player: \`player:SetAttribute("HasKey", true)\`.

For doors:

\`\`\`
door:SetAttribute("Open", false)
\`\`\`

When the Prompt is triggered on the server:

- Check the player and Character.

- If HasKey == false - return or short feedback 'key required'.

- If true - Open = true, CanCollide false / Transparency 1 / Destroy the door / Tween aside.

- Optionally reset the key or leave it as 'used'.

Why not LocalScript: the client can say 'I already have the key' without actually picking it up. In 5.10 Badge and in M6 Coins it’s the same habit - the server decides the reward.

**Do this now (4 min):** in a Script on the server, create HasKey for the player in PlayerAdded and check print on change.`,
      },
      {
        title: "Key selection",
        content: `Minimal server template for Key:

\`\`\`
local key = workspace.Secrets.Key_01
key.Touched:Connect(function(hit)
local character = hit.Parent
local player = game.Players:GetPlayerFromCharacter(character)
if not player then return end
local hasKey = player:FindFirstChild("HasKey")
if not hasKey or hasKey.Value then return end
hasKey.Value = true
key:Destroy() -- or Transparency = 1, CanTouch = false
end)
\`\`\`

Debounce is needed if the Key remains in the world: multiple Touched events per frame should not spam. If Destroy happens immediately, the second call will no longer find the Part.

Do not put the key in the Character as the single source of truth without a server flag: after the Character dies, it will disappear, and the "key in hand" will be lost along with the body if you do not save the state on the Player.

Visual feedback: a short ParticleEmitter Emit or a UI color change later. Today, just make the key disappear and change the BoolValue. Full-level juice will be in 5.9.

**Do this now (6 min):** connect Touched or Prompt on Key_01 so that HasKey becomes true once and the key disappears.`,
      },
      {
        title: "Opening the door",
        content: `Prompt on the door listens for Triggered on the server:

\`\`\`
local prompt = door:WaitForChild("ProximityPrompt")
prompt.Triggered:Connect(function(player)
local hasKey = player:FindFirstChild("HasKey")
if not hasKey or not hasKey.Value then return end
if door:GetAttribute("Open") then return end
door:SetAttribute("Open", true)
door.CanCollide = false
door.Transparency = 1
prompt.Enabled = false
end)
\`\`\`

Alternative: TweenPosition the door aside, Anchor remains true. Destroy is also okay if the door is no longer needed.

Anti-duplicate: Open Attribute or prompt.Enabled = false after the first success. Otherwise, Triggered clicks the “empty” door again.

Without a key, the Prompt can remain visible - this is a hint “you can go here, but later.” Or change the ObjectText to “Key required.” Do not teleport or kill the player for attempting without a key.

**Do this now (6 min):** open the door only with HasKey true; without the key, Triggered doesn’t break anything.`,
      },
      {
        title: "What's Behind the Door: Reward Without a Blocker",
        content: `There should be a reason to go through the door, but it is not the only path forward.

| Reward | Plus | Minus, if made mandatory |
| --- | --- | --- |
| Shortcut to the next biome | Feeling of 'I found a faster way' | Without the key, the long path should remain |
| Room with decor/view | Atmosphere | An empty room disappoints |
| Bonus checkpoint | Less repetition after death | Does not replace main CPs |
| Coin/badge later | Motivation | Do not affect M6 economy now |`,
      },
      {
        title: "Spoiler-free hints",
        content: `A secret that no one finds is dead content. A secret that screams "click here" is no longer a secret.

| Hint Balance | Example |
| --- | --- |
| Too little | The color key of the floor |
| Enough | Slightly different shade / shape |
| Too much | Huge billboard with instructions |`,
      },
      {
        title: "Death, respawn, and the key",
        content: `Obby kills often. The secret must survive death honestly.

| Approach | Behavior |
| --- | --- |
| HasKey on Player | After death, the key remains in the 'state inventory' |
| Key only in Character | After death, the state is lost unless saved |
| Key respawns in the world | Can be picked up again if the door is still closed |
| Door already Open | Remains open for everyone or only for the owner |`,
      },
      {
        title: "Playtest of the secret before 5.6",
        content: `Short honest test today, full bug list - tomorrow.

| # | Action | Expectation |
| --- | --- | --- |
| 1 | Go to Finish without the key | Passage possible |
| 2 | Find the key by hint | HasKey true, key disappears |
| 3 | Door prompt without key | Nothing critical breaks |
| 4 | Prompt with key | Door opens once |
| 5 | Repeat Prompt | No spam / errors |
| 6 | Death after key | Key or door state correct |
| 7 | Output | No red spam |`,
      },
      {
        title: "What NOT to build in 5.5",
        content: `| Do not do now | When it will come |
| --- | --- |
| Full shop / Coins economy | M6 |
| Badge for secret | 5.10 for finish; separate badge - optional later |
| Juice Sound/Particles for the whole level | 5.9 |
| Mandatory key on Finish | never in this course |
| Complex inventory with 10 items | M4 / hub later |
| DataStore saving key between sessions | not needed for 5.5 |`,
      },
      {
        title: "Checklist for submission and bridges up to 5.6",
        content: `Before Save:
- [ ] Folder Secrets with Key_01 and Door_01
- [ ] Secret does not block Finish without the key
- [ ] ProximityPrompt on doors with clear ActionText
- [ ] HasKey on the server (BoolValue or Attribute)
- [ ] Doors open once with a valid key
- [ ] After death, the state of the key/doors is checked
- [ ] There is a minimal hint without the author's hint
- [ ] Save: Lesson 5.5 - Secrets Key Door

Next 5.6 - Playtest #1 + bug list. The tester will go without your words: whether they find the key, run into the doors, or reach the Finish without the secret. Record these observations as separate lines in the bug list.

In 5.7 the difficulty curve can ease the approach to the secret if it is too strict, but will not make the secret mandatory. In 5.9 you will add a short sound for picking up the key and opening the doors.

**Do this now (2 min):** Save Place as Lesson 5.5 - Secrets Key Door.`,
      },
    ],
  },
    commonMistakes: [
    {
      "mistake": "Key item can be collected infinitely many times",
      "explanation": "The key is neither destroyed nor tagged with a collected attribute upon touch.",
      "correctApproach": "Call keyPart:Destroy() or set an attribute keyPart:SetAttribute(\"Collected\", true)."
    },
    {
      "mistake": "Secret door opens for every server player when only one player finds the key",
      "explanation": "Door opens globally on the server without player inventory verification.",
      "correctApproach": "Verify key ownership before unlocking or toggle locally on the client."
    },
    {
      "mistake": "Secret area is completely undetectable without trial-and-error guessing",
      "explanation": "No visual telegraphing is provided to reward observant players.",
      "correctApproach": "Add subtle hints such as distinct wall tints, particle sparks, or floor markings."
    }
  ],
  summary: "You added the optional secret Obby: Key and Door with ProximityPrompt, server-side HasKey, and one-time opening. The main path to Finish remains accessible without the key - ready for an honest playtest in 5.6.",
  practiceTask: {
    title: "Practice for 5.5 - Secrets + key-door",
    difficulty: "beginner",
    description: `**Goal:** one optional secret that does not block Finish.

Part A - Scene (10 min)
1. Folder Secrets: Key_01 and Door_01.
2. Pose the main path; The door is visible from the main route.
3. Add one visual hint to each object.

Part B - Server Logic (15 min)
1. HasKey on Player (BoolValue or Attribute).
2. Key guessing → HasKey true, the key disappears.
3. Prompt on the door opens only with the key; Open once.

Part C - Inspection (10 min)
1. Finish without key.
2. Key → door → reward/bypass.
3. Death after the key.
4. Save: Lesson 5.5 - Secrets Key Door.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "The main role of the secret in lesson 5.5?",
options: [
          "The only way to reach the Finish",
          "Mandatory key on Finish",
          "Optional study with a key and doors",
          "Replacement of all checkpoints",
        ],
        correctAnswer: 2,
        explanation: "Secret 5.5 - optional study with a key and doors.",
      },
      {
        id: "q2",
        type: MC,
        question: "How to check that the secret is not a blocker?",
        options: [
          "Delete Key and Door imaginatively: Finish is still achievable",
          "Make the key mandatory on Spawn",
          "Place a door in front of each biome",
          "Disable all hazards",
        ],
        correctAnswer: 0,
        explanation: "The main route must remain passable without a secret.",
      },
      {
        id: "q3",
        type: MC,
        question: "Where should the HasKey truth live?",
        options: [
          "Only in LocalScript GUI",
          "In the Workspace comment",
          "In Lighting",
          "On the server: BoolValue or Attribute player",
        ],
        correctAnswer: 3,
        explanation: "The state of the key is checked by the server, not the client.",
      },
      {
        id: "q4",
        type: MC,
        question: "Why is ProximityPrompt convenient for doors?",
        options: [
          "It automatically saves the DataStore",
          "The player performs a deliberate action, not a random Touched",
          "Prompt only works in Edit Mode",
          "He replaces Humanoid",
        ],
        correctAnswer: 1,
        explanation: "The prompt requires conscious interaction from the player.",
      },
      {
        id: "q5",
        type: MC,
        question: "What should happen when opening the door with a key?",
        options: [
          "Open once: CanCollide/Transparency or Tween, Prompt disabled",
          "The door kills the player",
          "The entire biome 2 is being removed",
          "All checkpoints are being dropped",
        ],
        correctAnswer: 0,
        explanation: "The doors open once and turn off the Prompt.",
      },
      {
        id: "q6",
        type: MC,
        question: "What to do if Triggered without a key?",
        options: [
          "Open the door anyway",
          "Teleport to Finish",
          "Do not break anything; optional short feedback 'key needed'",
          "Remove HasKey from all players",
        ],
        correctAnswer: 2,
        explanation: "Without the key, the door remains closed, only a brief feedback.",
      },
      {
        id: "q7",
        type: MC,
        question: "Where is the best place to hide the first secret?",
        options: [
          "On SpawnLocation instead of biome 1",
          "Off the main path, with visible doors and a slight hint",
          "As the only passage to biome 3",
          "Inside KillBrick",
        ],
        correctAnswer: 1,
        explanation: "The secret should be off the main route and noticeable.",
      },
      {
        id: "q8",
        type: MC,
        question: "Which of the rewards behind the doors is suitable for 5.5?",
        options: [
          "Full economy of Coins and DataStore",
          "Mandatory course badge",
          "The fourth biome on 100 Parts",
          "Short shortcut, room or bonus view with an exit to the main path",
        ],
        correctAnswer: 3,
        explanation: "The reward is a small bonus, not a separate economy or biome.",
      },
      {
        id: "q9",
        type: MC,
        question: "Why is it dangerous to hold a key only as a Part in a Character?",
        options: [
          "Character cannot contain Parts",
          "After the death, the Character disappears and the state is easily lost",
          "The prompt does not exist then",
          "ServerScriptService deletes Character",
        ],
        correctAnswer: 1,
        explanation: "The character is deleted upon death, so the state of the key must be saved separately.",
      },
      {
        id: "q10",
        type: MC,
        question: "Which hint is the best for passing?",
        options: [
          "The author explains the route aloud",
          "Huge text 'key behind the wall on the left'",
          "Slightly different color/shape and Prompt on the door",
          "Complete invisibility without any difference",
        ],
        correctAnswer: 2,
        explanation: "A light visual hint - a balance between concealment and readability.",
      },
      {
        id: "q11",
        type: MC,
        question: "What to check after death with a key already taken?",
        options: [
          "That HasKey or Open remain valid for doors",
          "That all the Sounds were deleted",
          "What Finish disappeared",
          "That the platform Config has been reset",
        ],
        correctAnswer: 0,
        explanation: "The state of the key must survive the death and respawn of the player.",
      },
      {
        id: "q12",
        type: MC,
        question: "What NOT to do at a minimum of 5.5?",
        options: [
          "One Key and one Door",
          "Server-side HasKey check",
          "Full juice on all hazards and a coin shop",
          "Playtest Finish without a key",
        ],
        correctAnswer: 2,
        explanation: "Juice and coin economy - beyond the minimum of 5.5.",
      },
      {
        id: "q13",
        type: MC,
        question: "How does 5.5 cook 5.6?",
        options: [
          "5.6 Removes all secrets",
          "The tester will check optionality, hints, and the Prompt without the author's hints",
          "The baglist is no longer needed",
          "5.6 conduct playtest",
        ],
        correctAnswer: 1,
        explanation: "In 5.6, an independent tester checks the secret without the author's hints.",
      },
      {
        id: "q14",
        type: MC,
        question: "What genre is this lesson?",
        options: [
          "Simulator with coins",
          "Tycoon with a dropper",
          "Simulator with Coins",
          "Obby with an optional secret",
        ],
        correctAnswer: 3,
        explanation: "The lesson remains in the Obby genre, adding an optional secret.",
      },
      {
        id: "q15",
        type: MC,
        question: "What is the exact name of Save?",
        options: [
          "Lesson 5.5 - Secrets Key Door",
          "Lesson 5.4 - Platforms",
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.5 - Respawn System",
        ],
        correctAnswer: 0,
        explanation: "Practice 5.5 concludes with saving Lesson 5.5 - Secrets Key Door.",
      },
    ],
  },
}

export const enLesson56 = {
  lessonId: "lesson-roblox-5-6",
  moduleId: "module-05",
  order: 6,
  title: "5.6 - Playtest #1 + buglist",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Conduct the first full Obby playtest without hints for the author or tester",
    "Record bugs with expected, actual, reproduce steps and proof",
    "Distribute problems by category and priority P0-P3",
    "Fix one cause at a time and do a short regression retest",
    "Prepare a verified baglist as input data for the difficulty curve in 5.7",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 34 of 92)",
        content: `In 5.5 you added a secret, a key, and a door to the Obby. The map already has three biomes, hazards, checkpoints, a timer, GUI, while-platforms, and an optional route. Today you are not building a new mechanic. You are checking if all these systems survive a full run from Spawn to Finish.

Playtest #1 - the first honest encounter of the game with a player. The author knows every jump, hidden key, and platform timing. The tester does not know this. That’s why their mistakes are more useful than your "it works for me."

|Was in 5.5|Becomes in 5.6|
|----------|----------|
|The author knows the route|An unfamiliar player checks readability|
|Mechanics were tested separately|One run checks them together|
|"Seems to work"|A table with evidence and priorities|`,
      },
      {
        title: "Why can't the author be the sole tester",
        content: `You have completed your Obby dozens of times during its construction. Your brain already remembers where the platform will disappear, which Part is a KillBrick, and behind which wall the key lies. A new player only sees color, shape, and movement.

| Author's blind spot | What a beginner sees |
| --- | --- |
| “Obvious” first jump | Two identical routes without a marker |
| “Easy” platform timing | Unclear when it will move |
| “Notable” checkpoint | Decorative Part without feedback |
| “Logical” secret | Door without a hint to the key |
| “Fair” hazard | Death from a Part of the same color as the floor |`,
      },
      {
        title: "Freeze the build before the test",
        content: `Do not change Parts, Config, and Scripts in the middle of a run. Otherwise, the first half of the test will take place on Build A, the second - on Build B, and the results cannot be compared.

| Field | Example |
| --- | --- |
| Build | 5.6-A |
| Save | Lesson 5.6 - Playtest 1 Buglist |
| Date / Time | 19.07, 17:30 |
| Tester | name or Tester 1 |
| Device | PC / laptop / mobile |
| Starting state | new server, Spawn of biome 1 |`,
      },
      {
        title: "Roles: the tester plays, the author observes",
        content: `Before Play, agree on simple roles.

Tester:

- plays from Spawn to Finish;
- speaks out loud what they see and what they expect;
- does not try to be polite;
- after dying, explains why they think it happened.

Author-observer:

- does not give hints about the route, key, or timing;
- records time, deaths, pauses, and questions;
- asks to repeat an action if it needs to be reproduced;
- asks clarifying questions after the event, not during the jump.

Useful questions after a segment: “What did you think would happen?”, “What made you go there?”, “Why did this death feel fair or unfair?”. An unhelpful question: “You liked it, didn’t you?” - it pushes for a pleasant answer.

If there is no other person, do a self-test with limitations: start from a new server, do not use the Explorer, do not skip biomes, record the screen and comment on decisions out loud. This is weaker than a peer test, but better than quickly running through it by memory.

**Do this now (3 min):** give the tester one instruction: “Reach the finish and say what you expect. I do not give hints.”`,
      },
      {
        title: "Full run-through script",
        content: `The same scenario makes the results comparable. Do not teleport the tester immediately to the "interesting spot".

| Step | What to check |
| --- | --- |
| 1. Spawn | Is the direction to biome 1 clear |
| 2. First hazards | Is the danger readable before death |
| 3. Checkpoint | Is it visible that progress has been recorded |
| 4. Respawn | Does it return to the last checkpoint |
| 5. while-platform | Can the loop be read and wait for the window |
| 6. Key-door | Is the main path not blocked by a secret |
| 7. Biome 3 | Is it difficult due to skill, not randomness |
| 8. Finish | Does the timer stop and the result is clear |`,
      },
      {
        title: "Bug list: one line - one problem",
        content: `Bug list - not a list of "something weird." Each line should allow another person to find the problem without your memory.

| ID | Location | Expected | Actual | Steps | Priority | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| OBBY-01 | CP after biome 1 | Respawn here | Respawn at start | Touch CP → die | P1 | video 00:42 |
| OBBY-02 | DoorSecret | Open with key | Door remains closed | Take key → Prompt | P1 | screenshot |
| OBBY-03 | Moving_02 | 2 s cycle | Part freezes | Wait 3 cycles | P2 | Output line |`,
      },
      {
        title: "Priority P0-P3",
        content: `Priority answers the question "what to fix first," not "what annoys me the most."

| Level | Meaning | Example in Obby |
| --- | --- | --- |
| P0 | Progress is impossible for everyone | Finish is missing, server Script crashes |
| P1 | Core progress breaks often | Checkpoint does not save, doors block the main path |
| P2 | Progress is possible, but the experience is poor | Unfair gap, platform sometimes freezes |
| P3 | Cosmetics or a minor inconvenience | Part is crooked, text is slightly offset |`,
      },
      {
        title: "Reproduce steps and evidence",
        content: `A bug exists for the team only when you can see it again, or when there is enough evidence of a rare failure.

Good reproduce steps:

- Start a new server on Build 5.6-A.

- Touch Checkpoint_02.

- Fall into Lava_03.

- Check the respawn location.

- Actual: Spawn of biome 1; expected: Checkpoint_02.

Bad steps: "play a bit," "somewhere in the lava," "sometimes it does not work."

Evidence by strength:

- short video with a visible route;
- before/after screenshot;
- exact Output text with a timestamp;
- Properties or Attribute values during Play;
- a spoken "seems like" with no repeat is the weakest.

Do not record the tester's private data and do not capture more than you need. For the course, the Studio/Roblox screen and the Build number are enough.

If the bug did not reproduce, do not delete the entry. Mark Frequency: 1/3 or Cannot reproduce and keep the evidence. The cause may depend on respawn or event order.

**Do this now (5 min):** for the most important bug, run the steps twice and add Frequency 2/2, 1/2, or 0/2.`,
      },
      {
        title: "Categories: check the whole Obby, not only the code",
        content: `A category helps you see where debt has piled up.

|Category|What belongs there|
|---------|---------------|
|Gameplay|gap, collision, moving platform, hazard|
|Progress|checkpoint, respawn, finish, timer|
|Navigation|direction, biomes, goal visibility|
|Secret|key, door, Prompt, optionality|
|UI|timer, checkpoint label, text|
|Performance|lag, infinite loop, Output spam|
|Polish|color, sound, particles, alignment|`,
      },
      {
        title: "Watch behavior, not only errors",
        content: `The tester may not say "this is a bug," but their behavior already sends a signal.

Record:

- a pause over 5 seconds with no movement;
- looking again or turning back;
- three identical deaths in a row;
- trying to jump onto decoration instead of the route;
- ignoring a checkpoint or Prompt;
- the question "is it this way?";
- finding the secret by accident without understanding the reward.

Turn an observation into a hypothesis, not a verdict. "The tester stood for 8 seconds before biome 2" is a fact. "The entrance arrow is not contrasty enough" is a hypothesis. Check it with a second run or a targeted change.

Do not measure complex statistics today. For Playtest #1, completion time, deaths, pauses, and places that need a hint are enough. In 5.7 these data become a difficulty curve map.

A bug list is not a verdict on the game. It is a map of places where the game stopped talking to the player.

**Do this now (4 min):** add at least one behavioral observation to the bug list, even if the code showed no error.`,
      },
      {
        title: "Triage: one cause, one fix",
        content: `After the run, sort the entries and pick the first P0/P1. Do not grab every row at once.

Triage ritual:

- Confirm reproduce steps.

- Find the smallest likely cause.

- Change one thing.

- Retest that exact scenario.

- Write Fixed in Build 5.6-B or Reopen.

Example: respawn goes to the start. Do not move SpawnLocation, rewrite the GUI, and change the timer at the same time. First check whether the server saved the Checkpoint_02 number and whether CharacterAdded reads it.

For difficulty problems, do not rebuild the biome today. Record the exact place, death count, and hypothesis. In 5.7 you will change gap, width, timing, or checkpoint density one lever at a time.

Bug list statuses: Open, In progress, Fixed, Retest, Reopen, Won't fix (with a reason). "Fixed" before verification is only an assumption; after a change, set Retest.

**Do this now (6 min):** pick the highest P0/P1, make one minimal fix, and change the status to Retest.`,
      },
      {
        title: "Regression retest after a fix",
        content: `Regression checks that the fix did not break neighboring systems. After a checkpoint fix, touching the Part once is not enough.

Minimal regression set:

|Fix|What to repeat|
|----|------------|
|Checkpoint|touch → die → respawn → next CP|
|Hazard|normal touch, repeat touch, respawn|
|Moving platform|3 cycles, jump on/off the platform|
|Key-door|without key, with key, after respawn|
|Finish/timer|full start and correct stop|`,
      },
      {
        title: "Submission checklist and bridge to 5.7",
        content: `Before Save, check:
- [ ] Build 5.6-A is frozen before the test
- [ ] The tester completed the route without author hints
- [ ] Time, deaths, and the longest pause are recorded
- [ ] The bug list has at least 5 concrete entries
- [ ] Each entry has expected, actual, steps, category, and priority
- [ ] There is at least one piece of evidence: video, screenshot, or Output
- [ ] One P0/P1 is fixed, or you explained why there is none
- [ ] Regression retest is done on Build 5.6-B
- [ ] Difficulty observations are not masked by decoration
- [ ] Save: Lesson 5.6 - Playtest 1 Buglist

Next 5.7 - Difficulty curve. Take bugs like "too hard," "too easy," "unfair" and turn them into controlled changes to gap, width, timing, and checkpoint density. Do not start 5.7 with an empty bug list.

In 5.8 another person will do a control full run after your changes. In 5.9 Sound and Particles appear. In 5.10 - the final checkpoint and Ship + Badge. Today's document keeps this whole chain on facts.

**Do this now (2 min):** save the Place and bug list as Lesson 5.6 - Playtest 1 Buglist.`,
      },
    ],
  },
    commonMistakes: [
    {
      "mistake": "Testing only once by the developer without external blind playtests",
      "explanation": "Developers memorize obstacle timings and overlook novice friction points.",
      "correctApproach": "Conduct blind playtests with friends or test recordings to identify choke points."
    },
    {
      "mistake": "Ignoring red error messages in the Output log during playtesting",
      "explanation": "Hidden script errors can silently break respawn or scoring systems.",
      "correctApproach": "Resolve all Output warnings and errors before finalizing game balance."
    }
  ],
  summary: "You froze the Obby build, ran a full playtest without hints, recorded reproducible bugs with priority P0-P3, fixed one blocker, and confirmed it with a regression retest. The bug list is ready to become the difficulty curve map in 5.7.",
  practiceTask: {
    title: "Practice for 5.6 - Playtest #1 + bug list",
    difficulty: "beginner",
    description: `**Goal:** one honest Obby run, a bug list with evidence, and a verified fix.

Part A - Prep (7 min)
1. Save Build 5.6-A.
2. Create a table ID / Place / Expected / Actual / Steps / Category / Priority / Evidence.
3. Give the tester an instruction with no route hint.

Part B - Full run (15 min)
1. From Spawn to Finish with no teleports.
2. Record time, deaths, pauses, and questions.
3. Collect at least 5 concrete entries.

Part C - Triage and retest (13 min)
1. Sort P0 → P3.
2. Fix one P0/P1 with a minimal change in Build 5.6-B.
3. Repeat reproduce steps and a neighboring regression scenario.
4. Save: Lesson 5.6 - Playtest 1 Buglist.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Main result of lesson 5.6?",
        options: [
          "A new fourth biome",
          "Sound and ParticleEmitter on every event",
          "A reproducible bug list and a verified fix",
          "Public release without a retest",
        ],
        correctAnswer: 2,
        explanation: "5.6 delivers a reproducible bug list and a verified fix.",
      },
      {
        id: "q2",
        type: MC,
        question: "Why must the author not hint the tester?",
        options: [
          "A hint hides navigation and rule-clarity problems",
          "The tester must read code in ServerScriptService",
          "Any conversation stops Play Mode",
          "Hints automatically change difficulty",
        ],
        correctAnswer: 0,
        explanation: "Hints mask real level readability problems.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why freeze Build 5.6-A before the run?",
        options: [
          "To create a Badge automatically",
          "To forbid the tester from dying",
          "To enable Team Create",
          "So all observations refer to one unchanged build",
        ],
        correctAnswer: 3,
        explanation: "An unchanged build makes observations comparable.",
      },
      {
        id: "q4",
        type: MC,
        question: "Which bug entry is best?",
        options: [
          "Checkpoint is weird",
          "Touch CP_02 -> die -> respawn at start; expected CP_02",
          "It worked for me yesterday",
          "The tester cannot play",
        ],
        correctAnswer: 1,
        explanation: "Clear reproduce steps are the most useful entry format.",
      },
      {
        id: "q5",
        type: MC,
        question: "What is P0 for Obby?",
        options: [
          "Finish is unreachable because the main path is broken",
          "Timer text is shifted by a few pixels",
          "Decoration has a different Material",
          "One gap feels a bit easy",
        ],
        correctAnswer: 0,
        explanation: "P0 is a blocker that makes the level unpassable.",
      },
      {
        id: "q6",
        type: MC,
        question: "What to do with three identical tester deaths?",
        options: [
          "Delete the whole biome immediately",
          "Tell the correct timing and do not record it",
          "Mark the place as a possible difficulty or fairness defect",
          "Add particles without changing the jump",
        ],
        correctAnswer: 2,
        explanation: "Repeated death in the same place is a signal for difficulty analysis.",
      },
      {
        id: "q7",
        type: MC,
        question: "When can a problem get Fixed status?",
        options: [
          "Right after a code change without Play",
          "After repeating the steps and a successful retest",
          "When the author no longer remembers it",
          "After changing the table row color",
        ],
        correctAnswer: 1,
        explanation: "Fixed is confirmed only by retesting the same steps.",
      },
      {
        id: "q8",
        type: MC,
        question: "What to check after a checkpoint fix?",
        options: [
          "Only its color in Edit Mode",
          "Only the first touch without death",
          "Only Output before starting the server",
          "Touch, death, respawn, and move to the next checkpoint",
        ],
        correctAnswer: 3,
        explanation: "The full checkpoint cycle must be checked end-to-end.",
      },
      {
        id: "q9",
        type: MC,
        question: "Which statement about the 5.5 key-door is correct?",
        options: [
          "The key must block the main Finish",
          "Doors do not need testing after respawn",
          "The secret must be optional and must not break the main route",
          "Prompt automatically fixes all door bugs",
        ],
        correctAnswer: 2,
        explanation: "The secret from 5.5 stays optional and does not block Finish.",
      },
      {
        id: "q10",
        type: MC,
        question: "What is a fact, not a hypothesis?",
        options: [
          "The tester stood for 8 seconds before the biome 2 entrance",
          "The arrow is definitely too dark",
          "All beginners hate this biome",
          "The whole level must be rebuilt",
        ],
        correctAnswer: 0,
        explanation: "Measured time is an observed fact; the rest are value judgments.",
      },
      {
        id: "q11",
        type: MC,
        question: "What if the bug reproduced only once out of three?",
        options: [
          "Delete the entry as made up",
          "Mark Frequency 1/3 and keep the evidence",
          "Automatically set P3",
          "Declare the game fully ready",
        ],
        correctAnswer: 1,
        explanation: "Frequency is recorded as evidence, not discarded.",
      },
      {
        id: "q12",
        type: MC,
        question: "Which triage order is correct?",
        options: [
          "P3 -> P2 -> P1 -> P0",
          "The prettiest fix first",
          "All changes at once",
          "P0 -> P1 -> P2 -> P3",
        ],
        correctAnswer: 3,
        explanation: "The most critical P0 problems are fixed first.",
      },
      {
        id: "q13",
        type: MC,
        question: "Where should an unfair gap observation go?",
        options: [
          "Into the SoundId list for 5.9",
          "Into Game Settings before Public",
          "Into the bug list as input for difficulty curve 5.7",
          "Into BadgeService",
        ],
        correctAnswer: 2,
        explanation: "Observations feed the difficulty curve of the next lesson 5.7.",
      },
      {
        id: "q14",
        type: MC,
        question: "What should you not do mid-run on Build A?",
        options: [
          "Record deaths",
          "Change Parts or Config and continue the same test",
          "Note the tester's questions",
          "Keep video evidence",
        ],
        correctAnswer: 1,
        explanation: "Changes during the test make the build uncontrolled.",
      },
      {
        id: "q15",
        type: MC,
        question: "What is the exact Save name for lesson 5.6?",
        options: [
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.7 - Difficulty Curve",
          "Lesson 5.5 - Secret Door",
          "Lesson 5.6 - Playtest System",
        ],
        correctAnswer: 0,
        explanation: "Practice 5.6 ends with saving Lesson 5.6 - Playtest 1 Buglist.",
      },
    ],
  },
}

export const enLesson57 = {
  lessonId: "lesson-roblox-5-7",
  moduleId: "module-05",
  order: 7,
  title: "5.7 - Difficulty curve",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Turn the 5.6 bug list into a map of points where the difficulty curve breaks",
    "Tune gap, width, hazard timing, and checkpoint density as separate balance levers",
    "Change only one lever per iteration and record the numbers in Config",
    "Assign biomes teach, train, and exam roles without a full rebuild",
    "Run a Better/Same/Worse retest and prepare the build for the peer run in 5.8",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 35 of 92)",
        content: `In 5.6 you built a bug list from playtest #1: time, deaths, pauses, and entries like "too hard," "unfair," "unclear where to go." Today you do not rebuild the Obby from scratch. You smooth the difficulty curve - a sequence where difficulty rises predictably from biome 1 to the finish.

|Was in 5.6|Becomes in 5.7|
|----------|----------|
|"Everyone falls here"|A concrete gap or timing change|
|Author feelings|Before/after numbers in a table|
|A bug with no action|One edit + a short retest|`,
      },
      {
        title: "Input data: bug list as a map, not a junk pile",
        content: `A difficulty curve is built from playtest facts, not from "it feels easy to me." Take the 5.6 bug list and filter rows that are about balance:

|Signal in the bug list|What it means for the curve|
|-----------------|------------------------|
|Three deaths on one gap|Possible spike or too hard a jump after an easy block|
|Pause of 8+ seconds with no movement|Navigation or fear of the next step|
|"Unfair" after a hazard|Timing, platform width, or an invisible hitbox|
|"Too easy" in biome 3|The exam zone does not feel like a finale|
|Checkpoints ignored|The CP is not where the player actually gets stuck|`,
      },
      {
        title: "A difficulty curve is not a total redesign",
        content: `Beginner mistake: after a playtest, tear down biome 2 and rebuild it "prettier." That is a new level, not a curve. A curve is small, controlled shifts within the existing route.

What counts as curve today:

- gap between platforms (Position / Size on X or Z);
- passage width (platform Size);
- hazard timing (\`waitUp\`, \`waitDown\` in Config for while-platforms);
- checkpoint density (where you place the next CP after a hard block).

What does not count:

- a new fourth biome;
- replacing the entire key-door section;
- decor, Sound, ParticleEmitter (that is 5.9);
- Game Settings and Badge (5.10).

Imagine a difficulty graph across three biomes: the line should rise smoothly, with no vertical wall in the middle of the train zone. If biome 1 is easy, biome 2 is suddenly impossible, and biome 3 is easy again - that is not "interesting," it is a broken profile.

Lesson rule: no more than 20% of Parts in a biome per iteration. If you need to move more - split into two iterations with a retest between them.

**Do this now (3 min)**: for each biome, write one sentence "right now it feels like teach / train / exam or not."`,
      },
      {
        title: "Four balance levers",
        content: `In Obby SmartCode there are four main levers. Each changes the experience differently:

| Lever | Where it lives | What it changes | Typical mistake |
| --- | --- | --- | --- |
| Gap | Distance between platforms | Jump length | Change gap and width at the same time |
| Width | Part Size on X/Z | Landing area | Make it so narrow that the camera gets in the way |
| Hazard timing | \`PlatformConfig\` | Safe step window | waitUp = 0.1 "for hardcore" |
| CP density | Checkpoint Part placement | Cost of a mistake after a hard block | CP every 2 studs - exam disappears |`,
      },
      {
        title: "One change per iteration",
        content: `If in one iteration you shortened the gap, widened the platform, and reduced \`waitDown\`, the retest proves nothing. You do not know what helped.

Iteration ritual:

- Build 5.7-A (or B, C...) - Save before the change;
- change exactly one lever in one place;
- record Before / After in the table;
- self-retest: run the problem segment 3 times;
- rating: Better / Same / Worse;
- Save with the iteration number in Notes.

| Iteration | Build | Place | Lever | Before | After | Retest |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 5.7-A | Gap_07 | gap | 8 studs | 6 studs | Better |
| 2 | 5.7-B | Moving_03 | waitUp | 2.0 | 2.5 | Same |`,
      },
      {
        title: "Config numbers: a control panel without rewriting code",
        content: `While-platforms from 5.4 read timings from \`PlatformConfig\` (ModuleScript or a table in a Script). That is where the numbers for hazard timing as a curve lever live.

Typical Config fragment:
\`\`\`
local PlatformConfig = {
Moving_01 = { waitUp = 2.0, waitDown = 1.5 },
Moving_02 = { waitUp = 1.8, waitDown = 1.2 },
}
\`\`\`

Rules for working with Config today:

- change numbers in Config, do not duplicate the loop in a new Script;
- comment the line: \`-- 5.7 iter2: waitUp 2.0 → 2.5 Gap fix OBBY-06\`;
- do not rename keys - the Script already references \`Moving_02\`;
- after a change, restart Play and watch 3 full cycles, not one.

Gap and width usually live in Part Properties in Studio. Record them in the same iteration table so Config and Parts do not live in separate notes.

If the problem is "the platform moves too fast for exam," increase \`waitUp\` by 0.3-0.5 s at a time. Jumping by 2 s at once makes the retest useless.

In 5.8 they will check whether the exam biome feels harder than train, but not unfair. Config numbers are your proof that you adjusted timing on purpose.

**Do this now (4 min)**: open Config, find the platform from the 5.6 bug list, and add a comment with the date of the current iteration.`,
      },
      {
        title: "Biome roles: teach → train → exam",
        content: `The three biomes from 5.1 were meant not as "three identical zones," but as three roles on the curve:

| Role | Biome | What the player learns | Typical difficulty |
| --- | --- | --- | --- |
| Teach | 1 | Read hazards, basic jump, first CP | Low, forgives mistakes |
| Train | 2 | Combine movement, while, denser gaps | Medium, CPs more often |
| Exam | 3 | Use everything without hints | Higher, CPs less often |`,
      },
      {
        title: "Unfair spikes: when difficulty is a design bug",
        content: `Not every death means "make it easier." Some mean an unfair spike - a place where the player had no chance to read the rule.

Signs of unfair:

- a hazard the same color as the safe floor (5.2);
- a gap after a blind corner with no prior jump of similar length;
- a while-platform with a window shorter than human reaction time (~0.4 s);
- death from a hitbox wider than the visible model;
- a required jump right after respawn with no run-up.

Signs of fair difficulty:

- the tester falls a bit differently each time (they are trying, not giving up);
- after the hint "watch the cycle," they clear it in 2-3 attempts;
- death comes with "I missed the timing," not "the game broke."

Fix unfair spikes first in curve work, even if Priority on the bug list was P2. Juice in 5.9 will not make red lava readable.

Typical spike fixes without a redesign:

- change hazard Material/Color (not juice - basic readability);
- add one "rehearsal" platform before the exam-gap;
- increase \`waitUp\` by 0.5 s;
- move the CP before the spike, not after.

**Do this now (4 min)**: mark at least one row on the Curve Map as "unfair" or "fair hard" and note which lever you will use.`,
      },
      {
        title: "Retest: Better, Same, Worse",
        content: `After each iteration you need a short retest, not a full peer run. Peer is in 5.8.

Retest protocol:

- new server on the current Build;
- start 1 checkpoint before the problem block (or from Spawn if the spike is at the start of the biome);
- run the problem segment 3 times in a row;
- record deaths and time on the segment;
- compare with 5.6 data or the previous iteration.

| Result | What it means | Action |
| --- | --- | --- |
| Better | Fewer deaths or faster clear | Keep the change, Save Build |
| Same | No noticeable difference | Try another lever or +1 stud / +0.3 s |
| Worse | More deaths or new confusion | Revert to the previous Save |`,
      },
      {
        title: "Checkpoint density as an exam lever",
        content: `Checkpoints from 5.3 are not only Progress. They are a curve lever: where the player pays for a mistake by repeating a long stretch.

| Zone | CP density | Why |
| --- | --- | --- |
| Teach | more often | Cheap learning, less frustration |
| Train | medium | Practice without monotonous save-scumming |
| Exam | less often | Higher stakes, but not before the first new pattern |`,
      },
      {
        title: "Iteration document for 5.8",
        content: `Your peer in 5.8 did not see your curve work. Give them one page of facts:

| Field | Example |
| --- | --- |
| Build for peer | 5.7-D |
| Changes since 5.6 | Gap_07 8 → 6; Moving_03 waitUp 2.0 → 2.5 |
| What stays open | OBBY-09 navigation - not curve |
| Peer expectation | Biome 3 exam, no hints |
| Self-retest | 2 iterations Better, 1 Same |`,
      },
      {
        title: "What to defer to 5.9 and 5.10",
        content: `After a few Better retests, the urge to "polish a bit more" appears. Stay focused:

| Now (5.7) | Later |
| --- | --- |
| Gap, width, timing, CP | Sound on hazard (5.9) |
| Hazard readability (color) | ParticleEmitter burst (5.9) |
| Curve Map and changelog | Game Settings Name/Icon (5.10) |
| Save Difficulty Curve | Badge AwardBadge (5.10) |`,
      },
      {
        title: "5.7 handoff checklist",
        content: `Before the final Save, check:

- [ ] Curve Map has at least 3 points from the 5.6 bug list
- [ ] At least 2 iterations with one lever each
- [ ] Before/After numbers recorded (Parts or Config)
- [ ] Each iteration has a retest Better/Same/Worse
- [ ] Biomes match teach / train / exam
- [ ] Unfair spikes addressed or marked open with a reason
- [ ] CP density checked on the main path
- [ ] Changelog for peer 5.8 ready
- [ ] Juice and Ship not added today
- [ ] Save: Lesson 5.7 - Difficulty Curve

Next is 5.8: peer run, 6-category checklist, bug list without stopping the game, one fix pass for blockers only, separate juice list. Then 5.9 Sound + Particles and 5.10 Checkpoint + Ship + Badge.

**Do this now (2 min)**: tick the boxes and save the Place as Lesson 5.7 - Difficulty Curve.`,
      },
    ],
  },
    commonMistakes: [
    {
      "mistake": "Sudden difficulty spikes between biomes causing early player churn",
      "explanation": "Violates smooth difficulty progression principles.",
      "correctApproach": "Scale jump distances gradually: Biome 1 (6-8 studs), Biome 2 (8-11 studs), Biome 3 (11-13 studs)."
    },
    {
      "mistake": "Placing 15+ stud gap jumps without providing speed boost powerups",
      "explanation": "Default Roblox avatar physics cannot clear 14+ stud flat jumps.",
      "correctApproach": "Keep standard jumps under 13 studs unless speed or jump modifiers are active."
    }
  ],
  summary: "You turned the 5.6 bug list into a Curve Map, adjusted gap, width, Config timing, and CP density one lever per iteration, told unfair spikes apart from fair difficulty, and recorded retest Better/Same/Worse. The Place is ready for the control peer run in 5.8.",
  practiceTask: {
    title: "Practice for 5.7 - Difficulty curve",
    difficulty: "beginner",
    description: `**Goal:** flatten the Obby difficulty curve without rebuilding biomes.

Part A - Curve Map (8 min)
1. Open Save Lesson 5.6 - Playtest 1 Buglist.
2. Move at least 3 difficulty rows into the Curve Map with one lever each.
3. Mark teach / train / exam for the three biomes.

Part B - Iterations (20 min)
1. Build 5.7-A: one lever change on the top problem.
2. Retest the segment 3× → Better/Same/Worse.
3. Build 5.7-B: second iteration (different place or lever).
4. Record Before/After in Config or Properties.

Part C - Handoff (7 min)
1. Changelog for peer 5.8.
2. Smoke test Spawn → Finish.
3. Save: Lesson 5.7 - Difficulty Curve.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Main data source for the difficulty curve in 5.7?",
        options: [
          "A new fourth biome",
          "Bug list and observations from playtest 5.6",
          "Game Settings Icon",
          "Badge ID from 5.10",
        ],
        correctAnswer: 1,
        explanation: "The curve is built from data in the 5.6 bug list.",
      },
      {
        id: "q2",
        type: MC,
        question: "How many levers do you change in one iteration?",
        options: [
          "One",
          "All four at once",
          "As many as the bugs you found",
          "None - decor only",
        ],
        correctAnswer: 0,
        explanation: "One change per iteration makes the effect clear.",
      },
      {
        id: "q3",
        type: MC,
        question: "Where do you adjust hazard timing for while-platforms?",
        options: [
          "In Game Settings",
          "Into BadgeService",
          "In PlatformConfig (waitUp/waitDown)",
          "In a LocalScript GUI",
        ],
        correctAnswer: 2,
        explanation: "Platform timing is still driven through PlatformConfig.",
      },
      {
        id: "q4",
        type: MC,
        question: "What is an unfair spike?",
        options: [
          "Any hard exam block",
          "A place where the player had no chance to read the rule",
          "Having three biomes",
          "A checkpoint before Finish",
        ],
        correctAnswer: 1,
        explanation: "An unfair spike is difficulty without first teaching the rule.",
      },
      {
        id: "q5",
        type: MC,
        question: "Retest Same after a gap change means?",
        options: [
          "Revert the Place to 5.1",
          "Automatically Ship in 5.10",
          "Add juice",
          "Try another lever or a small extra change",
        ],
        correctAnswer: 3,
        explanation: "Same means try another lever or a small fix.",
      },
      {
        id: "q6",
        type: MC,
        question: "Role of biome 1 on the curve?",
        options: [
          "Exam",
          "Train",
          "Teach",
          "Secret only",
        ],
        correctAnswer: 2,
        explanation: "Biome 1 still owns teaching (Teach).",
      },
      {
        id: "q7",
        type: MC,
        question: "What NOT to do in 5.7?",
        options: [
          "Record Before/After",
          "A full redesign of all biomes",
          "Retest Better/Same/Worse",
          "Prepare a changelog for 5.8",
        ],
        correctAnswer: 1,
        explanation: "5.7 tunes levers; it does not rebuild everything from scratch.",
      },
      {
        id: "q8",
        type: MC,
        question: "CP density in the exam zone is usually?",
        options: [
          "Sparser than in teach",
          "Every 2 studs",
          "Missing entirely",
          "Only in the 5.5 secret",
        ],
        correctAnswer: 0,
        explanation: "The exam zone intentionally has fewer checkpoints than teach.",
      },
      {
        id: "q9",
        type: MC,
        question: "Where do juice ideas go?",
        options: [
          "Implement them now in the hazard Script",
          "A separate list for 5.9 after the full 5.8 run",
          "In the Badge Description",
          "Delete them from the bug list",
        ],
        correctAnswer: 1,
        explanation: "Juice is deferred to 5.9, after the full run in 5.8.",
      },
      {
        id: "q10",
        type: MC,
        question: "Next step after Save 5.7?",
        options: [
          "Peer full playthrough in 5.8",
          "Ship + Badge right away",
          "New module 6 Simulator",
          "Delete Config",
        ],
        correctAnswer: 0,
        explanation: "Next is the control full peer run in 5.8.",
      },
      {
        id: "q11",
        type: MC,
        question: "Which iteration note is best?",
        options: [
          "Moved some stuff",
          "Gap_07 gap 8 -> 6 studs, Build 5.7-A, retest Better",
          "Definitely better now",
          "Changed everything in biome 2",
        ],
        correctAnswer: 1,
        explanation: "A concrete parameter change and retest result is the best note.",
      },
      {
        id: "q12",
        type: MC,
        question: "Platform width affects?",
        options: [
          "Landing area without changing the gap",
          "Badge award",
          "Team Create",
          "DataStore key",
        ],
        correctAnswer: 0,
        explanation: "Platform width changes landing area, not the gap distance itself.",
      },
      {
        id: "q13",
        type: MC,
        question: "Worse after an iteration - what to do?",
        options: [
          "Keep it and add Sound",
          "Revert to the previous Save and try another lever",
          "Publish Public",
          "Ignore the retest",
        ],
        correctAnswer: 1,
        explanation: "Worse results get reverted; try another lever.",
      },
      {
        id: "q14",
        type: MC,
        question: "Link between 5.6 and 5.7?",
        options: [
          "5.7 replaces the bug list",
          "5.6 supplies input points for the curve",
          "5.6 removes checkpoints",
          "No link",
        ],
        correctAnswer: 1,
        explanation: "Observations from 5.6 feed the curve in 5.7 directly.",
      },
      {
        id: "q15",
        type: MC,
        question: "Exact Save name for lesson 5.7?",
        options: [
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.8 - Full Playthrough",
          "Lesson 5.7 - Difficulty Curve",
          "Lesson 5.9 - Juice Pass",
        ],
        correctAnswer: 2,
        explanation: "Practice 5.7 ends by saving Lesson 5.7 - Difficulty Curve.",
      },
    ],
  },
}

export const enLesson58 = {
  lessonId: "lesson-roblox-5-8",
  moduleId: "module-05",
  order: 8,
  title: "5.8 - Full playthrough: peer review",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Run a control full Obby playthrough to find bugs before juice in 5.9 and the final checkpoint in 5.10",
    "Assign player and observer roles with no hints during the run",
    "Score the Place on a 6-category checklist during one run",
    "Continue the 5.6 bug list, logging bugs without stopping Play",
    "Confirm the 5.7 curve, do one fix pass for blockers only, and save Full Playthrough",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 36 of 92)",
        content: `In 5.6 you built the first bug list. In 5.7 you flattened the difficulty curve with gap, width, timing, and CP density levers. Today is a full Obby run by another person (peer) who looks for bugs and checks whether the level is ready for polish in 5.9 and the final checkpoint in 5.10.

This is not another "author run." The peer does not know where the key is, which \`waitUp\` you tuned, or where yesterday's unfair spike was. If they clear it without blockers - the curve and Progress hold up under fresh eyes.

|Was in 5.7|Becomes in 5.8|
|----------|----------|
|Self-retest curve|Peer run on the Build after curve|
|Iteration changelog|Checklist + updated bug list|
|Expectation "better"|Confirmed bug list|`,
      },
      {
        title: "Why a full playthrough before juice and Ship",
        content: `A full playthrough answers one simple question: "can a stranger clear the Obby from Spawn to Finish without getting stuck?" Not "is it pretty," not "is there a Badge" - only honest clearability. The final show-or-not call happens at the checkpoint in 5.10 - today you only gather honest facts for it.

|Clean clear|Clear with blockers|
|-------------|-------------------|
|Peer reached Finish with no P0|Softlock, broken respawn, blocked main path|
|Exam feels harder than teach|Unfair spike left after 5.7|
|Secret is optional (5.5)|Finish impossible without the key|
|Output has no red errors on the run|Script crashes mid-run|`,
      },
      {
        title: "Roles: player (peer) and observer (you)",
        content: `Same setup as 5.6, but a different goal: not the first bug gather, a control run after the 5.7 curve.

Peer (player):

- starts from Spawn on Build 5.8-A;
- reaches Finish with no teleports and no hints;
- thinks out loud about expectations on unfamiliar sections;
- is not required to find the secret - the main path is required.

You (observer):

- record time, deaths, pauses of 5+ seconds;
- fill the checklist (next section);
- do not hint the route, timing, or key;
- ask clarifying questions after a segment, not mid-jump.

If the peer gets stuck - log that as data. If they ask "which way?" - "I'll note it as navigation; keep trying" - not "go right there."

Self-test (if no peer): new server, no Explorer, screen recording, think out loud. Weaker than a peer, but better than an author run from memory. Mark in the bug list Tester: self-test.

After the run, do not fix in Play Mode right away. Finish the notes, then Build 5.8-B for blockers.

**Do this now (3 min)**: give the peer this instruction: "Full run, say your expectations out loud, I stay quiet about the route."`,
      },
      {
        title: "6-category full playthrough checklist",
        content: `During one run, fill the checklist. Scale: yes / almost / no + a short note.

|#|Category|What you check|
|-|---------|-------------|
|1|Gameplay|gap, hazards, while, collision - is it fair|
|2|Progress|CP, respawn, Finish, timer (5.3)|
|3|Navigation|direction, goal visibility, biomes|
|4|Secret|key-door optional (5.5)|
|5|Curve|teach → train → exam, no unfair spike (5.7)|
|6|Stability|Output clean, no softlock|`,
      },
      {
        title: "Full playthrough script (no shortcuts)",
        content: `The peer runs the whole route - the same frame as in 5.6:

|Step|Check|
|----|---------|
|1. Spawn|Direction into the teach biome|
|2. Biome 1 hazards|Readable before death|
|3. CP + respawn|Progress saved|
|4. While-platforms|Config timing from 5.7|
|5. Biome 2 train|Deaths vs curve changelog|
|6. Key-door (optional)|Main path without the key|
|7. Biome 3 exam|Hardest block before Finish|
|8. Finish|Timer stops, reachable|`,
      },
      {
        title: "Bug notes without stopping the game",
        content: `During the peer run, do not stop Play to edit Parts. Like an audience already in the hall - you do not pause the show to fix the stage.

Recording rules:

- short shorthand in a notebook or on a second monitor;
- timestamp: \`04:12 CP_03 respawn fail\`;
- after the run, expand into full bug-list rows;
- if a P0 blocks the peer - let them reach the nearest reproducible moment or log a stop with steps.

|During the run|After the run|
|-----------|---------|
|"3 deaths Gap_09"|OBBY-14: Expected land, Actual fall, Steps...|
|"Output red line 6:01"|OBBY-15: Category Stability, P0|
|"? direction biome2"|OBBY-16: Navigation, P2|`,
      },
      {
        title: "Continuing the 5.6 bug list",
        content: `The bug list is a living document through 5.6 → 5.7 → 5.8 → 5.9 → 5.10. Do not create a new table from scratch.

Columns (same as 5.6):
|ID|Place|Expected|Actual|Steps|Category|Priority|Status|Build|Evidence|
|--|-----|--------|------|-----|--------|--------|------|-----|--------|
|  |     |        |      |     |        |        |      |     |        |`,
      },
      {
        title: "Checking the 5.7 difficulty curve",
        content: `The full playthrough tests your 5.7 work. The question is not "is it easy," but "is the curve predictable for a stranger."

Comparison metrics:

|Metric|5.6 playtest|5.8 peer|Expectation|
|-------|------------|--------|----------|
|Biome 2 deaths|e.g. 8|?|≤ or fairer|
|Max pause|e.g. 12s|?|no blind stop|
|Exam deaths|?|?|≥ teach, no unfair|
|Quit mid-run|no/yes|no|no|`,
      },
      {
        title: "One fix pass: blockers only",
        content: `After the peer run - one fix cycle. Not a second curve sweep, not juice, not a new biome.

Fix pass protocol:

- Sort the bug list P0 → P1.
- Pick the single highest blocker (same triage as 5.6).
- Build 5.8-B - Save before the change.
- Minimal fix for one cause.
- Regression: the bug's steps + the neighboring CP/hazard.
- Short self-run Spawn → Finish - only to confirm the blocker is gone.

|Fix pass|Not a fix pass|
|--------|-----------|
|Respawn on CP|Move the exam-gap "because it looks nicer"|
|Script error on Finish|Sound on lava|
|Door blocks main|Particle on GUI|
|Debounce hazard|New secret|`,
      },
      {
        title: "Juice idea list (separate from fixes)",
        content: `During the run, the peer (and you) will spot moments of "this needs more feedback." Do not build them today - 5.9 is for Sound and ParticleEmitter.

Separate file or Notes section: Juice backlog (post-5.8)

|Event|Juice idea|Polish priority|
|Hazard kill|short sizzle + smoke|high|
|Checkpoint touch|ding + sparks|high|
|Finish|confetti burst|medium|
|Key pickup|click + flash|low|`,
      },
      {
        title: "Playtest #1 (5.6) vs full playthrough (5.8)",
        content: `Two runs, two jobs:

|5.6 Playtest #1|5.8 Full Playthrough|
|Goal|Gather bugs|Confirm clearability and curve|
|Build|5.6-A|5.8-A after 5.7|
|Who|First stranger test|Peer after curve|
|Fixes|One P0/P1 + retest|One blocker fix pass|
|Artifact|Buglist|Buglist + checklist + juice backlog|
|Next|5.7 curve|5.9 juice|`,
      },
      {
        title: "Full playthrough checklist",
        content: `Before Save Lesson 5.8 - Full Playthrough:

- [ ] Build 5.8-A frozen before the peer run
- [ ] Peer (or self-test) cleared Spawn → Finish
- [ ] 6-category checklist filled
- [ ] 5.6 bug list continued with new IDs
- [ ] Notes taken without stopping Play during the run
- [ ] Curve metrics compared with 5.6 / 5.7 changelog
- [ ] One fix pass on P0/P1 (if any) on Build 5.8-B
- [ ] Regression retest of the blocker passed
- [ ] Juice backlog separate, Sound not added
- [ ] Output clean on a short self-run after the fix
- [ ] Save: Lesson 5.8 - Full Playthrough

Clean clear → 5.9 Juice. Leftover P0 → Reopen; a second fix is not for 5.9.

The final checkpoint and Ship in 5.10 will demand what you confirmed today: clearability, curve, stability - plus juice after 5.9.

**Do this now (5 min)**: tick the boxes and do a final 3-minute self-run.`,
      },
    ],
  },
    commonMistakes: [
    {
      "mistake": "Softlock pits where players get permanently stuck without resetting",
      "explanation": "Blind gaps between decorative meshes trap players without triggering death.",
      "correctApproach": "Place invisible KillBricks across all dead-end crevices to reset players to checkpoints."
    },
    {
      "mistake": "Camera clipping awkwardly inside high narrow walls",
      "explanation": "Tight corridors collide aggressively with third-person camera occlusion.",
      "correctApproach": "Widen narrow tunnels or set CanCollide = false on camera-blocking decor."
    }
  ],
  summary: "You ran a control peer full playthrough, filled the 6-category checklist, continued the 5.6 bug list without stopping the game, checked the 5.7 curve against metrics, did one blocker fix pass, and moved juice ideas into a separate backlog. The Place is ready for Sound and Particles in 5.9.",
  practiceTask: {
    title: "Practice for 5.8 - Full playthrough: peer review",
    difficulty: "beginner",
    description: `**Goal:** a full peer run after 5.7 with checklist, bug list, and blocker fix.

Part A - Prep (5 min)
1. Save Build 5.8-A from Lesson 5.7 - Difficulty Curve.
2. 6-category checklist table + shorthand notes.
3. Peer instructions with no hints.

Part B - Peer run (15 min)
1. Spawn → Finish, log time/deaths/pauses.
2. Checklist yes/almost/no during the run.
3. Bug shorthand without stopping Play.

Part C - Wrap-up (15 min)
1. Expand shorthand into the 5.6 bug list (new IDs).
2. Compare curve metrics with 5.6/5.7.
3. One P0/P1 fix on Build 5.8-B + regression.
4. Juice backlog (≥3 ideas, no Scripts).
5. Save: Lesson 5.8 - Full Playthrough.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Main goal of lesson 5.8?",
        options: [
          "Full peer playthrough before juice and the final checkpoint",
          "Add Badge and Game Settings",
          "Rebuild all three biomes",
          "Delete the 5.6 bug list",
        ],
        correctAnswer: 0,
        explanation: "5.8 is a control peer run before juice in 5.9 and the final checkpoint in 5.10.",
      },
      {
        id: "q2",
        type: MC,
        question: "What does the observer do during the peer run?",
        options: [
          "Hints while-platform timing",
          "Moves Parts in Play Mode",
          "Awards a Badge halfway through the route",
          "Records the checklist and bugs with no route hints",
        ],
        correctAnswer: 3,
        explanation: "The tester logs the checklist and bugs without intervening in the run.",
      },
      {
        id: "q3",
        type: MC,
        question: "How many categories are in the 5.8 full playthrough checklist?",
        options: [
          "3",
          "6",
          "15",
          "92",
        ],
        correctAnswer: 1,
        explanation: "The 5.8 checklist has 6 categories.",
      },
      {
        id: "q4",
        type: MC,
        question: "A typical full-playthrough blocker?",
        options: [
          "No Sound on the hazard",
          "P3 shifted GUI text",
          "P0 softlock on the main path",
          "Peer did not find the secret",
        ],
        correctAnswer: 2,
        explanation: "A softlock on the main path is a critical P0 blocker.",
      },
      {
        id: "q5",
        type: MC,
        question: "During the peer run, bugs are recorded how?",
        options: [
          "Shorthand without stopping, full rows after",
          "After stopping Play and editing Parts",
          "Not recorded - checklist only",
          "Only in Output",
        ],
        correctAnswer: 0,
        explanation: "Log briefly on the fly, expand after the run.",
      },
      {
        id: "q6",
        type: MC,
        question: "Is the 5.8 fix pass limited?",
        options: [
          "Unlimited across all P2",
          "P0/P1 blockers only, one cycle",
          "Cosmetics only",
          "Full exam redesign",
        ],
        correctAnswer: 1,
        explanation: "The fix pass covers only P0/P1 blockers in one cycle.",
      },
      {
        id: "q7",
        type: MC,
        question: "Juice ideas in 5.8?",
        options: [
          "Implemented in the hazard Script",
          "Replace the bug list",
          "Separate backlog with no Sound today",
          "Delete the 5.7 curve",
        ],
        correctAnswer: 2,
        explanation: "Juice is deferred in a separate list until 5.9.",
      },
      {
        id: "q8",
        type: MC,
        question: "Bug lists 5.8 and 5.6?",
        options: [
          "New file with no history",
          "5.6 is deleted",
          "For juice only",
          "Continuation with new IDs and Build",
        ],
        correctAnswer: 3,
        explanation: "The 5.8 bug list continues the same document from 5.6.",
      },
      {
        id: "q9",
        type: MC,
        question: "The Curve category on the checklist checks?",
        options: [
          "Teach -> train -> exam after 5.7 changes",
          "Badge ID",
          "Icon 512x512",
          "Team Create",
        ],
        correctAnswer: 0,
        explanation: "The Curve category checks teach -> train -> exam progression.",
      },
      {
        id: "q10",
        type: MC,
        question: "After a clean full playthrough, the logical next lesson?",
        options: [
          "5.9 Juice: Sound + Particles",
          "5.1 Three Biomes from scratch",
          "6.10 Ship Sim",
          "Skip to 5.10 with no juice",
        ],
        correctAnswer: 0,
        explanation: "After a clean full playthrough comes 5.9 - Juice: Sound + Particles.",
      },
      {
        id: "q11",
        type: MC,
        question: "How does 5.8 differ from 5.6?",
        options: [
          "5.8 needs no peer",
          "5.6 comes after Ship",
          "5.8 is a control run after the curve, not the first bug gather",
          "5.8 has no checklist",
        ],
        correctAnswer: 2,
        explanation: "5.8 is a control run after the difficulty curve, not the primary bug gather.",
      },
      {
        id: "q12",
        type: MC,
        question: "Self-test if there is no peer?",
        options: [
          "Not allowed",
          "Replaces Save",
          "Needs no checklist",
          "Allowed with the mark Tester: self-test",
        ],
        correctAnswer: 3,
        explanation: "With no peer, a self-test marked as such is allowed.",
      },
      {
        id: "q13",
        type: MC,
        question: "Regression after a blocker fix?",
        options: [
          "Bug steps + neighboring Progress scenario",
          "Not needed",
          "Edit Mode color only",
          "Publish Public",
        ],
        correctAnswer: 0,
        explanation: "Regression is checked against the bug steps and a nearby progress scenario.",
      },
      {
        id: "q14",
        type: MC,
        question: "Stability on the checklist is?",
        options: [
          "Having a ParticleEmitter",
          "Number of biomes",
          "Output with no errors, no softlock",
          "Description in Game Settings",
        ],
        correctAnswer: 2,
        explanation: "Stability means clean Output and no softlock.",
      },
      {
        id: "q15",
        type: MC,
        question: "Exact Save name for lesson 5.8?",
        options: [
          "Lesson 5.7 - Difficulty Curve",
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.9 - Juice Pass",
          "Lesson 5.8 - Full Playthrough",
        ],
        correctAnswer: 3,
        explanation: "Practice 5.8 ends by saving Lesson 5.8 - Full Playthrough.",
      },
    ],
  },
}

export const enLesson59 = {
  lessonId: "lesson-roblox-5-9",
  moduleId: "module-05",
  order: 9,
  title: "5.9 - Juice: Sound + Particles",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Explain how juice strengthens finished mechanics but does not fix their rules",
    "Hook Sound into server hazard and checkpoint hooks without a second Touched",
    "Set up a short ParticleEmitter burst via Emit() instead of constant Enabled",
    "Choose Part or SoundService by the sound's spatial role and avoid spam",
    "Run a full juice playtest after 5.8 and prepare the Place for the final checkpoint and Ship in 5.10",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 37 of 92)",
        content: `Lesson 5.8 proved your obby clears from start to finish without hanging. But "clears" and "feels good" are different things. Today you add sound and particles that turn dry death and checkpoint mechanics into living feedback for the player.

This is lesson 37 of 92 in the SmartCode course and the ninth lesson of module 05 - Obby. You already covered biome design, hazards with debounce, checkpoints with GUI, platforms, secrets, playtest, difficulty curve, and a full bug-hunting run. Juice is the last polish layer before the final checkpoint and Ship in 5.10, where you ship a finished product with a badge.

Lesson flow:

- Theory (35 min) - what juice is, Sound, ParticleEmitter, server vs local signal
- Practice (~35 min) - sound and particles on death and checkpoint, playtest
- Quiz (15 min) - pass at 70%

Open your place from Lesson 5.8 - Full playthrough: peer review. You are not rewriting hazard or checkpoint logic - only adding a reaction. If a hazard or checkpoint still "stays silent" after a fall or touch - this lesson is for that.

**Do this now (2 min)**: open the Save from 5.8, hit one hazard and one checkpoint, and note where feedback is missing.`,
      },
      {
        title: "What \"juice\" is - why small details matter most",
        content: `Juice (from English "juice," in game design meaning "juiciness") is the sum of small feedback signals that tell the player: "your action changed something in the game." A jump with no sound is just a coordinate change. A jump with a landing sound and a dust puff is an event the player's brain notices and remembers.

Juice has three channels; today we touch two of them:

- Sound - the fastest signal; the brain reacts in fractions of a second
- Particles - a short visual flash that confirms where the event happened
- Motion/animation - Tween or a Part flash (you already saw flash in earlier modules)

In an obby there are exactly two moments where the player needs feedback most:

- Death - the player must instantly understand "I touched a hazard, that was my mistake," not wonder why the character vanished
- Checkpoint - the player must feel a small reward for progress, or the level feels like monotonous work

|Without juice|With juice|
|---------|-------|
|Fall into lava - silent, character just disappears|Short "hiss" + smoke puff on the hazard|
|Checkpoint saves, but the player missed it|Chime + sparks - "yes, progress counted"|`,
      },
      {
        title: "Reminder - death and checkpoint hooks from 5.2 and 5.3",
        content: `To avoid duplicating logic, today you embed sound and particles into the functions you already have.

From Lesson 5.2 (Hazards + debounce) - your server hazard script looks roughly like this:
\`\`\`
local hazard = script.Parent
hazard.Touched:Connect(function(hit)
local character = hit.Parent
local humanoid = character and character:FindFirstChildOfClass("Humanoid")
if not humanoid then return end
humanoid.Health = 0
end)
\`\`\`

From Lesson 5.3 (Checkpoints + timer + GUI) - your checkpoint script is wired like this:
\`\`\`
checkpointPart.Touched:Connect(function(hit)
local character = hit.Parent
local player = Players:GetPlayerFromCharacter(character)
if not player then return end
-- here you already save the checkpoint for player
end)
\`\`\`

Today you add one sound call and one particle call in exactly these two places - no new Touched connection.

Why not a separate "sound only" Script: a second Touched on the same Part can fire on a different frame than the main hazard - the player dies with no sound, or hears sound with no death. One handler = one atomic event: touch → juice → logic.

Debounce from 5.2 for hazards: if your hazard already has a damage cooldown, juice must fire inside the same block where the kill actually happens - not before and not after the debounce returns.

**Do this now (4 min)**: find the current hazard and checkpoint Touched handlers. Mark the lines after which the event is already confirmed by debounce.`,
      },
      {
        title: "Sound - basic Properties you will need",
        content: `Sound is an Instance that plays audio. The most important Properties for today's lesson:

|Property|What it does|
|--------|---------|
|\`SoundId\`|audio reference, format \`rbxassetid://ID\`|
|\`Volume\`|loudness from 0 to 1 (sometimes a bit higher, but for UI/hazard keep 0.4-0.7)|
|\`Looped\`|whether the sound repeats - for death and checkpoint always false|
|\`PlaybackSpeed\`|playback speed/pitch, 1 = normal|
|\`RollOffMode\` and \`RollOffMaxDistance\`|how the sound fades with distance when Sound lives in a Part|`,
      },
      {
        title: "SoundService vs Parent Part - where your sound lives",
        content: `Where you put Sound (its Parent) decides how the player hears it.

|Option|Behavior|When to use|
|-------|---------|--------------------|
|Parent = Part at the event (hazard, checkpoint)|3D sound, fades with distance, has direction|Local map events - ideal for death and checkpoint|
|Parent = SoundService|2D sound, same loudness for everyone regardless of position|Global signals like "game started," menu music|`,
      },
      {
        title: "Death sound - wiring into the Hazard/Kill hook",
        content: `Add the sound inside the 5.2 handler, right before or after \`humanoid.Health = 0\`:
\`\`\`
local hazard = script.Parent
local deathSound = hazard:WaitForChild("DeathSound")
\`\`\`

\`\`
\`\`\`
hazard.Touched:Connect(function(hit)
local character = hit.Parent
local humanoid = character and character:FindFirstChildOfClass("Humanoid")
if not humanoid then return end
deathSound:Play()
humanoid.Health = 0
end)
\`\`\`

Why Sound is a child of the hazard, not the character: the character is removed/respawned a moment later, and a Sound that is its child will cut off mid-play. The hazard Part stays in place - the sound finishes fully.

Server or client: this Touched already runs on the server (Script, not LocalScript) from 5.2 - Play() on the server replicates to nearby players, so everyone hears the fall into the hazard, not only the victim.

If the sound is silent: check that \`SoundId\` is valid (in Edit Mode press Play on the Sound in Properties), \`Volume\` is not 0, and the hazard Part is not CanCollide false with Sound inside an empty block with no RollOff. Add \`print("death juice")\` next to Play() - if the print fires but there is no sound, the problem is SoundId or Volume, not Touched.

**Do this now (5 min)**: add DeathSound:Play() in the same guarded block where Humanoid actually dies, and test one touch.`,
      },
      {
        title: "Checkpoint sound - wiring into the 5.3 hook",
        content: `Same approach in the checkpoint script:
\`\`\`
local checkpointPart = script.Parent
local chimeSound = checkpointPart:WaitForChild("ChimeSound")
\`\`\`

\`\`
\`\`\`
checkpointPart.Touched:Connect(function(hit)
local character = hit.Parent
local player = Players:GetPlayerFromCharacter(character)
if not player then return end
chimeSound:Play()
-- then your checkpoint save logic from 5.3
end)
\`\`\`

Always check the debounce from 5.3: if the player stands on the checkpoint for several frames, Touched can fire multiple times - without debounce the sound "chatters" and stacks on itself. Use the same debounce table or flag that already protects checkpoint save, do not write a separate one for sound.

Different checkpoints - one template: do not copy different SoundIds onto every checkpoint unless you want a different "character" per biome. One \`ChimeSound\` + \`Sparkles\` in a Part template you duplicate across the level - less work and the same feedback everywhere. Exception: the final checkpoint before Ship can use a slightly louder Volume (0.75) as a reward.

**Do this now (5 min)**: add ChimeSound:Play() after a new checkpoint is confirmed and stand on the Part for a second - the sound should play once.`,
      },
      {
        title: "ParticleEmitter - basic Properties",
        content: `ParticleEmitter is an Instance that spawns small particles from a BasePart. Key Properties:

|Property|What to do|
|--------|---------|
|\`Rate\`|particles per second while Enabled = true (for our juice keep 0; drive it with Emit)|
|\`Lifetime\`|NumberRange - how long each particle lives, e.g. \`NumberRange.new(0.4, 0.8)\`|
|\`Speed\`|NumberRange of initial launch speed|
|\`Color\`|ColorSequence - particle color, can be a gradient|
|\`Texture\`|particle look; the default round Toolbox dot works|
|\`Enabled\`|turns on a continuous stream - do not use it for a one-shot effect|`,
      },
      {
        title: "Particles on checkpoint and death - Emit() instead of Enabled",
        content: `Emit(count) is a method that fires a one-shot particle "burst" and stops right away - exactly what you need for an instant event.

In the checkpoint script:
\`\`\`
local sparkles = checkpointPart:WaitForChild("Sparkles")
chimeSound:Play()
sparkles:Emit(25)
\`\`\`

In the hazard script:
\`\`\`
local puff = hazard:WaitForChild("DeathPuff")
deathSound:Play()
puff:Emit(15)
humanoid.Health = 0
\`\`\`

Why not Enabled = true: if Enabled stays on, particles keep flying from the hazard even when nobody dies - visual noise and extra load on every client's machine in the room. One \`Emit()\` call gives a clear flash exactly at the event and zero cost between events.

Call order: first \`Play()\`, then immediately \`Emit()\`, then \`humanoid.Health = 0\` for the hazard - so the player sees and hears juice before the character vanishes. If you kill before Emit, particles still appear, but the feel of "impact → reaction → death" is weaker.

**Do this now (4 min)**: wire Emit(15) for the hazard and Emit(25) for the checkpoint. Outside the event there should be no particles.`,
      },
      {
        title: "Server or local signal - where to play the effect",
        content: `Server (Script, as in the examples above): Play() and Emit() called on the server are replicated to nearby clients - all players see and hear the event. That is the right choice for checkpoint and death in an obby, because they are shared map events.

Local signal (LocalScript): you can add a separate, quieter effect only for the player who died or reached the checkpoint - for example a screen color flash via ScreenGui. That LocalScript listens to the same event (e.g. a RemoteEvent or Attribute change) the server already sends.

Watch for duplication: if both the server and a LocalScript play the same Sound for the same player, they hear it twice stacked - louder and with phase distortion. Rule: base sound/particles - always once on the server; the local script adds only a different extra layer (screen effect), not a copy of the same Sound.

When a local layer makes sense: if you want only the player who died to see a light red vignette on screen - that is a LocalScript in StarterGui listening to Health change or a RemoteEvent from the server. The server still plays 3D sound on the hazard for everyone; locally - only UI. Two different channels, not two identical Play() calls.

**Do this now (3 min)**: check Explorer: only the server Script starts the base 3D Sound. Do not duplicate that same Play() in a LocalScript.`,
      },
      {
        title: "Do not spam - debounce, reuse, volume",
        content: `Problem 1 - Instance.new() on every touch. Creating a new Sound or ParticleEmitter every time with \`Instance.new()\` and deleting it right away is costly and slow. Correct pattern: one Sound and one ParticleEmitter sit in the Part ahead of time (placed in Studio), and the code only calls \`:Play()\` and \`:Emit()\` again and again.

Problem 2 - no debounce on the checkpoint. Already covered above - without the 5.3 debounce, sound can "chatter" with several Play() calls in one second.

Problem 3 - Volume too high. \`Volume = 1\` for a short checkpoint "chime" sounds harsh and tires you by the 10th time. Keep Volume in the 0.4-0.7 range for frequent events; save louder values for rare, important moments (victory, boss).

Problem 4 - different loudness on different hazards. If one hazard plays at Volume 0.9 and another at 0.3, the level feels "broken." Walk all hazards in one pass and match Volume within 0.1 - the same death character across the whole obby.

One-rule rule: if the event happens often (and checkpoints and deaths in an obby happen very often), the effect must be short and quiet, or the player will mute sound in the game entirely.

**Do this now (4 min)**: touch the checkpoint several times and die twice in a row. Listen whether SFX chatters or stacks.`,
      },
      {
        title: "Juice playtest table and prep for Ship 5.10",
        content: `Run a full clear of the level from Lesson 5.8, and for each event write how it feels:

| Event | What to check | Target |
| --- | --- | --- |
| Death in hazard #1 | sound + particles immediately, no delay | <0.1s after Touched |
| Death in hazard #2 (other type) | same Sound/Emit pattern | same feedback strength |
| Every checkpoint | "chime" + sparks once, no repeat | exactly 1 Play() per 1 checkpoint |
| Repeat death in the same hazard | sound does not stick or stack | clean after each respawn |
| Loudness over 10 clears in a row | does not tire the ear | Volume 0.4-0.7 stays comfortable |`,
      },
      {
        title: "Checklist before practice",
        content: `- [ ] Sound instance pre-placed in every hazard and every checkpoint (not created by code on the fly)
- [ ] ParticleEmitter has Rate = 0, driven only through Emit()
- [ ] Play() and Emit() called on the server inside the ready hooks from 5.2 and 5.3
- [ ] Debounce from 5.3 protects checkpoint sound from repeats
- [ ] Volume in the 0.4-0.7 range, no server+local duplication of the same Sound
- [ ] Full 5.8 route cleared with Roblox sound settings on
- [ ] Every hazard and checkpoint has a Sound + ParticleEmitter pair
- [ ] Saved: \`Lesson 5.9 - Juice Pass\`

**Do this now (2 min)**: check the list, save the Place as Lesson 5.9 - Juice Pass, and prep it for Ship + Badge in 5.10.`,
      },
    ],
  },
    commonMistakes: [
    {
      "mistake": "3D spatial audio heard globally across the entire map",
      "explanation": "RollOffMaxDistance is set excessively high or the Sound instance is parented to SoundService.",
      "correctApproach": "Parent 3D Sound instances directly inside world Parts and set RollOffMaxDistance between 20-40 studs."
    },
    {
      "mistake": "High ParticleEmitter emission rates causing mobile framerate drops",
      "explanation": "Rate property set excessively high on multiple simultaneous emitters.",
      "correctApproach": "Keep Rate between 5-15 for ambient environmental effects."
    },
    {
      "mistake": "Collection SFX plays 30 times in a fraction of a second on touch",
      "explanation": "sound:Play() called without debounce filtering.",
      "correctApproach": "Trigger audio playback only once upon successful pickup validation."
    }
  ],
  summary: "You added Sound and ParticleEmitter to the ready death and checkpoint hooks from 5.2 and 5.3, learned to choose between SoundService and Parent Part, drive particles with Emit() instead of Enabled, and avoid spam and overloaded volume - now your obby after 5.8 does not just clear, it feels alive and ready for the final handoff in 5.10.",
  practiceTask: {
    title: "Practice for 5.9 - Juice: Sound + Particles",
    difficulty: "beginner",
    description: `**Goal:** every hazard and every checkpoint on the level from 5.8 has sound and a short particle burst.

Part A - Prep Instances (10 min)
1. In every hazard Part insert \`DeathSound\` (Sound) and \`DeathPuff\` (ParticleEmitter), Rate = 0.
2. In every checkpoint Part insert \`ChimeSound\` (Sound) and \`Sparkles\` (ParticleEmitter), Rate = 0.
3. Set Volume on both Sounds in the 0.4-0.7 range.

Part B - Wire into hooks (15 min)
1. In the hazard script from 5.2 add \`deathSound:Play()\` and \`puff:Emit(15)\` before \`humanoid.Health = 0\`.
2. In the checkpoint script from 5.3 add \`chimeSound:Play()\` and \`sparkles:Emit(25)\` inside the ready debounce block.
3. Check that no hazard or checkpoint was missed - clear the level and listen to each one.

Part C - Playtest and save (10 min)
1. Fill the Juice playtest table for every event.
2. Fix any Sound/Emit that fires twice or is too loud.
3. Save in Roblox → \`Lesson 5.9 - Juice Pass\`.

> Practice complete.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What does juice mean in this lesson?",
        options: [
          "A new character movement system",
          "Replacing debounce in the hazard",
          "A short feedback layer on top of an already working mechanic",
          "Background music for the whole level",
        ],
        correctAnswer: 2,
        explanation: "Juice is short feedback on top of a finished mechanic.",
      },
      {
        id: "q2",
        type: MC,
        question: "Where do you wire DeathSound for a hazard?",
        options: [
          "In the same server Touched hook after checks and debounce",
          "In a separate LocalScript with no link to death",
          "In a new Touched for sound only",
          "In ScreenGui instead of the hazard Part",
        ],
        correctAnswer: 0,
        explanation: "Sound is added inside the existing death hook.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why keep DeathSound in the hazard Part, not in Character?",
        options: [
          "Character cannot hold a Sound",
          "Part automatically makes the sound global",
          "Sound in Character is always Looped",
          "Character vanishes on respawn and can cut the sound off",
        ],
        correctAnswer: 3,
        explanation: "Character is removed on death, so sound in the Part is more reliable.",
      },
      {
        id: "q4",
        type: MC,
        question: "When is SoundService better than Parent = Part?",
        options: [
          "For a local sizzle on a specific lava",
          "For a global UI signal or lobby music",
          "For a chime on a specific checkpoint",
          "For a sound whose direction the player should find",
        ],
        correctAnswer: 1,
        explanation: "SoundService fits global, non-spatial sounds.",
      },
      {
        id: "q5",
        type: MC,
        question: "Which setup fits a short checkpoint SFX?",
        options: [
          "Looped true and Volume 1.5",
          "Looped false and Volume about 0.4-0.7",
          "PlaybackSpeed 0 and no SoundId",
          "Sound in Character with a large RollOff",
        ],
        correctAnswer: 1,
        explanation: "Short SFX - no Looped and moderate volume.",
      },
      {
        id: "q6",
        type: MC,
        question: "How do you make a one-shot ParticleEmitter burst?",
        options: [
          "Enabled true for the whole playtest",
          "Rate 100 on every hazard",
          "Create a new emitter every frame",
          "Rate 0 and call Emit(n) when the event is confirmed",
        ],
        correctAnswer: 3,
        explanation: "A burst is Rate 0 plus a point call to Emit(n).",
      },
      {
        id: "q7",
        type: MC,
        question: "What happens if you leave ParticleEmitter Enabled = true?",
        options: [
          "Particles run continuously and create noise",
          "It fires exactly once",
          "It waits for a Play() call",
          "It automatically inherits checkpoint debounce",
        ],
        correctAnswer: 0,
        explanation: "Constant Enabled means a continuous particle stream and visual noise.",
      },
      {
        id: "q8",
        type: MC,
        question: "Why not Instance.new('Sound') on every Touched?",
        options: [
          "SoundId can only be set in Edit Mode",
          "Play() works with only one Sound per game",
          "Extra Instances are created at the hottest moment and need cleanup",
          "Touched forbids creating Instances",
        ],
        correctAnswer: 2,
        explanation: "Creating new Instances on every touch clutters the game and needs cleanup.",
      },
      {
        id: "q9",
        type: MC,
        question: "When should checkpoint juice fire?",
        options: [
          "On every touch of any body part",
          "Every second while the player stands on the Part",
          "After every respawn regardless of progress",
          "Only when the server confirmed a new checkpoint inside debounce",
        ],
        correctAnswer: 3,
        explanation: "The effect appears only when a new checkpoint is confirmed.",
      },
      {
        id: "q10",
        type: MC,
        question: "What does a repeat checkpoint touch test check?",
        options: [
          "That Sound becomes global",
          "That chime and sparkles do not duplicate across several Touched",
          "That ParticleEmitter switches to Enabled true",
          "That the checkpoint is deleted after the first player",
        ],
        correctAnswer: 1,
        explanation: "The test checks that the effect does not duplicate on repeat touches.",
      },
      {
        id: "q11",
        type: MC,
        question: "What is correct for server and local feedback?",
        options: [
          "Both layers play the same Sound at once",
          "The local layer decides whether the checkpoint counted",
          "The server runs the base event; the client may add a different UI effect",
          "All logic must move into a LocalScript",
        ],
        correctAnswer: 2,
        explanation: "The server owns the event; the client only adds its own UI layer.",
      },
      {
        id: "q12",
        type: MC,
        question: "Why match Volume across hazard Parts?",
        options: [
          "So sharp volume jumps do not break the feel of the level",
          "So RollOffMode turns off",
          "So all Sounds get one SoundId automatically",
          "So you do not need debounce",
        ],
        correctAnswer: 0,
        explanation: "Even volume prevents sharp, unpleasant sound jumps.",
      },
      {
        id: "q13",
        type: MC,
        question: "What should a full clear after 5.8 verify?",
        options: [
          "Only the first hazard and first checkpoint",
          "Every hazard and checkpoint, repeats after respawn, and volume comfort",
          "Only the future Badge icon",
          "Only background music in SoundService",
        ],
        correctAnswer: 1,
        explanation: "A full clear checks all hazards, checkpoints, and sound comfort.",
      },
      {
        id: "q14",
        type: MC,
        question: "What comes in lesson 5.10 after Juice Pass?",
        options: [
          "Rewriting all hazards from scratch",
          "Starting Tycoon in the same Place",
          "Removing Sound and ParticleEmitter",
          "Checkpoint, Ship + Badge, and the final Obby handoff",
        ],
        correctAnswer: 3,
        explanation: "5.10 closes the module with a final checkpoint and Ship + Badge handoff.",
      },
      {
        id: "q15",
        type: MC,
        question: "Exact Save name for lesson 5.9?",
        options: [
          "Lesson 5.8 - Full Run",
          "Lesson 5.10 - Ship + Badge",
          "Lesson 5.9 - Juice Pass",
          "Obby Sound Final Draft",
        ],
        correctAnswer: 2,
        explanation: "Practice 5.9 ends by saving Lesson 5.9 - Juice Pass.",
      },
    ],
  },
}

export const enLesson510 = {
  lessonId: "lesson-roblox-5-10",
  moduleId: "module-05",
  order: 10,
  title: "5.10 - Checkpoint: Ship + Badge",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Fill Game Settings for the place: name, description, icon, and Access Friends or Public",
    "Create a Badge on the Roblox site and award it with AwardBadge on the server at the finish",
    "Guard the award with UserHasBadgeAsync and pcall before AwardBadge",
    "Pass the final checkpoint - a rubric across biomes, checkpoints, hazards, and juice from 5.1-5.9 - as the last gate before showing",
    "Rehearse a 60-90 second demo with no teleprompter and save the final Place",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 38 of 92)",
        content: `This is the finale of module 5 - Obby and at the same time a checkpoint: the last control pass before you show the work. There is no new mechanic. You confirm the level is ready, then pack it into a product you can show a stranger in 90 seconds.

In earlier lessons you already built the core. In 5.10 you do not add new mechanics - you pass the checkpoint and package everything into a finished product:

- 5.1 - three biomes;
- 5.2 - hazards + debounce;
- 5.3 - checkpoints + timer + GUI;
- 5.4 - while-platforms + Config;
- 5.5 - secrets + key-door;
- 5.6 - playtest and bug list;
- 5.7 - difficulty curve;
- 5.8 - full playthrough and bug hunting;
- 5.9 - juice Sound + Particles.

| Was in 5.9 | Becomes in 5.10 |
| --- | --- |
| Level with juice | The same level as a showable product |
| Juice without a final check | Checkpoint confirms readiness |
| Finish with no profile reward | Badge once at the finish |
| Default Studio name | Name, description, icon for the place page |`,
      },
      {
        title: "What Checkpoint and Ship + Badge mean",
        content: `Ship is not AAA and not "the biggest map." It is a clear from start to finish that is complete, fair, and showable without your explanations. Checkpoint is today's control point that confirms that with facts before you even open Game Settings.

| Ship + Badge | Not ship yet |
| --- | --- |
| Name, Description, Icon filled | Untitled Game and default icon |
| Access chosen on purpose | Nobody checked who can join |
| Badge awarded by the server at the finish | Badge created, but the code is silent |
| All 3 biomes clearable | One biome "almost ready" |
| Demo 60-90 s with no "wait a second" | Five minutes of improvisation |
| Output clean on a full clear | Red errors that "do not matter" |`,
      },
      {
        title: "Game Settings: name, description, icon",
        content: `In Studio: File → Game Settings → Basic Info. Three fields shape the first impression before anyone enters the game.

| Field | What to write | Example |
| --- | --- | --- |
| Name | Genre + hook, short | Neon Obby: 3 Biomes |
| Description | 1-2 sentences: what to do and how long | Clear forest, lava, and ice. ~3 min, 3 checkpoints, there is a secret. |
| Icon / Thumbnail | Shot of a bright biome with juice | Frame from 5.9 where particles are visible |`,
      },
      {
        title: "Access: Friends or Public",
        content: `In Game Settings → Permissions choose access on purpose.

| Access | When to use |
| --- | --- |
| Friends | Handoff to a mentor / class, balance still in flux |
| Public | Rubric passed, ready for strangers |`,
      },
      {
        title: "Badge on the Roblox site",
        content: `A Badge is created not in Studio, but on the site: Creator Dashboard → your game → Badges → Create a Badge.

Fill in:

- Name - a short achievement, e.g. Obby Finisher;
- Description - one sentence: "Cleared all 3 biomes to the finish";
- Image - a simple 512×512 icon, readable at small size.

After creating, copy the numeric Badge ID. It lives in the Script as a constant. You create the Badge once per project, not on every playtest.

| Step | Where | Result |
| --- | --- | --- |
| Create a Badge | Site | Badge exists on the game account |
| Copy ID | Badge page | Number for the Script |
| AwardBadge | Server Script | Player gets the reward |
| Player profile | Roblox site | Badge stays forever |`,
      },
      {
        title: "AwardBadge on the server at the finish",
        content: `Awarding always goes through BadgeService in a server Script. A LocalScript lets someone fake the reward without a real clear.

\`\`\`
local BadgeService = game:GetService("BadgeService")
local BADGE_ID = 000000000 -- your ID
local finishLine = workspace.Checkpoints.FinishLine
finishLine.Touched:Connect(function(hit)
local character = hit.Parent
local player = game.Players:GetPlayerFromCharacter(character)
if not player then return end
BadgeService:AwardBadge(player.UserId, BADGE_ID)
end)
\`\`\`

Call site - the same FinishLine from 5.3 where time is already tracked. AwardBadge is added next to it, not instead of the timer. Make sure the Part is Anchored and has a clear name - otherwise Touched never fires during the demo.

The GetPlayerFromCharacter filter is required: other Parts can touch the finish, not only HumanoidRootPart.

Like a stadium cashier issuing a ticket only at the finish turnstile, not from a fan's pocket.

**Do this now (8 min)**: wire AwardBadge on FinishLine in a Server Script and clear to the finish once in Play.`,
      },
      {
        title: "UserHasBadgeAsync and pcall",
        content: `You can call AwardBadge again without a loud error, but it wastes the service and looks sloppy. Before awarding, check whether the Badge is already owned.

\`\`\`
local success, hasBadge = pcall(function()
return BadgeService:UserHasBadgeAsync(player.UserId, BADGE_ID)
end)
if success and not hasBadge then
pcall(function()
BadgeService:AwardBadge(player.UserId, BADGE_ID)
end)
end
\`\`\`

pcall is the same guard you use for network services: the reply can be late or fail, and the game must not go red in Output. UserHasBadgeAsync is the anti-duplicate for rewards, just as debounce was the anti-duplicate for damage in 5.2.

| Without a check | With UserHasBadgeAsync |
| --- | --- |
| Every finish touch calls Award | A second touch is quietly skipped |
| Service spam | One honest award |
| Harder to debug | print(hasBadge) shows state right away |`,
      },
      {
        title: "System map before Ship",
        content: `Ship confirms that rows from the whole module work in one Place.

| Lesson | What you check now |
| --- | --- |
| 5.1 three biomes | Each is distinct and clearable |
| 5.2 hazards + debounce | No instant hit spam |
| 5.3 checkpoints + GUI | Respawn on the last one, timer visible |
| 5.4 while-platforms | Motion stable, Parts do not vanish |
| 5.5 secrets + key | Secret is findable, door opens |
| 5.7 difficulty curve | No sharp difficulty jump |
| 5.9 juice | Sound/particles on key actions, no spam |`,
      },
      {
        title: "60-90 second presentation",
        content: `A short demo for class or a mentor:

- (10 s) Name and idea: "This is Neon Obby, three biomes, goal - the finish."
- (15 s) Biome 1: hazard and checkpoint in action.
- (15 s) Biome 2: while-platform or another unique element.
- (15 s) Secret: key-door, if time allows.
- (15 s) Finish: line + Badge.
- (10 s) Close: "A full clear looks like this. Thanks."

Forbidden phrases at handoff: "wait a second," "I'll find it now," "it worked yesterday." If you stumble on a step - cut that step, do not stretch the timer.

Rehearse on a phone timer three times. The second rehearsal usually shows where you lose 20 seconds explaining instead of playing.

A movie trailer, not a full director's commentary.

**Do this now (8 min)**: one timed demo run; if >90 s - cut one explanation block.`,
      },
      {
        title: "Checkpoint: peer review rubric (~15 items)",
        content: `This is the lesson checkpoint - the control gate that decides whether the Place is ready to show. Give the table to a classmate: they play and mark yes / no / almost; you stay quiet.

A. First impression (1-4)

- Place name and description are clear;
- icon is not the default;
- Access is chosen on purpose;
- Spawn and the first step are obvious without explanations.

B. Clear (5-9)

- All 3 biomes clear without getting stuck;
- checkpoints keep progress after death;
- hazards give a chance to react (debounce works);
- the secret is findable in a reasonable time;
- difficulty rises smoothly from start to finish.

C. Ship quality (10-15)

- Juice is noticeable but not annoying;
- Badge awards exactly once at the finish;
- Output is clean on a full clear;
- a second finish touch does not award the Badge again;
- the demo fits in 60-90 s.

**Save**: Lesson 5.10 - Ship + Badge.

A red "no" in B blocks ship harder than a small miss in A. Clear first, then polish the poster. The checkpoint is passed only when B and C have no "no" - only then does switching Access to Public make sense.

**Do this now (10 min)**: self-score or peer review - list every "no" as fixes.`,
      },
      {
        title: "Typical ship fails and playtest",
        content: `| Symptom | Fix |
| --- | --- |
| Badge does not appear | Script on the server, not LocalScript; ID is correct |
| Badge "several times" | UserHasBadgeAsync before AwardBadge |
| Finish with no logic | FinishLine.Touched not connected |
| One biome is raw | Fix before Public |
| New Game in the name | Game Settings before showing |
| Demo 5+ minutes | Shortened structure from theory |`,
      },
      {
        title: "Handoff checklist and bridge to module 6",
        content: `Before the final Save, confirm:
- [ ] Name, Description, Icon filled
- [ ] Access chosen with a reason
- [ ] Badge on the site and ID in the Script
- [ ] AwardBadge on the server after FinishLine.Touched
- [ ] UserHasBadgeAsync + pcall block duplicates
- [ ] Checkpoint (rubric) passed
- [ ] Demo 60-90 s rehearsed
- [ ] Save Lesson 5.10 - Ship + Badge

Next, 6.1 - Core loop + scene opens Simulator. The same discipline "the server awards the reward" carries over to Coins and giveCoins. If the Badge still comes from a LocalScript - do not carry that hole into module 6.

Artifact of the day: a wrapped, showable obby with a one-time server reward. Ship loves a short winning clear, not the biggest map in the world.

**Do this now (2 min)**: Save with the exact name Lesson 5.10 - Ship + Badge.`,
      },
    ],
  },
    commonMistakes: [
    {
      "mistake": "Attempting to award badges from a client LocalScript",
      "explanation": "BadgeService:AwardBadge is strictly restricted to server Scripts for security.",
      "correctApproach": "Call BadgeService:AwardBadge(player.UserId, badgeId) inside a server Script on finish line touch."
    },
    {
      "mistake": "Badges fail to award due to empty or unconfigured badge IDs",
      "explanation": "Badges must be provisioned in the Roblox Creator dashboard first.",
      "correctApproach": "Create a Badge in Creator Hub and paste the numeric ID into your config."
    },
    {
      "mistake": "Game published without enforcing Avatar Rig type (R6 vs R15)",
      "explanation": "Jump clearances calibrated for R6 can fail on R15 due to animation differences.",
      "correctApproach": "In Game Settings → Avatar, lock the avatar type to match your jump tuning (e.g. R6 or R15)."
    }
  ],
  summary: "You passed the final checkpoint of module 5 and closed it with Ship + Badge: Game Settings with name, description, and icon, deliberate Access, a Badge from the site, and server AwardBadge on FinishLine with UserHasBadgeAsync. The checkpoint rubric and 60-90 s demo confirm a showable obby before moving to Simulator in 6.1.",
  practiceTask: {
    title: "Practice for 5.10 - Checkpoint: Ship + Badge",
    difficulty: "beginner",
    description: `**Goal:** one Place with Game Settings, a working Badge at the finish, and a passed checkpoint (rubric).

Part A - Settings and Badge (10 min)
1. Fill Name, Description, Icon.
2. Choose Access Friends or Public on purpose.
3. Create a Badge on the site, copy the Badge ID.

Part B - AwardBadge on the server (15 min)
1. Script on FinishLine.Touched calls AwardBadge.
2. Add UserHasBadgeAsync + pcall.
3. Check: a second finish touch does not award the Badge again.

Part C - Checkpoint and demo (10 min)
1. Pass ~15 items alone or with a peer.
2. Rehearse the 60-90 s demo.
3. Save: Lesson 5.10 - Ship + Badge.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Main goal of lesson 5.10?",
        options: [
          "Build a fourth biome",
          "Pass the final checkpoint and wrap the finished obby into a showable product with a Badge at the finish",
          "Delete the checkpoints from 5.3",
          "Start Simulator from scratch",
        ],
        correctAnswer: 1,
        explanation: "5.10 is a checkpoint and a wrap of the finished Obby into a product with a Badge, not new content.",
      },
      {
        id: "q2",
        type: MC,
        question: "Where do you fill Name, Description, Icon?",
        options: [
          "File -> Game Settings -> Basic Info",
          "In a Script via Instance.new",
          "Directly in BadgeService",
          "Only in Creator Dashboard without Studio",
        ],
        correctAnswer: 0,
        explanation: "Basic game info is filled in Studio Game Settings.",
      },
      {
        id: "q3",
        type: MC,
        question: "When is Access Public a smart choice?",
        options: [
          "Right after the first Play",
          "Instead of filling Description",
          "After passing the full ship rubric",
          "Public is always required from day one",
        ],
        correctAnswer: 2,
        explanation: "Public is chosen only after the full ship rubric is passed.",
      },
      {
        id: "q4",
        type: MC,
        question: "Where is a Badge created?",
        options: [
          "In Studio via Instance.new(\"Badge\")",
          "Automatically in ServerScriptService",
          "In Toolbox as a Model",
          "On the Roblox site: Creator Dashboard -> Badges",
        ],
        correctAnswer: 3,
        explanation: "A Badge is created on the site via Creator Dashboard.",
      },
      {
        id: "q5",
        type: MC,
        question: "Why AwardBadge only on the server?",
        options: [
          "LocalScript technically cannot see BadgeService",
          "Otherwise you can award yourself without a real clear",
          "The server is faster for UI",
          "It is required only for Friends places",
        ],
        correctAnswer: 1,
        explanation: "Client-side awarding would let someone fake the reward without clearing.",
      },
      {
        id: "q6",
        type: MC,
        question: "Why UserHasBadgeAsync before AwardBadge?",
        options: [
          "It replaces the Humanoid check",
          "It speeds up Terrain",
          "It blocks awarding the same Badge again",
          "Needed only in Friends mode",
        ],
        correctAnswer: 2,
        explanation: "The check prevents awarding the same Badge again.",
      },
      {
        id: "q7",
        type: MC,
        question: "Why pcall around BadgeService?",
        options: [
          "pcall speeds up AwardBadge",
          "Without pcall you cannot create a Badge on the site",
          "pcall replaces UserHasBadgeAsync",
          "The service may return an error - the game must not break",
        ],
        correctAnswer: 3,
        explanation: "pcall protects the game from crashing on an external service error.",
      },
      {
        id: "q8",
        type: MC,
        question: "How long is the target demo?",
        options: [
          "Must be 10+ minutes",
          "About 60-90 seconds with no teleprompter",
          "One screenshot is enough",
          "Exactly 5 seconds",
        ],
        correctAnswer: 1,
        explanation: "The demo is aimed at about 60-90 seconds with no prompts.",
      },
      {
        id: "q9",
        type: MC,
        question: "What does rubric category B (5-9) check?",
        options: [
          "Only the place name",
          "Only the icon color",
          "Clearability of biomes, checkpoints, hazards, secret, and the difficulty curve",
          "Only whether a Badge ID is in the file",
        ],
        correctAnswer: 2,
        explanation: "Category B checks clearability of all gameplay systems.",
      },
      {
        id: "q10",
        type: MC,
        question: "A typical 5.10 ship fail?",
        options: [
          "Checkpoints keep progress",
          "Output is clean",
          "Access is chosen on purpose",
          "Badge is called again without UserHasBadgeAsync",
        ],
        correctAnswer: 3,
        explanation: "Re-awarding a Badge without a check is a typical ship mistake.",
      },
      {
        id: "q11",
        type: MC,
        question: "Which lesson supplies juice for the demo?",
        options: [
          "5.9 - Sound + Particles",
          "5.2 - Hazards",
          "5.5 - Secrets",
          "5.1 - Biome design",
        ],
        correctAnswer: 0,
        explanation: "Juice for the demo comes from lesson 5.9.",
      },
      {
        id: "q12",
        type: MC,
        question: "What is in category A (first impression)?",
        options: [
          "Difficulty rises smoothly",
          "Place icon is not the default",
          "The secret is found quickly",
          "Badge awards once",
        ],
        correctAnswer: 1,
        explanation: "First impression scores, among other things, whether the place icon is not the default.",
      },
      {
        id: "q13",
        type: MC,
        question: "What NOT to do in 5.10?",
        options: [
          "Fill Game Settings",
          "Create a Badge on the site",
          "Build a fourth biome instead of wrapping",
          "Rehearse the demo",
        ],
        correctAnswer: 2,
        explanation: "5.10 wraps a finished project; it is not new content.",
      },
      {
        id: "q14",
        type: MC,
        question: "How does 5.10 prepare module 6?",
        options: [
          "Removes the habit of server rewards",
          "Replaces Obby with Tycoon in the same Place",
          "Teaches DataStore for coins right away",
          "Locks in the rule: the server awards the reward (next - Coins)",
        ],
        correctAnswer: 3,
        explanation: "The server-award principle carries into module 6 with Coins.",
      },
      {
        id: "q15",
        type: MC,
        question: "What is the exact name of Save?",
        options: [
          "Lesson 5.9 - Juice",
          "Lesson 5.10 - Ship + Badge",
          "Lesson 6.1 - Core Loop",
          "Obby Draft Final",
        ],
        correctAnswer: 1,
        explanation: "Practice 5.10 ends by saving Lesson 5.10 - Ship + Badge.",
      },
    ],
  },
}
