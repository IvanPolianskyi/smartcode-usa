/** Rich UK content for Roblox Module 03 - Код, що грається */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson31 = {
 lessonId: "lesson-roblox-3-1",
 moduleId: "module-03",
 order: 1,
 title: "3.1 - Взаємодія",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Порівняти ClickDetector і ProximityPrompt і обрати доречний тригер",
 "Додати BillboardGui як підказку над об’єктом взаємодії",
 "Зробити двері/хвіртку з станом відкрито/зачинено через if",
 "Підключити серверний Script без LocalScript і без Touched",
 "Здати InteractDoor_v1 на базі Park_v1 або острова",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - світ відповідає на дію",
 content: `Модуль **«Код, що грається»** починається з простого питання: гравець підійшов і щось зробив - що відповідає світ?

У Модулі 1 ти вже клікав куб і кнопку вечірки через **ClickDetector**. Тоді це була швидка кнопка «зроби ефект». Сьогодні взаємодію збираємо **як систему**: два способи запуску, підказка в повітрі, зрозумілий стан «відкрито / зачинено».

Після World craft у тебе є парк і двері на фізичній петлі. Тут інший навик - **логічна** реакція на намір гравця. Не обов’язково штовхати плечем: можна підійти, прочитати підказку й натиснути E.

**Артефакт:** Model \`InteractDoor_v1\`
- стулка або хвіртка біля парку / штабу
- **ClickDetector** або **ProximityPrompt** (корисно зрозуміти обидва; у здачі достатньо одного стабільного шляху + короткий дослід другого)
- **BillboardGui** з текстом на кшталт «Відкрити» / «Зачинити»
- Script зі змінною \`isOpen\` і \`if/else\`
- Save: \`Lesson 3.1 - InteractDoor_v1\`

**Старт:** \`Module 2 - Park_v1\` (або Living Island). Не починай порожній Baseplate - двері мають жити в уже знайомому місці, інакше важко відчути «взаємодію в грі».

**Що ще не сьогодні:** \`Touched\` і kill-блоки (**3.2**), таймер і рахунок на екрані (**3.3**), \`while true\` (**3.4**), повний урок functions (**3.6**), LocalScript у StarterGui (**3.7**).

**Зроби зараз (2 хв):** відкрий Place після попереднього уроку і підготуй робочу зону для артефакту цього заняття.`,
 },
 {
 title: "Два способи сказати «я взаємодію»",
 content: `| Інструмент | Як гравець запускає | Відчуття | Зручно для |
|------------|---------------------|----------|------------|
| **ClickDetector** | Клік мишею по Part | «Натиснув на об’єкт» | Кнопки, важелі, куби з M1 |
| **ProximityPrompt** | Підійти + клавіша (зазвичай E) | «Взаємодія як у сучасних іграх» | Двері, скрині, пізніше NPC |

Обидва живуть на **Part**. Слухає їх звичайний **Script** на сервері - той самий тип, що в MagicCube і Party Mode.

**Не плутай із Hinge з 2.2.** Hinge - фізична петля: штовхнув плечем - крутиться. Сьогодні інший жанр: *логічні* двері. Натиснув взаємодію → скрипт сам змінює Orientation, Position або Transparency. Поєднати з Hinge можна пізніше; на 3.1 достатньо логічного відкриття.

Коротке правило вибору:
- хочеш «кнопку на стіні» → ClickDetector
- хочеш «підійди до дверей» → ProximityPrompt

**Зроби зараз (3 хв):** у нотатках одним рядком напиши, коли обрав би клік, а коли підхід + E.`,
 },
 {
 title: "Каркас InteractDoor_v1",
 content: `1. Біля \`ParkGate\` або штабу постав:
   - \`DoorFrame\` - Anchored (коробка отвору)
   - \`DoorLeaf\` - стулка (поки Anchored; рухатимемо з коду, не обов’язково через Constraint)
2. Group у Model \`InteractDoor_v1\`, PrimaryPart = \`DoorFrame\`.
3. Імена PascalCase. Script не клади в Terrain і не в Lighting.

Зачинена стулка має перекривати прохід. Відкрита - залишати щілину (поворот приблизно на 90° або зсув убік). Обери один спосіб і тримайся його до кінця уроку.

Якщо вже є фізичні двері на Hinge з 2.2 - не ламай їх. Постав **окрему** навчальну хвіртку для логіки 3.1 поруч або в іншій арці. Так легше порівнювати «штовхнув» і «натиснув E».

**Зроби зараз (8 хв):** каркас + Group + PrimaryPart. Play без скрипта: Character має впиратися в зачинену стулку.`,
 },
 {
 title: "ClickDetector - повторення з силою",
 content: `Ти вже бачив ClickDetector у 1.4 і 1.7. Сьогодні збираємо його не «на око», а за ритуалом, який легко перевірити.

1. Виділи \`DoorLeaf\` або окрему кнопку \`DoorButton\` поруч зі стіною.
2. Insert Object → **ClickDetector**.
3. У Properties глянь **MaxActivationDistance**: замале значення - і здається, що «код не працює», хоча справа в дистанції.
4. Script постав на ту Part, де детектор (або в Model, але тоді шукай детектор через \`FindFirstChild\`).

Мінімальний каркас події:

\`\`\`lua
local door = script.Parent
local click = door:FindFirstChild("ClickDetector")
if not click then
	warn("Немає ClickDetector на", door.Name)
	return
end

click.MouseClick:Connect(function(player)
	print(player.Name, "клікнув двері")
end)
\`\`\`

\`player\` - хто клікнув. Спершу достатньо \`print\`; стан дверей додаси наступними кроками.

Якщо клікаєш і Output мовчить, перевір по черзі: чи запущено Play, чи клікаєш саме ту Part з детектором, чи MaxActivationDistance не мізерний, чи це звичайний Script, а не LocalScript.

Курсор у Play має змінюватись над клікабельною Part - якщо ні, Studio часто натякає, що детектора «не чути».

**Зроби зараз (6 хв):** ClickDetector + рядок у Output по кліку.`,
 },
 {
 title: "ProximityPrompt - підійти й натиснути E",
 content: `ProximityPrompt - сучасніший жест: не цілитись курсором у маленьку кнопку, а підійти й підтвердити клавішею.

1. На \`DoorLeaf\` або на \`DoorFrame\` → Insert **ProximityPrompt**.
2. Properties, які варто торкнути одразу:
   - **ActionText** - «Відкрити»
   - **ObjectText** - «Хвіртка»
   - **HoldDuration** - 0 для миттєвого натиску (або близько 0.3, якщо хочеш коротке утримання)
   - **MaxActivationDistance** - щоб спрацьовувало біля дверей, а не з іншого кінця острова
3. Подія в коді: \`ProximityPrompt.Triggered\`

\`\`\`lua
local part = script.Parent
local prompt = part:FindFirstChildOfClass("ProximityPrompt")
if not prompt then
	warn("Немає ProximityPrompt")
	return
end

prompt.Triggered:Connect(function(player)
	print(player.Name, "використав Prompt")
end)
\`\`\`

\`FindFirstChildOfClass\` шукає першого нащадка потрібного класу - зручно, коли ім’я ще стандартне «ProximityPrompt».

**Click чи Prompt для дверей?** Для хвіртки частіше природніший Prompt: підійшов → E. Click добре зручний для кнопки на стіні. На здачі покажи, що розумієш різницю, навіть якщо в артефакті лишив один робочий шлях.

**Не вішай обидва тригери на ту саму дію без потреби.** Подвійне відкриття від одного наміру плутає тестера. Або один тригер на стулці, або Click-кнопка окремо від Prompt.

У Play підказка Prompt з’являється, коли Character у зоні. Якщо E не видно - ти далеко, Prompt на іншій Part, або MaxActivationDistance замалий.

**Зроби зараз (7 хв):** ProximityPrompt + рядок у Output після E.`,
 },
 {
 title: "BillboardGui - підказка над дверима",
 content: `**BillboardGui** - підказка, що висить у світі над Part і повертається до камери. Це не екранний HUD з уроку 3.7: сьогодні **без** StarterGui і **без** LocalScript.

Навіщо вона, якщо є ActionText у Prompt? Бо Billboard видно здалеку й пояснює двері навіть тому, хто ще не в зоні E. Для ClickDetector Billboard взагалі часто єдиний «напис на об’єкті».

1. Виділи \`DoorLeaf\` або окрему Part \`DoorHintAnchor\` над дверима.
2. Insert → **BillboardGui**.
3. Усередині → **TextLabel**.
4. BillboardGui Properties:
   - **Size** - наприклад \`{0, 120},{0, 40}\` у пікселях (або scale за смаком)
   - **StudsOffset** - підніми текст над стулкою, щоб він не тонув у меші
   - **AlwaysOnTop** - true зручно для навчання; у «дорослих» іграх часто false, щоб підказка не світилась крізь стіни
5. TextLabel: «Натисни E» або «Клікни, щоб відкрити»; увімкни TextScaled, зроби контрастний колір.

Пам’ятай: Billboard **сам двері не відкриває**. Він лише говорить. Логіку лишай у Script на Click або Prompt.

**Зроби зараз (6 хв):** Billboard + TextLabel. У Play підійди здалеку - чи читається напис без здогадок?`,
 },
 {
 title: "Стан відкрито / зачинено через if",
 content: `Прапорець стану - та сама ідея, що \`partyOn\` у вечірці з 1.7. Без нього двері вміють лише «зробити щось раз», а не жити двома режимами.

\`\`\`lua
local door = script.Parent
local prompt = door:FindFirstChildOfClass("ProximityPrompt")
local billboard = door:FindFirstChildOfClass("BillboardGui")
local label = billboard and billboard:FindFirstChildOfClass("TextLabel")

local isOpen = false
local closedAngle = door.Orientation
local openAngle = closedAngle + Vector3.new(0, 90, 0)

local function updateHint()
	if label then
		label.Text = isOpen and "Зачинити" or "Відкрити"
	end
	if prompt then
		prompt.ActionText = isOpen and "Зачинити" or "Відкрити"
	end
end

updateHint()

local function toggleDoor()
	isOpen = not isOpen
	if isOpen then
		door.Orientation = openAngle
	else
		door.Orientation = closedAngle
	end
	updateHint()
	print("Двері відкриті?", isOpen)
end

if prompt then
	prompt.Triggered:Connect(function()
		toggleDoor()
	end)
end
\`\`\`

Що тут опирається на вже відоме:
- \`isOpen\` - boolean
- \`if/else\` - гілки стану з 1.4
- \`local function\` - маленький іменований блок, щоб не копипастити оновлення підказки; **глибокий** урок functions буде в **3.6**

Підказка й ActionText мають говорити правду: якщо двері відкриті, наступна дія - «Зачинити». Інакше гравець клікає навмання.

Якщо після повороту стулка «не там» - підбери вісь під свою орієнтацію (часто Y, але не завжди). Інколи простіше зсувати \`Position\` або використати прийом з Transparency з наступної секції.

**Зроби зараз (10 хв):** toggle туди-назад + живий текст підказки.`,
 },
 {
 title: "ClickDetector-варіант того самого toggle",
 content: `Якщо лишаєш кнопку на стіні, логіка та сама - інший лише тригер і, за бажанням, інший візуальний прийом відкриття.

\`\`\`lua
local button = script.Parent
local door = button.Parent:FindFirstChild("DoorLeaf")
local click = button:FindFirstChild("ClickDetector")

local isOpen = false

if click and door then
	click.MouseClick:Connect(function()
		isOpen = not isOpen
		if isOpen then
			door.Transparency = 0.8
			door.CanCollide = false
		else
			door.Transparency = 0
			door.CanCollide = true
		end
		print("Відкрито?", isOpen)
	end)
end
\`\`\`

Тут «відкрито» = стулка напівпрозора й без колізії. Для навчання це часто спокійніше, ніж крутити Orientation і ловити криву вісь. Для здачі обери **один** спосіб (поворот *або* прозорість) і не мішай обидва хаотично на одних дверях.

Script на кнопці: \`script.Parent\` - кнопка; \`DoorLeaf\` шукай у батьківській Model. Якщо кнопка випадково лежить у корені Workspace - \`button.Parent:FindFirstChild\` не знайде стулку: поверни кнопку всередину \`InteractDoor_v1\`.

**Зроби зараз (5 хв):** доведи до стабільного toggle або Prompt-версію, або Click-версію.`,
 },
 {
 title: "Типові поломки взаємодії",
 content: `| Симптом | Ймовірна причина | Що зробити |
|---------|------------------|------------|
| Клік не спрацьовує | Немає ClickDetector / малий MaxActivationDistance | Перевір Properties і Part |
| E не з’являється | Prompt на іншій Part / гравець далеко | Перенеси Prompt, збільш дистанцію |
| Код є, Output мовчить | LocalScript у Workspace або не натиснуто Play | Звичайний Script + Play |
| Двері відкрились і все | Немає toggle, лише один напрямок | \`isOpen = not isOpen\` |
| Підказка невидима | Billboard у меші / нульовий Size | StudsOffset угору, Size більший |
| Відкривається двічі за раз | І Click, і Prompt на ту саму дію | Лиши один тригер |

Не лагодь двері через \`Touched\` - це наступний урок. Не тягни готові двері з Toolbox із чужими скриптами: гігієна з 2.4 нікуди не ділась.

Якщо сумніваєшся між «зламався Prompt» і «зламався код» - спочатку поверни \`print\` на подію. Немає рядка в Output → проблема до логіки дверей. Є рядок, а стулка не рухається → дивись Orientation / CanCollide.

**Зроби зараз (3 хв):** пройди таблицю проти свого артефакту.`,
 },
 {
 title: "Play-тест і Save",
 content: `**Чекліст FunctionsKit_v1:**
- [ ] Є щонайменше одна осмислена \`local function\` з параметром
- [ ] Kill (або spawn) викликає її, а не дублює старе тіло поруч «на всяк випадок»
- [ ] debounce / стан зовні, якщо має переживати виклики
- [ ] return використано хоча б у одному місці (значення або ранній вихід)
- [ ] Play: смерть / спавн працюють не гірше, ніж до рефактору
- [ ] Немає глобального function без local (для цього уроку)
- [ ] Save: \`Lesson 3.6 - FunctionsKit_v1\`

На здачі поясни трьома короткими фразами: параметр = вхід; return = вихід; scope = де видно змінну.

Перед Save прибери мертвий закоментований копипаст на пів файла - викладач читає живий код, не археологію.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Межа уроку",
 content: `| Не сьогодні | Коли | Чому чекати |
|-------------|------|-------------|
| ModuleScript + require Config | **M4** | Спочатку local function в одному Script |
| LocalScript GUI кнопки / win UI | **3.7** | Інший тип Script і інша панель |
| Повна інтеграція міні-гри | **3.8** | Спочатку чистий рефактор |
| ООП / метатаблиці | далеко за M3 | Не потрібно для kill/spawn |

Сьогоднішня перемога - **рефактор без зміни геймплею на гірше**. Красиве ім’я function не рятує, якщо гравець більше не вмирає на лаві або траса перестала з’являтись.

Якщо лишився час - зроби бонус spawnPad. Якщо ні - достатньо міцного killCharacter і чесного Play-тесту.

**Зроби зараз (2 хв):** прибери з маршруту здачі все, що виходить за межі цього уроку.`,
 },
 {
 title: "Погляд у 3.2",
 content: `Далі світ реагуватиме на **дотик**: \`Touched\`, Humanoid, debounce, \`task.wait\`, KillBrick. Двері з 3.1 можуть лишитись біля входу в небезпечну зону - але логіку смерті пиши вже новим уроком, не змішуй усе в один Script сьогодні.

**Зроби зараз (2 хв):** допиши в Note один рядок, що переносиш у наступний урок.`,
 },
 ],
 },
 practice: {
 title: "Практика: InteractDoor_v1",
 duration: 30,
 description: `**Мета:** двері з підказкою й станом відкрито/зачинено через Click або Prompt.

Відкрий Park_v1 або острів після M2.`,
 parts: [
 {
 title: "Part A - Разом (10 хв)",
 content: `1. Зберіть \`DoorFrame\` + \`DoorLeaf\` → Model \`InteractDoor_v1\`.
2. Додайте ProximityPrompt і Billboard з TextLabel.
3. Разом напишіть \`print\` на \`Triggered\`.
4. Play: підійдіть, натисніть E, побачте Output.

**Критерій:** підказка видна, Prompt спрацьовує.

**Зроби зараз (3 хв):** підійди до Prompt у Play і підтверди Triggered один раз.`,
 },
 {
 title: "Part B - Самостійно (12 хв)",
 content: `1. Додай \`isOpen\` і toggle (поворот *або* Transparency/CanCollide).
2. Оновлюй текст підказки / ActionText.
3. За бажанням зроби окрему Click-кнопку - але не дублюй ту саму дію без потреби.
4. Пройди маршрут відкрити → пройти → зачинити.
5. Save \`Lesson 3.1 - InteractDoor_v1\`.

**Критерій:** стан перемикається в обидва боки без LocalScript і без Touched.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Part C - Челендж (8 хв)",
 content: `Обери один:
- другі двері з іншим тригером (якщо перші на Prompt - другі на Click);
- Billboard AlwaysOnTop false і підкрути StudsOffset, щоб підказка лишилась читабельною;
- \`HoldDuration = 0.4\` на Prompt і коротке пояснення в чаті курсу, навіщо утримання.

**Не роби:** KillBrick, \`while true\`, ScreenGui у StarterGui, Free Model дверей із чужим кодом.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "LocalScript у Workspace для дверей",
 fix: "Для цієї взаємодії став звичайний Script. LocalScript у світі часто просто мовчить.",
 },
 {
 mistake: "Немає ClickDetector / Prompt, а Connect уже написаний",
 fix: "Insert об’єкт на Part. Код не створює детектор сам, якщо ти його не створюєш у рядках.",
 },
 {
 mistake: "Двері відкриваються лише один раз",
 fix: "Зроби прапорець isOpen і not isOpen; у if/else обидві гілки.",
 },
 {
 mistake: "І Click, і Prompt відкривають одні двері двічі",
 fix: "Залиш один тригер на одну дію або розділи ролі (кнопка vs стулка).",
 },
 {
 mistake: "Billboard не видно",
 fix: "Підніми StudsOffset, збільш Size, перевір що TextLabel не порожній і контрастний.",
 },
 {
 mistake: "Шукає Touched у цьому уроці",
 fix: "Дотик - урок 3.2. Сьогодні клік або Prompt.",
 },
 {
 mistake: "CanCollide лишився false після «зачинити»",
 fix: "У гілці зачинено повертай CanCollide true (якщо використовуєш прозорий прийом).",
 },
 ],
 quiz: {
 title: "Тест 3.1 - Взаємодія",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Артефакт уроку 3.1 - це:",
 options: [
          "InteractDoor_v1 з підказкою і станом відкрито/зачинено",
          "KillBrick з Touched",
          "leaderstats монет",
          "DataStore сейв",
        ],
 correctAnswer: 0,
 explanation: "Взаємодія дверей, не симулятор і не kill.",
 },
 {
 id: "q2",
 type: MC,
 question: "ProximityPrompt зазвичай запускається:",
 options: [
          "Лише з меню Toolbox",
          "Коли гравець підходить і натискає клавішу взаємодії",
          "Автоматично кожну секунду без гравця",
          "Лише в Terrain Editor",
        ],
 correctAnswer: 1,
 explanation: "Підхід + E (типово).",
 },
 {
 id: "q3",
 type: MC,
 question: "ClickDetector ти вже зустрічав у:",
 options: [
          "M4 DataStore",
          "Лише в M12",
          "M1 (куб логіки / Party Mode)",
          "Ніколи",
        ],
 correctAnswer: 2,
 explanation: "Спіраль: клік був у Модулі 1.",
 },
 {
 id: "q4",
 type: MC,
 question: "BillboardGui у цьому уроці - це:",
 options: [
          "Обов’язковий ScreenGui у StarterGui",
          "Тип Constraint",
          "Сервіс збереження",
          "Підказка в світі над Part",
        ],
 correctAnswer: 3,
 explanation: "Світова підказка, не повний HUD урок 3.7.",
 },
 {
 id: "q5",
 type: MC,
 question: "Навіщо змінна isOpen?",
 options: [
          "Щоб увімкнути Atmosphere",
          "Щоб пам’ятати стан дверей і перемикати if/else",
          "Щоб замінити PrimaryPart",
          "Щоб створити MeshPart",
        ],
 correctAnswer: 1,
 explanation: "Прапорець стану, як partyOn.",
 },
 {
 id: "q6",
 type: MC,
 question: "Який Script потрібен для Prompt на дверях у Workspace?",
 options: [
          "LocalScript обов’язково",
          "ModuleScript у ReplicatedStorage обов’язково",
          "Звичайний Script",
          "Script у Lighting only",
        ],
 correctAnswer: 2,
 explanation: "Серверний Script, як у M1–M2.",
 },
 {
 id: "q7",
 type: MC,
 question: "Подія ProximityPrompt, яку ми слухаємо:",
 options: [
          "Triggered",
          "Touched",
          "Heartbeat",
          "RenderStepped",
        ],
 correctAnswer: 0,
 explanation: "Triggered після взаємодії.",
 },
 {
 id: "q8",
 type: MC,
 question: "MaxActivationDistance впливає на:",
 options: [
          "Яскравість Neon",
          "Розмір острова",
          "Швидкість Hinge",
          "З якої відстані спрацьовує клік або Prompt",
        ],
 correctAnswer: 3,
 explanation: "Дистанція активації.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що з цього НЕ тема 3.1?",
 options: [
          "BillboardGui",
          "ProximityPrompt",
          "Touched KillBrick",
          "if відкрито/зачинено",
        ],
 correctAnswer: 2,
 explanation: "Kill/Touched - 3.2.",
 },
 {
 id: "q10",
 type: MC,
 question: "Оновити ActionText після відкриття варто, щоб:",
 options: [
          "Видалити Terrain",
          "Гравець бачив наступну дію («Зачинити»)",
          "Увімкнути DataStore",
          "Зламати Hinge",
        ],
 correctAnswer: 1,
 explanation: "Підказка відповідає стану.",
 },
 {
 id: "q11",
 type: MC,
 question: "Transparency + CanCollide false як «відкрито» - це:",
 options: [
          "Єдиний дозволений спосіб у Roblox",
          "Заборонений завжди",
          "Те саме, що Union",
          "Допустимий навчальний прийом замість повороту стулки",
        ],
 correctAnswer: 3,
 explanation: "Альтернатива Orientation.",
 },
 {
 id: "q12",
 type: MC,
 question: "Чому погано вішати Click і Prompt на ту саму дію без потреби?",
 options: [
          "Легко отримати подвійне спрацювання й плутанину",
          "Studio вибухне",
          "Зникне Billboard",
          "Вимкнеться Snap",
        ],
 correctAnswer: 0,
 explanation: "Один намір - один тригер.",
 },
 {
 id: "q13",
 type: MC,
 question: "local function updateHint() у цьому уроці - це:",
 options: [
          "Повний модуль M4",
          "Заміна Model",
          "Легке групування коду; глибокі functions - у 3.6",
          "Обов’язковий RemoteEvent",
        ],
 correctAnswer: 2,
 explanation: "Спіраль: легкий function зараз, урок functions пізніше.",
 },
 {
 id: "q14",
 type: MC,
 question: "Рекомендований Save:",
 options: [
          "Untitled",
          "Module 6 Simulator Final",
          "Obby Kill Only",
          "Lesson 3.1 - InteractDoor_v1",
        ],
 correctAnswer: 3,
 explanation: "Явний артефакт 3.1.",
 },
 {
 id: "q15",
 type: MC,
 question: "Наступний урок M3:",
 options: [
          "DataStore",
          "Touched + KillBrick",
          "Publish Showcase",
          "Tables insert/remove",
        ],
 correctAnswer: 1,
 explanation: "3.2 - дотик і небезпека.",
 },
 ],
 },
}

export const ukLesson32 = {
 lessonId: "lesson-roblox-3-2",
 moduleId: "module-03",
 order: 2,
 title: "3.2 - Touched + KillBrick",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Підписатись на Touched і відрізнити дотик гравця від дотику іншої Part",
 "Знайти Humanoid у Character і безпечно змінити Health",
 "Додати debounce, щоб одна небезпека не спамила смерть десятки разів",
 "Використати task.wait для короткої паузи в обробнику",
 "Здати KillLane_v1 з чесними неоновими небезпеками біля InteractDoor",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - світ реагує на дотик",
 content: `У 3.1 двері відповідали на **намір** гравця (клік або E). Сьогодні світ відповідає на **контакт**: нога ступила на небезпечну плиту - і щось має статись.

Це інший тип геймплею. Двері ти відкриваєш свідомо. Лаву часто наступаєш випадково - саме тому код має бути і суворим, і стриманим: убивати гравця, але не спамити подію на кожен міліметр пальця.

**Артефакт:** зона \`KillLane_v1\`
- Folder або Model із **3+** неоновими небезпечними Parts (\`Kill_01\`…)
- у кожної - Script із \`Touched\`, перевіркою Humanoid, \`debounce\`, коротким \`task.wait\`
- небезпеки **виглядають** небезпечно (Neon, яскравий колір) - чесний дизайн
- Save: \`Lesson 3.2 - KillLane_v1\`

**Старт:** Place після 3.1. Постав смугу **за** \`InteractDoor_v1\` або біля входу в парк, щоб маршрут читався: відкрив двері → далі обережна зона. Так модуль «Код, що грається» нарощується на твоєму вже існуючому світі, а не на порожньому Baseplate.

**Що не сьогодні:** чекпоінти й таймер (**3.3**), \`while true\` платформи (**3.4**), рефактор у functions (**3.6**), екранний GUI (**3.7**). Смерть через Health - так; окремий екран «You Died» - ні.

**Зроби зараз (2 хв):** відкрий Place після попереднього уроку і підготуй робочу зону для артефакту цього заняття.`,
 },
 {
 title: "Touched простими словами",
 content: `**Touched** - подія Part: «мене щось торкнулось». У параметр \`hit\` приходить та Part, яка торкнулась. У персонажа це часто ступня, торс або \`HumanoidRootPart\`.

Порівняй із уже відомим:

| | Click / Prompt (3.1) | Touched (сьогодні) |
|--|----------------------|--------------------|
| Намір гравця | Свідомий | Часто випадковий |
| Типовий use | Двері, кнопки | Лава, монети, тригери зони |
| Ризик | Майже немає спаму | Легко спрацьовує **багато разів** підряд |

Саме тому з’являться **debounce** і пауза. Без них одна секунда стояння на плиті перетворює Output на водоспад рядків, а смерть - на миготливу кашу.

Touched не «кращий» за Prompt і не «гірший». Це просто інший датчик. Двері лишай на Prompt/Click; небезпеку під ногами - на Touched. Якщо повісиш kill на ті самі двері через Touched, гравець помре, ледь торкнувшись ручки - зазвичай це поганий UX.

CanTouch на Part (згадка з 2.3) має лишатись увімкненим на kill-плиті, інакше події дотику можуть не приходити так, як ти очікуєш. Для навчальних плит не вимикай CanTouch «про всяк випадок».

**Зроби зараз (2 хв):** у нотатках одним рядком: Touched = контакт; Prompt = намір.`,
 },
 {
 title: "Чесна небезпека очима",
 content: `Гравець має **побачити** ризик раніше, ніж померти. Інакше це не геймдизайн, а підлість.

1. Створи Folder або Model \`KillLane_v1\`.
2. Додай 3+ Parts: \`Kill_01\`, \`Kill_02\`, \`Kill_03\`.
3. Material **Neon**, колір Really red або яскраво-помаранчевий.
4. Anchored true, CanCollide true - на плитах стоять і ковзають.
5. Зроби різні розміри й щілини для стрибка. Три однакові квадрати «для галочки» виглядають ліниво й гірше вчать око читати рівень.

**Нечесно:** невидима тонка смужка, сіра Part як звичайна підлога, небезпека під декором без сигналу. Правило чесності з парку (M2) тут те саме: гість має розуміти світ без пояснень викладача.

Розмісти смугу так, щоб новачок міг **перестрибнути** або обійти. Тупик «єдиний прохід = миттєва смерть без читання» дратує сильніше за складність. Навіть у жорстких obby небезпеку зазвичай підсвічують.

Композиція з 3.1: якщо двері ведуть просто в стіну з лавою впритул до Spawn - гравець злиться ще до того, як оцінить твій код. Лиши півкроку повітря після дверей.

**Зроби зараз (8 хв):** три помітні неонові небезпеки, видно з дверей 3.1.`,
 },
 {
 title: "Перший Touched - лише print",
 content: `Спочатку без смерті. Так ти побачиш правду про подію очима, а не через «чому мене вбило сто разів».

Script у \`Kill_01\`:

\`\`\`lua
local part = script.Parent

part.Touched:Connect(function(hit)
	print("Торкнулось:", hit.Name, "батько:", hit.Parent and hit.Parent.Name)
end)
\`\`\`

Запусти Play і постій по плиті. У Output посиплються рядки - інколи багато за один крок. Це не «поломка Studio». Це сирий Touched показує, навіщо далі debounce.

Імена на кшталт \`LeftFoot\` чи \`HumanoidRootPart\` - Parts персонажа. Батько (\`hit.Parent\`) зазвичай і є Character (Model). Іноді підряд прилітають кілька Parts одного тіла - ступня, потім ще щось. Саме тому «один крок» ≠ «один рядок у Output».

Не поспішай одразу ставити Health = 0. П’ять хвилин із \`print\` заощаджують пів години на «містичних» багах і вчать читати подію.

Якщо рядків немає взагалі - перевір Play, чи Script у тій Part, чи не LocalScript, чи ти точно стоїш на \`Kill_01\`, а не на сусідній підлозі.

**Зроби зараз (5 хв):** тільки print. Порахуй на око, скільки рядків дає один повільний крок.`,
 },
 {
 title: "Знайти Humanoid - чіпаємо лише гравця",
 content: `Не кожен дотик = гравець. Плита може торкнутись іншої Part, декора чи навіть маятника з парку, якщо він гойднувся близько.

Ланцюжок пошуку:
1. \`hit\` - Part, що торкнулась
2. \`hit.Parent\` - зазвичай Character (Model)
3. У Character шукаємо **Humanoid**

\`\`\`lua
local part = script.Parent

part.Touched:Connect(function(hit)
	local character = hit.Parent
	if not character then
		return
	end

	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if humanoid then
		print("Є Humanoid у", character.Name)
	end
end)
\`\`\`

\`FindFirstChildOfClass("Humanoid")\` - той самий прийом пошуку за класом, що й для ProximityPrompt у 3.1. Ти вже звик шукати об’єкт не лише за ім’ям, а за типом - це корисно в усьому курсі.

Якщо Humanoid немає - роби \`return\` і мовчи. Так ти не намагаєшся «вбити» випадковий куб і не засорюєш логіку. У складніших іграх цей самий фільтр відсіює сміття перед видачею монет, відкриттям дверей зоною тощо.

Іноді Character лежить глибше (рідкісні нестандартні збірки аватара). Для курсу Baseplate / стандартний R15/R6 достатньо схеми hit → Parent → Humanoid. Якщо Humanoid раптом не знаходиться на стандартному аватар - скажи викладачу; не вигадуй одразу складний обхід усього дерева.

**Зроби зараз (6 хв):** print лише коли Humanoid знайдено.`,
 },
 {
 title: "KillBrick - Health = 0",
 content: `Коли Humanoid уже в руках, класичний навчальний прийом небезпечної плити:

\`\`\`lua
local part = script.Parent

part.Touched:Connect(function(hit)
	local character = hit.Parent
	if not character then
		return
	end

	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if humanoid then
		humanoid.Health = 0
	end
end)
\`\`\`

Персонаж помирає, і Roblox піднімає стандартний респавн. Якщо у світі є SpawnLocation - з’явишся там. Тонке налаштування точок відновлення й чекпоінтів - тема **3.3**, не сьогодні.

Чому саме Health = 0, а не Destroy Character? Бо так ти йдеш стандартним шляхом движка: анімація смерті, респавн, менше сюрпризів. Destroy інколи залишають на пізніші експерименти, коли вже розумієш наслідки.

Не став Health = 0 «на всяк випадок» без перевірки Humanoid. Спочатку фільтр - потім дія. Це правило знадобиться й для збору предметів у пізніших модулях: спочатку переконайся, що торкнувся саме гравець.

Перевір сусідню звичайну підлогу: вона не повинна вбивати. Якщо вбиває - Script випадково потрапив не на ту Part або ти зробив kill з усієї підлоги рівня.

Після першої смерті не панікуй, якщо респавн «далекий»: для цього уроку головне, що kill спрацював один раз логічно, а не сто разів підряд.

**Зроби зараз (5 хв):** смерть на одній плиті. Поруч безпечна підлога жива.`,
 },
 {
 title: "Debounce - щоб смерть не строчила чергою",
 content: `**Debounce** - захист від зайвих повторів. Прапорець каже: «зараз уже обробляю дотик; наступні сигнали ігнорую, доки не мине коротка пауза».

Без нього Roblox може надіслати Touched знову й знову, поки ступня ковзає по поверхні. Ти бачив це на етапі з \`print\`. Тепер те саме сталося б зі смертю - тільки гірше для тесту й для нервів.

За ідеєю прапорець схожий на \`isOpen\` чи \`partyOn\`: boolean пам’ятає стан. Тут стан - не «відкрито», а «занято на мить».

\`\`\`lua
local part = script.Parent
local debounce = false

part.Touched:Connect(function(hit)
	if debounce then
		return
	end

	local character = hit.Parent
	if not character then
		return
	end

	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if not humanoid then
		return
	end

	debounce = true
	humanoid.Health = 0
	task.wait(1)
	debounce = false
end)
\`\`\`

Порядок важливий - не переставляй навмання:
1. Якщо вже debounce - вийди
2. Перевір Character і Humanoid
3. Постав \`debounce = true\`
4. Зроби дію (смерть)
5. \`task.wait(...)\`
6. Поверни \`debounce = false\`

Типові самостріли:
- \`debounce = true\` назавжди на старті скрипта → плита мовчить після першого тесту
- забули крок 1 → знову спам
- wait поставили до перевірки Humanoid → зайві паузи навіть на сміттєвих дотиках

**Зроби зараз (8 хв):** debounce на \`Kill_01\`. Порівняй спокій Output із версією «лише print».`,
 },
 {
 title: "task.wait - пауза без while-уроку",
 content: `\`task.wait(1)\` означає: «почекай близько секунди, потім продовж цей обробник».

Сьогодні wait потрібен **усередині** обробника Touched, щоб утримати debounce. Це ще не урок про \`while true do\` і вічні платформи - він у **3.4**. Не обгортай kill у вічний цикл «про всяк випадок»: Touched і так викликається сам, коли є дотик.

У старих туторіалах часто пишуть просто \`wait(1)\`. У сучасному Luau краще \`task.wait\` - звикай одразу, щоб потім не переучуватись.

Для debounce смерті зазвичай вистачає 0.5–1.5 с. Занадто довга пауза - плита довго «мовчить», коли ти вже хочеш знову швидко тестувати. Занадто коротка - знову ризик зайвих повторів під час ковзання.

Важливо: \`task.wait\` у цьому місці не «робить платформу», не крутить атракціон і не замінює таймер рівня з 3.3. Він лише тримає прапорець debounce. Якщо хочеться складнішої логіки часу на екрані - зачекай наступного уроку.

**Зроби зараз (2 хв):** постав 1 с, потім спробуй 0.5 с і відчуй різницю під час тестів.`,
 },
 {
 title: "Один шаблон на всі плити",
 content: `Скопіюй робочий Script на \`Kill_02\` і \`Kill_03\`. Так, це повторення. Для 3.2 воно чесне й корисне: руками відчуваєш, що шаблон повторюваний.

Пізніше курс прибере копипаст свідомо: у **3.5** швидше розмножуватимеш об’єкти, у **3.6** збереш спільну function для kill. Якщо зараз побіжиш писати «універсальний менеджер усіх небезпек у Workspace», легко вискочити за межі уроку й змішати половину модуля наперед.

Міні-чеклист на плиту:
- Neon + помітний колір
- Touched → Humanoid → Health
- debounce + task.wait
- у фіналі без водоспаду \`print\` (один діагностичний рядок на здачу - ок)
- плита не стоїть на Spawn

Після копипасту обов’язково протестуй **кожну** плиту, не лише першу. Класика: на другій забули Script, на третій забули debounce.

**Зроби зараз (6 хв):** усі 3+ плити вбивають із захистом від повторів.`,
 },
 {
 title: "Play-тест і безпека маршруту",
 content: `1. Відкрий двері 3.1, якщо вони на шляху.
2. Свідомо наступи на \`Kill_01\` - смерть і респавн.
3. Стрибни через щілину або обійди - виживання має бути можливим.
4. Output не повинен сипати сотнями рядків на один крок.
5. Звичайна підлога поруч не вбиває.
6. Плити не стоять прямо на точці появи - інакше вічний респавн у лаву.

Якщо після смерті з’являєшся знову в небезпеці - зсунь SpawnLocation або саму смугу. Глибока система чекпоінтів прийде в 3.3; сьогодні достатньо не зробити старт світу тортурами.

Маршрут гостя має читатись за хвилину: двері → видно неонову небезпеку → можна вмерти або пройти. Попроси напарника пройти мовчки: якщо він одразу розуміє, де ризик, дизайн спрацював.

На здачі викладач часто дивиться дві речі: чи є debounce (немає спаму) і чи небезпека чесна візуально. Код без Neon «сірої смерті» можуть попросити переробити навіть якщо Health = 0 працює.

**Save:** \`Lesson 3.2 - KillLane_v1\`.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Межа уроку",
 content: `| Не сьогодні | Коли |
|-------------|------|
| SpawnLocation як система чекпоінтів, таймер, TextLabel HUD | **3.3** |
| \`while true\` рухомі платформи | **3.4** |
| function killPlayer(humanoid) на весь світ | **3.6** |
| LocalScript GUI «You Died» | **3.7** |
| DataStore смертей | M4+ |

Сьогоднішня перемога - **контрольований Touched**, не цілий obby-жанр.

**Зроби зараз (2 хв):** прибери з маршруту здачі все, що виходить за межі цього уроку.`,
 },
 {
 title: "Погляд у 3.3",
 content: `У **3.3** з’являться чекпоінти й таймер: SpawnLocation / точка відновлення, секундомір, простий TextLabel за шаблоном. Тоді \`KillLane_v1\` стане чеснішою для гравця: помер - повернувся ближче до прогресу, а не завжди на край світу.

Сьогодні не будуй складну систему респавну й не малюй повний HUD. Достатньо стабільних неонових плит із debounce і маршруту «двері → небезпека».

Якщо лишиш \`InteractDoor_v1\` перед смугою - у 3.3 цей ланцюжок легко перетворити на короткий challenge з часом. Тож не знось двері й плити перед наступним уроком: зроби Save As копію 3.3, коли дойде час.

**Зроби зараз (2 хв):** допиши в Note один рядок, що переносиш у наступний урок.`,
 },
 ],
 },
 practice: {
 title: "Практика: KillLane_v1",
 duration: 30,
 description: `**Мета:** неонова смуга небезпек із Touched, Humanoid, debounce і task.wait.

Відкрий Place після 3.1.`,
 parts: [
 {
 title: "Part A - Разом (10 хв)",
 content: `1. Зберіть \`Kill_01\` (Neon).
2. Разом: Touched → лише print.
3. Додайте перевірку Humanoid.
4. Покажіть спам у Output без debounce.

**Критерій:** усі бачать, навіщо захист від повторів.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Part B - Самостійно (12 хв)",
 content: `1. Health = 0 + debounce + task.wait.
2. Ще 2+ плити з тим самим шаблоном.
3. Чесний вигляд і можливість обійти/перестрибнути.
4. Маршрут від дверей 3.1.
5. Save \`Lesson 3.2 - KillLane_v1\`.

**Критерій:** смерть спрацьовує, Output не сходить з розуму, безпечна підлога поруч жива.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Part C - Челендж (8 хв)",
 content: `Обери один:
- різна форма плит (тонка смуга / квадрат / «лава» ширша) при тому ж коді;
- \`print\` лише перший дотик після debounce (для здачі), потім прибери;
- коротка табличка Billboard «НЕБЕЗПЕКА» над смугою (навичка 3.1), без нового GUI-екрану.

**Не роби:** while-платформи, DataStore, екран «You Died», невидимі kill-зони.

**Зроби зараз (4 хв):** зроби save/load або чесно задокументуй mock-режим у Output.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Немає перевірки Humanoid",
 fix: "Спочатку FindFirstChildOfClass(\"Humanoid\"). Інакше чіпаєш не гравця.",
 },
 {
 mistake: "Немає debounce - Output і смерть спамлять",
 fix: "Прапорець debounce + task.wait після дії.",
 },
 {
 mistake: "debounce = true на початку скрипта назавжди",
 fix: "Став true лише всередині обробника на час паузи, потім false.",
 },
 {
 mistake: "Kill на точці появи",
 fix: "Відсунь плити від Spawn. Інакше вічний цикл смерті ще до гри.",
 },
 {
 mistake: "Сіра непомітна небезпека",
 fix: "Neon + яскравий колір. Чесний дизайн обов’язковий.",
 },
 {
 mistake: "Пише while true навколо Touched",
 fix: "Не потрібно. Touched уже подія. while - урок 3.4.",
 },
 {
 mistake: "LocalScript на Kill Part",
 fix: "Звичайний Script у Workspace, як для дверей і кубів.",
 },
 ],
 quiz: {
 title: "Тест 3.2 - Touched + KillBrick",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Артефакт уроку 3.2 - це:",
 options: [
          "KillLane_v1 з неоновими плитами на Touched",
          "InteractDoor без змін",
          "Повний GUI таймера",
          "DataStore",
        ],
 correctAnswer: 0,
 explanation: "Смуга небезпек, не HUD і не сейв.",
 },
 {
 id: "q2",
 type: MC,
 question: "Подія Touched означає:",
 options: [
          "Гравець натиснув E",
          "Щось торкнулось Part",
          "Змінився ClockTime",
          "Збереглась гра",
        ],
 correctAnswer: 1,
 explanation: "Контакт з Part.",
 },
 {
 id: "q3",
 type: MC,
 question: "Параметр hit у Touched - це зазвичай:",
 options: [
          "Lighting",
          "SoundService",
          "Part, яка торкнулась",
          "ModuleScript",
        ],
 correctAnswer: 2,
 explanation: "Часто деталь Character.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо шукати Humanoid?",
 options: [
          "Щоб змінити Material підлоги",
          "Щоб створити Terrain",
          "Щоб відкрити Toolbox",
          "Щоб зрозуміти, що торкнувся персонаж, і керувати Health",
        ],
 correctAnswer: 3,
 explanation: "Фільтр гравця/NPC.",
 },
 {
 id: "q5",
 type: MC,
 question: "humanoid.Health = 0 у навчанні KillBrick:",
 options: [
          "Змінює колір неба",
          "Вбиває персонажа (стандартна смерть)",
          "Зберігає DataStore",
          "Вмикає Hinge",
        ],
 correctAnswer: 1,
 explanation: "Класичний kill.",
 },
 {
 id: "q6",
 type: MC,
 question: "Debounce потрібен, бо Touched:",
 options: [
          "Ніколи не спрацьовує двічі",
          "Працює лише в Studio без Play",
          "Може спрацювати багато разів за короткий час",
          "Замінює Anchored",
        ],
 correctAnswer: 2,
 explanation: "Антиспам обробника.",
 },
 {
 id: "q7",
 type: MC,
 question: "task.wait(1) у цьому уроці найчастіше стоїть:",
 options: [
          "Щоб утримати debounce паузу після дії",
          "Щоб вічно крутити while-платформу",
          "Щоб завантажити RemoteEvent",
          "Щоб намалювати Decal",
        ],
 correctAnswer: 0,
 explanation: "Пауза в обробнику, не урок while.",
 },
 {
 id: "q8",
 type: MC,
 question: "Якщо Humanoid не знайдено, краще:",
 options: [
          "Все одно ставити Health = 0",
          "Видалити Baseplate",
          "Увімкнути Party Mode",
          "return і нічого не робити",
        ],
 correctAnswer: 3,
 explanation: "Не чіпай випадкові Parts.",
 },
 {
 id: "q9",
 type: MC,
 question: "Чесний KillBrick виглядає:",
 options: [
          "Як звичайна сіра підлога без сигналу",
          "Повністю прозоро завжди",
          "Неоново і помітно небезпечно",
          "Лише в ServerStorage",
        ],
 correctAnswer: 2,
 explanation: "Гравець має бачити ризик.",
 },
 {
 id: "q10",
 type: MC,
 question: "Що з цього НЕ тема 3.2?",
 options: [
          "debounce",
          "while true платформи",
          "Touched",
          "Humanoid.Health",
        ],
 correctAnswer: 1,
 explanation: "while - 3.4.",
 },
 {
 id: "q11",
 type: MC,
 question: "ClickDetector відрізняється від Touched тим, що:",
 options: [
          "Touched завжди безпечніший",
          "Touched існує лише в Terrain",
          "Click потребує DataStore",
          "Click - свідомий намір, Touched - контакт (часто випадковий)",
        ],
 correctAnswer: 3,
 explanation: "Намір vs контакт.",
 },
 {
 id: "q12",
 type: MC,
 question: "Який Script став на Kill Part?",
 options: [
          "Звичайний Script",
          "LocalScript у StarterGui обов’язково",
          "Лише ModuleScript",
          "Script у Lighting only",
        ],
 correctAnswer: 0,
 explanation: "Серверний Script у світі.",
 },
 {
 id: "q13",
 type: MC,
 question: "Копипаст скрипта на 3 плити в 3.2:",
 options: [
          "Заборонений назавжди",
          "Замінює PrimaryPart",
          "Допустимий; прибрати повтори допоможе урок functions (3.6)",
          "Автоматично створює чекпоінти",
        ],
 correctAnswer: 2,
 explanation: "Спіраль рефакторингу.",
 },
 {
 id: "q14",
 type: MC,
 question: "Рекомендований Save:",
 options: [
          "Untitled",
          "Module 9 Remotes",
          "Lesson 1.1 House",
          "Lesson 3.2 - KillLane_v1",
        ],
 correctAnswer: 3,
 explanation: "Явний артефакт.",
 },
 {
 id: "q15",
 type: MC,
 question: "Наступний урок:",
 options: [
          "Tables DataStore",
          "Чекпоінти + таймер",
          "Publish Showcase",
          "BallSocket only",
        ],
 correctAnswer: 1,
 explanation: "3.3 - респавн і час.",
 },
 ],
 },
}

export const ukLesson33 = {
 lessonId: "lesson-roblox-3-3",
 moduleId: "module-03",
 order: 3,
 title: "3.3 - Чекпоінти + таймер",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Розставити SpawnLocation як старт і проміжні чекпоінти",
 "Змінювати RespawnLocation гравця після дотику до чекпоінта",
 "Зібрати секундомір із легким циклом оновлення",
 "Показати час на TextLabel за шаблоном GUI",
 "Здати CheckpointRun_v1 разом із KillLane без нечесного респавну в лаву",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - помер і не починай з нуля",
 content: `У 3.2 ти навчив світ убивати. Без чекпоінтів це швидко стає знущанням: кожна помилка - повернення на край карти. Сьогодні додаємо **пам’ять прогресу в межах забігу** і **секундомір**.

Це логічний наступний крок модуля «Код, що грається»: спочатку взаємодія, потім небезпека, тепер - справедливий респавн і відчуття часу. Не будуємо ще цілий obby-жанр (він у M5). Збираємо цеглинки, з яких потім складеться міні-гра на бос-здачі 3.8.

**Артефакт:** \`CheckpointRun_v1\`
- старт \`Spawn_Start\` (SpawnLocation)
- 2+ чекпоінти \`Checkpoint_A\`, \`Checkpoint_B\`
- після дотику гравець респавниться ближче до прогресу (\`RespawnLocation\`)
- секундомір на екрані (TextLabel у простому ScreenGui)
- Save: \`Lesson 3.3 - CheckpointRun_v1\`

**Старт:** Place після 3.2. Не знось \`KillLane_v1\` і двері 3.1 - саме вони показують, навіщо чекпоінт існує. Якщо Place загубився - віднови мінімальну неонову смугу з 3.2, інакше нема на чому перевіряти респавн.

**Спіраль:** Touched, Humanoid і debounce уже вмієш. Нове - SpawnLocation / RespawnLocation і шаблон GUI для часу. Повний LocalScript+GUI - **3.7**; глибокий \`while\` для платформ - **3.4**. Сьогодні легкий цикл лише для секундоміра, обов’язково з wait усередині.

**Зроби зараз (2 хв):** відкрий Place після попереднього уроку і підготуй робочу зону для артефакту цього заняття.`,
 },
 {
 title: "SpawnLocation - точка появи",
 content: `**SpawnLocation** - спеціальна Part, з якої Roblox з’являє гравця після входу в Place або після смерті (якщо не задано інакше).

1. Insert → **SpawnLocation** (найпростіше з меню, а не «перетворити Block вручну»).
2. Постав на безпечну землю **перед** kill-смугою. Ім’я: \`Spawn_Start\`.
3. Anchored true. Неоновий kill не став упритул до точки появи - у 3.2 ти вже бачив, який це кошмар для тесту.
4. Properties: **Duration** (короткий захист після появи), Neutral для курсу зазвичай підходить.

У світі може бути кілька SpawnLocation. Без твого коду рушій обирає за своїми правилами. Тому для навчання ми **явно** керуємо \`player.RespawnLocation\`: «після смерті з’являйся ось тут».

Не плутай SpawnLocation із звичайною Part, навіть зеленою й з Decal «START». Для RespawnLocation потрібен саме об’єкт класу SpawnLocation. Декор може стояти поруч - але присвоєння йде на Spawn.

Якщо в Place вже був старий Spawn з шаблону Baseplate - або використай його як \`Spawn_Start\` (перейменуй), або прибери зайві, щоб не плутатись під час тестів.

**Зроби зараз (5 хв):** \`Spawn_Start\` на безпечній зоні. Play → смерть на kill (або Reset) → переконайся, що не з’являєшся всередині лави.`,
 },
 {
 title: "Чекпоінт = новий дім після смерті",
 content: `Ідея проста: торкнувся прапорця чи плити чекпоінта - гра запам’ятала, **звідки** тебе відроджувати далі. Це і є справедливість після KillLane.

Типовий навчальний каркас:
- видима Part \`Checkpoint_A\` (зелений / бірюзовий, не як kill)
- поруч або всередині - SpawnLocation \`Spawn_A\` (можна майже прозорий, CanCollide false, щоб не заважав стрибку)
- Script на Part-тригері: Touched → знайти гравця → \`player.RespawnLocation = spawnA\`

Як отримати Player з дотику:

\`\`\`lua
local players = game:GetService("Players")
local player = players:GetPlayerFromCharacter(character)
if player then
	player.RespawnLocation = spawnA
end
\`\`\`

\`GetPlayerFromCharacter\` - міст від Character до Player. У 3.2 тобі вистачало Humanoid, щоб змінити Health. Щоб змінити точку респавну, потрібен саме Player: RespawnLocation - його властивість.

Не плутай ролі: прапор/плита - **тригер** («мене торкнулись»). SpawnLocation - **дім** («сюди повертайся»). Можна візуально з’єднати їх близько, але в Explorer хай імена будуть різними й зрозумілими.

**Зроби зараз (8 хв):** \`Checkpoint_A\` + \`Spawn_A\` після першої третини kill-смуги. Спочатку можна лише print «чекпоінт узято».`,
 },
 {
 title: "Повний шаблон чекпоінта з debounce",
 content: `Збираємо гігієну Touched з 3.2 і нову дію. Це той самий каркас «фільтр → дія → пауза», лише дія інша: не Health, а RespawnLocation.

\`\`\`lua
local checkpoint = script.Parent
local spawnA = workspace:FindFirstChild("Spawn_A")
local players = game:GetService("Players")
local debounce = false

checkpoint.Touched:Connect(function(hit)
	if debounce then
		return
	end

	local character = hit.Parent
	if not character then
		return
	end

	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if not humanoid then
		return
	end

	local player = players:GetPlayerFromCharacter(character)
	if not player or not spawnA or not spawnA:IsA("SpawnLocation") then
		return
	end

	debounce = true
	player.RespawnLocation = spawnA
	print(player.Name, "чекпоінт A")
	task.wait(1)
	debounce = false
end)
\`\`\`

Зверни увагу на \`spawnA:IsA("SpawnLocation")\`: якщо під цим ім’ям випадково звичайний Block, краще нічого не присвоювати, ніж зловити дивний респавн.

\`game:GetService("Players")\` - стандартний спосіб дістати сервіс гравців. Ти вже бачив сервіси опосередковано (Workspace як світ); тут сервіс потрібен явно.

Перевірка здачі: пройди чекпоінт → навмисно вмри на kill → з’явись біля A, не на старті. Без цього тесту «код ніби є» не рахується. Викладач майже завжди просить саме смерть-тест, а не лише print.

Якщо знову старт - перевір ім’я \`Spawn_A\`, клас об’єкта, чи спрацював print, чи Script на тій Part, по якій ідеш, чи не стоїш випадково на іншій плиті.

**Зроби зараз (10 хв):** робочий чекпоінт A з тестом «смерть після нього».`,
 },
 {
 title: "Другий чекпоінт і читабельність траси",
 content: `Додай \`Checkpoint_B\` / \`Spawn_B\` далі по маршруту. Код той самий (поки копипаст - ок; прибрати повтори допоможе 3.6).

Дизайн траси:
- чекпоінти **не** маскуються під kill (інший колір; можна Billboard «Чекпоінт» з 3.1)
- між A і B є сенс ризику (шматок KillLane), інакше другий чекпоінт нічого не доводить
- не став чекпоінт і його Spawn усередині лави
- після взяття B смерть має повертати вже до B, а не до A

Перевіряй саме це «перебиття» RespawnLocation: взяв A → вмер → біля A; далі взяв B → вмер → біля B. Якщо після B знову A - ти або не оновив присвоєння, або тестиш не той Script.

Звичка з World craft: тримай старт і чекпоінти в Folder/Model \`CheckpointRun_v1\`, щоб Explorer не перетворився на звалище імен \`SpawnLocation\` без номерів.

**Зроби зараз (7 хв):** другий чекпоінт + короткий playtest A і B окремо смертю.`,
 },
 {
 title: "Секундомір - навіщо він у міні-грі",
 content: `Таймер перетворює «просто пройшов» на **забіг**: скільки часу ти вже в спробі. Навіть без таблиці рекордів з’являється напруга й бажання пройти чистіше - менше смертей, впевненіший маршрут.

Сьогодні робимо секундомір від старту Play (або від появи GUI). Фінішний тригер із збереженням рекорду в DataStore - не тема цього уроку і не тема Модуля 3 взагалі (дані глибше в M4).

Показ часу йде через **TextLabel**. Повний курс GUI на LocalScript буде в **3.7**, але базовий шаблон торкаємо зараз: інакше секундомір існує лише в уяві й на здачі нема чого показати.

Не плутай цей TextLabel із Billboard над дверима з 3.1. Billboard висить у світі й крутиться до камери; ScreenGui - шар інтерфейсу на екрані гравця. Різні задачі.

Для peer-demo достатньо фрази: «ось час спроби, ось чекпоінт, ось смерть і повернення». Без цього таймер легко виглядає зайвою прикрасою.

**Зроби зараз (2 хв):** виріши для себе, чи таймер стартує одразу з Play. Для здачі достатньо одного простого варіанту.`,
 },
 {
 title: "Шаблон GUI: ScreenGui + TextLabel",
 content: `1. У **StarterGui** створи **ScreenGui** → ім’я \`TimerGui\`.
2. Усередині - **TextLabel** \`TimerLabel\`.
3. Властивості Label: смуга зверху або кут екрана, TextScaled true, текст \`00:00\`, контрастний колір. AnchorPoint / Position підкрути так, щоб напис не закривав половину світу і не тікав за край на різних співвідношеннях екрана.
4. У ScreenGui або прямо під Label - **LocalScript**.

Чому саме LocalScript, якщо kill був на звичайному Script? ScreenGui зі StarterGui клонується **кожному гравцю** на його клієнт. Оновлювати цифри зручно локально. Серверний Script у Workspace для цього шаблону лише ускладнить урок без виграшу.

Це **не** повний урок 3.7: один Label, один лічильник. Без кнопок, без анімацій Frame, без екрана перемоги, без магазину. Якщо хочеться «красивий UI пакет» - спочатку змусь час тікати правильно і стабільно.

У Play перевір, що GUI взагалі видно. Якщо ні - ScreenGui.Enabled, Size, Position, чи Label не має прозорого тексту на прозорому фоні.

Billboard з 3.1 лишай для підказок у світі. Секундомір - на екрані. Різні задачі, різні контейнери.

**Зроби зараз (8 хв):** TimerGui + TimerLabel видно в Play ще до написання циклу (хоча б статичний \`00:00\`).`,
 },
 {
 title: "Код секундоміра (легкий цикл)",
 content: `У LocalScript під Label:

\`\`\`lua
local label = script.Parent
local start = os.clock()

while true do
	local elapsed = os.clock() - start
	local minutes = math.floor(elapsed / 60)
	local seconds = math.floor(elapsed % 60)
	label.Text = string.format("%02d:%02d", minutes, seconds)
	task.wait(0.1)
end
\`\`\`

Тут є \`while true\` - і це свідомий міні-контакт із темою 3.4. Правило одне: **вічний цикл без \`task.wait\` = зависання**. У наступному уроці розбереш while глибше на платформах; сьогодні засвой правило безпеки на безпечному прикладі (цифри на екрані, а не фізика світу).

\`os.clock()\` дає зручний відлік у секундах від умовного старту. Різниця \`os.clock() - start\` - скільки секунд уже триває спроба.

\`math.floor\` відкидає дробову частину. \`string.format\` збирає акуратний час на кшталт \`01:05\` з провідними нулями - так таймер не «стрибає» шириною (1:5 vs 01:05).

Оновлення кожні 0.1 с достатньо гладке для навчального секундоміра. Кожну кадр без wait не ганяй - знову ризик навантаження й погана звичка.

Якщо \`script.Parent\` раптом не Label - час не з’явиться або буде помилка в Output. Поклади LocalScript дитиною TimerLabel або поправ шлях.

**Зроби зараз (8 хв):** час тікає, Play не зависає, формат хвилини:секунди читається з першого погляду.`,
 },
 {
 title: "Зв’язати маршрут: старт → чекпоінти → kill",
 content: `Ідеальний навчальний круг:
1. З’являєшся на \`Spawn_Start\`
2. Бачиш таймер
3. За бажанням відкриваєш двері 3.1
4. Береш чекпоінт A
5. Ризикуєш на KillLane
6. Береш чекпоінт B
7. Навмисна смерть → респавн на останньому чекпоінті
8. Таймер продовжує йти (не обов’язково скидати) - для цього уроку нормально

Не вимагаємо таблицю рекордів і DataStore. Мета - відчути **прогрес + час** в одному Place, зібраному з цеглинок 3.1–3.3.

Якщо коло розвалюється (респавн у лаву, таймер не видно, чекпоінт як kill) - спочатку лагодь маршрут, не додавай нові системи й не качай Free Model «checkpoint pack».

Попроси напарника пройти мовчки. Якщо після смерті він розуміє, *чому* з’явився саме тут - чекпоінт зроблено правильно.

**Зроби зараз (5 хв):** пройди пункти 1–7 без підказок викладача.`,
 },
 {
 title: "Типові поломки чекпоінта й таймера",
 content: `| Симптом | Ймовірна причина | Фікс |
|---------|------------------|------|
| Респавн завжди на старті | Не присвоєно RespawnLocation / не SpawnLocation | Перевір тип і рядок присвоєння |
| Чекпоінт «не береться» | Немає Humanoid / debounce / хибне ім’я Spawn | print + IsA |
| Таймер не видно | Label поза екраном / ScreenGui вимкнений | Size, Position, Enabled |
| Гра зависла | while без wait | додай task.wait |
| LocalScript у Workspace | GUI-скрипт не там | StarterGui / під Label |
| Респавн у лаву | Spawn чекпоінта на Kill | зсунь на безпечну плітчину |
| Час не змінюється | Цикл не запущено / помилка в LocalScript | Output клієнта, шлях script.Parent |

Дебаг-порядок: спочатку print на чекпоінті, потім смерть-тест, потім дивись на GUI. Не лагодь три системи одночасно - заплутаєшся сам.

**Зроби зараз (3 хв):** пройди таблицю проти свого Place.`,
 },
 {
 title: "Play-тест і Save",
 content: `**Чекліст CheckpointRun_v1:**
- [ ] Spawn_Start безпечний
- [ ] ≥2 чекпоінти змінюють RespawnLocation
- [ ] Тест: смерть після A → поява біля A
- [ ] TimerGui показує час, що змінюється
- [ ] while має task.wait
- [ ] KillLane лишається чесною візуально
- [ ] Save: \`Lesson 3.3 - CheckpointRun_v1\`

На здачі розкажи одним реченням різницю: SpawnLocation - точка; RespawnLocation - «який Spawn обрати після смерті».

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Погляд у 3.4",
 content: `У **3.4** \`while true\` піде глибше: показ і ховання платформ, періоди, небезпека циклу без wait. Сьогоднішній секундомір - перший обережний контакт із вічним циклом.

Не починай уже зараз будувати складні зникаючі підлоги «бо while вже був». Спочатку закрій чекпоінти й стабільний таймер, зроби Save, і лише тоді рухайся далі.

**Зроби зараз (2 хв):** допиши в Note один рядок, що переносиш у наступний урок.`,
 },
 ],
 },
 practice: {
 title: "Практика: CheckpointRun_v1",
 duration: 30,
 description: `**Мета:** чекпоінти з RespawnLocation + секундомір на TextLabel.

Відкрий Place після 3.2.`,
 parts: [
 {
 title: "Part A - Разом (10 хв)",
 content: `1. Spawn_Start перед KillLane.
2. Checkpoint_A + Spawn_A.
3. Разом: Touched → GetPlayerFromCharacter → RespawnLocation.
4. Тест смертю після чекпоінта.

**Критерій:** респавн не на старті, а біля A.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Part B - Самостійно (12 хв)",
 content: `1. Другий чекпоінт B.
2. StarterGui → TimerGui → TimerLabel.
3. LocalScript із секундоміром (while + task.wait).
4. Повний маршрут із дверима/kill.
5. Save \`Lesson 3.3 - CheckpointRun_v1\`.

**Критерій:** два чекпоінти + живий таймер без зависання.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Part C - Челендж (8 хв)",
 content: `Обери один:
- Billboard «Чекпоінт!» над A/B;
- колір чекпоінта змінюється після взяття (одноразово, з прапорцем);
- таймер у форматі з десятими (трохи змінити format) - поясни різницю.

**Не роби:** DataStore рекордів, while-платформи зникаючі, повний win-UI з 3.7–3.8.

**Зроби зараз (4 хв):** зроби save/load або чесно задокументуй mock-режим у Output.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "RespawnLocation = звичайна Part",
 fix: "Має бути SpawnLocation. Інакше респавн ігнорує або поводиться дивно.",
 },
 {
 mistake: "Немає GetPlayerFromCharacter",
 fix: "Від Character до Player - через Players:GetPlayerFromCharacter.",
 },
 {
 mistake: "while true без task.wait у таймері",
 fix: "Одразу зависання. Пауза обов’язкова; глибше - у 3.4.",
 },
 {
 mistake: "LocalScript таймера лежить у Workspace",
 fix: "Тримай у StarterGui / під TimerLabel.",
 },
 {
 mistake: "Чекпоінт виглядає як kill",
 fix: "Інший колір/матеріал + підказка. Не плутай гравця.",
 },
 {
 mistake: "Spawn чекпоінта всередині KillLane",
 fix: "Безпечна плітчина поруч, інакше вічна смерть після респавну.",
 },
 {
 mistake: "Чекає повний урок GUI перед секундоміром",
 fix: "Сьогодні лише шаблон Label; глибина GUI - 3.7.",
 },
 ],
 quiz: {
 title: "Тест 3.3 - Чекпоінти + таймер",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Артефакт уроку 3.3 - це:",
 options: [
          "CheckpointRun_v1 з чекпоінтами і секундоміром",
          "Лише KillLane без змін",
          "DataStore таблиця рекордів",
          "Повний магазин Prompt",
        ],
 correctAnswer: 0,
 explanation: "Чекпоінти + таймер.",
 },
 {
 id: "q2",
 type: MC,
 question: "SpawnLocation - це:",
 options: [
          "Тип Constraint",
          "Точка появи гравця",
          "Обов’язковий ModuleScript",
          "Сервіс HTTP",
        ],
 correctAnswer: 1,
 explanation: "Точка спавну.",
 },
 {
 id: "q3",
 type: MC,
 question: "player.RespawnLocation задає:",
 options: [
          "Колір неба",
          "Гучність музики",
          "Який SpawnLocation використати після смерті",
          "Розмір Baseplate",
        ],
 correctAnswer: 2,
 explanation: "Пам’ять чекпоінта для респавну.",
 },
 {
 id: "q4",
 type: MC,
 question: "GetPlayerFromCharacter потрібен, щоб:",
 options: [
          "Створити Terrain",
          "Замінити Humanoid",
          "Вимкнути Lighting",
          "Отримати Player з Character після Touched",
        ],
 correctAnswer: 3,
 explanation: "Міст Character → Player.",
 },
 {
 id: "q5",
 type: MC,
 question: "Чому на чекпоінті лишаємо debounce?",
 options: [
          "Бо так красивіше Neon",
          "Touched знову може спамити присвоєння RespawnLocation",
          "Бо без нього не працює Snap",
          "Бо DataStore вимагає",
        ],
 correctAnswer: 1,
 explanation: "Та сама гігієна, що в 3.2.",
 },
 {
 id: "q6",
 type: MC,
 question: "TextLabel секундоміра сьогодні живе в:",
 options: [
          "Terrain",
          "ServerStorage обов’язково",
          "ScreenGui у StarterGui (шаблон)",
          "SoundService",
        ],
 correctAnswer: 2,
 explanation: "Простий GUI-шаблон.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чому таймер часто на LocalScript?",
 options: [
          "GUI гравця зручно оновлювати на клієнті",
          "Бо Script заборонений у всьому Roblox",
          "Бо Touched не існує",
          "Бо Anchored так вимагає",
        ],
 correctAnswer: 0,
 explanation: "Клієнтський HUD.",
 },
 {
 id: "q8",
 type: MC,
 question: "while true у секундомірі без task.wait:",
 options: [
          "Працює швидше і краще",
          "Автоматично створює чекпоінт",
          "Виправляє Orientation",
          "Ризикує зависнути",
        ],
 correctAnswer: 3,
 explanation: "Пауза обов’язкова.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що з цього НЕ тема 3.3?",
 options: [
          "RespawnLocation",
          "Секундомір на TextLabel",
          "Зникаючі while-платформи як головний артефакт",
          "SpawnLocation",
        ],
 correctAnswer: 2,
 explanation: "Платформи while - 3.4.",
 },
 {
 id: "q10",
 type: MC,
 question: "Чекпоінт має виглядати:",
 options: [
          "Ідентично неоновому kill",
          "Інакше ніж небезпека, щоб його читали",
          "Повністю невидимо завжди",
          "Лише в ServerScriptService",
        ],
 correctAnswer: 1,
 explanation: "Читабельність траси.",
 },
 {
 id: "q11",
 type: MC,
 question: "os.clock() у шаблоні таймера допомагає:",
 options: [
          "Малювати Terrain",
          "Створювати Weld",
          "Публікувати Place",
          "Міряти минулий час",
        ],
 correctAnswer: 3,
 explanation: "Відлік секунд.",
 },
 {
 id: "q12",
 type: MC,
 question: "Якщо після чекпоінта смерть повертає на старт, перше що перевірити:",
 options: [
          "Чи присвоєно RespawnLocation на SpawnLocation",
          "Atmosphere",
          "Чи є Decal на даху",
          "Чи вимкнено Snap",
        ],
 correctAnswer: 0,
 explanation: "Ланцюжок чекпоінта.",
 },
 {
 id: "q13",
 type: MC,
 question: "Повний урок LocalScript + GUI буде в:",
 options: [
          "1.1",
          "2.4 лише",
          "3.7",
          "M12 тільки",
        ],
 correctAnswer: 2,
 explanation: "Сьогодні шаблон; глибина в 3.7.",
 },
 {
 id: "q14",
 type: MC,
 question: "Рекомендований Save:",
 options: [
          "Untitled",
          "Module 6 HUD Final",
          "Lesson 2.1 Island only",
          "Lesson 3.3 - CheckpointRun_v1",
        ],
 correctAnswer: 3,
 explanation: "Явний артефакт 3.3.",
 },
 {
 id: "q15",
 type: MC,
 question: "Наступний урок:",
 options: [
          "DataStore",
          "while + платформи",
          "RemoteEvent гонки",
          "Toolbox hygiene M2",
        ],
 correctAnswer: 1,
 explanation: "3.4 - while глибше.",
 },
 ],
 },
}

