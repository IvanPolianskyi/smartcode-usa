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
2. Insert Model → перейменувати\`NPC_Guide_Maya\`**Варіант B — Duplicate стартового character:**
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
- [ ] Тригер виводить ім'я гравця у вихідних даних
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
2. Server Script виводить привітання на Triggered
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
 "Взаємодіяти поруч",
 "Літати",
 "Редагувати Terrain",
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
 "Лише клієнт",
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
 "Лише Part",
 "Лише Sky",
 "Лише Sound",
 ],
 correctAnswer: 0,
 explanation: "Налаштування Character.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "HumanoidRootPart містить...",
 options: [
 "Якір ProximityPrompt",
 "Лише монети",
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
 "Дизайн і код залишаються зосередженими",
 "Лаг",
 "Прибрати UI",
 "Видалити магазин",
 ],
 correctAnswer: 0,
 explanation: "Дизайн гри.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Модуль 8 фокусується на...",
 options: [
 "Smart Game / NPCs і quests",
 "Лише гонки",
 "Лише shop code",
 "Лише publishing",
 ],
 correctAnswer: 0,
 explanation: "Живі світи.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Folder NPC у Workspace...",
 options: [
 "Організує characters",
 "Замінює сервер",
 "Потрібно Roblox",
 "Блокує Scripts",
 ],
 correctAnswer: 0,
 explanation: "Чиста ієрархія.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "ActionText \"Talk\" повідомляє гравцеві...",
 options: [
 "Що робить кнопка",
 "IP сервера",
 "Ціна в Robux",
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
 "Лише автомобіль",
 "Лише таймер",
 "Лише DataStore",
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
 "Lua-таблиця за ключем",
 "Terrain",
 "Випадкові рядки в UI",
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
 "Ключ діалогу клієнту",
 "Повне збереження гри",
 "Terrain id",
 "Екземпляр Tool",
 ],
 correctAnswer: 0,
 explanation: "Пошук ключів.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Далі кнопка...",
 options: [
 "Переходить до наступного рядка",
 "Видаляє NPC",
 "Публікує",
 "Spawnить автомобіль",
 ],
 correctAnswer: 0,
 explanation: "потік інтерфейсу користувача.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "DialogueGui - це...",
 options: [
 "ScreenGui на клієнті",
 "Лише сервер",
 "Шар Terrain",
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
 "Лише клієнт",
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
 "Накладені діалоги",
 "Ходьба",
 "Стрибок",
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
 "Лише Lesson 6",
 "Порожньо",
 "Лише publish",
 ],
 correctAnswer: 0,
 explanation: "Тригер NPC.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "SpeakerLabel показує...",
 options: [
 "Ім’я NPC",
 "Пароль гравця",
 "IP сервера",
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
 "NPC patrol, що ходить",
 "Лише магазин",
 "Лише гонки",
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
- **Patrol Guard** - цикл ходьби (8.3)

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
 "Додатково: вивід випадкових рядків (print) на кожній WP",
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
 "Фарбування Terrain",
 "Лише ClickDetector",
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
 "Чекає завершення кроку",
 "Видаляє NPC",
 "Відкриває магазин",
 "Зберігає DataStore",
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
 "Випадково",
 "Лише Part",
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
 "Лише невидимий",
 "Без Humanoid",
 ],
 correctAnswer: 0,
 explanation: "Для руху потрібна фізика.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "while true do loop...",
 options: [
 "Повторює patrol безкінечно",
 "Виконується один раз",
 "Зупиняє гру",
 "Публікує",
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
 "Лише Client LocalScript",
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
 "Відсунути waypoints від стін",
 "Видалити Humanoid",
 "Прибрати ноги",
 "Сховати UI",
 ],
 correctAnswer: 0,
 explanation: "Надійність шляху.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Сортування маршрутних точок за номером...",
 options: [
 "Зберігає порядок маршруту",
 "Прибирає NPC",
 "Додає монети",
 "Відкриває dialogue",
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
 "Лише автомобіль",
 "Лише таймер",
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
 "Гравець на сервері",
 "Увесь сервер глобально",
 "Лише клієнт",
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
 "Подвійна нагорода",
 "Ходьба",
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
 "Паролі гравців",
 "Terrain",
 "Camera",
 ],
 correctAnswer: 0,
 explanation: "Центральна таблиця балансу.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Crystal Touch має працювати на...",
 options: [
 "Server",
 "Лише LocalScript",
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
 "progress і goal до UI",
 "Безкоштовні Robux",
 "Terrain",
 "Лише Tool",
 ],
 correctAnswer: 0,
 explanation: "Відображення клієнта.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Порядок виконання квесту...",
 options: [
 "Прийняти → прогрес → завершити → нагорода",
 "Спочатку нагорода",
 "Без прийняття",
 "Видалити гравця",
 ],
 correctAnswer: 0,
 explanation: "Стандартний цикл.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "ключі ідентифікатора квесту, наприклад collect_crystals_01...",
 options: [
 "Бути послідовним у коді",
 "Змінювати кожен рядок",
 "Необов’язкові",
 "Замінити Humanoid",
 ],
 correctAnswer: 0,
 explanation: "Дисципліна іменування.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 8.4 базується на...",
 options: [
 "NPC-хаб 8.1–8.3",
 "Лише гонки",
 "Лише shop UI",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Концентраційні системи.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 8.5 додає...",
 options: [
 "Атака ворога",
 "Лише dialogue",
 "Лише patrol",
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
 "Вивід (print) стану змінюється під час налагодження",
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
 "Humanoid:TakeDamage на сервері",
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
 "Шкода кожен кадр",
 "Ходьба",
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
 "Реагувати та ухилятися",
 "Літати",
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
 "Фарбування Terrain",
 "Лише RemoteFunction",
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
 "Групує ворогів для Scripts",
 "Видаляє гравців",
 "Зберігає дані",
 "Відкриває UI",
 ],
 correctAnswer: 0,
 explanation: "Чиста архітектура.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "ATTACK_RANGE 6 означає...",
 options: [
 "Шкода лише впритул",
 "Шкода з усієї карти",
 "Шкоди ніколи",
 "Лікувати гравця",
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
 "Лише idle",
 "Лише магазин",
 "Лише гонки",
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
 "Лише terrain Module 1",
 "Module 12 publish",
 "Нічого",
 ],
 correctAnswer: 0,
 explanation: "Бойовий фундамент.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 8.6 - це...",
 options: [
 "Checkpoint Living Location",
 "Лише shop",
 "Лише гонки",
 "Порожньо",
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
 optionalChallenge: "Після завершення квесту мерехтять вогні або банер. (В Уроці 8.7 ти розбудуєш ціле квестове містечко з кількома NPC!)",
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
 "Лише Terrain",
 "Лише магазин",
 "Без Scripts",
 ],
 correctAnswer: 0,
 explanation: "Повний модуль 8.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Золотий шлях закінчується...",
 options: [
 "Нагороду quest отримано",
 "Лише publish",
 "Видалити NPC",
 "Порожня baseplate",
 ],
 correctAnswer: 0,
 explanation: "Повний цикл.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Перевірки квестів для двох гравців...",
 options: [
 "Незалежний прогрес",
 "Один спільний quest",
 "Без сервера",
 "Лише UI",
 ],
 correctAnswer: 0,
 explanation: "Стан кожного гравця.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Окремі Scripts допомагають...",
 options: [
 "Підтримуваність",
 "Лише лаг",
 "Прибрати UI",
 "Банити гравців",
 ],
 correctAnswer: 0,
 explanation: "Чиста архітектура.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Patrol NPC додає...",
 options: [
 "Жива атмосфера",
 "Ціни shop",
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
 "Чіткий потік і надійність",
 "Максимум ворогів",
 "Без тестів",
 "Квести лише на клієнті",
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
 "Лише монети",
 ],
 correctAnswer: 0,
 explanation: "Кінцевий модуль 8.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Довідник повинен згадати...",
 options: [
 "Мета quest у dialogue",
 "IP сервера",
 "Robux",
 "Лише version",
 ],
 correctAnswer: 0,
 explanation: "UX покажчики.",
 },
        {
 id: "q10",
 type: "multiple_choice",
 question: "Ворог поблизу квесту має бути...",
 options: [
 "Справедлива відстань — не блокує всі кристали",
 "На кожному кристалі",
 "Видалено",
 "Невидимий",
 ],
 correctAnswer: 0,
 explanation: "Весела ходьба.",
 },
 ],
 },
}

export const ukLesson87 = {
 lessonId: "lesson-roblox-8-7",
 moduleId: "module-08",
 order: 7,
 title: "8.7 - Проєкт: Квестове містечко",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Розмістіть 2-3 NPC з різними ролями (гід, торговець, патруль) в одному містечку",
 "Створіть багатоступеневий квест: зібрати → повернутися → перемогти ворога",
 "Відстежуйте поточний крок квесту для кожного гравця на сервері",
 "Об'єднайте діалог, патруль і бій в єдиний ігровий цикл",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Це **проєктний урок**. Ви маєте весь інструментарій з 8.1-8.6 - сьогодні будуєте **містечко** з кількома NPC та квестом із **кількома кроками**, а не одним завданням.

**Хід уроку:**
1. **Теорія (40 хв)** - планування містечка + багатоступеневий квест
2. **Практика (~35 хв)** - повний квестовий ланцюг
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте своє місце з **Уроку 8.6 - Living Location**.`,
 },
 {
 title: "Інструментарій Модуля 8 - швидкий огляд",
 content: `| Інструмент | З уроку | Роль у містечку |
|-----------|---------|----------------|
| ProximityPrompt + Humanoid | 8.1 | Взаємодія з NPC |
| DialogueData + OpenDialogue | 8.2 | Розмови NPC |
| Humanoid:MoveTo + waypoints | 8.3 | Ходячий NPC |
| QuestConfig + playerQuestState | 8.4 | Прогрес квесту |
| Агро + TakeDamage ворога | 8.5 | Небезпечна зона |

**Нічого нового** - лише більше NPC і **послідовність кроків** замість одного завдання.`,
 },
 {
 title: "План містечка",
 content: `\`\`\`
Workspace/QuestTown
├── NPCs/
│ ├── NPC_Guide_Maya (dialogue + видає квест)
│ └── NPC_Merchant_Tomas (dialogue + підказки, без квесту)
├── PatrolRoutes/Route_TownLoop (NPC_Patrol_Guard ходить)
├── QuestProps/Crystals x5 (крок 1)
├── DangerZone/NPC_Enemy_Slime (крок 3)
└── ShopArea (з Модуля 7, необов'язково)
\`\`\`**Три NPC, одна небезпечна зона** - достатньо для відчуття живого містечка без перевантаження.`,
 },
 {
 title: "Багатоступеневий квест - структура даних",
 content: `Розширте \`QuestConfig\` (8.4) полем \`steps\`:

\`\`\`lua
QuestConfig.town_trouble = {
 title = "Town in Trouble",
 rewardCoins = 100,
 steps = {
 { id = "collect", goal = 5, description = "Collect 5 crystals" },
 { id = "return", description = "Report back to Guide Maya" },
 { id = "defeat", description = "Defeat the slime guarding the cave" },
 },
}
\`\`\`**Масив steps** - гравець проходить їх **по порядку**, як контрольні точки гонки з Модуля 6.`,
 },
 {
 title: "Стан кроку квесту на гравця",
 content: `\`\`\`lua
local function getQuestState(player, questId)
 playerQuestState[player] = playerQuestState[player] or {}
 if not playerQuestState[player][questId] then
 playerQuestState[player][questId] = { stepIndex = 1, progress = 0, completed = false }
 end
 return playerQuestState[player][questId]
end

local function currentStep(player, questId)
 local state = getQuestState(player, questId)
 return QuestConfig[questId].steps[state.stepIndex]
end
\`\`\`**stepIndex** замінює просте \`started\`/\`completed\` з 8.4 - тепер це **лічильник прогресу через кроки**.`,
 },
 {
 title: "Крок 1: Збір (Collect)",
 content: `Той самий Touched-обробник кристалів з 8.4, але з перевіркою **поточного кроку**:

\`\`\`lua
crystal.Touched:Connect(function(hit)
 local player = game.Players:GetPlayerFromCharacter(hit.Parent)
 if not player then return end

 local step = currentStep(player, "town_trouble")
 if not step or step.id ~= "collect" then return end -- wrong step, ignore

 local state = getQuestState(player, "town_trouble")
 state.progress += 1
 crystal:Destroy()

 if state.progress >= step.goal then
 state.stepIndex += 1 -- advance to "return" step
 state.progress = 0
 questUpdate:FireClient(player, "town_trouble", "Go report to Guide Maya!")
 end
end)
\`\`\`**Ігнорування дотику**, якщо гравець не на кроці "collect" - без цього можна забігти вперед.`,
 },
 {
 title: "Крок 2: Повернення (Return)",
 content: `У ProximityPrompt Гіда Майї (8.1):

\`\`\`lua
prompt.Triggered:Connect(function(player)
 local step = currentStep(player, "town_trouble")
 if step and step.id == "return" then
 local state = getQuestState(player, "town_trouble")
 state.stepIndex += 1 -- advance to "defeat"
 questUpdate:FireClient(player, "town_trouble", "The slime guards the cave - be careful!")
 return
 end
 openDialogue:FireClient(player, "guide_intro")
end)
\`\`\`**Один NPC, дві ролі** - звичайний діалог **і** перевірка кроку квесту в одному Triggered.`,
 },
 {
 title: "Крок 3: Перемога над ворогом (Defeat)",
 content: `У Died-обробнику ворога з 8.5:

\`\`\`lua
enemyHumanoid.Died:Connect(function()
 for _, player in ipairs(game.Players:GetPlayers()) do
 local step = currentStep(player, "town_trouble")
 if step and step.id == "defeat" then
 completeQuest(player, "town_trouble")
 end
 end
end)
\`\`\`**Перевірка для всіх гравців** - будь-хто, хто на кроці "defeat", отримує кредит за вбивство спільного ворога.`,
 },
 {
 title: "Завершення багатоступеневого квесту",
 content: `\`\`\`lua
local function completeQuest(player, questId)
 local state = getQuestState(player, questId)
 if state.completed then return end
 state.completed = true

 local cfg = QuestConfig[questId]
 player.leaderstats.Coins.Value += cfg.rewardCoins

 questUpdate:FireClient(player, questId, "Quest complete! +" .. cfg.rewardCoins .. " coins")
end
\`\`\`**completed прапор** - той самий захист від подвійної нагороди, що і в простому квесті з 8.4.`,
 },
 {
 title: "Другий NPC - торговець без квесту (флейвор)",
 content: `**NPC_Merchant_Tomas** потребує лише **діалогу** (8.2), без квестової логіки - додає глибину містечку без нового коду:

\`\`\`lua
DialogueData.merchant_hint = {
 speaker = "Tomas the Merchant",
 lines = {
 "Careful near the cave - a slime has been causing trouble.",
 "Bring me crystals someday and I'll trade you something nice.",
 },
}
\`\`\`**Не кожен NPC повинен видавати квест** - деякі просто роблять світ живим.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] QuestConfig.town_trouble з 3 кроками (collect, return, defeat)
- [ ] currentStep правильно повертає активний крок гравця
- [ ] Кожен крок ігнорує дії, що не відповідають поточному кроку
- [ ] completeQuest дає монети рівно один раз
- [ ] Зберегти: \`Lesson 8.7 - Quest Town\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Кристали зараховуються незалежно від поточного кроку",
 explanation: "Гравець може закінчити крок 1 після того, як уже на кроці 3.",
 correctApproach: "Перевіряти step.id перед обробкою будь-якої дії",
 },
 {
 mistake: "stepIndex спільний для всіх гравців",
 explanation: "Прогрес одного гравця впливає на іншого.",
 correctApproach: "playerQuestState[гравець][questId].stepIndex",
 },
 {
 mistake: "Died ворога перевіряє лише одного конкретного гравця",
 explanation: "Інший гравець на кроці defeat не отримує кредит.",
 correctApproach: "Цикл по всіх гравцях у Died-обробнику",
 },
 {
 mistake: "completeQuest без перевірки completed",
 explanation: "Повторне вбивство того самого ворога дає нагороду знову.",
 correctApproach: "if state.completed then return в completeQuest",
 },
 ],
 summary: "Ви побудували квестове містечко з трьома NPC, багатоступеневим квестом (зібрати → повернутися → перемогти) і небезпечною зоною - усе повторно використовуючи інструментарій діалогу, патрулю, квестів і бою з 8.1-8.6 без жодного нового API.",
 practiceTask: {
 title: "Квестове містечко (~35 хв)",
 difficulty: "beginner",
 description: `**Мета:** Багатоступеневий квест від збору до перемоги над ворогом.

### Part A - Містечко (10 хв)
1. 2-3 NPC: Guide Maya (квест), Merchant Tomas (флейвор), Patrol Guard (ходить)
2. QuestProps/Crystals x5 + DangerZone з ворогом

### Part B - Ланцюг квесту (18 хв)
1. QuestConfig.town_trouble з steps (collect, return, defeat)
2. currentStep + getQuestState на сервері
3. Кожен крок перевіряє себе перед просуванням

### Part C - Тест і збереження (7 хв)
1. Пройдіть увесь ланцюг: збір → доповідь Майї → перемога над ворогом → нагорода
2. **Зберегти в Roblox** → \`Lesson 8.7 - Quest Town\` 3. **Практика завершена**`,
 hints: [
 "Друкуйте stepIndex гравця після кожної дії для налагодження послідовності",
 "Тестуйте кожен крок окремо, перш ніж з'єднувати весь ланцюг",
 "Torch NPC Тomas може повторно використати DialogueGui з 8.2 без змін",
 ],
 optionalChallenge: "Четвертий крок - принести здобич з ворога назад торговцю Tomas за бонусну нагороду.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Багатоступеневий квест зберігає кроки як...",
 options: [
 "Масив steps у QuestConfig",
 "Окремий DataStore",
 "RemoteFunction",
 "BillboardGui",
 ],
 correctAnswer: 0,
 explanation: "Впорядкований список кроків.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "currentStep повертає...",
 options: [
 "Активний крок гравця за stepIndex",
 "Випадковий крок",
 "Завжди перший крок",
 "Ім'я NPC",
 ],
 correctAnswer: 0,
 explanation: "Поточна позиція в ланцюгу.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Дотик кристала на кроці \"return\" повинен...",
 options: [
 "Ігноруватися - невідповідний крок",
 "Завершити квест",
 "Видалити NPC",
 "Дати подвійну нагороду",
 ],
 correctAnswer: 0,
 explanation: "Перевірка step.id перед дією.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Died ворога перевіряє...",
 options: [
 "Усіх гравців на кроці defeat",
 "Лише одного жорстко закодованого гравця",
 "Лише NPC",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Спільний ворог, індивідуальний прогрес.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Другий NPC без квесту потрібен для...",
 options: [
 "Атмосфери та флейвор-діалогу",
 "Дублювання коду",
 "Заміни Guide Maya",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Не всі NPC видають завдання.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "stepIndex збільшується, коли...",
 options: [
 "Поточний крок виконано",
 "Гравець стрибає",
 "Сервер перезавантажується",
 "NPC патрулює",
 ],
 correctAnswer: 0,
 explanation: "Просування по ланцюгу.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "completed прапор запобігає...",
 options: [
 "Повторній нагороді за той самий квест",
 "Ходьбі NPC",
 "Відкриттю діалогу",
 "Публікації",
 ],
 correctAnswer: 0,
 explanation: "Одноразова винагорода.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 8.7 повторно використовує з 8.1-8.6...",
 options: [
 "Діалог, патруль, квести, бій",
 "Лише гонки",
 "Лише магазин",
 "Нічого",
 ],
 correctAnswer: 0,
 explanation: "Проєктна інтеграція без нового API.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Один NPC може мати...",
 options: [
 "Звичайний діалог і перевірку кроку квесту разом",
 "Лише одну функцію назавжди",
 "Лише патруль",
 "Лише бій",
 ],
 correctAnswer: 0,
 explanation: "Комбіновані ролі NPC.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 8.7 зберегти назву...",
 options: [
 "Lesson 8.7 - Quest Town",
 "Living Location",
 "Quest System",
 "Enemy Attack",
 ],
 correctAnswer: 0,
 explanation: "Зберегти проєктний урок містечка.",
 },
 ],
 },
}

