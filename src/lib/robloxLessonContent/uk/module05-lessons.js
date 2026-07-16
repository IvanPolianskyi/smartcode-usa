/** Rich UK content for Roblox Module 05 */
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
 title: "5.7 - Проєкт: Арена «Хвилі ворогів»",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Побудуйте манекена-ворога (Dummy) з Humanoid для бойових хвиль",
 "Напишіть серверний Script хвиль, який рахує вбивства та спавнить наступну групу",
 "Повторно використайте пошкодження мечем, Tween hit flash і Died з 5.1-5.5",
 "Збалансуйте 3 хвилі зростаючої складності на одній арені",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Це **проєктний урок** - нового API майже немає. Ви **комбінуєте** Humanoid (5.1), меч і пошкодження (5.2-5.3), Tween-полірування (5.4) та Died/respawn (5.5) в один бойовий режим.

**Хід уроку:**
1. **Теорія (40 хв)** - дизайн хвиль + Script хвиль
2. **Практика (~35 хв)** - 3 хвилі манекенів на арені
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 5.6 - Arena Ready**. Жодних RemoteEvent сьогодні - усе на server Script, як і раніше в модулі 5.`,
 },
 {
 title: "Що таке «Хвилі ворогів»",
 content: `Замість одного тренувального манекена гравець зустрічає **групи** ворогів одну за одною:

| Хвиля | Кількість | HP кожного | Складність |
|-------|-----------|-----------|-----------|
| 1 | 2 | 40 | Легка |
| 2 | 3 | 60 | Середня |
| 3 | 4 | 80 | Важка |

