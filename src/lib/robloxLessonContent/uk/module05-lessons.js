/** Roblox Module 05 UK - 10 уроків (prod-92), Obby */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson51 = {
  lessonId: "lesson-roblox-5-1",
  moduleId: "module-05",
  order: 1,
  title: "5.1 - Дизайн 3 біомів",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Пояснити Obby як жанр модуля 5 і роль трьох біомів на кривій навчання",
    "Скласти паперовий ескіз маршруту Spawn → біом 1-2-3 → Finish до Studio",
    "Створити Folders Biome1/Biome2/Biome3 з контрастними кольорами й матеріалами",
    "Побудувати прохідний скелет платформ без hazards, скриптів бою й декору AAA",
    "Залишити місця під checkpoint, hazard і секрет для уроків 5.2-5.5"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 29 з 92)",
        content: `Модуль 5 - **Obby**, не Arena і не «Бійцівський клуб». Забувай Humanoid.Health як тему дня. Сьогодні ти проєктуєш **три біоми** й один читабельний маршрут від Spawn до Finish.

Решта модуля лише нашаровується на цей каркас: 5.2 hazards, 5.3 checkpoint+GUI, 5.4 while-платформи, 5.5 секрет, 5.6 playtest, 5.7 крива, 5.8 повний прохід, 5.9 juice, 5.10 Ship.
| Не тема 5.1 | Тема 5.1 |
|-------------|----------|
| Меч, TakeDamage, Died | Маршрут і біоми |
| KillBrick Script | Місця, куди пастки стануть у 5.2 |
| Повний juice | Читабельна геометрія |

біоми - три кімнати квесту; сьогодні будуєш стіни й двері між ними, не пастки й не охорону.

**Зроби зараз (2 хв):** створи новий Place або чистий шаблон і Save як Lesson 5.1 - Three Biomes.`,
      },
      {
        title: "Що таке Obby і навіщо три біоми",
        content: `Obby (obstacle course) - гравець іде вперед стрибками, уникає небезпек, накопичує прогрес. Три біоми дають **пам'ять місця** і природну криву:

| Біом | Роль | Відчуття |
|------|------|----------|
| 1 | Навчання | Ширші платформи, зрозумілий напрямок |
| 2 | Тренування | Тісніші gaps, перші комбо |
| 3 | Іспит | Найвимогливіші стрибки, але все ще fair |

Без поділу рівня на зони гравець бачить «кашу з Parts». З біомами він каже: «я в лісі / на лаві / на льоду» - і розуміє, де застряг у playtest 5.6.

Не обов'язково Terrain AAA. Достатньо палітри Parts: зелений мох, помаранчева лава-тема, блакитний лід. Єдність стилю всередині біому важливіша за реалізм.

**Зроби зараз (3 хв):** назви свої три біоми одним словом кожен (наприклад Forest / Lava / Ice) і запиши роль: вчить / тренує / іспитує.`,
      },
      {
        title: "Спочатку папір, потім Studio",
        content: `Відкрити Studio і ставити 40 Parts без плану - класичний хаос. Ескіз за 5 хвилин дешевший за годину перетягування.

На аркуші або в нотатках:

1. Прямокутник біому 1, 2, 3 зліва направо (або знизу вгору).
2. Точка Spawn і стрілка до Finish.
3. 5-8 крапок платформ у кожному біомі.
4. Пунктир «тут буде hazard» і «тут CP» - без будівництва скриптів.
5. Бічна петля «секрет?» біля біому 2.

Питання ескізу:
- Чи видно напрямок без автора?
- Чи є місце відпочинку між складними стрибками?
- Чи біом 3 не починається з найжорсткішого gap одразу після входу?

Не малюй меблі й арку. Лише потік руху.

**Зроби зараз (5 хв):** намалюй ескіз трьох зон зі Spawn, Finish і стрілкою основного шляху.`,
      },
      {
        title: "Folders Biome_1 / Biome_2 / Biome_3",
        content: `Структура Explorer з першого дня рятує 5.2-5.9:

\`Workspace\`
\` ├ Biome_1\`
\` ├ Biome_2\`
\` ├ Biome_3\`
\` ├ SpawnLocation (або Pad у Biome_1)\`
\` └ FinishLine (заглушка в Biome_3)\`

Пізніше додаси Folders Hazards, Checkpoints, Platforms, Secrets - але **не сьогодні як повні системи**. Сьогодні можна порожні маркери Part \`HazardSpot_01\` з Transparency 0.5 як нагадування.

Чому окремі Folder на біом: легко приховати/показати зону, швидко знайти Parts, peer у 5.8 орієнтується в дереві.

Не тримай 80 Part у корені Workspace. Не називай усе Part1…Part40.

**Зроби зараз (4 хв):** створи три Folder біомів і FinishLine-заглушку в Biome_3.`,
      },
      {
        title: "Контраст біомів: колір, Material, висота",
        content: `Гравець читає біом очима ще до першого складного стрибка.

| Засіб | Приклад |
|-------|---------|
| Color | 1: зелений, 2: оранж/червоний, 3: блакитний/білий |
| Material | Grass / Neon або Brick / Ice / Glacier |
| Висота підлоги | Кожен біом на +10…20 studs або зсув по X |
| Форма платформ | 1: широкі плити, 3: вужчі балки |

Контраст між біомами сильний; **всередині** біому - спокійний. Не фарбуй кожен Part випадковим RGB.

Освітлення й Atmosphere можна трохи змінити пізніше; на 5.1 достатньо кольору Parts. Не витрачай урок на повний Skybox pack.

**Зроби зараз (6 хв):** задай кожному Folder базовий колір підлоги й зроби 3-4 платформи в Biome_1 у єдиній палітрі.`,
      },
      {
        title: "Скелет платформ: масштаб і gaps",
        content: `Мета - **пройти маршрут пішки/стрибками без скриптів**, не зробити фінальний Ship.

Орієнтири для першого скелета:

| Параметр | Біом 1 | Біом 2 | Біом 3 |
|----------|--------|--------|--------|
| Ширина платформи | 6-10 studs | 4-8 | 3-6 |
| Gap | 4-8 | 6-10 | 8-12 (fair) |
| Кількість платформ | 5-8 | 5-8 | 5-8 |
| Довжина зони | компактна | середня | не марафон |

Краще короткий чіткий рівень, ніж кілометр порожніх плит. У 5.7 підкрутиш gaps; сьогодні заклади прохідність.

Anchored true на всьому статичному. CanCollide true на підлогах. Не вмикай випадковий CanCollide false «для краси».

**Зроби зараз (10 хв):** добудуй скелет Biome_1 і Biome_2 так, щоб можна було дійти стрибками від Spawn до входу в біом 3.`,
      },
      {
        title: "Spawn, напрямок і Finish-заглушка",
        content: `SpawnLocation або яскравий Pad у Biome_1: гравець одразу бачить **першу платформу** за 5-15 studs, не порожнечу.

Навігація без стрілок UI:
- низка платформ веде в один бік;
- стіни/бордюри відсікають хибний шлях;
- наступний біом видно контрастом кольору попереду.

FinishLine сьогодні - Anchored Part з ім'ям FinishLine і відмінним кольором. Логіка таймера й Badge прийдуть у 5.3 і 5.10; ім'я вже зафіксуй.

Не став Spawn над ямою. Не ховай Finish у декорі.

**Зроби зараз (5 хв):** вистав Spawn, добудуй Biome_3 до FinishLine, перевір видимість фінішу з останніх платформ.`,
      },
      {
        title: "Місця під майбутні системи",
        content: `Залиш «кишені» без реалізації:

| Місце | Маркер зараз | Урок |
|-------|--------------|------|
| Яма під стрибком | Порожня або Part HazardSpot | 5.2 |
| Безпечний майданчик після сегмента | Ширша плита CP_Spot | 5.3 |
| Довгий розрив | Статична плита-тимчасово | 5.4 while |
| Бічний alcove біому 2 | Прохід убік SecretSpot | 5.5 |

Маркери: Transparency 0.6, унікальне ім'я, можна сірий колір. У Play вони не повинні ламати маршрут (CanCollide false для чисто декоративних Spot, або тверді якщо це майбутня підлога).

Не пиши Script на маркери сьогодні. Не будуй меч і зони TakeDamage.

**Зроби зараз (4 хв):** постав мінімум по одному HazardSpot, CP_Spot і SecretSpot згідно з ескізом.`,
      },
      {
        title: "Playtest скелета без скриптів",
        content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Play на Spawn | Видно біом 1 і напрямок |
| 2 | Пройди біом 1 | Без застрягань у геометрії |
| 3 | Вхід у біом 2 | Контраст зчитується |
| 4 | Біом 3 → Finish | Маршрут існує |
| 5 | Спроба зійти з шляху | Бордюр або очевидний край |
| 6 | Explorer | Parts у своїх Folder |
| 7 | Output | Порожньо (скриптів майже немає) |

Якщо на пункті 2-4 падаєш у void через дірку в скелеті - це баг сьогоднішньої здачі, не «потім під hazard».

Не вимірюй час спидрану. Не балансуй micro-gap. Головне - **читабельність і цілісність шляху**.

**Зроби зараз (8 хв):** повний прохід трьох біомів; занотуй перше місце, де заплутався, і виправ геометрію.`,
      },
      {
        title: "Анти-патерни дизайну біомів",
        content: `| Патерн | Чому погано | Фікс |
|--------|-------------|------|
| Один довгий коридор без зон | Немає пам'яті місця | Три Folder + контраст |
| Біом 1 уже «іспит» | Новачок здається | Ширші плити на старті |
| Декор замість маршруту | Години Mesh, нуль playtest | Спочатку скелет |
| Випадкові кольори Parts | Шум, не біом | Палітра на зону |
| Немає Finish | Немає цілі | FinishLine-заглушка |
| Humanoid/меч «щоб було цікаво» | Ламає жанр модуля | Прибери, лиши паркур |

Дисципліна: красивий Sky не замінює стрілку маршруту в геометрії.

**Зроби зараз (3 хв):** викресли з плану все, що є боєм, магазином або juice.`,
      },
      {
        title: "Зв'язок із кривою 5.7 (наперед)",
        content: `Сьогодні ти не крутиш difficulty curve числами - ще немає Config платформ і багліста. Але заклади **ролі** біомів так, щоб 5.7 мав що крутити:

- біом 1 прощає помилку шириною;
- біом 2 вимагає уваги;
- біом 3 вужчий, але не невидимий.

Якщо всі три зони вже з gap 14 studs - у 5.7 доведеться все перебудовувати. Краще зараз м'якший старт.

Запиши в нотатках: «B1 gap ~6, B2 ~8, B3 ~10» - старт для майбутніх ітерацій.

**Зроби зараз (2 хв):** допиши до ескізу орієнтовні gaps трьох біомів.`,
      },
      {
        title: "Що НЕ будувати в 5.1",
        content: `| Не роби зараз | Урок |
|---------------|------|
| KillBrick Script / TakeDamage | 5.2 |
| Checkpoint + таймер GUI | 5.3 |
| while-платформи + Config | 5.4 |
| Ключ-двері | 5.5 |
| Sound / Particles на весь рівень | 5.9 |
| Badge / Game Settings ship | 5.10 |
| Arena меч, Died, зони шкоди гравцю | ніколи в цьому слоті |

5.1 - **дизайн і скелет**. Код майже нуль (дозволений лише дрібний helper, не обов'язково).

**Зроби зараз (2 хв):** переконайся, що в Place немає Tool меча й Script шкоди «з старого шаблону».`,
      },
      {
        title: "Чекліст здачі й міст до 5.2",
        content: `Перед Save:

- [ ] Ескіз трьох біомів і маршруту
- [ ] Folders Biome_1…3 з контрастною палітрою
- [ ] Прохідний скелет Spawn → Finish пішки/стрибками
- [ ] FinishLine-заглушка з правильним ім'ям
- [ ] Маркери місць під hazard / CP / секрет
- [ ] Немає Arena Health/меч як здачі
- [ ] Save: **Lesson 5.1 - Three Biomes**

Далі **5.2 - Hazards + debounce**: у ями й HazardSpot додаси читабельні пастки й серверний Touched. Каркас біомів чіпати мінімально - лише наповнення небезпекою.

**Зроби зараз (2 хв):** Save Place як Lesson 5.1 - Three Biomes.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Почати з Humanoid.Health / меча / арени",
      explanation: "Це застарілий контент слота 5.1; жанр модуля - Obby.",
      correctApproach: "Три біоми й прохідний маршрут без бойових Script",
    },
    {
      mistake: "Усі Parts у корені Workspace без Folder",
      explanation: "Уже на 5.2-5.4 неможливо швидко знайти зону.",
      correctApproach: "Biome_1 / Biome_2 / Biome_3 з першого дня",
    },
    {
      mistake: "Біоми не відрізняються візуально",
      explanation: "Гравець і тестер губляться, багліст стає розмитим.",
      correctApproach: "Контраст кольору/Material/висоти між зонами",
    },
    {
      mistake: "Година декору до першого проходу",
      explanation: "Не перевірено, чи маршрут взагалі існує.",
      correctApproach: "Спочатку скелет і Play через три біоми",
    },
    {
      mistake: "Біом 1 одразу з найжорсткішими gaps",
      explanation: "Немає навчання; 5.7 і 5.6 потонуть у люті.",
      correctApproach: "Ширші платформи на старті, іспит у біомі 3",
    },
    {
      mistake: "Немає FinishLine-заглушки",
      explanation: "Немає цілі маршруту для 5.3/5.10.",
      correctApproach: "Іменований FinishLine у кінці Biome_3",
    }
  ],
  summary: "Ти відкрив модуль Obby дизайном трьох контрастних біомів: ескіз, Folders, прохідний скелет Spawn→Finish і маркери під hazard/CP/секрет. Бойовий контент відхилено - каркас готовий до hazards у 5.2.",
  practiceTask: {
    title: "Три біоми Obby (~35 хв)",
    difficulty: "beginner",
    description: `**Мета:** читабельний скелет трьох зон без бойових скриптів.

### Part A - Папір (8 хв)
1. Назви біоми й ролі (вчить / тренує / іспит).
2. Ескіз Spawn → 1 → 2 → 3 → Finish.
3. Познач місця hazard / CP / секрет.

### Part B - Studio (18 хв)
1. Folders Biome_1…3 + контраст палітри.
2. 5-8 платформ на біом, Anchored true.
3. Spawn, FinishLine, маркери Spot.

### Part C - Прохід (9 хв)
1. Play через усі три біоми.
2. Виправ застрягання й дірки.
3. **Save:** Lesson 5.1 - Three Biomes`,
    hints: [
      "Спочатку маршрут, потім краса",
      "Одна палітра всередині біому, сильний контраст між біомами",
      "Не пиши KillBrick і меч на цьому уроці"
    ],
    optionalChallenge: "Додай низькі бордюри ZoneBorder у кожному біомі, щоб гравець рідше злітав у void під час скелет-тесту.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Який жанр модуля 5 і уроку 5.1?",
        options: [
          "Arena з Humanoid.Health як головною темою",
          "Tycoon з дропером",
          "Obby з дизайном трьох біомів",
          "Simulator з leaderstats"
        ],
        correctAnswer: 2,
        explanation: "Curriculum: 05 - Obby, старт з біомів.",
      },
      {
        id: "q2",
        type: MC,
        question: "Роль біому 1 на кривій?",
        options: [
          "Навчання: м'якший старт і читабельний напрямок",
          "Найжорсткіший іспит одразу",
          "Місце для меча",
          "Тільки Skybox без платформ"
        ],
        correctAnswer: 0,
        explanation: "Спочатку вчити, потім іспитувати.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо паперовий ескіз до Studio?",
        options: [
          "Roblox вимагає PDF",
          "Дешевше визначити маршрут, ніж годинами переставляти Parts",
          "Ескіз замінює Folders",
          "Без ескізу не працює Play"
        ],
        correctAnswer: 1,
        explanation: "План руху до витрат часу в Explorer.",
      },
      {
        id: "q4",
        type: MC,
        question: "Навіщо Folders Biome_1…3?",
        options: [
          "Щоб вимкнути Anchored",
          "Щоб згрупувати зони для навігації й наступних систем",
          "Щоб створити Tool",
          "Щоб замінити FinishLine"
        ],
        correctAnswer: 1,
        explanation: "Порядок у Workspace і ясність зон.",
      },
      {
        id: "q5",
        type: MC,
        question: "Як біоми мають відрізнятись?",
        options: [
          "Лише номером у голові автора",
          "Контраст кольору, Material або висоти",
          "Обов'язково різними DataStore",
          "Тільки різною музикою без геометрії"
        ],
        correctAnswer: 1,
        explanation: "Гравець читає зону очима.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що є головним артефактом 5.1?",
        options: [
          "Прохідний скелет трьох біомів зі Spawn і Finish",
          "Робочий меч і TakeDamage",
          "Повний Badge ship",
          "while-платформи з Config"
        ],
        correctAnswer: 0,
        explanation: "Дизайн і геометрія маршруту.",
      },
      {
        id: "q7",
        type: MC,
        question: "Що робити з майбутніми hazards сьогодні?",
        options: [
          "Повністю закодити KillBrick",
          "Поставити маркери місць без бойової логіки",
          "Зробити всю підлогу вбивчою",
          "Видалити всі ями"
        ],
        correctAnswer: 1,
        explanation: "Spot-маркери; Script у 5.2.",
      },
      {
        id: "q8",
        type: MC,
        question: "Чому погано робити біом 1 уже «іспитом»?",
        options: [
          "Новачок не встигає навчитись і здається рано",
          "Studio не дозволяє широкі Parts на старті",
          "FinishLine тоді зникає",
          "Folders стають неможливими"
        ],
        correctAnswer: 0,
        explanation: "Крива має рости до біому 3.",
      },
      {
        id: "q9",
        type: MC,
        question: "Що перевіряє playtest скелета?",
        options: [
          "Лише FPS",
          "Чи маршрут проходиться й читається без скриптів бою",
          "Чи AwardBadge працює",
          "Чи DataStore зберіг меч"
        ],
        correctAnswer: 1,
        explanation: "Цілісність шляху Spawn→Finish.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що НЕ входить у здачу 5.1?",
        options: [
          "Три Folder біомів",
          "Ескіз маршруту",
          "Humanoid.TakeDamage як основна механіка",
          "FinishLine-заглушка"
        ],
        correctAnswer: 2,
        explanation: "Бойовий контент - застарілий слот.",
      },
      {
        id: "q11",
        type: MC,
        question: "Навіщо FinishLine уже зараз?",
        options: [
          "Щоб одразу видати Badge",
          "Щоб зафіксувати ціль маршруту для 5.3 і 5.10",
          "Щоб замінити Spawn",
          "Щоб увімкнути Atmosphere"
        ],
        correctAnswer: 1,
        explanation: "Ім'я й місце фінішу потрібні наступним урокам.",
      },
      {
        id: "q12",
        type: MC,
        question: "Як 5.1 готує 5.2?",
        options: [
          "HazardSpot і ями готові прийняти KillBrick з debounce",
          "5.2 видаляє всі біоми",
          "Пастки більше не потрібні",
          "Треба перейти на Tycoon"
        ],
        correctAnswer: 0,
        explanation: "Каркас місць під пастки.",
      },
      {
        id: "q13",
        type: MC,
        question: "Скільки біомів вимагає урок?",
        options: [
          "Один",
          "Два",
          "Десять",
          "Три"
        ],
        correctAnswer: 3,
        explanation: "Дизайн саме трьох зон.",
      },
      {
        id: "q14",
        type: MC,
        question: "Що важливіше на 5.1?",
        options: [
          "AAA Mesh-декор усього острова",
          "Читабельний прохідний маршрут",
          "Повний саундтрек",
          "PvP арена в центрі"
        ],
        correctAnswer: 1,
        explanation: "Спочатку скелет і напрямок.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 5.2 - Hazards Debounce",
          "Arena Health Zones",
          "Lesson 5.10 - Ship + Badge",
          "Lesson 5.1 - Three Biomes"
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Lesson 5.1 - Three Biomes.",
      }
    ],
  },
};

