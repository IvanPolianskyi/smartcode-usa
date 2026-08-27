/** Roblox Module 01 EN - lessons 1.1-1.8 */
import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson11 = {
  lessonId: "lesson-roblox-1-1",
  moduleId: "module-01",
  order: 1,
  title: "1.1 - Tools + Union → House",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Open Roblox Studio and start a level from the Baseplate template.",
    "Move the camera with confidence and read the Explorer, Properties, and Output panels.",
    "Use Select, Move, Scale, Rotate, Snap, and Duplicate without hunting through menus.",
    "Tell the Part types apart (Block, Sphere, Wedge, Cylinder, CornerWedge) and pick the right one.",
    "Cut real window and door openings with Negate and Union instead of faking them.",
    "Save your Place to Roblox as the first project in your portfolio.",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 1 of 92)",
        content: `Welcome. Ninety-two lessons from now you will publish a finished game with a menu, saved progress, and a Badge. This is lesson one, and it starts the way every real Roblox project starts: with an empty grey plane and a decision about what to put on it.

Today you build a house. Not a box with a rectangle painted on it to suggest a window - an actual house, with holes cut clean through the walls, that your character can walk into.

That difference matters more than it sounds. Every builder can stack blocks. The moment you can *subtract* geometry, you stop being limited to shapes Studio hands you, and you start making shapes nobody else has.

| What you have right now | What you will have in 60 minutes |
|---|---|
| Studio, never opened or barely opened | A level you built, saved to your account |
| Blocks are the only shape you know | Negate + Union, the tool that cuts anything |
| No project to show | \`House_01\`, project #1 of your portfolio |

**Your finish line for today:**
- A grouped model named \`House_01\`.
- At least 2 window openings, cut with Union.
- A doorway your character can actually walk through.
- The level saved to Roblox as \`Lesson 1.1 - House_01\`.

One rule for the whole course, starting now: **read with Studio open**. Every "Do now" below is meant to be done in the moment, not saved for later. Reading about the Move tool teaches you nothing. Dragging a wall with it teaches you everything.

**Do now (2 min):** open Studio and leave it open beside this page.`,
      },
      {
        title: "Getting into Studio",
        content: `Roblox Studio is the whole workshop in one window. Objects (Parts), landscape (Terrain), code (Luau), interface (UI) - all of it lives here, and all of it is free.

Go to [create.roblox.com](https://create.roblox.com/), sign in, and launch Studio. Choose **New**, then the **Baseplate** template.

Why Baseplate and not something prettier? Because the pretty templates - City, Obby, Racing - come pre-loaded with somebody else's parts and somebody else's scripts. When something breaks, you will not know whether you broke it or it came that way. Baseplate is a flat floor and a sky. Everything in it after today is yours.

That is also how professional builders start. An empty scene is not a limitation, it is a clean workbench.

**Do now (3 min):** create a Baseplate level. Open the **View** tab and switch on **Explorer** and **Properties** if they are not already showing. Click the grey floor - \`Baseplate\` should light up in Explorer. That is your first confirmation that clicking in the world and the object list are the same thing.`,
      },
      {
        title: "Reading the workspace",
        content: `Studio looks busy the first time. It is really only five areas, and you will use four of them constantly.

| Panel | Where | What it is for |
|---|---|---|
| **Viewport** | Center | The 3D world. You build here and fly the camera here. |
| **Home** | Top | The everyday tools: Part, Move, Scale, Rotate, Play, Snap. |
| **Model** | Top | The shape tools: Group, Union, Negate, Separate. |
| **Explorer** | Right | The list of everything that exists in your game. |
| **Properties** | Under Explorer | The settings of whatever is selected right now. |
| **Output** | Bottom | Messages and errors. Ignored today, essential from 1.3 onward. |

Think of Explorer as the table of contents and Properties as the page you are currently reading. Properties always shows the *selected* object - which is the source of the single most common beginner moment: changing a value, seeing nothing happen, and not realising you had the wrong thing selected.

**Do now (4 min):**
1. Select Baseplate and read its \`Name\`, \`Anchored\`, \`Size\`, and \`Material\` in Properties.
2. Open **Output** from the View tab so it is there when you need it.
3. Hover across the Home and Model tabs and read the tool names. You do not have to remember them - you just want to know where they live.`,
      },
      {
        title: "Flying the camera",
        content: `Camera control is the skill that separates a frustrating hour from a fun one. In a 3D world you cannot place anything accurately until you can look at it from any angle on demand.

| What you want | How |
|---|---|
| Forward / back | **W** / **S** |
| Left / right | **A** / **D** |
| Up / down | **E** / **Q** |
| Look around | Hold **right mouse button** and move the mouse |
| Zoom | **Mouse wheel** |
| Snap to an object | Select it, press **F** |

**F is the one to memorise.** Lost your house? Click it in Explorer, press F, and the camera flies to it. You will use that hundreds of times.

The habit worth building today: look at your work from at least three angles before you trust it. Top-down to check the footprint, from the side to check heights, and from ground level to see what a player will see. A wall that looks perfectly placed from above is often floating two studs off the floor when you look at it from the side.

**Do now (3 min):** fly the camera above Baseplate, then down to floor level. Select Baseplate, press F, and watch the camera frame it.`,
      },
      {
        title: "The four tools you will use forever",
        content: `Four tools, four number keys. Learn the keys now and you will never touch these buttons with the mouse again.

| Key | Tool | What it does |
|---|---|---|
| **1** | **Select** | Pick an object. |
| **2** | **Move** | Slide it along an axis. |
| **3** | **Scale** | Resize it by dragging a handle. |
| **4** | **Rotate** | Spin it around an axis. |

Two settings turn these from "roughly right" into "exactly right":

**Snap to Grid** (Home tab) makes objects jump in fixed increments instead of landing wherever your mouse happened to be. Without it your walls end up 0.03 studs apart, which looks fine in the editor and shows up in-game as a hairline crack of daylight. Turn it on and leave it on.

**Ctrl+D** duplicates whatever is selected. You are about to build four walls. You are going to build *one* wall and press Ctrl+D three times.

And one property that is not optional: **\`Anchored = true\`** on everything that should not move. Roblox runs real physics. An unanchored wall is not a wall, it is a very large falling object. Floors, walls, roofs - all anchored.

**Do now (5 min):**
1. Home → Part → Block.
2. Rename it \`TestBlock\` in Properties.
3. Press 3 and stretch it. Press 2 and slide it onto the floor with Snap on.
4. Set \`Anchored = true\`, press **F5** to play, and watch it stay put. Then untick Anchored, play again, and watch it fall. Seeing it fall once is worth more than reading this paragraph.`,
      },
      {
        title: "Choosing the right shape",
        content: `Studio gives you five primitive shapes. Each one exists because it saves you from faking it with something else.

| Type | What it is really for |
|---|---|
| **Block** | Walls, floors, roofs, platforms - the skeleton of almost everything. |
| **Sphere** | Decoration, orbs, collectables, planets. |
| **Wedge** | Anything sloped: roof pitches, ramps, stairs you can walk up. |
| **Cylinder** | Columns, pipes, chimneys, tree trunks. |
| **CornerWedge** | Where two slopes meet - the fiddly corner of a pitched roof. |

Today the whole house is Blocks. That is deliberate: Union behaves most predictably on flat-faced shapes, and you want your first cut to succeed, not to debug a sphere.

**Do now (3 min):** drop one Sphere, one Wedge, and one Cylinder into the scene. Scale and rotate each one so you know how they behave. Then delete all three and clear the floor for the house.`,
      },
      {
        title: "Properties worth knowing by name",
        content: `You will read these eight properties more than all the others put together.

| Property | Meaning | Example |
|---|---|---|
| **Name** | What it is called in Explorer | \`Wall_Front\` |
| **Size** | Dimensions in studs (X, Y, Z) | \`20, 1, 16\` |
| **Position** | Where it sits in the world | Usually set by dragging |
| **Orientation** | Rotation in degrees | \`0, 90, 0\` |
| **BrickColor** / **Color** | Its colour | Any |
| **Material** | Its surface texture | Plastic, Wood, Brick |
| **Anchored** | Immune to gravity | **true** for anything structural |
| **CanCollide** | Solid to the player | **true** for walls, **false** for decoration you walk through |

A word about **Name**, because it is the habit that pays off latest and largest. Right now you have six objects and you can find anything. By module 6 you will have hundreds, and a script will be searching for a Part by name. \`Part\`, \`Part1\`, \`Part2\` is a debt you take out today and repay with interest in three weeks.

Name things when you create them. It takes four seconds.

**Do now (2 min):** change \`Material\` and \`BrickColor\` on a test block, look at the result, then delete it.`,
      },
      {
        title: "The build order",
        content: `Build in this order and each step supports the next. Build out of order and you will be moving walls that already have windows in them.

1. **Floor** - the foundation everything else measures against.
2. **Walls** - four of them, on the floor's edges (\`Wall_Back\`, \`Wall_Left\`, \`Wall_Right\`, \`Wall_Front\`).
3. **Roof** - slightly oversized, so it overhangs.
4. **Windows** - cut with Negate + Union.
5. **Doorway** - same technique, but reaching the floor.
6. **Group** - everything becomes the \`House_01\` model.
7. **Save** - to your Roblox account.

Numbers that work, if you would rather not invent your own:

- Floor: \`20, 1, 16\`
- Wall height: \`10\`, thickness: \`1\`
- Window cut: about \`3, 3, 2\`
- Door cut: \`3, 5, 3\` - and the height genuinely needs to be 5 or more, because a Roblox character is 5 studs tall and will not duck.

These are starting points, not laws. A bigger house is fine. A house so big you spend forty minutes on walls is not.`,
      },
      {
        title: "Building the shell: floor, walls, roof",
        content: `### Floor
1. Make a Block, rename it \`Floor\`.
2. Size it around \`20, 1, 16\`, set \`Anchored = true\`, and give it a material with some character - Concrete or Wood beats default Plastic.

### Walls
1. Make a Block called \`Wall_Back\` and stand it on the back edge of the floor. Height about 10, thickness 1.
2. **Ctrl+D** to duplicate, and move the copy into place. Repeat for \`Wall_Left\`, \`Wall_Right\`, \`Wall_Front\`.
3. The side walls need Rotate (key 4) to turn 90°.
4. Fly around the corners and check they actually meet. Snap should handle this - if you see daylight through a corner, Snap was off.
5. Every wall: \`Anchored = true\`.

### Roof
1. A Block named \`Roof\`, sized a little larger than the floor - \`22, 1, 18\` gives you an overhang, which is what makes a box read as a *building*.
2. Sit it on top of the walls with no gap.
3. \`Anchored = true\`.

**Do now (12 min):** build the shell and press **F5**. Nothing should move, wobble, or fall. If something falls, you missed an Anchored - and now you know exactly which part, because it is the one on the ground.`,
      },
      {
        title: "Negate and Union: cutting real holes",
        content: `This is the part of the lesson worth remembering.

Negate and Union are CSG tools - constructive solid geometry. The idea is simple and powerful: you place a block where you want a hole, mark it as "this is a hole, not an object", and then merge it into the wall. The wall keeps its shape minus the block.

You are not painting a window. You are removing material.

### Cutting a window
1. Select a wall - \`Wall_Left\` is a good first victim.
2. Make a new Block and name it \`WindowCut_01\`.
3. Size it - and make it **thicker than the wall**. If the wall is 1 thick, make the cutter 2. A cutter that stops flush with the surface leaves a paper-thin skin of wall behind, and that is the number one reason a Union "doesn't work".
4. Push it into the wall where the window belongs. Check from the front *and* from the side - it must poke out both faces.
5. Select \`WindowCut_01\` and hit **Negate** on the Model tab. It turns translucent red. That red means "I am a hole waiting to happen".
6. Hold **Ctrl**, click the wall so both are selected, and hit **Union**.
7. Rename the result something sensible, and set **\`Anchored = true\`** again - Union frequently resets it.

### Doorway
Same process on \`Wall_Front\`, except the cutter reaches down to the floor and stands at least 5 studs tall.

### When it goes wrong
Select the object and press **Separate**. It splits back into its pieces and you can fix the cutter and retry. Union is not a one-way door - nothing you do here is unrecoverable.

**Do now (15 min):** cut at least two windows and one doorway. Press F5 and walk through your own front door. That moment - your character stepping through a hole you cut - is the actual point of lesson 1.1.`,
      },
      {
        title: "Grouping and saving",
        content: `### Group it
1. In Explorer, Ctrl-click the floor, all four walls, and the roof. Do **not** include Baseplate - it is the world, not your house.
2. **Ctrl+G** (or Model → Group). Name the result \`House_01\`.

Now the whole house moves as one object. You will appreciate this in 1.2, when you build an island and need to pick the house up and set it down somewhere flat.

### Save it
**File → Save to Roblox**, name it \`Lesson 1.1 - House_01\`.

"Save to Roblox" puts the Place in your account, in the cloud. You can open it from any computer, and it is the version the course expects you to bring to the next lesson. Saving to your hard drive only is how people lose a week of work.

**Do now (3 min):** group, save, and confirm the name is right.`,
      },
      {
        title: "Check your work before you move on",
        content: `Four checks. They take two minutes and they catch almost everything.

1. **Names** - open Explorer. Can you tell what each object is without clicking it? \`Floor\`, \`Wall_Front\`, \`Roof\` - good. \`Union\`, \`Part\`, \`Part2\` - go back and rename.
2. **Anchored** - click through every part. Any \`false\` is a part that will fall in-game.
3. **Play test** - F5, and walk through the door. Not past it. Through it.
4. **Saved** - the title bar should show your place name.

Decoration, lighting, and scripts are all coming in later lessons. Today the win is clean geometry and a shell that holds together. Resist the urge to spend twenty minutes picking a colour.

**Do now (2 min):** run all four checks.`,
      },
      {
        title: "How to grade yourself",
        content: `Be honest here - this table is for you, not for a mark.

| Level | What it looks like |
|---|---|
| **Not done yet** | No Union windows, parts falling in Play, or nothing saved. |
| **Done** | Floor, walls, roof, 2+ windows, a doorway. Grouped and saved. |
| **Good** | Geometry is snapped tight with no gaps, everything is named clearly, and the character walks through the door without getting stuck. |
| **Excellent** | The house has a detail that was your idea - a chimney, a porch, a stepped roof - and the proportions look deliberate. |

If you landed on "Done", you passed. If you landed on "Excellent", you have already started designing rather than following - which is the whole game.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "The walls collapse the moment you press Play",
      explanation: "Something is not Anchored. Union is the usual culprit - it often resets Anchored back to false on the object it creates, even when both originals were anchored.",
      correctApproach: "Select every part of the house and set Anchored = true. Make it a reflex: every time you finish a Union, check Anchored immediately.",
    },
    {
      mistake: "Explorer or Properties has vanished",
      explanation: "The panel got closed. It happens to everyone in the first week.",
      correctApproach: "View tab → tick Explorer and Properties. They dock back where they were.",
    },
    {
      mistake: "Union runs, but the window is not a hole - the wall looks solid",
      explanation: "Either the cutter was never Negated, or it was thinner than the wall and only hollowed out the middle.",
      correctApproach: "Negate the cutter first - it must be translucent red before you Union. And make it thicker than the wall so it pokes out both sides.",
    },
    {
      mistake: "Union swallowed parts you did not want in it",
      explanation: "More than two objects were selected when you clicked Union.",
      correctApproach: "Ctrl+Z, or select the result and press Separate. Then Ctrl-click exactly two things - one wall, one cutter - and try again.",
    },
    {
      mistake: "The character cannot get through the door",
      explanation: "The opening is under 5 studs tall, or it does not reach the floor so there is a lip to climb.",
      correctApproach: "A Roblox character is about 5 studs tall. Make the cutter at least 5 high and make sure its bottom is level with the floor, then redo the Union.",
    },
    {
      mistake: "The work is gone next time you open Studio",
      explanation: "The place was saved locally, or not saved at all.",
      correctApproach: "File → Save to Roblox, with a clear name. Cloud-saved places open on any machine and cannot be lost with your laptop.",
    },
    {
      mistake: "Thin gaps of daylight between the walls",
      explanation: "Parts were dragged with Snap to Grid switched off, so they landed on fractional coordinates.",
      correctApproach: "Turn Snap to Grid on and nudge the walls again. They will click into alignment.",
    },
  ],
  summary:
    "You opened Studio, learned to fly the camera, met the four core tools and the properties that matter, and then did the thing most beginners never get to on day one - you cut real openings with Negate and Union instead of faking them. Your house is grouped, anchored, and saved to your account as project #1.",
  practiceTask: {
    title: "Practice: House_01",
    difficulty: "beginner",
    description: `**The build:** a house shell with real window and door openings, grouped and saved to your account.

Work through it in three parts. Do not skip ahead to the windows - cutting into walls that are not yet snapped and anchored just means redoing them.

### Part A: The shell
1. New level from the **Baseplate** template.
2. \`Floor\` block, roughly 20×1×16, \`Anchored = true\`.
3. Four walls - \`Wall_Front\`, \`Wall_Back\`, \`Wall_Left\`, \`Wall_Right\` - about 10 tall, all anchored. Build one, then Ctrl+D the rest.
4. A \`Roof\` slightly wider than the floor, so it overhangs.
5. **F5.** Nothing should move.

### Part B: The openings
1. Cut a window in \`Wall_Left\`: cutter block → Negate → Ctrl-select wall → Union.
2. Cut at least one more window in a different wall.
3. Cut a doorway in \`Wall_Front\` - at least 5 studs tall, reaching the floor.
4. Re-check \`Anchored\` after every single Union.
5. **F5** and walk through the doorway yourself.

### Part C: Wrap up
1. Ctrl-select the floor, walls, and roof in Explorer → **Ctrl+G** → name it \`House_01\`.
2. **File → Save to Roblox** as \`Lesson 1.1 - House_01\`.
3. Mark the practice complete here.`,
    hints: [
      "Snap to Grid on, always. It is the difference between walls that meet and walls that nearly meet.",
      "Make the cutter block thicker than the wall - it has to poke out of both faces or the hole will not go all the way through.",
      "Anchored resets after Union more often than you would expect. Check it every time.",
      "Lost track of something? Click it in Explorer and press F to fly the camera to it.",
      "A Union gone wrong is not permanent - Separate splits it back apart so you can retry.",
    ],
    optionalChallenge:
      "Give the roof a real pitch using two Wedge parts instead of a flat slab, then add a Cylinder chimney poking through it. If you want to push further: cut an arched doorway by using a Cylinder as the cutter instead of a Block.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Which template is the best starting point for learning?",
        options: [
          "Obby",
          "City",
          "Baseplate",
          "Empty",
        ],
        correctAnswer: 2,
        explanation: "Baseplate gives you a floor and a sky and nothing else. The other templates come pre-loaded with parts and scripts you did not write, which makes it impossible to tell your bugs from theirs.",
      },
      {
        id: "q2",
        type: MC,
        question: "Which key activates the Move tool?",
        options: [
          "2",
          "1",
          "3",
          "4",
        ],
        correctAnswer: 0,
        explanation: "The tools sit on 1-2-3-4 in the order you use them: 1 Select, 2 Move, 3 Scale, 4 Rotate.",
      },
      {
        id: "q3",
        type: MC,
        question: "You have built one wall and need three more. Which shortcut duplicates it?",
        options: [
          "Ctrl+S",
          "Ctrl+Z",
          "Ctrl+G",
          "Ctrl+D",
        ],
        correctAnswer: 3,
        explanation: "Ctrl+D duplicates the selection in place. Build one wall properly, then duplicate - it is faster and the copies keep the exact same size.",
      },
      {
        id: "q4",
        type: MC,
        question: "Which key activates the Rotate tool?",
        options: [
          "1",
          "4",
          "2",
          "3",
        ],
        correctAnswer: 1,
        explanation: "4 is Rotate. You need it for the side walls, which start facing the wrong way after you duplicate them.",
      },
      {
        id: "q5",
        type: MC,
        question: "What does the F key do after you select an object?",
        options: [
          "Flies the camera to the object",
          "Deletes the object",
          "Starts Play mode",
          "Combines objects with Union",
        ],
        correctAnswer: 0,
        explanation: "F frames the selection. Select something in Explorer, press F, and the camera goes to it - the fastest way to find anything in a big level.",
      },
      {
        id: "q6",
        type: MC,
        question: "Which panel shows the hierarchy of every object in the game?",
        options: [
          "Properties",
          "Toolbox",
          "Explorer",
          "Output",
        ],
        correctAnswer: 2,
        explanation: "Explorer is the table of contents for your whole game. Properties shows the settings of whatever is selected in it.",
      },
      {
        id: "q7",
        type: MC,
        question: "What does Anchored = true mean?",
        options: [
          "The object becomes invisible",
          "The object is fixed in place and is not affected by gravity",
          "The object cannot be selected",
          "The object glows",
        ],
        correctAnswer: 1,
        explanation: "Roblox runs real physics. Anchored takes an object out of the simulation so it stays exactly where you put it - essential for anything structural.",
      },
      {
        id: "q8",
        type: MC,
        question: "What does Negate do to a Part?",
        options: [
          "Deletes it permanently",
          "Marks it as a cutter, so Union will subtract it from another object",
          "Doubles its size",
          "Makes it unmovable",
        ],
        correctAnswer: 1,
        explanation: "Negate flags a Part as negative space. It turns translucent red, and the next Union removes its volume from whatever it is merged with.",
      },
      {
        id: "q9",
        type: MC,
        question: "Your Union ran, but the wall still looks solid. What is the most likely cause?",
        options: [
          "The cutter was thinner than the wall, or was never Negated",
          "Snap to Grid was on",
          "The wall was Anchored",
          "Output was closed",
        ],
        correctAnswer: 0,
        explanation: "A cutter has to be Negated first, and it has to be thicker than the wall so it pokes out both faces. Otherwise it hollows the middle and leaves a thin skin behind.",
      },
      {
        id: "q10",
        type: MC,
        question: "How do you undo a Union that came out wrong?",
        options: [
          "You cannot - Union is permanent",
          "Delete the whole model and rebuild it",
          "Select it and press Separate",
          "Set Anchored to false",
        ],
        correctAnswer: 2,
        explanation: "Separate splits a Union back into its original parts. Nothing you do with CSG is a one-way door.",
      },
      {
        id: "q11",
        type: MC,
        question: "Why should a doorway be at least 5 studs tall?",
        options: [
          "Union does not work below 5 studs",
          "Because that is roughly the height of a Roblox character, and characters do not duck",
          "Because Snap to Grid uses 5-stud steps",
          "It does not matter",
        ],
        correctAnswer: 1,
        explanation: "A standard character is about 5 studs tall. Anything shorter and they walk into the wall above the opening.",
      },
      {
        id: "q12",
        type: MC,
        question: "What is Snap to Grid for?",
        options: [
          "Making objects transparent",
          "Speeding up the camera",
          "Snapping objects to fixed increments so they align without gaps",
          "Saving the level automatically",
        ],
        correctAnswer: 2,
        explanation: "Without Snap, parts land on fractional coordinates. It looks fine in the editor and shows up in-game as hairline cracks of daylight between the walls.",
      },
      {
        id: "q13",
        type: MC,
        question: "What does Ctrl+G do in Explorer?",
        options: [
          "Groups the selected objects into a Model",
          "Saves the game",
          "Generates terrain",
          "Applies a material",
        ],
        correctAnswer: 0,
        explanation: "Ctrl+G groups a selection into a Model, so the whole house can be moved, copied, or scripted as one thing.",
      },
      {
        id: "q14",
        type: MC,
        question: "Why save with File → Save to Roblox rather than only to your computer?",
        options: [
          "It runs faster",
          "It stores the Place in your account so you can open it from any machine",
          "It is the only way to use Union",
          "It makes the level public",
        ],
        correctAnswer: 1,
        explanation: "Saving to Roblox puts the Place in the cloud on your account. A local-only save is lost with the machine it lives on.",
      },
      {
        id: "q15",
        type: MC,
        question: "Which Part type is the right choice for a sloped roof or a ramp?",
        options: [
          "Sphere",
          "Cylinder",
          "Wedge",
          "Block",
        ],
        correctAnswer: 2,
        explanation: "A Wedge is a block with one sloped face - exactly what a roof pitch or a walkable ramp needs.",
      },
    ],
  },
}

