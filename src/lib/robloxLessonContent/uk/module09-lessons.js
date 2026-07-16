/** Rich UK content for Roblox Module 09 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson91 = {
 lessonId: "lesson-roblox-9-1",
 moduleId: "module-09",
 order: 1,
 title: "9.1 - ModuleScript: спільний код",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть ModuleScript із константами конфігурації та допоміжними функціями",
 "Потрібні модулі з кількох server Scripts",
 "Відокремте дані/конфігурацію від поведінки під час виконання",
 "Повернути чисту публічну таблицю API із модулів",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Модуль 9 - Системний архітектор** - ви створюєте **інвентар RPG** із чистим кодом, який можна багаторазово використовувати.

**Хід уроку:**
1. **Теорія (40 хв)** - шаблон ModuleScript
2. **Практика (~25 хв)** - модуль констант RPG
3. **Вікторина (10 хв)** - проходження **70%**

Використовуйте **Модуль 8 - Місце проживання** або новий:\`Lesson 9.1 - Modules\`.`,
 },
 {
 title: "Чому ModuleScript - це суперсила",
 content: `Без модулів ви копіюєте та вставляєте однакові числа в 10 Scripts.

**За допомогою ModuleScript ви можете:**
- Централізація правил (максимум слотів, стартове золото)
- Функції повторного використання (\`getMaxSlots(level)\`)
- Перевірте одну систему окремо
- Масштабуйте гру без хаосу

**Одне джерело правди** = менше помилок під час балансування.`,
 },
 {
 title: "Структура папок",
 content: `**ServerScriptService** → Folder **Modules**:\`\`\`
ServerScriptService
├── Modules/
│ ├── RPGConfig.lua (ModuleScript)
│ └── (later) Inventory.lua
├── InventoryService.lua (Script)
└── TestInventory.lua (Script - dev only)
\`\`\`Піктограма **ModuleScript** виглядає як фрагмент пазла. **Script** виконується; **ModuleScript** **потрібний**, а не автоматичний запуск.`,
 },
 {
 title: "Простий шаблон API модуля",
 content: `\`RPGConfig\`ModuleScript:\`\`\`lua
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
\`\`\`**Повернути одну таблицю** - це ваш публічний API.`,
 },
 {
 title: "Вимагати і використовувати",
 content: `Script **InventoryService**:\`\`\`lua
local RPGConfig = require(script.Parent.Modules.RPGConfig)

print("Starter gold:", RPGConfig.STARTER_GOLD)
print("Level 3 slots:", RPGConfig.getMaxSlots(3))
print("Valid rare?", RPGConfig.isValidRarity("rare"))
print("Valid fake?", RPGConfig.isValidRarity("legendary_plus"))
\`\`\`**Шлях має значення:**\`require\`використовує шлях екземпляра, а не імена файлів на диску.

**Вправа (5 хв):** Другий Script\`ShopBridge\`також вимагає\`RPGConfig\`- зміна\`STARTER_GOLD\`один раз обидва бачать нове значення.`,
 },
 {
 title: "Config проти модулів поведінки",
 content: `| Тип модуля | Тримає | Приклад |
|-------------|-------|---------|
| **Конфігурація** | Числа, кольори, визначення елементів | RPGConfig, ItemDatabase |
| **Поведінка** | Функції з логікою станів | Інвентар (заняття 9.2-9.3) |

Модулі **Config** рідко змінюються під час виконання.
Модулі **Поведінка** створюють об’єкти для кожного гравця.

Не ставити\`PlayerAdded\`in config modules - зберігати в Service Scripts.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Modules/RPGConfig ModuleScript
- [ ] Два Scripts вимагають його успішно
- [] getMaxSlots і isValidRarity працюють у Output
- [ ] Зберегти:\`Lesson 9.1 - ModuleScript\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Редагування ModuleScript, але неправильний потрібний шлях",
 explanation: "Старий модуль кешується або неправильний Script.",
 correctApproach: "вимагати (script.Parent.Modules.RPGConfig)",
 },
 {
 mistake: "ModuleScript запускається самостійно під час запуску",
 explanation: "Запускається лише за потреби.",
 correctApproach: "Вимагати зі Script",
 },
 {
 mistake: "Константи дублюються в магазині та інвентарі",
 explanation: "Дрейф при балансуванні.",
 correctApproach: "Один RPGConfig",
 },
 {
 mistake: "Нічого не повертається з модуля",
 explanation: "вимагати повернення нуль.",
 correctApproach: "повернути RPGConfig наприкінці",
 },
 ],
 summary: "Ви створили RPGConfig як спільний ModuleScript із константами та допоміжними функціями, вимагали його від кількох Scripts і відокремили конфігурацію від служб виконання - основу вашої системи інвентаризації RPG.",
 practiceTask: {
 title: "Перший спільний модуль (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Константи RPG, що використовуються в 2+ скриптах.

### Part A - RPGConfig (12 хв)
1. Модулі/RPGConfig із золотом, слотами, рідкісними кольорами
2. getMaxSlots(рівень) і isValidRarity(рідкість)

### Part B - Потрібен тест (10 хв)
1. InventoryService виводить значення
2. Для другого Script (TestModules) потрібен той самий модуль
3. Змінити STARTER_GOLD - обидва оновлення

### Part C - Зберегти (3 хв)
1. **Зберегти в Roblox** →\`Lesson 9.1 - ModuleScript\` 2. **Практика завершена**`,
 hints: [
 "Name модуля в Explorer = потрібен сегмент шляху",
 "Повертає лише загальнодоступний API - локальні помічники залишаються локальними",
 "Модуль 7 ShopConfig був такою ж ідеєю - тепер орієнтований на рольову гру",
 ],
 optionalChallenge: "Додайте getRarityColor(rarity), що повертає Color3 або nil.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "ModuleScript завантажується з...",
 options: [
 "require()",
 "FireServer()",
 "MoveTo()",
 "TakeDamage()",
 ],
 correctAnswer: 0,
 explanation: "потрібен модуль навантажень.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Модуль має повернутися...",
 options: [
 "Таблиця API",
 "Завжди нічого",
 "Terrain",
 "Player",
 ],
 correctAnswer: 0,
 explanation: "таблиця повернення модулів.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "RPGConfig містить...",
 options: [
 "Константи та спільні helpers",
 "Лише UI",
 "Лише звуки",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Модуль конфігурації.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Одна константа в одному місці запобігає...",
 options: [
 "Дрейф через копіювання",
 "Політ",
 "NPC dialogue",
 "Publishing",
 ],
 correctAnswer: 0,
 explanation: "Єдине джерело правди.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "ModuleScript не запускається автоматично, доки...",
 options: [
 "Потрібен іншим Script",
 "Гравець приєднується",
 "Terrain завантажується",
 "UI відкривається",
 ],
 correctAnswer: 0,
 explanation: "Потрібно не автоматично.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "getMaxSlots(рівень) належить до...",
 options: [
 "API модуля config або behavior",
 "Лише LocalScript",
 "Lighting",
 "StarterGui",
 ],
 correctAnswer: 0,
 explanation: "Спільна логіка.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Тема модуля 9...",
 options: [
 "Systems Architect / RPG inventory",
 "Лише гонки",
 "Лише shop UI",
 "Лише Terrain",
 ],
 correctAnswer: 0,
 explanation: "Name модуля.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Поділ конфігурації та поведінки означає...",
 options: [
 "Дані окремо від runtime services",
 "Без Scripts",
 "Лише клієнт",
 "Видалити модулі",
 ],
 correctAnswer: 0,
 explanation: "Архітектура.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 9.2 додає...",
 options: [
 "Таблиці інвентарю",
 "Лише NPC",
 "Лише автомобіль",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Наступний урок.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 9.1 зберегти назву...",
 options: [
 "Lesson 9.1 - ModuleScript",
 "RPG Inventory",
 "Living Location",
 "Shop Works",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson92 = {
 lessonId: "lesson-roblox-9-2",
 moduleId: "module-09",
 order: 2,
 title: "9.2 - Інвентар через таблицю",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Змоделюйте інвентар як таблицю слотів з itemId і кільк",
 "Реалізація addItem, removeItem, countItem з обмеженнями стеку",
 "Використовуйте модуль ItemDatabase для метаданих maxStack",
 "Повернути успіх/невдачу з рядками причини з операцій",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Таблиці - це **електронна таблиця** Roblox для інвентаризації. Сьогодні ви безпечно створюєте **додавання / видалення / підрахунок**.

**Хід уроку:**
1. **Теорія (40 хв)** - model ігрового столу
2. **Практика (~25 хв)** - модуль інвентарних операцій
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 9.1 - ModuleScript**.`,
 },
 {
 title: "Model інвентарного столу",
 content: `\`\`\`lua
local inventory = {
 slots = {
 [1] = { itemId = "potion_small", qty = 3 },
 [2] = { itemId = "sword_bronze", qty = 1 },
 [3] = nil, -- empty slot
 },
 maxSlots = 12,
}
\`\`\`| Поле | Значення |
|-------|---------|
| **слоти** | Масивоподібна таблиця 1..maxSlots |
| **itemId** | Ключ рядка в ItemDatabase |
| **кількість** | Кількість стеків |
| **нульовий слот** | Порожній |`,
 },
 {
 title: "Метадані ItemDatabase",
 content: `\`Modules/ItemDatabase\`ModuleScript:\`\`\`lua
local ItemDatabase = {
 potion_small = { name = "Small Potion", maxStack = 10, rarity = "common" },
 sword_bronze = { name = "Bronze Sword", maxStack = 1, rarity = "common" },
 gem_blue = { name = "Blue Gem", maxStack = 99, rarity = "rare" },
}

function ItemDatabase.get(itemId)
 return ItemDatabase[itemId]
end

return ItemDatabase
\`\`\`**maxStack = 1** для спорядження, **10+** для витратних матеріалів.`,
 },
 {
 title: "помічник findItemSlot",
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
 title: "функція addItem",
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
 title: "removeItem і countItem",
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
\`\`\`**Повернення (успіх, причина)** - інтерфейс користувача може відображати «Інвентар повний».`,
 },
 {
 title: "Захисне кодування",
 content: `Завжди охороняйте:\`\`\`lua
if not inventory or not inventory.slots then
 return false, "invalid_inventory"
end
\`\`\`**Тестовий Script** викликає додавання/видалення у виводі - для перевірки логіки не потрібен програвач.

**Контрольний список перед тренуваннями:**
- [ ] addItem накопичує зілля до maxStack
- [ ] addItem завершується помилкою, коли заповнено з причиною
- [ ] removeItem очищає слот із кількістю 0
- [ ] countItem accurate
- [ ] Зберегти:\`Lesson 9.2 - Inventory Tables\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Немає перевірки на невідомий itemId",
 explanation: "Нуль помилок.",
 correctApproach: "ItemDatabase.get guard",
 },
 {
 mistake: "кількість нижче 0 не заблоковано",
 explanation: "Негативні стеки.",
 correctApproach: "кількість <= 0 повертає false",
 },
 {
 mistake: "Забувши про відсутність порожніх слотів",
 explanation: "Неправильно пропускає слоти.",
 correctApproach: "Явний nil для пустого",
 },
 {
 mistake: "Копіювання логіки в 5 Scripts",
 explanation: "Дрейф.",
 correctApproach: "Модуль InventoryOps",
 },
 ],
 summary: "Ви змоделювали інвентар за допомогою таблиць слотів, створили addItem/removeItem/countItem із обмеженнями стеків і чіткими причинами помилок, а також централізовані правила щодо предметів у ItemDatabase - готові до об’єктів для кожного гравця наступного уроку.",
 practiceTask: {
 title: "Операції з інвентарним столом (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Робоче додавання/видалення/рахування за допомогою тестів.

### Part A - Дані (8 хв)
1. ItemDatabase з 3 елементами + maxStack
2. Модуль InventoryOps з помічниками

### Part B - Операції (15 хв)
1. addItem - стек + новий слот + повна помилка
2. removeItem + countItem
3. Script TestInventory виводить результати 6 тестів

### Part C - Зберегти (2 хв)
1. **Зберегти в Roblox** →\`Lesson 9.2 - Inventory Tables\` 2. **Практика завершена**`,
 hints: [
 "Друк ок, причина з кожного дзвінка",
 "Завдання переповнення: перейдіть до наступного слота, коли стек заповнений",
 "Використовуйте RPGConfig.getMaxSlots для поля maxSlots",
 ],
 optionalChallenge: "Коли стек заповнений, автоматичне заповнення наступного порожнього слота залишком.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Порожнє місце для інвентарю - це...",
 options: [
 "nil",
 "0",
 "false string",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "nil = порожній.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "maxStack походить від...",
 options: [
 "ItemDatabase",
 "Кнопка клієнта",
 "Sky",
 "Випадково",
 ],
 correctAnswer: 0,
 explanation: "Метадані елемента.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "addItem повертає false, коли...",
 options: [
 "Інвентар повний або невалідний",
 "Завжди",
 "Ніколи",
 "При стрибку",
 ],
 correctAnswer: 0,
 explanation: "Невдача з причиною.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "findItemSlot шукає за...",
 options: [
 "itemId match",
 "Ім’я гравця",
 "Лише колір",
 "Час",
 ],
 correctAnswer: 0,
 explanation: "Пошук стека.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "removeItem у кількості 0 має...",
 options: [
 "Встановити слот у nil",
 "Краш",
 "Дублікат предмета",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Очистити порожній слот.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Захисні перевірки запобігають...",
 options: [
 "Runtime-помилки через погані дані",
 "Ходьба",
 "UI",
 "Sound",
 ],
 correctAnswer: 0,
 explanation: "Нульова охорона.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "InventoryOps має бути...",
 options: [
 "ModuleScript",
 "Terrain",
 "Sound",
 "ProximityPrompt",
 ],
 correctAnswer: 0,
 explanation: "Спільний модуль.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 9.2 базується на...",
 options: [
 "Lesson 9.1 RPGConfig",
 "Лише Lesson 6",
 "Порожньо",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Шлях модуля.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 9.3 додає...",
 options: [
 "Таблиці як об’єкти з metatables",
 "Лише dialogue",
 "Лише гонки",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Інвентаризація в ООП-стилі.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 9.2 зберегти назву...",
 options: [
 "Lesson 9.2 - Inventory Tables",
 "ModuleScript",
 "RPG Inventory",
 "Shop UI",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson93 = {
 lessonId: "lesson-roblox-9-3",
 moduleId: "module-09",
 order: 3,
 title: "9.3 - Таблиці як об'єкти",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть клас інвентаризації з метатаблицею та __index",
 "Впроваджувати нові, додавати, видаляти, серіалізувати для кожного гравця",
 "Зберігайте таблицю PlayerInventory в InventoryService",
 "Використовуйте виклики самостійних методів для читабельного коду ООП",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Замість проходження\`inventory\`таблиці скрізь, кожен гравець отримує **Об’єкт інвентарю** з методами.

**Хід уроку:**
1. **Теорія (40 хв)** - шаблон метатаблиці
2. **Практика (~25 хв)** - Inventory.new на гравця
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 9.2 - Інвентарні таблиці**.`,
 },
 {
 title: "Таблиці можуть діяти як об’єкти",
 content: `Lua не має класів - **метатаблиці** імітують їх:\`\`\`lua
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

\`inv:add("potion_small", 2)\`читається чистіше, ніж\`InventoryOps.addItem(inv, ...)\`.`,
 },
 {
 title: "Методи з собою",
 content: `\`Modules/Inventory.lua\`- вимагає InventoryOps + ItemDatabase:\`\`\`lua
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
\`\`\`**Синтаксис двокрапки**\`inv:add()\`проходить\`self\`автоматично.`,
 },
 {
 title: "серіалізувати для збереження пізніше",
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
\`\`\`Урок **9.5** зберігає це в DataStore - сьогодні просто виведіть (print) JSON-подібну таблицю.`,
 },
 {
 title: "InventoryService для кожного гравця",
 content: `\`InventoryService\`Script:\`\`\`lua
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
\`\`\`**Ніколи** не зберігайте екземпляр Player в об’єкті Inventory - використовуйте\`playerInventories[player]\`карта.`,
 },
 {
 title: "Чому це ваги",
 content: `| Підхід | Проблема |
|----------|---------|
| Одна глобальна інвентаризація | Усі гравці діляться предметами |
| Гігантський Script | Нечитабельний |
| **Об’єкт для кожного гравця** | Чистий, перевірений |\`\`\`lua
local inv = playerInventories[player]
print("Potions:", inv:count("potion_small"))
\`\`\`Готовий до **статистики спорядження** в 9.4.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Inventory.new на PlayerAdded
- [ ] inv:add / inv:remove працюють у Play
- [ ] serialize виводить валідну таблицю
- [ ] PlayerRemoving очищає пам'ять
- [ ] Зберегти:\`Lesson 9.3 - Inventory Object\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Забув інвентар.__index = Інвентар",
 explanation: "Відсутні методи.",
 correctApproach: "Встановіть __index перед методами",
 },
 {
 mistake: "Крапка замість двокрапки",
 explanation: "себе дорівнює нулю.",
 correctApproach: "inv:add() не inv.add()",
 },
 {
 mistake: "Один глобальний інвентар для всіх",
 explanation: "Помилка спільного луту.",
 correctApproach: "PlayerInventory[гравець]",
 },
 {
 mistake: "Зберігання гравця в інвентарі",
 explanation: "Ризик витоку пам'яті.",
 correctApproach: "Зовнішня карта гравця",
 },
 ],
 summary: "Ви переробили інвентаризацію в об’єктно-подібний модуль із new/add/remove/serialize, підключеними екземплярами для кожного гравця в InventoryService та підготували серіалізацію для DataStore у наступних уроках.",
 practiceTask: {
 title: "Інвентар як об'єкт (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Об’єкти інвентарю для кожного гравця.

### Part A - Модуль інвентаризації (12 хв)
1. Inventory.new, __index, add, remove, count
2. серіалізація + десеріалізація
3. Завершіть InventoryOps з 9.2

### Part B - Обслуговування (10 хв)
1. InventoryService PlayerAdded/Removing
2. Стартові зілля при приєднанні
3. Play - вивести inv:count у тесті команди

### Part C - Зберегти (3 хв)
1. **Зберегти в Roblox** →\`Lesson 9.3 - Inventory Object\` 2. **Практика завершена**`,
 hints: [
 "Двокрапка: для методів крапка. лише якщо ви передаєте себе вручну",
 "десеріалізувати для тестування збережених даних у вихідних даних",
 "Додатковий getWeight() підсумовує вагу елемента з бази даних",
 ],
 optionalChallenge: "getWeight() забезпечує максимальну вагу переносу з RPGConfig.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "setmetatable з __index дозволяє...",
 options: [
 "Виклики методів на таблиці",
 "Редагування Terrain",
 "FireServer",
 "Лише Welds",
 ],
 correctAnswer: 0,
 explanation: "ООП-стиль.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "inv:add() проходить...",
 options: [
 "self як перший arg",
 "Нічого",
 "Terrain",
 "IP сервера",
 ],
 correctAnswer: 0,
 explanation: "Синтаксис двокрапки.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "playerInventory[player] зберігає...",
 options: [
 "Об’єкт інвентарю цього гравця",
 "Глобальний спільний лут",
 "Terrain",
 "Лише UI",
 ],
 correctAnswer: 0,
 explanation: "На кожного гравця.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "серіалізувати повернення...",
 options: [
 "Таблиця для збереження",
 "Character гравця",
 "Лише екземпляр Tool",
 "Завжди nil",
 ],
 correctAnswer: 0,
 explanation: "Підготовка DataStore",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Вилучення гравця має...",
 options: [
 "Очистити запис playerInventories",
 "Видалити всіх гравців",
 "Зупинити сервер",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Очищення пам'яті.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Inventory.new(maxSlots) - це...",
 options: [
 "Constructor",
 "RemoteEvent",
 "Terrain brush",
 "Animation",
 ],
 correctAnswer: 0,
 explanation: "Створює екземпляр.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Уникайте зберігання Player в інвентарі, оскільки...",
 options: [
 "Чистіша карта поза об’єктом",
 "Потрібно Roblox",
 "Блокує UI",
 "Прибирає Humanoid",
 ],
 correctAnswer: 0,
 explanation: "Інкапсуляція.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 9.3 базується на...",
 options: [
 "Lesson 9.2 InventoryOps",
 "Лише Lesson 1.1",
 "Лише Module 6",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Рефакторинг таблиць.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 9.4 додає...",
 options: [
 "Спорядження та stats",
 "Лише NPC",
 "Лише publish",
 "Race timer",
 ],
 correctAnswer: 0,
 explanation: "Обладнання.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 9.3 зберегти назву...",
 options: [
 "Lesson 9.3 - Inventory Object",
 "ModuleScript",
 "Living Location",
 "Race Launched",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson94 = {
 lessonId: "lesson-roblox-9-4",
 moduleId: "module-09",
 order: 4,
 title: "9.4 - Екіпіровка та статистика",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Розширте ItemDatabase полями atk, hp, crit stat",
 "Відстежуйте слоти для зброї, броні та дрібничок на гравця",
 "Перерахуйте загальну статистику з бази + спорядження без зміни бази",
 "Статистику вогню змінено, щоб оновити HUD і бойову шкоду",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Інвентар містить предмети. **Спорядження** змінює предмети, **наскільки ви сильні**.

**Хід уроку:**
1. **Теорія (40 хв)** - обладнайте слоти + стат двигун
2. **Практика (~25 хв)** - 3 слоти + статистика HUD
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 9.3 - Об’єкт інвентаризації**.`,
 },
 {
 title: "Статистика спорядження в ItemDatabase",
 content: `Розширити\`ItemDatabase\`:\`\`\`lua
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
\`\`\`Поле **slot** повідомляє системі оснащення, до якого слота підходить предмет.`,
 },
 {
 title: "Таблиця екіпірованих предметів (окремо від інвентарю)",
 content: `\`playerEquipped[player]\`:\`\`\`lua
{
 weapon = "sword_bronze", -- itemId or nil
 armor = "armor_cloth",
 trinket = nil,
}
\`\`\`**Спорядження** видаляє 1 з інвентарю (або переміщує зі слота) і встановлює ідентифікатор обладнання.

**Unequip** повертає предмет в інвентар, якщо є місце.`,
 },
 {
 title: "Базова чи бонусна статистика",
 content: `\`playerBaseStats[player]\`:\`\`\`lua
{ atk = 10, hp = 100, crit = 0 }
\`\`\`**Ніколи** не роби\`baseAtk = baseAtk + 5\`постійно на екіпіровці.

**Перераховувати** кожного разу:\`\`\`lua
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
 title: "функція сервера equipItem",
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
\`\`\`**StatsChanged** RemoteEvent → клієнт оновлює HUD.`,
 },
 {
 title: "HUD і бойова синхронізація",
 content: `**StarterGui** →\`StatsUI\`:\`\`\`lua
StatsChanged.OnClientEvent:Connect(function(totals)
 AtkLabel.Text = "ATK: " .. totals.atk
 HpLabel.Text = "HP+: " .. totals.hp
 CritLabel.Text = "CRIT: " .. math.floor(totals.crit * 100) .. "%"
end)
\`\`\`**Модуль 5 бойових дій:** використання пошкодження мечем\`totals.atk\`на сервері при попаданні.

Одне спорядження → recalc → **StatsChanged** → UI + бій - три точки синхронізації.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] 3 слоти для обладнання працюють з інвентарю
- [ ] Оновлення HUD щодо екіпірування/зняття спорядження
- [ ] Основна статистика не змінена в таблиці playerBaseStats
- [ ] Неправильний елемент слота відхилено
- [ ] Зберегти:\`Lesson 9.4 - Gear Stats\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Постійне додавання атаки до бази на спорядженні",
 explanation: "Подвійний рахунок при переобладнанні.",
 correctApproach: "Динамічний calcStats",
 },
 {
 mistake: "Екіпіровані ідентифікатори без перевірки інвентарю",
 explanation: "Одягайте предмети-привиди.",
 correctApproach: "count(itemId) >= 1",
 },
 {
 mistake: "Немає слот-поля на предметах",
 explanation: "Слот для меча в броні.",
 correctApproach: "Перевірка meta.slot",
 },
 {
 mistake: "Клієнт встановлює atk IntValue",
 explanation: "Експлойт.",
 correctApproach: "Сервер calcStats + FireClient",
 },
 ],
 summary: "Ви додали слоти для спорядження зі статистикою ItemDatabase, динамічним обчисленням totalAtk/hp/crit, потоком спорядження/зняття спорядження та оновленнями StatsChanged HUD - тепер спорядження впливає на спосіб бою гравців.",
 practiceTask: {
 title: "Gear + стат двигун (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** 3 слоти + живий HUD.

### Part A - Дані (8 хв)
1. ItemDatabase atk/hp/crit + поле слота
2. Таблиці playerEquipped + playerBaseStats

### Part B - Спорядження (12 хв)
1. Обладнайте сервер calcStats
2. StatsChanged → StatsUI мітки
3. Випробування зброї + броні + дрібнички

### Part C - Зберегти (5 хв)
1. Одягніть меч - перевірте мітку ATK
2. **Зберегти в Roblox** →\`Lesson 9.4 - Gear Stats\` 3. **Практика завершена**`,
 hints: [
 "Безпечний: meta.atk або 0",
 "Unequip повертає предмет в інвентар перед новим екіпіруванням",
 "Додатковий множник епічної рідкості в статистиці",
 ],
 optionalChallenge: "Епічні предмети множать базову статистику предметів на 1,25.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Загальна статистика має бути...",
 options: [
 "База + бонуси спорядження (перерахунок)",
 "Лише здогадка клієнта",
 "Terrain",
 "Випадково",
 ],
 correctAnswer: 0,
 explanation: "Динамічний розрах.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Екіпірування не повинно постійно змінюватися...",
 options: [
 "playerBaseStats",
 "ItemDatabase",
 "Ім’я Module",
 "Версія Roblox",
 ],
 correctAnswer: 0,
 explanation: "База залишається базою.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Обладнання зберігається окремо від...",
 options: [
 "Слоти інвентарю",
 "Terrain",
 "Sky",
 "Sound",
 ],
 correctAnswer: 0,
 explanation: "Дві системи.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "meta.slot запобігає...",
 options: [
 "Equip у неправильний slot",
 "Ходьба",
 "Dialogue",
 "Patrol",
 ],
 correctAnswer: 0,
 explanation: "Перевірка.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "StatsChanged спрацьовує після...",
 options: [
 "Повний перерахунок",
 "Випадково",
 "Publish",
 "Генерація Terrain",
 ],
 correctAnswer: 0,
 explanation: "Подія синхронізації.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "sword_bronze maxStack 1 означає...",
 options: [
 "Спорядження не стакається",
 "Нескінченний стек",
 "Немає в базі",
 "Лише UI",
 ],
 correctAnswer: 0,
 explanation: "Правило обладнання.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Бойові пошкодження мають читатися...",
 options: [
 "Загальний atk на сервері",
 "Chat клієнта",
 "Текст кнопки",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Авторитет.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 9.4 базується на...",
 options: [
 "Lesson 9.3 inventory objects",
 "Лише Lesson 1",
 "Лише Module 6",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Потрібен інвентар.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 9.5 додає...",
 options: [
 "Серіалізація DataStore",
 "Лише NPC",
 "Лише гонки",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Наполегливість.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 9.4 зберегти назву...",
 options: [
 "Lesson 9.4 - Gear Stats",
 "Inventory Object",
 "RPG Inventory",
 "Shop Works",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson95 = {
 lessonId: "lesson-roblox-9-5",
 moduleId: "module-09",
 order: 5,
 title: "9.5 - Серіалізація інвентарю",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Серіалізуйте інвентаризацію та обладнані столи для DataStore",
 "Заощаджуйте на PlayerRemoving за допомогою pcall і версії схеми",
 "Завантажте на PlayerAdded і перевірте перед реконструкцією",
 "Обробляйте помилки збереження, не блокуючи ігровий процес",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Об’єкти мають **методи**. DataStore зберігає лише **прості таблиці**.

Сьогодні: **серіалізація → збереження → завантаження → десеріалізація**.

**Хід уроку:**
1. **Теорія (40 хв)** - зберегти схему + pcall
2. **Практика (~25 хв)** - наполегливість під час відпустки/приєднання
3. **Вікторина (10 хв)** - проходження **70%**

Повторне використання модуля 3 Основи **DataStore**.`,
 },
 {
 title: "Чому серіалізація важлива",
 content: `DataStore не може зберегти:
- Функції
- Метатаблиці
- Екземпляри (Інструменти в інвентарі - зберегти лише **itemId + qty**)

**Зберегти форму:**\`\`\`lua
{
 version = 1,
 inventory = { slots = {...}, maxSlots = 12 },
 equipped = { weapon = "sword_bronze", armor = nil, trinket = nil },
}
\`\`\``,
 },
 {
 title: "Функція SavePlayerData",
 content: `\`InventorySaveService\`Script:\`\`\`lua
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
 title: "Завантажте та перевірте",
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
\`\`\`**Перевірте** кожне поле, перш ніж довіряти - трапляється пошкодження даних.`,
 },
 {
 title: "Приєднатися та залишити проводку",
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
\`\`\`**Studio:** Увімкніть **Game Settings → Security → Enable Studio Access to API Services** для тестів DataStore.`,
 },
 {
 title: "Дросель і витончений провал",
 content: `| Правило | Чому |
|------|-----|
| Економте у відпустці, а не кожну секунду | Обмеження DataStore |
| pcall на Get/Set | Помилки не призводять до збою сервера |
| Журнали збоїв | Налагодження без зупинки гри |
| поле версії | Майбутні міграції схем |

Якщо збереження не вдасться, гравець все одно отримав задоволення від цього сеансу - увійдіть і повторіть спробу наступного виходу.

**Необов’язково:** автозбереження кожні 5 хвилин із усуненням стрибків (завдання).`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Вийти з гри → знову приєднатися → ті самі предмети в слотах
- [ ] Одягнене спорядження все ще є після повторного входу
- [ ] Новий гравець отримує стартовий інвентар
- [ ] Погані дані безпечно повертаються до стандартних значень
- [ ] Зберегти:\`Lesson 9.5 - Inventory Save\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Збереження без серіалізації",
 explanation: "Методи втрачені / помилка.",
 correctApproach: "inv:serialize() проста таблиця",
 },
 {
 mistake: "Немає pcall на SetAsync",
 explanation: "Помилка сервера під час збою.",
 correctApproach: "pcall + попередження",
 },
 {
 mistake: "Збереження кожного отриманого товару",
 explanation: "Заборона обмеження тарифу.",
 correctApproach: "Економте в першу чергу на відпустці",
 },
 {
 mistake: "Сліпо довіряти завантаженим даним",
 explanation: "Експлойт або збій.",
 correctApproach: "перевірки версії + типу",
 },
 ],
 summary: "Ви реалізували версії збереження корисних навантажень, безпечне завантаження DataStore для pcall і збереження під час приєднання та виходу, а також перевірку перед перебудовою об’єктів інвентарю - прогрес гравця тепер зберігається після повторної реєстрації.",
 practiceTask: {
 title: "Готовий інвентар (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Зберігати інвентар + обладнання після повторного входу.

### Part A - Серіалізація (10 хв)
1. buildSavePayload з версією = 1
2. savePlayer за допомогою pcall SetAsync
3. loadPlayer з перевіркою

### Part B - Провід (12 хв)
1. PlayerAdded навантаження або за замовчуванням
2. PlayerRemoving зберегти потім очистити карти
3. Увімкніть служби Studio API

### Part C - Повторний тест (3 хв)
1. Додати предмети, спорядити, залишити, знову приєднатися - перевірити
2. **Зберегти в Roblox** →\`Lesson 9.5 - Inventory Save\` 3. **Практика завершена**`,
 hints: [
 "Виведіть таблицю (print) серіалізації у вихідних даних перед першим збереженням",
 "Ключ UserId - унікальний для кожного гравця",
 "Модуль 3 DataStore урок однакові шаблони",
 ],
 optionalChallenge: "Перенесіть версію 1 → 2, якщо ви додаєте нові поля.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "DataStore зберігає...",
 options: [
 "Прості Lua-таблиці",
 "Functions",
 "Metatables",
 "Повні екземпляри Tool",
 ],
 correctAnswer: 0,
 explanation: "Серіалізовані дані.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "serialize перетворює об'єкт на...",
 options: [
 "Таблиця, безпечна для save",
 "Character гравця",
 "Terrain",
 "RemoteEvent",
 ],
 correctAnswer: 0,
 explanation: "Прості дані.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "pcall на SetAsync...",
 options: [
 "Запобігає крашу при збої",
 "Прискорює гру",
 "Прибирає UI",
 "Банить гравців",
 ],
 correctAnswer: 0,
 explanation: "Обробка помилок.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "поле версії під час збереження допомагає...",
 options: [
 "Майбутні міграції схеми",
 "Graphics",
 "Лише Sound",
 "Шлях NPC",
 ],
 correctAnswer: 0,
 explanation: "Версія схеми.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Економте в першу чергу на...",
 options: [
 "PlayerRemoving",
 "Кожен heartbeat",
 "Лише клік кнопки",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Дросель рятує.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Завантаження має підтвердити...",
 options: [
 "Types і version перед використанням",
 "Нічого",
 "Chat клієнта",
 "Випадково",
 ],
 correctAnswer: 0,
 explanation: "Безпечне навантаження.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Ключове використання...",
 options: [
 "Player UserId",
 "Лише ім’я гравця",
 "Випадково",
 "Terrain id",
 ],
 correctAnswer: 0,
 explanation: "Унікальний ключ.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 9.5 базується на...",
 options: [
 "9.3 serialize + 9.4 equipped",
 "Lesson 1 terrain",
 "Порожньо",
 "Лише publish",
 ],
 correctAnswer: 0,
 explanation: "Повний стан RPG.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 9.6 - це...",
 options: [
 "Checkpoint RPG Inventory",
 "Лише shop",
 "Лише гонки",
 "Лише NPC",
 ],
 correctAnswer: 0,
 explanation: "Фінал модуля.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 9.5 зберегти назву...",
 options: [
 "Lesson 9.5 - Inventory Save",
 "Gear Stats",
 "ModuleScript",
 "Living Location",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson96 = {
 lessonId: "lesson-roblox-9-6",
 moduleId: "module-09",
 order: 6,
 title: "9.6 - Checkpoint: RPG Inventory",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Інтегруйте модулі, інвентар, статистику спорядження та постійність DataStore",
 "Пройдіть тести Script повторної реєстрації для предметів, спорядження та порядку слотів",
 "Схема архітектури документа для розширення",
 "Збережіть модуль 9 - RPG Inventory у портфоліо",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Інвентар RPG** = Портфоліо модуля 9 - доводить, що ви мислите як **архітектор систем**.

**Необхідний доказ:**
- Модульний код (RPGConfig, ItemDatabase, Inventory, services)
- Складаний інвентар + спорядження
- Статистика впливає на HUD (і бій, якщо пов'язано)
- Зберегти/завантажити після повторного входу

**Зберегти:**\`Module 9 - RPG Inventory\``,
 },
 {
 title: "Карта архітектури",
 content: `\`\`\`
ServerScriptService
├── Modules/
│ ├── RPGConfig.lua
│ ├── ItemDatabase.lua
│ ├── InventoryOps.lua
│ └── Inventory.lua
├── InventoryService.lua (PlayerAdded, give items)
├── EquipmentService.lua (equip, calcStats)
└── InventorySaveService.lua (DataStore)

ReplicatedStorage
├── StatsChanged (RemoteEvent)
└── (shop/events from other modules optional)

StarterGui
├── StatsUI
└── InventoryUI (optional simple list)
\`\`\`**One ItemDatabase** - магазини, квести та скидання посилаються на однакові ідентифікатори.`,
 },
 {
 title: "Сценарні тести (relog)",
 content: `| # | Тест | Пройти |
|---|------|------|
| 1 | Візьміть / додайте 3 зілля → повторно ввійдіть → ще 3 | |
| 2 | Одягнути меч → перереєструватися → все ще в комплекті, ATK правильна | |
| 3 | Заповнити інвентар → повторний журнал → порядок слотів збережено | |
| 4 | Видалити елемент → повторний журнал → видалення зберігається | |
| 5 | Новий гравець → стартові елементи, без помилок | |
| 6 | 2 гравці → окремі збереження | |`,
 },
 {
 title: "Команда налагодження",
 content: `\`\`\`lua
-- Admin test in Studio only
local function debugPrintSave(player)
 local payload = buildSavePayload(player)
 print(game:GetService("HttpService"):JSONEncode(payload))
end
\`\`\`Використовуйте **Output**, щоб перевірити серіалізацію, перш ніж звинувачувати DataStore.

**Архітектурний документ** (примітки): 5 пунктів - що робить кожен модуль.`,
 },
 {
 title: "Смужка якості checkpoint",
 content: `| Бар | Стандарт |
|-----|----------|
| Модулі | Немає повторюваних визначень елементів |
| Інвентар | додати/видалити причини ясно |
| Механізм | calcStats, не мутована база |
| Зберегти | pcall + версія + перевірка |
| Output | Немає червоних помилок у 6 тестах |

**60-секундна демонстрація:**
1. Показати статистику HUD
2. Додати зілля, спорядити меч - ATK вгору
3. Вийти + знову приєднатися - довести наполегливість
4. Показати структуру папок модуля`,
 },
 {
 title: "Попередній перегляд модуля 10",
 content: `**Модуль 10 - Магія Parts** додає **обмеження**, фізику полірування, рухомі двері - ваш центр RPG може отримувати механічні пастки та підйомники.

**Перед тренуванням:**
- [ ] Усі 6 playtest-перевірок пройдені
- [ ] Написані нотатки про архітектуру
- [ ] **Зберегти в Roblox** →\`Module 9 - RPG Inventory\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Визначення предметів у магазині ТА окрема таблиця інвентарю",
 explanation: "ID невідповідність.",
 correctApproach: "One ItemDatabase",
 },
 {
 mistake: "Пропуск тесту спорядження для повторного входу",
 explanation: "Зламаний checkpoint.",
 correctApproach: "Тест 2 є обов'язковим",
 },
 {
 mistake: "Побічні ефекти в серіалізації",
 explanation: "Змінює живий інвентар.",
 correctApproach: "Копія лише для читання",
 },
 {
 mistake: "Giant single Script 500 рядків",
 explanation: "Необслуговуваний.",
 correctApproach: "Спліт сервіси + модулі",
 },
 ],
 summary: "Ви інтегрували модульний інвентар RPG, статистику обладнання та постійність DataStore, пройшли тестування Script повторного входу та зберегли інвентар RPG - Модуль 9 завершено.",
 practiceTask: {
 title: "Здайте RPG Inventory (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** Контрольна точка портфоліо з наполегливістю.

### Part A - Інтеграція (15 хв)
1. Підключіть усі Scripts Модуля 9 - жодних дублікатів
2. StatsUI + додатковий інтерфейс списку інвентарю
3. Налагодити команду збереження друку

### Part B - Сценарні тести (20 хв)
1. Запустіть 6-рядкову таблицю relog - виправте помилки
2. Окремий тест збереження для двох гравців

### Part C - Збереження демо (5 хв)
1. Відрепетировано демо 60-х
2. **Зберегти в Roblox** →\`Module 9 - RPG Inventory\` 3. **Практика завершена**

**Далі:**\`9.7 - Проєкт: RPG рюкзак і екіпіровка\`бере цей інвентар і додає категорії та вагу переносу.`,
hints: [
"Виправлено серіалізацію перед DataStore, якщо завантаження не вдається",
"Єдине джерело правди щодо ідентифікаторів товарів",
"Надійність інтерфейсу користувача з перетягуванням для контрольної точки",
],
 optionalChallenge: "Перетягування слотів із перевіреним сервером запитом на обмін.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "RPG Inventory checkpoint доводить...",
 options: [
 "Modules + gear + save/load",
 "Лише Terrain",
 "Без Scripts",
 "Монети лише на клієнті",
 ],
 correctAnswer: 0,
 explanation: "Повний модуль 9.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Тест екіпірування Relog підтверджує...",
 options: [
 "Спорядження збережено",
 "Лише UI",
 "Terrain",
 "Випадково",
 ],
 correctAnswer: 0,
 explanation: "Script 2.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Один ItemDatabase запобігає...",
 options: [
 "Дрейф ID між системами",
 "Ходьба",
 "NPC dialogue",
 "Sound",
 ],
 correctAnswer: 0,
 explanation: "Єдине джерело.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "серіалізація повинна бути...",
 options: [
 "Read-only копія стану",
 "Зміна живих слотів",
 "Видалення гравця",
 "Publishing",
 ],
 correctAnswer: 0,
 explanation: "Відсутність побічних ефектів.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Модуль 9 зберегти назву...",
 options: [
 "Module 9 - RPG Inventory",
 "Shop Works",
 "Living Location",
 "Lesson 9.1",
 ],
 correctAnswer: 0,
 explanation: "checkpoint.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Архітектор системи означає...",
 options: [
 "Повторно використовувані modules і надійний стан",
 "Один гігантський Script",
 "Без тестів",
 "Копіювання-вставка",
 ],
 correctAnswer: 0,
 explanation: "Дизайн мислення.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 9.6 завершується...",
 options: [
 "Module 9",
 "Module 12",
 "Module 1",
 "Лише монети",
 ],
 correctAnswer: 0,
 explanation: "Кінцевий модуль 9.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Двоє гравців потребують...",
 options: [
 "Окремі save keys за UserId",
 "Один спільний інвентар",
 "Без DataStore",
 "Той самий ключ",
 ],
 correctAnswer: 0,
 explanation: "Дані кожного гравця.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Модуль 10 додає...",
 options: [
 "Constraints і Parts фізики",
 "Лише dialogue",
 "Лише publish",
 "Нічого",
 ],
 correctAnswer: 0,
 explanation: "Попередній перегляд.",
 },
{
id: "q10",
type: "multiple_choice",
question: "Контрольна точка має пріоритет...",
options: [
"Тести persistence проходять",
"Максимум предметів",
"Без modules",
"Збереження лише на клієнті",
],
correctAnswer: 0,
explanation: "Relog QA.",
},
],
},
}

export const ukLesson97 = {
lessonId: "lesson-roblox-9-7",
moduleId: "module-09",
order: 7,
title: "9.7 - Проєкт: RPG рюкзак і екіпіровка",
theoryMinutes: 40,
quizMinutes: 10,
estimatedTime: 50,
learningObjectives: [
"Спроєктуйте категоризований рюкзак (зброя/броня/зілля/квест) на основі 9.1-9.5",
"Додайте вагу і ліміт переносу поверх лімітів слотів з 9.2",
"Об'єднайте equip-потік із перерахунком статистики та серіалізацією для збереження",
"Задокументуйте архітектуру власного проєкту рюкзака",
],
theory: {
sections: [
{
title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
content: `**Проєктний день** - жодного нового API. Ви **збираєте** ModuleScript, таблиці-інвентар, статистику спорядження та серіалізацію (9.1-9.5) у один тематичний **RPG рюкзак**.

**Хід уроку:**
1. **Теорія (40 хв)** - дизайн категорій + вага
2. **Практика (~25 хв)** - рюкзак на 4 категорії + вага
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 9.6 - Checkpoint: RPG Inventory**.`,
},
{
title: "Проєктний день ≠ новий API",
content: `Сьогодні ви **не вчите** нову команду Roblox. Ви **комбінуєте** те, що вже вмієте:

| Урок | Що взяти |
|------|----------|
| 9.1 | ModuleScript RPGConfig |
| 9.2 | InventoryOps (add/remove/count) |
| 9.3 | Inventory об'єкт (metatable) |
| 9.4 | Спорядження + calcStats |
| 9.5 | Серіалізація DataStore |

**Мета проєкту:** тематичний **рюкзак** із категоріями, вагою і чесним equip-потоком.`,
},
{
title: "Категорії рюкзака",
content: `Розширте \`ItemDatabase\` полем \`category\`:\`\`\`lua
potion_small = { name = "Small Potion", maxStack = 10, category = "consumable", weight = 0.5 },
sword_bronze = { name = "Bronze Sword", maxStack = 1, category = "weapon", slot = "weapon", atk = 5, weight = 4 },
armor_cloth = { name = "Cloth Armor", maxStack = 1, category = "armor", slot = "armor", hp = 20, weight = 6 },
quest_key_a = { name = "Rusty Key", maxStack = 1, category = "quest", weight = 0, questLocked = true },
\`\`\`| Категорія | Правило |
|-----------|---------|
| **weapon/armor** | Йде в equip-слот (9.4) |
| **consumable** | Стекається, можна використати/викинути |
| **quest** |\`questLocked = true\`- **не можна** викинути чи продати |`,
},
{
title: "Вага і ліміт переносу",
content: `\`RPGConfig\`отримує:\`\`\`lua
RPGConfig.MAX_CARRY_WEIGHT = 50

function RPGConfig.getMaxWeight(playerLevel)
 return RPGConfig.MAX_CARRY_WEIGHT + (playerLevel * 5)
end
\`\`\`Обчисліть поточну вагу без зміни таблиці:\`\`\`lua
local function currentWeight(inventory)
 local total = 0
 for i = 1, inventory.maxSlots do
 local slot = inventory.slots[i]
 if slot then
 local meta = ItemDatabase.get(slot.itemId)
 total += (meta.weight or 0) * slot.qty
 end
 end
 return total
end
\`\`\``,
},
{
title: "addItem з перевіркою ваги",
content: `Розширте\`InventoryOps.addItem\`з 9.2 - охорона **перед** зміною слотів:\`\`\`lua
function InventoryOps.addItem(inventory, itemId, qty, maxWeight)
 local meta = ItemDatabase.get(itemId)
 if not meta then return false, "unknown_item" end

 local addedWeight = (meta.weight or 0) * qty
 if currentWeight(inventory) + addedWeight > maxWeight then
 return false, "too_heavy"
 end

 -- ...existing stack/empty slot logic from 9.2
end
\`\`\`**UI відгук:** "Занадто важко (48/50)" - гравець розуміє **чому** відмовлено.`,
},
{
title: "Equip-потік для екіпіровки з рюкзака",
content: `Логіка з 9.4 залишається - лише перевірка **category** замінює перевірку **slot**, коли рюкзак фільтрує список:\`\`\`lua
local function getEquippableItems(inventory)
 local list = {}
 for i = 1, inventory.maxSlots do
 local slot = inventory.slots[i]
 if slot then
 local meta = ItemDatabase.get(slot.itemId)
 if meta.category == "weapon" or meta.category == "armor" then
 table.insert(list, slot.itemId)
 end
 end
 end
 return list
end
\`\`\`Клацання на предмет у **вкладці "Спорядження"** рюкзака викликає\`equipItem\`з 9.4 без змін.`,
},
{
title: "Захист квестових предметів",
content: `\`\`\`lua
function InventoryOps.removeItem(inventory, itemId, qty, force)
 local slotIndex = findItemSlot(inventory, itemId)
 if not slotIndex then return false, "not_found" end

 local meta = ItemDatabase.get(itemId)
 if meta.questLocked and not force then
 return false, "quest_item_locked"
 end
 -- ...existing removal logic
end
\`\`\`**force = true** використовує лише **сервер** під час завершення квесту - гравець ніколи не викидає квестовий предмет самостійно.`,
},
{
title: "Серіалізація з вагою і категоріями",
content: `Серіалізація з 9.3/9.5 **не потребує** нових полів - вага і категорія завжди походять з\`ItemDatabase\`, а не з збереженого стану гравця:\`\`\`lua
function Inventory:serialize()
 return {
 slots = self.slots, -- itemId + qty only
 maxSlots = self.maxSlots,
 }
end
\`\`\`**Правило:** зберігайте **лише те, що вибрав гравець** (itemId, qty, equipped ids) - метадані завжди з коду, ніколи не з DataStore.`,
},
{
title: "Playtest-сценарії рюкзака",
content: `| # | Сценарій | Очікування |
|---|----------|-----------|
| 1 | Заповнити рюкзак важкими мечами | Блокування "too_heavy" |
| 2 | Спробувати викинути квестовий ключ | Блокування "quest_item_locked" |
| 3 | Одягнути меч із рюкзака | Статистика оновлюється (9.4) |
| 4 | Вийти/зайти з повним рюкзаком | Все відновлюється (9.5) |
| 5 | maxWeight росте з рівнем | Вищий рівень = більше ваги |`,
},
{
title: "Контрольний список перед початком практики",
content: `- [ ] ItemDatabase має category + weight на всіх предметах
- [ ] addItem блокує, коли занадто важко
- [ ] Квестові предмети не викидаються без force
- [ ] Equip з рюкзака оновлює статистику
- [ ] Зберегти:\`Lesson 9.7 - RPG Backpack\``,
},
],
},
commonMistakes: [
{
mistake: "Зберігання ваги в даних гравця",
explanation: "Дублікат джерела правди.",
correctApproach: "Вага завжди з ItemDatabase",
},
{
mistake: "questLocked предмети видаляються звичайним removeItem",
explanation: "Гравець псує квест.",
correctApproach: "force=true лише на сервері",
},
{
mistake: "Перевірка ваги після додавання предмета",
explanation: "Стан вже пошкоджено.",
correctApproach: "Охорона перед мутацією",
},
{
mistake: "Один maxWeight для всіх рівнів",
explanation: "Прогрес відсутній.",
correctApproach: "getMaxWeight(level)",
},
],
summary: "Ви об'єднали категорії предметів, ліміт ваги, захист квестових предметів, equip-потік і серіалізацію в один тематичний проєкт RPG рюкзака - довели, що можете комбінувати весь інструментарій Модуля 9 в саморобну систему.",
practiceTask: {
title: "RPG рюкзак (~25 хв)",
difficulty: "beginner",
description: `**Мета:** Рюкзак з категоріями і вагою.

### Part A - Дані (10 хв)
1. Розширити ItemDatabase category + weight
2. RPGConfig.getMaxWeight(level)

### Part B - Логіка (12 хв)
1. currentWeight + guard у addItem
2. questLocked guard у removeItem
3. getEquippableItems фільтр за категорією

### Part C - Зберегти (3 хв)
1. Тест: заповнити важко, спробувати викинути квест-предмет
2. **Зберегти в Roblox** →\`Lesson 9.7 - RPG Backpack\` 3. **Практика завершена**`,
hints: [
"Порахуйте вагу з нуля кожного разу - не накопичуйте лічильник, який може розсинхронізуватися",
"UI показує X/maxWeight, як HP бар",
"Квестові предмети - окрема вкладка в UI рюкзака (необов'язково)",
],
optionalChallenge: "Сортування рюкзака за категорією одним кліком.",
},
quiz: {
passingScore: 70,
timeLimit: 10,
questions: [
{
id: "q1",
type: MC,
question: "Вага рюкзака має обчислюватися...",
options: [
"З ItemDatabase кожного разу",
"Зберігатися в DataStore окремо",
"Вгадуватися клієнтом",
"Ігноруватися",
],
correctAnswer: 0,
explanation: "Єдине джерело правди.",
},
{
id: "q2",
type: MC,
question: "questLocked запобігає...",
options: [
"Випадковому викиданню квестового предмета",
"Екіпіруванню зброї",
"Збереженню DataStore",
"Публікації",
],
correctAnswer: 0,
explanation: "Захист квесту.",
},
{
id: "q3",
type: MC,
question: "force=true в removeItem має використовувати...",
options: [
"Лише сервер під час завершення квесту",
"Клієнт будь-коли",
"LocalScript кнопки",
"Ніхто",
],
correctAnswer: 0,
explanation: "Авторитет сервера.",
},
{
id: "q4",
type: MC,
question: "getMaxWeight(level) забезпечує...",
options: [
"Прогрес переносу з рівнем",
"Випадкову вагу",
"Фіксовану броню",
"Terrain",
],
correctAnswer: 0,
explanation: "Масштабування.",
},
{
id: "q5",
type: MC,
question: "Категорія weapon/armor визначає...",
options: [
"Чи предмет можна екіпірувати",
"Колір UI",
"Ціну",
"Ім'я гравця",
],
correctAnswer: 0,
explanation: "Equip фільтр.",
},
{
id: "q6",
type: MC,
question: "Перевірка ваги має відбуватися...",
options: [
"Перед зміною слотів",
"Після збереження",
"Ніколи",
"Лише в чаті",
],
correctAnswer: 0,
explanation: "Захисна перевірка.",
},
{
id: "q7",
type: MC,
question: "Проєктний день 9.7 базується на...",
options: [
"Уроках 9.1-9.5 без нового API",
"Лише Module 1",
"Модулі 10",
"Порожньо",
],
correctAnswer: 0,
explanation: "Комбінування навичок.",
},
{
id: "q8",
type: MC,
question: "Урок 9.8 додає...",
options: [
"Hotbar UX і захист від дублікатів",
"Лише Terrain",
"Raycast",
"Publish",
],
correctAnswer: 0,
explanation: "Наступний урок.",
},
{
id: "q9",
type: MC,
question: "Урок 9.7 зберегти назву...",
options: [
"Lesson 9.7 - RPG Backpack",
"Gear Stats",
"Inventory Save",
"ModuleScript",
],
correctAnswer: 0,
explanation: "Зберегти урок.",
},
],
},
}

export const ukLesson98 = {
lessonId: "lesson-roblox-9-8",
moduleId: "module-09",
order: 8,
title: "9.8 - Інвентар: UX і збереження",
theoryMinutes: 40,
quizMinutes: 10,
estimatedTime: 50,
learningObjectives: [
"Створіть hotbar (швидкі слоти 1-5) з клавішами і використанням предметів",
"Обробляйте edge cases завантаження (пошкоджені дані, стара версія, відсутні поля)",
"Запобігайте дублюванню предметів через debounce і серверні перевірки одного запиту",
"Playtest сценарії дублікатів і задокументуйте виправлення",
],
theory: {
sections: [
{
title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
content: `Робочий інвентар (9.1-9.7) ще не **готовий до гравця**, поки немає швидкого доступу і захисту від багів збереження.

**Хід уроку:**
1. **Теорія (40 хв)** - hotbar + edge cases + анти-дублікат
2. **Практика (~25 хв)** - hotbar UI + перевірки завантаження
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 9.7 - RPG рюкзак**.`,
},
{
title: "Чому UX рюкзака важливий",
content: `Технічно правильний інвентар (9.2) все ще **незручний**, якщо гравець:
- Не бачить, що в руці/активне
- Клікає 5 разів по кнопці "Купити зілля", бо не впевнений, чи спрацювало
- Втрачає предмети після виходу через мовчазний збій

**UX-полірування = довіра гравця до системи.**`,
},
{
title: "Макет Hotbar",
content: `\`StarterGui/HotbarUI\`- 5 слотів прив'язані до **інвентарних слотів 1-5**:\`\`\`
HotbarUI
├── Slot1 (клавіша "1")
├── Slot2 (клавіша "2")
├── Slot3 (клавіша "3")
├── Slot4 (клавіша "4")
└── Slot5 (клавіша "5")
\`\`\`\`\`\`lua
local UserInputService = game:GetService("UserInputService")

local KEY_TO_SLOT = {
 [Enum.KeyCode.One] = 1,
 [Enum.KeyCode.Two] = 2,
 [Enum.KeyCode.Three] = 3,
 [Enum.KeyCode.Four] = 4,
 [Enum.KeyCode.Five] = 5,
}

UserInputService.InputBegan:Connect(function(input, gameProcessed)
 if gameProcessed then return end
 local slotIndex = KEY_TO_SLOT[input.KeyCode]
 if slotIndex then
 UseSlot:FireServer(slotIndex)
 end
end)
\`\`\``,
},
{
title: "Використання предмета з hotbar (сервер)",
content: `\`\`\`lua
UseSlot.OnServerEvent:Connect(function(player, slotIndex)
 local inv = playerInventories[player]
 if not inv then return end

 local slot = inv.slots[slotIndex]
 if not slot then return end

 local meta = ItemDatabase.get(slot.itemId)
 if meta.category ~= "consumable" then return end

 -- Apply effect (example: heal)
 local totals = calcStats(player)
 -- HealPlayer(player, meta.healAmount or 0)

 inv:remove(slot.itemId, 1)
 HotbarChanged:FireClient(player, inv:serialize())
end)
\`\`\`**Сервер перевіряє category** - клієнт не може "використати" меч як зілля.`,
},
{
title: "Edge cases завантаження",
content: `DataStore повертає **непередбачуване**:

| Проблема | Причина | Виправлення |
|----------|--------|--------------|
|\`data == nil\`| Новий гравець | Стандартний інвентар |
|\`data.version ~= CURRENT\`| Стара схема | Мігрувати або скинути з попередженням |
|\`data.inventory.slots[3]\`пошкоджений (не таблиця) | Ручне редагування / баг | Пропустити слот, залогувати |
|\`data.inventory.maxSlots\`відсутній | Частковий запис | Використати RPGConfig за замовчуванням |\`\`\`lua
local function sanitizeSlot(rawSlot)
 if type(rawSlot) ~= "table" then return nil end
 if type(rawSlot.itemId) ~= "string" then return nil end
 if not ItemDatabase.get(rawSlot.itemId) then return nil end
 if type(rawSlot.qty) ~= "number" or rawSlot.qty <= 0 then return nil end
 return rawSlot
end
\`\`\`**Кожен слот** перевіряється окремо - один поганий слот не руйнує весь інвентар.`,
},
{
title: "Звідки беруться дублікати предметів",
content: `| Причина | Приклад |
|---------|---------|
| **Спам кліків** | 5 запитів FireServer за 0,1с на "Купити" |
| **Race condition** | Двоє запитів обробляються одночасно, обидва бачать "є місце" |
| **Збій мережі** | Клієнт думає, що запит не пройшов, надсилає знову |
| **Save/load гонка** | Save під час активного add - перезаписує новіші дані |

Кожен з них можна відтворити на playtest - тому це **очікувана** частина уроку 9.8, а не рідкісний баг.`,
},
{
title: "Debounce і ідемпотентність на сервері",
content: `\`\`\`lua
local pendingRequests = {}

BuyPotion.OnServerEvent:Connect(function(player)
 if pendingRequests[player] then
 return -- ignore spam while previous request still processing
 end
 pendingRequests[player] = true

 local ok, reason = inv:add("potion_small", 1)
 -- ...charge gold, etc.

 pendingRequests[player] = nil
end)
\`\`\`**Ідемпотентний запит** (необов'язково просунуто): клієнт надсилає\`requestId\`, сервер ігнорує повторний той самий\`requestId\`.

**Ніколи** не робіть UI-кнопку "миттєвою" без серверного debounce - клієнтський debounce можна оминути.`,
},
{
title: "Playtest дублікатів",
content: `| # | Тест | Очікування |
|---|------|-----------|
| 1 | Клацнути "Купити" 10 разів швидко | Лише 1 предмет додано |
| 2 | Використати hotbar-слот двічі одним кліком (double bind) | Лише 1 використання |
| 3 | Вийти рівно під час add | Або збережено, або не збережено - ніколи 2x предмет |
| 4 | Пошкодити один слот вручну в Studio, перезавантажити | Гра не крашиться, слот пропущено |

**Записуйте** кожен збій в примітках - це доказ якості для портфоліо 9.6.`,
},
{
title: "Контрольний список перед початком практики",
content: `- [ ] Hotbar 1-5 використовує consumable-предмети
- [ ] sanitizeSlot захищає від пошкоджених даних
- [ ] Спам-клік не створює дублікатів
- [ ] Усі 4 playtest дублікатів пройдені
- [ ] Зберегти:\`Lesson 9.8 - Inventory UX\``,
},
],
},
commonMistakes: [
{
mistake: "Debounce лише на клієнті",
explanation: "Легко обійти.",
correctApproach: "pendingRequests на сервері",
},
{
mistake: "Довіра до всіх полів завантажених даних",
explanation: "Крах при пошкодженні.",
correctApproach: "sanitizeSlot на кожен слот",
},
{
mistake: "Hotbar дозволяє використовувати зброю як зілля",
explanation: "Логічна помилка.",
correctApproach: "Перевірка category на сервері",
},
{
mistake: "Немає плану для старої версії збереження",
explanation: "Втрата прогресу гравців.",
correctApproach: "Перевірка version + міграція/скидання",
},
],
summary: "Ви додали hotbar із клавішами 1-5, санітизацію пошкоджених/старих збережень і серверний захист від дублікатів через debounce - інвентар RPG тепер готовий для реальних гравців, а не лише для happy path Studio.",
practiceTask: {
title: "Hotbar і захист від дублікатів (~25 хв)",
difficulty: "beginner",
description: `**Мета:** Швидкий доступ + надійне збереження.

### Part A - Hotbar (10 хв)
1. HotbarUI 5 слотів + прив'язка клавіш 1-5
2. UseSlot RemoteEvent + серверна перевірка category

### Part B - Надійність (12 хв)
1. sanitizeSlot на завантаженні
2. pendingRequests debounce на купівлі/використанні
3. Playtest 4 сценарії дублікатів

### Part C - Зберегти (3 хв)
1. Спам-клік тест - перевірити лише 1 предмет
2. **Зберегти в Roblox** →\`Lesson 9.8 - Inventory UX\` 3. **Практика завершена**`,
hints: [
"gameProcessed перевірка не дає клавішам спрацьовувати під час чату",
"pendingRequests працює як простий м'ютекс на гравця",
"Один поганий слот не повинен ламати весь inv:deserialize",
],
optionalChallenge: "requestId ідемпотентність поверх debounce для мережевих повторів.",
},
quiz: {
passingScore: 70,
timeLimit: 10,
questions: [
{
id: "q1",
type: MC,
question: "Debounce для anti-дублікату має бути...",
options: [
"На сервері",
"Лише на клієнті",
"У чаті",
"Не потрібен",
],
correctAnswer: 0,
explanation: "Клієнт можна обійти.",
},
{
id: "q2",
type: MC,
question: "sanitizeSlot перевіряє...",
options: [
"Кожен слот перед використанням",
"Ім'я гравця",
"Terrain",
"Кольори UI",
],
correctAnswer: 0,
explanation: "Захист від пошкоджених даних.",
},
{
id: "q3",
type: MC,
question: "Hotbar-слот 1-5 відповідає...",
options: [
"Слотам інвентарю гравця",
"Випадковим предметам",
"Лише зброї",
"Terrain",
],
correctAnswer: 0,
explanation: "Пряме зіставлення.",
},
{
id: "q4",
type: MC,
question: "Race condition дублікатів виникає, коли...",
options: [
"Два запити обробляються одночасно",
"Гравець спить",
"Terrain завантажується",
"UI закритий",
],
correctAnswer: 0,
explanation: "Паралельні запити.",
},
{
id: "q5",
type: MC,
question: "gameProcessed перевірка запобігає...",
options: [
"Спрацюванню клавіш під час чату",
"Збереженню DataStore",
"Публікації",
"Дублюванню предметів",
],
correctAnswer: 0,
explanation: "Фокус вводу.",
},
{
id: "q6",
type: MC,
question: "Стара версія збереження має...",
options: [
"Мігруватися або безпечно скидатися",
"Крашити гру",
"Ігноруватися мовчки",
"Видаляти гравця",
],
correctAnswer: 0,
explanation: "Безпечна обробка версій.",
},
{
id: "q7",
type: MC,
question: "Урок 9.8 базується на...",
options: [
"Рюкзаку 9.7 і збереженні 9.5",
"Лише Module 1",
"Порожньо",
"Publish",
],
correctAnswer: 0,
explanation: "Продовження проєкту.",
},
{
id: "q8",
type: MC,
question: "Використання зілля через hotbar перевіряється на...",
options: [
"Сервері за category",
"Клієнті лише візуально",
"Terrain",
"Ніде",
],
correctAnswer: 0,
explanation: "Авторитет сервера.",
},
{
id: "q9",
type: MC,
question: "Урок 9.8 зберегти назву...",
options: [
"Lesson 9.8 - Inventory UX",
"RPG Backpack",
"Gear Stats",
"Checkpoint",
],
correctAnswer: 0,
explanation: "Зберегти урок.",
},
],
},
}
