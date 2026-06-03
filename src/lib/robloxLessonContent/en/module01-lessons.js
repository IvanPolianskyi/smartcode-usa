/** Rich EN content for Roblox Module 01 - lessons 1.1-1.3 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson11 = {
  lessonId: 'lesson-roblox-1-1',
  moduleId: 'module-01',
  order: 1,
  title: '1.1 - Welcome to Studio',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Install Roblox Studio and open the Baseplate template',
    'Navigate the Viewport with W/A/S/D and mouse controls',
    'Use Explorer and Properties to inspect and edit objects',
    'Create Parts with color, size, material, and Anchored',
    'Save your first place to Roblox cloud',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Welcome to **Roblox Studio** - the tool behind obbies, simulators, tycoons, and roleplay worlds you play every day.

**Lesson flow:**
1. **Theory (40 min)** - read each section; try shortcuts in Studio as you go
2. **Practice (~25 min in Studio)** - build three Parts and save your place
3. **Quiz (10 min)** - 10 questions; pass with **70%** to unlock the next lesson

Keep Studio open beside this page. Learning game dev works best when you **build while you read**.`,
      },
      {
        title: 'Player vs developer mindset',
        content: `A **player** asks: "How do I win this level?"

A **developer** asks:
- What should happen when the player jumps here?
- Which objects need to stay still?
- What color tells the player "safe" vs "danger"?

You are switching to developer mode. Every famous Roblox game started with someone placing their **first Part** - exactly what you will do today.`,
      },
      {
        title: 'Install Studio (step by step)',
        content: `1. Open **create.roblox.com** and sign in (parent approval required under 13)
2. Click **Start Creating** - the Roblox Studio installer downloads
3. Run the installer; first launch may take a few minutes
4. On the home screen choose **New** → **Baseplate**

**Baseplate** = flat floor + sky. Perfect for Lesson 1.

**Troubleshooting:** If Studio will not open, update graphics drivers and confirm you have at least 4 GB RAM and Windows 10 / macOS 10.13+.`,
      },
      {
        title: 'Studio layout - know your panels',
        content: `| Area | Purpose |
|------|---------|
| **Viewport** (center) | 3D world you build in |
| **Ribbon / Home** (top) | Part, Move, Scale, Play |
| **Explorer** (right) | Tree of every object |
| **Properties** (right, below) | Settings for selected object |
| **Output** (bottom) | Errors from scripts (later) |

**Exercise (3 min):** Click the Baseplate in the Viewport. Watch it highlight in Explorer. In Properties find **Name**, **Size**, **Anchored**.`,
      },
      {
        title: 'Camera controls - fly like a director',
        content: `| Action | Control |
|--------|---------|
| Move forward / back | **W** / **S** |
| Strafe left / right | **A** / **D** |
| Move up / down | **E** / **Q** |
| Rotate view | **Right mouse** + drag |
| Zoom | **Mouse wheel** |
| Focus selection | Select object → **F** |

**Exercise (5 min):** Circle the Baseplate from above, from the side, and from ground level. Use **F** after selecting the floor.`,
      },
      {
        title: 'Explorer - the family tree of your game',
        content: `Everything in the game is an **Instance** in a parent-child tree.

**Workspace** holds the 3D world. You will add Parts here.

**Useful habits:**
- **Single click** - select
- **Double-click name** - rename (use real names: \`PurpleTower\`, not \`Part\`)
- **Delete** - removes object
- **Ctrl + D** - duplicate

**Exercise (5 min):** Expand Workspace. Rename \`Baseplate\` to \`IslandFloor\` if you like.`,
      },
      {
        title: 'Properties - the passport of every object',
        content: `When a **Part** is selected, Properties shows:

| Property | Meaning |
|----------|---------|
| **Size** | X width, Y height, Z depth (studs) |
| **Position** | Location in the world |
| **BrickColor** | Preset colors |
| **Material** | Visual style (Metal, Neon, Wood…) |
| **Anchored** | If true, object ignores gravity |
| **CanCollide** | If true, players bump into it |

**Golden rule for Lesson 1:** floors and decoration → **Anchored = true**.`,
      },
      {
        title: 'Create your first Parts',
        content: `**Insert a Part:**
- Home → **Part** → Block (or Sphere / Cylinder)
- Shortcut: **Ctrl + Shift + P** (Windows)

**Transform tools:**
| Key | Tool |
|-----|------|
| **W** | Move |
| **E** | Scale |
| **R** | Rotate |

**Exercise (10 min):** Add one Block. Scale it with **E**. Move it with **W**. Change BrickColor to a color you like. Set **Anchored = true**. Press **Play** (F5) - it should not fall.`,
      },
      {
        title: 'Materials and Neon glow',
        content: `**Material** changes how light hits the surface:
- **SmoothPlastic** - clean default
- **Metal** - shiny platforms
- **Neon** - glows (great for signs and magic)

Combine **Neon** + bright **BrickColor** for a sci-fi look.

**Transparency** (0-1): 0 = solid, 1 = invisible. Use 0.3 for glass later.

**Exercise (5 min):** Make one Part **Neon** cyan. Press Play in a dark ClockTime to see it glow (Lighting → ClockTime).`,
      },
      {
        title: 'Save to Roblox cloud',
        content: `**File → Save to Roblox** (not only Save to File on disk).

Pick a name: \`Lesson 1.1 - My First Scene\`

Your place is stored on your account - you can open it from any computer with Studio.

**Before practice checklist:**
- [ ] I can move the camera comfortably
- [ ] I found Explorer and Properties
- [ ] I inserted at least one Part and set Anchored
- [ ] I know how to press Play and Stop`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Parts fall through the floor when I press Play',
      explanation: 'Gravity pulls unanchored Parts down.',
      correctApproach: 'Select the Part → Properties → Anchored ✓',
    },
    {
      mistake: 'I cannot find Explorer',
      explanation: 'Panels can be closed accidentally.',
      correctApproach: 'View tab → enable Explorer and Properties',
    },
    {
      mistake: 'Changes disappear after closing Studio',
      explanation: 'Only saved places persist to your account.',
      correctApproach: 'File → Save to Roblox after every practice session',
    },
  ],
  summary: `You learned what Roblox Studio is, how to move the camera, how Explorer and Properties work, and how to add anchored Parts with color and material. Your practice scene is the first entry in your game developer portfolio.`,
  practiceTask: {
    title: 'Studio practice - My First Scene (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Prove you can build and save a simple scene.

### Part A - Purple tower (8 min)
1. Insert **Block** → Name: \`PurpleTower\`
2. Size: \`8, 8, 8\` | BrickColor: purple | Material: SmoothPlastic
3. Anchored: **true** | Place on the Baseplate

### Part B - Red platform (8 min)
1. Insert **Block** → Name: \`RedPlatform\`
2. Size: \`20, 1, 4\` | BrickColor: Bright red | Material: Metal
3. Anchored: **true** | Use **W** to position like a walkway

### Part C - Neon sphere (5 min)
1. Insert **Sphere** → Name: \`GlowOrb\`
2. Size: \`3, 3, 3\` | Material: **Neon** | Anchored: **true**

### Test & save (4 min)
1. Press **Play** - nothing should fall
2. **File → Save to Roblox** → \`Lesson 1.1 - My First Scene\`
3. Return here and click **Practice complete**`,
    hints: [
      'Rename every Part - good names save hours later',
      'If something falls, Stop Play, select it, enable Anchored',
      'Use F to frame the object you are editing',
    ],
    optionalChallenge: 'Add **Atmosphere** under Lighting and set ClockTime to 17 for a sunset screenshot.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'What template should you use for Lesson 1?', options: ['Obby', 'Baseplate', 'Flat Terrain', 'Empty'], correctAnswer: 1, explanation: 'Baseplate gives a simple floor to build on.' },
      { id: 'q2', type: MC, question: 'Which key focuses the camera on the selected object?', options: ['P', 'F', 'G', 'H'], correctAnswer: 1, explanation: 'F frames the selection in the Viewport.' },
      { id: 'q3', type: MC, question: 'Where do you see the list of all objects?', options: ['Properties', 'Explorer', 'Output', 'Toolbox'], correctAnswer: 1, explanation: 'Explorer shows the instance tree.' },
      { id: 'q4', type: MC, question: 'What does Anchored = true do?', options: ['Makes Part invisible', 'Stops gravity on that Part', 'Deletes the Part', 'Adds sound'], correctAnswer: 1, explanation: 'Anchored Parts stay in place during Play.' },
      { id: 'q5', type: MC, question: 'Which tool key opens Move?', options: ['W', 'E', 'R', 'T'], correctAnswer: 0, explanation: 'W = Move, E = Scale, R = Rotate.' },
      { id: 'q6', type: MC, question: 'Which Material makes a Part glow?', options: ['Wood', 'Grass', 'Neon', 'Sand'], correctAnswer: 2, explanation: 'Neon material emits light.' },
      { id: 'q7', type: MC, question: 'Size uses three numbers. What do they mean?', options: ['RGB colors', 'X width, Y height, Z depth', 'Rotation angles', 'Player speed'], correctAnswer: 1, explanation: 'Size is measured in studs on X, Y, Z.' },
      { id: 'q8', type: MC, question: 'How do you save to your Roblox account?', options: ['File → Save to File only', 'File → Save to Roblox', 'Edit → Copy', 'Home → Publish'], correctAnswer: 1, explanation: 'Save to Roblox uploads the place to your account.' },
      { id: 'q9', type: MC, question: 'Red text in Output usually means…', options: ['A script error', 'Success message', 'Network lag', 'New Part added'], correctAnswer: 0, explanation: 'Output shows errors when scripts break.' },
      { id: 'q10', type: MC, question: 'Before Play, floors and walls should usually be…', options: ['Anchored false', 'Anchored true', 'Transparency 1', 'CanCollide false'], correctAnswer: 1, explanation: 'Anchored true keeps building parts stable.' },
    ],
  },
}

export const enLesson12 = {
  lessonId: 'lesson-roblox-1-2',
  moduleId: 'module-01',
  order: 2,
  title: '1.2 - Building an Island',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Tell Terrain apart from Parts',
    'Generate an island with the Terrain Editor',
    'Sculpt land with Add, Subtract, and Smooth',
    'Paint grass, sand, rock, and water materials',
    'Save terrain work to Roblox',
  ],
  theory: {
    sections: [
      {
        title: 'Lesson plan (40 + 10 minutes)',
        content: `Today you sculpt a real **island** with Roblox **Terrain** - not single blocks, but continuous land you can raise, dig, and paint.

**Flow:** Theory → 25 min island practice → 10 min quiz.

Open your **Lesson 1.1** place or start a new Baseplate. Terrain edits are easier on a dedicated place file.`,
      },
      {
        title: 'Parts vs Terrain',
        content: `| | **Parts** | **Terrain** |
|---|-----------|-------------|
| Shape | Blocks, spheres, wedges | Hills, lakes, beaches |
| Best for | Buildings, buttons, props | Natural worlds |
| Edit | Move / Scale tools | Generate, Sculpt, Paint |

Many games use **both**: Terrain for the island, Parts for docks and signs.`,
      },
      {
        title: 'Open Terrain Editor',
        content: `**Home → Editor** (Terrain section)

Three tabs you need today:
1. **Generate** - create land from scratch
2. **Sculpt** - Add / Subtract / Smooth
3. **Paint** - grass, sand, rock, water

If terrain already exists and looks wrong, select **Terrain** in Workspace → Delete → start fresh.`,
      },
      {
        title: 'Generate - island in one click',
        content: `1. Open **Generate**
2. Set size about **512 × 100 × 512**
3. Biome: **Islands** (or Mountains for practice)
4. Click **Generate** - wait 5-15 seconds

Not happy? **Ctrl + Z** and generate again.

**Seed** controls the shape. Write down the seed if you love a layout and want to recreate it.`,
      },
      {
        title: 'Sculpt - Add (build land)',
        content: `**Add** raises land. Click and drag:
- Pull hills out of the ocean
- Widen the island
- Connect two land masses

**Brush size:** large brush for shape, small brush for detail.

**Exercise (8 min):** Add one clear hill on your island. Make it playable - not too steep for a character to walk.`,
      },
      {
        title: 'Sculpt - Subtract (carve)',
        content: `**Subtract** digs:
- Lakes and ponds
- Rivers
- Caves and cliffs

In **Add** mode, **Ctrl + click** acts as Subtract on many Studio versions.

**Exercise (8 min):** Carve a bay or lake. Leave a beach strip between water and high land.`,
      },
      {
        title: 'Sculpt - Smooth (polish)',
        content: `Raw terrain looks spiky. **Smooth** softens edges.

**Workflow:** Add/Subtract for shape → **Smooth** entire playable area last.

**Exercise (5 min):** Run Smooth along shores and hilltops until slopes look natural.`,
      },
      {
        title: 'Paint - materials tell a story',
        content: `| Material | Use on |
|----------|--------|
| **Grass** | Main land |
| **Sand** | Beaches |
| **Rock** | Cliffs and peaks |
| **Water** | Low areas / sea |
| **Snow** | Mountain tops (optional) |

**Order:** Grass base → Sand near water → Rock on peaks.

**Exercise (8 min):** Paint at least three material types on your island.`,
      },
      {
        title: 'Test in Play & save',
        content: `Press **Play** - walk your character along the shore and up a hill.

**Check:**
- No accidental holes through terrain
- Slopes are walkable
- Water areas look correct

**File → Save to Roblox** → \`Lesson 1.2 - My Island\`

Terrain is heavy - save often.`,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Generate freezes or shows nothing', explanation: 'Old terrain data can conflict.', correctApproach: 'Delete Terrain in Workspace, generate again' },
    { mistake: 'Terrain looks like spikes', explanation: 'Subtract/Add without smoothing.', correctApproach: 'Use Smooth brush over the whole island' },
    { mistake: 'Water looks static in edit mode', explanation: 'Animation often shows only in Play.', correctApproach: 'Press Play to preview water movement' },
  ],
  summary: `You can generate an island, sculpt hills and lakes, smooth slopes, and paint realistic materials - the foundation of most Roblox outdoor maps.`,
  practiceTask: {
    title: 'Island build challenge (~25 min)',
    difficulty: 'beginner',
    description: `1. **Generate** biome Islands (512 area)
2. **Add** - one mountain or hill
3. **Subtract** - lake or bay
4. **Smooth** - entire play area
5. **Paint** - Grass, Sand at shore, Rock on peak
6. **Play-test** walk path
7. **Save to Roblox** as \`Lesson 1.2 - My Island\`
8. Mark **Practice complete** here`,
    hints: ['Large brush first, small brush last', 'Save immediately after sculpting', 'Smooth before Paint for cleaner blends'],
    optionalChallenge: 'Shape the island like your first initial when viewed from above.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Terrain is best for…', options: ['UI menus', 'Natural hills and lakes', 'Scripts only', 'Sound effects'], correctAnswer: 1, explanation: 'Terrain is for organic landscapes.' },
      { id: 'q2', type: MC, question: 'Which tab creates land from a seed?', options: ['Paint', 'Generate', 'Select', 'Play'], correctAnswer: 1, explanation: 'Generate builds initial terrain.' },
      { id: 'q3', type: MC, question: 'Subtract is used to…', options: ['Add trees', 'Dig holes and lakes', 'Change sky', 'Spawn players'], correctAnswer: 1, explanation: 'Subtract removes terrain volume.' },
      { id: 'q4', type: MC, question: 'Smooth helps…', options: ['Add scripts', 'Soften jagged edges', 'Delete the game', 'Change font'], correctAnswer: 1, explanation: 'Smooth polishes terrain surfaces.' },
      { id: 'q5', type: MC, question: 'Sand material is usually placed…', options: ['On mountain peaks', 'On beaches and shores', 'Inside scripts', 'On SpawnLocation'], correctAnswer: 1, explanation: 'Sand fits coastlines.' },
      { id: 'q6', type: MC, question: 'Recommended biome for Lesson 1.2 is…', options: ['Caves only', 'Islands', 'City', 'Empty'], correctAnswer: 1, explanation: 'Islands biome fits the lesson goal.' },
      { id: 'q7', type: MC, question: 'If Generate fails, first try…', options: ['Reinstall Windows', 'Delete old Terrain', 'Remove all scripts', 'Change language'], correctAnswer: 1, explanation: 'Clear broken terrain then regenerate.' },
      { id: 'q8', type: MC, question: 'Grass is typically painted on…', options: ['Underwater only', 'Main flat and hilly land', 'Skybox', 'Output window'], correctAnswer: 1, explanation: 'Grass covers general land areas.' },
      { id: 'q9', type: MC, question: 'Ctrl+Z after a bad Generate…', options: ['Deletes your account', 'Undoes the generation', 'Publishes game', 'Adds paywall'], correctAnswer: 1, explanation: 'Undo lets you try another seed.' },
      { id: 'q10', type: MC, question: 'Terrain work should be saved with…', options: ['File → Save to Roblox', 'Only screenshot', 'Delete Terrain', 'Nothing'], correctAnswer: 0, explanation: 'Save to Roblox stores terrain in the place.' },
    ],
  },
}

export const enLesson13 = {
  lessonId: 'lesson-roblox-1-3',
  moduleId: 'module-01',
  order: 3,
  title: '1.3 - Objects and Properties',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Organize objects with Folders and Models',
    'Edit Position, Size, and Orientation precisely',
    'Use CanCollide and Anchored together correctly',
    'Build a dock scene with named Parts on your island',
  ],
  theory: {
    sections: [
      {
        title: 'Why organization matters',
        content: `After terrain, your island needs **props**: docks, signs, lamps, trees.

At 50 objects, Explorer chaos slows you down. At 500, it breaks projects.

Today you learn **Folders**, **Models**, and precise **Properties** - habits used in shipped Roblox games.`,
      },
      {
        title: 'The Instance tree (review)',
        content: `Every object has a **Parent** and optional **Children**.

\`Workspace\` → \`Folder\` → \`Model\` → \`Part\`

Clicking a Part in the Viewport selects it in Explorer. Renaming is mandatory discipline.`,
      },
      {
        title: 'Folders - simple containers',
        content: `**Insert → Folder** or right-click Workspace → Insert Folder.

Examples:
- \`Environment\`
- \`Dock\`
- \`LightingProps\`

Drag Parts into folders. Folders do not move as one unit - they only organize.`,
      },
      {
        title: 'Models - move groups together',
        content: `Select multiple Parts → **Ctrl + G** (Group) or right-click → **Group**.

You get a **Model** - move it with Move tool and all children follow.

Rename: \`Dock_Main\`, \`Pier_Lamps\`.

**Exercise (10 min):** Build 4 planks as one Model walkway.`,
      },
      {
        title: 'Position and Size numbers',
        content: `**Move (W)** is fast. **Properties → Position** is exact.

Copy Position from one plank to the next - change only **X** or **Z** for a perfect row.

**Size** \`20, 1, 4\` = wide flat plank.

**Orientation** rotates in degrees (0, 90, 0) for turned planks.`,
      },
      {
        title: 'CanCollide and Anchored matrix',
        content: `| Anchored | CanCollide | Typical use |
|----------|------------|-------------|
| true | true | Walls, floors, dock |
| true | false | Fireflies, fog cards |
| false | true | Physics crates (later) |

For static builds: **both true** on walkable surfaces.`,
      },
      {
        title: 'Naming convention',
        content: `Use **PascalCase** or **snake_case** consistently:

Good: \`Dock_Plank_01\`, \`Lamp_Post_A\`
Bad: \`Part\`, \`Part\`, \`Part\`

Future you (and teammates) will search by name in Explorer.`,
      },
      {
        title: 'Build a dock on your island',
        content: `Place dock on **flat sand** near water from Lesson 1.2.

Suggested layout:
- 5-8 plank Parts (Wood material)
- 2 vertical posts
- 1 Neon lamp Part for visibility

Group planks into \`Dock_Platform\` Model inside \`Dock\` Folder.`,
      },
      {
        title: 'Quality check before quiz',
        content: `**Play-test checklist:**
- [ ] Character walks on planks without falling through
- [ ] No unanchored Parts fall
- [ ] Explorer shows Folder → Model → Parts
- [ ] Every Part has a unique useful name
- [ ] Saved as \`Lesson 1.3 - Island Dock\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Parts float above ground', explanation: 'Position Y not aligned.', correctApproach: 'Set same Y on all planks; use Move with grid snap' },
    { mistake: 'Cannot select one plank in Model', explanation: 'Double-click or expand Model in Explorer.', correctApproach: 'Expand Model tree or use Drill-down select' },
    { mistake: 'Model moves but planks stay', explanation: 'Parts not parented to Model.', correctApproach: 'Group again so Parts are children of Model' },
  ],
  summary: `You organized a dock with Folders and Models, used Properties for exact placement, and kept collision rules consistent - professional Studio workflow.`,
  practiceTask: {
    title: 'Dock build (~25 min)',
    difficulty: 'beginner',
    description: `On your Lesson 1.2 island:

1. Create Folder \`Dock\` in Workspace
2. Add **6+ Parts** (planks, posts, lamp)
3. All **Anchored true**, walkable planks **CanCollide true**
4. Group planks into Model \`Dock_Platform\`
5. Align using Position (same Y for deck)
6. **Save to Roblox** → \`Lesson 1.3 - Island Dock\`
7. **Practice complete**`,
    hints: ['Ctrl+D duplicates a selected plank', 'Copy Position X/Z with small steps for spacing', 'Neon lamp helps find dock at night'],
    optionalChallenge: 'Add a sign Part with your game name in bright Neon letters.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'A Folder is mainly for…', options: ['Running scripts', 'Organizing objects', 'Playing music', 'Spawning enemies'], correctAnswer: 1, explanation: 'Folders group objects in Explorer.' },
      { id: 'q2', type: MC, question: 'A Model lets you…', options: ['Move multiple parts together', 'Delete terrain', 'Change language', 'Ban players'], correctAnswer: 0, explanation: 'Models act as one movable group.' },
      { id: 'q3', type: MC, question: 'Ctrl+G typically…', options: ['Groups selection into a Model', 'Deletes workspace', 'Opens shop', 'Saves game'], correctAnswer: 0, explanation: 'Group creates a Model from selection.' },
      { id: 'q4', type: MC, question: 'Exact coordinates are edited in…', options: ['Output', 'Properties', 'Chat', 'Avatar'], correctAnswer: 1, explanation: 'Position lives in Properties.' },
      { id: 'q5', type: MC, question: 'Walkable dock planks should usually have…', options: ['Anchored true, CanCollide true', 'Anchored false only', 'Transparency 1', 'No name'], correctAnswer: 0, explanation: 'Static walkable parts use both.' },
      { id: 'q6', type: MC, question: 'Size 20, 1, 4 means…', options: ['20 wide, 1 tall, 4 deep', '20 players', '20 scripts', 'RGB 20,1,4'], correctAnswer: 0, explanation: 'Size is X, Y, Z in studs.' },
      { id: 'q7', type: MC, question: 'Bad naming looks like…', options: ['Dock_Plank_03', 'Part, Part, Part', 'Lamp_Post', 'Pier_Main'], correctAnswer: 1, explanation: 'Generic names cause confusion.' },
      { id: 'q8', type: MC, question: 'Parts inside a Model are…', options: ['Children of the Model', 'Outside Workspace', 'Always invisible', 'Scripts only'], correctAnswer: 0, explanation: 'Grouped parts parent to the Model.' },
      { id: 'q9', type: MC, question: 'Ctrl+D is useful to…', options: ['Duplicate selected object', 'Delete account', 'Debug Lua', 'Paint terrain'], correctAnswer: 0, explanation: 'Duplicate speeds building repeated planks.' },
      { id: 'q10', type: MC, question: 'Lesson 1.3 save name suggestion…', options: ['Lesson 1.3 - Island Dock', 'Untitled', 'Test123', 'asdf'], correctAnswer: 0, explanation: 'Clear names help track course progress.' },
    ],
  },
}

export const enLesson14 = {
  lessonId: 'lesson-roblox-1-4',
  moduleId: 'module-01',
  order: 4,
  title: '1.4 - First Magic: ClickDetector',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Add a ClickDetector to make a Part clickable',
    'Write your first server Script in Luau',
    'Connect MouseClick to change color and print to Output',
    'Debug common script errors with the Output window',
    'Understand Script vs LocalScript for this lesson',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Until now you **built** worlds. Today your world **reacts** to the player - that is real game development.

**Lesson flow:**
1. **Theory (40 min)** - ClickDetector + your first Luau script
2. **Practice (~25 min)** - three clickable objects on your island
3. **Quiz (10 min)** - 10 questions, **70%** to pass

Open your **Lesson 1.3 - Island Dock** place. Keep **Output** visible (View → Output).`,
      },
      {
        title: 'Builder vs developer',
        content: `A **builder** asks: "Does this dock look good?"

A **developer** asks:
- What happens when the player clicks this button?
- Who sees the change - everyone or only one player?
- What message or sound confirms the click?

**Luau** is Roblox's language (like Lua). Scripts on the **server** run once for the whole game - perfect for doors, buttons, and scores everyone shares.`,
      },
      {
        title: 'Script types - use the right one',
        content: `| Type | Where it runs | Use in Lesson 1.4 |
|------|----------------|-------------------|
| **Script** | Server | ✅ Yes - click buttons |
| **LocalScript** | One player's device | ❌ Not yet - UI and camera later |

**Rule today:** put a **Script** **inside the Part** you click (child of the Part).

**Never** put gameplay logic only on your computer - other players would not see it.`,
      },
      {
        title: 'ClickDetector - turn a Part into a button',
        content: `1. Select a Part (golden cube on your dock works great)
2. **Insert** → **ClickDetector** (must be a **child** of that Part)
3. In Properties set **MaxActivationDistance** to \`32\` (studs)

| Property | Meaning |
|----------|---------|
| **MaxActivationDistance** | How far away a click still works |
| **MaxActivationDistance** | Too low = hard to click; too high = clicks from far away |

The Part should be **Anchored**, visible, and named \`ClickButton_Red\` (not \`Part\`).

**Exercise (5 min):** Add ClickDetector to one Part. Do not script yet - just confirm it appears under the Part in Explorer.`,
      },
      {
        title: 'Your first script - copy and understand',
        content: `1. Select the same Part (with ClickDetector)
2. **Insert** → **Script** (not LocalScript)
3. Delete sample code. Paste:

\`\`\`lua
local part = script.Parent
local detector = part:WaitForChild("ClickDetector")

detector.MouseClick:Connect(function(player)
    print(player.Name .. " clicked the button!")
    part.BrickColor = BrickColor.new("Bright green")
end)
\`\`\`

**Line by line:**
- \`local\` - create a variable
- \`script.Parent\` - the Part holding this Script
- \`WaitForChild\` - wait until ClickDetector exists (avoids errors on load)
- \`Connect(function(player) ... end)\` - run code when someone clicks
- \`print(...)\` - write to **Output**
- \`BrickColor.new(...)\` - change Part color for everyone`,
      },
      {
        title: 'Test in Play - read Output',
        content: `Press **Play** (F5). Click your Part in the 3D view.

**Output** should show:
\`YourName clicked the button!\`

The Part should turn **Bright green**.

**Exercise (8 min):** Click 3 times. Confirm color stays green and Output shows your username each time.

**Stop Play** before editing scripts again - live editing while playing is confusing at first.`,
      },
      {
        title: 'Debug red errors in Output',
        content: `| Error message | Fix |
|---------------|-----|
| \`ClickDetector is not a valid member\` | ClickDetector missing or wrong name - must be exactly \`ClickDetector\` |
| \`attempt to index nil\` | Script not inside the Part - move Script under the Part |
| \`MouseClick is not a valid member\` | You used a Part without ClickDetector |
| Nothing prints | Not in **Play** mode, or click too far - raise MaxActivationDistance |

**Habit:** read the **first line** of the error, then check Explorer tree: \`Part → ClickDetector\`, \`Part → Script\`.`,
      },
      {
        title: 'Upgrade - sound on click',
        content: `1. Select the Part → **Insert** → **Sound**
2. Name it \`ClickSound\`
3. Set **SoundId** from Toolbox → Audio (or a known rbxassetid)
4. **Volume** \`0.5\`, **Looped** false

Add after the color line in your script:

\`\`\`lua
local sound = part:FindFirstChild("ClickSound")
if sound then
    sound:Play()
end
\`\`\`

**FindFirstChild** is safer than WaitForChild when sound is optional.

**Exercise (5 min):** Click = green color + short sound. That combination is called **game feel**.`,
      },
      {
        title: 'Three buttons - one template',
        content: `You will build **3 Parts**, each with its own ClickDetector + Script.

Copy the template; only change:
- Part name and starting **BrickColor**
- Target color in \`BrickColor.new("...")\`
- Optional: change **Size** instead of color on the third button

**Organize in Explorer:**
\`Folder Interactives\` → \`ClickButton_Red\`, \`ClickCrystal_Blue\`, \`ClickSign_Wood\`

**Before practice checklist:**
- [ ] I know Script goes inside the Part
- [ ] I can open Output and read print messages
- [ ] I tested one button in Play successfully`,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Click does nothing in Edit mode', explanation: 'ClickDetector only fires during Play.', correctApproach: 'Press F5 (Play), then click the Part in the Viewport' },
    { mistake: 'Used LocalScript instead of Script', explanation: 'LocalScripts do not run in Part the same way for this lesson.', correctApproach: 'Delete LocalScript; Insert → Script under the Part' },
    { mistake: 'Script is under Workspace, not Part', explanation: 'script.Parent becomes Workspace - wrong object.', correctApproach: 'Drag Script onto the Part so it is a child' },
    { mistake: 'Color changes in Studio but not for friends', explanation: 'You tested in solo - server script is correct for everyone.', correctApproach: 'Server Script on Part is the right pattern for shared buttons' },
  ],
  summary: `You added ClickDetectors, wrote your first server Luau script, connected MouseClick to print and visual feedback, and debugged with Output - the moment your island became interactive.`,
  practiceTask: {
    title: 'Click magic - three island buttons (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Three working clickables with different effects.

### Setup (3 min)
1. Open your **Lesson 1.3** place (island + dock)
2. Create Folder \`Interactives\` in Workspace

### Part A - Red button (8 min)
1. Insert **Block** → Name: \`ClickButton_Red\` | BrickColor: Bright red | Anchored: **true**
2. Insert **ClickDetector** + **Script** (template from theory)
3. On click: turn **Bright green** + \`print\` player name

### Part B - Blue crystal (8 min)
1. Insert **Sphere** → Name: \`ClickCrystal_Blue\` | Material: **Neon** | Anchored: **true**
2. ClickDetector + Script - on click: **Bright yellow** + print message
3. Add **Sound** child optional

### Part C - Wooden sign (6 min)
1. Insert **Block** → Name: \`ClickSign_Wood\` | Size: \`1, 4, 0.3\` | Material: Wood
2. On click: change **Size** to \`1.5, 6, 0.3\` (taller sign) + print

### Test & save (4 min)
1. **Play** - click all three; screenshot **Output** with 3 different messages
2. **File → Save to Roblox** → \`Lesson 1.4 - Click Magic\`
3. **Practice complete** here`,
    hints: [
      'Copy one working Script - change only names and BrickColor strings',
      'MaxActivationDistance 32 if clicks feel too picky',
      'Stop Play before editing scripts',
    ],
    optionalChallenge: 'After any button is clicked 3 times total, set Lighting ClockTime to 0 (night).',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'For a button everyone sees, use…', options: ['LocalScript in StarterPlayer', 'Script inside the Part', 'Sound only', 'Terrain brush'], correctAnswer: 1, explanation: 'Server Script on the Part runs for all players.' },
      { id: 'q2', type: MC, question: 'ClickDetector must be a…', options: ['Child of the Part you click', 'Child of Lighting', 'Sibling of Workspace', 'Inside ServerScriptService'], correctAnswer: 0, explanation: 'ClickDetector parents to the clickable Part.' },
      { id: 'q3', type: MC, question: 'script.Parent refers to…', options: ['The player', 'The object the Script is inside', 'The sky', 'Roblox website'], correctAnswer: 1, explanation: 'Parent is the Part containing the Script.' },
      { id: 'q4', type: MC, question: 'MouseClick fires when…', options: ['You save the game', 'A player clicks the Part in Play', 'You insert Terrain', 'Studio opens'], correctAnswer: 1, explanation: 'Clicks are detected during Play mode.' },
      { id: 'q5', type: MC, question: 'print() writes to…', options: ['Explorer', 'Output', 'Properties', 'Toolbox'], correctAnswer: 1, explanation: 'Output shows print and errors.' },
      { id: 'q6', type: MC, question: 'WaitForChild("ClickDetector") helps…', options: ['Change sky color', 'Avoid errors if child loads late', 'Delete terrain', 'Spawn enemies'], correctAnswer: 1, explanation: 'WaitForChild waits for the child to exist.' },
      { id: 'q7', type: MC, question: 'MaxActivationDistance controls…', options: ['Part color', 'How far away clicks work', 'Sound volume', 'Terrain size'], correctAnswer: 1, explanation: 'Distance limit for click activation.' },
      { id: 'q8', type: MC, question: 'Red Output text usually means…', options: ['Success', 'A script error', 'New Part added', 'Game published'], correctAnswer: 1, explanation: 'Errors appear in red in Output.' },
      { id: 'q9', type: MC, question: 'BrickColor.new("Bright green")…', options: ['Deletes the Part', 'Sets the Part color', 'Opens Roblox', 'Adds terrain'], correctAnswer: 1, explanation: 'BrickColor.new assigns a preset color.' },
      { id: 'q10', type: MC, question: 'Lesson 1.4 save name…', options: ['Lesson 1.4 - Click Magic', 'Untitled', 'Part', 'Test'], correctAnswer: 0, explanation: 'Use clear lesson names for your portfolio.' },
    ],
  },
}

export const enLesson15 = {
  lessonId: 'lesson-roblox-1-5',
  moduleId: 'module-01',
  order: 5,
  title: '1.5 - Sound and Atmosphere',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Add looped ambient Sounds and one-shot 3D sounds',
    'Tune Lighting: ClockTime, Brightness, and shadows',
    'Use Atmosphere and Sky for cinematic mood',
    'Combine audio and lighting for a polished island',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Players **feel** games through ears and eyes. A sunset island with wave sounds beats a silent grey map.

**Lesson flow:**
1. **Theory (40 min)** - Sound + Lighting + Atmosphere
2. **Practice (~25 min)** - sunset mood on your island
3. **Quiz (10 min)** - **70%** pass

Use your **Lesson 1.4 - Click Magic** place. Test with **Play** - many audio and lighting changes are best heard in motion.`,
      },
      {
        title: 'Why sound matters',
        content: `| Without sound | With sound |
|---------------|------------|
| Clicks feel flat | Clicks feel satisfying |
| Island feels empty | Island feels alive |
| Hard to know success | Audio confirms actions |

**Two types today:**
1. **Ambient** - looped background (waves, wind) - whole place
2. **3D on Part** - louder when you walk close (dock creak, seagull)`,
      },
      {
        title: 'Sound object - properties',
        content: `**Insert → Sound** (Workspace for ambient, or inside a Part for 3D).

| Property | Tip |
|----------|-----|
| **SoundId** | \`rbxassetid://...\` from Toolbox → Audio |
| **Volume** | Ambient: \`0.25\`-\`0.45\` - clicks stay audible |
| **Looped** | **true** for ocean/wind |
| **Playing** | **true** to preview in Edit (optional) |
| **RollOffMaxDistance** | How far 3D sound travels (try \`80\`) |

Name sounds clearly: \`Ambient_Waves\`, \`Dock_Creak\`, \`Click_Chime\`.

**Exercise (6 min):** Add looped \`Ambient_Waves\` in Workspace. Press Play and listen while moving.`,
      },
      {
        title: 'Lighting - time of day',
        content: `Select **Lighting** in Explorer.

| Property | Effect |
|----------|--------|
| **ClockTime** | Hour 0-24 (\`14\` = afternoon, \`17.5\` = sunset, \`0\` = midnight) |
| **Brightness** | Overall light (\`2\`-\`3\` daytime) |
| **GlobalShadows** | **true** = realistic shadows |
| **OutdoorAmbient** | Color tint in shadow areas |
| **Technology** | **Future** or **ShadowMap** for modern look |

**Sunset preset (copy these):**
- ClockTime: \`17.5\`
- Brightness: \`2\`
- GlobalShadows: **true**
- OutdoorAmbient: warm peach/orange tone

**Exercise (5 min):** Slide ClockTime from 12 → 17.5 → 0 while in Play. Pick your favorite mood.`,
      },
      {
        title: 'Atmosphere - cinematic haze',
        content: `Right-click **Lighting** → Insert **Atmosphere**.

| Property | Starter values |
|----------|----------------|
| **Density** | \`0.3\`-\`0.4\` (light haze) |
| **Offset** | \`0.25\` |
| **Color** | Soft orange/pink at sunset |
| **Decay** | Slightly purple/blue horizon |

Atmosphere makes distant terrain softer - professional obbies use this on showcase maps.

**Warning:** Density above \`0.6\` can lag on weak PCs - start low.`,
      },
      {
        title: 'Sky - optional polish',
        content: `**Lighting** may contain **Sky**.

- **StarCount** - visible at night
- **SunAngularSize** - sun disk size
- Six **Skybox** faces (Bk, Ft, Lf, Rt, Up, Dn) for custom skies

For Lesson 1.5, default Sky + Atmosphere is enough. Custom skyboxes come in Module 10 polish.

**Exercise (3 min):** Set ClockTime \`0\`, check stars. Return to \`17.5\` for practice.`,
      },
      {
        title: 'Link sound to your click script',
        content: `From Lesson 1.4, extend a click Script:

\`\`\`lua
local part = script.Parent
local detector = part:WaitForChild("ClickDetector")
local sound = part:FindFirstChild("ClickSound")

detector.MouseClick:Connect(function(player)
    if sound then
        sound:Play()
    end
end)
\`\`\`

**Play()** restarts one-shot sounds. Ambient loops stay **Looped = true** and **Playing = true**.

Do not stack 5 loud ambients - one loop + one 3D detail is enough.`,
      },
      {
        title: 'Mixing checklist - before practice',
        content: `**Balanced island audio:**
- [ ] One ambient loop ≤ 0.45 Volume
- [ ] Click sounds ≤ 0.6 Volume
- [ ] 3D dock sound only audible when near dock
- [ ] Lighting + Atmosphere match (sunset + warm haze)
- [ ] Saved place name planned: \`Lesson 1.5 - Island Atmosphere\`

**FAQ:** No sound? - valid SoundId, Volume > 0, test in Play. Pink sky? - reset Sky or disable broken skybox faces.`,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Five ambient tracks at full volume', explanation: 'Layers clip and sound muddy.', correctApproach: 'One ambient loop + optional quiet music at 0.15 Volume' },
    { mistake: 'SoundId is empty or broken', explanation: 'Invalid asset ID plays nothing.', correctApproach: 'Pick audio from Toolbox or paste a known rbxassetid number' },
    { mistake: 'Atmosphere makes game laggy', explanation: 'Density too high for device.', correctApproach: 'Lower Density to 0.25-0.35' },
    { mistake: 'Changed ClockTime only in Edit, never in Play', explanation: 'Some students forget to walk test at sunset.', correctApproach: 'Play-test walk from spawn to dock at ClockTime 17.5' },
  ],
  summary: `You layered ambient and 3D sound, tuned Lighting for sunset mood, added Atmosphere haze, and connected audio to your click scripts - your island now feels professional, not prototype.`,
  practiceTask: {
    title: 'Sunset island atmosphere (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** One cohesive sunset mood with sound.

### Part A - Ambient audio (7 min)
1. Insert **Sound** in Workspace → Name: \`Ambient_Waves\`
2. SoundId: ocean or nature from Toolbox | Volume: \`0.35\` | Looped: **true** | Playing: **true**

### Part B - Lighting & Atmosphere (8 min)
1. Select **Lighting** → ClockTime: \`17.5\` | Brightness: \`2\` | GlobalShadows: **true**
2. Insert **Atmosphere** under Lighting | Density: \`0.35\` | warm Color tint
3. **Play** - walk spawn → dock → water line

### Part C - 3D dock sound (6 min)
1. On dock Part: **Sound** \`Dock_Creak\` | Looped: **false** | RollOffMaxDistance: \`60\`
2. Hook **Play()** from Lesson 1.4 click script OR touch Proximity later
3. Volume quiet (\`0.4\`) so ambient stays primary

### Test & save (4 min)
1. **Play** - ambient everywhere; dock sound louder when close
2. **File → Save to Roblox** → \`Lesson 1.5 - Island Atmosphere\`
3. **Practice complete**`,
    hints: [
      'Test ClockTime in Play while walking - mood changes feel real',
      'Lower ambient if click sounds are hard to hear',
      'Atmosphere Color should match sunset (orange/pink, not neon green)',
    ],
    optionalChallenge: 'Second ambient track (soft music) at Volume \`0.15\` - two loops together.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Looped ambient sounds usually go in…', options: ['Workspace', 'Only inside player head', 'Output window', 'Terrain'], correctAnswer: 0, explanation: 'World ambient often lives in Workspace.' },
      { id: 'q2', type: MC, question: 'ClockTime 17.5 is closest to…', options: ['Midnight', 'Sunset', 'Noon', 'Dawn only'], correctAnswer: 1, explanation: '17-18 hours looks like late afternoon/sunset.' },
      { id: 'q3', type: MC, question: 'Atmosphere Density controls…', options: ['Script speed', 'Fog/haze thickness', 'Part size', 'Jump height'], correctAnswer: 1, explanation: 'Density adds atmospheric haze.' },
      { id: 'q4', type: MC, question: '3D sound on a Part is louder when…', options: ['Player is far away', 'Player is near the Part', 'Game is saved', 'Sky is removed'], correctAnswer: 1, explanation: 'RollOff makes volume distance-based.' },
      { id: 'q5', type: MC, question: 'GlobalShadows true gives…', options: ['Louder audio', 'More realistic shadows', 'Free Robux', 'No terrain'], correctAnswer: 1, explanation: 'GlobalShadows enables shadow rendering.' },
      { id: 'q6', type: MC, question: 'Ambient Volume should usually be…', options: ['1.0 always', 'Low (0.25-0.45)', 'Zero', 'Negative'], correctAnswer: 1, explanation: 'Quiet ambient leaves room for effects.' },
      { id: 'q7', type: MC, question: 'Sound:Play() is used for…', options: ['One-shot or restarting a sound', 'Deleting Parts', 'Anchoring', 'Publishing'], correctAnswer: 0, explanation: 'Play starts playback on a Sound instance.' },
      { id: 'q8', type: MC, question: 'Lighting lives in Explorer under…', options: ['Workspace only', 'Lighting service', 'Players', 'ReplicatedStorage'], correctAnswer: 1, explanation: 'Lighting is its own top-level service.' },
      { id: 'q9', type: MC, question: 'No audio heard - first check…', options: ['Valid SoundId and Volume > 0', 'Delete all scripts', 'Remove Atmosphere', 'Change language'], correctAnswer: 0, explanation: 'Broken or empty SoundId is the top cause.' },
      { id: 'q10', type: MC, question: 'Lesson 1.5 save name…', options: ['Lesson 1.5 - Island Atmosphere', 'Click Magic', 'Part3', 'Module 12'], correctAnswer: 0, explanation: 'Match the lesson portfolio naming scheme.' },
    ],
  },
}

export const enLesson16 = {
  lessonId: 'lesson-roblox-1-6',
  moduleId: 'module-01',
  order: 6,
  title: '1.6 - Checkpoint: The Island Lives',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Merge terrain, dock, scripts, sound, and lighting in one hub',
    'Add SpawnLocation and run a quality checklist',
    'Present Module 1 as a living island spawn area',
    'Prepare for Module 2 obby mechanics',
    'Repeat classic programming ideas: variables, if, print, and event callbacks',
  ],
  theory: {
    sections: [
      {
        title: 'Module 1 checkpoint (about 40 minutes)',
        content: `This is your **portfolio milestone** - not a new topic dump, but **polish and proof** you can ship a small world.

**You already built:**
- **1.1** - Parts, Studio, save
- **1.2** - Terrain island
- **1.3** - Dock, Folders, Models
- **1.4** - ClickDetector scripts
- **1.5** - Sound + sunset mood

**Today:** one **Living Island Hub** ready for Module 2's obby path.`,
      },
      {
        title: 'What "done" looks like',
        content: `A visitor presses Play and thinks:
- "I know where to spawn."
- "I can walk without falling through the floor."
- "Something reacts when I click."
- "This place has a mood (sound + light)."

Your job: fix anything that breaks that first impression.`,
      },
      {
        title: 'Master checklist - world',
        content: `**Terrain & space**
- [ ] Island has grass, sand, rock - no accidental giant pits
- [ ] Water level looks intentional (not flooding spawn)
- [ ] **SpawnLocation** on flat ground (not inside water)

**Building**
- [ ] Folder \`Dock\` (or similar) with named Models/Parts
- [ ] **8+** decorative Parts total (planks, lamps, signs, trees)
- [ ] All static Parts **Anchored true**

**Interaction**
- [ ] **3** clickables with different effects (color, size, sound…)
- [ ] **Output** shows player name on at least one click

**Mood**
- [ ] Ambient loop + Lighting ClockTime + Atmosphere
- [ ] Full walk loop tested in Play (spawn → dock → beach)`,
      },
      {
        title: 'SpawnLocation - where players appear',
        content: `**Insert → SpawnLocation** on safe beach or dock platform.

| Property | Suggested |
|----------|-----------|
| **Size** | \`6, 1, 6\` |
| **BrickColor** | Bright green or cyan (visible) |
| **Anchored** | true |
| **Neutral** | true (any player can spawn) |
| **Position Y** | Slightly above terrain - not clipping inside floor |

**Exercise (8 min):** Place SpawnLocation, Play - character should appear on it. Move it until spawn feels natural facing the dock.`,
      },
      {
        title: 'Welcome sign - hub greeting',
        content: `Near spawn, add **Sign_Welcome** Part + ClickDetector + Script + optional **WelcomeSound**:

\`\`\`lua
local part = script.Parent
local detector = part:WaitForChild("ClickDetector")
local sound = part:FindFirstChild("WelcomeSound")

detector.MouseClick:Connect(function(player)
    print("Welcome to " .. player.Name .. "'s island hub!")
    if sound then
        sound:Play()
    end
end)
\`\`\`

Later modules replace \`print\` with on-screen GUI. For Module 1, Output proof is enough.`,
      },
      {
        title: 'Explorer hygiene - impress teachers',
        content: `Search bad names: **Ctrl+Shift+F** → find \`Part\` without numbers.

**Target tree:**
\`Workspace\`
- \`Terrain\`
- \`SpawnLocation\`
- \`Dock\` (Folder)
- \`Interactives\` (Folder)
- \`Ambient_Waves\` (Sound)
- \`Lighting\` (with Atmosphere)

Delete empty Folders and duplicate test blocks.`,
      },
      {
        title: 'Play-test script (5 minutes)',
        content: `Press **Play** and do this in order:
1. Spawn on **SpawnLocation** - not underwater
2. Walk to dock - no falling through planks
3. Click all 3 interactives - see/hear feedback
4. Walk shoreline - ambient audible, not ear-bleeding loud
5. **Stop** - fix one issue if anything failed

Repeat until all five pass. **Then** save.`,
      },
      {
        title: 'Programming basics - bridge to Module 2',
        content: `In **1.4** you already wrote code, but Module 2 adds **touch (Touched)** and **if** checks. Before complex scripts - 5 classic ideas that appear in every language (Python, JavaScript, Luau).

**1. Variables (\`local\`)** - a named box:
\`\`\`lua
local playerName = "Alex"
local jumpPower = 50
\`\`\`
- \`local\` = variable only in this script
- Meaningful names: \`killBlock\`, not \`x\`
- In Roblox you often store an object: \`local part = script.Parent\`

**2. Text and numbers** - \`print\` and concatenation:
\`\`\`lua
print("Game started")
print("Player: " .. playerName)
\`\`\`
- \`..\` joins text (like + for strings in Python)

**3. \`if\` conditions** - the game asks yes/no:
\`\`\`lua
local health = 0

if health <= 0 then
    print("Player lost")
end
\`\`\`
- \`if ... then\` - if true, run the block
- \`end\` closes the block (do not forget it!)
- Comparisons: \`<\`, \`>\`, \`==\`, \`<=\` (two \`==\` for equality)

**4. Events (callbacks)** - "when X happens, do Y":
\`\`\`lua
detector.MouseClick:Connect(function(player)
    print(player.Name .. " clicked")
end)
\`\`\`
- \`Connect(function ... end)\` - Studio calls this **for you** at the right time
- You do not call it manually - you **subscribe** to the event

**5. Safe checks (\`nil\`)** - "does this object exist?":
\`\`\`lua
local sound = part:FindFirstChild("ClickSound")

if sound then
    sound:Play()
end
\`\`\`
- If the child is missing in Explorer, \`FindFirstChild\` returns \`nil\`
- \`if sound then\` prevents red errors in Output

**Mini exercise (7 min):** in any Script from 1.4 add \`print("Condition test")\` and \`if true then print("if works") end\`. Play → confirm Output shows both lines.`,
      },
      {
        title: 'What changes in Module 2',
        content: `| Lesson 1.4 (click) | Module 2 (touch) |
|--------------------|------------------|
| \`MouseClick\` | \`Touched\` |
| You click with the mouse | Character **steps on** a Part |
| Change color | Often \`Humanoid.Health = 0\` |

Difficulty grows **step by step**:
1. **2.1** - first \`print\` on touch, then the full kill script
2. **2.4** - official \`if / elseif / else\` for S/A/B ranks

You do not need to "know everything" now. Enough to understand **variables**, **if**, **print**, and that \`Connect\` means "run this on an event".`,
      },
      {
        title: 'Save, document, Module 2 preview',
        content: `**File → Save to Roblox** → \`Module 1 - Living Island\`

In a notebook (or comment in Studio):
- One thing you are proud of
- One bug you fixed today
- One Module 2 idea (lava path? moving platform?)

**Module 2 preview:** kill blocks, checkpoints, timers - your island becomes the **start** of an obby. Keep this place file - you will extend it.`,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Spawn in water or void', explanation: 'SpawnLocation Y too low or inside terrain water.', correctApproach: 'Raise SpawnLocation; test in Play after each move' },
    { mistake: 'Forgot to save after checkpoint polish', explanation: 'Lost work from earlier lessons.', correctApproach: 'Save to Roblox with Module 1 name before marking complete' },
    { mistake: 'Only one clickable still works', explanation: 'Scripts copied but Parent wrong after grouping.', correctApproach: 'Each Script must be child of its own Part with ClickDetector' },
    { mistake: 'Too dark to see dock', explanation: 'ClockTime 0 with no lamp.', correctApproach: 'Sunset 17.5 or add Neon lamp from Lesson 1.3' },
  ],
  summary: `You merged every Module 1 skill into one Living Island Hub with spawn, interactives, audio, lighting, and a clean Explorer tree - ready to build your first obby in Module 2.`,
  practiceTask: {
    title: 'Checkpoint - Living Island Hub (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Pass every item on the master checklist.

### Part A - Fix world (12 min)
1. Run checklist - terrain, water, anchored Parts
2. Insert **SpawnLocation** on safe ground | test spawn in Play
3. Rename stray \`Part\` objects in Explorer

### Part B - Interactives & dock (12 min)
1. Confirm **3 clickables** in Folder \`Interactives\`
2. Confirm **Dock** Folder with Model and 6+ planks/props
3. Fix any walk-through or floating planks

### Part C - Mood & welcome (10 min)
1. Ambient + Lighting + Atmosphere from Lesson 1.5
2. Add **Sign_Welcome** with click + print + optional sound
3. Full **play-test script** from theory (5 steps)

### Finish (6 min)
1. **File → Save to Roblox** → \`Module 1 - Living Island\`
2. **Practice complete** - optional: 2-min screen recording tour for your teacher`,
    hints: [
      'Fix spawn first - everything else is easier after that',
      'Ctrl+D duplicates dock planks to add decorations fast',
      'One focused Play-test catches 90% of issues',
    ],
    optionalChallenge: 'Bridge of 5+ Parts to a small secondary hill (Subtract terrain for a mini island).',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Module 1 checkpoint main goal is…', options: ['Learn Terrain only', 'Polish one complete island hub', 'Publish to marketplace', 'Delete all scripts'], correctAnswer: 1, explanation: 'Lesson 1.6 merges all Module 1 skills.' },
      { id: 'q2', type: MC, question: 'SpawnLocation should be placed…', options: ['Underwater', 'On safe flat ground', 'In the sky only', 'Inside a script'], correctAnswer: 1, explanation: 'Players need a valid spawn point.' },
      { id: 'q3', type: MC, question: 'Neutral true on SpawnLocation means…', options: ['No spawning', 'Any team can spawn', 'Deletes terrain', 'Adds paywall'], correctAnswer: 1, explanation: 'Neutral allows all players to use it.' },
      { id: 'q4', type: MC, question: 'Module 1 should include how many clickables?', options: ['0', '1', '3', '50'], correctAnswer: 2, explanation: 'Three interactives were built in 1.4 and checked here.' },
      { id: 'q5', type: MC, question: 'Organized dock uses…', options: ['Folder and Model', 'Only unnamed Parts', 'No Anchored', 'Only SoundService'], correctAnswer: 0, explanation: 'Folders and Models keep Explorer clean.' },
      { id: 'q6', type: MC, question: 'Ambient sound should be…', options: ['Very quiet and looped', 'Volume 2.0 only once', 'Inside every Part at max', 'Disabled'], correctAnswer: 0, explanation: 'Low looped ambient is standard.' },
      { id: 'q7', type: MC, question: 'Before marking complete you should…', options: ['Play-test full walk loop', 'Delete Terrain', 'Remove SpawnLocation', 'Never save'], correctAnswer: 0, explanation: 'Play-test verifies the hub works.' },
      { id: 'q8', type: MC, question: 'Module 2 will add mostly…', options: ['Obby danger and checkpoints', 'Only skyboxes', 'Account billing', 'Video editing'], correctAnswer: 0, explanation: 'Module 2 introduces obby mechanics.' },
      { id: 'q9', type: MC, question: 'Final save name for Module 1…', options: ['Module 1 - Living Island', 'Untitled', 'Lesson 1.1 only', 'Test'], correctAnswer: 0, explanation: 'Checkpoint uses the Module 1 portfolio name.' },
      { id: 'q10', type: MC, question: 'Ctrl+Shift+F in Explorer helps…', options: ['Find objects by name', 'Fly faster', 'Change BrickColor', 'Add Robux'], correctAnswer: 0, explanation: 'Search finds badly named instances.' },
    ],
  },
}
