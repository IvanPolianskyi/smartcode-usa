/** Roblox Module 05 UK — 10 уроків (prod-92), Obby */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson51 = {
 lessonId: "lesson-roblox-5-1",
 moduleId: "module-05",
 order: 1,
 title: "5.1 - Humanoid і здоров'я",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Зрозумійте Humanoid Health і MaxHealth",
 "Нанесіть шкоду за допомогою TakeDamage на сервері",
 "Реагуйте на смерть подією «Помер».",
 "Створюйте зони пошкодження та лікування на тестовій арені",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Модуль 5 - Бійцівський клуб** - бій починається з **здоров’я**, а не з мечів.

**Хід уроку:**
1. **Теорія (40 хв)** - Humanoid, пошкодження, смерть
2. **Практика (~25 хв)** - арена перевірки здоров'я
3. **Вікторина (10 хв)** - проходження **70%**

Використовуйте місце **Module 4 - Tycoon Works** або нову базову плиту\`Lesson 5.1 - Health Arena\`.`,
 },
 {
 title: "Humanoid - головний мозок Character",
 content: `Ваша model Character містить:

| Об'єкт | Роль |
|--------|------|
| **Humanoid** | Здоров'я, стрибок, швидкість ходьби |
| **HumanoidRootPart** | Центр фізики |
| **Голова, тулуб, кінцівки** | Parts тіла |

**Ключові Properties:**
-\`Health\`- поточний HP (100 за замовчуванням)
-\`MaxHealth\`- максимальна потужність HP
-\`WalkSpeed\`- швидкість руху

**Вправа (3 хв):** Play → розширюйте свого Character в Explorer → дивіться Здоров'я під час тестування.`,
 },
 {
 title: "TakeDamage проти віднімання Health",
 content: `**Бажано:**\`\`\`lua
humanoid:TakeDamage(15)
\`\`\`**Уникайте уроків:**\`\`\`lua
humanoid.Health -= 15 -- works but hides game rules
\`\`\`

\`TakeDamage\`може поважати майбутню броню, щити та командні правила.

**Зцілити:**\`\`\`lua
humanoid.Health = math.min(humanoid.Health + 10, humanoid.MaxHealth)
\`\`\``,
 },
 {
 title: "Скрипт зони пошкоджень",
 content: `Побудуйте червону площадку\`DamageZone_Lava\`- Anchored, neon червоний.

**Server Script** всередині панелі:\`\`\`lua
local zone = script.Parent
local DAMAGE = 15

zone.Touched:Connect(function(hit)
 local character = hit.Parent
 if not character then
 return
 end

 local humanoid = character:FindFirstChildOfClass("Humanoid")
 if not humanoid then
 return
 end

 humanoid:TakeDamage(DAMAGE)
end)
\`\`\`**Вправа (8 хв):** Доторкніться до зони 3 рази - Здоров’я падає на 15 кожного разу до відродження.`,
 },
 {
 title: "Зони ушкодження від відскоку",
 content: `\`Touched\`спам, перебуваючи всередині зони.\`\`\`lua
local zone = script.Parent
local DAMAGE = 10
local cooldown = {}

zone.Touched:Connect(function(hit)
 local character = hit.Parent
 if not character then return end

 local humanoid = character:FindFirstChildOfClass("Humanoid")
 if not humanoid then return end

 if cooldown[humanoid] then return end
 cooldown[humanoid] = true

 humanoid:TakeDamage(DAMAGE)

 task.delay(0.5, function()
 cooldown[humanoid] = nil
 end)
end)
\`\`\`Пошкодження кожні **0,5 с**, стоячи - відчуття справжньої лави.`,
 },
 {
 title: "Померла подія",
 content: `\`\`\`lua
humanoid.Died:Connect(function()
 print("Character defeated!")
end)
\`\`\`Помістіть тестовий скрипт **ServerScriptService** або в зону після того, як знайдете гравця:\`\`\`lua
local Players = game:GetService("Players")
local player = Players:GetPlayerFromCharacter(character)
if player then
 print(player.Name .. " died in arena")
end
\`\`\`**Відродження:** Roblox автоматично відроджується за замовчуванням - ви налаштуєте пізніше в 5.5.`,
 },
 {
 title: "Зона лікування (необов'язково)",
 content: `Зелена колодка\`HealZone\`:\`\`\`lua
humanoid.Health = math.min(humanoid.Health + 10, humanoid.MaxHealth)
\`\`\`Використовуйте той самий шаблон усунення стрибків - зцілюйте кожні 0,5 с максимум.

**Розташування арени:** породження → зона пошкодження A (10 dmg) → зона пошкодження B (25 dmg) → зона лікування.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Зона пошкодження використовує серверний скрипт + перевірку Humanoid
- [ ] Debounce запобігає миттєвому розплавленню
- [ ] Померлі відбитки to Output на нуль HP
- [ ] Зберегти:\`Lesson 5.1 - Health Arena\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "LocalScript на зоні пошкодження",
 explanation: "Пошкодження можуть не застосовуватися однаково для всіх гравців.",
 correctApproach: "Серверний скрипт для world hazards",
 },
 {
 mistake: "Без перевірки Humanoid",
 explanation: "Parts викликають помилки або дивну поведінку.",
 correctApproach: "FindFirstChildOfClass Humanoid",
 },
 {
 mistake: "Відсутність відскоку в лаві",
 explanation: "Миттєва смерть від кадру в один дотик.",
 correctApproach: "Таблиця перезарядки на Humanoid",
 },
 {
 mistake: "Зцілення вище MaxHealth",
 explanation: "Вилікувати помилки.",
 correctApproach: "math.min з MaxHealth",
 },
 ],
 summary: "Ви навчилися Humanoid Health, застосували TakeDamage із зонами усунення стрибків, прослуховували Died і створили лікувальну панель - основу кожної бойової гри на Roblox.",
 practiceTask: {
 title: "Арена для перевірки здоров'я (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** діють дві зони пошкодження + зона лікування.

### Part A - Арена (5 хв)
1. Кімната з нерестом, стінами, знаками
2.\`DamageZone_A\`(10 dmg) і\`DamageZone_B\`(25 dmg)

### Part B - Scripts (12 хв)
1. Скрипти пошкодження сервера з дебоунсом 0,5 с
2. Виведіть (print) на «Померли», коли здоров’я досягає 0
3. Тестовий прохід по обох зонах

### Part C - Лікуй і рятуй (8 хв)
1. Зелений\`HealZone\`відновлює 10 HP (обмежено)
2. **Зберегти в Roblox** →\`Lesson 5.1 - Health Arena\` 3. **Практика завершена**`,
 hints: [
 "Друк humanoid.Health після кожного пошкодження під час тестування",
 "Використовуйте TakeDamage, а не прямий хак Health, якщо не вчите, чому",
 "Встаньте в зону 2, щоб перевірити час усунення дребезгу",
 ],
 optionalChallenge: "Панель здоров’я HUD LocalScript читає Humanoid.Health (попередній перегляд інтерфейсу користувача модуля 5).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Humanoid керує...",
 options: [
 "Здоров'я та рух",
 "Лише Terrain",
 "DataStore",
 "Лише Skybox",
 ],
 correctAnswer: 0,
 explanation: "Humanoid - контролер Character.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "TakeDamage(15) зменшує...",
 options: [
 "Health зменшується на 15",
 "MaxHealth назавжди",
 "Монети",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Стандартний API пошкоджень.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Здоров'я за 0 причин...",
 options: [
 "Смерть / respawn",
 "Більше монет",
 "Швидша ходьба",
 "Файл збереження",
 ],
 correctAnswer: 0,
 explanation: "Нуль здоров'я = поразка.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Загинула подія, коли...",
 options: [
 "Humanoid помирає",
 "Tool екіпіровано",
 "Монету зібрано",
 "Відкривається UI",
 ],
 correctAnswer: 0,
 explanation: "Слухач смерті.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Зона пошкодження повинна використовувати...",
 options: [
 "Server Script",
 "Лише LocalScript",
 "Лише звук",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Повноваження сервера для бою.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Відбиття лави запобігає...",
 options: [
 "Миттєве багаторазове пошкодження",
 "Стрибки",
 "Збереження",
 "Spawn",
 ],
 correctAnswer: 0,
 explanation: "Багато разів торкався пожеж.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Heal використовує math.min для...",
 options: [
 "Обмеження MaxHealth",
 "Видаляє гравця",
 "Прибирає Tool",
 "Публікація",
 ],
 correctAnswer: 0,
 explanation: "Запобігайте загоєнню.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "FindFirstChildOfClass Humanoid знаходить...",
 options: [
 "Humanoid у Character",
 "Лише Part",
 "Tool",
 "SpawnLocation",
 ],
 correctAnswer: 0,
 explanation: "Склад здоров'я Character.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Модуль 5 фокусується на...",
 options: [
 "Бій",
 "Лише tycoon",
 "Лише Terrain",
 "Лише публікація",
 ],
 correctAnswer: 0,
 explanation: "Модуль «Бійцівський клуб».",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.1 зберегти назву...",
 options: [
 "Lesson 5.1 - Health Arena",
 "Tycoon Works",
 "Obby Ready",
 "Coin Simulator",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок арени.",
 },
 ],
 },
}

export const ukLesson52 = {
 lessonId: "lesson-roblox-5-2",
 moduleId: "module-05",
 order: 2,
 title: "5.2 - Зброя - перший меч",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть інструментальний меч із Part ручки в StarterPack",
 "Використовуйте «Активовано», щоб розпізнавати натискання гравців, щоб замахнутися",
 "Зрозумійте перехід спорядження від рюкзака до Character",
 "Підготуйте архітектуру виявлення звернень на стороні сервера",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Зони пошкодження болять пасивно. **Зброя** дозволяє гравцеві **вибирати** атаку.

**Хід уроку:**
1. **Теорія (40 хв)** - Інструмент + ручка + активовано
2. **Практика (~25 хв)** - Тренування Озброєння та розмах меча
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 5.1 - Health Arena** або свіжу базову плиту.`,
 },
 {
 title: "Огляд системи інструментів",
 content: `| Шматок | Вимога |
|-------|-------------|
| **Інструмент** | Батьківський об’єкт у StarterPack |
| **Ручка** | Part названа точно\`Handle\`|
| **Script** | У Tool (LocalScript для input) |

**Потік:**
1. Інструмент у **StarterPack** → з’являється в **Рюкзаку** під час появи
2. Гравець натискає **1** або натискає інструмент → **озброєний** для Character
3. **Натисніть** під час спорядження →\`Activated\`пожежі`,
 },
 {
 title: "Побудуйте TrainingSword",
 content: `**StarterPack** → Insert **Tool** → перейменувати\`TrainingSword\`. Усередині Tool:
- **Part** name\`Handle\`(обов'язкове ім'я)
- Size форми леза\`0.3, 4, 0.8\`або скористайтеся MeshPart
- **CanCollide false** на ручці під час спорядження (поведінка інструмента за замовчуванням)
- Neon металевий колір

**Grip:** установіть Properties інструмента **Grip**, якщо меч вказує неправильно (обертайте GripPos/GripForward).

**Вправа (5 хв):** Play → одягніть меч → побачите його в руці Character.`,
 },
 {
 title: "Активовано - виявлення гойдання",
 content: `**LocalScript** всередині\`TrainingSword\`(клієнт вводить ОК для запуску розмаху):\`\`\`lua
local tool = script.Parent

tool.Activated:Connect(function()
 print("Sword swing!")
end)
\`\`\`**Активовано** = гравець клацнув, коли є інструмент (ПК: клацніть лівою кнопкою миші).

**Вправа (5 хв):** Зробіть 5 помахів - 5 відбитків на виході.`,
 },
 {
 title: "Екіпіровані та неекіпіровані події",
 content: `\`\`\`lua
tool.Equipped:Connect(function()
 print("Sword equipped")
end)

tool.Unequipped:Connect(function()
 print("Sword stored")
end)
\`\`\`Використовуйте для:
- Відтворення звуку обладнання
- Увімкнути ефект сліду
- Зупинити ефекти на неекіпірованому`,
 },
 {
 title: "Чому пошкодження залишаються на сервері (попередній перегляд)",
 content: `**Ніколи** не довіряйте пошкодженням, завданим лише клієнтам - експлуататори можуть вбити кожного.

**Шаблон уроку 5.3:**
- Клієнт: анімація гойдалок + опціональний звук
- Сервер: перевірити попадання, застосувати TakeDamage

Сьогодні: **ще немає пошкоджень** - лише надійне спорядження + активовано.`,
 },
 {
 title: "Усунення несправностей інструменту",
 content: `| Проблема | Виправити |
|---------|-----|
| Інструмента немає в рюкзаку | Має бути в StarterPack |
| Не можна обладнати | Name відсутньої Parts\`Handle\`|
| Активований ніколи не спрацьовує | Інструмент не обладнаний; клацніть у 3D-виді |
| Меч неправильний кут | Налаштуйте Properties ручки інструменту |
| Помилка Script | LocalScript проти Script - активовані працюють у LocalScript |

**CanBeDropped false** на інструменті запобігає втраті меча в obby.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] TrainingSword у StarterPack із ручкою
- [ ] Вивід (print) при активації після натискання
- [ ] Обладнані/Необладнані додаткові звуки
- [ ] Зберегти:\`Lesson 5.2 - First Sword\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Part під назвою Blade not Handle",
 explanation: "Інструмент не буде оснащений.",
 correctApproach: "Потрібна точна назва",
 },
 {
 mistake: "Інструмент у Workspace, а не StarterPack",
 explanation: "Гравці не отримують його під час появи.",
 correctApproach: "StarterPack для стандартного завантаження",
 },
 {
 mistake: "Server Script лише для активованих",
 explanation: "Активація часто підключається до LocalScript.",
 correctApproach: "LocalScript всередині інструменту для введення",
 },
 {
 mistake: "Сьогодні очікуйте збитків",
 explanation: "5.2 є лише вхідним.",
 correctApproach: "Друк гойдалки; пошкодження в 5.3",
 },
 ],
 summary: "Ви створили TrainingSword Tool із рукояткою, виявили коливання за допомогою Activated і навчилися ходу екіпірування - готові додати справедливу шкоду серверу наступного уроку.",
 practiceTask: {
 title: "Обладнайся та гойдайся (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Меч споряджає та фіксує кожен помах.

### Part A - Інструмент для створення (10 хв)
1.\`TrainingSword\`у StarterPack +\`Handle\`Part
2. Стильне лезо; виправте Grip, якщо потрібно
3. CanBeDropped false необов'язковий

### Part B - LocalScript (10 хв)
1. Активовано → вивід (print) Swing
2. Обладнаний / Необладнаний відбитки або звуки

### Part C - Перевірте та збережіть (5 хв)
1. Play - споряджатися - качатися 10 разів
2. **Зберегти в Roblox** →\`Lesson 5.2 - First Sword\` 3. **Практика завершена**`,
 hints: [
 "Дескриптор має бути прямим дочірнім елементом інструмента",
 "Клацніть, коли інструмент у комплекті, а не в рюкзаку",
 "Звук екіпірування підтверджує потік перед додаванням шкоди",
 ],
 optionalChallenge: "Екіпіруйте звук + звук гойдання, різні ідентифікатори аудіо.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Для інструмента потрібен дочірній елемент із назвою...",
 options: [
 "Handle",
 "Blade",
 "Humanoid",
 "Spawn",
 ],
 correctAnswer: 0,
 explanation: "Конвенція інструментів Roblox.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Інструменти StarterPack з’являються в...",
 options: [
 "Backpack при spawn",
 "Terrain",
 "Lighting",
 "Output",
 ],
 correctAnswer: 0,
 explanation: "Завантаження за замовчуванням.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Активували пожежі, коли...",
 options: [
 "Гравець клікає під час екіпіровки",
 "Збереження гри",
 "Дотик до лави",
 "ClockTime",
 ],
 correctAnswer: 0,
 explanation: "Атака введення.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "LocalScript в інструменті підходить для...",
 options: [
 "Виявлення введення для замаху",
 "Економіка на сервері",
 "DataStore",
 "Захоплення ділянки",
 ],
 correctAnswer: 0,
 explanation: "Вхідний рівень клієнта.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Пошкодження в уроці 5.2...",
 options: [
 "Ще ні — наступний урок",
 "Потрібно сьогодні",
 "На Terrain",
 "Через leaderstats",
 ],
 correctAnswer: 0,
 explanation: "5.3 додає шкоди.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Споряджена подія запускається, коли...",
 options: [
 "Tool переміщується до Character",
 "Гравець помирає",
 "Дотик монети",
 "Закриття UI",
 ],
 correctAnswer: 0,
 explanation: "Обладнайте життєвий цикл.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Сервер повинен завдати шкоди, оскільки...",
 options: [
 "Довіра anti-cheat",
 "Колір UI",
 "Небо",
 "Звук",
 ],
 correctAnswer: 0,
 explanation: "Повноваження сервера.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "CanBeDropped false запобігає...",
 options: [
 "Скидання Tool на землю",
 "Екіпірування",
 "Стрибки",
 "Health",
 ],
 correctAnswer: 0,
 explanation: "Тримайте зброю на гравці.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Регулювання Properties зчеплення...",
 options: [
 "Як меч сидить у руці",
 "MaxHealth",
 "Монети",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Орієнтація інструменту.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.2 зберегти назву...",
 options: [
 "Lesson 5.2 - First Sword",
 "Health Arena",
 "Damage System",
 "Tycoon Works",
 ],
 correctAnswer: 0,
 explanation: "Урок збереження знарядь меча.",
 },
 ],
 },
}