**Перемога:** усі хвилі знищено. **Немає нового API** - лише Humanoid, Touched та Died, які ви вже знаєте.`,
 },
 {
 title: "Побудуйте манекена-ворога (Dummy)",
 content: `Повторно використайте підхід \`Dummy_Target\` з Уроку 5.3:

1. Insert **Rig** (R15 block Rig) з Toolbox або скопіюйте свій character в Studio
2. Перейменуйте model \`Dummy_Enemy\`
3. **Humanoid.MaxHealth** та **Health** = 40 (для хвилі 1)
4. **Anchored false** на HumanoidRootPart - манекен повинен стояти рівно, але фізика Humanoid потребує неприв'язаних Parts
5. Заблокуйте манекена на місці: \`Humanoid.WalkSpeed = 0\` (стоїть, не тікає)

**Folder:** \`Workspace/WaveArena/Dummies\` - зберігайте один **шаблон** тут для клонування.`,
 },
 {
 title: "Таблиця хвиль у Script",
 content: `**Не** ModuleScript сьогодні - проста локальна таблиця у server Script вистачає:

\`\`\`lua
local WAVES = {
 { count = 2, health = 40 },
 { count = 3, health = 60 },
 { count = 4, health = 80 },
}
\`\`\`

Таблиця Lua - це те саме, що ви використовували для \`ORDER\` контрольних точок у Модулі 6 - масив записів, індексований числом.`,
 },
 {
 title: "Спавн хвилі",
 content: `\`\`\`lua
local template = workspace.WaveArena.Dummies.Dummy_Enemy
local spawnPoints = workspace.WaveArena.EnemySpawns:GetChildren()

local function spawnWave(waveIndex)
 local config = WAVES[waveIndex]
 local aliveCount = config.count

 for i = 1, config.count do
 local dummy = template:Clone()
 local humanoid = dummy:WaitForChild("Humanoid")
 humanoid.MaxHealth = config.health
 humanoid.Health = config.health

 local point = spawnPoints[((i - 1) % #spawnPoints) + 1]
 dummy:SetPrimaryPartCFrame(point.CFrame)
 dummy.Parent = workspace.WaveArena.Active

 humanoid.Died:Connect(function()
 aliveCount -= 1
 task.wait(0.3)
 dummy:Destroy()
 if aliveCount <= 0 then
 onWaveCleared(waveIndex)
 end
 end)
 end
end
\`\`\`**%** тут - той самий оператор залишку, що і в циклічних розкладах з попередніх модулів.`,
 },
 {
 title: "Перехід між хвилями",
 content: `\`\`\`lua
local currentWave = 0

function onWaveCleared(waveIndex)
 print("Wave " .. waveIndex .. " cleared!")

 if waveIndex >= #WAVES then
 print("ARENA CLEARED - all waves defeated!")
 return
 end

 task.wait(3) -- breathing room between waves
 currentWave += 1
 spawnWave(currentWave)
end

-- Start:
currentWave = 1
spawnWave(currentWave)
\`\`\`**3 секунди перерви** дають гравцеві час підлікуватися/перезарядитися перед наступною хвилею.`,
 },
 {
 title: "Пошкодження мечем без змін",
 content: `Ваш **TrainingSword** з 5.2-5.3 damages будь-який Humanoid, включно з \`Dummy_Enemy\` - перевірка \`FindFirstChildOfClass("Humanoid")\` не розрізняє гравця і манекена.

**Важливо:** переконайтеся, що перевірка самоударів (\`character == tool.Parent\`) все ще на місці - вона не заважає удару по манекенах, бо \`tool.Parent\` = ваш character, а не Dummy.

**Tween hit flash** з 5.4 (\`flashHit(character)\`) також працює на манекенах - викликайте його однаково для гравців і ворогів.`,
 },
 {
 title: "Ворог теж може атакувати (необов'язково)",
 content: `Для простого зворотнього тиску манекен може **завдавати шкоди дотиком**, як зона пошкодження з 5.1:

\`\`\`lua
local humanoidRoot = dummy:WaitForChild("HumanoidRootPart")
local canHit = true

humanoidRoot.Touched:Connect(function(hit)
 if not canHit then return end
 local character = hit.Parent
 local playerHumanoid = character and character:FindFirstChildOfClass("Humanoid")
 if not playerHumanoid then return end

 canHit = false
 playerHumanoid:TakeDamage(5)
 task.wait(1)
 canHit = true
end)
\`\`\`Малий DAMAGE (5) - гравець повинен вигравати із запасом, а не боятися підходити.`,
 },
 {
 title: "Респавн арени після завершення",
 content: `Коли всі 3 хвилі очищено:

\`\`\`lua
task.wait(5)
for _, dummy in ipairs(workspace.WaveArena.Active:GetChildren()) do
 dummy:Destroy()
end
currentWave = 0
task.wait(2)
currentWave = 1
spawnWave(currentWave)
\`\`\`**ArenaSpawn** гравця з Уроку 5.5 залишається без змін - смерть гравця все ще веде на той самий SpawnLocation.`,
 },
 {
 title: "Баланс хвиль",
 content: `| Проблема | Виправлення |
|---------|------------|
| Хвиля 1 занадто важка для новачка | Знизьте health до 30, count до 1-2 |
| Хвилі зливаються, немає перепочинку | Збільште task.wait між хвилями до 4-5с |
| Манекени стоять купою | Розставте EnemySpawns Parts на 8+ studs одна від одної |
| Гравець ніколи не помирає | Це нормально для навчальної арени - складність не самоціль |

**Мета:** ~1-2 хвилини на всі 3 хвилі для гравця з мечем із 5.3.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Dummy_Enemy шаблон з Humanoid у Folder Dummies
- [ ] WAVES таблиця з 3 записами (count + health)
- [ ] spawnWave клонує, встановлює Health, підключає Died
- [ ] onWaveCleared запускає наступну хвилю через 3с перерви
- [ ] Зберегти: \`Lesson 5.7 - Wave Arena\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Died підключено до клонованого Humanoid лише один раз для всього шаблону",
 explanation: "Кожен клон повинен мати власне підключення.",
 correctApproach: "Connect Died всередині циклу spawnWave для кожного нового dummy",
 },
 {
 mistake: "Забули знищити тіло манекена після Died",
 explanation: "Арена заповнюється трупами, що заважають руху.",
 correctApproach: "dummy:Destroy() після короткої затримки",
 },
 {
 mistake: "aliveCount рахується глобально для всіх хвиль",
 explanation: "Хвиля 2 запускається передчасно або ніколи.",
 correctApproach: "Локальна змінна aliveCount на кожен виклик spawnWave",
 },
 {
 mistake: "EnemySpawns Parts усі в одній точці",
 explanation: "Манекени спавняться один в одному (фізичний хаос).",
 correctApproach: "Розставте 3-4 spawn Parts по арені",
 },
 ],
 summary: "Ви побудували режим хвиль ворогів, повторно використавши Humanoid, пошкодження мечем, Tween hit flash і Died з попередніх уроків Модуля 5 - жодного нового API, лише комбінація перевірених інструментів у справжній бойовий проєкт.",
 practiceTask: {
 title: "Арена «Хвилі ворогів» (~35 хв)",
 difficulty: "beginner",
 description: `**Мета:** 3 хвилі манекенів, переможні по черзі мечем із попередніх уроків.

### Part A - Манекен та точки спавну (10 хв)
1. Model \`Dummy_Enemy\` з Humanoid у Folder Dummies (шаблон, не в Workspace активно)
2. 3-4 \`EnemySpawn\` Parts на арені, розставлені на відстані

### Part B - Script хвиль (18 хв)
1. Таблиця WAVES з 3 записами (count, health)
2. spawnWave клонує шаблон, ставить Health, підключає Died для aliveCount
3. onWaveCleared запускає наступну хвилю через паузу 3с

### Part C - Тест і збереження (7 хв)
1. Пройдіть усі 3 хвилі мечем - перевірте Tween hit flash все ще працює
2. **Зберегти в Roblox** → \`Lesson 5.7 - Wave Arena\` 3. **Практика завершена**`,
 hints: [
 "Тестуйте spawnWave(1) окремо перед підключенням повного ланцюга хвиль",
 "Друкуйте aliveCount після кожного Died, щоб побачити коли хвиля має закритися",
 "Якщо манекен не отримує шкоди, перевірте що Humanoid клону не Anchored",
 ],
 optionalChallenge: "Лічильник хвиль на BillboardGui над ареною: \"Wave 2 / 3\" - готує UI-роботу з Уроку 5.8.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Хвилі ворогів у цьому уроці використовують...",
 options: [
 "Ті самі Humanoid/TakeDamage/Died, що й раніше",
 "Новий RemoteEvent API",
 "ModuleScript архітектуру",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Проєктний урок - лише комбінація відомого.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "aliveCount зменшується, коли...",
 options: [
 "Died манекена спрацьовує",
 "Гравець стрибає",
 "Ворота відкриваються",
 "Гравець купує предмет",
 ],
 correctAnswer: 0,
 explanation: "Смерть манекена = -1 до aliveCount.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Наступна хвиля запускається, коли...",
 options: [
 "aliveCount досягає 0",
 "Гравець відкриває меню",
 "Проходить 60 секунд завжди",
 "Сервер перезавантажується",
 ],
 correctAnswer: 0,
 explanation: "Умова очищення хвилі.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "WAVES таблиця зберігається як...",
 options: [
 "Локальний масив у Script",
 "ModuleScript",
 "DataStore",
 "RemoteEvent",
 ],
 correctAnswer: 0,
 explanation: "Модуль 5 ще не використовує ModuleScript.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Кожен клон Dummy повинен...",
 options: [
 "Мати власне підключення Died",
 "Ділити один Humanoid",
 "Бути Anchored true назавжди",
 "Мати RemoteFunction",
 ],
 correctAnswer: 0,
 explanation: "Незалежне життя кожного клону.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Меч завдає шкоди манекену, тому що...",
 options: [
 "Перевірка шукає будь-який Humanoid",
 "RemoteEvent з'єднує їх",
 "Манекен це гравець",
 "ModuleScript дозволяє це",
 ],
 correctAnswer: 0,
 explanation: "FindFirstChildOfClass не розрізняє джерело.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Перерва між хвилями потрібна для...",
 options: [
 "Перепочинку гравця",
 "Збереження гри",
 "Публікації",
 "DataStore запису",
 ],
 correctAnswer: 0,
 explanation: "Темп бою.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "EnemySpawns Parts повинні бути...",
 options: [
 "Розставлені на відстані одна від одної",
 "Усі в одній точці",
 "У ReplicatedStorage",
 "Невидимі назавжди без винятку",
 ],
 correctAnswer: 0,
 explanation: "Уникнення фізичного хаосу спавну.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Died манекена після затримки повинен...",
 options: [
 "dummy:Destroy()",
 "Створити RemoteEvent",
 "Публікувати гру",
 "Видалити SpawnLocation гравця",
 ],
 correctAnswer: 0,
 explanation: "Очищення тіла з арени.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.7 зберегти назву...",
 options: [
 "Lesson 5.7 - Wave Arena",
 "Arena Ready",
 "Damage System",
 "Tween Polish",
 ],
 correctAnswer: 0,
 explanation: "Зберегти проєктний урок хвиль.",
 },
 ],
 },
}

