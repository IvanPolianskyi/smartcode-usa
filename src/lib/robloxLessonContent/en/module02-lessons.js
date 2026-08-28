/** Roblox Module 02 EN */
import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson21 = {
 lessonId: "lesson-roblox-2-1",
 moduleId: "module-02",
 order: 1,
 title: "2.1 - Island Headquarters",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Group the island headquarters into the IslandHQ_v1 Model and configure its PrimaryPart.",
 "Organize objects in Workspace with Folders and PascalCase names.",
 "Configure the Anchored and CanCollide properties for the headquarters Parts.",
 "Use GetChildren to list the Model's objects in the Output window.",
 "Position the completed IslandHQ_v1 headquarters Model correctly in the level.",
 ],
 theory: {
 sections: [
 {
 title: "Building the Island Headquarters",
 content: `The **World Craft** module focuses on organizing and structuring a world. In this lesson, you will create the **island headquarters**, a Model named \`IslandHQ_v1\`. It will contain several basic objects (Parts) grouped into a Model, with a defined pivot Part (**PrimaryPart**), Folders for organization, and a script that displays the Model's structure in the Output window.

Complex elements will not work correctly in a poorly organized game world. You will now learn how to package objects into a Model so you can move them as one unit and control them through code.

**What to complete by the end of the lesson (artifact):**
- Create the \`IslandHQ_v1\` Model on your island.
- Add at least **Platform**, **Pillar_A**, **Pillar_B**, and **RoofPlate** inside it.
- Set the Model's **PrimaryPart**.
- Create Folders in Explorer for the interactive elements from the first module.
- Add an \`HQ_Audit\` Script that uses \`GetChildren\`.
- Save the level as \`Lesson 2.1 - IslandHQ_v1\`.

Open the level you saved in the previous module (\`Module 1 - Living Island\`). Continue working in that level. Do not create an empty Baseplate.`,
 },
 {
 title: "The Difference Between Model and Folder",
 content: `In the previous module, you used a **Folder** to organize objects in Explorer. Now you will examine the **Model** container in detail.

| Container | Characteristics | When to use it |
|-----------|---------|------|
| **Folder** | Organizes objects in Explorer and has no physical properties. | Sounds, decorations, and UI. |
| **Model** | Combines Parts into a physical object. Has a PrimaryPart (pivot Part) and is easy to move as a unit. | Buildings, headquarters, doors, and vehicles. |

A **Folder** has no PrimaryPart and does not interact with the world as one object. The game engine treats a **Model** as a single item. Complex mechanisms should be built as Models.

**Do this now:** find the house from the previous module in Explorer. Check whether it is grouped into a Model. In this lesson, you will build a correctly structured headquarters from the start.`,
 },
 {
 title: "Building the Headquarters Frame (Group)",
 content: `1. Build four blocks (Part → Block) near the house:
   - \`Platform\`, the headquarters base, for example with a size of \`12, 1, 12\`.
   - \`Pillar_A\` and \`Pillar_B\`, two columns on the platform.
   - \`RoofPlate\`, the roof resting on the columns.
2. Use Snap to Grid to align the Parts precisely with no gaps.
3. Set **Anchored = true** for all four blocks.
4. Select these objects by holding Ctrl in Explorer or dragging a selection box around them.
5. Press **Ctrl+G** or select Model → Group.
6. Rename the resulting Model to \`IslandHQ_v1\`.

Always use **PascalCase** for object names, such as \`IslandHQ_v1\` and \`RoofPlate\`. Use production-ready names without spaces.

If you grouped extra objects, such as a tree selected by accident, press **Ctrl+U** (Ungroup), clear the extra selection, and group the correct objects again.

**Do this now:** assemble the headquarters frame, group the Parts into \`IslandHQ_v1\`, and place it on a flat area of the island.`,
 },
 {
 title: "Configuring PrimaryPart",
 content: `Without a configured **PrimaryPart**, a Model may rotate or move incorrectly, as if its center were outside the object.

**PrimaryPart** is the main Part inside a Model that Studio uses as the pivot for positioning the entire structure.

**How to configure it:**
1. Select the \`IslandHQ_v1\` Model in Explorer.
2. In Properties, find the **PrimaryPart** property.
3. Click the empty field beside it, then select the \`Platform\` Part in Explorer.

The Model's rotation and movement are now reliably centered on the headquarters platform.

**Do this now:** set the PrimaryPart. Then select \`IslandHQ_v1\` and use the Move tool to move the Model to one side. Confirm that every element moves as one unit.`,
 },
 {
 title: "Organizing Explorer and Using PascalCase",
 content: `The Explorer hierarchy should be organized and easy to read. Do not leave objects at the root of Workspace.

Recommended structure:

\`\`\`sh
Workspace
├── House_01 (Model)
├── IslandHQ_v1 (Model)
|   ├── Platform
|   ├── Pillar_A
|   ├── Pillar_B
|   ├── RoofPlate
|   └── HQ_Audit (Script)
├── Interactives (Folder)
│   ├── MagicCube
│   └── LogicCube
├── Decor (Folder)
└── Sounds (Folder)
Terrain
\`\`\`

Use clear names for every object, such as \`Pillar_A\` instead of \`Part1\` or \`shtab\`. Avoid automatically generated duplicate names such as \`IslandHQ_v1 (2)\`. Always rename objects intentionally.

**Do this now:** check the names of all Parts inside \`IslandHQ_v1\`. Create an \`Interactives\` Folder and move the \`MagicCube\` and \`LogicCube\` objects from the first module into it.`,
 },
 {
 title: "Physics Properties: Anchored, CanCollide, and Massless",
 content: `Review the basic physics properties required for Models to work correctly.

| Property | Purpose | Headquarters setting |
|----------|-----------|---------------------|
| **Anchored** | Fixes an object in place so gravity does not affect it. | \`true\` for the platform, columns, and roof. |
| **CanCollide** | Determines whether other objects, including the player, can pass through the Part. | \`true\` for the platform and structural columns. It can be disabled for small decorations. |
| **Massless** | Removes the Part's mass. | Prevents the object from adding weight during physics interactions. |

**Common mistake:** a decorative light on the roof has \`CanCollide = true\`, causing the player's head to catch on it. Disable collisions (\`false\`) for small decorative Parts.

**Do this now:** confirm that Anchored = true is set on every Part in \`IslandHQ_v1\`. Confirm that CanCollide is enabled on \`Platform\`.`,
 },
 {
 title: "The GetChildren Method",
 content: `In the previous module, you accessed one object through \`script.Parent\`. Now you will retrieve a list of all the objects inside a Model.

\`\`\`lua
local hq = script.Parent
local kids = hq:GetChildren()
print("Number of items in headquarters:", #kids)
\`\`\`

The \`GetChildren()\` method returns a table, or list, of items. The \`#\` operator before the table name returns the number of objects it contains.

Use a basic \`for\` loop to print the names of all retrieved items to Output:

\`\`\`lua
local hq = script.Parent

print("=== IslandHQ Audit ===")
for _, child in ipairs(hq:GetChildren()) do
	print(child.Name, child.ClassName)
end
\`\`\`

In this code, \`child\` represents each individual object inside the Model. This basic loop is sufficient for auditing the headquarters. Treat it as an inspection tool.

**Do this now:** add a standard Script inside \`IslandHQ_v1\`, not a LocalScript. Name it \`HQ_Audit\`, paste in the code above, start Play, and check Output.`,
 },
 {
 title: "Writing the Audit Code Step by Step",
 content: `Build the complete script for automatically auditing the headquarters. Divide the task into steps.

**Step 1. Check the script location:**
\`\`\`lua
local hq = script.Parent
print("Headquarters:", hq.Name, hq.ClassName)
\`\`\`
Output should display \`Headquarters: IslandHQ_v1 Model\`. If it displays \`Part\`, the script is inside an individual Part instead of the headquarters Model. Move the script.

**Step 2. Check PrimaryPart:**
\`\`\`lua
local hq = script.Parent
if hq.PrimaryPart then
	print("PrimaryPart set:", hq.PrimaryPart.Name)
else
	print("Error: PrimaryPart is missing. Set it to Platform!")
end
\`\`\`

**Step 3. List the items:** add the \`for\` loop from the previous section to the end of this script.

**Do this now:** combine these steps in the \`HQ_Audit\` script.`,
 },
 {
 title: "Rotating the Model and Its Pivot",
 content: `Test the PrimaryPart configuration:

1. Select \`IslandHQ_v1\` in Explorer.
2. Select the **Rotate** tool.
3. Rotate the Model by 90°. It should rotate as one unit around the platform.

Always move and rotate the headquarters by selecting \`IslandHQ_v1\` in Explorer. If you select a Part in the viewport, such as a column, and use Move, you will pull it away from the rest of the Model.

**Do this now:** rotate the headquarters with the Rotate tool, then return it to its original position. Confirm that all Parts keep their relative positions.`,
 },
 {
 title: "Project Submission Requirements",
 content: `All interactive objects from Module 1, including cubes and party buttons, should remain unchanged and continue working as before. Do not move their scripts into the headquarters Model or add complex interaction scripts here. You only need the audit in Output.

**Completed headquarters checklist:**
- [ ] The headquarters Model is named \`IslandHQ_v1\`.
- [ ] PrimaryPart is set to the base Part (\`Platform\`).
- [ ] Every Part has a clear PascalCase name, with no names such as \`Part1\`.
- [ ] Anchored = true is enabled for every Part.
- [ ] The \`HQ_Audit\` script prints the Model name, PrimaryPart status, and Part list to Output.
- [ ] The level is saved as \`Lesson 2.1 - IslandHQ_v1\`.

| Level | Instructor assessment |
|--------|-------------------------------|
| **Not passed** | The Model has not been created, the script is missing, or Output shows an error. |
| **Passed** | The headquarters is grouped into a Model, PrimaryPart is set, and the audit runs and prints data. |
| **Good** | Every Part uses a PascalCase name, and Explorer is organized with Folders. |
| **Excellent** | The script combines all three audit steps with no errors, and the headquarters includes clean, well-placed decorations. |`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "The script is inside the Platform Part instead of the IslandHQ_v1 Model",
 explanation: "The script.Parent expression will reference the Part instead of the Model, so the script will not detect the other headquarters Parts.",
 correctApproach: "Drag HQ_Audit directly into IslandHQ_v1 in Explorer.",
 },
 {
 mistake: "PrimaryPart is not set",
 explanation: "Without a pivot Part, the Model may rotate around the wrong center, making it difficult to position.",
 correctApproach: "Select the IslandHQ_v1 Model, find PrimaryPart in Properties, and select the Platform Part.",
 },
 {
 mistake: "The headquarters is grouped with the Baseplate or terrain",
 explanation: "This turns the entire world into one Model. Terrain must not be grouped with buildings.",
 correctApproach: "Press Ctrl+U (Ungroup), select only the headquarters Parts, and press Ctrl+G again.",
 },
 {
 mistake: "Only the roof moves when you try to move the headquarters",
 explanation: "An individual Part was selected in the viewport instead of the entire Model in the hierarchy.",
 correctApproach: "Always select IslandHQ_v1 in Explorer before moving or rotating it.",
 },
 {
 mistake: "Objects have default names such as Part or Part1",
 explanation: "These names make Explorer disorganized and make it harder for scripts to find Parts.",
 correctApproach: "Rename every Part using PascalCase, such as Platform and Pillar_A.",
 },
 {
 mistake: "Using a LocalScript instead of a standard Script",
 explanation: "A LocalScript does not run in Workspace for Model auditing.",
 correctApproach: "Use a standard server Script.",
 },
 ],
 summary:
 "In this lesson, you learned how to group Parts into a Model and configure PrimaryPart. You organized the world with Folders, used PascalCase for names, and wrote an audit script that lists the Model's contents with GetChildren(). Your headquarters is ready for further development.",
 practiceTask: {
 title: "Practical Assignment: IslandHQ_v1",
 difficulty: "beginner",
 description: `**Task:** Create an island headquarters Model with a configured PrimaryPart, a correct Explorer hierarchy, and a validation script that uses GetChildren.

### Part A: Build the frame
1. Open your Living Island level. Enable Explorer, Properties, and Output.
2. Build the basic \`Platform\`, \`Pillar_A\`, \`Pillar_B\`, and \`RoofPlate\` blocks near the house.
3. Group them into one Model named \`IslandHQ_v1\` and set PrimaryPart = \`Platform\`.
4. Use the Rotate tool to test that the entire Model rotates together.

### Part B: Structure and audit
1. Add a standard Script named \`HQ_Audit\` to the Model.
2. In the script, check the Model name and PrimaryPart, then add a \`for\` loop that uses \`GetChildren()\`.
3. Check the Part names and convert them to PascalCase. No Part should be named \`Part\`.
4. Create an \`Interactives\` Folder in Workspace and move the objects from the first module into it.
5. Confirm that \`Anchored = true\` is enabled for every headquarters Part.

### Part C: Save
1. Start Play and confirm that the audit data appears in Output.
2. Save the final level through **File → Save to Roblox** as \`Lesson 2.1 - IslandHQ_v1\`.
3. Mark the practice assignment as complete in the system.`,
 hints: [
 "Enable Snap to Grid to position the columns precisely on the platform.",
 "Keep the script inside the IslandHQ_v1 Model.",
 "Use a standard Script for the audit, not a LocalScript.",
 ],
 optionalChallenge:
 "Add a decorative antenna to the headquarters roof, set `CanCollide = false`, and walk through it with your character in Play mode. In the comments, describe how the Part's behavior changes.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the main artifact for Lesson 2.1?",
 options: [
 "An obstacle maze",
 "A data-saving system",
 "The IslandHQ_v1 Model with a configured PrimaryPart and audit script",
 "An empty level",
 ],
 correctAnswer: 2,
 explanation: "The lesson's main task is to build a correctly structured headquarters Model.",
 },
 {
 id: "q2",
 type: MC,
 question: "What is the main advantage of a Model over a Folder when working with objects?",
 options: [
 "A Model has a PrimaryPart and moves through the world as one complete object",
 "A Folder loads faster during game testing",
 "A Folder cannot contain Part objects",
 "A Model cannot contain scripts",
 ],
 correctAnswer: 0,
 explanation: "A Folder organizes lists in Explorer, while a Model creates one complete physical object in the world.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why do you set the PrimaryPart property?",
 options: [
 "To activate the Neon material",
 "To replace the Anchored property",
 "To load an object from the Toolbox automatically",
 "To define the main pivot for positioning and rotating the Model",
 ],
 correctAnswer: 3,
 explanation: "PrimaryPart lets you manipulate the Model correctly with Move and Rotate relative to the selected base.",
 },
 {
 id: "q4",
 type: MC,
 question: "Which name format is correct for the headquarters?",
 options: [
 "new model",
 "IslandHQ_v1",
 "headquarters",
 "Part",
 ],
 correctAnswer: 1,
 explanation: "Always use PascalCase to create stable, clear names.",
 },
 {
 id: "q5",
 type: MC,
 question: "What does the GetChildren() method do?",
 options: [
 "Deletes every nested object from the Model",
 "Enables CanCollide for every Part",
 "Returns a list, or table, of all child objects inside the Model",
 "Publishes the game to the website",
 ],
 correctAnswer: 2,
 explanation: "GetChildren is used to inspect the contents of an object or Model through code.",
 },
 {
 id: "q6",
 type: MC,
 question: "Where should the HQ_Audit script be placed?",
 options: [
 "Directly inside the IslandHQ_v1 Model",
 "Only in the ServerStorage Folder",
 "In the player's LocalPlayer Folder",
 "In the Lighting object",
 ],
 correctAnswer: 0,
 explanation: "Placing the script in the Model allows script.Parent to reference the headquarters correctly.",
 },
 {
 id: "q7",
 type: MC,
 question: "Which property keeps the headquarters platform fixed in place?",
 options: [
 "Massless = true",
 "Anchored = true",
 "CanQuery = false",
 "Locked = true",
 ],
 correctAnswer: 1,
 explanation: "Anchored keeps an object in place by disabling the effect of gravity.",
 },
 {
 id: "q8",
 type: MC,
 question: "What does CanCollide = false mean for the decorative antenna?",
 options: [
 "The antenna disappears during the game",
 "The PrimaryPart setting is cleared",
 "GetChildren returns an error",
 "The player can pass through the antenna without colliding with it",
 ],
 correctAnswer: 3,
 explanation: "Disabling collisions for small decorations prevents the character from getting stuck.",
 },
 {
 id: "q9",
 type: MC,
 question: "Why do we use the Massless property in this lesson?",
 options: [
 "We do not enable it today, but it removes an object's mass during physics interactions.",
 "We must enable it for every headquarters Part.",
 "We use it instead of PrimaryPart.",
 "We enable it only for Terrain.",
 ],
 correctAnswer: 0,
 explanation: "Massless removes an object's mass, although this lesson only introduces the property.",
 },
 {
 id: "q10",
 type: MC,
 question: "Which code correctly prints the names of all objects in the hq Model?",
 options: [
 "hq:GetParents()",
 "while hq do kill(hq) end",
 "for _, child in ipairs(hq:GetChildren()) do print(child.Name) end",
 "hq.PrimaryPart:Destroy()",
 ],
 correctAnswer: 2,
 explanation: "A for loop combined with GetChildren() can iterate through the items and print their names.",
 },
 {
 id: "q11",
 type: MC,
 question: "If only one column rotates when you use the Rotate tool, the likely cause is:",
 options: [
 "Terrain contains an error",
 "An individual Part is selected instead of the entire IslandHQ_v1 Model",
 "You need to use a LocalScript",
 "Too many Decal objects were added",
 ],
 correctAnswer: 1,
 explanation: "Always select the Model in Explorer before manipulating it.",
 },
 {
 id: "q12",
 type: MC,
 question: "Which topic is NOT part of this lesson?",
 options: [
 "Configuring PrimaryPart",
 "Using PascalCase names",
 "Auditing with GetChildren",
 "Building complex moving mechanisms",
 ],
 correctAnswer: 3,
 explanation: "Moving and static connections are not covered in this lesson.",
 },
 {
 id: "q13",
 type: MC,
 question: "Why should you use a standard Script instead of a LocalScript to audit IslandHQ_v1?",
 options: [
 "A LocalScript does not run in Workspace for Model auditing.",
 "A LocalScript should only be added to MagicCube",
 "LocalScript is obsolete and no longer exists in Roblox Studio",
 "LocalScript is very slow",
 ],
 correctAnswer: 0,
 explanation: "Use a standard Script because a LocalScript does not run in Workspace for Model auditing.",
 },
 {
 id: "q14",
 type: MC,
 question: "What is the recommended name for the saved level?",
 options: [
 "Untitled Experience",
 "Obby Kill Final",
 "Lesson 2.1 - IslandHQ_v1",
 "Module 9 Remotes",
 ],
 correctAnswer: 2,
 explanation: "Correct naming makes it easier to find artifacts for the final portfolio.",
 },
 {
 id: "q15",
 type: MC,
 question: "What are the requirements for the final Lesson 2.1 assignment?",
 options: [
 "A saved level with a grouped headquarters Model, configured PrimaryPart, and audit script",
 "A completely empty level",
 "A Model that contains only scripts and no Parts",
 "A standard Folder containing Parts",
 ],
 correctAnswer: 0,
 explanation: "The final assignment requires a correctly organized headquarters Model and script-based validation.",
 },
 ],
 },
}

