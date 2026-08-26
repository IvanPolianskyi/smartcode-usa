/** Rich UK content for Roblox Module 04 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson41 = {
 lessonId: "lesson-roblox-4-1",
 moduleId: "module-04",
 order: 1,
 title: "4.1 - Arrays + for",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Declare the array (list-table) through {} and read the element by index",
 "Explain why array indices start at 1 in Luau",
 "Find out the length through #t and pass the for / ipairs array",
 "Spawn Parts from name array and remove duplicates before Play again",
 "Submit the artifact NamePads_v1 without price dictionaries and DataStore",
 ],
 theory: {
 sections: [
 {
 title: "Today's mission is a list that builds the world",
 content: `The module **"Tables and data"** does not start with a store and not with saving to the cloud. It starts with a simple question: how to keep **many things of the same type** in one variable instead of AlphaPad, BetaPad, GammaPad by hand.

In 3.5, you already spawned a row through \`for i = 1, n\`. There, the number was the main thing: "make n plates." Today there is an **array of names** - a table, where there are lines under the numbers, and the cycle reads exactly them. It is a bridge from "repeat an action n times" to "go through a list of data."

Without this bridge, it is difficult: price, inventory, Config and DataStore are all tables. If you leave the feeling of "table = something terrible from the Internet" today, the module will turn into a copy-paste of other people's snippets. If you make a live list in your Script today, tomorrow's topics will be based on a familiar framework.

**Artifact:** \`NamePads_v1\`
- Folder in Workspace (for example \`ArrayLab\`)
- Script with a list of names \`{"Alpha","Beta","Gamma","Delta"}\` (you can use your own)
- spawn Part for each name: Name = name, Billboard signature or color
- cleaning old plates before new spawning (habit from 3.5)
- Save: \`Lesson 4.1 - NamePads_v1\`

**Start:** Place after \`Module 3 - PlayableMini_v1\` or clean area next to it. It is not necessary to break the mini-game - make a separate corner \`ArrayLab\`. If you want an empty test Place - ok, but return to the course island so that the data lives in the same portfolio.

**What's not today:** dictionaries with string keys and price \`canAfford\` (**4.2**), \`table.insert\` / \`remove\` (**4.3**), record array \`{{name=, power=}}\` (**4.4**), ModuleScript Config (**4.5**), DataStore (**4.6**), showcase-boss (**4.7**). Today - **an array as a list** + a loop on it.

Think of it this way: for without table is a hammer. Table without for is a drawer with details. Together is the pipeline where data becomes Parts in the world. At the exam, the instructor wants to see exactly this conveyor: opened the array → changed the line → Play → the world is different.`,
 },
 {
 title: "What is a table-array in human language",
 content: `At Luau, almost everything "more complicated than one number" is packaged in \`table\`. Today we take only one type of table - **array (list)**: elements are numbered 1, 2, 3...
\`\`\`
names[1] → "Alpha"
names[2] → "Beta"
names[3] → "Gamma"
\`\`\`This is not a Folder in Explorer and not a Model. This is **data in Script**. Folder holds Parts in the world. An array holds values ​​in code memory. You can **spawn** Parts from the array - that's exactly what you'll do.

Why is this important right now? Because then the module will teach prices, inventory, Config and save. All of them are tables. If today you confuse the "numbered list" with "a bunch of Parts in Workspace", tomorrow you will be even more confused.

The array is useful when:
- the order is important (1st, 2nd, 3rd post);
- you want one length \`#names\` and one cycle;
- names/colors/captions live in code, not in ten copies of Script.

**Do this now (2 min):** write 4 names of future plates in a note. This is already a blank array - still without syntax.`,
 },
 {
 title: "Syntax {} and index from 1",
 content: `Advertisement:
\`\`\`lua
local names = {"Alpha", "Beta", "Gamma", "Delta"}

print(names[1]) -- Alpha
print(names[2]) -- Beta
print(#names)   -- 4
\`\`\`Curly brackets \`{}\` create a table. When you write values ​​separated by commas without keys, it's **massive** style: Roblox/Luau puts the indexes itself, starting with **1**.

Yes, many languages ​​have arrays of 0. In Lua/Luau, they are of **1**. This is not a "course error", this is a rule of the language. If you write \`names[0]\`, you will almost certainly get \`nil\` and silence instead of the name.

\`#names\` is the length of the massive part. For a clean list without holes, this is the number of elements. Later, when "leaky" tables appear, \`#t\` will be a finer topic - today keep the list tight: 1...n without gaps.

Read element: \`names[i]\`. Exchange: \`names[i] = "Nova"\`. \`names[#names + 1] = "Epsilon"\` can be added "at the end manually" - but we will save the full-fledged \`table.insert\` for **4.3** so as not to mix topics.

**Do this now (5 min):** MiniScript in ServerScriptService: Array of 3 lines, \`print\` first and \`#\`. Then delete it or leave it as a sandbox.`,
 },
 {
 title: "for array - two fair ways",
 content: `3.5 had \`for i = 1, count\`. Now \`count\` is taken from the data:
\`\`\`lua
local names = {"Alpha", "Beta", "Gamma"}

for i = 1, #names do
	print(i, names[i])
end
\`\`\`Or through \`ipairs\` - convenient when both index and value are needed:
\`\`\`lua
for i, name in ipairs(names) do
	print(i, name)
end
\`\`\`Both methods are par for the course. \`ipairs\` reads "go through the array in order". Numeric for is useful when you want the same \`i\` for a position in the world (as in slab spawning).

Not to be confused with \`pairs\`: it bypasses all keys, including non-numeric ones - it's more about dictionaries (**4.2**). Today, for a list of names, take \`ipairs\` or \`for i = 1, #names\`.

An empty array \`{}\` will loop 0 times - this is normal, not a "Studio bug". If you expected a stove, and the world is quiet - first \`print(#names)\`.

**Do Now (4 min):** run ipairs in Output on your list of names. See order 1...n.`,
 },
 {
 title: "From names to Parts is the main technique of the lesson",
 content: `Data becomes the world: for each name you create a Part, put \`Name\`, put it in Folder, move it along the axis.
\`\`\`lua
local folder = workspace:FindFirstChild("ArrayLab") or Instance.new("Folder")
folder.Name = "ArrayLab"
folder.Parent = workspace

local names = {"Alpha", "Beta", "Gamma", "Delta"}
local start = Vector3.new(0, 5, 0)
local step = 6

local function clearPads()
	for _, child in ipairs(folder:GetChildren()) do
		if child:IsA("BasePart") and child.Name:match("^Pad_") then
			child:Destroy()
		end
	end
end

local function spawnPad(i, name)
	local part = Instance.new("Part")
	part.Name = "Pad_" .. name
	part.Size = Vector3.new(4, 1, 4)
	part.Anchored = true
	part.Position = start + Vector3.new(step * (i - 1), 0, 0)
	part.Parent = folder
	return part
end

clearPads()
for i, name in ipairs(names) do
	spawnPad(i, name)
end
\`\`\`Please note: \`spawnPad\` and \`clearPads\` are skills from **3.6**. The data module does not override functions; on the contrary, table + function is a typical pair.

Why \`Pad_\` + name? So that cleaning does not destroy random decoration in the same Folder. Filter by prefix - hygiene since 3.5, only now the names are alive from the array.

The Billboard on each board (Skill 3.1) is a strong plus for submission: the instructor immediately sees that the Part corresponds to the item on the list, and not "just four cubes".

**Do this now (12 min):** Folder + spawn script. Play → you see a number of named plates.`,
 },
 {
 title: "Connection with 3.5: what changed in the head",
 content: `| 3.5 TrackSpawn | 4.1 NamePads |
|----------------|--------------|
| The main thing is the number n | The main thing is **list of data** |
| The name is often \`Pad_\` .. i | Name with \`names[i]\` |
| for knows only the counter | for reads table |
| Change "signatures" = edit the code in the body | Change signatures = edit **array** |

This is data-driven in its infancy: if you want a fifth plate, you add a line to \`names\`, instead of copying and pasting another \`Instance.new\`. The full data-driven store will be in **4.7**; today only grain.

If you leave the array, but always spawn \`"Pad"\` without a name from the table, you have not fulfilled the mission of the lesson. The array should **affect** the world (Name, color, Billboard).

You can color by index:
\`\`\`lua
local colors = {
	Color3.fromRGB(255, 120, 80),
	Color3.fromRGB(80, 180, 255),
	Color3.fromRGB(120, 220, 120),
	Color3.fromRGB(220, 200, 80),
}

-- inside spawnPad:
part.Color = colors[i] or Color3.fromRGB(200, 200, 200)
\`\`\`There are already **two** arrays next to each other: names and colors. It is better to keep the lengths consistent or insure \`or\` as in the sample.

**Do this now (5 min):** change only the array of names (add/remove a line) and restart Play - the number of tiles should change by itself.`,
 },
 {
 title: "nil, holes and typical \"silent\" errors",
 content: `The most frequent breakdowns of the day:

1. \`names[0]\` or \`names[5]\` when length 4 → \`nil\` → concatenation drops or Billboard is empty.
2. Forgot \`#\` and wrote \`for i = 1, names\` - names is a table, not a number.
3. \`names.i\` vs \`names[i]\` confusion: the dot is looking for the key \`"i"\`, not the index of variable i.
4. No \`clearPads\` - each Play breeds another row of "ghosts".
5. Script in LocalScript "because it was like that in the GUI" - spawn the world of lichens on the server Script.

When \`print(names[i])\` shows \`nil\` in the middle of the cycle, stop. Do not mask via \`tostring\`. Find why the index went out of bounds or the array was packed with a hole. Quiet \`nil\` is the worst instructor in tables: the code "seems to work", but one plate without a name.

An example of a hole (for now, just to know, not to do it on purpose):
\`\`\`lua
local t = {"A", "B"}
t[4] = "D" -- there is no place 3
print(#t)  -- the behavior of length can surprise
\`\`\`For course 4.1: complete the list consecutively. The beauty of "sparse" tables is not today. If you really want a "hole for the plot" - make a separate array shorter, and not a hole inside one.

One more thing: do not mix lines and Parts (Instance) in one array. Today, an array is **string data** (or colors). Parts are born in a cycle. This is easier to read and take out in Config tomorrow.

**Do this now (4 min):** intentionally make a mistake with index 0, look at the Output, fix it.`,
 },
 {
 title: "Where to keep the Script and how to name the data",
 content: `Lesson recommendation:
- Folder \`ArrayLab\` in Workspace
- Script \`NamePadSpawner\` in this Folder or in ServerScriptService with a link to Folder
- the \`names\` array at the top of the Script is immediately visible

Take the names of the elements of the array **short in Latin** or simple Ukrainian transliterations without spaces, if you paste in \`Pad_\` .. name. A space in the Name Part is possible, but prefix filters and paths get complicated. \`Alpha\`, \`Gate\`, \`Risk\` - approx.

Don't hide the array 80 lines below after three functions "just in case". Keep the data that you edit most often on top - like Config, only inside one Script. The actual output in ModuleScript is **4.5**.

If you put Billboard: Text = name from the array, don't hardcode "Pad" on everyone. Otherwise, you will not be able to visually prove that the table is working.

**Do this now (3 min):** Explorer checks whether the Tile Names match the Array Rows.`,
 },
 {
 title: "Mini-map of the Tables module (so as not to rush)",
 content: `| Lesson | Focus | You still do not today |
|------|--------|-------------------------|
| **4.1** | array + for/ipairs + spawn from names | price dictionary |
| 4.2 string keys, prices, \`canAfford\` intro | DataStore |
| 4.3 \`insert\` / \`remove\`, inventory | ModuleScript |
| 4.4 | array of records \`{name=, power=}\` | save to the cloud |
| 4.5 | \`require\` Config | showcase-boss |
| 4.6 | DataStore lite | Remotes |
| 4.7 | data-driven showcase | boss-showcase |
| 4.8 | Checkpoint M4 | new syntax |

M4 is about **data**. Do not collect unnecessary code "because it was like that in the old textbook".

**Do this now (2 min):** say aloud in one sentence how 4.1 differs from 3.5.`,
 },
 {
 title: "Play-test NamePads_v1 and Save",
 content: `After spawning, the gameplay here is simple - **data** is important. A beautiful row without a connection to the table does not pass the lesson.

**Checklist:**
- [ ] There is a table-array with ≥3 names at the top of Script (immediately visible)
- [ ] The loop \`for\` / \`ipairs\` reads the array
- [ ] Parts appear with names (or signatures) from the data
- [ ] Repeat Play does not spawn duplicates without clearing
- [ ] Functions for spawn/clear are a plus, not a penalty
- [ ] No price dictionary, insert/remove-inventory, DataStore, ModuleScript Config
- [ ] Save: \`Lesson 4.1 - NamePads_v1\`

Peer-demo: 15 seconds - open the Script, show the array, Play, click on Pad_Gamma. If the instructor changes the array together with you and after Play the world changes, the lesson has been passed. This is stronger than a long monologue "I know what a table is".

Before Save, remove test spam \`print\` in the loop if it interferes with reading Output. One \`print(#names)\` at the start - on the contrary, it is useful for passing.

Also check that the ArrayLab didn't run over the Minigame's FinishPad: the player shouldn't "accidentally win" by stepping on the data lab. Move \`start\` if necessary.

Briefly in the portfolio note: "array of names → for → Parts". This is the grain of the entire M4. The following lessons will only change the *form* of the table, not cancel this habit.`,
 },
 {
 title: "View in 4.2 - dictionaries and price",
 content: `Tomorrow (or next lesson) the table opens from another side: not only \`[1][2][3]\`, but \`prices["JumpPad"] = 50\`. The question "can I afford this" appears, a light \`canAfford\`.

Today do not jump there with fake currency "for later". Close an honest list and spawn. Otherwise you will mix indexes and keys in one mess and will not understand what broke.

An array that already works becomes the foundation: price often lives in a dictionary, and the product shelf lives as a list of names or records. Step by step.`,
 },
 ],
 },
 practice: {
 title: "Practice: NamePads_v1",
 duration: 30,
 description: `**Goal:** create a name array, spawn Parts for each one, and confirm that changing the array changes the world.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Create Folder \`ArrayLab\`.
 2. Declare \`names\` with 4 strings.
 3. Write an \`ipairs\` loop and \`print\`.
 4. Replace print with \`spawnPad\` (you can skip the function first, then extract it).
 5. Add \`clearPads\` and check a second Play.

 **Pass criteria:** the world has as many pads as rows in the array; names match.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Add a Billboard or different colors from a second array.
 2. Shift \`start\` / \`step\` so the row does not overlap the M3 mini-game.
 3. Add a 5th element only in the table, with no new copy-paste \`Instance.new\` block.
 4. Confirm index 1 works (do not start at 0).
 5. Save \`Lesson 4.1 - NamePads_v1\`.

 **Pass criteria:** changing the array changes the world after Play; no duplicates.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Pick one:
 - zigzag positions from \`i % 2\` with the same names;
 - a \`sizes\` array aligned with \`names\` (different Size);
 - briefly reverse the display: spawn in reverse order \`for i = #names, 1, -1\`.

 **Do not do:** price dictionary and purchases, \`table.insert\` as the main topic, DataStore, ModuleScript Config.

 The challenge is a star on top of a submitted list.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Index from 0 like in other languages",
 fix: "In Luau, arrays start at 1. names[0] is almost always nil.",
 },
 {
 mistake: "Writes names.i instead of names[i]",
 fix: "For an index held in a variable, use square brackets.",
 },
 {
 mistake: "for i = 1, names without #",
 fix: "The upper bound is a number. Use #names.",
 },
 {
 mistake: "Array exists, but Part always has the same Name",
 fix: "Pass names[i] / name from ipairs into Part properties.",
 },
 {
 mistake: "No cleanup - duplicates every Play",
 fix: "clearPads before spawning, as in 3.5/3.6.",
 },
 {
 mistake: "World spawn in a LocalScript",
 fix: "Server Script. Leave LocalScript for GUI.",
 },
 {
 mistake: "Immediately pulls prices and DataStore",
 fix: "That is 4.2 and 4.6. Today only the list + loop.",
 },
 ],
   summary: "You learned how to create indexed arrays in Lua, manipulate elements with table.insert and table.remove, get table length via the # operator, and iterate items with ipairs.",
  practiceTask: {
    "title": "Hands-on Practice: Rewards Array (RewardsArray_v1)",
    "difficulty": "intermediate",
    "description": "**Objective:** Create and manipulate a rewards array using core Lua table methods.\n\n### Part A: Manager Script\n1. In `ServerScriptService`, create a Script named `RewardsManager`.\n2. Declare an array: `local rewards = {\"WoodSword\", \"HealthPotion\", \"IronShield\"}`.\n\n### Part B: Array Methods\n1. Insert a new item: `table.insert(rewards, \"GoldBow\")`.\n2. Remove the first item: `table.remove(rewards, 1)`.\n3. Iterate and print items using `ipairs`:\n```lua\nfor index, itemName in ipairs(rewards) do\n    print(\"Slot #\" .. index .. \": \" .. itemName)\nend\n```\n\n### Part C: Verification\n1. Press Play: verify Output displays 3 items in order (HealthPotion, IronShield, GoldBow).\n2. Save Place as `Lesson 4.1 - RewardsArray_v1`.",
    "hints": [
      "Lua arrays are 1-indexed (first element is index 1).",
      "The # operator returns the length of contiguous arrays.",
      "Always use ipairs for indexed array loops."
    ],
    "optionalChallenge": "Write a helper function hasReward(rewardName) that returns true if the item exists in the array."
  },
  quiz: {
 title: "Quiz 4.1 - Arrays + for",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Main goal of lesson 4.1:",
 options: [
 "RemoteEvent shop",
 "Array {} + for/ipairs and spawn from names",
 "SpringConstraint",
 "Publish experience",
 ],
 correctAnswer: 1,
 explanation: "A data list drives the world.",
 },
 {
 id: "q2",
 type: MC,
 question: "In Luau the first array element is usually at index:",
 options: [
 "0",
 "1",
 "-1",
 "nil",
 ],
 correctAnswer: 1,
 explanation: "1-based indexing.",
 },
 {
 id: "q3",
 type: MC,
 question: "#names for a clean list means:",
 options: [
 "The player's name",
 "The length / count of elements in the array part",
 "Required DataStore",
 "Remote count",
 ],
 correctAnswer: 1,
 explanation: "List length.",
 },
 {
 id: "q4",
 type: MC,
 question: "What will print(names[0]) do for a normal list like Alpha, Beta?",
 options: [
 "Print Alpha",
 "Print nil (or empty)",
 "Delete Terrain",
 "Enable Party Mode",
 ],
 correctAnswer: 1,
 explanation: "There is no zero index in such an array.",
 },
 {
 id: "q5",
 type: MC,
 question: "ipairs(names) is convenient when:",
 options: [
 "You need to walk the array in order with index and value",
 "You only need Lighting",
 "Required Hinge",
 "for is forbidden",
 ],
 correctAnswer: 0,
 explanation: "Walking a list.",
 },
 {
 id: "q6",
 type: MC,
 question: "How does 4.1 logically continue 3.5?",
 options: [
 "Replaces for with Tween from Toolbox",
 "Adds a table of data that for reads (names), not only a number n",
 "Cancels Anchored",
 "Adds required BadgeService",
 ],
 correctAnswer: 1,
 explanation: "Data + loop.",
 },
 {
 id: "q7",
 type: MC,
 question: "names.i with a live variable i is:",
 options: [
 "Always the same as names[i]",
 "Access to a key named i, not to the index held by variable i",
 "DataStore syntax",
 "Deleting a Part",
 ],
 correctAnswer: 1,
 explanation: "Square brackets are required.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why clearPads before spawn?",
 options: [
 "To enable Atmosphere",
 "So a repeat Play does not breed duplicate pads",
 "To create a RemoteFunction",
 "To disable CanCollide globally",
 ],
 correctAnswer: 1,
 explanation: "Spawn hygiene.",
 },
 {
 id: "q9",
 type: MC,
 question: "Which of these is NOT a 4.1 topic?",
 options: [
 "Name array",
 "#t",
 "DataStoreService:GetAsync",
 "ipairs",
 ],
 correctAnswer: 2,
 explanation: "DataStore - 4.6.",
 },
 {
 id: "q10",
 type: MC,
 question: "Recommended Save:",
 options: [
 "Untitled",
 "Lesson 4.1 - NamePads_v1",
  "7.1 - Collection automation",
  "Lesson 3.2 - Kill only",
 ],
 correctAnswer: 1,
 explanation: "Lesson artifact.",
 },
 {
 id: "q11",
 type: MC,
 question: "Where should a world-spawn script live?",
 options: [
 "LocalScript in a TextButton",
 "A normal Script (server)",
 "Only inside Sound",
 "Required inside Terrain",
 ],
 correctAnswer: 1,
 explanation: "World on the server.",
 },
 {
 id: "q12",
 type: MC,
 question: "If you add a fifth string to names and restart Play (with clear+spawn):",
 options: [
 "Nothing changes without a new Script file",
 "A fifth pad should appear without copy-pasting Instance.new",
 "Studio must crash",
 "WinFrame will be deleted",
 ],
 correctAnswer: 1,
 explanation: "Data drives the count.",
 },
 {
 id: "q13",
 type: MC,
 question: "pairs vs ipairs at the start of M4:",
 options: [
 "For a clean name list in 4.1, prefer ipairs (or for 1..#t); pairs is more about all keys/dictionaries",
 "pairs is always forbidden in Roblox",
 "ipairs only works in LocalScript",
 "There is never any difference",
 ],
 correctAnswer: 0,
 explanation: "List vs general walk.",
 },
 {
 id: "q14",
 type: MC,
 question: "Function spawnPad in this lesson:",
 options: [
 "Forbidden, because functions were in 3.6",
 "Good hygiene: table + function together",
 "Required ModuleScript",
 "Only works with RopeConstraint",
 ],
 correctAnswer: 1,
 explanation: "Skill spiral.",
 },
 {
 id: "q15",
 type: MC,
 question: "Next lesson 4.2 focuses on:",
 options: [
 "Dictionaries (string keys) and price / canAfford intro",
 "Terrain Paint only",
 "Publish Showcase",
 "HingeConstraint doors as a new language",
 ],
 correctAnswer: 0,
 explanation: "Dictionaries and prices.",
 },
 ],
 },
}

export const enLesson42 = {
 lessonId: "lesson-roblox-4-2",
 moduleId: "module-04",
 order: 2,
 title: "4.2 - Dictionaries + price",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Declare a dictionary (dictionary-table) with string keys and price values",
 "Read price via Prices.Key and Prices[\"Key\"] and explain the difference in writing",
 "Write canAfford(coins, itemName) with safe nil handling",
 "Write canAfford(coins, itemName) that reads the price, not a magic number",
 "Connect the price to a simple server-side purchase check",
 ],
 theory: {
   sections: [
     {
       title: "Today's mission",
        content: `In **4.1** the array answered "what is under number i?". Today the table answers "**how much does key X cost?**". This is **dictionary + price**.

        An array is a numbered queue. A dictionary is a drawer of labeled folders: open "Apple" and you see 5. You do not look for "the fifth element", you look up a name.

        **Do this now (2 min):** Save as Lesson 4.2 - Dictionary Price and create Script \`PriceLab\`.`
     },
     {
       title: "Dictionary vs array",
       content: `Array:
       \`local names = { "Apple", "Gem", "Potion" }\`
       \`names[1] → "Apple"\`
       Dictionary price:
       \`\`\`lua
       local Prices = {
        Apple = 5,
        Gem = 25,
        Potion = 10,
      }
      \`\`\`
      \`Prices.Apple → 5\`
      \`Prices["Gem"] → 25\`
      |Question|Better form|
      |-------|-----------|
      |Third item on the stand|Array|
      |Gem price right now|Dictionary|
      |Display order + fields|Later, array of records (4.4)|
      Today the main idea is **key → value**. You do not have to spawn Parts from prices. You must be able to read a price by name.
      **Do this now (3 min):** declare Prices with ≥3 items and print two prices using different access styles.`
     },
     {
       title: "Two ways to read a key",
       content: `\`Prices.Apple\` is convenient when the key is a valid identifier.
       \`Prices["Apple"]\` is needed when:
- the key is in a variable: \`local id = "Apple"; Prices[id]\`
- the key has spaces/symbols (better to avoid, but the syntax works)
- the key comes from an Attribute / Prompt
Typical mistake: \`Prices[Apple]\` without quotes - then Luau looks for a variable Apple, not a string.
Another mistake: \`Prices.apple\` when the key is \`Apple\` - Luau is case-sensitive. Agree on a naming style (Apple or apple) and keep it through inventory.
**Do this now (4 min):** read a price from variable id via Prices[id]; intentionally get the case wrong and watch nil.`
     },
     {
       title: "canAfford: price without magic",
       content: `Hardcode:
       \`if coins >= 5 then\` - bad, because 5 lives in the logic
       Better:
       \`\`\`lua
       local function canAfford(coins, itemName)
local price = Prices[itemName]
if price == nil then
return false
end
return coins >= price
end
\`\`\`
Benefits:
- new price = change in Prices
- missing item = safe false
- the same function will be reused in 4.3/4.7
Check three cases:
1. coins=10, Apple=5 → true
2. coins=3, Apple=5 → false
3. itemName="NoSuch" → false
**Do this now (5 min):** write canAfford and run the three cases with print.`
     },
     {
       title: "Server purchase check (minimum)",
       content: `Even without a full inventory, do the ritual:
1. The player has coins (leaderstats or IntValue under the server)
2. Prompt "Buy Apple"
3. Server: if canAfford → deduct price, print "bought"
4. Else print "not enough"
This is not yet insert into bag (4.3). This proves that **price drives the decision**.
Anti-pattern: LocalScript deducts coins itself by reading button text "5". Text can lie; Prices on the server does not.
Short debounce so a double Prompt does not charge twice in one frame.
**Do this now (7 min):** make one Buy Prompt with canAfford on the server for two items.`
     },
     {
       title: "Changing price as a dictionary test",
       content: `Required submission ritual:
1. Prices.Gem = 25
2. Play: with 20 coins Gem cannot be bought
3. Stop, set Gem = 15
4. Play: with 20 coins Gem can be bought
5. No edits in the button if-logic
If step 4 still needs edits in the purchase Script, the price is still hardcoded somewhere else.
You rewrote the price tag on the drawer; the register reads the drawer, not the cashier's memory.
**Do this now (4 min):** run the one-price-change ritual and note pass/fail in a Note.`
     },
     {
       title: "Keys, nil, and pairs",
       content: `\`Prices.NoSuch → nil\`. Always think about nil before \`coins >= price\`.
       Walking all pairs (intro):
       \`\`\`lua
for name, price in pairs(Prices) do
  print(name, price)
end
\`\`\`
Order from pairs is not guaranteed like 1..n. For a shelf with order in 4.4/4.7, prefer an array of records. Today pairs is to see all prices in Output.
Do not mix array part \`[1]="x"\` and keys Apple=5 in one table unless you need to. Keep the price table a clean dictionary.
**Do this now (3 min):** print all Prices pairs via pairs.`
     },
     {
        title: "Coins for testing",
       content: `Where do test coins come from?
       Options for the lesson:
- IntValue Coins = 20 at start
- a "+10" test button only in Studio
- leaderstats.Coins set by the server
You do not have to build a complex coin system. If you already have test coins, you can keep that source, but the checklist looks at Prices and canAfford.
The instructor's main question: "where does the price live?" Answer: "in the Prices dictionary".
**Do this now (3 min):** give yourself test coins; document the method in a comment.`
     },
     {
       title: "Typical price holes",
       content: `
       |Hole|Symptom|Fix|
       |-----|-------|----|
        |Price in button and in if|Balance drift|Prices only|
        |Prices[Apple] without quotes|nil / error|Prices["Apple"] or .Apple|
        |Ignoring nil|Compare with nil|Check price ~= nil|
        |Client-side register|Cheats / desync|Server canAfford|
        |No dictionary|Price in the button|Return focus to Prices|
       **Do this now (3 min):** fix the first red hole.`
     },
     {
       title: "What is out of scope for 4.2",
       content: `
       |Not a topic|Where|
       |-------|----|
       |Full insert/remove inventory|4.3|
       |Array of records with power|4.4|
       |ModuleScript Config|4.5|
        |Purchase as the main artifact|Extra code|
        Coins are a test tool. Complex collection logic is not the goal of the Tables module in this lesson.
       **Do this now (2 min):** remove from the demo anything that does not show a price dictionary in one minute.`
     },
     {
       title: "Demo for the instructor",
       content: `90 seconds:
1. Open Prices in the Script
2. Show canAfford
3. Buy with enough coins → success
4. Buy with few coins → reject
5. Change the price in the dictionary → new behavior
Say: "key → price", not "my coin drip".
**Do this now (4 min):** run the scenario out loud.`
     },
     {
       title: "Submission checklist 4.2",
       content: `
- [ ] Prices with ≥3 keys
- [ ] Reading .Key and ["Key"] / via a variable
- [ ] canAfford with nil handling
- [ ] Server buy success/fail check
- [ ] Price-change test only in the dictionary
- [ ] No required submission of extra logic
- [ ] Keys ready to become ids for 4.3
- [ ] Save: Lesson 4.2 - Dictionary Price
Labeled drawers are ready. Next: the insert/remove basket.
**Do this now (3 min):** checkboxes + final Save Place.`
     }
   ],
 },
 practice: {
 title: "Practice: Dictionary Price",
 duration: 30,
 description: `**Goal:** build a simple price list with a dictionary and verify purchase via canAfford.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Declare Prices with 3 items.
2. Write canAfford(coins, itemName) with a nil check.
3. Print 3 cases: true, false, missing item.
4. Play: confirm the result depends on Prices, not hardcode.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Add a Prompt or Buy button.
2. On the server, check price via canAfford.
3. If not enough money, reject; if enough, deduct and show success.
4. Save Lesson 4.2 - Dictionary Price.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Change one price in Prices and confirm purchase logic changes without editing the button.`,
 },
 ],
 },
 commonMistakes: [
     {
       mistake: "Price hardcoded in the buy button",
       explanation: "Price must live only in the Prices dictionary, not in button logic or button text.",
       correctApproach: "Price lives only in Prices[id]",
     },
     {
       mistake: "Prices[Apple] without quotes looks up a variable, not a string",
       explanation: "Without quotes Luau looks for variable Apple, not the string 'Apple'.",
       correctApproach: "Prices[\"Apple\"] or Prices.Apple",
     },
     {
       mistake: "Ignores nil from a missing key",
       explanation: "Prices[missing] returns nil; comparing with nil fails or gives a wrong result.",
       correctApproach: "Check price ~= nil before comparing",
     },
     {
       mistake: "Client deducts coins itself",
       explanation: "LocalScript can be faked; only the server may change currency.",
       correctApproach: "Server only via canAfford",
     },
   ],
   summary: "You mastered key-value tables (dictionaries) in Lua, structured item parameters, implemented instant lookups by string key, and iterated entries using pairs.",
  practiceTask: {
    "title": "Hands-on Practice: Item Stats Database (ItemStats_v1)",
    "difficulty": "intermediate",
    "description": "**Objective:** Build a dictionary of item stats with lookup functions and missing-key error handling.\n\n### Part A: Dictionary Structure\n1. In `ServerScriptService`, create a Script named `ItemDatabase`:\n```lua\nlocal itemDatabase = {\n    Sword = { Damage = 25, Cost = 100, LevelReq = 1 },\n    Axe = { Damage = 40, Cost = 250, LevelReq = 3 },\n    MagicStaff = { Damage = 65, Cost = 600, LevelReq = 5 }\n}\n```\n\n### Part B: Lookup Function\n1. Implement `printItemInfo(itemName)` to safely check `if itemDatabase[itemName] then ... else warn() end`.\n\n### Part C: Verification\n1. Test with existing and non-existent item keys.\n2. Save Place as `Lesson 4.2 - ItemDatabase_v1`.",
    "hints": [
      "Access keys using dictionary[key] or dictionary.key syntax.",
      "Always use pairs() when iterating key-value dictionaries.",
      "Verify non-nil values before indexing nested properties."
    ],
    "optionalChallenge": "Write getAffordableItems(coins) returning an array of items the player can afford."
  },
  quiz: {
   title: "Quiz 4.2 - 4.2 - Dictionaries + price",
   passingScore: 70,
   questions: [
     {
       id: "q1",
       type: MC,
        question: "What is the topic of lesson 4.2?",
        options: [
          "Arrays + for",
          "Dictionaries + price",
         "Obby biomes",
         "DataStore lite",
       ],
       correctAnswer: 1,
       explanation: "Lesson 4.2 topic is dictionaries and price.",
     },
     {
       id: "q2",
       type: MC,
       question: "What does a price dictionary store?",
       options: [
         "Only Obby platform order",
         "Pairs of item key → price",
         "Only UserId",
         "The whole Workspace",
       ],
       correctAnswer: 1,
       explanation: "A price dictionary stores key:price pairs.",
     },
     {
       id: "q3",
       type: MC,
       question: "How do you read the price when the name is in variable id?",
       options: [
         "Prices.id always",
         "Prices[id]",
         "Prices->id",
         "priceOf(Prices)",
       ],
       correctAnswer: 1,
       explanation: "For a variable key you need Prices[id] syntax.",
     },
     {
       id: "q4",
       type: MC,
       question: "Why does canAfford read Prices?",
       options: [
         "So you do not hardcode a number in if",
         "To delete Baseplate",
         "To turn off Lighting",
         "To create a Team",
       ],
       correctAnswer: 0,
       explanation: "canAfford reads Prices so as not to hardcode the price.",
     },
     {
       id: "q5",
       type: MC,
       question: "What to return if the product is not in Prices?",
       options: [
         "true always",
         "false (after nil check)",
         "Remove player",
         "crash Studio",
       ],
       correctAnswer: 1,
        explanation: "If there is no product, the function should return false after checking for nil.",
     },
     {
       id: "q6",
       type: MC,
       question: "Where to validate the purchase by price?",
       options: [
         "On the server",
         "Only in LocalScript",
         "Only in Skybox",
         "Only in the Part title",
       ],
       correctAnswer: 0,
       explanation: "The purchase must be validated on the server.",
     },
     {
       id: "q7",
       type: MC,
       question: "What test does the dictionary prove?",
       options: [
         "Changing the price in Prices changes canAfford without editing if",
         "Uninstalling Workspace",
         "Skybox change",
         "Disable Anchored",
       ],
       correctAnswer: 0,
       explanation: "The test proves that the logic reads the price from Prices, not hardcode.",
     },
     {
       id: "q8",
       type: MC,
       question: "What is the exact name of the Save?",
       options: [
          "Lesson 4.1 - NamePads_v1",
          "Lesson 4.4 - Nested Records",
          "Lesson 4.3 - Inventory Insert Remove",
         "Lesson 4.2 - Dictionary Price",
       ],
       correctAnswer: 3,
       explanation: "The correct save name for Lesson 4.2 is Lesson 4.2 - Dictionary Price.",
     },
     {
       id: "q9",
       type: MC,
       question: "How is a dictionary different from an array in this lesson?",
       options: [
         "Access by name key, not just by number",
         "The dictionary cannot contain numbers",
         "The array is not allowed at the Luau",
         "The dictionary works only on the client",
       ],
       correctAnswer: 0,
       explanation: "A dictionary allows you to access a value by key, not by index.",
     },
     {
       id: "q10",
       type: MC,
       question: "What is NOT an objective of 4.2?",
        options: [
          "Collect Prices",
          "Write canAfford",
          "Build a 3D showcase with Parts",
          "Server check buy",
        ],
        correctAnswer: 2,
        explanation: "The main goal is a price dictionary and canAfford, not building a storefront.",
     },
     {
       id: "q11",
       type: MC,
       question: "What is the next lesson after 4.2?",
       options: [
         "4.3 insert/remove inventory",
         "5.1 Three Biomes",
         "4.8 Checkpoint only",
         "6.1 Simulator",
       ],
       correctAnswer: 0,
       explanation: "The next lesson of module 4 after 4.2 is 4.3.",
     },
     {
       id: "q12",
       type: MC,
       question: "Why is a key registry important?",
       options: [
         "Apple and apple are different keys; easy to get nil",
         "Luau is case-insensitive at all times",
         "The case only affects the Skybox",
         "Register is required only for Terrain",
       ],
       correctAnswer: 0,
       explanation: "In Luau, the keys are case sensitive, so Apple and apple are different.",
     },
     {
       id: "q13",
       type: MC,
       question: "What is pairs(Prices) for in this lesson?",
       options: [
         "To view all pairs key → price",
         "To guarantee order as ipairs",
         "To remove Config",
         "To create Spawn",
       ],
       correctAnswer: 0,
       explanation: "pairs is used to output all key:price pairs.",
     },
     {
       id: "q14",
       type: MC,
       question: "How many keys is the minimum in Prices?",
       options: [
         "Zero",
         "One",
         "Exactly one hundred",
         "At least three",
       ],
       correctAnswer: 3,
       explanation: "The course usually requires Prices with at least three products.",
     },
     {
       id: "q15",
       type: MC,
       question: "What to prepare in keys for 4.3?",
       options: [
         "So that they become stable inventory id",
         "So that they are equal to UserId",
         "So that they are just Part.Size numbers",
         "For them to delete bag",
       ],
       correctAnswer: 0,
       explanation: "The keys must be suitable as stable ids for the inventory.",
     },
   ],
 }
}


export const enLesson43 = {
 lessonId: "lesson-roblox-4-3",
 moduleId: "module-04",
 order: 3,
 title: "4.3 - insert/remove inventory",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Add an element to the array via table.insert and remove via table.remove(index)",
 "Build the server inventory as an array of ids with the contents displayed",
 "Find the index of the element before remove and process the missing item",
 "Protect inventory changes from client \"truth\" and Touched spam",
   "Prepare bag ids for the record directory in 4.4",
 ],
 theory: {
   sections: [
     {
       title: "Today's mission",
        content: `In **4.2** the price dictionary can already answer "how much it costs". Today the list is learning to **grow and shrink**: \`table.insert\` / \`table.remove\`. Topic - **inventory**.
        Shopping can be one way to get an item. But you give a living bag: add, show, remove, do not fall to nil.
        Price - a price tag in a shop window. Inventory - basket in hands. Today you learn to put and take out of the basket.
        **Do this now (2 min):** Save as Lesson 4.3 - Inventory Insert Remove and create Script \`InventoryLab\`.`
     },
     {
       title: "insert and remove on the fingers",
       content: `List array:
       \`local bag = { "apple" }\`
       Add to the end:
       \`table.insert(bag, "gem") -- { "apple", "gem" }\`
       Add to position:
       \`table.insert(bag, 1, "potion") -- potion becomes the first\`
       Remove by index:
       \`table.remove(bag, 2) -- removes an element №2, flicks the tail\`
       Important: \`remove\` wants **index**, not necessarily string id. Therefore, first you look for exactly where the "gem" lies.
       \`#bag\` shows the new length after changes - a convenient quick test.
       **Do this now (4 min):** in Output manually insert two ids and remove one; print bag after each action.`
     },
     {
       title: "Find index before remove",
       content: `Helper:       \`\`\`lua
       local function indexOf(list, value)
           for i, v in ipairs(list) do
               if v == value then
                   return i
               end
           end
           return nil
       end
\`\`\`Using:\`\`\`lua
local i = indexOf(bag, "gem")

if i then
    table.remove(bag, i)
else
    print("there is no gem")
end
\`\`\`Without checking \`remove\` for a non-existent index or a blind remove(1) "to make something disappear" breaks trust in the inventory.
Duplicate policy (choose and fix):
- allow several identical ids
- or insert only if indexOf == nil
Write the rule in the comment - otherwise you will get confused tomorrow.
**Do this now (5 min):** implement indexOf + removeById; check success and "no item".`
     },
     {
       title: "Server bag per player",
       content: `Minimum memory:
       \`local bags = {} -- [player] = { "apple", ... }\`
       On PlayerAdded: \`bags[player] = {}\`
       On PlayerRemoving: \`bags[player] = nil\`
       All Add/Remove touch \`bags[player]\` on **server**. LocalScript can ask "add apple", but the server decides.
       Why not keep true only in GUI TextLabel? Because the GUI is easy to fake and easy to desynchronize. GUI - display. bag table - true (before DataStore in 4.6).
       For solo demos in Studio, you can have one \`bag = {}\` without a player dictionary. But \`bags[player]\` habit is cheaper right now.
       **Do this now (5 min):** make bags[player] (or clear solo bag) and Add via ProximityPrompt on the server.`
     },
     {
       title: "Inventory display",
       content: `After each change, show the status. Options from simple to best:
1. \`print(table.concat(bag, ", "))\` (if all lines)
2. Loop ipairs → one signature line
3. ScreenGui list
4. Billboard above the player / panel
On 4.3, print + one visible TextLabel is enough. The main thing is to **see insert/remove**, not to draw the AAA backpack.
Move display update to function \`renderBag(player)\` so that Add and Remove don't duplicate GUI code.
**Do this now (5 min):** after insert and remove, call render; confirm both changes with your eyes.`
     },
     {
        title: "Purchase as one of the inputs",
       content: `Can you link to price 4.2:
1. The player asks to buy an id
2. The server looks at Prices[id] / canAfford
3. Writes off coins
        4. \`table.insert(bag, id)\`
        This is a valid scenario. But the artifact of the day is **insert/remove**, not just a purchase.
        Anti-surrender:
        - Purchase without a visible bag
        - No remove at all
        The minimum on the checklist: one add action, one remove action, both are visible in the display.
**Do this now (4 min):** if there is a price - do buy → insert; separately make a Drop button/prompt for remove.`
     },
     {
       title: "Debounce and security",
       content: `Touched/Prompt without protection can insert 30 times per second.
       \`local busy = {}\`
       \`if busy[player] then return end\`
       \`busy[player] = true\`
       \`...\`
       \`task.delay(0.35, function() busy[player] = nil end)\`
       Security:
- do not trust the client "I already have it / I don't have it" without server verification
- bag size limit (eg 20) - protection against endless insert
- validate that id is from allowed set (white list) if add comes from Remote
On 4.3 the whitelist can be a small array \`{"apple","gem","potion"}\`.
**Do this now (4 min):** add debounce and MaxBagSize; try to remember Prompt.`
     },
     {
       title: "remove not only from the end",
       content: `Newbies often just do \`table.remove(bag)\` without the index - this removes the last one. Sometimes ok for stack. For inventory, it is almost always necessary to remove a specific id.
       Scenarios:
- throw away the gem, even if it is in the middle
- use potion (remove after effect)
- remove duplicate
Check the order after remove: elements after the index are shifted. Do not cache old indexes after changes.\`\`\`lua
local i = indexOf(bag, "gem")
-- ... something else insert ...
-- i may already be incorrect!
\`\`\`Always look for the index immediately before remove.
**Do this now (3 min):** make a bag of 3 elements, remove the middle one, print the new order.`
     },
     {
       title: "Typical inventory holes",
       content: `|Hole|Symptom|Fix|
       |-----|-------|----|
       |remove without searching|The wrong item disappears|indexOf → remove|
       |Truth in LocalScript|Easy "cheating" bag|Server bags[player]|
       |No display|"As if added"|render after changes|
       |No remove on surrender|Only half-skill|Separate Drop/Use|
       |Spam insert|Bag with 200 apple|Debounce + MaxBagSize|
        |Subject = shopping|No bag|Return focus to inventory|
       **Do Now (3 min):** Fix the first red hole on the list.`
     },
     {
       title: "Demo for the instructor",
       content: `Scenario ~90 seconds:
1. Show an empty bag
2. Add apple → apple is visible
3. Add gem → both are visible
4. Remove apple → gem remains
5. Attempt to remove potion → "none" message
6. (Optional) buy through the price
Speak in insert/remove/indexOf terms, not "I bought a second car".
**Do Now (4 min):** Run the script without crashing in Explorer.`
     },
     {
       title: "What is not included in 4.3",
       content: `|Not a topic|Where|
       |-------|----|
       |Full array of catalog entries|4.4|
       |ModuleScript Config|4.5|
       |DataStore bag|4.6|
        |Purchase as main artifact|Extra code|
       You can leave the buy button as UX. You cannot replace the absence of remove and bag display with it.
       **Do this now (2 min):** remove everything from the demo route that doesn't show insert/remove in a minute.`
     },
{
        title: "Submission checklist 4.3",
        content: `- [ ] There is a table.insert in the real scenario
- [ ] There is a table.remove by the found index
- [ ] indexOf / equivalent handles "no subject"
- [ ] bag on the server (solo or bags[player])
- [ ] render shows changes
- [ ] Debounce and/or MaxBagSize
- [ ] Items = id (recommended)
- [ ] There is no mandatory surrender of the purchase as the main artifact
- [ ] Save: Lesson 4.3 - Inventory Insert Remove
The basket can grow and shrink. Next - product questionnaires in the catalog.
**Do this now (3 min):** ticks + final Save Place.`
      }
   ],
 },
 practice: {
 title: "Practice: Inventory Insert Remove",
 duration: 30,
 description: `**Purpose:** Show how inventory grows and shrinks via table.insert and table.remove.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Create bag = {"apple"}.
2. Insert gem and potion.
3. Show content via print or TextLabel.
4. Make sure the order changes according to insert.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Implement indexOf and removeById.
2. Add remove for the middle element.
3. After each change, renderBag is updated.
4. Save Lesson 4.3 - Inventory Insert Remove.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Add debounce or MaxBagSize so that repeated clicks don't insert many of the same items.`,
 },
 ],
 },
 commonMistakes: [
     {
       mistake: "table.remove(bag) without index - the last one disappears",
       fix: "indexOf + remove(bag, index)",
     },
     {
       mistake: "Bag in LocalScript - read by a cheater",
       fix: "bags[player] on the server",
     },
     {
       mistake: "No show/reveal bag after changes",
       fix: "renderBag after every insert/remove",
     },
     {
       mistake: "Spam insert without debounce",
       fix: "busy[player] flag or MaxBagSize",
     },
   ],
   summary: "You built a table-based player inventory system with max capacity validation, item insertion, item removal, and inventory search.",
  practiceTask: {
    "title": "Hands-on Practice: Inventory System (InventorySystem_v1)",
    "difficulty": "intermediate",
    "description": "**Objective:** Develop a robust slot-capped inventory system using Lua tables and helper methods.\n\n### Part A: Inventory State\n1. In `ServerScriptService`, create a Script named `InventoryManager`.\n2. Define:\n```lua\nlocal MAX_SLOTS = 4\nlocal playerInventory = {}\n```\n\n### Part B: Add & Remove Operations\n1. Write `addItem(item)` that guards on `#playerInventory < MAX_SLOTS`.\n2. Write `removeItem(itemName)` that finds and removes the item index.\n3. Write `printInventory()` to log current slots.\n\n### Part C: Capacity Testing\n1. Add 4 items, then attempt to add a 5th item.\n2. Confirm the 5th item is safely rejected with \"Inventory full\".\n3. Remove 1 item, re-add, and verify successful placement.\n4. Save Place as `Lesson 4.3 - InventorySystem_v1`.",
    "hints": [
      "Checking #inventory < MAX_SLOTS prevents array overflow.",
      "Iterate with ipairs to locate items before removal.",
      "Return boolean status from addItem for UI feedback."
    ],
    "optionalChallenge": "Implement item stacking for consumables: {Name = \"Potion\", Count = 3}."
  },
  quiz: {
   title: "Test 4.3 - 4.3 - insert/remove inventory",
   passingScore: 70,
   questions: [
     {
       id: "q1",
       type: MC,
        question: "What is the topic of lesson 4.3?",
        options: [
          "Dictionaries + price",
          "insert / remove inventory",
         "Obby checkpoints",
         "DataStore lite",
       ],
       correctAnswer: 1,
       explanation: "The topic of lesson 4.3 is insert/remove inventory.",
     },
     {
       id: "q2",
       type: MC,
       question: "What does table.insert(bag, \"gem\") do?",
       options: [
         "Removes gem",
         "Adds a gem to the list",
         "Creates a DataStore",
         "Disables Anchored",
       ],
       correctAnswer: 1,
       explanation: "table.insert adds an element to the list.",
     },
     {
       id: "q3",
       type: MC,
       question: "What does point table.remove need for inventory?",
       options: [
         "Item index (often after id lookup)",
         "Player's DisplayName only",
         "Definitely Skybox",
         "Uninstalling Workspace",
       ],
       correctAnswer: 0,
       explanation: "table.remove removes an element by index.",
     },
     {
       id: "q4",
       type: MC,
       question: "Why indexOf before remove?",
       options: [
         "To know the id position and not to remove someone else's element",
         "To draw Terrain",
         "To create a Team",
         "To turn off the camera",
       ],
       correctAnswer: 0,
       explanation: "indexOf looks for the id position before remove removes the element.",
     },
     {
       id: "q5",
       type: MC,
       question: "Where to keep the truth bag?",
       options: [
         "Only in LocalScript TextLabel",
         "On the server in table bags[player]",
         "In the title Part",
         "In Lighting",
       ],
       correctAnswer: 1,
       explanation: "Bag must be on the server, not just the client.",
     },
     {
       id: "q6",
       type: MC,
       question: "What must be on handover?",
        options: [
          "DataStore stores bag",
          "Only purchase without bag",
          "Complete Obby",
          "Both add and remove with a visible display of the bag",
        ],
        correctAnswer: 3,
        explanation: "The lesson requires both addition and deletion with a visible bag.",
     },
     {
       id: "q7",
       type: MC,
       question: "Why debounce on Prompt?",
       options: [
         "To avoid spamming insert with dozens of calls",
         "To remove Config",
         "To change the UserId",
         "To disable print",
       ],
       correctAnswer: 0,
       explanation: "Debounce protects against spamming insert/remove calls.",
     },
     {
       id: "q8",
       type: MC,
       question: "What type of bag elements is recommended before 4.4?",
       options: [
         "Rows id",
         "Entire copies of Workspace",
         "Functions",
         "Only Color3 without id",
       ],
       correctAnswer: 0,
       explanation: "Bag should contain stable id strings, not copies of instances.",
     },
     {
       id: "q9",
       type: MC,
       question: "What is the exact name of the Save?",
       options: [
          "Lesson 4.2 - Dictionary Price",
          "Lesson 4.4 - Array of Records",
          "Lesson 4.5 - ModuleScript Config",
          "Lesson 4.3 - Inventory Insert Remove",
       ],
       correctAnswer: 3,
       explanation: "Correct save name for lesson 4.3.",
     },
     {
       id: "q10",
       type: MC,
       question: "What to do if the id is not in the bag?",
       options: [
         "Silently call remove(1)",
         "Process nil and notify the player",
         "Delete all bags",
         "Beauty Studio",
       ],
       correctAnswer: 1,
       explanation: "Need to process nil, not remove random element.",
     },
     {
       id: "q11",
       type: MC,
       question: "What is the next lesson after 4.3?",
       options: [
         "4.4 Array of records",
         "5.1 Three Biomes",
         "4.1 Arrays",
         "6.7 DataStore",
       ],
       correctAnswer: 0,
       explanation: "The next lesson of module 4 is 4.4.",
     },
     {
       id: "q12",
       type: MC,
       question: "Why is it bad to cache an index for a long time?",
       options: [
         "After other insert/remove, the index may get corrupted",
         "Because ipairs is then prohibited",
         "Because #bag is always 0",
         "Because the server does not see the number",
       ],
       correctAnswer: 0,
       explanation: "insert/remove change positions, so the cached index becomes invalid.",
     },
     {
       id: "q13",
       type: MC,
       question: "Can a purchase from the price be an entry into the inventory?",
       options: [
         "Yes, as an optional add script after canAfford",
         "No, price and bag are never connected",
         "Only through Terrain",
         "Serverless LocalScript only",
       ],
       correctAnswer: 0,
       explanation: "Purchase can add item to bag after checking canAfford.",
     },
     {
       id: "q14",
       type: MC,
       question: "Why MaxBagSize?",
       options: [
         "To limit list growth from spam/bugs",
         "To increase the FPS must be doubled",
         "To replace remove",
         "To turn off Prompt",
       ],
       correctAnswer: 0,
       explanation: "MaxBagSize limits bag growth in case of spam or errors.",
     },
     {
       id: "q15",
       type: MC,
       question: "What is NOT an objective of 4.3?",
        options: [
          "Teach insert/remove",
          "Show live bag",
          "Build a 3D inventory model",
          "Prepare id for directory 4.4",
        ],
        correctAnswer: 2,
        explanation: "Building a 3D model is not the main goal of lesson 4.3.",
     },
   ],
 }
}


export const enLesson44 = {
 lessonId: "lesson-roblox-4-4",
 moduleId: "module-04",
 order: 4,
 title: "4.4 - Array of records",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Declare an array of records as a list of dictionaries with shared fields",
 "Read string fields through catalog[i].field and go through the ipairs catalog",
 "Build signatures/print from several fields of one record",
 "Explain the difference between an id array, a price dictionary, and an array of records",
 "Prepare Catalog for export to Config (4.5) and showcase (4.7)",
 ],
 theory: {
   sections: [
     {
       title: "Today's mission",
        content: `In **4.3** the inventory can already insert/remove id. Today, the next level is table: **array of records** - a list of dictionaries where each element has the same fields (id, name, price, power...). This is a "table within a table".
        You build a **directory** - the basis of the showcase and Config.
        Array of names (4.1) - a list of surnames. The record is a questionnaire with several columns. Today you are filling out a file, not just a list of surnames.
        **Do this now (2 min):** Save Place as Lesson 4.4 - Array of Records and create Script \`RecordsLab\`.`
     },
     {
       title: "What is a record in human language",
       content: `An entry is a single dictionary with fields about one thing:
       \`{ id = "apple", name = "Apple", price = 5, power = 1 }\`
       Array of records - several such dictionaries numbered 1, 2, 3...:       \`\`\`lua
      local catalog = {
       { id = "apple", name = "Apple", price = 5, power = 1 },
       { id = "gem", name = "Gem", price = 25, power = 3 },
       { id = "potion", name = "Potion", price = 10, power = 2 },
}
\`\`\`Why not three separate arrays \`names\`, \`prices\`, \`powers\`?
- it is easy to knock down indexes
- it is difficult to add a product
- more difficult to read
One row = one entity. This is the main idea of ​​4.4.
**Do this now (3 min):** write down 3 products on paper with the fields id, name, price, power.`
     },
     {
       title: "Reading fields and looping",
       content: `Row index:
       \`local row = catalog[2]\`
       \`print(row.name, row.price) -- Gem 25\`
       Cycle:       \`\`\`lua
for i, row in ipairs(catalog) do
  print(i, row.id, row.price)
end
\`\`\`Length: \`#catalog\`.
Typical errors:
- \`catalog.price\` instead of \`catalog[i].price\` (the array does not have a common price)
- \`row[1]\` instead of \`row.id\` if you built a dictionary with named keys
- confuse i (line number) with id (product identifier line)
Remember: **i** is a position in the list. **id** - stable entity name for inventory and save.
**Do this now (5 min):** declare a catalog with ≥3 entries and print all id and price in a loop.`
     },
     {
       title: "Signature from multiple fields",
       content: `The strength of the record is to collect a row for the player without three parallel tables:
       \`local label = row.name .. " - " .. row.price .. "</span><span>pwr " .. row.power\`
       Or BillboardGui.Text / print of the same.
       Mini-spawn (optional): for each row, create a Part, display Name = row.id, signature = label. This is a bridge to the 4.7 showcase, but Output or 3 signatures are enough today.
       Do not parse the price from the Part name. Name can = id; price take from row.price.
       **Do Now (5 min):** Make a function \`formatRow(row)\` that returns a signature string and call it in a loop.`
     },
     {
       title: "Search by id",
       content: `Inventory holds id. The directory keeps records. Bridge - search:       \`\`\`lua
local function findById(catalog, id)
    for _, row in ipairs(catalog) do
        if row.id == id then
            return row
        end
    end
    return nil
end
\`\`\`After insert "gem" in bag you do
\`findById(catalog, "gem")\` and read price/power for the GUI.
This is more important than a "beautiful store". Without search, inventory and catalog live in different universes.
Check:
1. existing id → row
2. nonexistent → nil and secure message
**Do this now (5 min):** write findById and check both cases with print.`
     },
     {
       title: "Comparison of three forms of table",
       content: `|Form|Example|Question|
       |-----|-------|-------|
       |Array (4.1)|\`{"Alpha","Beta"}\`|What is numbered i?|
       |Dictionary-price (4.2)|\`{ Apple = 5 }\`|How much is the key?|
       |Array of records (4.4)|\`{{id=, price=}}\`|What are all fields of entity #i / id?|
       |Inventory (4.3)|\`{"apple","gem"}\`|What does the player have now?|
       When what:
- only the price of one key is needed quickly → dictionary
- you need name+price+power together → record
- a live list of the estate is required → bag ids
- the order of display on the showcase is required → an array of records
When submitting, explain in one sentence why catalog is not the same as bag.
**Do this now (3 min):** in the Script comment, write 4 lines "form → why should I".`
     },
     {
       title: "The fields and discipline of the scheme are the same",
       content: `All lines of the catalog must have **the same field scheme**. If one has power, and the other does not - the GUI will drop to nil.
       Scheme rules on 4.4:
- mandatory: id, name, price (or your equivalent)
- optional, but then with default in the reading code
- id is unique within the catalog
Uniqueness check (educational):\`\`\`lua
local seen = {}

for _, row in ipairs(catalog) do
    assert(seen[row.id] == nil, "duplicate id")
    seen[row.id] = true
end
\`\`\`It is not necessary to assert at the beginning of the lesson - a print warning is enough. But think about uniqueness already now.
**Do this now (4 min):** make sure all ≥3 records have the same keys; ids are not repeated.`
     },
     {
        title: "Entries in different domains",
        content: `Records work wherever there is the same field scheme:
        \`{ id = "apple", name = "Apple", price = 5, power = 1 }\`
        You can have several directories next to each other:
        - \`catalog\` - goods
        - \`upgrades\` - improvements (if needed)
        Both are arrays of records with different fields. But the checklist looks at \`catalog\` as the main artifact.
        **Do this now (3 min):** either leave one demo upgrade with 2-3 lines as an example, or focus only on the product catalog - the main thing is not to lose the topic of the records.`
     },
     {
       title: "Balance change through data",
        content: `Advantage of records: change \`price\` / \`power\` in table → Play → signatures and logic that reads the fields change. There is no need to look for magic numbers in five Scripts (the full output in ModuleScript will be in **4.5**; today one Script from the catalog above is enough).
       Exercise:
1. Put Gem.price = 25
2. Print the signatures
3. Changes to 30
4. Play again - the signature is different
If the signature hasn't changed, you're still reading the hardcode somewhere else.
**Do this now (4 min):** complete the exercise of changing one field and confirm the new print/signature.`
     },
     {
       title: "Typical holes 4.4",
       content: `|Hole|Symptom|Fix|
       |-----|-------|----|
       |Parallel arrays names/prices|Index failure|One record per product|
       |catalog.price|nil / error|catalog[i].price|
       |Different fields in rows|GUI crashes|Unified scheme|
       |Duplicate id|Search finds "wrong"|Unique ids|
        |Bag = full records forever|Legacy power after balance|Bag holds id|
        |No catalog|Only bag ids|Make Array of Records|
       **Do this now (3 min):** go through the table by code; fix the first red hole.`
     },
     {
       title: "What is not included in 4.4",
       content: `|Not a topic|Where|
       |-------|----|
       |Full ModuleScript require|4.5|
       |DataStore|4.6|
        |UI cycle of the entire showcase|4.7|
        |insert/remove were already in 4.3 - here just show that bag ids are connected to catalog via findById. Do not rewrite the entire inventory from scratch, if it already exists.
        **Do Now (2 min):** Separate RecordsLab from unnecessary UI to keep the demo short.`
     },
     {
       title: "Submission checklist 4.4",
       content: `- [ ] catalog with ≥3 entries
- [ ] For each ≥3 fields, the scheme is the same
- [ ] ids are unique
- [ ] The ipairs loop prints/builds signatures from fields
- [ ] There is reading catalog[i].field
- [ ] Is findById (or equivalent)
- [ ] Explanation of bag ids vs catalog records
- [ ] Test: changing the field changes the output
- [ ] There is no mandatory delivery "only purchase without catalog"
- [ ] Save: Lesson 4.4 - Array of Records
The file is ready. Next, export it to ModuleScript.
**Do this now (3 min):** ticks + final Save Place.`
     }
   ],
 },
 practice: {
 title: "Practice: Array of Records",
 duration: 30,
 description: `**Goal:** create a product catalog as an array of records and show how to read the fields of each record.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Create a catalog with 3 entries.
2. Write an ipairs loop that prints id and price.
3. Show the signature through row.name and row.price.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Implement findById(catalog, id).
2. Connect the search to the inventory or the purchase button.
3. Change the price in one record and check that the output changes.
4. Save Lesson 4.4 - Array of Records.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Add the fourth product to the catalog and check that it appears without manual UI editing.`,
 },
 ],
 },
 commonMistakes: [
     {
       mistake: "catalog.price instead of catalog[i].price",
       explanation: "There is no common field price in the array of records; you need to refer to a specific row through an index.",
       correctApproach: "Accessing a record via a string index or a loop",
     },
     {
       mistake: "Different fields in different records",
       explanation: "If the field scheme is different, the GUI and read code fall to nil.",
       correctApproach: "All lines have the same id/name/price/power scheme",
     },
     {
       mistake: "Duplicate id no rule",
       explanation: "Duplicate ids break the findById search, which only finds the first match.",
       correctApproach: "Unique ids in the directory + check before insert",
     },
     {
       mistake: "Bag holds full records instead of id",
       explanation: "Inventory should contain only identifiers; the full data lives in Catalog/Config.",
       correctApproach: "Bag = id array; Catalog = real true information",
     },
   ],
   summary: "You learned how to structure code with ModuleScripts in ReplicatedStorage, import them using require(), and eliminate duplicate game constants across scripts.",
  practiceTask: {
    "title": "Hands-on Practice: Shared Config Module (ConfigModule_v1)",
    "difficulty": "intermediate",
    "description": "**Objective:** Build a central configuration ModuleScript in ReplicatedStorage and require it from server scripts.\n\n### Part A: ModuleScript\n1. In `ReplicatedStorage`, insert a `ModuleScript` named `GameConfig`:\n```lua\nlocal GameConfig = {}\nGameConfig.VERSION = \"1.0.0\"\nGameConfig.START_COINS = 100\nGameConfig.DEFAULT_WALKSPEED = 16\nGameConfig.SPRINT_WALKSPEED = 28\nreturn GameConfig\n```\n\n### Part B: Requiring the Module\n1. In `ServerScriptService`, create a Script:\n```lua\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\")\nlocal GameConfig = require(ReplicatedStorage:WaitForChild(\"GameConfig\"))\n\ngame.Players.PlayerAdded:Connect(function(player)\n    player.CharacterAdded:Connect(function(character)\n        local humanoid = character:WaitForChild(\"Humanoid\")\n        humanoid.WalkSpeed = GameConfig.DEFAULT_WALKSPEED\n    end)\nend)\n```\n\n### Part C: Verification\n1. Playtest: verify walk speed is applied from the module.\n2. Change the module value to 24, retest, and verify instant balance updates without touching the player setup script.\n3. Save Place as `Lesson 4.4 - ConfigModule_v1`.",
    "hints": [
      "Every ModuleScript must end with return TableName.",
      "Place shared modules in ReplicatedStorage.",
      "Always use WaitForChild before require."
    ],
    "optionalChallenge": "Add a helper method GameConfig.getDropChance(rarity) to the module."
  },
  quiz: {
   title: "Test 4.4 - 4.4 - Array of records",
   passingScore: 70,
   questions: [
     {
       id: "q1",
       type: MC,
       question: "What is a record array in 4.4?",
       options: [
         "One line of text in Output",
         "List of dictionaries with common fields",
         "Only Folder without data",
         "Humanoid.Health table",
       ],
       correctAnswer: 1,
       explanation: "An array of records is a list of records with the same field pattern.",
     },
     {
       id: "q2",
       type: MC,
       question: "How to read the price of the second product?",
       options: [
         "catalog.price",
         "catalog[2].price",
         "price.catalog[2]",
         "catalog:price(2)",
       ],
       correctAnswer: 1,
       explanation: "The second element requires the catalog[2].price index.",
     },
     {
       id: "q3",
       type: MC,
       question: "Why is a single record better than parallel arrays of names/prices?",
       options: [
         "Because it is more difficult to make a mistake with indexes and add a product",
         "Because the Luau prohibits multiple arrays",
         "Because ipairs does not work with arrays",
         "Because Parts then disappear",
       ],
       correctAnswer: 0,
       explanation: "A single entry reduces the risk of index errors and simplifies the addition of new products.",
     },
     {
       id: "q4",
       type: MC,
       question: "Why findById?",
       options: [
         "To connect the id from the inventory to the catalog string",
         "To delete Baseplate",
         "To turn off Lighting",
         "To create a Team",
       ],
       correctAnswer: 0,
       explanation: "findById finds a directory entry by id from bag.",
     },
     {
       id: "q5",
       type: MC,
       question: "What should be common in all catalog lines?",
       options: [
         "Random set of fields",
         "Same key scheme",
         "Definitely different keys",
         "Only color without id",
       ],
       correctAnswer: 1,
       explanation: "All records must have the same field scheme for consistent access.",
     },
     {
       id: "q6",
       type: MC,
       question: "How does bag differ from catalog?",
       options: [
         "Bag - what the player has (often ids); catalog - product description",
         "They are always identical to table",
         "Bag stores only Lighting",
         "Catalog exists only on the client",
       ],
       correctAnswer: 0,
       explanation: "Bag contains the player id, and catalog describes the goods.",
     },
     {
       id: "q7",
       type: MC,
        question: "What is the focus of lesson 4.4?",
        options: [
          "DataStore only",
          "Array of records / directory of entities",
          "Skybox only",
          "Building a 3D showcase",
        ],
        correctAnswer: 1,
        explanation: "Lesson 4.4 focuses on the record array and directory.",
     },
     {
       id: "q8",
       type: MC,
       question: "What is the exact name of the Save?",
       options: [
          "Lesson 4.3 - Inventory Insert Remove",
          "Lesson 4.5 - ModuleScript Config",
          "Lesson 4.6 - DataStore lite",
          "Lesson 4.4 - Array of Records",
       ],
       correctAnswer: 3,
       explanation: "The correct save name for 4.4 is Lesson 4.4 - Array of Records.",
     },
     {
       id: "q9",
       type: MC,
       question: "What will happen in 4.5 with catalog?",
       options: [
         "It will be taken out almost verbatim in the ModuleScript Config",
         "It will be deleted forever",
         "It will become Terrain",
         "It will replace SpawnLocation",
       ],
       correctAnswer: 0,
       explanation: "Catalog in 4.5 will move to ModuleScript Config.",
     },
     {
       id: "q10",
       type: MC,
       question: "Is there a minimum number of entries?",
       options: [
         "Zero",
         "One without fields",
         "Exactly one hundred",
         "At least three",
       ],
       correctAnswer: 3,
       explanation: "A catalog with several entries is required for submission.",
     },
     {
       id: "q11",
       type: MC,
       question: "Why should the id be unique?",
       options: [
         "So that search and inventory do not confuse goods",
         "Because otherwise Studio won't open",
         "Because #catalog then = 0",
         "Because ipairs is prohibited",
       ],
       correctAnswer: 0,
       explanation: "Unique ids are required for the search to find the correct product.",
     },
     {
       id: "q12",
       type: MC,
       question: "How to change the balance correctly?",
       options: [
         "Edit fields in catalog/data",
         "Just rename the Baseplate",
         "Delete all Scripts",
         "Change the player's DisplayName",
       ],
       correctAnswer: 0,
       explanation: "The balance is changed in the catalog data, not in the logic or UI.",
     },
     {
       id: "q13",
       type: MC,
       question: "What does i mean in for i, row in ipairs(catalog)?",
       options: [
         "The position of the row in the array",
         "The product id is required",
         "the price",
         "UserId",
       ],
       correctAnswer: 0,
       explanation: "i is the position of the item in the catalog array.",
     },
     {
       id: "q14",
       type: MC,
       question: "What is the next lesson after 4.4?",
       options: [
         "4.5 ModuleScript + Config",
         "5.1 Three Biomes",
         "4.1 Arrays",
         "6.1 Simulator",
       ],
       correctAnswer: 0,
       explanation: "After 4.4 comes 4.5.",
     },
     {
       id: "q15",
       type: MC,
       question: "What is NOT required to pass 4.4?",
       options: [
         "catalog with fields",
         "findById or equivalent",
          "Complete DataStore from previous modules",
         "A cycle of signatures from the fields",
       ],
       correctAnswer: 2,
        explanation: "A full upgrade cycle is optional for 4.4.",
     },
   ],
 }
}


export const enLesson45 = {
 lessonId: "lesson-roblox-4-5",
 moduleId: "module-04",
 order: 5,
 title: "4.5 - ModuleScript + Config",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Create a ModuleScript Config with a return table and two data sections",
 "Connect Config with ≥2 different Scripts via require",
 "Remove ≥2 magic numbers in favor of Config",
 "Pass the test: change the number in Config → Play → the behavior has changed",
 "Explain the difference between ReplicatedStorage and ServerStorage for Config",
 ],
 theory: {
   sections: [
     {
       title: "Today's mission",
       content: `In **4.4** you have already collected an array of records. Today you put the real truth of the data in the **ModuleScript Config**.

This is a **single balance sheet** lesson read by multiple Scripts.

Without Config, the Tables module begins to fall apart: the price is in the button, another in the GUI, the third in the comment. With Config, you change the number once, and the behavior of the world follows.

**Summary to remember:**
- ModuleScript + Config is the topic of this lesson;
- one shared table for several Scripts - a way to connect one truth.

**Do Now (2 min):** Save Place as Lesson 4.5 - ModuleScript Config and create the ModuleScript Config.`
     },
     {
       title: "Why ModuleScript and not copy and paste",
       content: `A normal Script runs by itself. A ModuleScript **returns a value** via return, and other files get it through require.

Copy-paste problem:
- PRICE_APPLE = 5 in three Scripts;
- you change one and forget two;
- showcase and purchase drift apart.

"One giant sheet" problem:
- hard to find balance among Touched logic;
- scary to touch numbers;
- harder to pass checkpoint.

Config separates **data** from **behavior**. Scripts become thin: read → do.

This is the same discipline you will need in Obby for hazards and in Simulator for economies. Today you plant the habit on a small catalog.

**Do this now (3 min):** find in the Place at least one magic price or limit number and write its Config name, for example Prices.Apple.`
     },
     {
       title: "Config skeleton: return table",
       content: `Typical form:
\`\`\`lua
local Config = {
    Prices = {
        Apple = 5,
        Gem = 25,
    },
    Catalog = {
        { id = "apple", name = "Apple", price = 5, power = 1 },
        { id = "gem", name = "Gem", price = 25, power = 3 },
    },
    SaveKeyPrefix = "SmartCode_M4_",
    MaxBagSize = 20,
}

return Config
\`\`\`

Rules:
- the last line of the module is return;
- do not put Instance into Config "just in case";
- key names are stable (Apple ≠ apple unless you agreed);
- keep sections: Prices, Catalog, Limits, Meta.

You can start with Prices only. By end of lesson you should have at least two sections so require is meaningful for different Scripts.

Do not run heavy logic at module level: do not wait for players, do not spawn Parts at require time. Config should hold only data and pure helper functions if needed.

**Do this now (6 min):** fill Config with at least two sections and return Config.`
     },
     {
       title: "require: how to connect",
       content: `From a server Script:

\`\`\`lua
local Config = require(path.to.Config)
print(Config.Prices.Apple)

path.to.Config is the ModuleScript Instance in the tree, often game.ReplicatedStorage.Config or script.Parent.
\`\`\`
Important:
- \`require\` of the same ModuleScript returns **one and the same** table cache;
- changing a field at runtime from one Script is visible to others - be careful;
- for lesson balance, better change values in the editor and Play again.

Verify from two Scripts:
- PriceDemo prints Prices;
- CatalogDemo prints #Catalog or the first id.

If one require fails, check ModuleScript location and whether there is a cyclic require A ↔ B.

**Do this now (5 min):** require from two Scripts and print different Config fields.`
     },
     {
       title: "Where Config lives: ReplicatedStorage vs ServerStorage",
       content: `Place, who can see it, and when it fits:

| Place | Who sees it | When it fits |
|------|------------|--------------|
| ReplicatedStorage | server and client | catalog / labels that UI may read |
| ServerStorage | server only | secret coefficients, anti-cheat truth |

For 4.5 in this course, **ReplicatedStorage.Config** is often convenient: LocalScript can draw the price, and the server still validates purchase.

Safety rule:
- client label = hint;
- server require + canAfford = truth;
- never trust that the client "already checked Config".

If you put Config in ServerStorage, GUI gets prices via Remote or replicated labels the server set.

Do not duplicate ConfigClient and ConfigServer with different numbers. One truth. Access differs only.

**Do this now (3 min):** put Config in the chosen place and note in a comment why that place.`
     },
     {
       title: "Remove magic numbers",
       content: `Refactor ritual:

1. Find something like if coins >= 5 then or Prompt.ActionText = "5".
2. Replace it with Config.Prices.Apple or item.price from Catalog.
3. Play: behavior is the same.
4. Change in Config 5 -> 7.
5. Play: behavior is new **without** editing Script logic.

If step five still needs edits in three more files, the refactor is not done.

Typical magic spots:
- purchase prices;
- bag size limit (MaxBagSize);
- debounce seconds (can also live in Config.Timing);
- store prefix names for upcoming 4.6.

You do not need to extract absolutely everything. local DEBOUNCE = 0.2 next to Touched is sometimes fine. Extract what you **balance and submit**.

**Do this now (7 min):** remove at least 2 magic numbers into require fields; run the Config-change test.`
     },
     {
       title: "Pure helpers in Config (optional)",
       content: `Sometimes it helps to put one small function in Config:

\`\`\`lua
function Config.canAfford(coins, itemId)
    local price = Config.Prices[itemId]
    return price ~= nil and coins >= price
end
\`\`\`
Or Catalog lookup by id. This is still data + pure logic without Touched.

Benefits:
- one check for showcase and test buttons;
- fewer canAfford duplicates.

Do not turn Config into a "god module" with half the game. If Remotes, Touched, DataStore appear, those are separate Scripts that read Config.

Boundary: Config knows **what costs what** and **which items exist**. PurchaseService knows **when** to deduct.

**Do this now (4 min):** add one helper (canAfford or findById) and call it from the purchase/demo Script.`
     },
     {
       title: "Config and the array of records from 4.4",
       content: `4.4 gave the form {{ id = ..., price = ..., power = ... }}. 4.5 gives that form a **home**.

Recommendation:
- Catalog in Config = array of records;
- Prices either mirrors briefly, or is derived from Catalog (pick one).

Anti-pattern: Catalog in Script A, Prices in Script B, "almost the same" numbers. On submission show one ModuleScript.

Showcase 4.7 will be a loop over Config.Catalog. If Catalog is already in Config today, the boss starts with half the foundation ready.

**Do this now (3 min):** move the array of records into Config.Catalog if it still sits in a normal Script.`
     },
     {
       title: "What is out of scope for 4.5",
       content: `Not topics for this lesson:

| Not a topic | Where it goes |
|--------|-------------|
| complex collection/automation logic | not submitted in this lesson |
| full DataStore Get/Set | 4.6 |
| full showcase build loop | 4.7 |
| Claim plot on PlayerAdded | not a Config goal |

Do not spend the lesson on a perfect shop UI. print and one purchase / canAfford check that reads Config is enough.

**Do this now (2 min):** confirm Config is the single place for data.`
     },
     {
       title: "require errors and how to read them",
       content: `Common messages and causes:

| Symptom | Likely cause |
|--------|------------------|
| Infinite yield possible | waiting for an Instance that does not exist |
| Module code did not return exactly one value | forgot return or returned nothing |
| Requested module experienced an error | syntax inside Config |
| cyclic require | A requires B, B requires A |

Debug:
- open Config alone - any red underlines;
- print on the first module line (temporary) - does it run at all;
- check the require path;
- remove cyclic dependencies.

Do not hide the error with empty pcall(require) and no print. First learn to see the cause.

**Do this now (3 min):** intentionally break the require path, watch the error, restore the correct path.`
     },
     {
       title: "Demo for the instructor (2 minutes)",
       content: `Submission scenario:

1. Open Config: show Prices / Catalog.
2. Open Script A: the require line.
3. Open Script B: the same require.
4. Change Apple from 5 to 8.
5. Play: print / canAfford shows 8.
6. Restore 5 or leave it by agreement.

Say: "single truth", "do not scatter numbers", "prep for save and showcase".

If the demo runs longer than 3 minutes because of file hunting, rename and arrange Folder Data.

**Do this now (4 min):** run scenario 1-5 once out loud.`
     },
     {
       title: "Submission checklist 4.5",
       content: `- [ ] ModuleScript Config exists;
- [ ] return and at least two sections;
- [ ] require from ≥2 Scripts;
- [ ] no leftover magic numbers in key places;
- [ ] changing a number in Config really changes Play behavior;
- [ ] Config location choice justified: ReplicatedStorage or ServerStorage;
- [ ] Save Place as Lesson 4.5 - ModuleScript Config.

Single truth is ready. Next: teach its neighbor cloud progress.

**Do this now (3 min):** checkboxes + final Save Place.`
     }
   ],
 },
 practice: {
 title: "Practice: ModuleScript Config",
 duration: 30,
 description: `**Goal:** move data into ModuleScript Config and connect it from several Scripts.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Create ModuleScript Config with Prices and Catalog.
2. Write return Config.
3. Connect Config from two Scripts via require.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Replace at least 2 magic numbers with Config.
2. Play: changing a number in Config changes behavior.
3. Save Lesson 4.5 - ModuleScript Config.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Move one extra parameter, for example MaxBagSize or SaveKeyPrefix, into Config.`,
 },
 ],
 },
 commonMistakes: [
     {
       mistake: "Config does not return a value",
       fix: "Last line: return Config",
     },
     {
       mistake: "Different numbers in Config and in the buy button",
       fix: "Always require(Config)",
     },
     {
       mistake: "Instance in Config",
       fix: "Config is data only, not Parts",
     },
     {
       mistake: "Cyclic require A↔B",
       fix: "Config is data only, with no circular dependencies",
     },
   ],
   summary: "You learned how to design centralized game balance tables, manage enemy tiers, reward multipliers, and loot drops from a clean configuration file.",
  practiceTask: {
    "title": "Hands-on Practice: Game Balance Module (GameBalance_v1)",
    "difficulty": "intermediate",
    "description": "**Objective:** Separate game stats into a dedicated balance ModuleScript and spawn enemies procedurally.\n\n### Part A: Balance Module\n1. In `ReplicatedStorage`, add a `ModuleScript` named `EnemyBalance`:\n```lua\nlocal EnemyBalance = {\n    Slime = { Health = 50, Damage = 10, CoinReward = 15, Speed = 12, Color = \"Bright green\" },\n    Skeleton = { Health = 100, Damage = 25, CoinReward = 45, Speed = 16, Color = \"Medium stone grey\" },\n    Boss = { Health = 350, Damage = 50, CoinReward = 200, Speed = 10, Color = \"Really red\" }\n}\nreturn EnemyBalance\n```\n\n### Part B: Data-Driven Spawner\n1. In `ServerScriptService`, create an `EnemySpawner` script that pulls stats directly from `EnemyBalance` when instantiating enemies.\n\n### Part C: Verification\n1. Spawn each enemy type and verify their stats match the balance table.\n2. Save Place as `Lesson 4.5 - GameBalance_v1`.",
    "hints": [
      "Never hardcode stats inside gameplay trigger scripts.",
      "Centralized configs allow rapid live-game balancing without breaking logic.",
      "Validate enemy type existence before accessing nested keys."
    ],
    "optionalChallenge": "Add a randomized weighted loot table for drops."
  },
  quiz: {
   title: "Quiz 4.5 - 4.5 - ModuleScript + Config",
   passingScore: 70,
   questions: [
     {
       id: "q1",
       type: MC,
       question: "What is the topic of lesson 4.5?",
        options: [
          "print only, no Config",
          "ModuleScript + Config",
          "Obby hazards",
          "DataStore lite",
       ],
       correctAnswer: 1,
       explanation: "Lesson 4.5 is specifically about ModuleScript and Config.",
     },
     {
       id: "q2",
       type: MC,
       question: "How does ModuleScript differ from a normal Script for Config?",
       options: [
         "It cannot hold a table",
         "It only works on the client",
         "It replaces DataStore",
         "It returns a table that others take via require",
       ],
       correctAnswer: 3,
       explanation: "ModuleScript returns a table that other Scripts get through require.",
     },
     {
       id: "q3",
       type: MC,
       question: "Why move magic numbers into Config?",
       options: [
         "To turn off Lighting",
         "So you change balance in one place",
         "To forbid ipairs",
         "To create a Team",
       ],
       correctAnswer: 1,
       explanation: "Config lets you change balance in one place.",
     },
     {
       id: "q4",
       type: MC,
       question: "How many Scripts minimum must require on submission?",
       options: [
         "Zero",
         "Only LocalScript without server",
         "Only in Skybox",
         "Two or more",
       ],
       correctAnswer: 3,
       explanation: "For Config, several Scripts must use require.",
     },
     {
       id: "q5",
       type: MC,
       question: "What must be at the end of ModuleScript Config?",
       options: [
         "print only, no return",
         "Destroy() itself",
         "return Config (or return table)",
         "GetAsync DataStore",
       ],
       correctAnswer: 2,
       explanation: "ModuleScript must return a table via return.",
     },
     {
       id: "q6",
       type: MC,
       question: "Which test best proves Config?",
       options: [
         "Uninstalling Workspace",
         "Skybox change",
         "Disabling Anchored on Baseplate",
         "Changing a value in Config changes behavior without editing logic",
       ],
       correctAnswer: 3,
       explanation: "Config is proven when changing data changes behavior without editing logic.",
     },
     {
       id: "q7",
       type: MC,
       question: "What goes in DataStore, and what in Config?",
       options: [
         "Everything only in DataStore",
         "Everything only in Part names",
         "In Config - world rules; in DataStore - player progress",
         "Nothing anywhere",
       ],
       correctAnswer: 2,
       explanation: "Config is world rules, DataStore is player progress.",
     },
     {
       id: "q8",
       type: MC,
       question: "What is the exact name of the Save?",
       options: [
         "Lesson 4.5 - Player Plots",
         "Lesson 4.6 - DataStore Lite",
         "Lesson 4.5 - ModuleScript Config",
         "Lesson 5.1 - Three Biomes",
       ],
       correctAnswer: 2,
       explanation: "Correct save name for 4.5 is Lesson 4.5 - ModuleScript Config.",
     },
     {
       id: "q9",
       type: MC,
       question: "Why is trusting only client canAfford dangerous?",
       options: [
         "Because require does not work on the server",
         "Because table does not exist in Luau",
         "Because Config is forbidden in RS",
         "Because the client can fake the check",
       ],
       correctAnswer: 3,
       explanation: "The client can be faked, so validation must stay on the server.",
     },
     {
       id: "q10",
       type: MC,
       question: "What is NOT a goal of 4.5?",
        options: [
          "Create ModuleScript Config",
          "Make complex automation the main artifact",
          "Connect require from two Scripts",
          "Remove magic numbers",
        ],
        correctAnswer: 1,
        explanation: "Complex automation is not this lesson's topic.",
     },
     {
       id: "q11",
       type: MC,
       question: "Where can Config live for UI labels?",
       options: [
         "Often in ReplicatedStorage, with server validation separate",
         "Only in Lighting",
         "Only inside Terrain",
         "Only in StarterPlayer without ModuleScript",
       ],
       correctAnswer: 0,
       explanation: "Config can live in ReplicatedStorage as shared data with server validation.",
     },
     {
       id: "q12",
       type: MC,
       question: "Which lesson comes after 4.5?",
       options: [
          "5.1 Three Biomes",
          "4.1 Arrays",
          "7.1 Collection automation",
          "4.6 DataStore lite",
       ],
       correctAnswer: 3,
       explanation: "After 4.5 comes 4.6 DataStore lite.",
     },
     {
       id: "q13",
       type: MC,
       question: "What does the require cache mean?",
       options: [
         "Config is deleted after the first require",
         "A repeat require of the same ModuleScript gives the same table",
         "Each require creates a new physical file copy on disk",
         "require works only once for the whole Studio lifetime forever",
       ],
       correctAnswer: 1,
       explanation: "require caches the result and returns the same table on a later call.",
     },
     {
       id: "q14",
       type: MC,
       question: "What symptom if you forget return in ModuleScript?",
       options: [
         "Automatic DataStore",
         "Baseplate disappears",
         "Error that the module did not return exactly one value",
         "Camera disabled",
       ],
       correctAnswer: 2,
       explanation: "If ModuleScript did not return a value, require will error.",
     },
     {
       id: "q15",
       type: MC,
       question: "Why SaveKeyPrefix in Config already in 4.5?",
       options: [
         "To replace UserId",
         "To paint Skybox",
         "To disable prompts",
         "So 4.6 does not duplicate the store string in many places",
       ],
       correctAnswer: 3,
       explanation: "SaveKeyPrefix prepares reuse of the key in 4.6 without duplicating the store string.",
     },
   ],
 }
}


export const enLesson46 = {
 lessonId: "lesson-roblox-4-6",
 moduleId: "module-04",
 order: 6,
 title: "4.6 - DataStore lite",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Implement GetDataStore with the course prefix and store version",
 "Write keyForPlayer = 'u_' .. player.UserId",
 "defaultData with a minimal table + pcall GetAsync/SetAsync",
 "Connect PlayerAdded load → apply + PlayerRemoving save",
 "Set up Studio API Access or show a memory-fallback with Output",
 ],
 theory: {
   sections: [
     {
       title: "Today's mission",
       content: `In **4.5** Config is already the single balance truth in the Place. Today data learns to **survive rejoining**: DataStore lite.

This is a small, honest \`save/load\` ritual.

Lite means: you save **little** - coins, an inventory \`id\` list, 1-2 flags - and always wrap Get/Set in \`pcall\` with a clear key and a \`Success/Fail\` message in Output.

Not \`v12\` migrations, not OrderedDataStore leaderboards with a million keys. This is not giant architecture. It is a **short, reproducible case**.

**Summary:**
- \`Config\` is the world recipe;
- \`DataStore\` is the progress container between visits;
- \`profiles\` table is temporary server memory.

**Do this now (2 min):** open the Place after 4.5, Save as \`Lesson 4.6 - DataStore Lite\`, create Script \`SaveLite\` on the server.`
     },
     {
       title: "Why save right now",
       content: `Without save, inventory and coins from 4.2-4.5 live only until \`Stop\`. The player buys, leaves, and everything vanishes.

For this Tables stage that is tolerable through 4.5; for the feeling of "my progress", it is not.

What save gives the Tables module:
- proof that a table can serialize into the Roblox cloud;
- the habit of keeping a **compact schema**, not the whole Workspace;
- a bridge to showcase 4.7 (\`owned\` after \`rejoin\`) and checkpoint 4.8.

What save does NOT replace:
- server purchase validation (\`price\` is still checked);
- \`Config\` as catalog truth;
- world geometry (\`Parts\` do not "save themselves" through your lite-store).

Scope rule: if you cannot name 3 schema fields in 10 seconds, the schema is too big for 4.6.

**Do this now (3 min):** write in a Note three fields you will save today, for example \`coins\`, \`bag\`, \`ownedShopItem\`.`
     },
     {
       title: "DataStoreService: names and keys",
       content: `Basic ritual:

\`\`\`lua
local DSS = game:GetService("DataStoreService")
local store = DSS:GetDataStore("SmartCode_M4_Lite_v1")
local key = "u_" .. player.UserId
\`\`\`

The \`store\` name is like a drawer name. The key is the label of one player's folder inside that drawer.

| Element | Tip |
|--------|--------|
| \`store\` name | with course prefix + version \`v1\` |
| \`key\` | stable \`UserId\`, not \`DisplayName\` |
| \`value\` | one profile \`table\`, not 50 separate \`Set\` calls per field |

Why not \`DisplayName\`: the nick changes; \`UserId\` does not. Why version in the \`store\` name: when the schema breaks incompatibly, it is easier to open \`v2\` than to guess among old keys.

Do not create a new \`GetDataStore\` on every \`Save\` in a loop without need. Keep \`store\` in a Script variable.

**Do this now (4 min):** declare \`DSS\`, \`store\` with prefix \`SmartCode\`, and function \`keyFor(player)\`.`
     },
     {
       title: "Data schema: a small table",
       content: `Lite schema example:

\`\`\`lua
local function defaultData()
    return {
        coins = 0,
        bag = {},
        flags = { starterPack = false },
        schema = 1,
    }
end
\`\`\`

Field notes:
- \`coins\` - currency number;
- \`bag\` - \`id\` array (link to 4.3);
- \`flags\` - dictionary of small flags;
- \`schema\` - data shape number (for later).

What NOT to put in lite today:
- references to \`Instance\`;
- functions;
- giant chat logs;
- full copies of \`Config\` / catalog (\`Catalog\` already lives in ModuleScript).

If inventory holds full records, simplify to \`id\`. \`Config\` / catalog stay the source of \`name\` / \`price\` / \`power\` after \`load\`.

**Do this now (4 min):** write \`defaultData()\` and confirm all values are numbers, \`bool\`, strings, or tables of those.`
     },
     {
       title: "pcall: Get and Set without a heroic crash",
       content: `Network and API can fail. So:

\`\`\`lua
local ok, result = pcall(function()
    return store:GetAsync(key)
end)
\`\`\`

What results mean:
- if \`ok == false\`, \`result\` holds the error - do not assume data is simply missing;
- if \`ok == true\` and \`result == nil\`, this is a new player / empty key - give \`defaultData\`;
- if \`ok == true\` and there is a \`table\`, merge with \`default\` (below).

Save:

\`\`\`lua
local ok, err = pcall(function()
    store:SetAsync(key, data)
end)
\`\`\`

Always print status:
- \`[SaveLite] LOAD ok user=...\`
- \`[SaveLite] LOAD fail ...\`
- \`[SaveLite] SAVE ok ...\`

Without Output you cannot tell "save works" from "I think it works".

\`UpdateAsync\` helps later for atomicity; for 4.6, \`GetAsync\` + \`SetAsync\` with awareness of the risk is enough. Do not promise yourself AAA \`session-locking\` today.

**Do this now (6 min):** implement \`loadPlayer(player)\` and \`savePlayer(player, data)\` with \`pcall\` and status \`print\`.`
     },
     {
       title: "Merge with default and schema shield",
       content: `Old saves may lack a new field. After \`GetAsync\`:

- take \`defaultData()\`;
- if \`loaded\`, copy known fields on top;
- if a field type is broken (\`coins\` became a string), roll that field back to \`default\`;
- keep \`schema\` current.

Pseudo-logic:
- no \`bag\` → \`bag = {}\`;
- \`coins\` is not a \`number\` → \`coins = 0\`;
- extra cloud fields you may ignore.

This is not a full migration. It is a **nil shield** so 4.7 does not crash on \`pairs(nil)\`.

Do not trust the client: even if a Remote brings "my save", the server \`load/save\`s itself. The client may at most ask "save now".

**Do this now (4 min):** after \`load\` run \`merge\`; intentionally check a player with no save (\`nil -> default\`).`
      },
     {
       title: "When to load and when to save",
       content: `Typical skeleton:

| Event | Action |
|------|-----|
| \`PlayerAdded\` | \`load\` → put data in server memory → apply to \`leaderstats\` / inventory |
| \`PlayerRemoving\` | gather the current \`table\` → \`save\` |
| \`BindToClose\` | save everyone still in the game (short Studio / server safety) |
| Save button (Studio) | manual save for testing without leaving |

Server memory: \`local profiles = {}\` → \`profiles[player] = data\`. All purchases change \`profiles[player]\`, not "some random local table".

On \`Stop\` in Studio, \`PlayerRemoving\` sometimes behaves differently than on a live server - so a test \`Save\` button is very useful in class.

Do not save every \`0.1\` s in a loop. Rate limits are real. Lite: on leave + rare button + optionally autosave every \`N\` minutes later.

**Do this now (5 min):** wire \`PlayerAdded\` / \`Removing\` and the \`profiles\` table; add a \`Part\` / \`Prompt\` \`SaveNow\` for testing only.`
     },
     {
       title: "Studio API Access and an honest fallback",
       content: `In Studio, \`DataStore\` works only if Game Settings has **Enable Studio Access to API Services** on and the place is published with permissions.

If API is off:
- \`Get/Set\` inside \`pcall\` will fail;
- you still submit the ritual code;
- add \`memory-fallback\`: \`profiles\` live until \`Stop\`, and Output honestly says \`API fail → memory only\`.

Honesty beats fake success. The instructor values \`pcall\` + a message. Not a silent Script crash.

For class proof, one option is enough:
- API on: \`load -> change coins -> save -> Stop -> Play -> coins still there\`;
- API off: show \`fail-print\` + \`memory profile\` + ready \`SetAsync\` code.

Do not spend an hour publishing the Place if the instructor accepted a memory-demo with full code.

**Do this now (3 min):** check Game Settings; note in the stand README which test mode you use.`
     },
     {
       title: "Apply data to the world",
       content: `Load with no in-game effect is half the work. After a successful \`load\`:

- set \`leaderstats.Coins\` (or your \`IntValue\`) from \`data.coins\`;
- restore \`bag\`: GUI / Output list of \`id\`;
- flags: if \`starterPack\`, do not grant it again.

Reverse path before \`save\`:
- read current \`coins\` from server state (not from client GUI as truth);
- gather \`bag\` from \`profiles\` or server inventory;
- \`SetAsync\`.

Anti-pattern: save what the client sent on a Remote without checks. Remote can say \`coins = 999999\`. The server stores only its \`profiles[player]\`.

Link to \`Config\`: prices and catalog are NOT in \`DataStore\`. The cloud holds player progress. \`Config\` holds world rules.

**Do this now (5 min):** after \`load\` sync at least \`coins\` into the world; before \`save\` read \`coins\` back into \`profiles\`.`
     },
     {
       title: "Typical lite-save holes",
       content: `| Hole | Symptom | Fix |
|------|---------|------|
| no \`pcall\` | Script crashes / stays silent | wrap \`Get/Set\` |
| \`key = Name\` | progress "vanishes" after nick change | use \`UserId\` |
| \`save Instance\` | serialization error | primitives / tables of primitives only |
| \`save\` in \`LocalScript\` | does not work / unsafe | server only |
| no \`default\` | \`nil\` index in 4.7 | \`defaultData + merge\` |
| \`save\` every frame | throttle / fail | save on leave + button |

Another hole: two Places with the same \`store\` name but different schemas and no \`schema\` / \`v1\`. Keep the \`store\` name unique for the course.

**Do this now (3 min):** walk the hole table against your code; fix the first red one.`
     },
     {
       title: "What is out of scope for 4.6",
       content: `Not topics for this lesson:

| Not a topic | Where it goes |
|--------|-------------|
| complex collection/automation logic | not submitted in this lesson |
| full showcase with slot loop | 4.7 |
| \`session locking\` / banking | later modules |
| \`OrderedDataStore\` tops | not lite |
| saving the whole Workspace | anti-pattern |

Coins and \`bag\` may be test data. A perfect shop is not required. Required is the \`store/key/pcall/load/save/print\` ritual.

If you drag extra logic here, stop. Return focus to the \`profiles\` table.

**Do this now (2 min):** remove from the demo anything that does not help show \`save/load\` in 2 minutes.`
     },
     {
       title: "Submission checklist 4.6",
       content: `- [ ] \`DataStoreService\` and \`store\` name with course prefix;
- [ ] player key is \`u_\` + \`UserId\`;
- [ ] \`defaultData()\` and \`pcall\` around \`Get/Set\`;
- [ ] \`load\` on \`PlayerAdded\` and \`save\` on \`PlayerRemoving\` / SaveNow;
- [ ] Output shows \`LOAD ok\` / \`SAVE ok\` or an honest \`fail\`;
- [ ] no saving \`Instance\` to the cloud;
- [ ] lite schema is compact and does not hide \`nil\` into 4.7.

Lite does not mean "sloppy". It means "few fields, full ritual".

**Do this now (3 min):** run \`load -> change -> save -> check\` and final Save Place.`
     }
   ],
 },
 practice: {
 title: "Practice: DataStore Lite",
 duration: 30,
 description: `**Goal:** implement simple save/load through DataStore with pcall and defaultData.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Create DataStoreService and store with the course prefix.
2. Write key = 'u_' .. player.UserId.
3. Implement loadPlayer and savePlayer with pcall.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Add defaultData with coins, bag, and flags.
2. Wire load on PlayerAdded and save on PlayerRemoving / SaveNow.
3. Save Lesson 4.6 - DataStore Lite.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Show in Output LOAD ok / SAVE ok or an honest fail state if API is unavailable.`,
 },
 ],
 },
 commonMistakes: [
     {
       mistake: "No pcall - crash on API failure",
       fix: "Always pcall(GetAsync/SetAsync)",
     },
     {
       mistake: "Key = DisplayName instead of UserId",
       fix: "key = 'u_' .. player.UserId",
     },
     {
       mistake: "No defaultData → nil crash after save",
       fix: "Merge with defaultData() after load",
     },
     {
       mistake: "Saving Instance to DataStore",
       fix: "Only primitives and tables of primitives",
     },
   ],
   summary: "You mastered Roblox DataStoreService, learned how to save and load data with SetAsync and GetAsync, and protected calls with pcall error handling.",
  practiceTask: {
    "title": "Hands-on Practice: Safe DataStore (DataStoreTest_v1)",
    "difficulty": "intermediate",
    "description": "**Objective:** Set up cloud DataStore persistence with pcall error handling.\n\n### Part A: Game Security Settings\n1. Open **Home → Game Settings → Security**.\n2. Turn ON **Enable Studio Access to API Services** and save.\n\n### Part B: Pcall DataStore Script\n1. In `ServerScriptService`, create a Script:\n```lua\nlocal DataStoreService = game:GetService(\"DataStoreService\")\nlocal coinStore = DataStoreService:GetDataStore(\"CoinStore_v1\")\n\nlocal testKey = \"Player_9999\"\nlocal testValue = 250\n\nlocal saveSuccess, saveErr = pcall(function()\n    coinStore:SetAsync(testKey, testValue)\nend)\nif saveSuccess then print(\"Data saved!\") else warn(saveErr) end\n\nlocal loadSuccess, loaded = pcall(function()\n    return coinStore:GetAsync(testKey)\nend)\nif loadSuccess then print(\"Loaded coins:\", loaded) end\n```\n\n### Part C: Verification\n1. Press Play: confirm output shows successful save and load of 250 coins.\n2. Save Place as `Lesson 4.6 - DataStoreTest_v1`.",
    "hints": [
      "Studio Access to API Services must be enabled in Game Settings.",
      "Always wrap DataStore calls in pcall to protect against network drops.",
      "Use player.UserId for unique player keys."
    ],
    "optionalChallenge": "Add fallback default values if GetAsync returns nil for first-time players."
  },
  quiz: {
   title: "Quiz 4.6 - 4.6 - DataStore lite",
   passingScore: 70,
   questions: [
     {
       id: "q1",
       type: MC,
        question: "What is the topic of lesson 4.6?",
        options: [
          "Config only, no save",
          "Three Obby biomes",
          "DataStore lite",
          "Race finish line",
       ],
       correctAnswer: 2,
       explanation: "Lesson 4.6 is about DataStore lite.",
     },
     {
       id: "q2",
       type: MC,
       question: "Why pcall around GetAsync/SetAsync?",
       options: [
         "To paint Skybox",
         "To handle API/network errors without a crash",
         "To create a Folder",
         "To disable Anchored",
       ],
       correctAnswer: 1,
       explanation: "pcall lets you handle DataStore errors without crashing the script.",
     },
     {
       id: "q3",
       type: MC,
       question: "Which key is most stable for a player?",
       options: [
         "DisplayName",
         "A random Part color",
         "Team name",
         "UserId in the key string",
       ],
       correctAnswer: 3,
       explanation: "UserId is the most stable identifier for saving a player.",
     },
     {
       id: "q4",
       type: MC,
       question: "What is typically saved in a lite schema?",
       options: [
         "The whole Workspace",
         "A small table: coins, bag ids, flags",
         "All course ModuleScripts",
         "Lighting only",
       ],
       correctAnswer: 1,
       explanation: "A lite schema stores a minimal player-progress table.",
     },
     {
       id: "q5",
       type: MC,
       question: "Where should profiles truth live?",
       options: [
         "On the server",
         "Only in LocalScript",
         "In the SpawnLocation name",
         "In chat",
       ],
       correctAnswer: 0,
       explanation: "Player progress must be stored on the server.",
     },
     {
       id: "q6",
       type: MC,
       question: "What if Get returned nil?",
       options: [
         "Crash the Script",
         "Give defaultData()",
         "Remove the player from the game",
         "Disable DataStoreService",
       ],
       correctAnswer: 1,
       explanation: "If GetAsync returned nil, apply defaultData().",
     },
     {
       id: "q7",
       type: MC,
       question: "When do you typically call save?",
       options: [
         "Only in RenderStepped every frame",
         "On PlayerRemoving and a test button",
         "Only on the client in MouseMove",
         "Never, load only",
       ],
       correctAnswer: 1,
       explanation: "Save is usually called on PlayerRemoving and via a test button.",
     },
     {
       id: "q8",
       type: MC,
       question: "Why not put the price catalog in DataStore?",
       options: [
         "Because it belongs to Config/world, not personal progress",
         "Because table does not support numbers",
         "Because GetAsync is forbidden",
         "Because UserId does not exist",
       ],
       correctAnswer: 0,
       explanation: "Prices are world settings, so they belong in Config, not DataStore.",
     },
     {
       id: "q9",
       type: MC,
       question: "What is the exact Save Place name?",
       options: [
          "Lesson 4.5 - ModuleScript Config",
          "Lesson 4.3 - Inventory Insert Remove",
         "Lesson 4.6 - DataStore Lite",
         "Lesson 4.7 - Data Driven Showcase",
       ],
       correctAnswer: 2,
       explanation: "The correct place save name for 4.6.",
     },
     {
       id: "q10",
       type: MC,
       question: "What to do when Studio API Access is off?",
       options: [
         "Silently ignore errors",
         "Show fail in Output and memory-fallback",
         "Move store into LocalScript",
         "Delete pcall",
       ],
       correctAnswer: 1,
       explanation: "You must print fail in Output and use memory-fallback.",
     },
     {
       id: "q11",
       type: MC,
       question: "Why a schema field in the data?",
       options: [
         "To speed up rendering",
         "To know the table shape version for later",
         "To replace UserId",
         "To disable GUI",
       ],
       correctAnswer: 1,
       explanation: "The schema field helps track the data shape version.",
     },
     {
       id: "q12",
       type: MC,
       question: "What is NOT a goal of 4.6?",
       options: [
         "Teach Get/Set with pcall",
          "Submit complex automation as the main artifact",
         "Build a small progress schema",
         "Prepare profiles for 4.7",
       ],
       correctAnswer: 3,
       explanation: "Preparing profiles for 4.7 is a side goal, not the core goal of 4.6.",
     },
     {
       id: "q13",
       type: MC,
       question: "Why is saving every frame bad?",
       options: [
         "Because SetAsync has limits and it is needless load",
         "Because PlayerAdded then does not exist",
         "Because ipairs is prohibited",
         "Because Config disappears",
       ],
       correctAnswer: 0,
       explanation: "SetAsync has limits, so do not call it every frame.",
     },
     {
       id: "q14",
       type: MC,
       question: "Which lesson comes after 4.6?",
       options: [
         "4.7 Boss: data-driven showcase",
         "5.1 Three Biomes",
         "4.1 Arrays",
         "6.1 Simulator",
       ],
       correctAnswer: 0,
       explanation: "After 4.6 comes 4.7.",
     },
     {
       id: "q15",
       type: MC,
       question: "What should a good SaveLite print?",
       options: [
         "Nothing, to stay hidden",
         "FPS only",
         "LOAD/SAVE ok or fail statuses with a reason",
         "Only \"hello\"",
       ],
       correctAnswer: 2,
       explanation: "SaveLite should report LOAD/SAVE operation status.",
     },
   ],
 }
}


export const enLesson47 = {
 lessonId: "lesson-roblox-4-7",
 moduleId: "module-04",
 order: 7,
 title: "4.7 - Boss: data-driven showcase",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Build the showcase with a loop from a record catalog (not hand-made buttons)",
 "Every purchase goes through one server pipeline with canAfford",
 "Proof: add a 4th item to the catalog → Play → it appears without hand work",
 "Inventory holds ids; Catalog holds records - a clear split",
 "Named file architecture: Config / ShowcaseBuilder / PurchaseService",
 ],
 theory: {
   sections: [
     {
       title: "Today's mission",
       content: `In **4.6** you already know \`lite\` save. Today is the Tables module boss: **data-driven showcase**.

Today's genre is a shop / stand that **reads a table** and draws items from data.

\`Data-driven\` means: change the catalog → \`Play\` → the showcase is different. If for every item you manually clone a \`Button\` and type the price into a \`LocalScript\`, that is not yet the 4.7 boss, even if it looks nice.

**Core idea:**
- the catalog is the score;
- the showcase is the orchestra;
- one loop drives the whole shelf.

**Do this now (2 min):** open the Place after 4.6, Save as \`Lesson 4.7 - Data Driven Showcase\`, create Folder \`Showcase\`.`
     },
     {
       title: "What data-driven means by hand",
       content: `There are two ways to put "three items on a shelf".

**Way A (fragile):**
- \`Button_Apple\` with price \`5\` in a script;
- \`Button_Gem\` with price \`25\` in another script;
- \`Button_Potion\` with price \`10\` somewhere else.

Adding a fourth item = copy-paste + risk of price drift.

**Way B (data-driven):**
- one catalog of records;
- one loop builds buttons / \`Parts\` / labels;
- purchase reads \`item.price\` from the same source.

| Question | Data-driven answer |
|--------|------------------------|
| Where is the price? | from the record / \`Config\` |
| Where is the label name? | from field \`name\` / \`id\` |
| How do you add an item? | a new row in the catalog |
| Where is truth? | \`ModuleScript\`, not \`LocalScript\` copies |

The boss checks way B. Shelf beauty is secondary. The point is the loop and a single source.

**Do this now (3 min):** write in a Note three item \`id\`s that will be in today's catalog.`
     },
     {
       title: "Catalog as an array of records",
       content: `The showcase base is skill **4.4**: an array of dictionaries.

Example shape (field names are yours, meaning is the same):

\`\`\`lua
local catalog = {
    { id = "apple", name = "Apple", price = 5, power = 1 },
    { id = "gem", name = "Gem", price = 25, power = 3 },
    { id = "potion", name = "Potion", price = 10, power = 2 },
}
\`\`\`

Rules:
- \`id\` is stable (for inventory and save);
- \`name\` is for humans on the label;
- \`price\` is the number \`canAfford\` reads;
- an extra field (\`power\`, \`rarity\`, \`color\`) proves the record is not "just a string".

Prefer keeping the catalog in **Config (4.5)** so showcase, purchase, and future save do not drift. If the catalog still lives in the showcase Script, that is fine for a prototype, but by end of lesson move it into a \`ModuleScript\`.

Do not put price only in \`Name = "Apple_5"\`. Parsing \`Part\` names is a fragile crutch, not boss level.

**Do this now (5 min):** create ≥3 records with \`id\`, \`name\`, \`price\`, and one more field; put them in \`Config\` or a temporary \`ModuleScript\` \`Catalog\`.`
     },
     {
       title: "The loop that builds the showcase",
       content: `A server Script (or a \`Module\` the server calls) roughly does this:

1. \`require\` \`Config\` / catalog.
2. Find the parent: Folder \`Showcase\` / stand surface.
3. Clear old generated children (habit from 4.1).
4. In \`for i, item in ipairs(catalog) do\` create a \`Part\` or \`Frame\`.
5. Set the label from \`item.name\` and \`item.price\`.
6. Store \`id\` in an \`Attribute\` or a link table \`button -> id\`.

\`Attributes\` are handy: \`part:SetAttribute("ItemId", item.id)\`. Then \`Touched\` / \`Prompt\` reads the \`Attribute\` and finds the catalog record by \`id\`.

Geometry: three \`Part\`s on a shelf, \`BillboardGui\` with text, \`ProximityPrompt\` "Buy". A full AAA \`ScreenGui\` shop is not required. The point is **building from a loop**.

If you use GUI: slots are also cloned from a \`Template\` in a loop. One \`Template\` + data = \`N\` items.

**Do this now (8 min):** write a loop that spawns ≥3 labeled slots from the catalog; before a repeat \`Play\`, clear old slots.`
     },
     {
       title: "Purchase: one server pipeline",
       content: `Click / \`Prompt\` is only a signal "the player wants \`id\`". Then the server:

- finds the catalog record by \`id\`;
- reads \`price\`;
- checks coins (\`leaderstats\` or \`IntValue\` under server control);
- if not enough - rejects and gives \`feedback\`;
- deducts the price;
- \`table.insert\` into inventory (or sets an \`owned\` flag);
- updates GUI / inventory label;
- optionally marks \`Save dirty\` for 4.6 / 4.8.

Anti-patterns:
- \`LocalScript\` deducts coins itself;
- price hardcoded in \`Prompt.ActionText\` as the only truth;
- purchase finds the item by button order, not by \`id\` (order breaks).

\`Debounce\`: one player, one request for a short time, so \`Touched\` does not buy 20 apples in one frame.

**Do this now (6 min):** implement server purchase for one \`id\` end-to-end; test "no money" and "with money".`
     },
     {
       title: "Link to inventory and price",
       content: `The showcase bridges **4.2** (price / dictionary or \`price\` field) and **4.3** (\`insert\`).

Two valid price designs:
- \`price\` inside the catalog record (convenient for the boss);
- a separate \`Prices[id]\` dictionary + catalog without \`price\` (also fine if \`Config\` holds both).

Pick one and do not mix. On submission explain: "price lives here".

Inventory:
- list of \`id\`: \`{"apple", "gem"}\`;
- or \`owned\` dictionary: \`{ apple = true }\`.

For the boss, an \`id\` list + display in \`Output\` / \`Billboard\` is enough.

Do not store full records in inventory without need: if \`Config\` changes \`power\`, inventory with an old snapshot will lie. Prefer \`id\` + reading the catalog.

**Do this now (4 min):** after purchase show inventory via \`print\` or GUI; confirm it holds \`id\`, not random button text.`
     },
     {
       title: "Boss test: fourth item",
       content: `Required submission ritual:

1. Add a 4th catalog record \`{{ id = "test_star", name = "Star", price = 7, power = 9 }}\`.
2. Play without manually creating \`Button_Star\`.
3. The showcase shows \`Star\` with price \`7\`.
4. Purchase works with the same server function.
5. You may delete the \`test\` item or leave it with prefix \`test_\`.

If step 3 still needs cloning UI by hand, the loop is not yet \`data-driven\`. Return to the template / slot spawn.

Extra stress test: change \`price\` in \`Config\` without touching showcase Scripts. Label and \`canAfford\` should follow the new number (if the label is built at spawn, restart the build loop).

**Do this now (5 min):** run the 4th-item ritual and note \`pass/fail\` in a Note.`
     },
     {
       title: "UX feedback without overload",
       content: `The boss is about data, but the player still needs a response.

Minimum \`feedback\`:
- success: short \`print\` / \`TextLabel\` "Bought Apple";
- reject: "Not enough coins";
- inventory visible after the change.

Not required: cash-register animations, album-level sound design, fountain particles. That is \`5.9\`-style \`juice\`; today it can distract from the \`data-driven\` core.

Slot label: \`Apple - 5\` or two lines \`name / price\`. Field \`power\` can be smaller: \`pwr 1\`.

Colors: optionally read \`item.color\` from the record and set \`BrickColor\` / \`Color3\`. Nice proof that "a field drives look".

**Do this now (3 min):** add different success / reject messages; test both paths.`
     },
     {
       title: "File architecture for the boss",
       content: `Recommended minimum:

| Object | Role |
|--------|------|
| \`ModuleScript\` \`Config\` | catalog + maybe \`Prices\` / \`SaveKey\` |
| \`Script\` \`ShowcaseBuilder\` | slot loop, cleanup, \`Attributes\` |
| \`Script\` \`PurchaseService\` | \`Prompt\` / \`Remote\` → validation → \`insert\` |
| \`Folder\` \`Showcase\` | parent of generated slots |
| (optional) \`LocalScript\` \`HUD\` | display only, not price truth |

Keep \`Purchase\` separate from \`Builder\`: building the shelf and deducting coins are different responsibilities. Easier to debug in 4.8.

No names like \`Script1\`, \`Script2\`. The instructor opens Explorer and immediately sees the map.

**Do this now (3 min):** rename Scripts by role if they are still generic \`Script\`.`
     },
     {
       title: "What is out of scope for boss 4.7",
       content: `Not topics for this lesson:

| Not a topic | Why |
|--------|------|
| complex collection automation | another genre |
| hour-long economy balancing | \`price\` fields are enough |
| complex \`DataStore\` migrations | \`lite\` was already in 4.6; deep save is for checkpoint |
| \`Obby\` biomes | that is 5.1 |
| client "trust" of the price | breaks the server-truth lesson |

You may use coins from earlier lessons as showcase currency. You may not replace the showcase with complex automation.

If the Place is still full of extra code, work in a clean \`Showcase\` zone without wiping everything in one session. The point is an isolated boss artifact you can demo in 2 minutes.

**Do this now (2 min):** separate Folder \`Showcase\` from \`Legacy\` so the demo does not wander.`
     },
     {
       title: "Boss playtest: short scenario",
       content: `Run before \`Save\`:

1. \`Play\` with zero coins → purchase rejected.
2. Give yourself coins via a server test method (or a Studio-only \`read-only\` button).
3. Buy item \`A\` → inventory has \`A\`.
4. Buy item \`B\`.
5. Restart showcase build / \`rejoin\` per Place plan.
6. Add a 4th record → slot appears.
7. Change \`price\` → new \`canAfford\` / label behavior.

Write each \`fail\` on its own line. The boss likes an honest hole list more than "everything is fine" with no steps.

If 4.6 save is already wired, bonus-check that \`owned\` survives \`rejoin\`. If not, carry that to 4.8.

**Do this now (6 min):** walk scenario 1-6 and tick the boxes.`
     },
     {
       title: "Submission checklist 4.7",
       content: `- [ ] ≥3 items in a record catalog;
- [ ] a price field and at least one extra field;
- [ ] showcase slots built by a loop;
- [ ] cleanup of old slots before \`rebuild\`;
- [ ] purchase validated on the server;
- [ ] success adds \`id\` to inventory; reject does not deduct;
- [ ] 4th-item test passed without manual UI;
- [ ] no extra automation as a required artifact;
- [ ] \`Config\` / catalog labeled and \`require\` works;
- [ ] Save: \`Lesson 4.7 - Data Driven Showcase\`.

The Tables module boss is data discipline. The shelf only shows that the discipline exists.

**Do this now (3 min):** final checkboxes + Save with the exact name.`
     }
   ],
 },
 practice: {
 title: "Practice: Data Driven Showcase",
 duration: 30,
 description: `**Goal:** build an item showcase by looping the catalog and verify purchase on the server.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Prepare a catalog with 3 records.
2. Write a loop that builds slots or Parts for each item.
3. Set Attributes or a slot -> itemId link table.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Implement server purchase: price -> canAfford -> insert into inventory.
2. Add feedback for success / fail.
3. Save Lesson 4.7 - Data Driven Showcase.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Add a fourth catalog record and confirm the slot appears without manually creating a button.`,
 },
 ],
 },
 commonMistakes: [
     {
       mistake: "A separate button with a hardcoded price per item",
       fix: "for item in ipairs(catalog) do ...",
     },
     {
       mistake: "Purchase and coin deduction in LocalScript",
       fix: "The server validates with canAfford",
     },
     {
       mistake: "Inventory stores a full record snapshot forever",
       fix: "bag = {'id1','id2'}; Catalog is the source of full info",
     },
     {
       mistake: "No slot cleanup before a repeat build",
       fix: "Clear children before the loop",
     },
     {
        mistake: "Submit complex automation instead of the showcase",
       fix: "Artifact = data-driven shop display",
     },
     {
       mistake: "4th-item test not done",
       fix: "Add a test record and verify without manual UI",
     },
   ],
   summary: "You implemented a complete player data lifecycle: loading on Players.PlayerAdded, saving on Players.PlayerRemoving, and shutdown protection via game:BindToClose.",
  practiceTask: {
    "title": "Hands-on Practice: Auto-Save System (AutoSaveSystem_v1)",
    "difficulty": "advanced",
    "description": "**Objective:** Create an end-to-end player progression auto-save system tied to leaderstats.\n\n### Part A: Leaderstats Initialization\n1. In `ServerScriptService`, create a Script named `SaveManager`.\n2. On `Players.PlayerAdded`, create a `leaderstats` folder with `Coins` and `Level` IntValues.\n\n### Part B: Save, Load, and BindToClose\n1. Load player data on join using `GetAsync` in a pcall.\n2. Save on `Players.PlayerRemoving` with `SetAsync`.\n3. Add `game:BindToClose` to iterate all active players on server shutdown.\n\n### Part C: Verification\n1. Playtest: change your Coins value in Properties.\n2. Stop Play, restart, and confirm your updated Coins persisted from the DataStore.\n3. Save Place as `Lesson 4.7 - AutoSaveSystem_v1`.",
    "hints": [
      "The folder must be named 'leaderstats' (all lowercase) for the Roblox leaderboard HUD.",
      "BindToClose saves data when game servers restart.",
      "Save multiple stats as a dictionary: {Coins = 100, Level = 2}."
    ],
    "optionalChallenge": "Add a periodic background auto-save loop every 5 minutes."
  },
  quiz: {
   title: "Quiz 4.7 - 4.7 - Boss: data-driven showcase",
   passingScore: 70,
   questions: [
     {
       id: "q1",
       type: MC,
        question: "What is the lesson 4.7 artifact?",
        options: [
          "Complex collection automation",
          "Three Obby biomes",
          "Data-driven showcase from a catalog",
          "Race checkpoint system",
       ],
       correctAnswer: 2,
       explanation: "Lesson 4.7 builds a data-driven showcase.",
     },
     {
       id: "q2",
       type: MC,
       question: "What does a data-driven showcase mean?",
       options: [
         "Slots and prices are built from the catalog/table",
         "Each button has a unique hardcode forever",
         "Items live only in Part names",
         "UI is drawn by the client with no server data",
       ],
       correctAnswer: 0,
       explanation: "Data-driven means building the interface from a data catalog.",
     },
     {
       id: "q3",
       type: MC,
       question: "What is the minimum item form in the catalog?",
       options: [
         "Only an image with no fields",
         "A record with id, price, and at least one more field",
         "Only a slot number",
         "Only a purchase sound",
       ],
       correctAnswer: 1,
       explanation: "An item must have id, price, and at least one more field.",
     },
     {
       id: "q4",
       type: MC,
       question: "Where should you validate purchase?",
       options: [
         "In LocalScript as the only truth",
         "In Skybox",
         "On the server from catalog/Config price",
         "In the Button name",
       ],
       correctAnswer: 2,
       explanation: "Purchase must be validated on the server against catalog data.",
     },
     {
       id: "q5",
       type: MC,
       question: "Why the fourth-item test?",
       options: [
         "To prove a new item in data appears without hand-made UI per item",
         "To necessarily break DataStore",
          "To replace Config with hardcode",
         "To delete inventory",
       ],
       correctAnswer: 0,
       explanation: "The fourth item proves UI is built from data.",
     },
     {
       id: "q6",
       type: MC,
       question: "What is better to put in inventory after purchase?",
       options: [
         "A stable item id",
         "The whole Workspace",
         "A LocalScript copy",
         "HumanoidRootPart",
       ],
       correctAnswer: 0,
       explanation: "Inventory conveniently stores a stable item id.",
     },
     {
       id: "q7",
       type: MC,
       question: "Why clear old slots before rebuild?",
       options: [
         "So a repeat Play does not breed duplicates",
         "To turn off Lighting",
         "To reset UserId",
         "To remove Config",
       ],
       correctAnswer: 0,
       explanation: "Clearing slots prevents UI duplication on rebuild.",
     },
     {
       id: "q8",
       type: MC,
       question: "Where should the catalog preferably live?",
       options: [
         "Scattered across three LocalScripts",
         "In ModuleScript Config",
         "Only in Discord chat",
         "In Terrain holes",
       ],
       correctAnswer: 1,
       explanation: "The catalog is best kept in ModuleScript Config.",
     },
     {
       id: "q9",
       type: MC,
       question: "What is the exact name of the Save?",
       options: [
         "Lesson 5.1 - Three Biomes",
          "Lesson 4.5 - ModuleScript Config",
         "Lesson 4.7 - Data Driven Showcase",
         "Lesson 4.8 - Checkpoint Tables",
       ],
       correctAnswer: 2,
       explanation: "Correct save name for lesson 4.7.",
     },
     {
       id: "q10",
       type: MC,
       question: "Why is parsing price from a Part name bad?",
       options: [
         "Because it is fragile and duplicates truth outside the table",
         "Because Parts do not exist in Workspace",
         "Because ipairs is prohibited",
         "Because the server cannot see Parts",
       ],
       correctAnswer: 0,
       explanation: "Price should be stored in a table, not parsed from a Part name.",
     },
     {
       id: "q11",
       type: MC,
       question: "Which lesson comes after 4.7?",
       options: [
         "5.1 Three Biomes",
         "4.8 Checkpoint: Tables",
         "6.1 Simulator loop",
         "3.1 print",
       ],
       correctAnswer: 1,
       explanation: "After 4.7 comes 4.8 Checkpoint: Tables.",
     },
     {
       id: "q12",
       type: MC,
       question: "What to do with ProximityPrompt ActionText?",
       options: [
         "You may show the price, but truth stays on the server",
         "Make it the only price source",
         "Forbid any text",
         "Replace DataStore with it",
       ],
       correctAnswer: 0,
       explanation: "Prompt may show the price, but the server remains the source of truth.",
     },
     {
       id: "q13",
       type: MC,
       question: "Why Attribute ItemId on a slot?",
       options: [
         "So you know which id the player requests, independent of order",
         "To double render speed",
         "To disable Anchored",
         "To create a Team",
       ],
       correctAnswer: 0,
       explanation: "Attribute ItemId lets you identify the item independent of slot position.",
     },
     {
       id: "q14",
       type: MC,
       question: "How many items minimum for submission?",
       options: [
         "One without fields",
         "Two without price",
          "Zero, Config only",
         "At least three in the catalog",
       ],
       correctAnswer: 3,
       explanation: "A data-driven showcase needs at least three items.",
     },
     {
       id: "q15",
       type: MC,
       question: "What is NOT a goal of 4.7?",
       options: [
         "Build a data-driven showcase",
         "Connect Config, purchase, and inventory",
          "Build complex automation as the boss",
          "Pass the new-item-in-data test",
        ],
        correctAnswer: 2,
        explanation: "Complex automation is not a required lesson artifact.",
     },
   ],
 }
}


export const enLesson48 = {
 lessonId: "lesson-roblox-4-8",
 moduleId: "module-04",
 order: 8,
 title: "4.8 - Checkpoint: Tables",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Show each of the 6 M4 tables separately with one clear demo action",
 "QA checklist passed: 4.1→4.2→4.3→4.4→4.5→4.6→4.7",
 "Place structured with clear Folder and Script names",
 "Config = single balance truth, DataStore = player progress",
 "Save as Lesson 4.8 - Checkpoint Tables module portfolio",
 ],
 theory: {
   sections: [
     {
       title: "Today's mission",
        content: `Module 4 is **Tables and data**.

Today you submit a **data checkpoint**: one Place where the whole path is visible from list to cloud lite-save.

In **4.7** you built a data-driven showcase. Checkpoint does not add a new genre. It checks whether you can **name a tool and show it in action**.

**Do this now (2 min):** open the Place after 4.7, Save as \`Lesson 4.8 - Checkpoint Tables\`, and create Folder \`TablesCheckpoint\`.`
     },
     {
       title: "Module map: which table for what",
       content: `Before building the stand, say the six roles out loud. If you mix them up, checkpoint collapses into "one big table for everything".

| Lesson | Data form | Typical question |
|------|-------------|----------------|
| 4.1 | Array / list | Which element is under number i? |
| 4.2 | Dictionary / price | How much does key \`"Sword"\` cost? |
| 4.3 | Dynamic list | What to add / remove from inventory? |
| 4.4 | Array of records | What fields does item #3 have? |
| 4.5 | ModuleScript Config | Where is the single balance truth? |
| 4.6 | DataStore lite | What survives a rejoin? |
| 4.7 | Data showcase | Do UI/Parts read Config, not magic numbers? |

Stand rule: **one subsystem - one clear demo action**. An AAA shop is not required. A Parts panel or GUI that shows results in Output and in the world is enough.

Bad checkpoint: one 400-line Script with no names. Good: several short Scripts / ModuleScripts named \`PriceDemo\`, \`InventoryDemo\`, \`Config\`, \`SaveLite\`, \`Showcase\`.

**Do this now (4 min):** in a Note or at the top of a Script, write a "lesson → file/Folder" table, even if some demos still need pulling in from 4.2-4.7.`
     },
     {
       title: "Proof 4.1-4.2: list and price side by side",
       content: `Array and dictionary are often confused because both are \`table\`. On the stand, put them side by side.

**Array (4.1):**
- \`local pads = {"Alpha", "Beta", "Gamma"}\`
- \`ipairs\` loop or \`for i = 1, #pads\`
- spawn named Parts or print names

**Price dictionary (4.2):**
- \`local price = { Apple = 5, Gem = 25 }\`
- reading \`price.Apple\` or \`price["Gem"]\`
- function \`canAfford(coins, itemName)\` with no hardcoded price in the button

Instructor check: change the price only in the dictionary - purchase behavior changes. If the price is duplicated in three Scripts, that fails 4.2 even if "the button clicks".

Do not drag extra code here. Price is shown by a purchase or print in Output after ProximityPrompt.

**Do this now (5 min):** confirm the Place has a separate price dictionary and a separate name/id array; both are used by code, not only sitting in a comment.`
     },
     {
       title: "Proof 4.3-4.4: inventory and records",
       content: `Inventory (4.3) is a live list that **changes length**:

- \`table.insert(bag, itemId)\`
- \`table.remove(bag, index)\` or find-and-remove by id
- show contents: Billboard, ScreenGui, or print

Typical holes:
- insert on the client as "truth" without the server
- remove of the wrong index
- duplicates with no rule (allow or not)

**Array of records (4.4)** is a list of dictionaries:
- \`{ { id = "apple", power = 1, price = 5 }, { id = "gem", power = 3, price = 25 } }\`
- reading \`catalog[i].price\`
- showcase or loop that builds a label from record fields

Link: inventory often holds **ids**, and catalog holds **records with fields**. Do not mix "full record" and "string-id" without a rule. On the stand label: Inventory = ids, Catalog = records.

**Do this now (5 min):** do one insert and one remove during Play; change one field in a catalog record and watch what updates on the label.`
     },
     {
       title: "Proof 4.5: Config as single truth",
       content: `ModuleScript Config (4.5) is the heart of checkpoint. If balance is scattered across LocalScript and random numbers in Parts, the module is not passed.

**Minimum Config:**
- \`return { Prices = {...}, Catalog = {...}, SaveKey = "..." }\` or equivalent
- \`require\` from server showcase / purchase / save Scripts
- zero magic prices in buttons after refactor

Rule: change Config → Play → world and logic match without searching the whole Place.

What to check today:
- Does Config live in ReplicatedStorage or ServerStorage with an explicit access policy?
- Does the client "trust" a LocalScript price as final purchase truth?
- Do key names match inventory ids?

Config is the kitchen recipe. The cook (Script) reads the recipe; it does not invent salt in every pan again.

**Do this now (4 min):** find any magic price number outside Config and move it into ModuleScript; verify Play.`
     },
     {
       title: "Proof 4.6: DataStore lite without heroics",
       content: `DataStore lite (4.6) on checkpoint is not production banking. It proves you can:

- \`DataStoreService:GetDataStore\`
- \`pcall\` around Get/Set
- player key (\`tostring(userId)\` or course prefix)
- save a minimum: coins / inventory ids / bought flag
- load after rejoin (or Studio test with API Access on)

**Honest scope for 4.8:**
- one store name with course prefix
- save on PlayerRemoving and/or a "Save" button
- load on PlayerAdded
- Output message: Success / Fail reason

Not today: full session locking, schema migrations v12, OrderedDataStore leaderboards for 10 thousand players. Those are later modules.

If API Access is off in Studio, document that in the stand README and show the code + an in-memory mock table as fallback. The instructor values honesty and \`pcall\`, not a silent crash.

**Do this now (5 min):** run load → change data → save → rejoin (or a clear mock path) and write two Output lines: LOAD ok / SAVE ok.`
     },
     {
       title: "Proof 4.7: showcase reads data, not the reverse",
       content: `Boss 4.7 is the data-driven showcase. On checkpoint it must be **quickly reproducible**:

- Catalog in Config or an array of records.
- A loop builds labels / buttons / Parts from record fields.
- Purchase checks price and updates inventory on the server.
- After purchase, UI or Part shows the new state.

**Anti-pattern:** a Part named \`Item_Apple_5coins\` as the only database. A Part name can be a handy marker, but truth lives in the table.

Quick instructor test: add a catalog record with a unique id. After Play the showcase shows it **without** manually cloning UI for that item. If you must copy ScreenGui by hand per item, the showcase is not yet data-driven.

**Do this now (5 min):** add a temporary test item to the data, Play, confirm it appears; then remove it or leave it as a demo-item with prefix Test_.`
     },
     {
       title: "Data truth: server, client, Config",
       content: `Checkpoint fails not only on syntax, but on **where truth lives**.

| Data | Where truth is | Where you may display |
|------|-----------|---------------------|
| Purchase price | Server + Config | Client label |
| Inventory | Server (and save) | GUI replica / Remote |
| Catalog | Config / ModuleScript | Any reader |
| Coins | Server leaderstats or IntValue under server control | HUD |

Typical fails:
- LocalScript lowers the price and "buys" without the server
- DataStore writes what the client sent without validation
- Config require only on the client, while the server has another copy of numbers in a Script

On the stand, do one intentional check: trying to buy with no money from the client fails. That is one of the strongest proofs you understood the module.

**Do this now (4 min):** write one README line: "Purchase is validated on the server; the client only asks".`
     },
     {
       title: "QA checklist for the Tables module",
       content: `Walk it like a test pilot, not like an author who "knows it should work".

**Functional minimum:**
- array/list is read in Output or in Part Names
- price dictionary works through one source of truth
- inventory changes length via insert/remove
- record catalog shows several fields without copy-paste
- Config is the single balance source
- DataStore save/load works at least in mock or API mode
- showcase reads data, does not hardcode each item

**Architecture minimum:**
- one clear Folder/Script structure
- client only asks; server validates
- critical Script and Folder names are clear without explanation

If a point is red, fix it today, not "later in Obby". Obby (5.1+) almost never rescues holes in table thinking; it only uses Config and data further.

**Do this now (6 min):** walk the checklist and tick real boxes; write red points first in the todo.`
     },
     {
        title: "What to leave on the stand",
        content: `The stand should have:
- dictionaries, arrays, insert/remove
- records, Config, DataStore lite
- data-driven showcase
- server validation

If the Place has extra elements, remove them from the demo route. The instructor grades TablesCheckpoint.
**Do this now (3 min):** remove extras from the demonstration route.`
     },
     {
       title: "Demo ritual for the instructor (8-10 min)",
       content: `Prepare a short spoken scenario. Checkpoint is a performance with evidence.

**Scenario:**
- Open Config: "here is the single truth of prices and catalog".
- Play: show the array (print or pads).
- Show canAfford / purchase from the dictionary.
- insert item → GUI/Output → remove.
- Point to a catalog record with several fields.
- Buy from the showcase; show that UI read the data.
- Save/load or mock-save.
- Open the checklist with ticks.

Speak in module terms, not "here is my little shop". The goal is to prove table literacy before Obby.

Write yourself a timing: if the demo runs >12 min with no structure, cut decorative pauses. Better 7 clear gestures than 20 minutes of Explorer wandering.

**Do this now (5 min):** run the scenario once out loud at the monitor; fix places where you hunt a file longer than 10 seconds.`
     },
     {
       title: "Submission checklist 4.8",
        content: `Before final Save:
- [ ] Array/list with ≥3 elements
- [ ] Price dictionary with ≥3 keys
- [ ] insert + remove with a visible bag
- [ ] catalog with ≥3 records with fields
- [ ] Config = single balance source
- [ ] DataStore save/load works (or mock)
- [ ] Showcase reads data from Config/catalog
- [ ] Save: Lesson 4.8 - Checkpoint Tables

Module 4 artifact is ready. Next is Obby route geometry, but with a head that already thinks in tables.
**Do this now (3 min):** tick the last boxes and do the final Save with the exact name.`
     }
   ],
 },
 practice: {
 title: "Practice: Checkpoint Tables",
 duration: 30,
 description: `**Goal:** assemble a short checkpoint that demos list, price, inventory, catalog, Config, DataStore, and showcase.`,
 parts: [
 {
 title: "Part A - Together (10 min)",
 content: `1. Prepare one clean Folder with demo parts: arrays, prices, bag, catalog, config, save.
2. Label each section and do one short Play-test.`,
 },
 {
 title: "Part B - Solo (12 min)",
 content: `1. Confirm array, dictionary, inventory, and catalog work on real data.
2. Close red checklist points and save the Place.
3. Save Lesson 4.8 - Checkpoint Tables.`,
 },
 {
 title: "Part C - Challenge (8 min)",
 content: `Show one intentional purchase reject with no money and one successful showcase purchase.`,
 },
 ],
 },
 commonMistakes: [
     {
       mistake: "One 400-line script with no names",
       fix: "Keep Config / Builder / PurchaseService separate",
     },
     {
       mistake: "Confuses array and dictionary as skill proof",
        fix: "Array = list, Dictionary = price list, records = catalog",
     },
     {
        mistake: "Drags purchase/logic as proof of tables",
        fix: "Artifact = shop display, price list, inventory",
     },
     {
       mistake: "Many areas instead of one clean Place",
       fix: "One showcase Folder is enough",
     },
   ],
   summary: "You completed Module 4 by building the complete FullDataPipeline_v1 system, combining ModuleScript configs, table-based inventory, and reliable DataStore auto-saving.",
  practiceTask: {
    "title": "Module 4 Final Project: Full Data Pipeline (FullDataPipeline_v1)",
    "difficulty": "advanced",
    "description": "**Objective:** Combine configs, player tables, and cloud saving into an integrated production data pipeline.\n\n### Part A: Shared Config\n1. Create `ItemConfig` in `ReplicatedStorage` with item definitions and prices.\n\n### Part B: Session & Save Manager\n1. In `ServerScriptService`, build `DataManager`:\n   - Setup leaderstats (Coins, Level);\n   - Manage player inventory arrays;\n   - Save coin balance + inventory array to DataStore on player leave;\n   - Implement `game:BindToClose`.\n\n### Part C: Full Pipeline Test\n1. Join game, earn coins, buy items.\n2. Restart game and verify coins and inventory items reload cleanly.\n3. Save Place as `Lesson 4.8 - FullDataPipeline_v1`.",
    "hints": [
      "DataStores serialize tables directly into JSON.",
      "Keep configs in ReplicatedStorage and database logic in ServerScriptService.",
      "Check Output for zero DataStore warning logs."
    ],
    "optionalChallenge": "Add session locking to prevent data race conditions across multiple server instances."
  },
  quiz: {
   title: "Quiz 4.8 - 4.8 - Checkpoint: Tables",
   passingScore: 70,
   questions: [
     {
       id: "q1",
       type: MC,
        question: "What does lesson 4.8 submit?",
        options: [
          "Only one array print",
           "Three Obby biomes",
          "DataStore from earlier modules",
          "Checkpoint of Tables and data skills",
       ],
       correctAnswer: 3,
       explanation: "Lesson 4.8 is the Tables skills summary checkpoint.",
     },
     {
       id: "q2",
       type: MC,
       question: "Which data form is typical for price (4.2)?",
       options: [
         "Dictionary key → price",
         "Only a number with no table",
         "Terrain only",
         "Humanoid.Health",
       ],
       correctAnswer: 0,
       explanation: "Price in 4.2 is stored as a dictionary key → price.",
     },
     {
       id: "q3",
       type: MC,
       question: "What are table.insert / remove for on checkpoint?",
       options: [
         "To paint Skybox",
         "To show a dynamic inventory",
         "To replace SpawnLocation",
         "To disable Anchored",
       ],
       correctAnswer: 1,
       explanation: "insert/remove on checkpoint shows a dynamic inventory.",
     },
     {
       id: "q4",
       type: MC,
       question: "What is an array of records (4.4)?",
       options: [
         "A list of dictionaries with fields per element",
         "One line in Output",
         "Only Folder without data",
         "A Tool with Handle",
       ],
       correctAnswer: 0,
       explanation: "An array of records is a list of dictionaries with fields.",
     },
     {
       id: "q5",
       type: MC,
       question: "Where should the single price truth live?",
       options: [
         "In three different LocalScripts at once",
         "In the Part name as the only source",
         "Only in the author's head",
         "In ModuleScript Config",
       ],
       correctAnswer: 3,
       explanation: "Prices should live in ModuleScript Config.",
     },
     {
       id: "q6",
       type: MC,
       question: "Why pcall around DataStore?",
       options: [
         "To speed up rendering",
         "To create a Folder",
         "To carefully handle a network/API error",
         "To disable GUI",
       ],
       correctAnswer: 2,
       explanation: "pcall lets you handle DataStore errors without a crash.",
     },
     {
       id: "q7",
       type: MC,
       question: "What does a data-driven showcase prove?",
        options: [
          "A new item in data appears without hand-made UI per item",
          "That Config is not needed",
          "That the client lowers the price itself",
          "That Obby is already ready",
       ],
       correctAnswer: 0,
       explanation: "A data-driven showcase proves a new item appears from data.",
     },
     {
       id: "q8",
       type: MC,
       question: "Where should you validate purchase?",
       options: [
         "Only in LocalScript",
         "Only in Lighting",
         "On the server with Config/price",
         "Only in the button name",
       ],
       correctAnswer: 2,
       explanation: "Purchase is validated on the server against Config/price data.",
     },
     {
       id: "q9",
       type: MC,
       question: "What is the exact name of the Save?",
       options: [
          "Lesson 5.1 - Three Biomes",
          "ModuleScript Config Only",
          "DataStore lite Only",
          "Lesson 4.8 - Checkpoint Tables",
       ],
       correctAnswer: 3,
       explanation: "Correct save name for 4.8.",
     },
     {
       id: "q10",
       type: MC,
       question: "Why is parsing price from a Part name bad?",
       options: [
         "Because it is fragile and duplicates truth outside the table",
         "Because Parts do not exist in Workspace",
         "Because ipairs is prohibited",
         "Because the server cannot see Parts",
       ],
       correctAnswer: 0,
       explanation: "Price should be stored in a table, not parsed from a Part name.",
     },
     {
       id: "q11",
       type: MC,
       question: "Which module comes after 4.8?",
       options: [
         "Simulator core loop",
         "Race checkpoints",
         "Obby, starting with 5.1 Three Biomes",
         "Release checklist only",
       ],
       correctAnswer: 2,
       explanation: "After 4.8 comes module 5.1 Three Biomes.",
     },
     {
       id: "q12",
       type: MC,
       question: "Why is keeping inventory as \"truth\" only on the client bad?",
       options: [
         "Because LocalScript cannot print",
         "Because client data is easy to fake",
         "Because Folder then disappears",
         "Because ipairs is prohibited",
       ],
       correctAnswer: 1,
       explanation: "Client data can be faked, so truth must live on the server.",
     },
     {
       id: "q13",
       type: MC,
       question: "Minimum for an honest DataStore lite on checkpoint?",
       options: [
         "Only a Store name with no code",
         "Required OrderedDataStore with 1M keys",
         "Get/Set with pcall + player key + status message",
         "Saving the whole Workspace",
       ],
       correctAnswer: 2,
       explanation: "Honest DataStore lite has Get/Set with pcall, a player key, and a status message.",
     },
     {
       id: "q14",
       type: MC,
       question: "Which test best checks Config?",
       options: [
         "Changing a Config value changes behavior without hunting magic numbers",
         "Uninstalling Workspace",
         "Disabling Anchored on Baseplate",
         "Skybox change",
       ],
       correctAnswer: 0,
       explanation: "Config is checked by changing a value without changing logic.",
     },
     {
       id: "q15",
       type: MC,
       question: "How many main table-path proofs does the 4.8 stand collect?",
       options: [
         "Only one print",
         "Two random Scripts",
         "Skybox and Spawn only",
         "Chain 4.1-4.7 (list → …→showcase/save)",
       ],
       correctAnswer: 3,
       explanation: "Checkpoint 4.8 collects the 4.1-4.7 skill chain.",
     },
   ],
 }
}