export const ukLesson53 = {
 lessonId: "lesson-roblox-5-3",
 moduleId: "module-05",
 order: 3,
 title: "5.3 - Система пошкоджень",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Застосуйте пошкодження мечем через Handle.Touched на сервері",
 "Запобігайте самопошкодженню та спаму за допомогою відновлення",
 "Визначте ворогів із Humanoid",
 "Проведіть чесні випробування дуелі 1 на 1 на арені",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Ваш меч **розмахується**. Тепер **болить**.

**Хід уроку:**
1. **Теорія (40 хв)** - пошкодження сервера + перезарядка + без самоударів
2. **Практика (~25 хв)** - чесні PvP дуелі
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 5.2 - Перший меч**.`,
 },
 {
 title: "Пошкодження сервера на Handle",
 content: `**Script** (сервер) всередині\`TrainingSword\`- Roblox запускає Scripts інструментів на сервері, якщо є.\`\`\`lua
local tool = script.Parent
local handle = tool:WaitForChild("Handle")
local DAMAGE = 20
local canHit = true

handle.Touched:Connect(function(hit)
 if not canHit then
 return
 end

 local character = hit.Parent
 if not character then
 return
 end

 -- No self damage: when equipped, tool.Parent IS the character
 if character == tool.Parent then
 return
 end

 local humanoid = character:FindFirstChildOfClass("Humanoid")
 if not humanoid then
 return
 end

 canHit = false
 humanoid:TakeDamage(DAMAGE)
 print("Hit for " .. DAMAGE)

 task.wait(0.45)
 canHit = true
end)
\`\`\``,
 },
 {
 title: "Пояснення щодо запобігання самоударам",
 content: `Коли **обладнаний**,\`tool.Parent\`= **Model Character**.

Якщо ручка торкнеться вашої ноги,\`hit.Parent\`може дорівнювати\`tool.Parent\`→ **пропустити**.

**Також перевірити гравця:**\`\`\`lua
local attackerPlayer = game.Players:GetPlayerFromCharacter(tool.Parent)
local victimPlayer = game.Players:GetPlayerFromCharacter(character)
if attackerPlayer and victimPlayer and attackerPlayer == victimPlayer then
 return
end
\`\`\`**NPCs пізніше:** victimPlayer nil, але Humanoid існує - все одно завдає шкоди NPC.`,
 },
 {
 title: "Перезарядка ударів (усунення стрибків)",
 content: `Один удар може торкнутися **руки + тулуба** в одному кадрі = подвійна шкода.\`canHit = false\`протягом **0,4-0,6 секунди** після успішного попадання.

| Налаштування | Відчути |
|---------|------|
| ШКОДА 15, почекайте 0,5 | Початківець двобій |
| ШКОДА 25, почекайте 0,35 | Швидші бої |
| ШКОДА 10, почекайте 0,6 | Довші дуелі |

**Баланс:** 5 ударів, щоб перемогти 100 HP → ШКОДА 20, без броні.`,
 },
 {
 title: "Поєднати з активованим (необов’язково)",
 content: `Тільки пошкодження під час «вікна повороту»:\`\`\`lua
local swinging = false

tool.Activated:Connect(function()
 swinging = true
 task.delay(0.35, function()
 swinging = false
 end)
end)

-- In Touched: if not swinging then return end
\`\`\`Запобігає пошкодженню під час простою, натикаючись на друзів.`,
 },
 {
 title: "Протокол дуельної перевірки",
 content: `**3 дуельні випробування** з друзями або гравцями Studio 2:

1. **Trade hits** - обидва отримують пошкодження, без самоудару
2. **Спам-клацання** - час відновлення блокує пошкодження кулемета
3. **Переможець** - загинула подія, відродження працює

**Журнал:** ім’я зловмисника, ім’я жертви, сума збитку.

**Арена:** рівна підлога, створюються дві площадки, відсутність перешкод лави.`,
 },
 {
 title: "Тестовий манекен NPC (опціонально)",
 content: `Insert **Rig** або манекен з Humanoid на арену\`Dummy_Target\`.

Стій на місці - гойдайся - здоров'я падає - добре для сольного тестування.

**Anchored** на dummy; Humanoid все ще отримує пошкодження.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Пошкодження сервера на Handle з перевіркою Humanoid
- [ ] Самоудар заблоковано
- [ ] Зарядка між ударами
- [ ] 3 дуелі завершено
- [ ] Зберегти:\`Lesson 5.3 - Damage System\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Пошкодження LocalScript лише для клієнта",
 explanation: "Експлуататори і непослідовність.",
 correctApproach: "Серверний скрипт на інструменті для TakeDamage",
 },
 {
 mistake: "Без перевірки самопопадання",
 explanation: "Меч завдає шкоди власнику.",
 correctApproach: "символ == інструмент. Батьківський повернення",
 },
 {
 mistake: "Немає перезарядки",
 explanation: "Один удар = 200 пошкоджень.",
 correctApproach: "прапор canHit + task.wait",
 },
 {
 mistake: "Пошкодження, коли інструмент у рюкзаку",
 explanation: "Рукоятка не повинна вдарятися без спорядження.",
 correctApproach: "Активний лише обладнаний інструмент",
 },
 ],
 summary: "Ви додали сервер TakeDamage на Sword Handle із запобіганням самоударів і час відновлення ударів, а також провели тести на дуелі - тепер на вашій арені є справжні бої PvP.",
 practiceTask: {
 title: "Чесний бій на мечах (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Надійні поєдинки з справедливою шкодою.

### Part A - Пошкодження сервера (12 хв)
1. Скрипт на TrainingSword - ШКОДА 20, час відновлення 0,45 с
2. Профілактика самоударів
3. Індивідуальний тест на манекені АБО товариші

### Part B - Дуелі (10 хв)
1. Три раунди 1 на 1 - реєстрація влучень
2. Налаштуйте ШКОДУ, якщо бої надто довгі/короткі

### Part C - Зберегти (3 хв)
1. Додаткове поворотне вікно з активованим
2. **Зберегти в Roblox** →\`Lesson 5.3 - Damage System\` 3. **Практика завершена**`,
 hints: [
 "Друкуйте ім'я жертви на кожному вдалому ударі",
 "Якщо пошкоджень немає, переконайтеся, що Script серверний і оснащений інструментами",
 "Знизьте ШКОДУ до 15, щоб довше практикуватися в поєдинках",
 ],
 optionalChallenge: "Звук удару на сервері, коли TakeDamage вдається.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Шкода від меча повинна працювати на...",
 options: [
 "Сервер",
 "Лише клієнт",
 "Terrain",
 "StarterGui",
 ],
 correctAnswer: 0,
 explanation: "Надійний бій.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "символ == інструмент. Батько запобігає...",
 options: [
 "Самопошкодження",
 "Стрибки",
 "Збереження",
 "Монети",
 ],
 correctAnswer: 0,
 explanation: "Такий самий character.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "може бити помилкові блоки...",
 options: [
 "Спам пошкодження між ударами",
 "Екіпірування",
 "Respawn",
 "Меню Tab",
 ],
 correctAnswer: 0,
 explanation: "Натисніть час відновлення.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "TakeDamage(20) на 100 HP потребує...",
 options: [
 "5 ударів без лікування",
 "1 удар",
 "100 ударів",
 "0 ударів",
 ],
 correctAnswer: 0,
 explanation: "Проста математика TTK.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Доторкнута ручка виявляє...",
 options: [
 "Яку Part торкається лезо",
 "ClockTime",
 "DataStore",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Виявлення зіткнення.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Перевірка Humanoid ігнорує...",
 options: [
 "Стіна та не-Character",
 "Гравці",
 "NPC",
 "Health",
 ],
 correctAnswer: 0,
 explanation: "Тільки Character мають Humanoid.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Поворотне вікно з активованою...",
 options: [
 "Обмежує пошкодження активними замахами",
 "Видаляє Tool",
 "Додає монети",
 "Захоплює ділянку",
 ],
 correctAnswer: 0,
 explanation: "Додатковий рівень справедливості.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Дуельне тестування потребує...",
 options: [
 "Цілі з Humanoid",
 "Лише Terrain",
 "Без Output",
 "Спочатку публікація",
 ],
 correctAnswer: 0,
 explanation: "Characterі для пошкодження.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Додано урок 5.2...",
 options: [
 "Екіпірування Tool і Activated",
 "DataStore",
 "Ділянки tycoon",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Попереднє налаштування меча.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.3 зберегти назву...",
 options: [
 "Lesson 5.3 - Damage System",
 "First Sword",
 "Health Arena",
 "Upgrade Tables",
 ],
 correctAnswer: 0,
 explanation: "Зберегти бойовий урок.",
 },
 ],
 },
}

export const ukLesson54 = {
 lessonId: "lesson-roblox-5-4",
 moduleId: "module-05",
 order: 4,
 title: "5.4 - TweenService: плавні ефекти",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створюйте твіни (tween) з TweenInfo за допомогою TweenInfo для синхронізації та полегшення",
 "Анімуйте ворота арени та натисніть флеш-відгук",
 "Використовуйте короткі терміни для екшн-ігор",
 "Покращте відчуття бою без важких засобів",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Числа, що змінюються миттєво, нагадують електронну таблицю. **TweenService** додає **рух** - ігри виглядають преміум-класу.

**Хід уроку:**
1. **Теорія (40 хв)** - TweenInfo, easing, полірування бою
2. **Практика (~25 хв)** - ворота + удар спалахом
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте арену **Урок 5.3 - Система пошкоджень**.`,
 },
 {
 title: "Що робить TweenService",
 content: `**Tween** = плавна зміна **поточного** Properties → **цільового** значення з часом.\`\`\`lua
local TweenService = game:GetService("TweenService")
local part = workspace.Arena.Gate

local info = TweenInfo.new(
 1.2, -- duration (seconds)
 Enum.EasingStyle.Quad, -- curve shape
 Enum.EasingDirection.Out -- slow at end
)

local goal = { Position = part.Position + Vector3.new(0, 10, 0) }
local tween = TweenService:Create(part, info, goal)
tween:Play()
\`\`\`**Можна анімація:** положення, розмір, прозорість, колір, CFrame тощо.`,
 },
 {
 title: "TweenInfo - виберіть відчуття",
 content: `| EasingStyle | Відчути |
|-------------|------|
| **Лінійний** | Роботизований, постійна швидкість |
| **Квадроцикл** | Гладкі загального призначення |
| **Синус** | Плавний старт/стоп |
| **Назад** | Невелике перевищення (стрибучі двері) |

| Напрям | Відчути |
|-----------|------|
| **Поза** | Швидкий старт, м'яка посадка |
| **В** | Повільний початок, швидкий кінець |
| **InOut** | Згладьте обидва кінці |

**Екшн-ігри:** тривалість **0,15 - 0,8** секунд для зворотного зв’язку.`,
 },
 {
 title: "Ворота арени відкриваються",
 content: `Будувати\`ArenaGate\`- вертикальна плита блокування входу.\`\`\`lua
local gate = workspace.Arena.Gate
local closedPos = gate.Position
local openPos = closedPos + Vector3.new(0, 12, 0)

local function openGate()
 local tween = TweenService:Create(gate, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
 Position = openPos,
 })
 tween:Play()
end

local function closeGate()
 local tween = TweenService:Create(gate, TweenInfo.new(0.8, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {
 Position = closedPos,
 })
 tween:Play()
end
\`\`\`**Сенсорна панель** під час дзвінків на арені\`openGate()\`один раз.`,
 },
 {
 title: "Натисніть спалах на пошкодження",
 content: `Коли меч влучає, **тулуб** жертви коротко блимайте:\`\`\`lua
local function flashHit(character)
 local torso = character:FindFirstChild("UpperTorso") or character:FindFirstChild("Torso")
 if not torso then return end

 local original = torso.Transparency
 local flashIn = TweenService:Create(torso, TweenInfo.new(0.08), { Transparency = 0.5 })
 local flashOut = TweenService:Create(torso, TweenInfo.new(0.12), { Transparency = original })

 flashIn:Play()
 flashIn.Completed:Wait()
 flashOut:Play()
end
\`\`\`Телефонуйте\`flashHit(character)\`у Scripts меча після\`TakeDamage\`.`,
 },
 {
 title: "Шкала інтерфейсу користувача (необов’язково)",
 content: `**Текстова мітка**\`HitLabel\`в ScreenGui - показує\`HIT!\`на пошкодження.\`\`\`lua
label.Text = "HIT!"
label.TextTransparency = 0
label.Size = UDim2.fromScale(0.2, 0.1)

local punch = TweenService:Create(label, TweenInfo.new(0.2, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {
 Size = UDim2.fromScale(0.28, 0.14),
})

local fade = TweenService:Create(label, TweenInfo.new(0.3), { TextTransparency = 1 })

punch:Play()
punch.Completed:Wait()
fade:Play()
\`\`\`LocalScript може прослухати RemoteEvent пізніше - для уроку достатньо серверного виводу (print).`,
 },
 {
 title: "Продуктивність і правила",
 content: `**Роби:**
- Короткі анімації ключових моментів
- Повторне використання тих самих деталей/ярликів

**Уникайте:**
- 50 одночасних твінів
- Твінування кожної монети назавжди
- 3+ секунди бойового зворотного зв'язку (блокує бачення)

**Скасувати анімацію:**\`tween:Cancel()\`якщо гравець помирає в середині анімації.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Constraints відкриття/закриття воріт працюють
- [ ] Удар спалахом при успішному пошкодженні
- [ ] Тривалість менше 1 секунди для бойових ефектів
- [ ] Зберегти:\`Lesson 5.4 - Tween Polish\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Закріплені ворота Tweening з фізикою",
 explanation: "Бореться з фізичним двигуном.",
 correctApproach: "Anchored true на воротах",
 },
 {
 mistake: "Забув зберегти ClosePos",
 explanation: "Ворота не можуть повернутися.",
 correctApproach: "Зберегти позицію перед першим відкриттям",
 },
 {
 mistake: "Flash ніколи не скидає прозорість",
 explanation: "Character залишається привидом.",
 correctApproach: "Повернення анімації до початкового значення",
 },
 {
 mistake: "10-секундна анімація",
 explanation: "Блокує читабельність дуелі.",
 correctApproach: "0,1-0,2 с спалах всього",
 },
 ],
 summary: "Ви використовували TweenService з TweenInfo та easing для відкриття воріт арени та миттєвих ударів у разі пошкодження - тепер бій відчуває себе чуйним і відшліфованим, а не миттєвим і сухим.",
 practiceTask: {
 title: "Полірування арени (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Два анімаційні ефекти на вашій арені.

### Part A - Ворота (10 хв)
1.\`ArenaGate\`+ функції openGate / closeGate
2. Тригер відкрито при вході на арену

### Part B - Hit flash (12 хв)
1.\`flashHit(character)\`після TakeDamage у Scripts меча
2. Тест у поєдинку - спалах білого кольору при кожному ударі

### Part C - Зберегти (3 хв)
1. Додаткова анімація шкали міток HIT
2. **Зберегти в Roblox** →\`Lesson 5.4 - Tween Polish\` 3. **Практика завершена**`,
 hints: [
 "Почніть з Quad Out - найпростіший для налаштування",
 "Друк анімації. Завершено один раз, щоб налагодити застряглий шлюз",
 "Flash UpperTorso для R15, торс для R6",
 ],
 optionalChallenge: "Комбінована мітка збільшується після 3 звернень за 5 секунд.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "TweenService анімує Properties...",
 options: [
 "Плавно з часом",
 "Миттєво лише",
 "Ніколи",
 "Лише звук",
 ],
 correctAnswer: 0,
 explanation: "Інтерполяція між значеннями.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Перше число TweenInfo.new...",
 options: [
 "Тривалість у секундах",
 "Кількість пошкодження",
 "ID гравця",
 "Вартість монети",
 ],
 correctAnswer: 0,
 explanation: "Скільки триває анімація.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "EasingDirection.Out означає...",
 options: [
 "Повільно на фініші",
 "Ніколи не зупиняється",
 "Видаляє Part",
 "Додає монети",
 ],
 correctAnswer: 0,
 explanation: "Уповільнення на фініші.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Хіт спалах має бути...",
 options: [
 "Дуже коротко (~0.2 с загалом)",
 "10 секунд",
 "Назавжди",
 "Лише в Edit",
 ],
 correctAnswer: 0,
 explanation: "Швидкий бойовий відгук.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Створити (Part, інформація, ціль) потреби...",
 options: [
 "Instance для tween + таблиця goal",
 "Лише print",
 "Terrain",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Стандартний шаблон анімації.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Quad EasingStyle - це...",
 options: [
 "Плавне універсальне",
 "Лише для UI",
 "Зламане",
 "Лише лава",
 ],
 correctAnswer: 0,
 explanation: "Хороше послаблення за замовчуванням.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Зберігайте закрито, щоб ворота могли...",
 options: [
 "Закрити знову",
 "Ніколи не рухати",
 "Видаляє гравця",
 "Прибирає меч",
 ],
 correctAnswer: 0,
 explanation: "Поверніться у вихідне положення.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Забагато твінів викликає...",
 options: [
 "Лаг і візуальний шум",
 "Безкоштовні Robux",
 "Автозбереження",
 "Більше Health",
 ],
 correctAnswer: 0,
 explanation: "Використовуйте Constraints економно.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "flashHit йде після...",
 options: [
 "Успішного TakeDamage",
 "Приєднання гравця",
 "Фарбування Terrain",
 "Публікація",
 ],
 correctAnswer: 0,
 explanation: "Відгук про влучний момент.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.4 зберегти назву...",
 options: [
 "Lesson 5.4 - Tween Polish",
 "Damage System",
 "First Sword",
 "Arena Ready",
 ],
 correctAnswer: 0,
 explanation: "Зберегти анімаційний урок.",
 },
 ],
 },
}