export const enLesson12 = {
  lessonId: "lesson-roblox-1-2",
  moduleId: "module-01",
  order: 2,
  title: "1.2 - Terrain Editor",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Explain when to reach for Terrain and when to reach for Parts.",
    "Navigate the Terrain Editor's Create and Edit tabs without guessing.",
    "Shape land with Draw, Sculpt, Smooth, and Flatten, in that order.",
    "Paint a believable shoreline with a Grass → Sand → Water transition.",
    "Set your House_01 down on an island, playtest the walk, and save it.",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 2 of 92)",
        content: `Your house from 1.1 is sitting on an infinite grey plane. It looks like a house in a void, because that is exactly what it is.

Today you give it a world: an island with a hill behind it, water in front, and a sand beach in between. And you build all of it with a completely different toolset from yesterday's - one where you sculpt the ground like clay instead of stacking blocks.

| After 1.1 | Result of 1.2 |
|---|---|
| A house on a flat grey plane | A house on an island you shaped |
| Parts are the only thing you can build with | Terrain: hills, water, beaches, cliffs |
| The level has no sense of place | Somewhere a player would want to explore |

**Your finish line for today:**
- An island with land and water.
- At least one hill, with a shoreline smoothed by Smooth.
- At least 3 materials, including the Grass → Sand → Water transition.
- The house standing on flat ground you levelled with Flatten.
- Saved as \`Lesson 1.2 - Island\`.

**Do now (2 min):** open \`Lesson 1.1 - House_01\` from your account. Studio open, this page beside it, as always.`,
      },
      {
        title: "Two completely different building systems",
        content: `Roblox gives you two ways to make solid things, and they are not interchangeable. Knowing which is which saves you from the classic beginner project: an ocean built out of 400 blue blocks that drops the frame rate to single digits.

| | **Parts** | **Terrain** |
|---|---|---|
| What it is | Individual objects - walls, roofs, buttons | One continuous mass of ground |
| Best for | Buildings, machines, anything a script touches | Islands, lakes, beaches, mountains, paths |
| How you edit it | Move, Scale, Rotate, Union | Terrain Editor: Generate, Sculpt, Paint |
| In Explorer | Dozens of named objects | A single \`Terrain\` object under Workspace |

The rule of thumb: **if a player interacts with it, it is a Part. If a player walks across it, it is Terrain.**

Two mistakes this rule prevents:
1. Building nature out of blocks. A block ocean is slow and it looks like blocks. Terrain Water is one operation and it moves.
2. Building interactive things out of Terrain. You cannot attach a script to a patch of ground. Doors, buttons, and platforms stay Parts.

**Do now (2 min):** find \`Workspace → Terrain\` in Explorer. Click it, look at its properties. Do not delete it - it is the object all your landscape will live inside.`,
      },
      {
        title: "Opening the Terrain Editor",
        content: `1. **Home** tab.
2. Click **Terrain** - the little mountain icon. (Also under **Window → 3D**.)
3. A panel appears on the left with two tabs.

**Create** is the automatic half: **Generate** builds you a whole landscape from settings, and **Import** turns a heightmap image into terrain.

**Edit** is the hand-tool half: Select, Transform, Draw, Sculpt, Smooth, Paint, Flatten and friends.

Most Edit tools share three settings, and they are worth understanding before you start clicking:
- **Brush Shape** - sphere, box, or cylinder.
- **Brush Size** - big for landmasses, small for the path to your front door.
- **Strength** - how hard each stroke bites. Low strength and several passes always beats one heavy stroke.

Think of it like a real brush: you block in the big shapes with the widest brush you own, then switch to something fine for detail. Trying to sculpt a whole island with a small brush is an hour you will not get back.

One gotcha: **Terrain tools do nothing in Play mode.** If a tool seems dead, check you are not still running the game. Press Stop.

**Do now (3 min):** open Terrain Editor and click through both tabs. Do not use anything yet - just see what is there.`,
      },
      {
        title: "Generate: an island in ten seconds",
        content: `You could sculpt an island from nothing. You should not, on your first try. Generate gives you a landscape with realistic noise and variation in it - the kind of irregularity that is genuinely hard to draw by hand - and you edit from there.

1. **Create** tab → **Generate**.
2. Size: 512 × 128 × 512 is a good island scale.
3. Pick biomes - **Plains** or **Dunes** are easy to work with - and tick **Water**. Adjust **Blending** and **Biome Size** if you want.
4. Hit **Generate** and wait.

Do not like it? **Ctrl+Z**, change the **Seed**, generate again. The seed is just a number that decides the random layout, so a new seed is a whole new island for free. Try three or four before you settle.

**Fair warning:** generation replaces the ground under everything, so your house will end up either buried or floating in mid-air. This is normal and it is not a disaster. Do not delete the house. Find it in Explorer, press **F** to fly to it, and deal with it in the next steps.

**Do now (6 min):** generate an island. Fly around it. Find a flattish spot near the water where the house would look good. Save the file.`,
      },
      {
        title: "Raising ground: Draw and Sculpt in Add mode",
        content: `Two tools add ground, and they have different personalities.

- **Draw (Add)** is the blunt one. Big, fast, obvious. It builds volume in a hurry and leaves hard edges. Perfect for "there is a hill here now".
- **Sculpt (Add)** is the gentle one. It swells the ground gradually, and its **Strength** setting controls how gradually. Perfect for turning a lumpy blob into something that looks like landscape.

The workflow that works: **Draw big, Sculpt small.** Rough the hill in with a large Draw brush in twenty seconds, then go over it with Sculpt at Strength 0.3-0.5 and a smaller brush until the silhouette looks right.

Watch the steepness. A slope steeper than roughly 45° is a wall as far as your character is concerned - they will run at it and slide back down. Check the profile from the side, not from above, because from above every hill looks perfectly climbable.

**Do now (7 min):** Draw (Add) a hill near the house. Then Sculpt (Add) over it with a smaller, softer brush. Fly to ground level and look at it from the side.`,
      },
      {
        title: "Removing ground: Draw and Sculpt in Subtract mode",
        content: `Same two tools, opposite direction. Switch to **Subtract** in the toolbar, or just hold **Ctrl** while you drag.

- **Draw (Subtract)** digs decisively. Lakes, bays, quarry walls, cliff faces.
- **Sculpt (Subtract)** shaves. Use it to soften a shoreline or knock the point off a peak that came out too sharp.

**How to get a beach that reads as a beach:**
1. Draw (Subtract) a basin where the water will sit.
2. Leave a gently sloping strip of land between the basin and the grass. That strip is your beach - and the *slope* is what sells it. A vertical drop from grass to water is a cliff, not a coast.
3. Paint that strip Sand later.

Nature almost never makes a sharp edge. If your island's outline looks like it was cut with scissors, it will read as fake no matter how good the materials are. Sculpt (Subtract) at low strength around the water line fixes this in about a minute.

One caution: leave the ground immediately under the house alone for now. You will level it properly with Flatten in the next step, and digging next to it first just makes that harder.

**Do now (7 min):** dig a basin for a lake or a bay. Soften its edge with Sculpt (Subtract) at low Strength, leaving a sloped strip for the beach.`,
      },
      {
        title: "Smooth and Flatten: making it liveable",
        content: `After Draw and Sculpt, your island has character and also a lot of jagged nonsense. These two tools clean it up.

**Smooth** rounds off sharp edges without flattening them. Use it on every shoreline and every slope before you paint anything. Shortcut: hold **Shift** while using Draw or Sculpt and it smooths instead.

**Flatten** makes a surface genuinely level - which is what a building needs. It has three modes worth knowing:
- **Erode to Flat** - cuts down anything above the plane.
- **Grow to Flat** - fills up anything below it.
- **Flatten All** - does both at once.

For the house pad, Flatten All is usually what you want: it fills the dips and shaves the bumps in one pass. A house on unlevel ground either floats at one corner or sinks at another, and there is no fixing that by nudging the house.

**Do now (6 min):** Flatten a pad for the house and set the house down on it with the Move tool. Then Smooth your shoreline.`,
      },
      {
        title: "Paint: where it stops looking like a prototype",
        content: `**Paint** lives on the Edit tab. Pick a material, brush it on. This is the step where a grey-brown lump becomes a place.

Two **Material Modes**:
- **Paint** - lays the new material over whatever is there.
- **Replace** - swaps one specific material for another across an area. Handy when you decide the whole northern half should be sand instead of grass.

The four materials that do most of the work:

| Material | Where it goes |
|---|---|
| **Grass** | Most of the island, and the yard |
| **Sand** | The strip between grass and water |
| **Rock** | Cliffs, steep slopes, anything too steep to walk |
| **Water** | Fills the basin you dug |

**The one rule that makes shorelines believable: never let grass touch water.** Real coasts go grass → sand → water, and your eye knows it even if you have never thought about it. A band of sand two or three studs wide is enough.

Rock has a second job worth knowing: painting a slope with Rock tells the player *"do not bother climbing this"* without a single sign or barrier. Materials are level design, not just decoration.

**Heads up:** water in the editor often sits perfectly still and looks like blue paint. It animates in Play mode. Do not spend ten minutes trying to fix a bug that is not there.

**Do now (7 min):** paint Grass, then a Sand band along the shore, then fill the basin with Water. Press F5 to see the water actually move.`,
      },
      {
        title: "Playtest the walk",
        content: `A level is not finished when it looks right. It is finished when it *walks* right.

1. Confirm the house sits on the Flatten pad and its Parts are still Anchored.
2. Paint a short path of sand or ground from the front door toward the beach. Players follow visual paths without being told to - it is one of the cheapest bits of level design there is.
3. **F5.** Walk from the house to the water, then turn around and climb the hill.
4. Ask three questions: Did you get stuck anywhere? Did the water stay put? Is the house sitting on the ground or hovering above it?
5. **File → Save to Roblox** → \`Lesson 1.2 - Island\`.

If the hill defeated your character, that is useful information, not a failure. Go back to Smooth, take the slope down, test again. Adjusting a level after playing it is the actual job - you will be doing this in every module from here to 12.

**Do now (5 min):** run the walk. Fix whatever the walk tells you to fix.`,
      },
      {
        title: "The order that saves you time",
        content: `Terrain work punishes doing things out of order. Paint before you smooth and you will smooth away your paint. Place the house before you flatten and you will place it twice.

1. **Generate** the base landmass and water. Save.
2. **Shape** with large Draw / Sculpt brushes - hills and basins.
3. **Level and smooth** - Flatten for building pads, Smooth for shores and slopes.
4. **Place objects** - move House_01 onto the pad.
5. **Paint** - materials last.
6. **Playtest** - walk it.
7. **Save** the final version.

Big shapes first, fine detail last. This is the same order a painter, a sculptor, and a level designer all work in, and it is not a coincidence.`,
      },
      {
        title: "Check your work before you move on",
        content: `**Requirements:**
- [ ] The landscape is genuinely shaped, not a flat Baseplate with a colour on it.
- [ ] There is at least one raised area (hill) and one lowered area (water).
- [ ] Shores and slopes have been Smoothed.
- [ ] At least 3 materials, including a Grass → Sand → Water transition.
- [ ] The house stands on a pad levelled with Flatten.
- [ ] You have walked the route in Play mode and it works.
- [ ] Saved as \`Lesson 1.2 - Island\`.

| Level | What it looks like |
|---|---|
| **Not done yet** | No water or no shaped terrain. The house floats or is buried. Not saved. |
| **Done** | Land, water, a hill, three materials, house on level ground. |
| **Good** | The shoreline reads as natural, Smooth has been used properly, and every slope is walkable. |
| **Excellent** | The island has a deliberate shape - a bay, a second islet, a rocky headland - and you made a choice about where the player's eye goes. |`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "You clicked Generate and nothing happened, or Studio froze",
      explanation: "Generating a 512×512 map is real work. Studio goes quiet while it thinks.",
      correctApproach: "Give it 10-20 seconds. If it truly did nothing, clear the Terrain and generate again - and consider a smaller map size.",
    },
    {
      mistake: "The house is buried underground or floating in the sky after Generate",
      explanation: "Generate replaces the ground everywhere, including under objects you already placed. Completely expected.",
      correctApproach: "Do not delete the house. Select it in Explorer, press F to fly to it, Flatten a pad at the right height, and Move the house onto it.",
    },
    {
      mistake: "Hills and shores look like torn paper - all jagged edges",
      explanation: "Draw and Sculpt leave hard edges. That is what Smooth is for, and it got skipped.",
      correctApproach: "Run Smooth over every slope and shoreline before you paint. Or hold Shift while sculpting to smooth as you go.",
    },
    {
      mistake: "The beach does not look like a beach",
      explanation: "Grass is touching water with nothing in between, so the eye reads it as a cliff edge.",
      correctApproach: "Leave a sloped strip of land between grass and water and paint it Sand. Two or three studs wide is plenty.",
    },
    {
      mistake: "The water is a flat blue sheet with no waves",
      explanation: "Water animation usually does not run in edit mode.",
      correctApproach: "Press F5. It moves in Play mode. Nothing is broken.",
    },
    {
      mistake: "The character cannot climb your hill",
      explanation: "The slope is steeper than a character can walk - roughly 45° is the limit.",
      correctApproach: "Smooth the slope down, or accept it and paint it Rock so the player reads it as scenery rather than a route.",
    },
    {
      mistake: "A Terrain tool does nothing no matter where you click",
      explanation: "The game is still running - Terrain tools are disabled in Play mode.",
      correctApproach: "Press Stop, then try again.",
    },
  ],
  summary:
    "You met Roblox's second building system. You generated an island, pushed the ground around with Draw and Sculpt, levelled a pad with Flatten, softened it with Smooth, and painted a shoreline that goes grass → sand → water the way a real one does. Your house from 1.1 now stands somewhere, and you walked the route yourself to prove it works.",
  practiceTask: {
    title: "Practice: An island around the house",
    difficulty: "beginner",
    description: `**The build:** an island with a hill, water, and a beach, with House_01 standing on it.

Follow the order. Terrain punishes doing things out of sequence more than any other part of Studio.

### Part A: Base shape
1. Terrain Editor → Create → **Generate**. Pick a biome (Plains or Dunes) and tick **Water**.
2. Find your house - it will be buried or floating. Select it in Explorer, press **F**.
3. **Flatten** a level pad for it, then **Move** the house onto the pad. Check \`Anchored\` is still true.

### Part B: Shaping
1. **Draw (Add)** one hill near the house, then refine it with **Sculpt (Add)** at low Strength.
2. **Draw (Subtract)** a basin for a lake or bay. Leave a sloped strip for the beach.
3. **Smooth** every shoreline and slope.

### Part C: Paint and test
1. Paint the main landmass **Grass**.
2. Paint a band of **Sand** between grass and water.
3. Fill the basin with **Water**.
4. **F5.** Walk from the front door to the water, then up the hill. Fix anything that stops you.
5. **File → Save to Roblox** as \`Lesson 1.2 - Island\`.
6. Mark the practice complete here.`,
    hints: [
      "Big brush for landmasses, small brush for the path to the front door. Switching sizes is most of the skill.",
      "Smooth before you Paint. Smoothing afterwards will drag your materials around.",
      "Low Strength and three passes beats high Strength and one. Terrain is much easier to add to than to repair.",
      "Water looks dead in the editor and alive in Play mode. Check with F5 before you assume it is broken.",
      "Do not like the island Generate gave you? Change the Seed and roll again. It costs nothing.",
    ],
    optionalChallenge:
      "Make the two sides of your water tell different stories: a Rock cliff dropping straight into the sea on one side, and a long shallow Sand beach on the other. Then add a narrow sand path winding from the beach up to the front door - and playtest whether a first-time player would follow it without being told to.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is Terrain best used for?",
        options: [
          "Creating interface buttons",
          "Writing scripts",
          "Natural landscape - hills, beaches, lakes, cliffs",
          "Adding sounds",
        ],
        correctAnswer: 2,
        explanation: "Terrain is for the ground a player walks across. Anything a player interacts with, or a script touches, stays a Part.",
      },
      {
        id: "q2",
        type: MC,
        question: "How is Terrain different from Parts?",
        options: [
          "Terrain is one continuous mass of ground; a Part is an individual object",
          "Terrain cannot be saved",
          "Terrain always glows",
          "Terrain is visible only in Play mode",
        ],
        correctAnswer: 0,
        explanation: "In Explorer, all your landscape is a single Terrain object, while Parts appear as dozens of separately named things.",
      },
      {
        id: "q3",
        type: MC,
        question: "Which tool builds a whole landscape automatically from settings?",
        options: [
          "Paint",
          "Properties",
          "Toolbox",
          "Generate",
        ],
        correctAnswer: 3,
        explanation: "Generate, on the Create tab, builds terrain with realistic natural variation in it - the kind that is genuinely hard to sculpt by hand.",
      },
      {
        id: "q4",
        type: MC,
        question: "What does Draw do in Add mode?",
        options: [
          "Deletes the level",
          "Builds terrain volume up, quickly and with hard edges",
          "Paints the ground with sand",
          "Combines objects with Union",
        ],
        correctAnswer: 1,
        explanation: "Draw (Add) is the blunt instrument - it is how you rough in a hill in twenty seconds before refining it.",
      },
      {
        id: "q5",
        type: MC,
        question: "What is the practical difference between Draw and Sculpt?",
        options: [
          "Draw removes water",
          "Draw works only in Play mode",
          "Draw creates a script",
          "Draw is fast and hard-edged; Sculpt builds up gradually and smoothly",
        ],
        correctAnswer: 3,
        explanation: "The workflow is Draw big, Sculpt small: rough the shape in with Draw, then refine the silhouette with Sculpt at low Strength.",
      },
      {
        id: "q6",
        type: MC,
        question: "What is Subtract mode for?",
        options: [
          "Saving the game",
          "Digging - lakes, bays, cliffs, and removing terrain",
          "Grouping models",
          "Opening the Output panel",
        ],
        correctAnswer: 1,
        explanation: "Draw (Subtract) digs decisively; Sculpt (Subtract) shaves gently. You can also just hold Ctrl while dragging.",
      },
      {
        id: "q7",
        type: MC,
        question: "What does Smooth do?",
        options: [
          "Rounds off sharp terrain edges",
          "Makes blocks transparent",
          "Enables Anchored",
          "Changes the brush size",
        ],
        correctAnswer: 0,
        explanation: "Smooth softens the jagged edges Draw and Sculpt leave behind. Nature rarely makes a sharp edge, and your eye notices when a level does.",
      },
      {
        id: "q8",
        type: MC,
        question: "When do you reach for Flatten?",
        options: [
          "Creating buttons",
          "Cutting windows",
          "Levelling a pad so a building can sit on it properly",
          "Changing a wall colour",
        ],
        correctAnswer: 2,
        explanation: "A house on unlevel ground floats at one corner and sinks at another, and moving the house will not fix it. Level the ground instead.",
      },
      {
        id: "q9",
        type: MC,
        question: "Which order of operations will save you the most rework?",
        options: [
          "Paint → Generate → Smooth",
          "Generate → shape hills and basins → Smooth and Flatten → Paint",
          "Play mode → Subtract → Generate",
          "Union walls → Paint → Generate",
        ],
        correctAnswer: 1,
        explanation: "Big shapes first, fine detail last. Painting before smoothing means smoothing your paint away and doing it twice.",
      },
      {
        id: "q10",
        type: MC,
        question: "Where does Sand belong?",
        options: [
          "On the house roof",
          "On the ceiling",
          "On the doors",
          "In a band between the grass and the water",
        ],
        correctAnswer: 3,
        explanation: "Sand is the transition material. Its whole job is stopping grass from touching water.",
      },
      {
        id: "q11",
        type: MC,
        question: "Which material sequence makes a shoreline look real?",
        options: [
          "Rock only",
          "Neon glow only",
          "Grass → Sand → Water",
          "Plastic only",
        ],
        correctAnswer: 2,
        explanation: "Real coasts have a transition zone, and your eye knows it even if you have never consciously thought about it. Grass meeting water directly reads as a cliff.",
      },
      {
        id: "q12",
        type: MC,
        question: "Generate buried your house underground. What now?",
        options: [
          "Flatten a pad at the right height and Move the house onto it",
          "Delete the house and rebuild it",
          "Close the Explorer panel",
          "Apply Negate to the entire map",
        ],
        correctAnswer: 0,
        explanation: "Completely normal - Generate replaces the ground everywhere. Press F to find the house, level a pad, move it up. Never delete it.",
      },
      {
        id: "q13",
        type: MC,
        question: "Why check water in Play mode?",
        options: [
          "Because terrain disappears in Play mode",
          "Because painting only works in Play mode",
          "Because Generate only works in Play mode",
          "Because wave animation usually does not run in the editor",
        ],
        correctAnswer: 3,
        explanation: "Still, flat water in the editor is not a bug. Press F5 and it moves.",
      },
      {
        id: "q14",
        type: MC,
        question: "What is a large Brush Size good for?",
        options: [
          "Renaming files",
          "Blocking in big landmasses and hills fast",
          "Writing code",
          "Joining small blocks",
        ],
        correctAnswer: 1,
        explanation: "Same logic as painting: widest brush for the big shapes, fine brush for detail. Sculpting an island with a small brush wastes an hour.",
      },
      {
        id: "q15",
        type: MC,
        question: "A Terrain tool does nothing no matter where you click. What is the most likely cause?",
        options: [
          "Terrain has been deleted from Explorer",
          "The game is still running - press Stop",
          "The brush is too large",
          "You need to Union the terrain first",
        ],
        correctAnswer: 1,
        explanation: "Terrain tools are disabled while the game is playing. If a tool feels dead, check whether you are still in Play mode.",
      },
    ],
  },
}

