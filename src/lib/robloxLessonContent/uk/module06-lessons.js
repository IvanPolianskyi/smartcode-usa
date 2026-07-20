/** Roblox Module 06 UK - 10 уроків (prod-92), Sim */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson61 = {
  lessonId: "lesson-roblox-6-1",
  moduleId: "module-06",
  order: 1,
  title: "6.1 - Core loop + сцена",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Пояснити core loop Simulator як збір → нагорода → апгрейд → швидший збір",
    "Скласти паперовий ескіз сцени і відповісти на п'ять питань дизайну",
    "Створити Folders Collectables і SpawnPoints з послідовними іменами Parts",
    "Порівняти Touched і ProximityPrompt і письмово обрати Touched для збору",
    "Побудувати малий острів і пройти порожній loop перед leaderstats у 6.2"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 39 з 92)",
        content: `У **5.10** ти закрив Obby Ship + Badge. Модуль 6 - новий жанр: **Simulator**. Десять уроків ведуть від сцени до Ship Sim: 6.1 loop і острів, 6.2 leaderstats, 6.3 HUD, 6.4 giveCoins, 6.5-6.6 спавн і Power, 6.7 DataStore, 6.8 цілі дня, 6.9 баланс і juice, 6.10 здача.

Сьогодні немає економіки. Жодного leaderstats, HUD, giveCoins чи DataStore. Ти вирішуєш лише **що** гравець повторює по колу і **де** він це робить. Решта модуля лише підключить числа до цього каркасу.
| Вхід після 5.10 | Результат 6.1 |
|-----------------|---------------|
| Навички Studio і playtest | Інший жанр: фарм, не проходження рівня |
| Порожній або чужий Place | Острів під Simulator-loop |
| Немає структури збору | Folders і імена під 6.4-6.5 |

6.1 - креслення траси; 6.2-6.10 - двигун, прилади й фінішний прапор на тій самій трасі.

**Зроби зараз (2 хв):** відкрий новий Place або чистий шаблон і збережи як Lesson 6.1 - Core Loop.`,
      },
      {
        title: "Що таке core loop Simulator",
        content: `Core loop - коротка послідовність дій, яку гравець повторює, і кожен прохід трохи покращує його позицію. У Simulator у Roblox ланцюжок майже завжди такий:

**збір → нагорода → апгрейд → швидший збір → (знову)**

| Крок | Що відчуває гравець | Де з'явиться в модулі 6 |
|------|---------------------|-------------------------|
| Збір | Торкається Collectable | Сцена в 6.1, код у 6.4 |
| Нагорода | Число монет росте | 6.2 leaderstats, 6.3 HUD |
| Апгрейд | Монети купують силу | 6.6 Power |
| Швидший збір | Той самий маршрут дає більше | Замикає loop і тягне до наступного кола |

Якщо після кількох кіл гравець не відчуває прогресу, loop мертвий навіть з гарною сценою. Сьогодні ти будуєш лише фізичний крок **збір**, але вже розумієш, куди піде решта ланцюга - інакше Folders і розташування Parts заважатимуть 6.4-6.6.

Образ: loop - конвеєр; кожна станція модуля 6 додає деталь, але стрічка вже має крутитися без застрягань.

**Зроби зараз (3 хв):** запиши ланцюжок своїми словами в один рядок і назви, що саме буде Collectable у твоїй першій версії.`,
      },
      {
        title: "Чому спочатку папір, а не Studio",
        content: `Поставити Parts у Studio спокусливо, але дорого на старті. Папір дешевший у трьох сенсах:

| Папір | Studio без плану |
|-------|------------------|
| Ескіз за 2 хвилини | Макет тієї ж ідеї - 20+ хвилин |
| Легко перекреслити | Видаляти й тягнути Parts дратує |
| Уся зона одним поглядом | Камера губить загальну картину |

Ескіз не мусить бути арт-роботою. Достатньо прямокутника межі, кількох крапок Collectable і стрілки від спавну до першого збору. Мета - відповісти: скільки предметів, наскільки далеко один від одного, де край зони, щоб гравець не злетів у порожнечу.

Досвідчені Sim-розробники майже завжди накидають такий план перед Explorer. Навіть якщо сцена потім зміниться, сам акт малювання змушує закрити рішення, які інакше накопичуються в хаос.

карта перед походом у ліс; без неї легко бігати колами й думати, що це прогрес.

**Зроби зараз (5 хв):** намалюй або опиши межу, 3-5 Collectable і маршрут від спавну.`,
      },
      {
        title: "П'ять питань паперового дизайну",
        content: `Хороший ескіз закриває конкретний список ще до Studio:

1. Скільки **типів** Collectable у першій версії?
2. Скільки **екземплярів** одного типу одночасно в зоні?
3. Що станеться з Part після дотику - зникне, кулдаун, одразу новий?
4. Де **межа** зони - стіна, урвище, бордюр?
5. Звідки **старт** і скільки кроків до першого Collectable?

Для 6.1 типові відповіді прості: **один тип**, **3-8 екземплярів**, Part **зникає** (без реального респавну - він прийде в 6.5), межа - **малий острів із бордюром**, старт - **1 SpawnPoint** близько до перших монет.

Не вигадуй остаточну економіку на цьому аркуші. DataStore, цілі дня й баланс - теми 6.7-6.9. Сьогодні перевіряєш лише, що порожній маршрут фізично проходиться і виглядає логічно.

| Питання | Типова відповідь 6.1 | Чому не більше |
|---------|----------------------|----------------|
| Типи | 1 | Другий тип ускладнює імена й спавн |
| Кількість | 3-8 | Достатньо відчути «фарм» без хаосу |
| Після дотику | Зникає (поки вручну) | Код повернення - 6.4-6.5 |
| Межа | Видимий бордюр | Без неї playtest бреше |
| Старт | 1 маркер біля зони | Далеко = гравець губиться |

**Зроби зараз (4 хв):** допиши відповіді на всі п'ять питань поруч з ескізом. Якщо застряг - зменш масштаб.`,
      },
      {
        title: "Folders: Collectables і SpawnPoints",
        content: `Parts розкидані прямо в корені Workspace - перша причина хаосу вже на другому уроці, коли об'єктів стане десятки. Folder лише групує; на фізику й рендер не впливає.

Мінімальна структура 6.1:

\`Workspace\`
\` └ Collectables\`
\` └ SpawnPoints\`

| Folder | Що всередині | Навіщо окремо |
|--------|--------------|---------------|
| Collectables | Parts, які гравець торкається зараз | Легко перелічити активний збір |
| SpawnPoints | Порожні маркери позицій | 6.5 читатиме лише їх для спавну |

Маркери SpawnPoints: Part з Transparency 1, CanCollide false, Anchored true - або Attachment. Це не Collectable, а адреса «тут з'явиться монета пізніше».

Розділення двох Folders - підготовка до 6.5: Script піде по \`SpawnPoints:GetChildren()\` і створить Collectable в кожній позиції. Якщо маркери й готові предмети в одному Folder, спавн почне клонувати або видаляти не те.

У 6.4 giveCoins підключиться до Parts у Collectables через Touched. Чисті Folders сьогодні економлять години перейменування завтра.

**Зроби зараз (6 хв):** створи обидва Folder у Workspace. Якщо вже є тестові Parts - розклади їх за роллю.`,
      },
      {
        title: "Імена Collectable_01, не Part1",
        content: `Studio називає нові Parts Part, Part1, Part2. Для швидкого тесту зручно, для Script - ні. Уже на 6.1 заклади послідовні імена: 6.4-6.6 шукатимуть об'єкти за префіксом і номером.

| Об'єкт | Приклад | Правило |
|--------|---------|---------|
| Collectable | Collectable_01 | Префікс + номер із нулем |
| SpawnPoint | SpawnPoint_01 | Той самий номер у парі |
| Межа (опційно) | ZoneBorder | Однина, без номера |

Номер із нулем (\`01\` замість \`1\`) тримає сортування в Explorer: без нуля Collectable_10 опиниться між Collectable_1 і Collectable_2 і плутає дебаг.

Найменування - не косметика. У 6.5 зручно зіставити SpawnPoint_03 із місцем для Collectable_03. Хаос імен сьогодні = переписування Folders посеред коду спавну.

Не використовуй пробіли, емодзі й випадкові регістри: Coin Cool, COIN, coin_a. Один стиль на весь Place.

номери місць на складі; без них вантажник не знає, куди ставити ящик.

**Зроби зараз (5 хв):** перейменуй Parts у обох Folders так, щоб номери збігалися парами.`,
      },
      {
        title: "Масштаб острова й видима межа",
        content: `Мета 6.1 - перевірити loop, не вразити візуалом. Занадто великий острів із декором з'їдає години до того, як ти дізнаєшся, чи маршрут взагалі працює.

| Параметр | Орієнтир |
|----------|----------|
| Розмір зони | 40×40 - 60×60 studs |
| Collectable | 3-8 |
| Старт → перший збір | 5-15 studs |
| Межа | Бордюр, урвище або низька стіна |

Межа потрібна навіть без монет: на playtest гравець не повинен злетіти в порожнечу й втратити орієнтацію. Anchored true + CanCollide true на бордюрі вирішує це за кілька хвилин.

Не будуй кілька біомів і телепорти. Один замкнутий простір. Розширення - після того, як базовий loop підтверджено в 6.4-6.9.

Відстань між Collectable має дозволяти короткий біг, не марафон і не тісняву, де Parts зливаються. Якщо з ескізу дві крапки майже в одній точці - розсунь їх у Studio.

**Зроби зараз (10 хв):** збери або обріж зону за таблицею, постав SpawnPoint і Collectable за ескізом.`,
      },
      {
        title: "Touched vs ProximityPrompt",
        content: `Два основні способи Part реагує на гравця. Вибір задає відчуття всього фарму.

| Критерій | Touched | ProximityPrompt |
|----------|---------|-----------------|
| Дія | Підійти / торкнутися | Підійти й натиснути (E) |
| Масовий збір | Швидко, багато підряд | Повільніше, одна дія на предмет |
| Підказка | Немає вбудованої | Іконка з текстом |
| Типово в Sim | Монети, ресурси | Двері, NPC, рідкісні дії |
| Випадковий тригер | Вищий | Нижчий |
| Перший скрипт | Простіший Connect | Більше налаштувань Instance |

Simulator історично будується на **Touched** для основного ресурсу: гравець біжить і збирає десятки предметів за секунди. Саме ця швидкість дає відчуття фарму. ProximityPrompt кращий для навмисних рідкісних дій - крамниця, діалог, одноразова скриня.

У 6.4 giveCoins підключатиметься до Touched на Parts у Collectables. Сьогоднішнє рішення прямо визначає, який код писатимеш за три уроки.

Образ: Touched - підбір яблук у саду на бігу; Prompt - ключ від однієї хвіртки.

**Зроби зараз (4 хв):** прогони в голові свій ескіз спочатку з Touched, потім з Prompt - відчуй різницю темпу.`,
      },
      {
        title: "Рішення 6.1: Touched для Collectables",
        content: `Для основного Collectable урок рекомендує **Touched**. Три причини:

1. Цикл «збір → нагорода» живий лише тоді, коли кілька предметів збираються за секунди без зупинки на кнопці.
2. Prompt на кожну з 5-8 монет швидко перетворюється на втому, не на задоволення.
3. Перший серверний скрипт простіший: менше Instance і менше точок поломки на першому тесті.

ProximityPrompt не «поганий» - він просто для іншої ролі. Правило: **Touched для масового фарму, Prompt для рідкісної навмисної дії**. Крамниця чи NPC з'являться пізніше з Prompt; монети лишаються на Touched.

На 6.1 не пиши Script нарахування. Лише **запиши** рішення одним реченням у дизайн-нотатках. Без запису легко «передумати» на 6.4 і зламати відчуття жанру.

| Роль | Вибір | Урок |
|------|-------|------|
| Collectable монета | Touched | 6.1 рішення, 6.4 код |
| Крамниця / NPC | ProximityPrompt | пізніше в модулі |
| Тестовий Part без логіки | Поки без скрипту | саме 6.1 |

**Зроби зараз (3 хв):** допиши: «Collectables використовують Touched, бо ...» своїми словами.`,
      },
      {
        title: "Що навмисно НЕ будувати сьогодні",
        content: `Спокуса забігти вперед - головна причина, чому 6.1 розтягується на тиждень. Межі артефакту:

| Не роби зараз | Коли прийде |
|---------------|-------------|
| leaderstats / IntValue Coins | 6.2 |
| HUD / TextLabel з числом | 6.3 |
| Script нарахування при дотику | 6.4 |
| Автореспавн Collectable | 6.5-6.6 |
| DataStore | 6.7 |
| Крамниця й апгрейди за монети | 6.6+ |

Кожен наступний шар простіший на вже перевіреній сцені й чистих Folders. DataStore на хаосі без імен змусить одночасно лагодити геометрію і збереження.

Ідею крамниці чи другого острова запиши в нотатки «на майбутнє» і повертайся до обмеженого завдання. Дисципліна обсягу на 6.1 робить 6.2-6.10 швидшими, не повільнішими.

Якщо в Place уже лежить тестовий Script з Coins - познач його «заготовка 6.2+», не частиною здачі 6.1.

**Зроби зараз (2 хв):** глянь Explorer: чи немає зайвих Value / ScreenGui / DataStore-скриптів у здачі?`,
      },
      {
        title: "Playtest порожнього loop",
        content: `Тест без монет перевіряє, що сцена готова прийняти логіку наступних уроків.

| # | Дія | Очікування |
|---|-----|------------|
| 1 | Play, з'явись біля SpawnPoint | Старт у зоні, не в порожнечі |
| 2 | Дійди пішки до кожного Collectable | Без застрягання в геометрії |
| 3 | Спробуй вийти за межу | Бордюр тримає, не падаєш |
| 4 | Explorer під час Play | Folders на місці, імена ті самі |
| 5 | Output | Порожньо від помилок (скриптів ще немає) |
| 6 | Порівняй з ескізом | Маршрут збігається з планом |

Пункт 2 - головна перевірка здачі: якщо до Part не дійти, майбутній giveCoins не врятує відчуття гри. Виправити зараз - хвилини; після скриптів - доведеться тестувати геометрію й логіку разом.

Пункт 3 рятує від класичної скарги опублікованих Sim: «впав з карти і застряг».

Не вимірюй сьогодні Coins за хвилину - економіки ще немає. Вимірюй лише: чи маршрут зручний і чи межа працює.

**Зроби зараз (8 хв):** пройди всі шість пунктів, виправ застрягання одразу.`,
      },
      {
        title: "Чекліст здачі й міст до 6.2",
        content: `Перед Save перевір коротко:

Паперовий ескіз із ланцюжком збір → нагорода → апгрейд → швидший збір і відповідями на п'ять питань. Folders Collectables і SpawnPoints у Workspace. Імена Collectable_0N / SpawnPoint_0N з парними номерами. Письмове «Touched, бо ...». Острів 40×40-60×60, 3-8 Collectable, видима межа. Playtest без застрягань. Save: **Lesson 6.1 - Core Loop**.

Далі **6.2 - leaderstats** додасть серверну правду Coins на Player. Сцена й Folders лишаються: ти не перебудовуєш острів, лише додаєш Script у ServerScriptService. У 6.4 Touched на тих самих Collectable почне викликати giveCoins. У 6.5 SpawnPoints стануть адресами автоспавну.

Якщо зараз хаос у іменах або немає рішення Touched/Prompt - закрий це до 6.2. Інакше leaderstats сяде на хиткий каркас, і дебаг змішає геометрію з даними гравця.

Артефакт дня: **продуманий loop на папері + чиста сцена з Folders і письмовим вибором способу збору**, готова прийняти leaderstats без переробки траси.

**Зроби зараз (2 хв):** Save Place з точною назвою Lesson 6.1 - Core Loop і закрий зайві вкладки Explorer.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Відкрив Studio і ставив Parts без ескізу",
      explanation: "Без плану сцена росте хаотично, і геометрію доводиться ламати вже під час підключення коду.",
      correctApproach: "Спочатку ескіз і п'ять питань дизайну, потім Studio",
    },
    {
      mistake: "Collectable лежать у корені Workspace без Folder",
      explanation: "За десятки Parts неможливо швидко перелічити активний збір чи підключити 6.4-6.5.",
      correctApproach: "Folder Collectables і Folder SpawnPoints з першого дня",
    },
    {
      mistake: "Імена лишились Part, Part1, Part2",
      explanation: "Майбутній спавн не зіставить SpawnPoint із Collectable однозначно.",
      correctApproach: "Collectable_01 / SpawnPoint_01 з нулем і парним номером",
    },
    {
      mistake: "ProximityPrompt на масовий збір монет",
      explanation: "Кнопка на кожен предмет ламає темп фарму Simulator.",
      correctApproach: "Touched для Collectables; Prompt лишити для рідкісних дій",
    },
    {
      mistake: "Почав leaderstats, HUD або DataStore на 6.1",
      explanation: "Шари економіки сідають на неперевірену сцену і змішують баги.",
      correctApproach: "Лише сцена, Folders і письмове Touched - решта з 6.2",
    },
    {
      mistake: "Величезний острів із кількома зонами до першого playtest",
      explanation: "Години декору витрачені до перевірки, чи loop проходиться.",
      correctApproach: "Один малий острів 40×40-60×60 і 3-8 Collectable",
    },
    {
      mistake: "Немає видимої межі зони",
      explanation: "На playtest гравець падає в порожнечу і губить орієнтацію.",
      correctApproach: "Бордюр або низька стіна навколо зони збору",
    }
  ],
  summary: "Ти визначив core loop Simulator (збір → нагорода → апгрейд → швидший збір), відповів на п'ять питань дизайну, зібрав Folders Collectables і SpawnPoints з парними іменами, письмово обрав Touched для масового збору і пройшов порожній playtest малого острова. Це каркас, на який 6.2-6.10 накладуть leaderstats, HUD, giveCoins, спавн, Power, DataStore і Ship без переробки сцени.",
  practiceTask: {
    title: "Core loop і сцена (~35 хв)",
    difficulty: "beginner",
    description: `**Мета:** паперовий дизайн core loop + чиста сцена в Studio, готова до leaderstats з 6.2.

### Part A - Паперовий дизайн (10 хв)
1. Опиши ланцюжок збір → нагорода → апгрейд → швидший збір.
2. Відповіси на п'ять питань: типи, кількість, поведінка після дотику, межа, старт.
3. Запиши: Collectables = Touched, бо ...

### Part B - Сцена в Studio (18 хв)
1. Folder Collectables і Folder SpawnPoints у Workspace.
2. Зона 40×40-60×60 studs із видимою межею.
3. 3-8 Parts Collectable_01... і парні SpawnPoint_01...

### Part C - Playtest і Save (7 хв)
1. Play - дійди до кожного Collectable, перевір межу.
2. Output без помилок.
3. **Save:** Lesson 6.1 - Core Loop`,
    hints: [
      "Ескіз не мусить бути гарним - головне закрити п'ять питань",
      "Номери Collectable_XX і SpawnPoint_XX мають збігатися",
      "Touched для швидкого фарму - стандарт жанру на цьому етапі"
    ],
    optionalChallenge: "Додай другий колір Collectable з префіксом CollectableB_01 як підготовку до кількох типів ресурсів пізніше - без нового скрипту.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Який правильний порядок core loop у Simulator?",
        options: [
          "Апгрейд → збір → швидший збір → нагорода",
          "Збір → нагорода → апгрейд → швидший збір",
          "Нагорода → апгрейд → збір → повільніший збір",
          "Швидший збір → збір → апгрейд → нагорода"
        ],
        correctAnswer: 1,
        explanation: "Стандартний ланцюжок жанру Simulator.",
      },
      {
        id: "q2",
        type: MC,
        question: "Чому варто зробити ескіз до Studio?",
        options: [
          "Дешевше й швидше міняти ідеї, ніж пересувати Parts",
          "Roblox вимагає папір перед Publish",
          "Studio блокує видалення Parts без ескізу",
          "Папір замінює Folders у Workspace"
        ],
        correctAnswer: 0,
        explanation: "Дешева ітерація до витрат часу в Explorer.",
      },
      {
        id: "q3",
        type: MC,
        question: "Що НЕ входить у п'ять питань дизайну 6.1?",
        options: [
          "Скільки типів Collectable у першій версії",
          "Де межа зони",
          "Скільки ключів DataStore потрібно для збереження",
          "Що станеться з Part після дотику"
        ],
        correctAnswer: 2,
        explanation: "DataStore - тема 6.7, не паперовий дизайн 6.1.",
      },
      {
        id: "q4",
        type: MC,
        question: "Навіщо Collectables і SpawnPoints окремими Folders?",
        options: [
          "Roblox забороняє два типи Parts в одному Folder",
          "SpawnPoints мають бути видимими, Collectables - ні",
          "Це лише вимога ментора без технічної користі",
          "Щоб Script спавну в 6.5 не плутав маркери з готовими предметами"
        ],
        correctAnswer: 3,
        explanation: "Розділення готує чистий цикл спавну.",
      },
      {
        id: "q5",
        type: MC,
        question: "Яка назва відповідає схемі 6.1?",
        options: [
          "Part2",
          "Collectable_01",
          "coin cool",
          "PART"
        ],
        correctAnswer: 1,
        explanation: "Префікс типу + номер із нулем спереду.",
      },
      {
        id: "q6",
        type: MC,
        question: "Чому краще 01, 02, а не 1, 2?",
        options: [
          "Roblox вимагає нуль у всіх іменах Parts",
          "Нуль прискорює фізику дотику",
          "Зберігає правильне сортування в Explorer після десяти екземплярів",
          "Дозволяє обійтися без Folders"
        ],
        correctAnswer: 2,
        explanation: "Без нуля Collectable_10 плутається між _1 і _2.",
      },
      {
        id: "q7",
        type: MC,
        question: "Головна відмінність Touched від ProximityPrompt?",
        options: [
          "ProximityPrompt працює лише в LocalScript",
          "Touched завжди показує іконку з підписом",
          "Різниці для гравця немає",
          "Touched спрацьовує від дотику, Prompt вимагає натискання кнопки"
        ],
        correctAnswer: 3,
        explanation: "Автоматичний дотик проти навмисної дії.",
      },
      {
        id: "q8",
        type: MC,
        question: "Чому 6.1 рекомендує Touched для Collectables?",
        options: [
          "ProximityPrompt технічно неможливий на Part",
          "Дає швидкий масовий збір без кнопки на кожен предмет",
          "Touched сам зберігає прогрес у DataStore",
          "Touched створює leaderstats без коду"
        ],
        correctAnswer: 1,
        explanation: "Темп фарму - ключове відчуття жанру.",
      },
      {
        id: "q9",
        type: MC,
        question: "Коли ProximityPrompt кращий за Touched?",
        options: [
          "Для збору десятків монет підряд",
          "Завжди в будь-якій Simulator-грі",
          "Для рідкісної навмисної дії: крамниця чи діалог з NPC",
          "Лише для декоративних Parts без логіки"
        ],
        correctAnswer: 2,
        explanation: "Навмисність і вбудована підказка Prompt.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що НЕ входить у здачу 6.1?",
        options: [
          "Folder Collectables і SpawnPoints",
          "Паперовий ескіз core loop",
          "Письмове рішення Touched vs Prompt",
          "Script, що нараховує монети при дотику"
        ],
        correctAnswer: 3,
        explanation: "Нарахування - тема 6.4 (giveCoins).",
      },
      {
        id: "q11",
        type: MC,
        question: "Який орієнтовний масштаб сцени для першого тесту?",
        options: [
          "Острів 40×40-60×60 studs і 3-8 Collectable",
          "Кілька великих островів із десятками зон",
          "Уся Baseplate без меж",
          "Один Collectable без зони взагалі"
        ],
        correctAnswer: 0,
        explanation: "Малий масштаб для швидкої перевірки loop.",
      },
      {
        id: "q12",
        type: MC,
        question: "Навіщо видима межа зони вже без економіки?",
        options: [
          "Межа потрібна лише для DataStore",
          "Roblox вимагає межу, щоб створити Folder",
          "Щоб на playtest не впасти в порожнечу й не загубити орієнтацію",
          "Межа замінює SpawnPoints"
        ],
        correctAnswer: 2,
        explanation: "Безпека й орієнтація під час порожнього тесту.",
      },
      {
        id: "q13",
        type: MC,
        question: "Головна перевірка playtest порожнього loop?",
        options: [
          "HUD показує правильні Coins",
          "DataStore зберігає прогрес між сесіями",
          "Гравець пішки дістається до кожного Collectable без застрягання",
          "Power уже множить нагороду"
        ],
        correctAnswer: 2,
        explanation: "Геометрія й доступність важливіші за код на цьому етапі.",
      },
      {
        id: "q14",
        type: MC,
        question: "Як 6.1 готує 6.2?",
        options: [
          "6.2 видаляє всі Folders із 6.1",
          "leaderstats замінює Folder Collectables",
          "6.1 і 6.2 не пов'язані",
          "Готова сцена дозволяє додати leaderstats без переробки геометрії"
        ],
        correctAnswer: 3,
        explanation: "Каркас сцени лишається; 6.2 додає серверні дані.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save для здачі?",
        options: [
          "Lesson 6.2 - leaderstats",
          "Lesson 6.1 - Core Loop",
          "Sim Draft Final",
          "Lesson 5.10 - Ship Badge"
        ],
        correctAnswer: 1,
        explanation: "Чекліст вимагає Lesson 6.1 - Core Loop.",
      }
    ],
  },
};

export const ukLesson62 = {
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
    "Тримати Parent = player, а не Character, і не створювати stats у LocalScript"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 40 з 92)",
        content: `У 6.1 ти зібрав сцену острова: є що збирати й куди бігати. Але прогрес гравця ще ніде не рахується. Сьогодні будуєш число: **leaderstats** з IntValue Coins на сервері. Це якір модуля 6 - HUD, giveCoins, спавн, Power і DataStore читатимуть або писатимуть саме сюди.
| Було в 6.1 | Стає в 6.2 |
|-------------|------------|
| Сцена і маркери збору | Число Coins, яке реально рахується |
| Гравець бачить світ | Гравець бачить прогрес у TAB |
| Немає серверної правди | Одна Folder на Player |

У 6.3 HUD лише прочитає той самий Coins. У 6.4 giveCoins писатиме в нього. У 6.7 DataStore завантажить збережене число в цей самий IntValue.

leaderstats - паспорт гравця; TAB - вікно, крізь яке всі його читають.

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

пароль до табло чутливий до регістру; одна велика літера - і двері зачинені.

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

Power=1 - нейтральна передача; Power=0 - затягнуте гальмо.

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

спочатку постав охорону на двері, потім перевір, хто вже в залі.

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

паспорт у кишені людини, а не на тимчасовій куртці, яку змінюють після дощу.

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

намальований паспорт у дзеркалі не пропустить через кордон.

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

playtest - контроль, що паспорт не змивається під дощем.

**Зроби зараз (8 хв):** пройди пункти 1, 5 і 8 обов'язково.`,
      }
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
    }
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
      "Power = 1, якщо додаєш множник уже сьогодні."
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
          "DataStore rejoin"
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
          "leader_stats"
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
          "У Lighting"
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
          "Players.PlayerAdded"
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
          "Створити Power = 0"
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
          "Workspace"
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
          "Coins зникатиме при смерті персонажа"
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
          "-1"
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
          "Заміна PlayerAdded"
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
          "Ні - інші гравці і сервер його не побачать"
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
          "Журнал Output"
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
          "CFrameValue"
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
          "Power видно лише в чаті"
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
          "HUD читатиме той самий Coins.Value через WaitForChild"
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
          "Stats Draft Final"
        ],
        correctAnswer: 1,
        explanation: "Чекліст вимагає Lesson 6.2 - leaderstats.",
      }
    ],
  },
};

