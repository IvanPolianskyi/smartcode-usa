/** Rich UK content for Roblox Module 09 - AUTO from EN via gen-roblox-lessons-uk.mjs */
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
1. InventoryService друкує значення
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
 question: "ModuleScript завантажується з…",
 options: [
 "вимагати()",
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
 question: "Модуль має повернутися…",
 options: [
 "Таблиця API",
 "Нічого завжди",
 "Рельєф місцевості",
 "гравець",
 ],
 correctAnswer: 0,
 explanation: "таблиця повернення модулів.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "RPGConfig містить…",
 options: [
 "Константи та спільні помічники",
 "Тільки UI",
 "Тільки звуки",
 "Рельєф місцевості",
 ],
 correctAnswer: 0,
 explanation: "Модуль конфігурації.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Одна константа в одному місці запобігає...",
 options: [
 "Копіювати-вставляти дрейф",
 "політ",
 "Діалог NPC",
 "Видавництво",
 ],
 correctAnswer: 0,
 explanation: "Єдине джерело правди.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "ModuleScript не запускається автоматично, доки...",
 options: [
 "Потрібний для іншого Script",
 "Гравець приєднується",
 "Навантаження на місцевість",
 "Відкриється інтерфейс користувача",
 ],
 correctAnswer: 0,
 explanation: "Потрібно не автоматично.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "getMaxSlots(рівень) належить до…",
 options: [
 "API конфігурації або модуля поведінки",
 "Лише LocalScript",
 "Освітлення",
 "StarterGui",
 ],
 correctAnswer: 0,
 explanation: "Спільна логіка.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Тема модуля 9…",
 options: [
 "Системний архітектор / Інвентар RPG",
 "Тільки гонки",
 "Лише інтерфейс магазину",
 "Тільки місцевість",
 ],
 correctAnswer: 0,
 explanation: "Name модуля.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Поділ конфігурації та поведінки означає…",
 options: [
 "Дані окремо від служб виконання",
 "Жодних Scripts",
 "Тільки для клієнта",
 "Видалити модулі",
 ],
 correctAnswer: 0,
 explanation: "Архітектура.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 9.2 додає…",
 options: [
 "Інвентарні таблиці",
 "Тільки NPC",
 "Тільки автомобіль",
 "Опублікувати",
 ],
 correctAnswer: 0,
 explanation: "Наступний урок.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 9.1 зберегти назву…",
 options: [
 "Урок 9.1 - ModuleScript",
 "Інвентар RPG",
 "Місце проживання",
 "Магазин працює",
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
3. Script TestInventory друкує 6 тестів

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
 question: "Порожнє місце для інвентарю - це…",
 options: [
 "нуль",
 "0",
 "помилковий рядок",
 "Рельєф місцевості",
 ],
 correctAnswer: 0,
 explanation: "nil = порожній.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "maxStack походить від…",
 options: [
 "ItemDatabase",
 "Кнопка клієнта",
 "небо",
 "Випадковий",
 ],
 correctAnswer: 0,
 explanation: "Метадані елемента.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "addItem повертає false, коли...",
 options: [
 "Інвентар повний або недійсний",
 "Завжди",
 "Ніколи",
 "На стрибок",
 ],
 correctAnswer: 0,
 explanation: "Невдача з причиною.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "findItemSlot шукає за…",
 options: [
 "збіг itemId",
 "Ім'я гравця",
 "Тільки колір",
 "час",
 ],
 correctAnswer: 0,
 explanation: "Пошук стека.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "removeItem у кількості 0 має…",
 options: [
 "Встановіть слот на нуль",
 "Збій",
 "Дубльований елемент",
 "Опублікувати",
 ],
 correctAnswer: 0,
 explanation: "Очистити порожній слот.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Захисні перевірки запобігають...",
 options: [
 "Помилки виконання через неправильні дані",
 "ходьба",
 "інтерфейс користувача",
 "Звук",
 ],
 correctAnswer: 0,
 explanation: "Нульова охорона.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "InventoryOps має бути…",
 options: [
 "ModuleScript",
 "Рельєф місцевості",
 "Звук",
 "ProximityPrompt",
 ],
 correctAnswer: 0,
 explanation: "Спільний модуль.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 9.2 базується на…",
 options: [
 "Урок 9.1 RPGConfig",
 "Тільки урок 6",
 "Порожній",
 "Опублікувати",
 ],
 correctAnswer: 0,
 explanation: "Шлях модуля.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 9.3 додає…",
 options: [
 "Таблиці як об'єкти з метатаблицями",
 "Тільки діалог",
 "Тільки гонка",
 "Рельєф місцевості",
 ],
 correctAnswer: 0,
 explanation: "Інвентаризація в ООП-стилі.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 9.2 зберегти назву…",
 options: [
 "Урок 9.2 - Інвентарні таблиці",
 "ModuleScript",
 "Інвентар RPG",
 "Інтерфейс магазину",
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
\`\`\`Урок **9.5** зберігає це в DataStore - сьогодні просто надрукуйте JSON-подібну таблицю.`,
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
- [ ] serialize друкує дійсну таблицю
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
3. Play - друкувати inv:count у тесті команди

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
 question: "setmetatable з __index дозволяє…",
 options: [
 "Виклики методів на столі",
 "Редагування місцевості",
 "FireServer",
 "Тільки зварні шви",
 ],
 correctAnswer: 0,
 explanation: "ООП-стиль.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "inv:add() проходить...",
 options: [
 "self як перший аргумент",
 "нічого",
 "Рельєф місцевості",
 "IP сервера",
 ],
 correctAnswer: 0,
 explanation: "Синтаксис двокрапки.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "playerInventory[player] stores…",
 options: [
 "Цей об’єкт інвентарю гравця",
 "Глобальна спільна здобич",
 "Рельєф місцевості",
 "Лише інтерфейс користувача",
 ],
 correctAnswer: 0,
 explanation: "На кожного гравця.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "серіалізувати повернення…",
 options: [
 "Стіл для збереження",
 "Характер гравця",
 "Лише екземпляр інструменту",
 "Нуль завжди",
 ],
 correctAnswer: 0,
 explanation: "Підготовка DataStore",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Вилучення гравця має…",
 options: [
 "Очистити запис Player Inventory",
 "Видалити всіх гравців",
 "Зупинити сервер",
 "Опублікувати",
 ],
 correctAnswer: 0,
 explanation: "Очищення пам'яті.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Inventory.new(maxSlots) - це…",
 options: [
 "Конструктор",
 "RemoteEvent",
 "Рельєфна щітка",
 "Анімація",
 ],
 correctAnswer: 0,
 explanation: "Створює екземпляр.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Уникайте зберігання Player в інвентарі, оскільки…",
 options: [
 "Чистіша карта зовнішнього об'єкта",
 "Потрібен Roblox",
 "Блокує інтерфейс користувача",
 "Видаляє Humanoid",
 ],
 correctAnswer: 0,
 explanation: "Інкапсуляція.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 9.3 базується на...",
 options: [
 "Урок 9.2 InventoryOps",
 "Тільки урок 1.1",
 "Тільки модуль 6",
 "Порожній",
 ],
 correctAnswer: 0,
 explanation: "Рефакторинг таблиць.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 9.4 додає…",
 options: [
 "Спорядження та статистика",
 "Тільки NPC",
 "Тільки публікувати",
 "Таймер перегонів",
 ],
 correctAnswer: 0,
 explanation: "Обладнання.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 9.3 зберегти назву…",
 options: [
 "Урок 9.3 - Об’єкт інвентаризації",
 "ModuleScript",
 "Місце проживання",
 "Гонка розпочата",
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
 title: "Обладнаний стіл (окремо від інвентарю)",
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
 question: "Загальна статистика має бути…",
 options: [
 "База + спорядження бонусів перераховано",
 "Лише припущення клієнта",
 "Рельєф місцевості",
 "Випадковий",
 ],
 correctAnswer: 0,
 explanation: "Динамічний розрах.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Екіпірування не повинно постійно змінюватися…",
 options: [
 "playerBaseStats",
 "ItemDatabase",
 "Name модуля",
 "Версія Roblox",
 ],
 correctAnswer: 0,
 explanation: "База залишається базою.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Обладнання зберігається окремо від…",
 options: [
 "Інвентарні слоти",
 "Рельєф місцевості",
 "небо",
 "Звук",
 ],
 correctAnswer: 0,
 explanation: "Дві системи.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "meta.slot запобігає...",
 options: [
 "Неправильне обладнання слота",
 "ходьба",
 "Діалог",
 "Патруль",
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
 "Випадковий",
 "Опублікувати",
 "Рельєф ген",
 ],
 correctAnswer: 0,
 explanation: "Подія синхронізації.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "sword_bronze maxStack 1 означає…",
 options: [
 "Спорядження не можна штабелювати",
 "Нескінченний стек",
 "Немає в базі даних",
 "Лише інтерфейс користувача",
 ],
 correctAnswer: 0,
 explanation: "Правило обладнання.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Бойові пошкодження мають читатися...",
 options: [
 "Загальна атака сервера",
 "Клієнтський чат",
 "Текст кнопки",
 "Рельєф місцевості",
 ],
 correctAnswer: 0,
 explanation: "Авторитет.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 9.4 базується на...",
 options: [
 "Урок 9.3 інвентаризація предметів",
 "Тільки урок 1",
 "Тільки модуль 6",
 "Порожній",
 ],
 correctAnswer: 0,
 explanation: "Потрібен інвентар.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 9.5 додає…",
 options: [
 "Серіалізація DataStore",
 "Тільки NPC",
 "Тільки гонка",
 "Опублікувати",
 ],
 correctAnswer: 0,
 explanation: "Наполегливість.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 9.4 зберегти назву…",
 options: [
 "Урок 9.4 - Статистика спорядження",
 "Об'єкт інвентаризації",
 "Інвентар RPG",
 "Магазин працює",
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
 "Роздрукуйте таблицю серіалізації у вихідних даних перед першим збереженням",
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
 question: "DataStore зберігає…",
 options: [
 "Прості таблиці Lua",
 "Функції",
 "Метатаблиці",
 "Екземпляри повного інструменту",
 ],
 correctAnswer: 0,
 explanation: "Серіалізовані дані.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "serialize перетворює об'єкт на...",
 options: [
 "Таблиця збереження безпеки",
 "Характер гравця",
 "Рельєф місцевості",
 "RemoteEvent",
 ],
 correctAnswer: 0,
 explanation: "Прості дані.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "pcall на SetAsync…",
 options: [
 "Запобігає збою в разі відмови",
 "Прискорює гру",
 "Видаляє інтерфейс користувача",
 "Банить гравців",
 ],
 correctAnswer: 0,
 explanation: "Обробка помилок.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "поле версії під час збереження допомагає…",
 options: [
 "Майбутні міграції схем",
 "Графіка",
 "Тільки звук",
 "шлях NPC",
 ],
 correctAnswer: 0,
 explanation: "Версія схеми.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Економте в першу чергу на…",
 options: [
 "Вилучення гравця",
 "Кожен удар серця",
 "Тільки натискання кнопки",
 "Рельєф місцевості",
 ],
 correctAnswer: 0,
 explanation: "Дросель рятує.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Завантаження має підтвердити…",
 options: [
 "Типи та версія перед використанням",
 "нічого",
 "Клієнтський чат",
 "Випадковий",
 ],
 correctAnswer: 0,
 explanation: "Безпечне навантаження.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Ключове використання…",
 options: [
 "Player UserId",
 "Лише ім'я гравця",
 "Випадковий",
 "Ідентифікатор місцевості",
 ],
 correctAnswer: 0,
 explanation: "Унікальний ключ.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 9.5 базується на...",
 options: [
 "9.3 серіалізація + 9.4 обладнаний",
 "Урок 1 місцевість",
 "Порожній",
 "Тільки опублікувати",
 ],
 correctAnswer: 0,
 explanation: "Повний стан RPG.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 9.6 - це…",
 options: [
 "Рольова гра Контрольна точка інвентарю",
 "Тільки магазин",
 "Тільки перегони",
 "Тільки NPC",
 ],
 correctAnswer: 0,
 explanation: "Фінал модуля.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 9.5 зберегти назву…",
 options: [
 "Урок 9.5 - Збереження інвентарю",
 "Статистика спорядження",
 "ModuleScript",
 "Місце проживання",
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
 title: "Смужка якості КПП",
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
 content: `**Модуль 10 - Магія деталей** додає **обмеження**, фізику полірування, рухомі двері - ваш центр RPG може отримувати механічні пастки та підйомники.

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
 explanation: "Зламаний КПП.",
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
2. **Зберегти в Roblox** →\`Module 9 - RPG Inventory\` 3. **Практика завершена**`,
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
 question: "RPG Inventory checkpoint доводить…",
 options: [
 "Модулі + спорядження + збереження/завантаження",
 "Тільки місцевість",
 "Жодних Scripts",
 "Клієнтські монети",
 ],
 correctAnswer: 0,
 explanation: "Повний модуль 9.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Тест екіпірування Relog підтверджує…",
 options: [
 "Обладнаний зберігся",
 "Лише інтерфейс користувача",
 "Рельєф місцевості",
 "Випадковий",
 ],
 correctAnswer: 0,
 explanation: "Script 2.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "One ItemDatabase запобігає...",
 options: [
 "Зміщення ID між системами",
 "ходьба",
 "Діалог NPC",
 "Звук",
 ],
 correctAnswer: 0,
 explanation: "Єдине джерело.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "серіалізація повинна бути...",
 options: [
 "Копія стану лише для читання",
 "Мутація живих слотів",
 "Видалення гравця",
 "Видавництво",
 ],
 correctAnswer: 0,
 explanation: "Відсутність побічних ефектів.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Модуль 9 зберегти назву…",
 options: [
 "Модуль 9 - Інвентар RPG",
 "Магазин працює",
 "Місце проживання",
 "Урок 9.1",
 ],
 correctAnswer: 0,
 explanation: "КПП.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Архітектор системи означає…",
 options: [
 "Багаторазові модулі та надійний стан",
 "Один гігантський Script",
 "Жодних тестів",
 "Копіювати вставити",
 ],
 correctAnswer: 0,
 explanation: "Дизайн мислення.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 9.6 завершується…",
 options: [
 "Модуль 9",
 "Модуль 12",
 "Модуль 1",
 "Переклад з Великобританії",
 ],
 correctAnswer: 0,
 explanation: "Кінцевий модуль 9.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Двоє гравців потребують…",
 options: [
 "Розділіть ключі збереження за UserId",
 "Один спільний інвентар",
 "Немає DataStore",
 "Той самий ключ",
 ],
 correctAnswer: 0,
 explanation: "Дані кожного гравця.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Модуль 10 додає…",
 options: [
 "Обмеження та фізичні деталі",
 "Тільки діалог",
 "Тільки публікувати",
 "нічого",
 ],
 correctAnswer: 0,
 explanation: "Попередній перегляд.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Контрольна точка має пріоритет…",
 options: [
 "Проходження тестів на стійкість",
 "Більшість можливих елементів",
 "Без модулів",
 "Збереження лише для клієнта",
 ],
 correctAnswer: 0,
 explanation: "Relog QA.",
 },
 ],
 },
}
