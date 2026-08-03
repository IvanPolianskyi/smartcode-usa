/** Roblox Module 05 UK — generated from module5 HTML exports */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson51 = {
  lessonId: "lesson-roblox-5-1",
  moduleId: "module-05",
  order: 1,
  title: "5.1 - Дизайн 3 біомів",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Пояснити Obby як жанр модуля 5 і роль трьох біомів на кривій навчання",
    "Скласти паперовий ескіз маршруту Spawn → біом 1-2-3 → Finish до Studio",
    "Створити Folders Biome1/Biome2/Biome3 з контрастними кольорами й матеріалами",
    "Побудувати прохідний скелет платформ без hazards, скриптів бою й декору AAA",
    "Залишити місця під checkpoint, hazard і секрет для уроків 5.2-5.5",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 29 з 92)",
        content: `Модуль 5 — це Obby: дизайн трьох біомів і прохідний скелет Spawn → Finish. Сьогодні ти проєктуєш маршрут і контрастні біоми, на яких нашинуватимемо hazards, checkpoint, таймер, платформи, секрет і juice.

Решта модуля лише нашаровується на цей каркас: 5.2 — hazards, 5.3 — checkpoint + GUI, 5.4 — while-платформи, 5.5 — секрет, 5.6 — playtest, 5.7 — крива, 5.8 — повний прохід, 5.9 — juice, 5.10 — Checkpoint + Ship.

Не тема 5.1:
- Hazard-логіка, juice, таймер;
- Checkpoint система;
- Повний juice як головна фішка.

Тема 5.1:
- маршрут і біоми;
- читабельна геометрія;
- місця під майбутні системи.`,
      },
      {
        title: "Що таке Obby і навіщо три біоми",
        content: `Obby — це курс із перешкодами, де гравець рухається вперед стрибками, уникає небезпек і накопичує прогрес. Три біоми дають пам'ять місця й природну криву складності.

| Біом | Роль | Відчуття |
| --- | --- | --- |
| 1 | Навчання | Ширші платформи, зрозумілий напрямок |
| 2 | Тренування | Тісніші gaps, перші комбо |
| 3 | Іспит | Найвимогливіші стрибки, але все ще fair |`,
      },
      {
        title: "Спочатку папір, потім Studio",
        content: `Відкрити Studio й ставити 40 Parts без плану — класичний хаос. Ескіз за 5 хвилин дешевший за годину перетягування.

На аркуші або в нотатках:
- прямокутник біому 1, 2, 3 зліва направо або знизу вгору;
- точка Spawn і стрілка до Finish;
- 5–8 крапок платформ у кожному біомі;
- пунктир «тут буде hazard» і «тут CP» без будівництва скриптів;
- бічна петля «секрет?» біля біому 2.

Питання ескізу:
- чи видно напрямок без автора;
- чи є місце відпочинку між складними стрибками;
- чи біом 3 не починається з найжорсткішого gap одразу після входу.

Не малюй меблі й арку. Лише потік руху.

**Зроби зараз (5 хв)**: намалюй ескіз трьох зон зі Spawn, Finish і стрілкою основного шляху.`,
      },
      {
        title: "Folders Biome_1 / Biome_2 / Biome_3",
        content: `Структура Explorer з першого дня рятує 5.2–5.9.

\`\`\`
Workspace
├ Biome_1
├ Biome_2
├ Biome_3
├ SpawnLocation (або Pad у Biome_1)
└ FinishLine (заглушка в Biome_3)
\`\`\`

Пізніше додаси Folders Hazards, Checkpoints, Platforms, Secrets, але не сьогодні як повні системи. Сьогодні можна використати порожні маркери Part \`HazardSpot_01\` з Transparency 0.5 як нагадування.

Чому окремі Folder на біом:
- легко приховати або показати зону;
- швидко знайти Parts;
- peer у 5.8 краще орієнтується в дереві.

Не тримай 80 Part у корені Workspace. Не називай усе Part1…Part40.

**Зроби зараз (4 хв)**: створи три Folder біомів і FinishLine-заглушку в Biome_3.`,
      },
      {
        title: "Контраст біомів: колір, Material, висота",
        content: `Гравець читає біом очима ще до першого складного стрибка.

| Засіб | Приклад |
| --- | --- |
| Color | 1: зелений, 2: оранж/червоний, 3: блакитний/білий |
| Material | Grass / Neon або Brick / Ice / Glacier |
| Висота підлоги | Кожен біом на +10…20 studs або зсув по X |
| Форма платформ | 1: широкі плити, 3: вужчі балки |`,
      },
      {
        title: "Скелет платформ: масштаб і gaps",
        content: `Мета — пройти маршрут пішки або стрибками без скриптів, не роблячи ще фінальний Ship.

| Параметр | Біом 1 | Біом 2 | Біом 3 |
| --- | --- | --- | --- |
| Ширина платформи | 6–10 studs | 4–8 | 3–6 |
| Gap | 4–8 | 6–10 | 8–12 (fair) |
| Кількість платформ | 5–8 | 5–8 | 5–8 |
| Довжина зони | компактна | середня | не марафон |`,
      },
      {
        title: "Spawn, напрямок і Finish-заглушка",
        content: `SpawnLocation або яскравий Pad у Biome_1: гравець одразу бачить першу платформу за 5–15 studs, а не порожнечу.

Навігація без стрілок UI:
- низка платформ веде в один бік;
- стіни або бордюри відсікають хибний шлях;
- наступний біом видно контрастом кольору попереду.

FinishLine сьогодні — Anchored Part з ім'ям FinishLine і відмінним кольором. Логіка таймера й Badge прийдуть у 5.3 і 5.10, а ім'я вже зафіксуй.

Не став Spawn над ямою. Не ховай Finish у декорі.

**Зроби зараз (5 хв)**: вистав Spawn, добудуй Biome_3 до FinishLine і перевір видимість фінішу з останніх платформ.`,
      },
      {
        title: "Місця під майбутні системи",
        content: `Залиш «кишені» без реалізації.

| Місце | Маркер зараз | Урок |
| --- | --- | --- |
| Яма під стрибком | Порожня або Part HazardSpot | 5.2 |
| Безпечний майданчик після сегмента | Ширша плита CP_Spot | 5.3 |
| Довгий розрив | Статична плита-тимчасово | 5.4 while |
| Бічний alcove біому 2 | Прохід убік SecretSpot | 5.5 |`,
      },
      {
        title: "Playtest скелета без скриптів",
        content: `Після першого складання маршруту провіряй його як простий прохідник.

1. Play на Spawn — видно біом 1 і напрямок.
2. Пройди біом 1 — без застрягань у геометрії.
3. Вхід у біом 2 — контраст зчитується.
4. Біом 3 → Finish — маршрут існує.
5. Спроба зійти з шляху — бордюр або очевидний край.
6. Explorer — Parts у своїх Folder.
7. Output — порожньо, бо скриптів майже немає.`,
      },
      {
        title: "Анти-патерни дизайну біомів",
        content: `| Патерн | Чому погано | Фікс |
| --- | --- | --- |
| Один довгий коридор без зон | Немає пам'яті місця | Три Folder + контраст |
| Біом 1 уже «іспит» | Новачок здається | Ширші плити на старті |
| Декор замість маршруту | Години Mesh, нуль playtest | Спочатку скелет |
| Випадкові кольори Parts | Шум, не біом | Палітра на зону |
| Немає Finish | Немає цілі | FinishLine-заглушка |
| Script на кожну платформу окремо | Копіпаста, розсинхрон | Один Script на Folder |
| Декор замість скелета | Години Mesh, нуль playtest | Спочатку прохідний каркас |`,
      },
      {
        title: "Зв'язок із кривою 5.7 (наперед)",
        content: `Сьогодні ти не крутиш difficulty curve числами — ще немає Config платформ і багліста. Але заклади ролі біомів так, щоб 5.7 мав що крутити.

- біом 1 прощає помилку шириною;
- біом 2 вимагає уваги;
- біом 3 вужчий, але не невидимий.

Якщо всі три зони вже з gap 14 studs, у 5.7 доведеться все перебудовувати. Краще зараз м'якший старт.

Запиши в нотатках: «B1 gap ~6, B2 ~8, B3 ~10» — старт для майбутніх ітерацій.

**Зроби зараз (2 хв)**: допиши до ескізу орієнтовні gaps трьох біомів.`,
      },
      {
        title: "Що НЕ будувати в 5.1",
        content: `| Не роби зараз | Урок |
| --- | --- |
| KillBrick Script / Зона шкоди | 5.2 |
| Checkpoint + таймер GUI | 5.3 |
| while-платформи + Config | 5.4 |
| Ключ-двері | 5.5 |
| Sound / Particles на весь рівень | 5.9 |
| Badge / Game Settings ship | 5.10 |
| Скрипт для меча чи ближнього бою | ніколи в Obby |`,
      },
      {
        title: "Чекліст здачі й міст до 5.2",
        content: `Перед Save:
- [ ] ескіз трьох біомів і маршруту
- [ ] Folders Biome_1…3 з контрастною палітрою
- [ ] прохідний скелет Spawn → Finish пішки/стрибками
- [ ] FinishLine-заглушка з правильним ім'ям
- [ ] маркери місць під hazard / CP / секрет
- [ ] немає зайвого коду чи непов'язаних скриптів

Далі 5.2 — Hazards + debounce: у ями й HazardSpot додаси читабельні пастки й серверний Touched. Каркас біомів чіпати мінімально — лише наповнення небезпекою.

**Зроби зараз (2 хв)**: Save Place як Lesson 5.1 - Three Biomes.`,
      },
    ],
  },
  summary: "Ти відкрив модуль Obby дизайном трьох контрастних біомів: ескіз, Folders, прохідний скелет Spawn→Finish і маркери під hazard/CP/секрет. Три біоми з контрастами, прохідний каркас і маркери готові до hazards у 5.2.",
  practiceTask: {
    title: "Practice for 5.1 - Дизайн 3 біомів",
    difficulty: "beginner",
    description: `**Мета:** читабельний скелет трьох зон без скриптів.

Part A — Папір (8 хв)
1. Назви біоми й ролі: вчить / тренує / іспит.
2. Ескіз Spawn → 1 → 2 → 3 → Finish.
3. Познач місця hazard / CP / секрет.

Part B — Studio (18 хв)
1. Folders Biome_1…3 + контраст палітри.
2. 5–8 платформ на біом, Anchored true.
3. Spawn, FinishLine, маркери Spot.

Part C — Прохід (9 хв)
1. Play через усі три біоми.
2. Виправ застрягання й дірки.
3. Save: Lesson 5.1 - Three Biomes.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Який жанр модуля 5 і уроку 5.1?",
        options: [
          "FPS зі зброєю",
          "Tycoon з дропером",
          "Obby з дизайном трьох біомів",
          "Simulator з leaderstats",
        ],
        correctAnswer: 2,
        explanation: "Модуль 5 - Obby, і 5.1 закладає три біоми.",
      },
      {
        id: "q2",
        type: MC,
        question: "Роль біому 1 на кривій?",
        options: [
          "Навчання: м'якший старт і читабельний напрямок",
          "Найжорсткіший іспит одразу",
          "Місце для декору",
          "Тільки Skybox без платформ",
        ],
        correctAnswer: 0,
        explanation: "Перший біом вчить, а не екзаменує.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо паперовий ескіз до Studio?",
        options: [
          "Roblox вимагає PDF",
          "Дешевше визначити маршрут, ніж годинами переставляти Parts",
          "Ескіз замінює Folders",
          "Без ескізу не працює Play",
        ],
        correctAnswer: 1,
        explanation: "Ескіз - дешевий спосіб перевірити маршрут заздалегідь.",
      },
      {
        id: "q4",
        type: MC,
        question: "Навіщо Folders Biome_1…3?",
        options: [
          "Щоб вимкнути Anchored",
          "Щоб згрупувати зони для навігації й наступних систем",
          "Щоб створити Tool",
          "Щоб замінити FinishLine",
        ],
        correctAnswer: 1,
        explanation: "Folders структурують Explorer під майбутні уроки.",
      },
      {
        id: "q5",
        type: MC,
        question: "Як біоми мають відрізнятись?",
        options: [
          "Лише номером у голові автора",
          "Контраст кольору, Material або висоти",
          "Обов'язково різними DataStore",
          "Тільки різною музикою без геометрії",
        ],
        correctAnswer: 1,
        explanation: "Контраст має бути видимим у геометрії й матеріалах.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що є головним артефактом 5.1?",
        options: [
          "Прохідний скелет трьох біомів зі Spawn і Finish",
          "Готові hazard-скрипти",
          "Повний Badge ship",
          "while-платформи з Config",
        ],
        correctAnswer: 0,
        explanation: "Здача уроку - прохідний каркас.",
      },
      {
        id: "q7",
        type: MC,
        question: "Що робити з майбутніми hazards сьогодні?",
options: [
          "Повністю закодити KillBrick",
          "Поставити маркери місць без скриптів",
          "Зробити всю підлогу вбивчою",
          "Видалити всі ями",
        ],
        correctAnswer: 1,
        explanation: "Логіка hazards чекає до 5.2, сьогодні лише маркери.",
      },
      {
        id: "q8",
        type: MC,
        question: "Чому погано робити біом 1 уже «іспитом»?",
        options: [
          "Новачок не встигає навчитись і здається рано",
          "Studio не дозволяє широкі Parts на старті",
          "FinishLine тоді зникає",
          "Folders стають неможливими",
        ],
        correctAnswer: 0,
        explanation: "Занадто складний старт відштовхує нового гравця.",
      },
      {
        id: "q9",
        type: MC,
        question: "Що перевіряє playtest скелета?",
        options: [
          "Лише FPS",
          "Чи маршрут проходиться й читається без скриптів",
          "Чи AwardBadge працює",
          "Чи FinishLine видно з останнього біому",
        ],
        correctAnswer: 1,
        explanation: "Playtest у 5.1 перевіряє прохідність і читабельність.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що НЕ входить у здачу 5.1?",
        options: [
          "Три Folder біомів",
          "Ескіз маршруту",
          "Hazard-логіка як основна механіка",
          "FinishLine-заглушка",
        ],
        correctAnswer: 2,
        explanation: "Hazard-логіка - тема 5.2, не 5.1.",
      },
      {
        id: "q11",
        type: MC,
        question: "Навіщо FinishLine уже зараз?",
        options: [
          "Щоб одразу видати Badge",
          "Щоб зафіксувати ціль маршруту для 5.3 і 5.10",
          "Щоб замінити Spawn",
          "Щоб увімкнути Atmosphere",
        ],
        correctAnswer: 1,
        explanation: "FinishLine готує ґрунт для таймера 5.3 і Badge 5.10.",
      },
      {
        id: "q12",
        type: MC,
        question: "Як 5.1 готує 5.2?",
        options: [
          "HazardSpot і ями готові прийняти KillBrick з debounce",
          "5.2 видаляє всі біоми",
          "Пастки більше не потрібні",
          "Треба перейти на Tycoon",
        ],
        correctAnswer: 0,
        explanation: "Маркери з 5.1 стають точками для hazard-скриптів 5.2.",
      },
      {
        id: "q13",
        type: MC,
        question: "Скільки біомів вимагає урок?",
        options: [
          "Один",
          "Два",
          "Десять",
          "Три",
        ],
        correctAnswer: 3,
        explanation: "5.1 будує рівно три контрастні біоми.",
      },
      {
        id: "q14",
        type: MC,
        question: "Що важливіше на 5.1?",
        options: [
          "AAA Mesh-декор усього острова",
          "Читабельний прохідний маршрут",
          "Повний саундтрек",
          "П'ятий біом замість трьох",
        ],
        correctAnswer: 1,
        explanation: "Читабельність маршруту важливіша за декор чи звук.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
options: [
          "Lesson 5.2 - Hazards Debounce",
          "Lesson 5.3 - Checkpoints Timer GUI",
          "Lesson 5.1 - Hazards",
          "Lesson 5.1 - Three Biomes",
        ],
        correctAnswer: 3,
        explanation: "Практика 5.1 закінчується збереженням Lesson 5.1 - Three Biomes.",
      },
    ],
  },
}

export const ukLesson52 = {
  lessonId: "lesson-roblox-5-2",
  moduleId: "module-05",
  order: 2,
  title: "5.2 - Hazards + debounce",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Зробити читабельний hazard Part, який карає помилку стрибка в Obby",
    "Обробити Touched на сервері й знайти Humanoid гравця через GetPlayerFromCharacter",
    "Застосувати смерть або шкоду лише після перевірок hit Part",
    "Захистити повторні Touched debounce-ом, щоб не було миттєвої серії вбивств",
    "Підготувати чесні пастки під checkpoint у 5.3 і juice у 5.9",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 30 з 92)",
        content: `У 5.1 ти розклав три біоми й основний маршрут. Сьогодні маршрут отримує ціну помилки: hazards — лава, шипи, отруйна вода, невидимі лише якщо unfair.

Це урок про пастки, які карають помилку. Жанр — Obby: гравець стрибає, промахується, торкається небезпеки, помирає й вчиться.

| Було в 5.1 | Стає в 5.2 |
| --- | --- |
| Геометрія й маршрут | Маршрут із наслідком помилки |
| Смерть лише від падіння в void | Контрольовані KillBrick / шкода |
| Немає Touched-логіки | Серверний обробник + debounce |`,
      },
      {
        title: "Що таке hazard в Obby",
        content: `Hazard — це Part або модель, дотик до якої карає гравця: миттєва смерть або шкода. Він пояснює правило світу: «сюди не можна».

| Тип | Приклад | Відчуття |
| --- | --- | --- |
| Instant kill | Лава, пила | Жорсткий урок |
| Damage over time | Отрута з debounce шкоди | Напруга, шанс втекти |
| Moving hazard | Шипи на while пізніше | Ритм + небезпека |`,
      },
      {
        title: "Читабельність: fair death",
        content: `Смерть чесна, коли гравець розумів ризик до дотику.

| Стан | Чому це працює |
| --- | --- |
| Fair | Яскравий червоний / neon лава, зуби або шипи на Part |
| Unfair | Той самий колір, що підлога, прозорий CanCollide true без візуального натяку |

Пастка в зоні, куди можна не йти, підвищує читаємість. Смерть після видимого промаху — це хороша помилка, а не випадковий death from thin edge.`,
      },
      {
        title: "Touched на сервері: шлях від hit до Humanoid",
        content: `Touched дає \`hit\` — це Part тіла, часто нога, рука або HRP. Character шукається як \`hit.Parent\`, а гравця — через Players.

\`\`\`
local part = script.Parent
part.Touched:Connect(function(hit)
local character = hit.Parent
local humanoid = character and character:FindFirstChildOfClass(\"Humanoid\")
if not humanoid then return end
local player = game.Players:GetPlayerFromCharacter(character)
if not player then return end
humanoid.Health = 0
end)
\`\`\`

Чому серверний Script: смерть і шкода — це ігрова правда. LocalScript міг би вбити лише «в себе на екрані» або бути обійденим. Для Obby kill завжди має бути на сервері.

Фільтр player потрібен, щоб NPC або інші Humanoid у Workspace випадково не тригерили логіку курсу. Якщо ворогів немає, це все одно гарна звичка.

Не вішай убивство на \`hit\` без перевірки Humanoid: торкання декоративного Part сусіда не має ламати гру.

**Зроби зараз (6 хв)**: один Script у Hazard_01 з шляхом hit → Humanoid → Health = 0 і швидким Play-тестом.`,
      },
      {
        title: "Health = 0 проти Зони шкоди",
        content: `| Метод | Ефект | Коли |
| --- | --- | --- |
| \`humanoid.Health = 0\` | Миттєва смерть | Класичний KillBrick Obby |
| Зона шкоди | Мінус HP | Зони шкоди, не миттєвий kill |`,
      },
      {
        title: "Чому потрібен debounce",
        content: `Touched у Roblox — «шумна» подія. Поки нога стоїть у лаві, hit може прийти десятки разів за секунду. Без debounce ти отримаєш:

- спам print / повторні виклики;
- дивну поведінку з зонами шкоди;
- зайве навантаження;
- ускладнений juice пізніше (звук 40 разів).

Debounce — це прапор «ми вже обробляємо цього гравця або цей Part».

\`\`\`
local debounce = {}
-- ...
if debounce[player] then return end
debounce[player] = true
humanoid.Health = 0
task.delay(1, function()
debounce[player] = nil
end)
\`\`\`

Для instant kill достатньо delay 0.5–1 с: Character і так зникне. Важливіше заблокувати повтор до смерті в тому ж кадрі або серії.

Альтернатива: debounce на рівні hazard Part, якщо пастка одноразова. Для лави краще ключ по player: кілька людей на сервері працюють незалежно.

**Зроби зараз (5 хв)**: додай debounce[player] у Hazard_01 і перевір Output: один логічний kill на вхід у зону.`,
      },
      {
        title: "Один Script на багато hazards",
        content: `Не плоди п'ять майже однакових Script. Збери Folder Hazards і підключи циклом:

\`\`\`
local folder = workspace:WaitForChild(\"Hazards\")
local debounce = {}
local function bind(hazard)
hazard.Touched:Connect(function(hit)
-- перевірки + debounce + Health = 0
end)
end
for _, child in ipairs(folder:GetChildren()) do
if child:IsA(\"BasePart\") then
bind(child)
end
end
\`\`\`

Так нові пастки в Folder одразу працюють після копіювання Part (після перезапуску Script / Play).

Attribute \`DamageMode = \"kill\"\` можна додати пізніше. Сьогодні достатньо однаковий kill на всіх дітях Folder.

Імена: Hazard_Lava_01, Hazard_Spikes_02 - допоможуть у баглісті 5.6.

**Зроби зараз (7 хв)**: перенеси всі пастки в Folder Hazards і підключи їх одним Script.`,
      },
      {
        title: "Де ставити пастки на маршруті",
        content: `| Добре | Погано |
| --- | --- |
| Під стрибком, куди падають при промаху | Вся доріжка = KillBrick |
| Збоку від безпечного краю | На SpawnLocation |
| Після короткого навчання без пастки | Перший крок біому 1 — миттєва лава впритул |
| Контраст з кольором біому | Маскування під checkpoint |`,
      },
      {
        title: "Типові баги Touched",
        content: `| Симптом | Ймовірна причина | Фікс |
| --- | --- | --- |
| Не вбиває | Script у LocalScript / немає Humanoid | Server Script, FindFirstChildOfClass |
| Вбиває декорації | Немає перевірки player | GetPlayerFromCharacter |
| Вбиває миттєво 20 разів у логах | Немає debounce | debounce[player] |
| Не вбиває після респавну | debounce не скинувся | delay clear або clear на CharacterAdded |
| Вбиває крізь стіну | Великий hitbox / CanCollide сусідів | Підріж Size, перевір overlaps |`,
      },
      {
        title: "Що НЕ будувати в 5.2",
        content: `| Не роби зараз | Чому | Фікс |
| --- | --- | --- |
| Багато однакових Script без Folder | Копіпаста | Використай один Script на Folder |
| Checkpoint система | 5.3 | |
| while-платформи | 5.4 | |
| Sound на кожен touch без debounce | Спам; juice в 5.9 після стабільного хука | |
| Невидима підлога-кіллер на всьому біомі | Unfair | |`,
      },
      {
        title: "Playtest пасток",
        content: `| # | Дія | Очікування |
| --- | --- | --- |
| 1 | Крок у Hazard_01 | Одна смерть |
| 2 | Стояння в зоні до зникнення Character | Немає спаму Output |
| 3 | Респавн і знову в пастку | Знову одна логічна смерть |
| 4 | Пройти обхід / правильний стрибок | Можна не вмерти |
| 5 | Усі 3 hazards | Однаковий шаблон поведінки |
| 6 | Візуал з дистанції 20 studs | Пастка впізнається |
| 7 | Script у ServerScriptService / у Part | Працює на сервері |`,
      },
      {
        title: "Чекліст здачі й міст далі",
        content: `Перед Save:

- [ ] Folder Hazards, 3+ читабельні BasePart
- [ ] серверний Touched → Humanoid → Health = 0
- [ ] GetPlayerFromCharacter / фільтр гравця
- [ ] debounce по player (або еквівалент)
- [ ] немає зайвого коду чи непов'язаних скриптів
- [ ] є безпечний шлях поруч із пастками

**Збережи**: Lesson 5.2 - Hazards Debounce.

Далі 5.3 — чекпоінти, таймер і GUI: ті самі смерті стануть дешевшими для навчання. У 5.6 багліст збере unfair невидимі KillBrick. У 5.9 на хук сяде juice.

**Зроби зараз (2 хв)**: Save Place як Lesson 5.2 - Hazards Debounce.`,
      },
    ],
  },
  summary: "Ти зібрав Obby-hazards: читабельні пастки, серверний Touched до Humanoid, debounce проти спаму й Folder для масштабу. Смерть чесна й готова прийняти checkpoint у 5.3 та juice у 5.9.",
  practiceTask: {
    title: "Practice for 5.2 - Hazards + debounce",
    difficulty: "beginner",
    description: `**Мета:** три чесні пастки з одним серверним шаблоном.

Part A — Сцена (8 хв)
1. Folder Hazards.
2. Три BasePart з контрастним виглядом.
3. Розмісти під/поряд зі стрибками, обхід існує.

Part B — Логіка (17 хв)
1. Один Script: for по Folder + Touched.
2. Humanoid + GetPlayerFromCharacter.
3. debounce[player] + Health = 0.

Part C — Перевірка (10 хв)
1. Одна смерть на вхід у зону.
2. Немає Output-спаму.
3. Усі три пастки працюють.
4. Save: Lesson 5.2 - Hazards Debounce.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.2?",
        options: [
          "Створити Tool для ближнього бою",
          "Чесні Obby-hazards з Touched і debounce",
          "Відкрити магазин Coins",
          "Зберегти DataStore",
        ],
        correctAnswer: 1,
        explanation: "5.2 будує чесні hazards на Touched з debounce.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де має жити логіка KillBrick?",
        options: [
          "У LocalScript StarterPlayer",
          "У Script на сервері",
          "Лише в Lighting",
          "У Bundle без Script",
        ],
        correctAnswer: 1,
        explanation: "Урон і смерть рахує сервер, не клієнт.",
      },
      {
        id: "q3",
        type: MC,
        question: "Що таке hit у Touched?",
        options: [
          "Обов\'язково сам гравець Instance",
          "Завжди Humanoid",
          "Part, що торкнувся (часто частина Character)",
          "Тільки SpawnLocation",
        ],
        correctAnswer: 2,
        explanation: "Touched повертає Part, який торкнувся.",
      },
      {
        id: "q4",
        type: MC,
        question: "Навіщо debounce?",
        options: [
          "Щоб прискорити WalkSpeed",
          "Щоб заборонити Anchored",
          "Щоб Part став прозорим",
          "Щоб серія Touched не спамила одну й ту саму кару",
        ],
        correctAnswer: 3,
        explanation: "Debounce блокує повторні спрацювання одного дотику.",
      },
      {
        id: "q5",
        type: MC,
        question: "Який метод найпростіший для KillBrick Obby?",
        options: [
          "humanoid.Health = 0",
          "Видалити Workspace",
          "Teleport на Null",
          "LocalScript Destroy(player)",
        ],
        correctAnswer: 0,
        explanation: "Обнулення Health - найпростіший надійний kill.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що робить смерть unfair?",
        options: [
          "Яскрава лава під промахом стрибка",
          "KillBrick кольору підлоги без натяку",
          "Шипи з контрастним Neon",
          "Пастка з обхідним маршрутом",
        ],
        correctAnswer: 1,
        explanation: "Невидима пастка того ж кольору - головна причина unfair-смерті.",
      },
      {
        id: "q7",
        type: MC,
        question: "Навіщо GetPlayerFromCharacter?",
        options: [
          "Щоб відфільтрувати саме гравця, а не будь-який Humanoid",
          "Щоб намалювати Sky",
          "Щоб створити Tool",
          "Щоб вимкнути Touched",
        ],
        correctAnswer: 0,
        explanation: "Функція перевіряє, що Humanoid належить гравцю.",
      },
      {
        id: "q8",
        type: MC,
        question: "Як підключити багато пасток без копіпасти?",
        options: [
          "Окремий Place на кожен hazard",
          "Folder Hazards + for + спільна функція bind",
          "Лише Studio Plugins",
          "Видалити всі Parts крім одного",
        ],
        correctAnswer: 1,
        explanation: "Folder і цикл дозволяють один bind на всі hazards.",
      },
      {
        id: "q9",
        type: MC,
        question: "Чому ForceField може «зламати» тест одразу після респавну?",
        options: [
          "Він видаляє Script",
          "Короткий імунітет не дає одразу померти в hazard",
          "Він вимикає debounce назавжди",
          "Він переносить FinishLine",
        ],
        correctAnswer: 1,
        explanation: "Тимчасовий імунітет заважає перевірити kill одразу після респавну.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що НЕ здавати в 5.2?",
        options: [
          "Три читабельні hazards",
          "Debounce",
          "Серверний Touched",
          "Повний juice Sound на кожному hazard",
        ],
        correctAnswer: 3,
        explanation: "Juice - не тема 5.2, він додається після стабільних хуків.",
      },
      {
        id: "q11",
        type: MC,
        question: "Як 5.2 готує 5.3?",
        options: [
          "Checkpoint зменшить вартість цих смертей для навчання",
          "5.3 видаляє всі hazards",
          "Debounce більше не потрібен",
          "GUI замінить KillBrick",
        ],
        correctAnswer: 0,
        explanation: "Checkpoint у 5.3 робить hazards з 5.2 менш карними.",
      },
      {
        id: "q12",
        type: MC,
        question: "Куди в 5.9 сяде Sound смерті?",
        options: [
          "В окремий другий Touched без логіки",
          "У той самий серверний хук після підтвердженого kill",
          "Лише в SoundService без Part",
          "У Terrain",
        ],
        correctAnswer: 1,
        explanation: "Звук додається всередину вже готового хука смерті.",
      },
      {
        id: "q13",
        type: MC,
        question: "Де краще НЕ ставити hazard?",
        options: [
          "Під промахом стрибка",
          "Збоку від безпечного краю",
          "На SpawnLocation гравця",
          "У ямі біому 2",
        ],
        correctAnswer: 2,
        explanation: "Hazard на SpawnLocation вбиватиме гравця миттєво і несправедливо.",
      },
      {
        id: "q14",
        type: MC,
        question: "Який жанр модуля 5?",
        options: [
          "Симулятор з монетами",
          "Tycoon з дропером",
          "Obby з паркуром і пастками",
          "Simulator з Coins",
        ],
        correctAnswer: 2,
        explanation: "Модуль 5 - Obby з паркуром і пастками.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 5.1 - Biomes",
          "Lesson 5.3 - Checkpoints Timer GUI",
          "Lesson 5.2 - Hazards",
          "Lesson 5.2 - Hazards Debounce",
        ],
        correctAnswer: 3,
        explanation: "Практика 5.2 завершується збереженням Lesson 5.2 - Hazards Debounce.",
      },
    ],
  },
}

export const ukLesson53 = {
  lessonId: "lesson-roblox-5-3",
  moduleId: "module-05",
  order: 3,
  title: "5.3 - Чекпоінти + таймер + GUI",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Зберегти останній checkpoint гравця на сервері після Touched",
    "Респавнити Character на збереженій позиції, а не лише на старті рівня",
    "Показати ScreenGui з номером checkpoint і живим таймером проходження",
    "Захистити повторні Touched debounce-ом і не давати відкату на старіший CP",
    "Підготувати прогрес і час до while-платформ у 5.4 і playtest у 5.6",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 31 з 92)",
        content: `У 5.2 hazards уже вбивають з debounce. Без збереження прогресу кожна смерть кидає гравця на початок - Obby стає карою, а не навчанням. Сьогодні будуєш три системи разом: checkpoint, respawn на ньому й GUI з таймером.

Жанр - Obby: прогрес по біомах, чесний повтор після смерті, видимий час проходження.

|Було в 5.2|Стає в 5.3|
|----------|----------|
|Смерть → старт рівня|Смерть → останній checkpoint|
|Прогрес лише в голові автора|Прогрес у даних гравця|
|Немає відчуття часу|Таймер на екрані|`,
      },
      {
        title: "Навіщо checkpoint в Obby",
        content: `Смерть у паркурі - норма. Питання лише: скільки контенту гравець повторює.

|Без CP|З CP|
|------|----|
|Кожна помилка = повний рестарт|Помилка коштує сегмент, не весь рівень|
|Новачок здається на біомі 2|Новачок вчить біом 2 з середини|
|Автор зменшує складність «бо лють»|Можна лишити виклик і додати CP|`,
      },
      {
        title: "Серверна правда LastCheckpoint",
        content: `Стан прогресу живе на сервері, прив'язаний до Player, а не до Character.

| Підхід | Плюс |
| --- | --- |
| IntValue CheckpointIndex на player | Просто порівняти «лише вперед» |
| Vector3/CFrame у table на сервері | Точна точка респавну |
| Attribute на player | Зручно читати з клієнта для GUI |`,
      },
      {
        title: "Touched на checkpoint з debounce",
        content: `Гравець стоїть на Part кілька кадрів - Touched спамить. Без debounce збереження й GUI миготять.

Шаблон:

\`\`\`
local debounce = {}
part.Touched:Connect(function(hit)
local character = hit.Parent
local player = Players:GetPlayerFromCharacter(character)
if not player then return end
if debounce[player] then return end
debounce[player] = true
-- зберегти CP, якщо index більший
task.delay(1, function()
debounce[player] = nil
end)
end)
\`\`\`

Альтернатива: якщо вже збережено цей самий index - одразу return без delay. Це ще чистіше для «стояння на CP».

Не створюй другий Touched лише для звуку - у 5.9 juice увійде в цей самий хук.

Імена: Checkpoint_01, Checkpoint_02… або Folder Checkpoints з дітьми. for GetChildren допоможе підключити всі Parts одним циклом.

**Зроби зараз (8 хв)**: підключи Touched на всі CP з debounce і підвищенням CheckpointIndex лише вперед.`,
      },
      {
        title: "Респавн на останньому checkpoint",
        content: `За замовчуванням Roblox повертає на SpawnLocation. Тобі потрібно перебити це після появи нового Character.

\`\`\`
player.CharacterAdded:Connect(function(character)
  local hrp = character:WaitForChild(\"HumanoidRootPart\")
  local data = checkpoints[player.UserId]
  if data and data.cframe then
    hrp.CFrame = data.cframe + Vector3.new(0, 3, 0)
  end
end)
\`\`\`

Зсув по Y на 2-4 studs уникає застрягання в підлозі CP.

Підпиши також Humanoid.Died лише якщо треба логування; сам телепорт зазвичай на CharacterAdded після авто-respawn. LoadCharacter / RespawnTime у Players налаштуй свідомо (наприклад 2-3 с).

Перевір крайні випадки:

- смерть до першого CP → Spawn;
- смерть після CP_02 → CP_02;
- повторна смерть → той самий CP, не відкат.

Не став Parent leaderstats у Character - прогрес зникне. CheckpointIndex на Player.

**Зроби зараз (8 хв)**: помри після CP_02 і переконайся, що з'являєшся біля нього, а не на старті.`,
      },
      {
        title: "Лише вперед: анти-відкат",
        content: `Якщо гравець повертається й знову топче CP_01 після CP_03, стан не повинен стрибнути назад.

Правило: оновлювати індекс лише коли новий checkpoint справді вищий за поточний.

\`\`\`
if newIndex > currentIndex then
    currentIndex = newIndex
end
\`\`\`

**Зроби зараз (3 хв)**: після CP_03 навмисно торкнись CP_01 і перевір, що index лишився 3.`,
      },
      {
        title: "ScreenGui: мітка checkpoint",
        content: `GUI показує правду сервера, не вигадує її.

\`\`\`
StarterGui
└ ScreenGui ProgressGui (ResetOnSpawn = false)
└ TextLabel CheckpointLabel
\`\`\`

LocalScript:

\`\`\`
local player = game.Players.LocalPlayer
local index = player:WaitForChild(\"CheckpointIndex\")
local label = script.Parent:WaitForChild(\"CheckpointLabel\")
local function refresh()
label.Text = \"Checkpoint: \" .. tostring(index.Value)
end
refresh()
index:GetPropertyChangedSignal(\"Value\"):Connect(refresh)
\`\`\`

ResetOnSpawn false - щоб підписки й GUI не плодились кожну смерть. Якщо ResetOnSpawn true - обережно з дублями скриптів.

Не пиши \`index.Value = 99\` з LocalScript «для тесту в проді». Для дебагу в Studio можна тимчасово, але здача - лише читання.

Текст «Checkpoint: 2» достатній. Красиві іконки - не мінімум.

**Зроби зараз (6 хв)**: зроби ProgressGui з CheckpointLabel, що оновлюється при зміні Value.`,
      },
      {
        title: "Таймер проходження",
        content: `Таймер показує, скільки часу зайняв забіг від старту (або від першого руху) до поточного моменту / фінішу.

Простий клієнтський варіант для навчання:

\`\`\`
local start = os.clock()
RunService.RenderStepped:Connect(function()
local t = os.clock() - start
local m = math.floor(t / 60)
local s = math.floor(t % 60)
timerLabel.Text = string.format(\"%02d:%02d\", m, s)
end)
\`\`\`

Серверний старт точніший для анти-читу й лідерборду, але для 5.3 достатньо чесного клієнтського таймера + зупинка на Finish пізніше. Якщо хочеш сервер: RemoteEvent «TimerStart» при Spawn і Attribute Elapsed.

Зупинка на фініші: коли Touched FinishLine на сервері - FireClient фінальний час або постав Flag Finished і клієнт перестає оновлювати.

Не скидай таймер на кожному checkpoint - це час проходження рівня, не сегмента. Окремий сегментний час - додатковий виклик.

**Зроби зараз (6 хв)**: додай TimerLabel мм:сс, що стартує з появою персонажа.`,
      },
      {
        title: "FinishLine і зупинка таймера",
        content: `Part FinishLine на кінці біому 3:

- Touched → якщо ще не Finished, познач Finished на сервері;
- опційно збережи FinalTime;
- клієнт зупиняє оновлення таймера й показує фінальний рядок.

\`\`\`
if player:GetAttribute(\"Finished\") then return end
player:SetAttribute(\"Finished\", true)
\`\`\`

Не видавай Badge тут - це 5.10. Сьогодні лише прогрес і час. Але структура FinishLine вже та сама, що знадобиться для AwardBadge.

Debounce на Finish такий самий, як на CP. Повторні дотики не повинні мигати GUI.

Якщо гравець фінішував і помер - зазвичай не респавнити на CP для «нового забігу» автоматично; для курсу достатньо Stop таймера й залишити Finished.

**Зроби зараз (5 хв)**: постав FinishLine, зупини таймер при першому валідному дотику.`,
      },
      {
        title: "Зв'язок з hazards 5.2",
        content: `Hazard убиває → Character зникає → CharacterAdded → телепорт на CP.

Порядок у голові:

- Debounce смерті з 5.2 лишається.
- Checkpoint не скасовує KillBrick.
- Після респавну гравець знову вразливий - це нормально.
- GUI з ResetOnSpawn false переживає смерть.

Типовий баг: телепорт на CP спрацьовує до появи HumanoidRootPart - завжди WaitForChild. Інший баг: телепорт у тій самій позиції, де KillBrick - зсунь CP або підняти Y.

Не лікуй unfair hazard чекпоінтом «через кожен крок». Спочатку зроби hazard читабельним (5.2), CP - сітка безпеки між сегментами.

**Зроби зараз (4 хв)**: убийся на hazard після CP_01 двічі й перевір стабільний респавн + GUI.`,
      },
      {
        title: "Що НЕ будувати в 5.3",
          content: `
|Не роби зараз|Коли|
|-------------|----|
|Повний juice на CP|5.9|
|while-платформи|5.4|
|Ключ-двері|5.5|
|Juice Sound на CP|5.9|
|Badge на фініші|5.10|
|DataStore часу між сесіями|пізніше / M4 lite|`,
      },
      {
        title: "Playtest прогресу",
        content: `| # | Дія | Очікування |
| --- | --- | --- |
| 1 | Старт | Index 0, таймер іде, Spawn |
| 2 | Touch CP_01 | Index 1, GUI оновився |
| 3 | Смерть | Респавн на CP_01 |
| 4 | CP_02 потім CP_01 | Index лишається 2 |
| 5 | Стояння на CP | Немає спаму GUI / Output |
| 6 | Finish | Таймер стоп, Finished |
| 7 | ResetOnSpawn | Немає дубля ScreenGui |`,
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
- [ ] Save: Lesson 5.3 - Checkpoints Timer GUI

Далі 5.4 - while-платформи + Config: став рухомі Parts після CP, щоб навчання таймінгу не коштувало повного рестарту. У 5.6 тестер виміряє смерті й паузи саме між цими checkpoint.

**Зроби зараз (2 хв)**: Save Place як Lesson 5.3 - Checkpoints Timer GUI.`,
      },
    ],
  },
  summary: "Ти зібрав прогрес Obby: серверні checkpoint лише вперед, респавн на останньому CP, ScreenGui з індексом і таймером, Finish зупиняє час. Каркас готовий до while-платформ у 5.4 і Badge на тій самій FinishLine у 5.10.",
  practiceTask: {
    title: "Practice for 5.3 - Чекпоінти + таймер + GUI",
    difficulty: "beginner",
    description: `**Мета:** три CP, чесний респавн, GUI й таймер до Finish.

Part A — Parts (7 хв)
1. Checkpoint_01…03 на маршруті.
2. FinishLine в кінці.
3. Різні кольори, Anchored true.

Part B — Сервер (15 хв)
1. CheckpointIndex на Player.
2. Touched + debounce + лише вперед + збереження CFrame.
3. CharacterAdded телепорт на останній CP.

Part C — GUI і фініш (13 хв)
1. ProgressGui: CheckpointLabel + TimerLabel.
2. Таймер мм:сс зі старту.
3. Finish зупиняє таймер.
4. Save: Lesson 5.3 - Checkpoints Timer GUI.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.3?",
        options: [
          "Налаштування GUI таймера",
          "Checkpoints, респавн, таймер і GUI для Obby",
          "Tween ударів",
          "DataStore монет",
        ],
        correctAnswer: 1,
        explanation: "5.3 будує checkpoint, респавн, таймер і GUI.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де зберігати LastCheckpoint / CheckpointIndex?",
        options: [
          "На сервері в даних Player",
          "Лише в LocalScript змінній",
          "У Lighting",
          "У Terrain",
        ],
        correctAnswer: 0,
        explanation: "Прогрес зберігається на сервері у даних гравця.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо debounce на checkpoint Touched?",
        options: [
          "Щоб видалити FinishLine",
          "Щоб прискорити Humanoid",
          "Щоб стояння на Part не спамило збереження й GUI",
          "Щоб вимкнути Anchored",
        ],
        correctAnswer: 2,
        explanation: "Debounce не дає повторно спрацьовувати збереженню й GUI.",
      },
      {
        id: "q4",
        type: MC,
        question: "Що означає правило «лише вперед»?",
        options: [
          "newIndex <= current ігнорується",
          "Завжди скидати на 0",
          "CP працюють лише в Studio",
          "Таймер іде назад",
        ],
        correctAnswer: 0,
        explanation: "Повернення на попередній CP не відкочує прогрес.",
      },
      {
        id: "q5",
        type: MC,
        question: "Коли телепортувати на checkpoint після смерті?",
        options: [
          "У Lighting.Changed",
          "У CharacterAdded після WaitForChild HumanoidRootPart",
          "Лише в Edit Mode",
          "У Bundle",
        ],
        correctAnswer: 1,
        explanation: "Телепорт відбувається після появи нового Character і його HumanoidRootPart.",
      },
      {
        id: "q6",
        type: MC,
        question: "Який ResetOnSpawn зручний для ProgressGui?",
        options: [
          "true завжди",
          "false, щоб не плодити GUI й підписки",
          "nil обов\'язково",
          "Лише на мобільному",
        ],
        correctAnswer: 1,
        explanation: "false запобігає дублюванню GUI й підписок при кожному респавні.",
      },
      {
        id: "q7",
        type: MC,
        question: "Що має робити LocalScript з CheckpointIndex?",
        options: [
          "Лише читати Value і малювати текст",
          "Призначати собі index = 99",
          "Видаляти hazards",
          "Створювати leaderstats",
        ],
        correctAnswer: 0,
        explanation: "Клієнт лише відображає значення, не змінює його.",
      },
      {
        id: "q8",
        type: MC,
        question: "Навіщо таймер у 5.3?",
        options: [
          "Замінити checkpoint",
          "Показати час проходження рівня",
          "Збільшити WalkSpeed",
          "Видалити SpawnLocation",
        ],
        correctAnswer: 1,
        explanation: "Таймер показує гравцю час проходження рівня.",
      },
      {
        id: "q9",
        type: MC,
        question: "Чи скидати таймер на кожному checkpoint?",
        options: [
          "Так завжди",
          "Ні - це час усього проходження, не сегмента",
          "Так, інакше GUI не працює",
          "Лише на CP_01",
        ],
        correctAnswer: 1,
        explanation: "Таймер рахує весь прохід, а не окремий сегмент між CP.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що робити на FinishLine сьогодні?",
        options: [
          "AwardBadge одразу",
          "Відкрити магазин",
          "Зупинити таймер і позначити Finished",
          "Видалити всі CP",
        ],
        correctAnswer: 2,
        explanation: "FinishLine у 5.3 лише зупиняє таймер і фіксує завершення.",
      },
      {
        id: "q11",
        type: MC,
        question: "Як checkpoint стикується з hazard 5.2?",
        options: [
          "Після смерті респавн на останньому CP, debounce hazard лишається",
          "Hazard вимикає всі CP",
          "CP скасовує CanCollide у лаві",
          "Потрібна нова карта",
        ],
        correctAnswer: 0,
        explanation: "Checkpoint і hazard-debounce з 5.2 працюють разом без конфліктів.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що НЕ є метою 5.3?",
        options: [
          "Три checkpoint",
          "GUI з індексом",
          "Повний juice на чекпоінті",
          "Таймер мм:сс",
        ],
        correctAnswer: 2,
        explanation: "Juice - не мета 5.3, він додається у 5.9.",
      },
      {
        id: "q13",
        type: MC,
        question: "Як 5.3 готує 5.4?",
        options: [
          "While-платформи ставлять після CP, щоб навчання не коштувало повного рестарту",
          "5.4 видаляє GUI",
          "Платформи замінюють усі CP",
          "Config більше не потрібен",
        ],
        correctAnswer: 0,
        explanation: "Checkpoint робить наступні while-платформи безпечнішими для навчання.",
      },
      {
        id: "q14",
        type: MC,
        question: "Навіщо зсув +3 studs по Y при респавні?",
        options: [
          "Щоб збільшити WalkSpeed",
          "Щоб уникнути застрягання в геометрії CP",
          "Щоб вимкнути таймер",
          "Щоб створити Badge",
        ],
        correctAnswer: 1,
        explanation: "Невеликий зсув вгору запобігає застряганню персонажа в геометрії.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 5.2 - Hazards",
          "Lesson 5.4 - Moving Platforms",
          "Lesson 5.3 - Hazards",
          "Lesson 5.3 - Checkpoints Timer GUI",
        ],
        correctAnswer: 3,
        explanation: "Практика 5.3 завершується збереженням Lesson 5.3 - Checkpoints Timer GUI.",
      },
    ],
  },
}

