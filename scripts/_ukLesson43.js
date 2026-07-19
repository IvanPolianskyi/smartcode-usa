export const ukLesson43 = {
  lessonId: "lesson-roblox-6-5",
  moduleId: "module-06",
  order: 5,
  title: "6.5 - Спавн з Config + for",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Описати типи collectables у CoinConfig з id, value і respawn",
    "Розкласти монети циклом for по маркерах CoinSpawns",
    "Ставити CoinValue і CoinId Attribute при spawnCoin",
    "Респавнити зібрану монету через Destroy, Occupied і task.delay",
    "Підключити всі спавнені монети до серверного giveCoins з 6.4",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 43 з 92)",
        content: `У 6.4 ти зібрав касу: giveCoins, анти-дубль і один серверний вхід нагороди. Одна тестова монета доводить формулу, але острів ще не живе. Сьогодні з'являється система розкладки: table правил, for по точках і респавн після збору.

Артефакт уроку:
1. CoinConfig з мінімум двома типами: small і big.
2. Folder CoinSpawns з 6-12 маркерами SP1..n.
3. spawnCoin, що ставить CoinValue і CoinId Attribute.
4. Стартовий for і респавн через task.delay після Destroy.
5. Збір лише через giveCoins і Save **Lesson 6.5 - Coin Config Spawn**.

У 6.6 giveCoins помножить CoinValue на Power. У 6.9 ти крутитимеш value і respawn у тій самій table для TTG1. Без сьогоднішнього Config баланс знову розмажеться по десяти Scripts.

| Було в 6.4 | Стає в 6.5 |
|-------------|------------|
| Одна тестова монета | Автоматична розкладка |
| Хардкод value у Script | value у CoinConfig |
| Світ порожніє після збору | Респавн за cfg.respawn |
| Каса готова | Каса отримує потік предметів |

Метафора: Config - меню страв, for - офіціант, що розносить за списком столів.

**Зроби зараз (3 хв):** оголоси CoinConfig з small value=1 respawn=5 і big value=5 respawn=12, ще без spawn.`,
      },
      {
        title: "Навіщо CoinConfig, а не ручні Clone",
        content: `Захардкоджені Parts виглядають швидкими в перший день і ламають прод-цикл уже на другому. Вартість живе в голові, респавн - "на око", нова монета - копіпаста з новим Script.

\`local CoinConfig = {\`
\`  { id = "small", value = 1, respawn = 5 },\`
\`  { id = "big", value = 5, respawn = 12 },\`
\`}\`

| Захардкод Parts | CoinConfig + spawn |
|-----------------|--------------------|
| Вартість у голові | value у рядку table |
| Нова монета = копіпаста | Новий рядок або точка |
| Респавн навмання | respawn секундами |
| Баланс у 20 Scripts | Крутиш 2-3 числа в одному місці |

Config каже "що", точка каже "де". Не ховай value в імені Part на кшталт Coin5: перейменування зламає payout. Не клади різні value лише в колір Mesh - сервер кольору не довіряє.

Образ: Config - прайс-лист складу; колір полиці не замінює цифру в накладній.

**Зроби зараз (4 хв):** винеси CoinConfig у ModuleScript або чіткий блок нагорі серверного Script.`,
      },
      {
        title: "CoinConfigById для lookup після Destroy",
        content: `Після збору монета зникає, але респавну потрібні value і respawn того самого типу. Тому на Part ставлять CoinId, а словник будують один раз при старті.

\`local CoinConfigById = {}\`
\`for _, cfg in ipairs(CoinConfig) do\`
\`  CoinConfigById[cfg.id] = cfg\`
\`end\`

| Джерело | Коли читати |
|---------|-------------|
| CoinConfig | Старт, меню типів |
| CoinConfigById[id] | Респавн і дебаг після Destroy |
| CoinValue Attribute | Момент giveCoins |

Attribute CoinValue - runtime правда для payout. Config - джерело правди при spawn і scheduleRespawn. Якщо додаси третій тип rare, один рядок у CoinConfig оновить словник без копіювання функцій.

Не шукай respawn у десяти місцях. Один lookup зменшує ризик, що small повернеться через 5 с у одному Script і через 1 с у іншому.

Метафора: CoinId - штрихкод, CoinConfigById - сканер складу.

**Зроби зараз (4 хв):** побудуй CoinConfigById і print кількість ключів після циклу.`,
      },
      {
        title: "Точки спавну окремо від живих монет",
        content: `Маркери і collectables не повинні жити в одній купі. Folder **CoinSpawns** тримає SP1..n. Folder **Coins** або Workspace.Coins тримає живі Clone.

Маркер:
- Anchored true
- CanCollide false
- маленький Part
- під час дебагу Transparency 0.5, перед здачею 1

| Об'єкт | Folder | Роль |
|--------|--------|------|
| SP1..SP12 | CoinSpawns | Де з'явиться монета |
| Clone монети | Coins | Що можна зібрати |
| Template | ServerStorage | Префаб для Clone |

GetChildren не гарантує порядок. Якщо порядок важливий, іменуй SP01..SP12 або сортуй table. Не став 100 точок у перший день: 6-12 достатньо для for, респавну і playtest без лагу.

Не спавни в цикл по workspace.Coins. Тоді ти клонуєш уже зібрані або живі монети замість маркерів.

Образ: CoinSpawns - розетка в підлозі, Coins - лампа, яку вмикають і міняють.

**Зроби зараз (6 хв):** розстав 6-8 маркерів і перевір, що від Spawn видно більшість точок.`,
      },
      {
        title: "spawnCoin(point, cfg) - єдина фабрика",
        content: `Одна функція створює живу монету. Template лежить у ServerStorage: сервер клонує, клієнт не народжує нагороди сам.

\`local function spawnCoin(point, cfg)\`
\`  if point:GetAttribute("Occupied") then return end\`
\`  local coin = template:Clone()\`
\`  coin:SetAttribute("CoinValue", cfg.value)\`
\`  coin:SetAttribute("CoinId", cfg.id)\`
\`  coin:SetAttribute("Collected", false)\`
\`  coin.CFrame = point.CFrame * CFrame.new(0, 2, 0)\`
\`  coin.Parent = coinsFolder\`
\`  point:SetAttribute("Occupied", true)\`
\`  coin:SetAttribute("SpawnPointName", point.Name)\`
\`  hookCoin(coin)\`
\`  return coin\`
\`end\`

| Крок | Навіщо |
|------|--------|
| Clone template | Однаковий вигляд і фізика |
| SetAttribute value/id | Дані для каси і респавну |
| Occupied true | Одна монета на точку |
| hookCoin | Той самий шлях збору, що в 6.4 |

spawnCoin не викликає giveCoins. Він лише створює об'єкт. Після for у Explorer мають з'явитись монети, а в Attributes - CoinValue 1 або 5.

Метафора: spawnCoin - штамп фабрики; каса стоїть окремо на виході зі складу.

**Зроби зараз (7 хв):** напиши spawnCoin і вручну виклич його для однієї точки small.`,
      },
      {
        title: "for як суперсила розкладки",
        content: `for тут - не математика заради математики, а однакові дії на списку точок. Ти один раз описав spawnCoin, цикл повторює його N разів.

\`local points = coinSpawns:GetChildren()\`
\`for i, point in ipairs(points) do\`
\`  local cfg = CoinConfig[((i - 1) % #CoinConfig) + 1]\`
\`  spawnCoin(point, cfg)\`
\`end\`

| Підхід | Оцінка |
|--------|--------|
| Один for на старті | Добре для MVP |
| Десять ручних Clone | Погано для балансу |
| while true spawn без ліміту | Спам і лаг |
| Цикл по Coins замість CoinSpawns | Неправильна адреса |

Спочатку можна покласти всі small. Потім чергуй big/small через modulo або окремий SpawnPlan. Головне - не розмножувати Spawn-код.

Після Stop + Play for знову розкладає стартовий набір. Це очікувана поведінка до DataStore.

Образ: for - конвеєрна стрічка, яка проходить усі розетки один раз на старт зміни.

**Зроби зараз (5 хв):** зроби стартовий for і полічи монети в folder Coins.`,
      },
      {
        title: "Респавн: Destroy, delay, знову spawn",
        content: `Життєвий цикл монети: spawn → touch → giveCoins → Destroy → delay → spawn знову. Без останніх кроків острів порожніє за хвилину, а TTG у 6.9 грає в порожнечу.

\`local function scheduleRespawn(pointName, cfgId)\`
\`  local point = coinSpawns:FindFirstChild(pointName)\`
\`  local cfg = CoinConfigById[cfgId]\`
\`  if not point or not cfg then return end\`
\`  task.delay(cfg.respawn, function()\`
\`    point:SetAttribute("Occupied", false)\`
\`    spawnCoin(point, cfg)\`
\`  end)\`
\`end\`

Збережи SpawnPointName і CoinId **до** Destroy. Після Destroy шукати монету марно.

| Правило | Навіщо |
|---------|--------|
| Destroy після успішного giveCoins | Немає повторного збору |
| Occupied на точці | Немає стопки Clone |
| Один delay на точку | Немає подвійного респавну |
| cfg.respawn > 0 | Touched встигає закритись |

Не став respawn=0 "для вау". Не роби while spawn do на одній точці.

Метафора: респавн - повернення товару на полицю після продажу, а не друга каса поверх першої.

**Зроби зараз (6 хв):** збери одну монету й дочекайся її повернення з тим самим CoinValue.`,
      },
      {
        title: "Різні вартості: очі vs сервер",
        content: `Гравець відрізняє монети розміром, кольором або Billboard. Сервер відрізняє їх числом CoinValue. Візуал - підказка, не джерело payout.

| Що бачить гравець | Що читає сервер |
|-------------------|-----------------|
| Мала жовта монета | CoinValue = 1 |
| Велика яскрава | CoinValue = 5 |
| Рідкісний колір later | CoinValue з Config |

При Power=1 з 6.6 ще можна тестувати чисту базу: small дає +1, big дає +5 у TAB. Якщо однаково - Attribute не поставлений або giveCoins ігнорує його.

Різний respawn підсилює відчуття: small часто, big рідше. Це вже баланс числами без нового коду.

LocalScript може перефарбувати Part. giveCoins все одно читає Attribute на сервері. Не вір "жовтіший = дорожчий" як правді каси.

Образ: вітрина може брехати кольором, цінник Attribute - ні.

**Зроби зараз (4 хв):** збери small і big підряд і запиши два прирости Coins.`,
      },
      {
        title: "Єдиний шлях збору для всіх Clone",
        content: `Після spawn кожна монета має потрапити в ту саму систему, що в 6.4. Зручні варіанти:
1. hookCoin одразу в spawnCoin;
2. CollectionService tag Coin + GetInstanceAddedSignal.

\`local function tryCollect(coin, player)\`
\`  if coin:GetAttribute("Collected") then return end\`
\`  coin:SetAttribute("Collected", true)\`
\`  local amount = coin:GetAttribute("CoinValue") or 1\`
\`  local pointName = coin:GetAttribute("SpawnPointName")\`
\`  local cfgId = coin:GetAttribute("CoinId")\`
\`  if giveCoins(player, amount) then\`
\`    coin:Destroy()\`
\`    scheduleRespawn(pointName, cfgId)\`
\`  end\`
\`end\`

| Не робити | Чому |
|-----------|------|
| Coins.Value += у spawn-скрипті | Обхід анти-дубля і майбутнього Power |
| Окремий Touched-скрипт на кожен Clone | Десять копій логіки |
| Респавн до giveCoins | Можна отримати дубль |

Collected скидається на false при новому Clone. Респавнена монета - новий шанс збору.

Метафора: усі товари йдуть через одну касу, навіть якщо їх багато на полицях.

**Зроби зараз (5 хв):** переконайся, що for-спавнені монети використовують той самий tryCollect, що й тестова з 6.4.`,
      },
      {
        title: "Анти-лаг і ліміт живої купи",
        content: `Якщо респавн швидший за збір або Destroy забули, гравець AFK фармить стопку Parts. Touched може встигнути дати кілька payout до Collected. FPS падає від сотень монет у Coins.

| Симптом | Ймовірна причина | Фікс |
|---------|------------------|------|
| Стопка на одній точці | Немає Occupied / Destroy | Одна монета на точку |
| Подвійний payout | Анти-дубль після нагороди | Collected до giveCoins |
| Сотні Parts | while spawn або respawn=0 | delay з Config |
| nil cfg у Output | Втрачений CoinId | Attribute до Destroy |

Опційно додай maxLiveCoins: якщо дітей у Coins більше 80, не scheduleRespawn до падіння лічильника. Для здачі достатньо Occupied + Destroy + один delay.

Playtest: стій на одній точці, збери тричі. Має бути одна монета зараз, нова - після delay, без купи в повітрі.

Метафора: анти-лаг - обмежувач полиці: нова коробка лише коли стара знята.

**Зроби зараз (5 хв):** зроби три збори на SP1 і полічи дітей у Coins під час очікування.`,
      },
      {
        title: "Playtest-таблиця спавну",
        content: `Перед здачею заповни факти, не враження.

| # | Дія | Очікування | Факт |
|---|-----|------------|------|
| 1 | Play | Монети на SP1..n | |
| 2 | Attributes big/small | CoinValue 5 і 1 | |
| 3 | Збір small | +1, монета зникла | |
| 4 | Збір big | +5 | |
| 5 | Чекати respawn | Нова монета того ж типу | |
| 6 | Спам touch | Один payout | |
| 7 | 10 зборів | Немає стопки | |
| 8 | Stop + Play | for знову розклав набір | |
| 9 | Output | Без spam nil cfg | |

Якщо пункт 5 червоний - дивись SpawnPointName, Occupied і CoinConfigById. Якщо 3 і 4 однакові - Attribute не з Config.

Метафора: таблиця - накладна прийомки складу перед відкриттям магазину.

**Зроби зараз (7 хв):** пройди рядки 1-5 і постав статуси.`,
      },
      {
        title: "Місток до Power і балансу + чекліст",
        content: `| Урок | Що бере з 6.5 |
|------|----------------|
| 6.6 Power | CoinValue Attribute як чиста база |
| 6.7 DataStore | Потік Coins від живого острова |
| 6.8 Цілі | Достатньо монет, щоб progress рухався |
| 6.9 Баланс | Крутить value і respawn у тій же table |
| 6.10 Ship | Острів сам підтримує цикл збору |

Не роздувай 20 типів монет. Два value і робочий respawn достатньо. Якщо структура чиста, наступні уроки додають шари, а не латки поверх ручних Clone.

Чекліст:
- [ ] CoinConfig: ≥2 id з value і respawn
- [ ] CoinConfigById побудовано
- [ ] CoinSpawns: 6-12 маркерів
- [ ] ServerStorage template + folder Coins
- [ ] spawnCoin ставить CoinValue, CoinId, Collected
- [ ] for розкладає на старті
- [ ] tryCollect → giveCoins → Destroy → delay
- [ ] Occupied блокує стопку
- [ ] Різний payout small vs big
- [ ] Playtest 1-7 зелені
- [ ] Save: Lesson 6.5 - Coin Config Spawn

Артефакт: острів, що сам кладе монети за меню. Ручний Clone у Workspace більше не здача.

Метафора: фінальний Save - відкритий склад із прайс-листом, а не купа коробок без етикеток.

**Зроби зараз (3 хв):** покажи Config, big/small у TAB і respawn на SP1, потім збережи Place.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Десять ручних Clone без for і CoinConfig",
      explanation: "Зміна value або respawn вимагає правити багато місць, і баланс ламається.",
      correctApproach: "Описати типи в CoinConfig і розкладати їх одним for по точках.",
    },
    {
      mistake: "Немає респавну після Destroy",
      explanation: "Острів порожніє, цілі й TTG у наступних уроках нема на чому міряти.",
      correctApproach: "Після успішного giveCoins планувати task.delay(cfg.respawn) і новий spawnCoin.",
    },
    {
      mistake: "Вартість визначається лише кольором або ім'ям Part",
      explanation: "Клієнт може змінити вигляд, а Rename ламає будь-яку логіку за назвою.",
      correctApproach: "Ставити CoinValue і CoinId Attribute з Config при spawn.",
    },
    {
      mistake: "Респавн без Destroy або без Occupied",
      explanation: "На одній точці з'являється стопка монет і ризик подвійного збору.",
      correctApproach: "Спочатку Destroy зібраної, тримати Occupied і один delay на точку.",
    },
    {
      mistake: "Coins.Value += прямо в spawn- або touch-скрипті",
      explanation: "Обхід giveCoins ламає анти-дубль, майбутній Power і єдину касу.",
      correctApproach: "Усі нагороди проводити лише через серверний giveCoins.",
    },
    {
      mistake: "Сотня точок у перший день",
      explanation: "Немає часу стабілізувати жодну, playtest і дебаг стають хаотичними.",
      correctApproach: "Почати з 6-12 маркерів і двох типів value.",
    },
  ],
  summary: "Ти розкладаєш collectables через CoinConfig і for: різні value в Attributes, респавн після збору й єдина каса giveCoins. Острів сам підтримує цикл під Power і баланс.",
  practiceTask: {
    title: "Розкладка монет (~30 хв)",
    difficulty: "intermediate",
    description: `### Part A - Config і точки (8 хв)
1. Створи CoinConfig small/big з value і respawn.
2. Побудуй CoinConfigById.
3. Розстав 6+ маркерів у CoinSpawns і folder Coins.

### Part B - Spawn loop (14 хв)
1. spawnCoin ставить CoinValue, CoinId, Collected, SpawnPointName.
2. for розкладає монети на старті.
3. tryCollect → giveCoins → Destroy → scheduleRespawn.
4. Occupied не дає стопки на точці.

### Part C - Тест (8 хв)
1. Порівняй payout small і big.
2. Дочекайся respawn того самого типу.
3. Збережи Place як **Lesson 6.5 - Coin Config Spawn**.`,
    hints: [
      "Спочатку всі small, потім чергування big через modulo.",
      "print(cfg.id, cfg.value) при spawn і при респавні.",
      "Transparency 0.5 на маркерах під час дебагу, 1 перед здачею.",
      "Зберігай SpawnPointName і CoinId до Destroy.",
    ],
    optionalChallenge: "Додай третій тип rare лише новим рядком Config: більший value і довший respawn.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Який головний артефакт уроку 6.5?",
        options: [
          "Видалити giveCoins і лишити ручні Clone",
          "CoinConfig, for-spawn, Attributes і респавн після збору",
          "Лише новий Skybox",
          "DataStore без монет на сцені",
        ],
        correctAnswer: 1,
        explanation: "Урок будує автоматичну розкладку collectables з даними в Config.",
      },
      {
        id: "q2",
        type: MC,
        question: "Навіщо for по CoinSpawns?",
        options: [
          "Однаково розставити монети зі списку маркерів",
          "for замінює Humanoid",
          "Без for Attribute не існує",
          "for малює Terrain",
        ],
        correctAnswer: 0,
        explanation: "Цикл повторює spawnCoin на кожній точці.",
      },
      {
        id: "q3",
        type: MC,
        question: "Звідки брати value монети при spawn?",
        options: [
          "Випадково з клієнта",
          "З назви Skybox",
          "З CoinConfig і поставити Attribute",
          "Завжди 999999",
        ],
        correctAnswer: 2,
        explanation: "Table є джерелом правди, Attribute несе runtime-значення.",
      },
      {
        id: "q4",
        type: MC,
        question: "Навіщо поле respawn у Config?",
        options: [
          "Щоб вимкнути Touched",
          "Щоб замінити DisplayName",
          "Щоб зупинити for назавжди",
          "Щоб задати час повернення монети після збору",
        ],
        correctAnswer: 3,
        explanation: "Різні типи можуть повертатись з різною паузою.",
      },
      {
        id: "q5",
        type: MC,
        question: "Як уникнути стопки монет на одній точці?",
        options: [
          "Спавнити швидше за збір",
          "Destroy при зборі плюс Occupied / один delay",
          "Прибрати giveCoins",
          "Зробити CanCollide стіну назавжди",
        ],
        correctAnswer: 1,
        explanation: "Одна жива монета на маркер - базове правило anti-lag.",
      },
      {
        id: "q6",
        type: MC,
        question: "Хто має нараховувати нагороду зі спавненої монети?",
        options: [
          "LocalScript Coins =",
          "Lighting",
          "giveCoins на сервері",
          "SpawnLocation сам по собі",
        ],
        correctAnswer: 2,
        explanation: "Єдина каса з 6.4 лишається обов'язковою.",
      },
      {
        id: "q7",
        type: MC,
        question: "Навіщо CoinConfigById?",
        options: [
          "Щоб швидко знайти cfg за CoinId після Destroy",
          "Щоб видалити leaderstats",
          "Щоб клієнт міг міняти value",
          "Щоб замінити Folder CoinSpawns",
        ],
        correctAnswer: 0,
        explanation: "Lookup потрібен для коректного респавну того самого типу.",
      },
      {
        id: "q8",
        type: MC,
        question: "Де логічно тримати template монети?",
        options: [
          "У SoundService",
          "У клієнтському Temporary",
          "Template не потрібен",
          "У ServerStorage для серверного Clone",
        ],
        correctAnswer: 3,
        explanation: "Префаб клонує сервер, а не клієнт.",
      },
      {
        id: "q9",
        type: MC,
        question: "Як 6.5 готує 6.6?",
        options: [
          "6.6 видаляє всі монети",
          "Attributes після spawn заборонені",
          "CoinValue Attribute стає чистою базою для Power",
          "Power замінює Config",
        ],
        correctAnswer: 2,
        explanation: "Множник читатиме ту саму серверну базу.",
      },
      {
        id: "q10",
        type: MC,
        question: "Скільки типів value мінімум для здачі?",
        options: [
          "Обов'язково 50",
          "Хоча б 2, наприклад 1 і 5",
          "0",
          "Лише колір без чисел",
        ],
        correctAnswer: 1,
        explanation: "Різниця вартостей доводить роботу Config.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що буде без Destroy при зборі?",
        options: [
          "Можна зібрати знову або отримати дублікати",
          "Обов'язково вищий FPS",
          "Config видалиться сам",
          "for зупиниться назавжди",
        ],
        correctAnswer: 0,
        explanation: "Cleanup потрібен і для анти-дубля, і для респавну.",
      },
      {
        id: "q12",
        type: MC,
        question: "Чому колір не є джерелом вартості?",
        options: [
          "Part не має Color",
          "giveCoins читає лише BrickColor",
          "Колір завжди точний на сервері",
          "Серверна правда - Attribute/Config, вигляд можна змінити візуально",
        ],
        correctAnswer: 3,
        explanation: "Дані важливіші за підказку для очей.",
      },
      {
        id: "q13",
        type: MC,
        question: "Орієнтир кількості точок для MVP?",
        options: [
          "Близько 6-12, не сотня",
          "Обов'язково 1000",
          "Рівно 0",
          "Лише 1 на весь модуль назавжди",
        ],
        correctAnswer: 0,
        explanation: "Невеликий набір легше стабілізувати й тестувати.",
      },
      {
        id: "q14",
        type: MC,
        question: "Як 6.5 готує 6.9?",
        options: [
          "Баланс видаляє Config",
          "TTG не залежить від спавну",
          "Баланс крутить value і respawn у тій самій table",
          "Juice замінює spawn",
        ],
        correctAnswer: 2,
        explanation: "Ті самі поля Config стануть важелями економіки.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 6.4 - GiveCoins",
          "Lesson 6.6 - Power Attributes",
          "Coin Spawn Draft Final",
          "Lesson 6.5 - Coin Config Spawn",
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Lesson 6.5 - Coin Config Spawn.",
      },
    ],
  },
};