export const ukLesson52 = {
  lessonId: "lesson-roblox-5-2",
  moduleId: "module-05",
  order: 2,
  title: "5.2 - Hazards + debounce",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Зробити читабельний hazard Part, який карає помилку стрибка в Obby",
    "Обробити Touched на сервері й знайти Humanoid гравця через GetPlayerFromCharacter",
    "Застосувати смерть або шкоду лише після перевірок hit Part",
    "Захистити повторні Touched debounce-ом, щоб не було миттєвої серії вбивств",
    "Підготувати чесні пастки під checkpoint у 5.3 і juice у 5.9"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 30 з 92)",
        content: `У **5.1** ти розклав три біоми й основний маршрут. Сьогодні маршрут отримує **ціну помилки**: hazards - лава, шипи, отруйна вода, невидимі лише якщо unfair.

Це не урок про меч і Arena. Tool, Activated і дуелі тут не здаються. Жанр - Obby: гравець стрибає, промахується, торкається небезпеки, помирає, вчиться.
| Було в 5.1 | Стає в 5.2 |
|-------------|------------|
| Геометрія й маршрут | Маршрут із наслідком помилки |
| Смерть лише від падіння в void | Контрольовані KillBrick / шкода |
| Немає Touched-логіки | Серверний обробник + debounce |

У **5.3** checkpoint зменшить лють від цих смертей. У **5.9** на той самий хук сяде Sound.

hazard - бордюр з шипами на краю доріжки, не меч у руці суперника.

**Зроби зараз (2 хв):** відкрий Place з 5.1 і познач три місця, де помилка стрибка має каратись пасткою, а не порожнечею.`,
      },
      {
        title: "Що таке hazard в Obby",
        content: `Hazard - Part (або модель), дотик до якого **карає** гравця: миттєва смерть або шкода. Він пояснює правило світу: «сюди не можна».

| Тип | Приклад | Відчуття |
|-----|---------|----------|
| Instant kill | Лава, пила | Жорсткий урок |
| Damage over time | Отрута з debounce шкоди | Напруга, шанс втекти |
| Moving hazard | Шипи на while пізніше | Ритм + небезпека |

На 5.2 мінімум - **instant kill** з debounce. Damage-over-time можна як челендж, але не замість трьох читабельних kill-зон.

Hazard не замінює поганий gap. Якщо стрибок нечесний, пастка лише додасть люті. Спочатку геометрія з 5.1 має бути fair, потім - видима кара.

Не роби всю підлогу KillBrick «для хардкору». Пастка працює контрастом: поруч є безпечний Part.

**Зроби зараз (3 хв):** обери для кожного з трьох hazards тип (лава / шипи / кислота) і колір, відмінний від підлоги біому.`,
      },
      {
        title: "Читабельність: fair death",
        content: `Смерть чесна, коли гравець **розумів ризик до дотику**.

| Fair | Unfair |
|------|--------|
| Яскравий червоний / neon лава | Той самий колір, що підлога |
| Зуби / шипи / хвилі на Part | Прозорий CanCollide true без вигляду |
| Пастка в зоні, куди можна не йти | KillBrick на єдиній стежині без обходу |
| Смерть після видимого промаху | Смерть від random thin edge |

Для здачі: Transparency небезпеки не вище ~0.3, якщо це не окремий навчальний «привид» з іншим сигналом. Краще Material Neon або SmoothPlastic насиченого кольору.

Billboard «Danger» не обов'язковий. Достатньо форми й кольору. У 5.9 з'явиться звук - сьогодні очі й геометрія.

**Зроби зараз (5 хв):** зроби три Hazard Parts явно небезпечними на вигляд і постав їх під/поряд зі стрибками.`,
      },
      {
        title: "Touched на сервері: шлях від hit до Humanoid",
        content: `Touched дає \`hit\` - це Part тіла (часто нога, рука, HRP). Character шукай як \`hit.Parent\`, гравця - через Players.

\`local part = script.Parent\`
\`part.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local humanoid = character and character:FindFirstChildOfClass("Humanoid")\`
\`  if not humanoid then return end\`
\`  local player = game.Players:GetPlayerFromCharacter(character)\`
\`  if not player then return end\`
\`  humanoid.Health = 0\`
\`end)\`

Чому серверний Script: смерть і шкода - ігрова правда. LocalScript міг би вбити лише «в себе на екрані» або бути обійденим. Для Obby kill - завжди сервер.

Фільтр player потрібен, щоб NPC/інші Humanoid у Workspace випадково не тригерили логіку курсу. Якщо ворогів немає - все одно гарна звичка.

Не вішай убивство на \`hit\` без перевірки Humanoid: торкання декоративного Part сусіда не має ламати гру.

**Зроби зараз (6 хв):** один Script у Hazard_01 з шляхом hit → Humanoid → Health = 0 і швидким Play-тестом.`,
      },
      {
        title: "Health = 0 проти TakeDamage",
        content: `| Метод | Ефект | Коли |
|-------|-------|------|
| \`humanoid.Health = 0\` | Миттєва смерть | Класичний KillBrick Obby |
| \`humanoid:TakeDamage(n)\` | Мінус HP | Зони шкоди, не миттєвий kill |

Для більшості пасток курсу бери **Health = 0**. Це просто, передбачувано й добре стикується з checkpoint у 5.3.

TakeDamage(20) на кожен Touched без debounce = смерть за кадр усе одно, але з миготінням HP. Гірше для навчання. Якщо хочеш зону шкоди - обов'язково debounce 0.5-1 с між тиками.

Не зменшуй MaxHealth замість шкоди. Не став Health = 0 у LocalScript.

ForceField на Spawn захищає кілька секунд після респавну - врахуй у тестах: одразу стрибнути в лаву можна «без смерті». Це не баг твого Script, а захист Roblox; зачекай кінця ForceField або тестуй після нього.

**Зроби зараз (3 хв):** залиш Kill через Health = 0 на всіх трьох hazards для мінімуму здачі.`,
      },
      {
        title: "Чому потрібен debounce",
        content: `Touched у Roblox - «шумна» подія. Поки нога стоїть у лаві, hit може прийти десятки разів за секунду. Без debounce ти отримаєш:

- спам print / повторні виклики;
- дивну поведінку з TakeDamage;
- зайве навантаження;
- ускладнений juice пізніше (звук 40 разів).

Debounce - прапор «уже обробляємо цього гравця / цей Part».

\`local debounce = {}\`
\`-- ...\`
\`if debounce[player] then return end\`
\`debounce[player] = true\`
\`humanoid.Health = 0\`
\`task.delay(1, function()\`
\`  debounce[player] = nil\`
\`end)\`

Для instant kill delay 0.5-1 с достатньо: Character і так зникне. Важливіше заблокувати повтор **до** смерті в тому ж кадрі/серії.

Альтернатива: debounce на рівні hazard Part (один прапор), якщо пастка одноразова. Для лави краще ключ по player - кілька людей на сервері незалежні.

**Зроби зараз (5 хв):** додай debounce[player] у Hazard_01 і перевір Output: один логічний kill на вхід у зону.`,
      },
      {
        title: "Один Script на багато hazards",
        content: `Не плоди п'ять майже однакових Script. Збери Folder Hazards і підключи циклом:

\`local folder = workspace:WaitForChild("Hazards")\`
\`local debounce = {}\`
\`local function bind(hazard)\`
\`  hazard.Touched:Connect(function(hit)\`
\`    -- перевірки + debounce + Health = 0\`
\`  end)\`
\`end\`
\`for _, child in ipairs(folder:GetChildren()) do\`
\`  if child:IsA("BasePart") then\`
\`    bind(child)\`
\`  end\`
\`end\`

Так нові пастки в Folder одразу працюють після копіювання Part (після перезапуску Script / Play).

Attribute \`DamageMode = "kill"\` можна додати пізніше. Сьогодні достаточно однаковий kill на всіх дітях Folder.

Імена: Hazard_Lava_01, Hazard_Spikes_02 - допоможуть у баглісті 5.6.

**Зроби зараз (7 хв):** перенеси всі пастки в Folder Hazards і підключи їх одним Script.`,
      },
      {
        title: "Де ставити пастки на маршруті",
        content: `| Добре | Погано |
|-------|--------|
| Під стрибком, куди падають при промаху | Вся доріжка = KillBrick |
| Збоку від безпечного краю | На SpawnLocation |
| Після короткого навчання без пастки | Перший крок біому 1 - миттєва лава впритул |
| Контраст з кольором біому | Маскування під checkpoint |

Біом 1: 1 м'яка пастка після першого успішного стрибка. Біом 2-3: щільніше, але все ще видимо. Точний баланс - у 5.7; сьогодні заклади **чесні** зони.

Не став hazard на майбутній Checkpoint Part. CP має бути безпечним острівцем.

Якщо під while-платформою (5.4) буде лава - супер, але спочатку статичний стрибок + пастка мають працювати без while.

**Зроби зараз (5 хв):** розклади 3 hazards так, щоб обхід або правильний стрибок існував.`,
      },
      {
        title: "Типові баги Touched",
        content: `| Симптом | Ймовірна причина | Фікс |
|---------|------------------|------|
| Не вбиває | Script у LocalScript / немає Humanoid | Server Script, FindFirstChildOfClass |
| Вбиває декорації | Немає перевірки player | GetPlayerFromCharacter |
| Вбиває миттєво 20 разів у логах | Немає debounce | debounce[player] |
| Не вбиває після респавну | debounce не скинувся | delay clear або clear на CharacterAdded |
| Вбиває крізь стіну | Великий hitbox / CanCollide сусідів | Підріж Size, перевір overlaps |

CanTouch true за замовчуванням для BasePart. Якщо вимкнув - Touched мовчить.

Anchored true для статичної лави. Неякірний KillBrick може впасти й поїхати з рівня.

**Зроби зараз (4 хв):** навмисно зламай один тест (вимкни debounce) і послухай різницю, потім поверни debounce.`,
      },
      {
        title: "Що НЕ будувати в 5.2",
        content: `| Не роби зараз | Чому |
|---------------|------|
| Tool меч / Activated | Старий Arena-урок |
| dealDamage між гравцями | Не жанр Obby M5 |
| Checkpoint система | 5.3 |
| while-платформи | 5.4 |
| Sound на кожен touch без debounce | Спам; juice в 5.9 після стабільного хука |
| Невидима підлога-кіллер на всьому біомі | Unfair |

Мінімум: Folder, 3 читабельні пастки, серверний Touched, debounce, Save.

**Зроби зараз (2 хв):** викресли меч, рюкзак зброї й дуелі з плану здачі.`,
      },
      {
        title: "Playtest пасток",
        content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Крок у Hazard_01 | Одна смерть |
| 2 | Стояння в зоні до зникнення Character | Немає спаму Output |
| 3 | Респавн і знову в пастку | Знову одна логічна смерть |
| 4 | Пройти обхід / правильний стрибок | Можна не вмерти |
| 5 | Усі 3 hazards | Однаковий шаблон поведінки |
| 6 | Візуал з дистанції 20 studs | Пастка впізнається |
| 7 | Script у ServerScriptService / у Part | Працює на сервері |

Пункт 4 обов'язковий: пастка без маршруту втечі - це стіна, не hazard.

**Зроби зараз (8 хв):** пройди таблицю й виправ перший провал.`,
      },
      {
        title: "Чекліст здачі й міст далі",
        content: `Перед Save:

- [ ] Folder Hazards, 3+ читабельні BasePart
- [ ] Серверний Touched → Humanoid → Health = 0
- [ ] GetPlayerFromCharacter / фільтр гравця
- [ ] debounce по player (або еквівалент)
- [ ] Немає меча / Arena damage як здачі
- [ ] Є безпечний шлях поруч із пастками
- [ ] Save: **Lesson 5.2 - Hazards Debounce**

Далі **5.3 - Чекпоінти + таймер + GUI**: ті самі смерті стануть дешевшими для навчання. У **5.6** багліст збере unfair невидимі KillBrick. У **5.9** на хук сяде juice.

**Зроби зараз (2 хв):** Save Place як Lesson 5.2 - Hazards Debounce.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "KillBrick у LocalScript",
      explanation: "Смерть має бути серверною правдою для всіх і для checkpoint.",
      correctApproach: "Script на сервері з Touched → Humanoid",
    },
    {
      mistake: "Немає debounce",
      explanation: "Серія повторних Touched спамить логіку й майбутній звук.",
      correctApproach: "debounce[player] навколо реальної кари",
    },
    {
      mistake: "Пастка того ж кольору, що підлога",
      explanation: "Смерть здається випадковою - unfair.",
      correctApproach: "Контрастний Material/колір/форма",
    },
    {
      mistake: "Уся дорога = KillBrick",
      explanation: "Немає навчання стрибка, лише фрустрація.",
      correctApproach: "Локальні зони під промахом + безпечний маршрут",
    },
    {
      mistake: "Окремий Script-копіпаста на кожен Part",
      explanation: "Правки debounce роз'їдуться.",
      correctApproach: "Folder Hazards + один bind-цикл",
    },
    {
      mistake: "Здавати меч Tool замість hazards",
      explanation: "Це застарілий Arena-контент, не Obby 5.2.",
      correctApproach: "Touched-пастки на маршруті паркуру",
    }
  ],
  summary: "Ти зібрав Obby-hazards: читабельні пастки, серверний Touched до Humanoid, debounce проти спаму й Folder для масштабу. Смерть чесна й готова прийняти checkpoint у 5.3 та juice у 5.9.",
  practiceTask: {
    title: "Hazards + debounce (~35 хв)",
    difficulty: "beginner",
    description: `**Мета:** три чесні пастки з одним серверним шаблоном.

### Part A - Сцена (8 хв)
1. Folder Hazards.
2. Три BasePart з контрастним виглядом.
3. Розмісти під/поряд зі стрибками, обхід існує.

### Part B - Логіка (17 хв)
1. Один Script: for по Folder + Touched.
2. Humanoid + GetPlayerFromCharacter.
3. debounce[player] + Health = 0.

### Part C - Перевірка (10 хв)
1. Одна смерть на вхід у зону.
2. Немає Output-спаму.
3. Усі три пастки працюють.
4. **Save:** Lesson 5.2 - Hazards Debounce`,
    hints: [
      "Чекай кінця ForceField після респавну перед повторним тестом",
      "hit.Parent - Character, не сам hit Part",
      "Спочатку один hazard, потім цикл на Folder"
    ],
    optionalChallenge: "Додай Attribute Kind=damage на один Part і TakeDamage(25) з окремим debounce 0.75 с, не чіпаючи kill-пастки.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.2?",
        options: [
          "Зробити Tool-меч для Arena",
          "Чесні Obby-hazards з Touched і debounce",
          "Відкрити магазин Coins",
          "Зберегти DataStore"
        ],
        correctAnswer: 1,
        explanation: "Пастки паркуру, не зброя.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де має жити логіка KillBrick?",
        options: [
          "У LocalScript StarterPlayer",
          "У Script на сервері",
          "Лише в Lighting",
          "У Bundle без Script"
        ],
        correctAnswer: 1,
        explanation: "Смерть - серверна правда.",
      },
      {
        id: "q3",
        type: MC,
        question: "Що таке hit у Touched?",
        options: [
          "Обов'язково сам гравець Instance",
          "Завжди Humanoid",
          "Part, що торкнувся (часто частина Character)",
          "Тільки SpawnLocation"
        ],
        correctAnswer: 2,
        explanation: "Character шукають через hit.Parent.",
      },
      {
        id: "q4",
        type: MC,
        question: "Навіщо debounce?",
        options: [
          "Щоб прискорити WalkSpeed",
          "Щоб заборонити Anchored",
          "Щоб Part став прозорим",
          "Щоб серія Touched не спамила одну й ту саму кару"
        ],
        correctAnswer: 3,
        explanation: "Touched шумний, поки контакт триває.",
      },
      {
        id: "q5",
        type: MC,
        question: "Який метод найпростіший для KillBrick Obby?",
        options: [
          "humanoid.Health = 0",
          "Видалити Workspace",
          "Teleport на Null",
          "LocalScript Destroy(player)"
        ],
        correctAnswer: 0,
        explanation: "Миттєва смерть на сервері.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що робить смерть unfair?",
        options: [
          "Яскрава лава під промахом стрибка",
          "KillBrick кольору підлоги без натяку",
          "Шипи з контрастним Neon",
          "Пастка з обхідним маршрутом"
        ],
        correctAnswer: 1,
        explanation: "Гравець не читає ризик.",
      },
      {
        id: "q7",
        type: MC,
        question: "Навіщо GetPlayerFromCharacter?",
        options: [
          "Щоб відфільтрувати саме гравця, а не будь-який Humanoid",
          "Щоб намалювати Sky",
          "Щоб створити Tool",
          "Щоб вимкнути Touched"
        ],
        correctAnswer: 0,
        explanation: "Перевірка, що Character належить Player.",
      },
      {
        id: "q8",
        type: MC,
        question: "Як підключити багато пасток без копіпасти?",
        options: [
          "Окремий Place на кожен hazard",
          "Folder Hazards + for + спільна функція bind",
          "Лише Studio Plugins",
          "Видалити всі Parts крім одного"
        ],
        correctAnswer: 1,
        explanation: "Один шаблон на дітей Folder.",
      },
      {
        id: "q9",
        type: MC,
        question: "Чому ForceField може «зламати» тест одразу після респавну?",
        options: [
          "Він видаляє Script",
          "Короткий імунітет не дає одразу померти в hazard",
          "Він вимикає debounce назавжди",
          "Він переносить FinishLine"
        ],
        correctAnswer: 1,
        explanation: "Зачекай кінця захисту або тестуй пізніше.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що НЕ здавати в 5.2?",
        options: [
          "Три читабельні hazards",
          "Debounce",
          "Серверний Touched",
          "Меч Tool з Activated як основний артефакт"
        ],
        correctAnswer: 3,
        explanation: "Arena-зброя - застаріла тема цього слота.",
      },
      {
        id: "q11",
        type: MC,
        question: "Як 5.2 готує 5.3?",
        options: [
          "Checkpoint зменшить вартість цих смертей для навчання",
          "5.3 видаляє всі hazards",
          "Debounce більше не потрібен",
          "GUI замінить KillBrick"
        ],
        correctAnswer: 0,
        explanation: "Смерть лишається, прогрес з'явиться.",
      },
      {
        id: "q12",
        type: MC,
        question: "Куди в 5.9 сяде Sound смерті?",
        options: [
          "В окремий другий Touched без логіки",
          "У той самий серверний хук після підтвердженого kill",
          "Лише в SoundService без Part",
          "У Terrain"
        ],
        correctAnswer: 1,
        explanation: "Одна подія - один обробник.",
      },
      {
        id: "q13",
        type: MC,
        question: "Де краще НЕ ставити hazard?",
        options: [
          "Під промахом стрибка",
          "Збоку від безпечного краю",
          "На SpawnLocation гравця",
          "У ямі біому 2"
        ],
        correctAnswer: 2,
        explanation: "Старт має бути безпечним.",
      },
      {
        id: "q14",
        type: MC,
        question: "Який жанр модуля 5?",
        options: [
          "Arena з PvP мечами",
          "Tycoon з дропером",
          "Obby з паркуром і пастками",
          "Simulator з Coins"
        ],
        correctAnswer: 2,
        explanation: "Curriculum: 05 - Obby.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 5.1 - Biomes",
          "Lesson 5.3 - Checkpoints Timer GUI",
          "Arena First Sword",
          "Lesson 5.2 - Hazards Debounce"
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Lesson 5.2 - Hazards Debounce.",
      }
    ],
  },
};

