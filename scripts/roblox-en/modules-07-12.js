const lessons = [
  // Module 07 — Mail Between Worlds
  {
    blk: "7",
    les: "1",
    objectives: [
      "Explain what runs on the client vs the server",
      "Identify trust boundaries in a multiplayer game",
      "Decide where gameplay logic should live for security and fairness",
      "Build a tiny client-server ping demo",
    ],
    sections: [
      {
        title: "Two computers, one game",
        content: `In Roblox, your game is split into two worlds:
- **Client**: each player's own app (camera, input, UI)
- **Server**: the shared authority (real game state)

If you put important logic only on the client, exploiters can fake it. If you put everything on the server, the game feels laggy. Great devs choose the right side for each job.`,
      },
      {
        title: "What belongs where",
        content: `Use this rule of thumb:
- **Client**: visuals, button clicks, local effects
- **Server**: currency, inventory, damage, quest progress

Client asks. Server decides.

\`\`\`lua
-- LocalScript
print("I can read input and update UI")

-- Script (ServerScriptService)
print("I validate and save shared data")
\`\`\``,
      },
      {
        title: "First handshake",
        content: `Set up a tiny communication test before building big systems.

\`\`\`lua
-- LocalScript
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Ping = ReplicatedStorage:WaitForChild("PingServer")
Ping:FireServer("Hello from client!")

-- Script
Ping.OnServerEvent:Connect(function(player, msg)
    print(player.Name .. " says: " .. msg)
end)
\`\`\``,
      },
    ],
    practice: {
      title: "Practice: Trust Boundary Map",
      description: "Create a one-page map for your game idea: list 10 actions and label each as Client, Server, or Both. Then build the ping demo and confirm messages appear in Output from real players.",
      hints: [
        "If cheating would hurt balance, that logic must run on server.",
        "Use ReplicatedStorage for shared remotes, not ServerStorage.",
        "Name remotes clearly: RequestPurchase, CompleteQuest, EquipItem.",
      ],
      optionalChallenge: "Add a second argument to your ping message with `os.clock()` and display round-trip timing in the client UI.",
    },
  },
  {
    blk: "7",
    les: "2",
    objectives: [
      "Use `RemoteEvent` to send one-way messages",
      "Handle `OnServerEvent` and `OnClientEvent` safely",
      "Pass structured data in event payloads",
      "Guard against invalid or spammed requests",
    ],
    sections: [
      {
        title: "RemoteEvent in plain English",
        content: `RemoteEvent is for one-way communication:
- Client -> Server: FireServer(...)
- Server -> Client: FireClient(player, ...) or FireAllClients(...)

Think of it as game mail: no direct return value, just a message sent now.`,
      },
      {
        title: "Minimal event pattern",
        content: `Always validate what arrives from client.

\`\`\`lua
-- Server
BuyItemEvent.OnServerEvent:Connect(function(player, itemId)
    if type(itemId) ~= "string" then return end
    print(player.Name, "requested", itemId)
end)
\`\`\`

Never assume the client sent honest data.`,
      },
      {
        title: "Sending updates back",
        content: `After server processes a request, notify UI with a result event.

\`\`\`lua
-- Server
PurchaseResult:FireClient(player, true, "Sword purchased!")

-- Client
PurchaseResult.OnClientEvent:Connect(function(ok, message)
    StatusLabel.Text = message
end)
\`\`\``,
      },
    ],
    practice: {
      title: "Practice: Event Message Bus",
      description: "Build two remotes: `RequestAction` (client->server) and `ActionResult` (server->client). Send an item id, validate type on server, then return success/fail text to UI.",
      hints: [
        "Use simple payloads first: string id, number price, boolean result.",
        "Return early on invalid data to avoid deep nested code.",
        "Log suspicious payloads for debugging and anti-cheat.",
      ],
      optionalChallenge: "Add a 0.3s cooldown table per player to ignore rapid spam requests.",
    },
  },
  {
    blk: "7",
    les: "3",
    objectives: [
      "Create a `ScreenGui` shop interface",
      "Bind button clicks with `LocalScript`",
      "Display item name, price, and feedback state",
      "Prepare clean data payload for server requests",
    ],
    sections: [
      {
        title: "Shop UI architecture",
        content: `A clean shop UI often has:
- ` + "`ScreenGui`" + ` > ` + "`Frame`" + ` for panel
- list of item cards/buttons
- status label for feedback
- open/close toggle

UI should feel instant and responsive, even before server confirms purchase.`,
      },
      {
        title: "Button click to request purchase",
        content: `Use a LocalScript inside UI to fire server events.

\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RequestPurchase = ReplicatedStorage:WaitForChild("RequestPurchase")

BuySwordButton.MouseButton1Click:Connect(function()
    RequestPurchase:FireServer("sword_basic")
end)
\`\`\``,
      },
      {
        title: "Teen-friendly polish",
        content: `Good UX wins:
- disable button briefly after click
- show "Processing..." then success/fail
- color-code status text
- keep prices readable and consistent

Tiny polish makes your game feel premium, not prototype.`,
      },
    ],
    practice: {
      title: "Practice: Build the Shop ScreenGui",
      description: "Create a shop panel with at least 3 items, each with a buy button. Hook each button to fire `RequestPurchase` with a unique item id and show temporary status text.",
      hints: [
        "Use naming like `Buy_sword_basic` to map button to item id.",
        "Keep all price text from one table to avoid mismatches.",
        "Place UI LocalScripts under `StarterGui` hierarchy.",
      ],
      optionalChallenge: "Animate panel open/close with `TweenService` and blur background while shop is open.",
    },
  },
  {
    blk: "7",
    les: "4",
    objectives: [
      "Validate purchases on the server",
      "Deduct currency safely and atomically",
      "Block fake prices and fake item ids",
      "Return clear result states to the client",
    ],
    sections: [
      {
        title: "Server is the cashier",
        content: `Only the server should:
- store player coins
- know item prices
- approve or deny purchases

Client can ask to buy an item, but server decides if it's legit.`,
      },
      {
        title: "Validation flow",
        content: `Use this order:
1. verify ` + "`itemId`" + ` exists
2. read real server price
3. check player has enough coins
4. deduct coins
5. grant item
6. notify client

\`\`\`lua
if not ShopItems[itemId] then return deny("Unknown item") end
if coins < ShopItems[itemId].price then return deny("Not enough coins") end
coins -= ShopItems[itemId].price
\`\`\``,
      },
      {
        title: "Avoid race conditions",
        content: `Two clicks can arrive quickly. Protect your economy with a per-player lock.

\`\`\`lua
if purchaseLock[player] then return end
purchaseLock[player] = true
-- process purchase
purchaseLock[player] = nil
\`\`\`

Locks prevent double-spend bugs and angry bug reports.`,
      },
    ],
    practice: {
      title: "Practice: Secure Server Shop",
      description: "Implement `RequestPurchase.OnServerEvent` with full validation, coin deduction, and item grant. Send success/fail with message and updated coin balance.",
      hints: [
        "Never trust client-submitted price values.",
        "Keep shop item table in ServerScriptService or ModuleScript.",
        "Always release player lock with `pcall`/safe cleanup.",
      ],
      optionalChallenge: "Add server-side analytics print lines (`player`, `itemId`, `result`) for future balancing.",
    },
  },
  {
    blk: "7",
    les: "5",
    objectives: [
      "Use `RemoteFunction` for request-response communication",
      "Return data from server to client synchronously",
      "Understand when to choose RemoteEvent vs RemoteFunction",
      "Fetch shop catalog from server at runtime",
    ],
    sections: [
      {
        title: "RemoteFunction = question and answer",
        content: `Use ` + "`RemoteFunction`" + ` when client needs immediate returned data.

Example use cases:
- get shop catalog
- ask current coin balance
- validate quick action and get reason`,
      },
      {
        title: "Basic invoke pattern",
        content: `Client calls, server returns.

\`\`\`lua
-- Client
local catalog = GetShopCatalog:InvokeServer()
print("Items:", #catalog)

-- Server
GetShopCatalog.OnServerInvoke = function(player)
    return {
        {id = "sword_basic", price = 100},
        {id = "shield_wood", price = 80}
    }
end
\`\`\``,
      },
      {
        title: "Use the right tool",
        content: `Choose wisely:
- **RemoteEvent**: fire-and-forget action ("buy item")
- **RemoteFunction**: needs immediate return ("what items exist?")

Do not use RemoteFunction for spammy actions every frame. It's blocking and can lag if abused.`,
      },
    ],
    practice: {
      title: "Practice: Dynamic Catalog Loader",
      description: "Store shop items on server and return them with `GetShopCatalog:InvokeServer()`. Build UI cards dynamically from returned table instead of hardcoding item buttons.",
      hints: [
        "Return only safe fields (id, name, price, icon).",
        "Wrap `InvokeServer` in `pcall` to handle failures.",
        "Sort items by price before rendering for clean UX.",
      ],
      optionalChallenge: "Add a second `RemoteFunction` to return player's owned item ids and show `Owned` badges in UI.",
    },
  },
  {
    blk: "7",
    les: "6",
    objectives: [
      "Combine RemoteEvent and RemoteFunction into one shop system",
      "Ship a stable checkpoint feature for module 7",
      "Test with two players for sync and fairness",
      "Document your mini architecture clearly",
    ],
    sections: [
      {
        title: "Checkpoint brief",
        content: `You now have all pieces:
- client UI in ScreenGui
- event-based purchase requests
- server validation and grants
- function-based catalog loading

Today you integrate and polish it into a complete "Shop Checkpoint".`,
      },
      {
        title: "Integration checklist",
        content: `Before calling it done:
- no hardcoded client prices
- every request validated server-side
- clear success/fail feedback
- coin balance updates live
- no script errors in Output`,
      },
      {
        title: "Two-player test protocol",
        content: `Run local server with 2 players:
1. both open shop
2. buy same item repeatedly
3. check each inventory stays independent
4. try fake item id from command bar and ensure denied

If your server survives chaos tests, you built it right.`,
      },
    ],
    practice: {
      title: "Checkpoint: Shop Works End-to-End",
      description: "Deliver a production-ready mini shop: dynamic catalog load, secure purchase processing, owned-state UI, and robust error messages. Record a 60-second demo walkthrough.",
      hints: [
        "Use one ModuleScript for shared item config to prevent drift.",
        "Prefix remotes with domain names like `Shop_RequestPurchase`.",
        "Test edge cases: zero coins, invalid id, rapid clicks.",
      ],
      optionalChallenge: "Add a tiny purchase history panel that lists the last 5 successful buys this session.",
    },
  },

  // Module 08 — Smart Game
  {
    blk: "8",
    les: "1",
    objectives: [
      "Build a basic NPC rig setup for interaction",
      "Configure humanoid properties for believable presence",
      "Trigger a simple greeting prompt",
      "Design NPC role in your game loop",
    ],
    sections: [
      {
        title: "From prop to character",
        content: `An NPC should feel alive, not like a statue. Start with:
- rig (R15 or custom)
- clear name and role
- idle animation
- interaction trigger (ProximityPrompt)

Players trust worlds that feel populated.`,
      },
      {
        title: "First interactable NPC",
        content: `Use a ` + "`ProximityPrompt`" + ` inside NPC root part.

\`\`\`lua
local prompt = npc.HumanoidRootPart:WaitForChild("ProximityPrompt")
prompt.Triggered:Connect(function(player)
    print("Welcome, " .. player.Name .. "!")
end)
\`\`\`

Simple interaction now, full dialogue next lesson.`,
      },
      {
        title: "Role design matters",
        content: `Define this NPC in one sentence:
"This NPC helps players start quests and teaches controls."

Clear role = cleaner code and better user flow.`,
      },
    ],
    practice: {
      title: "Practice: Create a Guide NPC",
      description: "Place an NPC in spawn area with idle animation and ProximityPrompt greeting. Give it a role (guide, merchant, trainer) and consistent visual style.",
      hints: [
        "Rename parts and model for readability (`NPC_Guide_Maya`).",
        "Keep prompt text short and action-based.",
        "Test interaction distance so it feels natural.",
      ],
      optionalChallenge: "Add a floating BillboardGui with NPC title like `Quest Mentor`.",
    },
  },
  {
    blk: "8",
    les: "2",
    objectives: [
      "Build a reusable dialogue data structure",
      "Show dialogue lines in a UI panel",
      "Add next/close flow controls",
      "Trigger dialogue from NPC prompt",
    ],
    sections: [
      {
        title: "Dialogue as data",
        content: `Hardcoding dialogue in scripts gets messy fast. Use a table:

\`\`\`lua
local Dialogue = {
  intro = {
    "Hey builder, welcome back!",
    "Can you help me power the beacon?"
  }
}
\`\`\`

Data-driven systems scale better.`,
      },
      {
        title: "UI conversation loop",
        content: `Client flow:
1. receive dialogue lines
2. show line 1
3. next button increments index
4. end closes panel

Keep text readable, with large font and strong contrast for accessibility.`,
      },
      {
        title: "NPC to dialogue bridge",
        content: `When prompt triggers, server can notify that player to open dialogue UI.

\`\`\`lua
OpenDialogue:FireClient(player, "intro")
\`\`\`

Client then loads lines by key and renders each line.`,
      },
    ],
    practice: {
      title: "Practice: Ship a Dialogue System v1",
      description: "Create one NPC conversation with at least 4 lines, Next and Close buttons, and a clean text box. Trigger it from ProximityPrompt.",
      hints: [
        "Store dialogue keys, not full arrays, in network messages.",
        "Prevent opening a second dialogue while one is active.",
        "Add small speaker name label for clarity.",
      ],
      optionalChallenge: "Add dialogue choices (Yes/No) where each branch shows different next lines.",
    },
  },
  {
    blk: "8",
    les: "3",
    objectives: [
      "Move NPC along a waypoint path",
      "Use `Humanoid:MoveTo()` with sequence logic",
      "Handle pauses and looping patrol behavior",
      "Keep pathing readable and maintainable",
    ],
    sections: [
      {
        title: "Walking NPCs make worlds feel alive",
        content: `Static NPCs are okay. Walking NPCs are memorable. Build patrol routes through named waypoints:
- ` + "`WP_1`" + `, ` + "`WP_2`" + `, ` + "`WP_3`" + `
- loop route with short pauses
- keep speed moderate so movement feels natural`,
      },
      {
        title: "MoveTo loop pattern",
        content: `Use a coroutine loop to patrol:

\`\`\`lua
for _, point in ipairs(waypoints) do
    humanoid:MoveTo(point.Position)
    humanoid.MoveToFinished:Wait()
    task.wait(0.7)
end
\`\`\`

Then wrap in ` + "`while true do`" + ` for endless patrol.`,
      },
      {
        title: "Path reliability tips",
        content: `If NPC gets stuck:
- check obstacles/collisions
- widen path spacing
- reduce sharp turns
- adjust humanoid hip height/jump settings

Visual debug parts help a lot during setup.`,
      },
    ],
    practice: {
      title: "Practice: Patrol NPC Route",
      description: "Create a 5-point patrol path for an NPC in your hub area. NPC should walk continuously, pause briefly at each point, and resume from the start.",
      hints: [
        "Sort waypoints by numeric suffix to keep route order.",
        "Keep waypoints anchored and invisible in final version.",
        "Use prints while debugging, then remove noisy logs.",
      ],
      optionalChallenge: "Trigger a random voice line when NPC reaches each waypoint.",
    },
  },
  {
    blk: "8",
    les: "4",
    objectives: [
      "Design quest data with Lua tables",
      "Track per-player quest state",
      "Implement start/complete reward logic",
      "Sync quest status to UI",
    ],
    sections: [
      {
        title: "Quest system foundation",
        content: `Quests are perfect for table-driven design.

\`\`\`lua
local Quests = {
  firstBeacon = {goal = 3, rewardCoins = 120}
}
\`\`\`

One central table keeps balancing easy.`,
      },
      {
        title: "Per-player progress table",
        content: `Track progress separately:

\`\`\`lua
playerQuestState[player] = {
  firstBeacon = {started = true, progress = 1, completed = false}
}
\`\`\`

Never store one global progress value for all players.`,
      },
      {
        title: "Quest flow",
        content: `Standard loop:
1. player accepts quest
2. actions increment progress
3. server checks completion
4. reward granted once
5. UI updates with current status`,
      },
    ],
    practice: {
      title: "Practice: Build Quest Tables",
      description: "Implement one quest (`collect 5 crystals`) with accept, progress increment, completion reward, and quest status UI text.",
      hints: [
        "Use quest ids as keys (`collect_crystals_01`).",
        "Guard reward with `completed` boolean to prevent double claim.",
        "Send concise UI events: quest id, progress, goal, completed.",
      ],
      optionalChallenge: "Add a second quest unlocked only after the first is completed.",
    },
  },
  {
    blk: "8",
    les: "5",
    objectives: [
      "Create a basic enemy attack loop",
      "Detect players in range and apply damage",
      "Add cooldown logic for fair combat",
      "Telegraph attacks with animation or effects",
    ],
    sections: [
      {
        title: "Enemy behavior states",
        content: `Even simple enemies need states:
- idle
- chase
- attack
- cooldown

State logic keeps combat predictable and teachable.`,
      },
      {
        title: "Range + cooldown attack",
        content: `Server-side attack check example:

\`\`\`lua
if (enemyPos - playerPos).Magnitude <= 6 and not onCooldown then
    onCooldown = true
    humanoid:TakeDamage(12)
    task.delay(1.2, function() onCooldown = false end)
end
\`\`\`

Damage decisions should stay on server.`,
      },
      {
        title: "Readability and fairness",
        content: `Before damage, show a small wind-up animation/sound so players can react. Fair telegraphing feels skill-based, not random.`,
      },
    ],
    practice: {
      title: "Practice: Enemy Attack Prototype",
      description: "Build one enemy that chases nearest player in range and deals periodic damage with cooldown. Add a visible telegraph effect before each hit.",
      hints: [
        "Use CollectionService tag to identify attackable enemies.",
        "Keep damage and cooldown as configurable variables.",
        "Test with two players to ensure target selection is stable.",
      ],
      optionalChallenge: "Add a dodge window: if player jumps during telegraph, reduce incoming damage by 50%.",
    },
  },
  {
    blk: "8",
    les: "6",
    objectives: [
      "Integrate NPC, dialogue, quest, and enemy systems",
      "Create a believable living location checkpoint",
      "Ensure multiplayer-safe behavior for key interactions",
      "Deliver polished module demo flow",
    ],
    sections: [
      {
        title: "Living location blueprint",
        content: `Your area should now include:
- one guide NPC with dialogue
- one patrol NPC
- one quest chain
- one enemy encounter

Players should feel like this place has purpose and stories.`,
      },
      {
        title: "Experience flow test",
        content: `Run this path:
spawn -> talk to guide -> accept quest -> fight enemy -> complete objective -> claim reward.

If all transitions are clear, your location feels "alive".`,
      },
      {
        title: "Checkpoint quality bar",
        content: `No major script errors, readable UI text, clear quest progress, and reliable combat behavior under multiplayer testing.`,
      },
    ],
    practice: {
      title: "Checkpoint: Living Location",
      description: "Build and present a mini zone where NPCs move and talk, quests track progress, enemies attack fairly, and players can complete a full loop from start to reward.",
      hints: [
        "Keep each system in separate scripts/modules for sanity.",
        "Use consistent naming for quest ids and event names.",
        "Record one clean test run to catch UX confusion.",
      ],
      optionalChallenge: "Add ambient environmental events (lights flicker, announcement voice line) that react to quest completion.",
    },
  },

  // Module 09 — Systems Architect
  {
    blk: "9",
    les: "1",
    objectives: [
      "Use `ModuleScript` to share logic across scripts",
      "Separate config/data from runtime behavior",
      "Return clean APIs from modules",
      "Reduce copy-paste through modular design",
    ],
    sections: [
      {
        title: "Why ModuleScript is a superpower",
        content: `Without modules, code gets duplicated fast. With ModuleScripts, you can:
- centralize rules
- reuse functions
- test systems in isolation
- scale your game cleanly`,
      },
      {
        title: "Simple module API pattern",
        content: `Create a module that returns a table of functions.

\`\`\`lua
local InventoryConfig = {}

function InventoryConfig.getMaxSlots(level)
    return 12 + (level * 2)
end

return InventoryConfig
\`\`\``,
      },
      {
        title: "Require and use",
        content: `In another script:

\`\`\`lua
local Config = require(game.ServerScriptService.Modules.InventoryConfig)
local slots = Config.getMaxSlots(3)
print("Slots:", slots)
\`\`\`

Great architecture starts with small modules.`,
      },
    ],
    practice: {
      title: "Practice: First Shared Module",
      description: "Create one ModuleScript for RPG constants (max slots, starter gold, item rarity colors). Require it from at least two scripts.",
      hints: [
        "Keep module names noun-based and specific.",
        "Return only what other scripts should use.",
        "Avoid editing the same constant in many places.",
      ],
      optionalChallenge: "Add a validation function in module that checks whether a rarity string is valid.",
    },
  },
  {
    blk: "9",
    les: "2",
    objectives: [
      "Represent inventory using Lua tables",
      "Store stacks, quantities, and slot data",
      "Add and remove items safely",
      "Handle missing keys without crashes",
    ],
    sections: [
      {
        title: "Inventory table model",
        content: `A practical inventory shape:

\`\`\`lua
inventory = {
  slots = {
    [1] = {itemId = "potion_small", qty = 3},
    [2] = nil
  },
  maxSlots = 20
}
\`\`\``,
      },
      {
        title: "Core operations",
        content: `You'll need helper functions:
- ` + "`addItem(inventory, itemId, qty)`" + `
- ` + "`removeItem(...)`" + `
- ` + "`findItemSlot(...)`" + `

Abstract these into one module, not scattered scripts.`,
      },
      {
        title: "Defensive coding",
        content: `Always guard table access:

\`\`\`lua
if not inventory or not inventory.slots then return false end
\`\`\`

Small checks prevent huge runtime errors in live servers.`,
      },
    ],
    practice: {
      title: "Practice: Inventory Table Operations",
      description: "Implement `addItem`, `removeItem`, and `countItem` functions for your inventory table. Support stackable items and empty slots.",
      hints: [
        "Use item metadata table to know `maxStack` values.",
        "Return success/fail with reason string from each function.",
        "Write tiny test script to call each operation.",
      ],
      optionalChallenge: "Support overflow handling: when one stack is full, continue filling next empty slot automatically.",
    },
  },
  {
    blk: "9",
    les: "3",
    objectives: [
      "Use metatables/tables as object-like structures",
      "Create inventory instances per player",
      "Attach methods for clean OOP-style calls",
      "Keep state encapsulated and readable",
    ],
    sections: [
      {
        title: "Tables can act like objects",
        content: `Lua can mimic classes with metatables. This pattern is perfect for player systems.`,
      },
      {
        title: "Inventory object pattern",
        content: `Example:

\`\`\`lua
local Inventory = {}
Inventory.__index = Inventory

function Inventory.new(maxSlots)
    return setmetatable({slots = {}, maxSlots = maxSlots}, Inventory)
end

function Inventory:add(itemId, qty)
    -- add logic here
end
\`\`\``,
      },
      {
        title: "Why this scales",
        content: `Each player gets their own object:
\`\`\`lua
local inv = Inventory.new(20)
inv:add("potion_small", 2)
\`\`\`

Cleaner than huge global tables and easier to test.`,
      },
    ],
    practice: {
      title: "Practice: Inventory as Object",
      description: "Refactor your inventory system into an object-like module with `new`, `add`, `remove`, and `serialize` methods.",
      hints: [
        "Use `self` consistently in method definitions.",
        "Keep constructor defaults simple and explicit.",
        "Avoid storing player objects directly inside inventory object.",
      ],
      optionalChallenge: "Add `getWeight()` method to total item weight and enforce carry limit.",
    },
  },
  {
    blk: "9",
    les: "4",
    objectives: [
      "Design gear items with stat modifiers",
      "Compute player total stats from equipment",
      "Separate base stats and bonus stats",
      "Update UI and combat values when gear changes",
    ],
    sections: [
      {
        title: "Gear stats model",
        content: `Use one item database:
\`\`\`lua
local Items = {
  sword_bronze = {atk = 5, crit = 0.02},
  armor_cloth = {hp = 20}
}
\`\`\`

Consistent data means faster balancing.`,
      },
      {
        title: "Apply equipped bonuses",
        content: `Compute stats dynamically:
\`\`\`lua
totalAtk = baseAtk + (weapon.atk or 0)
totalHp = baseHp + (armor.hp or 0)
\`\`\`

Never permanently mutate base values when equipping.`,
      },
      {
        title: "System sync points",
        content: `When gear changes:
- recalc server combat stats
- notify client UI
- save updated equipment state

One event, three responsibilities.`,
      },
    ],
    practice: {
      title: "Practice: Gear + Stat Engine",
      description: "Implement 3 equipment slots (weapon, armor, trinket). Equipping an item updates calculated stats and reflects changes in the HUD.",
      hints: [
        "Use nil-safe access (`item and item.atk or 0`).",
        "Store equipped item ids separately from inventory slots.",
        "Trigger one `StatsChanged` event after full recalculation.",
      ],
      optionalChallenge: "Add rarity multipliers so Epic gear scales base item stats by a configurable factor.",
    },
  },
  {
    blk: "9",
    les: "5",
    objectives: [
      "Serialize inventory data for DataStore",
      "Convert runtime tables into save-safe format",
      "Load and reconstruct inventory objects",
      "Handle save/load failures gracefully",
    ],
    sections: [
      {
        title: "Why serialization matters",
        content: `DataStore saves plain Lua data, not object methods. You must convert object state to pure tables before saving.`,
      },
      {
        title: "Serialize and deserialize",
        content: `Example pattern:
\`\`\`lua
function Inventory:serialize()
    return {slots = self.slots, maxSlots = self.maxSlots}
end

function Inventory.fromData(data)
    local inv = Inventory.new(data.maxSlots or 20)
    inv.slots = data.slots or {}
    return inv
end
\`\`\``,
      },
      {
        title: "DataStore safety",
        content: `Use ` + "`pcall`" + ` for GetAsync/SetAsync and queue retries. Never block gameplay forever on save failure; fail gracefully and notify logs.`,
      },
    ],
    practice: {
      title: "Practice: Save-Ready Inventory",
      description: "Implement serialization and loading for your inventory object. Save on player leave and load on join with safe error handling.",
      hints: [
        "Keep save schema version in data (`version = 1`).",
        "Validate loaded data before trusting it.",
        "Throttle saves to avoid DataStore limits.",
      ],
      optionalChallenge: "Add migration support from `version 1` to `version 2` schema without wiping old player data.",
    },
  },
  {
    blk: "9",
    les: "6",
    objectives: [
      "Integrate modular inventory, gear, and persistence",
      "Deliver a stable RPG inventory checkpoint",
      "Test reload persistence with realistic scenarios",
      "Document architecture for future expansion",
    ],
    sections: [
      {
        title: "RPG inventory checkpoint scope",
        content: `Your checkpoint must prove:
- modular code structure
- inventory object methods
- equip stat impact
- save/load persistence`,
      },
      {
        title: "Scenario tests",
        content: `Run these tests:
1. get item, equip it, relog, confirm still equipped
2. fill inventory, relog, verify slot order
3. remove item, relog, ensure removal persisted`,
      },
      {
        title: "Architecture win",
        content: `You are now thinking like a systems architect: reusable modules, trustworthy state, and scalable design.`,
      },
    ],
    practice: {
      title: "Checkpoint: RPG Inventory",
      description: "Ship a modular RPG inventory feature with stackable items, equipment stat bonuses, serialization, and successful persistence after relog testing.",
      hints: [
        "Keep one source of truth for item definitions.",
        "Avoid side effects in serialization helpers.",
        "Write a quick debug command to print serialized data.",
      ],
      optionalChallenge: "Add drag-and-drop slot swapping in UI while preserving correct server authority.",
    },
  },

  // Module 10 — Magic of Details
  {
    blk: "10",
    les: "1",
    objectives: [
      "Use constraints for believable moving structures",
      "Configure hinge and rope constraints correctly",
      "Tune physics properties for gameplay feel",
      "Build a mechanical interaction prototype",
    ],
    sections: [
      {
        title: "Constraints bring worlds to life",
        content: `Constraints are how Roblox objects move with physical rules. Great for doors, bridges, lifts, and traps that feel real.`,
      },
      {
        title: "Hinge + rope essentials",
        content: `Common setup:
- attachments on both connected parts
- ` + "`HingeConstraint`" + ` for rotation
- ` + "`RopeConstraint`" + ` for limited distance

\`\`\`lua
hinge.ActuatorType = Enum.ActuatorType.Motor
hinge.AngularVelocity = 1.5
\`\`\``,
      },
      {
        title: "Gameplay tuning",
        content: `Too fast feels chaotic; too slow feels boring. Adjust limits, motor speed, and damping until movement is readable and fun.`,
      },
    ],
    practice: {
      title: "Practice: Mechanical Door",
      description: "Build a door that swings with a hinge constraint when player presses a button. Add a rope-based hanging platform nearby as a second physics element.",
      hints: [
        "Anchor frame/support parts, not moving parts.",
        "Double-check attachment orientation for clean motion.",
        "Use collision groups if moving parts clip players unfairly.",
      ],
      optionalChallenge: "Create a timed bridge that swings open and closed on a loop players must cross.",
    },
  },
  {
    blk: "10",
    les: "2",
    objectives: [
      "Master TweenService for polished movement",
      "Chain tweens for cinematic interactions",
      "Tween UI and world objects with easing styles",
      "Avoid abrupt transitions in gameplay feedback",
    ],
    sections: [
      {
        title: "Why TweenService matters",
        content: `TweenService is your polish engine. Good tweens make your game feel expensive and intentional.`,
      },
      {
        title: "Core tween pattern",
        content: `Create and play:
\`\`\`lua
local TweenService = game:GetService("TweenService")
local info = TweenInfo.new(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
local tween = TweenService:Create(panel, info, {Position = UDim2.fromScale(0.5, 0.5)})
tween:Play()
\`\`\``,
      },
      {
        title: "Chain and signal",
        content: `Use ` + "`Completed`" + ` to trigger next animation. Chained tweens are perfect for puzzles, reveals, and reward moments.`,
      },
    ],
    practice: {
      title: "Practice: Tween Polish Pack",
      description: "Add 3 tweens: one UI panel opening, one door moving, one collectible pulsing. Use different easing styles and timing for each.",
      hints: [
        "Use shorter tweens for snappy actions, longer for dramatic moments.",
        "Avoid overusing bounce effects; it can look unprofessional.",
        "Store tween settings in variables for easy balancing.",
      ],
      optionalChallenge: "Sequence a mini cinematic: camera pan, door unlock tween, then quest text reveal.",
    },
  },
  {
    blk: "10",
    les: "3",
    objectives: [
      "Use raycasting to detect line-of-sight and hits",
      "Configure raycast filters for accurate results",
      "Apply raycasts to puzzles and interactions",
      "Debug rays visually during development",
    ],
    sections: [
      {
        title: "Raycasting = invisible laser checks",
        content: `Raycasts fire a line through the world and tell you what it hits first. Great for weapons, sensors, and puzzle triggers.`,
      },
      {
        title: "Basic raycast code",
        content: `Example:
\`\`\`lua
local params = RaycastParams.new()
params.FilterType = Enum.RaycastFilterType.Exclude
params.FilterDescendantsInstances = {player.Character}

local result = workspace:Raycast(origin, direction * 100, params)
if result then
    print("Hit:", result.Instance.Name)
end
\`\`\``,
      },
      {
        title: "Debug and confidence",
        content: `Create temporary beam/part visuals to see where your ray travels. Debug visuals save hours when puzzle logic feels inconsistent.`,
      },
    ],
    practice: {
      title: "Practice: Sensor Ray System",
      description: "Build a trigger that checks whether a ray from emitter reaches a target crystal. If blocked, puzzle stays locked; if clear, unlock next step.",
      hints: [
        "Normalize direction vectors before scaling distance.",
        "Exclude moving decorative effects from ray checks.",
        "Use tags to identify valid puzzle targets.",
      ],
      optionalChallenge: "Add color-changing beam effect that turns green only when the ray hits the correct target.",
    },
  },
  {
    blk: "10",
    les: "4",
    objectives: [
      "Combine raycasting and tweens in a laser puzzle",
      "Design multi-step puzzle state logic",
      "Give players readable feedback at each stage",
      "Prevent easy bypass exploits",
    ],
    sections: [
      {
        title: "Laser puzzle structure",
        content: `Core pieces:
- emitters
- mirrors/redirectors
- target nodes
- puzzle state manager

Players should understand cause-and-effect quickly.`,
      },
      {
        title: "State table approach",
        content: `Track activated targets in a table:
\`\`\`lua
local targetState = {A = false, B = false, C = false}
if targetState.A and targetState.B and targetState.C then
    openDoor()
end
\`\`\``,
      },
      {
        title: "Feedback loop",
        content: `Each target should glow/sound when activated. Strong feedback makes puzzle solving satisfying instead of confusing.`,
      },
    ],
    practice: {
      title: "Practice: Build a Laser Puzzle Room",
      description: "Create a puzzle where players rotate 3 mirrors to power 3 targets. When all are active, a door opens with tween + sound.",
      hints: [
        "Store mirror orientation state server-side if it affects progression.",
        "Debounce rotation input to avoid spam jitter.",
        "Reset puzzle cleanly if needed for replay.",
      ],
      optionalChallenge: "Add a time medal system: Gold/Silver/Bronze based on completion speed.",
    },
  },
  {
    blk: "10",
    les: "5",
    objectives: [
      "Use `math.random` for procedural variety",
      "Generate puzzle elements from templates",
      "Balance randomness with fairness",
      "Seed and debug generated layouts",
    ],
    sections: [
      {
        title: "Procedural doesn't mean chaotic",
        content: `Procedural generation creates replayability. But random should still feel intentional and fair for players.`,
      },
      {
        title: "Template + random selection",
        content: `Example:
\`\`\`lua
local layouts = {"LShape", "Cross", "Spiral"}
local pick = layouts[math.random(1, #layouts)]
spawnLayout(pick)
\`\`\`

Use curated templates first before full random geometry.`,
      },
      {
        title: "Fairness rules",
        content: `Set constraints:
- never spawn impossible combinations
- keep difficulty range controlled
- guarantee at least one valid solution`,
      },
    ],
    practice: {
      title: "Practice: Procedural Puzzle Variants",
      description: "Generate one of 4 puzzle room variants each round using `math.random`. Ensure all variants are solvable and have similar difficulty.",
      hints: [
        "Store variant metadata (`difficulty`, `estimatedTime`).",
        "Use deterministic seed in testing mode for repeatability.",
        "Log picked variant ids during balancing.",
      ],
      optionalChallenge: "Add weighted randomness so rare 'legendary' variant appears about 10% of rounds.",
    },
  },
  {
    blk: "10",
    les: "6",
    objectives: [
      "Ship a complete puzzle world checkpoint",
      "Blend constraints, tweens, raycasts, and procedural systems",
      "Validate puzzle quality with player testing",
      "Present a polished technical build",
    ],
    sections: [
      {
        title: "Puzzle world milestone",
        content: `This checkpoint proves you can combine multiple systems into one coherent gameplay experience.`,
      },
      {
        title: "Required ingredients",
        content: `Your world must include:
- at least one constraint-based mechanic
- one tween-driven reveal/interaction
- one raycast-based logic check
- one procedural variation element`,
      },
      {
        title: "Polish checklist",
        content: `Readable clues, smooth transitions, no dead-ends, and reliable completion logic under repeated testing.`,
      },
    ],
    practice: {
      title: "Checkpoint: Puzzle World",
      description: "Deliver a mini puzzle world where players solve mechanical and laser-based challenges with procedural variation and polished feedback from start to finish.",
      hints: [
        "Run 5 full playtests and capture where players get stuck.",
        "Tune timings so puzzle rhythm feels satisfying.",
        "Use clean folder structure for puzzle assets and scripts.",
      ],
      optionalChallenge: "Add adaptive hint system: after 90 seconds stuck, reveal a subtle clue.",
    },
  },

  // Module 11 — Performance & Polish
  {
    blk: "11",
    les: "1",
    objectives: [
      "Organize Explorer with clean naming conventions",
      "Group assets/scripts for fast team navigation",
      "Reduce debugging time with predictable structure",
      "Apply maintainable hierarchy standards",
    ],
    sections: [
      {
        title: "Clean Explorer = faster shipping",
        content: `Messy hierarchy slows everyone down. Use structured folders and clear names so you can fix bugs fast and collaborate better.`,
      },
      {
        title: "Naming standard example",
        content: `Use prefixes by role:
- ` + "`NPC_`" + `, ` + "`FX_`" + `, ` + "`UI_`" + `, ` + "`SFX_`" + `
- scripts: ` + "`Srv_`" + ` for server, ` + "`Cli_`" + ` for client
- remotes: ` + "`Shop_RequestPurchase`" + ` style domain naming`,
      },
      {
        title: "Folder structure baseline",
        content: `Keep systems grouped:
- ` + "`ReplicatedStorage/Remotes`" + `
- ` + "`ServerScriptService/Systems`" + `
- ` + "`StarterGui/Screens`" + `

Future you will thank present you.`,
      },
    ],
    practice: {
      title: "Practice: Explorer Cleanup Sprint",
      description: "Refactor your place hierarchy and naming across key systems (shop, quests, inventory, puzzle). Remove ambiguous names and group assets by system.",
      hints: [
        "Avoid names like `Part`, `Script2`, `FrameNew`.",
        "Refactor in small batches and test after each.",
        "Create a quick style note in README for consistency.",
      ],
      optionalChallenge: "Write a simple validation script that warns about disallowed names (e.g., `Part`, `Model`).",
    },
  },
  {
    blk: "11",
    les: "2",
    objectives: [
      "Create a polished loading flow",
      "Use TeleportService + GUI transitions effectively",
      "Display progress/status messages during load",
      "Improve first-impression UX",
    ],
    sections: [
      {
        title: "Loading is part of gameplay",
        content: `Players decide quickly if your game feels polished. A good loading screen reduces confusion and sets the vibe.`,
      },
      {
        title: "Custom loading UI pattern",
        content: `Show branded loading panel while assets initialize, then fade smoothly into gameplay.`,
      },
      {
        title: "Teleport + loading context",
        content: `When teleporting between places, use transition UI to keep experience seamless.

\`\`\`lua
local TeleportService = game:GetService("TeleportService")
TeleportService:TeleportAsync(placeId, {player})
\`\`\`

Pair teleports with clear on-screen messaging.`,
      },
    ],
    practice: {
      title: "Practice: Pro Loading Sequence",
      description: "Implement a loading screen with branding, rotating tips, and fade transition into spawn. Include teleport transition handling for one destination place.",
      hints: [
        "Preload key assets so first interaction feels smooth.",
        "Use short motivational tips for teen players.",
        "Keep transition duration around 0.4-1.0 seconds.",
      ],
      optionalChallenge: "Display dynamic status text (Loading UI, Loading NPCs, Syncing Profile) tied to real initialization steps.",
    },
  },
  {
    blk: "11",
    les: "3",
    objectives: [
      "Layer sound design for mood and clarity",
      "Separate ambient, UI, and feedback audio channels",
      "Control volume and ducking for readability",
      "Use sound to reinforce gameplay events",
    ],
    sections: [
      {
        title: "Sound is game feel",
        content: `Visuals attract players; audio keeps them immersed. Layer your sound design intentionally.`,
      },
      {
        title: "Three key layers",
        content: `- **Ambient**: location mood
- **UI**: clicks, open/close, confirmations
- **Gameplay feedback**: hits, rewards, unlocks

Each layer should have distinct volume range.`,
      },
      {
        title: "Practical layering rules",
        content: `Keep critical cues louder than ambient. Avoid repetitive spam sounds. Add tiny pitch variation for repeated effects to reduce fatigue.`,
      },
    ],
    practice: {
      title: "Practice: Audio Layer Pass",
      description: "Add and balance at least 8 sounds across ambient, UI, and gameplay layers. Ensure important events (quest complete, puzzle solved) have clear audio feedback.",
      hints: [
        "Normalize loudness to avoid random volume spikes.",
        "Use looped ambience with gentle fade-in/out.",
        "Test with headphones and speakers for balance.",
      ],
      optionalChallenge: "Implement dynamic music intensity: increase layer when enemies aggro, fade back when safe.",
    },
  },
  {
    blk: "11",
    les: "4",
    objectives: [
      "Optimize performance using StreamingEnabled and asset strategy",
      "Reduce unnecessary part count and script load",
      "Profile expensive behaviors in real sessions",
      "Deliver smooth gameplay on lower-end devices",
    ],
    sections: [
      {
        title: "Performance mindset",
        content: `Optimization is not optional. If your game stutters, players leave before seeing your best features.`,
      },
      {
        title: "Key optimization levers",
        content: `- Enable ` + "`StreamingEnabled`" + ` for large worlds
- merge tiny decorative parts when possible
- disable expensive loops when not needed
- reduce overdraw and heavy VFX spam`,
      },
      {
        title: "Script efficiency",
        content: `Avoid ` + "`while true do`" + ` loops with tiny waits everywhere. Prefer events and smart update intervals.

\`\`\`lua
RunService.Heartbeat:Connect(function(dt)
    -- only update when necessary
end)
\`\`\``,
      },
    ],
    practice: {
      title: "Practice: Performance Optimization Pass",
      description: "Audit one playable area and improve performance: enable streaming, cut unnecessary parts/effects, and refactor one inefficient loop.",
      hints: [
        "Measure before/after to prove optimization impact.",
        "Cull invisible detail from long-distance views.",
        "Keep server scripts focused; move visuals client-side.",
      ],
      optionalChallenge: "Create an in-game debug panel showing FPS proxy stats and active entity counts for testing sessions.",
    },
  },
  {
    blk: "11",
    les: "5",
    objectives: [
      "Improve UX with clarity and accessibility",
      "Use readable fonts, contrast, and scaling",
      "Support diverse player needs with options",
      "Reduce frustration in onboarding and core loops",
    ],
    sections: [
      {
        title: "UX is respect for players",
        content: `A great game is not just cool mechanics. It's clear, readable, and welcoming to many players.`,
      },
      {
        title: "Accessibility basics",
        content: `Checklist:
- readable font sizes
- high text/background contrast
- colorblind-safe indicators
- subtitles for key spoken cues
- reduced motion option when possible`,
      },
      {
        title: "Clarity beats complexity",
        content: `If players ask "What do I do now?" your UX needs work. Add clear goals, progress markers, and immediate feedback for key actions.`,
      },
    ],
    practice: {
      title: "Practice: Accessibility + UX Upgrade",
      description: "Improve one full player journey (spawn to first reward) with better labels, clearer objectives, stronger contrast, and reduced confusion points.",
      hints: [
        "Test UI at multiple resolutions and window sizes.",
        "Use icons plus text, not color alone, for states.",
        "Keep core call-to-action buttons visually dominant.",
      ],
      optionalChallenge: "Add a simple settings panel for text size and effect intensity preferences.",
    },
  },
  {
    blk: "11",
    les: "6",
    objectives: [
      "Finalize polish across visuals, audio, UX, and performance",
      "Run a structured quality pass before release module",
      "Prioritize fixes by impact and effort",
      "Ship a polished checkpoint build",
    ],
    sections: [
      {
        title: "Polish checkpoint mission",
        content: `This checkpoint is about transforming "works" into "feels professional".`,
      },
      {
        title: "Final polish rubric",
        content: `Evaluate:
- readability
- responsiveness
- consistency
- stability
- fun factor

Score each area 1-5 and improve weak spots first.`,
      },
      {
        title: "Fix priority strategy",
        content: `Prioritize in this order:
1. blockers/bugs
2. unclear UX
3. performance spikes
4. visual/audio refinements`,
      },
    ],
    practice: {
      title: "Checkpoint: Polished Build",
      description: "Deliver a polished game slice with clean hierarchy, loading flow, layered audio, optimized performance, and accessible UX that feels ready for public players.",
      hints: [
        "Use a simple issue tracker list: bug, owner, status.",
        "Record before/after clips to see polish progress.",
        "Focus on consistency across all screens and systems.",
      ],
      optionalChallenge: "Run a blind playtest with a friend and fix the top 3 confusion points they encounter.",
    },
  },

  // Module 12 — Release Day
  {
    blk: "12",
    les: "1",
    objectives: [
      "Plan a final project using a practical GDD structure",
      "Define core loop, audience, and success metrics",
      "Break scope into realistic milestones",
      "Align feature ideas with time limits",
    ],
    sections: [
      {
        title: "GDD for real creators",
        content: `A Game Design Document keeps your project focused when excitement explodes into too many ideas.`,
      },
      {
        title: "GDD must-have sections",
        content: `- game pitch (1 sentence)
- target player
- core loop
- systems list
- art/audio style
- MVP scope
- release checklist`,
      },
      {
        title: "Scope discipline",
        content: `Pick an MVP you can actually finish. A finished small game beats a giant unfinished dream every time.`,
      },
    ],
    practice: {
      title: "Practice: Final Project GDD",
      description: "Create your final project GDD with core loop, key systems, art/audio mood, timeline, and MVP definition you can complete confidently.",
      hints: [
        "Write pitch like a store blurb, short and catchy.",
        "List 'must have' and 'nice to have' features separately.",
        "Estimate each system in hours, then add 30% buffer.",
      ],
      optionalChallenge: "Add a monetization concept that stays fair and player-friendly.",
    },
  },
  {
    blk: "12",
    les: "2",
    objectives: [
      "Integrate major systems into one coherent game build",
      "Resolve cross-system conflicts and dependencies",
      "Stabilize save, combat, quests, and UI together",
      "Prepare build candidate for playtesting",
    ],
    sections: [
      {
        title: "Integration day mindset",
        content: `Today is where architecture proves itself. Systems must work together, not just in isolation.`,
      },
      {
        title: "Integration order",
        content: `Recommended sequence:
1. profile/loading
2. inventory + gear
3. quests + NPC dialogue
4. combat/puzzle interactions
5. UI and feedback sync`,
      },
      {
        title: "Conflict debugging",
        content: `When systems clash, log event flow and isolate one failing path. Fix root causes, not symptoms.`,
      },
    ],
    practice: {
      title: "Practice: Systems Integration Sprint",
      description: "Merge your core systems into a single playable build with stable progression from onboarding to reward loops.",
      hints: [
        "Keep a temporary integration checklist and tick each system.",
        "Freeze feature additions during integration to avoid chaos.",
        "Create one command to reset profile for repeat tests.",
      ],
      optionalChallenge: "Implement graceful fallback UI when one subsystem fails (e.g., profile data unavailable).",
    },
  },
  {
    blk: "12",
    les: "3",
    objectives: [
      "Run structured playtesting sessions",
      "Use a checklist to capture bugs and UX pain points",
      "Prioritize fixes for launch readiness",
      "Translate tester feedback into actionable tasks",
    ],
    sections: [
      {
        title: "Playtesting with purpose",
        content: `Don't just watch friends play. Run sessions with clear goals and measurable observations.`,
      },
      {
        title: "Checklist template",
        content: `Track:
- onboarding clarity
- first 10-minute retention feel
- bug count by severity
- performance spikes
- confusion moments`,
      },
      {
        title: "Feedback to fixes",
        content: `Group feedback into:
- critical bugs
- UX confusion
- balancing tweaks
- cosmetic ideas

Launch fixes first three categories before nice-to-haves.`,
      },
    ],
    practice: {
      title: "Practice: Playtesting Checklist Run",
      description: "Run at least 3 playtest sessions using a checklist template and produce a prioritized fix list with owners and deadlines.",
      hints: [
        "Ask testers to think aloud while they play.",
        "Record session timestamps for each issue.",
        "Fix repeated pain points before one-off opinions.",
      ],
      optionalChallenge: "Create a short survey form and compare player ratings before and after your top fixes.",
    },
  },
  {
    blk: "12",
    les: "4",
    objectives: [
      "Publish a Roblox experience correctly",
      "Configure game settings, icon, and thumbnail assets",
      "Set permissions, age guidelines, and basic moderation readiness",
      "Perform a final pre-publish sanity pass",
    ],
    sections: [
      {
        title: "Publish pipeline overview",
        content: `Release is more than pressing Publish. You need metadata, settings, visuals, and safety checks done right.`,
      },
      {
        title: "Step-by-step publish flow",
        content: `1. File -> Publish to Roblox
2. set title + description
3. upload icon + thumbnails
4. configure access/settings
5. test live version link`,
      },
      {
        title: "Launch safety basics",
        content: `Double-check permissions, chat/filter behavior, and reporting routes. A safe game earns trust and long-term growth.`,
      },
    ],
    practice: {
      title: "Practice: Publish to Roblox",
      description: "Publish your final project with complete listing metadata, polished icon/thumbnail pack, and validated gameplay link.",
      hints: [
        "Write description with clear gameplay promise and hooks.",
        "Use high-contrast thumbnail that explains game at a glance.",
        "Test published build from a fresh account if possible.",
      ],
      optionalChallenge: "Prepare A/B thumbnail variants and track early click-through performance manually.",
    },
  },
  {
    blk: "12",
    les: "5",
    objectives: [
      "Build a developer portfolio entry for your game",
      "Write a compelling devforum-style post",
      "Show systems, process, and outcomes clearly",
      "Present your work as a serious creator",
    ],
    sections: [
      {
        title: "Portfolio storytelling",
        content: `A strong portfolio doesn't just show screenshots. It shows your thinking, systems, and growth as a developer.`,
      },
      {
        title: "Post structure that works",
        content: `Use this format:
- game pitch
- what you built technically
- hardest challenge and fix
- lessons learned
- media (GIFs/screens)
- play link`,
      },
      {
        title: "Devforum-ready voice",
        content: `Be clear, humble, and specific. Avoid hype-only language. Real builders explain process and evidence.`,
      },
    ],
    practice: {
      title: "Practice: Portfolio + Devforum Draft",
      description: "Create a polished portfolio page/post for your game including technical highlights, iteration story, visuals, and playable link.",
      hints: [
        "Use before/after examples to show progress.",
        "Highlight 3 systems you are most proud of.",
        "End with a clear call for feedback.",
      ],
      optionalChallenge: "Record a 90-second trailer and embed it with your post as your primary showcase asset.",
    },
  },
  {
    blk: "12",
    les: "6",
    objectives: [
      "Prepare and deliver a confident showcase presentation",
      "Demonstrate gameplay and technical systems live",
      "Answer audience questions clearly",
      "Celebrate completion with a launch-ready mindset",
    ],
    sections: [
      {
        title: "SHOWCASE DAY goals",
        content: `Today you present like a real game developer: clear story, smooth demo, honest reflection, strong finish.`,
      },
      {
        title: "Presentation blueprint",
        content: `Recommended flow:
1. 20-second pitch
2. gameplay demo
3. system deep dive
4. challenge + solution
5. next update roadmap`,
      },
      {
        title: "Demo confidence tips",
        content: `Prepare backup paths if live demo fails. Keep key talking points printed. Confidence comes from rehearsal, not luck.`,
      },
    ],
    practice: {
      title: "SHOWCASE DAY Presentation",
      description: "Deliver your final game showcase with a live walkthrough, technical highlights, key lessons learned, and future roadmap.",
      hints: [
        "Rehearse timing at least 3 times before presenting.",
        "Have screenshots/video backup in case of live issues.",
        "End with one specific ask: feedback, testers, or collaborators.",
      ],
      optionalChallenge: "Host a post-show Q&A and collect feature requests into a public roadmap board.",
    },
  },
];

export default lessons;
