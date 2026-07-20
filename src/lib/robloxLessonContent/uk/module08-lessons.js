/** Roblox Module 08 UK - 8 уроків (prod-92), Arena */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson81 = {
 lessonId: "lesson-roblox-8-1",
 moduleId: "module-08",
 order: 1,
 title: "8.1 - Humanoid Health",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати просту арену з підлогою, бар’єрами і спавном",
 "Налаштувати Humanoid.MaxHealth і Health гравця під бій",
 "Поставити тестовий dummy з Humanoid для майбутнього урону",
 "Показати/перевірити HP (смуга або print) до появи Tool",
 "Зберегти Place як базу модуля Arena",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 57 з 92)",
 content: `Модуль 8 - **Arena**. Сьогодні не махаєш мечем і не пишеш dealDamage. Сьогодні збираєш **поле бою** і розумієш **Humanoid Health**.

Артефакт уроку:
1. Папка/модель \`Arena\` - підлога, бар’єри, вхід.
2. SpawnLocation у безпечній зоні.
3. Гравець з осмисленим \`MaxHealth\` / \`Health\` (наприклад 100).
4. Dummy / мішень з Humanoid для тестів наступних уроків.

Без арени Tool і хвилі висітимуть у порожнечі. Без Health бій не має шкали життя.

**Зроби зараз (2 хв):** намалюй олівцем квадрат арени і де стоятиме spawn - не в центрі майбутніх ворогів.`,
 },
 {
 title: "Humanoid Health простими словами",
 content: `| Властивість | Зміст |
|-------------|--------|
| **MaxHealth** | Стеля життя |
| **Health** | Поточне життя (0 = смерть) |
| **Humanoid** | Компонент Character / NPC |

MaxHealth - **повний резервуар**. Health - **скільки залишилось**. У 8.5 Health=0 запустить Died; сьогодні лише виставляєш і спостерігаєш.

За замовчуванням у гравця часто 100. Ти можеш змінити під жанр арени - але запиши число: завтра баланс (8.7) крутитиме саме його.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Білд арени (овал не потрібен)",
 content: `Мінімум:
1. Part \`Floor\` - велика підлога (Anchored).
2. 4 стіни / бар’єри \`Wall\` - CanCollide true, щоб не випадати.
3. Part \`Entrance\` або проріз з табличкою «Арена».
4. Опційно: інший колір підлоги всередині vs лобі.

Розмір: не stadium. Достатньо 40×40 studs для навчального бою.

Папки:

\`Workspace\`
\` └── Arena\`
\` ├── Floor\`
\` ├── Walls\`
\` ├── Spawn\`
\` └── Dummies\`

**Зроби зараз (12 хв):** замкнений простір, гравець не падає у void за 10 с бігу.

Перевір кути: стик стін без щілин у 1–2 stud. Яскравий Material на Entrance допомагає новачку зрозуміти «ось сюди заходити в бій», а не блукати лобі.`,
 },
 {
 title: "SpawnLocation і безпечний старт",
 content: `Постав \`SpawnLocation\` **біля входу**, не в центрі арени (центр займуть dummy/хвилі).

Властивості:
- Duration / ForceField (базовий захист появи - знайомий з іншими модулями).
- Neutral / Team - для соло-арени зазвичай просто.

Перевір Play: з’являєшся ногами на підлозі, камера не в стіні.

Пізніше 8.5 додасть власні i-frames - сьогодні достатньо розумного Spawn.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Виставити MaxHealth гравцю на сервері",
 content: `Script у ServerScriptService:

\`local START_HP = 100\`

\`local function setupHealth(character)\`
\` local hum = character:WaitForChild("Humanoid")\`
\` hum.MaxHealth = START_HP\`
\` hum.Health = START_HP\`
\`end\`

\`Players.PlayerAdded:Connect(function(player)\`
\` player.CharacterAdded:Connect(setupHealth)\`
\` if player.Character then setupHealth(player.Character) end\`
\`end)\`

Чому сервер: MaxHealth - правило світу. Клієнт може підкрутити собі HP у чітах - тому звичка «сервер ставить стелю» стартує вже тут.

Print для перевірки: \`print(hum.MaxHealth, hum.Health)\`.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Dummy - мішень з Humanoid",
 content: `Збери просту модель:
- Part/Model \`Dummy\`
- Humanoid
- HumanoidRootPart (або R15/R6 rig з Toolbox **як шаблон школи**, без зайвого AI)

Вистав:

\`dummyHum.MaxHealth = 80\`
\`dummyHum.Health = 80\`

Anchored dummy на старті - ок (стоїть мішенню). У хвилях (8.6) знімеш/заміниш на рухомих.

Помітка Billboard «HP test» над головою - опційно, допомагає ментору.

Не вішай сьогодні повний AI chase - це роздує урок. Мішень + Health досить.

Якщо береш rig з Toolbox - прибери чужі Scripts AI, лиши Humanoid і зовнішність. Інакше dummy почне «жити своїм життям» і зламає чистий тест HP.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Як побачити HP",
 content: `| Спосіб | Плюс |
|--------|------|
| Стандартна смуга Health над Character | Вже є |
| print на сервері | Точні цифри |
| IntValue / Attribute \`HP\` | Для UI пізніше |
| SurfaceGui на dummy | Навчальна мішень |

Для здачі: стандартна смуга + один print після setup достатньо.

Не витрачай годину на AAA HUD. У 8.4–8.8 з’являться інші пріоритети (урон, fx, хвилі).

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Тест: змінити Health свідомо",
 content: `Тимчасовий серверний тест (кнопка / команда / delay):

\`hum.Health = hum.Health - 10\`

Очікування: смуга падає. Потім поверни повне HP для чистої бази:

\`hum.Health = hum.MaxHealth\`

Або вбий dummy тестово:

\`dummyHum.Health = 0\` - побачиш смерть моделі; для гравця поки не обов’язково (це глибше в 8.5).

Мета вправи: **ти контролюєш числа**, не магія випадкового падіння.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Організація Place модуля 8",
 content: `Імена:
- Save: \`Lesson 8.1 - Arena Health\`
- Корінь \`Arena\` у Workspace
- Scripts: \`HealthSetup\` у SSS

Не змішуй сюди старий NPC-квест / магазин з інших Place без потреби. Чиста арена = швидший дебаг у 8.3–8.8.

Що НЕ робити сьогодні:
- Tool і анімація (8.2)
- dealDamage (8.3)
- хвилі (8.6)

Що МОЖНА: табличка «Скоро бій», колір стін, один світильник.

Якщо тягнеш старий Place - зроби Save As під нову назву. Інакше ризик випадково зламати магазин/obby, поки крутиш MaxHealth.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Health гравця vs Health dummy - дві шкали",
 content: `| Хто | Навіщо MaxHealth сьогодні | Що буде далі |
|-----|---------------------------|--------------|
| Гравець | Базовий «резервуар» бою | 8.5 смерть, 8.7 баланс |
| Dummy | Мішень для ударів | 8.3 dealDamage, 8.6 хвилі |

Не став гравцю MaxHealth = 1 «для приколу» - зламаєш усі наступні playtest.  
Не став dummy MaxHealth = 10000 - завтра TTK буде вічністю.

Орієнтир старту модуля: гравець 100, dummy 60–100. Точні цифри підкрутиш у 8.7; сьогодні важлива **свідома** установка, не випадкове дефолтне «якось є».

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Playtest бази арени",
 content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Play | Spawn біля входу |
| 2 | Побігати по підлозі | Не випадаєш у void |
| 3 | Output print HP | MaxHealth/Health як задумано |
| 4 | Dummy на місці | Humanoid з HP |
| 5 | Тест -10 HP | Смуга реагує |
| 6 | Explorer | Папка Arena читабельна |
| 7 | Stop/Play | Все на місці, Anchored свідомо |

Якщо пункт 2 червоний - спочатку стіни, не dummy.  
Якщо пункт 3 червоний - скрипт не на CharacterAdded або WaitForChild не знайшов Humanoid.  
Якщо пункт 5 не змінює смугу - дивись, чи тест на сервері (клієнтська властивість у Studio інколи плутає під час навчання).

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Чекліст здачі уроку 57",
 content: `- [ ] Arena: підлога + бар’єри
- [ ] SpawnLocation у безпечній зоні
- [ ] Серверний setup MaxHealth/Health гравця
- [ ] Dummy з Humanoid і HP
- [ ] Перевірка смуги / print
- [ ] Чисті імена папок
- [ ] Save: Lesson 8.1 - Arena Health

Далі **8.2** дасть Tool у руки. **8.3** навчить dealDamage. Сьогоднішній артефакт - **поле + життя**.

Карта модуля вперед: Health → меч → суддя урону → fx → респавн → хвилі → баланс → Ship. Кожен наступний урок припускає, що арена вже стоїть.

Без Health немає сенсу махати мечем. Без арени немає сенсу хвиль. Почни модуль з землі під ногами. Якщо ментор пробіг арену без void і бачить смугу HP + dummy - база готова до меча. Залиш Place збереженим перед закриттям Studio.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Spawn у центрі майбутньої бойні",
 explanation: "Пізніше death loop і злий playtest.",
 correctApproach: "Spawn біля входу / лобі",
 },
 {
 mistake: "Немає бар’єрів - падіння у void",
 explanation: "Година на «де я?» замість Health.",
 correctApproach: "Стіни CanCollide",
 },
 {
 mistake: "MaxHealth лише на клієнті",
 explanation: "Звичка чіту; розсинхрон.",
 correctApproach: "Серверний setup на CharacterAdded",
 },
 {
 mistake: "Dummy без Humanoid",
 explanation: "Немає HP для 8.3 тестів.",
 correctApproach: "Humanoid + MaxHealth/Health",
 },
 {
 mistake: "Година на HUD замість арени",
 explanation: "Немає білд-артефакту.",
 correctApproach: "Смуга за замовчуванням + print",
 },
 {
 mistake: "Змішати старий квест-Place без чистки",
 explanation: "Explorer-хаос, ментор губиться.",
 correctApproach: "Чистий Arena Place",
 },
 ],
 summary: "Ти зібрав базу Arena: замкнений простір, безпечний spawn, серверний MaxHealth/Health і dummy-мішень. Модуль бою починається з поля і шкали життя - далі Tool і dealDamage.",
 practiceTask: {
 title: "Поле бою (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** арена з HP гравця і dummy.

### Part A - Білд (12 хв)
1. Floor + Walls у папці Arena.
2. SpawnLocation біля входу.
3. Перевір, що не падаєш у void.

### Part B - Health (10 хв)
1. Серверний setup MaxHealth/Health.
2. Dummy з Humanoid і HP.
3. print або смуга для перевірки.

### Part C - Тест (8 хв)
1. -10 HP тест і відновлення.
2. Explorer чистий.
3. **Save:** Lesson 8.1 - Arena Health`,
 hints: [
 "Спочатку коробка-арена, потім цифри HP",
 "Anchored на стінах і підлозі",
 "Dummy можна зробити з 1 Part + Humanoid для старту",
 ],
 optionalChallenge: "BillboardGui над dummy з TextLabel Health (оновлюй з сервера при зміні - lite).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 8.1?",
 options: [
          "Зібрати арену і налаштувати Humanoid Health",
          "Написати повний Remote магазин",
          "Зробити 10 хвиль одразу",
          "Publish Race-трасу",
        ],
 correctAnswer: 0,
 explanation: "База Arena.",
 },
 {
 id: "q2",
 type: MC,
 question: "Що таке MaxHealth?",
 options: [
          "Назва Tool",
          "Максимальне / стеля життя Humanoid",
          "Тип Terrain",
          "Кількість RemoteEvent",
        ],
 correctAnswer: 1,
 explanation: "Стеля HP.",
 },
 {
 id: "q3",
 type: MC,
 question: "Де логічно ставити Spawn арени?",
 options: [
          "Обов’язково в void",
          "Лише в ServerStorage",
          "Біля входу, не в центрі бою",
          "Всередині Wall без прорізу",
        ],
 correctAnswer: 2,
 explanation: "Безпечний старт.",
 },
 {
 id: "q4",
 type: MC,
 question: "Чому MaxHealth виставляють на сервері?",
 options: [
          "Сервер не вміє Humanoid",
          "MaxHealth існує лише в LocalScript",
          "Інакше Floor зникає",
          "Це правило світу; клієнту не довіряємо стелю HP",
        ],
 correctAnswer: 3,
 explanation: "Серверна звичка.",
 },
 {
 id: "q5",
 type: MC,
 question: "Навіщо dummy з Humanoid уже в 8.1?",
 options: [
          "Dummy замінює гравця назавжди",
          "Щоб було на чому тестувати урон у наступних уроках",
          "Без dummy немає SpawnLocation",
          "Humanoid потрібен лише для Sky",
        ],
 correctAnswer: 1,
 explanation: "Мішень.",
 },
 {
 id: "q6",
 type: MC,
 question: "Що НЕ обов’язково сьогодні?",
 options: [
          "Підлога арени",
          "Бар’єри",
          "Повний dealDamage і хвилі",
          "Setup Health",
        ],
 correctAnswer: 2,
 explanation: "Це пізніші уроки.",
 },
 {
 id: "q7",
 type: MC,
 question: "Навіщо бар’єри?",
 options: [
          "Не випадати у void під час бою/тестів",
          "Вони створюють Animation",
          "Бар’єри = RemoteEvent",
          "Без них MaxHealth = 0",
        ],
 correctAnswer: 0,
 explanation: "Тримають на полі.",
 },
 {
 id: "q8",
 type: MC,
 question: "Коли викликати setupHealth?",
 options: [
          "Лише один раз у житті гри без респавну",
          "Тільки в Lighting",
          "Після Publish обов’язково вручну",
          "На CharacterAdded (і якщо Character уже є)",
        ],
 correctAnswer: 3,
 explanation: "Кожен Character.",
 },
 {
 id: "q9",
 type: MC,
 question: "Як швидко перевірити, що Health змінюється?",
 options: [
          "Змінити лише назву Floor",
          "Видалити Humanoid",
          "Серверний тест Health = Health - 10 і глянути смугу",
          "Вимкнути Output назавжди",
        ],
 correctAnswer: 2,
 explanation: "Свідомий тест.",
 },
 {
 id: "q10",
 type: MC,
 question: "Яка структура Explorer зручна?",
 options: [
          "Все безіменне Part1…Part99 у корені",
          "Workspace.Arena з Floor, Walls, Spawn, Dummies",
          "Лише SoundService",
          "Усе в Terrain water",
        ],
 correctAnswer: 1,
 explanation: "Читабельний білд.",
 },
 {
 id: "q11",
 type: MC,
 question: "Як 8.1 готує 8.2–8.3?",
 options: [
          "Health скасовує Tool",
          "Арена забороняє Humanoid",
          "Треба видалити dummy перед мечем",
          "Є поле і HP - далі Tool і серверний урон",
        ],
 correctAnswer: 3,
 explanation: "Фундамент модуля.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що означає Health = 0 для Humanoid?",
 options: [
          "Смерть (Died) - глибше розберете в 8.5",
          "Обов’язкове збільшення MaxHealth",
          "Створення Tool",
          "Вимкнення Workspace",
        ],
 correctAnswer: 0,
 explanation: "Нуль = смерть.",
 },
 {
 id: "q13",
 type: MC,
 question: "Чому не будувати AAA HUD годину в 8.1?",
 options: [
          "HUD заборонений у Roblox",
          "Без HUD Humanoid не працює",
          "Важливіші арена і числа HP; смуга за замовчуванням достатня",
          "Print незаконний",
        ],
 correctAnswer: 2,
 explanation: "Пріоритет білду.",
 },
 {
 id: "q14",
 type: MC,
 question: "Anchored на Floor/Walls потрібен щоб…",
 options: [
          "Збільшити урон",
          "Створити AnimationId",
          "Видалити Spawn",
          "Геометрія арени не падала від фізики",
        ],
 correctAnswer: 3,
 explanation: "Статична сцена.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 8.1?",
 options: [
          "Лише теорія",
          "Арена + Spawn + Health setup + dummy + Save",
          "Порожній Baseplate",
          "Tool з клієнтським Health=0",
        ],
 correctAnswer: 1,
 explanation: "Потрібна база Arena.",
 },
 ],
 },
}

