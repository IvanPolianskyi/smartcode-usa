/** Roblox Module 07 EN - 8 уроків (prod-92), Tycoon */
import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson71 = {
  lessonId: "lesson-roblox-7-1",
  moduleId: "module-07",
  order: 1,
  title: "7.1 - Plot / dropper / collector",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Build a readable Tycoon Plot with a floor, walls, and a clear movement path",
    "Create a Dropper body with a separate Part named Mouth",
    "Set up Collector as a safe sensor zone with the correct properties",
    "Organize future drops in Folder Drops and verify geometry by hand",
    "Explain the full Tycoon flow from Mouth to Collector without automatic economy"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 49 of 92)",
        content: `In 6.10 you finished and shipped Simulator. Today a new genre starts: **Tycoon** only. You are not building Simulator, Obby, or Arena. Your goal is a physical factory skeleton where you can see where a drop starts, where it falls, and where the path ends. There is no automatic loop yet.
In the previous lesson **6.10 - Ship Sim** you locked in the habit: Coins belong to the server. You will need that later, but today you do not create or award Coins. In the next lesson **7.2 - Dropper while/for + Config** the scene gets a server loop.

| Carry-in from 6.10 | Result in 7.1 |
|---|---|
| Clean Ship Sim | New separate Tycoon Plot |
| Habit of naming systems | Floor, Walls, Dropper, Mouth, Collector, Drops |
| Server Coins discipline | Geometry only, no currency yet |
| Playtest of the route | Manual check of the drop path |

Today you draw the factory channel. The flow starts next lesson.

**Do now (3 min):** create a new Place, write down the five artifacts, and confirm Explorer has no Simulator systems.`,
      },
      {
        title: "Tycoon starts with a readable flow",
        content: `In a good Tycoon, the player understands production before the first purchase. The Dropper sits higher up, Mouth faces open space, the drop lands on Floor or a short path, and Collector clearly ends the route. If objects are scattered with no direction, future code only creates mess faster.

| Element | Its question | Visible proof |
|---|---|---|
| Plot | Where is my factory? | Separate floor and boundaries |
| Dropper | Where does production start? | Body above the route start |
| Mouth | Where exactly does the drop appear? | Small Part under the body |
| Collector | Where should the drop arrive? | Contrasting zone at the end |
| Sign | What is happening? | Flow arrow |

Do not add a second conveyor, a button shop, or a decorative warehouse. This lesson needs one route that is easy to test. From Spawn, you should find Dropper and Collector without flying the camera over the map.

Memory image: Tycoon is like a clear machine where you see input, movement, and output.

**Do now (3 min):** place three temporary Parts at Dropper, mid-route, and Collector, then view them from Spawn.`,
      },
      {
        title: "Plot: Floor sets the scale",
        content: `Create Model **Plot** in Workspace, and inside it Part **Floor**. For a first factory, a rectangle about 36 by 1 by 24 studs works well. Exact numbers can change, but the character needs room to walk beside the flow without pushing future drops. Floor must be Anchored.

| Floor property | Recommendation | Reason |
|---|---|---|
| Name | Floor | Scripts and commands find it quickly |
| Anchored | true | The base does not fall during Play |
| CanCollide | true | The player stands on the Plot |
| Size | about 36, 1, 24 | Room for the factory and a walkway |
| Material | SmoothPlastic or Metal | Simple readable prototype |

Keep the top of Floor at a comfortable height and check SpawnLocation. If the floor floats or sinks into Baseplate, a manual drop gives a misleading result. Do not scale Plot to hundreds of studs: a small Collector gets lost and testing takes longer.

Here Floor works like graph paper: it bounds the task and shows proportions.

**Do now (4 min):** create Plot/Floor, set Anchored, and walk from one edge to the other in Play.`,
      },
      {
        title: "Walls mark borders, not a cage",
        content: `Add Folder or Model **Walls** to Plot and make three low walls: left, right, and back. Leave the front open for entry and viewing. Walls must not hide Dropper from the camera. Height of 3-5 studs is enough for the border to read without making the character feel boxed in.

| Option | Benefit | Risk |
|---|---|---|
| Three low Walls | Border and equipment stay visible | Need careful alignment |
| Four tall Walls | Hard to leave the Plot | Camera gets blocked |
| No Walls | Fast to build | No sense of your own plot |
| Decorative fence | Nice silhouette | Extra complexity for a prototype |

Set all Walls to Anchored true and CanCollide true. Make sure there is no gap between them and Floor where a drop can fall through. If the route edge runs near a wall, leave at least one drop-width of clearance.

Borders here are like canal banks: they guide the eye without hiding the flow.

**Do now (4 min):** add three Walls, press Play, and check camera angles near Dropper and Collector.`,
      },
      {
        title: "Dropper and the Mouth point",
        content: `Create Model **Dropper** inside Plot. The body can be one large Anchored Part plus two supports. The most important piece is a separate Part with the exact name **Mouth**. In 7.2 the server finds this point and uses its position to spawn drops.

| Object | Anchored | CanCollide | Role |
|---|---:|---:|---|
| DropperBody | true | true | Visible body |
| Support | true | true | Holds the silhouette |
| Mouth | true | false | Spawn point, not a barrier |
| Test Drop | false | true | Checks falling |

Make Mouth small, for example 2 by 1 by 2 studs, and place it under the body. For the prototype it can be bright and slightly transparent. Its bottom face must sit over open space, not inside Floor or the body. No code today, but the future lookup shape is useful: \`local mouth = workspace.Plot.Dropper.Mouth\`.

Mouth is like a 3D printer nozzle: a small point defines where the whole material flow begins.

**Do now (5 min):** create Dropper/Mouth, turn off Mouth collision, and look from below to confirm nothing blocks the exit.`,
      },
      {
        title: "Drop route without conveyor magic",
        content: `Between Mouth and Collector there should be a short, predictable route. In the basic version the drop simply falls onto a sloped or flat surface, and you check geometry by hand. Do not add automatic movement, complex forces, or hidden teleports. Today you need to see physical mistakes before the loop exists.

| Route state | What happens | Fix |
|---|---|---|
| Mouth over an edge | Drop falls off the Plot | Move Dropper inward |
| Mouth over a wall | Drop gets stuck | Clear the vertical path |
| Collector too far | Drop stops early | Shorten the route |
| Narrow passage | Drops pile up | Give width clearance |
| Steep slope | Drop flies out | Reduce the angle |

Think about collision volumes as real shapes: every Part has real size. A visual gap does not guarantee a test cube will pass. Aim for a cube about 2 studs wide.

Treat the route like a marble chute: the shape proves it works before any motor.

**Do now (4 min):** move the camera from Mouth to Collector and find three potential collision points.`,
      },
      {
        title: "Collector as a sensor zone",
        content: `Create Part **Collector** at the end of the route. It marks where in 7.3 a drop will turn into a server reward. Today it awards nothing. Set **CanCollide false** so the drop does not bounce off an invisible wall, and **CanTouch true** so a future Touched event can fire.

| Collector property | Value | Why |
|---|---|---|
| Anchored | true | The zone stays in place |
| CanCollide | false | The drop passes through the sensor |
| CanTouch | true | Future contact is available |
| Transparency | 0.25-0.5 | Bounds stay visible while building |
| Color | Contrasting | Easy to find the route end |

Do not make Collector thinner than the drop path. The sensor must cross the trajectory, not sit beside it. In Properties check CanTouch specifically: turning off collision does not enable touch by itself.

Collector works like a scanner gate: the item passes through and the system notices the event.

**Do now (4 min):** set Collector properties and temporarily make it semi-transparent so you can see the route intersection.`,
      },
      {
        title: "Folder Drops keeps the Plot tidy",
        content: `Inside Model **Plot**, create a Folder with the exact name **Drops**. In 7.2 every server-spawned drop goes here. Folder does not change physics, but it gives one address for counting, cleanup, and cloning the plot. Do not put future drops inside Dropper or Collector, and do not scatter them across Workspace.

| Structure | Good | Bad |
|---|---|---|
| Plot/Drops | All moving drops for the plot together | Drops mixed with Baseplate decor |
| Plot/Dropper/Mouth | Spawn point is clear | Mouth named Part7 |
| Plot/Collector | Sensor is easy to find | Collector hidden in Walls |
| Plot/Walls | Borders grouped | Each wall at the root |

An empty Folder for now is correct. Do not leave test Parts in it after checking. Later a Script will use \`local folder = plot:WaitForChild("Drops")\`, and you will see the live object count for this factory only.

Folder is like a labeled tray on a desk: it does no work, but parts do not get lost.

**Do now (2 min):** create Plot/Drops, check letter casing, and remove stray Part, Part1, and Copy.`,
      },
      {
        title: "Sign explains the flow to the player",
        content: `Place a Sign near the entrance or above the route. It can be an Anchored Part with SurfaceGui and TextLabel. Keep the text short: **Dropper -> Drop -> Collector**. Arrows must match the real direction, and the sign must not block the camera or the fall.

| Sign text | Rating | Reason |
|---|---|---|
| Dropper -> Drop -> Collector | Good | Shows three steps |
| Something will happen here | Weak | No action or direction |
| Long future economy description | Extra | Coins do not work today |
| Arrow the wrong way | Error | Contradicts geometry |

Open Play and read the Sign from character height. If you must walk around the factory or zoom in tightly, resize TextLabel. Do not promise a reward that does not exist yet: this lesson only proves the physical flow.

Sign is a road marker: one precise sentence removes guesswork.

**Do now (4 min):** add Sign, step back to Spawn, and check that the arrow leads the eye to Collector.`,
      },
      {
        title: "Manual test drop",
        content: `Before automation, create one Part **TestDrop** directly under Mouth. Size about 2 by 2 by 2 studs, Anchored false, CanCollide true. Press Play and watch: the cube should fall freely, stay on the Plot or follow the route, and cross Collector.

| Observation | Conclusion | Next action |
|---|---|---|
| Cube hangs in air | Anchored still true | Turn Anchored off |
| Cube hits Mouth | Point is inside the body | Lower Mouth |
| Cube flies past Walls | Bad angle or edge | Move the route |
| Cube stops before Collector | Zone does not cross the path | Widen Collector |
| Cube passes the zone center | Geometry is ready | Delete TestDrop |

For a quick reset in Command Bar you can temporarily set position: \`workspace.TestDrop.Position = workspace.Plot.Dropper.Mouth.Position - Vector3.new(0, 2, 0)\`. This is manual diagnosis, not a finished system. Repeat the test three times from the same point; one lucky run does not prove stability.

This test is like a trial marble in a maze: it honestly shows every bad corner.

**Do now (5 min):** run three drops, record each result, and delete TestDrop after a successful check.`,
      },
      {
        title: "Handoff checklist and bridge to 7.2",
        content: `Before Save, check this short list:

- [ ] Workspace has one Model Plot.
- [ ] Floor and all Walls have Anchored true.
- [ ] The front of the Plot is open and readable.
- [ ] Dropper contains a separate Part Mouth.
- [ ] Mouth has Anchored true and CanCollide false.
- [ ] Collector has CanCollide false and CanTouch true.
- [ ] Plot contains an empty Folder Drops.
- [ ] Sign shows Dropper -> Drop -> Collector.
- [ ] TestDrop follows the correct route three times.
- [ ] The scene has no Coins and no automatic loop.
- [ ] Output is clean.
- [ ] Save: Lesson 7.1 - Tycoon Plot.

In 7.2 the server starts spawning drops from Mouth into Drops. Clean geometry lets you debug Config and the loop instead of hunting cubes outside the Plot.

Final Save is like a drawing before starting a machine: every point already has its place.

**Do now (3 min):** walk the checklist top to bottom, delete the test cube, and save the Place under the exact name.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Mouth stays part of the body with a random name like Part",
      explanation: "The next server Script will have no reliable point from which to spawn drops.",
      correctApproach: "Create a separate Part with the exact name Mouth, anchor it, and turn collision off for it.",
    },
    {
      mistake: "Collector has CanCollide true because it should stop the drop",
      explanation: "The drop bounces off the sensor or piles up in front of it instead of a clean zone cross.",
      correctApproach: "Set Collector CanCollide false and CanTouch true, and place its shape across the route.",
    },
    {
      mistake: "Folder Drops was created inside Dropper or named Drop",
      explanation: "Future code and object-count checks get the wrong address and may not find the container.",
      correctApproach: "Create one Folder inside Plot with the exact name Drops and leave it empty for now.",
    },
    {
      mistake: "Mouth sits inside Floor or DropperBody",
      explanation: "The test drop immediately intersects geometry, bounces, or gets stuck.",
      correctApproach: "Leave free vertical space under Mouth at least as tall as the test drop.",
    },
    {
      mistake: "Geometry is treated as done after viewing only in Edit",
      explanation: "Without a physics test you miss real collisions, falls off the edge, and stops before Collector.",
      correctApproach: "Drop one unanchored TestDrop three times from the same point and record the actual route.",
    },
    {
      mistake: "Coins and an automatic loop are added to the scene right away",
      explanation: "Economy bugs mix with geometry bugs, even though the lesson is only the Tycoon skeleton.",
      correctApproach: "Finish Plot, Mouth, Collector, Drops, and the manual test; move the server loop to 7.2.",
    }
  ],
  summary: "You built a readable Tycoon skeleton and manually confirmed the route from Mouth to Collector. The scene is ready for the server dropper in lesson 7.2.",
  practiceTask: {
    title: "Tycoon skeleton and manual test (~30 min)",
    difficulty: "intermediate",
    description: `### Part A - Plot and flow (10 min)
1. Create Plot with Floor and three low Walls.
2. Place Dropper so it is visible from Spawn.
3. Add a separate Mouth above the open start of the route.

### Part B - Collector and structure (12 min)
1. Create Collector with CanCollide false and CanTouch true.
2. Add empty Plot/Drops.
3. Create Sign with text Dropper -> Drop -> Collector.
4. Check names and Anchored for all static parts.

### Part C - Geometry proof (8 min)
1. Create TestDrop about 2 studs in size.
2. Drop it from Mouth three times and fix the route.
3. Delete TestDrop and save **Lesson 7.1 - Tycoon Plot**.`,
    hints: [
      "Check the scene from character height, not only with a top-down camera.",
      "If the cube hits the body, lower Mouth and clear space under it.",
      "Collector must cross the trajectory even when CanCollide is off.",
      "An empty Folder Drops today is the correct result."
    ],
    optionalChallenge: "Add thin guides along the route and prove with three tests that they do not pinch the drop.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Which genre is built in lesson 7.1?",
        options: [
          "Tycoon",
          "Simulator",
          "Obby",
          "Arena"
        ],
        correctAnswer: 0,
        explanation: "The lesson opens the Tycoon module and builds its physical skeleton.",
      },
      {
        id: "q2",
        type: MC,
        question: "What is the main result of lesson 7.1?",
        options: [
          "Full economy with Coins",
          "Plot, Dropper, Mouth, Collector, Drops, and a manual test",
          "A shop with ten buttons",
          "Automatic drop spawn loop"
        ],
        correctAnswer: 1,
        explanation: "Today you need finished geometry without a loop or currency.",
      },
      {
        id: "q3",
        type: MC,
        question: "Which properties does Collector need?",
        options: [
          "CanCollide true, CanTouch false",
          "Anchored false, CanTouch false",
          "CanCollide false, CanTouch true",
          "Transparency 1, CanTouch false"
        ],
        correctAnswer: 2,
        explanation: "The drop passes through the sensor, and future Touched stays available.",
      },
      {
        id: "q4",
        type: MC,
        question: "Where should Folder Drops live?",
        options: [
          "Inside SurfaceGui",
          "In ServerScriptService",
          "Inside Sign TextLabel",
          "Inside Model Plot with Dropper and Collector"
        ],
        correctAnswer: 3,
        explanation: "Drops belongs to the plot scene so trim and plot clones see one container.",
      },
      {
        id: "q5",
        type: MC,
        question: "Why do you need a separate Part Mouth?",
        options: [
          "To change Coins",
          "To have an exact drop spawn point",
          "To replace Floor",
          "To block Collector"
        ],
        correctAnswer: 1,
        explanation: "The next Script will take Mouth position to spawn the drop.",
      },
      {
        id: "q6",
        type: MC,
        question: "What should you do with TestDrop?",
        options: [
          "Leave Anchored true",
          "Hide it inside DropperBody",
          "Drop it three times from Mouth and delete it after the test",
          "Turn it into Collector"
        ],
        correctAnswer: 2,
        explanation: "A repeated physics test proves geometry, then the test object is removed.",
      },
      {
        id: "q7",
        type: MC,
        question: "What should you not add today?",
        options: [
          "Coins and an automatic loop",
          "Low Walls",
          "Sign with an arrow",
          "Empty Folder Drops"
        ],
        correctAnswer: 0,
        explanation: "Economy and automatic spawning are outside the scope of 7.1.",
      },
      {
        id: "q8",
        type: MC,
        question: "Which text best explains the flow on Sign?",
        options: [
          "Press for Power",
          "Buy a new island",
          "Collect 100 Coins",
          "Dropper -> Drop -> Collector"
        ],
        correctAnswer: 3,
        explanation: "The text exactly matches the visible physical route in this lesson.",
      },
      {
        id: "q9",
        type: MC,
        question: "Why leave the front of the Plot open?",
        options: [
          "So Floor can move",
          "So Collector loses CanTouch",
          "So the player can see and visit the factory",
          "So Mouth becomes unanchored"
        ],
        correctAnswer: 2,
        explanation: "An open side improves entry, camera, and flow readability.",
      },
      {
        id: "q10",
        type: MC,
        question: "What does a cube hanging in the air during the test mean?",
        options: [
          "Collector is too transparent",
          "TestDrop still has Anchored true",
          "Folder Drops is empty",
          "Walls are too low"
        ],
        correctAnswer: 1,
        explanation: "An unanchored Part should fall under physics.",
      },
      {
        id: "q11",
        type: MC,
        question: "Which structure is correct?",
        options: [
          "Workspace/Mouth/Drops/Plot",
          "Collector/Workspace/Dropper",
          "SurfaceGui/Floor/Walls",
          "Workspace/Plot with Dropper/Mouth, Collector, and Drops"
        ],
        correctAnswer: 3,
        explanation: "The whole factory skeleton lives in Plot with stable names.",
      },
      {
        id: "q12",
        type: MC,
        question: "What if the drop stops before Collector?",
        options: [
          "Widen or move Collector onto the trajectory",
          "Add Coins into TestDrop",
          "Delete Floor",
          "Turn CanCollide on for Mouth"
        ],
        correctAnswer: 0,
        explanation: "The sensor must actually cross the drop path.",
      },
      {
        id: "q13",
        type: MC,
        question: "Which statement about the Coins habit is correct?",
        options: [
          "Coins today change Sign",
          "Collector already awards Coins with no Script",
          "The server habit from Simulator will matter later, but there are no Coins today",
          "Mouth stores Coins in Position"
        ],
        correctAnswer: 2,
        explanation: "The architecture rule stays, but the economy is not implemented yet.",
      },
      {
        id: "q14",
        type: MC,
        question: "What is the exact Save name?",
        options: [
          "Lesson 7.1 - Dropper Loop",
          "Tycoon Plot Final Copy",
          "Lesson 7.2 - Dropper Config",
          "Lesson 7.1 - Tycoon Plot"
        ],
        correctAnswer: 3,
        explanation: "The checklist requires the name Lesson 7.1 - Tycoon Plot.",
      },
      {
        id: "q15",
        type: MC,
        question: "What will the next lesson 7.2 add?",
        options: [
          "A new Obby genre",
          "A server drop spawn loop with Config",
          "Final Ship Simulator",
          "Collector Coins without drops"
        ],
        correctAnswer: 1,
        explanation: "7.2 automates the already tested scene with a server loop and Config.",
      }
    ],
  },
};

export const enLesson72 = {
  lessonId: "lesson-roblox-7-2",
  moduleId: "module-07",
  order: 2,
  title: "7.2 - Dropper while/for + Config",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Run a server while or for that spawns Drop from Mouth",
    "Keep interval, payout, and maxAlive in one DropperConfig",
    "Read Config.interval on every iteration so pace can change",
    "Limit live Drop count via lifetime or trimming oldest by SpawnedAt",
    "Prepare Attribute Payout and plot structure for the collector in 7.3"
  ],
  theory: {
    sections: [
      {
        title: "Today's mission (lesson 50 of 92)",
        content: `In 7.1 you built the Tycoon skeleton: Plot, Dropper with Mouth, Collector, and Folder Drops. Today the scene gets a motor. You do not add Coins and you do not write a shop. Your job is for the server to rhythmically throw Parts from Mouth, with pace numbers living in Config.
In 7.3 Collector will read Attribute Payout and add Coins. So today payout must already sit on every Drop, even if the cash register is still silent.

| Was in 7.1 | Becomes in 7.2 |
|------------|------------|
| Manual Clone | Automatic loop |
| Numbers in your head | DropperConfig |
| Empty Drops | Live Parts with a limit |
| Static Mouth | Spawn point for while |

Yesterday you placed the conveyor. Today you turn the belt on.

**Do now (3 min):** open the Plot from 7.1 and write starting numbers interval=2, payout=5, maxAlive=30.`,
      },
      {
        title: "Config is the factory control panel",
        content: `Without Config you cannot upgrade pace tomorrow. Scattered wait(2) and magic 5 values across Scripts turn balance into a lottery.

\`local DropperConfig = {interval = 2, payout = 5, maxAlive = 30, lifetime = 20}\`

Return that table from a ModuleScript, and connect it once in DropperService via require. That is one source of truth.

| Field | Why |
|------|--------|
| interval | Pause between drops |
| payout | Value for Attribute and future Coins |
| maxAlive | Cap on live Parts in Drops |
| lifetime | How many seconds a Drop lives if not collected |

Do not duplicate these numbers as literals in spawnDrop. The function reads Config. In 7.4 and 7.6 you will change these fields. If interval=2 in ModuleScript but the loop has wait(1), playtest lies: the mentor tweaks Config and the factory ignores it.

Put the ModuleScript in ReplicatedStorage or ServerStorage and require only from a server Script. Do not copy the table by hand into three files "just in case". One copy, one truth. Before playtest open the Module and read the numbers aloud: that is your contract with the demo.

Image: Config is like a machine panel. Speed and batch size turn here, not inside the motor.

**Do now (4 min):** create DropperConfig and require it from a ServerScriptService Script.`,
      },
      {
        title: "while as a motor, not a hang",
        content: `The loop must run on the server. LocalScript cannot be the only factory motor: other players will not see the truth, and cheating gets easier.

\`task.spawn(function() while running do spawnDrop() task.wait(DropperConfig.interval) end end)\`

task.spawn is needed so while does not block the rest of the Script at start. Before launch set running = true, and to stop flip the flag to false when the plot turns off or on PlayerRemoving.

| Good | Bad |
|-------|--------|
| wait(Config.interval) | while true with no wait |
| running flag | Delete Workspace to stop |
| Server Script | LocalScript as the only factory |
| Read interval every time | local w = interval once before while |

A for loop is useful for a finite teaching series: it repeats spawnDrop a set number of times and waits the current interval after each call. For a live plot, while is better because the factory should run while the plot exists, not exactly N times.

Before the first run, confirm Mouth and Drops are already found via WaitForChild. If the Script starts before the build, the loop may crash or create Parts in the wrong place. One precise Mouth wait saves half an hour of debug.

while without wait is like a gas pedal with no brakes.

**Do now (5 min):** run the loop for 20 s and confirm Parts appear from Mouth.`,
      },
      {
        title: "Read interval on every iteration",
        content: `Upgrades in 7.4 will change pace during play. If you read interval once before while, the dropper ignores new values until the Script restarts.

The correct loop passes DropperConfig.interval into task.wait on every iteration. The wrong version copies interval into a local pause once before while, so future upgrades do not affect pace.

| Scenario | Expectation |
|----------|------------|
| Changed interval 2 -> 0.8 in Play | Next pause is shorter |
| Changed payout | New Drops get the new Attribute |
| Restored interval 2 | Pace is calm again |
| Left debug 0.05 | FPS and balance lie; restore before Save |

During testing you can temporarily speed up, but before handoff restore the teaching 1.5-3 s. Otherwise 7.3 and 7.6 get a flood instead of a rhythm. Record "was / became" like Simulator balance: interval 2 -> 0.8, noticeably more Parts in 10 s. That is the lesson proof.

If pace does not change, look for a hardcoded wait next to Config. Sometimes learners read Config for payout but leave interval as a literal. Check both lines in one pass.

The main rule here is simple: the conveyor listens to the panel every time it takes a step.

**Do now (4 min):** during Play change interval and show that pace changed without Stop.`,
      },
      {
        title: "spawnDrop from Mouth into Drops",
        content: `The function should take concrete plot references, not search Parts across all of Workspace.

\`drop:SetAttribute("Payout", DropperConfig.payout)\`

\`drop:SetAttribute("SpawnedAt", os.clock())\`

Mouth from 7.1 is the CFrame point. Folder Drops is the container for trim and for the mentor. Attribute Payout prepares the collector in 7.3: it will read value without guessing.

| Drop field | Why |
|-----------|--------|
| Anchored false | Falls with physics |
| Parent = Drops | Easy to count and clean |
| Payout Attribute | Future Coins |
| SpawnedAt | Fair choice of oldest |

Do not clone a template with a random Script inside a hundred times. For handoff a simple Part is enough. If you really want a model, clone a clean template with no nested Scripts and set Parent to Drops right away.

Check Size: 1×1×1 reads well and rarely gets stuck. A drop that is too large breaks the rails from 7.1 and looks like debris, not product. Color can be bright for debug; mute it later.

Mouth is the crane. Drops is the crate under the crane.

**Do now (8 min):** write spawnDrop(mouth, folder) and call it from the loop.`,
      },
      {
        title: "Anti-lag: lifetime and fair trim",
        content: `Without a limit, while fills the map in 2 minutes. There are two reliable approaches, and you can combine them.

**Lifetime:** after spawn, use task.delay to plan deletion after DropperConfig.lifetime. Before Destroy, check that drop still has a Parent, because Collector may remove it earlier.

**Age trim:** do not trust the first GetChildren element as oldest. Child order in Roblox does not guarantee FIFO. Start with oldestTime = math.huge, walk all objects, and compare Attribute SpawnedAt:

\`for _, item in folder:GetChildren() do local stamp = item:GetAttribute("SpawnedAt"); if stamp and stamp < oldestTime then oldest, oldestTime = item, stamp end end\`

After the for, call Destroy only on the found oldest. If count still exceeds maxAlive, repeat the search for the next oldest object.

| Approach | Plus | Minus |
|--------|------|-------|
| lifetime | Simple and predictable | May delete a Drop near Collector |
| trim by SpawnedAt | Holds the maxAlive ceiling | Needs Attribute and sort |
| First GetChildren element | Looks short | May destroy a fresh Drop |

Call trim after spawn. A 30 s playtest should not produce hundreds of Parts.

Anti-lag is a fuse that keeps the factory from burning on its own pace.

**Do now (5 min):** add lifetime or trim and run 30 s with a child count in Drops.`,
      },
      {
        title: "Path physics still comes from 7.1",
        content: `If Parts fly into the void, check the build first, not Config. interval and payout will not raise a rail.

| Symptom | Where to look |
|---------|-----------|
| All Drops in the void | Mouth, Walls, Floor from 7.1 |
| Parts stuck in the body | Is Mouth pushed outward? |
| Nothing reaches Collector | Distance / ramp / Velocity |
| Flood of Parts | maxAlive / lifetime |
| Loop is silent | running, Output, WaitForChild Mouth |

Optionally add a light AssemblyLinearVelocity toward Collector, but do not spend an hour on perfect ballistics. For handoff a stable rhythm and most Parts near the zone is enough.

Gravity plus rails is often simpler than Tween. Tween helps when you need a perfectly straight chute without physics. Do not spend the lesson on complex ballistics with three Vector3 values: first get most Drops near Collector.

If Mouth faces into the Dropper wall, Parts spawn inside the body and explode outward chaotically. Pull Mouth 1-2 studs forward and retest. Often that is enough for a predictable trajectory.

Debug image: if the conveyor spills past the crate, move the crate and chute, not the motor speed.

**Do now (4 min):** stand 20 s near Collector and count how many Drops arrive close to the zone.`,
      },
      {
        title: "startDropper(plot) for future 7.5",
        content: `Even with one plot, write code as if there will be several. A global while over all of Workspace makes cloning harder.

startDropper takes plot, finds its Mouth and Drops, creates a local running flag, and starts a separate task. On each iteration it calls spawnDrop, trimDrops, and task.wait with the current interval. The returned stop callback flips only the local running.

The returned stop callback matters when the plot disappears or the player leaves. Names from 7.1 are critical here: path plot/Dropper/Mouth and child Drops must exist. If the path differs, fix names now instead of masking them with a long Workspace search.

| Habit today | Win in 7.5 |
|-----------------|--------------|
| startDropper(plot) | A clone gets its own motor |
| Local running | Stop one plot only |
| Mouth/Drops names | No random FindFirstChild |
| External Config | All plots read the same catalog |

Do not store running in a module global if you plan multiple plots. Otherwise turning one plot off stops all of them. A local flag in the startDropper closure protects against that trap before clones exist.

A plot function is like an outlet per plot, not one cable for the whole shop floor.

**Do now (5 min):** move the loop into startDropper(plot) and confirm Stop via the flag works.`,
      },
      {
        title: "Dropper playtest",
        content: `Fill the table before changing dozens of settings.

| # | Action | Expectation | Fact |
|---|-----|------------|------|
| 1 | Play | A Drop appears after interval | |
| 2 | Wait 30 s | Children in Drops <= maxAlive | |
| 3 | interval 2 -> 0.8 | Pace speeds up | |
| 4 | New Drop | Attribute Payout = Config | |
| 5 | Path | Most Parts are not in the void | |
| 6 | running = false | New Drops stop | |
| 7 | Output | No red spam | |

If row 5 is red, go back to 7.1. If row 2 is red, fix anti-lag first, then number balance.

Do not leave interval=0.05 in the final Save. Restore a calm teaching pace and write it in a note next to the Place.

Playtest is a stopwatch by the conveyor, not a hallway impression.

**Do now (6 min):** walk rows 1-4 and put facts in the table.`,
      },
      {
        title: "Preparing the 7.3 cash register",
        content: `Tomorrow Collector will touch Drop and must know the amount. Today you only guarantee the data.

| Today | Tomorrow in 7.3 |
|----------|--------------|
| Attribute Payout on Drop | Read and add to Coins |
| Server spawn | Server Touched collector |
| One Config.payout | Upgrades will change payout |
| Drops folder | Easy to find live Parts |
| No LocalScript Coins | Same discipline as Sim |

Do not award Coins inside spawnDrop "for testing". That mixes responsibilities and ruins the cash-register lesson. For debug, one print of the new drop Payout is enough, then remove it.

The link to Simulator stays architectural: the server owns value, Config holds numbers, and the client later only shows HUD.

Image: today the boxes already have price tags; tomorrow the register opens.

**Do now (3 min):** collect 5 Drops and check Attribute Payout in Properties on each.`,
      },
      {
        title: "Handoff checklist for lesson 50",
        content: `- [ ] DropperConfig with interval, payout, maxAlive
- [ ] Server while/for with task.wait(Config.interval) on every iteration
- [ ] spawnDrop from Mouth into Folder Drops
- [ ] Attribute Payout and SpawnedAt on Drop
- [ ] lifetime or trim by SpawnedAt, not the first GetChildren element
- [ ] Changing interval in Play changes pace
- [ ] 30 s without flooding Workspace
- [ ] Save: Lesson 7.2 - Dropper Config

Next, **7.3** teaches Collector to put payout into leaderstats. If today Parts do not reach the zone or Config is scattered across Scripts, the register gets chaos instead of rhythm.

**Do now (3 min):** restore teaching interval, run 20 s, and save the Place under the exact name.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "while true without task.wait",
      explanation: "The server Script hangs or lags, and Parts appear in uncontrolled bursts.",
      correctApproach: "Always wait DropperConfig.interval inside the loop.",
    },
    {
      mistake: "interval read once before while",
      explanation: "Changing Config or a future upgrade does not change pace until Script restart.",
      correctApproach: "Call task.wait(DropperConfig.interval) on every iteration.",
    },
    {
      mistake: "Destroy the first GetChildren element without sorting",
      explanation: "Child order does not guarantee FIFO, so you can delete a fresh Drop and leave older ones.",
      correctApproach: "Compare Attribute SpawnedAt or use lifetime Destroy.",
    },
    {
      mistake: "interval and payout numbers hardcoded in several Scripts",
      explanation: "Balance and upgrades become a lottery because you change one place and forget another.",
      correctApproach: "Keep all working numbers in one DropperConfig.",
    },
    {
      mistake: "The loop runs only in LocalScript",
      explanation: "Other clients do not see a shared factory truth, and the economy becomes vulnerable.",
      correctApproach: "Run the dropper on the server from a concrete plot.",
    },
    {
      mistake: "No maxAlive and no lifetime",
      explanation: "In a minute Workspace fills with Parts, FPS drops, and playtest becomes impossible.",
      correctApproach: "Limit live Drops and remove stale ones after spawn.",
    }
  ],
  summary: "You brought the Tycoon dropper to life with a server loop and DropperConfig: Parts fall from Mouth on interval, carry Payout, and do not flood the map. The conveyor is ready to hand value to the collector in 7.3.",
  practiceTask: {
    title: "Dropper conveyor (~30 min)",
    difficulty: "intermediate",
    description: `### Part A - Config (6 min)
1. Create DropperConfig with interval, payout, maxAlive, lifetime.
2. Connect it from a server Script with one require or table.

### Part B - Loop and spawn (16 min)
1. Write startDropper(plot) with while running and task.spawn.
2. spawnDrop places a Part at Mouth, Attribute Payout and SpawnedAt, Parent = Drops.
3. Add lifetime or trim by SpawnedAt.
4. Read Config.interval on every iteration.

### Part C - Test (8 min)
1. Change interval in Play and show the new pace.
2. Run 30 s without flooding Drops.
3. Save the Place as **Lesson 7.2 - Dropper Config**.`,
    hints: [
      "Hardcode wait(2) first, then replace with Config.interval.",
      "print(\"drop\", os.clock()) helps you see the rhythm.",
      "If Parts are in the void, go back to rails and Mouth from 7.1.",
      "Do not leave interval=0.05 in the final Save."
    ],
    optionalChallenge: "Make Drop color a bit brighter at higher payout, but still take the value only from Config.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "What is the main artifact of lesson 7.2?",
        options: [
          "Server dropper loop with DropperConfig and anti-lag",
          "A full purchase shop with no dropper",
          "Only a new Floor color",
          "LocalScript that writes Coins itself"
        ],
        correctAnswer: 0,
        explanation: "The lesson brings the conveyor to life with Config and while on the server.",
      },
      {
        id: "q2",
        type: MC,
        question: "Where should the dropper while run?",
        options: [
          "Only in LocalScript as the sole truth",
          "On the server from a concrete plot",
          "In Collector TextLabel",
          "In Sign with no Script"
        ],
        correctAnswer: 1,
        explanation: "The factory belongs to the server.",
      },
      {
        id: "q3",
        type: MC,
        question: "Why DropperConfig.interval?",
        options: [
          "To replace Mouth",
          "To turn Collector off",
          "To control the pause between drops from one place",
          "To create leaderstats"
        ],
        correctAnswer: 2,
        explanation: "Interval sets the conveyor rhythm.",
      },
      {
        id: "q4",
        type: MC,
        question: "How should you wait between drops if pace upgrades are needed?",
        options: [
          "Store interval in local once before while",
          "Remove wait completely",
          "Wait a random number with no Config",
          "Call task.wait(DropperConfig.interval) on every iteration"
        ],
        correctAnswer: 3,
        explanation: "The new value is picked up on the next pause.",
      },
      {
        id: "q5",
        type: MC,
        question: "Why is it unsafe to immediately delete the first element after GetChildren()?",
        options: [
          "Because Destroy is forbidden for Part",
          "Because child order does not guarantee the first element is oldest",
          "Because Folder Drops cannot have children",
          "Because Config is then deleted"
        ],
        correctAnswer: 1,
        explanation: "You need SpawnedAt or lifetime, not a blind index.",
      },
      {
        id: "q6",
        type: MC,
        question: "Why Attribute Payout on Drop already in 7.2?",
        options: [
          "To replace Floor",
          "To turn gravity off",
          "So Collector in 7.3 knows how much to add to Coins",
          "So LocalScript can change Config"
        ],
        correctAnswer: 2,
        explanation: "Payout prepares the server cash register for the next lesson.",
      },
      {
        id: "q7",
        type: MC,
        question: "Why task.spawn around while?",
        options: [
          "So an infinite loop does not block the rest of the Script",
          "To delete DropperConfig",
          "So Parts become Anchored",
          "So Collector spawns Drop itself"
        ],
        correctAnswer: 0,
        explanation: "The motor runs in parallel with startup logic.",
      },
      {
        id: "q8",
        type: MC,
        question: "What if Drops fall into the void?",
        options: [
          "Immediately multiply payout by one hundred",
          "Move the loop into LocalScript",
          "Delete maxAlive",
          "First check Mouth, Floor, and Walls from 7.1"
        ],
        correctAnswer: 3,
        explanation: "Geometry often matters more than Config numbers.",
      },
      {
        id: "q9",
        type: MC,
        question: "Why maxAlive or lifetime?",
        options: [
          "To automatically build a second plot",
          "To replace Mouth names",
          "So you do not flood Workspace and kill FPS",
          "So Sign writes Config itself"
        ],
        correctAnswer: 2,
        explanation: "Anti-lag keeps playtest alive.",
      },
      {
        id: "q10",
        type: MC,
        question: "How do you safely stop the dropper?",
        options: [
          "Delete all of Workspace",
          "Set running = false and leave the while",
          "Make while true faster",
          "Turn only Baseplate off"
        ],
        correctAnswer: 1,
        explanation: "A stop flag ends the loop in a controlled way.",
      },
      {
        id: "q11",
        type: MC,
        question: "Why is startDropper(plot) better than a global Parts search?",
        options: [
          "Because Roblox forbids Dropper names",
          "Because Config only works inside a Model with no function",
          "Because Mouth cannot have CFrame",
          "Because then it is easier to clone a plot and give it its own motor in 7.5"
        ],
        correctAnswer: 3,
        explanation: "Local plot references scale to multiple players.",
      },
      {
        id: "q12",
        type: MC,
        question: "What should you check after changing interval in Play?",
        options: [
          "Whether new Drop pace changed on following iterations",
          "Whether Sky color changed",
          "Whether Sign deleted itself",
          "Whether Floor became Unanchored"
        ],
        correctAnswer: 0,
        explanation: "Proof of a live Config is a visible new rhythm.",
      },
      {
        id: "q13",
        type: MC,
        question: "What should you not do in spawnDrop today?",
        options: [
          "Set Attribute Payout",
          "Parent Drop into Folder Drops",
          "Award Coins directly \"for testing\"",
          "Read DropperConfig.payout"
        ],
        correctAnswer: 2,
        explanation: "The cash register arrives in 7.3; today we prepare data, not the economy.",
      },
      {
        id: "q14",
        type: MC,
        question: "What is the minimum Config field set needed for handoff?",
        options: [
          "Only Floor Color3",
          "50 required shop fields",
          "Empty table with no numbers",
          "interval and payout, preferably also maxAlive or lifetime"
        ],
        correctAnswer: 3,
        explanation: "Rhythm, value, and flood protection are the base of the lesson.",
      },
      {
        id: "q15",
        type: MC,
        question: "What is the exact Save name for lesson 50?",
        options: [
          "Lesson 7.1 - Tycoon Plot",
          "Lesson 7.2 - Dropper Config",
          "Lesson 7.3 - Collector Coins",
          "Dropper Draft Final"
        ],
        correctAnswer: 1,
        explanation: "The checklist requires Save Lesson 7.2 - Dropper Config.",
      }
    ],
  },
};

export const enLesson73 = {
 lessonId: "lesson-roblox-7-3",
 moduleId: "module-07",
 order: 3,
 title: "7.3 - Purchases + leaderstats",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Have Coins in leaderstats and change them only on the server",
 "Make a purchase via Prompt or SurfaceGui with an if canAfford check",
 "Deduct coins before or while granting the upgrade or item",
 "Add debounce so a double click does not buy twice",
 "Prepare the wallet for upgrades from a table (7.4)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 51 of 92)",
 content: `In **7.1-7.2** the dropper and collector can already fill the world with parts/coins. Today the **cash register** appears: leaderstats Coins + a purchase with an "enough money" check.
1. Folder \`leaderstats\` with IntValue \`Coins\` for each Player (server).
2. Collector (or a test) adds Coins **on the server**.
3. Purchase button/Prompt: \`if coins >= price then\` deduct.
4. Debounce / "in progress" so a purchase is not doubled.
5. A denial message when money is short.

Without canAfford, 7.4-7.8 become buttons with empty promises.

**Do now (2 min):** write a test price for the first purchase (for example 25) and make sure you know where coins come from now. If there are no coins yet, make a temporary server +50 to test the register, then return to honest collection.`,
 },
 {
 title: "leaderstats is the TAB wallet",
 content: `| Object | Role |
|--------|------|
| Folder \`leaderstats\` | Roblox standard for TAB |
| IntValue \`Coins\` | Player balance |
| Server | Only writer of Value |

\`local folder = Instance.new("Folder")\`
\`folder.Name = "leaderstats"\`
\`folder.Parent = player\`
\`local coins = Instance.new("IntValue")\`
\`coins.Name = "Coins"\`
\`coins.Value = 0\`
\`coins.Parent = folder\`

TAB is a **scoreboard**. The judge (server) turns the board. A spectator with a phone does not get to add goals.

LocalScript may **read** Coins for UI. Do not treat \`Coins.Value = 9999\` on the client as a handoff.

Standard server template (ServerScriptService):

\`Players.PlayerAdded:Connect(function(player)\`
\` local folder = Instance.new("Folder")\`
\` folder.Name = "leaderstats"\`
\` folder.Parent = player\`
\` local coins = Instance.new("IntValue")\`
\` coins.Name = "Coins"\`
\` coins.Value = 0\`
\` coins.Parent = folder\`
\`end)\`

If a player is already in the game during a test, restart Play or add the same block for existing \`Players:GetPlayers()\`. Without that, TAB is empty even when the collector "seems to work" in Output.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Collection → Coins on the server",
 content: `In collector Touched (server):

\`local player = Players:GetPlayerFromCharacter(hit.Parent)\`
\`if not player then return end\`
\`local coins = player:FindFirstChild("leaderstats") and player.leaderstats:FindFirstChild("Coins")\`
\`if not coins then return end\`
\`coins.Value += payout\`
\`hit:Destroy() -- if this is a drop Part\`

Debounce: one Part = one payout; or a cooldown on player.

Check TAB: the number grows. If only a client TextLabel grows and TAB stays still, you are not in leaderstats yet.

Quick debug: after \`coins.Value += payout\` in the collector, add \`print(player.Name, "coins", coins.Value)\`. Output should match TAB. If print appears but TAB does not, you are writing the wrong IntValue (for example a copy in Character instead of player).

**Do now (8 min):** +Coins from collection is visible in TAB.`,
 },
 {
 title: "canAfford is a simple if",
 content: `\`local price = 25 -- tomorrow from Config\`

\`local function canAfford(player, price)\`
\` local coins = player.leaderstats.Coins\`
\` return coins.Value >= price\`
\`end\`

\`local function tryBuy(player, price)\`
\` local coins = player.leaderstats.Coins\`
\` if coins.Value < price then\`
\` return false, "Not enough coins"\`
\` end\`
\` coins.Value -= price\`
\` return true, "Purchased"\`
\`end\`

Order: check → deduct → effect (upgrade).  
Do not grant the effect before deducting without error protection.

Price can be a constant for now; in 7.4 it moves into a table.

**Do now (4 min):** try a purchase with 0 coins and after a successful purchase, check TAB/Output.`,
 },
 {
 title: "Prompt or SurfaceGui as the register",
 content: `| Option | Plus | Minus |
|---------|------|-------|
| **ProximityPrompt** | Fast, "E to buy" | Less room for a list |
| **SurfaceGui button** | Price visible on the Part | A bit more UI |
| ScreenGui shop | Flexible | Longer to assemble |

For a tycoon, a Prompt on a plot button is common:

\`prompt.ActionText = "Buy (+speed)"\`
\`prompt.ObjectText = "25 coins"\`

\`prompt.Triggered:Connect(function(player)\`
\` -- tryBuy on the server\`
\`end)\`

If Prompt is in LocalScript, final deduct still happens on the server (Remote or server Prompt handler).

Prompt hint must match the server price: \`ObjectText = price .. " coins"\`, where \`price\` is the same constant as in \`tryBuy\`. If the label says "25" and the server deducts 50, the player stops trusting the register.

**Do now (5 min):** put a Prompt on a plot button and confirm Triggered in Output.`,
 },
 {
 title: "Denial and success feedback",
 content: `The player must understand the result:
- success: short print / Billboard "Purchased!" / sound;
- denial: "Need X more coins".

\`local ok, msg = tryBuy(player, price)\`
\`-- FireClient(player, ok, msg) or StatusLabel\`

Without feedback the button feels "dead" even when canAfford worked correctly.

Do not spam messages every frame, only on Triggered.

Denial message with the difference:

\`local need = price - coins.Value\`
\`return false, "Need " .. need .. " more coins"\`

The player sees how much is missing instead of a mysterious "no".

**Do now (4 min):** buy with 0 coins. Output/Status should show denial with the need number.`,
 },
 {
 title: "Purchase debounce",
 content: `\`local busy = {}\`

\`local function tryBuySafe(player, price)\`
\` if busy[player] then return false, "Wait" end\`
\` busy[player] = true\`
\` local ok, msg = tryBuy(player, price)\`
\` task.delay(0.4, function() busy[player] = nil end)\`
\` return ok, msg\`
\`end\`

Otherwise double E / double click deducts 2× price or grants 2 effects.

PlayerRemoving: \`busy[player] = nil\`.

Debounce test: press E 5 times quickly. There should be one deduct and one effect. If you see "Wait", debounce works; if TAB drops by 2× price, lengthen the delay or check that \`busy\` clears.

**Do now (4 min):** double-click the Prompt; only one purchase.`,
 },
 {
 title: "What the client may show",
 content: `| OK on client | NOT ok |
|---------------|------|
| Read Coins for TextLabel | Coins.Value = … |
| Open the shop panel | "Server said I am rich" without a check |
| FireServer("buyBasic") | FireServer(price=1) as truth |
| Button animation | Grant upgrade only locally |

After server deduct, leaderstats replicates. UI updates itself if it listens to \`.Changed\`.

\`coins:GetPropertyChangedSignal("Value"):Connect(function()\`
\` label.Text = "Coins: " .. coins.Value\`
\`end)\`

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Mini cash-register test without a full upgrade",
 content: `If 7.4 is not ready yet, a purchase can:
- deduct coins;
- set Attribute \`BoughtTest = true\`;
- change the button color.

The main goal today is the **money** path. Deepen the dropper effect tomorrow with a table.

But even now it is better to call a stub \`applyUpgradeStub()\` so a place for the effect exists.

**Do now (4 min):** change one value in table/Config and confirm the new behavior.`,
 },
 {
 title: "Purchase playtest",
 content: `| # | Action | Expectation |
|---|-----|------------|
| 1 | Join | leaderstats.Coins = 0 (or start) |
| 2 | Collect | Coins grow in TAB |
| 3 | Buy with no money | Denial, Value does not go negative |
| 4 | Save up and buy | Deduct exactly price |
| 5 | Double click | Not 2 purchases |
| 6 | Client Coins=9999 | Not a valid handoff; server ignores |
| 7 | Output | Clean |

Rows 3-5 are the heart of the lesson.

**Do now (5 min):** walk the test table once and record pass/fail for each row.`,
 },
 {
 title: "Typical cash-register holes",
 content: `| Symptom | Fix |
|---------|------|
| TAB does not change | Writing not to leaderstats / not on server |
| Negative coins | canAfford skipped |
| Double purchase | busy debounce |
| Price only on client | Duplicate check on server |
| Collector pays for every Part | Filter player + debounce |

**Do now (5 min):** intentionally buy with 0 coins; you should see denial.`,
 },
 {
 title: "Handoff checklist for lesson 51",
 content: `- [ ] leaderstats.Coins on the server
- [ ] Collection adds Coins in TAB
- [ ] tryBuy / canAfford
- [ ] Deduct on success
- [ ] Denial without going negative
- [ ] Purchase debounce
- [ ] Prompt or GUI register
- [ ] Save: Lesson 7.3 - Buys Leaderstats

**Do now (3 min):** walk the checklist and check only items you actually completed.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Coins.Value on the client",
 explanation: "Cheating and TAB desync.",
 correctApproach: "Only the server writes leaderstats",
 },
 {
 mistake: "No canAfford",
 explanation: "Purchases go negative or happen with no money.",
 correctApproach: "if Value >= price",
 },
 {
 mistake: "Effect before deduct without protection",
 explanation: "Free upgrades on errors.",
 correctApproach: "Deduct then effect (atomically)",
 },
 {
 mistake: "Double Triggered",
 explanation: "Two prices for one intent.",
 correctApproach: "busy debounce",
 },
 {
 mistake: "UI Coins lies, TAB differs",
 explanation: "Two sources of truth.",
 correctApproach: "UI listens to leaderstats",
 },
 {
 mistake: "Price only in Prompt text",
 explanation: "Server does not know how much to deduct.",
 correctApproach: "Constant/Config on the server",
 }
 ],
 summary: "You built the tycoon cash register: leaderstats Coins, server collection, canAfford, and deduct with debounce. The wallet is ready for table upgrades and purchases on your own plot.",
 practiceTask: {
 title: "Tycoon cash register (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** collect coins into TAB and buy with a canAfford check.

### Part A - leaderstats (8 min)
1. Folder + Coins IntValue on PlayerAdded.
2. Collector += on the server.
3. TAB shows growth.

### Part B - tryBuy (14 min)
1. canAfford + deduct.
2. Prompt or SurfaceGui Triggered on the server.
3. Debounce busy.
4. ok/deny messages.

### Part C - Playtest (8 min)
1. No money: denial.
2. With money: deduct.
3. **Save:** Lesson 7.3 - Buys Leaderstats`,
 hints: [
 "First let the button only deduct and recolor a Part; dropper effect comes tomorrow",
 "print(coins.Value) before and after",
 "Do not trust client Value"
 ],
 optionalChallenge: "StatusLabel listens to Coins.Changed and always shows the balance.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 7.3?",
 options: [
          "Build leaderstats Coins and a purchase with canAfford",
          "Delete the dropper",
          "Build Arena Remote",
          "Publish with no TAB"
        ],
 correctAnswer: 0,
 explanation: "Cash register + purchases.",
 },
 {
 id: "q2",
 type: MC,
 question: "Who should write Coins.Value?",
 options: [
          "Only LocalScript as truth",
          "Server",
          "Lighting",
          "Skybox"
        ],
 correctAnswer: 1,
 explanation: "Server wallet.",
 },
 {
 id: "q3",
 type: MC,
 question: "What does canAfford check?",
 options: [
          "Whether Sky exists",
          "Whether a Tool in hand is required",
          "Whether Coins.Value >= price",
          "Whether the player opened Explorer"
        ],
 correctAnswer: 2,
 explanation: "Enough coins.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why debounce on purchase?",
 options: [
          "It replaces leaderstats",
          "debounce paints Terrain",
          "Required for Anchored",
          "A double click does not deduct twice"
        ],
 correctAnswer: 3,
 explanation: "Anti-spam for the register.",
 },
 {
 id: "q5",
 type: MC,
 question: "Where does the player see leaderstats?",
 options: [
          "Only in ServerStorage",
          "In TAB (leaderboard list)",
          "Only in the Baseplate name",
          "In SoundService"
        ],
 correctAnswer: 1,
 explanation: "TAB.",
 },
 {
 id: "q6",
 type: MC,
 question: "What to do when coins are short?",
 options: [
          "Always grant the upgrade",
          "Set Coins = -100",
          "Deny the purchase; do not go negative",
          "Delete the plot"
        ],
 correctAnswer: 2,
 explanation: "Deny.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why is Coins=9999 in LocalScript bad?",
 options: [
          "It is cheating and not server truth",
          "IntValue does not exist",
          "TAB is then faster",
          "Roblox requires exactly that"
        ],
 correctAnswer: 0,
 explanation: "Never trust client.",
 },
 {
 id: "q8",
 type: MC,
 question: "How should collector add coins?",
 options: [
          "Only into a client TextLabel",
          "Into Lighting Ambient",
          "Into the Prompt name",
          "On the server into player.leaderstats.Coins"
        ],
 correctAnswer: 3,
 explanation: "Server collection.",
 },
 {
 id: "q9",
 type: MC,
 question: "How does 7.3 prepare 7.4?",
 options: [
          "7.4 deletes Coins",
          "Table forbids canAfford",
          "The register is ready to take price from UpgradeConfig",
          "Upgrades no longer need money"
        ],
 correctAnswer: 2,
 explanation: "Wallet ready for the table.",
 },
 {
 id: "q10",
 type: MC,
 question: "ProximityPrompt.Triggered is handy to…",
 options: [
          "Replace MaxHealth",
          "Call a purchase attempt when the player confirms",
          "Create Humanoid",
          "Turn the dropper off forever"
        ],
 correctAnswer: 1,
 explanation: "Register on the plot.",
 },
 {
 id: "q11",
 type: MC,
 question: "What should happen to Coins after a successful purchase?",
 options: [
          "Value always +price",
          "leaderstats disappears",
          "Coins becomes a string",
          "Value decreases by price"
        ],
 correctAnswer: 3,
 explanation: "Deduct.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why listen to Coins.Changed on the client?",
 options: [
          "Update the balance label without lying in Value",
          "So the client can write Value",
          "Changed turns the server off",
          "It replaces canAfford"
        ],
 correctAnswer: 0,
 explanation: "UI display.",
 },
 {
 id: "q13",
 type: MC,
 question: "Is the tryBuy order logical?",
 options: [
          "Effect → then maybe deduct sometime",
          "Delete player first",
          "Check → deduct → effect",
          "Publish first"
        ],
 correctAnswer: 2,
 explanation: "Atomic register.",
 },
 {
 id: "q14",
 type: MC,
 question: "Which of these is a cash-register hole?",
 options: [
          "There is debounce",
          "Coins in leaderstats",
          "Denial when poor",
          "No canAfford check before deduct"
        ],
 correctAnswer: 3,
 explanation: "Required if.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the handed-off artifact for 7.3?",
 options: [
          "Theory only",
          "leaderstats + canAfford purchase + Save",
          "Empty Baseplate",
          "Client wallet with no server"
        ],
 correctAnswer: 1,
 explanation: "A cash register is required.",
 }
 ],
 },
}