export const ukLesson53 = {
  lessonId: "lesson-roblox-5-3",
  moduleId: "module-05",
  order: 3,
  title: "5.3 - Чекпоінти + таймер + GUI",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Зберегти останній checkpoint гравця на сервері після Touched",
    "Респавнити Character на збереженій позиції, а не лише на старті рівня",
    "Показати ScreenGui з номером checkpoint і живим таймером проходження",
    "Захистити повторні Touched debounce-ом і не давати відкату на старіший CP",
    "Підготувати прогрес і час до while-платформ у 5.4 і playtest у 5.6"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 31 з 92)",
        content: `У **5.2** hazards уже вбивають з debounce. Без збереження прогресу кожна смерть кидає гравця на початок - Obby стає карою, а не навчанням. Сьогодні будуєш **три системи разом**: checkpoint, respawn на ньому й GUI з таймером.

Це не Arena «система пошкоджень мечем». Жанр - Obby: прогрес по біомах, чесний повтор після смерті, видимий час проходження.
| Було в 5.2 | Стає в 5.3 |
|-------------|------------|
| Смерть → старт рівня | Смерть → останній checkpoint |
| Прогрес лише в голові автора | Прогрес у даних гравця |
| Немає відчуття часу | Таймер на екрані |

У **5.4** while-платформи ставлять після CP. У **5.10** FinishLine використає той самий фінішний Part для Badge.

checkpoint - закладка в книзі; без неї смерть змушує читати все з першої сторінки.

**Зроби зараз (2 хв):** відкрий Place з 5.2 і постав три Parts Checkpoint_01…03 на маршруті з різними кольорами.`,
      },
      {
        title: "Навіщо checkpoint в Obby",
        content: `Смерть у паркурі - норма. Питання лише: **скільки контенту гравець повторює**.

| Без CP | З CP |
|--------|------|
| Кожна помилка = повний рестарт | Помилка коштує сегмент, не весь рівень |
| Новачок здається на біомі 2 | Новачок вчить біом 2 з середини |
| Автор зменшує складність «бо лють» | Можна лишити виклик і додати CP |

Checkpoint не робить гру легкою сам по собі. Він робить **навчання дешевшим**. У 5.7 ти зменшуватимеш щільність CP до фіналу як важіль difficulty - сьогодні заклади працюючу систему.

Один CP на біом - мінімум для здачі. Більше - ок на навчальних стрибках. Не став CP через кожні 5 studs: зникає напруга.

Finish - окремий Part (FinishLine). Його можна вважати фінальним «checkpoint події», але основна логіка збереження - на проміжних CP.

**Зроби зараз (3 хв):** підпиши на папері, який CP стоїть перед найжорсткішим стрибком кожного біому.`,
      },
      {
        title: "Серверна правда LastCheckpoint",
        content: `Стан прогресу живе на **сервері**, прив'язаний до Player, не до Character.

Варіанти:

| Підхід | Плюс |
|--------|------|
| IntValue CheckpointIndex на player | Просто порівняти «лише вперед» |
| Vector3/CFrame у table на сервері | Точна точка респавну |
| Attribute на player | Зручно читати з клієнта для GUI |

Мінімальний каркас:

\`local checkpoints = {}\` -- [userId] = { index = 2, cframe = ... }\`

або Bool/IntValue в Folder Progress під player.

Після Touched на Checkpoint_02:
1. Знайди player з Character.
2. Якщо новий index <= поточного - return (анти-відкат).
3. Збережи index і CFrame Part (або Attachment).
4. Дай короткий feedback (колір Part / Remote для GUI).

LocalScript не має права «призначити собі» фінальний CP. Інакше можна чітнути прогрес. Звичка та сама, що для HasKey у 5.5 і Coins у M6.

**Зроби зараз (5 хв):** у Script на PlayerAdded створи IntValue CheckpointIndex = 0 для гравця.`,
      },
      {
        title: "Touched на checkpoint з debounce",
        content: `Гравець стоїть на Part кілька кадрів - Touched спамить. Без debounce збереження й GUI миготять.

Шаблон:

\`local debounce = {}\`
\`part.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local player = Players:GetPlayerFromCharacter(character)\`
\`  if not player then return end\`
\`  if debounce[player] then return end\`
\`  debounce[player] = true\`
\`  -- зберегти CP, якщо index більший\`
\`  task.delay(1, function()\`
\`    debounce[player] = nil\`
\`  end)\`
\`end)\`

Альтернатива: якщо вже збережено цей самий index - одразу return без delay. Це ще чистіше для «стояння на CP».

Не створюй другий Touched лише для звуку - у 5.9 juice увійде в цей самий хук.

Імена: Checkpoint_01, Checkpoint_02… або Folder Checkpoints з дітьми. for GetChildren допоможе підключити всі Parts одним циклом.

**Зроби зараз (8 хв):** підключи Touched на всі CP з debounce і підвищенням CheckpointIndex лише вперед.`,
      },
      {
        title: "Респавн на останньому checkpoint",
        content: `За замовчуванням Roblox повертає на SpawnLocation. Тобі потрібно перебити це **після** появи нового Character.

\`player.CharacterAdded:Connect(function(character)\`
\`  local hrp = character:WaitForChild("HumanoidRootPart")\`
\`  local data = checkpoints[player.UserId]\`
\`  if data and data.cframe then\`
\`    hrp.CFrame = data.cframe + Vector3.new(0, 3, 0)\`
\`  end\`
\`end)\`

Зсув по Y на 2-4 studs уникає застрягання в підлозі CP.

Підпиши також Humanoid.Died лише якщо треба логування; сам телепорт зазвичай на CharacterAdded після авто-respawn. LoadCharacter / RespawnTime у Players налаштуй свідомо (наприклад 2-3 с).

Перевір крайні випадки:
- смерть до першого CP → Spawn;
- смерть після CP_02 → CP_02;
- повторна смерть → той самий CP, не відкат.

Не став Parent leaderstats у Character - прогрес зникне. CheckpointIndex на Player.

**Зроби зараз (8 хв):** помри після CP_02 і переконайся, що з'являєшся біля нього, а не на старті.`,
      },
      {
        title: "Лише вперед: анти-відкат",
        content: `Якщо гравець повертається й знову топче CP_01 після CP_03, стан не повинен стрибнути назад.

Правило:

\`if newIndex <= currentIndex then return end\`

Нумеруй Parts уздовж маршруту. Біом 1: 01-02, біом 2: 03-04, біом 3: 05… Фініш не зменшує index.

Візуально можна лишити всі CP «активними» на вигляд, але логіка бере лише максимальний. Або змінюй колір лише поточного максимального - опційно.

Без анти-відкату тестер у 5.6 отримає баг «прогрес зник, хоч я вже був далі» - класичний P1.

**Зроби зараз (3 хв):** після CP_03 навмисно торкнись CP_01 і перевір, що index лишився 3.`,
      },
      {
        title: "ScreenGui: мітка checkpoint",
        content: `GUI показує правду сервера, не вигадує її.

\`StarterGui\`
\` └ ScreenGui ProgressGui (ResetOnSpawn = false)\`
\`   └ TextLabel CheckpointLabel\`

LocalScript:

\`local player = game.Players.LocalPlayer\`
\`local index = player:WaitForChild("CheckpointIndex")\`
\`local label = script.Parent:WaitForChild("CheckpointLabel")\`
\`local function refresh()\`
\`  label.Text = "Checkpoint: " .. tostring(index.Value)\`
\`end\`
\`refresh()\`
\`index:GetPropertyChangedSignal("Value"):Connect(refresh)\`

ResetOnSpawn false - щоб підписки й GUI не плодились кожну смерть. Якщо ResetOnSpawn true - обережно з дублями скриптів.

Не пиши \`index.Value = 99\` з LocalScript «для тесту в проді». Для дебагу в Studio можна тимчасово, але здача - лише читання.

Текст «Checkpoint: 2» достатній. Красиві іконки - не мінімум.

**Зроби зараз (6 хв):** зроби ProgressGui з CheckpointLabel, що оновлюється при зміні Value.`,
      },
      {
        title: "Таймер проходження",
        content: `Таймер показує, скільки часу зайняв забіг від старту (або від першого руху) до поточного моменту / фінішу.

Простий клієнтський варіант для навчання:

\`local start = os.clock()\`
\`RunService.RenderStepped:Connect(function()\`
\`  local t = os.clock() - start\`
\`  local m = math.floor(t / 60)\`
\`  local s = math.floor(t % 60)\`
\`  timerLabel.Text = string.format("%02d:%02d", m, s)\`
\`end)\`

Серверний старт точніший для анти-читу й лідерборду, але для 5.3 достатньо чесного клієнтського таймера + зупинка на Finish пізніше. Якщо хочеш сервер: RemoteEvent «TimerStart» при Spawn і Attribute Elapsed.

Зупинка на фініші: коли Touched FinishLine на сервері - FireClient фінальний час або постав Flag Finished і клієнт перестає оновлювати.

Не скидайте таймер на кожному checkpoint - це час **проходження рівня**, не сегмента. Окремий сегментний час - optionalChallenge.

**Зроби зараз (6 хв):** додай TimerLabel мм:сс, що стартує з появою персонажа.`,
      },
      {
        title: "FinishLine і зупинка таймера",
        content: `Part FinishLine на кінці біому 3:

- Touched → якщо ще не Finished, познач Finished на сервері;
- опційно збережи FinalTime;
- клієнт зупиняє оновлення таймера й показує фінальний рядок.

\`if player:GetAttribute("Finished") then return end\`
\`player:SetAttribute("Finished", true)\`

Не видавай Badge тут - це **5.10**. Сьогодні лише прогрес і час. Але структура FinishLine вже та сама, що знадобиться для AwardBadge.

Debounce на Finish такий самий, як на CP. Повторні дотики не повинні мигати GUI.

Якщо гравець фінішував і помер - зазвичай не респавнити на CP для «нового забігу» автоматично; для курсу достатньо Stop таймера й залишити Finished.

**Зроби зараз (5 хв):** постав FinishLine, зупини таймер при першому валідному дотику.`,
      },
      {
        title: "Зв'язок з hazards 5.2",
        content: `Hazard убиває → Character зникає → CharacterAdded → телепорт на CP.

Порядок у голові:
1. Debounce смерті з 5.2 лишається.
2. Checkpoint не скасовує KillBrick.
3. Після респавну гравець знову вразливий - це нормально.
4. GUI з ResetOnSpawn false переживає смерть.

Типовий баг: телепорт на CP спрацьовує до появи HumanoidRootPart - завжди WaitForChild. Інший баг: телепорт у тій самій позиції, де KillBrick - зсунь CP або підняти Y.

Не лікуй unfair hazard чекпоінтом «через кожен крок». Спочатку зроби hazard читабельним (5.2), CP - сітка безпеки між сегментами.

**Зроби зараз (4 хв):** убийся на hazard після CP_01 двічі й перевір стабільний респавн + GUI.`,
      },
      {
        title: "Що НЕ будувати в 5.3",
        content: `| Не роби зараз | Коли |
|---------------|------|
| dealDamage мечем / арена | Старий M5 Arena - відхилено |
| while-платформи | 5.4 |
| Ключ-двері | 5.5 |
| Juice Sound на CP | 5.9 |
| Badge на фініші | 5.10 |
| DataStore часу між сесіями | пізніше / M4 lite |

Мінімум: 3 CP, респавн, GUI index, таймер, Finish зупиняє час. Все інше - шум.

**Зроби зараз (2 хв):** викресли з плану меч, Tween удару й магазин.`,
      },
      {
        title: "Playtest прогресу",
        content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Старт | Index 0, таймер іде, Spawn |
| 2 | Touch CP_01 | Index 1, GUI оновився |
| 3 | Смерть | Респавн на CP_01 |
| 4 | CP_02 потім CP_01 | Index лишається 2 |
| 5 | Стояння на CP | Немає спаму GUI / Output |
| 6 | Finish | Таймер стоп, Finished |
| 7 | ResetOnSpawn | Немає дубля ScreenGui |

Пункт 4 - критичний для анти-відкату. Пункт 5 - для debounce.

**Зроби зараз (8 хв):** пройди всі сім пунктів і виправ перший провал.`,
      },
      {
        title: "Чекліст здачі й міст далі",
        content: `Перед Save:

- [ ] 3+ Checkpoint Parts з порядковими індексами
- [ ] CheckpointIndex (або еквівалент) на сервері
- [ ] Touched + debounce + лише вперед
- [ ] CharacterAdded телепорт на останній CP
- [ ] ScreenGui: CheckpointLabel + TimerLabel
- [ ] FinishLine зупиняє таймер
- [ ] ResetOnSpawn false для ProgressGui
- [ ] Save: **Lesson 5.3 - Checkpoints Timer GUI**

Далі **5.4 - while-платформи + Config**: став рухомі Parts після CP, щоб навчання таймінгу не коштувало повного рестарту. У **5.6** тестер виміряє смерті й паузи саме між цими checkpoint.

**Зроби зараз (2 хв):** Save Place як Lesson 5.3 - Checkpoints Timer GUI.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Прогрес checkpoint лише в LocalScript",
      explanation: "Клієнт може підробити index; респавн інших не збіжиться.",
      correctApproach: "Збереження на сервері, GUI лише читає",
    },
    {
      mistake: "Немає debounce на Touched",
      explanation: "Сотні збережень і миготіння GUI, поки гравець стоїть.",
      correctApproach: "debounce table або ігнор того самого index",
    },
    {
      mistake: "Повернення на старіший CP зменшує прогрес",
      explanation: "Гравець «втрачає» біом без смерті.",
      correctApproach: "if newIndex <= current then return",
    },
    {
      mistake: "Респавн завжди на SpawnLocation",
      explanation: "Checkpoint існує лише візуально.",
      correctApproach: "CharacterAdded + CFrame останнього CP",
    },
    {
      mistake: "ResetOnSpawn true без контролю",
      explanation: "Дублі GUI й підписок після кожної смерті.",
      correctApproach: "ResetOnSpawn false для ProgressGui",
    },
    {
      mistake: "Писати систему урону мечем замість CP",
      explanation: "Це застарілий Arena-контент модуля.",
      correctApproach: "Checkpoints, timer, GUI для Obby",
    }
  ],
  summary: "Ти зібрав прогрес Obby: серверні checkpoint лише вперед, респавн на останньому CP, ScreenGui з індексом і таймером, Finish зупиняє час. Каркас готовий до while-платформ у 5.4 і Badge на тій самій FinishLine у 5.10.",
  practiceTask: {
    title: "Checkpoints + timer + GUI (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** три CP, чесний респавн, GUI й таймер до Finish.

### Part A - Parts (7 хв)
1. Checkpoint_01…03 на маршруті.
2. FinishLine в кінці.
3. Різні кольори, Anchored true.

### Part B - Сервер (15 хв)
1. CheckpointIndex на Player.
2. Touched + debounce + лише вперед + збереження CFrame.
3. CharacterAdded телепорт на останній CP.

### Part C - GUI і фініш (13 хв)
1. ProgressGui: CheckpointLabel + TimerLabel.
2. Таймер мм:сс зі старту.
3. Finish зупиняє таймер.
4. **Save:** Lesson 5.3 - Checkpoints Timer GUI`,
    hints: [
      "WaitForChild HumanoidRootPart перед телепортом",
      "Підніми респавн на +3 studs по Y",
      "Не скидайте таймер на кожному CP"
    ],
    optionalChallenge: "Покажи на GUI назву біому (Biomes Attribute на CP) разом із номером checkpoint.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.3?",
        options: [
          "Система урону мечем на арені",
          "Checkpoints, респавн, таймер і GUI для Obby",
          "Tween ударів",
          "DataStore монет"
        ],
        correctAnswer: 1,
        explanation: "Прогрес і час проходження паркуру.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де зберігати LastCheckpoint / CheckpointIndex?",
        options: [
          "На сервері в даних Player",
          "Лише в LocalScript змінній",
          "У Lighting",
          "У Terrain"
        ],
        correctAnswer: 0,
        explanation: "Серверна правда прогресу.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо debounce на checkpoint Touched?",
        options: [
          "Щоб видалити FinishLine",
          "Щоб прискорити Humanoid",
          "Щоб стояння на Part не спамило збереження й GUI",
          "Щоб вимкнути Anchored"
        ],
        correctAnswer: 2,
        explanation: "Touched повторюється багато кадрів.",
      },
      {
        id: "q4",
        type: MC,
        question: "Що означає правило «лише вперед»?",
        options: [
          "newIndex <= current ігнорується",
          "Завжди скидати на 0",
          "CP працюють лише в Studio",
          "Таймер іде назад"
        ],
        correctAnswer: 0,
        explanation: "Старіший checkpoint не затирає новіший прогрес.",
      },
      {
        id: "q5",
        type: MC,
        question: "Коли телепортувати на checkpoint після смерті?",
        options: [
          "У Lighting.Changed",
          "У CharacterAdded після WaitForChild HumanoidRootPart",
          "Лише в Edit Mode",
          "У Bundle"
        ],
        correctAnswer: 1,
        explanation: "Новий Character з'являється - тоді ставимо CFrame.",
      },
      {
        id: "q6",
        type: MC,
        question: "Який ResetOnSpawn зручний для ProgressGui?",
        options: [
          "true завжди",
          "false, щоб не плодити GUI й підписки",
          "nil обов'язково",
          "Лише на мобільному"
        ],
        correctAnswer: 1,
        explanation: "GUI прогресу переживає смерті.",
      },
      {
        id: "q7",
        type: MC,
        question: "Що має робити LocalScript з CheckpointIndex?",
        options: [
          "Лише читати Value і малювати текст",
          "Призначати собі index = 99",
          "Видаляти hazards",
          "Створювати leaderstats"
        ],
        correctAnswer: 0,
        explanation: "Клієнт - вітрина, не суддя прогресу.",
      },
      {
        id: "q8",
        type: MC,
        question: "Навіщо таймер у 5.3?",
        options: [
          "Замінити checkpoint",
          "Показати час проходження рівня",
          "Збільшити WalkSpeed",
          "Видалити SpawnLocation"
        ],
        correctAnswer: 1,
        explanation: "Видимий час забігу для гравця й playtest.",
      },
      {
        id: "q9",
        type: MC,
        question: "Чи скидати таймер на кожному checkpoint?",
        options: [
          "Так завжди",
          "Ні - це час усього проходження, не сегмента",
          "Так, інакше GUI не працює",
          "Лише на CP_01"
        ],
        correctAnswer: 1,
        explanation: "Сегментний час - опція, не мінімум.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що робити на FinishLine сьогодні?",
        options: [
          "AwardBadge одразу",
          "Відкрити магазин",
          "Зупинити таймер і позначити Finished",
          "Видалити всі CP"
        ],
        correctAnswer: 2,
        explanation: "Badge - у 5.10; зараз фіксація фінішу й часу.",
      },
      {
        id: "q11",
        type: MC,
        question: "Як checkpoint стикується з hazard 5.2?",
        options: [
          "Після смерті респавн на останньому CP, debounce hazard лишається",
          "Hazard вимикає всі CP",
          "CP скасовує CanCollide у лаві",
          "Потрібен меч"
        ],
        correctAnswer: 0,
        explanation: "Смерть і прогрес працюють разом.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що НЕ є метою 5.3?",
        options: [
          "Три checkpoint",
          "GUI з індексом",
          "Система пошкоджень мечем Arena",
          "Таймер мм:сс"
        ],
        correctAnswer: 2,
        explanation: "Застарілий Arena-контент відхилено.",
      },
      {
        id: "q13",
        type: MC,
        question: "Як 5.3 готує 5.4?",
        options: [
          "While-платформи ставлять після CP, щоб навчання не коштувало повного рестарту",
          "5.4 видаляє GUI",
          "Платформи замінюють усі CP",
          "Config більше не потрібен"
        ],
        correctAnswer: 0,
        explanation: "Прогрес підтримує ритмічні виклики.",
      },
      {
        id: "q14",
        type: MC,
        question: "Навіщо зсув +3 studs по Y при респавні?",
        options: [
          "Щоб збільшити WalkSpeed",
          "Щоб уникнути застрягання в геометрії CP",
          "Щоб вимкнути таймер",
          "Щоб створити Badge"
        ],
        correctAnswer: 1,
        explanation: "HRP не повинен застрягти в Part.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 5.2 - Hazards",
          "Lesson 5.4 - Moving Platforms",
          "Arena Damage System",
          "Lesson 5.3 - Checkpoints Timer GUI"
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Lesson 5.3 - Checkpoints Timer GUI.",
      }
    ],
  },
};

export const ukLesson54 = {
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
    "Підготувати Config як важіль балансу для difficulty curve у 5.7"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 32 з 92)",
        content: `У **5.3** ти зібрав чекпоінти, таймер і GUI. Сьогодні Obby отримує **рух у часі**: платформи, що з'являються, зникають або їздять туди-назад за циклом \`while\`.

Це не TweenService polish для Arena-ударів. Жанр лишається Obby: гравець читає ритм платформи й стрибає у вікно безпеки.
| Було в 5.3 | Стає в 5.4 |
|-------------|------------|
| Статичні Parts і checkpoints | Parts з повторюваним таймінгом |
| Складність лише gap і hazard | Складність ще й у часі |
| Числа розкидані в коді | Числа в Config |

У **5.5** додаси секрет. У **5.7** крутитимеш саме waitUp/waitDown як важіль кривої. Заклади Config сьогодні.

статична платформа - сходинка; while-платформа - ліфт із розкладом, який треба зловити.

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

**Зроби зараз (2 хв):** Save Place як Lesson 5.4 - Moving Platforms.`,
      }
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
    }
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
      "id у Config має точно збігатися з Name Part"
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
          "Видалити всі checkpoint"
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
          "LocalScript інакше не існує"
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
          "Вимкнути Touched"
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
          "Щоб вимкнути Anchored"
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
          "Ім'я Place"
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
          "У Bundle Marketplace"
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
          "0.15 с"
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
          "Поставити правильну відповідь quiz у 0"
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
          "Платформи більше не потрібні"
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
          "Config не працює в біомі 1"
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
          "Material = Neon обов'язково"
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
          "Додали Decal"
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
          "Полірування Arena-меча через TweenService"
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
          "Вимикає respawn"
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
          "Lesson 5.4 - Moving Platforms"
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Lesson 5.4 - Moving Platforms.",
      }
    ],
  },
};

export const ukLesson55 = {
  lessonId: "lesson-roblox-5-5",
  moduleId: "module-05",
  order: 5,
  title: "5.5 - Секрети + ключ-двері",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Спроєктувати опційний секрет, який не блокує основний шлях до Finish",
    "Створити Key Part і Door Part з чіткими іменами та читабельним натяком",
    "Відкрити двері через ProximityPrompt лише за наявності ключа на сервері",
    "Зберігати стан HasKey і Open на сервері без LocalScript як правди",
    "Підготувати секрет до playtest 5.6: без ключа Finish доступний"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 33 з 92)",
        content: `У **5.4** ти додав while-платформи з Config. Основний маршрут Obby уже вміє вчити, карати й повертати на checkpoint. Сьогодні додаєш **опційний шар дослідження**: секрет з ключем і дверима.

Це не Arena death/respawn і не обов'язковий тупик. Секрет винагороджує цікавість. Якщо гравець його пропустить - він усе одно має дійти до Finish основним шляхом.
| Було в 5.4 | Стає в 5.5 |
|-------------|------------|
| Основний маршрут з платформами | Той самий маршрут + бічний секрет |
| Немає дослідження | Ключ → двері → нагорода або shortcut |
| Усе обов'язкове | Секрет опційний |

У **5.6** тестер перевірить, чи секрет не блокує прохід і чи Prompt зрозумілий без твоїх слів.

основний шлях - дорога до школи; секрет - провулок із цікавою хвірткою, не блокпост перед входом.

**Зроби зараз (2 хв):** відкрий Place з 5.4 і познач на карті місце для секрету поза головним стрибковим коридором.`,
      },
      {
        title: "Секрет vs обов'язковий вузол",
        content: `У Obby є два типи контенту.

| Тип | Роль | Правило |
|-----|------|---------|
| Основний шлях | Spawn → Finish | Має проходитися без секрету |
| Секрет | Бонус, shortcut, кімната | Опційний; пропуск не ламає гру |

Поганий дизайн: двері стоять посеред єдиного проходу до біому 3, і без ключа гравець стоїть. Це не «секрет», а блокер. Хороший дизайн: ключ у бічному alcove біому 2, двері відкривають коротку нагороду або альтернативний стрибок, а основний маршрут іде поруч.

Перевірка одним реченням: якщо видалити Key і Door з Workspace, чи тестер усе одно дійде до Finish? Якщо ні - перенеси двері.

Не змішуй секрет із checkpoint progress. Checkpoint лишається на основному шляху. Секрет може давати додатковий CP або лише візуальну кімнату - але не єдиний спосіб зберегти прогрес.

**Зроби зараз (3 хв):** намалюй стрілку основного шляху і окрему петлю секрету. Переконайся, що петля не перетинає Finish як єдиний вхід.`,
      },
      {
        title: "Де поставити ключ і двері",
        content: `Розміщення вирішує, чи секрет читається як відкриття, чи як розчарування.

| Елемент | Добре | Погано |
|---------|-------|--------|
| Key | Ледь помітний alcove, інший колір/форма | Під прозорим Part без натяку |
| Door | Бачитьш з основного шляху, але обхід існує | Єдиний прохід у вузькому коридорі |
| Натяк | Billboard «?», Neon outline, трохи інший Material | Повний текст «натисни E за стіною» на весь екран |
| Дистанція | 10-40 studs від main path | На іншому кінці карти без причини |

Біом 2 - типовий дім для першого секрету: гравець уже вміє стрибати, але ще не втомлений фіналом. Біом 1 занадто рано для складного пошуку. Біом 3 може мати секрет, але не замість іспитового стрибка.

Двері мають виглядати як двері: більший Part, інший колір, Prompt з коротким ActionText. Ключ - менший Part або Mesh, Anchored true, CanCollide false або true за дизайном.

**Зроби зараз (6 хв):** створи Folder Secrets, Part Key_01 і Part Door_01 з різними кольорами. Постав їх так, щоб Door було видно з main path.`,
      },
      {
        title: "ProximityPrompt: навмисна дія",
        content: `Для ключа й дверей **ProximityPrompt** кращий за голий Touched. Гравець свідомо натискає E (або кнопку на UI), а не випадково збирає ключ плечем.

Типові налаштування:

| Property | Рекомендація |
|----------|--------------|
| ActionText | «Взяти ключ» / «Відкрити» |
| ObjectText | «Ключ» / «Таємні двері» |
| MaxActivationDistance | 8-12 |
| HoldDuration | 0 або 0.3 |
| RequiresLineOfSight | true, якщо не хочеш клік крізь стіну |

Prompt можна покласти в Key і в Door окремо, або лише в Door, а ключ підбирати Touched. Для уроку 5.5 простий і чесний варіант:

1. Touched або Prompt на Key → сервер ставить HasKey.
2. Prompt на Door → сервер перевіряє HasKey і відкриває.

Не роби два Prompt з однаковим текстом «Interact» на всьому рівні - тестер не зрозуміє, що саме відбувається.

Prompt - дзвінок у двері; Touched на ключі - підняти монету з підлоги.

**Зроби зараз (5 хв):** додай ProximityPrompt до Door_01 з ActionText «Відкрити» і MaxActivationDistance 10.`,
      },
      {
        title: "Серверна правда: HasKey і Open",
        content: `Стан «у гравця є ключ» живе на **сервері**. LocalScript може малювати іконку, але не вирішує, чи двері відчиняться.

Простий варіант на Player:

\`local hasKey = Instance.new("BoolValue")\`
\`hasKey.Name = "HasKey"\`
\`hasKey.Value = false\`
\`hasKey.Parent = player\`

Або Attribute на player: \`player:SetAttribute("HasKey", true)\`.

Для дверей:

\`door:SetAttribute("Open", false)\`

Коли Prompt спрацьовує на сервері:

1. Перевір player і Character.
2. Якщо HasKey == false - return або короткий feedback «потрібен ключ».
3. Якщо true - Open = true, CanCollide false / Transparency 1 / Destroy двері / Tween убік.
4. Опційно обнули ключ або залиш «використано».

Чому не LocalScript: клієнт може сказати «я вже маю ключ» без реального підбору. У 5.10 Badge і в M6 Coins та сама звичка - сервер вирішує нагороду.

**Зроби зараз (4 хв):** у Script на сервері створи HasKey для гравця в PlayerAdded і перевір print при зміні.`,
      },
      {
        title: "Підбір ключа",
        content: `Мінімальний серверний шаблон для Key:

\`local key = workspace.Secrets.Key_01\`
\`key.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local player = game.Players:GetPlayerFromCharacter(character)\`
\`  if not player then return end\`
\`  local hasKey = player:FindFirstChild("HasKey")\`
\`  if not hasKey or hasKey.Value then return end\`
\`  hasKey.Value = true\`
\`  key:Destroy() -- або Transparency = 1, CanTouch = false\`
\`end)\`

Debounce потрібен, якщо Key лишається в світі: кілька Touched за кадр не повинні спамити. Якщо Destroy одразу - другий виклик уже не знайде Part.

Не клади ключ у Character як єдину правду без серверного прапора: після смерті Character зникне, і «ключ у руці» пропаде разом із тілом, якщо ти не зберіг стан на Player.

Візуальний feedback: короткий ParticleEmitter Emit або зміна кольору UI пізніше. Сьогодні достатньо зникнення ключа й зміни BoolValue. Juice на повний рівень буде в 5.9.

**Зроби зараз (6 хв):** підключи Touched або Prompt на Key_01 так, щоб HasKey став true один раз і ключ зник.`,
      },
      {
        title: "Відкриття дверей",
        content: `Prompt на дверях слухає Triggered на сервері:

\`local prompt = door:WaitForChild("ProximityPrompt")\`
\`prompt.Triggered:Connect(function(player)\`
\`  local hasKey = player:FindFirstChild("HasKey")\`
\`  if not hasKey or not hasKey.Value then return end\`
\`  if door:GetAttribute("Open") then return end\`
\`  door:SetAttribute("Open", true)\`
\`  door.CanCollide = false\`
\`  door.Transparency = 1\`
\`  prompt.Enabled = false\`
\`end)\`

Альтернатива: TweenPosition дверей убік, Anchor лишається true. Destroy також ок, якщо двері більше не потрібні.

Анти-дубль: Open Attribute або prompt.Enabled = false після першого успіху. Інакше Triggered знову клікає «порожні» двері.

Без ключа Prompt може лишатись видимим - це натяк «сюди можна, але пізніше». Або зміни ObjectText на «Потрібен ключ». Не телепортуй гравця і не вбивай його за спробу без ключа.

**Зроби зараз (6 хв):** відкрий двері лише з HasKey true; без ключа Triggered нічого не ламає.`,
      },
      {
        title: "Що за дверима: нагорода без блокера",
        content: `За дверима має бути причина зайти, але не єдиний шлях уперед.

| Нагорода | Плюс | Мінус, якщо зробити обов'язковою |
|----------|------|----------------------------------|
| Shortcut до наступного біому | Відчуття «я знайшов швидший шлях» | Без ключа довгий шлях має лишатись |
| Кімната з декором / видом | Атмосфера | Порожня кімната розчаровує |
| Бонусний checkpoint | Менше повтору після смерті | Не замінює основні CP |
| Монета / бейдж пізніше | Мотивація | Не роби зараз економіку M6 |

Для 5.5 достатньо: коротка платформова секція або оглядовий майданчик + вихід назад на main path. Не будуй четвертий біом за дверима.

Якщо shortcut сильніший за main path, перевір у playtest 5.6: чи не змушує це всіх шукати ключ обов'язково. Shortcut - зручність, не єдиний прохідний маршрут.

**Зроби зараз (5 хв):** постав за Door_01 2-3 Parts нагороди або обхід і вихід на основний шлях.`,
      },
      {
        title: "Натяки без спойлерів",
        content: `Секрет, який ніхто не знаходить, - мертвий контент. Секрет, який кричить «натисни сюди», - вже не секрет.

Баланс натяків:

| Занадто мало | Достатньо | Занадто багато |
|--------------|-----------|----------------|
| Ключ кольору підлоги | Ледь інший відтінок / форма | Величезний Billboard з інструкцією |
| Двері як звичайна стіна | Рамка, щілина світла | Стрілка від Spawn до ключа |
| Жодного Prompt | Prompt лише біля дверей | Prompt на кожному Part коридору |

Дозволені натяки: відмінний Material, легкий звук пізніше в 5.9, вузький прохід убік, вікно, крізь яке видно кімнату. Заборонений анти-патерн для здачі: автор стоїть поруч і каже «там за тією стіною».

У 5.6 тестер покаже, чи натяк спрацював. Якщо 0 з 2 тестерів знайшли ключ за 5 хвилин - підсиль контраст, не додавай обов'язковість.

**Зроби зараз (3 хв):** зроби один візуальний натяк на ключ і один на двері. Більше двох великих підказок не став.`,
      },
      {
        title: "Смерть, respawn і ключ",
        content: `Obby вбиває часто. Секрет має переживати смерть чесно.

| Підхід | Поведінка |
|--------|-----------|
| HasKey на Player | Після смерті ключ лишається «в інвентарі стану» |
| Ключ лише в Character | Після смерті стан губиться, якщо не зберегти |
| Ключ respawn у світі | Можна підібрати знову, якщо двері ще зачинені |
| Двері вже Open | Лишаються відкритими для всіх або лише для власника |

Для одиночного Place курсу достатньо: HasKey на Player, двері Open глобально після першого відкриття. У мультиплеєрі пізніше можна відкривати двері лише для власника ключа - сьогодні не ускладнюй.

Checkpoint з 5.3 не повинен скидати HasKey. CharacterAdded може оновлювати GUI, але BoolValue на Player лишається.

Не прив'язуй відкриття дверей до Humanoid.Died - це стара Arena-логіка, не секрет Obby.

**Зроби зараз (4 хв):** підбери ключ, помри на hazard, respawn і перевір, що Prompt дверей усе ще відкриває їх.`,
      },
      {
        title: "Playtest секрету перед 5.6",
        content: `Короткий чесний тест сьогодні, повний багліст - завтра.

| # | Дія | Очікування |
|---|-----|------------|
| 1 | Іди до Finish без ключа | Прохід можливий |
| 2 | Знайди ключ за натяком | HasKey true, ключ зникає |
| 3 | Prompt дверей без ключа | Нічого критичного не ламається |
| 4 | Prompt з ключем | Двері відкриваються один раз |
| 5 | Повторний Prompt | Немає спаму / помилок |
| 6 | Смерть після ключа | Стан ключа або дверей коректний |
| 7 | Output | Без червоного спаму |

Якщо пункт 1 червоний - секрет став блокером. Виправ розміщення до Save.

Не вимірюй зараз difficulty curve всього рівня - це 5.7. Сьогодні лише: секрет опційний, стан серверний, Prompt зрозумілий.

**Зроби зараз (8 хв):** пройди сім пунктів і виправ перший провал одразу.`,
      },
      {
        title: "Що НЕ будувати в 5.5",
        content: `| Не роби зараз | Коли прийде |
|---------------|-------------|
| Повний магазин / Coins економіка | M6 |
| Badge за секрет | 5.10 за фініш; окремий badge - опційно пізніше |
| Juice Sound/Particles на весь рівень | 5.9 |
| Обов'язковий ключ на Finish | ніколи в цьому курсі |
| Складний інвентар на 10 предметів | M4 / хаб пізніше |
| DataStore збереження ключа між сесіями | не потрібно для 5.5 |

Дисципліна обсягу: один ключ, одні двері, одна нагорода. Другий секрет - optionalChallenge, не мінімум здачі.

Якщо тягне переписати всі біоми під «секретний парк» - зупинись. Main path з 5.1-5.4 лишається каркасом.

**Зроби зараз (2 хв):** викресли з плану все, що не є Key + Door + опційна нагорода.`,
      },
      {
        title: "Чекліст здачі й міст до 5.6",
        content: `Перед Save:

- [ ] Folder Secrets з Key_01 і Door_01
- [ ] Секрет не блокує Finish без ключа
- [ ] ProximityPrompt на дверях з зрозумілим ActionText
- [ ] HasKey на сервері (BoolValue або Attribute)
- [ ] Двері відкриваються один раз при валідному ключі
- [ ] Після смерті стан ключа/дверей перевірений
- [ ] Є мінімальний натяк без авторської підказки
- [ ] Save: **Lesson 5.5 - Secrets Key Door**

Далі **5.6 - Playtest #1 + багліст**. Тестер ітиме без твоїх слів: чи знайде ключ, чи впреться в двері, чи дійде до Finish без секрету. Запиши ці спостереження як окремі рядки багліста.

У 5.7 difficulty curve може послабити підхід до секрету, якщо він занадто жорсткий, але не зробить секрет обов'язковим. У 5.9 додаси короткий Sound на підбір ключа й відкриття дверей.

**Зроби зараз (2 хв):** Save Place як Lesson 5.5 - Secrets Key Door.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Двері стоять на єдиному проході до Finish",
      explanation: "Секрет перетворюється на блокер основного Obby.",
      correctApproach: "Основний шлях існує без ключа; двері - бічна нагорода або shortcut",
    },
    {
      mistake: "HasKey перевіряється лише в LocalScript",
      explanation: "Клієнт може підробити стан і відкрити двері без ключа.",
      correctApproach: "BoolValue/Attribute і Prompt.Triggered на сервері",
    },
    {
      mistake: "Ключ живе лише в Character без стану на Player",
      explanation: "Після смерті Character зникає і прогрес секрету губиться непередбачувано.",
      correctApproach: "Зберігай HasKey на Player; Character лише показує модель",
    },
    {
      mistake: "Touched відкриває двері без Prompt і без перевірки ключа",
      explanation: "Випадковий дотик або відсутність наміру ламає відчуття секрету.",
      correctApproach: "Prompt на дверях + серверна перевірка HasKey",
    },
    {
      mistake: "Жодного натяку: ключ кольору підлоги за невидимою стіною",
      explanation: "Тестер ніколи не знайде контент - секрет мертвий.",
      correctApproach: "Один-два візуальні натяки без текстового спойлера",
    },
    {
      mistake: "Будувати магазин, Badge і juice замість одного ключа",
      explanation: "Обсяг роздувається, мінімум здачі не закривається.",
      correctApproach: "Key + Door + опційна нагорода; решта - пізніші уроки",
    }
  ],
  summary: "Ти додав опційний секрет Obby: Key і Door з ProximityPrompt, серверним HasKey і одноразовим відкриттям. Основний шлях до Finish лишається доступним без ключа - готово до чесного playtest у 5.6.",
  practiceTask: {
    title: "Секрет: ключ і двері (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** один опційний секрет, який не блокує Finish.

### Part A - Сцена (10 хв)
1. Folder Secrets: Key_01 і Door_01.
2. Постав поза main path; Door видно з основного маршруту.
3. Додай один візуальний натяк на кожен об'єкт.

### Part B - Серверна логіка (15 хв)
1. HasKey на Player (BoolValue або Attribute).
2. Підбір ключа → HasKey true, ключ зникає.
3. Prompt на дверях відкриває лише з ключем; Open один раз.

### Part C - Перевірка (10 хв)
1. Finish без ключа.
2. Ключ → двері → нагорода/обхід.
3. Смерть після ключа.
4. **Save:** Lesson 5.5 - Secrets Key Door`,
    hints: [
      "Спочатку перевір маршрут без секрету - він має існувати",
      "Prompt.Triggered обробляй у Script, не в LocalScript",
      "Після Open вимкни Prompt, щоб не було повторних кліків"
    ],
    optionalChallenge: "Додай другий натяк: слабке світло з-під дверей або Billboard з «?» над alcove ключа - без прямого тексту маршруту.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна роль секрету в уроці 5.5?",
        options: [
          "Єдиний спосіб дійти до Finish",
          "Обов'язковий бій з NPC",
          "Опційне дослідження з ключем і дверима",
          "Заміна всіх checkpoint"
        ],
        correctAnswer: 2,
        explanation: "Секрет винагороджує цікавість і не блокує основний шлях.",
      },
      {
        id: "q2",
        type: MC,
        question: "Як перевірити, що секрет не блокер?",
        options: [
          "Видалити Key і Door уявно: Finish усе одно досяжний",
          "Зробити ключ обов'язковим на Spawn",
          "Поставити двері перед кожним біомом",
          "Вимкнути всі hazards"
        ],
        correctAnswer: 0,
        explanation: "Основний маршрут існує незалежно від секрету.",
      },
      {
        id: "q3",
        type: MC,
        question: "Де має жити правда HasKey?",
        options: [
          "Лише в LocalScript GUI",
          "У коментарі Workspace",
          "У Lighting",
          "На сервері: BoolValue або Attribute гравця"
        ],
        correctAnswer: 3,
        explanation: "Сервер вирішує, чи двері можуть відкритись.",
      },
      {
        id: "q4",
        type: MC,
        question: "Чому для дверей зручний ProximityPrompt?",
        options: [
          "Він автоматично зберігає DataStore",
          "Гравець робить навмисну дію, а не випадковий Touched",
          "Prompt працює лише в Edit Mode",
          "Він замінює Humanoid"
        ],
        correctAnswer: 1,
        explanation: "Навмисне натискання підходить для дверей і важливих взаємодій.",
      },
      {
        id: "q5",
        type: MC,
        question: "Що має статись при відкритті дверей з ключем?",
        options: [
          "Open один раз: CanCollide/Transparency або Tween, Prompt вимкнено",
          "Двері вбивають гравця",
          "Видаляється весь біом 2",
          "Скидаються всі checkpoint"
        ],
        correctAnswer: 0,
        explanation: "Одноразове відкриття без спаму Triggered.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що робити, якщо Triggered без ключа?",
        options: [
          "Відкрити двері все одно",
          "Телепортувати на Finish",
          "Нічого не ламати; опційно короткий feedback «потрібен ключ»",
          "Видалити HasKey у всіх гравців"
        ],
        correctAnswer: 2,
        explanation: "Без ключа двері лишаються зачиненими.",
      },
      {
        id: "q7",
        type: MC,
        question: "Де найкраще розмістити перший секрет?",
        options: [
          "На SpawnLocation замість біому 1",
          "Поза main path, з видимими дверима й легким натяком",
          "Як єдиний прохід у біом 3",
          "Усередині KillBrick"
        ],
        correctAnswer: 1,
        explanation: "Бічний alcove з читабельним натяком.",
      },
      {
        id: "q8",
        type: MC,
        question: "Що з нагород за дверима підходить для 5.5?",
        options: [
          "Повна економіка Coins і DataStore",
          "Обов'язковий Badge курсу",
          "Четвертий біом на 100 Parts",
          "Короткий shortcut, кімната або бонусний вид з виходом на main path"
        ],
        correctAnswer: 3,
        explanation: "Мала опційна нагорода, не новий модуль.",
      },
      {
        id: "q9",
        type: MC,
        question: "Чому ключ небезпечно тримати лише як Part у Character?",
        options: [
          "Character не може містити Parts",
          "Після смерті Character зникає і стан легко губиться",
          "Prompt тоді не існує",
          "ServerScriptService видаляє Character"
        ],
        correctAnswer: 1,
        explanation: "Стан на Player переживає respawn.",
      },
      {
        id: "q10",
        type: MC,
        question: "Який натяк найкращий для здачі?",
        options: [
          "Автор пояснює маршрут вголос",
          "Величезний текст «ключ за стіною ліворуч»",
          "Ледь інший колір/форма й Prompt на дверях",
          "Повна невидимість без жодної відмінності"
        ],
        correctAnswer: 2,
        explanation: "Баланс між знахідністю і спойлером.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що перевірити після смерті з уже взятим ключем?",
        options: [
          "Що HasKey або Open лишаються коректними для дверей",
          "Що всі Sounds видалились",
          "Що Finish зник",
          "Що Config платформ обнулився"
        ],
        correctAnswer: 0,
        explanation: "Секрет має переживати типовий Obby-death.",
      },
      {
        id: "q12",
        type: MC,
        question: "Чого НЕ робити в мінімумі 5.5?",
        options: [
          "Один Key і одні Door",
          "Серверну перевірку HasKey",
          "Повний juice на всі hazards і магазин монет",
          "Playtest Finish без ключа"
        ],
        correctAnswer: 2,
        explanation: "Juice і економіка - пізніші уроки.",
      },
      {
        id: "q13",
        type: MC,
        question: "Як 5.5 готує 5.6?",
        options: [
          "5.6 видаляє всі секрети",
          "Тестер перевірить опційність, натяки й Prompt без підказок автора",
          "Багліст більше не потрібен",
          "5.6 будує Arena меч"
        ],
        correctAnswer: 1,
        explanation: "Playtest вимірює, чи секрет читається й не блокує.",
      },
      {
        id: "q14",
        type: MC,
        question: "Який жанр цього уроку?",
        options: [
          "Arena з мечами",
          "Tycoon з дропером",
          "Simulator з Coins",
          "Obby з опційним секретом"
        ],
        correctAnswer: 3,
        explanation: "Модуль 5 - Obby; секрет - шар дослідження.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 5.5 - Secrets Key Door",
          "Lesson 5.4 - Platforms",
          "Lesson 5.6 - Playtest 1 Buglist",
          "Arena Death Respawn"
        ],
        correctAnswer: 0,
        explanation: "Чекліст вимагає Lesson 5.5 - Secrets Key Door.",
      }
    ],
  },
};

