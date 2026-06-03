/** Rich UK content for Roblox Module 01 - AUTO from EN via gen-roblox-lessons-uk.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson11 = {
 lessonId: "lesson-roblox-1-1",
 moduleId: "module-01",
 order: 1,
 title: "1.1 - Ласкаво просимо до Studio",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Встановіть Roblox Studio та відкрийте шаблон Baseplate",
 "Переміщуйтеся у Viewport за допомогою W/A/S/D і елементів керування мишею",
 "Використовуйте Explorer і Properties для перевірки та редагування об’єктів",
 "Створюйте Parts з кольором, Size, Material і Anchored",
 "Збережіть своє перше місце в хмарі Roblox",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Ласкаво просимо до **Roblox Studio** - інструменту, який стоїть за Obby, симуляторами, магнатами та світами рольових ігор, у які ви граєте щодня.

**Хід уроку:**
1. **Теорія (40 хв)** - прочитати кожен розділ; спробуйте ярлики в Studio під час роботи
2. **Практика (~25 хв у студії)** - побудуйте три Parts та збережіть своє місце
3. **Вікторина (10 хв)** - 10 питань; передайте **70%**, щоб розблокувати наступний урок

Тримайте Studio відкритою поруч із цією сторінкою. Розробник навчальних ігор працює найкраще, коли ви **будуєте під час читання**.`,
 },
 {
 title: "Мислення гравця проти розробника",
 content: `**Гравець** запитує: «Як мені виграти цей рівень?»

**Розробник** запитує:
- Що має статися, коли гравець стрибне сюди?
- Які предмети повинні залишатися нерухомими?
- Який колір говорить гравцеві про «безпеку», а не про «небезпеку»?

Ви переходите в режим розробника. Кожна відома гра Roblox починалася з того, що хтось розмістив свою **першу Part** - саме те, що ви зробите сьогодні.`,
 },
 {
 title: "Встановити Studio (крок за кроком)",
 content: `1. Відкрийте **create.roblox.com** і увійдіть (до 13 років потрібне схвалення батьків)
2. Натисніть **Start Creating** - завантажується інсталятор Roblox Studio
3. Запустіть інсталятор; перший запуск може зайняти кілька хвилин
4. На головному екрані виберіть **New** → **Baseplate**

**Baseplate** = рівна підлога + небо. Ідеально підходить для уроку 1.

**Усунення несправностей:** Якщо Studio не відкривається, оновіть графічні драйвери та переконайтеся, що у вас є принаймні 4 ГБ оперативної пам’яті та Windows 10 / macOS 10.13+.`,
 },
 {
 title: "Макет студії - знайте свої панелі",
 content: `| Площа | Призначення |
|------|---------|
| **Viewport** (у центрі) | 3D-світ, який ви створюєте |
| **Ribbon / Home** (вгорі) | Part, Move, Scale, Play |
| **Explorer** (праворуч) | Дерево кожного об'єкта |
| **Properties** (справа, внизу) | Налаштування для вибраного об'єкта |
| **Output** (внизу) | Помилки зі скриптів (пізніше) |

**Вправа (3 хв):** Клацніть Baseplate у Viewport. Подивіться, як він виділяється в Explorer. У Properties знайдіть **Name**, **Size**, **Anchored**.`,
 },
 {
 title: "Управління камерою - літайте як режисер",
 content: `| Дія | Контроль |
|--------|---------|
| Рух вперед / назад | **W** / **S** |
| Стрейф ліворуч/праворуч | **A** / **D** |
| Move up/down (камера) | **E** / **Q** |
| Повернути перегляд | **Права кнопка миші** + перетягнути |
| Збільшити | **Колесо миші** |
| Вибір фокусу | Виберіть об’єкт → **F** |

**Вправа (5 хв):** Облетіть Baseplate зверху, збоку та з рівня землі. Після вибору підлоги натисніть **F**.`,
 },
 {
 title: "Explorer - генеалогічне дерево вашої гри",
 content: `Усе в грі є **Instance** у батьківсько-начірньому дереві.

**Workspace** містить 3D-світ. Тут ви додасте Parts.

**Корисні звички:**
- **Один клік** - вибрати
- **Двічі клацніть назву** - перейменуйте (використовуйте справжні імена:\`PurpleTower\`, ні\`Part\`)
- **Delete** - видаляє об'єкт
- **Ctrl + D** - дублікат

**Вправа (5 хв):** Розгорніть Workspace. Перейменувати\`Baseplate\`до\`IslandFloor\`якщо вам подобається.`,
 },
 {
 title: "Properties - «паспорт» кожного об'єкта",
 content: `Коли вибрано **Part**, Properties показують:

| Property | Значення |
|----------|---------|
| **Size** | Ширина X, висота Y, глибина Z (studs) |
| **Position** | Розташування у світі |
| **BrickColor** | Попередньо встановлені кольори |
| **Material** | Візуальний стиль (Metal, Neon, Wood...) |
| **Anchored** | Якщо true, об’єкт ігнорує гравітацію |
| **CanCollide** | Якщо true, гравці стикаються з ним |

**Золоте правило для уроку 1:** підлоги та оздоблення → **Anchored = true**.`,
 },
 {
 title: "Створіть свої перші Parts",
 content: `**Insert Part:**
- Головна → **Part** → Блок (або сфера/циліндр)
- Комбінація клавіш: **Ctrl + Shift + P** (Windows)

**Інструменти трансформації:**
| Ключ | Інструмент |
|-----|------|
| **W** | Move |
| **E** | Scale |
| **R** | Rotate |

**Вправа (10 хв):** Додайте один блок. Змініть його за допомогою **E**. Перемістіть його за допомогою **W**. Змініть BrickColor на колір, який вам подобається. Встановіть **Anchored = true**. Натисніть **Play** (F5) - вона не повинна впасти.`,
 },
 {
 title: "Матеріали та Neon glow",
 content: `**Material** змінює те, як світло потрапляє на поверхню:
- **SmoothPlastic** - чисте за замовчуванням
- **Metal** - блискучі платформи
- **Neon** - світиться (чудово підходить для знаків і магії)

Комбінуйте **Neon** + яскравий **BrickColor** для науково-фантастичного образу.

**Прозорість** (0-1): 0 = суцільний, 1 = невидимий. Використовуйте 0,3 для скла пізніше.

**Вправа (5 хв):** Зробіть одну Part **Neon** блакитного кольору. Натисніть Play при темному ClockTime, щоб побачити, як вона світиться (Lighting → ClockTime).`,
 },
 {
 title: "Зберегти в хмарі Roblox",
 content: `**Файл → Зберегти в Roblox** (не лише зберегти у файл на диску).

Виберіть назву:\`Lesson 1.1 - My First Scene\`Ваше місце зберігається у вашому обліковому записі - ви можете відкрити його з будь-якого комп’ютера за допомогою Studio.

**Контрольний список перед тренуваннями:**
- [ ] Я можу зручно переміщати камеру
- [ ] Я знайшов Explorer і Properties
- [ ] Я вставив at least one Part та встановив Anchored
- [ ] Я знаю, як натискати Play і Stop`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Parts fall на підлогу, коли я press Play.",
 explanation: "Сила тяжіння тягне unAnchored Parts вниз.",
 correctApproach: "Виберіть Part → Properties → Anchored ✓",
 },
 {
 mistake: "Я не можу знайти Explorer",
 explanation: "Панелі можна випадково закрити.",
 correctApproach: "Вкладка View → увімкніть Explorer і Properties.",
 },
 {
 mistake: "Зміни зникають після закриття Studio",
 explanation: "У вашому обліковому записі зберігаються лише збережені місця.",
 correctApproach: "Файл → Зберегти в Roblox після кожного тренування",
 },
 ],
 summary: "Ви дізналися, що таке Roblox Studio, як переміщувати камеру, як працюють Explorer і Properties та як додавати прикріплені Parts за допомогою кольору та матеріалу. Ваша тренувальна сцена - це перший запис у вашому портфоліо розробника ігор.",
 practiceTask: {
 title: "Студійна практика - Моя перша сцена (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Довести, що ти можеш створити та зберегти просту сцену.

### Part A - Фіолетова вежа (8 хв)
1. Insert **Block** → Name:\`PurpleTower\` 2. Size:\` 8, 8, 8\`| BrickColor: фіолетовий | Material: **SmoothPlastic**
3. Anchored: **true** | Розмістіть на опорній плиті

### Part B - Червона платформа (8 хв)
1. Insert **Block** → Name:\`RedPlatform\` 2. Size:\` 20, 1, 4\`| BrickColor: яскраво-червоний | Material: **Metal**
3. Anchored: **true** | Використовуйте **W**, щоб позиціонувати як доріжку

### Part C - Neon сфера (5 хв)
1. Insert **Sphere** → Name:\`GlowOrb\` 2. Size:\` 3, 3, 3\`| Material: **Neon** | Anchored: **true**

### Перевірте та збережіть (4 хв)
1. Натисніть **Play** - нічого не повинно впасти
2. **Файл → Зберегти в Roblox** →\`Lesson 1.1 - My First Scene\` 3. Поверніться сюди та натисніть **Практика завершена**`,
 hints: [
 "Перейменуйте кожну Part - гарні імена збережуть години пізніше",
 "Якщо щось впало, зупиніть відтворення, виберіть це, увімкніть Anchored",
 "Використовуйте F, щоб обрамити об’єкт, який ви редагуєте",
 ],
 optionalChallenge: "Додайте **Atmosphere** у **Lighting** та встановіть ClockTime на 17 для знімка заходу сонця.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Який шаблон слід використовувати для уроку 1?",
 options: [
 "Obby",
 "Baseplate",
 "Рівнинна місцевість",
 "Порожній",
 ],
 correctAnswer: 1,
 explanation: "Baseplate забезпечує просту підлогу для будівництва.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Яка клавіша фокусує камеру на вибраному об’єкті?",
 options: [
 "P",
 "F",
 "G",
 "H",
 ],
 correctAnswer: 1,
 explanation: "F обрамляє виділення у Viewport.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Де ви бачите список усіх об'єктів?",
 options: [
 "Properties",
 "Explorer",
 "Output",
 "Toolbox",
 ],
 correctAnswer: 1,
 explanation: "Explorer показує дерево екземплярів.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Що робить Anchored = true?",
 options: [
 "Робить Part невидимою",
 "Зупиняє гравітацію на цій Part",
 "Видаляє Part",
 "Додає звук",
 ],
 correctAnswer: 1,
 explanation: "Закріплені Parts залишаються на місці під час гри.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Яка клавіша інструменту відкриває Move?",
 options: [
 "W",
 "E",
 "R",
 "T",
 ],
 correctAnswer: 0,
 explanation: "W = Move, E = Scale, R = Rotate.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Який Material робить Part світним?",
 options: [
 "Wood",
 "Grass",
 "Neon",
 "Sand",
 ],
 correctAnswer: 2,
 explanation: "Material **Neon** випромінює світло.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Size використовує три цифри. Що вони означають?",
 options: [
 "Кольори RGB",
 "Ширина X, висота Y, глибина Z",
 "Кути повороту",
 "Швидкість гравця",
 ],
 correctAnswer: 1,
 explanation: "Size вимірюється стадами по X, Y, Z.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Як ви зберігаєте в обліковому записі Roblox?",
 options: [
 "Файл → Зберегти лише у файл",
 "Файл → Зберегти в Roblox",
 "Змінити → Копіювати",
 "Головна → Опублікувати",
 ],
 correctAnswer: 1,
 explanation: "Зберегти в Roblox завантажує місце у ваш обліковий запис.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Червоний текст у виводі зазвичай означає...",
 options: [
 "Помилка Script",
 "Повідомлення про успіх",
 "Відставання мережі",
 "Додано нову Part",
 ],
 correctAnswer: 0,
 explanation: "Output дані показують помилки, коли Scripts ламаються.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Перед грою підлога та стіни зазвичай повинні бути...",
 options: [
 "Anchored помилковий",
 "Anchored true",
 "Прозорість 1",
 "CanCollide false",
 ],
 correctAnswer: 1,
 explanation: "Anchored справжній утримує Parts будівлі стабільними.",
 },
 ],
 },
}

export const ukLesson12 = {
 lessonId: "lesson-roblox-1-2",
 moduleId: "module-01",
 order: 2,
 title: "1.2 - Будуємо острів",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Відрізняйте місцевість від Parts",
 "Створіть острів за допомогою Terrain Editor",
 "Скульптуйте землю за допомогою Add, Subtract і Smooth",
 "Paint Grass, Sand, Rock і Water materials",
 "Збережіть Terrain у Roblox",
 ],
 theory: {
 sections: [
 {
 title: "План уроку (40 + 10 хвилин)",
 content: `Сьогодні ви ліпите справжній **острів** за допомогою Roblox **Terrain** - не окремі блоки, а суцільну землю, яку ви можете піднімати, копати та малювати.

**Потік:** Теорія → 25 хв практика на острові → 10 хв тест.

Відкрийте своє місце **Урок 1.1** або створіть нову базову плиту. Редагувати Terrain легше у файлі спеціального місця.`,
 },
 {
 title: "Parts vs Terrain",
 content: `| | **Parts** | **Terrain** |
|---|-----------|-------------|
| Форма | Блоки, кулі, клини | Пагорби, озера, пляжі |
| Найкраще для | Споруди, кнопки, реквізит | Природні світи |
| Редагувати | інструменти **Move** / **Scale** | **Generate**, **Sculpt**, **Paint** |

Багато ігор використовують **обидва**: місцевість для острова, Parts для доків і знаків.`,
 },
 {
title: "Відкрийте Terrain Editor",
content: `**Home → Editor** (розділ Terrain)

Три вкладки, які вам знадобляться сьогодні:
1. **Generate** - створіть землю з нуля
2. **Sculpt** - Add / Subtract / Smooth
3. **Paint** - grass, sand, rock, water

Якщо Terrain уже існує та виглядає неправильно, виберіть **Terrain** у Workspace → Delete → почати заново.`,
 },
 {
 title: "Згенерувати - острів в один клік",
 content: `1. Відкрийте **Generate**
2. Встановіть розмір приблизно **512 × 100 × 512**
3. Biome: **Islands** (або Mountains для практики)
4. Натисніть **Generate** - зачекайте 5-15 секунд

Не щасливий? **Ctrl + Z** і згенеруйте знову.

**Seed** контролює форму. Запишіть зерно, якщо вам подобається макет і ви хочете його Play.`,
 },
 {
 title: "Sculpt - Add (земля для будівництва)",
 content: `**Add** піднімає землю. Натисніть і перетягніть:
- Витягніть пагорби з океану
- Розширити острів
- З’єднайте два масиви землі

**Size пензля:** великий пензель для форми, маленький пензель для деталей.

**Вправа (8 хв):** Додайте один чистий пагорб на своєму острові. Зробіть його зручним для гри - не надто крутим, щоб персонаж міг ходити.`,
 },
 {
 title: "Sculpt - Subtract (вирізати)",
 content: `**Subtract** копає:
- Озера і ставки
- Річки
- Печери та скелі

У режимі **Add** **Ctrl + click** діє як **Subtract** в багатьох версіях Studio.

**Вправа (8 хв):** Вирізь затоку або озеро. Залиште пляжну смугу між водою та високою місцевістю.`,
 },
 {
 title: "Sculpt - Smooth (полірування)",
 content: `Необроблена Terrain виглядає гострою. **Smooth** пом’якшує краї.

**Робочий процес:** Add/Subtract для форми → **Smooth** всієї ігрової зони в останню чергу.

**Вправа (5 хв):** Плавно біжіть уздовж берегів і вершин пагорбів, поки схили не виглядатимуть природними.`,
 },
 {
 title: "Paint - матеріали розповідають історію",
 content: `| Material | Використовуйте на |
|----------|--------|
| **Grass** | Основна земля |
| **Sand** | Пляжі |
| **Рок** | Скелі та вершини |
| **Вода** | Низькі райони / море |
| **Сніг** | Гірські вершини (на вибір) |

**Порядок:** **Grass** → **Sand** біля води → Камінь на вершинах.

**Вправа (8 хв):** **Paint** принаймні три material types на острові.`,
 },
 {
 title: "Перевірте в Play & Save",
 content: `Натисніть **Play** - проведіть Character вздовж берега та вгору на пагорб.

**Перевірити:**
- Відсутність випадкових отворів у Terrain
- Схили придатні для прогулянок
- Акваторії виглядають правильно

**Файл → Зберегти в Roblox** →\`Lesson 1.2 - My Island\`Місцевість важка - рятуйте частіше.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Generate зависає або нічого не показує",
 explanation: "Старі дані Terrain можуть конфліктувати.",
 correctApproach: "Видалити Terrain у Workspace, створити знову",
 },
 {
 mistake: "Terrain виглядає занадто гострим",
 explanation: "Subtract/Add без **Smooth**.",
 correctApproach: "Використовуйте Smooth Brush по всьому острову",
 },
 {
 mistake: "У режимі редагування вода виглядає статично",
 explanation: "Анімація часто відображається лише в Play.",
 correctApproach: "Натисніть Play, щоб переглянути рух води",
 },
 ],
 summary: "Ви згенерували острів, **Sculpt** пагорби й озера, **Smooth** схили та **Paint** materials - основу більшості відкритих карт Roblox.",
 practiceTask: {
 title: "Завдання на будівництво острова (~25 хв)",
 difficulty: "beginner",
 description: `1. **Створення** біомних островів (512 площ)
2. **Додати** - одна гора чи пагорб
3. **Subtract** - озеро чи затока
4. **Smooth** - уся ігрова зона
5. **Paint** - Grass, Sand на березі, Rock на вершині
6. Доріжка **Гра-тест**
7. **Зберегти в Roblox** як\`Lesson 1.2 - My Island\` 8. Позначте тут **Практика завершена**`,
 hints: [
 "Велика кисть спочатку, мала кисть останньою",
 "Зберігайте відразу після ліплення",
 "Smooth перед Paint для більш чистих сумішей",
 ],
 optionalChallenge: "Сформуйте острів, як ваш перший ініціал, якщо дивитися зверху.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Місцевість найкраща для...",
 options: [
 "Меню інтерфейсу користувача",
 "Природні пагорби та озера",
 "Лише Scripts",
 "звукові ефекти",
 ],
 correctAnswer: 1,
 explanation: "Місцевість для органічних ландшафтів.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Яка вкладка створює землю з насіння?",
 options: [
 "Paint",
 "Generate",
 "Select",
 "Play",
 ],
 correctAnswer: 1,
 explanation: "Створення початкового ландшафту.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "**Subtract** використовується для...",
 options: [
 "Додайте дерева",
 "Копати ями та озера",
 "Змінити небо",
 "Відродження гравців",
 ],
 correctAnswer: 1,
 explanation: "**Subtract** видаляє об’єм Terrain.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "**Smooth** допомагає...",
 options: [
 "Додайте Scripts",
 "Пом'якшити нерівні краї",
 "Видалити гру",
 "Змінити шрифт",
 ],
 correctAnswer: 1,
 explanation: "Smooth полірує поверхні Terrain.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "**Sand** material зазвичай укладається...",
 options: [
 "На гірських вершинах",
 "На пляжах і берегах",
 "Scripts inside",
 "На SpawnLocation",
 ],
 correctAnswer: 1,
 explanation: "Пісок підходить до берегової лінії.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Рекомендований біом для уроку 1.2...",
 options: [
 "Тільки печери",
 "Islands",
 "Місто",
 "Порожній",
 ],
 correctAnswer: 1,
 explanation: "Біом островів відповідає меті уроку.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Якщо Generate не вдається, спочатку спробуйте...",
 options: [
 "Перевстановіть Windows",
 "Видалити стару місцевість",
 "Видалити всі Scripts",
 "Змінити мову",
 ],
 correctAnswer: 1,
 explanation: "Очистіть розбиту місцевість, а потім відновіть.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Зазвичай **Grass** малюють на...",
 options: [
 "Тільки під водою",
 "Основна рівнина і горбиста місцевість",
 "Skybox",
 "Вікно виводу",
 ],
 correctAnswer: 1,
 explanation: "Трава покриває загальні площі землі.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Ctrl+Z після невдалого створення...",
 options: [
 "Видаляє ваш обліковий запис",
 "Скасовує генерацію",
 "Видає гру",
 "Додає платний доступ",
 ],
 correctAnswer: 1,
 explanation: "Скасувати дозволяє спробувати інше насіння.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Terrain слід зберегти через...",
 options: [
 "Файл → Зберегти в Roblox",
 "Тільки скріншот",
 "Видалити місцевість",
 "нічого",
 ],
 correctAnswer: 0,
 explanation: "Зберегти в магазинах Roblox місцевість у місці.",
 },
 ],
 },
}

export const ukLesson13 = {
 lessonId: "lesson-roblox-1-3",
 moduleId: "module-01",
 order: 3,
 title: "1.3 - Об'єкти та їх Properties",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Упорядковуйте об’єкти за допомогою папок і моделей",
 "Точне редагування позиції, розміру та орієнтації",
 "Правильно використовуйте CanCollide і Anchored разом",
 "Побудуйте док-сцену з назвами Parts на вашому острові",
 ],
 theory: {
 sections: [
 {
 title: "Чому організація має значення",
 content: `Після Terrain вашому острову потрібні **реквізити**: доки, знаки, лампи, дерева.

На 50 об’єктах Хаос Explorer уповільнює вас. При 500 це руйнує проекти.

Сьогодні ви дізнаєтесь про **Folders**, **Моделі** та точні **Properties** - звички, які використовуються в іграх Roblox, що постачаються.`,
 },
 {
 title: "Дерево екземплярів (огляд)",
 content: "Кожен об’єкт має **батька** і необов’язково **дочірніх елементів**. `Workspace`→`Folder`→`Model`→`Part` Клацнувши **Part** у Viewport, ви виберете її в Explorer. Перейменування - обов'язкова дисципліна.",
 },
 {
 title: "Folders - прості контейнери",
 content: `**Insert → Folder** або клацніть правою кнопкою миші Workspace → Insert Folder.

приклади:
-\`Environment\`-\`Dock\`-\`LightingProps\`Перетягніть Parts в Folders. Folders не рухаються як одне ціле - вони лише організовують.`,
 },
 {
 title: "Моделі - пересувайте групи разом",
 content: `Виберіть кілька Parts → **Ctrl + G** (Group) або клацніть правою кнопкою миші → **Group**.

Ви отримуєте **Model** - перемістіть її інструментом **Move**, і всі діти підуть за нею.

Перейменувати:\`Dock_Main\`,\`Pier_Lamps\`.

**Вправа (10 хв):** Побудуйте 4 дошки як одну model доріжки.`,
 },
 {
 title: "Номери позиції та розміру",
 content: `**Move (W)** швидкий. **Properties → Position** є точним.

Скопіюйте позицію з однієї дошки на іншу - змініть лише **X** або **Z** для ідеального ряду.

**Size**\`20, 1, 4\`= широка плоска дошка.

**Орієнтація** обертається в градусах (0, 90, 0) для точених дощок.`,
 },
 {
 title: "CanCollide і Anchored матриця",
 content: `| Anchored | CanCollide | Типове використання |
|----------|------------|-------------|
| true | true | Стіни, підлоги, док |
| true | false | Світлячки, туманні карти |
| false | true | Ящики з фізики (пізніше) |

Для статичних конструкцій: **true** на поверхнях, по яких можна ходити.`,
 },
 {
 title: "Правила іменування",
 content: `Послідовно використовуйте **PascalCase** або **snake_case**:

Добре:\`Dock_Plank_01\`,\`Lamp_Post_A\`погано:\`Part\`,\`Part\`,\`Part\`У майбутньому ви (і товариші по команді) шукатимете за іменем у Explorer.`,
 },
 {
 title: "Побудуйте док на своєму острові",
 content: `Розмістіть док на **плоскому піску** біля води з уроку 1.2.

Пропонований макет:
- 5-8 дощок (дерев’яний матеріал)
- 2 вертикальні стійки
- 1 Part Neon лампи для видимості

Згрупуйте дошки\`Dock_Platform\`Model всередині\`Dock\`Folder.`,
 },
 {
 title: "Перевірка якості перед вікториною",
 content: `**Контрольний список тестування гри:**
- [ ] Character ходить по дошках, не провалюючись
- [ ] Ніякі unAnchored Parts не падають
- [ ] Explorer показує Folder → Model → Parts
- [ ] Кожна Part має унікальну корисну назву
- [ ] Збережено як\`Lesson 1.3 - Island Dock\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Parts плавають над землею",
 explanation: "Позиція Y не вирівняна.",
 correctApproach: "Встановіть однаковий Y на всіх дошках; використовуйте **Move** з прив’язкою сітки",
 },
 {
 mistake: "Неможливо вибрати одну дошку в model",
 explanation: "Двічі клацніть або розгорніть Model у Explorer.",
 correctApproach: "Розгорніть дерево model або скористайтеся деталізованим вибором",
 },
 {
 mistake: "Model рухається, а дошки залишаються",
 explanation: "Parts, не наділені model.",
 correctApproach: "Згрупуйте знову, щоб Parts були нащадками model",
 },
 ],
 summary: "Ви організували док-станцію з Folders та моделями, використовували Properties для точного розміщення та підтримували узгодженість правил зіткнень - професійний робочий процес Studio.",
 practiceTask: {
 title: "Збірка доку (~25 хв)",
 difficulty: "beginner",
 description: `На вашому острові уроку 1.2:

1. Створити Folder\`Dock\`у Workspace
2. Додайте **6+ Parts** (дошки, стовпи, лампа)
3. Усі **Anchored true**, прохідні дошки **CanCollide true**
4. Згрупуйте дошки в model\`Dock_Platform\` 5. Вирівняйте за допомогою позиції (той самий Y для колоди)
6. **Зберегти в Roblox** →\`Lesson 1.3 - Island Dock\` 7. **Практика завершена**`,
 hints: [
 "Ctrl+D дублює вибрану дошку",
 "Позиція копіювання X/Z з малими кроками для інтервалу",
 "Neon лампа допомагає знайти док вночі",
 ],
 optionalChallenge: "Додайте знак Part з назвою вашої гри яскравими Neon літерами.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Folder в основному призначена для...",
 options: [
 "Запуск скриптів",
 "Упорядкування об'єктів",
 "Відтворення музики",
 "Породження ворогів",
 ],
 correctAnswer: 1,
 explanation: "Folders групують об’єкти в Explorer.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Model дозволяє...",
 options: [
 "Перемістіть кілька Parts разом",
 "Видалити місцевість",
 "Змінити мову",
 "Банити гравців",
 ],
 correctAnswer: 0,
 explanation: "Моделі виступають як одна рухома група.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Ctrl+G зазвичай...",
 options: [
 "Групує виділення в model",
 "Видаляє Workspace",
 "Відкриває магазин",
 "Зберігає гру",
 ],
 correctAnswer: 0,
 explanation: "Група створює model із вибраного.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Точні координати редагуються в...",
 options: [
 "Output",
 "Properties",
 "Chat",
 "Аватар",
 ],
 correctAnswer: 1,
 explanation: "Позиція знаходиться у Properties.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Прохідні дошки зазвичай мають...",
 options: [
 "Anchored true, CanCollide true",
 "Тільки прив’язаний false",
 "Прозорість 1",
 "Без назви",
 ],
 correctAnswer: 0,
 explanation: "Статичні прохідні Parts використовують обидва.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Size 20, 1, 4 означає...",
 options: [
 "20 ширини, 1 висоти, 4 глибини",
 "20 гравців",
 "20 Scripts",
 "RGB 20,1,4",
 ],
 correctAnswer: 0,
 explanation: "Size X, Y, Z у стадах.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Погане ім'я виглядає як...",
 options: [
 "Dock_Plank_03",
 "Part, Part, Part",
 "Ліхтарний стовп",
 "Pier_Main",
 ],
 correctAnswer: 1,
 explanation: "Родові назви викликають плутанину.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Parts всередині model є...",
 options: [
 "Діти model",
 "Поза робочим простором",
 "Завжди невидимий",
 "Лише Scripts",
 ],
 correctAnswer: 0,
 explanation: "Згруповані Parts, що належать до model.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Ctrl+D корисно для...",
 options: [
 "Дублювати виділений об’єкт",
 "Видалити акаунт",
 "Налагодити Lua",
 "Paint terrain",
 ],
 correctAnswer: 0,
 explanation: "Подвійні швидкості створення повторюваних дощок.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 1.3 зберегти пропозицію імені...",
 options: [
 "Урок 1.3 - Острівний док",
 "Без назви",
 "Тест123",
 "asdf",
 ],
 correctAnswer: 0,
 explanation: "Чіткі назви допомагають відстежувати прогрес курсу.",
 },
 ],
 },
}

export const ukLesson14 = {
 lessonId: "lesson-roblox-1-4",
 moduleId: "module-01",
 order: 4,
 title: "1.4 - Перша магія: ClickDetector",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Додайте ClickDetector, щоб зробити **Part** доступною для кліку",
 "Напишіть свій перший серверний скрипт мовою Luau",
 "Підключіть MouseClick, щоб змінити колір і надрукувати to Output",
 "Виправляйте типові помилки Script за допомогою вікна виведення",
 "Зрозумійте порівняння Script проти LocalScript для цього уроку",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Досі ви **будували** світи. Сьогодні ваш світ **реагує** на гравця - це справжня розробка гри.

**Хід уроку:**
1. **Теорія (40 хв)** - ClickDetector + ваш перший скрипт Luau
2. **Практика (~25 хв)** - три клікабельні об'єкти на вашому острові
3. **Вікторина (10 хв)** - 10 запитань, **70%** необхідно пройти

Відкрийте своє місце **Урок 1.3 - Островний док**. Тримайте **Output** видимим (Перегляд → Вивід).`,
 },
 {
 title: "Забудовник проти забудовника",
 content: `**Будівельник** запитує: «Цей док добре виглядає?»

**Розробник** запитує:
- Що відбувається, коли гравець натискає цю кнопку?
- Хто бачить зміни - всі чи тільки один гравець?
- Яке повідомлення чи звук підтверджує клацання?

**Luau** - це мова Roblox (як Lua). Scripts на **сервері** запускаються один раз протягом усієї гри - ідеально підходять для дверей, кнопок і балів, якими поділяються всі.`,
 },
 {
 title: "Типи скриптів - використовуйте правильний",
 content: `| Тип | Де він проходить | Використовуйте в уроці 1.4 |
|------|----------------|------------------|
| **Script** | Сервер | ✅ Так - натискайте кнопки |
| **LocalScript** | Пристрій одного гравця | ❌ Ще ні - інтерфейс і камера пізніше |

**Правило сьогодні:** розмістіть **Script** **всередині Parts**, яку ви натискаєте (дочірня Part).

**Ніколи** не розміщуйте логіку ігрового процесу лише на своєму комп’ютері - інші гравці її не побачать.`,
 },
 {
 title: "ClickDetector - перетворити **Part** на кнопку",
 content: `1. Select Part (золотий куб на док-станції чудово працює)
2. **Insert** → **ClickDetector** (має бути **нащадком** цієї Parts)
3. У Properties встановіть значення **MaxActivationDistance**\`32\`(стадів)

| Property | Значення |
|----------|---------|
| **MaxActivationDistance** | Як далеко клацання все ще працює |
| **MaxActivationDistance** | Занадто низько = важко натиснути; занадто високо = клацає здалеку |

Part має бути **прив’язаною**, видимою та мати назву\`ClickButton_Red\`(ні\`Part\`).

**Вправа (5 хв):** Додайте ClickDetector до однієї Parts. Поки що не створюйте Script - просто переконайтеся, що він відображається в розділі Part у Explorer.`,
 },
 {
 title: "Ваш перший Script - копіюйте і розумійте",
 content: `1. Виберіть ту саму Part (за допомогою ClickDetector)
2. **Insert** → **Script** (не LocalScript)
3. Видалити зразок коду. Вставте:\`\`\`lua
local part = script.Parent
local detector = part:WaitForChild("ClickDetector")

detector.MouseClick:Connect(function(player)
 print(player.Name .. " clicked the button!")
 part.BrickColor = BrickColor.new("Bright green")
end)
\`\`\`**Рядок за рядком:**
-\`local\`- створити змінну
-\`script.Parent\`- Part, що містить цей Script
-\`WaitForChild\`- зачекайте, поки ClickDetector існує (уникає помилок під час завантаження)
-\`Connect(function(player) ... end)\`- запускати код, коли хтось натискає
-\`print(...)\`- написати в **Output**
-\`BrickColor.new(...)\`- змінити колір Parts для всіх`,
 },
 {
 title: "Перевірте в Play - прочитайте вихід",
 content: `Натисніть **Play** (F5). Клацніть свою Part у 3D-виді.

**Output дані** повинні показувати:\`YourName clicked the button!\`Part має стати **Яскраво-зеленою**.

**Вправа (8 хв):** Натисніть 3 рази. Переконайтеся, що колір залишається зеленим, а вихід кожного разу показує ваше ім’я користувача.

**Зупиніть відтворення** перед тим, як знову редагувати Scripts - редагування в режимі реального часу під час відтворення спочатку викликає збентеження.`,
 },
 {
 title: "Налагодження червоних помилок у виводі",
 content: `| Повідомлення про помилку | Виправити |
|---------------|-----|
|\`ClickDetector is not a valid member\`| Name ClickDetector відсутня або неправильна - має бути точно\`ClickDetector\`|
|\`attempt to index nil\`| Script не всередині Part - перемістіть Script під Part |
|\`MouseClick is not a valid member\`| Ви використали **Part** без ClickDetector |
| Нічого не друкується | Не в режимі **Play** або клацніть занадто далеко - підвищте MaxActivationDistance |

**Звичка:** прочитайте **перший рядок** помилки, а потім перевірте дерево Explorer:\`Part → ClickDetector\`,\`Part → Script\`.`,
 },
 {
 title: "Апгрейд - звук при натисканні",
 content: `1. Виберіть Part → **Insert** → **Sound**
2. Назвіть його\`ClickSound\` 3. Встановіть **SoundId** у Toolbox → Audio (або відомий rbxassetid)
4. **Обсяг**\`0.5\`, **Зациклений** false

Додайте після колірної лінії у вашому Scripts:\`\`\`lua
local sound = part:FindFirstChild("ClickSound")
if sound then
 sound:Play()
end
\`\`\`**FindFirstChild** є безпечнішим, ніж WaitForChild, коли звук необов’язковий.

**Вправа (5 хв):** Клацніть = зелений колір + короткий звук. Ця комбінація називається **відчуттям гри**.`,
 },
 {
 title: "Три кнопки - один шаблон",
 content: `Ви створите **3 Parts**, кожна зі своїм власним ClickDetector + скриптом.

Скопіюйте шаблон; лише зміни:
- Part name та початок **BrickColor**
- Цільовий колір в\`BrickColor.new("...")\`- Додатково: змініть **Size** замість кольору на третій кнопці

**Упорядкуйте в Explorer:**\`Folder Interactives\`→\`ClickButton_Red\`,\`ClickCrystal_Blue\`,\`ClickSign_Wood\`**Контрольний список перед тренуваннями:**
- [ ] Я знаю, що Script міститься в Part
- [ ] Я можу відкрити Output та прочитати друковані повідомлення
- [ ] Я успішно протестував одну кнопку в Play`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Клацання нічого не робить у режимі редагування",
 explanation: "ClickDetector спрацьовує лише під час гри.",
 correctApproach: "Натисніть F5 (Play), потім клацніть Part у Viewport",
 },
 {
 mistake: "Використовується LocalScript замість Script",
 explanation: "LocalScript не працює частково так само для цього уроку.",
 correctApproach: "Видалити LocalScript; Insert → Script під Part",
 },
 {
 mistake: "Script знаходиться в робочій області, а не в Part",
 explanation: "script.Parent стає Workspace - неправильний об'єкт.",
 correctApproach: "Перетягніть Script на Part, щоб вона стала дочірньою",
 },
 {
 mistake: "Колір змінюється в Studio, але не для друзів",
 explanation: "Ви перевірили в соло - server Script правильний для всіх.",
 correctApproach: "Server Script у Part - правильний шаблон для спільних кнопок",
 },
 ],
 summary: "Ви додали ClickDetectors, написали свій перший server Script Luau, підключили MouseClick до друку та візуального зворотного зв’язку та налагодили Output - у той момент, коли ваш острів став інтерактивним.",
 practiceTask: {
 title: "Click magic - три острівні кнопки (~25 хв)",
 difficulty: "beginner",
 description: `**Мета: ** Три робочі інтерактивні елементи з різними ефектами.

### Налаштування (3 хв)
1. Відкрийте своє місце **Урок 1.3** (острів + док)
2. Створити Folder\`Interactives\`у Workspace

### Part A - Червона кнопка (8 хв)
1. Insert **Block** → Name:\`ClickButton_Red\`| BrickColor: яскраво-червоний | Anchored: **true**
2. Insert **ClickDetector** + **Script** (шаблон із теорії)
3. Після натискання: увімкніть **Яскраво-зелений** +\`print\`ім'я гравця

### Part B - Синій кристал (8 хв)
1. Insert **Sphere** → Name:\`ClickCrystal_Blue\`| Material: **Neon** | Anchored: **true**
2. ClickDetector + Script - при натисканні: **Яскраво-жовтий** + друк повідомлення
3. Додайте дочірній **Sound** за бажанням

### Part C - Дерев'яний знак (6 хв)
1. Insert **Block** → Name:\`ClickSign_Wood\`| розмір:\` 1, 4, 0.3\`| Material: **Wood**
2. Після натискання: змініть **Size** на\`1.5, 6, 0.3\`(вищий знак) + друк

### Перевірте та збережіть (4 хв)
1. **Play** - натисніть усі три; скріншот **Output** із 3 різними повідомленнями
2. **Файл → Зберегти в Roblox** →\`Lesson 1.4 - Click Magic\` 3. **Практика завершена** тут`,
 hints: [
 "Скопіюйте один робочий Script - змініть лише назви та рядки BrickColor",
 "MaxActivationDistance 32, якщо клацання надто вибагливі",
 "Зупиніть відтворення перед редагуванням Scripts",
 ],
 optionalChallenge: "Після того, як будь-яку кнопку було натиснуто 3 рази, установіть Lighting ClockTime на 0 (ніч).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Для кнопки, яку бачать усі, використовуйте...",
 options: [
 "LocalScript у StarterPlayer",
 "Script всередині Parts",
 "Тільки звук",
 "Terrain brush",
 ],
 correctAnswer: 1,
 explanation: "Server Script на Part працює для всіх гравців.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "ClickDetector має бути...",
 options: [
 "Дочірній елемент Parts, яку ви клацаєте",
 "Child of Lighting",
 "Брат Workspace",
 "Всередині ServerScriptService",
 ],
 correctAnswer: 0,
 explanation: "Батьки ClickDetector для інтерактивної Parts.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "script.Parent посилається на...",
 options: [
 "Гравець",
 "Об’єкт, усередині якого знаходиться скрипт",
 "Sky",
 "Веб-сайт Roblox",
 ],
 correctAnswer: 1,
 explanation: "Батьківський - Part, що містить Script.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "MouseClick запускається, коли...",
 options: [
 "Ви зберігаєте гру",
 "Гравець клікає **Part** у грі",
 "Ви вставляєте Terrain",
 "Студія відкривається",
 ],
 correctAnswer: 1,
 explanation: "Клацання виявляються в Play mode.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "print() записує в...",
 options: [
 "Explorer",
 "Output",
 "Properties",
 "Toolbox",
 ],
 correctAnswer: 1,
 explanation: "Output дані показують друк і помилки.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "WaitForChild(\"ClickDetector\") допомагає...",
 options: [
 "Змінити колір неба",
 "Уникайте помилок, якщо Child завантажується із запізненням",
 "Видалити місцевість",
 "Породження ворогів",
 ],
 correctAnswer: 1,
 explanation: "WaitForChild чекає, поки Child існуватиме.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Керує MaxActivationDistance...",
 options: [
 "Колір Parts",
 "Як далеко працюють кліки",
 "Гучність звуку",
 "Terrain Size",
 ],
 correctAnswer: 1,
 explanation: "Обмеження відстані для активації кліком.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Червоний вихідний текст зазвичай означає...",
 options: [
 "Успіх",
 "Помилка Script",
 "Додано нову Part",
 "Гра опублікована",
 ],
 correctAnswer: 1,
 explanation: "Помилки відображаються червоним у вихідних даних.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "BrickColor.new(\"Яскраво-зелений\")...",
 options: [
 "Видаляє Part",
 "Встановлює колір Parts",
 "Відкриває Roblox",
 "Додає місцевість",
 ],
 correctAnswer: 1,
 explanation: "BrickColor.new призначає попередньо встановлений колір.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 1.4 зберегти назву...",
 options: [
 "Урок 1.4 - Магія клацання",
 "Без назви",
 "Part",
 "Тест",
 ],
 correctAnswer: 0,
 explanation: "Використовуйте чіткі назви уроків для свого портфоліо.",
 },
 ],
 },
}

export const ukLesson15 = {
 lessonId: "lesson-roblox-1-5",
 moduleId: "module-01",
 order: 5,
 title: "1.5 - Sound та Atmosphere",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Додайте зациклені навколишні звуки та одноразові 3D-звуки",
 "Налаштуйте Lighting: час, яскравість і тіні",
 "Використовуйте Atmosphere та Sky для кінематографічного настрою",
 "Поєднайте Sound і Lighting для вишуканого острова",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Гравці **відчувають** ігри вухами та очима. Острів на заході сонця зі звуками хвиль перемагає тиху сіру карту.

**Хід уроку:**
1. **Теорія (40 хв)** - Sound + Lighting + Atmosphere
2. **Практика (~25 хв)** - настрій заходу сонця на вашому острові
3. **Вікторина (10 хв)** - проходження **70%**

Використовуйте своє місце **Урок 1.4 - Click Magic**. Перевірте за допомогою **Play** - багато змін Sound і Lighting найкраще перевіряти в Play.`,
 },
 {
 title: "Чому звук має значення",
 content: `| Без звуку | Зі звуком |
|--------------|------------|
| Клацання плоскі | Клацання задовольняють |
| Острів порожній | Острів відчуває себе живим |
| Важко пізнати успіх | Аудіо підтверджує дії |

**Сьогодні два види:**
1. **Навколишнє середовище** - зациклений фон (хвилі, вітер) - усе місце
2. **3D on Part** - голосніше, коли ви йдете близько (скрип доку, чайка)`,
 },
 {
 title: "Sound object - Properties",
 content: `**Insert → Sound** (Workspace для ambient або всередині Parts для 3D).

| Property | Порада |
|----------|-----|
| **SoundId** |\`rbxassetid://...\`з Toolbox → Audio |
| **Обсяг** | Ембіент:\`0.25\`-\` 0.45\`- клацання залишаються чутними |
| **Зациклений** | **true** для океану/вітру |
| **Гра** | **true** для попереднього перегляду в редагуванні (необов’язково) |
| **RollOffMaxDistance** | Як далеко поширюється 3D-звук (спробуйте\`80\`) |

Name звучить чітко:\`Ambient_Waves\`,\`Dock_Creak\`,\`Click_Chime\`.

**Вправа (6 хв):** Додавання петлі\`Ambient_Waves\`у Workspace. Натисніть Play і слухайте під час руху.`,
 },
 {
 title: "Lighting - час доби",
 content: `Виберіть **Lighting** у Explorer.

| Property | Ефект |
|----------|--------|
| **ClockTime** | Година 0-24 (\`14\`= полудень,\` 17.5\`= захід сонця,\` 0\`= опівночі) |
| **Яскравість** | Загальне світло (\`2\`-\` 3\`вдень) |
| **GlobalShadows** | **true** = реалістичні тіні |
| **OutdoorAmbient** | Відтінок кольору в тіньових областях |
| **Технологія** | **Майбутнє** або **ShadowMap** для сучасного вигляду |

**Налаштування заходу сонця (скопіюйте їх):**
- Час годинника:\`17.5\`- Яскравість:\` 2\`- GlobalShadows: **true**
- OutdoorAmbient: теплий персиковий/помаранчевий тон

**Вправа (5 хв):** Слайд ClockTime з 12 → 17,5 → 0 під час гри. Виберіть свій улюблений настрій.`,
 },
 {
 title: "Атмосфера - кінематографічний серпанок",
 content: `Клацніть правою кнопкою миші **Lighting** → Insert **Atmosphere**.

| Property | Стартові значення |
|----------|----------------|
| **Щільність** |\`0.3\`-\` 0.4\`(легкий серпанок) |
| **Зміщення** |\`0.25\`|
| **Колір** | Ніжний помаранчевий/рожевий на заході |
| **Розпад** | Злегка фіолетовий/блакитний горизонт |

**Atmosphere** робить віддалену Terrain м’якшою - професійні Obby використовують це на демо-картах.

**Попередження: ** щільність вище\`0.6\`може лагати на слабких ПК - починайте з низького.`,
 },
 {
 title: "Sky - необов'язкова поліроль",
 content: `**Lighting** може містити **Sky**.

- **StarCount** - видно вночі
- **SunAngularSize** - розмір сонячного диска
- Шість граней **Skybox** (Bk, Ft, Lf, Rt, Up, Dn) для власного неба

Для уроку 1.5 достатньо типового Sky + **Atmosphere**. Кастомні skybox — у модулі 10.

**Вправа (3 хв):** Встановіть годинник\`0\`, перевірте зірочки. Повернутися до\` 17.5\`для практики.`,
 },
 {
 title: "Пов’яжіть звук зі своїм Script клацання",
 content: `З уроку 1.4 розширте Script клацання:\`\`\`lua
local part = script.Parent
local detector = part:WaitForChild("ClickDetector")
local sound = part:FindFirstChild("ClickSound")

detector.MouseClick:Connect(function(player)
 if sound then
 sound:Play()
 end
end)
\`\`\`**Play()** перезапускає одноразові звуки. Навколишні цикли залишаються **Looped = true** і **Playing = true**.

Не складайте 5 гучних ембієнтів - достатньо одного лупа + однієї 3D деталі.`,
 },
 {
 title: "Контрольний список змішування - перед практикою",
 content: `**Збалансований острівний звук:**
- [ ] Один навколишній цикл ≤ 0,45 гучності
- [ ] Звуки клацання ≤ 0,6 гучності
- [ ] Звук 3D док-станції чутно, лише коли поблизу док-станції
- [ ] Відповідність Lighting + Atmosphere (захід сонця + теплий серпанок)
- [ ] Збережена запланована назва місця:\`Lesson 1.5 - Island Atmosphere\`**FAQ:** Немає звуку? - дійсний SoundId, Volume > 0, перевірити в Play. Рожеве небо? - скинути Sky або вимкнути зламані обличчя skybox.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "П'ять ембієнтних треків на повній гучності",
 explanation: "Кліп шарів і звук каламутний.",
 correctApproach: "Один цикл навколишнього середовища + додаткова тиха музика на 0,15 гучності",
 },
 {
 mistake: "SoundId порожній або несправний",
 explanation: "Недійсний ідентифікатор активу не відтворює нічого.",
 correctApproach: "Виберіть аудіо з Toolbox або вставте відомий номер rbxassetid",
 },
 {
 mistake: "Atmosphere робить гру лаговою",
 explanation: "Зависока щільність для пристрою.",
 correctApproach: "Зменшити щільність до 0,25-0,35",
 },
 {
 mistake: "ClockTime змінено лише в Редагуванні, ніколи в Грах",
 explanation: "Деякі студенти забувають пройти тестування на заході сонця.",
 correctApproach: "Тестовий прохід від відродження до причалу в ClockTime 17.5",
 },
 ],
 summary: "Ви створили ambient і 3D Sound, налаштували Lighting для заходу сонця, додали Atmosphere та підключили аудіо до click Scripts - тепер ваш острів виглядає професійним, а не прототипом.",
 practiceTask: {
 title: "Атмосфера острова на заході сонця (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Єдиний цілісний настрій заходу сонця зі звуком.

### Part A - Навколишнє аудіо (7 хв)
1. Insert **Sound** у Workspace → Name:\`Ambient_Waves\` 2. SoundId: океан або природа з Toolbox | обсяг:\` 0.35\`| Зациклено: **true** | Грає: **true**

### Part B - Lighting та Atmosphere (8 хв)
1. Виберіть **Lighting** → ClockTime:\`17.5\`| Яскравість:\` 2\`| GlobalShadows: **true**
2. Insert **Atmosphere** під Lighting | Щільність:\`0.35\`| теплий відтінок кольору
3. **Play** - ікру → док → ватерлінія

### Part C - 3D звук док-станції (6 хв)
1. На док-станції Part: **Sound**\`Dock_Creak\`| Зациклений: **false** | RollOffMaxDistance:\` 60\` 2. Підключіть **Play()** зі Script клацання уроку 1.4 АБО торкніться Proximity пізніше
3. Тиха гучність (\`0.4\`), тому навколишнє середовище залишається основним

### Перевірте та збережіть (4 хв)
1. **Play** - навколишнє середовище всюди; гучніший звук док-станції, коли вона наближена
2. **Файл → Зберегти в Roblox** →\`Lesson 1.5 - Island Atmosphere\` 3. **Практика завершена**`,
 hints: [
 "Перевірте ClockTime у Play під час ходьби - зміни настрою відчуваються реально",
 "Знизьте навколишнє середовище, якщо звуки клацання важко почути",
 "**Atmosphere** Color має відповідати заходу сонця (помаранчевий/рожевий, не neon-green)",
 ],
 optionalChallenge: `Другий ембієнтний трек (тиха музика) на гучності\` 0.15\`- дві петлі разом.`,
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Зациклені навколишні звуки зазвичай звучать...",
 options: [
 "Workspace",
 "Тільки всередині голови гравця",
 "Вікно виводу",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Світовий ембієнт часто живе в Workspace.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "ClockTime 17.5 найближче до...",
 options: [
 "опівночі",
 "Захід сонця",
 "полудень",
 "Тільки світанок",
 ],
 correctAnswer: 1,
 explanation: "17-18 годин виглядає як пізній день/захід сонця.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Atmosphere **Density** керує...",
 options: [
 "Script speed",
 "Fog/haze thickness",
 "Part Size",
 "Jump height",
 ],
 correctAnswer: 1,
 explanation: "**Density** додає haze в **Atmosphere**.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "3D Sound на Part голосніший, коли...",
 options: [
 "Гравець далеко",
 "Гравець знаходиться біля Parts",
 "Гра збережена",
 "Небо видалено",
 ],
 correctAnswer: 1,
 explanation: "RollOff робить обсяг на основі відстані.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "GlobalShadows true дає...",
 options: [
 "Голосніше аудіо",
 "Більш реалістичні тіні",
 "Безкоштовний Robux",
 "No Terrain",
 ],
 correctAnswer: 1,
 explanation: "GlobalShadows дозволяє відтворювати тіні.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Гучність навколишнього середовища зазвичай має бути...",
 options: [
 "1.0 завжди",
 "Низький (0,25-0,45)",
 "Нуль",
 "Негативний",
 ],
 correctAnswer: 1,
 explanation: "Спокійне середовище залишає простір для ефектів.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Sound:Play() використовується для...",
 options: [
 "Одноразовий або повторний звук",
 "Видалення Parts",
 "Анкерування",
 "Видавництво",
 ],
 correctAnswer: 0,
 explanation: "Play починає відтворення на Instanceу Sound.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Lighting живе в Explorer під...",
 options: [
 "Тільки робочий простір",
 "Lighting service",
 "Гравці",
 "ReplicatedStorage",
 ],
 correctAnswer: 1,
 explanation: "Lighting - це власний сервіс вищого рівня.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Немає звуку - спочатку перевірте...",
 options: [
 "Дійсний ідентифікатор звуку та гучність > 0",
 "Видалити всі Scripts",
 "Delete Atmosphere",
 "Змінити мову",
 ],
 correctAnswer: 0,
 explanation: "Зламаний або порожній SoundId є основною причиною.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 1.5 зберегти назву...",
 options: [
 "Урок 1.5 - Атмосфера острова",
 "Натисніть Магія",
 "Part 3",
 "Модуль 12",
 ],
 correctAnswer: 0,
 explanation: "Установіть відповідність зі схемою назви портфоліо уроку.",
 },
 ],
 },
}

export const ukLesson16 = {
 lessonId: "lesson-roblox-1-6",
 moduleId: "module-01",
 order: 6,
 title: "1.6 - Checkpoint: Острів живе",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Об’єднайте Terrain, док-станцію, Scripts, Sound і Lighting в одному центрі",
 "Додайте SpawnLocation і запустіть контрольний список якості",
 "Представте Модуль 1 як зону появи живого острова",
 "Підготуватися до модуля 2 obby mechanics",
 "Повторіть класичні ідеї програмування: змінні, if, print і зворотні виклики подій",
 ],
 theory: {
 sections: [
 {
 title: "Контрольна точка модуля 1 (близько 40 хвилин)",
 content: `Це **важлива контрольна точка портфоліо** - не нова тема, але **відполірована з доказами**, що ви можете опублікувати невеликий світ.

**Ви вже створили:**
- **1.1** - Parts, Studio, збереження
- **1.2** - Island Terrain
- **1.3** - Док, folders, model
- **1.4** - Скрипти ClickDetector
- **1.5** - Звук + настрій заходу сонця

**Сьогодні:** один **Living Island Hub** готовий до модуля 2 obby.`,
 },
 {
 title: "Як виглядає «зроблено».",
 content: `Відвідувач натискає Play і думає:
- «Я знаю, де спаун».
- «Я можу ходити, не провалюючись крізь підлогу».
- "Щось реагує, коли я клацаю."
- «Це місце має настрій (звук + світло).»

Ваше завдання: виправити все, що псує перше враження.`,
 },
 {
 title: "Головний контрольний список - світ",
 content: `**Terrain і простір**
- [ ] На острові є трава, пісок, скелі - жодних випадкових гігантських ям
- [ ] Рівень води виглядає навмисним (не затоплення породи)
- [] **SpawnLocation** на рівній землі (не у воді)

**Будівля**
- [ ] Folder\`Dock\`(або подібні) з назвами моделей/spawn Parts
- [ ] **8+** Загальна кількість декоративних Parts (дошки, лампи, вивіски, дерева)
- [ ] Усі статичні Parts **Anchored true**

**Взаємодія**
- [ ] **3** інтерактивні елементи з різними ефектами (колір, розмір, звук...)
- [ ] **Output** показує ім’я гравця принаймні за один клік

**Настрій**
- [ ] Петля навколишнього середовища + Lighting ClockTime + Atmosphere
- [ ] Повний цикл ходьби перевірено в Play (спаун → док → пляж)`,
 },
 {
 title: "SpawnLocation - де з'являються гравці",
 content: `**Insert → SpawnLocation** на безпечному пляжі або платформі доку.

| Property | Пропонований |
|----------|-----------|
| **Size** |\`6, 1, 6\`|
| **BrickColor** | Яскраво-зелений або блакитний (видимий) |
| **Anchored** | true |
| **Neutral** | true (будь-який гравець може породжуватися) |
| **Позиція Y** | Трохи над поверхнею Terrain - не підрізаючи всередині підлоги |

**Вправа (8 хв.):** Розмістіть SpawnLocation, Play - на ньому має з’явитися character. Переміщайте його, доки spawn не стане природним обличчям до доку.`,
 },
 {
 title: "Вітальний знак - хаб привітання",
 content: `Біля спауну додайте Part **Sign_Welcome** + ClickDetector + Script + необов’язковий **WelcomeSound**:\`\`\`lua
local part = script.Parent
local detector = part:WaitForChild("ClickDetector")
local sound = part:FindFirstChild("WelcomeSound")

detector.MouseClick:Connect(function(player)
 print("Welcome to " .. player.Name .. "'s island hub!")
 if sound then
 sound:Play()
 end
end)
\`\`\`Пізніші модулі замінюються\`print\`з графічним інтерфейсом користувача на екрані. Для модуля 1 достатньо підтвердження результату.`,
 },
 {
 title: "Дослідник гігієна - вразити вчителів",
 content: `Пошук поганих імен: **Ctrl+Shift+F** → знайти\`Part\`без номерів.

**Дерево цілей:**\`Workspace\`-\`Terrain\`-\`SpawnLocation\`-\`Dock\`(Folder)
-\`Interactives\`(Folder)
-\`Ambient_Waves\`(Sound)
-\`Lighting\`(з **Atmosphere**)

Видаліть порожні Folders та повторювані тестові блоки.`,
 },
 {
 title: "Тестовий Script (5 хвилин)",
 content: `Натисніть **Play** і виконайте наступні дії:
1. Спаун на **SpawnLocation** - не під водою
2. Пройдіть до доку - без падіння через дошки
3. Клацніть усі 3 інтерактивні елементи - подивіться/почуйте відгук
4. Пройдіться береговою лінією - чутно навколишнього середовища, не гучно до крові
5. **Зупинити** - виправити одну проблему, якщо щось не вдалося

Повторюйте, поки не пройдуть усі п’ять. **Тоді** збережіть.`,
 },
 {
 title: "Основи програмування - міст до модуля 2",
 content: `У **1.4** ви вже написали код, але Модуль 2 додає перевірки **touch (Touched)** і **if**. Перед складними скриптами - 5 класичних ідей, які є в кожній мові (Python, JavaScript, Luau).

**1. Змінні (\`local\`)** - іменований ящик:\`\`\`lua
local playerName = "Alex"
local jumpPower = 50
\`\`\`-\`local\`= змінна лише в цьому Scripts
- Значущі імена:\`killBlock\`, ні\`x\`- У Roblox ви часто зберігаєте об'єкт:\`local part = script.Parent\`**2. Текст і цифри** -\`print\`і конкатенація:\`\`\`lua
print("Game started")
print("Player: " .. playerName)
\`\`\`-\`..\`об’єднує текст (наприклад, + для рядків у Python)

**3.\`if\`умови** - гра запитує так/ні:\`\`\`lua
local health = 0

if health <= 0 then
 print("Player lost")
end
\`\`\`-\`if ... then\`- якщо true, запустити блок
-\`end\`закриває блок (не забудьте!)
- Порівняння:\`<\`,\`>\`,\`==\`,\`<=\`(два\`==\`за рівність)

**4. Події (зворотні виклики)** - "коли відбувається X, виконайте Y":\`\`\`lua
detector.MouseClick:Connect(function(player)
 print(player.Name .. " clicked")
end)
\`\`\`-\`Connect(function ... end)\`- Студія називає це **для вас** у потрібний час
- Ви не викликаєте вручну - ви **підписуєтеся** на подію

**5. Перевірки безпеки (\`nil\`)** - "чи існує цей об'єкт?":\`\`\`lua
local sound = part:FindFirstChild("ClickSound")

if sound then
 sound:Play()
end
\`\`\`- Якщо дочірній об'єкт зник у Explorer, \`FindFirstChild\` повертає \`nil\` - \`if sound then\` запобігає червоним помилкам у Output

**Міні-вправа (7 хв):** у будь-якому Scripts від 1.4 дод\`print("Condition test")\`і\`if true then print("if works") end\`. Play → підтвердити. Результат показує обидва рядки.`,
 },
 {
 title: "Що змінюється в модулі 2",
 content: `| Урок 1.4 (натисніть) | Модуль 2 (сенсорний) |
|---------------------|------------------|
|\`MouseClick\`|\`Touched\`|
| Ви клацаєте мишкою | Character **наступає** на Part |
| Змінити колір | часто\`Humanoid.Health = 0\`|

Складність зростає **крок за кроком**:
1. **2.1** - перший\`print\`на дотик, потім повний Script знищення
2. **2.4** - офіційний\`if / elseif / else\`для рангів S/A/B

Вам не потрібно зараз «знати все». Достатньо, щоб зрозуміти **змінні**, **if**, **print** тощо\`Connect\`означає "запустити це на події".`,
 },
 {
 title: "Зберегти, документ, попередній перегляд модуля 2",
 content: `**Файл → Зберегти в Roblox** →\`Module 1 - Living Island\`У блокноті (або коментарі в Студії):
- Ти пишаєшся одним
- Сьогодні ви виправили одну помилку
- Одна ідея модуля 2 (лавовий шлях? рухома платформа?)

**Попередній перегляд модуля 2:** вбивайте блоки, контрольні точки, таймери - ваш острів стає **початком** obby. Збережіть цей файл місця - ви його розширите.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Нереститься у воді або порожнечі",
 explanation: "SpawnLocation Y занадто низько або всередині води Terrain.",
 correctApproach: "Підняти SpawnLocation; тестувати в грі після кожного ходу",
 },
 {
 mistake: "Забув зберегти після полірування checkpoint",
 explanation: "Втратив роботу з попередніх уроків.",
 correctApproach: "Збережіть у Roblox із назвою модуля 1, перш ніж позначити завершення",
 },
 {
 mistake: "Лише один клікабельний досі працює",
 explanation: "Scripts скопійовано, але батьківський елемент помилився після групування.",
 correctApproach: "Кожен Script має бути дочірнім для своєї Parts з ClickDetector",
 },
 {
 mistake: "Надто темно, щоб побачити док",
 explanation: "ClockTime 0 без лампи.",
 correctApproach: "Захід сонця 17.5 або додайте неонову лампу з уроку 1.3",
 },
 ],
 summary: "Ви об’єднали всі навички Модуля 1 в один живий острівний центр із SpawnLocation, інтерактивами, Sound, Lighting і чистим Explorer - готові до першого obby в Модулі 2.",
 practiceTask: {
 title: "Контрольна точка - Living Island Hub (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** Пройти кожен пункт головного контрольного списку.

### Part A - Виправити світ (12 хв)
1. Запустіть контрольний список - Terrain, вода, Anchored Parts
2. Insert **SpawnLocation** на безпечному місці | тестовий спаун у Play
3. Перейменувати бродячих\`Part\`об’єктів у Explorer

### Part B - Інтерактивні елементи та док-станція (12 хв)
1. Підтвердьте **3 інтерактивні елементи** в папці\`Interactives\` 2. Підтвердьте Folder **Dock** із model та 6+ дошками/реквізитами
3. Закріпіть будь-які прохідні або плаваючі дошки

### Part C - Настрій і привітання (10 хв)
1. Навколишнє середовище + Lighting + Atmosphere з уроку 1.5
2. Додайте **Sign_Welcome** із клацанням + друк + додатковий звук
3. Повний **тестовий скрипт** з теорії (5 кроків)

### Фініш (6 хв)
1. **Файл → Зберегти в Roblox** →\`Module 1 - Living Island\` 2. **Практику завершено** - необов’язково: 2-хвилинна екскурсія з записом екрана для вашого вчителя`,
 hints: [
 "Спочатку виправте spawn - потім все простіше",
 "Ctrl+D дублює дошки для швидкого додавання прикрас",
 "Один цілеспрямований Play-тест виявляє 90% проблем",
 ],
 optionalChallenge: "Міст із 5+ Parts до невеликого другорядного пагорба (відніміть місцевість для міні-острова).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Основна мета контрольної точки модуля 1 - це...",
 options: [
 "Вивчайте лише ландшафт",
 "Відполіруйте один повний острівний центр",
 "Опублікувати на ринку",
 "Видалити всі Scripts",
 ],
 correctAnswer: 1,
 explanation: "Урок 1.6 об’єднує всі навички модуля 1.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "SpawnLocation має бути розміщено...",
 options: [
 "Під водою",
 "На безпечній рівній землі",
 "Тільки в небі",
 "Всередині Script",
 ],
 correctAnswer: 1,
 explanation: "Гравцям потрібна дійсна точка появи.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Нейтральне значення true на SpawnLocation означає...",
 options: [
 "Відсутність нересту",
 "Будь-яка команда може породжуватися",
 "Видаляє місцевість",
 "Додає платний доступ",
 ],
 correctAnswer: 1,
 explanation: "Нейтральний дозволяє всім гравцям використовувати його.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Модуль 1 має включати скільки клікабельних елементів?",
 options: [
 "0",
 "1",
 "3",
 "50",
 ],
 correctAnswer: 2,
 explanation: "Три інтерактивні елементи були зібрані в 1.4 і перевірені тут.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Організований док використовує...",
 options: [
 "Folder і model",
 "Лише Parts без назв",
 "Without Anchored",
 "Тільки SoundService",
 ],
 correctAnswer: 0,
 explanation: "Folders та model забезпечують чистоту Explorerа.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Навколишній звук має бути...",
 options: [
 "Дуже тихий і зациклений",
 "Том 2.0 тільки один раз",
 "Всередині each Part на макс",
 "Вимкнено",
 ],
 correctAnswer: 0,
 explanation: "Низький зациклений ембієнт є стандартним.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Перш ніж позначити завершення, ви повинні...",
 options: [
 "Повна петля ходьби",
 "Видалити місцевість",
 "Видалити SpawnLocation",
 "Ніколи не економте",
 ],
 correctAnswer: 0,
 explanation: "Play-test перевіряє роботу концентратора.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Модуль 2 додасть переважно...",
 options: [
 "Обби небезпеки і контрольні точки",
 "Тільки скайбокси",
 "Оплата рахунку",
 "Редагування відео",
 ],
 correctAnswer: 0,
 explanation: "Модуль 2 знайомить з механікою obby.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Остаточна назва збереження для модуля 1...",
 options: [
 "Модуль 1 - Живий острів",
 "Без назви",
 "Тільки урок 1.1",
 "Тест",
 ],
 correctAnswer: 0,
 explanation: "Checkpoint використовує назву портфоліо Module 1.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Ctrl+Shift+F у Explorer допомагає...",
 options: [
 "Знайди предмети за назвами",
 "Летіть швидше",
 "Змінити BrickColor",
 "Додайте Robux",
 ],
 correctAnswer: 0,
 explanation: "Пошук знаходить випадки з поганими назвами.",
 },
 ],
 },
}
