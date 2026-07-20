export const ukLesson31 = {
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
    "Підготувати прогрес і час до while-платформ у 5.4 і playtest у 5.6",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 31 з 92)",
        content: `У **5.2** hazards уже вбивають з debounce. Без збереження прогресу кожна смерть кидає гравця на початок - Obby стає карою, а не навчанням. Сьогодні будуєш **три системи разом**: checkpoint, respawn на ньому й GUI з таймером.

Це не Arena «система пошкоджень мечем». Жанр - Obby: прогрес по біомах, чесний повтор після смерті, видимий час проходження.

Артефакт уроку:
1. Мінімум 3 Checkpoint Parts на основному шляху (бажано по біомах).
2. Серверний стан LastCheckpoint (CFrame або номер + позиція).
3. Респавн на останньому CP після смерті.
4. ScreenGui: мітка checkpoint + таймер мм:сс.
5. Debounce / «лише вперед» - старіший CP не затирає новіший.
6. Save **Lesson 5.3 - Checkpoints Timer GUI**.

| Було в 5.2 | Стає в 5.3 |
|-------------|------------|
| Смерть → старт рівня | Смерть → останній checkpoint |
| Прогрес лише в голові автора | Прогрес у даних гравця |
| Немає відчуття часу | Таймер на екрані |

У **5.4** while-платформи ставлять після CP. У **5.10** FinishLine використає той самий фінішний Part для Badge.

Метафора: checkpoint - закладка в книзі; без неї смерть змушує читати все з першої сторінки.

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

Артефакт: **серверний прогрес + видимий час**, а не бойова система арени.

**Зроби зараз (2 хв):** Save Place як Lesson 5.3 - Checkpoints Timer GUI.`,
      },
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
    },
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
      "Не скидайте таймер на кожному CP",
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
          "DataStore монет",
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
          "У Terrain",
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
          "Щоб вимкнути Anchored",
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
          "Таймер іде назад",
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
          "У Bundle",
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
          "Лише на мобільному",
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
          "Створювати leaderstats",
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
          "Видалити SpawnLocation",
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
          "Лише на CP_01",
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
          "Видалити всі CP",
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
          "Потрібен меч",
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
          "Таймер мм:сс",
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
          "Config більше не потрібен",
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
          "Щоб створити Badge",
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
          "Lesson 5.3 - Checkpoints Timer GUI",
        ],
        correctAnswer: 3,
        explanation: "Чекліст вимагає Lesson 5.3 - Checkpoints Timer GUI.",
      },
    ],
  },
};
