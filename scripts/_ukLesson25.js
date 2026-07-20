export const ukLesson25 = {
  lessonId: "lesson-roblox-4-5",
  moduleId: "module-04",
  order: 5,
  title: "4.5 - ModuleScript + Config",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Створити ModuleScript Config з return table балансу/каталогу",
    "Підключити Config через require щонайменше з двох серверних Scripts",
    "Прибрати магічні числа цін/параметрів із кнопок у єдине джерело",
    "Пояснити, куди класти Config (ReplicatedStorage vs ServerStorage) і хто читає",
    "Підготувати єдину правду даних до DataStore lite у 4.6 і вітрини у 4.7",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 25 з 92)",
        content: `У **4.4** ти вже зібрав масив записів. Сьогодні виносиш правду даних у **ModuleScript Config**. Це не урок «власна ділянка гравця» і не plot OwnerUserId. Жанр дня - **одне місце балансу**, яке читають кілька Scripts.

Без Config модуль Tables розвалюється: ціна в кнопці, інша в GUI, третя в коментарі. З Config змінюєш число один раз - поведінка світу йде за ним.

Артефакт уроку:
1. ModuleScript \`Config\` (точна або близька назва).
2. \`return { ... }\` з цінами / каталогом / константами курсу.
3. Мінімум два Scripts роблять \`require\` того самого Config.
4. Демо: зміна значення в Config змінює поведінку без пошуку по Place.
5. Короткий коментар зверху: як додати новий параметр.
6. Save **Lesson 4.5 - ModuleScript Config**.

| Старий слот | Тема prod-92 |
|-------------|--------------|
| Власна ділянка гравця | ModuleScript + Config |
| OwnerUserId / claim plot | Єдина правда table-даних |
| Multiplayer plots QA | require з кількох Scripts |

Метафора: Config - щит із правилами турніру. Судді (Scripts) не вигадують рахунок у кожному кутку арени - читають один щит.

**Зроби зараз (2 хв):** Save Place як Lesson 4.5 - ModuleScript Config і створи ModuleScript \`Config\`.`,
      },
      {
        title: "Навіщо ModuleScript, а не копіпаст",
        content: `Звичайний Script виконується сам. ModuleScript **віддає значення** через \`return\`, а інші файли забирають його \`require\`.

Проблема копіпасту:
- \`PRICE_APPLE = 5\` у трьох Scripts
- змінив в одному - забув у двох
- вітрина й покупка роз'їхались

Проблема «однієї гігантської простирадла»:
- важко знайти баланс серед логіки Touched
- страх чіпати числа
- складніше здавати checkpoint

Config відділяє **дані** від **поведінки**. Scripts лишаються тонкими: прочитали → зробили.

Це та сама дисципліна, що знадобиться в Obby (5.x) для hazards/platforms і в Simulator для економік. Сьогодні ставиш звичку на маленькому каталозі.

**Зроби зараз (3 хв):** знайди в Place хоч одне магічне число ціни/ліміту й випиши його ім'я для Config (наприклад Prices.Apple).`,
      },
      {
        title: "Скелет Config: return table",
        content: `Типова форма:

\`local Config = {
  Prices = {
    Apple = 5,
    Gem = 25,
  },
  Catalog = {
    { id = "apple", name = "Apple", price = 5, power = 1 },
    { id = "gem", name = "Gem", price = 25, power = 3 },
  },
  SaveKeyPrefix = "SmartCode_M4_",
  MaxBagSize = 20,
}

return Config\`

Правила:
- останній рядок модуля - \`return\`
- не клади Instance у Config «про всяк випадок»
- імена ключів стабільні (Apple ≠ apple, якщо не домовився)
- тримай секції: Prices, Catalog, Limits, Meta

Можна почати лише з Prices. До кінця уроку бажано мати щонайменше дві секції, щоб require був осмислений для різних Scripts.

Не виконай важку логіку на рівні модуля (чекати гравців, спавнити Parts у момент require) - лише дані й чисті функції-хелпери за потреби.

**Зроби зараз (6 хв):** заповни Config мінімум 2 секціями й \`return Config\`.`,
      },
      {
        title: "require: як підключити",
        content: `З серверного Script:

\`local Config = require(path.to.Config)\`
\`print(Config.Prices.Apple)\`

\`path.to.Config\` - це Instance ModuleScript у дереві (часто \`game.ReplicatedStorage.Config\` або через \`script.Parent\`).

Важливо:
- require того самого ModuleScript повертає **один і той самий** table (кеш)
- зміна поля в runtime з одного Script видима іншим (обережно!)
- для навчального балансу краще змінювати значення в редакторі й робити Play заново

Перевір з двох Scripts:
1. \`PriceDemo\` друкує Prices
2. \`CatalogDemo\` друкує #Catalog або перший id

Якщо один require падає - перевір розташування ModuleScript і чи немає циклічних require A↔B.

**Зроби зараз (5 хв):** зроби require у двох Scripts і print різних полів Config.`,
      },
      {
        title: "Де живе Config: ReplicatedStorage vs ServerStorage",
        content: `| Місце | Хто бачить | Коли доречно |
|-------|------------|--------------|
| ReplicatedStorage | Сервер і клієнт | Каталог/підписи, які UI може читати |
| ServerStorage | Лише сервер | Секретні коефіцієнти, анти-чіт правди |

На 4.5 для курсу часто зручний **ReplicatedStorage.Config**: LocalScript може намалювати ціну, а сервер усе одно валідує покупку.

Правило безпеки:
- клієнтський підпис = підказка
- серверний require + canAfford = правда
- ніколи не вір, що клієнт «уже перевірив Config»

Якщо кладеш Config у ServerStorage - GUI отримує ціни через Remote або репліковані підписи, які сервер виставив.

Не розмножуй \`ConfigClient\` і \`ConfigServer\` з різними числами. Одна правда. Різний лише доступ.

**Зроби зараз (3 хв):** поклади Config у вибране місце й запиши в коментарі, чому саме воно.`,
      },
      {
        title: "Прибрати магічні числа",
        content: `Ритуал рефакторингу:

1. Знайди \`if coins >= 5 then\` / \`Prompt.ActionText = "5"\`
2. Заміни на \`Config.Prices.Apple\` або \`item.price\` з Catalog
3. Play: поведінка та сама
4. Зміни в Config 5 → 7
5. Play: поведінка нова **без** правок логіки Script

Якщо крок 5 вимагає правити ще три файли - рефакторинг не завершений.

Типові місця магії:
- ціни покупок
- ліміт розміру bag (MaxBagSize)
- debounce секунди (можна теж у Config.Timing)
- імена store prefix для майбутнього 4.6

Не треба виносити абсолютно все. \`local DEBOUNCE = 0.2\` поруч із Touched інколи ок. Винось те, що **балансиш і здаєш**.

**Зроби зараз (7 хв):** прибери щонайменше 2 магічні числа в require-поля; виконай тест зміни Config.`,
      },
      {
        title: "Чисті хелпери в Config (опційно)",
        content: `Іноді зручно:

\`function Config.canAfford(coins, itemId)
  local price = Config.Prices[itemId]
  return price ~= nil and coins >= price
end\`

Або пошук у Catalog за id. Це все ще дані+чиста логіка без Touched.

Переваги:
- одна перевірка для вітрини й тестових кнопок
- менше дублікатів canAfford

Не перетворюй Config на «бог-модуль» з половиною гри. Якщо з'явились Remotes, спавн Parts, DataStore - це вже окремі Scripts, які лише читають Config.

Межа: Config знає **що коштує** і **які товари є**. PurchaseService знає **коли** списувати.

**Зроби зараз (4 хв):** додай один хелпер (canAfford або findById) і виклич його з Script покупки/демо.`,
      },
      {
        title: "Config і масив записів з 4.4",
        content: `4.4 дав форму \`{{ id=, price=, power= }}\`. 4.5 дає цій формі **дім**.

Рекомендація:
- Catalog у Config = масив записів
- Prices або дублює коротко, або рахується з Catalog (обери одне)

Антипатерн: Catalog у Script A, Prices у Script B, «майже ті самі» числа. На здачі покажи один ModuleScript.

Вітрина 4.7 буде циклом по \`Config.Catalog\`. Якщо сьогодні Catalog вже в Config - бос стартує з половини готового фундаменту.

**Зроби зараз (3 хв):** перенеси масив записів у Config.Catalog, якщо він ще лежить у звичайному Script.`,
      },
      {
        title: "Що не входить у 4.5",
        content: `| Не тема | Куди |
|---------|------|
| Власні ділянки / OwnerUserId | Застарілий слот; не здаємо |
| Повний DataStore Get/Set | 4.6 |
| Цикл будівництва всієї вітрини | 4.7 |
| Claim plot на PlayerAdded | Не мета Config |

Можеш лишити старий plot-макет у Legacy-папці. Оцінюють ModuleScript, require і тест зміни числа.

Не витрачай урок на ідеальний UI магазину. Достатньо print і однієї покупки/перевірки canAfford, що читає Config.

**Зроби зараз (2 хв):** познач Legacy-контент ділянок, щоб не плутати зі здачею Config.`,
      },
      {
        title: "Помилки require і як їх читати",
        content: `Часті повідомлення:

| Симптом | Ймовірна причина |
|---------|------------------|
| Infinite yield possible | Чекаєш Instance, якого немає |
| Module code did not return exactly one value | Забув return / повернув нічого |
| Requested module experienced an error | Синтаксис усередині Config |
| Циклічний require | A requires B, B requires A |

Дебаг:
1. Відкрий Config окремо - чи є червоні підкреслення
2. Print на першому рядку модуля (тимчасово) - чи взагалі виконується
3. Перевір шлях require
4. Прибери циклічні залежності

Не ховай помилку порожнім \`pcall(require)\` без print. Спочатку навчись бачити причину.

**Зроби зараз (3 хв):** навмисно зламай шлях require, подивись помилку, поверни правильний шлях.`,
      },
      {
        title: "Демо для викладача (2 хвилини)",
        content: `Сценарій здачі:

1. Відкрий Config: покажи Prices/Catalog
2. Відкрий Script A: рядок require
3. Відкрий Script B: той самий require
4. Зміни Apple з 5 на 8
5. Play: print/canAfford показує 8
6. Поверни 5 або залиш як є за домовленістю

Говори: «єдина правда», «не ділянка гравця», «підготовка до сейву й вітрини».

Якщо демо довше 3 хвилин через пошук файлів - перейменуй і розклади Folder \`Data\`.

**Зроби зараз (4 хв):** прожени сценарій 1-5 один раз уголос.`,
      },
      {
        title: "Міст до 4.6 DataStore lite",
        content: `Завтра сейвитимеш прогрес гравця, не Config. Уже сьогодні поклади в Config префікс імені store або \`SaveKeyPrefix\` - щоб 4.6 не вигадував рядок наново в трьох місцях.

Пам'ятай розділення:
- Config = правила світу (ціни, каталог, ліміти)
- DataStore = прогрес гравця (coins, bag, flags)

Якщо завтра покладеш увесь Config у SetAsync - отримаєш зайвий обсяг і плутанину версій. Сьогоднішня дисципліна це блокує.

**Зроби зараз (2 хв):** додай SaveKeyPrefix або StoreName у Config для 4.6.`,
      },
      {
        title: "Чекліст здачі 4.5",
        content: `- [ ] Є ModuleScript Config з return table
- [ ] Мінімум 2 секції даних (напр. Prices + Catalog/Limits)
- [ ] require працює з ≥2 Scripts
- [ ] Прибрано ≥2 магічні числа на користь Config
- [ ] Тест: зміна в Config змінює поведінку
- [ ] Місце Config обране свідомо (RS або SS)
- [ ] Немає здачі «player plots» як головної теми
- [ ] Коментар: як додати новий параметр
- [ ] Save: **Lesson 4.5 - ModuleScript Config**

Єдина правда готова. Далі - навчити її сусіда: хмарний прогрес.

**Зроби зараз (3 хв):** галочки + фінальний Save Place.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Копіпаст цін у трьох Scripts замість Config",
      solution: "Один ModuleScript + require; зміна числа в одному місці.",
    },
    {
      mistake: "Забутий return у ModuleScript",
      solution: "Модуль має повернути рівно одне значення - твій table.",
    },
    {
      mistake: "Здавати OwnerUserId / ділянки як тему 4.5",
      solution: "Артефакт дня - ModuleScript Config, не plots.",
    },
    {
      mistake: "Клієнтська перевірка ціни як єдина валідація",
      solution: "UI може читати Config; покупку підтверджує сервер.",
    },
    {
      mistake: "Два різні Config з різними числами",
      solution: "Одна правда; різний лише доступ RS/SS.",
    },
    {
      mistake: "Важка ігрова логіка всередині Config на require",
      solution: "У модулі - дані й чисті хелпери; Touched/Remotes - в Scripts.",
    },
  ],
  keyTakeaways: [
    "ModuleScript Config = єдина правда балансу через return table",
    "require з кількох Scripts читає той самий кешований table",
    "Магічні числа виносиш і перевіряєш тестом зміни",
    "RS vs SS - про доступ, не про дві різні правди",
    "Config не замінює DataStore: правила vs прогрес",
    "Далі 4.6 сейвитиме profiles, читаючи ліміти/префікси з Config",
  ],
  summary: "Ти виніс баланс у ModuleScript Config, підключив require з двох Scripts, прибрав магічні числа й довів тест зміни значення. Старий сюжет ділянок відхилено - єдина правда готова до DataStore lite.",
  practiceTask: {
    title: "ModuleScript Config (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** одне джерело цін/каталогу для кількох Scripts.

### Part A - Module (8 хв)
1. ModuleScript Config з return table.
2. Секції Prices + Catalog (або Limits).
3. Save: Lesson 4.5 - ModuleScript Config.

### Part B - Require + рефакторинг (18 хв)
1. require у двох Scripts.
2. Прибери ≥2 магічні числа.
3. Опційний хелпер canAfford/findById.
4. Тест: зміна числа в Config → нова поведінка.

### Part C - Демо (9 хв)
1. Прожени 2-хвилинний сценарій здачі.
2. Запиши місце Config (RS/SS) і чому.
3. Додай SaveKeyPrefix для 4.6.
4. Фінальний Save.`,
    hints: [
      "Спочатку return table, потім красиві секції",
      "Один успішний print з двох Scripts уже доказ require",
      "Не витрачай слот на claim plot",
    ],
    optionalChallenge: "Додай Config.Timing.Debounce і переведи одну Touched-логіку на це значення з Config.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Яка тема уроку 4.5 у prod-92?",
        options: [
          "Власна ділянка для кожного гравця",
          "ModuleScript + Config",
          "Obby hazards",
          "Tycoon dropper balance",
        ],
        correctAnswer: 1,
        explanation: "Curriculum: ModuleScript + Config.",
      },
      {
        id: "q2",
        type: MC,
        question: "Чим ModuleScript відрізняється від звичайного Script для Config?",
        options: [
          "Він не може містити table",
          "Він працює лише на клієнті",
          "Він замінює DataStore",
          "Він return-ить table, який забирають через require",
        ],
        correctAnswer: 3,
        explanation: "require отримує повернуте значення.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо прибирати магічні числа в Config?",
        options: [
          "Щоб вимкнути Lighting",
          "Щоб змінювати баланс в одному місці",
          "Щоб видалити UserId",
          "Щоб заборонити ipairs",
        ],
        correctAnswer: 1,
        explanation: "Єдина правда балансу.",
      },
      {
        id: "q4",
        type: MC,
        question: "Скільки Scripts мінімум мають робити require на здачі?",
        options: [
          "Нуль",
          "Лише LocalScript без сервера",
          "Два або більше",
          "Рівно сто",
        ],
        correctAnswer: 2,
        explanation: "Доказ спільного джерела.",
      },
      {
        id: "q5",
        type: MC,
        question: "Що має бути в кінці ModuleScript Config?",
        options: [
          "Лише print без return",
          "Destroy() самого себе",
          "return Config (або return table)",
          "GetAsync DataStore",
        ],
        correctAnswer: 2,
        explanation: "Модуль повертає рівно одне значення.",
      },
      {
        id: "q6",
        type: MC,
        question: "Який тест найкраще доводить Config?",
        options: [
          "Видалення Workspace",
          "Зміна Skybox",
          "Вимкнення Anchored на Baseplate",
          "Зміна значення в Config змінює поведінку без правок логіки",
        ],
        correctAnswer: 3,
        explanation: "Єдине джерело керує грою.",
      },
      {
        id: "q7",
        type: MC,
        question: "Що класти в DataStore, а що в Config?",
        options: [
          "Усе лише в DataStore",
          "Усе лише в назвах Parts",
          "У Config - правила світу; у DataStore - прогрес гравця",
          "Нічого нікуди",
        ],
        correctAnswer: 2,
        explanation: "Розділення правди світу й прогресу.",
      },
      {
        id: "q8",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 4.5 - Player Plots",
          "Lesson 4.6 - DataStore Lite",
          "Lesson 4.5 - ModuleScript Config",
          "Lesson 5.1 - Three Biomes",
        ],
        correctAnswer: 2,
        explanation: "Чекліст 4.5.",
      },
      {
        id: "q9",
        type: MC,
        question: "Чому небезпечно вірити лише клієнтському canAfford?",
        options: [
          "Бо require не працює на сервері",
          "Бо table не існує в Luau",
          "Бо Config заборонений у RS",
          "Бо клієнт може підробити перевірку",
        ],
        correctAnswer: 3,
        explanation: "Сервер валідує покупку.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що НЕ є метою 4.5?",
        options: [
          "Створити ModuleScript Config",
          "Зробити OwnerUserId claim ділянки головним артефактом",
          "Підключити require з двох Scripts",
          "Прибрати магічні числа",
        ],
        correctAnswer: 1,
        explanation: "Старий plot-слот відхилено.",
      },
      {
        id: "q11",
        type: MC,
        question: "Де може жити Config для підписів UI?",
        options: [
          "Часто в ReplicatedStorage, з серверною валідацією окремо",
          "Тільки в Lighting",
          "Тільки всередині Terrain",
          "Тільки в StarterPlayer без ModuleScript",
        ],
        correctAnswer: 0,
        explanation: "RS зручний для читання; правда покупки на сервері.",
      },
      {
        id: "q12",
        type: MC,
        question: "Який наступний урок після 4.5?",
        options: [
          "5.1 Three Biomes",
          "4.1 Масиви",
          "7.1 Tycoon intro",
          "4.6 DataStore lite",
        ],
        correctAnswer: 3,
        explanation: "Далі сейв прогресу.",
      },
      {
        id: "q13",
        type: MC,
        question: "Що означає кеш require?",
        options: [
          "Config видаляється після першого require",
          "Повторний require того ж ModuleScript дає той самий table",
          "Кожен require створює нову фізичну копію файлу на диску",
          "require працює лише один раз за життя Studio назавжди",
        ],
        correctAnswer: 1,
        explanation: "Один модуль - один кешований результат.",
      },
      {
        id: "q14",
        type: MC,
        question: "Який симптом, якщо забути return у ModuleScript?",
        options: [
          "Автоматичний DataStore",
          "Зникнення Baseplate",
          "Помилка, що модуль не повернув рівно одне значення",
          "Вимкнення камери",
        ],
        correctAnswer: 2,
        explanation: "Типова помилка ModuleScript.",
      },
      {
        id: "q15",
        type: MC,
        question: "Навіщо SaveKeyPrefix у Config уже в 4.5?",
        options: [
          "Щоб замінити UserId",
          "Щоб намалювати Skybox",
          "Щоб вимкнути prompts",
          "Щоб 4.6 не дублював рядок store в багатьох місцях",
        ],
        correctAnswer: 3,
        explanation: "Підготовка до DataStore lite.",
      },
    ],
  },
};
