/** Roblox Module 10 UK - 8 уроків (prod-92), живий хаб */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson101 = {
 lessonId: "lesson-roblox-10-1",
 moduleId: "module-10",
 order: 1,
 title: "10.1 - Хаб-білд + RS/SSS",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати читабельний простір хабу: Spawn, зони Shop / NPC / Puzzle",
 "Розкласти папки в Workspace за стандартом імен курсу",
 "Підготувати ReplicatedStorage (Remotes, Modules) і ServerScriptService (Systems)",
 "Зробити заготовку ScreenGui магазину під LocalScript (без повної каси)",
 "Нагадати різницю Script vs LocalScript і куди що класти",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 73 з 92)",
 content: `Стартує модуль **«Живий хаб»**. Далі буде магазин на Remotes, анти-чит, NPC, pathfinding, квест, інвентар/Raycast і Ship. Усе це розсиплеться, якщо сьогодні немає **підлоги під системи**.

Сьогодні ти не пишеш повну касу. Сьогодні ти:
1. Будуєш **простір хабу** (спавн + 3 зони).
2. Кладеш **папки-служби** в RS і SSS.
3. Готуєш **порожній каркас ShopGui** + нагадування, чому UI на LocalScript.
4. Зберігаєш Place як базу на весь модуль 10.

хаб - **місто**. RS/SSS - **мерія і склад документів**. Без вулиць і мерії магазин і NPC нема куди ставити.

**Зроби зараз (2 хв):** новий Place або копія найчистішого світу → Save as \`Lesson 10.1 - Hub Base\`.`,
 },
 {
 title: "Що таке хаб у цьому курсі",
 content: `| Хаб | Не хаб |
|-----|--------|
| Одна сцена, з якої «живуть» системи | П’ять незв’язаних Baseplate |
| Зони видно здалеку | Все звалено в одну купу Parts |
| Гравець розуміє куди йти за ≤30–60 с | Красиво, але без маршруту |
| Місце під магазин/NPC/пазл | Лише декоративний лобі без слотів |

Хаб може бути маленьким: платформа 40×40, три кольорові зони, таблички. Краще **маленький і зрозумілий**, ніж гігантський лабіринт без сенсу.

Після M9 у тебе вже є відчуття мережі. M10 збирає **соціальний/сервісний** шар гри: купити, поговорити, виконати квест, розв’язати кімнату.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "План білду на годину (золоті зони)",
 content: `Мінімальна карта:

| Зона | Колір/маркер | Навіщо |
|------|--------------|--------|
| **Spawn** | SpawnLocation | Старт |
| **Shop** | синя підлога / вивіска | Завтра каса 10.2 |
| **NPC** | жовтий «!» | 10.4–10.6 |
| **Puzzle** | фіолетова кімната-коробка | 10.7 |

Кроки білду (≈20–25 хв):
1. Підлога хабу + стіни-орієнтири (не обов’язково повний будинок).
2. SpawnLocation у центрі/вході, Anchored.
3. Три Part-платформи зон з іменами \`Zone_Shop\`, \`Zone_NPC\`, \`Zone_Puzzle\`.
4. Таблички (SurfaceGui або Billboard) з 1 реченням кожна.
5. Світло: одне нормальне Lighting, без спаму Neon на все.

Не тягни весь Toolbox-сіті. Кожна зайва модель = сміття в Explorer перед 11.1.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "Стандарт папок Workspace",
 content: `Запропонований каркас:

\`Workspace/Hub/\`
\` ├── Spawn/\`
\` ├── Zones/\` (Shop, NPC, Puzzle)
\` ├── Props/\` (декор)
\` ├── NPCs/\` (поки порожньо або манекен)
\` └── PuzzleRoom/\` (порожня кімната-заготовка)

Правила імен:
- без 40× \`Part\`;
- префікси зон \`Zone_\`;
- моделі з великої \`NPC_\`, \`Door_\` тощо.

**Зроби зараз (5 хв):** створи папки й перенеси вже зліплені Parts усередину. Якщо щось «тимчасове» - папка \`Hub/_Trash\` на сьогодні, видалиш у кінці уроку.`,
 },
 {
 title: "ReplicatedStorage: що класти і чому",
 content: `**ReplicatedStorage (RS)** - склад, який **бачать і сервер, і клієнт** (реплікується).

Сьогодні створи:

| Папка / об’єкт | Навіщо |
|----------------|--------|
| \`RS/Remotes/\` | Сюди завтра ляжуть ShopBuy / ShopQuery (можна порожньо або вже створити імена) |
| \`RS/Modules/\` | Спільні ModuleScript, які можна require з клієнта й сервера (обережно з секретами!) |
| \`RS/Assets/\` (опційно) | Шаблони UI/іконок, якщо треба клієнту |

**Не клади** в RS серверні секрети: справжні ключі, адмін-паролі, приватні Config з читами. Прайс магазину краще в **SSS/Modules** (лише сервер + те, що сам віддаси через Remote).

Нагадування: клієнт може читати те, що в RS. Тому RS ≠ сейф.

**Зроби зараз (4 хв):** зміни одне значення в table/Config і підтверди нову поведінку.`,
 },
 {
 title: "ServerScriptService: системи хабу",
 content: `**ServerScriptService (SSS)** - скрипти й модулі, які **клієнт не бачить як код для редагування**.

Сьогодні:

| Папка | Навіщо |
|-------|--------|
| \`SSS/Systems/\` | Заготовки \`Srv_Shop\`, \`Srv_Quest\`… (поки можна порожні Script Disabled) |
| \`SSS/Modules/\` | ShopConfig, Inventory, QuestConfig - з’являться в 10.2–10.7 |
| \`SSS/Boot/\` (опційно) | Один Script, що гарантує leaderstats |

Можна одразу створити Disabled-скрипти з правильними іменами - щоб завтра не шукати «куди писати».

\`ServerStorage\` - для Tools/шаблонів, які клонує лише сервер. Якщо плануєш Tool з магазину - папка \`ServerStorage/ShopTools\` вже зараз.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Script vs LocalScript: шпаргалка перед магазином",
 content: `| | Script | LocalScript |
|--|--------|-------------|
| Де працює | Сервер | Клієнт (гравець) |
| Типові місця | SSS, Workspace (сервер) | StarterGui, StarterPlayerScripts, Tool |
| Бачить | Світ правдиво, економіку | Екран, ввід, локальний UX |
| Приклад хабу | Списати Coins, OnServerEvent | Відкрити ShopGui, FireServer |

Помилка: покласти LocalScript у SSS - **не запуститься** як очікуєш. Помилка навпаки: Script у StarterGui не замінить UI-логіку гравця.

Сьогоднішня заготовка: **LocalScript** у ShopGui лише пише \`print("Shop UI ready")\` і ховає/показує Frame. Касу - завтра.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Заготовка ShopGui (без повної логіки)",
 content: `У \`StarterGui\` створи:

1. ScreenGui \`ShopGui\` (\`Enabled = false\` спочатку).
2. Frame \`Main\` (центр, контрастний фон).
3. TextLabel \`Title\` = «Магазин».
4. TextButton \`Close\`.
5. ScrollingFrame \`List\` + UIListLayout.
6. Frame \`ItemTemplate\` (Visible=false) з Name / Price / Buy.
7. TextLabel \`Balance\` = «Монети: -».
8. LocalScript \`ShopClient\` з мінімумом:

\`local gui = script.Parent\`
\`local main = gui:WaitForChild("Main")\`
\`main.Close.MouseButton1Click:Connect(function()\`
\` gui.Enabled = false\`
\`end)\`
\`print("Shop UI ready")\`

Кнопка відкриття на HUD або Part \`ShopOpen\` з ClickDetector/Prompt: поки можна LocalScript у StarterPlayerScripts, який ставить \`ShopGui.Enabled = true\`. Або табличка «Завтра каса тут».

Головне - **Gui існує і відкривається**, список товарів намалюєш у 10.2 з каталогу.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "leaderstats у хабі (перевірка)",
 content: `Магазин і квест модулі 10 їдять **Coins**. Перевір:

1. Чи є серверний Script, що на PlayerAdded створює \`leaderstats/Coins\`?
2. Якщо ні - зроби мінімум у \`SSS/Boot/Leaderstats.lua\` (Script):

\`game.Players.PlayerAdded:Connect(function(player)\`
\` local folder = Instance.new("Folder")\`
\` folder.Name = "leaderstats"\`
\` folder.Parent = player\`
\` local coins = Instance.new("IntValue")\`
\` coins.Name = "Coins"\`
\` coins.Value = 100 -- тестовий старт хабу\`
\` coins.Parent = folder\`
\`end)\`

Тестові 100 монет - ок для навчання. У фіналці баланс підженеш квестами.

Без цієї перевірки завтрашній урок перетвориться на «чому каса не списує».

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Онбординг хабу з першого дня",
 content: `Навіть порожній каркас має пояснювати маршрут:

*«1) Синя зона - магазин. 2) Жовта - NPC. 3) Фіолетова - пазл. Почни з таблички.»*

Постав стрілку з Parts або яскравий Part-маркер від Spawn до Shop.

Перевірка: зайди Play, відвернись від екрана на 5 с, подивись знову - чи видно три зони без пояснення викладача?

Це той самий м’яз, що в Demo Ready, тільки на старті модуля.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Що свідомо НЕ робити сьогодні",
 content: `- Повний магазин з Remotes (це 10.2).
- Повний квест і Raycast (10.6–10.7).
- Десять Toolbox-NPC з чужими скриптами.
- Гігантський open world на 10 хвилин ходьби між зонами.
- Publish Public.

Роби: **білд + папки + Gui-каркас + leaderstats boot + Save**.

Усе «я вже знаю Remotes» можна набросати іменами в RS/Remotes, але логіку Buy залиш на завтра - інакше розмажеш годину.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Чекліст здачі уроку 73 + місток далі",
 content: `- [ ] Хаб з Spawn і 3 зонами (Shop/NPC/Puzzle)
- [ ] Папки Workspace/Hub/...
- [ ] RS/Remotes (+ опційно порожні Remote імена)
- [ ] SSS/Systems і SSS/Modules
- [ ] ShopGui заготовка відкривається/закривається
- [ ] leaderstats.Coins є після Join
- [ ] Таблички онбордингу
- [ ] Save: Lesson 10.1 - Hub Base

| Далі | Що сяде на цей каркас |
|------|------------------------|
| 10.2 | Каса Remotes + Config |
| 10.3 | Захист Buy |
| 10.4–10.5 | NPC у Zone_NPC |
| 10.6–10.7 | Квест + пазл |
| 10.8 | Ship усього хабу |

Якщо каркас кривий - весь модуль болітиме. Краще 40 студів чистого хабу, ніж «місто», у якому не знайти Zone_Shop.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Почати Remotes/касу до папок і зон",
 explanation: "Код є, світу немає - завтра плутанина.",
 correctApproach: "Спочатку білд і RS/SSS каркас",
 },
 {
 mistake: "LocalScript у ServerScriptService",
 explanation: "UI/клієнтська логіка не там живе.",
 correctApproach: "ShopClient у StarterGui/ShopGui",
 },
 {
 mistake: "Секретний прайс у ReplicatedStorage як єдине джерело без серверної копії",
 explanation: "Клієнт бачить RS; каса має контроль на сервері.",
 correctApproach: "ShopConfig у SSS/Modules (завтра)",
 },
 {
 mistake: "40 безіменних Part без папок",
 explanation: "Модуль 10 стане болотом.",
 correctApproach: "Hub/Zones/Props і нормальні імена",
 },
 {
 mistake: "Немає leaderstats на старті хабу",
 explanation: "Магазин і квест нікуди писати монети.",
 correctApproach: "Boot Script на PlayerAdded",
 },
 {
 mistake: "Toolbox-сіті замість трьох зон",
 explanation: "Година згорає, систем немає.",
 correctApproach: "Малий читабельний хаб",
 },
 ],
 summary: "Ти заклав базу живого хабу: зони Shop/NPC/Puzzle, папки Workspace, каркас RS/SSS, заготовку ShopGui на LocalScript і перевірку leaderstats. Далі на цей скелет сяде магазин, NPC і квести модуля 10.",
 practiceTask: {
 title: "Hub Base (~30 хв)",
 difficulty: "beginner",
 description: `**Мета:** простір хабу + службові папки + Gui-каркас.

### Part A - Білд (12 хв)
1. Підлога + SpawnLocation.
2. Zone_Shop, Zone_NPC, Zone_Puzzle з маркерами.
3. 3 короткі таблички.
4. Папки Workspace/Hub/...

### Part B - RS/SSS (8 хв)
1. RS/Remotes (опційно створи ShopBuy, ShopQuery порожніми).
2. SSS/Systems, SSS/Modules.
3. Boot leaderstats.Coins (тестові 100).

### Part C - ShopGui (10 хв)
1. ScreenGui з Main/List/ItemTemplate/Close/Balance.
2. LocalScript: закриття + print ready.
3. Спосіб відкрити Gui (кнопка/Prompt).
4. **Зберегти:** Lesson 10.1 - Hub Base`,
 hints: [
 "Спочатку імена й папки, потім краса",
 "Enabled=false на ShopGui за замовчуванням",
 "Перевір TAB: чи є Coins після Play",
 ],
 optionalChallenge: "Part-стрілка від Spawn до Shop з Neon і підписом «Магазин →».",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Яка головна мета уроку 10.1?",
 options: [
          "Зібрати простір хабу й каркас папок RS/SSS/UI під системи модуля",
          "Одразу завершити Ship усього курсу",
          "Видалити leaderstats",
          "Підключити лише GamePass без хабу",
        ],
 correctAnswer: 0,
 explanation: "База під M10.",
 },
 {
 id: "q2",
 type: MC,
 question: "Які три зони мінімально варто закласти?",
 options: [
          "Лише небо й океан",
          "Shop, NPC, Puzzle (+ Spawn)",
          "Лише 50 Toolbox-дерев",
          "Лише DataStore без світу",
        ],
 correctAnswer: 1,
 explanation: "Слоти під 10.2–10.7.",
 },
 {
 id: "q3",
 type: MC,
 question: "Що таке ReplicatedStorage у контексті хабу?",
 options: [
          "Місце лише для Terrain",
          "Папка, куди клієнт не може нічого бачити ніколи",
          "Сховище, доступне клієнту й серверу (наприклад Remotes)",
          "Заміна Workspace",
        ],
 correctAnswer: 2,
 explanation: "Спільна реплікація.",
 },
 {
 id: "q4",
 type: MC,
 question: "Де краще тримати серверні системи на кшталт Srv_Shop?",
 options: [
          "У LocalScript всередині Part декору",
          "У Lighting",
          "У назві SpawnLocation",
          "У ServerScriptService (Systems)",
        ],
 correctAnswer: 3,
 explanation: "SSS для серверної логіки.",
 },
 {
 id: "q5",
 type: MC,
 question: "Чому LocalScript у SSS - погана ідея для UI магазину?",
 options: [
          "LocalScript завжди швидший у SSS",
          "Клієнтський UI-код має жити в StarterGui / клієнтських контейнерах",
          "SSS видаляє ScreenGui",
          "Remotes не працюють з Gui",
        ],
 correctAnswer: 1,
 explanation: "Правильне місце скриптів.",
 },
 {
 id: "q6",
 type: MC,
 question: "Навіщо заготовка ShopGui вже в 10.1?",
 options: [
          "Щоб замінити Pathfinding",
          "Gui заборонений у 10.2",
          "Щоб завтра в 10.2 лише наповнити логіку Remotes, а не збирати UI з нуля",
          "Щоб вимкнути Explorer",
        ],
 correctAnswer: 2,
 explanation: "Підготовка вітрини.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чому прайс магазину не варто вважати «секретом у RS»?",
 options: [
          "Клієнт може бачити вміст ReplicatedStorage",
          "RS не існує в Roblox",
          "Ціни можна ставити лише в Terrain",
          "RemoteEvent знищує Modules",
        ],
 correctAnswer: 0,
 explanation: "RS не сейф.",
 },
 {
 id: "q8",
 type: MC,
 question: "Навіщо leaderstats.Coins уже на старті хабу?",
 options: [
          "Coins потрібні лише для неба",
          "Без Coins не створюється Part",
          "Це вимикає Prompt",
          "Магазин і квести модуля писатимуть у ту саму економіку",
        ],
 correctAnswer: 3,
 explanation: "Спільна валюта M10.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що свідомо відкладаємо з 10.1 на 10.2?",
 options: [
          "Створення SpawnLocation",
          "Папки Zones",
          "Повну логіку Buy / каталог Remotes",
          "Табличку онбордингу",
        ],
 correctAnswer: 2,
 explanation: "Скоуп control.",
 },
 {
 id: "q10",
 type: MC,
 question: "Який стиль білду кращий для здачі?",
 options: [
          "Гігантське Toolbox-місто без систем",
          "Малий читабельний хаб з іменами й зонами",
          "Порожній Baseplate без Spawn",
          "Лише ParticleEmitter без підлоги",
        ],
 correctAnswer: 1,
 explanation: "Ясність > масштаб.",
 },
 {
 id: "q11",
 type: MC,
 question: "Для чого папка RS/Remotes уже сьогодні?",
 options: [
          "Щоб замінити Workspace",
          "Remotes працюють лише в ServerStorage",
          "Це потрібно тільки для Atmosphere",
          "Щоб було місце під ShopBuy/ShopQuery завтра",
        ],
 correctAnswer: 3,
 explanation: "Каркас мережі.",
 },
 {
 id: "q12",
 type: MC,
 question: "Хто малює екран магазину для гравця?",
 options: [
          "LocalScript у ShopGui (клієнт)",
          "Лише ModuleScript у ServerStorage без Gui",
          "Terrain Editor",
          "PathfindingService",
        ],
 correctAnswer: 0,
 explanation: "UI на клієнті.",
 },
 {
 id: "q13",
 type: MC,
 question: "Навіщо таблички біля зон уже в 10.1?",
 options: [
          "Таблички замінюють Remotes",
          "Без табличок не працює Humanoid",
          "Онбординг: гравець розуміє маршрут хабу",
          "Це вимикає SSS",
        ],
 correctAnswer: 2,
 explanation: "Зрозумілість простору.",
 },
 {
 id: "q14",
 type: MC,
 question: "Що логічно покласти в ServerStorage для майбутнього магазину?",
 options: [
          "Усі LocalScript гравця",
          "Обов’язково весь Workspace",
          "Lighting ефекти лише там",
          "Шаблони Tools/предметів, які клонує сервер",
        ],
 correctAnswer: 3,
 explanation: "Серверні шаблони.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 10.1?",
 options: [
          "Лише теорія без Place",
          "Hub Base: зони, RS/SSS каркас, ShopGui-заготовка, Coins, Save",
          "Повний Ship без папок",
          "Магазин з ціною на клієнті без хабу",
        ],
 correctAnswer: 1,
 explanation: "Потрібен каркас хабу.",
 },
 ],
 },
}