export const ukLesson63 = {
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
    "Не писати Coins.Value з клієнта і підготувати bindLabel під Power"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 41 з 92)",
        content: `У 6.2 ти отримав leaderstats з IntValue Coins - серверна правда вже існує. Сьогодні будуєш вітрину цієї правди: HUD на екрані, який показує Coins без відкриття TAB. LocalScript лише читає Value і малює текст. Жодного запису, жодної логіки нарахування.
Без стабільного HUD 6.4-6.10 підключатимуть giveCoins, спавн, Power і DataStore до системи, яку гравець бачить лише через TAB. Це незручно і не схоже на реальну Simulator-гру.

| Було в 6.2 | Стає в 6.3 |
|-------------|------------|
| leaderstats.Coins на сервері | Текст на екрані читає те саме Value |
| TAB показує Coins | Постійний HUD без TAB |
| Приріст у списку гравців | Приріст у кутку екрана |

TAB - турнірна таблиця між раундами; HUD - спідометр під час руху.

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

ScreenGui - скло шолома; Frame - панель приладів на склі.

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

WaitForChild - черга до каси; не читай чек, поки каса ще не відкрилась.

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

спочатку прочитай поточний чек, потім слухай нові покупки.

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

вітрина магазину не друкує власні цінники замість касира.

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

bindLabel - універсальна розетка для будь-якого лічильника на панелі.

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

фінальний Save фіксує вітрину перед тим, як каса почне проводити реальні продажі.

**Зроби зараз (3 хв):** ритуал здачі - Play → правильне число → Command Bar → оновлення → збіг з TAB → Save.`,
      }
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
    }
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
      "Якщо HUD порожній - перевір Visible і TextTransparency."
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
          "Швидкість персонажа"
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
          "У Lighting"
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
          "Щоб видалити TAB"
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
          "Він стежить лише за конкретною властивістю Value"
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
          "Інакше сигнал ніколи не спрацює"
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
          "Так, якщо ResetOnSpawn false"
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
          "Визначає, чи пересоздається HUD при респавні"
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
          "Бо WaitForChild створює Remote"
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
          "TAB замінює giveCoins"
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
          "Спосіб вимкнути TAB"
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
          "ResetOnSpawn вимикається сам"
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
          "Чи Baseplate Anchored"
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
          "У Lighting"
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
          "HUD Draft Final"
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
          "Повернутись у 6.2 і перевірити створення leaderstats на сервері"
        ],
        correctAnswer: 3,
        explanation: "HUD чекає Instance, який повинен створити попередній урок.",
      }
    ],
  },
};