export const ukLesson55 = {
 lessonId: "lesson-roblox-5-5",
 moduleId: "module-05",
 order: 5,
 title: "5.5 - Смерть та Respawn",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Обробляти Humanoid. Загинув на сервері за кожне життя",
 "Налаштуйте відродження SpawnLocation на арені",
 "Скинути стан бою на CharacterAdded",
 "Створіть стабільну петлю бій-поразка-відродження",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Перемога в дуелі означає, що хтось **вмирає** і **повертається**. Якщо цей цикл розривається, арена гине.

**Хід уроку:**
1. **Теорія (40 хв.)** - смерть, відродження, відновлення стану
2. **Практика (~25 хв)** - стабільний тест на 3 смерті
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте арену **Урок 5.4 - Tween Polish**.`,
 },
 {
 title: "Життєвий цикл арени",
 content: `**Бій** → **Поразка** (Здоров'я = 0) → **Відродження** → **Бій знову**

| Перерваний цикл | Хороший цикл |
|-------------|-----------|
| Застряг на екрані смерті | Повернення на арену через 2-4 секунди |
| Меч перестає працювати | Інструмент + скидання шкоди кожне життя |
| Спаун в лаві | Спаун на ArenaSpawn pad |`,
 },
 {
 title: "Померла подія на сервері",
 content: `\`\`\`lua
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
 player.CharacterAdded:Connect(function(character)
 local humanoid = character:WaitForChild("Humanoid")

 humanoid.Died:Connect(function()
 print(player.Name .. " was defeated in the arena")
 -- Later: +1 Wins to leaderstats for killer
 end)
 end)
end)
\`\`\`**CharacterAdded** запускає **кожне відродження** - підключайте Померлих **всередині** кожного нового життя.`,
 },
 {
 title: "Розташування арени Spawn",
 content: `**ArenaSpawn** - SpawnLocation на майданчику для поєдинку:
- Розмір\`8, 1, 8\`- Нейтрально **true**
- Яскравий колір, **Anchored true**
- **Не** внутрішня пошкодження лави

**RespawnLocation** із контрольних точок не застосовується тут, якщо ви його не встановите - за умовчанням відродження Roblox використовує SpawnLocations у робочій області.

**Кілька spawnів:**\`Spawn_Red\`,\`Spawn_Blue\`для командних дуелей пізніше.`,
 },
 {
 title: "Скидання бойового стану за життя",
 content: `меч\`canHit\`прапор може залишатися false, якщо гравець помер під час відновлення.

**Шаблон:** зберігати час відновлення на Character або скидати в CharacterAdded:\`\`\`lua
-- In sword script, use humanoid as key:
local canHitByHumanoid = {}

-- On successful hit setup:
canHitByHumanoid[humanoid] = false
task.delay(0.45, function()
 if humanoid.Parent then
 canHitByHumanoid[humanoid] = nil
 end
end)
\`\`\`Або простіше: **новий character = новий Humanoid** - повторно підключити **Touched** на кожному **CharacterAdded**, якщо потрібно.`,
 },
 {
 title: "Параметри часу відродження",
 content: `**За замовчуванням:** миттєве відродження - добре для тренувальних арен.

**Відкладено (необов’язково):**\`\`\`lua
player.RespawnTime = 3
\`\`\`Або вимкніть автоматичне відродження та виклик\`player:LoadCharacter()\`після інтерфейсу зворотного відліку.

**Для уроку:** продовжуйте швидке відродження; необов'язкові 3с\`RespawnTime\`для драми.`,
 },
 {
 title: "Стрес-тест на три смерті",
 content: `**Обов'язковий тест:**
1. Дуель до смерті - респаун на ArenaSpawn
2. Одягніть меч - шкода все ще діє
3. Померти знову - повторити
4. Померти втретє - помилки виведення все одно відсутні

**Журнал:** кількість смертей, позиція відродження в порядку, удари мечем після кожного відродження.

**Виключити попередній перегляд:** друк\`"[Victim] was defeated"\``,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Помер підключений всередині CharacterAdded
- [ ] ArenaSpawn працює при кожному відродженні
- [ ] 3 смерті - меч усе ще завдає шкоди
- [ ] Зберегти:\`Lesson 5.5 - Death Respawn\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Підключення померло лише один раз під час приєднання",
 explanation: "Пропуски відродження життя.",
 correctApproach: "Померли всередині кожного доданого Character",
 },
 {
 mistake: "Поява всередині зони пошкодження",
 explanation: "Петля смерті при відродженні.",
 correctApproach: "ArenaSpawn на безпечній підлозі",
 },
 {
 mistake: "canHit застряг false після смерті",
 explanation: "Жодної шкоди після відродження.",
 correctApproach: "Скидання для Humanoid або нового Character",
 },
 {
 mistake: "CharacterAdded не використовується",
 explanation: "Налаштування лише на одне життя.",
 correctApproach: "Довічні слухачі для бою",
 },
 ],
 summary: "Ви підключили Humanoid.Died на сервері, встановили розташування арени SpawnLocation, скинули стан бою для кожного життя та пройшли стрес-тест із трьома смертями - цикл арени стабільний для повторних дуелей.",
 practiceTask: {
 title: "Стабільний цикл відродження (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Бій → померти → відродитися → бій працює 3 рази.

### Part A - Помічник смерті (8 хв)
1. Server Script - загинув у CharacterAdded
2. Виведіть (print) ім'я гравця у випадку поразки

### Part B - Спаун (7 хв)
1.\`ArenaSpawn\`SpawnLocation - перевірити позицію відродження
2. Додатковий RespawnTime = 3

### Part C - Стрес-тест (10 хв)
1. Три смерті поспіль - меч діє на кожне життя
2. Виправте будь-які завислі часи відновлення
3. **Зберегти в Roblox** →\`Lesson 5.5 - Death Respawn\` 4. **Практика завершена**`,
 hints: [
 "Якщо відродження неправильне, перемістіть ArenaSpawn і перевірте знову",
 "Новий character = новий Humanoid - повторно підключіться, якщо Scripts є батьківськими для старого символу",
 "Прочитайте Вивід при третій смерті для червоних помилок",
 ],
 optionalChallenge: "Інтерфейс користувача 3-2-1 на екрані ScreenGui.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Загинули пожежі, коли...",
 options: [
 "Health Humanoid досягає 0",
 "Tool екіпіровано",
 "Дотик монети",
 "Ворота відкриваються",
 ],
 correctAnswer: 0,
 explanation: "Подія смерті.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "CharacterAdded працює...",
 options: [
 "Кожне нове життя / respawn",
 "Лише один раз",
 "Лише в Edit",
 "При збереженні",
 ],
 correctAnswer: 0,
 explanation: "Поява кожного Character.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Connect Died всередині CharacterAdded через...",
 options: [
 "Кожне життя потребує нового слухача",
 "Лише UI",
 "Terrain",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Кожне відродження нового Humanoid.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "ArenaSpawn має бути...",
 options: [
 "На безпечній підлозі арени",
 "У лаві",
 "Поза Workspace",
 "У StarterGui",
 ],
 correctAnswer: 0,
 explanation: "Чесна точка відродження.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "RespawnTime = 3 додавання...",
 options: [
 "Затримка перед respawn",
 "Більше пошкодження",
 "Монети",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Секунди до відродження.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Після відродження меч повинен...",
 options: [
 "Досі завдає пошкодження",
 "Ніколи не екіпірується",
 "Видаляє DataStore",
 "Прибирає ділянки",
 ],
 correctAnswer: 0,
 explanation: "Тест скидання стану.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Три перевірки на смерть...",
 options: [
 "Стабільність на кількох життях",
 "Лише одне життя",
 "Публікація",
 "Лише небо",
 ],
 correctAnswer: 0,
 explanation: "Петля стрес-тесту.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Зламаний може вдарити після смерті викликає...",
 options: [
 "Немає пошкодження після respawn",
 "Більше Health",
 "Швидші ворота",
 "Автоперемога",
 ],
 correctAnswer: 0,
 explanation: "Помилка стану відновлення.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Розпорядник смерті належить до...",
 options: [
 "Сервер",
 "Лише HUD клієнта",
 "Пензель Terrain",
 "Звук",
 ],
 correctAnswer: 0,
 explanation: "Авторитетні ігрові події.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.5 зберегти назву...",
 options: [
 "Lesson 5.5 - Death Respawn",
 "Tween Polish",
 "First Sword",
 "Tycoon Works",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок відродження.",
 },
 ],
 },
}

export const ukLesson56 = {
 lessonId: "lesson-roblox-5-6",
 moduleId: "module-05",
 order: 6,
 title: "5.6 - Checkpoint: Arena готова",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Здайте Arena Ready з мечем, пошкодженнями, Constraints та відродженням",
 "Пройдіть тести QA на чесність поєдинків і стабільність",
 "Додайте необов’язкову статистику перемоги лідера при вбивствах",
 "Підготуйтеся до гоночних систем модуля 6",
 ],
 theory: {
 sections: [
 {
 title: "Контрольна точка модуля 5 (близько 40 хвилин)",
 content: `**Арена готова** = міні-арена PvP, яку можна продемонструвати за 2 хвилини.

**Потрібні системи:**
- Здоров'я + зони шкоди (5.1)
- TrainingSword + пошкодження (5.2-5.3)
- Tween gate або hit flash (5.4)
- Смерть + цикл відродження (5.5)`,
 },
 {
 title: "Порядок збірки інтеграції",
 content: `1. Spawn + схема арени
2. Екіпірування меча + пошкодження сервера + відновлення
3. Самоударний блок
4. Загинув + ArenaSpawn
5. Твін-полір
6. Передача балансу (ШКОДА 15-25, час відновлення 0,4-0,5)`,
 },
 {
 title: "Дуель QA матриця",
 content: `| # | Тест |
|---|------|
| 1 | 1v1 - обидва отримують досить шкоди |
| 2 | Немає шкоди самому мечу |
| 3 | Перезарядка блокує спам, вбиває |
| 4 | Смерть → відродження на ArenaSpawn |
| 5 | Після відродження бойові роботи |
| 6 | Hit Flash видимий, не блокує перегляд |
| 7 | Немає червоного виходу протягом 2-хвилинної дуелі |`,
 },
 {
 title: "Цілі балансу",
 content: `**Час на вбивство:** ~8-15 секунд для рівних навичок (100 HP, 20 пошкоджень, 0,45 кд)

**Перші 2 хвилини** новий гравець:
- Дивіться знак арени
- Дістань меч із рюкзака
- Наземні удари зі зворотним зв'язком
- Зрозумійте відродження

Зменшіть ШКОДУ, якщо бої здаються занадто швидкими.`,
 },
 {
 title: "Додаткова статистика перемог",
 content: `\`\`\`lua
-- In leaderstats setup:
local wins = Instance.new("IntValue")
wins.Name = "Wins"
wins.Value = 0
wins.Parent = leaderstats

-- On Died (track last attacker later); simple version:
-- increment winner when implementing kill credit
\`\`\`Для контрольної точки: колонка **Перемоги** на вкладці вражає в демоверсії.`,
 },
 {
 title: "Презентація",
 content: `- Знак назви арени: **SmartCode Arena**
- Сповни командного кольору необов'язкові
- Немає лави в дуельній підлозі, якщо не навмисна небезпека
- Звук підхоплення + спалах

**Зберегти:**\`Module 5 - Arena Ready\``,
 },
 {
 title: "Попередній перегляд модуля 6",
 content: `**Швидше, вище, далі** - будуйте автомобілі, гоночні траси, хронометри кіл, основи клієнт-сервер.

Бойові навички (авторитет сервера, Constraints, цикли) передаються на **відчуття перегонів** і **фінішні прямі**.`,
 },
 {
 title: "Демонстраційний Script (2 хв)",
 content: `1. Spawn - показати меч
2. Відкрийте ворота на арену
3. Торгові хіти - миттєвий відгук
4. Виграти дуель - повідомлення про смерть
5. Невдаха відроджується - бийтеся знову
6. Показати вкладку **Виграші**, якщо додано`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Пропущений стрес-тест відродження",
 explanation: "Перерви на друге життя в публікації.",
 correctApproach: "Три смерті мінімум",
 },
 {
 mistake: "Один постріл 100 пошкоджень",
 explanation: "Дуелі не весело.",
 correctApproach: "Збалансуйте ШКОДУ та час відновлення",
 },
 {
 mistake: "Відсутність бойового відгуку",
 explanation: "Відчувається м'яким.",
 correctApproach: "Спалах або звук під час удару",
 },
 {
 mistake: "Пошкодження лише для клієнта в остаточній збірці",
 explanation: "Експлойти при публікації.",
 correctApproach: "Сервер TakeDamage",
 },
 ],
 summary: "Ви інтегрували повний бойовий стек у Arena Ready, пройшли дуельну перевірку якості, налаштували час на вбивство та зберегли готовий до демо-версії фрагмент PvP - перегони за модулем 6 починаються далі.",
 practiceTask: {
 title: "Здайте Arena Ready (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** Пройти QA матрицю + готове до демонстрації збереження.

### Part A - Повний аудит (15 хв)
1. Запустіть контрольний список порядку інтеграції
2. Виправте будь-яку відсутню систему з 5.1-5.5

### Part B - QA дуелі (15 хв)
1. Виконайте тести 1-7 з другом або двома гравцями Studio
2. Налаштуйте DAMAGE на 8-15 с TTK

### Part C - Зберегти та продемонструвати (10 хв)
1. Додаткові перемоги в статистиці лідерів
2. **Зберегти в Roblox** →\`Module 5 - Arena Ready\` 3. **Практика завершена** + 2-хвилинний запис`,
 hints: [
 "Баланс перед додаванням статистики перемог",
 "Дивіться дуель з обох камер для видимості",
 "Консервативна шкода > кричущий зламаний бій",
 ],
 optionalChallenge: "Кредит за вбивство - останній гравець отримує +1 перемоги за смерть жертви. (Готуй арену - в Уроці 5.7 ти зустрінеш цілі хвилі ворогів!)",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Arena Ready включає...",
 options: [
 "Меч + пошкодження + respawn + полірування",
 "Лише Terrain",
 "Лише монети",
 "Без Scripts",
 ],
 correctAnswer: 0,
 explanation: "Повний стек Module 5.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Тест 4 підтверджує...",
 options: [
 "Respawn на spawn арени",
 "DataStore",
 "Ділянка tycoon",
 "Генерація Terrain",
 ],
 correctAnswer: 0,
 explanation: "Цикл смерті.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Хороший TTK - це про...",
 options: [
 "Приблизно 8–15 секунд",
 "0.1 секунди",
 "5 хвилин",
 "Без бою",
 ],
 correctAnswer: 0,
 explanation: "Читальна довжина дуелі.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Пошкодження сервера запобігає...",
 options: [
 "Експлойти клієнта",
 "Стрибки",
 "UI",
 "Звук",
 ],
 correctAnswer: 0,
 explanation: "Надійний бій.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Tween hit flash не повинен...",
 options: [
 "Блокувати огляд на секунди",
 "Не існує",
 "Використовує TweenService",
 "Допомагає зворотному зв'язку",
 ],
 correctAnswer: 0,
 explanation: "Тільки короткі FX.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Перемагає в рейтингу лідерів...",
 options: [
 "Кількість вбивств у Tab",
 "Лише Health",
 "Terrain",
 "ClockTime",
 ],
 correctAnswer: 0,
 explanation: "Додаткова статистика арени.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Тема модуля 6...",
 options: [
 "Перегони / транспорт",
 "Лише obby",
 "Лише магазин",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Швидше Вище Далі.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Червоний вихід під час дуелі означає...",
 options: [
 "Виправити перед релізом",
 "Ідеально",
 "Додати лаву",
 "Публікувати зараз",
 ],
 correctAnswer: 0,
 explanation: "Помилки = помилки.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Тест на три смерті належить...",
 options: [
 "Стабільність respawn уроку 5.5",
 "Розміщення монет",
 "Лише Terrain",
 "Публікація",
 ],
 correctAnswer: 0,
 explanation: "Стрес-тест Respawn.",
 },
        {
 id: "q10",
 type: "multiple_choice",
 question: "Модуль 5 зберегти назву...",
 options: [
 "Module 5 - Arena Ready",
 "Lesson 5.1",
 "Tycoon Works",
 "Untitled",
 ],
 correctAnswer: 0,
 explanation: "Name портфоліо Checkpoint.",
 },
 ],
 },
}