export const ukLesson102 = {
 lessonId: "lesson-roblox-10-2",
 moduleId: "module-10",
 order: 2,
 title: "10.2 - Магазин: RemoteEvent + RemoteFunction",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Пояснити різницю RemoteEvent vs RemoteFunction і коли що брати",
 "Зібрати ShopConfig table товарів з цінами на сервері",
 "Зробити UI магазину (ScrollingFrame + список) на LocalScript",
 "Купівлю через FireServer(itemId) з перевіркою Coins і ціни на сервері",
 "Отримати каталог/баланс через RemoteFunction (InvokeServer)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 74 з 92)",
 content: `Це **якірний урок** модуля «Живий хаб». Сьогодні ти зшиваєш три світи, які вже вчив окремо:

1. **UI на LocalScript** (екран магазину).
2. **Remotes** (клієнт ↔ сервер).
3. **leaderstats Coins** (економіка).

Артефакт: гравець відкриває магазин, бачить список товарів з **серверного** каталогу, натискає «Купити», сервер перевіряє монети й Config, списує Coins, підтверджує успіх.

Завтра (**10.3**) додаси анти-чит і GamePass lite. Сьогодні фундамент має бути чесним: **ціна ніколи не приходить з клієнта**.

Працюй у хабі з **10.1** (папки RS/SSS, заготовка UI). Якщо хабу ще тонкий - одна кімната Shop + Spawn достатньо.

**Зроби зараз (3 хв):** у \`ReplicatedStorage\` створи Folder \`Remotes\` і два об’єкти: RemoteEvent \`ShopBuy\`, RemoteFunction \`ShopQuery\`.`,
 },
 {
 title: "Навіщо магазин саме через мережу",
 content: `| Лише LocalScript | Script + Remotes |
|------------------|------------------|
| Монети можна підробити | Coins змінює сервер |
| Ціна з TextLabel | Ціна з ShopConfig |
| «Купив» лише на одному екрані | Усі бачать оновлений баланс у TAB |
| Демо для себе | Заготовка під мультиплеєр |

UI - **вітрина**. Remote - **дзвінок на склад**. Сервер - **касир з прайс-листом**. Вітрина не має права сама відкривати сейф.

Якщо в Solo «і так працює» без Remote - у справжній грі з FilteringEnabled клієнт **не** керує чужим/серверним станом так, як тобі здається. Вчимо правильний шлях одразу.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "RemoteEvent vs RemoteFunction",
 content: `| | RemoteEvent | RemoteFunction |
|--|-------------|----------------|
| Ідея | «Повідомлення / сигнал» | «Запит → відповідь» |
| Клієнт → сервер | \`FireServer(...)\` | \`InvokeServer(...)\` → return |
| Сервер → клієнт | \`FireClient\` / \`FireAllClients\` | \`InvokeClient\` (рідко, обережно) |
| Типово для магазину | **Buy** (купив / спробував) | **Каталог / баланс** (дай дані) |
| Блокує? | Ні (подія) | Так, чекає відповідь |

Правило курсу:
- **ShopBuy** = RemoteEvent (сервер після перевірки може FireClient «ok/fail»).
- **ShopQuery** = RemoteFunction (клієнт питає \`GetCatalog\` або \`GetBalance\` і отримує table/число).

Не пихай усе в один Remote «на всяк випадок». Різні дієслова = різний тип.

**Зроби зараз (4 хв):** зроби один Remote-виклик і зафіксуй, хто приймає рішення - клієнт чи сервер.`,
 },
 {
 title: "Карта файлів магазину",
 content: `| Місце | Що лежить |
|-------|-----------|
| \`RS/Remotes/ShopBuy\` | RemoteEvent |
| \`RS/Remotes/ShopQuery\` | RemoteFunction |
| \`SSS/Modules/ShopConfig.lua\` | table товарів |
| \`SSS/Srv_Shop.lua\` | OnServerEvent + OnServerInvoke |
| \`StarterGui/ShopGui\` | Frame, ScrollingFrame, шаблон кнопки |
| \`ShopGui/LocalScript\` | відкрити UI, Invoke каталог, FireServer Buy |
| leaderstats.Coins | вже з симулятора/хабу (сервер створює) |

Імена тримай стабільними - завтра анти-чит і NPC чіплятимуться до тих самих Remotes.

Якщо leaderstats ще немає - **спочатку** 8–10 хв мінімальний PlayerAdded → Folder leaderstats → IntValue Coins. Без цього каса порожня.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "ShopConfig - прайс лише тут",
 content: `ModuleScript повертає table:

\`local ShopConfig = {\`
\` speed_coil = {\`
\` id = "speed_coil",\`
\` name = "Speed Coil",\`
\` price = 50,\`
\` description = "Трохи швидший біг (демо)",\`
\` },\`
\` trail_red = {\`
\` id = "trail_red",\`
\` name = "Red Trail",\`
\` price = 30,\`
\` description = "Червоний слід",\`
\` },\`
\`}\`
\`return ShopConfig\`

Сервер:
\`local ShopConfig = require(SSS.Modules.ShopConfig)\`
\`local item = ShopConfig[itemId]\`
\`local price = item.price\`

Клієнт **може** показати ціну з відповіді RemoteFunction (сервер надіслав каталог). Але при Buy сервер **знову** читає Config, не вірить числу з кнопки.

Мінімум для здачі: **2 товари** з різними цінами.

**Зроби зараз (4 хв):** зроби один Remote-виклик і зафіксуй, хто приймає рішення - клієнт чи сервер.`,
 },
 {
 title: "UI магазину: що зібрати руками",
 content: `Мінімальний каркас:

1. ScreenGui \`ShopGui\` (ResetOnSpawn = false часто зручніше).
2. Frame \`Main\` по центру.
3. TextLabel заголовок «Магазин хабу».
4. TextButton \`Close\`.
5. ScrollingFrame \`List\` + UIListLayout.
6. Шаблон \`ItemTemplate\` (Frame): NameLabel, PriceLabel, BuyButton. Спочатку Visible=false; клонує LocalScript.

Кнопка відкриття в хабі: Part з ProximityPrompt «Відкрити магазин» **або** TextButton на HUD. Prompt → LocalScript слухає… стоп: Prompt.Triggered зручніше на сервері FireClient «OpenShop», або LocalScript з Context - для старту досить **клавіші/кнопки HUD** без Prompt.

**Зроби зараз (7 хв):** збери Gui й одну тестову кнопку Buy без логіки - лише print.`,
 },
 {
 title: "RemoteFunction: каталог на клієнт",
 content: `Сервер:

\`ShopQuery.OnServerInvoke = function(player, action)\`
\` if action == "catalog" then\`
\` local list = {}\`
\` for id, item in pairs(ShopConfig) do\`
\` table.insert(list, { id = id, name = item.name, price = item.price, description = item.description })\`
\` end\`
\` return list\`
\` elseif action == "balance" then\`
\` local coins = player.leaderstats.Coins.Value\`
\` return coins\`
\` end\`
\` return nil\`
\`end\`

Клієнт (відкриття магазину):

\`local catalog = ShopQuery:InvokeServer("catalog")\`
\`local balance = ShopQuery:InvokeServer("balance")\`
\`-- намалюй список з catalog, покажи баланс\`

InvokeServer **чекає**. Не кликай Buy 20 разів, поки каталог грузиться - спочатку отримай list.

Помилка новачка: тримати ShopConfig лише в LocalScript. Тоді сервер не має спільного прайсу.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "RemoteEvent: покупка",
 content: `Клієнт на BuyButton:

\`ShopBuy:FireServer(item.id)\` -- лише id!

Сервер:

\`ShopBuy.OnServerEvent:Connect(function(player, itemId)\`
\` if typeof(itemId) ~= "string" then return end\`
\` local item = ShopConfig[itemId]\`
\` if not item then return end\`
\` local coins = player.leaderstats.Coins\`
\` if coins.Value < item.price then\`
\` ShopBuy:FireClient(player, false, "Недостатньо монет")\`
\` return\`
\` end\`
\` coins.Value -= item.price\`
\` giveItem(player, itemId) -- Tool / Attribute / print на старті\`
\` ShopBuy:FireClient(player, true, "Куплено: " .. item.name)\`
\`end)\`

\`giveItem\` сьогодні може бути:
- \`print\` + Attribute \`Owns_speed_coil=true\`;
- або Tool у Backpack;
- або просто підтвердження для демо.

Головне - **списання Coins** і відповідь клієнту.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Клієнт після відповіді Buy",
 content: `LocalScript:

\`ShopBuy.OnClientEvent:Connect(function(ok, message)\`
\` statusLabel.Text = message\`
\` if ok then\`
\` balanceLabel.Text = "Монети: " .. ShopQuery:InvokeServer("balance")\`
\` -- опційно оновити список / вимкнути кнопку\`
\` end\`
\`end)\`

Не міняй \`leaderstats.Coins.Value\` з LocalScript «для швидкості». TAB і так оновиться з реплікації серверного Value; для HUD інколи зручніше Invoke balance або слухати \`Coins.Changed\` на клієнті (лідерстат реплікується).

\`Coins:GetPropertyChangedSignal("Value")\` у LocalScript - нормальний спосіб HUD без зайвого Invoke.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Малювання списку з каталогу",
 content: `Псевдо:

\`for _, entry in ipairs(catalog) do\`
\` local row = template:Clone()\`
\` row.Visible = true\`
\` row.NameLabel.Text = entry.name\`
\` row.PriceLabel.Text = tostring(entry.price) .. " монет"\`
\` row.BuyButton.MouseButton1Click:Connect(function()\`
\` ShopBuy:FireServer(entry.id)\`
\` end)\`
\` row.Parent = list\`
\`end\`

Перед повторним відкриттям - очисти старі рядки (крім template), інакше дублікати кнопок.

UIListLayout + CanvasSize: для 2–4 товарів можна вручну; для довгого списку навчишся AutomaticCanvasSize пізніше.

**Зроби зараз (4 хв):** зроби один Remote-виклик і зафіксуй, хто приймає рішення - клієнт чи сервер.`,
 },
 {
 title: "giveItem без магії (чесні варіанти)",
 content: `| Варіант | Як | Для здачі |
|---------|-----|-----------|
| Attribute | \`player:SetAttribute("Owns_"..id, true)\` | Найшвидше |
| Tool | Clone Tool з SSS.ServerStorage у Backpack | Вау |
| Print only | Output «gave item» | Тимчасово для дебагу |

Не видавай товар **до** перевірки монет. Не видавай, якщо \`alreadyOwns\` і товар одноразовий (сьогодні можна дозволити повторну купівлю ради простоти - але тоді це «пачка», не унікальний скін).

Завтра в 10.3 додаси cooldown і жорсткішу валідацію - залиш код читабельним.

**Зроби зараз (3 хв):** знайди в Place один симптом з таблиці і виправ або підтверди, що його немає.`,
 },
 {
 title: "Типові поломки Remotes у магазині",
 content: `| Симптом | Ймовірна причина |
|---------|------------------|
| Invoke повертає nil | OnServerInvoke не заданий / неправильний action |
| Buy «нічого» | OnServerEvent не в тому Script / ім’я Remote інше |
| Монети не змінюються | Немає leaderstats / пишеш не той Value |
| Купівля безкоштовна | Ціну взяли з клієнта або price=0 у Config |
| Працює лише в Studio Solo «інколи» | Перевір, що Script у SSS, LocalScript у Gui |
| Помилка «not a valid member Remotes» | WaitForChild("Remotes") / порядок реплікації |

Завжди:
\`local RS = game:GetService("ReplicatedStorage")\`
\`local Remotes = RS:WaitForChild("Remotes")\`
\`local ShopBuy = Remotes:WaitForChild("ShopBuy")\`

**Зроби зараз (3 хв):** знайди в Place один симптом з таблиці і виправ або підтверди, що його немає.`,
 },
 {
 title: "Міні-тест економії (обов’язково)",
 content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Відкрити магазин | Список 2+ товарів з цінами |
| 2 | Баланс на UI ≈ TAB | Збігається |
| 3 | Купити з достатніми Coins | Списання, повідомлення ok |
| 4 | Купити з недостатніми | Без списання, fail-текст |
| 5 | Підставити в FireServer чужий id | Ігнор / fail |
| 6 | Output | Немає червоного на шляху |

Якщо пункт 3 зелений, а 4 червоний (все одно продає) - каса дірява, не йди далі.

Save: \`Lesson 10.2 - Hub Shop\`.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Зв’язок з 9.x, 10.3 і Ship",
 content: `| Було | Сьогодні | Далі |
|------|----------|------|
| 9.4 RemoteEvent | Buy + відповідь клієнту | 10.3 rate limit, GamePass kind |
| leaderstats у sim | Та сама валюта в хабі | Квест 10.6 кладе монети сюди ж |
| UI LocalScript | Вітрина магазину | NPC 10.4 не замінює касу |

Якірний критерій: ти можеш за 60 с пояснити викладачу *хто ставить ціну* і *який Remote за що відповідає*.

Чекліст здачі:
- [ ] ShopConfig Module
- [ ] ShopBuy Event + ShopQuery Function
- [ ] UI список з Invoke catalog
- [ ] Buy тільки з itemId
- [ ] Списання Coins на сервері
- [ ] ok/fail на клієнті
- [ ] Save Hub Shop

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "FireServer(itemId, price) і сервер вірить price",
 explanation: "Безкоштовні покупки.",
 correctApproach: "Лише itemId; price з ShopConfig",
 },
 {
 mistake: "Увесь магазин у LocalScript без Remotes",
 explanation: "Немає серверної економіки.",
 correctApproach: "UI на клієнті, каса на сервері",
 },
 {
 mistake: "Плутати FireServer з InvokeServer",
 explanation: "Buy як Function або каталог як Event без відповіді - плутанина.",
 correctApproach: "Buy=Event, Query=Function",
 },
 {
 mistake: "Не WaitForChild Remotes",
 explanation: "Рідкісні nil-помилки при старті.",
 correctApproach: "WaitForChild ланцюжком",
 },
 {
 mistake: "Клонувати ItemTemplate без очистки List",
 explanation: "Дублікати кнопок кожне відкриття.",
 correctApproach: "Очистити рядки перед rebuild",
 },
 {
 mistake: "giveItem до перевірки монет",
 explanation: "Товар без оплати.",
 correctApproach: "Спочатку баланс ≥ price, потім списати й видати",
 },
 ],
 summary: "Ти зібрав повний вертикальний магазин хабу: ShopConfig на сервері, RemoteFunction для каталогу/балансу, RemoteEvent для Buy з перевіркою Coins, UI на LocalScript лише як вітрина. Це якір мережі+економіки перед анти-читом і NPC.",
 practiceTask: {
 title: "Каса хабу (~30–35 хв)",
 difficulty: "intermediate",
 description: `**Мета:** 2 товари, каталог через Invoke, купівля через FireServer.

### Part A - Remotes + Config (8 хв)
1. RS/Remotes: ShopBuy, ShopQuery.
2. Module ShopConfig з 2 товарами.
3. Переконайся, що є leaderstats.Coins (дай собі тестові 100).

### Part B - Сервер (12 хв)
1. OnServerInvoke: catalog + balance.
2. OnServerEvent Buy: validate, price з Config, списати, giveItem lite, FireClient ok/fail.

### Part C - UI (10–15 хв)
1. ShopGui + список з шаблону.
2. Invoke catalog при відкритті.
3. Buy кнопки → FireServer(id).
4. Статус-повідомлення.
5. **Зберегти:** Lesson 10.2 - Hub Shop`,
 hints: [
 "Спочатку catalog print на клієнті, потім Gui",
 "Тестові монети тільки через серверний Script",
 "Імена Remotes мають збігатися символ-в-символ",
 ],
 optionalChallenge: "Третій товар + вже куплений (Attribute) → кнопка Buy Disabled.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Яка головна мета уроку 10.2?",
 options: [
          "Зібрати магазин: UI + Remotes + серверні ціни/Coins",
          "Лише намалювати небо",
          "Видалити RemoteEvent з курсу",
          "Замінити leaderstats на Lighting",
        ],
 correctAnswer: 0,
 explanation: "Вертикальний зріз магазину.",
 },
 {
 id: "q2",
 type: MC,
 question: "Що краще для сигналу «купити»?",
 options: [
          "Лише LocalScript без мережі",
          "RemoteEvent (FireServer itemId)",
          "BindableEvent у Workspace як заміна серверу",
          "Зміна назви Part",
        ],
 correctAnswer: 1,
 explanation: "Buy = подія на сервер.",
 },
 {
 id: "q3",
 type: MC,
 question: "Навіщо RemoteFunction у магазині?",
 options: [
          "Щоб вимкнути Anchored",
          "Щоб створити Terrain",
          "Щоб клієнт отримав каталог/баланс відповіддю InvokeServer",
          "Це заборонений об’єкт",
        ],
 correctAnswer: 2,
 explanation: "Запит → відповідь.",
 },
 {
 id: "q4",
 type: MC,
 question: "Звідки сервер бере ціну товару?",
 options: [
          "З аргументу price від клієнта без перевірки",
          "З TextLabel кнопки напряму",
          "З ClockTime",
          "З ShopConfig на сервері",
        ],
 correctAnswer: 3,
 explanation: "Прайс-лист сервера.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що клієнт має надіслати в ShopBuy?",
 options: [
          "Нові Coins для всіх гравців",
          "itemId",
          "Довільну ціну 0",
          "loadstring код",
        ],
 correctAnswer: 1,
 explanation: "Лише ідентифікатор.",
 },
 {
 id: "q6",
 type: MC,
 question: "Де має жити логіка списання Coins?",
 options: [
          "Лише в LocalScript магазину",
          "У BillboardGui без сервера",
          "У серверному Script (SSS)",
          "У SoundService",
        ],
 correctAnswer: 2,
 explanation: "Економіка на сервері.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чим InvokeServer відрізняється від FireServer?",
 options: [
          "Invoke чекає й повертає результат; Fire - сигнал без return",
          "Вони завжди ідентичні",
          "FireServer працює лише на сервері",
          "InvokeServer не потребує RemoteFunction",
        ],
 correctAnswer: 0,
 explanation: "Подія vs запит.",
 },
 {
 id: "q8",
 type: MC,
 question: "Навіщо WaitForChild для Remotes?",
 options: [
          "Це вимикає магазин",
          "Без цього Config не компілюється",
          "WaitForChild замінює OnServerEvent",
          "Об’єкт може ще не встигнути реплікуватись на клієнт",
        ],
 correctAnswer: 3,
 explanation: "Надійний старт клієнта.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що зробити при недостатніх монетах?",
 options: [
          "Все одно видати товар",
          "Поставити Coins у мінус на клієнті",
          "Не списувати й надіслати fail-повідомлення клієнту",
          "Видалити ShopConfig",
        ],
 correctAnswer: 2,
 explanation: "Чесна відмова.",
 },
 {
 id: "q10",
 type: MC,
 question: "Навіщо ScrollingFrame + шаблон ItemTemplate?",
 options: [
          "Щоб замінити RemoteEvent",
          "Щоб з каталогу намалювати список товарів кнопками Buy",
          "Це обов’язково для Pathfinding",
          "Щоб створити Humanoid",
        ],
 correctAnswer: 1,
 explanation: "UI список.",
 },
 {
 id: "q11",
 type: MC,
 question: "Чому погано тримати єдиний прайс лише в LocalScript?",
 options: [
          "LocalScript не може малювати TextLabel",
          "RemoteFunction тоді заборонений",
          "Coins не реплікуються ніколи",
          "Сервер не має джерела правди для Buy",
        ],
 correctAnswer: 3,
 explanation: "Config на сервері.",
 },
 {
 id: "q12",
 type: MC,
 question: "Який мінімум товарів для здачі уроку?",
 options: [
          "Хоча б 2 з різними цінами",
          "Обов’язково 100",
          "0 - лише теорія",
          "Лише 1 без UI",
        ],
 correctAnswer: 0,
 explanation: "Демо каталогу.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що логічно робити після успішного Buy на клієнті?",
 options: [
          "Призначити собі Coins локально навмання",
          "Вимкнути SSS",
          "Оновити статус/баланс UI (Changed або Invoke balance)",
          "Видалити RemoteFunction",
        ],
 correctAnswer: 2,
 explanation: "Фідбек вітрини.",
 },
 {
 id: "q14",
 type: MC,
 question: "Що буде завтра в 10.3 поверх цього магазину?",
 options: [
          "Видалення всіх Remotes",
          "Лише Terrain Paint",
          "Повна заміна UI на Output",
          "Анти-чит lite (rate limit тощо) і GamePass-словник",
        ],
 correctAnswer: 3,
 explanation: "Наступний урок.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 10.2?",
 options: [
          "Лише порожній Frame без Remotes",
          "Працюючий Hub Shop: catalog Invoke + Buy Event + Coins з Config + Save",
          "Baseplate без Scripts",
          "Магазин з ціною лише на клієнті",
        ],
 correctAnswer: 1,
 explanation: "Потрібен повний вертикальний зріз.",
 },
 ],
 },
}

