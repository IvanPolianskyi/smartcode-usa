/** Rich UK content for Roblox Module 08 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson81 = {
 lessonId: "lesson-roblox-8-1",
 moduleId: "module-08",
 order: 1,
 title: "8.1 - Живий NPC",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Розмістіть Model NPC з Humanoid і чіткою роллю",
 "Додайте ProximityPrompt для взаємодії з гравцем",
 "Налаштуйте текст підказки та тривалість утримання",
 "Надайте NPC неактивну анімацію та читабельне ім’я",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Модуль 8 - Розумна гра** - світи оживають завдяки **NPC**, діалогам, патрулям і квестам.

**Хід уроку:**
1. **Теорія (40 хв)** - установка NPC + ProximityPrompt
2. **Практика (~25 хв)** - Керуйте NPC під час появи
3. **Вікторина (10 хв)** - проходження **70%**

Використовуйте місце **Module 7 - Shop Works** або новий центр:\`Lesson 8.1 - Living NPC\`.`,
 },
 {
 title: "Від опори до характеру",
 content: `Хороший NPC має:

| Шматок | Призначення |
|-------|---------|
| **Model** | Згрупована установка (R15 або R6) |
| **Humanoid** | Прогулянка, здоров'я, відображення імені |
| **HumanoidRootPart** | Interaction anchor |
| **Роль** | Одне речення: гід, купець, тренер |

**Statue NPC** = немає Humanoid, немає підказки. **Живий NPC** = гравці можуть взаємодіяти.

Гравці довіряють світам, які здаються **населеними**.`,
 },
 {
 title: "Отримання NPC на вашому місці",
 content: `**Варіант A - Toolbox (зручний для уроку):**
1. Аватар → **Rig Builder** або знайдіть "R15 NPC"
2. Insert Model → перейменувати\`NPC_Guide_Maya\`**Варіант B - дублікат початкового символу:**
1. Скопіюйте свого Character в Play (лише для навчання)
2. Закріпіть NPC на місці для статичної напрямної

**Folder:**\`Workspace/NPCs/NPC_Guide_Maya\`**Вправа (5 хв):** Встановіть Humanoid\`DisplayDistanceType\`тому ім'я відображається, коли поруч.`,
 },
 {
 title: "Налаштування ProximityPrompt",
 content: `Всередині **HumanoidRootPart** → вставте **ProximityPrompt**:

| Property | Пропонований |
|----------|-----------|
| **ActionText** | Розмова |
| **Текст об’єкта** | Гід Майя |
| **HoldDuration** | 0 (миттєво) або 0,5 |
| **MaxActivationDistance** | 8-12 |
| **RequiresLineOfSight** | false (простіше для NPC) |

**Server Script** в NPC (або NPCService):\`\`\`lua
local prompt = script.Parent:WaitForChild("HumanoidRootPart")
 :WaitForChild("ProximityPrompt")

prompt.Triggered:Connect(function(player)
 print("[NPC] " .. player.Name .. " talked to Guide Maya")
 -- Lesson 8.2: OpenDialogue:FireClient(player, "guide_intro")
end)
\`\`\`**Triggered** запускається на **сервері**, коли гравець активує підказку.`,
 },
 {
 title: "Неробоча анімація",
 content: `Скрипт **Animate** (часто всередині NPC) або вручну:

1. **Редактор анімації** → створити idle
2. Або використовуйте за замовчуванням режим простою з установки\`\`\`lua
local humanoid = script.Parent:FindFirstChildOfClass("Humanoid")
local animator = humanoid:FindFirstChildOfClass("Animator")
if animator then
 local idle = Instance.new("Animation")
 idle.AnimationId = "rbxassetid://YOUR_IDLE_ID"
 local track = animator:LoadAnimation(idle)
 track.Looped = true
 track:Play()
end
\`\`\`Для уроку: навіть **стояти на місці** з назвою + підказкою можна, якщо ідентифікатор анімації недоступний.`,
 },
 {
 title: "Розробка ролей і візуалізація",
 content: `Запишіть роль одного речення:
*"Гід Майя вітає нових гравців і направляє їх до магазину."*

**Візуальна узгодженість:**
- Одяг відповідає тематиці центру (модуль 1 острів/магазин)
- **BillboardGui** необов'язково - плаваючий текст "Quest Mentor".
- NPC **Anchored** false якщо йде пізніше; **true** для статичного посібника сьогодні

Folder **NPCs** забезпечує чистоту робочого простору.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] NPC_Guide_Maya з Humanoid + ProximityPrompt
- [ ] Підказка показує Talk + ім'я NPC
- [ ] Тригер друкує ім'я гравця у вихідних даних
- [ ] Роль записана в конспектах уроків
- [ ] Зберегти:\`Lesson 8.1 - Living NPC\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "ProximityPrompt у неправильній Part",
 explanation: "Важко викликати.",
 correctApproach: "HumanoidRootPart",
 },
 {
 mistake: "LocalScript увімкнено",
 explanation: "Ініціюється подія сервера.",
 correctApproach: "Скрипт на сервері",
 },
 {
 mistake: "На model немає Humanoid",
 explanation: "Не character.",
 correctApproach: "Риг з Humanoid",
 },
 {
 mistake: "Максимальна відстань активації 100",
 explanation: "Розмова з усієї карти.",
 correctApproach: "8-12 стадів",
 },
 ],
 summary: "Ви розмістили Guide Maya з Humanoid, ProximityPrompt і серверним обробником привітань - тепер у вашому центрі є живий NPC, готовий до діалогу в наступному уроці.",
 practiceTask: {
 title: "Створення керівництва NPC (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Взаємодіючий путівник на спауні.

### Part A - Model NPC (10 хв)
1. Folder Workspace/NPCs
2. NPC_Guide_Maya - установка + Humanoid
3. Позиція біля нереста або магазину

### Part B - Взаємодія (10 хв)
1. ProximityPrompt на HumanoidRootPart
2. Server Script друкує привітання на Triggered
3. Додаткова назва BillboardGui

### Part C - Зберегти (5 хв)
1. Play - утримувати E / клацнути підказку - див. Вивід
2. **Зберегти в Roblox** →\`Lesson 8.1 - Living NPC\` 3. **Практика завершена**`,
 hints: [
 "Перейменуйте все - майбутнє вам віддячить",
 "Перевірте оперативну відстань пішки та в автомобілі (не має спрацьовувати в автомобілі, якщо лише для ходьби)",
 "NPC магазину Module 7 може повторно використовувати те саме обладнання пізніше",
 ],
 optionalChallenge: "BillboardGui «Quest Mentor» над головою.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "ProximityPrompt дозволяє гравцям...",
 options: [
 "Interact when nearby",
 "Fly",
 "Edit terrain",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Контекстна дія.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Ініційована подія виконується на...",
 options: [
 "Server",
 "Client only",
 "Terrain",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Підказка на стороні сервера.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "NPC потребує...",
 options: [
 "Humanoid",
 "Only Part",
 "Sky only",
 "Sound only",
 ],
 correctAnswer: 0,
 explanation: "Налаштування Character.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "HumanoidRootPart містить...",
 options: [
 "ProximityPrompt anchor",
 "Coins only",
 "Terrain",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Точка взаємодії.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Чітка роль NPC допомагає...",
 options: [
 "Design and code stay focused",
 "Lag",
 "Remove UI",
 "Delete shop",
 ],
 correctAnswer: 0,
 explanation: "Дизайн гри.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Модуль 8 фокусується на...",
 options: [
 "Smart Game / NPCs and quests",
 "Only racing",
 "Only shop code",
 "Publishing only",
 ],
 correctAnswer: 0,
 explanation: "Живі світи.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Folder NPC у Workspace...",
 options: [
 "Organizes characters",
 "Replaces server",
 "Is required by Roblox",
 "Blocks scripts",
 ],
 correctAnswer: 0,
 explanation: "Чиста ієрархія.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "ActionText \"Talk\" повідомляє гравцеві...",
 options: [
 "What button does",
 "Server IP",
 "Robux price",
 "Version",
 ],
 correctAnswer: 0,
 explanation: "Мітка UX.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 8.2 додає...",
 options: [
 "Dialogue UI",
 "Only car",
 "Only timer",
 "DataStore only",
 ],
 correctAnswer: 0,
 explanation: "Наступний крок.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 8.1 зберегти назву...",
 options: [
 "Lesson 8.1 - Living NPC",
 "Living Location",
 "Shop Works",
 "Race Launched",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок NPC.",
 },
 ],
 },
}

export const ukLesson82 = {
 lessonId: "lesson-roblox-8-2",
 moduleId: "module-08",
 order: 2,
 title: "8.2 - Система діалогів",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Зберігайте рядки діалогу в таблиці Lua за ключем",
 "Створіть DialogueGui з динаміком, текстом, наступним, закрити",
 "Відкрийте діалог із NPC ProximityPrompt через OpenDialogue RemoteEvent",
 "Запобігання накладання сеансів діалогу на клієнті",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `З вашим NPC можна **поговорити**. Сьогодні вони мають **слова сказати**.

**Хід уроку:**
1. **Теорія (40 хв)** - дані діалогу + UI цикл
2. **Практика (~25 хв)** - розмова на 4+ лініях
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 8.1 - Живий NPC**.`,
 },
 {
 title: "Діалог як дані",
 content: `**ServerScriptService** → ModuleScript\`DialogueData\`:\`\`\`lua
local DialogueData = {
 guide_intro = {
 speaker = "Guide Maya",
 lines = {
 "Ласкаво просимо на хаб, будівничий!",
 "Магазин за мною продає стартове спорядження.",
 "Виконуй квести, щоб заробити більше монет.",
 "Удачі - натисни Next, щоб продовжити.",
 },
 },
}

return DialogueData
\`\`\`**Мережа надсилає ключ** (\`"guide_intro"\`), а не повні текстові масиви - менші та безпечніші.`,
 },
 {
 title: "Макет DialogueGui",
 content: `**StarterGui** →\`DialogueGui\`(ScreenGui)\`\`\`
DialogueGui
└── Panel (Frame, bottom center)
 ├── SpeakerLabel
 ├── LineLabel (large text, wrapped)
 ├── NextButton
 └── CloseButton
\`\`\`**Panel.Visible = false**, доки не відкриється діалогове вікно.

**Доступність:** великий шрифт (18-22), висококонтрастне тло.`,
 },
 {
 title: "Цикл діалогу клієнта",
 content: `\`DialogueClient\`LocalScript:\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local openDialogue = ReplicatedStorage:WaitForChild("OpenDialogue")
local getLines = ReplicatedStorage:WaitForChild("GetDialogue") -- RemoteFunction 8.2

local panel = script.Parent.Panel
local lineLabel = panel.LineLabel
local speakerLabel = panel.SpeakerLabel
local nextBtn = panel.NextButton
local closeBtn = panel.CloseButton

local active = false
local lines = {}
local index = 1

local function showLine()
 lineLabel.Text = lines[index] or ""
end

local function open(key)
 if active then return end
 active = true
 local data = getLines:InvokeServer(key)
 if not data then active = false return end
 speakerLabel.Text = data.speaker
 lines = data.lines
 index = 1
 panel.Visible = true
 showLine()
end

nextBtn.MouseButton1Click:Connect(function()
 if index < #lines then
 index += 1
 showLine()
 else
 panel.Visible = false
 active = false
 end
end)

closeBtn.MouseButton1Click:Connect(function()
 panel.Visible = false
 active = false
end)

openDialogue.OnClientEvent:Connect(function(key)
 open(key)
end)
\`\`\``,
 },
 {
 title: "Серверний міст",
 content: `**ReplicatedStorage:**
-\`OpenDialogue\`RemoteEvent
-\`GetDialogue\`RemoteFunction

**Скрипт NPC** (оновлення 8.1):\`\`\`lua
local openDialogue = game.ReplicatedStorage.OpenDialogue

prompt.Triggered:Connect(function(player)
 openDialogue:FireClient(player, "guide_intro")
end)
\`\`\`**GetDialogue.OnServerInvoke:**\`\`\`lua
local DialogueData = require(game.ServerScriptService.DialogueData)

GetDialogue.OnServerInvoke = function(player, key)
 if type(key) ~= "string" then return nil end
 return DialogueData[key]
end
\`\`\`Сервер володіє текстом діалогу - клієнт не може легко вставити підроблені знання квесту.`,
 },
 {
 title: "Правила UX",
 content: `| Правило | Чому |
|------|-----|
| Блок другий відкритий під час активності | Без панелей, що перекриваються |
| Закрити завжди працює | Втеча гравця |
| Далі в останньому рядку закриває або ховає | Очистити кінець |
| Короткі рядки | Читається на мобільному |

**Запобігання спаму:** час відновлення після підказки, активовано (0,5 с) необов’язково.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] 4+ рядки у guide_intro
- [ ] Далі просувається, закриває виходи
- [ ] Підказка відкриває діалогову панель
- [ ] Показується ім’я динаміка
- [ ] Зберегти:\`Lesson 8.2 - Dialogue System\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Жорстко закодовані рядки лише в LocalScript",
 explanation: "Клієнт може підробляти / дрейфувати.",
 correctApproach: "DialogueData на сервері",
 },
 {
 mistake: "Надсилання повного рядкового масиву у FireClient",
 explanation: "важкий; важче оновити.",
 correctApproach: "Надіслати рядок ключа діалогу",
 },
 {
 mistake: "Немає активного прапора",
 explanation: "Подвійні панелі.",
 correctApproach: "Блокувати під час відкритого діалогу",
 },
 {
 mistake: "DialogueGui завжди видимий",
 explanation: "Блокує ігровий процес.",
 correctApproach: "Приховано, поки не буде відкрито",
 },
 ],
 summary: "Ви створили діалог на основі даних за допомогою DialogueData, циклу інтерфейсу користувача Next/Close і OpenDialogue із ProximityPrompt Guide Maya - NPC тепер говорять у повних розмовах.",
 practiceTask: {
 title: "Система діалогу v1 (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** 4-строкова розмова від NPC.

### Part A - Дані + пульти (10 хв)
1. Модуль DialogueData з guide_intro
2. OpenDialogue + GetDialogue у ReplicatedStorage
3. Серверні обробники

### Part B - Інтерфейс користувача (12 хв)
1. Панель DialogueGui + написи + кнопки
2. Цикл DialogueClient
3. Підказка Wire NPC → FireClient guide_intro

### Part C - Зберегти (3 хв)
1. Грайте по всіх лініях
2. **Зберегти в Roblox** →\`Lesson 8.2 - Dialogue System\` 3. **Практика завершена**`,
 hints: [
 "pcall InvokeServer, як каталог Module 7",
 "UIGradient додаткове полірування панелі",
 "Тест Закрити в середині розмови",
 ],
 optionalChallenge: "Так/Ні вибір гілок до різних рядкових таблиць.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Репліки діалогу зберігаються як...",
 options: [
 "Lua table by key",
 "Terrain",
 "Random strings in UI",
 "Welds",
 ],
 correctAnswer: 0,
 explanation: "Керований даними.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "OpenDialogue надсилає...",
 options: [
 "Dialogue key to client",
 "Full game save",
 "Terrain id",
 "Tool instance",
 ],
 correctAnswer: 0,
 explanation: "Пошук ключів.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Далі кнопка...",
 options: [
 "Advances line index",
 "Deletes NPC",
 "Publishes",
 "Spawns car",
 ],
 correctAnswer: 0,
 explanation: "потік інтерфейсу користувача.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "DialogueGui - це...",
 options: [
 "ScreenGui on client",
 "Server-only",
 "Terrain layer",
 "Sound",
 ],
 correctAnswer: 0,
 explanation: "Інтерфейс клієнта.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "GetDialogue має працювати на...",
 options: [
 "Server OnServerInvoke",
 "Client only",
 "Lighting",
 "Workspace",
 ],
 correctAnswer: 0,
 explanation: "Сервер повертає рядки.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "активний прапор запобігає...",
 options: [
 "Overlapping dialogues",
 "Walking",
 "Jump",
 "Shop",
 ],
 correctAnswer: 0,
 explanation: "Одна розмова.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 8.2 базується на...",
 options: [
 "Lesson 8.1 NPC + prompt",
 "Lesson 6 only",
 "Empty",
 "Publish only",
 ],
 correctAnswer: 0,
 explanation: "Тригер NPC.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "SpeakerLabel показує...",
 options: [
 "NPC name",
 "Player password",
 "Server IP",
 "Robux",
 ],
 correctAnswer: 0,
 explanation: "Ясність.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 8.3 додає...",
 options: [
 "Walking patrol NPC",
 "Only shop",
 "Only race",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Перейти до патруля.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 8.2 зберегти назву...",
 options: [
 "Lesson 8.2 - Dialogue System",
 "Living NPC",
 "Living Location",
 "Shop UI",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок діалогу.",
 },
 ],
 },
}

export const ukLesson83 = {
 lessonId: "lesson-roblox-8-3",
 moduleId: "module-08",
 order: 3,
 title: "8.3 - NPC що ходить",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть Parts маршрутних точок від WP_1 до WP_5 для маршруту патрулювання",
 "Патруль із Humanoid:MoveTo і MoveToFinished:Wait",
 "Кольцевий маршрут з паузами в кожній точці",
 "Налагодження застряглих NPC з інтервалом шляху та перешкодами",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Статичні напрямні в порядку. **Ходячі NPC** змушують центри відчувати себе **живими**.

**Хід уроку:**
1. **Теорія (40 хв)** - шляхові точки + цикл MoveTo
2. **Практика (~25 хв)** - 5-точкове патрулювання
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 8.2 - Система діалогів** - використовуйте другого NPC або ту саму Maya без прив’язки.`,
 },
 {
 title: "Проект маршруту маршрутної точки",
 content: `Folder\`Workspace/PatrolRoutes/Route_ShopLoop\`:

| Part | Ім'я | Примітки |
|------|------|-------|
| Neon куля |\`WP_1\`| Біля магазину |
| |\`WP_2\`| Куточок стежки |
| |\`WP_3\`| Середня площа |
| |\`WP_4\`| Біля ікри |
| |\`WP_5\`| Назад до магазину |

**Properties:** Anchored true, CanCollide false, прозорість 0,5 (налагодження), потім 1 невидимий.

**Відстань:** 8-15 стадів одна від одної, без різких 90° через стіни.`,
 },
 {
 title: "Збирайте шляхові точки по порядку",
 content: `\`\`\`lua
local routeFolder = workspace.PatrolRoutes.Route_ShopLoop
local waypoints = {}

for _, wp in ipairs(routeFolder:GetChildren()) do
 if wp:IsA("BasePart") and wp.Name:match("^WP_%d+$") then
 table.insert(waypoints, wp)
 end
end

table.sort(waypoints, function(a, b)
 local na = tonumber(a.Name:match("%d+"))
 local nb = tonumber(b.Name:match("%d+"))
 return na < nb
end)
\`\`\`Сортування за номерами підтримує правильний порядок маршруту.`,
 },
 {
 title: "Петля патрулювання MoveTo",
 content: `**NPC_Patrol_Guard** - серверний скрипт:\`\`\`lua
local npc = script.Parent
local humanoid = npc:WaitForChild("Humanoid")
humanoid.WalkSpeed = 10

local PAUSE = 0.7

local function patrol(waypoints)
 while true do
 for _, wp in ipairs(waypoints) do
 humanoid:MoveTo(wp.Position)
 humanoid.MoveToFinished:Wait()
 task.wait(PAUSE)
 end
 end
end

task.spawn(patrol, waypoints)
\`\`\`**NPC не має бути закріпленим** - Humanoidу потрібно рухатися.

Вимкніть елементи керування гравця на NPC - це не character гравця.`,
 },
 {
 title: "Застрягла налагодження NPC",
 content: `Якщо NPC зупиняється назавжди:

| Виправити | Try |
|-----|-----|
| Застряг на стіні | Move waypoint away from geometry |
| Падає через карту | Check HipHeight, floor collision |
| Ніколи не досягає точки | Збільште час очікування - MoveToFinished усе ще запускається |
| Обертається на місці | Розширити кут повороту - додати середню точку |

**Налагодження:** залишайте Parts WP видимими (червоний неон), доки маршрут не запрацює.

**Друкувати** назву маршрутної точки після досягнення, видаляти відбитки, коли закінчите.`,
 },
 {
 title: "Патруль + діалог разом",
 content: `**Два NPC** цілком допустимо для уроку:
- **Guide Maya** - статичний + діалог (8.1-8.2)
- **Patrol Guard** - ходить петля (8.3)

Або призупинити патрулювання під час розмови гравця (додатково):\`\`\`lua
local patrolling = true
-- on prompt: patrolling = false, humanoid:MoveTo(npc.PrimaryPart.Position)
\`\`\`Урок 8.3 присвячений **безперервному патрулюванню**.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] 5 шляхових точок WP_1..WP_5 відсортовано
- [ ] NPC повторює повну петлю
- [ ] Пауза ~0,7 с у кожній точці
- [ ] Немає застряг на 3+ послідовних колах
- [ ] Зберегти:\`Lesson 8.3 - NPC Patrol\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "NPC Anchored true",
 explanation: "Не може ходити.",
 correctApproach: "Відкріпіть Model NPC для патрулювання",
 },
 {
 mistake: "Шляхові точки всередині стін",
 explanation: "MoveTo застряг.",
 correctApproach: "Чистий відстань між шляхами",
 },
 {
 mistake: "Не відсортовано WP_10 перед WP_2",
 explanation: "Дивний маршрут.",
 correctApproach: "Числове сортування",
 },
 {
 mistake: "Скрипт патрулювання на LocalScript",
 explanation: "AI повинен бути сервером для всіх гравців.",
 correctApproach: "Серверний скрипт на NPC",
 },
 ],
 summary: "Ви побудували петлю патрулювання з п’ятьма маршрутними точками за допомогою Humanoid MoveTo, пауз і відсортованих маршрутних точок - тепер у вашому центрі є NPC, який ходить, а не просто стоїть на спауні.",
 practiceTask: {
 title: "Маршрут патрулювання NPC (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Нескінченне 5-точкове патрулювання.

### Part A - Пункти (8 хв)
1. Folder PatrolRoutes/Route_ShopLoop
2. WP_1 .. WP_5 - видимий для налаштування

### Part B - Патруль NPC (15 хв)
1. NPC_Patrol_Guard - Humanoid WalkSpeed 10
2. Script патрулювання сервера - цикл sort + while true
3. Play - дивитися 3 повні петлі

### Part C - відшліфувати та зберегти (2 хв)
1. Приховати прозорість точки маршруту
2. **Зберегти в Roblox** →\`Lesson 8.3 - NPC Patrol\` 3. **Практика завершена**`,
 hints: [
 "MoveToFinished:Wait() після кожного MoveTo",
 "task.spawn, щоб Script не блокував інші системи",
 "Додатково: друк випадкових рядків на кожній WP",
 ],
 optionalChallenge: "Відтворювати короткий звук при досягненні кожної маршрутної точки.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "NPC ходить за допомогою...",
 options: [
 "Humanoid:MoveTo",
 "Terrain paint",
 "ClickDetector only",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Крок пошуку шляху.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "MoveToFinished:Wait()...",
 options: [
 "Waits until step done",
 "Deletes NPC",
 "Opens shop",
 "Saves DataStore",
 ],
 correctAnswer: 0,
 explanation: "Синхронізація послідовності.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Пункти патрулювання під назвою...",
 options: [
 "WP_1, WP_2, ...",
 "Random",
 "Only Part",
 "SpawnLocation",
 ],
 correctAnswer: 0,
 explanation: "Замовлений маршрут.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Patrol NPC має бути...",
 options: [
 "Unanchored",
 "Anchored true",
 "Invisible only",
 "No Humanoid",
 ],
 correctAnswer: 0,
 explanation: "Для руху потрібна фізика.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "while true do loop...",
 options: [
 "Repeats patrol forever",
 "Runs once",
 "Stops game",
 "Publishes",
 ],
 correctAnswer: 0,
 explanation: "Безперервне патрулювання.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Скрипт Patrol працює на...",
 options: [
 "Server",
 "Client LocalScript only",
 "StarterGui",
 "Lighting",
 ],
 correctAnswer: 0,
 explanation: "Усі гравці бачать одного NPC.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Виправлення застряглих NPC включає...",
 options: [
 "Move waypoints away from walls",
 "Delete Humanoid",
 "Remove legs",
 "Hide UI",
 ],
 correctAnswer: 0,
 explanation: "Надійність шляху.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Сортування маршрутних точок за номером...",
 options: [
 "Keeps route order",
 "Removes NPC",
 "Adds coins",
 "Opens dialogue",
 ],
 correctAnswer: 0,
 explanation: "WP_2 перед WP_10.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 8.4 додає...",
 options: [
 "Quest system",
 "Only car",
 "Only timer",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Далі таблиці квестів.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 8.3 зберегти назву...",
 options: [
 "Lesson 8.3 - NPC Patrol",
 "Dialogue System",
 "Living NPC",
 "Shop Works",
 ],
 correctAnswer: 0,
 explanation: "Збережи патрульний урок.",
 },
 ],
 },
}

export const ukLesson84 = {
 lessonId: "lesson-roblox-8-4",
 moduleId: "module-08",
 order: 4,
 title: "8.4 - Квест-система",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Визначте квести в таблиці QuestConfig із метою та винагородою",
 "Відстежуйте стан квестів кожного гравця на сервері",
 "Прийміть квест із діалогу та збільште прогрес у збиранні кристалів",
 "Синхронізувати статус квесту з QuestUI через QuestUpdate RemoteEvent",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `NPC дають **завдання**. Квести перетворюють завдання на **прогрес + нагороди**.

**Хід уроку:**
1. **Теорія (40 хв)** - таблиці квестів + стан кожного гравця
2. **Практика (~25 хв)** - зібрати 5 кристалів
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте центр **Урок 8.2 - Система діалогу**.`,
 },
 {
 title: "Основа системи квестів",
 content: `**ServerScriptService** → ModuleScript\`QuestConfig\`:\`\`\`lua
local QuestConfig = {
 collect_crystals_01 = {
 title = "Crystal Run",
 goal = 5,
 rewardCoins = 50,
 description = "Collect 5 crystals in the plaza.",
 },
}

return QuestConfig
\`\`\`**Один стіл** = легке балансування. Зміна\`goal\`або\`rewardCoins\`в одному місці.`,
 },
 {
 title: "Прогрес кожного гравця",
 content: `Script **QuestService**:\`\`\`lua
local playerQuestState = {} -- [player] = { [questId] = state }

local function getState(player, questId)
 playerQuestState[player] = playerQuestState[player] or {}
 if not playerQuestState[player][questId] then
 playerQuestState[player][questId] = {
 started = false,
 progress = 0,
 completed = false,
 }
 end
 return playerQuestState[player][questId]
end
\`\`\`**Ніколи** один глобальний\`progress = 3\`для всього сервера - гравець Б вкраде квест гравця А.`,
 },
 {
 title: "Прийняти квест",
 content: `Останній рядок діалогу Guide Maya → кнопка **Прийняти** АБО автоматичний запуск на клавіші діалогу\`guide_quest\`:\`\`\`lua
local function startQuest(player, questId)
 local cfg = QuestConfig[questId]
 if not cfg then return end
 local state = getState(player, questId)
 if state.completed then return end
 state.started = true
 QuestUpdate:FireClient(player, questId, state.progress, cfg.goal, false)
end
\`\`\`**QuestUpdate** RemoteEvent → оновлення клієнта\`QuestUI\`етикетка:\`Crystal Run: 0 / 5\``,
 },
 {
 title: "Збільшити прогрес",
 content: `Кришталеві Parts\`Crystal\`тег або префікс імені - server Script **Touched**:\`\`\`lua
crystal.Touched:Connect(function(hit)
 local character = hit.Parent
 local player = game.Players:GetPlayerFromCharacter(character)
 if not player then return end

 local state = getState(player, "collect_crystals_01")
 if not state.started or state.completed then return end

 state.progress += 1
 local cfg = QuestConfig.collect_crystals_01

 if state.progress >= cfg.goal then
 completeQuest(player, "collect_crystals_01")
 else
 QuestUpdate:FireClient(player, "collect_crystals_01", state.progress, cfg.goal, false)
 end

 crystal:Destroy() -- or debounce per crystal
end)
\`\`\``,
 },
 {
 title: "Завершіть і винагородіть один раз",
 content: `\`\`\`lua
local function completeQuest(player, questId)
 local state = getState(player, questId)
 if state.completed then return end -- no double reward

 local cfg = QuestConfig[questId]
 state.completed = true
 state.progress = cfg.goal

 local coins = player.leaderstats.Coins
 if coins then
 coins.Value += cfg.rewardCoins
 end

 QuestUpdate:FireClient(player, questId, state.progress, cfg.goal, true)
 print(player.Name, "completed", questId)
end
\`\`\`**completed** boolean blocks exploit re-claim.`,
 },
 {
 title: "QuestUI на клієнті",
 content: `**StarterGui** →\`QuestUI\`→\`QuestLabel\`

\`\`\`lua
QuestUpdate.OnClientEvent:Connect(function(questId, progress, goal, done)
 if done then
 QuestLabel.Text = "✓ Quest complete! +" .. QuestConfigDisplay[questId]
 else
 QuestLabel.Text = "Crystal Run: " .. progress .. " / " .. goal
 end
end)
\`\`\`Відображення заголовка з маленької клієнтської таблиці пошуку АБО другого аргументу з повідомлення сервера.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Прийняти квест → UI показує 0/5
- [ ] Кожен кристал збільшується (макс. 5)
- [ ] Complete дає монети лише один раз
- [ ] Другий гравець має незалежний прогрес
- [ ] Зберегти:\`Lesson 8.4 - Quest System\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Глобальна змінна прогресу квесту",
 explanation: "Усі гравці діляться прогресом.",
 correctApproach: "playerQuestState[гравець]",
 },
 {
 mistake: "Нагорода без виконаної охорони",
 explanation: "Експлойт подвійних монет.",
 correctApproach: "якщо state.completed тоді повертається",
 },
 {
 mistake: "Прогрес лише на клієнті",
 explanation: "Фальшиве завершення.",
 correctApproach: "Server Touched + state",
 },
 {
 mistake: "Кристали відроджуються миттєво",
 explanation: "Нескінченний прогрес.",
 correctApproach: "Знищення або усунення відскоку за кристал",
 },
 ],
 summary: "Ви створили QuestConfig, стан квесту для кожного гравця, прогрес у зборі кристалів, одноразові винагороди монетами та оновлення QuestUI - тепер гравці мають відстежувану мету у вашому центрі.",
 practiceTask: {
 title: "Створення квестових столів (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Зібрати 5 кристалів у квесті від кінця до кінця.

### Part A - Конфігурація (8 хв)
1. QuestConfig з collect_crystals_01
2. QuestService + playerQuestState
3. QuestUpdate RemoteEvent

### Part B - Геймплей (12 хв)
1. 5 кристалів на площі
2. Розпочніть квест із діалогового вікна «Гід» або опції підказки
3. Торкніться кроків → завершити на 5 → +50 монет

### Part C - Зберегти (5 хв)
1. QuestLabel оновлюється в реальному часі
2. **Зберегти в Roblox** →\`Lesson 8.4 - Quest System\` 3. **Практика завершена**`,
 hints: [
 "Скрізь використовуйте рядки ідентифікатора квесту - collect_crystals_01",
 "Тест 2 гравців - окремий прогрес",
 "Модуль 7 Монети leaderstats для винагороди",
 ],
 optionalChallenge: "Другий квест відкривається лише після виконання першого.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Перебіг квесту зберігається за...",
 options: [
 "Player on server",
 "Whole server globally",
 "Client only",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Багатокористувацька безпека.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "завершений прапор запобігає...",
 options: [
 "Double reward",
 "Walking",
 "UI",
 "Sound",
 ],
 correctAnswer: 0,
 explanation: "Одноразова претензія.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "QuestConfig містить...",
 options: [
 "goal and rewardCoins",
 "Player passwords",
 "Terrain",
 "Camera",
 ],
 correctAnswer: 0,
 explanation: "Центральний балансовий стіл.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Crystal Touch має працювати на...",
 options: [
 "Server",
 "LocalScript only",
 "StarterGui",
 "Lighting",
 ],
 correctAnswer: 0,
 explanation: "Надійний прогрес.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "QuestUpdate надсилає...",
 options: [
 "progress and goal to UI",
 "Free Robux",
 "Terrain",
 "Tool only",
 ],
 correctAnswer: 0,
 explanation: "Відображення клієнта.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Порядок виконання квесту...",
 options: [
 "Accept → progress → complete → reward",
 "Reward first",
 "No accept",
 "Delete player",
 ],
 correctAnswer: 0,
 explanation: "Стандартна петля.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "ключі ідентифікатора квесту, наприклад collect_crystals_01...",
 options: [
 "Stay consistent in code",
 "Change every line",
 "Are optional",
 "Replace Humanoid",
 ],
 correctAnswer: 0,
 explanation: "Дисципліна іменування.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 8.4 базується на...",
 options: [
 "8.1-8.3 NPC hub",
 "Only racing",
 "Only shop UI",
 "Empty",
 ],
 correctAnswer: 0,
 explanation: "Концентраційні системи.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 8.5 додає...",
 options: [
 "Enemy attack",
 "Only dialogue",
 "Only patrol",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Бойовий ворог.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 8.4 зберегти назву...",
 options: [
 "Lesson 8.4 - Quest System",
 "NPC Patrol",
 "Living Location",
 "Shop Works",
 ],
 correctAnswer: 0,
 explanation: "Зберегти квестовий урок.",
 },
 ],
 },
}

export const ukLesson85 = {
 lessonId: "lesson-roblox-8-5",
 moduleId: "module-08",
 order: 5,
 title: "8.5 - Ворог що атакує",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть ворога за допомогою станів простою, погоні, атаки та відновлення",
 "Переслідуйте найближчого гравця в діапазоні на сервері",
 "Застосуйте TakeDamage із кулдауном атаки та телеграфом",
 "Позначайте ворогів за допомогою CollectionService для чистих Scripts",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Місце проживання потребує **небезпеки**. Сьогодні один **ворог** неабияк ганяється і нападає.

**Хід уроку:**
1. **Теорія (40 хв)** - стани + пошкодження сервера
2. **Практика (~25 хв)** - прототип атаки
3. **Вікторина (10 хв)** - проходження **70%**

Повторне використання знань модуля 5 **Humanoid** / **TakeDamage**.`,
 },
 {
 title: "Стани поведінки ворога",
 content: `| Держава | Поведінка |
|-------|----------|
| **неактивний** | Стоять або патрулюють невелику територію |
| **погоня** | Перейти до найближчого гравця в діапазоні агро |
| **атака** | Телеграф → пошкодження |
| **відновлення** | Зачекайте до наступної атаки |\`NPC_Enemy_Slime\`в\`Workspace/Enemies/\`Тег **CollectionService**\`Enemy\`- один скрипт обробляє всі model з тегами.`,
 },
 {
 title: "Агро і погоня",
 content: `\`\`\`lua
local AGGRO_RANGE = 40
local ATTACK_RANGE = 6

local function getNearestPlayer(position)
 local nearest, dist = nil, AGGRO_RANGE
 for _, player in ipairs(game.Players:GetPlayers()) do
 local char = player.Character
 local root = char and char:FindFirstChild("HumanoidRootPart")
 if root then
 local d = (root.Position - position).Magnitude
 if d < dist then
 nearest, dist = player, d
 end
 end
 end
 return nearest
end
\`\`\`**Чейз:**\`humanoid:MoveTo(targetRoot.Position)\`кожні 0,5 с під час агро.`,
 },
 {
 title: "Атака з перезарядкою",
 content: `\`\`\`lua
local DAMAGE = 12
local COOLDOWN = 1.2
local onCooldown = false

local function tryAttack(enemy, targetChar)
 local root = targetChar:FindFirstChild("HumanoidRootPart")
 local hum = targetChar:FindFirstChildOfClass("Humanoid")
 if not root or not hum or onCooldown then return end

 if (enemy.PrimaryPart.Position - root.Position).Magnitude > ATTACK_RANGE then
 return
 end

 onCooldown = true
 -- Telegraph: red highlight or sound here
 task.wait(0.4) -- wind-up
 hum:TakeDamage(DAMAGE)
 task.delay(COOLDOWN, function()
 onCooldown = false
 end)
end
\`\`\`**Пошкодження на сервері** - те саме правило, що й на арені Модуля 5.`,
 },
 {
 title: "Телеграф і справедливість",
 content: `До пошкодження:
- **Play** короткий звук
- **Спалах** Колір Parts або вибух Parts
- **0,3-0,5 с** затримка намотування

Гравці вчаться **ухилятися** під час заводу - відчувається, що залежить від навичок.

**Швидкість ходьби** ворог ~14, гравець за умовчанням 16 - гравець може втекти.`,
 },
 {
 title: "Контрольний список налаштування противника",
 content: `| Шматок | Налаштування |
|-------|---------|
| Humanoid | MaxHealth 80 |
| Швидкість ходьби | 12-14 |
| Первинна Part | HumanoidRootPart |
| Тег | Ворог (CollectionService) |

**Зона появи** біля квестових кристалів - хід виконання квесту: збір → боротьба → повернення.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Ворожі погоні в межах AGGRO_RANGE
- [ ] Пошкодження лише в межах ATTACK_RANGE + час відновлення
- [ ] Телеграф видно перед ударом
- [ ] Тест для 2 гравців - правильні цілі найближчі
- [ ] Зберегти:\`Lesson 8.5 - Enemy Attack\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Пошкодження в LocalScript",
 explanation: "Можна використовувати.",
 correctApproach: "Сервер TakeDamage",
 },
 {
 mistake: "Немає перезарядки",
 explanation: "Миттєве танення.",
 correctApproach: "1,2 с+ між ударами",
 },
 {
 mistake: "Без телеграфу",
 explanation: "Здається несправедливим.",
 correctApproach: "Затримка згортання + VFX",
 },
 {
 mistake: "Enemy was Anchored",
 explanation: "Не можна переслідувати.",
 correctApproach: "Знято з якоря Humanoid",
 },
 ],
 summary: "Ви створили ворога за допомогою погоні, телеграфних атак на стороні сервера, шкоди від часу перезарядки та тегів CollectionService - тепер у центрі є бій, який відповідає циклу квесту.",
 practiceTask: {
 title: "Прототип ворожої атаки (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Один чесно атакуючий ворог.

### Part A - Вороже обладнання (8 хв)
1. NPC_Enemy_Slime + Humanoid + тег Enemy
2. Розмістіть біля квестової зони

### Part B - Script AI (15 хв)
1. Цикл стану: знайти найближче → погоня → атака
2. TakeDamage 12, час відновлення 1,2 с, телеграф 0,4 с

### Part C - Перевірте та збережіть (2 хв)
1. Агротест для двох гравців
2. **Зберегти в Roblox** →\`Lesson 8.5 - Enemy Attack\` 3. **Практика завершена**`,
 hints: [
 "Відродження модуля 5 все ще працює, якщо гравець помирає",
 "CollectionService:GetTagged(\"Enemy\") масштабується до багатьох ворогів",
 "Стан друку змінюється під час налагодження",
 ],
 optionalChallenge: "Стрибок під час телеграфу → половина шкоди.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Пошкодження противника використовує...",
 options: [
 "Humanoid:TakeDamage on server",
 "Client print",
 "Terrain",
 "Coins",
 ],
 correctAnswer: 0,
 explanation: "Повноваження сервера.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Перезарядка запобігає...",
 options: [
 "Damage every frame",
 "Walking",
 "Quest",
 "Dialogue",
 ],
 correctAnswer: 0,
 explanation: "Чесна швидкість атаки.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Telegraph дає гравцеві час...",
 options: [
 "React and dodge",
 "Fly",
 "Shop",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Справедливість.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Чейз використовує...",
 options: [
 "Humanoid:MoveTo",
 "Terrain paint",
 "RemoteFunction only",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Рух NPC.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Тег CollectionService Ворог...",
 options: [
 "Groups enemies for scripts",
 "Deletes players",
 "Saves data",
 "Opens UI",
 ],
 correctAnswer: 0,
 explanation: "Чиста архітектура.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "ATTACK_RANGE 6 означає...",
 options: [
 "Damage only when close",
 "Damage from map-wide",
 "No damage ever",
 "Heal player",
 ],
 correctAnswer: 0,
 explanation: "Дальність ближнього бою.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Штати включають...",
 options: [
 "idle chase attack cooldown",
 "Only idle",
 "Only shop",
 "Only race",
 ],
 correctAnswer: 0,
 explanation: "Машина поведінки.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 8.5 використовує навички з...",
 options: [
 "Module 5 Humanoid damage",
 "Module 1 terrain only",
 "Module 12 publish",
 "None",
 ],
 correctAnswer: 0,
 explanation: "Бойовий фундамент.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 8.6 - це...",
 options: [
 "Living Location checkpoint",
 "Shop only",
 "Race only",
 "Empty",
 ],
 correctAnswer: 0,
 explanation: "Фінал модуля.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 8.5 зберегти назву...",
 options: [
 "Lesson 8.5 - Enemy Attack",
 "Quest System",
 "Dialogue System",
 "Arena Ready",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок ворога.",
 },
 ],
 },
}

export const ukLesson86 = {
 lessonId: "lesson-roblox-8-6",
 moduleId: "module-08",
 order: 6,
 title: "8.6 - Checkpoint: Жива локація",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Інтегруйте NPC-гіда, патруль, діалог, квест і ворога",
 "Пройдіть повну перевірку якості гравця від появи до нагороди",
 "Зберігайте системи в окремих модулях для ремонтопридатності",
 "Збережіть модуль 8 - Living Location у портфоліо",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Житлова локація** = портфоліо модуля 8 - міні-зона, яка відчуває себе **живою**.

**Обов’язково:**
- Керівництво NPC + діалог (8.1-8.2)
- Патруль NPC (8.3)
- Квест збирати кристали (8.4)
- Атакуючий ворог (8.5)
- Купуйте з модуля 7 за бажанням поблизу

**Зберегти:**\`Module 8 - Living Location\``,
 },
 {
 title: "План житлового приміщення",
 content: `\`\`\`
Workspace
├── NPCs/
│ ├── NPC_Guide_Maya (dialogue + quest giver)
│ └── NPC_Patrol_Guard (patrol loop)
├── Enemies/
│ └── NPC_Enemy_Slime
├── QuestProps/
│ └── Crystals x5
├── PatrolRoutes/
│ └── Route_ShopLoop
└── ShopArea (from Module 7)

ServerScriptService
├── DialogueData
├── QuestConfig + QuestService
├── ShopConfig (optional)
└── EnemyAI / NPC scripts
\`\`\``,
 },
 {
 title: "Досвід потокового тесту",
 content: `**Золотий шлях** (один гравець, ~3 хв):

| Крок | Дія | Пас? |
|------|--------|-------|
| 1 | Відродження в хабі | |
| 2 | Поговоріть з Гідом Майєю - діалог | |
| 3 | Прийняти/почати кристалічний квест | |
| 4 | Зберіть 5 кристалів - оновлення інтерфейсу | |
| 5 | Боріться зі слизовим ворогом - виживіть | |
| 6 | Виконайте квест - винагорода монетами | |
| 7 | Дивіться патрульний NPC, що йде | |

Якщо ви заплуталися на будь-якому кроці → виправте покажчики (стрілки, діалогові підказки).`,
 },
 {
 title: "Багатокористувацька перевірка якості",
 content: `**2 гравці:**
- Самостійний прогрес квесту
- Ворожі цілі найближчі - немає спільних помилок HP
- Діалог не блокує інтерфейс іншого гравця
- Патруль видно обом

**Output:** нуль червоних помилок під час золотого шляху × 2.`,
 },
 {
 title: "Смужка якості checkpoint",
 content: `| Бар | Стандарт |
|-----|----------|
| Scripts | Розділені за системою (Квест, Діалог, Ворог) |
| Текст інтерфейсу користувача | Читається, без перекриття |
| Квест | Прогрес точний, винагорода один раз |
| Бойовий | Телеграф + перезарядка |
| Полірування | Без налагодження друкує спам |

**Надійність > додаткові функції** для checkpoint.`,
 },
 {
 title: "60-секундний демонстраційний Script",
 content: `1. Spawn - пан хаб (патруль + гід)
2. Бесіда - 2 діалогічні репліки
3. Квест з'являється 0/5
4. Зберіть 2 кристали - лічильник оновлень
5. Швидка боротьба зі слизом
6. Завершити квест - спливаюче вікно монети / мітка
7. Відкрити магазин необов'язково

Запис для перегляду портфоліо або вчителя.`,
 },
 {
 title: "Попередній перегляд модуля 9",
 content: `**Модуль 9** часто охоплює **команди, раунди, перебіг матчу** - ваш живий центр може стати лобі між раундами.

**Перед тренуванням:**
- [ ] Золотий шлях минає
- [ ] пропуски для 2 гравців
- [ ] **Зберегти в Roblox** →\`Module 8 - Living Location\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Весь код в одному гігантському Scripts",
 explanation: "Необслуговуваний.",
 correctApproach: "QuestService, DialogueData, EnemyAI окремо",
 },
 {
 mistake: "Ідентифікатори квесту та діалогу не збігаються",
 explanation: "Квест ніколи не починається.",
 correctApproach: "Модуль спільних констант",
 },
 {
 mistake: "Пропуск випробування золотого шляху",
 explanation: "Порушений потік на демонстрації.",
 correctApproach: "Повний цикл перед збереженням",
 },
 {
 mistake: "Ворог блокує квестові кристали",
 explanation: "розчарування.",
 correctApproach: "Космічні кристали подалі від табору появи",
 },
 ],
 summary: "Ви інтегрували NPC, діалоги, патрулювання, квести та бойові дії в Living Location, пройшли перевірку якості для соло та кількох гравців і зберегли готовий до демо-версії хаб - Модуль 8 завершено.",
 practiceTask: {
 title: "Здати Living Location (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** завершити контрольну точку Living Location.

### Part A - Інтеграція (15 хв)
1. Об’єднати 8.1-8.5 в одне місце
2. Структура папок + окремі серверні модулі
3. Знаки/стрілки, якщо потік нечіткий

### Part B - Золотий шлях + 2P (20 хв)
1. Запустіть таблицю потоків досвіду - помилка виправлення
2. Тест незалежного квесту для двох гравців
3. Очистіть помилки виведення

### Part C - Збереження демо (5 хв)
1. Відрепетируйте демо 60-х
2. **Зберегти в Roblox** →\`Module 8 - Living Location\` 3. **Практика завершена**`,
 hints: [
 "Виправляйте одну систему за раз",
 "Наставник діалогу повинен згадувати кристали і небезпеку",
 "Patrol NPC це атмосфера - квест це мета",
 ],
 optionalChallenge: "Після завершення квесту мерехтять вогні або банер.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Місце проживання включає...",
 options: [
 "NPC + dialogue + quest + enemy",
 "Only terrain",
 "Only shop",
 "No scripts",
 ],
 correctAnswer: 0,
 explanation: "Повний модуль 8.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Золотий шлях закінчується...",
 options: [
 "Quest reward claimed",
 "Publish only",
 "Delete NPCs",
 "Empty baseplate",
 ],
 correctAnswer: 0,
 explanation: "Повний цикл.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Перевірки квестів для двох гравців...",
 options: [
 "Independent progress",
 "Shared one quest",
 "No server",
 "UI only",
 ],
 correctAnswer: 0,
 explanation: "Стан кожного гравця.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Окремі Scripts допомагають...",
 options: [
 "Maintainability",
 "Lag only",
 "Remove UI",
 "Ban players",
 ],
 correctAnswer: 0,
 explanation: "Чиста архітектура.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Patrol NPC додає...",
 options: [
 "Alive atmosphere",
 "Shop prices",
 "DataStore",
 "Publishing",
 ],
 correctAnswer: 0,
 explanation: "Відчуття світу.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Модуль 8 зберегти назву...",
 options: [
 "Module 8 - Living Location",
 "Shop Works",
 "Race Launched",
 "Lesson 8.1",
 ],
 correctAnswer: 0,
 explanation: "checkpoint.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Контрольна точка має пріоритет...",
 options: [
 "Clear flow and reliability",
 "Most enemies possible",
 "No tests",
 "Client quests",
 ],
 correctAnswer: 0,
 explanation: "Якісний бар.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 8.6 завершується...",
 options: [
 "Module 8 Smart Game",
 "Module 12",
 "Module 1",
 "Coins only",
 ],
 correctAnswer: 0,
 explanation: "Кінцевий модуль 8.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Довідник повинен згадати...",
 options: [
 "Quest objective in dialogue",
 "Server IP",
 "Robux",
 "Version only",
 ],
 correctAnswer: 0,
 explanation: "UX покажчики.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Ворог поблизу квесту має бути...",
 options: [
 "Fair spacing - not blocking all crystals",
 "On every crystal",
 "Removed",
 "Invisible",
 ],
 correctAnswer: 0,
 explanation: "Весела ходьба.",
 },
 ],
 },
}
