/** Roblox Module 10 EN - 8 уроків (prod-92), живий хаб */
import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson101 = {
 lessonId: "lesson-roblox-10-1",
 moduleId: "module-10",
 order: 1,
 title: "10.1 - Hub build + RS/SSS",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Build a readable hub space: Spawn, Shop / NPC / Puzzle zones",
 "Lay out Workspace folders using the course naming standard",
 "Prepare ReplicatedStorage (Remotes, Modules) and ServerScriptService (Systems)",
 "Make a Shop ScreenGui stub for a LocalScript (no full checkout yet)",
 "Review Script vs LocalScript and where each belongs"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 73 of 92)",
 content: `The **Living Hub** module starts here. Next come a Remotes shop, anti-cheat, NPC, pathfinding, quest, inventory/Raycast, and Ship. All of that falls apart if today has no **floor under the systems**.

You are not writing a full checkout today. Today you:
1. Build the **hub space** (spawn + 3 zones).
2. Place **service folders** in RS and SSS.
3. Prepare an **empty ShopGui shell** plus a reminder why UI runs on LocalScript.
4. Save the Place as the base for all of module 10.

The hub is the **city**. RS/SSS are the **city hall and document warehouse**. Without streets and city hall, there is nowhere to put the shop and NPCs.

**Do now (2 min):** new Place or a copy of your cleanest world → Save as \`Lesson 10.1 - Hub Base\`.`,
 },
 {
 title: "What a hub means in this course",
 content: `| Hub | Not a hub |
|-----|--------|
| One scene that systems live from | Five unrelated Baseplates |
| Zones visible from a distance | Everything dumped in one Part pile |
| Player knows where to go in ≤30-60 s | Pretty, but no route |
| Slots for shop/NPC/puzzle | Decorative lobby only, no slots |

A hub can be small: a 40×40 platform, three colored zones, signs. Better **small and clear** than a giant maze with no meaning.

After M9 you already feel the network. M10 builds the **social/service** layer: buy, talk, finish a quest, solve a room.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "One-hour build plan (golden zones)",
 content: `Minimum map:

| Zone | Color/marker | Why |
|------|--------------|--------|
| **Spawn** | SpawnLocation | Start |
| **Shop** | blue floor / sign | Checkout tomorrow in 10.2 |
| **NPC** | yellow "!" | 10.4-10.6 |
| **Puzzle** | purple box room | 10.7 |

Build steps (~20-25 min):
1. Hub floor + landmark walls (full building optional).
2. SpawnLocation at center/entrance, Anchored.
3. Three zone Part platforms named \`Zone_Shop\`, \`Zone_NPC\`, \`Zone_Puzzle\`.
4. Signs (SurfaceGui or Billboard) with one sentence each.
5. Lighting: one solid Lighting setup, no Neon spam everywhere.

Do not drag in a whole Toolbox city. Every extra model is Explorer clutter before 11.1.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Workspace folder standard",
 content: `Suggested skeleton:

\`Workspace/Hub/\`
\` ├── Spawn/\`
\` ├── Zones/\` (Shop, NPC, Puzzle)
\` ├── Props/\` (decor)
\` ├── NPCs/\` (empty for now, or a mannequin)
\` └── PuzzleRoom/\` (empty room stub)

Naming rules:
- no 40× \`Part\`;
- zone prefixes \`Zone_\`;
- models with capitals \`NPC_\`, \`Door_\`, and so on.

**Do now (5 min):** create the folders and move Parts you already built inside. If something is temporary, use \`Hub/_Trash\` for today and delete it at the end of the lesson.`,
 },
 {
 title: "ReplicatedStorage: what goes here and why",
 content: `**ReplicatedStorage (RS)** is storage that **both server and client can see** (it replicates).

Create today:

| Folder / object | Why |
|----------------|--------|
| \`RS/Remotes/\` | ShopBuy / ShopQuery land here tomorrow (empty is fine, or create the names now) |
| \`RS/Modules/\` | Shared ModuleScripts you can require from client and server (be careful with secrets!) |
| \`RS/Assets/\` (optional) | UI/icon templates if the client needs them |

**Do not** put server secrets in RS: real keys, admin passwords, private Config with cheat data. Shop prices belong in **SSS/Modules** (server only, plus whatever you choose to send through a Remote).

Reminder: the client can read what is in RS. So RS is not a safe.

**Do now (4 min):** change one value in a table/Config and confirm the new behavior.`,
 },
 {
 title: "ServerScriptService: hub systems",
 content: `**ServerScriptService (SSS)** holds scripts and modules the **client cannot see as editable code**.

Today:

| Folder | Why |
|-------|--------|
| \`SSS/Systems/\` | Stubs \`Srv_Shop\`, \`Srv_Quest\`… (empty Disabled Scripts are fine for now) |
| \`SSS/Modules/\` | ShopConfig, Inventory, QuestConfig appear in 10.2-10.7 |
| \`SSS/Boot/\` (optional) | One Script that guarantees leaderstats |

You can create Disabled scripts with the right names now so tomorrow you are not hunting "where do I write this".

\`ServerStorage\` is for Tools/templates only the server clones. If you plan a shop Tool, make \`ServerStorage/ShopTools\` today.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Script vs LocalScript: cheat sheet before the shop",
 content: `| | Script | LocalScript |
|--|--------|-------------|
| Where it runs | Server | Client (player) |
| Typical homes | SSS, Workspace (server) | StarterGui, StarterPlayerScripts, Tool |
| Sees | The true world, economy | Screen, input, local UX |
| Hub example | Deduct Coins, OnServerEvent | Open ShopGui, FireServer |

Mistake: put a LocalScript in SSS. It will **not run** as you expect. Opposite mistake: a Script in StarterGui will not replace player UI logic.

Today's stub: a **LocalScript** in ShopGui only \`print("Shop UI ready")\` and shows/hides a Frame. Checkout is tomorrow.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "ShopGui stub (no full logic)",
 content: `In \`StarterGui\` create:

1. ScreenGui \`ShopGui\` (\`Enabled = false\` at first).
2. Frame \`Main\` (center, high-contrast background).
3. TextLabel \`Title\` = "Shop".
4. TextButton \`Close\`.
5. ScrollingFrame \`List\` + UIListLayout.
6. Frame \`ItemTemplate\` (Visible=false) with Name / Price / Buy.
7. TextLabel \`Balance\` = "Coins: -".
8. LocalScript \`ShopClient\` with the minimum:

\`local gui = script.Parent\`
\`local main = gui:WaitForChild("Main")\`
\`main.Close.MouseButton1Click:Connect(function()\`
\` gui.Enabled = false\`
\`end)\`
\`print("Shop UI ready")\`

Open button on the HUD or a Part \`ShopOpen\` with ClickDetector/Prompt: for now a LocalScript in StarterPlayerScripts that sets \`ShopGui.Enabled = true\` is fine. Or a sign "Checkout here tomorrow".

The point is the **Gui exists and opens**. You will draw the item list from the catalog in 10.2.

**Do now (4 min):** update the HUD after a server value change without faking it on the client.`,
 },
 {
 title: "leaderstats in the hub (check)",
 content: `Shop and quest in module 10 use **Coins**. Check:

1. Is there a server Script that creates \`leaderstats/Coins\` on PlayerAdded?
2. If not, add a minimum in \`SSS/Boot/Leaderstats.lua\` (Script):

\`game.Players.PlayerAdded:Connect(function(player)\`
\` local folder = Instance.new("Folder")\`
\` folder.Name = "leaderstats"\`
\` folder.Parent = player\`
\` local coins = Instance.new("IntValue")\`
\` coins.Name = "Coins"\`
\` coins.Value = 100 -- hub test start\`
\` coins.Parent = folder\`
\`end)\`

Test 100 coins is fine for learning. In the final build you will tune balance with quests.

Without this check, tomorrow's lesson becomes "why doesn't checkout deduct".

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Hub onboarding from day one",
 content: `Even an empty shell should explain the route:

*"1) Blue zone: shop. 2) Yellow: NPC. 3) Purple: puzzle. Start at the sign."*

Place an arrow from Parts or a bright Part marker from Spawn to Shop.

Check: enter Play, look away from the screen for 5 s, look again. Can you see three zones without a teacher explaining?

Same muscle as Demo Ready, just at module start.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "What you deliberately skip today",
 content: `- Full shop with Remotes (that is 10.2).
- Full quest and Raycast (10.6-10.7).
- Ten Toolbox NPCs with foreign scripts.
- Giant open world with 10 minutes of walking between zones.
- Publish Public.

Do: **build + folders + Gui shell + leaderstats boot + Save**.

Anything "I already know Remotes" can be sketched as names in RS/Remotes, but leave Buy logic for tomorrow or you will smear the hour.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Lesson 73 hand-in checklist + bridge forward",
 content: `- [ ] Hub with Spawn and 3 zones (Shop/NPC/Puzzle)
- [ ] Workspace/Hub/... folders
- [ ] RS/Remotes (+ optional empty Remote names)
- [ ] SSS/Systems and SSS/Modules
- [ ] ShopGui stub opens/closes
- [ ] leaderstats.Coins exists after Join
- [ ] Onboarding signs
- [ ] Save: Lesson 10.1 - Hub Base

| Next | What sits on this frame |
|------|------------------------|
| 10.2 | Remotes checkout + Config |
| 10.3 | Buy protection |
| 10.4-10.5 | NPC in Zone_NPC |
| 10.6-10.7 | Quest + puzzle |
| 10.8 | Ship the whole hub |

If the frame is crooked, the whole module hurts. Better 40 studs of clean hub than a "city" where you cannot find Zone_Shop.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Start Remotes/checkout before folders and zones",
 explanation: "Code exists, world does not. Confusion tomorrow.",
 correctApproach: "Build and RS/SSS frame first",
 },
 {
 mistake: "LocalScript in ServerScriptService",
 explanation: "UI/client logic does not live there.",
 correctApproach: "ShopClient in StarterGui/ShopGui",
 },
 {
 mistake: "Secret price list in ReplicatedStorage as the only source with no server copy",
 explanation: "Client can see RS; checkout must be controlled on the server.",
 correctApproach: "ShopConfig in SSS/Modules (tomorrow)",
 },
 {
 mistake: "40 unnamed Parts with no folders",
 explanation: "Module 10 becomes a swamp.",
 correctApproach: "Hub/Zones/Props and clear names",
 },
 {
 mistake: "No leaderstats at hub start",
 explanation: "Shop and quest have nowhere to write coins.",
 correctApproach: "Boot Script on PlayerAdded",
 },
 {
 mistake: "Toolbox city instead of three zones",
 explanation: "The hour burns, systems never appear.",
 correctApproach: "Small readable hub",
 }
 ],
 summary: "You laid the living-hub base: Shop/NPC/Puzzle zones, Workspace folders, RS/SSS frame, a ShopGui stub on LocalScript, and a leaderstats check. Shop, NPC, and quests in module 10 will sit on this skeleton.",
 practiceTask: {
 title: "Hub Base (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** hub space + service folders + Gui shell.

### Part A - Build (12 min)
1. Floor + SpawnLocation.
2. Zone_Shop, Zone_NPC, Zone_Puzzle with markers.
3. 3 short signs.
4. Workspace/Hub/... folders.

### Part B - RS/SSS (8 min)
1. RS/Remotes (optionally create empty ShopBuy, ShopQuery).
2. SSS/Systems, SSS/Modules.
3. Boot leaderstats.Coins (test 100).

### Part C - ShopGui (10 min)
1. ScreenGui with Main/List/ItemTemplate/Close/Balance.
2. LocalScript: close + print ready.
3. A way to open the Gui (button/Prompt).
4. **Save:** Lesson 10.1 - Hub Base`,
 hints: [
 "Names and folders first, polish later",
 "Enabled=false on ShopGui by default",
 "Check TAB: do Coins exist after Play?"
 ],
 optionalChallenge: "Part arrow from Spawn to Shop with Neon and label \"Shop →\".",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the main goal of lesson 10.1?",
 options: [
          "Build the hub space and RS/SSS/UI folder frame for module systems",
          "Ship the whole course immediately",
          "Delete leaderstats",
          "Wire only GamePass with no hub"
        ],
 correctAnswer: 0,
 explanation: "Base for M10.",
 },
 {
 id: "q2",
 type: MC,
 question: "Which three zones should you place at minimum?",
 options: [
          "Only sky and ocean",
          "Shop, NPC, Puzzle (+ Spawn)",
          "Only 50 Toolbox trees",
          "Only DataStore with no world"
        ],
 correctAnswer: 1,
 explanation: "Slots for 10.2-10.7.",
 },
 {
 id: "q3",
 type: MC,
 question: "What is ReplicatedStorage in the hub context?",
 options: [
          "A place only for Terrain",
          "A folder the client can never see anything in",
          "Storage available to client and server (for example Remotes)",
          "A replacement for Workspace"
        ],
 correctAnswer: 2,
 explanation: "Shared replication.",
 },
 {
 id: "q4",
 type: MC,
 question: "Where should server systems like Srv_Shop live?",
 options: [
          "In a LocalScript inside a decor Part",
          "In Lighting",
          "In the SpawnLocation name",
          "In ServerScriptService (Systems)"
        ],
 correctAnswer: 3,
 explanation: "SSS for server logic.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why is a LocalScript in SSS a bad idea for shop UI?",
 options: [
          "LocalScript is always faster in SSS",
          "Client UI code should live in StarterGui / client containers",
          "SSS deletes ScreenGui",
          "Remotes do not work with Gui"
        ],
 correctAnswer: 1,
 explanation: "Correct script placement.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why stub ShopGui already in 10.1?",
 options: [
          "To replace Pathfinding",
          "Gui is banned in 10.2",
          "So tomorrow in 10.2 you only fill Remotes logic, not build UI from scratch",
          "To disable Explorer"
        ],
 correctAnswer: 2,
 explanation: "Storefront prep.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why should shop prices not be treated as a \"secret in RS\"?",
 options: [
          "The client can see ReplicatedStorage contents",
          "RS does not exist in Roblox",
          "Prices can only be set in Terrain",
          "RemoteEvent destroys Modules"
        ],
 correctAnswer: 0,
 explanation: "RS is not a safe.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why leaderstats.Coins already at hub start?",
 options: [
          "Coins are only for the sky",
          "Without Coins a Part cannot be created",
          "This disables Prompt",
          "Shop and quests in the module will write to the same economy"
        ],
 correctAnswer: 3,
 explanation: "Shared M10 currency.",
 },
 {
 id: "q9",
 type: MC,
 question: "What do we deliberately leave from 10.1 for 10.2?",
 options: [
          "Creating SpawnLocation",
          "Zones folders",
          "Full Buy logic / Remotes catalog",
          "Onboarding sign"
        ],
 correctAnswer: 2,
 explanation: "Scope control.",
 },
 {
 id: "q10",
 type: MC,
 question: "Which build style is better for hand-in?",
 options: [
          "Giant Toolbox city with no systems",
          "Small readable hub with names and zones",
          "Empty Baseplate with no Spawn",
          "Only ParticleEmitter with no floor"
        ],
 correctAnswer: 1,
 explanation: "Clarity > scale.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why create RS/Remotes already today?",
 options: [
          "To replace Workspace",
          "Remotes only work in ServerStorage",
          "This is only needed for Atmosphere",
          "So there is a place for ShopBuy/ShopQuery tomorrow"
        ],
 correctAnswer: 3,
 explanation: "Network frame.",
 },
 {
 id: "q12",
 type: MC,
 question: "Who draws the shop screen for the player?",
 options: [
          "LocalScript in ShopGui (client)",
          "Only a ModuleScript in ServerStorage with no Gui",
          "Terrain Editor",
          "PathfindingService"
        ],
 correctAnswer: 0,
 explanation: "UI on the client.",
 },
 {
 id: "q13",
 type: MC,
 question: "Why place signs near zones already in 10.1?",
 options: [
          "Signs replace Remotes",
          "Without signs Humanoid does not work",
          "Onboarding: the player understands the hub route",
          "This disables SSS"
        ],
 correctAnswer: 2,
 explanation: "Space clarity.",
 },
 {
 id: "q14",
 type: MC,
 question: "What belongs in ServerStorage for a future shop?",
 options: [
          "All of the player's LocalScripts",
          "The entire Workspace, required",
          "Lighting effects only there",
          "Tool/item templates the server clones"
        ],
 correctAnswer: 3,
 explanation: "Server templates.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 10.1 hand-in artifact?",
 options: [
          "Theory only, no Place",
          "Hub Base: zones, RS/SSS frame, ShopGui stub, Coins, Save",
          "Full Ship with no folders",
          "Shop with client-side price and no hub"
        ],
 correctAnswer: 1,
 explanation: "You need the hub frame.",
 }
 ],
 },
}

export const enLesson102 = {
 lessonId: "lesson-roblox-10-2",
 moduleId: "module-10",
 order: 2,
 title: "10.2 - Shop: RemoteEvent + RemoteFunction",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Explain RemoteEvent vs RemoteFunction and when to use each",
 "Build a ShopConfig table of items with prices on the server",
 "Build the shop UI (ScrollingFrame + list) on LocalScript",
 "Purchase via FireServer(itemId) with Coins and price checks on the server",
 "Get catalog/balance via RemoteFunction (InvokeServer)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 74 of 92)",
 content: `This is the **anchor lesson** of the Living Hub module. Today you stitch three worlds you already learned separately:

1. **UI on LocalScript** (shop screen).
2. **Remotes** (client ↔ server).
3. **leaderstats Coins** (economy).

Tomorrow (**10.3**) you add anti-cheat and GamePass lite. Today the foundation must be honest: **price never comes from the client**.

Work in the hub from **10.1** (RS/SSS folders, UI stub). If the hub is still thin, one Shop room + Spawn is enough.

**Do now (3 min):** in \`ReplicatedStorage\` create Folder \`Remotes\` and two objects: RemoteEvent \`ShopBuy\`, RemoteFunction \`ShopQuery\`.`,
 },
 {
 title: "Why the shop goes through the network",
 content: `| LocalScript only | Script + Remotes |
|------------------|------------------|
| Coins can be faked | Server changes Coins |
| Price from TextLabel | Price from ShopConfig |
| "Bought" only on one screen | Everyone sees updated TAB balance |
| Solo demo | Multiplayer-ready stub |

UI is the **storefront**. Remote is the **call to the warehouse**. Server is the **cashier with the price list**. The storefront must not open the safe alone.

If Solo "works anyway" without a Remote, in a real FilteringEnabled game the client does **not** control foreign/server state the way it seems. Learn the correct path first.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "RemoteEvent vs RemoteFunction",
 content: `| | RemoteEvent | RemoteFunction |
|--|-------------|----------------|
| Idea | "Message / signal" | "Request → response" |
| Client → server | \`FireServer(...)\` | \`InvokeServer(...)\` → return |
| Server → client | \`FireClient\` / \`FireAllClients\` | \`InvokeClient\` (rare, careful) |
| Typical for shop | **Buy** (bought / tried) | **Catalog / balance** (give data) |
| Blocks? | No (event) | Yes, waits for reply |

Course rule:
- **ShopBuy** = RemoteEvent (after checks the server can FireClient "ok/fail").
- **ShopQuery** = RemoteFunction (client asks \`GetCatalog\` or \`GetBalance\` and gets a table/number).

Do not shove everything into one Remote "just in case". Different verbs = different types.

**Do now (4 min):** make one Remote call and note who decides: client or server.`,
 },
 {
 title: "Shop file map",
 content: `| Place | What lives there |
|-------|-----------|
| \`RS/Remotes/ShopBuy\` | RemoteEvent |
| \`RS/Remotes/ShopQuery\` | RemoteFunction |
| \`SSS/Modules/ShopConfig.lua\` | item table |
| \`SSS/Srv_Shop.lua\` | OnServerEvent + OnServerInvoke |
| \`StarterGui/ShopGui\` | Frame, ScrollingFrame, button template |
| \`ShopGui/LocalScript\` | open UI, Invoke catalog, FireServer Buy |
| leaderstats.Coins | already from sim/hub (server creates) |

Keep names stable. Tomorrow anti-cheat and NPC will hook the same Remotes.

If leaderstats is still missing, **first** spend 8-10 min on minimal PlayerAdded → Folder leaderstats → IntValue Coins. Without that, checkout is empty.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "ShopConfig: price list only here",
 content: `ModuleScript returns a table:

\`local ShopConfig = {\`
\` speed_coil = {\`
\` id = "speed_coil",\`
\` name = "Speed Coil",\`
\` price = 50,\`
\` description = "Slightly faster run (demo)",\`
\` },\`
\` trail_red = {\`
\` id = "trail_red",\`
\` name = "Red Trail",\`
\` price = 30,\`
\` description = "Red trail",\`
\` },\`
\`}\`
\`return ShopConfig\`

Server:
\`local ShopConfig = require(SSS.Modules.ShopConfig)\`
\`local item = ShopConfig[itemId]\`
\`local price = item.price\`

The client **may** show price from a RemoteFunction reply (server sent the catalog). But on Buy the server **reads Config again** and does not trust the number on the button.

Minimum for hand-in: **2 items** with different prices.

**Do now (4 min):** make one Remote call and note who decides: client or server.`,
 },
 {
 title: "Shop UI: what to build by hand",
 content: `Minimum frame:

1. ScreenGui \`ShopGui\` (ResetOnSpawn = false is often nicer).
2. Frame \`Main\` centered.
3. TextLabel title "Hub Shop".
4. TextButton \`Close\`.
5. ScrollingFrame \`List\` + UIListLayout.
6. Template \`ItemTemplate\` (Frame): NameLabel, PriceLabel, BuyButton. Start Visible=false; LocalScript clones it.

Hub open button: Part with ProximityPrompt "Open shop" **or** TextButton on HUD. Prompt → LocalScript listens… stop: Prompt.Triggered is often easier on the server with FireClient "OpenShop", or LocalScript with context. For a start, a **key/HUD button** without Prompt is enough.

**Do now (7 min):** build the Gui and one test Buy button with no logic, only print.`,
 },
 {
 title: "RemoteFunction: catalog to the client",
 content: `Server:

\`ShopQuery.OnServerInvoke = function(player, action)\`
\` if action == "catalog" then\`
\` local list = {}\`
\` for id, item in pairs(ShopConfig) do\`
\` table.insert(list, { id = id, name = item.name, price = item.price, description = item.description })\`
\` end\`
\` return list\`
\` elseif action == "balance" then\`
\` local coins = player.leaderstats.Coins.Value\`
\` return coins\`
\` end\`
\` return nil\`
\`end\`

Client (opening the shop):

\`local catalog = ShopQuery:InvokeServer("catalog")\`
\`local balance = ShopQuery:InvokeServer("balance")\`
\`-- draw list from catalog, show balance\`

InvokeServer **waits**. Do not click Buy 20 times while the catalog loads. Get the list first.

Beginner mistake: keep ShopConfig only in LocalScript. Then the server has no shared price list.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "RemoteEvent: purchase",
 content: `Client on BuyButton:

\`ShopBuy:FireServer(item.id)\` -- id only!

Server:

\`ShopBuy.OnServerEvent:Connect(function(player, itemId)\`
\` if typeof(itemId) ~= "string" then return end\`
\` local item = ShopConfig[itemId]\`
\` if not item then return end\`
\` local coins = player.leaderstats.Coins\`
\` if coins.Value < item.price then\`
\` ShopBuy:FireClient(player, false, "Not enough coins")\`
\` return\`
\` end\`
\` coins.Value -= item.price\`
\` giveItem(player, itemId) -- Tool / Attribute / print at start\`
\` ShopBuy:FireClient(player, true, "Bought: " .. item.name)\`
\`end)\`

\`giveItem\` today can be:
- \`print\` + Attribute \`Owns_speed_coil=true\`;
- or a Tool in Backpack;
- or just a confirmation for the demo.

The point is **Coins deduction** and a reply to the client.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Client after Buy reply",
 content: `LocalScript:

\`ShopBuy.OnClientEvent:Connect(function(ok, message)\`
\` statusLabel.Text = message\`
\` if ok then\`
\` balanceLabel.Text = "Coins: " .. ShopQuery:InvokeServer("balance")\`
\` -- optionally refresh list / disable button\`
\` end\`
\`end)\`

Do not change \`leaderstats.Coins.Value\` from LocalScript "for speed". TAB updates from replicated server Value anyway; for HUD, Invoke balance or listen to \`Coins.Changed\` on the client (leaderstats replicate).

\`Coins:GetPropertyChangedSignal("Value")\` in LocalScript is a solid HUD path without extra Invoke.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Drawing the list from the catalog",
 content: `Pseudo:

\`for _, entry in ipairs(catalog) do\`
\` local row = template:Clone()\`
\` row.Visible = true\`
\` row.NameLabel.Text = entry.name\`
\` row.PriceLabel.Text = tostring(entry.price) .. " coins"\`
\` row.BuyButton.MouseButton1Click:Connect(function()\`
\` ShopBuy:FireServer(entry.id)\`
\` end)\`
\` row.Parent = list\`
\`end\`

Before reopening, clear old rows (except the template) or you get duplicate buttons.

UIListLayout + CanvasSize: for 2-4 items you can set by hand; for long lists you will learn AutomaticCanvasSize later.

**Do now (4 min):** make one Remote call and note who decides: client or server.`,
 },
 {
 title: "giveItem without magic (honest options)",
 content: `| Option | How | For hand-in |
|---------|-----|-----------|
| Attribute | \`player:SetAttribute("Owns_"..id, true)\` | Fastest |
| Tool | Clone Tool from SSS.ServerStorage into Backpack | Wow |
| Print only | Output "gave item" | Temporary for debug |

Do not grant the item **before** the coin check. Do not grant if \`alreadyOwns\` and the item is one-time (today you may allow repurchase for simplicity, but then it is a "pack", not a unique skin).

Tomorrow in 10.3 you add cooldown and stricter validation. Keep the code readable.

**Do now (3 min):** find one symptom from the table in your Place and fix it or confirm it is absent.`,
 },
 {
 title: "Typical Remotes breakage in the shop",
 content: `| Symptom | Likely cause |
|---------|------------------|
| Invoke returns nil | OnServerInvoke not set / wrong action |
| Buy "does nothing" | OnServerEvent in the wrong Script / Remote name mismatch |
| Coins do not change | No leaderstats / writing the wrong Value |
| Free purchase | Price taken from client or price=0 in Config |
| Works only in Studio Solo "sometimes" | Check Script is in SSS, LocalScript in Gui |
| Error "not a valid member Remotes" | WaitForChild("Remotes") / replication order |

Always:
\`local RS = game:GetService("ReplicatedStorage")\`
\`local Remotes = RS:WaitForChild("Remotes")\`
\`local ShopBuy = Remotes:WaitForChild("ShopBuy")\`

**Do now (3 min):** find one symptom from the table in your Place and fix it or confirm it is absent.`,
 },
 {
 title: "Economy mini-test (required)",
 content: `| # | Action | Expectation |
|---|-----|------------|
| 1 | Open shop | List of 2+ items with prices |
| 2 | UI balance ≈ TAB | Matches |
| 3 | Buy with enough Coins | Deduction, ok message |
| 4 | Buy with not enough | No deduction, fail text |
| 5 | FireServer a fake id | Ignore / fail |
| 6 | Output | No red on the path |

If row 3 is green and 4 is red (still sells), checkout is leaky. Do not move on.

Save: \`Lesson 10.2 - Hub Shop\`.

**Do now (5 min):** run the test table once and record pass/fail for each row.`,
 },
 {
 title: "Link to 9.x, 10.3, and Ship",
 content: `| Before | Today | Next |
|------|----------|------|
| 9.4 RemoteEvent | Buy + client reply | 10.3 rate limit, GamePass kind |
| leaderstats in sim | Same currency in the hub | Quest 10.6 writes coins here too |
| UI LocalScript | Shop storefront | NPC 10.4 does not replace checkout |

Anchor criterion: in 60 s you can explain to a teacher *who sets the price* and *which Remote does what*.

Hand-in checklist:
- [ ] ShopConfig Module
- [ ] ShopBuy Event + ShopQuery Function
- [ ] UI list from Invoke catalog
- [ ] Buy with itemId only
- [ ] Coins deducted on server
- [ ] ok/fail on client
- [ ] Save Hub Shop

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "FireServer(itemId, price) and server trusts price",
 explanation: "Free purchases.",
 correctApproach: "itemId only; price from ShopConfig",
 },
 {
 mistake: "Whole shop in LocalScript with no Remotes",
 explanation: "No server economy.",
 correctApproach: "UI on client, checkout on server",
 },
 {
 mistake: "Confuse FireServer with InvokeServer",
 explanation: "Buy as Function or catalog as Event with no reply: confusion.",
 correctApproach: "Buy=Event, Query=Function",
 },
 {
 mistake: "No WaitForChild on Remotes",
 explanation: "Rare nil errors at start.",
 correctApproach: "WaitForChild in a chain",
 },
 {
 mistake: "Clone ItemTemplate without clearing List",
 explanation: "Duplicate buttons every open.",
 correctApproach: "Clear rows before rebuild",
 },
 {
 mistake: "giveItem before coin check",
 explanation: "Item without payment.",
 correctApproach: "First balance ≥ price, then deduct and grant",
 }
 ],
 summary: "You built a full vertical hub shop: ShopConfig on the server, RemoteFunction for catalog/balance, RemoteEvent for Buy with Coins checks, LocalScript UI only as the storefront. This is the network+economy anchor before anti-cheat and NPC.",
 practiceTask: {
 title: "Hub checkout (~30-35 min)",
 difficulty: "intermediate",
 description: `**Goal:** 2 items, catalog via Invoke, purchase via FireServer.

### Part A - Remotes + Config (8 min)
1. RS/Remotes: ShopBuy, ShopQuery.
2. Module ShopConfig with 2 items.
3. Confirm leaderstats.Coins exists (give yourself test 100).

### Part B - Server (12 min)
1. OnServerInvoke: catalog + balance.
2. OnServerEvent Buy: validate, price from Config, deduct, giveItem lite, FireClient ok/fail.

### Part C - UI (10-15 min)
1. ShopGui + list from template.
2. Invoke catalog on open.
3. Buy buttons → FireServer(id).
4. Status message.
5. **Save:** Lesson 10.2 - Hub Shop`,
 hints: [
 "Catalog print on client first, then Gui",
 "Test coins only through a server Script",
 "Remote names must match character for character"
 ],
 optionalChallenge: "Third item + already owned (Attribute) → Buy button Disabled.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What is the main goal of lesson 10.2?",
 options: [
          "Build the shop: UI + Remotes + server prices/Coins",
          "Only paint the sky",
          "Remove RemoteEvent from the course",
          "Replace leaderstats with Lighting"
        ],
 correctAnswer: 0,
 explanation: "Vertical shop slice.",
 },
 {
 id: "q2",
 type: MC,
 question: "What is better for a \"buy\" signal?",
 options: [
          "LocalScript only, no network",
          "RemoteEvent (FireServer itemId)",
          "BindableEvent in Workspace as a server replacement",
          "Rename a Part"
        ],
 correctAnswer: 1,
 explanation: "Buy = event on the server.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why use RemoteFunction in the shop?",
 options: [
          "To disable Anchored",
          "To create Terrain",
          "So the client gets catalog/balance as an InvokeServer reply",
          "It is a forbidden object"
        ],
 correctAnswer: 2,
 explanation: "Request → response.",
 },
 {
 id: "q4",
 type: MC,
 question: "Where does the server get the item price?",
 options: [
          "From the client's price argument with no check",
          "Directly from the button TextLabel",
          "From ClockTime",
          "From ShopConfig on the server"
        ],
 correctAnswer: 3,
 explanation: "Server price list.",
 },
 {
 id: "q5",
 type: MC,
 question: "What should the client send in ShopBuy?",
 options: [
          "New Coins for all players",
          "itemId",
          "An arbitrary price of 0",
          "loadstring code"
        ],
 correctAnswer: 1,
 explanation: "Only the identifier.",
 },
 {
 id: "q6",
 type: MC,
 question: "Where should Coins deduction logic live?",
 options: [
          "Only in the shop LocalScript",
          "In BillboardGui with no server",
          "In a server Script (SSS)",
          "In SoundService"
        ],
 correctAnswer: 2,
 explanation: "Economy on the server.",
 },
 {
 id: "q7",
 type: MC,
 question: "How does InvokeServer differ from FireServer?",
 options: [
          "Invoke waits and returns a result; Fire is a signal with no return",
          "They are always identical",
          "FireServer only works on the server",
          "InvokeServer does not need a RemoteFunction"
        ],
 correctAnswer: 0,
 explanation: "Event vs request.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why WaitForChild for Remotes?",
 options: [
          "It disables the shop",
          "Without it Config does not compile",
          "WaitForChild replaces OnServerEvent",
          "The object may not have replicated to the client yet"
        ],
 correctAnswer: 3,
 explanation: "Reliable client start.",
 },
 {
 id: "q9",
 type: MC,
 question: "What to do when coins are insufficient?",
 options: [
          "Grant the item anyway",
          "Set Coins negative on the client",
          "Do not deduct and send a fail message to the client",
          "Delete ShopConfig"
        ],
 correctAnswer: 2,
 explanation: "Honest refusal.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why ScrollingFrame + ItemTemplate?",
 options: [
          "To replace RemoteEvent",
          "To draw an item list with Buy buttons from the catalog",
          "Required for Pathfinding",
          "To create Humanoid"
        ],
 correctAnswer: 1,
 explanation: "UI list.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why is it bad to keep the only price list in LocalScript?",
 options: [
          "LocalScript cannot draw TextLabel",
          "RemoteFunction is then forbidden",
          "Coins never replicate",
          "The server has no source of truth for Buy"
        ],
 correctAnswer: 3,
 explanation: "Config on the server.",
 },
 {
 id: "q12",
 type: MC,
 question: "What is the minimum item count for lesson hand-in?",
 options: [
          "At least 2 with different prices",
          "Exactly 100 required",
          "0: theory only",
          "Only 1 with no UI"
        ],
 correctAnswer: 0,
 explanation: "Catalog demo.",
 },
 {
 id: "q13",
 type: MC,
 question: "What is sensible after a successful Buy on the client?",
 options: [
          "Assign yourself Coins locally at random",
          "Disable SSS",
          "Update status/balance UI (Changed or Invoke balance)",
          "Delete RemoteFunction"
        ],
 correctAnswer: 2,
 explanation: "Storefront feedback.",
 },
 {
 id: "q14",
 type: MC,
 question: "What comes tomorrow in 10.3 on top of this shop?",
 options: [
          "Deleting all Remotes",
          "Only Terrain Paint",
          "Full UI replacement with Output",
          "Anti-cheat lite (rate limit and more) and a GamePass dictionary"
        ],
 correctAnswer: 3,
 explanation: "Next lesson.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 10.2 hand-in artifact?",
 options: [
          "Only an empty Frame with no Remotes",
          "Working Hub Shop: catalog Invoke + Buy Event + Coins from Config + Save",
          "Baseplate with no Scripts",
          "Shop with price only on the client"
        ],
 correctAnswer: 1,
 explanation: "You need the full vertical slice.",
 }
 ],
 },
}

export const enLesson103 = {
 lessonId: "lesson-roblox-10-3",
 moduleId: "module-10",
 order: 3,
 title: "10.3 - Anti-cheat + GamePass lite",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Explain Never trust the client for shop and rewards",
 "Add rate limit / debounce on the Buy Remote",
 "Validate itemId, Config price, Coins balance, and player state on the server",
 "Distinguish coins (leaderstats) from GamePass / DevProduct at the concept level",
 "Know school policy: what you can demo-explain, and what not to promise in prod without permission"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 75 of 92)",
 content: `In **10.2** you built a shop: UI → Remote → server → Coins. Today you make that shop **hard to break in 30 seconds** and learn how live Robux purchases differ from hub coins.

Two lesson blocks:
1. **Anti-cheat lite** for the existing Buy.
2. **GamePass / DevProduct lite**: dictionary + school policy, no requirement to wire Robux checkout in class.

Work in the same Place as the 10.2 shop. Do not start a new world.

**Do now (2 min):** open the server purchase script and mark in pencil: where does price come from? client or Config?`,
 },
 {
 title: "Why \"almost works\" means a vulnerable shop",
 content: `| Looks fine in Solo | What a curious player will do |
|--------------------|----------------------------|
| LocalScript changes Coins | Add 999999 to self |
| Client sends price=0 | Buy everything free |
| No pause between Buy | Spam 100 events / second |
| Server trusts "I have GamePass" from client | Fake premium |
| No log | You will not know what broke |

The client is a **note from a student** ("I already turned in the work"). The server is the **teacher with the gradebook**. The gradebook is never rewritten from the student's word without a check.

**Never trust the client** means any number from LocalScript (price, coins, "success") is suspicious until the server computes it itself.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Buy protection checklist (required minimum)",
 content: `Before you check "anti-cheat ready", on every Buy the server must:

1. Know **who** is buying (\`player\` from OnServerEvent, not a name from client args as the only proof).
2. Accept only **itemId** (string/key), not price.
3. Find the item in **ShopConfig** on the server; if missing, deny.
4. Take \`price\` **only** from Config.
5. Read Coins from **leaderstats** (or your own server state).
6. If \`coins < price\` → FireClient error, return.
7. Deduct coins, grant item, confirm to client.
8. **Rate limit**: no more often than once per X ms from the same player.

If items 2-4 were already in 10.2, today you finish 6-8 and add deny logging.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 },
 {
 title: "Rate limit / debounce on Remote",
 content: `Without a limit, an exploit or UI bug can send Buy hundreds of times. Even an honest double-click sometimes buys twice.

Per-player idea:

\`local lastBuyAt = {}\` -- [userId] = os.clock()
\`local COOLDOWN = 0.35\`

\`BuyEvent.OnServerEvent:Connect(function(player, itemId)\`
\` local now = os.clock()\`
\` local prev = lastBuyAt[player.UserId] or 0\`
\` if now - prev < COOLDOWN then\`
\` return -- or suspicion counter\`
\` end\`
\` lastBuyAt[player.UserId] = now\`
\` tryBuy(player, itemId)\`
\`end)\`

On \`Players.PlayerRemoving\`, remove the table entry so it does not grow forever.

This is **lite**, not a corporate anti-cheat. For the course: no instant spam + no price from the client is enough.

Challenge: after 10 rejected spam attempts in a row, \`warn\` in Output for the teacher (in Studio).

**Do now (4 min):** try a purchase with 0 coins and after a successful purchase, check TAB/Output.`,
 },
 {
 title: "Validating itemId and argument types",
 content: `The client can send anything: a number, a table, a huge string, nil.

\`local function tryBuy(player, itemId)\`
\` if typeof(itemId) ~= "string" then return end\`
\` if #itemId > 32 then return end\`
\` local item = ShopConfig[itemId]\`
\` if not item then\`
\` deny(player, "No such item")\`
\` return\`
\` end\`
\` ...\`
\`end\`

Also:
- never run \`loadstring\` from the client;
- do not trust a second \`amount\` argument ("buy 999") without server limits;
- if the item is one-time, check \`alreadyOwns\` before deducting coins.

**Do now (6 min):** add typeof check and COOLDOWN to your Buy handler.`,
 },
 {
 title: "Log and player message",
 content: `| Event | What the player sees | What you see in Output |
|-------|-------------------|----------------------|
| Success | "Bought!" + UI update | \`[Shop] ok user item\` |
| Low coins | "Not enough coins" | \`[Shop] deny poor\` |
| Unknown itemId | "Item unavailable" | \`[Shop] deny bad id\` |
| Rate limit | Silence or "Wait" | \`[Shop] deny rate\` |

Do not show players internal Config paths. Do not call a child "hacker" in UI. A neutral deny is enough.

The log exists so a 1-minute playtest shows whether the UI is sending garbage or the economy does not match.

**Do now (4 min):** change one value in a table/Config and confirm the new behavior.`,
 },
 {
 title: "Coins vs GamePass vs DevProduct (dictionary)",
 content: `| Type | What it is | Typical case |
|-----|-------|--------------|
| **Coins (leaderstats)** | In-game currency you grant via quests/collecting | Daily hub shop |
| **GamePass** | One-time Robux pass "you have it forever" (within the pass) | VIP, x2, exclusive skin |
| **Developer Product** | Robux purchase you can repeat | Coin packs, one-shot bundles |

Important for ages ~9-13:
- Coins: **you control** the rules in Lua.
- GamePass/Product: money through the Roblox economy; you need **IDs from Creator Dashboard**, server checks via official APIs (like MarketplaceService), not "client said they bought".

Today you are **not required** to wire real Robux checkout in class. You **are** required **not to confuse** these three in hub design.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "GamePass lite: how to think in architecture",
 content: `Even without live payments, reserve a place in Config:

\`vip_trail = {\`
\` id = "vip_trail",\`
\` kind = "gamepass", -- not "coins"\`
\` gamePassId = 0, -- put a real ID only with permission\`
\` coinPrice = nil,\`
\`}\`

\`potion = {\`
\` id = "potion",\`
\` kind = "coins",\`
\` price = 50,\`
\`}\`

tryBuy logic:
- if \`kind == "coins"\` → your Coins check;
- if \`kind == "gamepass"\` → a **separate** branch: ownership check on the server (when allowed), not Coins deduction.

Beginner mistake: VIP button just does \`Coins.Value = 999999\` on the client. That is not GamePass. That is a broken economy.

Class demo (no Robux): Attribute \`DemoVIP=true\` set **only by teacher/server** to test the UI "premium looks different" branch. Note: *not production*.

**Do now (4 min):** try a purchase with 0 coins and after a successful purchase, check TAB/Output.`,
 },
 {
 title: "School / course policy (read aloud)",
 content: `Lock this in for yourself and for parent/school context:

1. In SmartCode lessons the **main learning currency** is Coins and game logic, not earning from children.
2. Real GamePass/DevProduct only if there is **school/product permission** and an adult account with Creator access.
3. Do not ask classmates to transfer Robux "for a test".
4. Do not promise in a pitch "I will make a million on passes" if you cannot protect the server.
5. In a portfolio you can write: *"GamePass slot planned; demo uses coin shop"*.

If your class bans any Robux purchases, make the whole shop Coins-only and learn the dictionary in theory. That still counts as lesson hand-in.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Typical attacks on a student shop (and defense)",
 content: `| Attack / bug | Lite defense |
|-------------|-------------|
| Fake price from client | Price only from ShopConfig |
| FireServer spam | COOLDOWN / rate limit |
| Buying a nonexistent id | Key check in Config |
| Double item grant | alreadyOwns / capped stack |
| "Grant VIP" from LocalScript | Server pass check / demo flag only from server |
| Negative coins | Balance check before deduct; Value not below 0 |

You do not need to study hacking tools. You need **server validation habits**, the same as in 9.4 RemoteEvent and the 10.2 shop.

**Do now (3 min):** find one symptom from the table in your Place and fix it or confirm it is absent.`,
 },
 {
 title: "15-minute security mini-practice",
 content: `Run deliberate "attacks" on your own shop in Studio (learning, not harming others):

1. From LocalScript temporarily send Buy with a missing \`itemId\` → should deny.
2. Send number \`123\` instead of a string → deny.
3. Click Buy 10 times fast → cooldown should fire (not 10 purchases).
4. Set yourself low Coins and buy something expensive → "not enough" message.
5. Remove price from client args entirely (if it was still there) → shop still reads Config.

Note what was already protected from 10.2 and what you added today.

Save: \`Lesson 10.3 - Shop Guard\`.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Lesson 75 hand-in checklist",
 content: `- [ ] Buy does not accept price from the client
- [ ] typeof/existence of itemId in Config
- [ ] Coins check before deduct
- [ ] Per-player rate limit
- [ ] Clear deny messages + log
- [ ] Config has at least a comment/field kind for coins vs gamepass
- [ ] Robux policy read (no fake payment promises)
- [ ] Save Lesson 10.3 - Shop Guard

Next (10.4) we go to NPC. The shop should no longer break from a double-click.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Price or \"purchase success\" comes from LocalScript",
 explanation: "Shop broken in a minute.",
 correctApproach: "itemId from client, price and result from server/Config",
 },
 {
 mistake: "No cooldown on Buy",
 explanation: "Double-click and spam break economy/inventory.",
 correctApproach: "lastBuyAt + COOLDOWN",
 },
 {
 mistake: "VIP button sets coins/flag on the client",
 explanation: "That is not GamePass, that is a cheat.",
 correctApproach: "Separate server branch kind=gamepass / demo flag from server",
 },
 {
 mistake: "Confuse GamePass and DevProduct",
 explanation: "Wrong monetization model and expectations.",
 correctApproach: "Forever pass vs repeatable product: lesson table",
 },
 {
 mistake: "Promise live Robux purchases without school policy",
 explanation: "Conflict with course/parent rules.",
 correctApproach: "Coins as the base; GamePass only with permission",
 },
 {
 mistake: "Silent deny with no log during debug",
 explanation: "Unclear whether UI or server is at fault.",
 correctApproach: "warn/print [Shop] tags while learning",
 }
 ],
 summary: "You hardened the shop: rate limit, itemId validation, price only from Config, denies with a log. Separately you mapped Coins vs GamePass vs DevProduct and school policy lite. The hub is ready for NPC without a leaky checkout.",
 practiceTask: {
 title: "Shop Guard (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** protected Buy + GamePass dictionary in Config.

### Part A - Audit 10.2 (5 min)
1. Find OnServerEvent Buy.
2. Note: is price in client args? if yes, remove it.

### Part B - Protection (15 min)
1. typeof itemId + presence in ShopConfig.
2. COOLDOWN 0.35+ s per UserId.
3. deny + messages for poor/bad id/rate.
4. [Shop] log in Output.

### Part C - GamePass lite (10 min)
1. Add kind field (coins / gamepass) in Config for at least 1 stub item.
2. Split branches in tryBuy (gamepass can deny "soon" or use a server demo flag for now).
3. **Save:** Lesson 10.3 - Shop Guard`,
 hints: [
 "First break your shop on purpose in Solo, then fix it",
 "PlayerRemoving clears lastBuyAt",
 "Do not wire real Robux without teacher permission"
 ],
 optionalChallenge: "spamStrikes counter: after 10 rate-denies per minute, briefly Disabled Prompt/Buy buttons on the client via FireClient.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "What does Never trust the client mean in the shop?",
 options: [
          "Price, coins, and purchase success are checked/set by the server, not LocalScript",
          "The client is always right",
          "RemoteEvents are forbidden",
          "Config must live only in StarterGui"
        ],
 correctAnswer: 0,
 explanation: "Server truth.",
 },
 {
 id: "q2",
 type: MC,
 question: "What can the client safely send in Buy?",
 options: [
          "Any price of 0",
          "The item's itemId",
          "A new value for someone else's Coins",
          "A loadstring command"
        ],
 correctAnswer: 1,
 explanation: "Only the identifier.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why rate limit / COOLDOWN on Buy?",
 options: [
          "To disable Pathfinding",
          "To replace leaderstats",
          "So spam and double-click do not run dozens of purchases",
          "Only needed for Terrain"
        ],
 correctAnswer: 2,
 explanation: "Spam protection.",
 },
 {
 id: "q4",
 type: MC,
 question: "Where does the server get price?",
 options: [
          "From a TextLabel on the client",
          "From the price argument with no check",
          "From Lighting.ClockTime",
          "From ShopConfig on the server"
        ],
 correctAnswer: 3,
 explanation: "Config = source of truth.",
 },
 {
 id: "q5",
 type: MC,
 question: "How does GamePass differ from DevProduct in the lesson dictionary?",
 options: [
          "They are always completely identical",
          "A pass is usually one-time \"forever\"; DevProduct can be bought repeatedly",
          "DevProduct exists only on the client",
          "GamePass is always leaderstats Coins"
        ],
 correctAnswer: 1,
 explanation: "Different purchase models.",
 },
 {
 id: "q6",
 type: MC,
 question: "What is the main learning currency of the hub in this course?",
 options: [
          "Required real Robux from classmates",
          "Only ParticleEmitter",
          "Coins in leaderstats / in-game economy",
          "Part names"
        ],
 correctAnswer: 2,
 explanation: "Course policy: Coins first.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why is it bad to trust LocalScript \"I have VIP\"?",
 options: [
          "The client can be faked; ownership must be checked on the server",
          "VIP does not exist in Roblox",
          "LocalScript cannot show UI",
          "The server cannot see players"
        ],
 correctAnswer: 0,
 explanation: "Premium is also Never trust client.",
 },
 {
 id: "q8",
 type: MC,
 question: "Why typeof(itemId) ~= \"string\" → return?",
 options: [
          "To speed up Terrain",
          "To open NPC dialogue",
          "This disables RemoteEvent forever",
          "Reject garbage arguments from the client"
        ],
 correctAnswer: 3,
 explanation: "Input validation.",
 },
 {
 id: "q9",
 type: MC,
 question: "What to do with real Robux payment in a school context?",
 options: [
          "Always demand Robux from classmates in class",
          "Ignore any rules",
          "Only with school/teacher permission and adult Creator access",
          "Wire only through LocalScript"
        ],
 correctAnswer: 2,
 explanation: "Policy lite.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why kind = coins/gamepass in Config?",
 options: [
          "To change the sky color",
          "So tryBuy picks the correct check branch",
          "To delete Prompt",
          "Only cosmetics with no meaning"
        ],
 correctAnswer: 1,
 explanation: "Item architecture.",
 },
 {
 id: "q11",
 type: MC,
 question: "Which playtest catches the \"price from client\" hole?",
 options: [
          "Change floor Material",
          "Disable Output",
          "Rename Workspace",
          "Send Buy with a faked/zero price and see whether the server uses Config"
        ],
 correctAnswer: 3,
 explanation: "Deliberate check.",
 },
 {
 id: "q12",
 type: MC,
 question: "What to show the player when coins are insufficient?",
 options: [
          "Clear \"Not enough coins\" (and do not deduct)",
          "Silence and a negative balance",
          "Crash Studio",
          "Automatic GamePass"
        ],
 correctAnswer: 0,
 explanation: "Deny UX.",
 },
 {
 id: "q13",
 type: MC,
 question: "Why a [Shop] log in Output while learning?",
 options: [
          "To replace Config",
          "To disable anti-cheat",
          "Quickly see the deny reason during playtest",
          "Logs are banned in Studio"
        ],
 correctAnswer: 2,
 explanation: "Diagnostics.",
 },
 {
 id: "q14",
 type: MC,
 question: "What protects against double grant of a one-time item?",
 options: [
          "Trusting a client flag with no server",
          "Deleting ShopConfig",
          "Increasing MaxActivationDistance",
          "alreadyOwns check before deduct/grant"
        ],
 correctAnswer: 3,
 explanation: "Server ownership state.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 10.3 hand-in artifact?",
 options: [
          "Theory only, no shop changes",
          "Protected Buy (config price, validate, cooldown) + GamePass lite understanding + Save",
          "Empty Baseplate",
          "Client Coins with no server"
        ],
 correctAnswer: 1,
 explanation: "You need a hardened shop.",
 }
 ],
 },
}

export const enLesson104 = {
 lessonId: "lesson-roblox-10-4",
 moduleId: "module-10",
 order: 4,
 title: "10.4 - NPC + Prompt + dialogue",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Build a readable NPC (Model, Humanoid or mannequin, Explorer names)",
 "Configure ProximityPrompt: ObjectText, ActionText, HoldDuration, MaxActivationDistance",
 "Show dialogue with if branches by state (hello / busy / goodbye)",
 "Wire Prompt on the server and safely update UI on the client",
 "Prepare the NPC as an anchor for pathfinding (10.5) and quest (10.6)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 76 of 92)",
 content: `A hub without an NPC feels like an empty warehouse. Today a **character you can talk to** appears.

You will make:
1. Model \`NPC_QuestGiver\` (or another clear name).
2. **ProximityPrompt**: walk up, press E (or hold), interaction starts.
3. **Dialogue with if branches**: different lines by state (first time / already talked / quest later).

Tomorrow the NPC learns to walk (10.5), the day after it becomes a quest giver with a table (10.6). Today the foundation: **build + Prompt + clear lines**.

Do not spend an hour on a perfect Toolbox face. Prefer a stable mannequin with Billboard "!" and a clean Prompt.

**Do now (3 min):** create Model \`NPC_QuestGiver\` in folder \`Workspace/Hub/NPCs/\`.`,
 },
 {
 title: "NPC in the hub: minimum you need",
 content: `| Element | Why |
|---------|--------|
| Model with a clear name | Find in Explorer in 2 s |
| Humanoid + HumanoidRootPart **or** simple R6/mannequin | Looks like a character; for a static NPC Parts alone can be enough |
| PrimaryPart (preferably HRP) | Easy to teleport / pathfinding tomorrow |
| Anchored on "legs"/torso if standing | Does not fall or explode |
| BillboardGui with "!" or name | Player sees from afar "you can talk here" |
| ProximityPrompt in HRP or torso | Interaction zone |

Toolbox NPCs often drag extra Scripts. Rule: **paste → immediately disable/delete suspicious Scripts**, keep mesh and Humanoid. You will write your own dialogue.

A static mannequin of 4 Parts is fine for hand-in if Prompt and dialogue work.

**Do now (4 min):** one hit/hazard in Play. Health should change on the server, not in LocalScript.`,
 },
 {
 title: "ProximityPrompt vs ClickDetector",
 content: `| | ProximityPrompt | ClickDetector |
|--|-----------------|---------------|
| How to interact | Walk up + key / hold | Mouse click on Part |
| Mobile | Better UX | Worse on touch |
| Hint | ObjectText + ActionText built in | Need your own UI |
| For NPC | **Recommended** | OK for wall buttons |

Today's hub standard is **ProximityPrompt**.

Important properties:

| Property | Typical start | Meaning |
|----------|---------------|------|
| \`ObjectText\` | NPC name | Top line |
| \`ActionText\` | "Talk" | What the player will do |
| \`MaxActivationDistance\` | 8-12 | How close to walk |
| \`HoldDuration\` | 0 or 0.3 | Instant vs hold |
| \`RequiresLineOfSight\` | true at first | No click through walls |
| \`Enabled\` | true | Can disable during a cutscene |

**Do now (4 min):** put Prompt in HRP, set short texts.`,
 },
 {
 title: "Where to listen to Triggered: server",
 content: `\`ProximityPrompt.Triggered\` is best handled in a **server Script** (or a Module the server calls).

Why:
- tomorrow quest and rewards come from here;
- "already greeted" state cannot be faked by the client;
- one code path for all players.

Pattern:

\`local prompt = npc.HumanoidRootPart.ProximityPrompt\`
\`prompt.Triggered:Connect(function(player)\`
\` onTalk(player, npc)\`
\`end)\`

\`player\` is who pressed. Always check the character exists if you need extra distance (Prompt already filters distance, but an extra check helps in quests).

LocalScript may only **show** the dialogue window after a server signal (\`FireClient\`), not decide "which quest is done".

**Do now (4 min):** one hit/hazard in Play. Health should change on the server, not in LocalScript.`,
 },
 {
 title: "Dialogue = data + if branches",
 content: `Do not smear text across 15 places. Make a lines table (stub for QuestConfig tomorrow):

\`local Lines = {\`
\` greet = "Hi! I am the hub master. Tomorrow I will give a task.",\`
\` again = "We already talked. Explore the hub; quest soon.",\`
\` busy = "Busy right now. Come back a bit later.",\`
\`}\`

Per-player state (Attribute or server table):
- \`TalkCount\`
- or \`HasMetNpc = true/false\`

Branches:

\`local function onTalk(player, npc)\`
\` local met = player:GetAttribute("HasMet_" .. npc.Name)\`
\` if not met then\`
\` player:SetAttribute("HasMet_" .. npc.Name, true)\`
\` showDialogue(player, Lines.greet)\`
\` else\`
\` showDialogue(player, Lines.again)\`
\` end\`
\`end\`

This is already **real dialogue**, not one print for everyone. For a third branch add Attribute \`NpcBusy\` on the NPC or time of day: challenge.

Keep "you" style: short sentences, no bureaucracy.

**Do now (4 min):** change one value in a table/Config and confirm the new behavior.`,
 },
 {
 title: "How to show text to the player",
 content: `| Method | Plus | Minus |
|--------|------|-------|
| \`print\` in Output | Fast debug | Player does not see it |
| Billboard above NPC for 3 s | Simple | Little room for long text |
| ScreenGui Dialogue + RemoteEvent | Like real games | A bit more assembly |
| TextChatService / chat | Atmosphere | More setup |

Recommended lesson minimum:
1. RemoteEvent \`RS/Remotes/DialogueShow\`.
2. Server: \`DialogueShow:FireClient(player, text)\`.
3. LocalScript in StarterGui: shows Frame with TextLabel 4-6 seconds, "OK" button hides it.

Do not keep dialogue truth only in LocalScript. The server says **which** line to show (or key \`greet\`/\`again\`, and the client maps to text: also fine if texts are not secret).

**Do now (4 min):** make one Remote call and note who decides: client or server.`,
 },
 {
 title: "Billboard \"!\" and readability",
 content: `The player should understand in 2 seconds: *you can walk here*.

Practice:
- BillboardGui on Head/HRP, \`AlwaysOnTop = true\` carefully (do not shine through every wall without need);
- TextLabel "!" or name;
- color contrasting with hub background;
- StudsOffset a bit above the head.

When dialogue is open, you can temporarily set \`prompt.Enabled = false\` so Triggered does not spam. After UI closes, true again (via Remote "dialogue closed" or a server timer).

**Anti-spam:** 0.5-1 s debounce on Triggered for the same player+npc.

**Do now (3 min):** walk up to the Prompt in Play and confirm Triggered once.`,
 },
 {
 title: "Line of sight and hub geometry",
 content: `\`RequiresLineOfSight = true\` saves you from activating through a shop wall. But:

| Problem | Fix |
|----------|------|
| Prompt does not appear near NPC | Increase MaxActivationDistance; check Prompt is on the correct Parent |
| Appears through thin decor | Turn on LineOfSight; remove extra collision from decor, or the opposite |
| Need a button "behind the counter" | false for LineOfSight **on purpose**, not by accident |
| Prompt rotates in the wrong place | Parent = HRP, not a random Accessory |

Test: stand behind a wall and confirm you do not talk to the NPC by accident. Stand in front: you talk.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Several branches: template for expansion",
 content: `Stub for quest (no rewards yet):

\`local function onTalk(player, npc)\`
\` local status = player:GetAttribute("QuestStatus") or "none"\`
\` if status == "none" then\`
\` show(player, "Want a quest? Officially tomorrow. Today we just meet.")\`
\` player:SetAttribute("HasMet_QuestGiver", true)\`
\` elseif status == "active" then\`
\` show(player, "You are still in progress. Come back when ready.")\`
\` elseif status == "ready" then\`
\` show(player, "I see you are almost ready to turn in!")\`
\` else\`
\` show(player, "Thanks for the help. Have a good day in the hub!")\`
\` end\`
\`end\`

Today \`QuestStatus\` can stay \`"none"\` always, but the **branches already exist**. In 10.6 you only fill statuses with a real quest.

That is the difference between "hello button" and "NPC system".

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Polite dialogue UX",
 content: `- Text in 1-3 sentences, not a wall.
- ActionText as a verb: "Talk", not "Interact".
- After closing dialogue, camera/controls are not broken (do not lock camera without release).
- Do not open shop and dialogue on one Prompt without distinguishing them.
- NPC name in ObjectText matches the Billboard.

Mobile player: HoldDuration 0 is often more comfortable. If HoldDuration > 0, write ActionText briefly "Hold · Talk".

**Do now (5 min):** ask a neighbor / enter "from scratch" yourself. Is it clear you should walk up and press?`,
 },
 {
 title: "Link to 10.5-10.8",
 content: `| Lesson | What it adds on this NPC |
|------|-------------------------|
| **10.5** | while + Pathfinding patrol, pause during dialogue |
| **10.6** | QuestConfig, start/turn-in from the same branches |
| **10.7** | Line "bring the key" / inventory check |
| **10.8** | NPC as step 2 of the hub golden path |

So today do not delete Prompt "I will redo later". Make clean names and server \`onTalk\`. That will last.

Save: \`Lesson 10.4 - NPC Dialogue\`.

**Do now (5 min):** change one field in Config/table and confirm new behavior in Play.`,
 },
 {
 title: "Lesson 76 hand-in checklist",
 content: `- [ ] NPC Model with a clear name in NPCs folder
- [ ] ProximityPrompt with ObjectText / ActionText
- [ ] Triggered on the server
- [ ] At least 2 if branches (first time / again)
- [ ] Player sees text (Gui or Billboard), not only teacher Output
- [ ] Debounce against spam
- [ ] No harmful Scripts from Toolbox
- [ ] Save Lesson 10.4 - NPC Dialogue

A third branch (busy/ready) is a bonus, not a blocker.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Dialogue and state only in LocalScript",
 explanation: "Easy to fake; you cannot attach quest honestly tomorrow.",
 correctApproach: "Triggered and state on server; client only shows text",
 },
 {
 mistake: "ActionText = Interact / ObjectText empty",
 explanation: "A beginner does not know what to do.",
 correctApproach: "Short clear \"Talk\" + NPC name",
 },
 {
 mistake: "Leave all Scripts from a Free Model NPC",
 explanation: "Conflicts, backdoors, extra AI.",
 correctApproach: "Clean Scripts, your own Prompt code",
 },
 {
 mistake: "One line for every case with no if",
 explanation: "No sense of dialogue/state.",
 correctApproach: "At least greet vs again",
 },
 {
 mistake: "MaxActivationDistance 50+",
 explanation: "You talk from half the hub through a crowd.",
 correctApproach: "8-12 studs, LineOfSight as needed",
 },
 {
 mistake: "Triggered spam opens 10 windows",
 explanation: "Dirty UX.",
 correctApproach: "Debounce + Enabled false during dialogue",
 }
 ],
 summary: "You built a hub NPC with ProximityPrompt and if-branch dialogue: the server chooses the line, the client shows text. This is the anchor for patrol, quest, and the whole Ship path of module 10.",
 practiceTask: {
 title: "Talk to the master (~30 min)",
 difficulty: "beginner",
 description: `**Goal:** NPC with Prompt and at least two state-based lines.

### Part A - Build (8 min)
1. Model NPC_QuestGiver in Hub/NPCs.
2. Billboard "!" or name.
3. ProximityPrompt: ObjectText, ActionText "Talk", distance 8-12.

### Part B - Server dialogue (12 min)
1. Script: Triggered → onTalk(player).
2. Attribute HasMet_… : first time / again.
3. Lines table with 2-3 texts.
4. Debounce 0.5+ s.

### Part C - Show to player (10 min)
1. Remote DialogueShow + ScreenGui or Billboard for 4-6 s.
2. Check LineOfSight / distance.
3. **Save:** Lesson 10.4 - NPC Dialogue`,
 hints: [
 "print(player.Name) first, then Gui",
 "Clean Toolbox Scripts before writing your own code",
 "Short lines are easier to read on mobile"
 ],
 optionalChallenge: "Third busy branch + \"OK\" Gui button that fires Remote \"dialogue closed\" and re-enables Prompt.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Why does the course recommend ProximityPrompt for hub NPCs?",
 options: [
          "Convenient ObjectText/ActionText hints and better mobile UX",
          "It is the only object that exists in Roblox",
          "It replaces Humanoid",
          "It automatically grants GamePass"
        ],
 correctAnswer: 0,
 explanation: "Standard NPC interaction.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where is it better to handle Prompt.Triggered for dialogue/quest?",
 options: [
          "Only in LocalScript with no server",
          "On the server",
          "In Lighting",
          "In Terrain Editor"
        ],
 correctAnswer: 1,
 explanation: "State and safety.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why ObjectText and ActionText?",
 options: [
          "To increase FPS",
          "To create leaderstats",
          "So the player sees name/context and what the key will do",
          "These are required DataStore fields"
        ],
 correctAnswer: 2,
 explanation: "Readable UX.",
 },
 {
 id: "q4",
 type: MC,
 question: "The minimum \"real\" dialogue in this lesson is…",
 options: [
          "One print with no Prompt",
          "Only ParticleEmitter",
          "Deleting the NPC after click",
          "Two if branches by state (for example first time / again)"
        ],
 correctAnswer: 3,
 explanation: "Line branches.",
 },
 {
 id: "q5",
 type: MC,
 question: "What is dangerous about Free Model NPCs?",
 options: [
          "They always lack Humanoid",
          "Extra/harmful Scripts you should remove",
          "ProximityPrompt is banned on them",
          "You cannot rename them"
        ],
 correctAnswer: 1,
 explanation: "Toolbox cleanup.",
 },
 {
 id: "q6",
 type: MC,
 question: "What is LocalScript's role in dialogue in this lesson's scheme?",
 options: [
          "Decide the quest reward itself",
          "Write Coins into leaderstats",
          "Show text/UI after a server signal",
          "Disable PathfindingService globally"
        ],
 correctAnswer: 2,
 explanation: "UI = display.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why a Billboard \"!\" above the NPC?",
 options: [
          "So from afar it is clear: you can interact here",
          "To replace Prompt",
          "To open the shop with no Remotes",
          "Only needed for Raycast"
        ],
 correctAnswer: 0,
 explanation: "Spatial landmark.",
 },
 {
 id: "q8",
 type: MC,
 question: "Typical MaxActivationDistance for talking to an NPC?",
 options: [
          "Must be 0",
          "Must be 500",
          "Distance does not exist on Prompt",
          "About 8-12 studs (not half the map)"
        ],
 correctAnswer: 3,
 explanation: "Close range.",
 },
 {
 id: "q9",
 type: MC,
 question: "Why RequiresLineOfSight = true?",
 options: [
          "To disable Anchored",
          "To create a quest table",
          "To make it harder to activate Prompt through a wall",
          "To speed up ComputeAsync"
        ],
 correctAnswer: 2,
 explanation: "Line of sight.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why debounce on Triggered?",
 options: [
          "To delete HumanoidRootPart",
          "So key spam does not open a pile of dialogues",
          "This replaces if branches",
          "To deliberately break UI"
        ],
 correctAnswer: 1,
 explanation: "Anti-spam UX.",
 },
 {
 id: "q11",
 type: MC,
 question: "How does 10.4 dialogue prepare lesson 10.6?",
 options: [
          "You must delete Prompt before the quest",
          "Quest only works without an NPC",
          "Line tables are banned in quests",
          "The same if branches can be filled with QuestStatus and QuestConfig"
        ],
 correctAnswer: 3,
 explanation: "Frame for quest.",
 },
 {
 id: "q12",
 type: MC,
 question: "Why is ActionText \"Talk\" better than \"Interact\" for course players?",
 options: [
          "A clear verb hint in plain language",
          "Interact runs faster in the engine",
          "Talk disables LineOfSight",
          "Interact is not supported on PC"
        ],
 correctAnswer: 0,
 explanation: "Clarity for the player.",
 },
 {
 id: "q13",
 type: MC,
 question: "What to do with Prompt during open dialogue (good UX)?",
 options: [
          "Delete the NPC from the game",
          "Set MaxActivationDistance = 500",
          "Temporarily Enabled = false or ignore spam with debounce",
          "Move logic to the client forever"
        ],
 correctAnswer: 2,
 explanation: "Repeat control.",
 },
 {
 id: "q14",
 type: MC,
 question: "Why a Lines table for dialogue?",
 options: [
          "Table disables the server",
          "Without a table Triggered does not work",
          "It must replace Attributes",
          "Texts in one place, easier to change and extend"
        ],
 correctAnswer: 3,
 explanation: "Dialogue data.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 10.4 hand-in artifact?",
 options: [
          "Only a Model with no Prompt",
          "NPC with Prompt, server dialogue branches, and visible text + Save",
          "Empty Baseplate",
          "Only shop with no NPC"
        ],
 correctAnswer: 1,
 explanation: "You need a working talk loop.",
 }
 ],
 },
}

export const enLesson105 = {
 lessonId: "lesson-roblox-10-5",
 moduleId: "module-10",
 order: 5,
 title: "10.5 - Pathfinding + while",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Explain PathfindingService: ComputeAsync, waypoints, path status",
 "Tune AgentParams (radius/height) for your NPC",
 "Make an NPC patrol along points with while + waypoint walking",
 "Handle Failed / Blocked path and do not spin an endless while with no wait",
 "Prepare a moving NPC for quest 10.6 (quest giver / zone guard)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 77 of 92)",
 content: `Yesterday the NPC could talk (Prompt + dialogue). Today it **walks on its own**: hub patrol between points A → B → C → A.

Roblox tool: **PathfindingService**. You say "I want from here to there", the engine finds a path around walls and returns **waypoints**. Your code drives Humanoid along those points in a **while** loop.

Why in the hub:
- guard near the shop;
- quest giver that is not a statue;
- guide to the puzzle zone (lite).

Do not build navigation across half the map. Make **2-3 Part anchors** \`Patrol_1\`, \`Patrol_2\`, \`Patrol_3\` and a stable loop.

**Do now (3 min):** in the NPC folder add empty Parts (CanCollide false, Transparency 1) as patrol points. Names matter.`,
 },
 {
 title: "Pathfinding ≠ Tween and ≠ random MoveTo",
 content: `| Approach | What it does | Minus in the hub |
|--------|-----------|--------------|
| \`Humanoid:MoveTo(pos)\` once | Walks in a straight line | Hits a wall |
| Tween NPC CFrame | "Flies" on a curve | Not a physical character |
| **Pathfinding** | Finds a path between obstacles | You must handle Fail/Blocked |

Pathfinding draws an invisible route "as a smart pedestrian would". You only **execute** the steps.

Important: the path is computed on the **server** (Script in SSS or in the NPC model on the server). LocalScript for a guard patrol with rewards/zones is a bad idea.

**Do now (4 min):** one hit/hazard in Play. Health should change on the server, not in LocalScript.`,
 },
 {
 title: "Lesson dictionary",
 content: `| Term | In plain words |
|--------|------------------|
| \`Path\` | Route object |
| \`ComputeAsync(from, to)\` | "Compute path from A to B" (waits) |
| \`Status\` | Success / NoPath / ClosestNoPath… |
| \`GetWaypoints()\` | List of route points |
| \`Waypoint.Position\` | Where to go |
| \`Waypoint.Action\` | Walk / Jump (sometimes a jump is needed) |
| \`AgentParams\` | "How big is the agent" (radius, height, can jump) |
| \`Blocked\` | Path was blocked during movement |

ComputeAsync is GPS building a route. Waypoints are turns. while is you driving arrow to arrow. Blocked means the road is under repair: recompute.

**Do now (5 min):** run the NPC on a short route and check it does not stuck on the first point.`,
 },
 {
 title: "Minimal ComputeAsync frame",
 content: `Pseudocode (server):

\`local PFS = game:GetService("PathfindingService")\`
\`local path = PFS:CreatePath({\`
\` AgentRadius = 2,\`
\` AgentHeight = 5,\`
\` AgentCanJump = true,\`
\`})\`

\`path:ComputeAsync(root.Position, target.Position)\`

\`if path.Status ~= Enum.PathStatus.Success then\`
\` warn("no path", path.Status)\`
\` return\`
\`end\`

\`local waypoints = path:GetWaypoints()\`
\`for i, wp in ipairs(waypoints) do\`
\` if wp.Action == Enum.PathWaypointAction.Jump then\`
\` humanoid.Jump = true\`
\` end\`
\` humanoid:MoveTo(wp.Position)\`
\` humanoid.MoveToFinished:Wait()\`
\`end\`

\`CreatePath\` once per NPC (or recreate carefully). \`ComputeAsync\` on **every new destination**.

Remember: the NPC needs **Humanoid** + **HumanoidRootPart**, and the model must not be fully Anchored like a statue (HRP can be under Humanoid control).

**Do now (4 min):** one hit/hazard in Play. Health should change on the server, not in LocalScript.`,
 },
 {
 title: "AgentParams: why the NPC \"cannot find a path\"",
 content: `| Symptom | Likely cause | What to try |
|---------|------------------|---------------|
| NoPath between nearby points | AgentRadius too thick | Reduce radius 1.5-2 |
| Cuts corners / stuck in narrow doors | Radius larger than the passage | Wider doors or smaller agent |
| Does not jump onto a ledge | AgentCanJump false / no Jump | true + handle Action.Jump |
| Path through decorative Parts | Decor CanCollide true | Make decor non-colliding or PathfindingModifier |
| Patrol points inside a wall | Anchor Position in geometry | Move Patrol Parts into the corridor |

First check **with your eyes**: would a person walk between Patrol_1 and Patrol_2 without noclip? If not, pathfinding is not at fault.

**Do now (5 min):** run the NPC on a short route and check it does not stuck on the first point.`,
 },
 {
 title: "Patrol: while true + point list",
 content: `Idea:

\`local points = { Patrol_1, Patrol_2, Patrol_3 }\`
\`local index = 1\`

\`while true do\`
\` local target = points[index]\`
\` local ok = followPath(npc, target.Position)\`
\` if ok then\`
\` index = index % #points + 1\`
\` else\`
\` task.wait(1) -- do not burn CPU on Fail\`
\` end\`
\` task.wait(0.2)\`
\`end\`

\`followPath\` = ComputeAsync + waypoint loop with MoveToFinished.

Why **while**, not one forever for outside: patrol is **endless behavior** until the game ends. while is the right rhythm of "again and again".

Required:
- \`task.wait\` or Wait on MoveToFinished inside;
- do not Compute every frame without need;
- on Fail, pause, do not tight-loop.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "MoveToFinished and timeouts",
 content: `\`MoveToFinished:Wait()\` is convenient, but the NPC can hang forever if the path is "successful" and physics blocked movement.

Practice:
- wrap with \`task.delay\` / race: if not Finished in N seconds, \`humanoid:MoveTo\` again or recompute the path;
- or listen to \`path.Blocked\` and Recalculate.

Lite for the hour:
\`local finished = false\`
\`local conn = humanoid.MoveToFinished:Connect(function() finished = true end)\`
\`humanoid:MoveTo(wp.Position)\`
\`local t0 = os.clock()\`
\`while not finished and os.clock() - t0 < 6 do task.wait(0.1) end\`
\`conn:Disconnect()\`
\`if not finished then return false end\`

That way the patrol while does not "die" silently on one boulder.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Blocked and recompute",
 content: `Players, shop doors, temporary Parts can block the route after Compute.

\`path.Blocked:Connect(function(blockedWaypointIndex)\`
\` -- flag needsRecompute = true\`
\`end)\`

In followPath: if needsRecompute, exit the waypoint loop and ComputeAsync again to the same target.

You do not need perfect AI. For lesson hand-in it is enough:
1. Successful patrol of 3 points with no player.
2. If you place a box wall on the path, the NPC either goes around after recompute, or honestly warns and waits (document the behavior).

The point is **not to crash the script** and not to eat FPS with while and no wait.

**Do now (5 min):** run the NPC on a short route and check it does not stuck on the first point.`,
 },
 {
 title: "Link to dialogue and quest",
 content: `Patrol and Prompt live together:

| Situation | Behavior |
|----------|-----------|
| Player triggers Prompt | You can \`humanoid:MoveTo(hrp.Position)\` stop / \`WalkSpeed = 0\` during dialogue |
| After dialogue | Restore WalkSpeed, continue while (via paused flag) |
| Quest 10.6 | The same NPC_QuestGiver can patrol a small circle near the desk |

Pseudo:

\`local paused = false\`
\`prompt.Triggered:Connect(function() paused = true … paused = false end)\`

In while:
\`while paused do task.wait(0.2) end\` before a new followPath.

That way the guard does not run away mid-conversation.

**Do now (3 min):** walk up to the Prompt in Play and confirm Triggered once.`,
 },
 {
 title: "NPC build checklist for pathfinding",
 content: `- [ ] Model with Humanoid + HumanoidRootPart
- [ ] Animate optional (not a blocker)
- [ ] Anchored = false on body parts (typical Rig)
- [ ] No accidental Weld to the hub floor
- [ ] Patrol Parts ~1-2 studs above floor, in corridors
- [ ] Patrol script in SSS or Script in the model (server)
- [ ] Output: Success and point names when debugging

If you take a Rig from Toolbox, **check scripts**. Extra Toolbox AI can fight your while. Prefer your own short Script.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 },
 {
 title: "Typical while + pathfinding mistakes",
 content: `| Mistake | Result | Fix |
|---------|----------|------|
| \`while true do Compute end\` with no Wait | Lag, warn spam | Wait on movement / task.wait |
| Ignore Status | Silence, NPC stands | warn + pause |
| Points inside Baseplate | NoPath | Raise Patrol |
| Patrol on client | Desync | Server |
| New path:CreatePath every frame | Hard to debug | One path, many Compute |
| No Jump on Action.Jump | Stuck on a curb | humanoid.Jump = true |

**Do now (4 min):** enter Play and watch whether the NPC really goes around a wall between two points, not through it (if through, check wall CanCollide).`,
 },
 {
 title: "Lesson 77 hand-in checklist",
 content: `- [ ] PathfindingService CreatePath + ComputeAsync
- [ ] Successful movement along waypoints with MoveTo
- [ ] while patrol of ≥2 (better 3) points
- [ ] Fail handling (warn + wait, not tight loop)
- [ ] Lite pause on Prompt (preferred)
- [ ] Output with no red during 30 s patrol
- [ ] Save: Lesson 10.5 - Pathfinding Patrol

Tomorrow you hang a quest table on this NPC. It is already "alive" in hub space.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "while true with ComputeAsync and no wait for movement",
 explanation: "Server chokes, NPC jitters.",
 correctApproach: "MoveToFinished/timeout + task.wait between targets",
 },
 {
 mistake: "Ignore path.Status",
 explanation: "It looks like \"pathfinding is broken\".",
 correctApproach: "Check Success, otherwise pause and debug points",
 },
 {
 mistake: "AgentRadius larger than hub doors",
 explanation: "NoPath in obvious places.",
 correctApproach: "Tune radius or widen the passage",
 },
 {
 mistake: "Patrol in LocalScript",
 explanation: "Bad sync and unsafe logic.",
 correctApproach: "Server Script",
 },
 {
 mistake: "Patrol anchors inside collision",
 explanation: "Endless Fail.",
 correctApproach: "Move Patrol Parts into free space",
 },
 {
 mistake: "Not handling Jump waypoint",
 explanation: "Stuck on small ledges.",
 correctApproach: "PathWaypointAction.Jump → humanoid.Jump",
 }
 ],
 summary: "You taught the NPC to walk with PathfindingService: ComputeAsync builds waypoints, while runs patrol between points, Fail/timeouts do not kill the loop. A living guard/quest giver is ready for the quest in 10.6.",
 practiceTask: {
 title: "Patrol A-B-C (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** NPC cyclically patrols 3 points with Pathfinding.

### Part A - World (6 min)
1. NPC Rig with Humanoid.
2. Patrol_1/2/3 in hub corridors.
3. A wall between 1 and 2 so there is something to walk around.

### Part B - followPath (14 min)
1. CreatePath with AgentParams.
2. ComputeAsync → check Status.
3. Waypoint loop + Jump + MoveToFinished/timeout.
4. Function returns true/false.

### Part C - while patrol (10 min)
1. while true over point index.
2. Pause on Fail.
3. Optional: paused during Prompt.
4. **Save:** Lesson 10.5 - Pathfinding Patrol`,
 hints: [
 "One successful target first, then while",
 "Transparency 1 on Patrol Parts so they do not spoil the build",
 "warn(path.Status) is the best debug friend"
 ],
 optionalChallenge: "path.Blocked → immediate recompute to the current target.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Why PathfindingService instead of one MoveTo through a wall?",
 options: [
          "To build a path around obstacles via waypoints",
          "To delete Humanoid",
          "To replace leaderstats",
          "Only needed for Terrain water"
        ],
 correctAnswer: 0,
 explanation: "Route with avoidance.",
 },
 {
 id: "q2",
 type: MC,
 question: "What does path:ComputeAsync(from, to) do?",
 options: [
          "Immediately grants coins",
          "Computes a route between two positions (waits asynchronously for the result)",
          "Creates ScreenGui",
          "Disables Anchored in the whole Workspace"
        ],
 correctAnswer: 1,
 explanation: "Path build.",
 },
 {
 id: "q3",
 type: MC,
 question: "Where should NPC patrol logic live in this lesson?",
 options: [
          "Only in the player's LocalScript",
          "In Lighting.Atmosphere",
          "On the server (Script)",
          "In the Place name"
        ],
 correctAnswer: 2,
 explanation: "Server AI/patrol.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why check path.Status after ComputeAsync?",
 options: [
          "Only Output cosmetics",
          "Status is always Success",
          "To enable Bloom",
          "So you do not drive the NPC when there is no path (NoPath and so on)"
        ],
 correctAnswer: 3,
 explanation: "Fail-safe.",
 },
 {
 id: "q5",
 type: MC,
 question: "What are waypoints?",
 options: [
          "A GamePass list",
          "A list of route points you should walk Humanoid through",
          "Audio files",
          "Terrain Material types"
        ],
 correctAnswer: 1,
 explanation: "Path points.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why does while true for patrol need Wait / MoveToFinished?",
 options: [
          "while is banned in Lua",
          "Wait disables Pathfinding",
          "Otherwise a tight loop loads the server and breaks movement",
          "RemoteFunction requires it"
        ],
 correctAnswer: 2,
 explanation: "Do not spin an empty loop.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why AgentRadius in CreatePath?",
 options: [
          "Tells the system how \"thick\" the agent is for passages",
          "It is Sound volume",
          "It is the shop item price",
          "It is Neon color"
        ],
 correctAnswer: 0,
 explanation: "Agent size.",
 },
 {
 id: "q8",
 type: MC,
 question: "What to do on PathWaypointAction.Jump?",
 options: [
          "Delete the waypoint",
          "Disable PathfindingService",
          "Set Anchored true forever",
          "Enable humanoid.Jump (or equivalent jump)"
        ],
 correctAnswer: 3,
 explanation: "Jump on the route.",
 },
 {
 id: "q9",
 type: MC,
 question: "Typical cause of NoPath between two nearby points?",
 options: [
          "BillboardGui that is too nice",
          "Presence of ProximityPrompt",
          "Anchor inside collision or AgentRadius too large / passage too narrow",
          "Quest title too short"
        ],
 correctAnswer: 2,
 explanation: "Geometry and agent.",
 },
 {
 id: "q10",
 type: MC,
 question: "Why a timeout around MoveToFinished?",
 options: [
          "To speed up Publish",
          "So the NPC does not hang forever if physics blocked movement",
          "To delete waypoints from the game",
          "This replaces Humanoid"
        ],
 correctAnswer: 1,
 explanation: "Protection from endless Wait.",
 },
 {
 id: "q11",
 type: MC,
 question: "How does patrol get along with Prompt dialogue?",
 options: [
          "Delete Prompt forever",
          "Move NPC into ReplicatedStorage during dialogue, required",
          "Disable while in the whole Place",
          "paused flag: stop movement during conversation"
        ],
 correctAnswer: 3,
 explanation: "AI pause.",
 },
 {
 id: "q12",
 type: MC,
 question: "What does path.Blocked mean in this lesson?",
 options: [
          "The route was blocked after computation: worth recomputing",
          "Player bought a GamePass",
          "Required Studio crash",
          "Successful quest completion"
        ],
 correctAnswer: 0,
 explanation: "Path blockage.",
 },
 {
 id: "q13",
 type: MC,
 question: "How many patrol points at minimum to demonstrate a loop?",
 options: [
          "Exactly 100 required",
          "0: Compute only, no movement",
          "At least 2 (better 3) returning in a circle",
          "Only 1 and disable while"
        ],
 correctAnswer: 2,
 explanation: "Loop between anchors.",
 },
 {
 id: "q14",
 type: MC,
 question: "Why are Patrol Parts often transparent with no collision?",
 options: [
          "Pathfinding only works with Transparency 1",
          "DataStore requires it",
          "To replace HumanoidRootPart",
          "They are position anchors, not decorative walls on the path"
        ],
 correctAnswer: 3,
 explanation: "Service markers.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 10.5 hand-in artifact?",
 options: [
          "Theory only, no Studio",
          "NPC with while patrol via Pathfinding along points + Save",
          "Static Part with no Humanoid",
          "Shop with no NPC"
        ],
 correctAnswer: 1,
 explanation: "You need a moving patrol.",
 }
 ],
 },
}

