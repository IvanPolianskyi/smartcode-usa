/** Rich UK content for Roblox Module 10 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson101 = {
 lessonId: "lesson-roblox-10-1",
 moduleId: "module-10",
 order: 1,
 title: "10.1 - Фізичні зв'язки (Constraints)",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Налаштуйте пари додатків для HingeConstraint і RopeConstraint",
 "Побудуйте дверцята на петлях, які активуються кнопкою",
 "Налаштуйте швидкість двигуна та демпфування для читабельного руху",
 "Додайте підвісну платформу на мотузці як другу фізичну демонстрацію",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Модуль 10 - Магія Parts** - вдосконалюйте **фізику**, **Constraints** та **промені**.

**Хід уроку:**
1. **Теорія (40 хв)** - обмеження
2. **Практика (~25 хв)** - петлі дверцята + мотузкова платформа
3. **Вікторина (10 хв)** - проходження **70%**

Нова область:\`Lesson 10.1 - Constraints\`.`,
 },
 {
 title: "Обмеження оживляють світи",
 content: `**Обмеження** з’єднують Parts з фізичними правилами:

| Обмеження | Використовуйте |
|------------|-----|
| **HingeConstraint** | Двері, ворота, обертові майданчики |
| **RopeConstraint** | Гойдалки, містки, вивіски |
| **BallSocket** | Суглоби вільного обертання (просунуті) |

Без обмежень ви анімуєте кожен кадр вручну. З обмеженнями **фізика Roblox** робить свою роботу.`,
 },
 {
 title: "Кріплення - опорні точки",
 content: `Кожне обмеження потребує **двох вкладень** (по одному на Part):

1. Виберіть **Part A** (двері) → Create **Attachment**\`Att_Door\` 2. Виберіть **Part B** (рамка) → Create **Attachment**\`Att_Frame\` 3. Вирівняйте кріплення по **краю петлі** (лінія дверної петлі)

**Hinge Constraint** у Part дверей:
- **Attachment0** → Att_Door
- **Додаток1** → Att_Frame

**Рама закріплена true.** Двері **не Anchored** (рухається).`,
 },
 {
 title: "Двері на петлі з мотором",
 content: `\`Door\`+\`DoorFrame\`налаштування.

Properties **HingeConstraint**:

| Property | Початкове значення |
|----------|-------------|
| **Тип приводу** | Мотор |
| **Кутова швидкість** | 1,5 |
| **MotorMaxTorque** | 5000 |
| **LimitsEnabled** | true |
| **Нижній кут** | 0 |
| **Верхній кут** | 90 |

**Кнопка** → Скрипт перемикає двигун:\`\`\`lua
local hinge = workspace.Mechanics.SwingDoor.Hinge
local open = false

script.Parent.ClickDetector.MouseClick:Connect(function()
 open = not open
 hinge.AngularVelocity = open and 1.5 or -1.5
end)
\`\`\`Або встановіть **TargetAngle**, якщо використовується режим Servo.`,
 },
 {
 title: "Мотузкова підвісна платформа",
 content: `**Платформа** (незакріплена) + **Стельова балка** (закріплена):

**Обмежувач мотузки:**
- Attachment на верхній Part платформи
- Кріплення 1 на стелі
- **Довжина** = відстань між точками
- **Відшкодування** = 0,1 (низький відскок)
- **Товщина** = 0,2 видимої мотузки

Платформа **гойдається**, коли гравці стрибають на неї.

**Налаштування ігрового процесу:** занадто пружний = нудота; занадто жорсткий = підробка.`,
 },
 {
 title: "Тюнінг і зіткнення",
 content: `| Проблема | Виправити |
|---------|-----|
| Двері відлітають | Знизьте AngularVelocity, підвищте MotorMaxTorque |
| Програвач дверних затискачів | Групи зіткнень або менша швидкість |
| Дивно тягнеться мотузка | Перевірте положення кріплень |
| Платформа обертається | Додайте AlignOrientation або друге обмеження |

**Вправа (5 хв.):** Пройдіть крізь двері, відчиняючи - рух можна розпізнати?`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Двері на петлі відкриваються/закриваються за допомогою кнопки
- [ ] Рама закріплена, двері розкріплені
- [ ] Канатна платформа гойдається під вагою
- [ ] Кріплення, вирівняні в точках петлі/мотузки
- [ ] Зберегти:\`Lesson 10.1 - Physical Constraints\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Обидві Parts Anchored",
 explanation: "Нічого не рухається.",
 correctApproach: "Рухома Part незакріплена",
 },
 {
 mistake: "Вкладення неправильно",
 explanation: "Дика вісь обертання.",
 correctApproach: "Прикріпити до краю петлі",
 },
 {
 mistake: "Кутова швидкість 50",
 explanation: "Хаотичні двері.",
 correctApproach: "Початок 1-2",
 },
 {
 mistake: "Без кріплення на рамі",
 explanation: "Обмеження неповне.",
 correctApproach: "Потрібні два вкладення",
 },
 ],
 summary: "Ви побудували двері з петлями з приводом від двигуна та платформу, підвішену на мотузці, використовуючи кріплення та обмеження - механічний рух, який відчувається фізичним, а не сценарним кожним кадром.",
 practiceTask: {
 title: "Механічні двері (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Двері на петлях + мотузкова платформа.

### Part A - Двері на петлі (15 хв)
1. Механіка Folders - дверна рама + двері + петля
2. ClickDetector або ProximityPrompt відкриває
3. Межі 0-90 градусів

### Part B - Мотузкова платформа (8 хв)
1. Стеля + платформа + RopeConstraint
2. Тестовий стрибок - розмах відчувається природним

### Part C - Зберегти (2 хв)
1. **Зберегти в Roblox** →\`Lesson 10.1 - Physical Constraints\` 2. **Практика завершена**`,
 hints: [
 "Лише анкерні опорні Parts",
 "Модуль 5 використовував анімацію - обмеження є рухом на основі фізики",
 "Групи зіткнень, якщо двері сильно б’ють гравців",
 ],
 optionalChallenge: "Перехресний міст коливається на петлі - виклик синхронізації.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "HingeConstraint потребує...",
 options: [
 "Два Attachment",
 "Лише Terrain",
 "Humanoid",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Прикріплена пара.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Дверна рама повинна бути...",
 options: [
 "Anchored true",
 "Завжди Unanchored",
 "Лише невидимий",
 "Видалено",
 ],
 correctAnswer: 0,
 explanation: "HingeConstraint (петля).",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Обмеження RopeConstraint...",
 options: [
 "Відстань між Parts",
 "Монети гравця",
 "Прогрес квесту",
 "Size UI",
 ],
 correctAnswer: 0,
 explanation: "Довжина мотузки.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "ActuatorType Двигун обертається...",
 options: [
 "Hinge з velocity",
 "Terrain",
 "Sky",
 "Лише Sound",
 ],
 correctAnswer: 0,
 explanation: "Моторний привід.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Рухома Part дверей - це...",
 options: [
 "Unanchored",
 "Anchored true",
 "Лише Script",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Фізика руху.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Тема модуля 10...",
 options: [
 "Magic of Details",
 "Лише inventory",
 "Лише shop",
 "Publishing",
 ],
 correctAnswer: 0,
 explanation: "Модуль полірування.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Занадто швидка кутова швидкість...",
 options: [
 "Відчувається хаотично",
 "Покращує FPS",
 "Обов'язково",
 "Зберігає дані",
 ],
 correctAnswer: 0,
 explanation: "Тюнінг.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 10.2 охоплює...",
 options: [
 "TweenService",
 "Лише DataStore",
 "Лише NPC",
 "Лише монети",
 ],
 correctAnswer: 0,
 explanation: "Наступний урок.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Обмеження, які використовуються для...",
 options: [
 "Двері, мости, ліфти",
 "Лише текст діалогу",
 "Leaderstats",
 "UK locale",
 ],
 correctAnswer: 0,
 explanation: "Механічний рух.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 10.1 зберегти назву...",
 options: [
 "Lesson 10.1 - Physical Constraints",
 "Puzzle World",
 "Tween Mastery",
 "RPG Inventory",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson102 = {
 lessonId: "lesson-roblox-10-2",
 moduleId: "module-10",
 order: 2,
 title: "10.2 - TweenService: майстерність",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створюйте твіни (tween) з TweenInfo за допомогою послаблення та тривалості TweenInfo",
 "Панелі Tween UI та Parts світу (двері, предмети колекціонування)",
 "Ланцюжок твінів із завершеною подією",
 "Вибирайте стилі полегшення для миттєвих або драматичних рухів",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**TweenService** = плавна анімація без ключових кадрів у кожному кадрі.

Ви використовували TweenService в модулі 5 (Tween Polish) - сьогодні ви **опануєте** Constraints, raycast і процедурні головоломки.

**Хід уроку:**
1. **Теорія (40 хв)** - TweenInfo + ланцюжки
2. **Практика (~25 хв)** - 3 демонстраційні ролики
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 10.1 - Фізичні обмеження**.`,
 },
 {
 title: "Чому TweenService має значення",
 content: `Інтерфейс миттєвого телепорту виглядає дешево. **0,3 с Quad Out** дає відчуття професійності.

**Tween** = інтерполяція Properties у часі:
- Інтерфейс користувача\`Position\`,\`Size\`,\`BackgroundTransparency\`- Parts\`CFrame\`,\`Size\`,\`Color\`-\`Camera.CFrame\`(розширений)

**Не для:** безперервної фізики (використовуйте обмеження 10.1).`,
 },
 {
 title: "Основний шаблон анімації",
 content: `\`\`\`lua
local TweenService = game:GetService("TweenService")

local panel = script.Parent.ShopPanel
local goal = { Position = UDim2.fromScale(0.5, 0.5) }
local info = TweenInfo.new(
 0.5, -- time
 Enum.EasingStyle.Quad,
 Enum.EasingDirection.Out
)

local tween = TweenService:Create(panel, info, goal)
tween:Play()
\`\`\`| EasingStyle | Відчути |
|-------------|------|
| **Квадроцикл** | Загальний інтерфейс користувача |
| **Назад** | Незначне перевищення |
| **Відскок** | Грайливий (використовуйте економно) |
| **Лінійний** | Механічні двері |`,
 },
 {
 title: "Три анімаційні демо",
 content: `**1 - відкрита панель інтерфейсу користувача** (ShopPanel прихована поза екраном):\`\`\`lua
-- from {Position = UDim2.fromScale(0.5, 1.2)} to center
\`\`\`**2 - Розсувні двері** (Part CFrame - двері-пазли):\`\`\`lua
local door = workspace.Puzzle.DoorSlide
local openCF = door.CFrame * CFrame.new(0, 0, 8)
TweenService:Create(door, TweenInfo.new(1, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut), {CFrame = openCF}):Play()
\`\`\`**3 - Колекційний імпульс** (цикл зміни розміру кристалу):\`\`\`lua
local crystal = workspace.QuestProps.Crystal
local big = TweenService:Create(crystal, TweenInfo.new(0.6, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true), {Size = crystal.Size * 1.15})
big:Play()
\`\`\`**\`-1, true\`** = повторювати вічно, навпаки.`,
 },
 {
 title: "Ланцюжок із завершеним",
 content: `\`\`\`lua
local function playOpenSequence(door, panel, label)
 local t1 = TweenService:Create(door, TweenInfo.new(0.8, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {CFrame = doorOpenCF})
 t1:Play()
 t1.Completed:Connect(function()
 local t2 = TweenService:Create(panel, TweenInfo.new(0.4, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = centerPos})
 t2:Play()
 t2.Completed:Connect(function()
 label.Text = "Room Unlocked!"
 end)
 end)
end
\`\`\`**Ланцюги** = відкриття головоломок, проходження квестів, ролики.`,
 },
 {
 title: "Рекомендації щодо часу",
 content: `| Дія | Тривалість |
|--------|----------|
| Кнопка зворотного зв'язку | 0,15-0,25 с |
| Панель відкрита | 0,4-0,6с |
| Драматичні двері | 0,8-1,2с |
| Навколишній пульс | 0,5-1с цикл |

Зберегти в конфігурації:\`\`\`lua
local TWEEN_UI_OPEN = TweenInfo.new(0.45, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
\`\`\`**Уникайте** відскоків на кожному елементі інтерфейсу - виглядає непрофесійно.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [] Панель інтерфейсу користувача між відкриттям/закриттям
- [ ] Двері розсуваються з лінійною анімацією
- [ ] Імпульсний цикл кристалу
- [ ] Один завершений ланцюжок (2+ кроки)
- [ ] Зберегти:\`Lesson 10.2 - Tween Mastery\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Tween Anchored двері неправильна вісь",
 explanation: "Двері застрягли.",
 correctApproach: "Ціль CFrame протестована в Studio",
 },
 {
 mistake: "Підстрибувати на все",
 explanation: "Інтерфейс клоуна.",
 correctApproach: "Quad/Back економно",
 },
 {
 mistake: "Забути :Play()",
 explanation: "Нічого не відбувається.",
 correctApproach: "tween:Play()",
 },
 {
 mistake: "Конфліктне обмеження + анімація позиції",
 explanation: "Фізика бореться з анімацією.",
 correctApproach: "Виберіть одну систему руху",
 },
 ],
 summary: "Ви освоїли динаміку TweenInfo, анімацію користувальницького інтерфейсу та світових об’єктів, колекційні цикли пульсу та завершені ланцюжки - ваші відгуки про гру тепер здаються плавними та навмисними.",
 practiceTask: {
 title: "Пакет лаків Tween (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** 3 підростки + 1 ланцюжок.

### Part A - Інтерфейс користувача (8 хв)
1. Панель «Магазин» або «головоломка» - анімація за кадром
2. Закрити реверс анімації

### Part B - Світ (10 хв)
1. Розсувні двері CFrame tween
2. Цикл повторення кристалічного імпульсу

### Part C - Приєднати та зберегти (7 хв)
1. Двері відкриваються → панель → текст (Завершено)
2. **Зберегти в Roblox** →\`Lesson 10.2 - Tween Mastery\` 3. **Практика завершена**`,
 hints: [
 "Модуль 5.4 мав TweenService - розширте тут",
 "Скасувати попередню анімацію, якщо спам, клацніть «Відкрити».",
 "UDim2 для інтерфейсу користувача, CFrame для Parts",
 ],
 optionalChallenge: "Міні-кінематограф: панорамування камери → двері → текст квесту.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "TweenService анімує...",
 options: [
 "Properties з часом",
 "Лише Terrain",
 "Лише Humanoid",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Інтерполяція.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Перший аргумент TweenInfo.new - це...",
 options: [
 "Тривалість у секундах",
 "Ім'я гравця",
 "Item id",
 "Robux",
 ],
 correctAnswer: 0,
 explanation: "Тривалість часу.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Завершена подія запускається, коли...",
 options: [
 "Tween завершується",
 "Гравець приєднується",
 "Terrain завантажується",
 "Shop відкривається",
 ],
 correctAnswer: 0,
 explanation: "Ланцюжок твінів.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Quad Out підходить для...",
 options: [
 "Панелі UI",
 "Авторитет Server",
 "Монети",
 "AI NPC",
 ],
 correctAnswer: 0,
 explanation: "Плавний інтерфейс користувача.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Повторення -1 у TweenInfo означає...",
 options: [
 "Цикл назавжди",
 "Один раз",
 "Зупинити server",
 "Видалити Part",
 ],
 correctAnswer: 0,
 explanation: "Імпульсний цикл.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Лінійне послаблення для відчуття дверей...",
 options: [
 "Механічно рівно",
 "Пружний",
 "Випадково",
 "Невидимий",
 ],
 correctAnswer: 0,
 explanation: "Двері розсувні.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 10.2 базується на...",
 options: [
 "Обмеження Lesson 10.1",
 "Лише Module 1",
 "Порожньо",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Те саме місце загадки.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 10.3 додає...",
 options: [
 "Raycasting",
 "Лише shop",
 "Лише inventory",
 "Racing",
 ],
 correctAnswer: 0,
 explanation: "Далі датчики.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: ":Play() потрібен, оскільки...",
 options: [
 "Tween не працює до Play",
 "Завжди авто",
 "Бани Server",
 "UI видаляє",
 ],
 correctAnswer: 0,
 explanation: "Почніть анімацію.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 10.2 зберегти назву...",
 options: [
 "Lesson 10.2 - Tween Mastery",
 "Physical Constraints",
 "Puzzle World",
 "Raycasting",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson103 = {
 lessonId: "lesson-roblox-10-3",
 moduleId: "module-10",
 order: 3,
 title: "10.3 - Raycasting",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Відтворюйте промені за допомогою RaycastParams і FilterDescendantsInstances",
 "Створіть датчик від випромінювача до цілі для розблокування головоломки",
 "Налагодження променів за допомогою Beam або тимчасових Parts",
 "Позначайте дійсні цілі за допомогою CollectionService",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Raycasting** = невидимий лазер, який запитує, *що на шляху?*

Ідеально підходить для лазерних головоломок, прямої видимості, виявлення ударів.

**Хід уроку:**
1. **Теорія (40 хв)** - Raycast API
2. **Практика (~25 хв)** - розблокування сенсорного променя
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 10.2 - Майстерність Tween**.`,
 },
 {
 title: "Raycasting простою англійською мовою",
 content: `З **початку** зйомки **напрямок** × **відстань**:\`\`\`lua
local origin = emitter.Position
local direction = (target.Position - origin).Unit
local distance = (target.Position - origin).Magnitude

local result = workspace:Raycast(origin, direction * distance, params)
\`\`\`**результат** нуль = нічого не влучено (чиста лінія).
**результат.Екземпляр** = звернення першої Parts.`,
 },
 {
 title: "Фільтри RaycastParams",
 content: `\`\`\`lua
local params = RaycastParams.new()
params.FilterType = Enum.RaycastFilterType.Exclude
params.FilterDescendantsInstances = {
 game.Players.LocalPlayer.Character, -- if LocalScript test
 workspace.Debris,
}
params.IgnoreWater = true
\`\`\`**Включити** білий список - враховуються лише позначені цілі:\`\`\`lua
params.FilterType = Enum.RaycastFilterType.Include
params.FilterDescendantsInstances = {workspace.Puzzle.Targets}
\`\`\`**Серверна головоломка** - запустіть raycast на **сервері** для надійного розблокування.`,
 },
 {
 title: "Сенсорна логічна головоломка",
 content: `Part **Emitter** → Part **TargetCrystal** (тег\`PuzzleTarget\`)\`PuzzleRayService\`Script (сервер), кожні 0,2 с або дзеркальне обертання:\`\`\`lua
local CollectionService = game:GetService("CollectionService")

local function checkBeam(emitter, target)
 local dir = (target.Position - emitter.Position)
 local result = workspace:Raycast(emitter.Position, dir.Unit * dir.Magnitude, params)

 if not result then
 return false, "blocked" -- should not happen if target in range
 end

 if result.Instance == target or result.Instance:IsDescendantOf(target.Parent) then
 return true, "clear_hit"
 end

 return false, "blocked_by_" .. result.Instance.Name
end
\`\`\`Якщо **очистити** → встановити\`targetState.A = true\`→ перевірити всі цілі → відкрити двері.`,
 },
 {
 title: "Налагодити візуальні ефекти",
 content: `**Промінь** між насадками на випромінювачі та точкою попадання:\`\`\`lua
-- Attachment0 on emitter, Attachment1 on moving hit part
beam.Color = ColorSequence.new(Color3.fromRGB(255, 0, 0))
-- Green when puzzle solved:
beam.Color = ColorSequence.new(Color3.fromRGB(0, 255, 100))
\`\`\`**Або** тимчасова тонка Part вздовж променя в налагодженні Studio.

Налагодження зберігає години, коли «головоломка зламана» насправді є сторонньою Part на шляху.`,
 },
 {
 title: "Нормалізація напрямку",
 content: `**Завжди** використовуйте\`.Unit\`перед множенням відстані:\`\`\`lua
local dir = (target.Position - origin)
local result = workspace:Raycast(origin, dir.Unit * dir.Magnitude, params)
\`\`\`неправильно:\`direction * 100\`з не одиничним вектором → неправильна дистанція попадання.

**Виключіть** декоративні Parts та скло, якщо вони не повинні блокувати.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Рей потрапляє в ціль, коли лінія вільна
- [ ] Розблокувати стіну між блоками
- [ ] Промінь налагодження відображає червоний/зелений стан
- [ ] Server Script володіє розблокуванням (не тільки клієнтом)
- [ ] Зберегти:\`Lesson 10.3 - Raycasting\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Неодиничний вектор напрямку",
 explanation: "Неправильна довжина променя.",
 correctApproach: "реж.Одиниця * величина",
 },
 {
 mistake: "Розблокування лише для клієнта",
 explanation: "Експлойт.",
 correctApproach: "Серверний рей + відкриті двері",
 },
 {
 mistake: "Забули виключити character гравця",
 explanation: "Самоблокування.",
 correctApproach: "FilterDescendantsInstances",
 },
 {
 mistake: "Декоративна Part в траєкторії променів",
 explanation: "Завжди заблокований.",
 correctApproach: "Виключити або перемістити Part",
 },
 ],
 summary: "Ви реалізували фільтрацію RaycastParams, перевірки датчика від випромінювача до цілі за допомогою налагоджувальних променів і логіку розблокування головоломки на стороні сервера - готові для поєднання з дзеркалами в уроці лазерної головоломки.",
 practiceTask: {
 title: "Система сенсорних променів (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Ray clear = розблокувати крок.

### Part A - Налаштування (10 хв)
1. Емітер + TargetCrystal (тег PuzzleTarget)
2. RaycastParams виключає гравець/сміття
3. Налагодити візуал Beam

### Part B - Логіка (12 хв)
1. Функція Server checkBeam
2. Заблоковано → заблоковане повідомлення; очистити → активувати ціль
3. Усі мішені → проміжні двері відкриті (10.2)

### Part C - Зберегти (3 хв)
1. Розмістити стіну - перевірити блок; видалити - перевірити розблокування
2. **Зберегти в Roblox** →\`Lesson 10.3 - Raycasting\` 3. **Практика завершена**`,
 hints: [
 "Друк результату.Ім’я екземпляра, коли заблоковано",
 "Тег CollectionService для дійсних цілей",
 "Урок 10.4 поєднує дзеркала + багатоцільові дії",
 ],
 optionalChallenge: "Зелений промінь лише при правильному попаданні в ціль.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Raycast повертає нуль, коли...",
 options: [
 "Промінь нічого не влучив",
 "Гравець перемагає",
 "Лише Terrain",
 "UI відкривається",
 ],
 correctAnswer: 0,
 explanation: "Жодного удару.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "FilterDescendantsInstances...",
 options: [
 "Include або exclude Parts",
 "Видалити Terrain",
 "Зберегти DataStore",
 "Spawn NPC",
 ],
 correctAnswer: 0,
 explanation: "Променевий фільтр.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Напрямок повинен використовувати...",
 options: [
 "Одиничний вектор × відстань",
 "Випадково",
 "Ім'я гравця",
 "Robux",
 ],
 correctAnswer: 0,
 explanation: "Правильна довжина.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Розблокування головоломки на сервері запобігає...",
 options: [
 "Клієнтські експлойти",
 "Лаг",
 "Sound",
 "Welds",
 ],
 correctAnswer: 0,
 explanation: "Авторитет.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "результат. Instance є...",
 options: [
 "Перший влучений Part",
 "Лише гравець",
 "Sky",
 "Script",
 ],
 correctAnswer: 0,
 explanation: "Хітова Part.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Налагодження променя допомагає...",
 options: [
 "Бачити шлях променя",
 "Publish гру",
 "Видалити Humanoid",
 "Додати монети",
 ],
 correctAnswer: 0,
 explanation: "Візуальне налагодження.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 10.3 базується на...",
 options: [
 "Tween-и 10.2 для дверей",
 "Лише Module 3",
 "Порожньо",
 "Лише монети",
 ],
 correctAnswer: 0,
 explanation: "Анімація відкритих дверей.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 10.4 поєднує...",
 options: [
 "Промені + дзеркала + стан головоломки",
 "Лише inventory",
 "Лише shop",
 "Лише гонки",
 ],
 correctAnswer: 0,
 explanation: "Лазерна головоломка.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Теги CollectionService допомагають...",
 options: [
 "Визначити цілі головоломки",
 "Політ",
 "Плавання",
 "Лікування",
 ],
 correctAnswer: 0,
 explanation: "Дійсні цілі.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 10.3 зберегти назву...",
 options: [
 "Lesson 10.3 - Raycasting",
 "Tween Mastery",
 "Puzzle World",
 "Constraints",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson104 = {
 lessonId: "lesson-roblox-10-4",
 moduleId: "module-10",
 order: 4,
 title: "10.4 - Загадка з лазером",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть лазерні випромінювачі, дзеркала та три цільові вузли",
 "Відстежуйте стан головоломки в таблиці targetState сервера",
 "Обертайте дзеркала з усуненням стрибків і повторною перевіркою променів",
 "Відкрийте двері за допомогою анімації та звуку, коли всі цілі активні",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Об’єднайте **промені (10.3)** + **tweens (10.2)** у **багатоступеневу лазерну кімнату**.

**Хід уроку:**
1. **Теорія (40 хв)** - структура головоломки + таблиця стану
2. **Практика (~25 хв)** - 3 дзеркала, 3 мішені
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 10.3 - Рейкастинг**.`,
 },
 {
 title: "Структура лазерної головоломки",
 content: `Folder\`Workspace/PuzzleRoom/LaserPuzzle/\`:

| Шматок | Роль |
|-------|------|
| **Випромінювач_A** | Походження променів |
| **Дзеркало_1..3** | Перенаправити (обернути, щоб прицілитися) |
| **Ціль_A/B/C** | Тег\`PuzzleTarget\`|
| **DoorLocked** | Відкривається, коли все true |
| **PuzzleState** | Менеджер стану сервера |

Гравці мають побачити **причину → наслідок** за 10 секунд.`,
 },
 {
 title: "таблиця targetState",
 content: `\`Srv_PuzzleLaser\`Script:\`\`\`lua
local targetState = {
 A = false,
 B = false,
 C = false,
}

local function allActive()
 return targetState.A and targetState.B and targetState.C
end

local function tryOpenDoor()
 if not allActive() then return end
 -- Tween door from 10.2
 local door = workspace.PuzzleRoom.DoorLocked
 local TweenService = game:GetService("TweenService")
 local openCF = door.CFrame * CFrame.new(0, 0, 10)
 TweenService:Create(door, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {CFrame = openCF}):Play()
 -- Sound + StatusLabel "Puzzle Complete!"
end
\`\`\`**Сервер володіє** targetState - клієнт не може FireServer(true, true, true).`,
 },
 {
 title: "Поворот дзеркала",
 content: `Кожне дзеркало - **ClickDetector** або **ProximityPrompt** "Rotate":\`\`\`lua
local ROTATE_STEP = 45
local lastRotate = 0
local DEBOUNCE = 0.3

mirror.ClickDetector.MouseClick:Connect(function()
 if os.clock() - lastRotate < DEBOUNCE then return end
 lastRotate = os.clock()
 mirror.CFrame = mirror.CFrame * CFrame.Angles(0, math.rad(ROTATE_STEP), 0)
 recheckAllRays() -- server function
end)
\`\`\`**recheckAllRays** запускає променеву логіку з 10.3 для кожної пари емітер → ціль (зі спрощеним перенаправленням дзеркала: перевірте пряму лінію для уроку або один відскок).`,
 },
 {
 title: "Спрощена доріжка променя уроку",
 content: `**Версія для початківців:** кожне дзеркало включає **зв’язану ціль** під час обертання для корекції повороту (Anchored кути):\`\`\`lua
local correctAngles = {
 Mirror_1 = 90,
 Mirror_2 = 180,
 Mirror_3 = 0,
}

local function isAngleCorrect(mirror, correct)
 local _, y, _ = mirror.CFrame:ToEulerAnglesYXZ()
 local deg = math.deg(y) % 360
 return math.abs(deg - correct) < 10
end
\`\`\`**Додатково:** повна математика променів відбиття дзеркала (додаткове завдання).

Коли правильно →\`targetState.A = true\`+ світиться мішень **Neon зелений**.`,
 },
 {
 title: "Петля зворотного зв'язку",
 content: `Кожна цільова активація:
- **PointLight** увімкнено на кристалі
- **Звуковий** пінг
- Позначка **BillboardGui**
- **StatusLabel**\`Targets: 2/3\`При неправильному обертанні:
- Короткий червоний спалах на дзеркалі
- Жодного прогресу

**Кнопка скидання** (необов’язково): встановлює кути на 0 і стан false.`,
 },
 {
 title: "Антибайпас",
 content: `| Експлойт | Блок |
|---------|-------|
| Клієнт відкриває двері | Анімація дверей лише на сервері tryOpenDoor |
| Пропустити дзеркала | Для кожної цілі потрібен сервер true |
| Обертання спаму | Усунення стрибків 0,3 с |

**Без кута:** якщо застрягли 90-ті, покажіть білборд з підказками (завдання).`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] 3 цілі + обертання дзеркала змінює стан
- [ ] Усі 3 активні відкривають двері за допомогою анімації + звук
- [ ] Статус показує прогрес X/3
- [ ] Скидання працює для повтору
- [ ] Зберегти:\`Lesson 10.4 - Laser Puzzle\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Клієнт встановлює targetState true",
 explanation: "Обійти головоломку.",
 correctApproach: "Лише повторна перевірка сервера",
 },
 {
 mistake: "Відсутність усунення стрибків при обертанні",
 explanation: "Тремтіння спаму.",
 correctApproach: "Час відновлення 0,3 с",
 },
 {
 mistake: "Двері відкриваються на 2/3 мішеней",
 explanation: "Логічний баг.",
 correctApproach: "перевірка allActive().",
 },
 {
 mistake: "Немає відгуків про активацію",
 explanation: "Плутана головоломка.",
 correctApproach: "Світло + звук + лічильник",
 },
 ],
 summary: "Ви створили лазерну головоломку з трьома цілями з цільовим станом сервера, обертанням дзеркала з усуненням стрибків, перевіркою променів або кутів і нагородою за проміжні двері - гравці розуміють і вирішують багатоетапне завдання.",
 practiceTask: {
 title: "Лазерна кімната головоломок (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** 3 мішені → відкриті двері.

### Part A - Створення (10 хв)
1. Folder LaserPuzzle - випромінювач, 3 дзеркала, 3 мішені
2. targetState + серверний скрипт tryOpenDoor

### Part B - Взаємодія (12 хв)
1. Обернути дзеркала - перевірити повторно - оновити стан
2. Індикатори/звуки зворотного зв’язку + інтерфейс Targets X/3
3. Усі активні → дверна анімація

### Part C - Зберегти (3 хв)
1. Повне вирішення один раз; скинути та вирішити знову
2. **Зберегти в Roblox** →\`Lesson 10.4 - Laser Puzzle\` 3. **Практика завершена**`,
 hints: [
 "Почніть із рішення кутової фіксації перед справжнім відбиттям дзеркала",
 "Друк таблиці targetState під час налагодження",
 "Поєднайте 10,2 твін + 10,3 промінь в одній кімнаті",
 ],
 optionalChallenge: "Золоті/срібні/бронзові медалі за часом вирішення.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "targetState має жити...",
 options: [
 "Server",
 "Лише клієнт",
 "Lighting",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Авторитет.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "allActive() перевіряє...",
 options: [
 "Усі цілі true",
 "Одна ціль",
 "Ім'я гравця",
 "Robux",
 ],
 correctAnswer: 0,
 explanation: "Умова перемоги.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Усунення дребезгу дзеркал запобігає...",
 options: [
 "Спам rotation/jitter",
 "Ходьба",
 "Стрибок",
 "Shop",
 ],
 correctAnswer: 0,
 explanation: "Введіть спам.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Двері відкриваються за допомогою...",
 options: [
 "TweenService після головоломки",
 "Клієнтський чат",
 "Terrain",
 "Видалити",
 ],
 correctAnswer: 0,
 explanation: "Нагородний момент.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Відгук про ціль допомагає...",
 options: [
 "Гравці розуміють прогрес",
 "Лаг",
 "Зберегти дані",
 "NPC",
 ],
 correctAnswer: 0,
 explanation: "Чіткість UX.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Урок 10.4 використовує...",
 options: [
 "Промені та стан головоломки",
 "Лише inventory",
 "Лише монети",
 "Лише гонки",
 ],
 correctAnswer: 0,
 explanation: "Комбіновані системи.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Тег PuzzleTarget ідентифікує...",
 options: [
 "Валідні цілі кристалів",
 "Вороги",
 "Shops",
 "Машини",
 ],
 correctAnswer: 0,
 explanation: "Променеві цілі.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 10.5 додає...",
 options: [
 "Процедурні variants",
 "Лише діалог",
 "DataStore",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Випадкові макети.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Антибайпас означає...",
 options: [
 "Server перевіряє завершення",
 "Довіряти клієнту",
 "Без перевірок",
 "Пропустити головоломку",
 ],
 correctAnswer: 0,
 explanation: "Безпека.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 10.4 зберегти назву...",
 options: [
 "Lesson 10.4 - Laser Puzzle",
 "Raycasting",
 "Puzzle World",
 "Constraints",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson105 = {
 lessonId: "lesson-roblox-10-5",
 moduleId: "module-10",
 order: 5,
 title: "10.5 - Процедурні елементи",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Вибирайте варіанти кімнати-головоломки за допомогою math.random із підібраних шаблонів",
 "Зберігайте метадані варіантів для складності та часу вирішення",
 "Переконайтеся, що кожен варіант вирішується з достатніми труднощами",
 "Використовуйте випадкове засівання для повторюваних тестів Studio",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Процедурний** не означає хаотичний - це означає, що **різноманітні шаблони** гравці все ще можуть перемогти.

**Хід уроку:**
1. **Теорія (40 хв)** - шаблон + випадковий вибір
2. **Практика (~25 хв)** - 4 варіанти головоломки
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 10.4 - Лазерна головоломка**.`,
 },
 {
 title: "Процедурний проти випадкового безладу",
 content: `| Хороша процедурна | Поганий випадковий |
|-----------------|------------|
| 4 макети, створені вручну | Генерація чистого шуму |
| Такий же діапазон складності | Неможливі дзеркальні комбо |
| Зареєстрований ідентифікатор варіанта | Без тестування |

**Відтворюваність** без **виходу з люті**.`,
 },
 {
 title: "Таблиця варіантів",
 content: `\`Modules/PuzzleVariants\`ModuleScript:\`\`\`lua
local PuzzleVariants = {
 {
 id = "layout_alpha",
 difficulty = 1,
 estimatedMinutes = 3,
 mirrorAngles = {90, 180, 0},
 },
 {
 id = "layout_beta",
 difficulty = 2,
 estimatedMinutes = 4,
 mirrorAngles = {45, 135, 270},
 },
 {
 id = "layout_gamma",
 difficulty = 2,
 estimatedMinutes = 5,
 mirrorAngles = {0, 90, 180},
 },
 {
 id = "layout_delta",
 difficulty = 3,
 estimatedMinutes = 6,
 mirrorAngles = {135, 225, 315},
 },
}

return PuzzleVariants
\`\`\``,
 },
 {
 title: "Варіант вибору та спауну",
 content: `\`Srv_PuzzleRound\`Script на початку раунду:\`\`\`lua
local PuzzleVariants = require(game.ServerScriptService.Modules.PuzzleVariants)

local function pickVariant()
 local index = math.random(1, #PuzzleVariants)
 return PuzzleVariants[index]
end

local function applyVariant(variant)
 print("[Puzzle] Spawning", variant.id, "difficulty", variant.difficulty)
 -- Reset targetState
 -- Set mirror correct angles from variant.mirrorAngles
 -- Update UI VariantLabel.Text = variant.id
end

local variant = pickVariant()
applyVariant(variant)
\`\`\`**Записуйте ідентифікатор варіанта** кожного раунду для балансування.`,
 },
 {
 title: "Зважений випадковий (необов'язково)",
 content: `\`\`\`lua
local function pickWeighted()
 local roll = math.random()
 if roll < 0.1 then
 return PuzzleVariants[4] -- legendary hard, 10%
 end
 return PuzzleVariants[math.random(1, 3)]
end
\`\`\`**Правило справедливості:** перевірте кожен варіант 5 разів - усі можна виконати.`,
 },
 {
 title: "Висів довільний для тестування",
 content: `\`\`\`lua
local TEST_MODE = false
local TEST_SEED = 12345

if TEST_MODE then
 math.randomseed(TEST_SEED)
end
\`\`\`Те саме початкове значення → така ж послідовність варіантів у Studio - відтворення помилок.

**Ніколи** не пускайте в опубліковану живу гру з даних клієнта (передбачувані експлойти) - лише вибір сервера.`,
 },
 {
 title: "Круглий потік скидання",
 content: `Після відкриття дверей:
1. Зачекайте 5 секунд святкування
2. **Скинути** дзеркала, targetState, положення дверей
3.\`pickVariant()\`знову
4. Оголосити\`New challenge: layout_beta\`Підключається до майбутніх ігор **на основі раундів** (Модуль 11+).`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] 4 варіанти в модулі, усі перевірені розв’язні
- [ ] Початок раунду вибирає випадковий варіант
- [ ] VariantLabel показує поточний ідентифікатор макета
- [ ] Скидання + новий варіант після перемоги працює
- [ ] Зберегти:\`Lesson 10.5 - Procedural Elements\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Повністю випадкові кути",
 explanation: "Нерозв'язні головоломки.",
 correctApproach: "Підібрані кути дзеркала для кожного варіанту",
 },
 {
 mistake: "Немає варіантів реєстрації",
 explanation: "Не може збалансувати.",
 correctApproach: "Друкуйте ідентифікатор кожного раунду",
 },
 {
 mistake: "Лише один макет",
 explanation: "Не процедурна мета уроку.",
 correctApproach: "Мінімум 4 шаблони",
 },
 {
 mistake: "Варіант на вибір клієнта",
 explanation: "Зібрати вишню легко.",
 correctApproach: "Сервер pickVariant",
 },
 ],
 summary: "Ви додали підібрані варіанти головоломок, вибрані за допомогою math.random, метадані для рівня складності, необов’язкові зважені вибірки та цикл скидання раундів - тепер лазерна кімната змінюється між іграми, залишаючись справедливою.",
 practiceTask: {
 title: "Варіанти процедурних головоломок (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** 4 схеми, випадкові в кожному раунді.

### Part A - Модуль варіантів (10 хв)
1. Варіанти головоломки з 4 записами + дзеркальні кути
2. Playtest кожен - все вирішується

### Part B - Менеджер раунду (12 хв)
1. pickVariant + applyVariant на початку
2. Після перемоги → скинути → новий варіант
3. VariantLabel UI

### Part C - Зберегти (3 хв)
1. Зіграйте 4 раунди - побачите різні ідентифікатори у вихідних даних
2. **Зберегти в Roblox** →\`Lesson 10.5 - Procedural Elements\` 3. **Практика завершена**`,
 hints: [
 "TEST_SEED для повторного налагодження",
 "EstimatedMinutes допомагає вчителям балансувати",
 "Легендарний варіант 10% за бажанням",
 ],
 optionalChallenge: "Зважений випадковий - лише layout_delta 10%.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Добре процедурне використання...",
 options: [
 "Куровані шаблони",
 "Чистий хаос",
 "Без тестування",
 "Лише клієнт",
 ],
 correctAnswer: 0,
 explanation: "Контрольований сорт.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "math.random picks...",
 options: [
 "Індекс variant",
 "HP гравця",
 "Terrain",
 "Sky",
 ],
 correctAnswer: 0,
 explanation: "Вибір макета.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Журналування ідентифікаторів варіантів допомагає...",
 options: [
 "Баланс складності",
 "Видалення збережень",
 "Бан",
 "Publishing",
 ],
 correctAnswer: 0,
 explanation: "Проектні дані.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Сервер вибирає варіант, щоб запобігти...",
 options: [
 "Клієнт обирає легке",
 "Лаг",
 "Sound",
 "UI",
 ],
 correctAnswer: 0,
 explanation: "Чесний вибір.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "випадкове насіння в TEST_MODE...",
 options: [
 "Відтворювані debug-прогони",
 "Live експлойти",
 "Видаляє головоломки",
 "Видаляє UI",
 ],
 correctAnswer: 0,
 explanation: "Студійне тестування.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Кожен варіант має бути...",
 options: [
 "Вирішувано й протестовано",
 "Неможливо",
 "Невидимий",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Правило справедливості.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 10.5 базується на...",
 options: [
 "Лазерна кімната 10.4",
 "Лише Module 1",
 "Лише shop",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Та сама основа головоломки.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 10.6 - це...",
 options: [
 "Puzzle World checkpoint",
 "Лише RPG",
 "Лише гонки",
 "Лише NPC",
 ],
 correctAnswer: 0,
 explanation: "Фінал модуля.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "поле складності у варіанті...",
 options: [
 "Допомагає балансу й підписам",
 "Потрібно Roblox",
 "Замінює Humanoid",
 "Відкриває shop",
 ],
 correctAnswer: 0,
 explanation: "Метадані.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 10.5 зберегти назву...",
 options: [
 "Lesson 10.5 - Procedural Elements",
 "Laser Puzzle",
 "Puzzle World",
 "Tween Mastery",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson106 = {
 lessonId: "lesson-roblox-10-6",
 moduleId: "module-10",
 order: 6,
 title: "10.6 - Checkpoint: Puzzle World",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Здайте Puzzle World з Constraints, анімаціями, променями та процедурними варіантами",
 "Пройдіть п'ять ігрових тестів з чіткими підказками та без тупикових ситуацій",
 "Організуйте ресурси головоломки в чистій структурі папок",
 "Збережіть портфоліо Module 10 за допомогою 60-секундної демонстрації",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Puzzle World** = Модуль 10 портфоліо - доводить, що ви поєднуєте **фізику, досконалість, логіку та різноманітність**.

**Необхідні інгредієнти:**
- Механік обмеження (двері або платформа)
- Розкриття/взаємодія Tween
- Raycast або лазерна цільова логіка
- Процедурний варіант на раундовому старті

**Зберегти:**\`Module 10 - Puzzle World\``,
 },
 {
 title: "Світ макет план",
 content: `\`\`\`
Workspace/PuzzleWorld/
├── Mechanics/ (hinge door, rope platform)
├── PuzzleRoom/
│ ├── LaserPuzzle/
│ └── DoorReward/
├── RoundSpawn
└── Signs/ (tutorial arrows)

ServerScriptService/
├── Modules/PuzzleVariants.lua
├── Srv_PuzzleLaser.lua
├── Srv_PuzzleRound.lua
└── Srv_Mechanics.lua

StarterGui/
├── PuzzleUI (variant, targets X/3, status)
└── HintUI (optional)
\`\`\``,
 },
 {
 title: "Подорож гравця (золотий шлях)",
 content: `| Крок | Досвід |
|------|------------|
| 1 | Спаун → знак пояснює мету |
| 2 | Додатково: поперечна мотузка / демонстрація відкритого шарніра |
| 3 | Увійти в лазерну кімнату - оголошено варіант |
| 4 | Розв’яжіть 3 мішені - відгук на кожну |
| 5 | Tween дверей відкрив двері - святкування SFX |
| 6 | Новий тур - інший варіант |

**Загальний час: ** 5-8 хвилин перша спроба.`,
 },
 {
 title: "П'ять протоколів тестування",
 content: `Попросіть тестувальника (або себе) зіграти в **5 забігів**:

| Запустити | Зверніть увагу на проблему? | Ідентифікатор варіанта | Час |
|-----|------------------|------------|------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

**Виправте** 2 найпоширеніші проблеми перед збереженням.

**Без тупиків:** завжди шлях скидання або підказки.`,
 },
 {
 title: "Контрольний список полірування",
 content: `| # | Пункт | Пройти |
|---|------|------|
| 1 | Підказки, які можна прочитати з spawn | |
| 2 | Constraints не надто повільно/швидко | |
| 3 | Промені/цілі надійні 10/10 спроб | |
| 4 | Усі 4 варіанти можна виконати | |
| 5 | Немає помилок виводу в золотому шляху | |
| 6 | Очистити імена папок | |
| 7 | 2 гравці: стан головоломки не залежить від гравця (необов’язковий кооператив: спільний стан допустимо, якщо документально) | |`,
 },
 {
 title: "60-секундна демонстрація + попередній перегляд модуля 11",
 content: `**Демонстраційний Script:**
1. Показати Folder Mechanics - швидкий шарнір
2. Введіть головоломку - прочитайте позначку варіанта
3. Вирішіть одну ціль - світло + звук
4. Повний пазл - дверний аніматор
5. Новий раунд - новий варіант назви

**Модуль 11 - Продуктивність і полірування:** Очищення Explorer, профілювання, підготовка до публікації.

**Перед тренуванням:**
- [ ] Виконано п'ять ігрових тестів
- [ ] Контрольний список полірування 7/7
- [ ] **Зберегти в Roblox** →\`Module 10 - Puzzle World\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Відсутній один обов’язковий інгредієнт",
 explanation: "Контрольна точка не завершена.",
 correctApproach: "Обмеження + анімація + промінь + процедурний",
 },
 {
 mistake: "Без тестування ігор",
 explanation: "Плутанина з StreamingEnabled.",
 correctApproach: "5-прохідний протокол",
 },
 {
 mistake: "Безладний дослідник",
 explanation: "Важко підтримувати.",
 correctApproach: "Структура папок PuzzleWorld",
 },
 {
 mistake: "Невирішуваний процесуальний варіант",
 explanation: "Погані відгуки.",
 correctApproach: "Перевірте всі 4 варіанти",
 },
 ],
 summary: "Ви інтегрували обмеження, Constraints, лазерні головоломки та процедурні раунди в Puzzle World, пройшли ігровий тест і перевірку якості, а також зберегли контрольну точку, готову для демоверсії - Модуль 10 завершено.",
 practiceTask: {
 title: "Здайте Puzzle World (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** Контрольна точка портфоліо.

### Part A - Інтеграція (15 хв)
1. Об’єднайте 10.1-10.5 у PuzzleWorld
2. Один золотий шлях позначено
3. PuzzleUI завершено

### Part B - Ігрові тести (20 хв)
1. П'ять прогонів - реєстрація застряглих точок - виправлення вершини 2
2. Контрольний список полірування всі проходять

### Part C - Збереження демо (5 хв)
1. Відрепетировано демо 60-х
2. **Зберегти в Roblox** →\`Module 10 - Puzzle World\` 3. **Практика завершена**

**Далі:**\`10.7 - Проєкт: Лабіринт загадок\`об'єднує ці кімнати у трьохкімнатний лабіринт із двома шарами процедурності.`,
hints: [
"Налаштуйте час анімації після тесту відтворення 3",
"Підказка після 90-х застрягла необов'язково",
"Надійність порівняно з додатковими типами головоломок",
],
 optionalChallenge: "Адаптивна система підказок через 90 секунд.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Puzzle World має включати...",
 options: [
 "Constraint + tween + ray + procedural",
 "Лише Terrain",
 "Лише shop",
 "Без скриптів",
 ],
 correctAnswer: 0,
 explanation: "Чотири інгредієнти.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "П'ять ігрових тестів знаходять...",
 options: [
 "Де гравці застрягають",
 "Robux",
 "Ключі DataStore",
 "Version",
 ],
 correctAnswer: 0,
 explanation: "Перевірка UX.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Модуль 10 зберегти назву...",
 options: [
 "Module 10 - Puzzle World",
 "RPG Inventory",
 "Living Location",
 "Lesson 10.1",
 ],
 correctAnswer: 0,
 explanation: "checkpoint.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Процедурний раунд після перемоги...",
 options: [
 "Обирає новий variant",
 "Видаляє гравця",
 "Зупиняє server",
 "Публікує",
 ],
 correctAnswer: 0,
 explanation: "Цикл повторення.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Жодних безвихідних ситуацій означає...",
 options: [
 "У гравців завжди є шлях уперед",
 "Без головоломок",
 "Зона смерті",
 "Порожня мапа",
 ],
 correctAnswer: 0,
 explanation: "Чесний дизайн.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Урок 10.6 завершується...",
 options: [
 "Module 10 Magic of Details",
 "Module 12",
 "Module 1",
 "Лише монети",
 ],
 correctAnswer: 0,
 explanation: "Кінцевий модуль 10.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Чисті Folders допомагають...",
 options: [
 "Підтримка командою",
 "Лише лаг",
 "Видалити UI",
 "Бан",
 ],
 correctAnswer: 0,
 explanation: "організація.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Нагорода за двері використовує...",
 options: [
 "Tween з 10.2",
 "Лише чат",
 "Terrain",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Момент полірування.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Попередній перегляд модуля 11...",
 options: [
 "Performance and Polish",
 "Лише NPC",
 "Лише гонки",
 "Нічого",
 ],
 correctAnswer: 0,
 explanation: "Наступний модуль.",
 },
{
id: "q10",
type: "multiple_choice",
question: "Контрольна точка має пріоритет...",
options: [
"Цілісний шлях гравця",
"Максимум скриптів",
"Без тестування",
"Лише випадково",
],
correctAnswer: 0,
explanation: "Відчуйте якість.",
},
],
},
}

export const ukLesson107 = {
lessonId: "lesson-roblox-10-7",
moduleId: "module-10",
order: 7,
title: "10.7 - Проєкт: Лабіринт загадок",
theoryMinutes: 40,
quizMinutes: 10,
estimatedTime: 50,
learningObjectives: [
"Спроєктуйте лабіринт із трьох кімнат, що поєднує обмеження, промені та tweens",
"Додайте два нові процедурні елементи понад PuzzleVariants з 10.5",
"Пов'яжіть прогрес між кімнатами через єдину таблицю стану лабіринту",
"Задокументуйте карту лабіринту та шлях гравця",
],
theory: {
sections: [
{
title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
content: `**Проєктний день** - об'єднайте **обмеження (10.1)**, **tweens (10.2)**, **промені (10.3-10.4)** та **процедурні варіанти (10.5)** в один **Лабіринт загадок** із трьома кімнатами.

**Хід уроку:**
1. **Теорія (40 хв)** - дизайн лабіринту + mazeState
2. **Практика (~25 хв)** - 3 кімнати + 2 нові процедурні елементи
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 10.6 - Checkpoint: Puzzle World**.`,
},
{
title: "Проєктний день ≠ новий API",
content: `Жодної нової команди Roblox - лише **комбінація**:

| Урок | Що взяти в лабіринт |
|------|----------------------|
| 10.1 | Двері на петлі (Constraints) |
| 10.2 | Tween відкриття дверей/панелей |
| 10.3-10.4 | Лазерна головоломка з цілями |
| 10.5 | PuzzleVariants на кожен раунд |

**Мета:** три кімнати підряд, кожна замкнена, доки не пройдена попередня.`,
},
{
title: "Карта лабіринту",
content: `\`\`\`
Workspace/MazeOfRiddles/
├── Room1_Hinge/ (дверна петля з 10.1)
├── Room2_Rope/ (мотузкова платформа з 10.1 як розрив)
├── Room3_Laser/ (лазерна головоломка з 10.3-10.4)
├── GateDoors/ (Tween-двері між кімнатами, 10.2)
└── MazeState (менеджер сервера)
\`\`\`Кожна **GateDoor** зачинена, доки\`mazeState.roomX = true\`.`,
},
{
title: "Таблиця mazeState",
content: `\`\`\`lua
local mazeState = {
 room1 = false,
 room2 = false,
 room3 = false,
}

local function onRoomComplete(roomKey, gateDoor)
 mazeState[roomKey] = true
 local TweenService = game:GetService("TweenService")
 local openCF = gateDoor.CFrame * CFrame.new(0, 0, 8)
 TweenService:Create(gateDoor, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {CFrame = openCF}):Play()
end
\`\`\`**Один сервер-скрипт** володіє\`mazeState\`- жодна кімната не змінює прогрес іншої напряму.`,
},
{
title: "Процедурний елемент 1 - порядок кімнат",
content: `Замість фіксованого 1→2→3, виберіть **порядок** із підібраних варіантів:\`\`\`lua
local ROOM_ORDERS = {
 {"room1", "room2", "room3"},
 {"room2", "room1", "room3"},
 {"room1", "room3", "room2"},
}

local function pickOrder()
 return ROOM_ORDERS[math.random(1, #ROOM_ORDERS)]
end
\`\`\`**Кожен порядок** перевірений вручну - лабіринт завжди вирішуваний, лише **шлях** відрізняється.`,
},
{
title: "Процедурний елемент 2 - варіанти всередині кімнати",
content: `Room3 (лазер) повторно використовує\`PuzzleVariants\`з 10.5 - **другий шар випадковості**:\`\`\`lua
local PuzzleVariants = require(game.ServerScriptService.Modules.PuzzleVariants)

local function setupRoom3()
 local variant = PuzzleVariants[math.random(1, #PuzzleVariants)]
 applyVariant(variant) -- from 10.5
end
\`\`\`**Два шари процедурності** (порядок кімнат + варіант лазера) - лабіринт відчувається новим кожного разу, залишаючись справедливим.`,
},
{
title: "З'єднання систем у ланцюжок",
content: `\`\`\`lua
local function startMaze()
 local order = pickOrder()
 for _, roomKey in ipairs(order) do
 lockGate(roomKey) -- close all gates first
 end
 openRoom(order[1]) -- unlock only first room in chosen order
end
\`\`\`Коли гравець завершує кімнату →\`onRoomComplete\`→ tween-двері → **наступна** кімната в списку\`order\`розблоковується (не завжди "room2").`,
},
{
title: "Антибайпас через кімнати",
content: `| Ризик | Захист |
|-------|--------|
| Клієнт telefrag/noclip у room3 без room1/2 | Сервер перевіряє\`mazeState\`перед відкриттям нагороди |
| Пропуск дверей через експлойт руху | GateDoor Anchored, доки\`mazeState[roomKey]\`false |
| Спам завершення кімнати | Той самий debounce-підхід з 9.8 |

**Сервер - єдине джерело правди** для всього лабіринту, як і для одної кімнати в 10.4.`,
},
{
title: "Playtest лабіринту",
content: `| # | Перевірка | Очікування |
|---|-----------|-----------|
| 1 | Повний забіг новим порядком | 5-10 хвилин, вирішується |
| 2 | Спробувати ввійти в замкнену кімнату | Заблоковано |
| 3 | Перезапуск - новий порядок і новий варіант лазера | Відчувається інакше |
| 4 | mazeState видно лише на сервері | Немає клієнтського обходу |`,
},
{
title: "Контрольний список перед початком практики",
content: `- [ ] 3 кімнати з'єднані GateDoors (tween)
- [ ] mazeState на сервері блокує/розблоковує послідовно
- [ ] Порядок кімнат випадковий (мін. 3 варіанти)
- [ ] Лазерна кімната використовує PuzzleVariants з 10.5
- [ ] Зберегти:\`Lesson 10.7 - Maze of Riddles\``,
},
],
},
commonMistakes: [
{
mistake: "mazeState клієнта",
explanation: "Обхід лабіринту.",
correctApproach: "Сервер mazeState",
},
{
mistake: "Один фіксований порядок кімнат",
explanation: "Не процедурний проєкт.",
correctApproach: "pickOrder() з 3+ варіантів",
},
{
mistake: "GateDoor unanchored з самого початку",
explanation: "Гравець проходить без перевірки.",
correctApproach: "Anchored доки стан true",
},
{
mistake: "Room3 завжди той самий варіант лазера",
explanation: "Втрата різноманіття 10.5.",
correctApproach: "Викликати PuzzleVariants на старті",
},
],
summary: "Ви об'єднали двері на обмеженнях, tween-ворота, лазерну головоломку та два шари процедурності (порядок кімнат + варіант лазера) в один Лабіринт загадок із сервером, що володіє прогресом - довели, що можете комбінувати весь інструментарій Модуля 10.",
practiceTask: {
title: "Лабіринт загадок (~25 хв)",
difficulty: "beginner",
description: `**Мета:** 3 кімнати, випадковий порядок, лазер з варіантом.

### Part A - Кімнати (12 хв)
1. Room1 (hinge), Room2 (rope), Room3 (laser) - GateDoors між ними
2. mazeState на сервері

### Part B - Процедурність (10 хв)
1. pickOrder() з 3 варіантів порядку
2. Room3 бере варіант із PuzzleVariants (10.5)

### Part C - Зберегти (3 хв)
1. Забіг двічі - різний порядок і варіант лазера
2. **Зберегти в Roblox** →\`Lesson 10.7 - Maze of Riddles\` 3. **Практика завершена**`,
hints: [
"Почніть із фіксованого порядку, потім додайте pickOrder()",
"GateDoor = та ж tween-логіка з 10.2, лише з умовою mazeState",
"Друкуйте order у виводі для налагодження",
],
optionalChallenge: "4-та кімната бонус за швидкий забіг (<5 хв).",
},
quiz: {
passingScore: 70,
timeLimit: 10,
questions: [
{
id: "q1",
type: MC,
question: "mazeState має жити...",
options: [
"На сервері",
"На клієнті",
"У чаті",
"У Terrain",
],
correctAnswer: 0,
explanation: "Авторитет.",
},
{
id: "q2",
type: MC,
question: "pickOrder() додає...",
options: [
"Процедурний порядок кімнат",
"Випадкову зброю",
"Terrain",
"Publish",
],
correctAnswer: 0,
explanation: "Перший шар процедурності.",
},
{
id: "q3",
type: MC,
question: "Room3 лазер повторно використовує...",
options: [
"PuzzleVariants з 10.5",
"Нову систему",
"Лише Terrain",
"DataStore",
],
correctAnswer: 0,
explanation: "Другий шар процедурності.",
},
{
id: "q4",
type: MC,
question: "GateDoor лишається замкненою, доки...",
options: [
"mazeState[roomKey] не true",
"Гравець клікає будь-де",
"Сервер вимкнено",
"Завжди",
],
correctAnswer: 0,
explanation: "Послідовне розблокування.",
},
{
id: "q5",
type: MC,
question: "Два шари процедурності означають...",
options: [
"Порядок + варіант лазера",
"Лише один варіант",
"Без випадковості",
"Тільки колір",
],
correctAnswer: 0,
explanation: "Комбінована різноманітність.",
},
{
id: "q6",
type: MC,
question: "Проєкт 10.7 базується на...",
options: [
"10.1-10.5 без нового API",
"Лише Module 1",
"Модулі 9",
"Порожньо",
],
correctAnswer: 0,
explanation: "Комбінування навичок.",
},
{
id: "q7",
type: MC,
question: "Антибайпас лабіринту схожий на...",
options: [
"10.4 серверну перевірку цілей",
"Клієнтський чат",
"Нічого",
"Publish",
],
correctAnswer: 0,
explanation: "Той самий принцип авторитету.",
},
{
id: "q8",
type: MC,
question: "Урок 10.8 додає...",
options: [
"Підказки і баланс складності",
"Лише Explorer",
"Sound",
"Гонки",
],
correctAnswer: 0,
explanation: "Наступний урок.",
},
{
id: "q9",
type: MC,
question: "Урок 10.7 зберегти назву...",
options: [
"Lesson 10.7 - Maze of Riddles",
"Puzzle World",
"Laser Puzzle",
"Tween Mastery",
],
correctAnswer: 0,
explanation: "Зберегти урок.",
},
],
},
}

export const ukLesson108 = {
lessonId: "lesson-roblox-10-8",
moduleId: "module-10",
order: 8,
title: "10.8 - Puzzle World: підказки і баланс",
theoryMinutes: 40,
quizMinutes: 10,
estimatedTime: 50,
learningObjectives: [
"Додайте просту систему підказок після таймауту застрягання",
"Побудуйте криву складності через впорядкування варіантів за раундом",
"Застосуйте fail-forward дизайн замість жорстких відмов",
"Playtest баланс і задокументуйте виправлення",
],
theory: {
sections: [
{
title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
content: `**Складна головоломка без допомоги = гравці йдуть.** Сьогодні додайте **м'які підказки** та переконайтесь, що складність **росте поступово**.

**Хід уроку:**
1. **Теорія (40 хв)** - підказки + крива складності + fail-forward
2. **Практика (~25 хв)** - HintUI + впорядкування складності
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 10.7 - Лабіринт загадок**.`,
},
{
title: "Підказки - це дизайн, не читерство",
content: `| Без підказок | З підказками |
|---------------|----------------|
| Гравець застряг 5 хв → вийшов | Гравець отримує м'яку допомогу → продовжує |
| "Я тупий" фрустрація | "А, ось воно!" задоволення |

**Ціль:** підказка з'являється **лише** коли реально потрібна - не спойлер із самого початку.`,
},
{
title: "Таймер застрягання",
content: `\`\`\`lua
local STUCK_THRESHOLD = 90 -- seconds without progress

local lastProgressTime = os.clock()

local function onProgress()
 lastProgressTime = os.clock()
 HintUI.Hide:FireClient(player)
end

task.spawn(function()
 while true do
 task.wait(5)
 if os.clock() - lastProgressTime > STUCK_THRESHOLD then
 HintUI.Show:FireClient(player, currentHintText())
 end
 end
end)
\`\`\`**90 секунд** - досить довго для чесної спроби, недостатньо для довгої фрустрації.`,
},
{
title: "Рівні підказок",
content: `| Рівень | Через | Текст |
|--------|------|-------|
| **Легкий** | 90 с | "Спробуй обернути найближче дзеркало." |
| **Прямий** | 180 с | "Дзеркало_1 потребує 90°." |
| **Розв'язок** | 300 с | Підсвітити правильний Part (Highlight) |

Прогресивні підказки **не видають** одразу все - вони **направляють**, не розв'язують за гравця (окрім останнього рівня).`,
},
{
title: "Крива складності",
content: `Використайте поле\`difficulty\`з\`PuzzleVariants\`(10.5), щоб **впорядкувати**, а не лише випадково вибирати:\`\`\`lua
local function pickByDifficultyCurve(roundNumber)
 if roundNumber <= 2 then
 return pickVariantWithDifficulty(1) -- easy first
 elseif roundNumber <= 4 then
 return pickVariantWithDifficulty(2)
 else
 return pickVariantWithDifficulty(3) -- hard later
 end
end
\`\`\`**Крива**: легко → середньо → важко - не випадковий важкий варіант у раунді 1.`,
},
{
title: "Fail-forward замість жорсткої відмови",
content: `| Жорстка відмова | Fail-forward |
|-------------------|----------------|
| Неправильний кут - миттєвий рестарт усього лабіринту | Неправильний кут - лише **ця ціль** скидається |
| Втрата всього прогресу кімнати | Прогрес попередніх цілей **зберігається** |
| "Game Over" екран | "Спробуй ще!" + м'яка підказка через таймер |\`\`\`lua
local function onWrongAngle(mirror)
 -- Do NOT reset targetState.A/B/C - only flash red on this mirror
 flashRed(mirror)
end
\`\`\`**Fail-forward** = помилки коштують **часу**, а не **прогресу**.`,
},
{
title: "Коли підказки вимикати",
content: `- Скинути таймер **onProgress()** щоразу коли ціль стає true
- Приховати HintUI, коли головоломка вирішена
- **Не** показувати рівень 3 (розв'язок) під час перших 2 хвилин навіть при активному спамі кліків

**Необов'язково:** кнопка "Показати підказку" вручну для нетерплячих гравців (з невеликим штрафом чи без).`,
},
{
title: "Playtest балансу",
content: `| # | Тест | Записати |
|---|------|----------|
| 1 | Час вирішення варіанта difficulty=1 | секунди |
| 2 | Час вирішення варіанта difficulty=3 | секунди |
| 3 | Скільки тестерів побачили підказку рівня 1 | % |
| 4 | Хтось здався до підказки? | так/ні |

Якщо **важкий** варіант вирішується **швидше** за легкий - крива складності неправильна, поверніться до 10.5 позначок.`,
},
{
title: "Контрольний список перед початком практики",
content: `- [ ] HintUI показує 2+ рівні підказок за таймером
- [ ] Крива складності: легко → важко за номером раунду
- [ ] Неправильна дія не скидає весь прогрес (fail-forward)
- [ ] Playtest підтверджує зростання часу з difficulty
- [ ] Зберегти:\`Lesson 10.8 - Puzzle Balance\``,
},
],
},
commonMistakes: [
{
mistake: "Підказка з'являється відразу",
explanation: "Спойлер, нуль викликів.",
correctApproach: "Таймер 90+ секунд",
},
{
mistake: "Помилка скидає весь прогрес кімнати",
explanation: "Фрустрація, гравці йдуть.",
correctApproach: "Fail-forward - скидати лише неправильну дію",
},
{
mistake: "Випадковий важкий варіант у раунді 1",
explanation: "Погана крива складності.",
correctApproach: "pickByDifficultyCurve(roundNumber)",
},
{
mistake: "Підказка видає повне рішення на рівні 1",
explanation: "Занадто легко, нуль навчання.",
correctApproach: "Прогресивні рівні - лише останній повний",
},
],
summary: "Ви додали систему підказок за таймером застрягання, впорядкували складність варіантів за номером раунду і застосували fail-forward дизайн замість жорстких відмов - Puzzle World тепер справедливий і для новачків, і для впевнених гравців.",
practiceTask: {
title: "Підказки і баланс складності (~25 хв)",
difficulty: "beginner",
description: `**Мета:** М'які підказки + правильна крива складності.

### Part A - Підказки (12 хв)
1. Таймер застрягання 90 с
2. HintUI з 2 рівнями тексту

### Part B - Баланс (10 хв)
1. pickByDifficultyCurve(roundNumber)
2. Fail-forward: неправильна дія не скидає весь прогрес

### Part C - Playtest (3 хв)
1. Записати час вирішення для 2 рівнів складності
2. **Зберегти в Roblox** →\`Lesson 10.8 - Puzzle Balance\` 3. **Практика завершена**`,
hints: [
"os.clock() простий спосіб рахувати час без застрягання гри",
"Скидайте таймер підказки при кожному прогресі, не лише на старті",
"Записуйте час вирішення в Output для порівняння варіантів",
],
optionalChallenge: "Кнопка підказки вручну зі штрафом -1 очко швидкості.",
},
quiz: {
passingScore: 70,
timeLimit: 10,
questions: [
{
id: "q1",
type: MC,
question: "Підказка рівня 1 з'являється через...",
options: [
"~90 секунд застрягання",
"Одразу",
"Ніколи",
"5 годин",
],
correctAnswer: 0,
explanation: "Таймер застрягання.",
},
{
id: "q2",
type: MC,
question: "Fail-forward означає...",
options: [
"Помилка коштує часу, не прогресу",
"Миттєвий рестарт",
"Game Over",
"Видалення інвентарю",
],
correctAnswer: 0,
explanation: "М'яка невдача.",
},
{
id: "q3",
type: MC,
question: "Крива складності впорядковує...",
options: [
"Варіанти від легких до важких за раундом",
"Випадково завжди",
"Лише важкі",
"Кольори UI",
],
correctAnswer: 0,
explanation: "Прогресія.",
},
{
id: "q4",
type: MC,
question: "Скидання таймера підказки відбувається при...",
options: [
"Кожному прогресі гравця",
"Кожній секунді",
"Ніколи",
"Публікації",
],
correctAnswer: 0,
explanation: "Відстеження активності.",
},
{
id: "q5",
type: MC,
question: "Розв'язок-підказка (рівень 3) з'являється...",
options: [
"Після найдовшого очікування",
"Одразу",
"Ніколи",
"Випадково",
],
correctAnswer: 0,
explanation: "Крайній рівень допомоги.",
},
{
id: "q6",
type: MC,
question: "Погана крива складності означає...",
options: [
"Важкий варіант вирішується швидше легкого",
"Час зростає з difficulty",
"Гравці задоволені",
"Немає підказок",
],
correctAnswer: 0,
explanation: "Ознака помилки балансу.",
},
{
id: "q7",
type: MC,
question: "Урок 10.8 базується на...",
options: [
"Лабіринті 10.7 і PuzzleVariants 10.5",
"Лише Module 1",
"Порожньо",
"Publish",
],
correctAnswer: 0,
explanation: "Продовження систем.",
},
{
id: "q8",
type: MC,
question: "Урок 10.8 завершує...",
options: [
"Проєктну пару 10.7/10.8 Модуля 10",
"Модуль 12",
"Модуль 1",
"Нічого",
],
correctAnswer: 0,
explanation: "Фінал розширення модуля.",
},
{
id: "q9",
type: MC,
question: "Урок 10.8 зберегти назву...",
options: [
"Lesson 10.8 - Puzzle Balance",
"Maze of Riddles",
"Laser Puzzle",
"Tween Mastery",
],
correctAnswer: 0,
explanation: "Зберегти урок.",
},
],
},
}
