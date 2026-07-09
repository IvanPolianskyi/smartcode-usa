/** Rich UK content for Roblox Module 07 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson71 = {
 lessonId: "lesson-roblox-7-1",
 moduleId: "module-07",
 order: 1,
 title: "7.1 - Два світи: клієнт і сервер",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Поясніть відповідальність клієнта проти сервера в Roblox",
 "Позначте межі довіри для 10 ігрових дій",
 "Збірка демонстрації рукостискання PingServer RemoteEvent",
 "Правильно розмістіть Scripts в StarterGui проти ServerScriptService",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Модуль 7 - Мережа та магазин** - ви дізнаєтесь, як **клієнт** і **сервер** безпечно взаємодіють. Це забезпечує магазини, квести та чесну багатокористувацьку гру.

**Хід уроку:**
1. **Теорія (40 хв)** - два світи + карта довіри
2. **Практика (~25 хв)** - демонстрація ping + карта меж
3. **Вікторина (10 хв)** - проходження **70%**

Нове місце або центр:\`Lesson 7.1 - Two Worlds\`. Ви вже використовували RemoteEvents у гонках Module 6 - сьогодні ми заглибимося глибше.`,
 },
 {
 title: "Два комп'ютери, одна гра",
 content: `Кожен сеанс Roblox має:

| Світ | Де він проходить | Хто це бачить |
|-------|--------------|-------------|
| **Клієнт** | Пристрій гравця | Цей гравець тільки |
| **Сервер** | Хост гри Roblox | Всі - single source of truth |

**Клієнт** = камера, клавіатура, ваш ScreenGui, локальні звуки.

**Сервер** = монети, інвентар, пошкодження, прогрес у квесті, хто виграв гонку.

**Правило:***Клієнт запитує. Сервер вирішує.*`,
 },
 {
 title: "Що куди належить",
 content: `| Дія | Сторона | Чому |
|--------|------|-----|
| Move камеру | Клієнт | Особистий погляд |
| Натисніть кнопку магазину | Клієнт | Вхід |
| Відрахувати монети | Сервер | Античіт |
| Надати меч інструмент | Сервер | Спільний інвентар |
| Показати «Обробка...» | Клієнт | Швидкий відгук |
| Зберегти найкращий час кола | Сервер | Офіційний рахунок |
| Відтворення звуку кроків локально | Клієнт | Немає необхідності в мережі |
| Вбити гравця лавою | Сервер | Справедлива шкода |

**Вправа (8 хв.):** Напишіть 10 дій з вашого місця перегонів - позначте кожного клієнта/сервера/обидва.`,
 },
 {
 title: "Розміщення Script",
 content: `| Тип Script | Розташування | Працює на |
|-------------|----------|---------|
| **Script** | ServerScriptService, Parts (сервер) | Сервер |
| **LocalScript** | StarterGui, StarterPlayerScripts | Клієнт |\`\`\`lua
-- LocalScript (StarterGui)
print("Client: I read input and update UI")

-- Script (ServerScriptService)
print("Server: I validate and save shared data")
\`\`\`**LocalScript у ServerScriptService** = ніколи не запускається для гравців. **Script у StarterGui** = неправильне місце.`,
 },
 {
 title: "Межа довіри",
 content: `**Межа довіри** = межа, на якій ви перестаєте вірити клієнту.

**Ніколи не довіряйте клієнту за:**
- Сума монети після покупки
- "Я закінчив крок 5 квесту"
- Пошкодження, завдані іншому гравцеві
- Ціна товару

**ОК на клієнті:**
- Анімація кнопок
- Тремтіння камери
- Попередній перегляд тексту до підтвердження сервером

Якщо обман зашкодить балансу → **сервер**.`,
 },
 {
 title: "Перше рукостискання - PingServer",
 content: `**ReplicatedStorage** → **RemoteEvent** →\`PingServer\`**ServerScriptService** → Script\`PingHandler\`:\`\`\`lua
local ping = game.ReplicatedStorage:WaitForChild("PingServer")

ping.OnServerEvent:Connect(function(player, msg)
 if type(msg) ~= "string" then return end
 print("[Ping] " .. player.Name .. " says: " .. msg)
 ping:FireClient(player, "Pong from server!")
end)
\`\`\`**StarterGui** →\`PingUI\`→ TextButton + **LocalScript**:\`\`\`lua
local ping = game.ReplicatedStorage:WaitForChild("PingServer")
local button = script.Parent.PingButton

button.MouseButton1Click:Connect(function()
 ping:FireServer("Hello from client!")
end)

ping.OnClientEvent:Connect(function(reply)
 script.Parent.StatusLabel.Text = reply
end)
\`\`\`**Play** → натисніть → Вивести + оновлення мітки.`,
 },
 {
 title: "Назви пультів для наступних уроків",
 content: `Хороші назви (модуль 7 шлях до магазину):
-\`PingServer\`- тільки тест
-\`RequestPurchase\`- клієнт → купити сервер
-\`PurchaseResult\`- сервер → відгук клієнта

**Погані імена:**\`Event1\`,\`Remote\`,\`DoThing\`Розмістіть віддалені пристрої в **ReplicatedStorage**, а не в ServerStorage (клієнти не бачать ServerStorage).`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Карта довіри: позначені 10 дій
- [ ] PingServer RemoteEvent працює в Play
- [ ] Сервер виводить ім'я гравця + повідомлення
- [ ] Client StatusLabel показує pong
- [ ] Зберегти:\`Lesson 7.1 - Two Worlds\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Важлива логіка лише в LocalScript",
 explanation: "Експлуататори можуть підробити клієнта.",
 correctApproach: "Сервер перевіряє економіку та прогрес",
 },
 {
 mistake: "Remote in ServerStorage",
 explanation: "Клієнт не може FireServer.",
 correctApproach: "ReplicatedStorage для спільних пультів",
 },
 {
 mistake: "LocalScript у ServerScriptService",
 explanation: "Не працює на клієнті.",
 correctApproach: "LocalScript під StarterGui",
 },
 {
 mistake: "Підрахунок монет довірливого клієнта",
 explanation: "Нескінченний грошовий подвиг.",
 correctApproach: "Сервер зберігає та розмінює монети",
 },
 ],
 summary: "Ви позначили межі довіри між клієнтом і сервером, правильно розмістили Scripts та створили зв’язок PingServer - основу для магазину та безпечних покупок у решті модулю 7.",
 practiceTask: {
 title: "Карта довіри + демонстрація ping (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** межі документа + робочий віддалений пінг.

### Part A - Карта довіри (10 хв)
1. Папір або нотатки: 10 дій → Клієнт / Сервер / Обидва
2. Принаймні 3 мають бути лише для сервера з причиною

### Part B - Демонстрація ping (12 хв)
1. Server Script PingServer RemoteEvent + PingHandler
2. Кнопка PingUI + LocalScript + StatusLabel
3. Play - перевірити Output та мітку

### Part C - Зберегти (3 хв)
1. **Зберегти в Roblox** →\`Lesson 7.1 - Two Worlds\` 2. **Практика завершена**`,
 hints: [
 "Тестуйте з 2 гравцями в Studio - обидва мають пінгувати окремо",
 "Повернутися раніше, якщо повідомлення не є рядком",
 "Модуль 6 RaceEvent був таким самим шаблоном - повторне використання цієї ментальної model",
 ],
 optionalChallenge: "Надіслати os.clock() від клієнта; показати туди й назад мс на StatusLabel.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Сервер є авторитетним для...",
 options: [
 "Спільний game state, наприклад монети",
 "Лише camera",
 "Лише локальні звуки",
 "Яскравість монітора гравця",
 ],
 correctAnswer: 0,
 explanation: "Сервер володіє спільною правдою.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "LocalScript працює на...",
 options: [
 "Client кожного гравця",
 "Лише сервер",
 "Сайт Roblox",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "На стороні клієнта.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Клієнт запитує, сервер вирішує, означає...",
 options: [
 "Сервер перевіряє запити",
 "Клієнт завжди перемагає",
 "Без remotes",
 "Без UI",
 ],
 correctAnswer: 0,
 explanation: "Межа довіри.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Спільні пульти дистанційного керування входять...",
 options: [
 "ReplicatedStorage",
 "Лише ServerStorage",
 "Lighting",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Обидві сторони можуть отримати доступ.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "FireServer надсилає...",
 options: [
 "Від клієнта до сервера",
 "Лише від сервера до клієнта",
 "Редагування Terrain",
 "Weld",
 ],
 correctAnswer: 0,
 explanation: "Запит клієнта.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Відрахування монет магазину належить на...",
 options: [
 "Server",
 "Лише клієнт",
 "Текст StarterGui",
 "Sky",
 ],
 correctAnswer: 0,
 explanation: "Античіт.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Тема модуля 7...",
 options: [
 "Network & Shop / networking",
 "Лише Terrain",
 "Лише гонки",
 "Publishing",
 ],
 correctAnswer: 0,
 explanation: "Зв'язок клієнт-сервер.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Script у ServerScriptService працює на...",
 options: [
 "Server",
 "Client HUD",
 "Обидва",
 "Жоден",
 ],
 correctAnswer: 0,
 explanation: "Серверні скрипти.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Демонстрація Ping доводить...",
 options: [
 "Клієнт і сервер можуть спілкуватися",
 "DataStore працює",
 "Terrain генерується",
 "NPC pathfinding",
 ],
 correctAnswer: 0,
 explanation: "Тест рукостискання.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 7.1 зберегти назву...",
 options: [
 "Lesson 7.1 - Two Worlds",
 "Shop Works",
 "Race Launched",
 "Arena Ready",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок 7.1.",
 },
 ],
 },
}

export const ukLesson72 = {
 lessonId: "lesson-roblox-7-2",
 moduleId: "module-07",
 order: 2,
 title: "7.2 - RemoteEvent",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Використовуйте RemoteEvent для односторонніх повідомлень клієнт↔сервер",
 "Перевірка корисних навантажень за допомогою перевірки типу та раннього повернення",
 "Парні пульти RequestAction і ActionResult",
 "Додайте час відновлення для кожного гравця проти спаму",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**RemoteEvent** = одностороння **пошта** між світами. Немає значення миттєвого повернення (тобто RemoteFunction у 7.5).

**Хід уроку:**
1. **Теорія (40 хв)** - події + перевірка
2. **Практика (~25 хв)** - шина повідомлень з двома пультами
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 7.1 - Два світи**.`,
 },
 {
 title: "Напрямки RemoteEvent",
 content: `| Телефонуйте | Напрям | Використовуйте |
|------|-----------|-----|
|\`FireServer(...)\`| Клієнт → Сервер | Купити, квест, запит на здатність |
|\`FireClient(player, ...)\`| Сервер → один клієнт | Особистий результат |
|\`FireAllClients(...)\`| Сервер → усі | Оголошення |

**Односторонній:** відправник не чекає повернення значення в тому самому рядку.`,
 },
 {
 title: "Шаблон RequestAction + ActionResult",
 content: `**ReplicatedStorage:**
-\`RequestAction\`- клієнт запускає ідентифікатор елемента
-\`ActionResult\`- сервер спрацьовує добре + повідомлення у відповідь

**Сервер**\`ShopBus\`у ServerScriptService:\`\`\`lua
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
 title: "Слухач клієнта",
 content: `\`StarterGui/ShopBusUI\`LocalScript:\`\`\`lua
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
 title: "Правила корисного навантаження",
 content: `**Почніть із простого:**
-\`itemId\`рядок
-\`ok\`логічний
-\`message\`рядок

**Перевірте кожен аргумент:**\`\`\`lua
if type(itemId) ~= "string" then return end
if #itemId > 32 then return end -- anti spam string
\`\`\`**Ніколи** не приймайте ціну від клієнта як авторитет.

**Реєструйте підозрілі дані** у вихідних даних під час розробки.`,
 },
 {
 title: "Спам і експлойти",
 content: `Гравці можуть натискати «Купити» 100 разів на секунду.

**Таблиця перезарядки:**\`\`\`lua
local cooldown = {}
-- set os.clock() after accept; ignore if too soon
\`\`\`**Повернення раніше** зберігає код незмінним:\`\`\`lua
if type(itemId) ~= "string" then return end
if not VALID_ITEMS[itemId] then
 result:FireClient(player, false, "Unknown item")
 return
end
\`\`\`Порівняйте з модулем 6 - та сама дисципліна для змагань.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] RequestAction + ActionResult у ReplicatedStorage
- [ ] Сервер перевіряє рядок itemId
- [ ] Клієнт показує зелений/червоний статус із ActionResult
- [ ] Зарядка зупиняє спам кнопки
- [ ] Зберегти:\`Lesson 7.2 - RemoteEvent\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Лише RequestAction, жодної події результату",
 explanation: "Інтерфейс застряг на обробці.",
 correctApproach: "ActionResult FireClient із повідомленням",
 },
 {
 mistake: "Немає перевірки типу itemId",
 explanation: "Збої або дивні експлойти.",
 correctApproach: "type(itemId) == рядок",
 },
 {
 mistake: "FireServer зі скрипта сервера",
 explanation: "Неправильний напрямок.",
 correctApproach: "FireServer лише з LocalScript",
 },
 {
 mistake: "Той самий RemoteEvent в обох напрямках заплутаний",
 explanation: "Важко налагодити.",
 correctApproach: "Окремі запити та результати дистанційного керування",
 },
 ],
 summary: "Ви створили дводистанційну шину повідомлень із перевіреними корисними навантаженнями RequestAction, зворотним зв’язком ActionResult з інтерфейсом користувача та часом відновлення для кожного гравця - готові підключити повний екран магазину на наступному уроці.",
 practiceTask: {
 title: "Автобус повідомлень про подію (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Цикл запиту + результату з перевіркою.

### Part A - Пульти дистанційного керування (8 хв)
1. RequestAction + ActionResult у ReplicatedStorage
2. Серверний скрипт ShopBus із дійсними ідентифікаторами

### Part B - Клієнт (12 хв)
1. Кнопка TestBuy + StatusLabel
2. OnClientEvent фарбує успіх/невдачу
3. Перезарядка сервера 0,3 с - перевірка спаму

### Part C - Зберегти (5 хв)
1. Невідомий ідентифікатор → повідомлення про помилку
2. **Зберегти в Roblox** →\`Lesson 7.2 - RemoteEvent\` 3. **Практика завершена**`,
 hints: [
 "Друкуйте кожну подію OnServerEvent із player.Name та itemId",
 "Обробка... тексту до того, як FireServer запрацює",
 "Таблиця VALID_ITEMS наразі може містити 2 елементи",
 ],
 optionalChallenge: "FireAllClients, коли хтось купує - \"X робить покупки!\"",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "RemoteEvent - це...",
 options: [
 "Односторонні повідомлення",
 "Лише синхронне повернення",
 "Terrain tool",
 "Тип Weld",
 ],
 correctAnswer: 0,
 explanation: "Вогонь і забудь.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Цілі FireClient...",
 options: [
 "Один конкретний гравець",
 "Лише сервер",
 "Terrain",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Сервер до одного клієнта.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Перевірте itemId за допомогою...",
 options: [
 "type(itemId) == \"string\"",
 "Довіряти клієнту",
 "Без перевірок",
 "Випадково",
 ],
 correctAnswer: 0,
 explanation: "Тип охоронець.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "ActionResult має бути запущено з...",
 options: [
 "Сервер після обробки",
 "Клієнт перед сервером",
 "Lighting",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Сервер володіє результатом.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Перезарядка запобігає...",
 options: [
 "Spam-запити",
 "Ходьба",
 "Стрибки",
 "Camera",
 ],
 correctAnswer: 0,
 explanation: "Ліміт тарифу.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "FireServer викликається з...",
 options: [
 "LocalScript",
 "Лише Server Script",
 "Terrain",
 "Module у ServerStorage",
 ],
 correctAnswer: 0,
 explanation: "Клієнт ініціює.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Передчасне повернення через погані дані...",
 options: [
 "Handlers залишаються читабельними",
 "Видаляє гравця",
 "Публікує гру",
 "Прибирає UI",
 ],
 correctAnswer: 0,
 explanation: "Охоронні положення.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Використано два пульти, тому що...",
 options: [
 "Request і result — окремі потоки",
 "Одного завжди достатньо",
 "Без networking",
 "Лише UI",
 ],
 correctAnswer: 0,
 explanation: "Чіткий поділ.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 7.2 базується на...",
 options: [
 "Lesson 7.1 ping",
 "Лише Module 1",
 "Лише монети Module 3",
 "Publishing",
 ],
 correctAnswer: 0,
 explanation: "Продовжує роботу в мережі.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 7.2 зберегти назву...",
 options: [
 "Lesson 7.2 - RemoteEvent",
 "Two Worlds",
 "Shop Works",
 "Race Timer",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок 7.2.",
 },
 ],
 },
}

export const ukLesson73 = {
 lessonId: "lesson-roblox-7-3",
 moduleId: "module-07",
 order: 3,
 title: "7.3 - Магазин: UI Part",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть панель магазину ScreenGui з перемикачем відкриття/закриття",
 "Створіть 3+ картки предметів із назвою, ціною та кнопками «Купити».",
 "Підключіть кнопки до FireServer RequestPurchase з ідентифікаторами елементів",
 "Показати відгук про обробку та статус клієнта",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Сьогодні **магазин виглядає справжнім** - лише інтерфейс. Сервер виплачує **7,4**.

**Хід уроку:**
1. **Теорія (40 хв)** - верстка ScreenGui + UX
2. **Практика (~25 хв)** - панель магазину з 3 предметів
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 7.2 - RemoteEvent**. Перейменувати\`RequestAction\`→\`RequestPurchase\`якщо ви хочете назвати магазин (або зберегти обидва під час міграції).`,
 },
 {
 title: "Ієрархія інтерфейсу користувача магазину",
 content: `**StarterGui** →\`ShopGui\`(ScreenGui)\`\`\`
ShopGui
├── OpenShopButton (TextButton, corner)
└── ShopPanel (Frame, center, hidden at start)
 ├── TitleLabel ("Item Shop")
 ├── ItemList (ScrollingFrame or Frame)
 │ ├── Item_sword_basic
 │ ├── Item_shield_basic
 │ └── Item_speed_boost
 ├── StatusLabel (bottom)
 └── CloseButton
\`\`\`**UICorner** + **UIStroke** на панелі для полірування.`,
 },
 {
 title: "Макет картки предмета",
 content: `Кожен\`Item_sword_basic\`Рама містить:
- **NameLabel** - "Основний меч"
- **PriceLabel** - "50 монет" (поки тільки відображення)
- **BuyButton** - текст "Купити"

**Єдина таблиця цін** у LocalScript (джерело відображення):\`\`\`lua
local DISPLAY_PRICES = {
 sword_basic = 50,
 shield_basic = 40,
 speed_boost = 30,
}
\`\`\`Сервер матиме реальні ціни в 7.4 - таблиця відображення лише для попереднього перегляду.`,
 },
 {
 title: "Відкрити і закрити панель",
 content: `\`ShopPanel.Visible = false\`на початку.\`\`\`lua
local panel = script.Parent.ShopPanel
local openBtn = script.Parent.OpenShopButton
local closeBtn = panel.CloseButton

openBtn.MouseButton1Click:Connect(function()
 panel.Visible = true
end)

closeBtn.MouseButton1Click:Connect(function()
 panel.Visible = false
end)
\`\`\`Додатково: слайд-панель **TweenService** знизу (завдання).`,
 },
 {
 title: "Купити кнопкову проводку",
 content: `\`ShopClient\`LocalScript у ShopPanel:\`\`\`lua
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
\`\`\`Використовуйте **PurchaseResult** із шаблону 7.2 (за потреби перейменуйте ActionResult).`,
 },
 {
 title: "UX-полірування магазину",
 content: `| Трюк UX | Ефект |
|----------|--------|
| Вимкнути кнопку через 0,5 с після натискання | Немає відчуття подвійного вогню |
| «Обробка...» жовтий текст | Гравець знає, що щось сталося |
| Зелений ✓ / червоний ✗ результат | Чіткий результат |
| Послідовні цінники | Довіра |

**Не** міняйте монети на клієнті - показуйте лише повідомлення до 7.4.`,
 },
 {
 title: "Підготовка до серверної майстерні (7.4)",
 content: `**Ідентифікатори елементів** (рядки, нижній регістр, підкреслення):
-\`sword_basic\`-\`shield_basic\`-\`speed_boost\`Сервер\`ShopItems\`таблиця в 7.4 точно відповідатиме цим ідентифікаторам.

**Контрольний список перед тренуваннями:**
- [ ] 3 предмети з кнопками купити
- [ ] Відкриття/закриття магазину працює
- [ ] Кожна покупка запускає правильний itemId
- [] StatusLabel оновлення з PurchaseResult
- [ ] Зберегти:\`Lesson 7.3 - Shop UI\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Різний itemId на кнопці та таблиці сервера",
 explanation: "Невідомий предмет назавжди.",
 correctApproach: "Константи спільного ідентифікатора",
 },
 {
 mistake: "LocalScript у Workspace",
 explanation: "Може працювати не для всіх гравців.",
 correctApproach: "Ієрархія StarterGui",
 },
 {
 mistake: "Клієнт змінює Coins IntValue при покупці",
 explanation: "Експлойт до 7.4.",
 correctApproach: "Повідомлення інтерфейсу користувача лише до тих пір, поки сервер не відніме",
 },
 {
 mistake: "Жорстко закодована ціна на кнопці та невідповідність етикетки",
 explanation: "Заплутаний магазин.",
 correctApproach: "Одна таблиця DISPLAY_PRICES",
 },
 ],
 summary: "Ви створили магазин ScreenGui із трьома елементами, панеллю відкриття/закриття, кнопками покупки, що запускають RequestPurchase, і відшліфованим відгуком клієнта - готовий до безпечної оплати на сервері в Уроці 7.4.",
 practiceTask: {
 title: "Купуйте ScreenGui (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** повний інтерфейс магазину, підключений до пультів дистанційного керування (сервер заглушки в порядку).

### Part A - Макет (12 хв)
1. ShopGui + ShopPanel + 3 картки предметів
2. Name + цінники з таблиці DISPLAY_PRICES
3. OpenShopButton + CloseButton

### Part B - Електропроводка (10 хв)
1. RequestPurchase + PurchaseResult (з шаблону 7.2)
2. hookBuy для кожного id товару
3. Обробка + відключення кнопки + кольори стану

### Part C - Зберегти (3 хв)
1. Грайте - купуйте кожен предмет один раз
2. **Зберегти в Roblox** →\`Lesson 7.3 - Shop UI\` 3. **Практика завершена**`,
 hints: [
 "Назви кнопок Buy_sword_basic допомагають у налагодженні",
 "ScrollingFrame, якщо ви додасте більше 3 елементів пізніше",
 "Заглушка сервера з версії 7.2 все ще працює, доки у версії 7.4 не додадуться монети",
 ],
 optionalChallenge: "Слайд панелі TweenService + затемнена рамка фону.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Інтерфейс магазину живе в...",
 options: [
 "StarterGui ScreenGui",
 "ServerStorage",
 "Terrain",
 "Лише Lighting",
 ],
 correctAnswer: 0,
 explanation: "Інтерфейс клієнта.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Кнопка «Купити» повинна FireServer з...",
 options: [
 "рядок item id",
 "Лише ім’я гравця",
 "Випадкова ціна",
 "Terrain id",
 ],
 correctAnswer: 0,
 explanation: "Корисне навантаження для сервера.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Відображати ціни на інтерфейсі користувача в 7.3...",
 options: [
 "Попередній перегляд до перевірки сервером у 7.4",
 "Остаточний авторитет",
 "Зберігається в Terrain",
 "Приховано",
 ],
 correctAnswer: 0,
 explanation: "Сервер володіє реальними цінами.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Обробка... текст показує...",
 options: [
 "Запит надіслано, очікування",
 "Миттєва покупка завершена",
 "Сервер offline",
 "Гру опубліковано",
 ],
 correctAnswer: 0,
 explanation: "UX відгук.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Ненадовго вимкніть кнопку, щоб...",
 options: [
 "Зменшити spam подвійних кліків",
 "Видалити предмет",
 "Закрити гру",
 "Зберегти place",
 ],
 correctAnswer: 0,
 explanation: "UX на стороні клієнта.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "LocalScript обробляє...",
 options: [
 "Кліки та оновлення міток",
 "Списання монет",
 "Збереження DataStore",
 "NPC AI",
 ],
 correctAnswer: 0,
 explanation: "Роль клієнта.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "ідентифікатори елементів мають бути...",
 options: [
 "Однакові рядки, наприклад sword_basic",
 "Випадково кожен клік",
 "Лише числа на клієнті",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Зіставте таблицю сервера пізніше.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Для уроку 7.3 потрібні пульти від...",
 options: [
 "Lesson 7.2",
 "Лише Lesson 1.1",
 "Лише Module 6",
 "Без попередніх уроків",
 ],
 correctAnswer: 0,
 explanation: "Шаблон запит/результат.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Серверна логіка coin з’являється...",
 options: [
 "Lesson 7.4",
 "Lesson 7.1",
 "Lesson 6.1",
 "Lesson 12",
 ],
 correctAnswer: 0,
 explanation: "Наступний урок.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 7.3 зберегти назву...",
 options: [
 "Lesson 7.3 - Shop UI",
 "Shop Works",
 "RemoteEvent",
 "Race Launched",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок інтерфейсу користувача.",
 },
 ],
 },
}

export const ukLesson74 = {
 lessonId: "lesson-roblox-7-4",
 moduleId: "module-07",
 order: 4,
 title: "7.4 - Магазин: серверна логіка",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Зберігайте на сервері таблицю ShopItems із цінами лише для сервера",
 "Підтверджуйте покупки та знімайте монети в статистиці лідерів",
 "Надайте інструменти рюкзаку з блокуванням покупки",
 "Запустіть PurchaseResult із балансом і чіткими повідомленнями",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Інтерфейс користувача з **7.3** просить купити. Сьогодні **сервер - це касир** - реальні монети, реальні предмети.

**Хід уроку:**
1. **Теорія (40 хв)** - потік перевірки + блокування
2. **Практика (~25 хв)** - безпечний магазин серверів
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 7.3 - Інтерфейс користувача магазину**.`,
 },
 {
 title: "Сервер - це касир",
 content: `Тільки сервер може:
- Зберігайте **Монети** в\`leaderstats\`- Дізнайтеся **реальні ціни**
- Схвалювати або відхиляти покупки
- Покладіть інструменти в **Рюкзак**

Клієнт надсилає **тільки ідентифікатор товару** - ніколи ціну, ніколи «У мене 999 монет».`,
 },
 {
 title: "Модуль ShopItems",
 content: `**ServerScriptService** → **ModuleScript**\`ShopConfig\`:\`\`\`lua
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
\`\`\`**ReplicatedStorage** не отримує ціни - клієнти дізнаються ціни через каталог у повідомленнях 7.5 або PurchaseResult.`,
 },
 {
 title: "Монети при приєднанні",
 content: `Script **ShopServer** - PlayerAdded:\`\`\`lua
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
\`\`\`Повторне використання шаблону LeaderStats модуля 3.`,
 },
 {
 title: "Потік перевірки (6 кроків)",
 content: `Увімкнено\`RequestPurchase.OnServerEvent\`:

1. **Перевірка типу** -\`itemId\`це рядок
2. **Існує** -\`ShopConfig.Items[itemId]\` 3. **Заблокувати** - пропустити якщо\`purchaseLock[player]\` 4. **Баланс** -\`coins.Value >= price\` 5. **Вирахування** -\`coins.Value -= price\` 6. **Grant** - інструмент клонування з\`ServerStorage/Tools\`→ Рюкзак
7. **Повідомити** -\`PurchaseResult:FireClient(player, true, msg, coins.Value)\`

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
 title: "Блокування покупки (захист від подвійних витрат)",
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
\`\`\`**pcall** гарантує, що блокування завжди знімається, навіть якщо надання не вдається.`,
 },
 {
 title: "Надайте інструмент безпечно",
 content: `\`\`\`lua
local toolsFolder = game.ServerStorage:WaitForChild("Tools")
local template = toolsFolder:FindFirstChild(item.toolName)
if not template then
 return deny(player, "Item unavailable")
end

local tool = template:Clone()
tool.Parent = player.Backpack
\`\`\`**Вже володієте?** Додатково: перевірте рюкзак/character перед наданням - забороніть дублікат або дозвольте стек для кожного дизайну.

**Корисне навантаження PurchaseResult:**\`(success: boolean, message: string, newBalance: number)\`Клієнт оновлює **CoinsLabel** з\`newBalance\`, а не місцева математика.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Невідомий ідентифікатор предмета → помилка, монети немає
- [ ] 0 монет → "Недостатньо монет"
- [ ] Дійсна покупка → інструмент у рюкзаку + знижка на монети
- [ ] Швидкі кліки → лише одна покупка (блокування)
- [ ] Зберегти:\`Lesson 7.4 - Server Shop\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Клієнт надсилає ціну на FireServer",
 explanation: "Експлойт: ціна = 0.",
 correctApproach: "Сервер читає ціну ShopConfig",
 },
 {
 mistake: "Без блокування покупки",
 explanation: "Подвійні витрати на швидкі кліки.",
 correctApproach: "блокування покупки на гравця",
 },
 {
 mistake: "Віднімати монети після невдачі надання",
 explanation: "Гравець платить, не отримує нічого.",
 correctApproach: "Інструмент перевірки існує перед відрахуванням або відшкодуванням у pcall",
 },
 {
 mistake: "ShopItems у ReplicatedStorage",
 explanation: "Ризик фальсифікації.",
 correctApproach: "Тільки для сервера ModuleScript",
 },
 ],
 summary: "Ви впровадили ShopConfig на стороні сервера, перевірку монет, блокування покупок, гранти інструментів і PurchaseResult із живим балансом - економіка магазину тепер безпечна та справедлива.",
 practiceTask: {
 title: "Захищений магазин серверів (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Реальні покупки з повноваженнями сервера.

### Part A - Конфігурація (8 хв)
1. ShopConfig ModuleScript із 3 товарами + ціни
2. Folder інструментів у ServerStorage (прості інструменти підходять)
3. PlayerAdded → Монети = 100

### Part B - ShopServer (15 хв)
1. Обробник RequestPurchase - повний 6-кроковий потік
2. purchaseLock + pcall
3. PurchaseResult з newBalance

### Part C - Перевірте та збережіть (2 хв)
1. Купуйте меч - випадають монети, з'являється інструмент
2. Купівля за 0 монет - відмовлено
3. **Зберегти в Roblox** →\`Lesson 7.4 - Server Shop\` 4. **Практика завершена**`,
 hints: [
 "Друк аналітики: гравець, itemId, успіх - допомагає збалансувати",
 "Помічник deny() запускає PurchaseResult false + поточний баланс",
 "Видаліть повноваження DISPLAY_PRICES з міток клієнта в 7.5",
 ],
 optionalChallenge: "Рядок виводу (print) сервера для кожної спроби покупки з результатом.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Реальні ціни на товари діють...",
 options: [
 "Server ShopConfig",
 "Лише текст кнопки клієнта",
 "Terrain",
 "Sky",
 ],
 correctAnswer: 0,
 explanation: "Повноваження сервера.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Клієнт повинен надіслати...",
 options: [
 "лише item id",
 "Ціна та монети",
 "Пароль адміна",
 "Terrain id",
 ],
 correctAnswer: 0,
 explanation: "Мінімальне корисне навантаження.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "purchaseLock запобігає...",
 options: [
 "Гонка double-spend",
 "Ходьба",
 "Camera",
 "Sound",
 ],
 correctAnswer: 0,
 explanation: "Одночасні покупки.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Монети IntValue належать до...",
 options: [
 "leaderstats на сервері",
 "Lighting",
 "ReplicatedFirst",
 "Лише Workspace",
 ],
 correctAnswer: 0,
 explanation: "Таблиця лідерів + сервер.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Інструмент надання означає клонування до...",
 options: [
 "player.Backpack",
 "Terrain",
 "Lighting",
 "ServerStorage",
 ],
 correctAnswer: 0,
 explanation: "Інвентар гравця.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Недостатньо монет має...",
 options: [
 "Відмовити без списання",
 "Видати предмет безкоштовно",
 "Кикнути гравця",
 "Видалити магазин",
 ],
 correctAnswer: 0,
 explanation: "Помилка перевірки.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "pcall навколо покупки допомагає...",
 options: [
 "Зняти lock при помилках",
 "Пропустити validation",
 "Прибрати UI",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Безпечне очищення.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "PurchaseResult має містити...",
 options: [
 "success, message, new balance",
 "Лише колір",
 "Terrain id",
 "Нічого",
 ],
 correctAnswer: 0,
 explanation: "Клієнт оновлює інтерфейс користувача.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 7.4 базується на...",
 options: [
 "Lesson 7.3 shop UI",
 "Лише гонки Lesson 6",
 "Lesson 1 terrain",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "UI + серверна логіка.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 7.4 зберегти назву...",
 options: [
 "Lesson 7.4 - Server Shop",
 "Shop UI",
 "Shop Works",
 "Two Worlds",
 ],
 correctAnswer: 0,
 explanation: "Зберегти серверний урок.",
 },
 ],
 },
}

export const ukLesson75 = {
 lessonId: "lesson-roblox-7-5",
 moduleId: "module-07",
 order: 5,
 title: "7.5 - RemoteFunction",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть GetShopCatalog RemoteFunction у ReplicatedStorage",
 "Повернути список безпечних елементів із сервера OnServerInvoke",
 "Динамічно створюйте картки інтерфейсу магазину з каталогу",
 "Правильно виберіть RemoteEvent проти RemoteFunction",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**RemoteEvent** = лист (без миттєвої відповіді). **RemoteFunction** = запитання з **відповіддю**.

Використовуйте, коли клієнту потрібні дані **зараз**: каталог магазину, перевірка балансу монет.

**Хід уроку:**
1. **Теорія (40 хв)** - Шаблон InvokeServer
2. **Практика (~25 хв)** - динамічний інтерфейс каталогу
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 7.4 - Магазин серверів**.`,
 },
 {
 title: "RemoteFunction проти RemoteEvent",
 content: `| Інструмент | Візерунок | Підходить для |
|------|---------|----------|
| **RemoteEvent** | Вогонь і забудь | Купити предмет, почати гонку |
| **RemoteFunction** | Викликати і чекати | Отримати каталог, отримати статистику |\`\`\`lua
-- Client waits for return
local catalog = GetShopCatalog:InvokeServer()
\`\`\`**Не** викликайте сервер кожного кадру - викликає затримку.`,
 },
 {
 title: "Сервер GetShopCatalog",
 content: `**ReplicatedStorage** → **RemoteFunction**\`GetShopCatalog\`**ShopServer** (або CatalogService):\`\`\`lua
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
\`\`\`Повернути **тільки безпечні поля** - без секретних позначок адміністратора, без екземплярів інструментів.`,
 },
 {
 title: "Динамічний інтерфейс клієнта",
 content: `\`ShopClient\`- у відкритому магазині:\`\`\`lua
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
\`\`\`**Немає жорстко закодованих цін для клієнта** - мітки з каталогу серверів.`,
 },
 {
 title: "Додатково: GetCoinBalance",
 content: `Друга **RemoteFunction**\`GetCoinBalance\`:\`\`\`lua
GetCoinBalance.OnServerInvoke = function(player)
 local coins = player.leaderstats and player.leaderstats:FindFirstChild("Coins")
 return coins and coins.Value or 0
end
\`\`\`Клієнт **CoinsLabel** оновлює інформацію про відкриття магазину + після кожного PurchaseResult.

**RemoteEvent** все ще обробляє покупки - функція лише **читає** дані.`,
 },
 {
 title: "pcall і збої",
 content: `\`\`\`lua
local ok, result = pcall(function()
 return GetShopCatalog:InvokeServer()
end)

if not ok then
 warn("Catalog failed:", result)
 StatusLabel.Text = "Shop offline - try again"
 return
end
\`\`\`Помилки сервера, тайм-аути або кіки не повинні назавжди порушувати інтерфейс користувача.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] GetShopCatalog повертає 3 елементи, відсортовані за ціною
- [] Інтерфейс користувача створює картки з даних сервера
- [ ] Зміна ціни ShopConfig оновлює інтерфейс користувача після повторного відкриття
- [ ] Buy все ще використовує RequestPurchase RemoteEvent
- [ ] Зберегти:\`Lesson 7.5 - RemoteFunction\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "InvokeServer для кожної покупки",
 explanation: "Використовуйте RemoteEvent для дій.",
 correctApproach: "Подія = покупка, функція = каталог",
 },
 {
 mistake: "Повернення екземплярів інструменту в каталозі",
 explanation: "Важкий і ризикований.",
 correctApproach: "Тільки ідентифікатор повернення, назва, ціна",
 },
 {
 mistake: "Немає pcall на InvokeServer",
 explanation: "Інтерфейс ламається через помилку.",
 correctApproach: "pcall + повідомлення користувача",
 },
 {
 mistake: "Жорстко закодовані кнопки ТА каталог",
 explanation: "Дублюючий дрейф.",
 correctApproach: "Лише динамічні карти",
 },
 ],
 summary: "Ви додали функцію GetShopCatalog RemoteFunction, щоб сервер повертав відсортований список товарів, а клієнт динамічно створював картки магазинів - жодних невідповідних жорстко закодованих цін.",
 practiceTask: {
 title: "Динамічний завантажувач каталогу (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Інтерфейс користувача з каталогу сервера.

### Part A - RemoteFunction (10 хв)
1. GetShopCatalog у ReplicatedStorage
2. OnServerInvoke створює список з ShopConfig
3. Сортувати за зростанням ціни

### Part B - Динамічний інтерфейс користувача (12 хв)
1. Рамка шаблону картки (прихована)
2. У відкритому магазині - pcall InvokeServer, клонувати карти
3. Кожна покупка запускає RequestPurchase(item.id)

### Part C - Зберегти (3 хв)
1. Змініть одну ціну в ShopConfig - повторно відкрийте магазин - UI відповідає
2. **Зберегти в Roblox** →\`Lesson 7.5 - RemoteFunction\` 3. **Практика завершена**`,
 hints: [
 "Знищіть старі динамічні карти перед відновленням",
 "Тримайте шаблон поза ItemList або чітко позначте його",
 "Оновлення CoinsLabel після покупки все ще використовує PurchaseResult",
 ],
 optionalChallenge: "GetOwnedItems RemoteFunction + значок «У власності» на картках.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "RemoteFunction призначений для...",
 options: [
 "Запит із миттєвим поверненням",
 "Лише fire-and-forget",
 "Terrain",
 "Welds",
 ],
 correctAnswer: 0,
 explanation: "Викликати шаблон.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "InvokeServer викликається з...",
 options: [
 "LocalScript",
 "Server Script",
 "Terrain",
 "Lighting",
 ],
 correctAnswer: 0,
 explanation: "Клієнт запитує дані.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "OnServerInvoke працює на...",
 options: [
 "Server",
 "Лише клієнт",
 "Обидва",
 "Жоден",
 ],
 correctAnswer: 0,
 explanation: "Сервер повертає дані.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "При покупці варто використовувати...",
 options: [
 "RemoteEvent RequestPurchase",
 "RemoteFunction кожен клік",
 "Terrain",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Дії використовують події.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Каталог має повернутися...",
 options: [
 "id, name, price only",
 "Повні admin keys",
 "Паролі гравців",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Безпечні поля.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "pcall навколо InvokeServer...",
 options: [
 "Коректно обробляє збої",
 "Прибирає сервер",
 "Видаляє UI",
 "Банить гравців",
 ],
 correctAnswer: 0,
 explanation: "Обробка помилок.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Кожен фрейм InvokeServer поганий, оскільки...",
 options: [
 "Спричиняє лаг",
 "Покращує FPS",
 "Потрібно",
 "Безкоштовні Robux",
 ],
 correctAnswer: 0,
 explanation: "Блокування спаму.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Динамічний інтерфейс означає...",
 options: [
 "Картки з каталогу сервера",
 "Без Scripts",
 "Ціни лише на клієнті",
 "Без магазину",
 ],
 correctAnswer: 0,
 explanation: "Жодного жорстко закодованого дрейфу.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 7.5 базується на...",
 options: [
 "Lesson 7.4 ShopConfig",
 "Lesson 2 obby",
 "Lesson 12 publish",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Дані магазину серверів.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 7.5 зберегти назву...",
 options: [
 "Lesson 7.5 - RemoteFunction",
 "Server Shop",
 "Shop Works",
 "Two Worlds",
 ],
 correctAnswer: 0,
 explanation: "Зберегти функціональний урок.",
 },
 ],
 },
}

export const ukLesson76 = {
 lessonId: "lesson-roblox-7-6",
 moduleId: "module-07",
 order: 6,
 title: "7.6 - Checkpoint: Магазин працює",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Інтегруйте інтерфейс користувача, покупки RemoteEvent і каталог RemoteFunction",
 "Пройдіть перевірку якості та експлойт для двох гравців",
 "Використовуйте один ShopConfig ModuleScript як єдине джерело правди",
 "Відвантажити модуль 7 - зберегти портфоліо Shop Works",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Shop Works** = завершити модуль 7.

**Стопка:**
- 7.1 Довіра + пінг
- 7.2 Шаблон RemoteEvent
- 7.3 Магазин ScreenGui
- 7.4 Перевірка сервера + монети + інструменти
- 7.5 Динамічний каталог через RemoteFunction

**Хід уроку:**
1. **Теорія (40 хв)** - інтеграційний контрольний список
2. **Практика (~40 хв)** - QA + остаточне збереження
3. **Вікторина (10 хв)** - проходження **70%**`,
 },
 {
 title: "Карта архітектури",
 content: `\`\`\`
ReplicatedStorage
├── RequestPurchase (RemoteEvent) → buy
├── PurchaseResult (RemoteEvent) → feedback
└── GetShopCatalog (RemoteFunction) → catalog

ServerScriptService
├── ShopConfig (ModuleScript) → items + prices
└── ShopServer (Script) → economy

StarterGui/ShopGui
└── ShopClient (LocalScript) → UI + Invoke + Fire
\`\`\`**Один конфігураційний файл** - відсутність повторюваних таблиць цін на клієнті.`,
 },
 {
 title: "Контрольний список інтеграції",
 content: `| # | Вимога | Пройти |
|---|-------------|------|
| 1 | Каталог завантажується з GetShopCatalog | |
| 2 | Ціни відповідають ShopConfig (без повноважень клієнта) | |
| 3 | Купити відраховує монети лише на сервері | |
| 4 | Інструмент з’являється в Backpack | |
| 5 | PurchaseResult оновлює статус + баланс | |
| 6 | Ідентифікатор невідомого елемента відхилено | |
| 7 | Нуль монет → видалити повідомлення про помилку | |
| 8 | Немає помилок у виведенні протягом 5 покупок | |`,
 },
 {
 title: "Протокол тесту для двох гравців",
 content: `**Студія → Тест → Почати** з **2 гравцями**:

1. Обидва відкриті магазини - каталоги збігаються
2. Гравець A купує меч - монети A випадають, B залишаються без змін
3. Гравець B купує щит - незалежні запаси
4. Швидка покупка - без подвійних витрат
5. **Тест експлойту:** клієнт не може підробити ціну FireServer (сервер ігнорує)

Необов’язково: панель команд не може надавати безкоштовні предмети без сервера (переконайтеся, що немає клієнтських Scripts монет).`,
 },
 {
 title: "Крайові корпуси",
 content: `Перевірте кожен:
- **Невідомий ідентифікатор** → «Невідомий предмет», монети без змін
- **0 монет** → «Недостатньо монет»
- **Магазин знову відкрито** → каталог перебудовано чисто
- **Відключити під час покупки** → блокування знято (pcall)

**Віддалене іменування:** префікс допомагає великим іграм:\`Shop_RequestPurchase\`- поліроль за бажанням.`,
 },
 {
 title: "60-секундний демонстраційний Script",
 content: `Запис або репетиція:
1. Показати монети в таблиці лідерів (100 стартів)
2. Відкритий магазин - 3 позиції з каталогу
3. Купити меч - Обробка → успіх, інструмент оснащений
4. Показати зменшений баланс монет
5. Невдала покупка після того, як витратите всі монети
6. Закрити магазин

**Зберегти:**\`Module 7 - Shop Works\``,
 },
 {
 title: "Попередній перегляд модуля 8",
 content: `**Модуль 8 - Розумна гра** додає **NPC**, діалоги та розумніші світи. Пізніше ваш магазин може перебувати там же, де й торговець NPC.

**Перед тренуванням:**
- [ ] Усі 8 рядків контрольного списку пройдені
- [ ] Тест для двох гравців виконано
- [ ] Ескіз архітектури в примітках (необов'язково)
- [ ] **Зберегти в Roblox** →\`Module 7 - Shop Works\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Клієнт DISPLAY_PRICES все ще використовується після 7.5",
 explanation: "Дрейф ціни з сервера.",
 correctApproach: "Етикетки лише для каталогу",
 },
 {
 mistake: "Пропуск тесту для двох гравців",
 explanation: "Спільні помилки стану.",
 correctApproach: "Економіка незалежних гравців",
 },
 {
 mistake: "Копія ShopConfig на клієнті",
 explanation: "Експлуатувати поверхню.",
 correctApproach: "Лише Server ModuleScript",
 },
 {
 mistake: "Багато пультів з нечіткими назвами",
 explanation: "Налагодити кошмар.",
 correctApproach: "Очистити імена префіксів Shop_",
 },
 ],
 summary: "Ви інтегрували безпечну серверну логіку магазину, динамічне завантаження каталогу та багатокористувацьку перевірку якості в Shop Works. Модуль 7 завершено та готовий до демонстрації.",
 practiceTask: {
 title: "Здати Shop Works (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** checkpoint готового до виробництва міні-цеху.

### Part A - Інтеграція (15 хв)
1. Один ShopConfig - зв'язок ShopServer + ShopClient
2. Видаліть залишкові заглушки/жорстко закодовані ціни
3. CoinsLabel + StatusLabel + динамічні картки

### Part B - QA (20 хв)
1. Запустіть 8-рядковий контрольний список
2. Тест на 2 гравці + спроби експлойтів
3. Виправляйте помилки по черзі

### Part C - Збереження демо (5 хв)
1. 60-секундна репетиція проходження
2. **Зберегти в Roblox** →\`Module 7 - Shop Works\` 3. **Практика завершена**`,
 hints: [
 "Один ModuleScript запобігає дрейфу конфігурації",
 "Журнал покупок: гравець, itemId, результат",
 "Надійність перевершує додаткові предмети в checkpoint",
 ],
 optionalChallenge: "Панель історії покупок сесії - останні 5 покупок.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Shop Works включає...",
 options: [
 "UI + events + server shop + catalog function",
 "Лише UI",
 "Лише Terrain",
 "Без networking",
 ],
 correctAnswer: 0,
 explanation: "Повний модуль 7.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Тест для двох гравців підтверджує...",
 options: [
 "Незалежні баланси монет",
 "Один спільний гаманець",
 "Без сервера",
 "Лише Terrain",
 ],
 correctAnswer: 0,
 explanation: "Економія на гравця.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Єдине джерело правди - це...",
 options: [
 "ShopConfig ModuleScript",
 "Текст кнопки клієнта",
 "Chat",
 "Sky",
 ],
 correctAnswer: 0,
 explanation: "Одна конфігурація.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Підроблений ідентифікатор товару повинен...",
 options: [
 "Відхилити на сервері",
 "Видати безкоштовний Tool",
 "Краш гри",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Перевірка.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "GetShopCatalog використовує...",
 options: [
 "RemoteFunction",
 "Лише Terrain",
 "Weld",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Отримання каталогу.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "RequestPurchase використовує...",
 options: [
 "RemoteEvent",
 "RemoteFunction кожен кадр",
 "Лише DataStore",
 "Лише NPC",
 ],
 correctAnswer: 0,
 explanation: "Купити дію.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Модуль 7 зберегти назву...",
 options: [
 "Module 7 - Shop Works",
 "Race Launched",
 "Arena Ready",
 "Lesson 7.1",
 ],
 correctAnswer: 0,
 explanation: "Збереження контрольної точки.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 7.6 завершується...",
 options: [
 "Module 7 Network & Shop",
 "Module 12",
 "Module 1",
 "Лише монети",
 ],
 correctAnswer: 0,
 explanation: "Кінець модуля 7.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Тема наступного модуля...",
 options: [
 "Smart Game / NPCs",
 "Лише гонки",
 "Лише publishing",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Попередній перегляд модуля 8.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Контрольна точка має пріоритет...",
 options: [
 "Надійність важливіша за зайві фічі",
 "Максимум предметів",
 "Без тестів",
 "Економіка лише на клієнті",
 ],
 correctAnswer: 0,
 explanation: "QA мислення.",
 },
 ],
 },
}