export const enLesson22 = {
 lessonId: "lesson-roblox-2-2",
 moduleId: "module-02",
 order: 2,
 title: "2.2 - Park Entrance",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Build a ParkGate Model with supports, a door, and a bridge.",
 "Place Attachments and understand their role in creating connections.",
 "Connect static Parts with a WeldConstraint.",
 "Create a moving door with a HingeConstraint and a bridge with a RopeConstraint or RodConstraint.",
 "Test connection physics in Play mode and with a script.",
 ],
 theory: {
 sections: [
 {
 title: "Building the Park Entrance",
 content: `In the previous lesson, you created a static headquarters Model. In this lesson, you will use **Constraints**, or physical connections, to let Parts move relative to one another. Without them, a door is only a wall, and a suspension bridge will fall apart during the game.

**What to complete by the end of the lesson (artifact):**
- Create a \`ParkGate\` Model for the park gate.
- Build two supports, \`Post_L\` and \`Post_R\`.
- Add a \`GateDoor\` door panel with a **HingeConstraint**.
- Create a bridge or crossbar with a **RopeConstraint** or **RodConstraint**.
- Secure static Parts, such as the awning, with a **WeldConstraint**.
- Keep every Part in one Model with a **PrimaryPart**.
- Save the level as \`Lesson 2.2 - ParkGate\`.

Open the level you saved in the previous lesson (\`Lesson 2.1 - IslandHQ_v1\`). Build the gate as a separate Model. Do not combine it with the headquarters.`,
 },
 {
 title: "Physical Connections (Constraints)",
 content: `A **Constraint** is a physics rule that links two Parts. Instead of merging them rigidly into one shape, a Constraint allows them to interact in a specific way.

| Constraint | Behavior | Use in this lesson |
|------------|----------|----------|
| **WeldConstraint** | Rigid weld. | Attaches the awning to a support. |
| **HingeConstraint** | Hinge or pivot. | Rotates the door around an axis. |
| **RopeConstraint** | Flexible rope that can sag. | Suspends the bridge. |
| **RodConstraint** | Rigid rod with a fixed length. | Creates a crossbar between supports. |

Do not confuse Constraints with the Union tool from the first module. Union merges shapes, while a Constraint links their physics during the game.

**Do this now:** remember the main connection types: Weld = rigid connection, Hinge = door hinge, Rope = flexible rope.`,
 },
 {
 title: "Connection Points (Attachments)",
 content: `Connections are rarely attached directly to the center of a Part. They need **Attachments**, special invisible markers in 3D space, to work correctly.

**How to create a marker:**
1. Select a Part, such as \`Post_L\`.
2. Select Insert Object → **Attachment**.
3. Rename the marker immediately, for example \`HingeAtt_Post\`, to keep the names clear.
4. Use the **Move** tool to place the Attachment at the edge of the Part, where the hinge or rope connection should physically be located.

**Check:** select both connected Attachments at the same time. They should be close together on a shared axis. If one marker is on the ground and the other is high in the air, the connection will not work correctly.

**Do this now:** place two supports and a door panel without adding connections yet. Create one Attachment on the support and one on the door, aligned along the door hinge axis.`,
 },
 {
 title: "The ParkGate Frame (Without Physics)",
 content: `Build the basic gate Parts with standard blocks:

1. \`Post_L\` and \`Post_R\`, tall support posts. Set **Anchored = true** for both.
2. \`GateDoor\`, a thin door panel between the supports.
3. \`Awning\`, a cover above the entrance.
4. \`BridgePost_A\` and \`BridgePost_B\`, small posts for the future bridge.

Group all these Parts into the \`ParkGate\` Model. Set its **PrimaryPart**, preferably to one of the supports such as \`Post_L\`.

**Do this now:** build the frame, group it into a Model, set PrimaryPart, and confirm that the Part names use PascalCase. Check that the entire Model moves as one unit.`,
 },
 {
 title: "WeldConstraint - Attaching the Awning",
 content: `A **WeldConstraint** securely joins two Parts while keeping them as separate objects. This is useful when the Parts have different colors or materials.

1. Add a **WeldConstraint** to the gate Model, or directly to one of the Parts.
2. In Properties, find **Part0** and **Part1**.
3. Set Part0 = \`Post_L\` and Part1 = \`Awning\`.
4. Because this is a static section of the gate, both Parts should have **Anchored = true**. The Weld keeps their relative positions fixed.

**Do this now:** attach \`Awning\` to the support with a WeldConstraint. Start Play and confirm that the awning stays in place.`,
 },
 {
 title: "HingeConstraint - Moving Door",
 content: `Now configure the door hinge.

1. Confirm that \`Post_L\` has a \`HingeAtt_Post\` marker and \`GateDoor\` has a \`HingeAtt_Door\` marker. They must be aligned on the same rotation axis.
2. Add a **HingeConstraint** to the Model.
3. In Properties, set **Attachment0** and **Attachment1** to the corresponding markers.
4. **Physics settings:**
   - The support (\`Post_L\`) must have **Anchored = true** because it holds the structure.
   - The door (\`GateDoor\`) must have **Anchored = false**, or the hinge cannot rotate it.
   - Set **Massless = true** on the door to remove its mass and make rotation easier.
5. Keep CanCollide = true on the door so the character can push it.

**Do this now:** configure the door hinge. Start Play and push the door with your character. It should rotate freely around the support.`,
 },
 {
 title: "Rope or Rod - Bridge Between Supports",
 content: `Create a suspended element for a bridge or crossbar. Choose one option to complete the task.

**Option A - RopeConstraint**
- Create two Attachments on the bridge support posts.
- Add a **RopeConstraint** and connect the markers through Attachment0 and Attachment1.
- In Properties, configure **Length**. Set it slightly longer than the actual distance between the posts so the rope sags.

**Option B - RodConstraint**
- It works like Rope, but maintains a rigid, fixed distance. The rod does not sag or bend.

Both bridge supports must have **Anchored = true**.

**Do this now:** create a visible connection with Rope or Rod. In Play mode, confirm that the connection appears and stays in place.`,
 },
 {
 title: "Auditing Connections (Script)",
 content: `Add a script that automatically checks for connections in the Model. This helps you find errors quickly.

Create a Script named \`Gate_Audit\` inside the \`ParkGate\` Model:

\`\`\`lua
local gate = script.Parent
print("=== ParkGate Audit ===")
print("Model:", gate.Name, "| PrimaryPart:", gate.PrimaryPart and gate.PrimaryPart.Name or "MISSING")

local function auditConstraints(parent)
	for _, child in ipairs(parent:GetChildren()) do
		if child:IsA("WeldConstraint") then
			print("Found Weld:", child.Part0 and child.Part0.Name, "and", child.Part1 and child.Part1.Name)
		elseif child:IsA("HingeConstraint") then
			print("Found Hinge:", child.Attachment0 and child.Attachment0.Name, "and", child.Attachment1 and child.Attachment1.Name)
		elseif child:IsA("RopeConstraint") or child:IsA("RodConstraint") then
			print("Found suspension:", child.ClassName)
		end

		-- Recursive search inside Parts (Attachments often live in a Part)
		if child:IsA("BasePart") then
			auditConstraints(child)
		end
	end
end

auditConstraints(gate)
\`\`\`

The \`IsA("Class")\` method checks whether an object belongs to a specific type. It is a convenient tool for finding specific components.

**Do this now:** add this script to the gate Model. Start Play and check Output. The script should find Weld, Hinge, and Rope/Rod.`,
 },
 {
 title: "Play-test along the guest path",
 content: `Always test physics in Play mode by walking the path of a regular player.

1. Spawn on the island and walk up to the \`ParkGate\` Model.
2. Push the door with your character. Does it rotate on the hinge, or stay locked in place?
3. Look at the awning. Does it stay attached to the support after you push the door?
4. Does the rope (Rope) or rod (Rod) display correctly?

If the door is stuck, it may be rubbing against the ground. Raise the panel slightly or reduce its size. The gate should open easily.

**Do this now:** complete the guest-path playtest. Fix physics bugs if the door falls through or does not rotate.`,
 },
 {
 title: "Project Submission Requirements",
 content: `**ParkGate checklist:**
- [ ] The Model is named \`ParkGate\` with PrimaryPart configured.
- [ ] The awning is attached with a WeldConstraint.
- [ ] The door uses a HingeConstraint (door Unanchored, support Anchored).
- [ ] A bridge or crossbar is created with a RopeConstraint or RodConstraint.
- [ ] The \`Gate_Audit\` script successfully prints connection info to Output.
- [ ] The level is saved as: \`Lesson 2.2 - ParkGate\`.

| Level | Instructor assessment |
|--------|-------------------------------|
| **Not passed** | Connections are missing, or the door does not rotate (Anchored = true on the door). |
| **Passed** | Working Weld, Hinge, and Rope/Rod are present. The audit prints results. |
| **Good** | The Model is assembled neatly, Attachments are aligned, and the door does not catch on the ground. |
| **Excellent** | Massless is used for stability, the door moves smoothly, and small decoration is added. |`,
 },
 ],
 },
 practiceTask: {
 title: "Practice: Park Entrance (ParkGate)",
 difficulty: "beginner",
 description: `**Task:** Create a gate Model with working physical connections (Weld, Hinge, Rope/Rod).`,
 parts: [
  {
   title: "Part A: Frame and Weld",
   content: `1. Open a copy of the level from the previous lesson.
   2. Build the supports (\`Post_L\`, \`Post_R\`), the door (\`GateDoor\`), and the awning (\`Awning\`).
   3. Group everything into the \`ParkGate\` Model and set PrimaryPart.
   4. Use a WeldConstraint to attach the awning to one of the supports.`
  },
  {
   title: "Part B: Moving connections",
   content: `1. Create two Attachments for the door and add a HingeConstraint.
   2. Confirm that the door has \`Anchored = false\` and the supports have \`Anchored = true\`.
   3. Add a RopeConstraint or RodConstraint for a crossbar or bridge between the posts.
   4. Add the \`Gate_Audit\` script to check the connections.
   5. Start Play and test the door and bridge.`
  },
  {
   title: "Part C: Saving",
   content: `1. Fix any issues (if the door falls or does not rotate).
   2. Save the level through **File → Save to Roblox** as \`Lesson 2.2 - ParkGate\`.
   3. Mark the practice assignment as complete.`
  }
 ],
 hints: [
  "Attachments should sit on the hinge edge, not at the center of the Part.",
  "For a HingeConstraint, you must fill in the Attachment0 and Attachment1 fields.",
  "If the door is locked in place and does not rotate, check that Anchored is disabled on the door."
 ],
 optionalChallenge: "Add a second door panel (GateDoor_R) on the right support to make double doors. Compare Rope and Rod behavior on two different crossbars."
 },
 commonMistakes: [
 {
 mistake: "The door does not rotate",
 explanation: "The door panel is fixed in space, so the hinge cannot move it.",
 correctApproach: "Set Anchored = false on the door panel, but keep Anchored = true on the supports.",
 },
 {
 mistake: "Empty Attachment0/1 fields on the HingeConstraint",
 explanation: "The connection does not know which points to hold, so it does not work.",
 correctApproach: "Create Attachment markers on the support and door, then assign them in Properties for the HingeConstraint.",
 },
 {
 mistake: "WeldConstraint does not hold the Parts",
 explanation: "The Part0 or Part1 properties are empty.",
 correctApproach: "You must specify the two Parts to join (for example, the support and the awning).",
 },
 {
 mistake: "The gate is grouped with the headquarters Model",
 explanation: "This breaks the object hierarchy. The headquarters and the gate are separate Models.",
 correctApproach: "Use Ungroup, then group the gate Parts into a separate ParkGate Model.",
 },
 {
 mistake: "PrimaryPart is not set for the gate Model",
 explanation: "The Model will move and rotate incorrectly with the tools.",
 correctApproach: "Set one of the supports as PrimaryPart for ParkGate.",
 },
 ],
 summary:
 "In this lesson, you learned to create physical connections with Constraints and Attachments. You configured a rigid attachment with WeldConstraint, made a moving door with HingeConstraint, and added a suspension bridge with RopeConstraint. Objects in the game can now interact physically.",
 quiz: {
 title: "Quiz 2.2 - Park Entrance",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the main artifact of Lesson 2.2?",
 options: [
 "The ParkGate Model with Weld, Hinge, and Rope/Rod",
 "The headquarters Model without connections",
 "A DataStore data-saving system",
 "An obstacle course with kill blocks",
 ],
 correctAnswer: 0,
 explanation: "The main lesson task is to create a gate with working physical connections.",
 },
 {
 id: "q2",
 type: MC,
 question: "What is an Attachment object for?",
 options: [
 "To change the door material",
 "To replace PrimaryPart",
 "It is an attachment-point marker that a Constraint holds onto",
 "To enable water display",
 ],
 correctAnswer: 2,
 explanation: "Attachments act as invisible nails for positioning physical connections.",
 },
 {
 id: "q3",
 type: MC,
 question: "Which Constraint rigidly joins the awning and the support?",
 options: [
 "HingeConstraint",
 "WeldConstraint",
 "RopeConstraint",
 "RodConstraint",
 ],
 correctAnswer: 1,
 explanation: "WeldConstraint locks two Parts together with no relative movement.",
 },
 {
 id: "q4",
 type: MC,
 question: "What must you do so the door rotates on the hinge?",
 options: [
 "Set Anchored = true on the door panel",
 "Disable CanCollide",
 "Add a water texture",
 "Set Anchored = false on the door panel",
 ],
 correctAnswer: 3,
 explanation: "If the door panel has Anchored = true, it is fixed and the hinge cannot rotate it.",
 },
 {
 id: "q5",
 type: MC,
 question: "In this assignment, the gate supports must have:",
 options: [
 "Anchored = true",
 "Anchored = false and Massless = true",
 "Collision only, with no anchoring",
 "LocalScript",
 ],
 correctAnswer: 0,
 explanation: "The supports hold the whole structure, so they must be firmly fixed in space.",
 },
 {
 id: "q6",
 type: MC,
 question: "What is the difference between RopeConstraint and RodConstraint?",
 options: [
 "RopeConstraint always deletes Attachments",
 "RopeConstraint works only at night",
 "RopeConstraint acts like a flexible rope, and RodConstraint acts like a rigid rod",
 "They are completely identical",
 ],
 correctAnswer: 2,
 explanation: "A rope (Rope) can sag, while a rod (Rod) keeps an exact distance.",
 },
 {
 id: "q7",
 type: MC,
 question: "How does WeldConstraint differ from the Union tool?",
 options: [
 "They are the same thing",
 "Union merges shapes into one mesh, while Weld links the physics of separate Parts",
 "Weld cuts holes in walls",
 "Union works only underwater",
 ],
 correctAnswer: 1,
 explanation: "Union changes an object's geometry, while WeldConstraint joins separate Parts without changing their shape.",
 },
 {
 id: "q8",
 type: MC,
 question: "What happens if Attachment0 and Attachment1 on a HingeConstraint stay empty?",
 options: [
 "The door will rotate perfectly",
 "A new level is created automatically",
 "Ready-made gates appear from the Toolbox",
 "The hinge will not work, and the door may fall off",
 ],
 correctAnswer: 3,
 explanation: "Without specified attachment points, the connection does not function.",
 },
 {
 id: "q9",
 type: MC,
 question: "How does the Massless property help the door panel?",
 options: [
 "It is forbidden for moving Parts",
 "It fully replaces HingeConstraint",
 "It removes mass from the Part, making rotation easier and more stable",
 "It generates terrain around the door",
 ],
 correctAnswer: 2,
 explanation: "Removing mass from the moving panel reduces load on the hinge.",
 },
 {
 id: "q10",
 type: MC,
 question: "What does the Gate_Audit script do?",
 options: [
 "Prints information about existing physical connections to the Output panel",
 "Opens the door on a schedule",
 "Reduces the player's health",
 "Publishes the level on the platform",
 ],
 correctAnswer: 0,
 explanation: "This script is a diagnostic tool for checking that the Model is assembled correctly.",
 },
 {
 id: "q11",
 type: MC,
 question: "What does child:IsA(\"HingeConstraint\") check in the script?",
 options: [
 "Whether the Part is painted red",
 "Whether the object belongs to the HingeConstraint class",
 "Whether the player is near the gate",
 "Whether there is water on the level",
 ],
 correctAnswer: 1,
 explanation: "The IsA method checks an object's type (class) in the hierarchy.",
 },
 {
 id: "q12",
 type: MC,
 question: "Which of these was NOT used in the current lesson?",
 options: [
 "WeldConstraint",
 "HingeConstraint",
 "Creating databases (DataStore)",
 "RodConstraint",
 ],
 correctAnswer: 2,
 explanation: "Data saving is not part of this lesson on physical connections.",
 },
 {
 id: "q13",
 type: MC,
 question: "If the door falls through the ground after you start the game, what is the most likely cause?",
 options: [
 "The panel has Anchored = true",
 "Attachments are placed incorrectly, or the base is not anchored",
 "The audit script is missing",
 "Massless is disabled",
 ],
 correctAnswer: 1,
 explanation: "Incorrect marker placement or an unanchored support (Anchored = false) breaks connection physics.",
},
 {
 id: "q14",
 type: MC,
 question: "If using the Move tool on the gate moves only one support, it means:",
 options: [
 "An individual Part is selected in Explorer instead of the whole ParkGate Model",
 "The Output panel is not working",
 "You need to use a LocalScript",
 "The time of day is configured incorrectly",
 ],
 correctAnswer: 0,
 explanation: "To manipulate the whole structure, you must select the Model itself.",
 },
{
id: "q15",
type: MC,
question: "What are the requirements for the final Lesson 2.2 assignment?",
options: [
"A script that builds the Model automatically",
"A completely empty level",
"A saved level with a ParkGate Model and Parts attached with Constraints",
"A Folder with Parts scattered randomly",
],
correctAnswer: 2,
explanation: "The final assignment requires ParkGate with Constraints in use",
},
 ],
 },
}