export const ukLesson82 = {
 lessonId: "lesson-roblox-8-2",
 moduleId: "module-08",
 order: 2,
 title: "8.2 - Tool + Animation",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати Tool з Handle і зрозумілим Grip",
 "Приварити клинок/меш до Handle (Weld/WeldConstraint)",
 "Програти анімацію удару з LocalScript при Activated",
 "Підготувати Tool до серверного урону в 8.3 (екіпірування, Touched-зона)",
 "Покласти Tool у StarterPack, щоб він повертався після респавну",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 58 з 92)",
 content: `У **8.1** є арена і Health. Сьогодні даєш гравцю **зброю в руках**: Tool + мах анімації. Урон ще можна не рахувати чесно - це 8.3. Сьогодні - **відчути меч**.

Артефакт уроку:
1. Tool \`ArenaSword\` з Part \`Handle\`.
2. Клинок приварений, не відлітає.
3. При кліку/активації грає анімація удару (LocalScript).
4. Tool у **StarterPack** (або чітка інструкція як видати).

Без Tool завтрашній dealDamage ні до чого чіпляти. Без анімації бій виглядає як «невидима рука».

**Зроби зараз (2 хв):** виріши форму - простий Part-клинок чи Mesh. Для здачі Part достатньо.`,
 },
 {
 title: "Що таке Tool у Roblox",
 content: `| Елемент | Роль |
|---------|------|
| **Tool** | Об’єкт у Backpack / руці |
| **Handle** | Обов’язковий Part - за що тримаєш |
| **Activated** | Подія «використали інструмент» |
| **Equipped / Unequipped** | Взяли / сховали |

Tool - **предмет у хотбарі**. Handle - **ручка**. Без Handle Tool часто не екіпірується нормально.

Імена:
- Tool.Name = \`ArenaSword\` (видно в інвентарі)
- Всередині обов’язково Part з іменем **\`Handle\`** (саме так)

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "Збірка Handle і клинка",
 content: `1. Insert → Tool у StarterPack (або збережи в ServerStorage і клонуй - для старту StarterPack простіше).
2. Додай Part, назви \`Handle\` - розмір орієнтовно 1×1×3.
3. Додай Part \`Blade\` (довший, тонший).
4. Вирівняй Blade відносно Handle.
5. \`WeldConstraint\` між Handle і Blade (або Weld).
6. CanCollide на клінку часто false на старті (менше штовханини); для Touched-урону завтра можна окремий hitbox.

**Grip** (властивості Tool): підкрути GripPos / GripForward, щоб меч не стирчав боком з руки. Це 5–10 хв крутіння в Play - нормально.

**Зроби зараз (10 хв):** екіпіруєш Tool, меч видно в руці, модель не розсипається.`,
 },
 {
 title: "Weld - чому клинок інакше відлітає",
 content: `| Симптом | Фікс |
|---------|------|
| Blade падає окремо | Немає Weld до Handle |
| Все Anchored у руці | Зніми Anchored з Parts Tool |
| Клинок у підлозі | Grip / орієнтація Handle |
| Подвійний меч | Два Tool в StarterPack |

Правило: у екіпірованому Tool фізику тримає збірка + персонаж. Не лишай Anchored=true на Handle «для зручності» назавжди - у руці виглядатиме зламано.

Якщо використовуєш MeshPart - той самий Weld до Handle.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "Анімація удару: звідки взяти",
 content: `Варіанти школи:
1. **Власна** анімація в Animation Editor (R15) - експорт, AnimationId.
2. **Навчальний ID** від ментора / шаблону курсу (якщо є список).
3. **Lite без кастомної анімації:** коротко крутни Tool.Grip або tween клинка - гірше, але краще ніж нічого; все одно плануй AnimationId.

Робочий шлях:
- Створи Animation об’єкт (або використай \`Instance.new("Animation")\`).
- \`Animation.AnimationId = "rbxassetid://..."\`
- У Character: \`Humanoid.Animator:LoadAnimation(anim)\`
- \`track:Play()\`

Перевір R6 vs R15: анімація має відповідати ригу аватара в Game Settings.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "LocalScript у Tool",
 content: `Під Tool додай **LocalScript** \`SwingClient\`:

\`local tool = script.Parent\`
\`local anim = Instance.new("Animation")\`
\`anim.AnimationId = "rbxassetid://YOUR_ID"\`

\`local track\`
\`tool.Equipped:Connect(function()\`
\` local char = tool.Parent\`
\` local hum = char:WaitForChild("Humanoid")\`
\` local animator = hum:FindFirstChildOfClass("Animator") or Instance.new("Animator", hum)\`
\` track = animator:LoadAnimation(anim)\`
\`end)\`

\`tool.Activated:Connect(function()\`
\` if track then track:Play() end\`
\`end)\`

Чому LocalScript: анімація персонажа зручно стартує на клієнті власника. Урон завтра - **окремо на сервері**.

Не клади TakeDamage у цей LocalScript як фінальну правду.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Activated, debounce анімації",
 content: `Спам кліків = ламаний mash анімацій.

\`local swinging = false\`
\`tool.Activated:Connect(function()\`
\` if swinging then return end\`
\` swinging = true\`
\` track:Play()\`
\` task.delay(0.5, function() swinging = false end)\`
\`end)\`

0.5 с узгодь з довжиною кліпу. У 8.3 серверний HIT_COOLDOWN може бути схожим - тоді відчуття «мах = удар» збігається.

Tool.RequiresHandle = true зазвичай. Tool.CanBeDropped - виріши: для арени часто false, щоб не кидали меч у void.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "Підготовка hitbox до 8.3",
 content: `Сьогодні можна:
- залишити Handle.Touched на потім;
- або додати невидимий Part \`Hitbox\` з Weld, CanCollide false, трохи більший за клинок.

Не реалізуй повний dealDamage сьогодні, якщо час кінчається - але **імена готові**:
- Tool \`ArenaSword\`
- Handle
- (опційно) Hitbox

У нотатці: «завтра сервер слухає Touched / Remote від цього Tool».

**Зроби зараз (5 хв):** у Explorer структура чиста; ментор знаходить Tool за 5 с.`,
 },
 {
 title: "StarterPack і респавн",
 content: `StarterPack клонує Tool у Backpack кожного гравця при старті / часто після респавну.

Перевір:
1. Play → меч у хотбарі.
2. (Якщо вже вмієш) смерть/ресет → Tool повертається.

Якщо Tool лише в Workspace - гравець його не отримає автоматично.

ServerStorage шаблон + скрипт видачі - альтернатива для пізніших модулів; сьогодні StarterPack = найшвидший шлях.

Після 8.5 (смерть/респавн) саме StarterPack зазвичай поверне меч без зайвого коду. Якщо покладеш Tool лише в Backpack скриптом один раз - після смерті можеш «втратити» зброю і здивуватись на Ship.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "Playtest Tool",
 content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Play | ArenaSword у інвентарі |
| 2 | Екіпірувати | Меч у руці, Weld цілий |
| 3 | Activated | Анімація маху (або lite-рух) |
| 4 | Спам кліків | Debounce тримає |
| 5 | Unequip / Equip знову | Track не крашиться |
| 6 | Output | Немає помилок Animator/AnimationId |

Якщо анімація не грає: перевір AnimationId, R15/R6, чи є Animator, чи Equipped встиг Load.  
Якщо меч не в інвентарі: Tool не в StarterPack або RequiresHandle без Handle.  
Якщо клинок у підлозі: Grip + Pivot моделі, не одразу пиши новий LocalScript.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Типові дірки збірки",
 content: `| Симптом | Причина | Фікс |
|---------|---------|------|
| «Tool requires a Handle» | Немає Part Handle | Назви саме Handle |
| Меч в зубах / ногах | Grip | Крути Grip у Play |
| Анімація чужого ригу | R6 anim на R15 | Інший ID / риг |
| Скрипт на сервері грає anim погано | Не той контекст | LocalScript у Tool |
| Два мечі | Дубль у StarterPack | Залиш один |

Не витрачай годину на ідеальний скін. **Екіпірується + мах є** - здано для 8.2.

Зв’язок з 8.3: коли мах вже стабільний, серверний урон «сяде» на той самий ритм debounce. Якщо сьогодні спам анімації - завтра спам Touched буде ще гірший.

**Зроби зараз (3 хв):** знайди в Place один симптом з таблиці і виправ або підтверди, що його немає.`,
 },
 {
 title: "Чекліст здачі уроку 58",
 content: `- [ ] Tool ArenaSword з Handle
- [ ] Клинок на Weld
- [ ] Grip прийнятний у руці
- [ ] LocalScript: Activated → Play анімації (або чесний lite)
- [ ] Debounce маху
- [ ] StarterPack
- [ ] Playtest 1–3 зелені
- [ ] Save: Lesson 8.2 - Arena Tool

Далі **8.3** повісить dealDamage на цей Tool. Не пиши Health=0 у сьогоднішньому LocalScript «щоб швидше» - зламаєш звичку Never trust client.

Артефакт: **меч у руці з махом**. Арена більше не беззбройна. Якщо ментор за 10 с знаходить Tool у StarterPack і бачить мах у Play - урок зданий.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Part не названий Handle",
 explanation: "Tool не екіпірується коректно.",
 correctApproach: "Саме ім’я Handle",
 },
 {
 mistake: "Урон Health у LocalScript Tool",
 explanation: "Обхід сервера; погано для 8.3.",
 correctApproach: "Сьогодні лише анімація; урон завтра на сервері",
 },
 {
 mistake: "Немає Weld - клинок окремо",
 explanation: "Модель розвалюється.",
 correctApproach: "WeldConstraint до Handle",
 },
 {
 mistake: "Анімація без debounce",
 explanation: "Каша треків.",
 correctApproach: "swinging flag + delay",
 },
 {
 mistake: "Tool лише в Workspace",
 explanation: "Гравець не отримує зброю.",
 correctApproach: "StarterPack",
 },
 {
 mistake: "Wrong rig AnimationId",
 explanation: "Тихе «нічого не грає».",
 correctApproach: "R15/R6 узгодити з грою",
 },
 ],
 summary: "Ти зібрав ArenaSword: Handle, Weld клинка, LocalScript анімації на Activated і StarterPack. Меч готовий до серверного dealDamage в 8.3 - без клієнтського Health=0.",
 practiceTask: {
 title: "Меч арени (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** екіпірувати Tool і побачити мах удару.

### Part A - Модель (12 хв)
1. Tool у StarterPack з Handle.
2. Blade + WeldConstraint.
3. Grip підкрутити в Play.

### Part B - Анімація (12 хв)
1. LocalScript SwingClient.
2. LoadAnimation на Equipped.
3. Activated + debounce 0.4–0.6 с.

### Part C - Перевірка (6 хв)
1. Playtest таблиця 1–4.
2. Структура імен чиста.
3. **Save:** Lesson 8.2 - Arena Tool`,
 hints: [
 "Спочатку меч у руці без анімації - потім ID",
 "print('activated') якщо не певний, що кліки доходять",
 "CanBeDropped = false зручно для арени",
 ],
 optionalChallenge: "Короткий Sound «whoosh» на Activated (один Sound у Tool, Play).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 8.2?",
 options: [
          "Зібрати Tool з Handle і анімацією удару",
          "Написати повний анти-чит магазин",
          "Видалити арену",
          "Зробити лише waveConfig",
        ],
 correctAnswer: 0,
 explanation: "Tool + animation.",
 },
 {
 id: "q2",
 type: MC,
 question: "Як має називатись Part хвата в Tool?",
 options: [
          "SwordTipOnly",
          "Handle",
          "Humanoid",
          "SpawnLocation",
        ],
 correctAnswer: 1,
 explanation: "Обов’язкове ім’я.",
 },
 {
 id: "q3",
 type: MC,
 question: "Навіщо Weld між Handle і Blade?",
 options: [
          "Щоб вимкнути анімацію",
          "Це створює RemoteEvent",
          "Щоб клинок не відлітав від ручки",
          "Weld замінює StarterPack",
        ],
 correctAnswer: 2,
 explanation: "Зв’язок моделі.",
 },
 {
 id: "q4",
 type: MC,
 question: "Де зручно тримати скрипт анімації маху?",
 options: [
          "Лише в Terrain",
          "У Lighting як єдиний варіант",
          "У SoundService без Tool",
          "LocalScript у Tool",
        ],
 correctAnswer: 3,
 explanation: "Клієнтський мах.",
 },
 {
 id: "q5",
 type: MC,
 question: "Яка подія Tool запускає удар по кліку?",
 options: [
          "Touched неба",
          "Activated",
          "PlayerRemoving",
          "BindToClose",
        ],
 correctAnswer: 1,
 explanation: "Activated.",
 },
 {
 id: "q6",
 type: MC,
 question: "Навіщо StarterPack?",
 options: [
          "Видалити Humanoid",
          "Створити хвилі",
          "Автоматично дати Tool гравцю",
          "Замінити MaxHealth",
        ],
 correctAnswer: 2,
 explanation: "Видача зброї.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чому не ставити Health=0 у LocalScript Tool сьогодні?",
 options: [
          "Урон має бути на сервері в 8.3; клієнт не суддя",
          "Health не існує",
          "Tool тоді не екіпірується",
          "Анімація забороняє числа",
        ],
 correctAnswer: 0,
 explanation: "Never trust client.",
 },
 {
 id: "q8",
 type: MC,
 question: "Навіщо debounce на Activated?",
 options: [
          "Збільшити MaxHealth",
          "Вимкнути Weld",
          "Створити Arena",
          "Не спамити анімацію маху",
        ],
 correctAnswer: 3,
 explanation: "Чистий мах.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що крутити, якщо меч стирчить з руки криво?",
 options: [
          "Лише Skybox",
          "Назву модуля 1",
          "Grip Tool (позиція/орієнтація)",
          "Видалити Handle",
        ],
 correctAnswer: 2,
 explanation: "Grip.",
 },
 {
 id: "q10",
 type: MC,
 question: "Коли вантажити Animation track зручно?",
 options: [
          "Лише в Menu Studio без Play",
          "На Equipped (коли Tool у Character)",
          "У PlayerRemoving завжди",
          "Тільки після Publish",
        ],
 correctAnswer: 1,
 explanation: "Equipped.",
 },
 {
 id: "q11",
 type: MC,
 question: "Як 8.2 готує 8.3?",
 options: [
          "8.3 видаляє всі Tool",
          "Анімація замінює сервер",
          "StarterPack забороняє урон",
          "Є Tool/Handle для серверного хіту і dealDamage",
        ],
 correctAnswer: 3,
 explanation: "Зброя готова.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що буде, якщо AnimationId від не того ригу?",
 options: [
          "Часто анімація просто не відтворюється коректно",
          "Обов’язково видалиться Baseplate",
          "MaxHealth стане 0",
          "Studio закриється завжди",
        ],
 correctAnswer: 0,
 explanation: "R6/R15.",
 },
 {
 id: "q13",
 type: MC,
 question: "CanBeDropped = false на арені означає…",
 options: [
          "Tool не можна екіпірувати",
          "Анімація вимкнена",
          "Гравець не кине Tool на землю легко",
          "Weld знищено",
        ],
 correctAnswer: 2,
 explanation: "Не губити меч.",
 },
 {
 id: "q14",
 type: MC,
 question: "Мінімум для здачі без кастомної анімації?",
 options: [
          "Порожній Tool без Handle",
          "Лише назва Sword у Workspace",
          "Health=0 на клієнті",
          "Чесний lite-рух/твін + робочий Tool у руці (краще з AnimationId)",
        ],
 correctAnswer: 3,
 explanation: "Краще анімація, але меч обов’язковий.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 8.2?",
 options: [
          "Лише теорія",
          "Tool у руці з махом + StarterPack + Save",
          "Порожній Baseplate",
          "Урон лише клієнтський Health",
        ],
 correctAnswer: 1,
 explanation: "Потрібен меч.",
 },
 ],
 },
}

export const ukLesson83 = {
 lessonId: "lesson-roblox-8-3",
 moduleId: "module-08",
 order: 3,
 title: "8.3 - dealDamage на сервері",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Написати function dealDamage на сервері (Humanoid, amount, source)",
 "Пояснити Never trust client: клієнт не пише Health ворогу напряму",
 "Додати lite-перевірки: тип amount, cooldown, відстань, живий target",
 "Підключити хіт Tool до серверного урону (Touched або Remote lite)",
 "Показати антиприклад «клієнт сам убив усіх» і чому це дірка",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 59 з 92)",
 content: `У **8.1** є Health на арені. У **8.2** Tool махає. Сьогодні з’єднуєш їх чесно: **урон живе на сервері**.

Артефакт уроку:
1. Function \`dealDamage(humanoid, amount, sourcePlayer)\` у Script (SSS) або ModuleScript.
2. Успішний удар з Tool реально зменшує HP **через цю функцію**.
3. Lite-захист: cooldown + перевірка що target живий + (бажано) відстань.
4. Антиприклад: LocalScript, що ставить \`Health = 0\`, **не** є здачею.

Це якір модуля Arena. Без нього 8.4–8.8 будують феєрверки й хвилі на піску.

**Зроби зараз (2 хв):** напиши одним реченням, хто в спорті ставить рахунок - суддя чи вболівальник з телефоном. Це сервер vs клієнт.`,
 },
 {
 title: "Never trust client - правило арени",
 content: `| Клієнт може | Сервер вирішує |
|-------------|----------------|
| Показати анімацію удару | Скільки HP зняти |
| Надіслати «я вдарив X» | Чи X взагалі в зоні |
| Малювати іскри (пізніше) | Чи не спам ударів |
| Брехати | Правду світу |

клієнт - **гравець з джойстиком**. Сервер - **суддя**. Джойстик не пише голи у протокол.

У Solo Studio легко забути різницю: ти і сервер, і клієнт в одному вікні. Уявий друга з експлойтом - він змінить LocalScript за секунду. Тому Health ворога **ніколи** не є «правдою клієнта».

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Антиприклад: клієнт убиває сам",
 content: `Поганий LocalScript (НЕ копіюй у здачу):

\`local hum = workspace.Arena.Dummy.Humanoid\`
\`hum.Health = 0\`

Що відбувається в навчанні:
- У Solo «працює» - здається, що бій готовий.
- У мережі / з чітом - будь-хто чистить арену без меча.

Демо для себе (5 хв):
1. Зроби цей рядок у тимчасовому LocalScript.
2. Побач, що dummy падає.
3. **Видали** скрипт.
4. Заміни шляхом: хіт → сервер → dealDamage.

Цей контраст важливіший за ідеальний particle.

**Зроби зараз (3 хв):** знайди в Place один симптом з таблиці і виправ або підтверди, що його немає.`,
 },
 {
 title: "Сигнатура dealDamage",
 content: `\`local function dealDamage(humanoid, amount, sourcePlayer)\`
\` if typeof(humanoid) ~= "Instance" then return false end\`
\` if not humanoid:IsA("Humanoid") then return false end\`
\` if humanoid.Health <= 0 then return false end\`
\` if typeof(amount) ~= "number" then return false end\`
\` if amount <= 0 then return false end\`
\` -- далі cooldown / distance\`
\` humanoid:TakeDamage(amount)\`
\` -- або: humanoid.Health = math.max(0, humanoid.Health - amount)\`
\` return true\`
\`end\`

Чому \`return true/false\`:
- 8.4 викличе Fx лише після \`true\`.
- Легше логувати невдалі хіти в Output.

\`TakeDamage\` враховує деякі захисти движка; прямий \`Health =\` теж ок для навчання, якщо свідомо.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Cooldown на джерело удару",
 content: `Без cooldown спам Touched/Remote = тисяча урону за секунду.

\`local lastHit = {} -- [player] = os.clock()\`
\`local HIT_COOLDOWN = 0.4\`

\`local function canHit(player)\`
\` local now = os.clock()\`
\` local t = lastHit[player]\`
\` if t and now - t < HIT_COOLDOWN then return false end\`
\` lastHit[player] = now\`
\` return true\`
\`end\`

У dealDamage / перед ним:

\`if sourcePlayer and not canHit(sourcePlayer) then return false end\`

\`PlayerRemoving\`: \`lastHit[player] = nil\`.

Число 0.4 узгодь пізніше з анімацією з 8.2 і балансом 8.7. Сьогодні головне - **є** серверний ліміт.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Перевірка відстані (lite)",
 content: `Навіть без повного Raycast:

\`local MAX_RANGE = 10\`

\`local function nearEnough(attackerChar, targetHum)\`
\` local a = attackerChar and attackerChar:FindFirstChild("HumanoidRootPart")\`
\` local t = targetHum.Parent and targetHum.Parent:FindFirstChild("HumanoidRootPart")\`
\` if not a or not t then return false end\`
\` return (a.Position - t.Position).Magnitude <= MAX_RANGE\`
\`end\`

Викликай перед TakeDamage. Якщо клієнт каже «вдарив боса за 200 studs» - \`return false\`.

Це той самий м’яз, що в Race (nearFinish) і в магазині (не вірити ціні). Сьогодні - арени.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Звідки брати сигнал хіту",
 content: `| Спосіб | Рівень | Нотатка |
|--------|--------|---------|
| **Handle.Touched** на сервері (Tool у Character) | Простий старт | Багато спаму - потрібен cooldown + фільтр |
| **RemoteEvent** «Attack» + сервер сам шукає ціль у радіусі | Чистіше | Трохи більше коду |
| Клієнт шле «пошкодь ось цього Humanoid на 999» | Погано | Never trust amount/target сліпо |

Рекомендація курсу на сьогодні:
1. Tool з 8.2 у руках.
2. Сервер слухає Touched **або** Remote без довіри до amount з клієнта.
3. Amount береться з **константи** \`DAMAGE = 20\`, не з аргумента клієнта.

\`local DAMAGE = 20\` -- одне джерело правди

**Зроби зараз (4 хв):** зроби один Remote-виклик і зафіксуй, хто приймає рішення - клієнт чи сервер.`,
 },
 {
 title: "Touched на сервері: мінімальний шлях",
 content: `Коли Tool екіпірується, Character має Handle. На сервері (часто через збір Tool.Equipped / Character):

\`handle.Touched:Connect(function(hit)\`
\` local character = handle.Parent.Parent -- Tool.Parent = Character\`
\` local player = Players:GetPlayerFromCharacter(character)\`
\` if not player then return end\`
\` local victimChar = hit.Parent\`
\` local victimHum = victimChar and victimChar:FindFirstChildOfClass("Humanoid")\`
\` if not victimHum then return end\`
\` if victimChar == character then return end -- не бий себе\`
\` dealDamage(victimHum, DAMAGE, player)\`
\`end)\`

Фільтри обов’язкові: не Part підлоги, не свій Humanoid, не труп (\`Health <= 0\` вже в dealDamage).

Touched спамить - тому cooldown у dealDamage критичний.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "ModuleScript DamageService (опційно, але корисно)",
 content: `\`ServerScriptService/Modules/DamageService\` ModuleScript:

\`local DamageService = {}\`
\`local DAMAGE = 20\`
\`-- lastHit, dealDamage як вище\`
\`function DamageService.apply(humanoid, sourcePlayer, amount)\`
\` return dealDamage(humanoid, amount or DAMAGE, sourcePlayer)\`
\`end\`
\`return DamageService\`

Інший Script:

\`local DamageService = require(path)\`
\`DamageService.apply(hum, player)\`

Плюс: 8.6 хвилі, 8.7 баланс, 8.4 Fx - усі \`require\` одне API.  
Мінус сьогодні: можна лишити одну function у Script, якщо Module ще важкий - але table BALANCE вже думай як на майбутнє.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Що клієнту все ж можна",
 content: `| На клієнті OK | На клієнті НЕ ok |
|---------------|------------------|
| Анімація маху (8.2) | \`enemy.Humanoid.Health = 0\` |
| Звук удару локально | Встановити MaxHealth ворога |
| Прохання «атакую» FireServer | Надіслати amount=999999 як правду |
| UI свого HP (реплікація) | Вважати промах хітом для урону |

Після успішного серверного урону Health реплікується - клієнт **побачить** падіння смуги. Йому не треба писати Health самому.

**Зроби зараз (5 хв):** спробуй у Play змінити Health dummy з клієнтського вікна властивостей під час тесту - у справжній грі це інший шар; важливіше: твій **код** здачі не робить цього.`,
 },
 {
 title: "Логування для дебагу",
 content: `Тимчасово:

\`print(player.Name, "hit", humanoid.Parent.Name, "hp", humanoid.Health)\`

Або при \`return false\`:

\`print("deny", reason)\` -- "cooldown" / "range" / "dead"

На здачу вимкни зайвий спам або залиш 1 рядок. Ментор за 10 с бачить: удар → dealDamage → HP.

Не дебаж лише очима анімації: анімація може грати при \`return false\`.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Playtest Never trust",
 content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Чесний удар Tool | HP падає на сервері |
| 2 | Спам ударів | Не швидше за cooldown |
| 3 | Удар здалеку (якщо range є) | deny |
| 4 | Удар по собі / підлозі | Немає урону |
| 5 | Тимчасовий клієнтський Health=0 | Розумієш дірку; у здачі цього коду немає |
| 6 | Dummy Health ≤ 0 | Повторні хіти не мінусують далі |
| 7 | Output | Без крашу на nil Humanoid |

Пункти 1–2 - мінімум здачі. Пункт 5 - розуміння правила.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Чекліст здачі уроку 59",
 content: `- [ ] dealDamage на сервері (function / Module)
- [ ] Amount з константи сервера, не «правда клієнта»
- [ ] Cooldown на sourcePlayer
- [ ] Фільтр живого Humanoid / не себе
- [ ] (Lite) перевірка відстані
- [ ] Tool хіт викликає dealDamage
- [ ] Немає здавального LocalScript Health=0
- [ ] Playtest 1–2, 4 зелені
- [ ] Save: Lesson 8.3 - Server Damage

Далі **8.4** повісить Fx на \`return true\`. **8.5** додасть Died. **8.7** підкрутить DAMAGE. Усе тримається на сьогоднішній функції.

Артефакт: **суддя арени**. Без нього меч - лише анімація.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Humanoid.Health = … у LocalScript як урон",
 explanation: "Чіт і розсинхрон; Never trust client.",
 correctApproach: "dealDamage на сервері",
 },
 {
 mistake: "Вірити amount з FireServer без перевірки",
 explanation: "Клієнт надішле 999999.",
 correctApproach: "Константа DAMAGE на сервері",
 },
 {
 mistake: "Немає cooldown на Touched",
 explanation: "Миттєве вбивство спамом.",
 correctApproach: "lastHit[player] + HIT_COOLDOWN",
 },
 {
 mistake: "Бити себе / підлогу як Humanoid",
 explanation: "Дивний урон і логи.",
 correctApproach: "Фільтр victim ~= self, IsA Humanoid",
 },
 {
 mistake: "dealDamage повертає void, Fx завжди грає",
 explanation: "Феєрверк на deny.",
 correctApproach: "return true/false",
 },
 {
 mistake: "Забути PlayerRemoving для lastHit",
 explanation: "Витік посилань / дивні ключі.",
 correctApproach: "lastHit[player] = nil",
 },
 ],
 summary: "Ти зібрав якір арени: function dealDamage на сервері з cooldown і lite-валідацією. Клієнт може махати Tool, але HP змінює лише суддя. Це база для Fx, смерті, хвиль і балансу.",
 practiceTask: {
 title: "Суддя урону (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** удар Tool знімає HP лише через серверний dealDamage.

### Part A - Function (10 хв)
1. dealDamage з перевірками typeof / Health / amount.
2. Константа DAMAGE.
3. return true/false + print для дебагу.

### Part B - Cooldown і range (10 хв)
1. lastHit table + HIT_COOLDOWN.
2. Magnitude lite до target.
3. PlayerRemoving чистить lastHit.

### Part C - Підключення Tool (10 хв)
1. Touched або Remote → dealDamage.
2. Антиприклад Health=0 видалений.
3. **Save:** Lesson 8.3 - Server Damage`,
 hints: [
 "Спочатку кнопка на сервері викликає dealDamage по dummy - потім Tool",
 "print deny reason економить 20 хв здогадок",
 "DAMAGE одне число - не копіпаста 20 у трьох місцях",
 ],
 optionalChallenge: "ModuleScript DamageService.apply + require з одного бойового Script.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 8.3?",
 options: [
          "Зробити серверний dealDamage і не довіряти клієнту HP",
          "Видалити Tool",
          "Побудувати лише Particles",
          "Publish без арени",
        ],
 correctAnswer: 0,
 explanation: "Never trust client.",
 },
 {
 id: "q2",
 type: MC,
 question: "Чому LocalScript Health=0 - погана здача?",
 options: [
          "Health не існує в Roblox",
          "Клієнт може чітити й ламати бій",
          "LocalScript не вміє print",
          "Це обов’язково для Tween",
        ],
 correctAnswer: 1,
 explanation: "Антиприклад.",
 },
 {
 id: "q3",
 type: MC,
 question: "Звідки брати число урону?",
 options: [
          "Сліпо з будь-якого числа клієнта",
          "З назви Part небо",
          "З константи/конфігу на сервері",
          "З Volume Sound",
        ],
 correctAnswer: 2,
 explanation: "Серверна правда.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо cooldown у dealDamage?",
 options: [
          "Щоб змінити Skybox",
          "Це вимикає Humanoid",
          "Cooldown малює Billboard",
          "Щоб спам Touched/ударів не знімав HP миттєво",
        ],
 correctAnswer: 3,
 explanation: "Rate limit.",
 },
 {
 id: "q5",
 type: MC,
 question: "Навіщо перевірка Magnitude?",
 options: [
          "Збільшити MaxHealth",
          "Відхилити удар «через пів карти»",
          "Створити RemoteFunction",
          "Замінити Tool",
        ],
 correctAnswer: 1,
 explanation: "Lite range.",
 },
 {
 id: "q6",
 type: MC,
 question: "Що повертає вдалий dealDamage у шаблоні уроку?",
 options: [
          "Завжди nil і краш",
          "Лише Color3",
          "true (щоб Fx/логи знали про успіх)",
          "SpawnLocation",
        ],
 correctAnswer: 2,
 explanation: "true/false API.",
 },
 {
 id: "q7",
 type: MC,
 question: "Хто такий «суддя» в метафорі уроку?",
 options: [
          "Сервер",
          "Лише LocalScript UI",
          "Sky",
          "Toolbox Decal",
        ],
 correctAnswer: 0,
 explanation: "Сервер вирішує.",
 },
 {
 id: "q8",
 type: MC,
 question: "Чи можна лишити анімацію удару на клієнті?",
 options: [
          "Ні - будь-яка анімація заборонена",
          "Анімація автоматично пише Health",
          "Анімація замінює dealDamage",
          "Так - візуал ок, урон все одно на сервері",
        ],
 correctAnswer: 3,
 explanation: "Розділення ролей.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що зробити в PlayerRemoving для lastHit?",
 options: [
          "Видалити Workspace",
          "Вимкнути Pathfinding",
          "Очистити запис гравця",
          "Обов’язково Publish",
        ],
 correctAnswer: 2,
 explanation: "Прибирання стану.",
 },
 {
 id: "q10",
 type: MC,
 question: "Чому фільтрувати удар по собі?",
 options: [
          "Свій Humanoid не існує",
          "Інакше можна дамажити власний Humanoid помилково",
          "Tool тоді зникає",
          "Сервер забороняє Character",
        ],
 correctAnswer: 1,
 explanation: "victim ~= self.",
 },
 {
 id: "q11",
 type: MC,
 question: "Як 8.3 готує 8.4?",
 options: [
          "Particles замінюють урон",
          "8.4 видаляє серверні скрипти",
          "Tween пише Health",
          "Fx викликають після return true від dealDamage",
        ],
 correctAnswer: 3,
 explanation: "Спочатку урон, потім вау.",
 },
 {
 id: "q12",
 type: MC,
 question: "Який ризик Remote, де клієнт шле amount?",
 options: [
          "Підроблений великий урон",
          "Remote тоді не компілюється",
          "Humanoid стає Part",
          "Обов’язковий краш Studio",
        ],
 correctAnswer: 0,
 explanation: "Не вірити amount.",
 },
 {
 id: "q13",
 type: MC,
 question: "Навіщо ModuleScript DamageService?",
 options: [
          "Він вимикає Arena",
          "Без модуля Tool не існує",
          "Один API урону для хвиль/балансу/різних скриптів",
          "Module завжди на клієнті лише",
        ],
 correctAnswer: 2,
 explanation: "Повторне використання.",
 },
 {
 id: "q14",
 type: MC,
 question: "Що перевірити, якщо анімація грає, а HP стоїть?",
 options: [
          "Лише колір меча",
          "Назву модуля 12",
          "Вимкнути Output",
          "Чи взагалі викликається dealDamage і чи не deny",
        ],
 correctAnswer: 3,
 explanation: "Дебаг урону.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 8.3?",
 options: [
          "Лише клієнтський Health=0",
          "Серверний dealDamage з Tool + захист lite + Save",
          "Порожній Baseplate",
          "Тільки теорія без Play",
        ],
 correctAnswer: 1,
 explanation: "Потрібен суддя урону.",
 },
 ],
 },
}