export const ukLesson103 = {
 lessonId: "lesson-roblox-10-3",
 moduleId: "module-10",
 order: 3,
 title: "10.3 - Анти-чит + GamePass lite",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Пояснити правило Never trust the client для магазину й нагород",
 "Додати rate limit / debounce на Buy Remote",
 "Перевіряти itemId, ціну з Config, баланс Coins і стан гравця на сервері",
 "Відрізнити монети (leaderstats) від GamePass / DevProduct на рівні ідеї",
 "Знати шкільну політику: що можна демо-пояснити, а що не обіцяти в проді без дозволу",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 75 з 92)",
 content: `У **10.2** ти зібрав магазин: UI → Remote → сервер → Coins. Сьогодні робиш так, щоб цей магазин **не зламали за 30 секунд** і розумієш, чим живі Robux-покупки відрізняються від монет хабу.

Два блоки уроку:
1. **Анти-чит lite** для вже існуючого Buy.
2. **GamePass / DevProduct lite** - словник + політика школи, без обов’язку підключати оплату Robux у класі.

Працюй у тому самому Place, де магазин з 10.2. Не починай новий світ.

**Зроби зараз (2 хв):** відкрий серверний скрипт покупки й познач олівцем: де береться ціна? з клієнта чи з Config?`,
 },
 {
 title: "Чому «майже працює» = вразливий магазин",
 content: `| Виглядає ок у Solo | Що зробить цікавий гравець |
|--------------------|----------------------------|
| LocalScript міняє Coins | Додасть собі 999999 |
| Клієнт шле price=0 | Купує все безкоштовно |
| Немає паузи між Buy | Спам 100 подій / секунду |
| Сервер вірить «я маю GamePass» з клієнта | Фейковий преміум |
| Немає логу | Не зрозумієш, що зламалось |

клієнт - це **записка від учня** («я вже здав роботу»). Сервер - **вчитель з журналом**. Журнал ніколи не переписують зі слів учня без перевірки.

**Never trust the client** = будь-яке число з LocalScript (ціна, монети, «успіх») вважається підозрілим, доки сервер не порахував сам.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Чекліст захисту Buy (обов’язковий мінімум)",
 content: `Перед тим як ставити галочку «анти-чит готовий», сервер при кожному Buy має:

1. Знати **хто** купує (\`player\` з OnServerEvent - не ім’я з аргументів клієнта як єдиний доказ).
2. Прийняти лише **itemId** (рядок/ключ), не ціну.
3. Знайти товар у **ShopConfig** на сервері; якщо немає - відмова.
4. Взяти \`price\` **тільки** з Config.
5. Прочитати Coins з **leaderstats** (або свого серверного стану).
6. Якщо \`coins < price\` → FireClient помилка, return.
7. Списати монети, видати товар, підтвердити клієнту.
8. **Rate limit**: не частіше ніж раз на X мс від того самого гравця.

Якщо пункт 2–4 уже були в 10.2 - сьогодні доводиш 6–8 і додаєш лог відмов.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 {
 title: "Rate limit / debounce на Remote",
 content: `Без ліміту експлойт або баг UI може надіслати Buy сотні разів. Навіть «чесний» дабл-клік інколи купує двічі.

Ідея на гравця:

\`local lastBuyAt = {}\` -- [userId] = os.clock()
\`local COOLDOWN = 0.35\`

\`BuyEvent.OnServerEvent:Connect(function(player, itemId)\`
\` local now = os.clock()\`
\` local prev = lastBuyAt[player.UserId] or 0\`
\` if now - prev < COOLDOWN then\`
\` return -- або лічильник підозр\`
\` end\`
\` lastBuyAt[player.UserId] = now\`
\` tryBuy(player, itemId)\`
\`end)\`

\`Players.PlayerRemoving\` - прибери запис з table, щоб не копитись.

Це **lite**, не античит-корпорація. Для курсу достатньо: немає миттєвого спаму + немає ціни з клієнта.

Челендж: після 10 відхилених спам-спроб підряд \`warn\` у Output для викладача (у студії).

**Зроби зараз (4 хв):** спробуй купівлю з 0 монет і після успішної покупки - перевір TAB/Output.`,
 },
 {
 title: "Валідація itemId і типи аргументів",
 content: `Клієнт може надіслати що завгодно: число, table, величезний рядок, nil.

\`local function tryBuy(player, itemId)\`
\` if typeof(itemId) ~= "string" then return end\`
\` if #itemId > 32 then return end\`
\` local item = ShopConfig[itemId]\`
\` if not item then\`
\` deny(player, "Немає такого товару")\`
\` return\`
\` end\`
\` ...\`
\`end\`

Додатково:
- не виконуй \`loadstring\` з клієнта (ніколи);
- не довіряй другому аргументу \`amount\` («куплю 999 штук») без серверних лімітів;
- якщо товар одноразовий - перевір \`alreadyOwns\` до списання монет.

**Зроби зараз (6 хв):** додай typeof-перевірку і COOLDOWN у свій Buy-обробник.`,
 },
 {
 title: "Лог і повідомлення гравцю",
 content: `| Подія | Що бачить гравець | Що бачиш ти в Output |
|-------|-------------------|----------------------|
| Успіх | «Куплено!» + оновлення UI | \`[Shop] ok user item\` |
| Мало монет | «Недостатньо монет» | \`[Shop] deny poor\` |
| Невідомий itemId | «Товар недоступний» | \`[Shop] deny bad id\` |
| Rate limit | Тиша або «Зачекай» | \`[Shop] deny rate\` |

Не показуй гравцю внутрішні шляхи Config. Не кажи «хакер» дитині в UI - досить нейтральної відмови.

Лог потрібен, щоб за 1 хвилину playtest зрозуміти: UI шле сміття, чи економіка не збігається.

**Зроби зараз (4 хв):** зміни одне значення в table/Config і підтверди нову поведінку.`,
 },
 {
 title: "Монети vs GamePass vs DevProduct (словник)",
 content: `| Тип | Що це | Типовий кейс |
|-----|-------|--------------|
| **Coins (leaderstats)** | Ігрова валюта, яку даєш квестами/збором | Щоденний магазин хабу |
| **GamePass** | Разовий Robux-пас «маєш назавжди» (у межах паса) | VIP, x2, ексклюзивний скін |
| **Developer Product** | Robux-покупка, яку можна повторювати | Пачки монет, одноразові пакети |

Важливо для голови 9–13:
- Coins - **ти керуєш** правилами в Lua.
- GamePass/Product - гроші через економіку Roblox; потрібні **ID з Creator Dashboard**, перевірки на сервері через офіційні API (на кшталт MarketplaceService), не «клієнт сказав, що купив».

Сьогодні **не обов’язок** підключати реальний Robux-checkout у класі. Обов’язок - **не плутати** ці три речі в дизайні хабу.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "GamePass lite: як думати в архітектурі",
 content: `Навіть без живих платежів заклади місце в Config:

\`vip_trail = {\`
\` id = "vip_trail",\`
\` kind = "gamepass", -- не "coins"\`
\` gamePassId = 0, -- поставиш справжній ID лише з дозволу\`
\` coinPrice = nil,\`
\`}\`

\`potion = {\`
\` id = "potion",\`
\` kind = "coins",\`
\` price = 50,\`
\`}\`

Логіка tryBuy:
- якщо \`kind == "coins"\` → твоя перевірка Coins;
- якщо \`kind == "gamepass"\` → **окрема** гілка: перевірка володіння пасом на сервері (коли буде дозволено), не списання Coins.

Помилка новачка: кнопка VIP просто робить \`Coins.Value = 999999\` на клієнті. Це не GamePass - це зламана економіка.

Демо в класі (без Robux): Attribute \`DemoVIP=true\`, який ставить **лише викладач/сервер** для тесту гілки UI «преміум виглядає інакше». Підпиши в нотатці: *не продакшен*.

**Зроби зараз (4 хв):** спробуй купівлю з 0 монет і після успішної покупки - перевір TAB/Output.`,
 },
 {
 title: "Політика школи / курсу (прочитай вголос)",
 content: `Зафіксуй для себе і для батьківсько-шкільного контексту:

1. У уроках SmartCode **основна валюта навчання** - Coins і ігрова логіка, не заробіток на дітях.
2. Реальні GamePass/DevProduct підключаємо лише якщо є **дозвіл школи/продукту** і дорослий акаунт з Creator доступом.
3. Не проси однокласників переказувати Robux «для тесту».
4. Не обіцяй у пітчі «зароблю мільйон на пасах», якщо не вмієш захистити сервер.
5. У портфоліо можна написати: *«передбачено слот GamePass; у демо - монетний магазин»*.

Якщо в твоєму класі заборонені будь-які покупки Robux - зроби весь магазин лише на Coins і вивчи словник теоретично. Це все одно здача уроку.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Типові атаки на учнівський магазин (і захист)",
 content: `| Атака / баг | Захист lite |
|-------------|-------------|
| Підроблена ціна з клієнта | Ціна лише з ShopConfig |
| Спам FireServer | COOLDOWN / rate limit |
| Купівля неіснуючого id | Перевірка ключа в Config |
| Подвійна видача товару | alreadyOwns / стек з лімітом |
| «Видай VIP» з LocalScript | Серверна перевірка паса / демо-флаг лише з сервера |
| Від’ємні монети | Перевірка балансу до списання; Value не нижче 0 |

Не треба вивчати хакерські інструменти. Треба **звички серверної перевірки** - вони ті самі, що в 9.4 RemoteEvent і 10.2 магазині.

**Зроби зараз (3 хв):** знайди в Place один симптом з таблиці і виправ або підтверди, що його немає.`,
 },
 {
 title: "Міні-практика безпеки на 15 хвилин",
 content: `Зроби навмисні «атаки» на свій же магазин у Studio (це навчання, не шкода іншим):

1. З LocalScript тимчасово надішли Buy з \`itemId\`, якого немає → має бути deny.
2. Надішли замість рядка число \`123\` → deny.
3. Клацни Buy 10 разів швидко → спрацює cooldown (не 10 покупок).
4. Постав собі мало Coins і купи дороге → повідомлення «недостатньо».
5. Прибери ціну з аргументів клієнта повністю (якщо ще була) → магазин все одно бере Config.

Запиши в нотатку: що вже було захищено з 10.2, що додано сьогодні.

Save: \`Lesson 10.3 - Shop Guard\`.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Чекліст здачі уроку 75",
 content: `- [ ] Buy не приймає ціну з клієнта
- [ ] typeof/існування itemId у Config
- [ ] Перевірка Coins до списання
- [ ] Rate limit на гравця
- [ ] Зрозумілі deny-повідомлення + лог
- [ ] У Config є хоча б коментар/поле kind для coins vs gamepass
- [ ] Політика Robux прочитана (немає фейкових обіцянок оплати)
- [ ] Save Lesson 10.3 - Shop Guard

Далі (10.4) йдемо до NPC - магазин уже не повинен сипатись від дабл-кліку.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Ціна або «успіх покупки» приходить з LocalScript",
 explanation: "Магазин зламаний за хвилину.",
 correctApproach: "itemId з клієнта, price і результат з сервера/Config",
 },
 {
 mistake: "Немає cooldown на Buy",
 explanation: "Дабл-клік і спам ламають економіку/інвентар.",
 correctApproach: "lastBuyAt + COOLDOWN",
 },
 {
 mistake: "Кнопка VIP ставить монети/флаг на клієнті",
 explanation: "Це не GamePass, це чит.",
 correctApproach: "Окрема серверна гілка kind=gamepass / демо-флаг з сервера",
 },
 {
 mistake: "Плутати GamePass і DevProduct",
 explanation: "Неправильна модель монетизації й очікувань.",
 correctApproach: "Пас назавжди vs повторюваний продукт - таблиця уроку",
 },
 {
 mistake: "Обіцяти живі Robux-покупки без політики школи",
 explanation: "Конфлікт з правилами курсу/батьків.",
 correctApproach: "Coins як основа; GamePass - лише з дозволом",
 },
 {
 mistake: "Мовчазна відмова без логу під час дебагу",
 explanation: "Не зрозуміло, чи UI винний, чи сервер.",
 correctApproach: "warn/print теги [Shop] на час навчання",
 },
 ],
 summary: "Ти зміцнив магазин: rate limit, валідація itemId, ціна лише з Config, відмови з логом. Окремо розклав Coins vs GamePass vs DevProduct і шкільну політику lite - хаб готовий до NPC без дірявої каси.",
 practiceTask: {
 title: "Shop Guard (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** захищений Buy + словник GamePass у Config.

### Part A - Аудит 10.2 (5 хв)
1. Знайди OnServerEvent Buy.
2. Випиши: чи є ціна в аргументах клієнта? якщо так - прибери.

### Part B - Захист (15 хв)
1. typeof itemId + наявність у ShopConfig.
2. COOLDOWN 0.35+ с на UserId.
3. deny + повідомлення для poor/bad id/rate.
4. Лог [Shop] у Output.

### Part C - GamePass lite (10 хв)
1. Додай у Config поле kind (coins / gamepass) хоча б на 1 товар-заглушку.
2. У tryBuy розділи гілки (gamepass поки deny «скоро» або демо-флаг сервера).
3. **Зберегти:** Lesson 10.3 - Shop Guard`,
 hints: [
 "Спочатку зламай свій магазин навмисно в Solo - потім полагодь",
 "PlayerRemoving чистить lastBuyAt",
 "Не підключай реальний Robux без дозволу викладача",
 ],
 optionalChallenge: "Лічильник spamStrikes: після 10 rate-deny за хвилину коротко Disabled Prompt/кнопки Buy на клієнті через FireClient.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Що означає Never trust the client у магазині?",
 options: [
          "Ціну, монети й успіх покупки перевіряє/задає сервер, не LocalScript",
          "Клієнт завжди правий",
          "RemoteEvent заборонені",
          "Config має лежати лише в StarterGui",
        ],
 correctAnswer: 0,
 explanation: "Серверна правда.",
 },
 {
 id: "q2",
 type: MC,
 question: "Що клієнт може безпечно надіслати в Buy?",
 options: [
          "Будь-яку ціну 0",
          "itemId товару",
          "Нове значення чужих Coins",
          "Команду loadstring",
        ],
 correctAnswer: 1,
 explanation: "Лише ідентифікатор.",
 },
 {
 id: "q3",
 type: MC,
 question: "Навіщо rate limit / COOLDOWN на Buy?",
 options: [
          "Щоб вимкнути Pathfinding",
          "Щоб замінити leaderstats",
          "Щоб спам і дабл-клік не виконували десятки покупок",
          "Це потрібно лише для Terrain",
        ],
 correctAnswer: 2,
 explanation: "Захист від спаму.",
 },
 {
 id: "q4",
 type: MC,
 question: "Звідки сервер бере price?",
 options: [
          "З TextLabel на клієнті",
          "З аргументу price без перевірки",
          "З Lighting.ClockTime",
          "З ShopConfig на сервері",
        ],
 correctAnswer: 3,
 explanation: "Config = джерело правди.",
 },
 {
 id: "q5",
 type: MC,
 question: "Чим GamePass відрізняється від DevProduct у словнику уроку?",
 options: [
          "Вони абсолютно однакові завжди",
          "Пас зазвичай разовий «назавжди», DevProduct можна купувати повторно",
          "DevProduct існує лише на клієнті",
          "GamePass - це завжди leaderstats Coins",
        ],
 correctAnswer: 1,
 explanation: "Різні моделі покупок.",
 },
 {
 id: "q6",
 type: MC,
 question: "Що є основною навчальною валютою хабу в цьому курсі?",
 options: [
          "Обов’язкові реальні Robux від однокласників",
          "Лише ParticleEmitter",
          "Coins у leaderstats / ігрова економіка",
          "Назви Parts",
        ],
 correctAnswer: 2,
 explanation: "Політика курсу: Coins first.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чому погано вірити LocalScript «я маю VIP»?",
 options: [
          "Клієнт можна підробити; перевірка володіння має бути на сервері",
          "VIP не існує в Roblox",
          "LocalScript не вміє показувати UI",
          "Сервер не бачить гравців",
        ],
 correctAnswer: 0,
 explanation: "Преміум теж Never trust client.",
 },
 {
 id: "q8",
 type: MC,
 question: "Навіщо typeof(itemId) ~= \"string\" → return?",
 options: [
          "Щоб прискорити Terrain",
          "Щоб відкрити діалог NPC",
          "Це вимикає RemoteEvent назавжди",
          "Відсікти сміттєві аргументи з клієнта",
        ],
 correctAnswer: 3,
 explanation: "Валідація входу.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що робити з реальною оплатою Robux у шкільному контексті?",
 options: [
          "Завжди вимагати Robux у однокласників на уроці",
          "Ігнорувати будь-які правила",
          "Лише з дозволом школи/викладача і дорослим Creator-доступом",
          "Підключати лише через LocalScript",
        ],
 correctAnswer: 2,
 explanation: "Політика lite.",
 },
 {
 id: "q10",
 type: MC,
 question: "Навіщо поле kind = coins/gamepass у Config?",
 options: [
          "Щоб змінити колір неба",
          "Щоб tryBuy обрав правильну гілку перевірки",
          "Щоб видалити Prompt",
          "Це лише косметика без сенсу",
        ],
 correctAnswer: 1,
 explanation: "Архітектура товарів.",
 },
 {
 id: "q11",
 type: MC,
 question: "Який playtest ловить дірку «ціна з клієнта»?",
 options: [
          "Змінити Material підлоги",
          "Вимкнути Output",
          "Перейменувати Workspace",
          "Надіслати Buy з підробленою/нульовою ціною і подивитись, чи сервер бере Config",
        ],
 correctAnswer: 3,
 explanation: "Навмисна перевірка.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що показати гравцю при недостатніх монетах?",
 options: [
          "Зрозуміле «Недостатньо монет» (і не списувати)",
          "Тишу й від’ємний баланс",
          "Краш Studio",
          "Автоматичний GamePass",
        ],
 correctAnswer: 0,
 explanation: "UX відмови.",
 },
 {
 id: "q13",
 type: MC,
 question: "Навіщо лог [Shop] у Output під час навчання?",
 options: [
          "Щоб замінити Config",
          "Щоб вимкнути анти-чит",
          "Швидко зрозуміти причину deny під час playtest",
          "Лог заборонений у Studio",
        ],
 correctAnswer: 2,
 explanation: "Діагностика.",
 },
 {
 id: "q14",
 type: MC,
 question: "Який захист від подвійної видачі одноразового товару?",
 options: [
          "Довіра до клієнтського прапорця без сервера",
          "Видалення ShopConfig",
          "Збільшення MaxActivationDistance",
          "Перевірка alreadyOwns до списання/видачі",
        ],
 correctAnswer: 3,
 explanation: "Серверний стан володіння.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 10.3?",
 options: [
          "Лише теорія без змін магазину",
          "Захищений Buy (config price, validate, cooldown) + розуміння GamePass lite + Save",
          "Порожній Baseplate",
          "Клієнтські Coins без сервера",
        ],
 correctAnswer: 1,
 explanation: "Потрібен посилений магазин.",
 },
 ],
 },
}

export const ukLesson104 = {
 lessonId: "lesson-roblox-10-4",
 moduleId: "module-10",
 order: 4,
 title: "10.4 - NPC + Prompt + діалог",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати читабельного NPC (Model, Humanoid або манекен, імена в Explorer)",
 "Налаштувати ProximityPrompt: ObjectText, ActionText, HoldDuration, MaxActivationDistance",
 "Показати діалог гілками if за станом (привіт / зайнятий / прощавай)",
 "Підключити Prompt на сервері й безпечно оновити UI на клієнті",
 "Підготувати NPC як якір для pathfinding (10.5) і квесту (10.6)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 76 з 92)",
 content: `Хаб без NPC відчувається порожнім складом. Сьогодні з’являється **персонаж, з яким можна поговорити**.

Ти зробиш:
1. Модель \`NPC_QuestGiver\` (або інша зрозуміла назва).
2. **ProximityPrompt** - підійшов, натиснув E (або утримав), почалась взаємодія.
3. **Діалог з гілками if** - різні репліки залежно від стану (перший раз / уже говорили / квест пізніше).

Завтра NPC навчиться ходити (10.5), післязавтра стане квестодавцем з table (10.6). Сьогодні фундамент: **білд + Prompt + зрозумілі репліки**.

Не витрачай годину на ідеальне обличчя з Toolbox. Краще стабільний манекен з Billboard «!» і чистим Prompt.

**Зроби зараз (3 хв):** створи Model \`NPC_QuestGiver\` у папці \`Workspace/Hub/NPCs/\`.`,
 },
 {
 title: "NPC у хабі: що мінімально потрібно",
 content: `| Елемент | Навіщо |
|---------|--------|
| Model з зрозумілим ім’ям | Знайти за 2 с у Explorer |
| Humanoid + HumanoidRootPart **або** простий R6/манекен | Щоб виглядав як персонаж; для статичного NPC інколи достатньо Parts |
| PrimaryPart (бажано HRP) | Зручно телепортувати / pathfinding завтра |
| Anchored на «ногах»/торсі якщо стоїть | Не падає і не розлітається |
| BillboardGui з «!» або ім’ям | Гравець здалеку бачить «тут можна говорити» |
| ProximityPrompt у HRP або торсі | Зона взаємодії |

Toolbox-NPC часто тягне зайві Scripts. Правило: **вставив → одразу вимкни/видали підозрілі Scripts**, лиши меш і Humanoid. Свій діалог напишеш ти.

Статичний манекен з 4 Parts теж ок для здачі, якщо Prompt і діалог працюють.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "ProximityPrompt vs ClickDetector",
 content: `| | ProximityPrompt | ClickDetector |
|--|-----------------|---------------|
| Як взаємодіяти | Підійти + клавіша / утримання | Клік мишею по Part |
| Мобільні | Зручніший UX | Гірше на тачі |
| Підказка | ObjectText + ActionText самі | Треба свій UI |
| Для NPC | **Рекомендовано** | Ок для кнопок на стіні |

Сьогодні стандарт хабу - **ProximityPrompt**.

Важливі властивості:

| Property | Типовий старт | Сенс |
|----------|---------------|------|
| \`ObjectText\` | ім’я NPC | Рядок зверху |
| \`ActionText\` | «Поговорити» | Що зробить гравець |
| \`MaxActivationDistance\` | 8–12 | Як близько треба підійти |
| \`HoldDuration\` | 0 або 0.3 | Миттєво vs утримати |
| \`RequiresLineOfSight\` | true спочатку | Не клік крізь стіну |
| \`Enabled\` | true | Можна вимикати під час катсцени |

**Зроби зараз (4 хв):** встав Prompt у HRP, вистав тексти українською коротко.`,
 },
 {
 title: "Де слухати Triggered: сервер",
 content: `\`ProximityPrompt.Triggered\` краще обробляти в **серверному Script** (або Module, який викликає сервер).

Чому:
- завтра квест і нагороди підуть звідси;
- стан «уже вітались» не підробить клієнт;
- один код для всіх гравців.

Схема:

\`local prompt = npc.HumanoidRootPart.ProximityPrompt\`
\`prompt.Triggered:Connect(function(player)\`
\` onTalk(player, npc)\`
\`end)\`

\`player\` - хто натиснув. Завжди перевіряй, що персонаж існує, якщо треба відстань додатково (Prompt уже фільтрує дистанцію, але зайва перевірка не завадить у квестах).

LocalScript може лише **показувати** вікно діалогу після сигналу з сервера (\`FireClient\`), а не вирішувати «який квест здано».

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Діалог = дані + гілки if",
 content: `Не розмазуй текст по 15 місцях. Зроби table реплік (заготовка під QuestConfig завтра):

\`local Lines = {\`
\` greet = "Привіт! Я майстер хабу. Завтра дам завдання.",\`
\` again = "Ми вже говорили. Погуляй хабом, скоро квест.",\`
\` busy = "Зараз зайнятий. Підійди трохи пізніше.",\`
\`}\`

Стан на гравця (Attribute або table на сервері):
- \`TalkCount\`
- або \`HasMetNpc = true/false\`

Гілки:

\`local function onTalk(player, npc)\`
\` local met = player:GetAttribute("HasMet_" .. npc.Name)\`
\` if not met then\`
\` player:SetAttribute("HasMet_" .. npc.Name, true)\`
\` showDialogue(player, Lines.greet)\`
\` else\`
\` showDialogue(player, Lines.again)\`
\` end\`
\`end\`

Це вже **справжній діалог**, не один print на всіх. Для третьої гілки додай Attribute \`NpcBusy\` на NPC або час доби - челендж.

Пам’ятай стиль «ти»: короткі речення, без канцеляриту.

**Зроби зараз (4 хв):** зміни одне значення в table/Config і підтверди нову поведінку.`,
 },
 {
 title: "Як показати текст гравцю",
 content: `| Спосіб | Плюс | Мінус |
|--------|------|-------|
| \`print\` у Output | Швидкий дебаг | Гравець не бачить |
| Billboard над NPC на 3 с | Просто | Мало місця для довгого тексту |
| ScreenGui Dialogue + RemoteEvent | Як у справжніх іграх | Трохи більше збірки |
| TextChatService / чат | Атмосфера | Більше налаштувань |

Рекомендований мінімум уроку:
1. RemoteEvent \`RS/Remotes/DialogueShow\`.
2. Сервер: \`DialogueShow:FireClient(player, text)\`.
3. LocalScript у StarterGui: показує Frame з TextLabel 4–6 секунд, кнопка «Ок» ховає.

Не клади правду діалогу лише в LocalScript. Сервер каже **який** рядок показати (або ключ \`greet\`/\`again\`, а клієнт мапить на текст - теж ок, якщо тексти не секрет).

**Зроби зараз (4 хв):** зроби один Remote-виклик і зафіксуй, хто приймає рішення - клієнт чи сервер.`,
 },
 {
 title: "Billboard «!» і читабельність",
 content: `Гравець має зрозуміти за 2 секунди: *сюди можна підійти*.

Практика:
- BillboardGui на Head/HRP, \`AlwaysOnTop = true\` обережно (не світи крізь усі стіни без потреби);
- TextLabel «!» або ім’я;
- колір контрастний до фону хабу;
- StudsOffset трохи вище голови.

Коли діалог відкритий - можна тимчасово \`prompt.Enabled = false\`, щоб не спамити Triggered. Після закриття UI - знову true (через Remote «діалог закрито» або таймер на сервері).

**Анти-спам:** debounce 0.5–1 с на Triggered для того самого player+npc.

**Зроби зараз (3 хв):** підійди до Prompt у Play і підтверди Triggered один раз.`,
 },
 {
 title: "Лінія видимості і геометрія хабу",
 content: `\`RequiresLineOfSight = true\` рятує від активації крізь стіну магазину. Але:

| Проблема | Фікс |
|----------|------|
| Prompt не з’являється біля NPC | Збільш MaxActivationDistance; перевір, що Prompt у правильному Parent |
| З’являється крізь тонку декорацію | Увімкни LineOfSight; прибери зайву колізію з декору або навпаки |
| Треба кнопка «за прилавком» | false для LineOfSight **свідомо**, не випадково |
| Prompt крутиться не там | Parent = HRP, не випадковий Accessory |

Тест: стань за стіною і переконайся, що випадково не говориш з NPC. Стань перед ним - говориш.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Кілька гілок: шаблон на розширення",
 content: `Заготовка під квест (ще без нагород):

\`local function onTalk(player, npc)\`
\` local status = player:GetAttribute("QuestStatus") or "none"\`
\` if status == "none" then\`
\` show(player, "Хочеш квест? Завтра офіційно. Сьогодні просто познайомимось.")\`
\` player:SetAttribute("HasMet_QuestGiver", true)\`
\` elseif status == "active" then\`
\` show(player, "Ти ще в процесі. Повертайся, коли буде готово.")\`
\` elseif status == "ready" then\`
\` show(player, "Бачу, майже готово до здачі!")\`
\` else\`
\` show(player, "Дякую за допомогу. Гарного дня в хабі!")\`
\` end\`
\`end\`

Сьогодні \`QuestStatus\` може лишатись \`"none"\` завжди - але **гілки вже є**. У 10.6 лише наповниш статуси реальним квестом.

Це і є різниця між «кнопка привіт» і «NPC системи».

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Ввічливий UX діалогу",
 content: `- Текст на 1–3 речення, не стіна.
- ActionText дієсловом: «Поговорити», не «Interact».
- Після закриття діалогу камера/керування не зламані (не лоч камеру без відпуску).
- Не відкривай магазин і діалог одним Prompt без розрізнення.
- Ім’я NPC у ObjectText збігається з тим, що на Billboard.

Мобільний гравець: HoldDuration 0 часто комфортніший. Якщо HoldDuration > 0 - напиши в ActionText «Утримати · Поговорити» коротко.

**Зроби зараз (5 хв):** попроси сусіда / сам зайди «з нуля» - чи зрозуміло, що треба підійти і натиснути?`,
 },
 {
 title: "Зв’язок з 10.5–10.8",
 content: `| Урок | Що додасть на цього NPC |
|------|-------------------------|
| **10.5** | while + Pathfinding патруль, пауза під час діалогу |
| **10.6** | QuestConfig, старт/здача квесту з тих самих гілок |
| **10.7** | Репліка «принеси ключ» / перевірка інвентарю |
| **10.8** | NPC як крок 2 золотого шляху хабу |

Тому сьогодні не видаляй Prompt «потім перероблю». Зроби чисті імена й серверний \`onTalk\` - це буде жити довго.

Save: \`Lesson 10.4 - NPC Dialogue\`.

**Зроби зараз (5 хв):** зміни одне поле в Config/table і підтверди нову поведінку в Play.`,
 },
 {
 title: "Чекліст здачі уроку 76",
 content: `- [ ] NPC Model з зрозумілим ім’ям у папці NPCs
- [ ] ProximityPrompt з ObjectText / ActionText
- [ ] Triggered на сервері
- [ ] Мінімум 2 гілки if (перший раз / знову)
- [ ] Гравець бачить текст (Gui або Billboard), не лише Output викладача
- [ ] Debounce від спаму
- [ ] Немає шкідливих Scripts з Toolbox
- [ ] Save Lesson 10.4 - NPC Dialogue

Якщо є третя гілка (busy/ready) - бонус, не блокер.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Діалог і стан лише в LocalScript",
 explanation: "Легко підробити; квест завтра не прив’яжеш чесно.",
 correctApproach: "Triggered і стан на сервері, клієнт лише показує текст",
 },
 {
 mistake: "ActionText = Interact / ObjectText порожній",
 explanation: "Новачок не розуміє, що робити.",
 correctApproach: "Українські короткі «Поговорити» + ім’я NPC",
 },
 {
 mistake: "Залишити всі Scripts з Free Model NPC",
 explanation: "Конфлікти, бекдори, зайвий AI.",
 correctApproach: "Чистка Scripts, свій Prompt-код",
 },
 {
 mistake: "Одна репліка на всі випадки без if",
 explanation: "Немає відчуття діалогу/стану.",
 correctApproach: "Хоча б greet vs again",
 },
 {
 mistake: "MaxActivationDistance 50+",
 explanation: "Говориш з пів хабу крізь натовп.",
 correctApproach: "8–12 студів, LineOfSight за потреби",
 },
 {
 mistake: "Спам Triggered відкриває 10 вікон",
 explanation: "Брудний UX.",
 correctApproach: "Debounce + Enabled false на час діалогу",
 },
 ],
 summary: "Ти зібрав NPC хабу з ProximityPrompt і діалогом на гілках if: сервер вирішує репліку, клієнт показує текст. Це якір для патруля, квесту й усього Ship-шляху модуля 10.",
 practiceTask: {
 title: "Поговорити з майстром (~30 хв)",
 difficulty: "beginner",
 description: `**Мета:** NPC з Prompt і мінімум двома репліками за станом.

### Part A - Білд (8 хв)
1. Model NPC_QuestGiver в Hub/NPCs.
2. Billboard «!» або ім’я.
3. ProximityPrompt: ObjectText, ActionText «Поговорити», дистанція 8–12.

### Part B - Серверний діалог (12 хв)
1. Script: Triggered → onTalk(player).
2. Attribute HasMet_… : перший раз / знову.
3. Table Lines з 2–3 текстами.
4. Debounce 0.5+ с.

### Part C - Показ гравцю (10 хв)
1. Remote DialogueShow + ScreenGui або Billboard на 4–6 с.
2. Перевір LineOfSight / дистанцію.
3. **Зберегти:** Lesson 10.4 - NPC Dialogue`,
 hints: [
 "Спочатку print(player.Name), потім Gui",
 "Чисти Toolbox Scripts до написання свого коду",
 "Короткі репліки легше читати на мобільному",
 ],
 optionalChallenge: "Третя гілка busy + кнопка «Ок» у Gui, що шле Remote «dialogue closed» і знову вмикає Prompt.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Чому для NPC у хабі курсу рекомендують ProximityPrompt?",
 options: [
          "Зручна підказка ObjectText/ActionText і кращий мобільний UX",
          "Він єдиний об’єкт, який існує в Roblox",
          "Він замінює Humanoid",
          "Він автоматично дає GamePass",
        ],
 correctAnswer: 0,
 explanation: "Стандарт взаємодії з NPC.",
 },
 {
 id: "q2",
 type: MC,
 question: "Де краще обробляти Prompt.Triggered для діалогу/квесту?",
 options: [
          "Лише в LocalScript без сервера",
          "На сервері",
          "У Lighting",
          "У Terrain Editor",
        ],
 correctAnswer: 1,
 explanation: "Стан і безпека.",
 },
 {
 id: "q3",
 type: MC,
 question: "Навіщо ObjectText і ActionText?",
 options: [
          "Щоб збільшити FPS",
          "Щоб створити leaderstats",
          "Щоб гравець бачив ім’я/контекст і що саме зробить клавіша",
          "Це обов’язкові поля DataStore",
        ],
 correctAnswer: 2,
 explanation: "Читабельний UX.",
 },
 {
 id: "q4",
 type: MC,
 question: "Мінімум «справжнього» діалогу в цьому уроці - це…",
 options: [
          "Один print без Prompt",
          "Лише ParticleEmitter",
          "Видалення NPC після кліку",
          "Дві гілки if за станом (наприклад перший раз / знову)",
        ],
 correctAnswer: 3,
 explanation: "Гілки реплік.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що небезпечного в Free Model NPC?",
 options: [
          "Вони завжди без Humanoid",
          "Зайві/шкідливі Scripts, які варто прибрати",
          "ProximityPrompt у них заборонений",
          "Їх не можна перейменувати",
        ],
 correctAnswer: 1,
 explanation: "Чистка Toolbox.",
 },
 {
 id: "q6",
 type: MC,
 question: "Яка роль LocalScript у діалозі за схемою уроку?",
 options: [
          "Самовирішувати нагороду квесту",
          "Писати Coins у leaderstats",
          "Показати текст/UI після сигналу сервера",
          "Вимикати PathfindingService глобально",
        ],
 correctAnswer: 2,
 explanation: "UI = відображення.",
 },
 {
 id: "q7",
 type: MC,
 question: "Навіщо Billboard «!» над NPC?",
 options: [
          "Щоб здалеку було видно: тут можна взаємодіяти",
          "Щоб замінити Prompt",
          "Щоб відкрити магазин без Remotes",
          "Це потрібно лише для Raycast",
        ],
 correctAnswer: 0,
 explanation: "Орієнтир у просторі.",
 },
 {
 id: "q8",
 type: MC,
 question: "Типовий MaxActivationDistance для розмови з NPC?",
 options: [
          "Обов’язково 0",
          "Обов’язково 500",
          "Дистанція не існує в Prompt",
          "Близько 8–12 студів (не пів карти)",
        ],
 correctAnswer: 3,
 explanation: "Близька зона.",
 },
 {
 id: "q9",
 type: MC,
 question: "Навіщо RequiresLineOfSight = true?",
 options: [
          "Щоб вимкнути Anchored",
          "Щоб створити table квесту",
          "Щоб складніше активувати Prompt крізь стіну",
          "Щоб прискорити ComputeAsync",
        ],
 correctAnswer: 2,
 explanation: "Лінія видимості.",
 },
 {
 id: "q10",
 type: MC,
 question: "Навіщо debounce на Triggered?",
 options: [
          "Щоб видалити HumanoidRootPart",
          "Щоб спам клавіші не відкривав купу діалогів",
          "Це замінює if-гілки",
          "Щоб обов’язково зламати UI",
        ],
 correctAnswer: 1,
 explanation: "Анти-спам UX.",
 },
 {
 id: "q11",
 type: MC,
 question: "Як діалог 10.4 готує урок 10.6?",
 options: [
          "Треба видалити Prompt перед квестом",
          "Квест працює лише без NPC",
          "table реплік заборонені в квестах",
          "Ті самі гілки if можна наповнити QuestStatus і QuestConfig",
        ],
 correctAnswer: 3,
 explanation: "Каркас під квест.",
 },
 {
 id: "q12",
 type: MC,
 question: "Чому ActionText «Поговорити» краще за «Interact» для дітей на курсі?",
 options: [
          "Зрозуміла дієслово-підказка українською/простою мовою",
          "Interact швидше виконується рушієм",
          "Поговорити вимикає LineOfSight",
          "Interact не підтримується на PC",
        ],
 correctAnswer: 0,
 explanation: "Ясність для гравця.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що зробити з Prompt під час відкритого діалогу (хороший UX)?",
 options: [
          "Видалити NPC з гри",
          "Поставити MaxActivationDistance = 500",
          "Тимчасово Enabled = false або ігнорувати спам debounce",
          "Перенести логіку лише на клієнт назавжди",
        ],
 correctAnswer: 2,
 explanation: "Контроль повторів.",
 },
 {
 id: "q14",
 type: MC,
 question: "Навіщо table Lines для реплік?",
 options: [
          "Table вимикає сервер",
          "Без table Triggered не працює",
          "Це обов’язково замінює Attributes",
          "Тексти в одному місці, легше міняти й розширювати",
        ],
 correctAnswer: 3,
 explanation: "Дані діалогу.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 10.4?",
 options: [
          "Лише Model без Prompt",
          "NPC з Prompt, серверними гілками діалогу і видимим текстом + Save",
          "Порожній Baseplate",
          "Тільки магазин без NPC",
        ],
 correctAnswer: 1,
 explanation: "Потрібен робочий talk-loop.",
 },
 ],
 },
}

export const ukLesson105 = {
 lessonId: "lesson-roblox-10-5",
 moduleId: "module-10",
 order: 5,
 title: "10.5 - Pathfinding + while",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Пояснити PathfindingService: ComputeAsync, waypoints, статус шляху",
 "Налаштувати AgentParams (радіус/висота) під свого NPC",
 "Зробити патруль NPC по точках через while + перехід між waypoint",
 "Обробити Failed / Blocked шлях і не крутити вічний while без wait",
 "Підготувати рухомого NPC до квесту 10.6 (квестодавець / охоронець зони)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 77 з 92)",
 content: `Учора NPC умів говорити (Prompt + діалог). Сьогодні він **ходить сам**: патруль хабом між точками A → B → C → A.

Інструмент Roblox: **PathfindingService**. Ти кажеш «хочу звідси туди», движок шукає обхід стін і повертає **waypoints** (точки маршруту). Твій код веде Humanoid по цих точках в циклі **while**.

Навіщо в хабі:
- охоронець біля магазину;
- квестодавець, що не стоїть статуєю;
- гід до зони пазла (lite).

Не будуй навігацію на пів карти. Зроби **2–3 Parts-якорі** \`Patrol_1\`, \`Patrol_2\`, \`Patrol_3\` і стабільний цикл.

**Зроби зараз (3 хв):** у папці NPC додай порожні Parts (CanCollide false, Transparency 1) як точки патруля. Імена важливі.`,
 },
 {
 title: "Pathfinding ≠ Tween і ≠ просто MoveTo навмання",
 content: `| Підхід | Що робить | Мінус у хабі |
|--------|-----------|--------------|
| \`Humanoid:MoveTo(pos)\` один раз | Йде по прямій | Вріжеться в стіну |
| Tween CFrame NPC | «Летить» по кривій | Не фізичний персонаж |
| **Pathfinding** | Шукає шлях між перешкодами | Треба обробляти Fail/Blocked |

Pathfinding малює невидимий маршрут «як би проклав розумний пішохід». Ти лише **виконуєш** кроки.

Важливо: шлях рахується на **сервері** (Script у SSS або в моделі NPC на сервері). LocalScript для патруля охоронця з нагородами/зонами - погана ідея.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Словник уроку",
 content: `| Термін | Простими словами |
|--------|------------------|
| \`Path\` | Об’єкт маршруту |
| \`ComputeAsync(from, to)\` | «Порахуй шлях з A в B» (чекає) |
| \`Status\` | Success / NoPath / ClosestNoPath… |
| \`GetWaypoints()\` | Список точок маршруту |
| \`Waypoint.Position\` | Куди йти |
| \`Waypoint.Action\` | Walk / Jump (іноді треба стрибок) |
| \`AgentParams\` | «Який розмір агента» (радіус, висота, can jump) |
| \`Blocked\` | Шлях перекрили під час руху |

ComputeAsync - GPS побудував маршрут. Waypoints - повороти. while - ти їдеш від стрілки до стрілки. Blocked - дорогу перекрили ремонтом, треба перерахувати.

**Зроби зараз (5 хв):** запусти NPC на короткий маршрут і перевір, що він не застряг у першій точці.`,
 },
 {
 title: "Мінімальний каркас ComputeAsync",
 content: `Псевдокод (сервер):

\`local PFS = game:GetService("PathfindingService")\`
\`local path = PFS:CreatePath({\`
\` AgentRadius = 2,\`
\` AgentHeight = 5,\`
\` AgentCanJump = true,\`
\`})\`

\`path:ComputeAsync(root.Position, target.Position)\`

\`if path.Status ~= Enum.PathStatus.Success then\`
\` warn("no path", path.Status)\`
\` return\`
\`end\`

\`local waypoints = path:GetWaypoints()\`
\`for i, wp in ipairs(waypoints) do\`
\` if wp.Action == Enum.PathWaypointAction.Jump then\`
\` humanoid.Jump = true\`
\` end\`
\` humanoid:MoveTo(wp.Position)\`
\` humanoid.MoveToFinished:Wait()\`
\`end\`

\`CreatePath\` один раз на NPC (або пересоздавай обережно). \`ComputeAsync\` - **кожен новий пункт призначення**.

Не забудь: у NPC має бути **Humanoid** + **HumanoidRootPart**, модель не Anchored цілком як статуя (HRP може бути під контролем Humanoid).

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "AgentParams: чому NPC «не знаходить шлях»",
 content: `| Симптом | Ймовірна причина | Що спробувати |
|---------|------------------|---------------|
| NoPath між близькими точками | Занадто товстий AgentRadius | Зменшити радіус 1.5–2 |
| Ріже кути / застряє в вузьких дверях | Радіус більший за прохід | Ширші двері або менший агент |
| Не стрибає на уступ | AgentCanJump false / немає Jump | true + обробка Action.Jump |
| Шлях через декоративні Parts | Декор CanCollide true | Зробити декор без колізії або PathfindingModifier |
| Точки патруля всередині стіни | Position якоря в геометрії | Винеси Patrol Parts у прохід |

Спочатку перевір **очима**: чи людина пройшла б між Patrol_1 і Patrol_2 без noclip? Якщо ні - pathfinding не винен.

**Зроби зараз (5 хв):** запусти NPC на короткий маршрут і перевір, що він не застряг у першій точці.`,
 },
 {
 title: "Патруль: while true + список точок",
 content: `Ідея:

\`local points = { Patrol_1, Patrol_2, Patrol_3 }\`
\`local index = 1\`

\`while true do\`
\` local target = points[index]\`
\` local ok = followPath(npc, target.Position)\`
\` if ok then\`
\` index = index % #points + 1\`
\` else\`
\` task.wait(1) -- не крути CPU в Fail\`
\` end\`
\` task.wait(0.2)\`
\`end\`

\`followPath\` = ComputeAsync + цикл waypoints з MoveToFinished.

Чому **while**, а не один for назавжди зовні: патруль - **нескінченна поведінка** до кінця гри. while - правильний ритм «знову й знову».

Обов’язково:
- \`task.wait\` або Wait на MoveToFinished всередині;
- не робити новий Compute кожен кадр без потреби;
- при Fail - пауза, не tight loop.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "MoveToFinished і таймаути",
 content: `\`MoveToFinished:Wait()\` зручний, але NPC може застрягти вічно, якщо шлях «успішний», а фізика заблокувала.

Практика:
- обгортка з \`task.delay\` / race: якщо за N секунд не Finished - \`humanoid:MoveTo\` ще раз або перерахуй шлях;
- або слухай \`path.Blocked\` і Recalculate.

Lite на годину:
\`local finished = false\`
\`local conn = humanoid.MoveToFinished:Connect(function() finished = true end)\`
\`humanoid:MoveTo(wp.Position)\`
\`local t0 = os.clock()\`
\`while not finished and os.clock() - t0 < 6 do task.wait(0.1) end\`
\`conn:Disconnect()\`
\`if not finished then return false end\`

Так while патруля не «помре» мовчки на одному валуні.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Blocked і перерахунок",
 content: `Гравці, двері магазину, тимчасові Parts можуть перекрити маршрут після Compute.

\`path.Blocked:Connect(function(blockedWaypointIndex)\`
\` -- прапорець needsRecompute = true\`
\`end)\`

У followPath: якщо needsRecompute - вийди з циклу waypoints і ComputeAsync знову до тієї ж цілі.

Не обов’язково робити ідеальний AI. Для здачі уроку достатньо:
1. Успішний патруль по 3 точках без гравця.
2. Якщо поставити стіну-коробку на шляху - NPC або обходить після рекомпуту, або чесно warn і чекає (задокументуй поведінку).

Головне - **не падати скриптом** і не їсти FPS while без wait.

**Зроби зараз (5 хв):** запусти NPC на короткий маршрут і перевір, що він не застряг у першій точці.`,
 },
 {
 title: "Зв’язок з діалогом і квестом",
 content: `Патруль і Prompt живуть разом:

| Ситуація | Поведінка |
|----------|-----------|
| Гравець тригерить Prompt | Можна \`humanoid:MoveTo(hrp.Position)\` зупинитись / \`WalkSpeed = 0\` на час діалогу |
| Після діалогу | Повернути WalkSpeed, продовжити while (через прапорець paused) |
| Квест 10.6 | Той самий NPC_QuestGiver може патрулювати мале коло біля столу |

Псевдо:

\`local paused = false\`
\`prompt.Triggered:Connect(function() paused = true … paused = false end)\`

У while:
\`while paused do task.wait(0.2) end\` перед новим followPath.

Так охоронець не тікає під час розмови.

**Зроби зараз (3 хв):** підійди до Prompt у Play і підтверди Triggered один раз.`,
 },
 {
 title: "Білд чекліст NPC для pathfinding",
 content: `- [ ] Model з Humanoid + HumanoidRootPart
- [ ] Animate опційно (не блокер)
- [ ] Anchored = false на частинах тіла (типовий Rig)
- [ ] Немає випадкового Weld до підлоги хабу
- [ ] Patrol Parts вище підлоги на ~1–2 студ, у проходах
- [ ] Скрипт патруля в SSS або Script у моделі (сервер)
- [ ] Output: Success і імена точок при дебазі

Якщо береш Rig з Toolbox - **перевір скрипти**. Зайвий AI з Toolbox може битися з твоїм while. Краще свій короткий Script.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 {
 title: "Типові помилки while + pathfinding",
 content: `| Помилка | Наслідок | Фікс |
|---------|----------|------|
| \`while true do Compute end\` без Wait | Лаги, warn-спам | Wait на русі / task.wait |
| Ігнор Status | Тиша, NPC стоїть | warn + пауза |
| Точки всередині Baseplate | NoPath | Підняти Patrol |
| Патруль на клієнті | Десинхрон | Сервер |
| Новий path:CreatePath кожен кадр | Важко дебажити | Один path, багато Compute |
| Немає Jump при Action.Jump | Застряг на бордюрі | humanoid.Jump = true |

**Зроби зараз (4 хв):** увімкни Play і подивись, чи NPC реально обходить стіну між двома точками, а не йде крізь (якщо йде крізь - перевір CanCollide стін).`,
 },
 {
 title: "Чекліст здачі уроку 77",
 content: `- [ ] PathfindingService CreatePath + ComputeAsync
- [ ] Успішний рух по waypoints з MoveTo
- [ ] Патруль while по ≥2 (краще 3) точках
- [ ] Обробка Fail (warn + wait, не tight loop)
- [ ] Lite пауза на Prompt (бажано)
- [ ] Output без червоного під час 30 с патруля
- [ ] Save: Lesson 10.5 - Pathfinding Patrol

Завтра на цьому NPC вішаєш квест table - він уже «живий» у просторі хабу.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "while true з ComputeAsync без очікування руху",
 explanation: "Сервер задихається, NPC смикається.",
 correctApproach: "MoveToFinished/таймаут + task.wait між цілями",
 },
 {
 mistake: "Ігнорувати path.Status",
 explanation: "Здається, що «pathfinding зламаний».",
 correctApproach: "Перевіряй Success, інакше пауза і дебаг точок",
 },
 {
 mistake: "AgentRadius більший за двері хабу",
 explanation: "NoPath у очевидних місцях.",
 correctApproach: "Піджени радіус або розшири прохід",
 },
 {
 mistake: "Патруль у LocalScript",
 explanation: "Погана синхронізація й безпека логіки.",
 correctApproach: "Серверний Script",
 },
 {
 mistake: "Якорі патруля всередині колізії",
 explanation: "Вічний Fail.",
 correctApproach: "Винеси Patrol Parts у вільний простір",
 },
 {
 mistake: "Не обробляти Jump waypoint",
 explanation: "Застрягання на невеликих уступах.",
 correctApproach: "PathWaypointAction.Jump → humanoid.Jump",
 },
 ],
 summary: "Ти навчив NPC ходити через PathfindingService: ComputeAsync будує waypoints, while ганяє патруль між точками, Fail/таймаути не вбивають цикл. Живий охоронець/квестодавець готовий до квесту в 10.6.",
 practiceTask: {
 title: "Патруль A-B-C (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** NPC циклічно патрулює 3 точки через Pathfinding.

### Part A - Світ (6 хв)
1. NPC Rig з Humanoid.
2. Patrol_1/2/3 у проходах хабу.
3. Стіна між 1 і 2, щоб було що обходити.

### Part B - followPath (14 хв)
1. CreatePath з AgentParams.
2. ComputeAsync → перевірка Status.
3. Цикл waypoints + Jump + MoveToFinished/таймаут.
4. Функція повертає true/false.

### Part C - while патруль (10 хв)
1. while true по index точок.
2. Пауза при Fail.
3. Опційно: paused під час Prompt.
4. **Зберегти:** Lesson 10.5 - Pathfinding Patrol`,
 hints: [
 "Спочатку одна ціль успішно, потім while",
 "Transparency 1 на Patrol Parts, щоб не псувати білд",
 "warn(path.Status) - найкращий друг дебагу",
 ],
 optionalChallenge: "path.Blocked → негайний recompute до поточної цілі.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Навіщо PathfindingService замість одного MoveTo крізь стіну?",
 options: [
          "Щоб побудувати обхід перешкод через waypoints",
          "Щоб видалити Humanoid",
          "Щоб замінити leaderstats",
          "Це потрібно лише для Terrain water",
        ],
 correctAnswer: 0,
 explanation: "Маршрут з обходом.",
 },
 {
 id: "q2",
 type: MC,
 question: "Що робить path:ComputeAsync(from, to)?",
 options: [
          "Одразу видає монети",
          "Рахує маршрут між двома позиціями (асинхронно чекає результат)",
          "Створює ScreenGui",
          "Вимикає Anchored у всьому Workspace",
        ],
 correctAnswer: 1,
 explanation: "Побудова Path.",
 },
 {
 id: "q3",
 type: MC,
 question: "Де має жити логіка патруля NPC в цьому уроці?",
 options: [
          "Лише в LocalScript гравця",
          "У Lighting.Atmosphere",
          "На сервері (Script)",
          "У назві Place",
        ],
 correctAnswer: 2,
 explanation: "Серверний AI/патруль.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо перевіряти path.Status після ComputeAsync?",
 options: [
          "Це лише косметика Output",
          "Status завжди Success",
          "Щоб увімкнути Bloom",
          "Щоб не вести NPC, якщо шляху немає (NoPath тощо)",
        ],
 correctAnswer: 3,
 explanation: "Fail-safe.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що таке waypoints?",
 options: [
          "Список GamePass",
          "Список точок маршруту, по яких треба провести Humanoid",
          "Файли Audio",
          "Типи Terrain Material",
        ],
 correctAnswer: 1,
 explanation: "Точки Path.",
 },
 {
 id: "q6",
 type: MC,
 question: "Чому while true для патруля потребує Wait / MoveToFinished?",
 options: [
          "while заборонений у Lua",
          "Wait вимикає Pathfinding",
          "Інакше tight loop вантажить сервер і ламає рух",
          "Так вимагає RemoteFunction",
        ],
 correctAnswer: 2,
 explanation: "Не крутити порожній цикл.",
 },
 {
 id: "q7",
 type: MC,
 question: "Навіщо AgentRadius у CreatePath?",
 options: [
          "Каже системі «наскільки товстий» агент для проходів",
          "Це гучність Sound",
          "Це ціна товару в магазині",
          "Це колір Neon",
        ],
 correctAnswer: 0,
 explanation: "Розмір агента.",
 },
 {
 id: "q8",
 type: MC,
 question: "Що робити при PathWaypointAction.Jump?",
 options: [
          "Видалити waypoint",
          "Вимкнути PathfindingService",
          "Поставити Anchored true назавжди",
          "Увімкнути humanoid.Jump (або еквівалент стрибка)",
        ],
 correctAnswer: 3,
 explanation: "Стрибок на маршруті.",
 },
 {
 id: "q9",
 type: MC,
 question: "Типова причина NoPath між двома близькими точками?",
 options: [
          "Занадто гарний BillboardGui",
          "Наявність ProximityPrompt",
          "Якір всередині колізії або занадто великий AgentRadius / вузький прохід",
          "Занадто короткий title квесту",
        ],
 correctAnswer: 2,
 explanation: "Геометрія й агент.",
 },
 {
 id: "q10",
 type: MC,
 question: "Навіщо таймаут навколо MoveToFinished?",
 options: [
          "Щоб прискорити Publish",
          "Щоб NPC не завис назавжди, якщо фізика заблокувала рух",
          "Щоб видалити waypoints з гри",
          "Це замінює Humanoid",
        ],
 correctAnswer: 1,
 explanation: "Захист від вічного Wait.",
 },
 {
 id: "q11",
 type: MC,
 question: "Як патруль дружить з діалогом Prompt?",
 options: [
          "Видалити Prompt назавжди",
          "Перенести NPC у ReplicatedStorage під час діалогу обов’язково",
          "Вимкнути while у всьому Place",
          "Прапорець paused: зупинити рух на час розмови",
        ],
 correctAnswer: 3,
 explanation: "Пауза AI.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що означає path.Blocked у контексті уроку?",
 options: [
          "Маршрут перекрили після розрахунку - варто перерахувати",
          "Гравець купив GamePass",
          "Обов’язковий краш Studio",
          "Успішне завершення квесту",
        ],
 correctAnswer: 0,
 explanation: "Перекриття шляху.",
 },
 {
 id: "q13",
 type: MC,
 question: "Скільки точок патруля мінімально для демонстрації циклу?",
 options: [
          "Обов’язково 100",
          "0 - лише Compute без руху",
          "Хоча б 2 (краще 3) з поверненням по колу",
          "Лише 1 і вимкнути while",
        ],
 correctAnswer: 2,
 explanation: "Цикл між якорями.",
 },
 {
 id: "q14",
 type: MC,
 question: "Чому Patrol Parts часто роблять прозорими без колізії?",
 options: [
          "Pathfinding працює лише з Transparency 1",
          "Так вимагає DataStore",
          "Щоб замінити HumanoidRootPart",
          "Це якорі позицій, а не декоративні стіни на шляху",
        ],
 correctAnswer: 3,
 explanation: "Службові маркери.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 10.5?",
 options: [
          "Лише теорія без Studio",
          "NPC з while-патрулем через Pathfinding по точках + Save",
          "Статичний Part без Humanoid",
          "Магазин без NPC",
        ],
 correctAnswer: 1,
 explanation: "Потрібен рухомий патруль.",
 },
 ],
 },
}