export const ukLesson54 = {
  lessonId: "lesson-roblox-5-4",
  moduleId: "module-05",
  order: 4,
  title: "5.4 - while-платформи + Config",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
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
        content: `У 5.3 ти зібрав чекпоінти, таймер і GUI. Сьогодні Obby отримує рух у часі: платформи, що з'являються, зникають або їздять туди-назад за циклом \`while\`.

Жанр лишається Obby: гравець читає ритм платформи й стрибає у вікно безпеки.

|Було в 5.3|Стає в 5.4|
|----------|----------|
|Статичні Parts і checkpoints|Parts з повторюваним таймінгом|
|Складність лише gap і hazard|Складність ще й у часі|
|Числа розкидані в коді|Числа в Config|`,
      },
      {
        title: "Навіщо while, а не разова анімація",
        content: `Obby потребує нескінченного циклу на сервері, поки гра працює. Гравець може підійти на 10-й чи 100-й секунді - платформа все ще має рухатись за правилом.

|Підхід|Коли брати|
|------|----------|
|\`while true do ... task.wait() end\`|Повторюваний ігровий цикл платформи|
|Tween один раз|Разовий ефект (відкриття дверей, flash)|
|RunService.Heartbeat кожен кадр|Точний рух, але складніше для першого уроку|`,
      },
      {
        title: "Два патерни платформи",
        content: `Обери один патерн на платформу. Не змішуй усе в одному Part без потреби.

|Патерн|Що змінюєш|Відчуття|
|------|----------|--------|
|Blink|CanCollide + Transparency|«Злови момент, поки є підлога»|
|Shuttle|Position / CFrame між A і B|«Застрибни на ліфт і з'їдь»|`,
      },
      {
        title: "PlatformConfig: числа в одному місці",
        content: `Config - table, з якої цикл читає таймінги. Завтра в 5.7 ти змінюватимеш числа, не переписуючи логіку.

\`\`\`
local PlatformConfig = {
  { id = \"Moving_01\", kind = \"blink\", waitUp = 2.0, waitDown = 1.5 },
  { id = \"Moving_02\", kind = \"shuttle\", waitUp = 1.2, waitDown = 1.2, offset = Vector3.new(0, 0, 12) },
}
\`\`\`

|Поле|Навіщо|
|----|------|
|id|Ім'я Part у Workspace / Folder Platforms|
|kind|blink або shuttle|
|waitUp|Скільки секунд у «безпечному» / крайньому стані A|
|waitDown|Скільки секунд у стані B|
|offset|Зсув для shuttle (опційно)|`,
      },
      {
        title: "Один while для однієї платформи",
        content: `Мінімальний blink на сервері:

\`\`\`
local part = workspace.Platforms.Moving_01
while true do
part.CanCollide = true
part.Transparency = 0
task.wait(2)
part.CanCollide = false
part.Transparency = 0.8
task.wait(1.5)
end
\`\`\`

Після Config підстав числа з table. Не хардкодь 2 і 1.5 у п'яти місцях.

Shuttle-ідея:

\`\`\`
local start = part.Position
local finish = start + offset
while true do
part.Position = finish
task.wait(waitUp)
part.Position = start
task.wait(waitDown)
end
\`\`\`

Стрибкоподібний Position для навчання ок. Плавний Tween можна додати пізніше; сьогодні важливий передбачуваний цикл, не кінематограф.

Якщо гравець стоїть на платформі під час CanCollide false - він впаде. Це і є геймплей blink. Постав hazard або м'яку яму під нею свідомо.

**Зроби зараз (8 хв)**: запусти while для Moving_01 у Play і переконайся, що цикл повторюється без помилок Output.`,
      },
      {
        title: "for по Config: кілька платформ без копіпасти",
        content: `Копіювати Script на кожен Part - шлях до розсинхрону: змінив таймінг в одному, забув у другому.

Краще:

\`\`\`
for _, cfg in ipairs(PlatformConfig) do
task.spawn(function()
local part = workspace.Platforms:WaitForChild(cfg.id)
while true do
-- blink або shuttle за cfg.kind
task.wait(cfg.waitUp)
-- другий стан
task.wait(cfg.waitDown)
end
end)
end
\`\`\`

\`\`\`
task.spawn
\`\`\`
дає кожній платформі власний while, щоб одна не блокувала іншу. Без spawn другий цикл ніколи не стартує, якщо перший while true вічний.

Перевір імена: cfg.id має збігатися з Name Part. WaitForChild врятує від гонки завантаження.

Не запускай 20 while «про запас». Дві-три платформи для здачі; зайві записи в Config без Parts дадуть зависання на WaitForChild або warn.

**Зроби зараз (7 хв)**: підключи обидві платформи через for + task.spawn від одного PlatformConfig.`,
      },
      {
        title: "Читабельний таймінг: fair window",
        content: `Складність while-платформи - у вікні, не в невидимості.

|Симптом|Ймовірна причина|Фікс у Config|
|-------|----------------|-------------|
|Ніхто не встигає|waitUp занадто малий|Збільш waitUp|
|Нудно чекати|waitDown / waitUp завеликі|Зменш паузи|
|Неясно, коли стрибати|Прозорість 1 = повністю невидимо|Transparency 0.5-0.8 у «вихідному» стані|
|Смерть здається випадковою|Немає ритму / різні цикли хаотично|Однакові фази або явний колір|`,
      },
      {
        title: "Де ставити платформи на маршруті",
        content: `While-платформа — подія на шляху, а не декорація в кутку.

| Добре | Погано |
| --- | --- |
| Після checkpoint, з місцем розігнатись | Одразу після Spawn без навчання |
| Над видимою ямою / hazard | Над нескінченною порожнечею без CP позаду |
| Одна нова ідея за раз | Blink + shuttle + вузький gap одночасно на першому Part |
| Колір відрізняється від підлоги | Той самий Material, що й безпечна земля |`,
      },
      {
        title: "Стабільність: Anchored, Pivot, помилки",
        content: `Типові поломки while-платформ:

|Проблема|Фікс|
|--------|----|
|Part падає|Anchored true|
|Цикл раз і стоп|Немає while true або error перед наступною ітерацією|
|Одна платформа рухається, друга ні|Забули task.spawn / другий cfg.id|
|Output червоний Infinite yield|Невірний id у WaitForChild|
|Гравець «прилип»|Рідко: зсув CFrame; спробуй Position або коротший offset|`,
      },
      {
        title: "Зв'язок з checkpoint і hazards",
        content: `While-платформа стоїть у мережі систем 5.2-5.3.

- Checkpoint перед складною платформою зменшує лють від навчання таймінгу.
- Hazard під blink має бути видимим (колір), інакше смерть unfair.
- Debounce hazard лишається з 5.2; платформа не скасовує його.
- Таймер GUI з 5.3 продовжує йти - не скидай його в while платформи.

Не відкривай двері секрету через while - це плутанина з 5.5. Секрет отримає Prompt; платформи лишаються паркуром.

Якщо після смерті платформа «не там», де очікував гравець - це норма для циклу. Проблема лише якщо цикл зупинився. Respawn не повинен reset-ити Config.

**Зроби зараз (3 хв)**: постав або перевір checkpoint перед першою while-платформою.`,
      },
      {
        title: "Що НЕ робити в 5.4",
          content: `
|Не роби зараз|Коли|
|-------------|----|
|Повний juice на CP|5.9|
|15 унікальних Script без Config|Анти-патерн|
|waitUp = 0.1 як «хардкор»|Unfair; баланс у 5.7|
|LocalScript як єдиний рух платформи|Розсинхрон між гравцями|
|Повний juice Sound на цикл|5.9|
|DataStore таймінгів|зайве|`,
      },
      {
        title: "Playtest циклу",
        content: `| # | Дія | Очікування |
| --- | --- | --- |
| 1 | Play 20 с біля Moving_01 | Цикл повторюється |
| 2 | Стрибок у безпечне вікно | Успіх без «лотереї» |
| 3 | Чекай повний цикл перед стрибком | Ритм читається |
| 4 | Moving_02 з Config | Інший таймінг, той самий код |
| 5 | Смерть і respawn на CP | Платформи далі крутяться |
| 6 | Output | Без infinite yield / spam |
| 7 | Зміни waitUp у Config на +0.5 | Поведінка змінилась без правки while |`,
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
- [ ] Save: Lesson 5.4 - Moving Platforms

Далі 5.5 - Секрети + ключ-двері: основний шлях уже з ритмом; секрет лишиться опційним. У 5.6 тестер оцінить, чи while зрозумілий без підказок. У 5.7 ти крутитимеш саме Config як важіль difficulty curve.

**Зроби зараз (2 хв)**: Save Place як Lesson 5.4 - Moving Platforms.`,
      },
    ],
  },
  summary: "Ти зібрав while-платформи Obby з PlatformConfig: мінімум два цикли, for + task.spawn, читабельні waitUp/waitDown. Config готовий стати пультом балансу в 5.7 без переписування логіки.",
  practiceTask: {
    title: "Practice for 5.4 - while-платформи + Config",
    difficulty: "beginner",
    description: `**Мета:** зібрати ритмічні while-платформи і винести таймінг у Config.

Part A — Планування (8 хв)
1. Відкрий Place з 5.3.
2. Познач два місця, де статичний стрибок можна замінити ритмічною платформою.
3. Запиши, який ритм має бути читабельним для гравця.

Part B — Build (15 хв)
1. Додай мінімум дві while-платформи на маршруті.
2. Винеси waitUp / waitDown у Config або окремий table з параметрами.
3. Перевір, що платформи не зникають без причини.

Part C — Retest (7 хв)
1. Пройди маршрут ще раз і впевнись, що ритм читається.
2. Зміни один таймінг у Config і перевір поведінку.
3. Save: Lesson 5.4 - Moving Platforms.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.4?",
        options: [
          "Зміна таймінгів через DataStore",
          "While-платформи Obby з таймінгом у Config",
          "DataStore прогресу монет",
          "Видалити всі checkpoint",
        ],
        correctAnswer: 1,
        explanation: "5.4 будує while-платформи з таймінгом у Config.",
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
        explanation: "Без затримки нескінченний цикл перевантажує сервер.",
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
        explanation: "Config централізує таймінги платформи для легшого налаштування.",
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
        explanation: "task.spawn дозволяє кожній платформі мати власний незалежний цикл.",
      },
      {
        id: "q5",
        type: MC,
        question: "Що типово змінює blink-платформа?",
        options: [
          "MaxHealth гравця",
          "CanCollide і Transparency за розкладом",
          "SoundService Volume глобально",
          "Ім\'я Place",
        ],
        correctAnswer: 1,
        explanation: "Blink-платформа циклічно перемикає CanCollide і Transparency.",
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
        explanation: "Стан платформи мусить бути однаковим для всіх, тому рахує сервер.",
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
        explanation: "0.15 с - занадто швидко, щоб новачок встиг зрозуміти ритм.",
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
        explanation: "Найчастіша причина - розбіжність між id у Config і Name Part.",
      },
      {
        id: "q9",
        type: MC,
        question: "Як 5.4 готує 5.7?",
        options: [
          "5.7 видаляє Config",
          "Difficulty curve крутитиме waitUp/waitDown як важіль",
          "5.7 видаляє Config",
          "Платформи більше не потрібні",
        ],
        correctAnswer: 1,
        explanation: "У 5.7 ті самі параметри Config стануть важелями складності.",
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
        explanation: "Занадто ранній складний ритм відлякує нового гравця.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що має лишатись true на рухомій платформі?",
        options: [
          "Anchored",
          "Looped у Sound",
          "CanQuery = false завжди",
          "Material = Neon обов\'язково",
        ],
        correctAnswer: 0,
        explanation: "Платформа має лишатись Anchored, навіть змінюючи інші властивості.",
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
        explanation: "Робочий зв\'язок Config-циклу видно по зміні поведінки в Play.",
      },
      {
        id: "q13",
        type: MC,
        question: "Що НЕ є метою 5.4?",
        options: [
          "Дві while-платформи",
          "PlatformConfig",
          "Стабільний цикл без Output spam",
          "Постійний Enabled на ParticleEmitter",
        ],
        correctAnswer: 3,
        explanation: "Це не входить у тему 5.4.",
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
        explanation: "Checkpoint з 5.3 знижує ціну помилки на складній платформі.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 5.3 - Checkpoints",
          "Lesson 5.5 - Secrets Key Door",
          "Lesson 5.4 - Hazards",
          "Lesson 5.4 - Moving Platforms",
        ],
        correctAnswer: 3,
        explanation: "Практика 5.4 завершується збереженням Lesson 5.4 - Moving Platforms.",
      },
    ],
  },
}