export const ukLesson88 = {
 lessonId: "lesson-roblox-8-8",
 moduleId: "module-08",
 order: 8,
 title: "8.8 - Жива локація: polish і playtest",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Додайте маркери квесту над NPC та цілями через BillboardGui",
 "Зробіть діалог зрозумілим - кожна реплика натякає на наступний крок",
 "Збалансуйте відстань спавну гравця, ворога й квестових предметів",
 "Проведіть повний walkthrough-тест з двома гравцями перед фінальним збереженням",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Квестове містечко з 8.7 **функціонує**. Сьогодні воно стає **зрозумілим** - гравець ніколи не губиться, куди йти й що робити далі.

**Хід уроку:**
1. **Теорія (40 хв)** - маркери + ясність діалогу + баланс
2. **Практика (~30 хв)** - відшліфоване містечко + walkthrough
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 8.7 - Quest Town**.`,
 },
 {
 title: "Чому маркери важливіші за код",
 content: `Технічно робочий квест **все ще плутає гравця**, якщо він не знає, куди йти.

| Без маркерів | З маркерами |
|-------------|-------------|
| Гравець блукає навмання | Значок над NPC з квестом |
| "Куди повертатися?" | Стрілка/маркер над Guide Maya під час кроку "return" |
| Незрозуміло, де небезпека | Знак попередження біля DangerZone |

Маркери **не змінюють логіку** - лише роблять уже готовий квест **читабельним**.`,
 },
 {
 title: "Маркер квесту над NPC (BillboardGui)",
 content: `\`\`\`lua
local function addQuestMarker(npcHead, symbol)
 local billboard = Instance.new("BillboardGui")
 billboard.Size = UDim2.fromOffset(40, 40)
 billboard.StudsOffset = Vector3.new(0, 2.5, 0)
 billboard.AlwaysOnTop = true
 billboard.Parent = npcHead

 local label = Instance.new("TextLabel")
 label.Size = UDim2.fromScale(1, 1)
 label.BackgroundTransparency = 1
 label.Text = symbol -- "!" for quest available, "?" for turn-in ready
 label.TextColor3 = Color3.fromRGB(255, 220, 60)
 label.TextScaled = true
 label.Font = Enum.Font.GothamBold
 label.Parent = billboard
 return billboard
end
\`\`\`**"!"** = квест доступний. **"?"** = крок готовий до завершення у цього NPC.`,
 },
 {
 title: "Динамічне оновлення маркера за кроком",
 content: `\`\`\`lua
local function updateGuideMarker(player)
 local step = currentStep(player, "town_trouble")
 local marker = guideMaya.Head:FindFirstChild("QuestMarkerLabel")
 if not marker then return end

 if not step then
 marker.Parent.Enabled = false
 elseif step.id == "return" then
 marker.Text = "?"
 marker.Parent.Enabled = true
 else
 marker.Parent.Enabled = false
 end
end
\`\`\`Викликайте після кожної зміни \`stepIndex\`, щоб маркер завжди відповідав реальному стану гравця.`,
 },
 {
 title: "Ясність діалогу - кожна реплика натякає на крок",
 content: `**До polish (незрозуміло):**
\`"Welcome to town. Good luck."\`

**Після polish (натякає на дію):**
\`\`\`lua
DialogueData.guide_intro.lines = {
 "Welcome, builder! The cave crystals hold great power.",
 "Collect 5 crystals from the plaza - watch for the slime guarding the cave.",
 "Come back to me once you have all 5, and I'll tell you what's next.",
}
\`\`\`**Правило:** якщо гравець закриє діалог і одразу не знатиме, що робити - перепишіть репліку.`,
 },
 {
 title: "Знак попередження біля небезпеки",
 content: `Simple Part \`WarningSign\` перед DangerZone:

\`\`\`lua
-- SurfaceGui or just a bright red Part with text
local sign = Instance.new("Part")
sign.Size = Vector3.new(4, 3, 0.2)
sign.Anchored = true
sign.BrickColor = BrickColor.new("Bright red")
sign.Position = dangerZoneEntrance.Position
sign.Parent = workspace.QuestTown
\`\`\`**Комбінуйте зі звуком** - гарчання слизу, чутне за 15+ studs, попереджає без потреби читати текст.`,
 },
 {
 title: "Баланс відстаней у містечку",
 content: `| Відстань | Рекомендація |
|----------|---------------|
| Spawn гравця → Guide Maya | 10-15 studs (одразу видно) |
| Guide Maya → зона кристалів | 20-40 studs (коротка прогулянка) |
| Кристали → DangerZone ворога | 15-25 studs (небезпека поруч, але не на самих кристалах) |
| Patrol route | Не перетинає DangerZone (плутанина ролей) |

**Занадто далеко** = гравець втрачає інтерес. **Занадто близько** = ворог блокує все одразу.`,
 },
 {
 title: "Walkthrough-тест (золотий шлях)",
 content: `**Один гравець, секундомір, ~3 хвилини:**

| Крок | Дія | Час |
|------|-----|-----|
| 1 | Spawn → бачить маркер "!" над Guide Maya | |
| 2 | Діалог - розуміє мету без переказу | |
| 3 | Знаходить 5 кристалів без блукання | |
| 4 | Бачить маркер "?" над Guide Maya - повертається | |
| 5 | Йде до DangerZone, перемагає ворога | |
| 6 | Отримує нагороду - чітке повідомлення успіху | |

Якщо будь-який крок займає **надто довго через плутанину** - додайте маркер або перепишіть репліку.`,
 },
 {
 title: "Тест для двох гравців перед фінальним збереженням",
 content: `**2 гравці одночасно:**
- Обидва бачать однакові маркери над NPC (кожен свій стан кроку)
- Прогрес квесту незалежний - один на кроці "collect", інший на "defeat"
- Спільний ворог dies - кредит зараховується правильному гравцю
- Немає помилок Output протягом обох повних проходжень

**Записуйте** будь-яку плутанину чи помилку для фінального виправлення.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Маркер "!"/"?" над Guide Maya оновлюється за кроком квесту
- [ ] Кожна реплика діалогу натякає на конкретну дію
- [ ] Знак і звук попереджають про DangerZone заздалегідь
- [ ] Golden path пройдено без плутанини одним гравцем
- [ ] Тест для 2 гравців пройдено без помилок Output
- [ ] Зберегти: \`Lesson 8.8 - Quest Town Polish\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Маркер квесту статичний, не оновлюється за кроком",
 explanation: "Гравець бачить \"!\" навіть коли крок уже \"defeat\".",
 correctApproach: "updateGuideMarker після кожної зміни stepIndex",
 },
 {
 mistake: "Діалог загальний, без конкретної дії",
 explanation: "Гравець закриває розмову й не знає, куди йти.",
 correctApproach: "Кожна репліка називає конкретну ціль або локацію",
 },
 {
 mistake: "DangerZone відразу біля точки спавну кристалів",
 explanation: "Гравець гине, ще не зрозумівши квест.",
 correctApproach: "15-25 studs буфер між кристалами і ворогом",
 },
 {
 mistake: "Тестується лише один гравець перед збереженням",
 explanation: "Багатокористувацькі помилки виявляються надто пізно.",
 correctApproach: "Обов'язковий тест на 2 гравці в кінці",
 },
 ],
 summary: "Ви додали динамічні маркери квесту, переписали діалог так, щоб кожна реплика підказувала наступну дію, збалансували відстані в містечку та провели повний walkthrough-тест для одного й двох гравців - квестове містечко тепер зрозуміле й готове до демонстрації.",
 practiceTask: {
 title: "Polish та playtest містечка (~30 хв)",
 difficulty: "beginner",
 description: `**Мета:** Квестове містечко, зрозуміле без пояснень.

### Part A - Маркери (12 хв)
1. addQuestMarker над Guide Maya, "!" за замовчуванням
2. updateGuideMarker перемикає на "?" на кроці "return"

### Part B - Ясність і баланс (10 хв)
1. Перепишіть діалог guide_intro з конкретними діями
2. Знак і звук попередження біля DangerZone
3. Перевірте відстані за таблицею балансу

### Part C - Walkthrough-тест (8 хв)
1. Один гравець - повний золотий шлях без плутанини
2. Два гравці - незалежний прогрес, без помилок Output
3. **Зберегти в Roblox** → \`Lesson 8.8 - Quest Town Polish\` 4. **Практика завершена**`,
 hints: [
 "Попросіть когось, хто не грав раніше, пройти golden path без ваших пояснень",
 "Якщо маркер не оновлюється, друкуйте stepIndex поруч із викликом updateGuideMarker",
 "Записуйте час кожного кроку walkthrough - повільні кроки вказують на плутанину",
 ],
 optionalChallenge: "Компас/стрілка на HUD, що вказує напрямок до поточної цілі квесту.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Маркер квесту над NPC показує через...",
 options: [
 "BillboardGui з текстовим символом",
 "DataStore",
 "RemoteFunction",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Візуальний індикатор стану.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Маркер \"?\" означає...",
 options: [
 "Крок готовий до завершення у цього NPC",
 "Квест недоступний",
 "Ворог поруч",
 "Помилка сервера",
 ],
 correctAnswer: 0,
 explanation: "Сигнал завершення кроку.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Гарна реплика діалогу повинна...",
 options: [
 "Натякати на конкретну наступну дію",
 "Бути максимально загальною",
 "Уникати згадки мети",
 "Бути порожньою",
 ],
 correctAnswer: 0,
 explanation: "Ясність UX діалогу.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Буфер 15-25 studs між кристалами і ворогом потрібен, щоб...",
 options: [
 "Гравець не гинув одразу, не зрозумівши квест",
 "Пришвидшити сервер",
 "Зменшити HP ворога",
 "Видалити NPC",
 ],
 correctAnswer: 0,
 explanation: "Баланс складності й простору.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Golden path тест перевіряє...",
 options: [
 "Повний цикл квесту без плутанини",
 "Лише швидкість сервера",
 "Лише графіку",
 "Лише звук",
 ],
 correctAnswer: 0,
 explanation: "Повне проходження одним гравцем.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Тест для 2 гравців перевіряє...",
 options: [
 "Незалежний прогрес і спільного ворога без помилок",
 "Лише один спільний квест",
 "Відсутність сервера",
 "Лише UI кольори",
 ],
 correctAnswer: 0,
 explanation: "Багатокористувацька стабільність.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "updateGuideMarker слід викликати...",
 options: [
 "Після кожної зміни stepIndex гравця",
 "Лише раз при старті сервера",
 "Ніколи",
 "Лише на клієнті",
 ],
 correctAnswer: 0,
 explanation: "Синхронізація маркера зі станом.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Знак і звук біля DangerZone дають...",
 options: [
 "Попередження заздалегідь",
 "Додаткову шкоду",
 "Нову валюту",
 "DataStore запис",
 ],
 correctAnswer: 0,
 explanation: "Читабельність небезпеки.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 8.8 завершує...",
 options: [
 "Полірування проєкту Quest Town з 8.7",
 "Новий незалежний модуль",
 "Модуль 9 наперед",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Фінальний polish проєкту.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 8.8 зберегти назву...",
 options: [
 "Lesson 8.8 - Quest Town Polish",
 "Quest Town",
 "Living Location",
 "Enemy Attack",
 ],
 correctAnswer: 0,
 explanation: "Зберегти фінальний polish урок.",
 },
 ],
 },
}
