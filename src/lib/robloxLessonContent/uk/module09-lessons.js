/** Roblox Module 09 UK — 8 уроків (prod-92), Race + мережа */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson91 = {
 lessonId: "lesson-roblox-9-1",
 moduleId: "module-09",
 order: 1,
 title: "9.1 - Машина + траса",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати просту машину на VehicleSeat з привареними колесами",
 "Побудувати замкнену трасу з чітким стартом і напрямком",
 "Розставити чекпоінти кіл з індексами для наступного HUD",
 "Перевірити, що гравець сідає, їде і не провалюється крізь підлогу",
 "Зберегти Place як базу модуля Race перед таймером і мережею",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 65 з 92)",
 content: `Модуль 9 - **Race + мережа**. Сьогодні ти не пишеш Remote і не малюєш складний GUI. Сьогодні ти збираєш **фізичну сцену гонки**: машина, яка їде, і траса, яку можна чесно об’їхати колом.

Артефакт уроку:
1. Модель \`Car\` з \`VehicleSeat\` (гравець сідає й керує).
2. Колеса прив’язані (Weld / WeldConstraint), кузов не розсипається.
3. Замкнена траса з бордюрами / стінами, щоб не вилетіти в прірву одразу.
4. Чекпоінти \`CP1..CPn\` (+ зрозумілий старт/фініш кола) з Attribute \`Index\`.

Без цього уроку 9.2 (таймер/UI) і 9.4 (Remote фінішу) ні до чого чіплятимуться: мережа без траси - порожня теорія.

**Зроби зараз (2 хв):** виріши масштаб - маленьке овальне коло на Baseplate, не місто на 20 хвилин декору. Мета - **їхати і замикати коло**.`,
 },
 {
 title: "Що таке VehicleSeat (простими словами)",
 content: `| Об’єкт | Роль |
|--------|------|
| **Seat** | Просто сісти |
| **VehicleSeat** | Сісти + керування транспортом (throttle/steer) |

VehicleSeat дає властивості на кшталт \`Throttle\` / \`Steer\` (і пов’язану логіку руху, коли правильно зібрана модель). Для навчальної гонки курсу цього достатньо: не обов’язково писати свій chassis з нуля в перший день.

Метафора: VehicleSeat - **крісло пілота з рулем**. Без нього Part «машина» - лише декорація.

Типовий мінімум моделі:
- Part \`Body\` (кузов)
- VehicleSeat зверху/всередині кузова
- 4× Part \`Wheel\` (можна Cylinder)
- Зв’язки кузов↔колеса`,
 },
 {
 title: "Збірка Car: кузов і сидіння",
 content: `У Workspace (або ServerStorage → потім клон) створи Model \`Car\`:

1. Part \`Body\` - розмір орієнтовно 6×2×3 (підлаштуй), Anchored спочатку **true** для зручного редагування.
2. Додай \`VehicleSeat\`, постав на кузов, поверни так, щоб гравець дивився вперед по трасі.
3. Зроби Seat частиною моделі: Parent = Car.
4. PrimaryPart моделі постав на Body (зручно для Pivot / телепортів пізніше).

Перевір у Play: підійди, натисни Sit / E (залежно від налаштувань) - маєш сісти. Якщо не сідаєш - Seat може бути всередині геометрії або \`Disabled\`.

**Зроби зараз (8 хв):** Body + VehicleSeat у Model Car, сідаєш у Play. Колеса ще можна без руху.`,
 },
 {
 title: "Колеса і Weld - щоб не розсипалось",
 content: `Додай 4 колеса. Для старту Anchored=true на всіх, вирівняй позиції.

Зв’язок:
- \`WeldConstraint\` між Body і кожним Wheel, **або**
- класичний Weld у дереві моделі (як прийнято у вашому шаблоні школи).

Після збірки:
1. Зніми Anchored з коліс і кузова (Seat теж), щоб фізика працювала.
2. Переконайся, що модель не «вибухає» на стиках.

| Симптом | Ймовірна причина |
|---------|------------------|
| Колеса відлітають | Немає Weld / не той Part0-Part1 |
| Машина провалюється | Немає підлоги / CanCollide |
| Не їде | Seat не VehicleSeat / орієнтація / збірка |
| Крутиться на місці | Центр мас / колеса криво |

Не витрачай годину на ідеальний тюнінг. Достатньо: сідаєш → їдеш вперед по прямій → повертаєш слабко.`,
 },
 {
 title: "Орієнтація: куди «перед»",
 content: `Якщо машина їде боком або назад:
- розверни VehicleSeat (LookVector вперед по трасі);
- перевір, що кузов і колеса узгоджені;
- у Model постав маркери \`Front\` (маленький Part) щоб очі бачили напрямок.

На трасі старт-пад розверни так само: гравець виїжджає носом у перший поворот, не в стіну.

**Зроби зараз (5 хв):** проїдь 20 studs по рівній підлозі. Якщо їде - орієнтація ок для уроку.`,
 },
 {
 title: "Траса: овал, не лабіринт",
 content: `Збери **замкнений** маршрут:
1. Широка дорога (Parts або Terrain path) - мінімум 12–16 studs ширини для новачка.
2. Бордюри / невидимі стіни з боків (CanCollide true).
3. Старт: Part \`StartLine\` або Spawn біля машини.
4. Без ям у першій версії - спочатку стабільне коло.

Метафора: картинг, не ралі Дакар. Декор (трибуни, прапори) - опційно після того, як коло **замикається**.

Чекліст форми:
- [ ] Можна проїхати коло, не застрягаючи
- [ ] Є зрозумілий «ось старт»
- [ ] Немає випадкового Teleport у void
- [ ] Камера не всередині стіни на старті`,
 },
 {
 title: "Чекпоінти кіл: навіщо вже зараз",
 content: `У 9.2 HUD рахуватиме кола. Йому потрібні точки на трасі.

Створи Parts (CanCollide false, Transparency 0.5 для дебагу):
- \`CP1\`, \`CP2\`, \`CP3\`, \`CP4\` (або 3 - як вирішиш)
- Attribute \`Index\` = 1,2,3,4
- Розстав **по порядку** вздовж руху: не клади CP3 перед CP1 на маршруті

Фініш кола: часто після останнього CP повернення до зони старту / окремий \`LapGate\` з правилом у скрипті 9.2.

Імена стабільні: потім LocalScript шукатиме \`Workspace.Race.Checkpoints.CP1\` тощо. Краще одразу папка:

\`Workspace\`
\` └── Race\`
\` ├── Track\`
\` ├── Car\`
\` └── Checkpoints\`
\` ├── CP1 (Index=1)\`
\` ├── CP2\`
\` └── ...\`

**Зроби зараз (10 хв):** 3–4 CP з Index, проїдь і очима перевір порядок.`,
 },
 {
 title: "Spawn, респавн і тест «сів і поїхав»",
 content: `| Крок | Дія | Ок якщо |
|------|-----|---------|
| 1 | Play | Машина на трасі, не під картою |
| 2 | Сісти | Camera/керування адекватні |
| 3 | Газ | Їдеш трасою |
| 4 | Коло | Повертаєшся до старту без reset Place |
| 5 | Перевернувся | Є план: респавн Seat / кнопка Reset (можна завтра) |

Якщо VehicleSeat «не тягне» навчальну швидкість - трохи підкрути розміри/масу, але не перетворюй урок на симулятор фізики.

Опційно: SpawnLocation біля StartLine, щоб після смерті не телепорт на край карти.`,
 },
 {
 title: "Організація Place і Save",
 content: `Імена для курсу:
- Place / файл: \`Lesson 9.1 - Race Car Track\`
- Папка \`Race\` як корінь сцени модуля
- Не змішуй RPG-інвентар зі старих чернеток у цей Place

Що НЕ робити сьогодні:
- RemoteEvent «на майбутнє» без потреби
- Складний UI таймера (це 9.2)
- Анти-чит і лідерборд

Що МОЖНА:
- легкий колір дороги
- один Billboard «Старт» над лінією
- друга машина-копія для друга в Studio (опційно)

Чистота сцени = швидший дебаг у 9.4–9.7.`,
 },
 {
 title: "Playtest білду траси",
 content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Сісти в Car | Сидиш у VehicleSeat |
| 2 | Проїзд прямій | Не розсипаються колеса |
| 3 | Повне коло | Повертаєшся до StartLine |
| 4 | CP видно / Index є | Порядок логічний |
| 5 | Стіна збоку | Не вилітаєш одразу в void |
| 6 | Stop/Play знову | Модель ціла, Anchored знятий свідомо |
| 7 | Explorer | Папка Race зрозуміла ментору |

Якщо коло не замикається за 30 с їзди - зменш трасу. Краще маленьке стабільне коло, ніж красиве недоїжджаєме.`,
 },
 {
 title: "Чекліст здачі уроку 65",
 content: `- [ ] Model Car з VehicleSeat
- [ ] Колеса приварені, машина їде
- [ ] Замкнена траса з бордюрами
- [ ] Checkpoints з Attribute Index по порядку
- [ ] Папка Race в Explorer
- [ ] Playtest «сів → коло» зелений
- [ ] Save: Lesson 9.1 - Race Car Track

Далі **9.2** повісить на цю сцену таймер і лічильник кіл. Якщо сьогодні CP криві - завтра HUD збожеволіє. Якщо машина не їде - немає сенсу малювати TimeLabel.

Артефакт модуля починається тут: **є що ганяти**. Мережа прийде на готову трасу, не на порожній Baseplate.

Це білд-урок: руки в Studio важливіші за довгі формули. Збережи Place до закриття.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Звичайний Seat замість VehicleSeat",
 explanation: "Сідаєш, але немає нормального керування авто.",
 correctApproach: "VehicleSeat у моделі Car",
 },
 {
 mistake: "Колеса без Weld і з CanCollide хаосом",
 explanation: "Модель розлітається на першому кадрі фізики.",
 correctApproach: "WeldConstraint до Body, перевірка в Play",
 },
 {
 mistake: "Траса без бордюрів на краю Baseplate",
 explanation: "Постійні падіння у void, злиться playtest.",
 correctApproach: "Стіни/бордюри вздовж маршруту",
 },
 {
 mistake: "Чекпоінти без Index або в хаотичному порядку",
 explanation: "У 9.2 кола не зійдуться.",
 correctApproach: "Attribute Index 1..n уздовж руху",
 },
 {
 mistake: "Година на декор трибун замість їздного кола",
 explanation: "Немає артефакту для наступних уроків.",
 correctApproach: "Спочатку овал що їде, декор потім",
 },
 {
 mistake: "Залишити все Anchored=true назавжди",
 explanation: "«Машина» стоїть як пам’ятник.",
 correctApproach: "Зняти Anchored після збірки Weld",
 },
 ],
 summary: "Ти зібрав базу Race: VehicleSeat-машина з колесами на Weld, замкнена траса і чекпоінти з Index. Це сцена для таймера (9.2) і далі мережі. Без їздного кола модуль не стартує.",
 practiceTask: {
 title: "Картинг на Baseplate (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** сісти в авто і проїхати замкнене коло з чекпоінтами.

### Part A - Машина (12 хв)
1. Model Car: Body + VehicleSeat.
2. 4 колеса + WeldConstraint.
3. Зняти Anchored, перевірити Sit + рух.

### Part B - Траса (10 хв)
1. Замкнений овал / прямокутний маршрут.
2. Бордюри.
3. StartLine біля спавну машини.

### Part C - Чекпоінти (8 хв)
1. Папка Race/Checkpoints.
2. CP з Attribute Index по порядку.
3. Проїдь коло очима.
4. **Save:** Lesson 9.1 - Race Car Track`,
 hints: [
 "Спочатку пряма 30 studs - потім замикай овал",
 "Transparency 0.5 на CP допомагає бачити зони",
 "Якщо не їде - перевір що це VehicleSeat і орієнтацію",
 ],
 optionalChallenge: "Друга копія Car на піт-лейні + табличка Part «P2» для спліт-скрін playtest завтра.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 9.1?",
 options: [
 "Зібрати машину на VehicleSeat і замкнену трасу з чекпоінтами",
 "Написати повний анти-чит магазин",
 "Видалити всі Parts",
 "Зробити лише RemoteFunction",
 ],
 correctAnswer: 0,
 explanation: "Білд Race-сцени.",
 },
 {
 id: "q2",
 type: MC,
 question: "Чим VehicleSeat відрізняється від звичайного Seat у цьому уроці?",
 options: [
 "Дає керування транспортом (газ/руль), не лише сидіння",
 "Забороняє Weld",
 "Працює лише в Lighting",
 "Автоматично малює HUD кіл",
 ],
 correctAnswer: 0,
 explanation: "Крісло пілота.",
 },
 {
 id: "q3",
 type: MC,
 question: "Навіщо WeldConstraint між кузовом і колесами?",
 options: [
 "Щоб колеса не відлітали від Body під фізикою",
 "Щоб вимкнути Collision",
 "Щоб створити RemoteEvent",
 "Це замінює чекпоінти",
 ],
 correctAnswer: 0,
 explanation: "Зв’язок моделі.",
 },
 {
 id: "q4",
 type: MC,
 question: "Чому спочатку краще маленьке овальне коло?",
 options: [
 "Швидше отримати їздний артефакт для наступних уроків",
 "Roblox забороняє великі траси",
 "VehicleSeat працює лише на овалі",
 "Чекпоінти не ставляться на прямих",
 ],
 correctAnswer: 0,
 explanation: "Спочатку стабільність.",
 },
 {
 id: "q5",
 type: MC,
 question: "Навіщо Attribute Index на CP?",
 options: [
 "Щоб у 9.2 рахувати кола в правильному порядку",
 "Це обов’язково для Skybox",
 "Index замінює VehicleSeat",
 "Без Index машина не їде",
 ],
 correctAnswer: 0,
 explanation: "Підготовка до HUD.",
 },
 {
 id: "q6",
 type: MC,
 question: "Що робити з Anchored після збірки Weld?",
 options: [
 "Зняти з кузова/коліс, щоб фізика й рух працювали",
 "Залишити true назавжди обов’язково",
 "Anchored лише на RemoteEvent",
 "Видалити всі Parts",
 ],
 correctAnswer: 0,
 explanation: "Інакше пам’ятник.",
 },
 {
 id: "q7",
 type: MC,
 question: "Навіщо бордюри на трасі?",
 options: [
 "Менше падінь у void і стабільніший playtest",
 "Вони створюють leaderstats",
 "Без них LocalScript не стартує",
 "Це єдиний спосіб сісти в Seat",
 ],
 correctAnswer: 0,
 explanation: "Тримають на дорозі.",
 },
 {
 id: "q8",
 type: MC,
 question: "Яка структура папок зручна для модуля?",
 options: [
 "Workspace.Race з Track, Car, Checkpoints",
 "Усе безіменне в корені Lighting",
 "Лише ServerScriptService без сцени",
 "Випадкові назви Part1 Part2",
 ],
 correctAnswer: 0,
 explanation: "Чистий Explorer.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що НЕ обов’язково робити в 9.1?",
 options: [
 "Повний RemoteEvent анти-чит фінішу",
 "Поставити VehicleSeat",
 "Зібрати замкнену трасу",
 "Додати чекпоінти з Index",
 ],
 correctAnswer: 0,
 explanation: "Мережа пізніше.",
 },
 {
 id: "q10",
 type: MC,
 question: "Якщо машина їде боком, що перевірити першим?",
 options: [
 "Орієнтацію VehicleSeat і «перед» моделі",
 "Видалення Baseplate",
 "Назву модуля 12",
 "Publish settings лише",
 ],
 correctAnswer: 0,
 explanation: "Напрямок носа.",
 },
 {
 id: "q11",
 type: MC,
 question: "Який CanCollide логічний для тригер-чекпоінта?",
 options: [
 "Часто false (зона-тригер), щоб не стіна на дорозі",
 "Завжди true як скеля",
 "Чекпоінт не може бути Part",
 "Лише MeshPart без Attribute",
 ],
 correctAnswer: 0,
 explanation: "Тригер, не бар’єр.",
 },
 {
 id: "q12",
 type: MC,
 question: "Як 9.1 готує 9.2?",
 options: [
 "Дає трасу й CP, на які повісять таймер і лічильник кіл",
 "9.2 видаляє машину",
 "Без UI вже є лідерборд сервера",
 "9.2 потребує лише Terrain water",
 ],
 correctAnswer: 0,
 explanation: "Сцена для HUD.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що вважати успішним playtest машини?",
 options: [
 "Сів, проїхав, коло замикається без розвалу моделі",
 "Лише відкрив Explorer",
 "Змінив колір неба",
 "Написав 10 Remote без Place",
 ],
 correctAnswer: 0,
 explanation: "Їздний артефакт.",
 },
 {
 id: "q14",
 type: MC,
 question: "Чому важливий порядок CP на маршруті?",
 options: [
 "Лічильник кіл очікує зростаючі індекси по ходу руху",
 "Roblox сортує Parts за алфавітом завжди правильно",
 "Index потрібен лише для Sound",
 "Порядок не впливає ні на що",
 ],
 correctAnswer: 0,
 explanation: "Ланцюг для 9.2.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 9.1?",
 options: [
 "Car + замкнена траса + CP Index + Save",
 "Лише текст теорії",
 "Порожній Baseplate",
 "Магазин монет без авто",
 ],
 correctAnswer: 0,
 explanation: "База Race.",
 },
 ],
 },
}

export const ukLesson92 = {
 lessonId: "lesson-roblox-9-2",
 moduleId: "module-09",
 order: 2,
 title: "9.2 - Таймер / кола / UI",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати HUD гонки: кола, час, статус заїзду",
 "Порахувати кола через чекпоінти з уроку 9.1",
 "Запустити таймер заїзду й показати час у зручному форматі",
 "Оновити TextLabel з LocalScript без ламання камери/машини",
 "Підготувати UI під мережу: завтра 9.3 пояснить, чому цифри на екрані ще не «правда сервера»",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 66 з 92)",
 content: `У **9.1** ти зібрав машину й трасу з чекпоінтами. Сьогодні додаєш **приладову панель гонщика**: скільки кіл пройдено, який час іде, чи ти вже на фініші.

Артефакт уроку:
1. ScreenGui \`RaceHUD\` з полями Laps / Time / Status.
2. LocalScript, що оновлює ці поля під час заїзду.
3. Підрахунок кіл по чекпоінтах (порядок 1→2→…→фініш кола).
4. Таймер від старту до фінішу (або до цільової кількості кіл).

Це ще **навчальний HUD**: цифри можуть жити на клієнті, щоб ти швидко побачив результат. У **9.3–9.5** ти зрозумієш, чому для чесної гонки з друзями «правда» має бути на сервері - але спочатку навчись **читати заїзд очима**.

**Зроби зараз (2 хв):** відкрий Place з 9.1 і напиши: скільки кіл хочеш у заїзді (2 чи 3) і де стоїть фінішна лінія.`,
 },
 {
 title: "Що саме рахуємо",
 content: `| Метрика | Зміст | Де показуєш |
|---------|--------|-------------|
| **Laps** | Скільки повних кіл завершено | Велике число на HUD |
| **Checkpoint** | Останній чесний cp (опційно) | Дрібний підпис |
| **Time** | Секунди від старту | \`mm:ss\` або \`12.3s\` |
| **Status** | Waiting / Racing / Finished | Короткий текст |

Метафора: спідометр і одометр у машині. Без них ти «їдеш», але не знаєш, чи вже третє коло.

Правило здачі: гравець **бачить** прогрес без Output. Output лишається для тебе як дебаг.`,
 },
 {
 title: "Збірка RaceHUD (StarterGui)",
 content: `У **StarterGui** створи ScreenGui \`RaceHUD\` (ResetOnSpawn = false, щоб HUD не зникав після респавну без потреби).

Всередині Frame \`Panel\` (кут екрана, не весь viewport):
- TextLabel \`LapsLabel\` - наприклад \`Кола: 0 / 3\`
- TextLabel \`TimeLabel\` - \`Час: 0.0\`
- TextLabel \`StatusLabel\` - \`Готовий\`
- (опційно) TextLabel \`HintLabel\` - \`Проїжджай чекпоінти по порядку\`

Стиль мінімальний: читабельний шрифт, контрастний текст, без купи кнопок. HUD не повинен перекривати кермо камери по центру.

**Зроби зараз (8 хв):** постав 3 лейбли з плейсхолдерами. Поки без скрипта - лише щоб видно в Play.`,
 },
 {
 title: "LocalScript: хто малює HUD",
 content: `Під \`RaceHUD\` додай **LocalScript** \`RaceHudController\`.

Чому LocalScript:
- ScreenGui гравця живе на клієнті.
- Ти читаєш ввід/локальні Touched (для навчального етапу) і пишеш у TextLabel.

Шаблон старту:

\`local Players = game:GetService("Players")\`
\`local player = Players.LocalPlayer\`
\`local gui = script.Parent\`
\`local lapsLabel = gui.Panel:WaitForChild("LapsLabel")\`
\`local timeLabel = gui.Panel:WaitForChild("TimeLabel")\`
\`local statusLabel = gui.Panel:WaitForChild("StatusLabel")\`

\`WaitForChild\` рятує від «attempt to index nil», якщо інстанси ще підвантажуються.

Не клади цей контролер у ServerScriptService: серверний Script **не** керує твоїм особистим ScreenGui так само просто.`,
 },
 {
 title: "Стан заїзду в таблиці",
 content: `Тримай один локальний стан (поки на клієнті):

\`local race = {\`
\` laps = 0,\`
\` targetLaps = 3,\`
\` lastCheckpoint = 0,\`
\` totalCheckpoints = 4,\`
\` racing = false,\`
\` finished = false,\`
\` startTime = 0,\`
\`}\`

Оновлення UI - окрема функція:

\`local function refreshHud()\`
\` lapsLabel.Text = "Кола: " .. race.laps .. " / " .. race.targetLaps\`
\` statusLabel.Text = race.finished and "Фініш!" or (race.racing and "Їдеш" or "Очікування")\`
\`end\`

Не розкидай \`LapsLabel.Text = ...\` по 15 місцях - одна \`refreshHud\` менше багів.

**Зроби зараз (5 хв):** змусь Status показувати «Очікування», а кнопкою/Part «Start» перемикай на «Їдеш» і \`race.racing = true\`.`,
 },
 {
 title: "Таймер: os.clock і формат",
 content: `Коли заїзд стартує:

\`race.startTime = os.clock()\`
\`race.racing = true\`

У циклі (Heartbeat або \`task.wait\` у loop, поки racing):

\`local elapsed = os.clock() - race.startTime\`
\`timeLabel.Text = "Час: " .. string.format("%.1f", elapsed)\`

Або формат \`m:ss\`:

\`local m = math.floor(elapsed / 60)\`
\`local s = math.floor(elapsed % 60)\`
\`timeLabel.Text = string.format("Час: %d:%02d", m, s)\`

Не використовуй \`wait()\` без ліміту в тілі, що блокує все. Краще:

\`game:GetService("RunService").Heartbeat:Connect(function()\`
\` if not race.racing or race.finished then return end\`
\` -- оновити TimeLabel\`
\`end)\`

На фініші зафіксуй \`finalTime = os.clock() - race.startTime\` і зупини оновлення.`,
 },
 {
 title: "Кола через чекпоінти (порядок)",
 content: `З 9.1 у тебе Part'и \`CP1\`, \`CP2\`, … і фініш кола (часто той самий \`CP1\` або окремий \`LapGate\`).

Правило зарахування:
1. Можна взяти лише **наступний** індекс: якщо \`lastCheckpoint == 2\`, приймаємо лише 3.
2. Коли пройдено останній cp і знову валідний «закриття кола» - \`laps += 1\`, \`lastCheckpoint = 0\` (або 1 - обери одну схему і тримайся її).
3. Якщо \`laps >= targetLaps\` - \`finished = true\`, \`racing = false\`.

Псевдокод:

\`local function onCheckpoint(index)\`
\` if not race.racing or race.finished then return end\`
\` if index ~= race.lastCheckpoint + 1 then return end\`
\` race.lastCheckpoint = index\`
\` if index == race.totalCheckpoints then\`
\` race.laps += 1\`
\` race.lastCheckpoint = 0\`
\` if race.laps >= race.targetLaps then\`
\` race.finished = true\`
\` race.racing = false\`
\` end\`
\` end\`
\` refreshHud()\`
\`end\`

Анти-спам: один і той самий cp не рахуй 20 разів підряд - після прийняття ігноруй повтор, доки не з'явиться інший індекс.`,
 },
 {
 title: "Підключення Touched без хаосу",
 content: `Для кожного чекпоінта:

\`cp.Touched:Connect(function(hit)\`
\` local character = hit.Parent\`
\` local hum = character and character:FindFirstChildOfClass("Humanoid")\`
\` if not hum then return end\`
\` local plr = Players:GetPlayerFromCharacter(character)\`
\` if plr ~= player then return end\`
\` onCheckpoint(tonumber(cp:GetAttribute("Index")) or n)\`
\`end)\`

Або читай Index з Attribute / з імені \`CP3\`.

Типові баги:
| Баг | Фікс |
|-----|------|
| Коло +1 від колеса машини 40 разів/с | debounce + порядок індексів |
| Чужий гравець дає тобі коло | перевірка \`plr == LocalPlayer\` |
| Фініш без усіх cp | вимагай повний ланцюг |

Пам’ятай: сьогодні Touched на клієнті - **навчання UI**. Завтра в 9.3 ти побачиш, чому чітер може підробити такий лічильник. Не лякайся - спочатку зроби, щоб чесний заїзд виглядав правильно.`,
 },
 {
 title: "Старт заїзду: Part, Prompt або клавіша",
 content: `Варіанти старту (обери один):
1. Part \`StartPad\` + Touched → \`beginRace()\`.
2. ProximityPrompt «Старт».
3. Клавіша R через UserInputService (обережно в авто).

\`beginRace\` має:
- скинути \`laps\`, \`lastCheckpoint\`, \`finished\`
- виставити \`startTime\`
- \`racing = true\`
- \`refreshHud()\`

Не стартуй таймер у \`script\` top-level без дії гравця - інакше час тікає ще в меню.

Після фінішу покажи Status \`Фініш!\` і заморозь Time на фінальному значенні.`,
 },
 {
 title: "Playtest HUD (чесний проїзд)",
 content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Play, ще не старт | Кола 0, статус очікування, час не біжить |
| 2 | Старт | Статус «Їдеш», час іде |
| 3 | Проїзд CP не по порядку | Коло не додається |
| 4 | Повний ланцюг | Laps 1, lastCheckpoint скидається |
| 5 | Досягти targetLaps | Finished, час стоїть |
| 6 | Респавн / вихід з машини | HUD не «вмирає» без причини (ResetOnSpawn продуманий) |
| 7 | Output | Немає спаму помилок Touched |

Якщо час іде, а кола ні - дивись Attributes індексів. Якщо кола скачуть - debounce.`,
 },
 {
 title: "Чекліст здачі уроку 66 + місток до 9.3",
 content: `- [ ] RaceHUD з Laps / Time / Status
- [ ] LocalScript оновлює лейбли
- [ ] Таймер від старту, стоп на фініші
- [ ] Кола лише по порядку чекпоінтів
- [ ] targetLaps працює (2 або 3)
- [ ] Playtest 1–5 зелені
- [ ] Save: Lesson 9.2 - Race Timer UI

**Що далі:** у **9.3** розберемо Client vs Server: чому цей самий HUD - лише «табло в кабіні», а не суддя. У **9.4–9.5** кола переїдуть на сервер, а UI лишиться вітриною.

Артефакт: гонка, в якій ти **бачиш** прогрес. Без цього Remote завтра нічого зрозумілого не покаже.

Це урок «відчути заїзд», не «виграти анти-чит». Анти-чит прийде після карти скриптів.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Таймер стартує одразу при Play",
 explanation: "Час бреше ще до виїзду.",
 correctApproach: "startTime лише в beginRace()",
 },
 {
 mistake: "Кожне Touched = +коло",
 explanation: "Спам і миттєвий фініш.",
 correctApproach: "Порядок індексів + debounce",
 },
 {
 mistake: "TextLabel оновлюють у 10 місцях копіпастою",
 explanation: "Легко розсинхронізувати Status і Laps.",
 correctApproach: "Одна refreshHud()",
 },
 {
 mistake: "HUD у Workspace як Billboard на трасі замість ScreenGui",
 explanation: "Погано читається з камери машини.",
 correctApproach: "StarterGui ScreenGui для особистого HUD",
 },
 {
 mistake: "ResetOnSpawn зносить UI посеред заїзду без відновлення стану",
 explanation: "Гравець «губить» таймер очима.",
 correctApproach: "false або відновлюй стан після CharacterAdded",
 },
 {
 mistake: "Вважати клієнтський laps остаточною правдою мультиплеєра",
 explanation: "Завтра це стане діркою.",
 correctApproach: "Сьогодні OK для навчання; 9.3+ перенесе облік на сервер",
 },
 ],
 summary: "Ти зібрав HUD гонки: кола по чекпоінтах, таймер від старту, Status на екрані. LocalScript малює прогрес. Далі 9.3 пояснить межу клієнта й сервера - щоб ці цифри стали чесними в мережі.",
 practiceTask: {
 title: "Приладова панель заїзду (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** бачити кола і час під час проїзду траси з 9.1.

### Part A - HUD (8 хв)
1. StarterGui → RaceHUD → Panel з Laps/Time/Status.
2. LocalScript RaceHudController + WaitForChild.
3. refreshHud() з плейсхолдерами.

### Part B - Таймер і старт (10 хв)
1. beginRace(): скидання стану, startTime, racing=true.
2. Heartbeat оновлює TimeLabel.
3. Фініш зупиняє таймер.

### Part C - Кола (12 хв)
1. Підключи CP з Attributes Index.
2. Лише наступний індекс; повне коло → laps++.
3. targetLaps → Finished.
4. **Save:** Lesson 9.2 - Race Timer UI`,
 hints: [
 "Спочатку змусь Time тікати без кіл - потім додай CP",
 "print(index) на Touched швидко покаже спам",
 "Один refreshHud після кожної зміни стану",
 ],
 optionalChallenge: "Покажи «кращий час» у Session (змінна bestTime), якщо фінішував швидше за попередній заїзд у цій сесії Studio.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 9.2?",
 options: [
 "Показати на HUD кола і час заїзду",
 "Видалити машину з 9.1",
 "Одразу зробити RemoteEvent магазин",
 "Публікувати гру без траси",
 ],
 correctAnswer: 0,
 explanation: "Таймер / кола / UI.",
 },
 {
 id: "q2",
 type: MC,
 question: "Де зазвичай лежить особистий RaceHUD?",
 options: [
 "StarterGui (ScreenGui)",
 "ServerStorage як єдиний варіант",
 "Lighting",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "UI гравця.",
 },
 {
 id: "q3",
 type: MC,
 question: "Який скрипт зручно ставить текст на ScreenGui гравця?",
 options: [
 "LocalScript",
 "Лише ModuleScript у SSS без клієнта",
 "SoundService",
 "Plugin лише",
 ],
 correctAnswer: 0,
 explanation: "Клієнтський UI.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо WaitForChild для LapsLabel?",
 options: [
 "Інстанс може ще не встигнути з’явитись",
 "Це вимикає таймер назавжди",
 "Без цього сервер не стартує",
 "WaitForChild замінює Touched",
 ],
 correctAnswer: 0,
 explanation: "Надійний старт.",
 },
 {
 id: "q5",
 type: MC,
 question: "Коли ставити race.startTime?",
 options: [
 "У момент старту заїзду (beginRace)",
 "Одразу в першому рядку LocalScript завжди",
 "Лише після Publish",
 "У назві Part фінішу",
 ],
 correctAnswer: 0,
 explanation: "Таймер від старту.",
 },
 {
 id: "q6",
 type: MC,
 question: "Як чесно рахувати кола по чекпоінтах?",
 options: [
 "Приймати лише наступний індекс у порядку",
 "Будь-який Touched = +1 коло",
 "Рахувати лише колір Part",
 "Збільшувати laps у Lighting",
 ],
 correctAnswer: 0,
 explanation: "Ланцюг CP.",
 },
 {
 id: "q7",
 type: MC,
 question: "Навіщо debounce / ігнор повтору того самого CP?",
 options: [
 "Touched спамить і може накрутити прогрес",
 "Roblox забороняє Touched без debounce назавжди",
 "Це замінює VehicleSeat",
 "Без цього UI не існує",
 ],
 correctAnswer: 0,
 explanation: "Анти-спам.",
 },
 {
 id: "q8",
 type: MC,
 question: "Що робить refreshHud?",
 options: [
 "Одним місцем оновлює Laps/Time/Status з таблиці race",
 "Видаляє трасу",
 "Створює RemoteEvent",
 "Публікує Place",
 ],
 correctAnswer: 0,
 explanation: "Єдине оновлення UI.",
 },
 {
 id: "q9",
 type: MC,
 question: "Чому урок попереджає, що клієнтський laps - не фінал для мультиплеєра?",
 options: [
 "Клієнт можна підробити; чесний облік буде на сервері пізніше",
 "LocalScript не вміє змінювати TextLabel",
 "Таймер заборонений у Roblox",
 "Чекпоінти не існують на клієнті",
 ],
 correctAnswer: 0,
 explanation: "Місток до 9.3+.",
 },
 {
 id: "q10",
 type: MC,
 question: "Що має статись при досягненні targetLaps?",
 options: [
 "finished=true, таймер зупиняється, Status фініш",
 "Гра обов’язково Remове всі Parts",
 "Кола скидаються в мінус",
 "Камера вимикається назавжди",
 ],
 correctAnswer: 0,
 explanation: "Кінець заїзду.",
 },
 {
 id: "q11",
 type: MC,
 question: "Який сервіс зручний для тіку таймера кожен кадр?",
 options: [
 "RunService.Heartbeat",
 "ChatService як єдиний варіант",
 "TeleportService",
 "BadgeService",
 ],
 correctAnswer: 0,
 explanation: "Плавне оновлення часу.",
 },
 {
 id: "q12",
 type: MC,
 question: "Навіщо перевіряти, що Touched - саме LocalPlayer?",
 options: [
 "Щоб чужий персонаж не крутив твій HUD",
 "Інакше машина не їде",
 "Інакше Studio закриється",
 "Touched працює лише з NPC",
 ],
 correctAnswer: 0,
 explanation: "Фільтр гравця.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що логічно показати до старту?",
 options: [
 "Очікування, кола 0, час ще не біжить",
 "Одразу Finished",
 "999 кіл",
 "Порожній екран без лейблів",
 ],
 correctAnswer: 0,
 explanation: "Чистий престарт.",
 },
 {
 id: "q14",
 type: MC,
 question: "Як 9.2 готує 9.5 лідерборд?",
 options: [
 "Ти вже маєш поля кіл/часу на UI - далі їх наповнить сервер",
 "9.5 видаляє весь HUD",
 "Лідерборд не потребує чисел",
 "Треба забути чекпоінти",
 ],
 correctAnswer: 0,
 explanation: "Вітрина вже є.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 9.2?",
 options: [
 "HUD з колами й таймером на трасі 9.1 + Save",
 "Лише теорія без Play",
 "Порожній Baseplate",
 "Магазин GamePass без гонки",
 ],
 correctAnswer: 0,
 explanation: "Потрібна приладова панель.",
 },
 ],
 },
}

export const ukLesson93 = {
 lessonId: "lesson-roblox-9-3",
 moduleId: "module-09",
 order: 3,
 title: "9.3 - Client vs Server",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Пояснити різницю клієнта і сервера простими словами",
 "Знати, де запускаються Script, LocalScript і ModuleScript",
 "Зрозуміти реплікацію і FilteringEnabled (за замовчуванням)",
 "Показати антиприклад: клієнт сам додає собі «монети/кола»",
 "Накреслити карту папок під Remotes (RS) перед уроком 9.4",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 67 з 92)",
 content: `Це **фундамент мережі**. Без нього RemoteEvent у 9.4 здається магією.

Сьогодні майже не будуєш нову трасу. Сьогодні ти **розумієш карту**:
1. Хто такий **сервер**, хто **клієнт**.
2. Який скрипт де живе.
3. Чому LocalScript не може чесно «дати собі 999 кіл».
4. Де завтра ляжуть Remotes.

Артефакт: схема на папері/в нотатці + мінімальний Place з підписаними папками + демо антиприкладу в Output.

**Зроби зараз (2 хв):** напиши одним реченням, хто в твоєму житті «суддя», а хто «гравець з джойстиком». Це метафора сервер/клієнт.`,
 },
 {
 title: "Сервер і клієнт простими словами",
 content: `| | Сервер | Клієнт |
|--|--------|--------|
| Хто | Комп’ютер Roblox / «суддя гри» | Твій ПК / телефон, екран |
| Бачить | Усіх гравців, правду світу | Переважно тебе + те, що реплікувалось |
| Рішає | Монети, кола, фініш, шкода | Камера, UI, ввід WASD |
| Скрипт | \`Script\` | \`LocalScript\` |

Метафора гонки: сервер - **суддя з секундоміром**. Клієнт - **гонщик з приладовою панеллю**. Панель може брехати - секундомір ні.

У Studio при Play ти часто бачиш і те, і те в одному вікні - тому легко забути різницю. У справжній грі клієнтів багато, сервер один.`,
 },
 {
 title: "FilteringEnabled - чому «не виходить» змінити світ з клієнта",
 content: `У сучасному Roblox за замовчуванням увімкнено модель, де клієнт **не** є господарем світу.

Наслідок:
- LocalScript змінив \`leaderstats.Coins\` у себе на екрані? Часто **не стане правдою** для сервера / інших.
- LocalScript створив Part? Інші можуть не побачити / сервер не визнає як ігровий факт.
- Щоб попросити сервер змінити правду - потрібен **Remote** (завтра).

Не зубри назву FilteringEnabled як заклинання. Запам’ятай правило: **клієнт просить, сервер вирішує**.`,
 },
 {
 title: "Реплікація: що «їде» між світами",
 content: `| Що | Типово |
|----|--------|
| Parts у Workspace (з сервера) | Бачать гравці |
| leaderstats Values з сервера | Бачить клієнт у TAB |
| ScreenGui у StarterGui | Копіюється кожному гравцю |
| Змінна \`local laps = 0\` у LocalScript | **Лише** на цьому клієнті |
| Змінна в Script SSS | На сервері; клієнт сам не читає Lua-пам’ять сервера |

Реплікація = «копія/оновлення для інших». Не все реплікується. Тому UI на клієнті може показувати одне, а серверний print - інше, якщо ти розсинхронив логіку.`,
 },
 {
 title: "Script vs LocalScript vs ModuleScript",
 content: `| Тип | Де працює | Типові місця |
|-----|-----------|--------------|
| **Script** | Сервер | SSS, Workspace (серверний контекст) |
| **LocalScript** | Клієнт | StarterGui, StarterPlayerScripts, Tool |
| **ModuleScript** | Там, звідки require | RS (спільне), SSS (серверні модулі) |

Пастки:
- LocalScript у SSS - **не** стане клієнтським UI-кодом.
- Script у StarterGui - не замінить LocalScript для кнопок гравця.
- Module у RS бачить і клієнт, і сервер - **не клади туди секрети** (адмін-паролі, приватні ключі).

**Зроби зараз (5 хв):** у своєму Place підпиши стікером/нотаткою біля кожного Script: S чи L.`,
 },
 {
 title: "Карта папок гонки (стандарт перед Remotes)",
 content: `Заготовь (навіть порожні папки):

\`ReplicatedStorage/\`
\` └── Remotes/\` ← завтра сюди RemoteEvent

\`ServerScriptService/\`
\` ├── Systems/\` ← Srv_Race, облік кіл
\` └── Modules/\` ← Config гонки (сервер)

\`StarterGui/\`
\` └── RaceUI/\` ← LocalScripts HUD

\`StarterPlayer/\`
\` └── StarterPlayerScripts/\` ← ввід, камера lite

\`Workspace/\`
\` └── Track/\` Cars/ Checkpoints/

Це не бюрократія. Це щоб у 9.4 не шукати «куди класти Remote» 15 хвилин.`,
 },
 {
 title: "Антиприклад: клієнт дає собі кола",
 content: `Уяви LocalScript:

\`-- АНТИПРИКЛАД (для навчання)\`
\`player.leaderstats.Laps.Value = 99\`

або

\`lapsLabel.Text = "99"\`

Перший варіант: спроба змінити Value з клієнта - у правильній архітектурі **не** стане серверною правдою (або одразу відкотиться).  
Другий: екран бреше, сервер нічого не знає.

Правильно: сервер робить \`Laps.Value = race[player].laps\` після чесного коло.

**Практика антиприкладу (8 хв):**
1. Спробуй змінити Laps з LocalScript (якщо є leaderstats).
2. Глянь TAB з «очей сервера» / print на сервері.
3. Запиши в нотатку: що змінилось візуально, а що ні.`,
 },
 {
 title: "Що можна лишати на клієнті (і це ок)",
 content: `| На клієнті ок | Лише на сервері |
|---------------|-----------------|
| Камера, звук UI | Нагорода, кола, монети |
| Підсвітка кнопки | Фініш / смерть / урон |
| Локальний «приблизний» тік таймера* | Офіційний час фінішу |
| Анімація керма | Стан race[player] |

\\*Якщо показуєш тік локально - підпиши «орієнтовно» або синхронізуй зі startTime сервера. Підсумок заїзду все одно з сервера.

Помилка новачка: «раз UI на клієнті - то й економіка там». Ні. UI = вітрина.`,
 },
 {
 title: "Один сервер - багато клієнтів",
 content: `Уяви 4 гравці на трасі:
- 4 LocalScript таймера (кожен у своїй голові).
- 1 Script обліку кіл на сервері з \`race[player1]\`, \`race[player2]\`…

Якщо зробити \`laps = laps + 1\` глобально без ключа гравця - усі крадуть прогрес. Це вже сьогоднішня думка, навіть до Remote.

Сервер думає: «хто саме прислав подію / хто саме торкнувся CP?»`,
 },
 {
 title: "Studio Play: Server / Client режими",
 content: `У сучасному Studio зручно дивитись:
- вікно клієнта (що бачить гравець);
- логи сервера в Output (інколи треба перемкнути контекст).

Коли тестуєш мережу:
1. Дивись print з префіксом \`[Server]\` / \`[Client]\`.
2. Не плутай помилку LocalScript з помилкою SSS.
3. Два гравці: Start → Players → додати гравців (якщо доступно) або два вікна.

Сьогодні достатньо одного гравця + чіткого розуміння, **з якого скрипта** іде print.`,
 },
 {
 title: "ModuleScript: спільний код без секрету",
 content: `Module у RS можна require і з LocalScript, і з Script - зручно для констант UI-текстів, імен Remote.

Але:
- \`NEED_LAPS = 3\` у RS - ок (не секрет).
- \`AdminPassword = "123"\` у RS - **катастрофа**.
- Прайс магазину краще в SSS (як у M10), навіть якщо каталог віддаєш через Remote.

Правило: **все, що в RS, клієнт потенційно бачить.**`,
 },
 {
 title: "Міст до 9.4 RemoteEvent",
 content: `| Сьогодні зрозумів | Завтра зробиш |
|-------------------|---------------|
| Клієнт ≠ суддя | FireServer «хочу фініш» |
| Сервер тримає правду | OnServerEvent + валідація |
| UI на LocalScript | OnClientEvent малює ok/deny |
| Папка Remotes готова | Створиш RaceFinish |

Якщо сьогоднішню схему пропустити - завтра будеш копіювати Remote «бо так сказали», без розуміння.

**Зроби зараз (5 хв):** намалюй стрілки: LocalScript → (завтра Remote) → Script → (відповідь) → UI.`,
 },
 {
 title: "Міні-практика карти (без повного Remote)",
 content: `1. Створи папки Remotes / Systems / RaceUI як вище.  
2. У SSS Script \`Srv_RaceHello\`: \`print("[Server] race systems ready")\`.  
3. У StarterPlayerScripts LocalScript: \`print("[Client] hud ready")\`.  
4. Play → обидва print видно (у відповідних контекстах).  
5. Спробуй антиприклад з Laps/Label.  
6. Запиши 3 речення: що робить сервер / клієнт / що буде Remote.

Save: \`Lesson 9.3 - Client Server Map\`.`,
 },
 {
 title: "Чекліст здачі уроку 67",
 content: `- [ ] Можу пояснити сервер vs клієнт за 30 с
- [ ] Знаю, де Script / LocalScript / Module
- [ ] Розумію: клієнт не суддя кіл/монет
- [ ] Є антиприклад у нотатці (що спробував)
- [ ] Папки Remotes/Systems/RaceUI існують
- [ ] Print [Server] і [Client] розділені
- [ ] Схема стрілок до Remote намальована
- [ ] Save Lesson 9.3 - Client Server Map

Без цього 9.4 перетворюється на магію з копіпасти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Думаєш, що LocalScript = сервер, бо «в Studio все в одному вікні»",
 explanation: "У live буде багато клієнтів і один суддя.",
 correctApproach: "Завжди питай: цей код на S чи L?",
 },
 {
 mistake: "Пишеш економіку/кола лише на клієнті",
 explanation: "Чіт і розсинхрон.",
 correctApproach: "Правда на сервері, UI відображає",
 },
 {
 mistake: "LocalScript у ServerScriptService",
 explanation: "Не той контейнер - логіка не там, де треба.",
 correctApproach: "UI/ввід у StarterGui / PlayerScripts",
 },
 {
 mistake: "Секрети в ModuleScript у ReplicatedStorage",
 explanation: "Клієнт може побачити.",
 correctApproach: "Секрети/критичний Config у SSS",
 },
 {
 mistake: "Немає карти папок перед Remotes",
 explanation: "Завтра хаос імен і дублікати Event",
 correctApproach: "RS/Remotes заготовка сьогодні",
 },
 {
 mistake: "Глобальний laps без ключа player у голові дизайну",
 explanation: "Мультиплеєр зламається одразу.",
 correctApproach: "Думай race[player] уже зараз",
 },
 ],
 summary: "Ти розклав Client vs Server: суддя і гравець, Script/LocalScript/Module, реплікація, антиприклад клієнтських «кіл», карта папок під Remotes. Це фундамент, на якому завтра стоїть RemoteEvent.",
 practiceTask: {
 title: "Карта мережі (~30 хв)",
 difficulty: "beginner",
 description: `**Мета:** схема + папки + антиприклад + два print.

### Part A - Схема (8 хв)
1. Намалюй сервер / клієнт / стрілки «завтра Remote».
2. Підпиши 5 прикладів: що на S, що на L.

### Part B - Place каркас (12 хв)
1. Папки Remotes, Systems, RaceUI.
2. Script print [Server], LocalScript print [Client].
3. Антиприклад: спроба змінити Laps/Label з клієнта + нотатка результату.

### Part C - Здача (10 хв)
1. Поясни викладачу за 40 с карту.
2. **Save:** Lesson 9.3 - Client Server Map
3. Не створюй ще повний Remote логіки фінішу (це 9.4).`,
 hints: [
 "Спочатку слова й папки, потім код",
 "Префікси [Server]/[Client] у print рятують дебаг",
 "Не клади паролі в RS",
 ],
 optionalChallenge: "Таблиця на 8 рядків «система гонки → S чи L» (камера, фініш, HUD, VehicleSeat фізика, облік кіл, звук UI, пастка-штраф, декор).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Хто в метафорі уроку «суддя з секундоміром»?",
 options: [
 "Сервер",
 "Лише LocalScript",
 "Terrain Editor",
 "Skybox",
 ],
 correctAnswer: 0,
 explanation: "Сервер тримає правду.",
 },
 {
 id: "q2",
 type: MC,
 question: "Де зазвичай працює LocalScript?",
 options: [
 "На клієнті (StarterGui / PlayerScripts тощо)",
 "Завжди тільки в ServerScriptService",
 "Лише в Lighting",
 "У назві Part",
 ],
 correctAnswer: 0,
 explanation: "Клієнтський код.",
 },
 {
 id: "q3",
 type: MC,
 question: "Що означає правило «клієнт просить, сервер вирішує»?",
 options: [
 "Економіку/кола/фініш підтверджує сервер, не UI сам по собі",
 "Сервер малює всі кнопки замість клієнта",
 "LocalScript заборонений назавжди",
 "Remotes не потрібні ніколи",
 ],
 correctAnswer: 0,
 explanation: "Архітектура мережі.",
 },
 {
 id: "q4",
 type: MC,
 question: "Чому LocalScript у SSS - погана ідея для UI?",
 options: [
 "Не той контейнер для клієнтського UI-коду",
 "SSS завжди швидший для кнопок",
 "LocalScript там автоматично стає сервером",
 "Так вимагає VehicleSeat",
 ],
 correctAnswer: 0,
 explanation: "Правильне місце скриптів.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що таке реплікація в цьому уроці?",
 options: [
 "Оновлення/копія даних або світу, яку бачать клієнти",
 "Видалення Workspace",
 "Лише зміна кольору неба",
 "Обов’язковий DataStore",
 ],
 correctAnswer: 0,
 explanation: "Що «їде» до гравців.",
 },
 {
 id: "q6",
 type: MC,
 question: "Чому погано класти AdminPassword у ModuleScript у RS?",
 options: [
 "Клієнт може побачити вміст ReplicatedStorage",
 "ModuleScript не існує в Roblox",
 "RS вимикає print",
 "Паролі можна лише в TextLabel",
 ],
 correctAnswer: 0,
 explanation: "RS не сейф.",
 },
 {
 id: "q7",
 type: MC,
 question: "Антиприклад «Laps = 99 на клієнті» показує…",
 options: [
 "Що екран/спроба клієнта ≠ серверна правда обліку",
 "Що leaderstats заборонені",
 "Що сервер не існує в Solo",
 "Що треба видалити гонку",
 ],
 correctAnswer: 0,
 explanation: "Never trust client.",
 },
 {
 id: "q8",
 type: MC,
 question: "Де завтра за стандартом курсу лежатимуть RemoteEvent?",
 options: [
 "ReplicatedStorage/Remotes",
 "Лише в Terrain",
 "У Camera",
 "Тільки в назві Place",
 ],
 correctAnswer: 0,
 explanation: "Карта папок.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що з наведеного логічно лишати на клієнті?",
 options: [
 "Камера і відгук UI",
 "Офіційний фінішний час як єдину правду",
 "Видачу монет усім гравцям",
 "Списання чужих Laps",
 ],
 correctAnswer: 0,
 explanation: "UI/ввід vs економіка.",
 },
 {
 id: "q10",
 type: MC,
 question: "Чому важко «все в одному вікні Studio»?",
 options: [
 "Легко забути, що live = багато клієнтів + один сервер",
 "Studio забороняє print",
 "У Studio немає SSS",
 "LocalScript там не запускається ніколи",
 ],
 correctAnswer: 0,
 explanation: "Контекст Play.",
 },
 {
 id: "q11",
 type: MC,
 question: "Навіщо префікси [Server]/[Client] у print?",
 options: [
 "Швидко зрозуміти, з якого боку йде лог",
 "Це збільшує FPS",
 "Це створює Remote",
 "Це вимикає FilteringEnabled",
 ],
 correctAnswer: 0,
 explanation: "Дебаг мережі.",
 },
 {
 id: "q12",
 type: MC,
 question: "Як думати про стан кіл уже в 9.3?",
 options: [
 "Окремо на гравця (race[player]), не одна глобальна змінна на всіх",
 "Лише в TextLabel без сервера",
 "Один laps на весь сервер завжди",
 "Кола рахує лише Sky",
 ],
 correctAnswer: 0,
 explanation: "Мультиплеєр-дизайн.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що ModuleScript дає порівняно зі звичайним Script?",
 options: [
 "Модуль коду через require, який можна ділити",
 "Автоматичний Publish",
 "Заміну Workspace",
 "Вимкнення клієнта",
 ],
 correctAnswer: 0,
 explanation: "Спільні бібліотеки.",
 },
 {
 id: "q14",
 type: MC,
 question: "Як 9.3 готує 9.4?",
 options: [
 "Розумієш навіщо канал Remote між L і S",
 "9.4 скасовує сервер",
 "Remotes більше не потрібні",
 "Треба видалити всі LocalScript",
 ],
 correctAnswer: 0,
 explanation: "Фундамент → міст.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 9.3?",
 options: [
 "Схема + папки Remotes/Systems/UI + антиприклад + Save",
 "Лише теорія без Place",
 "Повний Remote фініш без розуміння (це 9.4)",
 "Порожній Baseplate",
 ],
 correctAnswer: 0,
 explanation: "Карта мережі перед Remote.",
 },
 ],
 },
}

export const ukLesson94 = {
 lessonId: "lesson-roblox-9-4",
 moduleId: "module-09",
 order: 4,
 title: "9.4 - RemoteEvent",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Пояснити навіщо RemoteEvent між LocalScript і сервером",
 "Створити RemoteEvent у ReplicatedStorage і підключити FireServer / OnServerEvent",
 "Відповісти клієнту через FireClient / OnClientEvent",
 "Валідувати аргументи й подію фінішу/кола на сервері (never trust client)",
 "Додати анти-спам lite (cooldown) на Remote",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 68 з 92)",
 content: `Це **якірний урок мережі**. У **9.3** ти вже розділив клієнт і сервер. Сьогодні з’являється «телефон» між ними: **RemoteEvent**.

Практика дня (гонковий контекст):
1. Клієнт каже: «проїхав чекпоінт / хочу фініш».
2. Сервер перевіряє.
3. Сервер відповідає: ok / deny + оновлює стан.
4. UI реагує лише на відповідь сервера.

Артефакт: працюючий \`RaceCheckpoint\` або \`RaceFinish\` Remote + демо «зламаний чіт → правильний Remote». Без цього каналу лідерборд (9.5) і анти-чит (9.7) нема на чому стояти - тому сьогодні не поспішай до декору траси. Краще один чесний FireServer→валідація→FireClient, ніж три «майже» Remote без перевірки.

**Зроби зараз (3 хв):** у \`ReplicatedStorage\` створи Folder \`Remotes\` і RemoteEvent \`RaceFinish\`.`,
 },
 {
 title: "Навіщо Remote, якщо є Properties?",
 content: `| Без Remote | З RemoteEvent |
|------------|---------------|
| LocalScript сам ставить «перемогу» | Сервер вирішує перемогу |
| Інші гравці не знають події | Сервер може FireAllClients |
| Легкий чіт | Перевірка на сервері |
| «У Solo ніби ок» | Готово до мультиплеєра |

FilteringEnabled (за замовчуванням): клієнт **не** керує світом як захоче. Щоб попросити сервер щось зробити - потрібен канал. RemoteEvent = **сигнал** «сталось / прошу».

Метафора: LocalScript пише записку. RemoteEvent - кур’єр. Server Script - каса / суддя.`,
 },
 {
 title: "Карта: де що лежить",
 content: `| Об’єкт | Місце | Хто використовує |
|--------|-------|------------------|
| RemoteEvent | \`RS/Remotes/...\` | І клієнт, і сервер бачать |
| OnServerEvent | Script у SSS | Сервер слухає FireServer |
| FireServer | LocalScript | Клієнт → сервер |
| FireClient | Script у SSS | Сервер → один гравець |
| OnClientEvent | LocalScript | Клієнт слухає відповідь |
| FireAllClients | Script у SSS | Усім гравцям |

Не клади RemoteEvent у Workspace «де попало». Стандарт курсу: \`ReplicatedStorage/Remotes\`.

Не клади секретний прайс/адмін-ключі в Remote як «правду» - клієнт бачить ім’я Remote у RS, але **логіку перевірки** тримай у SSS.`,
 },
 {
 title: "FireServer / OnServerEvent - перший міст",
 content: `Клієнт (LocalScript):

\`local RS = game:GetService("ReplicatedStorage")\`
\`local Remotes = RS:WaitForChild("Remotes")\`
\`local RaceFinish = Remotes:WaitForChild("RaceFinish")\`
\`RaceFinish:FireServer()\`

Сервер (Script у SSS):

\`local RaceFinish = Remotes:WaitForChild("RaceFinish")\`
\`RaceFinish.OnServerEvent:Connect(function(player)\`
\` print(player.Name, "asks finish")\`
\`end)\`

Перший аргумент на сервері **завжди** \`player\` - хто надіслав. Далі - те, що ти передав у FireServer.

**Зроби зараз (5 хв):** FireServer з кнопки/клавіші → print на сервері. Поки без перемоги.`,
 },
 {
 title: "Аргументи: що можна слати",
 content: `| Ок слати | Не ок як єдину правду |
|----------|----------------------|
| \`cpIndex\` (номер чекпоінта) | \`laps = 999\` |
| \`"finish"\` action string | \`won = true\` |
| Нічого (порожній фініш-запит) | \`time = 0.01\` як офіційний результат |

Сервер **може** прийняти cpIndex, але сам перевіряє: чи гравець біля цього CP, чи це наступний очікуваний.

\`FireServer(3)\` → \`OnServerEvent:Connect(function(player, cpIndex)\`  
Завжди: \`typeof(cpIndex) == "number"\`.`,
 },
 {
 title: "FireClient / OnClientEvent - відповідь",
 content: `Сервер після рішення:

\`RaceFinish:FireClient(player, true, "Фініш!")\`
\`-- або\`
\`RaceFinish:FireClient(player, false, "Занадто далеко")\`

Клієнт:

\`RaceFinish.OnClientEvent:Connect(function(ok, message)\`
\` statusLabel.Text = message\`
\` if ok then playWinSound() end\`
\`end)\`

Так UI не вигадує результат. Він **реагує**.

FireAllClients - коли всім треба оновити табло (завтра в 9.5). Сьогодні достатньо FireClient одному.`,
 },
 {
 title: "Демо зламаного чіту (обов’язково зрозуміти)",
 content: `Поганий шлях (НЕ роби в проді):

LocalScript:
\`-- ПСЕВДО-АНТИПРИКЛАД\`
\`lapsLabel.Text = "99"\`
\`winFrame.Visible = true\`

Це «перемога» лише на екрані. Сервер і лідерборд нічого не знають - або ще гірше, якщо ти з клієнта пишеш leaderstats.

Правильний шлях:
1. FireServer фініш.
2. Сервер nearFinish + laps.
3. Сервер ставить finished / час.
4. FireClient ok.
5. UI показує ok.

**Зроби зараз (4 хв):** усно поясни другу/викладачу різницю антиприкладу і правильного шляху за 30 с.`,
 },
 {
 title: "Практика фінішу: валідація на сервері",
 content: `Мінімум для RaceFinish:

\`RaceFinish.OnServerEvent:Connect(function(player)\`
\` if typeof(player) ~= "Instance" then return end\`
\` local st = race[player]\`
\` if not st or st.finished then return end\`
\` if st.laps < NEED_LAPS then\`
\` RaceFinish:FireClient(player, false, "Ще не всі кола")\`
\` return\`
\` end\`
\` if not nearFinish(player) then\`
\` RaceFinish:FireClient(player, false, "Під’їдь ближче")\`
\` return\`
\` end\`
\` st.finished = true\`
\` local t = os.clock() - st.startTime\`
\` RaceFinish:FireClient(player, true, string.format("Час %.1f", t))\`
\`end)\`

\`nearFinish\` - Magnitude до FinishPart, як у 9.7 (сьогодні заклади хоча б просту перевірку).`,
 },
 {
 title: "Чекпоінт через Remote (альтернатива Touched-only)",
 content: `Варіант A: сервер сам слухає Touched на CP - клієнт мовчить.  
Варіант B: клієнт FireServer(cpIndex), сервер валідує відстань.

Для навчання Remotes зручний **B** (видно канал). Для стабільності фізики часто **A**. Можна комбінувати: Touched на сервері = основне; Remote = додатковий сигнал UI.

Якщо робиш B:

\`CheckpointRE:FireServer(cpIndex)\`  
Сервер: typeof number, cpIndex == expected, Magnitude до CP_Part[cpIndex], тоді lastCheckpoint = cpIndex, можливо laps++.`,
 },
 {
 title: "Анти-спам lite (cooldown)",
 content: `Без ліміту гравець (або баг) надішле 100 FireServer.

\`local lastFinish = {}\`
\`local COOLDOWN = 0.35\`

\`... OnServerEvent:Connect(function(player)\`
\` local now = os.clock()\`
\` if now - (lastFinish[player.UserId] or 0) < COOLDOWN then return end\`
\` lastFinish[player.UserId] = now\`
\` tryFinish(player)\`
\`end)\`

Це не «військовий античит». Це гігієна Remote. Повториш у магазині M10.`,
 },
 {
 title: "WaitForChild і типові помилки",
 content: `| Симптом | Причина | Фікс |
|---------|---------|------|
| nil Remotes | Не встигли реплікуватись | WaitForChild |
| OnServerEvent не горить | Script не в SSS / Disabled | Перевір Parent |
| FireServer з сервера | Не той контекст | FireServer лише з клієнта |
| Немає player у Connect | Забув, що 1-й аргумент player | function(player, ...) |
| Працює в Solo «інколи» | Гонитва за порядком | WaitForChild ланцюжком |

Завжди:

\`local Remotes = RS:WaitForChild("Remotes")\`
\`local RaceFinish = Remotes:WaitForChild("RaceFinish")\``,
 },
 {
 title: "RemoteEvent vs RemoteFunction (коротко)",
 content: `| | RemoteEvent | RemoteFunction |
|--|-------------|----------------|
| Ідея | Сигнал | Запит → return |
| Фініш гонки | **Так** (подія) | Рідко |
| Каталог магазину | Можна Event | Зручніше Function (M10) |

Сьогодні лише **Event**. Function з’явиться повноцінно в хабі 10.2. Не пихай усе в один тип «на всяк випадок».`,
 },
 {
 title: "Три вправи уроку (порядок)",
 content: `1. **Print-міст:** FireServer → print імені на сервері.  
2. **Deny/Allow:** nearFinish + FireClient false/true.  
3. **Спам:** 10 натискань → лише 1 обробка завдяки cooldown / finished.

Після трьох вправ маєш артефакт: чесний канал фінішу. Завтра (9.5) повесиш на нього лідерборд.

Save: \`Lesson 9.4 - RemoteEvent Finish\`.`,
 },
 {
 title: "Чекліст здачі уроку 68",
 content: `- [ ] RemoteEvent у RS/Remotes
- [ ] FireServer з LocalScript
- [ ] OnServerEvent у SSS з player
- [ ] Валідація (зона і/або кола) перед ok
- [ ] FireClient ok/deny + UI текст
- [ ] Cooldown або finished захист
- [ ] Немає «перемоги» лише на клієнті як правди
- [ ] Пояснив антиприклад за 30 с
- [ ] Save Lesson 9.4 - RemoteEvent Finish

Без цього 9.5–9.8 будують табло на піску.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Перемога лише в LocalScript без Remote",
 explanation: "Чіт і немає серверної правди.",
 correctApproach: "FireServer → валідація → FireClient",
 },
 {
 mistake: "Вірити часу/ laps з аргументів клієнта",
 explanation: "Підробка результату.",
 correctApproach: "Сервер сам рахує час і кола",
 },
 {
 mistake: "FireServer з серверного Script",
 explanation: "Не той напрямок API.",
 correctApproach: "FireServer з клієнта; з сервера - FireClient",
 },
 {
 mistake: "Без WaitForChild",
 explanation: "Рідкісні nil при старті.",
 correctApproach: "WaitForChild Remotes і імені Event",
 },
 {
 mistake: "Немає cooldown / finished",
 explanation: "Спам плодить події.",
 correctApproach: "COOLDOWN + прапорець finished",
 },
 {
 mistake: "Remote у випадковому місці Workspace",
 explanation: "Важко знайти, поганий стандарт.",
 correctApproach: "RS/Remotes",
 },
 ],
 summary: "Ти освоїв RemoteEvent: клієнт просить фініш/коло через FireServer, сервер валідує і відповідає FireClient, UI лише відображає. Це якір мережі модуля 9 перед лідербордом, пастками й анти-читом.",
 practiceTask: {
 title: "Чесний фініш через Remote (~30–35 хв)",
 difficulty: "intermediate",
 description: `**Мета:** RaceFinish Remote з deny/allow і відповіддю на UI.

### Part A - Міст (8 хв)
1. RS/Remotes/RaceFinish.
2. LocalScript: клавіша/кнопка → FireServer.
3. SSS: OnServerEvent → print(player.Name).

### Part B - Валідація (15 хв)
1. race стан / NEED_LAPS (можна тимчасово 0 для тесту зони).
2. nearFinish Magnitude.
3. FireClient(false/true, message).
4. UI StatusLabel на OnClientEvent.
5. finished + COOLDOWN.

### Part C - Антиприклад (7 хв)
1. Покажи, що зміна TextLabel на клієнті не змінює серверний стан.
2. Прибери тестовий чіт-код.
3. **Save:** Lesson 9.4 - RemoteEvent Finish`,
 hints: [
 "Спочатку print, потім nearFinish",
 "Перший аргумент OnServerEvent - завжди player",
 "Cooldown 0.35 с ловить дабл-клік",
 ],
 optionalChallenge: "Другий Remote RaceCheckpoint(cpIndex) з перевіркою порядку lastCheckpoint.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Навіщо RemoteEvent у гонці?",
 options: [
 "Щоб клієнт просив дію, а сервер вирішував і відповідав",
 "Щоб замінити VehicleSeat",
 "Щоб малювати Terrain",
 "Щоб вимкнути Explorer",
 ],
 correctAnswer: 0,
 explanation: "Канал клієнт↔сервер.",
 },
 {
 id: "q2",
 type: MC,
 question: "Де за стандартом курсу тримати RemoteEvent?",
 options: [
 "ReplicatedStorage/Remotes",
 "Лише в Lighting",
 "У назві SpawnLocation",
 "Тільки в ServerStorage (клієнт не побачить для FireServer)",
 ],
 correctAnswer: 0,
 explanation: "Спільне місце Remotes.",
 },
 {
 id: "q3",
 type: MC,
 question: "Хто викликає FireServer?",
 options: [
 "LocalScript / клієнт",
 "Лише Script у SSS",
 "Terrain Editor",
 "PathfindingService",
 ],
 correctAnswer: 0,
 explanation: "Клієнт → сервер.",
 },
 {
 id: "q4",
 type: MC,
 question: "Перший аргумент OnServerEvent - це…",
 options: [
 "player, який надіслав подію",
 "Завжди FinishPart",
 "Обов’язково number 0",
 "Camera",
 ],
 correctAnswer: 0,
 explanation: "Хто стріляв Remote.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що робить FireClient?",
 options: [
 "Сервер надсилає подію конкретному гравцю",
 "Клієнт пише в leaderstats",
 "Видаляє RemoteEvent",
 "Створює Humanoid",
 ],
 correctAnswer: 0,
 explanation: "Сервер → клієнт.",
 },
 {
 id: "q6",
 type: MC,
 question: "Чому погано ставити «перемогу» лише зміною UI на клієнті?",
 options: [
 "Це не серверна правда - легко підробити / немає обліку",
 "UI заборонений у Roblox",
 "FireServer тоді ламається",
 "LocalScript не вміє TextLabel",
 ],
 correctAnswer: 0,
 explanation: "Антиприклад чіту.",
 },
 {
 id: "q7",
 type: MC,
 question: "Що клієнт може безпечно надіслати?",
 options: [
 "Запит/індекс чекпоінта, не офіційний час перемоги",
 "Будь-які laps = 999 як факт",
 "Команду змінити чужі дані без перевірки",
 "loadstring",
 ],
 correctAnswer: 0,
 explanation: "Сигнал, не вирок.",
 },
 {
 id: "q8",
 type: MC,
 question: "Навіщо nearFinish на сервері?",
 options: [
 "Не зараховувати фініш гравцю далеко від зони",
 "Щоб прискорити камеру",
 "Це замінює WaitForChild",
 "Це потрібно лише для Sound",
 ],
 correctAnswer: 0,
 explanation: "Валідація позиції.",
 },
 {
 id: "q9",
 type: MC,
 question: "Навіщо cooldown на OnServerEvent?",
 options: [
 "Щоб спам FireServer не оброблявся десятки разів",
 "Щоб змінити колір траси",
 "Це вимикає Anchored",
 "Cooldown замінює player",
 ],
 correctAnswer: 0,
 explanation: "Анти-спам lite.",
 },
 {
 id: "q10",
 type: MC,
 question: "Навіщо WaitForChild(\"Remotes\") на клієнті?",
 options: [
 "Remote може ще не встигнути реплікуватись",
 "Це видаляє SSS",
 "Без цього не існує Parts",
 "WaitForChild пише DataStore",
 ],
 correctAnswer: 0,
 explanation: "Надійний старт.",
 },
 {
 id: "q11",
 type: MC,
 question: "Чим RemoteEvent відрізняється від RemoteFunction у цьому уроці?",
 options: [
 "Event = сигнал; Function = запит з return (Function детальніше в M10)",
 "Вони абсолютно однакові завжди",
 "Event працює лише на сервері",
 "Function заборонений у Roblox",
 ],
 correctAnswer: 0,
 explanation: "Різні інструменти.",
 },
 {
 id: "q12",
 type: MC,
 question: "Де слухати OnServerEvent?",
 options: [
 "У серверному Script (наприклад SSS)",
 "У LocalScript StarterGui як заміну серверу",
 "У Terrain",
 "У Skybox",
 ],
 correctAnswer: 0,
 explanation: "Серверна обробка.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що логічно зробити після успішного фінішу на сервері?",
 options: [
 "finished=true, порахувати час, FireClient ok",
 "Видалити RemoteEvent",
 "Вимкнути Output",
 "Дати клієнту писати leaderstats самому",
 ],
 correctAnswer: 0,
 explanation: "Фіксація результату.",
 },
 {
 id: "q14",
 type: MC,
 question: "Як 9.4 готує 9.5 лідерборд?",
 options: [
 "Чесний сигнал коло/фініш можна повесити на оновлення board",
 "Лідерборд скасовує Remotes",
 "Треба видалити валідацію",
 "9.5 працює лише без сервера",
 ],
 correctAnswer: 0,
 explanation: "Канал → табло.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 9.4?",
 options: [
 "Працюючий RaceFinish Remote з валідацією, відповіддю UI і Save",
 "Лише теорія без Studio",
 "Порожній Baseplate",
 "Перемога лише TextLabel на клієнті",
 ],
 correctAnswer: 0,
 explanation: "Потрібен чесний міст.",
 },
 ],
 },
}

export const ukLesson95 = {
 lessonId: "lesson-roblox-9-5",
 moduleId: "module-09",
 order: 5,
 title: "9.5 - Лідерборд кіл",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Вести серверний облік кіл (і часу) для кожного гравця",
 "Оновлювати UI лідерборда через FireClient або leaderstats",
 "Закріпити Remote: клієнт повідомляє чекпоінт/коло, сервер вирішує",
 "Сортувати топ заїздів (швидший час / більше кіл) без довіри до клієнта",
 "Підготувати чистий облік під пастки (9.6) і анти-чит (9.7)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 69 з 92)",
 content: `У **9.2** ти вже міг показувати таймер/коло на UI. У **9.4** з’явився Remote. Сьогодні зшиваєш це в **лідерборд кіл / часу** - щоб заїзд було видно не лише собі в голові.

Артефакт уроку:
1. Сервер знає \`laps\` і (бажано) \`bestTime\` / поточний час.
2. Гравець бачить свій прогрес на HUD.
3. Є простий board: топ-3 або список «ім’я - кола - час».
4. Оновлення йде з сервера (FireClient або репліковані Values), не з «я сам намалював перемогу».

Без цього табло завтрашні пастки й анти-чит важче дебажити: не видно, чи сервер взагалі зарахував коло.

**Зроби зараз (3 хв):** відкрий гонку й напиши: що вже рахує сервер, а що лише LocalScript?`,
 },
 {
 title: "Лідерборд ≠ гарний TextLabel",
 content: `| Лише гарний UI | Справжній board |
|---------------|-----------------|
| Цифри з клієнта | Цифри з серверного стану |
| Легко підробити | Підробка не потрапляє в топ |
| Один гравець «наче ок» | 2+ гравці порівнюються чесно |
| Забув після Stop | Стан заїзду зрозумілий у Output |

Метафора: HUD - **табло на стадіоні**. Суддя (сервер) крутить секундомір. Глядачі не мають права самі ставити рахунок.

У навчальній гонці board може бути простим: навіть \`Frame\` зі списком 3 рядків - достатньо для здачі.`,
 },
 {
 title: "Два способи показати прогрес",
 content: `| Спосіб | Плюс | Мінус |
|--------|------|-------|
| **leaderstats** IntValue \`Laps\` | Видно в TAB, просто | Мало місця для часу/топ |
| **RemoteEvent FireClient** + ScreenGui | Гнучкий UI топу | Треба зібрати Gui |
| **IntValue/StringValue** у Player | Реплікується на клієнт | Не сортований топ сам по собі |

Рекомендація курсу:
- \`Laps\` у leaderstats **або** Attribute - для швидкого дебагу;
- \`RaceBoardUpdate\` FireClient з table топу - для красивого board.

Можна почати з leaderstats сьогодні, а FireClient-топ додати в Part B. Головне - одна серверна правда: яке б UI ти не малював, цифри беруться з race[player], не з фантазії клієнта.`,
 },
 {
 title: "Серверний стан заїзду (нагадування)",
 content: `На гравця:

\`race[player] = {\`
\` laps = 0,\`
\` lastCheckpoint = 0,\`
\` startTime = os.clock(),\`
\` finished = false,\`
\` bestTime = nil,\`
\`}\`

Коли сервер **чесно** зараховує коло (після Remote + валідації з 9.4):

\`race[player].laps += 1\`
\`updateLeaderstats(player)\`
\`broadcastBoard()\`

Не збільшуй \`laps\` у LocalScript. UI лише відображає.

**PlayerRemoving:** \`race[player] = nil\`, щоб не тримати мертві посилання.`,
 },
 {
 title: "leaderstats Laps - мінімум за 8 хвилин",
 content: `Якщо ще немає leaderstats з інших модулів - створи на PlayerAdded:

\`local folder = Instance.new("Folder")\`
\`folder.Name = "leaderstats"\`
\`folder.Parent = player\`
\`local laps = Instance.new("IntValue")\`
\`laps.Name = "Laps"\`
\`laps.Value = 0\`
\`laps.Parent = folder\`

Після +коло:

\`player.leaderstats.Laps.Value = race[player].laps\`

TAB одразу покаже прогрес. Для фінішу можна додати \`BestTime\` як StringValue (\`"12.34"\`) - IntValue для дробів незручний.

Пам’ятай: leaderstats пише **лише сервер**.`,
 },
 {
 title: "FireClient board: формат даних",
 content: `Сервер збирає масив:

\`{\`
\` { name = "Alex", laps = 3, time = 42.1 },\`
\` { name = "Sam", laps = 2, time = 30.0 },\`
\`}\`

Сортування (приклад логіки):
1. Більше \`laps\` вище.
2. При рівних колах - менший \`time\` вище (якщо рахуєш час кола/заїзду).

\`BoardRE:FireAllClients(topList)\`  
або \`FireClient(player, topList)\` якщо board особистий.

Клієнт:

\`BoardRE.OnClientEvent:Connect(function(list)\`
\` redrawRows(list)\`
\`end)\`

Не приймай від клієнта готовий відсортований топ. Клієнт може лише **просити refresh** (опційно), сервер знову будує list.`,
 },
 {
 title: "UI лідерборда (збірка)",
 content: `StarterGui \`RaceBoard\`:
- Frame ззаду / збоку (не на весь екран).
- 3–5 TextLabel рядків \`Row1..Row5\`.
- Окремо \`MyLaps\` / \`MyTime\` для себе.

LocalScript:
1. Чекає Remotes (\`WaitForChild\`).
2. Слухає BoardUpdate.
3. Ставить текст \`i .. ". " .. name .. " - " .. laps .. " кол"\`.

Онбординг: маленький підпис «Лідерборд (сервер)».

**Зроби зараз (7 хв):** 3 порожні рядки + MyLaps, поки без сортування - спочатку прокачай +коло → оновлення.`,
 },
 {
 title: "Закріплення Remote: хто коли стріляє",
 content: `| Подія | Хто | Що |
|-------|-----|-----|
| Проїхав чекпоінт | Клієнт FireServer(cpIndex) **або** сервер Touched | Запит |
| Зарахувати коло | Сервер | laps++ |
| Оновити board | Сервер FireClient/All | Дані |
| Показати цифри | LocalScript | UI |

Типова помилка після 9.4: Remote є, але UI все ще крутить свій лічильник і ігнорує сервер. Сьогодні **вирежи** клієнтський «фейковий laps++».

Тест: у Output сервера print laps; на HUD має збігатися 1:1.`,
 },
 {
 title: "Час на табло: що рахувати",
 content: `| Метрика | Формула (ідея) | Для чого |
|---------|----------------|----------|
| Поточний час заїзду | \`os.clock() - startTime\` | HUD під час їзди |
| Час фінішу | те саме при finished | Лідерборд фінішерів |
| Best | min попередніх | Рекорди |

Поточний час можна:
- слати з сервера раз на 0.5 с (FireClient) - просто, трохи трафіку;
- або тримати \`startTime\` на клієнті **лише для відображення**, але фінальний результат все одно з сервера.

Для здачі: фінальний/топ час **з сервера**. Живий тік може бути клієнтським приблизнимо, якщо підпишеш «орієнтовно».`,
 },
 {
 title: "Два гравці: не змішати стани",
 content: `| Баг | Фікс |
|-----|------|
| Один laps на всіх | \`race[player]\` ключ |
| FireAllClients з даними лише одного | Збирай list з усіх race[*] |
| Вихід гравця лишає рядок-привид | PlayerRemoving чистить |
| Респавн скидає UI, не стан | Listen CharacterAdded лише для Character, не обнуляй laps без правила |

Playtest: 2 вікна Studio / 2 акаунти - обидва +коло незалежно, board показує двох.`,
 },
 {
 title: "Playtest лідерборда",
 content: `| # | Дія | Очікування |
|---|-----|------------|
| 1 | Старт заїзду | Laps 0, час іде / готовий |
| 2 | Чесне +коло | Laps 1 на TAB/HUD і сервері |
| 3 | Підробити laps на клієнті | Board/TAB не зміниться (або відкотиться) |
| 4 | Фініш | Час з’явився в топі / MyTime |
| 5 | Другий гравець | Окремі рядки |
| 6 | Вихід гравця | Немає крашу board |
| 7 | Output | Без червоного |

Пункт 3 - місток до 9.7. Якщо клієнт може змінити TAB Laps - ти пишеш leaderstats з LocalScript: **виправ сьогодні**.`,
 },
 {
 title: "Чекліст здачі уроку 69",
 content: `- [ ] Серверний race стан з laps
- [ ] Laps видно (leaderstats і/або HUD)
- [ ] Board або топ оновлюється з сервера
- [ ] Немає клієнтського laps++ як джерела правди
- [ ] Remote коло/чекпоінт закріплений (з 9.4)
- [ ] PlayerRemoving чистить стан
- [ ] Playtest 1–4 зелені
- [ ] Save: Lesson 9.5 - Race Leaderboard

Далі **9.6** додасть пастки - облік кіл має лишитись стабільним. Якщо board уже 1:1 з сервером, ти одразу побачиш, чи Oil випадково «з’їв» коло чи лише сповільнив машину.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Laps++ лише в LocalScript",
 explanation: "Лідерборд бреше, чіт легкий.",
 correctApproach: "Сервер + реплікація/FireClient",
 },
 {
 mistake: "Клієнт надсилає готовий topList",
 explanation: "Підробка місць у рейтингу.",
 correctApproach: "Сервер сортує і шле list",
 },
 {
 mistake: "Один глобальний laps на сервері без player ключа",
 explanation: "Гравці крадуть прогрес один в одного.",
 correctApproach: "race[player]",
 },
 {
 mistake: "Board не оновлюється після коло",
 explanation: "Забули broadcast після laps++.",
 correctApproach: "updateLeaderstats + FireClient після зміни",
 },
 {
 mistake: "BestTime як IntValue з дробом",
 explanation: "Втрата точності / плутанина.",
 correctApproach: "StringValue або окреме число *100",
 },
 {
 mistake: "Не чистити race на PlayerRemoving",
 explanation: "Витоки і дивні рядки.",
 correctApproach: "nil + оновити board",
 },
 ],
 summary: "Ти зібрав лідерборд кіл/часу на серверній правді: laps у стані заїзду, HUD/TAB і board через FireClient або leaderstats, Remote лише як сигнал. Це табло гонки перед пастками й анти-читом.",
 practiceTask: {
 title: "Табло кіл (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** серверні laps видно гравцю + простий board.

### Part A - Стан і leaderstats (10 хв)
1. race[player] з laps / startTime.
2. leaderstats.Laps або Attribute.
3. Після чесного +коло (Remote) оновлюй Value.

### Part B - Board UI (12 хв)
1. RaceBoard з 3 рядками + MyLaps.
2. RemoteEvent BoardUpdate.
3. Сервер сортує list і FireAllClients.
4. Прибери клієнтський фейковий лічильник.

### Part C - Playtest (8 хв)
1. Чесне коло = збіг Output і HUD.
2. Спроба змінити Laps на клієнті не діє на board.
3. **Save:** Lesson 9.5 - Race Leaderboard`,
 hints: [
 "Спочатку MyLaps 1:1 з сервером, потім топ-3",
 "print на сервері після laps++ - найкращий друг",
 "WaitForChild на Remotes у LocalScript",
 ],
 optionalChallenge: "BestTime StringValue + рядок «Рекорд: …» після фінішу.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 9.5?",
 options: [
 "Показати кола/час з серверного обліку на HUD/лідерборді",
 "Видалити RemoteEvent",
 "Зробити лише декор траси",
 "Publish без гонки",
 ],
 correctAnswer: 0,
 explanation: "Лідерборд на серверній правді.",
 },
 {
 id: "q2",
 type: MC,
 question: "Де має збільшуватись laps?",
 options: [
 "На сервері після валідного коло/чекпоінта",
 "Лише в LocalScript для краси",
 "У Lighting",
 "У назві Part",
 ],
 correctAnswer: 0,
 explanation: "Серверний облік.",
 },
 {
 id: "q3",
 type: MC,
 question: "Чому погано приймати від клієнта готовий topList?",
 options: [
 "Клієнт може підробити місця в рейтингу",
 "FireClient тоді не існує",
 "UI не вміє малювати TextLabel",
 "leaderstats заборонені",
 ],
 correctAnswer: 0,
 explanation: "Сервер сортує.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо leaderstats.Laps у гонці?",
 options: [
 "Швидко видно прогрес у TAB і легко дебажити",
 "Це замінює VehicleSeat",
 "Це вимикає Touched",
 "Обов’язково для Skybox",
 ],
 correctAnswer: 0,
 explanation: "Проста реплікація числа.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що робить FireClient з board-даними?",
 options: [
 "Передає клієнту список для малювання UI",
 "Пише Coins усім без перевірки",
 "Видаляє RemoteEvent",
 "Створює Terrain",
 ],
 correctAnswer: 0,
 explanation: "Оновлення вітрини.",
 },
 {
 id: "q6",
 type: MC,
 question: "Як зберігати стан двох гравців?",
 options: [
 "Окремий запис race[player] для кожного",
 "Одна глобальна змінна laps",
 "Лише на першому клієнті",
 "У ReplicatedFirst як Sound",
 ],
 correctAnswer: 0,
 explanation: "Ключ гравця.",
 },
 {
 id: "q7",
 type: MC,
 question: "Що зробити в PlayerRemoving?",
 options: [
 "Очистити race[player] і оновити board",
 "Видалити Workspace",
 "Вимкнути Pathfinding",
 "Обов’язково Publish",
 ],
 correctAnswer: 0,
 explanation: "Прибирання стану.",
 },
 {
 id: "q8",
 type: MC,
 question: "Як перевірити, що HUD не бреше?",
 options: [
 "Звірити print laps на сервері з числом на екрані",
 "Змінити колір неба",
 "Вимкнути Output",
 "Перейменувати модуль 1",
 ],
 correctAnswer: 0,
 explanation: "1:1 сервер і UI.",
 },
 {
 id: "q9",
 type: MC,
 question: "Чому клієнтський laps++ як джерело правди - погано?",
 options: [
 "Легко підробити прогрес і зламати лідерборд",
 "LocalScript не може малювати текст",
 "RemoteEvent тоді компілюється гірше",
 "VehicleSeat вимагає клієнтських кіл",
 ],
 correctAnswer: 0,
 explanation: "Never trust client.",
 },
 {
 id: "q10",
 type: MC,
 question: "Яке сортування логічне для топу кіл?",
 options: [
 "Більше laps вище; при рівності - кращий час",
 "Завжди випадковий порядок",
 "За алфавітом Material",
 "Хто пізніше зайшов - завжди перший",
 ],
 correctAnswer: 0,
 explanation: "Чесна ієрархія.",
 },
 {
 id: "q11",
 type: MC,
 question: "Навіщо WaitForChild для Remotes на клієнті?",
 options: [
 "Об’єкт може ще не встигнути реплікуватись",
 "Це вимикає лідерборд",
 "Без цього сервер не існує",
 "WaitForChild замінює OnServerEvent",
 ],
 correctAnswer: 0,
 explanation: "Надійний старт UI.",
 },
 {
 id: "q12",
 type: MC,
 question: "Як 9.5 готує 9.7 анти-чит?",
 options: [
 "Якщо Laps пише сервер, фейковий клієнтський ++ не потрапить у TAB/board",
 "Анти-чит скасовує всі UI",
 "Треба видалити leaderstats",
 "9.7 забороняє FireClient",
 ],
 correctAnswer: 0,
 explanation: "Серверна правда = менше дір.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що краще для дробового часу в leaderstats?",
 options: [
 "StringValue або ціле (мс), не «сирий» Int з дробом",
 "Обов’язково Part.Transparency",
 "Лише Color3",
 "Зберегти час у назві SpawnLocation",
 ],
 correctAnswer: 0,
 explanation: "Зручне зберігання часу.",
 },
 {
 id: "q14",
 type: MC,
 question: "Коли викликати broadcastBoard?",
 options: [
 "Після зміни laps/фінішу на сервері",
 "Кожен кадр без потреби з клієнта",
 "Лише при зміні неба",
 "Ніколи - board малює себе сам з нічого",
 ],
 correctAnswer: 0,
 explanation: "Оновлення після факту.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 9.5?",
 options: [
 "Серверні laps + HUD/board з сервера + Save",
 "Лише теорія без Studio",
 "Порожній Baseplate",
 "Клієнтський лічильник без сервера",
 ],
 correctAnswer: 0,
 explanation: "Потрібне чесне табло.",
 },
 ],
 },
}