export const enLesson13 = {
  lessonId: "lesson-roblox-1-3",
  moduleId: "module-01",
  order: 3,
  title: "1.3 - Properties, variables, and your first Script",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Read and change an object's Properties from code instead of from the mouse.",
    "Put a Script inside a Part and use the Output panel to see what it did.",
    "Create local variables and use them to control how an object looks.",
    "Use print as your primary debugging tool from day one.",
    "Put a working MagicCube on your island and save the project.",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 3 of 92)",
        content: `Two lessons of building. Today you write code.

Here is the shift, and it is a big one. So far, everything you changed you changed by hand: click the object, find the property, type a value. That works for one cube. It does not work for a hundred coins that need to spin, or a door that has to know when a player touches it, or a leaderboard that updates when someone scores.

A script is you giving instructions once, and the game following them forever.

| After 1.2 | Result of 1.3 |
|---|---|
| Everything is changed by hand in Properties | Code changes properties for you at runtime |
| Nothing in your level reacts to anything | The level does something on its own the second it starts |
| No idea what Output is for | Output is where you find out what your code actually did |

Today's build is deliberately small: a cube that turns violet, starts glowing, and announces itself in Output when you press Play. Small on purpose. Every big system in this course - shops, checkpoints, leaderboards, enemy waves - is built from exactly these pieces: a variable, a property, a print to check it worked.

**Your finish line for today:**
- A \`MagicCube\` block on your island.
- A **Script** inside it (a Script, not a LocalScript - this matters, and we will get to why).
- Code using \`local\`, changing Properties, and calling \`print\`.
- Press Play: the cube changes and text appears in Output.
- Saved as \`Lesson 1.3 - MagicCube\`.

**Do now (2 min):** open \`Lesson 1.2 - Island\` and open the Output panel (View → Output). Leave it open for the rest of your life in Studio.`,
      },
      {
        title: "The same properties, now reachable from code",
        content: `You already know these properties - you have been clicking them for two lessons. The new idea is that code can read and write every single one of them.

| Property | What it is | What you do with it today |
|---|---|---|
| **Name** | The object's name | Change it from code and watch Explorer update live |
| **Size** | Dimensions (X, Y, Z) | Grow the cube in code |
| **Position** | World coordinates | Leave it alone today, or the cube ends up in the sky |
| **BrickColor** | Its colour | The magic |
| **Material** | Its surface | Neon, so it glows |
| **Anchored** | Immune to gravity | Must be true, or it falls |
| **Transparency** | 0 = solid, 1 = invisible | Try 0.3 and see |

One habit worth adopting now: **set the boring stuff by hand, script the interesting stuff.** Name it, anchor it, and place it with the mouse. Save code for the things that need to change while the game is running. Code is not a replacement for a tidy Explorer.

**Do now (4 min):** make a block near the house. Name it \`MagicCube\`. Size about \`4, 4, 4\`, material SmoothPlastic, any bright colour, \`Anchored = true\`.`,
      },
      {
        title: "Adding a Script (and why it goes inside the cube)",
        content: `1. Select \`MagicCube\` in Explorer.
2. **Insert → Script** (or right-click → Insert Object → Script).
3. Check in Explorer that the Script appears **indented under** MagicCube, not sitting beside it in Workspace.
4. **View → Output** if it is not already open.

Studio drops in a starter line: \`print("Hello world!")\`.

**Why does the Script have to live inside the Part?** Because of one line you will write in about three minutes: \`script.Parent\`. That means "the thing I am inside of". If the script is inside the cube, \`script.Parent\` is the cube. If it is loose in Workspace, \`script.Parent\` is Workspace, and your code will confidently try to paint the entire world violet - or, more likely, throw an error.

Location is not decoration. In Roblox, where a script lives determines what it can reach.

**One more choice:** use a **Script**, not a **LocalScript**. The short version for today is that a Script runs on the server, where the real game state lives, and a LocalScript runs on one player's own machine. Changing a cube for everybody is server work. You will learn the full story in module 9 - for now, Script.

**Do now (3 min):** add the Script, press **Play**, and look for "Hello world!" in Output. That line is proof your code ran. Press **Stop**.`,
      },
      {
        title: "Variables: names for things",
        content: `A variable is a name you give to a value so you can use it more than once without retyping it.

\`\`\`lua
local part = script.Parent
local cubeName = "MagicCube"
local glowPower = 1
\`\`\`

Reading that line by line:
- \`local\` means "this name exists inside this script only". Get in the habit now - always \`local\`.
- \`part\`, \`cubeName\`, \`glowPower\` are the names. Make them say what they hold. \`part\` tells you something; \`x\` tells you nothing, and in three weeks \`x\` will tell *you* nothing either.
- \`=\` puts the value into the name.
- \`script.Parent\` is the cube, as we just covered.

Why bother? Two reasons that will matter for the next eighty-nine lessons:
1. **You stop repeating yourself.** Write \`script.Parent\` once, then use \`part\` twenty times.
2. **You change things in one place.** Want a different colour? Edit line 3, not the eleven places you typed it.

**Do now (4 min):** delete the starter line and type those three variables. Press Play. Nothing visible should happen, and - importantly - Output should have no red text. Silence means it compiled.`,
      },
      {
        title: "print: your flashlight",
        content: `\`print\` writes text to the Output panel. It sounds trivial. It is the single most used debugging tool in this course, and in professional game development generally.

\`\`\`lua
local part = script.Parent
print("Script started")
print("Object name:", part.Name)
print("Is the object anchored?", part.Anchored)
\`\`\`

Notice you can print variables, not just text - and you can pass several things separated by commas. That second line is you asking the game "what do you *think* this object is called?" and getting a straight answer.

That question is how you fix almost every bug you will ever have. Not by staring at the code and hoping, but by printing what the code actually sees at that moment.

**Output stayed empty?** Work down this list:
- Did you actually press Play?
- Is the Output panel open?
- Is the script where you think it is?
- Is there red text further up? Read the *first* red line - everything after it is usually knock-on damage.

**A workflow rule, starting now:** Stop → edit → Play. Editing a script while the game is running is legal and Studio will let you, but the changes evaporate when you press Stop, and you will lose twenty minutes wondering why your fix "didn't work".

**Do now (4 min):** add those prints. Press Play and read what comes back.`,
      },
      {
        title: "Making the magic happen",
        content: `Now the cube actually changes when the game starts.

\`\`\`lua
local part = script.Parent
local newName = "MaGicCuBe"

part.Name = newName
part.BrickColor = BrickColor.new("Bright violet")
part.Material = Enum.Material.Neon
part.Size = Vector3.new(5, 5, 5)

print("Magic is working:", part.Name, part.Material)
\`\`\`

What each new piece is:
- \`part.Name = newName\` - assignment. Same \`=\` as before, but the thing on the left is a property of an object rather than a fresh variable.
- \`BrickColor.new("Bright violet")\` - Roblox's named colour palette. There are hundreds; "Really red", "Bright yellow", "Lime green" all work.
- \`Enum.Material.Neon\` - Enums are Roblox's fixed lists of options. You cannot invent a material, so you pick one from the Enum. Autocomplete will show you the whole list if you type \`Enum.Material.\` and pause.
- \`Vector3.new(x, y, z)\` - three numbers bundled into one value. Size, Position and anything else spatial uses Vector3, because a point in 3D needs three numbers, not one.

**Press Play and watch Explorer while you do it.** The name changes in the tree in real time. That is your code reaching into the live game and moving things.

One quirk: changing \`Size\` grows the cube from its centre, so it may end up half-buried. Move it up afterwards with the Move tool.

**Do now (6 min):** write this in, press Play, and watch your cube light up.`,
      },
      {
        title: "Reading properties, not just writing them",
        content: `Assignment goes both ways. You can pull a property's current value *into* a variable and look at it.

\`\`\`lua
local part = script.Parent
local currentSize = part.Size
local currentMaterial = part.Material

print("Current size:", currentSize)
print("Current material:", currentMaterial)

part.Transparency = 0.5
print("The cube is now semitransparent")
\`\`\`

This is more useful than it looks. "Ask the game what state something is actually in" is how you find out that the door you thought was open is closed, or that the coin you thought you deleted is still there.

\`Transparency\` runs 0 to 1. 0 is solid, 1 is completely invisible - and an invisible cube is a hard thing to debug, so keep it around 0.2-0.3 for the final version.

**Do now (4 min):** read size and material into variables, print them, and nudge Transparency to 0.2 or 0.3.`,
      },
      {
        title: "Reading errors without panicking",
        content: `Red text in Output is not you failing. It is the game telling you exactly what went wrong, in a format that takes about a week to get used to. Here are the four you will hit today.

| Output says | What actually happened | Fix |
|---|---|---|
| \`attempt to index nil\` | \`script.Parent\` found nothing useful | The Script is not inside \`MagicCube\`. Drag it in. |
| Nothing at all | Game not running, or script disabled | Press F5; check the script exists in Explorer. |
| \`... is not a valid member\` | A typo in a property name | Check spelling and capitals. \`brickcolor\` is not \`BrickColor\`. |
| The cube falls through the ground | Anchored is off | Set \`Anchored = true\` in Properties, or in code. |

**The debugging routine that always works:**
1. Read the **first** red line. Later errors are usually caused by the first one.
2. Check Explorer. Is the script where you think it is?
3. Still stuck? Delete everything and leave just \`print("hi")\`. If that does not print, the problem is *where the script is*, not *what it says*. If it does print, add your code back a few lines at a time until it breaks - and now you know which line.

That third step is called bisecting, and professionals use it daily.

**Do now (4 min):** break it on purpose. Drag the Script out of the cube into Workspace, press Play, and read the error. Now you have seen \`attempt to index nil\` in a situation where you know exactly what caused it - which means you will recognise it in three weeks when you do not. Drag the script back.`,
      },
      {
        title: "Writing code someone can read",
        content: `Here is the same script, organised the way you should organise every script from here on:

\`\`\`lua
local part = script.Parent

-- Settings (everything you might want to tweak, gathered at the top)
local magicName = "MagicCube"
local magicColor = "Bright violet"
local magicSize = Vector3.new(5, 5, 5)

-- Apply them
part.Anchored = true
part.Name = magicName
part.BrickColor = BrickColor.new(magicColor)
part.Material = Enum.Material.Neon
part.Size = magicSize
part.Transparency = 0

-- Report what happened
print("MagicCube activated!")
print("Current color:", magicColor)
print("Current size:", part.Size)
\`\`\`

Three things are going on structurally, and they are worth naming:

**Settings at the top.** Every number and string you might want to change lives in the first block. Want a red cube? Line 5. You never go hunting through the file.

**Comments with \`--\`.** Anything after \`--\` is ignored by the game and read by humans. Comments explain *why*, not *what* - \`-- Settings\` earns its place; \`-- set the colour\` above a line that obviously sets the colour does not.

**Three clear phases:** configure, apply, report. You will see this shape again in module 4 when you meet ModuleScripts and Config tables - this is the seed of it.

Code is read far more often than it is written, and most of the time the person reading it is you, later, having forgotten everything.`,
      },
      {
        title: "Check your work before you move on",
        content: `**Where to put the cube:** on flat ground near the house, or along the path to the beach. Somewhere you can see it the moment the game starts. Not underwater, not inside a wall, and the Script not parked in ServerScriptService.

**Checklist:**
- [ ] \`MagicCube\` exists, \`Anchored = true\`.
- [ ] The Script is inside the cube.
- [ ] The code uses \`local\` variables.
- [ ] The cube's colour and/or material change when the game starts.
- [ ] \`print\` puts a message in Output.
- [ ] Saved as \`Lesson 1.3 - MagicCube\`.

| Level | What it looks like |
|---|---|
| **Done** | The script runs, variables exist, the cube changes, Output has a message. |
| **Good** | Variables are named meaningfully, the cube uses Neon, and it is placed somewhere you actually notice it. |
| **Excellent** | Several prints reporting different things, and all the settings grouped at the top of the file. |

Keep working in your \`Lesson 1.2 - Island\` file and save it under the new name. Do not start a blank level for the cube - you would be throwing away two lessons of work.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "The Script is sitting in Workspace instead of inside MagicCube",
      explanation: "This is the number one first-script problem. script.Parent means 'whatever I am inside of' - loose in Workspace, that is Workspace, not your cube.",
      correctApproach: "In Explorer, drag the Script onto MagicCube. It should appear indented underneath it.",
    },
    {
      mistake: "A LocalScript was used instead of a Script",
      explanation: "A LocalScript runs on one player's machine, not on the server, and in Workspace it often will not run at all.",
      correctApproach: "Delete it and insert a plain Script. LocalScripts get their proper introduction in 3.7 and module 9.",
    },
    {
      mistake: "Output is completely empty",
      explanation: "Either the game is not running, the panel is closed, or there is a syntax error that stopped the script before it reached your print.",
      correctApproach: "View → Output, press F5, and read every red line - starting with the first one.",
    },
    {
      mistake: "Variables created without local",
      explanation: "It works today, but it creates a global that any other script in the game can collide with. That bug is miserable to find later.",
      correctApproach: "Put local in front of every new variable. Make it muscle memory now while your scripts are five lines long.",
    },
    {
      mistake: "The cube falls through the ground when you press Play",
      explanation: "Anchored is false, or the cube was floating and gravity found it.",
      correctApproach: "Set Anchored = true in Properties, or better, set it in the script so it is true every time the game starts.",
    },
    {
      mistake: "Editing the script while the game is running",
      explanation: "Studio lets you do it, but every change is thrown away the moment you press Stop.",
      correctApproach: "Stop → edit → Play. Always in that order.",
    },
    {
      mistake: "The cube half sinks into the ground after the script resizes it",
      explanation: "Size grows outward from the centre, so making it bigger pushes the bottom below ground level.",
      correctApproach: "Not a bug - just move the cube up with the Move tool afterwards, or set a smaller size.",
    },
  ],
  summary:
    "You wrote your first script. You know what a local variable is and why it earns its keep, you can read and write any property from code, you have seen print report the game's actual state back to you, and you have deliberately broken a script and read the error it produced. Everything in modules 3 through 12 is built out of these four things.",
  practiceTask: {
    title: "Practice: MagicCube",
    difficulty: "beginner",
    description: `**The build:** a cube that transforms itself the instant the game starts, and says so in Output.

### Part A: Setup
1. Open your island level.
2. Make a block near the house, name it \`MagicCube\`.
3. \`Anchored = true\`, size about 4×4×4.
4. Insert a **Script** inside the cube. Open Output.

### Part B: The code
1. \`local part = script.Parent\`.
2. Add a few more \`local\` variables for the colour and size.
3. Write code that sets the material to Neon and applies a new BrickColor.
4. At least two \`print\` calls reporting different things.
5. Press Play. The cube changes; Output speaks.

### Part C: Save
1. Output should have no red text.
2. **File → Save to Roblox** as \`Lesson 1.3 - MagicCube\`.
3. Mark the practice complete here.`,
    hints: [
      "Start with print('test') and confirm it appears before you write anything else. Prove the plumbing works, then build on it.",
      "The Script goes inside MagicCube. In Explorer it should be indented under it, not next to it.",
      "Stop before you edit. Changes made during Play are discarded.",
      "Broken and cannot see why? Strip the script back to one print. If that works, add lines back until it breaks - now you know the line.",
      "Do not hide the cube underwater or behind the house. You want to see it change.",
    ],
    optionalChallenge:
      "Build \`MagicCube_A\` and \`MagicCube_B\` with the same script in each, but different values in the settings variables at the top - one violet Neon, one green ForceField. Then ask yourself: you changed two lines, not two scripts. That is exactly the idea Config tables and ModuleScripts are built on in module 4, and you just used it three weeks early.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Where does the Script go for this lesson?",
        options: [
          "Only in the Lighting folder",
          "As a LocalScript in StarterGui",
          "Inside the Terrain object",
          "Inside the MagicCube object, so that script.Parent is the cube",
        ],
        correctAnswer: 3,
        explanation: "In Roblox, where a script lives decides what it can reach. Inside the cube, script.Parent is the cube.",
      },
      {
        id: "q2",
        type: MC,
        question: "What does the local keyword do?",
        options: [
          "Deletes an object",
          "Creates a variable that exists only inside this script",
          "Enables a Neon glow",
          "Saves the game",
        ],
        correctAnswer: 1,
        explanation: "local scopes the variable to this script, so it cannot collide with a name in someone else's code.",
      },
      {
        id: "q3",
        type: MC,
        question: "What does script.Parent refer to?",
        options: [
          "The object the script is inside of",
          "The player",
          "The Sky",
          "The Roblox website",
        ],
        correctAnswer: 0,
        explanation: "Parent is the container. Move the script and script.Parent changes with it - which is exactly why a misplaced script errors.",
      },
      {
        id: "q4",
        type: MC,
        question: "Where does print(...) show up?",
        options: [
          "In the Explorer panel",
          "In the Toolbox panel",
          "In the Output panel",
          "In the Terrain Editor window",
        ],
        correctAnswer: 2,
        explanation: "Output is where both your prints and the game's error messages appear. Keep it open permanently.",
      },
      {
        id: "q5",
        type: MC,
        question: "Which kind of script does this lesson use?",
        options: [
          "LocalScript",
          "A plain Script, running on the server",
          "ModuleScript",
          "Animation",
        ],
        correctAnswer: 1,
        explanation: "A Script runs on the server where the shared game state lives. LocalScripts run on one player's machine and are covered properly in 3.7 and module 9.",
      },
      {
        id: "q6",
        type: MC,
        question: "What does BrickColor.new(\"Bright violet\") do?",
        options: [
          "Changes the level name",
          "Changes the sound volume",
          "Changes the island's size",
          "Produces a colour value from Roblox's named palette",
        ],
        correctAnswer: 3,
        explanation: "BrickColor lets you name a colour instead of specifying numbers. Hundreds of names are available.",
      },
      {
        id: "q7",
        type: MC,
        question: "What is Enum.Material.Neon?",
        options: [
          "A value picked from Roblox's fixed list of materials",
          "A command that deletes terrain",
          "A way to create a Folder",
          "A plugin",
        ],
        correctAnswer: 0,
        explanation: "An Enum is a fixed menu of allowed options. You cannot invent a material, so you choose one - and autocomplete will list them all for you.",
      },
      {
        id: "q8",
        type: MC,
        question: "Why does Size need Vector3.new(5, 5, 5) rather than just a number?",
        options: [
          "Roblox requires it for all properties",
          "Because a size in 3D needs three numbers - X, Y and Z - bundled into one value",
          "Because print would not work otherwise",
          "Because it enables Neon",
        ],
        correctAnswer: 1,
        explanation: "Vector3 packages three numbers together. Anything spatial - Size, Position, velocity - uses one.",
      },
      {
        id: "q9",
        type: MC,
        question: "Red errors in Output. What is your first move?",
        options: [
          "Delete the account",
          "Delete all terrain",
          "Apply the Union tool",
          "Read the first red line and check where the script actually is",
        ],
        correctAnswer: 3,
        explanation: "Later errors are usually knock-on damage from the first one. Read that one, then verify the script's location in Explorer.",
      },
      {
        id: "q10",
        type: MC,
        question: "Why put colour and size in variables at the top of the script?",
        options: [
          "Because Roblox requires it",
          "So there is one place to change a setting instead of hunting through the file",
          "Because print would not work otherwise",
          "To disable gravity",
        ],
        correctAnswer: 1,
        explanation: "One place to change, one place to look. It is a small habit at 12 lines and a survival skill at 200.",
      },
      {
        id: "q11",
        type: MC,
        question: "What should Anchored be on MagicCube?",
        options: [
          "true, or physics will drag it to the ground",
          "Always false",
          "nil",
          "It only matters in a LocalScript",
        ],
        correctAnswer: 0,
        explanation: "Roblox runs real physics on anything unanchored. A floating decorative cube with Anchored off is a falling cube.",
      },
      {
        id: "q12",
        type: MC,
        question: "What line does Studio put in a new Script automatically?",
        options: [
          "script.Parent = part",
          "local newName = \"Roblox Studio\"",
          "print(\"Hello world!\")",
          "BrickColor.new(\"Bright violet\")",
        ],
        correctAnswer: 2,
        explanation: "A starter print - which doubles as a free test that your script is in a place where it will actually run.",
      },
      {
        id: "q13",
        type: MC,
        question: "What does Transparency = 1 do?",
        options: [
          "Makes the object glow with Neon",
          "Makes the object completely invisible",
          "Deletes the object",
          "Moves the object to Workspace",
        ],
        correctAnswer: 1,
        explanation: "0 is solid, 1 is fully invisible. Invisible objects are hard to debug, so keep the cube around 0.2-0.3.",
      },
      {
        id: "q14",
        type: MC,
        question: "Why not edit a script while the game is running?",
        options: [
          "Every change is discarded the moment you press Stop",
          "It is against the rules",
          "print text turns green",
          "All terrain disappears",
        ],
        correctAnswer: 0,
        explanation: "Studio allows it, but Play mode is a sandbox that gets thrown away. Stop, edit, Play.",
      },
      {
        id: "q15",
        type: MC,
        question: "Your script prints nothing and shows no errors. What is the fastest way to find out why?",
        options: [
          "Rebuild the island from scratch",
          "Strip the script down to a single print, then add lines back until it breaks",
          "Switch to a LocalScript",
          "Turn Anchored off",
        ],
        correctAnswer: 1,
        explanation: "This is bisecting. If the lone print does not appear, the problem is where the script lives. If it does, you add code back until you find the exact line that breaks it.",
      },
    ],
  },
}

