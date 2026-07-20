export const ukLesson32 = {
  lessonId: "lesson-roblox-5-4",
  moduleId: "module-05",
  order: 4,
  title: "5.4 - while-платформи + Config",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Запустити серверний while true, що рухає платформу між двома позиціями",
    "Тримати waitUp, waitDown і offset у PlatformConfig table",
    "Зв'язати кілька платформ циклом for по Config без копіпасти Script",
    "Зробити таймінг читабельним: гравець бачить цикл і встигає стрибнути",
    "Підготувати Config як важіль балансу для difficulty curve у 5.7",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 32 з 92)",
        content: `У **5.3** ти зібрав чекпоінти, таймер і GUI. Сьогодні Obby отримує **рух у часі**: платформи, що з'являються, зникають або їздять туди-назад за циклом \`while\`.

Це не TweenService polish для Arena-ударів. Жанр лишається Obby: гравець читає ритм платформи й стрибає у вікно безпеки.

Артефакт уроку:
1. Мінімум 2 while-платформи на основному шляху.
2. ModuleScript або Script table **PlatformConfig** з id, waitUp, waitDown (і offset за потреби).
3. Один серверний цикл (або for по Config), без окремого майже однакового Script на кожен Part.
4. Play: цикл стабільний, немає спаму в Output, стрибок можливий.
5. Save **Lesson 5.4 - Moving Platforms**.

| Було в 5.3 | Стає в 5.4 |
|-------------|------------|
| Статичні Parts і checkpoints | Parts з повторюваним таймінгом |
| Складність лише gap і hazard | Складність ще й у часі |
| Числа розкидані в коді | Числа в Config |

У **5.5** додаси секрет. У **5.7** крутитимеш саме waitUp/waitDown як важіль кривої. Заклади Config сьогодні.

Метафора: статична платформа - сходинка; while-платформа - ліфт із розкладом, який треба зловити.

**Зроби зараз (2 хв):** відкрий Place з 5.3 і познач два місця, де статичний стрибок можна замінити ритмічною платформою.`,
      },
      {
        title: "Навіщо while, а не разова анімація",
        content: `Obby потребує **нескінченного циклу** на сервері, поки гра працює. Гравець може підійти на 10-й чи 100-й секунді - платформа все ще має рухатись за правилом.

| Підхід | Коли брати |
|--------|------------|
| \`while true do ... task.wait() end\` | Повторюваний ігровий цикл платформи |
| Tween один раз | Разовий ефект (відкриття дверей, flash) |
| RunService.Heartbeat кожен кадр | Точний рух, але складніше для першого уроку |

Сьогодні базовий патерн:

\`while true do\`
\`  -- стан A (платформа «вгорі» / видима)\`
\`  task.wait(waitUp)\`
\`  -- стан B (внизу / прозора / зсунута)\`
\`  task.wait(waitDown)\`
\`end\`

\`task.wait\` не блокує весь сервер так, як старий wait у поганому місці, і добре читається новачку. Не став порожній \`while true do end\` без wait - це зависання й лаг.

Цикл живе в **Script** (сервер). LocalScript не має бути єдиним джерелом позиції платформи для всіх гравців.

**Зроби зараз (3 хв):** запиши двома словами свої два стани для першої платформи: наприклад «тверда / прозора» або «ліво / право».`,
      },
      {
        title: "Два патерни платформи",
        content: `Обери один патерн на платформу. Не змішуй усе в одному Part без потреби.

| Патерн | Що змінюєш | Відчуття |
|--------|------------|----------|
| Blink | CanCollide + Transparency | «Злови момент, поки є підлога» |
| Shuttle | Position / CFrame між A і B | «Застрибни на ліфт і з'їдь» |

Blink простіший для першого while: Part лишається на місці, лише твердість і видимість мигають. Shuttle навчає offset і двом CFrame.

Для здачі 5.4 достатньо:
- 1 blink-платформа;
- 1 shuttle-платформа;
- або дві blink з різними wait у Config.

Anchored = true завжди. Інакше гравітація знесе «ліфт» після першого циклу.

Не роби платформу KillBrick одночасно з blink без чіткого кольору - гравець не відрізнить «безпечне вікно» від hazard.

**Зроби зараз (6 хв):** створи Part Moving_01 (blink) і Moving_02 (shuttle або друга blink) з різними кольорами.`,
      },
      {
        title: "PlatformConfig: числа в одному місці",
        content: `Config - table, з якої цикл читає таймінги. Завтра в 5.7 ти змінюватимеш числа, не переписуючи логіку.

\`local PlatformConfig = {\`
\`  { id = "Moving_01", kind = "blink", waitUp = 2.0, waitDown = 1.5 },\`
\`  { id = "Moving_02", kind = "shuttle", waitUp = 1.2, waitDown = 1.2, offset = Vector3.new(0, 0, 12) },\`
\`}\`

| Поле | Навіщо |
|------|--------|
| id | Ім'я Part у Workspace / Folder Platforms |
| kind | blink або shuttle |
| waitUp | Скільки секунд у «безпечному» / крайньому стані A |
| waitDown | Скільки секунд у стані B |
| offset | Зсув для shuttle (опційно) |

Тримай Config на початку Script або в ModuleScript ReplicatedStorage/PlatformConfig. Головне - **один список**, а не магічні числа всередині while.

Коментар біля рядка з датою ітерації допоможе в 5.7: \`-- 5.4 start: waitUp 2.0\`.

**Зроби зараз (5 хв):** створи PlatformConfig з двома записами й реальними id своїх Parts.`,
      },
      {
        title: "Один while для однієї платформи",
        content: `Мінімальний blink на сервері:

\`local part = workspace.Platforms.Moving_01\`
\`while true do\`
\`  part.CanCollide = true\`
\`  part.Transparency = 0\`
\`  task.wait(2)\`
\`  part.CanCollide = false\`
\`  part.Transparency = 0.8\`
\`  task.wait(1.5)\`
\`end\`

Після Config підстав числа з table. Не хардкодь 2 і 1.5 у п'яти місцях.

Shuttle-ідея:

\`local start = part.Position\`
\`local finish = start + offset\`
\`while true do\`
\`  part.Position = finish\`
\`  task.wait(waitUp)\`
\`  part.Position = start\`
\`  task.wait(waitDown)\`
\`end\`

Стрибкоподібний Position для навчання ок. Плавний Tween можна додати пізніше; сьогодні важливий **передбачуваний цикл**, не кінематограф.

Якщо гравець стоїть на платформі під час CanCollide false - він впаде. Це і є геймплей blink. Постав hazard або м'яку яму під нею свідомо.

**Зроби зараз (8 хв):** запусти while для Moving_01 у Play і переконайся, що цикл повторюється без помилок Output.`,
      },
      {
        title: "for по Config: кілька платформ без копіпасти",
        content: `Копіювати Script на кожен Part - шлях до розсинхрону: змінив таймінг в одному, забув у другому.

Краще:

\`for _, cfg in ipairs(PlatformConfig) do\`
\`  task.spawn(function()\`
\`    local part = workspace.Platforms:WaitForChild(cfg.id)\`
\`    while true do\`
\`      -- blink або shuttle за cfg.kind\`
\`      task.wait(cfg.waitUp)\`
\`      -- другий стан\`
\`      task.wait(cfg.waitDown)\`
\`    end\`
\`  end)\`
\`end\`

\`task.spawn\` дає кожній платформі власний while, щоб одна не блокувала іншу. Без spawn другий цикл ніколи не стартує, якщо перший while true вічний.

Перевір імена: cfg.id має збігатися з Name Part. WaitForChild врятує від гонки завантаження.

Не запускай 20 while «про запас». Дві-три платформи для здачі; зайві записи в Config без Parts дадуть зависання на WaitForChild або warn.

**Зроби зараз (7 хв):** підключи обидві платформи через for + task.spawn від одного PlatformConfig.`,
      },
      {
        title: "Читабельний таймінг: fair window",
        content: `Складність while-платформи - у **вікні**, не в невидимості.

| Симптом | Ймовірна причина | Фікс у Config |
|---------|------------------|---------------|
| Ніхто не встигає | waitUp занадто малий | Збільш waitUp |
| Нудно чекати | waitDown / waitUp завеликі | Зменш паузи |
| Неясно, коли стрибати | Прозорість 1 = повністю невидимо | Transparency 0.5-0.8 у «вихідному» стані |
| Смерть здається випадковою | Немає ритму / різні цикли хаотично | Однакові фази або явний колір |

Стартові орієнтири для біому 2:
- blink: waitUp 1.5-2.5, waitDown 1.0-2.0;
- shuttle: 1.0-2.0 на кожну сторону.

Біом 1 може бути повільнішим (навчання). Біом 3 - коротші вікна, але все ще видимий цикл. Точне крутіння - у 5.7; сьогодні заклади fair значення.

Гравець має **побачити** два повні цикли перед обов'язковим стрибком, якщо це перша while-платформа рівня.

**Зроби зараз (4 хв):** пройди сам кожну платформу. Якщо помер через «не встиг зрозуміти» - підніми waitUp.`,
      },
      {
        title: "Де ставити платформи на маршруті",
        content: `While-платформа - подія на шляху, не декорація в кутку.

| Добре | Погано |
|-------|--------|
| Після checkpoint, з місцем розігнатись | Одразу після Spawn без навчання |
| Над видимою ямою / hazard | Над нескінченною порожнечею без CP позаду |
| Одна нова ідея за раз | Blink + shuttle + вузький gap одночасно на першому Part |
| Колір відрізняється від підлоги | Той самий Material, що й безпечна земля |

Не замінюй усі статичні Parts рівня. Дві while-платформи достатньо змінюють ритм. Решта маршруту лишається опорою для 5.5-5.6.

Якщо платформа веде до секрету - ок, але основний Finish має існувати й без ідеального таймінгу цієї платформи, або поруч має бути статичний обхід для навчання. У фіналі можна прибрати обхід - після того, як гравець уже навчився в 5.7.

**Зроби зараз (5 хв):** вбудуй Moving_01 і Moving_02 в основний шлях після існуючого checkpoint.`,
      },
      {
        title: "Стабільність: Anchored, Pivot, помилки",
        content: `Типові поломки while-платформ:

| Проблема | Фікс |
|----------|------|
| Part падає | Anchored true |
| Цикл раз і стоп | Немає while true або error перед наступною ітерацією |
| Одна платформа рухається, друга ні | Забули task.spawn / другий cfg.id |
| Output червоний Infinite yield | Невірний id у WaitForChild |
| Гравець «прилип» | Рідко: зсув CFrame; спробуй Position або коротший offset |

Не змінюй Size кожен цикл без потреби - це важче читається й дорожче. Для blink досить CanCollide + Transparency.

Обгортати весь while у pcall не обов'язково на 5.4, але одна помилка властивості всередині циклу може вбити цей spawn. Перевір Part існує до while.

Play на 30+ секунд: обидва цикли живі, немає зростаючого списку помилок.

**Зроби зараз (4 хв):** 30 с Play, дивись Output і обидві платформи одночасно.`,
      },
      {
        title: "Зв'язок з checkpoint і hazards",
        content: `While-платформа стоїть у мережі систем 5.2-5.3.

- **Checkpoint перед складною платформою** зменшує лють від навчання таймінгу.
- **Hazard під blink** має бути видимим (колір), інакше смерть unfair.
- **Debounce hazard** лишається з 5.2; платформа не скасовує його.
- **Таймер GUI** з 5.3 продовжує йти - не скидайте його в while платформи.

Не відкривай двері секрету через while - це плутанина з 5.5. Секрет отримає Prompt; платформи лишаються паркуром.

Якщо після смерті платформа «не там», де очікував гравець - це норма для циклу. Проблема лише якщо цикл зупинився. Respawn не повинен reset-ити Config.

**Зроби зараз (3 хв):** постав або перевір checkpoint перед першою while-платформою.`,
      },
      {
        title: "Що НЕ робити в 5.4",
        content: `| Не роби зараз | Коли |
|---------------|------|
| Tween polish на кожен удар / меч | Це старий Arena-контент; не тема модуля |
| 15 унікальних Script без Config | Анти-патерн |
| waitUp = 0.1 як «хардкор» | Unfair; баланс у 5.7 |
| LocalScript як єдиний рух платформи | Розсинхрон між гравцями |
| Повний juice Sound на цикл | 5.9 |
| DataStore таймінгів | зайве |

Мета уроку - **керований ритм + Config**, не кіно й не нова зброя.

Якщо тягне повернути TweenService лише для краси дверей арени - зупинись. Обсій while і table.

**Зроби зараз (2 хв):** викресли з плану все, що не є while + PlatformConfig + 2 платформи.`,
      },
      {
        title: "Playtest циклу",
        content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Play 20 с біля Moving_01 | Цикл повторюється |
| 2 | Стрибок у безпечне вікно | Успіх без «лотереї» |
| 3 | Чекай повний цикл перед стрибком | Ритм читається |
| 4 | Moving_02 з Config | Інший таймінг, той самий код |
| 5 | Смерть і respawn на CP | Платформи далі крутяться |
| 6 | Output | Без infinite yield / spam |
| 7 | Зміни waitUp у Config на +0.5 | Поведінка змінилась без правки while |

Пункт 7 - доказ, що Config справді керує. Якщо зміна числа нічого не робить - цикл читає хардкод.

**Зроби зараз (8 хв):** пройди таблицю й зафіксуй один Config-тюнінг, який покращив стрибок.`,
      },
      {
        title: "Чекліст здачі й міст далі",
        content: `Перед Save:

- [ ] Мінімум 2 while-платформи на маршруті
- [ ] PlatformConfig з waitUp/waitDown (і offset для shuttle)
- [ ] for + task.spawn або еквівалент без копіпасти логіки
- [ ] Anchored true, цикл стабільний 30+ с
- [ ] Таймінг читабельний (не 0.1 с вікно)
- [ ] Checkpoint перед першою складною платформою бажаний
- [ ] Save: **Lesson 5.4 - Moving Platforms**

Далі **5.5 - Секрети + ключ-двері**: основний шлях уже з ритмом; секрет лишиться опційним. У **5.6** тестер оцінить, чи while зрозумілий без підказок. У **5.7** ти крутитимеш саме Config як важіль difficulty curve.

Артефакт: **живі платформи з одним Config-пультом**, а не разовий Tween з уроку про арену.

**Зроби зараз (2 хв):** Save Place як Lesson 5.4 - Moving Platforms.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "while true без task.wait",
      explanation: "Сервер крутить порожній цикл і лагає.",
      correctApproach: "Завжди waitUp/waitDown або task.wait у тілі циклу",
    },
    {
      mistake: "Окремий майже однаковий Script на кожну платформу",
      explanation: "Таймінги роз'їжджаються, правки забуваються.",
      correctApproach: "PlatformConfig + for + task.spawn",
    },
    {
      mistake: "Числа лише всередині while, Config немає",
      explanation: "У 5.7 неможливо швидко крутити криву.",
      correctApproach: "waitUp/waitDown читати з table",
    },
    {
      mistake: "Вікно 0.2 с або повністю невидима платформа",
      explanation: "Смерть здається випадковою, не навичною.",
      correctApproach: "Видимий ритм і fair waitUp для навчання",
    },
    {
      mistake: "Рух платформи лише з LocalScript",
      explanation: "Різні клієнти бачать різну правду.",
      correctApproach: "Серверний Script задає стан Part",
    },
    {
      mistake: "Повернення до Arena Tween/меч замість Obby while",
      explanation: "Ламає жанр модуля 5.",
      correctApproach: "Blink/shuttle платформи на паркурному маршруті",
    },
  ],
  summary: "Ти зібрав while-платформи Obby з PlatformConfig: мінімум два цикли, for + task.spawn, читабельні waitUp/waitDown. Config готовий стати пультом балансу в 5.7 без переписування логіки.",
  practiceTask: {
    title: "While-платформи з Config (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** дві керовані платформи на сервері з одним Config.

### Part A - Сцена (8 хв)
1. Folder Platforms: Moving_01, Moving_02.
2. Anchored true, різні кольори.
3. Одна blink, друга blink або shuttle.

### Part B - Config і цикл (17 хв)
1. PlatformConfig з id, waitUp, waitDown (+ offset).
2. for ipairs + task.spawn + while true.
3. Стан A/B змінює CanCollide/Transparency або Position.

### Part C - Перевірка (10 хв)
1. 30 с стабільного циклу.
2. Успішний стрибок у вікно.
3. Зміна waitUp у Config змінює поведінку.
4. **Save:** Lesson 5.4 - Moving Platforms`,
    hints: [
      "Без task.spawn другий while не стартує після першого while true",
      "Починай з waitUp ≥ 1.5 с для першої навчальної платформи",
      "id у Config має точно збігатися з Name Part",
    ],
    optionalChallenge: "Додай третій рядок Config з іншим offset і винеси kind-гілку blink/shuttle в одну функцію startPlatform(cfg).",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.4?",
        options: [
          "Tween ударів меча на Arena",
          "While-платформи Obby з таймінгом у Config",
          "DataStore прогресу монет",
          "Видалити всі checkpoint",
        ],
        correctAnswer: 1,
        explanation: "Ритмічні платформи й Config - тема уроку.",
      },
      {
        id: "q2",
        type: MC,
        question: "Чому while true потребує task.wait?",
        options: [
          "Інакше порожній цикл лагає сервер",
          "Без wait Part не може бути Anchored",
          "wait створює Badge",
          "LocalScript інакше не існує",
        ],
        correctAnswer: 0,
        explanation: "Пауза між станами й захист від busy-loop.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо PlatformConfig?",
        options: [
          "Малювати Skybox",
          "Замінити Humanoid",
          "Тримати waitUp/waitDown в одному місці для ітерацій",
          "Вимкнути Touched",
        ],
        correctAnswer: 2,
        explanation: "Пульт чисел для балансу й підтримки.",
      },
      {
        id: "q4",
        type: MC,
        question: "Навіщо task.spawn у for по платформах?",
        options: [
          "Щоб кожен while працював паралельно",
          "Щоб видалити Config",
          "Щоб платформи стали LocalScript",
          "Щоб вимкнути Anchored",
        ],
        correctAnswer: 0,
        explanation: "Інакше перший while true блокує наступні.",
      },
      {
        id: "q5",
        type: MC,
        question: "Що типово змінює blink-платформа?",
        options: [
          "MaxHealth гравця",
          "CanCollide і Transparency за розкладом",
          "SoundService Volume глобально",
          "Ім'я Place",
        ],
        correctAnswer: 1,
        explanation: "Тверда/м'яка підлога в часі.",
      },
      {
        id: "q6",
        type: MC,
        question: "Де має крутитись логіка платформи?",
        options: [
          "Лише в LocalScript одного гравця",
          "У Script на сервері",
          "У Lighting без Script",
          "У Bundle Marketplace",
        ],
        correctAnswer: 1,
        explanation: "Серверна правда позиції/стану для всіх.",
      },
      {
        id: "q7",
        type: MC,
        question: "Який waitUp найгірший для першої навчальної платформи?",
        options: [
          "2.0 с",
          "1.8 с",
          "2.5 с",
          "0.15 с",
        ],
        correctAnswer: 3,
        explanation: "Занадто коротке вікно = unfair spike.",
      },
      {
        id: "q8",
        type: MC,
        question: "Що робити, якщо WaitForChild висить infinite yield?",
        options: [
          "Перевірити id у Config і Name Part",
          "Збільшити Volume",
          "Видалити всі while",
          "Поставити правильну відповідь quiz у 0",
        ],
        correctAnswer: 0,
        explanation: "Імена мають збігатися.",
      },
      {
        id: "q9",
        type: MC,
        question: "Як 5.4 готує 5.7?",
        options: [
          "5.7 видаляє Config",
          "Difficulty curve крутитиме waitUp/waitDown як важіль",
          "5.7 замінює Obby на Tycoon",
          "Платформи більше не потрібні",
        ],
        correctAnswer: 1,
        explanation: "Config стає пультом балансу.",
      },
      {
        id: "q10",
        type: MC,
        question: "Чому погано ставити першу while-платформу одразу на Spawn без навчання?",
        options: [
          "SpawnLocation тоді зникає",
          "Новачок ще не читає ритм - високий ризик стіни на старті",
          "while заборонений біля Spawn",
          "Config не працює в біомі 1",
        ],
        correctAnswer: 1,
        explanation: "Спочатку навчи статичним стрибкам і дай CP.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що має лишатись true на рухомій платформі?",
        options: [
          "Anchored",
          "Looped у Sound",
          "CanQuery = false завжди",
          "Material = Neon обов'язково",
        ],
        correctAnswer: 0,
        explanation: "Без Anchored Part падає.",
      },
      {
        id: "q12",
        type: MC,
        question: "Який доказ, що Config реально підключений?",
        options: [
          "Зміна waitUp одразу змінює цикл у Play",
          "Part перейменовано вручну",
          "Небо змінили в Lighting",
          "Додали Decal",
        ],
        correctAnswer: 0,
        explanation: "Число з table керує поведінкою.",
      },
      {
        id: "q13",
        type: MC,
        question: "Що НЕ є метою 5.4?",
        options: [
          "Дві while-платформи",
          "PlatformConfig",
          "Стабільний цикл без Output spam",
          "Полірування Arena-меча через TweenService",
        ],
        correctAnswer: 3,
        explanation: "Старий Arena-контент відхилено.",
      },
      {
        id: "q14",
        type: MC,
        question: "Як while-платформа стикується з 5.3?",
        options: [
          "Видаляє GUI таймера",
          "Checkpoint перед складною платформою зменшує лють від навчання",
          "Замінює всі checkpoint на while",
          "Вимикає respawn",
        ],
        correctAnswer: 1,
        explanation: "Прогрес і ритм працюють разом.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 5.3 - Checkpoints",
          "Lesson 5.5 - Secrets Key Door",
          "Arena Tween Polish",
          "Lesson 5.4 - Moving Platforms",
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Lesson 5.4 - Moving Platforms.",
      },
    ],
  },
};