export const ukLesson96 = {
 lessonId: "lesson-roblox-9-6",
 moduleId: "module-09",
 order: 6,
 title: "9.6 - Пастки + collision",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Додати 1–2 пастки (hazard) на трасу з чесним Touched/зоною",
 "Зрозуміти Collision Groups lite: машина vs бар’єр vs гравець",
 "Зробити debounce, щоб пастка не била 20 разів за секунду",
 "Налаштувати CameraType lite для гонки (опційно Follow/Custom)",
 "Підготувати hazards так, щоб не ламати чесний облік кіл (9.5–9.7)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 70 з 92)",
 content: `Траса без небезпеки часто відчувається «порожньою». Сьогодні додаєш **пастки** і трохи порядку в **колізіях**, щоб гонка мала вау - але не хаос.

Ти зробиш:
1. 1–2 hazard-зони на трасі (масло, шипи, прірва-ресет, bump).
2. Чесну реакцію: сповільнення / відкид / ресет на чекпоінт - **на сервері**, якщо впливає на результат.
3. **Debounce**, щоб Touched не спамив.
4. Collision Groups lite (бар’єри траси vs машина).
5. Camera lite (коротко): зручніше керувати ззаду машини.

Не строй парк атракціонів на 20 пасток. Одна-дві **читабельні** небезпеки краще за лабіринт лагів.

**Зроби зараз (3 хв):** постав Part \`Hazard_Oil\` на повороті (яскравий колір, CanCollide за потреби).`,
 },
 {
 title: "Навіщо пастки в гонці (і коли вони погані)",
 content: `| Добре | Погано |
|-------|--------|
| Видно здалеку, можна уникнути | Невидима стіна «смерті» |
| Помилка коштує часу | Помилка = краш Studio / втрата всіх кіл без сенсу |
| Навчає трасі | Рандомний one-shot кожні 0.1 с |
| Сервер вирішує ефект | LocalScript сам «вбиває» облік кіл |

Метафора: пастка - **вчитель повороту**, не вчитель ненависті до гри.

Якщо пастка ламає VehicleSeat або телепортує крізь фініш - завтра анти-чит (9.7) і Ship (9.8) страждатимуть.`,
 },
 {
 title: "Типи hazard для години уроку",
 content: `| Тип | Ефект | Складність |
|-----|-------|------------|
| **Oil / slow** | На 1–2 с зменшити швидкість / крутнути | Легко |
| **Bump** | AssemblyLinearVelocity поштовх | Середньо |
| **Pit reset** | Телепорт на останній чекпоінт | Середньо |
| **Barrier kill brick** | Ресет + короткий i-frame | Легко, обережно з спамом |

Обери **один основний** + опційно другий lite.

Імена: \`Hazard_Oil\`, \`Hazard_Pit\`, папка \`Workspace/Track/Hazards/\`.`,
 },
 {
 title: "Touched vs зона: як слухати пастку",
 content: `Частий варіант: \`Hazard.Touched:Connect\`.

Проблеми Touched:
- спрацьовує багато разів підряд;
- торкається колесо, корпус, аксесуар;
- інколи «привид» при високій швидкості.

Практика:
1. Перевір, що hit - частина Character **або** машини (шукай SeatWeld / модель Car).
2. Знайди \`player\` через \`Players:GetPlayerFromCharacter\` або атрибут власника машини.
3. \`debounce[player] = true\` → ефект → \`task.delay(1.5, …)\`.

Альтернатива: невидима Part-зона з \`GetPartBoundsInBox\` раз на 0.2 с на сервері - стабільніше, трохи важче. Для уроку Touched + debounce достатньо.`,
 },
 {
 title: "Ефект на сервері (чесний)",
 content: `Якщо пастка лише крутить камеру на клієнті - ок як juice. Якщо **скидає прогрес / телепортує** - тільки сервер.

Псевдо slow:

\`Hazard.Touched:Connect(function(hit)\`
\` local player = resolvePlayer(hit)\`
\` if not player or debounce[player] then return end\`
\` debounce[player] = true\`
\` local car = resolveCar(player)\`
\` if car and car.PrimaryPart then\`
\` -- lite: зменшити швидкість через VectorForce / або tele невеликий штраф\`
\` applySlow(car, 1.5)\`
\` end\`
\` task.delay(1.5, function() debounce[player] = false end)\`
\`end)\`

Для pit reset: телепорт машини/гравця на \`LastCheckpoint.CFrame\` **після** перевірки, що гравець у заїзді. Не чіпай \`laps\` вниз без правила гри (краще штраф часу, ніж -коло, якщо не задумано).`,
 },
 {
 title: "Collision Groups lite",
 content: `Іноді машина застрягає в декорі, або гравець падає крізь трасу, або бар’єр б’є колеса дивно.

**CollisionGroup** = іменована група Parts, між якими можна вимкнути зіткнення.

Типовий навчальний набір:
| Група | Хто |
|-------|-----|
| \`TrackBarrier\` | Стіни траси |
| \`RaceCar\` | Корпус/колеса машини |
| \`Default\` | Все інше |

Приклад ідеї (PhysicsService):
- бар’єри не колізять з дрібним декором;
- або колеса колізять з дорогою, але ніс машини не чіпляє низькі бордюри (обережно - легко зламати реалізм).

На старті курсу: **1 зміна** (наприклад бар’єр не штовхає гравця-пішохода на старті, лише машину). Не переписуй усю фізику.

Документуй у нотатці: які групи і навіщо - для викладача за 20 с.`,
 },
 {
 title: "CanCollide / CanQuery / CanTouch - шпаргалка",
 content: `| Property | Навіщо |
|----------|--------|
| \`CanCollide\` | Фізичне зіткнення |
| \`CanTouch\` | Чи генерує Touched |
| \`CanQuery\` | Raycast/overlap (пізніше) |
| \`Anchored\` | Чи стоїть пастка як зона |

Для Oil часто: \`CanCollide = false\`, \`CanTouch = true\`, Transparency 0.4 - видно, але не стіна.

Для Pit: колізія може бути true (яма) або false + Touched телепорт - обери один стиль і не мішай.`,
 },
 {
 title: "Camera lite для гонки",
 content: `Повний кастом камери - окремий світ. Сьогодні **lite**:

| Варіант | Як | Коли |
|---------|-----|------|
| За замовчуванням | Нічого | Якщо вже зручно |
| \`Camera.CameraType = Enum.CameraType.Follow\` | LocalScript при сіданні | Швидкий комфорт |
| Scriptable + offset за машиною | Складніше | Челендж |

На \`VehicleSeat:GetPropertyChangedSignal("Occupant")\` (клієнт):
- сів → Follow або легкий offset;
- вийшов → Custom / назад.

Не ламай камеру назавжди після виходу з машини - типова скарга playtest.

**Зроби зараз (5 хв):** якщо камера «морська хвороба» - постав Follow лише під час їзди.`,
 },
 {
 title: "Пастки vs облік кіл (не зламай 9.5)",
 content: `| Дія пастки | Вплив на кола | Рекомендація |
|------------|---------------|--------------|
| Slow | Немає | Ок завжди |
| Bump | Немає | Ок |
| Teleport на CP | Немає | Ок |
| «Смерть» / респавн | Може збити Seat | Ресадити або ресет машини |
| Зона на фініші як hazard | Фейкові фініші | **Не клади** Oil на FinishPart |

Правило: hazard **не** викликає Finish Remote. Фініш лишається окремою чистою зоною.

Якщо телепорт - не став гравця всередину FinishPart.`,
 },
 {
 title: "Playtest пасток (10′)",
 content: `| # | Тест | Очікування |
|---|------|------------|
| 1 | Проїхати Oil 1 раз | 1 ефект, не 20 |
| 2 | Стояти на Oil 3 с | Debounce тримає |
| 3 | Об’їхати | Можна уникнути |
| 4 | Pit | Повертає на CP, laps цілі |
| 5 | 2 гравці (якщо є) | Ефекти окремо |
| 6 | Output | Немає спаму помилок |
| 7 | Камера після виходу | Нормальна |

Якщо пункт 1 червоний - спочатку debounce, не нова пастка.`,
 },
 {
 title: "Зв’язок з 9.7–9.8",
 content: `| Сьогодні | Далі |
|----------|------|
| Читабельні hazards | Анти-чит не плутає Oil з фінішем |
| Collision lite | Менше «застряг у стіні» на Ship |
| Camera Follow | Демо 90 с комфортніше |
| 1–2 пастки | Рубрика Ship: вау без хаосу |

Save: \`Lesson 9.6 - Race Hazards\`.`,
 },
 {
 title: "Чекліст здачі уроку 70",
 content: `- [ ] 1–2 іменовані Hazard у папці Hazards
- [ ] Ефект з debounce (не спам Touched)
- [ ] Сервер вирішує штраф/телепорт (якщо є)
- [ ] Пастка не стоїть на FinishPart
- [ ] (Lite) Collision group або свідомий CanCollide
- [ ] (Lite) Камера не ламається після виходу
- [ ] Playtest 1–4 зелені
- [ ] Save Lesson 9.6 - Race Hazards

Далі **9.7** перевірить, чи фініш досі чесний, коли на трасі вже є хаос пасток.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Touched без debounce на високій швидкості",
 explanation: "Ефект 30 разів, лаг і «рандомна смерть».",
 correctApproach: "debounce[player] + delay",
 },
 {
 mistake: "Hazard на зоні фінішу",
 explanation: "Плутанина з Remote фінішу / фейкові спрацювання.",
 correctApproach: "Finish окремо, Oil раніше на трасі",
 },
 {
 mistake: "LocalScript телепортує й міняє laps",
 explanation: "Чіт і розсинхрон обліку.",
 correctApproach: "Телепорт/штраф на сервері",
 },
 {
 mistake: "CanCollide true на «олії», що стає стіною",
 explanation: "Машина застряє, злість гравця.",
 correctApproach: "Oil: CanCollide false, CanTouch true",
 },
 {
 mistake: "Камера Scriptable без повернення",
 explanation: "Після гонки світ «зламаний».",
 correctApproach: "Повернути тип камери при виході з Seat",
 },
 {
 mistake: "10 пасток замість 1 стабільної",
 explanation: "Година згорає, жодна не відлагоджена.",
 correctApproach: "1–2 читабельні hazards",
 },
 ],
 summary: "Ти додав пастки на трасу з debounce і чесним серверним ефектом, торкнув Collision Groups lite і камеру Follow для їзди. Hazards дають вау, не ламаючи облік кіл і фініш - база для анти-читу 9.7 і Ship 9.8.",
 practiceTask: {
 title: "Hazard на повороті (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** 1–2 пастки + debounce + не зламати фініш.

### Part A - Білд (8 хв)
1. Folder Track/Hazards.
2. Hazard_Oil (видно, CanCollide false).
3. Опційно Hazard_Pit перед складним місцем.

### Part B - Логіка (15 хв)
1. Touched → resolvePlayer → debounce.
2. Slow або teleport на CP (сервер).
3. Переконайся, що FinishPart чистий від hazard.
4. (Lite) Collision group або підгін CanCollide бар’єрів.
5. (Lite) Camera Follow під час Occupant.

### Part C - Playtest (7 хв)
1. Таблиця тестів 1–4.
2. Output без спаму.
3. **Save:** Lesson 9.6 - Race Hazards`,
 hints: [
 "Спочатку 1 Oil зі стабільним debounce",
 "Не клади пастку на фінішну лінію",
 "При виході з машини поверни камеру",
 ],
 optionalChallenge: "Другий hazard-тип (bump) + Billboard «Небезпека!» за 20 студів до зони.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 9.6?",
 options: [
 "Додати читабельні пастки й порядок колізій/камери на трасі",
 "Видалити RemoteEvent",
 "Зробити лише DataStore",
 "Publish Public без траси",
 ],
 correctAnswer: 0,
 explanation: "Hazards + collision lite.",
 },
 {
 id: "q2",
 type: MC,
 question: "Чому потрібен debounce на Hazard.Touched?",
 options: [
 "Touched спамить багато разів підряд на швидкості",
 "Debounce вимикає VehicleSeat назавжди",
 "Без debounce не існує Parts",
 "Це замінює фініш",
 ],
 correctAnswer: 0,
 explanation: "Анти-спам ефекту.",
 },
 {
 id: "q3",
 type: MC,
 question: "Типові налаштування для Oil-зони?",
 options: [
 "CanCollide false, CanTouch true, видно гравцю",
 "CanCollide true і повністю прозора завжди",
 "Видалити Part після одного кадру",
 "Лише на клієнті міняти laps",
 ],
 correctAnswer: 0,
 explanation: "Зона-тригер, не стіна.",
 },
 {
 id: "q4",
 type: MC,
 question: "Хто має виконувати телепорт/штраф, що впливає на заїзд?",
 options: [
 "Серверний Script",
 "Лише LocalScript без сервера",
 "Lighting",
 "Terrain Editor",
 ],
 correctAnswer: 0,
 explanation: "Чесний ефект.",
 },
 {
 id: "q5",
 type: MC,
 question: "Чому не ставити Hazard прямо на FinishPart?",
 options: [
 "Плутанина з фінішем і зайві спрацювання / ризик багів обліку",
 "FinishPart тоді стає швидшим",
 "Touched заборонений біля фінішу в Roblox",
 "Це підвищує FPS завжди",
 ],
 correctAnswer: 0,
 explanation: "Розділи фініш і пастку.",
 },
 {
 id: "q6",
 type: MC,
 question: "Навіщо Collision Groups у цьому уроці (lite)?",
 options: [
 "Керувати, які Parts з чим зіштовхуються (бар’єр/машина/гравець)",
 "Щоб малювати небо",
 "Це створює RemoteEvent",
 "Це видаляє Humanoid",
 ],
 correctAnswer: 0,
 explanation: "Порядок фізики.",
 },
 {
 id: "q7",
 type: MC,
 question: "Що зробити з камерою після виходу з VehicleSeat?",
 options: [
 "Повернути нормальний режим (не лишати зламаний Scriptable)",
 "Видалити Camera назавжди",
 "Поставити ClockTime = 0 обов’язково",
 "Вимкнути Output",
 ],
 correctAnswer: 0,
 explanation: "Не ламати пост-гонку.",
 },
 {
 id: "q8",
 type: MC,
 question: "Скільки пасток оптимально на старті уроку?",
 options: [
 "1–2 стабільні й видимі",
 "Обов’язково 50",
 "0 і ніколи не тестувати",
 "Лише невидимі без підказки",
 ],
 correctAnswer: 0,
 explanation: "Якість > кількість.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що з наведеного - поганий дизайн пастки?",
 options: [
 "Невидима зона смерті без шансу об’їхати",
 "Яскравий Oil на повороті з debounce",
 "Billboard «Небезпека» перед ямою",
 "Штраф часу замість крашу Studio",
 ],
 correctAnswer: 0,
 explanation: "Фрустрація без навчання.",
 },
 {
 id: "q10",
 type: MC,
 question: "Чи повинна пастка сама викликати Finish Remote?",
 options: [
 "Ні - фініш окрема чиста зона/логіка",
 "Так, завжди",
 "Лише якщо Oil червоний",
 "Тільки на клієнті",
 ],
 correctAnswer: 0,
 explanation: "Розділення систем.",
 },
 {
 id: "q11",
 type: MC,
 question: "Навіщо імена Hazard_Oil у папці Hazards?",
 options: [
 "Швидко знайти й пояснити структуру на Ship/викладачу",
 "Інакше Touched не працює",
 "Roblox вимагає саме ці імена",
 "Щоб вимкнути Pathfinding",
 ],
 correctAnswer: 0,
 explanation: "Чистий Explorer.",
 },
 {
 id: "q12",
 type: MC,
 question: "Який playtest ловить спам ефекту?",
 options: [
 "Проїхати Oil і порахувати, скільки разів спрацювало",
 "Змінити небо",
 "Перейменувати Lighting",
 "Видалити SpawnLocation",
 ],
 correctAnswer: 0,
 explanation: "Перевірка debounce.",
 },
 {
 id: "q13",
 type: MC,
 question: "CameraType.Follow у гонці (lite) навіщо?",
 options: [
 "Зручніше тримати машину в кадрі під час їзди",
 "Це збільшує Coins",
 "Це вимикає Remotes",
 "Це обов’язково ламає Seat",
 ],
 correctAnswer: 0,
 explanation: "Комфорт керування.",
 },
 {
 id: "q14",
 type: MC,
 question: "Як 9.6 готує 9.7?",
 options: [
 "Пастки не повинні давати фейковий фініш; анти-чит перевірить чесність",
 "Треба видалити всі Hazards перед анти-читом",
 "9.7 забороняє Touched",
 "Collision groups скасовують сервер",
 ],
 correctAnswer: 0,
 explanation: "Чисті межі систем.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 9.6?",
 options: [
 "1–2 hazards з debounce + lite collision/camera + Save",
 "Лише теорія без Studio",
 "Порожній Baseplate",
 "10 невидимих kill-brick без тесту",
 ],
 correctAnswer: 0,
 explanation: "Потрібні робочі пастки.",
 },
 ],
 },
}

