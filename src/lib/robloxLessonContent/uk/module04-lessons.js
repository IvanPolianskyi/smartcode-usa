/** Rich UK content for Roblox Module 04 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson41 = {
 lessonId: "lesson-roblox-4-1",
 moduleId: "module-04",
 order: 1,
 title: "4.1 - Архітектура Tycoon",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Сплануйте магнатську ділянку з чіткими машинними зонами",
 "Організуйте Folders Workspace для сюжетів і активів",
 "Назвіть об’єкти для систем дропперів, колекторів і кнопок купівлі",
 "Підготуйте архітектуру для багатокористувацьких сюжетів пізніше",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Модуль 4 - Empire Builder** перетворює ваші навички монет на **магната**: машини заробляють гроші, поки ви розширюєтеся.

**Хід уроку:**
1. **Теорія (40 хв)** - план карти + folders
2. **Практика (~25 хв)** - один початковий сюжетний макет
3. **Вікторина (10 хв)** - проходження **70%**

Використовуйте **Модуль 3 - Симулятор монет** розмістіть або дублюйте як\`Lesson 4.1 - Tycoon Plot\`. Сьогодні **лише макет** - Script дропперів у версії 4.2.`,
 },
 {
 title: "Основний цикл Tycoon",
 content: `| Крок | Почуття гравця |
|------|----------------|
| 1 | Стоять на моїй ділянці |
| 2 | Машина падає значення |
| 3 | Колекціонер перетворює краплі на **Монети** |
| 4 | Купуйте наступну машину за монети |
| 5 | Дохід росте - повтор |

**На відміну від ручного запуску монет:** магнат = **пасивний дохід** + **покупки**.`,
 },
 {
 title: "План folders",
 content: `**Робочий простір:**\`\`\`
Plots/
 PlotA/
 Base/
 DropperZone/
 ConveyorPath/
 CollectorZone/
 BuyButtons/
TycoonAssets/ ← models you clone later
\`\`\`**ReplicatedStorage** (додатково в цьому уроці):\`TycoonConfig\`- таблиці цін в уроці 4.4

**ServerScriptService** (пізніше):\`TycoonService\`,\`PurchaseService\`**Вправа (5 хв):** Створіть порожні Folders з такими іменами в робочій області.`,
 },
 {
 title: "Проектування Ділянка А - зони",
 content: `Побудуйте одну платформу на стадах **40×40** (або використовуйте острівний плоский пісок):

| Зона | Кольоровий заповнювач | Призначення |
|------|------------------|---------|
| **База** | Сіра платформа | Гравець стоїть тут |
| **DropperZone** | Синя колодка | Машина породжує монети |
| **ConveyorPath** | Темно-сіра лінія | Монети ковзають до колектора |
| **CollectorZone** | Зелена колодка | Перетворює краплі в монети |
| **BuyButtons** | Жовті подушечки | Розблокувати оновлення |

**Приклади імен:**
-\`PlotA_Base\`-\`PlotA_DropperSlot\`-\`PlotA_CollectorPad\`-\`Buy_Dropper2_Pad\`(порожній до 4.3)`,
 },
 {
 title: "Конвеєрна доріжка (сьогодні лише візуалізація)",
 content: `Використовуйте Parts з **низьким коефіцієнтом тертя** або злегка **нахиляйте**, щоб монети ковзали (Урок 4.2 додає справжні падіння).

Для макета:
- Крапельниця на **високому** рівні
- Колектор на **низькому** рівні
- Мінімальна ширина доріжки **2 стади**

**Знаки:**\`Dropper →\`і\`Collector\`з Neon стрілками.

**Вправа (10 хв):** Пройдіть від зони крапельниці до колектора в Play - шлях здається очевидним.`,
 },
 {
 title: "Відродження та попередній перегляд прав власності",
 content: `Кожна ділянка потребує:
- **SpawnLocation** увімкнено\`PlotA_Base\`(Нейтрально true)
- Знак:\`Your Tycoon - Plot A\`**Багатокористувацька гра пізніше (4.5):** кожен гравець отримує сюжет. Для 4.1-4.3 **одна ділянка** ваша.

Зберігайте монети **Coin Simulator** в іншому місці на острові - ділянка магната є **окремою зоною** (паркан або міст).`,
 },
 {
 title: "Правила архітектури",
 content: `| Хороша звичка | Шкідлива звичка |
|------------|-----------|
| Одна Folder на систему | 50 скриптів під назвою Script |
| Конфігурація в таблицях (4.4) | Ціна жорстко закодована в 20 файлах |
| Сервер володіє грошима | Клієнт нараховує собі покупки |
| Прибирання сміття (4.2) | Сервер затримки нескінченних Parts |

**Ворота скоро:** додаткова неонова стіна + вивіска\`Expansion Zone\`для майбутніх ярусів.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Plots/PlotA з 5 Folders зон
- [ ] Іменовані колодки для крапельниці, шляху, колектора, області покупки
- [ ] Поява на базі сюжету
- [ ] Зберегти:\`Lesson 4.1 - Tycoon Plot\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Немає структури папок",
 explanation: "Scripts розкидані по робочій області.",
 correctApproach: "Під Folders Plots/PlotA перед кодуванням",
 },
 {
 mistake: "Крапельниця та колектор в одному місці",
 explanation: "Немає потоку ігрового процесу.",
 correctApproach: "Окремі зони з видимою доріжкою",
 },
 {
 mistake: "Кнопка купити в лаві/obby",
 explanation: "Випадкові смерті блокують покупки.",
 correctApproach: "Зона безпечної квартири BuyButtons",
 },
 {
 mistake: "Лише загальні назви Parts",
 explanation: "Неможливо підключити Scripts в 4.2.",
 correctApproach: "Назви стилів PlotA_DropperSlot",
 },
 ],
 summary: "Ви спланували основну петлю магната, створили зони папок Plots/PlotA та створили початкову ділянку з мітками, готову для дроперів, колекторів і блоків для покупки.",
 practiceTask: {
 title: "Сюжет скелета магната (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Один повний макет сюжету, ще жодних крапельниць.

### Part A - Folders (5 хв)
1.\`Workspace/Plots/PlotA\`+ під Folders зони
2.\`TycoonAssets\`порожня Folder для майбутніх моделей

### Part B - Зони будівництва (15 хв)
1. Base platform + SpawnLocation
2. Накладки DropperZone, ConveyorPath, CollectorZone, BuyButtons
3. Neon вивіски для направлення

### Part C - Зберегти (5 хв)
1. Додаткова розширювальна стіна
2. **Зберегти в Roblox** →\`Lesson 4.1 - Tycoon Plot\` 3. **Практика завершена**`,
 hints: [
 "Кольорове кодування зон зараз - замініть машинами пізніше",
 "Ширина доріжки ≥ 2 стади для кочення монет по Parts",
 "Тримайте поля для купівлі видимими з спауна",
 ],
 optionalChallenge: "Другий порожній сюжет PlotB для майбутнього мультиплеєру.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Tycoon loop - це заробити → купити →...",
 options: [
 "Upgrade and expand",
 "Delete terrain only",
 "Remove UI",
 "Never save",
 ],
 correctAnswer: 0,
 explanation: "Повторіть цикл зростання.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Folder PlotA містить...",
 options: [
 "One player tycoon layout",
 "Only sky",
 "All Module 1 lessons",
 "DataStore files",
 ],
 correctAnswer: 0,
 explanation: "Поділянкова організація.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "CollectorZone перетворює...",
 options: [
 "Drops to currency",
 "Players to terrain",
 "UI to parts",
 "Lava to water",
 ],
 correctAnswer: 0,
 explanation: "Колекційні нагороди Монети.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Урок 4.1 здебільшого...",
 options: [
 "Layout and naming",
 "Full DataStore",
 "Publishing",
 "NPC quests",
 ],
 correctAnswer: 0,
 explanation: "Архітектура перед скриптами.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Зона BuyButtons для...",
 options: [
 "Purchasing upgrades",
 "Kill blocks",
 "Spawn only",
 "Sound only",
 ],
 correctAnswer: 0,
 explanation: "Розблокуйте машини монетами.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Конвеєрний шлях з’єднує...",
 options: [
 "Dropper to collector",
 "Tab to Output",
 "Sky to Terrain",
 "HUD to lava",
 ],
 correctAnswer: 0,
 explanation: "Фізичний потік крапель.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Зберігає Folders TycoonAssets...",
 options: [
 "Reusable models",
 "Player passwords",
 "Chat logs",
 "Quiz answers",
 ],
 correctAnswer: 0,
 explanation: "Збірні model для клонування.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Сервер повинен володіти економікою, тому що...",
 options: [
 "Prevents cheating",
 "UI looks nicer",
 "Terrain requires it",
 "No reason",
 ],
 correctAnswer: 0,
 explanation: "Надійні зміни монет на сервері.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Spawn on plot допомагає...",
 options: [
 "Players start at their base",
 "Delete coins",
 "Remove leaderstats",
 "Disable Play",
 ],
 correctAnswer: 0,
 explanation: "Очистити місце початку.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 4.1 зберегти назву...",
 options: [
 "Lesson 4.1 - Tycoon Plot",
 "Coin Simulator",
 "Obby Ready",
 "Saved Coins",
 ],
 correctAnswer: 0,
 explanation: "Зберегти макет перед машинами.",
 },
 ],
 },
}

export const ukLesson42 = {
 lessonId: "lesson-roblox-4-2",
 moduleId: "module-04",
 order: 2,
 title: "4.2 - Дропер монет",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Відтворюйте Parts TycoonCoin з дроппера на таймері",
 "Нагородні монети, коли краплі торкаються панелі колекціонера",
 "Використовуйте сміття для автоматичного очищення деталей",
 "Збалансуйте швидкість появи для продуктивності",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**крапельниця** друкує гроші. **Колекціонер** зберігає його.

**Хід уроку:**
1. **Теорія (40 хв)** - spawn луп + колектор
2. **Практика (~25 хв)** - робоча стартова машина
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 4.1 - Змова магната**.`,
 },
 {
 title: "Parts системи крапельниці",
 content: `в\`PlotA/DropperZone\`:

| Об'єкт | Ім'я |
|--------|------|
| Корпус машини |\`Dropper_01\`|
| Точка появи |\`SpawnPoint\`(маленька невидима або неонова Part) |
| Батьківський Script |\`Dropper_01\`|

**SpawnPoint** Позиція = місце появи монет (над машиною).

**Колекціонер** в\`CollectorZone\`:
- Part\`CollectorPad\`- зелений, Anchored, CanCollide true`,
 },
 {
 title: "Спаунер петля",
 content: `**Script** всередині\`Dropper_01\`:\`\`\`lua
local dropper = script.Parent
local spawnPoint = dropper:WaitForChild("SpawnPoint")
local Debris = game:GetService("Debris")

while true do
 local coin = Instance.new("Part")
 coin.Name = "TycoonCoin"
 coin.Size = Vector3.new(1.2, 1.2, 1.2)
 coin.Shape = Enum.PartType.Ball
 coin.BrickColor = BrickColor.new("Bright yellow")
 coin.Material = Enum.Material.Neon
 coin.Position = spawnPoint.Position + Vector3.new(0, 2, 0)
 coin.Anchored = false
 coin.CanCollide = true
 coin.Parent = workspace

 Debris:AddItem(coin, 25)

 task.wait(2)
end
\`\`\`**\`Debris:AddItem(part, 25)\`** видаляє монету через 25 секунд - запобігає затримці.`,
 },
 {
 title: "Колекційні нагороди Монети",
 content: `**Script** в\`CollectorPad\`:\`\`\`lua
local collector = script.Parent
local COIN_VALUE = 1

collector.Touched:Connect(function(hit)
 if hit.Name ~= "TycoonCoin" then
 return
 end

 local character = hit.Parent
 local humanoid = character and character:FindFirstChildOfClass("Humanoid")
 if not humanoid then
 -- Coin touched collector, not player foot
 end

 local Players = game:GetService("Players")
 -- For solo plot: award to any player who owns tycoon - first player for now:
 local player = Players:GetPlayers()[1]
 if not player then return end

 local stats = player:FindFirstChild("leaderstats")
 local coins = stats and stats:FindFirstChild("Coins")
 if coins then
 coins.Value += COIN_VALUE
 end

 hit:Destroy()
end)
\`\`\`**Вправа (10 хв.):** Спостерігайте за ростом монет, не торкаючись монет вручну.`,
 },
 {
 title: "Поліпшення колекціонера - гравця з монети",
 content: `Кращий шаблон: відстежуйте IntValue власника ділянки пізніше. Наразі нагороджуйте лише **власника ділянки**:

Магазин\`OwnerUserId\`у папці PlotA (IntValue) встановлено ваш UserId у тесті Studio.\`\`\`lua
local plot = workspace.Plots.PlotA
local ownerId = plot:FindFirstChild("OwnerUserId")

-- find player where player.UserId == ownerId.Value
\`\`\`Урок 4.5 додає повне право власності на кілька ділянок. Соло: використання\`Players:GetPlayers()[1]\`якщо один.`,
 },
 {
 title: "Трюк з нахилом конвеєра",
 content: `Кут **ConveyorPath** розташовується на **2-5 градусів** до колектора, щоб кульки котилися.

Або використовуйте матеріал із **низьким тертям** на шляху (лід або спеціальні фізичні Properties пізніше).

**Тест:** монета має дістатися до колекціонера протягом **10 секунд** після появи.`,
 },
 {
 title: "Правила виконання",
 content: `| Правило | Чому |
|------|-----|
| З’являтися кожні **≥ 1 с** | Занадто швидко = сотні Parts |
| Прибирання сміття **20-30 с** | Сітка безпеки |
| Знищити на зборі | Миттєве звільнення пам'яті |
| Тримайте монети всередині огорожі ділянки | Менше безладу в світі |

**Якщо відстає:** збільште\`task.wait\`до 3 секунд.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Dropper породжує жовтий TycoonCoin кожні 2 секунди
- [ ] Колекціонер додає +1 монети та знищує монету
- [ ] Сміття видаляє заблукані монети
- [ ] Зберегти:\`Lesson 4.2 - Coin Dropper\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Без сміття - сотні деталей",
 explanation: "Сервер сповільнюється.",
 correctApproach: "Сміття: Додавайте предмет кожного спауну",
 },
 {
 mistake: "Колектор перевіряє неправильну назву",
 explanation: "TycoonCoin має точно збігатися.",
 correctApproach: "coin.Name = \"TycoonCoin\" у створювачі",
 },
 {
 mistake: "SpawnPoint відсутній",
 explanation: "WaitForChild поступається назавжди.",
 correctApproach: "Дочірня Part під назвою SpawnPoint у Dropper_01",
 },
 {
 mistake: "Anchored true на краплях",
 explanation: "Монети ніколи не переходять до колекціонера.",
 correctApproach: "Anchored false на TycoonCoin",
 },
 ],
 summary: "Ви побудували петлю спауну за допомогою очищення сміття та збирача, який перетворює монети TycoonCoins у монети лідерів - ваш магнат отримує пасивний дохід.",
 practiceTask: {
 title: "Початкова машина з крапельницею (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Дохід у стилі AFK на вашій ділянці.

### Part A - крапельниця (12 хв)
1.\`Dropper_01\`+\`SpawnPoint\`+ породити скрипт
2. Уламки 25 на кожній монеті
3. Грайте - монети з'являються кожні 2 секунди

### Part B - Колекціонер (10 хв)
1.\`CollectorPad\`Скрипт - +1 монети, знищити монету
2. Нахиліть шлях, щоб монети досягли майданчика
3. Стенд 30s - монети збільшуються без ручного збору

### Part C - Зберегти (3 хв)
1. **Зберегти в Roblox** →\`Lesson 4.2 - Coin Dropper\` 2. **Практика завершена**`,
 hints: [
 "Друкуйте монети. Оцінюйте кожні 5 секунд, щоб підтвердити пасивний дохід",
 "Якщо монети застрягли, поставте прапорець «Помилковий прив’язаний» і нахил шляху",
 "Збирач має бути серверним Script",
 ],
 optionalChallenge: "Кольори бронзової/срібної/золотої монети вартістю 1/2/5 (випадкове поява).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "TycoonCoin має бути Anchored...",
 options: [
 "false",
 "true always",
 "only for UI",
 "only in Terrain",
 ],
 correctAnswer: 0,
 explanation: "не Anchored Parts котяться.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Уламки: AddItem запобігає...",
 options: [
 "Part buildup lag",
 "Saving data",
 "UI display",
 "Checkpoints",
 ],
 correctAnswer: 0,
 explanation: "Автоматичне знищення старих крапель.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Колекціонер знищує монету після...",
 options: [
 "Awarding currency",
 "Changing sky",
 "Publishing",
 "Renaming",
 ],
 correctAnswer: 0,
 explanation: "Знищення запобігає подвійному збору.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "цикл while із task.wait...",
 options: [
 "Repeats spawn forever",
 "Runs once",
 "Deletes player",
 "Removes HUD",
 ],
 correctAnswer: 0,
 explanation: "Петля = безперервне виробництво.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "SpawnPoint - це...",
 options: [
 "Where coins appear",
 "Player spawn only",
 "DataStore",
 "VictoryGui",
 ],
 correctAnswer: 0,
 explanation: "Посилання на позицію відродження.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "COIN_VALUE = 1 означає...",
 options: [
 "Each coin gives 1 Coin stat",
 "Deletes 1 part",
 "Waits 1 second",
 "Spawns 1 player",
 ],
 correctAnswer: 0,
 explanation: "Ціна за зібрану краплю.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Перевірка hit.Name гарантує...",
 options: [
 "Only TycoonCoins count",
 "All parts count",
 "Terrain counts",
 "Sky counts",
 ],
 correctAnswer: 0,
 explanation: "Фільтрувати за назвою Parts.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Занадто швидкий інтервал появи викликає...",
 options: [
 "Lag",
 "Better graphics",
 "Auto save",
 "Free Robux",
 ],
 correctAnswer: 0,
 explanation: "Забагато Parts фізики.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Dropper Script працює на...",
 options: [
 "Server",
 "Client HUD only",
 "StarterGui",
 "Player Head",
 ],
 correctAnswer: 0,
 explanation: "Сервер породжує Parts світу.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 4.2 зберегти назву...",
 options: [
 "Lesson 4.2 - Coin Dropper",
 "Tycoon Plot",
 "Coin Functions",
 "Obby Timer",
 ],
 correctAnswer: 0,
 explanation: "Зберегти робочу машину.",
 },
 ],
 },
}

export const ukLesson43 = {
 lessonId: "lesson-roblox-4-3",
 moduleId: "module-04",
 order: 3,
 title: "4.3 - Кнопка покупки",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть панель для покупок, яка знімає монети",
 "Використовуйте прапорець покупки, щоб запобігти подвійним покупкам",
 "Відкрийте другу крапельницю після успішної покупки",
 "Дайте чіткий відгук про успіх і недостатність коштів",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Пасивний дохід - перший крок. **Витрати** на оновлення - це другий крок.

**Хід уроку:**
1. **Теорія (40 хв)** - потік кнопки "купити".
2. **Практика (~25 хв)** - розблокуйте Dropper_02 за 50 монет
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 4.2 - Розпилювач монет**. Заробіть ~50 монет від Dropper_01 перед тестовою покупкою.`,
 },
 {
 title: "Потік покупки (5 кроків)",
 content: `1. Гравець торкається **клавіатури для купівлі**
2. Перевірте **ще не придбано**
3. Прочитайте **leaderstats.Coins**
4. Якщо **Монети >= ціна** → відніміть ціну
5. **Відкрити** нову машину + кнопка приховати`,
 },
 {
 title: "Купити планшетний скрипт",
 content: `Увімкнено\`BuyButtons/Buy_Dropper2_Pad\`- **Script**:\`\`\`lua
local button = script.Parent
local PRICE = 50
local purchased = false

local dropper2 = workspace.Plots.PlotA.DropperZone:WaitForChild("Dropper_02")
local revealFolder = dropper2 -- hidden until buy

-- Start hidden:
dropper2.Parent = nil -- or Transparency 1 on all parts + disabled script

button.Touched:Connect(function(hit)
 if purchased then
 return
 end

 local character = hit.Parent
 if not character then return end
 local humanoid = character:FindFirstChildOfClass("Humanoid")
 if not humanoid then return end

 local player = game:GetService("Players"):GetPlayerFromCharacter(character)
 if not player then return end

 local coins = player:FindFirstChild("leaderstats")
 coins = coins and coins:FindFirstChild("Coins")
 if not coins then return end

 if coins.Value < PRICE then
 print(player.Name .. " needs more coins!")
 button.BrickColor = BrickColor.new("Really red")
 task.wait(0.3)
 button.BrickColor = BrickColor.new("New Yeller")
 return
 end

 coins.Value -= PRICE
 purchased = true

 dropper2.Parent = workspace.Plots.PlotA.DropperZone
 button.Transparency = 1
 button.CanCollide = false

 print(player.Name .. " bought Dropper 2!")
end)
\`\`\``,
 },
 {
 title: "Сховати Dropper_02 до покупки",
 content: `**Перед грою:**
1. Будувати\`Dropper_02\`клон Dropper_01 (той же SpawnPoint + скрипт)
2. Набір\`dropper2.Parent = nil\`у скрипті **один раз** угорі, АБО зберегти в\`ReplicatedStorage\`**При покупці:**\`dropper2.Parent = workspace.Plots.PlotA.DropperZone\`**Тест:** Лише один Dropper_01 на початку; після покупки з'являються дві машини.`,
 },
 {
 title: "Дебоунж придбаного прапора",
 content: `\`purchased = true\`блоки повторюють спам **Touched** - та ж ідея, що й debounce монети.

Без нього:
- Один дотик може заряджатися **3 рази**
- Монети стають негативними (погано)

**Завжди** встановлено\`purchased = true\`**до** розкриття машини.`,
 },
 {
 title: "UX відгук",
 content: `| Результат | Зворотній зв'язок |
|--------|----------|
| Успіх | Кнопка ховається, з’являється Dropper_02, звук друку |
| Недостатньо монет | Червоний спалах 0,3 с, друк повідомлення |
| Вже купив | Ігнорувати дотик |

**BillboardGui** на панелі:\`Buy Dropper 2 - 50 Coins\`Після покупки: знищити інтерфейс або текст\`Purchased ✓\`**Вправа (5 хв):** Торкніться 10 монетами → червоний спалах. Натисніть 60 → успіх.`,
 },
 {
 title: "Підключіться до DataStore",
 content: `Покупки витрачають **збережені** монети, якщо ви закінчили Модуль 3.5 - добре.

**Майбутнє:** зберегти\`purchasedDropper2 = true\`у DataStore, тому покупка зберігається між сеансами (область уроку 4.6).

Сьогодні: сесійної покупки достатньо.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Dropper_02 прихований на початку
- [ ] Купити коштує 50, усунення дребезгу працює
- [ ] Недостатньо коштів показує червоний спалах
- [ ] Зберегти:\`Lesson 4.3 - Purchase Button\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "монети.Вартість -= ціна клієнта",
 explanation: "Безкоштовні оновлення для експлуататорів.",
 correctApproach: "Серверний скрипт на панелі покупки",
 },
 {
 mistake: "Немає купленого прапора",
 explanation: "Потрійна зарядка одним дотиком.",
 correctApproach: "purchased = true після успіху",
 },
 {
 mistake: "Dropper_02 видно з початку",
 explanation: "Немає причин купувати.",
 correctApproach: "Батьківський нульовий або прихований до покупки",
 },
 {
 mistake: "Неправильний шлях лідерів",
 explanation: "Монети ніколи не знімають.",
 correctApproach: "player.leaderstats.Монети на сервері",
 },
 ],
 summary: "Ви створили Script панелі покупок, яка перевіряє монети, один раз знімає ціну, показує Dropper_02 і дає червоний/зелений зворотний зв’язок - цикл оновлення магната живий.",
 practiceTask: {
 title: "Розблокувати Dropper 2 (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** 50 монет відкриває другу машину.

### Part A - Прихована машина (8 хв)
1. Клон\`Dropper_01\`→\`Dropper_02\`(приховано до покупки)
2. Купити колодку\`Buy_Dropper2_Pad\`в зоні BuyButtons

### Part B - Script покупки (12 хв)
1. ЦІНА 50, придбаний прапор, вирахування монет
2. Відкрийте Dropper_02, кнопку приховати
3. Червоний спалах, коли зламався

### Part C - Перевірте та збережіть (5 хв)
1. Заробіть 50+ від Dropper_01 - купіть - запускаються два дроппера
2. **Зберегти в Roblox** →\`Lesson 4.3 - Purchase Button\` 3. **Практика завершена**`,
 hints: [
 "Друкувати монети. Значення до/після покупки під час тестування",
 "Приховати Dropper_02 з Parent = nil під час запуску Script",
 "Сенсорна панель для покупки з Humanoid - станьте на панель",
 ],
 optionalChallenge: "Оновлення цінників BillboardGui для Purchased.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Script покупки має працювати на...",
 options: [
 "Server",
 "LocalScript only",
 "Terrain",
 "Sky",
 ],
 correctAnswer: 0,
 explanation: "Сервер безпечно знімає монети.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "придбано = true запобігає...",
 options: [
 "Buying twice",
 "Spawning coins",
 "Saving data",
 "Moving camera",
 ],
 correctAnswer: 0,
 explanation: "Debounce для покупки.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "монети.Вартість -= ціна, коли...",
 options: [
 "Coins >= price",
 "Always",
 "Never",
 "In Edit only",
 ],
 correctAnswer: 0,
 explanation: "Стягуйте лише якщо це доступно.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Відгук про брак коштів...",
 options: [
 "Red flash + message",
 "Free machine",
 "Delete plot",
 "Reset DataStore",
 ],
 correctAnswer: 0,
 explanation: "Очистити відгук про помилку.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Dropper_02 прихований за допомогою...",
 options: [
 "Parent = nil until buy",
 "Delete forever",
 "LocalScript",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Розкрити шляхом переродження.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "ЦІНА = 50 означає...",
 options: [
 "Costs 50 Coins",
 "Spawns 50 parts",
 "50 players",
 "50 seconds only",
 ],
 correctAnswer: 0,
 explanation: "Вартість валюти.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Посилання GetPlayerFromCharacter...",
 options: [
 "Touch to player account",
 "Part to terrain",
 "UI to sky",
 "Sound to lava",
 ],
 correctAnswer: 0,
 explanation: "Хто купує.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Після успіху частіше купуйте прокладку...",
 options: [
 "Transparency 1 / hidden",
 "Duplicates price",
 "Spawns lava",
 "Removes leaderstats",
 ],
 correctAnswer: 0,
 explanation: "Не можу купити знову.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Покращення Tycoon використовують валюту з...",
 options: [
 "leaderstats Coins",
 "Only print()",
 "Terrain",
 "ClockTime",
 ],
 correctAnswer: 0,
 explanation: "Така сама статистика монет, як у модулі 3.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 4.3 зберегти назву...",
 options: [
 "Lesson 4.3 - Purchase Button",
 "Coin Dropper",
 "Tycoon Plot",
 "Coin Simulator",
 ],
 correctAnswer: 0,
 explanation: "Збереження після розблокування працює.",
 },
 ],
 },
}

export const ukLesson44 = {
 lessonId: "lesson-roblox-4-4",
 moduleId: "module-04",
 order: 4,
 title: "4.4 - Таблиці та апгрейди",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Зберігайте рівні оновлення в таблицях Luau",
 "Змініть швидкість крапельниці та вартість монети з конфігураційних даних",
 "Купуйте оновлення з індексом рівня замість жорстко закодованих Scripts",
 "Відновіть баланс економіки, редагуючи лише номери таблиць",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Жорстко закодований\`if tier == 2 then wait(1.5)\`перерви, коли у вас є 10 рівнів. **Таблиці** це виправляють.

**Хід уроку:**
1. **Теорія (40 хв)** - таблиця підвищення + індекс рівня
2. **Практика (~25 хв)** - 3-рівневі покращення дроппера
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 4.3 - Кнопка придбання**.`,
 },
 {
 title: "Що таке конфігураційна таблиця?",
 content: `**Таблиця** в Luau - це набір записів, як електронна таблиця в коді.\`\`\`lua
local upgrades = {
 { tier = 1, price = 0, spawnWait = 2.0, coinValue = 1 },
 { tier = 2, price = 100, spawnWait = 1.5, coinValue = 2 },
 { tier = 3, price = 300, spawnWait = 1.0, coinValue = 4 },
}
\`\`\`**Змінити баланс?** Тут можна редагувати цифри, а не 20 Scripts.`,
 },
 {
 title: "Доступ до рядків таблиці за індексом",
 content: `\`\`\`lua
local currentTier = 2
local data = upgrades[currentTier]

print(data.spawnWait) -- 1.5
print(data.coinValue) -- 2
\`\`\`**\`#upgrades\`** = скільки існує рівнів.

**Повторити всі рівні:**\`\`\`lua
for i, row in ipairs(upgrades) do
 print(i, row.price, row.spawnWait)
end
\`\`\`**Вправа (5 хв.):** Вивести всі три рівні.`,
 },
 {
 title: "Tier IntValue на графіку",
 content: `Всередині\`PlotA\`додати **IntValue**\`DropperTier\`починаючи з **1**.

Коли гравець купує планшет для оновлення:
1. Перевірка\`Coins >= upgrades[currentTier + 1].price\` 2. Відніміть ціну
3.\`DropperTier.Value += 1\`Script Dropper зчитує рівень кожного породження:\`\`\`lua
local plot = workspace.Plots.PlotA
local tierValue = plot:WaitForChild("DropperTier")
local tier = tierValue.Value
local data = upgrades[tier] or upgrades[1]

task.wait(data.spawnWait)
-- spawn coin, collector uses data.coinValue
\`\`\``,
 },
 {
 title: "Рефакторинг циклу дроппера",
 content: `\`\`\`lua
local upgrades = {
 { tier = 1, price = 0, spawnWait = 2.0, coinValue = 1 },
 { tier = 2, price = 100, spawnWait = 1.5, coinValue = 2 },
 { tier = 3, price = 300, spawnWait = 1.0, coinValue = 4 },
}

local plot = workspace.Plots.PlotA
local spawnPoint = script.Parent:WaitForChild("SpawnPoint")
local tierValue = plot:WaitForChild("DropperTier")
local Debris = game:GetService("Debris")

while true do
 local tier = math.clamp(tierValue.Value, 1, #upgrades)
 local data = upgrades[tier]

 local coin = Instance.new("Part")
 coin.Name = "TycoonCoin"
 coin.Size = Vector3.new(1.2, 1.2, 1.2)
 coin.Shape = Enum.PartType.Ball
 coin.BrickColor = BrickColor.new("Bright yellow")
 coin.Position = spawnPoint.Position + Vector3.new(0, 2, 0)
 coin.Anchored = false
 coin:SetAttribute("CoinValue", data.coinValue)
 coin.Parent = workspace
 Debris:AddItem(coin, 25)

 task.wait(data.spawnWait)
end
\`\`\`**SetAttribute** зберігає значення в Part для читання збирачем.`,
 },
 {
 title: "Колектор читає атрибут",
 content: `\`\`\`lua
local value = hit:GetAttribute("CoinValue") or 1
coins.Value += value
\`\`\`Монети рівня 3 вартістю **4** кожна - гравець відчуває сплеск сили.

**На панелі для покупки оновлення** відображається ціна наступного рівня з таблиці:\`\`\`lua
local nextTier = tierValue.Value + 1
local nextData = upgrades[nextTier]
if not nextData then return end -- max tier
if coins.Value < nextData.price then return end
coins.Value -= nextData.price
tierValue.Value = nextTier
\`\`\``,
 },
 {
 title: "Збалансування робочого процесу",
 content: `| Тест | Цільове відчуття |
|------|-------------|
| Рівень 2 доступний | ~2 хвилини Dropper_01 |
| Рівень 3 має значення | ~5-8 хвилин всього |
| Spawn + WaitForChild зміни | Помітно швидше падає |
| зміна coinValue | Більше число стрибає на HUD |

**Лише редагувати таблицю** → Play → повторити. Справжні дизайнери ігор працюють саме так.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] оновлює таблицю з 3 рядками
- [ ] DropperTier IntValue на PlotA
- [ ] Dropper використовує spawnWait зі столу
- [ ] Колекціонер використовує атрибут CoinValue
- [ ] Зберегти:\`Lesson 4.4 - Upgrade Tables\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "індекс рівня поза діапазоном",
 explanation: "Рівень 4, коли таблиця має 3 рядки.",
 correctApproach: "math.clamp(tier, 1, #upgrades)",
 },
 {
 mistake: "Жорстко закодований wait(2) все ще в циклі",
 explanation: "Таблиця проігнорована.",
 correctApproach: "лише task.wait(data.spawnWait).",
 },
 {
 mistake: "Колекціонер завжди +1",
 explanation: "Атрибут не прочитано.",
 correctApproach: "GetAttribute CoinValue під час звернення",
 },
 {
 mistake: "Ціна в скрипті buy != ціна таблиці",
 explanation: "Десинхронізація заплутує гравців.",
 correctApproach: "Завжди читайте upgrades[nextTier].price",
 },
 ],
 summary: "Ви зберігаєте рівні оновлення в таблицях, керуєте швидкістю появи та вартістю монет з даних і купуєте рівні з цінами з тієї самої конфігурації - робочий процес балансування професійного магната.",
 practiceTask: {
 title: "Трирівневі оновлення (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Купуйте 2-й і 3-й рівень - випадання швидше, вища вартість.

### Part A - Конфігурація (8 хв)
1.\`upgrades\`стіл (3 яруси) в дроппері + купити скрипти
2.\`DropperTier\`IntValue = 1 на PlotA

### Part B - Системи проводів (12 хв)
1. Цикл Dropper використовує spawnWait з рівня
2. Колекціонер додає GetAttribute CoinValue
3. Придбайте рівень покращення планшета (100, потім 300 монет)

### Part C - Баланс і збереження (5 хв)
1. Час перевірки гри до рівня 2 - скоригуйте таблицю, якщо потрібно
2. **Зберегти в Roblox** →\`Lesson 4.4 - Upgrade Tables\` 3. **Практика завершена**`,
 hints: [
 "Друк поточного рівня після кожної покупки",
 "Затисніть індекс рівня, щоб помилки ніколи не порушували spawnер",
 "Одна спільна таблиця оновлень - скопіюйте в обидва Scripts або використайте ModuleScript пізніше",
 ],
 optionalChallenge: "Престиж рівня 4 - ціна 1000, spawnWait 0,6, coinValue 10.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Таблиці конфігурації допомога...",
 options: [
 "Balance without editing many scripts",
 "Delete terrain",
 "Remove UI",
 "Disable save",
 ],
 correctAnswer: 0,
 explanation: "Дизайн, керований даними.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "оновлення[2] отримує...",
 options: [
 "Second tier row",
 "Two players",
 "2 coins always",
 "Error always",
 ],
 correctAnswer: 0,
 explanation: "Числовий індекс в табл.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "DropperTier IntValue зберігає...",
 options: [
 "Current upgrade level",
 "Player name",
 "Sky color",
 "Terrain seed",
 ],
 correctAnswer: 0,
 explanation: "Індекс рівня на ділянці.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "spawnWait в елементах керування таблицею...",
 options: [
 "Seconds between spawns",
 "Player jump",
 "Save file",
 "Tab menu",
 ],
 correctAnswer: 0,
 explanation: "Інтервал нересту на ярус.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "SetAttribute CoinValue дозволяє...",
 options: [
 "Collector read per-coin worth",
 "UI delete",
 "Lava kill",
 "Spawn NPC",
 ],
 correctAnswer: 0,
 explanation: "Метадані Parts.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "цикли ipairs(upgrades)...",
 options: [
 "Each tier row",
 "Every player",
 "All terrain",
 "Only errors",
 ],
 correctAnswer: 0,
 explanation: "Ітерація записів таблиці.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "math.clamp запобігає...",
 options: [
 "Invalid tier index",
 "Saving",
 "Publishing",
 "Lighting",
 ],
 correctAnswer: 0,
 explanation: "Зберігає рівень в діапазоні.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Ціна наступного рівня має бути з...",
 options: [
 "upgrades table",
 "Random()",
 "Player age",
 "Part color",
 ],
 correctAnswer: 0,
 explanation: "Єдине джерело правди.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "coinValue 4 рівня 3 означає...",
 options: [
 "Each drop worth 4 Coins",
 "4 droppers",
 "4 players",
 "4 saves",
 ],
 correctAnswer: 0,
 explanation: "Вартість однієї зібраної монети.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 4.4 зберегти назву...",
 options: [
 "Lesson 4.4 - Upgrade Tables",
 "Purchase Button",
 "Tycoon Plot",
 "Coin Simulator",
 ],
 correctAnswer: 0,
 explanation: "Зберегти систему рівнів.",
 },
 ],
 },
}

export const ukLesson45 = {
 lessonId: "lesson-roblox-4-5",
 moduleId: "module-04",
 order: 5,
 title: "4.5 - Власна ділянка для кожного гравця",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Призначайте незатребувані ділянки, коли гравці приєднуються",
 "Зберігайте OwnerUserId на кожній ділянці для перевірки права власності",
 "Блокуйте покупки та збір на ділянках інших гравців",
 "Сюжети випуску, коли гравці залишають гру",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Сольний сюжет був непоганий. **Багатокористувацькій грі** потрібна **одна база на гравця** - інакше всі крадуть машини один одного.

**Хід уроку:**
1. **Теорія (40 хв)** - претензія, ownsPlot, звільнення
2. **Практика (~25 хв)** - Автоматичне призначення PlotA + PlotB
3. **Вікторина (10 хв)** - проходження **70%**

Дублюйте PlotA → **PlotB** з окремими spawnами та зонами.`,
 },
 {
 title: "Проблема мультиплеєра",
 content: `| Спільна ділянка | Сюжет для кожного гравця |
|-------------|-----------------|
| Гравець B купує на баттоні A | Кожен має власний DropperTier |
| A заробляє монети B | А заробляє лише на ділянці А |
| Хаос на сервері для 2 гравців | Справедливі сервери Tycoon |

**OwnerUserId** = хто контролює цю ділянку.`,
 },
 {
 title: "Налаштування OwnerUserId",
 content: `Всередині **кожної** ділянки (PlotA, PlotB):

**StringValue** названо\`OwnerUserId\`- За замовчуванням\`""\`(порожній = незатребуваний)\`\`\`lua
local function isPlotFree(plot)
 local owner = plot:FindFirstChild("OwnerUserId")
 return owner and owner.Value == ""
end

local function ownsPlot(player, plot)
 local owner = plot:FindFirstChild("OwnerUserId")
 return owner and owner.Value == tostring(player.UserId)
end
\`\`\`**UserId** - це число, яке зберігає StringValue\`tostring(player.UserId)\`.`,
 },
 {
 title: "Вимагати ділянку на приєднання",
 content: `**ServerScriptService** →\`PlotClaimService\`:\`\`\`lua
local Players = game:GetService("Players")
local plotsFolder = workspace.Plots

local function claimPlot(player)
 for _, plot in plotsFolder:GetChildren() do
 if plot:IsA("Folder") or plot:IsA("Model") then
 local owner = plot:FindFirstChild("OwnerUserId")
 if owner and owner.Value == "" then
 owner.Value = tostring(player.UserId)
 local spawn = plot:FindFirstChild("SpawnLocation", true)
 if spawn and player.Character then
 player.Character:MoveTo(spawn.Position + Vector3.new(0, 3, 0))
 end
 print(player.Name .. " claimed " .. plot.Name)
 return plot
 end
 end
 end
 warn("No free plot for " .. player.Name)
end

Players.PlayerAdded:Connect(function(player)
 player.CharacterAdded:Connect(function()
 task.wait(0.5)
 claimPlot(player)
 end)
end)
\`\`\``,
 },
 {
 title: "Ворота покупки та колектор",
 content: `**Кожна** купівля та колекціонер повинні перевірити:\`\`\`lua
local plot = workspace.Plots.PlotA -- or find parent plot

local function ownsPlot(player, plot)
 local owner = plot:FindFirstChild("OwnerUserId")
 return owner and owner.Value == tostring(player.UserId)
end

-- In Touched:
if not ownsPlot(player, plot) then
 return
end
\`\`\`**Знайти ділянку за допомогою кнопки:**\`button.Parent.Parent\`або зберегти посилання на сюжет в атрибуті\`PlotName\`.

**Вправа (10 хв):** Другий гравець не може купувати на ділянці першого гравця.`,
 },
 {
 title: "Відпустіть на PlayerRemoving",
 content: `\`\`\`lua
Players.PlayerRemoving:Connect(function(player)
 for _, plot in plotsFolder:GetChildren() do
 local owner = plot:FindFirstChild("OwnerUserId")
 if owner and owner.Value == tostring(player.UserId) then
 owner.Value = ""
 -- Optional: reset DropperTier, hide Dropper_02, clear buttons
 print("Released " .. plot.Name)
 end
 end
end)
\`\`\`Нові гравці можуть отримати звільнені ділянки під час наступного приєднання.`,
 },
 {
 title: "Тестуйте з 2 гравцями в Studio",
 content: `**Тест** → вкладка **Гравці** → додати другого гравця.

| Тест | Очікується |
|------|----------|
| P1 приєднується | Позовна ділянка A |
| P2 приєднується | Ділянка претензій B |
| P2 торкається P1 купити панелі | Нічого / повідомлення |
| П1 листя | PlotA звільнено |
| P3 приєднується | Може вимагати PlotA |

**BillboardGui** на сюжеті:\`Owner: PlayerName\`після позову.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] PlotA та PlotB з OwnerUserId
- [ ] PlotClaimService призначає під час приєднання
- [ ] Купуйте/колекційний чек ownsPlot
- [ ] PlayerRemoving очищає власника
- [ ] Зберегти:\`Lesson 4.5 - Player Plots\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Число UserId порівняно зі значенням рядка",
 explanation: "Ніколи не збігається - усі заблоковані.",
 correctApproach: "tostring(player.UserId) обидві сторони",
 },
 {
 mistake: "Без звільнення у відпустку",
 explanation: "Ділянка назавжди залишилася порожньою або у власності.",
 correctApproach: "PlayerRemoving очищає OwnerUserId",
 },
 {
 mistake: "Забув ownsPlot на колекторі",
 explanation: "Крадіжка доходу.",
 correctApproach: "Така сама перевірка всіх взаємодій сюжету",
 },
 {
 mistake: "У грі тільки один сюжет",
 explanation: "Другому гравцеві нікуди подітися.",
 correctApproach: "Принаймні PlotA і PlotB",
 },
 ],
 summary: "Ви автоматично вимагали ділянки за допомогою OwnerUserId, охороняли покупки та колекціонери за допомогою ownsPlot і звільняли ділянки у відпустку - ваш магнат готовий до двох гравців.",
 practiceTask: {
 title: "Сюжети автоматичних претензій (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Два гравці, два сюжети, без перехресного використання.

### Part A - Ділянка B + власники (8 хв)
1. Дублюйте PlotA → PlotB (перейменуйте всі внутрішні елементи)
2. OwnerUserId StringValue на обох (порожнє за замовчуванням)

### Part B - PlotClaimService (12 хв)
1. PlayerAdded претендує на перший безкоштовний сюжет
2. ownsPlot in Scripts buy + collector
3. PlayerRemoving випускає сюжет

### Part C - Тест для двох гравців (5 хв)
1. Студійний тест із 2 гравцями
2. Перевірте відсутність перехресної покупки
3. **Зберегти в Roblox** →\`Lesson 4.5 - Player Plots\` 4. **Практика завершена**`,
 hints: [
 "Виводь owner.Value у Output, якщо дотик не спрацював - для налагодження",
 "MoveTo з’являється після вимоги, щоб гравець бачив свою базу",
 "Використовуйте FindFirstChild OwnerUserId у корені ділянки",
 ],
 optionalChallenge: "BillboardGui показує ім’я власника на знаку ділянки.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Порожній OwnerUserId означає...",
 options: [
 "Plot is unclaimed",
 "Plot deleted",
 "Game published",
 "Max tier",
 ],
 correctAnswer: 0,
 explanation: "Вільна ділянка в наявності.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "ownsPlot порівнює...",
 options: [
 "player.UserId to OwnerUserId",
 "Part color",
 "ClockTime",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Перевірка права власності.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "tostring(UserId) потрібен, коли...",
 options: [
 "Owner stored in StringValue",
 "Using IntValue only",
 "Never",
 "UI only",
 ],
 correctAnswer: 0,
 explanation: "Тип має збігатися.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Вилучення гравця має...",
 options: [
 "Clear plot owner",
 "Delete game",
 "Ban everyone",
 "Remove DataStore",
 ],
 correctAnswer: 0,
 explanation: "Безкоштовна ділянка для наступного приєднання.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Другий гравець повинен отримати...",
 options: [
 "PlotB if PlotA taken",
 "Same plot as first",
 "No spawn",
 "All plots",
 ],
 correctAnswer: 0,
 explanation: "Наступна вільна ділянка.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Колекціонер без ownsPlot дозволяє...",
 options: [
 "Stealing others income",
 "Better graphics",
 "Faster save",
 "More terrain",
 ],
 correctAnswer: 0,
 explanation: "Обов'язковий збір воріт.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "PlotClaimService живе в...",
 options: [
 "ServerScriptService",
 "StarterGui",
 "Player Head",
 "Lighting",
 ],
 correctAnswer: 0,
 explanation: "Сервер призначає ділянки.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Мінімум дві ділянки для 2 гравців...",
 options: [
 "True",
 "False - one is enough",
 "Only in Module 1",
 "Never",
 ],
 correctAnswer: 0,
 explanation: "Для кожного потрібна база.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Поява MoveTo після заявки допомагає...",
 options: [
 "Player see their plot",
 "Delete coins",
 "Remove HUD",
 "Disable Play",
 ],
 correctAnswer: 0,
 explanation: "Очистити підключення.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 4.5 зберегти назву...",
 options: [
 "Lesson 4.5 - Player Plots",
 "Upgrade Tables",
 "Coin Dropper",
 "Obby Ready",
 ],
 correctAnswer: 0,
 explanation: "Зберігайте багатокористувацькі сюжети.",
 },
 ],
 },
}

export const ukLesson46 = {
 lessonId: "lesson-roblox-4-6",
 moduleId: "module-04",
 order: 6,
 title: "4.6 - Checkpoint: Tycoon працює",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Поставте магната з двома ділянками з доходом, покупками, оновленнями та власністю",
 "Пройдіть контрольні списки для багатокористувацької гри та контролю якості",
 "Налаштуйте перші 5 хвилин досвіду гравця",
 "Доставте портфоліо модуля 4 Tycoon Works",
 ],
 theory: {
 sections: [
 {
 title: "Контрольна точка модуля 4 (близько 40 хвилин)",
 content: `Здайте **Tycoon Works** - пасивний дохід + покупки + оновлення + **чесна багатокористувацька гра**.

**Обов’язково:**
- План ділянки (4.1)
- Крапельниця + колектор (4.2)
- Купити розблокування (4.3)
- Яруси столу (4.4)
- Позов щодо ділянки (4.5)
- Модуль 3 **Монети** + додатковий **DataStore**`,
 },
 {
 title: "60-хвилинний монтажний спринт",
 content: `| Фаза | Мін | Завдання |
|-------|-----|------|
| 1 | 10 | Folder + аудит імен |
| 2 | 15 | Дроппер + колекціонер + атрибути |
| 3 | 10 | Купити Dropper_02 + підвищення рівня |
| 4 | 10 | Сюжетний тест на двох гравців |
| 5 | 15 | QA матриця + відполіровані деталі |

**Зберегти:**\`Module 4 - Tycoon Works\``,
 },
 {
 title: "Цільовий темп прогресування",
 content: `**Перші 5 хвилин** новий гравець:
- Спаун на **своїй** ділянці
- Дивіться крапельницю, що виробляє монети
- Монети HUD ростуть без клацання
- Зрозумійте жовту етикетку **купити**

**На 8-10 хвилині:**
- Дозвольте собі **Dropper_02** АБО **оновити рівень 2**
- Зверніть увагу на більш швидкий дохід

Якщо темп надто повільний → знизити ціни\`upgrades\`тільки стіл.`,
 },
 {
 title: "Багатокористувацька матриця QA",
 content: `| # | Тест |
|---|------|
| 1 | Гравець A претендує лише на PlotA |
| 2 | Гравець B претендує лише на PlotB |
| 3 | Б не може купити на блокноті А |
| 4 | A не може збирати на колекторі B |
| 5 | A залишає → Ділянку A звільняють → C може вимагати |
| 6 | Оновлення рівня змінює швидкість появи |
| 7 | Немає червоного виходу під час 2-хвилинної роботи в режимі холостого ходу |`,
 },
 {
 title: "Остаточна перевірка архітектури",
 content: `- [ ]\`PlotClaimService\`- приєднатися + вийти
- [ ]\`ownsPlot\`на **кожній** ділянці сенсорний Script
- [ ]\`upgrades\`таблиця - єдине джерело балансу
- [ ]\`DropperTier\`на графік (скопіювати IntValue до PlotB!)
- [ ] Сміття на всіх крапельницях
- [ ] DataStore все ще завантажує монети (Модуль 3.5)`,
 },
 {
 title: "Стандарти презентації",
 content: `- Знаки:\`Your Tycoon\`,\`Buy Upgrade\`,\`Collector\`- Neon доріжку все ще видно
- Таблиця лідерів вкладки показує монети
- Додатковий звук звукознімача на колекторі

**Демонстрація (2 хв):** заявка на сюжет → дивитися дохід → купити оновлення → показати оцінку вкладки.`,
 },
 {
 title: "Попередній перегляд модуля 5",
 content: `**Бійцівський клуб** - здоров’я Humanoid, мечі, пошкодження, відродження на арені.

Ваші магнатські монети та Scripts серверів підготували вас до **бойових економік** і **авторитету сервера** - однакові model, інший жанр.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Усі 7 тестів QA пройшли
- [ ] Два сюжети для двох гравців
- [ ] Прогрес до першого оновлення < 10 хв
- [ ] **Практика завершена** на платформі`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "PlotB відсутній DropperTier",
 explanation: "B використовує рівень A або нуль.",
 correctApproach: "Кожен графік має власні IntValues",
 },
 {
 mistake: "OwnsPlot пропущено після додавання претензії",
 explanation: "Експлойт: крадіжка оновлень.",
 correctApproach: "Повторно перевіряйте кожен торканий Script",
 },
 {
 mistake: "Перевірено тільки соло",
 explanation: "Багатокористувацька перерва після публікації.",
 correctApproach: "Потрібен тест Studio для двох гравців",
 },
 {
 mistake: "Ціни в GUI != таблиці",
 explanation: "Плутанина гравця.",
 correctApproach: "На рекламному щиті написано upgrades[nextTier].price",
 },
 ],
 summary: "Ви інтегрували дроппери, покупки, оновлення столів і сюжети для кожного гравця в Tycoon Works, пройшли перевірку якості для кількох гравців і налаштували ранній прогрес - наступним буде бій Модуля 5.",
 practiceTask: {
 title: "Здати Tycoon Works (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** Повний контрольний пункт модуля 4 проходження QA.

### Part A - Системний аудит (15 хв)
1. Запустіть контрольний список архітектури - виправте прогалини
2. PlotA + PlotB в комплекті з машинами
3. таблиця покращень + DropperTier на **кожній** ділянці

### Part B - Багатокористувацька перевірка якості (15 хв)
1. Тестова матриця 1-7 - відмітка склав/не склав
2. Негайно виправляйте будь-які міжсюжетні помилки

### Part C - Демонстрація та збереження (10 хв)
1. Одиночний запуск: 0 → перше оновлення менше 10 хв
2. **Зберегти в Roblox** →\`Module 4 - Tycoon Works\` 3. **Практика завершена** + додатковий запис для двох гравців`,
 hints: [
 "Виправте вимогу/володіння ділянкою перед балансуванням цін",
 "Для кожного сюжету потрібен власний DropperTier та OwnerUserId",
 "Друк plot.Name у колекторі, коли потрібно налагодження",
 ],
 optionalChallenge: "Другий шлях покупки: швидший дроппер АБО вища вартість - вибір гравця.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Tycoon Works потребує...",
 options: [
 "Income + buy + upgrade + plots",
 "Only terrain",
 "Only obby",
 "No server scripts",
 ],
 correctAnswer: 0,
 explanation: "Повна інтеграція Module 4.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Тест 3 підтверджує...",
 options: [
 "No cross-plot buying",
 "Sky color",
 "Terrain only",
 "Publishing",
 ],
 correctAnswer: 0,
 explanation: "Ізоляція власності.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Кожна ділянка потребує свого...",
 options: [
 "DropperTier and OwnerUserId",
 "Only one SpawnLocation in world",
 "Same owner always",
 "No collector",
 ],
 correctAnswer: 0,
 explanation: "Поділковий стан.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Зміни балансу слід редагувати...",
 options: [
 "upgrades table",
 "Only brick colors",
 "Player name",
 "Roblox URL",
 ],
 correctAnswer: 0,
 explanation: "Баланс, керований конфігурацією.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Цільовий час першого оновлення...",
 options: [
 "Under ~10 minutes",
 "Never",
 "1 second",
 "1 hour minimum",
 ],
 correctAnswer: 0,
 explanation: "Ранній гачок для утримання.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Гравець залишає...",
 options: [
 "Free their plot",
 "Delete all DataStore",
 "Ban others",
 "Remove UI forever",
 ],
 correctAnswer: 0,
 explanation: "Реліз для нових гравців.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Сміття на крапельницях заважає...",
 options: [
 "Lag from part buildup",
 "Saving",
 "Leaderboard",
 "Checkpoints",
 ],
 correctAnswer: 0,
 explanation: "Очищення старих монет.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Тема модуля 5...",
 options: [
 "Fighting / combat",
 "Only coins again",
 "Only publish",
 "Empty",
 ],
 correctAnswer: 0,
 explanation: "Модуль «Бійцівський клуб».",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Червоний вихід на холостому ході означає...",
 options: [
 "Fix before shipping",
 "Ready to publish",
 "Add more lava",
 "Remove plots",
 ],
 correctAnswer: 0,
 explanation: "Помилки = помилки залишаються.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Модуль 4 зберегти назву...",
 options: [
 "Module 4 - Tycoon Works",
 "Lesson 3.1",
 "Obby Ready",
 "Untitled",
 ],
 correctAnswer: 0,
 explanation: "Name портфоліо Checkpoint.",
 },
 ],
 },
}
