/** Rich UK content for Roblox Module 11 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson111 = {
 lessonId: "lesson-roblox-11-1",
 moduleId: "module-11",
 order: 1,
 title: "11.1 - Чистий Explorer",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Застосуйте префікси імен для NPC, FX, UI, SFX і Scripts",
 "Упорядкуйте Folders: ReplicatedStorage, ServerScriptService та StarterGui",
 "Рефакторинг неоднозначних імен Parts/Scripts під час спринту очищення",
 "Задокументуйте примітку про стиль команди для узгодженої ієрархії",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Модуль 11 - Полірування та продуктивність** - якість релізу: організація, завантаження, звук, FPS, UX.

**Хід уроку:**
1. **Теорія (40 хв)** - Стандарти Explorer
2. **Практика (~25 хв)** - очисний спринт у вашому найкращому місці
3. **Вікторина (10 хв)** - проходження **70%**

Використовуйте **Модуль 10 - Puzzle World** або свій найбільший файл місця.`,
 },
 {
 title: "Чистий Explorer = швидша доставка",
 content: `Безладна ієрархія коштує годин:

| Погано | Добре |
|-----|------|
|\`Part\`|\`Road_Straight_32\`|
|\`Script\`|\`Srv_QuestService\`|
|\`Frame\`|\`UI_ShopPanel\`|
|\`Model\`|\`NPC_Guide_Maya\`|

Ви виправляєте помилки **там, де ви очікуєте** речі.`,
 },
 {
 title: "Префікси іменування",
 content: `| Префікс | Використовуйте |
|--------|-----|
|\`NPC_\`| Characterі |
|\`FX_\`| Частинки, пучки |
|\`UI_\`| Елементи ScreenGui |
|\`SFX_\`| Звукові екземпляри у світі |
|\`Env_\`| Реквізит карти, дерева, скелі |
|\`Srv_\`| Серверні Scripts |
|\`Cli_\`| LocalScripts |
|\`Mod_\`| ModuleScripts |

**Пульти:**\`Shop_RequestPurchase\`,\`Quest_Update\`- спочатку домен.`,
 },
 {
 title: "Базова лінія структури папок",
 content: `\`\`\`
ReplicatedStorage/
├── Remotes/
└── SharedAssets/

ServerScriptService/
├── Systems/
│ ├── Srv_InventoryService
│ └── Srv_QuestService
└── Modules/

StarterGui/
└── Screens/
 ├── UI_ShopGui
 └── UI_QuestHud

Workspace/
├── NPCs/
├── PuzzleWorld/
├── Enemies/
└── Map/
\`\`\`**Одна Folder на систему** - а не 200 скриптів у корені.`,
 },
 {
 title: "Процес спринту очищення",
 content: `**Партія 1 (10 хв):** Реквізити карти робочого простору →\`Map/\`**Пакет 2 (10 хв):** Перейменувати Scripts Srv_/Cli_
**Пакет 3 (10 хв):** Пульти →\`ReplicatedStorage/Remotes\`**Пробна гра** після кожної партії - нічого не ламається.

**Видалити:** не використовується за умовчанням\`Part\`, порожні model, дублікати Scripts.

**Примітка щодо стилю** (блокнот або README):
- Максимальна довжина імені ~40 символів
- PascalCase для моделей, camelCase для місцевих у коді`,
 },
 {
 title: "Script перевірки (необов'язково)",
 content: `\`\`\`lua
-- Srv_NameValidator in ServerScriptService (Studio helper)
local BAD = {"Part", "Part1", "Script", "Script2", "Model", "Frame"}

for _, inst in ipairs(workspace:GetDescendants()) do
 if table.find(BAD, inst.Name) then
 warn("[Naming]", inst:GetFullName())
 end
end
\`\`\`Запустити один раз після очищення - попередження має бути близьким до нуля.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Немає загальної Parts/Script в активних системах
- [ ] Folder Remotes існує
- [ ] Системи + Модулі в ServerScriptService
- [ ] Тест відтворення пройшов після рефакторинга
- [ ] Зберегти:\`Lesson 11.1 - Clean Explorer\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Перейменувати все відразу без перевірки",
 explanation: "Розбиті вимагають шляхи.",
 correctApproach: "Невеликі партії + Play Test",
 },
 {
 mistake: "перенесення Scripts вимагає шляхів",
 explanation: "Ніяких помилок модуля.",
 correctApproach: "Оновити require() після переміщення",
 },
 {
 mistake: "Неузгоджені префікси",
 explanation: "Все ще важко шукати.",
 correctApproach: "Письмовий стиль примітки",
 },
 {
 mistake: "Видалення «невикористаного» без перевірки",
 explanation: "Видаляє дротовий інтерфейс.",
 correctApproach: "Спочатку шукайте посилання",
 },
 ],
 summary: "Ви застосували префікси імен, згрупували системи в передбачувані Folders та завершили очисний спринт Explorer - тепер ваш проект можна підтримувати для етапів полірування та публікації.",
 practiceTask: {
 title: "Спринт очищення Explorer (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Професійна ієрархія на головному місці.

### Part A - План (5 хв)
1. Список систем: магазин, квест, головоломка, інвентар
2. Запишіть у примітках 5 правил найменування

### Part B - Рефакторинг (18 хв)
1. Workspace + SSS + ReplicatedStorage + StarterGui
2. Перейменуйте пульти дистанційного керування та Scripts клавіш
3. Play тест після кожної партії

### Part C - Зберегти (2 хв)
1. **Зберегти в Roblox** →\`Lesson 11.1 - Clean Explorer\` 2. **Практика завершена**`,
 hints: [
 "Шукайте в Explorer назви «Script» і «Part».",
 "потрібні шляхи, використовуйте шлях екземпляра, а не назву файлу",
 "Team README необов'язковий, але цінний",
 ],
 optionalChallenge: "Srv_NameValidator попереджає про погані імена в Play.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Префікс Srv_ означає...",
 options: [
 "Server script",
 "Client UI",
 "Terrain",
 "Sound",
 ],
 correctAnswer: 0,
 explanation: "На стороні сервера.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Віддалені повинні жити в...",
 options: [
 "ReplicatedStorage/Remotes",
 "Workspace only",
 "Terrain",
 "Lighting",
 ],
 correctAnswer: 0,
 explanation: "Спільний доступ.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Part загальної назви погана, оскільки...",
 options: [
 "Hard to find in Explorer",
 "Required",
 "Faster",
 "Free Robux",
 ],
 correctAnswer: 0,
 explanation: "Налагодження болю.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Очищення партіями дозволяє уникнути...",
 options: [
 "Breaking many systems at once",
 "Publishing",
 "Sound",
 "NPC",
 ],
 correctAnswer: 0,
 explanation: "Безпечний рефактор.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Префікс NPC_ для...",
 options: [
 "Character models",
 "UI buttons",
 "Road parts",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Активи NPC.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Модуль 11 фокусується на...",
 options: [
 "Performance and полірування",
 "Only racing",
 "Only inventory tables",
 "Terrain gen",
 ],
 correctAnswer: 0,
 explanation: "Якість релізу.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Префікс UI_ допомагає...",
 options: [
 "Find interface elements",
 "Delete Humanoid",
 "Remove quests",
 "Ban players",
 ],
 correctAnswer: 0,
 explanation: "організація інтерфейсу користувача.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 11.2 додає...",
 options: [
 "Loading screen",
 "Laser puzzle",
 "DataStore only",
 "Sword combat",
 ],
 correctAnswer: 0,
 explanation: "Перше враження.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Найменування Shop_RequestPurchase...",
 options: [
 "Domain_action pattern",
 "Random",
 "Banned",
 "Client-only",
 ],
 correctAnswer: 0,
 explanation: "Віддалена чіткість.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 11.1 зберегти назву...",
 options: [
 "Lesson 11.1 - Clean Explorer",
 "Game Polished",
 "Loading Screen",
 "Sound Design",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson112 = {
 lessonId: "lesson-roblox-11-2",
 moduleId: "module-11",
 order: 2,
 title: "11.2 - Loading Screen",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть фірмовий LoadingGui з підказками та текстом прогресу",
 "Пориньте в гру за допомогою TweenService",
 "Попередньо завантажте ключові ресурси за допомогою ContentProvider",
 "Керуйте контекстом телепорту за допомогою чітких повідомлень про статус",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Завантажується **перше враження** - гравці оцінюють блиск за 3 секунди.

**Хід уроку:**
1. **Теорія (40 хв)** - завантаження UI + попереднє завантаження
2. **Практика (~25 хв)** - професійна послідовність завантаження
3. **Вікторина (10 хв)** - проходження **70%**

Відкрите очищене місце з **11.1**.`,
 },
 {
 title: "Завантаження є Part ігрового процесу",
 content: `Без завантаження інтерфейсу:
- Чорний екран плутанини
- "Гра зламана?"
- Гравці виходять

**Із завантаженням інтерфейсу користувача:**
- Бренд + назва
- Обертові наконечники
- Текст статусу ("Завантаження світу...")
- Плавне згасання до появи`,
 },
 {
 title: "Макет LoadingGui",
 content: `\`StarterGui/LoadingGui\`(ScreenGui, **ResetOnSpawn false** для першого завантаження)\`\`\`
LoadingGui
├── Background (Frame, full screen, dark)
├── Logo (ImageLabel or TextLabel - game name)
├── TipsLabel (rotating hints)
├── StatusLabel ("Loading...")
└── ProgressBar (Frame bar optional)
\`\`\`**ZIndex** - завантажується поверх усього, поки не буде звільнено.`,
 },
 {
 title: "Попереднє завантаження та статус",
 content: `\`Cli_LoadingSequence\`LocalScript:\`\`\`lua
local ContentProvider = game:GetService("ContentProvider")
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local gui = script.Parent
local status = gui.StatusLabel
local tips = gui.TipsLabel

local TIP_LIST = {
 "Поговори з Guide Maya - отримаєш перший квест.",
 "Заглянь у магазин за стартовим спорядженням.",
 "Проходь пазли, щоб заробити монети.",
}

local assetsToPreload = {
 workspace.PuzzleWorld,
 game.ReplicatedStorage.Remotes,
}

status.Text = "Loading assets..."
ContentProvider:PreloadAsync(assetsToPreload)

status.Text = "Syncing profile..."
task.wait(0.5)

status.Text = "Ready!"
task.wait(0.3)

local fade = TweenService:Create(gui.Background, TweenInfo.new(0.6, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {BackgroundTransparency = 1})
fade:Play()
fade.Completed:Wait()
gui.Enabled = false
\`\`\``,
 },
 {
 title: "Обертові наконечники",
 content: `\`\`\`lua
task.spawn(function()
 local i = 1
 while gui.Enabled do
 tips.Text = "Tip: " .. TIP_LIST[i]
 i = i % #TIP_LIST + 1
 task.wait(3)
 end
end)
\`\`\`Короткі поради - по одному рядку (зрозумілі для гравців 10+).`,
 },
 {
 title: "Контекст телепортації",
 content: `Під час використання **TeleportService** між місцями:\`\`\`lua
local TeleportService = game:GetService("TeleportService")
-- Show loading BEFORE teleport from Cli script
status.Text = "Traveling to Arena..."
TeleportService:TeleportAsync(placeId, {player})
\`\`\`Місце призначення також показує LoadingGui під час приєднання.

**Тривалість:** згасання 0,4-1,0 с - не надто повільно.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] LoadingGui відображається під час приєднання з порадою + статусом
- [ ] PreloadAsync працює без помилок
- [ ] Fade out розкриває чистоту
- [ ] Перевірено поведінку ResetOnSpawn
- [ ] Зберегти:\`Lesson 11.2 - Loading Screen\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "LoadingGui ResetOnSpawn true",
 explanation: "Спалахує знову кожного разу.",
 correctApproach: "false для завантаження сеансу",
 },
 {
 mistake: "Без попереднього натягу - замикання після вицвітання",
 explanation: "Погана перша секунда.",
 correctApproach: "Ключові Folders PreloadAsync",
 },
 {
 mistake: "Завантаження ніколи не відключалося",
 explanation: "Застрягла накладка.",
 correctApproach: "gui.Enabled = false після затухання",
 },
 {
 mistake: "5 секунд очікування чорного кольору без тексту",
 explanation: "Почувається розбитим.",
 correctApproach: "Оновлення StatusLabel",
 },
 ],
 summary: "Ви створили фірмовий екран завантаження з підказками, що обертаються, попереднім завантаженням ContentProvider, повідомленнями про статус і плавним переходом у ігровий процес - перші секунди гри тепер виглядають професійно.",
 practiceTask: {
 title: "Послідовність завантаження Pro (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Покращений досвід приєднання.

### Part A - Інтерфейс користувача (10 хв)
1. LoadingGui на весь екран + логотип + підказки + статус
2. Додаткова заглушка індикатора прогресу

### Part B - Послідовність (12 хв)
1. Cli_LoadingSequence - попереднє завантаження, етапи стану, затухання
2. Петля обертання наконечника
3. Перевірте приєднання в Play

### Part C - Зберегти (3 хв)
1. **Зберегти в Roblox** →\`Lesson 11.2 - Loading Screen\` 2. **Практика завершена**`,
 hints: [
 "Попередньо завантажте Remotes + Folder основного світу",
 "Модуль 10 TweenService для затухання",
 "Телепортація необов'язкова, якщо в одному місці",
 ],
 optionalChallenge: "Статус, прив'язаний до реальних кроків: UI, NPC, Профіль.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "ContentProvider:PreloadAsync...",
 options: [
 "Loads assets early",
 "Deletes player",
 "Saves DataStore",
 "Publishes",
 ],
 correctAnswer: 0,
 explanation: "Зменшити замички.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Завантаження зникнення використовує...",
 options: [
 "TweenService",
 "Terrain",
 "Humanoid only",
 "Weld",
 ],
 correctAnswer: 0,
 explanation: "Плавний перехід.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "StatusLabel повідомляє гравцеві...",
 options: [
 "What is happening",
 "Server password",
 "Robux",
 "Version only",
 ],
 correctAnswer: 0,
 explanation: "Зменшує плутанину.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Поради обертаються на...",
 options: [
 "Teach while waiting",
 "Lag game",
 "Remove UI",
 "Ban",
 ],
 correctAnswer: 0,
 explanation: "Заручини.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Після затухання графічний інтерфейс має...",
 options: [
 "Disable or hide",
 "Stay forever",
 "Block all input forever",
 "Delete player",
 ],
 correctAnswer: 0,
 explanation: "Розкрити гру.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "TeleportAsync потребує...",
 options: [
 "Clear loading message",
 "No UI",
 "Terrain edit",
 "Atmosphere only",
 ],
 correctAnswer: 0,
 explanation: "Безпроблемна подорож.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 11.2 базується на...",
 options: [
 "Lesson 11.1 clean place",
 "Empty",
 "Module 1 only",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Організований проект.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 11.3 додає...",
 options: [
 "Sound design layers",
 "Only Explorer",
 "Only laser",
 "Coins",
 ],
 correctAnswer: 0,
 explanation: "Аудіо полірування.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Хороша тривалість згасання приблизно...",
 options: [
 "0.4-1.0 seconds",
 "10 seconds",
 "0 seconds",
 "60 seconds",
 ],
 correctAnswer: 0,
 explanation: "Яскравий лак.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 11.2 зберегти назву...",
 options: [
 "Lesson 11.2 - Loading Screen",
 "Clean Explorer",
 "Game Polished",
 "Optimization",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson113 = {
 lessonId: "lesson-roblox-11-3",
 moduleId: "module-11",
 order: 3,
 title: "11.3 - Sound design",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Звуки навколишнього середовища, інтерфейсу та ігрового процесу",
 "Для наочності встановіть діапазон гучності для кожного шару",
 "Звуки гаків для подій квестів, магазинів і головоломок",
 "Уникайте повторюваної втоми звуку за допомогою зміни висоти",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Візуальні елементи приваблюють - **аудіо** занурює гравців у гру.

**Хід уроку:**
1. **Теорія (40 хв)** - три звукові шари
2. **Практика (~25 хв)** - 8+ звуків збалансовано
3. **Вікторина (10 хв)** - проходження **70%**

Відкрите місце з магазином, квестом, головоломкою з попередніх модулів.`,
 },
 {
 title: "Три ключових шари",
 content: `| Шар | Обсяг | Приклади |
|-------|--------|----------|
| **Амбіент** | 0,2-0,4 | Вітер, гул концентрації, печерна крапля |
| **UI** | 0,5-0,7 | Натисніть, відкрити магазин, закрити |
| **Ігровий процес** | 0,7-1,0 | Монета, квест виконано, головоломка, удар |

**Критичні сигнали** голосніше за атмосферу - гравці чують нагороди.`,
 },
 {
 title: "Організація папок",
 content: `\`SoundService\`або\`ReplicatedStorage/Audio/\`:\`\`\`
Audio/
├── Ambient/
│ └── SFX_Hub_Loop
├── UI/
│ ├── SFX_UI_Click
│ └── SFX_UI_Purchase
└── Gameplay/
 ├── SFX_Quest_Complete
 ├── SFX_Puzzle_Solve
 └── SFX_Coin_Collect
\`\`\`Префікс **SFX_** відповідає іменуванню 11.1.`,
 },
 {
 title: "Відтворення звуків з коду",
 content: `\`\`\`lua
local function playSFX(soundTemplate, parent)
 local s = soundTemplate:Clone()
 s.Parent = parent or workspace
 s:Play()
 game:GetService("Debris"):AddItem(s, s.TimeLength + 0.5)
end
\`\`\`**Натискання інтерфейсу користувача** - LocalScript на кнопках:\`\`\`lua
button.MouseButton1Click:Connect(function()
 playSFX(game.ReplicatedStorage.Audio.UI.SFX_UI_Click, player.PlayerGui)
end)
\`\`\`**Квест завершено** - сервер після нагороди:\`\`\`lua
playSFX(game.ReplicatedStorage.Audio.Gameplay.SFX_Quest_Complete, workspace)
\`\`\``,
 },
 {
 title: "Навколишній цикл",
 content: `\`SFX_Hub_Loop\`в\`Workspace/AmbientZone\`або серверний скрипт:\`\`\`lua
local ambient = workspace.Audio.Ambient.SFX_Hub_Loop
ambient.Looped = true
ambient.Volume = 0.25
ambient:Play()
\`\`\`**Fade in** - початок гучності 0, перехід до 0,25 протягом 2 с.

**Зональне середовище (розширений):** збільшення гучності всередині Parts печери.`,
 },
 {
 title: "Втома і качка",
 content: `**Варіація висоти** звуків спаму:\`\`\`lua
s.PlaybackSpeed = 0.95 + math.random() * 0.1
\`\`\`**Притуплення:** нижчий оточення на 0,1 с під час завершення квесту.

**Ні** звук монети 50 разів на секунду - усунення дребезгу збирає SFX.

| Подія | Звук |
|-------|-------|
| Купуйте успіх магазину | SFX_UI_Purchase |
| Невдача магазину | SFX_UI_Error (короткий) |
| Головоломка мішень | SFX_Puzzle_Chime |
| Усі цілі | SFX_Puzzle_Solve |
| Квест завершено | SFX_Quest_Complete |`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] 8+ звуків, розміщених і названих
- [ ] Навколишнє середовище + інтерфейс користувача + збалансовані шари ігрового процесу
- [ ] Ключові події запускають правильний SFX
- [ ] Тест навушників + колонок
- [ ] Зберегти:\`Lesson 11.3 - Sound Design\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Всі звуки том 1",
 explanation: "Втома вуха.",
 correctApproach: "Діапазони обсягу шару",
 },
 {
 mistake: "Ембіент голосніше, ніж квест завершено",
 explanation: "Нагорода нечувана.",
 correctApproach: "Геймплей найгучніший",
 },
 {
 mistake: "Клацніть зациклений інтерфейс навколишнього середовища",
 explanation: "дратує.",
 correctApproach: "Інтерфейс лише після натискання",
 },
 {
 mistake: "Немає звуку про велику нагороду",
 explanation: "Плоский досвід.",
 correctApproach: "Квест/головоломка SFX",
 },
 ],
 summary: "Ви організували аудіо на шари навколишнього середовища, інтерфейсу користувача та ігрового процесу, підключили звуки до подій магазину/квесту/головоломки та збалансували гучність - тепер ваша гра передає успіх і настрій через звук.",
 practiceTask: {
 title: "Проходження рівня аудіо (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** 8 звуків, збалансовані шари.

### Part A - Бібліотека (10 хв)
1. Folder Audio - 2 хвилини навколишнього середовища/інтерфейсу користувача/ігри кожна
2. Назвіть префікс SFX_, установіть базову гучність

### Part B - Події в каналі (12 хв)
1. Інтерфейс магазину клік + покупка + невдача
2. Виконання квесту + вирішення головоломки + монета
3. Зміна циклу концентратора

### Part C - Зберегти (3 хв)
1. Грайте через золотий шлях зі звуком
2. **Зберегти в Roblox** →\`Lesson 11.3 - Sound Design\` 3. **Практика завершена**`,
 hints: [
 "Roblox toolbox free SFX - перевірте ліцензію",
 "Шаблон Clone+Play+Debris дозволяє уникнути помилок накладання",
 "Перевірте тільки вимкнений ембієнт, а потім повний мікс",
 ],
 optionalChallenge: "Інтенсивність музики під час агресії ворога з модуля 8.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Ембіентний шар призначений для...",
 options: [
 "Location mood",
 "UI clicks only",
 "Server scripts",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Відчуття фону.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Геймплей SFX має бути...",
 options: [
 "Louder than ambient",
 "Silent",
 "Same as ambient",
 "Removed",
 ],
 correctAnswer: 0,
 explanation: "Чіткий зворотній зв'язок.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Префікс SFX_ відповідає...",
 options: [
 "Lesson 11.1 naming",
 "Terrain only",
 "Random",
 "UK locale",
 ],
 correctAnswer: 0,
 explanation: "Послідовність.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Варіація висоти зменшує...",
 options: [
 "Audio fatigue",
 "FPS",
 "Coins",
 "Laps",
 ],
 correctAnswer: 0,
 explanation: "Звуки спаму.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Повний квест потребує...",
 options: [
 "Clear gameplay SFX",
 "No sound",
 "Only ambient",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Відчуття винагороди.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Clone Play Debris pattern...",
 options: [
 "Cleans up finished sounds",
 "Deletes player",
 "Saves game",
 "Opens shop",
 ],
 correctAnswer: 0,
 explanation: "Одноразовий SFX.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 11.3 дроти до...",
 options: [
 "Shop quest puzzle events",
 "Only car",
 "Only terrain",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Існуючі системи.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 11.4 додає...",
 options: [
 "Optimization",
 "Only loading",
 "Only Explorer",
 "NPC only",
 ],
 correctAnswer: 0,
 explanation: "Продуктивність.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Звуки натискання інтерфейсу користувача належать до...",
 options: [
 "Button interactions",
 "Ambient loop",
 "Terrain",
 "Sky",
 ],
 correctAnswer: 0,
 explanation: "рівень інтерфейсу користувача.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 11.3 зберегти назву...",
 options: [
 "Lesson 11.3 - Sound Design",
 "Loading Screen",
 "Game Polished",
 "Clean Explorer",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson114 = {
 lessonId: "lesson-roblox-11-4",
 moduleId: "module-11",
 order: 4,
 title: "11.4 - Оптимізація",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Enable StreamingEnabled for large playable areas",
 "Об’єднайте декоративні Parts та зменшіть спам VFX",
 "Рефакторинг одного дорогого циклу while-true для оновлень, керованих подіями",
 "Вимірюйте продуктивність до/після в Studio",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Полірування означає **гладкий** - не тільки красивий. Якщо FPS падає, гравці йдуть.

**Хід уроку:**
1. **Теорія (40 хв)** - важелі оптимізації
2. **Практика (~25 хв)** - проходження оптимізації
3. **Вікторина (10 хв)** - проходження **70%**

Перевірте **Puzzle World** або свій найбільший центр.`,
 },
 {
 title: "Мислення продуктивності",
 content: `| Симптом | Реакція гравця |
|---------|----------------|
| Заїкання на ікру | «Зламана гра» |
| Лаг в кімнаті головоломок | Вийти перед вирішенням |
| Мобільний тепло | Видалити |

**Оптимізуйте, перш ніж** додавати додаткові функції.`,
 },
 {
 title: "StreamingEnabled",
 content: `Properties **Workspace** (або налаштування гри):\`StreamingEnabled = true\`Великі карти завантажуються **лише біля гравця** - менше пам’яті.

**StreamingMinRadius / TargetRadius** - налаштуйте налаштування гри для великих світів.

**Центр уроків:** увімкніть, якщо на карті > ~200 ігрової зони з багатьма Parts.`,
 },
 {
 title: "Part та бюджет VFX",
 content: `**Злиття** крихітний деко:

- 20 Parts трави → 1 плитка Union або більше
- Дубльовані дерева - економно використовуйте екземпляри **MeshPart**

**Аудит VFX:**
- Максимум 3-5 активних випромінювачів Parts поблизу гравця
- Вимкніть випромінювачі **Enabled = false**, коли далеко
- Жодної нескінченної іскри спаму в кімнаті головоломок

**Прозорість** укладання шкодить графічному процесору - менше шарів скла.`,
 },
 {
 title: "Ефективність Script",
 content: `**Погано:**\`\`\`lua
while true do
 recheckAllRays() -- every frame cost
 task.wait()
end
\`\`\`**Краще:**\`\`\`lua
-- Only on mirror rotate + 0.2s debounce batch
mirrorRotated.Event:Connect(recheckAllRays)
\`\`\`**Променева головоломка** з 10.4 - не використовуйте raycast 60/с, якщо достатньо 2/с.\`\`\`lua
local RunService = game:GetService("RunService")
local acc = 0
RunService.Heartbeat:Connect(function(dt)
 acc += dt
 if acc < 0.25 then return end
 acc = 0
 -- light periodic update only if needed
end)
\`\`\``,
 },
 {
 title: "Вимірювання до/після",
 content: `Studio **Script Performance** + **Microprofiler** (вкладка View):

| Метричний | Перед | Після |
|--------|--------|-------|
| Кількість деталей у концентраторі | | |
| Цикл активних скриптів | | |
| Відчути себе в грі (заїкатися?) | | |

Тест **Клієнта**: Студія → Тест → Нижній рівень емулятора пристрою, якщо доступний.

**Панель налагодження (завдання):**\`\`\`lua
-- FPS proxy: 1 / dt smoothed in LocalScript
\`\`\``,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Потокове передавання увімкнено на великій карті
- [ ] Один об’єднаний деко-кластер або видалені непотрібні Parts
- [ ] Один цикл перетворено на події
- [ ] Зменшено кількість VFX у зоні головоломки
- [ ] Зберегти:\`Lesson 11.4 - Optimization\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Raycast кожен кадр для всіх гравців",
 explanation: "сплеск ЦП.",
 correctApproach: "Подійна повторна перевірка",
 },
 {
 mistake: "Тисячі деталей з 1 стадом",
 explanation: "Вартість візуалізації.",
 correctApproach: "Об’єднати або видалити",
 },
 {
 mistake: "Оптимізація без вимірювання",
 explanation: "Невідомий вплив.",
 correctApproach: "Примітки до/після",
 },
 {
 mistake: "Вимкніть усі Scripts, щоб виправити затримку",
 explanation: "Гра в розриви.",
 correctApproach: "Цільові дорогі петлі",
 },
 ],
 summary: "Ви ввімкнули потокове передавання там, де це було необхідно, скоротили витрати на Part та VFX, реконструювали дорогий цикл до оновлень, керованих подіями, і виміряли продуктивність - ваша гра працює плавніше на реальних пристроях.",
 practiceTask: {
 title: "Паспорт оптимізації продуктивності (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Вимірне покращення в одній області.

### Part A - Аудит (8 хв)
1. Порахуйте Parts в основній ігровій зоні
2. Список Scripts із циклами while true do
3. Зверніть увагу на місця заїкання

### Part B - Виправлення (15 хв)
1. StreamingEnabled якщо застосовно
2. Об’єднати/видалити 1 деко-групу + вирізати 2 VFX
3. Рефакторинг 1 циклу (промінь головоломки або патруль)

### Part C - Зберегти (2 хв)
1. Напишіть до/після в примітках
2. **Зберегти в Roblox** →\`Lesson 11.4 - Optimization\` 3. **Практика завершена**`,
 hints: [
 "Стримана логіка сервера - клієнт обробляє чисті візуальні елементи",
 "Головоломка модуля 10 променів загальне вузьке місце",
 "Patrol NPC нормально за 0,5 с. Перемістіть, щоб оновлювати не кожен кадр",
 ],
 optionalChallenge: "Налагодження інтерфейсу користувача, що показує кількість Parts + FPS проксі.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "StreamingEnabled допомагає...",
 options: [
 "Large worlds load efficiently",
 "Delete scripts",
 "Add Robux",
 "Remove UI",
 ],
 correctAnswer: 0,
 explanation: "Потокове передавання.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Об’єднання дрібних Parts зменшує...",
 options: [
 "Render load",
 "Player HP",
 "Quest progress",
 "Dialogue",
 ],
 correctAnswer: 0,
 explanation: "Підрахунок Parts.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Орієнтовані на події ритми...",
 options: [
 "Raycast every frame always",
 "No scripts",
 "Terrain only",
 "Publishing",
 ],
 correctAnswer: 0,
 explanation: "Ефективність.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "VFX спам викликає...",
 options: [
 "GPU stress",
 "More coins",
 "Better FPS",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Овердрафт.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Вимірювання до/після...",
 options: [
 "Prove optimization worked",
 "Guess",
 "Skip work",
 "Remove audio",
 ],
 correctAnswer: 0,
 explanation: "Докази.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Урок 11.4 базується на...",
 options: [
 "Polished place from 11.1-11.3",
 "Empty",
 "Module 1 only",
 "Coins only",
 ],
 correctAnswer: 0,
 explanation: "Повний проект.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 11.5 додає...",
 options: [
 "UX and accessibility",
 "Only sound",
 "Only loading",
 "Laser",
 ],
 correctAnswer: 0,
 explanation: "Доступність.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Серверні Scripts мають залишатися...",
 options: [
 "Focused on game rules",
 "All visual VFX",
 "UI only",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Авторитет худий.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Оптимізація важлива, оскільки...",
 options: [
 "Stutter makes players leave",
 "Required for badges",
 "Replaces design",
 "Removes quests",
 ],
 correctAnswer: 0,
 explanation: "Збереження.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 11.4 зберегти назву...",
 options: [
 "Lesson 11.4 - Optimization",
 "Sound Design",
 "Game Polished",
 "Loading Screen",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson115 = {
 lessonId: "lesson-roblox-11-5",
 moduleId: "module-11",
 order: 5,
 title: "11.5 - UX та доступність",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Застосуйте читабельні шрифти, контраст і масштабування інтерфейсу користувача",
 "Додайте значки та текст для квестів і головоломок",
 "Покращте ясність реєстрації від появи до першої нагороди",
 "Додаткові налаштування розміру тексту або зменшення руху",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**UX - це повага** - гравці ніколи не повинні запитувати: «Що мені тепер робити?» більше 30 секунд.

**Хід уроку:**
1. **Теорія (40 хв)** - контрольний список доступності
2. **Практика (~25 хв)** - покращення на одну подорож
3. **Вікторина (10 хв)** - проходження **70%**`,
 },
 {
 title: "Основи доступності",
 content: `| Перевірте | Цільовий |
|-------|--------|
| Size шрифту | Еквівалент 16-22 пікселів на основних етикетках |
| Контраст | Світлий текст на темній панелі (або реверсі) |
| Дальтонізм | Не використовуйте лише червоний/зелений колір - додайте значки ✓ / ✗ |
| Рух | Додатково зменшити тремтіння екрана / спалах |
| Субтитри | Ключові рядки NPC як текст (діалог уже допомагає) |

**Constraints** теж виграють - маленькі телефони, світлі кімнати.`,
 },
 {
 title: "Чіткість адаптації",
 content: `**Поява → перша нагорода** шлях (золотий шлях):

| Крок | Виправлення UX |
|------|--------|
| Спаун | Табличка: «Поговоріть з Гідом Майєю (жовтий маркер)» |
| Без квесту | Відображається мітка квесту: «Немає активного квесту» |
| Діалог | Велика кнопка Далі |
| Головоломка | Мішені: 0/3 + балки стрілок |
| Магазин | Ціни читаються, повідомлення про помилку чітке |

**Маркер цілі** - стрілка BillboardGui на екземплярі Maya або **Highlight**.`,
 },
 {
 title: "Послідовність інтерфейсу користувача",
 content: `**Один посібник зі стилю:**
- Основний колір кнопки однаковий у магазині, діалозі, головоломці
- Послідовний радіус **UICorner** (8-12 пікселів)
- **UIStroke** на панелях для зручності читання
- Повідомлення про статус однакові (внизу по центру)\`\`\`lua
-- High contrast example
label.TextColor3 = Color3.fromRGB(255, 255, 255)
panel.BackgroundColor3 = Color3.fromRGB(25, 28, 35)
\`\`\`Перевірте **1280×720** і **мобільний аспект** в емуляторі пристрою Studio.`,
 },
 {
 title: "Значки плюс текст",
 content: `Квест завершено:
- Текст: "Квест завершено!"
- Значок: ✓ ImageLabel

Помилка магазину:
- Текст: "Недостатньо монет"
- Значок: силует монети + червоне обведення

Ціль головоломки:
- **Neon колір** + **галочка** після завершення - не тільки зелений

**Безпечна для дальтоників** палітра: синій/помаранчевий для штатів, а не лише червоний/зелений.`,
 },
 {
 title: "Панель налаштувань (необов'язково)",
 content: `\`UI_Settings\`у StarterGui:

| Варіант | Ефект |
|--------|--------|
| Size тексту | Малий / Середній / Великий масштаб на QuestLabel |
| Зменшений рух | Коротші анімації без тремтіння камери |
| Гучність SFX | Слайдер 0-1 (клієнт) |

Зберігати в атрибуті гравця або клієнтській таблиці - не критично для безпеки.\`\`\`lua
player:SetAttribute("TextScale", 1.2)
\`\`\``,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Шлях від появи до винагороди має 3+ покращення чіткості
- [ ] Контраст проходить тест на косоокість
- [ ] Стан квесту/головоломки використовує значок + текст
- [ ] Перевірено два розміри екрана
- [ ] Зберегти:\`Lesson 11.5 - UX Accessibility\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Червоний/зелений лише для успіху/невдачі",
 explanation: "Виключення дальтоніків.",
 correctApproach: "Значки та текст",
 },
 {
 mistake: "Дрібний шрифт на мобільному",
 explanation: "Нечитабельний.",
 correctApproach: "Еквівалент 16+ пт",
 },
 {
 mistake: "Немає голів після появи",
 explanation: "Гравці бродять.",
 correctApproach: "Знак + квест HUD",
 },
 {
 mistake: "Скрізь різні стилі кнопок",
 explanation: "Почувається дилетантом.",
 correctApproach: "Керівництво по стилю",
 },
 ],
 summary: "Ви покращили чіткість інтерфейсу, контрастність і читабельність шрифтів, індикатори стану, безпечного для дальтоніків, і додаткові параметри - основний цикл тепер зрозумілий без допомоги вчителя.",
 practiceTask: {
 title: "Спеціальні можливості + оновлення UX (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** чіткіший шлях від появи до нагороди.

### Part A - Аудит (8 хв)
1. Гра з друзями або самими собою 5 хвилин - зверніть увагу на моменти, що плутають
2. Перелічіть 3 найпопулярніші виправлення

### Part B - Реалізація (15 хв)
1. Знак появи + маркер цілі
2. Контраст/шрифт на QuestLabel + статус магазину
3. Піктограма + текст на одному успішному та одному невдалому стані

### Part C - Зберегти (2 хв)
1. Перевірте золотий шлях
2. **Зберегти в Roblox** →\`Lesson 11.5 - UX Accessibility\` 3. **Практика завершена**`,
 hints: [
 "Подивіться плейтестер - спочатку виправте те, що вони говорять",
 "Highlight на Guide Maya - проста перемога в UX",
 "Діалог модуля 8 вже допомагає субтитрам",
 ],
 optionalChallenge: "Size тексту панелі налаштувань + зменшений рух.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Захищений від дальтоніків інтерфейс користувача використовує...",
 options: [
 "Icons and text not color alone",
 "Only red green",
 "No labels",
 "Tiny fonts",
 ],
 correctAnswer: 0,
 explanation: "Доступність.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Високий контраст означає...",
 options: [
 "Readable text on background",
 "Invisible UI",
 "No UI",
 "Random colors",
 ],
 correctAnswer: 0,
 explanation: "Розбірливість.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Виправлення адаптації зменшують...",
 options: [
 "What do I do confusion",
 "Robux",
 "Terrain",
 "Welds",
 ],
 correctAnswer: 0,
 explanation: "Ясність.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Послідовний стиль інтерфейсу...",
 options: [
 "Feels professional",
 "Required by Roblox",
 "Removes quests",
 "Bans",
 ],
 correctAnswer: 0,
 explanation: "Полірування (polish).",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Перевірте кілька дозволів, щоб...",
 options: [
 "Catch layout breaks",
 "Delete saves",
 "Publish",
 "Remove NPCs",
 ],
 correctAnswer: 0,
 explanation: "Чуйний інтерфейс користувача.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Варіант обмеженого руху...",
 options: [
 "Helps sensitive players",
 "Deletes game",
 "Adds lag",
 "Removes sound",
 ],
 correctAnswer: 0,
 explanation: "Доступність.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 11.5 базується на...",
 options: [
 "11.1-11.4 поліруванняed place",
 "Empty",
 "Module 12",
 "Coins only",
 ],
 correctAnswer: 0,
 explanation: "Повний зріз.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 11.6 - це...",
 options: [
 "Game Polished checkpoint",
 "Publish",
 "GDD only",
 "Race",
 ],
 correctAnswer: 0,
 explanation: "Фінал.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Маркер цілі допомагає...",
 options: [
 "Find Guide Maya",
 "Fly",
 "Swim",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Пошук шляху.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 11.5 зберегти назву...",
 options: [
 "Lesson 11.5 - UX Accessibility",
 "Optimization",
 "Sound Design",
 "Puzzle World",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок.",
 },
 ],
 },
}

export const ukLesson116 = {
 lessonId: "lesson-roblox-11-6",
 moduleId: "module-11",
 order: 6,
 title: "11.6 - Checkpoint: Гра відполірована",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Передайте рубрику досконалості через читабельність, чуйність, стабільність",
 "Інтегруйте Explorer, завантаження, аудіо, оптимізацію, UX з модуля 11",
 "Пріоритезуйте виправлення: блокувальники, UX, продуктивність, потім візуальні ефекти",
 "Модуль 11 - Game Polished з виправленнями після сліпого тесту",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Game Polished** = «працює» → **відчувається професійно**.

**Контрольний список для модуля 11:**
- 11.1 Чистий Explorer
- 11.2 Екран завантаження
- 11.3 Звукові шари
- 11.4 Оптимізація
- 11,5 UX/доступність

**Зберегти:**\`Module 11 - Game Polished\``,
 },
 {
 title: "Остаточна рубрика полірування (1-5)",
 content: `Оцініть кожен - спочатку виправте будь-що **≤3**:

| Площа | Оцінка 1-5 | Примітки |
|------|-----------|-------|
| **Читабельність** | | UI, знаки, діалог |
| **Чуйність** | | Введення, анімація, завантаження |
| **Послідовність** | | Назви, кольори, SFX |
| **Стабільність** | | Немає помилок виводу 10 хвилин гри |
| **Фактор веселощів** | | Зіграли б знову? |

**Ціль:** усі **4+** для контрольної точки.`,
 },
 {
 title: "Виправити порядок пріоритетів",
 content: `1. **Блокувальники** - збій, програмне блокування, стирання даних
2. **Незрозумілий UX** - застрягли гравці
3. **Сплески продуктивності** - зони заїкання
4. **Visual/audio** - гучність, контраст, VFX

**Відстеження проблем** (нотатки/таблиця):

| Випуск | Пріоритет | Статус |
|-------|----------|--------|
| Приклад: квест застряг | P1 | фіксований |`,
 },
 {
 title: "Тест сліпої гри",
 content: `Запитайте когось, хто **не створював** гру:

1. Грайте 10 хвилин без керівництва
2. Зверніть увагу на 3 плутанини **в їхніх словах**
3. Ви виправляєте топ-3 перед збереженням

**Без підказок** під час тестування - лише перегляд.

Записати короткий кліп необов'язково - доказ портфоліо.`,
 },
 {
 title: "60-секундний демонстраційний Script",
 content: `1. Екран завантаження + підказка
2. Знак появи → поговоріть з Майєю
3. Почати квест - очистити HUD
4. Одне рішення головоломки - SFX + зворотній зв'язок
5. Купити в магазині - звук інтерфейсу
6. Швидко показати Folders Explorerа (режим викладача)

**Наступний модуль 12:** GDD, опублікувати, продемонструвати.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Рубрика всі напрямки 4+
- [ ] Виправлено топ-3 тесту сліпої гри
- [ ] Немає червоних помилок протягом 10 хвилин сеансу
- [ ] Завантаження + аудіо + UX на золотому шляху
- [ ] **Зберегти в Roblox** →\`Module 11 - Game Polished\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Пропуск сліпого тесту гри",
 explanation: "Сліпі зони без підказок.",
 correctApproach: "10 хв некерований тест",
 },
 {
 mistake: "Полірування лише візуал, зламаний квест",
 explanation: "Блокувальник ігнорується.",
 correctApproach: "Пріоритет 1 помилки спочатку",
 },
 {
 mistake: "Невідповідний новий інтерфейс користувача лише в магазині",
 explanation: "Інтерфейс Франкенштейна.",
 correctApproach: "Перепустка в глобальний стиль",
 },
 {
 mistake: "Немає списку проблем",
 explanation: "Забудьте про виправлення.",
 correctApproach: "Трекер зі статусом",
 },
 ],
 summary: "Ви оцінили рубрику полірування, виправили проблеми за пріоритетністю, запустили сліпий тест і зберегли Game Polished - ваш основний фрагмент готовий до планування випуску модуля 12.",
 practiceTask: {
 title: "Здайте Game Polished (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** професійне формування.

### Part A - Рубрика (10 хв)
1. Оцініть 5 областей 1-5
2. Список виправлень для будь-якого ≤3

### Part B - Playtest + виправлення (25 хв)
1. Сліпий 10-хвилинний тест - 3 бали плутанини
2. Спочатку виправте блокувальники + UX
3. Швидке завантаження/аудіо/виконання

### Part C - Збереження демо (5 хв)
1. Відрепетировано демо 60-х
2. **Зберегти в Roblox** →\`Module 11 - Game Polished\` 3. **Практика завершена**`,
 hints: [
 "Відстеження проблем: помилка, пріоритет, статус",
 "Кліпи до/після мотивують команду",
 "Послідовність перемагає один ідеальний кут кімнати",
 ],
 optionalChallenge: "Сліпий тест + виправлення 3 найпоширеніших моментів плутанини.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Game Polished містить модуль 11...",
 options: [
 "All полірування lessons integrated",
 "Only Explorer",
 "Only sound",
 "Only publish",
 ],
 correctAnswer: 0,
 explanation: "Повний модуль.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Пріоритет виправлення починається з...",
 options: [
 "Blockers and bugs",
 "Music volume only",
 "New feature",
 "Terrain color",
 ],
 correctAnswer: 0,
 explanation: "Пріоритетний порядок.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Тест наосліп знайшов...",
 options: [
 "Confusion you missed",
 "Robux",
 "Server IP",
 "Version",
 ],
 correctAnswer: 0,
 explanation: "Свіжі очі.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Рубрика Fun Factor запитує...",
 options: [
 "Would players play again",
 "Part count",
 "Script count",
 "Roblox fee",
 ],
 correctAnswer: 0,
 explanation: "Заручини.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Модуль 11 зберегти назву...",
 options: [
 "Module 11 - Game Polished",
 "Puzzle World",
 "RPG Inventory",
 "SHOWCASE DAY",
 ],
 correctAnswer: 0,
 explanation: "checkpoint.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Урок 11.6 завершується...",
 options: [
 "Module 11 Performance and Polish",
 "Module 12",
 "Course",
 "Coins only",
 ],
 correctAnswer: 0,
 explanation: "Кінцевий модуль 11.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Стабільність означає...",
 options: [
 "No major errors in play session",
 "No UI",
 "No sound",
 "No quests",
 ],
 correctAnswer: 0,
 explanation: "Надійність.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Модуль 12 - це...",
 options: [
 "Release Day",
 "Only racing",
 "Only inventory",
 "Empty",
 ],
 correctAnswer: 0,
 explanation: "Наступний модуль.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Консистенція охоплює...",
 options: [
 "Naming colors audio UI",
 "Only scripts",
 "Only terrain",
 "Only NPC",
 ],
 correctAnswer: 0,
 explanation: "Єдине відчуття.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "полірування означає...",
 options: [
 "Works and feels professional",
 "More features only",
 "Delete tests",
 "Skip UX",
 ],
 correctAnswer: 0,
 explanation: "Якісний бар.",
 },
 ],
 },
}