export const ukLesson106 = {
 lessonId: "lesson-roblox-10-6",
 moduleId: "module-10",
 order: 6,
 title: "10.6 - Квест з table",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Описати квест як Config-table: id, цілі, нагорода, текст NPC",
 "Зберігати прогрес гравця на сервері (Attributes / Values / своя table)",
 "Зв’язати NPC + Prompt із стартом і здачею квесту через if",
 "Видати нагороду в leaderstats Coins лише на сервері (анти-дубль)",
 "Підготувати умову цілі під завтрашній пазл/інвентар (10.7)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 78 з 92)",
 content: `Сьогодні хаб отримує **квест** - не «натиснув і отримав монети», а **ланцюг**: поговорив з NPC → зрозумів ціль → виконав умову → повернувся → отримав нагороду.

Квест у курсі будуємо на **table**:
- що треба зробити (цілі);
- скільки монет дати;
- які репліки сказати;
- чи вже взято / здано.

Ти вже маєш з 10.4–10.5 NPC, Prompt і (ідеально) pathfinding. Сьогодні NPC стає **квестодавцем**, а не лише «привіт».

Завтра (**10.7**) ціль може стати «принеси Key_Blue з Raycast-кімнати». Сьогодні достатньо **чесної lite-цілі** (зібрати 3 монети-зони / дійти до маркера / Attribute), але **архітектура** має бути як для справжнього квесту.

**Зроби зараз (3 хв):** назви NPC \`NPC_QuestGiver\` і постав табличку «Квести тут».`,
 },
 {
 title: "Навіщо квест саме через table",
 content: `| Без table (хардкод у Script) | З QuestConfig table |
|------------------------------|---------------------|
| Другий квест = копіпаста всього скрипта | Додаєш рядок у Config |
| Текст реплік розкиданий | Усі тексти в одному місці |
| Нагороду легко загубити в if | \`rewardCoins\` поруч із цілями |
| Важко пояснити викладачу | Показуєш Config за 20 с |

**Config** - меню ресторану (що можна замовити). **Стан гравця** - його відкрите замовлення (взяв / готується / забрав). **Сервер** - кухня, яка вирішує, чи страва готова і чи вже видавали чек.

Клієнт лише «просить меню» або «просить здати». Кухня не вірить фразі «я вже все зробив, дай 999 монет» без перевірки.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Структура QuestConfig (приклад)",
 content: `Один ModuleScript \`SSS/Modules/QuestConfig.lua\` (або table на початку сервер-скрипта на старті):

\`local QuestConfig = {\`
\` gather_3 = {\`
\` id = "gather_3",\`
\` title = "Збір для майстра",\`
\` description = "Збери 3 маркери в хабі",\`
\` goalType = "count",\`
\` goalAmount = 3,\`
\` rewardCoins = 25,\`
\` startText = "Принеси 3 маркери - тоді поговоримо про нагороду.",\`
\` doneText = "Дякую! Ось монети.",\`
\` busyText = "Ще не все. Дивись лічильник.",\`
\` },\`
\`}\`
\`return QuestConfig\`

Поля можна звузити, але тримай мінімум: **id, ціль, нагорода, 2–3 тексти**.

Пізніше для ключа з 10.7 додаси квест \`bring_key\` з \`goalType = "item"\` і \`goalItem = "Key_Blue"\` - **той самий** код здачі, інший рядок Config.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Стан квесту на гравця",
 content: `| Підхід | Плюси | Мінуси |
|--------|-------|--------|
| Attributes на Player (\`QuestId\`, \`QuestProgress\`, \`QuestDone\`) | Видно в Properties, просто | Багато рядків Attributes |
| Folder під Player з Values | Зручно спостерігати | Трохи більше Instance |
| table \`questState[player]\` у Module | Швидко в коді | Не видно в Explorer без print |

Для уроку рекомендую **Attributes + серверна table** (table - правда, Attributes - для HUD/дебагу) або лише Attributes, якщо хочеш менше файлів.

Типові значення:
- \`QuestId\` = \`""\` або \`"gather_3"\`
- \`QuestProgress\` = число 0…goal
- \`QuestStatus\` = \`none\` / \`active\` / \`ready\` / \`turned_in\`

**Головне:** змінює стан **лише сервер**. LocalScript може читати Attributes для UI (вони реплікуються), але не ставить собі \`turned_in\`.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Машина станів квесту (if-логіка)",
 content: `Уяви Prompt на NPC. Кожен Triggered:

1. Якщо \`status == none\` → старт: \`active\`, progress=0, показати startText.
2. Якщо \`active\` і progress < goal → busyText + нагадати скільки лишилось.
3. Якщо \`active\` і progress >= goal (або item є) → можна одразу turn-in **або** статус \`ready\`.
4. Якщо \`ready\` / умова виконана при розмові → видати Coins **один раз**, \`turned_in\`.
5. Якщо \`turned_in\` → «Квест уже здано» (або дати наступний id - челендж).

Псевдокод здачі:

\`local cfg = QuestConfig[questId]\`
\`if status ~= "active" and status ~= "ready" then return end\`
\`if not objectiveMet(player, cfg) then tell(busyText) return end\`
\`if player:GetAttribute("QuestRewarded") == true then return end\`
\`addCoins(player, cfg.rewardCoins)\`
\`player:SetAttribute("QuestRewarded", true)\`
\`player:SetAttribute("QuestStatus", "turned_in")\`
\`tell(doneText)\`

Анти-дубль обов’язковий: інакше спам Prompt = друкарня монет.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Як прогресує ціль (count / zone / item)",
 content: `| goalType | Як крутити progress | Примітка |
|----------|---------------------|----------|
| \`count\` | Touched/Prompt на маркерах +1 (з debounce на маркер) | Ідеально для сьогодні |
| \`reach\` | Увійти в Part-зону один раз | Дуже lite |
| \`item\` | \`Inventory.has\` (під 10.7) | Підключиш завтра |
| \`talk\` | Лише Prompt - майже не квест | Краще не як єдина ціль |

Для **count**: кожен маркер \`QuestMarker\` з Attribute \`MarkerId\`. Сервер тримає set «які маркери цей гравець уже зібрав», щоб один маркер не дав +3 від спаму.

\`local function onMarker(player, markerId)\`
\` if GetAttribute status ~= "active" then return end\`
\` if alreadyCollected(player, markerId) then return end\`
\` markCollected(...)\`
\` local p = GetAttribute("QuestProgress") + 1\`
\` SetAttribute("QuestProgress", p)\`
\` if p >= cfg.goalAmount then SetAttribute("QuestStatus", "ready") end\`
\`end\`

Нагорода **не** тут. Нагорода - біля NPC при здачі (або окрема кнопка Turn In). Так гравець відчуває «повернувся до квестодавця».

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Зв’язок з leaderstats Coins",
 content: `Монети квесту йдуть у **ті самі** Coins, що магазин (10.2). Інакше завтра Ship хаб розвалиться.

\`local function addCoins(player, amount)\`
\` local ls = player:FindFirstChild("leaderstats")\`
\` local coins = ls and ls:FindFirstChild("Coins")\`
\` if not coins then warn("no Coins") return end\`
\` coins.Value += amount\`
\`end\`

Перевірки перед уроком:
1. Чи є Script, що створює leaderstats на PlayerAdded?
2. Чи магазин читає той самий IntValue?
3. Чи після квесту TAB показує +25?

Якщо leaderstats ще немає - **спочатку** 10 хв на мінімальний серверний Folder+IntValue, потім квест. Без цього нагорода «в повітрі».

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "NPC діалог: коротко і по статусу",
 content: `Не пиши роман на 20 рядків. Три стани - три короткі фрази з Config.

Показ тексту:
- BillboardGui над NPC; або
- ScreenGui Dialogue на клієнті через \`FireClient(player, text)\`; або
- просто \`print\` + TextLabel у хабі на старті навчання.

ProximityPrompt:
- \`ObjectText\` = ім’я NPC;
- \`ActionText\` = «Поговорити» / «Здати квест» залежно від статусу (можна міняти з сервера через атрибути UI - або лишити «Поговорити»).

**Зроби зараз (5 хв):** підстав startText/busyText/doneText і провір три гілки if без нагороди (поки з print).`,
 },
 {
 title: "UI прогресу lite",
 content: `Гравцю треба бачити \`2/3\`, інакше квест відчувається зламаним.

Мінімум:
- TextLabel у StarterGui: LocalScript слухає \`GetAttributeChangedSignal("QuestProgress")\` і \`QuestStatus\`;
- формат: \`Квест: 2/3\` або \`Готово до здачі!\`.

Пам’ятай: UI **відображає**, Condfig і нагороду вирішує сервер.

Челендж: кнопка «Здати» окремо від «Поговорити» - теж Remote на сервер з тією ж \`tryTurnIn\`.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Playtest квесту (10 проходів думкою + 1 у Play)",
 content: `| # | Сценарій | Очікування |
|---|----------|------------|
| 1 | Prompt до старту | Статус active, progress 0 |
| 2 | Маркер без active | Нічого / ігнор |
| 3 | Три різні маркери | 3/3, status ready |
| 4 | Спам одного маркера | Не більше +1 з нього |
| 5 | Здача | +Coins рівно rewardCoins |
| 6 | Повторна здача | 0 монет, повідомлення |
| 7 | Новий Play | Стан з нуля (session-lite) |
| 8 | Два гравці | Прогрес не змішується |
| 9 | Output | Без червоного |
| 10 | TAB | Coins збігаються з очікуванням |

Якщо пункт 6 червоний - це P0. Економіка хабу важливіша за гарний текст.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Місток до 10.7 і 10.8",
 content: `| Сьогодні | Далі |
|----------|------|
| goalType count + маркери | goalType item + Inventory.has |
| QuestRewarded анти-дубль | Той самий патерн для ключа/дверей |
| Нагорода в Coins | Магазин витрачає ті самі Coins |
| NPC як хаб-якір | Золотий шлях Ship: NPC → пазл → здача → магазин |

Не роздувай сьогодні 5 квестів. **Один** id у Config, повністю стабільний - краще, ніж три напівмертві.

Save: \`Lesson 10.6 - Quest Table\`.

**Зроби зараз (2 хв):** допиши в Note один рядок, що переносиш у наступний урок.`,
 },
 {
 title: "Чекліст здачі уроку 78",
 content: `- [ ] QuestConfig table з id, ціллю, нагородою, текстами
- [ ] Старт квесту з NPC Prompt
- [ ] Прогрес цілі на сервері (count або reach)
- [ ] Здача з перевіркою умови
- [ ] Coins у leaderstats + анти-дубль нагороди
- [ ] UI або чіткий фідбек progress
- [ ] Playtest сценарії 1–6 зелені
- [ ] Save Lesson 10.6 - Quest Table

Якщо все є - завтра заміниш маркери на ключ з Raycast без переписування всієї машини станів.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Нагорода в LocalScript (Coins на клієнті)",
 explanation: "Чити й розсинхрон з магазином.",
 correctApproach: "addCoins лише на сервері в leaderstats",
 },
 {
 mistake: "Немає QuestRewarded / можна здавати вічно",
 explanation: "Друкарня монет.",
 correctApproach: "Прапорець turned_in / QuestRewarded",
 },
 {
 mistake: "Цілі й нагорода захардкоджені без table",
 explanation: "Другий квест = біль і копіпаста.",
 correctApproach: "QuestConfig з полями",
 },
 {
 mistake: "Маркер дає +1 кожен Touched без set зібраних",
 explanation: "Прогрес накручується на місці.",
 correctApproach: "alreadyCollected(markerId) на гравця",
 },
 {
 mistake: "Квест у одному Place, магазин у іншому",
 explanation: "Немає інтеграції для Ship.",
 correctApproach: "Той самий хаб і ті самі Coins",
 },
 {
 mistake: "Статус квесту ставить клієнт",
 explanation: "Підробка ready/turned_in.",
 correctApproach: "Attributes/state лише з сервер-скриптів",
 },
 ],
 summary: "Ти зібрав квест на QuestConfig table: NPC стартує, сервер крутить прогрес цілі, здача перевіряє умову і один раз додає Coins у leaderstats. Це каркас, у який завтра встане ключ з пазла, а в 10.8 - весь Ship-шлях хабу.",
 practiceTask: {
 title: "Квест gather_3 (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** один квест з Config-table, прогресом і нагородою в Coins.

### Part A - Config і стан (8 хв)
1. QuestConfig з квестом gather_3 (goalAmount 3, rewardCoins 25, тексти).
2. Attributes: QuestId, QuestProgress, QuestStatus, QuestRewarded.
3. Функції startQuest / tryTurnIn на сервері.

### Part B - Світ і прогрес (12 хв)
1. NPC_QuestGiver + ProximityPrompt.
2. 3 маркери QuestMarker з унікальними MarkerId.
3. Touched/Prompt → +progress з захистом від повтору маркера.
4. При 3/3 → status ready.

### Part C - Нагорода і UI (10 хв)
1. Здача біля NPC → +25 Coins один раз.
2. TextLabel progress 0/3…3/3.
3. Повторна здача без монет.
4. **Зберегти:** Lesson 10.6 - Quest Table`,
 hints: [
 "Спочатку гілки діалогу з print, потім addCoins",
 "alreadyCollected важливіший за гарний Billboard",
 "Перевір TAB після здачі",
 ],
 optionalChallenge: "Другий квест у Config (reach_zone), який відкривається лише після turned_in першого.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Навіщо описувати квест у table/Config?",
 options: [
          "Щоб цілі, нагорода і тексти жили в одному місці й легко розширювались",
          "Щоб вимкнути NPC",
          "Щоб замінити Workspace на SSS",
          "Це потрібно лише для Skybox",
        ],
 correctAnswer: 0,
 explanation: "Дані квесту окремо від дроту if.",
 },
 {
 id: "q2",
 type: MC,
 question: "Хто має змінювати QuestStatus / видавати монети?",
 options: [
          "Лише LocalScript у StarterGui",
          "Серверний Script",
          "Lighting",
          "Випадковий Free Model без перевірки",
        ],
 correctAnswer: 1,
 explanation: "Стан і економіка на сервері.",
 },
 {
 id: "q3",
 type: MC,
 question: "Навіщо прапорець QuestRewarded / turned_in?",
 options: [
          "Щоб вимкнути Anchored",
          "Щоб створити Terrain",
          "Щоб нагороду не видати багато разів спамом Prompt",
          "Це замінює Pathfinding",
        ],
 correctAnswer: 2,
 explanation: "Анти-дубль нагороди.",
 },
 {
 id: "q4",
 type: MC,
 question: "Куди має йти rewardCoins у хабі курсу?",
 options: [
          "Лише в TextLabel без Value",
          "У ClockTime",
          "У ReplicatedFirst як Sound",
          "У ті самі leaderstats Coins, що й магазин",
        ],
 correctAnswer: 3,
 explanation: "Одна економіка хабу.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що робити, щоб один маркер не накрутив увесь progress?",
 options: [
          "Давати +10 за кожен Touched",
          "Пам’ятати alreadyCollected(markerId) для гравця",
          "Вимкнути сервер",
          "Ставити статус на клієнті",
        ],
 correctAnswer: 1,
 explanation: "Debounce по id маркера.",
 },
 {
 id: "q6",
 type: MC,
 question: "Який мінімальний набір полів у QuestConfig корисний на старті?",
 options: [
          "Лише колір Part",
          "Лише ім’я Place",
          "id, ціль (тип/кількість), rewardCoins, тексти діалогу",
          "Тільки ParticleEmitter Rate",
        ],
 correctAnswer: 2,
 explanation: "Дані для старту/прогресу/здачі.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чому нагороду краще видавати біля NPC при здачі, а не в момент останнього маркера?",
 options: [
          "Є відчуття «повернувся до квестодавця» і одна точка анти-дубля",
          "Так забороняє Roblox інакше",
          "Маркери не вміють Touched",
          "NPC не може мати Prompt",
        ],
 correctAnswer: 0,
 explanation: "Класичний quest loop.",
 },
 {
 id: "q8",
 type: MC,
 question: "Що з наведеного підходить як lite-ціль сьогодні під архітектуру item-квесту?",
 options: [
          "Одразу Publish Public",
          "Видалити leaderstats",
          "Дати монети без умови",
          "Порахувати 3 маркери (count), завтра замінити на Key_Blue",
        ],
 correctAnswer: 3,
 explanation: "Та сама машина станів, інша ціль.",
 },
 {
 id: "q9",
 type: MC,
 question: "Навіщо UI читає Attributes квесту?",
 options: [
          "Щоб UI міг сам видати 1000 монет",
          "Щоб вимкнути Remotes магазину",
          "Щоб показати прогрес гравцю, не роблячи UI джерелом правди",
          "Це обов’язково ламає сервер",
        ],
 correctAnswer: 2,
 explanation: "UI = відображення.",
 },
 {
 id: "q10",
 type: MC,
 question: "Який сценарій playtest ловить друкарню монет?",
 options: [
          "Зміна Material підлоги",
          "Повторна здача того самого квесту",
          "Відкриття Terrain Editor",
          "Перейменування Lighting",
        ],
 correctAnswer: 1,
 explanation: "Перевірка анти-дубля.",
 },
 {
 id: "q11",
 type: MC,
 question: "Чому погано тримати прогрес лише в LocalScript?",
 options: [
          "LocalScript не може показувати TextLabel",
          "Attributes не існують",
          "Prompt працює лише на клієнті завжди",
          "Сервер не побачить правди при здачі; легко підробити",
        ],
 correctAnswer: 3,
 explanation: "Прогрес на сервері.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що має статись при старті квесту з Prompt?",
 options: [
          "status active, progress 0, показати startText",
          "Одразу turned_in і 999 монет",
          "Видалення NPC",
          "Вимкнення Explorer",
        ],
 correctAnswer: 0,
 explanation: "Гілка старту.",
 },
 {
 id: "q13",
 type: MC,
 question: "Як квест 10.6 готує інтеграцію з 10.7?",
 options: [
          "Треба видалити QuestConfig",
          "Raycast заборонить квести",
          "Ті самі start/turn-in, ціль можна замінити на item/Inventory",
          "Інвентар замінить leaderstats назавжди",
        ],
 correctAnswer: 2,
 explanation: "Гнучкий goalType.",
 },
 {
 id: "q14",
 type: MC,
 question: "Що перевірити, якщо після здачі TAB не змінився?",
 options: [
          "Чи білий колір неба",
          "Чи вимкнено Output",
          "Чи назва модуля 1 правильна",
          "Чи існує leaderstats.Coins і чи addCoins пише саме туди",
        ],
 correctAnswer: 3,
 explanation: "Діагностика економіки.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом уроку 10.6?",
 options: [
          "Лише табличка без коду",
          "Працюючий квест з Config, прогресом, одноразовою нагородою в Coins і Save",
          "Порожній Baseplate",
          "Магазин без квесту й без сервера",
        ],
 correctAnswer: 1,
 explanation: "Потрібен зібраний quest loop.",
 },
 ],
 },
}