export const ukLesson34 = {
 lessonId: "lesson-roblox-3-4",
 moduleId: "module-03",
 order: 4,
 title: "3.4 - while + платформи",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Пояснити while true do і навіщо всередині завжди потрібен wait",
 "Зробити платформи, що періодично з’являються й зникають",
 "Керувати CanCollide і Transparency у циклі",
 "Підібрати період (час видимості / паузи) під чесний стрибок",
 "Здати BlinkPlatforms_v1 на трасі з чекпоінтами без зависання Studio",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - платформи з ритмом",
 content: `У 3.3 ти вже бачив \`while true\` у секундомірі. Сьогодні той самий інструмент керує **світом**: платформи з’являються й зникають за періодом.

Це інший смак циклу. Таймер лише змінював текст на екрані. Тут цикл чіпає фізику під ногами гравця - тому помилка з CanCollide або wait відчувається одразу падінням або зависанням.

**Артефакт:** \`BlinkPlatforms_v1\`
- 2+ платформи (\`Blink_01\`, \`Blink_02\`…)
- Script із \`while true do\` + \`task.wait\`
- видимість через Transparency і прохідність через CanCollide
- період підібраний так, щоб стрибок був складним, але чесним
- Save: \`Lesson 3.4 - BlinkPlatforms_v1\`

**Старт:** Place після 3.3. Постав миготливі платформи **після** чекпоінта A або між A і B - щоб падіння не кидало на самий початок світу. KillLane лишай осторонь або далі по трасі: не змішуй «лава» і «blink» в одну Part без потреби.

**Що не сьогодні:** \`for\`/\`ipairs\` для спавну всієї траси (**3.5**), function-рефактор (**3.6**), красивий win-GUI (**3.7**). Один чіткий while на платформи цінніший за п’ять напівживих систем.

**Зроби зараз (2 хв):** відкрий Place після попереднього уроку і підготуй робочу зону для артефакту цього заняття.`,
 },
 {
 title: "while true - цикл, який не закінчується сам",
 content: `**while** повторює блок, поки умова істинна. Найпростіший «вічний» запис:

\`\`\`lua
while true do
	-- тіло циклу
	task.wait(1)
end
\`\`\`

\`true\` завжди істинне → цикл крутиться, доки живий Script (або доки не натиснули Stop).

Порівняй із уже відомим:

| Конструкція | Коли спрацьовує | Приклад |
|-------------|-----------------|---------|
| \`if\` | Один раз, коли дійшли до рядка | Відкрити двері |
| \`Touched\` | Коли був дотик | Kill / чекпоінт |
| \`while true\` | Знову і знову в часі | Таймер, миготлива платформа |

Цикл **не** замінює Touched. Він для ритму: «зараз є → потім немає → знову є». Якщо ловиш себе на думці «повішу while, щоб ловити дотики» - зупинись: для дотиків лишай подію.

Умову while можна писати й інакше (не лише true), але сьогодні свідомо тренуємо безпечний вічний цикл зі wait. Інші форми прийдуть самі, коли знадобляться.

**Зроби зараз (2 хв):** у нотатках: while = повтор у часі; if = розвилка один раз; Touched = реакція на контакт.`,
 },
 {
 title: "Головне правило: без wait цикл вбиває Play",
 content: `Якщо написати:

\`\`\`lua
while true do
	print("привіт")
end
\`\`\`

Studio або клієнт може **зависнути**: скрипт крутить тіло без паузи й не віддає чергу іншим задачам. У 3.3 ти вже зобов’язаний був ставити \`task.wait\` у таймері. Сьогодні це правило стає законом для логіки світу.

**Завжди** у вічному циклі платформ:
1. зроби зміну (сховати / показати)
2. \`task.wait(...)\` - пауза періоду
3. наступна зміна
4. знову wait

Немає wait між змінами → біда. Є wait → ритм, який можна налаштувати числами.

На уроці краще **не** демонструвати зависання «для приколу»: втратиш час на Force Close і нерви групи. Просто постав wait одразу в першому чернетковому while - ще до першого Play.

Окремий міф: «я поставлю wait(0) або дуже мале число - майже як без wait, але безпечно». Занадто малий wait все одно може навантажити Play і зробити миготіння нечитабельним. Для платформ думай секундами, не мілісекундами, доки не маєш причини інакше.

**Зроби зараз (3 хв):** відкрий свій таймер з 3.3 і ще раз подивись, де стоїть wait. Той самий рефлекс перенеси на платформи.`,
 },
 {
 title: "Каркас BlinkPlatforms_v1",
 content: `1. Збери 2+ Parts над прірвою або між острівцями: \`Blink_01\`, \`Blink_02\`.
2. Anchored true, CanCollide true на старті (видима фаза).
3. Колір і матеріал відмінні від kill: блакитний Neon, зелений Plastic тощо - щоб око читало «це платформа, не лава».
4. Folder або Model \`BlinkPlatforms_v1\`.
5. Для старту - по Script на кожну платформу (копипаст ок). У 3.5–3.6 копипаст зменшимо.

Дистанції стрибків тримай людяними: новачок після дверей і чекпоінта має мати шанс, а не лотерею. Якщо треба - постав тимчасову страховку нижче для тестів і прибери перед здачею.

Не став blink-платформи прямо на \`Spawn_Start\`: інакше перша секунда гри - лотерея падіння. Після чекпоінта A - ідеальне місце: прогрес уже є, ризик читається як виклик.

**Зроби зараз (8 хв):** дві платформи на маршруті після чекпоінта, без циклу - лише розстановка й імена PascalCase.`,
 },
 {
 title: "Показати / сховати: Transparency + CanCollide",
 content: `Щоб платформа «зникла» для гравця, мало змінити колір. Потрібно узгодити вигляд і фізику:

| Властивість | Коли видно | Коли «немає» |
|-------------|------------|--------------|
| **Transparency** | 0 | 1 (повністю прозора) |
| **CanCollide** | true | false (інакше невидима стіна) |

Типова помилка №1: Transparency = 1, але CanCollide true → б’єшся об повітря. Помилка №2: CanCollide false при Transparency 0 → виглядає як підлога, а провалюєшся. Іноді фейкова плита - окремий жанр трюку; сьогодні робимо саме **синхронне** миготіння, без підлості.

\`\`\`lua
local platform = script.Parent

local function setVisible(isVisible)
	if isVisible then
		platform.Transparency = 0
		platform.CanCollide = true
	else
		platform.Transparency = 1
		platform.CanCollide = false
	end
end
\`\`\`

Легкий \`local function\` знову лише для акуратності; глибокий урок functions - **3.6**. Можна писати ті самі чотири рядки прямо в while - теж ок для здачі.

**Зроби зараз (5 хв):** вручну в Properties пограй обидві помилки, відчуй тілом, потім поверни видимий стан.`,
 },
 {
 title: "Перший while для однієї платформи",
 content: `Script у \`Blink_01\`:

\`\`\`lua
local platform = script.Parent

while true do
	-- видно
	platform.Transparency = 0
	platform.CanCollide = true
	task.wait(2)

	-- сховати
	platform.Transparency = 1
	platform.CanCollide = false
	task.wait(1.5)
end
\`\`\`

Play: платформа дихає ритмом «2 с є / 1.5 с немає». Постій у фазі «є», зістрибни до зникнення. Якщо стоїш і чекаєш зникнення під ногами - маєш провалитись, а не висіти в повітрі на невидимій стіні.

Читай цикл як сценарій вистави: спочатку декорації на сцені (видно + колізія), пауза для гравця, потім антракт (сховати), знову пауза, повтор. Якщо викинеш паузи - вистава згортається в один кадр і Studio «помирає».

Якщо світ завис - шукай while без wait. Якщо платформа лише блідне, але тримає - забув CanCollide false. Якщо провалюєшся, коли вона ще яскрава - CanCollide false на фазі «є».

Не засовуй у цей while убивство Humanoid «про всяк випадок». Різні небезпеки - різні скрипти й різні сигнали для ока. Blink вчить ритму; kill вчить контакту.

Після першого успішного циклу зупини Play і знову запусти: Script має знову дихати з старту. Якщо «залипло» в невидимому стані - перевір, чи не зламав Anchored і чи Part на місці.

**Зроби зараз (8 хв):** одна робоча миготлива платформа з двома wait.`,
 },
 {
 title: "Період - баланс чесності",
 content: `**Період** - скільки секунд триває кожна фаза. Це геймдизайн, не магія чисел із випадкового туторіалу.

| Занадто коротке «є» | Занадто довге «немає» | Зручний старт для навчання |
|---------------------|------------------------|------------------------------|
| Не встигаєш наступити | Стоїш і нудишся | 1.5–2.5 с видно, 1–2 с сховати |

Правила чесності (у тому ж дусі, що Neon kill і читабельні чекпоінти):
- коли платформа «є» - вона справді тримає й добре видно
- ритм стабільний, без випадкового хаосу на першому while
- поруч є чекпоінт - падіння не обнуляє весь прогрес модуля
- гравець розуміє правило за 10 секунд спостереження, ще до стрибка
- немає «майже прозорої» підлоги з CanCollide true на фазі «є»

Підкручуй \`task.wait\` числами й тестуй **стрибком у Play**, не лише з камери творця. З камери все здається легшим: Character важчий і повільніший за твій політ на E/Q.

Запиши обрані числа в нотатках (наприклад 2.0 / 1.5). На здачі викладач може спитати «чому саме так» - і це нормальне питання дизайнера, не каверза.

**Зроби зараз (5 хв):** зміни період тричі й обери свій «чесний» ритм для здачі.`,
 },
 {
 title: "Друга платформа й зсув ритму",
 content: `Скопіюй Script на \`Blink_02\`. Якщо обидві миготять **синхронно**, стрибок «з лівої на праву» у спільній фазі «немає» стає або жорстоким, або нудно-передбачуваним.

Простий прийом без нових тем: на другій платформі додай паузу **перед** циклом або поміняй тривалості фаз.

\`\`\`lua
local platform = script.Parent
task.wait(0.7) -- зсув фази

while true do
	platform.Transparency = 0
	platform.CanCollide = true
	task.wait(2)
	platform.Transparency = 1
	platform.CanCollide = false
	task.wait(1.5)
end
\`\`\`

Так платформи дихають не в унісон. Це ще не \`for\` по списку дітей - просто дві свідомі копії з різним стартом. У 3.5 навчишся розмножувати об’єкти акуратніше; у 3.6 - прибрати копипаст через function.

Перевір стрибок протягом 20–30 секунд: чи є вікна, коли хоча б одна платформа тримає? Повна синхронна «яма» на дві секунди часто злить більше, ніж вчить таймінг.

Якщо зсув 0.7 с виявився слабким - спробуй 1.0 або інший wait усередині фаз лише на другій платформі. Записуй, що спрацювало.

**Зроби зараз (7 хв):** дві платформи зі зсувом фази, перехід між ними можливий.`,
 },
 {
 title: "Де ставити Script і чого не робити",
 content: `- Звичайний **Script** на Part або в Model (не LocalScript): фізика світу - серверна справа.
- Не клади while платформ у LocalScript таймера «про всяк випадок» - різні задачі, різні скрипти.
- Не змішуй kill і blink на одній Part без потреби: гравець не зрозуміє правило.
- Не використовуй \`while true\` без wait «бо так швидше оновлюється» - це швидкий шлях до зависання.
- Не замінюй чекпоінти миготінням: спочатку безпека прогресу (3.3), потім ритм платформ.

Якщо хочеться рухати платформу по Position у циклі - можна обережно (маленький зсув по осі між wait). Для здачі достатньо show/hide. Рух по рейці через Prismatic ти вже бачив у M2; сьогодні фокус на while і періоді.

**Зроби зараз (3 хв):** перевір Explorer - усі blink-скрипти саме Script, імена PascalCase.`,
 },
 {
 title: "Play-тест маршрутом",
 content: `1. З’явись на старті або чекпоінті перед зоною blink.
2. Дочекайся фази «є» на \`Blink_01\`, наступи.
3. Перейди на \`Blink_02\` зі зсувом.
4. Навмисно застрянь у фазі «немає» - впади; респавн має бути на чекпоінті (якщо 3.3 на місці).
5. Play не зависає; Output без червоного спаму.
6. Таймер з 3.3 (якщо лишив) далі тікає окремим while - не ламай його.
7. Платформи не виглядають як kill і не стоять на Spawn.

Попроси напарника пройти мовчки: якщо за 15 секунд він зрозумів ритм - дизайн спрацював. Якщо питає «це баг чи фіча?» про невидиму стіну - фікси CanCollide.

На здачі вмій показати два wait у коді й назвати свої числа періоду вголос.

**Save:** \`Lesson 3.4 - BlinkPlatforms_v1\`.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Межа уроку",
 content: `| Не сьогодні | Коли |
|-------------|------|
| \`for i = 1, n\` / \`ipairs\` спавн усієї траси | **3.5** |
| function setPlatformVisible(...) на модуль | **3.6** |
| GUI кнопки керування фазою | **3.7** |
| TweenService анімація прозорості | пізніше (Arena тощо) |

Сьогоднішня перемога - **безпечний while** і читабельний ритм платформ.

**Зроби зараз (2 хв):** прибери з маршруту здачі все, що виходить за межі цього уроку.`,
 },
 {
 title: "Погляд у 3.5",
 content: `У **3.5** з’явиться \`for\` / \`ipairs\`: розмножувати частини траси без копипасту. Сьогоднішні дві-три платформи з ручним зсувом фази - фундамент.

Не намагайся вже зараз написати генератор рівня «на 40 платформ». Спочатку відчуй цикл на одній Part, зроби Save, і лише тоді рухайся до for.

**Зроби зараз (2 хв):** допиши в Note один рядок, що переносиш у наступний урок.`,
 },
 ],
 },
 practice: {
 title: "Практика: BlinkPlatforms_v1",
 duration: 30,
 description: `**Мета:** миготливі платформи на while true з wait і чесним періодом.

Відкрий Place після 3.3.`,
 parts: [
 {
 title: "Part A - Разом (10 хв)",
 content: `1. Постав \`Blink_01\`.
2. Разом: while з показом/хованням + два task.wait.
3. Покажіть, що без CanCollide false лишається «скло».
4. Підкрутіть період колективно.

**Критерій:** одна платформа дихає, Play стабільний.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Part B - Самостійно (12 хв)",
 content: `1. Друга платформа зі зсувом фази.
2. Вбудуй у маршрут після чекпоінта.
3. Playtest стрибком і падінням.
4. Прибери while без wait, якщо десь лишився експеримент.
5. Save \`Lesson 3.4 - BlinkPlatforms_v1\`.

**Критерій:** дві платформи, різний ритм, чесний стрибок.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Part C - Челендж (8 хв)",
 content: `Обери один:
- третя платформа з іншим періодом;
- коротка «фейкова» плита поруч (завжди CanCollide false) - підпиши Billboard «НЕ СТАВАЙ», щоб не плутати з blink;
- легкий зсув Position угору-вниз у while (мала амплітуда) замість лише Transparency.

**Не роби:** for-генератор усієї карти, Tween-пакет з Toolbox, while без wait.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "while true без task.wait",
 fix: "Одразу додай паузу. Інакше зависання Play/Studio.",
 },
 {
 mistake: "Transparency = 1, але CanCollide true",
 fix: "Невидима стіна. Ховай обидва тумблери разом.",
 },
 {
 mistake: "CanCollide false при Transparency 0 на фазі «є»",
 fix: "Виглядає як підлога, а провалюєшся. На фазі видимості CanCollide true.",
 },
 {
 mistake: "LocalScript на blink-платформі",
 fix: "Звичайний Script: це логіка світу, не HUD.",
 },
 {
 mistake: "Синхронне миготіння двох платформ без зсуву",
 fix: "Додай task.wait перед циклом на другій або інші тривалості.",
 },
 {
 mistake: "Платформи до першого чекпоінта без Spawn",
 fix: "Постав зону після чекпоінта, інакше кожне падіння = лють.",
 },
 {
 mistake: "Плутає while з Touched",
 fix: "Touched - подія контакту; while - повтор у часі. Різні інструменти.",
 },
 ],
 quiz: {
 title: "Тест 3.4 - while + платформи",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Артефакт уроку 3.4 - це:",
 options: [
          "BlinkPlatforms_v1 з while і періодами",
          "Лише секундомір без змін",
          "DataStore",
          "RemoteEvent магазин",
        ],
 correctAnswer: 0,
 explanation: "Миготливі платформи.",
 },
 {
 id: "q2",
 type: MC,
 question: "while true do повторює тіло циклу:",
 options: [
          "Лише один раз",
          "Поки Script живий (умова завжди true)",
          "Лише при кліку миші",
          "Лише в Terrain Editor",
        ],
 correctAnswer: 1,
 explanation: "Вічний цикл за задумом.",
 },
 {
 id: "q3",
 type: MC,
 question: "Без task.wait у while true типовий ризик:",
 options: [
          "Кращий FPS завжди",
          "Автоматичний Save",
          "Зависання Play/клієнта",
          "Зникнення Terrain",
        ],
 correctAnswer: 2,
 explanation: "Головне правило уроку.",
 },
 {
 id: "q4",
 type: MC,
 question: "Щоб платформа зникла для ніг гравця, потрібно:",
 options: [
          "Лише змінити BrickColor",
          "Видалити Lighting",
          "Увімкнути Party Mode",
          "Transparency і CanCollide узгоджено",
        ],
 correctAnswer: 3,
 explanation: "Вигляд + колізія.",
 },
 {
 id: "q5",
 type: MC,
 question: "Невидима стіна - це коли:",
 options: [
          "Transparency 1 і CanCollide false",
          "Transparency 1, але CanCollide true",
          "Немає Script",
          "Part у ServerStorage",
        ],
 correctAnswer: 1,
 explanation: "Прозора, але тверда.",
 },
 {
 id: "q6",
 type: MC,
 question: "Період у цьому уроці означає:",
 options: [
          "Назву Place",
          "Тип Constraint",
          "Тривалість фаз видно/сховати",
          "Версію Studio",
        ],
 correctAnswer: 2,
 explanation: "Ритм task.wait.",
 },
 {
 id: "q7",
 type: MC,
 question: "Зсув фази другої платформи часто роблять через:",
 options: [
          "task.wait перед while",
          "DataStore",
          "Видалення Humanoid",
          "Union з Baseplate",
        ],
 correctAnswer: 0,
 explanation: "Простий зсув ритму.",
 },
 {
 id: "q8",
 type: MC,
 question: "Який Script ставити на blink-платформу?",
 options: [
          "LocalScript у StarterGui обов’язково",
          "Лише ModuleScript",
          "Script у SoundService",
          "Звичайний Script",
        ],
 correctAnswer: 3,
 explanation: "Логіка світу на сервері.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що з цього НЕ тема 3.4?",
 options: [
          "while true + wait",
          "Transparency/CanCollide ритм",
          "for/ipairs спавн усієї траси",
          "Період чесного стрибка",
        ],
 correctAnswer: 2,
 explanation: "for - 3.5.",
 },
 {
 id: "q10",
 type: MC,
 question: "Touched і while відрізняються тим, що:",
 options: [
          "While завжди про GUI",
          "Touched реагує на контакт, while задає повтор у часі",
          "While існує лише в M1",
          "Touched заборонений після 3.2",
        ],
 correctAnswer: 1,
 explanation: "Різні ролі.",
 },
 {
 id: "q11",
 type: MC,
 question: "На фазі «платформа є» логічно:",
 options: [
          "Transparency 1, CanCollide false",
          "Видалити Part",
          "Anchored false обов’язково без Constraint",
          "Transparency 0, CanCollide true",
        ],
 correctAnswer: 3,
 explanation: "Видно і тримає.",
 },
 {
 id: "q12",
 type: MC,
 question: "Чому while уже був у 3.3, але урок while саме зараз?",
 options: [
          "У 3.3 - легкий контакт для таймера; тут while керує світом і балансом",
          "Помилка сітки",
          "While у 3.3 був заборонений",
          "Бо LocalScript зник",
        ],
 correctAnswer: 0,
 explanation: "Спіраль поглиблення.",
 },
 {
 id: "q13",
 type: MC,
 question: "Найкраще місце для blink-зони:",
 options: [
          "Прямо на Spawn_Start у лаві",
          "У Lighting",
          "Після чекпоінта, з шансом чесного стрибка",
          "У ReplicatedStorage only",
        ],
 correctAnswer: 2,
 explanation: "Справедливість прогресу.",
 },
 {
 id: "q14",
 type: MC,
 question: "Рекомендований Save:",
 options: [
          "Untitled",
          "Module 9 Remotes",
          "Lesson 1.8 only",
          "Lesson 3.4 - BlinkPlatforms_v1",
        ],
 correctAnswer: 3,
 explanation: "Явний артефакт.",
 },
 {
 id: "q15",
 type: MC,
 question: "Наступний урок:",
 options: [
          "DataStore",
          "for / ipairs",
          "Publish Showcase",
          "Toolbox Free Model admin",
        ],
 correctAnswer: 1,
 explanation: "3.5 - цикли for.",
 },
 ],
 },
}