export const ukLesson55 = {
  lessonId: "lesson-roblox-5-5",
  moduleId: "module-05",
  order: 5,
  title: "5.5 - Секрети + ключ-двері",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Спроєктувати опційний секрет, який не блокує основний шлях до Finish",
    "Створити Key Part і Door Part з чіткими іменами та читабельним натяком",
    "Відкрити двері через ProximityPrompt лише за наявності ключа на сервері",
    "Зберігати стан HasKey і Open на сервері без LocalScript як правди",
    "Підготувати секрет до playtest 5.6: без ключа Finish доступний",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 33 з 92)",
        content: `У 5.4 ти додав while-платформи з Config. Основний маршрут Obby уже вміє вчити, карати й повертати на checkpoint. Сьогодні додаєш опційний шар дослідження: секрет з ключем і дверима.

Це не обов'язковий тупик. Секрет винагороджує цікавість. Якщо гравець його пропустить - він усе одно має дійти до Finish основним шляхом.

|Було в 5.4|Стає в 5.5|
|----------|----------|
|Основний маршрут з платформами|Той самий маршрут + бічний секрет|
|Немає дослідження|Ключ → двері → нагорода або shortcut|
|Усе обов'язкове|Секрет опційний|`,
      },
      {
        title: "Секрет vs обов'язковий вузол",
        content: `У Obby є два типи контенту.

| Тип | Роль | Правило |
| --- | --- | --- |
| Основний шлях | Spawn → Finish | Має проходитися без секрету |
| Секрет | Бічний маршрут або винагорода | Не блокує головний шлях |

Бонус, shortcut, кімната — опційний; пропуск не ламає гру.`,
      },
      {
        title: "Де поставити ключ і двері",
        content: `Розміщення вирішує, чи секрет читається як відкриття, чи як розчарування.

| Елемент | Добре | Погано |
| --- | --- | --- |
| Key | Ледь помітний alcove, інший колір/форма | Під прозорим Part без натяку |
| Door | Бачиш з основного шляху, але обхід існує | Єдиний прохід у вузькому коридорі |
| Натяк | Billboard «?», Neon outline, трохи інший Material | Повний текст «натисни E за стіною» на весь екран |
| Дистанція | 10–40 studs від main path | На іншому кінці карти без причини |`,
      },
      {
        title: "ProximityPrompt: навмисна дія",
        content: `Для ключа й дверей ProximityPrompt кращий за голий Touched. Гравець свідомо натискає E (або кнопку на UI), а не випадково збирає ключ плечем.

| Property | Рекомендація |
| --- | --- |
| ActionText | «Взяти ключ» / «Відкрити» |
| ObjectText | «Ключ» / «Таємні двері» |
| MaxActivationDistance | 8–12 |
| HoldDuration | 0 або 0.3 |
| RequiresLineOfSight | true, якщо не хочеш клік крізь стіну |`,
      },
      {
        title: "Серверна правда: HasKey і Open",
        content: `Стан «у гравця є ключ» живе на сервері. LocalScript може малювати іконку, але не вирішує, чи двері відчиняться.

Простий варіант на Player:

\`\`\`
local hasKey = Instance.new(\"BoolValue\")
hasKey.Name = \"HasKey\"
hasKey.Value = false
hasKey.Parent = player
\`\`\`

Або Attribute на player: \`player:SetAttribute(\"HasKey\", true)\`.

Для дверей:

\`\`\`
door:SetAttribute(\"Open\", false)
\`\`\`

Коли Prompt спрацьовує на сервері:

- Перевір player і Character.
- Якщо HasKey == false - return або короткий feedback «потрібен ключ».
- Якщо true - Open = true, CanCollide false / Transparency 1 / Destroy двері / Tween убік.
- Опційно обнули ключ або залиш «використано».

Чому не LocalScript: клієнт може сказати «я вже маю ключ» без реального підбору. У 5.10 Badge і в M6 Coins та сама звичка - сервер вирішує нагороду.

**Зроби зараз (4 хв)**: у Script на сервері створи HasKey для гравця в PlayerAdded і перевір print при зміні.`,
      },
      {
        title: "Підбір ключа",
        content: `Мінімальний серверний шаблон для Key:

\`\`\`
local key = workspace.Secrets.Key_01
key.Touched:Connect(function(hit)
local character = hit.Parent
local player = game.Players:GetPlayerFromCharacter(character)
if not player then return end
local hasKey = player:FindFirstChild(\"HasKey\")
if not hasKey or hasKey.Value then return end
hasKey.Value = true
key:Destroy() -- або Transparency = 1, CanTouch = false
end)
\`\`\`

Debounce потрібен, якщо Key лишається в світі: кілька Touched за кадр не повинні спамити. Якщо Destroy одразу - другий виклик уже не знайде Part.

Не клади ключ у Character як єдину правду без серверного прапора: після смерті Character зникне, і «ключ у руці» пропаде разом із тілом, якщо ти не зберіг стан на Player.

Візуальний feedback: короткий ParticleEmitter Emit або зміна кольору UI пізніше. Сьогодні достатньо зникнення ключа й зміни BoolValue. Juice на повний рівень буде в 5.9.

**Зроби зараз (6 хв)**: підключи Touched або Prompt на Key_01 так, щоб HasKey став true один раз і ключ зник.`,
      },
      {
        title: "Відкриття дверей",
        content: `Prompt на дверях слухає Triggered на сервері:

\`\`\`
local prompt = door:WaitForChild(\"ProximityPrompt\")
prompt.Triggered:Connect(function(player)
local hasKey = player:FindFirstChild(\"HasKey\")
if not hasKey or not hasKey.Value then return end
if door:GetAttribute(\"Open\") then return end
door:SetAttribute(\"Open\", true)
door.CanCollide = false
door.Transparency = 1
prompt.Enabled = false
end)
\`\`\`

Альтернатива: TweenPosition дверей убік, Anchor лишається true. Destroy також ок, якщо двері більше не потрібні.

Анти-дубль: Open Attribute або prompt.Enabled = false після першого успіху. Інакше Triggered знову клікає «порожні» двері.

Без ключа Prompt може лишатись видимим - це натяк «сюди можна, але пізніше». Або зміни ObjectText на «Потрібен ключ». Не телепортуй гравця і не вбивай його за спробу без ключа.

**Зроби зараз (6 хв)**: відкрий двері лише з HasKey true; без ключа Triggered нічого не ламає.`,
      },
      {
        title: "Що за дверима: нагорода без блокера",
        content: `За дверима має бути причина зайти, але не єдиний шлях уперед.

| Нагорода | Плюс | Мінус, якщо зробити обов'язковою |
| --- | --- | --- |
| Shortcut до наступного біому | Відчуття «я знайшов швидший шлях» | Без ключа довгий шлях має лишатись |
| Кімната з декором / видом | Атмосфера | Порожня кімната розчаровує |
| Бонусний checkpoint | Менше повтору після смерті | Не замінює основні CP |
| Монета / бейдж пізніше | Мотивація | Не роби зараз економіку M6 |`,
      },
      {
        title: "Натяки без спойлерів",
        content: `Секрет, який ніхто не знаходить, — мертвий контент. Секрет, який кричить «натисни сюди», — вже не секрет.

| Баланс натяків | Приклад |
| --- | --- |
| Занадто мало | Ключ кольору підлоги |
| Достатньо | Ледь інший відтінок / форма |
| Занадто багато | Величезний Billboard з інструкцією |`,
      },
      {
        title: "Смерть, respawn і ключ",
        content: `Obby вбиває часто. Секрет має переживати смерть чесно.

| Підхід | Поведінка |
| --- | --- |
| HasKey на Player | Після смерті ключ лишається «в інвентарі стану» |
| Ключ лише в Character | Після смерті стан губиться, якщо не зберегти |
| Ключ respawn у світі | Можна підібрати знову, якщо двері ще зачинені |
| Двері вже Open | Лишаються відкритими для всіх або лише для власника |`,
      },
      {
        title: "Playtest секрету перед 5.6",
        content: `Короткий чесний тест сьогодні, повний багліст — завтра.

| # | Дія | Очікування |
| --- | --- | --- |
| 1 | Іди до Finish без ключа | Прохід можливий |
| 2 | Знайди ключ за натяком | HasKey true, ключ зникає |
| 3 | Prompt дверей без ключа | Нічого критичного не ламається |
| 4 | Prompt з ключем | Двері відкриваються один раз |
| 5 | Повторний Prompt | Немає спаму / помилок |
| 6 | Смерть після ключа | Стан ключа або дверей коректний |
| 7 | Output | Без червоного спаму |`,
      },
      {
        title: "Що НЕ будувати в 5.5",
        content: `| Не роби зараз | Коли прийде |
| --- | --- |
| Повний магазин / Coins економіка | M6 |
| Badge за секрет | 5.10 за фініш; окремий badge — опційно пізніше |
| Juice Sound/Particles на весь рівень | 5.9 |
| Обов'язковий ключ на Finish | ніколи в цьому курсі |
| Складний інвентар на 10 предметів | M4 / хаб пізніше |
| DataStore збереження ключа між сесіями | не потрібно для 5.5 |`,
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
- [ ] Save: Lesson 5.5 - Secrets Key Door

Далі 5.6 - Playtest #1 + багліст. Тестер ітиме без твоїх слів: чи знайде ключ, чи впреться в двері, чи дійде до Finish без секрету. Запиши ці спостереження як окремі рядки багліста.

У 5.7 difficulty curve може послабити підхід до секрету, якщо він занадто жорсткий, але не зробить секрет обов'язковим. У 5.9 додаси короткий Sound на підбір ключа й відкриття дверей.

**Зроби зараз (2 хв)**: Save Place як Lesson 5.5 - Secrets Key Door.`,
      },
    ],
  },
  summary: "Ти додав опційний секрет Obby: Key і Door з ProximityPrompt, серверним HasKey і одноразовим відкриттям. Основний шлях до Finish лишається доступним без ключа - готово до чесного playtest у 5.6.",
  practiceTask: {
    title: "Practice for 5.5 - Секрети + ключ-двері",
    difficulty: "beginner",
    description: `**Мета:** один опційний секрет, який не блокує Finish.

Part A — Сцена (10 хв)
1. Folder Secrets: Key_01 і Door_01.
2. Постав поза main path; Door видно з основного маршруту.
3. Додай один візуальний натяк на кожен об'єкт.

Part B — Серверна логіка (15 хв)
1. HasKey на Player (BoolValue або Attribute).
2. Підбір ключа → HasKey true, ключ зникає.
3. Prompt на дверях відкриває лише з ключем; Open один раз.

Part C — Перевірка (10 хв)
1. Finish без ключа.
2. Ключ → двері → нагорода/обхід.
3. Смерть після ключа.
4. Save: Lesson 5.5 - Secrets Key Door.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна роль секрету в уроці 5.5?",
options: [
          "Єдиний спосіб дійти до Finish",
          "Обов'язковий ключ на Finish",
          "Опційне дослідження з ключем і дверима",
          "Заміна всіх checkpoint",
        ],
        correctAnswer: 2,
        explanation: "Секрет 5.5 - опційне дослідження з ключем і дверима.",
      },
      {
        id: "q2",
        type: MC,
        question: "Як перевірити, що секрет не блокер?",
        options: [
          "Видалити Key і Door уявно: Finish усе одно досяжний",
          "Зробити ключ обов\'язковим на Spawn",
          "Поставити двері перед кожним біомом",
          "Вимкнути всі hazards",
        ],
        correctAnswer: 0,
        explanation: "Основний маршрут має лишатись прохідним без секрету.",
      },
      {
        id: "q3",
        type: MC,
        question: "Де має жити правда HasKey?",
        options: [
          "Лише в LocalScript GUI",
          "У коментарі Workspace",
          "У Lighting",
          "На сервері: BoolValue або Attribute гравця",
        ],
        correctAnswer: 3,
        explanation: "Стан ключа перевіряє сервер, не клієнт.",
      },
      {
        id: "q4",
        type: MC,
        question: "Чому для дверей зручний ProximityPrompt?",
        options: [
          "Він автоматично зберігає DataStore",
          "Гравець робить навмисну дію, а не випадковий Touched",
          "Prompt працює лише в Edit Mode",
          "Він замінює Humanoid",
        ],
        correctAnswer: 1,
        explanation: "Prompt вимагає свідомої взаємодії гравця.",
      },
      {
        id: "q5",
        type: MC,
        question: "Що має статись при відкритті дверей з ключем?",
        options: [
          "Open один раз: CanCollide/Transparency або Tween, Prompt вимкнено",
          "Двері вбивають гравця",
          "Видаляється весь біом 2",
          "Скидаються всі checkpoint",
        ],
        correctAnswer: 0,
        explanation: "Двері відкриваються один раз і вимикають Prompt.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що робити, якщо Triggered без ключа?",
        options: [
          "Відкрити двері все одно",
          "Телепортувати на Finish",
          "Нічого не ламати; опційно короткий feedback «потрібен ключ»",
          "Видалити HasKey у всіх гравців",
        ],
        correctAnswer: 2,
        explanation: "Без ключа двері лишаються закритими, лише короткий feedback.",
      },
      {
        id: "q7",
        type: MC,
        question: "Де найкраще розмістити перший секрет?",
        options: [
          "На SpawnLocation замість біому 1",
          "Поза main path, з видимими дверима й легким натяком",
          "Як єдиний прохід у біом 3",
          "Усередині KillBrick",
        ],
        correctAnswer: 1,
        explanation: "Секрет має бути поза основним маршрутом і помітним.",
      },
      {
        id: "q8",
        type: MC,
        question: "Що з нагород за дверима підходить для 5.5?",
        options: [
          "Повна економіка Coins і DataStore",
          "Обов\'язковий Badge курсу",
          "Четвертий біом на 100 Parts",
          "Короткий shortcut, кімната або бонусний вид з виходом на main path",
        ],
        correctAnswer: 3,
        explanation: "Нагорода - невеликий бонус, не окрема економіка чи біом.",
      },
      {
        id: "q9",
        type: MC,
        question: "Чому ключ небезпечно тримати лише як Part у Character?",
        options: [
          "Character не може містити Parts",
          "Після смерті Character зникає і стан легко губиться",
          "Prompt тоді не існує",
          "ServerScriptService видаляє Character",
        ],
        correctAnswer: 1,
        explanation: "Character видаляється при смерті, тож стан ключа треба зберігати окремо.",
      },
      {
        id: "q10",
        type: MC,
        question: "Який натяк найкращий для здачі?",
        options: [
          "Автор пояснює маршрут вголос",
          "Величезний текст «ключ за стіною ліворуч»",
          "Ледь інший колір/форма й Prompt на дверях",
          "Повна невидимість без жодної відмінності",
        ],
        correctAnswer: 2,
        explanation: "Легкий візуальний натяк - баланс між прихованістю і читабельністю.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що перевірити після смерті з уже взятим ключем?",
        options: [
          "Що HasKey або Open лишаються коректними для дверей",
          "Що всі Sounds видалились",
          "Що Finish зник",
          "Що Config платформ обнулився",
        ],
        correctAnswer: 0,
        explanation: "Стан ключа має пережити смерть і респавн гравця.",
      },
      {
        id: "q12",
        type: MC,
        question: "Чого НЕ робити в мінімумі 5.5?",
        options: [
          "Один Key і одні Door",
          "Серверну перевірку HasKey",
          "Повний juice на всі hazards і магазин монет",
          "Playtest Finish без ключа",
        ],
        correctAnswer: 2,
        explanation: "Juice і економіка монет - поза межами мінімуму 5.5.",
      },
      {
        id: "q13",
        type: MC,
        question: "Як 5.5 готує 5.6?",
        options: [
          "5.6 видаляє всі секрети",
          "Тестер перевірить опційність, натяки й Prompt без підказок автора",
          "Багліст більше не потрібен",
          "5.6 проводить playtest",
        ],
        correctAnswer: 1,
        explanation: "У 5.6 незалежний тестер перевіряє секрет без підказок автора.",
      },
      {
        id: "q14",
        type: MC,
        question: "Який жанр цього уроку?",
        options: [
          "Симулятор з монетами",
          "Tycoon з дропером",
          "Simulator з Coins",
          "Obby з опційним секретом",
        ],
        correctAnswer: 3,
        explanation: "Урок лишається в жанрі Obby, додаючи опційний секрет.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 5.5 - Secrets Key Door",
          "Lesson 5.4 - Platforms",
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.5 - Respawn System",
        ],
        correctAnswer: 0,
        explanation: "Практика 5.5 завершується збереженням Lesson 5.5 - Secrets Key Door.",
      },
    ],
  },
}

