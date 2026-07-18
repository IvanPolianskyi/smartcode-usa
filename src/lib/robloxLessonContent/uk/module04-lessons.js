/** Rich UK content for Roblox Module 04 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson41 = {
 lessonId: "lesson-roblox-4-1",
 moduleId: "module-04",
 order: 1,
 title: "4.1 - Масиви + for",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Оголосити масив (list-table) через {} і прочитати елемент за індексом",
 "Пояснити, чому в Luau індекси масиву починаються з 1",
 "Дізнатись довжину через #t і пройти масив for / ipairs",
 "Спавнити Parts з масиву імен і прибрати дублікати перед повторним Play",
 "Здати артефакт NamePads_v1 без словників-прайсів і DataStore",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія — список, який будує світ",
 content: `Модуль **«Tables і дані»** починається не з магазину й не з сейву в хмару. Він починається з простого питання: як тримати **багато однотипних речей** в одній змінній, а не в AlphaPad, BetaPad, GammaPad вручну.

У 3.5 ти вже спавнив ряд через \`for i = 1, n\`. Там число було головним: «зроби n плит». Сьогодні з’являється **масив імен** — table, де під номерами лежать рядки, і цикл читає саме їх. Це міст від «повторити дію n разів» до «пройти список даних».

Без цього мосту далі важко: прайс, інвентар, Config і DataStore — усе tables. Якщо сьогодні лишиш відчуття «table = щось страшне з інтернету», модуль перетвориться на копіпаст чужих снипетів. Якщо сьогодні зробиш живий список у своєму Script — завтрашні теми ляжуть на знайомий каркас.

**Артефакт:** \`NamePads_v1\`
- Folder у Workspace (наприклад \`ArrayLab\`)
- Script зі списком імен \`{"Alpha","Beta","Gamma","Delta"}\` (можна свої)
- спавн Part для кожного імені: Name = ім’я, підпис Billboard або колір
- очистка старих плит перед новим спавном (звичка з 3.5)
- Save: \`Lesson 4.1 - NamePads_v1\`

**Старт:** Place після \`Module 3 - PlayableMini_v1\` або чиста зона поруч. Не обов’язково ламати міні-гру — зроби окремий куток \`ArrayLab\`. Якщо хочеш порожній тестовий Place — ок, але повертайся до острова курсу, щоб дані жили в тому ж портфоліо.

**Що не сьогодні:** словники з ключами-рядками й прайс \`canAfford\` (**4.2**), \`table.insert\` / \`remove\` (**4.3**), масив записів \`{{name=, power=}}\` (**4.4**), ModuleScript Config (**4.5**), DataStore (**4.6**), вітрина-бос (**4.7**). Сьогодні — **масив як список** + цикл по ньому.

Подумай так: for без table — молоток. Table без for — шухляда з деталями. Разом — конвеєр, на якому дані стають Parts у світі. На здачі викладач хоче побачити саме цей конвеєр: відкрив масив → змінив рядок → Play → світ інший.`,
 },
 {
 title: "Що таке table-масив людською мовою",
 content: `У Luau майже все «складніше за одне число» пакується в \`table\`. Сьогодні беремо лише один вигляд table — **масив (список)**: елементи стоять під номерами 1, 2, 3…

\`\`\`
names[1] → "Alpha"
names[2] → "Beta"
names[3] → "Gamma"
\`\`\`

Це не Folder у Explorer і не Model. Це **дані в Script**. Folder тримає Parts у світі. Масив тримає значення в пам’яті коду. Ти можеш з масиву **зродити** Parts — саме це й зробиш.

Чому це важливо саме зараз? Бо далі модуль навчить прайси, інвентар, Config і сейв. Усі вони — tables. Якщо сьогодні плутаєш «список під номерами» з «купою Parts у Workspace», завтра заплутаєшся ще сильніше.

Масив зручний, коли:
- порядок має значення (1-й, 2-й, 3-й пост);
- хочеш одну довжину \`#names\` і один цикл;
- імена/кольори/підписи живуть у коді, а не в десяти копіях Script.

**Зроби зараз (2 хв):** у нотатці напиши 4 імена майбутніх плит. Це вже заготовка масиву — ще без синтаксису.`,
 },
 {
 title: "Синтаксис {} і індекс з 1",
 content: `Оголошення:

\`\`\`lua
local names = {"Alpha", "Beta", "Gamma", "Delta"}

print(names[1]) -- Alpha
print(names[2]) -- Beta
print(#names)   -- 4
\`\`\`

Фігурні дужки \`{}\` створюють table. Коли пишеш значення через кому без ключів — це **масивний** стиль: Roblox/Luau ставить індекси сам, починаючи з **1**.

Так, у багатьох мовах масиви з 0. У Lua/Luau — з **1**. Це не «помилка курсу», це правило мови. Якщо напишеш \`names[0]\`, майже напевно отримаєш \`nil\` і тишу замість імені.

\`#names\` — довжина масивної частини. Для чистого списку без дірок це кількість елементів. Пізніше, коли з’являться «діряві» tables, \`#t\` стане тоншою темою — сьогодні тримай список щільним: 1…n без пропусків.

Читати елемент: \`names[i]\`. Міняти: \`names[i] = "Nova"\`. Додавати «в кінець вручну» можна \`names[#names + 1] = "Epsilon"\` — але повноцінний \`table.insert\` прибережемо для **4.3**, щоб не змішувати теми.

**Зроби зараз (5 хв):** міні-Script у ServerScriptService: масив із 3 рядків, \`print\` першого й \`#\`. Потім видалиш або залишиш як пісочницю.`,
 },
 {
 title: "for по масиву — два чесні способи",
 content: `У 3.5 був \`for i = 1, count\`. Тепер \`count\` береться з даних:

\`\`\`lua
local names = {"Alpha", "Beta", "Gamma"}

for i = 1, #names do
	print(i, names[i])
end
\`\`\`

Або через \`ipairs\` — зручно, коли потрібні і індекс, і значення:

\`\`\`lua
for i, name in ipairs(names) do
	print(i, name)
end
\`\`\`

Обидва способи ок для курсу. \`ipairs\` читається як «іди по масиву по порядку». Числовий for корисний, коли хочеш той самий \`i\` для позиції в світі (як у спавні плит).

Не плутай із \`pairs\`: він обходить усі ключі, включно з нечисловими — це більше про словники (**4.2**). Сьогодні для списку імен бери \`ipairs\` або \`for i = 1, #names\`.

Порожній масив \`{}\` дасть цикл 0 разів — це нормально, не «баг Studio». Якщо очікував плити, а світ тихий — спочатку \`print(#names)\`.

**Зроби зараз (4 хв):** прогони ipairs у Output на своєму списку імен. Побач порядок 1…n.`,
 },
 {
 title: "Від імен до Parts — головний прийом уроку",
 content: `Дані стають світом: для кожного імені створюєш Part, ставиш \`Name\`, кладеш у Folder, розсовуєш по осі.

\`\`\`lua
local folder = workspace:FindFirstChild("ArrayLab") or Instance.new("Folder")
folder.Name = "ArrayLab"
folder.Parent = workspace

local names = {"Alpha", "Beta", "Gamma", "Delta"}
local start = Vector3.new(0, 5, 0)
local step = 6

local function clearPads()
	for _, child in ipairs(folder:GetChildren()) do
		if child:IsA("BasePart") and child.Name:match("^Pad_") then
			child:Destroy()
		end
	end
end

local function spawnPad(i, name)
	local part = Instance.new("Part")
	part.Name = "Pad_" .. name
	part.Size = Vector3.new(4, 1, 4)
	part.Anchored = true
	part.Position = start + Vector3.new(step * (i - 1), 0, 0)
	part.Parent = folder
	return part
end

clearPads()
for i, name in ipairs(names) do
	spawnPad(i, name)
end
\`\`\`

Зверни увагу: \`spawnPad\` і \`clearPads\` — це skills з **3.6**. Модуль даних не скасовує functions; навпаки, table + function — типова пара.

Чому \`Pad_\` + ім’я? Щоб очистка не знесла випадкову декорацію в тому ж Folder. Фільтр за префіксом — гігієна з 3.5, лише тепер імена живі з масиву.

Billboard на кожній плиті (навичка 3.1) — сильний плюс для здачі: викладач одразу бачить, що Part відповідає елементу списку, а не «просто чотири куби».

**Зроби зараз (12 хв):** Folder + скрипт спавну. Play → бачиш ряд іменованих плит.`,
 },
 {
 title: "Зв’язок із 3.5: що змінилось у голові",
 content: `| 3.5 TrackSpawn | 4.1 NamePads |
|----------------|--------------|
| Головне — число n | Головне — **список даних** |
| Ім’я часто \`Pad_\` .. i | Ім’я з \`names[i]\` |
| for знає лише лічильник | for читає table |
| Зміна «підписів» = правити код у тілі | Зміна підписів = правити **масив** |

Це і є data-driven у зародку: хочеш п’яту плиту — додаєш рядок у \`names\`, а не копипастиш ще один \`Instance.new\`. Повний data-driven магазин буде в **4.7**; сьогодні лише зерно.

Якщо залишиш масив, але спавниш завжди \`"Pad"\` без імені з table — ти не виконав місію уроку. Масив має **впливати** на світ (Name, колір, Billboard).

Можна розфарбувати за індексом:

\`\`\`lua
local colors = {
	Color3.fromRGB(255, 120, 80),
	Color3.fromRGB(80, 180, 255),
	Color3.fromRGB(120, 220, 120),
	Color3.fromRGB(220, 200, 80),
}

-- усередині spawnPad:
part.Color = colors[i] or Color3.fromRGB(200, 200, 200)
\`\`\`

Тут уже **два** масиви поруч: імена й кольори. Довжини краще тримати узгодженими або страхувати \`or\` як у зразку.

**Зроби зараз (5 хв):** зміни лише масив імен (додай/прибери рядок) і перезапусти Play — кількість плит має змінитись сама.`,
 },
 {
 title: "nil, дірки й типові «тихі» помилки",
 content: `Найчастіші поломки дня:

1. \`names[0]\` або \`names[5]\` коли довжина 4 → \`nil\` → конкатенація падає або Billboard порожній.
2. Забув \`#\` і написав \`for i = 1, names\` — names це table, не число.
3. Плутанина \`names.i\` vs \`names[i]\`: крапка шукає ключ \`"i"\`, не індекс змінної i.
4. Немає \`clearPads\` — кожен Play плодить ще один ряд «привидів».
5. Script у LocalScript «бо так було в GUI» — спавн світу лишай на серверному Script.

Коли \`print(names[i])\` показує \`nil\` посеред циклу — зупинись. Не маскуй через \`tostring\`. Знайди, чому індекс вийшов за межі або масив зібраний із діркою. Тихий \`nil\` — найзліший вчитель у tables: код «ніби працює», але одна плита без імені.

Дірка приклад (поки лише знати, не робити навмисне):

\`\`\`lua
local t = {"A", "B"}
t[4] = "D" -- місця 3 немає
print(#t)  -- поведінка довжини може здивувати
\`\`\`

Для курсу 4.1: заповнюй список підряд. Краса «розріджених» tables — не сьогодні. Якщо дуже хочеться «дірку для сюжету» — зроби окремий масив коротший, а не дірку всередині одного.

Ще дрібниця: не змішуй у одному масиві рядки й Parts (Instance). Сьогодні масив — **дані-рядки** (або кольори). Parts народжуються в циклі. Так легше читати і завтра винести в Config.

**Зроби зараз (4 хв):** навмисно зроби помилку з індексом 0, подивись Output, виправ.`,
 },
 {
 title: "Де тримати Script і як назвати дані",
 content: `Рекомендація уроку:
- Folder \`ArrayLab\` у Workspace
- Script \`NamePadSpawner\` у цьому Folder або в ServerScriptService з посиланням на Folder
- масив \`names\` наверху Script — видно одразу

Імена елементів масиву бери **короткі латиницею** або прості українські трансліти без пробілів, якщо клеїш у \`Pad_\` .. name. Пробіл у Name Part можливий, але префікс-фільтри й шляхи ускладнюються. \`Alpha\`, \`Gate\`, \`Risk\` — ок.

Не ховай масив на 80 рядків нижче після трьох functions «про всяк випадок». Дані, які редагуєш найчастіше, тримай зверху — як Config, тільки ще всередині одного Script. Справжній виніс у ModuleScript — **4.5**.

Якщо ставиш Billboard: Text = name з масиву, не захардкодь «Pad» на всіх. Інакше візуально не доведеш, що table працює.

**Зроби зараз (3 хв):** перевір Explorer — чи Names плит збігаються з рядками масиву.`,
 },
 {
 title: "Міні-карта модуля Tables (щоб не забігати)",
 content: `| Урок | Фокус | Ти ще не робиш сьогодні |
|------|--------|-------------------------|
| **4.1** | масив + for/ipairs + спавн з імен | прайс-словник |
| 4.2 | ключі-рядки, ціни, \`canAfford\` intro | DataStore |
| 4.3 | \`insert\` / \`remove\`, інвентар | ModuleScript |
| 4.4 | масив записів \`{name=, power=}\` | сейв у хмару |
| 4.5 | \`require\` Config | вітрина-бос |
| 4.6 | DataStore lite | Remotes |
| 4.7 | data-driven вітрина | повний Tycoon M7 |
| 4.8 | Checkpoint M4 | новий синтаксис |

Tycoon як жанр у новій сітці курсу живе в **M7**. Тут M4 — про **дані**. Не збирай дропер «бо в старому підручнику так було».

**Зроби зараз (2 хв):** скажи вголос одним реченням, чим 4.1 відрізняється від 3.5.`,
 },
 {
 title: "Play-тест NamePads_v1 і Save",
 content: `Після спавну геймплей тут простий — важливі **дані**. Красивий ряд без зв’язку з table не здає урок.

**Чекліст:**
- [ ] Є table-масив із ≥3 іменами наверху Script (видно одразу)
- [ ] Цикл \`for\` / \`ipairs\` читає масив
- [ ] Parts з’являються з іменами (або підписами) з даних
- [ ] Повторний Play не плодить дублікати без очистки
- [ ] Functions для spawn/clear — плюс, не штраф
- [ ] Немає словника цін, insert/remove-інвентаря, DataStore, ModuleScript Config
- [ ] Save: \`Lesson 4.1 - NamePads_v1\`

Peer-demo: 15 секунд — відкрий Script, покажи масив, Play, тицьни на Pad_Gamma. Якщо викладач змінює масив разом із тобою й після Play світ змінюється — урок здав. Це сильніше за довгий монолог «я знаю, що таке table».

Перед Save прибери тестовий спам \`print\` у циклі, якщо він заважає читати Output. Один \`print(#names)\` на старті — навпаки корисний для здачі.

Перевір також, що ArrayLab не наїхав на FinishPad міні-гри: гравець не повинен «випадково виграти», наступивши на лабораторію даних. Зсунь \`start\`, якщо треба.

Коротко в нотатку портфоліо: «масив імен → for → Parts». Це зерно всього M4. Наступні уроки лише змінять *форму* table, не скасують цю звичку.`,
 },
 {
 title: "Погляд у 4.2 — словники й прайс",
 content: `Завтра (або наступного уроку) table відкриється іншим боком: не лише \`[1][2][3]\`, а \`prices["JumpPad"] = 50\`. З’явиться питання «чи вистачає монет» — легкий \`canAfford\`.

Сьогодні не стрибай туди з фейковою валютою «на виріст». Закрий чесний список і спавн. Інакше змішаєш індекси й ключі в одній каші й не зрозумієш, що саме зламалось.

Масив, який уже працює, стане фундаментом: прайс часто тримають словником, а вітрину товарів — списком імен або записів. Крок за кроком.`,
 },
 {
 title: "Практика A — Разом (10 хв)",
 content: `1. Створіть Folder \`ArrayLab\`.
2. Оголосіть \`names\` з 4 рядків.
3. Напишіть цикл \`ipairs\` і \`print\`.
4. Замініть print на \`spawnPad\` (можна без function спочатку, потім винести).
5. Додайте \`clearPads\` і перевірте другий Play.

**Критерій:** у світі стільки плит, скільки рядків у масиві; імена збігаються.`,
 },
 {
 title: "Практика B — Самостійно (12 хв)",
 content: `1. Додай Billboard або різні кольори з другого масиву.
2. Зсунь \`start\` / \`step\`, щоб ряд не наїжджав на міні-гру M3.
3. Додай 5-й елемент лише в table — без нового копипаст-блоку Instance.new.
4. Переконайся, що індекс 1 працює (не починай з 0).
5. Save \`Lesson 4.1 - NamePads_v1\`.

**Критерій:** зміна масиву змінює світ після Play; дублікатів немає.`,
 },
 {
 title: "Практика C — Челендж (8 хв)",
 content: `Обери один:
- зигзаг позицій від \`i % 2\` при тих самих іменах;
- масив \`sizes\` узгоджений з \`names\` (різний Size);
- коротко відсортувати показ: спавнити в зворотному порядку \`for i = #names, 1, -1\`.

**Не роби:** словник цін і покупки, \`table.insert\` як головну тему, DataStore, ModuleScript Config, Tycoon-дропер.

Челендж — зірочка поверх зданого списку.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Індекс з 0 як у інших мовах",
 fix: "У Luau масиви з 1. names[0] майже завжди nil.",
 },
 {
 mistake: "Пише names.i замість names[i]",
 fix: "Для індексу зі змінної потрібні квадратні дужки.",
 },
 {
 mistake: "for i = 1, names без #",
 fix: "Верхня межа — число. Використовуй #names.",
 },
 {
 mistake: "Масив є, але Part завжди з одним і тим самим Name",
 fix: "Підставляй names[i] / name з ipairs у властивості Part.",
 },
 {
 mistake: "Немає очистки — дублікати щоPlay",
 fix: "clearPads перед спавном, як у 3.5/3.6.",
 },
 {
 mistake: "Спавн світу в LocalScript",
 fix: "Серверний Script. LocalScript лишай для GUI.",
 },
 {
 mistake: "Одразу тягне prices і DataStore",
 fix: "Це 4.2 і 4.6. Сьогодні лише список + цикл.",
 },
 ],
 quiz: {
 title: "Тест 4.1 — Масиви + for",
 passingScore: 70,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Головна мета уроку 4.1:",
 options: [
 "RemoteEvent магазин",
 "Масив {} + for/ipairs і спавн з імен",
 "SpringConstraint",
 "Publish experience",
 ],
 correctAnswer: 1,
 explanation: "Список даних керує світом.",
 },
 {
 id: "q2",
 type: MC,
 question: "У Luau перший елемент масиву зазвичай під індексом:",
 options: [
 "0",
 "1",
 "-1",
 "nil",
 ],
 correctAnswer: 1,
 explanation: "Індексація з 1.",
 },
 {
 id: "q3",
 type: MC,
 question: "#names для чистого списку означає:",
 options: [
 "Ім’я гравця",
 "Довжину / кількість елементів масивної частини",
 "Обов’язковий DataStore",
 "Кількість Remote",
 ],
 correctAnswer: 1,
 explanation: "Довжина списку.",
 },
 {
 id: "q4",
 type: MC,
 question: "Що зробить print(names[0]) для звичайного списку на кшталт Alpha, Beta?",
 options: [
 "Надрукує Alpha",
 "Надрукує nil (або порожньо)",
 "Видалить Terrain",
 "Увімкне Party Mode",
 ],
 correctAnswer: 1,
 explanation: "Нульового індексу в такому масиві немає.",
 },
 {
 id: "q5",
 type: MC,
 question: "ipairs(names) зручний, коли:",
 options: [
 "Треба обійти масив по порядку з індексом і значенням",
 "Треба лише Lighting",
 "Обов’язковий Hinge",
 "Заборонений for",
 ],
 correctAnswer: 0,
 explanation: "Обхід списку.",
 },
 {
 id: "q6",
 type: MC,
 question: "Чим 4.1 логічно продовжує 3.5?",
 options: [
 "Замінює for на Tween з Toolbox",
 "Додає table з даними, які for читає (імена), а не лише число n",
 "Скасовує Anchored",
 "Додає обов’язковий BadgeService",
 ],
 correctAnswer: 1,
 explanation: "Data + цикл.",
 },
 {
 id: "q7",
 type: MC,
 question: "names.i при живій змінній i — це:",
 options: [
 "Те саме, що names[i] завжди",
 "Звернення до ключа з іменем i, а не до індексу зі значенням змінної i",
 "Синтаксис DataStore",
 "Видалення Part",
 ],
 correctAnswer: 1,
 explanation: "Потрібні квадратні дужки.",
 },
 {
 id: "q8",
 type: MC,
 question: "Навіщо clearPads перед спавном?",
 options: [
 "Щоб увімкнути Atmosphere",
 "Щоб повторний Play не плодив дублікати плит",
 "Щоб створити RemoteFunction",
 "Щоб вимкнути CanCollide глобально",
 ],
 correctAnswer: 1,
 explanation: "Гігієна спавну.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що з цього НЕ тема 4.1?",
 options: [
 "Масив імен",
 "#t",
 "DataStoreService:GetAsync",
 "ipairs",
 ],
 correctAnswer: 2,
 explanation: "DataStore — 4.6.",
 },
 {
 id: "q10",
 type: MC,
 question: "Рекомендований Save:",
 options: [
 "Untitled",
 "Lesson 4.1 - NamePads_v1",
 "Module 7 Tycoon only",
 "Lesson 3.2 - Kill only",
 ],
 correctAnswer: 1,
 explanation: "Артефакт уроку.",
 },
 {
 id: "q11",
 type: MC,
 question: "Де логічно тримати скрипт спавну світу?",
 options: [
 "LocalScript у TextButton",
 "Звичайний Script (сервер)",
 "Лише всередині Sound",
 "Обов’язково в Terrain",
 ],
 correctAnswer: 1,
 explanation: "Світ на сервері.",
 },
 {
 id: "q12",
 type: MC,
 question: "Якщо додати п’ятий рядок у names і перезапустити Play (з clear+spawn):",
 options: [
 "Нічого не зміниться без нового Script-файла",
 "Має з’явитись п’ята плита без копипасту Instance.new",
 "Обов’язково впаде Studio",
 "Видалиться WinFrame",
 ],
 correctAnswer: 1,
 explanation: "Дані керують кількістю.",
 },
 {
 id: "q13",
 type: MC,
 question: "pairs vs ipairs на початку M4:",
 options: [
 "Для чистого списку імен у 4.1 краще ipairs (або for 1..#t); pairs більше про всі ключі/словники",
 "pairs завжди заборонений у Roblox",
 "ipairs працює лише в LocalScript",
 "Немає різниці ніколи",
 ],
 correctAnswer: 0,
 explanation: "Список vs загальний обхід.",
 },
 {
 id: "q14",
 type: MC,
 question: "Function spawnPad у цьому уроці:",
 options: [
 "Заборонена, бо functions були в 3.6",
 "Бажана гігієна: table + function разом",
 "Обов’язковий ModuleScript",
 "Працює лише з RopeConstraint",
 ],
 correctAnswer: 1,
 explanation: "Спіраль навичок.",
 },
 {
 id: "q15",
 type: MC,
 question: "Наступний урок 4.2 зосередиться на:",
 options: [
 "Словниках (ключі-рядки) і прайсі / canAfford intro",
 "Лише Terrain Paint",
 "Publish Showcase",
 "HingeConstraint дверях як новій мові",
 ],
 correctAnswer: 0,
 explanation: "Словники й ціни.",
 },
 ],
 },
}

export const ukLesson42 = {
 lessonId: "lesson-roblox-4-2",
 moduleId: "module-04",
 order: 2,
 title: "4.2 - Дропер монет",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Відтворюйте Parts TycoonCoin з дроппера на таймері",
 "Нагородні монети, коли краплі торкаються панелі колекціонера",
 "Використовуйте сміття для автоматичного очищення деталей",
 "Збалансуйте швидкість появи для продуктивності",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**крапельниця** друкує гроші. **Колекціонер** зберігає його.

**Хід уроку:**
1. **Теорія (40 хв)** - spawn луп + колектор
2. **Практика (~25 хв)** - робоча стартова машина
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 4.1 - Змова магната**.`,
 },
 {
 title: "Parts системи крапельниці",
 content: `в\`PlotA/DropperZone\`:

| Об'єкт | Ім'я |
|--------|------|
| Корпус машини |\`Dropper_01\`|
| Точка появи |\`SpawnPoint\`(маленька невидима або неонова Part) |
| Батьківський Script |\`Dropper_01\`|

**SpawnPoint** Позиція = місце появи монет (над машиною).

**Колекціонер** в\`CollectorZone\`:
- Part\`CollectorPad\`- зелений, Anchored, CanCollide true`,
 },
 {
 title: "Цикл спавнера",
 content: `**Script** всередині\`Dropper_01\`:\`\`\`lua
local dropper = script.Parent
local spawnPoint = dropper:WaitForChild("SpawnPoint")
local Debris = game:GetService("Debris")

while true do
 local coin = Instance.new("Part")
 coin.Name = "TycoonCoin"
 coin.Size = Vector3.new(1.2, 1.2, 1.2)
 coin.Shape = Enum.PartType.Ball
 coin.BrickColor = BrickColor.new("Bright yellow")
 coin.Material = Enum.Material.Neon
 coin.Position = spawnPoint.Position + Vector3.new(0, 2, 0)
 coin.Anchored = false
 coin.CanCollide = true
 coin.Parent = workspace

 Debris:AddItem(coin, 25)

 task.wait(2)
end
\`\`\`**\`Debris:AddItem(part, 25)\`** видаляє монету через 25 секунд - запобігає затримці.`,
 },
 {
 title: "Колекційні нагороди Монети",
 content: `**Script** в\`CollectorPad\`:\`\`\`lua
local collector = script.Parent
local COIN_VALUE = 1

collector.Touched:Connect(function(hit)
 if hit.Name ~= "TycoonCoin" then
 return
 end

 local character = hit.Parent
 local humanoid = character and character:FindFirstChildOfClass("Humanoid")
 if not humanoid then
 -- Coin touched collector, not player foot
 end

 local Players = game:GetService("Players")
 -- For solo plot: award to any player who owns tycoon - first player for now:
 local player = Players:GetPlayers()[1]
 if not player then return end

 local stats = player:FindFirstChild("leaderstats")
 local coins = stats and stats:FindFirstChild("Coins")
 if coins then
 coins.Value += COIN_VALUE
 end

 hit:Destroy()
end)
\`\`\`**Вправа (10 хв.):** Спостерігайте за ростом монет, не торкаючись монет вручну.`,
 },
 {
 title: "Поліпшення колекціонера - гравця з монети",
 content: `Кращий шаблон: відстежуйте IntValue власника ділянки пізніше. Наразі нагороджуйте лише **власника ділянки**:

Магазин\`OwnerUserId\`у папці PlotA (IntValue) встановлено ваш UserId у тесті Studio.\`\`\`lua
local plot = workspace.Plots.PlotA
local ownerId = plot:FindFirstChild("OwnerUserId")

-- find player where player.UserId == ownerId.Value
\`\`\`Урок 4.5 додає повне право власності на кілька ділянок. Соло: використання\`Players:GetPlayers()[1]\`якщо один.`,
 },
 {
 title: "Трюк з нахилом конвеєра",
 content: `Кут **ConveyorPath** розташовується на **2-5 градусів** до колектора, щоб кульки котилися.

Або використовуйте матеріал із **низьким тертям** на шляху (лід або спеціальні фізичні Properties пізніше).

**Тест:** монета має дістатися до колекціонера протягом **10 секунд** після появи.`,
 },
 {
 title: "Правила виконання",
 content: `| Правило | Чому |
|------|-----|
| З’являтися кожні **≥ 1 с** | Занадто швидко = сотні Parts |
| Прибирання сміття **20-30 с** | Сітка безпеки |
| Знищити на зборі | Миттєве звільнення пам'яті |
| Тримайте монети всередині огорожі ділянки | Менше безладу в світі |

**Якщо відстає:** збільште\`task.wait\`до 3 секунд.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Dropper породжує жовтий TycoonCoin кожні 2 секунди
- [ ] Колекціонер додає +1 монети та знищує монету
- [ ] Сміття видаляє заблукані монети
- [ ] Зберегти:\`Lesson 4.2 - Coin Dropper\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Без сміття - сотні деталей",
 explanation: "Сервер сповільнюється.",
 correctApproach: "Сміття: Додавайте предмет кожного спауну",
 },
 {
 mistake: "Колектор перевіряє неправильну назву",
 explanation: "TycoonCoin має точно збігатися.",
 correctApproach: "coin.Name = \"TycoonCoin\" у створювачі",
 },
 {
 mistake: "SpawnPoint відсутній",
 explanation: "WaitForChild поступається назавжди.",
 correctApproach: "Дочірня Part під назвою SpawnPoint у Dropper_01",
 },
 {
 mistake: "Anchored true на краплях",
 explanation: "Монети ніколи не переходять до колекціонера.",
 correctApproach: "Anchored false на TycoonCoin",
 },
 ],
 summary: "Ви побудували петлю спауну за допомогою очищення сміття та збирача, який перетворює монети TycoonCoins у монети лідерів - ваш магнат отримує пасивний дохід.",
 practiceTask: {
 title: "Початкова машина з крапельницею (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Дохід у стилі AFK на вашій ділянці.

### Part A - крапельниця (12 хв)
1. \`Dropper_01\` + \`SpawnPoint\` + spawn Script
2. Уламки 25 на кожній монеті
3. Грайте - монети з'являються кожні 2 секунди

### Part B - Колекціонер (10 хв)
1.\`CollectorPad\`Скрипт - +1 монети, знищити монету
2. Нахиліть шлях, щоб монети досягли майданчика
3. Стенд 30s - монети збільшуються без ручного збору

### Part C - Зберегти (3 хв)
1. **Зберегти в Roblox** →\`Lesson 4.2 - Coin Dropper\` 2. **Практика завершена**`,
 hints: [
 "Друкуйте монети. Оцінюйте кожні 5 секунд, щоб підтвердити пасивний дохід",
 "Якщо монети застрягли, поставте прапорець «Anchored false» і нахил шляху",
 "Збирач має бути серверним Script",
 ],
 optionalChallenge: "Кольори бронзової/срібної/золотої монети вартістю 1/2/5 (випадкове поява).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "TycoonCoin має бути Anchored...",
 options: [
 "false",
 "завжди true",
 "лише для UI",
 "лише в Terrain",
 ],
 correctAnswer: 0,
 explanation: "не Anchored Parts котяться.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Уламки: AddItem запобігає...",
 options: [
 "Лаг від накопичення Parts",
 "Збереження даних",
 "Відображення UI",
 "Чекпоінти",
 ],
 correctAnswer: 0,
 explanation: "Автоматичне знищення старих крапель.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Колекціонер знищує монету після...",
 options: [
 "Нарахування валюти",
 "Зміна неба",
 "Публікація",
 "Перейменування",
 ],
 correctAnswer: 0,
 explanation: "Знищення запобігає подвійному збору.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "цикл while із task.wait...",
 options: [
 "Повторює spawn безкінечно",
 "Виконується один раз",
 "Видаляє гравця",
 "Прибирає HUD",
 ],
 correctAnswer: 0,
 explanation: "Петля = безперервне виробництво.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "SpawnPoint - це...",
 options: [
 "Де з’являються монети",
 "Лише spawn гравця",
 "DataStore",
 "VictoryGui",
 ],
 correctAnswer: 0,
 explanation: "Посилання на позицію відродження.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "COIN_VALUE = 1 означає...",
 options: [
 "Кожна монета дає 1 до Coins",
 "Видаляє 1 Part",
 "Чекає 1 секунду",
 "Створює 1 гравця",
 ],
 correctAnswer: 0,
 explanation: "Ціна за зібрану краплю.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Перевірка hit.Name гарантує...",
 options: [
 "Рахуються лише TycoonCoins",
 "Рахуються всі Parts",
 "Рахується Terrain",
 "Рахується Sky",
 ],
 correctAnswer: 0,
 explanation: "Фільтрувати за назвою Parts.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Занадто швидкий інтервал появи викликає...",
 options: [
 "Лаг",
 "Краща графіка",
 "Автозбереження",
 "Безкоштовні Robux",
 ],
 correctAnswer: 0,
 explanation: "Забагато Parts фізики.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Dropper Script працює на...",
 options: [
 "Server",
 "Лише HUD клієнта",
 "StarterGui",
 "Player Head",
 ],
 correctAnswer: 0,
 explanation: "Сервер породжує Parts світу.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 4.2 зберегти назву...",
 options: [
 "Lesson 4.2 - Coin Dropper",
 "Tycoon Plot",
 "Coin Functions",
 "Obby Timer",
 ],
 correctAnswer: 0,
 explanation: "Зберегти робочу машину.",
 },
 ],
 },
}

export const ukLesson43 = {
 lessonId: "lesson-roblox-4-3",
 moduleId: "module-04",
 order: 3,
 title: "4.3 - Кнопка покупки",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть панель для покупок, яка знімає монети",
 "Використовуйте прапорець покупки, щоб запобігти подвійним покупкам",
 "Відкрийте другу крапельницю після успішної покупки",
 "Дайте чіткий відгук про успіх і недостатність коштів",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Пасивний дохід - перший крок. **Витрати** на оновлення - це другий крок.

**Хід уроку:**
1. **Теорія (40 хв)** - потік кнопки "купити".
2. **Практика (~25 хв)** - розблокуйте Dropper_02 за 50 монет
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 4.2 - Розпилювач монет**. Заробіть ~50 монет від Dropper_01 перед тестовою покупкою.`,
 },
 {
 title: "Потік покупки (5 кроків)",
 content: `1. Гравець торкається **клавіатури для купівлі**
2. Перевірте **ще не придбано**
3. Прочитайте **leaderstats.Coins**
4. Якщо **Монети >= ціна** → відніміть ціну
5. **Відкрити** нову машину + кнопка приховати`,
 },
 {
 title: "Купити планшетний скрипт",
 content: `Увімкнено\`BuyButtons/Buy_Dropper2_Pad\`- **Script**:\`\`\`lua
local button = script.Parent
local PRICE = 50
local purchased = false

local dropper2 = workspace.Plots.PlotA.DropperZone:WaitForChild("Dropper_02")
local revealFolder = dropper2 -- hidden until buy

-- Start hidden:
dropper2.Parent = nil -- or Transparency 1 on all parts + disabled script

button.Touched:Connect(function(hit)
 if purchased then
 return
 end

 local character = hit.Parent
 if not character then return end
 local humanoid = character:FindFirstChildOfClass("Humanoid")
 if not humanoid then return end

 local player = game:GetService("Players"):GetPlayerFromCharacter(character)
 if not player then return end

 local coins = player:FindFirstChild("leaderstats")
 coins = coins and coins:FindFirstChild("Coins")
 if not coins then return end

 if coins.Value < PRICE then
 print(player.Name .. " needs more coins!")
 button.BrickColor = BrickColor.new("Really red")
 task.wait(0.3)
 button.BrickColor = BrickColor.new("New Yeller")
 return
 end

 coins.Value -= PRICE
 purchased = true

 dropper2.Parent = workspace.Plots.PlotA.DropperZone
 button.Transparency = 1
 button.CanCollide = false

 print(player.Name .. " bought Dropper 2!")
end)
\`\`\``,
 },
 {
 title: "Сховати Dropper_02 до покупки",
 content: `**Перед грою:**
1. Будувати\`Dropper_02\`клон Dropper_01 (той же SpawnPoint + скрипт)
2. Набір\`dropper2.Parent = nil\`у скрипті **один раз** угорі, АБО зберегти в\`ReplicatedStorage\`**При покупці:**\`dropper2.Parent = workspace.Plots.PlotA.DropperZone\`**Тест:** Лише один Dropper_01 на початку; після покупки з'являються дві машини.`,
 },
 {
 title: "Дебоунж придбаного прапора",
 content: `\`purchased = true\`блоки повторюють спам **Touched** - та ж ідея, що й debounce монети.

Без нього:
- Один дотик може заряджатися **3 рази**
- Монети стають негативними (погано)

**Завжди** встановлено\`purchased = true\`**до** розкриття машини.`,
 },
 {
 title: "UX відгук",
 content: `| Результат | Зворотній зв'язок |
|--------|----------|
| Успіх | Кнопка ховається, з’являється Dropper_02, звук друку |
| Недостатньо монет | Червоний спалах 0,3 с, вивід повідомлення |
| Вже купив | Ігнорувати дотик |

**BillboardGui** на панелі:\`Buy Dropper 2 - 50 Coins\`Після покупки: знищити інтерфейс або текст\`Purchased ✓\`**Вправа (5 хв):** Торкніться 10 монетами → червоний спалах. Натисніть 60 → успіх.`,
 },
 {
 title: "Підключіться до DataStore",
 content: `Покупки витрачають **збережені** монети, якщо ви закінчили Модуль 3.5 - добре.

**Майбутнє:** зберегти\`purchasedDropper2 = true\`у DataStore, тому покупка зберігається між сеансами (область уроку 4.6).

Сьогодні: сесійної покупки достатньо.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Dropper_02 прихований на початку
- [ ] Купити коштує 50, усунення дребезгу працює
- [ ] Недостатньо коштів показує червоний спалах
- [ ] Зберегти:\`Lesson 4.3 - Purchase Button\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "монети.Вартість -= ціна клієнта",
 explanation: "Безкоштовні оновлення для експлуататорів.",
 correctApproach: "Серверний скрипт на панелі покупки",
 },
 {
 mistake: "Немає купленого прапора",
 explanation: "Потрійна зарядка одним дотиком.",
 correctApproach: "purchased = true після успіху",
 },
 {
 mistake: "Dropper_02 видно з початку",
 explanation: "Немає причин купувати.",
 correctApproach: "Батьківський нульовий або прихований до покупки",
 },
 {
 mistake: "Неправильний шлях лідерів",
 explanation: "Монети ніколи не знімають.",
 correctApproach: "player.leaderstats.Монети на сервері",
 },
 ],
 summary: "Ви створили Script панелі покупок, яка перевіряє монети, один раз знімає ціну, показує Dropper_02 і дає червоний/зелений зворотний зв’язок - цикл оновлення магната живий.",
 practiceTask: {
 title: "Розблокувати Dropper 2 (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** 50 монет відкриває другу машину.

### Part A - Прихована машина (8 хв)
1. Клон\`Dropper_01\`→\`Dropper_02\`(приховано до покупки)
2. Купити колодку\`Buy_Dropper2_Pad\`в зоні BuyButtons

### Part B - Script покупки (12 хв)
1. ЦІНА 50, придбаний прапор, вирахування монет
2. Відкрийте Dropper_02, кнопку приховати
3. Червоний спалах, коли зламався

### Part C - Перевірте та збережіть (5 хв)
1. Заробіть 50+ від Dropper_01 - купіть - запускаються два дроппера
2. **Зберегти в Roblox** →\`Lesson 4.3 - Purchase Button\` 3. **Практика завершена**`,
 hints: [
 "Друкувати монети. Значення до/після покупки під час тестування",
 "Приховати Dropper_02 з Parent = nil під час запуску Script",
 "Сенсорна панель для покупки з Humanoid - станьте на панель",
 ],
 optionalChallenge: "Оновлення цінників BillboardGui для Purchased.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Script покупки має працювати на...",
 options: [
 "Server",
 "Лише LocalScript",
 "Terrain",
 "Sky",
 ],
 correctAnswer: 0,
 explanation: "Сервер безпечно знімає монети.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "придбано = true запобігає...",
 options: [
 "Подвійна покупка",
 "Spawn монет",
 "Збереження даних",
 "Рух камери",
 ],
 correctAnswer: 0,
 explanation: "Debounce для покупки.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "монети.Вартість -= ціна, коли...",
 options: [
 "Coins >= price",
 "Завжди",
 "Ніколи",
 "Лише в Edit",
 ],
 correctAnswer: 0,
 explanation: "Стягуйте лише якщо це доступно.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Відгук про брак коштів...",
 options: [
 "Червоний спалах + повідомлення",
 "Безкоштовна машина",
 "Видалити ділянку",
 "Скинути DataStore",
 ],
 correctAnswer: 0,
 explanation: "Очистити відгук про помилку.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Dropper_02 прихований за допомогою...",
 options: [
 "Parent = nil до покупки",
 "Видалити назавжди",
 "LocalScript",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Розкрити шляхом переродження.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "ЦІНА = 50 означає...",
 options: [
 "Коштує 50 Coins",
 "Створює 50 Parts",
 "50 гравців",
 "Лише 50 секунд",
 ],
 correctAnswer: 0,
 explanation: "Вартість валюти.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Посилання GetPlayerFromCharacter...",
 options: [
 "Дотик до облікового запису гравця",
 "Part до Terrain",
 "UI до Sky",
 "Звук до лави",
 ],
 correctAnswer: 0,
 explanation: "Хто купує.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Після успіху частіше купуйте прокладку...",
 options: [
 "Transparency 1 / приховано",
 "Дублює ціну",
 "Створює лаву",
 "Прибирає leaderstats",
 ],
 correctAnswer: 0,
 explanation: "Не можу купити знову.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Покращення Tycoon використовують валюту з...",
 options: [
 "leaderstats Coins",
 "Лише print()",
 "Terrain",
 "ClockTime",
 ],
 correctAnswer: 0,
 explanation: "Така сама статистика монет, як у модулі 3.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 4.3 зберегти назву...",
 options: [
 "Lesson 4.3 - Purchase Button",
 "Coin Dropper",
 "Tycoon Plot",
 "Coin Simulator",
 ],
 correctAnswer: 0,
 explanation: "Збереження після розблокування працює.",
 },
 ],
 },
}

export const ukLesson44 = {
 lessonId: "lesson-roblox-4-4",
 moduleId: "module-04",
 order: 4,
 title: "4.4 - Таблиці та апгрейди",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Зберігайте рівні оновлення в таблицях Luau",
 "Змініть швидкість крапельниці та вартість монети з конфігураційних даних",
 "Купуйте оновлення з індексом рівня замість жорстко закодованих Scripts",
 "Відновіть баланс економіки, редагуючи лише номери таблиць",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Жорстко закодований\`if tier == 2 then wait(1.5)\`перерви, коли у вас є 10 рівнів. **Таблиці** це виправляють.

**Хід уроку:**
1. **Теорія (40 хв)** - таблиця підвищення + індекс рівня
2. **Практика (~25 хв)** - 3-рівневі покращення дроппера
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 4.3 - Кнопка придбання**.`,
 },
 {
 title: "Що таке конфігураційна таблиця?",
 content: `**Таблиця** в Luau - це набір записів, як електронна таблиця в коді.\`\`\`lua
local upgrades = {
 { tier = 1, price = 0, spawnWait = 2.0, coinValue = 1 },
 { tier = 2, price = 100, spawnWait = 1.5, coinValue = 2 },
 { tier = 3, price = 300, spawnWait = 1.0, coinValue = 4 },
}
\`\`\`**Змінити баланс?** Тут можна редагувати цифри, а не 20 Scripts.`,
 },
 {
 title: "Доступ до рядків таблиці за індексом",
 content: `\`\`\`lua
local currentTier = 2
local data = upgrades[currentTier]

print(data.spawnWait) -- 1.5
print(data.coinValue) -- 2
\`\`\`**\`#upgrades\`** = скільки існує рівнів.

**Повторити всі рівні:**\`\`\`lua
for i, row in ipairs(upgrades) do
 print(i, row.price, row.spawnWait)
end
\`\`\`**Вправа (5 хв.):** Вивести всі три рівні.`,
 },
 {
 title: "Tier IntValue на графіку",
 content: `Всередині\`PlotA\`додати **IntValue**\`DropperTier\`починаючи з **1**.

Коли гравець купує планшет для оновлення:
1. Перевірка\`Coins >= upgrades[currentTier + 1].price\` 2. Відніміть ціну
3.\`DropperTier.Value += 1\`Script Dropper зчитує рівень кожного породження:\`\`\`lua
local plot = workspace.Plots.PlotA
local tierValue = plot:WaitForChild("DropperTier")
local tier = tierValue.Value
local data = upgrades[tier] or upgrades[1]

task.wait(data.spawnWait)
-- spawn coin, collector uses data.coinValue
\`\`\``,
 },
 {
 title: "Рефакторинг циклу дроппера",
 content: `\`\`\`lua
local upgrades = {
 { tier = 1, price = 0, spawnWait = 2.0, coinValue = 1 },
 { tier = 2, price = 100, spawnWait = 1.5, coinValue = 2 },
 { tier = 3, price = 300, spawnWait = 1.0, coinValue = 4 },
}

local plot = workspace.Plots.PlotA
local spawnPoint = script.Parent:WaitForChild("SpawnPoint")
local tierValue = plot:WaitForChild("DropperTier")
local Debris = game:GetService("Debris")

while true do
 local tier = math.clamp(tierValue.Value, 1, #upgrades)
 local data = upgrades[tier]

 local coin = Instance.new("Part")
 coin.Name = "TycoonCoin"
 coin.Size = Vector3.new(1.2, 1.2, 1.2)
 coin.Shape = Enum.PartType.Ball
 coin.BrickColor = BrickColor.new("Bright yellow")
 coin.Position = spawnPoint.Position + Vector3.new(0, 2, 0)
 coin.Anchored = false
 coin:SetAttribute("CoinValue", data.coinValue)
 coin.Parent = workspace
 Debris:AddItem(coin, 25)

 task.wait(data.spawnWait)
end
\`\`\`**SetAttribute** зберігає значення в Part для читання збирачем.`,
 },
 {
 title: "Колектор читає атрибут",
 content: `\`\`\`lua
local value = hit:GetAttribute("CoinValue") or 1
coins.Value += value
\`\`\`Монети рівня 3 вартістю **4** кожна - гравець відчуває сплеск сили.

**На панелі для покупки оновлення** відображається ціна наступного рівня з таблиці:\`\`\`lua
local nextTier = tierValue.Value + 1
local nextData = upgrades[nextTier]
if not nextData then return end -- max tier
if coins.Value < nextData.price then return end
coins.Value -= nextData.price
tierValue.Value = nextTier
\`\`\``,
 },
 {
 title: "Збалансування робочого процесу",
 content: `| Тест | Цільове відчуття |
|------|-------------|
| Рівень 2 доступний | ~2 хвилини Dropper_01 |
| Рівень 3 має значення | ~5-8 хвилин всього |
| Spawn + WaitForChild зміни | Помітно швидше падає |
| зміна coinValue | Більше число стрибає на HUD |

**Лише редагувати таблицю** → Play → повторити. Справжні дизайнери ігор працюють саме так.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] оновлює таблицю з 3 рядками
- [ ] DropperTier IntValue на PlotA
- [ ] Dropper використовує spawnWait зі столу
- [ ] Колекціонер використовує атрибут CoinValue
- [ ] Зберегти:\`Lesson 4.4 - Upgrade Tables\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "індекс рівня поза діапазоном",
 explanation: "Рівень 4, коли таблиця має 3 рядки.",
 correctApproach: "math.clamp(tier, 1, #upgrades)",
 },
 {
 mistake: "Жорстко закодований wait(2) все ще в циклі",
 explanation: "Таблиця проігнорована.",
 correctApproach: "лише task.wait(data.spawnWait).",
 },
 {
 mistake: "Колекціонер завжди +1",
 explanation: "Атрибут не прочитано.",
 correctApproach: "GetAttribute CoinValue під час звернення",
 },
 {
 mistake: "Ціна в скрипті buy != ціна таблиці",
 explanation: "Десинхронізація заплутує гравців.",
 correctApproach: "Завжди читайте upgrades[nextTier].price",
 },
 ],
 summary: "Ви зберігаєте рівні оновлення в таблицях, керуєте швидкістю появи та вартістю монет з даних і купуєте рівні з цінами з тієї самої конфігурації - робочий процес балансування професійного магната.",
 practiceTask: {
 title: "Трирівневі оновлення (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Купуйте 2-й і 3-й рівень - випадання швидше, вища вартість.

### Part A - Конфігурація (8 хв)
1.\`upgrades\`стіл (3 яруси) в дроппері + купити скрипти
2.\`DropperTier\`IntValue = 1 на PlotA

### Part B - Системи проводів (12 хв)
1. Цикл Dropper використовує spawnWait з рівня
2. Колекціонер додає GetAttribute CoinValue
3. Придбайте рівень покращення планшета (100, потім 300 монет)

### Part C - Баланс і збереження (5 хв)
1. Час перевірки гри до рівня 2 - скоригуйте таблицю, якщо потрібно
2. **Зберегти в Roblox** →\`Lesson 4.4 - Upgrade Tables\` 3. **Практика завершена**`,
 hints: [
 "Друк поточного рівня після кожної покупки",
 "Затисніть індекс рівня, щоб помилки ніколи не порушували spawnер",
 "Одна спільна таблиця оновлень - скопіюйте в обидва Scripts або використайте ModuleScript пізніше",
 ],
 optionalChallenge: "Престиж рівня 4 - ціна 1000, spawnWait 0,6, coinValue 10.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Таблиці конфігурації допомога...",
 options: [
 "Баланс без редагування багатьох Scripts",
 "Видалити Terrain",
 "Прибрати UI",
 "Вимкнути збереження",
 ],
 correctAnswer: 0,
 explanation: "Дизайн, керований даними.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "оновлення[2] отримує...",
 options: [
 "Другий рядок рівня",
 "Два гравці",
 "Завжди 2 монети",
 "Завжди помилка",
 ],
 correctAnswer: 0,
 explanation: "Числовий індекс в табл.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "DropperTier IntValue зберігає...",
 options: [
 "Поточний рівень покращення",
 "Ім’я гравця",
 "Колір неба",
 "Seed Terrain",
 ],
 correctAnswer: 0,
 explanation: "Індекс рівня на ділянці.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "spawnWait в елементах керування таблицею...",
 options: [
 "Секунди між spawn",
 "Стрибок гравця",
 "Файл збереження",
 "Меню Tab",
 ],
 correctAnswer: 0,
 explanation: "Інтервал нересту на ярус.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "SetAttribute CoinValue дозволяє...",
 options: [
 "Колектор читає вартість кожної монети",
 "Видалення UI",
 "Смерть від лави",
 "Spawn NPC",
 ],
 correctAnswer: 0,
 explanation: "Метадані Parts.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "цикли ipairs(upgrades)...",
 options: [
 "Кожен рядок рівня",
 "Кожен гравець",
 "Увесь Terrain",
 "Лише помилки",
 ],
 correctAnswer: 0,
 explanation: "Ітерація записів таблиці.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "math.clamp запобігає...",
 options: [
 "Невалідний індекс рівня",
 "Збереження",
 "Публікація",
 "Lighting",
 ],
 correctAnswer: 0,
 explanation: "Зберігає рівень в діапазоні.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Ціна наступного рівня має бути з...",
 options: [
 "таблиця upgrades",
 "Random()",
 "Вік гравця",
 "Колір Part",
 ],
 correctAnswer: 0,
 explanation: "Єдине джерело правди.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "coinValue 4 рівня 3 означає...",
 options: [
 "Кожна крапля варта 4 Coins",
 "4 дроппери",
 "4 гравці",
 "4 збереження",
 ],
 correctAnswer: 0,
 explanation: "Вартість однієї зібраної монети.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 4.4 зберегти назву...",
 options: [
 "Lesson 4.4 - Upgrade Tables",
 "Purchase Button",
 "Tycoon Plot",
 "Coin Simulator",
 ],
 correctAnswer: 0,
 explanation: "Зберегти систему рівнів.",
 },
 ],
 },
}

export const ukLesson45 = {
 lessonId: "lesson-roblox-4-5",
 moduleId: "module-04",
 order: 5,
 title: "4.5 - Власна ділянка для кожного гравця",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Призначайте незатребувані ділянки, коли гравці приєднуються",
 "Зберігайте OwnerUserId на кожній ділянці для перевірки права власності",
 "Блокуйте покупки та збір на ділянках інших гравців",
 "Сюжети випуску, коли гравці залишають гру",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Сольний сюжет був непоганий. **Багатокористувацькій грі** потрібна **одна база на гравця** - інакше всі крадуть машини один одного.

**Хід уроку:**
1. **Теорія (40 хв)** - претензія, ownsPlot, звільнення
2. **Практика (~25 хв)** - Автоматичне призначення PlotA + PlotB
3. **Вікторина (10 хв)** - проходження **70%**

Дублюйте PlotA → **PlotB** з окремими spawnами та зонами.`,
 },
 {
 title: "Проблема мультиплеєра",
 content: `| Спільна ділянка | Сюжет для кожного гравця |
|-------------|-----------------|
| Гравець B купує на баттоні A | Кожен має власний DropperTier |
| A заробляє монети B | А заробляє лише на ділянці А |
| Хаос на сервері для 2 гравців | Справедливі сервери Tycoon |

**OwnerUserId** = хто контролює цю ділянку.`,
 },
 {
 title: "Налаштування OwnerUserId",
 content: `Всередині **кожної** ділянки (PlotA, PlotB):

**StringValue** названо\`OwnerUserId\`- За замовчуванням\`""\`(порожній = незатребуваний)\`\`\`lua
local function isPlotFree(plot)
 local owner = plot:FindFirstChild("OwnerUserId")
 return owner and owner.Value == ""
end

local function ownsPlot(player, plot)
 local owner = plot:FindFirstChild("OwnerUserId")
 return owner and owner.Value == tostring(player.UserId)
end
\`\`\`**UserId** - це число, яке зберігає StringValue\`tostring(player.UserId)\`.`,
 },
 {
 title: "Вимагати ділянку на приєднання",
 content: `**ServerScriptService** →\`PlotClaimService\`:\`\`\`lua
local Players = game:GetService("Players")
local plotsFolder = workspace.Plots

local function claimPlot(player)
 for _, plot in plotsFolder:GetChildren() do
 if plot:IsA("Folder") or plot:IsA("Model") then
 local owner = plot:FindFirstChild("OwnerUserId")
 if owner and owner.Value == "" then
 owner.Value = tostring(player.UserId)
 local spawn = plot:FindFirstChild("SpawnLocation", true)
 if spawn and player.Character then
 player.Character:MoveTo(spawn.Position + Vector3.new(0, 3, 0))
 end
 print(player.Name .. " claimed " .. plot.Name)
 return plot
 end
 end
 end
 warn("No free plot for " .. player.Name)
end

Players.PlayerAdded:Connect(function(player)
 player.CharacterAdded:Connect(function()
 task.wait(0.5)
 claimPlot(player)
 end)
end)
\`\`\``,
 },
 {
 title: "Ворота покупки та колектор",
 content: `**Кожна** купівля та колекціонер повинні перевірити:\`\`\`lua
local plot = workspace.Plots.PlotA -- or find parent plot

local function ownsPlot(player, plot)
 local owner = plot:FindFirstChild("OwnerUserId")
 return owner and owner.Value == tostring(player.UserId)
end

-- In Touched:
if not ownsPlot(player, plot) then
 return
end
\`\`\`**Знайти ділянку за допомогою кнопки:**\`button.Parent.Parent\`або зберегти посилання на сюжет в атрибуті\`PlotName\`.

**Вправа (10 хв):** Другий гравець не може купувати на ділянці першого гравця.`,
 },
 {
 title: "Відпустіть на PlayerRemoving",
 content: `\`\`\`lua
Players.PlayerRemoving:Connect(function(player)
 for _, plot in plotsFolder:GetChildren() do
 local owner = plot:FindFirstChild("OwnerUserId")
 if owner and owner.Value == tostring(player.UserId) then
 owner.Value = ""
 -- Optional: reset DropperTier, hide Dropper_02, clear buttons
 print("Released " .. plot.Name)
 end
 end
end)
\`\`\`Нові гравці можуть отримати звільнені ділянки під час наступного приєднання.`,
 },
 {
 title: "Тестуйте з 2 гравцями в Studio",
 content: `**Test** → вкладка **Players** → додайте другого гравця.

| Тест | Очікується |
|------|----------|
| P1 приєднується | Позовна ділянка A |
| P2 приєднується | Ділянка претензій B |
| P2 торкається P1 купити панелі | Нічого / повідомлення |
| П1 листя | PlotA звільнено |
| P3 приєднується | Може вимагати PlotA |

**BillboardGui** на сюжеті:\`Owner: PlayerName\`після позову.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] PlotA та PlotB з OwnerUserId
- [ ] PlotClaimService призначає під час приєднання
- [ ] Купуйте/колекційний чек ownsPlot
- [ ] PlayerRemoving очищає власника
- [ ] Зберегти:\`Lesson 4.5 - Player Plots\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Число UserId порівняно зі значенням рядка",
 explanation: "Ніколи не збігається - усі заблоковані.",
 correctApproach: "tostring(player.UserId) обидві сторони",
 },
 {
 mistake: "Без звільнення у відпустку",
 explanation: "Ділянка назавжди залишилася порожньою або у власності.",
 correctApproach: "PlayerRemoving очищає OwnerUserId",
 },
 {
 mistake: "Забув ownsPlot на колекторі",
 explanation: "Крадіжка доходу.",
 correctApproach: "Така сама перевірка всіх взаємодій сюжету",
 },
 {
 mistake: "У грі тільки один сюжет",
 explanation: "Другому гравцеві нікуди подітися.",
 correctApproach: "Принаймні PlotA і PlotB",
 },
 ],
 summary: "Ви автоматично вимагали ділянки за допомогою OwnerUserId, охороняли покупки та колекціонери за допомогою ownsPlot і звільняли ділянки у відпустку - ваш магнат готовий до двох гравців.",
 practiceTask: {
 title: "Сюжети автоматичних претензій (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Два гравці, два сюжети, без перехресного використання.

### Part A - Ділянка B + власники (8 хв)
1. Дублюйте PlotA → PlotB (перейменуйте всі внутрішні елементи)
2. OwnerUserId StringValue на обох (порожнє за замовчуванням)

### Part B - PlotClaimService (12 хв)
1. PlayerAdded претендує на перший безкоштовний сюжет
2. ownsPlot in Scripts buy + collector
3. PlayerRemoving випускає сюжет

### Part C - Тест для двох гравців (5 хв)
1. Студійний тест із 2 гравцями
2. Перевірте відсутність перехресної покупки
3. **Зберегти в Roblox** →\`Lesson 4.5 - Player Plots\` 4. **Практика завершена**`,
 hints: [
 "Виводь owner.Value у Output, якщо дотик не спрацював - для налагодження",
 "MoveTo з’являється після вимоги, щоб гравець бачив свою базу",
 "Використовуйте FindFirstChild OwnerUserId у корені ділянки",
 ],
 optionalChallenge: "BillboardGui показує ім’я власника на знаку ділянки.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Порожній OwnerUserId означає...",
 options: [
 "Ділянка не зайнята",
 "Ділянку видалено",
 "Гру опубліковано",
 "Максимальний рівень",
 ],
 correctAnswer: 0,
 explanation: "Вільна ділянка в наявності.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "ownsPlot порівнює...",
 options: [
 "player.UserId до OwnerUserId",
 "Колір Part",
 "ClockTime",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Перевірка права власності.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "tostring(UserId) потрібен, коли...",
 options: [
 "Власник у StringValue",
 "Лише IntValue",
 "Ніколи",
 "Лише UI",
 ],
 correctAnswer: 0,
 explanation: "Тип має збігатися.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Вилучення гравця має...",
 options: [
 "Очищає власника ділянки",
 "Видаляє гру",
 "Банить усіх",
 "Прибирає DataStore",
 ],
 correctAnswer: 0,
 explanation: "Безкоштовна ділянка для наступного приєднання.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Другий гравець повинен отримати...",
 options: [
 "PlotB, якщо PlotA зайнята",
 "Та сама ділянка, що й перша",
 "Без spawn",
 "Усі ділянки",
 ],
 correctAnswer: 0,
 explanation: "Наступна вільна ділянка.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Колекціонер без ownsPlot дозволяє...",
 options: [
 "Крадіжка чужого доходу",
 "Краща графіка",
 "Швидше збереження",
 "Більше Terrain",
 ],
 correctAnswer: 0,
 explanation: "Обов'язковий збір воріт.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "PlotClaimService живе в...",
 options: [
 "ServerScriptService",
 "StarterGui",
 "Player Head",
 "Lighting",
 ],
 correctAnswer: 0,
 explanation: "Сервер призначає ділянки.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Мінімум дві ділянки для 2 гравців...",
 options: [
 "True",
 "False — однієї достатньо",
 "Лише в Модулі 1",
 "Ніколи",
 ],
 correctAnswer: 0,
 explanation: "Для кожного потрібна база.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Поява MoveTo після заявки допомагає...",
 options: [
 "Гравець бачить свою ділянку",
 "Видаляє монети",
 "Прибирає HUD",
 "Вимикає Play",
 ],
 correctAnswer: 0,
 explanation: "Очистити підключення.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 4.5 зберегти назву...",
 options: [
 "Lesson 4.5 - Player Plots",
 "Upgrade Tables",
 "Coin Dropper",
 "Obby Ready",
 ],
 correctAnswer: 0,
 explanation: "Зберігайте багатокористувацькі сюжети.",
 },
 ],
 },
}

export const ukLesson46 = {
 lessonId: "lesson-roblox-4-6",
 moduleId: "module-04",
 order: 6,
 title: "4.6 - Checkpoint: Tycoon працює",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Поставте магната з двома ділянками з доходом, покупками, оновленнями та власністю",
 "Пройдіть контрольні списки для багатокористувацької гри та контролю якості",
 "Налаштуйте перші 5 хвилин досвіду гравця",
 "Доставте портфоліо модуля 4 Tycoon Works",
 ],
 theory: {
 sections: [
 {
 title: "Контрольна точка модуля 4 (близько 40 хвилин)",
 content: `Здайте **Tycoon Works** - пасивний дохід + покупки + оновлення + **чесна багатокористувацька гра**.

**Обов’язково:**
- План ділянки (4.1)
- Крапельниця + колектор (4.2)
- Купити розблокування (4.3)
- Яруси столу (4.4)
- Позов щодо ділянки (4.5)
- Модуль 3 **Монети** + додатковий **DataStore**`,
 },
 {
 title: "60-хвилинний монтажний спринт",
 content: `| Фаза | Мін | Завдання |
|-------|-----|------|
| 1 | 10 | Folder + аудит імен |
| 2 | 15 | Дроппер + колекціонер + атрибути |
| 3 | 10 | Купити Dropper_02 + підвищення рівня |
| 4 | 10 | Сюжетний тест на двох гравців |
| 5 | 15 | QA матриця + відполіровані Parts |

**Зберегти:**\`Module 4 - Tycoon Works\``,
 },
 {
 title: "Цільовий темп прогресування",
 content: `**Перші 5 хвилин** новий гравець:
- Спаун на **своїй** ділянці
- Дивіться крапельницю, що виробляє монети
- Монети HUD ростуть без клацання
- Зрозумійте жовту етикетку **купити**

**На 8-10 хвилині:**
- Дозвольте собі **Dropper_02** АБО **оновити рівень 2**
- Зверніть увагу на більш швидкий дохід

Якщо темп надто повільний → знизити ціни\`upgrades\`тільки таблицю.`,
 },
 {
 title: "Багатокористувацька матриця QA",
 content: `| # | Тест |
|---|------|
| 1 | Гравець A претендує лише на PlotA |
| 2 | Гравець B претендує лише на PlotB |
| 3 | Б не може купити на блокноті А |
| 4 | A не може збирати на колекторі B |
| 5 | A залишає → Ділянку A звільняють → C може вимагати |
| 6 | Оновлення рівня змінює швидкість появи |
| 7 | Немає червоного виходу під час 2-хвилинної роботи в режимі холостого ходу |`,
 },
 {
 title: "Остаточна перевірка архітектури",
 content: `- [ ]\`PlotClaimService\`- приєднатися + вийти
- [ ]\`ownsPlot\`на **кожній** ділянці сенсорний Script
- [ ]\`upgrades\`таблиця - єдине джерело балансу
- [ ]\`DropperTier\`на графік (скопіювати IntValue до PlotB!)
- [ ] Сміття на всіх крапельницях
- [ ] DataStore все ще завантажує монети (Модуль 3.5)`,
 },
 {
 title: "Стандарти презентації",
 content: `- Знаки:\`Your Tycoon\`,\`Buy Upgrade\`,\`Collector\`- Neon доріжку все ще видно
- Таблиця лідерів вкладки показує монети
- Додатковий звук звукознімача на колекторі

**Демонстрація (2 хв):** заявка на сюжет → дивитися дохід → купити оновлення → показати оцінку вкладки.`,
 },
 {
 title: "Попередній перегляд модуля 5",
 content: `**Бійцівський клуб** - здоров’я Humanoid, мечі, пошкодження, відродження на арені.

Ваші магнатські монети та Scripts серверів підготували вас до **бойових економік** і **авторитету сервера** - однакові model, інший жанр.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Усі 7 тестів QA пройшли
- [ ] Два сюжети для двох гравців
- [ ] Прогрес до першого оновлення < 10 хв
- [ ] **Практика завершена** на платформі`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "PlotB відсутній DropperTier",
 explanation: "B використовує рівень A або нуль.",
 correctApproach: "Кожен графік має власні IntValues",
 },
 {
 mistake: "OwnsPlot пропущено після додавання претензії",
 explanation: "Експлойт: крадіжка оновлень.",
 correctApproach: "Повторно перевіряйте кожен торканий Script",
 },
 {
 mistake: "Перевірено тільки соло",
 explanation: "Багатокористувацька перерва після публікації.",
 correctApproach: "Потрібен тест Studio для двох гравців",
 },
 {
 mistake: "Ціни в GUI != таблиці",
 explanation: "Плутанина гравця.",
 correctApproach: "На рекламному щиті написано upgrades[nextTier].price",
 },
 ],
 summary: "Ви інтегрували дроппери, покупки, оновлення столів і сюжети для кожного гравця в Tycoon Works, пройшли перевірку якості для кількох гравців і налаштували ранній прогрес - наступним буде бій Модуля 5.",
 practiceTask: {
 title: "Здати Tycoon Works (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** Повний контрольний пункт модуля 4 проходження QA.

### Part A - Системний аудит (15 хв)
1. Запустіть контрольний список архітектури - виправте прогалини
2. PlotA + PlotB в комплекті з машинами
3. таблиця покращень + DropperTier на **кожній** ділянці

### Part B - Багатокористувацька перевірка якості (15 хв)
1. Тестова матриця 1-7 - відмітка склав/не склав
2. Негайно виправляйте будь-які міжсюжетні помилки

### Part C - Демонстрація та збереження (10 хв)
1. Одиночний запуск: 0 → перше оновлення менше 10 хв
2. **Зберегти в Roblox** →\`Module 4 - Tycoon Works\` 3. **Практика завершена** + додатковий запис для двох гравців

**Погляд вперед:** у наступному уроці (4.7) ви розширите цю ділянку до **чотириступеневого ланцюга прогресії** (dropper → колектор → 2 оновлення → нова машина) - тримайте таблицю upgrades і DropperTier чистими вже зараз, це основа великого проєкту.`,
hints: [
"Виправте вимогу/володіння ділянкою перед балансуванням цін",
"Для кожного сюжету потрібен власний DropperTier та OwnerUserId",
"Друк plot.Name у колекторі, коли потрібно налагодження",
"Чиста таблиця upgrades зараз = простіше додавання нових рівнів у проєкті 4.7",
],
optionalChallenge: "Другий шлях покупки: швидший дроппер АБО вища вартість - вибір гравця. Ця ідея стане частиною чотириступеневого ланцюга в уроці 4.7.",
},
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Tycoon Works потребує...",
 options: [
 "Дохід + купівля + покращення + ділянки",
 "Лише Terrain",
 "Лише obby",
 "Без server Scripts",
 ],
 correctAnswer: 0,
 explanation: "Повна інтеграція Module 4.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Тест 3 підтверджує...",
 options: [
 "Без покупок на чужій ділянці",
 "Колір неба",
 "Лише Terrain",
 "Публікація",
 ],
 correctAnswer: 0,
 explanation: "Ізоляція власності.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Кожна ділянка потребує свого...",
 options: [
 "DropperTier і OwnerUserId",
 "Лише один SpawnLocation у світі",
 "Завжди той самий власник",
 "Без колектора",
 ],
 correctAnswer: 0,
 explanation: "Поділковий стан.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Зміни балансу слід редагувати...",
 options: [
 "таблиця upgrades",
 "Лише кольори цегли",
 "Ім’я гравця",
 "URL Roblox",
 ],
 correctAnswer: 0,
 explanation: "Баланс, керований конфігурацією.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Цільовий час першого оновлення...",
 options: [
 "Менше ~10 хвилин",
 "Ніколи",
 "1 секунда",
 "Мінімум 1 година",
 ],
 correctAnswer: 0,
 explanation: "Ранній гачок для утримання.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Гравець залишає...",
 options: [
 "Звільняє свою ділянку",
 "Видаляє весь DataStore",
 "Банить інших",
 "Прибирає UI назавжди",
 ],
 correctAnswer: 0,
 explanation: "Реліз для нових гравців.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Сміття на крапельницях заважає...",
 options: [
 "Лаг від накопичення Parts",
 "Збереження",
 "Таблиця лідерів",
 "Чекпоінти",
 ],
 correctAnswer: 0,
 explanation: "Очищення старих монет.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Тема модуля 5...",
 options: [
 "Бій / combat",
 "Лише монети знову",
 "Лише публікація",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Модуль «Бійцівський клуб».",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Червоний вихід на холостому ході означає...",
 options: [
 "Виправити перед релізом",
 "Готово до публікації",
 "Додати більше лави",
 "Прибрати ділянки",
 ],
 correctAnswer: 0,
 explanation: "Помилки = помилки залишаються.",
 },
{
id: "q10",
type: "multiple_choice",
question: "Модуль 4 зберегти назву...",
options: [
"Module 4 - Tycoon Works",
"Lesson 3.1",
"Obby Ready",
"Untitled",
],
correctAnswer: 0,
explanation: "Name портфоліо Checkpoint.",
},
],
},
}

export const ukLesson47 = {
lessonId: "lesson-roblox-4-7",
moduleId: "module-04",
order: 7,
title: "4.7 - Проєкт: Tycoon «Міні-фабрика»",
theoryMinutes: 40,
quizMinutes: 10,
estimatedTime: 50,
learningObjectives: [
"Спроєктуйте чотириступеневий ланцюг прогресії магната",
"З'єднайте dropper, колектор, два оновлення і нову машину в один цикл",
"Позначте кожну кнопку покупки чіткою ціною і назвою",
"Побудуйте повну ділянку на основі архітектури з уроків 4.1-4.6",
],
theory: {
sections: [
{
title: "Ваш сьогоднішній проєкт (приблизно 40 хвилин)",
content: `Це - **великий будівельний проєкт** Модуля 4. Ви поєднуєте архітектуру ділянки (4.1), dropper+колектор (4.2), кнопку покупки (4.3), таблиці оновлень (4.4) і власність на ділянку (4.5) в один **чотириступеневий ланцюг міні-фабрики**.

**Хід уроку:**
1. **Теорія (40 хв)** - план ланцюга прогресії + будівництво
2. **Практика (~35 хв)** - повна міні-фабрика з чотирма кроками
3. **Вікторина (10 хв)** - **70%** потрібно пройти

Відкрийте **Урок 4.6 - Tycoon Works**. Сьогодні ви будуєте ланцюг прогресії **всередині** вашої ділянки.`,
},
{
title: "Чотириступеневий ланцюг прогресії",
content: `| Крок | Що відбувається | Урок-основа |
|------|------------------|-------------|
| **1. Dropper** | Базова машина виробляє монети | 4.2 |
| **2. Collector** | Перетворює краплі на Coins | 4.2 |
| **3. Upgrade 1** | Швидший spawnWait (рівень 2) | 4.4 |
| **4. Upgrade 2 + нова машина** | Вищий coinValue (рівень 3) → відкриває Dropper_02 | 4.3, 4.4 |

**Мета проєкту:** гравець проходить усі чотири кроки за один сеанс гри, відчуваючи чіткий прогрес на кожному етапі.`,
},
{
title: "Крок 1-2: базова машина (нагадування з 4.2)",
content: `Переконайтеся, що ваша ділянка\`PlotA\`має:

1.\`Dropper_01\`+\`SpawnPoint\`+ цикл появи монет (\`task.wait(data.spawnWait)\`)
2.\`CollectorPad\`, що додає\`data.coinValue\`через\`GetAttribute("CoinValue")\`3. Сміття (\`Debris:AddItem\`) на кожній монеті - **обов'язково** для продуктивності

**Вправа (5 хв):** Перевірте, що базова машина працює: монети з'являються, котяться, збираються, зникають через сміття.`,
},
{
title: "Крок 3: Upgrade 1 - швидкість (табличний рівень 2)",
content: `Використовуйте таблицю\`upgrades\`з уроку 4.4:

\`\`\`lua
local upgrades = {
{ tier = 1, price = 0, spawnWait = 2.0, coinValue = 1 },
{ tier = 2, price = 75, spawnWait = 1.2, coinValue = 1 },
{ tier = 3, price = 200, spawnWait = 1.2, coinValue = 3 },
}
\`\`\`

Кнопка\`Buy_Speed_Pad\`підвищує\`DropperTier\`з 1 до 2 - гравець **бачить**, як монети з'являються швидше.

**Вправа (8 хв):** Побудуйте кнопку Upgrade 1 і перевірте видиму зміну швидкості.`,
},
{
title: "Крок 4: Upgrade 2 і нова машина",
content: `**Upgrade 2** підвищує\`DropperTier\`до 3 (вищий\`coinValue\`- та ж кнопка-шаблон, що й Upgrade 1, але з новою ціною).

**Нова машина** (\`Dropper_02\`) - окрема кнопка\`Buy_Dropper2_Pad\`за шаблоном уроку 4.3:
- Прихована на початку (\`Parent = nil\`)
- Розкривається після покупки за фіксовану ціну (наприклад, 300 монет)
- Має **власний**\`SpawnPoint\`і колектор (або спільний колектор - ваш вибір)

**Вправа (12 хв):** Побудуйте Upgrade 2 і Dropper_02. Перевірте повний ланцюг: dropper → upgrade 1 → upgrade 2 → нова машина.`,
},
{
title: "Чіткі назви і ціни на кнопках",
content: `Кожна кнопка покупки повинна **однозначно** повідомляти, що вона робить:

| Кнопка | BillboardGui текст (або Neon-вивіска) |
|--------|------------------------------------------|
|\`Buy_Speed_Pad\`|"Speed Upgrade - 75 Coins" |
|\`Buy_Value_Pad\`|"Value Upgrade - 200 Coins" |
|\`Buy_Dropper2_Pad\`|"New Machine - 300 Coins" |

**Правило:** ціна на вивісці повинна **точно** збігатися з числом у Scripts - інакше гравець втрачає довіру до інтерфейсу.`,
},
{
title: "Власна ділянка - нагадування з 4.5",
content: `Якщо ви вже реалізували\`OwnerUserId\`і\`PlotClaimService\`з уроку 4.5 - переконайтеся, що:

- Усі **нові** кнопки (Upgrade 1, Upgrade 2, Dropper_02) перевіряють\`ownsPlot(player, plot)\` - Кожна нова кнопка на\`PlotB\`теж захищена (якщо ви тестуєте з двома гравцями)

**Якщо ви ще граєте соло:** одна ділянка \`PlotA\` - цього достатньо для проєкту 4.7, багатокористувацький захист залишається важливим на майбутнє.`,
},
{
title: "Тестування повного циклу",
content: `**Повний тест ланцюга (обов'язково):**
1. Spawn на ділянці - Dropper_01 виробляє монети на базовій швидкості
2. Зберіть достатньо монет → купіть Upgrade 1 → **побачте** швидший spawn
3. Зберіть ще → купіть Upgrade 2 → **побачте** вищу вартість монети (більший приріст на HUD)
4. Зберіть ще → купіть Dropper_02 → **побачте** другу машину, що з'явилася

**Якщо якийсь крок не відчувається "прогресом"** - поверніться і посилте різницю (наприклад, Upgrade 1 зменшує spawnWait сильніше).`,
},
{
title: "Контрольний список перед практикою",
content: `- [ ] Dropper_01 + Collector базово працюють (крок 1-2)
- [ ] Upgrade 1 (швидкість) видимо змінює темп появи монет
- [ ] Upgrade 2 (вартість) видимо збільшує приріст монет
- [ ] Dropper_02 прихований до покупки, потім з'являється
- [ ] Усі ціни на вивісках збігаються з числами в Scripts`,
},
],
},
commonMistakes: [
{
mistake: "Upgrade 1 і Upgrade 2 змінюють однакове значення (лише spawnWait двічі)",
explanation: "Гравець не відчуває різницю між двома різними покупками.",
correctApproach: "Upgrade 1 = швидкість, Upgrade 2 = вартість монети - різні відчутні ефекти",
},
{
mistake: "Ціна на вивісці не збігається з числом у Scripts",
explanation: "Гравець платить неочікувану суму - втрата довіри.",
correctApproach: "Одне джерело правди: число з таблиці upgrades або константи PRICE на вивісці й у коді",
},
{
mistake: "Dropper_02 видимий з самого початку гри",
explanation: "Немає причини купувати те, що вже є.",
correctApproach: "Parent = nil до успішної покупки",
},
{
mistake: "Забули дебоунс на новій кнопці Upgrade 2",
explanation: "Той самий Touched-спам, що й у всіх попередніх кнопках без прапора.",
correctApproach: "purchased = true негайно після успішного списання",
},
],
summary: "Ви побудували чотириступеневий ланцюг прогресії - dropper, колектор, два різні оновлення і нову машину - з чіткими цінами на кнопках, об'єднавши всю архітектуру Tycoon з уроків 4.1-4.6 в один великий проєкт.",
practiceTask: {
title: "Tycoon «Міні-фабрика» - великий проєкт (~35 хв)",
difficulty: "beginner",
description: `**Мета:** Повний чотириступеневий ланцюг прогресії на власній ділянці.

### Part A - Базова машина (8 хв)
1. Перевірте/побудуйте Dropper_01 + Collector (крок 1-2)
2. Підтвердіть роботу сміття і атрибута CoinValue

### Part B - Два оновлення (15 хв)
1.\`Buy_Speed_Pad\`: Upgrade 1 - швидший spawnWait
2.\`Buy_Value_Pad\`: Upgrade 2 - вищий coinValue
3. Вивіски з чіткими цінами на обох кнопках

### Part C - Нова машина (9 хв)
1.\`Dropper_02\`прихований до покупки
2.\`Buy_Dropper2_Pad\`розкриває машину за фіксовану ціну
3. Перевірте повний ланцюг з чотирьох кроків

### Фініш (3 хв)
1. **Файл → Зберегти в Roblox** →\`Lesson 4.7 - Mini Factory\` 2. **Практика завершена**`,
hints: [
"Будуйте і тестуйте кожен крок окремо, перш ніж з'єднувати всі чотири",
"Скопіюйте робочий Script кнопки Upgrade 1 для Upgrade 2, змінивши лише ціну і ефект",
"Друкуйте DropperTier.Value після кожної покупки для швидкого налагодження",
],
optionalChallenge: "Додайте п'ятий, престижний рівень оновлення з дуже високою ціною і помітним візуальним ефектом (наприклад, Neon-колір машини).",
},
quiz: {
passingScore: 70,
timeLimit: 10,
questions: [
{
id: "q1",
type: MC,
question: "Скільки кроків має ланцюг прогресії цього проєкту?",
options: [
"Один",
"Чотири",
"Десять",
"Нескінченно",
],
correctAnswer: 1,
explanation: "Dropper → Collector → 2 оновлення → нова машина.",
},
{
id: "q2",
type: MC,
question: "Upgrade 1 і Upgrade 2 повинні впливати на...",
options: [
"Одне й те саме значення двічі",
"Різні відчутні ефекти (швидкість і вартість)",
"Нічого видимого",
"Тільки колір неба",
],
correctAnswer: 1,
explanation: "Різні ефекти роблять кожну покупку значущою.",
},
{
id: "q3",
type: MC,
question: "Ціна на вивісці кнопки повинна...",
options: [
"Бути випадковою",
"Точно збігатися з числом у Scripts",
"Завжди дорівнювати 0",
"Ігноруватися",
],
correctAnswer: 1,
explanation: "Розбіжність цін руйнує довіру гравця до інтерфейсу.",
},
{
id: "q4",
type: MC,
question: "Dropper_02 має бути прихований за допомогою...",
options: [
"Parent = nil до покупки",
"Видалення назавжди",
"LocalScript",
"Розміщення в Lighting",
],
correctAnswer: 0,
explanation: "Приховування через Parent з подальшим відновленням.",
},
{
id: "q5",
type: MC,
question: "Дебоунс на кнопках оновлення потрібен, щоб...",
options: [
"Прискорити сервер",
"Запобігти повторному списанню ціни при одному дотику",
"Змінити мову гри",
"Видалити Terrain",
],
correctAnswer: 1,
explanation: "Прапор purchased/unlocked блокує повторні спрацювання.",
},
{
id: "q6",
type: MC,
question: "Проєкт 4.7 об'єднує навички з яких уроків?",
options: [
"Лише 1.1-1.3",
"4.1-4.6",
"Тільки 2.5",
"Модуля 5",
],
correctAnswer: 1,
explanation: "Це підсумковий проєкт усього Модуля 4 до цього моменту.",
},
{
id: "q7",
type: MC,
question: "Таблиця upgrades з уроку 4.4 використовується для...",
options: [
"Зберігання рівнів spawnWait і coinValue",
"Зберігання паролів",
"Малювання Terrain",
"Зміни мови",
],
correctAnswer: 0,
explanation: "Конфігураційна таблиця керує балансом рівнів.",
},
{
id: "q8",
type: MC,
question: "Якщо крок оновлення \"не відчувається\" як прогрес, слід...",
options: [
"Залишити без змін",
"Посилити різницю ефекту (наприклад, сильніше зменшити spawnWait)",
"Видалити крок",
"Опублікувати негайно",
],
correctAnswer: 1,
explanation: "Прогресія має бути відчутною для гравця.",
},
{
id: "q9",
type: MC,
question: "Повний тест ланцюга перевіряє...",
options: [
"Лише перший крок",
"Усі чотири кроки послідовно від spawn до нової машини",
"Тільки Terrain",
"Лише кольори UI",
],
correctAnswer: 1,
explanation: "Кожен крок має бути перевірений у послідовності.",
},
{
id: "q10",
type: MC,
question: "Урок 4.7 зберегти назву...",
options: [
"Lesson 4.7 - Mini Factory",
"Lesson 4.1 - Tycoon Plot",
"Module 3 - Coin Simulator",
"Untitled",
],
correctAnswer: 0,
explanation: "Назва проєкту міні-фабрики для збереження.",
},
],
},
}

export const ukLesson48 = {
lessonId: "lesson-roblox-4-8",
moduleId: "module-04",
order: 8,
title: "4.8 - Баланс економіки Tycoon",
theoryMinutes: 40,
quizMinutes: 10,
estimatedTime: 50,
learningObjectives: [
"Налаштуйте ціни й швидкості на основі реального playtest",
"Спроєктуйте захист від softlock (застрягання без прогресу)",
"Додайте візуальний зворотний зв'язок на кожну покупку",
"Проведіть структурований 5-хвилинний цикл playtest",
],
theory: {
sections: [
{
title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
content: `Ваша міні-фабрика з уроку 4.7 працює. Сьогодні ви робите її **справедливою і приємною** - так, щоб будь-хто міг зіграти 5 хвилин і відчути прогрес без застрягання.

**Хід уроку:**
1. **Теорія (40 хв)** - баланс цін, anti-softlock, зворотний зв'язок
2. **Практика (~30 хв)** - баланс і 5-хвилинний playtest
3. **Вікторина (10 хв)** - **70%** потрібно пройти

Відкрийте **Урок 4.7 - Mini Factory**.`,
},
{
title: "Чому баланс економіки важливий",
content: `| Незбалансована економіка | Збалансована економіка |
|-----------------------------|---------------------------|
| Ціни занадто високі → гравець застряг на рівні 1 | Кожна покупка досяжна за розумний час |
| Ціни занадто низькі → усе відкрито за хвилину | Прогрес відчувається протягом усієї сесії |
| Незрозуміло, скільки чекати | Гравець бачить чіткий шлях до наступної покупки |

**Мета:** перша покупка - швидко (гачок), остання покупка - варта зусиль (нагорода).`,
},
{
title: "Робочий процес налаштування цін і швидкостей",
content: `**Ітеративний метод (не вгадування):**

1. Зіграйте з поточними цінами, засікаючи час до кожної покупки
2. Запишіть: Upgrade 1 → \`X\` секунд, Upgrade 2 → \`Y\` секунд, Dropper_02 → \`Z\` секунд
3. Якщо\`X > 120\`секунд - зменшіть ціну або\`spawnWait\`рівня 1
4. Відредагуйте **лише** таблицю\`upgrades\`- ніяких змін логіки Scripts

\`\`\`lua
-- Balance iteration log:
-- v1: Upgrade1 at 140s (too slow) -> reduced price 100->75
-- v2: Upgrade1 at 95s (good)
\`\`\`

**Вправа (10 хв):** Проведіть один тестовий прогін, запишіть реальні часи для кожної покупки.`,
},
{
title: "Anti-softlock - гравець ніколи не застряє назавжди",
content: `**Softlock** = гравець не може прогресувати, навіть граючи правильно.

| Ризик softlock | Захист |
|-------------------|---------|
| Dropper_01 занадто повільний для першої покупки | Гарантуйте базовий passive income, досяжний за 2-3 хв |
| Немає способу заробити, якщо монети "застрягли" на шляху | Перевірте нахил конвеєра - монети завжди досягають колектора |
| Ціна на рівні 3 вища за реалістичний максимальний дохід | Порівняйте ціну з max coinValue × реалістична кількість монет за хвилину |

**Правило:** завжди має існувати **шлях вперед**, навіть якщо гравець грає повільно чи невдало.`,
},
{
title: "Тест на softlock",
content: `**Протокол:**
1. Уявіть "найгіршого" гравця - повільного, що часто відволікається
2. Зіграйте свідомо **повільно** 3 хвилини
3. Чи все ще можливо купити Upgrade 1 у розумний час?
4. Якщо ні - зменшіть ціну рівня 1 або збільшіть базовий coinValue

**Вправа (5 хв):** Проведіть цей тест і задокументуйте результат коментарем у Scripts.`,
},
{
title: "Візуальний зворотний зв'язок на покупку",
content: `Кожна покупка повинна **відчуватися** як подія, а не тиха зміна числа:

| Момент | Відгук |
|--------|--------|
| Успішна покупка | Кнопка стає Neon-зеленою + короткий звук + print |
| Недостатньо монет | Червоний спалах кнопки (як у 4.3) |
| Нова машина з'явилась | Невеликий візуальний "поп" - наприклад, тимчасове збільшення Size з 0 до нормального (без TweenService - просто миттєва зміна Size після паузи \`task.wait\`) |

**Вправа (8 хв):** Додайте хоча б один новий візуальний відгук, якого ще не було в 4.3-4.7.`,
},
{
title: "5-хвилинний цикл playtest - протокол",
content: `Пройдіть весь досвід гравця з таймером:

| Хвилина | Очікувана подія |
|---------|-------------------|
| 0:00-0:30 | Spawn, розуміння, де dropper і колектор |
| 0:30-2:00 | Перша покупка (Upgrade 1) |
| 2:00-3:30 | Друга покупка (Upgrade 2) |
| 3:30-5:00 | Третя покупка (Dropper_02) або близько до неї |

**Якщо реальний прогрес значно відстає від таблиці** - це сигнал для балансування цін, а не для зміни коду.`,
},
{
title: "Документування рішень про баланс",
content: `\`\`\`lua
-- Economy balance notes (Lesson 4.8):
-- Target: first upgrade within 2 min, all 3 purchases within 5 min
-- Softlock test passed: slow play still reaches Upgrade 1 by 2:45
-- Adjusted Dropper_02 price 300 -> 250 after playtest feedback
\`\`\`

Коментарі зберігають **чому**, а не лише **що** - корисно, якщо ви повернетесь до балансування через тиждень.`,
},
{
title: "Контрольний список перед практикою",
content: `- [ ] Ціни відкориговано на основі реального тестового прогону
- [ ] Тест на softlock пройдено (повільна гра все ще прогресує)
- [ ] Мінімум один новий візуальний відгук на покупку додано
- [ ] Повний 5-хвилинний playtest відповідає цільовому темпу
- [ ] Рішення про баланс задокументовано в коментарях`,
},
],
},
commonMistakes: [
{
mistake: "Ціни встановлені \"на око\" без реального тестування",
explanation: "Інтуїція розробника часто не відповідає досвіду нового гравця.",
correctApproach: "Завжди базуйте ціни на реальних засічених часах playtest",
},
{
mistake: "Тест на softlock пропущено, бо \"і так все працює\"",
explanation: "Розробник грає краще за середнього гравця й не помічає застрягання.",
correctApproach: "Свідомо зіграйте повільно і перевірте, чи прогрес досяжний",
},
{
mistake: "Усі покупки мають однаковий візуальний відгук",
explanation: "Гра відчувається монотонною попри новий контент.",
correctApproach: "Додайте хоча б один унікальний штрих на кожну важливу покупку",
},
{
mistake: "Зміни балансу вносяться прямо в логіку Scripts, а не в таблицю",
explanation: "Ускладнює подальше налаштування і збільшує ризик помилок.",
correctApproach: "Редагуйте лише числа в таблиці upgrades, логіка залишається незмінною",
},
],
summary: "Ви налаштували ціни і швидкості на основі реального тестування, перевірили захист від softlock, додали новий візуальний зворотний зв'язок на покупки і провели структурований 5-хвилинний playtest - ваш Tycoon тепер відповідає стандартам справедливої, приємної економіки.",
practiceTask: {
title: "Баланс економіки - фінальний прогін (~30 хв)",
difficulty: "beginner",
description: `**Мета:** Задокументований баланс + перевірений захист від softlock.

### Part A - Тестовий прогін і налаштування (10 хв)
1. Зіграйте один раз, засікаючи час до кожної покупки
2. Відкоригуйте таблицю upgrades на основі результатів

### Part B - Anti-softlock тест (8 хв)
1. Свідомо зіграйте повільно 3 хвилини
2. Перевірте, чи Upgrade 1 усе ще досяжний
3. Виправте баланс, якщо тест не пройдено

### Part C - Візуальний відгук (8 хв)
1. Додайте новий відгук на покупку (звук, колір, зміна Size)
2. Перевірте відгук на успіх і на брак монет

### Фініш (4 хв)
1. Задокументуйте рішення про баланс у коментарях
2. **Файл → Зберегти в Roblox** →\`Module 4 - Tycoon Works (Balanced)\` 2. **Практика завершена**`,
hints: [
"Записуйте реальний час на аркуші під час тестового прогону - легше порівнювати до/після",
"Тест на softlock найкраще проводити з таймером на 3 хвилини рівно",
"Новий візуальний відгук не повинен вимагати TweenService - миттєві зміни Size/BrickColor достатньо",
],
optionalChallenge: "Проведіть 5-хвилинний playtest із другом або родичем і порівняйте його реальний темп із вашою таблицею очікувань.",
},
quiz: {
passingScore: 70,
timeLimit: 10,
questions: [
{
id: "q1",
type: MC,
question: "Головна мета уроку 4.8...",
options: [
"Додати нову механіку",
"Збалансувати ціни й перевірити захист від застрягання",
"Видалити всі покупки",
"Побудувати нову ділянку",
],
correctAnswer: 1,
explanation: "4.8 фокусується на балансі економіки.",
},
{
id: "q2",
type: MC,
question: "Softlock означає...",
options: [
"Гра занадто легка",
"Гравець не може прогресувати, навіть граючи правильно",
"Занадто гарна графіка",
"DataStore зламано",
],
correctAnswer: 1,
explanation: "Застрягання без шляху вперед - критична проблема балансу.",
},
{
id: "q3",
type: MC,
question: "Ціни найкраще коригувати на основі...",
options: [
"Інтуїції без тестування",
"Реальних засічених часів playtest",
"Випадкових чисел",
"Кольору Sky",
],
correctAnswer: 1,
explanation: "Дані з реального тесту дають об'єктивний баланс.",
},
{
id: "q4",
type: MC,
question: "Тест на softlock варто проводити...",
options: [
"Граючи навмисно швидко і вправно",
"Граючи навмисно повільно, як новачок",
"Ніколи",
"Лише в Terrain Editor",
],
correctAnswer: 1,
explanation: "Найгірший сценарій виявляє справжні проблеми балансу.",
},
{
id: "q5",
type: MC,
question: "Зміни балансу цін слід вносити в...",
options: [
"Логіку Touched-подій",
"Таблицю upgrades",
"StarterGui",
"Lighting",
],
correctAnswer: 1,
explanation: "Конфігураційна таблиця - єдине місце для налаштування балансу.",
},
{
id: "q6",
type: MC,
question: "Новий візуальний відгук на покупку НЕ повинен вимагати...",
options: [
"BrickColor змін",
"Sound",
"TweenService (ще не вивчено)",
"print()",
],
correctAnswer: 2,
explanation: "TweenService з'явиться лише в Модулі 5.",
},
{
id: "q7",
type: MC,
question: "5-хвилинний playtest перевіряє...",
options: [
"Лише графіку",
"Чи темп покупок відповідає цільовому графіку",
"Тільки Terrain",
"Мову інтерфейсу",
],
correctAnswer: 1,
explanation: "Структурований тест порівнює реальний і очікуваний темп.",
},
{
id: "q8",
type: MC,
question: "Коментарі про баланс у Scripts корисні, тому що...",
options: [
"Прискорюють сервер",
"Зберігають причини рішень для майбутнього налаштування",
"Видаляють помилки автоматично",
"Замінюють DataStore",
],
correctAnswer: 1,
explanation: "Документація допомагає повернутися до логіки рішень пізніше.",
},
{
id: "q9",
type: MC,
question: "Якщо ціна на рівні 3 недосяжна за реалістичний час гри, слід...",
options: [
"Залишити без змін",
"Зменшити ціну або підвищити дохід нижчих рівнів",
"Видалити рівень 3",
"Додати RemoteEvent",
],
correctAnswer: 1,
explanation: "Баланс має враховувати реалістичний темп заробітку.",
},
{
id: "q10",
type: MC,
question: "Урок 4.8 зберегти назву...",
options: [
"Module 4 - Tycoon Works (Balanced)",
"Lesson 4.1 - Tycoon Plot",
"Module 3 - Coin Simulator",
"Untitled",
],
correctAnswer: 0,
explanation: "Фінальна назва збалансованого Tycoon-проєкту.",
},
],
},
}
