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
 "Ctrl+D дублюйте вздовж шляху - потім перейменуйте в Explorer",
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
 "Collecting economy",
 "Only terrain",
 "Publishing only",
 "No Parts",
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
 "true always",
 "nil",
 "only for lava",
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
 "Guides beginner route",
 "Deletes coins",
 "Adds lava",
 "Removes UI",
 ],
 correctAnswer: 0,
 explanation: "Лінії вчать, куди йти.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Folder монет допомагає...",
 options: [
 "Organize before scripting",
 "Ban players",
 "Change language",
 "Remove Humanoid",
 ],
 correctAnswer: 0,
 explanation: "Folders забезпечують чистоту Explorerа.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Практика вимагає як мінімум...",
 options: [
 "30 coins",
 "1 coin",
 "0 coins",
 "1000 scripts",
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
 "Lesson 3.2",
 "Lesson 1.1 only",
 "Never",
 "Module 12 only",
 ],
 correctAnswer: 0,
 explanation: "3.1 є лише макетом.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Рідкісні монети часто...",
 options: [
 "Harder to reach + different color",
 "Invisible",
 "Under SpawnLocation",
 "Scripts only",
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
\`\`\`**Вправа (8 хв):** Перевірте одну монету в Play - торкніться один раз, монета зникне, надрукуйте один раз.`,
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
 correctApproach: "прапор збирання встановлюється істинним після першого дійсного дотику",
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
 "Server Script in coin",
 "LocalScript only in Head",
 "Terrain brush",
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
 "Delete Workspace",
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
 "Rename to Part",
 "Remove Humanoid",
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
 "Valid character touch",
 "Only lava",
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
 "Player stays overlapping coin",
 "Game is saved",
 "Coin is anchored",
 "Sky is blue",
 ],
 correctAnswer: 0,
 explanation: "Перекриття викликає повторення подій.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "task.delay(15, ...) може...",
 options: [
 "Respawn coin after 15 seconds",
 "Delete player",
 "Remove UI",
 "Change language",
 ],
 correctAnswer: 0,
 explanation: "Схема відкладеного відродження.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "print on collect допомагає...",
 options: [
 "Debug before leaderstats",
 "Publish game",
 "Add terrain",
 "Remove checkpoints",
 ],
 correctAnswer: 0,
 explanation: "Output перевіряє підйоми.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "PickupSound повинен грати...",
 options: [
 "Once per successful collect",
 "Every frame",
 "Never",
 "Only in Edit",
 ],
 correctAnswer: 0,
 explanation: "Debounce запобігає звуковому спаму.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 3.2 базується на...",
 options: [
 "Lesson 3.1 coin placement",
 "Only Module 1",
 "Empty map",
 "Web dev",
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
 mistake: "друкарська помилка лідерів",
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
 "Сервер друкує монети. Значення після отримання для перевірки приросту",
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
 "leaderstats exactly",
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
 "A player joins",
 "Coin touches lava",
 "UI clicks",
 "Terrain paints",
 ],
 correctAnswer: 0,
 explanation: "Налаштування виконується для кожного приєднаного гравця.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "монети. Значення += 1 має працювати на...",
 options: [
 "Server coin Script",
 "LocalScript only HUD",
 "Client chat",
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
 "Updates HUD when Coins change",
 "Deletes player",
 "Adds terrain",
 "Publishes",
 ],
 correctAnswer: 0,
 explanation: "Сигнал спрацьовує при зміні характеристик.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Клавіша Tab показує...",
 options: [
 "Leaderboard with leaderstats",
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
 "Workspace lava",
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
 "Prevents double increment",
 "Changes sky",
 "Removes obby",
 "Disables Tab",
 ],
 correctAnswer: 0,
 explanation: "Multiple Touched додасть забагато.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Між сесіями монети скидаються до...",
 options: [
 "DataStore in later lesson",
 "Saving rbxl only",
 "Changing color",
 "F key",
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
 "Reusing logic in one place",
 "Deleting UI",
 "Removing terrain",
 "Banning Tab",
 ],
 correctAnswer: 0,
 explanation: "СУХИЙ - не повторюйся.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "повернення у функції...",
 options: [
 "Sends a value back to caller",
 "Deletes player",
 "Publishes game",
 "Anchors Parts",
 ],
 correctAnswer: 0,
 explanation: "повернення виходів із необов’язковим значенням.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "awardCoins(player, 5) додає...",
 options: [
 "5 to Coins stat",
 "5 Parts",
 "5 scripts",
 "5 terrains",
 ],
 correctAnswer: 0,
 explanation: "Другий аргумент - сума.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Раннє повернення, коли статистика відсутня...",
 options: [
 "Stops function safely",
 "Adds 1000 coins",
 "Opens VictoryGui",
 "Spawns lava",
 ],
 correctAnswer: 0,
 explanation: "Охоронні положення запобігають помилкам.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "collectedFlags[coin] використовує...",
 options: [
 "Coin instance as table key",
 "Only player name",
 "Sky color",
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
 "\"Rare\" substring",
 "Player age",
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
 "StarterGui only",
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
 "Removed to avoid double award",
 "Duplicated 30 times",
 "LocalScripts only",
 "In Terrain",
 ],
 correctAnswer: 0,
 explanation: "Один Script замінює багато.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Назви дієслівних функцій, наприклад hideCoin...",
 options: [
 "Read like actions",
 "Hide code forever",
 "Remove Humanoid",
 "Disable save",
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

**Ви не можете** перевірити реальні збереження лише в простому режимі редагування - використовуйте **Play** з увімкненим API або **Опублікувати** тест.`,
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
 "Between play sessions",
 "Only in one Play minute",
 "Inside Part color",
 "In LocalScript UI",
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
 "player.Name only",
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
 "API errors crashing the script",
 "Lava kills",
 "UI color",
 "Terrain paint",
 ],
 correctAnswer: 0,
 explanation: "pcall безпечно виявляє збої.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "GetAsync завантажує...",
 options: [
 "Saved data when player joins",
 "Skybox",
 "All scripts",
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
 "Player leaves (PlayerRemoving)",
 "Every frame",
 "Only in lobby",
 "Never",
 ],
 correctAnswer: 0,
 explanation: "Економія у відпустці є стандартною.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Назви CoinProgress_v1 допомагають...",
 options: [
 "Future data migrations",
 "Delete players",
 "Remove UI",
 "Disable sound",
 ],
 correctAnswer: 0,
 explanation: "Версійні назви магазинів.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Studio DataStore потребує...",
 options: [
 "Enable API Services",
 "Delete Workspace",
 "LocalScript only",
 "No leaderstats",
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
 "Client TextLabel only",
 "Chat message",
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
 "Bad - rate limits",
 "Required",
 "Same as never saving",
 "UI only",
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
- **CoinsHUD** вгорі зліва:\`Coins: 0\`**Необов’язково:** стрілка Деталі, що вказують на щільну зону монет.

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
3. **Зберегти в Roblox** →\`Module 3 - Coin Simulator\` 4. **Практика завершена** + додатковий 2-хвилинний запис`,
 hints: [
 "Виправте подвійне нагородження перед тестуванням збереження - неправильний підрахунок зберігає неправильні дані",
 "Служби API мають залишатися ввімкненими для DataStore",
 "Запустіть тест 4 останнім - підтверджує роботу всього модуля",
 ],
 optionalChallenge: "Бустерна панель: подвійні монети протягом 20 секунд після дотику.",
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
 "Map + collect + HUD + save",
 "Only terrain",
 "Only obby timer",
 "No scripts",
 ],
 correctAnswer: 0,
 explanation: "Усі системи модуля 3 разом.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Тест 2 підтверджує...",
 options: [
 "Debounce still works",
 "Sky color",
 "Terrain only",
 "Publishing",
 ],
 correctAnswer: 0,
 explanation: "Stand-on-coin не повинен спамити +",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Тест 4 підтверджує...",
 options: [
 "DataStore persistence",
 "Neon material",
 "Kill blocks",
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
 "Only pickup script",
 "One of 30 duplicate scripts",
 "Client chat script",
 "Terrain tool",
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
 "Player display name only",
 "Coin Part name",
 "Random",
 ],
 correctAnswer: 0,
 explanation: "UserId є унікальним для кожного облікового запису.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Тема модуля 4...",
 options: [
 "Tycoon / passive income",
 "Only publishing",
 "Only cars",
 "Empty",
 ],
 correctAnswer: 0,
 explanation: "Tycoon будує систему монет.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Потрібна адаптація на spawn...",
 options: [
 "Clear goal + visible first coin",
 "No coins",
 "Hidden UI",
 "Only lava",
 ],
 correctAnswer: 0,
 explanation: "Гравці потребують негайного керівництва.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Червоний вихід під час чистого запуску означає...",
 options: [
 "Fix before shipping",
 "Perfect",
 "Add more lava",
 "Delete DataStore",
 ],
 correctAnswer: 0,
 explanation: "Помилки = помилки залишаються.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Рідкісні монети повинні нагороджувати...",
 options: [
 "More than common (+5)",
 "Zero",
 "Delete save",
 "Remove HUD",
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
