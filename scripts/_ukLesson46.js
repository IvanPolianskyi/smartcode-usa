export const ukLesson46 = {
  lessonId: "lesson-roblox-6-8",
  moduleId: "module-06",
  order: 8,
  title: "6.8 - Цілі дня з table",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Описати 1-2 цілі дня в DailyGoals table з need, text і reward",
    "Вести activeId, progress і completed на сервері від реального giveCoins",
    "Показати GoalHUD з текстом і лічильником X / N з однієї правди",
    "Виконати completeGoal один раз без повторної нагороди",
    "Підготувати вимірювану ціль для TTG1 у 6.9 і демо Ship у 6.10",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 46 з 92)",
        content: `У 6.7 ти навчився зберігати прогрес Simulator між сесіями. Сьогодні збір отримує напрям: гравець бачить конкретну ціль дня і розуміє, навіщо бігати між collectables. Без цього 6.9 не матиме TTG1, а Ship у 6.10 виглядатиме як безцільний збір.

Артефакт уроку:
1. \`DailyGoals\` table з мінімум однією активною ціллю (id, need, text, reward).
2. Серверний \`questState\` на гравця: activeId, progress, completed.
3. Підключення progress до успішного giveCoins, не до локального touch.
4. GoalHUD: текст цілі + \`X / N\`.
5. \`completeGoal\` з одноразовою нагородою і Save **Lesson 6.8 - Daily Goals**.

| Було в 6.7 | Стає в 6.8 |
|------------|------------|
| Coins між сесіями | Навіщо збирати саме зараз |
| giveCoins як каса | Джерело progress цілі |
| HUD рахунку | Окремий GoalHUD місії |
| DataStore payload | Місце для activeId / completed пізніше |

Метафора: монети - це кроки, а ціль дня - стрілка на карті.

**Зроби зараз (3 хв):** запиши одну ціль словами, наприклад «Збери 50 Coins», і окремо її нагороду.`,
      },
      {
        title: "Чому цілі живуть у table",
        content: `Один \`if progress >= 50\` у Script швидко стає хаосом: текст UI, need і reward роз'їжджаються. Table тримає меню місій в одному місці.

\`local DailyGoals = {\`
\`  coins50 = { need = 50, rewardCoins = 20, rewardPower = 0, text = "Збери 50 монет" },\`
\`  coins100 = { need = 100, rewardCoins = 0, rewardPower = 1, text = "Збери 100 монет" },\`
\`}\`

| Підхід | Плюс | Мінус |
|--------|------|-------|
| Хардкод if | Швидко для однієї цілі | Нова місія = новий код |
| DailyGoals table | need/text/reward разом | Треба читати за id |
| Лише UI-текст | Гарно виглядає | Сервер не знає порогу |

Для здачі достатньо однієї активної цілі. Другий рядок у table можна лишити «на завтра» або для optionalChallenge.

Образ: table - розклад місій на день, а не випадковий стікер на екрані.

**Зроби зараз (4 хв):** створи ModuleScript або блок DailyGoals з двома записами й обери activeId = "coins50".`,
      },
      {
        title: "questState належить серверу",
        content: `Прогрес цілі - цінність, як Coins. Клієнт може показувати числа, але не вирішувати, що місія вже виконана.

\`questState[player] = {\`
\`  activeId = "coins50",\`
\`  progress = 0,\`
\`  completed = {},\`
\`}\`

Альтернатива - Folder Values на Player. Головне: запис іде з серверного Script після перевірки.

| Поле | Роль |
|------|------|
| activeId | Яка ціль зараз відкрита |
| progress | Поточне число в одиницях схеми |
| completed[id] | Чи вже видано нагороду за id |

Створи стан у PlayerAdded. Прибери його в PlayerRemoving, щоб таблиця не росла вічно в Studio-тестах.

Метафора: questState - журнал виконання, а GoalHUD - лише його вітрина.

**Зроби зараз (5 хв):** ініціалізуй questState для тестового гравця і \`print\` activeId з progress при Join.`,
      },
      {
        title: "Одна схема progress",
        content: `До підключення giveCoins обери мову чисел і не змішуй її.

| Схема | Як росте progress | Як читати need |
|-------|-------------------|----------------|
| A - сума Coins | \`progress += amount\` | need = скільки монет зібрати |
| B - штуки збору | \`progress += 1\` | need = скільки успішних зборів |

Обидві схеми валідні. Погано, коли UI каже «збери 50 монет», а код додає 1 за touch при need = 50 зі схемою штук без пояснення. Запиши схему в коментар біля DailyGoals.

Після успішного giveCoins:

\`local st = questState[player]\`
\`local goal = DailyGoals[st.activeId]\`
\`if goal and not st.completed[st.activeId] then\`
\`  st.progress += amount\`
\`  if st.progress >= goal.need then\`
\`    completeGoal(player, st.activeId)\`
\`  end\`
\`  pushGoalUI(player)\`
\`end\`

Використовуй \`>=\`, не лише \`>\`. Інакше точний need ніколи не спрацює на рівності.

**Зроби зараз (4 хв):** обери схему A або B і підпиши need так, щоб текст і число говорили одним сенсом.`,
      },
      {
        title: "completeGoal рівно один раз",
        content: `Complete - подія з нагородою. Без прапора completed кожен наступний giveCoins після порогу знову видасть reward і зруйнує баланс 6.9.

\`local function completeGoal(player, goalId)\`
\`  local st = questState[player]\`
\`  if st.completed[goalId] then return end\`
\`  local goal = DailyGoals[goalId]\`
\`  if not goal then return end\`
\`  st.completed[goalId] = true\`
\`  if goal.rewardCoins > 0 then giveCoins(player, goal.rewardCoins) end\`
\`  if goal.rewardPower > 0 then addPower(player, goal.rewardPower) end\`
\`end\`

Порядок важливий: спочатку \`completed[goalId] = true\`, потім нагорода. Якщо reward іде через giveCoins, цей виклик знову може зайти в progress. Варіанти захисту:
1. не додавати rewardCoins до progress активної цілі;
2. тимчасовий прапор \`st.locking = true\` навколо reward.

| Крок | Дія |
|------|-----|
| 1 | Перевірити completed |
| 2 | Позначити completed |
| 3 | Видати reward |
| 4 | Оновити UI / FireClient |

Метафора: complete - це печатка в журналі, а не кнопка, яку можна жати щосекунди.

**Зроби зараз (6 хв):** постав тимчасовий need = 5, доведи один complete і відсутність другої нагороди.`,
      },
      {
        title: "GoalHUD читає серверну правду",
        content: `StarterGui \`GoalHud\` з двома TextLabel достатньо: GoalText і GoalProgress. Не обов'язково малювати бар.

Два робочі канали:
1. RemoteEvent: сервер шле \`{ text, progress, need, done }\`.
2. Values на Player: IntValue Progress / Need + StringValue Text, LocalScript слухає Changed.

Текст бери з \`DailyGoals[id].text\`. Не вшивай «Збери 50» у UI, якщо Config.need уже 80 - інакше гравець і сервер живуть у різних світах.

| Стан | Що бачить гравець |
|------|-------------------|
| Старт | Текст цілі + 0 / need |
| Збір | X / N росте |
| Complete | «Виконано!» або наступна ціль |
| Після порогу | Без повторного reward-спаму |

Перед підпискою виклич перший render одразу після Join, інакше екран порожній до першого збору.

Образ: GoalHUD - табло матчу, яке повторює рахунок судді, а не вигадує свій.

**Зроби зараз (8 хв):** зроби рядок \`0 / need\` і перевір ріст після двох успішних зборів.`,
      },
      {
        title: "Ланцюг цілей або одна місія",
        content: `Для Ship достатньо однієї цілі на демо. Якщо хочеш ланцюг, тримай порядок окремо від словника:

\`local GoalOrder = { "coins50", "coins100" }\`

Після complete:
\`local nextId = GoalOrder[index + 1]\`
\`if nextId and DailyGoals[nextId] then\`
\`  st.activeId = nextId\`
\`  st.progress = 0\`
\`end\`

Завжди перевіряй наявність id у DailyGoals. Фейковий наступний ключ дає мовчазний nil і «мертвий» UI.

| Варіант | Коли обрати |
|---------|-------------|
| Одна ціль | Швидка здача і чистий TTG1 |
| Дві цілі з перемиканням | optionalChallenge |
| Багато гілок | Пізніше, не сьогодні |

Не роби дерево з десяти місій, поки одна не проходить playtest.

Метафора: краще один чистий фінішний прапор, ніж лабіринт стрілок без фінішу.

**Зроби зараз (5 хв):** або закрий одну ціль end-to-end, або додай другу з явним перемиканням.`,
      },
      {
        title: "Зв'язок із Power, giveCoins і DataStore",
        content: `Цілі не замінюють економіку - вони її використовують.

| Система | Роль для цілей |
|---------|----------------|
| giveCoins | Єдине джерело progress |
| Power | Більший amount швидше закриває схему A |
| Анти-дубль збору | Інакше progress бреше |
| DataStore 6.7 | Може зберігати activeId, progress, completed |
| CoinsHUD | Показує валюту, GoalHUD - місію |

Якщо save ще нестабільний, цілі можуть скидатися на rejoin. Для навчання це допустимо, але познач у нотатці. У сесії complete все одно має працювати чесно.

Не зберігай лише рядок UI. Зберігай id і числа. Текст завжди можна взяти з DailyGoals після load.

**Зроби зараз (3 хв):** перевір, що відхилений повторний touch не рухає progress.`,
      },
      {
        title: "Онбординг і видимість",
        content: `Біля Spawn постав коротку табличку: «Дивись ціль зверху. Збирай монети, доки лічильник не дійде до N». Якщо GoalHUD перекритий іншим Gui або стоїть за екраном на малому вікні Studio, гравець не зрозуміє місію навіть при ідеальному коді.

| Перевірка | Очікування |
|-----------|------------|
| Join | Ціль видно без TAB |
| Збір | X / N змінюється |
| Complete | Короткий сигнал «Виконано!» |
| Телефон / вузьке вікно | Текст не обрізаний повністю |

Дешевий polish: на секунду змінити колір тексту на зелений після complete. Це не замінює нагороду, але робить подію помітною до VFX з 6.9.

Образ: онбординг - табличка на вході в парк атракціонів, а не інструкція на 20 рядків.

**Зроби зараз (3 хв):** відійди від монітора на крок і перевір, чи ціль читається з Spawn за 5 секунд.`,
      },
      {
        title: "Playtest-таблиця цілей",
        content: `Заповни факти до зміни десятків need.

| # | Дія | Очікування | Факт |
|---|-----|------------|------|
| 1 | Join | Текст + 0 / need | |
| 2 | Один збір | progress + за схемою | |
| 3 | Досягти need | complete один раз | |
| 4 | Ще збір | без повторного reward | |
| 5 | UI | text і need з DailyGoals | |
| 6 | need = 5 тест | швидкий complete | |
| 7 | Повернути need | значення для 6.9 | |
| 8 | Output | без червоних помилок | |

Пункти 3-4 критичні. Якщо вони червоні, не йди міряти TTG1 у 6.9: ти балансуватимеш зламану нагороду.

Метафора: таблиця - секундомір перед стартом забігу, а не спогад після фінішу.

**Зроби зараз (6 хв):** пройди рядки 1-4 і постав статуси.`,
      },
      {
        title: "Підготовка до 6.9 і чекліст здачі",
        content: `| Сьогодні | У 6.9 | У 6.10 |
|----------|-------|--------|
| need у table | TTG1 до complete | Рубрика «ціль рухається» |
| одноразовий reward | Баланс не вибухає | Чесне демо |
| GoalHUD X / N | Видно прогрес під час заміру | Гравець розуміє напрям |

Не став need = 10000 «на серйозно» до балансу. Для здачі можна тимчасово need = 5, показати complete, потім повернути реалістичне значення під 1-3 хвилини гри.

Чекліст:
- [ ] DailyGoals з need, text, reward
- [ ] questState на сервері
- [ ] progress тільки від успішного giveCoins
- [ ] одна схема A або B
- [ ] complete при progress >= need
- [ ] completed блокує повтор
- [ ] GoalHUD text + X / N
- [ ] Playtest 1-4 зелені
- [ ] Save: Lesson 6.8 - Daily Goals

Артефакт: місія дня як дані. Збір більше не безцільний.

Метафора: цей Save - компас перед заміром швидкості в 6.9.

**Зроби зараз (3 хв):** поверни need для гри, збережи Place під точною назвою.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "progress і completed ведуться лише в LocalScript",
      explanation: "Клієнт може підробити виконання і отримати нагороду без реального збору.",
      correctApproach: "Тримати questState на сервері й оновлювати його після giveCoins.",
    },
    {
      mistake: "Немає completed, тож reward сиплеться після кожного збору за порогом",
      explanation: "Економіка вибухає, а TTG1 і баланс у 6.9 стають брехнею.",
      correctApproach: "Ставити completed[id] = true до видачі нагороди і перевіряти прапор щоразу.",
    },
    {
      mistake: "UI показує старий текст при новому need у DailyGoals",
      explanation: "Гравець не розуміє, коли ціль завершується, і думає що сервер зламаний.",
      correctApproach: "Брати text і need з того самого запису DailyGoals.",
    },
    {
      mistake: "progress рахує штуки, а текст і need говорять про суму Coins",
      explanation: "Ціль завершується занадто рано або ніколи не доходить до порогу.",
      correctApproach: "Обрати одну схему A або B і узгодити UI з нею.",
    },
    {
      mistake: "rewardCoins через giveCoins знову качає progress тієї ж цілі",
      explanation: "Виникає миттєвий ланцюг complete або подвійна економіка.",
      correctApproach: "Не додавати reward до progress активної цілі або ставити locking на час нагороди.",
    },
    {
      mistake: "Ціль працює, але GoalHUD відсутній або сховано",
      explanation: "Гравець не бачить напряму, тож демо і TTG1 втрачають сенс.",
      correctApproach: "Показати видимий text + X / N одразу після Join.",
    },
  ],
  summary: "Ти зробив цілі дня з DailyGoals table: серверний progress від giveCoins, одноразовий complete і GoalHUD X / N. Simulator отримав напрям перед балансом і Ship.",
  practiceTask: {
    title: "Місія дня з table (~30 хв)",
    difficulty: "intermediate",
    description: `### Part A - Config і стан (8 хв)
1. Створи DailyGoals з 1-2 записами: need, text, rewardCoins або rewardPower.
2. Ініціалізуй questState[player] з activeId, progress, completed.
3. Обери схему progress A або B і запиши її в коментар.

### Part B - Complete і UI (14 хв)
1. Після успішного giveCoins оновлюй progress.
2. Якщо progress >= need і ще не completed - completeGoal один раз.
3. Зроби GoalHUD: text з Config + X / N.
4. Захисти reward від повторного прогресу тієї ж цілі.

### Part C - Тест (8 хв)
1. Тимчасово постав need = 5 і перевір одноразовий complete.
2. Поверни need під гру 1-3 хвилини.
3. Збережи Place як **Lesson 6.8 - Daily Goals**.`,
    hints: [
      "Спочатку print progress на кожен успішний збір.",
      "Став completed до виклику reward.",
      "Текст цілі бери лише з DailyGoals[id].text.",
      "Відхилений повторний touch не повинен рухати progress.",
    ],
    optionalChallenge: "Після complete автоматично активуй другу ціль із GoalOrder і скинь progress у 0.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Який головний артефакт уроку 6.8?",
        options: [
          "Видалити giveCoins і лишити лише UI",
          "DailyGoals table, серверний прогрес, GoalHUD і одноразовий complete",
          "Новий острів без цілей",
          "Лише ParticleEmitter на Spawn",
        ],
        correctAnswer: 1,
        explanation: "Урок додає місію дня як дані й серверну логіку.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де має жити progress цілі?",
        options: [
          "На сервері в questState гравця",
          "Лише в LocalScript як єдина правда",
          "У назві collectable",
          "У SoundService",
        ],
        correctAnswer: 0,
        explanation: "Прогрес і нагорода належать серверу.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо поле need у DailyGoals?",
        options: [
          "Щоб замінити CoinsHUD",
          "Щоб вимкнути Power",
          "Щоб задати поріг виконання з одного місця",
          "Щоб створювати Terrain",
        ],
        correctAnswer: 2,
        explanation: "need - поріг complete для обраної схеми.",
      },
      {
        id: "q4",
        type: MC,
        question: "Навіщо completed[id]?",
        options: [
          "Щоб збільшити розмір монети",
          "Щоб видалити Config після Join",
          "Щоб GoalHUD міг писати Coins",
          "Щоб не видавати нагороду цілі повторно",
        ],
        correctAnswer: 3,
        explanation: "Прапор блокує повторний reward після порогу.",
      },
      {
        id: "q5",
        type: MC,
        question: "Звідки GoalHUD має брати текст цілі?",
        options: [
          "З випадкового рядка щосекунди",
          "З DailyGoals[id].text",
          "З назви Baseplate",
          "Текст не потрібен, якщо є Coins",
        ],
        correctAnswer: 1,
        explanation: "UI читає дані з того самого table.",
      },
      {
        id: "q6",
        type: MC,
        question: "Коли викликати completeGoal?",
        options: [
          "На кожен локальний Touched",
          "Раз на хвилину незалежно від збору",
          "Коли progress >= need і ціль ще не completed",
          "Лише після Stop Play",
        ],
        correctAnswer: 2,
        explanation: "Complete прив'язаний до порогу і одноразовості.",
      },
      {
        id: "q7",
        type: MC,
        question: "Чому важлива одна схема progress?",
        options: [
          "Щоб need, текст і UI говорили однією мовою",
          "Бо Lua забороняє дві змінні",
          "Щоб вимкнути DataStore",
          "Щоб Mouth працював у Tycoon",
        ],
        correctAnswer: 0,
        explanation: "Змішані одиниці ламають момент complete.",
      },
      {
        id: "q8",
        type: MC,
        question: "Який ризик rewardCoins через giveCoins без захисту?",
        options: [
          "GoalHUD обов'язково зникне",
          "Reward може знову збільшити progress тієї ж цілі",
          "Power завжди стане 0",
          "Config неможливо require",
        ],
        correctAnswer: 1,
        explanation: "Потрібен lock або виключення reward із progress.",
      },
      {
        id: "q9",
        type: MC,
        question: "Як 6.8 готує 6.9?",
        options: [
          "6.9 видаляє всі цілі перед балансом",
          "Juice замінює questState",
          "TTG1 міряє час до complete цілі дня",
          "Баланс більше не потребує need",
        ],
        correctAnswer: 2,
        explanation: "Без робочої цілі немає метрики TTG1.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що має показати GoalProgress?",
        options: [
          "Лише ім'я гравця",
          "Список усіх Scripts",
          "Volume активного Sound",
          "Поточний progress і need у форматі X / N",
        ],
        correctAnswer: 3,
        explanation: "Гравець бачить відстань до complete.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що робити з невідомим goal id?",
        options: [
          "Перевірити наявність у DailyGoals і не виконувати complete",
          "Завжди видати велику пачку Coins",
          "Видалити leaderstats",
          "Перенести прогрес у LocalScript",
        ],
        correctAnswer: 0,
        explanation: "Валідація id захищає від nil і фейкових нагород.",
      },
      {
        id: "q12",
        type: MC,
        question: "Чому progress не можна оновлювати від відхиленого touch?",
        options: [
          "Бо тоді Config стає read-only",
          "Бо анти-дубль і каса мають визначати реальний успіх",
          "Бо GoalHUD не вміє числа",
          "Бо need тоді стає рядком",
        ],
        correctAnswer: 1,
        explanation: "Лише підтверджений giveCoins живить ціль.",
      },
      {
        id: "q13",
        type: MC,
        question: "Який мінімум достатній для здачі 6.8?",
        options: [
          "Обов'язково 20 різних цілей",
          "Лише порожня table без UI",
          "Одна робоча ціль з UI і одноразовим complete",
          "Ціль без need, лише з текстом",
        ],
        correctAnswer: 2,
        explanation: "Одна чесна місія дня важливіша за велике меню.",
      },
      {
        id: "q14",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 6.9 - Sim Balance Juice",
          "Lesson 6.8 - Daily Goals",
          "Lesson 6.10 - Sim Ship",
          "Goals Draft Final",
        ],
        correctAnswer: 1,
        explanation: "Чекліст вимагає Lesson 6.8 - Daily Goals.",
      },
      {
        id: "q15",
        type: MC,
        question: "Як цілі допомагають Ship у 6.10?",
        options: [
          "Ship забороняє GoalHUD",
          "Цілі замінюють collectables",
          "Без цілей giveCoins неможливий технічно",
          "Демо отримує напрям: збір → прогрес → complete",
        ],
        correctAnswer: 3,
        explanation: "Коротке демо потребує зрозумілої місії.",
      },
    ],
  },
};