export const ukLesson64 = {
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
    "Підготувати єдину касу під спавн, Power і баланс наступних уроків"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 42 з 92)",
        content: `У 6.2-6.3 ти вже маєш Coins у leaderstats і HUD, що читає серверну правду. Сьогодні з'являється каса нагород: одна function giveCoins і захист від подвійного збору. Без цього 6.5-6.10 будують економіку на дірявому відрі.
У 6.5 for наспавнить багато монет на цю касу. У 6.6 всередині giveCoins з'явиться Power. У 6.8-6.9 цілі й juice спрацьовуватимуть лише після успішного return true.

| Було в 6.2-6.3 | Стає в 6.4 |
|----------------|------------|
| leaderstats.Coins | Єдиний вхід нарахування |
| HUD читає Value | Сервер пише лише через giveCoins |
| TAB показує прогрес | Збір = один payout |

giveCoins - каса банку; збір просить касу, а не лізе в сховище сам.

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

клієнт дзвонить у дзвінок, касир сам відкриває сейф.

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

анти-дубль - турнікет, який закривається перед видачею квитка.

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

true - зелений чек на касовому апараті перед оплесками.

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

CoinController - каса + охорона входу, а не розкидані скрипти по кожній полиці.

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

playtest - контроль касового чека, а не «здається, додалось».

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

Короткий ритуал: спам по монеті → TAB + рівно одна порція → монета зникла → Output без хаосу.

фінальний Save фіксує двері каси перед тим, як склад заповнять десятки товарів.

**Зроби зараз (3 хв):** пройди ритуал і збережи Place під точною назвою.`,
      }
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
    }
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
      "Якщо монета зникла без Coins - дивись порядок Destroy."
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
          "Remote, що довіряє клієнтському amount"
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
          "У назві монети"
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
          "Лише на клієнті"
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
          "Бо один пробіг може згенерувати багато подій"
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
          "З Volume Sound"
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
          "Поставити Coins = 999"
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
          "Щоб замінити leaderstats"
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
          "Видалити Player"
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
          "Config замінює анти-дубль"
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
          "Щоб замінити Attribute CoinValue"
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
          "Fx → Destroy → giveCoins"
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
          "Ambient можна тепліший"
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
          "HUD починає писати Power сам"
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
          "Coins Draft Final"
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
          "Бо гравець чує успіх, навіть коли Coins не змінились"
        ],
        correctAnswer: 3,
        explanation: "Feedback має підтверджувати серверну правду.",
      }
    ],
  },
};