export const enLesson106 = {
 lessonId: "lesson-roblox-10-6",
 moduleId: "module-10",
 order: 6,
 title: "10.6 - Quest with table",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Describe the quest as a Config table: id, goals, reward, NPC text",
 "Store player progress on the server (Attributes / Values / your own table)",
 "Connect NPC + Prompt to quest start and turn-in via if",
 "Grant leaderstats Coins reward only on the server (anti-dupe)",
 "Prepare the goal condition for tomorrow's puzzle/inventory (10.7)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 78 of 92)",
 content: `Today the hub gets a **quest**: not "pressed and got coins", but a **chain**: talked to NPC → understood the goal → met the condition → returned → got the reward.

In this course we build the quest on a **table**:
- what to do (goals);
- how many coins to give;
- which lines to say;
- whether already taken / turned in.

From 10.4-10.5 you already have NPC, Prompt, and (ideally) pathfinding. Today the NPC becomes a **quest giver**, not only "hello".

Tomorrow (**10.7**) the goal can become "bring Key_Blue from the Raycast room". Today a **honest lite goal** is enough (collect 3 coin-zones / reach a marker / Attribute), but the **architecture** should look like a real quest.

**Do now (3 min):** name the NPC \`NPC_QuestGiver\` and place a sign "Quests here".`,
 },
 {
 title: "Why a quest through a table",
 content: `| Without table (hardcoded in Script) | With QuestConfig table |
|------------------------------|---------------------|
| Second quest = copy-paste the whole script | Add a row in Config |
| Line text scattered | All texts in one place |
| Reward easy to lose in if | \`rewardCoins\` next to goals |
| Hard to explain to a teacher | Show Config in 20 s |

**Config** is the restaurant menu (what you can order). **Player state** is their open order (taken / cooking / picked up). **Server** is the kitchen that decides whether the dish is ready and whether the check was already issued.

The client only "asks for the menu" or "asks to turn in". The kitchen does not trust "I already did everything, give 999 coins" without a check.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "QuestConfig structure (example)",
 content: `One ModuleScript \`SSS/Modules/QuestConfig.lua\` (or a table at the top of a server script at start):

\`local QuestConfig = {\`
\` gather_3 = {\`
\` id = "gather_3",\`
\` title = "Gather for the master",\`
\` description = "Collect 3 markers in the hub",\`
\` goalType = "count",\`
\` goalAmount = 3,\`
\` rewardCoins = 25,\`
\` startText = "Bring 3 markers, then we talk about the reward.",\`
\` doneText = "Thanks! Here are the coins.",\`
\` busyText = "Not done yet. Check the counter.",\`
\` },\`
\`}\`
\`return QuestConfig\`

You can narrow fields, but keep the minimum: **id, goal, reward, 2-3 texts**.

Later for the 10.7 key you will add quest \`bring_key\` with \`goalType = "item"\` and \`goalItem = "Key_Blue"\`: **the same** turn-in code, different Config row.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Quest state per player",
 content: `| Approach | Pros | Cons |
|--------|-------|--------|
| Attributes on Player (\`QuestId\`, \`QuestProgress\`, \`QuestDone\`) | Visible in Properties, simple | Many Attribute rows |
| Folder under Player with Values | Easy to watch | A few more Instances |
| table \`questState[player]\` in Module | Fast in code | Not visible in Explorer without print |

For the lesson I recommend **Attributes + server table** (table is truth, Attributes for HUD/debug) or Attributes only if you want fewer files.

Typical values:
- \`QuestId\` = \`""\` or \`"gather_3"\`
- \`QuestProgress\` = number 0…goal
- \`QuestStatus\` = \`none\` / \`active\` / \`ready\` / \`turned_in\`

**Main rule:** only the **server** changes state. LocalScript may read Attributes for UI (they replicate), but must not set itself to \`turned_in\`.

**Do now (4 min):** update the HUD after a server value change without faking it on the client.`,
 },
 {
 title: "Quest state machine (if logic)",
 content: `Imagine a Prompt on the NPC. Every Triggered:

1. If \`status == none\` → start: \`active\`, progress=0, show startText.
2. If \`active\` and progress < goal → busyText + remind how many left.
3. If \`active\` and progress >= goal (or item exists) → turn in immediately **or** status \`ready\`.
4. If \`ready\` / condition met on talk → grant Coins **once**, \`turned_in\`.
5. If \`turned_in\` → "Quest already turned in" (or give next id: challenge).

Turn-in pseudocode:

\`local cfg = QuestConfig[questId]\`
\`if status ~= "active" and status ~= "ready" then return end\`
\`if not objectiveMet(player, cfg) then tell(busyText) return end\`
\`if player:GetAttribute("QuestRewarded") == true then return end\`
\`addCoins(player, cfg.rewardCoins)\`
\`player:SetAttribute("QuestRewarded", true)\`
\`player:SetAttribute("QuestStatus", "turned_in")\`
\`tell(doneText)\`

Anti-dupe is required: otherwise Prompt spam = a coin printer.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "How the goal progresses (count / zone / item)",
 content: `| goalType | How to bump progress | Note |
|----------|---------------------|----------|
| \`count\` | Touched/Prompt on markers +1 (with per-marker debounce) | Ideal for today |
| \`reach\` | Enter a Part zone once | Very lite |
| \`item\` | \`Inventory.has\` (for 10.7) | You will connect tomorrow |
| \`talk\` | Prompt only: barely a quest | Better not as the only goal |

For **count**: each marker \`QuestMarker\` with Attribute \`MarkerId\`. Server keeps a set of "which markers this player already collected" so one marker cannot give +3 from spam.

\`local function onMarker(player, markerId)\`
\` if GetAttribute status ~= "active" then return end\`
\` if alreadyCollected(player, markerId) then return end\`
\` markCollected(...)\`
\` local p = GetAttribute("QuestProgress") + 1\`
\` SetAttribute("QuestProgress", p)\`
\` if p >= cfg.goalAmount then SetAttribute("QuestStatus", "ready") end\`
\`end\`

Reward is **not** here. Reward is at the NPC on turn-in (or a separate Turn In button). That way the player feels "returned to the quest giver".

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Link to leaderstats Coins",
 content: `Quest coins go into the **same** Coins as the shop (10.2). Otherwise tomorrow's Ship hub falls apart.

\`local function addCoins(player, amount)\`
\` local ls = player:FindFirstChild("leaderstats")\`
\` local coins = ls and ls:FindFirstChild("Coins")\`
\` if not coins then warn("no Coins") return end\`
\` coins.Value += amount\`
\`end\`

Checks before the lesson:
1. Is there a Script that creates leaderstats on PlayerAdded?
2. Does the shop read the same IntValue?
3. After the quest, does TAB show +25?

If leaderstats is still missing, **first** 10 min for minimal server Folder+IntValue, then the quest. Without that the reward is "in the air".

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "NPC dialogue: short and by status",
 content: `Do not write a 20-line novel. Three states: three short phrases from Config.

Showing text:
- BillboardGui above NPC; or
- ScreenGui Dialogue on client via \`FireClient(player, text)\`; or
- simply \`print\` + TextLabel in the hub while learning.

ProximityPrompt:
- \`ObjectText\` = NPC name;
- \`ActionText\` = "Talk" / "Turn in quest" depending on status (you can change from server via UI attributes, or leave "Talk").

**Do now (5 min):** plug in startText/busyText/doneText and verify three if branches without reward (print for now).`,
 },
 {
 title: "Progress UI lite",
 content: `The player needs to see \`2/3\`, or the quest feels broken.

Minimum:
- TextLabel in StarterGui: LocalScript listens to \`GetAttributeChangedSignal("QuestProgress")\` and \`QuestStatus\`;
- format: \`Quest: 2/3\` or \`Ready to turn in!\`.

Remember: UI **displays**. Config and reward are decided by the server.

Challenge: separate "Turn in" button from "Talk", also a Remote to the server with the same \`tryTurnIn\`.

**Do now (4 min):** update the HUD after a server value change without faking it on the client.`,
 },
 {
 title: "Quest playtest (10 mental passes + 1 in Play)",
 content: `| # | Scenario | Expectation |
|---|----------|------------|
| 1 | Prompt before start | Status active, progress 0 |
| 2 | Marker without active | Nothing / ignore |
| 3 | Three different markers | 3/3, status ready |
| 4 | Spam one marker | No more than +1 from it |
| 5 | Turn in | +Coins exactly rewardCoins |
| 6 | Repeat turn in | 0 coins, message |
| 7 | New Play | State from zero (session-lite) |
| 8 | Two players | Progress does not mix |
| 9 | Output | No red |
| 10 | TAB | Coins match expectation |

If row 6 is red, that is P0. Hub economy matters more than nice text.

**Do now (5 min):** run the test table once and record pass/fail for each row.`,
 },
 {
 title: "Lesson 78 hand-in checklist",
 content: `- [ ] QuestConfig table with id, goal, reward, texts
- [ ] Quest start from NPC Prompt
- [ ] Goal progress on server (count or reach)
- [ ] Turn-in with condition check
- [ ] Coins in leaderstats + reward anti-dupe
- [ ] UI or clear progress feedback
- [ ] Playtest scenarios 1-6 green
- [ ] Save Lesson 10.6 - Quest Table

If all of that is there, tomorrow you replace markers with a Raycast key without rewriting the whole state machine.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Reward in LocalScript (Coins on client)",
 explanation: "Cheats and desync with the shop.",
 correctApproach: "addCoins only on the server in leaderstats",
 },
 {
 mistake: "No QuestRewarded / can turn in forever",
 explanation: "Coin printer.",
 correctApproach: "turned_in / QuestRewarded flag",
 },
 {
 mistake: "Goals and reward hardcoded with no table",
 explanation: "Second quest = pain and copy-paste.",
 correctApproach: "QuestConfig with fields",
 },
 {
 mistake: "Marker gives +1 on every Touched with no collected set",
 explanation: "Progress farms in place.",
 correctApproach: "alreadyCollected(markerId) per player",
 },
 {
 mistake: "Quest in one Place, shop in another",
 explanation: "No integration for Ship.",
 correctApproach: "Same hub and same Coins",
 },
 {
 mistake: "Client sets quest status",
 explanation: "Fake ready/turned_in.",
 correctApproach: "Attributes/state only from server scripts",
 }
 ],
 summary: "You built a quest on a QuestConfig table: NPC starts it, server drives goal progress, turn-in checks the condition and adds Coins to leaderstats once. This is the frame that tomorrow's puzzle key and 10.8's full Ship shelf will sit in.",
 practiceTask: {
 title: "Quest gather_3 (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** one quest with Config table, progress, and Coins reward.

### Part A - Config and state (8 min)
1. QuestConfig with gather_3 (goalAmount 3, rewardCoins 25, texts).
2. Attributes: QuestId, QuestProgress, QuestStatus, QuestRewarded.
3. startQuest / tryTurnIn functions on the server.

### Part B - World and progress (12 min)
1. NPC_QuestGiver + ProximityPrompt.
2. 3 QuestMarker markers with unique MarkerId.
3. Touched/Prompt → +progress with per-marker repeat protection.
4. At 3/3 → status ready.

### Part C - Reward and UI (10 min)
1. Turn-in at NPC → +25 Coins once.
2. TextLabel progress 0/3…3/3.
3. Repeat turn-in with no coins.
4. **Save:** Lesson 10.6 - Quest Table`,
 hints: [
 "Dialogue branches with print first, then addCoins",
 "alreadyCollected matters more than a nice Billboard",
 "Check TAB after turn-in"
 ],
 optionalChallenge: "Second quest in Config (reach_zone) that unlocks only after the first turned_in.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Why describe the quest in a table/Config?",
 options: [
          "So goals, reward, and texts live in one place and extend easily",
          "To disable the NPC",
          "To replace Workspace with SSS",
          "Only needed for Skybox"
        ],
 correctAnswer: 0,
 explanation: "Quest data separate from if wiring.",
 },
 {
 id: "q2",
 type: MC,
 question: "Who should change QuestStatus / grant coins?",
 options: [
          "Only LocalScript in StarterGui",
          "Server Script",
          "Lighting",
          "A random Free Model with no check"
        ],
 correctAnswer: 1,
 explanation: "State and economy on the server.",
 },
 {
 id: "q3",
 type: MC,
 question: "Why the QuestRewarded / turned_in flag?",
 options: [
          "To disable Anchored",
          "To create Terrain",
          "So the reward is not granted many times via Prompt spam",
          "This replaces Pathfinding"
        ],
 correctAnswer: 2,
 explanation: "Reward anti-dupe.",
 },
 {
 id: "q4",
 type: MC,
 question: "Where should rewardCoins go in the course hub?",
 options: [
          "Only into a TextLabel with no Value",
          "Into ClockTime",
          "Into ReplicatedFirst as Sound",
          "Into the same leaderstats Coins as the shop"
        ],
 correctAnswer: 3,
 explanation: "One hub economy.",
 },
 {
 id: "q5",
 type: MC,
 question: "What stops one marker from farming all progress?",
 options: [
          "Give +10 on every Touched",
          "Remember alreadyCollected(markerId) for the player",
          "Disable the server",
          "Set status on the client"
        ],
 correctAnswer: 1,
 explanation: "Debounce by marker id.",
 },
 {
 id: "q6",
 type: MC,
 question: "What minimum QuestConfig field set is useful at the start?",
 options: [
          "Only Part color",
          "Only Place name",
          "id, goal (type/amount), rewardCoins, dialogue texts",
          "Only ParticleEmitter Rate"
        ],
 correctAnswer: 2,
 explanation: "Data for start/progress/turn-in.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why grant the reward at the NPC on turn-in, not at the last marker?",
 options: [
          "Feels like \"returned to the quest giver\" and one anti-dupe point",
          "Roblox forbids it otherwise",
          "Markers cannot use Touched",
          "NPC cannot have Prompt"
        ],
 correctAnswer: 0,
 explanation: "Classic quest loop.",
 },
 {
 id: "q8",
 type: MC,
 question: "Which of these fits as today's lite goal under item-quest architecture?",
 options: [
          "Publish Public immediately",
          "Delete leaderstats",
          "Give coins with no condition",
          "Count 3 markers (count), tomorrow replace with Key_Blue"
        ],
 correctAnswer: 3,
 explanation: "Same state machine, different goal.",
 },
 {
 id: "q9",
 type: MC,
 question: "Why does UI read quest Attributes?",
 options: [
          "So UI can grant itself 1000 coins",
          "To disable shop Remotes",
          "To show progress to the player without making UI the source of truth",
          "This always breaks the server"
        ],
 correctAnswer: 2,
 explanation: "UI = display.",
 },
 {
 id: "q10",
 type: MC,
 question: "Which playtest scenario catches a coin printer?",
 options: [
          "Changing floor Material",
          "Turning in the same quest again",
          "Opening Terrain Editor",
          "Renaming Lighting"
        ],
 correctAnswer: 1,
 explanation: "Anti-dupe check.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why is it bad to keep progress only in LocalScript?",
 options: [
          "LocalScript cannot show TextLabel",
          "Attributes do not exist",
          "Prompt only ever works on the client",
          "Server will not see the truth on turn-in; easy to fake"
        ],
 correctAnswer: 3,
 explanation: "Progress on the server.",
 },
 {
 id: "q12",
 type: MC,
 question: "What should happen when starting a quest from Prompt?",
 options: [
          "status active, progress 0, show startText",
          "turned_in immediately and 999 coins",
          "Deleting the NPC",
          "Disabling Explorer"
        ],
 correctAnswer: 0,
 explanation: "Start branch.",
 },
 {
 id: "q13",
 type: MC,
 question: "How does quest 10.6 prepare integration with 10.7?",
 options: [
          "You must delete QuestConfig",
          "Raycast will ban quests",
          "Same start/turn-in; goal can become item/Inventory",
          "Inventory replaces leaderstats forever"
        ],
 correctAnswer: 2,
 explanation: "Flexible goalType.",
 },
 {
 id: "q14",
 type: MC,
 question: "What to check if TAB did not change after turn-in?",
 options: [
          "Whether the sky is white",
          "Whether Output is disabled",
          "Whether module 1 name is correct",
          "Whether leaderstats.Coins exists and addCoins writes there"
        ],
 correctAnswer: 3,
 explanation: "Economy diagnostics.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the lesson 10.6 hand-in artifact?",
 options: [
          "Only a sign with no code",
          "Working quest with Config, progress, one-time Coins reward, and Save",
          "Empty Baseplate",
          "Shop with no quest and no server"
        ],
 correctAnswer: 1,
 explanation: "You need a assembled quest loop.",
 }
 ],
 },
}