export const ukLesson57 = {
 lessonId: "lesson-roblox-5-7",
 moduleId: "module-05",
 order: 7,
 title: "5.7 - Difficulty curve",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Пояснити difficulty curve як зростання складності від біому 1 до біому 3",
 "Змінити складність одним важелем за раз (gap, hazard, timing, щільність CP)",
 "Використати Config table платформ/пасток для ітерації без перебудови всього",
 "Перетестувати короткий сегмент після кожної зміни і записати результат",
 "Підготувати Obby до peer-прогону в 5.8 без тотального редизайну сцени",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 35 з 92)",
 content: `У **5.6** ти зібрав багліст і побачив, де гравець «стопориться» або «летить без думки». Сьогодні не будуєш новий острів - ти **крутиш криву складності**: ранній біом добріший до новачка, середній вимагає уваги, фінал відчувається викликом, а не випадковістю.

Артефакт:
1. Короткий план «де зараз занадто важко / занадто легко» з багліста 5.6.
2. Мінімум 3 точкові зміни (не три нові біоми).
3. Хоча б одна зміна через Config (таймінг платформи / cooldown пастки).
4. Retest після кожної зміни - 1–2 хвилини прогону сегмента.
5. Save: Lesson 5.7 - Difficulty Curve.

**Зроби зараз (3 хв):** відкрий багліст 5.6 і познач 3 пункти міткою Hard / Easy / Unfair. Це вхідні дані уроку, не декорація.`,
 },
 {
 title: "Що таке difficulty curve",
 content: `| Плоска крива | Зростаюча крива |
|--------------|-----------------|
| Біом 1 = Біом 3 за жорсткістю | Біом 1 вчить, Біом 3 перевіряє |
| Новачок здається на старті | Новачок встигає навчитись |
| Фінал випадково «щастить» | Фінал читається як майстерність |

Метафора: крива - **сходи**, не ліфт. Кожна сходинка трохи вища, але ти бачиш наступну. Ліфт «сразу 10 поверх» - це unfair spike: гравець не вчиться, лише злиться.

Obby з трьома біомами ідеально лягає на криву: навчальний → тренувальний → іспит. Якщо всі три однакові - у тебе не продукт, а копіпаста паркуру.`,
 },
 {
 title: "Важелі складності (меню інструментів)",
 content: `Не треба вигадувати нову механіку щоразу. Крути відомі важелі:

| Важіль | Легше | Жорсткіше |
|--------|-------|-----------|
| Gap між платформами | Менший розрив | Більший розрив |
| Ширина платформи | Ширша | Вужча |
| Hazard cooldown / hit | Довший відпочинок | Частіший удар |
| while-платформа timing | Повільніший цикл | Швидший / коротше вікно |
| Щільність чекпоінтів | Більше CP | Менше CP |
| Видимість небезпеки | Яскравий neon / Billboard | Ледь помітна (обережно!) |

Правило дня: **один важіль за прохід ітерації**. Якщо змінив gap і timing одночасно - не зрозумієш, що саме допомогло.

**Зроби зараз (5 хв):** вибери 1 важіль для біому 1 і 1 для біому 3. Запиши до/після числа (studs, секунди).`,
 },
 {
 title: "Config як пульт балансу",
 content: `У **5.4** платформи вже мають (або мають мати) table:

\`local PlatformConfig = {\`
\` { id = "p1", waitUp = 2, waitDown = 2 },\`
\` { id = "p2", waitUp = 1.2, waitDown = 1.5 },\`
\`}\`

Сьогодні ти не переписуєш while з нуля - крутиш числа. Те саме для hazards з debounce/cooldown у **5.2**, якщо виніс у Config.

Чому це важливо: peer у **5.8** і juice у **5.9** очікують стабільну сцену. Якщо ти щоразу ламаєш Parts руками без запису - крива зникне завтра.

\`-- було: waitUp = 1.0 → стало: waitUp = 1.6 для навчального біому\`

Залиш коментар у Config з датою ітерації - ментор бачить думку, не магію.`,
 },
 {
 title: "Додати vs прибрати складність",
 content: `| Симптом з 5.6 | Дія |
|---------------|-----|
| Смерть на першій хвилині 5+ разів | Прибери (gap↓, CP↑, hazard↓) |
| Біом 2 «пробігається з нудьгою» | Додай (вужчі платформи / швидший цикл) |
| Секрет ламає прогрес | Зроби секрет опційним, не обов’язковим |
| Фініш після 2 хвилин без навчання | Розтягни середній біом або додай 1 чесний виклик |

«Додати складність» ≠ «зробити невидимо смертельну яму». Fair hard читається очима: гравець бачить ризик і програє через помилку таймінгу, не через невидимий KillBrick.

«Прибрати» ≠ «вирізати весь біом». Часто достатньо одного ширшого Part і одного CP перед стрибком.`,
 },
 {
 title: "Несправедливі спайки",
 content: `Unfair spike - місце, де складність стрибає без навчання:

1. Перший стрибок у біомі 1 вимагає ідеального edge-slide.
2. Пастка того ж кольору, що підлога.
3. Рухома платформа з вікном 0.2 с без попередження.
4. Респавн далеко позаду без CP після важкої секції.

Фікс спайку - не «зроби все легким», а **навчи раніше**: дай маленький тренувальний gap у біомі 1, потім більший у біомі 2. Гравець уже знає правило.

**Зроби зараз (5 хв):** пройди біом 1 сам і пошукай 1 unfair місце. Якщо знайшов - виправ до кінця уроку.`,
 },
 {
 title: "Один change → один retest",
 content: `Ритуал ітерації:

1. Обери пункт з багліста.
2. Зміни один важіль.
3. Play сегмент 60–120 с.
4. Запиши: Better / Same / Worse + чому.
5. Лише тоді бери наступний пункт.

Без запису ти «крутиш навмання» і в 5.8 peer знову впаде там само. Таблиця на папері або в Notepad достатня:

| # | Зміна | Результат |
|---|-------|-----------|
| 1 | p2.waitUp 1.0→1.5 | Better - встигаю |
| 2 | Gap біом3 +2 studs | Worse - занадто далеко, відкат |

Два гірші результати підряд - відкоти останню зміну. Гордість не рятує криву.`,
 },
 {
 title: "Три біоми - три ролі",
 content: `| Біом | Роль на кривій | Типовий фокус сьогодні |
|------|----------------|------------------------|
| 1 | Навчання | Більше CP, м’якші gaps, читабельні hazards |
| 2 | Тренування | Середні таймінги, перші комбо-стрибки |
| 3 | Іспит | Менше CP, вужчі вікна, але fair visual |

Не роби біом 1 «пустелею без пасток» і біом 3 «хаосом». У кожному біомі є небезпека, але **щільність і вибагливість** ростуть.

Якщо в тебе ще немає трьох папок біомів з 5.1 - сьогодні не малюй нові світи. Працюй з тим, що є, і познач у нотатках «біом 1/2/3» навіть якщо папки називаються ZoneA/B/C.`,
 },
 {
 title: "Зв’язок з 5.6 і 5.8",
 content: `**5.6** дав сирі спостереження. **5.7** перетворює їх на керовані зміни. **5.8** перевірить криву чужими руками.

Не витрачай годину на косметику біому (нові Mesh, небо) замість кривої - juice буде в **5.9**, ship у **5.10**. Сьогодні продукт вимірюється питанням: «чи новачок доходить далі, ніж учора, без читів?».

Якщо багліст порожній - зроби 5-хвилинний self-playtest зараз і створи мінімум 3 спостереження. Інакше нема що балансувати.`,
 },
 {
 title: "Playtest кривої",
 content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Старт біому 1 | Смерть можлива, але не стіна на 1-му стрибку |
| 2 | Середина біому 2 | Потрібна увага, CP рятує від повного рестарту |
| 3 | Біом 3 | Важко, але причина смерті зрозуміла |
| 4 | Після змін Config | Числа збігаються з відчуттям |
| 5 | Порівняй з нотатками до/після | Хоча б 2 Better |
| 6 | Output | Немає спаму помилок від while/hazard |

Якщо пункт 1 червоний після «полегшення» - ти крутив не той важіль або не той біом.`,
 },
 {
 title: "Анти-патерни балансу",
 content: `| Патерн | Чому погано | Фікс |
|--------|-------------|------|
| 10 змін за раз | Немає причинності | Один важіль |
| «Зроблю ще важче, бо я проходжу» | Ти експерт свого рівня | Думай як новачок |
| Прибрати всі CP у біомі 1 | Frustration ≠ difficulty | CP - частина fairness |
| Секрет обов’язковий для фінішу | Ламає основний loop | Секрет опційний |
| Невидимий KillBrick | Unfair | Neon / форма / звук пізніше в 5.9 |

**Зроби зараз (4 хв):** викресли з плану будь-яку зміну, що одночасно чіпає 3+ важелі.`,
 },
 {
 title: "Чекліст здачі уроку 35",
 content: `- [ ] Багліст 5.6 відкритий, 3 пункти пріоритезовані
- [ ] Мінімум 3 точкові зміни на кривій
- [ ] Хоча б 1 зміна через Config з коментарем
- [ ] Retest після кожної зміни з Better/Same/Worse
- [ ] Біом 1 м’якший або fairer, ніж на старті уроку (якщо був spike)
- [ ] Біом 3 лишається викликом, але без invisible death
- [ ] Немає тотального редизайну сцени «з нуля»
- [ ] Save: Lesson 5.7 - Difficulty Curve

Далі **5.8** - повний прохід другом по рубриці. Якщо крива сьогодні плоска - peer у 5.8 лише підтвердить біль.

Артефакт: **керована крива**, не «я побудував більше Parts». Ментор за 5 хв бачить таблицю до/після і відчуває різницю в біомі 1 vs 3.

Не ховай баланс у випадкових Move інструментом без запису. Залиш Config і нотатки - інакше 5.9/5.10 поліруватимуть хаос.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Змінити все й одразу «на око»",
 explanation: "Немає навчання з ітерації.",
 correctApproach: "Один важіль → retest → запис",
 },
 {
 mistake: "Балансити під себе як автора",
 explanation: "Ти знаєш кожен стрибок напам’ять.",
 correctApproach: "Дивись багліст новачка з 5.6",
 },
 {
 mistake: "Прибрати всі чекпоінти «щоб було хардкор»",
 explanation: "Це frustration, не skill check.",
 correctApproach: "Зменшуй CP поступово до фіналу",
 },
 {
 mistake: "Ігнорувати Config і крутити лише Parts",
 explanation: "Завтра не відтвориш таймінг.",
 correctApproach: "Числа в table + коментар",
 },
 {
 mistake: "Невидимі пастки як «складність»",
 explanation: "Unfair spike ламає довіру.",
 correctApproach: "Читабельний ризик, жорсткий таймінг",
 },
 {
 mistake: "Редизайн трьох біомів замість кривої",
 explanation: "Не встигнеш до 5.8/Ship.",
 correctApproach: "Точкові зміни на існуючій сцені",
 },
 ],
 summary: "Ти вирівняв difficulty curve Obby: точкові зміни важелів і Config після багліста 5.6, з retest після кожного кроку. Біоми вчать → тренують → іспитують без невидимих спайків, готові до peer-прогону в 5.8.",
 practiceTask: {
 title: "Крива за одну сесію (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** три записані ітерації складності з відчутною різницею біом 1 vs 3.

### Part A - Пріоритети (8 хв)
1. Візьми багліст 5.6.
2. Вибери 3 пункти Hard/Easy/Unfair.
3. Признач кожному один важіль.

### Part B - Ітерації (14 хв)
1. Зміна 1 + retest + запис.
2. Зміна 2 (бажано Config) + retest.
3. Зміна 3 на фінальному біомі + retest.

### Part C - Порівняння (8 хв)
1. Пройди біом 1 і біом 3 підряд.
2. Коротко напиши, чи крива зростає.
3. **Save:** Lesson 5.7 - Difficulty Curve`,
 hints: [
 "Спочатку прибери unfair spike, потім додавай hard у фінал",
 "waitUp/waitDown у Config - найшвидший важіль",
 "Не чіпай секрет, якщо основний шлях ще болить",
 ],
 optionalChallenge: "Зроби A/B: дві версії одного gap (Part прозорий маркер) і обери fair після двох прогонів.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 5.7?",
 options: [
 "Налаштувати difficulty curve точковими змінами після багліста",
 "Побудувати нову арену хвиль",
 "Видалити всі чекпоінти назавжди",
 "Опублікувати гру без тесту",
 ],
 correctAnswer: 0,
 explanation: "Крива складності.",
 },
 {
 id: "q2",
 type: MC,
 question: "Що таке зростаюча difficulty curve?",
 options: [
 "Складність росте від раннього біому до фіналу",
 "Усі біоми однаково неможливі",
 "Складність лише в кольорі Sky",
 "Крива замінює Humanoid",
 ],
 correctAnswer: 0,
 explanation: "Сходи навчання.",
 },
 {
 id: "q3",
 type: MC,
 question: "Скільки важелів міняти за одну ітерацію?",
 options: [
 "Один, потім retest",
 "Обов’язково десять одразу",
 "Жодного - лише теорія",
 "Лише колір Baseplate",
 ],
 correctAnswer: 0,
 explanation: "Причинність.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо Config у балансі 5.7?",
 options: [
 "Крутити таймінги числами без ломання всієї сцени",
 "Config малює Terrain сам",
 "Без Config TAB не існує",
 "Config видаляє багліст",
 ],
 correctAnswer: 0,
 explanation: "Пульт чисел.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що таке unfair spike?",
 options: [
 "Різкий стрибок складності без навчання / читабельності",
 "Справедливий фінальний виклик",
 "Назва Folder",
 "Звук чекпоінта",
 ],
 correctAnswer: 0,
 explanation: "Несправедливий стрибок.",
 },
 {
 id: "q6",
 type: MC,
 question: "Якщо новачок помирає 5+ разів на першій хвилині?",
 options: [
 "Полегшити біом 1 (gap/CP/hazard)",
 "Прибрати весь Obby",
 "Зробити фінал ще жорсткішим одразу",
 "Вимкнути Play",
 ],
 correctAnswer: 0,
 explanation: "Прибрати стіну на старті.",
 },
 {
 id: "q7",
 type: MC,
 question: "Роль біому 3 на кривій?",
 options: [
 "Іспит: важко, але fair і читабельно",
 "Повне видалення всіх Parts",
 "Лише секрет без основного шляху",
 "Місце для DataStore",
 ],
 correctAnswer: 0,
 explanation: "Фінальний виклик.",
 },
 {
 id: "q8",
 type: MC,
 question: "Чому погано балансити лише «бо я проходжу»?",
 options: [
 "Автор знає рівень напам’ять, новачок - ні",
 "Автор завжди гірший за новачка",
 "Lua забороняє автору грати",
 "TAB тоді зникає",
 ],
 correctAnswer: 0,
 explanation: "Сліпа зона автора.",
 },
 {
 id: "q9",
 type: MC,
 question: "Як 5.7 готує 5.8?",
 options: [
 "Peer отримає fair криву замість сирих спайків",
 "5.8 скасовує всі зміни балансу",
 "Peer тестує лише Skybox",
 "Рубрика не потрібна після балансу",
 ],
 correctAnswer: 0,
 explanation: "Готовий продукт до прогону.",
 },
 {
 id: "q10",
 type: MC,
 question: "Що записати після retest?",
 options: [
 "Better / Same / Worse і коротку причину",
 "Лише «ок» без деталей",
 "Нічого - пам’ять надійна",
 "Видалити багліст",
 ],
 correctAnswer: 0,
 explanation: "Журнал ітерацій.",
 },
 {
 id: "q11",
 type: MC,
 question: "Чи має секрет бути обов’язковим для фінішу?",
 options: [
 "Ні - основний шлях має проходитися без секрету",
 "Так завжди",
 "Секрет замінює чекпоінти",
 "Секрет вимикає hazards",
 ],
 correctAnswer: 0,
 explanation: "Опційний контент.",
 },
 {
 id: "q12",
 type: MC,
 question: "Який важіль типовий для while-платформи?",
 options: [
 "waitUp / waitDown у Config",
 "MaxHealth гравця",
 "Назва Place",
 "Volume музики Roblox",
 ],
 correctAnswer: 0,
 explanation: "Таймінг циклу.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що робити, якщо дві зміни підряд Worse?",
 options: [
 "Відкотити останню і спробувати інший важіль",
 "Змінити ще 20 речей одразу",
 "Видалити біом 1",
 "Ігнорувати і йти в Ship",
 ],
 correctAnswer: 0,
 explanation: "Відкат і нова гіпотеза.",
 },
 {
 id: "q14",
 type: MC,
 question: "Чому невидимий KillBrick - погана «складність»?",
 options: [
 "Гравець не читає ризик - це unfair",
 "KillBrick завжди підвищує FPS",
 "Без нього неможливий фініш",
 "Він замінює Config",
 ],
 correctAnswer: 0,
 explanation: "Fair = видимий ризик.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 5.7?",
 options: [
 "3 ітерації з записом + Save Difficulty Curve",
 "Лише теорія без змін",
 "Порожній Baseplate",
 "Новий жанр тайкун замість Obby",
 ],
 correctAnswer: 0,
 explanation: "Керована крива.",
 },
 ],
 },
}

export const ukLesson58 = {
  lessonId: "lesson-roblox-5-8",
  moduleId: "module-05",
  order: 8,
  title: "5.8 - Checkpoint: повний прохід",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Проведи повний прохід свого obby з другом-гравцем, поки ти спостерігаєш і фіксуєш враження",
    "Оціни продукт за рубрикою з 6 категорій: fun, fairness, чіткість шляху, надійність чекпоінтів, читкість небезпек, секрети",
    "Занотуй баги й зависання з таймкодом та рівнем серйозності, не зупиняючи прогін гравця",
    "Перевір справедливість складності відносно 5.7 і виправ лише блокуючі проблеми одним проходом",
    "Підготуй окремий список ідей для polish в 5.9 і зафіксуй стан продукту перед фінальним Ship у 5.10",
  ],
  theory: {
    sections: [
      {
        title: "Твій сьогоднішній шлях (приблизно 35 хвилин)",
        content: `Це **checkpoint-урок** - контрольна точка модуля 5, а не звичайний урок нового API. Сьогодні ти не пишеш новий код - ти **перевіряєш** усе, що збудував у 5.1-5.7, повним прогоном разом з другом.

**Хід уроку:**
1. **Теорія (35 хв)** - що таке checkpoint, ролі, рубрика, нотатки про баги
2. **Практика (~25 хв)** - повний прохід з другом за рубрикою + один прохід виправлень
3. **Вікторина (15 хв)** - проходження **70%**

Візьми з собою: свій obby з 5.1-5.7, друга (або одного), рубрику з цього уроку і місце для нотаток.`,
      },
      {
        title: "Що таке checkpoint-урок (product gate)",
        content: `У модулі 5 контрольна точка стоїть не в кінці, а **посередині** - після 5.7 (difficulty curve) і перед 5.9 (juice) та 5.10 (ship). Це не випадково.

**Product gate** означає: перш ніж додавати блиск (звук, частинки, ефекти в 5.9) і випускати гру (5.10), продукт повинен **пройти перевірку реальним гравцем від початку до кінця**. Немає сенсу прикрашати рівень, який ніхто не може пройти.

Checkpoint-урок відповідає на одне питання: чи працює твій obby як **цілісний продукт**, а не як набір окремих механік з 5.1-5.7? Біоми (5.1), небезпеки (5.2), чекпоінти (5.3), платформи (5.4) і секрети (5.5) кожен раз тестувалися окремо. Сьогодні - вперше - все це складається в один безперервний прохід.`,
      },
      {
        title: "Дві ролі: гравець і спостерігач",
        content: `Сьогодні працюєш у парі. Один друг бере роль **гравця**, інший - роль **спостерігача**. Якщо другого фізично немає поруч - підійде дзвінок з демонстрацією екрана або сусід по класу.

| Роль | Що робить | Чого НЕ робить |
|------|-----------|----------------|
| Гравець | Проходить obby від спавну до фінішу, як звичайний новий гравець | Не отримує підказок про секрети чи складні місця |
| Спостерігач | Заповнює рубрику, записує баги з таймкодом, мовчить під час прогону | Не втручається, не виправляє на льоту, не грає сам |

Після одного повного проходу ролі можна поміняти, якщо є час і другий обby-власник у парі. Головне правило: **гравець проходить рівень так, як його б проходив незнайомець**, який ніколи не бачив цей код.`,
      },
      {
        title: "Рубрика оцінювання - 6 категорій",
        content: `Рубрика - це не оцінка "добре/погано", а структурований список, що не дає забути важливе під час прогону. Оціни кожну категорію від 1 до 5 одразу після фінішу, поки враження свіжі:

| Категорія | Питання, на яке відповідаєш |
|-----------|------------------------------|
| Fun (задоволення) | Чи хотілося грати далі, чи набридло? |
| Fairness (справедливість) | Чи смерті відчувалися чесними, чи випадковими? |
| Чіткість шляху | Чи завжди було зрозуміло, куди йти далі? |
| Надійність чекпоінтів | Чи респавн завжди повертав на останній CP без збоїв? |
| Читкість небезпек | Чи небезпеки було видно заздалегідь, чи вони з'являлися несподівано? |
| Секрети (необов'язково) | Чи секрет було цікаво знайти, чи він зламав прохід (softlock)? |

Шість чисел від 1 до 5 - це твій **знімок стану продукту** перед 5.9 і 5.10.`,
      },
      {
        title: "Як користуватись рубрикою під час прогону",
        content: `Заповнювати рубрику **під час** гри складно - увага йде на записи, а не на гравця. Тому працюй у два етапи:

1. **Під час прогону** - лише короткі нотатки-тригери: "CP2 - респавн не спрацював", "Biome 2 - лава непомітна", "Секрет - не знайшов за 3 хв"
2. **Одразу після фінішу** - перетвори нотатки на оцінки 1-5 у таблиці рубрики, поки пам'ятаєш деталі

Не чекай до кінця дня, щоб заповнити рубрику - через годину ти забудеш половину дрібних деталей, а саме дрібниці ("тут я на секунду завагався, куди йти") найцінніші для fairness і чіткості шляху.`,
      },
      {
        title: "Нотатки про баги без зупинки потоку",
        content: `Головне правило спостерігача: **гра не зупиняється через баг**. Якщо гравець застряг чи впав крізь платформу - запиши й дозволь гравцеві саморучно респавнитись через чекпоінт, як це зробив би звичайний гравець без розробника поруч.

Формат нотатки бага - три частини, одним рядком:
де - що сталося - наскільки блокує

Приклад: Biome 3, платформа 2 - гравець провалився під платформу - блокуюче.

Останнє слово - рівень серйозності - найважливіше. Розрізняй:
- **Блокуюче** - неможливо пройти далі без цього виправлення
- **Заважає** - можна пройти, але неприємно (наприклад, нечіткий чекпоінт)
- **Косметичне** - не впливає на прохід (колір, текстура, звук)

Ця класифікація напряму визначає, що ти виправляєш сьогодні, а що йде в список 5.9.`,
      },
      {
        title: "Зв'язок з 5.6 - багліст playtest #1",
        content: `У 5.6 ти вже провів перший playtest і зібрав багліст. Сьогоднішній прогін - це **другий, повніший** цикл того самого процесу, тепер із запрошеним гравцем замість самоперевірки.

Перед стартом відкрий старий багліст із 5.6 і перевір: чи виправлені пункти звідти справді зникли під час сьогоднішнього прогону? Якщо стара проблема ("чекпоінт 2 не зберігає прогрес") трапляється знову - це критичний сигнал: виправлення з 5.6 або не прижилося, або зламалося пізніше в 5.7.

Новий багліст сьогодні не замінює старий - він **продовжує** його. Веди один загальний список проблем проєкту, а не окремий файл на кожен урок.`,
      },
      {
        title: "Зв'язок з 5.7 - чи справедлива складність",
        content: `У 5.7 ти вибудував криву складності (difficulty curve) - biome 1 легший за biome 3, небезпеки поступово ускладнюються. Сьогоднішній прогін з другом - це перша перевірка цієї кривої **на людині, яка не знає рівень напам'ять**.

Спостерігай за категорією Fairness особливо уважно на переходах між біомами:
- Чи стрибок складності від biome 1 до biome 2 відчувається різким чи плавним?
- Чи гравець помирав через власну помилку, чи через нечесний елемент (невидима небезпека, дивна фізика платформи)?

Якщо крива складності з 5.7 виявляється занадто крутою на одному переході - це не привід переробляти весь biome сьогодні. Запиши це як відому проблему і повернись до балансу окремим циклом, якщо будуть додаткові уроки на це.`,
      },
      {
        title: "Один прохід виправлень після гри",
        content: `Коли прогін закінчено і рубрику заповнено, у тебе є рівно **один прохід виправлень** - не більше. Це свідоме обмеження, а не лінь.

Правило вибору, що виправляти:
1. Спочатку всі пункти з позначкою **блокуюче** - без них гру неможливо пройти
2. Потім **заважає**, якщо лишається час - і тільки якщо виправлення коротке (5-10 хв)
3. **Косметичне** й "було б краще, якби..." - НЕ сьогодні, це матеріал для 5.9

Після виправлень **не** запускай третій повний прогін - довірся рубриці й нотаткам. Мета checkpoint-уроку - зафіксувати стан продукту, а не довести його до ідеалу за одне заняття.`,
      },
      {
        title: "Чого НЕ робити сьогодні",
        content: `Checkpoint-урок має чіткі межі. Легко захопитися і почати переробляти цілий biome, бо "так буде краще" - це помилка, яка забирає весь час заняття на одну ідею замість повної перевірки продукту.

**Поза межами сьогоднішнього уроку:**
- Повне перепроєктування біома чи його теми (5.1)
- Заміна механіки небезпек на нову систему (5.2)
- Переписування логіки чекпоінтів з нуля (5.3)
- Додавання нових типів платформ (5.4)
- Створення нових секретів чи кімнат (5.5)

Усе це - чудові ідеї, але для **окремого** циклу розробки, не для сьогодні. Сьогодні ти перевіряєш і фіксуєш дрібні поломки, а великі архітектурні зміни записуєш як ідею на майбутнє, а не виконуєш прямо зараз.`,
      },
      {
        title: "Готуй список для 5.9 - Juice",
        content: `Не всі нотатки з сьогоднішнього прогону - баги. Частина - це ідеї для **juice** (звук, частинки, дрібні ефекти), які прийдуть в уроці 5.9. Тримай два окремі списки, а не один:

| Список | Приклад запису | Куди йде |
|--------|-----------------|-----------|
| Баги | "CP2 не зберігає прогрес" | Виправляєш сьогодні (один прохід) |
| Juice-ідеї | "Звук стрибка на пружинній платформі був би класним" | Список для 5.9, не сьогодні |

Коли друг каже "було б круто, якби тут спалахнуло світло" - це не баг, це запис у другий список. Змішування цих двох списків - найшвидший спосіб втратити фокус checkpoint-уроку.`,
      },
      {
        title: "Контрольний список перед стартом практики",
        content: `- [ ] Другий учасник (гравець) готовий і не бачив рівень раніше або погодився грати "як новачок"
- [ ] Рубрика з 6 категоріями роздрукована або відкрита поруч
- [ ] Місце для нотаток багів готове (текстовий файл, папір, Notes-скрипт)
- [ ] Старий багліст з 5.6 відкритий поруч для порівняння
- [ ] Домовились: гравець грає без підказок, спостерігач мовчить під час прогону
- [ ] Зберегти: \`Lesson 5.8 - Full Playthrough\``,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Спостерігач зупиняє гравця для негайного виправлення бага",
      explanation: "Зупинки ламають враження від повного проходу і викривлюють оцінку Fun і Fairness",
      correctApproach: "Запиши баг з таймкодом і дозволь прогону продовжуватися без переривань",
    },
    {
      mistake: "Рубрику заповнюють з пам'яті через годину після прогону",
      explanation: "Дрібні деталі про плутанину на шляху чи нечіткі небезпеки забуваються найшвидше",
      correctApproach: "Заповнюй оцінки 1-5 одразу після фінішу, поки враження свіжі",
    },
    {
      mistake: "Гравцю заздалегідь підказують, де секрет і як уникнути пастки",
      explanation: "Це знищує сигнал fairness - ти більше не перевіряєш досвід справжнього нового гравця",
      correctApproach: "Дай другу пройти рівень так, як його проходив би незнайомець без підказок",
    },
    {
      mistake: "Після прогону починається повне перепроєктування biome, бо \"так краще\"",
      explanation: "Архітектурні зміни виходять за межі одного заняття і залишають продукт неперевіреним",
      correctApproach: "Запиши велику ідею окремо і виправ лише блокуючі баги в одному проході",
    },
    {
      mistake: "Усі баги виправляються без розрізнення серйозності",
      explanation: "Час іде на косметичні дрібниці, а критичний блокуючий баг залишається невиправленим",
      correctApproach: "Спочатку блокуючі, потім ті, що заважають, косметичні - у список 5.9",
    },
    {
      mistake: "Секрети пропускають повністю, бо категорія в рубриці позначена як \"необов'язкова\"",
      explanation: "Непроходжена перевірка секрету може приховати softlock, який зламає прохід іншому гравцю",
      correctApproach: "Дай гравцю спробувати знайти хоча б один секрет і оціни, чи не застряг він там",
    },
  ],
  summary: "Ти провів повний прохід свого obby з другом за рубрикою з 6 категорій, зафіксував баги без зупинки гри, порівняв результат з баглістом 5.6 і кривою складності 5.7, виконав один прохід виправлень лише блокуючих проблем і підготував окремий список ідей для polish у 5.9 - продукт готовий рухатися далі, а не застряг на checkpoint.",
  practiceTask: {
    title: "Повний прохід з другом за рубрикою (~25 хв)",
    difficulty: "beginner",
    description: `**Мета:** Задокументований повний прохід + один прохід виправлень блокуючих багів.

### Part A - Підготовка (5 хв)
1. Домовтесь про ролі: хто гравець, хто спостерігач
2. Відкрий рубрику з 6 категорій і старий багліст з 5.6 поруч
3. Підготуй місце для нотаток (де - що сталося - наскільки блокує)

### Part B - Повний прогін (12 хв)
1. Гравець проходить obby від спавну до фінішу без підказок і без зупинок
2. Спостерігач мовчки записує баги з таймкодом і серйозністю
3. Одразу після фінішу заповніть усі 6 категорій рубрики оцінками 1-5

### Part C - Один прохід виправлень (8 хв)
1. Відсортуй нотатки: блокуюче -> заважає -> косметичне
2. Виправ лише блокуючі баги (і заважає, якщо лишається час)
3. Косметичне й juice-ідеї перенеси в окремий список для 5.9
4. **Зберегти в Roblox** -> \`Lesson 5.8 - Full Playthrough\``,
    hints: [
      "Якщо другого немає поруч фізично - зателефонуй і попроси показати екран під час гри",
      "Записуй навіть дрібниці типу \"на секунду завагався\" - це матеріал для категорії чіткість шляху",
      "Якщо блокуючих багів немає взагалі - це теж чудовий результат, не вигадуй зайву роботу",
    ],
    optionalChallenge: "Поміняйтеся ролями і проведіть другий повний прогін - порівняй, чи оцінки рубрики збігаються між двома прогонами.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Що перевіряє checkpoint-урок 5.8 перш за все?",
        options: [
          "Скільки коду написано",
          "Чи можна пройти obby повністю як цілісний продукт",
          "Швидкість сервера",
          "Кількість Parts на карті",
        ],
        correctAnswer: 1,
        explanation: "5.8 - це product gate: перевірка цілісного проходу перед 5.9 і 5.10.",
      },
      {
        id: "q2",
        type: MC,
        question: "Хто грає роль гравця сьогодні?",
        options: [
          "Розробник, який знає всі секрети",
          "Той, хто не бачив рівень раніше або грає як новачок",
          "Учитель",
          "Ніхто, гра проходить сама",
        ],
        correctAnswer: 1,
        explanation: "Роль гравця має відтворювати досвід справжнього нового відвідувача.",
      },
      {
        id: "q3",
        type: MC,
        question: "Що робить спостерігач під час прогону?",
        options: [
          "Грає замість гравця",
          "Одразу виправляє код",
          "Заповнює рубрику і записує баги з таймкодом",
          "Вимикає сервер",
        ],
        correctAnswer: 2,
        explanation: "Спостерігач мовчки фіксує враження і баги, не втручаючись у гру.",
      },
      {
        id: "q4",
        type: MC,
        question: "Скільки категорій у рубриці цього уроку?",
        options: ["2", "10", "3", "6"],
        correctAnswer: 3,
        explanation: "Fun, fairness, чіткість шляху, надійність CP, читкість небезпек, секрети.",
      },
      {
        id: "q5",
        type: MC,
        question: "Категорія \"Fairness\" перевіряє...",
        options: [
          "Швидкість завантаження",
          "Чи смерті відчувалися чесними, а не випадковими",
          "Кількість Parts",
          "Колір неба",
        ],
        correctAnswer: 1,
        explanation: "Fairness відповідає на питання, чи гравець помирав через власну помилку.",
      },
      {
        id: "q6",
        type: MC,
        question: "Коли краще заповнювати оцінки рубрики?",
        options: [
          "Через тиждень",
          "До початку прогону",
          "Одразу після фінішу, поки враження свіжі",
          "Ніколи",
        ],
        correctAnswer: 2,
        explanation: "Дрібні деталі забуваються швидко, тому оцінки ставлять одразу після гри.",
      },
      {
        id: "q7",
        type: MC,
        question: "Формат нотатки бага складається з...",
        options: [
          "Лише з часу",
          "Де - що сталося - наскільки блокує",
          "Лише з emoji",
          "Номера Script",
        ],
        correctAnswer: 1,
        explanation: "Три частини нотатки дають повну картину для фіксу.",
      },
      {
        id: "q8",
        type: MC,
        question: "Баг з позначкою \"блокуюче\" означає...",
        options: [
          "Просто виглядає негарно",
          "Стосується лише звуку",
          "Неможливо пройти далі без виправлення",
          "Не впливає на прохід",
        ],
        correctAnswer: 2,
        explanation: "Блокуюче - найвищий пріоритет для одного проходу виправлень.",
      },
      {
        id: "q9",
        type: MC,
        question: "Що робити зі старим баглістом з 5.6?",
        options: [
          "Видалити його",
          "Порівняти й перевірити, чи старі проблеми справді зникли",
          "Ігнорувати",
          "Замінити повністю новим файлом",
        ],
        correctAnswer: 1,
        explanation: "Багліст 5.8 продовжує багліст 5.6, а не замінює його.",
      },
      {
        id: "q10",
        type: MC,
        question: "Прогін з другом перевіряє криву складності з 5.7 через...",
        options: [
          "Вимірювання FPS",
          "Підрахунок Parts",
          "Спостереження за переходами між біомами на людині, яка не знає рівень",
          "Перевірку DataStore",
        ],
        correctAnswer: 2,
        explanation: "Тільки людина без знання рівня може чесно показати, чи складність справедлива.",
      },
      {
        id: "q11",
        type: MC,
        question: "Скільки проходів виправлень робиш після прогону?",
        options: ["Три", "Нуль", "Стільки, скільки забажаєш", "Один"],
        correctAnswer: 3,
        explanation: "Один прохід виправлень - свідоме обмеження checkpoint-уроку.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що НЕ варто робити на checkpoint-уроці 5.8?",
        options: [
          "Записувати баги",
          "Повністю перепроєктовувати цілий biome",
          "Заповнювати рубрику",
          "Порівнювати з 5.6",
        ],
        correctAnswer: 1,
        explanation: "Велике перепроєктування виходить за межі одного заняття.",
      },
      {
        id: "q13",
        type: MC,
        question: "Ідеї про звук і частинки, почуті під час прогону, записуються...",
        options: [
          "Одразу видаляються з коду",
          "В DataStore",
          "В той самий список, що й блокуючі баги",
          "В окремий список для 5.9 Juice",
        ],
        correctAnswer: 3,
        explanation: "Juice-ідеї - окремий список, не змішуй їх з багами.",
      },
      {
        id: "q14",
        type: MC,
        question: "Категорія \"Секрети\" в рубриці позначена як...",
        options: [
          "Найважливіша з усіх",
          "Такою, що ігнорується завжди",
          "Необов'язкова, але варто перевірити softlock",
          "Обов'язковою для кожного гравця",
        ],
        correctAnswer: 2,
        explanation: "Секрет необов'язковий для проходу, але має бути перевірений на застрягання.",
      },
      {
        id: "q15",
        type: MC,
        question: "Урок 5.8 зберегти назву...",
        options: [
          "Lesson 5.9 - Juice",
          "Module 5 - Combat Balance",
          "Lesson 5.8 - Full Playthrough",
          "Untitled Checkpoint",
        ],
        correctAnswer: 2,
        explanation: "Зберегти checkpoint-урок під власною назвою для наступних уроків.",
      },
    ],
  },
};