export const enLesson23 = {
 lessonId: "lesson-roblox-2-3",
 moduleId: "module-02",
 order: 3,
 title: "2.3 - Attractions + collisions",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Create a ParkRides_v1 attraction zone next to the gate Model.",
 "Configure physical connections: SpringConstraint, PrismaticConstraint, and BallSocketConstraint.",
 "Configure CanTouch and CanQuery properties for attraction Parts.",
 "Apply collision separation (Collision Groups) or disable CanCollide for decoration.",
 "Test the attractions in Play mode and verify them with an audit script.",
 ],
 theory: {
 sections: [
 {
 title: "Creating the attraction zone",
 content: `Behind the \`ParkGate\`, you will build a moving park zone. The main lesson artifact is the \`ParkRides_v1\` Model, which will contain at least three simple attractions that use different physical connections (Constraints).

In the previous lesson, you learned to create doors and bridges. Today you will add new connections to make a spring, a lift, and a pendulum. Because this is a construction module, game logic (for example, dealing damage or collecting coins) is not used today. You work with physics only.

**What to complete by the end of the lesson (artifact):**
- Create a separate \`ParkRides_v1\` Model behind the gate.
- Add an attraction based on **SpringConstraint** (a swing or trampoline).
- Add an attraction based on **PrismaticConstraint** (a lift or rail platform).
- Add an attraction based on **BallSocketConstraint** (a pendulum or hanging structure).
- Configure **CanTouch** and **CanQuery** on key Parts.
- Configure collisions (with Collision Groups or by disabling CanCollide on decoration).
- Add a \`Rides_Audit\` script to check the connections.
- Save the level as: \`Lesson 2.3 - ParkRides_v1\`.

Open your saved level from the previous lesson (\`Lesson 2.2 - ParkGate\`). Keep the gate as the entrance and build the attraction zone behind it.`,
 },
 {
 title: "New physical connections",
 content: `Review three new connection types.

| Constraint | Motion principle | Use in this lesson |
|------------|-----|---------------------------|
| **SpringConstraint** | Acts like a spring: stretches and compresses toward a set length. | Trampoline, spring platform. |
| **PrismaticConstraint** | Allows motion (sliding) along one axis only. | Lift, cart on a straight rail. |
| **BallSocketConstraint** | Ball joint. Allows free swinging in all directions. | Pendulum, hanging lantern. |

Do not try to apply every connection to one Part. To complete the task, create three separate attraction stations, each demonstrating one type of motion.

**Do this now:** write a short plan for your three attractions and name them in PascalCase (for example, \`Ride_Spring\`, \`Ride_Lift\`, \`Ride_Pendulum\`).`,
 },
 {
 title: "ParkRides_v1 frame",
 content: `1. Behind the \`ParkGate\`, clear a plaza area (flatten the terrain or place a \`RidesPlaza\` Part).
2. Build the base blocks for three stations.
3. Group everything into the \`ParkRides_v1\` Model and set **PrimaryPart** (for example, on \`RidesPlaza\` or the base of the first station).
4. Confirm that this Model is separate and is not mixed with \`ParkGate\` or the headquarters.

Until you configure Constraints, all support Parts should have \`Anchored = true\`. You can temporarily anchor moving platforms so it is easier to align the markers (Attachments).

**Do this now:** assemble the frame for three stations, group them into \`ParkRides_v1\`, and verify that the whole Model moves with the Move tool.`,
 },
 {
 title: "SpringConstraint - spring station",
 content: `**Goal:** create a \`SpringPad\` platform that springs relative to a fixed \`SpringBase\`.

1. \`SpringBase\` is the attraction base (must be **Anchored = true**).
2. \`SpringPad\` is the moving platform (must be **Anchored = false**, CanCollide = true). You can enable Massless for a lighter response or disable it for a sense of weight.
3. Create one Attachment on the base and one on the platform. Place them one above the other vertically.
4. Add a **SpringConstraint** and connect Attachment0 and Attachment1 with it.
5. In Properties, configure the spring parameters:
   - **FreeLength** (rest length) - the distance the platform holds with no load.
   - **Stiffness** - the higher the value, the stronger the spring pushes back.
   - **Damping** - slows oscillation. Without it, the platform vibrates endlessly.

**Important:** do not use a WeldConstraint between the base and the platform, or the spring will not work.

**Do this now:** configure SpringPad, start Play, and try jumping on the platform. Adjust Stiffness and Damping so jumps are stable and do not launch the player into the sky.`,
 },
 {
 title: "PrismaticConstraint - lift along an axis",
 content: `**PrismaticConstraint** limits a Part's motion to a single axis. It is an ideal tool for building lifts.

1. Build a support or rail \`LiftRail\` (**Anchored = true**).
2. Create the lift platform \`LiftPlatform\` (**Anchored = false**, CanCollide = true).
3. Add Attachments on the rail and platform. Align them so their axes point along the motion direction (usually up along the Y axis).
4. Connect them with a **PrismaticConstraint**.
5. Find the **ActuatorType** property in the PrismaticConstraint settings. Set it to **None** so the platform moves only under character weight or physical collisions. You will not write complex lift-control scripts today.

If the platform gets yanked or spins, the Attachment axes are not aligned.

**Do this now:** configure a lift or rail platform. In Play mode, confirm that the platform slides freely along one axis.`,
 },
 {
 title: "BallSocketConstraint - pendulum",
 content: `**BallSocketConstraint** lets a Part swing freely, like a weight on a chain or a ball in a socket.

1. Create a hook or beam \`PendulumAnchor\` (**Anchored = true**).
2. Create a weight \`PendulumBob\` (**Anchored = false**).
3. Add Attachments on the hook and on the top of the weight. At the start, they should be as close together as possible.
4. Add a **BallSocketConstraint** and assign the markers (Attachment0/1).
5. (Optional) Enable **LimitsEnabled** so the pendulum does not complete a full circle and collide with other park buildings.

**Do this now:** configure the pendulum. In Play mode, push the weight with your character and confirm that it swings smoothly while the support stays in place.`,
 },
 {
 title: "CanTouch and CanQuery",
 content: `Besides the familiar **CanCollide** property (physical barrier), there are two more important parameters:

| Property | What it controls | Practical use |
|----------|------------------|----------------------|
| **CanCollide** | Physical wall. Whether the character can stand on the Part or bump into it. | Enabled (true) for floors and lift platforms. |
| **CanTouch** | Whether the Part generates touch events (Touched). | Disable (false) for decorative Parts to reduce load, since you are not using touch events. |
| **CanQuery** | Whether the Part responds to spatial queries (for example, rays). | Disable (false) on pure decoration (neon strips, thin frames). |

Today you will not write interaction logic (for example, death scripts or item collection). Still, it is important to learn to manage these properties deliberately for level optimization.

**Do this now:** select 2-3 decorative Parts on your attractions (for example, thin frames or neon strips) and disable CanTouch and CanQuery on them. Do not change platforms the player stands on.`,
 },
 {
 title: "Collision separation (Collision Groups)",
 content: `Sometimes moving attraction Parts catch on decoration or each other, which leads to unstable physics (jitter). To avoid this, use **Collision Groups** - groups of objects between which physical collision is disabled.

**How to configure (basic method):**
1. Open the Collision Groups editor (Model tab → Collision Groups).
2. Create a new group, for example \`RidesDecor\`.
3. Select the attraction's decorative Parts and assign them to this group.
4. In the collision matrix, clear the checkbox at the intersection of \`RidesDecor\` and \`Default\` (or the player group).

**Alternative method (if the editor is unavailable):**
Simply disable **CanCollide** on decorative Parts. This is the simplest way to ensure a moving lift platform does not get stuck on a random decorative cube.

**Do this now:** apply either Collision Groups or CanCollide disabled for small decoration near moving platforms to avoid sticking.`,
 },
 {
 title: "Attraction audit (Script)",
 content: `Write a script that automatically counts different connection types. Create a \`Rides_Audit\` script inside the \`ParkRides_v1\` Model:

\`\`\`lua
local rides = script.Parent
print("=== ParkRides Audit ===")
print("PrimaryPart:", rides.PrimaryPart and rides.PrimaryPart.Name or "MISSING")

local countSpring = 0
local countPrismatic = 0
local countBallSocket = 0

local function scan(parent)
	for _, child in ipairs(parent:GetChildren()) do
		if child:IsA("SpringConstraint") then
			countSpring = countSpring + 1
			print("Found Spring:", child.Name)
		elseif child:IsA("PrismaticConstraint") then
			countPrismatic = countPrismatic + 1
			print("Found Prismatic:", child.Name)
		elseif child:IsA("BallSocketConstraint") then
			countBallSocket = countBallSocket + 1
			print("Found BallSocket:", child.Name)
		end

		if child:IsA("BasePart") then
			print(child.Name, "CanCollide:", child.CanCollide, "CanTouch:", child.CanTouch)
		end

		scan(child) -- Recursive search
	end
end

scan(rides)
print("Total found → Spring:", countSpring, "| Prismatic:", countPrismatic, "| BallSocket:", countBallSocket)

if countSpring < 1 or countPrismatic < 1 or countBallSocket < 1 then
	print("Warning: the Model is missing one of the required connections!")
end
\`\`\`

This code recursively checks all nested objects and prints the total number of connections.

**Do this now:** add the script, start Play, and check whether Output shows a warning about missing connections.`,
 },
 {
 title: "Project Submission Requirements",
 content: `Walk the player path from the entrance to each attraction. Confirm that the character does not get stuck and that physics feels smooth and predictable.

**ParkRides_v1 checklist:**
- [ ] Attractions are grouped in a separate \`ParkRides_v1\` Model (not mixed with the gate).
- [ ] PrimaryPart is set for the Model.
- [ ] There is at least one SpringConstraint, PrismaticConstraint, and BallSocketConstraint.
- [ ] Support Parts have Anchored = true, and moving Parts have Anchored = false.
- [ ] CanTouch/CanQuery are deliberately disabled for small decoration.
- [ ] The \`Rides_Audit\` script prints results without errors.
- [ ] The level is saved as: \`Lesson 2.3 - ParkRides_v1\`.

| Level | Instructor assessment |
|--------|-------------------------------|
| **Not passed** | New connections are missing, or moving Parts have Anchored = true. |
| **Passed** | All three connection types are present (spring, lift, pendulum). The audit works. |
| **Good** | Attractions feel smooth, the player does not fall through, and collision settings are applied to decoration. |
| **Excellent** | Neat station design, well-balanced Stiffness/Damping on the spring, and an organized Explorer. |`,
 },
 ],
 },
 practiceTask: {
 title: "Practice: Attraction Zone (ParkRides)",
 difficulty: "beginner",
 description: `**Task:** Create a park zone with three different attractions using Spring, Prismatic, and BallSocket connections.

### Part A: Base and Spring
1. Open a copy of the level from the previous lesson.
2. Create a plaza behind the gate and build the base for the spring attraction. Group them into \`ParkRides_v1\`.
3. Add a moving platform (Anchored = false) and connect it to the base with a SpringConstraint.
4. Start Play, then adjust stiffness (Stiffness) and damping (Damping).

### Part B: Lift and Pendulum
1. Inside the \`ParkRides_v1\` Model, add a lift station (use PrismaticConstraint on a rail).
2. Create a pendulum (a weight hung from a hook with BallSocketConstraint).
3. Disable CanTouch and CanQuery on several decorative Parts on these stations.
4. Confirm that decoration does not block platform motion (disable CanCollide on decoration).

### Part C: Audit and Save
1. Add the \`Rides_Audit\` script to the Model and confirm that it counts all three connections.
2. Test the guest path through all three attractions.
3. Save the level through **File → Save to Roblox** as \`Lesson 2.3 - ParkRides_v1\`.
4. Mark the practice assignment as complete in the system.`,
 hints: [
 "Attachments for the lift (Prismatic) must sit strictly on one axis, or the platform will be yanked.",
 "Do not use a WeldConstraint between the base and the moving platform.",
 "If the spring launches the player into the sky, reduce Stiffness significantly and increase Damping.",
 ],
 optionalChallenge: "Enable LimitsEnabled for the pendulum and set the angle so it does not hit neighboring buildings. Compare limited pendulum behavior with a free one."
 },
 commonMistakes: [
 {
 mistake: "Using WeldConstraint between the base and the spring platform",
 explanation: "Weld rigidly joins Parts. The spring cannot move the platform if it is welded.",
 correctApproach: "Use only SpringConstraint between the base (Anchored) and the platform (Unanchored).",
 },
 {
 mistake: "The lift platform is yanked or twisted sideways",
 explanation: "The Attachment axes do not match. PrismaticConstraint requires perfect axis alignment.",
 correctApproach: "Select both Attachments and confirm that their local axes point in the same direction along the rail.",
 },
 {
 mistake: "All attractions are grouped inside the ParkGate Model",
 explanation: "The gate and the attraction zone are different logical entities.",
 correctApproach: "Create a separate ParkRides_v1 Model and place all attractions in it.",
 },
 {
 mistake: "A high Stiffness value launches the player into space",
 explanation: "Disproportionate spring stiffness causes extreme physics-engine reactions.",
 correctApproach: "Reduce Stiffness and always add Damping to stabilize oscillation.",
 },
 {
 mistake: "Trying to write Touched or kill-block logic",
 explanation: "This lesson focuses only on physical properties. Scripted game logic comes later.",
 correctApproach: "Do not add Touched event handlers; just configure the correct Constraints.",
 },
 {
 mistake: "Ignoring CanTouch and CanQuery settings",
 explanation: "To optimize the game world, it is important to know how to disable unnecessary collision calculations.",
 correctApproach: "Deliberately disable these properties on thin decorative elements.",
 },
 ],
 summary:
 "In this lesson, you expanded your physics skills by building an attraction zone with new connections: SpringConstraint, PrismaticConstraint, and BallSocketConstraint. You learned to manage CanTouch and CanQuery for optimization and configured a script to diagnose physical objects.",
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the main artifact of Lesson 2.3?",
 options: [
 "A data-saving script",
 "The headquarters Model without connections",
 "The ParkRides_v1 Model with a spring, lift, and pendulum",
 "Only the ParkGate",
 ],
 correctAnswer: 2,
 explanation: "The main lesson task is to build an attraction zone using new physical connections.",
 },
 {
 id: "q2",
 type: MC,
 question: "How does SpringConstraint work?",
 options: [
 "It rigidly locks Parts with no movement",
 "It acts like a spring with stiffness and damping parameters",
 "It allows rotation around one axis only",
 "It changes object materials",
 ],
 correctAnswer: 1,
 explanation: "SpringConstraint stretches and compresses, trying to return to its rest length.",
 },
 {
 id: "q3",
 type: MC,
 question: "What motion limit does PrismaticConstraint create?",
 options: [
 "It allows sliding along one straight axis only",
 "It allows 360-degree rotation in all planes",
 "It allows a Part to increase in size",
 "It only allows color changes",
 ],
 correctAnswer: 0,
 explanation: "This connection type is used for lifts or rail carts, where motion is possible only in a straight line.",
 },
 {
 id: "q4",
 type: MC,
 question: "What is the main difference between BallSocketConstraint and HingeConstraint?",
 options: [
 "It does not need Attachments to work",
 "It works only with water",
 "It generates new terrain",
 "It acts like a ball joint, allowing free swinging in different directions, not only on one axis",
 ],
 correctAnswer: 3,
 explanation: "BallSocket lets objects swing like a pendulum in a cone.",
 },
 {
 id: "q5",
 type: MC,
 question: "What does the CanCollide property control?",
 options: [
 "Whether the Part is a solid physical barrier (whether you can stand on it)",
 "Enables script execution",
 "Publishes the game on the server",
 "Changes lighting on the level",
 ],
 correctAnswer: 0,
 explanation: "CanCollide determines whether other objects can pass through this Part.",
 },
 {
 id: "q6",
 type: MC,
 question: "How do we use the CanTouch property in this lesson?",
 options: [
 "We must write game Touched logic (kill blocks)",
 "We remove it through a script",
 "We deliberately disable it on decorative Parts to reduce load",
 "We apply it only to the Terrain object",
 ],
 correctAnswer: 2,
 explanation: "Because touch events are not handled today, extra collision checks for decoration are better disabled.",
 },
 {
 id: "q7",
 type: MC,
 question: "What is the main purpose of Collision Groups?",
 options: [
 "To save data in the cloud",
 "To flexibly configure which object groups can collide with each other",
 "To replace the Union tool",
 "To create LocalScripts",
 ],
 correctAnswer: 1,
 explanation: "Collision groups let you, for example, prevent a moving platform from colliding with decorative elements.",
 },
 {
 id: "q8",
 type: MC,
 question: "What happens if you apply a WeldConstraint between the moving SpringPad and the base?",
 options: [
 "The spring will work faster",
 "The platform will start rotating",
 "The gate door will break",
 "The spring will stop working because the Parts are rigidly welded",
 ],
 correctAnswer: 3,
 explanation: "Weld fixes Parts relative to each other, blocking any motion the spring should provide.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which code line correctly counts SpringConstraint in the audit?",
 options: [
 "if child:IsA(\"SpringConstraint\") then countSpring = countSpring + 1 end",
 "while true do child:Destroy() end",
 "game:GetService(\"DataStoreService\")",
 "Terrain:Clear()",
 ],
 correctAnswer: 0,
 explanation: "The IsA method checks the object class, then the counter increases by one.",
 },
 {
 id: "q10",
 type: MC,
 question: "What is the most logical place for the ParkRides_v1 Model?",
 options: [
 "Inside the Lighting object",
 "In the ServerStorage Folder",
 "On a separate plaza behind the ParkGate",
 "Under the Terrain",
 ],
 correctAnswer: 2,
 explanation: "Attractions form the inner park zone that the player enters after passing through the gate.",
 },
 {
 id: "q11",
 type: MC,
 question: "Which of the listed topics is NOT part of Lesson 2.3?",
 options: [
 "PrismaticConstraint",
 "Checking scripts in ready-made Toolbox models (Toolbox hygiene)",
 "The CanQuery property",
 "BallSocketConstraint",
 ],
 correctAnswer: 1,
 explanation: "Toolbox model hygiene is a topic for other lessons.",
 },
 {
 id: "q12",
 type: MC,
 question: "What side effect occurs when Stiffness on a spring is too high?",
 options: [
 "Texture resolution increases",
 "Automatic saving occurs",
 "Fog is disabled",
 "The platform reacts with sharp jerks and can throw the player high upward",
 ],
 correctAnswer: 3,
 explanation: "Excessive stiffness creates too strong a push-back impulse.",
 },
 {
 id: "q13",
 type: MC,
 question: "Which connection was used for the gate door in the previous lesson and should stay unchanged?",
 options: [
 "HingeConstraint",
 "BallSocketConstraint",
 "SpringConstraint",
 "PrismaticConstraint",
 ],
 correctAnswer: 0,
 explanation: "The gate door rotates around one axis, so HingeConstraint is the ideal solution.",
 },
 {
 id: "q14",
 type: MC,
 question: "Which Constraint type is better for building a bridge?",
 options: [
 "Spring Constraint",
 "RopeConstraint or RodConstraint",
 "WeldConstraint",
 "Script Constraint",
 ],
 correctAnswer: 1,
 explanation: "The next step is a final review and polish of the whole park.",
},
{
id: "q15",
type: MC,
question: "What are the requirements for the final Lesson 2.3 assignment?",
options: [
"Any script",
"An empty project",
"Presence of the ParkRides_v1 Model with attractions",
"Disabled sounds",
],
correctAnswer: 2,
explanation: "The final assignment requires the ParkRides_v1 Model with attractions",
},
 ],
 },
}

