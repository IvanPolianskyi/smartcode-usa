/** Rich UK content for Roblox Module 02 - AUTO from EN via gen-roblox-lessons-uk.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson21 = {
 lessonId: "lesson-roblox-2-1",
 moduleId: "module-02",
 order: 1,
 title: "2.1 - Блоки-вбивці",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створити Neon hazard Parts, що скидають гравця при дотику",
 "Безпечно використовувати Touched з перевіркою Humanoid",
 "Візуально відрізняти безпечні платформи від kill blocks",
 "Налагоджувати kill Scripts у Play mode та Output",
 "Спочатку простий Touched + print, потім повна логіка kill block",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Модуль 2 - Небезпечна зона** починається тут. Ви перетворюєте свій **Living Island Hub** на початок **obby** (obstacle course).

**Хід уроку:**
1. **Теорія (40 хв)** - вбивати блоки за допомогою\`Touched\` 2. **Практика (~25 хв)** - лавова смуга з 4+ небезпеками
3. **Вікторина (10 хв)** - **70%** потрібно пройти

Відкрийте **Модуль 1 - Живий острів** (або скопіюйте його як\`Lesson 2.1 - Obby Start\`). Ви додасте доріжку для стрибків поруч із доком.`,
 },
 {
 title: "Що таке блок знищення?",
 content: `**Блок вбивства** (лава, шипи, кислота) **торкається** гравця → **Humanoid.Health = 0** → відродження.

| Безпечна платформа | Вбити блок |
|--------------|------------|
| Нормальний колір, чіткий шлях | **Neon** + **Really red** (або помаранчевий) |
| Гравець безпечно ходить | Дотик = миттєва помилка |

**Правила чесного дизайну:**
- Небезпеки виглядають небезпечно - ніколи не ідентичні безпечним поверхам
- Дистанції стрибків, які може зробити новачок
- Немає невидимих тонких смужок убивства (поки що)

**Вправа (3 хвилини):** На своєму місці виберіть місце, де шлях obby виходить із spawn - рівної області перед першим стрибком.`,
 },
 {
 title: "Створіть Folder «Небезпеки».",
 content: `1. **Workspace** → Insert **Folder** →\`Obby\` 2. Всередині\`Obby\`, Folder\`Hazards\` 3. Також створіть Folder\`SafePath\`для білих/сірих платформ

**Кожна Part вбивства:**
- Insert **Block** → Name:\`Kill_01\`,\`Kill_02\`, ...
- Size: різний (\`4, 1, 4\`або тонкий\` 8, 1, 2\`)
- Material: **Neon** | BrickColor: **Really red**
- Anchored: **true** | CanCollide: **true**

**Вправа (10 хв.):** Розмістіть **4** блоки вбивства між безпечними стрибками. Перш ніж стрибнути, гравець повинен бачити всі небезпеки.`,
 },
 {
 title: "Міст з уроку 1.4 - ті ж ідеї, нова подія",
 content: `У **1.4** ви вже знали:
-\`local\`змінні
-\`script.Parent\`-\`Connect(function ... end)\`- event code
-\`print\`to Output

Сьогодні змінюється лише **назва події**:
| Урок 1.4 | Урок 2.1 |
|------------|------------|
|\`MouseClick\`|\`Touched\`|
| Клацання миші | Тіло / нога торкається Part |

**Нова змінна \`hit\`** - \`Part\`, що торкнувся лави (зазвичай ступінь Character).

**Новий \`if\` перевірки** - не завдають шкоди всім, тільки гравцям з **Humanoid**.

Спочатку ми пишемо **простий** Script (без смерті), потім повний.`,
 },
 {
 title: "Крок 1: розминка - доторкніться та надрукуйте (ще немає смерті)",
 content: `Перш ніж логіка вбивства, доведіть, що **Touched** взагалі працює.

1. У kill Part → Insert **Script**
2. Вставте тестовий код:\`\`\`lua
local block = script.Parent

block.Touched:Connect(function(hit)
 print("Something touched: " .. hit.Name)
end)
\`\`\` 3. **Play (F5)** - наступити на блок
4. **Output** має показувати, наприклад,\`Something touched: LeftFoot\`**Чого ви дізналися:**
-\`Touched\`може стріляти багато разів, поки триває контакт - нормально на цьому етапі
-\`hit.Name\` - ім’я Part, що торкнувся
- Якщо Output порожній - Script не всередині Part або ви не в Play mode

**Вправа (5 хв):** Зупинити гру. Коли розминка запрацює, перейдіть до повного Script нижче.`,
 },
 {
 title: "Крок 2: повний блок вбивств - Touched + Humanoid",
 content: `**Торкнувся** спрацьовує, коли щось стикається з Part.

Замініть код розігріву Script **final** (або додайте перевірки крок за кроком):\`\`\`lua
local killBlock = script.Parent

killBlock.Touched:Connect(function(hit)
 local character = hit.Parent
 if not character then
 return
 end

 local humanoid = character:FindFirstChildOfClass("Humanoid")
 if humanoid then
 humanoid.Health = 0
 end
end)
\`\`\`**Рядок за рядком (класичне програмування):**
1.\`local killBlock = script.Parent\`- змінна для нашого об'єкта
2.\`Connect(function(hit)\`- на дотик отримуємо\`hit\` 3.\`local character = hit.Parent\`- стопа → model Character
4.\`if not character then return end\`- якщо батьків немає, вийти (нічого не робити)
5.\`FindFirstChildOfClass("Humanoid")\`- знайти здоров'я гравця
6.\`if humanoid then\`- тільки якщо знайдено →\`Health = 0\`**Чому не цей Script у перший день?** Без розминки важко сказати, **що** зламалося - подія, Part чи Humanoid.`,
 },
 {
 title: "Хто постраждає? - Тільки Humanoidи",
 content: `Без перевірки Humanoid торкання рукояткою інструменту може викликати дивні помилки.

| Дотик до предмета | Зазвичай має Humanoid? |
|-----------------|----------------------|
| Характер гравця | ✅ Так |
| Випадкове падіння Parts | ❌ Ні |
| Інший аксесуар гравця | ❌ Зазвичай ні |

**Золоте правило:** лише встановлено\`Health = 0\`коли\`FindFirstChildOfClass("Humanoid")\`існує.

**Вправа (8 хв.):** Перший тест\`Kill_01\`. Торкніться лави → відродження. Перевірте **Output** на червоні помилки.`,
 },
 {
 title: "Копіювати скрипти - копіювати смарт",
 content: `Вам **не** потрібен інший код для кожного блоку.

**Швидкий робочий процес:**
1. Ідеальний **один** блок вбивства + скрипт
2. **Ctrl + D** дублюйте всю Part (скрипт копіює разом з нею)
3. Перейменувати\`Kill_02\`, перейти на місце
4. Повторіть для всіх небезпек

Якщо ви дублюєте лише Part без Script, скопіюйте та вставте Script у кожен блок ліквідації.

**Упорядкувати Explorer:**\`Obby → Hazards → Kill_01 ... Kill_04\`
\`Obby → SafePath → Platform_01 ...\``,
 },
 {
 title: "Контрольний список налагодження",
 content: `| Проблема | Виправити |
|---------|-----|
| Дотик нічого не робить | Використовуйте **Script**, а не LocalScript |
| Дотик нічого не робить | Script має бути **дочірньою Part kill** |
| Дотик нічого не робить | Part потребує **CanCollide true** |
| Ти ніколи не помреш | Не в режимі **Play** |
| Випадкові смерті | Відсутня перевірка Humanoid |

**Тестовий цикл:**
1. F5 Play
2. Торкніться кожного блоку вбивства один раз
3. Підтвердьте відродження в SpawnLocation
4. Зупиніть відтворення перед переміщенням Parts`,
 },
 {
 title: "Полірування - лава, яка відчувається справедливо",
 content: `**Візуальні додаткові функції (опціонально):**
- **PointLight** всередині неонового блоку (червоний, діапазон 8)
- Невелика **Прозорість**\`0.1\`на лаві (ще читається)

**Звук:** вставте **Звук** у партію вбивства, відтворіть на дотик (коротке шипіння) - повторно використовуйте навички уроку 1.5.

**Контрольний список перед тренуваннями:**
- [ ] Folder\`Obby/Hazards\`існує
- [ ] Принаймні один Script вбивства протестовано в Play
- [ ] Безпечний шлях має інший колір, ніж лава`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "LocalScript у блоці знищення",
 explanation: "LocalScript запускається на клієнта; знищення сервера є стандартним для obbies.",
 correctApproach: "Використовуйте server Script у кожній Part вбивства",
 },
 {
 mistake: "Блок знищення не Anchored",
 explanation: "Незакріплена лава відпадає.",
 correctApproach: "Прив’язується до всіх небезпек",
 },
 {
 mistake: "Сейф і лава виглядають однаково",
 explanation: "Гравці не можуть вивчити маршрут.",
 correctApproach: "Неоново-червона лава проти матово-сіро-білих безпечних платформ",
 },
 {
 mistake: "Script у робочій області",
 explanation: "script.Parent є неправильним об'єктом.",
 correctApproach: "Script має бути прямим дочірнім елементом убивства",
 },
 ],
 summary: "Ви побудували небезпечну смугу з Neon блоками вбивств, підключили Touched до Humanoid.Health = 0 і налагодили справедливі смерті obby - основу кожної obstacle course Roblox.",
 practiceTask: {
 title: "Lava lane - початок obby (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Безпечні стрибки + очевидна лава, яка вбиває від дотику.

### Part A - Схема шляху (8 хв)
1. В\`Module 1 - Living Island\`, додайте Folder\`Obby\` 2. Створіть **6** безпечних платформ\`SafePath\`(Anchored, neon)
3. Стрибки на проміжки між платформами - можна перевірити пішки

### Part B - Небезпека лави (10 хв)
1. Додайте **4** блоки вбивства\`Hazards\`(Neon дійсно червоний)
2. Розташуйте між або біля стрибків - принаймні одну вузьку смужку лави
3. Script кожного (дублікат робочого Script)

### Part C - Перевірте та збережіть (7 хв)
1. **Play** - торкніться кожної лави один раз; всі повинні відродити вас
2. Пройдіть всю смугу, не торкаючись лави - можливий маршрут
3. **Файл → Зберегти в Roblox** →\`Lesson 2.1 - Lava Lane\` 4. **Практика завершена**`,
 hints: [
 "Дублюйте одну робочу Part знищення замість того, щоб переписувати Scripts",
 "Робіть безпечні платформи ширші за лаву для першого стрибка",
 "F5 Play - режим редагування ніколи не запускається Торкнувся для вашого Character",
 ],
 optionalChallenge: "Коротке спалювання: встановіть Health на 10, зачекайте 0,2 секунди з task.wait, потім Health = 0.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Блоки знищення зазвичай встановлюються...",
 options: [
 "Humanoid.Health = 0",
 "Part.Anchored = false",
 "Небо до ночі",
 "Рельєф до води",
 ],
 correctAnswer: 0,
 explanation: "Нульове здоров'я викликає відродження.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Торкнувся вогню, коли...",
 options: [
 "Ви зберігаєте гру",
 "Щось стикається з Part",
 "Ви змінюєте назву Explorer",
 "ClockTime змінюється",
 ],
 correctAnswer: 1,
 explanation: "Торкнутися - це подія зіткнення.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "hit.Parent зазвичай...",
 options: [
 "СаундСервіс",
 "Model Character",
 "Освітлення",
 "Script",
 ],
 correctAnswer: 1,
 explanation: "Батьківські Parts тіла гравця до Character.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "FindFirstChildOfClass(\"Humanoid\") запобігає...",
 options: [
 "Лава від світиться",
 "Не вбиває не-персонажів",
 "Збереження гри",
 "Фарба місцевості",
 ],
 correctAnswer: 1,
 explanation: "Лише Character повинні запускати логіку вбивства.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Scripts блоку вбивства мають бути...",
 options: [
 "LocalScript у StarterGui",
 "Серверний скрипт в Part",
 "Внутрішнє освітлення",
 "Лише звук",
 ],
 correctAnswer: 1,
 explanation: "Серверні Scripts справляються зі світовими небезпеками.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Лава має виглядати інакше, використовуючи...",
 options: [
 "Neon + червоний колір",
 "Те саме, що безпечна підлога",
 "Прозорість 1",
 "Without Anchored",
 ],
 correctAnswer: 0,
 explanation: "Візуальний контраст робить obby справедливими.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Найшвидший спосіб додати 4 Scripts лави...",
 options: [
 "Дублюйте одну робочу Part вбивства",
 "Видалити Workspace",
 "Видаліть Humanoid",
 "Використовуйте лише Terrain",
 ],
 correctAnswer: 0,
 explanation: "Дублікат зберігає Script прикріпленим.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Touched перевірено в...",
 options: [
 "Режим відтворення",
 "Тільки вікно публікації",
 "Керуючий активами",
 "Тільки створити команду",
 ],
 correctAnswer: 0,
 explanation: "Під час гри відбувається зіткнення персонажів.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Блоки знищення потребують закріплення...",
 options: [
 "true",
 "false always",
 "тільки для гравців",
 "тільки вночі",
 ],
 correctAnswer: 0,
 explanation: "Anchored утримує небезпеки на місці.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 2.1 зберегти назву...",
 options: [
 "Урок 2.1 - Lava Lane",
 "Модуль 1 - Живий острів",
 "вбити",
 "Без назви",
 ],
 correctAnswer: 0,
 explanation: "Використовуйте імена збереження на основі уроків.",
 },
 ],
 },
}

export const ukLesson22 = {
 lessonId: "lesson-roblox-2-2",
 moduleId: "module-02",
 order: 2,
 title: "2.2 - Чекпоінти",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Розмістіть контрольні точки SpawnLocation уздовж obby",
 "Установити player.RespawnLocation, коли торкається контрольної точки",
 "Дайте чіткий візуальний зворотний зв'язок, коли контрольна точка активується",
 "Тестове відродження після смерті на лаві",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Померти на лаві справедливо лише в тому випадку, якщо гравці **не починають щоразу з нуля**.

**Контрольні точки** зберігають прогрес **протягом однієї ігрової сесії** (поки ви не залишите гру).

**Хід уроку:**
1. **Теорія (40 хв)** - SpawnLocation + RespawnLocation
2. **Практика (~25 хв)** - 3 етапи Obby з 3 контрольними точками
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 2.1 - Lava Lane**.`,
 },
 {
 title: "Чому контрольні точки важливі",
 content: `| Без КПП | З КПП |
|---------------------|------------------|
| Померти на лаві → повернутися до появи | Померти → відродитися після останнього CP |
| Гравці rage-quit | Гравці повторюють спроби та покращують |

**Правило дизайну:** розміщуйте контрольну точку кожні **20-40 секунд** стрибка - кінець кожного «етапу».

**Вправа (2 хв):** Пройдіться лавовою смугою в Play. Рахуйте секунди між стартом і першим важким стрибком - це етап 1.`,
 },
 {
 title: "SpawnLocation як контрольна точка",
 content: `**SpawnLocation** - це \`Part\`, який може породжувати Character **і** виступати як точка відродження.

Insert → **SpawnLocation** наприкінці етапу 1.

| Property | Значення |
|----------|-------|
| **Ім'я** |\`CP_1\`(не SpawnLocation) |
| **Anchored** | true |
| **Size** |\`6, 1, 6\`видима колодка |
| **BrickColor** | New Yeller (неактивний) |
| **Нейтральний** | true |
| **AllowTeamChangeOnTouch** | false |

Розмістіть **над** платформою - не всередині лави.

**Start Creating:** зберегти свій модуль 1\`SpawnLocation\`на хабі - перейменувати\`Spawn_Start\`. Контрольні точки є **додатковими** SpawnLocations.`,
 },
 {
 title: "Скрипт - збереження точки відродження",
 content: `Insert всередину **Script**\`CP_1\`:\`\`\`lua
local checkpoint = script.Parent

checkpoint.Touched:Connect(function(hit)
 local character = hit.Parent
 if not character then
 return
 end

 local humanoid = character:FindFirstChildOfClass("Humanoid")
 if not humanoid then
 return
 end

 local player = game:GetService("Players"):GetPlayerFromCharacter(character)
 if not player then
 return
 end

 player.RespawnLocation = checkpoint
 checkpoint.BrickColor = BrickColor.new("Bright green")
end)
\`\`\`**GetPlayerFromCharacter** пов’язує тіло з обліковим записом - лише потім змінюйте\`RespawnLocation\`.`,
 },
 {
 title: "Перевірте петлю КПП",
 content: `**Критичний тест (не пропускати):**
1. **Play** - бігти до\`CP_1\`- панель стає **зеленою**
2. Навмисно стрибнути в **лаву**
3. Ви повинні відродитися на **CP_1**, а НЕ на початку острова

Якщо ви відроджуєтеся на початку:
- Ти торкався\`CP_1\`перед смертю?
- Є\`CP_1\`все ще є класом **SpawnLocation**?
- Є червоні помилки у вихідних даних?

**Вправа (10 хв):** Пройдіть цей тест перед побудовою\`CP_2\`.`,
 },
 {
 title: "Триступеневе планування",
 content: `Розширте свою смугу лави на **3 етапи:**

| Етап | Зміст | КПП |
|-------|---------|------------|
| 1 | Легкі стрибки + 1 лава |\`CP_1\`|
| 2 | Довший розрив + 2 лави |\`CP_2\`|
| 3 | Вузька стежка + фінал |\`CP_3\`або\`CP_Final\`|

дублікат\`CP_1\`Script у кожній Part контрольної точки.

**Прогресування кольорів:** Жовтий (очікування) → Зелений (збережено) - гравці миттєво читають прогрес.`,
 },
 {
 title: "UX відгук - звук і світіння",
 content: `Додаткове полірування з модуля 1:
- **Звук** дитина на контрольній точці - короткий пінг на дотик
- **PointLight** - зелений, коли активний\`\`\`lua
local sound = checkpoint:FindFirstChild("CPSound")
if sound then
 sound:Play()
end
\`\`\`Додайте після налаштування RespawnLocation.

**Часті запитання:** Дотик спрацьовує багато разів - це нормально для цього уроку; пізніше ви додаєте усунення стрибків.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Я розумію SpawnLocation проти звичайної Parts
- [ ] Я пройшов тест "померти після CP_1".
- [ ] Я створю CP_2 і CP_3 зі скопійованими Scripts
- [ ] Зберегти ім'я готове:\`Lesson 2.2 - Checkpoints\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Використовується звичайна Part замість SpawnLocation",
 explanation: "RespawnLocation має бути екземпляром SpawnLocation.",
 correctApproach: "Insert → SpawnLocation, потім перейменувати на CP_1",
 },
 {
 mistake: "Відродження все ще в центрі після CP_2",
 explanation: "Ніколи не торкався CP_2 перед смертю.",
 correctApproach: "Пройдіть на кожну контрольну точку, перш ніж перевірити смерть лави",
 },
 {
 mistake: "Контрольна точка всередині блоку вбивства",
 explanation: "Гравець помирає, перш ніж зберегти прогрес.",
 correctApproach: "Розмістіть CP на безпечній платформі позаду небезпеки",
 },
 {
 mistake: "Немає перевірки Humanoid у скрипті контрольної точки",
 explanation: "Випадкові дотики можуть спрацювати раніше.",
 correctApproach: "Зберігайте той самий шаблон Humanoid + GetPlayerFromCharacter, що й блоки вбивства",
 },
 ],
 summary: "Ви розмістили контрольні точки SpawnLocation, встановили RespawnLocation на дотик, пофарбували панелі в зелений колір для зворотного зв’язку та довели, що лавові смерті відроджуються на останній контрольній точці - реальний прогрес obby.",
 practiceTask: {
 title: "Триступенева контрольна точка обби (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** 3 етапи, 3 контрольні точки, лавова смерть повертається до останнього CP.

### Part A - Етап 1 + CP_1 (7 хв)
1. Кінець етапу 1 безпечної платформи → **SpawnLocation**\`CP_1\` 2. Скрипт: RespawnLocation + зелений колір
3. Тест: торкніться CP_1 → померти на лаві → відродитися на CP_1

### Part B - Етап 2 + CP_2 (9 хв)
1. Складніші стрибки + 2 блоки лави
2. **SpawnLocation**\`CP_2\`зі скопійованим Script
3. Такий самий тест на смерть з КП_2

### Part C - Етап 3 + CP_Final (9 хв)
1. Короткий фінал шлях до\`CP_Final\` 2. Повний пробіг: Початок → CP_1 → CP_2 → CP_Final → померти → відродитися на CP_Final
3. **Зберегти в Roblox** →\`Lesson 2.2 - Checkpoints\` 4. **Практика завершена**`,
 hints: [
 "Жовта панель = ще не збережено, зелена = збережено",
 "Для кожної контрольної точки потрібен власний об’єкт SpawnLocation",
 "Перевірте смерть після КОЖНОЇ нової контрольної точки, перш ніж продовжувати",
 ],
 optionalChallenge: `Додайте IntValue\`CheckpointNumber\`на Character, коли торкається CP (для майбутнього інтерфейсу користувача).`,
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Контрольні точки зберігають прогрес...",
 options: [
 "Під час ігрового сеансу",
 "Назавжди на веб-сайті Roblox",
 "Тільки в режимі редагування",
 "Тільки для адмінів",
 ],
 correctAnswer: 0,
 explanation: "RespawnLocation триває, поки гравець не піде.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "player.RespawnLocation має бути...",
 options: [
 "SpawnLocation",
 "Звук",
 "Рельєф місцевості",
 "LocalScript",
 ],
 correctAnswer: 0,
 explanation: "Respawn використовує екземпляри SpawnLocation.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "GetPlayerFromCharacter отримує...",
 options: [
 "Гравець з model Character",
 "Колір Parts",
 "Небо",
 "Name Script",
 ],
 correctAnswer: 0,
 explanation: "Пов’язує дотик Character з об’єктом гравця.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Зелений колір КПП означає...",
 options: [
 "Лава активна",
 "Гравець зберіг цю точку відродження",
 "Гра опублікована",
 "Рельєф видалено",
 ],
 correctAnswer: 1,
 explanation: "Зелений колір сигналізує про активацію в цьому уроці.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Доторкнувшись до CP_2 і померши, з’являйтеся на...",
 options: [
 "КП_2",
 "Завжди тільки світове походження",
 "Ящик інструментів",
 "CP_1 тільки завжди",
 ],
 correctAnswer: 0,
 explanation: "Перемагає остання контрольна точка.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Контрольні пункти слід розмістити...",
 options: [
 "На безпечному місці після важких стрибків",
 "Всередині лави",
 "Поза робочим простором",
 "У ServerScriptService",
 ],
 correctAnswer: 0,
 explanation: "Безпечні панелі дозволяють гравцям реєструвати прогрес.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Нейтральне значення true на SpawnLocation дозволяє...",
 options: [
 "Будь-який гравець може використовувати його",
 "Жодного нересту ніколи",
 "Лише один колір",
 "Видалення скриптів",
 ],
 correctAnswer: 0,
 explanation: "Нейтральні spawnи працюють для всіх команд.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Scripts контрольних точок є...",
 options: [
 "Серверні скрипти в КПП",
 "Локальні скрипти в Head",
 "Внутрішня місцевість",
 "Тільки в чаті",
 ],
 correctAnswer: 0,
 explanation: "Сервер встановлює RespawnLocation для всіх гравців.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Ідеальна відстань між контрольними точками...",
 options: [
 "Кожні 20-40 секунд гри",
 "Один раз за гру",
 "Кожні 2 години",
 "Ніколи",
 ],
 correctAnswer: 0,
 explanation: "Регулярні збереження зменшують розчарування.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 2.2 зберегти назву...",
 options: [
 "Урок 2.2 - Контрольні точки",
 "Урок 2.1 - Lava Lane",
 "Натисніть Магія",
 "Модуль 12",
 ],
 correctAnswer: 0,
 explanation: "Відстежуйте прогрес obby за допомогою чітких імен файлів.",
 },
 ],
 },
}

export const ukLesson23 = {
 lessonId: "lesson-roblox-2-3",
 moduleId: "module-02",
 order: 3,
 title: "2.3 - Таймер рівня",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть таймер ScreenGui за допомогою TextLabel",
 "Оновіть час, що минув, за допомогою os.clock у LocalScript",
 "Зупиніть таймер, коли гравець торкнеться FinishPad",
 "Відформатуйте час для відгуків у стилі швидкісного бігу",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Любителі швидкого бігу люблять таймери. Ваш obby відображатиме **живі секунди** і зависне на фінішній панелі.

**Хід уроку:**
1. **Теорія (40 хв)** - ScreenGui + LocalScript +\`os.clock\` 2. **Практика (~25 хв)** - таймер на вашій контрольній точці obby
3. **Вікторина (10 хв)** - проходження **70%**

**Нова ідея:** **LocalScript** = працює на **вашому** екрані (ідеально підходить для інтерфейсу користувача). Scripts знищення/контрольної точки залишаються **серверними** Scripts.

Відкрийте **Урок 2.2 - Контрольні точки**.`,
 },
 {
 title: "Геймплей клієнтського інтерфейсу проти сервера",
 content: `| Тип Script | Бігає де | Урок використання |
|-------------|------------|------------|
| **Script** | Сервер | Лава, КПП |
| **LocalScript** | Пристрій гравця | Текст таймера на екрані |

Таймер є **тільки візуальним для вас** під час гри в одиночку - це добре для навчання. Більш пізні модулі синхронізують час із RemoteEvents.

**Вправа (2 хв):** У Explorer розгорніть **StarterGui** - див\`StarterPlayerScripts\`область, де живе UI.`,
 },
 {
 title: "Створіть RunUI у StarterGui",
 content: `1. **StarterGui** → Insert **ScreenGui** → Name:\`RunUI\` 2. Всередині\`RunUI\`→ **TextLabel** → Name:\`TimerLabel\`| Property | Пропонований |
|----------|-----------|
| **Size** |\`{0, 240}, {0, 56}\`|
| **Position** | верхній центр\`{0.5, -120}, {0, 16}\`(AnchorPoint 0.5, 0) |
| **Прозорість фону** |\`0.2\`темна смуга |
| **Текст** |\`Time: 0.00\`|
| **TextScaled** | true |
| **Шрифт** | GothamBold або FredokaOne |

**ResetOnSpawn** на ScreenGui: залишити за замовчуванням (таймер може скинутися після смерті - прийнятно для цього уроку).`,
 },
 {
 title: "LocalScript - живий цикл таймера",
 content: `Insert всередину **LocalScript**\`RunUI\`(сестра TimerLabel):\`\`\`lua
local label = script.Parent:WaitForChild("TimerLabel")
local startTime = os.clock()
local running = true

while running do
 local elapsed = os.clock() - startTime
 label.Text = string.format("Time: %.2f", elapsed)
 task.wait(0.05)
end
\`\`\`**\`os.clock()\`** повертає секунди з високою точністю - чудово підходить для швидкісних пробіжок.

**\`task.wait(0.05)\`** оновлення ~20 разів на секунду - плавний текст без затримок.

Натисніть **Play** - таймер має відрахувати моментально.`,
 },
 {
 title: "FinishPad - зупинка таймера",
 content: `в\`Obby\`folder, додайте **Part**\`FinishPad\`:
- Розмір\`8, 1, 8\`| Neon зелений | Anchored true
- Місце після\`CP_Final\`Розширити LocalScript:\`\`\`lua
local Players = game:GetService("Players")
local label = script.Parent:WaitForChild("TimerLabel")
local finish = workspace:WaitForChild("Obby"):WaitForChild("FinishPad")

local startTime = os.clock()
local running = true

task.spawn(function()
 while running do
 local elapsed = os.clock() - startTime
 label.Text = string.format("Time: %.2f", elapsed)
 task.wait(0.05)
 end
end)

finish.Touched:Connect(function(hit)
 if not running then
 return
 end

 local character = hit.Parent
 local humanoid = character and character:FindFirstChildOfClass("Humanoid")
 if not humanoid then
 return
 end

 if Players.LocalPlayer.Character ~= character then
 return
 end

 running = false
 local elapsed = os.clock() - startTime
 label.Text = string.format("Finished! %.2fs", elapsed)
end)
\`\`\`Перевірка **LocalPlayer** = лише **ви** закінчуєте забіг у Play соло.`,
 },
 {
 title: "Покращено формат відображення хвилин",
 content: `Для часу понад 60 секунд:\`\`\`lua
local function formatTime(seconds)
 if seconds >= 60 then
 local m = math.floor(seconds / 60)
 local s = seconds % 60
 return string.format("%02d:%05.2f", m, s)
 end
 return string.format("%.2f", seconds)
end
\`\`\`використання\`formatTime(elapsed)\`замість сирих секунд\`label.Text\`.

**Вправа (5 хв):** Виконайте obby один раз - знімок екрана з часом **Finished!**.`,
 },
 {
 title: "Таймер + КПП разом",
 content: `**Очікувана поведінка:**
- Таймер запускається з ікру
- Смерть на лаві → відродження на контрольній точці → таймер **продовжує йти** (добре для цього уроку)
- Дотик\`FinishPad\`→ таймер **зупиняється**

**Порада щодо швидкісного бігу:** після фінішу запам’ятайте свій час і спробуйте перевершити його на 10%.

**Контрольний список перед тренуваннями:**
- [ ]\`RunUI\`знаходиться під **StarterGui**
- [ ] LocalScript є всередині\`RunUI\`- [ ]\`FinishPad\`шлях відповідає Script (\`workspace.Obby.FinishPad\`)`,
 },
 {
 title: "Проблеми з налагодженням інтерфейсу користувача",
 content: `| Проблема | Виправити |
|---------|-----|
| Таймер не видно | ScreenGui під StarterGui, а не Workspace |
| Таймер залишається 0,00 | LocalScript вимкнено або неправильний батьківський |
| Фініш не зупиняється | Неправильний шлях до FinishPad; виправити імена WaitForChild |
| Помилка в Play | Прочитати Output - відсутня назва TimerLabel |

**Часті запитання:** Таймер скидається після смерті - зараз нормально; Модуль 3+ може зберігати найкращі часи.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "ScreenGui у Workspace",
 explanation: "Інтерфейс користувача не відображатиметься на екрані програвача.",
 correctApproach: "Створіть RunUI у StarterGui",
 },
 {
 mistake: "Server Script для мітки таймера",
 explanation: "Сервер не може легко оновити ваш персональний графічний інтерфейс.",
 correctApproach: "Використовуйте LocalScript у RunUI",
 },
 {
 mistake: "Помилка шляху FinishPad",
 explanation: "WaitForChild нескінченний вихід або нуль.",
 correctApproach: "Точно збігайте назви папок: Obby та FinishPad",
 },
 {
 mistake: "Таймер ніколи не зупиняється",
 explanation: "Фінішний штрих не виявляє локальний характер.",
 correctApproach: "Порівняйте Players.LocalPlayer.Character з hit.Parent",
 },
 ],
 summary: "Ви створили таймер ScreenGui за допомогою os.clock, оновили його за допомогою LocalScript і заморозили дисплей на FinishPad - тепер ваш obby контрольної точки став швидкісним завданням.",
 practiceTask: {
 title: "Перевищте свій час (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Робочий таймер від появи до кінця.

### Part A - Інтерфейс користувача (8 хв)
1.\`RunUI\`+\`TimerLabel\`у StarterGui (стильований, читабельний)
2. Підрахунок LocalScript\`os.clock\` 3. **Play** - підтвердити роботу таймера

### Part B - Фінішна панель (8 хв)
1.\`FinishPad\`в кінці обби після\`CP_Final\` 2. Додайте фінішний код - таймер зупиняється, показує\`Finished! XX.XXs\` 3. Випробуйте сольну гру - тільки ваш character зупиняє таймер

### Part C - Три пробіжки (9 хв)
1. Забіг 1 - рекорд часу
2. Запустіть 2 - спробуйте на 10% швидше
3. Запуск 3 - найкраща спроба
4. **Зберегти в Roblox** →\`Lesson 2.3 - Obby Timer\` 5. **Практика завершена**`,
 hints: [
 "Якщо FinishPad немає в папці Obby, змініть шлях WaitForChild у Scripts",
 "task.wait(0,05) достатньо - не використовуйте wait() без аргументів",
 "TextScaled допомагає читати таймер на мобільному телефоні",
 ],
 optionalChallenge: "Використовуйте formatTime() для відображення mm:ss через 60 секунд.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Інтерфейс таймера належить до...",
 options: [
 "StarterGui",
 "Рельєф місцевості",
 "Тільки освітлення",
 "Тільки ServerStorage",
 ],
 correctAnswer: 0,
 explanation: "StarterGui клонує інтерфейс користувача для гравців.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Таймер LocalScript працює на...",
 options: [
 "Клієнт гравця",
 "Веб-сайт Roblox",
 "Лише для кожного серверного процесора",
 "Вікно виводу",
 ],
 correctAnswer: 0,
 explanation: "LocalScript запускається на пристрої гравця.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "os.clock() вимірює...",
 options: [
 "Минули секунди",
 "Гравець Robux",
 "Size Parts",
 "Індекс BrickColor",
 ],
 correctAnswer: 0,
 explanation: "os.clock повертає час для інтервалів.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "string.format(\"%.2f\", n) показує...",
 options: [
 "Два знаки після коми",
 "Випадковий колір",
 "Лише ім'я гравця",
 "Висота місцевості",
 ],
 correctAnswer: 0,
 explanation: "Плаваючі формати %.2f.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "біг = помилкові зупинки...",
 options: [
 "Цикл while, що оновлює мітку",
 "Весь ігровий сервер",
 "Всі КПП",
 "Генерація рельєфу",
 ],
 correctAnswer: 0,
 explanation: "Логічний прапор завершує цикл оновлення.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "FinishPad має виявити...",
 options: [
 "Дотик Character LocalPlayer",
 "Тільки лава",
 "Небо змінюється",
 "Зберегти у файл",
 ],
 correctAnswer: 0,
 explanation: "Перевірка LocalPlayer націлена на вас у соло-грі.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "task.wait(0,05) у циклі...",
 options: [
 "Оновлює текст ~20 разів на секунду",
 "Видаляє інтерфейс користувача",
 "Деталі анкерів",
 "Видає гру",
 ],
 correctAnswer: 0,
 explanation: "Коротке очікування врівноважує гладкість і легкість.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Знищення блоків за допомогою Script; таймер використовує...",
 options: [
 "LocalScript",
 "Folder",
 "Тільки звук",
 "SpawnLocation",
 ],
 correctAnswer: 0,
 explanation: "Тут таймери інтерфейсу користувача працюють на стороні клієнта.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Якщо таймер відсутній, спочатку перевірте...",
 options: [
 "RunUI під StarterGui та назву мітки",
 "Видалити Obby",
 "Видаліть Humanoid",
 "Змінити мову",
 ],
 correctAnswer: 0,
 explanation: "Неправильне розташування графічного інтерфейсу є головною помилкою інтерфейсу.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 2.3 зберегти назву...",
 options: [
 "Урок 2.3 - Obby Timer",
 "Урок 2.2 - Контрольні точки",
 "Модуль 1 - Живий острів",
 "Лавовий пров",
 ],
 correctAnswer: 0,
 explanation: "Збережіть після додавання таймера.",
 },
 ],
 },
}

export const ukLesson24 = {
 lessonId: "lesson-roblox-2-4",
 moduleId: "module-02",
 order: 4,
 title: "2.4 - Умови if/else",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Напишіть if, elseif і else розгалуження в Luau",
 "Призначте ранги S / A / B від часу фінішу",
 "Перевірте граничні значення, наприклад 35,00 і 60,00 секунд",
 "Підключіть логіку рангу до завершення потоку таймера",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Ваш obby вже відстежує час. Сьогодні гра **вирішує**, наскільки хороший цей час - **if/elseif/else**.

**Хід уроку:**
1. **Теорія (40 хв)** - умови + рангова оцінка
2. **Практика (~25 хв)** - S/A/B займає місце на фініші
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 2.3 - Obby Timer**. Ви розширите **FinishPad** LocalScript.`,
 },
 {
 title: "Ігри міркуйте в питаннях",
 content: `У кожній грі ставлять запитання так/ні:

| Питання | Дія |
|----------|--------|
| Гравець торкнувся фінішу? | Зупинити таймер |
| Час менше 35 секунд? | **S Ранг** |
| Час менше 60 секунд? | **Звання** |
| інакше? | **B ранг** |

**Умови** перетворюють запитання на код. ШІ не потрібен - лише чіткі правила, які ви пишете.`,
 },
 {
 title: "синтаксис if / elseif / else",
 content: `\`\`\`lua
local elapsed = 47.3
local rank = "B Rank"

if elapsed < 35 then
 rank = "S Rank"
elseif elapsed < 60 then
 rank = "A Rank"
else
 rank = "B Rank"
end

print(rank)
\`\`\`**Правила:**
- Працює лише **одна** гілка - перша справжня умова
- Умови використовують **порівняння**:\`<\`,\`>\`,\`==\`,\`<=\`- Кожен блок закінчується на\`end\`- Використовуйте\`elseif\`для додаткових кроків між\`if\`і\`else\`**Вправа (5 хв):** Output дані, тест\`elapsed = 34.9\`,\` 35.0\`,\` 59.9\`,\` 60.0\`- передбачити ранг перед запуском.`,
 },
 {
 title: "Вам потрібні оператори порівняння",
 content: `| Оператор | Значення | Приклад |
|----------|---------|---------|
|\`<\`| менше |\`elapsed < 35\`|
|\`<=\`| менше або дорівнює |\`deaths <= 3\`|
|\`>\`| більше |\`score > 10\`|
|\`==\`| рівний |\`rank == "S Rank"\`|
|\`~=\`| не дорівнює |\`team ~= "Red"\`|

**Поширена помилка:** написання\`if elapsed = 35\`- неодружений\`=\`**призначає**, не порівнює. Завжди використовуйте\`==\`для перевірки рівності.`,
 },
 {
 title: "Функція рангу - чистий код",
 content: `Розмістіть оцінку у **функції**, щоб завершальний код залишався читабельним:\`\`\`lua
local function getRank(elapsed)
 if elapsed < 35 then
 return "S Rank"
 elseif elapsed < 60 then
 return "A Rank"
 else
 return "B Rank"
 end
end
\`\`\`**Викличте його**, коли торкаєтеся FinishPad:\`\`\`lua
local rank = getRank(elapsed)
print("You earned: " .. rank)
\`\`\`**Вправа (8 хв):** Доп\`getRank\`до вашого таймера LocalScript. Роздрукуйте ранг to Output після закінчення.`,
 },
 {
 title: "Підключіть ряд до мітки таймера",
 content: `після\`running = false\`:\`\`\`lua
local rank = getRank(elapsed)
label.Text = string.format("Finished! %.2fs - %s", elapsed, rank)
\`\`\`Гравці миттєво бачать **час + оцінку** - це стимулює повторну гру для S Rank.

**Налаштування порогу:** зміна\`35\`і\` 60\`щоб відповідати **вашій** довжині obby. Короткі обби → важчі часи.`,
 },
 {
 title: "Тестуйте кожну гілку спеціально",
 content: `**Структуровані тести:**
1. **S Rank** - фініш спринту менше 35 с (або тимчасово знизити порогові значення)
2. **А Ранг** - нормальний обережний біг 35-59 с
3. **B Ранг** - йдіть повільно / чекайте на платформі за 60

**Корпуси:**
- Точно\`35.00\`→ переходить до **A** (тому що\`< 35\` is false, \`< 60\` is true)
- Точно\`60.00\`→ **B Ранг**

Напишіть порогові значення у вигляді коментарів у верхній Script у Part:\`\`\`lua
local S_TIME = 35
local A_TIME = 60
\`\`\``,
 },
 {
 title: "Необов'язково - смерть знижує ранг",
 content: `Відстежуйте смерті за допомогою лічильника в тому самому LocalScript:\`\`\`lua
local deaths = 0

-- In lava: you cannot detect server death easily in LocalScript yet.
-- For this lesson: manual test variable deaths = 3 before finish
\`\`\`Гілка виклику:\`\`\`lua
if deaths >= 3 and rank == "S Rank" then
 rank = "A Rank"
elseif deaths >= 3 and rank == "A Rank" then
 rank = "B Rank"
end
\`\`\`Повне відстеження смертей з’являється в наступних модулях із серверними подіями.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Я можу пояснити чому\`elseif\`запускається лише тоді, коли попередні тести виявляються невдалими
- [ ]\`getRank\`повертає рядок, який використовується в мітці таймера
- [ ] Я тестував принаймні два різні часи фінішу
- [ ] Зберегти ім'я готове:\`Lesson 2.4 - Finish Grades\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Використовується = замість == у if",
 explanation: "Одинарне дорівнює призначає значення.",
 correctApproach: "Порівняйте з == або < > <= >=",
 },
 {
 mistake: "elseif порядок неправильний (60 перед 35)",
 explanation: "Перший матч виграє - широка умова вловлює все.",
 correctApproach: "Спочатку перевірте найсуворіший поріг: S, потім A, потім ще",
 },
 {
 mistake: "Ранг завжди B Ранг",
 explanation: "минув ніколи не обчислювався до getRank.",
 correctApproach: "Минув обчислення = os.clock() - час початку безпосередньо перед оцінкою",
 },
 {
 mistake: "Змінено пороги, але не коментарі",
 explanation: "Майбутнє ти забуває правила.",
 correctApproach: "Зберігайте константи S_TIME та A_TIME у верхній Script у Part",
 },
 ],
 summary: "Ви використовували if/elseif/else, щоб класифікувати час фінішу за рангами S, A та B, перевірили граничні секунди та під’єднали текст рангу до свого таймера obby - ваша гра тепер реагує на правила, а не лише на числа.",
 practiceTask: {
 title: "Завершити оцінювання - S / A / B (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Фініш показує час + рейтинг з умов.

### Part A - функція getRank (10 хв)
1. Відкрийте таймер LocalScript з уроку 2.3
2. Додайте\`S_TIME = 35\`,\`A_TIME = 60\`і\`getRank(elapsed)\` 3. Надрукуйте рейтинг для виводу на FinishPad touch

### Part B - Відображення етикетки (8 хв)
1. Оновлення\`TimerLabel\`текст:\`Finished! XX.XXs - S Rank\` 2. Випробуйте три запуски, націлені на S, A та B

### Part C - Налаштувати та зберегти (7 хв)
1. Налаштуйте S_TIME / A_TIME, якщо ваш obby довший/коротший
2. Задокументуйте пороги в коментарях
3. **Зберегти в Roblox** →\`Lesson 2.4 - Finish Grades\` 4. **Практика завершена**`,
 hints: [
 "Перевірте 34,99 проти 35,00 проти 59,99 проти 60,00 у Studio з тимчасовим коротким obby",
 "Розмістіть getRank над з’єднанням Touched, щоб ви могли його легко прочитати",
 "У разі виявлення помилок перед зміною тексту етикетки друкувати to Output",
 ],
 optionalChallenge: "Якщо смертей >= 3, понизити ранг на один рівень (наразі змінна смертей вручну).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "if/elseif/else вибирає...",
 options: [
 "Лише перша справжня гілка",
 "Кожна гілка відразу",
 "Випадкова гілка",
 "Немає гілки",
 ],
 correctAnswer: 0,
 explanation: "Спочатку матч виграє, потім зупиняється.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "інакше, якщо минуло < 60 прогонів, коли...",
 options: [
 "elapsed < 35 було помилковим, а time < 60",
 "Завжди",
 "Ніколи інакше",
 "Тільки в режимі редагування",
 ],
 correctAnswer: 0,
 explanation: "Попередні помилкові умови дозволяють elseif.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Порівняти рівність використовує...",
 options: [
 "==",
 "=",
 "===",
 "<>",
 ],
 correctAnswer: 0,
 explanation: "Luau використовує == для рівності.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "минуло = 35,00, якщо минуло < 35, отримує...",
 options: [
 "Ранг A (не S)",
 "S ранг",
 "Помилка",
 "Без звання",
 ],
 correctAnswer: 0,
 explanation: "35 не менше 35.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Такі функції, як getRank, допомагають...",
 options: [
 "Чисто повторно використовуйте логіку",
 "Видалити інтерфейс користувача",
 "Видалити місцевість",
 "Банити гравців",
 ],
 correctAnswer: 0,
 explanation: "Функції організовують блоки умов.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Найсуворіша перевірка часу повинна бути...",
 options: [
 "Спочатку якщо",
 "Тільки останнє",
 "Ніколи не використовувався",
 "Внутрішній звук",
 ],
 correctAnswer: 0,
 explanation: "Перевірте поріг S перед ширшим порогом A.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Константа S_TIME у верхній Script у Part робить...",
 options: [
 "Налаштувати пороги простіше",
 "Скрипти невидимі",
 "Parts розкріплені",
 "Небесно-рожевий",
 ],
 correctAnswer: 0,
 explanation: "Іменовані константи документують правила гри.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Ранг мотивує гравців...",
 options: [
 "Повтор для кращого часу",
 "Видалити Workspace",
 "Вимкнути Humanoid",
 "Видаліть контрольні точки",
 ],
 correctAnswer: 0,
 explanation: "Оцінки стимулюють повторні спроби пробігу.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "інакше запускається, коли...",
 options: [
 "Жодна попередня умова не була trueю",
 "Завжди перший",
 "Тільки в Play",
 "Гравець має Robux",
 ],
 correctAnswer: 0,
 explanation: "else є резервною гілкою.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 2.4 зберегти назву...",
 options: [
 "Урок 2.4. Підсумкові оцінки",
 "Урок 2.3 - Obby Timer",
 "Лавовий пров",
 "Модуль 3",
 ],
 correctAnswer: 0,
 explanation: "Збережіть після додавання логіки рангу.",
 },
 ],
 },
}

export const ukLesson25 = {
 lessonId: "lesson-roblox-2-5",
 moduleId: "module-02",
 order: 5,
 title: "2.5 - Переможний екран",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть VictoryGui ScreenGui з рамкою та мітками",
 "Показати та приховати інтерфейс користувача з властивістю Enabled",
 "Відображати динамічний час і ранг від логіки фінішу",
 "Додайте кнопку «Повторити», яка скидає відчуття запуску",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Число на етикетці таймера - це добре. **Екран перемоги** схожий на перемогу в справжній грі.

**Хід уроку:**
1. **Теорія (40 хв)** - макет VictoryGui + showVictory
2. **Практика (~25 хв)** - полірована виграшна панель
3. **Вікторина (10 хв)** - проходження **70%**

Продовжуйте оцінювати свій **Урок 2.4**. Сьогодні ви переміщуєте результати на **центральну панель**.`,
 },
 {
 title: "Чого очікують гравці, коли виграють",
 content: `Сильні екрани перемоги показують:

| Елемент | Призначення |
|---------|---------|
| **Name** | "Рівень пройдено!" святкування |
| **Час** | Підтвердження виконання |
| **Звання** | S / A / B з уроку 2.4 |
| **Повторити** | Повторне відтворення в один клік |

**Правила UX:**
- Великий читабельний текст (**TextScaled**)
- Висококонтрастна панель на розмитому світі позаду
- **Enabled = false** до завершення - без спойлерів під час появи`,
 },
 {
 title: "Створення ієрархії VictoryGui",
 content: `У **StarterGui**:\`ScreenGui\`→ **VictoryGui** (ResetOnSpawn необов’язково)
└\`Frame\`→ **Панель** (у центрі, розмір ~\`{0, 320}, {0, 280}\`)
 ├\`TextLabel\`→ **TitleLabel** - "Рівень завершено!"
 ├\`TextLabel\`→ **TimeLabel** - "Час: --"
 ├\`TextLabel\`→ **RankLabel** - "Ранг: --"
 └\`TextButton\`→ **RetryButton** - "Play ще раз"

**Стиль панелі:**
- BackgroundColor3 темно-синій/сірий
- UIC Радіус кута 12
- UIStroke біла тонка рамка

Встановіть **VictoryGui.Enabled = false** у Properties перед створенням Script.`,
 },
 {
 title: "функція showVictory",
 content: `LocalScript у **VictoryGui** (або всередині RunUI, якщо ви об’єднуєте файли):\`\`\`lua
local gui = script.Parent
local panel = gui:WaitForChild("Panel")
local titleLabel = panel:WaitForChild("TitleLabel")
local timeLabel = panel:WaitForChild("TimeLabel")
local rankLabel = panel:WaitForChild("RankLabel")

local function showVictory(finalTime, rank)
 titleLabel.Text = "Level Complete!"
 timeLabel.Text = string.format("Time: %.2fs", finalTime)
 rankLabel.Text = "Rank: " .. rank
 gui.Enabled = true
end

return showVictory
\`\`\`Якщо Script є братньою структурою, використовуйте\`script.Parent\`шляхи, які точно відповідають **вашому** дереву.`,
 },
 {
 title: "Підключіть фінішну панель до інтерфейсу користувача",
 content: `**Варіант A - один LocalScript** у RunUI обробляє таймер + фініш + перемогу.

Торкніться FinishPad після обчислення\`elapsed\`і\`rank\`:\`\`\`lua
-- Stop timer loop (running = false)
local victoryGui = playerGui:WaitForChild("VictoryGui")
-- OR if VictoryGui is in StarterGui it clones to PlayerGui:
local victoryGui = game:GetService("Players").LocalPlayer:WaitForChild("PlayerGui"):WaitForChild("VictoryGui")

victoryGui.Panel.TitleLabel.Text = "Level Complete!"
victoryGui.Panel.TimeLabel.Text = string.format("Time: %.2fs", elapsed)
victoryGui.Panel.RankLabel.Text = "Rank: " .. rank
victoryGui.Enabled = true
\`\`\`**Вправа (10 хв):** Завершити obby - з'являється панель перемоги, таймер зупиняється під нею.`,
 },
 {
 title: "Приховати таймер RunUI, коли відображається перемога",
 content: `Додатковий лак:\`\`\`lua
local runUI = playerGui:FindFirstChild("RunUI")
if runUI then
 runUI.Enabled = false
end
victoryGui.Enabled = true
\`\`\`Гравці зосереджуються на картці виграшу, а не на повторюваних числах.

Відновіть RunUI під час повторної спроби.`,
 },
 {
 title: "Поведінка кнопки повторити",
 content: `\`\`\`lua
local retryBtn = panel:WaitForChild("RetryButton")

retryBtn.MouseButton1Click:Connect(function()
 gui.Enabled = false
 local runUI = playerGui:FindFirstChild("RunUI")
 if runUI then
 runUI.Enabled = true
 end
 local char = Players.LocalPlayer.Character
 if char and char:FindFirstChild("Humanoid") then
 char.Humanoid.Health = 0 -- respawn to restart run feel
 end
end)
\`\`\`**Примітка:** Для повного скидання таймера потрібно перезавантажити startTime - для уроку достатньо відновити + приховати GUI. Ідеальне скидання зливається в модулі 6 (полірування).

**Вправа (5 хв):** Натисніть «Повторити» - панель ховається, ви знову з’являєтьсяте.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] VictoryGui запускає **Enabled false**
- [ ] Точні назви відповідають Script WaitForChild
- [ ] Finish показує час **і** ранг на панелі
- [ ] Повторна спроба приховує панель
- [ ] Зберегти:\`Lesson 2.5 - Victory Screen\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Нульова помилка на TitleLabel",
 explanation: "Неправильний шлях - невідповідність імен панелі та рами.",
 correctApproach: "Точно збігайте імена Explorer із рядками WaitForChild",
 },
 {
 mistake: "Перемога, видима на спауні",
 explanation: "Увімкнено, залишилося вірним.",
 correctApproach: "VictoryGui.Enabled = false до завершення",
 },
 {
 mistake: "Script у Workspace, а не StarterGui",
 explanation: "Інтерфейс користувача не клонується до плеєра.",
 correctApproach: "LocalScript у VictoryGui у StarterGui",
 },
 {
 mistake: "Шукаємо VictoryGui у StarterGui під час виконання",
 explanation: "Після появи він живе під PlayerGui.",
 correctApproach: "Використовуйте LocalPlayer.PlayerGui:WaitForChild(\"VictoryGui\")",
 },
 ],
 summary: "Ви створили VictoryGui із заголовком, часом, рангом і повторними спробами, підключили його до логіки FinishPad і вивчили шляхи Enabled плюс PlayerGui - ваш obby тепер святкує перемоги, як опублікована міні-гра.",
 practiceTask: {
 title: "Полірування панелі Victory (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Екран професійної перемоги на фініші.

### Part A - Макет (10 хв)
1. Створіть **VictoryGui** + **Panel** + 3 мітки + **RetryButton**
2. Стиль: кут, обведення, читабельні шрифти, **Увімкнено false**
3. Розташуйте центральний екран панелі

### Part B - Показ після закінчення (10 хв)
1. Підключіть FinishPad для заповнення етикеток +\`VictoryGui.Enabled = true\` 2. Приховайте або вимикайте **RunUI**, поки відображається перемога
3. Ранги тесту S, A, B відображаються правильно

### Part C - Повторити та зберегти (5 хв)
1. Кнопка «Повторити» приховує перемогу, вмикає RunUI, відроджує гравця
2. **Зберегти в Roblox** →\`Lesson 2.5 - Victory Screen\` 3. **Практика завершена**`,
 hints: [
 "Використовуйте шлях копіювання Explorerа, щоб перевірити імена об’єктів",
 "Якщо панель нуль, надрукувати script.Parent:GetFullName() у вихідних даних",
 "Перевірте Повторіть один раз перед збереженням",
 ],
 optionalChallenge: "TweenService пересунути панель зверху, коли ввімкнено (попередній перегляд модуля 5).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "VictoryGui має починатися з Enabled...",
 options: [
 "помилковий",
 "true always",
 "нуль",
 "випадковий",
 ],
 correctAnswer: 0,
 explanation: "Приховано, доки гравець не закінчить.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Після спауну VictoryGui знаходиться під...",
 options: [
 "PlayerGui",
 "Рельєф місцевості",
 "Освітлення",
 "Лише ServerScriptService",
 ],
 correctAnswer: 0,
 explanation: "StarterGui клонується в PlayerGui.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "showVictory оновлення...",
 options: [
 "Properties тексту мітки",
 "Місцева вода",
 "Клас SpawnLocation",
 "Вбивати блоки",
 ],
 correctAnswer: 0,
 explanation: "Динамічний текст розміщується на етикетках.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Натискання TextButton використовує...",
 options: [
 "MouseButton1Click",
 "Зворушений",
 "BrickColor",
 "Якір",
 ],
 correctAnswer: 0,
 explanation: "Кнопки GUI використовують події миші.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Екран перемоги LocalScript працює на...",
 options: [
 "Клієнт",
 "Тільки сервер",
 "Сайт Roblox API",
 "Output",
 ],
 correctAnswer: 0,
 explanation: "Графічний інтерфейс клієнта.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "RankLabel має показувати...",
 options: [
 "S/A/B від умов",
 "Тільки вік гравця",
 "Насіння місцевості",
 "Помилки Script",
 ],
 correctAnswer: 0,
 explanation: "Ранг отримано з логіки уроку 2.4.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "UICorner на панелі...",
 options: [
 "Заокруглює кути для полірування",
 "Вбиває гравця",
 "Додає лаву",
 "Зберігає в хмарі",
 ],
 correctAnswer: 0,
 explanation: "UICorner - візуальний модифікатор.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Повторна спроба має принаймні...",
 options: [
 "Приховати графічний інтерфейс перемоги",
 "Видалити obby",
 "Видаліть контрольні точки",
 "Опублікувати гру",
 ],
 correctAnswer: 0,
 explanation: "Сховати інтерфейс користувача перед наступною спробою.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "WaitForChild запобігає...",
 options: [
 "Нуль, якщо інтерфейс користувача завантажується із запізненням",
 "Всі скрипти",
 "Відтворення звуків",
 "Рухома камера",
 ],
 correctAnswer: 0,
 explanation: "Чекає на існування екземплярів.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 2.5 зберегти назву...",
 options: [
 "Урок 2.5 - Екран перемоги",
 "Завершити оцінки",
 "Лавовий пров",
 "Симулятор монет",
 ],
 correctAnswer: 0,
 explanation: "Збережіть урок інтерфейсу користувача перемоги.",
 },
 ],
 },
}

export const ukLesson26 = {
 lessonId: "lesson-roblox-2-6",
 moduleId: "module-02",
 order: 6,
 title: "2.6 - Checkpoint: Obby готовий",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Інтегруйте лаву, контрольні точки, таймер, звання та інтерфейс перемоги",
 "Виконайте контрольний список із п’ятьма випадками відтворення",
 "Зрозуміла карта Польщі зі знаками та узгодженими назвами",
 "Здайте прототип модуля 2: Obby Ready",
 ],
 theory: {
 sections: [
 {
 title: "Контрольна точка модуля 2 (близько 40 хвилин)",
 content: `Ви здаєте **Obby Ready** - повний міні-obby, а не файл домашнього завдання.

**Потрібні системи:**
- Вбивство блоків (2.1)
- Контрольні точки (2.2)
- Таймер (2.3)
- Звання S/A/B (2.4)
- Екран перемоги (2.5)

**Хід уроку:** навчання + тест + вікторина. Менше нового коду, більше **панелі якості**.`,
 },
 {
 title: "План спринту на 60 хвилин",
 content: `| Фаза | протокол | Завдання |
|-------|---------|------|
| 1 | 10 | Explorer очищення + знаки |
| 2 | 15 | Лава + повторний тест контрольних точок |
| 3 | 15 | Таймер → звання → потік перемог |
| 4 | 10 | Візуальний полір (кольори, світло) |
| 5 | 10 | П'ять ігрових тестів + виправлення |

**Цільова folder:**\`Workspace/Obby\`→ Небезпеки, SafePath, Контрольні точки, FinishPad\`StarterGui\`→ RunUI, VictoryGui`,
 },
 {
 title: "Чіткість карти - гравці не повинні заблукати",
 content: `Додайте **Neon Parts зі стрілками** або підпишіть model, спрямовані вперед.

| Знак | Ідея тексту |
|------|-----------|
| Почати | «Obby Start →» |
| Середина | «КПП попереду» |
| Кінець | "Кінець!" |

**Мова кольорів:**
- Безпечний = сіре/біле дерево
- Lava = неоново-червоний
- CP неактивний = жовтий, активний = зелений
- Оздоблення = неонова зелена подушечка

**Вправа (8 хв.):** Станьте на spawn у Play - чи можете ви побачити, куди йти, не запитуючи?`,
 },
 {
 title: "П'ять ігрових тестів (обов'язково)",
 content: `Проведіть кожен випадок. Позначте в примітці «склав/не склав».

1. **Рання смерть** - торкніться лави до CP_1 → відродження на **початку**
2. **Смерть CP_1** - торкніться CP_1, померти на лаві → відродитися **CP_1**
3. **Повне очищення** - досягти FinishPad → інтерфейс перемоги + правильний ранг
4. **Повільний фініш** - навмисний біг 60 с+ → **Ранґ B** на панелі
5. **Повторити** - натисніть Play знову → панель ховається, можна запустити знову

**Якщо будь-який збій:** виправте перед викликом obby done.`,
 },
 {
 title: "Якісна збірка - відчувається готовою до демо",
 content: `- **60-120 секунд** ігрового процесу для середнього гравця
- **Немає червоного виведення спаму** під час чистого запуску
- **8+** іменовані Parts в obby (не загальна Part)
- **3+** КПП працюють
- **3+** блоки лави
- Перемога + таймер ніколи не показують неправильний текст одночасно

**Аудіо необов’язково:** тихе середовище + пінг контрольної точки (навички модуля 1).`,
 },
 {
 title: "Розпочати з'єднання концентратора",
 content: `Ваш модуль 1 **острів** може залишитися в якості смаку - з'єднайте obby, починаючи з моста або шляху від доку.

Гравці розуміють: **центр → стартовий знак obby → курс**.

Збережіть як **Module 2 - Obby Ready** (нова назва) або замініть своє місце 2.5 остаточною назвою.`,
 },
 {
 title: "Попередній перегляд модуля 3",
 content: `Модуль 3 створює **симулятор монет** - збір, оцінка інтерфейсу користувача, збереження даних.

Ваші навички obby (дотик, інтерфейс користувача, умови) передаються безпосередньо до підбору монет.

**Святкуйте:** тепер у вас є цикл, який використовують мільйони ігор Roblox: **спробувати → невдача → відродитися → покращити → виграти**.`,
 },
 {
 title: "Демонстраційний Script для вчителя/батьків",
 content: `Запис або пряме шоу **2 хвилини:**
1. Spawn - показати стартовий знак
2. Померти на лаві один раз - показати збереження контрольної точки
3. Закінчити з рейтингом на екрані перемоги
4. Натисніть Повторити

**Скажіть вголос:** що таке поріг часу S Rank і чому ви його обрали.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Показує перемогу, але розбиті контрольні точки",
 explanation: "Поспішне полірування без повторної перевірки.",
 correctApproach: "Запускайте всі 5 ігрових тестів після кожної великої зміни",
 },
 {
 mistake: "Obby занадто короткий (< 30 с)",
 explanation: "Недостатньо етапів.",
 correctApproach: "До фінішу додайте етап 4 або складніші стрибки",
 },
 {
 mistake: "Загальні імена Explorer",
 explanation: "Неможливо налагодити 20 Scripts із назвою Part.",
 correctApproach: "Перейменувати все перед демонстрацією",
 },
 {
 mistake: "Таймер і перемога включені на фініші",
 explanation: "Збентежений подвійний інтерфейс.",
 correctApproach: "Вимкніть RunUI, коли відображається VictoryGui",
 },
 ],
 summary: "Ви інтегрували кожну систему Module 2 в Obby Ready, пройшли структуровані ігрові тести, уточнили маршрут за допомогою знаків і зберегли прототип, готовий до демо-версії - на черзі ігри з монетами Module 3.",
 practiceTask: {
 title: "Здайте Obby Ready (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** Пройти всі 5 ігрових тестів + демо-готове місце.

### Part A - Очищення (10 хв)
1. Explorer: Folders Hazards, SafePath, Checkpoints під Obby
2. Перейменувати сторонні Parts; додати знаки Старт + Кінець
3. Немає незакріплених Parts obby

### Part B - Аудит систем (15 хв)
1. Перетестуйте лаву, CP_1/2/Final, FinishPad
2. Таймер + getRank + VictoryGui один чистий потік
3. Виправте будь-які помилки виводу

### Part C - Тести відтворення та збереження (15 хв)
1. Заповніть контрольні випадки 1-5 (зазначте «склав/не склав»)
2. Один повний пробіг для кращої спроби рангу
3. **Зберегти в Roblox** →\`Module 2 - Obby Ready\` 4. **Практика завершена** + додатковий 2-хвилинний запис`,
 hints: [
 "Виправте помилки контрольних точок, перш ніж торкатися кольорів перемоги",
 "Пройдіть маршрут так, ніби ви ніколи не бачили карти",
 "Порогові значення S_TIME/A_TIME мають відповідати довжині obby",
 ],
 optionalChallenge: "Швидкий шлях прихованих навичок - швидші, але складніші стрибки.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Obby Ready вимагає...",
 options: [
 "Лава + CP + таймер + перемога",
 "Тільки місцевість",
 "Лише кліки з 1.4",
 "Жодних Scripts",
 ],
 correctAnswer: 0,
 explanation: "Контрольна точка модуля 2 об’єднує всі системи.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Після CP_2, потім смерть, поява в...",
 options: [
 "КП_2",
 "Лише світове походження",
 "FinishPad",
 "Ящик інструментів",
 ],
 correctAnswer: 0,
 explanation: "Виграє остання контрольна точка, якої торкнувся.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "VictoryGui з’являється, коли...",
 options: [
 "Гравець торкається FinishPad",
 "Студія відкривається",
 "Рельєф породжує",
 "Збереження файлу",
 ],
 correctAnswer: 0,
 explanation: "Завершення запускає інтерфейс користувача перемоги.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Перевірки Playtest 4...",
 options: [
 "B Місце на повільному фініші",
 "Видалення острова",
 "Переклад з Великобританії",
 "Видавництво",
 ],
 correctAnswer: 0,
 explanation: "Повільний хід має вдарити по гілці B.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Хороша довжина обби приблизно...",
 options: [
 "60-120 секунд",
 "2 секунди",
 "1 година мінімум",
 "Без стрибків",
 ],
 correctAnswer: 0,
 explanation: "Міні обби цілі близько хвилини.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Початкові знаки допомагають...",
 options: [
 "Гравці знаходять маршрут",
 "Збільшити пошкодження лави",
 "Видаліть Humanoid",
 "Вимкнути інтерфейс користувача",
 ],
 correctAnswer: 0,
 explanation: "Пошук шляху зменшує плутанину.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Кнопка повторити має...",
 options: [
 "Приховати перемогу та дозволити ще один біг",
 "Видалити всі контрольні точки",
 "Зняти звання",
 "Закрити студію",
 ],
 correctAnswer: 0,
 explanation: "Повторна спроба підтримує цикл повторного відтворення.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Червоний вихід під час чистого запуску означає...",
 options: [
 "Виправте Scripts перед публікацією",
 "Ідеальна гра",
 "Потрібно більше лави",
 "Опублікувати зараз",
 ],
 correctAnswer: 0,
 explanation: "Помилки означають, що помилки залишаються.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Тема модуля 3...",
 options: [
 "Монети та колекціонування",
 "Тільки автомобілі",
 "Тільки видавництво",
 "Порожні заповнювачі",
 ],
 correctAnswer: 0,
 explanation: "Модуль 3 запускає симулятор монет.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Name збереження останнього модуля 2...",
 options: [
 "Модуль 2 - Obby Ready",
 "Заняття 1.1",
 "Без назви",
 "Тест Obby",
 ],
 correctAnswer: 0,
 explanation: "Checkpoint використовує назву портфоліо Module 2.",
 },
 ],
 },
}
