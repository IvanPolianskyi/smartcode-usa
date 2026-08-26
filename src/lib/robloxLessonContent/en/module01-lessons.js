/** Roblox Module 01 EN - lesson 1.1 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

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
 "Open Roblox Studio and the Baseplate template.",
 "Control the camera and the Explorer, Properties, and Output panels.",
 "Use the Select, Move, Scale, Rotate, Snap, and Duplicate tools.",
 "Distinguish between Part types (Block, Sphere, Wedge, Cylinder, CornerWedge).",
 "Build a house and cut out windows and doors using Negate and Union.",
 "Save the Place to Roblox as the first course project.",
 ],
 theory: {
 sections: [
 {
 title: "Course introduction and lesson task",
 content: `In this lesson, you will create a complete house with a floor, walls, a roof, windows, and a doorway.

You will cut out the windows and door using the Negate and Union tools. This method lets you create complex shapes without assembling them from many small details. Learning Union now will make it easier to work on more complex levels later.

Keep Roblox Studio open as you read and repeat each action in the Viewport. Hands-on practice is the fastest way to learn the interface.

**Complete these items by the end of the lesson:**
- A grouped model named \`House_01\`.
- At least 2 window openings created with Union.
- A doorway, or a third window.
- A saved level named \`Lesson 1.1 - House_01\`.`,
 },
 {
 title: "Roblox Studio basics",
 content: `Roblox Studio is a game development environment for Roblox. You can use it to create game objects (Parts), build landscapes (Terrain), write scripts (Luau), and configure the user interface (UI).

Go to [create.roblox.com](https://create.roblox.com/) and sign in to your account. Launch Studio, select New, and choose the Baseplate template.

Baseplate is an empty level with a flat floor and sky. Unlike templates such as City or Obby, it has no extra objects or scripts to get in the way.

**Do this now:** create a level from the Baseplate template. On the View tab, enable the Explorer and Properties panels. Select the floor. The \`Baseplate\` object should be highlighted in Explorer.`,
 },
 {
 title: "Interface and workspace",
 content: `The Studio workspace consists of several main panels.

| Panel | Location | Purpose |
|--------|-------------|----------------------|
| **Viewport** | Center | The 3D world where you build the level and control the camera. |
| **Home** | Top | Main tools (Part, Move, Scale, Rotate, Play, Snap). |
| **Model** | Top | Model tools (Group, Union, Negate, Separate). |
| **Explorer** | Right | The hierarchy and tree of every object in the game. |
| **Properties** | Below Explorer | Properties of the selected object (Name, Size, Anchored, Material). |
| **Output** | Bottom | Messages and system errors. |

Explorer shows the level structure. Properties lets you edit the selected object's settings. Always select an object before changing its values.

**Do this now:**
1. Select Baseplate and review its Name, Anchored, Size, and Material properties in Properties.
2. Open Output from the View tab.
3. Review the tools on the Home and Model tabs.`,
 },
 {
 title: "Camera controls",
 content: `Accurate camera control is essential for placing objects precisely in 3D space.

Viewport navigation:
|Action|Control|
|---|---------|
|Forward / backward| **W** / **S**|
|Left / right| **A** / **D**|
|Up / down| **E** / **Q**|
|Rotate the camera| **Right mouse button** + move the mouse|
|Zoom in and out|**Mouse wheel**|
|Focus on an object| Select the object in Explorer and press **F**|

Use several viewing angles as you work. Inspect the structure from above, from the side, and from the player's perspective. Before applying Union, always inspect the wall from several sides.

**Do this now:** move the camera above Baseplate. Select Baseplate and press F to focus on it.`,
 },
 {
 title: "Basic building tools",
 content: `The main object manipulation tools are:

| Key | Tool | Action |
|---------|------------|-----------|
| **1** | **Select** | Select an object. |
| **2** | **Move** | Move an object along the axes. |
| **3** | **Scale** | Resize an object. |
| **4** | **Rotate** | Rotate an object around its axis. |

Always enable **Snap to Grid** on the Home tab. This helps objects align precisely without gaps.

Use **Ctrl+D** (Duplicate) to copy objects quickly.

Important: all static objects, including walls, floors, and roofs, must have **Anchored = true**. This fixes them in place so gravity does not make them fall during the game.

**Do this now:**
1. Create a block (Home → Part → Block).
2. Rename it \`TestBlock\`.
3. Use Scale to change its shape, then use Move and Snap to place it on the floor.
4. Confirm that Anchored = true, then run Play (F5) to verify that it stays in place.`,
 },
 {
 title: "Geometric shape types (Parts)",
 content: `Studio provides several basic shapes for modeling:

| Type | Use |
|-----|---------------------------|
| **Block** | Walls, floors, roofs, and basic structures. |
| **Sphere** | Decorative elements. |
| **Wedge** | Roof slopes and ramps. |
| **Cylinder** | Columns, pipes, and chimneys. |
| **CornerWedge** | Corners for complex slopes. |

You will build the house frame entirely from Blocks because they provide a reliable shape for learning Union.

**Do this now:** add one Sphere, one Wedge, and one Cylinder to the scene. Resize and rotate them, then delete them to clear the space for the house.`,
 },
 {
 title: "Object properties (Properties)",
 content: `These are the main properties you will use:

| Property | Meaning | Example |
|----------|------------------|-----------------------------|
| **Name** | The object's name in the hierarchy | \`Wall_Front\`. |
| **Size** | Dimensions along X, Y, and Z in studs | \`20, 1, 16\`. |
| **Position** | The object's coordinates | Changed with the Move tool. |
| **Orientation** | Rotation angle in degrees | \`0, 90, 0\`. |
| **BrickColor** / **Color** | The object's color | Any standard color. |
| **Material** | The material texture | Plastic, Wood, Brick. |
| **Anchored** | Fixes the object in 3D space | **true** (required for walls). |
| **CanCollide** | Enables physical collision | **true**. |

Give objects clear names as soon as you create them. This makes it much easier to find specific parts later.

**Do this now:** change the Material and BrickColor properties of any test block, then delete it.`,
 },
 {
 title: "House construction plan",
 content: `Recommended sequence:

1. **Floor**: Create the floor that serves as the foundation.
2. **Walls**: Build four walls around the edge of the floor (\`Wall_Back\`, \`Wall_Left\`, \`Wall_Right\`, \`Wall_Front\`).
3. **Roof**: Add a roof that is slightly wider than the base.
4. **Windows**: Create openings in the walls with Negate and Union.
5. **Doorway**: Cut out an entrance.
6. **Grouping**: Combine the parts into the \`House_01\` model.
7. **Saving**: Save the project to the cloud.

Suggested dimensions:
- Floor: \`20, 1, 16\`.
- Wall height: \`10\`.
- Wall thickness: \`1\`.
- Window cutout: ≈ \`3, 3, 2\`.
- Door cutout: \`3, 5, 3\` (height of at least \`5\`).

`,
 },
 {
 title: "Step-by-step construction: floor, walls, and roof",
 content: `### Floor
1. Create a block and rename it \`Floor\`.
2. Set its dimensions to approximately \`20, 1, 16\`, enable Anchored = true, and choose a material such as Concrete or Wood.

### Walls
1. Create a block named \`Wall_Back\` and place it along the back edge of the floor. Use an approximate height of 10 and thickness of 1.
2. Use Ctrl+D to duplicate it and create \`Wall_Left\`, \`Wall_Right\`, and \`Wall_Front\`.
3. Use Rotate for the side walls as needed.
4. Make sure the corners meet cleanly without large gaps. All walls must have Anchored = true.

### Roof
1. Create an object named \`Roof\`. Make it slightly wider than the floor, for example \`22, 1, 18\`, to create an overhang.
2. Place it above the walls and make sure there are no gaps.
3. Enable Anchored = true.


### Do this now
Build the house frame and run Play (F5) to verify that the objects stay in place.`,
 },
 {
 title: "Creating openings with Negate and Union",
 content: `Constructive solid geometry (CSG) tools let you cut sections out of objects.

### Creating a window
1. Select a wall, such as \`Wall_Left\`.
2. Create a new block and name it \`WindowCut_01\`.
3. Set the cutout size. It must be thicker than the wall.
4. Place the cutout block inside the wall where the window will be. Check its position from several angles.
5. Select \`WindowCut_01\` and choose **Negate** on the Model tab. The block will become translucent.
6. Select the wall and cutout block together by holding Ctrl, then choose **Union**.
7. Rename the resulting object and enable **Anchored = true**.

### Doorway
Repeat the same process for \`Wall_Front\`, but position the cutout block so that it touches the floor. The opening must be tall enough for the character to pass through, at least 5 studs.

If Union produces the wrong result, select the object and choose **Separate** to split it apart and correct the problem.

### Do this now
Create at least two windows and one doorway. Check the results in Play mode.`,
 },
 {
 title: "Grouping and saving the project",
 content: `### Grouping the model
1. In Explorer, hold Ctrl and select the floor, all walls, and the roof. Make sure unrelated objects such as Baseplate are not selected.
2. Press **Ctrl+G** (or Model → Group) and name the resulting model \`House_01\`.

### Saving to the cloud
Select **File → Save to Roblox** and enter the name \`Lesson 1.1 - House_01\`. This saves the level to your account.
`,
 },
 {
 title: "Project completion requirements",
 content: `Review your work before completing the lesson.

1. **Object names:** Every part in Explorer should have a meaningful name (\`Floor\`, \`Wall_Front\`, \`Roof\`).
2. **Anchoring:** Confirm that every part has Anchored = true.
3. **Play test:** Run the level and try to walk through the doorway.
4. **Saving:** Confirm that the project is saved to Roblox with the correct name.

Later lessons cover facade decoration, lighting, and scripts. For now, focus on accurate geometry and a clean frame.

**Do this now:** complete the checks above.`,
 },
 {
 title: "Evaluation criteria",
 content: `| Level | Requirements |
|--------|------------------|
| **Incomplete** | No windows were created with Union. Objects are not anchored and fall. The project is not saved. |
| **Complete** | The project includes a floor, walls, and a roof, with at least 2 windows and a doorway. The model is grouped and saved. |
| **Good** | Snap keeps the geometry aligned. Objects have clear names. The character can pass through the door. |
| **Excellent** | The house includes simple decorative details, such as a chimney, and has clean proportions. |`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "The walls fall or collapse after starting Play",
 explanation: "Anchored is disabled. Union can reset this property automatically.",
 correctApproach: "Select every part of the house and set Anchored = true. Always check this after using Union.",
 },
 {
 mistake: "Explorer or Properties is missing",
 explanation: "The panels were closed accidentally.",
 correctApproach: "Open the View tab and enable Explorer and Properties.",
 },
 {
 mistake: "Union does not cut all the way through the wall",
 explanation: "The cutout block was not converted with Negate, or it is thinner than the wall.",
 correctApproach: "Apply Negate to the cutout block. Before using Union, make sure it extends through both sides of the wall.",
 },
 {
 mistake: "Union combined extra parts",
 explanation: "More than two objects were selected.",
 correctApproach: "Undo the action (Ctrl+Z) or use Separate. Select only the required wall and cutout block, then repeat the operation.",
 },
 {
 mistake: "The character cannot pass through the door",
 explanation: "The doorway is too small or does not reach the floor.",
 correctApproach: "Check the opening height in Play mode. Increase the cutout block dimensions and repeat Union.",
 },
 {
 mistake: "The project was not saved",
 explanation: "The project was saved only locally or was not saved at all.",
 correctApproach: "Use File → Save to Roblox and give the level a clear name.",
 },
 {
 mistake: "Gaps appear between the walls",
 explanation: "The objects were moved without Snap to Grid enabled.",
 correctApproach: "Enable Snap to Grid to align the blocks precisely.",
 },
 ],
 summary:
 "In this lesson, you reviewed the Studio interface, basic modeling tools, object types, and the use of CSG (Negate + Union) to create openings. You created and saved the course's first structural project, a house model.",
 practiceTask: {
 title: "Practice: House_01",
 difficulty: "beginner",
 description: `**Task:** Create a house frame with window and door openings, then save the project.

### Part A: Frame
1. Create a level from the Baseplate template. Add a \`Floor\` block with approximate dimensions of 20×1×16 and enable Anchored.
2. Build four walls: \`Wall_Front\`, \`Wall_Back\`, \`Wall_Left\`, and \`Wall_Right\` (height around 10, Anchored = true).
3. Add a \`Roof\` object above the walls.
4. Run Play to test stability.

### Part B: Openings
1. Cut a window in \`Wall_Left\` using Negate and Union.
2. Create at least one more window in another wall.
3. Create a doorway in \`Wall_Front\`.
4. Confirm that Anchored = true after every Union operation.
5. Test the doorway in Play mode.

### Part C: Saving
1. Group the objects into a model named \`House_01\`.
2. Save the project through **File → Save to Roblox** with the name \`Lesson 1.1 - House_01\`.
3. Mark the practice as complete in the system.`,
 hints: [
 "Enable Snap to Grid to position the walls precisely.",
 "The cutout block must be thicker than the wall.",
 "Always check the Anchored property after Union.",
 "To focus the camera, select an object and press F.",
 "Use Separate to correct Union errors.",
 ],
 optionalChallenge:
 "Create a more complex roof with Wedge Parts, then add a chimney with a Cylinder.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Which template is the best starting point?",
 options: [
          "Obby",
          "City",
          "Baseplate",
          "Empty",
        ],
 correctAnswer: 2,
 explanation: "Baseplate provides an empty plane and sky, making it a useful starting point without extra objects.",
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
 explanation: "Key 2 activates Move, 1 activates Select, 3 activates Scale, and 4 activates Rotate.",
 },
 {
 id: "q3",
 type: MC,
 question: "Which key activates the Scale tool?",
 options: [
          "1",
          "2",
          "4",
          "3",
        ],
 correctAnswer: 3,
 explanation: "Key 3 activates the Scale tool.",
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
 explanation: "Key 4 activates the Rotate tool.",
 },
 {
 id: "q5",
 type: MC,
 question: "What does the F key do after you select an object?",
 options: [
          "Focuses the camera on the object",
          "Deletes the object",
          "Starts Play mode",
          "Combines objects with Union",
        ],
 correctAnswer: 0,
 explanation: "Pressing F moves the camera to the selected object.",
 },
 {
 id: "q6",
 type: MC,
 question: "Which panel displays the hierarchy of every object in the game?",
 options: [
          "Properties",
          "Toolbox",
          "Explorer",
          "Output",
        ],
 correctAnswer: 2,
 explanation: "Explorer contains the tree of every object in the level.",
 },
 {
 id: "q7",
 type: MC,
 question: "What does Anchored = true mean?",
 options: [
          "The object becomes invisible",
          "The object is fixed in place and is not affected by gravity",
          "The object cannot be selected",
          "The object becomes a negative shape",
        ],
 correctAnswer: 1,
 explanation: "This property fixes the object in position during the game.",
 },
 {
 id: "q8",
 type: MC,
 question: "What is Snap to Grid used for?",
 options: [
          "Playing sounds",
          "Deleting Terrain",
          "Publishing the game",
          "Aligning objects precisely to the grid",
        ],
 correctAnswer: 3,
 explanation: "Snap to Grid helps prevent gaps between parts when you position them.",
 },
 {
 id: "q9",
 type: MC,
 question: "What is the correct process for cutting out a window?",
 options: [
          "Apply Union, then apply Negate to the wall",
          "Resize the wall with the Scale tool",
          "Apply Negate to the cutout block, select it with the wall, then apply Union",
          "Disable Anchored and start Play",
        ],
 correctAnswer: 2,
 explanation: "First apply Negate to the cutout block, then combine it with the wall using Union.",
 },
 {
 id: "q10",
 type: MC,
 question: "What does Negate do?",
 options: [
          "Converts an object into a volume that will be subtracted from another shape",
          "Changes the color to green",
          "Saves the project",
          "Creates a new Script",
        ],
 correctAnswer: 0,
 explanation: "Negate converts a Part into negative space for a cutting operation.",
 },
 {
 id: "q11",
 type: MC,
 question: "When should you use Separate?",
 options: [
          "Publishing the game",
          "To control the camera",
          "To create Terrain",
          "To split objects after an incorrect Union",
        ],
 correctAnswer: 3,
 explanation: "Separate splits a combined model back into its original components.",
 },
 {
 id: "q12",
 type: MC,
 question: "Which keyboard shortcut duplicates an object?",
 options: [
          "Ctrl+S",
          "Ctrl+D",
          "F5",
          "Delete",
        ],
 correctAnswer: 1,
 explanation: "Ctrl+D quickly creates a copy of the selected object.",
 },
 {
 id: "q13",
 type: MC,
 question: "Which shape is best for creating a column?",
 options: [
          "Block",
          "Wedge",
          "Cylinder",
          "CornerWedge",
        ],
 correctAnswer: 2,
 explanation: "A Cylinder has the right shape for columns and pipes.",
 },
 {
 id: "q14",
 type: MC,
 question: "How do you save a project to the Roblox cloud?",
 options: [
          "Take a screenshot",
          "Edit → Copy",
          "View → Output",
          "File → Save to Roblox",
        ],
 correctAnswer: 3,
 explanation: "Save to Roblox stores the current level in your account.",
 },
 {
 id: "q15",
 type: MC,
 question: "What are the requirements for the final task in lesson 1.1?",
 options: [
          "A grouped House_01 model with cutout windows and a saved project",
          "A completely empty level",
          "Creating a lighting Script",
          "Opening the Toolbox panel",
        ],
 correctAnswer: 0,
 explanation: "The task requires you to build a frame with openings, group it, and save it.",
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
 "Distinguish Terrain from Parts and understand when to use each one.",
 "Open Terrain Editor and use the Generate and Edit tabs.",
 "Shape the landscape with Draw, Sculpt, Smooth, and Flatten.",
 "Paint the landscape with Grass, Sand, and Rock materials, then add Water.",
 "Place the House_01 model on an island, test the level, and save it.",
 ],
 theory: {
 sections: [
 {
 title: "Lesson task: build an island around the house",
 content: `In the previous lesson, you built a house. In this lesson, you will create a complete island around it with hills, water, grass, and sand. You will use the Terrain tools for this work.

**Complete these items by the end of the lesson:**
- Create an island with land and water.
- Create at least one hill and smooth the shoreline with Smooth.
- Use at least 3 materials, such as Grass, Sand, and Water.
- Place the house from the previous lesson on a flat area.
- Save the level as \`Lesson 1.2 - Island\`.

Open your saved level from lesson 1.1 (\`Lesson 1.1 - House_01\`). Keep Roblox Studio open and repeat each action as you read.`,
 },
 {
 title: "The difference between Parts and Terrain",
 content: `| Characteristic | **Parts** | **Terrain** |
|---|-----------|-------------|
| What it is | Separate blocks such as walls, roofs, and buttons. | The continuous ground of the level. |
| What it is used for | Buildings, mechanisms, and small objects. | Islands, lakes, beaches, mountains, and paths. |
| How to edit it | Move, Scale, Rotate, Union. | **Terrain Editor**: Generate, Sculpt, Paint. |
| How it appears in Explorer | Many objects with individual names. | One \`Terrain\` object in the Workspace Folder. |

**Common mistakes:**
1. Creating large natural features, such as an ocean, from basic blocks. This reduces performance. Use Water in Terrain Editor.
2. Replacing interactive objects, such as doors or buttons, with Terrain. Interactive elements must use Parts.

**Do this now:** find \`Workspace → Terrain\` in Explorer. Select it and review its properties. Do not delete it.`,
 },
 {
 title: "How Terrain Editor works",
 content: `To start working with Terrain:
1. Open the **Home** tab.
2. Select **Terrain**, which has a mountain icon. You can also open it through **Window → 3D**.
3. A panel with two main tabs will appear on the left.

Main tabs:
- **Create**: Generate Terrain automatically with Generate, or import a heightmap with Import.
- **Edit**: Edit Terrain manually with Select, Transform, Draw, Sculpt, Smooth, Paint, Flatten, and other tools.

Most Edit tools include brush settings: **Brush Shape** (sphere, box, cylinder), **Brush Size**, and **Strength** for a softer effect. A large brush is useful for the island's overall shape, while a small brush works well for paths and details near the house. Important: Terrain tools do not work in Play mode, so select Stop before editing.

**Do this now:** open Terrain Editor and review the Create and Edit tabs. Do not select any tools yet.`,
 },
 {
 title: "Generate: creating an island quickly",
 content: `1. Open the **Create** tab in Terrain Editor.
2. Select **Generate**.
3. Choose a size, such as 512 × 128 × 512.
4. Choose biomes to generate, such as **Plains** or **Dunes**, along with **Water**. Configure **Blending** and **Biome Size**.
5. Select **Generate** and wait for Studio to create the map. If the result does not work for your level, press Ctrl+Z and try again with different settings or change the Seed.

**Important:** Generation may change the ground level, leaving your house underground or high in the air. Keep the house. Find it in Explorer, focus the camera on it with F, level the ground below it with Flatten, and use Move to place it correctly.

**Do this now:** generate an island. Fly around it with the camera and find a flat location near the water for the house. Save the project after generation.`,
 },
 {
 title: "Adding volume with Draw and Sculpt (Add mode)",
 content: `The **Edit** tab has two tools for raising the ground:

- **Draw (Add mode)**: Adds volume quickly and noticeably. Use it to create rough forms such as hills, cliffs, and small islands. It works quickly but produces sharp edges.
- **Sculpt (Add mode)**: Builds up the ground more gently without sharp peaks. Its **Strength** setting controls the effect. Lower values add volume more gradually. Use it to refine hills after Draw.

**Tip:** First create the mountain's general shape with a large Draw (Add) brush. Then refine it with Sculpt (Add), using a smaller brush and a Strength of about 0.3–0.5.

Avoid making hills too steep, or the character will not be able to climb them during the game. Check the hill's profile from the side as you work.

**Do this now:** use Draw (Add) to create the general shape of a hill near the house. Then use Sculpt (Add) with a smaller brush to smooth it. Inspect it from the side.`,
 },
 {
 title: "Excavating with Draw and Sculpt (Subtract mode)",
 content: `To remove ground, use Draw and Sculpt with **Subtract** selected in the toolbar. You can also hold **Ctrl** while drawing.

- **Draw (Subtract)**: Digs clearly defined holes. Use it to create depressions for lakes, bays, or cliffs quickly. It produces sharp edges.
- **Sculpt (Subtract)**: Removes the surface more gently. Use it to make shorelines look more natural or reduce a mountain peak that is too sharp. The **Strength** setting controls how much material is removed.

**Tip:** First dig a hole with Draw (Subtract), then apply Sculpt (Subtract) around the edges at low Strength to make them look more natural.

To create a beach:
1. Dig a depression for the water with Draw (Subtract).
2. Leave a gently sloped strip of land between the water and grass. This will become the beach.
3. Later, paint this strip with the Sand material.

Do not dig directly next to the house foundation until you have leveled the area beneath it.

**Do this now:** use Draw (Subtract) to dig an area for a lake or bay. Smooth the shoreline with Sculpt (Subtract), leaving a strip of land for the beach.`,
 },
 {
 title: "Leveling and smoothing with Smooth and Flatten",
 content: `After using the previous tools, the ground often remains uneven with sharp edges.

- **Smooth**: Softens sharp edges without making them completely flat. Apply it to shorelines near the water and to hill slopes. You can also activate it quickly by holding **Shift** while using Draw or Sculpt.
- **Flatten**: Levels a surface into a flat area. Use it to create a level yard beneath the house or a flat path. It has three **Flatten Mode** options: **Erode to Flat** removes ground above the plane, **Grow to Flat** adds ground below the plane, and **Flatten All** levels in both directions at once.

**Do this now:** level an area for the house with Flatten and place the house on it. Then use Smooth to soften the shoreline of your body of water.`,
 },
 {
 title: "Paint: applying materials",
 content: `The **Edit** tab includes **Paint**, which changes the ground texture. Choose a material and apply it with the brush.

Paint supports two **Material Mode** options:
- **Paint**: Applies the selected material over the existing material.
- **Replace**: Replaces one material with another throughout an area. This is useful when you want to replace all the grass with sand in a specific zone, for example.

Main island materials:
- **Grass**: Use for most of the island and the yard.
- **Sand**: Use for the shoreline next to the water.
- **Rock**: Use for cliffs and steep slopes.
- **Water**: Use to fill excavated low areas for lakes or the ocean.

A natural shoreline has layers: grass transitions to sand, and sand transitions to water.

**Important:** Water wave animation may not be visible in the editor. Run Play mode to check how the water looks.

**Do this now:** paint the island with Grass, Sand, and Water. Make sure there is a strip of sand between the grass and water.`,
 },
 {
 title: "Testing and saving",
 content: `1. Check that the house stands on a flat area created with Flatten and that its Parts are Anchored.
2. Create a short path from the door to the beach by painting it with sand or soil.
3. Select **Play (F5)** and move your character from the house to the water, then up the hill.
4. Confirm that the character does not get stuck, the water remains in place, and the house does not float above the ground.
5. Save your work with **File → Save to Roblox** using the name \`Lesson 1.2 - Island\`.

**Do this now:** run a Play test of the route. If the character cannot climb the hill, return to Smooth and make the slope more gradual.`,
 },
 {
 title: "Recommended workflow",
 content: `For an efficient Terrain Editor workflow, use this sequence:

1. **Generate**: Create the initial land and water masses. Save the project.
2. **Shape the terrain**: Use a large brush with Draw/Sculpt to create hills and bodies of water.
3. **Level and smooth**: Use Flatten for building sites and Smooth for shores and slopes.
4. **Place objects**: Move the house model onto the leveled area.
5. **Add detail (Paint)**: Apply materials (Grass, Sand, Rock, Water).
6. **Playtest**: Check that the environment is navigable.
7. **Save the final version**.

Following this structure prevents duplicate work, such as applying materials before the terrain has been fully smoothed.`,
 },
 {
 title: "Lesson 1.2 review criteria",
 content: `**Project requirements:**
- [ ] The landscape is shaped with Terrain Editor, not a flat Baseplate.
- [ ] The terrain includes raised areas (hills) and depressions (bodies of water).
- [ ] Shores and slopes are smoothed with the Smooth tool.
- [ ] At least 3 materials are used, including a Grass → Sand → Water transition.
- [ ] The house is placed on a leveled area made with Flatten.
- [ ] A Play test confirms that the character can navigate the route.
- [ ] The project is saved as \`Lesson 1.2 - Island\`.

| Level | Criteria |
|--------|-------------------------------|
| **Incomplete** | Water or terrain is missing. The house is placed incorrectly, either floating or underground. The project is not saved. |
| **Complete** | Land, water, and a hill are present, and at least 3 materials are used. The house is placed on level ground. |
| **Good** | The shoreline looks realistic, Smooth has been used, and the slopes and path to the house are navigable. |
| **Excellent** | The landscape has a complex, intentional shape, such as several bodies of water or a bay. |`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Nothing changed after using Generate, or Studio stopped responding.",
 explanation: "The application is still processing the map.",
 correctApproach: "Wait 10-20 seconds. If nothing happens, clear the Terrain and try generating it again.",
 },
 {
 mistake: "The house sank underground or is floating high above the ground.",
 explanation: "The generator changed the overall ground elevation in the level.",
 correctApproach: "Do not delete the house. Level the area beneath it with Flatten, then lower or raise the house with the Move tool.",
 },
 {
 mistake: "The shores and mountains have sharp, saw-like edges.",
 explanation: "Smooth was not used after shaping the terrain.",
 correctApproach: "Apply Smooth to every steep slope and shore before painting them.",
 },
 {
 mistake: "The beach does not look natural.",
 explanation: "The grass meets the water directly, with no transition area.",
 correctApproach: "Leave a strip of land between them and paint it with the Sand material.",
 },
 {
 mistake: "The water looks like plain blue paint with no waves.",
 explanation: "Water animation usually does not run in edit mode.",
 correctApproach: "Start Play mode (F5) to see the water correctly.",
 },
 ],
 summary:
 "You can now work with Terrain Editor. You generated a basic island, shaped hills and bodies of water with Draw and Sculpt, leveled a site for the house, and painted the landscape with materials. The house now stands in a complete level.",
 practiceTask: {
 title: "Practice: Create an island around the house",
 difficulty: "beginner",
 description: `**Task:** Create an island with a hill, water, and a beach around the house from the previous lesson.

### Part A: Basic shape
1. Open Terrain Editor and generate a biome, such as Plains or Dunes, together with Water.
2. Find your house. Use Flatten to create a level area beneath it.
3. Place the house on this site and check Anchored.

### Part B: Terrain
1. Use Draw (Add) or Sculpt (Add) to make one nearby hill.
2. Use Draw (Subtract) to dig a depression for a lake or sea. Leave room for a beach.
3. Apply Smooth to the shores and the hill slopes.

### Part C: Painting and testing
1. Paint the main land area with Grass.
2. Paint the shore near the water with Sand.
3. Fill the depression with Water.
4. Start Play and try walking from the house to the water.
5. Save the level through **File → Save to Roblox** as \`Lesson 1.2 - Island\`.
6. Mark the practice as complete.`,
 hints: [
 "Use a large brush for the overall shape and a small brush for details near the house.",
 "Smooth the shores before painting so they look natural.",
 "Always check the water in Play mode.",
 ],
 optionalChallenge:
 "Create a rocky cliff on one side of the water using the Rock material, and a gently sloping sandy beach on the other side.",
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
          "Creating natural landscapes such as hills, beaches, and lakes",
          "Adding sounds",
        ],
 correctAnswer: 2,
 explanation: "Terrain is used to create land and natural environments, while Parts are used for buildings.",
 },
 {
 id: "q2",
 type: MC,
 question: "How is Terrain different from regular blocks (Parts)?",
 options: [
          "Terrain is continuous ground, while a Part is an individual building block",
          "Terrain cannot be saved",
          "Terrain always glows",
          "Terrain is visible only in Play mode",
        ],
 correctAnswer: 0,
 explanation: "Terrain forms a continuous world landscape, while Parts are individual construction elements.",
 },
 {
 id: "q3",
 type: MC,
 question: "Which tool automatically creates terrain from selected settings?",
 options: [
          "Paint",
          "Properties",
          "Toolbox",
          "Generate",
        ],
 correctAnswer: 3,
 explanation: "The Generate tool on the Create tab creates a map using the selected settings.",
 },
 {
 id: "q4",
 type: MC,
 question: "What does the Draw tool do in Add mode?",
 options: [
          "Deletes the level",
          "Raises and adds terrain",
          "Paints the ground with sand",
          "Combines objects with Union",
        ],
 correctAnswer: 1,
 explanation: "Draw in Add mode quickly builds terrain volume to create hills and rough shapes.",
 },
 {
 id: "q5",
 type: MC,
 question: "What is the difference between Draw and Sculpt?",
 options: [
           "Draw removes water",
           "Draw works only in Play mode",
           "Draw creates a script",
           "Sculpt raises terrain more gently and smoothly",
        ],
 correctAnswer: 3,
 explanation: "Sculpt builds terrain more smoothly than the sharper Draw tool.",
 },
 {
 id: "q6",
 type: MC,
 question: "What are the Subtract modes in Draw and Sculpt used for?",
 options: [
          "Saving the game",
          "Cutting holes and lakes and removing terrain",
          "Grouping models",
          "Opening the Output panel",
        ],
 correctAnswer: 1,
 explanation: "Draw (Subtract) cuts clearly into the terrain, while Sculpt (Subtract) removes the surface more gently.",
 },
 {
 id: "q7",
 type: MC,
 question: "What does the Smooth tool do?",
 options: [
          "Smooths sharp terrain edges",
          "Makes blocks transparent",
          "Enables Anchored",
          "Changes the brush size",
        ],
 correctAnswer: 0,
 explanation: "Smooth softens steep slopes and shores after other tools have been used.",
 },
 {
 id: "q8",
 type: MC,
 question: "When is the Flatten tool most commonly used?",
 options: [
          "Creating buttons",
          "Cutting windows",
          "Leveling a site for construction",
          "Changing a wall color",
        ],
 correctAnswer: 2,
 explanation: "Flatten makes a surface completely level, which is ideal for placing buildings.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which sequence is the best workflow for terrain?",
 options: [
          "Paint → Generate → Smooth",
          "Generate → Add/subtract mountains and holes → Smooth → Paint",
          "Play mode → Subtract → Generate",
          "Union walls → Paint → Generate",
        ],
 correctAnswer: 1,
 explanation: "First define the shape, then level and smooth it, and apply paint last.",
 },
 {
 id: "q10",
 type: MC,
 question: "Where is the Sand material most appropriate?",
 options: [
          "On the house roof",
          "On the ceiling",
          "On the doors",
          "On the shore near the water",
        ],
 correctAnswer: 3,
 explanation: "Sand looks natural along a shoreline or beach.",
 },
 {
 id: "q11",
 type: MC,
 question: "Which material sequence creates a natural shore?",
 options: [
          "Rock only",
          "Neon glow only",
          "Grass → Sand → Water",
          "Plastic only",
        ],
 correctAnswer: 2,
 explanation: "A transition from grass to sand and then water creates a realistic shore.",
 },
 {
 id: "q12",
 type: MC,
 question: "What should you do if the house sinks underground after generating the terrain?",
 options: [
          "Level the ground with Flatten and raise the house with the Move tool",
          "Delete the account",
          "Close the Explorer panel",
          "Apply Negate to the entire map",
        ],
 correctAnswer: 0,
 explanation: "Prepare a level site and move the house back to the surface.",
 },
 {
 id: "q13",
 type: MC,
 question: "Why should you check water in Play mode?",
 options: [
          "Because the terrain disappears in Play mode",
          "Because painting is available only in Play mode",
          "Because the generator works only in Play mode",
          "Because wave animation might not appear in the editor",
        ],
 correctAnswer: 3,
 explanation: "The full appearance and movement of water are enabled when you test the game.",
 },
 {
 id: "q14",
 type: MC,
 question: "What is a large Brush Size useful for?",
 options: [
          "Renaming files",
          "Quickly creating the overall shape of a large mountain",
          "Writing code",
          "Joining small blocks",
        ],
 correctAnswer: 1,
 explanation: "A large brush lets you establish the main terrain masses quickly.",
 },
 {
 id: "q15",
 type: MC,
 question: "What are the requirements for the final Lesson 1.2 task?",
 options: [
          "A completely empty level with no terrain",
          "One glowing block",
          "A saved island with water, smooth shores, three materials, and a placed house",
          "An open toolbar",
        ],
 correctAnswer: 2,
 explanation: "The task requires a complete, edited landscape with a house placed on it.",
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
 "Read and change an object's Properties through code.",
 "Create a Script inside a Part and work with the Output panel.",
 "Create local variables and use them to change an object's appearance.",
 "Use the print command to check whether code is working.",
 "Place a MagicCube on your island and save the project.",
 ],
 theory: {
 sections: [
 {
 title: "Lesson task: MagicCube",
 content: `In previous lessons, you built walls, windows, and terrain manually. In this lesson, you will work with code. Your task is to create a magic cube (\`MagicCube\`) that contains a Script. The code will change the cube's appearance and display text in the Output panel.

**Complete these steps by the end of the lesson:**
- Create a \`MagicCube\` block on your island.
- Add a **Script** inside it, not a LocalScript.
- Write code that uses \`local\`, changes Properties, and calls \`print\`.
- Use Play mode to confirm that the cube changes and text appears in Output.
- Save the level as \`Lesson 1.3 - MagicCube\`.

Open your saved \`Lesson 1.2 - Island\` level and keep the Output panel open.`,
 },
 {
 title: "Using Properties as code data",
 content: `In previous lessons, you changed Properties with the mouse. Now you will change the same settings with a script.

| Property | Meaning | How it is used here |
|----------|------------|-------------------------|
| **Name** | Object name | Identifies the cube among other objects. |
| **Size** | Dimensions (X, Y, Z) | Changes the cube's size through code. |
| **Position** | Coordinates | Leave this unchanged for now so the cube does not move into the sky. |
| **BrickColor** | Color | Creates a magic effect. |
| **Material** | Surface material | Uses Neon to make the cube glow. |
| **Anchored** | Fixed position | The cube must be anchored (true). |
| **Transparency**| Transparency | 0 = fully visible, 1 = invisible. |

Set basic options such as Anchored and Name manually before writing the Script. Code does not replace an organized Explorer structure.

**Do this now:** Create a block near the house. Name it \`MagicCube\`. Set its size to about \`4, 4, 4\`, choose the SmoothPlastic material and a bright color, and enable Anchored = true.`,
 },
 {
 title: "Creating a Script and opening Output",
 content: `1. Select \`MagicCube\` in Explorer.
2. Select **Insert → Script**, or right-click and select Insert Object → Script.
3. Make sure the Script is **inside** the cube, not directly in Workspace.
4. Open **View → Output**.

Studio automatically adds the code line \`print("Hello world!")\`.

**Why must the Script be inside the Part?** This makes the code operate on this cube instead of another object.

Use a standard server **Script**. A LocalScript is used for other tasks, such as interfaces, and is not needed here.

**Do this now:** Add a Script to your \`MagicCube\`. Open Output and select Play. If you see "Hello world!", the setup is correct. Select Stop.`,
 },
 {
 title: "Variables (local) as data containers",
 content: `A **variable** is a named location in memory that stores data such as text, numbers, or object references.

This is how you create variables in Luau:

\`\`\`lua
local part = script.Parent
local cubeName = "MagicCube"
local glowPower = 1
\`\`\`

Here is what each part does:
- \`local\` means the variable works only within this script. Use it whenever you create a local variable.
- \`part\` and \`cubeName\` are variable names. Use descriptive names instead of names such as \`x\` or \`y\`.
- \`=\` assigns a value to the variable.
- \`script.Parent\` refers to the object containing the Script, which is the cube.

Variables prevent repeated code and make code easier to read and change.

**Do this now:** Delete the default text in the script and enter the three variable lines from the example. Start Play and confirm that Output contains no red errors.`,
 },
 {
 title: "Using print to display text",
 content: `The \`print\` command displays text or variable values in the **Output** panel. It is the main tool for checking whether your code works correctly.

\`\`\`lua
local part = script.Parent
print("Script started")
print("Object name:", part.Name)
print("Is the object anchored?", part.Anchored)
\`\`\`

If Output is empty after you start Play, check the following:
- Confirm that you selected Play.
- Confirm that the Output panel is open.
- Confirm that the script is in the correct location.
- Check for red error text above.

Use this workflow for every code change: select Stop, edit the code, and then select Play again. Editing a script while the game is running can cause confusion.

**Do this now:** Add the \`print\` commands to your script. Start Play and check whether the cube's name appears in Output.`,
 },
 {
 title: "Changing the cube's appearance through code",
 content: `Now configure the code to change the cube's Properties as soon as the game starts.

\`\`\`lua
local part = script.Parent
local newName = "MaGicCuBe"

part.Name = newName
part.BrickColor = BrickColor.new("Bright violet")
part.Material = Enum.Material.Neon
part.Size = Vector3.new(5, 5, 5)

print("Magic is working:", part.Name, part.Material)
\`\`\`

Code details:
- \`part.Name = ...\` changes the object's name.
- \`BrickColor.new("...")\` sets the color using a name from the BrickColor palette.
- \`Enum.Material.Neon\` applies the glowing Neon material.
- \`Vector3.new(x, y, z)\` sets the cube's new size.

This lesson uses \`BrickColor\` because it is a simple way to specify a color by name. Changing \`Size\` can sometimes shift the cube relative to the ground, so you might need to reposition it with the Move tool after testing.

**Do this now:** Add this code to your script and select Play. The cube should change color and size and begin to glow, and a message should appear in Output.`,
 },
 {
 title: "Reading Properties into variables",
 content: `Variables can store current values as well as set new ones.

\`\`\`lua
local part = script.Parent
local currentSize = part.Size
local currentMaterial = part.Material

print("Current size:", currentSize)
print("Current material:", currentMaterial)

part.Transparency = 0.5
print("The cube is now semitransparent")
\`\`\`

The \`Transparency\` property accepts values from 0 (fully visible) to 1 (fully transparent). Do not use 1 for the final task because the cube would be invisible.

**Do this now:** Read the size and material into variables, display them with \`print\`, and slightly change the cube's transparency, for example to 0.2 or 0.3.`,
 },
 {
 title: "Understanding red error messages",
 content: `| Output message | Cause | Fix |
|------------------------|------------------|------------|
| \`attempt to index nil\` | \`script.Parent\` cannot find the object | Make sure the Script is **inside** \`MagicCube\`. |
| No output appears | The game is not running or the script is disabled | Press F5 (Play) and check Explorer. |
| \`BrickColor is not a valid member\` | There is a typo in the code, or the script is in the wrong object | Check that the property name is spelled correctly. |
| The cube falls through the ground | Anchored is disabled | Enable Anchored = true in Properties or through code. |

**Error-checking process:**
1. Read the **first** red line in Output.
2. Check the structure in Explorer. The Script must be inside MagicCube.
3. If the problem remains, temporarily remove the complex code and enter only \`print("hi")\`. If that does not work, the script is in the wrong location.

**Do this now:** Move the Script out of the cube and place it directly in Workspace. Start Play and inspect the resulting error. Then move the Script back.`,
 },
 {
 title: "Organizing a clean Script",
 content: `This is an example of clean, readable code for the task:

\`\`\`lua
local part = script.Parent

-- Settings (all values are grouped at the top for convenience)
local magicName = "MagicCube"
local magicColor = "Bright violet"
local magicSize = Vector3.new(5, 5, 5)

-- Change properties
part.Anchored = true
part.Name = magicName
part.BrickColor = BrickColor.new(magicColor)
part.Material = Enum.Material.Neon
part.Size = magicSize
part.Transparency = 0

-- Display the result
print("MagicCube activated!")
print("Current color:", magicColor)
print("Current size:", part.Size)
\`\`\`

Keeping settings such as color and size in variables at the beginning of the script is good practice. To change the color, you can edit one line at the top instead of searching through the entire file.`,
 },
 {
 title: "Project completion requirements",
 content: `**Where to place the cube:** Put it on level ground near the house or on the path to the beach. It should be clearly visible when the game starts. Do not hide it underwater or place the Script in ServerScriptService.

**Completion checklist:**
- [ ] The \`MagicCube\` object exists and has Anchored = true.
- [ ] The Script is inside the cube.
- [ ] The code contains \`local\` variables.
- [ ] The code changes the cube's color and/or material after startup.
- [ ] The \`print\` command displays a message in Output.
- [ ] The project is saved as \`Lesson 1.3 - MagicCube\`.

| Level | Requirements |
|--------|------|
| **Complete** | The script works, variables are defined, the appearance changes, and a message appears in Output. |
| **Good** | Variables have descriptive names, the Neon material is used, and the cube is positioned appropriately near the house. |
| **Excellent** | Several print commands display different data, and code settings are grouped at the beginning of the file. |

Continue in the same \`Lesson 1.2 - Island\` file and save it as a new version. Do not create an empty level for the cube because that would remove your previous work.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "The Script is in Workspace instead of inside MagicCube",
 explanation: "In this case, script.Parent does not refer to the cube, so the code produces an error or tries to change another object.",
 correctApproach: "Drag the Script inside MagicCube in Explorer.",
 },
 {
 mistake: "A LocalScript was used instead of a standard Script",
 explanation: "A LocalScript works differently and is used for other tasks, such as interfaces.",
 correctApproach: "Delete the LocalScript and add a standard server Script.",
 },
 {
 mistake: "The Output panel is empty",
 explanation: "The game is not running, the panel is closed, or there is a syntax error earlier in the script.",
 correctApproach: "Open View → Output, press F5 (Play), and read every red message.",
 },
 {
 mistake: "Variables were created without the local keyword",
 explanation: "This can cause conflicts later in larger scripts.",
 correctApproach: "Write local before creating each new local variable.",
 },
 {
 mistake: "The cube falls through the ground after startup",
 explanation: "Anchored is disabled, or the cube is floating above uneven ground.",
 correctApproach: "Enable Anchored = true manually in Properties or set it directly in the script.",
 },
 {
 mistake: "Editing code while the game is running in Play mode",
 explanation: "Changes made in Play mode are not saved and can make debugging confusing.",
 correctApproach: "Select Stop before editing the code, then select Play again.",
 },
 ],
 summary:
 "You have written your first script. You can now create local variables, change object Properties through code, and display information in Output with the print command.",
 practiceTask: {
 title: "Practice: MagicCube",
 difficulty: "beginner",
 description: `**Task:** Create a script that changes a cube's appearance when the game starts.

### Part A: Setup
1. Open your island level.
2. Create a block near the house and name it \`MagicCube\`.
3. Set Anchored = true and use a size of about 4×4×4.
4. Add a **Script** inside the cube and open Output.

### Part B: Write the code
1. Create the variable \`local part = script.Parent\`.
2. Create several more local variables for the color and size.
3. Write code that changes the cube's material to Neon and gives it a new BrickColor.
4. Add at least two \`print\` commands that display different data in Output.
5. Select Play and confirm that the cube changes and text appears in Output.

### Part C: Save
1. Confirm that Output contains no red errors.
2. Save the level through **File → Save to Roblox** as \`Lesson 1.3 - MagicCube\`.
3. Mark the practice as complete.`,
 hints: [
 "Start with print('test') and confirm that it works before adding the color-changing code.",
 "The Script must be inside the MagicCube object.",
 "Always select Stop before editing code.",
 "Do not place the cube underwater or far from the house.",
 ],
 optionalChallenge:
 "Create two cubes, MagicCube_A and MagicCube_B, with nearly identical scripts, but assign different colors through variables. This demonstrates how useful local variables are.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Where should the Script be placed for this lesson's task?",
 options: [
          "Only in the Lighting folder",
          "It must be a LocalScript in StarterGui",
          "Inside the Terrain object",
          "Inside the MagicCube object (script.Parent = the cube)",
        ],
 correctAnswer: 3,
 explanation: "Placing the script inside the Part ensures that script.Parent refers to that cube.",
 },
 {
 id: "q2",
 type: MC,
 question: "What is the local keyword used for?",
 options: [
          "Deleting an object",
          "Creating a new variable",
          "Enabling a Neon glow",
          "Saving the game",
        ],
 correctAnswer: 1,
 explanation: "The local keyword creates a local variable within the current script.",
 },
 {
 id: "q3",
 type: MC,
 question: "What does script.Parent refer to in this lesson?",
 options: [
          "The object that directly contains the script",
          "The player",
          "The Sky",
          "The Roblox website",
        ],
 correctAnswer: 0,
 explanation: "Parent means the parent object, which is the container that holds the script.",
 },
 {
 id: "q4",
 type: MC,
 question: "Where does print(...) display text?",
 options: [
          "In the Explorer panel",
          "In the Toolbox panel",
          "In the Output panel",
          "In the Terrain Editor window",
        ],
 correctAnswer: 2,
 explanation: "Output displays messages from print and system errors.",
 },
 {
 id: "q5",
 type: MC,
 question: "Which type of script is used in this lesson?",
 options: [
          "LocalScript",
          "A standard Script",
          "ModuleScript",
          "Animation",
        ],
 correctAnswer: 1,
 explanation: "A standard server Script is used for basic object interaction.",
 },
 {
 id: "q6",
 type: MC,
 question: "What does BrickColor.new(\"Bright violet\") do?",
 options: [
          "Changes the level name",
          "Changes the sound volume",
          "Changes the island's size",
          "Changes the object's color",
        ],
 correctAnswer: 3,
 explanation: "BrickColor sets an object's color using its standard name.",
 },
 {
 id: "q7",
 type: MC,
 question: "What is Enum.Material.Neon used for?",
 options: [
          "Applying a glowing material",
          "Deleting the terrain",
          "Creating a Folder",
          "Opening a plugin",
        ],
 correctAnswer: 0,
 explanation: "This command changes the surface material to Neon through code.",
 },
 {
 id: "q8",
 type: MC,
 question: "Which property is configured with Vector3.new(5, 5, 5)?",
 options: [
          "ClockTime",
          "SoundId",
          "Size",
          "WalkSpeed",
        ],
 correctAnswer: 2,
 explanation: "The Size property requires three coordinates (X, Y, Z), which are supplied through Vector3.",
 },
 {
 id: "q9",
 type: MC,
 question: "What should you do first when red error text appears in Output?",
 options: [
          "Delete the account",
          "Delete all terrain",
          "Apply the Union tool",
          "Read the first error line and check the script's location",
        ],
 correctAnswer: 3,
 explanation: "Debugging begins by carefully reading the text in Output.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why is it useful to store color and size in variables at the beginning of a script?",
 options: [
          "Because Roblox always requires it",
          "Because settings are much easier to change in one place",
          "Because print would not work otherwise",
          "To disable gravity",
        ],
 correctAnswer: 1,
 explanation: "Storing settings in variables makes code cleaner and easier to edit.",
 },
 {
 id: "q11",
 type: MC,
 question: "What value should the MagicCube Anchored property have?",
 options: [
          "true, so the cube does not fall",
          "Always false",
          "nil",
          "This value is used only in a LocalScript",
        ],
 correctAnswer: 0,
 explanation: "To keep the object in place and prevent it from falling, it must have Anchored = true.",
 },
 {
 id: "q12",
 type: MC,
 question: "Which command does Roblox Studio automatically add to a Script?",
 options: [
          "script.Parent = part",
          "local newName = \"Roblox Studio\"",
          "print(\"Hello, World!\")",
          "BrickColor.new(\"Bright violet\")",
        ],
 correctAnswer: 2,
 explanation: "Studio automatically adds the code line print(\"Hello world!\").",
 },
 {
 id: "q13",
 type: MC,
 question: "What does Transparency = 1 mean?",
 options: [
          "The object always glows with Neon",
          "The object becomes completely invisible",
          "The object is deleted from the game",
          "The object moves to Workspace",
        ],
 correctAnswer: 1,
 explanation: "A value of 1 makes the Part 100% transparent and invisible to the player.",
 },
 {
 id: "q14",
 type: MC,
 question: "Why should you avoid editing a script while the game is running in Play mode?",
 options: [
          "Because it is easy to become confused and the changes will not be saved",
          "Because the rules prohibit it",
          "Because print text will turn green",
          "Because all terrain will disappear",
        ],
 correctAnswer: 0,
 explanation: "All changes made in Play mode are discarded after you select Stop.",
 },
 {
 id: "q15",
 type: MC,
 question: "What are the requirements for the final Lesson 1.3 task?",
 options: [
          "Only an island with no code",
          "A completely empty level",
          "Only a Decal on the roof",
          "A MagicCube with a script, variables, changed appearance, and Output messages",
        ],
 correctAnswer: 3,
 explanation: "The task requires a cube that changes its Properties through a script you write.",
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
 "Perform mathematical operations in Luau using +, -, *, and /, and understand their order.",
 "Compare values with the operators ==, ~=, >, <, >=, and <=.",
 "Write if, elseif, and else conditions.",
 "Use ClickDetector to detect mouse clicks.",
 "Create and save LogicCube, an object that responds to player actions.",
 ],
 theory: {
 sections: [
 {
 title: "Lesson task: A cube with logic",
 content: `In the previous lesson, an object performed a simple action as soon as the game started. Now it will make decisions: one event occurs when a condition is true, and another occurs when it is false. Your task is to create a \`LogicCube\` object. You can reuse the previous MagicCube or create a new block.

**Complete these steps by the end of the lesson:**
- Add a \`LogicCube\` object with a Script and ClickDetector.
- Write code with mathematical operations and if/else conditions.
- Configure the code so the cube changes its appearance and displays a message in Output when clicked.
- Save the level as \`Lesson 1.4 - LogicCube\`.

Open the saved level from the previous lesson and open Output.`,
 },
 {
 title: "Why conditions and numbers matter",
 content: `Most game systems are built with numbers and condition checks.

 **For example:**
 - if health <= 0, the player loses;
 - if coins >= the item's price, the purchase is completed.

Without conditions, code simply runs commands in sequence. Conditions allow a game to respond to its current state and the player's actions.

**Do this now:** Find your \`MagicCube\` or create a new \`LogicCube\` block near the house. Enable Anchored = true and add a Script inside the object.`,
 },
 {
 title: "Math in Luau: +, -, *, /",
 content: `Calculations in the code are written according to the standard rules of mathematics.

\`\`\`lua
local a = 10
local b = 3

local sum = a + b      -- 13
local diff = a - b     -- 7
local product = a * b  -- 30
local quotient = a / b -- 3.333...

print(sum, diff, product, quotient)
\`\`\`

| Operator | Operation | Example |
|----------|-----------|----------------|
| \`+\` | Addition | \`score + 1\` |
| \`-\` | Subtraction | \`health - damage\` |
| \`*\` | Multiplication | \`price * 2\` |
| \`/\` | Division | \`time / 60\` |

**Order of operations:** multiplication and division are performed first, then addition and subtraction. The \`()\` parentheses change the priority: \`(1 + 2) * 3\` is 9 and \`1 + 2 * 3\` is 7.

**Try it now:** temporarily add \`print(2 + 2 * 5)\` and \`print((2 + 2) * 5)\` in your script. Run Play, check the results in Output, and then delete these lines.`,
 },
 {
 title: "Comparison operators",
 content: `In order for the \`if\` condition to work, it needs an expression that returns **true** or **false**.

| Operator | Value | Example |
|----------|----------|---------|
| \`==\` | Is equal to | \`score == 10\` |
| \`~=\` | Not equal to | \`color ~= "Red"\` |
| \`>\`, \`<\` | More / less | \`coins > 5\` |
| \`>=\`, \`<=\` | Greater than or equal to / Less than or equal to | \`health <= 0\` |

**Important:** double sign (\`==\`) is used to check for equality. Single (\`=\`) is only used to write a value to a variable.

\`\`\`lua
local clicks = 3
print(clicks == 3)  -- true
print(clicks > 5)   -- false
print(clicks ~= 0)  -- true
\`\`\`

**Try it now:** create a variable \`local clicks = 0\` and write some \`print\` commands with comparison operators. Check in Play mode whether \`true\` or \`false\` is output.`,
 },
 {
 title: "if / else conditions",
 content: `The basic structure of the conditional statement looks like this:

\`\`\`lua
local score = 8

if score >= 10 then
 print("Excellent")
else
 print("Try again")
end
\`\`\`

The logic is as follows: **if** the condition is met, **then** (then) the first block of commands is executed, **else** the second block is executed. The statement ends with the keyword **end**.

Basic rules:
- \`then\` must be written after the condition.
- Each \`if\` block must end with the word \`end\`.
- The \`else\` block is optional, but allows for alternative scenarios to be handled.

**Try it now:** write the statement \`if score >= 10\` with the block \`else\`. Change the value of the \`score\` variable (for example, to 12 or 3) and use Play to check how the different branches of the code work.`,
 },
 {
 title: "Multiple conditions: elseif",
 content: `When there are more than two possible options, \`elseif\` is used:

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

Conditions are checked sequentially **from top to bottom**. As soon as the program finds the first true condition, it executes that block, ignoring the rest. Therefore, the highest or strictest values (\`>= 20\`) should be checked first.

**Try it now:** Write code with three branches of validation for a variable (for example \`energy\`) and test it by substituting different numeric values.`,
 },
 {
 title: "Handling clicks: ClickDetector",
 content: `In order for the script to respond to user actions, we will add a tool that detects clicks.

1. Select the object \`LogicCube\`.
2. Click **Insert → ClickDetector**.
3. Set the MaxActivationDistance property to \`32\`.
4. In the script, add the code for handling the click:

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

This code combines a mathematical operation (\`clicks = clicks + 1\`) and a condition check \`if/else\`. The instructions inside the \`Connect\` block are executed each time the object is clicked.

**Try it now:** add ClickDetector and this block of code. Start Play, click on the cube a few times and watch the color change and the Output panel.`,
 },
 {
 title: "Complete code for LogicCube",
 content: `Below is a structured code example that can be used as a basis for the final task. Numbers and colors can be changed:

\`\`\`lua
local part = script.Parent
local detector = part:WaitForChild("ClickDetector")

local clicks = 0
local goal = 3
local growAmount = 0.5

detector.MouseClick:Connect(function(player)
 clicks = clicks + 1

 -- Increase the object's size
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

Check the result in Play mode: with each click, the cube will grow, and the color and message will change according to the number of clicks. If resizing causes bugs (the cube flies or falls), you can remove the \`Size\` changing block.`,
 },
 {
 title: "Preventing double clicks (Debounce)",
 content: `Sometimes a double click of the mouse button registers too quickly and breaks the logic. To prevent this, a guard variable (debounce) is added:

\`\`\`lua
local busy = false

detector.MouseClick:Connect(function(player)
 if busy then
  return -- Prevent another run while the script is busy
 end
 busy = true

 -- Place the main if/else logic here

 task.wait(0.2) -- Delay
 busy = false
end)
\`\`\`

For this lesson, such protection is optional, but it increases the stability of interactive objects.`,
 },
 {
 title: "Common errors and solutions",
 content: `| Error / Symptom | Cause | How to fix it |
|---------|---------|-------------|
| Only one condition always runs | Conditions are in the wrong order | Put the highest or strictest requirements (\`>= 10\`) at the start of the conditional block. |
| \`then expected\` error | The \`then\` keyword is missing | Write the condition in the form \`if condition then\`. |
| \`end expected\` error | The block is not closed with \`end\` | Add \`end\` at the end of every \`if\` statement. |
| \`=\` instead of \`==\` | The assignment operator is used instead of a comparison | Always use \`==\` to compare values. |
| Clicks are not detected | ClickDetector is missing, or testing is taking place in Edit mode | Add a ClickDetector and test the logic only in Play mode (F5). |
| The click counter does not increase | The variable is declared inside the function | Move \`local clicks = 0\` to the start of the script. |

**Try it now:** replace \`==\` with \`=\` in your code, start the game, review the error message in Output, and then restore the correct operator.`,
 },
 {
 title: "Project completion requirements",
 content: `**Checklist:**
- [ ] \`LogicCube\` object with script and \`ClickDetector\` configured.
- [ ] Mathematical calculations are present in the code (for example, \`clicks = clicks + 1\`).
- [ ] An \`if / else\` conditional statement is implemented (preferably also \`elseif\`).
- [ ] Depending on the conditions, the appearance of the cube changes and corresponding \`print\` messages are displayed.
- [ ] Testing in Play mode works correctly.
- [ ] The project is saved with the name \`Lesson 1.4 - LogicCube\`.

| Level | Evaluation |
|--------|------|
| **Complete** | The code performs a mathematical operation and condition \`if/else\`, the appearance of the object changes after clicking. |
| **Good** | \`elseif\` is used, messages are clearly delimited, code is structured. |
| **Advanced** | Adjusted resizing and added protection against double clicks. |`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Using = instead of == in an if condition",
 explanation: "The single equal sign sets a value, not compares it.",
 correctApproach: "Always use the double equals sign (==) to check values.",
 },
 {
 mistake: "Missing keywords then or end",
 explanation: "Luau syntax requires a clear block structure.",
 correctApproach: "Use the basic pattern: if [condition] then [action] end.",
 },
 {
 mistake: "Declaring the clicks variable inside the function",
 explanation: "If the variable is created inside the Connect function, it will be reset to zero on each click.",
 correctApproach: "Declare local clicks = 0 at the beginning of the file outside the function block.",
 },
 {
 mistake: "Attempting to click on an object in edit mode",
 explanation: "MouseClick events are only logged while the game is running.",
 correctApproach: "Add ClickDetector and test the interaction in Play mode (F5).",
 },
 {
 mistake: "Incorrect order of conditions when using elseif",
 explanation: "The code executes the first true condition, so weak conditions can intercept execution before stricter ones.",
 correctApproach: "Start checking with the strictest conditions (for example, >= 20 must come before >= 10).",
 },
 {
 mistake: "The script does not find ClickDetector",
 explanation: "The script is not a child of the object, or the command that waits for loading is missing.",
 correctApproach: "Make sure Script and ClickDetector are inside LogicCube and use WaitForChild('ClickDetector').",
 },
 {
 mistake: "Only a mathematical operation is written without if conditions",
 explanation: "The task requires demonstration of both skills.",
 correctApproach: "Be sure to add at least an if/else statement for processing the result of a mathematical operation.",
 },
 ],
 summary:
 "Today you learned the principles of mathematical calculations and logical comparisons in Luau. You configured if/elseif/else conditional constructs and used ClickDetector to handle mouse clicks. You created a LogicCube object that changes its behavior depending on the number of clicks.",
 practiceTask: {
 title: "Practical task: Object with logic (LogicCube)",
 difficulty: "beginner",
 description: `**Task:** Create a cube that counts the number of clicks and changes its appearance using conditions.

### Part A: Preparation
1. Open your previous level with the house.
2. Create the \`LogicCube\` object and enable Anchored = true.
3. Add **ClickDetector** and **Script** inside the cube.
4. Open the Output panel.

### Part B: Math and conditions
1. Declare the variable \`local clicks = 0\` at the beginning of the script.
2. In the click handler, increase the value: \`clicks = clicks + 1\`.
3. Write an \`if / elseif / else\` statement that checks the value of \`clicks\` and sets different colors of the object.
4. Add a unique message via \`print\` to each condition branch.
5. Run Play and test the code.

### Part C: Finish and save
1. Check the Output panel for red errors.
2. Save the project in Roblox via **File → Save to Roblox** under the name \`Lesson 1.4 - LogicCube\`.
3. Mark the practice as complete.`,
 hints: [
 "Create the clicks variable outside the Connect function.",
 "First, check the operation of the logic using print, and only then add the color change.",
 "In the elseif condition, arrange the value from largest to smallest.",
 "Increase MaxActivationDistance in ClickDetector properties if clicks are not being registered.",
 "Always use the cycle Stop → Edit → Play.",
 ],
 optionalChallenge:
 "Add a mathematical multiplication operation (for example, score = clicks * 10) and display the result in the Output panel. Use debounce to eliminate double triggers.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Which operator is responsible for adding numbers?",
 options: [
          "==",
          "+",
          "then",
          "end",
        ],
 correctAnswer: 1,
 explanation: "The + operator is used to add values.",
 },
 {
 id: "q2",
 type: MC,
 question: "What does the == operator do?",
 options: [
          "Writes a value to a variable",
          "Performs division",
          "Creates a new object",
          "Checks values for equality",
        ],
 correctAnswer: 3,
 explanation: "The == operator logically compares two values.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why is the expression 2 + 2 * 5 equal to 12 and not 20?",
 options: [
          "This is a compiler error",
          "The addition operator is ignored",
          "Multiplication has a higher execution priority",
          "The system automatically rounds the result",
        ],
 correctAnswer: 2,
 explanation: "Multiplication and division are performed before addition and subtraction.",
 },
 {
 id: "q4",
 type: MC,
 question: "What is the correct syntax for writing a condition?",
 options: [
          "if clicks >= 3 then",
          "if clicks >= 3",
          "when clicks >= 3",
          "if clicks >= 3 {",
        ],
 correctAnswer: 0,
 explanation: "In Luau, the keyword then must be written after the condition is checked.",
 },
 {
 id: "q5",
 type: MC,
 question: "What is the else block used for?",
 options: [
          "To delete the script",
          "To activate the terrain",
          "To save progress",
          "To execute the code if the previous if condition is false",
        ],
 correctAnswer: 3,
 explanation: "The else block is responsible for handling the alternative scenario when the initial condition is not met.",
 },
 {
 id: "q6",
 type: MC,
 question: "In what cases is elseif used?",
 options: [
          "When there is only one verification option",
          "When you need to check several different conditions in a row",
          "When the object does not have ClickDetector",
          "When the object is not fixed",
        ],
 correctAnswer: 1,
 explanation: "The elseif statement allows you to add additional checks if the first condition is not met.",
 },
 {
 id: "q7",
 type: MC,
 question: "Where should the counter variable (local clicks) be declared?",
 options: [
          "Only inside the click handler function",
          "In the Lighting folder",
          "Outside of the Connect function at the beginning of the script",
          "In the name of the object",
        ],
 correctAnswer: 2,
 explanation: "If a variable is created inside a function, its value will be reset every time it is clicked.",
 },
 {
 id: "q8",
 type: MC,
 question: "What function did ClickDetector perform in this lesson?",
 options: [
          "A tool to run code on mouse click",
          "A terrain editing tool",
          "Replacing the server script",
          "Camera settings module",
        ],
 correctAnswer: 0,
 explanation: "ClickDetector allows the system to register the player's interaction with the object using clicks.",
 },
 {
 id: "q9",
 type: MC,
 question: "What does the ~= operator mean?",
 options: [
          "Is equal to",
          "Not equal to",
          "Multiplication",
          "Marking a comment",
        ],
 correctAnswer: 1,
 explanation: "The ~= operator checks values for inequality.",
 },
 {
 id: "q10",
 type: MC,
 question: "If the condition elseif >= 10 is in the code before if >= 20, what will be the result if score = 25?",
 options: [
          "The code will correctly output Rank S",
          "A critical script error will occur",
          "The script will delete the object",
          "A weaker condition (>= 10) will work due to incorrect check order",
        ],
 correctAnswer: 3,
 explanation: "The code fulfills the first true condition. Since 25 is greater than 10, the first check will stop further execution.",
 },
 {
 id: "q11",
 type: MC,
 question: "The entry clicks = clicks + 1 is an example:",
 options: [
          "Changes the value of a variable through a mathematical operation",
          "Tools Union",
          "Painting Terrain",
          "Adding image Decal",
        ],
 correctAnswer: 0,
 explanation: "This expression increments the current value of the variable by one.",
 },
 {
 id: "q12",
 type: MC,
 question: "What keyword closes a conditional if block?",
 options: [
          "stop",
          "finish",
          "end",
          "close",
        ],
 correctAnswer: 2,
 explanation: "In Luau, every if block must end with the keyword end.",
 },
 {
 id: "q13",
 type: MC,
 question: "What will happen if you write = instead of == in if?",
 options: [
          "Delete the account",
          "Assign a value to a variable",
          "Error in Output",
          "Nothing",
        ],
 correctAnswer: 3,
 explanation: "In Output, an error about an incorrectly written command will be displayed",
 },
 {
 id: "q14",
 type: MC,
 question: "Why should ClickDetector be tested in Play mode?",
 options: [
          "The Output panel is only available in edit mode",
          "Click events are registered only while the game is running",
          "In Play mode, the object is deleted",
          "If conditions do not work in edit mode",
        ],
 correctAnswer: 1,
 explanation: "The user's interaction with the objects of the game world is recorded by the system only after starting the Play mode.",
 },
 {
 id: "q15",
 type: MC,
 question: "What are the requirements for the final task of lesson 1.4?",
 options: [
          "Object LogicCube with mathematical calculations, conditions and ClickDetector",
          "An edited terrain with no code",
          "Empty level template",
          "A level with added images",
        ],
 correctAnswer: 0,
 explanation: "The final task involves creating an object that contains a working script with logical checks.",
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
 "Choose materials (Material) for the facade, roof and other details of the house.",
 "Understand the difference between BrickColor and Color3 and know when to use them.",
 "Apply the image (Decal / Texture) to walls or signs.",
 "Use material Neon for accents without overloading the design.",
 "Save and submit the decorated House_01 with a consistent style.",
 ],
 theory: {
 sections: [
 {
 title: "Lesson task: decorating the house",
 content: `In the previous lessons, you assembled the frame, added the island and wrote the code. Today we're working on the exterior: your \`House_01\` house will get its own style with materials, colors, textures (Decal/Texture) and neat neon accents.

**What you need to do before the end of the lesson:**
- A house with selected materials (walls, roof, accents).
- At least 1 Decal or Texture in a prominent place (for example sign or wall).
- Material Neon only for small parts (lamp, sign), not for the whole house.
- Saved level named: \`Lesson 1.5 - Decorated House\`.

Open your saved level with the house and continue working in it.`,
 },
 {
 title: "Why appearance is so important",
 content: `The appearance immediately sets the mood of the game. The player instantly understands: whether they are looking at just a gray plastic box or a real house. Using materials and images (Decal) is the easiest way to make a game visually interesting without creating complex 3D models.

**Important tip:** Choose 2-3 main materials (for example brick + wood + neon accent) and stick to them. You shouldn't make every wall out of a different material just because it's possible.

**Try it now:** Inspect your \`House_01\` from all sides. Come up with a style for it: it can be a wooden hut by the water, a brick station or a modern cafe. The choice of colors will depend on this.`,
 },
 {
 title: "Material Setup (Material)",
 content: `To change a material, select the Part, find the Properties panel, and open the **Material** list.

| Material | Appearance | Where to use it |
|----------|----------|-----------------|
| **Brick** | Brick | Walls |
| **Wood / WoodPlanks** | Wood, planks | Walls, roof, door frame |
| **Concrete** | Concrete | Floor, foundation |
| **Slate / Rock** | Stone | Roof, foundation |
| **Metal** | Metal | Railings, frame |
| **Glass** | Glass | Windows |
| **Neon** | Glow | Accents only |
| **SmoothPlastic** | Smooth plastic | Default material; consider replacing it |

Material and color work together. Dark red brick looks very different from bright yellow brick.

**Try it now:**
1. Use one material for all walls, such as Brick or Wood.
2. Choose a different material for the roof, such as Slate or Wood.
3. Use Concrete for the floor or foundation.
4. Start Play and check how the house looks in daylight.`,
 },
 {
 title: "Difference between BrickColor and Color3",
 content: `The Properties panel has two fields for adjusting the color: **BrickColor** and **Color**.

| | **BrickColor** | **Color** (Color3) |
|---|----------------|---------------------|
| Description | Preset colors with names | Any shade (RGB) |
| Advantages | Quickly choose a color (for example 'Bright red') | Precise shade control |
| In the code | \`BrickColor.new(...)\` | \`Color3.fromRGB(...)\` |

For the facade, it is quite enough to change the color manually via Properties. You will need the code if you want to change the color during the game.

**Tip:** make the walls muted colors, and small details (frames, signs), more saturated. This keeps the design comfortable to view.

**Try it now:** choose a color for the walls and roof. Make window or door frames a little more contrasting than the main walls.`,
 },
 {
 title: "Neon: bright accent",
 content: `**Neon** material glows brightly and creates a strong visual effect, especially at night. But if you make all the walls from it, the house will turn into a continuous bright spot.

**Where to use Neon:**
- a sign above the door;
- small lanterns at the entrance;
- window lighting;
- your LogicCube/MagicCube from the previous lesson.

**Tip:** don't make the main walls completely neon.

**Try it now:** add 1-3 small neon details. Keep the main facade wood, brick, or concrete. Check from a distance: the accent should be noticeable, but not overpower the appearance of the entire island.`,
 },
 {
 title: "Decal: image on object",
 content: `**Decal** is an image that is applied to **one face** of a part (works like a poster or sign).

**How to add it:**
1. Select a detail (for example, a thin panel above the door).
2. Click **Insert → Decal**.
3. In the properties (Properties) of the Decal object, find the **Texture** field and paste the link (\`rbxassetid://...\`) from the Toolbox → Images panel there.
4. The **Face** property determines on which side of the part the picture will appear (Front, Back, etc.). If the image is not visible, simply change the Face or rotate the part.

**Ideas for the house:** cafe name, house number, pointer arrow, imitation of curtains on the windows.

**Try it now:** Create a thin detail above the entrance, name it \`Sign_Board\` and add Decal with a picture to it. Start Play and approach the house to check how the sign reads.`,
 },
 {
 title: "Texture: A repeating pattern",
 content: `**Texture** works similar to Decal, but the image is **repeated** over the entire surface. It is very convenient for creating tiles, wallpaper or pavers.

When to choose:
- **Decal**: for single images (logo, picture).
- **Texture**: for patterns covering a large area.

To complete the task, it is enough to use one thing: either Decal or Texture.

**Try it now (Optional):** Add Texture to the porch floor and adjust the size of the pattern using the \`StudsPerTileU\` and \`StudsPerTileV\` properties.`,
 },
 {
 title: "Decoration of windows and doors",
 content: `We already cut the windows in the first lesson. Now we are only **improving** them. No need to use the Negate/Union tools again to avoid accidentally breaking the finished walls.

Ideas for decor:
- add thin blocks around the window (frames made of wood or metal);
- make window sills;
- put Decal with the image of the curtains from the inside.

**Door opening:** you can make a door frame from 2-3 narrow blocks. It is not necessary to make the doors themselves movable yet, the main thing is that the entrance looks neat and stands out on the facade.

**Try it now:** design at least one window and a doorway. Enter Play mode and see if it looks like a real entrance to a house.`,
 },
 {
 title: "Checklist of the finished facade",
 content: `Before saving, check your work as a design review:

1. **Materials:** the roof and walls are made of different but logical materials.
2. **Style:** colors and textures blend together (don't look like a random rainbow).
3. **Highlights:** there are only a few neon details, the house is not fully illuminated.
4. **Image:** Added at least one Decal or Texture prominently.
5. **Order:** new parts (\`Sign_Board\`, \`Lamp\`) have clear names in the Explorer panel.
6. **Testing:** in Play mode nothing falls off (Anchored enabled everywhere).

**Try it now:** take a screenshot of the facade from the beach side. You can use it for your portfolio at the end of the module.`,
 },
 {
 title: "Common mistakes and how to fix them",
 content: `| Problem | Cause | How to fix it |
|---------|---------|------------|
| The image (Decal) is not visible | Face is set incorrectly, or Texture is empty | Change Face and paste the correct image link |
| The image is stretched | The Part proportions do not match the image | Resize the Part with Scale |
| Everything glows too brightly | Too much Neon material | Use Neon only for 1-3 small details |
| The color changed after selecting a material | Materials reflect light differently | Adjust BrickColor slightly to suit the new material |
| Objects fall in Play | Anchored is not enabled | Select the new decorations and enable Anchored |
| The windows are broken | New details were cut with Union | Use regular blocks for frames; do not cut the walls |`,
 },
 {
 title: "Saving the project",
 content: `**File → Save to Roblox** → \`Lesson 1.5 - Decorated House\`.

In the next lesson, we will add lighting and sounds. Your design should look good during the day, and the neon accents will shine brightly in the evening.

**Requirements for submitting the project**
**Checklist:**
- [ ] Wall and roof materials are configured.
- [ ] The facade colors work well together.
- [ ] At least 1 Decal or Texture.
- [ ] Neon is used only as an accent.
- [ ] All new objects are anchored (Anchored = true).
- [ ] The project is saved with the correct name.

| Level | Criteria |
|--------|----------|
| Complete | Consistent Material + ≥1 Decal/Texture + Save |
| Good | Frames/entrance + Neon-accent + names |
| Advanced | The theme of the facade is clear from the screenshot without explanation |
`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Using material Neon for all walls",
 explanation: "The house loses its realism and looks like a solid lamp.",
 correctApproach: "Use basic materials (Brick/Wood), and leave Neon for 1-3 small parts.",
 },
 {
 mistake: "Image (Decal) is not displayed",
 explanation: "The picture was superimposed on the invisible or inner edge of the part.",
 correctApproach: "Change the Face value in the properties or rotate the part itself.",
 },
 {
 mistake: "The TextureId field is empty",
 explanation: "Object Decal has been created, but there is no reference to the picture.",
 correctApproach: "Copy and paste rbxassetid from the Toolbox panel (Images tab).",
 },
 {
 mistake: "Trying to cut the windows again via Union for decoration",
 explanation: "This can break down the existing walls created in the first lesson.",
 correctApproach: "Create frames and window sills from ordinary individual blocks.",
 },
 {
 mistake: "New decorative details fall during Play",
 explanation: "Anchored was not enabled for the new objects.",
 correctApproach: "Select all new frames, signs and lights and enable Anchored = true.",
 },
 {
 mistake: "The use of different materials without a single style",
 explanation: "The facade looks chaotic and unnatural.",
 correctApproach: "Choose 2-3 main materials that fit the theme of your home.",
 },
 {
 mistake: "The project was saved with the wrong name or in the wrong file",
 explanation: "This will make it difficult to find the desired artifact in the future.",
 correctApproach: "Save via Save to Roblox with the title Lesson 1.5 - Decorated House.",
 },
 ],
 summary:
 "In this lesson, you decorated your house: adjusted the materials and colors of the facade, added images (Decal/Texture) and used neon accents. The level is now ready to set up the lighting and sounds in the next lesson.",
 practiceTask: {
 title: "Practical task: Decorating the facade",
 difficulty: "beginner",
 description: `**Task:** Decorate House_01 by creating a single facade style and adding images (Decal/Texture).

### Part A: Materials and colors
1. Open your level with house and island.
2. Come up with a theme for the facade (for example, a forest house or a modern cafe).
3. Change the materials and colors of the walls, roof and floor so that they harmonize.
4. Start Play and look at the house from the beach.

### Part B: Details and Images (Decal)
1. Create a thin Part \`Sign_Board\` above the door and add **Decal** to it (or use Texture on the porch floor).
2. Make frames for windows or doors from regular thin Parts.
3. Add 1-3 neon accents (light, sign or edging).
4. Make sure all new parts have Anchored enabled and have meaningful names in Explorer.

### Part C: Save
1. Check your work using the lesson checklist.
2. Save the level via **File → Save to Roblox** under the name \`Lesson 1.5 - Decorated House\`.
3. Mark the practice as completed in the system.`,
 hints: [
 "Choose an overall theme first, and then select the materials.",
 "If Decal is not visible, try changing the Face property.",
 "Use Neon with care - only for small details.",
 "Don't change finished walls with Negate/Union tools unless absolutely necessary.",
 "Give the objects clear names (for example, Sign_Board), this will help a lot in the next lessons.",
 ],
 optionalChallenge:
 "Take two screenshots of your facade, one in daytime and one at night. Adjust the lighting slightly or emphasize the Neon accents. These images will be useful additions to your portfolio.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What does the Material property change in the Properties panel?",
 options: [
          "The script type",
          "The Studio interface language",
          "The surface and appearance of an object (Part)",
          "The island size during generation",
        ],
 correctAnswer: 2,
 explanation: "Material defines the appearance of an object's surface.",
 },
 {
 id: "q2",
 type: MC,
 question: "Which material works best for the main walls of a house?",
 options: [
          "Neon for every wall",
          "Brick or Wood",
          "ForceField",
          "Air",
        ],
 correctAnswer: 1,
 explanation: "Brick or Wood gives a facade a natural appearance, while Neon is best reserved for accents.",
 },
 {
 id: "q3",
 type: MC,
 question: "What is the main advantage of using BrickColor?",
 options: [
          "It removes unnecessary terrain",
          "It creates a ClickDetector",
          "It replaces script writing",
          "It provides preset colors with convenient names",
        ],
 correctAnswer: 3,
 explanation: "BrickColor provides a list of preset colors for quick configuration.",
 },
 {
 id: "q4",
 type: MC,
 question: "When should you use the Color (Color3) property instead of BrickColor?",
 options: [
          "When you need a precise custom shade",
          "When you need to generate a new island",
          "When you need to combine parts with Union",
          "When you need to close the Output panel",
        ],
 correctAnswer: 0,
 explanation: "Color3 lets you specify any precise color in RGB format.",
 },
 {
 id: "q5",
 type: MC,
 question: "How should you use the Neon material on a house facade?",
 options: [
          "As the main material for every wall",
          "Only as a bright accent, such as a sign, lamp, or backlight",
          "As a replacement for the Anchored property",
          "As a game camera type",
        ],
 correctAnswer: 1,
 explanation: "Neon works best as an accent, not as the main material for the entire house.",
 },
 {
 id: "q6",
 type: MC,
 question: "What is a Decal?",
 options: [
          "A tool for cutting terrain",
          "A type of remote event",
          "Empty level template",
          "An image applied to one face of an object",
        ],
 correctAnswer: 3,
 explanation: "A Decal applies an image, such as a poster or logo, to one face of a Part.",
 },
 {
 id: "q7",
 type: MC,
 question: "What should you check first if an added Decal is not visible?",
 options: [
          "The Face property and whether Texture contains a link",
          "Whether the Workspace folder was deleted",
          "The application interface language",
          "Whether Snap to Grid is enabled",
        ],
 correctAnswer: 0,
 explanation: "An image is often invisible because it was applied to a hidden face or because its image link is missing.",
 },
 {
 id: "q8",
 type: MC,
 question: "What is Texture better suited for than Decal?",
 options: [
          "Handling mouse clicks",
          "Generating islands",
          "Creating a pattern that repeats across an entire surface",
          "Creating modular scripts",
        ],
 correctAnswer: 2,
 explanation: "Texture is ideal for patterns that need to cover a large area by repeating.",
 },
 {
 id: "q9",
 type: MC,
 question: "What must you do with new decorative parts before running the game?",
 options: [
          "Apply Negate to them",
          "Delete the house",
          "Close the Explorer panel",
          "Anchor them (Anchored = true)",
        ],
 correctAnswer: 3,
 explanation: "If new objects are not secured (Anchored = true), gravity will make them fall.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why should you avoid cutting finished windows again with Union just to refine them?",
 options: [
          "It can break walls that are already complete and configured",
          "Union is prohibited in Roblox",
          "Decal will never work afterward",
          "Studio will automatically delete all terrain",
        ],
 correctAnswer: 0,
 explanation: "It is much safer to build decorative frames from separate standard blocks without modifying the wall geometry.",
 },
 {
 id: "q11",
 type: MC,
 question: "What is the minimum image-use requirement for this task?",
 options: [
          "Add at least 50 premade models",
          "Use at least one Decal or Texture",
          "Do not use any images",
          "Change only the sky",
        ],
 correctAnswer: 1,
 explanation: "To complete the task, place at least one image, using a Decal or Texture, as a decorative element.",
 },
 {
 id: "q12",
 type: MC,
 question: "What does a cohesive facade mean in design?",
 options: [
          "Every part has a unique random material",
          "Every part is made only of plastic",
          "It uses two or three primary materials and colors that work well together",
          "The house has no roof",
        ],
 correctAnswer: 2,
 explanation: "A cohesive design uses a limited material palette that supports a shared theme.",
 },
 {
 id: "q13",
 type: MC,
 question: "What should you do if an image is stretched?",
 options: [
          "Resize the Part with Scale",
          "Delete the account",
          "Write a Script",
          "Find another Decal",
        ],
 correctAnswer: 0,
 explanation: "If the Part's proportions do not match the image, correct them with Scale.",
 },
 {
 id: "q14",
 type: MC,
 question: "What is an appropriate name for a sign Part in the Explorer panel?",
 options: [
          "Part",
          "asdf",
          "Union",
          "Sign_Board",
        ],
 correctAnswer: 3,
 explanation: "Clear names keep the project organized and make parts easier to find later.",
 },
 {
 id: "q15",
 type: MC,
 question: "What name should you use when saving the level at the end of lesson 1.5?",
 options: [
          "Untitled",
          "Lesson 1.5 - Decorated House",
          "Lesson 1.1 - House_01 only",
          "Module 9",
        ],
 correctAnswer: 1,
 explanation: "The task requires you to save the finished house artifact with the correct name.",
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
 "Configure the level's time of day (ClockTime) and overall brightness (Brightness).",
 "Add fog (Atmosphere) and a glow effect (Bloom).",
 "Distinguish ambient audio (Ambient) from short sound effects (SFX).",
 "Create two distinct moods for the level: morning and night.",
 "Save the level with its atmosphere configured.",
 ],
 theory: {
 sections: [
 {
 title: "Lesson task: morning and night on the island",
 content: `The house is finished, the island is ready, and objects respond to clicks. You will now add lighting, atmosphere, and sound to make the level look and sound realistic.

**By the end of this lesson, you will have:**
- A level with configured **Lighting** and **Atmosphere** objects.
- Two configured modes: **morning** and **night**, which you can switch using ClockTime.
- Ambient audio and at least one sound effect (SFX).
- A completed Play test from the house to the beach in both modes.
- A saved level named \`Lesson 1.6 - Island Atmosphere\`.

Open the level you saved in the previous lesson.`,
 },
 {
 title: "Components of a level's atmosphere",
 content: `A game's atmosphere has three main components:
1. **Light:** time of day, sun or moon brightness, and shadows.
2. **Air:** fog and horizon color (Atmosphere).
3. **Sound:** ambient nature or city audio and interaction sounds.

A level feels empty without sound. Without appropriate lighting, even bright materials can look dull.

**Try it now:** before changing any settings, enter Play mode and walk from the door to the water. Note how everything currently looks and sounds so you can compare it with the result at the end of the lesson.`,
 },
 {
 title: "Lighting: time, brightness, and shadows",
 content: `In the Explorer panel, find the **Lighting** object. It is separate from Workspace.

| Property | What it does | Recommended values |
|----------|-----------|----------------------|
| **ClockTime** | Time of day from 0 to 24 | Morning: \`8\`–\`10\`; Night: \`0\`–\`2\` |
| **Brightness** | Overall light brightness | Day: \`2\`–\`3\`; Night: lower, but not \`0\` |
| **GlobalShadows** | Enables shadows from objects | \`true\` (adds visual depth) |
| **OutdoorAmbient** | Color of outdoor shadows | Slightly blue in the morning, warm in the evening |
| **Ambient** | Overall fill light | Keep it moderate to avoid washing out the materials from \`1.5\` |

**Try it now:**
1. Set ClockTime to morning, such as \`9\`, set Brightness to \`2.5\`, and enable GlobalShadows.
2. Change ClockTime to night (\`0.5\`) and reduce Brightness slightly.
3. Confirm that the Neon parts from the previous lesson remain visible in the dark.`,
 },
 {
 title: "Atmosphere: fog and the horizon",
 content: `If the Atmosphere object is not in the Explorer panel, right-click **Lighting** → Insert Object → **Atmosphere**.

| Property | Purpose | Starting values |
|----------|--------|-------------------|
| **Density** | Fog density | \`0.25\`–\`0.4\` |
| **Offset** | Shifts the fog closer or farther away | \`0.25\` |
| **Color** | Color of the fog | Depends on the time of day |

**Important:** do not set Density too high. At values above \`0.5\`, the player may not even be able to see the house.

**Try it now:** add Atmosphere and set Density to \`0.3\`. Adjust the time of day (ClockTime) and observe how the fog's appearance changes.`,
 },
 {
 title: "Bloom: glow effect",
 content: `**Bloom** gives bright objects, such as Neon signs or lamps, a soft glow.

1. Right-click **Lighting** → Insert Object → **BloomEffect** (or Bloom).
2. Keep Intensity low. If the entire screen turns white, the effect is too strong.
3. Check the settings at night (ClockTime = 0.5), when the glow is most visible.

**Try it now:** add Bloom and configure it so the sign looks bright without obscuring the scene.`,
 },
 {
 title: "Sound: ambient audio and effects",
 content: `Game audio falls into two main categories:

| Type | What it sounds like | Where to place it | Looped |
|-----|----------------|---------|--------|
| **Ambient** | Background nature audio, waves, or wind | In **Workspace** or SoundService | **true** |
| **SFX** | A short effect, such as a click, creak, or impact | Inside a specific Part | **false** |

Ambient audio should remain quiet (Volume \`0.25\`–\`0.45\`) so the player can hear short sound effects (SFX).

**Try it now:** decide which ambient sound best fits your island. For example, waves work well for a house near the water.`,
 },
 {
 title: "Configuring ambient audio (Ambient)",
 content: `1. Right-click Workspace → Insert Object → **Sound**.
2. Rename the object to \`Ambient_Waves\`.
3. Find audio in the Audio tab of Toolbox and copy its ID. Paste the link into the **SoundId** property.
4. Enable **Looped** and **Playing**.
5. Set **Volume** to \`0.35\`.

**Try it now:** add the ambient audio, run the game in Play mode, and walk around the island. If it is too loud, reduce Volume. If it stops, check Looped.`,
 },
 {
 title: "Configuring sound effects (SFX)",
 content: `1. Select a Part, such as \`LogicCube\` from the previous lesson or the sign.
2. Add a **Sound** inside it and name it \`SFX_Click\`.
3. Add a link to a short sound in **SoundId**. Disable **Looped** and set Volume to \`0.5\`.
4. The **RollOffMaxDistance** property, set to about \`60\`, controls the sound's range so it cannot be heard from the other side of the island.

To play this sound on a click, add the following code to your script, inside the click function:

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

**Try it now:** add a short sound to \`LogicCube\` or another Part. In Play mode, verify that it works during interaction.`,
 },
 {
 title: "Two presets: morning and night",
 content: `
| | Morning | Night |
|-|-------|-----|
| ClockTime | \`9\` | \`0.5\` |
| Brightness | higher | lower, but the path remains visible |
| Atmosphere.Color | lighter / blue | cooler |
| Ambient Sound | waves / birds | quieter wind / night loop |
| Neon | less prominent | main facade accent |
 `,
 },
 {
 title: "Recommended workflow",
 content: `Use the following order to keep the configuration manageable:

1. Configure **morning** settings: ClockTime, Brightness, and shadows.
2. Add **Atmosphere** and configure the fog so the island looks natural.
3. Add subtle **Bloom** for glow.
4. Add **ambient audio** (Ambient), followed by short sounds (SFX).
5. Change the time to **night** and confirm that the scene remains balanced, the path is visible, and the Neon parts glow.
6. Run a Play test and save the game.

**Try it now:** review your level using this sequence. If the night scene is too dark, raise Brightness or OutdoorAmbient slightly.`,
 },
 {
 title: "Common issues and fixes",
 content: `| Problem | Cause | Fix |
|---------|------------------|------------|
| No sound | SoundId is empty or Volume is 0 | Enter the correct ID from Toolbox and check the volume |
| Ambient audio stops | Looped is disabled | Enable Looped in Properties |
| The screen is too white or hazy | Bloom or Brightness is too high | Reduce these settings |
| Nothing is visible at night | Brightness is zero | Increase the light and shadow brightness |
| Fog hides the house | Atmosphere Density is too high | Set it to about 0.25–0.35 |`,
 },
 {
 title: "Project completion requirements",
 content: `**Checklist:**
- [ ] You can switch between morning and night with ClockTime.
- [ ] Atmosphere is present, and the fog does not obscure the entire level.
- [ ] Ambient audio loops and plays in Play mode.
- [ ] At least one short sound (SFX) is present.
- [ ] The level has been tested in both lighting modes.
- [ ] The level is saved as \`Lesson 1.6 - Island Atmosphere\`.

| **Level** | **Description** |
|-----------|----------|
| Complete | Morning/night + Atmosphere + ambient + 1 SFX + Save |
| Good | Balanced volume and a readable facade at night |
| Advanced | Two ambient tracks or subtle Bloom + clear Sound names |
`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Ambient audio is set to maximum volume",
 explanation: "Loud ambient audio masks every other sound in the game.",
 correctApproach: "Keep Ambient volume between 0.25 and 0.45. SFX can be louder.",
 },
 {
 mistake: "Empty SoundId field",
 explanation: "Without a link to an audio asset, the sound will not work.",
 correctApproach: "Find audio in Toolbox and copy its ID into the SoundId field.",
 },
 {
 mistake: "The night scene is completely dark",
 explanation: "Brightness was reduced too much.",
 correctApproach: "The player must be able to navigate even at night. Raise Brightness slightly or use Neon parts to light the path.",
 },
 {
 mistake: "Fog (Atmosphere) completely hides the island",
 explanation: "Density is set too high.",
 correctApproach: "A suitable Density range is 0.25 to 0.4.",
 },
 {
 mistake: "Sounds are tested only in edit mode",
 explanation: "Some sound and lighting settings work correctly only while the game is running.",
 correctApproach: "Always test atmosphere and sound in Play mode (F5).",
 },
 {
 mistake: "Ambient audio plays once and stops",
 explanation: "Looping was not enabled on the Sound object.",
 correctApproach: "Enable Looped for ambient audio.",
 },
 {
 mistake: "The project was not saved under a new name",
 explanation: "Changes may be lost or saved to the old file.",
 correctApproach: "Save your progress with Save to Roblox using the name Lesson 1.6 - Island Atmosphere.",
 },
 ],
 summary:
 "In this lesson, you configured Lighting and Atmosphere and created two distinct moods for the level: morning and night. You also added ambient audio and an interaction sound effect. The island is now ready for an interactive party mode in the next lesson.",
 practiceTask: {
 title: "Practical task: Island atmosphere",
 difficulty: "beginner",
 description: `**Task:** Configure two lighting modes, morning and night, then add ambient audio and a short sound effect.

### Part A: Light and fog
1. Open the level with the house and island.
2. In **Lighting**, set the time to morning (ClockTime), choose an appropriate brightness (Brightness), and enable shadows (GlobalShadows).
3. Add **Atmosphere** and configure light fog with Density around 0.3.
4. Record the night ClockTime value and switch to it manually to check how the level looks in the dark.

### Part B: Sound
1. Add ambient audio (\`Ambient_Waves\`) to Workspace. Enable Looped and set a low volume around 0.35.
2. Add a sound effect (SFX) inside an interactive Part, such as \`LogicCube\`. Disable Looped.
3. Add the \`Play()\` command to the Part's script so the sound plays on a click.
4. Start Play mode and walk around the island while checking the audio balance.

### Part C: Finish and save
1. Confirm that Output contains no errors.
2. Save the level through **File → Save to Roblox** as \`Lesson 1.6 - Island Atmosphere\`.
3. Mark the practical task complete in the system.`,
 hints: [
 "Configure the lighting before adding sound.",
 "Ambient audio should always be quieter than sound effects.",
 "Keep the fog density moderate.",
 "At night, confirm that the player can see the path to the water.",
 "Give sounds clear names using Ambient_ and SFX_ prefixes. This will simplify future work.",
 ],
 optionalChallenge:
 "Create two different ambient sounds, one for daytime and one for night, and record their settings. In the next lesson, you will write a script that switches them automatically.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What does the ClockTime property in Lighting control?",
 options: [
          "The level's time of day",
          "The sound volume",
          "The object size",
          "The script type",
        ],
 correctAnswer: 0,
 explanation: "ClockTime sets the in-game time from 0 to 24.",
 },
 {
 id: "q2",
 type: MC,
 question: "What does the Density property in Atmosphere affect?",
 options: [
          "The character's running speed",
          "The number of cut-out windows",
          "The click detection range",
          "The density of fog in the air",
        ],
 correctAnswer: 3,
 explanation: "Density determines how thick the fog appears in the level.",
 },
 {
 id: "q3",
 type: MC,
 question: "Which settings should ambient audio (Ambient) use?",
 options: [
          "Looped = false and Volume = 1",
          "Looped = true and low volume",
          "It must be located only in Terrain",
          "It must replace the ClickDetector",
        ],
 correctAnswer: 1,
 explanation: "Ambient audio should loop continuously without masking other game sounds.",
 },
 {
 id: "q4",
 type: MC,
 question: "What are SFX (Sound Effects) in this lesson?",
 options: [
          "A required database",
          "A game camera type",
          "A short sound that plays during an action, such as a click",
          "An empty-level template",
        ],
 correctAnswer: 2,
 explanation: "SFX are short interaction sounds, unlike continuous ambient audio.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why must you check the night lighting in Play mode?",
 options: [
          "Because ClockTime works only in edit mode",
          "Because fog disappears in Play mode",
          "Because saving is unavailable at night",
          "To confirm that the player can see the path and the house",
        ],
 correctAnswer: 3,
 explanation: "In darkness, incorrect brightness settings can easily make a level impossible to navigate.",
 },
 {
 id: "q6",
 type: MC,
 question: "Which property should you check if ambient audio stops after playing once?",
 options: [
          "Looped",
          "Anchored",
          "Union",
          "Snap to Grid",
        ],
 correctAnswer: 0,
 explanation: "Looped makes the sound repeat continuously.",
 },
 {
 id: "q7",
 type: MC,
 question: "How should you use Bloom at this stage?",
 options: [
          "Set it to maximum for every object",
          "Use it to replace Atmosphere",
          "Use it as a subtle glow accent",
          "Use it to replace every sound in the game",
        ],
 correctAnswer: 2,
 explanation: "Bloom gives bright objects a soft glow, but excessive values can obscure the player's view.",
 },
 {
 id: "q8",
 type: MC,
 question: "What does the sound:Play() command do in the code?",
 options: [
          "Generates new terrain",
          "Starts sound playback",
          "Creates a new Folder",
          "Deletes Lighting",
        ],
 correctAnswer: 1,
 explanation: "This command plays the specified sound effect.",
 },
 {
 id: "q9",
 type: MC,
 question: "Why should you avoid setting ambient audio volume to 1.0, the maximum?",
 options: [
          "The application prohibits values above 0.5",
          "The ambient track will mask the sound effects and make the game sound chaotic",
          "Changing the time of day will stop working",
          "Every image (Decal) will disappear",
        ],
 correctAnswer: 1,
 explanation: "Quiet ambient audio leaves acoustic space for important sound effects.",
 },
 {
 id: "q10",
 type: MC,
 question: "What is the OutdoorAmbient property in Lighting useful for?",
 options: [
          "Cutting openings in walls",
          "Saving the game to the cloud",
          "Changing the tint of objects in shadow",
          "Opening the Toolbox panel",
        ],
 correctAnswer: 2,
 explanation: "OutdoorAmbient determines the color used to illuminate shadowed areas of the level.",
 },
 {
 id: "q11",
 type: MC,
 question: "Which workflow is most effective for configuring the atmosphere?",
 options: [
          "Lighting → Atmosphere → Sound → Testing",
          "Add five ambient sounds → Configure time",
          "Set glow to maximum → Save without testing",
          "Start writing party code before configuring lighting",
        ],
 correctAnswer: 0,
 explanation: "Configure the visual settings first, then add sound.",
 },
 {
 id: "q12",
 type: MC,
 question: "What should you do if the screen is too white or hazy?",
 options: [
          "Change ClockTime",
          "Delete the account",
          "Create a flashlight",
          "Reduce Bloom or Brightness",
        ],
 correctAnswer: 3,
 explanation: "If the screen is too white or hazy, check and reduce Bloom or Brightness.",
 },
 {
 id: "q13",
 type: MC,
 question: "Why should a script use FindFirstChild(\"SFX_Click\")?",
 options: [
          "To generate new terrain",
          "To open the plugin list",
          "To find the sound safely and avoid a script error when it is missing",
          "To change the interface language",
        ],
 correctAnswer: 2,
 explanation: "If the object is not found, this command returns an empty value (nil) instead of stopping the script with an error.",
 },
 {
 id: "q14",
 type: MC,
 question: "What is the result of setting GlobalShadows = true?",
 options: [
          "It provides free assets",
          "It creates realistic shadows from objects, adding visual depth",
          "It automatically applies images to walls",
          "It disables every sound",
        ],
 correctAnswer: 1,
 explanation: "Shadows add depth and realism to the scene.",
 },
 {
 id: "q15",
 type: MC,
 question: "What name should you use when saving the level at the end of lesson 1.6?",
 options: [
          "Lesson 1.6 - Island Atmosphere",
          "Untitled",
          "Lesson 1.1 - House_01",
          "Module 12",
        ],
 correctAnswer: 0,
 explanation: "The task requires you to save the level artifact with its configured atmosphere under the specified name.",
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
 "Create a Neon PartyButton with a ClickDetector.",
 "Store the current state in the partyOn variable and toggle it on each click.",
 "Use an if condition to activate night mode, music, and a visual effect.",
 "Restore the daytime lighting preset when the mode is disabled.",
 "Test and save a working Party Mode toggle on the island.",
 ],
 theory: {
 sections: [
 {
 title: "Lesson task: party button",
 content: `In the previous lesson, you configured morning and night settings, ambient audio, and effects manually. You will now create a button that automates these changes. One click enables Party Mode, and the next restores the island's normal state.

**By the end of this lesson, you will have:**
- A \`PartyButton\` object with Neon material, a ClickDetector, and a Script.
- A \`partyOn\` variable that toggles state (\`partyOn = not partyOn\`).
- An \`if partyOn then ... else ... end\` condition that activates night mode, music, and a visual effect.
- An \`else\` block that restores the daytime preset from lesson 1.6.
- A saved level named \`Lesson 1.7 - Party Mode\`.

Open your saved level \`Lesson 1.6 - Island Atmosphere\`.`,
 },
 {
 title: "What is a toggle?",
 content: `A **toggle** switches between two states. Each click changes the state to its opposite, like a standard light switch:

- state \`false\` (off) → click → becomes \`true\` (on);
- state \`true\` → click → becomes \`false\` again.

In code, this looks like:

\`\`\`lua
local partyOn = false
partyOn = not partyOn -- invert the value
\`\`\`

The \`not\` operator changes a Boolean value to its opposite. The variable lets the script remember the button's current state.`,
 },
 {
 title: "Creating PartyButton",
 content: `1. Create a Block near the house entrance or in the yard where it is easy to see.
2. Name it \`PartyButton\`.
3. Select the **Neon** material and a bright color.
4. Set a convenient clickable size, such as \`3, 1, 3\` or \`2, 4, 2\`.
5. Enable **Anchored = true**.
6. Add a **ClickDetector** inside the button and set MaxActivationDistance to \`32\`.
7. Add a **Script** inside the button.

For organization, group interactive objects such as the button and LogicCube in an \`Interactives\` Folder in Explorer.

**Try it now:** place the Neon button, then add a ClickDetector and an empty Script. Start the game in Play mode and confirm that the click icon appears.
`,
 },
 {
 title: "Music and ambient audio",
 content: `Prepare the Sound objects before writing the toggle logic.

| Sound | Purpose | Looped | Volume |
|-------|------|--------|--------|
| \`Ambient_Day\` | Daytime ambience from lesson 1.6 | true | 0.3–0.4 |
| \`Music_Party\` | Party music | true | 0.35–0.5 |
| \`SFX_PartyStart\` | Optional short startup effect | false | 0.5 |

Toggle behavior:
- Party Mode **on**: \`Music_Party:Play()\` starts, and the daytime ambience stops.
- Party Mode **off**: the daytime ambience starts, and the music stops.

\`\`\`lua
local music = workspace:FindFirstChild("Music_Party")
local ambient = workspace:FindFirstChild("Ambient_Day")

if music then
 music.Looped = true
end
\`\`\`

Use two separate, clearly named Sound objects in Workspace.

**Try it now:** add \`Music_Party\` from the Audio tab in Toolbox and verify its SoundId.`,
 },
 {
 title: "Confetti visual effect",
 content: `You can implement the visual change in several ways. Choose one of these options:

**Option A (simplest):** create several small Neon blocks (\`Confetti_1\`, \`Confetti_2\`) near the button. Set them to \`Transparency = 0\` while Party Mode is on and \`Transparency = 1\` while it is off.
**Option B:** use a **ParticleEmitter** and toggle its \`Enabled\` property.
**Option C:** change existing lamp colors to brighter colors.

**Main requirement:** the two modes must look visibly different.

\`\`\`lua
local function setConfetti(visible)
 for _, child in ipairs(workspace:GetChildren()) do
  if child.Name:match("^Confetti_") and child:IsA("BasePart") then
   child.Transparency = visible and 0 or 1
  end
 end
end
\`\`\`

If the loop is difficult to manage, set each Part's transparency separately.

**Try it now:** create three to six small Neon parts (Anchored = true) and make them invisible (\`Transparency = 1\`).`,
 },
 {
 title: "Basic button code",
 content: `Use this script as the foundation for click handling:

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

This code toggles the time of day and the music.

**Try it now:** add the code to the Script, enter your Sound object names and time settings, then start Play mode. Click the button several times and check the state changes in Output.`,
 },
 {
 title: "Complete code with visual effects",
 content: `Next, add confetti activation. This example uses parts grouped in a Folder:

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

-- In MouseClick, instead of changing only the time:
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

A separate function (\`showPartyVisuals\`) keeps the code cleaner and easier to edit.

**Try it now:** add visual-effect control. In Play mode, verify that the parts' transparency changes.`,
 },
 {
 title: "Preventing double clicks (Debounce)",
 content: `To prevent errors from rapid double-clicks, use a short delay:

\`\`\`lua
local busy = false

detector.MouseClick:Connect(function(player)
 if busy then return end
 busy = true

 partyOn = not partyOn
 -- Main if/else code

 task.wait(0.35)
 busy = false
end)
\`\`\`

This safeguard prevents sound playback issues caused by repeated clicks. Also note that after you stop a test with Stop, audio can sometimes remain loaded in Studio. Always start a fresh Play session when testing.`,
 },
 {
 title: "Testing the Modes",
 content: `During testing, make sure the mode change is obvious:
1. Clicking the button darkens the sky, starts the music, and enables the party lights.
2. Clicking it again fully restores the normal daytime state, stops the music, and starts the ambient nature sound.

If the change is difficult to notice, increase the difference in ClockTime or make the confetti brighter.

**Try it now:** test the feature in Play mode and verify both button states.`,
 },
 {
 title: "Common errors and solutions",
 content: `| Problem | Cause | Fix |
|---------|---------|-------------|
| Party Mode does not turn off | The \`else\` block is missing, or \`partyOn\` is not inverted | Add \`partyOn = not partyOn\` and configure the \`else\` block. |
| Music does not play | SoundId is missing, or Play() is not called | Check the audio asset, then add \`music:Play()\` to the enable block. |
| Both sounds play at once | The ambient sound is not stopped | Add \`ambient:Stop()\` when Party Mode is enabled. |
| Confetti does not disappear | The \`else\` block does not hide it | Set \`Transparency = 1\` in the disable block. |
| Clicking does not work | ClickDetector is missing, or you are testing in Edit mode | Add ClickDetector and test in Play mode (F5). |
| \`Lighting is nil\` error | The service is accessed incorrectly | Use \`game:GetService("Lighting")\`. |`,
 },
 {
 title: "Project completion requirements",
 content: `**Checklist:**
- [ ] \`PartyButton\` uses the Neon material and contains ClickDetector and Script.
- [ ] The \`partyOn\` variable and its inversion are configured.
- [ ] Enabling the mode activates night, music, and a visual effect.
- [ ] Disabling the mode restores daytime and the ambient sound.
- [ ] Status messages from print appear in Output.
- [ ] The project is saved as \`Lesson 1.7 - Party Mode\`.

| Level | Requirements |
|--------|------|
| Meets requirements | Night and music toggle correctly, with a simple visual effect. |
| Proficient | The \`else\` block is clean, two sound objects are used, and the confetti hides correctly. |
| Advanced | Functions organize the code, double-click protection (debounce) is implemented, and the button changes color. |`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "partyOn is not inverted",
 explanation: "The variable remains in one state, so the mode never toggles.",
 correctApproach: "Add partyOn = not partyOn on every click, before the if/else block.",
 },
 {
 mistake: "Party Mode can only be enabled because there is no else block",
 explanation: "A second click does not restore the previous settings.",
 correctApproach: "Add an else branch that restores daytime and stops the music.",
 },
 {
 mistake: "The ambient sound and music play at the same time",
 explanation: "The code does not stop one sound when switching modes.",
 correctApproach: "In ON mode, start the music and stop the ambient sound. Do the reverse in OFF mode.",
 },
 {
 mistake: "Visual effects remain visible after the mode is disabled",
 explanation: "The else branch has no command to hide the objects.",
 correctApproach: "Set Transparency = 1 or Enabled = false for the visual effects in the else block.",
 },
 {
 mistake: "Mouse clicks are not detected",
 explanation: "ClickDetector is missing, or the script is in the wrong location.",
 correctApproach: "Make sure ClickDetector and Script are directly inside PartyButton.",
 },
 {
 mistake: "Testing is performed in Edit mode",
 explanation: "Clicks are processed only while the game is running.",
 correctApproach: "Always test the feature in Play mode (F5).",
 },
 {
 mistake: "The music is too loud",
 explanation: "High volume is uncomfortable and masks other sounds.",
 correctApproach: "Set the music Volume between 0.35 and 0.5.",
 },
 ],
 summary:
 "In this lesson, you configured a Neon button with a partyOn toggle. One click now activates night mode, music, and visual effects, while a second click restores daytime. Party Mode is ready to demonstrate.",
 practiceTask: {
 title: "Practice: Party Mode",
 difficulty: "beginner",
 description: `**Task:** Create a button that toggles Party Mode on the island.

### Part A: Button and Sounds
1. Open the level with the atmosphere configured in lesson 1.6.
2. Create \`PartyButton\` (Neon material, Anchored = true), then add ClickDetector and Script to it.
3. Prepare the \`Music_Party\` audio and a daytime ambient sound in Workspace.

### Part B: Toggle Logic
1. Declare \`local partyOn = false\` and invert it on each click.
2. Write an \`if partyOn\` block that sets the time to night with ClockTime, starts the music, stops the daytime ambience, and activates a visual effect.
3. Write an \`else\` block that restores daytime, stops the music, starts the daytime ambience, and hides the visual effect.
4. Print the current state to Output.
5. Start Play and test at least two complete on-and-off cycles.

### Part C: Finish
1. Fix any issues and organize the object names.
2. Save the level with **File → Save to Roblox** as \`Lesson 1.7 - Party Mode\`.
3. Mark the practice as complete.`,
 hints: [
 "Configure only the time change first, without music. This makes debugging easier.",
 "Sound names in Workspace must exactly match the names in the code (FindFirstChild).",
 "Remember to test the second click that disables the mode.",
 "The simplest way to hide the confetti is with the Transparency property.",
 ],
 optionalChallenge:
 "Add a short sound effect (SFX_PartyStart) that plays only when Party Mode is enabled.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What does the expression partyOn = not partyOn do?",
 options: [
          "Sets the value to true",
          "Deletes the object",
          "Saves progress",
          "Changes the variable's Boolean state to its opposite",
        ],
 correctAnswer: 3,
 explanation: "The not operator inverts a Boolean value from true to false or from false to true.",
 },
 {
 id: "q2",
 type: MC,
 question: "What is the else branch used for in this task?",
 options: [
          "To disable the party effects and restore daytime",
          "To enable Party Mode",
          "To create terrain",
          "To open the Toolbox panel",
        ],
 correctAnswer: 0,
 explanation: "The else branch restores the island's original settings.",
 },
 {
 id: "q3",
 type: MC,
 question: "How should PartyButton be configured?",
 options: [
          "It must not use the Anchored property",
          "It should contain only a LocalScript",
          "It should use the Neon material and contain a ClickDetector",
          "It should be a MeshPart with no scripts",
        ],
 correctAnswer: 2,
 explanation: "For this task, the button must use the Neon material and respond to clicks.",
 },
 {
 id: "q4",
 type: MC,
 question: "How should sounds be configured during Party Mode?",
 options: [
          "Delete the Lighting object",
          "Stop the ambient sound when partyOn = true",
          "Disable ClickDetector",
          "Set a constant ClockTime = 14",
        ],
 correctAnswer: 1,
 explanation: "The music should replace the daytime ambience so the sounds do not overlap.",
 },
 {
 id: "q5",
 type: MC,
 question: "What is the simplest way to hide a visual effect?",
 options: [
          "Delete Workspace",
          "Use the Union tool",
          "Set Transparency = 1 on the effect objects",
          "Change the interface language",
        ],
 correctAnswer: 2,
 explanation: "The Transparency = 1 property makes Parts completely transparent.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why is game:GetService(\"Lighting\") used in the code?",
 options: [
          "To add images (Decal)",
          "To access time-of-day settings (ClockTime)",
          "To create folders",
          "To enable grid snapping",
        ],
 correctAnswer: 1,
 explanation: "This service lets a script modify lighting settings.",
 },
 {
 id: "q7",
 type: MC,
 question: "Where should the button script be located?",
 options: [
          "Directly inside PartyButton",
          "Only in Terrain",
          "In the name of the object",
          "In the BrickColor property",
        ],
 correctAnswer: 0,
 explanation: "Placing the script inside the button ensures that script.Parent refers to the correct object.",
 },
 {
 id: "q8",
 type: MC,
 question: "Which skills does the Party Mode task combine?",
 options: [
          "Working with databases (DataStore)",
          "Using RemoteEvent",
          "Only generating terrain",
          "Using if conditions, ClickDetector, and lighting settings",
        ],
 correctAnswer: 3,
 explanation: "The task combines conditional logic with the atmosphere settings covered earlier.",
 },
 {
 id: "q9",
 type: MC,
 question: "How does the print(partyOn) command help during development?",
 options: [
          "It displays the button's current state in Output",
          "It increases screen brightness",
          "It creates fog (Atmosphere)",
          "It cuts openings in walls",
        ],
 correctAnswer: 0,
 explanation: "This is a standard way to verify that mode toggling works correctly.",
 },
 {
 id: "q10",
 type: MC,
 question: "What should the confetti visual effect do?",
 options: [
          "It must contain 1,000 Parts",
          "It should only change the level name",
          "It should consist only of print messages",
          "It should create a clear visual difference between the enabled and disabled states",
        ],
 correctAnswer: 3,
 explanation: "The main goal is to provide visual feedback to the player.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why is music:Stop() required in the else branch?",
 options: [
          "To delete the ClickDetector object",
          "To stop the party music when daytime is restored",
          "To reset the Anchored property",
          "To clear the terrain",
        ],
 correctAnswer: 1,
 explanation: "When Party Mode is disabled, the music must stop.",
 },
 {
 id: "q12",
 type: MC,
 question: "Which mode should you use to test the button?",
 options: [
          "Only Terrain Editor",
          "Directly on the Roblox website",
          "Play mode",
          "Edit mode",
        ],
 correctAnswer: 2,
 explanation: "ClickDetector interactions are processed only while the game is running.",
 },
 {
 id: "q13",
 type: MC,
 question: "What does the busy variable do together with task.wait?",
 options: [
          "Prevents materials from being lost",
          "Protects the script from issues caused by clicks that occur too frequently",
          "Changes object materials",
          "Generates new terrain objects",
        ],
 correctAnswer: 1,
 explanation: "This debounce mechanism prevents the code from running multiple times after a double-click.",
 },
 {
 id: "q14",
 type: MC,
 question: "What should you do if both sounds play at the same time?",
 options: [
          "Add ambient:Stop() when Party Mode is enabled.",
          "Add the sounds again",
          "Disable them manually in Properties",
          "Configure the sound in Roblox",
        ],
 correctAnswer: 0,
 explanation: "If both sounds play at the same time, add ambient:Stop() when Party Mode is enabled.",
 },
 {
 id: "q15",
 type: MC,
 question: "What name should you use when saving the file?",
 options: [
          "Untitled",
          "Lesson 1.2 - Island",
          "Lesson 1.7 - Party Mode",
          "Module 5",
        ],
 correctAnswer: 2,
 explanation: "Save the project with the corresponding lesson name.",
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
 "Complete the Module 1 level review without using new mechanics.",
 "Organize Explorer by giving objects clear names and grouping them into folders.",
 "Verify that the project was saved correctly to Roblox cloud with the correct name.",
 "Demonstrate Party Mode in a peer demo.",
 "Consolidate the skills you have learned before moving to Module 2.",
 ],
 theory: {
 sections: [
 {
 title: "Lesson Task: Submit the Level",
 content: `This is a **checkpoint**, not a new topic. Your main goal is to refine and prepare everything you created in lessons 1.1–1.7 for presentation.

**Complete these items by the end of the lesson:**
- Prepare one level that combines all Module 1 work.
- Check the level against the checklist.
- Organize Explorer with folders and clear names.
- Save the level as \`Module 1 - Living Island\`.
- Prepare a short 30–60 second Party Mode demonstration.

Open the saved level from the previous lesson. Use the most complete version available.`,
 },
 {
 title: "What Your Level Should Already Include",
 content: `Check that your level includes every required element from the previous stages:

| Lesson | Required content |
|------|-------------------|
| **1.1** | A \`House_01\` with windows and a doorway cut using Union. |
| **1.2** | An island with terrain, water, a beach, and smoothed shorelines. |
| **1.3** | A \`MagicCube\` with a script, variables, a print command, and a modified appearance. |
| **1.4** | A \`LogicCube\` with ClickDetector and if/else conditions. |
| **1.5** | House details with configured materials, images (Decal/Texture), and Neon accents. |
| **1.6** | A configured atmosphere (Lighting, Atmosphere), ambient sound, and effects (SFX). |
| **1.7** | A \`PartyButton\` that toggles night mode, music, and visual effects. |

**Try it now:** review the list and confirm that every component is present. If anything is missing, add it with tools you have already used. Do not add new mechanics at this stage. Focus on refining the existing work.`,
 },
 {
 title: "Completed Level Checklist",
 content: `The level will be reviewed against these criteria:

**World**
- [ ] The house has an accessible interior.
- [ ] The level has terrain with land and water, not only the default Baseplate.
- [ ] The house is positioned correctly on the ground.

**Code**
- [ ] A script uses variables (\`local\`) and the \`print\` command.
- [ ] \`if/else\` conditions respond to a click.
- [ ] Party Mode turns on and off correctly.

**Appearance and Atmosphere**
- [ ] The house exterior uses materials and images.
- [ ] Visibility remains comfortable at night.
- [ ] The ambient sound and sound effect work.

**Organization**
- [ ] All Parts have clear names, and Explorer contains no unnecessary Parts.
- [ ] The project is saved with the correct name.

**Try it now:** test the level in Play mode. Fix each issue as you find it.`,
 },
 {
 title: "Organizing Objects with Folders",
 content: `Keep Explorer organized. Create several folders (Folder) and arrange the objects as shown:

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

**Important:** use the standard folder tools (Insert → Folder) and drag objects into place. Do not move scripts out of interactive Parts such as \`LogicCube\` or \`PartyButton\`, because this will break the \`script.Parent\` reference.


**Try it now:** create 1–3 folders and use them to group decorative objects, sounds, and interactive elements.`,
 },
 {
 title: "Playtest from the Player's Perspective",
 content: `Start the game and explore the level as if you were seeing it for the first time:

1. Can you see the door and sign when you spawn?
2. Approach the interactive cubes. Do they respond to clicks?
3. Click \`PartyButton\`. Do the music, confetti, and night mode activate?
4. Click it again. Do daytime and the ambient sound return?
5. Walk to the beach. Does the character get stuck in the terrain?

If something falls, check Anchored.
If clicking does not work, check ClickDetector and confirm that you are testing in Play mode.
If sounds overlap, check that the Party Mode script includes \`Stop()\`.

**Try it now:** complete this entire route and record any issues.`,
 },
 {
 title: "Saving the project",
 content: `Perform a final save with **File → Save to Roblox**.

**Important:** use a clear project name, such as \`Module 1 - Living Island\`. Avoid names such as \`Untitled\`, \`test\`, or \`Place1\`, because they make the level difficult to find later when building your portfolio.

After saving, close the level and reopen it from your project list. Confirm that the latest working version with Party Mode was saved to the cloud.

**Try it now:** save the level with the correct name and verify that it appears in your projects.`,
 },
 {
 title: "Party Mode Demonstration",
 content: `Prepare a short 30–60 second presentation.

**Demonstration outline:**
1. Introduce the island and house while showing them with the camera.
2. Identify the Party Mode button and move the character to PartyButton.
3. Click it and explain that you enabled night, music, and effects.
4. Click it again and explain that you disabled Party Mode and restored daytime.
5. Optionally, click LogicCube and briefly explain that it uses an if condition.

Keep the demonstration clear and avoid long pauses. Always demonstrate in Play mode, because sounds and clicks do not work in Edit mode.

**Try it now:** rehearse this outline and complete one test run in the game.`,
 },
 {
 title: "Code Reference",
 content: `Review the main constructs used in your scripts. Understanding them will help you answer questions confidently during the presentation.

\`\`\`lua
-- Variable and property changes
local part = script.Parent
part.BrickColor = BrickColor.new("Bright violet")
print(part.Name)
\`\`\`

\`\`\`lua
-- if/else condition and Boolean toggle
local partyOn = false
partyOn = not partyOn
if partyOn then
 print("Enabled")
else
 print("Disabled")
end
\`\`\`

**Try it now:** open the script in PartyButton and make sure you understand each line.`,
 },
 {
 title: "Final Checklist",
 content: `- [ ] The level meets the completed-level requirements and passes the Play test.
- [ ] Folders are created in Explorer, and object names are organized.
- [ ] Party Mode consistently turns on and off.
- [ ] The project is saved as \`Module 1 - Living Island\`.
- [ ] A 30–60 second demonstration is prepared.
- [ ] You can explain a variable and an \`if\` condition in your own words.

**Try it now:** review every item. Resolve any incomplete item before the final submission.`,
 },
 {
 title: "Common Submission Issues",
 content: `| Issue | Cause | Fix |
|-------|-----------------|-------------------------|
| Party Mode does not turn off | The \`else\` block is missing, or \`not\` was omitted | Compare the code structure with the lesson 1.7 template. |
| The house is underwater or floating | The terrain was modified | Use Flatten and move the house with the Move tool. |
| Unnamed Parts are clustered near the entrance | Decorative objects were created without organizing them | Rename the Parts and group them in the Decor folder. |
| The button does not respond during the demo | The demonstration is running in Edit mode | Always start Play mode (F5) before testing. |
| Music is missing after reopening the project | The project was not saved to the cloud | Use Save to Roblox and save the project correctly. |
| The level is too dark to see | Brightness is set to zero | Increase Brightness or OutdoorAmbient slightly in Lighting. |`,
 },
 {
 title: "Preparing for Module 2",
 content: `The next stage is **Module 2 (World Craft)**. You will work with 3D models, moving connections such as doors and bridges, and more advanced mechanics for building an amusement park.


You have now completed Module 1 and turned an empty space into a functional interactive environment.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Attempting to add complex mechanics from online sources",
 explanation: "At the submission stage, there is limited time to debug unfamiliar code. The review covers only the material from this module.",
 correctApproach: "Refine only the work created in lessons 1.1–1.7.",
 },
 {
 mistake: "Running the Party Mode demonstration in Edit mode",
 explanation: "Clicks, sounds, and most scripts do not work fully outside Play mode.",
 correctApproach: "Always use Play for the demonstration and complete a practice run in advance.",
 },
 {
 mistake: "Testing only whether Party Mode turns on",
 explanation: "It is easy to overlook whether the mode also turns off correctly.",
 correctApproach: "Click the button twice to test the else branch.",
 },
 {
 mistake: "Moving the script into a folder instead of keeping it in the Part",
 explanation: "If you move Script into Folder, script.Parent will no longer refer to the required object.",
 correctApproach: "Keep the script inside its Part. Move the entire Part, including its script, into the folder.",
 },
 {
 mistake: "Saving as Untitled or losing the latest version",
 explanation: "After several weeks, the correct level can be difficult to identify among many projects.",
 correctApproach: "Always use Save to Roblox with the Module 1 name. Reopen the file to verify it.",
 },
 {
 mistake: "Ignoring the checklist to focus on visual details",
 explanation: "The level does not meet the requirements without working code and correct geometry.",
 correctApproach: "Complete every technical checklist item before refining minor decorative details.",
 },
 {
 mistake: "Deleting the house or island to simplify the submission",
 explanation: "The module is designed around building one complete environment in layers.",
 correctApproach: "Keep all results, including the house, island, cubes, and atmosphere, in one final level.",
 },
 ],
 summary:
 "In this lesson, you combined all Module 1 skills into one functional environment. You reviewed it against the checklist, organized Explorer, saved the project for your portfolio, and demonstrated the interactive Party Mode.",
 practiceTask: {
 title: "Practice: Living Island Checkpoint",
 difficulty: "beginner",
 description: `**Task:** Prepare and demonstrate the final Module 1 level.

### Part A: Review the Level
1. Open your most complete level from after lesson 1.7.
2. Follow the theory section's "What Your Level Should Already Include" checklist.
3. Fix any issues using only familiar tools.

### Part B: Organization and Testing
1. Create 1–3 folders (Folder) in Explorer and use them to organize decorative and interactive objects. Do not move scripts out of their Parts.
2. Start Play and follow the complete visitor route. Test Party Mode by turning it on and off twice.
3. Save the level with **File → Save to Roblox** as \`Module 1 - Living Island\`.
4. Close and reopen the level to verify the saved version.

### Part C: Demonstration
1. Prepare a 30–60 second presentation using the outline.
2. Demonstrate Party Mode in Play mode to another person or record a screen video.
3. Mark the practice and checkpoint as complete in the system.`,
 hints: [
 "Test the scripts before organizing Explorer.",
 "The script must remain inside its Part.",
 "Make sure you test the second Party Mode click.",
 "Run the demonstration only in Play mode.",
 "Do not replace your house with a large premade model from Free Models.",
 ],
 optionalChallenge:
 "Write five short sentences about what you learned, such as \"I can cut windows with Union\" or \"I can write an if condition.\" Use them as a quick reference before the next module.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the main goal of lesson 1.8?",
 options: [
          "Learn to work with databases (DataStore)",
          "Submit and demonstrate the completed Module 1 level",
          "Build a Tycoon game",
          "Create a user interface (GUI)",
        ],
 correctAnswer: 1,
 explanation: "The checkpoint is for refining and submitting existing work, not learning new topics.",
 },
 {
 id: "q2",
 type: MC,
 question: "Which item should already be in the level before lesson 1.8 begins?",
 options: [
          "A weapon shop",
          "Only an empty Baseplate template",
          "House_01, an island, coded cubes, decorative details, atmosphere, and Party Mode",
          "Only a configuration script",
        ],
 correctAnswer: 2,
 explanation: "The level should combine all work completed in lessons 1.1–1.7.",
 },
 {
 id: "q3",
 type: MC,
 question: "What should you NOT do during the checkpoint submission?",
 options: [
          "Add complex new mechanics that were not covered in the module",
          "Fix geometry and Part names",
          "Test the Party Mode toggle",
          "Save the project with the correct name",
        ],
 correctAnswer: 0,
 explanation: "Demonstrate only the skills covered in the module to avoid unexpected errors.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why do we create folders (Folder) in Explorer?",
 options: [
          "To replace scripts",
          "To generate new terrain",
          "To enable the glow effect",
          "To group Parts logically and organize the level before submission",
        ],
 correctAnswer: 3,
 explanation: "Folders organize large numbers of objects into a manageable structure.",
 },
 {
 id: "q5",
 type: MC,
 question: "What happens if you move a script into Folder but leave its Part in place?",
 options: [
          "script.Parent no longer refers to the Part, and the code breaks",
          "A new image appears automatically",
          "Data saving is activated",
          "All terrain is deleted",
        ],
 correctAnswer: 0,
 explanation: "A script should remain inside the object it interacts with.",
 },
 {
 id: "q6",
 type: MC,
 question: "How should you run the Party Mode demonstration?",
 options: [
          "In Edit mode, without clicking any buttons",
          "In Play mode, in 30–60 seconds",
          "Without sound and without testing whether the mode turns off",
          "In an empty level without the button",
        ],
 correctAnswer: 1,
 explanation: "Keep the demonstration brief and run it entirely in Play mode to show all functionality.",
 },
 {
 id: "q7",
 type: MC,
 question: "Which name is best for saving the project?",
 options: [
          "asdf",
          "Untitled Game",
          "test123",
          "Module 1 - Living Island",
        ],
 correctAnswer: 3,
 explanation: "Use a clear name so the project is easy to find for your portfolio.",
 },
 {
 id: "q8",
 type: MC,
 question: "How should you fix a house that is underwater after editing?",
 options: [
          "Use complex server scripts",
          "Write an infinite loop",
          "Use the Flatten and Move tools for the terrain",
          "Delete the lighting settings",
        ],
 correctAnswer: 2,
 explanation: "This common issue can be resolved with the basic Terrain Editor and Move tools.",
 },
 {
 id: "q9",
 type: MC,
 question: "Why is it important to give projects clear names?",
 options: [
          "I don't know",
          "To avoid losing the account",
          "To make the required level easier to find",
          "It is not important",
        ],
 correctAnswer: 2,
 explanation: "Clear project names make the required level easier to find.",
 },
 {
 id: "q10",
 type: MC,
 question: "What should you do if the button does not respond during the demo?",
 options: [
          "Check whether Play mode is running",
          "Turn off the computer",
          "Delete the account",
          "Rewrite Script",
        ],
 correctAnswer: 0,
 explanation: "If the button does not respond, check whether Play mode is running.",
 },
 {
 id: "q11",
 type: MC,
 question: "What must you test in Party Mode?",
 options: [
          "Only the first click that enables it",
          "Only changing the button name in the panel",
          "Only its appearance without starting Play",
          "Whether the mode turns on and off correctly",
        ],
 correctAnswer: 3,
 explanation: "The button works as a toggle, so verify that both states work without errors.",
 },
 {
 id: "q12",
 type: MC,
 question: "What is Module 2 about?",
 options: [
          "Repeating work with the Baseplate template",
          "World Craft, including models, connections, and amusement park features",
          "Publishing the game in the store",
          "Working with databases from the first lesson",
        ],
 correctAnswer: 1,
 explanation: "After completing the introductory course in Module 1, the next step is more advanced modeling.",
 },
 {
 id: "q13",
 type: MC,
 question: "Which tools did we use to create the house windows at the start of the module?",
 options: [
          "RemoteEvent",
          "DataStore",
          "Raycast",
          "Negate and Union",
        ],
 correctAnswer: 3,
 explanation: "The windows were cut with basic constructive solid geometry (CSG) tools.",
 },
 {
 id: "q14",
 type: MC,
 question: "Why should you close and reopen the project after saving?",
 options: [
          "To remove fog (Atmosphere)",
          "To reset all variables",
          "To confirm that the latest working version was saved to the cloud",
          "To enable third-party plugins",
        ],
 correctAnswer: 2,
 explanation: "This is a reliable way to confirm that the project was saved successfully to Roblox cloud.",
 },
 {
 id: "q15",
 type: MC,
 question: "What is the main artifact submitted at the end of Module 1?",
 options: [
          "One complete interactive environment that meets the checklist, a saved project, and a short Party Mode demo",
          "A completely empty level",
          "One image on the Baseplate",
          "A new game created from scratch",
        ],
 correctAnswer: 0,
 explanation: "The checkpoint requires one complete result that combines all previous work in the module.",
 },
 ],
 },
}