export const ukLesson58 = {
 lessonId: "lesson-roblox-5-8",
 moduleId: "module-05",
 order: 8,
 title: "5.8 - Баланс бою і polish арени",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Покажіть спливаючі числа пошкодження над манекенами через BillboardGui",
 "Додайте короткі кадри невразливості (i-frames) гравцю після отримання удару",
 "Прикрасьте арену косметикою - освітлення, знаки, огородження",
 "Проведіть повний плейтест хвиль і задокументуйте баланс",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Хвилі з 5.7 **працюють**. Сьогодні вони мають **відчуватися добре** - числа пошкодження, чесні паузи після удару, охайна арена.

**Хід уроку:**
1. **Теорія (40 хв)** - damage numbers + i-frames + косметика
2. **Практика (~30 хв)** - відшліфована арена хвиль
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 5.7 - Wave Arena**.`,
 },
 {
 title: "Чому «відчуття» важливіше за цифри",
 content: `Однакова шкода **відчувається** по-різному залежно від зворотного зв'язку:

| Без polish | З polish |
|-----------|----------|
| Тихий удар, число незмінне | Спалах + число, що злітає вгору |
| Гравець отримує 5 ударів підряд миттєво | Коротка невразливість після удару |
| Порожня арена | Знаки, світло, огородження |

Ви **не змінюєте** DAMAGE чи HP - лише те, як гравець **сприймає** бій.`,
 },
 {
 title: "Числа пошкодження - BillboardGui",
 content: `**Insert** → **BillboardGui** у шаблон Dummy_Enemy (або створюйте динамічно):

\`\`\`lua
local function showDamageNumber(character, amount)
 local root = character:FindFirstChild("HumanoidRootPart") or character.PrimaryPart
 if not root then return end

 local billboard = Instance.new("BillboardGui")
 billboard.Size = UDim2.fromOffset(60, 40)
 billboard.StudsOffset = Vector3.new(math.random(-1, 1), 2, 0)
 billboard.AlwaysOnTop = true
 billboard.Parent = root

 local label = Instance.new("TextLabel")
 label.Size = UDim2.fromScale(1, 1)
 label.BackgroundTransparency = 1
 label.Text = "-" .. amount
 label.TextColor3 = Color3.fromRGB(255, 80, 80)
 label.TextScaled = true
 label.Font = Enum.Font.GothamBold
 label.Parent = billboard

 game:GetService("TweenService"):Create(billboard, TweenInfo.new(0.6), {
 StudsOffset = billboard.StudsOffset + Vector3.new(0, 3, 0),
 }):Play()

 task.delay(0.6, function()
 billboard:Destroy()
 end)
end
\`\`\`Викликайте після \`TakeDamage\` в скрипті меча з **тим самим числом**, що передали в \`TakeDamage\`.`,
 },
 {
 title: "Кадри невразливості (i-frames)",
 content: `Ви вже маєте **canHit** дебаунс на атакуючій стороні (5.3). Сьогодні додаємо **дебаунс на стороні жертви**, щоб уникнути одночасних ударів від кількох ворогів:

\`\`\`lua
local invulnerable = {}

local function damagePlayer(humanoid, amount)
 if invulnerable[humanoid] then return end
 invulnerable[humanoid] = true

 humanoid:TakeDamage(amount)

 task.delay(0.5, function()
 invulnerable[humanoid] = nil
 end)
end
\`\`\`**0,5 с** невразливості - гравець не тане миттєво, коли стоїть біля 3 манекенів одночасно.`,
 },
 {
 title: "Візуальний сигнал невразливості",
 content: `Гравець повинен **бачити**, що він невразливий, а не гадати:

\`\`\`lua
local function flashInvulnerable(character)
 local parts = {}
 for _, part in ipairs(character:GetDescendants()) do
 if part:IsA("BasePart") then
 table.insert(parts, part)
 end
 end

 for i = 1, 3 do
 for _, part in ipairs(parts) do
 part.Transparency = 0.5
 end
 task.wait(0.1)
 for _, part in ipairs(parts) do
 part.Transparency = 0
 end
 task.wait(0.1)
 end
end
\`\`\`Простіше за Tween для швидкого блимання - **3 миготіння за 0,6с** = чіткий сигнал «я в безпеці».`,
 },
 {
 title: "Косметика арени",
 content: `| Елемент | Ефект |
|--------|--------|
| **PointLight** над кожним EnemySpawn | Драматичне освітлення точки появи |
| **Знак «WAVE ARENA»** на вході | Зрозуміла тема |
| **Огородження** по периметру | Немає випадкових падінь під час бою |
| **Різні кольори манекенів за хвилею** | Хвиля 3 виглядає небезпечнішою (темно-червоний) |

**Не** перевантажуйте - 3-4 косметичні штрихи достатньо для навчальної арени.`,
 },
 {
 title: "Колір манекена за складністю хвилі",
 content: `Малий штрих великого ефекту - у \`spawnWave\`:

\`\`\`lua
local WAVE_COLORS = {
 BrickColor.new("Bright green"),
 BrickColor.new("New Yeller"),
 BrickColor.new("Crimson"),
}

for _, part in ipairs(dummy:GetDescendants()) do
 if part:IsA("BasePart") then
 part.BrickColor = WAVE_COLORS[waveIndex]
 end
end
\`\`\`Гравець **зчитує небезпеку кольором** ще до першого удару - хвиля 3 (Crimson) виглядає серйозніше за хвилю 1 (зелена).`,
 },
 {
 title: "Плейтест-протокол",
 content: `**3 повних прогони** арени:

| # | Що записати |
|---|--------------|
| 1 | Скільки ударів мечем зайняло на хвилю 1 / 2 / 3 |
| 2 | Скільки разів гравець отримав шкоду (з i-frames) |
| 3 | Чи відчувалась хвиля 3 «важкою, але чесною» |

**Занадто легко?** +1 dummy на хвилю. **Занадто важко?** -10 HP з кожного dummy або +0,2с до i-frames.`,
 },
 {
 title: "Контрольний список плейтесту",
 content: `- [ ] Числа пошкодження злітають вгору і зникають
- [ ] Гравець блимає під час невразливості
- [ ] Немає одноразового вбивства кількома манекенами одночасно
- [ ] Арена має знак, огородження, освітлення точок появи
- [ ] Хвиля 3 кольором відрізняється від хвилі 1`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] showDamageNumber викликається після кожного TakeDamage
 - [ ] invulnerable[humanoid] блокує повторні удари 0,5с