export const enLesson107 = {
 lessonId: "lesson-roblox-10-7",
 moduleId: "module-10",
 order: 7,
 title: "10.7 - Inventory + Raycast",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Build a server inventory on table / ModuleScript (add, check, remove item)",
 "Understand Raycast: ray, FilterDescendantsInstances, what the result returns",
 "Build a lite puzzle room: beam / aim opens a door or grants a key",
 "Connect the puzzle to inventory (key in table → condition for door/quest)",
 "Prepare a flag for tomorrow's hub Ship (10.8)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 79 of 92)",
 content: `Today two hub skills in one lesson:

1. **Inventory**: a list of player items in a **table** on the server (often via **ModuleScript**).
2. **Raycast**: an "invisible ruler" in the world: from where → which way → what was hit.

Why together? Because a classic hub puzzle sounds like: *aim the ray at the crystal → get a key in inventory → door/quest checks the key*.

From module 10 you already have:
- hub and folders (10.1);
- shop + Remotes (10.2-10.3);
- NPC and quest with table (10.4-10.6).

Today you add **item logic** and a **spatial ray** so tomorrow in **10.8** you can stitch everything into one path.

**Do now (2 min):** in Workspace make folder \`PuzzleRoom\` with two Parts: \`LaserOrigin\` and \`CrystalTarget\` (names matter).`,
 },
 {
 title: "Inventory ≠ Tool in Backpack (at first)",
 content: `| Approach | What it is | When OK |
|--------|-------|---------|
| Tool in Backpack | Physical tool in hands | Weapon, shovel |
| **table inventory** | List of item ids in server memory | Keys, quest flags, "has ticket" |
| Attribute on Player | One mark | Very simple key |

In the hub for keys and quest items a **server table** is more convenient: easy to check \`hasItem(player, "Key_Blue")\`, easy to remove after use, easy to show a list in UI.

You can add a Tool later as "wow". Today the core is **ownership logic**, not hand animation.

Inventory is a **backpack-list in the judge's notebook (server)**, not a sticker on the player's screen.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Inventory ModuleScript: why",
 content: `If you scatter \`addItem\` / \`hasItem\` / \`removeItem\` across 5 Scripts, tomorrow quest and doors will diverge.

**ModuleScript** (for example \`SSS/Modules/Inventory.lua\`) = one library:

| Function | Role |
|---------|------|
| \`getInv(player)\` | Return the player's item table (create if missing) |
| \`addItem(player, itemId)\` | Add if not already present (or with stack: lite without stack) |
| \`hasItem(player, itemId)\` | true/false |
| \`removeItem(player, itemId)\` | Remove after "used the key" |

Other scripts \`require(...Inventory)\` and do not invent their own list.

You can store inventory:
- in \`playerInventories[player] = { "Key_Blue" }\` (table in Module);
- or in a Folder under the player with StringValues: also fine, but today a **clean table** + print for debug is enough.

**Remember:** inventory is written by the **server**. LocalScript may only **ask** to "use item" through a Remote if needed.

**Do now (4 min):** update the HUD after a server value change without faking it on the client.`,
 },
 {
 title: "Inventory Module skeleton (row logic)",
 content: `Simplified idea (write in ModuleScript; \`return\` the API table at the end):

\`local Inventory = {}\`
\`local bags = {}\` -- [player] = { "Key_Blue", ... }

\`function Inventory.get(player)\`
\` bags[player] = bags[player] or {}\`
\` return bags[player]\`
\`end\`

\`function Inventory.has(player, itemId)\`
\` for _, id in ipairs(Inventory.get(player)) do\`
\` if id == itemId then return true end\`
\` end\`
\` return false\`
\`end\`

\`function Inventory.add(player, itemId)\`
\` if Inventory.has(player, itemId) then return false end\`
\` table.insert(Inventory.get(player), itemId)\`
\` return true\`
\`end\`

\`function Inventory.remove(player, itemId)\`
\` local bag = Inventory.get(player)\`
\` for i, id in ipairs(bag) do\`
\` if id == itemId then table.remove(bag, i) return true end\`
\` end\`
\` return false\`
\`end\`

\`Players.PlayerRemoving:Connect(function(p) bags[p] = nil end)\`

\`return Inventory\`

After \`add\`, do \`print(player.Name, "inv", table.concat(Inventory.get(player), ","))\` so you see the truth in Output.

**Do now (4 min):** change one value in a table/Config and confirm the new behavior.`,
 },
 {
 title: "What Raycast is in plain words",
 content: `**Raycast** = Studio asks the world: "if I draw a line from point A in direction D for length L, what do we hit?"

Result:
- \`nil\`: nothing (or only filtered things);
- or an object with fields like \`Instance\` (what was hit), \`Position\`, \`Normal\`.

Why in games:
- laser puzzles;
- check "does NPC see the player";
- shot / aim;
- "is there a wall between point and target".

This is **not** Touched. Touched = someone physically collided. Raycast = a **line query**, even with no visible laser (laser is only Part/Beam decoration).

Today: from \`LaserOrigin\` cast a ray toward \`CrystalTarget\` (or along LookVector) and if you hit the right Part, grant the key.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "RaycastParams and typical settings",
 content: `| Field / idea | Why |
|-------------|--------|
| \`FilterType = Exclude\` | Ignore a list (for example the player character) |
| \`FilterType = Include\` | Count only Parts in the list (handy for puzzles) |
| \`FilterDescendantsInstances\` | The list of Models/Parts itself |
| \`IgnoreWater\` | So water does not eat the ray without need |

For a puzzle room **Include** is often handy: list only \`CrystalTarget\` and mirrors (if any). Then random decor does not "steal" the ray.

Idea pseudocode:

\`local params = RaycastParams.new()\`
\`params.FilterType = Enum.RaycastFilterType.Include\`
\`params.FilterDescendantsInstances = { crystal }\`

\`local origin = LaserOrigin.Position\`
\`local direction = (crystal.Position - origin).Unit * 80\`
\`local result = workspace:Raycast(origin, direction, params)\`

\`if result and result.Instance == crystal then\`
\` -- success\`
\`end\`

\`direction\` is a **displacement vector** (not only unit). Vector length = ray distance.

**Do now (3 min):** find one symptom from the table in your Place and fix it or confirm it is absent.`,
 },
 {
 title: "Puzzle room: one-hour design",
 content: `Do not build a 12-mirror metro. Make **one honest wow**:

1. Room \`PuzzleRoom\` (walls + door \`Door_Reward\` Anchored).
2. \`LaserOrigin\` (Neon Part) and \`CrystalTarget\` (another color).
3. Button / Prompt \`AlignLaser\` or a Script that checks Raycast once per second (OK for start; later on event).
4. Success → \`Inventory.add(player, "Key_Blue")\` + door Attribute / open (Tween or Transparency+CanCollide).
5. Optional: Billboard "Need blue key" on hub doors.

Link to quest 10.6: quest condition can be \`Inventory.has(player, "Key_Blue")\` instead of a separate flag, or set \`Attribute PuzzleDone=true\` after add.

For 10.8 it matters that **puzzle success is visible to systems** (item or Attribute), not only \`print("nice")\`.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Who fires the ray: client or server?",
 content: `| Variant | Plus | Minus |
|---------|------|-------|
| Server Raycast on button/Prompt | Honest for rewards | A bit of delay |
| Client Beam "for looks" + server checks | Nice feedback | Two code layers |
| Client alone grants the key | Easy to break | **Forbidden for rewards** |

Course rule: **rewards (key, coins, door open with loot) come from the server** after its own Raycast or a validated condition.

If you draw a Beam on the client, that is fine as juice. But \`Inventory.add\` only in a Script in SSS.

Anti-cheat lite: do not accept "I hit, give key" from the client without a check. Accept "pressed Align" → server casts itself.

**Do now (4 min):** do one pick/use action and confirm the result in Output or inventory.`,
 },
 {
 title: "Inventory UI lite (LocalScript)",
 content: `The player needs to see that the key exists. Minimum:

1. ScreenGui \`InvUI\` with TextLabel \`InvList\`.
2. RemoteEvent \`InvUpdated\` (server → client) after add/remove.
3. LocalScript sets text: \`Key_Blue\` or "empty".

Or even simpler at start: after getting the key \`FireClient\` with string "Got: Key_Blue" for 3 seconds. Full ScrollingFrame is a challenge.

Do not duplicate the list only on the client as source of truth. UI = **display** of what the server sent.

**Do now (4 min):** make one Remote call and note who decides: client or server.`,
 },
 {
 title: "Doors / quest read inventory",
 content: `Hub door example (server):

\`local Inv = require(...Inventory)\`
\`prompt.Triggered:Connect(function(player)\`
\` if Inv.has(player, "Key_Blue") then\`
\` Inv.remove(player, "Key_Blue") -- one-time key\`
\` openDoor(Door_Reward)\`
\` else\`
\` tell(player, "Need the blue key from the room")\`
\` end\`
\`end)\`

Or for quest 10.6: in \`tryComplete\` add \`if not Inv.has(player, "Key_Blue") then return end\`.

That way the puzzle stops being a toy "in itself" and becomes a **hub link**, which is exactly what rubric 10.8 will check tomorrow.

**Do now (5 min):** after a successful Raycast also set \`player:SetAttribute("PuzzleDone", true)\`: double insurance for the quest.`,
 },
 {
 title: "Debounce, one-time use, cleanup",
 content: `| Problem | Defense |
|----------|--------|
| Prompt spam → 50 keys | \`has\` before \`add\`; or one-time Part.Touched with a flag |
| Raycast every frame without need | \`task.wait(0.25)\` or only on button |
| bags memory after leave | \`PlayerRemoving\` cleans |
| Door opened, key remains | \`remove\` after use |
| Hit the wrong Part | Check \`result.Instance.Name\` / Include filter |

Playtest: 1) get key 2) open door 3) try again without key 4) new Play: inventory empty (OK for session-lite without DataStore).

**Do now (4 min):** do save/load or honestly document mock mode in Output.`,
 },
 {
 title: "Lesson 79 hand-in checklist",
 content: `- [ ] ModuleScript Inventory with add/has/remove
- [ ] Raycast from LaserOrigin to target (or LookVector) works
- [ ] Success grants Key_Blue (or your id) into inventory on the server
- [ ] Player feedback exists (print + UI/message)
- [ ] Door or quest condition reads hasItem / Attribute
- [ ] Repeat pickup does not spawn senseless duplicates
- [ ] Output with no red on the puzzle path
- [ ] Save: Lesson 10.7 - Inventory Raycast

Tomorrow in 10.8 this key/flag should sit on the hub golden path next to the shop.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "LocalScript grants the key into a fake inventory",
 explanation: "Easy to fake; server doors will not trust it, or the opposite: cheat.",
 correctApproach: "Inventory.add only on the server",
 },
 {
 mistake: "Raycast direction is a unit vector with no multiply by distance",
 explanation: "Ray length ~1 stud, almost never hits.",
 correctApproach: "direction = unit * distance",
 },
 {
 mistake: "Copy-paste addItem in three Scripts with no Module",
 explanation: "Different lists = chaos.",
 correctApproach: "One ModuleScript + require",
 },
 {
 mistake: "Client says \"hit\" and server blindly trusts",
 explanation: "Reward cheat.",
 correctApproach: "Server does its own Raycast / check",
 },
 {
 mistake: "Puzzle only print, no item/Attribute for quest",
 explanation: "No hub integration.",
 correctApproach: "addItem or PuzzleDone for 10.6/10.8",
 },
 {
 mistake: "Not cleaning bags[player] on leave",
 explanation: "Reference leak, weird Studio bugs.",
 correctApproach: "PlayerRemoving → bags[p]=nil",
 }
 ],
 summary: "You built a server inventory on ModuleScript and a Raycast puzzle: the ray confirms a hit, the key lands in a table, doors or quest read hasItem. This is the bridge to hub Ship in lesson 10.8.",
 practiceTask: {
 title: "Key by ray (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** Raycast puzzle grants a key into Inventory; door/condition checks it.

### Part A - Inventory Module (10 min)
1. ModuleScript SSS/Modules/Inventory.lua with get/has/add/remove.
2. Test Script: add Key_Blue to player on Join (temporary) → print → remove auto-add.
3. PlayerRemoving cleans bags.

### Part B - Raycast room (12 min)
1. PuzzleRoom: LaserOrigin + CrystalTarget.
2. Prompt or button → server Raycast (Include on target).
3. Success → Inventory.add(player, "Key_Blue") + client message.
4. Debounce / do not duplicate the key.

### Part C - Link (8 min)
1. Door or quest check has("Key_Blue").
2. Optional remove key after open.
3. Attribute PuzzleDone=true.
4. **Save:** Lesson 10.7 - Inventory Raycast`,
 hints: [
 "FilterType Include with one CrystalTarget simplifies debug",
 "Multiply unit vector by 50-100 for distance",
 "print(result) first, then addItem"
 ],
 optionalChallenge: "Second crystal Key_Red + door that needs both keys (has AND has).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Why ModuleScript Inventory in this lesson?",
 options: [
          "One shared add/has/remove logic for quest, doors, and puzzle",
          "To replace Workspace",
          "To disable Raycast forever",
          "Only needed for Skybox"
        ],
 correctAnswer: 0,
 explanation: "Single inventory library.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where should Inventory.add for the key run?",
 options: [
          "Only in LocalScript UI",
          "In a server Script / SSS logic",
          "In Lighting",
          "In the Part name"
        ],
 correctAnswer: 1,
 explanation: "Reward on the server.",
 },
 {
 id: "q3",
 type: MC,
 question: "What does workspace:Raycast do?",
 options: [
          "Always creates a Tool",
          "Deletes Terrain",
          "Checks what a ray from origin along direction will hit",
          "Publishes the game"
        ],
 correctAnswer: 2,
 explanation: "Line query into the world.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why is direction often = unit * distance?",
 options: [
          "Because SoundService requires it",
          "Because unit already equals 1000 studs",
          "Because Raycast always ignores length",
          "Because vector length sets ray distance"
        ],
 correctAnswer: 3,
 explanation: "Distance in direction length.",
 },
 {
 id: "q5",
 type: MC,
 question: "Why RaycastFilterType.Include for the puzzle?",
 options: [
          "Disable Anchored",
          "Count only selected Parts (target/mirrors), fewer random hits",
          "Increase volume",
          "Create leaderstats"
        ],
 correctAnswer: 1,
 explanation: "Target filter.",
 },
 {
 id: "q6",
 type: MC,
 question: "Why is it bad to grant the key only from LocalScript after a \"visual\" Beam?",
 options: [
          "LocalScript cannot print",
          "Beam is banned in Roblox",
          "Client is unreliable for rewards: easy to fake",
          "Always faster and safer that way"
        ],
 correctAnswer: 2,
 explanation: "Never trust client for loot.",
 },
 {
 id: "q7",
 type: MC,
 question: "What does Raycast return if nothing relevant was hit?",
 options: [
          "nil (no result)",
          "Always Baseplate",
          "Always a compile error",
          "A new Player"
        ],
 correctAnswer: 0,
 explanation: "Check if result then.",
 },
 {
 id: "q8",
 type: MC,
 question: "How should doors check the key?",
 options: [
          "Trust a TextLabel on the client",
          "Check sky color",
          "Count Parts in Toolbox",
          "Inventory.has(player, \"Key_Blue\") on the server"
        ],
 correctAnswer: 3,
 explanation: "Server ownership check.",
 },
 {
 id: "q9",
 type: MC,
 question: "Why PlayerRemoving in the Inventory Module?",
 options: [
          "Delete Workspace",
          "Disable Pathfinding",
          "Clear bags[player] so you do not keep leftover data",
          "Publish required"
        ],
 correctAnswer: 2,
 explanation: "Player state cleanup.",
 },
 {
 id: "q10",
 type: MC,
 question: "What is the minimum link to quest/hub after the puzzle?",
 options: [
          "Only a nice Sky",
          "An item in inventory or an Attribute like PuzzleDone",
          "Only changing floor Material",
          "Deleting the NPC"
        ],
 correctAnswer: 1,
 explanation: "A visible flag for other systems.",
 },
 {
 id: "q11",
 type: MC,
 question: "How does table inventory differ from Tool in Backpack in this lesson?",
 options: [
          "Table is always visible as a 3D sword",
          "Tool does not exist in Roblox",
          "Inventory can only be written in ReplicatedFirst",
          "It is a logical id list on the server, handy for keys/quests"
        ],
 correctAnswer: 3,
 explanation: "Ownership logic vs physical Tool.",
 },
 {
 id: "q12",
 type: MC,
 question: "What to do on Prompt spam so you do not hand out 50 keys?",
 options: [
          "Check has before add / debounce",
          "Disable the server",
          "Grant the key only on the client",
          "Increase particle Rate"
        ],
 correctAnswer: 0,
 explanation: "One-time use and protection.",
 },
 {
 id: "q13",
 type: MC,
 question: "Inventory UI should be…",
 options: [
          "The only place where key truth is stored",
          "A Raycast replacement",
          "A display of server data (for example after InvUpdated)",
          "Required to have no text"
        ],
 correctAnswer: 2,
 explanation: "UI = display.",
 },
 {
 id: "q14",
 type: MC,
 question: "Why removeItem after opening a door with a one-time key?",
 options: [
          "To break ModuleScript",
          "This disables Remotes",
          "To clear Terrain",
          "The key is spent; opening again needs a new clear"
        ],
 correctAnswer: 3,
 explanation: "Item consumption.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the 10.7 hand-in artifact?",
 options: [
          "Theory only, no Studio",
          "Working Raycast→key in Inventory→door/quest check + Save",
          "Empty Baseplate",
          "Shop with no server"
        ],
 correctAnswer: 1,
 explanation: "You need an assembled puzzle with inventory.",
 }
 ],
 },
}

