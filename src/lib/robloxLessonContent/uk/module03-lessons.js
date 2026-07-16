/** Rich UK content for Roblox Module 03 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson31 = {
 lessonId: "lesson-roblox-3-1",
 moduleId: "module-03",
 order: 1,
 title: "3.1 - Монети на карті",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Дизайн монети, який направляє рух гравця",
 "Створіть багаторазову збірну Part для монет",
 "Розмістіть монети в folderх із чіткими назвами",
 "Підготуйте карту для колекціонування в стилі симулятора",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Модуль 3 - Гра, яка пам’ятає про вас** відкриває жанр **симулятор монет** - збирайте, вирощуйте, повторюйте.

**Хід уроку:**
1. **Теорія (40 хв.)** - збірна монета + розумне розміщення
2. **Практика (~25 хв)** - 30+ монет у трьох зонах
3. **Вікторина (10 хв)** - проходження **70%**

Використовуйте своє місце **Module 2 - Obby Ready** або скопіюйте його як\`Lesson 3.1 - Coin World\`. Сьогодні **лише збірка** - Scripts надходять у версії 3.2.`,
 },
 {
 title: "Від обби до симулятора",
 content: `| Obby (Модуль 2) | Тренажер (Модуль 3) |
|-----------------|-----------------------|
| Досягти фінішу | Збирайте ресурси |
| Уникайте лави | Погоня за світяться монетами |
| Ранг швидкості | Зростаюча кількість |

**Хороші монетні карти вчать маршрут:**
- Куди далі без гігантської стріли
- Шляхи ризику проти винагороди
- Секрети дослідження`,
 },
 {
 title: "Побудуйте збірну монету",
 content: `Створіть одну головну монету:

| Property | Значення |
|----------|-------|
| Форма | **Циліндр** (вигляд монети) |
| Size |\`2, 0.4, 2\`|
| Material | **Neon** або метал |
| BrickColor | **New Yeller** або Bright yellow |
| Anchored | **true** |
| CanCollide | **false** (пройти) |
| Ім'я |\`CoinPrefab\`|

**Полірування:**
- Трохи підніміть Y над землею (наведіть курсор)
- **PointLight** - жовтий, діапазон 6
- Додаткове повільне обертання пізніше (Модуль 10)

**Вправа (8 хв):** Скопіюйте префаб 5 разів у рядку - інтервали здаються ритмічними, а не випадковими.`,
 },
 {
 title: "Шаблони розміщення",
 content: `**Лінія стежки** - монети вздовж безпечного шляху (початківці слідують)

**Стрибок ризику** - 3 монети над лавовою щілиною (кваліфіковані гравці)

**Кластерна зона** - 8 монет навколо орієнтира (нагорода за дослідження)

**Довідник щільності:**
| Зона | Монети | Складність |
|------|-------|------------|
| Зона нересту | 10-12 | Легко |
| Середній острів | 10-12 | Середній |
| Далеко / високо | 8+ | Важкі стрибки |

**Вправа (10 хв):** Перш ніж продовжити, розмістіть **15** монет, використовуючи всі три шаблони.`,
 },
 {
 title: "Організація папок",
 content: `Структура **Workspace**:\`\`\`
Coins/
 Common/ ← Coin_001 ... Coin_030
 Rare/ ← optional CoinRare_01 (cyan, bigger)
\`\`\`**Правила іменування:**
-\`Coin_001\`ні\`Part\`- Початкові нулі зберігають порядок сортування в Explorer
- Дубльований один префаб, потім перейменуйте кожну копію

**Чому Folders важливі:** Урок 3.2 додає один Script до **всіх** монет - чисті дерева = швидке налагодження.`,
 },
 {
 title: "Видимість і темп",
 content: `Гравцям потрібен **миттєвий гол** під час появи:
- Перша монета, видима протягом **5 секунд** ходьби
- Для досягнення останньої монети в зоні 3 потрібно **60+ секунд**

**Уникайте:**
- Усі 30 монет в одному плоскому кластері (нудно)
- Монети всередині Terrain (важко побачити)
- Монети плавають занадто високо, щоб стрибнути

**Підписатися на spawn:**\`Collect coins - scripts next lesson!\``,
 },
 {
 title: "Рідкісні монети (необов'язковий попередній перегляд)",
 content: `Дубльований префаб для Folders **Rare**:
- Розмір\`2.5, 0.5, 2.5\`- BrickColor **Cyan** або **Gold**
- Яскравіше PointLight

Ви отримаєте **+5** в Уроці 3.3 - сьогодні лише **будуйте** їх (максимум 5 рідкісних).

Мітка\`CoinRare_01\`... в\`Coins/Rare\`.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] CoinPrefab: циліндр, жовтий, CanCollide false
- [ ] Folder\`Coins/Common\`існує
- [ ] **30+** монети, розміщені в 3 зонах
- [ ] Кожна монета має унікальну назву
- [ ] Зберегти:\`Lesson 3.1 - Coin Route\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "CanCollide true на монетах",
 explanation: "Пізніше гравці стикаються та пропускають пікапи.",
 correctApproach: "CanCollide false - пройдіть, щоб зібрати в 3.2",
 },
 {
 mistake: "Усі монети під назвою Part",
 explanation: "Неможливо знайти зламану монету в 30 копіях.",
 correctApproach: "Одразу назви стилю Coin_001",
 },
 {
 mistake: "Монети, закопані в місцевість",
 explanation: "Невидимі предмети колекціонування розчаровують гравців.",
 correctApproach: "Підніміть Y; перевірте ракурс камери від spawn",
 },
 {
 mistake: "Всього всього 5 монет",
 explanation: "Недостатньо для відчуття симулятора.",
 correctApproach: "Мінімум 30 для вимог до практики",
 },
 ],
 summary: "Ви створили збірну жовту монету, розмістили понад 30 монет у шаблонах слідів, ризиків і кластерів, а також упорядкували Folders Workspace - ваша карта готова для Scripts збору.",
 practiceTask: {
 title: "Маршрут за монети - 30+ пікапів (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Три зони монет, ще нуль скриптів.

### Part A - збірні (5 хв)
1. Будувати\`CoinPrefab\`(циліндр, неоново-жовтий, CanCollide false)
2. Додайте сяйво PointLight

### Part B - Зони (15 хв)
1. **Легка зона** біля відродження: **12** монет на шляху
2. **Середня зона** в бік obby/dock: **10** монет (одна лінія стрибка ризику)
3. **Жорстка зона** дальній бік: **8+** монет + опціонально **5 рідкісних** блакитних монет

### Part C - Упорядкування та збереження (5 хв)
1. Move все в\`Coins/Common\`і\`Coins/Rare\` 2. Перейменувати\`Coin_001\`через\`Coin_030\`+
3. **Зберегти в Roblox** →\`Lesson 3.1 - Coin Route\` 4. **Практика завершена**`,
 hints: [
 "Duplicate (Ctrl+D) вздовж шляху — потім перейменуйте в Explorer",
 "Станьте на spawn у Play - ви повинні негайно побачити принаймні одну монету",
 "Рідкісні монети знаходяться у важкодоступних місцях",
 ],
 optionalChallenge: "П'ять прихованих монет за місцевістю або доком - винагорода дослідників.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Модуль 3 фокусується на...",
 options: [
 "Економіка збору",
 "Лише Terrain",
 "Лише публікація",
 "Без Parts",
 ],
 correctAnswer: 0,
 explanation: "Модуль 3 - це стиль симулятора монет.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Coin CanCollide має бути...",
 options: [
 "false",
 "завжди true",
 "nil",
 "лише для лави",
 ],
 correctAnswer: 0,
 explanation: "Гравці проходять, щоб зібрати.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Форма CoinPrefab зазвичай...",
 options: [
 "Cylinder",
 "SpawnLocation",
 "Sky",
 "Script",
 ],
 correctAnswer: 0,
 explanation: "Циліндр читається як монетний диск.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Розташування траси...",
 options: [
 "Проводить маршрут для новачків",
 "Видаляє монети",
 "Додає лаву",
 "Прибирає UI",
 ],
 correctAnswer: 0,
 explanation: "Лінії вчать, куди йти.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Folder монет допомагає...",
 options: [
 "Організує перед Script",
 "Банить гравців",
 "Змінює мову",
 "Прибирає Humanoid",
 ],
 correctAnswer: 0,
 explanation: "Folders забезпечують чистоту Explorerа.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Практика вимагає як мінімум...",
 options: [
 "30 монет",
 "1 монета",
 "0 монет",
 "1000 Scripts",
 ],
 correctAnswer: 0,
 explanation: "30+ монет для щільності симулятора.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Хороші назви монет виглядають як...",
 options: [
 "Coin_001",
 "Part, Part, Part",
 "asdf",
 "Script1",
 ],
 correctAnswer: 0,
 explanation: "Пронумеровані імена легко сортуються та виправляються.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Scripts для отримання надходять...",
 options: [
 "Урок 3.2",
 "Лише Урок 1.1",
 "Ніколи",
 "Лише Модуль 12",
 ],
 correctAnswer: 0,
 explanation: "3.1 є лише макетом.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Рідкісні монети часто...",
 options: [
 "Важче дістатися + інший колір",
 "Невидимі",
 "Під SpawnLocation",
 "Лише Scripts",
 ],
 correctAnswer: 0,
 explanation: "Рідкість = нагорода + візуальна відмінність.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 3.1 зберегти назву...",
 options: [
 "Lesson 3.1 - Coin Route",
 "Obby Ready",
 "Click Magic",
 "Untitled",
 ],
 correctAnswer: 0,
 explanation: "Збережіть після розміщення монет.",
 },
 ],
 },
}

export const ukLesson32 = {
 lessonId: "lesson-roblox-3-2",
 moduleId: "module-03",
 order: 2,
 title: "3.2 - Збираємо монети",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Виявляйте колекцію монет за допомогою Touched на сервері",
 "Щоб запобігти подвійному збору, використовуйте позначку усунення дребезгу",
 "Сховайте монети після отримання за допомогою прозорості",
 "Додатково відродити монети після затримки",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Ваші монети є прикрасами, доки **Touched** не зробить їх ігровими.

**Хід уроку:**
1. **Теорія (40 хв)** - підхоплення сервера + дебоунс
2. **Практика (~25 хв)** - 15+ працюючих збирачів
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 3.1 - Маршрут монет**.`,
 },
 {
 title: "Вимоги до колекції",
 content: `Справедлива монетна система повинна:
- Порахуйте **один раз** за цикл дотику
- Миттєве відчуття (без затримки)
- Робота для **кожного** гравця на сервері
- Не спам подій **Touched**

**Server Script** всередині кожної монети (такий самий шаблон, що й лава, інший результат).`,
 },
 {
 title: "Базовий скрипт пікапу",
 content: `Insert всередину **Script**\`CoinPrefab\`(або одну монету), потім дублюйте монету **з** скриптом:\`\`\`lua
local coin = script.Parent
local collected = false

coin.Touched:Connect(function(hit)
 if collected then
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

 local player = game:GetService("Players"):GetPlayerFromCharacter(character)
 if not player then
 return
 end

 collected = true
 coin.Transparency = 1
 coin.CanCollide = false

 print(player.Name .. " collected " .. coin.Name)
end)
\`\`\`**Вправа (8 хв):** Перевірте одну монету в Play - торкніться один раз, монета зникне, виведіть повідомлення (print) один раз.`,
 },
 {
 title: "Дебоунс пояснив",
 content: `\`Touched\`може стріляти **багато разів на секунду**, поки ви стоїте всередині монети.

| Без дребезгу | З дебоунсом |
|------------------|--------------|
| +10 фальшивих пікапів | Рівно 1 пікап |
| Звуковий спам | Один звук |
| Майбутні помилки оцінки | Вартість стабільних монет |\`collected = true\`на початку успішного підхоплення блоки повторюються.

**Тест:** Постійте всередині монети 3 секунди - на виході має бути **один** відбиток.`,
 },
 {
 title: "Швидке розгортання на багатьох монетах",
 content: `**Спосіб 1:** Вбудуйте Script\`CoinPrefab\`→ дублювати монету+скрипт до всіх слотів.

**Спосіб 2:** Одна робоча монета → **Ctrl+D** 15 разів → перейменувати.

**Спосіб 3 (розширений пізніше):** Script єдиного сервера зациклює всі монети в папці - допомога з функціями уроку 3.4.

На сьогодні: **Метод 1 або 2** принаймні **15** монет\`Coins/Common\`.`,
 },
 {
 title: "Зворотний зв'язок звукозапису - звук і VFX",
 content: `Додайте дочірній елемент **Sound**\`PickupSound\`на збірних монетах:\`\`\`lua
local sound = coin:FindFirstChild("PickupSound")
if sound then
 sound:Play()
end
\`\`\`Помістіть перед тим, як сховати монету (Прозорість = 1).

**Необов’язково:** невеликий сплеск **ParticleEmitter** - вимкнути через 0,5 с.

Гравці **відчувають** винагороду до того, як монета зникне.`,
 },
 {
 title: "Відродження монет (стиль симулятора)",
 content: `Одноразові монети = порожня карта після повного очищення.

**Відродження** через 15 секунд:\`\`\`lua
task.delay(15, function()
 collected = false
 coin.Transparency = 0
 -- CanCollide stays false
end)
\`\`\`Поставте **після** сховання монети. Тест: почекайте 15 секунд, монета повертається, збирайте знову.

**Виберіть один** для практики: лише сеанс **або** відродження - задокументуйте в коментарях.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Script є серверним Script, нащадком coin
- [] Присутні перевірки Humanoid + GetPlayerFromCharacter
- [ ] Усунення стрибків протестовано за допомогою 3-секундного стояння на монеті
- [] 15+ монет збираються рівно один раз за цикл
- [ ] Зберегти:\`Lesson 3.2 - Collecting Coins\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "LocalScript на монеті",
 explanation: "Інші гравці можуть не бачити такої поведінки.",
 correctApproach: "Серверний скрипт для світових пікапів",
 },
 {
 mistake: "Без відскоку - оцінка стрибків +10",
 explanation: "Неодноразово торкався вогню.",
 correctApproach: "прапор збирання встановлюється в true після першого дійсного дотику",
 },
 {
 mistake: "Знищити монету за допомогою :Destroy()",
 explanation: "Важче відродитися; розриває посилання.",
 correctApproach: "Приховування прозорості 1 для уроків відновлення",
 },
 {
 mistake: "Забув перевірку Humanoid",
 explanation: "Випадкові Parts викликають підхоплення.",
 correctApproach: "Той самий шаблон, що й блоки вбивства та контрольні точки",
 },
 ],
 summary: "Ваш дротовий сервер доторкнувся до підйому з усуненням відскоку, сховав монети під час збору, додав необов’язковий звук і перевірив повторні дотики - ваш маршрут монет тепер можна грати.",
 practiceTask: {
 title: "Стабільний підбір - 15+ монет (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** кожна монета збирається один раз за цикл.

### Part A - Script шаблону (10 хв)
1. Додайте Script підйому до\`CoinPrefab\`(усунення стрибків + приховування + друк)
2. Тест у Play - одна монета, один відбиток

### Part B - Розгортання (10 хв)
1. Застосуйте до **15+** монет\`Coins/Common\` 2. Додатковий PickupSound на збірному пристрої
3. Тест на спам: немає подвійних відбитків

### Part C - Відродження або збереження (5 хв)
1. Додайте 15 с відродження на **3** монетах АБО залиште одноразове відпочинок
2. **Зберегти в Roblox** →\`Lesson 3.2 - Collecting Coins\` 3. **Практика завершена**`,
 hints: [
 "Копія монети, яка вже має скрипт - найшвидший розгортання",
 "Print to Output, доки всі 15 не запрацюють, а потім видаліть відбитки",
 "Монети рідкісної Folders можуть використовувати той самий Script з різною назвою",
 ],
 optionalChallenge: "PickupSound відтворюється лише після успішного першого збору.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Для отримання монет слід використовувати...",
 options: [
 "Server Script у монеті",
 "Лише LocalScript у Head",
 "Пензель Terrain",
 "Sky",
 ],
 correctAnswer: 0,
 explanation: "Сервер обробляє світові пікапи.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Debounce використовує змінну на зразок...",
 options: [
 "collected = true",
 "Transparency = 5",
 "Anchored false",
 "Видалити Workspace",
 ],
 correctAnswer: 0,
 explanation: "Блоки прапорів повторюють дотики.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Після отримання сховайтеся за допомогою...",
 options: [
 "Transparency = 1",
 "Перейменувати на Part",
 "Прибрати Humanoid",
 "Publish",
 ],
 correctAnswer: 0,
 explanation: "Невидимий, але відроджується.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "GetPlayerFromCharacter потребує...",
 options: [
 "Коректний дотик Character",
 "Лише лава",
 "ClockTime",
 "Atmosphere",
 ],
 correctAnswer: 0,
 explanation: "Посилає тіло на обліковий запис гравця.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Багато разів торкався вогню, якщо...",
 options: [
 "Гравець залишається на монеті",
 "Гру збережено",
 "Монета Anchored",
 "Небо синє",
 ],
 correctAnswer: 0,
 explanation: "Перекриття викликає повторення подій.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "task.delay(15, ...) може...",
 options: [
 "Відроджує монету через 15 секунд",
 "Видаляє гравця",
 "Прибирає UI",
 "Змінює мову",
 ],
 correctAnswer: 0,
 explanation: "Схема відкладеного відродження.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "print on collect допомагає...",
 options: [
 "Налагодження перед leaderstats",
 "Публікує гру",
 "Додає Terrain",
 "Прибирає чекпоінти",
 ],
 correctAnswer: 0,
 explanation: "Output перевіряє підйоми.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "PickupSound повинен грати...",
 options: [
 "Один раз за успішний збір",
 "Кожен кадр",
 "Ніколи",
 "Лише в Edit",
 ],
 correctAnswer: 0,
 explanation: "Debounce запобігає звуковому спаму.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 3.2 базується на...",
 options: [
 "Розміщення монет з Уроку 3.1",
 "Лише Модуль 1",
 "Порожня карта",
 "Веб-розробка",
 ],
 correctAnswer: 0,
 explanation: "Скрипти додаються до монет 3.1.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 3.2 зберегти назву...",
 options: [
 "Lesson 3.2 - Collecting Coins",
 "Coin Route",
 "Obby Timer",
 "Victory Screen",
 ],
 correctAnswer: 0,
 explanation: "Збережіть після самовивозу роботи.",
 },
 ],
 },
}

export const ukLesson33 = {
 lessonId: "lesson-roblox-3-3",
 moduleId: "module-03",
 order: 3,
 title: "3.3 - Рахунок на екрані + leaderstats",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть лідерську статистику за допомогою Coins IntValue на PlayerAdded",
 "Збільшуйте монети зі скриптів отримання монет на сервері",
 "Дзеркальна оцінка в HUD ScreenGui за допомогою LocalScript",
 "Використовуйте GetPropertyChangedSignal для поточних оновлень інтерфейсу користувача",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Збирати монети весело. Бачити, як число **зростає**, викликає залежність.

**Хід уроку:**
1. **Теорія (40 хв)** - лідерська статистика + HUD
2. **Практика (~25 хв)** - живий рахунок на екрані та в списку вкладок
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 3.2 - Збирання монет**.`,
 },
 {
 title: "Що таке лідерська статистика?",
 content: `Roblox показує **таблицю лідерів** (клавіша Tab), коли гравці мають Folder з точною назвою\`leaderstats\`зі статистикою **IntValue** всередині.

| Child | Відображається як |
|-------|----------|
|\`Coins\`IntValue | Колонка монет |

**Сервер створює** лідерську статистику - клієнти не повинні підробляти результати (шахрайство).

**Вправа (2 хв):** Натисніть Tab у будь-якій популярній грі Roblox - зверніть увагу на стовпці Монети, Час, Очки.`,
 },
 {
 title: "PlayerAdded - створити статистику один раз",
 content: `**ServerScriptService** → новий **Script**\`LeaderstatsSetup\`:\`\`\`lua
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
 local leaderstats = Instance.new("Folder")
 leaderstats.Name = "leaderstats"
 leaderstats.Parent = player

 local coins = Instance.new("IntValue")
 coins.Name = "Coins"
 coins.Value = 0
 coins.Parent = leaderstats
end)
\`\`\`**Play** - список вкладок показує **Монети: 0** для вас.

**Чому ServerScriptService?** Запускається один раз на сервері під час запуску гри - ідеально підходить для налаштування.`,
 },
 {
 title: "Нагорода +1 за отримання монет",
 content: `Всередині вашої монети Скрипт, після\`collected = true\`:\`\`\`lua
local stats = player:FindFirstChild("leaderstats")
if stats then
 local coinsStat = stats:FindFirstChild("Coins")
 if coinsStat then
 coinsStat.Value += 1
 end
end
\`\`\`**\`+= 1\`** додає рівно один за кожне успішне підхоплення (усунення стрибків захищає це).

**Бонус рідкісна монета:**\`\`\`lua
if string.find(coin.Name, "Rare") then
 coinsStat.Value += 4 -- +5 total if you already added 1, or set +5 only
end
\`\`\`Оберіть чітке правило: рідкісні = **+5 всього** за підхоплення.`,
 },
 {
 title: "HUD монет - ScreenGui",
 content: `**StarterGui** →\`ScreenGui\` \`CoinsHUD\`→\`TextLabel\` \`CoinsLabel\`Стиль: верхній ліворуч, темний фон, **TextScaled**, текст\`Coins: 0\`**LocalScript** в\`CoinsHUD\`:\`\`\`lua
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local label = script.Parent:WaitForChild("CoinsLabel")

local function updateDisplay()
 local stats = player:FindFirstChild("leaderstats")
 if not stats then return end
 local coins = stats:WaitForChild("Coins")
 label.Text = "Coins: " .. coins.Value
end

player.ChildAdded:Connect(function(child)
 if child.Name == "leaderstats" then
 updateDisplay()
 child:WaitForChild("Coins"):GetPropertyChangedSignal("Value"):Connect(updateDisplay)
 end
end)

-- If leaderstats already exists (late join script fix):
if player:FindFirstChild("leaderstats") then
 updateDisplay()
 player.leaderstats.Coins:GetPropertyChangedSignal("Value"):Connect(updateDisplay)
end
\`\`\`**Вправа (10 хв.):** Зберіть 5 монет - HUD і список вкладок показують 5.`,
 },
 {
 title: "Час - WaitForChild",
 content: `Гонка скриптів на spawn:
- Монета торкнулась до того, як з’явилася статистика лідера → немає очок
- HUD завантажується перед статистикою лідера → помилка нуль

**Виправлення:**
-\`player:WaitForChild("leaderstats")\`у скрипті монет, якщо потрібно
- HUD слухає\`ChildAdded\`і\`GetPropertyChangedSignal\`**Тест:** Скинути Character (відродження) - вартість монет має **залишитися** (той самий сеанс).`,
 },
 {
 title: "Економіка надійного сервера",
 content: `| Робити на сервері | НЕ на клієнті для оцінки |
|-------------|------------------------------|
| Створити статистику лідерів | Підробка +9999 у LocalScript |
| Приріст монет | Довіряйте лише дотику клієнта |

Пізніші модулі додають **DataStore** для збереження монет між сеансами. Сьогодні = лише **оцінка під час сесії**.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Налаштування Leaderstats у ServerScriptService
- [ ] Скрипт Coin додає Coins IntValue
- [] CoinsHUD оновлюється під час збору
- [ ] Таблиця лідерів вкладки відповідає HUD
- [ ] Зберегти:\`Lesson 3.3 - Coins HUD\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "помилка в leaderstats (typo)",
 explanation: "Має бути точна назва інтерфейсу вкладки.",
 correctApproach: "Ім'я Folders leaderstats малим регістром, дочірні монети",
 },
 {
 mistake: "IntValue названо Coin, а не Coins",
 explanation: "Script шукає неправильну дитину.",
 correctApproach: "Збіг імен у всіх Scripts",
 },
 {
 mistake: "Клієнт додає монети",
 explanation: "Експлуататори можуть обманювати рахунки.",
 correctApproach: "Лише Script монети сервера збільшує значення",
 },
 {
 mistake: "HUD ніколи не оновлюється",
 explanation: "Немає зміненого сигналу.",
 correctApproach: "GetPropertyChangedSignal(\"Value\") на монетах",
 },
 ],
 summary: "Ви створили статистику лідерів за допомогою монет, збільшили кількість очок за результатами отримання сервером і створили CoinsHUD, який оновлюється в реальному часі - ваш симулятор тепер показує прогрес на екрані та в списку гравців.",
 practiceTask: {
 title: "Coins HUD - результати в реальному часі (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Пікап збільшує список вкладок + HUD.

### Part A - статистика лідерів (8 хв)
1.\`LeaderstatsSetup\`у ServerScriptService
2. Play - вкладка показує Монети: 0

### Part B - Знімання проводів (10 хв)
1. Додайте\`coinsStat.Value += 1\`до монетних скриптів (15+ монет)
2. Рідкісні монети +5, якщо ви створили їх у 3.1
3. Зберіть 10 - вкладка показує 10

### Part C - HUD (7 хв)
1.\`CoinsHUD\`+ Дзеркало LocalScript
2. Збирайте монети - мітки оновлюються миттєво
3. **Зберегти в Roblox** →\`Lesson 3.3 - Coins HUD\` 4. **Практика завершена**`,
 hints: [
 "Якщо HUD застряг на 0, перевірте наявність лідерських статистичних даних у Player not Workspace",
 "WaitForChild(\"Монети\") після того, як існує статистика лідера",
 "Сервер виводить (print) монети. Значення після отримання для перевірки приросту",
 ],
 optionalChallenge: "Друга характеристика IntValue «Дорогоцінні камені» лише для рідкісних монет.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Ім'я Folders leaderstats має бути...",
 options: [
 "точно leaderstats",
 "LeaderStats",
 "stats",
 "coins",
 ],
 correctAnswer: 0,
 explanation: "Roblox очікує точного написання.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Тип статистики монет:...",
 options: [
 "IntValue",
 "StringValue",
 "BoolValue",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Для цілих чисел використовується IntValue.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "PlayerAdded запускається, коли...",
 options: [
 "Гравець приєднується",
 "Монета торкається лави",
 "Кліки UI",
 "Малювання Terrain",
 ],
 correctAnswer: 0,
 explanation: "Налаштування виконується для кожного приєднаного гравця.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "монети. Значення += 1 має працювати на...",
 options: [
 "Server Script монети",
 "Лише LocalScript у HUD",
 "Чат клієнта",
 "Sky",
 ],
 correctAnswer: 0,
 explanation: "Сервер довіряє економіці.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "GetPropertyChangedSignal(\"Value\")...",
 options: [
 "Оновлює HUD при зміні Coins",
 "Видаляє гравця",
 "Додає Terrain",
 "Публікує",
 ],
 correctAnswer: 0,
 explanation: "Сигнал спрацьовує при зміні характеристик.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Клавіша Tab показує...",
 options: [
 "Таблиця лідерів з leaderstats",
 "Explorer",
 "Properties",
 "Toolbox",
 ],
 correctAnswer: 0,
 explanation: "Вкладка відкриває статистику списку гравців.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "CoinsHUD LocalScript належить до...",
 options: [
 "StarterGui",
 "Лава в Workspace",
 "Terrain",
 "Kill block",
 ],
 correctAnswer: 0,
 explanation: "Клони інтерфейсу користувача від StarterGui.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Усунення стрибків все ще має значення, тому що...",
 options: [
 "Запобігає подвійному збільшенню",
 "Змінює небо",
 "Прибирає obby",
 "Вимикає Tab",
 ],
 correctAnswer: 0,
 explanation: "Multiple Touched додасть забагато.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Між сесіями монети скидаються до...",
 options: [
 "DataStore у пізнішому уроці",
 "Лише збереження rbxl",
 "Зміна кольору",
 "Клавіша F",
 ],
 correctAnswer: 0,
 explanation: "Модуль 3.5 додає наполегливість.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 3.3 зберегти назву...",
 options: [
 "Lesson 3.3 - Coins HUD",
 "Collecting Coins",
 "Obby Ready",
 "Finish Grades",
 ],
 correctAnswer: 0,
 explanation: "Збережіть після роботи HUD.",
 },
 ],
 },
}

export const ukLesson34 = {
 lessonId: "lesson-roblox-3-4",
 moduleId: "module-03",
 order: 4,
 title: "3.4 - Функції",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Напишіть локальні функції з параметрами та значеннями, що повертаються",
 "Рефакторинг підбору монет у багаторазові допоміжні функції",
 "Використовуйте один серверний скрипт для всіх монет у папці",
 "Застосуйте шаблони іменування та раннього повернення",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `У вас є **30 Scripts**, які виконують те саме. Одна помилка = виправити 30 разів. **Функції** це виправляють.

**Хід уроку:**
1. **Теорія (40 хв)** - функції + один\`CoinService\`Script
2. **Практика (~25 хв)** - рефактор пікапів
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 3.3 - HUD монет**. Ви **видалите** повторювані Scripts монет і заміните **одним** організованим скриптом.`,
 },
 {
 title: "Чому існують функції",
 content: `| Без функцій | З функціями |
|------------------|----------------|
| Копіювати-вставляти 30 блоків | Напиши один раз, подзвони багато разів |
| Виправити помилку в 30 файлах | Виправити помилку в одній функції |
| Важко читати | Очистити кроки: підтвердити → нагородити → приховати |

**Справжні студії** використовують функції скрізь - ви засвоюєте професійні звички рано.`,
 },
 {
 title: "Синтаксис функції мовою Луау",
 content: `\`\`\`lua
local function add(a, b)
 return a + b
end

local total = add(3, 5) -- 8
\`\`\`**Parts:**
-\`local function name(...)\`- визначає функцію
-\`return\`- повертає значення (необов'язково)
- Подзвонити с\`name(arguments)\`

\`\`\`lua
local function sayHello(playerName)
 print("Hello, " .. playerName)
end

sayHello("Alex")
\`\`\`**Вправа (5 хв):** Зробіть\`double(n)\`що повертає n * 2. Вивести\`double(10)\`у Output.`,
 },
 {
 title: "нагородні монети (гравець, сума)",
 content: `\`\`\`lua
local function awardCoins(player, amount)
 local stats = player:FindFirstChild("leaderstats")
 if not stats then
 return
 end

 local coinsStat = stats:FindFirstChild("Coins")
 if not coinsStat then
 return
 end

 coinsStat.Value += amount
end
\`\`\`**Дострокове повернення**, коли чогось не вистачає - уникає вкладених\`if\`безлад.

Телефонуйте:\`awardCoins(player, 1)\`для загального,\`awardCoins(player, 5)\`для рідкісних.`,
 },
 {
 title: "getCoinValue(coinName)",
 content: `\`\`\`lua
local function getCoinValue(coinName)
 if string.find(coinName, "Rare") then
 return 5
 end
 return 1
end
\`\`\`

\`string.find\`повертає позицію, якщо в назві є "Рідкісні" -\`CoinRare_03\`дає 5.

**Вправа (3 хв):** Передбачте значення для\`Coin_001\`і\`CoinRare_01\`.`,
 },
 {
 title: "hideCoin(coin) і resetCoin(coin)",
 content: `\`\`\`lua
local function hideCoin(coin)
 coin.Transparency = 1
 coin.CanCollide = false
end

local function resetCoin(coin, collectedFlags)
 task.delay(15, function()
 collectedFlags[coin] = nil
 coin.Transparency = 0
 end)
end
\`\`\`Використовуйте **таблицю**\`collectedFlags = {}\`з ключем coin замість однієї змінної на Script:\`\`\`lua
if collectedFlags[coin] then return end
collectedFlags[coin] = true
\`\`\``,
 },
 {
 title: "Один скрипт для всіх монет",
 content: `**ServerScriptService** → Script\`CoinCollector\`:\`\`\`lua
local Players = game:GetService("Players")
local coinsFolder = workspace:WaitForChild("Coins")
local collectedFlags = {}

local function getPlayerFromHit(hit)
 local character = hit.Parent
 if not character then return nil end
 local humanoid = character:FindFirstChildOfClass("Humanoid")
 if not humanoid then return nil end
 return Players:GetPlayerFromCharacter(character)
end

-- awardCoins, getCoinValue, hideCoin here ...

local function connectCoin(coin)
 coin.Touched:Connect(function(hit)
 if collectedFlags[coin] then return end
 local player = getPlayerFromHit(hit)
 if not player then return end

 collectedFlags[coin] = true
 hideCoin(coin)
 awardCoins(player, getCoinValue(coin.Name))
 end)
end

for _, Folder in coinsFolder:GetChildren() do
 if folder:IsA("Folder") then
 for _, coin in folder:GetDescendants() do
 if coin:IsA("BasePart") and coin.Name:find("Coin") then
 connectCoin(coin)
 end
 end
 end
end
\`\`\`**Delete** старі coin Scripts після того, як це спрацює.`,
 },
 {
 title: "formatCoins для інтерфейсу користувача (необов'язково)",
 content: `\`\`\`lua
local function formatCoins(value)
 if value >= 1000 then
 return string.format("%d Coins", value)
 end
 return "Coins: " .. value
end
\`\`\`Використовуйте в HUD пізніше для тексту в стилі **1250 монет**.

**Контрольний список перед тренуваннями:**
- [ ] CoinCollector у ServerScriptService
- [ ] Скрипти монет вилучено (без подвійних нагород)
- [ ] Збирайте звичайні + рідкісні - правильні суми
- [ ] Зберегти:\`Lesson 3.4 - Coin Functions\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Залишено старі скрипти І новий CoinCollector",
 explanation: "Подвійний пікап і подвійні монети.",
 correctApproach: "Вимкніть або видаліть Scripts для кожної монети після тестування нового",
 },
 {
 mistake: "Забули повернення в нагородних монетах",
 explanation: "Код провалюється та помилки.",
 correctApproach: "Раннє повернення, коли відсутні характеристики лідера",
 },
 {
 mistake: "ConnectedFlags використовує лише рядок назви монети",
 explanation: "Дві монети з однаковими назвами конфліктували б.",
 correctApproach: "Використовуйте collectedFlags[coin] із екземпляром монети як ключем",
 },
 {
 mistake: "Функції, визначені після їх виклику",
 explanation: "Локальні функції повинні існувати перед використанням у тому самому Scripts.",
 correctApproach: "Розмістіть допоміжні функції у верхній Script у CoinCollector",
 },
 ],
 summary: "Ви написали багаторазові функції для нагородження, приховування та оцінки монет, а потім замінили десятки дублікатів Scripts одним CoinCollector - масштабованою архітектурою симулятора.",
 practiceTask: {
 title: "Рефакторинг функцій монет (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Один серверний скрипт обробляє всі монети за допомогою функцій.

### Part A - Помічники (10 хв)
1. Творити\`CoinCollector\`у ServerScriptService
2. Додайте\`awardCoins\`,\`getCoinValue\`,\`hideCoin\`,\`getPlayerFromHit\`### Part B - З'єднайте всі монети (10 хв)
1. Петля\`Workspace.Coins\`Folders - з'єднати кожну монету Part
2. Видаліть/вимкніть старі скрипти в монетах
3. Перевірте 10 звукознімачів - правильний Tab + HUD

### Part C - Зберегти (5 хв)
1. Додатково\`formatCoins\`для HUD
2. **Зберегти в Roblox** →\`Lesson 3.4 - Coin Functions\` 3. **Практика завершена**`,
 hints: [
 "Перевірте одну монету, перш ніж зациклювати всі - швидше налагодження",
 "Виведіть getCoinValue(coin.Name) один раз, щоб перевірити, що rare = 5",
 "Якщо нічого не відбувається, перевірте, чи шлях до Folders coins відповідає Explorer",
 ],
 optionalChallenge: "Додайте відродження resetCoin лише для Folders Common.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Функції допомагають...",
 options: [
 "Повторне використання логіки в одному місці",
 "Видалення UI",
 "Прибирання Terrain",
 "Блокування Tab",
 ],
 correctAnswer: 0,
 explanation: "СУХИЙ - не повторюйся.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "повернення у функції...",
 options: [
 "Повертає значення викликачу",
 "Видаляє гравця",
 "Публікує гру",
 "Робить Parts Anchored",
 ],
 correctAnswer: 0,
 explanation: "повернення виходів із необов’язковим значенням.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "awardCoins(player, 5) додає...",
 options: [
 "5 до статистики Coins",
 "5 Parts",
 "5 Scripts",
 "5 Terrain",
 ],
 correctAnswer: 0,
 explanation: "Другий аргумент - сума.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Раннє повернення, коли статистика відсутня...",
 options: [
 "Безпечно зупиняє функцію",
 "Додає 1000 монет",
 "Відкриває VictoryGui",
 "Створює лаву",
 ],
 correctAnswer: 0,
 explanation: "Охоронні положення запобігають помилкам.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "collectedFlags[coin] використовує...",
 options: [
 "Екземпляр монети як ключ таблиці",
 "Лише ім’я гравця",
 "Колір неба",
 "ClockTime",
 ],
 correctAnswer: 0,
 explanation: "Ключі екземплярів відстежують кожну монету.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "getCoinValue перевіряє назву для...",
 options: [
 "Підрядок \"Rare\"",
 "Вік гравця",
 "Terrain",
 "Spawn",
 ],
 correctAnswer: 0,
 explanation: "Рідкість у назві викликає вищу цінність.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "CoinCollector повинен жити в...",
 options: [
 "ServerScriptService",
 "Лише StarterGui",
 "Player Head",
 "Lighting",
 ],
 correctAnswer: 0,
 explanation: "Сервер справляється з економією.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Після рефакторингу Scripts для кожної монети мають бути...",
 options: [
 "Видалені, щоб уникнути подвійної нагороди",
 "Дубльовані 30 разів",
 "Лише LocalScripts",
 "У Terrain",
 ],
 correctAnswer: 0,
 explanation: "Один Script замінює багато.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Назви дієслівних функцій, наприклад hideCoin...",
 options: [
 "Читаються як дії",
 "Ховають код назавжди",
 "Прибирають Humanoid",
 "Вимикають збереження",
 ],
 correctAnswer: 0,
 explanation: "Чіткі імена є стандартом студії.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 3.4 зберегти назву...",
 options: [
 "Lesson 3.4 - Coin Functions",
 "Coins HUD",
 "Obby Ready",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Збережіть після роботи рефактору.",
 },
 ],
 },
}

export const ukLesson35 = {
 lessonId: "lesson-roblox-3-5",
 moduleId: "module-03",
 order: 5,
 title: "3.5 - DataStore: пам'ять між сесіями",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Зрозумійте DataStoreService для збереження даних гравців",
 "Завантажуйте монети під час приєднання та економте під час відпустки за допомогою pcall",
 "Інтегруйте збережені дані з вартістю монет Leaderstats",
 "Обробляйте помилки API без збою гри",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `До цього моменту вихід із гри **стирав** ваші монети. **DataStore** запам’ятовує гравців між сесіями.

**Хід уроку:**
1. **Теорія (40 хв)** - завантажити/зберегти за допомогою pcall
2. **Практика (~25 хв)** - постійні монети
3. **Вікторина (10 хв)** - проходження **70%**

**Важливо:** Увімкніть **Налаштування гри → Безпека → Увімкнути Studio Access to API Services** для тестів DataStore у Studio.`,
 },
 {
 title: "Що робить DataStore",
 content: `| Лише сеанс (перед) | З DataStore |
|-----------------------|----------------|
| Вийти → Монети = 0 | Вийти → Монети збережено |
| Немає відчуття прогресування | Реальне утримання тренажера |

Ключем даних є **UserId** (унікальний для кожного облікового запису Roblox).

**Ви не можете** перевірити реальні збереження лише в Edit — використовуйте **Play** з увімкненим API або **Publish** для тесту в live.`,
 },
 {
 title: "Створіть DataStore",
 content: `**ServerScriptService** → Script\`CoinDataStore\`(або об’єднати в налаштування Leaderstats):\`\`\`lua
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

local coinStore = DataStoreService:GetDataStore("CoinProgress_v1")
\`\`\`**Суфікс версії\`_v1\`:** якщо ви зміните формат збереження пізніше, створіть\`CoinProgress_v2\`без пошкодження старих даних.

**Ніколи** не зберігайте паролі чи особисту інформацію - враховується лише статистика гри, як-от монети.`,
 },
 {
 title: "loadCoins з pcall",
 content: `\`\`\`lua
local function loadCoins(player)
 local success, data = pcall(function()
 return coinStore:GetAsync(player.UserId)
 end)

 if success and typeof(data) == "number" then
 return data
 end

 if not success then
 warn("Load failed for " .. player.Name)
 end

 return 0
end
\`\`\`**\`pcall\`** безпечно запускає ризикований код - якщо Roblox API дає збій, гра продовжує працювати замість збою.

**Вправа (5 хв):** Друкувати результат завантаження у виводі, коли гравець приєднується.`,
 },
 {
 title: "saveCoins за допомогою pcall",
 content: `\`\`\`lua
local function saveCoins(player, amount)
 local success, err = pcall(function()
 coinStore:SetAsync(player.UserId, amount)
 end)

 if not success then
 warn("Save failed for " .. player.Name .. ": " .. tostring(err))
 end
end
\`\`\`**Коли зберігати:**
-\`Players.PlayerRemoving\`- гравець йде
- Додатково: автозбереження кожні 60 секунд (додатково)

**Не** зберігайте кожну окрему монету - занадто багато викликів API. Збережіть **кінцеву суму** під час відпустки.`,
 },
 {
 title: "Провід PlayerAdded і PlayerRemoving",
 content: `\`\`\`lua
Players.PlayerAdded:Connect(function(player)
 local leaderstats = Instance.new("Folder")
 leaderstats.Name = "leaderstats"
 leaderstats.Parent = player

 local coins = Instance.new("IntValue")
 coins.Name = "Coins"
 coins.Parent = leaderstats

 local saved = loadCoins(player)
 coins.Value = saved
end)

Players.PlayerRemoving:Connect(function(player)
 local stats = player:FindFirstChild("leaderstats")
 if stats then
 local coins = stats:FindFirstChild("Coins")
 if coins then
 saveCoins(player, coins.Value)
 end
 end
end)
\`\`\`**Об’єднайте** з існуючими налаштуваннями LeaderstatsSetup - один Script володіє приєднанням/виходом.`,
 },
 {
 title: "Перевірте стійкість правильно",
 content: `**Кроки тесту:**
1. Увімкніть служби API у налаштуваннях Studio
2. **Play** (F5) - зібрати **20** монет
3. **Stop** Play (гравець виходить → зберегти вогонь)
4. **Зіграйте** знову - монет має бути **20**

**Якщо завжди 0:**
- API не ввімкнено
- pcall failing - читання жовтих попереджень у вихідних даних
- Збереження в сеансі «Редагувати без відтворення».

**Тест публікації:** справжнім гравцям потрібне опубліковане місце для Live DataStore (Studio працює з прапорцем API).`,
 },
 {
 title: "Правила техніки безпеки",
 content: `- Ніколи не довіряйте **клієнту**, щоб надіслати "Я маю 9999 монет" - сервер уже володіє лідерською статистикою
- Використовуйте\`pcall\`на GetAsync і SetAsync
- Зберігайте дані **маленькими** (числа, короткі таблиці) - великі збереження не вдаються
- Існують обмеження швидкості - не спаміть SetAsync у циклах

**Контрольний список перед тренуваннями:**
- [ ] Служби API увімкнено
- [ ] завантаження під час приєднання, збереження під час відпустки
- [ ] Тест Stop/Play показує відновлені монети
- [ ] Зберегти:\`Lesson 3.5 - Saved Coins\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "DataStore в LocalScript",
 explanation: "Клієнти не можуть зберігати надійні глобальні дані.",
 correctApproach: "Лише ServerScriptService",
 },
 {
 mistake: "Немає pcall - помилки Script в API",
 explanation: "Тимчасові проблеми Roblox з аварійною економікою.",
 correctApproach: "Загорніть GetAsync/SetAsync у pcall",
 },
 {
 mistake: "Очікуйте збереження в режимі редагування без відтворення",
 explanation: "PlayerRemoving ніколи не запускається.",
 correctApproach: "Перевірте за допомогою «Відтворення», а потім «Стоп».",
 },
 {
 mistake: "Економте на кожному торканні монети",
 explanation: "Переступає межі швидкості, затримка.",
 correctApproach: "Заощадити на PlayerRemoving",
 },
 ],
 summary: "Ви використовували DataStoreService з pcall для завантаження монет, коли гравці приєднуються, і збереження, коли вони виходять, інтегровано зі статистикою лідерів - ваш симулятор тепер запам’ятовує прогрес між сесіями.",
 practiceTask: {
 title: "Постійні монети (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Монети вижили Зупинити → Play знову.

### Part A - Script DataStore (12 хв)
1.\`CoinDataStore\`за допомогою GetDataStore\`CoinProgress_v1\` 2.\`loadCoins\`/\`saveCoins\`з pcall
3. Увімкніть служби API Studio

### Part B - Приєднатися / вийти (8 хв)
1. PlayerAdded: leaderstats +\`coins.Value = loadCoins(player)\` 2. Видалення гравця:\`saveCoins(player, coins.Value)\` 3. Об’єднайтеся з CoinCollector / Leaderstats - немає дублікатів PlayerAdded

### Part C - Тест на стійкість (5 хв)
1. Грайте - заробіть 25+ монет - Стоп
2. Грайте знову - все ще 25+
3. **Зберегти в Roblox** →\`Lesson 3.5 - Saved Coins\` 4. **Практика завершена**`,
 hints: [
 "Жовте попередження у вихідних даних = прочитайте повідомлення про помилку pcall",
 "Ключ UserId автоматичний - не використовуйте player.Name як ключ",
 "Зупиніть відтворення, щоб запустити збереження перед повторним тестуванням",
 ],
 optionalChallenge: "Також збережіть BestCoins у тому ж DataStore як таблицю {coins=, best=}.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "DataStore зберігає дані...",
 options: [
 "Між сесіями Play",
 "Лише в одну хвилину Play",
 "У кольорі Part",
 "У LocalScript UI",
 ],
 correctAnswer: 0,
 explanation: "Зберігається після виходу гравця.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Ключ даних гравця зазвичай...",
 options: [
 "player.UserId",
 "лише player.Name",
 "Part.Name",
 "ClockTime",
 ],
 correctAnswer: 0,
 explanation: "UserId унікальний і стабільний.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "pcall захищає від...",
 options: [
 "Помилки API, що ламають Script",
 "Смерть від лави",
 "Колір UI",
 "Малювання Terrain",
 ],
 correctAnswer: 0,
 explanation: "pcall безпечно виявляє збої.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "GetAsync завантажує...",
 options: [
 "Збережені дані при приєднанні гравця",
 "Skybox",
 "Усі Scripts",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Завантажити шаблон з’єднання.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "SetAsync має запускатися, коли...",
 options: [
 "Гравець виходить (PlayerRemoving)",
 "Кожен кадр",
 "Лише в лобі",
 "Ніколи",
 ],
 correctAnswer: 0,
 explanation: "Економія у відпустці є стандартною.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Назви CoinProgress_v1 допомагають...",
 options: [
 "Майбутні міграції даних",
 "Видаляє гравців",
 "Прибирає UI",
 "Вимикає звук",
 ],
 correctAnswer: 0,
 explanation: "Версійні назви магазинів.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Studio DataStore потребує...",
 options: [
 "Увімкнути API Services",
 "Видалити Workspace",
 "Лише LocalScript",
 "Без leaderstats",
 ],
 correctAnswer: 0,
 explanation: "Потрібне налаштування безпеки.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Загальна кількість довірених монет триває...",
 options: [
 "Server leaderstats",
 "Лише TextLabel клієнта",
 "Повідомлення в чаті",
 "Decal",
 ],
 correctAnswer: 0,
 explanation: "Сервер володіє економікою.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Збереження кожні 0,1 секунди - це...",
 options: [
 "Погано — ліміти швидкості",
 "Обов’язково",
 "Як ніколи не зберігати",
 "Лише UI",
 ],
 correctAnswer: 0,
 explanation: "Забагато викликів API.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 3.5 зберегти назву...",
 options: [
 "Lesson 3.5 - Saved Coins",
 "Coin Functions",
 "Obby Ready",
 "Victory Screen",
 ],
 correctAnswer: 0,
 explanation: "Зберегти після тесту стійкості.",
 },
 ],
 },
}

export const ukLesson36 = {
 lessonId: "lesson-roblox-3-6",
 moduleId: "module-03",
 order: 6,
 title: "3.6 - Checkpoint: Симулятор монет",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Надішліть повний симулятор монет із картою, колекцією, інтерфейсом користувача, функціями та збереженням",
 "Виконайте тестову матрицю для чотирьох гравців",
 "Полірований відгук і адаптація на spawn",
 "Підготуйтеся до модуля 4 Tycoon Systems",
 ],
 theory: {
 sections: [
 {
 title: "Контрольна точка модуля 3 (близько 40 хвилин)",
 content: `Ви надсилаєте **Coin Simulator** - ігровий фрагмент, який гравці розуміють за **10 секунд**:

**"Збирайте монети. Кількість зростає. Повернеться завтра, але збереже."**

**Потрібні системи:**
- Карта 30+ монет (3.1)
- CoinCollector + функції (3.4)
- лідерська статистика + CoinsHUD (3.3)
- Збереження/завантаження DataStore (3.5)`,
 },
 {
 title: "60-хвилинний спринт",
 content: `| Фаза | Мін | Завдання |
|-------|-----|------|
| 1 | 10 | Очищення дослідника, знак появи |
| 2 | 15 | CoinCollector + відсутність дублікатів скриптів |
| 3 | 15 | Тест виходу/повторного приєднання DataStore |
| 4 | 10 | Звук + полірування HUD |
| 5 | 10 | QA матриця + виправлення помилок |

**Цільові folders:**\`Workspace/Coins/\`,\`ServerScriptService/\`(CoinCollector, CoinDataStore),\`StarterGui/CoinsHUD\``,
 },
 {
 title: "Реєстрація на борту",
 content: `Під час появи гравець протягом 3 секунд бачить:
- **Знак:**\`Collect coins - explore the island!\`- **Видимий слід монети** до першої зони
- **CoinsHUD** вгорі зліва:\`Coins: 0\`**Необов’язково:** Parts стрілок, що вказують на щільну зону монет.

Без «стіни тексту» в туторіалі - показуй, не розповідай.`,
 },
 {
 title: "Тестова матриця QA (обов’язково)",
 content: `| # | Тест | Пас? |
|---|------|-------|
| 1 | Зберіть 10 швидко - HUD + Tab = 10 | |
| 2 | Стійте на одній монеті 3s - усе ще лише +1 | |
| 3 | Рідкісна монета дає +5 (якщо побудована) | |
| 4 | Зупиніть гру на 30 монетах, зіграйте знову - все ще 30 | |
| 5 | Результат: немає червоних помилок під час чистого запуску | |

**Мультиплеер (якщо можливо):** два гравці - монети не перетинаються між обліковими записами.`,
 },
 {
 title: "Відчуйте себе як гра",
 content: `- **Sound** підхоплення на CoinCollector (один звук, грати за нагородою)
- **PointLight** на монетах (з 3.1)
- Принаймні **60 секунд** вмісту маршруту монет
- **Без** розбитих плаваючих монет всередині Terrain

**Мінімальна карта:** збережіть центр острова + монетні зони - необов'язковий бічний шлях.`,
 },
 {
 title: "Контрольний список архітектури",
 content: `- [ ] **One** CoinCollector - жодних скриптів в окремих монетах
- [ ] **Один** шлях Script приєднання (лідерська статистика + завантаження)
- [ ] **Один** збереження на PlayerRemoving
- [ ] CoinsHUD використовує GetPropertyChangedSignal
- [ ] Name сховища даних\`CoinProgress_v1\`Майбутній модуль 4 додає **змови магнатів** - ваш код монети залишається в ServerScriptService.`,
 },
 {
 title: "Демонстраційний Script (2 хвилини)",
 content: `Показати вчителю/батькам:
1. Спаун - читайте знак, див. HUD
2. Зберіть 5 монет - кількість зростає + звук
3. Клавіша Tab - збіги таблиці лідерів
4. Stop and Play - монети відновлені
5. Скажіть: «DataStore зберігає UserId, тому прогрес повертається»

**Зберегти:**\`Module 3 - Coin Simulator\``,
 },
 {
 title: "Попередній перегляд модуля 4",
 content: `Ігри **Tycoon** = монети **автоматично** з дропперів + купуйте оновлення + власний сюжет.

Ви вже знаєте:
- Серверна економіка
- Лічильники інтерфейсу користувача
- Збереження прогресу

Модуль 4 перетворює пасивний дохід у бізнес-симулятор на вашому острові.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Дубльований програвач, доданий у двох Scripts",
 explanation: "Подвійна лідерська статистика або неправильний порядок завантаження.",
 correctApproach: "Єдиний скрипт об’єднує: статистика + завантаження + підключення монет",
 },
 {
 mistake: "Стійкість не перевірялася за допомогою Stop",
 explanation: "Мислення про збереження у файл зберігає DataStore.",
 correctApproach: "Зупинка відтворення запускає збереження PlayerRemoving",
 },
 {
 mistake: "На карті лише 5 монет",
 explanation: "Не схоже на симулятор.",
 correctApproach: "Збережіть 30+ з уроку 3.1 або додайте більше",
 },
 {
 mistake: "Немає відгуків про отримання",
 explanation: "Збирати нудно.",
 correctApproach: "Звук + сховати монету + галочка HUD",
 },
 ],
 summary: "Ви надіслали Coin Simulator із organized Scripts, живим HUD, збором даних на основі функцій, стійкістю DataStore та пройшли тести QA. Далі почнеться створення магната за модулем 4.",
 practiceTask: {
 title: "Здайте Coin Simulator (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** Пройти всі 5 тестів якості + демо-готове місце.

### Part A - Очищення (10 хв)
1. Folders + імена; видалити помилкові Scripts
2. Видно знак spawn + слід монети
3. Лише CoinCollector - видалення Scripts для кожної монети

### Part B - Системи (15 хв)
1. leaderstats + завантажити/зберегти DataStore
2. CoinsHUD live
3. Звук підйому на шляху нагородних монет

### Part C - ЗК та збереження (15 хв)
1. Заповніть тестову матрицю 1-5
2. Виправте будь-яку помилку, перш ніж позначити її як виконану
3. **Зберегти в Roblox** →\`Module 3 - Coin Simulator\` 4. **Практика завершена** + додатковий 2-хвилинний запис

**Погляд вперед:** у наступному уроці (3.7) ви додасте **щоденну ціль** зі шкалою прогресу над цим фундаментом - переконайтеся, що CoinCollector і функції з 3.4 залишаються чистими та однокопійними, це стане основою для нового проєкту.`,
hints: [
"Виправте подвійне нагородження перед тестуванням збереження - неправильний підрахунок зберігає неправильні дані",
"Служби API мають залишатися ввімкненими для DataStore",
"Запустіть тест 4 останнім - підтверджує роботу всього модуля",
"Чисті, повторно використовувані функції (3.4) стануть основою для GoalProgress-логіки в уроці 3.7",
],
optionalChallenge: "Бустерна панель: подвійні монети протягом 20 секунд після дотику. Це гарна підготовка до варіантів монет і spend sink у 3.8.",
},
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "checkpoint Coin Simulator потребує...",
 options: [
 "Карта + збір + HUD + збереження",
 "Лише Terrain",
 "Лише таймер obby",
 "Без Scripts",
 ],
 correctAnswer: 0,
 explanation: "Усі системи модуля 3 разом.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Тест 2 підтверджує...",
 options: [
 "Debounce досі працює",
 "Колір неба",
 "Лише Terrain",
 "Публікація",
 ],
 correctAnswer: 0,
 explanation: "Stand-on-coin не повинен спамити +",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Тест 4 підтверджує...",
 options: [
 "Стійкість DataStore",
 "Material Neon",
 "Блоки вбивства",
 "VictoryGui",
 ],
 correctAnswer: 0,
 explanation: "Stop/Play відновлює монети.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "CoinCollector має бути...",
 options: [
 "Єдиний Script збору",
 "Один із 30 дубльованих Scripts",
 "Script чату клієнта",
 "Інструмент Terrain",
 ],
 correctAnswer: 0,
 explanation: "Колектор єдиного сервера.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Зберегти використання ключа...",
 options: [
 "player.UserId",
 "Лише відображуване ім’я гравця",
 "Name Part монети",
 "Випадкове",
 ],
 correctAnswer: 0,
 explanation: "UserId є унікальним для кожного облікового запису.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Тема модуля 4...",
 options: [
 "Tycoon / пасивний дохід",
 "Лише публікація",
 "Лише машини",
 "Порожньо",
 ],
 correctAnswer: 0,
 explanation: "Tycoon будує систему монет.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Потрібна адаптація на spawn...",
 options: [
 "Чітка мета + видима перша монета",
 "Без монет",
 "Прихований UI",
 "Лише лава",
 ],
 correctAnswer: 0,
 explanation: "Гравці потребують негайного керівництва.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Червоний вихід під час чистого запуску означає...",
 options: [
 "Виправити перед релізом",
 "Ідеально",
 "Додати більше лави",
 "Видалити DataStore",
 ],
 correctAnswer: 0,
 explanation: "Помилки = помилки залишаються.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Рідкісні монети повинні нагороджувати...",
 options: [
 "Більше за звичайні (+5)",
 "Нуль",
 "Видалити збереження",
 "Прибрати HUD",
 ],
 correctAnswer: 0,
 explanation: "Рідкісне = більше значення, якщо реалізовано.",
 },
{
id: "q10",
type: "multiple_choice",
question: "Останній модуль 3 зберегти назву...",
options: [
"Module 3 - Coin Simulator",
"Lesson 2.1",
"Untitled",
"Click Magic",
],
correctAnswer: 0,
explanation: "Name портфоліо Checkpoint.",
},
],
},
}

export const ukLesson37 = {
lessonId: "lesson-roblox-3-7",
moduleId: "module-03",
order: 7,
title: "3.7 - Проєкт: Симулятор «Ціль дня»",
theoryMinutes: 40,
quizMinutes: 10,
estimatedTime: 50,
learningObjectives: [
"Спроєктуйте систему щоденної цілі зі шкалою прогресу",
"Побудуйте індикатор прогресу через Frame Size, керований функцією",
"Виявляйте завершення цілі та показуйте святкове повідомлення",
"Зберігайте прогрес цілі через DataStore разом із монетами",
"Повторно використовуйте функції з уроку 3.4 для чистої архітектури",
],
theory: {
sections: [
{
title: "Ваш сьогоднішній проєкт (приблизно 40 хвилин)",
content: `Це - **великий будівельний проєкт** Модуля 3. Ви поєднуєте монети (3.1-3.2), лідерську статистику (3.3), функції (3.4) і DataStore (3.5) в один **симулятор із щоденною метою**.

**Хід уроку:**
1. **Теорія (40 хв)** - план мети + шкала прогресу + збереження
2. **Практика (~35 хв)** - повний симулятор "Ціль дня"
3. **Вікторина (10 хв)** - **70%** потрібно пройти

Відкрийте **Урок 3.6 - Coin Simulator**. Сьогодні ви додаєте **мету**, яка перетворює просте збирання на гру з прогресом.`,
},
{
title: "Концепція: щоденна ціль",
content: `**Ідея:** гравець бачить мету "Зібрати 50 монет" і шкалу прогресу, яка заповнюється в реальному часі.

| Без мети | З метою |
|----------|---------|
| "Просто збираю монети" | "Мені залишилось 12 монет до нагороди!" |
| Немає чіткого фінішу | Ясна, коротка ціль на сесію |
| Гравець йде, коли захоче | Гравець хоче **завершити** ціль |

**Для цього уроку:** "щоденна" - це тема гри. Справжній щоденний таймер (з датами) - складна тема поза межами курсу; ми симулюємо цю ідею кнопкою "Новий день".`,
},
{
title: "Архітектура мети - конфігурація",
content: `**ServerScriptService** → всередині вашого\`CoinCollector\`або нового Script\`DailyGoalService\`:

\`\`\`lua
local DAILY_GOAL = 50 -- coins needed to complete today's goal
\`\`\`

На гравцеві додайте **IntValue**\`GoalProgress\`(окремо від\`leaderstats.Coins\`- мета може відрізнятись від загальної суми монет, якщо ви захочете скидати її).

**Простий підхід для цього уроку:** GoalProgress **дублює** значення Coins під час сесії - легше і надійніше для початківців.`,
},
{
title: "Функція updateGoalProgress",
content: `Використовуйте стиль функцій із уроку 3.4:

\`\`\`lua
local function getGoalPercent(current, goal)
local percent = current / goal
if percent > 1 then
percent = 1
end
return percent
end
\`\`\`

**Викличте** цю функцію кожного разу, коли монета зібрана, замість того, щоб рахувати відсоток "на льоту" у кожному місці коду - той самий принцип "напиши раз, використовуй багато разів".`,
},
{
title: "Шкала прогресу - Frame Size без TweenService",
content: `**StarterGui** →\`ScreenGui\` \`GoalUI\`:
\`\`\`
GoalUI/
 GoalFrame (Size 0,300 x 0,30, фон темний)
   GoalBar (Size 0,0 x 1,0, BackgroundColor яскравий, всередині GoalFrame)
   GoalLabel (TextLabel над баром: "Coins: 0 / 50")
\`\`\`

**LocalScript** оновлює бар без анімації (TweenService приходить у Модулі 5):

\`\`\`lua
local function updateBar(percent)
goalBar.Size = UDim2.new(percent, 0, 1, 0)
end
\`\`\`

**Вправа (10 хв):** Побудуйте GoalUI і перевірте, що бар росте зі збором монет.`,
},
{
title: "Виявлення завершення цілі",
content: `Коли\`coins.Value >= DAILY_GOAL\`, покажіть **святкове повідомлення** (той самий шаблон VictoryGui з уроку 2.5):

\`\`\`lua
coins:GetPropertyChangedSignal("Value"):Connect(function()
local percent = getGoalPercent(coins.Value, DAILY_GOAL)
updateBar(percent)

if coins.Value >= DAILY_GOAL and not goalCelebrated then
goalCelebrated = true
goalLabel.Text = "Daily Goal Complete!"
end
end)
\`\`\`

**Прапор\`goalCelebrated\`** (той самий трюк debounce, що й у монетах) не дає повідомленню з'являтися знову і знову.`,
},
{
title: "Кнопка \"Новий день\" - симуляція скидання",
content: `Оскільки справжні дати складні, додайте **Part**\`NewDayButton\`+ ClickDetector (шаблон з 1.4):

\`\`\`lua
detector.MouseClick:Connect(function(player)
local stats = player:FindFirstChild("leaderstats")
local coins = stats and stats:FindFirstChild("Coins")
if coins then
-- Reset only goal tracking coins stay for the collection total
goalCelebrated = false
updateBar(0)
end
end)
\`\`\`

**Пояснення для гравця:** знак поруч\`"Press to start a new goal day!"\`.`,
},
{
title: "Збереження прогресу цілі через DataStore",
content: `Використовуйте pcall-шаблон з уроку 3.5. Зберігайте **прогрес монет** так само, як раніше - мета обчислюється з нього при завантаженні:

\`\`\`lua
Players.PlayerAdded:Connect(function(player)
local saved = loadCoins(player) -- from lesson 3.5
coins.Value = saved
updateBar(getGoalPercent(saved, DAILY_GOAL))
end)
\`\`\`

**Тест:** зберіть 30/50 монет, Stop, Play знову - шкала має показати **30/50**, а не 0/50.`,
},
{
title: "Контрольний список перед практикою",
content: `- [ ] DAILY_GOAL визначено в одному місці (константа)
- [ ] Шкала прогресу росте разом зі збором монет
- [ ] Святкове повідомлення з'являється рівно один раз при досягненні цілі
- [ ] NewDayButton коректно скидає прогрес-бар
- [ ] Прогрес виживає Stop → Play (DataStore)`,
},
],
},
commonMistakes: [
{
mistake: "Відсоток бару рахується без обмеження на 100%",
explanation: "Зібравши більше монет, ніж потрібно, бар \"переповнюється\" за межі рамки.",
correctApproach: "Обмежте percent максимумом 1 у функції getGoalPercent",
},
{
mistake: "Святкове повідомлення показується щоразу при кожному +1 монети після цілі",
explanation: "Немає прапора debounce.",
correctApproach: "Використовуйте goalCelebrated = true, як робили з монетами",
},
{
mistake: "GoalUI Script на сервері замість LocalScript",
explanation: "Оновлення персонального інтерфейсу мають бути на клієнті.",
correctApproach: "LocalScript всередині GoalUI у StarterGui",
},
{
mistake: "DAILY_GOAL написано в кількох місцях з різними числами",
explanation: "UI і логіка розходяться.",
correctApproach: "Одна константа, використана всюди",
},
],
summary: "Ви побудували симулятор із щоденною метою, шкалою прогресу без анімації, святковим повідомленням при завершенні та збереженням прогресу через DataStore - проєкт, що об'єднує функції, лідерську статистику та збереження даних Модуля 3.",
practiceTask: {
title: "Симулятор «Ціль дня» - великий проєкт (~35 хв)",
difficulty: "beginner",
description: `**Мета:** Робоча щоденна ціль зі шкалою прогресу і збереженням.

### Part A - Конфігурація і функції (10 хв)
1. Визначте\`DAILY_GOAL = 50\` 2. Напишіть\`getGoalPercent(current, goal)\`

### Part B - Інтерфейс шкали (12 хв)
1. Побудуйте\`GoalUI\`з\`GoalFrame\`,\`GoalBar\`,\`GoalLabel\` 2. LocalScript оновлює бар при зміні Coins

### Part C - Завершення і скидання (10 хв)
1. Святкове повідомлення при досягненні DAILY_GOAL (один раз)
2.\`NewDayButton\`скидає прогрес-бар
3. Перевірте збереження: Stop/Play зберігає прогрес

### Фініш (3 хв)
1. **Файл → Зберегти в Roblox** →\`Lesson 3.7 - Daily Goal Simulator\` 2. **Практика завершена**`,
hints: [
"Тестуйте getGoalPercent окремо через print, перш ніж підключати до UI",
"Якщо бар не росте - перевірте, що GetPropertyChangedSignal підключений до правильного IntValue",
"Debounce-прапор для святкового повідомлення працює так само, як прапор collected у монетах",
],
optionalChallenge: "Додайте другу, більшу мету (наприклад, 200 монет) із власним прогрес-баром і кращою нагородою-повідомленням.",
},
quiz: {
passingScore: 70,
timeLimit: 10,
questions: [
{
id: "q1",
type: MC,
question: "Головна мета симулятора цього уроку...",
options: [
"Видалити монети",
"Щоденна ціль зі шкалою прогресу",
"Побудувати новий острів",
"Додати RemoteEvent",
],
correctAnswer: 1,
explanation: "Проєкт об'єднує ціль, прогрес і збереження.",
},
{
id: "q2",
type: MC,
question: "getGoalPercent повинна обмежувати результат максимумом...",
options: [
"0",
"1 (100%)",
"1000",
"Без обмеження",
],
correctAnswer: 1,
explanation: "Перевищення цілі не повинно ламати шкалу прогресу.",
},
{
id: "q3",
type: MC,
question: "Оновлення GoalBar Size найкраще робити в...",
options: [
"Server Script",
"LocalScript",
"Terrain Editor",
"Lighting",
],
correctAnswer: 1,
explanation: "Персональний інтерфейс оновлюється на клієнті.",
},
{
id: "q4",
type: MC,
question: "Без прапора goalCelebrated святкове повідомлення...",
options: [
"З'явиться рівно один раз",
"Може з'являтися повторно при кожній новій монеті",
"Ніколи не з'явиться",
"Видалить DataStore",
],
correctAnswer: 1,
explanation: "Без debounce логіка спрацьовує щоразу.",
},
{
id: "q5",
type: MC,
question: "NewDayButton використовує ту саму подію, що і в уроці 1.4. Яку саме?",
options: [
"Touched",
"MouseClick",
"PlayerAdded",
"GetPropertyChangedSignal",
],
correctAnswer: 1,
explanation: "ClickDetector реагує на MouseClick.",
},
{
id: "q6",
type: MC,
question: "Для збереження прогресу цілі між сесіями потрібно...",
options: [
"Нічого - все зберігається автоматично",
"DataStore з pcall, як у уроці 3.5",
"Лише LocalScript",
"Видалити leaderstats",
],
correctAnswer: 1,
explanation: "Стійкість вимагає DataStoreService і pcall.",
},
{
id: "q7",
type: MC,
question: "DAILY_GOAL має бути визначено...",
options: [
"У багатьох місцях з різними числами",
"Одного разу як константа, використана всюди",
"Ніде, лише вгадано",
"У StarterGui напряму",
],
correctAnswer: 1,
explanation: "Єдине джерело правди запобігає розсинхронізації.",
},
{
id: "q8",
type: MC,
question: "Чому ми не використовуємо реальні дати для \"щоденної\" цілі?",
options: [
"Roblox це забороняє",
"Реальні дати складніші, тема симулюється кнопкою для простоти навчання",
"Дати видаляють DataStore",
"Це неможливо в Luau",
],
correctAnswer: 1,
explanation: "Курс обирає простіший навчальний підхід через кнопку.",
},
{
id: "q9",
type: MC,
question: "Функція getGoalPercent повторно використовує принцип з уроку...",
options: [
"3.4 - функції",
"1.1 - Studio basics",
"2.3 - таймер",
"4.1 - tycoon",
],
correctAnswer: 0,
explanation: "Це застосування функцій із уроку про функції.",
},
{
id: "q10",
type: MC,
question: "Урок 3.7 зберегти назву...",
options: [
"Lesson 3.7 - Daily Goal Simulator",
"Lesson 3.1 - Coin Route",
"Module 4 - Tycoon Works",
"Untitled",
],
correctAnswer: 0,
explanation: "Назва проєкту щоденної цілі для збереження.",
},
],
},
}

export const ukLesson38 = {
lessonId: "lesson-roblox-3-8",
moduleId: "module-03",
order: 8,
title: "3.8 - Економіка і поліш симулятора",
theoryMinutes: 40,
quizMinutes: 10,
estimatedTime: 50,
learningObjectives: [
"Створіть варіанти монет із різною вартістю через уже відомі функції",
"Побудуйте просту точку витрати монет (spend sink) на основі відомих шаблонів Touched",
"Покращіть чіткість інтерфейсу користувача форматуванням чисел",
"Обробіть типові крайні випадки DataStore без збоїв гри",
],
theory: {
sections: [
{
title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
content: `Ваш симулятор із метою дня працює. Сьогодні ви додаєте **економічну глибину**: різні монети, спосіб **витратити** зароблене та захист від крайніх випадків DataStore.

**Хід уроку:**
1. **Теорія (40 хв)** - варіанти монет + spend sink + edge cases
2. **Практика (~30 хв)** - поліш економіки симулятора
3. **Вікторина (10 хв)** - **70%** потрібно пройти

Відкрийте **Урок 3.7 - Daily Goal Simulator**.`,
},
{
title: "Чому потрібна точка витрати (spend sink)",
content: `| Тільки заробіток | Заробіток + витрата |
|---------------------|------------------------|
| Монети накопичуються без мети | Монети мають **сенс** |
| Гра відчувається порожньою після цілі | Завжди є щось, до чого прагнути |
| Немає рішень гравця | Гравець вирішує, на що витратити |

**Правило економіки симулятора:** для кожного джерела доходу має бути хоча б одна причина витратити.`,
},
{
title: "Варіанти монет - функція, яку ви вже знаєте",
content: `Розширте\`getCoinValue(coinName)\`з уроку 3.4:

\`\`\`lua
local function getCoinValue(coinName)
if string.find(coinName, "Gold") then
return 10
elseif string.find(coinName, "Silver") then
return 5
elseif string.find(coinName, "Rare") then
return 5
end
return 1 -- Bronze / default
end
\`\`\`

Побудуйте **Gold** і **Silver** варіанти монет (інший BrickColor: золотий/сірий) поруч зі звичайними на карті - той самий Prefab-підхід із уроку 3.1.`,
},
{
title: "Spend sink - розблокування статуї (уже відомий шаблон)",
content: `**Важливо:** ви **не** використовуєте таблиці апгрейдів чи Buy-кнопки з Модуля 4 (ще не вивчено) - лише **Touched + if + функції**, які ви вже знаєте з уроків 3.2 і 2.1.

1. Побудуйте Part\`GoldenStatue_Locked\`(тьмяний колір, Anchored, CanCollide true)
2. **Script** всередині:

\`\`\`lua
local statue = script.Parent
local PRICE = 100
local unlocked = false

statue.Touched:Connect(function(hit)
if unlocked then return end

local character = hit.Parent
if not character then return end
local humanoid = character:FindFirstChildOfClass("Humanoid")
if not humanoid then return end

local player = game:GetService("Players"):GetPlayerFromCharacter(character)
if not player then return end

local stats = player:FindFirstChild("leaderstats")
local coins = stats and stats:FindFirstChild("Coins")
if not coins then return end

if coins.Value < PRICE then
print(player.Name .. " needs more coins for the statue!")
return
end

coins.Value -= PRICE
unlocked = true
statue.BrickColor = BrickColor.new("New Yeller")
statue.Material = Enum.Material.Neon
print(player.Name .. " unlocked the Golden Statue!")
end)
\`\`\`

Це - **той самий** шаблон Touched+Humanoid+GetPlayerFromCharacter, який ви використовували для kill blocks, checkpoints і монет - лише нова мета.`,
},
{
title: "Дебоунс і UX для витрати",
content: `\`unlocked = true\`- той самий трюк debounce, що завжди захищає від повторної списання ціни.

**Зворотний зв'язок:**
- Успіх → статуя стає Neon + друк повідомлення
- Недостатньо монет → print + необов'язковий короткий спалах кольору (як у Модулі 4, але тут ви вже вмієте це з BrickColor-трюків уроку 2.2)

**Вправа (10 хв):** Побудуйте і протестуйте статую - з недостатньою кількістю монет і з достатньою.`,
},
{
title: "Форматування чисел - чіткість інтерфейсу",
content: `Великі числа важко читати:\`1250\`проти\`1,250 Coins\`.

\`\`\`lua
local function formatCoins(value)
if value >= 1000 then
local thousands = math.floor(value / 1000)
local remainder = value % 1000
return string.format("%d,%03d Coins", thousands, remainder)
end
return value .. " Coins"
end
\`\`\`

Використовуйте\`formatCoins(coins.Value)\`замість голого числа в CoinsHUD і GoalUI.

**Вправа (5 хв):** Перевірте формат на числах\`50\`,\` 999\`,\` 1500\`.`,
},
{
title: "DataStore крайні випадки - гра не повинна падати",
content: `Розширте\`loadCoins\`з уроку 3.5, щоб безпечно обробляти нетипові ситуації:

\`\`\`lua
local function loadCoins(player)
local success, data = pcall(function()
return coinStore:GetAsync(player.UserId)
end)

if not success then
warn("DataStore unavailable for " .. player.Name .. " - starting at 0")
return 0
end

if typeof(data) ~= "number" then
-- First-time player OR corrupted/old data format
return 0
end

return data
end
\`\`\`

**Три випадки, які завжди варто перевірити:** новий гравець (\`data == nil\`), API вимкнено в Studio (\`success == false\`), неправильний тип даних (захист від майбутніх змін формату).`,
},
{
title: "Тестування крайніх випадків",
content: `**Протокол тесту:**
1. **Новий гравець:** видаліть свій UserId дані (або протестуйте з іншим тестовим акаунтом) - гра має стартувати з 0, а не помилкою
2. **API вимкнено:** тимчасово вимкніть Studio Access to API Services - гра має продовжувати працювати (0 монет, попередження в Output, не крах)
3. **Звичний випадок:** заробіть монети, Stop, Play - дані відновлюються

**Правило:** гра **ніколи** не повинна видавати червону помилку через DataStore - лише жовті warn-попередження в гіршому випадку.`,
},
{
title: "Контрольний список перед практикою",
content: `- [ ] Мінімум 2 варіанти монет (крім звичайної) з різною вартістю
- [ ] Spend sink (статуя чи подібне) списує монети через Touched+if
- [ ] formatCoins використовується в HUD і GoalUI
- [ ] loadCoins обробляє nil, невдалий pcall і неправильний тип
- [ ] Гра не падає в жодному з трьох тестових крайніх випадків`,
},
],
},
commonMistakes: [
{
mistake: "Spend sink написаний через жорсткий Buy-паттерн з Модуля 4, хоча він ще не вивчений",
explanation: "Це порушує послідовність навчання - потрібні лише відомі інструменти.",
correctApproach: "Використовуйте Touched + if + функції, точно як kill blocks і монети",
},
{
mistake: "formatCoins ламається на малих числах (менше 1000)",
explanation: "Функція без перевірки діапазону може видати неправильний формат.",
correctApproach: "Перевірте if value >= 1000 перед складним форматуванням",
},
{
mistake: "loadCoins повертає nil замість 0 для нового гравця",
explanation: "nil у коінах спричиняє помилки арифметики пізніше.",
correctApproach: "Завжди повертайте число (0 за замовчуванням), ніколи nil",
},
{
mistake: "Немає debounce на spend sink - монети списуються кілька разів",
explanation: "Той самий Touched-спам, що й у монетах без прапора collected.",
correctApproach: "unlocked = true одразу після успішного списання",
},
],
summary: "Ви додали варіанти монет різної вартості, побудували точку витрати на вже відомих шаблонах Touched, покращили читабельність чисел інтерфейсу та захистили DataStore від типових крайніх випадків - ваш симулятор тепер має повноцінну економіку.",
practiceTask: {
title: "Економіка і поліш - фінальний прогін (~30 хв)",
difficulty: "beginner",
description: `**Мета:** Симулятор із варіантами монет, витратою і надійним збереженням.

### Part A - Варіанти монет (8 хв)
1. Розширте getCoinValue для Gold (+10) і Silver (+5)
2. Побудуйте кілька Gold/Silver Prefabs на карті

### Part B - Spend sink (12 хв)
1. Побудуйте\`GoldenStatue_Locked\` + Script (PRICE 100, Touched+if шаблон)
2. Протестуйте з недостатньою і достатньою кількістю монет

### Part C - Форматування і надійність (7 хв)
1. Додайте\`formatCoins\`в CoinsHUD і GoalUI
2. Захистіть loadCoins від nil/невдалого pcall/неправильного типу
3. Протестуйте всі три крайні випадки DataStore

### Фініш (3 хв)
1. **Файл → Зберегти в Roblox** →\`Module 3 - Coin Economy (Final)\` 2. **Практика завершена**`,
hints: [
"Тестуйте spend sink спочатку з малою ціною (наприклад 5), потім поверніть 100",
"Вимкніть API Services тимчасово, щоб перевірити crash-safety без реального збою",
"formatCoins можна протестувати окремо через print перед підключенням до UI",
],
optionalChallenge: "Додайте другий spend sink, вдвічі дорожчий, що розблоковує ще одну декоративну модель на острові.",
},
quiz: {
passingScore: 70,
timeLimit: 10,
questions: [
{
id: "q1",
type: MC,
question: "Spend sink потрібен, тому що...",
options: [
"Монети мають бути марними",
"Заробіток без витрати робить економіку порожньою",
"Roblox вимагає це юридично",
"Це видаляє DataStore",
],
correctAnswer: 1,
explanation: "Витрата дає сенс накопиченим монетам.",
},
{
id: "q2",
type: MC,
question: "Spend sink у цьому уроці побудований на...",
options: [
"Таблицях апгрейдів з Модуля 4",
"Уже відомому шаблоні Touched + if + функції",
"RemoteEvent",
"ModuleScript",
],
correctAnswer: 1,
explanation: "Використовуються лише вже вивчені інструменти.",
},
{
id: "q3",
type: MC,
question: "formatCoins покращує...",
options: [
"Швидкість сервера",
"Читабельність великих чисел в інтерфейсі",
"Колір Sky",
"Anchored Properties",
],
correctAnswer: 1,
explanation: "Форматування допомагає гравцю швидко читати числа.",
},
{
id: "q4",
type: MC,
question: "loadCoins повинна повертати для нового гравця...",
options: [
"nil",
"0 (число)",
"Помилку",
"Рядок \"new\"",
],
correctAnswer: 1,
explanation: "Числове значення за замовчуванням запобігає помилкам.",
},
{
id: "q5",
type: MC,
question: "Якщо API Services вимкнено, гра повинна...",
options: [
"Видати червону помилку і зупинитися",
"Продовжувати працювати з warn-попередженням",
"Видалити всі монети назавжди",
"Заблокувати гравця",
],
correctAnswer: 1,
explanation: "pcall дозволяє грі продовжувати роботу при збоях API.",
},
{
id: "q6",
type: MC,
question: "unlocked = true на статуї запобігає...",
options: [
"Повторному списанню монет при кожному дотику",
"Появі монет",
"Save to Roblox",
"Зміні Sky",
],
correctAnswer: 0,
explanation: "Debounce-прапор захищає від повторної покупки.",
},
{
id: "q7",
type: MC,
question: "Gold монета за замовчуванням варта більше через...",
options: [
"Розширену функцію getCoinValue",
"Випадковість",
"DataStore",
"Terrain Editor",
],
correctAnswer: 0,
explanation: "Перевірка назви монети в функції визначає вартість.",
},
{
id: "q8",
type: MC,
question: "Три крайні випадки DataStore, які варто перевірити...",
options: [
"Колір Part, Size, Material",
"Новий гравець, вимкнений API, неправильний тип даних",
"Тільки Terrain",
"Лише StarterGui",
],
correctAnswer: 1,
explanation: "Ці три ситуації найчастіше ламають наївний код.",
},
{
id: "q9",
type: MC,
question: "typeof(data) ~= \"number\" перевіряє...",
options: [
"Чи дані правильного типу перед використанням",
"Колір гравця",
"ClockTime",
"Anchored статус",
],
correctAnswer: 0,
explanation: "Захист від пошкоджених або застарілих даних.",
},
{
id: "q10",
type: MC,
question: "Урок 3.8 зберегти назву...",
options: [
"Module 3 - Coin Economy (Final)",
"Lesson 3.1 - Coin Route",
"Module 4 - Tycoon Works",
"Untitled",
],
correctAnswer: 0,
explanation: "Фінальна назва економічного полішу Модуля 3.",
},
],
},
}
