/** Rich UK content for Roblox Module 05 - AUTO from EN via gen-roblox-lessons-uk.mjs */
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
2. Надрукуйте на «Померли», коли здоров’я досягає 0
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
 question: "Humanoid керує…",
 options: [
 "Здоров'я і рух",
 "Тільки місцевість",
 "DataStore",
 "Тільки Skybox",
 ],
 correctAnswer: 0,
 explanation: "Humanoid - контролер Character.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "TakeDamage(15) зменшує...",
 options: [
 "Здоров'я до 15",
 "MaxHealth назавжди",
 "Монети",
 "Рельєф місцевості",
 ],
 correctAnswer: 0,
 explanation: "Стандартний API пошкоджень.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Здоров'я за 0 причин...",
 options: [
 "Смерть / відродження",
 "Більше монет",
 "Швидше ходити",
 "Зберегти файл",
 ],
 correctAnswer: 0,
 explanation: "Нуль здоров'я = поразка.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Загинула подія, коли...",
 options: [
 "Humanoid гине",
 "Укомплектований інструмент",
 "Зібрані монети",
 "Відкриється інтерфейс користувача",
 ],
 correctAnswer: 0,
 explanation: "Слухач смерті.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Зона пошкодження повинна використовувати…",
 options: [
 "Серверний скрипт",
 "Лише LocalScript",
 "Тільки звук",
 "атмосфера",
 ],
 correctAnswer: 0,
 explanation: "Повноваження сервера для бою.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Відбиття лави запобігає...",
 options: [
 "Миттєве багаторазове розплавлення",
 "Стрибки",
 "Збереження",
 "Нерест",
 ],
 correctAnswer: 0,
 explanation: "Багато разів торкався пожеж.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Heal використовує math.min для...",
 options: [
 "Кепка на MaxHealth",
 "Видалити гравця",
 "Зніміть інструмент",
 "Опублікувати",
 ],
 correctAnswer: 0,
 explanation: "Запобігайте загоєнню.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "FindFirstChildOfClass Humanoid знаходить…",
 options: [
 "Humanoid за характером",
 "Лише Part",
 "Інструмент",
 "SpawnLocation",
 ],
 correctAnswer: 0,
 explanation: "Склад здоров'я Character.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Модуль 5 фокусується на…",
 options: [
 "Бойовий",
 "Тільки магнат",
 "Тільки місцевість",
 "Тільки видавництво",
 ],
 correctAnswer: 0,
 explanation: "Модуль «Бійцівський клуб».",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.1 зберегти назву…",
 options: [
 "Урок 5.1 - Арена здоров'я",
 "Tycoon Works",
 "Obby готовий",
 "Симулятор монет",
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
| **Script** | Внутрішній інструмент (LocalScript, загальний для введення) |

**Потік:**
1. Інструмент у **StarterPack** → з’являється в **Рюкзаку** під час появи
2. Гравець натискає **1** або натискає інструмент → **озброєний** для Character
3. **Натисніть** під час спорядження →\`Activated\`пожежі`,
 },
 {
 title: "Побудуйте TrainingSword",
 content: `**StarterPack** → Insert **Tool** → перейменувати\`TrainingSword\`Внутрішній інструмент:
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
- [ ] Активований друк після натискання
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
1. Активовано → гойдалка друку
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
 question: "Для інструмента потрібен дочірній елемент із назвою…",
 options: [
 "Ручка",
 "Лезо",
 "Humanoid",
 "Спаун",
 ],
 correctAnswer: 0,
 explanation: "Конвенція інструментів Roblox.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Інструменти StarterPack з’являються в...",
 options: [
 "Рюкзак на spawn",
 "Рельєф місцевості",
 "Освітлення",
 "Output",
 ],
 correctAnswer: 0,
 explanation: "Завантаження за замовчуванням.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Активували пожежі, коли…",
 options: [
 "Гравець клацає під час спорядження",
 "Гра збереження",
 "Зворушлива лава",
 "ClockTime",
 ],
 correctAnswer: 0,
 explanation: "Атака введення.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "LocalScript в інструменті підходить для…",
 options: [
 "Виявлення коливань входу",
 "Серверна економіка",
 "DataStore",
 "Позовна ділянка",
 ],
 correctAnswer: 0,
 explanation: "Вхідний рівень клієнта.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Пошкодження в уроці 5.2...",
 options: [
 "Ще ні - на наступному уроці",
 "Потрібно сьогодні",
 "На місцевості",
 "Через статистику лідерів",
 ],
 correctAnswer: 0,
 explanation: "5.3 додає шкоди.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Споряджена подія запускається, коли...",
 options: [
 "Інструмент рухається до Character",
 "Гравець гине",
 "Дотик монети",
 "Інтерфейс закрити",
 ],
 correctAnswer: 0,
 explanation: "Обладнайте життєвий цикл.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Сервер повинен завдати шкоди, оскільки…",
 options: [
 "Античіт-довіра",
 "колір інтерфейсу",
 "небо",
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
 "Падіння інструменту на землю",
 "Екіпірування",
 "Стрибки",
 "Здоров'я",
 ],
 correctAnswer: 0,
 explanation: "Тримайте зброю на гравці.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Регулювання Properties зчеплення…",
 options: [
 "Як меч сидить в руці",
 "MaxHealth",
 "Монети",
 "Рельєф місцевості",
 ],
 correctAnswer: 0,
 explanation: "Орієнтація інструменту.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.2 зберегти назву…",
 options: [
 "Урок 5.2 - Перший меч",
 "Арена здоров'я",
 "Система пошкоджень",
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
 "Застосуйте пошкодження мечем за допомогою Рукоятки Торкнувся на сервері",
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
\`\`\`**NPCs пізніше:** žrtvePlayer нуль, але Humanoid існує - все одно завдає шкоди NPC.`,
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
 content: `Insert **Ріг** або манекен з Humanoid на арену\`Dummy_Target\`.

Стій на місці - гойдайся - здоров'я падає - добре для сольного тестування.

**Якір** фіктивний корінь; Humanoid все ще отримує пошкодження.`,
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
 "Тільки клієнт",
 "Рельєф місцевості",
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
 "Самоушкодження",
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
 "Пошкоджуйте спам між зверненнями",
 "Екіпірування",
 "Відродження",
 "Меню вкладок",
 ],
 correctAnswer: 0,
 explanation: "Натисніть час відновлення.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "TakeDamage(20) на 100 HP потребує…",
 options: [
 "5 ударів без лікування",
 "1 удар",
 "100 ударів",
 "0 звернень",
 ],
 correctAnswer: 0,
 explanation: "Проста математика TTK.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Доторкнута ручка виявляє…",
 options: [
 "Якої Parts торкається лезо",
 "ClockTime",
 "DataStore",
 "атмосфера",
 ],
 correctAnswer: 0,
 explanation: "Виявлення зіткнення.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Перевірка Humanoid ігнорує…",
 options: [
 "Стіни та не-персонажа",
 "Гравці",
 "NPC",
 "Здоров'я",
 ],
 correctAnswer: 0,
 explanation: "Тільки Character мають Humanoid.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Поворотне вікно з активованою…",
 options: [
 "Обмежує пошкодження активних коливань",
 "Видаляє інструмент",
 "Додає монети",
 "Позовна ділянка",
 ],
 correctAnswer: 0,
 explanation: "Додатковий рівень справедливості.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Дуельне тестування потребує…",
 options: [
 "Humanoid цілі",
 "Тільки місцевість",
 "Немає виводу",
 "Опублікуйте спочатку",
 ],
 correctAnswer: 0,
 explanation: "Characterі для пошкодження.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Додано урок 5.2…",
 options: [
 "Інструмент оснащено та активовано",
 "DataStore",
 "Магнатські змови",
 "Рельєф місцевості",
 ],
 correctAnswer: 0,
 explanation: "Попереднє налаштування меча.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.3 зберегти назву…",
 options: [
 "Урок 5.3 - Система пошкоджень",
 "Перший меч",
 "Арена здоров'я",
 "Столи оновлення",
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
\`\`\`LocalScript може прослухати RemoteEvent пізніше - для уроку достатньо серверного друку.`,
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
 question: "TweenService анімує Properties…",
 options: [
 "Плавно протягом часу",
 "Тільки миттєво",
 "Ніколи",
 "Тільки звук",
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
 "Сума збитку",
 "ID гравця",
 "Вартість монети",
 ],
 correctAnswer: 0,
 explanation: "Скільки триває анімація.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "EasingDirection.Out означає…",
 options: [
 "Повільно в кінці",
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
 "Дуже короткий (загалом ~0,2 с)",
 "10 секунд",
 "Постійний",
 "Тільки в Edit",
 ],
 correctAnswer: 0,
 explanation: "Швидкий бойовий відгук.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Створити (Part, інформація, ціль) потреби…",
 options: [
 "Instance до анімації + таблиця цілей",
 "Тільки друк",
 "Рельєф місцевості",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Стандартний шаблон анімації.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Quad EasingStyle - це…",
 options: [
 "Гладкі загального призначення",
 "Тільки для UI",
 "зламаний",
 "Тільки лава",
 ],
 correctAnswer: 0,
 explanation: "Хороше послаблення за замовчуванням.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Зберігайте закрито, щоб ворота могли…",
 options: [
 "Знову закрийте",
 "Ніколи не рухайся",
 "Видалити гравця",
 "Зняти меч",
 ],
 correctAnswer: 0,
 explanation: "Поверніться у вихідне положення.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Забагато твінів викликає...",
 options: [
 "Відставання та безлад",
 "Безкоштовний Robux",
 "Автоматичне збереження",
 "Більше здоров'я",
 ],
 correctAnswer: 0,
 explanation: "Використовуйте Constraints економно.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "flashHit йде після...",
 options: [
 "Успішний TakeDamage",
 "Гравець приєднується",
 "Фарба місцевості",
 "Опублікувати",
 ],
 correctAnswer: 0,
 explanation: "Відгук про влучний момент.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.4 зберегти назву…",
 options: [
 "Урок 5.4 - Tween Polish",
 "Система пошкоджень",
 "Перший меч",
 "Арена готова",
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

| Обірвана петля | Хороший цикл |
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
- Яскравий колір, Якір
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
\`\`\`Або простіше: **новий character = новий Humanoid** - повторно підключитися Торкнувся кожного Доданого Character, якщо потрібно.`,
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
2. Надрукуйте ім'я гравця у випадку поразки

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
 "Здоров'я Humanoid досягає 0",
 "Укомплектований інструмент",
 "Дотик монети",
 "Ворота відкриваються",
 ],
 correctAnswer: 0,
 explanation: "Подія смерті.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "CharacterAdded працює…",
 options: [
 "Кожне нове життя/відродження",
 "Одного разу",
 "Тільки в Edit",
 "На збереження",
 ],
 correctAnswer: 0,
 explanation: "Поява кожного Character.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Connect Died всередині CharacterAdded через…",
 options: [
 "Кожне життя потребує нового слухача",
 "Лише інтерфейс користувача",
 "Рельєф місцевості",
 "атмосфера",
 ],
 correctAnswer: 0,
 explanation: "Кожне відродження нового Humanoid.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "ArenaSpawn має бути…",
 options: [
 "На безпечному підлозі арени",
 "У лаві",
 "Поза робочим простором",
 "У StarterGui",
 ],
 correctAnswer: 0,
 explanation: "Чесна точка відродження.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "RespawnTime = 3 додавання…",
 options: [
 "Затримка перед відродженням",
 "Більше пошкоджень",
 "Монети",
 "Рельєф місцевості",
 ],
 correctAnswer: 0,
 explanation: "Секунди до відродження.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Після відродження меч повинен…",
 options: [
 "Все одно завдавати шкоди",
 "Ніколи не споряджайте",
 "Видалити DataStore",
 "Зняти ділянки",
 ],
 correctAnswer: 0,
 explanation: "Тест скидання стану.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Три перевірки на смерть...",
 options: [
 "Стабільність протягом багатьох життів",
 "Тільки одне життя",
 "Видавництво",
 "Тільки небо",
 ],
 correctAnswer: 0,
 explanation: "Петля стрес-тесту.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Зламаний може вдарити після смерті викликає...",
 options: [
 "Жодної шкоди після відродження",
 "Більше здоров'я",
 "Швидше ворота",
 "Автоматична перемога",
 ],
 correctAnswer: 0,
 explanation: "Помилка стану відновлення.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Розпорядник смерті належить до…",
 options: [
 "Сервер",
 "Тільки клієнтський HUD",
 "Рельєфна щітка",
 "Звук",
 ],
 correctAnswer: 0,
 explanation: "Авторитетні ігрові події.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 5.5 зберегти назву…",
 options: [
 "Урок 5.5 - Відродження смерті",
 "Tween Polish",
 "Перший меч",
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
- Смерть + петля відродження (5.5)`,
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
 optionalChallenge: "Кредит за вбивство - останній гравець отримує +1 перемоги за смерть жертви.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Arena Ready включає…",
 options: [
 "Меч + пошкодження + відродження + полірування",
 "Тільки місцевість",
 "Тільки монети",
 "Жодних Scripts",
 ],
 correctAnswer: 0,
 explanation: "Повний стек Module 5.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Тест 4 підтверджує…",
 options: [
 "Відродження на арені",
 "DataStore",
 "Магнатська змова",
 "Рельєф ген",
 ],
 correctAnswer: 0,
 explanation: "Смертельна петля.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Хороший TTK - це про…",
 options: [
 "8-15 секунд",
 "0,1 секунди",
 "5 хвилин",
 "Жодного бою",
 ],
 correctAnswer: 0,
 explanation: "Читальна довжина дуелі.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Пошкодження сервера запобігає...",
 options: [
 "Клієнтські експлойти",
 "Стрибки",
 "інтерфейс користувача",
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
 "Заблокувати зір на секунди",
 "Існувати",
 "Використовуйте TweenService",
 "Відгук про допомогу",
 ],
 correctAnswer: 0,
 explanation: "Тільки короткі FX.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Перемагає в рейтингу лідерів…",
 options: [
 "Кількість вбивств у табл",
 "Тільки здоров'я",
 "Рельєф місцевості",
 "ClockTime",
 ],
 correctAnswer: 0,
 explanation: "Додаткова статистика арени.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Тема модуля 6…",
 options: [
 "Гонки / транспортні засоби",
 "Тільки обби",
 "Тільки магазин",
 "Порожній",
 ],
 correctAnswer: 0,
 explanation: "Швидше Вище Далі.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Червоний вихід під час дуелі означає…",
 options: [
 "Виправити перед публікацією",
 "ідеально",
 "Додати лаву",
 "Опублікувати зараз",
 ],
 correctAnswer: 0,
 explanation: "Помилки = помилки.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Тест на три смерті належить…",
 options: [
 "Урок 5.5 Стабільність відродження",
 "Розміщення монет",
 "Тільки місцевість",
 "Видавництво",
 ],
 correctAnswer: 0,
 explanation: "Стрес-тест Respawn.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Модуль 5 зберегти назву…",
 options: [
 "Модуль 5 - Арена готова",
 "Заняття 5.1",
 "Tycoon Works",
 "Без назви",
 ],
 correctAnswer: 0,
 explanation: "Name портфоліо Checkpoint.",
 },
 ],
 },
}