export const ukLesson59 = {
 lessonId: "lesson-roblox-5-9",
 moduleId: "module-05",
 order: 9,
 title: "5.9 - Juice: Sound + Particles",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Поясни, що таке «juice» і чому воно підсилює вже готову механіку, а не замінює її",
 "Підключи Sound до хука смерті та до хука чекпоінта з уроків 5.2 і 5.3",
 "Додай ParticleEmitter, що дає короткий Emit() замість вічного Enabled",
 "Вибери SoundService або Parent Part залежно від типу звуку та уникай спаму й перевантаженого Volume",
 "Проведи плейтест «відчуття гри» на повному проході з 5.8 і підготуй чекпоінти до Ship 5.10",
 ],
 theory: {
 sections: [
 {
 title: "Твій шлях сьогодні (приблизно 35 хвилин)",
 content: `Урок 5.8 довів, що твій obby **проходиться від старту до фінішу** без зависань. Але «проходиться» і «відчувається приємно» - це різні речі. Сьогодні ти додаєш **звук і частинки**, які перетворюють суху механіку смерті й чекпоінта на живий відгук гравцю.

Це **урок 37 з 92** у курсі SmartCode і **дев'ятий урок модуля 05 - Obby**. Ти вже пройшов дизайн біомів, hazards з debounce, чекпоінти з GUI, платформи, секрети, playtest, difficulty curve і checkpoint повного проходу. Juice - це **останній шар полірування** перед Ship 5.10, де ти здаєш готовий продукт з badge.

**Хід уроку:**
1. **Теорія (35 хв)** - що таке juice, Sound, ParticleEmitter, сервер проти локального сигналу
2. **Практика (~35 хв)** - звук і частинки на смерть та на чекпоінт, плейтест
3. **Вікторина (15 хв)** - проходження **70%**

Відкрий своє місце з **Уроку 5.8 - Checkpoint: повний прохід**. Ти нічого не переробляєш у логіці hazard чи checkpoint - лише **додаєш** реакцію. Якщо hazard або checkpoint ще «мовчить» після падіння чи дотику - цей урок саме для цього.`,
 },
 {
 title: "Що таке «juice» - чому дрібниці важать найбільше",
 content: `**Juice** (з англ. «сік», у геймдеву - «соковитість») - це сума маленьких сигналів зворотного зв'язку, які підказують гравцю: «твоя дія щось змінила у грі». Стрибок без звуку - це просто зміна координати. Стрибок зі звуком приземлення і хмаркою пилу - це **подія**, яку мозок гравця помічає і запам'ятовує.

Juice складається з **трьох каналів**, які ми сьогодні торкаємось двома:
- **Звук** - найшвидший сигнал, мозок реагує за частки секунди
- **Частинки** - короткий візуальний спалах, підтверджує місце події
- **Рух/анімація** - Tween або спалах Part (ти вже бачив flash у попередніх модулях)

У obby є рівно два моменти, де гравець найбільше потребує відгуку:
- **Смерть** - гравець мусить одразу зрозуміти «я торкнувся hazard, це моя помилка», а не гадати, чому персонаж зник
- **Чекпоінт** - гравець мусить відчути маленьку нагороду за прогрес, інакше проходження рівня відчувається як монотонна робота

| Без juice | З juice |
|-----------|---------|
| Падіння в лаву - тихо, character просто зникає | Короткий «шип» + хмарка диму на hazard |
| Чекпоінт зберігається, але гравець не помітив | Дзвін + іскри - «так, прогрес зараховано» |

**Важливо:** juice не виправляє погано збалансований рівень і не додає нову механіку. Це шар **полірування** над тим, що вже стабільно працює після 5.8. Якщо hazard вбиває через стіну або checkpoint не зберігається - спочатку виправ це, потім додавай звук.`,
 },
 {
 title: "Нагадування - хуки смерті та чекпоінта з 5.2 і 5.3",
 content: `Щоб не дублювати логіку, сьогодні ти **вбудовуєш** звук і частинки прямо у вже готові функції.

**З Уроку 5.2 (Hazards + debounce)** - твій hazard-script на сервері приблизно такий:
\`local hazard = script.Parent\`
\`hazard.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local humanoid = character and character:FindFirstChildOfClass("Humanoid")\`
\`  if not humanoid then return end\`
\`  humanoid.Health = 0\`
\`end)\`

**З Уроку 5.3 (Чекпоінти + таймер + GUI)** - твій checkpoint-script підключений так:
\`checkpointPart.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local player = Players:GetPlayerFromCharacter(character)\`
\`  if not player then return end\`
\`  -- тут ти вже зберігаєш checkpoint для player\`
\`end)\`

Сьогодні ти додаєш по одному рядку **виклику звуку** і по одному **виклику частинок** саме в ці два місця - жодного нового Touched-з'єднання.

**Чому не окремий Script «тільки для звуку»:** другий Touched на тому самому Part може спрацювати в інший кадр, ніж основний hazard - гравець помре без звуку або почує звук без смерті. Один обробник = одна **атомарна** подія: дотик → juice → логіка.

**Debounce з 5.2 для hazard:** якщо твій hazard уже має cooldown на пошкодження, juice має спрацьовувати **всередині того самого блоку**, коли реально відбувається kill - не раніше і не після debounce-повернення.`,
 },
 {
 title: "Sound - базові Properties, які тобі знадобляться",
 content: `**Sound** - Instance, який відтворює аудіо. Найважливіші Properties для сьогоднішнього уроку:

| Property | Що робить |
|----------|-----------|
| \`SoundId\` | посилання на аудіо, формат \`rbxassetid://ID\` |
| \`Volume\` | громкість від 0 до 1 (іноді трохи вище, але для UI/hazard тримай 0.4-0.7) |
| \`Looped\` | чи звук повторюється - для смерті й чекпоінта завжди **false** |
| \`PlaybackSpeed\` | швидкість/тон відтворення, 1 = звичайна |
| \`RollOffMode\` та \`RollOffMaxDistance\` | як звук затихає з відстанню, якщо Sound лежить у Part |

**Створення і відтворення:**
\`local sound = Instance.new("Sound")\`
\`sound.SoundId = "rbxassetid://9042177269"\`
\`sound.Volume = 0.6\`
\`sound.Parent = somePart\`
\`sound:Play()\`

**Play() не блокує Script** - код продовжує виконуватись одразу, тож можна безпечно викликати Play() і йти далі за логікою hazard чи checkpoint.

**Де взяти SoundId:** у Studio відкрий Toolbox → Audio або Creator Store, знайди короткий SFX (0.3-1.5 сек), скопіюй ID у формат \`rbxassetid://ЧИСЛО\`. Для смерті підійде різкий «thud» або «sizzle»; для чекпоінта - м'який «chime» або «ping». Уникай довгих музичних треків - вони накладуться під час швидких respawn.

**RollOffMaxDistance:** якщо hazard далеко від камери, звук може бути ледве чутний. Для маленького obby постав **50-80 studs** - достатньо, щоб чути подію на сусідній секції рівня, але не «глобально». Перевір у Play Mode, стоячи біля hazard і відійшовши на 30 studs.`,
 },
 {
 title: "SoundService проти Parent Part - де живе твій звук",
 content: `Куди саме поставити Sound Properties **Parent** вирішує, як гравець його почує.

| Варіант | Поведінка | Коли використовувати |
|---------|-----------|----------------------|
| **Parent = Part на місці події** (hazard, checkpoint) | 3D-звук, затихає з відстанню, чути напрямок | Локальні події на карті - ідеально для смерті й чекпоінта |
| **Parent = SoundService** | 2D-звук, однакова громкість для всіх незалежно від позиції | Глобальні сигнали типу «гра почалась», музика меню |

Для **смерті й чекпoінта в obby** правильний вибір - **Part на місці події**: гравець, що впав у hazard за поворотом, повинен почути звук саме звідти, а не як загальне «бум» на весь екран. SoundService залиш для музики чи UI-сигналів, які не прив'язані до конкретної точки в Workspace.

**Практичне правило:** якщо можеш показати пальцем на карту «звук звідси» - Parent = Part. Якщо звук стосується всього сеансу («рівень пройдено», фонова музика лобі) - SoundService. У нашому obby **кожна смерть і кожен checkpoint - локальна подія**, тому 99% juice сьогодні живе в hazard/checkpoint Parts.

**Помилка новачка:** покласти DeathSound у SoundService «щоб точно було чутно». Результат - усі гравці на сервері чують кожну смерть однаково гучно, навіть якщо вони на іншому кінці мапи. Це втомлює швидше, ніж тихий локальний звук.`,
 },
 {
 title: "Звук на смерть - підключення до хука Hazard/Kill",
 content: `Додаєш звук **усередину** обробника з 5.2, одразу перед або після \`humanoid.Health = 0\`:
\`local hazard = script.Parent\`
\`local deathSound = hazard:WaitForChild("DeathSound")\`
\`\`
\`hazard.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local humanoid = character and character:FindFirstChildOfClass("Humanoid")\`
\`  if not humanoid then return end\`
\`  deathSound:Play()\`
\`  humanoid.Health = 0\`
\`end)\`

**Чому Sound - дитина hazard, а не character:** персонаж за мить видаляється/відроджується, і Sound, що є його дитиною, обірветься на середині. Hazard Part залишається на місці - звук дограє повністю.

**Сервер чи клієнт:** цей Touched вже виконується на сервері (Script, не LocalScript) з 5.2 - Play() на сервері **репліковується всім гравцям поруч**, тож усі почують падіння у hazard, не тільки жертва.

**Якщо звук не чутно:** перевір, що \`SoundId\` валідний (в Edit Mode натисни Play на Sound у Properties), \`Volume\` не 0, і Part hazard не **CanCollide false** з Sound всередині порожнього блоку без RollOff. Додай \`print("death juice")\` поруч із Play() - якщо print є, а звуку немає, проблема в SoundId або Volume, не в Touched.`,
 },
 {
 title: "Звук на чекпоінт - підключення до хука з 5.3",
 content: `Той самий підхід у checkpoint-script:
\`local checkpointPart = script.Parent\`
\`local chimeSound = checkpointPart:WaitForChild("ChimeSound")\`
\`\`
\`checkpointPart.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local player = Players:GetPlayerFromCharacter(character)\`
\`  if not player then return end\`
\`  chimeSound:Play()\`
\`  -- далі твоя логіка збереження checkpoint з 5.3\`
\`end)\`

**Обов'язково перевір debounce з 5.3:** якщо гравець стоїть на чекпоінті кілька кадрів підряд, Touched може спрацювати кілька разів - без debounce звук «чіркне» і накладеться сам на себе. Використай ту саму debounce-таблицю чи прапор, що вже захищає збереження checkpoint, а не пиши окрему для звуку.

**Різні чекпoінти - один шаблон:** не копіюй різні SoundId на кожен checkpoint, якщо не плануєш різний «характер» біомів. Один \`ChimeSound\` + \`Sparkles\` у шаблоні Part, який ти дублюєш по рівню - менше роботи і однаковий відгук скрізь. Виняток: фінальний checkpoint перед Ship може мати трохи голосніший Volume (0.75) як нагорода.`,
 },
 {
 title: "ParticleEmitter - базові Properties",
 content: `**ParticleEmitter** - Instance, що народжує дрібні частинки з BasePart. Ключові Properties:

| Property | Що робить |
|----------|-----------|
| \`Rate\` | частинок за секунду, поки Enabled = true (для нашого juice тримай 0, керуємо через Emit) |
| \`Lifetime\` | NumberRange - скільки живе кожна частинка, напр. \`NumberRange.new(0.4, 0.8)\` |
| \`Speed\` | NumberRange початкової швидкості вильоту |
| \`Color\` | ColorSequence - колір частинок, можна градієнт |
| \`Texture\` | вигляд частинки, за замовчуванням підходить кругла крапка з Toolbox |
| \`Enabled\` | вмикає безперервний потік - **не** використовуй для одноразового ефекту |

**Створення в Studio:** Insert → ParticleEmitter у Part hazard або checkpoint, встав Lifetime і Speed, а Rate залиш 0 - викликом \`Emit(n)\` з коду ти сам вирішуєш, коли і скільки частинок з'явиться.

**SpreadAngle і Shape:** для checkpoint частинки можуть летіти **вгору** (вузький SpreadAngle, Shape = Box або Sphere). Для смерті в лаві - ширший розкид і тепліші кольори (помаранчевий/червоний ColorSequence). Не переборщуй з \`Emit(100)\` - 15-30 частинок достатньо для короткого спалаху на слабкому ПК.`,
 },
 {
 title: "Частинки на чекпоінт і на смерть - Emit() замість Enabled",
 content: `**Emit(кількість)** - метод, що випускає одноразовий «вибух» частинок і одразу зупиняється - саме те, що потрібно для миттєвої події.

**У checkpoint-script:**
\`local sparkles = checkpointPart:WaitForChild("Sparkles")\`
\`chimeSound:Play()\`
\`sparkles:Emit(25)\`

**У hazard-script:**
\`local puff = hazard:WaitForChild("DeathPuff")\`
\`deathSound:Play()\`
\`puff:Emit(15)\`
\`humanoid.Health = 0\`

**Чому не Enabled = true:** якщо залишити Enabled увімкненим, частинки летітимуть з hazard **постійно**, навіть коли ніхто не помирає - це і візуальний шум, і зайве навантаження на клієнт кожного гравця в кімнаті. Одна команда \`Emit()\` дає чіткий спалах рівно в момент події та нуль витрат між подіями.

**Порядок викликів:** спочатку \`Play()\`, одразу \`Emit()\`, потім \`humanoid.Health = 0\` для hazard - так гравець бачить і чує juice **до** зникнення character. Якщо поставиш kill перед Emit, частинки все одно з'являться, але відчуття «удар → реакція → смерть» буде слабшим.`,
 },
 {
 title: "Сервер чи локальний сигнал - де програвати ефект",
 content: `**Сервер (Script, як у прикладах вище):** Play() і Emit(), викликані на сервері, **репліковані всім клієнтам** поруч - усі гравці бачать і чують подію. Це правильний вибір для чекпоінта і смерті в obby, бо це **спільні** події на карті.

**Локальний сигнал (LocalScript):** можна додати окремий, **тихіший** ефект лише для гравця, який помер чи дійшов до чекпоінта - наприклад, спалах кольору на екрані через ScreenGui. Такий LocalScript слухає ту саму подію (напр. RemoteEvent або зміну Attribute), яку сервер вже надсилає.

**Обережно з дублюванням:** якщо і сервер, і LocalScript одночасно відтворюють **той самий** Sound для того самого гравця, гравець почує його **двічі накладеним** - голосніше і з фазовим спотворенням. Правило: базовий звук/частинки - завжди на сервері один раз; локальний скрипт додає лише **інший**, додатковий шар (екранний ефект), а не копію того самого Sound.

**Коли локальний шар має сенс:** якщо ти хочеш, щоб **лише гравець, що помер**, побачив легкий червоний vignette на екрані - це LocalScript у StarterGui, який слухає зміну Health або RemoteEvent від сервера. Сервер як і раніше грає 3D-звук на hazard для всіх; локально - тільки UI. Два різні канали, не два однакові Play().`,
 },
 {
 title: "Не спамити - debounce, повторне використання, гучність",
 content: `**Проблема 1 - Instance.new() на кожен дотик.** Створювати новий Sound чи ParticleEmitter щоразу через \`Instance.new()\` і одразу видаляти - витратно і повільно. Правильний шаблон: **один Sound і один ParticleEmitter стоять у Part заздалегідь** (вставлені в Studio), а код лише викликає \`:Play()\` і \`:Emit()\` знову і знову.

**Проблема 2 - відсутність debounce на чекпоінті.** Уже згадано вище - без debounce з 5.3 звук може «затріщати» кількома викликами Play() за одну секунду.

**Проблема 3 - завелика Volume.** \`Volume = 1\` для короткого «дзвіночка» чекпоінта звучить різко і втомлює за 10-й раз. Тримай Volume у діапазоні **0.4-0.7** для частих подій; голосніші значення залиш для рідких, важливих моментів (перемога, бос).



**Проблема 4 - різні гучності на різних hazard.** Якщо один hazard грає на Volume 0.9, а інший на 0.3, рівень відчувається «зламаним». Пройди всі hazard одним проходом і вирівняй Volume в межах 0.1 - однаковий характер смерті по всьому obby.

**Правило одного правила:** якщо подія трапляється часто (а чекпоінти й смерті в obby трапляються **дуже** часто), ефект має бути **коротким і тихим**, інакше гравець вимкне звук у грі взагалі.`,
 },
 {
 title: "Таблиця плейтесту Juice і підготовка до Ship 5.10",
 content: `Проведи **повний прохід** рівня з Уроку 5.8, і на кожній події запиши відчуття:

| Подія | Що перевірити | Норма |
|-------|----------------|-------|
| Смерть у hazard №1 | звук + частинки одразу, без затримки | <0.1с після Touched |
| Смерть у hazard №2 (інший тип) | той самий шаблон Sound/Emit | однаковий по силі відгук |
| Кожен чекпоінт | «дзвіночок» + іскри один раз, без повтору | рівно 1 Play() на 1 checkpoint |
| Повторна смерть у тому самому hazard | звук не «залипає», не накладається | чисто після кожного respawn |
| Гучність за 10 проходжень підряд | не втомлює вухо | Volume 0.4-0.7 тримається комфортно |



**Запис плейтесту:** у Studio Notes або блокноті заведи колонки «Подія / Ок / Проблема / Виправлення». Після третього проходу всі рядки мають бути «Ок» - інакше не переходь до Ship 5.10.

**Підготовка до Ship 5.10:** наступний урок - фінальна здача рівня з badge. Юс, який ти додав сьогодні, має **однаково стабільно** працювати на кожному hazard і кожному checkpoint усього рівня з 5.1-5.8, а не лише на першому - пройди рівень від старту до фінішу ще раз і перевір, що жоден Part не забутий без Sound/ParticleEmitter.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Sound-instance вставлений заздалегідь у кожен hazard і кожен checkpoint (не створюється кодом на льоту)
- [ ] ParticleEmitter має Rate = 0, керування лише через Emit()
- [ ] Play() і Emit() викликані на сервері всередині вже готових хуків з 5.2 і 5.3
- [ ] Debounce з 5.3 захищає checkpoint-звук від повтору
- [ ] Volume у діапазоні 0.4-0.7, жодного дублювання сервер+локально того самого Sound

- [ ] Пройдено повний маршрут 5.8 з увімкненим звуком у налаштуваннях Roblox
- [ ] Усі hazard і checkpoint мають пару Sound + ParticleEmitter
- [ ] Збережено: \`Lesson 5.9 - Juice Pass\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Instance.new(\"Sound\") створюється всередині Touched на кожен дотик",
 explanation: "Кожен новий Instance витрачає пам'ять і час на створення/видалення саме в момент, коли гра має бути найшвидшою.",
 correctApproach: "Встав Sound заздалегідь у Part через Studio, у коді лише :Play()",
 },
 {
 mistake: "ParticleEmitter лишили Enabled = true замість Emit()",
 explanation: "Частинки летять з hazard постійно, навіть коли ніхто не помирає - зайве навантаження і візуальний шум.",
 correctApproach: "Rate = 0, Enabled не трогати, весь контроль через Emit(n)",
 },
 {
 mistake: "Sound - дитина Character, а не hazard/checkpoint Part",
 explanation: "Character видаляється чи відроджується одразу після смерті, і звук обривається на середині відтворення.",
 correctApproach: "Sound лежить у Part на місці події, він переживає смерть/respawn character",
 },
 {
 mistake: "Volume виставлений на 1 або вище для частої події",
 explanation: "Гучний звук на кожному з десятків чекпоінтів рівня втомлює гравця за кілька хвилин.",
 correctApproach: "Volume 0.4-0.7 для частих подій, голосніше - лише для рідких важливих моментів",
 },
 {
 mistake: "Немає debounce на checkpoint-звук",
 explanation: "Touched може спрацювати кілька разів за секунду стояння на чекпоінті, звук накладається сам на себе.",
 correctApproach: "Той самий debounce-прапор, що вже захищає збереження checkpoint з 5.3",
 },
 {
 mistake: "Той самий Sound відтворюється і на сервері, і в LocalScript одночасно",
 explanation: "Гравець чує подвоєний, накладений звук замість чистого одного сигналу.",
 correctApproach: "Базовий Sound - лише на сервері один раз; локальний шар додає інший, додатковий ефект",
 },
 ],
 summary: "Ти додав Sound і ParticleEmitter до вже готових хуків смерті та чекпоінта з 5.2 і 5.3, навчився вибирати між SoundService і Parent Part, керувати частинками через Emit() замість Enabled, уникати спаму й перевантаженої гучності - тепер твій obby після 5.8 не просто проходиться, а відчувається живим і готовим до фінальної здачі в 5.10.",
 practiceTask: {
 title: "Juice Pass - звук і частинки на весь рівень (~35 хв)",
 difficulty: "beginner",
 description: `**Мета:** кожен hazard і кожен checkpoint рівня з 5.8 має звук і короткий спалах частинок.

### Part A - Підготовка Instance (10 хв)
1. У кожен hazard Part встав \`DeathSound\` (Sound) і \`DeathPuff\` (ParticleEmitter), Rate = 0
2. У кожен checkpoint Part встав \`ChimeSound\` (Sound) і \`Sparkles\` (ParticleEmitter), Rate = 0
3. Volume обом Sound встав у діапазоні 0.4-0.7

### Part B - Підключення до хуків (15 хв)
1. У hazard-script з 5.2 додай \`deathSound:Play()\` і \`puff:Emit(15)\` перед \`humanoid.Health = 0\`
2. У checkpoint-script з 5.3 додай \`chimeSound:Play()\` і \`sparkles:Emit(25)\` всередині вже готового debounce-блоку
3. Перевір, що жоден hazard чи checkpoint не забутий - пройди рівень і послухай кожен

### Part C - Плейтест і збереження (10 хв)
1. Заповни таблицю плейтесту Juice для кожної події
2. Виправ будь-який Sound/Emit, що спрацьовує двічі або занадто голосно
3. **Зберегти в Roblox** → \`Lesson 5.9 - Juice Pass\` 4. **Практика завершена**`,
 hints: [
 "Якщо звук обривається - перевір, що Sound не є дитиною Character",
 "Якщо частинки летять без зупинки - перевір, що Rate дорівнює 0, а не Enabled",
 "Слухай рівень у навушниках один раз - різкий Volume чуєш одразу",
 ],
 optionalChallenge: "Додай короткий екранний спалах кольору через LocalScript і Attribute зміни здоров'я - додатковий локальний шар без дублювання серверного Sound.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "«Juice» у геймдеву означає...",
 options: [
 "Шар зворотного зв'язку над уже готовою механікою",
 "Нову механіку руху персонажа",
 "Систему DataStore",
 "Формат текстур",
 ],
 correctAnswer: 0,
 explanation: "Juice підсилює відчуття, а не змінює правила гри.",
 },
 {
 id: "q2",
 type: MC,
 question: "Звук смерті найкраще підключити...",
 options: [
 "Всередину вже готового Touched-хука hazard з 5.2",
 "У новий окремий Script без зв'язку з hazard",
 "У DataStore",
 "У Terrain",
 ],
 correctAnswer: 0,
 explanation: "Не дублюємо логіку - додаємо реакцію в існуючий хук.",
 },
 {
 id: "q3",
 type: MC,
 question: "Sound краще зробити дитиною...",
 options: [
 "Hazard/checkpoint Part, а не Character",
 "Лише Players.LocalPlayer",
 "Terrain",
 "StarterGui",
 ],
 correctAnswer: 0,
 explanation: "Character зникає при смерті, звук обірветься.",
 },
 {
 id: "q4",
 type: MC,
 question: "SoundService підходить для...",
 options: [
 "Глобальних 2D-сигналів типу музики чи UI",
 "Позиційного звуку hazard на карті",
 "Тільки ParticleEmitter",
 "Тільки DataStore",
 ],
 correctAnswer: 0,
 explanation: "SoundService не має позиції у Workspace.",
 },
 {
 id: "q5",
 type: MC,
 question: "Parent Part для Sound дає...",
 options: [
 "3D-звук, що затихає з відстанню",
 "Однакову громкість всюди",
 "Автоматичне видалення DataStore",
 "Зникнення Terrain",
 ],
 correctAnswer: 0,
 explanation: "Позиційний звук залежно від відстані гравця.",
 },
 {
 id: "q6",
 type: MC,
 question: "Rate у ParticleEmitter для одноразового ефекту слід тримати...",
 options: [
 "0, а керувати через Emit()",
 "100 завжди",
 "Лише в SoundService",
 "Дорівнює Volume",
 ],
 correctAnswer: 0,
 explanation: "Emit дає контрольований одноразовий спалах.",
 },
 {
 id: "q7",
 type: MC,
 question: "Enabled = true на ParticleEmitter означає...",
 options: [
 "Безперервний потік частинок, поки не вимкнено",
 "Одноразовий вибух частинок",
 "Звук відтворюється один раз",
 "DataStore зберігає прогрес",
 ],
 correctAnswer: 0,
 explanation: "Enabled - постійний режим, не для миттєвих подій.",
 },
 {
 id: "q8",
 type: MC,
 question: "Instance.new(\"Sound\") на кожен Touched - проблема, тому що...",
 options: [
 "Витрачає ресурси на створення/видалення щоразу",
 "Забороняється Roblox правилами",
 "Ламає DataStore",
 "Видаляє Terrain",
 ],
 correctAnswer: 0,
 explanation: "Краще заздалегідь вставлений Instance і Play().",
 },
 {
 id: "q9",
 type: MC,
 question: "Правильний діапазон Volume для частих подій (чекпоінти, hazard)...",
 options: [
 "0.4-0.7",
 "1.5-2.0",
 "0.001",
 "Точно 1",
 ],
 correctAnswer: 0,
 explanation: "Комфортна громкість без втоми слуху.",
 },
 {
 id: "q10",
 type: MC,
 question: "Debounce на checkpoint-звук потрібен, бо...",
 options: [
 "Touched може спрацювати кілька разів і накласти Play() сам на себе",
 "Sound не працює без debounce взагалі",
 "DataStore вимагає debounce",
 "Terrain генерується повільно",
 ],
 correctAnswer: 0,
 explanation: "Без debounce звук тріщить від повторних викликів.",
 },
 {
 id: "q11",
 type: MC,
 question: "Play() і Emit(), викликані на сервері...",
 options: [
 "Репліковані всім гравцям поруч",
 "Чутні лише одному гравцю завжди",
 "Ігноруються клієнтом",
 "Видаляють Character",
 ],
 correctAnswer: 0,
 explanation: "Серверні події - спільні для всіх поруч.",
 },
 {
 id: "q12",
 type: MC,
 question: "Дублювання того самого Sound на сервері й локально спричиняє...",
 options: [
 "Подвоєний, накладений звук у гравця",
 "Кращу якість звуку",
 "Автоматичне вимкнення Volume",
 "Видалення ParticleEmitter",
 ],
 correctAnswer: 0,
 explanation: "Локальний шар має бути іншим ефектом, не копією.",
 },
 {
 id: "q13",
 type: MC,
 question: "Плейтест Juice після 5.8 перевіряє...",
 options: [
 "Кожен hazard і checkpoint усього рівня, а не лише перший",
 "Тільки перший checkpoint",
 "Лише музику меню",
 "Лише DataStore",
 ],
 correctAnswer: 0,
 explanation: "Стабільність ефекту на всьому рівні перед Ship.",
 },
 {
 id: "q14",
 type: MC,
 question: "Урок 5.10 після цього уроку присвячений...",
 options: [
 "Ship + Badge - фінальній здачі рівня",
 "Новому модулю Simulator",
 "DataStore з нуля",
 "Terrain Editor",
 ],
 correctAnswer: 0,
 explanation: "5.10 закриває модуль Obby здачею з badge.",
 },
 {
 id: "q15",
 type: MC,
 question: "Урок 5.9 зберегти назву...",
 options: [
 "Lesson 5.9 - Juice Pass",
 "Checkpoint Full Run",
 "Ship Badge",
 "Hazard Debounce",
 ],
 correctAnswer: 0,
 explanation: "Назва збереження цього уроку полірування.",
 },
 ],
 },
}