export const ukLesson56 = {
  lessonId: "lesson-roblox-5-6",
  moduleId: "module-05",
  order: 6,
  title: "5.6 - Playtest #1 + багліст",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Провести перший повний playtest Obby без підказок автору чи тестеру",
    "Записати баги з expected, actual, reproduce steps і доказом",
    "Розподілити проблеми за категоріями та пріоритетом P0-P3",
    "Виправляти одну причину за раз і робити короткий regression retest",
    "Підготувати перевірений багліст як вхідні дані для difficulty curve у 5.7"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 34 з 92)",
        content: `У **5.5** ти додав секрет, ключ і двері до Obby. На карті вже є три біоми, hazards, чекпоінти, таймер, GUI, while-платформи й опційний маршрут. Сьогодні ти не будуєш нову механіку. Ти перевіряєш, чи всі ці системи переживають **повний прохід від Spawn до Finish**.

Playtest #1 - перша чесна зустріч гри з гравцем. Автор знає кожен стрибок, прихований ключ і таймінг платформи. Тестер цього не знає. Саме тому його помилки корисніші за твоє «у мене працює».
| Було в 5.5 | Стає в 5.6 |
|-------------|------------|
| Автор знає маршрут | Незнайомий гравець перевіряє читабельність |
| Механіки тестувались окремо | Один прохід перевіряє їх разом |
| «Здається, працює» | Таблиця з доказами й пріоритетами |

У **5.7** багліст стане джерелом для difficulty curve. Без сьогоднішніх даних ти балансуватимеш Obby навмання.

**Зроби зараз (2 хв):** відкрий Place після 5.5, зроби окремий Save і напиши номер збірки: Build 5.6-A.`,
      },
      {
        title: "Чому автор не може бути єдиним тестером",
        content: `Ти проходив свій Obby десятки разів під час будівництва. Мозок уже пам'ятає, де платформа зникне, який Part є KillBrick і за якою стіною лежить ключ. Новий гравець бачить лише колір, форму й рух.

| Сліпа зона автора | Що бачить новачок |
|-------------------|-------------------|
| «Очевидний» перший стрибок | Два однакові маршрути без вказівника |
| «Легкий» таймінг платформи | Незрозуміло, коли вона рушить |
| «Помітний» checkpoint | Декоративний Part без feedback |
| «Логічний» секрет | Двері без натяку на ключ |
| «Чесний» hazard | Смерть від Part того самого кольору, що підлога |

Playtest не доводить, що тестер «уміє грати». Він показує, що гра **пояснює правила без автора поруч**. Якщо тестер іде не туди, це дані про навігацію. Якщо падає тричі на одному gap, це дані про difficulty. Якщо питає «а що робити?» - це не дурне питання, а дефект onboarding.

Твоє завдання - не захищати дизайн, а спостерігати. Фраза «треба було стрибнути з краю» знищує найцінніший доказ: звідки гравець мав це зрозуміти.

автор знає лабіринт зверху, тестер іде всередині стін.

**Зроби зараз (3 хв):** запиши три речі, які ти вважаєш «очевидними» у своєму Obby. Саме їх не пояснюй тестеру.`,
      },
      {
        title: "Заморозь збірку перед тестом",
        content: `Не змінюй Parts, Config і Scripts посеред одного прогону. Інакше перша половина тесту відбулась на Build A, друга - на Build B, а результати неможливо порівняти.

Перед стартом:

| Поле | Приклад |
|------|---------|
| Build | 5.6-A |
| Save | Lesson 5.6 - Playtest 1 Buglist |
| Дата / час | 19.07, 17:30 |
| Тестер | ім'я або Tester 1 |
| Пристрій | PC / laptop / mobile |
| Стартовий стан | новий сервер, Spawn біому 1 |

Після Save зроби короткий smoke test: Spawn працює, Output не має червоних помилок, Finish існує, таймер стартує. Smoke test не замінює playtest - він лише не дає витратити сесію на очевидно зламану збірку.

Якщо під час прогону побачив баг, **запиши**, але не відкривай Edit і не рухай Part. Заверши маршрут або зафіксуй P0, який блокує продовження. Потім створи Build 5.6-B із виправленням.

Образ: не ремонтуй літак, поки вимірюєш його політ.

**Зроби зараз (4 хв):** заповни п'ять полів тестової сесії й натисни Save до запрошення тестера.`,
      },
      {
        title: "Ролі: тестер грає, автор спостерігає",
        content: `Перед Play домовся про прості ролі.

**Тестер:**
- грає від Spawn до Finish;
- говорить уголос, що бачить і чого очікує;
- не намагається бути ввічливим;
- після смерті пояснює, чому, на його думку, це сталось.

**Автор-спостерігач:**
- не підказує маршрут, ключ чи таймінг;
- записує час, смерті, паузи й питання;
- просить повторити дію, якщо треба reproduce;
- ставить уточнення після події, не під час стрибка.

Корисні питання після сегмента: «Що ти думав, що станеться?», «Що підказало тобі йти сюди?», «Чому ця смерть здалась чесною або нечесною?». Некорисне питання: «Тобі ж сподобалось, правда?» - воно штовхає до приємної відповіді.

Якщо немає іншої людини, зроби self-test з обмеженнями: стартуй із нового сервера, не використовуй Explorer, не пропускай біоми, записуй екран і коментуй рішення вголос. Це слабше за peer, але краще за швидке пробігання напам'ять.

**Зроби зараз (3 хв):** передай тестеру одну інструкцію: «Дійди до фінішу й говори, що очікуєш. Я не підказую».`,
      },
      {
        title: "Сценарій повного проходу",
        content: `Один і той самий сценарій робить результати порівнюваними. Не телепортуй тестера одразу до «цікавого місця».

| Крок | Що перевірити |
|------|---------------|
| 1. Spawn | Чи зрозумілий напрямок до біому 1 |
| 2. Перші hazards | Чи читається небезпека до смерті |
| 3. Checkpoint | Чи видно, що прогрес зараховано |
| 4. Respawn | Чи повертає на останній checkpoint |
| 5. while-платформа | Чи можна прочитати цикл і дочекатись вікна |
| 6. Ключ-двері | Чи основний шлях не блокується секретом |
| 7. Біом 3 | Чи складно через навичку, а не випадковість |
| 8. Finish | Чи таймер зупиняється і результат зрозумілий |

Дозволь тестеру померти. Смерть перевіряє checkpoint і повторний маршрут. Але якщо баг знищив прогрес або застряг Character, це P0/P1, а не «нехай ще спробує».

Зафіксуй три прості числа: загальний час, кількість смертей і найдовшу паузу без руху. Це ще не повний баланс - він буде у 5.7 - але числа показують, де копати.

**Зроби зараз (2 хв):** скопіюй вісім кроків у нотатки й залиш місце для часу, смертей та найдовшої паузи.`,
      },
      {
        title: "Багліст: один рядок - одна проблема",
        content: `Багліст - не список «щось дивне». Кожен рядок має дозволити іншій людині знайти проблему без твоєї пам'яті.

| ID | Місце | Expected | Actual | Steps | Priority | Доказ |
|----|-------|----------|--------|-------|----------|-------|
| OBBY-01 | CP після біому 1 | Respawn тут | Respawn на старті | Touch CP → die | P1 | відео 00:42 |
| OBBY-02 | DoorSecret | Відкрити з ключем | Двері лишаються | Take key → Prompt | P1 | screenshot |
| OBBY-03 | Moving_02 | Цикл 2 с | Part зависає | Wait 3 cycles | P2 | Output line |

**Expected** - що мало статись за правилами. **Actual** - що реально побачив тестер. **Steps** - коротка послідовність від чистого стану. «Я стрибнув і воно зламалось» не відтворюється.

Не зливай три симптоми в один рядок. «Checkpoint не світиться, таймер не оновився, respawn неправильний» може мати одну або три причини. Створи окремі записи, потім об'єднай, якщо доказ показав спільний root cause.

Багліст також приймає UX-проблеми: тестер не бачить шлях, не розуміє Prompt, втомлюється від довгого повтору. Не лише червоні помилки є багами продукту.

**Зроби зараз (5 хв):** створи таблицю з сімома колонками й заздалегідь додай ID OBBY-01.`,
      },
      {
        title: "Пріоритет P0-P3",
        content: `Пріоритет відповідає на питання «що виправляти першим», а не «що мене найбільше дратує».

| Рівень | Значення | Приклад в Obby |
|--------|----------|----------------|
| P0 | Прохід неможливий для всіх | Finish відсутній, серверний Script падає |
| P1 | Основний прогрес ламається часто | Checkpoint не зберігає, двері блокують main path |
| P2 | Прохід можливий, але досвід поганий | Нечесний gap, платформа інколи зависає |
| P3 | Косметика або дрібна незручність | Part криво стоїть, текст трохи зміщений |

Спочатку P0, потім P1. Не поліруй колір дверей P3, поки respawn кидає тестера на початок. Водночас не називай усе P0, інакше пріоритет перестає щось означати.

Severity і frequency можна записувати окремо. Рідкісний повний softlock може бути P1, а часта маленька візуальна щілина - P3. Для уроку достатньо одного Priority, але поясни його одним реченням.

Якщо тестер просто не пройшов важкий стрибок, це не автоматично баг. Запиши P2 «можливий difficulty spike» і перевір у 5.7 на ще одному проході.

**Зроби зараз (3 хв):** постав Priority кожному запису й відсортуй таблицю P0 → P3.`,
      },
      {
        title: "Reproduce steps і докази",
        content: `Баг існує для команди лише тоді, коли його можна побачити ще раз або коли є достатній доказ рідкісного збою.

Хороші reproduce steps:
1. Запусти новий сервер на Build 5.6-A.
2. Торкнись Checkpoint_02.
3. Впади в Lava_03.
4. Перевір місце respawn.
5. Actual: Spawn біому 1; expected: Checkpoint_02.

Погані steps: «пограй трохи», «десь у лаві», «іноді не працює».

Докази за силою:
- коротке відео з видимим маршрутом;
- screenshot до/після;
- точний текст Output з часом;
- значення Properties або Attribute під час Play;
- усне «здається» без повтору - найслабше.

Не записуй приватні дані тестера й не знімай зайве. Для курсу достатньо екрану Studio/Roblox та номера Build.

Якщо баг не повторився, не видаляй запис. Познач Frequency: 1/3 або Cannot reproduce і залиш доказ. Можливо, причина залежить від respawn чи порядку подій.

**Зроби зараз (5 хв):** для найважливішого бага виконай steps двічі й допиши Frequency 2/2, 1/2 або 0/2.`,
      },
      {
        title: "Категорії: перевір увесь Obby, не лише код",
        content: `Категорія допомагає побачити, де накопичився борг.

| Категорія | Що туди входить |
|-----------|------------------|
| Gameplay | gap, collision, moving platform, hazard |
| Progress | checkpoint, respawn, finish, timer |
| Navigation | напрямок, біоми, видимість цілі |
| Secret | ключ, двері, Prompt, опційність |
| UI | таймер, checkpoint label, текст |
| Performance | лаг, нескінченний цикл, спам Output |
| Polish | колір, звук, частинки, вирівнювання |

На 5.6 не треба додавати Sound і Particles - це 5.9. Якщо тестер не помітив checkpoint, запиши UX-проблему зараз; рішення з juice прийде пізніше. Не випереджай курс і не маскуй несправний checkpoint красивими іскрами.

Особливо перевір секрет із 5.5: він має бути винагородою, а не обов'язковим вузьким проходом. Якщо тестер не знайшов ключ, основний Finish усе одно доступний. Якщо без ключа пройти неможливо, це P1 design bug.

Кілька багів однієї категорії показують системну причину. Три проблеми Progress важливіші за три окремі криві декорації.

**Зроби зараз (3 хв):** додай Category до кожного рядка та порахуй, у якій категорії найбільше проблем.`,
      },
      {
        title: "Спостереження за поведінкою, не лише за помилками",
        content: `Тестер може не сказати «це баг», але його поведінка вже дає сигнал.

Записуй:
- паузу понад 5 секунд без руху;
- повторний погляд або поворот назад;
- три однакові смерті поспіль;
- спробу стрибнути на декорацію замість маршруту;
- ігнорування checkpoint чи Prompt;
- питання «це сюди?»;
- випадкове знаходження секрету без розуміння нагороди.

Перетвори спостереження на гіпотезу, не на вирок. «Тестер стояв 8 секунд перед біомом 2» - факт. «Стрілка входу недостатньо контрастна» - гіпотеза. Перевір її другим прогоном або точковою зміною.

Не вимірюй сьогодні складну статистику. Для Playtest #1 достатньо часу проходу, смертей, пауз і місць, де потрібна підказка. У 5.7 ці дані стануть картою difficulty curve.

багліст - не суд над грою, а карта місць, де вона перестала говорити з гравцем.

**Зроби зараз (4 хв):** додай у багліст хоча б одне поведінкове спостереження, навіть якщо код не показав помилки.`,
      },
      {
        title: "Triage: одна причина, один фікс",
        content: `Після завершення прогону відсортуй записи й обери перший P0/P1. Не хапайся за всі рядки одночасно.

Ритуал triage:
1. Підтвердь reproduce steps.
2. Знайди найменшу ймовірну причину.
3. Зміни одну річ.
4. Перевір саме цей сценарій.
5. Запиши Fixed in Build 5.6-B або Reopen.

Приклад: respawn іде на старт. Не пересувай SpawnLocation, не переписуй GUI й не змінюй timer одночасно. Спочатку перевір, чи сервер зберіг номер Checkpoint_02 і чи CharacterAdded читає його.

Для difficulty-проблем не перебудовуй біом сьогодні. Запиши точне місце, кількість смертей і гіпотезу. У 5.7 ти змінюватимеш gap, width, timing або checkpoint density **по одному важелю**.

Статуси багліста: Open, In progress, Fixed, Retest, Reopen, Won't fix (з причиною). «Fixed» до перевірки - лише припущення; після зміни став Retest.

**Зроби зараз (6 хв):** обери найвищий P0/P1, зроби один мінімальний фікс і зміни статус на Retest.`,
      },
      {
        title: "Regression retest після фіксу",
        content: `Regression - перевірка, що фікс не зламав сусідні системи. Після checkpoint-фіксу недостатньо один раз торкнутись Part.

Мінімальний regression-набір:

| Фікс | Що повторити |
|------|--------------|
| Checkpoint | touch → die → respawn → наступний CP |
| Hazard | звичайний touch, повторний touch, respawn |
| Moving platform | 3 цикли, стрибок на/з платформи |
| Key-door | без ключа, з ключем, після respawn |
| Finish/timer | повний старт і коректна зупинка |

Виконуй retest на **новій збірці**, Build 5.6-B. У баглісті лиши старий запис і допиши результат. Не стирай історію - вона пояснює, що змінилось.

Якщо фікс пройшов точний steps, але зламав наступний checkpoint, статус Reopen або новий P1. Це нормальний результат тестування, а не провал.

Після P0/P1 зроби короткий маршрут до сусіднього checkpoint. Повний peer-run усієї гри буде у 5.8; сьогодні достатньо доказу, що блокер виправлений і не створив очевидну регресію.

**Зроби зараз (5 хв):** повтори steps виправленого бага й один сусідній сценарій, запиши Pass/Fail у колонку Retest.`,
      },
      {
        title: "Чекліст здачі й міст до 5.7",
        content: `Перед Save перевір:

- [ ] Build 5.6-A зафіксований до тесту
- [ ] Тестер пройшов маршрут без підказок автора
- [ ] Записані час, смерті й найдовша пауза
- [ ] Багліст має мінімум 5 конкретних записів
- [ ] Кожен запис має expected, actual, steps, category та priority
- [ ] Є хоча б один доказ: відео, screenshot або Output
- [ ] Один P0/P1 виправлено або обґрунтовано, чому його немає
- [ ] Regression retest виконано на Build 5.6-B
- [ ] Difficulty-спостереження не замасковані декором
- [ ] Save: **Lesson 5.6 - Playtest 1 Buglist**

Далі **5.7 - Difficulty curve**. Візьми баги типу «занадто важко», «занадто легко», «нечесно» і перетвори їх на керовані зміни gap, ширини, timing та щільності checkpoint. Не починай 5.7 з порожнім баглістом.

У 5.8 інша людина зробить контрольний повний прохід після твоїх змін. У 5.9 з'являться Sound і Particles. У 5.10 - Ship + Badge. Сьогоднішній документ тримає весь цей ланцюг на фактах.

**Зроби зараз (2 хв):** збережи Place і багліст під назвою Lesson 5.6 - Playtest 1 Buglist.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Автор підказує тестеру маршрут і таймінг",
      explanation: "Підказка приховує дефекти навігації та onboarding.",
      correctApproach: "Мовчати під час проходу, ставити питання після події",
    },
    {
      mistake: "Баг описаний як «щось не працює»",
      explanation: "Без expected, actual і steps інша людина не повторить проблему.",
      correctApproach: "Один рядок на проблему з точним місцем і доказом",
    },
    {
      mistake: "Усі проблеми позначені P0",
      explanation: "Пріоритет перестає відрізняти блокер від косметики.",
      correctApproach: "P0 прохід неможливий; P1 прогрес; P2 досвід; P3 косметика",
    },
    {
      mistake: "Фікс внесено посеред тестового прогону",
      explanation: "Результати змішують дві різні збірки й не порівнюються.",
      correctApproach: "Заморозити Build A, потім виправляти у Build B",
    },
    {
      mistake: "Після фіксу перевірено лише один клік",
      explanation: "Сусідня система могла зламатись через ту саму зміну.",
      correctApproach: "Точний reproduce test плюс короткий regression-набір",
    },
    {
      mistake: "Difficulty-проблему одразу закрили декором",
      explanation: "Красивий Part не виправляє unfair gap або неправильний timing.",
      correctApproach: "Записати спостереження й передати його в difficulty curve 5.7",
    }
  ],
  summary: "Ти заморозив збірку Obby, провів повний playtest без підказок, записав відтворювані баги з priority P0-P3, виправив один блокер і підтвердив його regression retest. Багліст готовий стати картою difficulty curve у 5.7.",
  practiceTask: {
    title: "Playtest #1 і багліст (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** один чесний прогін Obby, багліст із доказами та перевірений фікс.

### Part A - Підготовка (7 хв)
1. Save Build 5.6-A.
2. Створи таблицю ID / Place / Expected / Actual / Steps / Category / Priority / Evidence.
3. Дай тестеру інструкцію без підказки маршруту.

### Part B - Повний прогін (15 хв)
1. Від Spawn до Finish без телепортів.
2. Запиши час, смерті, паузи й питання.
3. Збери мінімум 5 конкретних записів.

### Part C - Triage і retest (13 хв)
1. Відсортуй P0 → P3.
2. Виправ один P0/P1 мінімальною зміною у Build 5.6-B.
3. Повтори reproduce steps і сусідній regression-сценарій.
4. **Save:** Lesson 5.6 - Playtest 1 Buglist`,
    hints: [
      "Не пояснюй тестеру, куди йти - пауза є даними",
      "Expected і Actual пиши окремо, навіть якщо різниця здається очевидною",
      "Difficulty spike не перебудовуй одразу - передай точні дані в 5.7"
    ],
    optionalChallenge: "Проведи другий короткий тест з іншим гравцем і познач, які проблеми повторились у двох людей.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головний результат уроку 5.6?",
        options: [
          "Новий четвертий біом",
          "Sound і ParticleEmitter на кожній події",
          "Відтворюваний багліст і перевірений фікс",
          "Public-реліз без повторного тесту"
        ],
        correctAnswer: 2,
        explanation: "Playtest перетворює спостереження на багліст і retest.",
      },
      {
        id: "q2",
        type: MC,
        question: "Чому автор не має підказувати тестеру?",
        options: [
          "Підказка приховує проблеми навігації та пояснення правил",
          "Тестер повинен читати код у ServerScriptService",
          "Будь-яка розмова зупиняє Play Mode",
          "Підказки автоматично змінюють difficulty"
        ],
        correctAnswer: 0,
        explanation: "Потрібно побачити, що гра пояснює сама.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо фіксувати Build 5.6-A перед прогоном?",
        options: [
          "Щоб автоматично створити Badge",
          "Щоб заборонити тестеру помирати",
          "Щоб увімкнути Team Create",
          "Щоб усі спостереження стосувались однієї незмінної збірки"
        ],
        correctAnswer: 3,
        explanation: "Змішані версії не дають порівнюваного результату.",
      },
      {
        id: "q4",
        type: MC,
        question: "Який запис бага найкращий?",
        options: [
          "Checkpoint дивний",
          "Touch CP_02 → die → respawn на старті; expected CP_02",
          "У мене вчора працювало",
          "Тестер не вміє грати"
        ],
        correctAnswer: 1,
        explanation: "Є місце, steps, actual і expected.",
      },
      {
        id: "q5",
        type: MC,
        question: "Що є P0 для Obby?",
        options: [
          "Finish неможливо досягти через зламаний основний шлях",
          "Текст таймера зміщений на кілька pixels",
          "Декорація має інший Material",
          "Один gap здається трохи легким"
        ],
        correctAnswer: 0,
        explanation: "P0 блокує основний прохід для всіх.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що робити з трьома однаковими смертями тестера?",
        options: [
          "Одразу видалити весь біом",
          "Сказати правильний таймінг і не записувати",
          "Зафіксувати місце як можливий difficulty або fairness дефект",
          "Додати частинки, не змінюючи стрибок"
        ],
        correctAnswer: 2,
        explanation: "Поведінка є доказом для triage та 5.7.",
      },
      {
        id: "q7",
        type: MC,
        question: "Коли проблема може отримати статус Fixed?",
        options: [
          "Одразу після зміни коду без Play",
          "Після повторення steps і успішного retest",
          "Коли автор більше не пам'ятає про неї",
          "Після зміни кольору рядка таблиці"
        ],
        correctAnswer: 1,
        explanation: "Зміна створює Retest; доказ переводить у Fixed.",
      },
      {
        id: "q8",
        type: MC,
        question: "Що перевіряти після фіксу checkpoint?",
        options: [
          "Лише його колір в Edit Mode",
          "Тільки перший touch без смерті",
          "Лише Output до запуску сервера",
          "Touch, смерть, respawn і перехід до наступного checkpoint"
        ],
        correctAnswer: 3,
        explanation: "Regression-набір перевіряє весь сусідній прогрес.",
      },
      {
        id: "q9",
        type: MC,
        question: "Яке твердження про 5.5 key-door правильне?",
        options: [
          "Ключ обов'язково має блокувати основний Finish",
          "Двері не треба тестувати після respawn",
          "Секрет має бути опційним і не ламати основний маршрут",
          "Prompt автоматично виправляє всі баги дверей"
        ],
        correctAnswer: 2,
        explanation: "Секрет винагороджує дослідження, а не блокує Obby.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що є фактом, а не гіпотезою?",
        options: [
          "Тестер стояв 8 секунд перед входом у біом 2",
          "Стрілка точно занадто темна",
          "Усі новачки ненавидять цей біом",
          "Потрібно перебудувати весь рівень"
        ],
        correctAnswer: 0,
        explanation: "Спостережувана пауза - факт; причина потребує перевірки.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що робити, якщо баг повторився лише один раз із трьох?",
        options: [
          "Видалити запис як вигаданий",
          "Позначити Frequency 1/3 і зберегти доказ",
          "Автоматично поставити P3",
          "Оголосити гру повністю готовою"
        ],
        correctAnswer: 1,
        explanation: "Рідкісний баг лишається даними з частотою.",
      },
      {
        id: "q12",
        type: MC,
        question: "Який порядок triage правильний?",
        options: [
          "P3 → P2 → P1 → P0",
          "Спочатку найкрасивіший фікс",
          "Усі зміни одночасно",
          "P0 → P1 → P2 → P3"
        ],
        correctAnswer: 3,
        explanation: "Блокери й прогрес важливіші за косметику.",
      },
      {
        id: "q13",
        type: MC,
        question: "Куди передати спостереження про unfair gap?",
        options: [
          "У список SoundId для 5.9",
          "У Game Settings перед Public",
          "У багліст як вхідні дані difficulty curve 5.7",
          "У BadgeService"
        ],
        correctAnswer: 2,
        explanation: "5.7 працює з Hard/Easy/Unfair даними playtest.",
      },
      {
        id: "q14",
        type: MC,
        question: "Що не варто робити посеред прогону Build A?",
        options: [
          "Записувати смерті",
          "Змінювати Parts або Config і продовжувати той самий тест",
          "Фіксувати питання тестера",
          "Зберігати відеодоказ"
        ],
        correctAnswer: 1,
        explanation: "Фікси належать наступній збірці.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save уроку 5.6?",
        options: [
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.7 - Difficulty Curve",
          "Lesson 5.5 - Secret Door",
          "Arena Checkpoint Final"
        ],
        correctAnswer: 0,
        explanation: "Save фіксує перший Obby playtest і багліст.",
      }
    ],
  },
};

