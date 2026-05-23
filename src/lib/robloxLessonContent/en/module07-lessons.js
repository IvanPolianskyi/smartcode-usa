/** Rich EN content for Roblox Module 07 - lessons 7.1–7.3 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const enLesson71 = {
  lessonId: 'lesson-roblox-7-1',
  moduleId: 'module-07',
  order: 1,
  title: '7.1 - Two Worlds: Client and Server',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Explain client vs server responsibilities in Roblox',
    'Map trust boundaries for 10 game actions',
    'Build PingServer RemoteEvent handshake demo',
    'Place scripts in StarterGui vs ServerScriptService correctly',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Module 7 - Network & Shop** - you learn how **client** and **server** talk safely. This powers shops, quests, and fair multiplayer.

**Lesson flow:**
1. **Theory (40 min)** - two worlds + trust map
2. **Practice (~25 min)** - ping demo + boundary map
3. **Quiz (10 min)** - **70%** pass

New place or hub: \`Lesson 7.1 - Two Worlds\`. You already used RemoteEvents in Module 6 racing - today we go deeper.`,
      },
      {
        title: 'Two computers, one game',
        content: `Every Roblox session has:

| World | Where it runs | Who sees it |
|-------|---------------|-------------|
| **Client** | Player's device | That player only |
| **Server** | Roblox game host | Everyone - shared truth |

**Client** = camera, keyboard, your ScreenGui, local sounds.

**Server** = coins, inventory, damage, quest progress, who won the race.

**Rule:** *Client asks. Server decides.*`,
      },
      {
        title: 'What belongs where',
        content: `| Action | Side | Why |
|--------|------|-----|
| Move camera | Client | Personal view |
| Click shop button | Client | Input |
| Deduct coins | Server | Anti-cheat |
| Grant sword tool | Server | Shared inventory |
| Show "Processing..." | Client | Fast feedback |
| Save best lap time | Server | Official score |
| Play footstep sound locally | Client | No need to network |
| Kill player with lava | Server | Fair damage |

**Exercise (8 min):** List 10 actions from your race place - label each Client / Server / Both.`,
      },
      {
        title: 'Script placement',
        content: `| Script type | Location | Runs on |
|-------------|----------|---------|
| **Script** | ServerScriptService, parts (server) | Server |
| **LocalScript** | StarterGui, StarterPlayerScripts | Client |

\`\`\`lua
-- LocalScript (StarterGui)
print("Client: I read input and update UI")

-- Script (ServerScriptService)
print("Server: I validate and save shared data")
\`\`\`

**LocalScript in ServerScriptService** = never runs for players. **Script in StarterGui** = wrong place.`,
      },
      {
        title: 'Trust boundary',
        content: `**Trust boundary** = line where you stop believing the client.

**Never trust client for:**
- Coin amount after purchase
- "I finished quest step 5"
- Damage dealt to another player
- Item price

**OK on client:**
- Button animations
- Camera shake
- Preview text before server confirms

If cheating would hurt balance → **server**.`,
      },
      {
        title: 'First handshake - PingServer',
        content: `**ReplicatedStorage** → **RemoteEvent** → \`PingServer\`

**ServerScriptService** → Script \`PingHandler\`:

\`\`\`lua
local ping = game.ReplicatedStorage:WaitForChild("PingServer")

ping.OnServerEvent:Connect(function(player, msg)
    if type(msg) ~= "string" then return end
    print("[Ping] " .. player.Name .. " says: " .. msg)
    ping:FireClient(player, "Pong from server!")
end)
\`\`\`

**StarterGui** → \`PingUI\` → TextButton + **LocalScript**:

\`\`\`lua
local ping = game.ReplicatedStorage:WaitForChild("PingServer")
local button = script.Parent.PingButton

button.MouseButton1Click:Connect(function()
    ping:FireServer("Hello from client!")
end)

ping.OnClientEvent:Connect(function(reply)
    script.Parent.StatusLabel.Text = reply
end)
\`\`\`

**Play** → click → Output + label update.`,
      },
      {
        title: 'Naming remotes for later lessons',
        content: `Good names (Module 7 shop path):
- \`PingServer\` - test only
- \`RequestPurchase\` - client → server buy
- \`PurchaseResult\` - server → client feedback

**Bad names:** \`Event1\`, \`Remote\`, \`DoThing\`

Put remotes in **ReplicatedStorage**, not ServerStorage (clients cannot see ServerStorage).`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Trust map: 10 actions labeled
- [ ] PingServer RemoteEvent works in Play
- [ ] Server prints player name + message
- [ ] Client StatusLabel shows pong
- [ ] Save: \`Lesson 7.1 - Two Worlds\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Important logic only in LocalScript', explanation: 'Exploiters can fake client.', correctApproach: 'Server validates economy and progress' },
    { mistake: 'Remote in ServerStorage', explanation: 'Client cannot FireServer.', correctApproach: 'ReplicatedStorage for shared remotes' },
    { mistake: 'LocalScript in ServerScriptService', explanation: 'Does not run on client.', correctApproach: 'LocalScript under StarterGui' },
    { mistake: 'Trusting client coin count', explanation: 'Infinite money exploit.', correctApproach: 'Server stores and changes coins' },
  ],
  summary: `You mapped client vs server trust boundaries, placed scripts correctly, and built a PingServer handshake - the foundation for the shop and secure purchases in the rest of Module 7.`,
  practiceTask: {
    title: 'Trust map + ping demo (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Document boundaries + working remote ping.

### Part A - Trust map (10 min)
1. Paper or notes: 10 actions → Client / Server / Both
2. At least 3 must be Server-only with reason

### Part B - Ping demo (12 min)
1. PingServer RemoteEvent + PingHandler server script
2. PingUI button + LocalScript + StatusLabel
3. Play - verify Output and label

### Part C - Save (3 min)
1. **Save to Roblox** → \`Lesson 7.1 - Two Worlds\`
2. **Practice complete**`,
    hints: [
      'Test with 2 players in Studio - both should ping separately',
      'Return early if msg is not a string',
      'Module 6 RaceEvent was the same pattern - reuse that mental model',
    ],
    optionalChallenge: 'Send os.clock() from client; show round-trip ms on StatusLabel.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Server is authoritative for…', options: ['Shared game state like coins', 'Only camera', 'Only local sounds', 'Player monitor brightness'], correctAnswer: 0, explanation: 'Server owns shared truth.' },
      { id: 'q2', type: MC, question: 'LocalScript runs on…', options: ['Each player client', 'Server only', 'Roblox website', 'DataStore'], correctAnswer: 0, explanation: 'Client-side.' },
      { id: 'q3', type: MC, question: 'Client asks, server decides means…', options: ['Server validates requests', 'Client always wins', 'No remotes', 'No UI'], correctAnswer: 0, explanation: 'Trust boundary.' },
      { id: 'q4', type: MC, question: 'Shared remotes go in…', options: ['ReplicatedStorage', 'ServerStorage only', 'Lighting', 'Terrain'], correctAnswer: 0, explanation: 'Both sides can access.' },
      { id: 'q5', type: MC, question: 'FireServer sends…', options: ['Client to server', 'Server to client only', 'Terrain edit', 'Weld'], correctAnswer: 0, explanation: 'Client request.' },
      { id: 'q6', type: MC, question: 'Shop coin deduction belongs on…', options: ['Server', 'Client only', 'StarterGui text', 'Sky'], correctAnswer: 0, explanation: 'Anti-cheat.' },
      { id: 'q7', type: MC, question: 'Module 7 theme is…', options: ['Network & Shop / networking', 'Only terrain', 'Only racing', 'Publishing'], correctAnswer: 0, explanation: 'Client-server communication.' },
      { id: 'q8', type: MC, question: 'Script in ServerScriptService runs on…', options: ['Server', 'Client HUD', 'Both', 'Neither'], correctAnswer: 0, explanation: 'Server scripts.' },
      { id: 'q9', type: MC, question: 'Ping demo proves…', options: ['Client and server can communicate', 'DataStore works', 'Terrain generates', 'NPC pathfinding'], correctAnswer: 0, explanation: 'Handshake test.' },
      { id: 'q10', type: MC, question: 'Lesson 7.1 save name…', options: ['Lesson 7.1 - Two Worlds', 'Shop Works', 'Race Launched', 'Arena Ready'], correctAnswer: 0, explanation: 'Save lesson 7.1.' },
    ],
  },
}

export const enLesson72 = {
  lessonId: 'lesson-roblox-7-2',
  moduleId: 'module-07',
  order: 2,
  title: '7.2 - RemoteEvent',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Use RemoteEvent for one-way client↔server messages',
    'Validate payloads with type checks and early return',
    'Pair RequestAction and ActionResult remotes',
    'Add per-player cooldown against spam',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**RemoteEvent** = one-way **mail** between worlds. No instant return value (that is RemoteFunction in 7.5).

**Lesson flow:**
1. **Theory (40 min)** - events + validation
2. **Practice (~25 min)** - message bus with two remotes
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 7.1 - Two Worlds**.`,
      },
      {
        title: 'RemoteEvent directions',
        content: `| Call | Direction | Use |
|------|-----------|-----|
| \`FireServer(...)\` | Client → Server | Buy, quest, ability request |
| \`FireClient(player, ...)\` | Server → one client | Personal result |
| \`FireAllClients(...)\` | Server → everyone | Announcement |

**One-way:** sender does not wait for a return value in the same line.`,
      },
      {
        title: 'RequestAction + ActionResult pattern',
        content: `**ReplicatedStorage:**
- \`RequestAction\` - client fires item id
- \`ActionResult\` - server fires ok + message back

**Server** \`ShopBus\` in ServerScriptService:

\`\`\`lua
local request = game.ReplicatedStorage.RequestAction
local result = game.ReplicatedStorage.ActionResult

local cooldown = {}
local COOLDOWN = 0.3

request.OnServerEvent:Connect(function(player, itemId)
    if type(itemId) ~= "string" then
        warn("Bad payload from", player.Name)
        return
    end

    if cooldown[player] and os.clock() - cooldown[player] < COOLDOWN then
        return
    end
    cooldown[player] = os.clock()

    -- Lesson 7.4 will add real shop table; today stub:
    if itemId == "sword_basic" or itemId == "shield_basic" then
        result:FireClient(player, true, "Request received: " .. itemId)
    else
        result:FireClient(player, false, "Unknown item")
    end
end)
\`\`\``,
      },
      {
        title: 'Client listener',
        content: `\`StarterGui/ShopBusUI\` LocalScript:

\`\`\`lua
local request = game.ReplicatedStorage.RequestAction
local result = game.ReplicatedStorage.ActionResult
local status = script.Parent.StatusLabel

result.OnClientEvent:Connect(function(ok, message)
    if ok then
        status.Text = "✓ " .. message
        status.TextColor3 = Color3.fromRGB(80, 200, 120)
    else
        status.Text = "✗ " .. message
        status.TextColor3 = Color3.fromRGB(220, 80, 80)
    end
end)

-- wired from buttons in 7.3; test button here:
script.Parent.TestBuy.MouseButton1Click:Connect(function()
    status.Text = "Processing..."
    request:FireServer("sword_basic")
end)
\`\`\``,
      },
      {
        title: 'Payload rules',
        content: `**Start simple:**
- \`itemId\` string
- \`ok\` boolean
- \`message\` string

**Validate every argument:**

\`\`\`lua
if type(itemId) ~= "string" then return end
if #itemId > 32 then return end  -- anti spam string
\`\`\`

**Never** pass price from client as authority.

**Log suspicious data** in Output during development.`,
      },
      {
        title: 'Spam and exploits',
        content: `Players can click buy 100 times per second.

**Cooldown table:**
\`\`\`lua
local cooldown = {}
-- set os.clock() after accept; ignore if too soon
\`\`\`

**Return early** keeps code flat:

\`\`\`lua
if type(itemId) ~= "string" then return end
if not VALID_ITEMS[itemId] then
    result:FireClient(player, false, "Unknown item")
    return
end
\`\`\`

Compare to Module 6 - same discipline for race events.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] RequestAction + ActionResult in ReplicatedStorage
- [ ] Server validates string itemId
- [ ] Client shows green/red status from ActionResult
- [ ] Cooldown stops button spam
- [ ] Save: \`Lesson 7.2 - RemoteEvent\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Only RequestAction, no result event', explanation: 'UI stuck on Processing.', correctApproach: 'ActionResult FireClient with message' },
    { mistake: 'No type check on itemId', explanation: 'Crashes or weird exploits.', correctApproach: 'type(itemId) == string' },
    { mistake: 'FireServer from server script', explanation: 'Wrong direction.', correctApproach: 'FireServer from LocalScript only' },
    { mistake: 'Same RemoteEvent both directions confused', explanation: 'Hard to debug.', correctApproach: 'Separate request vs result remotes' },
  ],
  summary: `You built a two-remote message bus with validated RequestAction payloads, ActionResult feedback to the UI, and per-player cooldown - ready to connect a full shop screen in the next lesson.`,
  practiceTask: {
    title: 'Event message bus (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Request + result loop with validation.

### Part A - Remotes (8 min)
1. RequestAction + ActionResult in ReplicatedStorage
2. ShopBus server script with stub valid ids

### Part B - Client (12 min)
1. TestBuy button + StatusLabel
2. OnClientEvent colors success/fail
3. 0.3s server cooldown - spam click test

### Part C - Save (5 min)
1. Unknown id → fail message
2. **Save to Roblox** → \`Lesson 7.2 - RemoteEvent\`
3. **Practice complete**`,
    hints: [
      'Print every OnServerEvent with player.Name and itemId',
      'Processing... text before FireServer feels responsive',
      'VALID_ITEMS table can be 2 items for now',
    ],
    optionalChallenge: 'FireAllClients when someone buys - "X is shopping!"',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'RemoteEvent is…', options: ['One-way messaging', 'Synchronous return only', 'Terrain tool', 'Weld type'], correctAnswer: 0, explanation: 'Fire and forget.' },
      { id: 'q2', type: MC, question: 'FireClient targets…', options: ['One specific player', 'Only server', 'Terrain', 'DataStore'], correctAnswer: 0, explanation: 'Server to one client.' },
      { id: 'q3', type: MC, question: 'Validate itemId with…', options: ['type(itemId) == "string"', 'Trust client', 'No checks', 'Random'], correctAnswer: 0, explanation: 'Type guard.' },
      { id: 'q4', type: MC, question: 'ActionResult should be fired from…', options: ['Server after processing', 'Client before server', 'Lighting', 'Terrain'], correctAnswer: 0, explanation: 'Server owns result.' },
      { id: 'q5', type: MC, question: 'Cooldown prevents…', options: ['Spam requests', 'Walking', 'Jumping', 'Camera'], correctAnswer: 0, explanation: 'Rate limit.' },
      { id: 'q6', type: MC, question: 'FireServer is called from…', options: ['LocalScript', 'Server Script only', 'Terrain', 'Module in ServerStorage'], correctAnswer: 0, explanation: 'Client initiates.' },
      { id: 'q7', type: MC, question: 'Early return on bad data…', options: ['Keeps handlers readable', 'Deletes player', 'Publishes game', 'Removes UI'], correctAnswer: 0, explanation: 'Guard clauses.' },
      { id: 'q8', type: MC, question: 'Two remotes used because…', options: ['Request and result are separate flows', 'One is enough always', 'No networking', 'UI only'], correctAnswer: 0, explanation: 'Clear separation.' },
      { id: 'q9', type: MC, question: 'Lesson 7.2 builds on…', options: ['Lesson 7.1 ping', 'Only Module 1', 'Only coins Module 3', 'Publishing'], correctAnswer: 0, explanation: 'Continues networking.' },
      { id: 'q10', type: MC, question: 'Lesson 7.2 save name…', options: ['Lesson 7.2 - RemoteEvent', 'Two Worlds', 'Shop Works', 'Race Timer'], correctAnswer: 0, explanation: 'Save lesson 7.2.' },
    ],
  },
}

export const enLesson73 = {
  lessonId: 'lesson-roblox-7-3',
  moduleId: 'module-07',
  order: 3,
  title: '7.3 - Shop: UI Part',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Build ScreenGui shop panel with open/close toggle',
    'Create 3+ item cards with name, price, buy buttons',
    'Wire buttons to FireServer RequestPurchase with item ids',
    'Show Processing and status feedback on the client',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `Today the **shop looks real** - UI only. Server pays out in **7.4**.

**Lesson flow:**
1. **Theory (40 min)** - ScreenGui layout + UX
2. **Practice (~25 min)** - 3-item shop panel
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 7.2 - RemoteEvent**. Rename \`RequestAction\` → \`RequestPurchase\` if you want shop naming (or keep both during migration).`,
      },
      {
        title: 'Shop UI hierarchy',
        content: `**StarterGui** → \`ShopGui\` (ScreenGui)

\`\`\`
ShopGui
├── OpenShopButton (TextButton, corner)
└── ShopPanel (Frame, center, hidden at start)
    ├── TitleLabel ("Item Shop")
    ├── ItemList (ScrollingFrame or Frame)
    │   ├── Item_sword_basic
    │   ├── Item_shield_basic
    │   └── Item_speed_boost
    ├── StatusLabel (bottom)
    └── CloseButton
\`\`\`

**UICorner** + **UIStroke** on panel for polish.`,
      },
      {
        title: 'Item card layout',
        content: `Each \`Item_sword_basic\` Frame contains:
- **NameLabel** - "Basic Sword"
- **PriceLabel** - "50 coins" (display only for now)
- **BuyButton** - Text "Buy"

**Single price table** in LocalScript (display source):

\`\`\`lua
local DISPLAY_PRICES = {
    sword_basic = 50,
    shield_basic = 40,
    speed_boost = 30,
}
\`\`\`

Server will own real prices in 7.4 - display table is preview only.`,
      },
      {
        title: 'Open and close panel',
        content: `\`ShopPanel.Visible = false\` at start.

\`\`\`lua
local panel = script.Parent.ShopPanel
local openBtn = script.Parent.OpenShopButton
local closeBtn = panel.CloseButton

openBtn.MouseButton1Click:Connect(function()
    panel.Visible = true
end)

closeBtn.MouseButton1Click:Connect(function()
    panel.Visible = false
end)
\`\`\`

Optional: **TweenService** slide panel from bottom (challenge).`,
      },
      {
        title: 'Buy button wiring',
        content: `\`ShopClient\` LocalScript in ShopPanel:

\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local request = ReplicatedStorage:WaitForChild("RequestPurchase")
local result = ReplicatedStorage:WaitForChild("PurchaseResult")
local status = script.Parent.StatusLabel

local function hookBuy(button, itemId)
    button.MouseButton1Click:Connect(function()
        status.Text = "Processing..."
        status.TextColor3 = Color3.fromRGB(200, 200, 100)
        button.Active = false
        request:FireServer(itemId)
        task.delay(0.5, function()
            button.Active = true
        end)
    end)
end

hookBuy(script.Parent.ItemList.Item_sword_basic.BuyButton, "sword_basic")
-- repeat for shield_basic, speed_boost
\`\`\`

Use **PurchaseResult** from 7.2 pattern (rename ActionResult if needed).`,
      },
      {
        title: 'Teen-friendly UX polish',
        content: `| UX trick | Effect |
|----------|--------|
| Disable button 0.5s after click | No double-fire feel |
| "Processing..." yellow text | Player knows something happened |
| Green ✓ / red ✗ on result | Clear outcome |
| Consistent price labels | Trust |

**Do not** change coins on client - only show messages until 7.4.`,
      },
      {
        title: 'Prepare for server shop (7.4)',
        content: `**Item ids** (strings, lowercase, underscore):
- \`sword_basic\`
- \`shield_basic\`
- \`speed_boost\`

Server \`ShopItems\` table in 7.4 will match these ids exactly.

**Before practice checklist:**
- [ ] 3 items with buy buttons
- [ ] Open/close shop works
- [ ] Each buy fires correct itemId
- [ ] StatusLabel updates from PurchaseResult
- [ ] Save: \`Lesson 7.3 - Shop UI\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Different itemId on button vs server table', explanation: 'Unknown item forever.', correctApproach: 'Shared id constants' },
    { mistake: 'LocalScript in Workspace', explanation: 'May not run for all players.', correctApproach: 'StarterGui hierarchy' },
    { mistake: 'Client changes Coins IntValue on buy', explanation: 'Exploit before 7.4.', correctApproach: 'UI message only until server deducts' },
    { mistake: 'Hard-coded price on button and label mismatch', explanation: 'Confusing shop.', correctApproach: 'One DISPLAY_PRICES table' },
  ],
  summary: `You built a ScreenGui shop with three items, open/close panel, buy buttons firing RequestPurchase, and polished client feedback - ready for secure server checkout in Lesson 7.4.`,
  practiceTask: {
    title: 'Shop ScreenGui (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Full shop UI wired to remotes (stub server ok).

### Part A - Layout (12 min)
1. ShopGui + ShopPanel + 3 item cards
2. Name + price labels from DISPLAY_PRICES table
3. OpenShopButton + CloseButton

### Part B - Wiring (10 min)
1. RequestPurchase + PurchaseResult (from 7.2 pattern)
2. hookBuy for each item id
3. Processing + button disable + status colors

### Part C - Save (3 min)
1. Play - buy each item once
2. **Save to Roblox** → \`Lesson 7.3 - Shop UI\`
3. **Practice complete**`,
    hints: [
      'Button names Buy_sword_basic help debugging',
      'ScrollingFrame if you add more than 3 items later',
      'Server stub from 7.2 still works until 7.4 adds coins',
    ],
    optionalChallenge: 'TweenService panel slide + dim background Frame.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Shop UI lives in…', options: ['StarterGui ScreenGui', 'ServerStorage', 'Terrain', 'Lighting only'], correctAnswer: 0, explanation: 'Client UI.' },
      { id: 'q2', type: MC, question: 'Buy button should FireServer with…', options: ['item id string', 'Player name only', 'Random price', 'Terrain id'], correctAnswer: 0, explanation: 'Payload for server.' },
      { id: 'q3', type: MC, question: 'Display prices on UI in 7.3 are…', options: ['Preview until server validates in 7.4', 'Final authority', 'Stored in Terrain', 'Hidden'], correctAnswer: 0, explanation: 'Server owns real prices.' },
      { id: 'q4', type: MC, question: 'Processing... text shows…', options: ['Request sent, waiting', 'Instant purchase done', 'Server offline', 'Game published'], correctAnswer: 0, explanation: 'UX feedback.' },
      { id: 'q5', type: MC, question: 'Disable button briefly to…', options: ['Reduce double-click spam', 'Delete item', 'Close game', 'Save place'], correctAnswer: 0, explanation: 'Client-side UX.' },
      { id: 'q6', type: MC, question: 'LocalScript handles…', options: ['Clicks and label updates', 'Coin deduction', 'DataStore save', 'NPC AI'], correctAnswer: 0, explanation: 'Client role.' },
      { id: 'q7', type: MC, question: 'item ids should be…', options: ['Consistent strings like sword_basic', 'Random each click', 'Numbers only on client', 'Empty'], correctAnswer: 0, explanation: 'Match server table later.' },
      { id: 'q8', type: MC, question: 'Lesson 7.3 needs remotes from…', options: ['Lesson 7.2', 'Lesson 1.1 only', 'Module 6 only', 'No prior lessons'], correctAnswer: 0, explanation: 'Request/result pattern.' },
      { id: 'q9', type: MC, question: 'Server coin logic comes in…', options: ['Lesson 7.4', 'Lesson 7.1', 'Lesson 6.1', 'Lesson 12'], correctAnswer: 0, explanation: 'Next lesson.' },
      { id: 'q10', type: MC, question: 'Lesson 7.3 save name…', options: ['Lesson 7.3 - Shop UI', 'Shop Works', 'RemoteEvent', 'Race Launched'], correctAnswer: 0, explanation: 'Save UI lesson.' },
    ],
  },
}

export const enLesson74 = {
  lessonId: 'lesson-roblox-7-4',
  moduleId: 'module-07',
  order: 4,
  title: '7.4 - Shop: Server Logic',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Store ShopItems table with server-only prices on the server',
    'Validate purchases and deduct Coins in leaderstats',
    'Grant tools to Backpack with purchase lock',
    'Fire PurchaseResult with balance and clear messages',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `The UI from **7.3** asks to buy. Today the **server is the cashier** - real coins, real items.

**Lesson flow:**
1. **Theory (40 min)** - validation flow + locks
2. **Practice (~25 min)** - secure server shop
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 7.3 - Shop UI**.`,
      },
      {
        title: 'Server is the cashier',
        content: `Only server may:
- Store **Coins** in \`leaderstats\`
- Know **real prices**
- Approve or deny purchases
- Put tools in **Backpack**

Client sends **item id only** - never price, never "I have 999 coins".`,
      },
      {
        title: 'ShopItems module',
        content: `**ServerScriptService** → **ModuleScript** \`ShopConfig\`:

\`\`\`lua
local ShopConfig = {}

ShopConfig.Items = {
    sword_basic = {
        name = "Basic Sword",
        price = 50,
        toolName = "BasicSword", -- in ServerStorage/Tools
    },
    shield_basic = {
        name = "Wooden Shield",
        price = 40,
        toolName = "WoodenShield",
    },
    speed_boost = {
        name = "Speed Boost",
        price = 30,
        toolName = "SpeedBoost",
    },
}

return ShopConfig
\`\`\`

**ReplicatedStorage** does not get prices - clients learn prices via catalog in 7.5 or PurchaseResult messages.`,
      },
      {
        title: 'Coins on join',
        content: `**ShopServer** Script - PlayerAdded:

\`\`\`lua
local function setupCoins(player)
    local ls = player:FindFirstChild("leaderstats")
    if not ls then
        ls = Instance.new("Folder")
        ls.Name = "leaderstats"
        ls.Parent = player
    end
    local coins = ls:FindFirstChild("Coins")
    if not coins then
        coins = Instance.new("IntValue")
        coins.Name = "Coins"
        coins.Value = 100 -- starter coins for lesson
        coins.Parent = ls
    end
end

game.Players.PlayerAdded:Connect(setupCoins)
\`\`\`

Reuse Module 3 leaderstats pattern.`,
      },
      {
        title: 'Validation flow (6 steps)',
        content: `On \`RequestPurchase.OnServerEvent\`:

1. **Type check** - \`itemId\` is string
2. **Exists** - \`ShopConfig.Items[itemId]\`
3. **Lock** - skip if \`purchaseLock[player]\`
4. **Balance** - \`coins.Value >= price\`
5. **Deduct** - \`coins.Value -= price\`
6. **Grant** - clone tool from \`ServerStorage/Tools\` → Backpack
7. **Notify** - \`PurchaseResult:FireClient(player, true, msg, coins.Value)\`

\`\`\`lua
if not ShopConfig.Items[itemId] then
    return deny(player, "Unknown item")
end
local price = ShopConfig.Items[itemId].price
if coins.Value < price then
    return deny(player, "Not enough coins")
end
\`\`\``,
      },
      {
        title: 'Purchase lock (anti double-spend)',
        content: `\`\`\`lua
local purchaseLock = {}

local function processPurchase(player, itemId)
    if purchaseLock[player] then return end
    purchaseLock[player] = true

    local ok, err = pcall(function()
        -- validation + deduct + grant
    end)

    purchaseLock[player] = nil

    if not ok then
        warn("Purchase error:", err)
        PurchaseResult:FireClient(player, false, "Shop error", coins.Value)
    end
end
\`\`\`

**pcall** ensures lock always clears even if grant fails.`,
      },
      {
        title: 'Grant tool safely',
        content: `\`\`\`lua
local toolsFolder = game.ServerStorage:WaitForChild("Tools")
local template = toolsFolder:FindFirstChild(item.toolName)
if not template then
    return deny(player, "Item unavailable")
end

local tool = template:Clone()
tool.Parent = player.Backpack
\`\`\`

**Already owns?** Optional: check Backpack/Character before grant - deny duplicate or allow stack per design.

**PurchaseResult payload:**
\`(success: boolean, message: string, newBalance: number)\`

Client updates **CoinsLabel** from \`newBalance\`, not local math.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] Unknown item id → fail, no coin change
- [ ] 0 coins → "Not enough coins"
- [ ] Valid buy → tool in Backpack + coins reduced
- [ ] Rapid clicks → only one purchase (lock)
- [ ] Save: \`Lesson 7.4 - Server Shop\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Client sends price in FireServer', explanation: 'Exploit: price = 0.', correctApproach: 'Server reads ShopConfig price' },
    { mistake: 'No purchase lock', explanation: 'Double-spend on fast clicks.', correctApproach: 'purchaseLock per player' },
    { mistake: 'Deduct coins after grant fails', explanation: 'Player pays, gets nothing.', correctApproach: 'Validate tool exists before deduct, or refund in pcall' },
    { mistake: 'ShopItems in ReplicatedStorage', explanation: 'Tampering risk.', correctApproach: 'ModuleScript server-only' },
  ],
  summary: `You implemented server-side ShopConfig, coin validation, purchase locks, tool grants, and PurchaseResult with live balance - the shop economy is now secure and fair.`,
  practiceTask: {
    title: 'Secure server shop (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** Real purchases with server authority.

### Part A - Config (8 min)
1. ShopConfig ModuleScript with 3 items + prices
2. Tools folder in ServerStorage (simple Tool parts ok)
3. PlayerAdded → Coins = 100

### Part B - ShopServer (15 min)
1. RequestPurchase handler - full 6-step flow
2. purchaseLock + pcall
3. PurchaseResult with newBalance

### Part C - Test & save (2 min)
1. Buy sword - coins drop, tool appears
2. Buy with 0 coins - denied
3. **Save to Roblox** → \`Lesson 7.4 - Server Shop\`
4. **Practice complete**`,
    hints: [
      'Print analytics: player, itemId, success - helps balancing',
      'deny() helper fires PurchaseResult false + current balance',
      'Remove DISPLAY_PRICES authority from client labels in 7.5',
    ],
    optionalChallenge: 'Server print line for every purchase attempt with result.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Real item prices live on…', options: ['Server ShopConfig', 'Client button text only', 'Terrain', 'Sky'], correctAnswer: 0, explanation: 'Server authority.' },
      { id: 'q2', type: MC, question: 'Client should send…', options: ['item id only', 'Price and coins', 'Admin password', 'Terrain id'], correctAnswer: 0, explanation: 'Minimal payload.' },
      { id: 'q3', type: MC, question: 'purchaseLock prevents…', options: ['Double-spend race', 'Walking', 'Camera', 'Sound'], correctAnswer: 0, explanation: 'Concurrent buys.' },
      { id: 'q4', type: MC, question: 'Coins IntValue belongs in…', options: ['leaderstats on server', 'Lighting', 'ReplicatedFirst', 'Workspace only'], correctAnswer: 0, explanation: 'Leaderboard + server.' },
      { id: 'q5', type: MC, question: 'Grant tool means clone to…', options: ['player.Backpack', 'Terrain', 'Lighting', 'ServerStorage'], correctAnswer: 0, explanation: 'Player inventory.' },
      { id: 'q6', type: MC, question: 'Not enough coins should…', options: ['Deny without deducting', 'Grant item free', 'Kick player', 'Delete shop'], correctAnswer: 0, explanation: 'Validation fail.' },
      { id: 'q7', type: MC, question: 'pcall around purchase helps…', options: ['Clear lock on errors', 'Skip validation', 'Remove UI', 'Publish'], correctAnswer: 0, explanation: 'Safe cleanup.' },
      { id: 'q8', type: MC, question: 'PurchaseResult should include…', options: ['success, message, new balance', 'Only color', 'Terrain id', 'Nothing'], correctAnswer: 0, explanation: 'Client updates UI.' },
      { id: 'q9', type: MC, question: 'Lesson 7.4 builds on…', options: ['Lesson 7.3 shop UI', 'Lesson 6 racing only', 'Lesson 1 terrain', 'Empty'], correctAnswer: 0, explanation: 'UI + server logic.' },
      { id: 'q10', type: MC, question: 'Lesson 7.4 save name…', options: ['Lesson 7.4 - Server Shop', 'Shop UI', 'Shop Works', 'Two Worlds'], correctAnswer: 0, explanation: 'Save server lesson.' },
    ],
  },
}

export const enLesson75 = {
  lessonId: 'lesson-roblox-7-5',
  moduleId: 'module-07',
  order: 5,
  title: '7.5 - RemoteFunction',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Create GetShopCatalog RemoteFunction in ReplicatedStorage',
    'Return safe item list from server OnServerInvoke',
    'Build shop UI cards dynamically from catalog',
    'Choose RemoteEvent vs RemoteFunction correctly',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**RemoteEvent** = mail (no instant reply). **RemoteFunction** = question with **answer**.

Use when client needs data **now**: shop catalog, coin balance check.

**Lesson flow:**
1. **Theory (40 min)** - InvokeServer pattern
2. **Practice (~25 min)** - dynamic catalog UI
3. **Quiz (10 min)** - **70%** pass

Open **Lesson 7.4 - Server Shop**.`,
      },
      {
        title: 'RemoteFunction vs RemoteEvent',
        content: `| Tool | Pattern | Good for |
|------|---------|----------|
| **RemoteEvent** | Fire and forget | Buy item, start race |
| **RemoteFunction** | Invoke and wait | Get catalog, fetch stats |

\`\`\`lua
-- Client waits for return
local catalog = GetShopCatalog:InvokeServer()
\`\`\`

**Do not** InvokeServer every frame - causes lag.`,
      },
      {
        title: 'GetShopCatalog server',
        content: `**ReplicatedStorage** → **RemoteFunction** \`GetShopCatalog\`

**ShopServer** (or CatalogService):

\`\`\`lua
local ShopConfig = require(game.ServerScriptService.ShopConfig)
local getCatalog = game.ReplicatedStorage.GetShopCatalog

getCatalog.OnServerInvoke = function(player)
    local list = {}
    for id, item in pairs(ShopConfig.Items) do
        table.insert(list, {
            id = id,
            name = item.name,
            price = item.price,
        })
    end
    table.sort(list, function(a, b)
        return a.price < b.price
    end)
    return list
end
\`\`\`

Return **only safe fields** - no secret admin flags, no tool instances.`,
      },
      {
        title: 'Client dynamic UI',
        content: `\`ShopClient\` - on shop open:

\`\`\`lua
local getCatalog = game.ReplicatedStorage:WaitForChild("GetShopCatalog")
local itemList = script.Parent.ShopPanel.ItemList

local ok, catalog = pcall(function()
    return getCatalog:InvokeServer()
end)

if not ok then
    script.Parent.StatusLabel.Text = "Could not load shop"
    return
end

-- Clear old cards (except template)
for _, item in ipairs(catalog) do
    local card = script.Template:Clone()
    card.Name = "Item_" .. item.id
    card.NameLabel.Text = item.name
    card.PriceLabel.Text = item.price .. " coins"
    card.BuyButton.MouseButton1Click:Connect(function()
        request:FireServer(item.id)
    end)
    card.Parent = itemList
    card.Visible = true
end
\`\`\`

**No hardcoded client prices** - labels from server catalog.`,
      },
      {
        title: 'Optional: GetCoinBalance',
        content: `Second **RemoteFunction** \`GetCoinBalance\`:

\`\`\`lua
GetCoinBalance.OnServerInvoke = function(player)
    local coins = player.leaderstats and player.leaderstats:FindFirstChild("Coins")
    return coins and coins.Value or 0
end
\`\`\`

Client **CoinsLabel** updates on shop open + after each PurchaseResult.

**RemoteEvent** still handles buy - Function only **reads** data.`,
      },
      {
        title: 'pcall and failures',
        content: `\`\`\`lua
local ok, result = pcall(function()
    return GetShopCatalog:InvokeServer()
end)

if not ok then
    warn("Catalog failed:", result)
    StatusLabel.Text = "Shop offline - try again"
    return
end
\`\`\`

Server errors, timeouts, or kicks should not break UI forever.`,
      },
      {
        title: 'Before practice checklist',
        content: `- [ ] GetShopCatalog returns 3 items sorted by price
- [ ] UI builds cards from server data
- [ ] Changing ShopConfig price updates UI after reopen
- [ ] Buy still uses RequestPurchase RemoteEvent
- [ ] Save: \`Lesson 7.5 - RemoteFunction\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'InvokeServer for every buy', explanation: 'Use RemoteEvent for actions.', correctApproach: 'Event = buy, Function = catalog' },
    { mistake: 'Returning Tool instances in catalog', explanation: 'Heavy and risky.', correctApproach: 'Return id, name, price only' },
    { mistake: 'No pcall on InvokeServer', explanation: 'UI breaks on error.', correctApproach: 'pcall + user message' },
    { mistake: 'Hardcoded buttons AND catalog', explanation: 'Duplicate drift.', correctApproach: 'Dynamic cards only' },
  ],
  summary: `You added GetShopCatalog RemoteFunction so the server returns a sorted item list and the client builds shop cards dynamically - no more mismatched hardcoded prices.`,
  practiceTask: {
    title: 'Dynamic catalog loader (~25 min)',
    difficulty: 'beginner',
    description: `**Goal:** UI from server catalog.

### Part A - RemoteFunction (10 min)
1. GetShopCatalog in ReplicatedStorage
2. OnServerInvoke builds list from ShopConfig
3. Sort by price ascending

### Part B - Dynamic UI (12 min)
1. Template card Frame (hidden)
2. On shop open - pcall InvokeServer, clone cards
3. Each Buy fires RequestPurchase(item.id)

### Part C - Save (3 min)
1. Change one price in ShopConfig - reopen shop - UI matches
2. **Save to Roblox** → \`Lesson 7.5 - RemoteFunction\`
3. **Practice complete**`,
    hints: [
      'Destroy old dynamic cards before rebuild',
      'Keep Template outside ItemList or mark it clearly',
      'CoinsLabel refresh after purchase still uses PurchaseResult',
    ],
    optionalChallenge: 'GetOwnedItems RemoteFunction + "Owned" badge on cards.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'RemoteFunction is for…', options: ['Request with immediate return', 'Fire and forget only', 'Terrain', 'Welds'], correctAnswer: 0, explanation: 'Invoke pattern.' },
      { id: 'q2', type: MC, question: 'InvokeServer is called from…', options: ['LocalScript', 'Server Script', 'Terrain', 'Lighting'], correctAnswer: 0, explanation: 'Client requests data.' },
      { id: 'q3', type: MC, question: 'OnServerInvoke runs on…', options: ['Server', 'Client only', 'Both', 'Neither'], correctAnswer: 0, explanation: 'Server returns data.' },
      { id: 'q4', type: MC, question: 'Buy item should use…', options: ['RemoteEvent RequestPurchase', 'RemoteFunction every click', 'Terrain', 'Atmosphere'], correctAnswer: 0, explanation: 'Actions use events.' },
      { id: 'q5', type: MC, question: 'Catalog should return…', options: ['id, name, price only', 'Full admin keys', 'Player passwords', 'Terrain'], correctAnswer: 0, explanation: 'Safe fields.' },
      { id: 'q6', type: MC, question: 'pcall around InvokeServer…', options: ['Handles failures gracefully', 'Removes server', 'Deletes UI', 'Bans players'], correctAnswer: 0, explanation: 'Error handling.' },
      { id: 'q7', type: MC, question: 'InvokeServer every frame is bad because…', options: ['Causes lag', 'Improves FPS', 'Required', 'Free Robux'], correctAnswer: 0, explanation: 'Blocking spam.' },
      { id: 'q8', type: MC, question: 'Dynamic UI means…', options: ['Cards built from server catalog', 'No scripts', 'Client-only prices', 'No shop'], correctAnswer: 0, explanation: 'No hardcoded drift.' },
      { id: 'q9', type: MC, question: 'Lesson 7.5 builds on…', options: ['Lesson 7.4 ShopConfig', 'Lesson 2 obby', 'Lesson 12 publish', 'Empty'], correctAnswer: 0, explanation: 'Server shop data.' },
      { id: 'q10', type: MC, question: 'Lesson 7.5 save name…', options: ['Lesson 7.5 - RemoteFunction', 'Server Shop', 'Shop Works', 'Two Worlds'], correctAnswer: 0, explanation: 'Save function lesson.' },
    ],
  },
}

export const enLesson76 = {
  lessonId: 'lesson-roblox-7-6',
  moduleId: 'module-07',
  order: 6,
  title: '7.6 - Checkpoint: Shop Works',
  theoryMinutes: 40,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    'Integrate UI, RemoteEvent purchases, and RemoteFunction catalog',
    'Pass two-player shop QA and exploit tests',
    'Use one ShopConfig ModuleScript as single source of truth',
    'Ship Module 7 - Shop Works portfolio save',
  ],
  theory: {
    sections: [
      {
        title: 'Your path today (about 40 minutes)',
        content: `**Shop Works** = complete Module 7 deliverable.

**Stack:**
- 7.1 Trust + ping
- 7.2 RemoteEvent pattern
- 7.3 ScreenGui shop
- 7.4 Server validation + coins + tools
- 7.5 Dynamic catalog via RemoteFunction

**Lesson flow:**
1. **Theory (40 min)** - integration checklist
2. **Practice (~40 min)** - QA + final save
3. **Quiz (10 min)** - **70%** pass`,
      },
      {
        title: 'Architecture map',
        content: `\`\`\`
ReplicatedStorage
├── RequestPurchase (RemoteEvent)  → buy
├── PurchaseResult (RemoteEvent)     → feedback
└── GetShopCatalog (RemoteFunction) → catalog

ServerScriptService
├── ShopConfig (ModuleScript)      → items + prices
└── ShopServer (Script)              → economy

StarterGui/ShopGui
└── ShopClient (LocalScript)       → UI + Invoke + Fire
\`\`\`

**One config file** - no duplicate price tables on client.`,
      },
      {
        title: 'Integration checklist',
        content: `| # | Requirement | Pass |
|---|-------------|------|
| 1 | Catalog loads from GetShopCatalog | |
| 2 | Prices match ShopConfig (no client authority) | |
| 3 | Buy deducts coins on server only | |
| 4 | Tool appears in Backpack | |
| 5 | PurchaseResult updates status + balance | |
| 6 | Unknown item id denied | |
| 7 | Zero coins → clear fail message | |
| 8 | No errors in Output during 5 buys | |`,
      },
      {
        title: 'Two-player test protocol',
        content: `**Studio → Test → Start** with **2 Players**:

1. Both open shop - catalogs match
2. Player A buys sword - A's coins drop, B's unchanged
3. Player B buys shield - independent inventories
4. Rapid click buy - no double-spend
5. **Exploit test:** client cannot FireServer fake price (server ignores)

Optional: command bar cannot grant free items without server (verify no client coin scripts).`,
      },
      {
        title: 'Edge cases',
        content: `Test each:
- **Unknown id** → "Unknown item", coins unchanged
- **0 coins** → "Not enough coins"
- **Shop reopen** → catalog rebuilds cleanly
- **Disconnect mid-purchase** → lock released (pcall)

**Remote naming:** prefix helps big games: \`Shop_RequestPurchase\` - optional polish.`,
      },
      {
        title: '60-second demo script',
        content: `Record or rehearse:
1. Show Coins on leaderboard (100 start)
2. Open shop - 3 items from catalog
3. Buy sword - Processing → success, tool equipped
4. Show reduced coin balance
5. Fail buy after spending all coins
6. Close shop

**Save:** \`Module 7 - Shop Works\``,
      },
      {
        title: 'Module 8 preview',
        content: `**Module 8 - Smart Game** adds **NPCs**, dialogue, and smarter worlds. Your shop can live in the same place as an NPC merchant later.

**Before practice:**
- [ ] All 8 checklist rows pass
- [ ] 2-player test done
- [ ] Architecture sketch in notes (optional)
- [ ] **Save to Roblox** → \`Module 7 - Shop Works\``,
      },
    ],
  },
  commonMistakes: [
    { mistake: 'Client DISPLAY_PRICES still used after 7.5', explanation: 'Price drift from server.', correctApproach: 'Catalog-only labels' },
    { mistake: 'Skipping 2-player test', explanation: 'Shared state bugs.', correctApproach: 'Independent player economies' },
    { mistake: 'ShopConfig copy on client', explanation: 'Exploit surface.', correctApproach: 'Server ModuleScript only' },
    { mistake: 'Many remotes with vague names', explanation: 'Debug nightmare.', correctApproach: 'Clear Shop_ prefix names' },
  ],
  summary: `You integrated secure server shop logic, dynamic catalog loading, and multiplayer QA into Shop Works - Module 7 is complete and demo-ready.`,
  practiceTask: {
    title: 'Ship Shop Works (~40 min)',
    difficulty: 'beginner',
    description: `**Goal:** Production-ready mini shop checkpoint.

### Part A - Integrate (15 min)
1. Single ShopConfig - wire ShopServer + ShopClient
2. Remove leftover stub/hardcoded prices
3. CoinsLabel + StatusLabel + dynamic cards

### Part B - QA (20 min)
1. Run 8-row checklist
2. 2-player test + exploit attempts
3. Fix failures one at a time

### Part C - Demo save (5 min)
1. 60-second walkthrough rehearsed
2. **Save to Roblox** → \`Module 7 - Shop Works\`
3. **Practice complete**`,
    hints: [
      'One ModuleScript prevents config drift',
      'Log purchases: player, itemId, result',
      'Reliability beats extra items in checkpoint',
    ],
    optionalChallenge: 'Session purchase history panel - last 5 buys.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      { id: 'q1', type: MC, question: 'Shop Works includes…', options: ['UI + events + server shop + catalog function', 'UI only', 'Terrain only', 'No networking'], correctAnswer: 0, explanation: 'Full module 7.' },
      { id: 'q2', type: MC, question: 'Two-player test verifies…', options: ['Independent coin balances', 'Shared one wallet', 'No server', 'Terrain only'], correctAnswer: 0, explanation: 'Per-player economy.' },
      { id: 'q3', type: MC, question: 'Single source of truth is…', options: ['ShopConfig ModuleScript', 'Client button text', 'Chat', 'Sky'], correctAnswer: 0, explanation: 'One config.' },
      { id: 'q4', type: MC, question: 'Fake item id should…', options: ['Be denied by server', 'Grant free tool', 'Crash game', 'Publish'], correctAnswer: 0, explanation: 'Validation.' },
      { id: 'q5', type: MC, question: 'GetShopCatalog uses…', options: ['RemoteFunction', 'Only Terrain', 'Weld', 'Atmosphere'], correctAnswer: 0, explanation: 'Catalog fetch.' },
      { id: 'q6', type: MC, question: 'RequestPurchase uses…', options: ['RemoteEvent', 'RemoteFunction per frame', 'DataStore only', 'NPC only'], correctAnswer: 0, explanation: 'Buy action.' },
      { id: 'q7', type: MC, question: 'Module 7 save name…', options: ['Module 7 - Shop Works', 'Race Launched', 'Arena Ready', 'Lesson 7.1'], correctAnswer: 0, explanation: 'Checkpoint save.' },
      { id: 'q8', type: MC, question: 'Lesson 7.6 completes…', options: ['Module 7 Network & Shop', 'Module 12', 'Module 1', 'UK translation'], correctAnswer: 0, explanation: 'End of module 7.' },
      { id: 'q9', type: MC, question: 'Next module theme is…', options: ['Smart Game / NPCs', 'Only racing', 'Only publishing', 'Empty'], correctAnswer: 0, explanation: 'Module 8 preview.' },
      { id: 'q10', type: MC, question: 'Checkpoint prioritizes…', options: ['Reliability over extra features', 'Most items possible', 'No tests', 'Client-only economy'], correctAnswer: 0, explanation: 'QA mindset.' },
    ],
  },
}