export const ukLesson84 = {
 lessonId: "lesson-roblox-8-4",
 moduleId: "module-08",
 order: 4,
 title: "8.4 - TweenService + Particles",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зробити короткий Tween на хіт (розмір/прозорість/колір Part)",
 "Додати ParticleEmitter burst при влучанні",
 "Підключити feedback до моменту серверного dealDamage (не замість нього)",
 "Прибрати ефекти після відтворення (Destroy / Enabled=false), без лагу",
 "Підготувати «відчутний» удар до смерті/респавну і хвиль",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 60 з 92)",
 content: `У **8.3** урон уже чесний на сервері. Сьогодні додаєш **відчуття удару**: гравець має бачити, що влучив, не лише вірити цифрі HP.

Артефакт уроку:
1. Мінімум **один Tween** на хіт (наприклад, Part «спалах» або короткий scale кузова dummy).
2. Мінімум **один ParticleEmitter** burst (іскри / пил / «кров»-lite кольором).
3. Ефект стартує в момент успішного урону (після dealDamage або з серверного сигналу).
4. Cleanup: ефект не живе вічно і не плодить 500 емітерів.

Без feedback бій «німий». З feedback Ship-демо в 8.8 виглядає живим навіть на 2 хвилях.

**Зроби зараз (2 хв):** виріши один стиль - «іскра металу» чи «зелений слиз» під твого ворога.`,
 },
 {
 title: "Feedback ≠ урон",
 content: `| Урон (8.3) | Feedback (сьогодні) |
|------------|---------------------|
| Змінює Health на сервері | Показує влучання очам |
| dealDamage | Tween + Particles |
| Правда бою | Спектакль бою |
| Без цього бій читерний/мертвий | Без цього бій сухий |

урон - **суддя зняв очки**. Tween/particles - **феєрверк на табло**. Феєрверк без судді - обман; суддя без феєрверка - нудно.

Правило: **спочатку** успішний dealDamage, **потім** ефект. Не навпаки («гарно блиснуло» але HP стоїть).

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "TweenService за 5 хвилин",
 content: `\`local TweenService = game:GetService("TweenService")\`

\`local info = TweenInfo.new(\`
\` 0.15, -- час\`
\` Enum.EasingStyle.Quad,\`
\` Enum.EasingDirection.Out\`
\`)\`

\`local tween = TweenService:Create(part, info, { Transparency = 0.5, Size = part.Size * 1.1 })\`
\`tween:Play()\`

Типові властивості для хіту:
- \`Transparency\`, \`Color\`, \`Size\`, \`CFrame\` (обережно з фізикою)

Для «спалаху»:
1. Clone маленького Part у точку удару.
2. Tween Transparency 0 → 1.
3. На \`Completed\` → Destroy.

Не твінь Humanoid.Health - Health не для Tween; це справа dealDamage.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "ParticleEmitter: burst, не вічний дим",
 content: `На Part-якорі (або Attachment у Character):

\`local p = Instance.new("ParticleEmitter")\`
\`p.Texture = "rbxasset://textures/particles/sparkles_main.dds" -- або твій asset\`
\`p.Rate = 0 -- не постійний потік\`
\`p.Lifetime = NumberRange.new(0.3, 0.6)\`
\`p.Speed = NumberRange.new(4, 10)\`
\`p.Parent = anchor\`

Burst:

\`p:Emit(20)\`

Або короткий Enabled:

\`p.Enabled = true\`
\`task.delay(0.2, function() p.Enabled = false end)\`

| Режим | Коли |
|-------|------|
| \`Emit(n)\` | Один удар - ідеально |
| \`Enabled\` постійно | Аура / зона - не кожен хіт |
| Новий Emitter на кожен кадр | Лаг - **не роби** |

**Зроби зараз (8 хв):** кнопка/удар → Emit(15) один раз, без спаму.`,
 },
 {
 title: "Де запускати ефект: клієнт чи сервер",
 content: `| Підхід | Плюс | Мінус |
|--------|------|-------|
| **Сервер** створює Part/Particle | Просто в одному Script з dealDamage | Трохи важче для мережі / всі бачать однаково |
| **Сервер** FireClient «хіт тут» → LocalScript ефект | Легший клієнтський polish | Потрібен Remote (якщо вже є) |
| **Лише LocalScript** без урону | Гарно, але брехня | Не для правди HP |

Для модуля Arena сьогодні ок:
- мінімум: ефект у тому ж серверному шляху після TakeDamage;
- або LocalScript слухає зміну Health / свій hit-detect **плюс** серверний урон окремо (обережно з розсинхроном).

Якщо Remotes ще страшні - роби серверний спалах Part. Краса прийде; чесність уже є з 8.3.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Точка удару і якір ефекту",
 content: `Звідки брати позицію:
1. \`targetPart.Position\` (HumanoidRootPart / UpperTorso).
2. Результат hit-detect Tool (Handle.Touched → hit.Position) - з валідацією на сервері.
3. Attachment \`HitFx\` у моделі ворога.

Шаблон спалаху:

\`local fx = Instance.new("Part")\`
\`fx.Size = Vector3.new(0.4, 0.4, 0.4)\`
\`fx.Anchored = true\`
\`fx.CanCollide = false\`
\`fx.Material = Enum.Material.Neon\`
\`fx.CFrame = CFrame.new(position)\`
\`fx.Parent = workspace.Arena.Fx\`
\`-- Particle на fx + Tween Transparency\`
\`task.delay(0.4, function() fx:Destroy() end)\`

Папка \`Arena.Fx\` допомагає не губити сміття в Explorer під час дебагу.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Зв’язок з анімацією Tool (8.2)",
 content: `Порядок «смачного» удару:
1. Гравець активує Tool (анімація маху).
2. Вікно хіту / Touched / remote hit.
3. Сервер \`dealDamage\` успішний.
4. **Тоді** Tween + Emit.

Якщо ефект на початку анімації завжди - буде «феєрверк по повітрю» без урону.  
Якщо ефект без анімації - теж ок для здачі, але гірший juice.

Lite: навіть без идеальної синхронізації кадрів - ефект **після** успішного урону вже проходить рубрику Ship «є feedback».

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Cleanup і продуктивність",
 content: `| Погано | Добре |
|--------|-------|
| Emitter Enabled назавжди на кожному ворогові ×50 | Emit(n) на хіт |
| Tween без Destroy якоря | Completed / delay → Destroy |
| 200 Parts-спалахів за хвилину без cleanup | Ліміт / одна Fx-папка |
| Tween фізичного кузова ворога кожен кадр | Короткий 0.1–0.2 с або окремий Fx Part |

Правило: кожен створений Fx **має план смерті** (час життя < 1 с для хіт-спалаху).

Playtest на хвилі (коли з’явиться 8.6): після 30 ударів Explorer не повинен потонути в Part1…Part200.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Міні-набір «один удар = один вау»",
 content: `Збери пакет функції:

\`local function playHitFx(position)\`
\` local fx = makeAnchor(position)\`
\` emitSparks(fx)\`
\` tweenFade(fx)\`
\` task.delay(0.5, function() fx:Destroy() end)\`
\`end\`

Виклик після успішного dealDamage:

\`if dealDamage(hum, amount, player) then\`
\` playHitFx(hum.RootPart.Position)\`
\`end\`

(Якщо dealDamage void - тоді викликай playHitFx лише коли Health реально змінився.)

Колір узгодь з ворогом: слиз - зелений, метал - жовтий Neon. Одна палітра краще за райдугу.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Playtest feedback",
 content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Удар з уроном | HP падає **і** є спалах/іскри |
| 2 | Удар у повітря (промах) | Немає ефекту (або інший «свист» - опційно) |
| 3 | 10 ударів підряд | Немає лагу, Fx зникають |
| 4 | Output | Немає помилок Tween на nil Part |
| 5 | Інший гравець (якщо є) | Бачить ефект (якщо серверний) |
| 6 | Без dealDamage (тимчасово вимкни) | Ефект не повинен «маскувати» відсутність урону на здачі |

Пункт 1 - серце уроку. Пункт 3 - серце polish.

Якщо пункт 1 червоний - спочатку перевір виклик playHitFx після dealDamage, не крути Texture годину. Якщо пункт 3 червоний - шукай Emit у циклі без Destroy або Enabled=true назавжди.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Чекліст здачі уроку 60",
 content: `- [ ] TweenInfo + Create + Play на хіт-якорі
- [ ] ParticleEmitter з Emit або коротким Enabled
- [ ] Ефект після успішного урону
- [ ] Destroy / вимкнення після відтворення
- [ ] Папка Fx або еквівалентний cleanup
- [ ] Playtest 1 і 3 зелені
- [ ] Save: Lesson 8.4 - Hit Feedback

Далі **8.5** додасть смерть/респавн - ефекти не замінять i-frames, але зроблять смерть/хіт читабельними. У **8.8** рубрика спитає: «є feedback?»

Не витрачай залишок години на п’ятий шар VFX. Один читабельний пакет (спалах + іскри) краще за купу напівживих емітерів.

Артефакт: удар **чути очима**. Сухий TakeDamage більше не єдиний сигнал. Якщо ментор з відстані бачить іскру в момент падіння HP - feedback зданий.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Гарний VFX без dealDamage",
 explanation: "Брехливий бій: блищить, HP стоїть.",
 correctApproach: "Спочатку урон, потім ефект",
 },
 {
 mistake: "Particle Rate високий Enabled назавжди на кожен хіт-якір",
 explanation: "Лаг і каша.",
 correctApproach: "Emit(n) або короткий Enabled",
 },
 {
 mistake: "Не Destroy Fx Parts",
 explanation: "Сміття в Workspace, падіння FPS.",
 correctApproach: "delay/Completed → Destroy",
 },
 {
 mistake: "Твінити Health",
 explanation: "Не той інструмент; плутанина з уроном.",
 correctApproach: "TakeDamage/dealDamage + твін візуалу",
 },
 {
 mistake: "Ефект на промах як на хіт",
 explanation: "Гравець не читає влучання.",
 correctApproach: "Fx лише після успішного урону",
 },
 {
 mistake: "Створити 20 Emitter у циклі без Parent cleanup",
 explanation: "Пам’ять і візуальний шум.",
 correctApproach: "Один Emіt на якір / перевикористання",
 },
 ],
 summary: "Ти додав hit-feedback: короткий Tween і Particle burst після серверного урону, з cleanup. Бій став читабельним для очей - база для смерті/хвиль і Ship-рубрики «є feedback».",
 practiceTask: {
 title: "Вау на хіті (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** кожен успішний удар дає короткий візуальний feedback.

### Part A - Tween (10 хв)
1. Якір-Part у точці хіту (Anchored, CanCollide false).
2. Tween Transparency або Size 0.15 с.
3. Destroy після Completed/delay.

### Part B - Particles (10 хв)
1. ParticleEmitter на якорі.
2. Emit(15–30) на хіт.
3. Не лишай Enabled назавжди.

### Part C - Зв’язок з уроном (10 хв)
1. Викликай playHitFx лише після успішного dealDamage.
2. 10 ударів - без сміття в Explorer.
3. **Save:** Lesson 8.4 - Hit Feedback`,
 hints: [
 "Спочатку Fx з кнопки, потім встав після dealDamage",
 "Neon + короткий час = читабельно навіть без текстур",
 "workspace.Arena.Fx:ClearAllChildren() під час дебагу - ок",
 ],
 optionalChallenge: "Другий шар: легкий Sound Service звук удару разом з Emit (один Sound, не 50 клонів без Destroy).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 8.4?",
 options: [
          "Додати Tween/Particles як feedback після урону",
          "Прибрати dealDamage",
          "Побудувати Race Remote",
          "Видалити Tool",
        ],
 correctAnswer: 0,
 explanation: "Hit feedback.",
 },
 {
 id: "q2",
 type: MC,
 question: "Чому feedback не замінює урон?",
 options: [
          "Tween завжди змінює MaxHealth",
          "Блиск без зміни Health - брехливий бій",
          "Particles заборонені з Humanoid",
          "Сервер не бачить Parts",
        ],
 correctAnswer: 1,
 explanation: "Спочатку правда HP.",
 },
 {
 id: "q3",
 type: MC,
 question: "Який сервіс створює Tween?",
 options: [
          "ChatService",
          "BadgeService",
          "TweenService",
          "TeleportService",
        ],
 correctAnswer: 2,
 explanation: "TweenService.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо ParticleEmitter:Emit(n)?",
 options: [
          "Вимкнути Humanoid",
          "Замінити MaxHealth",
          "Створити RemoteEvent",
          "Один контрольований burst на хіт",
        ],
 correctAnswer: 3,
 explanation: "Burst.",
 },
 {
 id: "q5",
 type: MC,
 question: "Коли краще запускати hit Fx?",
 options: [
          "Завжди на початку анімації навіть при промаху як єдиний сигнал урону",
          "Після успішного dealDamage",
          "Лише при зміні Sky",
          "Раз на годину",
        ],
 correctAnswer: 1,
 explanation: "Синхрон з уроном.",
 },
 {
 id: "q6",
 type: MC,
 question: "Навіщо Destroy якоря ефекту?",
 options: [
          "Інакше Tween не існує",
          "Destroy збільшує урон",
          "Прибрати сміття і зберегти продуктивність",
          "Обов’язково для SpawnLocation",
        ],
 correctAnswer: 2,
 explanation: "Cleanup.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чому погано твінити Health?",
 options: [
          "Health - не візуальний твін-таргет; урон робить dealDamage",
          "Health завжди рядок",
          "TweenService ламає Studio",
          "Humanoid забороняє будь-які числа",
        ],
 correctAnswer: 0,
 explanation: "Різні інструменти.",
 },
 {
 id: "q8",
 type: MC,
 question: "Які властивості Part зручні для хіт-твіну?",
 options: [
          "Лише Name як Tween ціль",
          "Тільки Parent",
          "Обов’язково Terrain.WaterColor",
          "Transparency, Size, Color (коротко)",
        ],
 correctAnswer: 3,
 explanation: "Візуальні props.",
 },
 {
 id: "q9",
 type: MC,
 question: "Чому постійний Rate на кожному хіт-якорі - ризик?",
 options: [
          "Emit тоді компілюється краще",
          "Roblox вимагає Rate=999",
          "Лаг і візуальний шум",
          "Це єдиний спосіб бачити іскри",
        ],
 correctAnswer: 2,
 explanation: "Продуктивність.",
 },
 {
 id: "q10",
 type: MC,
 question: "Навіщо папка Arena.Fx?",
 options: [
          "Без неї Humanoid не працює",
          "Зручно бачити й чистити тимчасові ефекти",
          "Вона замінює ServerStorage",
          "Fx папка створює хвилі",
        ],
 correctAnswer: 1,
 explanation: "Організація cleanup.",
 },
 {
 id: "q11",
 type: MC,
 question: "Як 8.4 готує 8.8 Ship?",
 options: [
          "Ship забороняє Particles",
          "Треба видалити Tween перед Ship",
          "Feedback скасовує серверний урон",
          "Рубрика питає про читабельний feedback удару",
        ],
 correctAnswer: 3,
 explanation: "Juice для демо.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що таке TweenInfo.new(0.15, …)?",
 options: [
          "Тривалість і стиль анімації властивостей",
          "Урон 0.15 HP",
          "Кількість ворогів",
          "Ім’я Remote",
        ],
 correctAnswer: 0,
 explanation: "Параметри твіну.",
 },
 {
 id: "q13",
 type: MC,
 question: "Який мінімум артефакту сьогодні?",
 options: [
          "12 систем VFX AAA",
          "Лише Sound без усього",
          "1 Tween + 1 particle burst на хіт + cleanup",
          "Порожній Baseplate",
        ],
 correctAnswer: 2,
 explanation: "MVP feedback.",
 },
 {
 id: "q14",
 type: MC,
 question: "Чому CanCollide=false на Fx Part?",
 options: [
          "Інакше Tween не грає",
          "CanCollide вимикає Particles",
          "Це збільшує MaxHealth",
          "Щоб спалах не штовхав гравця/ворога",
        ],
 correctAnswer: 3,
 explanation: "Чисто візуальний якір.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 8.4?",
 options: [
          "Лише теорія",
          "Ефект після урону + cleanup + Save",
          "VFX без будь-якого урону як фінал",
          "Emitter Enabled назавжди без Emit",
        ],
 correctAnswer: 1,
 explanation: "Потрібен hit juice.",
 },
 ],
 },
}

export const ukLesson85 = {
 lessonId: "lesson-roblox-8-5",
 moduleId: "module-08",
 order: 5,
 title: "8.5 - Смерть + респавн",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Обробити Humanoid.Died на сервері для гравця",
 "Зробити передбачуваний респавн (LoadCharacter / SpawnLocation)",
 "Додати i-frames lite після появи, щоб уникнути death loop",
 "Скинути або зберегти стан бою свідомо (Tool, хвиля - правило записати)",
 "Підготувати стабільний цикл життя до хвиль (8.6) і балансу (8.7)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 61 з 92)",
 content: `У **8.1–8.4** ти вже б’єшся: Health, Tool, dealDamage, feedback. Сьогодні закриваєш цикл **життя**: що відбувається, коли HP = 0.

Артефакт уроку:
1. Смерть гравця детектиться на сервері (\`Humanoid.Died\`).
2. Респавн працює передбачувано (SpawnLocation / LoadCharacter).
3. **i-frames lite** 1–2 с після появи - не вмираєш одразу знову.
4. Коротке правило на табличці: що з Tool і з боєм після смерті.

Без цього хвилі в 8.6 перетворяться на «спавн у купу ворогів → миттєва смерть ×10».

**Зроби зараз (2 хв):** стань у небезпечне місце арени й уяви: де має з’явитись після смерті - безпечний Spawn чи середина хвилі?`,
 },
 {
 title: "Смерть у Roblox простими словами",
 content: `| Подія | Хто відповідає | Що відчуває гравець |
|-------|----------------|---------------------|
| Health → 0 | Сервер / Humanoid | Падаєш / ragdoll |
| Died | Сигнал Humanoid | «Я мертвий» |
| Character зникає | Движок / твій код | Екран смерті / пауза |
| Новий Character | Респавн | Знову в світі |

Died - **свисток судді**. Респавн - **вихід з лави запасних**. i-frames - **короткий щит**, щоб не вдарили в момент виходу.

За замовчуванням Roblox уже вміє респавнити через SpawnLocation. Сьогодні ти **контролюєш** цей момент під арену: коли, куди, з яким імунітетом.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Підписка на Died (сервер)",
 content: `На \`Players.PlayerAdded\` і на кожен новий Character:

\`local function hookCharacter(player, character)\`
\` local hum = character:WaitForChild("Humanoid")\`
\` hum.Died:Connect(function()\`
\` onPlayerDied(player)\`
\` end)\`
\`end\`

\`Players.PlayerAdded:Connect(function(player)\`
\` player.CharacterAdded:Connect(function(character)\`
\` hookCharacter(player, character)\`
\` end)\`
\` if player.Character then hookCharacter(player, player.Character) end\`
\`end)\`

Чому сервер: смерть і респавн - правила світу. Клієнт може брехати про HP; Died від серверного Humanoid - надійніший якір.

У \`onPlayerDied\` поки достатньо: print імені, запустити таймер респавну, поставити прапор \`player:SetAttribute("Dead", true)\`.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Респавн: LoadCharacter vs SpawnLocation",
 content: `| Спосіб | Плюс | Мінус |
|--------|------|-------|
| **SpawnLocation** (авто) | Просто, движок сам | Менше контролю таймінгу |
| **LoadCharacter()** з сервера | Ти вирішуєш «через 3 с» | Треба самому викликати |
| Телепорт живого Character | Швидко | Не справжня «смерть» |

Навчальний шаблон:

\`local RESPAWN_DELAY = 3\`

\`local function onPlayerDied(player)\`
\` task.delay(RESPAWN_DELAY, function()\`
\` if not player.Parent then return end\`
\` player:LoadCharacter()\`
\` end)\`
\`end\`

Після LoadCharacter спрацює \`CharacterAdded\` → знову \`hookCharacter\` + старт i-frames.

Переконайся, що є **хоча б один** SpawnLocation у безпечній зоні (не всередині EnemySpawn).

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "i-frames lite - щит після появи",
 content: `Проблема: респавн у зону агро → удар → знову Died за 0.2 с.

Рішення lite (обери одне):

**A. Attribute \`Invulnerable\`**
\`character:SetAttribute("Invulnerable", true)\`
\`task.delay(1.5, function()\`
\` if character.Parent then character:SetAttribute("Invulnerable", false) end\`
\`end)\`

У \`dealDamage\` / урон по гравцю:
\`if character:GetAttribute("Invulnerable") then return end\`

**B. Тимчасово ForceField**
\`local ff = Instance.new("ForceField")\`
\`ff.Parent = character\`
\`task.delay(1.5, function() ff:Destroy() end)\`

ForceField видимий - ок для навчання («бачу щит»). Attribute - чистіший для свого урону.

**Зроби зараз (8 хв):** після респавну 1.5 с урон по тобі ігнорується (протестуй dealDamage / ворога).`,
 },
 {
 title: "Куди респавнитись на арені",
 content: `| Місце Spawn | Коли ок | Коли погано |
|-------------|---------|-------------|
| Лобі / за бар’єром | Завжди безпечно | Далеко від бою - нудно бігти |
| Край арени | Швидко назад у бій | Якщо хвиля вже там - потрібні i-frames |
| Центр арени | Майже ніколи | Death loop |

Правило школи на сьогодні:
1. Spawn **поза** основним спавном ворогів.
2. i-frames **обов’язкові**, якщо Spawn близько до бою.
3. Табличка: «Після смерті з’явишся біля входу».

Не телепортуй мертвий Character «вручну» замість респавну - отримаєш дивні стани Tool/анімацій.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "Tool, стан бою і «що зберігаємо»",
 content: `Після смерті Character зникає - Tool з Character теж. StarterPack / Backpack логіка поверне зброю при новому Character **якщо** Tool у StarterPack.

Запиши правило уроку (одне):
- **A:** після смерті Tool знову з StarterPack - хвилі (коли з’являться) **продовжуються**.
- **B:** смерть = fail run, хвилі стоп (для 8.6 вирішиш явно).

Сьогодні хвиль ще може не бути - все одно продумай Tool:
- StarterPack меч → після респавну знову в руках/інвентарі.
- Якщо Tool лише клонували в Backpack скриптом - повтори клон у CharacterAdded.

Не залишай «мертвий» стан \`Dead=true\` навічно після LoadCharacter - скинь Attribute.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "Смерть ворога vs смерть гравця",
 content: `| | Гравець | Ворог (dummy/NPC) |
|--|---------|-------------------|
| Died | Респавн + i-frames | Зникнення / +прогрес хвилі (8.6) |
| LoadCharacter | Так | Зазвичай Destroy модель |
| i-frames | Так | Рідко потрібно |

Не вішай на ворога той самий \`LoadCharacter\` - це для Player.

Для ворога з 8.3–8.4:
\`hum.Died:Connect(function()\`
\` task.delay(0.5, function() enemy:Destroy() end)\`
\`end)\`

Сьогодні фокус - **гравець**. Ворожий Died лише перевір, що не крашиться, коли ти тестуєш свій урон.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Playtest смерті (чекліст)",
 content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Впасти до 0 HP (свій урон / тест-кнопка / ворог) | Died спрацьовує (print) |
| 2 | Через RESPAWN_DELAY | Новий Character на Spawn |
| 3 | Одразу після появи отримати урон | i-frames тримають 1–2 с |
| 4 | Після кінця i-frames | Урон знову діє |
| 5 | Tool | Доступний після респавну (StarterPack) |
| 6 | Дві смерті підряд | Не краш, hook знову працює |
| 7 | Output | Без червоного спаму |

Тест-кнопка (опційно, сервер): \`hum.Health = 0\` для швидкого Died без довгого бою.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 {
 title: "Типові дірки death loop",
 content: `| Симптом | Причина | Фікс |
|---------|---------|------|
| Смерть кожні 0.2 с | Spawn у шкоді, немає i-frames | Spawn далі + ForceField/Attribute |
| Не респавниться | Немає LoadCharacter / Disabled Spawn | Виклик + SpawnLocation |
| Подвійний респавн | Died + авто-респавн движка разом | Обери один шлях |
| Немає Died hook на 2-му житті | Підписався лише раз на старий Character | CharacterAdded кожен раз |
| Урон ігнорується вічно | Invulnerable не скинувся | delay + false / Destroy FF |

**Зроби зараз (5 хв):** навмисно постав Spawn близько до шкоди - переконайся, що i-frames рятують; потім поверни Spawn у безпечне місце.`,
 },
 {
 title: "Чекліст здачі уроку 61",
 content: `- [ ] Died hooked на кожен Character (сервер)
- [ ] Респавн через delay (LoadCharacter або стабільний SpawnLocation)
- [ ] Spawn не в центрі ворожого спавну
- [ ] i-frames 1–2 с після появи
- [ ] dealDamage / ворожий урон поважає i-frames
- [ ] Tool повертається (StarterPack або клон)
- [ ] Playtest 1–6 зелені
- [ ] Save: Lesson 8.5 - Death Respawn

Далі **8.6** додасть хвилі: респавн уже не повинен «з’їдати» гравця на старті хвилі. У **8.7** перевіриш, чи death loop не маскується під «складний баланс».

Артефакт: цикл **жив → помер → повернувся зі щитом**. Без нього арена - одноразова пастка.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Немає i-frames біля небезпечного Spawn",
 explanation: "Death loop, злість, неможливо тестувати хвилі.",
 correctApproach: "1–2 с ForceField або Attribute Invulnerable",
 },
 {
 mistake: "Підписка на Died лише для першого Character",
 explanation: "Друге життя без логіки смерті.",
 correctApproach: "CharacterAdded → hook щоразу",
 },
 {
 mistake: "Респавн лише телепортом без LoadCharacter",
 explanation: "Битий стан анімацій/Tool/Humanoid.",
 correctApproach: "Справжній респавн Character",
 },
 {
 mistake: "Invulnerable залишити true назавжди",
 explanation: "Гравець безсмертний - баланс мертвий.",
 correctApproach: "Обов’язковий скид після delay",
 },
 {
 mistake: "SpawnLocation всередині EnemySpawn",
 explanation: "Миттєва смерть навіть з коротким щитом.",
 correctApproach: "Безпечна зона входу",
 },
 {
 mistake: "Клієнтський «фейковий» респавн UI без сервера",
 explanation: "Розсинхрон з реальним Character.",
 correctApproach: "Сервер Died + LoadCharacter",
 },
 ],
 summary: "Ти зібрав цикл смерті й респавну: Died на сервері, передбачувана поява, i-frames lite проти death loop і повернення Tool. Це фундамент стабільних хвиль у 8.6 і чесного балансу в 8.7.",
 practiceTask: {
 title: "Життя після смерті (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** померти → зачекати → з’явитись зі щитом → знову в бій.

### Part A - Died і респавн (10 хв)
1. Hook Humanoid.Died на кожен Character (сервер).
2. task.delay + LoadCharacter (або стабільний SpawnLocation).
3. Spawn у безпечній зоні.

### Part B - i-frames (12 хв)
1. ForceField або Attribute Invulnerable на 1.5 с.
2. dealDamage / урон по гравцю ігнорує щит.
3. Після delay урон знову діє.
4. Перевір Tool після респавну.

### Part C - Playtest (8 хв)
1. Таблиця 1–6.
2. Дві смерті підряд без крашу.
3. **Save:** Lesson 8.5 - Death Respawn`,
 hints: [
 "Тест: сервером постав Health=0 для швидкого Died",
 "print на Died і на кінці i-frames",
 "Спочатку безпечний Spawn, потім навмисний стрес-тест біля шкоди",
 ],
 optionalChallenge: "Короткий Sound або TextLabel «Респавн через 3…2…1» (клієнтський UI від серверного сигналу lite).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 8.5?",
 options: [
          "Зробити смерть, респавн і i-frames без death loop",
          "Видалити Humanoid",
          "Побудувати магазин Remotes",
          "Publish трасу Race",
        ],
 correctAnswer: 0,
 explanation: "Цикл життя.",
 },
 {
 id: "q2",
 type: MC,
 question: "Де логічно слухати Humanoid.Died гравця?",
 options: [
          "Лише один раз у LocalScript неба",
          "На сервері для кожного Character",
          "У Terrain",
          "У назві Tool",
        ],
 correctAnswer: 1,
 explanation: "Серверний якір.",
 },
 {
 id: "q3",
 type: MC,
 question: "Навіщо i-frames після респавну?",
 options: [
          "Щоб збільшити MaxHealth назавжди",
          "Це замінює dealDamage",
          "Щоб не померти миттєво знову біля небезпеки",
          "i-frames малюють Skybox",
        ],
 correctAnswer: 2,
 explanation: "Анти death loop.",
 },
 {
 id: "q4",
 type: MC,
 question: "Що робить LoadCharacter?",
 options: [
          "Видаляє Workspace",
          "Створює RemoteEvent",
          "Вимикає SpawnLocation назавжди",
          "Створює новий Character гравця (респавн)",
        ],
 correctAnswer: 3,
 explanation: "Респавн з сервера.",
 },
 {
 id: "q5",
 type: MC,
 question: "Чому Spawn у центрі EnemySpawn - погано?",
 options: [
          "Humanoid тоді не існує",
          "Високий ризик death loop навіть із коротким щитом",
          "Studio не зберігає Place",
          "Tool стає Anchored",
        ],
 correctAnswer: 1,
 explanation: "Безпечна зона.",
 },
 {
 id: "q6",
 type: MC,
 question: "Як ForceField допомагає в уроці?",
 options: [
          "Замінює всі хвилі",
          "Видаляє урон з гри назавжди",
          "Тимчасовий видимий захист після появи",
          "Це обов’язково для Billboard",
        ],
 correctAnswer: 2,
 explanation: "Lite i-frames.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чому hook Died треба в CharacterAdded щоразу?",
 options: [
          "Кожен новий Character - новий Humanoid після респавну",
          "CharacterAdded заборонений після смерті",
          "Інакше MaxHealth стає рядком",
          "Це вимикає Tool",
        ],
 correctAnswer: 0,
 explanation: "Нове життя = новий hook.",
 },
 {
 id: "q8",
 type: MC,
 question: "Що зробити з Attribute Invulnerable після delay?",
 options: [
          "Залишити true назавжди",
          "Видалити гравця з гри",
          "Обов’язково Destroy Workspace",
          "Поставити false (зняти імунітет)",
        ],
 correctAnswer: 3,
 explanation: "Інакше безсмертя.",
 },
 {
 id: "q9",
 type: MC,
 question: "Як Tool зазвичай повертається після смерті?",
 options: [
          "Сам себе клонує з Lighting",
          "Лише якщо назвати Part «Sword»",
          "Через StarterPack на новий Character",
          "Tool ніколи не повертається в Roblox",
        ],
 correctAnswer: 2,
 explanation: "StarterPack.",
 },
 {
 id: "q10",
 type: MC,
 question: "Чим смерть ворога відрізняється від смерті гравця тут?",
 options: [
          "Ворог завжди LoadCharacter",
          "Ворога Destroy, гравця респавнять через LoadCharacter/Spawn",
          "Гравець завжди Destroy назавжди",
          "Немає різниці ніколи",
        ],
 correctAnswer: 1,
 explanation: "Різні долі моделей.",
 },
 {
 id: "q11",
 type: MC,
 question: "Як 8.5 готує 8.6 хвилі?",
 options: [
          "Хвилі забороняють респавн",
          "Треба видалити Died перед хвилями",
          "waveConfig замінює Humanoid",
          "Респавн зі щитом дозволяє тестувати хвилі без миттєвого fail-loop",
        ],
 correctAnswer: 3,
 explanation: "Стабільний цикл життя.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що перевірити в dealDamage щодо i-frames?",
 options: [
          "Якщо Invulnerable/ForceField - не завдавати шкоди",
          "Завжди ігнорувати всі перевірки",
          "i-frames діють лише на Terrain",
          "dealDamage тоді компілюється гірше",
        ],
 correctAnswer: 0,
 explanation: "Повага до щита.",
 },
 {
 id: "q13",
 type: MC,
 question: "Який орієнтир тривалості i-frames у уроці?",
 options: [
          "Обов’язково 5 хвилин",
          "0 мс завжди",
          "Близько 1–2 секунд",
          "Лише під час Publish",
        ],
 correctAnswer: 2,
 explanation: "Короткий щит.",
 },
 {
 id: "q14",
 type: MC,
 question: "Що означає death loop?",
 options: [
          "Переможна хвиля",
          "Назва ModuleScript",
          "Обов’язковий режим Studio",
          "Повторні смерті одразу після респавну без шансу відіграти",
        ],
 correctAnswer: 3,
 explanation: "Петля смерті.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 8.5?",
 options: [
          "Лише теорія без Play",
          "Died + респавн + i-frames + Save",
          "Порожній Baseplate",
          "Безсмертя Invulnerable=true навічно",
        ],
 correctAnswer: 1,
 explanation: "Потрібен цикл життя.",
 },
 ],
 },
}

export const ukLesson86 = {
 lessonId: "lesson-roblox-8-6",
 moduleId: "module-08",
 order: 6,
 title: "8.6 - Хвилі + waveConfig",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Описати бій як послідовність хвиль, а не одного dummy",
 "Зберігати параметри хвиль у table waveConfig (кількість, HP, пауза)",
 "Спавнити ворогів на сервері і вести лічильник живих (aliveCount)",
 "Переходити до наступної хвилі через while / індекс, коли хвиля очищена",
 "Показати victory після останньої хвилі без крашу стану",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 62 з 92)",
 content: `У **8.1–8.5** у тебе вже є арена, Tool, серверний урон і цикл смерть/респавн. Сьогодні додаєш **хвилі**: бій іде 1 → 2 → … а не «один dummy на вічність».

Артефакт уроку:
1. Table \`waveConfig\` з мінімум **2** хвилями (кількість ворогів + HP).
2. Серверний \`spawnWave(index)\`, що клонує ворогів на арену.
3. \`aliveCount\` (або еквівалент): коли 0 - наступна хвиля.
4. Після останньої хвилі - \`victory\` (print / Part / TextLabel).

Без хвиль 8.7 нічого міряти кривою складності, а 8.8 Ship не має другого акту бою.

**Зроби зараз (2 хв):** напиши: хвиля 1 = скільки ворогів і який HP; хвиля 2 = що зміниться.`,
 },
 {
 title: "Навіщо waveConfig, а не «захардкодити spawn»",
 content: `| Захардкод у коді | waveConfig table |
|------------------|------------------|
| \`spawn(2); wait; spawn(5)\` розкидано | Один список правил |
| Баланс шукаєш у 4 скриптах | Міняєш рядок table |
| Складно пояснити ментору | Видно: wave 1 / wave 2 |
| Нова хвиля = копіпаста | Новий рядок у масиві |

waveConfig - **розклад концерту**. Скрипт лише виконує номер за номером.

Приклад форми:

\`local waveConfig = {\`
\` { enemies = 2, hp = 60, delay = 1 },\`
\` { enemies = 3, hp = 80, delay = 2 },\`
\` { enemies = 1, hp = 150, delay = 1 }, -- «бос» lite\`
\`}\`

Поля можна розширити пізніше (швидкість, ім’я префаба). Сьогодні достатньо \`enemies\` + \`hp\` (+ опційно \`delay\`).

**Зроби зараз (5 хв):** зміни одне поле в Config/table і підтверди нову поведінку в Play.`,
 },
 {
 title: "Стан режиму арени",
 content: `Тримай на сервері простий стан (не на клієнті):

\`local arena = {\`
\` running = false,\`
\` waveIndex = 0,\`
\` aliveCount = 0,\`
\` victory = false,\`
\`}\`

Правила:
- \`running = true\` після старту бою (Prompt / Part «Start Waves»).
- \`waveIndex\` - який рядок waveConfig зараз (1-based зручніше для UI).
- \`aliveCount\` збільшуй при спавні, зменшуй на Death ворога.
- \`victory\` - щоб не спавнити хвилю 99 після кінця.

**PlayerRemoving / Stop:** якщо робиш соло-арену на сесію - скидай стан при виході, щоб не лишились «привиди» лічильника.

Не зберігай \`aliveCount\` лише в LocalScript: клієнт бреше, хвиля «закінчиться» фейково.

**Зроби зараз (5 хв):** зміни одне поле в Config/table і підтверди нову поведінку в Play.`,
 },
 {
 title: "Префаб ворога і точка спавну",
 content: `У ServerStorage (або ReplicatedStorage, якщо свідомо):
- Model \`EnemyTemplate\` з Humanoid (з 8.1/8.3 логіки).

У Workspace.Arena:
- Part/Folder \`SpawnPoints\` (1–3 точки) **або** одна \`EnemySpawn\`.

Клон:

\`local function spawnEnemy(hp)\`
\` local enemy = template:Clone()\`
\` enemy:PivotTo(spawnCFrame)\`
\` local hum = enemy:FindFirstChildOfClass("Humanoid")\`
\` hum.MaxHealth = hp\`
\` hum.Health = hp\`
\` enemy.Parent = workspace.Arena.Enemies\`
\` arena.aliveCount += 1\`
\` hum.Died:Connect(function()\`
\` arena.aliveCount -= 1\`
\` -- далі перевірка «хвиля чиста?»\`
\` end)\`
\` return enemy\`
\`end\`

Anchored template у Storage - ок; у клона зніми зайве Anchored, щоб ходив/стояв як задумано.

**Зроби зараз (8 хв):** один клон з HP з config з’являється по кнопці старту.`,
 },
 {
 title: "spawnWave(index) - серце системи",
 content: `\`local function spawnWave(index)\`
\` local cfg = waveConfig[index]\`
\` if not cfg then\`
\` arena.victory = true\`
\` arena.running = false\`
\` announceVictory()\`
\` return\`
\` end\`
\` arena.waveIndex = index\`
\` arena.aliveCount = 0\`
\` for i = 1, cfg.enemies do\`
\` spawnEnemy(cfg.hp)\`
\` task.wait(0.15) -- легкий рознос спавну\`
\` end\`
\`end\`

Важливо: після циклу for \`aliveCount\` має дорівнювати \`cfg.enemies\` (якщо всі клони живі). Якщо Died спрацював миттєво через баг підлоги - шукай void/телепорт, не «наступну хвилю».

Стартовий виклик: \`spawnWave(1)\` після \`arena.running = true\`.

**Зроби зараз (5 хв):** зміни одне поле в Config/table і підтверди нову поведінку в Play.`,
 },
 {
 title: "Коли хвиля «очищена»",
 content: `Після кожного \`Died\`:

\`local function onEnemyDied()\`
\` arena.aliveCount -= 1\`
\` if not arena.running or arena.victory then return end\`
\` if arena.aliveCount > 0 then return end\`
\` local nextIndex = arena.waveIndex + 1\`
\` local delay = (waveConfig[arena.waveIndex] and waveConfig[arena.waveIndex].delay) or 1\`
\` task.delay(delay, function()\`
\` if not arena.running then return end\`
\` spawnWave(nextIndex)\`
\` end)\`
\`end\`

Типові дірки:
| Баг | Фікс |
|-----|------|
| aliveCount іде в мінус | Died двічі / не той Humanoid |
| Хвиля 2 одразу зі стартом | Перевірка aliveCount > 0 пропущена |
| Victory ніколи | waveConfig[next] nil не оброблений |
| Подвійний spawnWave | Два Died одночасно без «cleaning» прапора |

Lite-захист: прапор \`arena.cleaningWave\`, щоб два останні смерті не викликали spawn двічі.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "while як диригент (опційний стиль)",
 content: `Два стилі - обери один і тримайся:

**A. Подієвий (Died → next)** - вище; добре для живого бою.

**B. while на сервері:**

\`arena.running = true\`
\`local w = 1\`
\`while arena.running and waveConfig[w] do\`
\` spawnWave(w)\`
\` -- чекати поки aliveCount == 0\`
\` while arena.running and arena.aliveCount > 0 do\`
\` task.wait(0.25)\`
\` end\`
\` if arena.victory then break end\`
\` w += 1\`
\` task.wait(waveConfig[w-1].delay or 1)\`
\`end\`
\`if arena.running then announceVictory() end\`

\`while\` тут - **навичка очікування** «поки хвиля жива». Не плутай з while на клієнті, що вішає UI.

Не роби \`while true do spawn() end\` без умови - отримаєш лавину ворогів.

**Зроби зараз (5 хв):** зміни одне поле в Config/table і підтверди нову поведінку в Play.`,
 },
 {
 title: "Старт і рестарт заїзду хвиль",
 content: `Старт (ProximityPrompt / Touched StartPad / кнопка):

1. Якщо \`running\` - ігнор або «вже йде».
2. Почисти старих ворогів у \`Arena.Enemies\` (Destroy).
3. Скинь \`victory = false\`, \`aliveCount = 0\`.
4. \`running = true\` → \`spawnWave(1)\`.

Рестарт після victory / смерті всіх:
- Та сама функція \`beginWaves()\`.
- Не залишай старі моделі - інакше aliveCount бреше.

Зв’язок з 8.5: смерть **гравця** не обов’язково стопає хвилі (соло-арена може продовжуватись). Або стопає - але тоді запиши правило явно в табличці на арені.

**Зроби зараз (5 хв):** StartPad двічі підряд не створює 2× хвилю 1 без cleanup.`,
 },
 {
 title: "UI lite: «Хвиля N»",
 content: `Для здачі достатньо:
- \`print("Wave", index)\` у Output, **або**
- SurfaceGui / Billboard «Хвиля 2», **або**
- FireClient / Value \`Wave\` (якщо вже вмієш Remotes - не обов’язково сьогодні).

Текст для гравця краще за «мовчазний спавн поза кадром».

Онбординг біля Start:
*«Натисни старт. Знищ усі хвилі. Після останньої - перемога.»*

Не роби зараз повний лідерборд хвиль - це відволікає від aliveCount.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Playtest хвиль",
 content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Старт | Хвиля 1, enemies з config |
| 2 | Вбити всіх хвилі 1 | Після delay - хвиля 2 |
| 3 | HP ворогів | Збігається з waveConfig.hp |
| 4 | Кількість | Збігається з enemies |
| 5 | Остання хвиля очищена | Victory, без нової хвилі |
| 6 | Повторний старт | Cleanup + знову з 1 |
| 7 | Output | Немає спаму помилок / мінус alive |

Якщо пункт 2 червоний - лог \`aliveCount\` на кожен Died.  
Якщо пункт 5 червоний - перевір \`if not cfg then victory\`.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Зв’язок з 8.7–8.8",
 content: `| Сьогодні | Далі |
|----------|------|
| waveConfig з різними hp | 8.7 міряє TTK по хвилях |
| aliveCount стабільний | 8.8 рубрика: цикл бою зелений |
| 2+ хвилі | Демо 90 с має «акт 2» |
| Cleanup на рестарт | Ship без привидів ворогів |

Save: \`Lesson 8.6 - Arena Waves\`.

У **8.7** підкрутиш числа в тих самих рядках table. Не розмножуй HP у трьох скриптах.

**Зроби зараз (5 хв):** зміни одне поле в Config/table і підтверди нову поведінку в Play.`,
 },
 {
 title: "Чекліст здачі уроку 62",
 content: `- [ ] waveConfig ≥2 рядки (enemies + hp)
- [ ] spawnWave на сервері
- [ ] aliveCount коректний (не мінус, не застряг)
- [ ] Перехід 1→2 після очищення
- [ ] Victory після останньої
- [ ] Cleanup + рестарт працює
- [ ] Playtest 1–5 зелені
- [ ] Save Lesson 8.6 - Arena Waves

Артефакт: арена **дихає хвилями**. Один dummy більше не «вся гра» - є розклад, який 8.7 збалансує, а 8.8 покаже ментору.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Хвилі лише в LocalScript",
 explanation: "Клієнт може завершити хвилю фейково; розсинхрон.",
 correctApproach: "spawnWave + aliveCount на сервері",
 },
 {
 mistake: "Немає aliveCount - наступна хвиля по wait(10)",
 explanation: "Або рано, або пізно; не залежить від бою.",
 correctApproach: "Died → aliveCount → next",
 },
 {
 mistake: "while true без умови зі spawn",
 explanation: "Лавина ворогів, лаг, краш.",
 correctApproach: "while по індексу config + очікування alive==0",
 },
 {
 mistake: "Рестарт без Destroy старих ворогів",
 explanation: "Лічильник і сцена брешуть.",
 correctApproach: "Cleanup Enemies перед spawnWave(1)",
 },
 {
 mistake: "HP захардкожений у префабі, config ігнорується",
 explanation: "Хвиля 2 не важча.",
 correctApproach: "Ставити MaxHealth/Health з cfg.hp при клоні",
 },
 {
 mistake: "Подвійний Died → два spawnWave",
 explanation: "Хвиля 2+3 одночасно.",
 correctApproach: "Прапор cleaningWave або перевірка aliveCount==0 один раз",
 },
 ],
 summary: "Ти зібрав хвилі арени на waveConfig: серверний spawnWave, aliveCount, перехід до наступної хвилі й victory. Table керує складністю - база для балансу 8.7 і Ship 8.8.",
 practiceTask: {
 title: "Розклад хвиль (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** 2+ хвилі з table, очищення → наступна → victory.

### Part A - Config і префаб (8 хв)
1. waveConfig з 2–3 рядками (enemies, hp, delay).
2. EnemyTemplate + SpawnPoint.
3. Клон з HP з config.

### Part B - Цикл хвиль (14 хв)
1. spawnWave(index) + aliveCount.
2. Died → коли 0 → наступна (delay).
3. nil config → victory.
4. beginWaves з cleanup.

### Part C - Playtest (8 хв)
1. Таблиця тестів 1–6.
2. Повторний старт чистий.
3. **Save:** Lesson 8.6 - Arena Waves`,
 hints: [
 "Спочатку 1 ворог на хвилю - легше дебажити aliveCount",
 "print(waveIndex, aliveCount) на Died",
 "delay між хвилями 1–2 с, щоб встигнути побачити UI/print",
 ],
 optionalChallenge: "Billboard або TextLabel «Хвиля N / M», де M = #waveConfig.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 8.6?",
 options: [
          "Зробити послідовність хвиль через waveConfig на сервері",
          "Видалити Tool з арени",
          "Побудувати Race-трасу",
          "Publish без ворогів",
        ],
 correctAnswer: 0,
 explanation: "Хвилі + config.",
 },
 {
 id: "q2",
 type: MC,
 question: "Навіщо waveConfig table?",
 options: [
          "Замінити Humanoid",
          "Змінювати кількість/HP хвиль в одному місці",
          "Вимкнути Anchored назавжди",
          "Створити Skybox",
        ],
 correctAnswer: 1,
 explanation: "Розклад бою.",
 },
 {
 id: "q3",
 type: MC,
 question: "Де має жити aliveCount?",
 options: [
          "Лише в LocalScript для краси",
          "У Lighting",
          "На сервері в стані арени",
          "У назві Part",
        ],
 correctAnswer: 2,
 explanation: "Серверна правда.",
 },
 {
 id: "q4",
 type: MC,
 question: "Коли логічно викликати наступну хвилю?",
 options: [
          "Кожні 0.01 с завжди",
          "Лише при зміні неба",
          "Коли гравець відкрив Explorer",
          "Коли aliveCount став 0 після очищення поточної",
        ],
 correctAnswer: 3,
 explanation: "Хвиля очищена.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що робити, якщо waveConfig[index] = nil?",
 options: [
          "Спавнити 999 ворогів",
          "Victory / кінець режиму, не спавнити далі",
          "Видалити арену",
          "Обов’язково крашнути Place",
        ],
 correctAnswer: 1,
 explanation: "Кінець розкладу.",
 },
 {
 id: "q6",
 type: MC,
 question: "Навіщо ставити HP з cfg при Clone?",
 options: [
          "Clone ігнорує Humanoid завжди",
          "Це вимикає Died",
          "Щоб різні хвилі реально відрізнялись міцністю",
          "HP можна ставити лише на клієнті",
        ],
 correctAnswer: 2,
 explanation: "Config діє.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чому потрібен cleanup перед рестартом?",
 options: [
          "Старі вороги псують сцену і лічильник",
          "Roblox вимагає Destroy щосекунди",
          "Без цього Tool зникає",
          "Cleanup замінює dealDamage",
        ],
 correctAnswer: 0,
 explanation: "Чистий старт.",
 },
 {
 id: "q8",
 type: MC,
 question: "Яка небезпека while true зі spawn без умови?",
 options: [
          "Обов’язковий швидший бій завжди хороший",
          "while заборонений у Lua",
          "Це створює RemoteEvent",
          "Лавина ворогів і лаг",
        ],
 correctAnswer: 3,
 explanation: "Контрольований цикл.",
 },
 {
 id: "q9",
 type: MC,
 question: "Де зручно тримати EnemyTemplate?",
 options: [
          "Лише в Terrain",
          "У SoundService як єдиний варіант",
          "ServerStorage (клон на сервері)",
          "У назві SpawnLocation",
        ],
 correctAnswer: 2,
 explanation: "Префаб для клону.",
 },
 {
 id: "q10",
 type: MC,
 question: "Навіщо легкий task.wait між клонами в одній хвилі?",
 options: [
          "Це замінює aliveCount",
          "Рознести спавн, менше миттєвого накладання",
          "Без wait Humanoid не існує",
          "wait вимикає MaxHealth",
        ],
 correctAnswer: 1,
 explanation: "М’який спавн.",
 },
 {
 id: "q11",
 type: MC,
 question: "Як 8.6 готує 8.7?",
 options: [
          "8.7 видаляє всі хвилі",
          "Баланс не потребує чисел",
          "Треба забути table",
          "Різні hp у waveConfig можна міряти й підкручувати",
        ],
 correctAnswer: 3,
 explanation: "Крива складності.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що таке подвійний spawnWave від двох Died?",
 options: [
          "Баг: дві наступні хвилі майже разом",
          "Обов’язкова фіча Roblox",
          "Це victory",
          "Так налаштовують i-frames",
        ],
 correctAnswer: 0,
 explanation: "Потрібен захист.",
 },
 {
 id: "q13",
 type: MC,
 question: "Мінімум хвиль для здачі?",
 options: [
          "Обов’язково 50",
          "0 - лише dummy без config",
          "Хоча б 2 рядки в waveConfig",
          "Лише клієнтський print",
        ],
 correctAnswer: 2,
 explanation: "Є акт 2.",
 },
 {
 id: "q14",
 type: MC,
 question: "Чи може смерть гравця стопати хвилі?",
 options: [
          "Ніколи в жодній грі",
          "Хвилі існують лише на клієнті",
          "Смерть гравця завжди видаляє waveConfig",
          "Так, якщо ти явно так вирішив і записав правило",
        ],
 correctAnswer: 3,
 explanation: "Свідоме правило дизайну.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 8.6?",
 options: [
          "Лише теорія без Play",
          "waveConfig + spawnWave + перехід/victory + Save",
          "Порожній Baseplate",
          "Хвилі тільки в LocalScript",
        ],
 correctAnswer: 1,
 explanation: "Потрібен цикл хвиль.",
 },
 ],
 },
}