export const ukLesson57 = {
  lessonId: "lesson-roblox-5-7",
  moduleId: "module-05",
  order: 7,
  title: "5.7 - Difficulty curve",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Перетворити багліст 5.6 на карту точок, де крива складності ламається",
    "Крутити gap, width, hazard timing і щільність checkpoint як окремі важелі балансу",
    "Змінювати лише один важіль за ітерацію і фіксувати числа в Config",
    "Розподілити біоми за ролями teach, train і exam без повного перебудовування",
    "Провести retest Better/Same/Worse і підготувати збірку до peer run у 5.8"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 35 з 92)",
        content: `У **5.6** ти зібрав багліст з playtest #1: час, смерті, паузи й записи типу «занадто важко», «нечесно», «не зрозуміло куди». Сьогодні ти **не перебудовуєш Obby з нуля**. Ти вирівнюєш **difficulty curve** - послідовність, де складність зростає передбачувано від біому 1 до фінішу.
| Було в 5.6 | Стає в 5.7 |
|------------|------------|
| «Тут усі падають» | Конкретна зміна gap або timing |
| Авторські відчуття | Числа до/після в таблиці |
| Баг без дії | Одна правка + короткий retest |

У **5.8** інша людина зробить контрольний повний прохід після твоїх змін. У **5.9** додаси Sound і Particles - але лише коли маршрут уже чесний. У **5.10** Place піде в Ship + Badge. Сьогоднішня робота - щоб peer у 5.8 не ловив unfair spike, який ти вже бачив у баглісті.

**Зроби зараз (2 хв):** відкрий Save **Lesson 5.6 - Playtest 1 Buglist** і виділи рядки з Category Gameplay або Navigation, де тестер падав тричі поспіль.`,
      },
      {
        title: "Вхідні дані: багліст як карта, не як смітник",
        content: `Difficulty curve будується з **фактів playtest**, а не з «мені здається легко». Візьми багліст 5.6 і відфільтруй рядки, які стосуються балансу:

| Сигнал у баглісті | Що це означає для кривої |
|-------------------|--------------------------|
| Три смерті на одному gap | Можливий spike або занадтий стрибок після легкого блоку |
| Пауза 8+ секунд без руху | Навігація або страх перед наступним кроком |
| «Нечесно» після hazard | Timing, ширина платформи або невидимий hitbox |
| «Занадто легко» у біомі 3 | Exam-зона не відчувається фіналом |
| Checkpoint ігнорують | CP стоїть не там, де гравець реально застрягає |

Не чіпай сьогодні P0/P1 з Progress, Secret або Performance - їх triage вже був у 5.6. Якщо respawn ламається, curve не має сенсу: спочатку стабільний прогрес, потім баланс.

Створи коротку таблицю **Curve Map**:

| ID бага | Біом | Місце | Гіпотеза важеля | Пріоритет curve |
|---------|------|-------|-----------------|-----------------|
| OBBY-04 | 2 | Gap_07 | gap +2 studs | високий |

Один рядок багліста може дати одну точку на карті. Не зливай «важкий стрибок» і «не видно шляху» в одну зміну - navigation вирішуй окремо від gap.

**Зроби зараз (4 хв):** перенеси мінімум 3 difficulty-рядки з 5.6 у Curve Map з колонкою «важіль».`,
      },
      {
        title: "Difficulty curve - це не total redesign",
        content: `Помилка початківця: після playtest знести біом 2 і зібрати «красивіше». Це новий рівень, а не curve. **Curve** - це дрібні керовані зрушення в межах існуючого маршруту.

Що входить у curve сьогодні:
- gap між платформами (Position / Size по X або Z);
- width проходу (Size платформи);
- hazard timing (\`waitUp\`, \`waitDown\` у Config while-платформ);
- щільність checkpoint (де ставиш наступний CP після важкого блоку).

Що **не** входить:
- новий четвертий біом;
- заміна всієї секції key-door;
- декор, Sound, ParticleEmitter (це **5.9**);
- Game Settings і Badge (**5.10**).

Уяви графік складності по трьох біомах: лінія має **плавно підніматись**, без вертикальної стіни посеред train-зони. Якщо біом 1 легкий, біом 2 різко неможливий, а біом 3 знову легкий - це не «цікаво», це зламаний профіль.

Правило уроку: **не більше 20% Parts у біомі** за одну ітерацію. Якщо треба рухати більше - розбий на дві ітерації з retest між ними.

**Зроби зараз (3 хв):** для кожного біому запиши одне речення «зараз відчувається як teach / train / exam або ні».`,
      },
      {
        title: "Чотири важелі балансу",
        content: `У Obby SmartCode є чотири основні **важелі**. Кожен змінює досвід по-іншому:

| Важіль | Де живе | Що змінює | Типова помилка |
|--------|---------|-----------|----------------|
| **Gap** | Відстань між платформами | Довжина стрибка | Змінити gap і width одночасно |
| **Width** | Size платформи по X/Z | Площа для приземлення | Зробити так вузько, що camera заважає |
| **Hazard timing** | \`PlatformConfig\` | Вікно безпечного кроку | waitUp = 0.1 «для хардкору» |
| **CP density** | Розміщення Checkpoint Parts | Ціна помилки після важкого блоку | CP кожні 2 studs - exam зникає |

**Gap:** +1 stud помітніший, ніж здається. Якщо тестер падав на Gap_07, спробуй спочатку **зменшити** gap на 1-2 studs або додати проміжну «подушку» width, але не обидва в одній ітерації.

**Width:** ширша платформа прощає неточний стрибок без зміни довжини. Корисно, коли проблема «майже долетів».

**Timing:** з \`5.4\` ти вже маєш цикл. Крути \`waitUp\` / \`waitDown\` у Config, не переписуй while-логіку.

**CP density:** після довгої train-секції без CP один важкий стрибок = rage quit. Після exam-блоку CP можна рідше - гравець уже навчився.

**Зроби зараз (5 хв):** для топ-1 точки з Curve Map обери **один** важіль і запиши поточне число (stud або секунда з Config).`,
      },
      {
        title: "Одна зміна за ітерацію",
        content: `Якщо в одній ітерації ти зменшив gap, розширив платформу і скоротив \`waitDown\`, retest нічого не доведе. Ти не знаєш, що саме допомогло.

Ритуал ітерації:
1. Build **5.7-A** (або B, C...) - Save перед зміною.
2. Зміни **рівно один** важіль у **одному** місці.
3. Запиши Before / After у таблицю.
4. Self-retest: пройди проблемний сегмент 3 рази.
5. Оцінка: Better / Same / Worse.
6. Save з номером ітерації в Notes.

| Ітерація | Build | Місце | Важіль | Before | After | Retest |
|----------|-------|-------|--------|--------|-------|--------|
| 1 | 5.7-A | Gap_07 | gap | 8 studs | 6 studs | Better |
| 2 | 5.7-B | Moving_03 | waitUp | 2.0 | 2.5 | Same |

**Same** не провал - можливо, важіль обрано не той. Спробуй width замість gap або додай CP перед блоком. **Worse** - відкотись до попереднього Save і спробуй інший важіль.

Не роби п'ять ітерацій підряд без жодного запису. Peer у 5.8 запитає «що саме ти міняв між 5.6 і зараз» - таблиця має відповісти за тебе.

**Зроби зараз (6 хв):** зроби ітерацію 1 з одним важелем на найгіршій точці Curve Map і заповни рядок Before/After.`,
      },
      {
        title: "Config numbers: пульт без переписування коду",
        content: `While-платформи з **5.4** читають таймінги з \`PlatformConfig\` (ModuleScript або table у Script). Саме там живуть числа для **hazard timing** як важеля curve.

Типовий фрагмент Config:
\`local PlatformConfig = {\`
\`  Moving_01 = { waitUp = 2.0, waitDown = 1.5 },\`
\`  Moving_02 = { waitUp = 1.8, waitDown = 1.2 },\`
\`}\`

Правила роботи з Config сьогодні:
- змінюй числа **у Config**, не дублюй цикл у новому Script;
- коментуй рядок: \`-- 5.7 iter2: waitUp 2.0→2.5 Gap fix OBBY-06\`;
- не чіпай імена ключів - Script уже посилається на \`Moving_02\`;
- після зміни перезапусти Play і подивись **3 повні цикли**, не один.

Gap і width зазвичай в Properties Part у Studio. Запиши їх у ту саму таблицю ітерацій, щоб Config і Parts не жили в різних нотатках.

Якщо проблема «платформа їде занадто швидко для exam», збільш \`waitUp\` на 0.3-0.5 с за раз. Стрибок на 2 с за раз робить retest безглуздим.

У **5.8** перевірять, чи exam-біом відчувається складнішим за train, але не unfair. Числа Config - твій доказ, що ти крутив timing свідомо.

**Зроби зараз (4 хв):** відкрий Config, знайди платформу з багліста 5.6 і допиши коментар з датою поточної ітерації.`,
      },
      {
        title: "Ролі біомів: teach → train → exam",
        content: `Три біоми з **5.1** задумувались не як «три однакові зони», а як **три ролі** на кривій:

| Роль | Біом | Що гравець вчиться | Типова складність |
|------|------|--------------------|-------------------|
| **Teach** | 1 | Читати hazard, базовий стрибок, перший CP | Низька, прощає помилку |
| **Train** | 2 | Комбінувати рух, while, щільніші gap | Середня, CP частіше |
| **Exam** | 3 | Використати все без підказок | Вища, CP рідше |

Сьогодні не перейменовуй Folder - перевір, чи **поведінка** відповідає ролі. Якщо teach вже з gap як у exam, у 5.6 тестер міг здатися «не вміє грати», хоча curve зламана з першого метра.

Checklist по ролях:
- **Teach:** один новий патерн за раз (лава **або** перший рухомий блок, не обидва одразу).
- **Train:** повторення патерну з варіацією (інший timing, трохи довший gap).
- **Exam:** без нових правил - лише жорсткіша комбінація вже відомого.

Якщо exam легший за train, гравець розчарований фіналом. Якщо train складніший за exam - крива перевернута. Виправ це важелями, не новими біомами.

Після правок пройди **лише біом 3** очима exam: чи є один чіткий «найважчий» блок перед Finish, а не випадкова стіна посеред train?

**Зроби зараз (5 хв):** для кожного біому запиши одну цільову зміну важеля (gap, width, timing або CP).`,
      },
      {
        title: "Unfair spikes: коли складність - це баг дизайну",
        content: `Не кожна смерть означає «треба легше». Деякі означають **unfair spike** - місце, де гравець не мав шансу прочитати правило.

Ознаки unfair:
- hazard того самого кольору, що безпечна підлога (**5.2**);
- gap після blind corner без попереднього стрибка схожої довжини;
- while-платформа з вікном коротшим за час реакції людини (~0.4 с);
- смерть від hitbox ширший за видиму модель;
- обов'язковий стрибок одразу після respawn без розгону.

Ознаки **чесної** складності:
- тестер кожен раз падає **трохи** по-іншому (значить пробує, а не здається);
- після підказки «дивись на цикл» проходить за 2-3 спроби;
- смерть супроводжується розумінням «я прогавив timing», не «гра зламалась».

Unfair spike виправляй **першим** у curve-роботі, навіть якщо Priority у баглісті був P2. Juice у **5.9** не зробить червону лаву читабельною.

Типові фікси spike без redesign:
- змінити Material/Color hazard (не juice - базова читабельність);
- додати одну «репетиційну» платформу перед exam-gap;
- збільшити \`waitUp\` на 0.5 с;
- перенести CP **перед** spike, не після.

**Зроби зараз (4 хв):** познач у Curve Map мінімум один рядок як «unfair» або «fair hard» і запиши, який важіль застосуєш.`,
      },
      {
        title: "Retest: Better, Same, Worse",
        content: `Після кожної ітерації потрібен **короткий retest**, не повний peer run. Peer - у **5.8**.

Протокол retest:
1. Новий сервер на поточному Build.
2. Старт **за 1 checkpoint до** проблемного блоку (або з Spawn, якщо spike на початку біому).
3. Пройди проблемний сегмент **3 рази** поспіль.
4. Зафіксуй смерті та час на сегменті.
5. Порівняй з даними 5.6 або попередньою ітерацією.

| Результат | Що означає | Дія |
|-----------|------------|-----|
| **Better** | Менше смертей або швидше проходження | Залиш зміну, Save Build |
| **Same** | Без помітної різниці | Спробуй інший важіль або +1 stud / +0.3 с |
| **Worse** | Більше смертей або нова плутанина | Revert до попереднього Save |

Не став Better, якщо ти **знаєш** маршрут напам'ять, а тестер 5.6 - ні. Self-retest слабший за peer, але краще за нічого. Запиши чесно: «self 2/3, треба peer 5.8».

Якщо дві ітерації підряд Same на gap, спробуй width або CP density - можливо, проблема не в довжині, а в страху приземлення.

Regression: після зміни в біомі 2 пробіжи **touch CP → hazard → respawn** у сусідній зоні. Curve-правка не має ламати Progress з **5.3**.

**Зроби зараз (5 хв):** проведи retest ітерації 1 і постав Better/Same/Worse з одним реченням доказу.`,
      },
      {
        title: "Щільність checkpoint як важіль exam",
        content: `Checkpoint з **5.3** - не лише Progress. Це **важіль curve**: де гравець платить за помилку повторенням довгої ділянки.

| Зона | CP density | Навіщо |
|------|------------|--------|
| Teach | частіше | Дешеве навчання, менше фрустрації |
| Train | середня | Закріплення без monotonous save-scumming |
| Exam | рідше | Вища ставка, але не перед першим новим патерном |

Помилки:
- CP стоїть **після** unfair spike - гравець уже злий до save point;
- між CP 30+ секунд важкого маршруту в teach - надто дорого;
- CP у секреті (**5.5**), але не на основному шляху перед exam-gap.

Правка density без переміщення всього біому:
1. Знайди місце з трьома смертями підряд з 5.6.
2. Перевір, чи є CP у межах 15-20 секунд гри **до** цього місця.
3. Якщо ні - додай один CP на останній «безпечній» платформі перед spike.
4. Не додавай CP посеред стрибка - touch має бути на стабільному Part.

Exam-біом: один CP на вході в біом 3 і один перед Finish часто достатньо, якщо train вже навчив. Якщо exam триває 90+ секунд без CP - додай один середній, не три.

У **5.8** peer порахує смерті на весь маршрут - правильна density зменшить «я кидаю гру на біомі 2» без зміни gap.

**Зроби зараз (4 хв):** перевір відстань у секундах між CP на основному шляху в біомі 2 і познач прогалини.`,
      },
      {
        title: "Документ ітерацій для 5.8",
        content: `Peer у **5.8** не бачив твоєї роботи над curve. Дай йому **одну сторінку фактів**:

| Поле | Приклад |
|------|---------|
| Build для peer | 5.7-D |
| Зміни від 5.6 | Gap_07 8→6; Moving_03 waitUp 2.0→2.5 |
| Що лишилось open | OBBY-09 navigation - не curve |
| Очікування peer | Біом 3 exam, без підказок |
| Self-retest | 2 ітерації Better, 1 Same |

Не ховай Worse-ітерації - вони показують, що ти пробував width і відкотився. Це сильніший доказ, ніж «я все полагодив».

Окремо переліч **не змінював**:
- key-door логіку (**5.5**);
- GUI і timer (**5.3**);
- Sound/Particles (**5.9**);
- Game Settings (**5.10**).

Якщо peer у 5.8 знайде баг Progress - це не провал curve, а сигнал повернутись до 5.6 triage. Curve и т Progress - різні шари.

Додай у Notes Place короткий changelog:
\`5.7 iter1: biome2 gap -2\`
\`5.7 iter2: moving03 waitUp +0.5\`

**Зроби зараз (3 хв):** напиши changelog з мінімум двох ітерацій для peer.`
      },
      {
        title: "Що відкласти до 5.9 і 5.10",
        content: `Після кількох Better retest з'являється спокуса «ще трохи полірувати». Тримай фокус:

| Зараз (5.7) | Пізніше |
|-------------|---------|
| Gap, width, timing, CP | Sound на hazard (**5.9**) |
| Читабельність hazard (колір) | ParticleEmitter burst (**5.9**) |
| Curve Map і changelog | Game Settings Name/Icon (**5.10**) |
| Save Difficulty Curve | Badge AwardBadge (**5.10**) |

Juice **не виправляє** unfair gap. Якщо ти думаєш «іскри на лаві допоможуть» - це сигнал закінчити curve, а не скорочувати роботу.

Ship у **5.10** вимагатиме повного проходу з **5.8** плюс juice з **5.9**. Якщо пропустити 5.8 і стрибнути в polish, перший peer побачить blockers, які ти вже знав з 5.6.

Список «хочу додати пізніше» тримай окремо від багліста:
- звук на CP;
- дим на лаві;
- confetti на Finish.

Не реалізуй їх сьогодні - **5.8** оцінює **product gate** без juice.

**Зроби зараз (2 хв):** випиши 3 juice-ідеї в блок «після 5.8» і не чіпай Explorer для Sound.`,
      },
      {
        title: "Чекліст здачі 5.7",
        content: `Перед фінальним Save перевір:

- [ ] Curve Map містить мінімум 3 точки з багліста 5.6
- [ ] Мінімум 2 ітерації з **одним важелем** кожна
- [ ] Before/After числа записані (Parts або Config)
- [ ] Кожна ітерація має retest Better/Same/Worse
- [ ] Біоми відповідають teach / train / exam
- [ ] Unfair spikes адресовані або позначені open з причиною
- [ ] CP density перевірена на основному шляху
- [ ] Changelog для peer 5.8 готовий
- [ ] Juice і Ship **не** додані сьогодні
- [ ] Save: **Lesson 5.7 - Difficulty Curve**

Далі **5.8**: peer run, 6-категорійна рубрика, багліст без зупинки гри, один fix pass лише blockers, окремий список juice. Потім **5.9** Sound + Particles і **5.10** Ship + Badge.

**Зроби зараз (2 хв):** простав галочки і збережи Place під Lesson 5.7 - Difficulty Curve.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Перебудова цілого біому після одного playtest",
      explanation: "Це новий рівень, а не curve - peer у 5.8 не порівняє з 5.6.",
      correctApproach: "Один важіль, одне місце, одна ітерація з retest",
    },
    {
      mistake: "Gap і width змінюють одночасно",
      explanation: "Retest не показує, яка зміна спрацювала.",
      correctApproach: "Зафіксувати Before/After і міняти лише один важіль",
    },
    {
      mistake: "Unfair spike маскують декором або juice",
      explanation: "Sound і Particles не роблять hazard читабельним - це 5.9.",
      correctApproach: "Виправити gap, timing, колір hazard або CP перед spike",
    },
    {
      mistake: "Exam легший за train через надто часті CP",
      explanation: "Крива перевертається - фінал не відчувається climax.",
      correctApproach: "Рідші CP в exam після навчання в train",
    },
    {
      mistake: "Немає записів Better/Same/Worse",
      explanation: "Peer у 5.8 не знатиме, що саме змінилось від 5.6.",
      correctApproach: "Таблиця ітерацій + changelog у Notes Place",
    },
    {
      mistake: "Стрибок одразу в 5.9 або 5.10",
      explanation: "Product gate 5.8 пропущено - blockers залишаться в ship.",
      correctApproach: "Save 5.7 і пройти peer run у 5.8 перед juice",
    }
  ],
  keyTakeaways: [
    "5.7 - curve з багліста 5.6, не total redesign Obby",
    "Чотири важелі: gap, width, hazard timing у Config, CP density",
    "Одна зміна за ітерацію + retest Better/Same/Worse",
    "Teach → train → exam задає очікуваний профіль складності",
    "Unfair spike виправляють до juice у 5.9 і Ship у 5.10",
    "Save Lesson 5.7 - Difficulty Curve готує peer run у 5.8"
  ],
  summary: "Ти перетворив багліст 5.6 на Curve Map, крутив gap, width, timing Config і щільність CP по одному важелю за ітерацію, відрізнив unfair spike від чесної складності й зафіксував retest Better/Same/Worse. Place готовий до контрольного peer run у 5.8.",
  practiceTask: {
    title: "Difficulty curve (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** вирівняти криву складності Obby без перебудови біомів.

### Part A - Curve Map (8 хв)
1. Відкрий Save Lesson 5.6 - Playtest 1 Buglist.
2. Перенеси мінімум 3 difficulty-рядки в Curve Map з одним важелем кожен.
3. Познач teach / train / exam для трьох біомів.

### Part B - Ітерації (20 хв)
1. Build 5.7-A: одна зміна важеля на топ-проблемі.
2. Retest 3× сегмент → Better/Same/Worse.
3. Build 5.7-B: друга ітерація (інше місце або важіль).
4. Запиши Before/After у Config або Properties.

### Part C - Здача (7 хв)
1. Changelog для peer 5.8.
2. Smoke test Spawn → Finish.
3. **Save:** Lesson 5.7 - Difficulty Curve`,
    hints: [
      "Якщо Same на gap - спробуй width або CP перед блоком",
      "Unfair spike важливіший за «трохи легше exam»",
      "Не додавай Sound - це наступний модуль кроку 5.9"
    ],
    optionalChallenge: "Третя ітерація лише CP density в exam - порівняй смерті з ітерацією 2.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головне джерело даних для difficulty curve у 5.7?",
        options: [
          "Новий четвертий біом",
          "Багліст і спостереження з playtest 5.6",
          "Game Settings Icon",
          "Badge ID з 5.10"
        ],
        correctAnswer: 1,
        explanation: "Curve будується на фактах 5.6, не на ship-обгортці.",
      },
      {
        id: "q2",
        type: MC,
        question: "Скільки важелів міняють за одну ітерацію?",
        options: [
          "Один",
          "Усі чотири одразу",
          "Стільки, скільки знайшли баги",
          "Жодного - лише декор"
        ],
        correctAnswer: 0,
        explanation: "Один важіль дає зрозумілий retest.",
      },
      {
        id: "q3",
        type: MC,
        question: "Де крутити hazard timing для while-платформ?",
        options: [
          "У Game Settings",
          "У BadgeService",
          "У PlatformConfig (waitUp/waitDown)",
          "У LocalScript GUI"
        ],
        correctAnswer: 2,
        explanation: "Config з 5.4 - пульт timing без нового циклу.",
      },
      {
        id: "q4",
        type: MC,
        question: "Що таке unfair spike?",
        options: [
          "Будь-який важкий exam-блок",
          "Місце, де гравець не мав шансу прочитати правило",
          "Наявність трьох біомів",
          "Checkpoint перед Finish"
        ],
        correctAnswer: 1,
        explanation: "Unfair - дизайн-баг, не legit exam.",
      },
      {
        id: "q5",
        type: MC,
        question: "Retest Same після зміни gap означає?",
        options: [
          "Відкотити Place до 5.1",
          "Автоматично Ship у 5.10",
          "Додати juice",
          "Спробувати інший важіль або малу додаткову зміну"
        ],
        correctAnswer: 3,
        explanation: "Same - сигнал змінити підхід, не здаватися.",
      },
      {
        id: "q6",
        type: MC,
        question: "Роль біому 1 у curve?",
        options: [
          "Exam",
          "Train",
          "Teach",
          "Secret only"
        ],
        correctAnswer: 2,
        explanation: "Біом 1 навчає базовим патернам.",
      },
      {
        id: "q7",
        type: MC,
        question: "Що НЕ робити в 5.7?",
        options: [
          "Записувати Before/After",
          "Повний redesign усіх біомів",
          "Retest Better/Same/Worse",
          "Готувати changelog для 5.8"
        ],
        correctAnswer: 1,
        explanation: "Curve - точкові зміни, не новий рівень.",
      },
      {
        id: "q8",
        type: MC,
        question: "CP density в exam-зоні зазвичай?",
        options: [
          "Рідша, ніж у teach",
          "Кожні 2 studs",
          "Відсутня повністю",
          "Тільки в секреті 5.5"
        ],
        correctAnswer: 0,
        explanation: "Exam підвищує ставку через рідші save points.",
      },
      {
        id: "q9",
        type: MC,
        question: "Куди передати juice-ідеї?",
        options: [
          "Реалізувати зараз у hazard Script",
          "Окремий список для 5.9 після 5.8 gate",
          "У Badge Description",
          "Видалити з багліста"
        ],
        correctAnswer: 1,
        explanation: "Juice після product gate 5.8.",
      },
      {
        id: "q10",
        type: MC,
        question: "Наступний крок після Save 5.7?",
        options: [
          "Peer full playthrough у 5.8",
          "Ship + Badge одразу",
          "Новий модуль 6 Simulator",
          "Видалити Config"
        ],
        correctAnswer: 0,
        explanation: "5.8 перевіряє curve на чужих очах.",
      },
      {
        id: "q11",
        type: MC,
        question: "Який запис ітерації найкращий?",
        options: [
          "Щось подвигав",
          "Gap_07 gap 8→6 studs, Build 5.7-A, retest Better",
          "Тепер краще, точно",
          "Змінив все в біомі 2"
        ],
        correctAnswer: 1,
        explanation: "Є місце, числа, build і результат retest.",
      },
      {
        id: "q12",
        type: MC,
        question: "Width платформи впливає на?",
        options: [
          "Площу приземлення без зміни gap",
          "Badge видачу",
          "Team Create",
          "DataStore ключ"
        ],
        correctAnswer: 0,
        explanation: "Width - окремий важіль від gap.",
      },
      {
        id: "q13",
        type: MC,
        question: "Worse після ітерації - що робити?",
        options: [
          "Залишити і додати Sound",
          "Revert до попереднього Save і інший важіль",
          "Опублікувати Public",
          "Ігнорувати retest"
        ],
        correctAnswer: 1,
        explanation: "Worse = відкат і нова гіпотеза.",
      },
      {
        id: "q14",
        type: MC,
        question: "Зв'язок 5.6 і 5.7?",
        options: [
          "5.7 замінює багліст",
          "5.6 дає вхідні точки для curve",
          "5.6 видаляє checkpoints",
          "Немає зв'язку"
        ],
        correctAnswer: 1,
        explanation: "Playtest #1 годує difficulty work.",
      },
      {
        id: "q15",
        type: MC,
        question: "Точна назва Save уроку 5.7?",
        options: [
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.8 - Full Playthrough",
          "Lesson 5.7 - Difficulty Curve",
          "Lesson 5.9 - Juice Pass"
        ],
        correctAnswer: 2,
        explanation: "Save фіксує curve-ітерації перед 5.8.",
      }
    ],
  },
};