export const enLesson74 = {
 lessonId: "lesson-roblox-7-4",
 moduleId: "module-07",
 order: 4,
 title: "7.4 - Upgrades from a table",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Describe all upgrades in one UpgradeConfig table (id, price, effect)",
 "Apply an upgrade only from table data after a successful purchase",
 "Show the upgrade list in UI (SurfaceGui / simple buttons / Frame)",
 "Avoid hardcoded prices and effects in 5 different scripts",
 "Prepare Config for price balancing and per-player plots"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 52 of 92)",
 content: `In **7.3** purchase already checks canAfford and deducts leaderstats. Today upgrades become **data in a table**, not copy-paste "if button A then price 50".
1. \`UpgradeConfig\` with at least **2** entries (id, price, effect fields).
2. \`applyUpgrade(player, id)\` reads only Config.
3. UI list / buttons are built from table keys (or labeled ids from Config).
4. After purchase, the dropper really changes interval or payout.

Without a table, 7.6 balance turns into hunting numbers across the whole Place.

**Do now (2 min):** name two upgrades, for example \`fasterDrop\` and \`morePay\`.`,
 },
 {
 title: "Why a table, not if-spaghetti",
 content: `| if button1 / button2 | UpgradeConfig table |
|---------------------|---------------------|
| Prices in 4 places | One source |
| New upgrade = new if | New row |
| Balance hurts | Balance = change a number |
| UI by hand | UI from key pairs |

Config is a **restaurant menu**. The kitchen (applyUpgrade) cooks only what is on the menu. The client orders \`id\`, not invents a recipe.

\`local UpgradeConfig = {\`
\` fasterDrop = { price = 50, interval = 1.2 },\`
\` morePay = { price = 80, payout = 10 },\`
\`}\`

When the mentor says "add a third upgrade", you add a row to the table and one button with Attribute. You do not open five scripts to find where "80" is hidden.

**Do now (4 min):** change price in one Config row and confirm the new price in UI without editing Prompt separately.`,
 },
 {
 title: "Upgrade entry fields",
 content: `| Field | Purpose |
|------|-------------|
| **price** | How much to take from Coins |
| **interval** | New dropper interval (if speed type) |
| **payout** | New payout per drop |
| **displayName** | Text in UI (optional) |
| **once** | Bought once (often true) |

Not every row needs every field. \`fasterDrop\` may have no payout.

Rule: the server **never** takes price from a client argument. The client sends \`id\` = \`"fasterDrop"\`.

Full row example:

\`fasterDrop = { price = 50, interval = 1.2, displayName = "Faster drop", once = true }\`

In UI you show \`displayName\`; in \`tryBuy\` you read \`cfg.price\`. If \`once = true\`, after purchase block repeats in \`owned\`.

**Do now (5 min):** add displayName to both Config rows and show them on the buttons.`,
 },
 {
 title: "applyUpgrade after canAfford",
 content: `Pseudo:

\`local function applyUpgrade(player, upgradeId)\`
\` local cfg = UpgradeConfig[upgradeId]\`
\` if not cfg then return false end\`
\` local state = getPlotState(player)\`
\` if state.owned[upgradeId] then return false end\`
\` if cfg.interval then state.interval = cfg.interval end\`
\` if cfg.payout then state.payout = cfg.payout end\`
\` state.owned[upgradeId] = true\`
\` return true\`
\`end\`

In purchase (from 7.3):

\`if coins < cfg.price then return end\`
\`coins -= cfg.price\`
\`applyUpgrade(player, id)\`

Money first, then effect, or the reverse with a rollback; the main point is atomic on the server without a double click.

If \`applyUpgrade\` returns false after deduct, refund coins:

\`coins.Value += cfg.price\`

Rarely needed for handoff, but the "rollback on error" pattern saves you when the dropper is not yet wired to state.

**Do now (6 min):** buy fasterDrop and print \`state.interval\` before/after; the number should change.`,
 },
 {
 title: "UI list from the table",
 content: `Options:
1. **Static buttons** with Attribute \`UpgradeId\` = Config key.
2. **Dynamic list**: for id, cfg in pairs(UpgradeConfig) create TextButton.

For SurfaceGui on the plot:

\`button:SetAttribute("UpgradeId", "fasterDrop")\`
\`priceLabel.Text = tostring(UpgradeConfig.fasterDrop.price) .. " coins"\`

Or at start, server/client sync labels from Config (you can send the client a safe copy without secrets; public prices are fine).

**Do now (10 min):** 2 buttons with id and price from the table, without hardcoding 50 in Prompt separate from Config.`,
 },
 {
 title: "Owned: buy once",
 content: `Most tycoon upgrades are one-time.

\`if state.owned[id] then\`
\` -- update UI "Purchased"\`
\` return\`
\`end\`

After purchase:
- change button text;
- or disable Prompt;
- or set color green.

Without owned, a double click (even with money debounce) can re-apply the effect and break balance if you reduce interval every time.

**Do now (4 min):** run one check from this section in Play and write the result in a Note.`,
 },
 {
 title: "Dropper reads state, not always Config directly",
 content: `Config = **catalog of options**.  
State = **what is already bought / which numbers are current**.

Dropper loop:

\`task.wait(state.interval)\`
\`drop(state.payout)\`

Take starting state.interval / payout from base constants or a separate \`BaseDropConfig\`.

Mistake: dropper always uses \`UpgradeConfig.fasterDrop.interval\` even before purchase, so the upgrade is "already on".

**Do now (4 min):** change one value in table/Config and confirm the new behavior.`,
 },
 {
 title: "ModuleScript UpgradeConfig",
 content: `Put the table in a ModuleScript (SSS or a place both the purchase server and, carefully, UI can require).

\`local UpgradeConfig = { ... }\`
\`return UpgradeConfig\`

Purchase server: \`require(...)\`  
If the client also requires for price labels, do not put secret fields there. For class, public prices are fine.

One require = one balance in 7.6.

Explorer structure:

\`ServerScriptService/UpgradeConfig (ModuleScript)\`
\`ServerScriptService/PlotManager (Script) → require UpgradeConfig\`

Do not put the Module in Workspace inside a template. After Clone you get copies with different require paths. One Module on the server = one truth for all plots.

**Do now (5 min):** change price in the Module, restart Play; UI and server should show the new number.`,
 },
 {
 title: "Link to Prompt / Remote",
 content: `Client:

\`BuyRE:FireServer("fasterDrop")\`

Server:

\`BuyRE.OnServerEvent:Connect(function(player, upgradeId)\`
\` if typeof(upgradeId) ~= "string" then return end\`
\` local cfg = UpgradeConfig[upgradeId]\`
\` if not cfg then return end\`
\` -- canAfford, deduct, applyUpgrade\`
\`end)\`

Do not trust \`FireServer(id, price)\` for price.

If you have no Remote yet, a server Prompt with Attribute id is also fine for the plot.

Test without Remote: on the button \`SetAttribute("UpgradeId", "fasterDrop")\`, in Triggered read \`upgradeId = button:GetAttribute("UpgradeId")\` and call the same server \`tryBuyUpgrade(player, upgradeId)\`. The client does not send price, only id from Attribute, which the server already validates via Config.

**Do now (5 min):** FireServer or Prompt with id fasterDrop; server denies fake id "hack".`,
 },
 {
 title: "Table-upgrade playtest",
 content: `| # | Action | Expectation |
|---|-----|------------|
| 1 | Open Config | ≥2 keys with price |
| 2 | Buy id | Deduct = cfg.price |
| 3 | Effect | interval or payout changed |
| 4 | Buy again | owned blocks |
| 5 | Fake id | deny |
| 6 | UI price | Matches Config |
| 7 | Output | Clean |

If row 3 is red, applyUpgrade is not writing the state the dropper reads.

**Do now (5 min):** walk the test table once and record pass/fail for each row.`,
 },
 {
 title: "Handoff checklist for lesson 52",
 content: `- [ ] UpgradeConfig ≥2 entries
- [ ] Purchase by id from the table
- [ ] applyUpgrade changes dropper state
- [ ] owned / one-time purchase
- [ ] UI prices from Config
- [ ] No trust in price from the client
- [ ] Playtest 1-4 green
- [ ] Save: Lesson 7.4 - Upgrade Table

**Do now (3 min):** walk the checklist and check only items you actually completed.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Price in Prompt differs from Script",
 explanation: "Balance and trust break.",
 correctApproach: "Only UpgradeConfig.price",
 },
 {
 mistake: "Client sends price",
 explanation: "Discount cheat.",
 correctApproach: "Only id as a string",
 },
 {
 mistake: "No owned: upgrade stacks",
 explanation: "interval falls to zero from spam.",
 correctApproach: "owned[id] = true",
 },
 {
 mistake: "Dropper reads future upgrade Config before purchase",
 explanation: "Effect is already active with no payment.",
 correctApproach: "Read state",
 },
 {
 mistake: "if id=='a' / elseif id=='b' across 20 branches with no table",
 explanation: "A new upgrade = pain in the code.",
 correctApproach: "Table + applyUpgrade",
 },
 {
 mistake: "Two Modules with different prices",
 explanation: "7.6 tweaks the wrong one.",
 correctApproach: "One require",
 }
 ],
 summary: "You moved upgrades into UpgradeConfig table: purchase by id, applyUpgrade writes dropper state, UI takes prices from data. That is the foundation for balance and per-player factories.",
 practiceTask: {
 title: "Upgrade menu (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** 2 upgrades from a table with a real effect.

### Part A - Config (8 min)
1. UpgradeConfig with 2 ids (price + interval/payout).
2. ModuleScript or a clear table block.
3. Base dropper state.

### Part B - apply + buy (14 min)
1. canAfford from cfg.price.
2. applyUpgrade + owned.
3. Dropper reads state.
4. Client sends only id.

### Part C - UI (8 min)
1. 2 buttons / list with prices from Config.
2. "Purchased" state.
3. **Save:** Lesson 7.4 - Upgrade Table`,
 hints: [
 "Start with one speed upgrade; it is the most visible",
 "print(state.interval) after purchase",
 "A fake id on a test button should deny"
 ],
 optionalChallenge: "A third upgrade in the table needs no new if; only a new row + button with Attribute.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 7.4?",
 options: [
          "Keep upgrades in a table and apply by id",
          "Delete leaderstats",
          "Make only a sword animation",
          "Publish with no Config"
        ],
 correctAnswer: 0,
 explanation: "UpgradeConfig.",
 },
 {
 id: "q2",
 type: MC,
 question: "What does the client send for a purchase?",
 options: [
          "Any price of its own as truth",
          "upgrade id (string)",
          "MaxHealth",
          "Skybox id"
        ],
 correctAnswer: 1,
 explanation: "Only id.",
 },
 {
 id: "q3",
 type: MC,
 question: "Where should price come from?",
 options: [
          "Blindly from the FireServer argument always",
          "From the Part name",
          "From UpgradeConfig on the server",
          "From Sound Volume"
        ],
 correctAnswer: 2,
 explanation: "Server table.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why owned?",
 options: [
          "Increase Terrain",
          "Turn the dropper off forever",
          "Owned replaces Coins",
          "Do not buy the same upgrade again / do not stack the effect"
        ],
 correctAnswer: 3,
 explanation: "One-time purchase.",
 },
 {
 id: "q5",
 type: MC,
 question: "What does the dropper loop read after an upgrade?",
 options: [
          "Always only the future Config row before purchase",
          "Current player/plot state (interval/payout)",
          "Only Lighting",
          "The button name"
        ],
 correctAnswer: 1,
 explanation: "State.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why is a table better than a long if?",
 options: [
          "if is forbidden in Lua",
          "table turns Remote off",
          "New upgrade = new row, balance in one place",
          "if cannot compare strings"
        ],
 correctAnswer: 2,
 explanation: "Scale and balance.",
 },
 {
 id: "q7",
 type: MC,
 question: "Minimum Config entries for handoff?",
 options: [
          "At least 2",
          "Required 50",
          "0",
          "Only a comment with no table"
        ],
 correctAnswer: 0,
 explanation: "Two upgrades.",
 },
 {
 id: "q8",
 type: MC,
 question: "What should applyUpgrade do?",
 options: [
          "Delete leaderstats",
          "Create a new Place",
          "Turn Humanoid off",
          "Write the effect from cfg into state after a valid purchase"
        ],
 correctAnswer: 3,
 explanation: "Applying the effect.",
 },
 {
 id: "q9",
 type: MC,
 question: "How does 7.4 prepare 7.6?",
 options: [
          "7.6 deletes Config",
          "Prices are no longer needed",
          "Balance tweaks fields of the same table",
          "Balance only in Skybox"
        ],
 correctAnswer: 2,
 explanation: "One set of numbers.",
 },
 {
 id: "q10",
 type: MC,
 question: "What to do with a fake upgradeId?",
 options: [
          "Give a free upgrade",
          "return / deny on the server",
          "Always remove the player from the game",
          "Set Coins = 9999"
        ],
 correctAnswer: 1,
 explanation: "id validation.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why displayName in Config?",
 options: [
          "It is the only way to deduct Coins",
          "displayName replaces price",
          "Required for Weld",
          "Convenient UI text without hardcoding on the button"
        ],
 correctAnswer: 3,
 explanation: "UI label.",
 },
 {
 id: "q12",
 type: MC,
 question: "How does Config differ from state?",
 options: [
          "Config is the catalog; state is what is active for the player now",
          "They are always the same thing",
          "State only on the client as truth",
          "Config does not contain price"
        ],
 correctAnswer: 0,
 explanation: "Catalog vs state.",
 },
 {
 id: "q13",
 type: MC,
 question: "How do you show price on a button correctly?",
 options: [
          "Write a random 999",
          "Take it from client imagination",
          "Take the number from UpgradeConfig for that id",
          "Price must never be shown"
        ],
 correctAnswer: 2,
 explanation: "UI from data.",
 },
 {
 id: "q14",
 type: MC,
 question: "What if there is no applyUpgrade after deduct?",
 options: [
          "Studio always crashes",
          "Coins return on their own",
          "Dropper speeds up on its own",
          "Money is gone, drop did not change"
        ],
 correctAnswer: 3,
 explanation: "An effect is required.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the handed-off artifact for 7.4?",
 options: [
          "Theory only",
          "UpgradeConfig + id purchase + effect + Save",
          "Empty Baseplate",
          "Prices only in Prompt differ from Script"
        ],
 correctAnswer: 1,
 explanation: "An upgrade table is required.",
 }
 ],
 },
}

