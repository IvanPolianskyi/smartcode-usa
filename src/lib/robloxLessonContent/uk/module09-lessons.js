/** Rich EN content for Roblox Module 09 — lessons 9.1–9.3 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson91 = {
  lessonId: 'lesson-roblox-9-1',
  moduleId: 'module-09',
  order: 1,
  title: '9.1 — ModuleScript: Shared Code',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Create ModuleScript with config constants and helper functions',
    'Require modules from multiple server scripts',
    'Separate data/config from runtime behavior',
    'Return a clean public API table from modules',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Module 9 — Systems Architect** — you build an **RPG inventory** with clean, reusable code.

**Lesson flow:**
1. **Theory (40 min)** — ModuleScript pattern
2. **Practice (~25 min)** — RPG constants module
3. **Quiz (10 min)** — **70%** pass

Use **Module 8 — Living Location** or new: \`Lesson 9.1 — Modules\`.`,
      },
      {
        title: 'Why ModuleScript is a superpower',
        content: `Without modules, you copy-paste the same numbers in 10 scripts.

**With ModuleScript you can:**
- Centralize rules (max slots, starter gold)
- Reuse functions (\`getMaxSlots(level)\`)
- Test one system in isolation
- Scale the game without chaos

**One source of truth** = fewer bugs when balancing.`,
      },
      {
        title: 'Folder structure',
        content: `**ServerScriptService** → **Modules** folder:

\`\`\`
ServerScriptService
├── Modules/
│   ├── RPGConfig.lua      (ModuleScript)
│   └── (later) Inventory.lua
├── InventoryService.lua   (Script)
└── TestInventory.lua      (Script — dev only)
\`\`\`

**ModuleScript** icon looks like a puzzle piece. **Script** runs; **ModuleScript** is **required**, not auto-run.`,
      },
      {
        title: 'Simple module API pattern',
        content: `\`RPGConfig\` ModuleScript:

\`\`\`lua
local RPGConfig = {}

RPGConfig.STARTER_GOLD = 100
RPGConfig.BASE_MAX_SLOTS = 12
RPGConfig.SLOTS_PER_LEVEL = 2

RPGConfig.RARITY_COLORS = {
    common = Color3.fromRGB(200, 200, 200),
    rare = Color3.fromRGB(80, 160, 255),
    epic = Color3.fromRGB(180, 80, 255),
}

function RPGConfig.getMaxSlots(playerLevel)
    return RPGConfig.BASE_MAX_SLOTS + (playerLevel * RPGConfig.SLOTS_PER_LEVEL)
end

function RPGConfig.isValidRarity(rarity)
    return RPGConfig.RARITY_COLORS[rarity] ~= nil
end

return RPGConfig
\`\`\`

**Return one table** — that is your public API.`,
      },
      {
        title: 'Require and use',
        content: `**InventoryService** Script:

\`\`\`lua
local RPGConfig = require(script.Parent.Modules.RPGConfig)

print("Starter gold:", RPGConfig.STARTER_GOLD)
print("Level 3 slots:", RPGConfig.getMaxSlots(3))
print("Valid rare?", RPGConfig.isValidRarity("rare"))
print("Valid fake?", RPGConfig.isValidRarity("legendary_plus"))
\`\`\`

**Path matters:** \`require\` uses instance path, not file names on disk.

**Exercise (5 min):** Second script \`ShopBridge\` also requires \`RPGConfig\` — change \`STARTER_GOLD\` once, both see new value.`,
      },
      {
        title: 'Config vs behavior modules',
        content: `| Module type | Holds | Example |
|-------------|-------|---------|
| **Config** | Numbers, colors, item defs | RPGConfig, ItemDatabase |
| **Behavior** | Functions with state logic | Inventory (lesson 9.2–9.3) |

**Config** modules rarely change at runtime.
**Behavior** modules create per-player objects.

Do not put \`PlayerAdded\` in config modules — keep in Service scripts.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Modules/RPGConfig ModuleScript
- [ ] Two scripts require it successfully
- [ ] getMaxSlots and isValidRarity work in Output
- [ ] Save: \`Lesson 9.1 — ModuleScript\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Editing ModuleScript but wrong require path', explanation: 'Old module cached or wrong script.', correctApproach: 'require(script.Parent.Modules.RPGConfig)' },
    { mistake: 'ModuleScript runs on its own at start', explanation: 'Only runs when required.', correctApproach: 'Require from a Script' },
    { mistake: 'Constants duplicated in Shop and Inventory', explanation: 'Drift when balancing.', correctApproach: 'Single RPGConfig' },
    { mistake: 'Returning nothing from module', explanation: 'require returns nil.', correctApproach: 'return RPGConfig at end' },
  ],
  summary: `You created RPGConfig as a shared ModuleScript with constants and helper functions, required it from multiple scripts, and separated configuration from runtime services — the foundation for your RPG inventory system.`,
  practiceTask: {
    title: 'First shared module (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** RPG constants used in 2+ scripts.

### Part A — RPGConfig (12 min)
1. Modules/RPGConfig with gold, slots, rarity colors
2. getMaxSlots(level) and isValidRarity(rarity)

### Part B — Require test (10 min)
1. InventoryService prints values
2. Second script (TestModules) requires same module
3. Change STARTER_GOLD — both update

### Part C — Save (3 min)
1. **Save to Roblox** → \`Lesson 9.1 — ModuleScript\`
2. **Practice complete**`,
    hints: [
      'Module name in Explorer = require path segment',
      'Return only public API — local helpers stay local',
      'Module 7 ShopConfig was same idea — now RPG-focused',
    ],
    optionalChallenge: 'Add getRarityColor(rarity) returning Color3 or nil.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'ModuleScript is loaded with…', options: ['require()', 'FireServer()', 'MoveTo()', 'TakeDamage()'], correctAnswer: 0, explanation: 'require loads module.' },
      { id: 'q2', type: MC, question: 'Module should return…', options: ['A table API', 'Nothing always', 'Terrain', 'Player'], correctAnswer: 0, explanation: 'return module table.' },
      { id: 'q3', type: MC, question: 'RPGConfig holds…', options: ['Constants and shared helpers', 'Only UI', 'Only sounds', 'Terrain'], correctAnswer: 0, explanation: 'Config module.' },
      { id: 'q4', type: MC, question: 'One constant in one place prevents…', options: ['Copy-paste drift', 'Flying', 'NPC dialogue', 'Publishing'], correctAnswer: 0, explanation: 'Single source of truth.' },
      { id: 'q5', type: MC, question: 'ModuleScript does not auto-run until…', options: ['Required by another script', 'Player joins', 'Terrain loads', 'UI opens'], correctAnswer: 0, explanation: 'Required not auto.' },
      { id: 'q6', type: MC, question: 'getMaxSlots(level) belongs in…', options: ['Config or behavior module API', 'LocalScript only', 'Lighting', 'StarterGui'], correctAnswer: 0, explanation: 'Shared logic.' },
      { id: 'q7', type: MC, question: 'Module 9 theme is…', options: ['Systems Architect / RPG inventory', 'Only racing', 'Only shop UI', 'Terrain only'], correctAnswer: 0, explanation: 'Module title.' },
      { id: 'q8', type: MC, question: 'Config vs behavior split means…', options: ['Data separate from runtime services', 'No scripts', 'Client-only', 'Delete modules'], correctAnswer: 0, explanation: 'Architecture.' },
      { id: 'q9', type: MC, question: 'Lesson 9.2 adds…', options: ['Inventory tables', 'Only NPC', 'Only car', 'Publish'], correctAnswer: 0, explanation: 'Next lesson.' },
      { id: 'q10', type: MC, question: 'Lesson 9.1 save name…', options: ['Lesson 9.1 — ModuleScript', 'RPG Inventory', 'Living Location', 'Shop Works'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const ukLesson92 = {
  lessonId: 'lesson-roblox-9-2',
  moduleId: 'module-09',
  order: 2,
  title: '9.2 — Inventory with Tables',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Model inventory as slots table with itemId and qty',
    'Implement addItem, removeItem, countItem with stack limits',
    'Use ItemDatabase module for maxStack metadata',
    'Return success/fail with reason strings from operations',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Tables are Roblox's **spreadsheet** for inventory. Today you build **add / remove / count** safely.

**Lesson flow:**
1. **Theory (40 min)** — slot table model
2. **Practice (~25 min)** — inventory operations module
3. **Quiz (10 min)** — **70%** pass

Open **Lesson 9.1 — ModuleScript**.`,
      },
      {
        title: 'Inventory table model',
        content: `\`\`\`lua
local inventory = {
    slots = {
        [1] = { itemId = "potion_small", qty = 3 },
        [2] = { itemId = "sword_bronze", qty = 1 },
        [3] = nil,  -- empty slot
    },
    maxSlots = 12,
}
\`\`\`

| Field | Meaning |
|-------|---------|
| **slots** | Array-like table 1..maxSlots |
| **itemId** | String key into ItemDatabase |
| **qty** | Stack count |
| **nil slot** | Empty |`,
      },
      {
        title: 'ItemDatabase metadata',
        content: `\`Modules/ItemDatabase\` ModuleScript:

\`\`\`lua
local ItemDatabase = {
    potion_small = { name = "Small Potion", maxStack = 10, rarity = "common" },
    sword_bronze = { name = "Bronze Sword", maxStack = 1, rarity = "common" },
    gem_blue = { name = "Blue Gem", maxStack = 99, rarity = "rare" },
}

function ItemDatabase.get(itemId)
    return ItemDatabase[itemId]
end

return ItemDatabase
\`\`\`

**maxStack = 1** for gear, **10+** for consumables.`,
      },
      {
        title: 'findItemSlot helper',
        content: `\`\`\`lua
local function findItemSlot(inventory, itemId)
    if not inventory or not inventory.slots then
        return nil, "invalid_inventory"
    end
    for i = 1, inventory.maxSlots do
        local slot = inventory.slots[i]
        if slot and slot.itemId == itemId then
            return i
        end
    end
    return nil
end

local function findEmptySlot(inventory)
    for i = 1, inventory.maxSlots do
        if inventory.slots[i] == nil then
            return i
        end
    end
    return nil
end
\`\`\``,
      },
      {
        title: 'addItem function',
        content: `\`\`\`lua
function InventoryOps.addItem(inventory, itemId, qty)
    local meta = ItemDatabase.get(itemId)
    if not meta then
        return false, "unknown_item"
    end
    if type(qty) ~= "number" or qty <= 0 then
        return false, "bad_qty"
    end

    local slotIndex = findItemSlot(inventory, itemId)
    if slotIndex then
        local slot = inventory.slots[slotIndex]
        local space = meta.maxStack - slot.qty
        if space <= 0 then
            return false, "stack_full"
        end
        local add = math.min(qty, space)
        slot.qty += add
        return true, "stacked", add
    end

    local empty = findEmptySlot(inventory)
    if not empty then
        return false, "inventory_full"
    end

    inventory.slots[empty] = {
        itemId = itemId,
        qty = math.min(qty, meta.maxStack),
    }
    return true, "new_slot"
end
\`\`\``,
      },
      {
        title: 'removeItem and countItem',
        content: `\`\`\`lua
function InventoryOps.removeItem(inventory, itemId, qty)
    local slotIndex = findItemSlot(inventory, itemId)
    if not slotIndex then
        return false, "not_found"
    end
    local slot = inventory.slots[slotIndex]
    if slot.qty < qty then
        return false, "not_enough"
    end
    slot.qty -= qty
    if slot.qty <= 0 then
        inventory.slots[slotIndex] = nil
    end
    return true, "removed"
end

function InventoryOps.countItem(inventory, itemId)
    local idx = findItemSlot(inventory, itemId)
    if not idx then return 0 end
    return inventory.slots[idx].qty
end
\`\`\`

**Return (success, reason)** — UI can show "Inventory full".`,
      },
      {
        title: 'Defensive coding',
        content: `Always guard:

\`\`\`lua
if not inventory or not inventory.slots then
    return false, "invalid_inventory"
end
\`\`\`

**Test script** calls add/remove in Output — no player needed for logic test.

**Before practice checklist:**
- [ ] addItem stacks potions to maxStack
- [ ] addItem fails when full with reason
- [ ] removeItem clears slot at qty 0
- [ ] countItem accurate
- [ ] Save: \`Lesson 9.2 — Inventory Tables\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'No check for unknown itemId', explanation: 'Nil errors.', correctApproach: 'ItemDatabase.get guard' },
    { mistake: 'qty below 0 not blocked', explanation: 'Negative stacks.', correctApproach: 'qty <= 0 return false' },
    { mistake: 'Forgetting nil empty slots', explanation: 'Skips slots wrong.', correctApproach: 'Explicit nil for empty' },
    { mistake: 'Logic copy-pasted in 5 scripts', explanation: 'Drift.', correctApproach: 'InventoryOps module' },
  ],
  summary: `You modeled inventory with slot tables, built addItem/removeItem/countItem with stack limits and clear fail reasons, and centralized item rules in ItemDatabase — ready to wrap in per-player objects next lesson.`,
  practiceTask: {
    title: 'Inventory table operations (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Working add/remove/count with tests.

### Part A — Data (8 min)
1. ItemDatabase with 3 items + maxStack
2. InventoryOps module with helpers

### Part B — Operations (15 min)
1. addItem — stack + new slot + full fail
2. removeItem + countItem
3. TestInventory script prints 6 test cases

### Part C — Save (2 min)
1. **Save to Roblox** → \`Lesson 9.2 — Inventory Tables\`
2. **Practice complete**`,
    hints: [
      'Print ok, reason from each call',
      'Overflow challenge: spill to next slot when stack full',
      'Use RPGConfig.getMaxSlots for maxSlots field',
    ],
    optionalChallenge: 'When stack full, auto-fill next empty slot with remainder.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Empty inventory slot is…', options: ['nil', '0', 'false string', 'Terrain'], correctAnswer: 0, explanation: 'nil = empty.' },
      { id: 'q2', type: MC, question: 'maxStack comes from…', options: ['ItemDatabase', 'Client button', 'Sky', 'Random'], correctAnswer: 0, explanation: 'Item metadata.' },
      { id: 'q3', type: MC, question: 'addItem returns false when…', options: ['Inventory full or invalid', 'Always', 'Never', 'On jump'], correctAnswer: 0, explanation: 'Fail with reason.' },
      { id: 'q4', type: MC, question: 'findItemSlot searches by…', options: ['itemId match', 'Player name', 'Color only', 'Time'], correctAnswer: 0, explanation: 'Stack lookup.' },
      { id: 'q5', type: MC, question: 'removeItem at qty 0 should…', options: ['Set slot to nil', 'Crash', 'Duplicate item', 'Publish'], correctAnswer: 0, explanation: 'Clear empty slot.' },
      { id: 'q6', type: MC, question: 'Defensive checks prevent…', options: ['Runtime errors on bad data', 'Walking', 'UI', 'Sound'], correctAnswer: 0, explanation: 'Nil guards.' },
      { id: 'q7', type: MC, question: 'InventoryOps should be a…', options: ['ModuleScript', 'Terrain', 'Sound', 'ProximityPrompt'], correctAnswer: 0, explanation: 'Shared module.' },
      { id: 'q8', type: MC, question: 'Lesson 9.2 builds on…', options: ['Lesson 9.1 RPGConfig', 'Lesson 6 only', 'Empty', 'Publish'], correctAnswer: 0, explanation: 'Module path.' },
      { id: 'q9', type: MC, question: 'Lesson 9.3 adds…', options: ['Tables as objects with metatables', 'Only dialogue', 'Only race', 'Terrain'], correctAnswer: 0, explanation: 'OOP-style inventory.' },
      { id: 'q10', type: MC, question: 'Lesson 9.2 save name…', options: ['Lesson 9.2 — Inventory Tables', 'ModuleScript', 'RPG Inventory', 'Shop UI'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const ukLesson93 = {
  lessonId: 'lesson-roblox-9-3',
  moduleId: 'module-09',
  order: 3,
  title: '9.3 — Tables as Objects',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Create Inventory class with metatable and __index',
    'Implement new, add, remove, serialize per player',
    'Store playerInventories table in InventoryService',
    'Use self method calls for readable OOP-style code',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Instead of passing \`inventory\` tables everywhere, each player gets an **Inventory object** with methods.

**Lesson flow:**
1. **Theory (40 min)** — metatable pattern
2. **Practice (~25 min)** — Inventory.new per player
3. **Quiz (10 min)** — **70%** pass

Open **Lesson 9.2 — Inventory Tables**.`,
      },
      {
        title: 'Tables can act like objects',
        content: `Lua has no classes — **metatables** mimic them:

\`\`\`lua
local Inventory = {}
Inventory.__index = Inventory

function Inventory.new(maxSlots)
    local self = setmetatable({
        slots = {},
        maxSlots = maxSlots,
    }, Inventory)
    return self
end
\`\`\`

\`inv:add("potion_small", 2)\` reads cleaner than \`InventoryOps.addItem(inv, ...)\`.`,
      },
      {
        title: 'Methods with self',
        content: `\`Modules/Inventory.lua\` — requires InventoryOps + ItemDatabase:

\`\`\`lua
function Inventory:add(itemId, qty)
    local ok, reason = InventoryOps.addItem(self, itemId, qty)
    return ok, reason
end

function Inventory:remove(itemId, qty)
    return InventoryOps.removeItem(self, itemId, qty)
end

function Inventory:count(itemId)
    return InventoryOps.countItem(self, itemId)
end
\`\`\`

**Colon syntax** \`inv:add()\` passes \`self\` automatically.`,
      },
      {
        title: 'serialize for saving later',
        content: `\`\`\`lua
function Inventory:serialize()
    return {
        slots = self.slots,
        maxSlots = self.maxSlots,
    }
end

function Inventory.deserialize(data)
    local inv = Inventory.new(data.maxSlots)
    inv.slots = data.slots or {}
    return inv
end
\`\`\`

Lesson **9.5** saves this to DataStore — today just print JSON-like table.`,
      },
      {
        title: 'Per-player InventoryService',
        content: `\`InventoryService\` Script:

\`\`\`lua
local Inventory = require(script.Parent.Modules.Inventory)
local RPGConfig = require(script.Parent.Modules.RPGConfig)

local playerInventories = {}

game.Players.PlayerAdded:Connect(function(player)
    local maxSlots = RPGConfig.getMaxSlots(1)
    playerInventories[player] = Inventory.new(maxSlots)

    -- Starter items
    playerInventories[player]:add("potion_small", 3)
end)

game.Players.PlayerRemoving:Connect(function(player)
    playerInventories[player] = nil
end)

-- Example command for test:
local function giveTestItem(player, itemId, qty)
    local inv = playerInventories[player]
    if inv then
        local ok, reason = inv:add(itemId, qty)
        print(ok, reason)
    end
end
\`\`\`

**Never** store Player instance inside Inventory object — use \`playerInventories[player]\` map.`,
      },
      {
        title: 'Why this scales',
        content: `| Approach | Problem |
|----------|---------|
| One global inventory | All players share items |
| Giant script | Unreadable |
| **Per-player object** | Clean, testable |

\`\`\`lua
local inv = playerInventories[player]
print("Potions:", inv:count("potion_small"))
\`\`\`

Ready for **gear stats** in 9.4.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Inventory.new on PlayerAdded
- [ ] inv:add / inv:remove work in Play
- [ ] serialize prints valid table
- [ ] PlayerRemoving clears memory
- [ ] Save: \`Lesson 9.3 — Inventory Object\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Forgot Inventory.__index = Inventory', explanation: 'Methods missing.', correctApproach: 'Set __index before methods' },
    { mistake: 'Dot instead of colon', explanation: 'self is nil.', correctApproach: 'inv:add() not inv.add()' },
    { mistake: 'One global Inventory for all', explanation: 'Shared loot bug.', correctApproach: 'playerInventories[player]' },
    { mistake: 'Storing Player inside inventory', explanation: 'Memory leak risk.', correctApproach: 'External map by player' },
  ],
  summary: `You refactored inventory into an object-like module with new/add/remove/serialize, wired per-player instances in InventoryService, and prepared serialization for DataStore in later lessons.`,
  practiceTask: {
    title: 'Inventory as object (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Per-player Inventory objects.

### Part A — Inventory module (12 min)
1. Inventory.new, __index, add, remove, count
2. serialize + deserialize
3. Wrap InventoryOps from 9.2

### Part B — Service (10 min)
1. InventoryService PlayerAdded/Removing
2. Starter potions on join
3. Play — print inv:count in command test

### Part C — Save (3 min)
1. **Save to Roblox** → \`Lesson 9.3 — Inventory Object\`
2. **Practice complete**`,
    hints: [
      'Colon : for methods, dot . only if you pass self manually',
      'deserialize for testing saved data in Output',
      'Optional getWeight() sums item weight from database',
    ],
    optionalChallenge: 'getWeight() enforces max carry weight from RPGConfig.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'setmetatable with __index enables…', options: ['Method calls on table', 'Terrain edit', 'FireServer', 'Welds only'], correctAnswer: 0, explanation: 'OOP-style.' },
      { id: 'q2', type: MC, question: 'inv:add() passes…', options: ['self as first arg', 'Nothing', 'Terrain', 'Server IP'], correctAnswer: 0, explanation: 'Colon syntax.' },
      { id: 'q3', type: MC, question: 'playerInventories[player] stores…', options: ['That player inventory object', 'Global shared loot', 'Terrain', 'UI only'], correctAnswer: 0, explanation: 'Per-player.' },
      { id: 'q4', type: MC, question: 'serialize returns…', options: ['Table for saving', 'Player character', 'Tool instance only', 'Nil always'], correctAnswer: 0, explanation: 'DataStore prep.' },
      { id: 'q5', type: MC, question: 'PlayerRemoving should…', options: ['Clear playerInventories entry', 'Delete all players', 'Stop server', 'Publish'], correctAnswer: 0, explanation: 'Memory cleanup.' },
      { id: 'q6', type: MC, question: 'Inventory.new(maxSlots) is a…', options: ['Constructor', 'RemoteEvent', 'Terrain brush', 'Animation'], correctAnswer: 0, explanation: 'Creates instance.' },
      { id: 'q7', type: MC, question: 'Avoid storing Player inside inventory because…', options: ['Cleaner map outside object', 'Required by Roblox', 'Blocks UI', 'Removes Humanoid'], correctAnswer: 0, explanation: 'Encapsulation.' },
      { id: 'q8', type: MC, question: 'Lesson 9.3 builds on…', options: ['Lesson 9.2 InventoryOps', 'Lesson 1.1 only', 'Module 6 only', 'Empty'], correctAnswer: 0, explanation: 'Refactor tables.' },
      { id: 'q9', type: MC, question: 'Lesson 9.4 adds…', options: ['Gear and stats', 'Only NPC', 'Only publish', 'Race timer'], correctAnswer: 0, explanation: 'Equipment.' },
      { id: 'q10', type: MC, question: 'Lesson 9.3 save name…', options: ['Lesson 9.3 — Inventory Object', 'ModuleScript', 'Living Location', 'Race Launched'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const ukLesson94 = {
  lessonId: 'lesson-roblox-9-4',
  moduleId: 'module-09',
  order: 4,
  title: '9.4 — Gear and Stats',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Extend ItemDatabase with atk, hp, crit stat fields',
    'Track equipped weapon, armor, trinket slots per player',
    'Recalculate total stats from base + gear without mutating base',
    'Fire StatsChanged to update HUD and combat damage',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Inventory holds items. **Gear** makes items change **how strong** you are.

**Lesson flow:**
1. **Theory (40 min)** — equip slots + stat engine
2. **Practice (~25 min)** — 3 slots + HUD stats
3. **Quiz (10 min)** — **70%** pass

Open **Lesson 9.3 — Inventory Object**.`,
      },
      {
        title: 'Gear stats in ItemDatabase',
        content: `Extend \`ItemDatabase\`:

\`\`\`lua
sword_bronze = {
    name = "Bronze Sword",
    maxStack = 1,
    slot = "weapon",
    atk = 5,
    crit = 0.02,
},
armor_cloth = {
    name = "Cloth Armor",
    maxStack = 1,
    slot = "armor",
    hp = 20,
},
ring_lucky = {
    name = "Lucky Ring",
    maxStack = 1,
    slot = "trinket",
    atk = 1,
    crit = 0.05,
},
\`\`\`

**slot** field tells equip system which slot item fits.`,
      },
      {
        title: 'Equipped table (separate from inventory)',
        content: `\`playerEquipped[player]\`:

\`\`\`lua
{
    weapon = "sword_bronze",  -- itemId or nil
    armor = "armor_cloth",
    trinket = nil,
}
\`\`\`

**Equipping** removes 1 from inventory (or moves from slot) and sets equipped id.

**Unequip** returns item to inventory if space.`,
      },
      {
        title: 'Base vs bonus stats',
        content: `\`playerBaseStats[player]\`:

\`\`\`lua
{ atk = 10, hp = 100, crit = 0 }
\`\`\`

**Never** do \`baseAtk = baseAtk + 5\` permanently on equip.

**Recalculate** each time:

\`\`\`lua
local function calcStats(player)
    local base = playerBaseStats[player]
    local eq = playerEquipped[player]
    local total = { atk = base.atk, hp = base.hp, crit = base.crit }

    for _, slotName in ipairs({"weapon", "armor", "trinket"}) do
        local itemId = eq[slotName]
        if itemId then
            local meta = ItemDatabase.get(itemId)
            total.atk += meta.atk or 0
            total.hp += meta.hp or 0
            total.crit += meta.crit or 0
        end
    end
    return total
end
\`\`\``,
      },
      {
        title: 'equipItem server function',
        content: `\`\`\`lua
local function equipItem(player, itemId, slotName)
    local meta = ItemDatabase.get(itemId)
    if not meta or meta.slot ~= slotName then
        return false, "wrong_slot"
    end

    local inv = playerInventories[player]
    if inv:count(itemId) < 1 then
        return false, "not_owned"
    end

    -- Unequip old in slot first (optional return to inv)
    local old = playerEquipped[player][slotName]
    if old then
        inv:add(old, 1)
    end

    inv:remove(itemId, 1)
    playerEquipped[player][slotName] = itemId

    local totals = calcStats(player)
    StatsChanged:FireClient(player, totals)
    return true, "equipped"
end
\`\`\`

**StatsChanged** RemoteEvent → client updates HUD.`,
      },
      {
        title: 'HUD and combat sync',
        content: `**StarterGui** → \`StatsUI\`:

\`\`\`lua
StatsChanged.OnClientEvent:Connect(function(totals)
    AtkLabel.Text = "ATK: " .. totals.atk
    HpLabel.Text = "HP+: " .. totals.hp
    CritLabel.Text = "CRIT: " .. math.floor(totals.crit * 100) .. "%"
end)
\`\`\`

**Module 5 combat:** sword damage uses \`totals.atk\` on server when hit lands.

One equip → recalc → **StatsChanged** → UI + combat — three sync points.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] 3 equip slots work from inventory
- [ ] HUD updates on equip/unequip
- [ ] Base stats unchanged in playerBaseStats table
- [ ] Wrong slot item denied
- [ ] Save: \`Lesson 9.4 — Gear Stats\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Permanently adding atk to base on equip', explanation: 'Double-count on re-equip.', correctApproach: 'Dynamic calcStats' },
    { mistake: 'Equipped ids without inventory check', explanation: 'Equip ghost items.', correctApproach: 'count(itemId) >= 1' },
    { mistake: 'No slot field on items', explanation: 'Sword in armor slot.', correctApproach: 'meta.slot validation' },
    { mistake: 'Client sets atk IntValue', explanation: 'Exploit.', correctApproach: 'Server calcStats + FireClient' },
  ],
  summary: `You added gear slots with ItemDatabase stats, dynamic totalAtk/hp/crit calculation, equip/unequip flow, and StatsChanged HUD updates — equipment now affects how players fight.`,
  practiceTask: {
    title: 'Gear + stat engine (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** 3 slots + live stat HUD.

### Part A — Data (8 min)
1. ItemDatabase atk/hp/crit + slot field
2. playerEquipped + playerBaseStats tables

### Part B — Equip (12 min)
1. equipItem server with calcStats
2. StatsChanged → StatsUI labels
3. Test weapon + armor + trinket

### Part C — Save (5 min)
1. Equip sword — verify ATK label
2. **Save to Roblox** → \`Lesson 9.4 — Gear Stats\`
3. **Practice complete**`,
    hints: [
      'Nil-safe: meta.atk or 0',
      'Unequip returns item to inventory before new equip',
      'Optional epic rarity multiplier on stats',
    ],
    optionalChallenge: 'Epic items multiply base item stats by 1.25.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Total stats should be…', options: ['Base + gear bonuses recalculated', 'Only client guess', 'Terrain', 'Random'], correctAnswer: 0, explanation: 'Dynamic calc.' },
      { id: 'q2', type: MC, question: 'Equipping should not permanently change…', options: ['playerBaseStats', 'ItemDatabase', 'Module name', 'Roblox version'], correctAnswer: 0, explanation: 'Base stays base.' },
      { id: 'q3', type: MC, question: 'Equipped stored separately from…', options: ['Inventory slots', 'Terrain', 'Sky', 'Sound'], correctAnswer: 0, explanation: 'Two systems.' },
      { id: 'q4', type: MC, question: 'meta.slot prevents…', options: ['Wrong slot equip', 'Walking', 'Dialogue', 'Patrol'], correctAnswer: 0, explanation: 'Validation.' },
      { id: 'q5', type: MC, question: 'StatsChanged fires after…', options: ['Full recalculation', 'Random', 'Publish', 'Terrain gen'], correctAnswer: 0, explanation: 'Sync event.' },
      { id: 'q6', type: MC, question: 'sword_bronze maxStack 1 means…', options: ['Gear not stackable', 'Infinite stack', 'Not in database', 'UI only'], correctAnswer: 0, explanation: 'Equipment rule.' },
      { id: 'q7', type: MC, question: 'Combat damage should read…', options: ['Server total atk', 'Client chat', 'Button text', 'Terrain'], correctAnswer: 0, explanation: 'Authority.' },
      { id: 'q8', type: MC, question: 'Lesson 9.4 builds on…', options: ['Lesson 9.3 inventory objects', 'Lesson 1 only', 'Module 6 only', 'Empty'], correctAnswer: 0, explanation: 'Needs inventory.' },
      { id: 'q9', type: MC, question: 'Lesson 9.5 adds…', options: ['DataStore serialization', 'Only NPC', 'Only race', 'Publish'], correctAnswer: 0, explanation: 'Persistence.' },
      { id: 'q10', type: MC, question: 'Lesson 9.4 save name…', options: ['Lesson 9.4 — Gear Stats', 'Inventory Object', 'RPG Inventory', 'Shop Works'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const ukLesson95 = {
  lessonId: 'lesson-roblox-9-5',
  moduleId: 'module-09',
  order: 5,
  title: '9.5 — Inventory Serialization',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Serialize inventory and equipped tables for DataStore',
    'Save on PlayerRemoving with pcall and schema version',
    'Load on PlayerAdded and validate before reconstructing',
    'Handle save failures without blocking gameplay',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Objects have **methods**. DataStore saves **plain tables** only.

Today: **serialize → save → load → deserialize**.

**Lesson flow:**
1. **Theory (40 min)** — save schema + pcall
2. **Practice (~25 min)** — persistence on leave/join
3. **Quiz (10 min)** — **70%** pass

Reuse Module 3 **DataStore** basics.`,
      },
      {
        title: 'Why serialization matters',
        content: `DataStore cannot save:
- Functions
- Metatables
- Instances (Tools in inventory — save **itemId + qty** only)

**Save shape:**

\`\`\`lua
{
    version = 1,
    inventory = { slots = {...}, maxSlots = 12 },
    equipped = { weapon = "sword_bronze", armor = nil, trinket = nil },
}
\`\`\``,
      },
      {
        title: 'SavePlayerData function',
        content: `\`InventorySaveService\` Script:

\`\`\`lua
local DataStoreService = game:GetService("DataStoreService")
local store = DataStoreService:GetDataStore("PlayerRPG_v1")

local function buildSavePayload(player)
    local inv = playerInventories[player]
    local eq = playerEquipped[player]
    if not inv then return nil end

    return {
        version = 1,
        inventory = inv:serialize(),
        equipped = eq or { weapon = nil, armor = nil, trinket = nil },
    }
end

local function savePlayer(player)
    local key = "uid_" .. player.UserId
    local payload = buildSavePayload(player)
    if not payload then return end

    local ok, err = pcall(function()
        store:SetAsync(key, payload)
    end)

    if not ok then
        warn("Save failed:", player.Name, err)
    else
        print("Saved", player.Name)
    end
end
\`\`\``,
      },
      {
        title: 'Load and validate',
        content: `\`\`\`lua
local function loadPlayer(player)
    local key = "uid_" .. player.UserId
    local ok, data = pcall(function()
        return store:GetAsync(key)
    end)

    if not ok or not data then
        return nil -- new player defaults
    end

    if type(data) ~= "table" or data.version ~= 1 then
        warn("Bad save data for", player.Name)
        return nil
    end

    if type(data.inventory) ~= "table" then
        return nil
    end

    return data
end
\`\`\`

**Validate** every field before trusting — corrupted data happens.`,
      },
      {
        title: 'Join and leave wiring',
        content: `\`\`\`lua
Players.PlayerAdded:Connect(function(player)
    local data = loadPlayer(player)
    if data then
        playerInventories[player] = Inventory.deserialize(data.inventory)
        playerEquipped[player] = data.equipped
    else
        -- default from 9.3
    end
    local totals = calcStats(player)
    StatsChanged:FireClient(player, totals)
end)

Players.PlayerRemoving:Connect(function(player)
    savePlayer(player)
    playerInventories[player] = nil
    playerEquipped[player] = nil
end)
\`\`\`

**Studio:** Enable **Game Settings → Security → Enable Studio Access to API Services** for DataStore tests.`,
      },
      {
        title: 'Throttle and graceful failure',
        content: `| Rule | Why |
|------|-----|
| Save on leave, not every second | DataStore limits |
| pcall on Get/Set | Errors do not crash server |
| Log failures | Debug without stopping game |
| version field | Future schema migrations |

If save fails, player still had fun this session — log and retry next leave.

**Optional:** autosave every 5 min with debounce (challenge).`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Leave game → rejoin → same items in slots
- [ ] Equipped gear still equipped after relog
- [ ] New player gets starter inventory
- [ ] Bad data falls back to defaults safely
- [ ] Save: \`Lesson 9.5 — Inventory Save\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Saving without serialize', explanation: 'Methods lost / error.', correctApproach: 'inv:serialize() plain table' },
    { mistake: 'No pcall on SetAsync', explanation: 'Server error on fail.', correctApproach: 'pcall + warn' },
    { mistake: 'Saving every item pickup', explanation: 'Rate limit ban.', correctApproach: 'Save on leave primarily' },
    { mistake: 'Trusting loaded data blindly', explanation: 'Exploit or crash.', correctApproach: 'version + type checks' },
  ],
  summary: `You implemented versioned save payloads, pcall-safe DataStore load/save on join and leave, and validation before rebuilding inventory objects — player progress now survives relog.`,
  practiceTask: {
    title: 'Save-ready inventory (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Persist inventory + equipped after relog.

### Part A — Serialize (10 min)
1. buildSavePayload with version = 1
2. savePlayer with pcall SetAsync
3. loadPlayer with validation

### Part B — Wire (12 min)
1. PlayerAdded load or defaults
2. PlayerRemoving save then clear maps
3. Enable Studio API services

### Part C — Relog test (3 min)
1. Add items, equip, leave, rejoin — verify
2. **Save to Roblox** → \`Lesson 9.5 — Inventory Save\`
3. **Practice complete**`,
    hints: [
      'Print serialize table in Output before first save',
      'UserId key — unique per player',
      'Module 3 DataStore lesson same patterns',
    ],
    optionalChallenge: 'Migrate version 1 → 2 if you add new fields.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'DataStore saves…', options: ['Plain Lua tables', 'Functions', 'Metatables', 'Full Tool instances'], correctAnswer: 0, explanation: 'Serializable data.' },
      { id: 'q2', type: MC, question: 'serialize converts object to…', options: ['Save-safe table', 'Player character', 'Terrain', 'RemoteEvent'], correctAnswer: 0, explanation: 'Plain data.' },
      { id: 'q3', type: MC, question: 'pcall on SetAsync…', options: ['Prevents crash on failure', 'Speeds up game', 'Removes UI', 'Bans players'], correctAnswer: 0, explanation: 'Error handling.' },
      { id: 'q4', type: MC, question: 'version field in save helps…', options: ['Future schema migrations', 'Graphics', 'Sound only', 'NPC path'], correctAnswer: 0, explanation: 'Schema version.' },
      { id: 'q5', type: MC, question: 'Save primarily on…', options: ['PlayerRemoving', 'Every heartbeat', 'Button click only', 'Terrain'], correctAnswer: 0, explanation: 'Throttle saves.' },
      { id: 'q6', type: MC, question: 'Load should validate…', options: ['Types and version before use', 'Nothing', 'Client chat', 'Random'], correctAnswer: 0, explanation: 'Safe load.' },
      { id: 'q7', type: MC, question: 'Key uses…', options: ['Player UserId', 'Player name only', 'Random', 'Terrain id'], correctAnswer: 0, explanation: 'Unique key.' },
      { id: 'q8', type: MC, question: 'Lesson 9.5 builds on…', options: ['9.3 serialize + 9.4 equipped', 'Lesson 1 terrain', 'Empty', 'Publish only'], correctAnswer: 0, explanation: 'Full RPG state.' },
      { id: 'q9', type: MC, question: 'Lesson 9.6 is…', options: ['RPG Inventory checkpoint', 'Shop only', 'Race only', 'NPC only'], correctAnswer: 0, explanation: 'Module finale.' },
      { id: 'q10', type: MC, question: 'Lesson 9.5 save name…', options: ['Lesson 9.5 — Inventory Save', 'Gear Stats', 'ModuleScript', 'Living Location'], correctAnswer: 0, explanation: 'Save lesson.' },
    ],
  },
}

export const ukLesson96 = {
  lessonId: 'lesson-roblox-9-6',
  moduleId: 'module-09',
  order: 6,
  title: '9.6 — Checkpoint: RPG Inventory',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Integrate modules, inventory, gear stats, and DataStore persistence',
    'Pass relog scenario tests for items, equip, and slot order',
    'Document architecture diagram for expansion',
    'Ship Module 9 — RPG Inventory portfolio save',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**RPG Inventory** = Module 9 portfolio — proves you think like a **systems architect**.

**Required proof:**
- Modular code (RPGConfig, ItemDatabase, Inventory, services)
- Stackable inventory + equip
- Stats affect HUD (and combat if linked)
- Save/load after relog

**Save:** \`Module 9 — RPG Inventory\``,
      },
      {
        title: 'Architecture map',
        content: `\`\`\`
ServerScriptService
├── Modules/
│   ├── RPGConfig.lua
│   ├── ItemDatabase.lua
│   ├── InventoryOps.lua
│   └── Inventory.lua
├── InventoryService.lua    (PlayerAdded, give items)
├── EquipmentService.lua    (equip, calcStats)
└── InventorySaveService.lua (DataStore)

ReplicatedStorage
├── StatsChanged (RemoteEvent)
└── (shop/events from other modules optional)

StarterGui
├── StatsUI
└── InventoryUI (optional simple list)
\`\`\`

**One ItemDatabase** — shop, quests, and drops all reference same ids.`,
      },
      {
        title: 'Scenario tests (relog)',
        content: `| # | Test | Pass |
|---|------|------|
| 1 | Pick up / add 3 potions → relog → still 3 | |
| 2 | Equip sword → relog → still equipped, ATK correct | |
| 3 | Fill inventory → relog → slot order preserved | |
| 4 | Remove item → relog → removal persisted | |
| 5 | New player → starter items, no errors | |
| 6 | 2 players → separate saves | |`,
      },
      {
        title: 'Debug command',
        content: `\`\`\`lua
-- Admin test in Studio only
local function debugPrintSave(player)
    local payload = buildSavePayload(player)
    print(game:GetService("HttpService"):JSONEncode(payload))
end
\`\`\`

Use **Output** to verify serialize before blaming DataStore.

**Architecture doc** (notes): 5 bullet points — what each module does.`,
      },
      {
        title: 'Checkpoint quality bar',
        content: `| Bar | Standard |
|-----|----------|
| Modules | No duplicate item defs |
| Inventory | add/remove reasons clear |
| Gear | calcStats, not mutated base |
| Save | pcall + version + validate |
| Output | No red errors in 6 tests |

**60-second demo:**
1. Show stats HUD
2. Add potion, equip sword — ATK up
3. Leave + rejoin — prove persistence
4. Show Module folder structure`,
      },
      {
        title: 'Module 10 preview',
        content: `**Module 10 — Magic of Details** adds **constraints**, physics polish, moving doors — your RPG hub can get mechanical traps and lifts.

**Before practice:**
- [ ] All 6 scenario tests pass
- [ ] Architecture notes written
- [ ] **Save to Roblox** → \`Module 9 — RPG Inventory\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Item defs in shop AND separate inventory table', explanation: 'ID mismatch.', correctApproach: 'One ItemDatabase' },
    { mistake: 'Skipping relog equip test', explanation: 'Broken checkpoint.', correctApproach: 'Test 2 is mandatory' },
    { mistake: 'Side effects in serialize', explanation: 'Mutates live inventory.', correctApproach: 'Read-only copy' },
    { mistake: 'Giant single Script 500 lines', explanation: 'Unmaintainable.', correctApproach: 'Split services + modules' },
  ],
  summary: `You integrated modular RPG inventory, equipment stats, and DataStore persistence, passed relog scenario tests, and saved RPG Inventory — Module 9 is complete.`,
  practiceTask: {
    title: 'Ship RPG Inventory (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Portfolio checkpoint with persistence.

### Part A — Integrate (15 min)
1. Wire all Module 9 scripts — no duplicates
2. StatsUI + optional inventory list UI
3. Debug print save command

### Part B — Scenario tests (20 min)
1. Run 6-row relog table — fix failures
2. 2-player separate save test

### Part C — Demo save (5 min)
1. 60s demo rehearsed
2. **Save to Roblox** → \`Module 9 — RPG Inventory\`
3. **Practice complete**`,
    hints: [
      'Fix serialize before DataStore if load fails',
      'One source of truth for item ids',
      'Reliability over drag-drop UI for checkpoint',
    ],
    optionalChallenge: 'Drag-drop slot swap with server-validated swap request.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'RPG Inventory checkpoint proves…', options: ['Modules + gear + save/load', 'Terrain only', 'No scripts', 'Client-only coins'], correctAnswer: 0, explanation: 'Full module 9.' },
      { id: 'q2', type: MC, question: 'Relog equip test confirms…', options: ['Equipped persisted', 'UI only', 'Terrain', 'Random'], correctAnswer: 0, explanation: 'Scenario 2.' },
      { id: 'q3', type: MC, question: 'One ItemDatabase prevents…', options: ['ID drift between systems', 'Walking', 'NPC dialogue', 'Sound'], correctAnswer: 0, explanation: 'Single source.' },
      { id: 'q4', type: MC, question: 'serialize should be…', options: ['Read-only copy of state', 'Mutating live slots', 'Deleting player', 'Publishing'], correctAnswer: 0, explanation: 'No side effects.' },
      { id: 'q5', type: MC, question: 'Module 9 save name…', options: ['Module 9 — RPG Inventory', 'Shop Works', 'Living Location', 'Lesson 9.1'], correctAnswer: 0, explanation: 'Checkpoint.' },
      { id: 'q6', type: MC, question: 'Systems architect means…', options: ['Reusable modules and trustworthy state', 'One giant script', 'No tests', 'Copy paste'], correctAnswer: 0, explanation: 'Design mindset.' },
      { id: 'q7', type: MC, question: 'Lesson 9.6 completes…', options: ['Module 9', 'Module 12', 'Module 1', 'UK translation'], correctAnswer: 0, explanation: 'End module 9.' },
      { id: 'q8', type: MC, question: 'Two players need…', options: ['Separate save keys by UserId', 'One shared inventory', 'No DataStore', 'Same key'], correctAnswer: 0, explanation: 'Per-player data.' },
      { id: 'q9', type: MC, question: 'Module 10 adds…', options: ['Constraints and physics details', 'Only dialogue', 'Only publish', 'Nothing'], correctAnswer: 0, explanation: 'Preview.' },
      { id: 'q10', type: MC, question: 'Checkpoint prioritizes…', options: ['Persistence tests passing', 'Most items possible', 'No modules', 'Client-only save'], correctAnswer: 0, explanation: 'Relog QA.' },
    ],
  },
}