export const ukLesson58 = {
  lessonId: "lesson-roblox-5-8",
  moduleId: "module-05",
  order: 8,
  title: "5.8 - Checkpoint: повний прохід",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Провести контрольний повний прохід Obby як product gate перед juice і Ship",
    "Розподілити ролі гравець і спостерігач без підказок під час run",
    "Оцінити Place за 6-категорійною рубрикою під час одного прогону",
    "Продовжити багліст 5.6, записуючи баги без зупинки Play",
    "Підтвердити curve 5.7, зробити один fix pass лише blockers і зберегти Full Playthrough"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 36 з 92)",
        content: `У **5.6** ти зібрав перший багліст. У **5.7** вирівняв difficulty curve важелями gap, width, timing і CP density. Сьогодні - **product gate**: повний прохід Obby **іншою людиною** (peer), який перевіряє, чи рівень готовий до polish у **5.9** і Ship у **5.10**.

Це не ще один «авторський пробіг». Peer не знає, де ключ, який \`waitUp\` ти крутив і де unfair spike був учора. Якщо він проходить без blockers - curve і Progress тримаються на чужих очах.
| Було в 5.7 | Стає в 5.8 |
|------------|------------|
| Self-retest curve | Peer run на Build після curve |
| Changelog ітерацій | Рубрика + оновлений багліст |
| Очікування «краще» | Pass/fail product gate |

**5.9** додасть Sound і Particles. **5.10** - Game Settings, Badge, демо 60-90 с. Сьогодні juice **не** чіпаємо - лише фіксуємо ідеї окремим списком.

**Зроби зараз (2 хв):** відкрий Save **Lesson 5.7 - Difficulty Curve**, створи Build 5.8-A і запиши changelog 5.7 одним рядком у Notes.`,
      },
      {
        title: "Product gate: навіщо 5.8 перед juice і Ship",
        content: `**Product gate** - контрольна точка: «чи можна показати цей Obby незнайомій людині без вибачень?». Не «чи красиво», не «чи є Badge» - чи **проходиться чесно** від Spawn до Finish.

| Gate pass | Gate fail |
|-----------|-----------|
| Peer дійшов до Finish без P0 | Softlock, зламаний respawn, blocked main path |
| Exam відчувається складнішим за teach | Unfair spike лишився після 5.7 |
| Секрет опційний (**5.5**) | Без ключа неможливо фініш |
| Output без червоних помилок на run | Script падає mid-run |

Якщо gate fail - **не** переходь до **5.9**. Juice на зламаному checkpoint лише прикрасить баг. Ship у **5.10** з червоним Output - це rework під дедлайн.

Gate pass не означає «ідеально». Допустимі P2/P3 у баглісті й ідеї juice. Недопустимі P0/P1 на основному маршруті після fix pass.

Порівняй з **5.6**: там перший playtest збирав дані. Тут **контроль** після curve - менше рядків, але жорсткіший критерій «готовий до polish».

**Зроби зараз (3 хв):** напиши три речення «що має бути true після peer run, щоб я відкрив 5.9».`,
      },
      {
        title: "Ролі: гравець (peer) і спостерігач (ти)",
        content: `Схема та сама, що в **5.6**, але мета інша: не перший збір багів, а **gate** після 5.7.

**Peer (гравець):**
- стартує з Spawn на Build 5.8-A;
- проходить до Finish без телепортів і підказок;
- коментує вголос очікування на незнайомих ділянках;
- не зobов'язаний знаходити секрет - main path обов'язковий.

**Ти (спостерігач):**
- записуєш час, смерті, паузи 5+ секунд;
- заповнюєш рубрику (наступна секція);
- **не** підказуєш маршрут, timing чи ключ;
- після сегмента ставиш уточнення, не під час стрибка.

Якщо peer застряг - фіксуєш це як дані. Якщо просить «куди?» - «Запишу як navigation; продовжуй пробувати» - не «направо там».

Self-gate (якщо немає peer): новий сервер, без Explorer, запис екрана, коментарі вголос. Слабше за peer, але краще за авторський пробіг напам'ять. Познач у баглісті **Tester: self-gate**.

Після run одразу **не** фіксиш у Play Mode. Завершити нотатки, потім Build 5.8-B для blockers.

**Зроби зараз (3 хв):** передай peer інструкцію: «Full run, говори очікування, я мовчу про маршрут».`,
      },
      {
        title: "6-категорійна рубрика peer review",
        content: `Під час одного прогону заповнюй рубрику. Шкала: **так / майже / ні** + коротка нотатка.

| # | Категорія | Що перевіряєш |
|---|-----------|---------------|
| 1 | **Gameplay** | gap, hazards, while, collision - чи чесно |
| 2 | **Progress** | CP, respawn, Finish, timer (**5.3**) |
| 3 | **Navigation** | напрямок, видимість цілі, біоми |
| 4 | **Secret** | ключ-двері опційні (**5.5**) |
| 5 | **Curve** | teach→train→exam, без unfair spike (**5.7**) |
| 6 | **Stability** | Output чистий, немає softlock |

Приклад рядка:
\`Curve | майже | біом 3 exam OK, одна пауза 6с перед Gap_12\`

**Gameplay + Progress** - blockers gate. **Curve** - підтвердження 5.7: peer має смерті в exam, але не rage на train. **Secret** - «ні», якщо без ключа не фініш.

Не плутай **Stability** з juice: відсутність Sound - не fail сьогодні (**5.9**). Fail - Script error або зависання Character.

Після run порахуй: скільки **ні** в категоріях 1-2 і 6? Якщо ≥1 - fix pass обов'язковий перед 5.9.

Рубрику зберігай поруч із баглістом - peer review table для ментора.

**Зроби зараз (4 хв):** створи таблицю 6 категорій з колонками так/майже/ні і Notes.`,
      },
      {
        title: "Сценарій повного проходу (без скорочень)",
        content: `Peer проходить **весь** маршрут - той самий каркас, що в **5.6**:

| Крок | Перевірка |
|------|-----------|
| 1. Spawn | Напрямок у teach-біом |
| 2. Біом 1 hazards | Читабельність до смерті |
| 3. CP + respawn | Збереження прогресу |
| 4. While-платформи | Config timing з 5.7 |
| 5. Біом 2 train | Смерті vs curve changelog |
| 6. Key-door (опційно) | Main path без ключа |
| 7. Біом 3 exam | Найважчий блок перед Finish |
| 8. Finish | Timer зупинка, досяжність |

Не телепортуй peer до «проблемного місця» - gate перевіряє **накопичення** fatigue і curve по всій довжині.

Зафіксуй числа для порівняння з 5.6:
- загальний час;
- смерті за біомами;
- найдовша пауза;
- чи був blockers stop (так/ні).

Якщо peer кидає на біомі 2 - curve 5.7 або navigation ще не gate-ready. Запиши точне місце в багліст, не перебудовуй біом у Play.

**Зроби зараз (2 хв):** скопіюй вісім кроків і залиш місце для чисел 5.6 vs 5.8.`,
      },
      {
        title: "Баг-нотатки без зупинки гри",
        content: `Під час peer run **не зупиняй** Play, щоб правити Parts. Як якщо глядач уже сидить у залі - виступ не ставлять на паузу для ремонту сцени.

Правила запису:
- короткі shorthand в блокноті або другому моніторі;
- часова мітка: \`04:12 CP_03 respawn fail\`;
- після run розгорни в повні рядки багліста;
- якщо P0 блокує peer - дозволь **завершити** до найближчого відтворюваного моменту або зафіксуй stop з steps.

| Під час run | Після run |
|-------------|-----------|
| «3 deaths Gap_09» | OBBY-14: Expected land, Actual fall, Steps... |
| «Output red line 6:01» | OBBY-15: Category Stability, P0 |
| «? direction biome2» | OBBY-16: Navigation, P2 |

Продовжуй нумерацію ID з **5.6** (OBBY-08, OBBY-09...). Один peer run може дати 3-8 нових рядків - нормально.

Не проси peer «зачекай, я швидко поправлю» - це змішує Build 5.8-A з B і псує gate.

Якщо peer знайшов те саме, що в 5.6 зі статусом Fixed - познач **Reopen** з посиланням на Build.

**Зроби зараз (2 хв):** підготуй шаблон shorthand-колонок: Time / Place / Symptom.`,
      },
      {
        title: "Продовження багліста 5.6",
        content: `Багліст - **живий документ** через 5.6 → 5.7 → 5.8 → 5.9 → 5.10. Не створюй нову таблицю з нуля.

Колонки (як у 5.6):
ID | Place | Expected | Actual | Steps | Category | Priority | Status | Build | Evidence

Після peer run 5.8:
1. Додай нові рядки з gate run.
2. Онови Status старих (Fixed → Reopen, якщо регресія).
3. Познач Build 5.8-A для всіх спостережень цього run.
4. Відокрем **blockers** (P0/P1) від polish (P2/P3).

| Тип знахідки | Priority | Fix сьогодні? |
|--------------|----------|---------------|
| Неможливий Finish | P0 | Так - fix pass |
| Respawn не на CP | P1 | Так |
| Exam важкий, але fair | P2 | Ні - можливо 5.7 revisit |
| Хочу звук на CP | P3 | Ні - список juice |

Порівняй **кількість** P0/P1 з 5.6: gate очікує **не більше** blockers, часто менше. Якщо більше - curve-правки могли зламати Progress (regression).

Difficulty-спостереження без blockers: Category Curve або Gameplay P2 - передай назад у notes для 5.7-style tweak **після** gate, не під час fix pass.

**Зроби зараз (5 хв):** відкрий багліст 5.6 і додай колонку Build, якщо її ще немає.`,
      },
      {
        title: "Перевірка difficulty curve 5.7",
        content: `Gate run - тест твоєї роботи в **5.7**. Питання не «чи легко», а «чи curve **передбачувана** для незнайомого гравця».

Метрики порівняння:

| Метрика | 5.6 playtest | 5.8 peer | Очікування |
|---------|--------------|----------|------------|
| Смерті біом 2 | напр. 8 | ? | ≤ або fairer |
| Пауза max | напр. 12с | ? | без blind stop |
| Exam смерті | ? | ? | ≥ teach, без unfair |
| Quit mid-run | ні/так | ні | ні |

Перевір changelog 5.7: peer має пройти місця, де ти ставив **Better**. Якщо там знову три смерті - retest 5.7 був self-biased або регресія.

Ознаки curve pass:
- peer називає біом 3 «важкий», але не «неможливий»;
- train смерті з поясненням «прогавив timing»;
- немає смерті «я не бачив hazard» (unfair).

Ознаки curve fail:
- peer просить зупинити run;
- смерті кластером на одному gap після 5.7 fix;
- exam легший за train (перевернута крива).

Curve fail без P0 - **не** blockers для 5.9, але запиши P2 і optional revisit 5.7 після 5.8 Save. Blockers Progress - fix pass спочатку.

**Зроби зараз (4 хв):** після peer (або з даних 5.6) заповни таблицю порівняння метрик.`,
      },
      {
        title: "Один fix pass: лише blockers",
        content: `Після peer run - **один** цикл виправлення. Не другий curve sweep, не juice, не новий біом.

Fix pass protocol:
1. Відсортуй багліст P0 → P1.
2. Обери **найвищий blocker** один (як triage 5.6).
3. Build **5.8-B** - Save перед зміною.
4. Мінімальний фікс однієї причини.
5. Regression: steps бага + сусідній CP/hazard.
6. Короткий self-run Spawn → Finish - лише підтвердити blocker знятий.

| Fix pass | Не fix pass |
|----------|-------------|
| Respawn на CP | Переставити exam-gap «бо красиво» |
| Script error на Finish | Sound на lava |
| Door блокує main | Particle на GUI |
| Debounce hazard | Новий секрет |

Максимум **один** blocker fix у рамках 5.8 уроку. Якщо P0 залишилось два - другий у Reopen з планом, або другий мінімальний fix якщо час дозволяє - але не перетворюй 5.8 на другий 5.7.

Після fix **не** роби повторний peer у цьому уроці - достатньо regression retest. Повторний peer - optionalChallenge.

Save **Lesson 5.8 - Full Playthrough** на Build після fix pass (5.8-B або C).

**Зроби зараз (6 хв):** якщо є P0/P1 з peer - зроби один мінімальний фікс і regression.`,
      },
      {
        title: "Список juice-ідей (окремо від фіксів)",
        content: `Під час run peer (і ти) побачите моменти «тут не вистачає відгуку». **Не реалізуй** їх сьогодні - **5.9** саме для Sound і ParticleEmitter.

Окремий файл або секція Notes: **Juice backlog (post-5.8)**

| Подія | Ідея juice | Пріоритет polish |
|-------|------------|------------------|
| Hazard kill | короткий sizzle + дим | високий |
| Checkpoint touch | ding + іскри | високий |
| Finish | confetti burst | середній |
| Key pickup | click + flash | низький |

Правила backlog:
- не плутати з баглістом - juice не виправляє P1 respawn;
- не додавати Sound у fix pass 5.8;
- кожна ідея прив'язана до **існуючого** хука з 5.2/5.3 (**5.9** вбудує туди).

Якщо peer каже «не чув, що помер» - запиши в juice backlog, **не** gate fail, якщо hazard працює серверно.

Gate pass з порожнім juice backlog - нормально. Gate pass з реалізованим juice але зламаним CP - fail.

У **5.10** ship-рубрика включить juice з 5.9 - backlog сьогодні лише планування.

**Зроби зараз (3 хв):** додай мінімум 3 рядки juice backlog без змін у Scripts.`,
      },
      {
        title: "Playtest #1 (5.6) vs gate (5.8)",
        content: `Два run - різні jobs:

| | 5.6 Playtest #1 | 5.8 Full Playthrough |
|---|-----------------|----------------------|
| Мета | Зібрати баги | Підтвердити product gate |
| Build | 5.6-A | 5.8-A після 5.7 |
| Хто | Перший незнайомий тест | Peer після curve |
| Фікси | Один P0/P1 + retest | Один blocker fix pass |
| Артефакт | Buglist | Buglist + rubric + juice backlog |
| Далі | 5.7 curve | 5.9 juice |

5.6 міг мати 12 смертей і 8 рядків багліста - це успіх збору даних. 5.8 з двома P2 і нулем P0 - успіх gate.

Якщо 5.8 peer знайшов **той самий** P1, що Fixed у 5.6 - regression, не «peer поганий». Reopen з Build evidence.

Якщо 5.8 має **менше** смертей на curve-точках з changelog 5.7 - curve працює.

Не порівнюй «fun» - порівнюй blockers, curve metrics і rubric **ні** в Progress/Gameplay.

**Зроби зараз (3 хв):** одне речення: «5.6 навчив ___, 5.8 підтвердив ___».`,
      },
      {
        title: "Чекліст product gate",
        content: `Перед Save **Lesson 5.8 - Full Playthrough**:

- [ ] Build 5.8-A заморожений до peer run
- [ ] Peer (або self-gate) пройшов Spawn → Finish
- [ ] Рубрика 6 категорій заповнена
- [ ] Багліст 5.6 продовжений новими ID
- [ ] Запис без зупинки Play під час run
- [ ] Метрики curve порівняно з 5.6 / changelog 5.7
- [ ] Один fix pass на P0/P1 (якщо були) на Build 5.8-B
- [ ] Regression retest blocker пройдено
- [ ] Juice backlog окремо, Sound **не** додано
- [ ] Output чистий на короткому self-run після fix
- [ ] Save: **Lesson 5.8 - Full Playthrough**

Gate pass → **5.9 Juice**. Gate fail з лишковим P0 → Reopen, другий fix не в 5.9.

**5.10** Ship вимагатиме те, що ти підтвердив сьогодні: прохідність, curve, стабільність - плюс juice після 5.9.

**Зроби зараз (5 хв):** простав галочки і зроби фінальний self-run 3 хвилини.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "Peer run з підказками автора",
      explanation: "Gate не перевіряє navigation і curve для незнайомого гравця.",
      correctApproach: "Спостерігати мовчки про маршрут, питання після сегмента",
    },
    {
      mistake: "Зупинка Play для правок під час run",
      explanation: "Змішує Build і псує reproducibility gate.",
      correctApproach: "Shorthand notes під час run, повні рядки після",
    },
    {
      mistake: "Fix pass перетворюється на другий 5.7 curve sweep",
      explanation: "Gate затягується, juice і Ship відкладаються без причини.",
      correctApproach: "Один P0/P1 fix + regression, curve P2 - в backlog",
    },
    {
      mistake: "Додавання Sound у fix pass 5.8",
      explanation: "Juice маскує blockers і належить 5.9.",
      correctApproach: "Juice backlog окремо, Scripts логіки без Sound",
    },
    {
      mistake: "Новий багліст замість продовження 5.6",
      explanation: "Втрачається історія Fixed/Reopen і Build trace.",
      correctApproach: "Ті самі колонки, нові ID, колонка Build",
    },
    {
      mistake: "Gate pass при P0 на main path",
      explanation: "5.9 і 5.10 побудуються на зламаному фундаменті.",
      correctApproach: "Blocker fix pass або Reopen до проходження gate",
    }
  ],
  keyTakeaways: [
    "5.8 - product gate після curve 5.7, перед juice 5.9 і Ship 5.10",
    "Peer грає, автор спостерігає - без підказок під час run",
    "6 категорій рубрики: Gameplay, Progress, Navigation, Secret, Curve, Stability",
    "Багліст 5.6 продовжується; запис без зупинки Play",
    "Один fix pass лише P0/P1 blockers; juice - окремий backlog",
    "Save Lesson 5.8 - Full Playthrough відкриває 5.9"
  ],
  summary: "Ти провів контрольний peer run як product gate, заповнив 6-категорійну рубрику, продовжив багліст 5.6 без зупинки гри, перевірив curve 5.7 за метриками, зробив один blocker fix pass і виніс juice-ідеї в окремий backlog. Place готовий до Sound і Particles у 5.9.",
  practiceTask: {
    title: "Full Playthrough gate (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** product gate peer run після 5.7 з rubric, баглістом і blocker fix.

### Part A - Підготовка (5 хв)
1. Save Build 5.8-A з Lesson 5.7 - Difficulty Curve.
2. Таблиця рубрики 6 категорій + shorthand notes.
3. Інструкція peer без підказок.

### Part B - Peer run (15 хв)
1. Spawn → Finish, запис часу/смертей/пауз.
2. Рубрика так/майже/ні під час run.
3. Shorthand багів без зупинки Play.

### Part C - Gate close (15 хв)
1. Розгорни shorthand у багліст 5.6 (нові ID).
2. Порівняй метрики curve з 5.6/5.7.
3. Один P0/P1 fix на Build 5.8-B + regression.
4. Juice backlog (≥3 ідеї, без Scripts).
5. **Save:** Lesson 5.8 - Full Playthrough`,
    hints: [
      "P2 curve без blockers - gate pass, fix не обов'язковий",
      "Regression після fix: steps бага + сусідній CP",
      "Sound додаси в 5.9 - сьогодні лише backlog"
    ],
    optionalChallenge: "Другий peer на Build після fix pass - порівняй rubric до/після.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.8?",
        options: [
          "Product gate peer run перед juice і Ship",
          "Додати Badge і Game Settings",
          "Перебудувати всі три біоми",
          "Видалити багліст 5.6"
        ],
        correctAnswer: 0,
        explanation: "5.8 підтверджує готовність до 5.9/5.10.",
      },
      {
        id: "q2",
        type: MC,
        question: "Що робить спостерігач під час peer run?",
        options: [
          "Підказує timing while-платформ",
          "Рухає Parts у Play Mode",
          "Видає Badge на половині маршруту",
          "Записує rubric і баги без підказок маршруту"
        ],
        correctAnswer: 3,
        explanation: "Роль як у 5.6, мета - gate після 5.7.",
      },
      {
        id: "q3",
        type: MC,
        question: "Скільки категорій у rubric 5.8?",
        options: [
          "3",
          "6",
          "15",
          "92"
        ],
        correctAnswer: 1,
        explanation: "Gameplay, Progress, Navigation, Secret, Curve, Stability.",
      },
      {
        id: "q4",
        type: MC,
        question: "Gate fail - типовий приклад?",
        options: [
          "Немає Sound на hazard",
          "P3 зміщений текст GUI",
          "P0 softlock на main path",
          "Peer не знайшов секрет"
        ],
        correctAnswer: 2,
        explanation: "Blockers Progress/Gameplay = fail gate.",
      },
      {
        id: "q5",
        type: MC,
        question: "Під час peer run баги записують?",
        options: [
          "Shorthand без зупинки, повні рядки після",
          "Після зупинки Play і правки Parts",
          "Не записують - лише rubric",
          "Тільки в Output"
        ],
        correctAnswer: 0,
        explanation: "Run не переривають для fix.",
      },
      {
        id: "q6",
        type: MC,
        question: "Fix pass у 5.8 обмежений?",
        options: [
          "Необмежено всіма P2",
          "Лише P0/P1 blockers, один цикл",
          "Тільки косметикою",
          "Повним redesign exam"
        ],
        correctAnswer: 1,
        explanation: "Один blocker fix + regression.",
      },
      {
        id: "q7",
        type: MC,
        question: "Juice-ідеї в 5.8?",
        options: [
          "Реалізують у hazard Script",
          "Замінюють багліст",
          "Окремий backlog без Sound сьогодні",
          "Видаляють curve 5.7"
        ],
        correctAnswer: 2,
        explanation: "5.9 реалізує juice на готових хуках.",
      },
      {
        id: "q8",
        type: MC,
        question: "Багліст 5.8 і 5.6?",
        options: [
          "Новий файл без історії",
          "5.6 видаляють",
          "Тільки для juice",
          "Продовження з новими ID і Build"
        ],
        correctAnswer: 3,
        explanation: "Живий документ через модуль.",
      },
      {
        id: "q9",
        type: MC,
        question: "Категорія Curve у rubric перевіряє?",
        options: [
          "Teach→train→exam після змін 5.7",
          "Badge ID",
          "Icon 512×512",
          "Team Create"
        ],
        correctAnswer: 0,
        explanation: "Peer підтверджує curve на чужих очах.",
      },
      {
        id: "q10",
        type: MC,
        question: "Після gate pass логічний наступний урок?",
        options: [
          "5.9 Juice: Sound + Particles",
          "5.1 Three Biomes з нуля",
          "6.10 Ship Sim",
          "Пропустити до 5.10 без juice"
        ],
        correctAnswer: 0,
        explanation: "Polish після gate, ship після juice.",
      },
      {
        id: "q11",
        type: MC,
        question: "Чим 5.8 відрізняється від 5.6?",
        options: [
          "5.8 не потребує peer",
          "5.6 після Ship",
          "5.8 - gate після curve, не перший збір багів",
          "5.8 без rubric"
        ],
        correctAnswer: 2,
        explanation: "5.6 збирає дані, 5.8 підтверджує продукт.",
      },
      {
        id: "q12",
        type: MC,
        question: "Self-gate якщо немає peer?",
        options: [
          "Заборонено",
          "Замінює Save",
          "Не потребує rubric",
          "Допустимо з позначкою Tester: self-gate"
        ],
        correctAnswer: 3,
        explanation: "Слабше за peer, але краще за авторський пробіг.",
      },
      {
        id: "q13",
        type: MC,
        question: "Regression після blocker fix?",
        options: [
          "Steps бага + сусідній сценарій Progress",
          "Не потрібен",
          "Лише Edit Mode колір",
          "Publish Public"
        ],
        correctAnswer: 0,
        explanation: "Як у 5.6 - короткий regression набір.",
      },
      {
        id: "q14",
        type: MC,
        question: "Stability у rubric - це?",
        options: [
          "Наявність ParticleEmitter",
          "Кількість біомів",
          "Output без помилок, немає softlock",
          "Опис у Game Settings"
        ],
        correctAnswer: 2,
        explanation: "Stability ≠ juice.",
      },
      {
        id: "q15",
        type: MC,
        question: "Точна назва Save уроку 5.8?",
        options: [
          "Lesson 5.7 - Difficulty Curve",
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.9 - Juice Pass",
          "Lesson 5.8 - Full Playthrough"
        ],
        correctAnswer: 3,
        explanation: "Save фіксує gate peer run перед 5.9.",
      }
    ],
  },
};