export const ukLesson87 = {
 lessonId: "lesson-roblox-8-7",
 moduleId: "module-08",
 order: 7,
 title: "8.7 - Playtest баланс бою",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Прогнати баланс HP гравця, HP ворога і урону удару на цифрах",
 "Знайти one-shot / «вічний dummy» / нудний бій і зафіксувати в таблиці",
 "Підкрутити MaxHealth і dealDamage amount за правилами школи",
 "Перевірити cooldown / i-frames, щоб баланс не ламався спамом",
 "Підготувати стабільні числа до Ship Arena (8.8)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 63 з 92)",
 content: `У **8.1–8.6** ти зібрав арену, Tool, серверний урон, feedback, смерть/респавн і хвилі. Сьогодні **не** додаєш новий жанр. Сьогодні ти **міряєш бій**.

Артефакт уроку:
1. Таблиця баланс-тестів (HP / урон / час до вбивства).
2. Хоча б **2 live-підкрутки** чисел (MaxHealth або amount).
3. Нотатка «комфортний бій» для демо 90 с.
4. Place без one-shot і без «б’ю 3 хвилини одного dummy».

Без цього 8.8 Ship впаде на відчутті: або гравець помирає за 1 удар, або хвиля нудна.

**Зроби зараз (3 хв):** випиши поточні числа: Player MaxHealth, Enemy MaxHealth, damage за удар, cooldown якщо є.`,
 },
 {
 title: "Баланс ≠ «зробити складніше»",
 content: `| Поганий баланс | Хороший навчальний баланс |
|----------------|---------------------------|
| One-shot гравця | 3–8 ударів ворога до смерті гравця (орієнтир) |
| One-shot ворога завжди | 3–10 ударів до смерті dummy/хвилі 1 |
| Бій 5+ хв на одного | Хвиля 1 вкладається в ~20–40 с |
| Рандом «то легко то неможливо» | Передбачувані числа з table/констант |

ваги на кухні. Ти не «злишся на суп», ти **додаєш сіль потроху** і пробуєш знову.

Школа: баланс крутимо **константами** (MaxHealth, damage, cooldown), не «магією в 20 місцях копіпасти».

**Зроби зараз (5 хв):** пройди один сегмент траси/коло і зафіксуй, що лічильник/time оновився.`,
 },
 {
 title: "Що саме міряємо",
 content: `| Метрика | Як міряти | Навіщо |
|---------|-----------|--------|
| **TTK ворог** (time to kill) | Секундомір: старт ударів → ворог 0 HP | Темп хвилі |
| **TTD гравець** (time to die) | Скільки ударів/часу до твоєї смерті | Складність |
| **Ударів до вбивства** | MaxHealth / damage (ціле) | Швидка оцінка |
| **Спам DPS** | Удари без cooldown | Чи зламаний бій |
| **Після респавну** | Смерть → i-frames → знову в бій | Не «death loop» |

Формула-орієнтир:

\`hitsToKillEnemy ≈ enemyMaxHealth / damagePerHit\`
\`hitsToKillPlayer ≈ playerMaxHealth / enemyDamagePerHit\`

Якщо hitsToKillEnemy = 1 завжди - зменш damage або підніми HP ворога.  
Якщо hitsToKillPlayer = 1 - зменш урон ворога або підніми HP гравця.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Таблиця playtest балансу",
 content: `Скопіюй у нотатку і заповни фактами з Play:

| # | Сценарій | Очікування | Факт (с / удари) | Вердикт |
|---|----------|------------|------------------|---------|
| 1 | Хвиля 1 / 1 dummy, чесні удари | 3–10 ударів | | |
| 2 | Той самий, спам кліків | Не швидше в 10× якщо є CD | | |
| 3 | Урон по тобі (якщо ворог б’є) | Не one-shot | | |
| 4 | Повна хвиля 1 | ≤40–60 с | | |
| 5 | Хвиля 2 (якщо є) | Трохи важче, не стіна | | |
| 6 | Смерть → респавн | i-frames, можна повернутись | | |
| 7 | Output | Без червоного | | |

Вердикт: **ok / easy / hard / broken**.  
Broken = one-shot або невмирущий dummy через баг (урон не застосовується).

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Де крутити числа (одне джерело правди)",
 content: `Погано: damage = 25 у Tool LocalScript, 40 у сервері, 10 у коментарі.

Добре: константи в одному Script/Module:

\`local BALANCE = {\`
\` playerMaxHealth = 100,\`
\` enemyHpWave1 = 80,\`
\` enemyHpWave2 = 120,\`
\` damagePerHit = 20,\`
\` hitCooldown = 0.4,\`
\` respawnIFrames = 1.5,\`
\`}\`

На PlayerAdded / CharacterAdded виставляй Humanoid.MaxHealth і Health з BALANCE.  
У dealDamage бери \`BALANCE.damagePerHit\`, не «магічне 999».

Хвилі з 8.6: \`waveConfig[i].hp\` має узгоджуватись з цією таблицею.

**Зроби зараз (5 хв):** знайди всі місця з числами урону/HP і зведи хоча б у один блок коментарем «BALANCE».`,
 },
 {
 title: "Типові симптоми і фікси",
 content: `| Симптом | Ймовірна причина | Фікс |
|---------|------------------|------|
| Ворог падає з 1 удару | damage ≥ MaxHealth | ↓ damage або ↑ HP |
| Б’ю вічно, HP не падає | dealDamage не викликається | Спочатку баг, не баланс |
| Гравець one-shot | Урон ворога великий / немає i-frames | ↓ урон, ↑ HP, i-frames |
| Спам = миттєва хвиля | Немає hitCooldown | Серверний cooldown |
| Хвиля 2 нереальна | HP * 5 без зміни damage | Піднімай HP поступово (+20–50%) |
| Нудно | hitsToKill > 15 | ↑ damage або ↓ HP |

Правило: **спочатку виправ broken**, потім easy/hard. Не балансуй баг.

**Зроби зараз (3 хв):** знайди в Place один симптом з таблиці і виправ або підтверди, що його немає.`,
 },
 {
 title: "Протокол підкрутки (15 хв спринт)",
 content: `1. Заповни рядки 1–3 таблиці фактами.
2. Обери **найгірший** вердикт (broken > hard > easy).
3. Зміни **одне** число в BALANCE.
4. Повтори той самий тест.
5. Запиши нове значення.
6. Повтори для другої проблеми.

Приклад логу:
- Було: damage 50, enemy 50 → 1 удар (easy/broken).
- Стало: damage 20, enemy 80 → 4 удари (ok).
- Було: гравець one-shot від 80 урону.
- Стало: enemyDamage 15, player HP 100 → ~7 ударів.

Не крути 5 змінних одночасно - не зрозумієш, що допомогло.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Cooldown, i-frames і «чесний» темп",
 content: `Баланс цифр без темпу все одно ламається:

- **hitCooldown** на сервері: навіть якщо анімація коротка, урон не частіше ніж раз на N с.
- **i-frames** після респавну: 1–2 с без урону, інакше death loop біля спавну хвилі.
- **Анімація vs урон:** якщо анімація 0.8 с, а урон кожні 0.1 с - відчуття «чіт». Вирівняй.

Тест спаму (рядок 2 таблиці): тримай кнопку/клік 3 с. Кількість реальних dealDamage має ≈ час / cooldown, не 60.

**Зроби зараз (6 хв):** print на сервері кожен успішний hit з os.clock() - побачиш інтервали.`,
 },
 {
 title: "Хвилі: крива складності lite",
 content: `| Хвиля | Ідея HP | Ідея кількості |
|-------|---------|----------------|
| 1 | Базовий enemyHp | 1–2 |
| 2 | +25–50% HP або +1 ворог | Не обидва максимуми одразу |
| 3 (опційно) | Ще крок або «бос» 2× HP | Один бос краще за 10 клонів |

Перевір: хвиля 1 - навчання удару. Хвиля 2 - трохи тиску. Не «хвиля 1 = бог, хвиля 2 = неможливо».

Якщо waveConfig ще тонкий - для 8.7 достатньо 2 рядків у table з різними hp.

**Зроби зараз (5 хв):** зміни одне поле в Config/table і підтверди нову поведінку в Play.`,
 },
 {
 title: "Чекліст здачі уроку 63 + місток до 8.8",
 content: `- [ ] Виписані стартові числа HP / damage / cooldown
- [ ] Таблиця тестів 1–7 з фактами
- [ ] ≥2 live-підкрутки з лоґом «було → стало»
- [ ] Немає one-shot гравця на базовому ворогові (або задокументовано як P0)
- [ ] Ворог хвилі 1 не вмирає з 1 удару (або свідомий навчальний one-hit з міткою)
- [ ] Спам не дає божевільний DPS (є cooldown або пояснення)
- [ ] Респавн не в death loop (i-frames lite)
- [ ] Save: Lesson 8.7 - Arena Balance

Далі **8.8 Ship Arena** зшиє системи рубрикою. Якщо сьогодні TTK «зламаний» - завтра демо 90 с буде соромом, не вау.

Артефакт: **передбачуваний бій**. Ship любить стабільні числа більше за новий меч.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Крутити баланс, поки урон взагалі не застосовується",
 explanation: "Ти «балансуєш» баг.",
 correctApproach: "Спочатку print dealDamage, потім числа",
 },
 {
 mistake: "Змінити 7 констант за раз",
 explanation: "Неясно, що допомогло.",
 correctApproach: "Одне число → один тест",
 },
 {
 mistake: "One-shot залишити «бо так смішно»",
 explanation: "Ship-демо виглядає зламаним.",
 correctApproach: "3–10 ударів на хвилі 1",
 },
 {
 mistake: "Немає hitCooldown на сервері",
 explanation: "Спам ламає будь-які HP.",
 correctApproach: "Серверний cooldown у dealDamage",
 },
 {
 mistake: "Різні цифри урону в 4 скриптах",
 explanation: "Баланс роз’їжджається завтра.",
 correctApproach: "Один BALANCE table",
 },
 {
 mistake: "Ігнорувати death loop після респавну",
 explanation: "Гравець злиться швидше, ніж через складність хвилі",
 correctApproach: "i-frames 1–2 с",
 },
 ],
 summary: "Ти прогнав playtest балансу арени: виміряв TTK/удари, звів числа в BALANCE, зробив мінімум 2 підкрутки і перевірив cooldown/i-frames. Урок 63 готує стабільний бій до Ship Arena в 8.8.",
 practiceTask: {
 title: "Баланс-лабораторія (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** передбачуваний бій на цифрах перед Ship.

### Part A - Замір (8 хв)
1. Випиши поточні HP / damage / cooldown.
2. Заповни таблицю сценаріїв 1–4 фактами (секундомір + лічильник ударів).
3. Познач easy / hard / broken.

### Part B - Підкрутки (15 хв)
1. Зведи числа в BALANCE (або один блок констант).
2. Зроби ≥2 зміни (по одній за раз).
3. Повтори ті самі тести; запиши було → стало.
4. Додай/перевір hitCooldown і i-frames якщо рядки 2 або 6 червоні.

### Part C - Готовність до Ship (7 хв)
1. Хвиля 1 вкладається в комфортний час.
2. Немає one-shot (або P0 записаний).
3. **Save:** Lesson 8.7 - Arena Balance`,
 hints: [
 "Секундомір телефону + tally ударів - достатньо",
 "print(damage, humanoid.Health) на сервері",
 "Не чіпай VFX, поки TTK broken",
 ],
 optionalChallenge: "Окремий рядок BALANCE для «бос хвилі» з 2× HP і коротка нотатка в табличці на арені.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 8.7?",
 options: [
          "Прогнати і підкрутити баланс HP/урону перед Ship",
          "Видалити dealDamage",
          "Побудувати Race-трасу",
          "Publish без playtest",
        ],
 correctAnswer: 0,
 explanation: "Баланс бою.",
 },
 {
 id: "q2",
 type: MC,
 question: "Що таке TTK у цьому уроці?",
 options: [
          "Назва RemoteEvent",
          "Час (або удари), щоб убити ворога",
          "Тип Terrain",
          "Кількість Decals",
        ],
 correctAnswer: 1,
 explanation: "Time to kill.",
 },
 {
 id: "q3",
 type: MC,
 question: "Чому one-shot на хвилі 1 - погано для ship?",
 options: [
          "Roblox забороняє MaxHealth 100",
          "Tool тоді не існує",
          "Демо виглядає зламаним, немає відчуття бою",
          "Output завжди червоний",
        ],
 correctAnswer: 2,
 explanation: "Потрібен темп.",
 },
 {
 id: "q4",
 type: MC,
 question: "Де краще тримати числа балансу?",
 options: [
          "У 10 різних місцях різними цифрами",
          "Лише в назві Part",
          "Тільки в Skybox",
          "В одному BALANCE / константах",
        ],
 correctAnswer: 3,
 explanation: "Одне джерело правди.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що робити спочатку, якщо HP ворога не падає?",
 options: [
          "Одразу MaxHealth = 1",
          "Перевірити, чи викликається dealDamage (баг), не крутити баланс наосліп",
          "Видалити арену",
          "Вимкнути Humanoid назавжди",
        ],
 correctAnswer: 1,
 explanation: "Баг ≠ баланс.",
 },
 {
 id: "q6",
 type: MC,
 question: "Навіщо серверний hitCooldown?",
 options: [
          "Щоб змінити Material підлоги",
          "Це замінює MaxHealth",
          "Щоб спам кліків не ламав DPS і баланс",
          "Cooldown малює Billboard",
        ],
 correctAnswer: 2,
 explanation: "Темп удару.",
 },
 {
 id: "q7",
 type: MC,
 question: "Скільки змінних крутити за один тест?",
 options: [
          "Краще одну, щоб зрозуміти ефект",
          "Обов’язково всі одразу",
          "Жодної ніколи",
          "Лише колір меча",
        ],
 correctAnswer: 0,
 explanation: "Контрольований експеримент.",
 },
 {
 id: "q8",
 type: MC,
 question: "Навіщо i-frames у баланс-playtest?",
 options: [
          "Збільшити урон меча",
          "Вимкнути хвилі",
          "Замінити waveConfig",
          "Уникнути death loop одразу після респавну",
        ],
 correctAnswer: 3,
 explanation: "Життєвий цикл після смерті.",
 },
 {
 id: "q9",
 type: MC,
 question: "Орієнтир hitsToKill для навчальної хвилі 1?",
 options: [
          "Завжди рівно 100",
          "0 ударів",
          "Близько кількох–десятка ударів, не 1 і не 50",
          "Лише через Teleport",
        ],
 correctAnswer: 2,
 explanation: "Комфортний темп.",
 },
 {
 id: "q10",
 type: MC,
 question: "Як піднімати складність хвилі 2?",
 options: [
          "Одразу HP * 100",
          "Поступово +HP або +кількість, не обидва максимуми разом",
          "Прибрати весь урон гравця",
          "Видалити Tool",
        ],
 correctAnswer: 1,
 explanation: "Крива lite.",
 },
 {
 id: "q11",
 type: MC,
 question: "Мінімум live-підкруток у практиці?",
 options: [
          "0 - лише теорія",
          "Обов’язково 50",
          "Лише зміна неба",
          "Хоча б 2 з логом було → стало",
        ],
 correctAnswer: 3,
 explanation: "Практика цифр.",
 },
 {
 id: "q12",
 type: MC,
 question: "Як 8.7 готує 8.8?",
 options: [
          "Стабільні числа → демо Ship 90 с не розвалюється на one-shot",
          "8.8 забороняє MaxHealth",
          "Баланс скасовує рубрику",
          "Треба видалити хвилі перед Ship",
        ],
 correctAnswer: 0,
 explanation: "Готовність до ship.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що записувати в таблицю playtest?",
 options: [
          "Лише «мені здається»",
          "Тільки список Plugins",
          "Факти: секунди/удари і вердикт ok/easy/hard/broken",
          "Колір Ambient",
        ],
 correctAnswer: 2,
 explanation: "Доказ заміру.",
 },
 {
 id: "q14",
 type: MC,
 question: "Чому погано тримати різний damage у клієнті і сервері?",
 options: [
          "Studio тоді не зберігає Place",
          "Humanoid зникає",
          "Це обов’язково для ParticleEmitter",
          "Баланс і правда бою роз’їжджаються",
        ],
 correctAnswer: 3,
 explanation: "Одна правда чисел.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 8.7?",
 options: [
          "Лише теорія без Play",
          "Таблиця тестів + ≥2 підкрутки + стабільніший бій + Save",
          "Порожній Baseplate",
          "One-shot навмисно без нотатки",
        ],
 correctAnswer: 1,
 explanation: "Потрібен баланс-доказ.",
 },
 ],
 },
}

export const ukLesson88 = {
 lessonId: "lesson-roblox-8-8",
 moduleId: "module-08",
 order: 8,
 title: "8.8 - Ship Arena",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зшити арену в один золотий шлях: вхід → бій → хвиля → смерть/респавн",
 "Пройти рубрику Ship Arena (~15 пунктів) і закрити блокери",
 "Підтвердити, що урон іде через серверний dealDamage, а не з клієнта",
 "Показати feedback бою (анімація / tween / particles) без ламання балансу",
 "Зберегти Place як артефакт модуля 8 перед Race (M9)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 64 з 92)",
 content: `Це **фінал модуля Arena**. Не нова арена з нуля і не «ще один Tool». Сьогодні ти **зшиваєш** те, що вже є, у бій, який можна показати за 90 секунд.

У модулі 8 ти (або група) збирав:
1. **8.1** - Humanoid Health / арена-білд.
2. **8.2** - Tool + анімація удару.
3. **8.3** - dealDamage на сервері (Never trust client).
4. **8.4** - TweenService + Particles як feedback.
5. **8.5** - смерть, респавн, i-frames lite.
6. **8.6** - хвилі через waveConfig table.
7. **8.7** - playtest баланс HP / урону.

Сьогоднішній артефакт: **один Place**, де гравець без суфлера:
**заходить на арену → розуміє ціль → б’є Tool’ом → ворог/хвиля реагує → HP видно → смерть/респавн чесні → наступна хвиля або перемога.**

Якщо якоїсь системи ще немає - зроби **lite** саме під маршрут (1 тип ворога, 2 хвилі, 1 Tool), а не три недороблені Places.

**Зроби зараз (3 хв):** одним реченням запиши золотий шлях арени. Якщо не можеш - спочатку стрілки на папері.`,
 },
 {
 title: "Що означає Ship Arena (і що ні)",
 content: `| Ship Arena | Ще НЕ ship |
|------------|-----------|
| Арена + Tool + урон + хвиля **разом** | Окремо «гарний меч» і окремо dummy без зв’язку |
| Урон через **серверний** dealDamage | LocalScript сам ставить Health = 0 ворогу |
| Гравець бачить HP / feedback удару | Лише print у Output викладача |
| Смерть → респавн без крашу | Застряг у void / без i-frames спам смерті |
| Output чистий на 1–2 хвилях | Червоні помилки «ігноруємо» |
| 60–90 с демо без пояснень | 5 хв «зараз покажу де спавн ворога» |

Ship **не** означає AAA-шутер. Означає: **короткий повний бій уже зібраний**, іменований і чесний по урону.

Після цього уроку модуль 9 (Race) матиме звичку: **сервер вирішує критичні числа** (тут HP/урон, там кола/фініш).

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Карта систем, які зшиваємо",
 content: `| Система | Де живе | Що дає золотому шляху |
|---------|---------|------------------------|
| Арена / бар’єри | Workspace | Місце бою, не виліт у void |
| Health / MaxHealth | Humanoid | Життя гравця і ворога |
| Tool + анімація | Backpack / Character | Удар видно |
| dealDamage | Server Script / Module | Правда шкоди |
| Tween / Particles | Feedback на хіт | «Вау, влучив» |
| Смерть + респавн + i-frames | Сервер + Character | Цикл після смерті |
| waveConfig | Table на сервері | Хвилі 1→2→… |

Правило інтеграції: **одна правда про шкоду і HP** - на сервері. Клієнт показує анімацію/ефект, але не «сам убиває».

**Зроби зараз (4 хв):** у Explorer знайди скрипт dealDamage, Tool, спавн хвилі, зону арени. Чого немає - P0 на сьогодні.`,
 },
 {
 title: "Золотий шлях арени (6–8 кроків)",
 content: `Запиши **до** фіксів:

1. Spawn біля входу / табличка «Візьми зброю, виживи N хвиль».
2. Підібрати Tool (або вже в StarterPack).
3. Увійти в арену → хвиля 1 спавнить ворога/dummy.
4. Удар → сервер dealDamage → HP падає / feedback (particle/tween).
5. Ворог гине → прогрес хвилі / наступна з waveConfig.
6. Якщо ти гинеш - респавн + короткі i-frames, стан хвилі зрозумілий.
7. Після останньої хвилі - перемога (UI або Part «YOU WIN»).
8. Output без червоного на маршруті.

Це і є «інтеграція». Не «усі фічі в файлах», а **гравець відчуває бій**.

Lite-заміна: якщо хвиль мало - 1 dummy + 1 «бос» з більшим MaxHealth достатньо для ship.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Рубрика Ship Arena (~15 пунктів)",
 content: `Став **так / ні / майже**. Мета: максимум **так** на золотому шляху.

### A. Простір і старт (1–4)
| # | Пункт | Так? |
|---|-------|------|
| 1 | Spawn / вхід зрозумілий, Tool доступний | |
| 2 | Табличка каже ціль ≤30–60 с читання | |
| 3 | Арена тримає гравця (бордюри / підлога) | |
| 4 | Імена/папки читаються (Arena/, Enemies/, Tools/) | |

### B. Цикл бою (5–8)
| # | Пункт | Так? |
|---|-------|------|
| 5 | Удар реально знімає HP (видно або в leaderstats/бар) | |
| 6 | Є feedback (анімація і/або particle/tween) | |
| 7 | Хвиля або наступний ворог з’являється після смерті попереднього | |
| 8 | Смерть гравця → респавн без крашу Place | |

### C. Чесність урону (9–12)
| # | Пункт | Так? |
|---|-------|------|
| 9 | dealDamage на сервері (не лише клієнтський Health=) | |
| 10 | Клієнт не може вбити всіх одним LocalScript «читом» без сервера | |
| 11 | Є lite-захист: cooldown удару / перевірка відстані / Tool equipped | |
| 12 | i-frames або імунітет після респавну (хоча б 1–2 с) | |

### D. Ship-якість (13–15)
| # | Пункт | Так? |
|---|-------|------|
| 13 | Output чистий на 1–2 хвилях | |
| 14 | Демо 60–90 с без суфлера | |
| 15 | Save Lesson 8.8 - Arena Ship | |

Усе «ні» в B/C = список фіксів Part B. Не малюй другу арену - закрий цикл.

**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`,
 },
 {
 title: "Типові дірки інтеграції арени",
 content: `| Симптом | Ймовірна причина | Швидкий фікс |
|---------|------------------|--------------|
| Меч махає, HP стоїть | Урон лише візуальний / не викликає dealDamage | Зв’яжи hit → сервер |
| Dummy вмирає від клієнта напряму | LocalScript пише Health | Прибери; лише сервер |
| Хвиля 2 не стартує | Немає слухача «усі вороги мертві» | Лічильник alive у waveConfig |
| Респавн спамить смерть | Немає i-frames | Короткий імунітет після LoadCharacter |
| Particles лагають | Емітер на кожен кадр без Destroy | Один burst + cleanup |
| Баланс «one-shot» | Урон > MaxHealth ворога / гравця | Підкрути з 8.7 нотаток |

**Зроби зараз (6 хв):** пройди шлях раз і познач перший червоний пункт рубрики. Лагод його раніше за новий декор.`,
 },
 {
 title: "Міні-схема: урон і хвиля",
 content: `На сервері:

\`dealDamage(targetHumanoid, amount, sourcePlayer)\`
\` - перевірити target існує\`
\` - перевірити amount число і > 0\`
\` - (lite) відстань source → target\`
\` - (lite) cooldown на sourcePlayer\`
\` - Humanoid:TakeDamage(amount) або Health = math.max(0, Health - amount)\`

Хвилі (нагадування 8.6):

\`waveConfig = {\`
\` { enemies = 2, hp = 50 },\`
\` { enemies = 3, hp = 60 },\`
\`}\`

\`spawnWave(index)\` клонує NPC, ставить MaxHealth/Health з config, тримає \`aliveCount\`.  
Коли \`aliveCount == 0\` → \`spawnWave(index + 1)\` або victory.

Клієнт: анімація Tool / звук / прохання «атакую» (якщо вже є Remote). Сервер: скільки HP зняти.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Онбординг арени за 8 хвилин",
 content: `Новачок у бою губиться: неясно, чи бити dummy, чи чекати хвилю, де взяти меч.

Мінімум на старті:
- табличка з 2–3 кроками;
- яскравий колір підлоги арени / бар’єр входу;
- Tool у StarterPack або Part «Pick weapon» з підказкою.

Текст:
*«1) Візьми меч. 2) Зайди в червону арену. 3) Знищ хвилі ворогів.»*