export const ukLesson35 = {
 lessonId: "lesson-roblox-3-5",
 moduleId: "module-03",
 order: 5,
 title: "3.5 - for / ipairs",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Написати for i = 1, n do і пояснити лічильник i",
 "Обійти список через ipairs і зрозуміти різницю з числовим for",
 "Спавнити ряд платформ траси без копипасту Parts руками",
 "Задати Position від індексу (крок studs)",
 "Здати TrackSpawn_v1 з Folder і коротким Script-генератором",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - траса без копипасту",
 content: `У 3.4 ти ставив дві-три blink-платформи вручну й копипастив Script. Сьогодні вчимось **розмножувати геометрію кодом**: один шаблон → багато плит у ряд.

Це той момент, коли курс перестає винагороджувати Ctrl+D на кожну цеглину. Якщо треба шість однакових опор - цикл зробить це швидше й з меншою кількістю помилок в іменах (Pad_1, Pad_2… замість Part, Part1, asdasd).

**Артефакт:** \`TrackSpawn_v1\`
- Folder \`TrackSpawn_v1\`
- Script, який через \`for\` створює **6+** платформ
- імена на кшталт \`Pad_1\`…\`Pad_6\`
- крок по осі (наприклад +8 studs по X або Z)
- Save: \`Lesson 3.5 - TrackSpawn_v1\`

**Старт:** Place після 3.4. Не знось чекпоінти й kill - нова траса може вести **далі** маршрутом або лежати паралельно як тренувальна смуга. Головне - щоб було куди стрибати й що показати на здачі.

**Спіраль:** \`ipairs\` + \`GetChildren\` ти вже бачив у аудитах M2. Сьогодні for стає інструментом **будівництва**, не лише огляду. Повний урок functions - **3.6**; GUI - **3.7**. Поки що не ховай спавн у function «на виріст» - спочатку робочий for у одному Script.

**Зроби зараз (2 хв):** відкрий Place після попереднього уроку і підготуй робочу зону для артефакту цього заняття.`,
 },
 {
 title: "for i = 1, n - лічильник кроків",
 content: `Числовий цикл:

\`\`\`lua
for i = 1, 5 do
	print("Крок", i)
end
\`\`\`

Що відбувається: \`i\` стає 1, потім 2, … до 5 включно. Тіло виконується на кожному значенні. Це не магія - це лічильник, який Studio крутить за тебе.

| Частина | Значення |
|---------|----------|
| \`i\` | лічильник (змінна циклу) |
| \`1\` | звідки почати |
| \`5\` | де закінчити (включно) |

Можна додати крок: \`for i = 1, 9, 2 do\` → 1, 3, 5, 7, 9. Сьогодні для траси зазвичай крок 1 достатній: просто «зроби count плит».

Порівняй із \`while true\`: while крутиться, доки сам не зупиниш (і у вічному випадку обов’язковий wait). \`for i = 1, n\` сам знає, **скільки** повторів - ідеально для «зроби 8 платформ і зупинись».

Типова плутанина після 3.4: поставити спавн у while true без умови виходу. Тоді плити сиплються вічно (або зависаєш без wait). Спавн геометрії - майже завжди for з відомою кількістю.

Не став for без потреби всередині Touched на кожен контакт ноги. Спавн траси - коли Script стартує, один раз на «життєвий цикл» скрипта (з очисткою), не на кожен крок гравця.

**Зроби зараз (3 хв):** тимчасовий Script із print 1…5 у Output, подивись порядок, потім прибери експеримент.`,
 },
 {
 title: "ipairs - пройти вже існуючий список",
 content: `Коли список уже є (діти Folder), зручний \`ipairs\`:

\`\`\`lua
local folder = workspace:FindFirstChild("TrackSpawn_v1")
for index, child in ipairs(folder:GetChildren()) do
	print(index, child.Name, child.ClassName)
end
\`\`\`

| | \`for i = 1, n\` | \`ipairs\` |
|--|------------------------|-----------------|
| Звідки береться кількість | Ти задаєш n | З довжини списку |
| Що всередині | Часто **створюєш** нове | Часто **обробляєш** наявне |
| Типовий use сьогодні | Спавн плит | Очистка / аудит уже створеного |

\`index\` - номер з 1. \`child\` - елемент. Підкреслення \`_\` можна ставити замість index, якщо номер не потрібен - як у аудитах M2.

Не плутай: ipairs не створює Part сам по собі. Він лише ходить по тому, що вже лежить у Folder. Створення - \`Instance.new\` у числовому for.

**Зроби зараз (4 хв):** щойно з’являться перші плити - прожени ipairs-друк їхніх імен.`,
 },
 {
 title: "Instance.new - створити Part з коду",
 content: `Руками ти жмав Part на стрічці Home. З коду:

\`\`\`lua
local pad = Instance.new("Part")
pad.Name = "Pad_1"
pad.Size = Vector3.new(6, 1, 6)
pad.Anchored = true
pad.Parent = workspace
\`\`\`

Порядок-звичка: спочатку властивості (Name, Size, Anchored, Color…), **наприкінці** \`Parent = ...\`. Так об’єкт потрапляє у світ уже зібраним, а не «сірим кубом на мить», який ще стрибає, поки ти дописуєш рядки.

Сьогодні Parent - твій Folder \`TrackSpawn_v1\`, не корінь Workspace навалом. Інакше через тиждень не відрізниш згенероване від сміття й від будинку.

\`Vector3.new\` і колір з коду ти вже зустрічав у M1. Тут вони служать **шаблону** плити, який for лише повторює.

Якщо забудеш Parent - Part «висить» у пам’яті й у світі її не видно. Якщо забудеш Anchored - плити можуть посипатись, щойно з’являться (залежно від місця). Для траси Anchored true - базова гігієна.

**Зроби зараз (5 хв):** створи Folder \`TrackSpawn_v1\`. Одну Part руками можеш лишити як зразок розміру, але ряд зробимо циклом.`,
 },
 {
 title: "Спавн ряду в for - серце артефакту",
 content: `Script у Folder \`TrackSpawn_v1\` (або поруч, з посиланням на Folder - головне не знищити Script очисткою):

\`\`\`lua
local folder = script.Parent
local start = Vector3.new(0, 5, 0) -- підстав свої координати біля траси
local step = 8 -- studs між центрами
local count = 6

for i = 1, count do
	local pad = Instance.new("Part")
	pad.Name = "Pad_" .. i
	pad.Size = Vector3.new(6, 1, 6)
	pad.Anchored = true
	pad.Material = Enum.Material.Neon
	pad.Color = Color3.fromRGB(80, 180, 255)
	pad.Position = start + Vector3.new(step * (i - 1), 0, 0)
	pad.Parent = folder
end

print("Створено платформ:", count)
\`\`\`

Ідеї в рядках:
- \`"Pad_" .. i\` склеює ім’я з номером
- \`i - 1\` дає зміщення 0, 8, 16… щоб перша плита сіла саме на \`start\`
- вісь X/Z/Y міняй під свій острів і напрям маршруту
- \`count\` винеси в змінну зверху - легше крутити 6 → 8 → 10 без пошуку по всьому коду

**Увага:** кожен Play зі Script, який завжди спавнить, може **наплодити дублікати**. Тому наступна секція - очистка. Без неї здаси «ліс» із Pad_1…Pad_6 тричі й викладач одразу це побачить у Explorer.

Як узяти хороший start: постав тимчасову Part-маркер там, де має початись траса, скопіюй її Position у код, маркер видали. Не підставляй (0,5,0) навмання, якщо твій острів далеко в боці.

Спочатку постав count = 3 для швидкого тесту, потім підніми до 6+. Так менше часу на «де мої плити?» у тумані координат.

**Зроби зараз (10 хв):** щонайменше 6 платформ у ряд від обраної точки.`,
 },
 {
 title: "Очистка перед спавном (анти-дублікати)",
 content: `Простий захист - спочатку прибрати старі плити Folder:

\`\`\`lua
local folder = script.Parent

for _, child in ipairs(folder:GetChildren()) do
	if child:IsA("BasePart") and string.sub(child.Name, 1, 4) == "Pad_" then
		child:Destroy()
	end
end

-- далі for i = 1, count do ... Instance.new ... end
\`\`\`

Тут \`ipairs\` обходить наявне, числовий \`for\` створює нове. Два цикли - дві ролі. Не намагайся одним while зробити і те, і те «бо while крутіший»: while тут не потрібен.

\`string.sub(name, 1, 4) == "Pad_"\` дивиться префікс. Якщо у Folder лише генератор і його плити - можна Destroy усіх BasePart. Якщо Script лежить у тому ж Folder - **не** знищуй усі діти без фільтра, інакше вб’єш і Script з першого Play.

Практичні схеми:
1. Script у Folder, плити лише з префіксом Pad_, очистка лише Pad_
2. Script у окремому місці (наприклад Folder Scripts), плити - в TrackSpawn_v1, можна чистити весь Folder плит

Перевірка: Stop → Play → Stop → Play. У Explorer має бути рівно count плит (плюс Script, якщо він там). Якщо бачиш Pad_1..Pad_6 і ще раз Pad_1..Pad_6 - очистка не спрацювала.

**Зроби зараз (6 хв):** два-три цикли Stop/Play підряд без росту кількості.`,
 },
 {
 title: "Підігнати трасу під світ",
 content: `1. Постав \`start\` так, щоб перша плита була досяжна зі стежки чи чекпоінта.
2. \`step\` підбери під довжину стрибка Character (часто 6–10 studs для плоских плит такого Size).
3. Висота Y: над прірвою чи водою, не всередині Baseplate.
4. За бажанням чергуй колір від \`i\`: парні/непарні через \`if i % 2 == 0 then\`.

Це знову \`if\` з 1.4 всередині for - спіраль, не нова тема з нуля. Так само можна трохи міняти Size, але не роби третю плиту гігантською «бо можна»: спочатку рівні стрибки.

Blink-скрипти з 3.4 **не обов’язково** вішати на кожну згенеровану плиту сьогодні. Можна здати статичну трасу-спавнер як чистий артефакт for. Якщо дуже хочеться ритму - повесь blink вручну на 1–2 плити після генерації, без автоматизації functions.

Не веди згенеровану трасу крізь KillLane так, щоб Pad_1 виглядав як звичайна підлога смерті без сигналу. Або розведи зони в просторі, або зроби колір траси явно «безпечним паркуром» (не Really red Neon як kill).

Після підгонки пройди всю низку стрибків у Play від Pad_1 до останньої. Якщо посередині «не дотягуєш» - зменш step, не звинувачуй for.

**Зроби зараз (7 хв):** траса читається в Play, стрибки можливі, імена Pad_1…Pad_n у Explorer.`,
 },
 {
 title: "ipairs після спавну - швидкий аудит",
 content: `Додай в кінець генератора:

\`\`\`lua
local n = 0
for _, child in ipairs(folder:GetChildren()) do
	if child:IsA("BasePart") then
		n = n + 1
		print(child.Name, child.Position)
	end
end
print("Разом BasePart у Folder:", n)
\`\`\`

Так ти бачиш у Output і кількість, і чи Position справді крокує (X або Z зростає). Це той самий дух аудитів зі штабу, воріт і атракціонів - лише для траси.

Якщо всі Position однакові - формула step зламана. Якщо n більший за count - очистка не спрацювала або в Folder лежить зайве.

**Зроби зараз (4 хв):** аудит після генерації; звіри з тим, що бачиш у Viewport.`,
 },
 {
 title: "Типові поломки for-спавну",
 content: `| Симптом | Ймовірна причина | Фікс |
|---------|------------------|------|
| Дублікати після кожного Play | Немає очистки | ipairs + Destroy перед спавном |
| Усі плити в одній точці | Забув step * (i-1) | Перевір формулу Position |
| Script зникає / мовчить | Destroy усіх дітей Folder | Фільтр Pad_ або Script поза папкою плит |
| Немає плит | Parent не той / count = 0 | print у циклі |
| Траса в небі / під землею | Поганий start | Візьми Position з маркера |
| Імена без номерів | Забув .. i | "Pad_" .. i |

Дебаг-порядок: спочатку print(i) у циклі, потім одна Part, потім count=6, потім очистка.

**Зроби зараз (3 хв):** пройди таблицю проти свого генератора.`,
 },
 {
 title: "Play-тест і Save",
 content: `**Чекліст TrackSpawn_v1:**
- [ ] Folder з ізольованим генератором
- [ ] for створює ≥6 плит
- [ ] імена Pad_ з номерами
- [ ] крок Position видно оком і в Output
- [ ] повторний Play не плодить купу дублікатів
- [ ] траса досяжна з маршруту модуля
- [ ] Save: \`Lesson 3.5 - TrackSpawn_v1\`

На здачі скажи одним реченням: for i - «скільки створити»; ipairs - «що вже лежить у списку».

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Межа уроку",
 content: `| Не сьогодні | Коли |
|-------------|------|
| function spawnPad(i) на весь модуль | **3.6** |
| LocalScript GUI зі списком плит | **3.7** |
| Tables як окрема велика тема | **M4** |
| DataStore довжини траси | M4+ |

Сьогоднішня перемога - **перестати копипастити геометрію руками**, коли вистачає циклу.

**Зроби зараз (2 хв):** прибери з маршруту здачі все, що виходить за межі цього уроку.`,
 },
 {
 title: "Погляд у 3.6",
 content: `У **3.6** functions стануть головною темою: параметри, return, scope, рефактор KillBrick і логічно - \`spawnPad(i)\` замість товстого тіла for.

Сьогоднішній цикл - ідеальна заготовка під рефактор. Не роздувай його до «всієї гри» з blink, kill і GUI всередині одного for. Лиши генератор чистим - завтра винесеш кроки в function спокійно.

**Зроби зараз (2 хв):** допиши в Note один рядок, що переносиш у наступний урок.`,
 },
 ],
 },
 practice: {
 title: "Практика: TrackSpawn_v1",
 duration: 30,
 description: `**Мета:** рядок платформ через for без ручного Ctrl+D на кожну.

Відкрий Place після 3.4.`,
 parts: [
 {
 title: "Part A - Разом (10 хв)",
 content: `1. Folder \`TrackSpawn_v1\`.
2. Разом: for i = 1, 5 print.
3. Instance.new Part у циклі з Position від i.
4. Подивіться дублікати після другого Play - обговоріть очистку.

**Критерій:** усі бачать лічильник i в іменах і позиціях.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Part B - Самостійно (12 хв)",
 content: `1. count ≥ 6, свій start і step.
2. Очистка старих Pad_ через ipairs перед спавном.
3. Аудит print у кінці.
4. Вбудуй трасу в світ після чекпоінта / парку.
5. Save \`Lesson 3.5 - TrackSpawn_v1\`.

**Критерій:** стабільна кількість плит після 2–3 Stop/Play.

**Зроби зараз (4 хв):** зміни одне значення в table/Config і підтверди нову поведінку.`,
 },
 {
 title: "Part C - Челендж (8 хв)",
 content: `Обери один:
- зигзаг: чергуй зсув по Z від \`i % 2\`;
- різні Size від i (обережно зі стрибками);
- після спавну ipairs фарбує кожну третю плиту іншим кольором.

**Не роби:** DataStore, Remote, повний function-модуль «на виріст», while без wait для спавну (спавн - for, не вічний while).

**Зроби зараз (4 хв):** зроби save/load або чесно задокументуй mock-режим у Output.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Кожен Play додає ще один ряд плит",
 fix: "Перед спавном очищай старі Pad_ через ipairs + Destroy.",
 },
 {
 mistake: "Position однаковий для всіх i",
 fix: "Додай step * (i - 1) (або еквівалент) до start.",
 },
 {
 mistake: "Destroy() усього Folder разом зі Script",
 fix: "Фільтруй за ім’ям або тримай Script поза папкою плит.",
 },
 {
 mistake: "Плутає for i з while true",
 fix: "for - відома кількість кроків; while true - ритм у часі з wait.",
 },
 {
 mistake: "Спавн у корені Workspace без Folder",
 fix: "Ізолюй у TrackSpawn_v1 - легше чистити й здавати.",
 },
 {
 mistake: "LocalScript для Instance.new у Workspace",
 fix: "Звичайний Script: будівництво світу на сервері.",
 },
 {
 mistake: "Чекає tables M4, щоб зробити список",
 fix: "GetChildren уже дає список для ipairs; окремі tables - пізніше.",
 },
 ],
 quiz: {
 title: "Тест 3.5 - for / ipairs",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Артефакт уроку 3.5 - це:",
 options: [
          "TrackSpawn_v1 з for-генератором платформ",
          "Лише одна Part вручну",
          "DataStore сейв",
          "Win ScreenGui",
        ],
 correctAnswer: 0,
 explanation: "Спавн траси циклом.",
 },
 {
 id: "q2",
 type: MC,
 question: "У for i = 1, 6 do змінна i:",
 options: [
          "Завжди 0",
          "Пробігає значення 1…6",
          "Це RemoteEvent",
          "Це Material",
        ],
 correctAnswer: 1,
 explanation: "Лічильник циклу.",
 },
 {
 id: "q3",
 type: MC,
 question: "ipairs зручний, коли:",
 options: [
          "Треба вічний ритм без списку",
          "Треба лише змінити Lighting",
          "Є список дітей / елементів і треба їх обійти",
          "Заборонено GetChildren",
        ],
 correctAnswer: 2,
 explanation: "Обхід наявного списку.",
 },
 {
 id: "q4",
 type: MC,
 question: "Instance.new(\"Part\") створює:",
 options: [
          "SoundService",
          "SpawnLocation обов’язково",
          "ScreenGui",
          "Нову Part у пам’яті (потрібен Parent)",
        ],
 correctAnswer: 3,
 explanation: "Створення інстанса.",
 },
 {
 id: "q5",
 type: MC,
 question: "Навіщо step * (i - 1) у Position?",
 options: [
          "Щоб увімкнути Neon",
          "Щоб зсувати кожну наступну плиту на крок",
          "Щоб видалити Humanoid",
          "Щоб зберегти DataStore",
        ],
 correctAnswer: 1,
 explanation: "Ряд у просторі.",
 },
 {
 id: "q6",
 type: MC,
 question: "Чому чистять старі Pad_ перед спавном?",
 options: [
          "Бо Roblox так вимагає для Terrain",
          "Бо ipairs заборонений інакше",
          "Щоб Stop/Play не плодив дублікати",
          "Щоб вимкнути Snap",
        ],
 correctAnswer: 2,
 explanation: "Анти-дублікати.",
 },
 {
 id: "q7",
 type: MC,
 question: "while true і for i = 1, n відрізняються тим, що:",
 options: [
          "for має відому кількість повторів; while true - доки не зупинять (з wait)",
          "for завжди зависає",
          "while не існує в Luau",
          "for працює лише в LocalScript",
        ],
 correctAnswer: 0,
 explanation: "Різні задачі циклів.",
 },
 {
 id: "q8",
 type: MC,
 question: "\"Pad_\" .. i дає:",
 options: [
          "Видалення Part",
          "Constraint",
          "Atmosphere",
          "Рядок імені з номером",
        ],
 correctAnswer: 3,
 explanation: "Конкатенація рядка.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що з цього НЕ тема 3.5?",
 options: [
          "for i = 1, n",
          "ipairs + GetChildren",
          "Повний урок function / return / scope",
          "Instance.new для плит",
        ],
 correctAnswer: 2,
 explanation: "Functions - 3.6.",
 },
 {
 id: "q10",
 type: MC,
 question: "Який Script для спавну плит у світі?",
 options: [
          "LocalScript у StarterGui обов’язково",
          "Звичайний Script",
          "Лише ModuleScript без Parent",
          "Script у Lighting only",
        ],
 correctAnswer: 1,
 explanation: "Серверне будівництво.",
 },
 {
 id: "q11",
 type: MC,
 question: "if i % 2 == 0 всередині for - це:",
 options: [
          "Нова заборонена тема",
          "DataStore",
          "HingeConstraint",
          "Вже відомий if + арифметика для чергування",
        ],
 correctAnswer: 3,
 explanation: "Спіраль 1.4.",
 },
 {
 id: "q12",
 type: MC,
 question: "Аудит ipairs після спавну допомагає:",
 options: [
          "Перевірити імена й Position у Output",
          "Публікувати Place",
          "Вимкнути CanQuery глобально",
          "Створити RemoteFunction",
        ],
 correctAnswer: 0,
 explanation: "Перевірка результату.",
 },
 {
 id: "q13",
 type: MC,
 question: "Наступний логічний рефактор у 3.6:",
 options: [
          "Прибрати всі цикли назавжди",
          "Замінити Part на Terrain обов’язково",
          "Винести створення плити в function",
          "Видалити чекпоінти",
        ],
 correctAnswer: 2,
 explanation: "Спіраль functions.",
 },
 {
 id: "q14",
 type: MC,
 question: "Рекомендований Save:",
 options: [
          "Untitled",
          "Module 12 Showcase",
          "Lesson 2.2 only",
          "Lesson 3.5 - TrackSpawn_v1",
        ],
 correctAnswer: 3,
 explanation: "Явний артефакт.",
 },
 {
 id: "q15",
 type: MC,
 question: "Наступний урок:",
 options: [
          "Publish only",
          "Functions",
          "Toolbox admin",
          "Race Remotes",
        ],
 correctAnswer: 1,
 explanation: "3.6 - functions.",
 },
 ],
 },
}

export const ukLesson36 = {
 lessonId: "lesson-roblox-3-6",
 moduleId: "module-03",
 order: 6,
 title: "3.6 - Functions",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Оголосити local function і викликати її з кількох місць",
 "Передати параметри і повернути значення через return",
 "Пояснити scope: де живе змінна всередині / зовні функції",
 "Рефакторити KillBrick через спільну function",
 "За бажанням винести spawnPad(i) з генератора траси 3.5",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - прибрати копипаст у голові коду",
 content: `Ти вже писав \`local function\` навколо дверей і видимості платформ «для акуратності». Сьогодні functions - **головна тема**: іменовані блоки з параметрами, \`return\` і зрозумілим scope.

Досі курс дозволяв копипаст: три kill-скрипти, товстий for зі створенням Part. Це нормально для навчання. Але щойно треба змінити одне правило смерті в усіх плитах - копипаст стає пасткою. Function дає одне місце, де живе правило.

Це не «новий жанр гри». Геймплей лишається тим самим: лава вбиває, траса спавниться. Змінюється лише те, **як** ти це записуєш у Script - щоб завтрашній ти й викладач читали швидше.

**Артефакт:** \`FunctionsKit_v1\`
- рефактор kill: одна \`killCharacter(character)\` (або подібна назва) + виклик із Touched
- debounce лишається і працює як раніше
- бонус: \`spawnPad(i, folder, start, step)\` у генераторі траси
- Save: \`Lesson 3.6 - FunctionsKit_v1\`

**Старт:** Place після 3.5. Не починай порожній Baseplate - візьми KillLane і/або TrackSpawn і **перепиши** повтори. Геймплей після рефактору має лишитись не гіршим: якщо після «прикраси коду» смерть зникла - рефактор провалено.

**Що не сьогодні:** глибокий LocalScript+GUI (**3.7**), бос-здача всієї міні-гри (**3.8**), ModuleScript/Config (**M4**). Сьогодні - function у звичайному Script.

**Зроби зараз (2 хв):** відкрий Place після попереднього уроку і підготуй робочу зону для артефакту цього заняття.`,
 },
 {
 title: "Навіщо function, якщо код і так працює",
 content: `Коли той самий шматок повторюється в трьох плитах kill або в тілі for на півтора екрана - легко виправити одну копію й забути інші. Function дає **одне місце правди**.

| Без function | З function |
|--------------|------------|
| Три майже однакові Touched | Одна \`killCharacter\`, три короткі виклики |
| Товстий for зі створенням Part | \`spawnPad(...)\` + тонкий for |
| Важко назвати «що робить блок» | Ім’я функції = заголовок дії |

Function не робить гру «магічнішою» і не замінює Touched чи while. Вона пакує **повторювану дію** під ім’ям, щоб мозок і викладач швидше читали Script.

Добре ім’я: \`killCharacter\`, \`spawnPad\`, \`clearPads\`, \`setVisible\`. Погане: \`doStuff\`, \`f1\`, \`aaa\`, \`func\`.

Якщо після перейменування в function ти сам через день розумієш, що робить рядок виклику - ім’я вдале. Якщо треба лізти всередину щоразу - перейменуй.

**Зроби зараз (2 хв):** знайди у своєму Place два місця з майже однаковим кодом - кандидати на function.`,
 },
 {
 title: "local function - оголошення і виклик",
 content: `Базовий каркас:

\`\`\`lua
local function sayHi(name)
	print("Привіт,", name)
end

sayHi("Міша")
sayHi("Кіра")
\`\`\`

- \`local function sayHi\` - оголосили
- \`name\` - **параметр** (вхідне місце)
- \`sayHi("Міша")\` - **виклик** з аргументом

Оголошення без виклику - як інструмент у шухляді: лежить, але роботу не робить. Після рефактору завжди шукай місце, де function **викликається**.

\`local function\` тримає ім’я в локальній області цього Script - для курсу це правильна звичка. Глобальний \`function sayHi()\` без local легко плутає імена між скриптами в одному Place.

Тримай оголошення **вище** першого виклику: так очі не бігають по файлу. Викликати можна багато разів з різними аргументами - одне тіло, багато використань.

**Зроби зараз (4 хв):** міні-Script із sayHi, два виклики, Output; потім можеш видалити експеримент.`,
 },
 {
 title: "Параметри - вхідні дані",
 content: `Параметри - «дірки» в оголошенні, які заповнюєш аргументами під час виклику.

\`\`\`lua
local function setPadColor(pad, color)
	if pad and pad:IsA("BasePart") then
		pad.Color = color
	end
end

local p = workspace:FindFirstChild("Pad_1")
setPadColor(p, Color3.fromRGB(255, 200, 50))
\`\`\`

Кілька параметрів розділяєш комами. Порядок важливий: перший аргумент лягає в перший параметр. Якщо переплутаєш pad і color місцями - отримаєш дивні помилки або тишу.

Якщо аргумент \`nil\` (не знайшли Part) - перевіряй \`if pad then\` всередині. Це та сама обережність, що з Humanoid у kill: спочатку переконайся, що об’єкт є, потім чіпай властивості.

Не плутай ім’я параметра з об’єктом у Workspace: параметр \`pad\` - змінна **всередині** виклику. Ти передаєш у неї конкретну Part аргументом \`p\`.

Скільки параметрів «нормально» на старті? Два–чотири. Якщо набирається вісім - можливо, функція робить занадто багато й її варто розбити пізніше.

**Зроби зараз (5 хв):** function з двома параметрами на своїй Part (колір або Transparency) і два різні виклики.`,
 },
 {
 title: "return - результат назовні",
 content: `\`return\` віддає значення тому, хто викликав функцію, і **завершує** її в цей момент. Рядки після return у тому ж виклику вже не виконаються.

\`\`\`lua
local function findHumanoid(character)
	if not character then
		return nil
	end
	return character:FindFirstChildOfClass("Humanoid")
end

local character = workspace:FindFirstChild("TestModel")
local hum = findHumanoid(character)
if hum then
	print("Health", hum.Health)
else
	print("Humanoid немає")
end
\`\`\`

Без return function лише «щось робить у світі» (побічний ефект: print, зміна Health). З return - ще й **відповідає** значенням, яке можна зберегти в \`local hum = ...\`.

Можна \`return\` без значення - просто рано вийти. Ти вже так робив у Touched, коли немає Humanoid; тепер той самий жест всередині іменованої function.

Не плутай return функції з return з Connect-колбека: обидва слова однакові, але виходять із **різних** блоків. Return у \`killCharacter\` не зупиняє весь Touched-обробник сам по собі - лише тіло function.

**Зроби зараз (5 хв):** function, що повертає Humanoid або nil; обгорни виклик у if і перевір обидві гілки (є / немає).`,
 },
 {
 title: "Scope - де живе змінна",
 content: `**Scope** - область видимості: звідки змінну ще видно й де вона вже «померла».

\`\`\`lua
local outside = "я зовні"

local function demo()
	local inside = "я всередині"
	print(outside) -- видно: зовнішня local доступна
	print(inside)
end

demo()
-- print(inside) -- помилка: inside тут не існує
\`\`\`

Правила простими словами:
- \`local\` нагорі Script - видно функціям нижче в цьому Script
- \`local\` всередині function - живе лише під час цього виклику
- параметр - теж «внутрішній» на час виклику

Типова помилка після рефактору kill: \`local debounce = false\` **всередині** \`killCharacter\`. Тоді кожен виклик створює новий debounce з нуля, і захист від повторів не працює. Debounce має лишатись **назовні**, на рівні Script, як у 3.2.

Інша плутанина: два параметри з тими самими іменами, що й зовнішні змінні. Це дозволено, але всередині function ім’я параметра «затінює» зовнішнє. Для навчання краще не гратись у затінення без потреби.

**Зроби зараз (4 хв):** оголоси inside у function; спробуй print зовні й подивись помилку в Output - потім прибери експеримент.`,
 },
 {
 title: "Рефактор KillBrick - головний артефакт",
 content: `Було (у кожній плиті): довгий Touched із пошуком Humanoid і Health = 0.

Стає:

\`\`\`lua
local part = script.Parent
local debounce = false

local function killCharacter(character)
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	if not humanoid then
		return false
	end
	humanoid.Health = 0
	return true
end

part.Touched:Connect(function(hit)
	if debounce then
		return
	end
	local character = hit.Parent
	if not character then
		return
	end

	debounce = true
	killCharacter(character)
	task.wait(1)
	debounce = false
end)
\`\`\`

Що виграли:
- ім’я \`killCharacter\` читається як речення
- return false/true можна використати для діагностики («кого не знайшли»)
- наступну плиту копипастиш уже з готовою function
- у M4 колись винесеш таке в ModuleScript - але сьогодні не треба

Зверни увагу на запис \`character and character:FindFirstChild...\`: якщо character = nil, пошук Humanoid не виконається. Це короткий захист замість окремого if на два поверхи.

Важливо: після рефактору **прожени Play**. Якщо function красива, а смерть зникла - ти забув виклик у Connect або лишив старий закоментований код без нового. Рефактор без робочого геймплею не зараховується.

Debounce лишається зовні - бо має переживати багато спрацювань Touched. Function лише виконує «вбити цього character зараз».

Скопіюй оновлений Script на 2–3 плити KillLane. Так ти відчуєш вигоду: міняєш правило смерті в одному шаблоні, розносиш копипастом уже короткий файл.

**Зроби зараз (10 хв):** рефактор хоча б однієї kill-плити + тест смерті без спаму в Output.`,
 },
 {
 title: "Бонус: spawnPad для траси 3.5",
 content: `Якщо лишився генератор TrackSpawn:

\`\`\`lua
local function spawnPad(i, folder, start, step)
	local pad = Instance.new("Part")
	pad.Name = "Pad_" .. i
	pad.Size = Vector3.new(6, 1, 6)
	pad.Anchored = true
	pad.Position = start + Vector3.new(step * (i - 1), 0, 0)
	pad.Parent = folder
	return pad
end

for i = 1, 6 do
	spawnPad(i, folder, start, step)
end
\`\`\`

For лишається тонким: лише лічильник і виклик. Деталі Part - в одному місці. Зміна Size всіх плит = одна правка в \`spawnPad\`. Саме це відчуття «одне місце правди» і є сенс уроку.

return pad зручний, якщо одразу хочеш щось зробити з новоствореною плитою (пофарбувати, зберегти посилання). Якщо не треба - результат виклику можна не зберігати.

Очистку ipairs можна обгорнути в \`clearPads(folder)\` - теж валідний бонус замість spawnPad, якщо трасу вже здавав і не хочеш чіпати спавн.

Не забудь: очистка як і раніше має йти **перед** циклом створення, інакше function лише красиво плодитиме дублікати.

**Зроби зараз (8 хв):** spawnPad або clearPads - для «відмінно» досить одного бонуса плюс kill-рефактор.`,
 },
 {
 title: "Коли не треба горобити function",
 content: `Не винось у function один рядок \`print("ok")\` «бо так солідніше». Function має сенс, коли:
- блок повторюється
- блок довгий і хоче зрозумілого імені
- блок повертає щось корисне для інших місць коду

Не роби function, яка всередині знову копипастить три майже однакові while - спочатку побач повтор, потім пакуй.

Не ховай Remote, DataStore чи «майбутній інвентар» у function про запас. Межі модуля важливіші за універсальний комбайн на сто рядків.

Якщо після рефактору стало **важче** читати (десять мікрофункцій по два рядки) - відкоти зайве. Читабельність важливіша за кількість function у файлі.

Також не перетворюй весь Touched-колбек на function лише щоб «все було у function». Колбек Connect і так блок. Винось те, що має ім’я дії: kill, spawn, clear, setVisible.

**Зроби зараз (2 хв):** викресли зі списку рефакторів те, що ще не повторюється.`,
 },
 {
 title: "Play-тест і Save",
 content: `**Чекліст FunctionsKit_v1:**
- [ ] Є щонайменше одна осмислена \`local function\` з параметром
- [ ] Kill (або spawn) викликає її, а не дублює тіло
- [ ] debounce / стан зовні, якщо має переживати виклики
- [ ] return використано хоча б у одному місці (значення або ранній вихід)
- [ ] Play: поведінка світу не гірша, ніж до рефактору
- [ ] Save: \`Lesson 3.6 - FunctionsKit_v1\`

На здачі поясни: параметр = вхід, return = вихід, scope = де видно змінну.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Межа уроку",
 content: `| Не сьогодні | Коли |
|-------------|------|
| ModuleScript + require Config | **M4** |
| LocalScript GUI кнопки / win UI | **3.7** |
| Повна інтеграція міні-гри | **3.8** |
| ООП / метатаблиці | далеко за курсом M3 |

Сьогоднішня перемога - **рефактор без зміни геймплею на гірше**.

**Зроби зараз (2 хв):** прибери з маршруту здачі все, що виходить за межі цього уроку.`,
 },
 {
 title: "Погляд у 3.7",
 content: `У **3.7** порівняєш Script і LocalScript глибше: StarterGui, ScreenGui, Frame, TextButton, win UI. Function знадобляться й там (наприклад \`showWin()\` чи \`setButtonEnabled(btn, on)\`), але спочатку закрий серверний рефактор kill/spawn.

Не починай уже малювати повний екран перемоги «бо function вмію». Спочатку Save з FunctionsKit, потім GUI-урок - інакше змішаєш дві складні теми в один вечір і нічого не здаси чисто.

**Зроби зараз (2 хв):** допиши в Note один рядок, що переносиш у наступний урок.`,
 },
 ],
 },
 practice: {
 title: "Практика: FunctionsKit_v1",
 duration: 30,
 description: `**Мета:** function з параметрами/return + рефактор kill (і бажано spawn).

Відкрий Place після 3.5.`,
 parts: [
 {
 title: "Part A - Разом (10 хв)",
 content: `1. Міні-приклад sayHi / findHumanoid.
2. Разом винесіть пошук Humanoid + Health у killCharacter.
3. Підключіть до однієї kill-плити.
4. Перевірте debounce зовні.

**Критерій:** смерть працює, код коротший у Touched.

**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`,
 },
 {
 title: "Part B - Самостійно (12 хв)",
 content: `1. Рефактор 2–3 kill-плит на ту саму ідею (копипаст Script з function ок).
2. Додай return true/false і один print за бажанням.
3. Бонус: spawnPad або clearPads у TrackSpawn.
4. Save \`Lesson 3.6 - FunctionsKit_v1\`.

**Критерій:** викладач бачить іменовану function і робочий Play.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Part C - Челендж (8 хв)",
 content: `Обери один:
- \`setVisible(platform, isVisible)\` для blink з 3.4;
- \`formatTime(elapsed)\` з return рядка для таймера 3.3;
- одна function з 3 параметрами на спавн (folder, i, step).

**Не роби:** ModuleScript «на виріст», RemoteEvent, повний win-GUI 3.7.

**Зроби зараз (4 хв):** зроби один Remote-виклик і зафіксуй, хто приймає рішення - клієнт чи сервер.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "debounce оголошений local усередині function",
 fix: "Винеси debounce на рівень Script - він має жити між Touched.",
 },
 {
 mistake: "Function оголошена, але ніде не викликається",
 fix: "Після рефактору має лишитись виклик killCharacter(...) у Connect.",
 },
 {
 mistake: "Чекає, що inside-змінна видима зовні",
 fix: "Це scope. Поверни значення return або тримай local зовні.",
 },
 {
 mistake: "Параметр назвав як Part у Workspace і плутає їх",
 fix: "Параметр - локальна змінна виклику; передавай pad явно.",
 },
 {
 mistake: "Рефактор зламав гру, але function «гарна»",
 fix: "Спочатку віднови поведінку Play, потім красу імен.",
 },
 {
 mistake: "Глобальний function без local",
 fix: "У курсі пиши local function у Script.",
 },
 {
 mistake: "Пише ModuleScript замість local function",
 fix: "ModuleScript - M4. Сьогодні все в одному Script.",
 },
 ],
 quiz: {
 title: "Тест 3.6 - Functions",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 3.6:",
 options: [
          "Functions: параметри, return, scope, рефактор kill",
          "Новий Constraint",
          "DataStore",
          "Publish Showcase",
        ],
 correctAnswer: 0,
 explanation: "Урок functions.",
 },
 {
 id: "q2",
 type: MC,
 question: "Параметр функції - це:",
 options: [
          "Обов’язковий RemoteEvent",
          "Вхідне ім’я/значення, яке передають під час виклику",
          "Тип Terrain",
          "Лише Material",
        ],
 correctAnswer: 1,
 explanation: "Вхід функції.",
 },
 {
 id: "q3",
 type: MC,
 question: "return у функції:",
 options: [
          "Завжди видаляє Part",
          "Вмикає Lighting",
          "Повертає значення викликачу і завершує function",
          "Створює SpawnLocation",
        ],
 correctAnswer: 2,
 explanation: "Вихід і кінець виклику.",
 },
 {
 id: "q4",
 type: MC,
 question: "local всередині function ззовні:",
 options: [
          "Видно в усьому Place",
          "Автоматично стає DataStore",
          "Ламає Anchored",
          "Зазвичай не видно (інший scope)",
        ],
 correctAnswer: 3,
 explanation: "Scope.",
 },
 {
 id: "q5",
 type: MC,
 question: "Чому debounce для kill тримають зовні function?",
 options: [
          "Бо Roblox забороняє local у function",
          "Бо стан має жити між різними викликами Touched",
          "Бо так швидше Snap",
          "Бо LocalScript вимагає",
        ],
 correctAnswer: 1,
 explanation: "Стан між подіями.",
 },
 {
 id: "q6",
 type: MC,
 question: "local function у курсі краще за голий function, бо:",
 options: [
          "Інакше не працює print",
          "Вимикає Touched",
          "Обмежує ім’я локальною областю Script",
          "Створює GUI",
        ],
 correctAnswer: 2,
 explanation: "Звичка локальності.",
 },
 {
 id: "q7",
 type: MC,
 question: "Рефактор KillBrick означає:",
 options: [
          "Винести спільну логіку в function без погіршення Play",
          "Видалити всі небезпеки",
          "Замінити Part на Terrain",
          "Увімкнути Party Mode",
        ],
 correctAnswer: 0,
 explanation: "Чистіше, та сама поведінка.",
 },
 {
 id: "q8",
 type: MC,
 question: "spawnPad(i, folder, start, step) - приклад:",
 options: [
          "Constraint",
          "Atmosphere",
          "Toolbox hygiene",
          "Function з кількома параметрами",
        ],
 correctAnswer: 3,
 explanation: "Бонус-рефактор траси.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що з цього НЕ тема 3.6?",
 options: [
          "return",
          "scope",
          "ModuleScript + require Config",
          "параметри",
        ],
 correctAnswer: 2,
 explanation: "ModuleScript - M4.",
 },
 {
 id: "q10",
 type: MC,
 question: "Якщо function оголошена, але Touched лишив старий довгий код:",
 options: [
          "Рефактор завершено",
          "Потрібно викликати function з Connect",
          "Обов’язково DataStore",
          "Видалити Humanoid",
        ],
 correctAnswer: 1,
 explanation: "Виклик обов’язковий.",
 },
 {
 id: "q11",
 type: MC,
 question: "return nil з findHumanoid означає:",
 options: [
          "Обов’язковий краш Studio",
          "Успішний kill",
          "Новий SpawnLocation",
          "Людського Humanoid не знайдено / немає character",
        ],
 correctAnswer: 3,
 explanation: "Порожній результат.",
 },
 {
 id: "q12",
 type: MC,
 question: "Коли function зайва?",
 options: [
          "Коли це один простий рядок без повтору",
          "Коли блок повторюється в трьох місцях",
          "Коли є параметри",
          "Коли є return",
        ],
 correctAnswer: 0,
 explanation: "Не горобити зайвого.",
 },
 {
 id: "q13",
 type: MC,
 question: "Який Script для рефактору kill у Workspace?",
 options: [
          "LocalScript у StarterGui обов’язково",
          "Лише ModuleScript",
          "Звичайний Script",
          "Script у SoundService",
        ],
 correctAnswer: 2,
 explanation: "Серверна логіка світу.",
 },
 {
 id: "q14",
 type: MC,
 question: "Рекомендований Save:",
 options: [
          "Untitled",
          "Module 9 Remotes",
          "Lesson 1.1 only",
          "Lesson 3.6 - FunctionsKit_v1",
        ],
 correctAnswer: 3,
 explanation: "Явний артефакт.",
 },
 {
 id: "q15",
 type: MC,
 question: "Наступний урок:",
 options: [
          "DataStore tables",
          "LocalScript + GUI",
          "Toolbox Free admin",
          "Publish only",
        ],
 correctAnswer: 1,
 explanation: "3.7 - GUI на клієнті.",
 },
 ],
 },
}

export const ukLesson37 = {
 lessonId: "lesson-roblox-3-7",
 moduleId: "module-03",
 order: 7,
 title: "3.7 - LocalScript + GUI",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Пояснити різницю Script vs LocalScript і коли який ставити",
 "Зібрати ієрархію StarterGui → ScreenGui → Frame → TextLabel/TextButton",
 "Показати екран перемоги (win UI) через Visible",
 "Підключити TextButton до MouseButton1Click і сховати панель",
 "Зв’язати фініш міні-гри (Touched на сервері) з GUI через Attribute без Remotes",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - екран, який говорить «ти фінішував»",
 content: `У 3.3 ти вже бачив легкий \`TimerGui\`: один \`TextLabel\` і \`LocalScript\`. Сьогодні GUI - **головна тема**: зрозуміти, чому інтерфейс живе на клієнті, зібрати нормальну ієрархію з \`Frame\` і \`TextButton\`, і зробити **екран перемоги**, коли гравець дістався фінішу.

Це логічний міст до бос-здачі 3.8: міні-гра без «ти виграв» на екрані відчувається обірваною. Двері, kill, чекпоінти, платформи й functions уже є - лишається шар, який бачить гравець поверх світу. Без цього шару викладач бачить лише print у Output, а гравець - тишу після фінішу.

Подумай так: Workspace - сцена, StarterGui - субтитри й титри. Сцена без титрів інколи ок для експерименту. Здача модуля без титрів перемоги - ніби фільм, який обривається на півслові.

**Артефакт:** \`WinUI_v1\`
- \`StarterGui\` → \`WinGui\` (\`ScreenGui\`) з \`WinFrame\`, написом і кнопкою
- фінішна Part \`FinishPad\` з серверним Script (Touched + debounce)
- сервер ставить гравцю Attribute \`HasWon\`
- LocalScript показує \`WinFrame\`, кнопка ховає панель
- Save: \`Lesson 3.7 - WinUI_v1\`

**Старт:** Place після 3.6 (FunctionsKit + маршрут 3.1–3.5). Не починай порожній Baseplate - фініш має сенс лише на кінці вже зібраної траси. Якщо траси немає, швидко віднови короткий шлях: старт → шматок ризику → FinishPad. Краще короткий живий маршрут, ніж красивий GUI на порожнечі.

**Що не сьогодні:** RemoteEvent / RemoteFunction (**M9**), ModuleScript/Config (**M4**), DataStore, магазин, TweenService-анімації панелей, повна бос-здача з Badge і 60″ презентацією (**3.8**). Сьогодні - клієнтський UI і чесний міст «сервер вирішив → екран показав».

Якщо дуже хочеться «кнопку рестарту рівня» - запиши ідею в нотатку. Повний рестарт із клієнта без Remotes легко стає хаком; у цьому уроці чесно закриваємо панель і вчимо ролі Script/LocalScript.

**Зроби зараз (2 хв):** відкрий Place після попереднього уроку і підготуй робочу зону для артефакту цього заняття.`,
 },
 {
 title: "Script vs LocalScript - дві різні роботи",
 content: `Обидва виглядають як «код у Explorer». Різниця не в синтаксисі Luau, а в **де виконується** і **що йому дозволено**. Поки плутаєш місце - ловиш найзліші баги новачка: «код є, у Play тиша».

| | Script | LocalScript |
|--|--------|-------------|
| Де працює | на сервері | на клієнті гравця |
| Типові задачі | двері, kill, чекпоінт, фініш-правило | HUD, кнопки, локальний таймер |
| Де ставити в курсі | Workspace / ServerScriptService | StarterGui, StarterPlayerScripts |
| Якщо покласти «не туди» | LocalScript у Part світу часто **мовчить** | серверний Script у ScreenGui погано підходить для особистої кнопки |

Правило модуля: **світ і правила гри** - Script. **Особистий екран** - LocalScript. Ти вже так робив інтуїтивно: kill на Script, таймер на LocalScript. Сьогодні це правило стає свідомим - його можна пояснити однолітку за 30 секунд.

Чому не можна «все на LocalScript»? Бо тоді кожен клієнт сам вирішує смерть і фініш - у мультиплеєрі це хаос і чіти. Навіть у соло-тесті погана звичка: завтра прийде друг у твій Place і правила роз’їдуться.

Чому не можна «все на Script у StarterGui»? Бо оновлення особистого напису й кліків по кнопці природніше і стабільніше на клієнті. Сервер може знати факт перемоги; малювати рамку зручніше там, де живе PlayerGui.

Пізніше (**M9**) з’являться Remotes, щоб клієнт і сервер розмовляли явно. Сьогодні обходимось Attribute: сервер пише факт «виграв», клієнт лише малює. Це не « костиль назавжди» - це правильний навчальний міст без стрибка через три модулі вперед.

**Зроби зараз (3 хв):** у своєму Place знайди один Script світу і один LocalScript таймера. Поруч у нотатці напиши «сервер / клієнт». Якщо LocalScript висить на KillPart - перенеси логіку смерті на звичайний Script.`,
 },
 {
 title: "StarterGui - чому UI не кладуть у Workspace",
 content: `**StarterGui** - папка-шаблон. Коли гравець заходить у Place, Roblox **клонує** вміст StarterGui у його особистий PlayerGui. Тому кожен бачить свій \`WinGui\`, а не спільну Part у світі.

Якщо побудуєш ScreenGui прямо в Workspace «для краси в Explorer», гравці його або не побачать як HUD, або побачать дивно. Навчальний шлях курсу: **StarterGui → ScreenGui → елементи**. Запам’ятай цей ланцюжок як адресу квартири: будинок / поверх / кімната.

У Play під час тесту дивись не лише Workspace, а **Players → [ТвійНік] → PlayerGui**. Саме там живе робоча копія. Якщо правиш лише StarterGui під час Play, зміни можуть не потрапити в уже склонований PlayerGui - Stop і Play знову після правок шаблону. Це класична пастка: «я змінив текст, а на екрані старе» - бо дивишся не туди.

\`BillboardGui\` з 3.1 лишається в світі над Part - це підказка в 3D. \`ScreenGui\` - шар на екрані. Не замінюй одне іншим: Billboard не стає кнопкою «Грати ще», ScreenGui не замінює напис «Відкрити» над дверима. Різні задачі - різні контейнери. На здачі добре сказати вголос саме цю різницю: викладач одразу чує, що ти не плутаєш HUD і world-hint.

Ще одна дрібниця: не розмножуй п’ять ScreenGui «на всяк випадок». Для уроку достатньо \`TimerGui\` і \`WinGui\` (можна навіть один ScreenGui з двома Frame - теж ок, якщо порядок у Explorer чистий).

**Зроби зараз (4 хв):** відкрий StarterGui, переконайся, що TimerGui з 3.3 там (або віднови його). Запам’ятай шлях у PlayerGui під час Play.`,
 },
 {
 title: "Ієрархія: ScreenGui → Frame → Label / Button",
 content: `Голий TextLabel «висить» у повітрі екрана. Для win UI потрібен **контейнер** - \`Frame\`: фон, межі, місце для заголовка й кнопки. Контейнер дає ієрархію оку: спочатку бачиш картку, потім текст, потім дію.

Збери так:

\`\`\`
StarterGui
  WinGui (ScreenGui)
    WinFrame (Frame)
      TitleLabel (TextLabel)
      HintLabel (TextLabel)
      OkButton (TextButton)
\`\`\`

Властивості на старті:
- \`WinGui.ResetOnSpawn\` - для курсу часто \`false\`, щоб панель не злітала дивно після смерті під час тестів (можеш порівняти обидва варіанти пізніше на бос-здачі)
- \`WinFrame.Visible = false\` - панель схована, доки немає перемоги
- Size / Position / AnchorPoint: рамка по центру, не на весь екран «стіною»
- TitleLabel: наприклад «Фініш!»
- HintLabel: коротко «Ти пройшов міні-гру»
- OkButton: текст «Ок» або «Далі»

UDim2 і Scale: краще триматись відносних розмірів (Scale), щоб на різних екранах панель не тікала. Absolute пікселі ок для тонкої підкрутки, але не будуй усе лише в offset «на око свого монітора» - на ноутбуці напарника все «поїде».

Не плутай \`Frame\` з Part. Frame - 2D елемент GUI. Його «колір» - BackgroundColor3, не BrickColor стіни. Border / UICorner можна підкрутити для охайності, але не витрачай пів уроку на ідеальний стиль: спочатку Visible-логіка, потім фарба.

ZIndex: якщо кнопка «не клікається», перевір, чи прозорий Frame не лежить зверху. Це частіше, ніж здається.

**Зроби зараз (10 хв):** ієрархія WinGui зібрана, у Play (навіть зі Visible true тимчасово) рамка читається по центру. Потім знову Visible false.`,
 },
 {
 title: "Поліш таймера: Frame навколо старого Label",
 content: `Поки збираєш win UI, підкрути й \`TimerGui\` з 3.3 - той самий принцип контейнера. Модуль має виглядати єдиним продуктом: і час, і перемога - з однієї школи UI.

Було: ScreenGui → TextLabel. Стає зручніше: ScreenGui → Frame \`TimerFrame\` → TextLabel. Фон напівпрозорий, відступ, щоб цифри не зливались із небом і Terrain. Не роби таймер на пів екрана - він помічник, не головний герой. Головний герой сьогодні - WinFrame.

Код секундоміра майже той самий: LocalScript лишається біля Label (або шукає його через \`script.Parent\` / \`FindFirstChild\`). Не переписуй логіку часу «з нуля» - лише упакуй вигляд. Якщо під час полішу зламав while і прибрав \`task.wait\` - Studio нагадає зависанням. Поверни wait негайно.

Це важливо для здачі 3.8: викладач одразу бачить, що HUD зібраний свідомо, а не «один Label випадково в куті». Також легше пояснити: «ось Frame таймера, ось Frame перемоги».

Якщо таймера немає - віднови мінімум із 3.3 (while + task.wait + format). Не чіпай DataStore і таблицю рекордів. Не роби «паузу таймера на фініші» обов’язковою - приємно, але не блокер уроку. Якщо встигнеш: коли HasWon стає true, можна просто перестати оновлювати текст (акуратно вийшовши з циклу) - це вже челендж, не база.

**Зроби зараз (6 хв):** TimerFrame виглядає охайніше; час як і раніше тікає.`,
 },
 {
 title: "FinishPad на сервері - хто вирішує перемогу",
 content: `Фініш - **правило світу**, отже Script на Part \`FinishPad\` (або в ServerScriptService з посиланням на Part). Саме тут вирішується: «ця спроба зарахована». GUI лише повідомляє новину.

1. Part на кінці маршруту: яскравий колір, Anchored, ім’я \`FinishPad\`, можна Billboard «ФІНІШ» (навичка 3.1).
2. Touched + Humanoid + debounce - той самий каркас, що kill/чекпоінт, лише інша дія.
3. Дія: знайти Player і поставити Attribute.

Чому саме цей каркас знову? Бо модуль тренує **перенос шаблону**: фільтр дотику → дія → пауза. Новачкам хочеться щоразу вигадувати новий «магічний» код. Курс навпаки: той самий скелет, інший м’яз.

\`\`\`lua
local finish = script.Parent
local players = game:GetService("Players")
local debounce = false

finish.Touched:Connect(function(hit)
	if debounce then
		return
	end

	local character = hit.Parent
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	if not humanoid then
		return
	end

	local player = players:GetPlayerFromCharacter(character)
	if not player then
		return
	end

	debounce = true
	player:SetAttribute("HasWon", true)
	print(player.Name, "фініш")
	task.wait(1)
	debounce = false
end)
\`\`\`

Чому Attribute, а не «одразу змінити GUI з цього Script»? Бо серверний Script погано підходить, щоб особисто малювати PlayerGui кожного гравця в навчальному шаблоні. Attribute - факт, який **реплікується** гравцю. LocalScript лише читає факт і показує рамку.

Debounce знову зовні логіки «події», як у functions 3.6: стан між дотиками живе на рівні Script. Якщо поставиш debounce local усередині Connect-колбека без зовнішньої змінної - отримаєш сюрпризи. Тут тримай як у зразку.

Не став FinishPad упритул після спавну «для швидкого тесту UI» і забудь прибрати - на здачі це виглядає як зламаний дизайн. Для швидкого тесту тимчасово скороти маршрут, але поверни фініш на кінець перед Save.

**Зроби зараз (10 хв):** FinishPad + Script. Play → дотик → у Output є print. Attribute можна глянути на Player у Explorer під час Play.`,
 },
 {
 title: "LocalScript: показати WinFrame",
 content: `У \`WinGui\` додай LocalScript (наприклад \`WinController\`). Це «режисер титрів»: він не вирішує, чи чесний фініш, він лише показує картку, коли факт уже є.

\`\`\`lua
local players = game:GetService("Players")
local player = players.LocalPlayer

local winGui = script.Parent
local winFrame = winGui:WaitForChild("WinFrame")
local okButton = winFrame:WaitForChild("OkButton")

winFrame.Visible = false

local function showWin()
	winFrame.Visible = true
end

local function hideWin()
	winFrame.Visible = false
end

if player:GetAttribute("HasWon") then
	showWin()
end

player:GetAttributeChangedSignal("HasWon"):Connect(function()
	if player:GetAttribute("HasWon") == true then
		showWin()
	end
end)

okButton.MouseButton1Click:Connect(function()
	hideWin()
end)
\`\`\`

Зверни увагу: тут уже є \`local function\` з 3.6 - навіть у GUI. Імена \`showWin\` / \`hideWin\` читаються краще, ніж двічі копіювати \`Visible = true\`.

\`WaitForChild\` чекає, доки Frame з’явиться в клоні - корисна звичка, бо порядок завантаження GUI інколи підводить новачків. Якщо напишеш \`winGui.WinFrame\` без очікування і спіймаєш nil - не «GUI зламаний», а гонка завантаження.

\`MouseButton1Click\` - подія кнопки GUI (не ClickDetector зі світу). Різні системи: світ клікає Part, екран клікає TextButton. На вікторині це майже завжди окреме питання - і правильно.

Кнопка сьогодні лише **ховає** панель. Повний «рестарт рівня» (скинути Attribute на сервері, телепорт на старт) потребує або нового серверного тригера, або Remotes у M9. Для уроку достатньо: побачив перемогу → натиснув Ок → продовжуєш дивитись світ. У 3.8 можеш додати простий повторний пробіг або Reset персонажа як організаційний жест, не як нову мережеву тему.

Перевір крайній випадок: фініш уже був (HasWon true), ти Stop/Play - залежно від того, чи Attribute живе лише в сесії. Для навчання сесійний факт ок. Головне - у свіжому Play фініш знову вміє показати рамку.

**Зроби зараз (10 хв):** дотик фінішу → рамка з’являється → Ок ховає.`,
 },
 {
 title: "Visible, Enabled і типові «невидимі» поломки",
 content: `Три різні «вимкнення», які плутають навіть тих, хто вже зібрав Frame:

| Властивість | Де | Ефект |
|-------------|-----|--------|
| \`Frame.Visible\` | Frame / Label / Button | елемент не малюється |
| \`ScreenGui.Enabled\` | ScreenGui | увесь HUD цього ScreenGui |
| прозорий Background / TextTransparency | вигляд | «ніби немає», але об’єкт є |

Якщо win «не з’являється», іди по ланцюжку, а не хаотично:
1. Чи спрацював print на FinishPad?
2. Чи \`HasWon\` став true на Player?
3. Чи LocalScript у WinGui (не Script)?
4. Чи WinFrame.Visible виставляється в true кодом?
5. Чи ScreenGui.Enabled true і Size не нульовий?
6. Чи дивишся саме свого персонажа в Play?

Якщо кнопка не реагує: це має бути TextButton (не Label), Active true, не перекритий іншим прозорим Frame з вищою ZIndex, подія саме MouseButton1Click. Клацни кнопку в Play і дивись, чи взагалі доходить подія - тимчасовий print у колбеку рятує пів години здогадок.

Ще пастка: два WinGui в StarterGui (старий експеримент + новий). Тоді можеш правити один шаблон, а клонується плутанина. Залиш один чистий \`WinGui\`.

**Зроби зараз (4 хв):** навмисно зламай Visible / Enabled і віднови за чеклістом - навчишся дебажити швидше за здачу.`,
 },
 {
 title: "Що лишати на сервері, що на клієнті (міні-карта модуля)",
 content: `Збери в голові карту M3 - це і є «логічний модуль», про який просять у курсі:

| Система | Де код | Урок |
|---------|--------|------|
| Двері Click/Prompt | Script | 3.1 |
| KillBrick | Script (+ function з 3.6) | 3.2 / 3.6 |
| Чекпоінт RespawnLocation | Script | 3.3 |
| Таймер на екрані | LocalScript | 3.3 / поліш 3.7 |
| Blink-платформи | Script + while | 3.4 |
| Спавн траси for | Script + function | 3.5 / 3.6 |
| Win UI | LocalScript + Attribute з сервера | **3.7** |

Якщо завтра захочеш «кнопку Ок, яка воскрешає всіх ворогів на сервері» - це вже розмова клієнт→сервер через Remotes. Не вигадуй її сьогодні через хаки. Чесний навчальний контракт: сервер ставить \`HasWon\`, клієнт малює.

Коли на бос-здачі (3.8) тебе спитають «чому kill не в LocalScript?», відповідай картою: правила світу на сервері, особистий екран на клієнті. Це речення дорожче за десять декоративних Parts.

Перевір також гігієну імен: FinishPad, WinFrame, HasWon - щоб через тиждень ти сам зрозумів Place. \`Part15\` і \`Script\` без імені на фініші - штраф до читабельності.

**Зроби зараз (3 хв):** пройди таблицю пальцем по своєму Explorer - чи немає LocalScript на KillPart і Script усередині TextButton?`,
 },
 {
 title: "Play-тест WinUI_v1 і Save",
 content: `**Чекліст WinUI_v1:**
- [ ] FinishPad на кінці маршруту, видно й підписано (Billboard або яскравий колір)
- [ ] Серверний Touched ставить \`HasWon\` + print
- [ ] WinFrame з’являється після фінішу без ручного Visible у Properties
- [ ] OkButton ховає Frame через MouseButton1Click
- [ ] TimerGui (з Frame) далі працює і має task.wait
- [ ] Немає RemoteEvent «на виріст» і немає DataStore «на виріст»
- [ ] У Explorer немає другого забутого WinGui-дубліката
- [ ] Save: \`Lesson 3.7 - WinUI_v1\`

На peer-demo досить 20 секунд: пробігти до фінішу → показати рамку → натиснути Ок. Якщо рамка є, а фініш «магічний без Script» - для курсу це слабша здача: потрібен саме міст Attribute. Навпаки теж погано: Attribute є, GUI мовчить - значить LocalScript не слухає сигнал або Visible ламається.

Якщо фініш спрацьовує від будь-якої фізики (деталь атракціону з M2) - фільтруй Humanoid, як у kill. Інакше випадковий уламок «виграє» за тебе.

Перед Save зроби Stop → Play ще раз на чистому заході: інколи під час довгого Play накопичуються тимчасові стани, і здається, що «все ок», доки не перезапустиш.

Коротко для нотатки портфоліо: «сервер вирішує HasWon, клієнт малює WinFrame». Це речення варто вміти сказати вголос.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Погляд у 3.8 - бос-здача міні-гри",
 content: `У **3.8** ти не вчиш нову мову - ти **збираєш продукт**: двері, небезпека, чекпоінти, платформи, генерація, functions, win UI; підкручуєш баланс; робиш Badge lite; презентуєш за ~60 секунд.

Сьогодні закрий WinUI_v1 так, щоб завтра не лагодити базовий показ перемоги під час полішу всього модуля. Найгірший сценарій боса - коли інтеграція є, а фінішний екран «доробимо в останні п’ять хвилин» і не встигаєш.

Також завтра знадобиться читабельна карта маршруту. Якщо зараз FinishPad посеред нічого «для тесту» - поверни його на логічний кінець рівня ще сьогодні. Майбутній ти скаже дякую.

Не відкривай M4 і не тягни tables «почитати наперед» замість Save. Спіраль курсу працює, коли кожен бос стоїть на твердому попередньому артефакті.

**Зроби зараз (2 хв):** допиши в Note один рядок, що переносиш у наступний урок.`,
 },
 {
 title: "Практика A - Разом (10 хв)",
 content: `1. Збери ієрархію WinGui (Frame + 2 Label + TextButton), Visible false.
2. Постав FinishPad і серверний Script з Attribute HasWon.
3. LocalScript: show/hide + MouseButton1Click + WaitForChild.
4. Один успішний фініш у Play з print у Output.

Працюйте парами, якщо можна: один будує Frame, другий пише серверний Touched, потім міняєтесь і перевіряєте чужий шматок. Так швидше ловите «Script замість LocalScript».

**Критерій:** рамка з’являється від дотику, не від ручного Visible у Properties під час здачі. Викладач може попросити Stop/Play і повторити фініш.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Практика B - Самостійно (12 хв)",
 content: `1. Підкрути вигляд: кольори, текст, центр екрана, щоб WinFrame не виглядав випадковим сірим квадратом.
2. Упакуй TimerGui в TimerFrame; переконайся, що час тікає.
3. Перевір смерть на kill після фінішу: як поводиться GUI (ResetOnSpawn). Зафіксуй поведінку, яка тобі ок для боса.
4. Прибери дублікати ScreenGui й сміттєві тестові Part «Finish2».
5. Save \`Lesson 3.7 - WinUI_v1\`.

**Критерій:** викладач бачить і серверний print/Attribute, і клієнтську рамку; таймер живий.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Практика C - Челендж (8 хв)",
 content: `Обери один:
- друга мова / коротший текст на TitleLabel і HintLabel (той самий Frame);
- після showWin змінити колір OkButton на один кадр «успіху», потім повернути;
- маленький ImageLabel-іконка фінішу всередині WinFrame (без BadgeService);
- коли HasWon true - зупинити оновлення тексту таймера (акуратний вихід із while).

**Не роби:** BadgeService / AwardBadge (це 3.8), RemoteEvent, DataStore, ModuleScript «на виріст», повний рестарт рівня з клієнта.

Челендж - зірочка. Спочатку здай базовий WinUI_v1.

**Зроби зараз (4 хв):** зроби один Remote-виклик і зафіксуй, хто приймає рішення - клієнт чи сервер.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "LocalScript на FinishPad у Workspace",
 fix: "Правило фінішу - звичайний Script. LocalScript для UI тримай у StarterGui.",
 },
 {
 mistake: "WinFrame завжди Visible true",
 fix: "Ховай за замовчуванням; показуй лише після HasWon.",
 },
 {
 mistake: "Сервер намагається знайти ScreenGui лише в StarterGui під час Play",
 fix: "Робоча копія в PlayerGui. Краще Attribute + LocalScript, як у шаблоні.",
 },
 {
 mistake: "Кнопка зроблена TextLabel",
 fix: "Потрібен TextButton і MouseButton1Click.",
 },
 {
 mistake: "Немає WaitForChild - інколи nil",
 fix: "Чекай WinFrame/OkButton через WaitForChild.",
 },
 {
 mistake: "Плутає ClickDetector і MouseButton1Click",
 fix: "Світ - ClickDetector; GUI-кнопка - MouseButton1Click.",
 },
 {
 mistake: "Додає RemoteEvent «про запас»",
 fix: "У M3 вистачає Attribute. Remotes - пізніше.",
 },
 ],
 quiz: {
 title: "Тест 3.7 - LocalScript + GUI",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 3.7:",
 options: [
          "LocalScript + ScreenGui/Frame/TextButton і win UI",
          "DataStore монет",
          "SpringConstraint",
          "Publish на вітрину",
        ],
 correctAnswer: 0,
 explanation: "GUI на клієнті й екран перемоги.",
 },
 {
 id: "q2",
 type: MC,
 question: "LocalScript у курсі найчастіше ставлять у:",
 options: [
          "Terrain",
          "StarterGui / біля елементів GUI",
          "Lighting",
          "ServerStorage обов’язково для дверей",
        ],
 correctAnswer: 1,
 explanation: "Клієнтський UI.",
 },
 {
 id: "q3",
 type: MC,
 question: "Script на FinishPad потрібен, бо:",
 options: [
          "Інакше не працює Snap",
          "LocalScript заборонений у принципі",
          "Правило перемоги - серверна логіка світу",
          "Так вимагає Toolbox",
        ],
 correctAnswer: 2,
 explanation: "Світ і правила на сервері.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо сервер виставляє гравцю Attribute HasWon?",
 options: [
          "Щоб видалити Terrain",
          "Щоб увімкнути Party Mode",
          "Щоб створити Model",
          "Щоб передати факт перемоги клієнту без Remotes у цьому уроці",
        ],
 correctAnswer: 3,
 explanation: "Міст сервер→клієнт для UI.",
 },
 {
 id: "q5",
 type: MC,
 question: "Frame у ScreenGui - це:",
 options: [
          "3D Part у Workspace",
          "2D контейнер для елементів інтерфейсу",
          "Тип Constraint",
          "Обов’язковий DataStore",
        ],
 correctAnswer: 1,
 explanation: "GUI-контейнер.",
 },
 {
 id: "q6",
 type: MC,
 question: "Подія кліку по TextButton:",
 options: [
          "Touched",
          "MouseClick від ClickDetector",
          "MouseButton1Click",
          "GetChildren",
        ],
 correctAnswer: 2,
 explanation: "GUI-кнопка.",
 },
 {
 id: "q7",
 type: MC,
 question: "BillboardGui з 3.1 відрізняється від ScreenGui тим, що:",
 options: [
          "Billboard висить у світі біля Part, ScreenGui - шар на екрані",
          "Вони повністю однакові",
          "ScreenGui завжди в Terrain",
          "Billboard працює лише з DataStore",
        ],
 correctAnswer: 0,
 explanation: "Різні простори підказок.",
 },
 {
 id: "q8",
 type: MC,
 question: "Якщо WinFrame не з’являється, перший крок дебагу:",
 options: [
          "Видалити весь парк",
          "Увімкнути Free Model admin",
          "Прибрати Anchored у всього",
          "Перевірити print/Attribute на фініші, потім Visible і тип Script",
        ],
 correctAnswer: 3,
 explanation: "Ланцюжок фініш→факт→UI.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що з цього НЕ тема 3.7?",
 options: [
          "TextButton",
          "StarterGui",
          "RemoteEvent магазин",
          "Visible у Frame",
        ],
 correctAnswer: 2,
 explanation: "Remotes - пізніші модулі.",
 },
 {
 id: "q10",
 type: MC,
 question: "ResetOnSpawn у ScreenGui впливає на:",
 options: [
          "Колір Ocean у Terrain",
          "Чи скидається/пересоздається GUI після респавну персонажа",
          "Силу SpringConstraint",
          "Чи працює Union",
        ],
 correctAnswer: 1,
 explanation: "Поведінка GUI після смерті.",
 },
 {
 id: "q11",
 type: MC,
 question: "Чому win UI не малюють серверним Script «в лоб» у цьому шаблоні?",
 options: [
          "Luau забороняє print",
          "Studio видаляє Script",
          "Так не працює Anchored",
          "Особистий HUD зручніше й чистіше вести LocalScript + факт з сервера",
        ],
 correctAnswer: 3,
 explanation: "Розподіл ролей.",
 },
 {
 id: "q12",
 type: MC,
 question: "WaitForChild(\"WinFrame\") допомагає, коли:",
 options: [
          "Елемент GUI може ще не встигнути з’явитись у клоні",
          "Треба згенерувати Terrain",
          "Треба вимкнути Lighting",
          "Обов’язковий Hinge",
        ],
 correctAnswer: 0,
 explanation: "Очікування нащадка.",
 },
 {
 id: "q13",
 type: MC,
 question: "Рекомендований Save:",
 options: [
          "Untitled",
          "Lesson 3.1 - Coin Route",
          "Lesson 3.7 - WinUI_v1",
          "Module 6 Simulator only",
        ],
 correctAnswer: 2,
 explanation: "Артефакт уроку.",
 },
 {
 id: "q14",
 type: MC,
 question: "Кнопка Ок у шаблоні уроку:",
 options: [
          "Обов’язково пише DataStore",
          "Видаляє FinishPad",
          "Створює RemoteFunction",
          "Ховає WinFrame (Visible false)",
        ],
 correctAnswer: 3,
 explanation: "Локальне закриття панелі.",
 },
 {
 id: "q15",
 type: MC,
 question: "Наступний урок 3.8 - це:",
 options: [
          "Новий синтаксис while",
          "Бос-здача міні-гри: інтеграція, баланс, Badge lite, презентація",
          "Лише Toolbox",
          "Тільки Lighting",
        ],
 correctAnswer: 1,
 explanation: "Checkpoint модуля.",
 },
 ],
 },
}