export const ukLesson510 = {
  lessonId: "lesson-roblox-5-10",
  moduleId: "module-05",
  order: 10,
  title: "5.10 - Ship + Badge",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Підготувати Game Settings place lite: назва, опис, іконка, Access Friends/Public",
    "Створити Badge на сайті Roblox і видати AwardBadge на сервері рівно на фініші",
    "Захистити видачу Badge від дублю через UserHasBadgeAsync перед AwardBadge",
    "Пройти ship-рубрику по біомах, чекпоінтах, hazards і juice з 5.1-5.9",
    "Підготувати й прорепетирувати презентацію проєкту 60-90 секунд без суфлера",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 38 з 92)",
        content: `Це **фінал модуля 5 - Obby**. Не нова механіка. Сьогодні ти **пакуєш** готовий obby у продукт, який показуєш незнайомій людині за 90 секунд.

Шлях модуля позаду: 5.1 три біоми, 5.2 hazards + debounce, 5.3 чекпоінти + таймер + GUI, 5.4 while-платформи + Config, 5.5 секрети + ключ-двері, 5.6 playtest №1 + багліст, 5.7 difficulty curve, 5.8 Checkpoint повний прохід, 5.9 juice Sound + Particles.

Артефакт здачі:
1. Place з назвою, описом, іконкою - зрозумілий з першого погляду.
2. Access Friends чи Public - обраний свідомо.
3. Badge створено на сайті і видається \`AwardBadge\` на сервері рівно на фініші.
4. Рубрика ~15 пунктів пройдена, презентація 60-90 с відрепетирувана.

**Зроби зараз (3 хв):** відкрий obby з 5.9 і одним реченням напиши, чого йому не хватає до показу вчителю.`,
      },
      {
        title: "Що означає Ship + Badge (і що ні)",
        content: `| Ship + Badge | Ще НЕ ship |
|---------------|-----------|
| Назва, опис, іконка заповнені | "Untitled Game" з дефолтним значком |
| Access обраний свідомо | Ніхто не перевіряв, хто може зайти |
| Badge видається на фініші сервером | Badge існує, але ніде не викликається |
| Пройдено всі 3 біоми без застрягань | Один біом "майже готовий" |
| Демо 60-90 с без підказок | 5 хв "зараз покажу секрет" |
| Output чистий на повному проході | Червоні помилки "не заважають" |

Ship не означає AAA-гру. Означає: **прохід від старту до фінішу цілий, чесний і показуваний**.`,
      },
      {
        title: "Game Settings lite: назва, опис, іконка",
        content: `У Studio відкрий **File → Game Settings → Basic Info**. Три поля вирішують перше враження ще до того, як гравець зайшов усередину.

| Поле | Що написати | Приклад |
|------|--------------|---------|
| Name | Коротка назва жанру + фішка | \`Neon Obby: 3 Biomes\` |
| Description | 1-2 речення - що робити і скільки триває | "Пройди ліс, лаву і крижані платформи. ~3 хвилини, 3 чекпоінти, є секрет." |
| Icon/Thumbnail | Скріншот найяскравішого біому | Кадр із 5.9, де вже є juice |

Порожні поля чи "New Game" в назві - перша ознака "не ship" для будь-кого, хто відкриває сторінку place.

**Зроби зараз (5 хв):** заповни всі три поля прямо зараз, до переходу далі.`,
      },
      {
        title: "Access: Friends чи Public",
        content: `У тих самих Game Settings, вкладка **Permissions**, є перемикач доступу. Обери свідомо, а не залиш дефолт.

| Access | Коли обрати |
|--------|----------------|
| **Friends** | Показ учителю/класу, ще тестуєш баланс складності |
| **Public** | Готовий отримати трафік від незнайомих гравців, пройшов повну рубрику |

Public без пройденої рубрики (наступні секції) означає, що перший незнайомий гравець побачить твої баги раніше за тебе. Friends безпечніший для здачі уроку 5.10 - ти завжди можеш переключити на Public пізніше, коли модуль 11 (Polish) підтвердить готовність.

**Зроби зараз (2 хв):** обери Access і запиши одним реченням чому саме цей варіант підходить зараз.`,
      },
      {
        title: "Badge: створення на сайті Roblox",
        content: `Badge - це нагорода, яку гравець отримує один раз і бачить у своєму профілі Roblox назавжди. Створюється **не в Studio**, а на сторінці place на сайті Roblox: **Creator Dashboard → твоя гра → Badges → Create a Badge**.

Заповни:
- **Name:** коротко про досягнення - \`Obby Finisher\`
- **Description:** одне речення - "Пройшов усі 3 біоми до фінішу"
- **Image:** проста ікона 512x512, контрастна на маленькому розмірі

Після створення сайт видає числовий **Badge ID** - скопіюй його, він потрібен у Script. Badge створюється один раз за весь проєкт, а не на кожен playtest.

**Зроби зараз (6 хв):** створи Badge на сайті, скопіюй Badge ID у текстовий файл поруч зі Script.`,
      },
      {
        title: "AwardBadge на сервері рівно на фініші",
        content: `Видача Badge завжди відбувається через \`BadgeService\` у **Script на сервері**, ніколи в LocalScript - інакше будь-хто зможе видати собі нагороду без реального проходу.

\`local BadgeService = game:GetService("BadgeService")\`
\`local BADGE_ID = 000000000 -- встав свій Badge ID тут\`
\`local finishLine = workspace.Checkpoints.FinishLine\`
\`finishLine.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local player = game.Players:GetPlayerFromCharacter(character)\`
\`  if not player then return end\`
\`  BadgeService:AwardBadge(player.UserId, BADGE_ID)\`
\`end)\`

Місце виклику - той самий \`FinishLine\` Part із 5.3, де ти вже рахуєш час. \`AwardBadge\` додається поруч, а не замінює логіку таймера.`,
      },
      {
        title: "Захист від повторної видачі",
        content: `\`AwardBadge\` можна викликати повторно без помилки, але це марно навантажує сервіс і сигналізує про неохайний код. Перед видачею перевір, чи гравець уже має Badge.

\`local success, hasBadge = pcall(function()\`
\`  return BadgeService:UserHasBadgeAsync(player.UserId, BADGE_ID)\`
\`end)\`
\`if success and not hasBadge then\`
\`  BadgeService:AwardBadge(player.UserId, BADGE_ID)\`
\`end\`

\`pcall\` тут той самий захист, що і в DataStore з попередніх модулів - сервіс Roblox іноді відповідає повільно чи з помилкою, і гра не повинна ламатись через це. \`UserHasBadgeAsync\` - твій анти-дубль для нагород, так само як debounce - анти-дубль для урону з 5.2.`,
      },
      {
        title: "Карта систем перед Ship",
        content: `| Система з уроку | Що перевіряєш зараз |
|-------------------|------------------------|
| 5.1 три біоми | Кожен біом візуально відрізняється і прохідний |
| 5.2 hazards + debounce | Жодного миттєвого повторного урону |
| 5.3 чекпоінти + GUI | Респавн на останньому чекпоінті, таймер видно |
| 5.4 while-платформи | Рухаються стабільно, не зникають |
| 5.5 секрети + ключ-двері | Секрет знаходиться, двері відкриваються ключем |
| 5.7 difficulty curve | Складність росте поступово, немає різкого стрибка |
| 5.9 juice | Звук/частинки є на ключових діях, не заважають |

Ship - не про новий контент, а про підтвердження, що кожен рядок цієї таблиці вже працює разом, в одному Place.

**Зроби зараз (5 хв):** пройди список, познач "ні" там, де щось зламалось після 5.9.`,
      },
      {
        title: "Презентація 60-90 секунд",
        content: `Структура короткого демо, яку легко повторити перед класом чи ментором:

1. **(10 с) Назва й ідея:** "Це Neon Obby, три біоми, мета - дійти до фінішу."
2. **(15 с) Біом 1:** швидко покажи hazard і чекпоінт у дії.
3. **(15 с) Біом 2:** покажи while-платформу чи інший унікальний елемент.
4. **(15 с) Секрет:** відкрий ключ-двері, якщо є час.
5. **(15 с) Фініш:** перетни лінію, покажи Badge-повідомлення.
6. **(10 с) Підсумок:** "Ось так виглядає повний прохід, дякую."

Репетиція без слів "зачекайте, зараз покажу" - якщо запинаєшся на кроці, скороти саме цей крок, а не весь тайминг.`,
      },
      {
        title: "Рубрика для peer review (~15 пунктів)",
        content: `Дай цю таблицю однокласнику - хай він грає й ставить "так/ні/майже", поки ти мовчиш.

### A. Перше враження (1-4)
| # | Пункт |
|---|-------|
| 1 | Назва й опис place зрозумілі |
| 2 | Іконка відрізняється від дефолтної |
| 3 | Access обраний свідомо |
| 4 | Spawn і перший крок очевидні без пояснень |

### B. Прохід (5-9)
| # | Пункт |
|---|-------|
| 5 | Усі 3 біоми прохідні без застрягань |
| 6 | Чекпоінти зберігають прогрес після смерті |
| 7 | Hazards не вбивають миттєво без шансу реагувати |
| 8 | Секрет знаходиться за розумний час |
| 9 | Складність росте плавно від старту до фінішу |

### C. Ship-якість (10-15)
| # | Пункт |
|---|-------|
| 10 | Juice відчутний, але не набридливий |
| 11 | Badge видається рівно один раз на фініші |
| 12 | Output чистий на повному проході |
| 13 | Немає повторної видачі Badge при повторному дотику |
| 14 | Демо вкладається в 60-90 с |
| 15 | Save: Lesson 5.10 - Ship + Badge |`,
      },
      {
        title: "Типові ship-фейли",
        content: `| Симптом | Фікс |
|---------|------|
| Badge не з'являється | Перевір Script саме на сервері, а не LocalScript |
| Badge видається кілька разів | Додай \`UserHasBadgeAsync\` перед \`AwardBadge\` |
| Гравець фінішує без Badge-логіки | \`FinishLine.Touched\` не підключено до BadgeService |
| Один біом "поки не готовий" | Спочатку фікс, потім Access Public |
| Опис порожній чи "New Game" | Заповни Game Settings перед показом |
| Демо триває 5+ хвилин | Заготуй скорочену версію кожного кроку |

Три верхні рядки - причина 90% "Badge не працює" на здачі уроку 5.10.

**Зроби зараз (6 хв):** пройди повний прохід одним заходом, зафіксуй перший симптом із таблиці, якщо він трапиться.`,
      },
      {
        title: "Playtest інтеграції перед здачею",
        content: `| # | Дія | Очікування |
|---|-----|--------------|
| 1 | Play з нуля | Spawn у біомі 1, все видно |
| 2 | Пройди всі чекпоінти | Респавн на останньому після смерті |
| 3 | Торкнись hazard | Debounce, не миттєва серія ударів |
| 4 | Знайди секрет | Ключ відкриває двері |
| 5 | Перетни фініш | Badge видається один раз |
| 6 | Торкнись фінішу ще раз | Badge НЕ видається повторно |
| 7 | Перевір Output | Жодного червоного тексту |
| 8 | Проведи демо 60-90 с | Без "зачекайте" |

Пункти 5-6 - серце сьогоднішнього уроку: одна чесна нагорода, не спам.`,
      },
      {
        title: "Чекліст здачі уроку 38 + місток до модуля 6",
        content: `- [ ] Name, Description, Icon заповнені в Game Settings
- [ ] Access Friends чи Public обраний свідомо
- [ ] Badge створено на сайті, Badge ID у Script
- [ ] AwardBadge на сервері після FinishLine.Touched
- [ ] UserHasBadgeAsync блокує повторну видачу
- [ ] Рубрика ~15 пунктів пройдена peer review
- [ ] Демо 60-90 с відрепетирувано
- [ ] Save: Lesson 5.10 - Ship + Badge

Далі **модуль 6 - Simulator**: та сама звичка "сервер вирішує нагороду" (тут - Badge, там - Coins) переїде на leaderstats і giveCoins. Якщо Badge усе ще видається з LocalScript - **не** переходь далі з гордістю, спочатку виправ це тут.

Артефакт: обгорнутий, показуваний obby з чесною одноразовою нагородою. Ship любить короткий переможний прохід, а не найбільшу карту.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "AwardBadge викликається з LocalScript",
      explanation: "Будь-хто може підробити видачу нагороди собі без реального проходу.",
      correctApproach: "BadgeService:AwardBadge лише в Script на сервері",
    },
    {
      mistake: "Немає перевірки UserHasBadgeAsync",
      explanation: "Повторний дотик до фінішу спамить видачу того самого Badge.",
      correctApproach: "pcall + UserHasBadgeAsync перед AwardBadge",
    },
    {
      mistake: "Game Settings з дефолтною назвою і без опису",
      explanation: "Гравець не розуміє, у що грає, ще до входу в place.",
      correctApproach: "Заповнені Name, Description, Icon перед показом",
    },
    {
      mistake: "Access Public без пройденої рубрики",
      explanation: "Незнайомі гравці бачать баги раніше, ніж автор їх виправив.",
      correctApproach: "Friends для здачі, Public після повної рубрики",
    },
    {
      mistake: "Демо розтягнулось на 5+ хвилин з поясненнями",
      explanation: "Ментор чи клас втрачають фокус, суть проєкту губиться.",
      correctApproach: "Заготовлена структура 60-90 с, скорочені кроки",
    },
    {
      mistake: "Один біом чи чекпоінт 'майже готовий' на здачі",
      explanation: "Прохід ламається посередині показу, ship не відбувся.",
      correctApproach: "Спочатку фікс усіх трьох біомів, потім Save",
    },
  ],
  summary: "Ти зібрав Ship + Badge: заповнив Game Settings з назвою, описом і іконкою, обрав Access свідомо, створив Badge на сайті й видав його через AwardBadge на сервері з захистом UserHasBadgeAsync. Рубрика ~15 пунктів і демо 60-90 с закривають модуль 5 - Obby перед переходом до модуля 6 - Simulator.",
  practiceTask: {
    title: "Ship + Badge: обгорнути й здати (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** один Place з заповненими Game Settings, робочим Badge на фініші й пройденою рубрикою.

### Part A - Game Settings і Badge (10 хв)
1. Заповни Name, Description, Icon у Game Settings.
2. Обери Access Friends чи Public свідомо.
3. Створи Badge на сайті Roblox, скопіюй Badge ID.

### Part B - AwardBadge на сервері (15 хв)
1. Script на FinishLine.Touched викликає BadgeService:AwardBadge.
2. Додай UserHasBadgeAsync + pcall перед видачею.
3. Перевір: повторний дотик фінішу не видає Badge знову.

### Part C - Рубрика і демо (10 хв)
1. Пройди рубрику ~15 пунктів сам або з однокласником.
2. Відрепетируй презентацію 60-90 с за структурою з теорії.
3. **Save:** Lesson 5.10 - Ship + Badge`,
    hints: [
      "Badge ID копіюй з сайту точно, помилка в числі означає 'Badge не працює'",
      "Перевіряй AwardBadge через print до і після pcall під час дебагу",
      "Тренуй демо на таймері телефону, а не на око",
    ],
    optionalChallenge: "Додай короткий UI-банер 'Badge Earned!' на клієнті після FireClient від сервера, який спрацював лише разом з реальною видачею.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.10?",
        options: [
          "Обгорнути готовий obby в показуваний продукт з Badge на фініші",
          "Побудувати четвертий біом",
          "Видалити чекпоінти з 5.3",
          "Почати новий проєкт з нуля",
        ],
        correctAnswer: 0,
        explanation: "Ship + Badge - фінал модуля 5.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де заповнюються Name, Description, Icon place?",
        options: [
          "File → Game Settings → Basic Info",
          "У Script через Instance.new",
          "У BadgeService напряму",
          "У Explorer через Rename",
        ],
        correctAnswer: 0,
        explanation: "Game Settings - основне вікно налаштувань place.",
      },
      {
        id: "q3",
        type: MC,
        question: "Коли розумно обрати Access Public замість Friends?",
        options: [
          "Після проходження повної рубрики ship-якості",
          "Одразу після першого Play в Studio",
          "Замість заповнення Description",
          "Публічний доступ завжди обов'язковий з першого дня",
        ],
        correctAnswer: 0,
        explanation: "Public без перевірки означає баги на очах незнайомців.",
      },
      {
        id: "q4",
        type: MC,
        question: "Де створюється Badge для гри?",
        options: [
          "На сайті Roblox, Creator Dashboard → Badges",
          "У Studio через Instance.new(\"Badge\")",
          "У ServerScriptService автоматично",
          "У Toolbox як звичайний Model",
        ],
        correctAnswer: 0,
        explanation: "Badge - не Instance у Studio, а сутність сайту Roblox.",
      },
      {
        id: "q5",
        type: MC,
        question: "Чому AwardBadge має бути в Script на сервері, а не LocalScript?",
        options: [
          "Інакше будь-хто може видати собі нагороду без реального проходу",
          "LocalScript технічно не бачить BadgeService",
          "Сервер швидший для UI ефектів",
          "Це вимога лише для Public place",
        ],
        correctAnswer: 0,
        explanation: "Довіра сервера - як і в TakeDamage чи DataStore.",
      },
      {
        id: "q6",
        type: MC,
        question: "Навіщо UserHasBadgeAsync перед AwardBadge?",
        options: [
          "Запобігає повторній видачі того самого Badge при повторному дотику",
          "Замінює перевірку Humanoid",
          "Прискорює завантаження Terrain",
          "Обов'язковий лише для Friends-режиму",
        ],
        correctAnswer: 0,
        explanation: "Анти-дубль нагороди, як debounce для урону.",
      },
      {
        id: "q7",
        type: MC,
        question: "Навіщо pcall навколо викликів BadgeService?",
        options: [
          "Сервіс Roblox іноді відповідає з помилкою, і гра не має через це ламатись",
          "pcall прискорює AwardBadge",
          "Без pcall Badge неможливо створити на сайті",
          "pcall замінює UserHasBadgeAsync",
        ],
        correctAnswer: 0,
        explanation: "Той самий захист, що і в DataStore з попередніх модулів.",
      },
      {
        id: "q8",
        type: MC,
        question: "Скільки триває цільова презентація проєкту?",
        options: [
          "Близько 60-90 секунд без суфлера",
          "Обов'язково 10+ хвилин",
          "Досить одного скріншота",
          "Рівно 5 секунд",
        ],
        correctAnswer: 0,
        explanation: "Коротке репетируване демо.",
      },
      {
        id: "q9",
        type: MC,
        question: "Що перевіряє категорія B рубрики (пункти 5-9)?",
        options: [
          "Прохідність біомів, чекпоінтів, hazards, секрету і складність",
          "Тільки назву place",
          "Тільки колір іконки",
          "Тільки наявність Badge ID у текстовому файлі",
        ],
        correctAnswer: 0,
        explanation: "Категорія B - серце самого проходу.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що з переліку є типовим ship-фейлом уроку 5.10?",
        options: [
          "Badge видається кілька разів через відсутність UserHasBadgeAsync",
          "Чекпоінти зберігають прогрес",
          "Output чистий на повному проході",
          "Access обраний свідомо",
        ],
        correctAnswer: 0,
        explanation: "Класична дірка без анти-дубля.",
      },
      {
        id: "q11",
        type: MC,
        question: "На якому уроці модуля 5 з'явився джерело juice для показу в демо?",
        options: [
          "5.9 - Sound + Particles",
          "5.2 - Hazards",
          "5.5 - Секрети",
          "5.1 - Дизайн біомів",
        ],
        correctAnswer: 0,
        explanation: "5.9 додав звук і частинки, які видно на фініші й у демо.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що з переліку є частиною категорії A рубрики (перше враження)?",
        options: [
          "Іконка place відрізняється від дефолтної",
          "Складність росте плавно",
          "Секрет знаходиться за розумний час",
          "Badge видається один раз",
        ],
        correctAnswer: 0,
        explanation: "Категорія A - перше враження до входу в гру.",
      },
      {
        id: "q13",
        type: MC,
        question: "Що НЕ варто робити на уроці 5.10?",
        options: [
          "Будувати четвертий біом замість обгортання готового проєкту",
          "Заповнити Game Settings",
          "Створити Badge на сайті",
          "Прорепетирувати демо",
        ],
        correctAnswer: 0,
        explanation: "Ship - про пакування готового, не про новий контент.",
      },
      {
        id: "q14",
        type: MC,
        question: "Як звичка з 5.10 переходить у модуль 6 - Simulator?",
        options: [
          "Той самий принцип 'сервер вирішує нагороду' переїде на leaderstats і giveCoins",
          "Badge замінить leaderstats повністю",
          "Модуль 6 не використовує сервер узагалі",
          "AwardBadge буде обов'язковим у кожному уроці модуля 6",
        ],
        correctAnswer: 0,
        explanation: "Довіра сервера - спільна дисципліна між модулями.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яку назву Save зазначено для здачі уроку 5.10?",
        options: [
          "Lesson 5.10 - Ship + Badge",
          "Lesson 5.9 - Juice Polish",
          "Module 6 - Simulator",
          "Untitled Ship",
        ],
        correctAnswer: 0,
        explanation: "Точна назва збереження для здачі фіналу модуля 5.",
      },
    ],
  },
}

