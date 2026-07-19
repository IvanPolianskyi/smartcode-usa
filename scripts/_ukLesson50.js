export const ukLesson50 = {
  lessonId: "lesson-roblox-7-2",
  moduleId: "module-07",
  order: 2,
  title: "7.2 - Дропер while/for + Config",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Запустити серверний while або for, який спавнить Drop з Mouth",
    "Тримати interval, payout і maxAlive в єдиному DropperConfig",
    "Читати Config.interval на кожній ітерації, щоб темп можна було змінювати",
    "Обмежити кількість живих Drop через lifetime або відбір найстаріших за SpawnedAt",
    "Підготувати Attribute Payout і структуру plot під collector у 7.3",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 50 з 92)",
        content: `У 7.1 ти зібрав скелет Tycoon: Plot, Dropper з Mouth, Collector і Folder Drops. Сьогодні сцена отримує мотор. Ти не додаєш Coins і не пишеш магазин. Твоя задача - щоб сервер ритмічно кидав Parts з Mouth, а числа темпу жили в Config.

Артефакт уроку:
1. ModuleScript або table **DropperConfig** з interval, payout, maxAlive.
2. Серверний цикл while або for із task.wait(Config.interval).
3. Функція spawnDrop, що створює Part у Mouth.CFrame і кладе його в Drops.
4. Anti-lag: lifetime Destroy або trim за Attribute SpawnedAt.
5. Доказ: зміна одного числа в Config змінює темп на наступній ітерації.

У 7.3 Collector прочитає Attribute Payout і додасть Coins. Тому сьогодні payout уже має бути на кожному Drop, навіть якщо каса ще мовчить.

| Було в 7.1 | Стає в 7.2 |
|------------|------------|
| Ручний Clone | Автоматичний цикл |
| Числа в голові | DropperConfig |
| Порожній Drops | Живі Parts з лімітом |
| Статичний Mouth | Точка спавну для while |

Метафора: учора ти поставив конвеєр, сьогодні вмикаєш стрічку.

**Зроби зараз (3 хв):** відкрий Plot з 7.1 і випиши стартові числа interval=2, payout=5, maxAlive=30.`,
      },
      {
        title: "Config - пульт фабрики",
        content: `Без Config ти завтра не зможеш зробити апгрейд темпу. Усі wait(2) і магічні 5 у різних Scripts перетворять баланс на лотерею.

\`local DropperConfig = {interval = 2, payout = 5, maxAlive = 30, lifetime = 20}\`

У ModuleScript поверни такий table, а в DropperService підключи його один раз через require. Це одне джерело правди.

| Поле | Навіщо |
|------|--------|
| interval | Пауза між дропами |
| payout | Цінність для Attribute і майбутніх Coins |
| maxAlive | Стеля живих Parts у Drops |
| lifetime | Скільки секунд Drop живе, якщо його не зібрали |

Не дублюй ці числа в spawnDrop як літерали. Функція читає Config. У 7.4 і 7.6 ти змінюватимеш саме ці поля. Якщо interval=2 у ModuleScript, а в циклі стоїть wait(1), playtest покаже брехню: ментор крутить Config, а фабрика його не слухає.

Поклади ModuleScript у ReplicatedStorage або ServerStorage і require лише з серверного Script. Не копіюй table вручну в три файли "про всяк випадок". Одна копія - одна правда. Перед playtest відкрий Module і зачитай числа вголос: це твій контракт із демо.

Образ: Config схожий на панель верстата - швидкість і розмір партії крутяться тут, а не всередині мотора.

**Зроби зараз (4 хв):** створи DropperConfig і require його з ServerScriptService Script.`,
      },
      {
        title: "while як мотор, не як зависання",
        content: `Цикл має крутитись на сервері. LocalScript не може бути єдиним мотором фабрики: інші гравці не побачать правди, а чіт стане простішим.

\`task.spawn(function() while running do spawnDrop() task.wait(DropperConfig.interval) end end)\`

task.spawn потрібен, щоб while не заблокував решту Script на старті. Перед запуском задай running = true, а для зупинки зміни прапор на false під час вимкнення plot або PlayerRemoving.

| Добре | Погано |
|-------|--------|
| wait(Config.interval) | while true без wait |
| Прапор running | Видалити Workspace щоб зупинити |
| Серверний Script | LocalScript як єдина фабрика |
| Читання interval щоразу | local w = interval один раз до while |

Альтернатива for зручна для скінченної навчальної серії: він повторює spawnDrop задану кількість разів і після кожного виклику чекає актуальний interval. Для живого plot while зручніший, бо фабрика має працювати, поки ділянка існує, а не рівно N разів.

Перед першим запуском перевір, що Mouth і Drops уже знайдені через WaitForChild. Якщо Script стартує раніше за білд, цикл або впаде, або створить Parts у неправильному місці. Одне точне очікування Mouth економить пів години дебагу.

Метафора: while без wait - як педаль газу без гальм.

**Зроби зараз (5 хв):** запусти цикл на 20 с і переконайся, що Parts з'являються з Mouth.`,
      },
      {
        title: "Читай interval на кожній ітерації",
        content: `Апгрейди в 7.4 змінюватимуть темп під час гри. Якщо ти зчитав interval один раз перед while, дропер ігноруватиме нові значення до рестарту Script.

Правильний цикл передає в task.wait значення DropperConfig.interval безпосередньо на кожній ітерації. Неправильний варіант один раз копіює interval у локальну pause перед while, тому майбутні апгрейди не впливають на темп.

| Сценарій | Очікування |
|----------|------------|
| Змінив interval 2 -> 0.8 у Play | Наступна пауза коротша |
| Змінив payout | Нові Drop мають новий Attribute |
| Повернув interval 2 | Темп знову спокійний |
| Залишив дебаг 0.05 | FPS і баланс брешуть - поверни перед Save |

Під час тесту можна тимчасово прискорити темп, але перед здачею поверни навчальні 1.5-3 с. Інакше 7.3 і 7.6 отримають лавину замість ритму. Запиши "було / стало" як у балансі Simulator: interval 2 -> 0.8, Parts за 10 с стало помітно більше. Це і є доказ уроку.

Якщо темп не змінюється, шукай захардкожений wait поруч із Config. Іноді учні читають Config для payout, але interval лишають літералом. Перевір обидва рядки в одному проході очима.

Тут головне правило просте: конвеєр слухає пульт щоразу, коли робить крок.

**Зроби зараз (4 хв):** під час Play зміни interval і покажи, що темп змінився без Stop.`,
      },
      {
        title: "spawnDrop з Mouth у Drops",
        content: `Функція має брати конкретні посилання plot, а не шукати Parts по всьому Workspace.

\`drop:SetAttribute("Payout", DropperConfig.payout)\`

\`drop:SetAttribute("SpawnedAt", os.clock())\`

Mouth з 7.1 - точка CFrame. Folder Drops - контейнер для trim і для ментора. Attribute Payout підготує collector у 7.3: він прочитає цінність без здогадок.

| Поле Drop | Навіщо |
|-----------|--------|
| Anchored false | Падає фізикою |
| Parent = Drops | Легко рахувати й чистити |
| Payout Attribute | Майбутні Coins |
| SpawnedAt | Чесний вибір найстаріших |

Не клонуй template з випадковим Script усередині сто разів. Для здачі достатньо простого Part. Якщо дуже хочеться модельки, клонуй чистий шаблон без вкладених Script і одразу став Parent у Drops.

Перевір Size: 1×1×1 добре читається й рідко застрягає. Занадто великий Drop ламає бортики з 7.1 і виглядає як уламки, а не продукція. Колір може бути яскравим для дебагу; пізніше приглушиш.

Метафора: Mouth - кран, Drops - ящик під краном.

**Зроби зараз (8 хв):** напиши spawnDrop(mouth, folder) і виклич її з циклу.`,
      },
      {
        title: "Anti-lag: lifetime і чесний trim",
        content: `Без ліміту while за 2 хвилини засипле карту. Є два надійні підходи, і їх можна комбінувати.

**Lifetime:** після spawn через task.delay плануй видалення через DropperConfig.lifetime. Перед Destroy перевір, що drop усе ще має Parent, бо Collector може прибрати його раніше.

**trim за віком:** не довіряй першому елементу GetChildren як найстарішому. Порядок дітей у Roblox не гарантує FIFO. Почни з oldestTime = math.huge, переглянь усі об'єкти та порівняй Attribute SpawnedAt:

\`for _, item in folder:GetChildren() do local stamp = item:GetAttribute("SpawnedAt"); if stamp and stamp < oldestTime then oldest, oldestTime = item, stamp end end\`

Після for викликай Destroy лише для знайденого oldest. Якщо кількість усе ще перевищує maxAlive, повтори пошук для наступного найстарішого об'єкта.

| Підхід | Плюс | Мінус |
|--------|------|-------|
| lifetime | Простий і передбачуваний | Може видалити Drop біля Collector |
| trim за SpawnedAt | Тримає стелю maxAlive | Потрібен Attribute і sort |
| Перший елемент GetChildren | Здається коротким | Може знищити свіжий Drop |

Викликай trim після spawn. Playtest 30 с не повинен давати сотні Parts.

Метафора: anti-lag - це запобіжник, який не дає фабриці згоріти від власного темпу.

**Зроби зараз (5 хв):** додай lifetime або trim і прогони 30 с із лічильником дітей у Drops.`,
      },
      {
        title: "Фізика шляху все ще з 7.1",
        content: `Якщо Parts летять у void, спочатку перевір білд, а не Config. interval і payout не піднімуть бортик.

| Симптом | Де шукати |
|---------|-----------|
| Усі Drop у void | Mouth, Walls, Floor з 7.1 |
| Parts застрягли в корпусі | Mouth випханий назовні? |
| Нічого не доходить до Collector | Відстань / пандус / Velocity |
| Лавина Parts | maxAlive / lifetime |
| Цикл мовчить | running, Output, WaitForChild Mouth |

Опційно додай легкий AssemblyLinearVelocity у бік Collector, але не витрачай годину на ідеальну балістику. Для здачі достатньо стабільного ритму і більшості Parts на шляху зони.

Гравітація + бортики часто простіші за Tween. Tween корисний, коли потрібен ідеально прямий жолоб без фізики. Не витрачай урок на складну балістику з трьома Vector3: спочатку добейся, щоб більшість Drop опинялась біля Collector.

Якщо Mouth дивиться в стіну Dropper, Parts народжуються всередині корпусу й вибухають назовні хаотично. Витягни Mouth на 1-2 studs уперед і повтори тест. Часто цього досить, щоб траєкторія стала передбачуваною.

Образ для дебагу: якщо конвеєр сипле мимо ящика, крути ящик і жолоб, а не швидкість мотора.

**Зроби зараз (4 хв):** стій 20 с біля Collector і полічи, скільки Drop доходять близько до зони.`,
      },
      {
        title: "startDropper(plot) на майбутнє 7.5",
        content: `Навіть з одним plot пиши код так, ніби ділянок буде кілька. Глобальний while на весь Workspace ускладнить клон.

Функція startDropper приймає plot, знаходить його Mouth і Drops, створює локальний прапор running та запускає окрему задачу. На кожній ітерації вона викликає spawnDrop, trimDrops і task.wait з актуальним interval. Повернений stop-колбек змінює лише локальний running.

Повернений stop-колбек знадобиться, коли plot зникне або гравець вийде. Імена з 7.1 тут критичні: шлях plot/Dropper/Mouth і дочірній Drops мають існувати. Якщо шлях інший - виправ імена зараз, а не маскуй їх довгим пошуком по Workspace.

| Звичка сьогодні | Виграш у 7.5 |
|-----------------|--------------|
| startDropper(plot) | Клон отримує власний мотор |
| Локальний running | Зупинка однієї ділянки |
| Імена Mouth/Drops | Немає FindFirstChild навмання |
| Config ззовні | Усі plot читають той самий каталог |

Не зберігай running у глобальній змінній модуля, якщо плануєш кілька plot. Інакше вимкнення однієї ділянки зупинить усі. Локальний прапор у замиканні startDropper захищає від цієї пастки ще до появи клонів.

Метафора: функція plot - як розетка на кожну ділянку, а не один кабель на весь цех.

**Зроби зараз (5 хв):** винеси цикл у startDropper(plot) і перевір, що Stop через прапор працює.`,
      },
      {
        title: "Playtest дропера",
        content: `Заповни таблицю до зміни десятків налаштувань.

| # | Дія | Очікування | Факт |
|---|-----|------------|------|
| 1 | Play | Через interval з'являється Drop | |
| 2 | 30 с очікування | Дітей у Drops <= maxAlive | |
| 3 | interval 2 -> 0.8 | Темп прискорюється | |
| 4 | Новий Drop | Attribute Payout = Config | |
| 5 | Шлях | Більшість Parts не у void | |
| 6 | running = false | Нові Drop припиняються | |
| 7 | Output | Без червоного spam | |

Якщо пункт 5 червоний - повертайся до 7.1. Якщо пункт 2 червоний - спочатку anti-lag, потім баланс чисел.

Не залишай interval=0.05 у фінальному Save. Поверни спокійний навчальний темп і запиши його в нотатку поруч із Place.

Метафора: playtest - секундомір біля конвеєра, а не враження з коридору.

**Зроби зараз (6 хв):** пройди рядки 1-4 і постав факти в таблицю.`,
      },
      {
        title: "Підготовка каси 7.3",
        content: `Завтра Collector торкнеться Drop і має знати суму. Сьогодні ти лише гарантуєш дані.

| Сьогодні | Завтра в 7.3 |
|----------|--------------|
| Attribute Payout на Drop | Прочитати й додати до Coins |
| Серверний spawn | Серверний Touched collector |
| Один Config.payout | Апгрейди змінять payout |
| Drops folder | Легко знайти живі Parts |
| Без LocalScript Coins | Та сама дисципліна з Sim |

Не нараховуй Coins у spawnDrop "для перевірки". Це змішає відповідальність і зіпсує урок каси. Для дебагу достатньо одного print із Payout нового дропа, який потім треба прибрати.

Зв'язок із Simulator лишається архітектурним: сервер володіє цінністю, Config тримає числа, клієнт пізніше лише покаже HUD.

Образ: сьогодні на коробках уже є цінники, завтра відкриється каса.

**Зроби зараз (3 хв):** збери 5 Drop і перевір Attribute Payout у Properties у кожного.`,
      },
      {
        title: "Чекліст здачі уроку 50",
        content: `- [ ] DropperConfig з interval, payout, maxAlive
- [ ] Серверний while/for з task.wait(Config.interval) на кожній ітерації
- [ ] spawnDrop з Mouth у Folder Drops
- [ ] Attribute Payout і SpawnedAt на Drop
- [ ] lifetime або trim за SpawnedAt, не перший елемент GetChildren
- [ ] Зміна interval у Play змінює темп
- [ ] 30 с без затоплення Workspace
- [ ] Save: Lesson 7.2 - Dropper Config

Далі **7.3** навчить Collector класти payout у leaderstats. Якщо сьогодні Parts не доходять до зони або Config розкиданий по Scripts - каса отримає хаос замість ритму.

Артефакт: живий конвеєр з пультом чисел. Plot більше не німий.

**Зроби зараз (3 хв):** поверни навчальний interval, прожени 20 с і збережи Place під точною назвою.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Цикл while true запускають без обов'язкового task.wait.",
      explanation: "Серверний Script зависає або лагає, а Parts з'являються пачкою без контролю.",
      correctApproach: "Завжди чекай DropperConfig.interval усередині циклу.",
    },
    {
      mistake: "Значення interval зчитують лише один раз перед запуском while.",
      explanation: "Зміна Config або майбутній апгрейд не змінює темп до рестарту Script.",
      correctApproach: "Викликай task.wait(DropperConfig.interval) на кожній ітерації.",
    },
    {
      mistake: "Перший елемент GetChildren видаляють без порівняння Attribute SpawnedAt.",
      explanation: "Порядок дітей не гарантує FIFO, тож можна видалити свіжий Drop і залишити старі.",
      correctApproach: "Порівнюй Attribute SpawnedAt або використовуй lifetime Destroy.",
    },
    {
      mistake: "Числа interval і payout дублюють як літерали в кількох Scripts.",
      explanation: "Баланс і апгрейди стають лотереєю, бо змінюєш одне місце й забуваєш інше.",
      correctApproach: "Тримай усі робочі числа в одному DropperConfig.",
    },
    {
      mistake: "Основний цикл дропера запускають лише в LocalScript.",
      explanation: "Інші клієнти не бачать спільної правди фабрики, а економіка стає вразливою.",
      correctApproach: "Запускай дропер на сервері від конкретного plot.",
    },
    {
      mistake: "Дропер запускають без обмеження maxAlive та запасного lifetime.",
      explanation: "За хвилину Workspace повниться Parts, FPS падає, playtest стає неможливим.",
      correctApproach: "Обмеж живі Drop і видаляй застарілі після spawn.",
    },
  ],
  summary: "Ти оживив Tycoon-дропер серверним циклом і DropperConfig: Parts падають з Mouth за interval, несуть Payout і не затоплюють карту. Конвеєр готовий віддати цінність collector у 7.3.",
  practiceTask: {
    title: "Конвеєр дропера (~30 хв)",
    difficulty: "intermediate",
    description: `### Part A - Config (6 хв)
1. Створи DropperConfig з interval, payout, maxAlive, lifetime.
2. Підключи його з серверного Script одного require або table.

### Part B - Цикл і spawn (16 хв)
1. Напиши startDropper(plot) з while running і task.spawn.
2. spawnDrop ставить Part у Mouth, Attribute Payout і SpawnedAt, Parent = Drops.
3. Додай lifetime або trim за SpawnedAt.
4. Читай Config.interval на кожній ітерації.

### Part C - Тест (8 хв)
1. Зміни interval у Play і покажи новий темп.
2. Прожени 30 с без затоплення Drops.
3. Збережи Place як **Lesson 7.2 - Dropper Config**.`,
    hints: [
      "Спочатку хардкод wait(2), потім заміни на Config.interval.",
      "print(\"drop\", os.clock()) допомагає побачити ритм.",
      "Якщо Parts у void - повертайся до бортиків і Mouth з 7.1.",
      "Не лишай interval=0.05 у фінальному Save.",
    ],
    optionalChallenge: "Зроби колір Drop трохи яскравішим при вищому payout, але значення все одно бери лише з Config.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Який головний артефакт уроку 7.2?",
        options: [
          "Повний магазин покупок без дропера",
          "Серверний цикл дропера з DropperConfig і anti-lag",
          "Лише новий колір Floor",
          "LocalScript, що сам пише Coins",
        ],
        correctAnswer: 1,
        explanation: "Урок оживляє конвеєр Config і while на сервері.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де має крутитись while дропера?",
        options: [
          "На сервері від конкретного plot",
          "Лише в LocalScript як єдина правда",
          "У TextLabel Collector",
          "У Sign без Script",
        ],
        correctAnswer: 0,
        explanation: "Фабрика належить серверу.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо DropperConfig.interval?",
        options: [
          "Щоб замінити Mouth",
          "Щоб вимкнути Collector",
          "Щоб керувати паузою між дропами з одного місця",
          "Щоб створювати leaderstats",
        ],
        correctAnswer: 2,
        explanation: "Interval задає ритм конвеєра.",
      },
      {
        id: "q4",
        type: MC,
        question: "Як правильно чекати між дропами, якщо потрібні апгрейди темпу?",
        options: [
          "Зберегти interval у local один раз до while",
          "Прибрати wait повністю",
          "Чекати випадкове число без Config",
          "Викликати task.wait(DropperConfig.interval) на кожній ітерації",
        ],
        correctAnswer: 3,
        explanation: "Нове значення підхоплюється наступною паузою.",
      },
      {
        id: "q5",
        type: MC,
        question: "Чому небезпечно одразу видаляти перший елемент після GetChildren()?",
        options: [
          "Бо порядок дітей не гарантує, що перший елемент найстаріший",
          "Бо Destroy заборонений для Part",
          "Бо Folder Drops не може мати дітей",
          "Бо Config тоді видаляється",
        ],
        correctAnswer: 0,
        explanation: "Потрібен SpawnedAt або lifetime, а не сліпий індекс.",
      },
      {
        id: "q6",
        type: MC,
        question: "Навіщо Attribute Payout на Drop уже в 7.2?",
        options: [
          "Щоб замінити Floor",
          "Щоб Collector у 7.3 знав, скільки додати до Coins",
          "Щоб вимкнути гравітацію",
          "Щоб LocalScript міг змінювати Config",
        ],
        correctAnswer: 1,
        explanation: "Payout готує серверну касу наступного уроку.",
      },
      {
        id: "q7",
        type: MC,
        question: "Навіщо task.spawn навколо while?",
        options: [
          "Щоб видалити DropperConfig",
          "Щоб Parts стали Anchored",
          "Щоб нескінченний цикл не блокував решту Script",
          "Щоб Collector сам спавнив Drop",
        ],
        correctAnswer: 2,
        explanation: "Мотор працює паралельно зі стартовою логікою.",
      },
      {
        id: "q8",
        type: MC,
        question: "Що робити, якщо Drop падають у void?",
        options: [
          "Спочатку перевірити Mouth, Floor і Walls з 7.1",
          "Одразу збільшити payout у сто разів",
          "Перенести цикл у LocalScript",
          "Видалити maxAlive",
        ],
        correctAnswer: 0,
        explanation: "Геометрія часто важливіша за числа Config.",
      },
      {
        id: "q9",
        type: MC,
        question: "Навіщо maxAlive або lifetime?",
        options: [
          "Щоб автоматично будувати другий plot",
          "Щоб не затопити Workspace і не вбити FPS",
          "Щоб замінити імена Mouth",
          "Щоб Sign сам писав Config",
        ],
        correctAnswer: 1,
        explanation: "Anti-lag тримає playtest живим.",
      },
      {
        id: "q10",
        type: MC,
        question: "Як безпечно зупинити дропер?",
        options: [
          "Видалити весь Workspace",
          "Поставити while true швидше",
          "Вимкнути лише Baseplate",
          "Поставити running = false і вийти з while",
        ],
        correctAnswer: 3,
        explanation: "Прапор зупинки завершує цикл контрольовано.",
      },
      {
        id: "q11",
        type: MC,
        question: "Чому startDropper(plot) кращий за глобальний пошук Parts?",
        options: [
          "Бо тоді легше клонувати ділянку й дати їй власний мотор у 7.5",
          "Бо Roblox забороняє імена Dropper",
          "Бо Config працює лише всередині Model без функції",
          "Бо Mouth не може мати CFrame",
        ],
        correctAnswer: 0,
        explanation: "Локальні посилання plot масштабуються на кількох гравців.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що перевірити після зміни interval у Play?",
        options: [
          "Чи змінився колір Sky",
          "Чи Sign видалив себе",
          "Чи темп нових Drop змінився на наступних ітераціях",
          "Чи Floor став Unanchored",
        ],
        correctAnswer: 2,
        explanation: "Доказ живого Config - видимий новий ритм.",
      },
      {
        id: "q13",
        type: MC,
        question: "Чого не робити в spawnDrop сьогодні?",
        options: [
          "Ставити Attribute Payout",
          "Батькувати Drop у Folder Drops",
          "Нараховувати Coins напряму «для перевірки»",
          "Читати DropperConfig.payout",
        ],
        correctAnswer: 2,
        explanation: "Каса з'явиться в 7.3; сьогодні готуємо дані, не економіку.",
      },
      {
        id: "q14",
        type: MC,
        question: "Який мінімальний набір полів Config потрібен для здачі?",
        options: [
          "Лише Color3 Floor",
          "interval і payout, бажано також maxAlive або lifetime",
          "50 обов'язкових полів магазину",
          "Порожня table без чисел",
        ],
        correctAnswer: 1,
        explanation: "Ритм, цінність і захист від лавини - база уроку.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save для уроку 50?",
        options: [
          "Lesson 7.1 - Tycoon Plot",
          "Lesson 7.3 - Collector Coins",
          "Dropper Draft Final",
          "Lesson 7.2 - Dropper Config",
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Save Lesson 7.2 - Dropper Config.",
      },
    ],
  },
};