- [ ] flashInvulnerable дає видимий сигнал
- [ ] 3 косметичні штрихи додано на арені
- [ ] Зберегти: \`Lesson 5.8 - Arena Polish\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Числа пошкодження ніколи не знищуються",
 explanation: "BillboardGui накопичуються та засмічують арену.",
 correctApproach: "task.delay(...):Destroy() після анімації",
 },
 {
 mistake: "invulnerable застряг true назавжди",
 explanation: "Гравець ніколи знову не отримує шкоди.",
 correctApproach: "task.delay скидає прапор через 0,5с",
 },
 {
 mistake: "Косметика блокує огляд бою",
 explanation: "Занадто багато Parts заважають бачити ворогів.",
 correctApproach: "Мінімалізм - знак, огородження, світло і достатньо",
 },
 {
 mistake: "Плейтест лише один прогін",
 explanation: "Одна вибірка не показує реальний баланс.",
 correctApproach: "3 прогони з записами часу/ударів",
 },
 ],
 summary: "Ви додали спливаючі числа пошкодження, кадри невразливості з видимим блиманням і косметичне полірування арени, а потім провели плейтест-протокол з трьох прогонів - хвилі ворогів тепер відчуваються справедливими та приємними, а не лише технічно робочими.",
 practiceTask: {
 title: "Polish та плейтест арени (~30 хв)",
 difficulty: "beginner",
 description: `**Мета:** Арена хвиль відчувається чесною і відшліфованою.