export const ukLesson97 = {
 lessonId: "lesson-roblox-9-7",
 moduleId: "module-09",
 order: 7,
 title: "9.7 - Playtest анти-чит",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Скласти короткий анти-чит playtest для гонки (клієнт бреше)",
 "Перевірити Remote фінішу/кола: відстань, порядок чекпоінтів, спам",
 "Закрити мінімум 2 дірки (P0/P1) live з таймером",
 "Залишити Output і багліст чистими на золотому шляху",
 "Підготувати чесну базу до Ship Race (9.8)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 71 з 92)",
 content: `У **9.4–9.5** ти вже маєш Remote і облік кіл. Сьогодні питання одне: **чи можна зламати свою ж гонку за 5 хвилин?**

Ти працюєш як тестувальник-зловмисник (на своєму Place, не в чужих іграх):
1. Відкриваєш гонку з 9.1–9.6.
2. Пробуєш «клієнт бреше»: фейковий фініш, спам Remote, пропуск чекпоінтів.
3. Дивишся, що сервер **відмовив** або **пропустив**.
4. Лагодиш дірки.
5. Зберігаєш Place для завтрашнього Ship (9.8).

Це не урок «стати хакером». Це урок **звички Never trust the client** на живій трасі.

**Зроби зараз (2 хв):** відкрий Output і знайди \`OnServerEvent\` фінішу/кола. Якщо його немає - сьогодні P0 №1: додати серверний облік хоча б lite.`,
 },
 {
 title: "Чому анти-чит саме зараз",
 content: `| Без playtest «клієнт бреше» | З playtest |
|-----------------------------|------------|
| «У Solo ок» | Бачиш дірки до Ship |
| Лідерборд бреше | Час/кола чесні |
| Завтра рубрика C червона | Завтра Ship швидший |
| Звичка вірити LocalScript | Звичка валідувати на сервері |

У гонці найсолодший чіт - **сказати «я на фініші»** без їзди. Якщо це проходить - урок 9.4 ще не живий.

Метафора: Remote - це лист «я здаю роботу». Сервер - вчитель, який перевіряє, чи учень **у класі**, а не пише з дому «вже здав».

Запиши собі правило дня одним рядком: *«будь-яке число з клієнта (кола, фініш, час) підозріле, доки сервер не підтвердив.»* Це той самий принцип, що завтра в Ship і далі в магазині хабу.`,
 },
 {
 title: "Карта атак на учнівську гонку (lite)",
 content: `| # | Атака / баг | Що очікуєш від сервера |
|---|-------------|------------------------|
| 1 | FireServer фініш зі спавну | Deny (далеко / мало кіл) |
| 2 | Спам Finish 20× за секунду | 1 результат або cooldown |
| 3 | FireServer «коло +1» без чекпоінтів | Deny / ігнор |
| 4 | Пропуск порядку чекпоінтів | Deny |
| 5 | Повторний фініш після finished | Deny |
| 6 | Від’ємний / сміттєвий аргумент | typeof + return |
| 7 | UI сам пише «перемога» без сервера | Не впливає на лідерборд |
| 8 | Два гравці - стан не змішується | Окремі записи race[player] |

Сьогодні обов’язок: пройти **1–5** і закрити те, що червоне. 6–8 - якщо встигнеш.

Не шукай зовнішні експлойти. Достатньо тимчасового LocalScript у Studio з \`FireServer\` для тесту (потім видали).`,
 },
 {
 title: "Як безпечно «атакувати» в Studio",
 content: `1. У \`StarterPlayerScripts\` тимчасовий LocalScript \`Cli_CheatTest\` (ім’я навмисне).
2. Клавіша (наприклад P) → \`FinishRE:FireServer()\`.
3. Play → стій на спавні → натисни P.
4. Дивись Output і UI: чи зарахувало перемогу?
5. Після уроків **видали** або Disabled цей Script.

Інший тест: зі старту FireServer з \`itemId\`-сміттям / числом замість очікуваного аргумента чекпоінта.

Правило школи: тести лише на **своєму** Place. Не чіпай чужі опубліковані ігри.`,
 },
 {
 title: "Валідація фінішу: мінімум, який рятує",
 content: `Сервер перед «перемогою»:

1. \`race[player]\` існує і \`not finished\`.
2. \`laps >= NEED_LAPS\` (або чекпоінти зібрані).
3. \`nearFinish(player)\` - HumanoidRootPart у зоні фінішу (Magnitude).
4. (Опційно) час > мінімальний realistic (анти-телепорт за 0.1 с).
5. Ставиш \`finished = true\`, рахуєш час, FireClient ok.

Псевдо:

\`local function nearFinish(player)\`
\` local hrp = player.Character and player.Character:FindFirstChild("HumanoidRootPart")\`
\` if not hrp then return false end\`
\` return (hrp.Position - FinishPart.Position).Magnitude <= 25\`
\`end\`

Число 25 піджени під свою зону. Головне - **не нуль перевірок**.`,
 },
 {
 title: "Чекпоінти: порядок і анти-пропуск",
 content: `| Погано | Добре |
|--------|-------|
| Будь-який чекпоінт +1 коло | Лише наступний очікуваний індекс |
| Touched без debounce | Debounce на гравця + Part |
| Клієнт каже «я на CP3» | Сервер перевіряє відстань до CP3 |

Стан: \`lastCheckpoint = 0\`. На CP1 дозволено лише якщо last==0 → стає 1. На фініші вимагає last==N або laps готове.

Спам Touched: один Part може торкнутись 10 разів за секунду. Тримай \`lastTouchAt[player]\` або «вже відвідав цей CP у цьому колі».`,
 },
 {
 title: "Rate limit на Remote (як у магазині)",
 content: `Той самий патерн, що в хабі:

\`local lastAt = {}\`
\`local COOLDOWN = 0.25\`

\`FinishRE.OnServerEvent:Connect(function(player, ...)\`
\` local now = os.clock()\`
\` if now - (lastAt[player.UserId] or 0) < COOLDOWN then return end\`
\` lastAt[player.UserId] = now\`
\` tryFinish(player)\`
\`end)\`

Для чекпоінта cooldown може бути коротшим, але **без** tight loop обробки.

PlayerRemoving чистить \`race[player]\` і \`lastAt\`.`,
 },
 {
 title: "Що НЕ треба робити в «анти-читі» на курсі",
 content: `- Писати «військовий» античит на 2000 рядків.
- Банити гравців автоматично в навчальному Place.
- Вивчати чужі експлойт-тулзи.
- Ховати всю логіку в обфускацію замість простих перевірок.

Достатньо: **валідація + debounce + одна правда на сервері**. Це той самий м’яз, що завтра в Ship і далі в магазині M10.`,
 },
 {
 title: "Багліст анти-читу (шаблон)",
 content: `| ID | Атака | Результат | P | Статус |
|----|-------|-----------|---|--------|
| 1 | Finish зі спавну | Перемогло / відмова | P0 | |
| 2 | Спам Finish | 1 чи багато? | P0 | |
| 3 | Коло без CP | +коло / ні | P0 | |
| 4 | Сміттєвий аргумент | Краш / ігнор | P1 | |
| 5 | Повтор після finished | | P0 | |

P0 = можна виграти без їзди або зламати облік. Це **сьогодні** лагодиш.

**Зроби зараз (5 хв):** заповни рядки 1–3 фактами з Play.`,
 },
 {
 title: "Live-фікси: 2 дірки з таймером",
 content: `Після першої хвилі тестів обери **2 найгірші** червоні рядки.

Спринт (~15 хв):
1. 7 хв - фікс A (наприклад nearFinish).
2. 7 хв - фікс B (finished / cooldown / порядок CP).
3. Повтори атаки 1–3 - мають бути deny.
4. Чесний заїзд 1 коло - має бути ok.

Не малюй нову трасу. Анти-чит - про **перевірки**, не про декор.`,
 },
 {
 title: "Зв’язок з 9.8 Ship Race",
 content: `| Сьогодні | Завтра |
|----------|--------|
| Діри закриті або задокументовані | Рубрика C (мережа) зеленіша |
| Багліст атак | Доказ для викладача / портфоліо |
| Cli_CheatTest видалений/Disabled | Чистий Place для демо |
| Звичка валідувати | Швидший Ship без сюрпризів |

Якщо фініш досі лише на клієнті - **не** йди в 9.8 «на удачу». Спочатку серверна правда.

Save: \`Lesson 9.7 - Race AntiCheat\`.`,
 },
 {
 title: "Чекліст здачі уроку 71",
 content: `- [ ] Є список атак 1–5 з фактами ok/deny
- [ ] Finish/коло на сервері з ≥1 валідацією (зона або порядок)
- [ ] Debounce / finished захист від спаму
- [ ] ≥2 live-фікси зроблені сьогодні
- [ ] Чесний заїзд після фіксів працює
- [ ] Тимчасовий CheatTest Script прибраний або Disabled
- [ ] Output без крашу на атаках і на чесному колі
- [ ] Save Lesson 9.7 - Race AntiCheat

Далі **9.8** зшиє все рубрикою Ship - безпека вже не повинна сипатись від однієї клавіші P.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Вважати Solo Play доказом безпеки",
 explanation: "Без атаки «клієнт бреше» дірка непомітна.",
 correctApproach: "Навмисний FireServer зі спавну + лог",
 },
 {
 mistake: "Вірити фінішу без nearFinish / кіл",
 explanation: "Перемога телепортом події.",
 correctApproach: "Зона + laps/checkpoints на сервері",
 },
 {
 mistake: "Немає finished / cooldown",
 explanation: "Спам плодить результати.",
 correctApproach: "Один фініш + rate limit",
 },
 {
 mistake: "Лишити Cli_CheatTest у фінальному Place",
 explanation: "Завтра на демо випадково «читаєш» чіт.",
 correctApproach: "Disabled або Delete після тестів",
 },
 {
 mistake: "Лагодити колір траси замість P0 валідації",
 explanation: "Ship завтра впаде на рубриці C.",
 correctApproach: "Спочатку deny на фейковий фініш",
 },
 {
 mistake: "Змішувати стан двох гравців в одній table без ключа player",
 explanation: "Чужі кола/фініші.",
 correctApproach: "race[player] окремо",
 },
 ],
 summary: "Ти прогнав анти-чит playtest гонки: атаки «клієнт бреше», серверні deny, debounce і мінімум 2 фікси. Урок 71 готує чесний фініш до Ship Race в 9.8.",
 practiceTask: {
 title: "Атаки на фініш (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** фейковий фініш не проходить; чесний заїзд проходить.

### Part A - Багліст атак (8 хв)
1. Таблиця атак 1–5.
2. Тимчасовий Cli_CheatTest (клавіша → FireServer).
3. Запиши ok/deny для кожної атаки.

### Part B - Фікси (15 хв)
1. nearFinish і/або перевірка кіл/CP.
2. finished + cooldown.
3. typeof на аргументи.
4. Повтори атаки - очікуй deny.
5. Чесне 1 коло - очікуй ok.

### Part C - Прибирання (7 хв)
1. Disabled/Delete CheatTest.
2. Output чистий.
3. **Save:** Lesson 9.7 - Race AntiCheat`,
 hints: [
 "Спочатку атака зі спавну - найшвидший діагноз",
 "Magnitude до FinishPart піджени під свою зону",
 "Не публікуй Place з увімкненим CheatTest",
 ],
 optionalChallenge: "Мінімальний час кола (anti-instant): якщо t < 5 с при NEED_LAPS=1 - deny з логом.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 9.7?",
 options: [
 "Перевірити й закрити дірки, де клієнт може брехати про фініш/кола",
 "Намалювати нову трасу з нуля",
 "Одразу Publish Public",
 "Видалити RemoteEvent",
 ],
 correctAnswer: 0,
 explanation: "Анти-чит playtest гонки.",
 },
 {
 id: "q2",
 type: MC,
 question: "Що означає атака «Finish зі спавну»?",
 options: [
 "FireServer фініш, стоячи далеко від зони фінішу",
 "Видалення SpawnLocation",
 "Зміна кольору машини",
 "Вимкнення Output",
 ],
 correctAnswer: 0,
 explanation: "Фейкова перемога без їзди.",
 },
 {
 id: "q3",
 type: MC,
 question: "Навіщо nearFinish на сервері?",
 options: [
 "Щоб не зараховувати фініш гравцю далеко від FinishPart",
 "Щоб прискорити VehicleSeat",
 "Це замінює UI таймера",
 "Це потрібно лише для Skybox",
 ],
 correctAnswer: 0,
 explanation: "Валідація позиції.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо прапорець finished?",
 options: [
 "Щоб повторний/спам фініш не давав багато перемог",
 "Щоб вимкнути Anchored",
 "Це створює Terrain",
 "Це замінює Pathfinding",
 ],
 correctAnswer: 0,
 explanation: "Одноразовий результат.",
 },
 {
 id: "q5",
 type: MC,
 question: "Чому Solo Play без атак недостатній?",
 options: [
 "Чесна їзда не показує, чи сервер відмовить брехні клієнта",
 "Play у Studio заборонений",
 "Output не працює в Solo",
 "Remotes не реплікуються ніколи",
 ],
 correctAnswer: 0,
 explanation: "Треба навмисний тест брехні.",
 },
 {
 id: "q6",
 type: MC,
 question: "Що робити з Cli_CheatTest після уроків?",
 options: [
 "Disabled або Delete",
 "Залишити Enabled назавжди в проді",
 "Покласти в ReplicatedStorage як секрет",
 "Опублікувати як Tool для всіх",
 ],
 correctAnswer: 0,
 explanation: "Прибрати тестовий чіт.",
 },
 {
 id: "q7",
 type: MC,
 question: "Навіщо cooldown на Finish Remote?",
 options: [
 "Щоб спам подій не ламав облік",
 "Щоб змінити Material траси",
 "Це вимикає Humanoid",
 "Це обов’язково для Decal",
 ],
 correctAnswer: 0,
 explanation: "Rate limit.",
 },
 {
 id: "q8",
 type: MC,
 question: "Як чекпоінти захищають від «+коло з повітря»?",
 options: [
 "Сервер вимагає порядок / наступний індекс і відстань",
 "Клієнт сам ставить lastCheckpoint без сервера",
 "Чекпоінти лише декоративні завжди",
 "Достатньо змінити назву Part",
 ],
 correctAnswer: 0,
 explanation: "Порядок і валідація.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що з наведеного - P0 для гонки?",
 options: [
 "Можна виграти FireServer зі спавну",
 "Трохи кривий колір бар’єра",
 "Дрібний Billboard offset",
 "Неідеальний Ambient",
 ],
 correctAnswer: 0,
 explanation: "Критична дірка обліку.",
 },
 {
 id: "q10",
 type: MC,
 question: "Правило школи щодо «анти-чит тестів»?",
 options: [
 "Лише на своєму Place; не чіпати чужі опубліковані ігри",
 "Атакувати будь-які ігри в каталозі",
 "Обов’язково качати експлойт-тулзи",
 "Банити однокласників автоматично",
 ],
 correctAnswer: 0,
 explanation: "Етика навчання.",
 },
 {
 id: "q11",
 type: MC,
 question: "Навіщо typeof-перевірка аргументів Remote?",
 options: [
 "Відсіяти сміття (число/table замість очікуваного)",
 "Щоб збільшити Volume",
 "Це замінює VehicleSeat",
 "typeof працює лише на клієнті",
 ],
 correctAnswer: 0,
 explanation: "Валідація входу.",
 },
 {
 id: "q12",
 type: MC,
 question: "Скільки live-фіксів мінімум очікує практика?",
 options: [
 "Хоча б 2 P0/P1 дірки",
 "Обов’язково 50",
 "0 - лише теорія",
 "Лише зміна неба",
 ],
 correctAnswer: 0,
 explanation: "Атаки → фікси.",
 },
 {
 id: "q13",
 type: MC,
 question: "Як 9.7 готує 9.8 Ship?",
 options: [
 "Рубрика мережі завтра зеленіша, якщо фейковий фініш уже deny",
 "Ship забороняє Remotes",
 "Треба видалити всю трасу",
 "Анти-чит скасовує UI",
 ],
 correctAnswer: 0,
 explanation: "Безпека перед ship.",
 },
 {
 id: "q14",
 type: MC,
 question: "Що перевірити після фіксів обов’язково?",
 options: [
 "Атаки знову deny І чесний заїзд ok",
 "Лише колір SpawnLocation",
 "Лише назву модуля",
 "Вимкнути Output назавжди",
 ],
 correctAnswer: 0,
 explanation: "Регресія обох шляхів.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом 9.7?",
 options: [
 "Багліст атак + серверні deny + ≥2 фікси + Save",
 "Лише теорія без Studio",
 "Порожній Baseplate",
 "CheatTest Enabled у проді",
 ],
 correctAnswer: 0,
 explanation: "Потрібен доказ анти-читу.",
 },
 ],
 },
}