export const enLesson108 = {
 lessonId: "lesson-roblox-10-8",
 moduleId: "module-10",
 order: 8,
 title: "10.8 - Ship hub",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Assemble one hub golden path: quest → puzzle/action → reward → shop",
 "Check integration of Remote shop, NPC quest, and Raycast/inventory",
 "Walk the hub Ship rubric (~15 items) and close blockers",
 "Keep Output clean on the route and clear onboarding",
 "Save the Place as the module 10 artifact before Polish (M11)"
 ],
 theory: {
 sections: [
 {
 title: "Today's mission (lesson 80 of 92)",
 content: `This is the **finale of the Living Hub module**. Not a new genre from scratch and not "one more feature". Today you **stitch** what you already have into one experience you can show in 90 seconds.

In module 10 you (or the group) built:
1. **10.1**: hub space + RS/SSS folders + UI stub.
2. **10.2-10.3**: shop via Remotes + anti-cheat lite.
3. **10.4-10.6**: NPC, pathfinding, quest with table.
4. **10.7**: inventory / Raycast room.

Today's artifact: **one Place** where a player without a prompter completes:
**spawn → understands the goal → does quest or puzzle → gets coins/item → can buy in the shop → the loop does not break.**

If a system is still missing, make a **lite version** for this route (1 item, 1 quest, 1 puzzle), not three unfinished worlds.

**Do now (3 min):** open your hub and write the golden path in one sentence. If you cannot, draw arrows on paper first.`,
 },
 {
 title: "What Ship hub means (and what it does not)",
 content: `| Ship hub | Not ship yet |
|----------|-----------|
| Shop + quest + (puzzle or inventory) work **together** | Three separate demos in different Places |
| Quest coins actually buy an item | Quest prints, shop lives separately |
| NPC/Prompt leads to the next step | Player stands and does not know where to go |
| Output with no red on the route | "We ignore errors" |
| 60-90 s demo with no explanations | 5 min "now I will show where the button is" |

Ship does **not** mean an AAA hub for a year. It means: a **short complete cycle is already assembled**, named, and stable.

After this lesson, module 11 (Polish) has somewhere to stick loading, juice, and Demo Ready: on **this** Place, not an empty Baseplate.

**Do now (4 min):** run one check from this section in Play and note the result.`,
 },
 {
 title: "Map of systems we stitch",
 content: `| System | Where logic lives | What it gives the golden path |
|---------|----------------|----------------------------|
| Hub build | Workspace folders | Spawn, Shop / Quest / Puzzle zones |
| Shop | SSS Script + RS Remotes + LocalScript UI | Purchase with **server** price |
| leaderstats | Server Script | Coins visible in TAB and after reward |
| NPC + Prompt | Model + Prompt + dialogue | Quest start / hint |
| Quest | goals table + Attributes/Values | Coins reward |
| Puzzle / Raycast | ModuleScript / Script | Item or "done" flag |
| Anti-cheat lite | shop server | Do not trust price from client |

Integration rule: **one truth about coins**, on the server in leaderstats. Quest and shop write there, not into "their own" client variable.

**Do now (4 min):** in Explorer find \`Coins\` (or your name), \`Buy\` Remote, NPC with Prompt. If something is missing, mark it P0 for today.`,
 },
 {
 title: "Hub golden path (lock 6-8 steps)",
 content: `Write it **before** fixes. Example working route:

1. Spawn near the sign "Start with the NPC quest".
2. Walk to NPC → ProximityPrompt → short "bring the key / clear the room".
3. Enter puzzle / Raycast zone → get item or Attribute \`HasKey = true\`.
4. Return to NPC → quest complete → **+Coins** on the server.
5. Open shop UI → buy 1 item for coins.
6. See confirmation (sound / text / item in inventory).
7. Output clean; coins deducted correctly.
8. Can repeat or buy more (if balance allows).

That is "integration". Not "all features exist in files", but the **player feels the chain**.

If the puzzle is still missing, replace step 3 with a simple Touched zone "collect flag", but the **link to the quest** stays.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Hub Ship rubric (~15 items)",
 content: `Mark **yes / no / almost**. Lesson goal: as many **yes** as possible on the golden path.

### A. Space and onboarding (1-4)
| # | Item | Yes? |
|---|-------|------|
| 1 | Spawn stable, Shop/Quest/Puzzle zones visible | |
| 2 | Sign or NPC states the first step in ≤30-60 s | |
| 3 | Names/folders are readable (not 40× Part) | |
| 4 | No "dead" doors without a hint on the route | |

### B. Quest + puzzle/action (5-8)
| # | Item | Yes? |
|---|-------|------|
| 5 | Prompt/dialogue starts the quest | |
| 6 | Quest condition is checked (table / Attribute) | |
| 7 | Puzzle or Raycast/zone advances the quest | |
| 8 | Reward in **Coins on the server**, visible in TAB/HUD | |

### C. Shop and network (9-12)
| # | Item | Yes? |
|---|-------|------|
| 9 | Shop UI opens from the hub | |
| 10 | Purchase goes through Remote; price from Config on server | |
| 11 | Not enough coins → clear message | |
| 12 | Anti-spam / double-click does not break balance | |

### D. Ship quality (13-15)
| # | Item | Yes? |
|---|-------|------|
| 13 | Output with no red on the whole path | |
| 14 | I can run a 60-90 s demo with no prompter | |
| 15 | Save named Lesson 10.8 - Hub Ship | |

Every "no" = Part B fix list. Do not inflate scope: first A+B+C on one item and one quest.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Typical integration holes (and fast fixes)",
 content: `| Symptom | Likely cause | Fast fix |
|---------|------------------|--------------|
| Quest gives coins, shop "does not see" them | Different storage / client coins | One IntValue in leaderstats, only server writes |
| UI purchase with no Remote | LocalScript changes Coins itself | FireServer → server checks Config |
| NPC talks, quest does not update | No progress write | Attribute / BoolValue / player state table |
| Puzzle "done", quest not | Systems do not listen to each other | After puzzle set a flag the quest reads |
| Negative coins after purchase | No canAfford check | if coins >= price then … else FireClient error |
| Demo breaks on 2nd try | State not reset / duplicate subscriptions | One OnServerEvent; clean quest start |

**Do now (6 min):** walk the path once and mark the first red rubric item. Fix it before "pretty UI".`,
 },
 {
 title: "Mini data scheme (so you do not get lost)",
 content: `Imagine three boxes:

1. **Config** (ModuleScript or table on server): item prices, quest id, goals. Client may **read** the catalog via RemoteFunction, but does **not dictate** purchase price.
2. **Player state**: Coins in leaderstats; quest progress (Attributes / Values / your server table).
3. **World triggers**: Prompt, Touched, Raycast hit: only **signals**. The decision "count / grant reward" is made by the server.

Example of server thinking (simplified, no raw fences):

\`local function tryCompleteQuest(player)\`
\` if not hasFlag(player, "PuzzleDone") then return end\`
\` if alreadyRewarded(player) then return end\`
\` addCoins(player, QUEST_REWARD)\`
\` markRewarded(player)\`
\`end\`

And separately for the shop:

\`local function tryBuy(player, itemId)\`
\` local price = ShopConfig[itemId].price\`
\` local coins = getCoins(player)\`
\` if coins < price then deny(player) return end\`
\` setCoins(player, coins - price)\`
\` giveItem(player, itemId)\`
\`end\`

Client only says "I want to buy itemId" or "pressed complete". Server says "yes/no".

**Do now (4 min):** try a purchase with 0 coins and after a successful purchase, check TAB/Output.`,
 },
 {
 title: "Hub onboarding in 10 minutes",
 content: `A beginner gets lost in a hub faster than in an obby: many doors, few hints.

Minimum at spawn:
- a sign with 3 short steps;
- bright color / Neon on the quest zone;
- ActionText on Prompt like "Talk to quest giver", not "Interact".

Sign text (example):
*"1) Walk to the NPC with !. 2) Do the task in the blue room. 3) Buy a reward in the shop."*

Do not write a novel. Do not write "use RemoteFunction": that is for you, not the player.

Check onboarding like this: step away from the monitor 1 m in your mind (or ask a neighbor for 30 s). Is it clear where to go without your words?

**Do now (4 min):** make one Remote call and note who decides: client or server.`,
 },
 {
 title: "Integration playtest (15′ checklist)",
 content: `| # | Action | Expectation | Fact |
|---|-----|------------|------|
| 1 | New Play | Spawn OK, sign visible | |
| 2 | Start quest | Prompt works, state "active" | |
| 3 | Puzzle/zone | Flag/item appeared | |
| 4 | Turn in quest | Coins rose in TAB | |
| 5 | Open shop | UI with list | |
| 6 | Buy with enough balance | Deduction + item | |
| 7 | Buy with no coins | Deny + message | |
| 8 | Repeat path | No double reward / crash | |
| 9 | Output | No red | |
| 10 | 90 s demo | You fit without explanations | |

If rows 4 and 6 are green and 8 is red, you have a classic state hole. Fix it today: that is ship, not "a new button".

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 },
 {
 title: "What to deliberately postpone (scope control)",
 content: `Do not do today:
- 12 items and 5 dialogue branches;
- full forever DataStore save (if still unstable, lite is OK);
- GamePass payment instead of coins (lite explanation was in 10.3, not required in the demo);
- a new open world with 5 minutes of walking;
- Publish Public (closer to M12).

Do today:
- **one** quest;
- **one** puzzle/trigger;
- **one** shop item bought with quest coins;
- rubric + Save.

Everything "I still want" goes into a note for M11/M12. Ship loves a narrow winning cycle.

**Do now (4 min):** do save/load or honestly document mock mode in Output.`,
 },
 {
 title: "Link to M11 and portfolio",
 content: `| After 10.8 | Next in the course |
|------------|--------------|
| Working hub with a system chain | 11.1 Explorer audit on this Place |
| 90 s golden path | 11.5 Demo Ready / 11.6 blind test |
| Remotes + leaderstats alive | Easier to explain on SHOWCASE "how the shop works" |
| Honest lite scope | 12.1 MVP pitch without fantasy |

If the hub is "almost" but the shop is still on the client, do **not** move on proudly. Today's P0: server purchase + quest coins into the same Coins.

Save: \`Lesson 10.8 - Hub Ship\`.

**Do now (4 min):** in Play open TAB and confirm Coins change after a server action.`,
 },
 {
 title: "Lesson 80 hand-in checklist",
 content: `- [ ] Golden path written (6-8 steps)
- [ ] Rubric ~15 items filled
- [ ] Quest grants Coins on the server
- [ ] Shop buys via Remote with Config price
- [ ] Puzzle/zone really affects the quest (or honest lite replacement)
- [ ] Playtest table run at least once
- [ ] Output clean on the route
- [ ] 60-90 s demo rehearsal ×1-2
- [ ] Place saved as Lesson 10.8 - Hub Ship

If all of that is there, module 10 is closed. You can go to Polish.

**Do now (3 min):** walk the checklist and check only items you really finished.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Three separate Places \"shop\", \"quest\", \"puzzle\" instead of one hub",
 explanation: "No integration: nothing to ship.",
 correctApproach: "One Place, one golden path through all systems",
 },
 {
 mistake: "Quest writes coins in LocalScript, shop reads leaderstats",
 explanation: "Balance drifts, cheats and bugs.",
 correctApproach: "One Coins truth on the server",
 },
 {
 mistake: "Item price comes from the client",
 explanation: "Shop exploitation.",
 correctApproach: "itemId from client, price from ShopConfig on server",
 },
 {
 mistake: "Rubric \"almost all yes\", but the demo needs a prompter",
 explanation: "That is not ship for the player.",
 correctApproach: "Onboarding + 90 s with no explanations",
 },
 {
 mistake: "Double quest reward on every Prompt",
 explanation: "Economy breaks.",
 correctApproach: "alreadyRewarded flag / one-time turn-in",
 },
 {
 mistake: "Inflate to 10 items instead of closing 1 cycle",
 explanation: "The hour vanishes, blockers remain.",
 correctApproach: "1 quest + 1 item + stable path",
 }
 ],
 summary: "You assembled Ship hub: one golden path where quest, puzzle/action, and Remote shop share the same Coins on the server. Rubric and playtest confirm a 60-90 s demo works without a prompter. Base for Polish in module 11.",
 practiceTask: {
 title: "Ship hub: stitch and hand in (~30 min)",
 difficulty: "intermediate",
 description: `**Goal:** one Place with an integrated cycle quest → reward → shop.

### Part A - Map and rubric (8 min)
1. Write the golden path in 6-8 steps.
2. Walk the ~15-item rubric in Play.
3. List P0 (all "no" from blocks B and C).

### Part B - Integration fixes (15 min)
1. Link puzzle/zone to the quest condition.
2. Quest reward → leaderstats Coins (server).
3. Buy 1 item via Remote + Config price.
4. "Not enough coins" message.
5. Protection from double reward.

### Part C - Demo and Save (7 min)
1. Walk playtest table 1-10.
2. 60-90 s demo rehearsal.
3. **Save:** Lesson 10.8 - Hub Ship
4. **Practice complete** when the rubric has maximum "yes" on the route and Output is clean.`,
 hints: [
 "Coins and Remote first, UI polish later",
 "One catalog item is enough for ship",
 "If there is no puzzle: lite Touched flag, but the quest must read it"
 ],
 optionalChallenge: "Second shop item that requires a puzzle Attribute (server check \"has key\").",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "The main goal of lesson 10.8 is…",
 options: [
          "Stitch the hub into one golden path and close the Ship rubric",
          "Start a new obby genre from scratch",
          "Publish Public to the whole world immediately",
          "Delete all Remotes"
        ],
 correctAnswer: 0,
 explanation: "Integration and module 10 hand-in.",
 },
 {
 id: "q2",
 type: MC,
 question: "Where should the \"truth\" about coin count live?",
 options: [
          "Only in the shop LocalScript",
          "On the server in leaderstats (or equivalent)",
          "In the Part name",
          "In Lighting.ClockTime"
        ],
 correctAnswer: 1,
 explanation: "One server truth for quest and shop.",
 },
 {
 id: "q3",
 type: MC,
 question: "What can the client safely send on purchase?",
 options: [
          "Any price they invent",
          "A command to delete someone else's Coins",
          "itemId (item identifier)",
          "A request to change ShopConfig for everyone"
        ],
 correctAnswer: 2,
 explanation: "Server takes price from Config.",
 },
 {
 id: "q4",
 type: MC,
 question: "Why are three separate Places instead of one hub a bad ship?",
 options: [
          "Roblox bans multiple Places",
          "Always faster that way",
          "Terrain requires it",
          "No integrated experience for the player"
        ],
 correctAnswer: 3,
 explanation: "Ship = stitched cycle.",
 },
 {
 id: "q5",
 type: MC,
 question: "What minimum chain counts as hub integration?",
 options: [
          "Only a nice sign with no systems",
          "Quest/action → Coins reward → shop purchase",
          "Only ParticleEmitter",
          "Only changing the sky"
        ],
 correctAnswer: 1,
 explanation: "Economy and Remotes chain.",
 },
 {
 id: "q6",
 type: MC,
 question: "What if the 10.7 puzzle is still missing?",
 options: [
          "Cancel all of module 10",
          "Buy with no coins on the client",
          "Lite trigger (zone/flag), but link it to the quest",
          "Ignore onboarding"
        ],
 correctAnswer: 2,
 explanation: "Honest lite replacement for the path.",
 },
 {
 id: "q7",
 type: MC,
 question: "Why the alreadyRewarded flag in the quest?",
 options: [
          "So the reward is not granted many times",
          "To disable Anchored",
          "To replace RemoteEvent",
          "Required for Terrain"
        ],
 correctAnswer: 0,
 explanation: "Economy protection.",
 },
 {
 id: "q8",
 type: MC,
 question: "Which of these is a typical integration hole?",
 options: [
          "There is a sign at spawn",
          "There is one item in Config",
          "Output is clean",
          "Quest and shop write coins in different places"
        ],
 correctAnswer: 3,
 explanation: "Different stores = balance drift.",
 },
 {
 id: "q9",
 type: MC,
 question: "Hub onboarding at spawn minimally needs…",
 options: [
          "12 HUD panels at once",
          "Publishing to the catalog",
          "A clear first step (sign/NPC/marker)",
          "Disabling Explorer"
        ],
 correctAnswer: 2,
 explanation: "A beginner should know where to go.",
 },
 {
 id: "q10",
 type: MC,
 question: "What do we deliberately postpone in 10.8?",
 options: [
          "Checking Output",
          "Catalog bloat and Publish Public instead of a stable cycle",
          "One item and one quest",
          "The Ship rubric"
        ],
 correctAnswer: 1,
 explanation: "Scope control.",
 },
 {
 id: "q11",
 type: MC,
 question: "Why a playtest table with a second pass of the path?",
 options: [
          "It replaces all Remotes",
          "Only needed for Lighting",
          "Banned in Studio",
          "Catches double rewards and crashes on the 2nd try"
        ],
 correctAnswer: 3,
 explanation: "State and stability.",
 },
 {
 id: "q12",
 type: MC,
 question: "ShopConfig on the server is needed so…",
 options: [
          "You take item price/data without trusting the client",
          "To paint Terrain",
          "Disable Pathfinding",
          "To replace SpawnLocation"
        ],
 correctAnswer: 0,
 explanation: "Source of truth for the shop.",
 },
 {
 id: "q13",
 type: MC,
 question: "Which rubric item concerns the shop network?",
 options: [
          "Sky color at 18:00",
          "Tree count on the island",
          "Purchase via Remote and price from Config",
          "Module 1 name"
        ],
 correctAnswer: 2,
 explanation: "Rubric block C.",
 },
 {
 id: "q14",
 type: MC,
 question: "After a successful 10.8 the logical next course step…",
 options: [
          "Delete the hub and start Baseplate",
          "Skip all tests",
          "Remove leaderstats forever",
          "Polish M11 on this same Place (audit, juice, Demo Ready)"
        ],
 correctAnswer: 3,
 explanation: "Hub is the base for polish.",
 },
 {
 id: "q15",
 type: MC,
 question: "What counts as the lesson 10.8 hand-in artifact?",
 options: [
          "Theory only, no Studio",
          "Place Hub Ship with integrated path, rubric, and clean Output",
          "Empty shop with no coins",
          "A separate file with only ParticleEmitter"
        ],
 correctAnswer: 1,
 explanation: "You need an assembled hub.",
 }
 ],
 },
}