export const enLesson14 = {
  lessonId: "lesson-roblox-1-4",
  moduleId: "module-01",
  order: 4,
  title: "1.4 - Arithmetic and if/else conditions",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Do maths in Luau with +, -, *, / and know which one happens first.",
    "Compare values with ==, ~=, >, <, >=, <= and understand what true and false really are.",
    "Write if / elseif / else and get the order of the branches right.",
    "Use a ClickDetector so the player can interact with an object.",
    "Build and save LogicCube - an object that reacts differently depending on what has happened.",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 4 of 92)",
        content: `Your MagicCube from 1.3 does exactly one thing, exactly once, the moment the game starts. It cannot tell the difference between a player standing next to it and an empty island.

Today it learns to decide.

That is the entire difference between a decoration and a game. A game asks questions - *has the player got enough coins? is their health above zero? have they touched the checkpoint yet?* - and does different things depending on the answer. Every one of those questions is an \`if\`.

| After 1.3 | Result of 1.4 |
|---|---|
| Code runs top to bottom, once | Code chooses between branches |
| The cube ignores the player | The cube counts clicks and reacts |
| No numbers being tracked | A counter that changes as the game is played |

You are about to write the pattern that runs underneath shops (module 7), damage (module 8), lap timers (module 9), and quests (module 10). It is genuinely the same three lines every time: change a number, check the number, do something different depending on the answer.

**Your finish line for today:**
- A \`LogicCube\` with a Script and a ClickDetector.
- Arithmetic and an \`if / else\` in the code.
- Click it: the appearance changes and Output says something new.
- Saved as \`Lesson 1.4 - LogicCube\`.

**Do now (2 min):** open your level from 1.3 and open Output.`,
      },
      {
        title: "Why games are mostly numbers and questions",
        content: `Almost every system you will build is a number plus a question about that number.

| The number | The question | The game does |
|---|---|---|
| health | \`health <= 0\` | The player loses |
| coins | \`coins >= price\` | The purchase goes through |
| checkpointsReached | \`== total\` | Show the win screen |
| lapTime | \`< bestTime\` | New record |

Without conditions, code just runs its lines in order and stops. With conditions, code responds to what is actually happening - which is what makes something feel like a game rather than an animation.

**Do now (3 min):** find your \`MagicCube\`, or make a fresh block named \`LogicCube\`. \`Anchored = true\`, and put a Script inside it.`,
      },
      {
        title: "Arithmetic",
        content: `Maths in Luau works the way it does on paper.

\`\`\`lua
local a = 10
local b = 3

local sum = a + b      -- 13
local diff = a - b     -- 7
local product = a * b  -- 30
local quotient = a / b -- 3.333...

print(sum, diff, product, quotient)
\`\`\`

| Operator | Does | You will use it for |
|---|---|---|
| \`+\` | Add | \`score + 1\` |
| \`-\` | Subtract | \`health - damage\` |
| \`*\` | Multiply | \`price * quantity\` |
| \`/\` | Divide | \`seconds / 60\` |

**Order matters.** Multiplication and division run before addition and subtraction, exactly like in maths class. Parentheses override it:

- \`1 + 2 * 3\` is **7** - the multiply goes first.
- \`(1 + 2) * 3\` is **9** - the parentheses go first.

This is not a trivia question. A price formula like \`base + level * multiplier\` behaves completely differently from \`(base + level) * multiplier\`, and in module 7 you will balance a tycoon economy with formulas that look exactly like that. Getting one set of parentheses wrong is the difference between a shop that works and a shop where the second upgrade costs four million.

**Do now (3 min):** temporarily add \`print(2 + 2 * 5)\` and \`print((2 + 2) * 5)\`. Play, read Output - you should get 12 and 20 - then delete the lines.`,
      },
      {
        title: "Comparisons, and the true/false world",
        content: `An \`if\` needs a question that comes back either **true** or **false**. Comparison operators are how you ask.

| Operator | Asks | Example |
|---|---|---|
| \`==\` | Are these equal? | \`score == 10\` |
| \`~=\` | Are these different? | \`color ~= "Red"\` |
| \`>\` \`<\` | Greater / less than | \`coins > 5\` |
| \`>=\` \`<=\` | Greater or equal / less or equal | \`health <= 0\` |

**The one that catches everybody:** \`=\` assigns, \`==\` compares. One equals sign means "put this value in here". Two means "are these the same?". Mixing them up is the single most common beginner error in any language, and it will still catch you occasionally in five years.

\`\`\`lua
local clicks = 3
print(clicks == 3)  -- true
print(clicks > 5)   -- false
print(clicks ~= 0)  -- true
\`\`\`

That works because \`true\` and \`false\` are real values, just like numbers and text. A comparison does not do anything by itself - it just produces one of those two values. The \`if\` is what acts on it.

Note that Luau uses \`~=\` for "not equal", not \`!=\` like some other languages. If you have seen code elsewhere, this one will trip you up once.

**Do now (3 min):** make \`local clicks = 0\` and print a few comparisons. Watch Output print true and false.`,
      },
      {
        title: "if / else",
        content: `Here is the shape:

\`\`\`lua
local score = 8

if score >= 10 then
  print("Excellent")
else
  print("Try again")
end
\`\`\`

Read it out loud and it says what it does: *if* score is at least 10, *then* print Excellent, *otherwise* print Try again, *end*.

Three rules Luau will hold you to:
- \`then\` goes after the condition. Forget it and you get \`then expected\`.
- Every \`if\` closes with \`end\`. Forget it and you get \`end expected\`.
- \`else\` is optional. Sometimes you only care about one case.

That second one deserves a word. Luau does not use curly braces \`{}\`. It uses words - \`then\`, \`do\`, \`end\`. The upside is that it reads almost like English. The downside is that a missing \`end\` produces an error message pointing at the *bottom* of your file rather than the line you forgot. Indent your code properly and mismatched \`end\`s become visible instead of invisible.

**Do now (4 min):** write that if/else. Now change \`score\` to 12, Play, read Output. Change it to 3, Play again. You have just tested both branches - which is exactly what you should do to every condition you ever write.`,
      },
      {
        title: "elseif, and why order decides everything",
        content: `More than two outcomes? \`elseif\`.

\`\`\`lua
local rankScore = 15

if rankScore >= 20 then
  print("Rank S")
elseif rankScore >= 10 then
  print("Rank A")
else
  print("Rank B")
end
\`\`\`

**The crucial rule: conditions are checked top to bottom, and the first true one wins.** Everything below it is skipped entirely.

Which means order is not a style choice, it is the logic. Flip those two lines:

\`\`\`lua
if rankScore >= 10 then   -- this catches 25 as well!
  print("Rank A")
elseif rankScore >= 20 then
  print("Rank S")         -- unreachable. Nothing will ever get here.
end
\`\`\`

A score of 25 is greater than 10, so it matches the first branch and stops. Rank S becomes impossible to earn, and the game will not warn you - it is perfectly valid code that does the wrong thing.

**Strictest condition first.** Highest number at the top, working down. Remember it now and you will save yourself a genuinely confusing bug hunt in module 6 when your reward tiers all pay out the lowest amount.

**Do now (5 min):** write a three-branch check on a variable like \`energy\`, then try several values and confirm each branch is reachable. Then deliberately put them in the wrong order and watch a branch become unreachable.`,
      },
      {
        title: "ClickDetector: letting the player in",
        content: `So far your code runs and finishes. Now it needs to sit and wait for the player to do something.

1. Select \`LogicCube\`.
2. **Insert → ClickDetector**.
3. Set \`MaxActivationDistance\` to \`32\` - that is how close the player must stand.

\`\`\`lua
local part = script.Parent
local detector = part:WaitForChild("ClickDetector")
local clicks = 0

detector.MouseClick:Connect(function(player)
  clicks = clicks + 1
  print(player.Name, "clicked", clicks, "times")

  if clicks >= 3 then
    part.BrickColor = BrickColor.new("Bright green")
    print("Enough clicks")
  else
    part.BrickColor = BrickColor.new("Bright red")
    print("More clicks needed")
  end
end)
\`\`\`

Three new ideas in there, and all three come back constantly:

**\`WaitForChild("ClickDetector")\`** - "pause here until that object exists". Roblox loads a game's objects in an unpredictable order, and a script can start running before the thing it needs has appeared. WaitForChild is the polite way to handle that.

**\`:Connect(function(player) ... end)\`** - this is an *event connection*. You are handing the game a chunk of code and saying "run this every time somebody clicks". The code inside does not run now; it runs later, once per click, possibly hundreds of times. This is the pattern behind every interactive thing in Roblox.

**\`clicks = clicks + 1\`** - read the right side first. Take the current value of clicks, add one, and put the result back in clicks. It looks like a broken equation and it is not one - \`=\` here means "store", not "equals".

Notice \`clicks\` is declared *above* the function, not inside it. That is deliberate and it is the subject of the most common bug in this lesson.

**Do now (6 min):** add the ClickDetector and this code. Play, click the cube several times, and watch both the colour and Output.`,
      },
      {
        title: "The full LogicCube",
        content: `A version with three branches and a bit of showmanship. Change the numbers and colours to taste.

\`\`\`lua
local part = script.Parent
local detector = part:WaitForChild("ClickDetector")

local clicks = 0
local goal = 3
local growAmount = 0.5

detector.MouseClick:Connect(function(player)
  clicks = clicks + 1

  -- Grow the cube a little on every click
  local s = part.Size
  part.Size = Vector3.new(s.X + growAmount, s.Y + growAmount, s.Z + growAmount)

  if clicks >= goal then
    part.Material = Enum.Material.Neon
    part.BrickColor = BrickColor.new("Bright green")
    print(player.Name, "Goal reached! Clicks:", clicks)
  elseif clicks == 2 then
    part.BrickColor = BrickColor.new("Bright yellow")
    print("One click remaining")
  else
    part.BrickColor = BrickColor.new("Bright red")
    print("Current click count:", clicks)
  end
end)
\`\`\`

Play it. Red, then yellow, then green and glowing - and it grows a little each time. Three lines of feedback for a player who has done nothing but click a box three times, and it already feels like *something is happening*. That is not an accident; it is the same principle that makes the coin sounds in module 6 worth the twenty minutes they take.

Note \`goal\` and \`growAmount\` sitting at the top as named settings. Same habit as 1.3, and it makes tuning this a five-second job instead of a hunt.

If the growing cube starts misbehaving - jumping, falling through the ground - just delete the Size lines. It is decoration, not the point of the lesson.`,
      },
      {
        title: "Debounce: guarding against double fires",
        content: `Sometimes a click registers twice in a few milliseconds, and your counter jumps by 2. The standard fix is a guard variable, universally called a **debounce**:

\`\`\`lua
local busy = false

detector.MouseClick:Connect(function(player)
  if busy then
    return -- already handling a click; ignore this one
  end
  busy = true

  -- main if/else logic goes here

  task.wait(0.2)
  busy = false
end)
\`\`\`

The logic: put up a flag saying "I am dealing with this", do the work, wait a fraction of a second, take the flag down. Any click arriving in between hits the \`return\` and is dropped.

\`return\` means "leave this function immediately, skip everything below". It is one of the most useful words in programming for exactly this reason - handling the case you want to ignore first, then getting on with the real work.

Optional today. Mandatory in 5.2, when you build hazards that would otherwise kill a player six times in one touch.`,
      },
      {
        title: "Errors you will hit today",
        content: `| Symptom | Cause | Fix |
|---|---|---|
| One branch always runs, others never | Conditions in the wrong order | Strictest first: \`>= 20\` above \`>= 10\`. |
| \`then expected\` | Missing \`then\` | \`if condition then\` - the word is required. |
| \`end expected\` | A block was never closed | Every \`if\` and every \`function\` needs its \`end\`. Indent and count them. |
| \`=\` where \`==\` belongs | Assignment instead of comparison | \`==\` to compare, always. |
| Clicks do nothing | No ClickDetector, or you are in Edit mode | Add the ClickDetector and test with F5. Nothing clickable works in Edit mode. |
| The counter is always 1 | \`local clicks = 0\` is inside the function | Move it above the \`Connect\` line. |

That last one is worth understanding rather than memorising. If \`local clicks = 0\` sits inside the function, it runs *on every single click* - so the counter is created fresh, set to zero, incremented to 1, and thrown away. Declared outside, it is created once and survives between clicks.

"Where does this variable live, and how long does it last?" is a question you will ask for the rest of your programming life. This is the first time it bites.

**Do now (4 min):** swap a \`==\` for a \`=\` on purpose, Play, read the error, then put it back. Then move \`local clicks = 0\` inside the function, Play, and watch the counter refuse to go past 1. Breaking things deliberately is the cheapest way to learn to recognise them.`,
      },
      {
        title: "Check your work before you move on",
        content: `**Checklist:**
- [ ] \`LogicCube\` with a Script and a ClickDetector.
- [ ] Arithmetic in the code (\`clicks = clicks + 1\` counts).
- [ ] An \`if / else\`, ideally with an \`elseif\`.
- [ ] Appearance changes and a distinct \`print\` per branch.
- [ ] Tested in Play mode, all branches reachable.
- [ ] Saved as \`Lesson 1.4 - LogicCube\`.

| Level | What it looks like |
|---|---|
| **Done** | Arithmetic plus an if/else; the cube changes when clicked. |
| **Good** | An \`elseif\` in the right order, clearly distinct messages, tidy structure. |
| **Excellent** | Size changes tuned so they behave, and a debounce guarding the handler. |`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Writing = instead of == inside an if",
      explanation: "One equals sign stores a value; two compare values. Every programmer does this, in every language, forever.",
      correctApproach: "== to compare. If you are asking a question, use two.",
    },
    {
      mistake: "Missing then or end",
      explanation: "Luau closes blocks with words rather than braces, and the error often points at the bottom of the file rather than the line you forgot.",
      correctApproach: "Keep the pattern in your head: if [condition] then ... end. Indent your code so unmatched ends become visible.",
    },
    {
      mistake: "The click counter never goes above 1",
      explanation: "local clicks = 0 is declared inside the Connect function, so it is recreated and reset on every single click.",
      correctApproach: "Move local clicks = 0 above the Connect line, at the top of the script, so it survives between clicks.",
    },
    {
      mistake: "Clicking the cube in Edit mode and nothing happens",
      explanation: "MouseClick only fires while the game is actually running.",
      correctApproach: "Press F5 first. Interactive things only interact in Play mode.",
    },
    {
      mistake: "One branch of the elseif chain never runs",
      explanation: "A looser condition sits above a stricter one and catches the value first. The first true condition wins and everything below is skipped.",
      correctApproach: "Order strictest to loosest - >= 20 before >= 10. Then test with a value for each branch and confirm each one is reachable.",
    },
    {
      mistake: "The script cannot find the ClickDetector",
      explanation: "Either the ClickDetector is not inside LogicCube alongside the Script, or the script ran before it had loaded.",
      correctApproach: "Check both are children of LogicCube in Explorer, and use WaitForChild('ClickDetector') rather than a direct reference.",
    },
    {
      mistake: "Arithmetic but no conditions, or conditions but no arithmetic",
      explanation: "The lesson is about the two working together - a number that changes, and a question asked about it.",
      correctApproach: "Make sure your script both changes a value and branches on the result. That pairing is the point.",
    },
  ],
  summary:
    "You made an object that thinks. You can do arithmetic and you know which operations run first, you can compare values and get true or false back, and you can branch with if / elseif / else - including the trap where a loose condition placed too high makes a branch below it unreachable. You also connected your first event, so your code now waits for the player instead of running once and stopping.",
  practiceTask: {
    title: "Practice: LogicCube",
    difficulty: "beginner",
    description: `**The build:** a cube that counts clicks and looks different depending on how many it has had.

### Part A: Setup
1. Open your level from 1.3.
2. Make \`LogicCube\`, \`Anchored = true\`.
3. Put a **ClickDetector** and a **Script** inside it.
4. Open Output.

### Part B: Maths and logic
1. \`local clicks = 0\` at the top of the script - **outside** the Connect function.
2. Inside the click handler: \`clicks = clicks + 1\`.
3. An \`if / elseif / else\` on \`clicks\` that sets a different colour per branch.
4. A distinct \`print\` in every branch, so Output tells you which one ran.
5. Play, and click enough times to reach every branch.

### Part C: Save
1. No red text in Output.
2. **File → Save to Roblox** as \`Lesson 1.4 - LogicCube\`.
3. Mark the practice complete here.`,
    hints: [
      "Declare clicks outside the Connect function, or it resets to zero on every click.",
      "Get the logic right with prints alone first, then add colours. Debugging one thing at a time is much faster than debugging two.",
      "Order your elseif branches from the biggest number down, or the loose one swallows the strict one.",
      "Clicks not registering? Raise MaxActivationDistance on the ClickDetector - the player may simply be standing too far away.",
      "Stop → edit → Play. Every time.",
    ],
    optionalChallenge:
      "Add a multiplication - \`local score = clicks * 10\` - and print it alongside the click count. Then add the debounce guard from the lesson and prove it works: click as fast as you physically can and check the counter still only goes up by one each time.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Which operator adds numbers?",
        options: [
          "==",
          "+",
          "then",
          "end",
        ],
        correctAnswer: 1,
        explanation: "+ adds. It is also the workhorse of every counter you will ever write: score = score + 1.",
      },
      {
        id: "q2",
        type: MC,
        question: "What does == do?",
        options: [
          "Stores a value in a variable",
          "Divides",
          "Creates a new object",
          "Asks whether two values are equal, and returns true or false",
        ],
        correctAnswer: 3,
        explanation: "== compares and produces true or false. = stores. Two different jobs that look almost identical.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why does 2 + 2 * 5 come out as 12 rather than 20?",
        options: [
          "It is a bug in Luau",
          "The + is ignored",
          "Multiplication runs before addition",
          "Luau rounds the result",
        ],
        correctAnswer: 2,
        explanation: "Same order of operations as maths class: multiply and divide first, then add and subtract. (2 + 2) * 5 would give you 20.",
      },
      {
        id: "q4",
        type: MC,
        question: "Which is correct Luau syntax for a condition?",
        options: [
          "if clicks >= 3 then",
          "if clicks >= 3",
          "when clicks >= 3",
          "if clicks >= 3 {",
        ],
        correctAnswer: 0,
        explanation: "Luau uses the word then, not braces. Leave it out and you get a 'then expected' error.",
      },
      {
        id: "q5",
        type: MC,
        question: "What is else for?",
        options: [
          "Deleting the script",
          "Activating terrain",
          "Saving progress",
          "Running code when the if condition turned out false",
        ],
        correctAnswer: 3,
        explanation: "else is the fallback branch. It is optional - sometimes you only care about the true case.",
      },
      {
        id: "q6",
        type: MC,
        question: "When do you need elseif?",
        options: [
          "When there is only one thing to check",
          "When there are more than two possible outcomes to choose between",
          "When the object has no ClickDetector",
          "When the object is not anchored",
        ],
        correctAnswer: 1,
        explanation: "if/else gives you two outcomes. elseif lets you chain as many as you need - rank tiers, price brackets, difficulty levels.",
      },
      {
        id: "q7",
        type: MC,
        question: "Where should local clicks = 0 be declared?",
        options: [
          "Inside the click handler function",
          "In the Lighting folder",
          "At the top of the script, outside the Connect function",
          "In the object's name",
        ],
        correctAnswer: 2,
        explanation: "Inside the function it is recreated and reset on every click, so the counter never gets past 1. Outside, it is created once and survives.",
      },
      {
        id: "q8",
        type: MC,
        question: "What does a ClickDetector do?",
        options: [
          "Lets a Part respond when a player clicks it",
          "Edits terrain",
          "Replaces the server script",
          "Configures the camera",
        ],
        correctAnswer: 0,
        explanation: "It gives a Part a MouseClick event you can connect code to. Without one, a Part is not clickable at all.",
      },
      {
        id: "q9",
        type: MC,
        question: "What does ~= mean?",
        options: [
          "Equal to",
          "Not equal to",
          "Multiply",
          "Start a comment",
        ],
        correctAnswer: 1,
        explanation: "Luau writes 'not equal' as ~=, not != like some other languages. Worth remembering if you have seen code elsewhere.",
      },
      {
        id: "q10",
        type: MC,
        question: "A chain checks elseif >= 10 before if >= 20. What happens when score is 25?",
        options: [
          "It correctly prints Rank S",
          "The script crashes",
          "The object is deleted",
          "The looser condition (>= 10) wins, because the first true branch stops the chain",
        ],
        correctAnswer: 3,
        explanation: "25 is greater than 10, so that branch matches and everything below is skipped. Rank S becomes unreachable - valid code doing the wrong thing, with no warning.",
      },
      {
        id: "q11",
        type: MC,
        question: "What is clicks = clicks + 1 doing?",
        options: [
          "Taking the current value, adding one, and storing the result back",
          "Comparing clicks to 1",
          "Creating a new object",
          "Adding an image Decal",
        ],
        correctAnswer: 0,
        explanation: "Read the right side first. It looks like a broken equation but = means 'store', not 'equals'.",
      },
      {
        id: "q12",
        type: MC,
        question: "Which keyword closes an if block?",
        options: [
          "stop",
          "finish",
          "end",
          "close",
        ],
        correctAnswer: 2,
        explanation: "Luau closes blocks with end rather than a brace. Every if, every function, every loop needs one.",
      },
      {
        id: "q13",
        type: MC,
        question: "What happens if you write = instead of == inside an if?",
        options: [
          "Nothing - both work the same",
          "The account is deleted",
          "A syntax error appears in Output and the script does not run",
          "The condition is always true",
        ],
        correctAnswer: 2,
        explanation: "Luau will not accept an assignment where a condition belongs, so it errors out. Read the first red line - it points you at the line.",
      },
      {
        id: "q14",
        type: MC,
        question: "Why must a ClickDetector be tested in Play mode?",
        options: [
          "Output only works in Edit mode",
          "Click events only fire while the game is actually running",
          "The object is deleted in Play mode",
          "Conditions do not work in Edit mode",
        ],
        correctAnswer: 1,
        explanation: "Edit mode is a builder's view, not a running game. Nothing interactive interacts until you press F5.",
      },
      {
        id: "q15",
        type: MC,
        question: "What does WaitForChild(\"ClickDetector\") protect you from?",
        options: [
          "Players clicking too fast",
          "The script running before the ClickDetector has finished loading",
          "The cube falling through the ground",
          "Errors in the if condition",
        ],
        correctAnswer: 1,
        explanation: "Roblox loads objects in an unpredictable order. WaitForChild pauses until the object exists instead of erroring because it was not there yet.",
      },
    ],
  },
}