export const enLesson75 = {
 lessonId: "lesson-roblox-7-5",
 moduleId: "module-07",
 order: 5,
 title: "7.5 - Per-player plot",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Keep the base template in ServerStorage and clone a plot per player",
 "Bind the plot to OwnerUserId / server table plots[player]",
 "Place several plot spawn slots without overlap",
 "Make collector and buttons work only for the owner",
 "Clean the plot on PlayerRemoving so ghost bases do not remain"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 53 of 92)",
 content: `In **7.1-7.4** the factory already drops, collects coins, and buys upgrades from a table. Today each player gets **their own** base: a plot clone, not one shared pile of machines for everyone.
Without ownership, 7.7-7.8 break with two players: "who collected my drop?".

**Do now (3 min):** count how many players you want to support in class (2-4 slots is enough). Sketch Slot1..n rectangles on paper so you do not place bases randomly flush in Studio. Slot planning saves half an hour of Pivot moving.`,
 },
 {
 title: "Why a plot per player",
 content: `| One shared base | Plot per player |
|-------------------|----------------|
| Coins get mixed | Each has their own income |
| Someone else's buttons | Your own upgrades |
| Demo "for one" | Split-test OK |
| Easier to assemble first | Needs clone + slots |

Not one kitchen for the whole class, but **your own workstation**. The recipe (Config) is shared; the products are yours.

Lite allowance: if time is short, make 2 slots and a Claim Part. Better 2 honest plots than 8 empty markers.

At SHOWCASE the mentor often looks for this: does each player have "their own desk", or does everyone run to one collector? The answer should be obvious in a 20-second demo.

**Do now (4 min):** write one sentence in a Note explaining why a shared base breaks tycoon for 2+ players.`,
 },
 {
 title: "Template in ServerStorage",
 content: `Build or move the current base into Model \`PlotTemplate\`:

\`ServerStorage\`
\` └── PlotTemplate\`
\` ├── Base\`
\` ├── Dropper\`
\` ├── Collector\`
\` ├── UpgradeButtons\`
\` └── SpawnPoint (optional Part for the player)\`

PrimaryPart / Pivot on the floor makes \`PivotTo\` onto a slot easy.

Prefer **not** to duplicate all logic scripts inside every clone as chaos copies. Course pattern:
- one server manager knows all plots;
- or scripts in the template with \`script.Parent\` as the plot root (also fine for learning).

**Do now (10 min):** template complete, Anchored where needed, stable names.`,
 },
 {
 title: "Slots on the map",
 content: `In Workspace, folder \`PlotSlots\`:

\`Slot1\`, \`Slot2\`, \`Slot3\` - Part or Attachment with the base CFrame.

\`local slots = workspace.PlotSlots:GetChildren()\`
\`-- sort by name Slot1..n\`

On assign:
\`local cf = slot.CFrame\`
\`plot:PivotTo(cf)\`

Distance between slots: so one player's drop does not fall into another's collector (at least several dozen studs).

Slot markers CanCollide false, Transparency 1 after debug.

**Do now (4 min):** run one check from this section in Play and write the result in a Note.`,
 },
 {
 title: "Assigning a plot: Clone + owner",
 content: `\`local plots = {} -- [Player] = Model\`

\`local function assignPlot(player)\`
\` if plots[player] then return plots[player] end\`
\` local slot = takeFreeSlot()\`
\` if not slot then warn("no slots") return end\`
\` local plot = template:Clone()\`
\` plot.Name = "Plot_" .. player.Name\`
\` plot:SetAttribute("OwnerUserId", player.UserId)\`
\` plot:PivotTo(slot.CFrame)\`
\` plot.Parent = workspace.Plots\`
\` plots[player] = plot\`
\` markSlotUsed(slot, player)\`
\` return plot\`
\`end\`

\`Players.PlayerAdded:Connect(function(player)\`
\` player.CharacterAdded:Connect(function()\`
\` -- optional teleport to plot.SpawnPoint\`
\` end)\`
\` assignPlot(player)\`
\`end)\`

Do not clone on every CharacterAdded without need; you will get a pile of bases.

**Do now (4 min):** run one check from this section in Play and write the result in a Note.`,
 },
 {
 title: "takeFreeSlot and releasing a slot",
 content: `Keep \`slot.OwnerUserId\` Attribute or table \`slotOwners[slot] = player\`.

\`free\`: OwnerUserId nil.  
\`take\`: write player.  
\`release\` on leave: nil + Destroy plot.

If there are no slots, tell the player (print / Billboard "No free plots") and do not crash on nil Clone.

For handoff, 2-4 slots. Do not make 20 "for later" without layout.

\`takeFreeSlot\` pseudocode:

\`for _, slot in ipairs(sortedSlots) do\`
\` if not slot:GetAttribute("OwnerUserId") then return slot end\`
\`end\`
\`return nil\`

\`releaseSlot\`: \`slot:SetAttribute("OwnerUserId", nil)\`. Without release, the second player gets "no slots" even though the base is already destroyed.

**Do now (5 min):** join with two players, leave with the first; the second should get the freed slot.`,
 },
 {
 title: "Collector and buttons only for the owner",
 content: `In any Touched / Prompt on the plot:

\`local ownerId = plot:GetAttribute("OwnerUserId")\`
\`local player = Players:GetPlayerFromCharacter(hit.Parent)\`
\`if not player or player.UserId ~= ownerId then return end\`

Same for upgrade purchase: even if Prompt is visible from afar, the server rejects outsiders.

Typical bug: check exists on collector, missing on UpgradeButton; a neighbor upgrades your dropper.

Helper on the server:

\`local function isPlotOwner(plot, player)\`
\` return player and plot:GetAttribute("OwnerUserId") == player.UserId\`
\`end\`

Call it in collector, purchase Prompt, and any Touched on the template. Write it once so you do not forget a button.

**Do now (8 min):** intentionally join as "someone else" (2 windows) and confirm deny.`,
 },
 {
 title: "Upgrade state on the plot, not global",
 content: `After 7.4 Config is shared, but **current** interval/payout is per player/plot:

\`plotState[player] = { interval = 2, payout = 5, owned = {} }\`

Or Attributes on the plot Model.

This plot's dropper reads the owner's state, not a global for the whole server.

Otherwise one player's upgrade speeds everyone up: fun for 10 s, then chaos in 7.6 balance.

**Do now (4 min):** change one value in table/Config and confirm the new behavior.`,
 },
 {
 title: "PlayerRemoving: remove the base",
 content: `\`Players.PlayerRemoving:Connect(function(player)\`
\` local plot = plots[player]\`
\` if plot then plot:Destroy() end\`
\` plots[player] = nil\`
\` plotState[player] = nil\`
\` releaseSlot(player)\`
\`end)\`

Without this, after leave you get "ghost" bases and occupied slots.

Check: join → leave → slot free again for the next PlayerAdded.

**Do now (5 min):** run one check from this section in Play and write the result in a Note.`,
 },
 {
 title: "Teleport / spawn near your base",
 content: `Optional after assignPlot:

\`local spawn = plot:FindFirstChild("SpawnPoint", true)\`
\`if spawn and player.Character then\`
\` player.Character:PivotTo(spawn.CFrame + Vector3.new(0, 3, 0))\`
\`end\`

Or SpawnLocation on each plot (harder with Neutral/Team). For learning, PivotTo is enough.

Onboarding: the sign is already on the template and clones for everyone. Text "This is your base" works on every clone.

**Do now (4 min):** run one check from this section in Play and write the result in a Note.`,
 },
 {
 title: "Playtest ownership",
 content: `| # | Action | Expectation |
|---|-----|------------|
| 1 | Player1 Join | Got Plot_Name on a Slot |
| 2 | Player2 Join | Different slot, different plot |
| 3 | P2 on P1 collector | P2 coins do not grow from someone else's |
| 4 | P2 presses P1 upgrade | deny |
| 5 | P1 collect / upgrade | Works on their own |
| 6 | P1 Leave | Plot destroyed, slot free |
| 7 | Output | No nil Pivot / double clones |

Split: two Studio windows or Local Server + 2 players.

**Do now (5 min):** walk the test table once and record pass/fail for each row.`,
 },
 {
 title: "Handoff checklist for lesson 53",
 content: `- [ ] PlotTemplate in ServerStorage
- [ ] Clone onto a free slot on join
- [ ] OwnerUserId / plots[player]
- [ ] Collector and upgrades only for owner
- [ ] Dropper state per-player/plot
- [ ] PlayerRemoving cleans up
- [ ] Playtest 1-6 green
- [ ] Save: Lesson 7.5 - Player Plots

**Do now (3 min):** walk the checklist and check only items you actually completed.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Clone on every CharacterAdded",
 explanation: "A pile of plots after respawn.",
 correctApproach: "One assign per Player, not on every death",
 },
 {
 mistake: "No owner check on buttons",
 explanation: "Neighbors upgrade someone else's dropper.",
 correctApproach: "OwnerUserId on all plot interactions",
 },
 {
 mistake: "Global interval for the whole server",
 explanation: "One upgrade = upgrade for everyone.",
 correctApproach: "plotState[player]",
 },
 {
 mistake: "No Destroy on PlayerRemoving",
 explanation: "Ghost bases and occupied slots.",
 correctApproach: "Destroy + releaseSlot",
 },
 {
 mistake: "Slots stacked on each other",
 explanation: "Drop/collector mix together.",
 correctApproach: "Distance between Slot CFrames",
 },
 {
 mistake: "Template in Workspace as the only base with no Clone",
 explanation: "No per-player.",
 correctApproach: "ServerStorage template + Clone",
 }
 ],
 summary: "You give each player a plot clone from slots, write owner, block foreign collector/buttons, and clean the base on leave. The per-player factory is ready for balance and Ship.",
 practiceTask: {
 title: "Your own plots (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** 2 players = 2 plots; foreign ones are not collected.

### Part A - Template and slots (10 min)
1. PlotTemplate in ServerStorage.
2. 2-4 PlotSlots in Workspace.
3. Stable names.

### Part B - Assign / cleanup (12 min)
1. assignPlot: Clone, OwnerUserId, plots[player].
2. PlayerRemoving Destroy + free slot.
3. interval/payout state on plot/player.

### Part C - Owner checks (8 min)
1. Collector and upgrade check UserId.
2. Split-test with 2 windows.
3. **Save:** Lesson 7.5 - Player Plots`,
 hints: [
 "Start with 2 slots; easier to debug",
 "print(ownerId, player.UserId) on deny",
 "Do not clone in a CharacterAdded loop"
 ],
 optionalChallenge: "Billboard on the plot with the owner's DisplayName.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 7.5?",
 options: [
          "Clone a plot per player with owner and slots",
          "Delete the dropper",
          "Build only Arena",
          "Publish with no bases"
        ],
 correctAnswer: 0,
 explanation: "Plot per player.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where is a good place to keep PlotTemplate?",
 options: [
          "Only Lighting",
          "ServerStorage",
          "In SoundService",
          "In the Sky name"
        ],
 correctAnswer: 1,
 explanation: "Template for Clone.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why OwnerUserId on the plot?",
 options: [
          "Increase MaxHealth",
          "Create Terrain",
          "Tell whose collector/buttons they are",
          "Turn leaderstats off"
        ],
 correctAnswer: 2,
 explanation: "Ownership.",
 },
 {
 id: "q4",
 type: MC,
 question: "What to do in PlayerRemoving?",
 options: [
          "Delete Workspace",
          "Turn Pathfinding off",
          "Publish is required",
          "Destroy plot and free the slot"
        ],
 correctAnswer: 3,
 explanation: "Cleanup.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why not clone a plot on every CharacterAdded?",
 options: [
          "Clone is forbidden in Roblox",
          "Extra bases appear after respawn",
          "Otherwise the dropper does not exist",
          "Attribute is then a string"
        ],
 correctAnswer: 1,
 explanation: "One plot per player.",
 },
 {
 id: "q6",
 type: MC,
 question: "Where should current dropper interval live?",
 options: [
          "Only in Skybox",
          "Only on the client as text",
          "In player/plot state, not one global for everyone",
          "In the Slot name"
        ],
 correctAnswer: 2,
 explanation: "Per-player state.",
 },
 {
 id: "q7",
 type: MC,
 question: "What should happen if a stranger stands on your collector?",
 options: [
          "Server does not add your coins for them",
          "Must give them all Coins",
          "Delete their plot",
          "Studio crash"
        ],
 correctAnswer: 0,
 explanation: "Deny the outsider.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why several PlotSlots?",
 options: [
          "Slots replace Humanoid",
          "Without slots Clone is always impossible technically",
          "Slots draw Animation",
          "Different base positions without overlap"
        ],
 correctAnswer: 3,
 explanation: "Map layout.",
 },
 {
 id: "q9",
 type: MC,
 question: "How does 7.5 prepare 7.8 Ship?",
 options: [
          "Ship forbids Clone",
          "Must delete owner before Ship",
          "A split demo with two bases passes the ownership rubric",
          "Ship requires one base for everyone"
        ],
 correctAnswer: 2,
 explanation: "Honest multi-plot.",
 },
 {
 id: "q10",
 type: MC,
 question: "What is assignPlot?",
 options: [
          "Name of a RemoteFunction from a weapon shop",
          "Function that assigns a free slot and clones a base to the player",
          "Terrain type",
          "Turning the dropper off"
        ],
 correctAnswer: 1,
 explanation: "Assigning a plot.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why not place slots flush together?",
 options: [
          "Roblox forbids nearby Parts",
          "Otherwise OwnerUserId is erased",
          "PivotTo does not exist",
          "Drops and collectors of different players mix"
        ],
 correctAnswer: 3,
 explanation: "Distance.",
 },
 {
 id: "q12",
 type: MC,
 question: "Are 2 slots enough for handoff?",
 options: [
          "Yes; fine for learning and a split-test",
          "No; 100 required",
          "Slots are forbidden",
          "Only 0 is needed"
        ],
 correctAnswer: 0,
 explanation: "Slot MVP.",
 },
 {
 id: "q13",
 type: MC,
 question: "Where to check owner: client or server?",
 options: [
          "LocalScript alone is enough as truth",
          "No check needed",
          "Required on the server (client can be bypassed)",
          "Only in Lighting"
        ],
 correctAnswer: 2,
 explanation: "Never trust client.",
 },
 {
 id: "q14",
 type: MC,
 question: "Why PrimaryPart/Pivot on the template?",
 options: [
          "It turns Coins off",
          "Replaces OwnerUserId",
          "Required for Sound",
          "Makes it easy to place the whole base on the slot CFrame"
        ],
 correctAnswer: 3,
 explanation: "PivotTo.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the handed-off artifact for 7.5?",
 options: [
          "Theory only",
          "Clone plot + owner checks + cleanup + Save",
          "Empty Baseplate",
          "One shared base with no owner as the final"
        ],
 correctAnswer: 1,
 explanation: "Your own plots are required.",
 }
 ],
 },
}