export const ukLesson59 = {
 lessonId: "lesson-roblox-5-9",
 moduleId: "module-05",
 order: 9,
 title: "5.9 - Juice: Sound + Particles",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
    "Пояснити, як juice підсилює готову механіку, але не виправляє її правила",
    "Підключити Sound до серверних хуків hazard і checkpoint без другого Touched",
    "Налаштувати короткий ParticleEmitter burst через Emit() замість постійного Enabled",
    "Обрати Part або SoundService за просторовою роллю звуку та уникнути спаму",
    "Провести повний juice-playtest після 5.8 і підготувати Place до Ship у 5.10"
  ],
  theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 37 з 92)",
 content: `Урок 5.8 довів, що твій obby **проходиться від старту до фінішу** без зависань. Але «проходиться» і «відчувається приємно» - це різні речі. Сьогодні ти додаєш **звук і частинки**, які перетворюють суху механіку смерті й чекпоінта на живий відгук гравцю.

Це **урок 37 з 92** у курсі SmartCode і **дев'ятий урок модуля 05 - Obby**. Ти вже пройшов дизайн біомів, hazards з debounce, чекпоінти з GUI, платформи, секрети, playtest, difficulty curve і checkpoint повного проходу. Juice - це **останній шар полірування** перед Ship 5.10, де ти здаєш готовий продукт з badge.

**Хід уроку:**
1. **Теорія (35 хв)** - що таке juice, Sound, ParticleEmitter, сервер проти локального сигналу
2. **Практика (~35 хв)** - звук і частинки на смерть та на чекпоінт, плейтест
3. **Вікторина (15 хв)** - проходження **70%**

Відкрий своє місце з **Уроку 5.8 - Checkpoint: повний прохід**. Ти нічого не переробляєш у логіці hazard чи checkpoint - лише **додаєш** реакцію. Якщо hazard або checkpoint ще «мовчить» після падіння чи дотику - цей урок саме для цього.

**Зроби зараз (2 хв):** відкрий Save з 5.8, пройди один hazard і один checkpoint та запиши, де бракує відгуку.`,
 },
 {
 title: "Що таке «juice» - чому дрібниці важать найбільше",
 content: `**Juice** (з англ. «сік», у геймдеву - «соковитість») - це сума маленьких сигналів зворотного зв'язку, які підказують гравцю: «твоя дія щось змінила у грі». Стрибок без звуку - це просто зміна координати. Стрибок зі звуком приземлення і хмаркою пилу - це **подія**, яку мозок гравця помічає і запам'ятовує.

Juice складається з **трьох каналів**, які ми сьогодні торкаємось двома:
- **Звук** - найшвидший сигнал, мозок реагує за частки секунди
- **Частинки** - короткий візуальний спалах, підтверджує місце події
- **Рух/анімація** - Tween або спалах Part (ти вже бачив flash у попередніх модулях)

У obby є рівно два моменти, де гравець найбільше потребує відгуку:
- **Смерть** - гравець мусить одразу зрозуміти «я торкнувся hazard, це моя помилка», а не гадати, чому персонаж зник
- **Чекпоінт** - гравець мусить відчути маленьку нагороду за прогрес, інакше проходження рівня відчувається як монотонна робота

| Без juice | З juice |
|-----------|---------|
| Падіння в лаву - тихо, character просто зникає | Короткий «шип» + хмарка диму на hazard |
| Чекпоінт зберігається, але гравець не помітив | Дзвін + іскри - «так, прогрес зараховано» |

**Важливо:** juice не виправляє погано збалансований рівень і не додає нову механіку. Це шар **полірування** над тим, що вже стабільно працює після 5.8. Якщо hazard вбиває через стіну або checkpoint не зберігається - спочатку виправ це, потім додавай звук.

**Зроби зараз (3 хв):** вибери дві події для polish - одну помилку гравця і один успіх. Не додавай третю, поки ці дві не працюють чисто.`,
 },
 {
 title: "Нагадування - хуки смерті та чекпоінта з 5.2 і 5.3",
 content: `Щоб не дублювати логіку, сьогодні ти **вбудовуєш** звук і частинки прямо у вже готові функції.

**З Уроку 5.2 (Hazards + debounce)** - твій hazard-script на сервері приблизно такий:
\`local hazard = script.Parent\`
\`hazard.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local humanoid = character and character:FindFirstChildOfClass("Humanoid")\`
\`  if not humanoid then return end\`
\`  humanoid.Health = 0\`
\`end)\`

**З Уроку 5.3 (Чекпоінти + таймер + GUI)** - твій checkpoint-script підключений так:
\`checkpointPart.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local player = Players:GetPlayerFromCharacter(character)\`
\`  if not player then return end\`
\`  -- тут ти вже зберігаєш checkpoint для player\`
\`end)\`

Сьогодні ти додаєш по одному рядку **виклику звуку** і по одному **виклику частинок** саме в ці два місця - жодного нового Touched-з'єднання.

**Чому не окремий Script «тільки для звуку»:** другий Touched на тому самому Part може спрацювати в інший кадр, ніж основний hazard - гравець помре без звуку або почує звук без смерті. Один обробник = одна **атомарна** подія: дотик → juice → логіка.

**Debounce з 5.2 для hazard:** якщо твій hazard уже має cooldown на пошкодження, juice має спрацьовувати **всередині того самого блоку**, коли реально відбувається kill - не раніше і не після debounce-повернення.

**Зроби зараз (4 хв):** знайди чинні Touched-обробники hazard і checkpoint. Познач рядки, після яких подія вже підтверджена debounce.`,
 },
 {
 title: "Sound - базові Properties, які тобі знадобляться",
 content: `**Sound** - Instance, який відтворює аудіо. Найважливіші Properties для сьогоднішнього уроку:

| Property | Що робить |
|----------|-----------|
| \`SoundId\` | посилання на аудіо, формат \`rbxassetid://ID\` |
| \`Volume\` | громкість від 0 до 1 (іноді трохи вище, але для UI/hazard тримай 0.4-0.7) |
| \`Looped\` | чи звук повторюється - для смерті й чекпоінта завжди **false** |
| \`PlaybackSpeed\` | швидкість/тон відтворення, 1 = звичайна |
| \`RollOffMode\` та \`RollOffMaxDistance\` | як звук затихає з відстанню, якщо Sound лежить у Part |

**Створення і відтворення:**
\`local sound = Instance.new("Sound")\`
\`sound.SoundId = "rbxassetid://9042177269"\`
\`sound.Volume = 0.6\`
\`sound.Parent = somePart\`
\`sound:Play()\`

**Play() не блокує Script** - код продовжує виконуватись одразу, тож можна безпечно викликати Play() і йти далі за логікою hazard чи checkpoint.

**Де взяти SoundId:** у Studio відкрий Toolbox → Audio або Creator Store, знайди короткий SFX (0.3-1.5 сек), скопіюй ID у формат \`rbxassetid://ЧИСЛО\`. Для смерті підійде різкий «thud» або «sizzle»; для чекпоінта - м'який «chime» або «ping». Уникай довгих музичних треків - вони накладуться під час швидких respawn.

**RollOffMaxDistance:** якщо hazard далеко від камери, звук може бути ледве чутний. Для маленького obby постав **50-80 studs** - достатньо, щоб чути подію на сусідній секції рівня, але не «глобально». Перевір у Play Mode, стоячи біля hazard і відійшовши на 30 studs.

**Зроби зараз (5 хв):** встав короткі DeathSound і ChimeSound, вистав Looped false та Volume 0.5, потім прослухай обидва в Properties.`,
 },
 {
 title: "SoundService проти Parent Part - де живе твій звук",
 content: `Куди саме поставити Sound Properties **Parent** вирішує, як гравець його почує.

| Варіант | Поведінка | Коли використовувати |
|---------|-----------|----------------------|
| **Parent = Part на місці події** (hazard, checkpoint) | 3D-звук, затихає з відстанню, чути напрямок | Локальні події на карті - ідеально для смерті й чекпоінта |
| **Parent = SoundService** | 2D-звук, однакова громкість для всіх незалежно від позиції | Глобальні сигнали типу «гра почалась», музика меню |

Для **смерті й чекпоінта в obby** правильний вибір - **Part на місці події**: гравець, що впав у hazard за поворотом, повинен почути звук саме звідти, а не як загальне «бум» на весь екран. SoundService залиш для музики чи UI-сигналів, які не прив'язані до конкретної точки в Workspace.

**Практичне правило:** якщо можеш показати пальцем на карту «звук звідси» - Parent = Part. Якщо звук стосується всього сеансу («рівень пройдено», фонова музика лобі) - SoundService. У нашому obby **кожна смерть і кожен checkpoint - локальна подія**, тому 99% juice сьогодні живе в hazard/checkpoint Parts.

**Помилка новачка:** покласти DeathSound у SoundService «щоб точно було чутно». Результат - усі гравці на сервері чують кожну смерть однаково гучно, навіть якщо вони на іншому кінці мапи. Це втомлює швидше, ніж тихий локальний звук.

**Зроби зараз (2 хв):** постав обидва SFX у відповідні Parts і відійди від них у Play на 30-50 studs, щоб перевірити просторове затихання.`,
 },
 {
 title: "Звук на смерть - підключення до хука Hazard/Kill",
 content: `Додаєш звук **усередину** обробника з 5.2, одразу перед або після \`humanoid.Health = 0\`:
\`local hazard = script.Parent\`
\`local deathSound = hazard:WaitForChild("DeathSound")\`
\`\`
\`hazard.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local humanoid = character and character:FindFirstChildOfClass("Humanoid")\`
\`  if not humanoid then return end\`
\`  deathSound:Play()\`
\`  humanoid.Health = 0\`
\`end)\`

**Чому Sound - дитина hazard, а не character:** персонаж за мить видаляється/відроджується, і Sound, що є його дитиною, обірветься на середині. Hazard Part залишається на місці - звук дограє повністю.

**Сервер чи клієнт:** цей Touched вже виконується на сервері (Script, не LocalScript) з 5.2 - Play() на сервері **репліковується всім гравцям поруч**, тож усі почують падіння у hazard, не тільки жертва.

**Якщо звук не чутно:** перевір, що \`SoundId\` валідний (в Edit Mode натисни Play на Sound у Properties), \`Volume\` не 0, і Part hazard не **CanCollide false** з Sound всередині порожнього блоку без RollOff. Додай \`print("death juice")\` поруч із Play() - якщо print є, а звуку немає, проблема в SoundId або Volume, не в Touched.

**Зроби зараз (5 хв):** додай DeathSound:Play() у той самий захищений блок, де Humanoid реально отримує смерть, і перевір один дотик.`,
 },
 {
 title: "Звук на чекпоінт - підключення до хука з 5.3",
 content: `Той самий підхід у checkpoint-script:
\`local checkpointPart = script.Parent\`
\`local chimeSound = checkpointPart:WaitForChild("ChimeSound")\`
\`\`
\`checkpointPart.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local player = Players:GetPlayerFromCharacter(character)\`
\`  if not player then return end\`
\`  chimeSound:Play()\`
\`  -- далі твоя логіка збереження checkpoint з 5.3\`
\`end)\`

**Обов'язково перевір debounce з 5.3:** якщо гравець стоїть на чекпоінті кілька кадрів підряд, Touched може спрацювати кілька разів - без debounce звук «чіркне» і накладеться сам на себе. Використай ту саму debounce-таблицю чи прапор, що вже захищає збереження checkpoint, а не пиши окрему для звуку.

**Різні чекпоінти - один шаблон:** не копіюй різні SoundId на кожен checkpoint, якщо не плануєш різний «характер» біомів. Один \`ChimeSound\` + \`Sparkles\` у шаблоні Part, який ти дублюєш по рівню - менше роботи і однаковий відгук скрізь. Виняток: фінальний checkpoint перед Ship може мати трохи голосніший Volume (0.75) як нагорода.

**Зроби зараз (5 хв):** додай ChimeSound:Play() після підтвердження нового checkpoint і постій на Part секунду - звук має прозвучати один раз.`,
 },
 {
 title: "ParticleEmitter - базові Properties",
 content: `**ParticleEmitter** - Instance, що народжує дрібні частинки з BasePart. Ключові Properties:

| Property | Що робить |
|----------|-----------|
| \`Rate\` | частинок за секунду, поки Enabled = true (для нашого juice тримай 0, керуємо через Emit) |
| \`Lifetime\` | NumberRange - скільки живе кожна частинка, напр. \`NumberRange.new(0.4, 0.8)\` |
| \`Speed\` | NumberRange початкової швидкості вильоту |
| \`Color\` | ColorSequence - колір частинок, можна градієнт |
| \`Texture\` | вигляд частинки, за замовчуванням підходить кругла крапка з Toolbox |
| \`Enabled\` | вмикає безперервний потік - **не** використовуй для одноразового ефекту |

**Створення в Studio:** Insert → ParticleEmitter у Part hazard або checkpoint, встав Lifetime і Speed, а Rate залиш 0 - викликом \`Emit(n)\` з коду ти сам вирішуєш, коли і скільки частинок з'явиться.

**SpreadAngle і Shape:** для checkpoint частинки можуть летіти **вгору** (вузький SpreadAngle, Shape = Box або Sphere). Для смерті в лаві - ширший розкид і тепліші кольори (помаранчевий/червоний ColorSequence). Не переборщуй з \`Emit(100)\` - 15-30 частинок достатньо для короткого спалаху на слабкому ПК.

**Зроби зараз (5 хв):** створи DeathPuff і Sparkles з Rate 0, Lifetime до 1 секунди та помірною Speed.`,
 },
 {
 title: "Частинки на чекпоінт і на смерть - Emit() замість Enabled",
 content: `**Emit(кількість)** - метод, що випускає одноразовий «вибух» частинок і одразу зупиняється - саме те, що потрібно для миттєвої події.

**У checkpoint-script:**
\`local sparkles = checkpointPart:WaitForChild("Sparkles")\`
\`chimeSound:Play()\`
\`sparkles:Emit(25)\`

**У hazard-script:**
\`local puff = hazard:WaitForChild("DeathPuff")\`
\`deathSound:Play()\`
\`puff:Emit(15)\`
\`humanoid.Health = 0\`

**Чому не Enabled = true:** якщо залишити Enabled увімкненим, частинки летітимуть з hazard **постійно**, навіть коли ніхто не помирає - це і візуальний шум, і зайве навантаження на клієнт кожного гравця в кімнаті. Одна команда \`Emit()\` дає чіткий спалах рівно в момент події та нуль витрат між подіями.

**Порядок викликів:** спочатку \`Play()\`, одразу \`Emit()\`, потім \`humanoid.Health = 0\` для hazard - так гравець бачить і чує juice **до** зникнення character. Якщо поставиш kill перед Emit, частинки все одно з'являться, але відчуття «удар → реакція → смерть» буде слабшим.

**Зроби зараз (4 хв):** підключи Emit(15) для hazard та Emit(25) для checkpoint. Поза подією жодних частинок бути не повинно.`,
 },
 {
 title: "Сервер чи локальний сигнал - де програвати ефект",
 content: `**Сервер (Script, як у прикладах вище):** Play() і Emit(), викликані на сервері, **репліковані всім клієнтам** поруч - усі гравці бачать і чують подію. Це правильний вибір для чекпоінта і смерті в obby, бо це **спільні** події на карті.

**Локальний сигнал (LocalScript):** можна додати окремий, **тихіший** ефект лише для гравця, який помер чи дійшов до чекпоінта - наприклад, спалах кольору на екрані через ScreenGui. Такий LocalScript слухає ту саму подію (напр. RemoteEvent або зміну Attribute), яку сервер вже надсилає.

**Обережно з дублюванням:** якщо і сервер, і LocalScript одночасно відтворюють **той самий** Sound для того самого гравця, гравець почує його **двічі накладеним** - голосніше і з фазовим спотворенням. Правило: базовий звук/частинки - завжди на сервері один раз; локальний скрипт додає лише **інший**, додатковий шар (екранний ефект), а не копію того самого Sound.

**Коли локальний шар має сенс:** якщо ти хочеш, щоб **лише гравець, що помер**, побачив легкий червоний vignette на екрані - це LocalScript у StarterGui, який слухає зміну Health або RemoteEvent від сервера. Сервер як і раніше грає 3D-звук на hazard для всіх; локально - тільки UI. Два різні канали, не два однакові Play().

**Зроби зараз (3 хв):** перевір Explorer: базовий 3D Sound запускає лише серверний Script. Не дублюй цей самий Play() у LocalScript.`,
 },
 {
 title: "Не спамити - debounce, повторне використання, гучність",
 content: `**Проблема 1 - Instance.new() на кожен дотик.** Створювати новий Sound чи ParticleEmitter щоразу через \`Instance.new()\` і одразу видаляти - витратно і повільно. Правильний шаблон: **один Sound і один ParticleEmitter стоять у Part заздалегідь** (вставлені в Studio), а код лише викликає \`:Play()\` і \`:Emit()\` знову і знову.

**Проблема 2 - відсутність debounce на чекпоінті.** Уже згадано вище - без debounce з 5.3 звук може «затріщати» кількома викликами Play() за одну секунду.

**Проблема 3 - завелика Volume.** \`Volume = 1\` для короткого «дзвіночка» чекпоінта звучить різко і втомлює за 10-й раз. Тримай Volume у діапазоні **0.4-0.7** для частих подій; голосніші значення залиш для рідких, важливих моментів (перемога, бос).

**Проблема 4 - різні гучності на різних hazard.** Якщо один hazard грає на Volume 0.9, а інший на 0.3, рівень відчувається «зламаним». Пройди всі hazard одним проходом і вирівняй Volume в межах 0.1 - однаковий характер смерті по всьому obby.

**Правило одного правила:** якщо подія трапляється часто (а чекпоінти й смерті в obby трапляються **дуже** часто), ефект має бути **коротким і тихим**, інакше гравець вимкне звук у грі взагалі.

**Зроби зараз (4 хв):** торкнись checkpoint кілька разів і помри двічі підряд. Послухай, чи SFX не тріщить і не накладається.`,
 },
 {
 title: "Таблиця плейтесту Juice і підготовка до Ship 5.10",
 content: `Проведи **повний прохід** рівня з Уроку 5.8, і на кожній події запиши відчуття:

| Подія | Що перевірити | Норма |
|-------|----------------|-------|
| Смерть у hazard №1 | звук + частинки одразу, без затримки | <0.1с після Touched |
| Смерть у hazard №2 (інший тип) | той самий шаблон Sound/Emit | однаковий по силі відгук |
| Кожен чекпоінт | «дзвіночок» + іскри один раз, без повтору | рівно 1 Play() на 1 checkpoint |
| Повторна смерть у тому самому hazard | звук не «залипає», не накладається | чисто після кожного respawn |
| Гучність за 10 проходжень підряд | не втомлює вухо | Volume 0.4-0.7 тримається комфортно |

**Запис плейтесту:** у Studio Notes або блокноті заведи колонки «Подія / Ок / Проблема / Виправлення». Після третього проходу всі рядки мають бути «Ок» - інакше не переходь до Ship 5.10.

**Підготовка до Ship 5.10:** наступний урок - фінальна здача рівня з badge. Juice, який ти додав сьогодні, має **однаково стабільно** працювати на кожному hazard і кожному checkpoint усього рівня з 5.1-5.8, а не лише на першому - пройди рівень від старту до фінішу ще раз і перевір, що жоден Part не забутий без Sound/ParticleEmitter.

**Зроби зараз (8 хв):** пройди рівень від старту до фінішу з таблицею Подія / Ок / Проблема / Фікс і закрий перший знайдений дефект.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Sound-instance вставлений заздалегідь у кожен hazard і кожен checkpoint (не створюється кодом на льоту)
- [ ] ParticleEmitter має Rate = 0, керування лише через Emit()
- [ ] Play() і Emit() викликані на сервері всередині вже готових хуків з 5.2 і 5.3
- [ ] Debounce з 5.3 захищає checkpoint-звук від повтору
- [ ] Volume у діапазоні 0.4-0.7, жодного дублювання сервер+локально того самого Sound

- [ ] Пройдено повний маршрут 5.8 з увімкненим звуком у налаштуваннях Roblox
- [ ] Усі hazard і checkpoint мають пару Sound + ParticleEmitter
- [ ] Збережено: \`Lesson 5.9 - Juice Pass\`

**Зроби зараз (2 хв):** звір чекліст, збережи Place як Lesson 5.9 - Juice Pass і підготуй його до Ship + Badge у 5.10.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Instance.new(\"Sound\") створюється всередині Touched на кожен дотик",
 explanation: "Кожен новий Instance витрачає пам'ять і час на створення/видалення саме в момент, коли гра має бути найшвидшою.",
 correctApproach: "Встав Sound заздалегідь у Part через Studio, у коді лише :Play()",
 },
 {
 mistake: "ParticleEmitter лишили Enabled = true замість Emit()",
 explanation: "Частинки летять з hazard постійно, навіть коли ніхто не помирає - зайве навантаження і візуальний шум.",
 correctApproach: "Rate = 0, Enabled не вмикати, весь контроль через Emit(n)",
 },
 {
 mistake: "Sound - дитина Character, а не hazard/checkpoint Part",
 explanation: "Character видаляється чи відроджується одразу після смерті, і звук обривається на середині відтворення.",
 correctApproach: "Sound лежить у Part на місці події, він переживає смерть/respawn character",
 },
 {
 mistake: "Volume виставлений на 1 або вище для частої події",
 explanation: "Гучний звук на кожному з десятків чекпоінтів рівня втомлює гравця за кілька хвилин.",
 correctApproach: "Volume 0.4-0.7 для частих подій, голосніше - лише для рідких важливих моментів",
 },
 {
 mistake: "Немає debounce на checkpoint-звук",
 explanation: "Touched може спрацювати кілька разів за секунду стояння на чекпоінті, звук накладається сам на себе.",
 correctApproach: "Той самий debounce-прапор, що вже захищає збереження checkpoint з 5.3",
 },
 {
 mistake: "Той самий Sound відтворюється і на сервері, і в LocalScript одночасно",
 explanation: "Гравець чує подвоєний, накладений звук замість чистого одного сигналу.",
 correctApproach: "Базовий Sound - лише на сервері один раз; локальний шар додає інший, додатковий ефект",
 }
 ],
 summary: "Ти додав Sound і ParticleEmitter до вже готових хуків смерті та чекпоінта з 5.2 і 5.3, навчився вибирати між SoundService і Parent Part, керувати частинками через Emit() замість Enabled, уникати спаму й перевантаженої гучності - тепер твій obby після 5.8 не просто проходиться, а відчувається живим і готовим до фінальної здачі в 5.10.",
 practiceTask: {
 title: "Juice Pass - звук і частинки на весь рівень (~35 хв)",
 difficulty: "beginner",
 description: `**Мета:** кожен hazard і кожен checkpoint рівня з 5.8 має звук і короткий спалах частинок.

### Part A - Підготовка Instance (10 хв)
1. У кожен hazard Part встав \`DeathSound\` (Sound) і \`DeathPuff\` (ParticleEmitter), Rate = 0
2. У кожен checkpoint Part встав \`ChimeSound\` (Sound) і \`Sparkles\` (ParticleEmitter), Rate = 0
3. Volume обом Sound встав у діапазоні 0.4-0.7

### Part B - Підключення до хуків (15 хв)
1. У hazard-script з 5.2 додай \`deathSound:Play()\` і \`puff:Emit(15)\` перед \`humanoid.Health = 0\`
2. У checkpoint-script з 5.3 додай \`chimeSound:Play()\` і \`sparkles:Emit(25)\` всередині вже готового debounce-блоку
3. Перевір, що жоден hazard чи checkpoint не забутий - пройди рівень і послухай кожен

### Part C - Плейтест і збереження (10 хв)
1. Заповни таблицю плейтесту Juice для кожної події
2. Виправ будь-який Sound/Emit, що спрацьовує двічі або занадто голосно
3. **Зберегти в Roblox** → \`Lesson 5.9 - Juice Pass\` 4. **Практика завершена**`,
 hints: [
 "Якщо звук обривається - перевір, що Sound не є дитиною Character",
 "Якщо частинки летять без зупинки - перевір, що Rate дорівнює 0, а не Enabled",
 "Слухай рівень у навушниках один раз - різкий Volume чуєш одразу"
 ],
 optionalChallenge: "Додай короткий екранний спалах кольору через LocalScript і Attribute зміни здоров'я - додатковий локальний шар без дублювання серверного Sound.",
 },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Що означає juice у контексті цього уроку?",
        options: [
          "Нова система руху персонажа",
          "Заміна debounce в hazard",
          "Шар короткого відгуку над уже робочою механікою",
          "Фонова музика на весь рівень"
        ],
        correctAnswer: 2,
        explanation: "Juice підсилює відчуття події, але не змінює її правила.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де підключати DeathSound для hazard?",
        options: [
          "У тому самому серверному Touched-хуку після перевірок і debounce",
          "В окремому LocalScript без зв'язку зі смертю",
          "У новому Touched лише для звуку",
          "У ScreenGui замість hazard Part"
        ],
        correctAnswer: 0,
        explanation: "Один підтверджений хук синхронізує логіку смерті та feedback.",
      },
      {
        id: "q3",
        type: MC,
        question: "Чому DeathSound краще тримати в hazard Part, а не в Character?",
        options: [
          "Character не може містити Sound",
          "Part автоматично робить звук глобальним",
          "Sound у Character завжди Looped",
          "Character зникає під час respawn і може обірвати звук"
        ],
        correctAnswer: 3,
        explanation: "Hazard залишається в Workspace, тому короткий SFX дограє.",
      },
      {
        id: "q4",
        type: MC,
        question: "Коли SoundService доречніший за Parent = Part?",
        options: [
          "Для локального sizzle конкретної лави",
          "Для глобального UI-сигналу або музики лобі",
          "Для chime конкретного checkpoint",
          "Для звуку, напрямок якого має знайти гравець"
        ],
        correctAnswer: 1,
        explanation: "SoundService дає непозиційний 2D-звук.",
      },
      {
        id: "q5",
        type: MC,
        question: "Яке налаштування підходить для короткого checkpoint SFX?",
        options: [
          "Looped true і Volume 1.5",
          "Looped false і Volume приблизно 0.4-0.7",
          "PlaybackSpeed 0 і без SoundId",
          "Sound у Character з великим RollOff"
        ],
        correctAnswer: 1,
        explanation: "Частий сигнал має бути коротким і комфортним.",
      },
      {
        id: "q6",
        type: MC,
        question: "Як зробити одноразовий burst ParticleEmitter?",
        options: [
          "Enabled true на весь playtest",
          "Rate 100 на кожному hazard",
          "Створювати новий emitter щокадру",
          "Rate 0 і виклик Emit(n) у момент підтвердженої події"
        ],
        correctAnswer: 3,
        explanation: "Emit випускає задану кількість і не працює постійно.",
      },
      {
        id: "q7",
        type: MC,
        question: "Що станеться, якщо лишити ParticleEmitter Enabled = true?",
        options: [
          "Частинки йтимуть безперервно та створюватимуть шум",
          "Він спрацює рівно один раз",
          "Він чекатиме виклику Play()",
          "Він автоматично успадкує checkpoint debounce"
        ],
        correctAnswer: 0,
        explanation: "Enabled запускає постійний потік відповідно до Rate.",
      },
      {
        id: "q8",
        type: MC,
        question: "Чому не варто робити Instance.new('Sound') на кожен Touched?",
        options: [
          "SoundId можна призначити лише в Edit Mode",
          "Play() працює тільки з одним Sound за гру",
          "Зайві Instance створюються в найгарячіший момент і потребують cleanup",
          "Touched забороняє створення Instance"
        ],
        correctAnswer: 2,
        explanation: "Готовий Sound у Part дешевше повторно запускати через Play().",
      },
      {
        id: "q9",
        type: MC,
        question: "Коли checkpoint juice має спрацювати?",
        options: [
          "На кожен дотик будь-якої частини тіла",
          "Щосекунди, поки гравець стоїть на Part",
          "Після кожного respawn незалежно від прогресу",
          "Лише коли сервер підтвердив новий checkpoint усередині debounce"
        ],
        correctAnswer: 3,
        explanation: "Feedback має означати реальне зарахування прогресу.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що перевіряє тест повторного дотику checkpoint?",
        options: [
          "Що Sound стає глобальним",
          "Що chime і sparkles не дублюються через кілька Touched",
          "Що ParticleEmitter переходить у Enabled true",
          "Що checkpoint видаляється після першого гравця"
        ],
        correctAnswer: 1,
        explanation: "Один прогрес має давати один feedback-пакет.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що правильно для серверного і локального feedback?",
        options: [
          "Обидва шари грають той самий Sound одночасно",
          "Локальний шар сам вирішує, чи checkpoint зараховано",
          "Сервер запускає базову подію, а клієнт може додати інший UI-ефект",
          "Усю логіку треба перенести в LocalScript"
        ],
        correctAnswer: 2,
        explanation: "Сервер лишається правдою, локальний шар не дублює базовий SFX.",
      },
      {
        id: "q12",
        type: MC,
        question: "Навіщо вирівнювати Volume між hazard Parts?",
        options: [
          "Щоб різкі стрибки гучності не ламали відчуття рівня",
          "Щоб RollOffMode вимкнувся",
          "Щоб усі Sounds отримали один SoundId автоматично",
          "Щоб не використовувати debounce"
        ],
        correctAnswer: 0,
        explanation: "Однакові події мають мати послідовну силу feedback.",
      },
      {
        id: "q13",
        type: MC,
        question: "Що саме треба перевірити повним проходом після 5.8?",
        options: [
          "Лише перший hazard і перший checkpoint",
          "Кожен hazard і checkpoint, повтори після respawn та комфорт гучності",
          "Тільки іконку майбутнього Badge",
          "Лише фонову музику в SoundService"
        ],
        correctAnswer: 1,
        explanation: "Ship потребує стабільності feedback на всьому маршруті.",
      },
      {
        id: "q14",
        type: MC,
        question: "Що буде в уроці 5.10 після Juice Pass?",
        options: [
          "Переписування всіх hazard з нуля",
          "Початок Tycoon у тому самому Place",
          "Видалення Sound і ParticleEmitter",
          "Ship + Badge і фінальна здача Obby"
        ],
        correctAnswer: 3,
        explanation: "5.10 пакує й здає вже відполірований Obby.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save для уроку 5.9?",
        options: [
          "Lesson 5.8 - Full Run",
          "Lesson 5.10 - Ship + Badge",
          "Lesson 5.9 - Juice Pass",
          "Obby Sound Final Draft"
        ],
        correctAnswer: 2,
        explanation: "Чекліст вимагає Lesson 5.9 - Juice Pass.",
      }
    ],
  },
};