export const ukLesson38 = {
 lessonId: "lesson-roblox-3-8",
 moduleId: "module-03",
 order: 8,
 title: "3.8 - Бос-здача міні-гри",
 theoryMinutes: 40,
 quizMinutes: 15,
 estimatedTime: 75,
 learningObjectives: [
 "Зібрати один Place, де працюють системи з уроків 3.1–3.7",
 "Підкрутити баланс: чесність kill, ритм платформ, відстань чекпоінтів",
 "Додати Badge lite (візуальний трофей і/або простий AwardBadge-шаблон)",
 "Підготувати презентацію ~60 секунд за чітким сценарієм",
 "Здати портфоліо-сейв Module 3 - PlayableMini_v1",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія - здати міні-гру, а не купу уроків",
 content: `Це **бос-чекпоінт** Модуля 3. Нової «великої» мови майже немає: ти **інтегруєш**, **балансуєш** і **показуєш**. Викладач оцінює не кількість Parts, а чи грається одна історія від старту до win UI.

У кінці має бути Place, який можна пройти як коротку міні-гру: взаємодія → ризик → прогрес → ритм платформ → фініш → екран перемоги. Functions з 3.6 мають бути видно в коді (хоча б kill або spawn). LocalScript GUI з 3.7 - обов’язковий фінал.

Подумай про різницю: «у мене є сім сейвів уроків» vs «у мене є одна міні-гра». Курс будував спіраль саме до другого. Якщо на здачі ти стрибаєш між файлами «зараз покажу kill з 3.2, а двері в іншому Place» - рубрика інтеграції червона.

**Артефакт:** \`PlayableMini_v1\`
- інтеграція 3.1–3.7 в одному маршруті
- баланс-пас (не «з першої спроби неможливо» і не «нудно легко»)
- Badge lite: трофей у світі / на win UI + опційно шаблон BadgeService
- презентація ~60″
- Save: \`Module 3 - PlayableMini_v1\`

**Старт:** \`Lesson 3.7 - WinUI_v1\` або зібраний Place модуля. Не починай Baseplate з нуля - бос саме про зшивання. Краще потворно зшите живе, ніж ідеально порожнє.

**Що не сьогодні:** tables/ModuleScript/DataStore (**M4**), повний Obby-продукт на 10 уроків (**M5**), Remotes (**M9**), Publish Showcase як окремий релізний модуль (**M12**). Можна Save to Roblox для портфоліо курсу - це не «реліз у Discover». Не витрачай годину на іконку досвіду замість балансу чекпоінтів.

Якщо бракує часу: ріж довжину рівня, не ріж win UI і смерть-тест чекпоінтів. Це кістяк модуля.

**Зроби зараз (2 хв):** відкрий Place після попереднього уроку і підготуй робочу зону для артефакту цього заняття.`,
 },
 {
 title: "Рубрика здачі - що перевіряють",
 content: `Оцінюй себе так само, як викладач. Рубрика - не бюрократія, а карта модуля в один екран:

| Критерій | Так виглядає «здано» | Так виглядає «ще ні» |
|----------|----------------------|----------------------|
| 3.1 Взаємодія | Двері/хвіртка з Click або Prompt + Billboard | Part без логіки «просто стоїть» |
| 3.2 Kill | Неон чесний, debounce, Humanoid | Смерть від усього / спам смерті |
| 3.3 Чекпоінти | ≥2, смерть-тест повертає ближче | Завжди лише старт |
| 3.3/3.7 Таймер | Видно, тікає, у Frame | Немає або while без wait (зависання) |
| 3.4 Платформи | Blink зі wait, можна пройти | Ритм нечитабельний |
| 3.5/3.6 Траса/functions | for-спавн і/або killCharacter | Лише копипаст без імен функцій |
| 3.7 Win UI | Фініш → Attribute → Frame + кнопка | «Перемога» лише print у Output |
| Баланс | 1–3 смерті в навчальному проходженні ок | Непрохідно або нуль виклику |
| Badge lite | Видно трофей / нагороду | Порожня обіцянка «потім» |
| Презентація | ~60″ за сценарієм | Хаотичний кліки по Explorer |

Не треба ідеальний AAA-рівень. Треба **зв’язаний** навчальний продукт модуля. Один червоний критичний пункт (немає win або чекпоінти брешуть) важливіший за п’ять жовтих (кривий колір Billboard).

Постав собі дедлайн: спочатку закрий усі критичні «ще ні», потім фарбуй. Навпаки - класичний провал боса.

**Зроби зараз (5 хв):** роздрукуй або відкрий таблицю й постав +/- навпроти свого Place.`,
 },
 {
 title: "Карта маршруту міні-гри (один прохід)",
 content: `Збери наратив у просторі - гравець має читати рівень ногами, без твого голосу за спиною:

1. **Старт** - Spawn_Start, видно таймер
2. **Ворота** - InteractDoor / Prompt (3.1): «гру почато свідомо»
3. **Ризик** - фрагмент KillLane (3.2), але не одразу в обличчя зі спавну
4. **Checkpoint_A** - справедливість після першого ризику
5. **Ритм** - 1–2 blink-платформи (3.4)
6. **Checkpoint_B** - перед фінальним викликом
7. **Траса/платформи** - шматок for-спавну або акуратно розставлені пади (3.5)
8. **FinishPad** - Attribute HasWon (3.7)
9. **WinFrame** - текст + Ок + трофей/нагорода

Якщо щось із цього випадає - не додавай нову механіку з M4. Поверни цеглу з відповідного уроку. «Я замінив чекпоінти телепортами з Free Model» - погана угода: ти втрачаєш саме те, що модуль учив.

Folder/Model \`PlayableMini_v1\` або зони \`Zone_Start\`, \`Zone_Risk\`, \`Zone_Finish\` - World craft звичка: Explorer читається за 10 секунд. На презентації можна на секунду відкрити Explorer і показати порядок зон - це виглядає професійно.

Слідкуй за «дірками наративу»: двері після фінішу, чекпоінт за фінішем, kill на спавні. Маршрут має мати напрямок.

**Зроби зараз (8 хв):** пройди маршрут мовчки. Де заплутався сам - там заплутається здавальник.`,
 },
 {
 title: "Баланс - чесність важливіша за «складно»",
 content: `Баланс у навчальній міні-грі - це не eSports. Це **читабельність виклику**. Гравець має розуміти, чому помер, і що зробити наступного разу.

Підкрути по черзі (не все разом):
- **Kill:** неоновий колір, не маскуй під підлогу; відстань від Spawn; CanCollide/розмір адекватні
- **Чекпоінти:** після складного шматка, не всередині лави; тест смертю обов’язковий
- **Blink:** період visible/hidden такий, щоб новачок встиг зрозуміти ритм за одне спостереження; phase offset не роби хаотичним «RNG»
- **Довжина:** ціль - проходження 45–90 секунд для здачі, не 10-хвилинний марафон
- **Фініш:** не ховай FinishPad; Billboard «ФІНІШ» ок

Правило: якщо ти сам злився 8 разів на одному місці без розуміння чому - це баг дизайну, не «хардкор». Хардкор без читабельності на бос-здачі читається як недоробка.

Запиши 3 зміни балансу в нотатку (наприклад: «blink +0.2s visible», «чекпоінт ближче після третьої лави», «фініш вище на 2 studs»). На презентації скажеш одну з них - це звучить як розробник, не як турист по Studio.

Перевіряй баланс після кожної зміни коротким проходом. Три «покращення» без playtest часто роблять гірше.

**Зроби зараз (12 хв):** один цілеспрямований баланс-пас + повторний прохід.`,
 },
 {
 title: "Badge lite - нагорода без перевантаження",
 content: `«Badge lite» у цьому курсі = **відчутна нагорода за фініш**, а не повний гайд по Creator Dashboard на годину. Модуль про код, що грається - нагорода має бути видимою в грі.

**Варіант A (обов’язковий мінімум):** візуальний трофей
- Part/Model \`Trophy_Finish\` біля фінішу або ImageLabel / текст у WinFrame: «Значок: Фінішер M3»
- після HasWon можна підсвітити трофей (колір / Transparency) коротким Script або залишити статичним символом перемоги
- головне: гравець розуміє «мені дали нагороду», навіть якщо це ще не офіційний Roblox Badge

**Варіант B (опційний шаблон):** \`BadgeService\`
Справжній badge створюється на сайті Roblox (Creator). У коді лише виклик з ID:

\`\`\`lua
local BadgeService = game:GetService("BadgeService")
local BADGE_ID = 0 -- підстав свій ID, якщо badge вже створено

local function tryAward(player)
	if BADGE_ID == 0 then
		print("Badge lite: візуальний трофей / ID ще не задано")
		return
	end
	local ok, err = pcall(function()
		BadgeService:AwardBadge(player.UserId, BADGE_ID)
	end)
	if not ok then
		warn("Badge:", err)
	end
end
\`\`\`

Викликай \`tryAward(player)\` поруч із встановленням HasWon на фініші. Якщо ID = 0 - гра не падає, лишається візуальний трофей. \`pcall\` тут лише захист від помилки сервісу, не повний урок DataStore з M4.

Не витрачай урок на боротьбу з модерацією badge і іконками. Якщо Dashboard глючить - здавай варіант A без сорому. Викладач бачить трофей і WinFrame.

Уникай Free Model «badge giver» з чужими Script: аудит з 2.4 ніхто не скасовував на босі.

**Зроби зараз (8 хв):** трофей + напис у WinFrame; опційно tryAward з ID 0.`,
 },
 {
 title: "Код-гігієна перед здачею (functions + GUI)",
 content: `Швидкий аудит без рефактору всього світу. Мета - не ідеальний код-рев’ю, а відсутність соромних дірок:

1. Kill: чи є \`killCharacter\` (або еквівалент) з 3.6? Якщо три одинакові скрипти - хоч один рефактор покажи.
2. Win: чи фініш ставить Attribute, а LocalScript лише малює?
3. Немає LocalScript на KillPart і Script у TextButton.
4. while на blink і таймері має \`task.wait\`.
5. Імена PascalCase / зрозумілі: FinishPad, Checkpoint_A, WinFrame.
6. Немає «випадкових» Free Model Scripts з Toolbox без аудиту (звичка 2.4).

Якщо час підтискає: **не** починай ModuleScript. Чистий один Script з function цінніший за «архітектуру на виріст». M4 якраз про винесення Config - не кради цю тему нападом у останні 20 хвилин.

Перевір Output на чистому Play: чи немає червоних помилок ще до першого кроку? Здача з помилкою на старті виглядає гірше, ніж простий, але чистий Place.

**Зроби зараз (7 хв):** пройди 6 пунктів і виправ лише критичне.`,
 },
 {
 title: "Презентація 60 секунд - сценарій",
 content: `Говори по секундах, не імпровізуй з нуля. 60″ - це навичка стислості, яку потім потрібні polish/demo модулі лише загострять.

| Час | Що робиш / кажеш |
|-----|------------------|
| 0–10″ | «Це міні-гра модуля 3: від дверей до екрана перемоги» + старт Play |
| 10–20″ | Відкриваєш двері / Prompt (3.1) |
| 20–35″ | Показуєш ризик + чекпоінт (смерть або коротко пояснюєш) |
| 35–45″ | Blink або шматок траси |
| 45–55″ | Фініш → WinFrame + трофей/badge lite |
| 55–60″ | Одна фраза про баланс або function у коді |

Заборонені дірки: 20 секунд мовчазного копання в Explorer; «зараз швидко допишу»; демонстрація зламаного фінішу; суперечка з таймером телефону «ну ще хвилинку».

Репетируй **два** рази до здачі. Другий раз майже завжди коротший і чітший. Якщо на першій репетиції вийшло 2 хвилини - ріж маршрут або слова, не швидкість дикції до нерозбірливої.

Корисний трюк: напарник тримає таймер і піднімає руку на 50″ - ти встигаєш сказати фінальну фразу, а не обриваєшся на півслові.

**Зроби зараз (6 хв):** одна повна репетиція з таймером телефону.`,
 },
 {
 title: "Playtest з напарником (обов’язковий ритуал)",
 content: `Сам ти вже знаєш, куди стрибати. Напарник - ні. Саме тому peer-playtest ловить дірки краще за ще одну твою спробу «на автоматі».

Дай контролер / глянь збоку і мовчи перші 40 секунд:
- де перша смерть?
- чи зрозумілі двері без твоєї підказки?
- чи видно фініш?
- чи win UI не виглядає як випадковий Frame посеред нічого?
- чи таймер не закриває огляд стрибка?

Запиши **одну** зміну після напарника і внеси її. Це і є ітерація - навичка, яку M5/M11 лише поглиблять. Десять усних порад без однієї внесеної зміни = нуль.

Якщо напарника немає - запиши коротке відео собі й переглянь без кліків у Studio: чи читається маршрут з боку. Або попроси когось онлайн просто подивитись запис.

Не захищай дизайн фразою «треба звикнути». На бос-здачі навчального модуля звичка гравця ще не існує - є лише перше враження.

**Зроби зараз (10 хв):** тест іншою людиною або «холодний» перегляд.`,
 },
 {
 title: "Save портфоліо і що сказати про наступний модуль",
 content: `**Save to Roblox:** \`Module 3 - PlayableMini_v1\`
Окремо може лишитись \`Lesson 3.7 - WinUI_v1\` як проміжний сейв - але на здачу модуля показуєш саме інтегрований Place. Назва з «Module 3» допомагає через місяць знайти саме бос, а не черговий експеримент.

У нотатці на 3 рядки:
1. що вже вмієш (взаємодія, Touched, цикли, functions, GUI)
2. що кульгало в балансі
3. що свідомо НЕ робив (DataStore, Remotes) - щоб не обіцяти зайвого

**M4** додасть tables, ModuleScript і DataStore - тоді прогрес і ціни стануть даними. Сьогоднішній фініш із Attribute - правильний фундамент, не «зайвий костиль». Коли в M4 з’явиться сейв, ти вже розумітимеш різницю світу/UI з M3.

Не публікуй Place у Discover «бо здається готовим». Релізний модуль курсу окремий. Зараз - портфоліо-сейв і жива демо-здача.

**Зроби зараз (4 хв):** Save + три рядки нотатки.`,
 },
 {
 title: "Фінальний чекліст перед викладачем",
 content: `- [ ] Маршрут 3.1–3.7 зібраний в одному Place
- [ ] Смерть-тест чекпоінтів пройдений сьогодні (не «минулого тижня напевно працювало»)
- [ ] Blink не вішає Studio (є wait)
- [ ] Фініш відкриває WinFrame
- [ ] Badge lite видно (трофей і/або текст нагороди)
- [ ] Є хоч одна зрозуміла function у коді світу
- [ ] Output без червоних помилок на старті Play
- [ ] Репетиція ~60″ є
- [ ] Save: \`Module 3 - PlayableMini_v1\`

Якщо пункт червоний - лагодь його, а не додавай декоративний фонтан із Toolbox. Фонтан не закриває відсутній чекпоінт.

Поклади рубрику поруч із чеклістом: вони мають збігатися. Якщо в рубриці «win UI», а в чеклісті лише «є FinishPad» - допиши показ рамки.

Останні 3 хвилини перед викладачем: глибокий вдих, відкритий Play, курсор не в Explorer, сценарій 60″ у голові.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 {
 title: "Практика A - Разом (12 хв)",
 content: `1. Звірка рубрики +/- по Place (вголос, не мовчки).
2. Добити відсутню систему (найчастіше: другий чекпоінт або win UI, або двері «забули перенести»).
3. Поставити Trophy / напис нагороди в WinFrame.
4. Один повний прохід старт→фініш без виходу з Play.

Якщо працюєте в парі: один проходить, другий тримає рубрику й ставить мітки. Потім навпаки.

**Критерій:** один безперервний Play без «зараз перемкнусь на інший файл уроку».

**Зроби зараз (8 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Практика B - Самостійно (15 хв)",
 content: `1. Баланс-пас (рівно 3 конкретні зміни - запиши їх).
2. Код-гігієна (functions / типи Script / while+wait).
3. Репетиція презентації 60″ двічі.
4. Короткий peer або «холодний» перегляд запису.
5. Save \`Module 3 - PlayableMini_v1\`.

Не починай нову механіку на 14-й хвилині. Якщо все критичне зелене - полір тексту WinFrame і яскравість FinishPad.

**Критерій:** можеш назвати вголос 6 систем модуля, показуючи їх у грі, і вкластися в хвилину демо.

**Зроби зараз (8 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Практика C - Челендж (8 хв)",
 content: `Обери один:
- tryAward з реальним BADGE_ID (якщо вже створив badge);
- коротка «підказка наступного кроку» TextLabel, який з’являється лише до першого чекпоінта;
- peer-review: письмово 3 плюси / 1 ризик балансу чужому Place.

**Не роби:** DataStore таблиці рекордів, Remote магазин, повний перепис у ModuleScript «бо M4 близько».

**Зроби зараз (4 хв):** зроби save/load або чесно задокументуй mock-режим у Output.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Показує окремі уроки файлами замість одного Place",
 fix: "Бос - інтеграція. Зшийте системи в PlayableMini_v1.",
 },
 {
 mistake: "Фініш лише print, без WinFrame",
 fix: "Поверніться до шаблону 3.7: Attribute + LocalScript.",
 },
 {
 mistake: "Непрохідний баланс «я так задумав»",
 fix: "Підкрутіть ритм і чекпоінти; чесність > хардкор.",
 },
 {
 mistake: "Презентація 3 хвилини хаосу в Explorer",
 fix: "Сценарій 60″: гра → системи → фініш.",
 },
 {
 mistake: "BadgeService без pcall і з нікчемним ID валить Output",
 fix: "Варіант A трофей обов’язковий; AwardBadge лише з валідним ID у pcall.",
 },
 {
 mistake: "Глухі while без wait після полішу",
 fix: "Перевір blink і таймер перед здачею.",
 },
 {
 mistake: "Тягне DataStore/Remotes у бос M3",
 fix: "Залиш для M4/M9. Сьогодні інтеграція вже вивченого.",
 },
 ],
 quiz: {
 title: "Тест 3.8 - Бос-здача міні-гри",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 3.8:",
 options: [
          "Інтегрувати 3.1–3.7, баланс, Badge lite, презентація ~60″",
          "Вивчити RemoteFunction",
          "Лише Terrain Paint",
          "Опублікувати платний gamepass",
        ],
 correctAnswer: 0,
 explanation: "Бос-чекпоінт модуля.",
 },
 {
 id: "q2",
 type: MC,
 question: "Чому важливий один Place, а не сім окремих сейвів уроків?",
 options: [
          "Бо Studio інакше видаляє Parts",
          "Бо здача - це зіграна міні-гра, а не архів фрагментів",
          "Бо так вимагає Lighting",
          "Бо LocalScript не працює інакше",
        ],
 correctAnswer: 1,
 explanation: "Інтеграція продукту.",
 },
 {
 id: "q3",
 type: MC,
 question: "Мінімум чекпоінтів для справедливої здачі:",
 options: [
          "0",
          "20 обов’язково",
          "≥2 з смертю-тестом",
          "Лише Spawn без RespawnLocation",
        ],
 correctAnswer: 2,
 explanation: "Прогрес після смерті.",
 },
 {
 id: "q4",
 type: MC,
 question: "Badge lite у цьому уроці означає:",
 options: [
          "Обов’язковий магазин Remotes",
          "Видалення WinFrame",
          "Лише Toolbox Free Model",
          "Видима нагорода (трофей/UI) і опційно AwardBadge",
        ],
 correctAnswer: 3,
 explanation: "Легка нагорода за фініш.",
 },
 {
 id: "q5",
 type: MC,
 question: "Якщо BADGE_ID = 0 у шаблоні:",
 options: [
          "Обов’язковий краш Place",
          "Гра продовжується; лишається візуальний трофей / print",
          "Видаляється Terrain",
          "Вимикається Anchored",
        ],
 correctAnswer: 1,
 explanation: "Безпечний lite-режим.",
 },
 {
 id: "q6",
 type: MC,
 question: "Презентація орієнтовно триває:",
 options: [
          "5 секунд",
          "30 хвилин коду вголос",
          "~60 секунд за сценарієм",
          "Без ліміту",
        ],
 correctAnswer: 2,
 explanation: "Короткий demo.",
 },
 {
 id: "q7",
 type: MC,
 question: "Баланс навчальної міні-гри в першу чергу про:",
 options: [
          "Читабельність виклику і чесність небезпек",
          "Максимальний біль гравця",
          "Кількість Free Models",
          "Кількість RemoteEvent",
        ],
 correctAnswer: 0,
 explanation: "Чесний дизайн.",
 },
 {
 id: "q8",
 type: MC,
 question: "Що свідомо НЕ тема боса M3?",
 options: [
          "Win UI",
          "Kill debounce",
          "Blink з wait",
          "DataStore таблиці сейву",
        ],
 correctAnswer: 3,
 explanation: "DataStore - M4.",
 },
 {
 id: "q9",
 type: MC,
 question: "Рекомендований Save модуля:",
 options: [
          "Untitled",
          "Lesson 1.1 only",
          "Module 3 - PlayableMini_v1",
          "Module 9 Remotes",
        ],
 correctAnswer: 2,
 explanation: "Портфоліо M3.",
 },
 {
 id: "q10",
 type: MC,
 question: "Навіщо peer-playtest перед здачею?",
 options: [
          "Щоб видалити Script",
          "Щоб побачити незрозумілі місця очима іншої людини",
          "Щоб увімкнути Atmosphere",
          "Щоб отримати DataStore",
        ],
 correctAnswer: 1,
 explanation: "Ітерація зворотним зв’язком.",
 },
 {
 id: "q11",
 type: MC,
 question: "Functions на бос-здачі:",
 options: [
          "Заборонені",
          "Обов’язковий ModuleScript",
          "Лише в LocalScript кнопок",
          "Бажано показати хоч у kill/spawn - гігієна з 3.6",
        ],
 correctAnswer: 3,
 explanation: "Видно рефактор модуля.",
 },
 {
 id: "q12",
 type: MC,
 question: "Якщо while без wait залишився в blink:",
 options: [
          "Studio/Play ризикує зависнути - виправити до демо",
          "Це ок для здачі",
          "Це вмикає Badge",
          "Це замінює фініш",
        ],
 correctAnswer: 0,
 explanation: "Безпека циклу.",
 },
 {
 id: "q13",
 type: MC,
 question: "Маршрут міні-гри логічно закінчується:",
 options: [
          "Видаленням Spawn",
          "Лише Toolbox",
          "FinishPad + WinFrame",
          "Лише Lighting ніч",
        ],
 correctAnswer: 2,
 explanation: "Фінал з 3.7.",
 },
 {
 id: "q14",
 type: MC,
 question: "Після M3 логічний наступний фокус курсу:",
 options: [
          "Одразу M12 Publish без даних",
          "Лише повтор 1.1",
          "Тільки Constraints",
          "M4 - tables, ModuleScript, DataStore",
        ],
 correctAnswer: 3,
 explanation: "Спіраль до даних.",
 },
 {
 id: "q15",
 type: MC,
 question: "Найкращий спосіб «добити» час перед здачею:",
 options: [
          "Додати 10 нових механік з майбутніх модулів",
          "Закрити червоні пункти рубрики й відрепетирувати 60″",
          "Видалити всі Script",
          "Замінити все на один Free Model",
        ],
 correctAnswer: 1,
 explanation: "Інтеграція і демо.",
 },
 ],
 },
}