export const enLesson76 = {
 lessonId: "lesson-roblox-7-6",
 moduleId: "module-07",
 order: 6,
 title: "7.6 - Playtest + price balance",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Measure earn rate: coins per minute from dropper/collector",
 "Tune upgrade prices and payout so the first upgrade is reachable",
 "Find \"forever poor\" / \"bought everything instantly\" and record it in a table",
 "Put prices in one Config with no number drift",
 "Prepare a playable economy for the mini-factory and Ship"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 54 of 92)",
 content: `In **7.1-7.5** you built plot, dropper, purchases, table upgrades, and (likely) plot clone. Today you **measure the economy**.
1. Balance-test table (income / prices / time to upgrade).
2. ≥2 live number tweaks (price or payout/interval).
3. First upgrade reachable in ~30-90 s of honest play.
4. No "bought everything in 5 s" with no effort (or document it as too easy).

Without this, 7.7-7.8 demos are either boring or "I am a millionaire instantly".

**Do now (3 min):** write current payout, interval, upgrade 1 and 2 prices.

If numbers are not in one place, first gather them into a note from Explorer/scripts. Balance without written starting values becomes guesswork.`,
 },
 {
 title: "Price balance ≠ \"make it more expensive\"",
 content: `| Bad balance | Good teaching balance |
|----------------|-------------------|
| Upgrade 1 after 10 minutes AFK | Upgrade 1 in ~30-90 s |
| Everything bought in 5 s | A sense of saving up |
| Price 50 in UI, 500 in Script | One set of numbers in Config |
| Random "empty then rich" | Predictable income/min |

Like a cafe price tag. You do not get angry at the soup; you **change the price or portion** and try again.

Tune constants in Config, not "magic in Prompt by hand every time".

**Do now (4 min):** change one value in table/Config and confirm the new behavior.`,
 },
 {
 title: "What we measure",
 content: `| Metric | How | Why |
|---------|-----|--------|
| **Income/min** | How many Coins in 60 s of collecting | Economy pace |
| **TTA1** (time to upgrade 1) | Stopwatch to first purchase | Onboarding |
| **TTA2** | Time to second upgrade | Curve |
| **Collector spam** | Whether debounce multiplies | Broken income |

School target:
\`TTA1 ≈ 30-90 s\`  
\`price1 ≈ income_per_min * 0.5 … 1.5\` (rough)

If payout=1, interval=5 s → ~12/min. Then price=500 is forever. Either ↑payout or ↓price.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Price playtest table",
 content: `| # | Scenario | Expectation | Fact | Verdict |
|---|----------|------------|------|---------|
| 1 | 60 s collecting, no upgrades | Record Coins | | |
| 2 | Time to upgrade 1 | 30-90 s | | |
| 3 | After upgrade 1, new 60 s | Income rose | | |
| 4 | Buy with no money | Denial | | |
| 5 | Double click | Not a double purchase | | |
| 6 | UI price = Config | Match | | |
| 7 | Output | Clean | | |

Verdict: **ok / slow / fast / broken**.  
Broken = coins do not add or price deducts nothing.

**Do now (5 min):** walk the test table once and record pass/fail for each row.`,
 },
 {
 title: "One source of truth for prices",
 content: `\`UpgradeConfig.speed1.price = 50\`  
\`DropperConfig.payout = 5\`  
\`DropperConfig.interval = 2\`

Bad: SurfaceGui text "50", Script checks 25.

After a tweak, **update** the visible text from the same Config (or write price dynamically).

**Do now (5 min):** find all price literals and consolidate into a table.`,
 },
 {
 title: "Typical symptoms and fixes",
 content: `| Symptom | Fix |
|---------|------|
| TTA1 > 3 min | ↓price or ↑payout or ↓interval |
| Everything bought in 10 s | ↑price or ↓payout |
| After upgrade income unchanged | applyUpgrade does not write Config |
| UI says 50, deducted 80 | Different numbers; unify |
| Coins jump from Touched | Debounce collector |
| No coins in TAB | Not writing leaderstats |

Rule: fix **broken** first, then slow/fast.

**Do now (3 min):** find one symptom from the table in the Place and fix it or confirm it is gone.`,
 },
 {
 title: "Tuning protocol (15 min)",
 content: `1. Fill rows 1-2 of the table.
2. Pick the worst verdict.
3. Change **one** number in Config.
4. Repeat the same test.
5. Record was → became.
6. Repeat for a second problem.

Example:
- Was: payout 1 / 5s, price 200 → TTA1 ~15 min (slow).
- Became: payout 5 / 2s, price 60 → TTA1 ~40 s (ok).

Do not twist 5 variables at once.

After two successful tweaks, re-read UI prices. If SurfaceGui still shows the old number, the player thinks the server "steals" coins. Syncing text with Config is part of balance, not cosmetics.

**Do now (4 min):** change one value in table/Config and confirm the new behavior.`,
 },
 {
 title: "Two-upgrade curve",
 content: `| Upgrade | Price idea | Effect idea |
|---------|-----------|-------------|
| 1 | Cheaper, fast payoff | interval ↓ or payout ↑ |
| 2 | More expensive by 1.5-3× | Another step, not a ×20 wall |

Tycoon difficulty wave: the first upgrade teaches the loop, the second gives "wow, more".  
If upgrade 2 = price ×100 with no income growth, the player quits.

For 7.7, 2 steps are enough; rebirth is not today.

Quick curve check: after upgrade 1, time another 60 s of income. If almost no gain, the effect is weak even if the price is "ok". Then tune upgrade interval/payout, not only the price tag.

**Do now (4 min):** run one check from this section in Play and write the result in a Note.`,
 },
 {
 title: "Debounce and honest measurement",
 content: `If collector has no debounce, "income/min" is spam fantasy.

Before balancing:
- confirm collection once per Part / cooldown;
- measure an honest pass, not standing in a wall at 60 Touched/s.

Same for purchase: one successful buy per click.

**Do now (6 min):** print on +Coins with os.clock(); you will see intervals.

Also note whether drop Parts are destroyed after collection. If a Part stays and pays again, the economy is a leaky bucket and price balance will not save it.`,
 },
 {
 title: "What to tell the mentor in 30 seconds",
 content: `Balance report format:
1. "Income/min was X, became Y".
2. "TTA1 was A s, became B s".
3. "Changed these two Config fields".
4. "Double click / collector spam: closed or still P0".

That is the proof for lesson 54. Without numbers, "feels fine" does not pass.

If time is short, one honest table with two tweaks beats three new decorative buttons with random prices.

**Do now (4 min):** change one value in table/Config and confirm the new behavior.`,
 },
 {
 title: "Handoff checklist for lesson 54",
 content: `- [ ] Written payout / interval / prices
- [ ] Test table with facts
- [ ] ≥2 tweaks with was → became log
- [ ] TTA1 in a comfortable window (or P0 recorded)
- [ ] Prices from one Config
- [ ] Collector/purchase without crazy spam
- [ ] UI prices match Config
- [ ] Save: Lesson 7.6 - Tycoon Balance

Next **7.7** builds the mini-factory on these numbers. **7.8** shows them to the mentor. If today is slow forever, Ship turns red.

Do not go to 7.7 with TTA1 "kinda long" and no record. Either tune or mark P0 so Ship is not surprised.

**Do now (3 min):** walk the checklist and check only items you actually completed.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Balancing while Coins do not add at all",
 explanation: "You are balancing a bug.",
 correctApproach: "First collector → leaderstats",
 },
 {
 mistake: "Change 7 numbers at once",
 explanation: "Unclear what helped.",
 correctApproach: "One number → one test",
 },
 {
 mistake: "Different price in UI and Script",
 explanation: "Player and server live in different realities.",
 correctApproach: "One Config",
 },
 {
 mistake: "Upgrade 1 unreachable in the lesson",
 explanation: "Demo and motivation are dead.",
 correctApproach: "TTA1 30-90 s",
 },
 {
 mistake: "Ignore collector debounce",
 explanation: "Income measurement lies.",
 correctApproach: "Honest collection, then prices",
 },
 {
 mistake: "Upgrade 2 at ×100 with no income growth",
 explanation: "Progress wall.",
 correctApproach: "Curve 1.5-3× and a stronger drop",
 }
 ],
 summary: "You ran tycoon price balance: measured income and TTA, unified Config, made at least 2 tweaks. The economy is ready for mini-factory 7.7 and Ship 7.8.",
 practiceTask: {
 title: "Price lab (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** first upgrade reachable, numbers in one Config.

### Part A - Measure (8 min)
1. Write payout/interval/prices.
2. 60 s collecting + time to upgrade 1.
3. Verdict slow/fast/broken.

### Part B - Tweaks (15 min)
1. Unify prices in Config.
2. ≥2 changes, one at a time.
3. Repeat measures; log was → became.
4. Check collection/purchase debounce.

### Part C - Ready (7 min)
1. TTA1 comfortable.
2. After upgrade, income rose.
3. **Save:** Lesson 7.6 - Tycoon Balance`,
 hints: [
 "A phone stopwatch is enough",
 "print coins every 10 s",
 "Do not touch decor while TTA is broken/slow"
 ],
 optionalChallenge: "A short plot sign \"Prices from lesson balance\" with current Config numbers.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 7.6?",
 options: [
          "Run and tune price/income balance",
          "Delete the dropper",
          "Build Arena",
          "Publish with no measurement"
        ],
 correctAnswer: 0,
 explanation: "Economy balance.",
 },
 {
 id: "q2",
 type: MC,
 question: "What is TTA1 in this lesson?",
 options: [
          "Remote name",
          "Time to first upgrade",
          "Terrain type",
          "Number of Decals"
        ],
 correctAnswer: 1,
 explanation: "Time to upgrade 1.",
 },
 {
 id: "q3",
 type: MC,
 question: "Target time to upgrade 1?",
 options: [
          "Required 2 hours",
          "0 seconds always",
          "About 30-90 seconds of honest play",
          "Only after Publish"
        ],
 correctAnswer: 2,
 explanation: "Comfortable onboarding.",
 },
 {
 id: "q4",
 type: MC,
 question: "Where should prices live?",
 options: [
          "In 10 Prompts with different numbers",
          "Only in Sky",
          "Only in the Part name",
          "In one Config/table"
        ],
 correctAnswer: 3,
 explanation: "One source.",
 },
 {
 id: "q5",
 type: MC,
 question: "If coins do not add, what first?",
 options: [
          "Immediately price = 1_000_000",
          "Fix collector/leaderstats; do not twist price blindly",
          "Delete the plot",
          "Turn Output off"
        ],
 correctAnswer: 1,
 explanation: "Bug ≠ balance.",
 },
 {
 id: "q6",
 type: MC,
 question: "How many variables to twist per test?",
 options: [
          "All at once, required",
          "None ever",
          "Preferably one",
          "Only button color"
        ],
 correctAnswer: 2,
 explanation: "Controlled experiment.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why measure income over 60 s?",
 options: [
          "Understand economy pace before prices",
          "Replace MaxHealth",
          "Create Animation",
          "Turn the dropper off"
        ],
 correctAnswer: 0,
 explanation: "Income measurement.",
 },
 {
 id: "q8",
 type: MC,
 question: "What if everything buys in 5 s?",
 options: [
          "Delete leaderstats",
          "Must add 50 machines",
          "Turn canAfford off",
          "Raise prices or lower payout"
        ],
 correctAnswer: 3,
 explanation: "Too fast.",
 },
 {
 id: "q9",
 type: MC,
 question: "Why is collector debounce important before balance?",
 options: [
          "Debounce paints Sky",
          "Without it Config does not exist",
          "Otherwise spam income measurement lies",
          "It replaces upgrades"
        ],
 correctAnswer: 2,
 explanation: "Honest measurement.",
 },
 {
 id: "q10",
 type: MC,
 question: "How does 7.6 prepare 7.8?",
 options: [
          "Ship forbids Config",
          "Stable prices → Ship demo does not collapse into \"forever poor\"",
          "Balance cancels the rubric",
          "Must delete upgrades before Ship"
        ],
 correctAnswer: 1,
 explanation: "Ready for ship.",
 },
 {
 id: "q11",
 type: MC,
 question: "Minimum live tweaks?",
 options: [
          "0",
          "Required 50",
          "Only changing the sky",
          "At least 2 with was → became log"
        ],
 correctAnswer: 3,
 explanation: "Number practice.",
 },
 {
 id: "q12",
 type: MC,
 question: "If after upgrade income did not rise?",
 options: [
          "Check applyUpgrade / whether new interval/payout is written",
          "Only recolor the button again",
          "Delete TAB",
          "Publish is required"
        ],
 correctAnswer: 0,
 explanation: "Upgrade effect.",
 },
 {
 id: "q13",
 type: MC,
 question: "Upgrade 2 price curve vs price 1?",
 options: [
          "Always cheaper than the first",
          "Price 2 always 0",
          "Usually more expensive by a sensible 1.5-3×, not ×100 at once",
          "Upgrade 2 with no price"
        ],
 correctAnswer: 2,
 explanation: "Lite curve.",
 },
 {
 id: "q14",
 type: MC,
 question: "What to record in the table?",
 options: [
          "Only \"feels fine\"",
          "Only a Plugins list",
          "Ambient color",
          "Facts: seconds/coins and verdict"
        ],
 correctAnswer: 3,
 explanation: "Measurement proof.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the handed-off artifact for 7.6?",
 options: [
          "Theory only",
          "Table + ≥2 tweaks + more comfortable TTA + Save",
          "Empty Baseplate",
          "Prices drifted between UI and Script"
        ],
 correctAnswer: 1,
 explanation: "Balance proof is required.",
 }
 ],
 },
}

