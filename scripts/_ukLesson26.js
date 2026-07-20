export const ukLesson26 = {
  lessonId: "lesson-roblox-4-6",
  moduleId: "module-04",
  order: 6,
  title: "4.6 - DataStore lite",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Підключити DataStoreService і отримати іменований store з префіксом курсу",
    "Зберегти й завантажити мінімальний table гравця через Set/Get з pcall",
    "Прив'язати load до PlayerAdded і save до PlayerRemoving (і/або кнопки Save)",
    "Пояснити ключ гравця, версію схеми даних і чесний Studio-тест без API Access",
    "Підготувати lite-сейв до вітрини 4.7 і checkpoint 4.8 без Tycoon-здачі",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 26 з 92)",
        content: `У **4.5** Config уже єдина правда балансу в Place. Сьогодні дані вчаться **переживати перезахід**: DataStore lite. Це не checkpoint «Tycoon працює» і не повний продакшн-банкінг. Це маленький, чесний ритуал save/load.

Lite означає: зберігаєш **мало** (монети, список id інвентаря, 1-2 прапори), завжди з \`pcall\`, з зрозумілим ключем і повідомленням Success/Fail у Output. Не міграції v12, не OrderedDataStore лідербордів на мільйон ключів.

Артефакт уроку:
1. Серверний Script \`SaveLite\` (або еквівалент імені).
2. \`DataStoreService:GetDataStore\` з іменем на кшталт \`SmartCode_M4_Lite_v1\`.
3. Table гравця: наприклад \`{ coins = 0, bag = {}, flags = {} }\`.
4. Load на вході, Save на виході (і тестова кнопка Save у Studio).
5. Доказ у Output: LOAD ok / SAVE ok (або Fail з причиною).
6. Save Place **Lesson 4.6 - DataStore Lite**.

| Старий слот | Тема prod-92 |
|-------------|--------------|
| Checkpoint: Tycoon працює | DataStore lite |
| QA ділянок фабрики | Save/load table гравця |
| Баланс економіки | Мінімальна схема даних |

Метафора: Config - рецепт на кухні. DataStore - контейнер їжі в холодильнику між візитами. Сьогодні вчишся класти й діставати контейнер, не будуєш ресторанну мережу.

**Зроби зараз (2 хв):** відкрий Place після 4.5, Save як Lesson 4.6 - DataStore Lite, створи Script \`SaveLite\` на сервері.`,
      },
      {
        title: "Навіщо сейв саме зараз",
        content: `Без сейву інвентар і монети з 4.2-4.5 живуть лише до Stop. Гравець купує - виходить - усе зникає. Для навчання tables це терпимо до 4.5; для відчуття «мій прогрес» - ні.

Що сейв дає модулю Tables:
- доказ, що table можна серіалізувати в хмару Roblox
- звичку тримати **компактну схему**, а не весь Workspace
- міст до вітрини 4.7 (owned після rejoin) і checkpoint 4.8

Що сейв НЕ замінює:
- серверну валідацію покупки (все одно перевіряй price)
- Config як правду каталогу
- геометрію світу (Parts не «сейвлять самі себе» через твій lite-store)

Правило обсягу: якщо не можеш назвати 3 поля схеми за 10 секунд - схема завелика для 4.6.

**Зроби зараз (3 хв):** запиши в Note три поля, які збережеш сьогодні (наприклад coins, bag, ownedShopItem).`,
      },
      {
        title: "DataStoreService: імена й ключі",
        content: `Базовий ритуал:

1. \`local DSS = game:GetService("DataStoreService")\`
2. \`local store = DSS:GetDataStore("SmartCode_M4_Lite_v1")\`
3. Ключ гравця: \`"u_" .. player.UserId\` або \`tostring(player.UserId)\`

Ім'я store - як назва шухляди. Ключ - ярлик теки конкретного гравця всередині шухляди.

| Елемент | Порада |
|---------|--------|
| Ім'я store | З префіксом курсу + версією \`v1\` |
| Ключ | Стабільний UserId, не DisplayName |
| Значення | Один table-профіль, не 50 окремих Set на поле |

Чому не DisplayName: нік змінюється; UserId ні. Чому версія в імені store: коли схема зламається несумісно, легше відкрити \`v2\`, ніж гадати посеред старих ключів.

Не створюй новий GetDataStore на кожен Save в циклі без потреби - тримай \`store\` у змінній Script.

**Зроби зараз (4 хв):** оголоси DSS, store з префіксом SmartCode і функцію \`keyFor(player)\`.`,
      },
      {
        title: "Схема даних: маленький table",
        content: `Приклад схеми lite:

\`local function defaultData()
  return {
    coins = 0,
    bag = {},
    flags = { starterPack = false },
    schema = 1,
  }
end\`

Пояснення полів:
- \`coins\` - число валюти
- \`bag\` - масив id (зв'язок з 4.3)
- \`flags\` - словник дрібних прапорів
- \`schema\` - номер форми даних (на майбутнє)

Що НЕ класти в lite сьогодні:
- посилання на Instance
- функції
- гігантські логи чату
- повні копії Config/каталогу (каталог і так у ModuleScript)

Якщо інвентар тримає записи цілком - спрощуй до id. Config/каталог залишаються джерелом name/price/power після load.

**Зроби зараз (4 хв):** напиши \`defaultData()\` і переконайся, що всі значення - числа, bool, рядки або tables з них.`,
      },
      {
        title: "pcall: Get і Set без героїчного крашу",
        content: `Мережа й API можуть впасти. Тому:

\`local ok, result = pcall(function()
  return store:GetAsync(key)
end)\`

- якщо \`ok == false\` - \`result\` містить помилку; не вір, що даних немає «просто так»
- якщо \`ok == true\` і \`result == nil\` - нового гравця / порожній ключ → дай defaultData
- якщо \`ok == true\` і є table - змерджи з default (нижче)

Save:

\`local ok, err = pcall(function()
  store:SetAsync(key, data)
end)\`

Завжди друкуй статус:
- \`[SaveLite] LOAD ok user=...\`
- \`[SaveLite] LOAD fail ...\`
- \`[SaveLite] SAVE ok ...\`

Без Output ти не відрізниш «сейв працює» від «я думаю, що працює».

UpdateAsync корисний пізніше для атомарності; на 4.6 достатньо GetAsync + SetAsync з розумінням ризику. Не обіцяй собі session-locking рівня AAA сьогодні.

**Зроби зараз (6 хв):** реалізуй \`loadPlayer(player)\` і \`savePlayer(player, data)\` з pcall і print статусу.`,
      },
      {
        title: "Merge з default і захист схеми",
        content: `Старі сейви можуть не мати нового поля. Після Get:

1. Візьми defaultData()
2. Якщо loaded - скопіюй відомі поля поверх
3. Якщо тип поля зламаний (coins стала рядком) - відкати до default цього поля
4. Залиш \`schema\` актуальним

Псевдологіка:
- немає bag → bag = {}
- coins не number → coins = 0
- зайві поля з хмари можеш ігнорувати

Це не повна міграція. Це **щит від nil**, щоб 4.7 не падав на \`pairs(nil)\`.

Не довіряй клієнту: навіть якщо Remote принесе «мій сейв», сервер load/save сам. Клієнт максимум просить «збережи зараз».

**Зроби зараз (4 хв):** після load прожени merge; навмисно перевір гравця без сейву (nil → default).`,
      },
      {
        title: "Коли load і коли save",
        content: `Типовий каркас:

| Подія | Дія |
|-------|-----|
| PlayerAdded | load → покласти дані в пам'ять сервера → застосувати до leaderstats/інвентаря |
| PlayerRemoving | зібрати актуальний table → save |
| BindToClose | save всіх, хто ще в грі (короткий захист у Studio/сервері) |
| Кнопка Save (Studio) | ручний save для тесту без виходу |

Пам'ять сервера: \`local profiles = {}\` → \`profiles[player] = data\`. Усі покупки змінюють \`profiles[player]\`, а не «випадковий локальний table».

На Stop у Studio PlayerRemoving інколи поводиться інакше, ніж у живому сервері - тому тестова кнопка Save дуже корисна на уроці.

Не сейв кожні 0.1 с у циклі. Rate limits реальні. Lite: на виході + рідкісна кнопка + опційно автосейв раз на N хвилин пізніше.

**Зроби зараз (5 хв):** підключи PlayerAdded/Removing і таблицю profiles; додай Part/Prompt «SaveNow» лише для тесту.`,
      },
      {
        title: "Studio API Access і чесний fallback",
        content: `У Studio DataStore працює лише якщо в Game Settings увімкнено **Enable Studio Access to API Services** (і місце опубліковане з правами).

Якщо API вимкнений:
- Get/Set у pcall впадуть
- ти все одно здаєш код ритуалу
- додай memory-fallback: \`profiles\` живуть до Stop, а в Output чесно пиши \`API fail → memory only\`

Чесність > вдаваний успіх. Викладач цінує pcall + повідомлення. Не мовчазний краш Script.

Для доказу на уроці достатньо одного з варіантів:
1. API увімкнено: load → зміна coins → save → Stop → Play → coins на місці
2. API вимкнено: показати fail-print + memory profile + код SetAsync готовий

Не витрачай годину на публікацію Place, якщо викладач прийняв memory-demo з повним кодом.

**Зроби зараз (3 хв):** перевір Game Settings; запиши в README стенду, який режим тесту використовуєш.`,
      },
      {
        title: "Застосувати дані до світу",
        content: `Load без ефекту в грі - половина роботи. Після успішного load:

1. Вистав leaderstats.Coins (або свій IntValue) з data.coins
2. Віднови bag: GUI/Output список id
3. Прапори: якщо starterPack - не видавай знову

Зворотний шлях перед save:
1. Зчитай актуальні coins з серверного стану (не з клієнтського GUI як правди)
2. Збери bag з profiles або з серверного інвентаря
3. SetAsync

Антипатерн: сейвити те, що клієнт надіслав у Remote без перевірки. Remote може сказати \`coins = 999999\`. Сервер зберігає лише свій profiles[player].

Зв'язок з Config: ціни й каталог НЕ в DataStore. У хмарі - прогрес гравця. У Config - правила світу.

**Зроби зараз (5 хв):** після load синхронізуй хоча б coins у світі; перед save зчитай coins назад у profiles.`,
      },
      {
        title: "Типові дірки lite-сейву",
        content: `| Дірка | Симптом | Фікс |
|-------|---------|------|
| Немає pcall | Script падає / мовчить | Обгорни Get/Set |
| Ключ = Name | Прогрес «зник» після зміни ніка | UserId |
| Сейв Instance | Помилка серіалізації | Лише примітиви/table |
| Сейв у LocalScript | Не працює / небезпечно | Лише сервер |
| Немає default | nil index у 4.7 | defaultData + merge |
| Сейв щокадру | Throttle / fail | Save на виході + кнопка |

Ще одна дірка: два Places з одним ім'ям store, але різними схемами без \`schema\`/\`v1\`. Тримай ім'я store унікальним для курсу.

**Зроби зараз (3 хв):** пройди таблицю дірок по своєму коду; виправ першу червону.`,
      },
      {
        title: "Що не входить у 4.6",
        content: `| Не тема | Куди |
|---------|------|
| Checkpoint «Tycoon працює» | Застарілий слот; не здаємо |
| Повна вітрина з циклом слотів | 4.7 |
| Session locking / беріжки | Пізніші модулі / продвинутий сейв |
| OrderedDataStore топів | Не lite |
| Збереження всього Workspace | Анти-патерн |

Монети й bag можуть бути тестовими. Не обов'язково ідеальний магазин. Обов'язковий - ритуал store/key/pcall/load/save/print.

Якщо тягнеш сюди дропер і баланс фабрики - зупинись. Поверни фокус на profiles table.

**Зроби зараз (2 хв):** прибери з демо все, що не допомагає показати save/load за 2 хвилини.`,
      },
      {
        title: "Міст до 4.7 і 4.8",
        content: `У **4.7** вітрина додасть покупки, які змінюють bag/flags. Твій SaveLite має бути готовим прийняти ці поля без переписування з нуля.

У **4.8** checkpoint попросить доказ DataStore (або чесний mock). Сьогоднішній Output-лог і схема - експонати стенду.

Чекліст готовності до босу:
- profiles[player] існує після load
- покупка (навіть тестова) змінює profiles, не «тінь»
- save бачить ті самі дані

**Зроби зараз (2 хв):** допиши в коментар SaveLite: «4.7 буде insert у profiles[player].bag».`,
      },
      {
        title: "Чекліст здачі 4.6",
        content: `- [ ] GetDataStore з префіксом курсу й версією
- [ ] Ключ на базі UserId
- [ ] defaultData з малим table
- [ ] load з pcall + merge + print
- [ ] save з pcall + print
- [ ] PlayerAdded / PlayerRemoving (і бажано SaveNow)
- [ ] Дані застосовуються до світу (хоча б coins)
- [ ] Немає сейву з LocalScript як правди
- [ ] Задокументований режим Studio API або memory-fallback
- [ ] Save Place: **Lesson 4.6 - DataStore Lite**

Lite не означає «абияк». Означає «мало полів, повний ритуал».

**Зроби зараз (3 хв):** прогони load→зміна→save→перевірка й фінальний Save Place.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Get/Set без pcall",
      solution: "Завжди обгортай виклики store й друкуй ok/fail.",
    },
    {
      mistake: "Ключ за DisplayName",
      solution: "Використовуй UserId у стабільному рядку ключа.",
    },
    {
      mistake: "Сейв у LocalScript або довіра до клієнтського table",
      solution: "profiles на сервері; клієнт лише просить зберегти.",
    },
    {
      mistake: "Немає defaultData / merge",
      solution: "nil і старі сейви зводь до відомої схеми.",
    },
    {
      mistake: "Здавати «Tycoon працює» замість save/load",
      solution: "Артефакт дня - DataStore lite з Output-доказами.",
    },
    {
      mistake: "Скласти в store весь Workspace або Config",
      solution: "Лише прогрес гравця; каталог лишається в ModuleScript.",
    },
  ],
  keyTakeaways: [
    "DataStore lite = мала схема + Get/Set + pcall + ключ UserId",
    "Load на вході, save на виході, тестова кнопка в Studio",
    "profiles на сервері - правда між хмарою і грою",
    "Config не сейвиться; сейвиться прогрес гравця",
    "Чесний API-fail з memory-fallback кращий за мовчазний краш",
    "Далі 4.7 навісить вітрину на ці ж profiles",
  ],
  summary: "Ти зібрав DataStore lite: іменований store, ключ UserId, default-схема, load/save з pcall і print, profiles на сервері. Старий checkpoint Tycoon відхилено - сейв готовий до вітрини 4.7.",
  practiceTask: {
    title: "DataStore Lite (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** прогрес гравця переживає перезахід (або чесний memory-demo).

### Part A - Каркас (8 хв)
1. Script SaveLite + GetDataStore з префіксом.
2. defaultData + keyFor(player).
3. Save Place: Lesson 4.6 - DataStore Lite.

### Part B - Load/Save (18 хв)
1. load з pcall, merge, print.
2. profiles + застосування coins.
3. save на PlayerRemoving + кнопка SaveNow.
4. Задокументуй API on/off.

### Part C - Доказ (9 хв)
1. Зміни дані → save → rejoin або покажи fail+memory.
2. Переконайся, що LocalScript не є правдою сейву.
3. Фінальний Save Place.`,
    hints: [
      "Спочатку print статусів, потім красивий GUI",
      "Сейв лише примітиви й table",
      "Не роздувай схему понад 3-5 полів",
    ],
    optionalChallenge: "Додай BindToClose з коротким save усіх profiles і лічильником успішних Set у Output.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Яка тема уроку 4.6 у prod-92?",
        options: [
          "Checkpoint: Tycoon працює",
          "Три біоми Obby",
          "DataStore lite",
          "Race finish line",
        ],
        correctAnswer: 2,
        explanation: "Curriculum: 4.6 - DataStore lite.",
      },
      {
        id: "q2",
        type: MC,
        question: "Навіщо pcall навколо GetAsync/SetAsync?",
        options: [
          "Щоб намалювати Skybox",
          "Щоб обробити помилку API/мережі без крашу",
          "Щоб створити Folder",
          "Щоб вимкнути Anchored",
        ],
        correctAnswer: 1,
        explanation: "Виклики store можуть fail.",
      },
      {
        id: "q3",
        type: MC,
        question: "Який ключ найстабільніший для гравця?",
        options: [
          "DisplayName",
          "Випадковий колір Part",
          "Team name",
          "UserId у рядку ключа",
        ],
        correctAnswer: 3,
        explanation: "Нік змінюється; UserId ні.",
      },
      {
        id: "q4",
        type: MC,
        question: "Що типово сейвити в lite-схемі?",
        options: [
          "Весь Workspace",
          "Малий table: coins, bag ids, прапори",
          "Усі ModuleScript курсу",
          "Лише Lighting",
        ],
        correctAnswer: 1,
        explanation: "Прогрес гравця, не світ і не Config.",
      },
      {
        id: "q5",
        type: MC,
        question: "Де має жити правда profiles?",
        options: [
          "На сервері",
          "Лише в LocalScript",
          "У назві SpawnLocation",
          "У чаті",
        ],
        correctAnswer: 0,
        explanation: "Сервер load/save і валідує.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що робити, якщо Get повернув nil?",
        options: [
          "Крашити Script",
          "Дати defaultData()",
          "Видалити гравця з гри",
          "Вимкнути DataStoreService",
        ],
        correctAnswer: 1,
        explanation: "Новий гравець або порожній ключ.",
      },
      {
        id: "q7",
        type: MC,
        question: "Коли типово викликати save?",
        options: [
          "Лише в RenderStepped кожен кадр",
          "На PlayerRemoving і тестовій кнопці",
          "Тільки на клієнті в MouseMove",
          "Ніколи, лише load",
        ],
        correctAnswer: 1,
        explanation: "Вихід + ручний тест у Studio.",
      },
      {
        id: "q8",
        type: MC,
        question: "Чому каталог цін не кладуть у DataStore?",
        options: [
          "Бо він належить Config/світу, а не особистому прогресу",
          "Бо table не підтримує числа",
          "Бо GetAsync заборонений",
          "Бо UserId не існує",
        ],
        correctAnswer: 0,
        explanation: "У хмарі - прогрес; у Config - правила.",
      },
      {
        id: "q9",
        type: MC,
        question: "Яка точна назва Save Place?",
        options: [
          "Lesson 4.5 - Player Plots",
          "Tycoon Works Checkpoint",
          "Lesson 4.6 - DataStore Lite",
          "Lesson 4.7 - Data Driven Showcase",
        ],
        correctAnswer: 2,
        explanation: "Чекліст 4.6.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що робити при вимкненому Studio API Access?",
        options: [
          "Мовчазно ігнорувати помилки",
          "Показати fail у Output і memory-fallback",
          "Перенести store у LocalScript",
          "Видалити pcall",
        ],
        correctAnswer: 1,
        explanation: "Чесний демо-режим прийнятний.",
      },
      {
        id: "q11",
        type: MC,
        question: "Навіщо поле schema у даних?",
        options: [
          "Щоб прискорити рендер",
          "Щоб знати версію форми table на майбутнє",
          "Щоб замінити UserId",
          "Щоб вимкнути GUI",
        ],
        correctAnswer: 1,
        explanation: "Допомагає не плутати старі сейви.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що НЕ є метою 4.6?",
        options: [
          "Навчити Get/Set з pcall",
          "Здати checkpoint «Tycoon працює» як головний артефакт",
          "Зібрати малу схему прогресу",
          "Підготувати profiles до 4.7",
        ],
        correctAnswer: 1,
        explanation: "Старий Tycoon-слот відхилено.",
      },
      {
        id: "q13",
        type: MC,
        question: "Чому погано сейвити кожен кадр?",
        options: [
          "Бо SetAsync має ліміти й це зайве навантаження",
          "Бо PlayerAdded тоді не існує",
          "Бо ipairs заборонений",
          "Бо Config зникає",
        ],
        correctAnswer: 0,
        explanation: "Rate limits і зайві виклики.",
      },
      {
        id: "q14",
        type: MC,
        question: "Який наступний урок після 4.6?",
        options: [
          "4.7 Бос: data-driven вітрина",
          "5.1 Three Biomes",
          "4.1 Масиви",
          "6.1 Simulator",
        ],
        correctAnswer: 0,
        explanation: "Далі вітрина на цих даних.",
      },
      {
        id: "q15",
        type: MC,
        question: "Що має друкувати хороший SaveLite?",
        options: [
          "Нічого, щоб не світитись",
          "Лише FPS",
          "Статуси LOAD/SAVE ok або fail з причиною",
          "Лише «hello»",
        ],
        correctAnswer: 2,
        explanation: "Output - доказ ритуалу.",
      },
    ],
  },
};
