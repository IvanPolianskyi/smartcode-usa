/** Rich EN content for Roblox Module 12 - lessons 12.1-12.6 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson121 = {
  lessonId: 'lesson-roblox-12-1',
  moduleId: 'module-12',
  order: 1,
  title: '12.1 - Final Project: Plan',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Write a one-sentence game pitch and target player profile',
    'Define core loop and systems list from course modules',
    'Split must-have vs nice-to-have MVP scope',
    'Build a timeline with hour estimates and 30% buffer',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Module 12 - Release Day** - you **ship** what you built across 11 modules.

**Lesson flow:**
1. **Theory (40 min)** - GDD structure
2. **Practice (~25 min)** - write your Final Project GDD
3. **Quiz (10 min)** - **70%** pass

This is planning - not Studio coding yet.`,
      },
      {
        title: 'GDD for real creators',
        content: `A **Game Design Document** stops feature creep.

When excited, you want 50 systems. GDD forces **MVP** - what ships in time.

**Your final project** combines checkpoints:
- Hub / island (Module 1)
- Obby or race slice (2 or 6)
- Shop (7) + living NPCs (8)
- RPG inventory (9)
- Puzzle world (10)
- Polish (11)`,
      },
      {
        title: 'GDD must-have sections',
        content: `| Section | Your answer |
|---------|-------------|
| **Pitch** | 1 sentence store blurb |
| **Target player** | Age, skill, why fun |
| **Core loop** | Do → reward → repeat |
| **Systems list** | 6-8 bullets from course |
| **Art/audio mood** | 3 adjectives |
| **MVP scope** | Must ship this month |
| **Release checklist** | Publish steps |

**Example pitch:** *"Race, quest, and upgrade your gear in a living island hub - solo or with friends."*`,
      },
      {
        title: 'Core loop template',
        content: `\`\`\`
Spawn → explore hub → talk to NPC / start quest
→ complete challenge (obby / puzzle / combat)
→ earn coins + items → shop upgrade
→ repeat stronger → showcase win
\`\`\`

**30-second loop** players can explain to a friend.`,
      },
      {
        title: 'Must-have vs nice-to-have',
        content: `| Must-have (MVP) | Nice-to-have |
|-----------------|--------------|
| Spawn + guide NPC | 10 puzzle variants |
| 1 quest complete loop | Full 3-lap race |
| Shop buy 1 item | DataStore pets |
| Save inventory | Voice acting |
| Loading + basic SFX | Trailer video |

**Finished small game** beats giant unfinished dream.`,
      },
      {
        title: 'Timeline with buffer',
        content: `| Milestone | Hours | Done |
|-----------|-------|------|
| GDD + plan | 2 | |
| Integration | 8 | |
| Playtest fixes | 6 | |
| Publish + portfolio | 4 | |
| Showcase prep | 2 | |
| **Subtotal** | 22 | |
| **+30% buffer** | ~29 | |

Add 30% - something always breaks.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] 1-sentence pitch written
- [ ] Core loop diagram or bullets
- [ ] Must-have list ≤ 8 items
- [ ] Timeline with buffer
- [ ] Save notes: \`Lesson 12.1 - Final GDD\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'No MVP - everything must-have', explanation: 'Never ships.', correctApproach: 'Cut nice-to-have' },
    { mistake: 'Vague core loop', explanation: 'Team confusion.', correctApproach: 'Spawn to reward steps' },
    { mistake: 'Zero time estimates', explanation: 'Miss deadline.', correctApproach: 'Hours + buffer' },
    { mistake: 'Pitch is 1 paragraph', explanation: 'Not store-ready.', correctApproach: 'One sentence hook' },
  ],
  summary: `You drafted a practical GDD with pitch, core loop, systems list, MVP must-haves, and a buffered timeline - your final project now has a ship plan instead of vague ambition.`,
  practiceTask: {
    title: 'Final Project GDD (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Complete GDD document (doc or notes).

### Part A - Identity (10 min)
1. Pitch + target player
2. Core loop (5 steps)
3. Art/audio mood

### Part B - Scope (12 min)
1. Systems list from course modules
2. Must-have vs nice-to-have table
3. Timeline hours + 30% buffer

### Part C - Save (3 min)
1. Export/save GDD file
2. **Practice complete** - ready for 12.2 integration`,
    hints: [
      'Pitch like Roblox store description',
      'Must-have = what you demo on SHOWCASE DAY',
      'Optional: fair monetization note',
    ],
    optionalChallenge: 'Fair monetization concept (cosmetics only, no pay-to-win).',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'GDD helps prevent...', options: ['Uncontrolled scope creep', 'Walking', 'Terrain gen', 'Welds'], correctAnswer: 0, explanation: 'Focus.' },
      { id: 'q2', type: MC, question: 'MVP means...', options: ['Minimum viable shippable scope', 'Maximum everything', 'No features', 'Random'], correctAnswer: 0, explanation: 'Finishable.' },
      { id: 'q3', type: MC, question: 'Core loop describes...', options: ['Repeat player actions', 'Server IP', 'Robux cut', 'Font size'], correctAnswer: 0, explanation: 'Gameplay cycle.' },
      { id: 'q4', type: MC, question: '30% buffer is for...', options: ['Unexpected delays', 'Deleting GDD', 'Skipping test', 'No plan'], correctAnswer: 0, explanation: 'Reality.' },
      { id: 'q5', type: MC, question: 'Must-have vs nice-to-have...', options: ['Prioritizes shipping', 'Same thing', 'Banned', 'UI only'], correctAnswer: 0, explanation: 'Scope cut.' },
      { id: 'q6', type: MC, question: 'Module 12 is...', options: ['Release Day', 'Only terrain', 'Only sound', 'Module 1'], correctAnswer: 0, explanation: 'Final module.' },
      { id: 'q7', type: MC, question: 'Pitch should be...', options: ['One catchy sentence', '50 pages', 'Code only', 'Empty'], correctAnswer: 0, explanation: 'Store blurb.' },
      { id: 'q8', type: MC, question: 'Lesson 12.2 is...', options: ['Putting systems together', 'Only publish', 'Only GDD', 'Empty'], correctAnswer: 0, explanation: 'Integration.' },
      { id: 'q9', type: MC, question: 'Finished small game beats...', options: ['Giant unfinished project', 'No plan', 'No test', 'No UI'], correctAnswer: 0, explanation: 'Scope discipline.' },
      { id: 'q10', type: MC, question: 'Lesson 12.1 deliverable is...', options: ['Final Project GDD', 'Published game', 'Trailer only', 'Empty place'], correctAnswer: 0, explanation: 'Planning doc.' },
    ],
  },
}

export const enLesson122 = {
  lessonId: 'lesson-roblox-12-2',
  moduleId: 'module-12',
  order: 2,
  title: '12.2 - Putting It All Together',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Integrate loading, inventory, quests, shop, puzzle, and polish in one place',
    'Follow integration order to reduce conflicts',
    'Create profile reset command for testing',
    'Freeze features during integration sprint',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Architecture day - systems must work **together**, not only alone.

**Lesson flow:**
1. **Theory (40 min)** - integration order
2. **Practice (~25 min)** - merge into Final Build place
3. **Quiz (10 min)** - **70%** pass

Use best checkpoint place as base: **Module 11 - Game Polished**.`,
      },
      {
        title: 'Integration order',
        content: `| Step | System | Why this order |
|------|--------|----------------|
| 1 | Loading + Explorer clean | Foundation |
| 2 | Profile / DataStore save | Data before economy |
| 3 | Inventory + gear + shop | Economy stack |
| 4 | Quests + NPC dialogue | Progression |
| 5 | Puzzle / obby / combat slice | Challenge |
| 6 | Audio + UX pass | Polish last |

**Do not** add new features during integration - **freeze** scope.`,
      },
      {
        title: 'One place structure',
        content: `\`\`\`
FinalProject (place)
├── ReplicatedStorage/Remotes + Audio
├── ServerScriptService/Systems + Modules
├── StarterGui (Loading, Shop, Quest, Stats, Puzzle)
├── Workspace (Hub, NPCs, PuzzleWorld, Shop)
└── ServerStorage/Tools
\`\`\`

Copy systems from checkpoint saves - **one ItemDatabase**, **one RPGConfig**.`,
      },
      {
        title: 'Conflict debugging',
        content: `When clash happens:

1. **Log event flow** - print on quest complete, shop buy, puzzle win
2. **Isolate** - disable one system, retest
3. **Fix root cause** - not symptom

| Common clash | Fix |
|--------------|-----|
| Coins not saving | Inventory save after shop |
| Quest + dialogue stuck | Clear active flag on close |
| Double loading screen | ResetOnSpawn flags |
| Remote name mismatch | Remotes folder audit |`,
      },
      {
        title: 'Test reset command',
        content: `\`\`\`lua
-- Studio admin command only
local function resetProfile(player)
    playerInventories[player] = Inventory.new(12)
    playerEquipped[player] = { weapon=nil, armor=nil, trinket=nil }
    -- clear quest state
    savePlayer(player) -- or wipe DataStore key in test
    print("Reset", player.Name)
end
\`\`\`

Repeat integration tests without new accounts.`,
      },
      {
        title: 'Integration checklist',
        content: `- [ ] Join → loading → spawn (no errors)
- [ ] Talk NPC → quest starts → HUD updates
- [ ] Complete objective → coins/items
- [ ] Shop buy → inventory + stats
- [ ] Puzzle/obby once → reward
- [ ] Leave → rejoin → progress persists
- [ ] Save: \`Lesson 12.2 - Final Integration\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Adding features during integration', explanation: 'Never stabilizes.', correctApproach: 'Feature freeze' },
    { mistake: 'Two ItemDatabase copies', explanation: 'ID drift.', correctApproach: 'One module' },
    { mistake: 'Skip rejoin test', explanation: 'Save bugs ship.', correctApproach: 'Leave/rejoin each system' },
    { mistake: 'Merge places without cleanup', explanation: 'Duplicate scripts.', correctApproach: 'One Systems folder' },
  ],
  summary: `You integrated loading, economy, quests, challenges, and polish into one Final Build following a strict order, with conflict debugging and a test reset - the game is one coherent experience.`,
  practiceTask: {
    title: 'Systems integration sprint (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** One playable golden path, no red errors.

### Part A - Merge (15 min)
1. Base place from Game Polished
2. Wire checklist 6 rows - tick each
3. Feature freeze - no new ideas

### Part B - Debug (8 min)
1. Fix top integration clash from Output
2. resetProfile command for QA

### Part C - Save (2 min)
1. **Save to Roblox** → \`Lesson 12.2 - Final Integration\`
2. **Practice complete**`,
    hints: [
      'Print event flow when confused',
      'One remote naming convention',
      'Fallback UI if DataStore fails (challenge)',
    ],
    optionalChallenge: 'Graceful UI if profile load fails.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Integration order starts with...', options: ['Loading and clean structure', 'Publish first', 'Trailer', 'Random'], correctAnswer: 0, explanation: 'Foundation.' },
      { id: 'q2', type: MC, question: 'Feature freeze means...', options: ['No new features during merge', 'Delete all scripts', 'Stop testing', 'Remove UI'], correctAnswer: 0, explanation: 'Stability.' },
      { id: 'q3', type: MC, question: 'One ItemDatabase prevents...', options: ['Shop/inventory ID drift', 'Lag', 'Terrain', 'Sound'], correctAnswer: 0, explanation: 'Single truth.' },
      { id: 'q4', type: MC, question: 'resetProfile helps...', options: ['Repeat integration tests', 'Ban players', 'Publish', 'Remove NPCs'], correctAnswer: 0, explanation: 'QA tool.' },
      { id: 'q5', type: MC, question: 'Conflict debug fixes...', options: ['Root cause not symptom', 'Nothing', 'Only art', 'Only audio'], correctAnswer: 0, explanation: 'Proper fix.' },
      { id: 'q6', type: MC, question: 'Golden path tests...', options: ['Full loop spawn to reward', 'Explorer only', 'GDD only', 'Thumbnail'], correctAnswer: 0, explanation: 'End-to-end.' },
      { id: 'q7', type: MC, question: 'Lesson 12.2 builds on...', options: ['Lesson 12.1 GDD plan', 'Empty', 'Module 1 only', 'Coins only'], correctAnswer: 0, explanation: 'Plan then build.' },
      { id: 'q8', type: MC, question: 'Lesson 12.3 is...', options: ['Playtesting', 'Publish', 'Portfolio', 'SHOWCASE'], correctAnswer: 0, explanation: 'Testing.' },
      { id: 'q9', type: MC, question: 'Rejoin test verifies...', options: ['Persistence works', 'UI color', 'NPC name', 'Sky'], correctAnswer: 0, explanation: 'Save/load.' },
      { id: 'q10', type: MC, question: 'Lesson 12.2 save name...', options: ['Lesson 12.2 - Final Integration', 'SHOWCASE DAY', 'Published', 'GDD'], correctAnswer: 0, explanation: 'Save integration.' },
    ],
  },
}

export const enLesson123 = {
  lessonId: 'lesson-roblox-12-3',
  moduleId: 'module-12',
  order: 3,
  title: '12.3 - Testing',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Run three structured playtest sessions with a checklist',
    'Classify issues as critical, UX, balance, cosmetic',
    'Produce prioritized fix list with severity',
    'Fix repeated pain points before one-off opinions',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Playtesting with purpose** - not "watch friends click randomly."

**Lesson flow:**
1. **Theory (40 min)** - checklist + priorities
2. **Practice (~25 min)** - 3 sessions + fix list
3. **Quiz (10 min)** - **70%** pass

Use **Lesson 12.2 - Final Integration** build.`,
      },
      {
        title: 'Playtest checklist',
        content: `| # | Observation | Pass? | Notes |
|---|-------------|-------|-------|
| 1 | Onboarding clear in 60s | | |
| 2 | First reward within 10 min | | |
| 3 | No soft-lock | | |
| 4 | Shop/quest/puzzle understandable | | |
| 5 | Save works after rejoin | | |
| 6 | No major Output errors | | |
| 7 | Performance acceptable | | |
| 8 | Audio not ear-fatigue | | |
| 9 | UI readable mobile size | | |
| 10 | Fun - would play again? | | |`,
      },
      {
        title: 'Severity categories',
        content: `| Category | Examples | Launch? |
|----------|----------|---------|
| **P0 Critical** | Crash, data loss, soft-lock | Fix now |
| **P1 UX** | Confused goal, tiny text | Fix now |
| **P2 Balance** | Too hard slime | Soon |
| **P3 Cosmetic** | Wrong sign color | Later |

**Launch fixes P0-P1** before P3.`,
      },
      {
        title: 'Session protocol',
        content: `**Per session (15 min play):**
1. Tester gets **no hints** first 5 min
2. **Think aloud** encouraged
3. You **watch** - do not coach
4. Timestamp issues: \`04:20 - did not find shop\`
5. Debrief 3 questions:
   - What was fun?
   - What was confusing?
   - What broke?

**3 different testers** if possible - patterns matter.`,
      },
      {
        title: 'Fix list template',
        content: `| ID | Issue | Severity | Owner | Status |
|----|-------|----------|-------|--------|
| 1 | Quest HUD hidden | P1 | You | fixed |
| 2 | Coin save fail | P0 | You | open |

Fix **repeated** issues - if 2/3 testers stuck at shop, fix shop sign.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] 3 playtests completed
- [ ] Fix list with P0/P1 addressed
- [ ] Golden path passes after fixes
- [ ] Save: \`Lesson 12.3 - Playtest Pass\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Coaching during test', explanation: 'Hides UX bugs.', correctApproach: 'Watch silent first' },
    { mistake: 'One tester only', explanation: 'Miss patterns.', correctApproach: 'Three sessions' },
    { mistake: 'Fixing cosmetics before soft-lock', explanation: 'Wrong priority.', correctApproach: 'P0 first' },
    { mistake: 'No written fix list', explanation: 'Forget issues.', correctApproach: 'Tracker table' },
  ],
  summary: `You ran three structured playtests with a severity-based fix list, prioritized critical and UX issues, and verified the golden path after fixes - the build is launch-candidate quality.`,
  practiceTask: {
    title: 'Playtesting checklist run (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** 3 sessions + prioritized fixes.

### Part A - Tests (18 min)
1. Run checklist with 3 testers (or 3 self runs blind)
2. Log timestamps + severity

### Part B - Fixes (5 min)
1. Fix all P0 and top P1 issues
2. Retest golden path once

### Part C - Save (2 min)
1. **Save to Roblox** → \`Lesson 12.3 - Playtest Pass\`
2. **Practice complete**`,
    hints: [
      'Think aloud reveals confusion',
      'Repeated pain > one opinion',
      'Survey before/after optional',
    ],
    optionalChallenge: 'Google Form survey before/after fixes.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'P0 issues are...', options: ['Critical launch blockers', 'Cosmetic only', 'Optional', 'Future'], correctAnswer: 0, explanation: 'Fix now.' },
      { id: 'q2', type: MC, question: 'Think aloud helps find...', options: ['UX confusion', 'Robux', 'Terrain', 'Version'], correctAnswer: 0, explanation: 'Player mind.' },
      { id: 'q3', type: MC, question: 'Three sessions find...', options: ['Repeated patterns', 'Nothing', 'Only bugs', 'Only art'], correctAnswer: 0, explanation: 'Pattern data.' },
      { id: 'q4', type: MC, question: 'Do not coach early because...', options: ['Hides real onboarding', 'Required', 'Faster', 'Rules'], correctAnswer: 0, explanation: 'Valid test.' },
      { id: 'q5', type: MC, question: 'Fix priority before cosmetic...', options: ['Critical and UX', 'Colors first', 'Trailer first', 'Skip'], correctAnswer: 0, explanation: 'Launch order.' },
      { id: 'q6', type: MC, question: 'Lesson 12.3 prepares for...', options: ['Publish in 12.4', 'GDD only', 'Terrain', 'Empty'], correctAnswer: 0, explanation: 'Launch ready.' },
      { id: 'q7', type: MC, question: 'Soft-lock is severity...', options: ['P0 critical', 'P3 cosmetic', 'Ignore', 'Feature'], correctAnswer: 0, explanation: 'Blocker.' },
      { id: 'q8', type: MC, question: 'Golden path after fixes...', options: ['Must pass', 'Optional', 'Deleted', 'Banned'], correctAnswer: 0, explanation: 'Verification.' },
      { id: 'q9', type: MC, question: 'Lesson 12.4 covers...', options: ['Publishing to Roblox', 'Only testing', 'Only GDD', 'NPC'], correctAnswer: 0, explanation: 'Release.' },
      { id: 'q10', type: MC, question: 'Lesson 12.3 save name...', options: ['Lesson 12.3 - Playtest Pass', 'Published', 'Portfolio', 'SHOWCASE'], correctAnswer: 0, explanation: 'Save test pass.' },
    ],
  },
}

export const enLesson124 = {
  lessonId: 'lesson-roblox-12-4',
  moduleId: 'module-12',
  order: 4,
  title: '12.4 - Publishing',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Publish place to Roblox with title and description',
    'Upload icon and thumbnail that explain gameplay',
    'Configure game access and safety settings',
    'Test published experience from fresh account',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Publish** is more than one button - metadata, visuals, safety, live test.

**Lesson flow:**
1. **Theory (40 min)** - publish pipeline
2. **Practice (~25 min)** - publish your final project
3. **Quiz (10 min)** - **70%** pass`,
      },
      {
        title: 'Pre-publish sanity pass',
        content: `| Check | Done? |
|-------|-------|
| Latest save uploaded | |
| No Studio-only hacks | |
| DataStore API enabled (if used) | |
| Chat/filter appropriate | |
| No broken spawn | |
| Game name spelled right | |
| Description matches actual gameplay | |`,
      },
      {
        title: 'Publish step-by-step',
        content: `1. **File → Publish to Roblox** (or Save to Roblox As)
2. **Name** - clear, searchable (not "Untitled")
3. **Description** - hook + what you do + controls hint
4. **Genre/tags** - match content
5. **Icon** 512×512 - readable at small size
6. **Thumbnails** - gameplay, not blank baseplate
7. **Configure** → permissions (public/private), age
8. **Create** → copy **game link**`,
      },
      {
        title: 'Description template',
        content: `\`\`\`
[Hook sentence from GDD pitch]

WHAT YOU DO:
• Complete quests from Guide Maya
• Solve laser puzzles and earn coins
• Buy gear and level up stats

TIP: Talk to the yellow marker at spawn first!

Built in SmartCode Academy Roblox Studio course.
\`\`\`

**Honest** - no fake promises.`,
      },
      {
        title: 'Icon and thumbnail tips',
        content: `| Asset | Tip |
|-------|-----|
| **Icon** | One character + bright background |
| **Thumb 1** | Action shot - puzzle or shop |
| **Thumb 2** | Hub wide shot |
| **Contrast** | Readable on phone home screen |

Avoid cluttered text on icon - illegible small.`,
      },
      {
        title: 'Launch safety basics',
        content: `- **Public** only when ready for strangers
- Review **chat** behavior in published place
- **Report** system exists (Roblox default)
- No exploitable remotes (server validates all)
- **Alt account test** - join as new player

**Permissions:** who can edit vs play - team roles if group game.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Published to Roblox
- [ ] Icon + 1+ thumbnail uploaded
- [ ] Description matches GDD pitch
- [ ] Live link tested (fresh join)
- [ ] Save notes + link: \`Lesson 12.4 - Published\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Description promises features not in game', explanation: 'Bad reviews.', correctApproach: 'Honest hook' },
    { mistake: 'Default gray thumbnail', explanation: 'Low clicks.', correctApproach: 'Gameplay screenshot' },
    { mistake: 'Never test live link', explanation: 'Publish broken build.', correctApproach: 'Alt account join' },
    { mistake: 'Studio API off but game uses DataStore', explanation: 'Save fails live.', correctApproach: 'Enable API services' },
  ],
  summary: `You completed pre-publish checks, published with title/description/icon/thumbnails, configured access settings, and verified the live link - your game is on Roblox for real players.`,
  practiceTask: {
    title: 'Publish to Roblox (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Live public or unlisted game link.

### Part A - Assets (10 min)
1. Write description from GDD
2. Prepare icon 512×512 + 1 thumbnail

### Part B - Publish (12 min)
1. Publish to Roblox - all metadata
2. Configure access + age settings

### Part C - Live test (3 min)
1. Join from link (alt account if possible)
2. Golden path works on live
3. **Practice complete** - save game URL in GDD`,
    hints: [
      'Screenshot Studio for thumbnails',
      'Private publish first for teacher review',
      'A/B thumbs optional challenge',
    ],
    optionalChallenge: 'Two thumbnail variants for click test.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Publish includes...', options: ['Metadata icon thumbnails settings', 'Only code', 'Only GDD', 'Terrain'], correctAnswer: 0, explanation: 'Full pipeline.' },
      { id: 'q2', type: MC, question: 'Description should...', options: ['Match real gameplay', 'Promise fake features', 'Be empty', 'Hide controls'], correctAnswer: 0, explanation: 'Honesty.' },
      { id: 'q3', type: MC, question: 'Icon must read well...', options: ['At small phone size', 'Only 4K', 'Never', 'As paragraph'], correctAnswer: 0, explanation: 'Discoverability.' },
      { id: 'q4', type: MC, question: 'Alt account test finds...', options: ['Live-only bugs', 'Nothing', 'Terrain bugs', 'GDD bugs'], correctAnswer: 0, explanation: 'Fresh player.' },
      { id: 'q5', type: MC, question: 'DataStore games need...', options: ['API services enabled', 'No publish', 'No scripts', 'UI only'], correctAnswer: 0, explanation: 'Live saves.' },
      { id: 'q6', type: MC, question: 'Lesson 12.4 follows...', options: ['12.3 playtest pass', '12.1 only', 'Empty', 'Module 1'], correctAnswer: 0, explanation: 'Ready build.' },
      { id: 'q7', type: MC, question: 'Lesson 12.5 is...', options: ['Portfolio post', 'More coding', 'Terrain', 'NPC only'], correctAnswer: 0, explanation: 'Show work.' },
      { id: 'q8', type: MC, question: 'Public publish when...', options: ['Ready for strangers', 'Never tested', 'Broken', 'Empty'], correctAnswer: 0, explanation: 'Safety.' },
      { id: 'q9', type: MC, question: 'Server validates remotes because...', options: ['Live exploiters exist', 'Not needed', 'Client only', 'Lag'], correctAnswer: 0, explanation: 'Security.' },
      { id: 'q10', type: MC, question: 'Lesson 12.4 deliverable is...', options: ['Live Roblox game link', 'GDD only', 'Trailer', 'Notes only'], correctAnswer: 0, explanation: 'Published.' },
    ],
  },
}

export const enLesson125 = {
  lessonId: 'lesson-roblox-12-5',
  moduleId: 'module-12',
  order: 5,
  title: '12.5 - Portfolio',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Write portfolio post with pitch, systems, challenge, lessons',
    'Include GIFs or screenshots and playable link',
    'Highlight three technical systems from the course',
    'Use clear devforum-style humble tone',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Portfolio** proves you think like a developer - not only play like one.

**Lesson flow:**
1. **Theory (40 min)** - post structure
2. **Practice (~25 min)** - portfolio + dev post draft
3. **Quiz (10 min)** - **70%** pass`,
      },
      {
        title: 'Portfolio storytelling',
        content: `Screenshots alone = weak.

Strong portfolio shows:
- **What** you built
- **How** (systems)
- **Hardest bug** and fix
- **What you learned**
- **Play link**`,
      },
      {
        title: 'Post structure',
        content: `## [Game Name] - Roblox Studio Final Project

**Pitch:** one sentence

**What I built:**
- Client-server shop (Module 7)
- Quest + NPC hub (Module 8)
- RPG inventory + save (Module 9)
- Laser puzzle + procedural rounds (Module 10)

**Hardest challenge:**
[e.g. DataStore inventory desync - fixed with versioned serialize]

**What I learned:**
- Server authority for economy
- Event-driven > spam loops

**Play:** [Roblox link]

**Screenshots:** 3-5 images or GIFs`,
      },
      {
        title: 'Three systems to highlight',
        content: `Pick your **proudest 3** from course:

| Example | One-line brag |
|---------|----------------|
| Shop | Secure server cashier with RemoteEvents |
| Quest | Per-player state table, no global exploit |
| Puzzle | Raycast targets + procedural variants |
| Racing | 3-lap checkpoint order validation |
| Polish | Loading + layered SFX + UX pass |

**Before/after** one screenshot if possible.`,
      },
      {
        title: 'Devforum-ready voice',
        content: `**Do:**
- Specific technical terms
- Honest challenge story
- Ask for feedback

**Don't:**
- "BEST GAME EVER!!!"
- Vague "it was hard"
- No link, no evidence

**90-sec trailer** optional - strongest showcase asset.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Post draft complete (all sections)
- [ ] 3+ screenshots or GIFs
- [ ] Play link works
- [ ] 3 systems highlighted with detail
- [ ] Save: \`Lesson 12.5 - Portfolio Post\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Hype without technical detail', explanation: 'Not credible.', correctApproach: 'Systems + evidence' },
    { mistake: 'Broken play link in post', explanation: 'Embarrassing.', correctApproach: 'Test link before post' },
    { mistake: 'No challenge story', explanation: 'Miss growth narrative.', correctApproach: 'Hardest bug paragraph' },
    { mistake: 'Wall of text no images', explanation: 'Nobody reads.', correctApproach: 'GIFs/screenshots' },
  ],
  summary: `You wrote a portfolio post with pitch, three technical highlights, challenge story, lessons learned, media, and play link - you can present yourself as a serious Roblox creator.`,
  practiceTask: {
    title: 'Portfolio + dev post (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Publishable portfolio entry.

### Part A - Draft (15 min)
1. All post sections filled
2. 3 systems highlighted
3. Hardest challenge + fix

### Part B - Media (8 min)
1. 3 screenshots or 1 short GIF
2. Test play link in post

### Part C - Share (2 min)
1. Save to doc / class platform
2. **Practice complete**`,
    hints: [
      'GIF: 10-20 sec golden path',
      'Before/after Explorer or UI',
      'End with "feedback welcome"',
    ],
    optionalChallenge: '90-second trailer video.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Strong portfolio shows...', options: ['Process and systems not only screenshots', 'Only hype', 'No link', 'Empty'], correctAnswer: 0, explanation: 'Storytelling.' },
      { id: 'q2', type: MC, question: 'Hardest challenge section shows...', options: ['Growth and problem solving', 'Nothing', 'Only art', 'Only music'], correctAnswer: 0, explanation: 'Credibility.' },
      { id: 'q3', type: MC, question: 'Play link must...', options: ['Work when clicked', 'Be hidden', 'Fake', 'Optional always'], correctAnswer: 0, explanation: 'Proof.' },
      { id: 'q4', type: MC, question: 'Devforum voice is...', options: ['Clear specific humble', 'All caps hype', 'Rude', 'Empty'], correctAnswer: 0, explanation: 'Professional.' },
      { id: 'q5', type: MC, question: 'Highlight 3 systems to...', options: ['Show technical depth', 'Confuse reader', 'Remove game', 'Skip course'], correctAnswer: 0, explanation: 'Pride points.' },
      { id: 'q6', type: MC, question: 'Lesson 12.5 follows...', options: ['12.4 published game', '12.1 only', 'Empty', 'Test only'], correctAnswer: 0, explanation: 'Need link.' },
      { id: 'q7', type: MC, question: 'Lesson 12.6 is...', options: ['SHOWCASE DAY', 'GDD', 'Publish again', 'Module 1'], correctAnswer: 0, explanation: 'Finale.' },
      { id: 'q8', type: MC, question: 'Before/after helps...', options: ['Show progress', 'Lag', 'Ban', 'Delete'], correctAnswer: 0, explanation: 'Visual proof.' },
      { id: 'q9', type: MC, question: 'Ask for feedback at end...', options: ['Invites community', 'Required Roblox', 'Bans', 'Removes'], correctAnswer: 0, explanation: 'Engagement.' },
      { id: 'q10', type: MC, question: 'Lesson 12.5 deliverable is...', options: ['Portfolio post draft', 'New game', 'Only icon', 'GDD only'], correctAnswer: 0, explanation: 'Portfolio.' },
    ],
  },
}

export const enLesson126 = {
  lessonId: 'lesson-roblox-12-6',
  moduleId: 'module-12',
  order: 6,
  title: '12.6 - SHOWCASE DAY',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Deliver 20-second pitch and live gameplay demo',
    'Present three technical systems and challenge story',
    'Share lessons learned and future roadmap',
    'Prepare backup demo if live fails',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**SHOWCASE DAY** - you present like a **real game developer**.

This is the **course finale** - celebrate 72 lessons of work.

**Presentation time:** ~5-8 minutes + Q&A`,
      },
      {
        title: 'Presentation blueprint',
        content: `| # | Segment | Time |
|---|---------|------|
| 1 | **Pitch** - hook sentence | 20 sec |
| 2 | **Live demo** - golden path | 2-3 min |
| 3 | **Systems deep dive** - 3 highlights | 1-2 min |
| 4 | **Challenge + solution** - one story | 1 min |
| 5 | **Lessons learned** - 3 bullets | 30 sec |
| 6 | **Roadmap** - next update | 30 sec |
| 7 | **Ask** - feedback / testers | 15 sec |`,
      },
      {
        title: 'Demo backup plan',
        content: `If live fails:
- **Video recording** of golden path (90 sec)
- **Screenshot slideshow** with voiceover
- Second device logged in as backup

**Rehearse 3 times** minimum - confidence from practice.

**Printed cue card:** pitch + 3 system names + link.`,
      },
      {
        title: 'What to say - systems',
        content: `**Example script (adapt yours):**

*"I built a hub where server-authoritative shop and quests feed an RPG inventory with DataStore save. The laser puzzle uses raycasts and procedural layouts - Module 10. Hardest bug was double-spend on shop clicks - fixed with purchase lock. Next update: co-op races and one new quest chain."*`,
      },
      {
        title: 'Q&A preparation',
        content: `Expected questions:
- How long did it take?
- What would you do differently?
- Is it mobile friendly?
- Can I play? → **link**
- Did AI help? → honest answer per class rules

**Short clear answers** - 30 seconds each.`,
      },
      {
        title: 'Course completion',
        content: `You completed **12 modules, 72 lessons**:

| Module | You shipped |
|--------|-------------|
| 1-2 | World + obby |
| 3-4 | Economy + tycoon |
| 5-6 | Combat + racing |
| 7-8 | Shop + living world |
| 9-10 | RPG + puzzles |
| 11-12 | Polish + release |

**Save:** \`SmartCode - Final Showcase\` + celebrate.`,
      },
      {
        title: 'Before showcase checklist',
        content: `- [ ] 3 rehearsals done
- [ ] Backup video/screenshots ready
- [ ] Play link on slide/post
- [ ] Pitch memorized or on card
- [ ] **SHOWCASE delivered**`,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'No rehearsal', explanation: 'Rambling or overtime.', correctApproach: '3 practice runs' },
    { mistake: 'Only technical jargon', explanation: 'Audience lost.', correctApproach: 'Pitch then demo' },
    { mistake: 'No backup if live fails', explanation: 'Panic.', correctApproach: 'Video ready' },
    { mistake: 'Skip lessons learned', explanation: 'Miss growth story.', correctApproach: '3 honest bullets' },
  ],
  summary: `You delivered SHOWCASE DAY with pitch, live demo, systems story, challenge reflection, and roadmap - the SmartCode Roblox Studio course is complete and you ship as a creator.`,
  practiceTask: {
    title: 'SHOWCASE DAY presentation (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Confident 5-8 min presentation.

### Part A - Prep (15 min)
1. Write cue card - blueprint segments
2. Record 90 sec backup video
3. Rehearse timing 3x

### Part B - Present (20 min)
1. Deliver to class / teacher / record
2. Live demo or backup
3. Q&A - 2 questions answered

### Part C - Complete (5 min)
1. Submit portfolio link + recording if required
2. **Course complete** - 72/72 lessons
3. Celebrate`,
    hints: [
      'Smile at pitch - you earned this',
      'Demo slow - audience sees UI',
      'One clear ask at end',
    ],
    optionalChallenge: 'Post-show Q&A + public roadmap board.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'SHOWCASE starts with...', options: ['20-second pitch', 'Hour of code', 'Random', 'GDD only'], correctAnswer: 0, explanation: 'Hook first.' },
      { id: 'q2', type: MC, question: 'Backup video if...', options: ['Live demo fails', 'Never', 'Required always', 'Banned'], correctAnswer: 0, explanation: 'Safety net.' },
      { id: 'q3', type: MC, question: 'Three rehearsals build...', options: ['Confidence', 'Lag', 'Bugs', 'Robux'], correctAnswer: 0, explanation: 'Practice.' },
      { id: 'q4', type: MC, question: 'Systems deep dive covers...', options: ['3 technical highlights', 'Nothing', 'Only art', 'Only name'], correctAnswer: 0, explanation: 'Depth.' },
      { id: 'q5', type: MC, question: 'Roadmap shares...', options: ['Future updates', 'Past only', 'Secrets', 'Passwords'], correctAnswer: 0, explanation: 'Forward look.' },
      { id: 'q6', type: MC, question: 'Course has...', options: ['12 modules 72 lessons', '1 lesson', 'No modules', '50 modules'], correctAnswer: 0, explanation: 'Full curriculum.' },
      { id: 'q7', type: MC, question: 'End with clear ask for...', options: ['Feedback or testers', 'Money only', 'Nothing', 'Ban'], correctAnswer: 0, explanation: 'Engagement.' },
      { id: 'q8', type: MC, question: 'Lesson 12.6 completes...', options: ['Entire Roblox course EN rich path', 'Module 11 only', 'Module 1', 'Nothing'], correctAnswer: 0, explanation: 'Finale.' },
      { id: 'q9', type: MC, question: 'Challenge story shows...', options: ['Problem solving growth', 'Hype only', 'No work', 'Copy paste'], correctAnswer: 0, explanation: 'Authenticity.' },
      { id: 'q10', type: MC, question: 'After showcase you are...', options: ['Launch-ready creator mindset', 'Done forever no updates', 'Non-coder', 'Tester only'], correctAnswer: 0, explanation: 'Graduate builder.' },
    ],
  },
}