export const enLesson15 = {
  lessonId: "lesson-roblox-1-5",
  moduleId: "module-01",
  order: 5,
  title: "1.5 - Materials, Decals, and decoration",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Choose materials for walls, roof, and details that hold together as one style.",
    "Know the difference between BrickColor and Color3, and when each is the right tool.",
    "Put an image on a surface with a Decal, and a repeating pattern with a Texture.",
    "Use Neon as an accent rather than as a wall material.",
    "Save a decorated House_01 that reads as a deliberate design.",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 5 of 92)",
        content: `Four lessons in, you have a house, an island, and two cubes that do things. And the whole thing is grey plastic.

Today is the one where it starts to look like somebody built it on purpose.

This is not "decoration" as an afterthought. Materials and colour are how a player instantly understands what kind of place they are standing in - cosy or hostile, old or futuristic, safe or dangerous - before they read a single word of text. It is the cheapest storytelling tool you have, and it costs you nothing but a few minutes in the Properties panel.

| After 1.4 | Result of 1.5 |
|---|---|
| Grey default plastic everywhere | A facade with a chosen theme |
| Nothing tells the player what this place is | The style says it before any text does |
| No images anywhere in the level | A sign, a poster, or a pattern of your own |

**Your finish line for today:**
- The house has chosen materials for walls, roof, and accents.
- At least 1 Decal or Texture, somewhere you will actually see it.
- Neon used on small details only - a lamp, a sign - not on the walls.
- Saved as \`Lesson 1.5 - Decorated House\`.

**Do now (2 min):** open your house level and fly around it once at ground level, like a player arriving for the first time.`,
      },
      {
        title: "Pick a theme before you pick a colour",
        content: `The temptation here is to click through the material list and use everything that looks cool. Resist it, because that is exactly how you get a house that looks like a colour swatch chart.

Instead, decide in one sentence what this building *is*. A wooden fishing hut by the water. A brick railway station. A neon-lit noodle bar. A ruined watchtower. Then every material choice answers to that sentence, and choosing gets easy: a fishing hut does not have chrome trim, and a noodle bar does not have thatch.

**The rule that does most of the work: two or three main materials, and stick to them.** Brick and wood with a neon accent. Concrete and metal with a glass front. Constraint is what makes a design look intentional rather than random - which is true in game art, graphic design, and architecture alike.

Experienced builders do not have better taste than you. They just decide first and choose second.

**Do now (4 min):** walk around \`House_01\` and write down, in one sentence, what kind of building it is. Everything below follows from that sentence.`,
      },
      {
        title: "Materials",
        content: `Select a Part, find **Material** in Properties, pick from the list.

| Material | Looks like | Natural home |
|---|---|---|
| **Brick** | Brickwork | Walls |
| **Wood / WoodPlanks** | Timber, planking | Walls, roof, door frames |
| **Concrete** | Poured concrete | Floors, foundations |
| **Slate / Rock** | Stone | Roofing, foundations |
| **Metal** | Sheet metal | Railings, frames, industrial builds |
| **Glass** | Transparent glass | Windows |
| **Neon** | Emits light | Accents only |
| **SmoothPlastic** | Flat plastic | The default. Almost always worth replacing. |

**Material and colour are one decision, not two.** The same Brick material reads as a cosy cottage in dark red and a municipal car park in pale grey. Change one, look at the other. Roblox materials also respond to light differently, so a colour that looked right on plastic can look washed out on metal - adjust after you switch, not before.

**Do now (6 min):**
1. One material across all the walls.
2. A different one for the roof - contrast between wall and roof is what makes a building read as a building.
3. Concrete or stone for the floor or foundation.
4. Press Play and look at it in daylight from a distance.`,
      },
      {
        title: "BrickColor vs Color3",
        content: `Properties gives you two ways to set colour, and they are not redundant.

| | **BrickColor** | **Color** (Color3) |
|---|---|---|
| What it is | A fixed palette of named colours | Any colour at all, as RGB |
| Strength | Fast, memorable, hard to make ugly | Exact control over the shade |
| In code | \`BrickColor.new("Bright red")\` | \`Color3.fromRGB(255, 0, 0)\` |

BrickColor is a curated set - Roblox chose those colours and they tend to work together. Color3 gives you all sixteen million, which is more freedom and also more rope. Use BrickColor while you are finding your style; reach for Color3 when you need one specific shade to match something.

**A design tip that works everywhere, not just here: big surfaces get muted colours, small details get saturated ones.** Walls in a soft, low-intensity tone; window frames, the sign, the door in something punchy. It is why real buildings have a bright red door and not bright red walls. Invert that ratio and the whole thing becomes exhausting to look at.

For today you can set everything by hand in Properties. You need code only when a colour has to change *during* the game - which you already did in 1.3 and 1.4.

**Do now (4 min):** choose wall and roof colours, then make the window and door frames noticeably more contrasting than the walls.`,
      },
      {
        title: "Neon: accent, not wall",
        content: `**Neon** makes a Part glow. It is spectacular, especially at night, and it is the single most over-used material by beginners.

The reason is worth understanding. A glow only reads as a glow if there is something dark next to it. Make everything Neon and your eye has no reference point, so nothing looks bright any more - it just looks flat and loud. Contrast is what creates the effect, and contrast requires restraint.

**Good places for Neon:**
- A sign above the door.
- Small lamps flanking the entrance.
- A strip of light along a window.
- Your MagicCube or LogicCube from the last two lessons.

**Bad place for Neon:** the walls.

**Do now (5 min):** add 1-3 small neon details, keeping the main facade wood, brick, or concrete. Then fly the camera far back and check: is the accent noticeable without dominating the whole island?`,
      },
      {
        title: "Decal: putting an image on a surface",
        content: `A **Decal** is an image stuck to **one face** of a Part - a poster, a logo, a house number, a sign.

1. Select the Part you want it on. A thin panel above the door works well.
2. **Insert → Decal**.
3. In the Decal's Properties, find the **Texture** field and paste an asset link (\`rbxassetid://...\`). Get one from **Toolbox → Images**.
4. **Face** controls which side of the Part the image lands on - Front, Back, Top, and so on.

**If your Decal seems invisible, it is almost certainly on the wrong Face.** It is not missing, it is on the back of the panel, facing the wall. Cycle through the Face options and it will appear. This is the single most common Decal problem and it takes five seconds to fix once you know.

**Ideas:** the name of your cafe, a house number, an arrow pointing to the beach, curtains painted onto the inside of a window.

**Do now (6 min):** make a thin Part above the entrance, name it \`Sign_Board\`, and put a Decal on it. Press Play and walk up to the house - can you read the sign from where a player would stand? If not, make it bigger. Signs are for players, not for screenshots taken from two studs away.`,
      },
      {
        title: "Texture: a pattern that repeats",
        content: `A **Texture** works like a Decal, except the image **tiles** across the whole surface instead of being placed once. Tiles, brickwork, wallpaper, paving stones.

The choice is simple:
- **Decal** for one image in one place - a logo, a poster, a sign.
- **Texture** for a pattern that should cover an area - a floor, a path, a wall.

\`StudsPerTileU\` and \`StudsPerTileV\` control how big each repetition is. Small numbers mean a dense pattern; large numbers stretch it out. Get this wrong and paving stones end up either the size of postage stamps or the size of cars.

One or the other is enough for today's task.

**Do now (4 min, optional):** put a Texture on the porch floor and tune StudsPerTile until the scale looks right next to your character.`,
      },
      {
        title: "Windows and doors, without touching the geometry",
        content: `You cut those openings in 1.1. Today you frame them - and you do it with ordinary Parts, not with Union.

**This matters: do not re-run Negate/Union on walls that already have openings in them.** CSG operations stack, and a second pass on an already-unioned wall is the most reliable way to produce a wall with mysterious holes, missing faces, or geometry that vanishes at certain camera angles. Every improvement below is achievable with plain blocks sitting *next to* the opening.

Things that make an opening look finished:
- Thin blocks around the window edge as a frame - wood or metal.
- A window sill: one flat block along the bottom edge, sticking out slightly.
- A Decal of curtains on the inside face.
- Two or three narrow blocks around the door to make a proper frame.

The door does not need to open yet. It needs to look like somewhere a person would walk in.

**Do now (6 min):** frame at least one window and the doorway. Press Play and approach on foot. Does it read as an entrance?`,
      },
      {
        title: "Give it a design review",
        content: `Look at your house the way you would look at somebody else's, and ask six questions.

1. **Materials** - do the roof and walls differ, and does the difference make sense?
2. **Style** - does it look like a chosen palette, or a rainbow of everything you clicked?
3. **Accents** - only a few neon details, or is the whole house glowing?
4. **Image** - is there at least one Decal or Texture, somewhere a player will see it?
5. **Order** - do the new parts have real names in Explorer (\`Sign_Board\`, \`Lamp_Left\`) or are they \`Part\`, \`Part1\`, \`Part2\`?
6. **Physics** - press Play. Does anything fall off? Every new decoration needs \`Anchored = true\`.

**Do now (4 min):** run all six. Then take a screenshot from the beach side - you will want it for the module portfolio in 1.8, and later for the real one in 12.5.`,
      },
      {
        title: "Save, and what is coming",
        content: `**File → Save to Roblox** → \`Lesson 1.5 - Decorated House\`.

Next lesson is lighting, atmosphere, and sound - and this is where today's restraint pays off. A house with three neon accents becomes genuinely dramatic once you turn the sun down and let those accents be the only light source. A house that is entirely neon just becomes a bright blob at any time of day.

**Checklist:**
- [ ] Wall and roof materials chosen and different.
- [ ] Colours that belong to one palette.
- [ ] At least 1 Decal or Texture.
- [ ] Neon on accents only.
- [ ] Every new part \`Anchored = true\`.
- [ ] Saved with the correct name.

| Level | What it looks like |
|---|---|
| **Done** | Consistent materials, at least one image, saved. |
| **Good** | Framed windows and entrance, a couple of neon accents, everything sensibly named. |
| **Excellent** | Someone could look at a screenshot and tell you what kind of building it is without you saying a word. |`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Neon on every wall",
      explanation: "A glow only reads as a glow next to something dark. Make it all glow and nothing looks bright - it just looks flat and loud.",
      correctApproach: "Brick or wood for the walls, Neon on one to three small details. Contrast is what creates the effect.",
    },
    {
      mistake: "The Decal is invisible",
      explanation: "Almost always the Face property - the image is on the back of the panel, pointing into the wall.",
      correctApproach: "Cycle through the Face options in Properties until it appears, or rotate the Part.",
    },
    {
      mistake: "The Decal's Texture field is empty",
      explanation: "The Decal object exists but has no image assigned, so it renders nothing.",
      correctApproach: "Copy an rbxassetid from Toolbox → Images and paste it into the Decal's Texture field.",
    },
    {
      mistake: "Re-cutting finished windows with Union to improve them",
      explanation: "CSG operations stack. A second Union on an already-unioned wall regularly produces missing faces or geometry that disappears from certain angles.",
      correctApproach: "Build frames and sills from plain blocks placed around the opening. Never touch the wall geometry again.",
    },
    {
      mistake: "Decorations fall off when you press Play",
      explanation: "New parts default to Anchored = false, and Roblox physics does the rest.",
      correctApproach: "Select every new frame, sign, and lamp and set Anchored = true.",
    },
    {
      mistake: "Every surface a different material",
      explanation: "Without a limited palette the facade reads as random rather than designed, no matter how good the individual materials look.",
      correctApproach: "Decide what the building is in one sentence, then pick two or three materials that serve it.",
    },
    {
      mistake: "The colour looks wrong after changing the material",
      explanation: "Materials respond to light differently, so the same colour value looks different on plastic than on metal or brick.",
      correctApproach: "Change the material first, then adjust the colour to suit it. Not the other way around.",
    },
    {
      mistake: "The sign is unreadable from where a player stands",
      explanation: "It was sized while the camera was two studs away from it.",
      correctApproach: "Press Play, walk up to the house on foot, and size the sign from that distance.",
    },
  ],
  summary:
    "You gave the house a point of view. You chose a theme first and let it drive the materials, learned why a limited palette reads as design and an unlimited one reads as noise, used Neon as an accent rather than a wall, and put your own image into the world with a Decal. The level is now ready for lighting and sound - which is where those accents earn their keep.",
  practiceTask: {
    title: "Practice: Decorating the facade",
    difficulty: "beginner",
    description: `**The build:** House_01 with a coherent facade style and at least one image of your own.

### Part A: Theme, materials, colour
1. Open your level with the house and island.
2. Decide in one sentence what this building is - forest cabin, roadside cafe, watchtower, whatever you like.
3. Set materials and colours for walls, roof, and floor so they serve that sentence. Two or three materials, no more.
4. Press Play and look at the house from the beach.

### Part B: Details and images
1. Make a thin Part above the door named \`Sign_Board\` and put a **Decal** on it (or use a **Texture** on the porch floor).
2. Frame at least one window and the doorway using plain blocks - **not** Union.
3. Add 1-3 neon accents: a lamp, a sign edge, a strip of light.
4. Every new part: \`Anchored = true\`, and a real name in Explorer.

### Part C: Review and save
1. Run the six-question design review from the lesson.
2. **File → Save to Roblox** as \`Lesson 1.5 - Decorated House\`.
3. Mark the practice complete here.`,
    hints: [
      "Theme first, materials second. Choosing gets dramatically easier once you know what the building is.",
      "Decal invisible? It is the Face property nine times out of ten - the image is pointing into the wall.",
      "Neon on small things only. The glow needs something dark beside it to read as a glow at all.",
      "Never re-Union a wall that already has an opening in it. Build frames from separate blocks instead.",
      "Name things as you make them - Sign_Board, Lamp_Left. Module 11 has an entire lesson about auditing Explorer, and you can save yourself from it right now.",
    ],
    optionalChallenge:
      "Screenshot the facade twice: once in daylight, once with the lighting turned down so only your neon accents show. If the second shot still reads as the same building - same shape, same character, just lit differently - your design is working. If it turns into an unrecognisable blob of light, you have too much Neon, and now you know before lesson 1.6 rather than after it.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What does the Material property change?",
        options: [
          "The script type",
          "The Studio interface language",
          "How an object's surface looks and reacts to light",
          "The island size when generating",
        ],
        correctAnswer: 2,
        explanation: "Material controls the surface itself - and because different materials respond to light differently, it also changes how a given colour reads.",
      },
      {
        id: "q2",
        type: MC,
        question: "Which material suits the main walls of a house?",
        options: [
          "Neon on every wall",
          "Brick or Wood",
          "ForceField",
          "Air",
        ],
        correctAnswer: 1,
        explanation: "Brick and Wood read as real building materials. Neon belongs on small accents, where it has something dark to contrast against.",
      },
      {
        id: "q3",
        type: MC,
        question: "What is BrickColor good for?",
        options: [
          "Removing terrain",
          "Creating a ClickDetector",
          "Replacing scripts",
          "A curated palette of named colours that tend to work together",
        ],
        correctAnswer: 3,
        explanation: "BrickColor is a fixed set Roblox chose. Fast to use, and hard to make something ugly with.",
      },
      {
        id: "q4",
        type: MC,
        question: "When would you use Color (Color3) instead of BrickColor?",
        options: [
          "When you need one exact shade that the named palette does not contain",
          "When generating an island",
          "When using Union",
          "When closing the Output panel",
        ],
        correctAnswer: 0,
        explanation: "Color3 gives you every RGB value - more control, and more rope. Reach for it when you need to match a specific shade.",
      },
      {
        id: "q5",
        type: MC,
        question: "How should Neon be used on a facade?",
        options: [
          "As the main wall material",
          "On small accents only - a sign, a lamp, a light strip",
          "Instead of Anchored",
          "As a camera type",
        ],
        correctAnswer: 1,
        explanation: "A glow needs darkness beside it. Cover everything in Neon and nothing looks bright any more, because there is no contrast left.",
      },
      {
        id: "q6",
        type: MC,
        question: "What is a Decal?",
        options: [
          "A terrain-cutting tool",
          "A type of remote event",
          "An empty level template",
          "An image applied to one face of a Part",
        ],
        correctAnswer: 3,
        explanation: "One image, one face. Posters, logos, signs, house numbers.",
      },
      {
        id: "q7",
        type: MC,
        question: "Your Decal does not appear. What do you check first?",
        options: [
          "The Face property, and whether the Texture field has a link in it",
          "Whether Workspace was deleted",
          "The interface language",
          "Whether Snap to Grid is on",
        ],
        correctAnswer: 0,
        explanation: "Nine times out of ten it is on the wrong Face - present, but pointing into the wall. Cycle through the Face options.",
      },
      {
        id: "q8",
        type: MC,
        question: "When is Texture the better choice over Decal?",
        options: [
          "Handling mouse clicks",
          "Generating islands",
          "When you need a pattern to repeat across a whole surface",
          "Writing modular scripts",
        ],
        correctAnswer: 2,
        explanation: "Texture tiles; Decal places once. Paving, tiles, and wallpaper are Texture jobs - and StudsPerTileU/V control how big each tile is.",
      },
      {
        id: "q9",
        type: MC,
        question: "What must every new decorative Part have before you press Play?",
        options: [
          "Negate applied",
          "The house deleted",
          "Explorer closed",
          "Anchored = true",
        ],
        correctAnswer: 3,
        explanation: "New Parts are unanchored by default, and Roblox physics will find them the moment the game starts.",
      },
      {
        id: "q10",
        type: MC,
        question: "Why should you not re-Union a wall that already has a window cut into it?",
        options: [
          "CSG operations stack, and a second pass often produces missing faces or geometry that vanishes at some angles",
          "Union is banned in Roblox",
          "Decals stop working afterwards",
          "Studio deletes the terrain",
        ],
        correctAnswer: 0,
        explanation: "Build frames and sills from plain blocks placed around the opening instead. Once a wall is cut, leave its geometry alone.",
      },
      {
        id: "q11",
        type: MC,
        question: "What is the minimum image requirement for this lesson?",
        options: [
          "50 premade models",
          "At least one Decal or Texture",
          "No images at all",
          "Change only the sky",
        ],
        correctAnswer: 1,
        explanation: "One image, placed somewhere a player will actually see it.",
      },
      {
        id: "q12",
        type: MC,
        question: "What makes a facade look cohesive rather than random?",
        options: [
          "Every part gets a different material",
          "Everything is plastic",
          "Two or three materials serving one clear idea of what the building is",
          "The house has no roof",
        ],
        correctAnswer: 2,
        explanation: "Constraint is what reads as intentional. Decide what the building is in one sentence, then let that sentence pick the materials.",
      },
      {
        id: "q13",
        type: MC,
        question: "Your Decal image is stretched out of shape. What fixes it?",
        options: [
          "Resize the Part with Scale so its proportions match the image",
          "Delete the account",
          "Write a Script",
          "Find a different image",
        ],
        correctAnswer: 0,
        explanation: "A Decal stretches to fill its face, so a square image on a long thin Part will distort. Change the Part, not the image.",
      },
      {
        id: "q14",
        type: MC,
        question: "Which is a good name for the sign Part in Explorer?",
        options: [
          "Part",
          "asdf",
          "Union",
          "Sign_Board",
        ],
        correctAnswer: 3,
        explanation: "Names are free now and expensive later. Module 11 has a whole lesson on cleaning up an Explorer tree that got away from someone.",
      },
      {
        id: "q15",
        type: MC,
        question: "Why decide on a theme before choosing materials?",
        options: [
          "Roblox requires a theme field",
          "Because it turns an open-ended aesthetic choice into a simple yes/no question for each material",
          "Because Decals only work on themed buildings",
          "It does not matter",
        ],
        correctAnswer: 1,
        explanation: "'Does a fishing hut have chrome trim?' is easy to answer. 'What material should this wall be?' is not. Deciding first is why experienced builders seem to choose faster.",
      },
    ],
  },
}