export const ukLesson107 = {
 lessonId: "lesson-roblox-10-7",
 moduleId: "module-10",
 order: 7,
 title: "10.7 - Інвентар + Raycast",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зробити серверний інвентар на table / ModuleScript (додати, перевірити, забрати предмет)",
 "Зрозуміти Raycast: промінь, FilterDescendantsInstances, що повертає результат",
 "Зібрати lite пазл-кімнату: луч / приціл відкриває двері або дає ключ",
 "Зв’язати пазл з інвентарем (ключ у table → умова для дверей/квесту)",
 "Підготувати прапорець для завтрашнього Ship хабу (10.8)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 79 з 92)",
 content: `Сьогодні дві навичка хабу в одному уроці:

1. **Інвентар** - список предметів гравця в **table** на сервері (часто через **ModuleScript**).
2. **Raycast** - «невидима лінійка» в світі: звідки → куди → що влучило.

Навіщо разом? Бо класичний хаб-пазл звучить так: *навів промінь на кристал → отримав ключ у інвентар → двері/квест перевіряють ключ*.

Ти вже маєш з модуля 10:
- хаб і папки (10.1);
- магазин + Remotes (10.2–10.3);
- NPC і квест з table (10.4–10.6).

Сьогодні додаєш **предметну логіку** і **просторовий промінь**, щоб завтра в **10.8** зшити все в один шлях.

**Зроби зараз (2 хв):** у Workspace зроби папку \`PuzzleRoom\` з двома Parts: \`LaserOrigin\` і \`CrystalTarget\` (імена важливі).`,
 },
 {
 title: "Інвентар ≠ Tool у Backpack (спочатку)",
 content: `| Підхід | Що це | Коли ок |
|--------|-------|---------|
| Tool у Backpack | Фізичний інструмент у руках | Зброя, лопата |
| **table-інвентар** | Список id предметів у пам’яті сервера | Ключі, квестові флаги, «має квиток» |
| Attribute на Player | Одна позначка | Дуже простий ключ |

У хабі для ключів і квестових речей **table на сервері** зручніший: легко перевірити \`hasItem(player, "Key_Blue")\`, легко забрати після використання, легко показати в UI список.

Tool можна додати пізніше як «вау». Сьогодні ядро - **логіка володіння**, не анімація рук.

інвентар - це **рюкзак-список у блокноті судді (сервер)**, а не наклейка на екрані гравця.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "ModuleScript інвентарю - навіщо",
 content: `Якщо функції \`addItem\` / \`hasItem\` / \`removeItem\` розкидати по 5 Scripts - завтра квест і двері розійдуться.

**ModuleScript** (наприклад \`SSS/Modules/Inventory.lua\`) = одна бібліотека:

| Функція | Роль |
|---------|------|
| \`getInv(player)\` | Повернути table предметів гравця (створити, якщо немає) |
| \`addItem(player, itemId)\` | Додати, якщо ще немає (або зі стеком - lite без стеку) |
| \`hasItem(player, itemId)\` | true/false |
| \`removeItem(player, itemId)\` | Прибрати після «використали ключ» |

Інші скрипти роблять \`require(...Inventory)\` і не винаходять свій список.

Зберігати інвентар можна:
- у \`playerInventories[player] = { "Key_Blue" }\` (table у Module);
- або в Folder під гравцем з StringValues - теж ок, але сьогодні достатньо **чистої table** + print для дебагу.

**Пам’ятай:** інвентар пише **сервер**. LocalScript може лише **просити** «використати предмет» через Remote, якщо треба.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Скелет Inventory Module (логіка рядків)",
 content: `Спрощена ідея (пиши в ModuleScript; \`return\` таблицю API в кінці):

\`local Inventory = {}\`
\`local bags = {}\` -- [player] = { "Key_Blue", ... }

\`function Inventory.get(player)\`
\` bags[player] = bags[player] or {}\`
\` return bags[player]\`
\`end\`

\`function Inventory.has(player, itemId)\`
\` for _, id in ipairs(Inventory.get(player)) do\`
\` if id == itemId then return true end\`
\` end\`
\` return false\`
\`end\`

\`function Inventory.add(player, itemId)\`
\` if Inventory.has(player, itemId) then return false end\`
\` table.insert(Inventory.get(player), itemId)\`
\` return true\`
\`end\`

\`function Inventory.remove(player, itemId)\`
\` local bag = Inventory.get(player)\`
\` for i, id in ipairs(bag) do\`
\` if id == itemId then table.remove(bag, i) return true end\`
\` end\`
\` return false\`
\`end\`

\`Players.PlayerRemoving:Connect(function(p) bags[p] = nil end)\`

\`return Inventory\`

Після \`add\` зроби \`print(player.Name, "inv", table.concat(Inventory.get(player), ","))\` - побачиш правду в Output.

**Зроби зараз (4 хв):** зміни одне значення в table/Config і підтверди нову поведінку.`,
 },
 {
 title: "Що таке Raycast простими словами",
 content: `**Raycast** = Studio питає світ: «якщо провести лінію з точки A у напрямку D на довжину L, у що вріжемось?»

Результат:
- \`nil\` - нічого (або лише відфільтроване);
- або об’єкт із полями на кшталт \`Instance\` (що влучили), \`Position\`, \`Normal\`.

Навіщо в іграх:
- лазерні пазли;
- перевірка «чи бачить NPC гравця»;
- постріл / приціл;
- «чи є стіна між точкою і ціллю».

Це **не** Touched. Touched = хтось фізично зіткнувся. Raycast = **запит лінією**, навіть без видимого лазера (лазер - лише декорація Part/Beam).

Сьогодні: з \`LaserOrigin\` кидаємо промінь на \`CrystalTarget\` (або в напрямку LookVector) і якщо влучили в правильний Part - даємо ключ.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "RaycastParams і типові налаштування",
 content: `| Поле / ідея | Навіщо |
|-------------|--------|
| \`FilterType = Exclude\` | Ігнорувати список (наприклад персонажа гравця) |
| \`FilterType = Include\` | Рахувати лише Parts з списку (зручно для пазла) |
| \`FilterDescendantsInstances\` | Сам список Models/Parts |
| \`IgnoreWater\` | Щоб вода не їла промінь без потреби |

Для пазла-кімнати часто зручний **Include**: у список лише \`CrystalTarget\` і дзеркала (якщо є). Тоді випадковий декор не «перехопить» промінь.

Псевдокод ідеї:

\`local params = RaycastParams.new()\`
\`params.FilterType = Enum.RaycastFilterType.Include\`
\`params.FilterDescendantsInstances = { crystal }\`

\`local origin = LaserOrigin.Position\`
\`local direction = (crystal.Position - origin).Unit * 80\`
\`local result = workspace:Raycast(origin, direction, params)\`

\`if result and result.Instance == crystal then\`
\` -- успіх\`
\`end\`

\`direction\` = **вектор зміщення** (не лише одиничний). Довжина вектора = дальність променя.

**Зроби зараз (3 хв):** знайди в Place один симптом з таблиці і виправ або підтверди, що його немає.`,
 },
 {
 title: "Пазл-кімната: дизайн на одну годину",
 content: `Не будуй метро на 12 дзеркал. Зроби **один чесний вау**:

1. Кімната \`PuzzleRoom\` (стіни + двері \`Door_Reward\` Anchored).
2. \`LaserOrigin\` ( Neon Part) і \`CrystalTarget\` (інший колір).
3. Кнопка / Prompt \`AlignLaser\` або Script, що раз на секунду перевіряє Raycast (для старту ок; пізніше - по події).
4. Успіх → \`Inventory.add(player, "Key_Blue")\` + Attribute на двері / відкриття (Tween або Transparency+CanCollide).
5. Опційно: Billboard «Потрібен синій ключ» на дверях у хабі.

Зв’язок із квестом 10.6: квестова умова може бути \`Inventory.has(player, "Key_Blue")\` замість окремого прапорця - або вистав \`Attribute PuzzleDone=true\` після add.

Для 10.8 важливо, щоб **успіх пазла був видимий системі** (предмет або Attribute), а не лише \`print("nice")\`.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "Хто стріляє променем: клієнт чи сервер?",
 content: `| Варіант | Плюс | Мінус |
|---------|------|-------|
| Сервер Raycast по кнопці/Prompt | Чесно для нагороди | Трохи затримки |
| Клієнт «для краси» Beam + сервер перевіряє | Гарний фідбек | Два шари коду |
| Лише клієнт дає ключ | Швидко зламати | **Заборонено для нагороди** |

Правило курсу: **нагороду (ключ, монети, відкриття дверей з лутом) дає сервер** після свого Raycast або після валідованої умови.

Якщо малюєш Beam на клієнті - ок як juice. Але \`Inventory.add\` тільки в Script у SSS.

Анти-чит lite: не приймай від клієнта «я влучив, дай ключ» без перевірки. Приймай «натиснув Align» → сервер сам кастує.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "UI інвентарю lite (LocalScript)",
 content: `Гравцю треба бачити, що ключ є. Мінімум:

1. ScreenGui \`InvUI\` з TextLabel \`InvList\`.
2. RemoteEvent \`InvUpdated\` (сервер → клієнт) після add/remove.
3. LocalScript ставить текст: \`Key_Blue\` або «порожньо».

Або ще простіше на старті: після отримання ключа \`FireClient\` з рядком «Отримано: Key_Blue» на 3 секунди. Повний ScrollingFrame - челендж.

Не дублюй список лише на клієнті як джерело правди. UI = **відображення** того, що сервер надіслав.

**Зроби зараз (4 хв):** зроби один Remote-виклик і зафіксуй, хто приймає рішення - клієнт чи сервер.`,
 },
 {
 title: "Двері / квест читають інвентар",
 content: `Приклад дверей у хабі (сервер):

\`local Inv = require(...Inventory)\`
\`prompt.Triggered:Connect(function(player)\`
\` if Inv.has(player, "Key_Blue") then\`
\` Inv.remove(player, "Key_Blue") -- одноразовий ключ\`
\` openDoor(Door_Reward)\`
\` else\`
\` tell(player, "Потрібен синій ключ з кімнати")\`
\` end\`
\`end)\`

Або для квесту 10.6: у \`tryComplete\` додай \`if not Inv.has(player, "Key_Blue") then return end\`.

Так пазл перестає бути іграшкою «в собі» і стає **ланкою хабу** - саме це завтра перевірить рубрика 10.8.

**Зроби зараз (5 хв):** після успішного Raycast вистав ще \`player:SetAttribute("PuzzleDone", true)\` - подвійна страховка для квесту.`,
 },
 {
 title: "Debounce, одноразовість, прибирання",
 content: `| Проблема | Захист |
|----------|--------|
| Спам Prompt → 50 ключів | \`has\` перед \`add\`; або одноразовий Part.Touched з прапорцем |
| Raycast кожен кадр без потреби | \`task.wait(0.25)\` або лише по кнопці |
| Пам’ять bags після виходу | \`PlayerRemoving\` чистить |
| Двері відкрились, ключ лишився | \`remove\` після використання |
| Влучили не в той Part | Перевіряй \`result.Instance.Name\` / Include-фільтр |

Playtest: 1) отримай ключ 2) відкрий двері 3) спробуй ще раз без ключа 4) новий Play - інвентар порожній (ок для session-lite без DataStore).

**Зроби зараз (4 хв):** зроби save/load або чесно задокументуй mock-режим у Output.`,
 },
 {
 title: "Чекліст здачі уроку 79",
 content: `- [ ] ModuleScript Inventory з add/has/remove
- [ ] Raycast з LaserOrigin до цілі (або LookVector) працює
- [ ] Успіх дає Key_Blue (або свій id) у інвентар на сервері
- [ ] Є фідбек гравцю (print + UI/повідомлення)
- [ ] Двері або квестова умова читає hasItem / Attribute
- [ ] Повторне взяття не плодить дублікати безсенсовно
- [ ] Output без червоного на шляху пазла
- [ ] Save: Lesson 10.7 - Inventory Raycast

Завтра в 10.8 цей ключ/прапорець має лягти в золотий шлях хабу поруч із магазином.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Ключ видає LocalScript у інвентар-«фейк»",
 explanation: "Легко підробити, двері на сервері не повірять або навпаки чит.",
 correctApproach: "Inventory.add лише на сервері",
 },
 {
 mistake: "Raycast direction - одиничний вектор без множення на дальність",
 explanation: "Промінь довжини ~1 студ, майже ніколи не влучить.",
 correctApproach: "direction = unit * distance",
 },
 {
 mistake: "Копіпаста addItem у трьох Scripts без Module",
 explanation: "Різні списки = хаос.",
 correctApproach: "Один ModuleScript + require",
 },
 {
 mistake: "Клієнт каже «влучив» і сервер сліпо вірить",
 explanation: "Чіт нагороди.",
 correctApproach: "Сервер сам робить Raycast / перевірку",
 },
 {
 mistake: "Пазл лише print, без предмета/Attribute для квесту",
 explanation: "Немає інтеграції з хабом.",
 correctApproach: "addItem або PuzzleDone для 10.6/10.8",
 },
 {
 mistake: "Не чистити bags[player] при виході",
 explanation: "Витік посилань, дивні баги в Studio.",
 correctApproach: "PlayerRemoving → bags[p]=nil",
 },
 ],
 summary: "Ти зібрав серверний інвентар на ModuleScript і пазл на Raycast: промінь підтверджує влучання, ключ потрапляє в table, двері або квест читають hasItem. Це міст до Ship хабу в уроці 10.8.",
 practiceTask: {
 title: "Ключ променем (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** Raycast-пазл видає ключ в Inventory; двері/умова це перевіряють.

### Part A - Inventory Module (10 хв)
1. ModuleScript SSS/Modules/Inventory.lua з get/has/add/remove.
2. Тестовий Script: add Key_Blue гравцю на Join (тимчасово) → print → прибери авто-add.
3. PlayerRemoving чистить bags.

### Part B - Raycast кімната (12 хв)
1. PuzzleRoom: LaserOrigin + CrystalTarget.
2. Prompt або кнопка → сервер Raycast (Include на ціль).
3. Успіх → Inventory.add(player, "Key_Blue") + повідомлення клієнту.
4. Debounce / не дублювати ключ.

### Part C - Зв’язок (8 хв)
1. Двері або квестова перевірка has("Key_Blue").
2. Опційно remove ключа після відкриття.
3. Attribute PuzzleDone=true.
4. **Зберегти:** Lesson 10.7 - Inventory Raycast`,
 hints: [
 "FilterType Include з одним CrystalTarget спрощує дебаг",
 "Множ unit-вектор на 50–100 для дальності",
 "Спочатку print(result), потім addItem",
 ],
 optionalChallenge: "Другий кристал Key_Red + двері, що потребують обидва ключі (has AND has).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Навіщо в цьому уроці ModuleScript Inventory?",
 options: [
          "Одна спільна логіка add/has/remove для квесту, дверей і пазла",
          "Щоб замінити Workspace",
          "Щоб вимкнути Raycast назавжди",
          "Це потрібно лише для Skybox",
        ],
 correctAnswer: 0,
 explanation: "Єдина бібліотека інвентарю.",
 },
 {
 id: "q2",
 type: MC,
 question: "Де має виконуватись Inventory.add для ключа?",
 options: [
          "Лише в LocalScript UI",
          "У серверному Script / логіці SSS",
          "У Lighting",
          "У назві Part",
        ],
 correctAnswer: 1,
 explanation: "Нагорода на сервері.",
 },
 {
 id: "q3",
 type: MC,
 question: "Що робить workspace:Raycast?",
 options: [
          "Завжди створює Tool",
          "Видаляє Terrain",
          "Перевіряє, у що вріжеться промінь з origin уздовж direction",
          "Публікує гру",
        ],
 correctAnswer: 2,
 explanation: "Запит лінією у світ.",
 },
 {
 id: "q4",
 type: MC,
 question: "Чому direction часто = unit * distance?",
 options: [
          "Бо так вимагає SoundService",
          "Бо unit уже = 1000 студів",
          "Бо Raycast ігнорує довжину завжди",
          "Бо довжина вектора задає дальність променя",
        ],
 correctAnswer: 3,
 explanation: "Дальність у довжині direction.",
 },
 {
 id: "q5",
 type: MC,
 question: "Навіщо RaycastFilterType.Include для пазла?",
 options: [
          "Вимкнути Anchored",
          "Рахувати лише вибрані Parts (ціль/дзеркала), менше випадкових влучань",
          "Збільшити гучність",
          "Створити leaderstats",
        ],
 correctAnswer: 1,
 explanation: "Фільтр цілей.",
 },
 {
 id: "q6",
 type: MC,
 question: "Чому погано видавати ключ лише з LocalScript після «візуального» Beam?",
 options: [
          "LocalScript не вміє print",
          "Beam заборонений у Roblox",
          "Клієнт ненадійний для нагород - легко підробити",
          "Так швидше завжди і безпечніше",
        ],
 correctAnswer: 2,
 explanation: "Never trust client для луту.",
 },
 {
 id: "q7",
 type: MC,
 question: "Що повертає Raycast, якщо нічого релевантного не влучило?",
 options: [
          "nil (немає результату)",
          "Обов’язково Baseplate",
          "Помилку компіляції завжди",
          "Новий Player",
        ],
 correctAnswer: 0,
 explanation: "Перевіряй if result then.",
 },
 {
 id: "q8",
 type: MC,
 question: "Як двері мають перевірити ключ?",
 options: [
          "Повірити TextLabel на клієнті",
          "Перевірити колір неба",
          "Порахувати Parts у Toolbox",
          "Inventory.has(player, \"Key_Blue\") на сервері",
        ],
 correctAnswer: 3,
 explanation: "Серверна перевірка володіння.",
 },
 {
 id: "q9",
 type: MC,
 question: "Навіщо PlayerRemoving у Inventory Module?",
 options: [
          "Видалити Workspace",
          "Вимкнути Pathfinding",
          "Прибрати bags[player], щоб не тримати зайві дані",
          "Обов’язково Publish",
        ],
 correctAnswer: 2,
 explanation: "Очищення стану гравця.",
 },
 {
 id: "q10",
 type: MC,
 question: "Який мінімум для зв’язку з квестом/хабом після пазла?",
 options: [
          "Лише гарний Sky",
          "Предмет у інвентарі або Attribute на кшталт PuzzleDone",
          "Лише зміна Material підлоги",
          "Видалення NPC",
        ],
 correctAnswer: 1,
 explanation: "Видимий прапорець для інших систем.",
 },
 {
 id: "q11",
 type: MC,
 question: "Чим table-інвентар відрізняється від Tool у Backpack у цьому уроці?",
 options: [
          "Table завжди видно як 3D меч",
          "Tool не існує в Roblox",
          "Інвентар можна писати тільки в ReplicatedFirst",
          "Це логічний список id на сервері, зручний для ключів/квестів",
        ],
 correctAnswer: 3,
 explanation: "Логіка володіння vs фізичний Tool.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що робити при спамі Prompt, щоб не роздати 50 ключів?",
 options: [
          "Перевіряти has перед add / debounce",
          "Вимкнути сервер",
          "Давати ключ лише на клієнті",
          "Збільшити Rate частинок",
        ],
 correctAnswer: 0,
 explanation: "Одноразовість і захист.",
 },
 {
 id: "q13",
 type: MC,
 question: "UI інвентарю має бути…",
 options: [
          "Єдиним місцем, де зберігається правда ключів",
          "Заміною Raycast",
          "Відображенням даних з сервера (наприклад після InvUpdated)",
          "Обов’язково без тексту",
        ],
 correctAnswer: 2,
 explanation: "UI = відображення.",
 },
 {
 id: "q14",
 type: MC,
 question: "Навіщо removeItem після відкриття дверей одноразовим ключем?",
 options: [
          "Щоб зламати ModuleScript",
          "Це вимикає Remotes",
          "Щоб очистити Terrain",
          "Ключ витрачається, повторне відкриття потребує нового проходження",
        ],
 correctAnswer: 3,
 explanation: "Витрата предмета.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 10.7?",
 options: [
          "Лише теорія без Studio",
          "Працюючий Raycast→ключ в Inventory→перевірка дверей/квесту + Save",
          "Порожній Baseplate",
          "Магазин без сервера",
        ],
 correctAnswer: 1,
 explanation: "Потрібен зібраний пазл з інвентарем.",
 },
 ],
 },
}

