export const ukLesson30 = {
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
    "Підготувати чесні пастки під checkpoint у 5.3 і juice у 5.9",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 30 з 92)",
        content: `У **5.1** ти розклав три біоми й основний маршрут. Сьогодні маршрут отримує **ціну помилки**: hazards - лава, шипи, отруйна вода, невидимі лише якщо unfair.

Це не урок про меч і Arena. Tool, Activated і дуелі тут не здаються. Жанр - Obby: гравець стрибає, промахується, торкається небезпеки, помирає, вчиться.

Артефакт уроку:
1. Folder Hazards з мінімум 3 різними пастками на маршруті.
2. Серверний Script: Touched → Humanoid → Health = 0 (або TakeDamage).
3. Debounce на гравця / на Part, щоб не було спаму смерті.
4. Читабельний вигляд: колір, форма або Material відрізняються від безпечної підлоги.
5. Play: один дотик = одна логічна кара; без Output-спаму.
6. Save **Lesson 5.2 - Hazards Debounce**.

| Було в 5.1 | Стає в 5.2 |
|-------------|------------|
| Геометрія й маршрут | Маршрут із наслідком помилки |
| Смерть лише від падіння в void | Контрольовані KillBrick / шкода |
| Немає Touched-логіки | Серверний обробник + debounce |

У **5.3** checkpoint зменшить лють від цих смертей. У **5.9** на той самий хук сяде Sound.

Метафора: hazard - бордюр з шипами на краю доріжки, не меч у руці суперника.

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
        title: "Підготовка до checkpoint і juice",
        content: `Сьогоднішня смерть ще кидає на Spawn (або дефолтний Respawn). У **5.3** CharacterAdded перенесе на LastCheckpoint - **не змінюй** hazards під це заздалегідь, лише залиш чистий хук.

У **5.9** у той самий блок після успішного debounce додаси:

\`deathSound:Play()\`
\`puff:Emit(15)\`

Тому не створюй другий Touched «для звуку». Один обробник = одна подія.

Не видавай Badge і не пиши Coins за смерть. Кара - це урок паркуру, не нагорода.

ForceField після респавну: у playtest зачекай 2-3 с або постав hazard далі від Spawn.

**Зроби зараз (3 хв):** залиш у коді коментар \`-- 5.9 juice here\` одразу після Health = 0 всередині debounce.`,
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

Артефакт: **чесні серверні пастки з debounce**, не зброя арени.

**Зроби зараз (2 хв):** Save Place як Lesson 5.2 - Hazards Debounce.`,
      },
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
    },
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
      "Спочатку один hazard, потім цикл на Folder",
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
          "Зберегти DataStore",
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
          "У Bundle без Script",
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
          "Тільки SpawnLocation",
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
          "Щоб серія Touched не спамила одну й ту саму кару",
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
          "LocalScript Destroy(player)",
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
          "Пастка з обхідним маршрутом",
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
          "Щоб вимкнути Touched",
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
          "Видалити всі Parts крім одного",
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
          "Він переносить FinishLine",
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
          "Меч Tool з Activated як основний артефакт",
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
          "GUI замінить KillBrick",
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
          "У Terrain",
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
          "У ямі біому 2",
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
          "Simulator з Coins",
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
          "Lesson 5.2 - Hazards Debounce",
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Lesson 5.2 - Hazards Debounce.",
      },
    ],
  },
};