Перевір: відійди очима від монітора і підійди знову - чи видно вхід без твоїх слів?

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "Playtest інтеграції (чекліст)",
 content: `| # | Дія | Очікування | Факт |
|---|-----|------------|------|
| 1 | Новий Play | Spawn + Tool ок | |
| 2 | Увійти в арену | Хвиля / dummy з’являється | |
| 3 | Ударити | HP падає на сервері | |
| 4 | Feedback | Анімація/particle хоч раз | |
| 5 | Добити ворога | Хвиля прогресує / victory | |
| 6 | Підробити Health на клієнті (якщо вмієш) | Вороги не «самі» падають від чистого клієнта | |
| 7 | Смерть гравця | Респавн + i-frames | |
| 8 | Друга хвиля | Не крашить, config читається | |
| 9 | Output | Без червоного | |
| 10 | Демо 90 с | Вкладаєшся | |

Пункти 3–7 - серце Ship Arena. Без них рубрика C червона.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 {
 title: "Що свідомо відкласти",
 content: `Не роби сьогодні:
- 12 типів ворогів і дерево скілів;
- повний магазин зброї на Remotes (це ближче до M10);
- Ideal CameraMode на годину;
- Publish Public (ближче до M12);
- open-world навколо арени.

Роби сьогодні:
- **один** бій MVP;
- серверний dealDamage;
- 2 хвилі з waveConfig;
- респавн + рубрика + Save.