export const ukLesson510 = {
  lessonId: "lesson-roblox-5-10",
  moduleId: "module-05",
  order: 10,
  title: "5.10 - Ship + Badge",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Заповнити Game Settings place: назва, опис, іконка та Access Friends або Public",
    "Створити Badge на сайті Roblox і видати його AwardBadge на сервері на фініші",
    "Захистити видачу через UserHasBadgeAsync і pcall перед AwardBadge",
    "Пройти ship-рубрику по біомах, чекпоінтах, hazards і juice з 5.1-5.9",
    "Відрепетирувати демо 60-90 секунд без суфлера і зберегти фінальний Place"
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 38 з 92)",
        content: `Це фінал модуля 5 - **Obby**. Нової механіки немає. Ти **пакуєш** готовий рівень у продукт, який можна показати незнайомій людині за 90 секунд.

Шлях позаду: 5.1 три біоми, 5.2 hazards + debounce, 5.3 чекпоінти + таймер + GUI, 5.4 while-платформи + Config, 5.5 секрети + ключ-двері, 5.6 playtest і багліст, 5.7 difficulty curve, 5.8 повний прохід, 5.9 juice Sound + Particles.
| Було в 5.9 | Стає в 5.10 |
|------------|-------------|
| Рівень із juice | Той самий рівень як показуваний продукт |
| Фініш без нагороди профілю | Badge один раз на фініші |
| Studio-назва за замовчуванням | Ім'я, опис, іконка для сторінки place |

Далі модуль 6 - Simulator. Звичка «сервер вирішує нагороду» з Badge тут стане основою для Coins у 6.2-6.4.

5.9 - костюм актора; 5.10 - вихід на сцену з афішею й квитком.

**Зроби зараз (3 хв):** відкрий Place з 5.9 і одним реченням запиши, чого бракує до показу ментору.`,
      },
      {
        title: "Що означає Ship + Badge",
        content: `Ship - не AAA і не «найбільша карта». Це прохід від старту до фінішу, який цілий, чесний і показуваний без твоїх пояснень.

| Ship + Badge | Ще не ship |
|--------------|------------|
| Name, Description, Icon заповнені | Untitled Game і дефолтна іконка |
| Access обраний свідомо | Ніхто не перевірив, хто може зайти |
| Badge видається сервером на фініші | Badge створено, але код мовчить |
| Усі 3 біоми прохідні | Один біом «майже готовий» |
| Демо 60-90 с без «зачекайте» | П'ять хвилин імпровізації |
| Output чистий на повному проході | Червоні помилки «не заважають» |

Badge - публічна відмітка в профілі Roblox: гравець один раз пройшов твій obby до кінця. Без серверної видачі це лише картинка в Creator Dashboard.

Не починай четвертий біом і не переписуй juice. Сьогодні обгортка й доказ, що 5.1-5.9 уже працюють разом.

Образ: ship - закрити валізу перед поїзддом, а не купувати ще один чемодан у залі очікування.

**Зроби зараз (2 хв):** постав навпроти кожного рядка «так / ні» для свого Place.`,
      },
      {
        title: "Game Settings: назва, опис, іконка",
        content: `У Studio: **File → Game Settings → Basic Info**. Три поля формують перше враження ще до входу в гру.

| Поле | Що писати | Приклад |
|------|-----------|---------|
| Name | Жанр + фішка, коротко | Neon Obby: 3 Biomes |
| Description | 1-2 речення: що робити і скільки триває | Пройди ліс, лаву й кригу. ~3 хв, 3 чекпоінти, є секрет. |
| Icon / Thumbnail | Скрін яскравого біому з juice | Кадр із 5.9, де видно частинки |

Порожні поля або «New Game» у назві - перший сигнал «не ship» для будь-кого, хто відкриває сторінку place. Іконка має читатися маленькою: високий контраст, без дрібного тексту на 512×512.

Не копіюй чужий бренд і не обіцяй у Description те, чого немає в рівні (чотири біоми, мультиплеєр-гонки).

афіша біля дверей залу - якщо вона бреше, глядач злиться ще до першого акта.

**Зроби зараз (5 хв):** заповни всі три поля до переходу далі.`,
      },
      {
        title: "Access: Friends чи Public",
        content: `У Game Settings → **Permissions** обери доступ свідомо.

| Access | Коли брати |
|--------|------------|
| Friends | Здача ментору / класу, баланс ще живий |
| Public | Рубрика пройдена, готовий до незнайомців |

Public без рубрики означає: перший випадковий гравець побачить баги раніше за тебе. Для уроку 5.10 Friends зазвичай безпечніший. Public можна увімкнути пізніше, коли Polish-модуль або повторний playtest підтвердить стабільність.

Запиши одне речення «чому саме цей Access зараз» - це частина здачі, не формальність. Якщо обираєш Public - у рубриці не має лишатися червоних «ні» по проходу.

Не плутай Publish place із Access: опублікувати можна й для Friends; Public лише розширює коло гравців.

**Зроби зараз (2 хв):** вистав Access і допиши причину в нотатки Place.`,
      },
      {
        title: "Badge на сайті Roblox",
        content: `Badge створюється **не в Studio**, а на сайті: **Creator Dashboard → твоя гра → Badges → Create a Badge**.

Заповни:
- Name - коротке досягнення, наприклад Obby Finisher.
- Description - одне речення: «Пройшов усі 3 біоми до фінішу».
- Image - проста ікона 512×512, контрастна в малому розмірі.

Після створення скопіюй числовий **Badge ID**. Він живе в Script як константа. Badge створюєш один раз на проєкт, не на кожен playtest.

| Крок | Де | Результат |
|------|-----|-----------|
| Create a Badge | Сайт | Badge існує в акаунті гри |
| Скопіювати ID | Сторінка Badge | Число для Script |
| AwardBadge | Server Script | Гравець отримує нагороду |
| Профіль гравця | Сайт Roblox | Badge видно назавжди |

Помилка в одній цифрі ID = «Badge не працює» без корисної помилки в голові. Тримай ID у нотатках поруч із Place.

**Зроби зараз (6 хв):** створи Badge, скопіюй ID у текстовий файл біля проєкту.`,
      },
      {
        title: "AwardBadge на сервері на фініші",
        content: `Видача завжди через BadgeService у **Script на сервері**. LocalScript дозволяє підробити нагороду без реального проходу.

\`local BadgeService = game:GetService("BadgeService")\`
\`local BADGE_ID = 000000000 -- свій ID\`
\`local finishLine = workspace.Checkpoints.FinishLine\`
\`finishLine.Touched:Connect(function(hit)\`
\`  local character = hit.Parent\`
\`  local player = game.Players:GetPlayerFromCharacter(character)\`
\`  if not player then return end\`
\`  BadgeService:AwardBadge(player.UserId, BADGE_ID)\`
\`end)\`

Місце виклику - той самий FinishLine з 5.3, де вже рахується час. AwardBadge додається поруч, не замість таймера. Переконайся, що Part Anchored і має зрозумільне ім'я - інакше Touched ніколи не спрацює під час демо.

Фільтр GetPlayerFromCharacter обов'язковий: фініш можуть торкнути інші Parts, не лише HumanoidRootPart.

каса стадіону видає квиток лише на турнікеті фінішу, не з кишені вболівальника.

**Зроби зараз (8 хв):** підключи AwardBadge на FinishLine у Server Script і один раз пройди до фінішу в Play.`,
      },
      {
        title: "UserHasBadgeAsync і pcall",
        content: `AwardBadge можна кликати знову без гучної помилки, але це марно навантажує сервіс і виглядає неохайно. Перед видачею перевір, чи Badge уже є.

\`local success, hasBadge = pcall(function()\`
\`  return BadgeService:UserHasBadgeAsync(player.UserId, BADGE_ID)\`
\`end)\`
\`if success and not hasBadge then\`
\`  pcall(function()\`
\`    BadgeService:AwardBadge(player.UserId, BADGE_ID)\`
\`  end)\`
\`end\`

pcall - той самий захист, що й для мережевих сервісів: відповідь може запізнитись або впасти, а гра не повинна червоніти в Output. UserHasBadgeAsync - анти-дубль нагороди, як debounce був анти-дублем урону в 5.2.

| Без перевірки | З UserHasBadgeAsync |
|---------------|---------------------|
| Кожен дотик фінішу кличе Award | Другий дотик тихо пропускається |
| Спам сервісу | Одна чесна видача |
| Складніше дебажити | print(hasBadge) одразу показує стан |

Не став «локальний bool awarded» замість UserHasBadgeAsync як єдиний захист: після реjoin гравець уже має Badge в профілі, а твій bool скинеться.

**Зроби зараз (5 хв):** додай перевірку, торкнись фінішу двічі й переконайся, що друга видача не йде.`,
      },
      {
        title: "Карта систем перед Ship",
        content: `Ship підтверджує, що рядки з усього модуля працюють в одному Place.

| Урок | Що перевіряєш зараз |
|------|---------------------|
| 5.1 три біоми | Кожен відрізняється й прохідний |
| 5.2 hazards + debounce | Немає миттєвої серії ударів |
| 5.3 чекпоінти + GUI | Респавн на останньому, таймер видно |
| 5.4 while-платформи | Рух стабільний, Parts не зникають |
| 5.5 секрети + ключ | Секрет знаходиться, двері відкриваються |
| 5.7 difficulty curve | Немає різкого стрибка складності |
| 5.9 juice | Звук/частинки на ключових діях, не спам |

Якщо після juice щось зламалось (дубль Sound, зниклий чекпоінт) - фікс зараз, до Access Public і до демо. Новий контент не рятує зламану інтеграцію.

У 5.8 ти вже робив повний прохід як product gate. Сьогодні той самий прохід плюс обгортка й Badge.

**Зроби зараз (5 хв):** пройди таблицю, познач «ні» там, де регресія після 5.9.`,
      },
      {
        title: "Презентація 60-90 секунд",
        content: `Коротке демо перед класом чи ментором:

1. (10 с) Назва й ідея: «Це Neon Obby, три біоми, мета - фініш.»
2. (15 с) Біом 1: hazard і чекпоінт у дії.
3. (15 с) Біом 2: while-платформа або інший унікальний елемент.
4. (15 с) Секрет: ключ-двері, якщо вкладаєшся в час.
5. (15 с) Фініш: лінія + Badge.
6. (10 с) Підсумок: «Повний прохід виглядає так. Дякую.»

Заборонені фрази на здачі: «зачекайте», «зараз знайду», «у мене вчора працювало». Якщо запинаєшся на кроці - скороти саме його, не розтягуй таймер.

Тренуй на таймері телефону тричі. Друга репетиція зазвичай показує, де ти втрачаєш 20 секунд на пояснення замість гри.

трейлер фільму, не повний режисерський коментар.

**Зроби зараз (8 хв):** один прогін демо з таймером; якщо >90 с - виріж один блок пояснень.`,
      },
      {
        title: "Рубрика peer review (~15 пунктів)",
        content: `Дай таблицю однокласнику: він грає й ставить так / ні / майже, ти мовчиш.

**A. Перше враження (1-4)**
1. Назва й опис place зрозумілі.
2. Іконка не дефолтна.
3. Access обраний свідомо.
4. Spawn і перший крок очевидні без пояснень.

**B. Прохід (5-9)**
5. Усі 3 біоми прохідні без застрягань.
6. Чекпоінти зберігають прогрес після смерті.
7. Hazards дають шанс відреагувати (debounce працює).
8. Секрет знаходиться за розумний час.
9. Складність росте плавно від старту до фінішу.

**C. Ship-якість (10-15)**
10. Juice відчутний, але не набридливий.
11. Badge видається рівно один раз на фініші.
12. Output чистий на повному проході.
13. Повторний дотик фінішу не видає Badge знову.
14. Демо вкладається в 60-90 с.
15. Save: Lesson 5.10 - Ship + Badge.

Червоне «ні» в B блокує ship сильніше, ніж дрібниця в A. Спочатку прохід, потім полірування афіші.

**Зроби зараз (10 хв):** самооцінка або peer review - випиши всі «ні» списком фіксів.`,
      },
      {
        title: "Типові ship-фейли й playtest",
        content: `| Симптом | Фікс |
|---------|------|
| Badge не з'являється | Script на сервері, не LocalScript; ID правильний |
| Badge «кілька разів» | UserHasBadgeAsync перед AwardBadge |
| Фініш без логіки | FinishLine.Touched не підключено |
| Один біом сирий | Фікс до Public |
| New Game в назві | Game Settings перед показом |
| Демо 5+ хвилин | Скорочена структура з теорії |

Три верхні рядки покривають більшість «Badge не працює» на здачі.

Playtest інтеграції перед Save:

| # | Дія | Очікування |
|---|-----|------------|
| 1 | Play з нуля | Spawn у біомі 1 |
| 2 | Усі чекпоінти | Респавн на останньому |
| 3 | Hazard | Debounce, не серія ударів |
| 4 | Секрет | Ключ відкриває двері |
| 5 | Фініш | Badge один раз |
| 6 | Повторний фініш | Без повторної видачі |
| 7 | Output | Без червоного |
| 8 | Демо 60-90 с | Без «зачекайте» |

Пункти 5-6 - серце уроку: одна чесна нагорода.

**Зроби зараз (8 хв):** повний прохід одним заходом; перший симптом із таблиці фіксуй одразу.`,
      },
      {
        title: "Чекліст здачі й місток до модуля 6",
        content: `Перед фінальним Save переконайся: Name, Description, Icon заповнені; Access обраний із причиною; Badge на сайті й ID у Script; AwardBadge на сервері після FinishLine.Touched; UserHasBadgeAsync + pcall блокують дубль; рубрика пройдена; демо 60-90 с відрепетируване; Save **Lesson 5.10 - Ship + Badge**.

Далі **6.1 - Core loop + сцена** відкриє Simulator. Та сама дисципліна «сервер видає нагороду» переїде на Coins і giveCoins. Якщо Badge досі з LocalScript - не неси цю діру в модуль 6.

Артефакт дня: **обгорнутий, показуваний obby з одноразовою серверною нагородою**. Ship любить короткий переможний прохід, не найбільшу карту світу.

**Зроби зараз (2 хв):** Save з точною назвою Lesson 5.10 - Ship + Badge.`,
      }
    ],
  },
  commonMistakes: [
    {
      mistake: "AwardBadge з LocalScript",
      explanation: "Клієнт може підробити видачу без реального проходу.",
      correctApproach: "BadgeService:AwardBadge лише в Script на сервері",
    },
    {
      mistake: "Немає UserHasBadgeAsync",
      explanation: "Повторний дотик фінішу знову кличе AwardBadge.",
      correctApproach: "pcall + UserHasBadgeAsync перед AwardBadge",
    },
    {
      mistake: "Game Settings з дефолтною назвою",
      explanation: "Глядач не розуміє продукт ще до входу.",
      correctApproach: "Заповнені Name, Description, Icon перед показом",
    },
    {
      mistake: "Access Public без рубрики",
      explanation: "Незнайомі бачать баги раніше за автора.",
      correctApproach: "Friends для здачі; Public після зеленої рубрики",
    },
    {
      mistake: "Демо 5+ хвилин з поясненнями",
      explanation: "Фокус губиться, суть проєкту тоне.",
      correctApproach: "Структура 60-90 с, скорочені кроки",
    },
    {
      mistake: "Один біом 'майже готовий' на здачі",
      explanation: "Прохід ламається посередині демо - ship не відбувся.",
      correctApproach: "Спочатку фікс усіх трьох біомів, потім Save",
    }
  ],
  summary: "Ти закрив модуль 5 Ship + Badge: Game Settings з назвою, описом і іконкою, свідомий Access, Badge з сайту й серверний AwardBadge на FinishLine з UserHasBadgeAsync. Рубрика й демо 60-90 с підтверджують показуваний obby перед переходом до Simulator у 6.1.",
  practiceTask: {
    title: "Ship + Badge: обгорнути й здати (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** один Place з Game Settings, робочим Badge на фініші й пройденою рубрикою.

### Part A - Settings і Badge (10 хв)
1. Заповни Name, Description, Icon.
2. Обери Access Friends або Public свідомо.
3. Створи Badge на сайті, скопіюй Badge ID.

### Part B - AwardBadge на сервері (15 хв)
1. Script на FinishLine.Touched викликає AwardBadge.
2. Додай UserHasBadgeAsync + pcall.
3. Перевір: другий дотик фінішу не видає Badge знову.

### Part C - Рубрика і демо (10 хв)
1. Пройди ~15 пунктів сам або з peer.
2. Відрепетируй демо 60-90 с.
3. **Save:** Lesson 5.10 - Ship + Badge`,
    hints: [
      "Badge ID копіюй точно - одна зайва цифра ламає видачу",
      "Під час дебагу print success і hasBadge всередині pcall",
      "Тренуй демо на таймері телефону, не на око"
    ],
    optionalChallenge: "Після реальної видачі на сервері FireClient короткий банер Badge Earned! на клієнті - лише разом із успішним AwardBadge.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.10?",
        options: [
          "Побудувати четвертий біом",
          "Обгорнути готовий obby в показуваний продукт з Badge на фініші",
          "Видалити чекпоінти з 5.3",
          "Почати Simulator з нуля"
        ],
        correctAnswer: 1,
        explanation: "Ship + Badge - фінал модуля 5 без нової механіки рівня.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де заповнюють Name, Description, Icon?",
        options: [
          "File → Game Settings → Basic Info",
          "У Script через Instance.new",
          "У BadgeService напряму",
          "Лише в Creator Dashboard без Studio"
        ],
        correctAnswer: 0,
        explanation: "Game Settings - основне вікно налаштувань place.",
      },
      {
        id: "q3",
        type: MC,
        question: "Коли розумно обрати Access Public?",
        options: [
          "Одразу після першого Play",
          "Замість заповнення Description",
          "Після проходження повної ship-рубрики",
          "Public завжди обов'язковий з першого дня"
        ],
        correctAnswer: 2,
        explanation: "Public без перевірки показує баги незнайомцям.",
      },
      {
        id: "q4",
        type: MC,
        question: "Де створюється Badge?",
        options: [
          "У Studio через Instance.new(\"Badge\")",
          "У ServerScriptService автоматично",
          "У Toolbox як Model",
          "На сайті Roblox: Creator Dashboard → Badges"
        ],
        correctAnswer: 3,
        explanation: "Badge - сутність сайту, не Instance у Workspace.",
      },
      {
        id: "q5",
        type: MC,
        question: "Чому AwardBadge лише на сервері?",
        options: [
          "LocalScript технічно не бачить BadgeService",
          "Інакше можна видати собі нагороду без реального проходу",
          "Сервер швидший для UI",
          "Це вимога лише для Friends place"
        ],
        correctAnswer: 1,
        explanation: "Довіра сервера - як для шкоди чи валюти.",
      },
      {
        id: "q6",
        type: MC,
        question: "Навіщо UserHasBadgeAsync перед AwardBadge?",
        options: [
          "Замінює перевірку Humanoid",
          "Прискорює Terrain",
          "Блокує повторну видачу того самого Badge",
          "Потрібен лише в Friends-режимі"
        ],
        correctAnswer: 2,
        explanation: "Анти-дубль нагороди при повторному дотику фінішу.",
      },
      {
        id: "q7",
        type: MC,
        question: "Навіщо pcall навколо BadgeService?",
        options: [
          "pcall прискорює AwardBadge",
          "Без pcall Badge не створити на сайті",
          "pcall замінює UserHasBadgeAsync",
          "Сервіс може відповісти помилкою - гра не має ламатись"
        ],
        correctAnswer: 3,
        explanation: "Захист від збою мережевого сервісу.",
      },
      {
        id: "q8",
        type: MC,
        question: "Скільки триває цільове демо?",
        options: [
          "Обов'язково 10+ хвилин",
          "Близько 60-90 секунд без суфлера",
          "Досить одного скріншота",
          "Рівно 5 секунд"
        ],
        correctAnswer: 1,
        explanation: "Коротке репетируване демо.",
      },
      {
        id: "q9",
        type: MC,
        question: "Що перевіряє категорія B рубрики (5-9)?",
        options: [
          "Лише назву place",
          "Лише колір іконки",
          "Прохідність біомів, чекпоінтів, hazards, секрету й криву складності",
          "Лише наявність Badge ID у файлі"
        ],
        correctAnswer: 2,
        explanation: "Категорія B - серце самого проходу.",
      },
      {
        id: "q10",
        type: MC,
        question: "Типовий ship-фейл 5.10?",
        options: [
          "Чекпоінти зберігають прогрес",
          "Output чистий",
          "Access обраний свідомо",
          "Badge кличеться знову без UserHasBadgeAsync"
        ],
        correctAnswer: 3,
        explanation: "Класична дірка без анти-дубля.",
      },
      {
        id: "q11",
        type: MC,
        question: "З якого уроку juice для демо?",
        options: [
          "5.9 - Sound + Particles",
          "5.2 - Hazards",
          "5.5 - Секрети",
          "5.1 - Дизайн біомів"
        ],
        correctAnswer: 0,
        explanation: "5.9 додав звук і частинки для фінального показу.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що входить у категорію A (перше враження)?",
        options: [
          "Складність росте плавно",
          "Іконка place не дефолтна",
          "Секрет знаходиться швидко",
          "Badge видається один раз"
        ],
        correctAnswer: 1,
        explanation: "Категорія A - до і на вході в гру.",
      },
      {
        id: "q13",
        type: MC,
        question: "Чого НЕ робити на 5.10?",
        options: [
          "Заповнити Game Settings",
          "Створити Badge на сайті",
          "Будувати четвертий біом замість обгортки",
          "Прорепетирувати демо"
        ],
        correctAnswer: 2,
        explanation: "Ship - пакування готового, не новий контент.",
      },
      {
        id: "q14",
        type: MC,
        question: "Як 5.10 готує модуль 6?",
        options: [
          "Видаляє звичку серверних нагород",
          "Замінює Obby на Tycoon в тому ж Place",
          "Вчить DataStore для монет одразу",
          "Закріплює правило: сервер видає нагороду (далі - Coins)"
        ],
        correctAnswer: 3,
        explanation: "Badge тут → серверні Coins у Simulator.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 5.9 - Juice",
          "Lesson 5.10 - Ship + Badge",
          "Lesson 6.1 - Core Loop",
          "Obby Draft Final"
        ],
        correctAnswer: 1,
        explanation: "Чекліст вимагає Lesson 5.10 - Ship + Badge.",
      }
    ],
  },
};