export const ukLesson56 = {
  lessonId: "lesson-roblox-5-6",
  moduleId: "module-05",
  order: 6,
  title: "5.6 - Playtest #1 + багліст",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Провести перший повний playtest Obby без підказок автору чи тестеру",
    "Записати баги з expected, actual, reproduce steps і доказом",
    "Розподілити проблеми за категоріями та пріоритетом P0-P3",
    "Виправляти одну причину за раз і робити короткий regression retest",
    "Підготувати перевірений багліст як вхідні дані для difficulty curve у 5.7",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 34 з 92)",
        content: `У 5.5 ти додав секрет, ключ і двері до Obby. На карті вже є три біоми, hazards, чекпоінти, таймер, GUI, while-платформи й опційний маршрут. Сьогодні ти не будуєш нову механіку. Ти перевіряєш, чи всі ці системи переживають повний прохід від Spawn до Finish.

Playtest #1 - перша чесна зустріч гри з гравцем. Автор знає кожен стрибок, прихований ключ і таймінг платформи. Тестер цього не знає. Саме тому його помилки корисніші за твоє «у мене працює».

|Було в 5.5|Стає в 5.6|
|----------|----------|
|Автор знає маршрут|Незнайомий гравець перевіряє читабельність|
|Механіки тестувались окремо|Один прохід перевіряє їх разом|
|«Здається, працює»|Таблиця з доказами й пріоритетами|`,
      },
      {
        title: "Чому автор не може бути єдиним тестером",
        content: `Ти проходив свій Obby десятки разів під час будівництва. Мозок уже пам'ятає, де платформа зникне, який Part є KillBrick і за якою стіною лежить ключ. Новий гравець бачить лише колір, форму й рух.

| Сліпа зона автора | Що бачить новачок |
| --- | --- |
| «Очевидний» перший стрибок | Два однакові маршрути без вказівника |
| «Легкий» таймінг платформи | Незрозуміло, коли вона рушить |
| «Помітний» checkpoint | Декоративний Part без feedback |
| «Логічний» секрет | Двері без натяку на ключ |
| «Чесний» hazard | Смерть від Part того самого кольору, що підлога |`,
      },
      {
        title: "Заморозь збірку перед тестом",
        content: `Не змінюй Parts, Config і Scripts посеред одного прогону. Інакше перша половина тесту відбулась на Build A, друга — на Build B, а результати неможливо порівняти.

| Поле | Приклад |
| --- | --- |
| Build | 5.6-A |
| Save | Lesson 5.6 - Playtest 1 Buglist |
| Дата / час | 19.07, 17:30 |
| Тестер | ім'я або Tester 1 |
| Пристрій | PC / laptop / mobile |
| Стартовий стан | новий сервер, Spawn біому 1 |`,
      },
      {
        title: "Ролі: тестер грає, автор спостерігає",
        content: `Перед Play домовся про прості ролі.

Тестер:

- грає від Spawn до Finish;
- говорить уголос, що бачить і чого очікує;
- не намагається бути ввічливим;
- після смерті пояснює, чому, на його думку, це сталось.

Автор-спостерігач:

- не підказує маршрут, ключ чи таймінг;
- записує час, смерті, паузи й питання;
- просить повторити дію, якщо треба reproduce;
- ставить уточнення після події, не під час стрибка.

Корисні питання після сегмента: «Що ти думав, що станеться?», «Що підказало тобі йти сюди?», «Чому ця смерть здалась чесною або нечесною?». Некорисне питання: «Тобі ж сподобалось, правда?» - воно штовхає до приємної відповіді.

Якщо немає іншої людини, зроби self-test з обмеженнями: стартуй із нового сервера, не використовуй Explorer, не пропускай біоми, записуй екран і коментуй рішення вголос. Це слабше за peer, але краще за швидке пробігання напам'ять.

**Зроби зараз (3 хв)**: передай тестеру одну інструкцію: «Дійди до фінішу й говори, що очікуєш. Я не підказую».`,
      },
      {
        title: "Сценарій повного проходу",
        content: `Один і той самий сценарій робить результати порівнюваними. Не телепортуй тестера одразу до «цікавого місця».

| Крок | Що перевірити |
| --- | --- |
| 1. Spawn | Чи зрозумілий напрямок до біому 1 |
| 2. Перші hazards | Чи читається небезпека до смерті |
| 3. Checkpoint | Чи видно, що прогрес зараховано |
| 4. Respawn | Чи повертає на останній checkpoint |
| 5. while-платформа | Чи можна прочитати цикл і дочекатись вікна |
| 6. Ключ-двері | Чи основний шлях не блокується секретом |
| 7. Біом 3 | Чи складно через навичку, а не випадковість |
| 8. Finish | Чи таймер зупиняється і результат зрозумілий |`,
      },
      {
        title: "Багліст: один рядок - одна проблема",
        content: `Багліст — не список «щось дивне». Кожен рядок має дозволити іншій людині знайти проблему без твоєї пам'яті.

| ID | Місце | Expected | Actual | Steps | Priority | Доказ |
| --- | --- | --- | --- | --- | --- | --- |
| OBBY-01 | CP після біому 1 | Respawn тут | Respawn на старті | Touch CP → die | P1 | відео 00:42 |
| OBBY-02 | DoorSecret | Відкрити з ключем | Двері лишаються | Take key → Prompt | P1 | screenshot |
| OBBY-03 | Moving_02 | Цикл 2 с | Part зависає | Wait 3 cycles | P2 | Output line |`,
      },
      {
        title: "Пріоритет P0-P3",
        content: `Пріоритет відповідає на питання «що виправляти першим», а не «що мене найбільше дратує».

| Рівень | Значення | Приклад в Obby |
| --- | --- | --- |
| P0 | Прохід неможливий для всіх | Finish відсутній, серверний Script падає |
| P1 | Основний прогрес ламається часто | Checkpoint не зберігає, двері блокують main path |
| P2 | Прохід можливий, але досвід поганий | Нечесний gap, платформа інколи зависає |
| P3 | Косметика або дрібна незручність | Part криво стоїть, текст трохи зміщений |`,
      },
      {
        title: "Reproduce steps і докази",
        content: `Баг існує для команди лише тоді, коли його можна побачити ще раз або коли є достатній доказ рідкісного збою.

Хороші reproduce steps:

- Запусти новий сервер на Build 5.6-A.
- Торкнись Checkpoint_02.
- Впади в Lava_03.
- Перевір місце respawn.
- Actual: Spawn біому 1; expected: Checkpoint_02.

Погані steps: «пограй трохи», «десь у лаві», «іноді не працює».

Докази за силою:

- коротке відео з видимим маршрутом;
- screenshot до/після;
- точний текст Output з часом;
- значення Properties або Attribute під час Play;
- усне «здається» без повтору - найслабше.

Не записуй приватні дані тестера й не знімай зайве. Для курсу достатньо екрану Studio/Roblox та номера Build.

Якщо баг не повторився, не видаляй запис. Познач Frequency: 1/3 або Cannot reproduce і залиш доказ. Можливо, причина залежить від respawn чи порядку подій.

**Зроби зараз (5 хв)**: для найважливішого бага виконай steps двічі й допиши Frequency 2/2, 1/2 або 0/2.`,
      },
      {
        title: "Категорії: перевір увесь Obby, не лише код",
        content: `Категорія допомагає побачити, де накопичився борг.

|Категорія|Що туди входить|
|---------|---------------|
|Gameplay|gap, collision, moving platform, hazard|
|Progress|checkpoint, respawn, finish, timer|
|Navigation|напрямок, біоми, видимість цілі|
|Secret|ключ, двері, Prompt, опційність|
|UI|таймер, checkpoint label, текст|
|Performance|лаг, нескінченний цикл, спам Output|
|Polish|колір, звук, частинки, вирівнювання|`,
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

**Зроби зараз (4 хв)**: додай у багліст хоча б одне поведінкове спостереження, навіть якщо код не показав помилки.`,
      },
      {
        title: "Triage: одна причина, один фікс",
        content: `Після завершення прогону відсортуй записи й обери перший P0/P1. Не хапайся за всі рядки одночасно.

Ритуал triage:

- Підтвердь reproduce steps.
- Знайди найменшу ймовірну причину.
- Зміни одну річ.
- Перевір саме цей сценарій.
- Запиши Fixed in Build 5.6-B або Reopen.

Приклад: respawn іде на старт. Не пересувай SpawnLocation, не переписуй GUI й не змінюй timer одночасно. Спочатку перевір, чи сервер зберіг номер Checkpoint_02 і чи CharacterAdded читає його.

Для difficulty-проблем не перебудовуй біом сьогодні. Запиши точне місце, кількість смертей і гіпотезу. У 5.7 ти змінюватимеш gap, width, timing або checkpoint density по одному важелю.

Статуси багліста: Open, In progress, Fixed, Retest, Reopen, Won't fix (з причиною). «Fixed» до перевірки - лише припущення; після зміни став Retest.

**Зроби зараз (6 хв)**: обери найвищий P0/P1, зроби один мінімальний фікс і зміни статус на Retest.`,
      },
      {
        title: "Regression retest після фіксу",
        content: `Regression - перевірка, що фікс не зламав сусідні системи. Після checkpoint-фіксу недостатньо один раз торкнутись Part.

Мінімальний regression-набір:

|Фікс|Що повторити|
|----|------------|
|Checkpoint|touch → die → respawn → наступний CP|
|Hazard|звичайний touch, повторний touch, respawn|
|Moving platform|3 цикли, стрибок на/з платформи|
|Key-door|без ключа, з ключем, після respawn|
|Finish/timer|повний старт і коректна зупинка|`,
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
- [ ] Save: Lesson 5.6 - Playtest 1 Buglist

Далі 5.7 - Difficulty curve. Візьми баги типу «занадто важко», «занадто легко», «нечесно» і перетвори їх на керовані зміни gap, ширини, timing та щільності checkpoint. Не починай 5.7 з порожнім баглістом.

У 5.8 інша людина зробить контрольний повний прохід після твоїх змін. У 5.9 з'являться Sound і Particles. У 5.10 - фінальний checkpoint і Ship + Badge. Сьогоднішній документ тримає весь цей ланцюг на фактах.

**Зроби зараз (2 хв)**: збережи Place і багліст під назвою Lesson 5.6 - Playtest 1 Buglist.`,
      },
    ],
  },
  summary: "Ти заморозив збірку Obby, провів повний playtest без підказок, записав відтворювані баги з priority P0-P3, виправив один блокер і підтвердив його regression retest. Багліст готовий стати картою difficulty curve у 5.7.",
  practiceTask: {
    title: "Practice for 5.6 - Playtest #1 + багліст",
    difficulty: "beginner",
    description: `**Мета:** один чесний прогін Obby, багліст із доказами та перевірений фікс.

Part A — Підготовка (7 хв)
1. Save Build 5.6-A.
2. Створи таблицю ID / Place / Expected / Actual / Steps / Category / Priority / Evidence.
3. Дай тестеру інструкцію без підказки маршруту.

Part B — Повний прогін (15 хв)
1. Від Spawn до Finish без телепортів.
2. Запиши час, смерті, паузи й питання.
3. Збери мінімум 5 конкретних записів.

Part C — Triage і retest (13 хв)
1. Відсортуй P0 → P3.
2. Виправ один P0/P1 мінімальною зміною у Build 5.6-B.
3. Повтори reproduce steps і сусідній regression-сценарій.
4. Save: Lesson 5.6 - Playtest 1 Buglist.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головний результат уроку 5.6?",
        options: [
          "Новий четвертий біом",
          "Sound і ParticleEmitter на кожній події",
          "Відтворюваний багліст і перевірений фікс",
          "Public-реліз без повторного тесту",
        ],
        correctAnswer: 2,
        explanation: "5.6 дає відтворюваний багліст і перевірений фікс.",
      },
      {
        id: "q2",
        type: MC,
        question: "Чому автор не має підказувати тестеру?",
        options: [
          "Підказка приховує проблеми навігації та пояснення правил",
          "Тестер повинен читати код у ServerScriptService",
          "Будь-яка розмова зупиняє Play Mode",
          "Підказки автоматично змінюють difficulty",
        ],
        correctAnswer: 0,
        explanation: "Підказки маскують реальні проблеми читабельності рівня.",
      },
      {
        id: "q3",
        type: MC,
        question: "Навіщо фіксувати Build 5.6-A перед прогоном?",
        options: [
          "Щоб автоматично створити Badge",
          "Щоб заборонити тестеру помирати",
          "Щоб увімкнути Team Create",
          "Щоб усі спостереження стосувались однієї незмінної збірки",
        ],
        correctAnswer: 3,
        explanation: "Незмінна збірка робить спостереження порівнянними.",
      },
      {
        id: "q4",
        type: MC,
        question: "Який запис бага найкращий?",
        options: [
          "Checkpoint дивний",
          "Touch CP_02 -> die -> respawn на старті; expected CP_02",
          "У мене вчора працювало",
          "Тестер не вміє грати",
        ],
        correctAnswer: 1,
        explanation: "Чіткі кроки відтворення - найкорисніший формат запису.",
      },
      {
        id: "q5",
        type: MC,
        question: "Що є P0 для Obby?",
        options: [
          "Finish неможливо досягти через зламаний основний шлях",
          "Текст таймера зміщений на кілька pixels",
          "Декорація має інший Material",
          "Один gap здається трохи легким",
        ],
        correctAnswer: 0,
        explanation: "P0 - блокер, що робить рівень непрохідним.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що робити з трьома однаковими смертями тестера?",
        options: [
          "Одразу видалити весь біом",
          "Сказати правильний таймінг і не записувати",
          "Зафіксувати місце як можливий difficulty або fairness дефект",
          "Додати частинки, не змінюючи стрибок",
        ],
        correctAnswer: 2,
        explanation: "Повторювана смерть у тому ж місці - сигнал для difficulty-аналізу.",
      },
      {
        id: "q7",
        type: MC,
        question: "Коли проблема може отримати статус Fixed?",
        options: [
          "Одразу після зміни коду без Play",
          "Після повторення steps і успішного retest",
          "Коли автор більше не пам\'ятає про неї",
          "Після зміни кольору рядка таблиці",
        ],
        correctAnswer: 1,
        explanation: "Fixed підтверджується лише повторним тестом за тими ж кроками.",
      },
      {
        id: "q8",
        type: MC,
        question: "Що перевіряти після фіксу checkpoint?",
        options: [
          "Лише його колір в Edit Mode",
          "Тільки перший touch без смерті",
          "Лише Output до запуску сервера",
          "Touch, смерть, respawn і перехід до наступного checkpoint",
        ],
        correctAnswer: 3,
        explanation: "Повний цикл checkpoint треба перевірити end-to-end.",
      },
      {
        id: "q9",
        type: MC,
        question: "Яке твердження про 5.5 key-door правильне?",
        options: [
          "Ключ обов\'язково має блокувати основний Finish",
          "Двері не треба тестувати після respawn",
          "Секрет має бути опційним і не ламати основний маршрут",
          "Prompt автоматично виправляє всі баги дверей",
        ],
        correctAnswer: 2,
        explanation: "Секрет з 5.5 лишається опційним і не блокує Finish.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що є фактом, а не гіпотезою?",
        options: [
          "Тестер стояв 8 секунд перед входом у біом 2",
          "Стрілка точно занадто темна",
          "Усі новачки ненавидять цей біом",
          "Потрібно перебудувати весь рівень",
        ],
        correctAnswer: 0,
        explanation: "Виміряний час - спостережуваний факт, решта - оцінні судження.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що робити, якщо баг повторився лише один раз із трьох?",
        options: [
          "Видалити запис як вигаданий",
          "Позначити Frequency 1/3 і зберегти доказ",
          "Автоматично поставити P3",
          "Оголосити гру повністю готовою",
        ],
        correctAnswer: 1,
        explanation: "Частота фіксується як доказ, а не відкидається.",
      },
      {
        id: "q12",
        type: MC,
        question: "Який порядок triage правильний?",
        options: [
          "P3 -> P2 -> P1 -> P0",
          "Спочатку найкрасивіший фікс",
          "Усі зміни одночасно",
          "P0 -> P1 -> P2 -> P3",
        ],
        correctAnswer: 3,
        explanation: "Спочатку виправляють найкритичніші проблеми P0.",
      },
      {
        id: "q13",
        type: MC,
        question: "Куди передати спостереження про unfair gap?",
        options: [
          "У список SoundId для 5.9",
          "У Game Settings перед Public",
          "У багліст як вхідні дані difficulty curve 5.7",
          "У BadgeService",
        ],
        correctAnswer: 2,
        explanation: "Спостереження живлять difficulty curve наступного уроку 5.7.",
      },
      {
        id: "q14",
        type: MC,
        question: "Що не варто робити посеред прогону Build A?",
        options: [
          "Записувати смерті",
          "Змінювати Parts або Config і продовжувати той самий тест",
          "Фіксувати питання тестера",
          "Зберігати відеодоказ",
        ],
        correctAnswer: 1,
        explanation: "Зміни під час тесту роблять збірку неконтрольованою.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save уроку 5.6?",
        options: [
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.7 - Difficulty Curve",
          "Lesson 5.5 - Secret Door",
          "Lesson 5.6 - Playtest System",
        ],
        correctAnswer: 0,
        explanation: "Практика 5.6 завершується збереженням Lesson 5.6 - Playtest 1 Buglist.",
      },
    ],
  },
}

export const ukLesson57 = {
  lessonId: "lesson-roblox-5-7",
  moduleId: "module-05",
  order: 7,
  title: "5.7 - Difficulty curve",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Перетворити багліст 5.6 на карту точок, де крива складності ламається",
    "Крутити gap, width, hazard timing і щільність checkpoint як окремі важелі балансу",
    "Змінювати лише один важіль за ітерацію і фіксувати числа в Config",
    "Розподілити біоми за ролями teach, train і exam без повного перебудовування",
    "Провести retest Better/Same/Worse і підготувати збірку до peer run у 5.8",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 35 з 92)",
        content: `У 5.6 ти зібрав багліст з playtest #1: час, смерті, паузи й записи типу «занадто важко», «нечесно», «не зрозуміло куди». Сьогодні ти не перебудовуєш Obby з нуля. Ти вирівнюєш difficulty curve - послідовність, де складність зростає передбачувано від біому 1 до фінішу.

|Було в 5.6|Стає в 5.7|
|----------|----------|
|«Тут усі падають»|Конкретна зміна gap або timing|
|Авторські відчуття|Числа до/після в таблиці|
|Баг без дії|Одна правка + короткий retest|`,
      },
      {
        title: "Вхідні дані: багліст як карта, не як смітник",
        content: `Difficulty curve будується з фактів playtest, а не з «мені здається легко». Візьми багліст 5.6 і відфільтруй рядки, які стосуються балансу:

|Сигнал у баглісті|Що це означає для кривої|
|-----------------|------------------------|
|Три смерті на одному gap|Можливий spike або занадтий стрибок після легкого блоку|
|Пауза 8+ секунд без руху|Навігація або страх перед наступним кроком|
|«Нечесно» після hazard|Timing, ширина платформи або невидимий hitbox|
|«Занадто легко» у біомі 3|Exam-зона не відчувається фіналом|
|Checkpoint ігнорують|CP стоїть не там, де гравець реально застрягає|`,
      },
      {
        title: "Difficulty curve - це не total redesign",
        content: `Помилка початківця: після playtest знести біом 2 і зібрати «красивіше». Це новий рівень, а не curve. Curve - це дрібні керовані зрушення в межах існуючого маршруту.

Що входить у curve сьогодні:

- gap між платформами (Position / Size по X або Z);
- width проходу (Size платформи);
- hazard timing (\`waitUp\`, \`waitDown\` у Config while-платформ);
- щільність checkpoint (де ставиш наступний CP після важкого блоку).

Що не входить:

- новий четвертий біом;
- заміна всієї секції key-door;
- декор, Sound, ParticleEmitter (це 5.9);
- Game Settings і Badge (5.10).

Уяви графік складності по трьох біомах: лінія має плавно підніматись, без вертикальної стіни посеред train-зони. Якщо біом 1 легкий, біом 2 різко неможливий, а біом 3 знову легкий - це не «цікаво», це зламаний профіль.

Правило уроку: не більше 20% Parts у біомі за одну ітерацію. Якщо треба рухати більше - розбий на дві ітерації з retest між ними.

**Зроби зараз (3 хв)**: для кожного біому запиши одне речення «зараз відчувається як teach / train / exam або ні».`,
      },
      {
        title: "Чотири важелі балансу",
        content: `У Obby SmartCode є чотири основні важелі. Кожен змінює досвід по-іншому:

| Важіль | Де живе | Що змінює | Типова помилка |
| --- | --- | --- | --- |
| Gap | Відстань між платформами | Довжина стрибка | Змінити gap і width одночасно |
| Width | Size платформи по X/Z | Площа для приземлення | Зробити так вузько, що camera заважає |
| Hazard timing | \`PlatformConfig\` | Вікно безпечного кроку | waitUp = 0.1 «для хардкору» |
| CP density | Розміщення Checkpoint Parts | Ціна помилки після важкого блоку | CP кожні 2 studs — exam зникає |`,
      },
      {
        title: "Одна зміна за ітерацію",
        content: `Якщо в одній ітерації ти зменшив gap, розширив платформу і скоротив \`waitDown\`, retest нічого не доведе. Ти не знаєш, що саме допомогло.

Ритуал ітерації:

- Build 5.7-A (або B, C...) — Save перед зміною;
- змінюєш рівно один важіль у одному місці;
- записуєш Before / After у таблицю;
- self-retest: проходиш проблемний сегмент 3 рази;
- оцінка: Better / Same / Worse;
- Save з номером ітерації в Notes.

| Ітерація | Build | Місце | Важіль | Before | After | Retest |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 5.7-A | Gap_07 | gap | 8 studs | 6 studs | Better |
| 2 | 5.7-B | Moving_03 | waitUp | 2.0 | 2.5 | Same |`,
      },
      {
        title: "Config numbers: пульт без переписування коду",
        content: `While-платформи з 5.4 читають таймінги з \`PlatformConfig\` (ModuleScript або table у Script). Саме там живуть числа для hazard timing як важеля curve.

Типовий фрагмент Config:
\`\`\`
local PlatformConfig = {
Moving_01 = { waitUp = 2.0, waitDown = 1.5 },
Moving_02 = { waitUp = 1.8, waitDown = 1.2 },
}
\`\`\`

Правила роботи з Config сьогодні:

- змінюй числа у Config, не дублюй цикл у новому Script;
- коментуй рядок: \`-- 5.7 iter2: waitUp 2.0 → 2.5 Gap fix OBBY-06\`;
- не чіпай імена ключів - Script уже посилається на \`Moving_02\`;
- після зміни перезапусти Play і подивись 3 повні цикли, не один.

Gap і width зазвичай в Properties Part у Studio. Запиши їх у ту саму таблицю ітерацій, щоб Config і Parts не жили в різних нотатках.

Якщо проблема «платформа їде занадто швидко для exam», збільш \`waitUp\` на 0.3-0.5 с за раз. Стрибок на 2 с за раз робить retest безглуздим.

У 5.8 перевірять, чи exam-біом відчувається складнішим за train, але не unfair. Числа Config - твій доказ, що ти крутив timing свідомо.

**Зроби зараз (4 хв)**: відкрий Config, знайди платформу з багліста 5.6 і допиши коментар з датою поточної ітерації.`,
      },
      {
        title: "Ролі біомів: teach → train → exam",
        content: `Три біоми з 5.1 задумувались не як «три однакові зони», а як три ролі на кривій:

| Роль | Біом | Що гравець вчиться | Типова складність |
| --- | --- | --- | --- |
| Teach | 1 | Читати hazard, базовий стрибок, перший CP | Низька, прощає помилку |
| Train | 2 | Комбінувати рух, while, щільніші gap | Середня, CP частіше |
| Exam | 3 | Використати все без підказок | Вища, CP рідше |`,
      },
      {
        title: "Unfair spikes: коли складність - це баг дизайну",
        content: `Не кожна смерть означає «треба легше». Деякі означають unfair spike - місце, де гравець не мав шансу прочитати правило.

Ознаки unfair:

- hazard того самого кольору, що безпечна підлога (5.2);
- gap після blind corner без попереднього стрибка схожої довжини;
- while-платформа з вікном коротшим за час реакції людини (~0.4 с);
- смерть від hitbox ширший за видиму модель;
- обов'язковий стрибок одразу після respawn без розгону.

Ознаки чесної складності:

- тестер кожен раз падає трохи по-іншому (значить пробує, а не здається);
- після підказки «дивись на цикл» проходить за 2-3 спроби;
- смерть супроводжується розумінням «я прогавив timing», не «гра зламалась».

Unfair spike виправляй першим у curve-роботі, навіть якщо Priority у баглісті був P2. Juice у 5.9 не зробить червону лаву читабельною.

Типові фікси spike без redesign:

- змінити Material/Color hazard (не juice - базова читабельність);
- додати одну «репетиційну» платформу перед exam-gap;
- збільшити \`waitUp\` на 0.5 с;
- перенести CP перед spike, не після.

**Зроби зараз (4 хв)**: познач у Curve Map мінімум один рядок як «unfair» або «fair hard» і запиши, який важіль застосуєш.`,
      },
      {
        title: "Retest: Better, Same, Worse",
        content: `Після кожної ітерації потрібен короткий retest, не повний peer run. Peer — у 5.8.

Протокол retest:

- новий сервер на поточному Build;
- старт за 1 checkpoint до проблемного блоку (або з Spawn, якщо spike на початку біому);
- пройди проблемний сегмент 3 рази поспіль;
- зафіксуй смерті та час на сегменті;
- порівняй з даними 5.6 або попередньою ітерацією.

| Результат | Що означає | Дія |
| --- | --- | --- |
| Better | Менше смертей або швидше проходження | Залиш зміну, Save Build |
| Same | Без помітної різниці | Спробуй інший важіль або +1 stud / +0.3 с |
| Worse | Більше смертей або нова плутанина | Revert до попереднього Save |`,
      },
      {
        title: "Щільність checkpoint як важіль exam",
        content: `Checkpoint з 5.3 — не лише Progress. Це важіль curve: де гравець платить за помилку повторенням довгої ділянки.

| Зона | CP density | Навіщо |
| --- | --- | --- |
| Teach | частіше | Дешеве навчання, менше фрустрації |
| Train | середня | Закріплення без monotonous save-scumming |
| Exam | рідше | Вища ставка, але не перед першим новим патерном |`,
      },
      {
        title: "Документ ітерацій для 5.8",
        content: `Peer у 5.8 не бачив твоєї роботи над curve. Дай йому одну сторінку фактів:

| Поле | Приклад |
| --- | --- |
| Build для peer | 5.7-D |
| Зміни від 5.6 | Gap_07 8 → 6; Moving_03 waitUp 2.0 → 2.5 |
| Що лишилось open | OBBY-09 navigation — не curve |
| Очікування peer | Біом 3 exam, без підказок |
| Self-retest | 2 ітерації Better, 1 Same |`,
      },
      {
        title: "Що відкласти до 5.9 і 5.10",
        content: `Після кількох Better retest з'являється спокуса «ще трохи полірувати». Тримай фокус:

| Зараз (5.7) | Пізніше |
| --- | --- |
| Gap, width, timing, CP | Sound на hazard (5.9) |
| Читабельність hazard (колір) | ParticleEmitter burst (5.9) |
| Curve Map і changelog | Game Settings Name/Icon (5.10) |
| Save Difficulty Curve | Badge AwardBadge (5.10) |`,
      },
      {
        title: "Чекліст здачі 5.7",
        content: `Перед фінальним Save перевір:

- [ ] Curve Map містить мінімум 3 точки з багліста 5.6
- [ ] Мінімум 2 ітерації з одним важелем кожна
- [ ] Before/After числа записані (Parts або Config)
- [ ] Кожна ітерація має retest Better/Same/Worse
- [ ] Біоми відповідають teach / train / exam
- [ ] Unfair spikes адресовані або позначені open з причиною
- [ ] CP density перевірена на основному шляху
- [ ] Changelog для peer 5.8 готовий
- [ ] Juice і Ship не додані сьогодні
- [ ] Save: Lesson 5.7 - Difficulty Curve

Далі 5.8: peer run, 6-категорійний чекліст, багліст без зупинки гри, один fix pass лише blockers, окремий список juice. Потім 5.9 Sound + Particles і 5.10 Checkpoint + Ship + Badge.

**Зроби зараз (2 хв)**: простав галочки і збережи Place під Lesson 5.7 - Difficulty Curve.`,
      },
    ],
  },
  summary: "Ти перетворив багліст 5.6 на Curve Map, крутив gap, width, timing Config і щільність CP по одному важелю за ітерацію, відрізнив unfair spike від чесної складності й зафіксував retest Better/Same/Worse. Place готовий до контрольного peer run у 5.8.",
  practiceTask: {
    title: "Practice for 5.7 - Difficulty curve",
    difficulty: "beginner",
    description: `**Мета:** вирівняти криву складності Obby без перебудови біомів.

Part A — Curve Map (8 хв)
1. Відкрий Save Lesson 5.6 - Playtest 1 Buglist.
2. Перенеси мінімум 3 difficulty-рядки в Curve Map з одним важелем кожен.
3. Познач teach / train / exam для трьох біомів.

Part B — Ітерації (20 хв)
1. Build 5.7-A: одна зміна важеля на топ-проблемі.
2. Retest 3× сегмент → Better/Same/Worse.
3. Build 5.7-B: друга ітерація (інше місце або важіль).
4. Запиши Before/After у Config або Properties.

Part C — Здача (7 хв)
1. Changelog для peer 5.8.
2. Smoke test Spawn → Finish.
3. Save: Lesson 5.7 - Difficulty Curve.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головне джерело даних для difficulty curve у 5.7?",
        options: [
          "Новий четвертий біом",
          "Багліст і спостереження з playtest 5.6",
          "Game Settings Icon",
          "Badge ID з 5.10",
        ],
        correctAnswer: 1,
        explanation: "Curve будується на даних з багліста 5.6.",
      },
      {
        id: "q2",
        type: MC,
        question: "Скільки важелів міняють за одну ітерацію?",
        options: [
          "Один",
          "Усі чотири одразу",
          "Стільки, скільки знайшли баги",
          "Жодного - лише декор",
        ],
        correctAnswer: 0,
        explanation: "Одна зміна за ітерацію дозволяє чітко бачити ефект.",
      },
      {
        id: "q3",
        type: MC,
        question: "Де крутити hazard timing для while-платформ?",
        options: [
          "У Game Settings",
          "У BadgeService",
          "У PlatformConfig (waitUp/waitDown)",
          "У LocalScript GUI",
        ],
        correctAnswer: 2,
        explanation: "Таймінг платформ і далі керується через PlatformConfig.",
      },
      {
        id: "q4",
        type: MC,
        question: "Що таке unfair spike?",
        options: [
          "Будь-який важкий exam-блок",
          "Місце, де гравець не мав шансу прочитати правило",
          "Наявність трьох біомів",
          "Checkpoint перед Finish",
        ],
        correctAnswer: 1,
        explanation: "Unfair spike - складність без попереднього навчання правила.",
      },
      {
        id: "q5",
        type: MC,
        question: "Retest Same після зміни gap означає?",
        options: [
          "Відкотити Place до 5.1",
          "Автоматично Ship у 5.10",
          "Додати juice",
          "Спробувати інший важіль або малу додаткову зміну",
        ],
        correctAnswer: 3,
        explanation: "Same означає спробувати ще один важіль чи малу правку.",
      },
      {
        id: "q6",
        type: MC,
        question: "Роль біому 1 у curve?",
        options: [
          "Exam",
          "Train",
          "Teach",
          "Secret only",
        ],
        correctAnswer: 2,
        explanation: "Біом 1 і надалі відповідає за навчання (Teach).",
      },
      {
        id: "q7",
        type: MC,
        question: "Що НЕ робити в 5.7?",
        options: [
          "Записувати Before/After",
          "Повний redesign усіх біомів",
          "Retest Better/Same/Worse",
          "Готувати changelog для 5.8",
        ],
        correctAnswer: 1,
        explanation: "5.7 налаштовує важелі, а не перебудовує все з нуля.",
      },
      {
        id: "q8",
        type: MC,
        question: "CP density в exam-зоні зазвичай?",
        options: [
          "Рідша, ніж у teach",
          "Кожні 2 studs",
          "Відсутня повністю",
          "Тільки в секреті 5.5",
        ],
        correctAnswer: 0,
        explanation: "Exam-зона навмисно має рідші checkpoint, ніж teach.",
      },
      {
        id: "q9",
        type: MC,
        question: "Куди передати juice-ідеї?",
        options: [
          "Реалізувати зараз у hazard Script",
          "Окремий список для 5.9 після повного проходу 5.8",
          "У Badge Description",
          "Видалити з багліста",
        ],
        correctAnswer: 1,
        explanation: "Juice відкладається до 5.9, після повного проходу у 5.8.",
      },
      {
        id: "q10",
        type: MC,
        question: "Наступний крок після Save 5.7?",
        options: [
          "Peer full playthrough у 5.8",
          "Ship + Badge одразу",
          "Новий модуль 6 Simulator",
          "Видалити Config",
        ],
        correctAnswer: 0,
        explanation: "Далі йде контрольний повний прохід peer у 5.8.",
      },
      {
        id: "q11",
        type: MC,
        question: "Який запис ітерації найкращий?",
        options: [
          "Щось подвигав",
          "Gap_07 gap 8 -> 6 studs, Build 5.7-A, retest Better",
          "Тепер краще, точно",
          "Змінив все в біомі 2",
        ],
        correctAnswer: 1,
        explanation: "Конкретна зміна параметра й результат retest - найкращий запис.",
      },
      {
        id: "q12",
        type: MC,
        question: "Width платформи впливає на?",
        options: [
          "Площу приземлення без зміни gap",
          "Badge видачу",
          "Team Create",
          "DataStore ключ",
        ],
        correctAnswer: 0,
        explanation: "Ширина платформи міняє площу приземлення, не саму дистанцію gap.",
      },
      {
        id: "q13",
        type: MC,
        question: "Worse після ітерації - що робити?",
        options: [
          "Залишити і додати Sound",
          "Revert до попереднього Save і інший важіль",
          "Опублікувати Public",
          "Ігнорувати retest",
        ],
        correctAnswer: 1,
        explanation: "Погіршення відкочують і пробують інший важіль.",
      },
      {
        id: "q14",
        type: MC,
        question: "Зв\'язок 5.6 і 5.7?",
        options: [
          "5.7 замінює багліст",
          "5.6 дає вхідні точки для curve",
          "5.6 видаляє checkpoints",
          "Немає зв\'язку",
        ],
        correctAnswer: 1,
        explanation: "Спостереження з 5.6 напряму живлять curve у 5.7.",
      },
      {
        id: "q15",
        type: MC,
        question: "Точна назва Save уроку 5.7?",
        options: [
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.8 - Full Playthrough",
          "Lesson 5.7 - Difficulty Curve",
          "Lesson 5.9 - Juice Pass",
        ],
        correctAnswer: 2,
        explanation: "Практика 5.7 завершується збереженням Lesson 5.7 - Difficulty Curve.",
      },
    ],
  },
}

export const ukLesson58 = {
  lessonId: "lesson-roblox-5-8",
  moduleId: "module-05",
  order: 8,
  title: "5.8 - Повний прохід: peer review",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Провести контрольний повний прохід Obby, щоб знайти баги перед juice у 5.9 і фінальним checkpoint у 5.10",
    "Розподілити ролі гравець і спостерігач без підказок під час run",
    "Оцінити Place за 6-категорійним чеклістом під час одного прогону",
    "Продовжити багліст 5.6, записуючи баги без зупинки Play",
    "Підтвердити curve 5.7, зробити один fix pass лише blockers і зберегти Full Playthrough",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 36 з 92)",
        content: `У 5.6 ти зібрав перший багліст. У 5.7 вирівняв difficulty curve важелями gap, width, timing і CP density. Сьогодні - повний прохід Obby іншою людиною (peer), який шукає баги й перевіряє, чи рівень готовий до polish у 5.9 і до фінального checkpoint у 5.10.

Це не ще один «авторський пробіг». Peer не знає, де ключ, який \`waitUp\` ти крутив і де unfair spike був учора. Якщо він проходить без blockers - curve і Progress тримаються на чужих очах.

|Було в 5.7|Стає в 5.8|
|----------|----------|
|Self-retest curve|Peer run на Build після curve|
|Changelog ітерацій|Чекліст + оновлений багліст|
|Очікування «краще»|Підтверджений список багів|`,
      },
      {
        title: "Навіщо повний прохід перед juice і Ship",
        content: `Повний прохід відповідає на одне просте питання: «чи проходить Obby незнайома людина від Spawn до Finish без застрягань?». Не «чи красиво», не «чи є Badge» - лише чесна прохідність. Остаточне рішення «показувати чи ні» ухвалить checkpoint у 5.10 - сьогодні ти лише збираєш для нього чесні факти.

|Прохід чистий|Прохід із блокерами|
|-------------|-------------------|
|Peer дійшов до Finish без P0|Softlock, зламаний respawn, blocked main path|
|Exam відчувається складнішим за teach|Unfair spike лишився після 5.7|
|Секрет опційний (5.5)|Без ключа неможливо фініш|
|Output без червоних помилок на run|Script падає mid-run|`,
      },
      {
        title: "Ролі: гравець (peer) і спостерігач (ти)",
        content: `Схема та сама, що в 5.6, але мета інша: не перший збір багів, а контрольний прохід після curve з 5.7.

Peer (гравець):

- стартує з Spawn на Build 5.8-A;
- проходить до Finish без телепортів і підказок;
- коментує вголос очікування на незнайомих ділянках;
- не зобов'язаний знаходити секрет - main path обов'язковий.

Ти (спостерігач):

- записуєш час, смерті, паузи 5+ секунд;
- заповнюєш чекліст (наступна секція);
- не підказуєш маршрут, timing чи ключ;
- після сегмента ставиш уточнення, не під час стрибка.

Якщо peer застряг - фіксуєш це як дані. Якщо просить «куди?» - «Запишу як navigation; продовжуй пробувати» - не «направо там».

Self-test (якщо немає peer): новий сервер, без Explorer, запис екрана, коментарі вголос. Слабше за peer, але краще за авторський пробіг напам'ять. Познач у баглісті Tester: self-test.

Після run одразу не фіксиш у Play Mode. Завершити нотатки, потім Build 5.8-B для blockers.

**Зроби зараз (3 хв)**: передай peer інструкцію: «Full run, говори очікування, я мовчу про маршрут».`,
      },
      {
        title: "6-категорійний чекліст повного проходу",
        content: `Під час одного прогону заповнюй чекліст. Шкала: так / майже / ні + коротка нотатка.

|#|Категорія|Що перевіряєш|
|-|---------|-------------|
|1|Gameplay|gap, hazards, while, collision - чи чесно|
|2|Progress|CP, respawn, Finish, timer (5.3)|
|3|Navigation|напрямок, видимість цілі, біоми|
|4|Secret|ключ-двері опційні (5.5)|
|5|Curve|teach → train → exam, без unfair spike (5.7)|
|6|Stability|Output чистий, немає softlock|`,
      },
      {
        title: "Сценарій повного проходу (без скорочень)",
        content: `Peer проходить весь маршрут - той самий каркас, що в 5.6:

|Крок|Перевірка|
|----|---------|
|1. Spawn|Напрямок у teach-біом|
|2. Біом 1 hazards|Читабельність до смерті|
|3. CP + respawn|Збереження прогресу|
|4. While-платформи|Config timing з 5.7|
|5. Біом 2 train|Смерті vs curve changelog|
|6. Key-door (опційно)|Main path без ключа|
|7. Біом 3 exam|Найважчий блок перед Finish|
|8. Finish|Timer зупинка, досяжність|`,
      },
      {
        title: "Баг-нотатки без зупинки гри",
        content: `Під час peer run не зупиняй Play, щоб правити Parts. Як якщо глядач уже сидить у залі - виступ не ставлять на паузу для ремонту сцени.

Правила запису:

- короткі shorthand в блокноті або другому моніторі;
- часова мітка: \`04:12 CP_03 respawn fail\`;
- після run розгорни в повні рядки багліста;
- якщо P0 блокує peer - дозволь завершити до найближчого відтворюваного моменту або зафіксуй stop з steps.

|Під час run|Після run|
|-----------|---------|
|«3 deaths Gap_09»|OBBY-14: Expected land, Actual fall, Steps...|
|«Output red line 6:01»|OBBY-15: Category Stability, P0|
|«? direction biome2»|OBBY-16: Navigation, P2|`,
      },
      {
        title: "Продовження багліста 5.6",
        content: `Багліст - живий документ через 5.6 → 5.7 → 5.8 → 5.9 → 5.10. Не створюй нову таблицю з нуля.

Колонки (як у 5.6):
|ID|Place|Expected|Actual|Steps|Category|Priority|Status|Build|Evidence|
|--|-----|--------|------|-----|--------|--------|------|-----|--------|
|  |     |        |      |     |        |        |      |     |        |`,
      },
      {
        title: "Перевірка difficulty curve 5.7",
        content: `Повний прохід - тест твоєї роботи в 5.7. Питання не «чи легко», а «чи curve передбачувана для незнайомого гравця».

Метрики порівняння:

|Метрика|5.6 playtest|5.8 peer|Очікування|
|-------|------------|--------|----------|
|Смерті біом 2|напр. 8|?|≤ або fairer|
|Пауза max|напр. 12с|?|без blind stop|
|Exam смерті|?|?|≥ teach, без unfair|
|Quit mid-run|ні/так|ні|ні|`,
      },
      {
        title: "Один fix pass: лише blockers",
        content: `Після peer run - один цикл виправлення. Не другий curve sweep, не juice, не новий біом.

Fix pass protocol:

- Відсортуй багліст P0 → P1.
- Обери найвищий blocker один (як triage 5.6).
- Build 5.8-B - Save перед зміною.
- Мінімальний фікс однієї причини.
- Regression: steps бага + сусідній CP/hazard.
- Короткий self-run Spawn → Finish - лише підтвердити blocker знятий.

|Fix pass|Не fix pass|
|--------|-----------|
|Respawn на CP|Переставити exam-gap «бо красиво»|
|Script error на Finish|Sound на lava|
|Door блокує main|Particle на GUI|
|Debounce hazard|Новий секрет|`,
      },
      {
        title: "Список juice-ідей (окремо від фіксів)",
        content: `Під час run peer (і ти) побачите моменти «тут не вистачає відгуку». Не реалізуй їх сьогодні - 5.9 саме для Sound і ParticleEmitter.

Окремий файл або секція Notes: Juice backlog (post-5.8)

|Подія|Ідея juice|Пріоритет polish|
|Hazard kill|короткий sizzle + дим|високий|
|Checkpoint touch|ding + іскри|високий|
|Finish|confetti burst|середній|
|Key pickup|click + flash|низький|`,
      },
      {
        title: "Playtest #1 (5.6) vs повний прохід (5.8)",
        content: `Два run - різні jobs:

|5.6 Playtest #1|5.8 Full Playthrough|
|Мета|Зібрати баги|Підтвердити прохідність і curve|
|Build|5.6-A|5.8-A після 5.7|
|Хто|Перший незнайомий тест|Peer після curve|
|Фікси|Один P0/P1 + retest|Один blocker fix pass|
|Артефакт|Buglist|Buglist + чекліст + juice backlog|
|Далі|5.7 curve|5.9 juice|`,
      },
      {
        title: "Чекліст повного проходу",
        content: `Перед Save Lesson 5.8 - Full Playthrough:

- [ ] Build 5.8-A заморожений до peer run
- [ ] Peer (або self-test) пройшов Spawn → Finish
- [ ] Чекліст 6 категорій заповнений
- [ ] Багліст 5.6 продовжений новими ID
- [ ] Запис без зупинки Play під час run
- [ ] Метрики curve порівняно з 5.6 / changelog 5.7
- [ ] Один fix pass на P0/P1 (якщо були) на Build 5.8-B
- [ ] Regression retest blocker пройдено
- [ ] Juice backlog окремо, Sound не додано
- [ ] Output чистий на короткому self-run після fix
- [ ] Save: Lesson 5.8 - Full Playthrough

Чисто пройдено → 5.9 Juice. Лишковий P0 → Reopen, другий fix не в 5.9.

Фінальний checkpoint і Ship у 5.10 вимагатимуть те, що ти підтвердив сьогодні: прохідність, curve, стабільність - плюс juice після 5.9.

**Зроби зараз (5 хв)**: простав галочки і зроби фінальний self-run 3 хвилини.`,
      },
    ],
  },
  summary: "Ти провів контрольний peer run повного проходу, заповнив 6-категорійний чекліст, продовжив багліст 5.6 без зупинки гри, перевірив curve 5.7 за метриками, зробив один blocker fix pass і виніс juice-ідеї в окремий backlog. Place готовий до Sound і Particles у 5.9.",
  practiceTask: {
    title: "Practice for 5.8 - Повний прохід: peer review",
    difficulty: "beginner",
    description: `**Мета:** повний прохід peer run після 5.7 з чеклістом, баглістом і blocker fix.

Part A — Підготовка (5 хв)
1. Save Build 5.8-A з Lesson 5.7 - Difficulty Curve.
2. Таблиця чекліста 6 категорій + shorthand notes.
3. Інструкція peer без підказок.

Part B — Peer run (15 хв)
1. Spawn → Finish, запис часу/смертей/пауз.
2. Чекліст так/майже/ні під час run.
3. Shorthand багів без зупинки Play.

Part C — Завершення проходу (15 хв)
1. Розгорни shorthand у багліст 5.6 (нові ID).
2. Порівняй метрики curve з 5.6/5.7.
3. Один P0/P1 fix на Build 5.8-B + regression.
4. Juice backlog (≥3 ідеї, без Scripts).
5. Save: Lesson 5.8 - Full Playthrough.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.8?",
        options: [
          "Повний прохід peer run перед juice і фінальним checkpoint",
          "Додати Badge і Game Settings",
          "Перебудувати всі три біоми",
          "Видалити багліст 5.6",
        ],
        correctAnswer: 0,
        explanation: "5.8 - контрольний peer run перед juice у 5.9 і фінальним checkpoint у 5.10.",
      },
      {
        id: "q2",
        type: MC,
        question: "Що робить спостерігач під час peer run?",
        options: [
          "Підказує timing while-платформ",
          "Рухає Parts у Play Mode",
          "Видає Badge на половині маршруту",
          "Записує чекліст і баги без підказок маршруту",
        ],
        correctAnswer: 3,
        explanation: "Тестер фіксує чекліст і баги, не втручаючись у прохід.",
      },
      {
        id: "q3",
        type: MC,
        question: "Скільки категорій у чеклісті повного проходу 5.8?",
        options: [
          "3",
          "6",
          "15",
          "92",
        ],
        correctAnswer: 1,
        explanation: "Чекліст 5.8 складається з 6 категорій.",
      },
      {
        id: "q4",
        type: MC,
        question: "Типовий блокер повного проходу?",
        options: [
          "Немає Sound на hazard",
          "P3 зміщений текст GUI",
          "P0 softlock на main path",
          "Peer не знайшов секрет",
        ],
        correctAnswer: 2,
        explanation: "Softlock на основному шляху - критичний P0-блокер.",
      },
      {
        id: "q5",
        type: MC,
        question: "Під час peer run баги записують?",
        options: [
          "Shorthand без зупинки, повні рядки після",
          "Після зупинки Play і правки Parts",
          "Не записують - лише чекліст",
          "Тільки в Output",
        ],
        correctAnswer: 0,
        explanation: "Коротко фіксують на льоту, деталізують після прогону.",
      },
      {
        id: "q6",
        type: MC,
        question: "Fix pass у 5.8 обмежений?",
        options: [
          "Необмежено всіма P2",
          "Лише P0/P1 blockers, один цикл",
          "Тільки косметикою",
          "Повним redesign exam",
        ],
        correctAnswer: 1,
        explanation: "Fix pass охоплює лише блокери P0/P1 за один цикл.",
      },
      {
        id: "q7",
        type: MC,
        question: "Juice-ідеї в 5.8?",
        options: [
          "Реалізують у hazard Script",
          "Замінюють багліст",
          "Окремий backlog без Sound сьогодні",
          "Видаляють curve 5.7",
        ],
        correctAnswer: 2,
        explanation: "Juice відкладається окремим списком до 5.9.",
      },
      {
        id: "q8",
        type: MC,
        question: "Багліст 5.8 і 5.6?",
        options: [
          "Новий файл без історії",
          "5.6 видаляють",
          "Тільки для juice",
          "Продовження з новими ID і Build",
        ],
        correctAnswer: 3,
        explanation: "Багліст 5.8 продовжує той самий документ з 5.6.",
      },
      {
        id: "q9",
        type: MC,
        question: "Категорія Curve у чекліст перевіряє?",
        options: [
          "Teach -> train -> exam після змін 5.7",
          "Badge ID",
          "Icon 512x512",
          "Team Create",
        ],
        correctAnswer: 0,
        explanation: "Curve-категорія перевіряє прогресію teach -> train -> exam.",
      },
      {
        id: "q10",
        type: MC,
        question: "Після чистого повного проходу логічний наступний урок?",
        options: [
          "5.9 Juice: Sound + Particles",
          "5.1 Three Biomes з нуля",
          "6.10 Ship Sim",
          "Пропустити до 5.10 без juice",
        ],
        correctAnswer: 0,
        explanation: "Після чистого повного проходу йде 5.9 - Juice: Sound + Particles.",
      },
      {
        id: "q11",
        type: MC,
        question: "Чим 5.8 відрізняється від 5.6?",
        options: [
          "5.8 не потребує peer",
          "5.6 після Ship",
          "5.8 - контрольний прохід після curve, не перший збір багів",
          "5.8 без чекліст",
        ],
        correctAnswer: 2,
        explanation: "5.8 - контрольний прохід після difficulty curve, а не первинний баг-збір.",
      },
      {
        id: "q12",
        type: MC,
        question: "Self-test якщо немає peer?",
        options: [
          "Заборонено",
          "Замінює Save",
          "Не потребує чекліст",
          "Допустимо з позначкою Tester: self-test",
        ],
        correctAnswer: 3,
        explanation: "За відсутності peer допустимий self-test з позначкою.",
      },
      {
        id: "q13",
        type: MC,
        question: "Regression після blocker fix?",
        options: [
          "Steps бага + сусідній сценарій Progress",
          "Не потрібен",
          "Лише Edit Mode колір",
          "Publish Public",
        ],
        correctAnswer: 0,
        explanation: "Регресію перевіряють за steps бага і суміжним сценарієм прогресу.",
      },
      {
        id: "q14",
        type: MC,
        question: "Stability у чекліст - це?",
        options: [
          "Наявність ParticleEmitter",
          "Кількість біомів",
          "Output без помилок, немає softlock",
          "Опис у Game Settings",
        ],
        correctAnswer: 2,
        explanation: "Stability - чистий Output і відсутність softlock.",
      },
      {
        id: "q15",
        type: MC,
        question: "Точна назва Save уроку 5.8?",
        options: [
          "Lesson 5.7 - Difficulty Curve",
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.9 - Juice Pass",
          "Lesson 5.8 - Full Playthrough",
        ],
        correctAnswer: 3,
        explanation: "Практика 5.8 завершується збереженням Lesson 5.8 - Full Playthrough.",
      },
    ],
  },
}

export const ukLesson59 = {
  lessonId: "lesson-roblox-5-9",
  moduleId: "module-05",
  order: 9,
  title: "5.9 - Juice: Sound + Particles",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Пояснити, як juice підсилює готову механіку, але не виправляє її правила",
    "Підключити Sound до серверних хуків hazard і checkpoint без другого Touched",
    "Налаштувати короткий ParticleEmitter burst через Emit() замість постійного Enabled",
    "Обрати Part або SoundService за просторовою роллю звуку та уникнути спаму",
    "Провести повний juice-playtest після 5.8 і підготувати Place до фінального checkpoint і Ship у 5.10",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 37 з 92)",
        content: `Урок 5.8 довів, що твій obby проходиться від старту до фінішу без зависань. Але «проходиться» і «відчувається приємно» - це різні речі. Сьогодні ти додаєш звук і частинки, які перетворюють суху механіку смерті й чекпоінта на живий відгук гравцю.

Це урок 37 з 92 у курсі SmartCode і дев'ятий урок модуля 05 - Obby. Ти вже пройшов дизайн біомів, hazards з debounce, чекпоінти з GUI, платформи, секрети, playtest, difficulty curve і повний прохід із пошуком багів. Juice - це останній шар полірування перед фінальним checkpoint і Ship у 5.10, де ти здаєш готовий продукт з badge.

Хід уроку:

- Теорія (35 хв) - що таке juice, Sound, ParticleEmitter, сервер проти локального сигналу
- Практика (~35 хв) - звук і частинки на смерть та на чекпоінт, плейтест
- Вікторина (15 хв) - проходження 70%

Відкрий своє місце з Уроку 5.8 - Повний прохід: peer review. Ти нічого не переробляєш у логіці hazard чи checkpoint - лише додаєш реакцію. Якщо hazard або checkpoint ще «мовчить» після падіння чи дотику - цей урок саме для цього.

**Зроби зараз (2 хв)**: відкрий Save з 5.8, пройди один hazard і один checkpoint та запиши, де бракує відгуку.`,
      },
      {
        title: "Що таке «juice» - чому дрібниці важать найбільше",
        content: `Juice (з англ. «сік», у геймдеву - «соковитість») - це сума маленьких сигналів зворотного зв'язку, які підказують гравцю: «твоя дія щось змінила у грі». Стрибок без звуку - це просто зміна координати. Стрибок зі звуком приземлення і хмаркою пилу - це подія, яку мозок гравця помічає і запам'ятовує.

Juice складається з трьох каналів, які ми сьогодні торкаємось двома:

- Звук - найшвидший сигнал, мозок реагує за частки секунди
- Частинки - короткий візуальний спалах, підтверджує місце події
- Рух/анімація - Tween або спалах Part (ти вже бачив flash у попередніх модулях)

У obby є рівно два моменти, де гравець найбільше потребує відгуку:

- Смерть - гравець мусить одразу зрозуміти «я торкнувся hazard, це моя помилка», а не гадати, чому персонаж зник
- Чекпоінт - гравець мусить відчути маленьку нагороду за прогрес, інакше проходження рівня відчувається як монотонна робота

|Без juice|З juice|
|---------|-------|
|Падіння в лаву - тихо, character просто зникає|Короткий «шип» + хмарка диму на hazard|
|Чекпоінт зберігається, але гравець не помітив|Дзвін + іскри - «так, прогрес зараховано»|`,
      },
      {
        title: "Нагадування - хуки смерті та чекпоінта з 5.2 і 5.3",
        content: `Щоб не дублювати логіку, сьогодні ти вбудовуєш звук і частинки прямо у вже готові функції.

З Уроку 5.2 (Hazards + debounce) - твій hazard-script на сервері приблизно такий:
\`\`\`
local hazard = script.Parent
hazard.Touched:Connect(function(hit)
local character = hit.Parent
local humanoid = character and character:FindFirstChildOfClass(\"Humanoid\")
if not humanoid then return end
humanoid.Health = 0
end)
\`\`\`

З Уроку 5.3 (Чекпоінти + таймер + GUI) - твій checkpoint-script підключений так:
\`\`\`
checkpointPart.Touched:Connect(function(hit)
local character = hit.Parent
local player = Players:GetPlayerFromCharacter(character)
if not player then return end
-- тут ти вже зберігаєш checkpoint для player
end)
\`\`\`

Сьогодні ти додаєш по одному рядку виклику звуку і по одному виклику частинок саме в ці два місця - жодного нового Touched-з'єднання.

Чому не окремий Script «тільки для звуку»: другий Touched на тому самому Part може спрацювати в інший кадр, ніж основний hazard - гравець помре без звуку або почує звук без смерті. Один обробник = одна атомарна подія: дотик → juice → логіка.

Debounce з 5.2 для hazard: якщо твій hazard уже має cooldown на пошкодження, juice має спрацьовувати всередині того самого блоку, коли реально відбувається kill - не раніше і не після debounce-повернення.

**Зроби зараз (4 хв)**: знайди чинні Touched-обробники hazard і checkpoint. Познач рядки, після яких подія вже підтверджена debounce.`,
      },
      {
        title: "Sound - базові Properties, які тобі знадобляться",
        content: `Sound - Instance, який відтворює аудіо. Найважливіші Properties для сьогоднішнього уроку:

|Property|Що робить|
|--------|---------|
|\`SoundId\`|посилання на аудіо, формат \`rbxassetid://ID\`|
|\`Volume\`|громкість від 0 до 1 (іноді трохи вище, але для UI/hazard тримай 0.4-0.7)|
|\`Looped\`|чи звук повторюється - для смерті й чекпоінта завжди false|
|\`PlaybackSpeed\`|швидкість/тон відтворення, 1 = звичайна|
|\`RollOffMode\` та \`RollOffMaxDistance\`|як звук затихає з відстанню, якщо Sound лежить у Part|`,
      },
      {
        title: "SoundService проти Parent Part - де живе твій звук",
        content: `Куди саме поставити Sound Properties Parent вирішує, як гравець його почує.

|Варіант|Поведінка|Коли використовувати|
|-------|---------|--------------------|
|Parent = Part на місці події (hazard, checkpoint)|3D-звук, затихає з відстанню, чути напрямок|Локальні події на карті - ідеально для смерті й чекпоінта|
|Parent = SoundService|2D-звук, однакова громкість для всіх незалежно від позиції|Глобальні сигнали типу «гра почалась», музика меню|`,
      },
      {
        title: "Звук на смерть - підключення до хука Hazard/Kill",
        content: `Додаєш звук усередину обробника з 5.2, одразу перед або після \`humanoid.Health = 0\`:
\`\`\`
local hazard = script.Parent
local deathSound = hazard:WaitForChild(\"DeathSound\")
\`\`\`

\`\`
\`\`\`
hazard.Touched:Connect(function(hit)
local character = hit.Parent
local humanoid = character and character:FindFirstChildOfClass(\"Humanoid\")
if not humanoid then return end
deathSound:Play()
humanoid.Health = 0
end)
\`\`\`

Чому Sound - дитина hazard, а не character: персонаж за мить видаляється/відроджується, і Sound, що є його дитиною, обірветься на середині. Hazard Part залишається на місці - звук дограє повністю.

Сервер чи клієнт: цей Touched вже виконується на сервері (Script, не LocalScript) з 5.2 - Play() на сервері репліковується всім гравцям поруч, тож усі почують падіння у hazard, не тільки жертва.

Якщо звук не чутно: перевір, що \`SoundId\` валідний (в Edit Mode натисни Play на Sound у Properties), \`Volume\` не 0, і Part hazard не CanCollide false з Sound всередині порожнього блоку без RollOff. Додай \`print(\"death juice\")\` поруч із Play() - якщо print є, а звуку немає, проблема в SoundId або Volume, не в Touched.

**Зроби зараз (5 хв)**: додай DeathSound:Play() у той самий захищений блок, де Humanoid реально отримує смерть, і перевір один дотик.`,
      },
      {
        title: "Звук на чекпоінт - підключення до хука з 5.3",
        content: `Той самий підхід у checkpoint-script:
\`\`\`
local checkpointPart = script.Parent
local chimeSound = checkpointPart:WaitForChild(\"ChimeSound\")
\`\`\`

\`\`
\`\`\`
checkpointPart.Touched:Connect(function(hit)
local character = hit.Parent
local player = Players:GetPlayerFromCharacter(character)
if not player then return end
chimeSound:Play()
-- далі твоя логіка збереження checkpoint з 5.3
end)
\`\`\`

Обов'язково перевір debounce з 5.3: якщо гравець стоїть на чекпоінті кілька кадрів підряд, Touched може спрацювати кілька разів - без debounce звук «чіркне» і накладеться сам на себе. Використай ту саму debounce-таблицю чи прапор, що вже захищає збереження checkpoint, а не пиши окрему для звуку.

Різні чекпоінти - один шаблон: не копіюй різні SoundId на кожен checkpoint, якщо не плануєш різний «характер» біомів. Один \`ChimeSound\` + \`Sparkles\` у шаблоні Part, який ти дублюєш по рівню - менше роботи і однаковий відгук скрізь. Виняток: фінальний checkpoint перед Ship може мати трохи голосніший Volume (0.75) як нагорода.

**Зроби зараз (5 хв)**: додай ChimeSound:Play() після підтвердження нового checkpoint і постій на Part секунду - звук має прозвучати один раз.`,
      },
      {
        title: "ParticleEmitter - базові Properties",
        content: `ParticleEmitter - Instance, що народжує дрібні частинки з BasePart. Ключові Properties:

|Property|Що робити|
|--------|---------|
|\`Rate\`|частинок за секунду, поки Enabled = true (для нашого juice тримай 0, керуємо через Emit)|
|\`Lifetime\`|NumberRange - скільки живе кожна частинка, напр. \`NumberRange.new(0.4, 0.8)\`|
|\`Speed\`|NumberRange початкової швидкості вильоту|
|\`Color\`|ColorSequence - колір частинок, можна градієнт|
|\`Texture\`|вигляд частинки, за замовчуванням підходить кругла крапка з Toolbox|
|\`Enabled\`|вмикає безперервний потік - не використовуй для одноразового ефекту|`,
      },
      {
        title: "Частинки на чекпоінт і на смерть - Emit() замість Enabled",
        content: `Emit(кількість) - метод, що випускає одноразовий «вибух» частинок і одразу зупиняється - саме те, що потрібно для миттєвої події.

У checkpoint-script:
\`\`\`
local sparkles = checkpointPart:WaitForChild(\"Sparkles\")
chimeSound:Play()
sparkles:Emit(25)
\`\`\`

У hazard-script:
\`\`\`
local puff = hazard:WaitForChild(\"DeathPuff\")
deathSound:Play()
puff:Emit(15)
humanoid.Health = 0
\`\`\`

Чому не Enabled = true: якщо залишити Enabled увімкненим, частинки летітимуть з hazard постійно, навіть коли ніхто не помирає - це і візуальний шум, і зайве навантаження на клієнт кожного гравця в кімнаті. Одна команда \`Emit()\` дає чіткий спалах рівно в момент події та нуль витрат між подіями.

Порядок викликів: спочатку \`Play()\`, одразу \`Emit()\`, потім \`humanoid.Health = 0\` для hazard - так гравець бачить і чує juice до зникнення character. Якщо поставиш kill перед Emit, частинки все одно з'являться, але відчуття «удар → реакція → смерть» буде слабшим.

**Зроби зараз (4 хв)**: підключи Emit(15) для hazard та Emit(25) для checkpoint. Поза подією жодних частинок бути не повинно.`,
      },
      {
        title: "Сервер чи локальний сигнал - де програвати ефект",
        content: `Сервер (Script, як у прикладах вище): Play() і Emit(), викликані на сервері, репліковані всім клієнтам поруч - усі гравці бачать і чують подію. Це правильний вибір для чекпоінта і смерті в obby, бо це спільні події на карті.

Локальний сигнал (LocalScript): можна додати окремий, тихіший ефект лише для гравця, який помер чи дійшов до чекпоінта - наприклад, спалах кольору на екрані через ScreenGui. Такий LocalScript слухає ту саму подію (напр. RemoteEvent або зміну Attribute), яку сервер вже надсилає.

Обережно з дублюванням: якщо і сервер, і LocalScript одночасно відтворюють той самий Sound для того самого гравця, гравець почує його двічі накладеним - голосніше і з фазовим спотворенням. Правило: базовий звук/частинки - завжди на сервері один раз; локальний скрипт додає лише інший, додатковий шар (екранний ефект), а не копію того самого Sound.

Коли локальний шар має сенс: якщо ти хочеш, щоб лише гравець, що помер, побачив легкий червоний vignette на екрані - це LocalScript у StarterGui, який слухає зміну Health або RemoteEvent від сервера. Сервер як і раніше грає 3D-звук на hazard для всіх; локально - тільки UI. Два різні канали, не два однакові Play().

**Зроби зараз (3 хв)**: перевір Explorer: базовий 3D Sound запускає лише серверний Script. Не дублюй цей самий Play() у LocalScript.`,
      },
      {
        title: "Не спамити - debounce, повторне використання, гучність",
        content: `Проблема 1 - Instance.new() на кожен дотик. Створювати новий Sound чи ParticleEmitter щоразу через \`Instance.new()\` і одразу видаляти - витратно і повільно. Правильний шаблон: один Sound і один ParticleEmitter стоять у Part заздалегідь (вставлені в Studio), а код лише викликає \`:Play()\` і \`:Emit()\` знову і знову.

Проблема 2 - відсутність debounce на чекпоінті. Уже згадано вище - без debounce з 5.3 звук може «затріщати» кількома викликами Play() за одну секунду.

Проблема 3 - завелика Volume. \`Volume = 1\` для короткого «дзвіночка» чекпоінта звучить різко і втомлює за 10-й раз. Тримай Volume у діапазоні 0.4-0.7 для частих подій; голосніші значення залиш для рідких, важливих моментів (перемога, бос).

Проблема 4 - різні гучності на різних hazard. Якщо один hazard грає на Volume 0.9, а інший на 0.3, рівень відчувається «зламаним». Пройди всі hazard одним проходом і вирівняй Volume в межах 0.1 - однаковий характер смерті по всьому obby.

Правило одного правила: якщо подія трапляється часто (а чекпоінти й смерті в obby трапляються дуже часто), ефект має бути коротким і тихим, інакше гравець вимкне звук у грі взагалі.

**Зроби зараз (4 хв)**: торкнись checkpoint кілька разів і помри двічі підряд. Послухай, чи SFX не тріщить і не накладається.`,
      },
      {
        title: "Таблиця плейтесту Juice і підготовка до Ship 5.10",
        content: `Проведи повний прохід рівня з Уроку 5.8, і на кожній події запиши відчуття:

| Подія | Що перевірити | Норма |
| --- | --- | --- |
| Смерть у hazard №1 | звук + частинки одразу, без затримки | <0.1с після Touched |
| Смерть у hazard №2 (інший тип) | той самий шаблон Sound/Emit | однаковий по силі відгук |
| Кожен чекпоінт | «дзвіночок» + іскри один раз, без повтору | рівно 1 Play() на 1 checkpoint |
| Повторна смерть у тому самому hazard | звук не «залипає», не накладається | чисто після кожного respawn |
| Гучність за 10 проходжень підряд | не втомлює вухо | Volume 0.4-0.7 тримається комфортно |`,
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

**Зроби зараз (2 хв)**: звір чекліст, збережи Place як Lesson 5.9 - Juice Pass і підготуй його до Ship + Badge у 5.10.`,
      },
    ],
  },
  summary: "Ти додав Sound і ParticleEmitter до вже готових хуків смерті та чекпоінта з 5.2 і 5.3, навчився вибирати між SoundService і Parent Part, керувати частинками через Emit() замість Enabled, уникати спаму й перевантаженої гучності - тепер твій obby після 5.8 не просто проходиться, а відчувається живим і готовим до фінальної здачі в 5.10.",
  practiceTask: {
    title: "Practice for 5.9 - Juice: Sound + Particles",
    difficulty: "beginner",
    description: `**Мета:** кожен hazard і кожен checkpoint рівня з 5.8 має звук і короткий спалах частинок.

Part A — Підготовка Instance (10 хв)
1. У кожен hazard Part встав \`DeathSound\` (Sound) і \`DeathPuff\` (ParticleEmitter), Rate = 0.
2. У кожен checkpoint Part встав \`ChimeSound\` (Sound) і \`Sparkles\` (ParticleEmitter), Rate = 0.
3. Volume обом Sound встав у діапазоні 0.4-0.7.

Part B — Підключення до хуків (15 хв)
1. У hazard-script з 5.2 додай \`deathSound:Play()\` і \`puff:Emit(15)\` перед \`humanoid.Health = 0\`.
2. У checkpoint-script з 5.3 додай \`chimeSound:Play()\` і \`sparkles:Emit(25)\` всередині вже готового debounce-блоку.
3. Перевір, що жоден hazard чи checkpoint не забутий — пройди рівень і послухай кожен.

Part C — Плейтест і збереження (10 хв)
1. Заповни таблицю плейтесту Juice для кожної події.
2. Виправ будь-який Sound/Emit, що спрацьовує двічі або занадто голосно.
3. Збережи в Roblox → \`Lesson 5.9 - Juice Pass\`.

> Практика завершена.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Що означає juice у контексті цього уроку?",
        options: [
          "Нова система руху персонажа",
          "Заміна debounce в hazard",
          "Шар короткого відгуку над уже робочою механікою",
          "Фонова музика на весь рівень",
        ],
        correctAnswer: 2,
        explanation: "Juice - це короткий відгук поверх уже готової механіки.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де підключати DeathSound для hazard?",
        options: [
          "У тому самому серверному Touched-хуку після перевірок і debounce",
          "В окремому LocalScript без зв\'язку зі смертю",
          "У новому Touched лише для звуку",
          "У ScreenGui замість hazard Part",
        ],
        correctAnswer: 0,
        explanation: "Звук додається всередину вже існуючого хука смерті.",
      },
      {
        id: "q3",
        type: MC,
        question: "Чому DeathSound краще тримати в hazard Part, а не в Character?",
        options: [
          "Character не може містити Sound",
          "Part автоматично робить звук глобальним",
          "Sound у Character завжди Looped",
          "Character зникає під час respawn і може обірвати звук",
        ],
        correctAnswer: 3,
        explanation: "Character видаляється при смерті, тож звук у Part надійніший.",
      },
      {
        id: "q4",
        type: MC,
        question: "Коли SoundService доречніший за Parent = Part?",
        options: [
          "Для локального sizzle конкретної лави",
          "Для глобального UI-сигналу або музики лобі",
          "Для chime конкретного checkpoint",
          "Для звуку, напрямок якого має знайти гравець",
        ],
        correctAnswer: 1,
        explanation: "SoundService підходить для глобальних, не просторових звуків.",
      },
      {
        id: "q5",
        type: MC,
        question: "Яке налаштування підходить для короткого checkpoint SFX?",
        options: [
          "Looped true і Volume 1.5",
          "Looped false і Volume приблизно 0.4-0.7",
          "PlaybackSpeed 0 і без SoundId",
          "Sound у Character з великим RollOff",
        ],
        correctAnswer: 1,
        explanation: "Короткий SFX - без Looped і з помірною гучністю.",
      },
      {
        id: "q6",
        type: MC,
        question: "Як зробити одноразовий burst ParticleEmitter?",
        options: [
          "Enabled true на весь playtest",
          "Rate 100 на кожному hazard",
          "Створювати новий emitter щокадру",
          "Rate 0 і виклик Emit(n) у момент підтвердженої події",
        ],
        correctAnswer: 3,
        explanation: "Burst - це Rate 0 плюс точковий виклик Emit(n).",
      },
      {
        id: "q7",
        type: MC,
        question: "Що станеться, якщо лишити ParticleEmitter Enabled = true?",
        options: [
          "Частинки йтимуть безперервно та створюватимуть шум",
          "Він спрацює рівно один раз",
          "Він чекатиме виклику Play()",
          "Він автоматично успадкує checkpoint debounce",
        ],
        correctAnswer: 0,
        explanation: "Постійний Enabled дає безперервний потік частинок і візуальний шум.",
      },
      {
        id: "q8",
        type: MC,
        question: "Чому не варто робити Instance.new(\'Sound\') на кожен Touched?",
        options: [
          "SoundId можна призначити лише в Edit Mode",
          "Play() працює тільки з одним Sound за гру",
          "Зайві Instance створюються в найгарячіший момент і потребують cleanup",
          "Touched забороняє створення Instance",
        ],
        correctAnswer: 2,
        explanation: "Створення нових Instance на кожен дотик засмічує гру й вимагає cleanup.",
      },
      {
        id: "q9",
        type: MC,
        question: "Коли checkpoint juice має спрацювати?",
        options: [
          "На кожен дотик будь-якої частини тіла",
          "Щосекунди, поки гравець стоїть на Part",
          "Після кожного respawn незалежно від прогресу",
          "Лише коли сервер підтвердив новий checkpoint усередині debounce",
        ],
        correctAnswer: 3,
        explanation: "Ефект з\'являється лише при підтвердженому новому checkpoint.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що перевіряє тест повторного дотику checkpoint?",
        options: [
          "Що Sound стає глобальним",
          "Що chime і sparkles не дублюються через кілька Touched",
          "Що ParticleEmitter переходить у Enabled true",
          "Що checkpoint видаляється після першого гравця",
        ],
        correctAnswer: 1,
        explanation: "Тест перевіряє, що ефект не дублюється при повторних дотиках.",
      },
      {
        id: "q11",
        type: MC,
        question: "Що правильно для серверного і локального feedback?",
        options: [
          "Обидва шари грають той самий Sound одночасно",
          "Локальний шар сам вирішує, чи checkpoint зараховано",
          "Сервер запускає базову подію, а клієнт може додати інший UI-ефект",
          "Усю логіку треба перенести в LocalScript",
        ],
        correctAnswer: 2,
        explanation: "Сервер керує подією, клієнт лише додає власний UI-шар.",
      },
      {
        id: "q12",
        type: MC,
        question: "Навіщо вирівнювати Volume між hazard Parts?",
        options: [
          "Щоб різкі стрибки гучності не ламали відчуття рівня",
          "Щоб RollOffMode вимкнувся",
          "Щоб усі Sounds отримали один SoundId автоматично",
          "Щоб не використовувати debounce",
        ],
        correctAnswer: 0,
        explanation: "Однорідна гучність запобігає різким і неприємним стрибкам звуку.",
      },
      {
        id: "q13",
        type: MC,
        question: "Що саме треба перевірити повним проходом після 5.8?",
        options: [
          "Лише перший hazard і перший checkpoint",
          "Кожен hazard і checkpoint, повтори після respawn та комфорт гучності",
          "Тільки іконку майбутнього Badge",
          "Лише фонову музику в SoundService",
        ],
        correctAnswer: 1,
        explanation: "Повний прохід перевіряє всі hazards, checkpoint і комфорт звуку.",
      },
      {
        id: "q14",
        type: MC,
        question: "Що буде в уроці 5.10 після Juice Pass?",
        options: [
          "Переписування всіх hazard з нуля",
          "Початок Tycoon у тому самому Place",
          "Видалення Sound і ParticleEmitter",
          "Checkpoint, Ship + Badge і фінальна здача Obby",
        ],
        correctAnswer: 3,
        explanation: "5.10 завершує модуль фінальним checkpoint і здачею Ship + Badge.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save для уроку 5.9?",
        options: [
          "Lesson 5.8 - Full Run",
          "Lesson 5.10 - Ship + Badge",
          "Lesson 5.9 - Juice Pass",
          "Obby Sound Final Draft",
        ],
        correctAnswer: 2,
        explanation: "Практика 5.9 завершується збереженням Lesson 5.9 - Juice Pass.",
      },
    ],
  },
}

export const ukLesson510 = {
  lessonId: "lesson-roblox-5-10",
  moduleId: "module-05",
  order: 10,
  title: "5.10 - Checkpoint: Ship + Badge",
  theoryMinutes: 30,
  quizMinutes: 10,
  estimatedTime: 50,
  learningObjectives: [
    "Заповнити Game Settings place: назва, опис, іконка та Access Friends або Public",
    "Створити Badge на сайті Roblox і видати його AwardBadge на сервері на фініші",
    "Захистити видачу через UserHasBadgeAsync і pcall перед AwardBadge",
    "Пройти фінальний checkpoint - рубрику по біомах, чекпоінтах, hazards і juice з 5.1-5.9 - як останній gate перед показом",
    "Відрепетирувати демо 60-90 секунд без суфлера і зберегти фінальний Place",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 38 з 92)",
        content: `Це фінал модуля 5 — Obby і водночас checkpoint: останній контрольний прохід перед показом. Нової механіки немає. Ти підтверджуєш, що рівень готовий, і одразу пакуєш його в продукт, який можна показати незнайомій людині за 90 секунд.

За попередні уроки ти вже зібрав основу. У 5.10 ти не додаєш нові механіки — ти проходиш checkpoint і упаковуєш усе в готовий продукт:

- 5.1 — три біоми;
- 5.2 — hazards + debounce;
- 5.3 — чекпоінти + таймер + GUI;
- 5.4 — while-платформи + Config;
- 5.5 — секрети + ключ-двері;
- 5.6 — playtest і багліст;
- 5.7 — difficulty curve;
- 5.8 — повний прохід і пошук багів;
- 5.9 — juice Sound + Particles.

| Було в 5.9 | Стає в 5.10 |
| --- | --- |
| Рівень із juice | Той самий рівень як показуваний продукт |
| Juice без фінальної перевірки | Checkpoint підтверджує готовність |
| Фініш без нагороди профілю | Badge один раз на фініші |
| Studio-назва за замовчуванням | Ім'я, опис, іконка для сторінки place |`,
      },
      {
        title: "Що означає Checkpoint і Ship + Badge",
        content: `Ship — не AAA і не «найбільша карта». Це прохід від старту до фінішу, який цілий, чесний і показуваний без твоїх пояснень. Checkpoint - це контрольна точка сьогоднішнього уроку, яка підтверджує це фактами, перш ніж ти взагалі відкриваєш Game Settings.

| Ship + Badge | Ще не ship |
| --- | --- |
| Name, Description, Icon заповнені | Untitled Game і дефолтна іконка |
| Access обраний свідомо | Ніхто не перевірив, хто може зайти |
| Badge видається сервером на фініші | Badge створено, але код мовчить |
| Усі 3 біоми прохідні | Один біом «майже готовий» |
| Демо 60–90 с без «зачекайте» | П'ять хвилин імпровізації |
| Output чистий на повному проході | Червоні помилки «не заважають» |`,
      },
      {
        title: "Game Settings: назва, опис, іконка",
        content: `У Studio: File → Game Settings → Basic Info. Три поля формують перше враження ще до входу в гру.

| Поле | Що писати | Приклад |
| --- | --- | --- |
| Name | Жанр + фішка, коротко | Neon Obby: 3 Biomes |
| Description | 1–2 речення: що робити і скільки триває | Пройди ліс, лаву й кригу. ~3 хв, 3 чекпоінти, є секрет. |
| Icon / Thumbnail | Скрин яскравого біому з juice | Кадр із 5.9, де видно частинки |`,
      },
      {
        title: "Access: Friends чи Public",
        content: `У Game Settings → Permissions обери доступ свідомо.

| Access | Коли брати |
| --- | --- |
| Friends | Здача ментору / класу, баланс ще живий |
| Public | Рубрика пройдена, готовий до незнайомців |`,
      },
      {
        title: "Badge на сайті Roblox",
        content: `Badge створюється не в Studio, а на сайті: Creator Dashboard → твоя гра → Badges → Create a Badge.

Заповни:

- Name — коротке досягнення, наприклад Obby Finisher;
- Description — одне речення: «Пройшов усі 3 біоми до фінішу»;
- Image — проста ікона 512×512, контрастна в малому розмірі.

Після створення скопіюй числовий Badge ID. Він живе в Script як константа. Badge створюєш один раз на проєкт, не на кожен playtest.

| Крок | Де | Результат |
| --- | --- | --- |
| Create a Badge | Сайт | Badge існує в акаунті гри |
| Скопіювати ID | Сторінка Badge | Число для Script |
| AwardBadge | Server Script | Гравець отримує нагороду |
| Профіль гравця | Сайт Roblox | Badge видно назавжди |`,
      },
      {
        title: "AwardBadge на сервері на фініші",
        content: `Видача завжди через BadgeService у Script на сервері. LocalScript дозволяє підробити нагороду без реального проходу.

\`\`\`
local BadgeService = game:GetService(\"BadgeService\")
local BADGE_ID = 000000000 -- свій ID
local finishLine = workspace.Checkpoints.FinishLine
finishLine.Touched:Connect(function(hit)
local character = hit.Parent
local player = game.Players:GetPlayerFromCharacter(character)
if not player then return end
BadgeService:AwardBadge(player.UserId, BADGE_ID)
end)
\`\`\`

Місце виклику - той самий FinishLine з 5.3, де вже рахується час. AwardBadge додається поруч, не замість таймера. Переконайся, що Part Anchored і має зрозумільне ім'я - інакше Touched ніколи не спрацює під час демо.

Фільтр GetPlayerFromCharacter обов'язковий: фініш можуть торкнути інші Parts, не лише HumanoidRootPart.

каса стадіону видає квиток лише на турнікеті фінішу, не з кишені вболівальника.

**Зроби зараз (8 хв)**: підключи AwardBadge на FinishLine у Server Script і один раз пройди до фінішу в Play.`,
      },
      {
        title: "UserHasBadgeAsync і pcall",
        content: `AwardBadge можна кликати знову без гучної помилки, але це марно навантажує сервіс і виглядає неохайно. Перед видачею перевір, чи Badge уже є.

\`\`\`
local success, hasBadge = pcall(function()
return BadgeService:UserHasBadgeAsync(player.UserId, BADGE_ID)
end)
if success and not hasBadge then
pcall(function()
BadgeService:AwardBadge(player.UserId, BADGE_ID)
end)
end
\`\`\`

pcall — той самий захист, що й для мережевих сервісів: відповідь може запізнитись або впасти, а гра не повинна червоніти в Output. UserHasBadgeAsync — анти-дубль нагороди, як debounce був анти-дублем урону в 5.2.

| Без перевірки | З UserHasBadgeAsync |
| --- | --- |
| Кожен дотик фінішу кличе Award | Другий дотик тихо пропускається |
| Спам сервісу | Одна чесна видача |
| Складніше дебажити | print(hasBadge) одразу показує стан |`,
      },
      {
        title: "Карта систем перед Ship",
        content: `Ship підтверджує, що рядки з усього модуля працюють в одному Place.

| Урок | Що перевіряєш зараз |
| --- | --- |
| 5.1 три біоми | Кожен відрізняється й прохідний |
| 5.2 hazards + debounce | Немає миттєвої серії ударів |
| 5.3 чекпоінти + GUI | Респавн на останньому, таймер видно |
| 5.4 while-платформи | Рух стабільний, Parts не зникають |
| 5.5 секрети + ключ | Секрет знаходиться, двері відкриваються |
| 5.7 difficulty curve | Немає різкого стрибка складності |
| 5.9 juice | Звук/частинки на ключових діях, не спам |`,
      },
      {
        title: "Презентація 60-90 секунд",
        content: `Коротке демо перед класом чи ментором:

- (10 с) Назва й ідея: «Це Neon Obby, три біоми, мета - фініш.»
- (15 с) Біом 1: hazard і чекпоінт у дії.
- (15 с) Біом 2: while-платформа або інший унікальний елемент.
- (15 с) Секрет: ключ-двері, якщо вкладаєшся в час.
- (15 с) Фініш: лінія + Badge.
- (10 с) Підсумок: «Повний прохід виглядає так. Дякую.»

Заборонені фрази на здачі: «зачекайте», «зараз знайду», «у мене вчора працювало». Якщо запинаєшся на кроці - скороти саме його, не розтягуй таймер.

Тренуй на таймері телефону тричі. Друга репетиція зазвичай показує, де ти втрачаєш 20 секунд на пояснення замість гри.

трейлер фільму, не повний режисерський коментар.

**Зроби зараз (8 хв)**: один прогін демо з таймером; якщо >90 с - виріж один блок пояснень.`,
      },
      {
        title: "Checkpoint: рубрика peer review (~15 пунктів)",
        content: `Це і є checkpoint уроку - контрольна точка, яка вирішує, чи Place готовий до показу. Дай таблицю однокласнику: він грає й ставить так / ні / майже, ти мовчиш.

A. Перше враження (1–4)

- Назва й опис place зрозумілі;
- іконка не дефолтна;
- Access обраний свідомо;
- Spawn і перший крок очевидні без пояснень.

B. Прохід (5–9)

- Усі 3 біоми прохідні без застрягань;
- чекпоінти зберігають прогрес після смерті;
- hazards дають шанс відреагувати (debounce працює);
- секрет знаходиться за розумний час;
- складність росте плавно від старту до фінішу.

C. Ship-якість (10–15)

- Juice відчутний, але не набридливий;
- Badge видається рівно один раз на фініші;
- Output чистий на повному проході;
- повторний дотик фінішу не видає Badge знову;
- демо вкладається в 60–90 с.

**Збережи**: Lesson 5.10 - Ship + Badge.

Червоне «ні» в B блокує ship сильніше, ніж дрібниця в A. Спочатку прохід, потім полірування афіші. Checkpoint пройдено лише тоді, коли в B і C немає жодного «ні» - тільки тоді має сенс перемикати Access на Public.

**Зроби зараз (10 хв)**: самооцінка або peer review — випиши всі «ні» списком фіксів.`,
      },
      {
        title: "Типові ship-фейли й playtest",
        content: `| Симптом | Фікс |
| --- | --- |
| Badge не з'являється | Script на сервері, не LocalScript; ID правильний |
| Badge «кілька разів» | UserHasBadgeAsync перед AwardBadge |
| Фініш без логіки | FinishLine.Touched не підключено |
| Один біом сирий | Фікс до Public |
| New Game в назві | Game Settings перед показом |
| Демо 5+ хвилин | Скорочена структура з теорії |`,
      },
      {
        title: "Чекліст здачі й місток до модуля 6",
        content: `Перед фінальним Save переконайся:
- [ ] Name, Description, Icon заповнені
- [ ] Access обраний із причиною
- [ ] Badge на сайті й ID у Script
- [ ] AwardBadge на сервері після FinishLine.Touched
- [ ] UserHasBadgeAsync + pcall блокують дубль
- [ ] Checkpoint (рубрика) пройдено
- [ ] Демо 60–90 с відрепетируване
- [ ] Save Lesson 5.10 - Ship + Badge

Далі 6.1 — Core loop + сцена відкриє Simulator. Та сама дисципліна «сервер видає нагороду» переїде на Coins і giveCoins. Якщо Badge досі з LocalScript — не неси цю діру в модуль 6.

Артефакт дня: обгорнутий, показуваний obby з одноразовою серверною нагородою. Ship любить короткий переможний прохід, не найбільшу карту світу.

**Зроби зараз (2 хв)**: Save з точною назвою Lesson 5.10 - Ship + Badge.`,
      },
    ],
  },
  summary: "Ти пройшов фінальний checkpoint модуля 5 і закрив його Ship + Badge: Game Settings з назвою, описом і іконкою, свідомий Access, Badge з сайту й серверний AwardBadge на FinishLine з UserHasBadgeAsync. Checkpoint-рубрика й демо 60-90 с підтверджують показуваний obby перед переходом до Simulator у 6.1.",
  practiceTask: {
    title: "Practice for 5.10 - Checkpoint: Ship + Badge",
    difficulty: "beginner",
    description: `**Мета:** один Place з Game Settings, робочим Badge на фініші й пройденим checkpoint (рубрикою).

Part A — Settings і Badge (10 хв)
1. Заповни Name, Description, Icon.
2. Обери Access Friends або Public свідомо.
3. Створи Badge на сайті, скопіюй Badge ID.

Part B — AwardBadge на сервері (15 хв)
1. Script на FinishLine.Touched викликає AwardBadge.
2. Додай UserHasBadgeAsync + pcall.
3. Перевір: другий дотик фінішу не видає Badge знову.

Part C — Checkpoint і демо (10 хв)
1. Пройди ~15 пунктів сам або з peer.
2. Відрепетируй демо 60–90 с.
3. Save: Lesson 5.10 - Ship + Badge.`,
  },
  quiz: {
    passingScore: 70,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.10?",
        options: [
          "Побудувати четвертий біом",
          "Пройти фінальний checkpoint і обгорнути готовий obby в показуваний продукт з Badge на фініші",
          "Видалити чекпоінти з 5.3",
          "Почати Simulator з нуля",
        ],
        correctAnswer: 1,
        explanation: "5.10 - це checkpoint і обгортка готового Obby в продукт з Badge, а не новий контент.",
      },
      {
        id: "q2",
        type: MC,
        question: "Де заповнюють Name, Description, Icon?",
        options: [
          "File -> Game Settings -> Basic Info",
          "У Script через Instance.new",
          "У BadgeService напряму",
          "Лише в Creator Dashboard без Studio",
        ],
        correctAnswer: 0,
        explanation: "Основна інформація про гру заповнюється в Game Settings Studio.",
      },
      {
        id: "q3",
        type: MC,
        question: "Коли розумно обрати Access Public?",
        options: [
          "Одразу після першого Play",
          "Замість заповнення Description",
          "Після проходження повної ship-рубрики",
          "Public завжди обов\'язковий з першого дня",
        ],
        correctAnswer: 2,
        explanation: "Public обирають лише після повного проходження ship-рубрики.",
      },
      {
        id: "q4",
        type: MC,
        question: "Де створюється Badge?",
        options: [
          "У Studio через Instance.new(\"Badge\")",
          "У ServerScriptService автоматично",
          "У Toolbox як Model",
          "На сайті Roblox: Creator Dashboard -> Badges",
        ],
        correctAnswer: 3,
        explanation: "Badge створюється на сайті через Creator Dashboard.",
      },
      {
        id: "q5",
        type: MC,
        question: "Чому AwardBadge лише на сервері?",
        options: [
          "LocalScript технічно не бачить BadgeService",
          "Інакше можна видати собі нагороду без реального проходу",
          "Сервер швидший для UI",
          "Це вимога лише для Friends place",
        ],
        correctAnswer: 1,
        explanation: "Видача на клієнті дозволила б підробити нагороду без проходження.",
      },
      {
        id: "q6",
        type: MC,
        question: "Навіщо UserHasBadgeAsync перед AwardBadge?",
        options: [
          "Замінює перевірку Humanoid",
          "Прискорює Terrain",
          "Блокує повторну видачу того самого Badge",
          "Потрібен лише в Friends-режимі",
        ],
        correctAnswer: 2,
        explanation: "Перевірка запобігає повторній видачі того самого Badge.",
      },
      {
        id: "q7",
        type: MC,
        question: "Навіщо pcall навколо BadgeService?",
        options: [
          "pcall прискорює AwardBadge",
          "Без pcall Badge не створити на сайті",
          "pcall замінює UserHasBadgeAsync",
          "Сервіс може відповісти помилкою - гра не має ламатись",
        ],
        correctAnswer: 3,
        explanation: "pcall захищає гру від падіння через помилку зовнішнього сервісу.",
      },
      {
        id: "q8",
        type: MC,
        question: "Скільки триває цільове демо?",
        options: [
          "Обов\'язково 10+ хвилин",
          "Близько 60-90 секунд без суфлера",
          "Досить одного скріншота",
          "Рівно 5 секунд",
        ],
        correctAnswer: 1,
        explanation: "Демо розраховане приблизно на 60-90 секунд без підказок.",
      },
      {
        id: "q9",
        type: MC,
        question: "Що перевіряє категорія B рубрики (5-9)?",
        options: [
          "Лише назву place",
          "Лише колір іконки",
          "Прохідність біомів, чекпоінтів, hazards, секрету й криву складності",
          "Лише наявність Badge ID у файлі",
        ],
        correctAnswer: 2,
        explanation: "Категорія B перевіряє прохідність усіх ігрових систем.",
      },
      {
        id: "q10",
        type: MC,
        question: "Типовий ship-фейл 5.10?",
        options: [
          "Чекпоінти зберігають прогрес",
          "Output чистий",
          "Access обраний свідомо",
          "Badge кличеться знову без UserHasBadgeAsync",
        ],
        correctAnswer: 3,
        explanation: "Повторна видача Badge без перевірки - типова помилка ship.",
      },
      {
        id: "q11",
        type: MC,
        question: "З якого уроку juice для демо?",
        options: [
          "5.9 - Sound + Particles",
          "5.2 - Hazards",
          "5.5 - Секрети",
          "5.1 - Дизайн біомів",
        ],
        correctAnswer: 0,
        explanation: "Juice для демо - результат уроку 5.9.",
      },
      {
        id: "q12",
        type: MC,
        question: "Що входить у категорію A (перше враження)?",
        options: [
          "Складність росте плавно",
          "Іконка place не дефолтна",
          "Секрет знаходиться швидко",
          "Badge видається один раз",
        ],
        correctAnswer: 1,
        explanation: "Перше враження оцінює, зокрема, чи іконка place не дефолтна.",
      },
      {
        id: "q13",
        type: MC,
        question: "Чого НЕ робити на 5.10?",
        options: [
          "Заповнити Game Settings",
          "Створити Badge на сайті",
          "Будувати четвертий біом замість обгортки",
          "Прорепетирувати демо",
        ],
        correctAnswer: 2,
        explanation: "5.10 - обгортка готового проєкту, а не новий контент.",
      },
      {
        id: "q14",
        type: MC,
        question: "Як 5.10 готує модуль 6?",
        options: [
          "Видаляє звичку серверних нагород",
          "Замінює Obby на Tycoon в тому ж Place",
          "Вчить DataStore для монет одразу",
          "Закріплює правило: сервер видає нагороду (далі - Coins)",
        ],
        correctAnswer: 3,
        explanation: "Принцип серверної видачі нагород переходить у модуль 6 з Coins.",
      },
      {
        id: "q15",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 5.9 - Juice",
          "Lesson 5.10 - Ship + Badge",
          "Lesson 6.1 - Core Loop",
          "Obby Draft Final",
        ],
        correctAnswer: 1,
        explanation: "Практика 5.10 завершується збереженням Lesson 5.10 - Ship + Badge.",
      },
    ],
  },
}
