/** Rich UK content for Roblox Module 02 - World craft */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson21 = {
 lessonId: "lesson-roblox-2-1",
 moduleId: "module-02",
 order: 1,
 title: "2.1 - Штаб острова",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати штаб острова як Model IslandHQ_v1 з PrimaryPart і Pivot",
 "Організувати Workspace через Folder і імена PascalCase",
 "Свідомо виставити Anchored, CanCollide і Massless на деталях штабу",
 "Прочитати дітей моделі через GetChildren і print у Output",
 "Здати IslandHQ_v1 поверх Living Island без атракціонів і Constraints"
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - штаб острова",
 content: `Модуль **«World craft»** починається не з лави й kill-блоків, а з **порядку в світі**. У кінці уроку в тебе буде **штаб острова** - Model \`IslandHQ_v1\`: кілька іменованих Parts у одній «коробці», з якорем (**PrimaryPart** / **Pivot**), папками і коротким Script, який у Output показує дітей моделі.

Чому саме штаб, а не одразу двері чи карусель? Бо Constraints (урок 2.2) і атракціони (2.3) **ламатимуться**, якщо світ - смітник безіменних \`Part\` у корені Workspace. Ти вже здав живу локацію в 1.8; тепер учишся **пакувати** місце в Model так, щоб його можна було пересунути, повернути й перевірити з коду.
**Звідки стартуємо:** відкрий \`Module 1 - Living Island\` (або найповніший Place після 1.8). Не починай порожній Baseplate - штаб живе **на твоєму острові**. Якщо боїшся зіпсувати здачу M1 - спочатку **Save As** копію \`Lesson 2.1 - IslandHQ_v1\` і працюй у копії.
 },
 {
 title: "Навіщо Model, якщо вже є Folder і Parts",
 content: `У Модулі 1 ти вже бачив **Folder** (легкий порядок) і, ймовірно, **Model** \`House_01\` після Group. Різниця важлива:

| Контейнер | Що вміє | Коли |
|-----------|---------|------|
| **Folder** | Лише порядок у Explorer | Звуки, декор, «коробки для очей» |
| **Model** | Переміщення цілого об’єкта, PrimaryPart, Pivot, GetChildren як «дітей будівлі» | Будинок, штаб, ворота, атракціон |

**Folder** не має PrimaryPart і не «їздить» як єдина тверда річ у тому ж сенсі, що Model. Якщо виділити Folder і тягнути Move - поведінка інша, ніж у Model з правильною опорою.

**Model** - це «один предмет світу»: штаб, ворота парку, карусель. Коли пізніше в 2.2 повісиш двері на Hinge, вони теж житимуть у Model. Сьогодні закладаємо звичку: **ім’я моделі = артефакт**, деталі всередині іменовані.

**Зроби зараз (3 хв):** у Explorer знайди \`House_01\` (або свій будинок). Якщо це вже Model - розгорни стрілку й подивись дітей. Якщо Parts лежать розрізнено - сьогодні на штабі зробиш правильно з самого початку.`,
 },
 {
 title: "Group → Model: збираємо IslandHQ_v1 руками",
 content: `1. Біля будинку постав **4 Parts** (Block):
   - \`Platform\` - низька плита (наприклад Size \`12, 1, 12\`)
   - \`Pillar_A\` і \`Pillar_B\` - дві колони на платформі
   - \`RoofPlate\` - дах / навіс над колонами
2. Вирівняй зі **Snap**: колони стоять на Platform, дах лежить на колонах без «щілин у небі».
3. Усі **Anchored = true** (поки штаб статичний).
4. Виділи всі чотири (Ctrl+клік у Explorer або рамкою у Viewport).
5. Вкладка **Model** → **Group** (або Ctrl+G).
6. Перейменуй нову Model на \`IslandHQ_v1\`.

Якщо Group зробив щось із дивною назвою (\`Model\`) - одразу перейменуй. **PascalCase** для імен світу: \`IslandHQ_v1\`, \`ParkGate\`, не \`island hq\` і не \`part1\`.

**Ungroup** (Ctrl+U) - аварійний вихід, якщо згрупував зайве (наприклад, випадково захопив \`MagicCube\`). Після Ungroup імена Parts лишаються - це нормально; просто Group знову лише штаб.

Перевір у Explorer: діти \`IslandHQ_v1\` - лише деталі штабу й (пізніше) Script аудиту. Якщо всередині опинився \`House_01\` - розгрупуй і почни акуратніше.

**Зроби зараз (10 хв):** збери каркас штабу й Group у \`IslandHQ_v1\`. Постав його так, щоб з spawn / від будинку було видно: це «офіс острова», не випадкова купа кубів у воді.`,
 },
 {
 title: "PrimaryPart і Pivot - якір моделі",
 content: `Без **PrimaryPart** Model часто «їде» дивно: крутиш Rotate - обертається навколо дивного центру; Move стрілками - відчуття, ніби тягнеш повітря.

**PrimaryPart** - Part усередині Model, яку Studio вважає **опорою** для позиції й повороту всієї моделі.

**Як виставити:**
1. Виділи \`IslandHQ_v1\` у Explorer.
2. У Properties знайди **PrimaryPart**.
3. Натисни на поле → вибери \`Platform\` (логічна «підлога» штабу).

**Pivot** (точка опори / gizmo) пов’язаний із тим, де «живе» центр маніпуляції. У сучасній Studio ти бачиш **Pivot** у Properties моделі / через інструмент Pivot. Практичне правило сьогодні:
- PrimaryPart = \`Platform\`
- після зміни PrimaryPart клікни Model → **F** (підлетіти) → легенько Move - чи рухається штаб цілісно?

Якщо PrimaryPart порожній - вистав обов’язково перед здачею. Це частина артефакту, не «опція для перфекціоністів».

**Зроби зараз (5 хв):** вистав PrimaryPart = \`Platform\`. Посунь усю Model на 4 studs убік інструментом Move. Усі колони й дах мають їхати разом. Якщо щось лишилось - воно не було в Model.`,
 },
 {
 title: "Folders і PascalCase - штаб читається через місяць",
 content: `У 1.8 ти вже робив **легкі Folder**. Сьогодні правило жорстше: штаб і світ мають **читатися в Explorer без здогадок**.

Пропонована схема (адаптуй, але не розкидай усе в корінь Workspace):

Workspace
  House_01 (Model)
  IslandHQ_v1 (Model)
    Platform
    Pillar_A
    Pillar_B
    RoofPlate
    HQ_Audit (Script)
  Interactives (Folder) ← MagicCube, LogicCube, PartyButton з M1
  Decor (Folder)
  Sounds (Folder)
Terrain

**PascalCase** для імен об’єктів світу:
- добре: \`IslandHQ_v1\`, \`Pillar_A\`, \`RoofPlate\`
- погано: \`part\`, \`ааа\`, \`штабік\`, \`New Part\`

Цифри в кінці (\`_v1\`, \`_01\`) - ок, якщо стабільні. Не плоди \`IslandHQ_v1 (2)\` від дублікатів Studio - перейменуй свідомо.

**Зроби зараз (5 хв):** перевір імена всередині \`IslandHQ_v1\`. Перенеси старі інтерактиви M1 у Folder, якщо вони ще стирчать у корені. Script штабу поки може лежати всередині Model.`,
 },
 {
 title: "Anchored, CanCollide, Massless - три тумблери фізики",
 content: `Ти вже знаєш **Anchored** з будинку: статичне → \`true\`, інакше гравітація знесе. Сьогодні додаємо два сусіди, які плутають навіть досвідчених.

| Property | Що робить | Для штабу сьогодні |
|----------|-----------|---------------------|
| **Anchored** | Ігнорує фізику / гравітацію | \`true\` на Platform, колонах, даху |
| **CanCollide** | Чи можна стати / впертись | \`true\` на підлозі й колонах; іноді \`false\` на чистому декорі |
| **Massless** | «Без маси» для фізики з’єднань | Поки штаб на Anchored - майже не відчуєш; стане критично в **2.2–2.3**, коли з’являться Constraints |

**Типова пастка:** декоративна сфера на даху з \`CanCollide = true\` - Character чіпляється головою. Для дрібного декору часто \`CanCollide = false\`, але **Platform** завжди з колізією.

**Massless** сьогодні лише **покажи в Properties** і запам’ятай ім’я. Не вмикай навмання на всьому Anchored-штабі «про всяк випадок» - спочатку зрозумій. У наступних уроках Massless допоможе, щоб легкі деталі не тягнули важкі через Weld/Hinge.

**Зроби зараз (4 хв):** пройди всі Parts у \`IslandHQ_v1\`: Anchored true, CanCollide на Platform true. Якщо є чисто декоративна «антена» - спробуй CanCollide false і пройди під нею в Play.`,
 },
 {
 title: "GetChildren - побачити дітей моделі з коду",
 content: `У M1 ти писав \`script.Parent\` - «моя Part». Сьогодні інший масштаб: **хто всередині моделі?**

local hq = script.Parent -- Script лежить у IslandHQ_v1
local kids = hq:GetChildren()
print("Дітей у штабі:", #kids)

\`GetChildren()\` повертає **список** дітей (у Lua це таблиця). \`#kids\` - скільки елементів. Якщо бачиш \`0\` - Script, ймовірно, не там: перевір батька в Explorer.

Щоб **перелічити імена**, потрібен короткий обхід. Повний модуль про \`while\` / \`for\` буде в **M3**, але для аудиту штабу достатньо цього зразка - сприймай його як **інструмент огляду**, не як нову велику тему циклів:

local hq = script.Parent

print("=== IslandHQ audit ===")
for _, child in ipairs(hq:GetChildren()) do
	print(child.Name, child.ClassName)
end

\`_\` означає «індекс не потрібен». \`child\` - кожен нащадок: Part, Script тощо. У Output ти маєш побачити \`Platform Part\`, \`Pillar_A Part\`, … і сам \`HQ_Audit Script\` (Script теж дитина Model).

**Не плутай** з \`FindFirstChild("Platform")\` - той шукає одного нащадка за ім’ям. Сьогодні достатньо списку всіх дітей; точковий пошук знадобиться частіше в M3+.

**Не роби сьогодні:** \`while true do\` для крутіння атракціону, \`Touched\` на підлозі, кіл-блоки. Лише audit у Output.

**Зроби зараз (6 хв):** вставь **Script** у \`IslandHQ_v1\` (не LocalScript), назви \`HQ_Audit\`, встав код аудиту, Play → дивись Output.`,
 },
 {
 title: "Три шари коду аудиту (збираємо по кроках)",
 content: `Пиши не все одразу - як у MagicCube: спочатку \`print\`, потім перевірка PrimaryPart.

**Крок 1 - чи взагалі Script у моделі:**

local hq = script.Parent
print("Штаб:", hq.Name, hq.ClassName)

Очікуй у Output щось на кшталт \`Штаб: IslandHQ_v1 Model\`. Якщо бачиш \`Part\` - Script лежить не в Model, а в одній деталі: перетягни Script на \`IslandHQ_v1\`.

**Крок 2 - PrimaryPart:**

local hq = script.Parent
if hq.PrimaryPart then
	print("PrimaryPart:", hq.PrimaryPart.Name)
else
	print("PrimaryPart відсутній - вистав Platform!")
end

Тут знову твій \`if/else\` з **1.4** - без нових конструкцій.

**Крок 3 - повний audit з GetChildren** (код з попередньої секції).

**Зроби зараз (8 хв):** пройди три кроки. На здачі викладач може попросити показати Output після Play - це частина доказу артефакту.`,
 },
 {
 title: "Pivot на практиці: крутимо штаб цілісно",
 content: `Перевірка PrimaryPart руками:

1. Stop (вийти з Play).
2. Виділи \`IslandHQ_v1\` (клік по моделі в Explorer, не по одній колоні).
3. **Rotate (4)** - поверни на 90° зі Snap.
4. Увесь штаб має обернутись навколо опори, пов’язаної з PrimaryPart / Pivot.
5. Верни кут назад, якщо потрібно для композиції острова.

Якщо обертається лише одна Part - ти виділив дитину, не Model. Звичка: спочатку Explorer → клікни ім’я **IslandHQ_v1**.

Переміщення штабу ближче до стежки / далі від води роби **тільки** виділенням Model. Інакше через тиждень матимеш «дах у кущах, колони в морі».

**Зроби зараз (4 хв):** навмисно поверни штаб і поверни назад. Зафіксуй відчуття: Model + PrimaryPart = один предмет.`,
 },
 {
 title: "Що не чіпати сьогодні (межа модуля)",
 content: `| Тема | Коли | Чому не зараз |
|------|------|----------------|
| WeldConstraint, Hinge, Rope | **2.2** | Спочатку якір Model |
| Spring, Prismatic, атракціони | **2.3** | Потрібні Constraints і колізії |
| Toolbox Free Model | **2.4** | Спочатку свій штаб руками |
| \`Touched\`, kill-блоки, чекпоінти obby | **M3 / M5** | Інша спіраль |
| \`while true\`, функції-модулі, LocalScript | **M3+** | Не для аудиту штабу |

Можна лишити Party Mode і куби з M1 - вони вже вміють. Не переписуй їх під штаб і не перенось Script вечірки всередину \`IslandHQ_v1\` без потреби: зламаєш \`script.Parent\`.

**Зроби зараз (2 хв):** у нотатках напиши одним рядком: «2.1 = Model + Pivot + імена + GetChildren audit».`,
 },
 {
 title: "Play-тест і Save перед здачею",
 content: `**Чекліст IslandHQ_v1:**
- [ ] Model називається саме \`IslandHQ_v1\`
- [ ] PrimaryPart виставлено (краще \`Platform\`)
- [ ] Імена дітей PascalCase, без \`Part\` / \`Part1\`
- [ ] Anchored на несучих Parts = true
- [ ] Play: Output показує audit (імена + PrimaryPart)
- [ ] Штаб стоїть на острові, не в прірві
- [ ] Save: \`Lesson 2.1 - IslandHQ_v1\`

**Маршрут гостя (1 хв):** з’явись → подивись на будинок → підійди до штабу → чи читається як «місце», а не як сміття Parts?

Якщо audit друкує зайві \`Folder\` або старі копії - прибери або винеси з Model.

Після Save не покладайся на Autosave як на єдиний доказ: у портфоліо має бути явна версія 2.1.

**Погляд у 2.2:** у **2.2 - Вхід у парк** з’являться **Attachments** і Constraints: Weld, Hinge (двері), Rope/Rod (міст). Артефакт - \`ParkGate\`. Сьогоднішній штаб лишиться **якорем світу**: парк логічно «відростає» від острова, де вже є \`IslandHQ_v1\` і \`House_01\`. Не розбирай штаб - клонуй Save As до \`Lesson 2.2 - ParkGate\`, коли дойде час. У 2.2 навчишся змусити **частини моделі рухатись одна відносно одної**, не втрачаючи цілісності.`,
 }
 ],
 },
 practice: {
 title: "Практика: IslandHQ_v1",
 duration: 30,
 description: `**Мета:** штаб острова як Model з PrimaryPart, порядком імен і audit через GetChildren.

Відкрий Living Island. Studio + Output поруч.`,
 parts: [
 {
 title: "Part A - Разом зі викладачем (10 хв)",
 content: `1. Побудуй \`Platform\`, \`Pillar_A\`, \`Pillar_B\`, \`RoofPlate\` біля будинку.
2. Group → \`IslandHQ_v1\`, PrimaryPart = \`Platform\`.
3. Встав Script \`HQ_Audit\` у Model.
4. Разом вставте крок 1–2 аудиту (\`print\` імені + перевірка PrimaryPart).
5. Play → підтвердіть Output.

**Критерій:** у Output видно ім’я моделі й PrimaryPart (або явне попередження, якщо забули виставити - тоді виставляєте й повторюєте).`,
 },
 {
 title: "Part B - Самостійно (12 хв)",
 content: `1. Допиши повний \`GetChildren\` audit з іменами й ClassName.
2. Наведи PascalCase: жодної дитини з ім’ям \`Part\`.
3. Розклади інтерактиви M1 по Folder, штаб лиши окремою Model.
4. Пройди Play: підійди до штабу, переконайся що Platform тримає Character (CanCollide).
5. Save As: \`Lesson 2.1 - IslandHQ_v1\`.

**Критерій:** викладач відкриває Explorer і за 15 секунд знаходить штаб без питання «де це?».`,
 },
 {
 title: "Part C - Челендж (8 хв)",
 content: `Обери один:
- додай \`SignBoard\` (Part + Decal з 1.5) **всередину** Model і переконайся, що audit його бачить;
- або зроби \`Antenna\` з \`CanCollide = false\` на даху й поясни в чаті курсу, навіщо;
- або вистав Massless = true лише на дрібній декоративній деталі й напиши одним реченням, *коли* це стане важливим (підказка: Constraints у 2.2+).

**Не роби:** Weld/Hinge, Free Model з Toolbox, \`Touched\` kill-підлогу.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Script лежить у Platform, а не в IslandHQ_v1",
 fix: "Тоді script.Parent - Part. Перетягни HQ_Audit на Model у Explorer і перевір print ClassName.",
 },
 {
 mistake: "PrimaryPart порожній",
 fix: "Виділи Model → Properties → PrimaryPart → Platform. Інакше Rotate/Move моделі будуть «п’яними».",
 },
 {
 mistake: "Згрупував штаб разом із Terrain або Baseplate",
 fix: "Ungroup, обери лише Parts штабу, Group знову. Terrain не кладуть у Model будинку.",
 },
 {
 mistake: "Після Move «від’їхав» лише дах",
 fix: "Виділяв дитину, не Model. Клікай IslandHQ_v1 у Explorer перед Move/Rotate.",
 },
 {
 mistake: "Імена Part, Part1, Model",
 fix: "Перейменуй у PascalCase: Platform, Pillar_A, IslandHQ_v1. Це частина здачі.",
 },
 {
 mistake: "Шукає Touched / kill-блоки в цьому уроці",
 fix: "Це не World craft 2.1. Сьогодні лише Model, Pivot, Folder, GetChildren audit.",
 },
 {
 mistake: "LocalScript замість Script",
 fix: "Для аудиту в Workspace потрібен звичайний Script (як MagicCube у 1.3). LocalScript - пізніше в M3.",
 }
 ],
 quiz: {
 title: "Тест 2.1 - Штаб острова",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Який головний артефакт уроку 2.1?",
 options: [
 "Kill-смуга з Touched",
 "ParkGate на Hinge",
 "Model IslandHQ_v1 з PrimaryPart і audit",
 "DataStore сейв острова"
 ],
 correctAnswer: 2,
 explanation: "2.1 - штаб як Model; ворота й Toolbox пізніше.",
 },
 {
 id: "q2",
 type: MC,
 question: "Чим Model принципово зручніший за Folder для штабу?",
 options: [
 "Model має PrimaryPart/Pivot і зручно рухається як один об’єкт",
 "Folder завжди швидший у Play",
 "У Folder не можна класти Parts",
 "Model забороняє Scripts"
 ],
 correctAnswer: 0,
 explanation: "Folder - порядок; Model - цілісний об’єкт світу з опорою.",
 },
 {
 id: "q3",
 type: MC,
 question: "Навіщо PrimaryPart?",
 options: [
 "Щоб увімкнути Neon",
 "Щоб замінити Anchored",
 "Щоб автоматично створити Toolbox",
 "Щоб задати опору для позиції/повороту Model"
 ],
 correctAnswer: 3,
 explanation: "PrimaryPart - якір моделі.",
 },
 {
 id: "q4",
 type: MC,
 question: "Яке ім’я найкраще для штабу за угодою уроку?",
 options: [
 "new model",
 "IslandHQ_v1",
 "штаб",
 "Part"
 ],
 correctAnswer: 1,
 explanation: "PascalCase і стабільна назва артефакту.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що робить GetChildren()?",
 options: [
 "Видаляє всіх дітей Model",
 "Вмикає CanCollide",
 "Повертає список дітей об’єкта",
 "Публікує Place"
 ],
 correctAnswer: 2,
 explanation: "GetChildren повертає дітей для огляду/обробки.",
 },
 {
 id: "q6",
 type: MC,
 question: "Де має лежати Script HQ_Audit у цьому уроці?",
 options: [
 "Всередині Model IslandHQ_v1",
 "У ServerStorage обов’язково",
 "У LocalPlayer",
 "Лише в Lighting"
 ],
 correctAnswer: 0,
 explanation: "script.Parent тоді вказує на штаб.",
 },
 {
 id: "q7",
 type: MC,
 question: "Який тумблер утримує статичну платформу штабу від падіння?",
 options: [
 "Massless = true",
 "Anchored = true",
 "CanQuery = false",
 "Locked = true"
 ],
 correctAnswer: 1,
 explanation: "Anchored - базова звичка з M1.",
 },
 {
 id: "q8",
 type: MC,
 question: "CanCollide = false на дрібній антені зазвичай означає:",
 options: [
 "Антена видалиться в Play",
 "PrimaryPart скинеться",
 "GetChildren зламається",
 "Character не впреться в антену головою"
 ],
 correctAnswer: 3,
 explanation: "Вимикаємо колізію декору, щоб не чіпляло гравця.",
 },
 {
 id: "q9",
 type: MC,
 question: "Massless у 2.1 ми...",
 options: [
 "Лише знайомимось; критично стане з Constraints пізніше",
 "Обов’язково вмикаємо на всіх Parts штабу",
 "Використовуємо замість PrimaryPart",
 "Ставимо лише на Terrain"
 ],
 correctAnswer: 0,
 explanation: "Тема підготовча до 2.2–2.3.",
 },
 {
 id: "q10",
 type: MC,
 question: "Який код коректно друкує імена дітей hq?",
 options: [
 "hq:GetParents()",
 "while hq do kill(hq) end",
 "for _, child in ipairs(hq:GetChildren()) do print(child.Name) end",
 "hq.PrimaryPart:Destroy()"
 ],
 correctAnswer: 2,
 explanation: "ipairs + GetChildren - огляд дітей.",
 },
 {
 id: "q11",
 type: MC,
 question: "Якщо Rotate крутить лише одну колону, найімовірніше:",
 options: [
 "Зламався Terrain",
 "Виділена дитина Model, а не сама IslandHQ_v1",
 "Треба LocalScript",
 "Забагато Decal"
 ],
 correctAnswer: 1,
 explanation: "Виділяй Model у Explorer.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що з цього НЕ тема уроку 2.1?",
 options: [
 "PrimaryPart",
 "PascalCase імена",
 "GetChildren audit",
 "WeldConstraint для дверей"
 ],
 correctAnswer: 3,
 explanation: "Weld/Hinge - урок 2.2.",
 },
 {
 id: "q13",
 type: MC,
 question: "Перевірка PrimaryPart через if у Script - це опора на знання з:",
 options: [
 "уроку 1.4 (if/else)",
 "M4 DataStore",
 "M9 RemoteEvent",
 "уроку 2.4 Toolbox"
 ],
 correctAnswer: 0,
 explanation: "Спіраль: if уже був у 1.4.",
 },
 {
 id: "q14",
 type: MC,
 question: "Рекомендована назва Save:",
 options: [
 "Untitled Experience",
 "Obby Kill Final",
 "Lesson 2.1 - IslandHQ_v1",
 "Module 9 Remotes"
 ],
 correctAnswer: 2,
 explanation: "Явна версія артефакту 2.1.",
 },
 {
 id: "q15",
 type: MC,
 question: "Наступний урок World craft після штабу - це:",
 options: [
 "Touched KillBrick",
 "Вхід у парк (Constraints: двері/міст)",
 "leaderstats Simulator",
 "Publish на Showcase"
 ],
 correctAnswer: 1,
 explanation: "2.2 - ParkGate з Weld/Hinge/Rope.",
 }
 ],
 },
}

export const ukLesson22 = {
 lessonId: "lesson-roblox-2-2",
 moduleId: "module-02",
 order: 2,
 title: "2.2 - Вхід у парк",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Побудувати ParkGate як Model з опорами, дверима й мостом",
 "Розмістити Attachments і зрозуміти, навіщо вони Constraints",
 "З’єднати статичні деталі через WeldConstraint",
 "Зробити двері на HingeConstraint і місток на Rope або Rod",
 "Перевірити з’єднання в Play і коротким Script-аудитом"
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - вхід у парк",
 content: `Модуль **World craft** йде далі: штаб \`IslandHQ_v1\` уже вміє стояти як одна Model. Сьогодні частини моделі **рухаються одна відносно одної** - але контрольовано, через **Constraints**.

У 1.1 ти зливав форму через Union. У 2.1 пакував світ у Model. Тепер з’являється третій шар майстерності: **фізичний зв’язок**. Без нього «двері» - просто стіна, а «міст» - декорація, яка в Play розлітається.
- дві опори (\`Post_L\`, \`Post_R\`)
- стулка дверей \`GateDoor\` на **HingeConstraint**
- короткий місток / перекладка на **RopeConstraint** або **RodConstraint**
- статичні деталі на **WeldConstraint** (козирок, табличка, декоративна балка)
- усе в одній Model з **PrimaryPart** (краще одна з опор)
- Save: \`Lesson 2.2 - ParkGate\`

**Звідки стартуємо:** \`Lesson 2.1 - IslandHQ_v1\` → Save As копію 2.2. Не знось штаб і будинок - парк **відростає** від уже живого острова. Якщо Place після 2.1 загубився - відкрий Living Island і швидко віднови мінімальний \`IslandHQ_v1\` з попереднього уроку, потім будуй ворота.

**Спіраль знань:** з 2.1 - Model, PrimaryPart, PascalCase, Anchored/CanCollide/Massless, \`GetChildren\`. З M1 - Parts, \`local\`, \`print\`, \`if\`. Сьогодні **нове:** Attachment, Weld, Hinge, Rope/Rod.

**Чого немає:** Spring/Prismatic/BallSocket і «атракціони» (**2.3**), Toolbox Free Model (**2.4**), \`Touched\`/kill-блоки (M3/M5), авто-двері через Tween/Remote (пізніше). Сьогодні перемагає **правильна петля руками**, не скриптовий костиль.`,
 },
 {
 title: "Constraints простими словами",
 content: `**Constraint** - правило фізики: «ці дві Parts пов’язані ось так». Без нього двері - просто Part, яку ти пересуваєш Move’ом; у Play вона або стоїть Anchored, або падає окремо.

Уяви фурнітуру в реальному світі: зварка, дверна петля, мотузка, металевий стержень. У Studio ті самі ідеї мають імена класів:

| Constraint | Відчуття | Сьогодні |
|------------|----------|----------|
| **WeldConstraint** | Приварено намертво | Козирок до опори, табличка до балки |
| **HingeConstraint** | Петля / шарнір | \`GateDoor\` крутиться навколо опори |
| **RopeConstraint** | Мотузка (тягне, може провисати) | Легкий «ланцюг» / підвіс моста |
| **RodConstraint** | Жорсткий стержень фіксованої довжини | Жорсткіша перекладка між опорами |

Усі вони майже завжди тримаються за **Attachments** - невидимі «цвяхи» на Parts, куди чіпляється зв’язок. Без цвяхів Constraint - порожня коробка в Explorer.

**Зроби зараз (2 хв):** у нотатках: Weld = зварка, Hinge = двері, Rope/Rod = міст. Не плутай з Union з 1.1: Union **зливає меші**, Constraint **зв’язує фізику**. Не плутай і з Group з 2.1: Group пакує для редактора, Constraint змушує Parts слухатись одна одної в Play.`,
 },
 {
 title: "Attachments - цвяхи, без яких петля не тримає",
 content: `Constraint майже ніколи не «клеїться» просто до центру Part. Йому потрібні **Attachments** - маленькі маркери в просторі деталі.

1. Виділи Part (наприклад \`Post_L\`).
2. Insert Object → **Attachment** (або через панель Constraints / Model - залежить від версії Studio).
3. Перейменуй одразу: \`HingeAtt_Post\`, \`HingeAtt_Door\`. Без імен через тиждень ти не зрозумієш, який цвях від петлі, а який від мотузки.
4. **Move** Attachment стрілками: він має сидіти на ребрі, де буде петля (край опори / край дверей), а не глибоко всередині цеглини.

У Properties дивись локальну **Position** і орієнтацію осей. Для дверей «як у житті» вісь обертання Hinge часто близька до вертикалі (**Y**). Якщо осі розвернуті криво - стулка може підлітати вгору або врізатись у підлогу.

**Перевірка очима:** виділи обидва Attachments по черзі й підлети (**F**). Вони мають майже зустрічатись у просторі петлі. Якщо один на землі, а другий на даху - Hinge буде страждати.

**Типова помилка:** Attachment глибоко всередині Part або на протилежному боці - двері крутяться «крізь стіну» або вириває з петлі.

**Зроби зараз (8 хв):** постав дві опори й стулку дверей (поки без Constraint). На опорі й на дверях - по Attachment на спільній лінії петлі. Огляд зверху й збоку обов’язковий.`,
 },
 {
 title: "Каркас ParkGate руками (ще без фізики)",
 content: `Збери Parts біля стежки від будинку / штабу до «зони парку»:

1. \`Post_L\` і \`Post_R\` - високі блоки, **Anchored = true**, CanCollide true.
2. \`GateDoor\` - тонка висока Part між опорами (щілина для проходу, коли відчинено).
3. \`Awning\` - козирок над входом (пізніше привариш Weld’ом до опори).
4. \`BridgePlank\` - дошка/платформа перед воротами або між двома маленькими стовпами містка \`BridgePost_A\` / \`BridgePost_B\`.

Group усе в Model \`ParkGate\`. **PrimaryPart** = \`Post_L\` (або платформа входу, якщо є).

Поки **не** чіпай Spring і не тягни Free Model з Toolbox.

**Зроби зараз (10 хв):** каркас + Group + PrimaryPart + PascalCase імена. Move цілої Model - чи їде вхід разом?`,
 },
 {
 title: "WeldConstraint - приварити козирок",
 content: `**Weld** тримає дві Parts так, ніби вони одна деталь, але меші лишаються окремими (на відміну від Union).

1. Insert → **WeldConstraint** (часто кладуть у одну з Parts або в Model).
2. У Properties: **Part0** = \`Post_L\`, **Part1** = \`Awning\`.
3. Обидві Parts можуть бути **Anchored = true** для статичного входу - Weld тоді фіксує відносне положення, і ти не «губиш» козирок при дрібних зсувах.

Альтернатива руками: виділи дві Parts → у стрічці Constraints / Model інколи є швидке **Weld**. Перевір, що з’явився WeldConstraint і поля Part0/Part1 заповнені.

**Коли Weld, а коли Union?** Union - вирізи вікон (1.1). Weld - збірка зі збереженням окремих Parts (легше міняти Material/Decal на козирку).

**Зроби зараз (5 хв):** привари \`Awning\` до опори. Play: козирок не падає й не відлітає.`,
 },
 {
 title: "HingeConstraint - двері, що крутяться",
 content: `Тепер петля - серце артефакту.

1. На \`Post_L\` - Attachment \`HingeAtt_Post\`.
2. На \`GateDoor\` - Attachment \`HingeAtt_Door\` (на тому ж ребрі).
3. Insert **HingeConstraint** (у двері, в опору або в Model - головне, щоб ти його знаходив у Explorer).
4. **Attachment0** / **Attachment1** = ці два Attachments. Обидва поля мають бути заповнені.
5. Фізика дверей:
   - \`Post_L\` → **Anchored = true** (стовп стоїть)
   - \`GateDoor\` → **Anchored = false** (інакше петля «мертва»)
   - часто **Massless = true** на дверях (тема з 2.1): легше крутиться, менше дивної інерції
6. CanCollide на дверях = true, щоб Character відчував стулку плечем.

У Play підштовхни двері (іди в них Character’ом). Вони мають обертатись навколо петлі, а не падати плашмя як окремий блок і не висіти Anchored-стіною.

Якщо двері провалюються крізь землю - перевір Anchored опори, чи Attachments не «в космосі», і чи стулка не стартує з перетином підлоги.

Опційно в Properties Hinge подивись **LimitsEnabled** / кути (якщо є в твоїй версії): можна обмежити відчинення, щоб двері не робили повне коло в паркан. Для першого разу достатньо вільної петлі без лімітів, аби побачити рух.

**Зроби зараз (10 хв):** робоча петля + короткий Play-тест плечем. Запиши в нотатках: «двері Unanchored, стовп Anchored».`,
 },
 {
 title: "Rope або Rod - місток між опорами",
 content: `Місток біля воріт (навіть короткий) показує другий тип зв’язку й відрізняє твій вхід від «двох стовпів у полі».

**Варіант A - RopeConstraint**
- Attachments на \`BridgePost_A\` і \`BridgePost_B\` (або на \`Post_L\` / \`Post_R\`)
- У Properties Rope задай **Length**: трохи більша за відстань у спокої → легке провисання; занадто мала → «натягнута струна» і дивні ривки
- Візуально можна додати тонкі Parts-дошки окремо (поки статичні / на Weld)

**Варіант B - RodConstraint**
- Жорстка відстань: стержень не «мнеться» як мотузка
- Зручно для жорсткої перекладки між двома стовпами, коли не хочеш гойдання

Опори містка: **Anchored true**. Якщо підвішуєш легку дошку на Rope - дошка Unanchored + обережний Massless. Для першого разу достатньо **видимого Rope/Rod між двома Anchored стовпами**, навіть без гойдалки-платформи: головне - побачити Constraint у Play і в аудиті.

Не обов’язково робити і Rope, і Rod. Обери один для здачі; другий можна спробувати в челенджі.

**Зроби зараз (8 хв):** зроби **або** Rope, **або** Rod між двома точками входу. У Properties перевір Attachment0/1 і Length (для Rope). Play: зв’язок не зникає, стовпи не вибухають.`,
 },
 {
 title: "Чому «не крутиться» - чекліст фізики",
 content: `Коли Hinge «мертвий», майже завжди одне з цього:

| Симптом | Ймовірна причина | Що зробити |
|---------|------------------|------------|
| Двері стоять як стіна | \`GateDoor\` Anchored true | Anchored false |
| Двері падають і відлітають | Немає Hinge / порожні Attachment0/1 | Заповни Attachments |
| Крутиться «не туди» | Attachment не на ребрі / крива вісь | Посунь Attachment, перевір осі |
| Опора їде разом із дверима | Опора Unanchored | Опори Anchored true |
| Усе вибухає при Play | Накладання Parts + дика фізика | Трохи розведи щілину, перевір CanCollide |
| Weld «не тримає» | Part0/Part1 порожні | Признач обидві Parts |

**Massless** на стулці - друг петлі; на важкій опорі не потрібен.

Не лагодь двері через \`Touched\` і не пиши \`while true\` «анімацію» - сьогодні перемагає **правильний Constraint**, не костиль скриптом.`,
 },
 {
 title: "Script-аудит воріт (лише перевірка)",
 content: `Як і \`HQ_Audit\`, зроби короткий Script \`Gate_Audit\` всередині \`ParkGate\`. Спочатку - чи Model і PrimaryPart на місці:

local gate = script.Parent
print("=== ParkGate audit ===")
print("Model:", gate.Name, "PrimaryPart:", gate.PrimaryPart and gate.PrimaryPart.Name or "НЕМАЄ")

for _, child in ipairs(gate:GetChildren()) do
	print(child.Name, child.ClassName)
end

Окремо - чи живі Constraints і Attachments. Attachments часто лежать **у Parts**, не в корені Model, тому аудит заходить на один рівень глибше:

local gate = script.Parent

local function auditConstraints(parent)
	for _, child in ipairs(parent:GetChildren()) do
		if child:IsA("WeldConstraint") then
			print("Weld", child.Name, child.Part0 and child.Part0.Name, child.Part1 and child.Part1.Name)
		elseif child:IsA("HingeConstraint") then
			print("Hinge", child.Name, child.Attachment0 and child.Attachment0.Name, child.Attachment1 and child.Attachment1.Name)
		elseif child:IsA("RopeConstraint") or child:IsA("RodConstraint") then
			print(child.ClassName, child.Name)
		end
		if child:IsA("BasePart") then
			for _, sub in ipairs(child:GetChildren()) do
				if sub:IsA("Attachment") then
					print(" Attachment on", child.Name, "→", sub.Name)
				end
				if sub:IsA("WeldConstraint") or sub:IsA("HingeConstraint")
					or sub:IsA("RopeConstraint") or sub:IsA("RodConstraint") then
					print(" Constraint in", child.Name, "→", sub.ClassName, sub.Name)
				end
			end
		end
	end
end

auditConstraints(gate)

Тут знову \`if\` / \`elseif\` з 1.4 і огляд дітей з 2.1. Метод \`IsA\` - «чи це об’єкт такого класу?»; запам’ятай як інструмент аудиту, не як нову велику тему ООП.

Міні-перевірка дверей окремим \`print\` (якщо знаєш ім’я стулки):

local door = script.Parent:FindFirstChild("GateDoor")
if door and door:IsA("BasePart") then
	print("GateDoor Anchored =", door.Anchored, "(має бути false)")
else
	print("GateDoor не знайдено - перевір ім’я")
end

**Зроби зараз (7 хв):** Play → Output показує PrimaryPart, Parts, Weld, Hinge, Rope або Rod, і рядок про Anchored дверей.`,
 },
 {
 title: "Play-тест маршрутом гостя",
 content: `Будівництво без Play - половина роботи. Пройди як гість парку:

1. З’явись на острові → йди від будинку / штабу до \`ParkGate\`.
2. Чи читається вхід за 2 секунди (дві опори + стулка + козирок)?
3. Підштовхни двері - крутяться на петлі, а не телепортуються?
4. Місток/перекладка на Rope/Rod видно й фізика стабільна?
5. Козирок на Weld лишився на місці після зіткнення Character з дверима?
6. Explorer: імена PascalCase, Model \`ParkGate\`, PrimaryPart заповнений, \`Gate_Audit\` друкує Weld/Hinge/Rope|Rod.

Якщо двері блокують прохід наглухо й не відчиняються - збільш щілину між опорами або постав стулку так, щоб Character міг обійти / штовхнути. Вхід має **запрошувати** в парк, а не бути багом колізій.

**Save:** \`Lesson 2.2 - ParkGate\`. Не покладайся лише на Autosave - у портфоліо потрібна явна версія воріт.`,
 },
 {
 title: "Межа уроку - що лишаємо на 2.3–2.4",
 content: `| Не сьогодні | Коли | Навіщо чекати |
|-------------|------|----------------|
| Spring, Prismatic, BallSocket, «карусель» | **2.3** | Спочатку петля й зварка |
| Collision groups | **2.3** lite | Після базових Constraints |
| Toolbox Free Model + аудит скриптів | **2.4** | Спочатку свій ParkGate руками |
| ProximityPrompt / авто-двері | **M3** | Спочатку фізична петля |
| \`Touched\` kill / obby | **M3/M5** | Інша спіраль |

Можна лишити Party Mode з M1 - не перенось його Script у \`ParkGate\` без потреби.

**Погляд у 2.3:** додаси Spring / Prismatic / BallSocket і CanTouch / CanQuery та Collision groups lite. Артефакт - \`ParkRides_v1\`. \`ParkGate\` лишиться **входом** - не розбирай ворота перед 2.3, Save As новий файл уроку.`,
 }
 ],
 },
 practice: {
 title: "Практика: ParkGate",
 duration: 30,
 description: `**Мета:** вхід у парк з Weld, Hinge і Rope/Rod на Model \`ParkGate\`.

Відкрий копію після 2.1. Studio + Output поруч.`,
 parts: [
 {
 title: "Part A - Разом зі викладачем (10 хв)",
 content: `1. Збери \`Post_L\`, \`Post_R\`, \`GateDoor\`, \`Awning\`.
2. Group → \`ParkGate\`, PrimaryPart = опора.
3. Weld козирка до опори.
4. Два Attachments + Hinge на дверях (двері Unanchored).
5. Play: штовхни двері.

**Критерій:** стулка крутиться, козирок на місці.`,
 },
 {
 title: "Part B - Самостійно (12 хв)",
 content: `1. Додай Rope **або** Rod для містка / перекладки.
2. Встав \`Gate_Audit\` і виведи Parts + Constraints у Output.
3. Пройди маршрут гостя від будинку до воріт.
4. Виправ імена PascalCase.
5. Save: \`Lesson 2.2 - ParkGate\`.

**Критерій:** викладач за хвилину бачить у Explorer Weld + Hinge + Rope/Rod і робочий Play.`,
 },
 {
 title: "Part C - Челендж (8 хв)",
 content: `Обери один:
- друга стулка \`GateDoor_R\` на \`Post_R\` (двійні двері);
- Decal «PARK» на козирку (навичка 1.5);
- порівняй Rope vs Rod на двох копіях перекладки й одним реченням у чаті курсу поясни різницю.

**Не роби:** Spring-карусель, Free Model з Toolbox, \`Touched\` на підлозі воріт.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Двері Anchored = true і «петля не працює»",
 fix: "Стулка має бути Unanchored; опори - Anchored. Інакше Hinge нічому крутити.",
 },
 {
 mistake: "HingeConstraint з порожніми Attachment0/1",
 fix: "Створи Attachments на опорі й дверях, признач у Properties, вирівняй на ребрі петлі.",
 },
 {
 mistake: "Weld без Part0/Part1",
 fix: "Признач обидві Parts. Перевір у Gate_Audit, що Weld друкує імена.",
 },
 {
 mistake: "Згрупував ворота разом із IslandHQ_v1",
 fix: "Окремі Model: штаб і ParkGate. Ungroup зайве й Group лише деталі входу.",
 },
 {
 mistake: "Шукає Spring / Prismatic у цьому уроці",
 fix: "Це 2.3. Сьогодні Weld + Hinge + Rope/Rod.",
 },
 {
 mistake: "Лагодження дверей через while true або Touched",
 fix: "Спочатку виправ Constraints і Anchored. Скриптова «анімація» - не тема 2.2.",
 },
 {
 mistake: "PrimaryPart порожній у ParkGate",
 fix: "Вистав опору як PrimaryPart - інакше Move/Rotate воріт знову «п’яні», як у 2.1.",
 }
 ],
 quiz: {
 title: "Тест 2.2 - Вхід у парк",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Який головний артефакт уроку 2.2?",
 options: [
 "Model ParkGate з Weld, Hinge і Rope/Rod",
 "IslandHQ_v1 без Constraints",
 "ParkRides_v1 на Spring",
 "Kill-смуга з Touched"
 ],
 correctAnswer: 0,
 explanation: "2.2 - вхід у парк; атракціони в 2.3.",
 },
 {
 id: "q2",
 type: MC,
 question: "Навіщо Attachment для Hinge?",
 options: [
 "Щоб змінити Material дверей",
 "Щоб замінити PrimaryPart",
 "Це точки кріплення, куди чіпляється Constraint",
 "Щоб увімкнути Terrain воду"
 ],
 correctAnswer: 2,
 explanation: "Constraints тримаються за Attachments.",
 },
 {
 id: "q3",
 type: MC,
 question: "Який Constraint «приварює» козирок до опори?",
 options: [
 "HingeConstraint",
 "WeldConstraint",
 "RopeConstraint",
 "BallSocketConstraint"
 ],
 correctAnswer: 1,
 explanation: "Weld - жорстка зварка двох Parts.",
 },
 {
 id: "q4",
 type: MC,
 question: "Щоб двері крутились на петлі, стулка зазвичай має:",
 options: [
 "Anchored = true",
 "CanCollide обов’язково false",
 "Бути Terrain",
 "Anchored = false"
 ],
 correctAnswer: 3,
 explanation: "Anchored стулка не гойдається на Hinge.",
 },
 {
 id: "q5",
 type: MC,
 question: "Опори воріт у цьому уроці логічно зробити:",
 options: [
 "Anchored = true",
 "Unanchored і Massless",
 "Лише MeshPart без Anchored",
 "LocalScript"
 ],
 correctAnswer: 0,
 explanation: "Стовпи стоять; крутиться стулка.",
 },
 {
 id: "q6",
 type: MC,
 question: "RopeConstraint на відміну від RodConstraint:",
 options: [
 "Завжди видаляє Attachments",
 "Працює лише в Lighting",
 "Більше схожий на мотузку з довжиною/провисанням; Rod - жорсткий стержень",
 "Замінює Union"
 ],
 correctAnswer: 2,
 explanation: "Rope гнучкіший за відчуттям, Rod фіксує довжину жорсткіше.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чим Weld відрізняється від Union (1.1)?",
 options: [
 "Нічим",
 "Union зливає меші/форму; Weld зв’язує фізику, Parts лишаються окремими",
 "Weld вирізає вікна",
 "Union працює лише під водою"
 ],
 correctAnswer: 1,
 explanation: "Різні інструменти для різних задач.",
 },
 {
 id: "q8",
 type: MC,
 question: "Якщо HingeAttachment’и порожні, найчастіше:",
 options: [
 "Двері все одно ідеально крутяться",
 "Автоматично створюється DataStore",
 "З’являється Free Model",
 "Петля не працює або поводиться дивно"
 ],
 correctAnswer: 3,
 explanation: "Attachment0/1 мають бути заповнені.",
 },
 {
 id: "q9",
 type: MC,
 question: "Massless на стулці дверей у 2.2:",
 options: [
 "Заборонений завжди",
 "Замінює HingeConstraint",
 "Часто допомагає легшій/стабільнішій петлі",
 "Потрібен лише на Terrain"
 ],
 correctAnswer: 2,
 explanation: "Продовження теми Massless з 2.1 у контексті Constraints.",
 },
 {
 id: "q10",
 type: MC,
 question: "Навіщо Gate_Audit Script?",
 options: [
 "Друкувати склад воріт і наявність Constraints у Output",
 "Відкривати двері по RemoteEvent",
 "Вбивати гравця при дотику",
 "Публікувати Place"
 ],
 correctAnswer: 0,
 explanation: "Аудит як у 2.1, плюс перевірка з’єднань.",
 },
 {
 id: "q11",
 type: MC,
 question: "child:IsA(\"HingeConstraint\") перевіряє:",
 options: [
 "Чи Part червона",
 "Чи об’єкт є HingeConstraint",
 "Чи гравець у меню",
 "Чи є вода на острові"
 ],
 correctAnswer: 1,
 explanation: "IsA - перевірка класу інстанса.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що з цього НЕ тема 2.2?",
 options: [
 "WeldConstraint",
 "HingeConstraint",
 "RopeConstraint або RodConstraint",
 "SpringConstraint для атракціону"
 ],
 correctAnswer: 3,
 explanation: "Spring - урок 2.3.",
 },
 {
 id: "q13",
 type: MC,
 question: "Рекомендована назва Save:",
 options: [
 "Untitled",
 "Module 6 Simulator",
 "Lesson 2.2 - ParkGate",
 "Obby Kill Final"
 ],
 correctAnswer: 2,
 explanation: "Явний артефакт 2.2.",
 },
 {
 id: "q14",
 type: MC,
 question: "Якщо Move крутить лише одну опору, а не всі ворота:",
 options: [
 "Виділена дитина Model, а не ParkGate",
 "Зламався Output",
 "Треба DataStore",
 "Треба LocalScript у Lighting"
 ],
 correctAnswer: 0,
 explanation: "Та сама звичка, що в 2.1 зі штабом.",
 },
 {
 id: "q15",
 type: MC,
 question: "Наступний урок World craft:",
 options: [
 "Checkpoint M1",
 "Атракціони + колізії (Spring/Prismatic…)",
 "leaderstats",
 "Publish Showcase"
 ],
 correctAnswer: 1,
 explanation: "2.3 - ParkRides_v1.",
 }
 ],
 },
}

export const ukLesson23 = {
 lessonId: "lesson-roblox-2-3",
 moduleId: "module-02",
 order: 3,
 title: "2.3 - Атракціони + колізії",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати зону атракціонів ParkRides_v1 на базі вже готового ParkGate",
 "Підключити SpringConstraint, PrismaticConstraint і BallSocketConstraint",
 "Свідомо виставити CanTouch і CanQuery на деталях атракціонів",
 "Зробити легке розділення колізій через Collision groups (lite)",
 "Перевірити атракціони Play-тестом і Script-аудитом без Touched-логіки гри"
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - зона атракціонів",
 content: `За воротами \`ParkGate\` гість має побачити **парк, що рухається**. Артефакт уроку - Model \`ParkRides_v1\`: мінімум **три** прості атракціони на різних Constraints.

У 2.2 ти навчив двері крутитись і міст триматись. Сьогодні інший настрій: **грайливий рух** - пружина, ліфт по рейці, маятник. Це все ще World craft (фізика й структура), а не код «гри» з M3: без kill-блоків, без збору монет, без Remote.
**Старт:** \`Lesson 2.2 - ParkGate\` → Save As 2.3. Ворота лишаються входом; сьогодні будуєш **за** ними. Якщо воріт немає - спочатку віднови мінімальний ParkGate з 2.2, інакше «атракціони в полі» гірше читаються як парк.
 },
 {
 title: "Три нові Constraints - карта відчуттів",
 content: `| Constraint | Рух | Ідея атракціону сьогодні |
|------------|-----|---------------------------|
| **SpringConstraint** | Тягне як пружина до цільової довжини | Батут-платформа, гойдалка на пружинах |
| **PrismaticConstraint** | Слайд лише вздовж однієї осі | Ліфт вгору-вниз, візок уперед-назад |
| **BallSocketConstraint** | Кулястий шарнір (гойдання в конусі) | Підвісна лампа, маятник, хиткі дверцята кабіни |

Порівняй із уже відомим з 2.2:
- **Hinge** - оберт навколо **однієї** осі (двері воріт) - лишай для \`ParkGate\`
- **BallSocket** - вільніше гойдання; погана заміна дверній петлі
- **Rope** - гнучка довжина без «пружинистого» удару; **Spring** - жорсткість (Stiffness) і демпфер (Damping)
- **Weld** - намертво; ніколи не «лікуй» ним пружину чи ліфт

Не треба ставити всі п’ять Constraints на один куб. Три станції - три різні відчуття. Саме це перевіряє викладач очима в Play, ще до аудиту.

**Зроби зараз (3 хв):** у нотатках три іконки: пружина / рейка / куля. Підпиши назви своїх станцій PascalCase.`,
 },
 {
 title: "Каркас ParkRides_v1 у світі",
 content: `1. За \`ParkGate\` виділи майданчик (рівна земля Terrain або Part \`RidesPlaza\`).
2. Збери три «станції» з іменами PascalCase, наприклад:
   - \`Ride_Spring\` - база + платформа
   - \`Ride_Lift\` - стійки + кабіна/платформа на Prismatic
   - \`Ride_Pendulum\` - стійка + вантаж на BallSocket
3. Group усе в \`ParkRides_v1\`, **PrimaryPart** = \`RidesPlaza\` (або центральна база).
4. Не звалюй атракціони в \`ParkGate\` і не змішуй зі \`IslandHQ_v1\` - окрема Model = окремий артефакт і окремий Move.

Композиція: після воріт око одразу чіпляється хоча б за один рухомий силует. Не ховай усі три станції за будинком на протилежному березі - інакше playtest «гостьовим маршрутом» розпадається.

Поки Constraints немає - опори Anchored, майбутні рухомі Parts теж можна тимчасово Anchored, але перед підключенням Spring/Prismatic/BallSocket зніми Anchored з рухомих елементів.

**Зроби зараз (8 хв):** каркас трьох станцій + Group + PrimaryPart + імена. Перевір Move цілої \`ParkRides_v1\`.`,
 },
 {
 title: "SpringConstraint - пружинна станція",
 content: `**Мета:** платформа \`SpringPad\`, яка пружинить відносно бази \`SpringBase\`.

1. \`SpringBase\` - Anchored true (земля атракціону).
2. \`SpringPad\` - Unanchored, CanCollide true (на неї стають). Massless: спробуй false (важча віддача) і true (легша реакція) - порівняй у Play.
3. Attachments на базі й на паді один над одним по вертикалі (як цвяхи пружини).
4. Insert **SpringConstraint** → Attachment0/1.
5. У Properties познайомся з ключовими полями:
   - **FreeLength** / довжина спокою - «висота» пружини без навантаження
   - **Stiffness** - жорсткість (космос → вібрація й вистріл у небо; занадто мало → локшина)
   - **Damping** - затухання (без демпфера гойдалка вічно дрижить)

Підстрибни Character’ом на пад: має бути віддача й повернення до спокою за секунди, а не орбіта. Якщо викидає - зменши Stiffness, додай Damping, перевір Anchored бази.

**Антипатерн:** Weld між базою й падом. Зварка + Anchored база = мертва «пружина». Weld лишай для декору на базі (поручні, неонова дуга), не для рухомого пада.

**Зроби зараз (8 хв):** робочий SpringPad + 2–3 стрибки + підкрутка Stiffness/Damping до «весело, але чесно».`,
 },
 {
 title: "PrismaticConstraint - ліфт по одній осі",
 content: `**Prismatic** дозволяє рух **лише вздовж осі**, заданої Attachments (для ліфта зазвичай вгору по **Y**).

1. \`LiftRail\` або дві стійки - Anchored true (рейка світу).
2. \`LiftPlatform\` - Unanchored, CanCollide true.
3. Attachments вирівняні по осі руху: уяви шпильку, вздовж якої їде намистина.
4. **PrismaticConstraint** між ними.
5. Якщо бачиш **ActuatorType** (None / Motor / Servo): для старту лиши **None** (штовхаєш фізикою) або дуже повільний Motor. **Без** скриптів керування ліфтом і без \`while true\`. Мета - зрозуміти вісь, не написати промисловий контролер.

У Play платформа не повинна розвертатись як двері на Hinge і не падати вбік як вільне тіло. Якщо «вириває» - Attachments не колінеарні / вісь крива.

Декор поручнів на стійках - Weld до Anchored рейки. Не приварюй саму платформу до рейки.

**Зроби зараз (8 хв):** ліфт/салазки їздять уздовж однієї осі; Character може стояти на платформі без застрягання навічно.`,
 },
 {
 title: "BallSocketConstraint - маятник",
 content: `**BallSocket** - шарнір «куля в лунці»: вантаж гойдається в конусі, а не лише в площині дверей.

1. \`PendulumAnchor\` - Anchored true (гак / балка над майданчиком).
2. \`PendulumBob\` - Unanchored вантаж (сфера або блок). CanCollide: true, якщо хочеш штовхати плечем; false - якщо лише візуальний маятник над головою.
3. Attachments: на гаку й на верхівці вантажу, якомога ближче одне до одного на старті.
4. **BallSocketConstraint** → Attachment0/1.
5. Опційно **LimitsEnabled** - обмежити кут, щоб маятник не намотувався на \`ParkGate\` і не зносив козирок.

Підштовхни вантаж у Play. Порівняй із Hinge на дверях: маятник «живе» вільніше, двері - передбачуваніша петля. Якщо вантаж вибухає при старті - зазвичай Attachments далеко один від одного або якір Unanchored.

Декор ланцюга між гаком і вантажем можна намалювати Parts’ами, але **фізику** тримає BallSocket, не десяток Weld у повітря.

**Зроби зараз (7 хв):** маятник гойдається, якір стоїть, ворота цілі після 20 секунд гойдання.`,
 },
 {
 title: "CanTouch і CanQuery - тумблери «чи світ помічає Part»",
 content: `Ти вже знаєш **CanCollide** (чи можна впертись). Поруч у Properties є ще два тумблери, які новачки ігнорують роками:

| Property | Простими словами | Навіщо на атракціоні |
|----------|------------------|----------------------|
| **CanCollide** | Фізична стіна / підлога | Платформи, на які стають |
| **CanTouch** | Чи взагалі можуть виникати події дотику | Декор без спаму дотиків; платформи, які «помітні» |
| **CanQuery** | Чи Part відповідає на просторові запити (raycast тощо) | Вимикай на чистому декорі, щоб пізніше промені не чіплялись без потреби |

**Спіраль курсу:** обробники \`Touched\` (монети, kill, кнопки підлоги) з’являться в **M3**. Сьогодні ти **не пишеш** \`Connect\` на Touched. Ти лише виставляєш CanTouch/CanQuery свідомо й можеш показати їх у аудиті.

Практичне правило парку:
- \`SpringPad\` / \`LiftPlatform\` → CanCollide true (і зазвичай CanTouch true)
- тонка неонова обшивка, що лише прикрашає ліфт → часто CanCollide false + CanTouch false

**Зроби зараз (4 хв):** на 1–2 декоративних Parts вимкни CanTouch і CanQuery; платформи для ніг не чіпай навмання.`,
 },
 {
 title: "Collision groups lite - щоб світ не гриз сам себе",
 content: `Іноді дві платформи атракціону вічно штовхають одна одну, або декор чіпляє Character за вухо. **Collision groups** - іменовані групи Parts; між групами можна вимкнути зіткнення.

**Lite-ритуал (без диплома фізика):**
1. Відкрий редактор **Collision Groups** (вкладка Model / Collision / окреме вікно - залежить від версії Studio).
2. Створи групу на кшталт \`RidesDecor\` (декор) поруч із Default.
3. Признач декоративні Parts у \`RidesDecor\`, платформи для ніг лиши в Default.
4. У матриці груп вимкни колізію \`RidesDecor\` ↔ Default / гравці - **разом із викладачем**, якщо UI незнайомий.

Якщо редактор груп у вашій версії Studio плутає групу - **еквівалент для здачі:** CanCollide = false на декорі + коротке пояснення «це мій бідний Collision group». Головне - розуміти **навіщо** групи існують, а не пройти сертифікацію інженера.

Не створюй 15 груп «про всяк випадок». Одна нова група + Default - стеля на сьогодні.

**Зроби зараз (5 хв):** або одна група з викладачем, або 2 Parts з вимкненим CanCollide як задокументований еквівалент.`,
 },
 {
 title: "Script-аудит атракціонів",
 content: `Спочатку - чи Script у правильному батьку (як у штабі й воротах):

local rides = script.Parent
print("Rides model:", rides.Name, rides.ClassName)
if not rides:IsA("Model") then
	print("УВАГА: поклади Rides_Audit у Model ParkRides_v1")
end

Потім повний аудит типів Constraints і тумблерів колізій. Script \`Rides_Audit\` у \`ParkRides_v1\`:

local rides = script.Parent
print("=== ParkRides audit ===")
print("PrimaryPart:", rides.PrimaryPart and rides.PrimaryPart.Name or "НЕМАЄ")

local spring, prismatic, ball = 0, 0, 0
local function scan(parent)
	for _, child in ipairs(parent:GetChildren()) do
		if child:IsA("SpringConstraint") then
			spring = spring + 1
			print("Spring:", child.Name)
		elseif child:IsA("PrismaticConstraint") then
			prismatic = prismatic + 1
			print("Prismatic:", child.Name)
		elseif child:IsA("BallSocketConstraint") then
			ball = ball + 1
			print("BallSocket:", child.Name)
		end
		if child:IsA("BasePart") then
			print(child.Name, "CanCollide=", child.CanCollide, "CanTouch=", child.CanTouch, "CanQuery=", child.CanQuery)
		end
		scan(child)
	end
end

scan(rides)
print("Totals → Spring:", spring, "Prismatic:", prismatic, "BallSocket:", ball)
if spring < 1 or prismatic < 1 or ball < 1 then
	print("УВАГА: має бути хоча б по одному Spring, Prismatic і BallSocket")
end

Тут знову \`if\`, огляд дітей і \`IsA\`. Лічильник через \`spring = spring + 1\` (у Luau інколи пишуть +=; для копипасту безпечніший повний запис із плюсом).

Міні-перевірка пада пружини:

local pad = script.Parent:FindFirstChild("SpringPad", true)
if pad and pad:IsA("BasePart") then
	print("SpringPad Anchored =", pad.Anchored, "(має бути false)")
else
	print("SpringPad не знайдено - перевір ім’я")
end

\`FindFirstChild(..., true)\` шукає **рекурсивно** всередині моделі - зручно, якщо пад лежить у вкладеному Folder/Model станції.

**Зроби зараз (6 хв):** Play → totals 1/1/1 без рядка УВАГА, плюс рядок про Anchored пада.`,
 },
 {
 title: "Баланс і безпека атракціону (без kill-блоків)",
 content: `Чесний парк відрізняється від «фізичного кошмару» кількома простими правилами:

- рух **читається** здалеку (не невидима пружина під прозорою підлогою)
- Character не застрягає між Prismatic-платформою і стійкою навічно - лиши щілини / зніми зайвий CanCollide на декорі
- маятник не зносить \`ParkGate\` кожні 2 секунди (відстань, Limits, менша маса вантажу)
- Spring не запускає на місячну орбіту (Stiffness/Damping)
- Anchored лише на опорах; рухомі Parts - Unanchored + правильний Constraint
- імена станцій читаються в Explorer за 5 секунд

Не «лагодь» вибух через \`Touched\` → телепорт у небо або \`while true\` «стабілізатор». Спочатку зменши Stiffness, розведи Parts, перевір Attachments, Massless, Collision/CanCollide.

Пам’ятай: це все ще модуль **World craft**. Красива фізика без скриптового жанру цінніша за костиль на 40 рядків.

**Зроби зараз (4 хв):** 60 секунд хаотичного бігу по трьох станціях. Список багів - лише фізичні фікси.`,
 },
 {
 title: "Play-тест і Save",
 content: `**Чекліст ParkRides_v1:**
- [ ] Окрема Model за воротами, не всередині \`ParkGate\`
- [ ] Є Spring, Prismatic, BallSocket (по ≥1)
- [ ] PrimaryPart виставлено
- [ ] CanTouch/CanQuery продумані хоча б на декорі
- [ ] Collision group lite **або** еквівалент через CanCollide false на декорі
- [ ] \`Rides_Audit\` друкує totals без УВАГА
- [ ] SpringPad Unanchored (аудит це підтверджує)
- [ ] Save: \`Lesson 2.3 - ParkRides_v1\`

**Маршрут гостя:** будинок → штаб → ворота (штовхни двері) → три атракціони по черзі → назад до штабу. Якщо на маршруті Character застряг - це баг здачі, не «фішка парку».

Після Save не перезаписуй файл ім’ям 2.2: портфоліо має окрему версію атракціонів.

**Погляд у 2.4:** checkpoint World craft - Toolbox hygiene, аудит Scripts, MeshPart vs Decal, playtest → \`Park_v1\`. Атракціони - серце парку; у 2.4 додаси гігієну, а не нові Constraints з нуля.`,
 }
 ],
 },
 practice: {
 title: "Практика: ParkRides_v1",
 duration: 30,
 description: `**Мета:** три атракціони на Spring / Prismatic / BallSocket + свідомі колізії.

Відкрий копію після 2.2.`,
 parts: [
 {
 title: "Part A - Разом (10 хв)",
 content: `1. Майданчик \`RidesPlaza\` за воротами.
2. Разом зберіть Spring-станцію (база + пад + SpringConstraint).
3. Play: 2 стрибки, підкрутіть Stiffness/Damping.
4. Group початок \`ParkRides_v1\`.

**Критерій:** пружина відчутна, світ не вибухає.`,
 },
 {
 title: "Part B - Самостійно (12 хв)",
 content: `1. Додай Prismatic-ліфт і BallSocket-маятник.
2. Вистав CanTouch/CanQuery на декорі.
3. Collision group lite або CanCollide false на декорі.
4. \`Rides_Audit\` → totals 1/1/1.
5. Save \`Lesson 2.3 - ParkRides_v1\`.

**Критерій:** викладач бачить три різні Constraints у Explorer і рух у Play.`,
 },
 {
 title: "Part C - Челендж (8 хв)",
 content: `Обери один:
- друга пружина з іншими Stiffness/Damping і порівняй у чаті курсу;
- ліфт із ActuatorType Motor на дуже малій швидкості (без циклу в Script);
- маятник з Limits, щоб не бив \`ParkGate\`.

**Не роби:** Free Model карусель з Toolbox, \`Touched\` kill, \`while true\` спінер.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Weld між SpringBase і SpringPad",
 fix: "Weld убиває пружину. База Anchored, пад Unanchored, лише SpringConstraint.",
 },
 {
 mistake: "Prismatic Attachments не на одній осі",
 fix: "Вирівняй Attachments; інакше платформу «вириває» вбік.",
 },
 {
 mistake: "BallSocket замість Hinge на дверях ParkGate",
 fix: "Двері лишай на Hinge з 2.2. BallSocket - для маятника/хиткого декору.",
 },
 {
 mistake: "Пише Touched-логіку «щоб атракціон працював»",
 fix: "Сьогодні фізика Constraints. Touched як механіка гри - M3.",
 },
 {
 mistake: "Усі атракціони всередині ParkGate Model",
 fix: "Окремий ParkRides_v1. Ворота - вхід, атракціони - зона за ними.",
 },
 {
 mistake: "Stiffness пружини космос",
 fix: "Зменши Stiffness, додай Damping, перевір масу/Massless пада.",
 },
 {
 mistake: "Ігнорує CanTouch/CanQuery повністю",
 fix: "Хоча б на 1–2 декоративних Parts вимкни свідомо й поясни на здачі.",
 }
 ],
 quiz: {
 title: "Тест 2.3 - Атракціони + колізії",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Артефакт уроку 2.3 - це:",
 options: [
 "ParkGate без нових Constraints",
 "Park_v1 після Toolbox",
 "ParkRides_v1 з Spring, Prismatic і BallSocket",
 "Obby з KillBrick"
 ],
 correctAnswer: 2,
 explanation: "2.3 - зона атракціонів.",
 },
 {
 id: "q2",
 type: MC,
 question: "SpringConstraint за відчуттям найближчий до:",
 options: [
 "Жорсткої зварки Weld",
 "Пружини з жорсткістю й затуханням",
 "Тільки горизонтальних дверей",
 "DataStore"
 ],
 correctAnswer: 1,
 explanation: "Пружина - Stiffness/Damping.",
 },
 {
 id: "q3",
 type: MC,
 question: "PrismaticConstraint обмежує рух:",
 options: [
 "Вздовж однієї осі (слайд)",
 "Лише обертанням на 360°",
 "Лише зміною Material",
 "Лише в Terrain Editor"
 ],
 correctAnswer: 0,
 explanation: "Салазки / ліфт по осі.",
 },
 {
 id: "q4",
 type: MC,
 question: "BallSocketConstraint відрізняється від Hinge тим, що:",
 options: [
 "Не потребує Attachments",
 "Працює лише під водою",
 "Замінює PrimaryPart",
 "Дає вільніше гойдання в конусі, не лише оберт в одній площині петлі"
 ],
 correctAnswer: 3,
 explanation: "Кулястий шарнір vs петля.",
 },
 {
 id: "q5",
 type: MC,
 question: "CanCollide відповідає за:",
 options: [
 "Чи Part є фізичною перешкодою / підлогою",
 "Чи є Script у Part",
 "Чи опубліковано Place",
 "Чи працює Lighting"
 ],
 correctAnswer: 0,
 explanation: "Класичний тумблер колізії.",
 },
 {
 id: "q6",
 type: MC,
 question: "CanTouch у цьому уроці ми:",
 options: [
 "Обов’язково використовуємо з Connect(Touched)",
 "Видаляємо з Studio",
 "Виставляємо свідомо, але не пишемо ігрову Touched-логіку",
 "Ставимо лише на Terrain"
 ],
 correctAnswer: 2,
 explanation: "Touched-механіки - пізніше в M3.",
 },
 {
 id: "q7",
 type: MC,
 question: "Collision groups lite потрібні, щоб:",
 options: [
 "Зберігати DataStore",
 "Керувати, які групи об’єктів зіштовхуються",
 "Замінити Union",
 "Створити LocalScript"
 ],
 correctAnswer: 1,
 explanation: "Розділення колізій між групами.",
 },
 {
 id: "q8",
 type: MC,
 question: "Якщо приварити SpringPad Weld’ом до Anchored бази:",
 options: [
 "Пружина стане сильнішою",
 "Автоматично з’явиться BallSocket",
 "Зникне ParkGate",
 "Пружинний рух зазвичай гине"
 ],
 correctAnswer: 3,
 explanation: "Weld фіксує відносно бази.",
 },
 {
 id: "q9",
 type: MC,
 question: "Який код допомагає порахувати Spring у моделі?",
 options: [
 "if child:IsA(\"SpringConstraint\") then spring += 1 end",
 "while true do kill() end",
 "game:GetService(\"DataStoreService\")",
 "Terrain:Clear()"
 ],
 correctAnswer: 0,
 explanation: "IsA + лічильник в аудиті.",
 },
 {
 id: "q10",
 type: MC,
 question: "Де логічно розмістити ParkRides_v1?",
 options: [
 "Усередині Lighting",
 "Лише в ServerStorage",
 "За ParkGate, окремою Model",
 "Замість Terrain"
 ],
 correctAnswer: 2,
 explanation: "Зона за входом.",
 },
 {
 id: "q11",
 type: MC,
 question: "Що з цього НЕ тема 2.3?",
 options: [
 "PrismaticConstraint",
 "Аудит Scripts у Free Model з Toolbox",
 "CanQuery",
 "BallSocketConstraint"
 ],
 correctAnswer: 1,
 explanation: "Toolbox hygiene - 2.4.",
 },
 {
 id: "q12",
 type: MC,
 question: "Занадто великий Stiffness на Spring часто дає:",
 options: [
 "Кращий Decal",
 "Автоматичний Save",
 "Вимкнення Atmosphere",
 "Ривки / «вистріл» гравця"
 ],
 correctAnswer: 3,
 explanation: "Баланс Stiffness/Damping.",
 },
 {
 id: "q13",
 type: MC,
 question: "Для дверей ParkGate правильний Constraint з 2.2 - це:",
 options: [
 "HingeConstraint",
 "BallSocket",
 "Spring лише",
 "Prismatic вертикальний"
 ],
 correctAnswer: 0,
 explanation: "Двері лишаються на Hinge.",
 },
 {
 id: "q14",
 type: MC,
 question: "Рекомендований Save:",
 options: [
 "Untitled Experience",
 "Module 9 Remotes",
 "Lesson 2.3 - ParkRides_v1",
 "Lesson 1.1 - House_01"
 ],
 correctAnswer: 2,
 explanation: "Явний артефакт 2.3.",
 },
 {
 id: "q15",
 type: MC,
 question: "Наступний урок World craft:",
 options: [
 "Таблиці й DataStore",
 "Здача парку (Toolbox hygiene, playtest → Park_v1)",
 "RemoteEvent гонки",
 "Checkpoint M1"
 ],
 correctAnswer: 1,
 explanation: "2.4 - фінальна здача M2.",
 }
 ],
 },
}

export const ukLesson24 = {
 lessonId: "lesson-roblox-2-4",
 moduleId: "module-02",
 order: 4,
 title: "2.4 - Здача парку",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати Park_v1 з штабу, воріт і атракціонів у одну здавану локацію",
 "Обережно користуватись Toolbox і перевіряти Free Model перед вставкою",
 "Відрізнити MeshPart від Decal і знати, коли що доречніше",
 "Пройти фінальний playtest маршрутом гостя World craft",
 "Здати checkpoint Модуля 2 без нових механік з M3+"
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - здати парк",
 content: `Це **контрольна точка** Модуля 2, а не нова гілка фізики. Ти не відкриваєш Spring «з нуля» і не вчиш \`Touched\` - ти **доводиш до показу** те, що вже зібрав у 2.1–2.3, плюс акуратна робота з Toolbox і фінальний лад у світі.

За три уроки World craft ти зібрав штаб, вхід і рухомі атракціони. Сьогодні питання одне: **чи виглядає це як парк, який можна показати людині за дві хвилини?** Якщо ні - не добудовуй п’ятий Constraint. Прибери хаос, перевір двері, почисти чужі скрипти.

**Рекомендована назва:** \`Module 2 - Park_v1\`  
(робоча копія може називатись \`Lesson 2.4 - Park_v1\` - перед здачею зроби фінальний Save As з назвою модуля.)

**Що вже має бути в світі:**
| Урок | Шукай у Place |
|------|----------------|
| **2.1** | \`IslandHQ_v1\` з PrimaryPart і audit |
| **2.2** | \`ParkGate\` - Weld, Hinge, Rope/Rod |
| **2.3** | \`ParkRides_v1\` - Spring, Prismatic, BallSocket |
| **M1** | будинок, острів, Party Mode (якщо лишив) |

Якщо чогось бракує - **віднови вже відомим прийомом** з попередніх уроків. Не маскуй відсутній ліфт готовою каруселлю з Toolbox «на двісті скриптів».

Відкрий найповніший Place після 2.3. Studio й чекліст тримай поруч.`,
 },
 {
 title: "Рубрика Park_v1 - що дивиться викладач",
 content: `За дві-три хвилини дивляться не «чи вау», а **чи зібрано модуль**.

**Структура**
- [ ] Окремі Model: штаб, ворота, атракціони (не одна каша без імен у корені)
- [ ] PrimaryPart на ключових Model
- [ ] Імена PascalCase, без купи \`Part\` / \`Part1\`

**Рух і фізика (уже вмієш)**
- [ ] Двері на Hinge справді крутяться
- [ ] Є Weld на статичній деталі воріт
- [ ] Є Rope або Rod
- [ ] У зоні атракціонів є Spring, Prismatic і BallSocket
- [ ] Play не розлітається від першого кроку

**Гігієна**
- [ ] Якщо є Free Model - пройдений аудит скриптів
- [ ] Output без чужого спаму
- [ ] Save з назвою, яку знайдеш через місяць

| Рівень | Опис |
|--------|------|
| Зараховано | Рубрика + робочий шлях гість → ворота → атракціони |
| Добре | Чистий Explorer, спокійна фізика, 0–1 обережний об’єкт з Toolbox |
| Відмінно | Короткий показ напарнику 30–60 с + скрін або запис |

**Зроби зараз (6 хв):** розстав галочки в нотатках. Усе червоне виправляй лише прийомами з 2.1–2.3 і M1 - без нових жанрів.`,
 },
 {
 title: "Toolbox - друг, якщо не їсти все підряд",
 content: `**Toolbox** у Studio - бібліотека моделей, звуків і плагінів від спільноти та Roblox. Звідти зручно взяти дерево, лавку чи ліхтар. Звідти ж у Place найчастіше приповзає **чужий Script**: спамить у Output, телепортує гравців, тягне підозрілі сервіси або просто ламає твій світ.

Стався до Toolbox як до ятки на ярмарку: можна купити одну річ, але не варто змітати прилавок у рюкзак із заплющеними очима.

**Правила гігієни на сьогодні:**
1. Бери моделі з нормальним прев’ю і зрозумілою назвою - не перший-ліпший «FREE ADMIN».
2. Вставляй **спочатку** в окремий Folder \`Toolbox_Inbox\`, а не в серце \`ParkRides_v1\`.
3. Одразу розгорни модель у Explorer і знайди всі **Script** / **LocalScript** / **ModuleScript**.
4. Якщо код чужий і незрозумілий - **видали скрипти** й лиши лише вигляд (Parts / MeshPart / Decal), або прибери модель цілком.
5. На здачу - **нуль або дві** обережні декорації з Toolbox. Парк має лишитись **твоїм**: ворота й атракціони зібрані руками.

Toolbox **не замінює** Hinge і Spring з 2.2–2.3. Якщо атракціон «не виходить», повертайся до Attachments і Anchored - не качай готову карусель.

**Зроби зараз (5 хв):** відкрий Toolbox і знайди одну спокійну декорацію (лава, кущ, ліхтар). Ще не вставляй у фінальний парк - спочатку прочитай секцію про аудит.`,
 },
 {
 title: "Аудит Scripts у Free Model",
 content: `Перш ніж чужа модель стане частиною \`Park_v1\`, зроби коротку перевірку. Це не параноя - це звичка, яка рятує години.

**Руками в Explorer:**
1. Розгорни модель. Шукай об’єкти класу Script, LocalScript, ModuleScript.
2. Відкрий підозрілий скрипт: чи є незрозумілий \`require\`, довгі зашифровані рядки, телепорти, \`HttpService\`, обіцянки «адмінки»?
3. Для лавки чи куща тобі майже ніколи не потрібен чужий код. **Видали скрипти**, лиши вигляд - або прибери модель.

**Швидкий огляд з коду** (тимчасовий Script у Inbox; після перевірки можна видалити):

local inbox = workspace:FindFirstChild("Toolbox_Inbox")
if not inbox then
	print("Немає Toolbox_Inbox - створи Folder і поклади Free Model туди")
	return
end

print("=== Toolbox script audit ===")
local function scan(parent)
	for _, child in ipairs(parent:GetChildren()) do
		if child:IsA("Script") or child:IsA("LocalScript") or child:IsA("ModuleScript") then
			print("ЗНАЙДЕНО", child.ClassName, child:GetFullName())
		end
		scan(child)
	end
end
scan(inbox)

Якщо Output щось знайшов - відкрий і розберись або видали. \`ModuleScript\` теж рахуй: навіть «тихий» модуль може тягнути зайву логіку.

Ти вже використовував \`IsA\` і обхід дітей у 2.2–2.3. Сьогодні той самий інструмент - але для безпеки, не для підрахунку пружин.

Важливо: розпізнати LocalScript / ModuleScript у чужій моделі ≠ писати їх самому. Писати LocalScript ти навчишся пізніше в Модулі 3. Сьогодні вміння просте - **побачив чужий скрипт у декорі → прибрав**.

**Зроби зараз (8 хв):** одна тестова модель у \`Toolbox_Inbox\`, audit, чистка, і лише тоді рішення - лишати в парку чи ні.`,
 },
 {
 title: "MeshPart проти Decal - що коли",
 content: `У парку легко змішати два різні способи «зробити гарніше». Вони не вороги - просто про різне.

| Інструмент | Що це насправді | Коли доречно |
|------------|-----------------|--------------|
| **Decal** / **Texture** | Картинка на грані Part (ти вже робив у **1.5**) | Вивіска, постер, логотип на козирку |
| **MeshPart** | Part зі складною 3D-формою | Фігурна лава, статуя, огорожа з Toolbox |

**Типові плутанини:**
- Наклеїти Decal на все підряд і називати це «моделлю» - ні, це наклейка на кубі.
- Вставити MeshPart з Toolbox разом із скриптами «в комплекті» - спочатку гігієна, потім краса.
- Замінити весь \`ParkGate\` одними мережевими воротами - тоді зникає сенс уроку про Constraints.

**Правило здачі простими словами:** свої ворота й атракціони - це твої Parts і Constraints. MeshPart і Decal - прикраси навколо, і лише після перевірки на скрипти.

На peer-demo вмій сказати одне речення: «Decal - малюнок на грані, MeshPart - готова форма в просторі».

**Зроби зараз (5 хв):** або Decal на козирок/табличку, або один чистий MeshPart без Scripts. Обидва не обов’язкові - важливіше розуміти різницю.`,
 },
 {
 title: "Порядок у Explorer перед фіналом",
 content: `Перед здачею Explorer має читатися як зміст зошита, а не як шухляда після ремонту.

Запропонована карта (підлаштуй під себе, але не тримай усе в корені Workspace):

Workspace
  House_01
  IslandHQ_v1
  ParkGate
  ParkRides_v1
  Interactives        ← куби / Party Mode з M1
  Decor
  Sounds
  Toolbox_Inbox       ← тимчасово; перед здачею порожній або розкладений декор
Terrain
Lighting

Швидка перевірка:
- аудити (\`HQ_Audit\`, \`Gate_Audit\`, \`Rides_Audit\`) лежать у своїх Model - \`script.Parent\` не зламаний
- немає дублікатів на кшталт \`ParkGate (2)\`
- тестові куби з експериментів або видалені, або лежать у \`Decor\`
- \`Toolbox_Inbox\` перед фіналом краще спорожнити: прийнятий декор перенеси в \`Decor\`

Десять хвилин прибирання зараз цінніші за ще один «вау»-атракціон, який ламає маршрут гостя.

**Зроби зараз (7 хв):** наведи лад за картою. Якщо сумніваєшся, чи потрібна Part - сховай у Decor або видали.`,
 },
 {
 title: "Фінальний playtest маршрутом гостя",
 content: `Пройди **один** спокійний маршрут не як творець із вільною камерою, а як гравець:

1. Старт біля будинку чи штабу - чи зрозуміло, куди йти далі?
2. \`IslandHQ_v1\` - чи виглядає як місце, а не як випадкова купа кубів?
3. Підхід до \`ParkGate\` - штовхни двері плечем; козирок лишився на місці?
4. Зона \`ParkRides_v1\` - пружина, ліфт і маятник по черзі, без вічного застрягання.
5. Output - чи немає червоного спаму й чужих повідомлень після Toolbox?
6. Чи Character не клинить між стійкою і платформою?

Якщо щось розвалюється - вертайся до Anchored, Attachments і Stiffness з 2.2–2.3. Якщо «нудно» - це не привід тягнути Free Model з адмін-скриптом. Досить підкрутити декор, вивіску чи Decal.

Засічи час: повний круг за **60–90 секунд** - хороший каркас для peer-demo.

**Зроби зараз (8 хв):** один повний круг і список максимум із трьох фіксів. Виправ лише їх - не починай новий парк з нуля.`,
 },
 {
 title: "Що можна підкрутити, а що вже заборонено вигадувати",
 content: `Checkpoint любить **чесність межі**. Можна зробити світ приємнішим - не можна перетворити здачу на інший модуль.

| Можна | Не сьогодні |
|-------|-------------|
| Підкрутити Stiffness, щілини, імена, Decal | \`Touched\` kill / монети (M3) |
| Один-два чисті декоративні Free Model | Карусель із купою чужих Scripts |
| Легкий фікс CanCollide / груп колізій | Новий жанр: obby на двадцять kill-блоків |
| Повторити audit Constraints | DataStore, RemoteEvent, UI магазину |
| Залишити Party Mode з M1 | Переписувати парк на LocalScript «бо так у відео» |

Якщо свербить «накинути ще вау», спитай себе: це покращує **маршрут гостя** чи лише маскує дірку в рубриці? Спочатку двері й стабільна пружина - потім прикраси.

Ця здача перевіряє саме **World craft**: Model, Constraints, порядок, гігієна Toolbox. Не Obby, не Simulator, не мережу.`,
 },
 {
 title: "Фінальний Script-чек парку (опційно, але корисно)",
 content: `Якщо боїшся, що перед здачею випадково зніс Model Ungroup’ом, зроби короткий «контроль трьох китів». Script \`Park_v1_Audit\` у Workspace або в Folder \`Audits\`:

local function hasModel(name)
	local m = workspace:FindFirstChild(name)
	if m and m:IsA("Model") then
		print("OK", name, "PrimaryPart=", m.PrimaryPart and m.PrimaryPart.Name or "НЕМАЄ")
		return true
	end
	print("НЕМАЄ Model", name)
	return false
end

print("=== Park_v1 checkpoint ===")
hasModel("IslandHQ_v1")
hasModel("ParkGate")
hasModel("ParkRides_v1")

Детальні аудити Constraints уже були в 2.1–2.3. Тут лише відповідь на питання: **чи три головні Model ще на місці?**

Якщо бачиш НЕМАЄ - шукай перейменування, вкладеність у інший Folder або випадковий Ungroup. Не пиши новий атракціон, доки не знайдеш старий.

**Зроби зараз (4 хв):** Play → три рядки OK. Потім можеш видалити цей Script або лишити в \`Audits\`.`,
 },
 {
 title: "Save, назва портфоліо, peer-demo",
 content: `1. **File → Save to Roblox** (або Save As) → \`Module 2 - Park_v1\`.
2. Переконайся, що зберігаєш **той** Place, де є і ворота, і атракціони - не стару копію лише зі штабом.
3. **Показ напарнику (30–60 с):** коротко проведи маршрутом. Можна сказати майже так: «Ось штаб, ось двері на петлі, далі три атракціони; з Toolbox лише декор без чужих скриптів».
4. Якщо просять доказ у LMS - скрін Explorer із трьома Model і скрін Play біля воріт.

Не покладайся на Autosave як на єдиний артефакт. Через місяць «той файл, де щось було» вже не знайдеш.

Якщо викладач просить назву саме \`Lesson 2.4 - Park_v1\` - збережи так, але тримай також копію з назвою модуля для портфоліо.`,
 },
 {
 title: "Типові дірки саме на checkpoint M2",
 content: `Ось де найчастіше сиплються бали на здачі:

- Атракціони є, а двері стоять Anchored і не крутяться - рубрика воріт не пройдена.
- Усе звалено в один Model без імен - викладач не знаходить артефакти за хвилину.
- Free Model «зробив парк за мене» плюс п’ятнадцять Scripts - гігієна провалена.
- Підкрутили лише Decal, а Prismatic досі викидає гравця - playtest не зараховано.
- Файл збережено як \`Untitled\` - у портфоліо це діра.
- З’явились kill-блоки «щоб було цікавіше» - це вже інший модуль, не World craft.

Перед фінальним Save випиши **одну** найслабшу галочку рубрики і виправ лише її. Краще один міцний фікс, ніж п’ять нових дірок.

**Зроби зараз (3 хв):** назви вголос свою найслабшу галочку. Потім виправ.

**Погляд у Модуль 3:** там з’являться ClickDetector, ProximityPrompt, \`Touched\`, цикли, LocalScript. Сьогодні **не забігай наперед** - закрий World craft чесно. Підсумок: ти вмієш зібрати місце, яке **тримається купи** і **рухається по правилах Constraints**. Далі навчиш його **відповідати на дії гравця** кодом.`,
 }
 ],
 },
 practice: {
 title: "Практика: здача Park_v1",
 duration: 30,
 description: `**Мета:** checkpoint World craft - рубрика, гігієна Toolbox, playtest, Save.

Відкрий найповніший Place після 2.3.`,
 parts: [
 {
 title: "Part A - Разом (10 хв)",
 content: `1. Пройдіть рубрику Park_v1 вголос.
2. Разом відкрийте Toolbox → одна тестова модель у \`Toolbox_Inbox\`.
3. Проженіть script-audit; видаліть чужі Scripts.
4. Вирішіть: лишаєте декор чи прибираєте.

**Критерій:** усі розуміють правило «спочатку аудит, потім краса».`,
 },
 {
 title: "Part B - Самостійно (12 хв)",
 content: `1. Добий червоні галочки рубрики (двері / пружина / імена / PrimaryPart).
2. Наведи Explorer за картою модуля.
3. Повний маршрут гостя 60–90 с.
4. \`Park_v1_Audit\` або ручна перевірка трьох Model.
5. Save: \`Module 2 - Park_v1\`.

**Критерій:** викладач за 2 хвилини знаходить штаб, ворота, атракціони й проходить двері.`,
 },
 {
 title: "Part C - Челендж / demo (8 хв)",
 content: `Обери один:
- peer-demo 30–60 с напарнику;
- один MeshPart **або** Decal після аудиту + пояснення різниці одним реченням;
- порожній \`Toolbox_Inbox\` перед здачею (весь декор розкладений по \`Decor\`).

**Не роби:** нову kill-зону, DataStore, завантаження «повного парку» з Toolbox замість своїх Constraints.`,
 }
 ],
 },
 commonMistakes: [
 {
 mistake: "Вставив Free Model і одразу Group у атракціони без перевірки Scripts",
 fix: "Спочатку Toolbox_Inbox + audit + видалення Scripts. Потім уже перенос у Decor.",
 },
 {
 mistake: "Замінив ParkGate готовими воротами з мережі",
 fix: "Навчальний артефакт - твої Hinge/Weld. Чуже - лише декор навколо.",
 },
 {
 mistake: "Плутає Decal і MeshPart",
 fix: "Decal - наклейка на грані; MeshPart - 3D-форма. На здачі скажи різницю вголос.",
 },
 {
 mistake: "Save під Untitled / старою назвою 2.1",
 fix: "Save As Module 2 - Park_v1. Перевір, що у файлі є і ворота, і атракціони.",
 },
 {
 mistake: "Додає Touched kill «для вау»",
 fix: "Це не World craft checkpoint. Залиш фізику парку; kill - у пізніших модулях.",
 },
 {
 mistake: "Атракціони є, але двері Anchored",
 fix: "Рубрика воріт обов’язкова. Стулка Unanchored + Hinge, як у 2.2.",
 },
 {
 mistake: "Output повний чужого спаму після Toolbox",
 fix: "Знайди і видали Scripts Free Model. Повторі audit.",
 }
 ],
 quiz: {
 title: "Тест 2.4 - Здача парку",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Урок 2.4 за роллю в модулі - це:",
 options: [
 "Нова тема Spring з нуля",
 "Старт DataStore",
 "Checkpoint здачі Park_v1 + гігієна Toolbox",
 "Повний obby на 10 біомів"
 ],
 correctAnswer: 2,
 explanation: "Checkpoint World craft, не новий жанр.",
 },
 {
 id: "q2",
 type: MC,
 question: "Які три Model мають бути в рубриці M2?",
 options: [
 "IslandHQ_v1, ParkGate, ParkRides_v1",
 "Only House_01",
 "Лише Free Model з Toolbox",
 "Lighting, SoundService, Teams"
 ],
 correctAnswer: 0,
 explanation: "Штаб, ворота, атракціони.",
 },
 {
 id: "q3",
 type: MC,
 question: "Навіщо Folder Toolbox_Inbox?",
 options: [
 "Щоб швидше публікувати гру",
 "Щоб ізолювати Free Model до аудиту Scripts",
 "Щоб вимкнути Terrain",
 "Щоб замінити PrimaryPart"
 ],
 correctAnswer: 1,
 explanation: "Карантин перед вставкою в парк.",
 },
 {
 id: "q4",
 type: MC,
 question: "Що робити з незрозумілими Scripts у Free Model?",
 options: [
 "Залишити обов’язково",
 "Перейменувати в Part",
 "Перенести в Lighting",
 "Видалити (для декору код майже не потрібен) або прибрати модель"
 ],
 correctAnswer: 3,
 explanation: "Гігієна важливіша за чужий код.",
 },
 {
 id: "q5",
 type: MC,
 question: "Decal - це переважно:",
 options: [
 "Повноцінна 3D-модель з меша",
 "Тип Constraint",
 "Зображення на грані Part",
 "Сервіс збереження даних"
 ],
 correctAnswer: 2,
 explanation: "Наклейка; порівняй з 1.5.",
 },
 {
 id: "q6",
 type: MC,
 question: "MeshPart - це:",
 options: [
 "Part зі складною 3D-формою (меш)",
 "Лише звук у SoundService",
 "Синонім WeldConstraint",
 "Обов’язковий kill-блок"
 ],
 correctAnswer: 0,
 explanation: "Форма, не наклейка.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чи може Toolbox замінити навчальні Constraints воріт?",
 options: [
 "Так, завжди краще",
 "Ні - ворота й атракціони мають лишитись твоїми артефактами",
 "Так, якщо назва FREE",
 "Так, якщо є Neon"
 ],
 correctAnswer: 1,
 explanation: "Free Model - декор, не заміна модуля.",
 },
 {
 id: "q8",
 type: MC,
 question: "Який Save найкращий для портфоліо M2?",
 options: [
 "Untitled Experience",
 "Lesson 9.4 Remotes",
 "Baseplate",
 "Module 2 - Park_v1"
 ],
 correctAnswer: 3,
 explanation: "Явна назва модуля.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що з цього ЗАБОРОНЕНО вигадувати на 2.4?",
 options: [
 "DataStore сейв монет",
 "Підкрутити Damping пружини",
 "Додати Decal на вивіску",
 "Прибрати дублікат Part"
 ],
 correctAnswer: 0,
 explanation: "Нові системи M4+ не тема checkpoint.",
 },
 {
 id: "q10",
 type: MC,
 question: "Навіщо playtest маршрутом гостя?",
 options: [
 "Щоб заповнити Atmosphere",
 "Щоб видалити Terrain",
 "Щоб перевірити читабельність і стабільність парку як гравець",
 "Щоб створити RemoteEvent"
 ],
 correctAnswer: 2,
 explanation: "Користувацький шлях, не вигляд з камери творця.",
 },
 {
 id: "q11",
 type: MC,
 question: "Якщо audit друкує Script у Inbox, перший крок:",
 options: [
 "Опублікувати Place",
 "Відкрити/оцінити або видалити Script",
 "Увімкнути Party Mode",
 "Зробити Union з Baseplate"
 ],
 correctAnswer: 1,
 explanation: "Спочатку розібратись із кодом.",
 },
 {
 id: "q12",
 type: MC,
 question: "Peer-demo на здачі M2 найкраще показує:",
 options: [
 "Лише меню Toolbox",
 "Повний код DataStore",
 "Порожній Baseplate",
 "Двері + хоча б один атракціон за 30–60 с"
 ],
 correctAnswer: 3,
 explanation: "Короткий живий доказ рубрики.",
 },
 {
 id: "q13",
 type: MC,
 question: "ModuleScript у Free Model:",
 options: [
 "Завжди безпечний і можна ігнорувати",
 "Це тип Terrain",
 "Теж варто помітити в аудиті - може тягнути логіку",
 "Замінює PrimaryPart"
 ],
 correctAnswer: 2,
 explanation: "Аудит усіх видів скриптів.",
 },
 {
 id: "q14",
 type: MC,
 question: "Який симптом провалює гігієну Toolbox?",
 options: [
 "Вставлена модель одразу сипле помилки/спам у Output",
 "Один кущ без Scripts",
 "Decal на табличці",
 "PascalCase імена опор"
 ],
 correctAnswer: 0,
 explanation: "Чужий код без аудиту.",
 },
 {
 id: "q15",
 type: MC,
 question: "Після M2 логічно починається:",
 options: [
 "Одразу Publish на Showcase без коду",
 "Модуль 3 - код, що грається (Prompt, Touched, цикли…)",
 "Лише Terrain назавжди",
 "M12 Реліз без проміжних модулів"
 ],
 correctAnswer: 1,
 explanation: "Спіраль курсу: далі інтерактивний код.",
 }
 ],
 },
}
