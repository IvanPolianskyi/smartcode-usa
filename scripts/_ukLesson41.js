export const ukLesson41 = {
  lessonId: "lesson-roblox-6-3",
  moduleId: "module-06",
  order: 3,
  title: "6.3 - HUD на LocalScript",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Створити ScreenGui з TextLabel CoinsLabel у StarterGui",
    "Написати LocalScript, що безпечно чекає leaderstats і Coins через WaitForChild",
    "Оновлювати HUD через GetPropertyChangedSignal(\"Value\") або Changed",
    "Показати стартове значення одразу, не лише після першої зміни",
    "Не писати Coins.Value з клієнта і підготувати bindLabel під Power",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 41 з 92)",
        content: `У 6.2 ти отримав leaderstats з IntValue Coins - серверна правда вже існує. Сьогодні будуєш вітрину цієї правди: HUD на екрані, який показує Coins без відкриття TAB. LocalScript лише читає Value і малює текст. Жодного запису, жодної логіки нарахування.

Артефакт уроку:
1. ScreenGui у StarterGui з TextLabel **CoinsLabel**.
2. LocalScript з WaitForChild до leaderstats і Coins.
3. Підписка на зміну Value - текст оновлюється миттєво.
4. Початкове значення виставлене одразу при старті.
5. Жодного \`Coins.Value =\` у LocalScript і Save **Lesson 6.3 - HUD**.

Без стабільного HUD 6.4-6.10 підключатимуть giveCoins, спавн, Power і DataStore до системи, яку гравець бачить лише через TAB. Це незручно і не схоже на реальну Simulator-гру.

| Було в 6.2 | Стає в 6.3 |
|-------------|------------|
| leaderstats.Coins на сервері | Текст на екрані читає те саме Value |
| TAB показує Coins | Постійний HUD без TAB |
| Приріст у списку гравців | Приріст у кутку екрана |

Метафора: TAB - турнірна таблиця між раундами; HUD - спідометр під час руху.

**Зроби зараз (3 хв):** відкрий Place з 6.2 і переконайся, що Coins існує та росте в TAB.`,
      },
      {
        title: "Навіщо HUD, якщо TAB уже є",
        content: `TAB показує leaderstats автоматично. Але гравець мусить натиснути клавішу, список перекриває екран, і під час збору ніхто не відкриває TAB щосекунди заради +1.

| TAB | HUD |
|-----|-----|
| Відкривається клавішею | Завжди на екрані |
| Показує всіх гравців | Фокус на твоїх Coins |
| Добрий для порівняння | Добрий для миттєвого feedback |
| Стандартний вигляд | Твій стиль і позиція |
| Без коду | ScreenGui + LocalScript |

У Simulator рішення «збирати ще чи йти далі» приймають, дивлячись на цифру в кутку. Тому майже кожна опублікована Sim-гра має власний HUD з першої секунди.

TAB не треба вимикати. Він лишається бекапом під час дебагу: якщо HUD зламався, TAB усе ще показує серверну правду.

Образ: спідометр потрібен щомиті; табло результатів - раз на коло.

**Зроби зараз (2 хв):** згадай будь-яку Simulator-гру і де в неї HUD з монетами - зазвичай верхній лівий або правий кут.`,
      },
      {
        title: "ScreenGui, Frame, TextLabel",
        content: `HUD - дерево Instance у StarterGui. Roblox копіює його в PlayerGui кожного гравця при вході.

\`StarterGui\`
\` └ ScreenGui "HUD"\`
\`   └ Frame "CoinsFrame"\`
\`     └ TextLabel "CoinsLabel"\`

| Instance | Властивість | Значення | Навіщо |
|----------|-------------|----------|--------|
| ScreenGui | ResetOnSpawn | false | HUD не зникає при смерті |
| Frame | BackgroundTransparency | 0.4-0.6 | Текст читається на будь-якому фоні |
| Frame | Position | верхній кут | Не заважає центру |
| TextLabel | Text | "Coins: 0" | Заглушка до першого update |
| TextLabel | TextScaled | true | Ок на телефоні й ПК |
| TextLabel | Name | CoinsLabel | LocalScript шукає саме це ім'я |

ResetOnSpawn true пересоздає GUI при кожному респавні. Для лічильника валюти це шкідливо: підписки дублюються або HUD миготить. Вистав false один раз.

Не малюй персональний HUD як SurfaceGui на Part у Workspace. StarterGui + ScreenGui - стандартний шлях для інтерфейсу гравця.

Метафора: ScreenGui - скло шолома; Frame - панель приладів на склі.

**Зроби зараз (6 хв):** створи ScreenGui (ResetOnSpawn false) → Frame → CoinsLabel з текстом "Coins: 0".`,
      },
      {
        title: "LocalScript: клієнт, не сервер",
        content: `LocalScript виконується лише на клієнті конкретного гравця. Script у ServerScriptService бачить усіх; LocalScript бачить одну людину і не вирішує економіку для інших.

HUD - ідеальний кандидат для LocalScript: кожному потрібен власний текст із власним числом Coins.

| Розташування | Коли брати |
|--------------|------------|
| Всередині ScreenGui | Логіка тісно пов'язана з цим UI |
| StarterPlayerScripts | Загальна клієнтська логіка |
| ReplicatedStorage | Лише зберігання Module, не автозапуск |

\`local player = game.Players.LocalPlayer\`
\`local playerGui = player:WaitForChild("PlayerGui")\`

LocalPlayer існує лише в LocalScript. У серверному Script це nil - типова помилка новачків.

LocalScript у StarterGui або StarterPlayerScripts запускається автоматично. Вручну стартувати нічого не треба. Переконайся, що тип саме LocalScript, не звичайний Script.

Образ: LocalScript - персональний дисплей пілота; серверний Script - диспетчерська вежа.

**Зроби зараз (3 хв):** постав LocalScript у HUD і зроби print(player.Name) для перевірки запуску.`,
      },
      {
        title: "WaitForChild до leaderstats і Coins",
        content: `Між появою HUD і створенням leaderstats на сервері є коротка затримка. Прямий доступ \`player.leaderstats.Coins\` може дати nil і краш.

\`local leaderstats = player:WaitForChild("leaderstats")\`
\`local coins = leaderstats:WaitForChild("Coins")\`

| Підхід | Ризик |
|--------|-------|
| player.leaderstats.Coins | nil на старті |
| FindFirstChild без чекання | nil один раз без обробки |
| WaitForChild | Безпечно чекає |

Для стартового ланцюжка HUD WaitForChild без таймауту нормальний. Для дебагу можна додати:

\`local coins = leaderstats:WaitForChild("Coins", 10)\`
\`if not coins then warn("Coins не з'явився") return end\`

Виклич WaitForChild один раз при старті й збережи результат у змінну. Не викликай його в кожному оновленні тексту.

Якщо WaitForChild ніколи не завершується - повернись у 6.2 і перевір, що сервер створює leaderstats.Coins.

Метафора: WaitForChild - черга до каси; не читай чек, поки каса ще не відкрилась.

**Зроби зараз (4 хв):** напиши ланцюжок WaitForChild і print(coins.Value).`,
      },
      {
        title: "Changed і GetPropertyChangedSignal",
        content: `Текст треба оновлювати щоразу, коли сервер змінює Coins.Value.

| Спосіб | Особливість |
|--------|-------------|
| coins.Changed | Будь-яка зміна властивості Instance |
| GetPropertyChangedSignal("Value") | Лише зміна Value |

Для IntValue різниця невелика, але GetPropertyChangedSignal чіткіший контракт: «мене цікавить лише Value». Це зручніше, коли з'явиться Power і кілька підписок.

\`coins:GetPropertyChangedSignal("Value"):Connect(function()\`
\`  coinsLabel.Text = "Coins: " .. coins.Value\`
\`end)\`

Або через Changed:

\`coins.Changed:Connect(function(newValue)\`
\`  coinsLabel.Text = "Coins: " .. newValue\`
\`end)\`

Обидва варіанти ок для здачі. Рекомендація курсу - GetPropertyChangedSignal, особливо якщо далі зробиш bindLabel.

Перевір: зміни Coins через Command Bar на сервері - HUD має оновитись без Stop/Play.

Образ: підписка - дзвінок касира; HUD реагує на кожну нову суму в чеку.

**Зроби зараз (5 хв):** підключи один із двох варіантів і зміни Coins через Command Bar.`,
      },
      {
        title: "update() одразу + підписка",
        content: `Підписка оновлює текст лише після першої зміни. Якщо гравець зайшов із уже збереженими Coins (після DataStore у 6.7), заглушка "Coins: 0" бреше до першого збору.

Правильний порядок:

\`local function updateCoins()\`
\`  coinsLabel.Text = "Coins: " .. coins.Value\`
\`end\`
\`updateCoins()\`
\`coins:GetPropertyChangedSignal("Value"):Connect(updateCoins)\`

| Крок | Навіщо |
|------|--------|
| Одна функція update | Однаковий формат завжди |
| Виклик одразу | Стартове число без очікування |
| Connect тієї ж функції | Немає дубльованого форматування |

Не пиши "Coins: 0" вручну в одному місці й інший формат у Changed. Типова причина «стрибка» тексту при першому оновленні.

Після DataStore цей патерн стане критичним: load може поставити 50 Coins до першого збору, і HUD мусить показати 50 одразу.

Метафора: спочатку прочитай поточний чек, потім слухай нові покупки.

**Зроби зараз (6 хв):** зроби updateCoins() одразу + Connect і перевір Play без миготіння.`,
      },
      {
        title: "Ніколи не пиши Coins з клієнта",
        content: `HUD - вітрина, не каса. LocalScript лише читає coins.Value.

| Можна на клієнті | Не можна на клієнті |
|------------------|---------------------|
| Читати coins.Value | Писати coins.Value = |
| Форматувати текст і колір | Вирішувати, скільки монет у гравця |
| Локальна анімація числа | Змінювати економічну правду |

Запис на клієнті не стає серверною правдою. У Studio ти обманюєш лише себе; у грі exploit може намалювати мільйон у HUD, поки покупка на сервері відхилиться.

Мантра модуля 6: клієнт показує, сервер вирішує. HUD показує; giveCoins у 6.4 вирішує.

Якщо хочеш перевірити дизайн HUD - зміни Coins через Command Bar (серверний контекст), а не з LocalScript.

Пошукай у LocalScript рядок \`coins.Value =\`. Якщо це присвоєння, а не читання - видали.

Метафора: вітрина магазину не друкує власні цінники замість касира.

**Зроби зараз (2 хв):** зроби пошук coins.Value = у LocalScript і прибери будь-який запис.`,
      },
      {
        title: "Репліка lite: чому Remote не потрібен",
        content: `IntValue у leaderstats реплікується автоматично. Сервер змінює Value - клієнт отримує копію - LocalScript чує сигнал.

| Крок | Де |
|------|-----|
| 1. Сервер змінює coins.Value | Script / майбутній giveCoins |
| 2. Рушій репліки помічає зміну | Roblox |
| 3. Клієнт отримує нове Value | Автоматично |
| 4. LocalScript оновлює TextLabel | Твій код 6.3 |

Дії клієнта до сервера потребують RemoteEvent. Напрям сервер → клієнт для Instance у Player уже вбудований.

Важливо: Lua-таблиця в ModuleScript сама не реплікується. HUD працює без Remote саме тому, що Coins - IntValue у дереві, а не локальна table.

Не додавай Remote «щоб HUD дізнався про Coins». Це зайва складність і типова помилка поверх уже готової репліки.

Образ: leaderstats - табло, яке стадіон уже транслює; не будуй другий радіоканал заради тієї ж цифри.

**Зроби зараз (2 хв):** зміни Coins через Command Bar і подивись швидкість реакції HUD без жодного Remote.`,
      },
      {
        title: "Готовність до Power: bindLabel",
        content: `У 6.6 з'явиться Power. Замість копіювати WaitForChild + Connect для кожного Value, зроби універсальну функцію вже сьогодні.

\`local function bindLabel(valueInstance, label, prefix)\`
\`  local function update()\`
\`    label.Text = prefix .. valueInstance.Value\`
\`  end\`
\`  update()\`
\`  valueInstance:GetPropertyChangedSignal("Value"):Connect(update)\`
\`end\`
\`bindLabel(coins, coinsLabel, "Coins: ")\`

| Без bindLabel | З bindLabel |
|---------------|-------------|
| Копія коду на кожен Value | Один виклик на лейбл |
| Легко забути стартовий update | update завжди всередині |
| Різний формат тексту | Єдиний prefix .. Value |

Для здачі 6.3 достатньо робочого CoinsLabel. bindLabel - опційна інвестиція. Не створюй PowerLabel, поки Power ще немає в leaderstats.

Метафора: bindLabel - універсальна розетка для будь-якого лічильника на панелі.

**Зроби зараз (5 хв, опційно):** перепиши CoinsLabel через bindLabel і переконайся, що поведінка та сама.`,
      },
      {
        title: "Типові дірки й playtest",
        content: `| Симптом | Причина | Фікс |
|---------|---------|------|
| Текст 0 назавжди | Немає Connect | Додай підписку |
| Краш nil на старті | Немає WaitForChild | Чекай leaderstats/Coins |
| HUD зникає після смерті | ResetOnSpawn true | Постав false |
| Оновлення дублюються | Connect у CharacterAdded | Підписуйся один раз |
| Неправильне число | Запис з LocalScript | Лише читання |
| Нічого не видно | Visible false / Transparency 1 | Перевір Properties |

| # | Дія | Очікування |
|---|-----|------------|
| 1 | Play | HUD видно, текст = стартові Coins |
| 2 | Command Bar змінює Coins | HUD оновлюється |
| 3 | Порівняти з TAB | Однакове число |
| 4 | Померти / респавн | HUD лишається, без подвійних Connect |
| 5 | Output | Без nil warn |
| 6 | Пошук Value= | Немає запису в LocalScript |

Пункт 3 - серце здачі. Якщо HUD і TAB розходяться - підписка або формат зламані.

Образ: playtest - звірка вітрини з касовим чеком.

**Зроби зараз (8 хв):** пройди рядки 1-4 і постав факти.`,
      },
      {
        title: "Чекліст здачі уроку 41",
        content: `- [ ] ScreenGui у StarterGui з CoinsLabel
- [ ] ResetOnSpawn false для лічильника
- [ ] LocalScript з WaitForChild до leaderstats.Coins
- [ ] Підписка Changed або GetPropertyChangedSignal("Value")
- [ ] update() викликається одразу при старті
- [ ] Жодного coins.Value = у LocalScript
- [ ] HUD і TAB показують однакове число
- [ ] (Опційно) bindLabel готовий до Power
- [ ] Save: Lesson 6.3 - HUD

Далі **6.4** додасть giveCoins. Твій HUD автоматично покаже кожен приріст, бо вже підписаний на той самий Coins.Value - без змін у HUD-коді. Це і є ціль розділення: сервер рахує, клієнт відображає.

Якщо Coins ще немає - повернись у 6.2, перш ніж чекати WaitForChild тут.

Артефакт: живий HUD, що дзеркалить серверну правду без клієнтського запису.

Метафора: фінальний Save фіксує вітрину перед тим, як каса почне проводити реальні продажі.

**Зроби зараз (3 хв):** ритуал здачі - Play → правильне число → Command Bar → оновлення → збіг з TAB → Save.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Coins.Value = X у LocalScript",
      explanation: "Це локальний обман і шлях до чіту; сервер не знає про таку зміну.",
      correctApproach: "Лише читати coins.Value; запис робити тільки на сервері.",
    },
    {
      mistake: "player.leaderstats без WaitForChild",
      explanation: "При швидкому Join Instance ще немає, LocalScript падає на nil.",
      correctApproach: "Використовувати player:WaitForChild(\"leaderstats\") і далі WaitForChild(\"Coins\").",
    },
    {
      mistake: "Підписка на Changed всередині CharacterAdded",
      explanation: "Кожен респавн додає нову Connection, і оновлення починають дублюватись.",
      correctApproach: "Підписуватись один раз при старті LocalScript.",
    },
    {
      mistake: "ResetOnSpawn true на HUD з лічильниками",
      explanation: "GUI пересоздається при смерті, HUD миготить або губить стан підписок.",
      correctApproach: "Поставити ResetOnSpawn false для постійних Value-лічильників.",
    },
    {
      mistake: "Немає виклику update() одразу після визначення",
      explanation: "HUD лишає заглушку, поки не станеться перша зміна Value.",
      correctApproach: "Викликати update() один раз, потім Connect тієї ж функції.",
    },
    {
      mistake: "Формат тексту прописаний у двох різних місцях",
      explanation: "Стартовий рядок і Changed виглядають по-різному, текст «стрибає».",
      correctApproach: "Тримати один update для старту і для всіх наступних змін.",
    },
  ],
  summary: "Ти зібрав живий HUD на LocalScript: CoinsLabel читає leaderstats через WaitForChild і оновлюється через сигнал Value без клієнтського запису. HUD і TAB показують одне число - основа для giveCoins, Power і DataStore.",
  practiceTask: {
    title: "Живий HUD Coins (~30 хв)",
    difficulty: "beginner",
    description: `### Part A - ScreenGui (8 хв)
1. ScreenGui + Frame + TextLabel CoinsLabel у StarterGui.
2. Стартовий текст "Coins: 0", TextScaled true.
3. ResetOnSpawn false.

### Part B - LocalScript (14 хв)
1. WaitForChild ланцюжок до leaderstats.Coins.
2. Функція update() + виклик одразу.
3. Підписка GetPropertyChangedSignal("Value") або Changed.

### Part C - Перевірка (8 хв)
1. Play, зміни Coins через Command Bar, порівняй з TAB.
2. Перевір Output і відсутність coins.Value = у LocalScript.
3. Збережи Place як **Lesson 6.3 - HUD**.`,
    hints: [
      "WaitForChild без таймауту на старті - нормально.",
      "Виклич update() один раз до Connect.",
      "Ніколи не пиши coins.Value = у LocalScript.",
      "Якщо HUD порожній - перевір Visible і TextTransparency.",
    ],
    optionalChallenge: "Додай bindLabel(valueInstance, label, prefix) як заготовку для Power у 6.6.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Що показує HUD у уроці 6.3?",
        options: [
          "Новий спосіб нарахування монет",
          "Coins.Value з leaderstats лише на читання",
          "Список усіх гравців сервера",
          "Швидкість персонажа",
        ],
        correctAnswer: 1,
        explanation: "HUD - вітрина серверної правди, не каса.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де LocalPlayer доступний як не-nil?",
        options: [
          "Лише в LocalScript",
          "У будь-якому Script однаково",
          "Тільки в ModuleScript",
          "У Lighting",
        ],
        correctAnswer: 0,
        explanation: "LocalPlayer існує на клієнті.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо WaitForChild у HUD-скрипті?",
        options: [
          "Щоб прискорити гру",
          "Щоб замінити ScreenGui",
          "Щоб безпечно дочекатись leaderstats і Coins",
          "Щоб видалити TAB",
        ],
        correctAnswer: 2,
        explanation: "На старті Instance ще може бути відсутній.",
      },
      {
        id: "q4",
        type: MC,
        question: "Чим корисний GetPropertyChangedSignal(\"Value\")?",
        options: [
          "Він сам пише Value",
          "Він працює лише на сервері",
          "Він замінює WaitForChild",
          "Він стежить лише за конкретною властивістю Value",
        ],
        correctAnswer: 3,
        explanation: "Контракт підписки точніший за загальний Changed.",
      },
      {
        id: "q5",
        type: MC,
        question: "Чому update() варто викликати одразу?",
        options: [
          "Щоб видалити ScreenGui",
          "Щоб текст показав правильне число з першої секунди",
          "Це вимога Roblox для всіх функцій",
          "Інакше сигнал ніколи не спрацює",
        ],
        correctAnswer: 1,
        explanation: "Підписка не показує значення до першої зміни.",
      },
      {
        id: "q6",
        type: MC,
        question: "Чи можна писати coins.Value з LocalScript як здачу?",
        options: [
          "Так, якщо швидко",
          "Так, лише в Studio",
          "Ні, клієнт лише читає",
          "Так, якщо ResetOnSpawn false",
        ],
        correctAnswer: 2,
        explanation: "Запис цінності належить серверу.",
      },
      {
        id: "q7",
        type: MC,
        question: "Що робить ResetOnSpawn у ScreenGui?",
        options: [
          "Керує швидкістю анімації тексту",
          "Дозволяє клієнту писати Value",
          "Змінює колір фону Frame",
          "Визначає, чи пересоздається HUD при респавні",
        ],
        correctAnswer: 3,
        explanation: "Для лічильників валюти зазвичай ставлять false.",
      },
      {
        id: "q8",
        type: MC,
        question: "Чому HUD працює без RemoteEvent?",
        options: [
          "Бо IntValue у leaderstats реплікується автоматично",
          "Бо LocalScript може писати на сервер сам",
          "Бо TAB вимикає репліку",
          "Бо WaitForChild створює Remote",
        ],
        correctAnswer: 0,
        explanation: "Репліка Instance у Player уже вбудована.",
      },
      {
        id: "q9",
        type: MC,
        question: "Як 6.3 готує 6.4?",
        options: [
          "giveCoins треба писати в LocalScript",
          "HUD уже покаже прирости від серверної каси без змін коду",
          "Анти-дубль більше не потрібен",
          "TAB замінює giveCoins",
        ],
        correctAnswer: 1,
        explanation: "Підписка на Value автоматично відобразить серверні зміни.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що таке bindLabel у контексті цього уроку?",
        options: [
          "Серверна функція нарахування",
          "Заміна ScreenGui",
          "Універсальна прив'язка Value до TextLabel",
          "Спосіб вимкнути TAB",
        ],
        correctAnswer: 2,
        explanation: "Патерн готує HUD до Power та інших лічильників.",
      },
      {
        id: "q11",
        type: MC,
        question: "Який симптом дає підписка всередині CharacterAdded?",
        options: [
          "Подвійні або потрійні Connect після респавнів",
          "WaitForChild стає швидшим",
          "Coins зникають із leaderstats",
          "ResetOnSpawn вимикається сам",
        ],
        correctAnswer: 0,
        explanation: "Кожен респавн додає нову Connection.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що перевіряє головний пункт playtest HUD vs TAB?",
        options: [
          "Чи однакове число на екрані й у TAB",
          "Чи ScreenGui має ParticleEmitter",
          "Чи LocalScript пише Value",
          "Чи Baseplate Anchored",
        ],
        correctAnswer: 0,
        explanation: "Обидва інтерфейси мають дзеркалити одну серверну правду.",
      },
      {
        id: "q13",
        type: MC,
        question: "Де має лежати ScreenGui для персонального HUD?",
        options: [
          "У Workspace як SurfaceGui на підлозі",
          "У StarterGui",
          "У ServerStorage як єдиний варіант",
          "У Lighting",
        ],
        correctAnswer: 1,
        explanation: "StarterGui копіюється в PlayerGui гравця.",
      },
      {
        id: "q14",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 6.2 - leaderstats",
          "Lesson 6.4 - GiveCoins",
          "Lesson 6.3 - HUD",
          "HUD Draft Final",
        ],
        correctAnswer: 2,
        explanation: "Чекліст вимагає Lesson 6.3 - HUD.",
      },
      {
        id: "q15",
        type: MC,
        question: "Що робити, якщо WaitForChild(\"Coins\") ніколи не завершується?",
        options: [
          "Написати Coins.Value на клієнті",
          "Видалити ScreenGui",
          "Вимкнути Output",
          "Повернутись у 6.2 і перевірити створення leaderstats на сервері",
        ],
        correctAnswer: 3,
        explanation: "HUD чекає Instance, який повинен створити попередній урок.",
      },
    ],
  },
};
