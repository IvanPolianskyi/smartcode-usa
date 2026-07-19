export const ukLesson45 = {
  lessonId: "lesson-roblox-6-7",
  moduleId: "module-06",
  order: 7,
  title: "6.7 - DataStore прогресу",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Створити версований DataStore і ключ на основі UserId",
    "Завантажити Coins і Power через pcall із перевіркою типів та дефолтами",
    "Зберегти серверний payload через UpdateAsync без довіри до клієнта",
    "Додати PlayerRemoving, BindToClose й помірний autosave із dirty-прапором",
    "Провести rejoin-тест і підготувати формат даних для цілей дня",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 45 з 92)",
        content: `У 6.6 ти додав Power і Attributes: під час однієї сесії гравець уже збирає Coins швидше. Сьогодні прогрес переживе вихід із гри. Ти збережеш серверні Coins і Power, потім доведеш результат через Stop - Play або rejoin.

Артефакт уроку:
1. Версований DataStore **SimProgress_v1** і ключ із UserId.
2. Load через pcall, перевірку payload і безпечні дефолти.
3. Save через UpdateAsync із серверних Coins та Power.
4. PlayerRemoving, BindToClose й autosave без запиту на кожен збір.
5. Таблиця rejoin-тесту та Save **Lesson 6.7 - Sim DataStore**.

У 6.8 payload зможе отримати activeId, progress і completed цілей дня. У 6.9 rejoin не повинен псувати заміри економіки, а в 6.10 стабільний restore стане пунктом Ship.

| Було в 6.6 | Стає в 6.7 |
|-------------|------------|
| Coins і Power живуть у сесії | Значення повертаються після rejoin |
| Сервер рахує нагороду | Сервер формує save payload |
| HUD показує поточні числа | HUD показує завантажені числа |
| Вихід обнуляє прогрес | DataStore зберігає стан |

Метафора: leaderstats - робочий стіл, DataStore - закрита шафа між змінами.

**Зроби зараз (3 хв):** запиши два поля для збереження та їхні дефолти: Coins = 0, Power = 1.`,
      },
      {
        title: "Що DataStore робить і чого не робить",
        content: `DataStoreService зберігає дані між серверами й сесіями. Він не є Folder в Explorer і не працює як локальний файл. Виклики можуть завершитися помилкою через мережу, ліміти або налаштування Studio, тому кожен запит обгортається в pcall.

| Система | Живе де | Скільки | Хто змінює |
|---------|---------|---------|-------------|
| leaderstats | Поточний сервер | До виходу | Сервер |
| DataStore | Roblox backend | Між візитами | Серверний Script |
| CoinsHUD | Клієнт | Поточний екран | Лише відображає |

Не викликай DataStoreService з LocalScript. Клієнт не повинен знати ключі, формувати остаточний payload або вирішувати, що зберегти.

Для тесту в Studio досвід треба опублікувати й увімкнути **Enable Studio Access to API Services** у Game Settings - Security. Використовуй окремий тестовий Place або store, щоб Studio не пошкодила живі дані.

Образ: DataStore схожий на віддалений сейф - сервер має ключ, але сейф іноді тимчасово недоступний.

**Зроби зараз (4 хв):** перевір Publish і Studio Access, потім запиши в нотатку, що тестуєш не production-store.`,
      },
      {
        title: "Версія store і стабільний ключ",
        content: `Створи DataStore один раз у серверному Script:

\`local DataStoreService = game:GetService("DataStoreService")\`
\`local ProgressStore = DataStoreService:GetDataStore("SimProgress_v1")\`

Ключ має бути стабільним і унікальним:
\`local key = "player_" .. player.UserId\`

| Варіант ключа | Оцінка | Причина |
|---------------|--------|---------|
| player_123456 | Добре | UserId не змінюється |
| DisplayName | Погано | Не унікальний і може змінитися |
| Один "global" | Небезпечно | Усі гравці ділять запис |
| Випадкове число | Непридатно | Наступний load не знайде save |

Суфікс **_v1** описує формат. Якщо пізніше структура зміниться несумісно, можна зробити v2 або міграцію. Не змінюй назву store між Save і Load, інакше отримаєш порожні дефолти, хоча старі дані існують.

Метафора: ім'я store - номер сховища, UserId - номер особистої комірки.

**Зроби зараз (3 хв):** створи ProgressStore й функцію, яка повертає ключ player_UserId.`,
      },
      {
        title: "Формат payload і перевірка даних",
        content: `Зберігай невелику table з числами, а не Instances чи весь Character:

\`local payload = { version = 1, coins = coins.Value, power = power.Value }\`

Після GetAsync дані можуть бути nil для нового гравця або мати старий формат. Перевір типи перед записом у Value.

| Поле | Дефолт | Перевірка |
|------|---------|-----------|
| version | 1 | number |
| coins | 0 | number, не менше 0 |
| power | 1 | number, не менше 1 |
| quest | пізніше | table |

Наприклад, \`local coins = type(data.coins) == "number" and math.max(0, data.coins) or 0\`. Така нормалізація захищає Script від nil, рядка замість числа або старого запису.

Не зберігай UI-текст. GoalHUD у 6.8 зможе відновити текст за goal id із Config. Дані мають описувати стан, а не зовнішній вигляд.

Метафора: payload - валіза на rejoin; бери потрібні числа, не пакуй цілий будинок.

**Зроби зараз (4 хв):** створи defaultData і функцію normalizeData для coins та power.`,
      },
      {
        title: "Load через pcall без втрати старого save",
        content: `GetAsync може впасти. Важливо розрізняти **нового гравця без запису** та **помилку завантаження**.

\`local ok, result = pcall(function() return ProgressStore:GetAsync(key) end)\`

| Результат | Дія |
|-----------|-----|
| ok=true, result=nil | Використати дефолти, дозволити save |
| ok=true, result=table | Нормалізувати, дозволити save |
| ok=false | Показати warn, дати тимчасові дефолти, **не перезаписувати store** |

Заведи \`sessionLoaded[player] = ok\`. Якщо load провалився, гравець може продовжити сесію з дефолтами, але save цієї сесії треба заблокувати. Інакше тимчасова мережева помилка перезапише справжні Coins нулем.

Після успішного load вистав leaderstats, а потім познач гравця ready. Так HUD не блимає від 0 до завантаженого числа.

Образ: якщо сейф не відкрився, не викидай його вміст і не клади всередину порожню коробку.

**Зроби зараз (7 хв):** напиши loadPlayer з трьома гілками таблиці й окремим sessionLoaded.`,
      },
      {
        title: "Save через UpdateAsync із серверної правди",
        content: `Save читає Coins і Power тільки із серверних Value. RemoteEvent може попросити збереження, але не передає довільні числа.

\`local ok, err = pcall(function()\`
\`  ProgressStore:UpdateAsync(key, function(oldData)\`
\`    return { version = 1, coins = coins.Value, power = power.Value }\`
\`  end)\`
\`end)\`

UpdateAsync краще підходить для безпечного оновлення, коли різні серверні спроби можуть торкнутися одного ключа. Callback не повинен yield і має повернути новий payload.

Перед викликом перевір:
1. sessionLoaded[player] == true;
2. leaderstats і потрібні Value існують;
3. save для цього гравця ще не виконується.

Прапор \`saving[player]\` захистить від одночасного autosave та PlayerRemoving. Після pcall зніми його навіть при помилці.

Метафора: сервер заповнює квитанцію зі своєї каси, а не переписує число з записки клієнта.

**Зроби зараз (7 хв):** напиши savePlayer, додай sessionLoaded і saving guards та один зрозумілий warn.`,
      },
      {
        title: "Dirty-прапор і помірний autosave",
        content: `Не викликай UpdateAsync на кожен giveCoins. DataStore має бюджети запитів, а часті записи створюють зайве навантаження. Для уроку достатньо autosave кожні 60-120 секунд.

| Подія | Дія |
|-------|-----|
| Coins або Power змінились | dirty[player] = true |
| Минув autosave interval | Save лише dirty і loaded |
| Save успішний | dirty[player] = false |
| Save провалився | dirty лишається true для наступної спроби |
| Немає змін | Не витрачати запит |

Цикл autosave працює на сервері й проходить Players:GetPlayers(). Не став interval 1 секунда для "надійності". Надійність дають кілька контрольних точок, а не спам API.

Якщо дані змінюються під час save, простий dirty-прапор може потребувати обережності: скинь dirty лише після успішного запису й зафіксуй payload, який відправлявся. Для навчального MVP достатньо не запускати паралельні saves.

Метафора: autosave - регулярне фото прогресу, не відео з кожного кадру.

**Зроби зараз (5 хв):** позначай dirty після успішного giveCoins і додай autosave interval 60 с.`,
      },
      {
        title: "PlayerRemoving і BindToClose",
        content: `Autosave не гарантує останні секунди сесії. Додай дві контрольні точки:

| Подія | Навіщо |
|-------|--------|
| Players.PlayerRemoving | Гравець залишає сервер |
| game:BindToClose | Сервер або Studio завершує роботу |

У PlayerRemoving виклич savePlayer, якщо sessionLoaded. У BindToClose пройди поточних гравців і збережи їх. Не роби нескінченне очікування: shutdown має обмежений час.

У Studio Stop може викликати PlayerRemoving і BindToClose близько один до одного. Прапор saving не дозволить двом записам бігти паралельно. Не очищай questState або sessionLoaded раніше, ніж завершилась спроба save.

BindToClose не замінює PlayerRemoving, а PlayerRemoving не замінює autosave. Разом вони закривають різні сценарії.

Метафора: autosave - плановий рейс, PlayerRemoving - останній автобус, BindToClose - евакуація будівлі.

**Зроби зараз (5 хв):** підключи обидві події та перевір у Output, що Stop не запускає безкінечний цикл save.`,
      },
      {
        title: "Сервер проти клієнта",
        content: `Правило курсу не змінюється: клієнт показує, сервер вирішує.

| Клієнт може | Сервер повинен |
|-------------|----------------|
| Показати "Saving..." | Вибрати payload |
| Попросити SaveNow | Ігнорувати числа з аргументів |
| Показати "Saved" після підтвердження | Викликати UpdateAsync |
| Спробувати надіслати 999999 | Взяти Coins із server leaderstats |

Небезпечний дизайн: \`SaveRemote.OnServerEvent(player, clientCoins)\` і запис clientCoins у store. Правильний дизайн: Remote може лише поставити запит, а savePlayer сам читає серверні Values.

Не показуй "Saved!" до успішного pcall. При помилці UI може показати "Save pending" або нічого; Output має містити короткий warn без приватних даних.

Образ: клієнт натискає кнопку дзвінка, але сейф відкриває тільки сервер.

**Зроби зараз (3 хв):** знайди всі RemoteEvent, пов'язані із save, і переконайся, що їхні числові payload не потрапляють у DataStore.`,
      },
      {
        title: "Rejoin-тест із доказами",
        content: `DataStore не зданий, доки немає повторного входу з відновленими числами. Запиши очікування до Play.

| # | Дія | Очікування | Факт |
|---|-----|-------------|------|
| 1 | Join нового тесту | Coins 0, Power 1 | |
| 2 | Отримати 25 Coins / Power 2 | Серверні Value змінені | |
| 3 | Дочекатися autosave або Leave | Save success | |
| 4 | Rejoin тим самим UserId | Coins 25, Power 2 | |
| 5 | Інший UserId | Власні дефолти | |
| 6 | Load fail | Гра жива, save заблокований | |
| 7 | Output | Зрозумілі warn без spam | |

Тестуй на опублікованому тестовому Place з дозволеним API Access. Stop - Play у Studio може бути достатнім для навчального доказу, якщо використовується той самий акаунт і store.

Не змінюй store name між прогоном 3 і 4. Якщо restore не спрацював, перевір ключ, назву store, sessionLoaded і Output.

Метафора: rejoin - контрольне відкриття сейфа, а не віра в зелений print після Save.

**Зроби зараз (8 хв):** виконай рядки 1-4 і впиши точні числа у факт.`,
      },
      {
        title: "Помилки API і зрозумілий Output",
        content: `pcall не робить запит успішним - він лише не дає помилці зламати Script. Після pcall завжди перевіряй ok.

| Симптом | Ймовірна причина | Наступний крок |
|---------|------------------|----------------|
| 403 у Studio | API Access вимкнений | Перевір Game Settings |
| Завжди дефолти | Інший store/key або load fail | Виведи key і короткий warn |
| Save success, restore старий | Паралельний запис / інша версія | Перевір UpdateAsync і store |
| Багато warnings | Autosave занадто частий | Збільш interval, dirty |
| Нулі після load fail | Дефолт перезаписав save | Блокуй save через sessionLoaded |

Не друкуй весь payload кожну секунду. Для дебагу достатньо UserId, типу операції й повідомлення помилки. Після виправлення прибери шумні print.

Образ: Output - журнал касира; короткий запис допомагає, сотня однакових рядків приховує проблему.

**Зроби зараз (4 хв):** змоделюй один контрольований fail або прочитай існуючий warn і запиши причину.`,
      },
      {
        title: "Формат для цілей дня",
        content: `У 6.8 до payload можна додати:

\`quest = { activeId = "coins50", progress = 0, completed = {} }\`

Сьогодні не треба реалізовувати DailyGoals. Потрібно лише не замкнути формат на двох окремих числах без можливості розширення.

| Поле сьогодні | Поле завтра |
|---------------|-------------|
| coins | quest.activeId |
| power | quest.progress |
| version | quest.completed |

При load старого v1 без quest використовуй дефолт quest. Не припускай, що кожен запис уже має нове поле. Це проста міграція: відсутнє поле отримує default, наявні Coins і Power зберігаються.

Не записуй таблицю Config цілей у save. Config однаковий для всіх; DataStore зберігає лише стан конкретного гравця.

Метафора: формат payload - полиця з вільним місцем для наступної коробки.

**Зроби зараз (3 хв):** додай коментар із майбутнім quest-полем і перевір, що normalizeData переживе його відсутність.`,
      },
      {
        title: "Чекліст здачі уроку 45",
        content: `Перед Save перевір:

- [ ] Store має назву SimProgress_v1.
- [ ] Ключ містить стабільний UserId.
- [ ] GetAsync і UpdateAsync обгорнуті в pcall.
- [ ] Payload містить version, coins і power.
- [ ] Дані нормалізуються перед leaderstats.
- [ ] Load fail не дозволяє перезаписати справжній save дефолтом.
- [ ] Save читає лише серверні Values.
- [ ] dirty + autosave не пишуть на кожен збір.
- [ ] PlayerRemoving і BindToClose підключені.
- [ ] Rejoin повернув точні тестові Coins і Power.
- [ ] Output чистий або має зрозумілий контрольований warn.
- [ ] Save: Lesson 6.7 - Sim DataStore.

У 6.8 ти додаси цілі дня як серверний стан; частину quest можна буде покласти в цей payload. Не розширюй систему зараз, поки базовий restore Coins і Power не зелений.

Метафора: фінальний Save Place фіксує не обіцянку, а перевірений маршрут даних туди й назад.

**Зроби зараз (3 хв):** покажи ментору числа до виходу й після rejoin, потім збережи Place під точною назвою.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "GetAsync або UpdateAsync викликається без pcall",
      explanation: "Тимчасова помилка API зупиняє серверний Script і лишає гравця без коректного стану.",
      correctApproach: "Обгорнути кожен DataStore-запит у pcall, перевірити ok і записати короткий warn.",
    },
    {
      mistake: "Після load fail дефолтні нулі одразу зберігаються",
      explanation: "Тимчасова мережева помилка може перезаписати справжній прогрес гравця порожнім payload.",
      correctApproach: "Заборонити save цієї сесії, якщо початковий load не завершився успішно.",
    },
    {
      mistake: "Save приймає Coins із RemoteEvent від клієнта",
      explanation: "Клієнт може надіслати довільне число й закріпити чіт у DataStore.",
      correctApproach: "Формувати payload тільки із серверних leaderstats та Attributes.",
    },
    {
      mistake: "UpdateAsync запускається після кожного giveCoins",
      explanation: "Запити витрачають бюджет DataStore, створюють навантаження й можуть частіше падати.",
      correctApproach: "Позначати dirty та зберігати через помірний autosave, PlayerRemoving і BindToClose.",
    },
    {
      mistake: "Усі гравці використовують один ключ або DisplayName",
      explanation: "Записи змішуються, а DisplayName не є стабільним унікальним ідентифікатором.",
      correctApproach: "Будувати ключ зі стабільного player.UserId.",
    },
    {
      mistake: "Autosave і PlayerRemoving одночасно пишуть той самий ключ",
      explanation: "Паралельні записи можуть конфліктувати або витратити зайві запити.",
      correctApproach: "Використати saving-прапор і UpdateAsync, не запускаючи другий save до завершення першого.",
    },
  ],
  summary: "Ти зібрав безпечний DataStore для Coins і Power: load/save через pcall, UpdateAsync, autosave та захист від перезапису після load fail. Rejoin тепер повертає серверний прогрес і готує payload до цілей дня.",
  practiceTask: {
    title: "Сейф прогресу Simulator (~30 хв)",
    difficulty: "intermediate",
    description: `### Part A - Store і load (10 хв)
1. Створи SimProgress_v1 та ключ player_UserId.
2. Напиши defaultData і normalizeData.
3. GetAsync через pcall; відрізни nil від load fail.
4. Вистав Coins і Power у server leaderstats.

### Part B - Save і контрольні точки (12 хв)
1. Сформуй payload із серверних Values.
2. UpdateAsync через pcall із sessionLoaded і saving guards.
3. Додай dirty, autosave 60-120 с, PlayerRemoving і BindToClose.
4. Не приймай числові save-дані від клієнта.

### Part C - Rejoin (8 хв)
1. Отримай 25 Coins і Power 2.
2. Leave/Stop, потім Rejoin/Play тим самим UserId.
3. Запиши відновлені числа й збережи Place як **Lesson 6.7 - Sim DataStore**.`,
    hints: [
      "Якщо load впав, не зберігай дефолти поверх невідомих старих даних.",
      "Перевір назву store і ключ в обох функціях.",
      "Не став autosave на кожну секунду або кожен collectable.",
      "Для Studio потрібні Publish і Enable Studio Access to API Services.",
    ],
    optionalChallenge: "Додай лічильник saveRevision у payload і показуй у Output, яка успішна версія відновилась після rejoin.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Який головний артефакт уроку 6.7?",
        options: [
          "HUD, який локально вигадує збережені Coins",
          "Новий острів без серверного стану",
          "DataStore load/save Coins і Power з успішним rejoin",
          "SetAsync після кожного touch",
        ],
        correctAnswer: 2,
        explanation: "Артефакт має довести відновлення серверного прогресу між сесіями.",
      },
      {
        id: "q2",
        type: MC,
        question: "Який ключ найкраще підходить для save гравця?",
        options: [
          "\"player_\" .. player.UserId",
          "Один ключ global для всіх",
          "DisplayName без UserId",
          "Нове випадкове число при кожному вході",
        ],
        correctAnswer: 0,
        explanation: "UserId стабільний і унікальний.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо pcall навколо GetAsync та UpdateAsync?",
        options: [
          "Щоб автоматично збільшити Coins",
          "Щоб обійти всі бюджети DataStore",
          "Щоб клієнт отримав доступ до store",
          "Щоб перехопити помилку API й не зламати Script",
        ],
        correctAnswer: 3,
        explanation: "DataStore-запити можуть завершуватися помилками.",
      },
      {
        id: "q4",
        type: MC,
        question: "Що робити, якщо початковий GetAsync повернув помилку?",
        options: [
          "Одразу зберегти дефолтні нулі",
          "Дати тимчасові дефолти, але заблокувати save цієї сесії",
          "Довірити save клієнту",
          "Видалити DataStore",
        ],
        correctAnswer: 1,
        explanation: "Так справжні дані не будуть перезаписані після тимчасового load fail.",
      },
      {
        id: "q5",
        type: MC,
        question: "Звідки savePlayer має брати Coins?",
        options: [
          "З аргументу FireServer",
          "З назви collectable",
          "З тексту CoinsHUD",
          "Із серверного leaderstats.Coins.Value",
        ],
        correctAnswer: 3,
        explanation: "Серверний стан є джерелом правди.",
      },
      {
        id: "q6",
        type: MC,
        question: "Навіщо суфікс _v1 у назві store?",
        options: [
          "Він автоматично створює Power",
          "Без нього UserId не працює",
          "Щоб позначити формат і підготувати майбутню міграцію",
          "Він замінює pcall",
        ],
        correctAnswer: 2,
        explanation: "Версія допомагає керувати змінами структури даних.",
      },
      {
        id: "q7",
        type: MC,
        question: "Чому не слід зберігати після кожного giveCoins?",
        options: [
          "Бо це витрачає бюджет запитів і створює навантаження",
          "Бо Coins перетворяться на рядок",
          "Бо UpdateAsync дозволений лише один раз",
          "Бо leaderstats тоді зникає",
        ],
        correctAnswer: 0,
        explanation: "Dirty й autosave дають надійність без API-спаму.",
      },
      {
        id: "q8",
        type: MC,
        question: "Коли dirty треба скинути в false?",
        options: [
          "До початку кожного save",
          "Одразу після зміни Coins",
          "Після успішного збереження відповідного payload",
          "Після будь-якої помилки API",
        ],
        correctAnswer: 2,
        explanation: "Після fail зміни ще потребують повторної спроби.",
      },
      {
        id: "q9",
        type: MC,
        question: "Навіщо saving[player]?",
        options: [
          "Щоб LocalScript міг змінити payload",
          "Щоб autosave і PlayerRemoving не писали один ключ паралельно",
          "Щоб вимкнути BindToClose",
          "Щоб замінити DataStore key",
        ],
        correctAnswer: 1,
        explanation: "Прапор не допускає конкурентних save однієї сесії.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що перевіряє головний rejoin-тест?",
        options: [
          "Чи зберігся колір HUD",
          "Чи LocalScript викликав RemoteEvent",
          "Чи змінився DisplayName",
          "Чи ті самі Coins і Power відновилися після повторного входу",
        ],
        correctAnswer: 3,
        explanation: "Відновлені серверні числа є доказом роботи DataStore.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що потрібно для DataStore-тесту в Studio?",
        options: [
          "Опублікувати досвід і ввімкнути Studio Access to API Services",
          "Перенести Script у StarterGui",
          "Видалити Baseplate",
          "Зберігати тільки з LocalScript",
        ],
        correctAnswer: 0,
        explanation: "Studio потребує доступу до API для такого тесту.",
      },
      {
        id: "q12",
        type: MC,
        question: "Яке твердження про UpdateAsync callback правильне?",
        options: [
          "Він має отримати числа від клієнта",
          "Він повертає нову table і не повинен yield",
          "Він може не повертати payload",
          "Він повинен чекати task.wait усередині",
        ],
        correctAnswer: 1,
        explanation: "Callback формує нове значення ключа синхронно.",
      },
      {
        id: "q13",
        type: MC,
        question: "Навіщо нормалізувати loaded data?",
        options: [
          "Щоб вимкнути версію store",
          "Щоб клієнт міг вибрати будь-який Power",
          "Щоб nil або неправильний тип не зламав leaderstats",
          "Щоб зберегти весь Character",
        ],
        correctAnswer: 2,
        explanation: "Перевірка типів дає безпечні числа й дефолти.",
      },
      {
        id: "q14",
        type: MC,
        question: "Що логічно додати в payload у 6.8?",
        options: [
          "activeId, progress і completed цілей",
          "Увесь Workspace",
          "Клієнтські паролі",
          "Копію DailyGoals Config для кожного гравця",
        ],
        correctAnswer: 0,
        explanation: "DataStore зберігає індивідуальний стан цілей, а не спільний Config.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save для уроку 45?",
        options: [
          "Lesson 6.8 - Daily Goals",
          "Simulator Save Final Copy",
          "Lesson 6.6 - Power Attributes",
          "Lesson 6.7 - Sim DataStore",
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Save Lesson 6.7 - Sim DataStore.",
      },
    ],
  },
};
