export const ukLesson44 = {
  lessonId: "lesson-roblox-6-6",
  moduleId: "module-06",
  order: 6,
  title: "6.6 - Attributes / Power",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Використовувати GetAttribute і SetAttribute для вартості collectables",
    "Додати IntValue Power у leaderstats зі стартом не менше 1",
    "Рахувати фінальну нагороду в giveCoins через одну формулу з Power",
    "Підняти Power на сервері через Prompt або Remote і показати його в TAB/HUD",
    "Підготувати множник під DataStore, цілі дня та заміри TTG",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 44 з 92)",
        content: `У 6.5 ти навчив спавн читати Config і ставити Attribute CoinValue на монети. Сьогодні з'являється другий множник: Power гравця. База лишається на collectable, а сила - у leaderstats. Разом вони змінюють відчуття збору без нового острова.

Артефакт уроку:
1. IntValue **Power** у leaderstats зі стартом 1.
2. giveCoins рахує \`final = math.floor(base * power)\` в одному місці.
3. CoinValue Attribute читається на сервері з дефолтом при nil.
4. Хоча б один серверний спосіб підняти Power.
5. TAB або HUD показує Power і Save **Lesson 6.6 - Power Attributes**.

У 6.7 Power поїде в DataStore поруч із Coins. У 6.8 цілі зможуть вимагати збір з вищим Power. У 6.9 TTG1 порівняє дохід при Power 1 і Power 2.

| Було в 6.5 | Стає в 6.6 |
|-------------|------------|
| Різні монети через CoinValue | Той самий CoinValue * Power |
| giveCoins з базою | Одна формула з множником |
| Config тримає value | Config лишається чистою базою |
| Збір однаковий для всіх | Сильніший гравець заробляє швидше |

Метафора: CoinValue - вага гирі, Power - важіль, яким ти її піднімаєш.

**Зроби зараз (3 хв):** запиши формулу \`final = base * Power\` у коментарі над giveCoins і не змінюй її сьогодні.`,
      },
      {
        title: "Attribute - наклейка на Instance",
        content: `Attribute зберігає прості дані прямо на Part, Model або Player без окремого child. Для collectables це зручно: монета каже свою вартість сама.

\`coin:SetAttribute("CoinValue", 5)\`
\`local base = coin:GetAttribute("CoinValue") or 1\`

| | Attribute | IntValue |
|--|-----------|----------|
| Де живе | На Instance | Окремий об'єкт у дереві |
| API | Get/SetAttribute | .Value |
| Зручно для | Мітки на монетах і зонах | leaderstats / UI Values |
| Типи | number, string, boolean | За типом Value |

Не клади table в Attribute. Для складних структур використовуй ModuleScript Config і короткий id на Part.

GetAttribute повертає nil, якщо ключа немає. Перед множенням завжди став дефолт. Attribute зникає разом із Destroy Part - для одноразової монети це нормально.

Образ: Attribute схожий на цінник на товарі; каса читає його, а не назву полиці.

**Зроби зараз (4 хв):** відкрий одну монету з 6.5 і перевір CoinValue в Properties - Attributes.`,
      },
      {
        title: "Power у leaderstats, не на Character",
        content: `Поруч із Coins у PlayerAdded створи IntValue:

\`local power = Instance.new("IntValue")\`
\`power.Name = "Power"\`
\`power.Value = 1\`
\`power.Parent = leaderstats\`

Чому саме leaderstats:
1. TAB одразу показує Power.
2. Значення живе на Player, а не на Character.
3. У 6.7 легше зберегти \`power.Value\` у payload.

| Місце Power | Оцінка | Ризик |
|-------------|--------|-------|
| leaderstats IntValue | Добре | Забути Name = "Power" |
| Attribute на Character | Погано для прогресу | Зникає після респавну |
| Змінна в LocalScript | Непридатно | Чіт і розсинхрон |
| Attribute + IntValue разом | Плутанина | Два джерела правди |

Стартове Power = 1 означає «без бусту». Не став 0: тоді всі нагороди стануть нульовими. У giveCoins додатково захисти \`if power < 1 then power = 1 end\`.

Метафора: Power у leaderstats - паспорт сили, який не губиться при респавні.

**Зроби зараз (5 хв):** зайди в Play і знайди Power у TAB до першого збору.`,
      },
      {
        title: "Одна формула в giveCoins",
        content: `Онови касу з 6.4. База приходить аргументом, Power читається на сервері:

\`local function giveCoins(player, baseAmount)\`
\`  if typeof(baseAmount) ~= "number" or baseAmount <= 0 then return 0 end\`
\`  local stats = player:FindFirstChild("leaderstats")\`
\`  if not stats then return 0 end\`
\`  local coins = stats:FindFirstChild("Coins")\`
\`  local powerVal = stats:FindFirstChild("Power")\`
\`  if not coins or not powerVal then return 0 end\`
\`  local power = math.max(1, powerVal.Value)\`
\`  local final = math.floor(baseAmount * power)\`
\`  coins.Value += final\`
\`  return final\`
\`end\`

| Перевірка | Очікування |
|-----------|------------|
| base 5, Power 1 | +5 |
| base 5, Power 2 | +10 |
| base 1, Power 2 | +2 |
| base nil | не викликати або default до 1 |

Не множ двічі. Config тримає чисту базу монети. Power - окремий множник гравця. Якщо Config.value уже «з урахуванням Power», баланс у 6.9 збреше.

math.floor потрібен, бо IntValue не любить дроби. Якщо обереш лінійний бонус замість множника - зафіксуй одну формулу й не змішуй обидві в різних Scripts.

Метафора: giveCoins - єдина каса; множник не повинен стояти ще на вході й на виході.

**Зроби зараз (6 хв):** додай print(base, power, final) і зроби один збір при Power 1.`,
      },
      {
        title: "Звідки брати base на зборі",
        content: `У tryCollect або Touched читай Attribute, який поставив spawn з 6.5:

\`local base = coin:GetAttribute("CoinValue")\`
\`if typeof(base) ~= "number" then\`
\`  local id = coin:GetAttribute("CoinId")\`
\`  base = (id and CoinConfigById[id] and CoinConfigById[id].value) or 1\`
\`end\`
\`local paid = giveCoins(player, base)\`

| Джерело | Коли | Ризик |
|---------|------|-------|
| CoinValue Attribute | Нормальний шлях після 6.5 | Забутий SetAttribute |
| CoinId + Config | Fallback | Другий lookup |
| Хардкод 1 | Тимчасовий тест | Залишиться у здачі |

Не бери base з кольору Part або імені Mesh. Ім'я може змінитись; Attribute і Config - стабільні контракти.

Після Destroy монети Attribute зникає разом із нею. Тому спочатку прочитай base і Collected, потім викликай giveCoins, потім Destroy.

Образ: спочатку прочитай цінник, потім віддай монету в касу, потім прибери полицю.

**Зроби зараз (5 хв):** порівняй small CoinValue=1 і big CoinValue=5 при Power=1 - різниця має бути очевидна.`,
      },
      {
        title: "Як підняти Power на сервері",
        content: `Без способу змінити Power урок не доведений. Мінімум на сьогодні - один серверний вхід.

\`local function addPower(player, delta)\`
\`  local power = player.leaderstats and player.leaderstats:FindFirstChild("Power")\`
\`  if not power then return end\`
\`  power.Value = math.max(1, power.Value + delta)\`
\`end\`

| Варіант | Плюс | Мінус |
|---------|------|-------|
| ProximityPrompt на алтарі | Швидко видно | Безкоштовний AFK-фарм |
| Remote від кнопки HUD | Зручно в UI | Потрібен debounce |
| Купівля за Coins | Відчуття ціни | Трохи довше кодити |

Prompt:

\`prompt.Triggered:Connect(function(player)\`
\`  addPower(player, 1)\`
\`end)\`

Remote може лише попросити апгрейд. Сервер сам змінює Power. Не приймай \`FireServer(99)\` як нову абсолютну силу без перевірок.

Додай короткий cooldown, щоб спам Triggered не розганяв Power до абсурду під час демо.

Метафора: апгрейд сили - як важіль на станку; крутить його серверний оператор, не напис на екрані.

**Зроби зараз (7 хв):** зроби алтар +1 Power і перевір TAB до й після натискання.`,
      },
      {
        title: "TAB і HUD показують силу",
        content: `TAB уже відобразить IntValue Power, якщо Name правильний. Це мінімум здачі. Опційно додай PowerLabel за патерном CoinsHUD з 6.3:

\`local power = stats:WaitForChild("Power")\`
\`local function refresh()\`
\`  PowerLabel.Text = "Power: " .. power.Value\`
\`end\`
\`refresh()\`
\`power:GetPropertyChangedSignal("Value"):Connect(refresh)\`

| Сигнал | Що має побачити гравець |
|--------|-------------------------|
| Join | Power: 1 |
| Апгрейд | Нове число одразу |
| Збір | Coins ростуть швидше |
| Респавн Character | Power лишається |

Біля першої big монети постав табличку: «Монета × Power = нагорода». Без пояснення кнопка +Power виглядає як декор.

Не пиши Power з LocalScript. HUD лише читає серверне Value.

Образ: TAB і HUD - два табло над однією силою, а не два різних тренажери.

**Зроби зараз (4 хв):** підніми Power і переконайся, що TAB і HUD показують те саме без Stop.`,
      },
      {
        title: "Attributes на монеті vs стан гравця",
        content: `Розділи відповідальність чітко.

| На монеті | На гравці / leaderstats |
|-----------|-------------------------|
| CoinValue, CoinId, Collected | Power, Coins |
| Ставиться при spawn | Живе між респавнами |
| Зникає з Destroy | Зберігається до виходу / DataStore |
| Описує предмет | Описує прогрес |

Не став Power Attribute на Character як основне джерело. Character змінюється. Не дублюй Power і як Attribute на Player, і як IntValue - обери leaderstats.

Collected з 6.4 і CoinValue з 6.5 можуть жити разом на одній монеті. Power на монету не вішай: сила належить гравцю.

| Помилка | Наслідок |
|---------|----------|
| Power тільки на Character | Після смерті множник зникає |
| CoinValue тільки в імені Part | Rename ламає економіку |
| Два giveCoins у різних Scripts | Різні формули |
| LocalScript ставить Power | Чіт і брехливий TAB |

Метафора: монета носить цінник, гравець носить ранг сили.

**Зроби зараз (3 хв):** випиши в нотатку три Attributes на монеті й одне місце Power на гравці.`,
      },
      {
        title: "Playtest множника",
        content: `Заповни факти до зміни формули ще раз.

| # | Дія | Очікування | Факт |
|---|-----|------------|------|
| 1 | Power 1, монета 5 | +5 | |
| 2 | Power 2, монета 5 | +10 | |
| 3 | Power 2, монета 1 | +2 | |
| 4 | Немає CoinValue | default base 1 | |
| 5 | +Power на алтарі | TAB Power ++ | |
| 6 | Збір після апгрейду | більший payout | |
| 7 | LocalScript Power=99 | сервер ігнорує | |
| 8 | Респавн big з 6.5 | CoinValue з Config | |
| 9 | Output | base / power / final | |

Пункти 1, 2 і 6 - серце уроку. Якщо після апгрейду нагорода та сама, Power не читається або збір іде мимо giveCoins.

У Team Test два гравці з різним Power не повинні ділити множник. Кожен payout бере Power того, хто зібрав.

Метафора: playtest - ваги: спочатку гиря 5, потім важіль ×2.

**Зроби зараз (8 хв):** пройди рядки 1-2 і 5-6 без паузи на декор.`,
      },
      {
        title: "Типові дірки й швидкий дебаг",
        content: `| Симптом | Ймовірна причина | Фікс |
|---------|------------------|------|
| Завжди +base | Немає * Power | Одна формула в giveCoins |
| Завжди 0 | Power стартує з 0 | Старт 1 + math.max |
| Big і small однакові | Attribute не при spawn | Перевір 6.5 SetAttribute |
| Після апгрейду те саме | addPower на клієнті | Сервер Triggered |
| Краш на nil | Немає or default | GetAttribute(...) or 1 |
| Power зникає після смерті | Attribute на Character | leaderstats на Player |
| Різні суми в двох місцях | Прямий Coins.Value += | Видалити обхід giveCoins |

Найшвидший діагностичний рядок:

\`print("[payout]", player.Name, "base", base, "power", power, "final", final)\`

Якщо base правильний, а final ні - дивись Power. Якщо base завжди 1 - дивись Attribute на spawn.

Не тримай дві копії giveCoins у різних Scripts. Один Module або один серверний Script з функцією.

Образ: print - ліхтарик у касі; він показує, де саме зник множник.

**Зроби зараз (4 хв):** зроби один збір і звіри три числа в Output із TAB.`,
      },
      {
        title: "Місток до DataStore, цілей і балансу",
        content: `| Урок | Що потребує від 6.6 |
|------|---------------------|
| 6.7 DataStore | Поле power у payload |
| 6.8 Цілі дня | Збір швидшає з Power; можливі цілі на Power |
| 6.9 Баланс | Порівняння Coins/min при Power 1 і 2 |
| 6.10 Ship | Відчутний прогрес сили в короткому демо |

Не будуй сьогодні дерево престижу, rebirth і п'ять валют. Достатньо ×Power на зборі. Якщо пізніше з'явиться пасивний дохід, виріши окремо, чи множить його той самий Power.

Залиш формулу в одному коментарі біля giveCoins. У 6.9 ти крутитимеш Config value і Power окремо; подвійне множення зруйнує TTG1.

Метафора: сьогодні ти ставиш коробку передач; завтра виміряєш швидкість, післязавтра збережеш одометр.

**Зроби зараз (3 хв):** запиши в нотатку: «Power зберігаємо в 6.7 як number, старт 1».`,
      },
      {
        title: "Чекліст здачі уроку 44",
        content: `- [ ] Power у leaderstats, старт ≥ 1
- [ ] giveCoins множить base * Power з math.floor
- [ ] CoinValue Attribute читається на сервері
- [ ] nil Attribute має дефолт
- [ ] Є серверний спосіб +Power
- [ ] TAB або HUD показує Power
- [ ] print base / power / final на збір
- [ ] Playtest 1-2 і 6 зелені
- [ ] Немає Coins.Value += поза giveCoins
- [ ] Save: Lesson 6.6 - Power Attributes

Артефакт: сила як множник каси. Збір масштабується з прогресом гравця, а не лише з типом монети.

Короткий ритуал: big при Power 1 → +Power → та сама big після респавну → різниця в Coins очевидна без лекції.

У 6.7 цей Power стане полем сейфу. Не йди далі, поки множник не видно в TAB і Output.

Метафора: фінальний Save фіксує важіль, яким уже можна користуватись.

**Зроби зараз (3 хв):** пройди ритуал здачі й збережи Place під точною назвою.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Power змінюється лише в LocalScript",
      explanation: "Клієнт може виставити будь-який множник, а TAB і сервер розійдуться.",
      correctApproach: "Тримати Power у серверному leaderstats і змінювати його через addPower на сервері.",
    },
    {
      mistake: "Power стартує з 0",
      explanation: "Формула base * Power обнуляє всі нагороди й ховає баги збору.",
      correctApproach: "Ставити старт 1 і захищати math.max(1, power) у giveCoins.",
    },
    {
      mistake: "GetAttribute(\"CoinValue\") без дефолту",
      explanation: "nil ламає множення або дає непередбачуваний payout.",
      correctApproach: "Використовувати or 1 або fallback через CoinId і Config.",
    },
    {
      mistake: "Множення вже в Config і ще раз у giveCoins",
      explanation: "Подвійний буст спотворює баланс і TTG1 у наступних уроках.",
      correctApproach: "Config зберігає чисту базу, Power застосовується лише в giveCoins.",
    },
    {
      mistake: "Power збережено Attribute на Character",
      explanation: "Після смерті або респавну Character новий, і множник зникає.",
      correctApproach: "Тримати IntValue Power у leaderstats на Player.",
    },
    {
      mistake: "Немає способу підняти Power у Play",
      explanation: "Неможливо довести вплив множника ментору за один прогін.",
      correctApproach: "Додати серверний Prompt або Remote з +1 Power і порівняти два збори.",
    },
  ],
  summary: "Ти додав CoinValue Attributes і Power у leaderstats: giveCoins множить базу на силу гравця в одному місці. Множник видно в TAB і готовий до сейву, цілей та балансу.",
  practiceTask: {
    title: "Множник сили (~30 хв)",
    difficulty: "intermediate",
    description: `### Part A - Power stats (8 хв)
1. Створи IntValue Power = 1 у leaderstats.
2. Перевір TAB до першого збору.
3. Напиши addPower(player, delta) на сервері.

### Part B - Формула й Attribute (14 хв)
1. Читай CoinValue на зборі з дефолтом.
2. Онови giveCoins: final = math.floor(base * power).
3. Додай print base / power / final.
4. Зроби алтар або кнопку +1 Power.

### Part C - Доказ (8 хв)
1. Порівняй ту саму big монету при Power 1 і Power 2.
2. Переконайся, що немає прямого Coins.Value += поза giveCoins.
3. Збережи Place як **Lesson 6.6 - Power Attributes**.`,
    hints: [
      "Спочатку хардкод Power=2 для тесту, потім підключи Prompt.",
      "math.floor тримає IntValue чистим.",
      "Якщо big і small однакові - спочатку перевір SetAttribute у spawn з 6.5.",
      "Не приймай абсолютне Power з клієнтського FireServer без перевірок.",
    ],
    optionalChallenge: "Додай короткий cooldown на addPower і текст на алтарі: «Монета × Power = нагорода».",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Який головний артефакт уроку 6.6?",
        options: [
          "Видалити Config і лишити лише колір монет",
          "Power у leaderstats і Attribute CoinValue, що разом змінюють payout",
          "Новий острів без giveCoins",
          "LocalScript, який сам пише Coins",
        ],
        correctAnswer: 1,
        explanation: "Урок з'єднує вартість предмета і силу гравця в одній касі.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де найкраще тримати Power для TAB і сейву?",
        options: [
          "IntValue у leaderstats на Player",
          "Лише змінна в LocalScript",
          "Attribute тільки на Character",
          "У назві Baseplate",
        ],
        correctAnswer: 0,
        explanation: "leaderstats стабільний між респавнами і видимий у TAB.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо GetAttribute(\"CoinValue\")?",
        options: [
          "Щоб видалити Humanoid",
          "Щоб створити RemoteEvent",
          "Щоб прочитати базову вартість монети на сервері",
          "Щоб вимкнути HUD",
        ],
        correctAnswer: 2,
        explanation: "Attribute зберігає базу предмета для формули нагороди.",
      },
      {
        id: "q4",
        type: MC,
        question: "Чому Power не варто стартувати з 0?",
        options: [
          "Бо IntValue забороняє 0",
          "Бо TAB тоді працює швидше",
          "Бо Attribute зникне",
          "Бо base * 0 обнуляє всі нагороди",
        ],
        correctAnswer: 3,
        explanation: "Старт 1 зберігає сенс базового збору.",
      },
      {
        id: "q5",
        type: MC,
        question: "Яка типова формула цього уроку?",
        options: [
          "final завжди 999999",
          "final = math.floor(base * Power)",
          "final = лише Power без base",
          "final пише клієнт у TextLabel",
        ],
        correctAnswer: 1,
        explanation: "Одна серверна формула множить чисту базу на силу.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що робити, якщо CoinValue Attribute відсутній?",
        options: [
          "Обов'язково крашнути Script",
          "Видалити гравця",
          "Взяти дефолт або fallback через CoinId і Config",
          "Поставити Coins у мінус",
        ],
        correctAnswer: 2,
        explanation: "Дефолт захищає касу від nil.",
      },
      {
        id: "q7",
        type: MC,
        question: "Хто має викликати addPower?",
        options: [
          "Серверний Prompt або Remote-обробник",
          "Будь-який LocalScript без перевірки",
          "ParticleEmitter після burst",
          "Sign із SurfaceGui сам по собі",
        ],
        correctAnswer: 0,
        explanation: "Сила змінюється лише серверною логікою.",
      },
      {
        id: "q8",
        type: MC,
        question: "Чому Power на Character ризикований як основне джерело?",
        options: [
          "Character не існує в Roblox",
          "Attribute на Character завжди кращий за Value",
          "Character може зникнути при респавні",
          "leaderstats тоді заборонені",
        ],
        correctAnswer: 2,
        explanation: "Прогрес сили має жити на Player.",
      },
      {
        id: "q9",
        type: MC,
        question: "Як 6.6 готує 6.7?",
        options: [
          "DataStore забороняє зберігати Power",
          "Треба видалити Power перед сейвом",
          "Save має бути лише на клієнті",
          "Power стає числовим полем payload разом із Coins",
        ],
        correctAnswer: 3,
        explanation: "Множник має переживати rejoin у наступному уроці.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що означає подвійне множення?",
        options: [
          "Config уже містить Power, і giveCoins множить ще раз",
          "Дві монети на сцені",
          "Два TextLabel у HUD",
          "Два SpawnPoints",
        ],
        correctAnswer: 0,
        explanation: "База має бути чистою, множник - лише в giveCoins.",
      },
      {
        id: "q11",
        type: MC,
        question: "Який мінімальний доказ множника для ментора?",
        options: [
          "Скріншот Explorer без Play",
          "Той самий collectable дає більший payout після +Power",
          "Новий Skybox",
          "Видалення анти-дубля",
        ],
        correctAnswer: 1,
        explanation: "Порівняння до й після апгрейду показує живу формулу.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що має робити HUD із Power?",
        options: [
          "Записувати будь-яке число з клієнта",
          "Замінювати giveCoins",
          "Читати серверне Value і показувати його",
          "Видаляти CoinValue Attribute",
        ],
        correctAnswer: 2,
        explanation: "HUD - вітрина, не каса.",
      },
      {
        id: "q13",
        type: MC,
        question: "Навіщо print base, power, final?",
        options: [
          "Щоб швидше знайти, де саме ламається формула",
          "Щоб збільшити MaxHealth",
          "Щоб вимкнути DataStore",
          "Щоб замінити TAB",
        ],
        correctAnswer: 0,
        explanation: "Три числа показують джерело помилки за секунди.",
      },
      {
        id: "q14",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 6.7 - Sim DataStore",
          "Lesson 6.6 - Power Attributes",
          "Lesson 6.5 - Spawn Config",
          "Power Draft Final",
        ],
        correctAnswer: 1,
        explanation: "Чекліст вимагає Lesson 6.6 - Power Attributes.",
      },
      {
        id: "q15",
        type: MC,
        question: "Як Power допоможе в 6.9?",
        options: [
          "Баланс зможе порівняти дохід при різних значеннях сили",
          "TTG1 більше не потрібен",
          "Config value стане непотрібним",
          "Анти-дубль можна вимкнути",
        ],
        correctAnswer: 0,
        explanation: "Різний Power дає вимірювану різницю Coins/min і TTG.",
      },
    ],
  },
};