export const enLesson16 = {
  lessonId: "lesson-roblox-1-6",
  moduleId: "module-01",
  order: 6,
  title: "1.6 - Lighting, Atmosphere, and Sound",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Set the time of day with ClockTime and control overall light with Brightness.",
    "Add fog with Atmosphere and a glow with Bloom, without drowning the level in either.",
    "Tell ambient audio apart from sound effects, and mix them so both can be heard.",
    "Build two genuinely different moods - morning and night - from the same geometry.",
    "Save a level that has an atmosphere, not just objects.",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 6 of 92)",
        content: `Here is something worth knowing early: **lighting and sound will change how your level feels more than another hour of building ever will.**

You have a decorated house on an island. Today you do not add a single new object to it - and by the end of the hour it will feel like a completely different place. Twice, in fact: once as a bright morning, once as a night scene where your neon sign is the only thing burning.

This is the closest thing to a cheat code in game development. Film crews have known it for a century, which is why they spend more on lighting than on sets. Same room, different light, different film.

| After 1.5 | Result of 1.6 |
|---|---|
| Flat default daylight, total silence | A time of day you chose, with air and sound in it |
| One mood: none | Two moods, from the same build |
| Neon accents that are just bright | Neon accents that light the scene at night |

**Your finish line for today:**
- **Lighting** and **Atmosphere** configured.
- Two presets - **morning** and **night** - you can switch between with ClockTime.
- Ambient audio, plus at least one sound effect.
- Playtested from house to beach in both moods.
- Saved as \`Lesson 1.6 - Island Atmosphere\`.

**Do now (3 min):** open your level from 1.5, press Play, and walk from the door to the water. Pay attention to how it looks and how it sounds right now - because in an hour you want to be able to feel the difference.`,
      },
      {
        title: "What atmosphere is actually made of",
        content: `Three ingredients, and they are worth separating in your head because they are tuned in different places:

1. **Light** - time of day, how bright the sun is, whether things cast shadows.
2. **Air** - fog, haze, the colour of the horizon. This is what gives a scene *depth*, because distant things go hazy and near things do not.
3. **Sound** - the continuous background, and the short sounds that punctuate it.

Silence is the one people forget. A perfectly lit level with no sound feels like a screenshot you can walk around in. Add wind and waves and the same level suddenly feels like it exists whether you are there or not.

That is the real trick behind all three: they make the world feel like it does not need the player. Everything you build up to lesson 92 is more convincing when the world was already running before the player arrived.`,
      },
      {
        title: "Lighting: time, brightness, shadow",
        content: `Find **Lighting** in Explorer. It sits at the top level, not inside Workspace - it is a service, a global setting for the whole place, not an object in the world.

| Property | What it does | Where to start |
|---|---|---|
| **ClockTime** | Time of day, 0-24 | Morning \`8\`-\`10\`; night \`0\`-\`2\` |
| **Brightness** | How strong the sun/moon is | Day \`2\`-\`3\`; night lower, never \`0\` |
| **GlobalShadows** | Objects cast real shadows | \`true\` |
| **OutdoorAmbient** | The colour of shadowed areas | Slightly blue in the morning, warm in the evening |
| **Ambient** | Overall fill light | Moderate - too much washes out your 1.5 materials |

**GlobalShadows deserves special attention.** Shadows are what tell your eye that objects have volume and sit *on* the ground rather than floating above it. Turn them off and everything flattens out. It is the single highest-impact tickbox in this panel.

**And OutdoorAmbient is the one most people never touch.** Shadows are not black in real life - they are lit by the sky, which is why shadows outdoors are slightly blue. Set OutdoorAmbient to a dim blue and your morning scene immediately looks like morning rather than like a scene with the lights turned down.

**Do now (6 min):**
1. Morning: ClockTime \`9\`, Brightness \`2.5\`, GlobalShadows on.
2. Now drag ClockTime slowly from 9 down to 0.5 and watch the island change. That slider is the most fun control in Studio.
3. At night, check your Neon parts from 1.5. They should still be clearly visible - that is them doing their job.`,
      },
      {
        title: "Atmosphere: putting air in the world",
        content: `If there is no **Atmosphere** object under Lighting: right-click **Lighting** → Insert Object → **Atmosphere**.

| Property | Does | Start with |
|---|---|---|
| **Density** | How thick the haze is | \`0.25\`-\`0.4\` |
| **Offset** | Pushes the fog nearer or further | \`0.25\` |
| **Color** | The colour of the haze | Match the time of day |

Fog is not just weather. It is **depth**. Without it, a hill 500 studs away is rendered exactly as sharply as the wall in front of you, and your brain reads the whole scene as flat. Add a little haze and suddenly distance exists.

**Do not overdo Density.** Past about \`0.5\` you cannot see your own house, and there is a particular kind of frustration in spending an hour on a facade and then hiding it in soup. Small values do more than you expect.

**Do now (4 min):** add Atmosphere, set Density to \`0.3\`. Then swing ClockTime between morning and night and watch how differently the same fog reads at each - this is why you tune atmosphere and lighting together, never separately.`,
      },
      {
        title: "Bloom: making light bleed",
        content: `**Bloom** makes bright things glow softly outward, the way a real bright light does when you look at it.

1. Right-click **Lighting** → Insert Object → **BloomEffect**.
2. Keep Intensity low. If the screen goes white, you have gone too far - and you will go too far the first time, because bloom is very satisfying to crank up.
3. Judge it at night (ClockTime \`0.5\`), when there is darkness for the glow to bleed into.

The failure mode is worth naming: bloom applied to everything makes the whole image hazy and low-contrast, which reads as "cheap" rather than "atmospheric". Bloom applied to two neon signs in a dark scene reads as expensive. Same effect, different restraint - the same lesson as Neon in 1.5, arriving from a different direction.

**Do now (4 min):** add Bloom and tune it until your sign glows and the rest of the scene stays readable.`,
      },
      {
        title: "The two kinds of sound",
        content: `Game audio splits cleanly in two, and the split determines every setting.

| Type | Sounds like | Lives in | Looped |
|---|---|---|---|
| **Ambient** | Waves, wind, forest, city hum | Workspace or SoundService | **true** |
| **SFX** | A click, a creak, a coin, a thud | Inside a specific Part | **false** |

**Ambient is continuous and quiet. SFX are brief and clear.**

The volume relationship matters more than either volume alone. Ambient at \`0.25\`-\`0.45\` leaves acoustic room for effects to cut through. Ambient at \`1.0\` means the player literally cannot hear the coin they just collected, and the game feels unresponsive for a reason they will never be able to name.

Mixing is not an afterthought. When something in your game feels mushy or unsatisfying later in the course, the ambient track being too loud is a genuinely common cause.

**Do now (2 min):** decide what your island sounds like. Waves for a house by the water. Wind if the hill is high. Birds if it is a forest.`,
      },
      {
        title: "Adding ambient audio",
        content: `1. Right-click **Workspace** → Insert Object → **Sound**.
2. Name it \`Ambient_Waves\`.
3. Find audio in **Toolbox → Audio**, copy its ID, paste it into **SoundId**.
4. Tick **Looped** and **Playing**.
5. **Volume** \`0.35\`.

The \`Ambient_\` prefix is not decoration. By module 11 you will have a dozen sounds and an entire lesson dedicated to auditing your Explorer tree - and \`Ambient_Waves\`, \`SFX_Click\`, \`SFX_Coin\` sort themselves into groups automatically, while \`Sound\`, \`Sound1\`, \`Sound3\` do not.

**Do now (5 min):** add the ambient sound and walk the island in Play mode. Too loud? Drop the volume. Stops after one play? Looped is off.`,
      },
      {
        title: "Adding a sound effect",
        content: `1. Select an interactive Part - your \`LogicCube\` from 1.4 is ideal.
2. Insert a **Sound** inside it, named \`SFX_Click\`.
3. A short sound in **SoundId**, **Looped** off, Volume \`0.5\`.
4. Set **RollOffMaxDistance** to about \`60\`, so it is not audible from the far side of the island.

That last one is what makes a sound feel like it belongs to an object rather than to the whole world. Sounds parented to a Part are positional - they get quieter with distance and they come from the right direction. It is nearly free and it does a lot of work.

Now play it on click, inside the handler you wrote in 1.4:

\`\`\`lua
local part = script.Parent
local sound = part:FindFirstChild("SFX_Click")

if sound then
  sound:Play()
  print("Sound played")
else
  print("Sound not found")
end
\`\`\`

**Why \`FindFirstChild\` and not \`WaitForChild\` here?** They handle a missing object differently, and the difference is the point.
- \`WaitForChild\` stops and waits. Right when you *must* have the object and the script cannot go on without it.
- \`FindFirstChild\` returns \`nil\` immediately. Right when the object is optional.

A missing sound should not freeze your cube. So you ask nicely, get \`nil\` if it is not there, and the \`if sound then\` guard keeps everything running. That pattern - check before you use - is how you write code that degrades gracefully instead of exploding.

**Do now (6 min):** add the sound, wire up the code, and click the cube in Play mode.`,
      },
      {
        title: "Your two presets",
        content: `Write these down somewhere - you are building two looks, not one, and you want to be able to flip between them on demand.

| | Morning | Night |
|---|---|---|
| ClockTime | \`9\` | \`0.5\` |
| Brightness | Higher | Lower - but the path stays visible |
| Atmosphere.Color | Lighter, slightly blue | Cooler and deeper |
| Ambient sound | Waves, birds | Quieter wind, night loop |
| Neon | A detail | The main light source |

Notice the last row. In daylight your neon sign is a small nice touch. At night it becomes the thing lighting the entrance, and suddenly the restraint you showed in 1.5 pays off - the accents have something to do.

In 1.7 you will write code that switches between these presets automatically. Today you are just proving both of them look good.`,
      },
      {
        title: "The order to do it in",
        content: `1. Set up **morning** - ClockTime, Brightness, shadows.
2. Add **Atmosphere**, tune the fog against that light.
3. Add subtle **Bloom**.
4. Add **ambient** audio, then **SFX**.
5. Switch to **night** and check the scene still works - path visible, neon glowing, nothing pitch black.
6. Playtest both, then save.

Light before sound, and both before you decide anything is finished. Tuning audio against lighting you are about to change is wasted work.

**Do now (4 min):** run the sequence end to end. If night is too dark to navigate, nudge Brightness or OutdoorAmbient up - "dark" and "unplayable" are different things.`,
      },
      {
        title: "When it goes wrong",
        content: `| Problem | Cause | Fix |
|---|---|---|
| No sound at all | SoundId empty, or Volume 0 | Paste a real ID from Toolbox; check the volume |
| Ambient plays once, then silence | Looped is off | Tick Looped |
| The screen is white and washed out | Bloom or Brightness too high | Bring both down; judge at night |
| You cannot see anything at night | Brightness at or near 0 | Raise Brightness or OutdoorAmbient - dark, not blind |
| The fog ate your house | Atmosphere Density too high | Back down to 0.25-0.35 |
| Sound is audible across the whole island | RollOffMaxDistance too large | Around 60 for a small object sound |`,
      },
      {
        title: "Check your work before you move on",
        content: `**Checklist:**
- [ ] ClockTime switches between a morning and a night look.
- [ ] Atmosphere is present and the fog does not hide the level.
- [ ] Ambient audio loops during Play.
- [ ] At least one SFX plays on interaction.
- [ ] Both modes tested on foot.
- [ ] Saved as \`Lesson 1.6 - Island Atmosphere\`.

| Level | What it looks like |
|---|---|
| **Done** | Morning and night, Atmosphere, ambient audio, one SFX, saved. |
| **Good** | The mix is balanced and the facade still reads clearly at night. |
| **Excellent** | Two ambient tracks, restrained Bloom, and every Sound named with an \`Ambient_\` or \`SFX_\` prefix. |`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Ambient audio at full volume",
      explanation: "It drowns everything else, so the click, the coin, and the footstep all vanish - and the game feels unresponsive for a reason the player cannot identify.",
      correctApproach: "Ambient 0.25-0.45, SFX louder. The relationship between the two matters more than either number alone.",
    },
    {
      mistake: "SoundId left empty",
      explanation: "The Sound object exists but points at no audio, so it plays nothing and reports no error.",
      correctApproach: "Find audio in Toolbox → Audio, copy the ID, paste it into SoundId.",
    },
    {
      mistake: "Night is so dark the level is unplayable",
      explanation: "Brightness was taken to zero. Atmospheric and unnavigable are not the same thing.",
      correctApproach: "Raise Brightness or OutdoorAmbient slightly, and use your Neon parts to light the route. A player should always be able to find their way.",
    },
    {
      mistake: "Fog completely hides the island",
      explanation: "Atmosphere Density is above 0.5.",
      correctApproach: "0.25 to 0.4. Fog should suggest distance, not erase it.",
    },
    {
      mistake: "Testing sound and lighting in Edit mode",
      explanation: "Several audio and lighting behaviours only run properly while the game is running.",
      correctApproach: "F5 for everything in this lesson. Judge it from where the player stands.",
    },
    {
      mistake: "Ambient audio plays once and stops",
      explanation: "Looped was never enabled.",
      correctApproach: "Tick Looped on the Sound. Ambient is by definition continuous.",
    },
    {
      mistake: "Bloom cranked up until the scene glows all over",
      explanation: "Bloom on everything reads as a hazy, low-contrast image rather than an atmospheric one.",
      correctApproach: "Low Intensity, judged at night, so the glow has darkness to bleed into. Same restraint rule as Neon in 1.5.",
    },
  ],
  summary:
    "You changed how the level feels without adding a single object. You set the time of day, put shadows and haze into the world so it stopped looking flat, added a glow that makes bright things read as bright, and gave the island a sound of its own plus an effect that responds to the player. You also met FindFirstChild and the difference between asking for something and waiting for it - a distinction that comes back constantly.",
  practiceTask: {
    title: "Practice: Island atmosphere",
    difficulty: "beginner",
    description: `**The build:** two moods, morning and night, plus a soundscape.

### Part A: Light and air
1. Open your level from 1.5.
2. In **Lighting**: morning ClockTime, a suitable Brightness, **GlobalShadows** on.
3. Add **Atmosphere** with Density around 0.3, and set its Color to suit the light.
4. Write down your night ClockTime, switch to it, and check the level still reads.

### Part B: Sound
1. \`Ambient_Waves\` in Workspace: Looped on, Volume about 0.35.
2. \`SFX_Click\` inside \`LogicCube\`: Looped off, RollOffMaxDistance about 60.
3. Add the \`FindFirstChild\` + \`sound:Play()\` block to the cube's click handler.
4. Play, walk the island, and listen to the balance between the two.

### Part C: Finish and save
1. No red errors in Output.
2. **File → Save to Roblox** as \`Lesson 1.6 - Island Atmosphere\`.
3. Mark the practice complete here.`,
    hints: [
      "Light first, sound second. Tuning audio against lighting you are about to change wastes the work.",
      "Ambient always quieter than SFX. If you can hear the waves clearly over the click, the waves are too loud.",
      "Fog density is one of those settings where a small number does a lot. Start at 0.3 and adjust in small steps.",
      "Turn ClockTime down slowly rather than jumping to 0. Watching the transition tells you far more than looking at two endpoints.",
      "Prefix your sounds: Ambient_, SFX_. You will have a dozen of them by module 11.",
    ],
    optionalChallenge:
      "Build two complete ambient beds - a daytime one and a night one - and write down every setting for both. In 1.7 you will write the script that crossfades between them automatically, and having the numbers ready turns that into a ten-minute job instead of an hour of re-tuning.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What does ClockTime control?",
        options: [
          "The time of day in the level, from 0 to 24",
          "Sound volume",
          "Object size",
          "The script type",
        ],
        correctAnswer: 0,
        explanation: "It is the sun and moon position. Dragging it slowly is the fastest way to see how much lighting changes a scene.",
      },
      {
        id: "q2",
        type: MC,
        question: "What does Atmosphere's Density affect?",
        options: [
          "Running speed",
          "The number of windows",
          "Click detection range",
          "How thick the haze in the air is",
        ],
        correctAnswer: 3,
        explanation: "Haze is what creates a sense of distance. Without it, a hill 500 studs away is as sharp as the wall in front of you and the scene reads as flat.",
      },
      {
        id: "q3",
        type: MC,
        question: "How should ambient audio be configured?",
        options: [
          "Looped = false, Volume = 1",
          "Looped = true, and a low volume",
          "Only inside Terrain",
          "Instead of a ClickDetector",
        ],
        correctAnswer: 1,
        explanation: "Continuous and quiet. It has to leave acoustic room for the short sounds to cut through.",
      },
      {
        id: "q4",
        type: MC,
        question: "What is an SFX?",
        options: [
          "A database",
          "A camera type",
          "A short sound triggered by an action - a click, a coin, a thud",
          "An empty level template",
        ],
        correctAnswer: 2,
        explanation: "Brief, not looped, and usually parented to the Part that produces it so it comes from the right direction.",
      },
      {
        id: "q5",
        type: MC,
        question: "Why check your night lighting in Play mode specifically?",
        options: [
          "ClockTime only works in Edit mode",
          "Fog disappears in Play mode",
          "Saving is unavailable at night",
          "To confirm a player standing on the ground can actually find their way",
        ],
        correctAnswer: 3,
        explanation: "A scene that looks moody from a flying camera can be completely unnavigable at eye level. Atmospheric and unplayable are different things.",
      },
      {
        id: "q6",
        type: MC,
        question: "Ambient audio plays once and stops. Which property?",
        options: [
          "Looped",
          "Anchored",
          "Union",
          "Snap to Grid",
        ],
        correctAnswer: 0,
        explanation: "Looped makes it repeat forever, which is what 'ambient' means.",
      },
      {
        id: "q7",
        type: MC,
        question: "How should Bloom be used?",
        options: [
          "At maximum, on everything",
          "As a replacement for Atmosphere",
          "Subtly, so bright objects glow while the rest of the scene stays readable",
          "To replace sound",
        ],
        correctAnswer: 2,
        explanation: "Bloom on everything reads as a hazy, low-contrast image. Bloom on two neon signs in a dark scene reads as expensive.",
      },
      {
        id: "q8",
        type: MC,
        question: "What does sound:Play() do?",
        options: [
          "Generates terrain",
          "Starts playback of that sound",
          "Creates a Folder",
          "Deletes Lighting",
        ],
        correctAnswer: 1,
        explanation: "It plays the Sound object it is called on - which is why the sound has to be found first.",
      },
      {
        id: "q9",
        type: MC,
        question: "Why not set ambient volume to 1.0?",
        options: [
          "Values above 0.5 are not allowed",
          "It masks every sound effect, so the game feels unresponsive without the player knowing why",
          "Time of day stops working",
          "Decals disappear",
        ],
        correctAnswer: 1,
        explanation: "Mixing is the relationship between the two levels, not either one on its own. A too-loud ambient bed is a genuinely common cause of a game feeling mushy.",
      },
      {
        id: "q10",
        type: MC,
        question: "What is OutdoorAmbient for?",
        options: [
          "Cutting openings in walls",
          "Cloud saving",
          "The colour that lights shadowed areas",
          "Opening the Toolbox",
        ],
        correctAnswer: 2,
        explanation: "Real shadows are lit by the sky, which is why outdoor shadows are slightly blue. Set this and a morning scene starts looking like morning.",
      },
      {
        id: "q11",
        type: MC,
        question: "Which order works best?",
        options: [
          "Lighting → Atmosphere → Sound → Test",
          "Five ambient tracks → then set the time",
          "Bloom to maximum → save without testing",
          "Write the party script before touching the lighting",
        ],
        correctAnswer: 0,
        explanation: "Visual first, audio second. Tuning sound against lighting you are about to change means doing it twice.",
      },
      {
        id: "q12",
        type: MC,
        question: "The screen is white and washed out. What do you reduce?",
        options: [
          "ClockTime",
          "The volume",
          "Nothing - that is correct",
          "Bloom or Brightness",
        ],
        correctAnswer: 3,
        explanation: "Both push the image toward white. Turn them down and judge the result at night, where the glow has darkness to work against.",
      },
      {
        id: "q13",
        type: MC,
        question: "Why use FindFirstChild(\"SFX_Click\") rather than WaitForChild here?",
        options: [
          "It generates terrain",
          "It opens the plugin list",
          "It returns nil instead of waiting, so a missing optional sound does not freeze the script",
          "It changes the interface language",
        ],
        correctAnswer: 2,
        explanation: "WaitForChild stops and waits - right when you must have the object. FindFirstChild asks and moves on - right when the object is optional. The if guard handles the nil.",
      },
      {
        id: "q14",
        type: MC,
        question: "What does GlobalShadows = true give you?",
        options: [
          "Free assets",
          "Real cast shadows, which tell your eye that objects have volume and sit on the ground",
          "Automatic Decals",
          "Sound disabled",
        ],
        correctAnswer: 1,
        explanation: "Without shadows everything flattens out and objects look like they are hovering. It is the highest-impact single tickbox in the Lighting panel.",
      },
      {
        id: "q15",
        type: MC,
        question: "What does RollOffMaxDistance control on a Sound?",
        options: [
          "How far away the sound can still be heard",
          "How long the sound lasts",
          "The pitch",
          "Whether it loops",
        ],
        correctAnswer: 0,
        explanation: "Sounds inside a Part are positional. Setting this to around 60 keeps a small object's sound local instead of audible across the whole island.",
      },
    ],
  },
}