export const ukLesson108 = {
 lessonId: "lesson-roblox-10-8",
 moduleId: "module-10",
 order: 8,
 title: "10.8 - Ship хаб",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати один золотий шлях хабу: квест → пазл/дія → нагорода → магазин",
 "Перевірити інтеграцію Remote-магазину, NPC-квесту і Raycast/інвентарю",
 "Пройти рубрику Ship хабу (~15 пунктів) і закрити блокери",
 "Залишити Output чистим на маршруті й зрозумілий онбординг",
 "Зберегти Place як артефакт модуля 10 перед Polish (M11)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 80 з 92)",
 content: `Це **фінал модуля «Живий хаб»**. Не новий жанр з нуля і не «ще одна фіча». Сьогодні ти **зшиваєш** те, що вже є, в один досвід, який можна показати за 90 секунд.

У модулі 10 ти (або група) збирав:
1. **10.1** - простір хабу + папки RS/SSS + UI-заготовка.
2. **10.2–10.3** - магазин через Remotes + анти-чит lite.
3. **10.4–10.6** - NPC, pathfinding, квест з table.
4. **10.7** - інвентар / Raycast-кімната.

Сьогоднішній артефакт: **один Place**, де гравець без суфлера проходить:
**спавн → розуміє ціль → робить квест або пазл → отримує монети/предмет → може купити в магазині → цикл не ламається.**

Якщо якоїсь системи ще немає - зроби **lite-версію** саме під цей маршрут (1 товар, 1 квест, 1 пазл), а не три недороблені світи.

**Зроби зараз (3 хв):** відкрий свій хаб і одним реченням запиши золотий шлях. Якщо не можеш - спочатку намалюй стрілки на папері.`,
 },
 {
 title: "Що означає Ship хаб (і що ні)",
 content: `| Ship хаб | Ще НЕ ship |
|----------|-----------|
| Магазин + квест + (пазл або інвентар) працюють **разом** | Три окремі демо в різних Places |
| Монети з квесту реально купують товар | Квест дає print, магазин живе окремо |
| NPC/Prompt веде на наступний крок | Гравець стоїть і не знає куди |
| Output без червоного на маршруті | «Помилки ігноруємо» |
| 60–90 с демо без пояснень | 5 хв «зараз покажу де кнопка» |

Ship **не** означає AAA-хаб на рік. Означає: **короткий повний цикл уже зібраний**, іменований і стабільний.

Після цього уроку модуль 11 (Polish) має куди клеїти loading, juice й Demo Ready - на **цей** Place, а не на порожній Baseplate.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Карта систем, які зшиваємо",
 content: `| Система | Де живе логіка | Що має дати золотому шляху |
|---------|----------------|----------------------------|
| Хаб-білд | Workspace папки | Спавн, зони Shop / Quest / Puzzle |
| Магазин | SSS Script + RS Remotes + LocalScript UI | Купівля з **серверною** ціною |
| leaderstats | Server Script | Coins видно в TAB і після нагороди |
| NPC + Prompt | Model + Prompt + діалог | Старт квесту / підказка |
| Квест | table цілей + Attributes/Values | Нагорода в Coins |
| Пазл / Raycast | ModuleScript / Script | Предмет або прапорець «готово» |
| Анти-чит lite | сервер магазину | Не вірити ціні з клієнта |

Правило інтеграції: **одна правда про монети** - на сервері в leaderstats. Квест і магазин пишуть туди ж, не в «свою» змінну на клієнті.

**Зроби зараз (4 хв):** у Explorer знайди \`Coins\` (або як назвав), \`Buy\` Remote, NPC із Prompt. Якщо чогось немає - познач як P0 на сьогодні.`,
 },
 {
 title: "Золотий шлях хабу (зафіксуй 6–8 кроків)",
 content: `Запиши **до** фіксів. Приклад робочого маршруту:

1. Спавн біля таблички «Спочатку квест у NPC».
2. Підійти до NPC → ProximityPrompt → коротке «принеси ключ / пройди кімнату».
3. Зайти в зону пазла / Raycast → отримати предмет або Attribute \`HasKey = true\`.
4. Повернутись до NPC → квест complete → **+Coins** на сервері.
5. Відкрити UI магазину → купити 1 товар за монети.
6. Побачити підтвердження (звук / текст / предмет у інвентарі).
7. Output чистий; монети списались правильно.
8. Можна повторити або купити ще (якщо баланс дозволяє).

Це і є «інтеграція». Не «усі фічі існують у файлах», а **гравець відчуває ланцюг**.

Якщо пазла ще немає - замініть крок 3 на просту зону Touched «зібрати прапорець», але **зв’язок із квестом** лишається.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Рубрика Ship хабу (~15 пунктів)",
 content: `Став **так / ні / майже**. Мета уроку: якомога більше **так** саме на золотому шляху.

### A. Простір і онбординг (1–4)
| # | Пункт | Так? |
|---|-------|------|
| 1 | Спавн стабільний, зони Shop/Quest/Puzzle видно | |
| 2 | Табличка або NPC каже перший крок ≤30–60 с | |
| 3 | Імена/папки читаються (не 40× Part) | |
| 4 | Немає «мертвих» дверей без підказки на маршруті | |

### B. Квест + пазл/дія (5–8)
| # | Пункт | Так? |
|---|-------|------|
| 5 | Prompt/діалог стартує квест | |
| 6 | Умова квесту перевіряється (table / Attribute) | |
| 7 | Пазл або Raycast/зона дає прогрес квесту | |
| 8 | Нагорода в **Coins на сервері**, видно в TAB/HUD | |

### C. Магазин і мережа (9–12)
| # | Пункт | Так? |
|---|-------|------|
| 9 | UI магазину відкривається з хабу | |
| 10 | Купівля йде через Remote; ціна з Config на сервері | |
| 11 | Недостатньо монет → зрозуміле повідомлення | |
| 12 | Анти-спам / повторний клік не ламає баланс | |

### D. Ship-якість (13–15)
| # | Пункт | Так? |
|---|-------|------|
| 13 | Output без червоного на всьому шляху | |
| 14 | Можу провести демо 60–90 с без суфлера | |
| 15 | Save з назвою Lesson 10.8 - Hub Ship | |

Усе «ні» = список фіксів Part B. Не роздувай скоуп: спочатку A+B+C на одному товарі й одному квесті.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Типові дірки інтеграції (і швидкі фікси)",
 content: `| Симптом | Ймовірна причина | Швидкий фікс |
|---------|------------------|--------------|
| Квест дає монети, магазин «не бачить» | Різні місця зберігання / клієнтські монети | Один IntValue у leaderstats, пише лише сервер |
| Купівля з UI без Remote | LocalScript сам міняє Coins | FireServer → сервер перевіряє Config |
| NPC говорить, квест не оновлюється | Немає запису прогресу | Attribute / BoolValue / table стану гравця |
| Пазл «готово», квест ні | Системи не слухають одна одну | Після пазла виставляй прапорець, який читає квест |
| Після купівлі від’ємні монети | Немає перевірки canAfford | if coins >= price then … else FireClient помилка |
| Демо розвалюється на 2-й спробі | Стан не скидається / дубль підписок | Один OnServerEvent; чистий старт квесту |

**Зроби зараз (6 хв):** пройди шлях раз і познач перший червоний пункт рубрики. Лагод його раніше за «красивий UI».`,
 },
 {
 title: "Міні-схема даних (щоб не плутатись)",
 content: `Уяви три коробки:

1. **Config** (ModuleScript або table у сервері) - ціни товарів, id квесту, цілі. Клієнт може **читати** каталог через RemoteFunction, але **не диктує** ціну купівлі.
2. **Player state** - Coins у leaderstats; прогрес квесту (Attributes / Values / своя table на сервері).
3. **World triggers** - Prompt, Touched, Raycast hit - лише **сигнали**. Рішення «зарахувати / дати нагороду» приймає сервер.

Приклад думки сервера (спрощено, без сирих fences):

\`local function tryCompleteQuest(player)\`
\` if not hasFlag(player, "PuzzleDone") then return end\`
\` if alreadyRewarded(player) then return end\`
\` addCoins(player, QUEST_REWARD)\`
\` markRewarded(player)\`
\`end\`

І окремо для магазину:

\`local function tryBuy(player, itemId)\`
\` local price = ShopConfig[itemId].price\`
\` local coins = getCoins(player)\`
\` if coins < price then deny(player) return end\`
\` setCoins(player, coins - price)\`
\` giveItem(player, itemId)\`
\`end\`

Клієнт лише каже «хочу купити itemId» або «натиснув завершити». Сервер каже «так/ні».

**Зроби зараз (4 хв):** спробуй купівлю з 0 монет і після успішної покупки - перевір TAB/Output.`,
 },
 {
 title: "Онбординг хабу за 10 хвилин",
 content: `Новачок у хабі губиться швидше, ніж в obby: багато дверей, мало підказок.

Мінімум на спавні:
- табличка з 3 короткими кроками;
- яскравий колір / Neon на зоні квесту;
- ActionText у Prompt на кшталт «Поговорити з квестодавцем», не «Interact».

Текст таблички (приклад):
*«1) Підійди до NPC з ! 2) Виконай завдання в синій кімнаті. 3) Купи нагороду в магазині.»*

Не пиши роман. Не пиши «використовуй RemoteFunction» - це для тебе, не для гравця.

Перевір онбординг так: відійди від монітора на 1 м уявно (або попроси сусіда на 30 с) - чи зрозуміло куди йти без твоїх слів?

**Зроби зараз (4 хв):** зроби один Remote-виклик і зафіксуй, хто приймає рішення - клієнт чи сервер.`,
 },
 {
 title: "Playtest інтеграції (чекліст на 15′)",
 content: `| # | Дія | Очікування | Факт |
|---|-----|------------|------|
| 1 | Новий Play | Спавн ок, табличка видно | |
| 2 | Старт квесту | Prompt працює, стан «активний» | |
| 3 | Пазл/зона | Прапорець/предмет з’явився | |
| 4 | Здача квесту | Coins зросли в TAB | |
| 5 | Відкрити магазин | UI зі списком | |
| 6 | Купівля з достатнім балансом | Списання + товар | |
| 7 | Купівля без монет | Відмова + повідомлення | |
| 8 | Повтор шляху | Немає подвійної нагороди / крашу | |
| 9 | Output | Немає червоного | |
| 10 | Демо 90 с | Вкладаєшся без пояснень | |

Якщо пункт 4 і 6 зелені, а 8 червоний - у тебе класична дірка стану. Фікси її сьогодні: це і є ship, не «нова кнопка».

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 {
 title: "Що свідомо відкласти (скоуп control)",
 content: `Не роби сьогодні:
- 12 товарів і 5 гілок діалогу;
- повний DataStore сейв «на вічність» (якщо ще нестабільно - lite ок);
- GamePass оплату замість монет (lite-пояснення було в 10.3, не обов’язок у демо);
- новий відкритий світ на 5 хвилин ходьби;
- Publish Public (це ближче до M12).

Роби сьогодні:
- **один** квест;
- **один** пазл/тригер;
- **один** товар у магазині, який купується за монети з квесту;
- рубрика + Save.

Все «хочу ще» - у нотатку для M11/M12. Ship любить вузький переможний цикл.

**Зроби зараз (4 хв):** зроби save/load або чесно задокументуй mock-режим у Output.`,
 },
 {
 title: "Зв’язок із M11 і портфоліо",
 content: `| Після 10.8 | Далі в курсі |
|------------|--------------|
| Робочий хаб із ланцюгом систем | 11.1 аудит Explorer на цьому Place |
| Золотий шлях 90 с | 11.5 Demo Ready / 11.6 сліпий тест |
| Remotes + leaderstats живі | Легше пояснити на SHOWCASE «як працює магазин» |
| Чесний lite-обсяг | 12.1 пітч MVP без фантазій |

Якщо хаб «майже», але магазин ще на клієнті - **не** йди далі з гордістю. Сьогоднішній P0: серверна купівля + монети з квесту в ті самі Coins.

Save: \`Lesson 10.8 - Hub Ship\`.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Чекліст здачі уроку 80",
 content: `- [ ] Золотий шлях записаний (6–8 кроків)
- [ ] Рубрика ~15 пунктів проставлена
- [ ] Квест дає Coins на сервері
- [ ] Магазин купує через Remote з Config-ціною
- [ ] Пазл/зона реально впливає на квест (або чесна lite-заміна)
- [ ] Playtest-таблиця пройдена хоча б раз
- [ ] Output чистий на маршруті
- [ ] Демо 60–90 с репетиція ×1–2
- [ ] Place збережено як Lesson 10.8 - Hub Ship

Якщо все це є - модуль 10 закрито. Можна йти в Polish.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Три окремі Places «магазин», «квест», «пазл» замість одного хабу",
 explanation: "Немає інтеграції - нічого ship-ити.",
 correctApproach: "Один Place, один золотий шлях через усі системи",
 },
 {
 mistake: "Квест пише монети в LocalScript, магазин читає leaderstats",
 explanation: "Баланс роз’їжджається, чити й баги.",
 correctApproach: "Одна правда Coins на сервері",
 },
 {
 mistake: "Ціна товару приходить з клієнта",
 explanation: "Експлуатація магазину.",
 correctApproach: "itemId з клієнта, price з ShopConfig на сервері",
 },
 {
 mistake: "Рубрика «майже все так», але демо потребує суфлера",
 explanation: "Це не ship для гравця.",
 correctApproach: "Онбординг + 90 с без пояснень",
 },
 {
 mistake: "Подвійна нагорода квесту при кожному Prompt",
 explanation: "Економіка ламається.",
 correctApproach: "Прапорець alreadyRewarded / одноразова здача",
 },
 {
 mistake: "Роздути 10 товарів замість закрити 1 цикл",
 explanation: "Година зникає, блокери лишаються.",
 correctApproach: "1 квест + 1 товар + стабільний шлях",
 },
 ],
 summary: "Ти зібрав Ship хаб: один золотий шлях, де квест, пазл/дія і Remote-магазин ділять одні Coins на сервері. Рубрика й playtest підтверджують, що демо 60–90 с працює без суфлера - база для Polish у модулі 11.",
 practiceTask: {
 title: "Ship хаб: зшити і здати (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** один Place з інтегрованим циклом квест → нагорода → магазин.

### Part A - Карта і рубрика (8 хв)
1. Запиши золотий шлях 6–8 кроків.
2. Пройди рубрику ~15 пунктів у Play.
3. Випиши P0 (усі «ні» з блоків B і C).

### Part B - Інтеграційні фікси (15 хв)
1. Зв’яжи пазл/зону з умовою квесту.
2. Нагорода квесту → leaderstats Coins (сервер).
3. Купівля 1 товару через Remote + Config price.
4. Повідомлення «недостатньо монет».
5. Захист від подвійної нагороди.

### Part C - Демо і Save (7 хв)
1. Пройди playtest-таблицю 1–10.
2. Репетиція демо 60–90 с.
3. **Зберегти:** Lesson 10.8 - Hub Ship
4. **Практика завершена**, коли рубрика має максимум «так» на маршруті й Output чистий.`,
 hints: [
 "Спочатку монети й Remote, потім краса UI",
 "Один товар у каталозі достатньо для ship",
 "Якщо пазла немає - lite Touched-прапорець, але квест має його читати",
 ],
 optionalChallenge: "Другий товар у магазині, який вимагає Attribute з пазла (серверна перевірка «має ключ»).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 10.8 - це…",
 options: [
          "Зшити хаб в один золотий шлях і закрити рубрику Ship",
          "Почати новий жанр obby з нуля",
          "Одразу Publish Public на весь світ",
          "Видалити всі Remotes",
        ],
 correctAnswer: 0,
 explanation: "Інтеграція і здача модуля 10.",
 },
 {
 id: "q2",
 type: MC,
 question: "Де має жити «правда» про кількість монет?",
 options: [
          "Лише в LocalScript магазину",
          "На сервері в leaderstats (або еквівалент)",
          "У назві Part",
          "У Lighting.ClockTime",
        ],
 correctAnswer: 1,
 explanation: "Одна серверна правда для квесту і магазину.",
 },
 {
 id: "q3",
 type: MC,
 question: "Що клієнт може надіслати при купівлі безпечно?",
 options: [
          "Будь-яку ціну, яку сам вигадав",
          "Команду видалити чужі Coins",
          "itemId (ідентифікатор товару)",
          "Запит змінити ShopConfig у всіх",
        ],
 correctAnswer: 2,
 explanation: "Ціну бере сервер з Config.",
 },
 {
 id: "q4",
 type: MC,
 question: "Чому три окремі Places замість одного хабу - поганий ship?",
 options: [
          "Roblox забороняє кілька Places",
          "Так швидше завжди",
          "Так вимагає Terrain",
          "Немає інтегрованого досвіду для гравця",
        ],
 correctAnswer: 3,
 explanation: "Ship = зшитий цикл.",
 },
 {
 id: "q5",
 type: MC,
 question: "Який мінімальний ланцюг вважається інтеграцією хабу?",
 options: [
          "Лише гарна табличка без систем",
          "Квест/дія → нагорода в Coins → покупка в магазині",
          "Лише ParticleEmitter",
          "Лише зміна неба",
        ],
 correctAnswer: 1,
 explanation: "Ланцюг економії та Remotes.",
 },
 {
 id: "q6",
 type: MC,
 question: "Що робити, якщо пазла з 10.7 ще немає?",
 options: [
          "Скасувати весь модуль 10",
          "Купувати без монет на клієнті",
          "Lite-тригер (зона/прапорець), але зв’язати з квестом",
          "Ігнорувати онбординг",
        ],
 correctAnswer: 2,
 explanation: "Чесна lite-заміна заради шляху.",
 },
 {
 id: "q7",
 type: MC,
 question: "Навіщо прапорець alreadyRewarded у квесті?",
 options: [
          "Щоб не видавати нагороду багато разів",
          "Щоб вимкнути Anchored",
          "Щоб замінити RemoteEvent",
          "Це обов’язково для Terrain",
        ],
 correctAnswer: 0,
 explanation: "Захист економіки.",
 },
 {
 id: "q8",
 type: MC,
 question: "Що з наведеного - типова дірка інтеграції?",
 options: [
          "Є табличка на спавні",
          "Є один товар у Config",
          "Output чистий",
          "Квест і магазин пишуть монети в різні місця",
        ],
 correctAnswer: 3,
 explanation: "Різні сховища = роз’їзд балансу.",
 },
 {
 id: "q9",
 type: MC,
 question: "Онбординг хабу на спавні мінімально потребує…",
 options: [
          "12 панелей HUD одразу",
          "Публікацію в каталог",
          "Зрозумілий перший крок (табличка/NPC/маркер)",
          "Вимкнення Explorer",
        ],
 correctAnswer: 2,
 explanation: "Новачок має знати куди йти.",
 },
 {
 id: "q10",
 type: MC,
 question: "Що свідомо відкладаємо в 10.8?",
 options: [
          "Перевірку Output",
          "Роздуття каталогу й Publish Public замість стабільного циклу",
          "Один товар і один квест",
          "Рубрику Ship",
        ],
 correctAnswer: 1,
 explanation: "Скоуп control.",
 },
 {
 id: "q11",
 type: MC,
 question: "Навіщо playtest-таблиця з повторним проходженням шляху?",
 options: [
          "Замінює всі Remotes",
          "Потрібна лише для Lighting",
          "Це заборонено в Studio",
          "Ловить подвійні нагороди і краші на 2-й спробі",
        ],
 correctAnswer: 3,
 explanation: "Стан і стабільність.",
 },
 {
 id: "q12",
 type: MC,
 question: "ShopConfig на сервері потрібен, щоб…",
 options: [
          "Брати ціну/дані товару без довіри до клієнта",
          "Малювати Terrain",
          "Вимкнути Pathfinding",
          "Замінити SpawnLocation",
        ],
 correctAnswer: 0,
 explanation: "Джерело правди для магазину.",
 },
 {
 id: "q13",
 type: MC,
 question: "Який пункт рубрики стосується мережі магазину?",
 options: [
          "Колір неба о 18:00",
          "Кількість дерев на острові",
          "Купівля через Remote і ціна з Config",
          "Назва модуля 1",
        ],
 correctAnswer: 2,
 explanation: "Блок C рубрики.",
 },
 {
 id: "q14",
 type: MC,
 question: "Після успішного 10.8 логічний наступний крок курсу…",
 options: [
          "Видалити хаб і почати Baseplate",
          "Пропустити всі тести",
          "Прибрати leaderstats назавжди",
          "Polish M11 на цьому ж Place (аудит, juice, Demo Ready)",
        ],
 correctAnswer: 3,
 explanation: "Хаб - база для polish.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом уроку 10.8?",
 options: [
          "Лише теорія без Studio",
          "Place Hub Ship з інтегрованим шляхом, рубрикою й чистим Output",
          "Порожній магазин без монет",
          "Окремий файл лише з ParticleEmitter",
        ],
 correctAnswer: 1,
 explanation: "Потрібен зібраний хаб.",
 },
 ],
 },
}