export const enLesson24 = {
 lessonId: "lesson-roblox-2-4",
 moduleId: "module-02",
 order: 4,
 title: "2.4 - Park submission",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Combine the headquarters, gate, and attractions into one Park_v1 location.",
 "Use the Toolbox safely and check models for third-party scripts.",
 "Understand the difference between MeshPart and Decal and apply them appropriately.",
 "Run a final playtest of the finished park along the player path.",
 "Prepare and save the project for submission without third-party game mechanics.",
 ],
 theory: {
 sections: [
 {
 title: "Preparing the final park",
 content: `This lesson is a **checkpoint** for the whole module. You do not create new physical connections. You polish what you built in previous lessons (2.1-2.3). You will also learn to work safely with Toolbox models and tidy the Explorer panel for the final review.

Today's question is one: **does your location look like a complete park you can show in two minutes?** If not, do not add new attractions. First clear the clutter, check that the door works, and remove third-party scripts.

**Main artifact:** The \`Park_v1\` level - an island with a house, headquarters, gate, and attraction zone, with a tidy Explorer and verified physics.

**What should already be on your level:**
| Lesson | Objects in Explorer |
|------|----------------|
| **2.1** | \`IslandHQ_v1\` Model with PrimaryPart and audit. |
| **2.2** | \`ParkGate\` Model with configured Weld, Hinge, Rope/Rod. |
| **2.3** | \`ParkRides_v1\` Model with working Spring, Prismatic, BallSocket. |

Open your most complete level after Lesson 2.3. If any Part is missing, restore it with tools you already know. Do not replace a missing lift with a ready-made carousel from the internet.`,
 },
 {
 title: "Park_v1 assessment rubric",
 content: `The instructor will assess the project by these criteria:

**Structure**
- [ ] Separate Models for each zone: headquarters, gate, attractions. They are not mixed into one pile.
- [ ] PrimaryPart is set on key Models.
- [ ] PascalCase is used for object names.

**Physics and motion**
- [ ] Hinged doors (Hinge) open freely.
- [ ] Static gate Parts are securely attached (Weld).
- [ ] A suspension bridge is present (Rope or Rod).
- [ ] The attraction zone has a spring (Spring), lift (Prismatic), and pendulum (BallSocket).
- [ ] All Parts stay together when you start Play.

**Order and safety**
- [ ] Toolbox models are checked, and third-party scripts are removed.
- [ ] The Output panel has no third-party spam or red errors.
- [ ] The project is saved under a clear name (\`Module 2 - Park_v1\`).

**Do this now:** walk through this list and assess your level. Fix issues only with tools covered earlier.`,
 },
 {
 title: "Safe Toolbox use",
 content: `**Toolbox** is a library of ready-made models (trees, benches, lamps). It is convenient for decoration, but **third-party scripts** often come with them into your level. They can spam Output, break the game, or create performance problems.

**Rules for working with Toolbox:**
1. Choose models with a clear name and a reasonable preview. Avoid models with names like "FREE ADMIN".
2. Insert the model **first** into a separate \`Toolbox_Inbox\` Folder, not directly into the center of your park.
3. Expand the model in Explorer and check for **Script**, **LocalScript**, or **ModuleScript** objects.
4. If the code is unclear to you (and a tree or bench does not need it at all), **delete every script**, leaving only the 3D model itself (Parts, MeshPart, Decal).
5. For park submission, use **no more than two** neat Toolbox decorations.

Toolbox does not replace your own Models. You should build the gate and attractions yourself.

**Do this now:** find one calm decoration in Toolbox (for example, a bush or bench). Place it in the \`Toolbox_Inbox\` Folder, but do not add it to the park yet.`,
 },
 {
 title: "Auditing scripts in Toolbox models",
 content: `To confirm that a third-party model is safe, run an automatic check. Create a temporary Script and place it next to the \`Toolbox_Inbox\` Folder:

\`\`\`lua
local inbox = workspace:FindFirstChild("Toolbox_Inbox")
if not inbox then
	print("Toolbox_Inbox Folder not found. Create it and place Toolbox models there.")
	return
end

print("=== Toolbox Script Audit ===")
local function scan(parent)
	for _, child in ipairs(parent:GetChildren()) do
		if child:IsA("Script") or child:IsA("LocalScript") or child:IsA("ModuleScript") then
			print("FOUND SCRIPT:", child.ClassName, "| Path:", child:GetFullName())
		end
		scan(child)
	end
end

scan(inbox)
\`\`\`

If the script finds third-party code in an imported model, expand it in Explorer and simply delete those scripts. Decorations should consist only of geometric shapes and textures.

**Do this now:** add this check, start Play, and review Output. If third-party scripts are found, delete them, then move the clean decoration into your park. You can delete the temporary audit script afterward.`,
 },
 {
 title: "MeshPart versus Decal",
 content: `To improve the park's look, use two different approaches:

| Tool | What it is | Where it is appropriate |
|------------|-----------------|--------------|
| **Decal** or **Texture** | An image applied to a flat face of an object. | Signs, posters, logos on gate awnings. |
| **MeshPart** | A Part with a complex 3D shape made in external software. | Complex sculptures, shaped fences, or Toolbox trees. |

**Important:** do not replace your own gates or attractions with whole MeshParts from the internet. That defeats the learning goal, because Constraints (physical connections) would no longer be needed. Use Decal for lettering and MeshPart for decoration around your buildings.

**Do this now:** add an image (Decal) to the gate awning or a headquarters sign. This is a quick way to make a building unique.`,
 },
 {
 title: "Organizing space in Explorer",
 content: `Before final submission, Explorer should be structured. Avoid clutter at the Workspace root.

Recommended structure:

\`\`\`text
Workspace/
├── House_01
├── IslandHQ_v1
├── ParkGate
├── ParkRides_v1
├── Interactives          (Move cubes or buttons here)
├── Decor                 (Move clean Toolbox models here)
└── Sounds
Terrain
Lighting
\`\`\`

Confirm that all validation scripts (\`HQ_Audit\`, \`Gate_Audit\`, \`Rides_Audit\`) sit strictly inside their Models. After cleanup, the \`Toolbox_Inbox\` Folder should be empty or deleted.

**Do this now:** check the object hierarchy. Delete spare test cubes, duplicates (for example, \`ParkGate (2)\`), and structure everything into Folders.`,
 },
 {
 title: "Final Playtest along the player path",
 content: `A required step before submission is to walk the park as a regular player.

1. Spawn near the house or headquarters. Is it clear where to go next?
2. Approach the headquarters. Does it look like a complete building?
3. Walk through \`ParkGate\`. Push the door. Does it open smoothly? Do the awning and bridge stay in place?
4. Walk the \`ParkRides_v1\` zone. Check the spring, lift, and pendulum. The player should not get stuck in textures or fly off the map.
5. Check the Output panel. It should contain only your audit reports, with no red text or third-party spam.

If something breaks, return to checking Anchored, Attachments, or spring parameters.

**Do this now:** walk the full path (about 60 seconds). Note 1-2 issues and fix only those, without rebuilding the whole park.`,
 },
 {
 title: "Automatic park check (Script check)",
 content: `To confirm that you did not accidentally Ungroup important Models while cleaning Explorer, create a temporary \`Park_v1_Audit\` script in Workspace:

 \`\`\`lua
local function checkModel(modelName)
	local m = workspace:FindFirstChild(modelName)
	if m and m:IsA("Model") then
		print("OK:", modelName, "| PrimaryPart:", m.PrimaryPart and m.PrimaryPart.Name or "MISSING")
		return true
	end
	print("ERROR: Model not found named", modelName)
	return false
end

print("=== Park_v1 Artifact Presence Check ===")
checkModel("IslandHQ_v1")
checkModel("ParkGate")
checkModel("ParkRides_v1")
\`\`\`

This script gives a clear answer: whether all three main Models exist. If you see "ERROR", find where the Model went (it may have been renamed or accidentally ungrouped).

**Do this now:** run this script. If all three Models show "OK", your park is assembled correctly.`,
 },
 {
 title: "Saving and presentation",
 content: `After every Model is checked and third-party scripts are removed:

1. Save through **File → Save to Roblox** (or Save As).
2. Name the project: \`Module 2 - Park_v1\`.
3. Confirm that you are saving the version with all three locations (headquarters, gate, attractions), not an old copy.
4. **Prepare to present:** be ready to show the park in one minute. Walk a partner from headquarters to the attractions, show how the door opens and how the spring works.

Do not rely on Autosave alone. A portfolio always needs a clearly named file.`,
 },
 ],
 },
 practiceTask: {
 title: "Practice: Submitting Park_v1",
 difficulty: "beginner",
 description: `**Task:** Combine the module results, audit Toolbox models, and prepare the park for submission.`,
 parts: [
  {
   title: "Part A: Rubric and hygiene",
   content: `1. Open the most complete level after Lesson 2.3.
   2. Check the \`IslandHQ_v1\`, \`ParkGate\`, and \`ParkRides_v1\` Models for PrimaryPart.
   3. Find 1-2 decorations in Toolbox and place them in the \`Toolbox_Inbox\` Folder.
   4. Create an audit script for \`Toolbox_Inbox\`, find and delete all third-party scripts from imported models.`
  },
  {
   title: "Part B: Explorer and Playtest",
   content: `1. Tidy Explorer: put decorations in the \`Decor\` Folder and interactive cubes in \`Interactives\`.
   2. Delete the \`Toolbox_Inbox\` Folder and spare test Parts.
   3. Start the game in Play mode and walk from headquarters to the attractions (check the door and lift).
   4. Add the \`Park_v1_Audit\` script to Workspace and verify that the three main Models are present.`
  },
  {
   title: "Part C: Saving and demo",
   content: `1. If everything works correctly, save the level through **File → Save to Roblox** as \`Module 2 - Park_v1\`.
   2. Prepare to show a short 60-second guest path through your park.
   3. Mark the practice assignment as complete.`
  }
 ],
 hints: [
  "Third-party scripts in Toolbox decorations often cause errors. Always delete them before adding a model to the level.",
  "If the gate door broke, confirm that the panel has Anchored = false.",
  "A Decal is applied to one face, while a MeshPart changes the Part's shape itself."
 ],
 optionalChallenge: "Remove all decoration from the level, leaving only mechanisms you built yourself (headquarters, gate, three attractions). Confirm that the park stays interesting through your Constraints alone."
 },
 commonMistakes: [
 {
 mistake: "A Toolbox model was moved straight into the attraction zone without checking",
 explanation: "It may hide scripts that break the game or spam Output.",
 correctApproach: "First import the model into the Toolbox_Inbox Folder, check it with the audit script, delete third-party code, and only then use it as decoration.",
 },
 {
 mistake: "Your own gate was replaced with a ready-made gate model from the internet",
 explanation: "The learning artifact should demonstrate your ability to work with Hinge and Weld.",
 correctApproach: "Build mechanisms yourself. Use ready-made models only for visual decoration.",
 },
 {
 mistake: "Confusion between Decal and MeshPart objects",
 explanation: "These are different tools. Misunderstanding their purpose leads to incorrect use of resources.",
 correctApproach: "Remember: a Decal is a sticker on a surface, and a MeshPart is a ready-made complex 3D shape.",
 },
 {
 mistake: "Saving the project under an old name or as Untitled",
 explanation: "This makes the final result hard to find among other files.",
 correctApproach: "Use Save As and save as Module 2 - Park_v1.",
 },
 {
 mistake: "Adding damage scripts (kill blocks) for variety",
 explanation: "The module checks physical modeling skills, not damage-logic scripting.",
 correctApproach: "Save those ideas for later lessons. Work only with connections and structure.",
 },
 {
 mistake: "Attractions work, but the gate door has Anchored = true",
 explanation: "That fails the gate assessment rubric. The door must rotate.",
 correctApproach: "Check the door panel and disable anchoring on it so HingeConstraint can work.",
 },
 {
 mistake: "All objects sit as one flat list in Workspace",
 explanation: "That clutter makes it impossible for the instructor to check artifacts quickly.",
 correctApproach: "Group everything into Folders (Decor, Sounds, Interactives) and separate Models.",
 },
 ],
 summary:
 "Congratulations on finishing the park! In this lesson, you learned to work safely with Toolbox models, understood the difference between MeshPart and Decal, and put the level structure in good order. Your Park_v1 location is ready to present, and you have mastered the basics of physical world construction.",
 quiz: {
  passingScore: 70,
  timeLimit: 15,
  questions: [
  {
   id: "q1",
   type: MC,
   question: "What is the main goal of Lesson 2.4?",
   options: [
    "Learn the Spring connection from scratch",
    "Create a database to save progress",
    "A checkpoint for submitting Park_v1 and Toolbox hygiene",
    "Build an obstacle course (Obby)",
   ],
   correctAnswer: 2,
   explanation: "The checkpoint is for polishing and submitting prior material, not for learning new topics.",
  },
  {
   id: "q2",
   type: MC,
   question: "What should already be on the level before Lesson 2.4 starts?",
   options: [
    "A shop with weapons",
    "Only an empty Baseplate template",
    "IslandHQ_v1 headquarters, ParkGate, and the ParkRides_v1 attraction zone",
    "Only a configuration script",
   ],
   correctAnswer: 2,
   explanation: "The level should include all assignment results from Lessons 2.1-2.3.",
  },
  {
   id: "q3",
   type: MC,
   question: "What should you NOT do at the Lesson 2.4 checkpoint submission stage?",
   options: [
    "Replace your own gate with a ready-made Toolbox model",
    "Fix Part names in Explorer",
    "Check that the door works in Play mode",
    "Save the project under the correct name",
   ],
   correctAnswer: 0,
   explanation: "At the checkpoint, demonstrate only skills you have learned. Replacing the gate with a ready-made model will not show your Hinge and Weld skills.",
  },
  {
   id: "q4",
   type: MC,
   question: "Which connection was used for the gate door in Lesson 2.2?",
   options: [
    "SpringConstraint",
    "WeldConstraint",
    "HingeConstraint",
    "BallSocketConstraint",
   ],
   correctAnswer: 2,
   explanation: "The gate door rotates around one axis, so HingeConstraint is the ideal solution.",
  },
  {
   id: "q5",
   type: MC,
   question: "Which property is required for a moving Part on a HingeConstraint (for example, a door panel)?",
   options: [
    "Anchored = true",
    "Massless = true",
    "Anchored = false",
    "CanCollide = false",
   ],
   correctAnswer: 2,
   explanation: "If the door panel has Anchored = true, it is fixed and the hinge cannot rotate it.",
  },
  {
   id: "q6",
   type: MC,
   question: "Why do we create a Toolbox_Inbox Folder before adding a Toolbox model?",
   options: [
    "To speed up game publishing",
    "To isolate the downloaded model for a script audit",
    "To disable terrain generation",
    "To replace the PrimaryPart setting",
   ],
   correctAnswer: 1,
   explanation: "This Folder acts as a quarantine zone for checking and cleaning third-party models of outside code.",
  },
  {
   id: "q7",
   type: MC,
   question: "Which file name is correct for project submission?",
   options: [
    "Untitled Experience",
    "test123",
    "Lesson 9.4 Remotes",
    "Module 2 - Park_v1",
   ],
   correctAnswer: 3,
   explanation: "A correct name ensures the file is not lost when you build a portfolio.",
  },
  {
   id: "q8",
   type: MC,
   question: "How do you fix a gate door that does not rotate during Play?",
   options: [
    "Add more decoration around the gate",
    "Check that the panel has Anchored = false",
    "Delete the Interactives Folder",
    "Change the door color to green",
   ],
   correctAnswer: 1,
   explanation: "This is the most common mistake: if the panel is fixed (Anchored = true), the HingeConstraint cannot move it.",
  },
  {
   id: "q9",
   type: MC,
   question: "What should you do if the audit finds a script in the Toolbox_Inbox Folder?",
   options: [
    "Publish the game on the website",
    "Find that script in Explorer and delete it",
    "Enable Party Mode",
    "Apply the Union tool",
   ],
   correctAnswer: 1,
   explanation: "Found third-party scripts must be deleted immediately for level safety.",
  },
  {
   id: "q10",
   type: MC,
   question: "What must you check during the park Playtest?",
   options: [
    "Only whether water is present on the level",
    "Only renaming a button in the panel",
    "Door and attraction behavior, and no errors in Output",
    "Only appearance, without starting Play",
   ],
   correctAnswer: 2,
   explanation: "Playtest reveals collision and connection errors that appear only when the character moves.",
  },
  {
   id: "q11",
   type: MC,
   question: "Why should you close and reopen the project after saving?",
   options: [
    "To delete fog (Atmosphere)",
    "To reset all variables",
    "To confirm that the cloud saved the latest version",
    "To enable third-party plugins",
   ],
   correctAnswer: 2,
   explanation: "This is a reliable way to verify that the Roblox cloud save succeeded.",
  },
  {
   id: "q12",
   type: MC,
   question: "What is the most common mistake when using HingeConstraint?",
   options: [
    "Forgetting to create an Attachment",
    "Setting Anchored = true on the moving Part, so the hinge cannot rotate it",
    "Adding too much decoration",
    "Using a LocalScript instead of a Script",
   ],
   correctAnswer: 1,
   explanation: "A moving Part (door panel, platform) must always have Anchored = false, or the physical connection will not work.",
  },
  {
   id: "q13",
   type: MC,
   question: "Which three Models must be on the level?",
   options: [
    "House_01, MagicCube, LogicCube",
    "IslandHQ_v1, ParkGate, ParkRides_v1",
    "Lighting, SoundService, Teams",
    "Toolbox, Terrain, Workspace",
   ],
   correctAnswer: 1,
   explanation: "Successful submission requires headquarters, gate, and attraction zone as separate Models.",
  },
  {
   id: "q14",
   type: MC,
   question: "How should you demonstrate the park correctly?",
   options: [
    "In Edit mode without pressing any buttons",
    "In Play mode, showing the door and at least one attraction in 30-60 seconds",
    "Without sound and without checking shutdown",
    "On an empty level with no Models",
   ],
   correctAnswer: 1,
   explanation: "The demonstration should be short and happen only in Play mode to show connection physics.",
  },
  {
   id: "q15",
   type: MC,
   question: "What is the main artifact submitted at the end of Module 2?",
   options: [
    "A completely empty level",
    "One glowing block",
    "An organized park with headquarters, gate, and attractions, a saved project, and a short demo",
    "An open toolbar panel",
   ],
   correctAnswer: 2,
   explanation: "The checkpoint requires submitting a complete result of all prior work in the module.",
  },
  ],
 },
}