export const enLesson17 = {
  lessonId: "lesson-roblox-1-7",
  moduleId: "module-01",
  order: 7,
  title: "1.7 - Party Mode",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Build a Neon PartyButton with a ClickDetector and a Script.",
    "Hold state in a partyOn variable and flip it with the not operator.",
    "Use one if/else to drive lighting, music, and a visual effect together.",
    "Write an else branch that genuinely restores the previous state.",
    "Ship a working two-way toggle on the island and save it.",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 7 of 92)",
        content: `In 1.6 you built two moods by hand, dragging ClockTime back and forth and starting sounds yourself. Today you hand that job to a button.

This is the first thing you have built that a *player* can control. Everything before now was you configuring a world. This is the world reacting to somebody who is not you - which is, in one sentence, what a game is.

| After 1.6 | Result of 1.7 |
|---|---|
| Two moods you switch by hand in Studio | One button a player presses to switch them |
| Code that reacts to one thing at a time | One click driving lighting, audio, and visuals together |
| No memory of what state anything is in | A variable holding state between clicks |

**Your finish line for today:**
- A \`PartyButton\` - Neon, with a ClickDetector and a Script.
- A \`partyOn\` variable, flipped every click with \`not\`.
- \`if partyOn then ... else ... end\` driving night + music + a visual effect.
- An \`else\` branch that puts everything back exactly as it was.
- Saved as \`Lesson 1.7 - Party Mode\`.

**Do now (2 min):** open \`Lesson 1.6 - Island Atmosphere\`.`,
      },
      {
        title: "What a toggle actually is",
        content: `A toggle is a thing with two states that swaps between them. A light switch. Mute. Fullscreen.

- \`false\` → click → \`true\`
- \`true\` → click → \`false\`

In code, the entire mechanism is one line:

\`\`\`lua
local partyOn = false
partyOn = not partyOn  -- flip it
\`\`\`

\`not\` inverts a boolean. \`not false\` is \`true\`; \`not true\` is \`false\`. That is the whole trick.

**The important word in that snippet is "remember".** Your LogicCube in 1.4 counted clicks - it remembered a number. This remembers a *situation*: is the party currently on? Without a variable holding that, the button has no way of knowing whether this click should start the party or end it. It would be a switch with no idea which way it is currently flipped.

Almost every system in the rest of this course keeps state like this. Whether a door is open, whether a quest is accepted, whether a player already claimed today's reward - all of it is a variable somewhere remembering what happened.`,
      },
      {
        title: "Building the button",
        content: `1. A Block near the entrance or in the yard, somewhere obvious.
2. Name it \`PartyButton\`.
3. **Neon** material, bright colour - it should look pressable.
4. Size it to be easy to click: \`3, 1, 3\` or \`2, 4, 2\`.
5. \`Anchored = true\`.
6. **ClickDetector** inside it, MaxActivationDistance \`32\`.
7. A **Script** inside it.

A note on making it *look* clickable: players do not read instructions. A glowing object at eye height, on a plinth, in an empty patch of yard reads as "press me" without a single word. A grey cube in a corner does not. That is level design, and it is free.

**Tidiness:** make a Folder called \`Interactives\` and put \`PartyButton\` and \`LogicCube\` in it. Two objects does not feel like it needs a folder. Two hundred does, and by then reorganising is a chore.

**Do now (5 min):** place the button, add the ClickDetector and an empty Script. Press Play and confirm the click cursor appears when you look at it.`,
      },
      {
        title: "Getting the sounds ready first",
        content: `Set up the audio before writing any logic. Debugging a toggle is easy; debugging a toggle *and* missing sound objects at the same time is not.

| Sound | Role | Looped | Volume |
|---|---|---|---|
| \`Ambient_Day\` | Your daytime bed from 1.6 | true | 0.3-0.4 |
| \`Music_Party\` | The party track | true | 0.35-0.5 |
| \`SFX_PartyStart\` | Optional stinger on activation | false | 0.5 |

The behaviour you want:
- Party **on**: \`Music_Party\` plays, \`Ambient_Day\` stops.
- Party **off**: \`Ambient_Day\` plays, \`Music_Party\` stops.

**Both halves matter.** Starting the music is the obvious part. Stopping the ambient is the part people forget, and the result is waves and dance music playing simultaneously - a bug that sounds exactly like a bug.

\`\`\`lua
local music = workspace:FindFirstChild("Music_Party")
local ambient = workspace:FindFirstChild("Ambient_Day")

if music then
  music.Looped = true
end
\`\`\`

Note \`FindFirstChild\` again, and the \`if music then\` guard around it - same defensive pattern as 1.6. If you rename a sound later and forget to update the script, the button still works and simply makes no noise, instead of throwing an error and breaking the lighting too.

**Do now (5 min):** add \`Music_Party\` from Toolbox → Audio and check its SoundId is filled in.`,
      },
      {
        title: "The visual effect",
        content: `The mode has to be *visible*, not just audible. Three ways, pick one:

**Option A - simplest.** Several small Neon blocks named \`Confetti_1\`, \`Confetti_2\`... near the button. \`Transparency = 0\` when on, \`1\` when off.
**Option B.** A **ParticleEmitter**, toggling its \`Enabled\` property.
**Option C.** Change your existing lamps to brighter colours.

The requirement is just that the two states look unmistakably different. If you have to squint to tell whether the party is on, it is not on.

\`\`\`lua
local function setConfetti(visible)
  for _, child in ipairs(workspace:GetChildren()) do
    if child.Name:match("^Confetti_") and child:IsA("BasePart") then
      child.Transparency = visible and 0 or 1
    end
  end
end
\`\`\`

That loop is a preview of module 4, where you meet \`ipairs\` properly. For now, the shape is: go through everything in Workspace, and for each thing whose name starts with \`Confetti_\`, set its transparency. Rather than naming six objects individually, you describe a rule.

If the loop feels like too much today, set each Part's transparency on its own line. Nothing is lost - it just gets long, which is exactly the itch that makes loops feel like a relief when you meet them formally.

**Do now (5 min):** make three to six small Neon parts, Anchored, all starting at \`Transparency = 1\`.`,
      },
      {
        title: "The button code",
        content: `Start here, and get it working before adding anything else.

\`\`\`lua
local part = script.Parent
local detector = part:WaitForChild("ClickDetector")
local Lighting = game:GetService("Lighting")

local partyOn = false
local dayTime = 9
local nightTime = 0.5

local music = workspace:FindFirstChild("Music_Party")
local ambient = workspace:FindFirstChild("Ambient_Day")

detector.MouseClick:Connect(function(player)
  partyOn = not partyOn
  print(player.Name, "partyOn =", partyOn)

  if partyOn then
    Lighting.ClockTime = nightTime
    if music then
      if ambient then ambient:Stop() end
      music:Play()
    end
    print("Party enabled")
  else
    Lighting.ClockTime = dayTime
    if music then music:Stop() end
    if ambient then ambient:Play() end
    print("Party disabled")
  end
end)
\`\`\`

**\`game:GetService("Lighting")\`** is the new piece. Lighting is a *service* - a global system, not an object sitting in Workspace. \`GetService\` is the correct way to reach any of them, and you will use it constantly: \`Players\`, \`ReplicatedStorage\`, \`TweenService\`, \`DataStoreService\`. Learn the shape now, because from module 3 onward it appears in nearly every script.

Also notice \`dayTime\` and \`nightTime\` are named variables at the top rather than bare numbers buried in the logic. Same habit as 1.3 and 1.4, and by now it should be starting to feel automatic.

**Do now (8 min):** put this in, fill in your own sound names and times, and click the button several times. Watch \`partyOn\` flip in Output. Get this working before you touch the confetti.`,
      },
      {
        title: "Adding the visuals",
        content: `Now hook the confetti in. This version assumes the pieces live in a Folder called \`ConfettiBits\`.

\`\`\`lua
local confettiFolder = workspace:FindFirstChild("ConfettiBits")

local function showPartyVisuals(isOn)
  if confettiFolder then
    for _, piece in ipairs(confettiFolder:GetChildren()) do
      if piece:IsA("BasePart") then
        piece.Transparency = isOn and 0 or 1
      end
    end
  end
  part.BrickColor = isOn and BrickColor.new("Hot pink") or BrickColor.new("Bright blue")
end

-- inside MouseClick, replacing the time-only version:
if partyOn then
  Lighting.ClockTime = nightTime
  if ambient then ambient:Stop() end
  if music then music:Play() end
  showPartyVisuals(true)
else
  Lighting.ClockTime = dayTime
  if music then music:Stop() end
  if ambient then ambient:Play() end
  showPartyVisuals(false)
end
\`\`\`

**This is your first real function, and it is worth pausing on.** \`showPartyVisuals\` bundles up "everything the visuals need to do" and gives it a name. The if/else no longer has to care *how* the confetti works - it just says on or off. Change how the effect works later and you change one function, not two branches.

Functions get a full lesson in 3.6. This is the version where you feel why they are useful before anyone defines them at you.

Note also that the button changes its own colour - pink when on, blue when off. The control itself shows its state. Real interfaces do this, and it costs one line.

**Do now (6 min):** add the visuals and confirm the confetti appears and disappears cleanly.`,
      },
      {
        title: "Debounce",
        content: `Impatient players double-click. Without a guard, that flips \`partyOn\` twice in a few milliseconds and the mode appears to do nothing at all - or worse, the music starts and immediately stops.

\`\`\`lua
local busy = false

detector.MouseClick:Connect(function(player)
  if busy then return end
  busy = true

  partyOn = not partyOn
  -- main if/else here

  task.wait(0.35)
  busy = false
end)
\`\`\`

Same pattern you saw in 1.4, now with a real reason to use it. \`0.35\` seconds is long enough to swallow a double-click and short enough that a deliberate second press still works.

One Studio quirk worth knowing: after you press Stop, audio can occasionally linger in the editor. If sound is behaving oddly, start a fresh Play session before assuming your code is wrong.`,
      },
      {
        title: "Test it like a player would",
        content: `Both directions, twice. The second click is the one that finds bugs, because the "off" branch is the one people write carelessly.

1. Click once: sky darkens, music starts, ambient stops, confetti appears, button turns pink.
2. Click again: daylight returns, music stops, ambient restarts, confetti vanishes, button turns blue.
3. Now do it three more times in a row. Anything that drifts - a sound that stacks, confetti that stays behind - shows up on repeat, not on the first go.

If the change is hard to notice, widen the gap: a bigger ClockTime difference, brighter confetti, louder music. Feedback that a player might miss is feedback that does not exist.

**Do now (5 min):** run at least three full on-off cycles and watch for anything that does not return to where it started.`,
      },
      {
        title: "When it goes wrong",
        content: `| Problem | Cause | Fix |
|---|---|---|
| It turns on but never off | No \`else\`, or \`partyOn\` never inverted | Add \`partyOn = not partyOn\` and a full else branch. |
| No music | SoundId empty, or \`Play()\` never called | Check the asset, and check the enable branch calls \`music:Play()\`. |
| Waves and dance music at once | The ambient is never stopped | \`ambient:Stop()\` in the ON branch. |
| Confetti stays visible | The else branch does not hide it | \`Transparency = 1\` in the OFF branch. |
| Clicking does nothing | No ClickDetector, or you are in Edit mode | Add it, and test with F5. |
| \`Lighting is nil\` | Reaching for the service the wrong way | \`game:GetService("Lighting")\`. |

**The pattern behind half this table:** whatever the ON branch does, the OFF branch has to undo. Write them side by side and check line for line - start music / stop music, hide confetti / show confetti, night / day. A toggle where one direction does three things and the other does two is a toggle that leaves your world in a state it can never get out of.`,
      },
      {
        title: "Check your work before you move on",
        content: `**Checklist:**
- [ ] \`PartyButton\` is Neon and contains a ClickDetector and a Script.
- [ ] \`partyOn\` exists and is inverted every click.
- [ ] ON gives night + music + a visual effect.
- [ ] OFF restores day + ambient + hides the effect.
- [ ] Output reports the state on each click.
- [ ] Saved as \`Lesson 1.7 - Party Mode\`.

| Level | What it looks like |
|---|---|
| **Done** | Night and music toggle correctly, with some visual change. |
| **Good** | A clean else branch, two separate sounds, confetti that hides properly. |
| **Excellent** | The visual work lives in a function, a debounce guards the handler, and the button shows its own state through colour. |`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "partyOn is never inverted",
      explanation: "The variable stays on its starting value forever, so every click takes the same branch and the mode never turns off.",
      correctApproach: "partyOn = not partyOn as the first line of the handler, before the if/else.",
    },
    {
      mistake: "The mode turns on but there is no way to turn it off",
      explanation: "The else branch is missing, so the second click has nothing to run.",
      correctApproach: "Write the else branch as the exact mirror of the if branch, undoing everything it did.",
    },
    {
      mistake: "The ambient track and the party music play at the same time",
      explanation: "Starting the new sound is remembered; stopping the old one is forgotten.",
      correctApproach: "ON: start music, stop ambient. OFF: start ambient, stop music. Both halves, every time.",
    },
    {
      mistake: "Confetti stays visible after the party ends",
      explanation: "Same cause - the OFF branch does less than the ON branch did.",
      correctApproach: "Transparency = 1, or Enabled = false, in the else branch. Read the two branches side by side and check them line for line.",
    },
    {
      mistake: "Clicking the button does nothing",
      explanation: "There is no ClickDetector, or the Script is not a child of the button.",
      correctApproach: "In Explorer, both ClickDetector and Script should be indented directly under PartyButton.",
    },
    {
      mistake: "Testing in Edit mode",
      explanation: "MouseClick only fires while the game is running.",
      correctApproach: "F5, every time.",
    },
    {
      mistake: "The music is deafening",
      explanation: "Volume left at or near 1.",
      correctApproach: "0.35-0.5. Loud enough to change the mood, quiet enough that the click SFX still cuts through.",
    },
    {
      mistake: "A fast double-click makes the mode appear to do nothing",
      explanation: "Two clicks in a few milliseconds flip partyOn twice, so it ends up back where it started.",
      correctApproach: "Add the busy/task.wait debounce so the second click inside 0.35s is ignored.",
    },
  ],
  summary:
    "You built the first thing in this course that a player can operate. A single click now drives lighting, audio, and visuals together, and a second click puts all of it back. Along the way you met state held in a variable, the not operator, services via game:GetService, and your first function - all four of which show up in nearly every script from here to lesson 92.",
  practiceTask: {
    title: "Practice: Party Mode",
    difficulty: "beginner",
    description: `**The build:** a button that toggles the whole island between normal and party.

### Part A: Button and sounds
1. Open your level from 1.6.
2. \`PartyButton\`: Neon, \`Anchored = true\`, with a ClickDetector and a Script inside it.
3. Prepare \`Music_Party\` and your daytime ambient sound in Workspace, both named clearly.

### Part B: The toggle
1. \`local partyOn = false\`, inverted on every click.
2. The \`if partyOn\` branch: night ClockTime, start the music, stop the ambient, show the visual effect.
3. The \`else\` branch: day ClockTime, stop the music, start the ambient, hide the visual effect.
4. \`print\` the state so Output tells you what happened.
5. Play, and run at least two full on-off cycles.

### Part C: Finish
1. Fix anything that does not return to its starting state, and tidy your object names.
2. **File → Save to Roblox** as \`Lesson 1.7 - Party Mode\`.
3. Mark the practice complete here.`,
    hints: [
      "Get the ClockTime change working on its own before you add music or confetti. One thing at a time is always faster than three things at once.",
      "The names in FindFirstChild must match your Sound objects exactly - including capitals.",
      "Test the second click. The 'off' branch is where nearly every bug in this lesson lives.",
      "Simplest possible confetti: Transparency 0 and 1. Do not reach for particles until the toggle itself works.",
      "Write the ON and OFF branches side by side and check them line for line. Whatever one does, the other must undo.",
    ],
    optionalChallenge:
      "Add \`SFX_PartyStart\` - a short stinger that plays only on activation, never on deactivation. It is a small thing, and it teaches something real: not everything in the ON branch needs a mirror in the OFF branch. A one-shot sound has nothing to undo. Knowing which actions need reversing and which do not is exactly the judgement that makes toggles reliable.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What does partyOn = not partyOn do?",
        options: [
          "Sets it to true",
          "Deletes the object",
          "Saves progress",
          "Flips the boolean to its opposite",
        ],
        correctAnswer: 3,
        explanation: "not true is false, not false is true. One line, and you have a switch.",
      },
      {
        id: "q2",
        type: MC,
        question: "What is the else branch doing here?",
        options: [
          "Undoing everything the on branch did - restoring day, stopping music, hiding the effect",
          "Enabling Party Mode",
          "Creating terrain",
          "Opening the Toolbox",
        ],
        correctAnswer: 0,
        explanation: "A toggle is only as good as its off branch. Whatever the on branch changes, the off branch has to change back.",
      },
      {
        id: "q3",
        type: MC,
        question: "How should PartyButton be set up?",
        options: [
          "With Anchored off",
          "With only a LocalScript",
          "Neon material, Anchored, with a ClickDetector and a Script inside it",
          "As a MeshPart with no scripts",
        ],
        correctAnswer: 2,
        explanation: "Neon so it reads as pressable, Anchored so it stays put, ClickDetector so it is clickable at all.",
      },
      {
        id: "q4",
        type: MC,
        question: "What must happen to the ambient sound when the party starts?",
        options: [
          "Delete Lighting",
          "Stop it, so it does not play over the music",
          "Disable the ClickDetector",
          "Fix ClockTime at 14",
        ],
        correctAnswer: 1,
        explanation: "Starting the new sound is the obvious half. Stopping the old one is the half people forget, and the result sounds exactly like a bug.",
      },
      {
        id: "q5",
        type: MC,
        question: "Simplest way to hide a visual effect?",
        options: [
          "Delete Workspace",
          "Use Union",
          "Set Transparency = 1",
          "Change the interface language",
        ],
        correctAnswer: 2,
        explanation: "Transparency 1 is invisible, 0 is solid. No creating or destroying objects needed.",
      },
      {
        id: "q6",
        type: MC,
        question: "Why game:GetService(\"Lighting\")?",
        options: [
          "To add Decals",
          "Because Lighting is a service - a global system, not an object in Workspace - and GetService is how scripts reach one",
          "To create folders",
          "To enable snapping",
        ],
        correctAnswer: 1,
        explanation: "The same call gets you Players, ReplicatedStorage, TweenService and DataStoreService later. Learn the shape once, use it everywhere.",
      },
      {
        id: "q7",
        type: MC,
        question: "Where does the button's Script belong?",
        options: [
          "Inside PartyButton",
          "In Terrain",
          "In the object's name",
          "In the BrickColor property",
        ],
        correctAnswer: 0,
        explanation: "Same rule as every script so far: inside the Part, so script.Parent points at the right thing.",
      },
      {
        id: "q8",
        type: MC,
        question: "Which earlier skills does Party Mode combine?",
        options: [
          "DataStore",
          "RemoteEvent",
          "Terrain generation only",
          "if/else conditions, ClickDetector events, and the Lighting and Sound settings from 1.6",
        ],
        correctAnswer: 3,
        explanation: "Nothing in this lesson is new on its own. The lesson is about wiring several known things into one feature.",
      },
      {
        id: "q9",
        type: MC,
        question: "Why print the state on every click?",
        options: [
          "It shows in Output which branch actually ran, so you can tell a logic bug from a sound bug",
          "It brightens the screen",
          "It creates fog",
          "It cuts wall openings",
        ],
        correctAnswer: 0,
        explanation: "If Output says partyOn = true and no music plays, the toggle is fine and the sound is the problem. That split saves you a lot of guessing.",
      },
      {
        id: "q10",
        type: MC,
        question: "What is the actual requirement for the visual effect?",
        options: [
          "It must use 1,000 Parts",
          "It should change the level name",
          "It should only be print messages",
          "The two states must be unmistakably different to look at",
        ],
        correctAnswer: 3,
        explanation: "Feedback a player might miss does not count as feedback. If you have to squint to tell, make it bigger.",
      },
      {
        id: "q11",
        type: MC,
        question: "Why is music:Stop() needed in the else branch?",
        options: [
          "To delete the ClickDetector",
          "Because otherwise the party music keeps playing after daylight returns",
          "To reset Anchored",
          "To clear terrain",
        ],
        correctAnswer: 1,
        explanation: "Every start needs its stop. Read the two branches side by side and pair them up line for line.",
      },
      {
        id: "q12",
        type: MC,
        question: "Where do you test the button?",
        options: [
          "Terrain Editor",
          "On the Roblox website",
          "Play mode",
          "Edit mode",
        ],
        correctAnswer: 2,
        explanation: "Click events only fire in a running game. Nothing interactive interacts in Edit mode.",
      },
      {
        id: "q13",
        type: MC,
        question: "What do busy and task.wait do together?",
        options: [
          "Prevent materials being lost",
          "Ignore extra clicks arriving within a fraction of a second, so a double-click does not flip the state twice",
          "Change materials",
          "Generate terrain",
        ],
        correctAnswer: 1,
        explanation: "That is a debounce. Without it, an impatient double-click flips partyOn twice and the mode appears to do nothing.",
      },
      {
        id: "q14",
        type: MC,
        question: "What is the benefit of putting the visual changes in a showPartyVisuals function?",
        options: [
          "The if/else no longer has to know how the effect works - and changing the effect means editing one place, not two branches",
          "It makes the script run faster",
          "It is required by Roblox",
          "It replaces the need for a ClickDetector",
        ],
        correctAnswer: 0,
        explanation: "That is the whole argument for functions, and you just felt it before anyone defined it at you. Functions get a full lesson in 3.6.",
      },
      {
        id: "q15",
        type: MC,
        question: "What name should you save under?",
        options: [
          "Untitled",
          "Lesson 1.2 - Island",
          "Lesson 1.7 - Party Mode",
          "Module 5",
        ],
        correctAnswer: 2,
        explanation: "One saved Place per lesson, named for the lesson. In 1.8 you will be glad you can find each of them.",
      },
    ],
  },
}