export const ukLesson98 = {
 lessonId: "lesson-roblox-9-8",
 moduleId: "module-09",
 order: 8,
 title: "9.8 - Ship Race",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати один золотий шлях гонки: старт → кола → фініш → лідерборд",
 "Перевірити інтеграцію таймера/UI, Remote фінішу і серверного обліку кіл",
 "Пройти рубрику Ship Race (~15 пунктів) і закрити блокери",
 "Підтвердити, що клієнт не може «виграти» без серверної валідації",
 "Зберегти Place як артефакт модуля 9 перед хабом (M10)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 72 з 92)",
 content: `Це **фінал модуля Race + мережа**. Не нова траса з нуля і не «ще один Remote». Сьогодні ти **зшиваєш** те, що вже є, у гонку, яку можна показати за 90 секунд.

У модулі 9 ти (або група) збирав:
1. **9.1** - машина + траса + чекпоінти кіл.
2. **9.2** - таймер / кола / UI.
3. **9.3–9.4** - Client vs Server + RemoteEvent (фініш/коло).
4. **9.5** - лідерборд кіл.
5. **9.6** - пастки / collision.
6. **9.7** - playtest анти-чит.

Сьогоднішній артефакт: **один Place**, де гравець без суфлера:
**сідає в машину → розуміє ціль → їде кола → сервер зараховує → бачить час/лідерборд → фініш чесний.**

Якщо якоїсь системи ще немає - зроби **lite** саме під маршрут (1 коло, 1 пастка, 1 Remote фінішу), а не три недороблені Places.

**Зроби зараз (3 хв):** одним реченням запиши золотий шлях гонки. Якщо не можеш - спочатку стрілки на папері.`,
 },
 {
 title: "Що означає Ship Race (і що ні)",
 content: `| Ship Race | Ще НЕ ship |
|-----------|-----------|
| Траса + машина + облік кіл/часу **разом** | Окремо «гарна машина» і окремо UI без зв’язку |
| Фініш через Remote з **серверною** перевіркою | LocalScript сам ставить «перемогу» |
| Лідерборд / час видно гравцю | Лише print у Output викладача |
| Output чистий на 1–2 колах | Червоні помилки «ігноруємо» |
| 60–90 с демо без пояснень | 5 хв «зараз покажу де старт» |

Ship **не** означає AAA-трасу Formuly. Означає: **короткий повний заїзд уже зібраний**, іменований і чесний по мережі.

Після цього уроку модуль 10 (хаб) матиме приклад: Remotes + серверна правда вже в голові з гонки.`,
 },
 {
 title: "Карта систем, які зшиваємо",
 content: `| Система | Де живе | Що дає золотому шляху |
|---------|---------|------------------------|
| Машина + траса | Workspace | VehicleSeat, старт, чекпоінти |
| Таймер / кола UI | LocalScript + серверні події | Гравець бачить прогрес |
| Remote фініш/коло | RS Remotes + SSS | Клієнт просить, сервер вирішує |
| Облік кіл / час | Серверна table / leaderstats | Правда результату |
| Лідерборд | FireClient або Values | Порівняння / свій час |
| Пастки | Workspace + серверний урон/ресет | Вау без чіту через стіни |
| Анти-чит lite | 9.7 звички | Не вірити позиції «я на фініші» сліпо |

Правило інтеграції: **одна правда про кола й час** - на сервері. UI лише показує те, що сервер надіслав або що реплікувалось з Values.

**Зроби зараз (4 хв):** у Explorer знайди Remote фінішу/кола, скрипт обліку, UI таймера. Чого немає - P0 на сьогодні.`,
 },
 {
 title: "Золотий шлях гонки (6–8 кроків)",
 content: `Запиши **до** фіксів:

1. Спавн біля старту / табличка «Сядь у машину, зроби N кіл».
2. Сісти в VehicleSeat → машина їде.
3. Пройти чекпоінти в порядку (якщо є).
4. Сервер +1 коло / оновлення UI.
5. Після потрібної кількості кіл - фініш (Remote + валідація).
6. Побачити час / місце в лідерборді.
7. Повторний заїзд не ламає облік (ресет стану).
8. Output без червоного на маршруті.

Це і є «інтеграція». Не «усі фічі в файлах», а **гравець відчуває заїзд**.

Lite-заміна: якщо лідерборд ще тонкий - достатньо TextLabel «Твій час: …» від сервера.`,
 },
 {
 title: "Рубрика Ship Race (~15 пунктів)",
 content: `Став **так / ні / майже**. Мета: максимум **так** на золотому шляху.

### A. Траса і старт (1–4)
| # | Пункт | Так? |
|---|-------|------|
| 1 | Spawn / старт зрозумілий, машина доступна | |
| 2 | Табличка або маркер каже ціль ≤30–60 с | |
| 3 | Траса проїзна (не застрягає в першому повороті) | |
| 4 | Імена/папки читаються (Track/, Cars/, Remotes/) | |

### B. Цикл гонки (5–8)
| # | Пункт | Так? |
|---|-------|------|
| 5 | Кола або фініш реально рахуються | |
| 6 | UI показує час і/або коло | |
| 7 | Пастка (якщо є) спрацьовує чесно, не 20×/с | |
| 8 | Повторний заїзд можливий після ресету | |

### C. Мережа і чесність (9–12)
| # | Пункт | Так? |
|---|-------|------|
| 9 | Фініш/коло йде через Remote (не лише клієнт) | |
| 10 | Сервер перевіряє хоча б lite (відстань/checkpoint/порядок) | |
| 11 | Підробити «фініш» з LocalScript не дає перемоги | |
| 12 | Анти-спам / debounce на Remote є | |

### D. Ship-якість (13–15)
| # | Пункт | Так? |
|---|-------|------|
| 13 | Output чистий на 1–2 колах | |
| 14 | Демо 60–90 с без суфлера | |
| 15 | Save Lesson 9.8 - Race Ship | |

Усе «ні» в B/C = список фіксів Part B. Не малюй другу трасу - закрий цикл.`,
 },
 {
 title: "Типові дірки інтеграції гонки",
 content: `| Симптом | Ймовірна причина | Швидкий фікс |
|---------|------------------|--------------|
| UI показує фініш, сервер ні | Перемога лише на клієнті | Remote + серверний стан |
| Кола скачуть / дубляться | Немає порядку чекпоінтів / debounce | lastCheckpoint + cooldown |
| Фініш здалеку | Немає перевірки позиції | Magnitude / зона фінішу на сервері |
| Другий заїзд ламається | Стан не скидається | resetRace(player) |
| Машина не їде | Anchored / Weld / Seat | Перевір 9.1 білд |
| Лідерборд порожній | Немає FireClient / Value | Мінімум свій час на UI |

**Зроби зараз (6 хв):** пройди шлях раз і познач перший червоний пункт рубрики. Лагод його раніше за новий декор.`,
 },
 {
 title: "Міні-схема даних заїзду",
 content: `На сервері на гравця (table або Folder):

\`laps\` - скільки кіл зараховано  
\`lastCheckpoint\` - індекс останнього валідного чекпоінта  
\`startTime\` - os.clock() на старті  
\`finished\` - чи вже фінішував  
\`bestTime\` - найкращий час (опційно)

Псевдо фінішу:

\`FinishRE.OnServerEvent:Connect(function(player)\`
\` if race[player].finished then return end\`
\` if race[player].laps < NEED_LAPS then return end\`
\` if not nearFinish(player) then return end\`
\` local t = os.clock() - race[player].startTime\`
\` race[player].finished = true\`
\` updateBoard(player, t)\`
\` FinishRE:FireClient(player, true, t)\`
\`end)\`

Клієнт лише каже «даю фініш» або «проїхав чекпоінт X». Сервер каже «так/ні».`,
 },
 {
 title: "Онбординг траси за 8 хвилин",
 content: `Новачок у гонці губиться швидше, ніж в obby: неясно, куди їхати і скільки кіл.

Мінімум на старті:
- табличка з 2–3 кроками;
- яскравий колір стартової лінії;
- ActionText / підказка «Сісти» на VehicleSeat (якщо Prompt).

Текст:
*«1) Сідай у червону машину. 2) Їдь за стрілками. 3) Зроби 1 коло до фінішу.»*

Перевір: відійди очима від монітора і підійди знову - чи видно старт без твоїх слів?`,
 },
 {
 title: "Playtest інтеграції (чекліст)",
 content: `| # | Дія | Очікування | Факт |
|---|-----|------------|------|
| 1 | Новий Play | Спавн і машина ок | |
| 2 | Сісти й поїхати | Керування працює | |
| 3 | 1 коло / фініш | Сервер зарахував | |
| 4 | UI час/коло | Збігається з фактом | |
| 5 | Підробити фініш з клієнта (якщо вмієш) | Відмова | |
| 6 | Спам Remote | Не 10 перемог | |
| 7 | Другий заїзд | Стан скинувся | |
| 8 | Пастка (якщо є) | Чесний ефект | |
| 9 | Output | Без червоного | |
| 10 | Демо 90 с | Вкладаєшся | |

Пункти 3–6 - серце Ship Race. Без них рубрика C червона.`,
 },
 {
 title: "Що свідомо відкласти",
 content: `Не роби сьогодні:
- 12 машин і 5 трас;
- повний сезон / elo рейтинг;
- Ideal CameraMode на годину;
- Publish Public (ближче до M12);
- новий open-world навколо траси.

Роби сьогодні:
- **один** заїзд MVP;
- чесний Remote + серверний облік;
- UI часу/кіл;
- рубрика + Save.

Усе «хочу ще» - у нотатку для polish / M11. Ship любить вузький переможний круг.`,
 },
 {
 title: "Зв’язок із M10 і портфоліо",
 content: `| Після 9.8 | Далі |
|-----------|------|
| Робоча гонка з Remotes | Хаб 10.x - та сама звичка Never trust client |
| Золотий шлях 90 с | Легше Demo Ready / SHOWCASE |
| Чесний фініш | Портфоліо: «сервер валідує коло» |
| Lite обсяг | Не тягнути 3 жанри в фіналку без потреби |

Якщо каса фінішу ще на клієнті - **не** йди далі з гордістю. Сьогоднішній P0: серверна перемога.

Save: \`Lesson 9.8 - Race Ship\`.`,
 },
 {
 title: "Чекліст здачі уроку 72",
 content: `- [ ] Золотий шлях записаний
- [ ] Рубрика ~15 пунктів проставлена
- [ ] Кола/час на сервері
- [ ] Фініш через Remote з lite-валідацією
- [ ] UI показує прогрес
- [ ] Повторний заїзд не ламає стан
- [ ] Анти-спам / не вірити сліпому фінішу
- [ ] Playtest-таблиця хоча б раз
- [ ] Демо 60–90 с
- [ ] Save Lesson 9.8 - Race Ship

Якщо все є - модуль 9 закрито. Можна йти в живий хаб.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Перемога лише в LocalScript (час/фініш без сервера)",
 explanation: "Чіт і розсинхрон з лідербордом.",
 correctApproach: "Remote + серверний стан laps/finished",
 },
 {
 mistake: "Три Places: машина / UI / Remote окремо",
 explanation: "Немає інтегрованого заїзду.",
 correctApproach: "Один Place, один золотий шлях",
 },
 {
 mistake: "Немає ресету між заїздами",
 explanation: "Другий круг ламає облік.",
 correctApproach: "resetRace(player) на старт",
 },
 {
 mistake: "Рубрика «майже», але демо потребує суфлера",
 explanation: "Це не ship для гравця.",
 correctApproach: "Онбординг + 90 с без пояснень",
 },
 {
 mistake: "Спам Finish Remote дає багато перемог",
 explanation: "Економіка статусу/лідерборда мертва.",
 correctApproach: "finished flag + debounce",
 },
 {
 mistake: "Роздути 5 трас замість закрити 1 коло",
 explanation: "Година зникає, блокери лишаються.",
 correctApproach: "1 MVP-заїзд + стабільний Remote",
 },
 ],
 summary: "Ти зібрав Ship Race: один золотий шлях, де машина, кола/час і Remote-фініш ділять серверну правду. Рубрика й playtest підтверджують демо 60–90 с без суфлера - база перед живим хабом у модулі 10.",
 practiceTask: {
 title: "Ship Race: зшити і здати (~30 хв)",
 difficulty: "intermediate",
 description: `**Мета:** один Place з інтегрованим заїздом старт → коло/фініш → UI.

### Part A - Карта і рубрика (8 хв)
1. Запиши золотий шлях 6–8 кроків.
2. Пройди рубрику ~15 пунктів у Play.
3. Випиши P0 з блоків B і C.

### Part B - Інтеграційні фікси (15 хв)
1. Фініш/коло через Remote + серверний стан.
2. Lite-валідація (зона / порядок чекпоінтів).
3. UI час/коло з серверної правди.
4. Ресет на повторний заїзд + debounce.
5. Швидка перевірка «клієнт бреше» (якщо вмієш).

### Part C - Демо і Save (7 хв)
1. Playtest-таблиця 1–10.
2. Репетиція демо 60–90 с.
3. **Зберегти:** Lesson 9.8 - Race Ship
4. Практика завершена, коли рубрика має максимум «так» і Output чистий.`,
 hints: [
 "Спочатку серверний finished/laps, потім краса траси",
 "1 коло достатньо для ship",
 "Якщо лідерборда немає - TextLabel свого часу ок",
 ],
 optionalChallenge: "Другий гравець у Studio (або 2 вікна) - обидва фініші коректні без змішування стану.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 9.8 - це…",
 options: [
 "Зшити гонку в один золотий шлях і закрити рубрику Ship",
 "Почати новий жанр sim з нуля",
 "Одразу Publish Public",
 "Видалити всі Remotes",
 ],
 correctAnswer: 0,
 explanation: "Інтеграція і здача модуля 9.",
 },
 {
 id: "q2",
 type: MC,
 question: "Де має жити правда про кола і час фінішу?",
 options: [
 "На сервері (стан заїзду / Values)",
 "Лише в LocalScript таймера",
 "У назві Part траси",
 "У Lighting.ClockTime",
 ],
 correctAnswer: 0,
 explanation: "Серверна правда гонки.",
 },
 {
 id: "q3",
 type: MC,
 question: "Чому фініш через Remote, а не лише клієнтський TextLabel «Перемога»?",
 options: [
 "Інакше легко підробити результат без валідації",
 "RemoteEvent заборонений у гонках",
 "UI не вміє показувати час",
 "VehicleSeat не працює без Remote",
 ],
 correctAnswer: 0,
 explanation: "Never trust client.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо прапорець finished на сервері?",
 options: [
 "Щоб спам фінішу не давав багато перемог",
 "Щоб вимкнути Anchored",
 "Це замінює VehicleSeat",
 "Це потрібно лише для Terrain",
 ],
 correctAnswer: 0,
 explanation: "Анти-дубль результату.",
 },
 {
 id: "q5",
 type: MC,
 question: "Який мінімальний ланцюг вважається інтеграцією гонки?",
 options: [
 "Старт → їзда/кола → серверний фініш → видимий час/результат",
 "Лише гарна табличка",
 "Лише ParticleEmitter",
 "Лише зміна неба",
 ],
 correctAnswer: 0,
 explanation: "Повний короткий заїзд.",
 },
 {
 id: "q6",
 type: MC,
 question: "Що робити, якщо лідерборда з 9.5 ще немає?",
 options: [
 "Lite: показати свій час з сервера на UI",
 "Скасувати весь модуль 9",
 "Ставити перемогу лише на клієнті",
 "Ігнорувати онбординг",
 ],
 correctAnswer: 0,
 explanation: "Чесна lite-заміна.",
 },
 {
 id: "q7",
 type: MC,
 question: "Типова дірка: UI каже фініш, сервер ні. Причина?",
 options: [
 "Перемога порахована лише на клієнті",
 "Занадто гарний Billboard",
 "Наявність SpawnLocation",
 "Закороткий пітч",
 ],
 correctAnswer: 0,
 explanation: "Роз’їзд клієнт/сервер.",
 },
 {
 id: "q8",
 type: MC,
 question: "Навіщо reset стану між заїздами?",
 options: [
 "Щоб другий заїзд коректно рахував кола/час",
 "Щоб видалити RemoteEvent",
 "Це вимикає Pathfinding",
 "Щоб очистити Terrain",
 ],
 correctAnswer: 0,
 explanation: "Чистий повтор.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що свідомо відкладаємо в 9.8?",
 options: [
 "П’ять трас і Publish замість одного стабільного кола",
 "Перевірку Output",
 "Один MVP-заїзд",
 "Рубрику Ship",
 ],
 correctAnswer: 0,
 explanation: "Скоуп control.",
 },
 {
 id: "q10",
 type: MC,
 question: "Онбординг гонки мінімально потребує…",
 options: [
 "Зрозумілий старт: машина + ціль (кола/фініш)",
 "12 панелей HUD одразу",
 "Публікацію в каталог",
 "Вимкнення Explorer",
 ],
 correctAnswer: 0,
 explanation: "Новачок має знати що робити.",
 },
 {
 id: "q11",
 type: MC,
 question: "Який пункт рубрики стосується мережі?",
 options: [
 "Фініш через Remote і lite-валідація на сервері",
 "Колір неба о 18:00",
 "Кількість дерев біля траси",
 "Назва модуля 1",
 ],
 correctAnswer: 0,
 explanation: "Блок C рубрики.",
 },
 {
 id: "q12",
 type: MC,
 question: "Навіщо playtest «підробити фініш з клієнта»?",
 options: [
 "Перевірити, що сервер відмовить у фейковій перемозі",
 "Щоб навчити хакерству інших учнів",
 "Це замінює рубрику",
 "Так вимагає Terrain Editor",
 ],
 correctAnswer: 0,
 explanation: "Анти-чит з 9.7 у ship-контексті.",
 },
 {
 id: "q13",
 type: MC,
 question: "Після успішного 9.8 логічний наступний крок курсу…",
 options: [
 "Модуль 10 - живий хаб (ті самі звички Remotes)",
 "Видалити гонку і почати Baseplate",
 "Пропустити всі тести",
 "Прибрати VehicleSeat назавжди",
 ],
 correctAnswer: 0,
 explanation: "Мережа → хаб.",
 },
 {
 id: "q14",
 type: MC,
 question: "Що перевіряє nearFinish / зона фінішу на сервері?",
 options: [
 "Що гравець реально біля фінішу, а не «телепортнув» подію",
 "Колір машини",
 "Гучність Sound",
 "Ім’я Place",
 ],
 correctAnswer: 0,
 explanation: "Lite-валідація позиції.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом уроку 9.8?",
 options: [
 "Place Race Ship з інтегрованим заїздом, рубрикою й чистим Output",
 "Лише теорія без Studio",
 "Порожній Baseplate",
 "UI таймера без сервера",
 ],
 correctAnswer: 0,
 explanation: "Потрібен зібраний заїзд.",
 },
 ],
 },
}