### Part A - Зворотний зв'язок (15 хв)
1. showDamageNumber після кожного TakeDamage мечем
2. invulnerable таблиця + flashInvulnerable для гравця

### Part B - Косметика (8 хв)
1. Знак арени, огородження, PointLight на точках появи
2. WAVE_COLORS - різний колір манекена за хвилею

### Part C - Плейтест (7 хв)
1. 3 повних прогони - запишіть удари/час на хвилю
2. **Зберегти в Roblox** → \`Lesson 5.8 - Arena Polish\` 3. **Практика завершена**`,
 hints: [
 "Тестуйте showDamageNumber окремо перед підключенням до бою",
 "0,5с i-frames - хороший старт; коригуйте після плейтесту",
 "Записуйте нотатки плейтесту прямо в Studio Notes або текстовий файл",
 ],
 optionalChallenge: "Лічильник загальної шкоди, нанесеної гравцем за весь прогін, на BillboardGui арени.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Числа пошкодження показують через...",
 options: [
 "BillboardGui над character",
 "RemoteFunction",
 "DataStore",
 "ModuleScript",
 ],
 correctAnswer: 0,
 explanation: "3D-прив'язаний інтерфейс.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "invulnerable[humanoid] запобігає...",
 options: [
 "Кілька ударів за короткий час",
 "Стрибкам",
 "Публікації",
 "Збереженню",
 ],
 correctAnswer: 0,
 explanation: "Кадри невразливості.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "flashInvulnerable дає гравцю...",
 options: [
 "Візуальний сигнал безпеки",
 "Більше HP назавжди",
 "Новий Tool",
 "Telegraph атаки ворога",
 ],
 correctAnswer: 0,
 explanation: "UX зворотний зв'язок.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "BillboardGui числа мають бути знищені, тому що...",
 options: [
 "Інакше засмічують арену",
 "Це заборонено Roblox",
 "Знижують HP",
 "Ламають DataStore",
 ],
 correctAnswer: 0,
 explanation: "Очищення тимчасового UI.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "WAVE_COLORS допомагає гравцю...",
 options: [
 "Зчитати небезпеку кольором заздалегідь",
 "Отримати більше монет",
 "Швидше бігати",
 "Відкрити магазин",
 ],
 correctAnswer: 0,
 explanation: "Візуальна мова складності.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Плейтест-протокол складається з...",
 options: [
 "3 повних прогонів із записами",
 "1 швидкого погляду",
 "Лише читання коду",
 "Публікації без тестів",
 ],
 correctAnswer: 0,
 explanation: "Надійна вибірка даних.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Занадто легка хвиля 3 виправляється через...",
 options: [
 "Більше манекенів або HP",
 "Видалення меча",
 "ModuleScript",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Налаштування складності.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Косметика арени повинна бути...",
 options: [
 "Мінімальна, без блокування огляду бою",
 "Максимально щільна",
 "Прозора на 100% завжди",
 "Розміщена лише в Lighting",
 ],
 correctAnswer: 0,
 explanation: "Читабельність бою понад декор.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 5.8 базується на...",
 options: [
 "Wave Arena з Уроку 5.7",
 "Лише Модуль 1",
 "Лише магазин",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Полірування попереднього проєкту.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.8 зберегти назву...",
 options: [
 "Lesson 5.8 - Arena Polish",
 "Wave Arena",
 "Arena Ready",
 "Damage System",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок полірування.",
 },
 ],
 },
}