Усе «хочу ще» - у нотатку для polish / M11. Ship любить вузький переможний круг.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Чекліст здачі уроку 64 + місток до M9",
 content: `- [ ] Золотий шлях записаний
- [ ] Рубрика ~15 пунктів проставлена
- [ ] Урон на сервері (dealDamage)
- [ ] Tool + хоч якийсь feedback
- [ ] Хвилі або чіткий цикл «вбити → наступний»
- [ ] Смерть / респавн без крашу
- [ ] i-frames lite або еквівалент
- [ ] Playtest-таблиця хоча б раз
- [ ] Демо 60–90 с
- [ ] Save Lesson 8.8 - Arena Ship

Далі **модуль 9 Race**: та сама дисципліна «сервер вирішує», але вже для кіл і фінішу. Якщо каса урону ще на клієнті - **не** йди в Race з гордістю: спочатку закрий рубрику C арени.

Артефакт: арена, яку можна показати. Мережа гонки завтра будується на цій звичці Never trust client.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Урон лише в LocalScript (Health = 0 на клієнті)",
 explanation: "Чіт і розсинхрон з хвилями.",
 correctApproach: "dealDamage на сервері",
 },
 {
 mistake: "Три Places: Tool / dummy / хвилі окремо",
 explanation: "Немає інтегрованого бою.",
 correctApproach: "Один Place, один золотий шлях",
 },
 {
 mistake: "Хвиля 2 ніколи не стартує",
 explanation: "Немає підрахунку живих ворогів.",
 correctApproach: "aliveCount + waveConfig наступний індекс",
 },
 {
 mistake: "Рубрика «майже», але демо потребує суфлера",
 explanation: "Це не ship для гравця.",
 correctApproach: "Онбординг + 90 с без пояснень",
 },
 {
 mistake: "Немає i-frames після респавну",
 explanation: "Миттєва повторна смерть біля спавну ворога.",
 correctApproach: "1–2 с імунітету",
 },
 {
 mistake: "Роздути 10 ворогів замість закрити 2 хвилі",
 explanation: "Година зникає, блокери лишаються.",
 correctApproach: "2 хвилі MVP + стабільний урон",
 },
 ],
 summary: "Ти зібрав Ship Arena: один золотий шлях, де Tool, серверний урон, хвилі й респавн працюють разом. Рубрика й playtest підтверджують демо 60–90 с - база перед Race у модулі 9.",
 practiceTask: {
 title: "Ship Arena: зшити і здати (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** один Place з інтегрованим боєм вхід → удар → хвиля → респавн.

### Part A - Карта і рубрика (8 хв)
1. Запиши золотий шлях 6–8 кроків.
2. Пройди рубрику ~15 пунктів у Play.
3. Випиши P0 з блоків B і C.

### Part B - Інтеграційні фікси (15 хв)
1. Удари йдуть у серверний dealDamage.
2. Lite cooldown / відстань (якщо ще немає).
3. Хвиля 2 з waveConfig або victory після останнього.
4. Респавн + i-frames lite.
5. Хоч один feedback (анімація або particle).

### Part C - Демо і Save (7 хв)
1. Playtest-таблиця 1–10.
2. Репетиція демо 60–90 с.
3. **Зберегти:** Lesson 8.8 - Arena Ship
4. Практика завершена, коли рубрика має максимум «так» і Output чистий.`,
 hints: [
 "Спочатку серверний урон, потім краса VFX",
 "2 хвилі достатньо для ship",
 "Якщо UI HP немає - Humanoid Health bar за замовчуванням ок для здачі",
 ],
 optionalChallenge: "Короткий TextLabel «Хвиля N / M» з серверної правди після старту кожної хвилі.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 8.8?",
 options: [
          "Зшити арену в один золотий шлях і закрити рубрику Ship",
          "Видалити Tool і хвилі",
          "Почати Race-трасу з нуля",
          "Publish Public обов’язково сьогодні",
        ],
 correctAnswer: 0,
 explanation: "Інтеграція Arena.",
 },
 {
 id: "q2",
 type: MC,
 question: "Де має жити правда про шкоду?",
 options: [
          "Лише в LocalScript Health=",
          "На сервері в dealDamage",
          "У Lighting Ambient",
          "У назві Part арени",
        ],
 correctAnswer: 1,
 explanation: "Never trust client.",
 },
 {
 id: "q3",
 type: MC,
 question: "Що таке золотий шлях арени?",
 options: [
          "Список усіх Plugins у Studio",
          "Обов’язковий open-world",
          "Короткий маршрут гравця від входу до перемоги/циклу без суфлера",
          "Лише зміна Skybox",
        ],
 correctAnswer: 2,
 explanation: "Інтегрований бій.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо i-frames після респавну?",
 options: [
          "Щоб вимкнути Tool назавжди",
          "Це замінює waveConfig",
          "i-frames малюють Terrain",
          "Щоб не померти миттєво знову біля небезпеки",
        ],
 correctAnswer: 3,
 explanation: "Захист після смерті.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що перевіряє блок C рубрики?",
 options: [
          "Лише колір бар’єра",
          "Чесність урону: сервер, анти-клієнтський one-shot, cooldown/відстань",
          "Назву модуля 1",
          "Кількість Decals у Toolbox",
        ],
 correctAnswer: 1,
 explanation: "Безпека бою.",
 },
 {
 id: "q6",
 type: MC,
 question: "Як хвилі пов’язані з ship?",
 options: [
          "Хвилі лише декоративні Part",
          "waveConfig живе тільки на клієнті як TextLabel",
          "Після смерті ворогів має стартувати наступна з waveConfig або victory",
          "Хвилі заборонені в Arena",
        ],
 correctAnswer: 2,
 explanation: "Цикл бою.",
 },
 {
 id: "q7",
 type: MC,
 question: "Що НЕ треба робити в 8.8?",
 options: [
          "Будувати 12 типів ворогів і магазин зброї замість закрити цикл",
          "Пройти рубрику",
          "Перевірити dealDamage",
          "Зберегти Place",
        ],
 correctAnswer: 0,
 explanation: "Вузький MVP.",
 },
 {
 id: "q8",
 type: MC,
 question: "Навіщо feedback (анімація/particles)?",
 options: [
          "Це вимикає серверний урон",
          "Без цього Humanoid не існує",
          "Particles замінюють MaxHealth",
          "Гравець відчуває влучання, не лише сухі цифри HP",
        ],
 correctAnswer: 3,
 explanation: "Відчуття бою.",
 },
 {
 id: "q9",
 type: MC,
 question: "Якщо меч махає, а HP стоїть - що першим?",
 options: [
          "Видалити арену",
          "Змінити тільки Sky",
          "Перевірити, чи викликається серверний dealDamage",
          "Вимкнути Output",
        ],
 correctAnswer: 2,
 explanation: "Зв’язок hit → урон.",
 },
 {
 id: "q10",
 type: MC,
 question: "Скільки триває цільове демо Ship?",
 options: [
          "Обов’язково 40 хвилин пояснень",
          "Близько 60–90 секунд без суфлера",
          "Достатньо відкрити Explorer",
          "Лише скріншот без Play",
        ],
 correctAnswer: 1,
 explanation: "Коротке демо.",
 },
 {
 id: "q11",
 type: MC,
 question: "Як 8.8 готує модуль 9 Race?",
 options: [
          "Race забороняє серверні скрипти",
          "Треба видалити всю арену з пам’яті",
          "У Race урон пише лише клієнт",
          "Звичка «сервер вирішує критичні числа» переходить на кола/фініш",
        ],
 correctAnswer: 3,
 explanation: "Дисципліна сервера.",
 },
 {
 id: "q12",
 type: MC,
 question: "Навіщо lite cooldown / перевірка відстані?",
 options: [
          "Щоб спам і удари «через пів карти» не ламали бій",
          "Щоб вимкнути Humanoid",
          "Це обов’язково для Decal",
          "Cooldown малює Billboard",
        ],
 correctAnswer: 0,
 explanation: "Захист dealDamage.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що з наведеного - P0 для арени?",
 options: [
          "Трохи кривий колір стіни",
          "Неідеальний Ambient",
          "Урон або вбивство повністю на клієнті без сервера",
          "Дрібний offset Billboard",
        ],
 correctAnswer: 2,
 explanation: "Критична дірка бою.",
 },
 {
 id: "q14",
 type: MC,
 question: "Навіщо один Place замість трьох окремих?",
 options: [
          "Studio дозволяє лише один Place у житті",
          "Три Places швидше завжди",
          "Рубрика забороняє папки",
          "Інакше немає інтегрованого золотого шляху для демо",
        ],
 correctAnswer: 3,
 explanation: "Інтеграція.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 8.8?",
 options: [
          "Лише теорія без Studio",
          "Золотий шлях + рубрика + серверний урон/хвилі + Save",
          "Порожній Baseplate",
          "Клієнтський Health= без сервера",
        ],
 correctAnswer: 1,
 explanation: "Потрібен ship арени.",
 },
 ],
 },
}