export const ukLesson65 = {
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
    "Підключити всі спавнені монети до серверного giveCoins з 6.4"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 43 з 92)",
        content: `У 6.4 ти зібрав касу: giveCoins, анти-дубль і один серверний вхід нагороди. Одна тестова монета доводить формулу, але острів ще не живе. Сьогодні з'являється система розкладки: table правил, for по точках і респавн після збору.
У 6.6 giveCoins помножить CoinValue на Power. У 6.9 ти крутитимеш value і respawn у тій самій table для TTG1. Без сьогоднішнього Config баланс знову розмажеться по десяти Scripts.

| Було в 6.4 | Стає в 6.5 |
|-------------|------------|
| Одна тестова монета | Автоматична розкладка |
| Хардкод value у Script | value у CoinConfig |
| Світ порожніє після збору | Респавн за cfg.respawn |
| Каса готова | Каса отримує потік предметів |

Config - меню страв, for - офіціант, що розносить за списком столів.

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

CoinId - штрихкод, CoinConfigById - сканер складу.

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

spawnCoin - штамп фабрики; каса стоїть окремо на виході зі складу.

**Зроби зараз (7 хв):** напиши spawnCoin і вручну виклич його для однієї точки small.`,
      },
      {
        title: "for як навичка розкладки",
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

респавн - повернення товару на полицю після продажу, а не друга каса поверх першої.

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

усі товари йдуть через одну касу, навіть якщо їх багато на полицях.

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

анти-лаг - обмежувач полиці: нова коробка лише коли стара знята.

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

таблиця - накладна прийомки складу перед відкриттям магазину.

**Зроби зараз (7 хв):** пройди рядки 1-5 і постав статуси.`,
      }
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
    }
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
      "Зберігай SpawnPointName і CoinId до Destroy."
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
          "DataStore без монет на сцені"
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
          "for малює Terrain"
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
          "Завжди 999999"
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
          "Щоб задати час повернення монети після збору"
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
          "Зробити CanCollide стіну назавжди"
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
          "SpawnLocation сам по собі"
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
          "Щоб замінити Folder CoinSpawns"
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
          "У ServerStorage для серверного Clone"
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
          "Power замінює Config"
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
          "Лише колір без чисел"
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
          "for зупиниться назавжди"
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
          "Серверна правда - Attribute/Config, вигляд можна змінити візуально"
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
          "Лише 1 на весь модуль назавжди"
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
          "Juice замінює spawn"
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
          "Lesson 6.5 - Coin Config Spawn"
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Lesson 6.5 - Coin Config Spawn.",
      }
    ],
  },
};

export const ukLesson66 = {
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
    "Підготувати множник під DataStore, цілі дня та заміри TTG"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 44 з 92)",
        content: `У 6.5 ти навчив спавн читати Config і ставити Attribute CoinValue на монети. Сьогодні з'являється другий множник: Power гравця. База лишається на collectable, а сила - у leaderstats. Разом вони змінюють відчуття збору без нового острова.
У 6.7 Power поїде в DataStore поруч із Coins. У 6.8 цілі зможуть вимагати збір з вищим Power. У 6.9 TTG1 порівняє дохід при Power 1 і Power 2.

| Було в 6.5 | Стає в 6.6 |
|-------------|------------|
| Різні монети через CoinValue | Той самий CoinValue * Power |
| giveCoins з базою | Одна формула з множником |
| Config тримає value | Config лишається чистою базою |
| Збір однаковий для всіх | Сильніший гравець заробляє швидше |

CoinValue - вага гирі, Power - важіль, яким ти її піднімаєш.

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

Power у leaderstats - паспорт сили, який не губиться при респавні.

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

giveCoins - єдина каса; множник не повинен стояти ще на вході й на виході.

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

апгрейд сили - як важіль на станку; крутить його серверний оператор, не напис на екрані.

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

монета носить цінник, гравець носить ранг сили.

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

playtest - ваги: спочатку гиря 5, потім важіль ×2.

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

Короткий ритуал: big при Power 1 → +Power → та сама big після респавну → різниця в Coins очевидна без лекції.

У 6.7 цей Power стане полем сейфу. Не йди далі, поки множник не видно в TAB і Output.

фінальний Save фіксує важіль, яким уже можна користуватись.

**Зроби зараз (3 хв):** пройди ритуал здачі й збережи Place під точною назвою.`,
      }
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
    }
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
      "Не приймай абсолютне Power з клієнтського FireServer без перевірок."
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
          "LocalScript, який сам пише Coins"
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
          "У назві Baseplate"
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
          "Щоб вимкнути HUD"
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
          "Бо base * 0 обнуляє всі нагороди"
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
          "final пише клієнт у TextLabel"
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
          "Поставити Coins у мінус"
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
          "Sign із SurfaceGui сам по собі"
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
          "leaderstats тоді заборонені"
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
          "Power стає числовим полем payload разом із Coins"
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
          "Два SpawnPoints"
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
          "Видалення анти-дубля"
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
          "Видаляти CoinValue Attribute"
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
          "Щоб замінити TAB"
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
          "Power Draft Final"
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
          "Анти-дубль можна вимкнути"
        ],
        correctAnswer: 0,
        explanation: "Різний Power дає вимірювану різницю Coins/min і TTG.",
      }
    ],
  },
};

export const ukLesson67 = {
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
    "Провести rejoin-тест і підготувати формат даних для цілей дня"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 45 з 92)",
        content: `У 6.6 ти додав Power і Attributes: під час однієї сесії гравець уже збирає Coins швидше. Сьогодні прогрес переживе вихід із гри. Ти збережеш серверні Coins і Power, потім доведеш результат через Stop - Play або rejoin.
У 6.8 payload зможе отримати activeId, progress і completed цілей дня. У 6.9 rejoin не повинен псувати заміри економіки, а в 6.10 стабільний restore стане пунктом Ship.

| Було в 6.6 | Стає в 6.7 |
|-------------|------------|
| Coins і Power живуть у сесії | Значення повертаються після rejoin |
| Сервер рахує нагороду | Сервер формує save payload |
| HUD показує поточні числа | HUD показує завантажені числа |
| Вихід обнуляє прогрес | DataStore зберігає стан |

leaderstats - робочий стіл, DataStore - закрита шафа між змінами.

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

ім'я store - номер сховища, UserId - номер особистої комірки.

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

payload - валіза на rejoin; бери потрібні числа, не пакуй цілий будинок.

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

сервер заповнює квитанцію зі своєї каси, а не переписує число з записки клієнта.

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

autosave - регулярне фото прогресу, не відео з кожного кадру.

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

autosave - плановий рейс, PlayerRemoving - останній автобус, BindToClose - евакуація будівлі.

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

rejoin - контрольне відкриття сейфа, а не віра в зелений print після Save.

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

формат payload - полиця з вільним місцем для наступної коробки.

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

фінальний Save Place фіксує не обіцянку, а перевірений маршрут даних туди й назад.

**Зроби зараз (3 хв):** покажи ментору числа до виходу й після rejoin, потім збережи Place під точною назвою.`,
      }
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
    }
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
      "Для Studio потрібні Publish і Enable Studio Access to API Services."
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
          "SetAsync після кожного touch"
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
          "Нове випадкове число при кожному вході"
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
          "Щоб перехопити помилку API й не зламати Script"
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
          "Видалити DataStore"
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
          "Із серверного leaderstats.Coins.Value"
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
          "Він замінює pcall"
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
          "Бо leaderstats тоді зникає"
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
          "Після будь-якої помилки API"
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
          "Щоб замінити DataStore key"
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
          "Чи ті самі Coins і Power відновилися після повторного входу"
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
          "Зберігати тільки з LocalScript"
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
          "Він повинен чекати task.wait усередині"
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
          "Щоб зберегти весь Character"
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
          "Копію DailyGoals Config для кожного гравця"
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
          "Lesson 6.7 - Sim DataStore"
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Save Lesson 6.7 - Sim DataStore.",
      }
    ],
  },
};

export const ukLesson68 = {
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
    "Підготувати вимірювану ціль для TTG1 у 6.9 і демо Ship у 6.10"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 46 з 92)",
        content: `У 6.7 ти навчився зберігати прогрес Simulator між сесіями. Сьогодні збір отримує напрям: гравець бачить конкретну ціль дня і розуміє, навіщо бігати між collectables. Без цього 6.9 не матиме TTG1, а Ship у 6.10 виглядатиме як безцільний збір.
| Було в 6.7 | Стає в 6.8 |
|------------|------------|
| Coins між сесіями | Навіщо збирати саме зараз |
| giveCoins як каса | Джерело progress цілі |
| HUD рахунку | Окремий GoalHUD місії |
| DataStore payload | Місце для activeId / completed пізніше |

монети - це кроки, а ціль дня - стрілка на карті.

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

questState - журнал виконання, а GoalHUD - лише його вітрина.

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

complete - це печатка в журналі, а не кнопка, яку можна жати щосекунди.

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

краще один чистий фінішний прапор, ніж лабіринт стрілок без фінішу.

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

таблиця - секундомір перед стартом забігу, а не спогад після фінішу.

**Зроби зараз (6 хв):** пройди рядки 1-4 і постав статуси.`,
      }
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
    }
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
      "Відхилений повторний touch не повинен рухати progress."
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
          "Лише ParticleEmitter на Spawn"
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
          "У SoundService"
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
          "Щоб створювати Terrain"
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
          "Щоб не видавати нагороду цілі повторно"
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
          "Текст не потрібен, якщо є Coins"
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
          "Лише після Stop Play"
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
          "Щоб Mouth працював у Tycoon"
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
          "Config неможливо require"
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
          "Баланс більше не потребує need"
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
          "Поточний progress і need у форматі X / N"
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
          "Перенести прогрес у LocalScript"
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
          "Бо need тоді стає рядком"
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
          "Ціль без need, лише з текстом"
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
          "Goals Draft Final"
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
          "Демо отримує напрям: збір → прогрес → complete"
        ],
        correctAnswer: 3,
        explanation: "Коротке демо потребує зрозумілої місії.",
      }
    ],
  },
};

export const ukLesson69 = {
  lessonId: "lesson-roblox-6-9",
  moduleId: "module-06",
  order: 9,
  title: "6.9 - Playtest економіка + VFX",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Виміряти Coins за хвилину та час до першої цілі Simulator",
    "Провести контрольовані зміни балансу через єдиний Config",
    "Перевірити вплив Power, анти-дубля, HUD і DataStore на результати тесту",
    "Додати короткий Sound і ParticleEmitter після підтвердженої нагороди",
    "Підготувати таблицю доказів і стабільний Save до фінального Ship Sim"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 47 з 92)",
        content: `У 6.8 ти додав цілі дня з table: гравець уже бачить, скільки треба зібрати та коли завдання завершене. Сьогодні ти перевіриш, чи ця ціль досяжна, чи Power справді корисний і чи нагорода відчувається. У 6.10 цей Simulator проходитиме фінальну рубрику Ship, тому зараз потрібні числа й факти, а не враження "ніби нормально".
| Вхід | Результат уроку |
|------|-----------------|
| Ціль дня з 6.8 | Відомий реальний час до complete |
| Config нагород і спавну | Перевірені значення без магічних чисел |
| Power | Виміряна різниця доходу |
| Серверний giveCoins | Чесний сигнал для VFX |

сьогодні ти не фарбуєш ваги, а перевіряєш, чи вони правильно зважують.

**Зроби зараз (3 хв):** випиши BaseReward, GoalNeed, SpawnCount, RespawnSeconds і своє значення Power.`,
      },
      {
        title: "Баланс - це темп рішень гравця",
        content: `Баланс Simulator не означає просто зробити все дорожчим. Гравець має швидко зрозуміти цикл, отримати перший результат і побачити причину продовжувати. Якщо перша ціль завершується за десять секунд, Power не встигає стати бажаним. Якщо вона потребує п'ятнадцять хвилин однакових дотиків, демо здається порожнім.

| Стан | Ознака | Що перевірити |
|------|--------|----------------|
| Надто швидко | Ціль complete після 1-2 зборів | GoalNeed, BaseReward |
| Надто повільно | За хвилину progress майже не рухається | Reward, SpawnCount, шлях |
| Power не відчувається | Дохід майже однаковий | Множник і формулу |
| Хаотично | Результати двох прогонів різняться в рази | Анти-дубль і spawn |
| Комфортно | Перша ціль приблизно за 60-180 с | Зафіксувати числа |

Орієнтир 60-180 секунд потрібен для навчального артефакту, а не для всіх комерційних ігор. Він дозволяє побачити progress, complete і feedback під час короткого playtest.

баланс задає ритм, у якому гравець встигає зрозуміти цикл.

**Зроби зараз (3 хв):** спрогнозуй TTG1 формулою GoalNeed / очікувані Coins за секунду, а потім перевір прогноз грою.`,
      },
      {
        title: "Метрики, які можна повторити",
        content: `Для цього уроку достатньо трьох основних метрик. **Coins/min** показує темп доходу за 60 секунд. **TTG1** - час від Spawn до завершення першої цілі. **Power ratio** порівнює дохід із Power 1 та підвищеним Power за однаковий час.

| Метрика | Старт | Стоп | Запис |
|---------|-------|------|-------|
| Coins/min | Перша керована дія | 60 секунд | Різниця Coins |
| TTG1 | Spawn або 0 progress | complete цілі | Секунди |
| Power ratio | Однакова сцена | 30 секунд | Coins Power 2 / Coins Power 1 |
| Duplicate rate | Перший touch одного Part | 2 секунди спаму | Кількість payout |

Не порівнюй один прогін на порожньому сервері з іншим, де ти шукав collectable двадцять секунд. Починай з того самого Spawn, використовуй той самий маршрут і не змінюй дві умови одночасно.

Для діагностики можна тимчасово додати \`print("reward", reward, os.clock())\` у серверний шлях нагороди. Перед здачею прибери шумні print або залиш лише корисні попередження.

без цифр playtest перетворюється на суперечку про смак.

**Зроби зараз (5 хв):** проведи базовий прогін на 60 секунд і запиши стартові Coins, фінальні Coins та кількість зібраних Parts.`,
      },
      {
        title: "Playtest-таблиця економіки",
        content: `Створи таблицю до зміни Config. Колонка "Очікування" фіксує гіпотезу, "Факт" - вимір, а "Вердикт" не дає сховати невдалий результат.

| # | Сценарій | Очікування | Факт | Вердикт |
|---|----------|-------------|------|---------|
| 1 | 60 с із Power 1 | Стабільний Coins/min | | |
| 2 | Перша ціль | TTG1 60-180 с | | |
| 3 | 30 с із Power 1 | Базовий дохід | | |
| 4 | 30 с із Power 2 | Помітно більший дохід | | |
| 5 | Спам одного collectable | Один payout | | |
| 6 | TAB проти HUD | Значення однакові | | |
| 7 | Complete цілі | Один complete | | |
| 8 | Rejoin | Очікуваний restore | | |
| 9 | 20 зборів із VFX | Без сміття й помилок | | |

Використовуй вердикти **ok**, **slow**, **fast**, **broken**. Broken має пріоритет над балансом: якщо одна монета платить тричі, Coins/min не описує справжню економіку.

таблиця фіксує матч так, щоб його можна було переглянути завтра.

**Зроби зараз (4 хв):** заповни очікування в усіх дев'яти рядках, не підглядаючи під майбутній факт.`,
      },
      {
        title: "Одна зміна - один висновок",
        content: `Після базового прогону обери одну причину невдалого темпу. Зміни одне поле Config, повтори той самий сценарій і запиши результат. Якщо одночасно змінити Reward, GoalNeed, SpawnCount і Power, ти не дізнаєшся, що саме допомогло.

| Було | Зміна | Стало | Висновок |
|------|-------|-------|----------|
| Reward 1, TTG1 420 с | Reward 1 -> 3 | TTG1 165 с | Нагорода була замала |
| GoalNeed 100, TTG1 165 с | GoalNeed 100 -> 75 | TTG1 118 с | Ціль підходить для демо |

Config може містити \`BaseReward = 3\` та \`GoalNeed = 75\`. Сервер читає ці значення, GoalHUD показує той самий GoalNeed, а collectable не зберігає ще одну копію числа в Script.

Зміна кольору монети не є балансною ітерацією. Зміна формули без повторного виміру теж не є доказом.

крути одну ручку, інакше не зрозумієш, що допомогло.

**Зроби зараз (6 хв):** зроби першу зміну Config, повтори відповідний рядок таблиці та запиши різницю у секундах або Coins.`,
      },
      {
        title: "Power повинен змінювати досвід",
        content: `Power потрібен не для красивого числа в leaderstats. Після підвищення гравець має відчути швидший progress. Перевір формулу на сервері й переконайся, що використовується актуальний Attribute або Value.

| Перевірка | Power 1 | Power 2 |
|-----------|---------|---------|
| Reward за базовий Part | 3 | 6 |
| Зборів до GoalNeed 60 | 20 | 10 |
| Орієнтовний час | Довший | Помітно коротший |

Коротка серверна формула: \`local reward = Config.BaseReward * power\`. Не бери power із довільного числа, надісланого клієнтом. Сервер читає власний стан гравця і сам обчислює payout.

Якщо Power 2 дає лише на 3% більше за Power 1, різниця може загубитися в маршруті та випадковому spawn. Якщо він дає у сто разів більше, перша ціль миттєво втрачає сенс. Зафіксуй фактичний ratio, не лише очікувану формулу.

Power має змінювати швидкість прогресу, а не лише цифру в TAB.

**Зроби зараз (5 хв):** проведи два 30-секундні прогони одним маршрутом і порівняй дохід.`,
      },
      {
        title: "Анти-дубль перед будь-яким висновком",
        content: `Touched може спрацювати від кількох частин персонажа. Якщо блокування відбувається після payout, одна сфера штучно підвищує Coins/min і скорочує TTG1. Такий "успішний баланс" зламається, щойно анти-дубль виправлять.

| Тест | Правильний результат |
|------|----------------------|
| Звичайний touch | Один payout |
| Стрибок на Part | Один payout |
| Стояти на Part 2 с | Без повторного payout |
| Два гравці одночасно | Один payout за визначеним сервером правилом |
| Respawn нового Part | Новий Part знову доступний |

Мінімальна послідовність: \`if collected then return end; collected = true\`. Блокування ставиться до зміни Coins, progress і VFX. Після цього предмет зникає або переходить у стан очікування respawn.

Окремо перевір autosave. SaveService не повинен додавати Coins під час збереження, а пізній load не має затирати вже отриману нагороду.

анти-дубль - пломба на вимірювальному приладі.

**Зроби зараз (4 хв):** проведи спам-тест одного collectable і звір кількість серверних print із фактичним приростом Coins.`,
      },
      {
        title: "VFX і SFX тільки після правди",
        content: `Juice робить збір читабельним: короткий звук підтверджує успіх, burst частинок позначає місце, а GoalHUD показує наслідок. Але feedback запускається лише після того, як сервер прийняв collectable та змінив Coins.

| Подія | Feedback |
|-------|----------|
| Успішний payout | Sound + ParticleEmitter:Emit |
| Повторний touch заблоковано | Без нагородного ефекту |
| Goal progress змінився | Коротке оновлення тексту |
| Goal complete | Один окремий complete-сигнал |
| Respawn предмета | Спокійний spawn-ефект |

Для короткого burst достатньо \`emitter:Emit(Config.CollectParticles)\`. Значення 12-20 частинок часто помітне без постійної хмари, але перевір його у своїй сцені. Sound має бути коротким і не перекривати наступний збір.

Якщо VFX працює в LocalScript через RemoteEvent, сервер надсилає подію лише після успішної нагороди. Клієнт не вирішує, чи був payout.

ефект - це квитанція після покупки, а не обіцянка до оплати.

**Зроби зараз (6 хв):** додай один Sound і один burst, потім порівняй успішний touch із заблокованим повтором.`,
      },
      {
        title: "Cleanup після двадцяти зборів",
        content: `Ефект, який виглядає добре один раз, може створити десятки невидалених Parts або Sounds. Проведи серію з двадцяти зборів і перевір Workspace, Folder **SimFx**, Output та плавність гри.

| Ризик | Симптом | Фікс |
|-------|---------|------|
| Enabled назавжди | Постійна хмара particles | Використати Emit(n) |
| Клон Sound не видаляється | Сотні об'єктів | Debris:AddItem |
| Fx Part лишається | Folder росте після кожного збору | Cleanup після Lifetime |
| Дуже довгий Sound | Звуки накладаються | Скоротити TimeLength або Volume |
| Помилка від Destroy | Код звертається до видаленого Part | Завершити роботу до cleanup |

Debris зручний для тимчасового якоря: \`Debris:AddItem(fxPart, 2)\`. Час має покривати Lifetime ParticleEmitter і тривалість Sound, але не залишати сміття на хвилини.

хороший феєрверк залишає спогад, а не купу коробок на сцені.

**Зроби зараз (4 хв):** виконай двадцять зборів, порахуй об'єкти в SimFx до й після очікування cleanup.`,
      },
      {
        title: "HUD, GoalHUD і DataStore після підкрутки",
        content: `Після зміни GoalNeed або BaseReward перевір усі місця, де гравець бачить числа. Якщо Config уже має GoalNeed 75, а текст каже "Збери 500", система технічно працює, але гравець отримує неправильне завдання.

| Система | Що має збігатися |
|---------|------------------|
| TAB і CoinsHUD | Поточні серверні Coins |
| GoalHUD | progress та актуальний GoalNeed |
| Complete | Умова progress >= GoalNeed |
| DataStore | Завантажені Coins без подвійної видачі |
| VFX | Лише підтверджений приріст |

Не вшивай текст цілі вручну в кілька TextLabels. Нехай UI отримує need із того самого table або серверного стану. Після rejoin перевір, чи GoalHUD одразу відобразив завантажений progress, а не чекає наступного збору.

Якщо API Services недоступні, познач rejoin як неперевірений. Не вигадуй зелений статус.

Config задає партитуру, а HUD і сервер мають грати одну мелодію.

**Зроби зараз (4 хв):** зміни тестовий GoalNeed, запусти Play і знайди кожне місце, де старе число ще видно.`,
      },
      {
        title: "Звіт ментору та підготовка Ship",
        content: `Звіт має поміститися у 30 секунд і містити вимірювані факти. Скажи: "Coins/min було 24, стало 51. TTG1 було 260 секунд, стало 112. Я змінив BaseReward і GoalNeed по одному. Power 2 дав приблизно подвійний дохід. Sound та particles запускаються після серверного payout".

| Показати | Не замінювати цим доказ |
|----------|-------------------------|
| Таблицю було - стало | "Мені так більше подобається" |
| Config із двома змінами | Випадкові числа у Scripts |
| Один успішний і повторний touch | Лише красивий burst |
| TAB, HUD і progress | Окремий скрін TextLabel |
| Чистий SimFx після серії | Один ідеальний збір |

У 6.10 ти не матимеш часу заново шукати причину дивного доходу. Фінальний Ship використає сьогоднішню таблицю як доказ передбачуваної економіки.

звіт - це чек із цифрами, а не рекламний плакат.

**Зроби зараз (3 хв):** підготуй чотири речення звіту й покажи таблицю без усного виправдання червоних рядків.`,
      },
      {
        title: "Чекліст здачі уроку 47",
        content: `Перед Save пройди весь список:

- [ ] Записані стартові значення BaseReward, GoalNeed, SpawnCount і Power.
- [ ] Є Coins/min за чесні 60 секунд.
- [ ] Є TTG1 у секундах і вердикт slow, fast, broken або ok.
- [ ] Power 1 та Power 2 перевірені однаковим маршрутом.
- [ ] Виконані дві зміни Config по одній із записом "було - стало".
- [ ] Одна сфера дає рівно один payout при спамі Touched.
- [ ] TAB, CoinsHUD і GoalHUD показують узгоджені числа.
- [ ] Sound та ParticleEmitter запускаються після успішного giveCoins.
- [ ] SimFx очищується після серії з двадцяти зборів.
- [ ] Complete цілі спрацьовує один раз.
- [ ] Стан rejoin перевірений або чесно позначений.
- [ ] Output не має червоних помилок під час тесту.
- [ ] Save: Lesson 6.9 - Sim Balance Juice.

Попереду 6.10 - Ship Sim. Туди переходить не просто красивий острів, а перевірена економіка, короткий feedback і таблиця, за якою можна повторити результат.

цей Save - генеральна репетиція перед відкриттям.

**Зроби зараз (3 хв):** закрий останній broken-рядок, повтори короткий прогін і збережи Place під точною назвою.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Одночасно змінюються Reward, GoalNeed, spawn і Power",
      explanation: "Після повторного тесту неможливо визначити, яка зміна вплинула на результат.",
      correctApproach: "Змінювати одне поле Config і повторювати той самий сценарій.",
    },
    {
      mistake: "Coins/min вимірюється до перевірки анти-дубля",
      explanation: "Повторні Touched штучно збільшують дохід і роблять баланс недійсним.",
      correctApproach: "Спочатку підтвердити один payout на один collectable.",
    },
    {
      mistake: "Power порівнюється на різних маршрутах і за різний час",
      explanation: "На результат впливає spawn та час пошуку, а не лише множник.",
      correctApproach: "Використати однаковий маршрут і тривалість для обох значень Power.",
    },
    {
      mistake: "VFX запускається на кожен локальний touch",
      explanation: "Ефект може спрацювати без серверної нагороди та дати неправдивий feedback.",
      correctApproach: "Надсилати сигнал VFX лише після успішного серверного payout.",
    },
    {
      mistake: "GoalHUD містить старе число після зміни Config",
      explanation: "Гравець бачить вимогу, яка не відповідає серверній умові complete.",
      correctApproach: "Читати GoalNeed з єдиного Config або підтвердженого серверного стану.",
    },
    {
      mistake: "Тимчасові Fx Parts і Sounds не видаляються",
      explanation: "Після серії зборів Workspace росте, а продуктивність погіршується.",
      correctApproach: "Використовувати Emit(n), Debris або явний cleanup після завершення ефекту.",
    }
  ],
  summary: "Ти виміряв темп Simulator, провів дві контрольовані зміни Config і підтвердив вплив Power. Нагородний VFX тепер запускається після серверної правди, а таблиця готує проєкт до Ship Sim.",
  practiceTask: {
    title: "Баланс економіки та juice збору (~30 хв)",
    difficulty: "intermediate",
    description: `### Part A - Базовий замір (8 хв)
1. Запиши BaseReward, GoalNeed, SpawnCount і Power.
2. Виміряй Coins/min, TTG1 і спам одного collectable.
3. Заповни факт і вердикт у playtest-таблиці.

### Part B - Дві ітерації та VFX (15 хв)
1. Зміни одне поле Config і повтори відповідний тест.
2. Запиши "було - стало", потім зроби другу окрему зміну.
3. Додай Sound і ParticleEmitter:Emit після серверного payout.
4. Перевір cleanup серією з двадцяти зборів.

### Part C - Контроль перед Ship (7 хв)
1. Порівняй Power 1 і Power 2 однаковим маршрутом.
2. Перевір TAB, CoinsHUD, GoalHUD, complete, Output і стан rejoin.
3. Збережи Place як **Lesson 6.9 - Sim Balance Juice**.`,
    hints: [
      "Секундомір телефона достатній, якщо старт і стоп кожного прогону однакові.",
      "Якщо один Part дає кілька payout, не балансуй числа до виправлення анти-дубля.",
      "Для VFX використовуй короткий burst, а не постійно ввімкнений ParticleEmitter.",
      "Після зміни GoalNeed перевір і серверну умову, і текст GoalHUD."
    ],
    optionalChallenge: "Додай у playtest-таблицю третій прогін і порахуй середній Coins/min, не змінюючи Config між спробами.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Який набір найкраще описує артефакт уроку 6.9?",
        options: [
          "Таблиця метрик без повторних тестів після зміни Config",
          "VFX на локальний touch без перевірки серверної нагороди",
          "Таблиця метрик, дві зміни Config, перевірки та VFX після payout",
          "Лише фінальний Coins/min без тесту Power і анти-дубля"
        ],
        correctAnswer: 2,
        explanation: "Урок потребує вимірюваного балансу та чесного feedback.",
      },
      {
        id: "q2",
        type: MC,
        question: "Що вимірює TTG1?",
        options: [
          "Час до завершення першої цілі",
          "Час cleanup одного Fx Part",
          "Інтервал між autosave",
          "Тривалість одного ParticleEmitter burst"
        ],
        correctAnswer: 0,
        explanation: "TTG1 означає time to first goal.",
      },
      {
        id: "q3",
        type: MC,
        question: "Чому під час однієї ітерації змінюють лише одне поле Config?",
        options: [
          "Щоб не повторювати playtest після зміни",
          "Щоб GoalHUD міг зберігати окреме число",
          "Щоб усі метрики автоматично стали зеленими",
          "Щоб визначити причину зміни результату"
        ],
        correctAnswer: 3,
        explanation: "Контрольована зміна дає зрозумілий висновок.",
      },
      {
        id: "q4",
        type: MC,
        question: "Що треба зробити до вимірювання Coins/min?",
        options: [
          "Змінити Reward і GoalNeed одночасно",
          "Підтвердити один payout на один collectable",
          "Виміряти Power на іншому маршруті",
          "Запустити VFX до серверної перевірки"
        ],
        correctAnswer: 1,
        explanation: "Без анти-дубля результат доходу буде штучно завищений.",
      },
      {
        id: "q5",
        type: MC,
        question: "Який орієнтир TTG1 використано для навчального демо?",
        options: [
          "Менше 10 секунд незалежно від GoalNeed",
          "Понад 15 хвилин без Power",
          "Приблизно 60-180 секунд",
          "Будь-який час, якщо HUD виглядає правильно"
        ],
        correctAnswer: 2,
        explanation: "Цей діапазон дозволяє показати повний цикл у короткому тесті.",
      },
      {
        id: "q6",
        type: MC,
        question: "Як коректно порівняти Power 1 і Power 2?",
        options: [
          "Змінити одночасно GoalNeed і spawn",
          "Пройти той самий маршрут за однаковий час",
          "Порівняти різні Places",
          "Оцінити лише колір HUD"
        ],
        correctAnswer: 1,
        explanation: "Однакові умови ізолюють вплив Power.",
      },
      {
        id: "q7",
        type: MC,
        question: "Хто має обчислювати reward з BaseReward і Power?",
        options: [
          "LocalScript, який першим побачив touch",
          "GoalHUD після зміни тексту",
          "Клієнтський RemoteEvent без перевірки",
          "Серверна логіка нагороди"
        ],
        correctAnswer: 3,
        explanation: "Сервер володіє цінністю та не довіряє клієнтському amount.",
      },
      {
        id: "q8",
        type: MC,
        question: "Коли запускається нагородний Sound і burst particles?",
        options: [
          "Після підтвердженого серверного payout",
          "Одразу до перевірки collected",
          "Після будь-якого локального touch, навіть відхиленого",
          "Під час respawn як заміна нагороди"
        ],
        correctAnswer: 0,
        explanation: "Feedback повинен підтверджувати реальну нагороду.",
      },
      {
        id: "q9",
        type: MC,
        question: "Що має статись при повторному touch уже зібраного Part?",
        options: [
          "Повторний payout без progress цілі",
          "Жодного нового payout і нагородного VFX",
          "VFX без payout для підтвердження touch",
          "Новий payout, якщо HUD ще не оновився"
        ],
        correctAnswer: 1,
        explanation: "Анти-дубль блокує і нагороду, і її feedback.",
      },
      {
        id: "q10",
        type: MC,
        question: "Навіщо проводити двадцять зборів із VFX?",
        options: [
          "Щоб оцінити баланс без перевірки Coins",
          "Щоб залишити всі Fx Parts для наступного прогону",
          "Щоб замінити тест анти-дубля тестом продуктивності",
          "Щоб знайти невидалені Fx Parts, Sounds і помилки"
        ],
        correctAnswer: 3,
        explanation: "Серія виявляє накопичення тимчасових об'єктів.",
      },
      {
        id: "q11",
        type: MC,
        question: "Звідки GoalHUD має брати актуальний GoalNeed?",
        options: [
          "З єдиного Config або серверного стану",
          "З окремого числа, вручну вписаного в кожен TextLabel",
          "З останнього локального touch незалежно від payout",
          "З попереднього Save без звірки з Config"
        ],
        correctAnswer: 0,
        explanation: "Одне джерело не дає UI розійтися із серверною умовою.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що означає вердикт broken у таблиці?",
        options: [
          "Темп трохи відрізняється від прогнозу, але цикл працює",
          "VFX потребує меншої кількості частинок",
          "Основна система нагороди або тесту не працює правильно",
          "Потрібен ще один контрольний прогін для середнього значення"
        ],
        correctAnswer: 2,
        explanation: "Broken треба виправити до висновків про баланс.",
      },
      {
        id: "q13",
        type: MC,
        question: "Що є коректним доказом балансної зміни?",
        options: [
          "Один прогін після кількох одночасних змін",
          "Запис метрики до і після однієї зміни Config",
          "Порівняння різних маршрутів без фіксації часу",
          "Оцінка лише за яскравістю VFX"
        ],
        correctAnswer: 1,
        explanation: "Порівнювані виміри показують реальний вплив.",
      },
      {
        id: "q14",
        type: MC,
        question: "Що робити, якщо rejoin не вдалося перевірити через API Services?",
        options: [
          "Чесно записати стан як неперевірений",
          "Вважати restore успішним за результатом HUD",
          "Змінити DataStore key і поставити статус ok без rejoin",
          "Замінити rejoin повторним touch-тестом"
        ],
        correctAnswer: 0,
        explanation: "Артефакт має відрізняти факт від припущення.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save для уроку 47?",
        options: [
          "Lesson 6.9 - Sim Ship",
          "Lesson 6.8 - Daily Goals Final",
          "Lesson 6.9 - Simulator VFX Only",
          "Lesson 6.9 - Sim Balance Juice"
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Save Lesson 6.9 - Sim Balance Juice.",
      }
    ],
  },
};

export const ukLesson610 = {
  lessonId: "lesson-roblox-6-10",
  moduleId: "module-06",
  order: 10,
  title: "6.10 - Ship Sim",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Зшити системи Simulator в один зрозумілий золотий шлях",
    "Перевірити серверне нарахування Coins, анти-дубль і синхронний HUD",
    "Провести playtest за таблицею та відокремити блокери від косметичних дефектів",
    "Підготувати коротке демо з ціллю дня, VFX і чесним прогресом",
    "Зберегти фінальний Place модуля та сформувати список покращень після релізу"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 48 з 92)",
        content: `Ти дійшов до фіналу модуля 6 - **Simulator**. У 6.9 ти перевіряв економіку, змінював числа в Config і додавав VFX після успішної нагороди. Сьогодні не час будувати другий острів або нову валюту. Мета - зшити готові системи в один короткий маршрут, який гравець розуміє без твоїх пояснень.
У наступному уроці почнеться модуль 7 - Tycoon. Там зміняться декорації та механіка заробітку, але правило залишиться: сервер володіє Coins, Config зберігає баланс, а клієнт показує результат.

| Було в 6.9 | Має бути після 6.10 |
|-------------|---------------------|
| Окремі заміри економіки | Один стабільний золотий шлях |
| VFX на тестовій нагороді | VFX тільки після справжнього payout |
| Список підозрілих місць | Таблиця з фактом і статусом |
| Налаштовані числа Config | Демо, що вкладається у 60-90 с |

ship - це не новий поверх будинку, а перевірка всіх дверей перед відкриттям.

**Зроби зараз (3 хв):** запиши одним реченням, що гравець робить від Spawn до завершення першої цілі.`,
      },
      {
        title: "Ship означає готовий цикл, а не ідеальну гру",
        content: `Ship Sim - це стан, коли основний цикл можна пройти від початку до кінця без ручної допомоги автора. Гравець бачить предмет збору, торкається його, отримує серверну нагороду, бачить однакове число в TAB і HUD, просуває ціль та отримує зрозумілий feedback. У фіналі він знає, що робити далі.

| Ship | Ще не ship |
|------|------------|
| Один завершений цикл | П'ять незавершених механік |
| Сервер змінює Coins | LocalScript малює вигадану нагороду |
| Ціль досяжна під час демо | Ціль потребує двадцять хвилин |
| Output без червоних помилок | Помилки названі "неважливими" |
| Дефекти записані й пріоритезовані | Автор виправляє випадкову косметику |

Не плутай polish із готовністю. Гарний ParticleEmitter не компенсує подвійний payout, а новий Sky не виправляє HUD, що відстає від leaderstats. Для здачі достатньо одного типу collectable, однієї валюти Coins і однієї цілі дня, якщо вони працюють разом.

одна ціла коротка дорога корисніша за десять красивих мостів без з'єднання.

**Зроби зараз (3 хв):** створи список P0, P1, P2. У P0 запиши лише те, що ламає збір, нагороду, ціль або запуск.`,
      },
      {
        title: "Карта систем у Explorer",
        content: `Перед playtest відкрий Explorer і знайди кожен вузол системи. Назви у твоєму Place можуть трохи відрізнятися, але відповідальність має бути очевидною.

| Місце | Приклад | Відповідальність |
|-------|---------|------------------|
| Workspace | Collectables, SpawnPoints | Видимі об'єкти та позиції |
| ReplicatedStorage | Config, Remotes | Спільні налаштування й канал подій |
| ServerScriptService | Leaderstats, CollectService, SaveService | Серверна правда та DataStore |
| StarterGui | CoinsHUD, GoalHUD | Відображення рахунку й цілі |
| StarterPlayerScripts | HUDController | Клієнтська реакція на серверні дані |

Config не повинен дублюватися в різних Scripts. Якщо BaseReward дорівнює 5 у ModuleScript, не пиши окреме число 5 у CollectService і GoalHUD. HUD читає прогрес, але не вирішує розмір нагороди. Folder **Collectables** містить предмети, а не серверну бізнес-логіку.

Швидка перевірка Lua: \`local Config = require(ReplicatedStorage:WaitForChild("Config"))\`. WaitForChild доречний на межі завантаження, але він не виправляє неправильне ім'я Folder.

Explorer - це карта міста, де кожна служба повинна мати одну адресу.

**Зроби зараз (4 хв):** покажи пальцем Config, серверний giveCoins, CoinsHUD і Collectables. Якщо шукаєш довше десяти секунд - перейменуй нечіткі об'єкти.`,
      },
      {
        title: "Золотий шлях гравця",
        content: `Золотий шлях - це найкоротша послідовність дій, яка демонструє цінність Simulator. Для цього уроку він має складатися з 6-8 кроків і вкладатися у 60-90 секунд.

| Крок | Дія гравця | Видимий доказ |
|------|-------------|---------------|
| 1 | З'являється на Spawn | Бачить інструкцію та collectable |
| 2 | Підходить до предмета | Розуміє, що його можна зібрати |
| 3 | Торкається предмета | Предмет блокується або зникає |
| 4 | Отримує Coins | TAB і HUD показують те саме |
| 5 | Бачить juice | Звук або particles йдуть після payout |
| 6 | Повторює збір | GoalHUD показує прогрес |
| 7 | Досягає цілі | Є complete-стан без повторної нагороди |
| 8 | За потреби робить rejoin | Збереження поводиться передбачувано |

Початкова табличка може містити три короткі команди: "Збирай сфери", "Підвищуй Coins", "Закрий ціль 25 Coins". Не пояснюй архітектуру гравцеві. Йому потрібна дія, напрям і результат.

золотий шлях - це трейлер, яким керує сам гравець.

**Зроби зараз (4 хв):** пройди маршрут без Explorer і без Command Bar. Запиши місце першої паузи або непорозуміння.`,
      },
      {
        title: "Серверна каса в рубриці Ship",
        content: `У 6.9 ти вже вимірював серверний payout. Сьогодні інша задача: довести, що каса, HUD і ціль працюють **в одному Place під час демо**, без ручних костилів. Шукай усі \`Coins.Value =\` і \`Coins.Value +=\` у LocalScript - для Ship це блокер рубрики, навіть якщо цифри "гарні".

| Перевірка Ship | Зелений результат |
|----------------|-------------------|
| Пошук клієнтського запису Coins | Немає |
| Один збір у демо | TAB і HUD збігаються |
| giveCoins друкує reward | Число = Config * Power |
| FireClient Fx | Лише після успішного payout |

Коротка серверна форма: \`coins.Value += Config.BaseReward * power.Value\`. Клієнт лишається вітриною: \`RewardFx:FireClient(player, reward)\` після підтвердження.

на Ship каса або відкрита і чесна, або демо скасовується.

**Зроби зараз (5 хв):** зроби один збір перед ментором і покажи Script, який реально змінив Coins.`,
      },
      {
        title: "Анти-дубль як пункт рубрики",
        content: `Ти вже ставив collected у 6.4 і перевіряв його в 6.9. Для Ship достатньо довести факт: один Part = один payout під час живого демо. Якщо прапорець стоїть після Sound, рубрика чесності падає навіть при правильному Config.

| Крок демо | Що дивиться ментор |
|-----------|--------------------|
| Стрибок на Part | Один приріст Coins |
| Стояти 2 с | Без другого payout |
| Повторний touch | Без нагородного Fx |
| Respawn | Новий Part знову платить один раз |

Мінімум логіки лишається: \`if collected then return end; collected = true\` **до** зміни Coins. Не переписуй систему - закрий дірку і зафіксуй рядок у таблиці як "так".

анти-дубль на Ship - це печатка на чеку перед показом залу.

**Зроби зараз (4 хв):** прогони три сценарії з таблиці й постав статуси в рубрику.`,
      },
      {
        title: "HUD і ціль у 90-секундному демо",
        content: `Ship не просить новий GoalHUD. Він просить, щоб існуючий HUD і ціль читались очима новачка за хвилину. Need має бути досяжним за 5-7 зборів; інакше демо зависає на півдорозі й приховує complete.

| Сигнал | Що має бути видно за 90 с |
|--------|---------------------------|
| Старт | Coins на екрані без TAB-ритуалу |
| Збір | HUD реагує одразу |
| Progress | GoalHUD рухається |
| Complete | Один помітний фінал |
| Rejoin lite | Чесний статус у рубриці |

Підписка вже була в 6.3: \`coins:GetPropertyChangedSignal("Value"):Connect(render)\` плюс перший render одразу. Сьогодні лише перевір, що вона жива в інтегрованому Place.

демо - це трейлер, у якому глядач сам натискає "Play".

**Зроби зараз (5 хв):** зменш need для демо, якщо треба, і пройди шлях до complete без Explorer.`,
      },
      {
        title: "Playtest-таблиця замість тесту з пам'яті",
        content: `Playtest без запису швидко перетворюється на "здається, працює". Створи таблицю до натискання Play. В очікуванні пиши конкретний вимірюваний результат, а у факті - число, повідомлення Output або поведінку.

| # | Дія | Очікування | Факт | Статус |
|---|-----|-------------|------|--------|
| 1 | Play | Spawn, інструкція, 3+ collectables | | |
| 2 | Перший touch | +5 Coins один раз | | |
| 3 | Стояти на Part | Немає другого payout | | |
| 4 | Перевірити TAB/HUD | Однакові числа | | |
| 5 | Дійти до need | Complete рівно один раз | | |
| 6 | Перевірити Fx | Після серверної нагороди | | |
| 7 | Дочекатися respawn | Новий Part збирається | | |
| 8 | Stop і Play | Очікувана load-поведінка | | |
| 9 | Переглянути Output | Немає червоних помилок | | |

Не змінюй очікування після провалу, щоб тест став зеленим. Якщо Config каже BaseReward 5, а факт +10 без Power, це дефект або неврахований множник.

таблиця - чорна скринька польоту, а не декоративний щоденник.

**Зроби зараз (6 хв):** виконай рядки 1-5 без паузи на редагування й познач перший червоний статус.`,
      },
      {
        title: "Пріоритети дефектів і короткий цикл фіксу",
        content: `Після тесту не виправляй усе поспіль. P0 блокує запуск або чесну нагороду. P1 ламає розуміння циклу чи важливий feedback. P2 - косметика, яку можна відкласти.

| Рівень | Приклад | Рішення сьогодні |
|--------|---------|------------------|
| P0 | Coins змінює LocalScript | Виправити до здачі |
| P0 | Одна сфера платить тричі | Виправити анти-дубль |
| P0 | Goal complete не настає | Виправити умову або progress |
| P1 | HUD оновлюється із затримкою | Виправити підписку |
| P1 | Неясно, що збирати | Додати короткий onboarding |
| P2 | ParticleEmitter завеликий | Записати на потім |
| P2 | Колір другого острова слабкий | Не розширювати scope |

Цикл фіксу короткий: відтворити - знайти власника системи - змінити одну причину - повторити той самий рядок таблиці - пройти сусідні рядки. Після виправлення giveCoins повтори анти-дубль, HUD і ціль, бо вони залежать від нагороди.

спочатку закрий пробоїну в човні, потім поліруй поручні.

**Зроби зараз (5 хв):** вибери один P0, запиши точні кроки відтворення і перевір його двічі після фіксу.`,
      },
      {
        title: "Juice в рубриці polish",
        content: `У 6.9 juice уже мав іти після giveCoins. Для Ship покажи це в демо: іскри й звук з'являються в той самий момент, що й приріст Coins. Якщо блиск є, а TAB стоїть - пункт polish червоний.

| Подія під час демо | Feedback |
|--------------------|----------|
| Успішний payout | Один короткий Sound + burst |
| Відхилений повтор | Тиша |
| Complete цілі | Окремий сигнал, не той самий collect-звук |
| Respawn | Спокійний ефект без нагородного дзвону |

Не роздувай ParticleEmitter: ментору важливіше побачити синхрон "дзинь + +5", ніж феєрверк на пів карти. Cleanup з 6.9 має лишитись: після демо Folder SimFx не росте.

polish на Ship - це аплодисменти після гола, який вже зарахували.

**Зроби зараз (3 хв):** один успішний і один заблокований touch на очах у таймері демо.`,
      },
      {
        title: "Репетиція демо і рішення про DataStore",
        content: `Демо - це не екскурсія по Explorer. Почни з Play і покажи досвід очима гравця: Spawn, інструкцію, збір, синхронний рахунок, progress цілі, complete і Output. Лише після цього, якщо ментор запитає, відкрий серверний Script або Config.

| Час | Що показати |
|-----|-------------|
| 0-15 с | Spawn та зрозумілу ціль |
| 15-45 с | Кілька зборів, TAB/HUD, juice |
| 45-70 с | Досягнення complete |
| 70-90 с | Чистий Output і короткий висновок |

DataStore бажаний, бо він був темою 6.7, але не приховуй його стан. Якщо API Services недоступні або save ще нестабільний, познач перевірку "майже" і не стверджуй, що rejoin працює. Основний локальний цикл усе одно повинен бути чесним і завершеним. Якщо DataStore увімкнений, тестуй завантаження в опублікованому тестовому Place з безпечним ключем, а не нескінченно перезаписуй production-дані.

репетиція - це стискання години роботи в одну зрозумілу хвилину.

**Зроби зараз (4 хв):** увімкни таймер і проведи демо без переходу в Edit. Запиши секунду, де виникла пауза.`,
      },
      {
        title: "Чекліст здачі та місток до Tycoon",
        content: `Перед завершенням пройди список зверху вниз. Один невиконаний P0 означає, що треба повернутися до фіксу, а не ставити нові декорації.

- [ ] У Place є один золотий шлях на 6-8 кроків.
- [ ] Folder Collectables і Config мають зрозумілі назви.
- [ ] Coins змінюються тільки серверною логікою.
- [ ] Одна монета дає одну нагороду навіть при кількох Touched.
- [ ] TAB і CoinsHUD показують однакове значення.
- [ ] GoalHUD рухається від підтверджених Coins і завершується один раз.
- [ ] Sound та ParticleEmitter запускаються після успішної нагороди.
- [ ] Playtest-таблиця містить очікування, факт і статус.
- [ ] P0 закриті, P2 записані в список після релізу.
- [ ] Демо вкладається у 60-90 секунд без суфлера.
- [ ] Output чистий під час повного циклу.
- [ ] Стан DataStore позначений чесно.
- [ ] Save: Lesson 6.10 - Sim Ship.

У модулі 7 Tycoon collectable зміниться на dropper і collector, але архітектурна звичка залишиться. Сервер нараховує Coins, Config керує числами, HUD показує одну правду, а playtest перевіряє маршрут гравця.

фінальний Save - це контрольна точка перед переходом на нову карту курсу.

**Зроби зараз (3 хв):** збережи Place під точною назвою, закрий останній P0 і покажи ментору демо.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Coins збільшуються в LocalScript разом з анімацією HUD",
      explanation: "Клієнт стає джерелом цінності, а TAB, HUD і сервер можуть показувати різні числа.",
      correctApproach: "Нараховувати Coins у серверному giveCoins, а LocalScript використовувати лише для відображення.",
    },
    {
      mistake: "Прапорець collected встановлюється після зміни Coins",
      explanation: "Кілька одночасних Touched встигають пройти перевірку та видати повторну нагороду.",
      correctApproach: "Заблокувати collectable до обчислення та видачі payout.",
    },
    {
      mistake: "GoalHUD сам рахує локальні дотики",
      explanation: "Відхилений сервером touch усе одно рухає клієнтську ціль.",
      correctApproach: "Будувати progress цілі на підтвердженому серверному значенні.",
    },
    {
      mistake: "VFX запускається до успішного giveCoins",
      explanation: "Гравець отримує нагородний сигнал навіть тоді, коли Coins не змінилися.",
      correctApproach: "Запускати Sound і particles після серверного підтвердження нагороди.",
    },
    {
      mistake: "Після кожного фіксу тестується лише змінена кнопка",
      explanation: "Зміна нагороди може зламати HUD, ціль, анти-дубль або DataStore.",
      correctApproach: "Повторювати рядок дефекту та сусідні залежні рядки playtest-таблиці.",
    },
    {
      mistake: "Перед здачею будується новий острів",
      explanation: "Scope росте, а критичні дефекти готового циклу залишаються.",
      correctApproach: "Закрити P0 і P1 одного MVP-циклу, а розширення записати в backlog.",
    }
  ],
  summary: "Ти зшив системи Simulator в один чесний золотий шлях, перевірив його таблицею та підготував коротке демо. Фінальний Save фіксує готовий модуль перед переходом до Tycoon.",
  practiceTask: {
    title: "Ship Sim: інтеграція, playtest і демо (~30 хв)",
    difficulty: "intermediate",
    description: `### Part A - Карта й тест (8 хв)
1. Запиши золотий шлях на 6-8 кроків.
2. Знайди в Explorer Collectables, Config, серверний giveCoins, CoinsHUD і GoalHUD.
3. Заповни очікування у playtest-таблиці та виконай перші п'ять рядків.

### Part B - Фікси й повторна перевірка (15 хв)
1. Закрий перший P0 у серверній нагороді, анти-дублі, HUD або цілі.
2. Повтори рядок дефекту двічі та перевір залежні рядки.
3. Переконайся, що juice запускається лише після успішного payout.
4. Пройди ціль до complete й перевір Output.

### Part C - Ship (7 хв)
1. Проведи демо на 60-90 секунд без Explorer і підказок.
2. Чесно познач стан DataStore та запиши P2 у backlog.
3. Збережи Place як **Lesson 6.10 - Sim Ship**.`,
    hints: [
      "Спочатку порівняй TAB і HUD після одного збору, а вже потім перевіряй VFX.",
      "Якщо одна монета платить двічі, став блокування до зміни Coins.",
      "Для демо зменш need у Config так, щоб complete настав за 5-7 зборів.",
      "Після серверного фіксу повтори перевірки анти-дубля, GoalHUD і Output."
    ],
    optionalChallenge: "Додай одноразовий complete-банер, який отримує підтверджений стан цілі та не видає додаткові Coins.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Що є головним артефактом уроку 6.10?",
        options: [
          "Окремий Place лише для VFX",
          "Скріншот Explorer без Play",
          "Один Place з повним циклом, playtest-таблицею та коротким демо",
          "Новий острів без систем нагороди"
        ],
        correctAnswer: 2,
        explanation: "Ship перевіряє інтегрований цикл у одному Place.",
      },
      {
        id: "q2",
        type: MC,
        question: "Який дефект має пріоритет P0?",
        options: [
          "Одна сфера видає Coins кілька разів",
          "ParticleEmitter трохи завеликий",
          "Колір другорядної монети неідеальний",
          "Ambient можна зробити теплішим"
        ],
        correctAnswer: 0,
        explanation: "Повторний payout ламає чесність циклу.",
      },
      {
        id: "q3",
        type: MC,
        question: "Де має змінюватися значення Coins?",
        options: [
          "У TextLabel всередині CoinsHUD",
          "У локальному скрипті collectable",
          "У ParticleEmitter після burst",
          "У серверній логіці giveCoins"
        ],
        correctAnswer: 3,
        explanation: "Сервер є джерелом правди для цінності.",
      },
      {
        id: "q4",
        type: MC,
        question: "Коли слід установити collected або інше блокування?",
        options: [
          "Після завершення Sound",
          "До зміни Coins і запуску нагороди",
          "Після другого Touched",
          "Після respawn предмета"
        ],
        correctAnswer: 1,
        explanation: "Раннє блокування зупиняє паралельні Touched.",
      },
      {
        id: "q5",
        type: MC,
        question: "Що має показати перевірка TAB і CoinsHUD?",
        options: [
          "HUD завжди на 10 Coins більший",
          "TAB оновлюється лише після Stop",
          "Однакове серверне значення після кожного збору",
          "Кожен інтерфейс веде власний рахунок"
        ],
        correctAnswer: 2,
        explanation: "Обидва інтерфейси дзеркалять одну серверну правду.",
      },
      {
        id: "q6",
        type: MC,
        question: "Яке значення need найкраще для фінального демо?",
        options: [
          "Таке, що потребує щонайменше години",
          "Нуль, щоб ціль завершилась без гри",
          "Випадкове значення поза Config",
          "Досяжне приблизно за 5-7 зборів"
        ],
        correctAnswer: 3,
        explanation: "Глядач має побачити progress і complete за 60-90 с.",
      },
      {
        id: "q7",
        type: MC,
        question: "Яка роль GoalHUD у готовому Simulator?",
        options: [
          "Самостійно видавати Coins",
          "Показувати прогрес підтвердженої сервером цілі",
          "Визначати BaseReward замість Config",
          "Створювати collectables у Workspace"
        ],
        correctAnswer: 1,
        explanation: "GoalHUD відображає прогрес і не створює цінність.",
      },
      {
        id: "q8",
        type: MC,
        question: "Коли нагородний Sound або particles мають запускатися?",
        options: [
          "Одразу при будь-якому Touched",
          "Під час завантаження Config",
          "Після підтвердженого серверного payout",
          "На кожному відхиленому повторному touch"
        ],
        correctAnswer: 2,
        explanation: "Juice підтверджує справжню нагороду.",
      },
      {
        id: "q9",
        type: MC,
        question: "Навіщо в playtest-таблиці окремі колонки «Очікування» і «Факт»?",
        options: [
          "Щоб не запускати Play",
          "Щоб порівняти вимогу з реальною поведінкою",
          "Щоб замінити Output",
          "Щоб записувати лише назви кольорів"
        ],
        correctAnswer: 1,
        explanation: "Різниця між очікуванням і фактом робить дефект видимим.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що робити одразу після виправлення giveCoins?",
        options: [
          "Будувати новий острів",
          "Видалити playtest-таблицю",
          "Перенести Coins у LocalScript",
          "Повторити тест нагороди, анти-дубля, HUD і цілі"
        ],
        correctAnswer: 3,
        explanation: "Залежні системи треба перевірити після зміни каси.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що робити, якщо DataStore у фінальному тесті ще нестабільний?",
        options: [
          "Чесно позначити стан «майже» та зберегти робочий локальний цикл",
          "Приховати проблему від ментора",
          "Стверджувати, що rejoin працює без тесту",
          "Перенести всю нагороду на клієнт"
        ],
        correctAnswer: 0,
        explanation: "Стан save описують чесно, не ламаючи основний цикл.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що не потрібно показувати першим у демо 6.10?",
        options: [
          "Spawn та інструкцію",
          "Збір і синхронний рахунок",
          "Довгу екскурсію по всіх Scripts в Explorer",
          "Завершення цілі"
        ],
        correctAnswer: 2,
        explanation: "Демо починається з досвіду гравця.",
      },
      {
        id: "q13",
        type: MC,
        question: "Що слід зробити з косметичним дефектом P2 перед здачею?",
        options: [
          "Зупинити весь playtest на годину",
          "Записати в backlog і спочатку закрити P0 та P1",
          "Замінити ним перевірку серверної каси",
          "Оголосити його критичним без відтворення"
        ],
        correctAnswer: 1,
        explanation: "Косметика не блокує Ship, якщо P0 і P1 закриті.",
      },
      {
        id: "q14",
        type: MC,
        question: "Яка точна назва фінального збереження?",
        options: [
          "Lesson 6.9 - Sim Balance Juice",
          "Lesson 7.1 - Tycoon Plot",
          "Simulator Final Draft",
          "Lesson 6.10 - Sim Ship"
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Save Lesson 6.10 - Sim Ship.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка звичка з 6.10 переходить у модуль Tycoon?",
        options: [
          "Кожен HUD зберігає власні Coins",
          "Клієнт визначає вартість нагороди",
          "Сервер володіє Coins, Config числами, HUD відображенням",
          "Playtest потрібен лише для Simulator"
        ],
        correctAnswer: 2,
        explanation: "Розподіл відповідальності лишається корисним у Tycoon.",
      }
    ],
  },
};
