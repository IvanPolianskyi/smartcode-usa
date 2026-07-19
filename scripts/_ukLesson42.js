export const ukLesson42 = {
  lessonId: "lesson-roblox-6-4",
  moduleId: "module-06",
  order: 4,
  title: "6.4 - Функції нагород + анти-дубль",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Написати серверну function giveCoins(player, amount) з валідацією",
    "Підключити збір монети до giveCoins, а не до прямого Coins.Value +=",
    "Зробити анти-дубль: Collected до нагороди і Destroy після успіху",
    "Повертати true/false з giveCoins і tryCollect для майбутнього Fx і цілей",
    "Підготувати єдину касу під спавн, Power і баланс наступних уроків",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 42 з 92)",
        content: `У 6.2-6.3 ти вже маєш Coins у leaderstats і HUD, що читає серверну правду. Сьогодні з'являється каса нагород: одна function giveCoins і захист від подвійного збору. Без цього 6.5-6.10 будують економіку на дірявому відрі.

Артефакт уроку:
1. \`giveCoins(player, amount)\` у серверному Script або ModuleScript.
2. Збір Part викликає giveCoins, а не прямий \`Coins.Value +=\`.
3. Анти-дубль: повторний Touched не дає другу нагороду.
4. Монета зникає через Destroy або блокується Attribute Collected.
5. return true/false і Save **Lesson 6.4 - GiveCoins**.

У 6.5 for наспавнить багато монет на цю касу. У 6.6 всередині giveCoins з'явиться Power. У 6.8-6.9 цілі й juice спрацьовуватимуть лише після успішного return true.

| Було в 6.2-6.3 | Стає в 6.4 |
|----------------|------------|
| leaderstats.Coins | Єдиний вхід нарахування |
| HUD читає Value | Сервер пише лише через giveCoins |
| TAB показує прогрес | Збір = один payout |

Метафора: giveCoins - каса банку; збір просить касу, а не лізе в сховище сам.

**Зроби зараз (3 хв):** поклади одну тестову монету (Anchored, CanTouch true) і виріши, як позначиш «вже зібрано»: Destroy, Collected або обидва.`,
      },
      {
        title: "Навіщо одна function giveCoins",
        content: `Якщо \`Coins.Value +=\` розмазаний по десяти місцях, завтра Power і цілі доведеться шукати з ліхтариком. Одна каса тримає валідацію, лог і майбутню формулу разом.

\`local function giveCoins(player, amount)\`
\`  if typeof(amount) ~= "number" or amount <= 0 then return false end\`
\`  local ls = player:FindFirstChild("leaderstats")\`
\`  local coins = ls and ls:FindFirstChild("Coins")\`
\`  if not coins then return false end\`
\`  coins.Value += amount\`
\`  return true\`
\`end\`

| Coins.Value += у 10 місцях | giveCoins |
|----------------------------|-----------|
| Легко забути перевірку | Один вхід з валідацією |
| Power завтра болить | Множник у одному тілі |
| Складно логувати | print у функції |
| Fx не знає успіх | return true/false |

FindFirstChild потрібен, бо гравець може торкнути монету раніше, ніж stats готові. return false без крашу - нормальна поведінка, не «баг гри».

У 6.6 формула стане \`final = amount * Power\`, але виклик лишиться giveCoins(player, amount). Сьогодні не ускладнюй: лише каса і перевірки.

Образ: каса - єдині двері в сховище; хто обходить двері, ламає інвентаризацію.

**Зроби зараз (5 хв):** напиши giveCoins і виклич giveCoins(player, 1) з тимчасового серверного тесту - TAB має зрости.`,
      },
      {
        title: "Never trust client на нагороді",
        content: `Клієнт може грати анімацію, звук і навіть сказати «я зібрав». Він не вирішує, скільки додати в Coins.

| Клієнт | Сервер |
|--------|--------|
| Анімація підбору | Розмір нагороди |
| «Я зібрав» через Remote | Чи монета ще існує |
| HUD читає Coins | Пише Coins лише giveCoins |
| Може брехати про amount | Бере amount з Attribute або константи |

LocalScript \`Coins.Value = 999\` - антиприклад, не здача. Типова пастка: RemoteEvent CollectCoin з аргументом amount від клієнта. Експлойтер шле FireServer(999999). Правильно: клієнт лише просить перевірити збір, сервер сам читає CoinValue з Part.

| Атака / помилка | Захист 6.4 |
|-----------------|------------|
| FireServer(999999) | amount з серверного Attribute |
| Подвійний Remote | Collected + Destroy |
| LocalScript Value= | Немає запису на клієнті |
| Touch «для краси» на клієнті | Touched на сервері |

У 6.4 достатньо серверного Touched. Remote для збору можна додати пізніше, але giveCoins лишається єдиним місцем, де Coins ростуть.

Метафора: клієнт дзвонить у дзвінок, касир сам відкриває сейф.

**Зроби зараз (3 хв):** знайди LocalScript, що пише leaderstats - якщо є, прибери або познач «не здача».`,
      },
      {
        title: "Touched: тонкий handler, товста каса",
        content: `Part генерує Touched, коли інший Part торкається його. Тобі потрібен гравець, не підлога і не випадковий Tool.

\`coin.Touched:Connect(function(hit)\`
\`  local player = Players:GetPlayerFromCharacter(hit.Parent)\`
\`  if not player then return end\`
\`  tryCollect(coin, player)\`
\`end)\`

Touched handler лишається тонким. Уся логіка каси й анти-дубля живе в tryCollect.

| Фільтр | Навіщо |
|--------|--------|
| GetPlayerFromCharacter nil | Це не гравець |
| Collected вже true | Повторний touch |
| CanTouch false | Події не прийдуть |
| Занадто малий Size | HRP може не торкнутись |

Touched спамить: один пробіг може дати багато подій за кадр. Тому анти-дубль критичний уже на одній тестовій монеті.

Налаштування Part: Anchored true, CanTouch true, Size достатній для контакту. Якщо монета в Model, вішай Touched на Part, який реально торкається Character, або на PrimaryPart.

Образ: Touched - дверний дзвінок; tryCollect вирішує, чи відкривати касу.

**Зроби зараз (6 хв):** підключи Touched до однієї монети й пройди Play - TAB має показати один приріст, не десять.`,
      },
      {
        title: "Анти-дубль: Collected до giveCoins",
        content: `Без блокування одна монета дає пачку нагород. Мінімум здачі - Destroy. Посилення - Attribute Collected до нагороди.

\`local function tryCollect(coin, player)\`
\`  if coin:GetAttribute("Collected") then return false end\`
\`  coin:SetAttribute("Collected", true)\`
\`  local amount = coin:GetAttribute("CoinValue") or 1\`
\`  if not giveCoins(player, amount) then\`
\`    coin:SetAttribute("Collected", nil)\`
\`    return false\`
\`  end\`
\`  coin:Destroy()\`
\`  return true\`
\`end\`

| Крок | Навіщо |
|------|--------|
| Collected спочатку | Другий Touched одразу виходить |
| giveCoins до Destroy | Не знищити монету без нагороди |
| Rollback Collected при false | Можна спробувати знову, коли stats готові |
| Destroy в кінці | Об'єкт зникає фізично |

Гонка двох Touched в один кадр без Collected: обидва бачать «вільно», обидва викликають giveCoins. Саме тому SetAttribute стоїть до каси.

Debounce map знадобиться в 6.5, коли монета респавниться. Сьогодні Destroy + Collected достатньо.

Метафора: анти-дубль - турнікет, який закривається перед видачею квитка.

**Зроби зараз (5 хв):** тимчасово прибери Collected, спамни touch, побач +10; поверни Collected і Destroy - знову +1.`,
      },
      {
        title: "Скільки amount сьогодні",
        content: `Поки CoinConfig з 6.5 може ще не бути, amount задаєш просто, але завжди на сервері.

| Джерело | Приклад | Оцінка |
|---------|---------|--------|
| Константа | DEFAULT_COIN = 1 | Ок для першого тесту |
| Attribute CoinValue | Properties на Part | Краще, готує 6.5 |
| Name suffix Coin_5 | Парсинг імені | Тимчасовий костиль |

\`local amount = coin:GetAttribute("CoinValue") or 1\`
\`giveCoins(player, amount)\`

Головне: amount заходить у giveCoins одним числом з сервера, не з FireServer клієнта як правда. Якщо amount = 0 або рядок - giveCoins повертає false і не чіпає Coins.

Постав на одній монеті CoinValue=1, на другій CoinValue=3. Збір має дати +1 і +3, не два рази +1.

Завтра spawn поставить Attribute з table cfg.value. Сьогоднішній ручний CoinValue уже тренує той самий шлях читання.

Образ: amount - сума в чеку; каса не приймає суму «з голови покупця».

**Зроби зараз (4 хв):** зроби дві монети з різними CoinValue і звір TAB після обох зборів.`,
      },
      {
        title: "return true для Fx і майбутніх систем",
        content: `giveCoins і tryCollect повертають true/false. Це контракт: juice, квести й Remote «зібрано» запускаються лише після успіху каси.

\`if tryCollect(coin, player) then\`
\`  -- пізніше: playCollectFx(player)\`
\`  -- пізніше: bumpQuestProgress(player, amount)\`
\`end\`

| Подія | Хто вирішує | Сигнал |
|-------|-------------|--------|
| Монета зникла | tryCollect → Destroy | return true |
| Coins не додались | giveCoins → false | tryCollect false |
| Juice звук | Після серверного true | Не на будь-який touch |

У 6.9 juice грає після правди. У 6.8 progress цілі рухається лише коли giveCoins реально додав amount. Якщо Fx грає до giveCoins, гравець чує збір, а TAB стоїть - система бреше.

Не викликай Destroy до giveCoins без Collected: можна знищити монету і не видати нагороду при nil leaderstats.

print("collect ok", player.Name) став лише в гілці true. Спам touch не повинен засипати Output.

Метафора: true - зелений чек на касовому апараті перед оплесками.

**Зроби зараз (3 хв):** додай print тільки після успішного tryCollect і перевір спам touch.`,
      },
      {
        title: "CollectionService tags lite",
        content: `Для однієї тестової монети tag опційний. Для 6.5 він уже корисний: for створить багато Clone, і один hook підхопить усіх.

\`CollectionService:AddTag(coin, "Coin")\`

\`local function hookCoin(coin)\`
\`  if coin:GetAttribute("_Hooked") then return end\`
\`  coin:SetAttribute("_Hooked", true)\`
\`  coin.Touched:Connect(function(hit)\`
\`    local player = Players:GetPlayerFromCharacter(hit.Parent)\`
\`    if player then tryCollect(coin, player) end\`
\`  end)\`
\`end\`

| Без tag | З tag Coin |
|---------|------------|
| Touched у кожному Clone | Один hookCoin |
| Забув hook на новій монеті | GetInstanceAddedSignal |
| Дебаг по Name Coin_1..N | GetTagged("Coin") |

Прапор _Hooked не дає підписати Touched двічі. Tag не замінює giveCoins - він лише знаходить монети для hook.

Можна здати урок без CollectionService. З tag ти не переписуватимеш логіку збору, коли з'явиться for-spawn.

Образ: tag - наклейка «каса сюди» на кожній монеті складу.

**Зроби зараз (5 хв):** якщо вже є дві монети, повісь tag Coin і один hook Script замість двох копій Touched.`,
      },
      {
        title: "Структура CoinController",
        content: `Рекомендований порядок у ServerScriptService:

1. Services: Players, CollectionService.
2. giveCoins - каса.
3. tryCollect - Collected + giveCoins + Destroy.
4. hookCoin - Touched або tag.
5. Існуючі монети + GetInstanceAddedSignal.

Не розкидай giveCoins у CharacterAdded, окремий pickup Script і «тимчасовий тест». Завтра Power підключиш не туди.

| Правило | Наслідок |
|---------|----------|
| Один файл / Module на касу | Легко знайти формулу |
| Template у ServerStorage без Touched | Hook лише на Clone у Workspace |
| leaderstats створює 6.2 | giveCoins лише додає |
| Монети в folder Coins | Порядок у Explorer |

Якщо монета в ServerStorage як template - не вішай Touched на template. Інакше здача «працює на одній», а 6.5 зламається.

Порядок старту: спочатку stats з 6.2, потім CoinController. Перший touch може дати false один раз, якщо stats ще nil - це прийнятно при rollback Collected.

Метафора: CoinController - каса + охорона входу, а не розкидані скрипти по кожній полиці.

**Зроби зараз (8 хв):** збери giveCoins + tryCollect + hook в один Script і видали дублікати Touched.`,
      },
      {
        title: "leaderstats і ранній Join",
        content: `giveCoins припускає, що у гравця вже є leaderstats з Coins. Якщо монета стоїть біля Spawn, теоретично можливий touch раніше за stats.

| Ситуація | Поведінка giveCoins |
|----------|---------------------|
| leaderstats і Coins є | += amount, true |
| leaderstats nil | false, без крашу |
| Coins nil | false |
| amount не number / <= 0 | false |

tryCollect при false відкатує Collected. Гравець може зібрати знову, коли stats готові. Не створюй Coins «на льоту» всередині giveCoins як постійне рішення - leaderstats має жити в одному місці з 6.2.

Перевір sprint з Spawn прямо в монету. Якщо перший touch інколи false - або відсунь монету, або прийми один безпечний false без втрати об'єкта.

Не виправляй nil stats клієнтським Value. Знайди причину на сервері.

Образ: каса не відкриває рахунок покупцю, якого ще немає в системі.

**Зроби зараз (3 хв):** постав монету біля Spawn і переконайся, що немає крашу й немає «зникла без Coins».`,
      },
      {
        title: "Playtest нагород",
        content: `Заповни факти до здачі.

| # | Дія | Очікування | Факт |
|---|-----|------------|------|
| 1 | Touch монети | Coins++ у TAB | |
| 2 | HUD з 6.3 | Збіг з TAB | |
| 3 | Спам touch / стояти на Part | Один payout | |
| 4 | Після збору | Destroy або Collected | |
| 5 | giveCoins(player, -5) | false, Coins без змін | |
| 6 | Друга монета CoinValue=3 | +3 | |
| 7 | Output | Без spam warn | |

Пункти 1 і 3 - серце уроку. Якщо 3 червоний - Collected стоїть запізно або його немає.

Сценарій «стояти на монеті»: HRP всередині Part → Touched майже кожен кадр. Без анти-дубля TAB стає 500 за секунду.

Після Play перевір Explorer: монети зникли, не лишились прозорі «мертві» Parts.

Метафора: playtest - контроль касового чека, а не «здається, додалось».

**Зроби зараз (7 хв):** пройди рядки 1-4, потім Stop + Play - у Studio stats скидаються до DataStore, це норма.`,
      },
      {
        title: "Чекліст здачі уроку 42",
        content: `- [ ] giveCoins на сервері з перевіркою amount і leaderstats
- [ ] Збір викликає giveCoins, не прямий +=
- [ ] Collected ставиться до giveCoins
- [ ] Destroy після успіху або еквівалентний блок
- [ ] amount з Attribute або серверної константи
- [ ] return true/false з giveCoins і tryCollect
- [ ] Немає клієнтського Coins.Value= як здача
- [ ] Спам touch = один payout
- [ ] Save: Lesson 6.4 - GiveCoins

Далі **6.5** наспавнить багато монет на цю касу. **6.6** додасть Power у формулу всередині giveCoins. **6.8-6.9** підв'яжуть цілі й juice до return true.

Артефакт: одна каса нагород. Усі дороги збору ведуть сюди.

Короткий ритуал: спам по монеті → TAB + рівно одна порція → монета зникла → Output без хаосу.

Метафора: фінальний Save фіксує двері каси перед тим, як склад заповнять десятки товарів.

**Зроби зараз (3 хв):** пройди ритуал і збережи Place під точною назвою.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Coins.Value += у LocalScript",
      explanation: "Клієнт стає джерелом цінності, TAB і сервер можуть розійтись, а чіт стає простим.",
      correctApproach: "Нараховувати лише через серверний giveCoins.",
    },
    {
      mistake: "Немає анти-дубля на Touched",
      explanation: "Один пробіг або стояння на Part дає багато payout за секунду.",
      correctApproach: "Ставити Collected до giveCoins і Destroy після успіху.",
    },
    {
      mistake: "Десять копій логіки нагороди в різних Scripts",
      explanation: "Power, цілі й juice доведеться дублювати або вони обійдуть касу.",
      correctApproach: "Тримати одну function giveCoins і викликати її звідусіль.",
    },
    {
      mistake: "Destroy до giveCoins без Collected і rollback",
      explanation: "При nil leaderstats монета зникає, а нагорода не видається.",
      correctApproach: "Спочатку каса; при false відкотити Collected і лишити Part.",
    },
    {
      mistake: "amount приходить із FireServer як правда",
      explanation: "Клієнт може надіслати довільне число й закріпити чіт.",
      correctApproach: "Читати amount із серверного Attribute або константи.",
    },
    {
      mistake: "giveCoins падає на nil leaderstats",
      explanation: "Ранній Join або race зі Spawn ламає Script замість безпечного false.",
      correctApproach: "Перевіряти FindFirstChild і повертати false без крашу.",
    },
  ],
  summary: "Ти зібрав giveCoins і анти-дубль: одна серверна каса, одна монета - один payout, true лише після реальної нагороди. Це база для спавну, Power, цілей і Ship.",
  practiceTask: {
    title: "Каса збору (~30 хв)",
    difficulty: "intermediate",
    description: `### Part A - giveCoins (8 хв)
1. Напиши function з перевірками amount і leaderstats.
2. Повертай true/false.
3. Додай короткий print успіху.

### Part B - Збір (14 хв)
1. Touched → tryCollect.
2. Collected Attribute → giveCoins → Destroy.
3. Спам-тест: один payout.
4. Дві монети з різними CoinValue.

### Part C - Чистота (8 хв)
1. Прибери клієнтський Coins.Value=.
2. (Опційно) CollectionService tag Coin + один hook.
3. Збережи Place як **Lesson 6.4 - GiveCoins**.`,
    hints: [
      "Спочатку одна Anchored монета з CanTouch true.",
      "SetAttribute Collected до giveCoins, не після Destroy.",
      "Не вір клієнтському amount у Remote.",
      "Якщо монета зникла без Coins - дивись порядок Destroy.",
    ],
    optionalChallenge: "Винеси giveCoins у ModuleScript CoinService і require його з одного збірного Script.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Який головний артефакт уроку 6.4?",
        options: [
          "HUD, який сам пише Coins",
          "giveCoins на сервері + анти-дубль одного payout",
          "Новий острів без збору",
          "Remote, що довіряє клієнтському amount",
        ],
        correctAnswer: 1,
        explanation: "Урок будує єдину касу і захист від подвійної нагороди.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де має змінюватися Coins.Value?",
        options: [
          "У серверному giveCoins",
          "У LocalScript на кожен touch",
          "У ParticleEmitter",
          "У назві монети",
        ],
        correctAnswer: 0,
        explanation: "Сервер є джерелом правди для цінності.",
      },
      {
        id: "q3",
        type: MC,
        question: "Коли ставити Attribute Collected?",
        options: [
          "Після Destroy",
          "Після звуку збору",
          "До giveCoins, щоб заблокувати паралельні Touched",
          "Лише на клієнті",
        ],
        correctAnswer: 2,
        explanation: "Раннє блокування зупиняє гонку подвійного payout.",
      },
      {
        id: "q4",
        type: MC,
        question: "Чому Touched потребує анти-дубля вже на одній монеті?",
        options: [
          "Бо Touched заборонений у Studio",
          "Бо Attribute не існує без for",
          "Бо CanTouch завжди false",
          "Бо один пробіг може згенерувати багато подій",
        ],
        correctAnswer: 3,
        explanation: "Touched спамить і без захисту роздуває економіку.",
      },
      {
        id: "q5",
        type: MC,
        question: "Звідки брати amount для giveCoins?",
        options: [
          "Сліпо з FireServer клієнта",
          "З серверного Attribute або константи",
          "З кольору Part",
          "З Volume Sound",
        ],
        correctAnswer: 1,
        explanation: "Клієнтському числу не довіряють.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що має зробити giveCoins при amount <= 0?",
        options: [
          "Все одно додати 1",
          "Видалити leaderstats",
          "Повернути false і не змінювати Coins",
          "Поставити Coins = 999",
        ],
        correctAnswer: 2,
        explanation: "Валідація захищає касу від кривих даних.",
      },
      {
        id: "q7",
        type: MC,
        question: "Навіщо return true з tryCollect?",
        options: [
          "Щоб Fx і майбутні цілі запускались лише після реальної нагороди",
          "Щоб вимкнути HUD",
          "Щоб створити Terrain",
          "Щоб замінити leaderstats",
        ],
        correctAnswer: 0,
        explanation: "Контракт успіху потрібен juice і quest-системам.",
      },
      {
        id: "q8",
        type: MC,
        question: "Що робити, якщо giveCoins повернув false після Collected?",
        options: [
          "Залишити Collected і Destroy",
          "Відкотити Collected і лишити монету",
          "Поставити Coins на клієнті",
          "Видалити Player",
        ],
        correctAnswer: 1,
        explanation: "Rollback дозволяє повторити збір, коли stats готові.",
      },
      {
        id: "q9",
        type: MC,
        question: "Як 6.4 готує 6.5?",
        options: [
          "6.5 видаляє giveCoins",
          "Спавн більше не потрібен",
          "Усі Clone зможуть йти в ту саму tryCollect/giveCoins",
          "Config замінює анти-дубль",
        ],
        correctAnswer: 2,
        explanation: "Єдина каса масштабується на багато монет.",
      },
      {
        id: "q10",
        type: MC,
        question: "Навіщо CollectionService tag Coin?",
        options: [
          "Щоб один hook підхоплював усі монети, включно з новими Clone",
          "Щоб клієнт міг писати Coins",
          "Щоб вимкнути Touched",
          "Щоб замінити Attribute CoinValue",
        ],
        correctAnswer: 0,
        explanation: "Tag зручний для централізованого hook перед for-spawn.",
      },
      {
        id: "q11",
        type: MC,
        question: "Який порядок після успішного збору правильний?",
        options: [
          "Destroy → giveCoins → Collected",
          "giveCoins → Collected → Destroy",
          "Collected → giveCoins → Destroy",
          "Fx → Destroy → giveCoins",
        ],
        correctAnswer: 2,
        explanation: "Спочатку блок, потім каса, потім прибирання об'єкта.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що вважається P0 у playtest 6.4?",
        options: [
          "Неідеальний колір монети",
          "Одна монета дає кілька payout при спамі",
          "Billboard трохи кривий",
          "Ambient можна тепліший",
        ],
        correctAnswer: 1,
        explanation: "Подвійний payout ламає всю подальшу економіку.",
      },
      {
        id: "q13",
        type: MC,
        question: "Як 6.4 готує 6.6?",
        options: [
          "Power можна вставити всередину giveCoins без пошуку десяти +=",
          "Power замінює анти-дубль",
          "Attribute CoinValue більше не потрібен",
          "HUD починає писати Power сам",
        ],
        correctAnswer: 0,
        explanation: "Одна каса - одне місце для множника.",
      },
      {
        id: "q14",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 6.5 - Coin Config Spawn",
          "Lesson 6.4 - GiveCoins",
          "Lesson 6.3 - HUD",
          "Coins Draft Final",
        ],
        correctAnswer: 1,
        explanation: "Чекліст вимагає Lesson 6.4 - GiveCoins.",
      },
      {
        id: "q15",
        type: MC,
        question: "Чому не варто грати juice до giveCoins?",
        options: [
          "Бо Sound тоді гучніший",
          "Бо Destroy стає неможливим",
          "Бо Attribute зникне",
          "Бо гравець чує успіх, навіть коли Coins не змінились",
        ],
        correctAnswer: 3,
        explanation: "Feedback має підтверджувати серверну правду.",
      },
    ],
  },
};
