export const ukLesson40 = {
  lessonId: "lesson-roblox-6-2",
  moduleId: "module-06",
  order: 2,
  title: "6.2 - leaderstats",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Пояснити, чому TAB читає саме Folder з іменем leaderstats",
    "Створити Folder leaderstats і IntValue Coins на сервері через PlayerAdded",
    "Опційно додати IntValue Power зі стартом 1 поруч із Coins",
    "Обробити вже підключених гравців циклом for і FindFirstChild",
    "Тримати Parent = player, а не Character, і не створювати stats у LocalScript",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 40 з 92)",
        content: `У 6.1 ти зібрав сцену острова: є що збирати й куди бігати. Але прогрес гравця ще ніде не рахується. Сьогодні будуєш число: **leaderstats** з IntValue Coins на сервері. Це якір модуля 6 - HUD, giveCoins, спавн, Power і DataStore читатимуть або писатимуть саме сюди.

Артефакт уроку:
1. Script у ServerScriptService (не LocalScript).
2. Players.PlayerAdded створює Folder leaderstats + IntValue Coins.
3. (Опційно) IntValue Power зі стартом 1.
4. Цикл for по вже підключених гравцях.
5. TAB показує ім'я і Coins без додаткового UI і Save **Lesson 6.2 - leaderstats**.

| Було в 6.1 | Стає в 6.2 |
|-------------|------------|
| Сцена і маркери збору | Число Coins, яке реально рахується |
| Гравець бачить світ | Гравець бачить прогрес у TAB |
| Немає серверної правди | Одна Folder на Player |

У 6.3 HUD лише прочитає той самий Coins. У 6.4 giveCoins писатиме в нього. У 6.7 DataStore завантажить збережене число в цей самий IntValue.

Метафора: leaderstats - паспорт гравця; TAB - вікно, крізь яке всі його читають.

**Зроби зараз (2 хв):** відкрий ServerScriptService і підготуй місце для першого серверного Script про дані гравця.`,
      },
      {
        title: "Що таке leaderstats",
        content: `leaderstats - не довільна папка. Це контракт із вбудованим UI Roblox: якщо в Player з'являється Folder з іменем рівно **leaderstats**, Roblox бере кожен Value усередині і малює колонку в списку TAB.

Ти не малюєш Frame і не пишеш окремий UI-код. Достатньо правильної структури Instance.

\`Player\`
\` └ leaderstats (Folder)\`
\`   └ Coins (IntValue)\`

| Елемент | Роль |
|---------|------|
| Folder leaderstats | Контейнер, який TAB шукає за іменем |
| IntValue Coins | Число монет |
| Порядок дітей | Порядок колонок у TAB |

Додаси Power поруч - друга колонка з'явиться сама. Не потрібен ScreenGui для цієї перевірки.

Образ: табло на стадіоні вже висить; твоя робота - підключити правильні датчики.

**Зроби зараз (2 хв):** відкрий Explorer → Players і переконайся, що leaderstats ще немає.`,
      },
      {
        title: "Ім'я рівно leaderstats",
        content: `Roblox шукає рядок точно **leaderstats** - маленькими літерами, без пробілів і варіацій. LeaderStats, Leaderstats, leader_stats, PlayerStats - жоден варіант не спрацює. TAB просто не побачить Folder.

Класична пастка: код компілюється, print показує число, а TAB порожній через одну літеру.

| Написання | TAB |
|-----------|-----|
| leaderstats | Так |
| Leaderstats | Ні |
| LeaderStats | Ні |
| leader_stats | Ні |

Порада: задай ім'я один раз як константу або скопіюй з надійного місця. Для Coins бери саме IntValue - ціле число без десяткових залишків.

Найчастіша дірка новачків - година дебагу без помилки в Output, бо регістр імені не збігається.

Метафора: пароль до табло чутливий до регістру; одна велика літера - і двері зачинені.

**Зроби зараз (2 хв):** напиши leaderstats у Script і порівняй символ за символом.`,
      },
      {
        title: "Folder + IntValue Coins",
        content: `Створення stats - кілька викликів Instance.new:

\`local leaderstats = Instance.new("Folder")\`
\`leaderstats.Name = "leaderstats"\`
\`leaderstats.Parent = player\`

\`local coins = Instance.new("IntValue")\`
\`coins.Name = "Coins"\`
\`coins.Value = 0\`
\`coins.Parent = leaderstats\`

| Instance | Name | Старт |
|----------|------|-------|
| Folder | leaderstats | - |
| IntValue | Coins | 0 |

Coins стартує з 0 - гравець ще нічого не зібрав. Не став випадкове «красиве» число: у 6.7 DataStore має розуміти, що 0 означає нового гравця або порожній прогрес сесії.

Порядок присвоєнь: спочатку Name і Value, потім Parent. Так менше шансів побачити напівготовий об'єкт у TAB на один кадр.

Образ: спочатку заповни поля паспорта, потім видай його гравцю.

**Зроби зараз (5 хв):** напиши цей блок усередині функції createStats без запуску Play.`,
      },
      {
        title: "Power опційно: старт 1, не 0",
        content: `У 6.6 з'явиться Power як множник нагороди. Колонку можна закласти вже сьогодні.

\`local power = Instance.new("IntValue")\`
\`power.Name = "Power"\`
\`power.Value = 1\`
\`power.Parent = leaderstats\`

| Value | Чому |
|-------|------|
| Coins = 0 | Ще нічого не зібрано |
| Power = 1 | Нейтральний множник |

Чому не 0: формула \`final = amount * Power\` при Power 0 обнулить усі нагороди. Нейтральне «без бонусу» - це 1.

Мінімум здачі - лише Coins. Power рекомендований: у 6.6 не доведеться згадувати, де створюються stats, і DataStore у 6.7 одразу матиме друге поле.

Метафора: Power=1 - нейтральна передача; Power=0 - затягнуте гальмо.

**Зроби зараз (2 хв):** виріши зараз чи пізніше; якщо зараз - додай Power одразу після Coins.`,
      },
      {
        title: "PlayerAdded - вхід гравця",
        content: `Players.PlayerAdded спрацьовує один раз, коли гравець приєднується. Це природне місце для створення stats: гравець щойно з'явився, Folder ще немає.

\`local Players = game:GetService("Players")\`
\`Players.PlayerAdded:Connect(function(player)\`
\`  createStats(player)\`
\`end)\`

Аргумент player - Instance цього гравця. Саме до нього Parent = player. Підписку Connect роби один раз на верхньому рівні Script, не всередині циклу.

| Подія | Коли |
|-------|------|
| PlayerAdded | Гравець зайшов |
| PlayerRemoving | Гравець виходить (для save у 6.7) |
| CharacterAdded | Тіло з'явилось / респавнилось |

Сьогодні потрібен PlayerAdded, не CharacterAdded. Stats живуть довше за тіло.

Образ: PlayerAdded - момент видачі паспорта на вході в будівлю.

**Зроби зараз (4 хв):** підключи print(player.Name, "joined") і перевір Output у Play.`,
      },
      {
        title: "for existing players",
        content: `Нюанс Studio і Team Test: якщо Script стартує після того, як гравець уже в грі, PlayerAdded для нього не повториться. Він лишиться без leaderstats.

Захист - одна функція createStats і два виклики:

\`Players.PlayerAdded:Connect(createStats)\`
\`for _, player in ipairs(Players:GetPlayers()) do\`
\`  createStats(player)\`
\`end\`

| Порядок | Навіщо |
|---------|--------|
| Спочатку Connect | Не пропустити нових під час циклу |
| Потім GetPlayers | Закрити вже присутніх |

У Solo Play різниці часто не видно. У Team Test або на живому сервері цикл рятує перших гравців від порожнього TAB.

Не став цикл до Connect без причини: теоретично новий гравець може встигнути зайти між циклом і підпискою. Стандартний патерн: Connect, потім for.

Метафора: спочатку постав охорону на двері, потім перевір, хто вже в залі.

**Зроби зараз (5 хв):** додай цикл, навіть якщо зараз здається, що він нічого не робить.`,
      },
      {
        title: "Лише Script у ServerScriptService",
        content: `leaderstats створює звичайний Script у ServerScriptService. Це вимога, не стиль: лише сервер вирішує, скільки монет у гравця, і лише серверний Script однаково бачить усіх через PlayerAdded.

| Тип | Де | Годиться? |
|-----|-----|-----------|
| Script | ServerScriptService | Так |
| LocalScript | Клієнт | Ні |
| ModuleScript | Лише require | Ні як автозапуск |

ServerScriptService виконується лише на сервері й не віддає свій код клієнтам як робочий Script.

Якщо в Place уже є серверні Scripts з 6.1 - додай окремий Script для stats або чітку функцію в існуючому, але не розкидай створення leaderstats по п'яти місцях.

Образ: сервер - нотаріус; клієнт не виписує собі паспорт.

**Зроби зараз (3 хв):** переконайся, що Script лежить у ServerScriptService, не в Workspace і не в StarterPlayer.`,
      },
      {
        title: "Parent = player, не Character",
        content: `Folder leaderstats має Parent = player, а не player.Character. Character - модель тіла - знищується при смерті, Stop/Play і респавні. Прив'яжеш stats до Character - Coins зникатиме щоразу.

| Parent | Після смерті |
|--------|--------------|
| player | leaderstats лишається |
| player.Character | Folder знищується з тілом |

Player живе від PlayerAdded до PlayerRemoving. Character - лише поточне тіло. Помилка підступна: у перші секунди все виглядає нормально, розкол видно після першої смерті.

Це головна перевірка playtest уроку 40.

Метафора: паспорт у кишені людини, а не на тимчасовій куртці, яку змінюють після дощу.

**Зроби зараз (3 хв):** знайди .Parent = для leaderstats і переконайся, що там player.`,
      },
      {
        title: "FindFirstChild проти дублікатів",
        content: `Навіть із правильним Parent захистись від повторного створення:

\`local function createStats(player)\`
\`  if player:FindFirstChild("leaderstats") then return end\`
\`  -- Instance.new ...\`
\`end\`

FindFirstChild повертає Instance або nil і не блокує. Це ідеально для перевірки «чи вже є». WaitForChild чекає - його тут не треба.

| Ситуація | Дія |
|----------|-----|
| leaderstats уже є | return |
| Немає | Створити Folder і Values |
| Script виконався двічі | Другий виклик безпечний |

Той самий FindFirstChild рятуватиме giveCoins у 6.4: перед записом перевірити, що stats існують. Не плутай із прямим player.leaderstats - прямий доступ до відсутнього поля кидає помилку.

Образ: перед видачею нового паспорта перевір, чи старий уже в руках.

**Зроби зараз (4 хв):** додай перевірку FindFirstChild на початок createStats.`,
      },
      {
        title: "Ніколи не створюй leaderstats на клієнті",
        content: `LocalScript технічно може зробити Instance.new("Folder") з іменем leaderstats і Parent = LocalPlayer. Lua не заборонить. Результат - ілюзія:

| Що станеться | Чому погано |
|--------------|-------------|
| Instance лише на цьому клієнті | Сервер і інші не бачать |
| Інші не бачать твій рядок у TAB | Немає реплікації клієнт → світ |
| Гравець контролює число | Це чіт |

Правило модуля 6: клієнт показує, сервер вирішує. У 6.2 це означає: жодного Instance.new для leaderstats у LocalScript.

Корисна вправа-злам: у тестовому LocalScript постав Coins = 999, подивись TAB, потім видали код. Це демонстрація помилки, не здача.

Метафора: намальований паспорт у дзеркалі не пропустить через кордон.

**Зроби зараз (4 хв):** зроби коротку демонстрацію і одразу прибери клієнтський код.`,
      },
      {
        title: "Playtest і типові дірки",
        content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Play | TAB: ім'я і Coins = 0 |
| 2 | Power (якщо є) | Power = 1 |
| 3 | Command Bar змінює Coins | TAB оновлюється |
| 4 | Team Test два клієнти | Обидва рядки видно |
| 5 | Смерть / респавн | Coins не зникає |
| 6 | Stop → Play | Stats знову з 0 (норма до 6.7) |
| 7 | Output | Без nil warn |
| 8 | Пошук у LocalScript | Немає створення leaderstats |

| Симптом | Причина | Фікс |
|---------|---------|------|
| TAB порожній | Ім'я не leaderstats | Перевір регістр |
| Coins зникає при смерті | Parent = Character | Parent = player |
| Перший без stats | Немає for existing | Додай GetPlayers |
| Два конфліктні Folder | LocalScript теж створює | Прибери клієнт |
| Power = 0 | Забув Value = 1 | Вистав 1 |

Пункт 5 - серце здачі.

Метафора: playtest - контроль, що паспорт не змивається під дощем.

**Зроби зараз (8 хв):** пройди пункти 1, 5 і 8 обов'язково.`,
      },
      {
        title: "Місток до HUD і каси + чекліст",
        content: `| Урок | Що візьме з 6.2 |
|------|-----------------|
| 6.3 HUD | WaitForChild("leaderstats").Coins на читання |
| 6.4 giveCoins | Запис у Coins.Value |
| 6.6 Power | Множник з того самого Folder |
| 6.7 DataStore | Load/save цих самих чисел |

Чекліст:
- [ ] Script у ServerScriptService
- [ ] Folder з іменем рівно leaderstats
- [ ] IntValue Coins = 0
- [ ] (Опційно) IntValue Power = 1
- [ ] Parent = player, не Character
- [ ] PlayerAdded + for existing players
- [ ] FindFirstChild перед створенням
- [ ] TAB показує ім'я і Coins
- [ ] Немає створення stats у LocalScript
- [ ] Save: Lesson 6.2 - leaderstats

Артефакт: серверна правда про прогрес у одному місці - Player.leaderstats - незалежна від смерті Character.

Короткий ритуал: Play → Tab → Coins = 0 → смерть → респавн → число на місці.

Метафора: фінальний Save фіксує паспортний стіл перед тим, як відкриється вітрина HUD.

**Зроби зараз (3 хв):** пройди ритуал і збережи Place під точною назвою.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Folder названо Leaderstats або LeaderStats",
      explanation: "TAB шукає рядок точно leaderstats маленькими літерами і ігнорує інші варіанти.",
      correctApproach: "Задати ім'я Folder рівно leaderstats без великих літер і підкреслень.",
    },
    {
      mistake: "Parent leaderstats = player.Character",
      explanation: "Character знищується при смерті, тож Coins зникає або скидається після респавну.",
      correctApproach: "Ставити Parent = player - Instance гравця, що живе всю сесію.",
    },
    {
      mistake: "leaderstats створює LocalScript",
      explanation: "Instance існує лише на цьому клієнті; сервер і інші гравці його не бачать.",
      correctApproach: "Створювати stats лише Script у ServerScriptService.",
    },
    {
      mistake: "Немає циклу for existing players",
      explanation: "Гравці, підключені до старту Script, лишаються без leaderstats.",
      correctApproach: "Після Connect викликати createStats для кожного з Players:GetPlayers().",
    },
    {
      mistake: "Power стартує з 0",
      explanation: "Множник 0 у 6.6 обнулить усі нагороди giveCoins.",
      correctApproach: "Ставити Power.Value = 1 як нейтральний множник.",
    },
    {
      mistake: "Coins зроблено як StringValue або лише Attribute",
      explanation: "TAB і подальший код очікують числовий IntValue у leaderstats.",
      correctApproach: "Створити IntValue з іменем Coins усередині Folder.",
    },
    {
      mistake: "Немає FindFirstChild перед створенням",
      explanation: "Повторний виклик може створити дублікат Folder і зламати очікування коду.",
      correctApproach: "Якщо leaderstats уже є - одразу return.",
    },
  ],
  summary: "Ти створив leaderstats на сервері: Folder leaderstats, IntValue Coins і опційно Power=1 через PlayerAdded і цикл для вже підключених. Parent = player, TAB показує прогрес - основа для HUD, giveCoins і DataStore.",
  practiceTask: {
    title: "Перша серверна правда (~30 хв)",
    difficulty: "beginner",
    description: `### Part A - Folder + IntValue (8 хв)
1. Script у ServerScriptService.
2. PlayerAdded → Folder leaderstats + IntValue Coins = 0.
3. (Опційно) IntValue Power = 1.

### Part B - Existing players + захист (12 хв)
1. Функція createStats(player) з FindFirstChild.
2. Цикл for через Players:GetPlayers().
3. Перевір Parent = player, не Character.

### Part C - Злам і перевірка (10 хв)
1. Тимчасово створи клієнтський leaderstats з 999 і подивись ілюзію, потім видали.
2. Play: TAB показує Coins; смерть не скидає число.
3. Збережи Place як **Lesson 6.2 - leaderstats**.`,
    hints: [
      "Ім'я Folder рівно leaderstats - без великих літер.",
      "Parent Folder = player, а не player.Character.",
      "Спочатку Connect на PlayerAdded, потім цикл existing players.",
      "Power = 1, якщо додаєш множник уже сьогодні.",
    ],
    optionalChallenge: "Додай третій IntValue (наприклад Gems = 0) і перевір, що TAB показує три колонки без UI-коду.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Який головний артефакт уроку 6.2?",
        options: [
          "HUD на LocalScript",
          "leaderstats.Coins на сервері, видимий у TAB",
          "giveCoins з анти-дублем",
          "DataStore rejoin",
        ],
        correctAnswer: 1,
        explanation: "Урок будує серверну правду прогресу.",
      },
      {
        id: "q2",
        type: MC,
        question: "Яке точне ім'я Folder бачить TAB?",
        options: [
          "leaderstats",
          "LeaderStats",
          "Leaderstats",
          "leader_stats",
        ],
        correctAnswer: 0,
        explanation: "Потрібен рядок рівно маленькими літерами.",
      },
      {
        id: "q3",
        type: MC,
        question: "Де має жити код створення leaderstats?",
        options: [
          "У LocalScript у StarterPlayerScripts",
          "У ModuleScript без require",
          "У Script у ServerScriptService",
          "У Lighting",
        ],
        correctAnswer: 2,
        explanation: "Лише сервер вирішує дані гравця.",
      },
      {
        id: "q4",
        type: MC,
        question: "Яка подія створює stats для нового гравця?",
        options: [
          "Players.PlayerRemoving",
          "Workspace.ChildAdded",
          "RunService.Heartbeat",
          "Players.PlayerAdded",
        ],
        correctAnswer: 3,
        explanation: "Спрацьовує один раз при вході.",
      },
      {
        id: "q5",
        type: MC,
        question: "Навіщо цикл for existing players?",
        options: [
          "Видалити leaderstats у всіх",
          "Дати stats гравцям, підключеним до старту Script",
          "Замінити PlayerAdded назавжди",
          "Створити Power = 0",
        ],
        correctAnswer: 1,
        explanation: "PlayerAdded не повториться для вже присутніх.",
      },
      {
        id: "q6",
        type: MC,
        question: "Яким має бути Parent для Folder leaderstats?",
        options: [
          "player.Character",
          "player.Character.Humanoid",
          "player",
          "Workspace",
        ],
        correctAnswer: 2,
        explanation: "Player живе всю сесію, Character - ні.",
      },
      {
        id: "q7",
        type: MC,
        question: "Що станеться при Parent = player.Character?",
        options: [
          "Coins стане швидшим",
          "TAB покаже подвійне число",
          "Це рекомендований варіант",
          "Coins зникатиме при смерті персонажа",
        ],
        correctAnswer: 3,
        explanation: "Folder знищується разом із тілом.",
      },
      {
        id: "q8",
        type: MC,
        question: "Яке стартове значення правильне для Power?",
        options: [
          "0",
          "1",
          "100",
          "-1",
        ],
        correctAnswer: 1,
        explanation: "1 - нейтральний множник для майбутньої формули.",
      },
      {
        id: "q9",
        type: MC,
        question: "Навіщо FindFirstChild перед створенням?",
        options: [
          "Щоб видалити Coins",
          "Обов'язково для TAB взагалі",
          "Захист від дубліката leaderstats",
          "Заміна PlayerAdded",
        ],
        correctAnswer: 2,
        explanation: "Повторний виклик не створює другу Folder.",
      },
      {
        id: "q10",
        type: MC,
        question: "Чи можна здати leaderstats, створений у LocalScript?",
        options: [
          "Так, це швидше",
          "Так, лише в Studio",
          "Так, якщо Power = 1",
          "Ні - інші гравці і сервер його не побачать",
        ],
        correctAnswer: 3,
        explanation: "Клієнтський Instance не є серверною правдою.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що показує TAB без додаткового UI-коду?",
        options: [
          "Ім'я гравця і колонки з leaderstats",
          "Список усіх Script",
          "Вміст ServerStorage",
          "Журнал Output",
        ],
        correctAnswer: 0,
        explanation: "Вбудований UI Roblox читає leaderstats автоматично.",
      },
      {
        id: "q12",
        type: MC,
        question: "Який тип Instance правильний для Coins?",
        options: [
          "StringValue",
          "BoolValue",
          "IntValue",
          "CFrameValue",
        ],
        correctAnswer: 2,
        explanation: "Ціле число монет.",
      },
      {
        id: "q13",
        type: MC,
        question: "Головна перевірка playtest 6.2?",
        options: [
          "HUD малює анімацію",
          "DataStore уже зберігає прогрес",
          "Coins не зникає після смерті й респавну",
          "Power видно лише в чаті",
        ],
        correctAnswer: 2,
        explanation: "Parent = player гарантує стабільність.",
      },
      {
        id: "q14",
        type: MC,
        question: "Як 6.2 готує 6.3?",
        options: [
          "6.3 видаляє leaderstats",
          "HUD створює власний leaderstats",
          "Power зникне у 6.3",
          "HUD читатиме той самий Coins.Value через WaitForChild",
        ],
        correctAnswer: 3,
        explanation: "HUD - вітрина тієї самої серверної правди.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 6.3 - HUD",
          "Lesson 6.2 - leaderstats",
          "Lesson 6.1 - Core loop",
          "Stats Draft Final",
        ],
        correctAnswer: 1,
        explanation: "Чекліст вимагає Lesson 6.2 - leaderstats.",
      },
    ],
  },
};