export const enLesson77 = {
 lessonId: "lesson-roblox-7-7",
 moduleId: "module-07",
 order: 7,
 title: "7.7 - Project: mini-factory",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Assemble a mini-factory: ≥1 dropper, collector, ≥2 upgrades from a table",
 "Show a full earn cycle on your own plot",
 "Align names, Config, and leaderstats with no \"magic\" numbers in 5 places",
 "Close integration holes before Ship (7.8)",
 "Save the Place as the module project artifact"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 55 of 92)",
 content: `This is a **project** lesson. Not a new mechanic from scratch; you assemble a **mini-factory** from bricks 7.1-7.6.
1. Plot (yours or the 7.5 template) with a readable dropper.
2. Collector → Coins in leaderstats.
3. At least **2** upgrades from UpgradeConfig (price + effect).
4. The player completes the cycle without a coach ≥1 time.

Tomorrow 7.8 only stretches the Ship rubric. Today there must be **something** to ship.

**Do now (3 min):** list "already have / still missing" for dropper, collector, shop, plot clone.

Honestly mark "almost" as "missing" if the cycle does not yet run in Play. That decides where the 25 practice minutes go.`,
 },
 {
 title: "Mini-factory composition",
 content: `| Block | Minimum | Lesson source |
|------|---------|----------------|
| Plot | Base with floor | 7.1 / 7.5 |
| Dropper | while/for + Config | 7.2 |
| Collector | +Coins server | 7.1 / 7.3 |
| Shop/Upgrade | if canAfford + table | 7.3 / 7.4 |
| Price balance | Playable numbers | 7.6 |

Not a new engine; **assembling a car from ready parts**. If parts sit in different Places, unify them into one today.

**Do now (4 min):** try a purchase with 0 coins and after a successful purchase check TAB/Output.`,
 },
 {
 title: "Target gameplay in 2 minutes",
 content: `Handoff scenario:
1. Join → the plot is yours.
2. In 20-40 s collect enough for upgrade 1.
3. Buy → feel a faster/richer drop.
4. In another ~30-60 s buy upgrade 2 (or save up noticeably).
5. TAB shows Coins correctly.

If upgrade 1 costs 10_000 at drop +1/5s, balance is still from 7.6; tune **today**, do not postpone to Ship.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "One Config for the factory",
 content: `Unify numbers:

\`DropperConfig = { interval = 2, payout = 5 }\`  
\`UpgradeConfig = {\`
\` speed1 = { price = 50, interval = 1.2 },\`
\` pay1 = { price = 80, payout = 10 },\`
\`}\`

After buying \`speed1\`, write player/plot state \`interval = 1.2\` and the dropper reads it.

Bad: price 50 in Prompt, 40 in Script, 80 in a comment.

**Do now (8 min):** one ModuleScript or one Script block with the upgrade table.

Check require/path once in Play: if Module is not found, all applyUpgrade fails silently. An early print confirming Config loaded beats an hour of button debug.`,
 },
 {
 title: "Plot ownership in the project",
 content: `If you have per-player plot clone (7.5):
- collector adds coins **only** for the owner;
- upgrade buttons on a foreign plot do not buy for you;
- dropper runs on your plot.

Test: 2 Studio windows / ownerAttribute logic.

If the plot is still shared (one for all), record that as a lite limit and still make honest Coins. For Ship, owner is better, but 1 shared plot beats zero cycle.

Set Attribute \`OwnerUserId\` on the plot model or keep \`plots[player] = model\` in a server table. Main point: one clear way to answer "whose machine is this?".

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "UI minimum for the factory",
 content: `A full scroll shop is not required. Enough:
- 2× SurfaceGui / ProximityPrompt on upgrade buttons;
- price text from Config;
- leaderstats Coins in TAB.

An onboarding sign with 3 steps near the plot entrance.

Do not spend an hour on an animated register; money cycle first.

If you use SurfaceGui, set the price \`TextLabel\` from Config by script at start and after 7.6 balance. Otherwise the "rebalanced" price stays old on the wall.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Integration checklist before \"done\"",
 content: `| # | Question | Yes? |
|---|---------|------|
| 1 | Dropper runs by itself after Play? | |
| 2 | Collector → leaderstats? | |
| 3 | Purchase deducts? | |
| 4 | Upgrade changes interval or payout? | |
| 5 | Second upgrade exists in the table? | |
| 6 | No client Coins=9999? | |
| 7 | Names readable to the mentor? | |
| 8 | Saved under the project name? | |

Every "no" is Part B practice work, not decor.

Fix priority: 2 → 3 → 4 → 1. Without coins and deduct, upgrades are meaningless. Without an upgrade effect, the button is decoration.

**Do now (3 min):** walk the checklist and check only items you actually completed.`,
 },
 {
 title: "Typical project holes",
 content: `| Hole | Fix |
|-------|------|
| Dropper in Workspace, shop in another Place | Unify with Save As into one |
| Upgrade recolors button, Config unchanged | applyUpgrade writes new numbers |
| Collector Touched with no debounce | Coin spam; add cooldown |
| Prompt price outdated | Take price from Config on purchase |
| Dropper while in LocalScript | Move to server |

**Do now (6 min):** walk checklist 1-6 and write the first 2 "no"s.

If there are more than three holes, do not start particles. Close economy P0, or 7.8 rubric C will be a red patch.`,
 },
 {
 title: "Polish without bloat",
 content: `Allowed polish (if the cycle is green):
- drop / collect sound;
- light particle on collector;
- "purchased" button color.

Forbidden polish today:
- 10 new machines;
- Rebirth;
- season DataStore;
- custom HUD for an hour.

Rule: polish **after** a green cycle.

Useful micro-polish: Billboard "Player's plot" with DisplayName; the mentor sees ownership immediately in a split-test.

**Do now (4 min):** do save/load or honestly document mock mode in Output.`,
 },
 {
 title: "Project playtest",
 content: `| # | Action | Expectation |
|---|-----|------------|
| 1 | New Play | Dropper starts |
| 2 | Collect | Coins in TAB |
| 3 | Upgrade 1 | Effect is felt |
| 4 | Upgrade 2 | Buys or visible in Config |
| 5 | No money | Denial |
| 6 | 2 min gameplay | Not zero progress |
| 7 | Output | Clean |

If in 2 min you cannot afford upgrade 1, 7.6 prices are still high: lower price or raise payout.

After upgrade 1, intentionally collect another 20 s. If pace did not change, return to applyUpgrade, not a new machine.

**Do now (5 min):** walk the test table once and record pass/fail for each row.`,
 },
 {
 title: "Handoff checklist for lesson 55",
 content: `- [ ] Mini-factory in one Place
- [ ] Dropper + collector + Coins
- [ ] ≥2 upgrades from a table with effect
- [ ] canAfford / deduct on the server
- [ ] Onboarding sign
- [ ] Integration checklist mostly "yes"
- [ ] Save: Lesson 7.7 - Mini Factory

Next **7.8 Ship** stretches a 15-point rubric. If today's cycle limps, Ship will be red. Finish the factory now.

Tomorrow you almost write no new code; you defend the golden path. So leave the Place today in a "playable" state, not "I'll connect it almost".

**Do now (3 min):** walk the checklist and check only items you actually completed.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "A new Place instead of stitching",
 explanation: "You lose time; Ship has nothing to show.",
 correctApproach: "One Place from 7.1-7.6",
 },
 {
 mistake: "One upgrade with no effect",
 explanation: "The project does not feel like a factory.",
 correctApproach: "≥2 with a real Config change",
 },
 {
 mistake: "Prices impossible to earn in 2 min",
 explanation: "Demo is dead.",
 correctApproach: "Tune from 7.6 now",
 },
 {
 mistake: "Collector with no owner binding",
 explanation: "Coin theft / chaos",
 correctApproach: "Plot owner check",
 },
 {
 mistake: "Polish instead of a green cycle",
 explanation: "Pretty and broken.",
 correctApproach: "Checklist 1-6 first",
 },
 {
 mistake: "Magic numbers in Prompt and Script differ",
 explanation: "Balance lies.",
 correctApproach: "One UpgradeConfig",
 }
 ],
 summary: "You assembled the mini-factory project: dropper, collector, server Coins, and at least two table upgrades. That is the meat for Ship Tycoon in 7.8.",
 practiceTask: {
 title: "Mini-factory assembly (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** full earn cycle + 2 upgrades in one Place.

### Part A - System inventory (5 min)
1. Have/missing list.
2. Unify into one Place if scattered.

### Part B - Stitching (18 min)
1. Dropper reads Config.
2. Collector → leaderstats.
3. 2 upgrades from table + applyUpgrade.
4. Onboarding sign.

### Part C - Run-through (7 min)
1. Integration checklist.
2. 2 min gameplay to an upgrade.
3. **Save:** Lesson 7.7 - Mini Factory`,
 hints: [
 "Start with one speed upgrade; most visible effect",
 "print coins after collector",
 "Do not start rebirth"
 ],
 optionalChallenge: "\"Purchased\" button state (color / text) after applyUpgrade.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 7.7?",
 options: [
          "Assemble a mini-factory from dropper, collection, and upgrades",
          "Delete leaderstats",
          "Start only Arena",
          "Publish with no cycle"
        ],
 correctAnswer: 0,
 explanation: "Factory project.",
 },
 {
 id: "q2",
 type: MC,
 question: "Minimum upgrades?",
 options: [
          "Required 50",
          "At least 2 from a table with effect",
          "0",
          "Only a color change with no Config"
        ],
 correctAnswer: 1,
 explanation: "Two with effect.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why unify systems into one Place?",
 options: [
          "Studio forbids multiple Places for life",
          "Dropper only works in one Place in the world",
          "Otherwise there is no integrated cycle for Ship",
          "leaderstats does not exist otherwise"
        ],
 correctAnswer: 2,
 explanation: "Integration.",
 },
 {
 id: "q4",
 type: MC,
 question: "Where should upgrade prices live?",
 options: [
          "In 5 different Prompts with different numbers",
          "Only in Skybox",
          "Only on the client as text",
          "In one UpgradeConfig / table"
        ],
 correctAnswer: 3,
 explanation: "One source.",
 },
 {
 id: "q5",
 type: MC,
 question: "What should a speed upgrade do?",
 options: [
          "Only recolor a wall",
          "Lower dropper interval (faster drop)",
          "Delete collector",
          "Turn Coins off"
        ],
 correctAnswer: 1,
 explanation: "Gameplay effect.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why an onboarding sign?",
 options: [
          "It replaces the dropper",
          "Required for Humanoid",
          "The player understands the cycle without a coach",
          "The sign writes Coins itself"
        ],
 correctAnswer: 2,
 explanation: "Readable start.",
 },
 {
 id: "q7",
 type: MC,
 question: "If in 2 min you cannot afford upgrade 1?",
 options: [
          "Tune price or payout (balance)",
          "Delete the factory",
          "Must add 10 machines",
          "Turn leaderstats off"
        ],
 correctAnswer: 0,
 explanation: "Balance now.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why polish after a green cycle?",
 options: [
          "Polish is forbidden in Roblox",
          "Particles delete Config",
          "Sound always breaks the server",
          "Otherwise you mask a broken economy with beauty"
        ],
 correctAnswer: 3,
 explanation: "Cycle first.",
 },
 {
 id: "q9",
 type: MC,
 question: "How does 7.7 prepare 7.8?",
 options: [
          "7.8 deletes all upgrades",
          "Ship does not need Coins",
          "The Ship rubric stretches over a finished factory",
          "Must start a new Place from zero"
        ],
 correctAnswer: 2,
 explanation: "Meat for ship.",
 },
 {
 id: "q10",
 type: MC,
 question: "Collector should…",
 options: [
          "Work only in LocalScript as truth",
          "Add Coins on the server for the owner",
          "Delete the plot",
          "Create Animation"
        ],
 correctAnswer: 1,
 explanation: "Server collection.",
 },
 {
 id: "q11",
 type: MC,
 question: "Which of these is a project hole?",
 options: [
          "There is a 3-step sign",
          "There are 2 upgrades in the table",
          "Coins in leaderstats",
          "Upgrade does not change dropper Config"
        ],
 correctAnswer: 3,
 explanation: "No effect.",
 },
 {
 id: "q12",
 type: MC,
 question: "Is a full ScrollingFrame shop required?",
 options: [
          "No; 2 Prompt/buttons are enough for a mini-factory",
          "Yes; otherwise Coins do not exist",
          "Yes; otherwise the dropper stands still",
          "Yes by Terrain rules"
        ],
 correctAnswer: 0,
 explanation: "UI minimum.",
 },
 {
 id: "q13",
 type: MC,
 question: "Why plot owner?",
 options: [
          "Owner replaces Humanoid",
          "Without owner while does not work",
          "Outsiders do not collect your coins / press your buttons",
          "Owner paints Sky"
        ],
 correctAnswer: 2,
 explanation: "Player binding.",
 },
 {
 id: "q14",
 type: MC,
 question: "What to postpone until after the cycle?",
 options: [
          "canAfford",
          "leaderstats Coins",
          "applyUpgrade",
          "Rebirth / 10 machines / an hour of HUD"
        ],
 correctAnswer: 3,
 explanation: "Do not bloat.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the handed-off artifact for 7.7?",
 options: [
          "Theory only",
          "Mini-factory with cycle and 2 upgrades + Save",
          "Empty Baseplate",
          "Client Coins with no server"
        ],
 correctAnswer: 1,
 explanation: "A project is required.",
 }
 ],
 },
}

export const enLesson78 = {
 lessonId: "lesson-roblox-7-8",
 moduleId: "module-07",
 order: 8,
 title: "7.8 - Ship Tycoon",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Stitch the tycoon into one golden path: plot → dropper → collector → purchase → upgrade",
 "Walk the Ship Tycoon rubric (~15 points) and close blockers",
 "Confirm coins and prices go through leaderstats / server, not the client",
 "Show a 60-90 s demo with no coach",
 "Save the Place as the module 7 artifact before Arena (M8)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 56 of 92)",
 content: `This is the **Tycoon module finale**. Not a new factory from scratch. Today you **stitch** what already exists into a cycle you can show in 90 seconds.

In module 7 you (or the group) built:
1. **7.1** - plot / dropper / collector.
2. **7.2** - dropper while/for + Config.
3. **7.3** - purchases + leaderstats.
4. **7.4** - upgrades from a table.
5. **7.5** - per-player plot (base clone).
6. **7.6** - price balance.
7. **7.7** - mini-factory as a project.

Today's artifact: **one Place** where a player with no coach:
**gets a plot → sees drops → collects coins → buys an upgrade → sees the effect (faster/more) → the cycle repeats.**

If something is missing, make **lite** (1 dropper, 2 upgrades, 1 plot), not three unfinished Places.

**Do now (3 min):** in one sentence write the tycoon golden path.`,
 },
 {
 title: "What Ship Tycoon means (and what it does not)",
 content: `| Ship Tycoon | Not ship yet |
|-------------|-----------|
| Drop → collect → purchase **together** | Separate "pretty plot" and UI with no coins |
| Prices/deduct on the **server** + leaderstats | LocalScript sets Coins = 9999 alone |
| Upgrade really changes Config/speed | Button only recolors a Part |
| 60-90 s demo with no explanations | 5 min "I'll show where collector is" |
| Clean Output on 1 cycle | Red errors "we ignore" |

Ship does **not** mean an AAA tycoon with 50 buttons. It means: **a short full cycle is already assembled** and honest about money.

Next, M8 Arena uses the same habit: critical numbers on the server.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Map of systems we stitch",
 content: `| System | Where it lives | What it gives the golden path |
|---------|---------|------------------------|
| Plot / base | Workspace (clone per player) | Factory place |
| Dropper + Config | while/for + table | Steady drop |
| Collector | Touched / zone | Coins into the pocket |
| leaderstats Coins | Server | Money truth |
| Purchase / Prompt / SurfaceGui | 7.3 | Deduct if canAfford |
| Upgrade table | 7.4 | Price + effect from one place |

Integration rule: **one truth about Coins** on the server. UI only displays.

**Do now (4 min):** in Explorer find dropper loop, collector, Shop/Upgrade script, leaderstats. Whatever is missing is P0.`,
 },
 {
 title: "Tycoon golden path (6-8 steps)",
 content: `1. Spawn / get your plot (or stand on the base one).
2. See the sign "Collect drops, buy upgrades".
3. Dropper throws parts/coin Parts.
4. Collector credits Coins into leaderstats.
5. Walk to the upgrade button → see the price.
6. If canAfford: deduct, upgrade applies (speed/income).
7. Collect again; feel the difference.
8. Output with no red.

Lite: 1 "DropSpeed" upgrade is enough for ship if the effect is visible.

**Do now (4 min):** try a purchase with 0 coins and after a successful purchase check TAB/Output.`,
 },
 {
 title: "Ship Tycoon rubric (~15 points)",
 content: `Mark **yes / no / almost**.

### A. Space and start (1-4)
| # | Item | Yes? |
|---|-------|------|
| 1 | Plot/base clear, spawn OK | |
| 2 | Goal sign ≤30-60 s | |
| 3 | Names/folders readable (Plots/, Droppers/, Upgrades/) | |
| 4 | Dropper visible/audible that it works | |

### B. Economy cycle (5-8)
| # | Item | Yes? |
|---|-------|------|
| 5 | Collector really adds Coins | |
| 6 | Purchase deducts leaderstats on the server | |
| 7 | Upgrade changes behavior (not only color) | |
| 8 | Cycle can repeat (not one-shot) | |

### C. Money honesty (9-12)
| # | Item | Yes? |
|---|-------|------|
| 9 | Price from server table/config, not client | |
| 10 | canAfford checked before deduct | |
| 11 | Client cannot give itself Coins via LocalScript in the handoff | |
| 12 | No double purchase with no money (debounce) | |

### D. Ship quality (13-15)
| # | Item | Yes? |
|---|-------|------|
| 13 | Clean Output on 1 cycle | |
| 14 | 60-90 s demo with no coach | |
| 15 | Save Lesson 7.8 - Tycoon Ship | |

"No" in B/C = Part B fixes, not new decor.

**Do now (4 min):** try a purchase with 0 coins and after a successful purchase check TAB/Output.`,
 },
 {
 title: "Typical integration holes",
 content: `| Symptom | Cause | Fix |
|---------|---------|------|
| Coins grow on UI, not in TAB | Not writing leaderstats | Server IntValue Coins |
| Purchase with no deduct | No canAfford / Deduct | if coins >= price then |
| Upgrade "bought", drop unchanged | Does not change Config | After purchase update interval/amount |
| Double click = 2 upgrades | No debounce / owned flag | Purchased flag |
| Foreign plot collects your coins | No player binding | Check plot owner |
| Dropper stands still | while stopped / break | Check loop and Config |

**Do now (6 min):** one path pass → first red rubric item.`,
 },
 {
 title: "Mini money scheme",
 content: `On the server:

\`coins.Value = coins.Value + amount\` -- only from collector / reward  
\`if coins.Value < price then return end\`  
\`coins.Value -= price\`  
\`applyUpgrade(player, upgradeId)\`

\`applyUpgrade\` reads \`UpgradeConfig[id]\` (price already checked) and changes the player's dropper config.

Client: Prompt / button "buy id". Does not send a new price as truth.

leaderstats:

\`Coins\` IntValue in Folder leaderstats on Player; visible in TAB.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Onboarding in 8 minutes",
 content: `A tycoon newcomer gets lost: unclear what to pick up and where to press.

Minimum:
- a 3-step sign near the plot;
- a bright collector;
- Billboard on the first upgrade button with the price.

Text:
*"1) Collect drops into the collector. 2) Watch coins in TAB. 3) Buy an upgrade on the button."*

Step away from the monitor and come back: is the start clear without your words?

**Do now (4 min):** run one check from this section in Play and write the result in a Note.`,
 },
 {
 title: "Integration playtest",
 content: `| # | Action | Expectation | Fact |
|---|-----|------------|------|
| 1 | Play | Plot/spawn OK | |
| 2 | Wait for a drop | Parts appear | |
| 3 | Collector | Coins++ in leaderstats | |
| 4 | Buy with no money | Denial | |
| 5 | Buy with money | Deduct + effect | |
| 6 | Fake Coins on client | Does not change server truth | |
| 7 | Second cycle | Drop faster/larger | |
| 8 | Output | No red | |
| 9 | 90 s demo | You fit | |

Rows 3-6 are the heart of Ship Tycoon.

**Do now (5 min):** walk the test table once and record pass/fail for each row.`,
 },
 {
 title: "What to consciously postpone",
 content: `Do not do today:
- 20 upgrade buttons and a Rebirth tree;
- season DataStore (if not stable yet);
- Publish Public;
- open-world around the factory.

Do today:
- **one** MVP economy cycle;
- honest Coins;
- 1-2 upgrades from a table;
- rubric + Save.

Everything "I still want" goes into a note for M11 polish.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Handoff checklist for lesson 56 + bridge to M8",
 content: `- [ ] Golden path written
- [ ] Rubric ~15 points
- [ ] Drop → collector → Coins
- [ ] Purchase with canAfford on the server
- [ ] Upgrade changes gameplay
- [ ] No client "cheat" Coins in the handoff
- [ ] 60-90 s demo
- [ ] Save: Lesson 7.8 - Tycoon Ship

Next **module 8 Arena**: the same server-number discipline, but for HP/damage. If the coin register is still on the client, do **not** move on proudly.

**Do now (3 min):** walk the checklist and check only items you actually completed.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Coins++ only in LocalScript",
 explanation: "Cheating and TAB desync.",
 correctApproach: "leaderstats on the server",
 },
 {
 mistake: "Three Places: dropper / shop / plot separate",
 explanation: "No integrated cycle.",
 correctApproach: "One Place, one golden path",
 },
 {
 mistake: "Upgrade with no Config change",
 explanation: "Cosmetic purchase; cycle is dead.",
 correctApproach: "Change interval/amount after purchase",
 },
 {
 mistake: "Rubric \"almost\", demo with a coach",
 explanation: "That is not ship for the player.",
 correctApproach: "Onboarding + 90 s with no explanations",
 },
 {
 mistake: "Double click buys twice",
 explanation: "Economy breaks.",
 correctApproach: "debounce / owned flag",
 },
 {
 mistake: "20 upgrades instead of closing 1 cycle",
 explanation: "An hour vanishes; blockers remain.",
 correctApproach: "1-2 MVP upgrades",
 }
 ],
 summary: "You assembled Ship Tycoon: one golden path drop → collect → upgrade purchase on server Coins. The rubric and 60-90 s demo confirm the module before Arena.",
 practiceTask: {
 title: "Ship Tycoon: stitch and hand off (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** one Place with cycle plot → coins → upgrade.

### Part A - Map and rubric (8 min)
1. Golden path 6-8 steps.
2. Rubric ~15 points in Play.
3. Write P0 from B and C.

### Part B - Integration fixes (15 min)
1. Collector → leaderstats on the server.
2. canAfford + deduct + debounce.
3. Upgrade really changes the dropper.
4. Remove client Coins++ from the handoff.

### Part C - Demo and Save (7 min)
1. Playtest 1-9.
2. 60-90 s rehearsal.
3. **Save:** Lesson 7.8 - Tycoon Ship`,
 hints: [
 "First TAB Coins 1:1 with collection fact, then the button",
 "1 speed upgrade is enough for ship",
 "print on the server after purchase"
 ],
 optionalChallenge: "Second player / 2 windows: each their own plot; coins do not mix.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 7.8?",
 options: [
          "Stitch the tycoon into a golden path and close the Ship rubric",
          "Delete leaderstats",
          "Start Arena from zero",
          "Publish with no cycle"
        ],
 correctAnswer: 0,
 explanation: "Ship Tycoon.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where is the truth about Coins?",
 options: [
          "Only in a LocalScript TextLabel",
          "On the server in leaderstats",
          "In Lighting",
          "In the dropper Part name"
        ],
 correctAnswer: 1,
 explanation: "Server money.",
 },
 {
 id: "q3",
 type: MC,
 question: "What is the tycoon golden path?",
 options: [
          "List of all Plugins",
          "Required open-world",
          "Short route drop → collect → purchase with no coach",
          "Only Skybox"
        ],
 correctAnswer: 2,
 explanation: "Integrated cycle.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why canAfford before deduct?",
 options: [
          "Increase MaxHealth",
          "Turn the dropper off",
          "Create Terrain",
          "Do not buy into negative / with no money"
        ],
 correctAnswer: 3,
 explanation: "Price check.",
 },
 {
 id: "q5",
 type: MC,
 question: "What does rubric block C check?",
 options: [
          "Only wall color",
          "Money honesty: server, price from table, anti client Coins",
          "Module 1 name",
          "Number of Decals"
        ],
 correctAnswer: 1,
 explanation: "Economic honesty.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why must an upgrade change Config?",
 options: [
          "Config is forbidden in tycoon",
          "Otherwise leaderstats disappears",
          "Otherwise the purchase is not felt in gameplay",
          "Weld then breaks"
        ],
 correctAnswer: 2,
 explanation: "Upgrade effect.",
 },
 {
 id: "q7",
 type: MC,
 question: "What should you NOT do in 7.8?",
 options: [
          "Build 20 upgrades instead of closing the cycle",
          "Walk the rubric",
          "Check collector",
          "Save the Place"
        ],
 correctAnswer: 0,
 explanation: "Narrow MVP.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why debounce on purchase?",
 options: [
          "It replaces the dropper",
          "debounce paints Sky",
          "Required for SpawnLocation",
          "Double click does not buy twice for free"
        ],
 correctAnswer: 3,
 explanation: "Purchase anti-spam.",
 },
 {
 id: "q9",
 type: MC,
 question: "How long is the target Ship demo?",
 options: [
          "Required 40 minutes of explanations",
          "Opening Explorer is enough",
          "About 60-90 seconds with no coach",
          "Only a screenshot"
        ],
 correctAnswer: 2,
 explanation: "Short demo.",
 },
 {
 id: "q10",
 type: MC,
 question: "How does 7.8 prepare M8 Arena?",
 options: [
          "Arena forbids the server",
          "The habit \"server decides critical numbers\" carries to HP/damage",
          "Must delete tycoon from memory",
          "In Arena only the client writes Coins"
        ],
 correctAnswer: 1,
 explanation: "Server discipline.",
 },
 {
 id: "q11",
 type: MC,
 question: "P0 for tycoon?",
 options: [
          "Slightly crooked button color",
          "Imperfect Ambient",
          "Small Billboard offset",
          "Coins/purchases fully on the client with no server"
        ],
 correctAnswer: 3,
 explanation: "Critical economy hole.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why one Place instead of three?",
 options: [
          "Otherwise there is no integrated golden path",
          "Studio allows only one Place",
          "Three Places are always faster",
          "Rubric forbids folders"
        ],
 correctAnswer: 0,
 explanation: "Integration.",
 },
 {
 id: "q13",
 type: MC,
 question: "What should collector do?",
 options: [
          "Delete the plot",
          "Create RemoteFunction always",
          "Add Coins on the server into leaderstats",
          "Only change Floor color"
        ],
 correctAnswer: 2,
 explanation: "Money collection.",
 },
 {
 id: "q14",
 type: MC,
 question: "Where should upgrade price come from?",
 options: [
          "Blindly from a client number",
          "From Sound Volume",
          "From the Sky name",
          "From a server table/config"
        ],
 correctAnswer: 3,
 explanation: "Config truth.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the handed-off artifact for 7.8?",
 options: [
          "Theory only",
          "Golden path + rubric + honest Coins/upgrade + Save",
          "Empty Baseplate",
          "Client Coins=9999"
        ],
 correctAnswer: 1,
 explanation: "Tycoon ship is required.",
 }
 ],
 },
}