export const enLesson18 = {
  lessonId: "lesson-roblox-1-8",
  moduleId: "module-01",
  order: 8,
  title: "1.8 - Checkpoint M1",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Bring all of Module 1 together into one level and review it against a checklist.",
    "Organise Explorer with folders and names you will still understand in a month.",
    "Confirm the project is genuinely saved to the Roblox cloud under a findable name.",
    "Present Party Mode in a 30-60 second demo.",
    "Be able to explain a variable and an if condition in your own words.",
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 8 of 92)",
        content: `No new tools today. Today you finish something.

That is a real skill, and it is rarer than it sounds. Plenty of people can start a Roblox project. Far fewer take one from "mostly works" to "I can hand this to someone and be proud of it" - and that gap is where a hobby turns into a portfolio.

Seven lessons ago you opened a grey plane. You now have an island with a decorated house on it, three scripted objects, an atmosphere, a soundscape, and a button that transforms the whole place. Today you tidy it, test it, save it properly, and show it.

| After 1.7 | Result of 1.8 |
|---|---|
| Seven separate saved Places | One finished level that contains everything |
| Explorer is a long unsorted list | Folders and names a stranger could navigate |
| It works when you know where to click | It works for someone seeing it for the first time |

**Your finish line for today:**
- One level combining everything from 1.1-1.7.
- Explorer organised with folders and clear names.
- Saved as \`Module 1 - Living Island\`.
- A 30-60 second Party Mode demo you have actually rehearsed.

**Do now (2 min):** open your most complete level from after 1.7. Not the tidiest one - the most complete one.`,
      },
      {
        title: "What should already be in there",
        content: `Run down the list. Anything missing gets added today - using only tools you already know.

| Lesson | What it contributed |
|---|---|
| **1.1** | \`House_01\` with Union-cut windows and a doorway |
| **1.2** | An island: terrain, water, beach, smoothed shores |
| **1.3** | \`MagicCube\` - a script with variables, print, and property changes |
| **1.4** | \`LogicCube\` - ClickDetector with if/else logic |
| **1.5** | A decorated facade: materials, a Decal, neon accents |
| **1.6** | Lighting, Atmosphere, ambient audio and an SFX |
| **1.7** | \`PartyButton\` toggling night, music, and visuals |

**Do not add new mechanics today.** It is tempting - you feel capable now, and there is a whole Toolbox full of things you could bolt on. Resist it. Unfamiliar code at submission time is how a working project becomes a broken one with an hour left. Polish beats novelty here, and it will beat novelty again in 5.10, 6.10, and 12.6.

**Do now (5 min):** go down the list and confirm every row exists in your level.`,
      },
      {
        title: "The review checklist",
        content: `Read these as though the level belonged to someone else.

**World**
- [ ] The house has an interior you can walk into.
- [ ] The terrain is shaped, with land and water - not a bare Baseplate.
- [ ] The house sits properly on the ground, neither floating nor sunk.

**Code**
- [ ] A script uses \`local\` variables and \`print\`.
- [ ] \`if/else\` responds to a click.
- [ ] Party Mode turns on **and off**.

**Look and feel**
- [ ] The facade has chosen materials and at least one image.
- [ ] Night is atmospheric but still navigable.
- [ ] Ambient audio loops and the SFX fires.

**Organisation**
- [ ] Every Part has a real name, and there are no stray leftovers in Explorer.
- [ ] The project is saved under the right name.

**Do now (8 min):** Play the level and work through the list, fixing as you go.`,
      },
      {
        title: "Organising Explorer",
        content: `Right now your Workspace is probably a long flat list with a few things called \`Part\` in it. Here is where it should end up:

\`\`\`text
Workspace
├── House_01 (Model)
├── Terrain
├── Interactives (Folder)
│   ├── MagicCube
│   ├── LogicCube
│   └── PartyButton
├── Decor (Folder)
│   ├── Signs
│   ├── Lights
│   └── Confetti
└── Sounds (Folder)
    ├── BackgroundMusic
    └── SoundEffects
Lighting
\`\`\`

Insert → Folder, then drag things in. A Folder is purely organisational - it does not affect physics, rendering, or performance in any way. It exists entirely for the human reading the tree.

**The one rule that will bite you if you break it: never drag a Script out of its Part.** Move \`PartyButton\` into the \`Interactives\` folder and its Script travels with it, still inside it, still working. Drag just the Script into a folder and \`script.Parent\` becomes the folder, and everything you built in 1.7 stops functioning. Move Parts, not scripts.

If your confetti pieces are still loose in Workspace and your 1.7 code loops over \`workspace:GetChildren()\`, moving them into a folder will break that loop. Either update the code to look inside the folder, or leave those particular parts where they are. Both are fine - noticing before you press Play is the point.

**Do now (8 min):** create your folders and sort everything into them. Then press Play and confirm nothing broke.`,
      },
      {
        title: "Playtest as a stranger",
        content: `You know where everything is, which makes you the worst possible tester of your own level. Try to forget.

1. You spawn. Can you see the house, the door, the sign?
2. Walk to the interactive cubes. Do they respond?
3. Is it obvious that \`PartyButton\` is a button? Would someone press it without being told?
4. Press it. Night, music, confetti - all of it?
5. Press it again. Does everything actually go back?
6. Walk to the beach. Do you get stuck anywhere?

Question 3 is the one people skip and it is the most valuable. A player who never finds your best feature has, from their point of view, played a game that does not have it.

**Quick diagnoses:** things falling → Anchored. Clicks doing nothing → ClickDetector, or you are in Edit mode. Sounds stacking → a missing \`Stop()\` in the 1.7 script.

**Do now (6 min):** walk the whole route and write down every problem before fixing any of them. Making the list first stops you disappearing down one rabbit hole and running out of time.`,
      },
      {
        title: "Saving it properly",
        content: `**File → Save to Roblox** → \`Module 1 - Living Island\`.

Not \`Untitled\`. Not \`test\`. Not \`Place1\`. In lesson 12.5 you build a portfolio, and you will be scrolling through a list of everything you made across three months. \`Module 1 - Living Island\` will be instantly recognisable. \`Place7\` will not.

**Then do the thing almost nobody does: close the level and reopen it from your project list.** Saving is not the same as saved. Reopening is the only way to actually confirm the cloud has the version you think it has - and finding out now costs two minutes, while finding out in three weeks costs your whole island.

**Do now (4 min):** save, close, reopen, and confirm Party Mode still works in the reopened copy.`,
      },
      {
        title: "The demo",
        content: `30 to 60 seconds. Short is harder than long and much better.

1. Show the island and house with the camera while you say what it is.
2. Walk your character to \`PartyButton\`.
3. Click. Say what just happened - night, music, effects.
4. Click again. Say that it restored daytime.
5. Optional: click \`LogicCube\` and mention it uses an \`if\` condition.

**Rehearse it once before you record or present.** The gap between a first attempt and a second attempt at the same 45 seconds is enormous - fewer pauses, no hunting for the button, no "wait, hold on". One practice run is all it takes.

**Everything in Play mode.** Nothing clicks and nothing sounds in Edit mode, and discovering that live is a specific kind of unpleasant.

Being able to say clearly what you built, in a minute, to someone who was not there is a genuinely valuable skill - and it is the same one you will use in 12.6 on Showcase Day, when the thing you are presenting is a finished game.

**Do now (6 min):** run through the outline once, then do it again properly.`,
      },
      {
        title: "The code you should be able to explain",
        content: `Someone might ask how it works. These are the two patterns behind everything you built.

\`\`\`lua
-- A variable, and changing a property through it
local part = script.Parent
part.BrickColor = BrickColor.new("Bright violet")
print(part.Name)
\`\`\`

\`\`\`lua
-- State, inversion, and a branch
local partyOn = false
partyOn = not partyOn
if partyOn then
  print("Enabled")
else
  print("Disabled")
end
\`\`\`

If you can read those aloud in plain English - "this remembers the cube, then paints it violet"; "this flips the switch, then does one thing or the other depending on which way it is now pointing" - you have understood Module 1. Not memorised it. Understood it.

**Do now (4 min):** open your PartyButton script and explain each line out loud. Anything you cannot explain, look back at the lesson it came from.`,
      },
      {
        title: "Final checklist",
        content: `- [ ] The level passes the review checklist and the Play test.
- [ ] Explorer has folders, and everything has a real name.
- [ ] Party Mode toggles reliably, both ways, several times in a row.
- [ ] Saved as \`Module 1 - Living Island\`, and verified by reopening it.
- [ ] A 30-60 second demo, rehearsed at least once.
- [ ] You can explain a variable and an \`if\` in your own words.`,
      },
      {
        title: "Things that go wrong at submission",
        content: `| Problem | Cause | Fix |
|---|---|---|
| Party Mode will not turn off | Missing \`else\`, or \`not\` was left out | Compare against the 1.7 template line by line. |
| The house is underwater or floating | The terrain moved after the house was placed | Flatten a pad, Move the house onto it. |
| A cluster of unnamed Parts by the door | Decorations made in 1.5 and never renamed | Rename them and put them in \`Decor\`. |
| Nothing responds during the demo | Demoing in Edit mode | F5 first. Every time. |
| The music is gone after reopening | The save never reached the cloud | Save to Roblox, then reopen to verify. |
| Too dark to see anything | Brightness at zero | Raise Brightness or OutdoorAmbient. |
| The confetti loop broke after tidying up | The parts moved into a folder the code does not look in | Point the loop at the folder, or leave those parts where they were. |`,
      },
      {
        title: "What Module 2 brings",
        content: `Next is **Module 2 - World Craft**: 3D models, moving connections like doors and bridges, and building an amusement park with attractions people actually queue for.

But finish this thought first. Eight lessons ago you had never opened Studio. You have now cut geometry with CSG, sculpted terrain, written scripts with variables and conditions, connected an event, lit a scene, mixed audio, and built a feature a player can operate - and you have organised, tested, saved, and presented the result.

That last part matters as much as any of the rest. Plenty of people can make something work once. Finishing it is the harder half, and you just did it.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Bolting on complicated mechanics from the internet right before submitting",
      explanation: "Unfamiliar code you have no time to debug is the fastest route from a working project to a broken one.",
      correctApproach: "Polish what you built in 1.1-1.7. Novelty is not what is being assessed here - a finished thing is.",
    },
    {
      mistake: "Demonstrating in Edit mode",
      explanation: "Clicks and sounds do not work outside Play, and finding that out during a live demo is memorable for the wrong reason.",
      correctApproach: "F5 before you start, and do one full rehearsal run beforehand.",
    },
    {
      mistake: "Only testing that Party Mode turns on",
      explanation: "The off branch is where the bugs live, because it is the half people write in a hurry.",
      correctApproach: "Click it at least four times - on, off, on, off - and confirm the level returns to exactly its starting state each time.",
    },
    {
      mistake: "Dragging a Script into a folder while leaving its Part behind",
      explanation: "script.Parent then points at the folder, and everything the script controls stops working.",
      correctApproach: "Move Parts into folders. The scripts inside them come along automatically and keep working.",
    },
    {
      mistake: "Saving as Untitled, or assuming a save succeeded",
      explanation: "In three months your project list will be long, and 'saved' and 'actually in the cloud' are not the same thing.",
      correctApproach: "Save to Roblox with the proper name, then close and reopen the place to verify what is really up there.",
    },
    {
      mistake: "Polishing decorations while checklist items are still failing",
      explanation: "A beautiful level where the button does not work does not pass, and prettier decorations will not change that.",
      correctApproach: "Clear every technical item first. Decoration is what you do with the time left over.",
    },
    {
      mistake: "Deleting parts of the level to make it simpler to submit",
      explanation: "Module 1 was designed as one environment built up in seven layers. Removing layers removes the point.",
      correctApproach: "Everything - house, island, cubes, atmosphere, party button - stays in one final level.",
    },
  ],
  summary:
    "You took seven lessons of separate work and turned it into one finished, organised, tested, saved, and presentable level. You also practised something that gets no attention and matters enormously: reviewing your own work as though it belonged to someone else, and getting it over the line rather than starting something new.",
  practiceTask: {
    title: "Practice: Living Island Checkpoint",
    difficulty: "beginner",
    description: `**The build:** one finished Module 1 level, saved and demonstrated.

### Part A: Review
1. Open your most complete level from after 1.7.
2. Work through "What should already be in there" and the review checklist.
3. Fix everything using only tools from this module. No new mechanics.

### Part B: Organise, test, save
1. Create folders in Explorer and sort your objects into them. **Move Parts, never scripts.**
2. Play the level as a first-time visitor. Toggle Party Mode on and off at least twice.
3. **File → Save to Roblox** as \`Module 1 - Living Island\`.
4. Close the place and reopen it from your project list to confirm the save landed.

### Part C: Demo
1. Prepare 30-60 seconds using the outline from the lesson.
2. Rehearse it once, then present it in Play mode to someone - or record it.
3. Mark the practice and the checkpoint complete here.`,
    hints: [
      "Test the scripts before you reorganise Explorer, so you know any breakage came from the reorganising.",
      "Scripts stay inside their Parts. Move the Part into the folder and the script goes with it.",
      "Click the party button four times, not once. On, off, on, off.",
      "Demo in Play mode, and rehearse once. The second run is always dramatically better than the first.",
      "Do not swap your house for a big free model. A house you built and can explain beats a fancier one you cannot.",
      "Write your list of problems first, fix second. Otherwise you lose the hour to the first thing you found.",
    ],
    optionalChallenge:
      "Write five plain sentences about what you can now do - \"I can cut a window with Union\", \"I can write an if condition\", \"I know why a script has to live inside its Part\". Keep them somewhere. In lesson 12.5 you build a real portfolio, and a running record of what you learned when is worth far more than trying to reconstruct it from memory three months later.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is lesson 1.8 for?",
        options: [
          "Learning DataStore",
          "Finishing, organising, saving, and presenting the Module 1 level",
          "Building a Tycoon",
          "Creating a GUI",
        ],
        correctAnswer: 1,
        explanation: "A checkpoint is about getting existing work over the line, which is a different skill from starting new work - and a rarer one.",
      },
      {
        id: "q2",
        type: MC,
        question: "What should the level already contain when 1.8 begins?",
        options: [
          "A weapon shop",
          "An empty Baseplate",
          "House_01, the island, the scripted cubes, the decorated facade, the atmosphere, and Party Mode",
          "Just a config script",
        ],
        correctAnswer: 2,
        explanation: "Everything from 1.1 through 1.7, in one place. The module was built as layers on one environment.",
      },
      {
        id: "q3",
        type: MC,
        question: "What should you NOT do at checkpoint time?",
        options: [
          "Add complicated new mechanics you have not used before",
          "Fix geometry and rename Parts",
          "Test the Party Mode toggle",
          "Save with a proper name",
        ],
        correctAnswer: 0,
        explanation: "Unfamiliar code with no time to debug it is the fastest way to break something that was working.",
      },
      {
        id: "q4",
        type: MC,
        question: "Why create Folders in Explorer?",
        options: [
          "To replace scripts",
          "To generate terrain",
          "To enable glow",
          "To group objects so the tree stays readable as it grows",
        ],
        correctAnswer: 3,
        explanation: "A Folder is purely organisational - no effect on physics, rendering, or performance. It exists for the human reading the tree.",
      },
      {
        id: "q5",
        type: MC,
        question: "What breaks if you drag a Script into a Folder but leave its Part behind?",
        options: [
          "script.Parent becomes the folder, so the script no longer controls the Part",
          "An image appears",
          "Saving activates",
          "Terrain is deleted",
        ],
        correctAnswer: 0,
        explanation: "Move Parts into folders, not scripts. The script travels inside its Part and keeps working.",
      },
      {
        id: "q6",
        type: MC,
        question: "How should the demo be run?",
        options: [
          "In Edit mode, without clicking",
          "In Play mode, in 30-60 seconds, rehearsed once beforehand",
          "Without sound, and without showing the off state",
          "In an empty level",
        ],
        correctAnswer: 1,
        explanation: "Nothing clicks or sounds in Edit mode. And the second run through the same 45 seconds is always dramatically better than the first.",
      },
      {
        id: "q7",
        type: MC,
        question: "Which save name is right?",
        options: [
          "asdf",
          "Untitled Game",
          "test123",
          "Module 1 - Living Island",
        ],
        correctAnswer: 3,
        explanation: "In 12.5 you assemble a portfolio from a long project list. A descriptive name now saves you real confusion later.",
      },
      {
        id: "q8",
        type: MC,
        question: "The house ends up underwater after terrain edits. What fixes it?",
        options: [
          "A server script",
          "An infinite loop",
          "Flatten a pad, then Move the house onto it",
          "Deleting the lighting",
        ],
        correctAnswer: 2,
        explanation: "Exactly the 1.2 technique. Level the ground first, then place the building - never the other way round.",
      },
      {
        id: "q9",
        type: MC,
        question: "Why close and reopen the place after saving?",
        options: [
          "To clear the fog",
          "To reset variables",
          "Because 'saved' and 'actually in the cloud' are not the same thing, and reopening is the only real proof",
          "To load plugins",
        ],
        correctAnswer: 2,
        explanation: "Two minutes now, versus discovering in three weeks that your island was never uploaded.",
      },
      {
        id: "q10",
        type: MC,
        question: "The button does not respond during your demo. First check?",
        options: [
          "Whether you are actually in Play mode",
          "Turn off the computer",
          "Delete the account",
          "Rewrite the script",
        ],
        correctAnswer: 0,
        explanation: "It is the cause far more often than a code bug, especially under the pressure of presenting.",
      },
      {
        id: "q11",
        type: MC,
        question: "What must you test about Party Mode?",
        options: [
          "Only the first click",
          "Only the button's name",
          "Only how it looks, without pressing Play",
          "Both directions, several times, confirming the level returns to its starting state",
        ],
        correctAnswer: 3,
        explanation: "The off branch is where the bugs live. Repeat cycles catch things that leak - a sound that stacks, confetti that lingers.",
      },
      {
        id: "q12",
        type: MC,
        question: "What is Module 2 about?",
        options: [
          "Repeating the Baseplate work",
          "World Craft - 3D models, moving connections like doors and bridges, and an amusement park",
          "Publishing to the store",
          "DataStore from lesson one",
        ],
        correctAnswer: 1,
        explanation: "Building on Module 1's foundations with models and mechanisms rather than static geometry.",
      },
      {
        id: "q13",
        type: MC,
        question: "Which tools cut the house windows back in 1.1?",
        options: [
          "RemoteEvent",
          "DataStore",
          "Raycast",
          "Negate and Union",
        ],
        correctAnswer: 3,
        explanation: "CSG - place a cutter, Negate it, Union it into the wall. Real holes rather than painted-on ones.",
      },
      {
        id: "q14",
        type: MC,
        question: "Why walk the level pretending you have never seen it?",
        options: [
          "To remove Atmosphere",
          "Because knowing where everything is makes you unable to notice what a first-time player cannot find",
          "To reset variables",
          "To enable plugins",
        ],
        correctAnswer: 1,
        explanation: "A player who never finds your best feature has played a game that does not have it. Question 3 of the playtest - 'would someone press this without being told?' - is the one worth the most.",
      },
      {
        id: "q15",
        type: MC,
        question: "What is the deliverable at the end of Module 1?",
        options: [
          "One complete interactive level that passes the checklist, saved under a clear name, plus a short Party Mode demo",
          "An empty level",
          "One image on a Baseplate",
          "A brand new game started from scratch",
        ],
        correctAnswer: 0,
        explanation: "One finished thing, combining every layer from 1.1 to 1.7 - and the ability to show it and explain it.",
      },
    ],
  },
}
