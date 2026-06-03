/** Rich UK content for Roblox Module 06 - AUTO from EN via gen-roblox-lessons-uk.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson61 = {
 lessonId: "lesson-roblox-6-1",
 moduleId: "module-06",
 order: 1,
 title: "6.1 - Машина з нуля",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть model StarterCar із шасі, колесами та VehicleSeat",
 "Приєднайте Parts за допомогою WeldConstraint",
 "Налаштуйте MaxSpeed, Torque і TurnSpeed для початківців",
 "Випробуйте стійкість на рівному місці",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Модуль 6 - Швидше, вище, далі** - ви створюєте **керований автомобіль**, потім трасу, потім таймер.

**Хід уроку:**
1. **Теорія (40 хв)** - Сидіння автомобіля + зварні шви
2. **Практика (~25 хв)** - StarterCar, яким ви можете керувати
3. **Вікторина (10 хв)** - проходження **70%**

Нове місце: **Baseplate** або рівна зона на вашому острові →\`Lesson 6.1 - Starter Car\`.`,
 },
 {
 title: "Потрібні Деталі машини, які потрібні",
 content: `| Part | Роль |
|------|------|
| **Шасі** | Основний корпус (важкий, низький) |
| **4 колеса** | Дотик до землі, зоровий |
| **VehicleSeat** | Гравець сидить тут - керує машиною |

**Model**\`StarterCar\`у Workspace (пізніше перейдіть до\`ReplicatedStorage\`для нересту).

**Не звичайне сидіння** - VehicleSeat має вбудовану дросельну заслінку та кермо.`,
 },
 {
 title: "Побудуйте шасі та колеса",
 content: `**Шасі:**
- Блокувати\`6, 1, 10\`стадів
- Material Метал, сірий
- Ім'я\`Chassis\`**Колеса (4):**
- Розмір\`2, 2, 1\`- Форма циліндра (поворот на 90°) або блок
- Імена\`Wheel_FL\`,\`Wheel_FR\`,\`Wheel_RL\`,\`Wheel_RR\`- Розмістіть по кутах, трохи нижче шасі

**Вправа (10 хв):** Згрупуйте всі Parts в model\`StarterCar\`- Move tool на всю model.`,
 },
 {
 title: "WeldConstraint - склеюємо деталі",
 content: `Кожне колесо → **WeldConstraint** до шасі:

1. Виберіть колесо + шасі
2. **Створити** → WeldConstraint (або меню Constraint)
3. Повторіть для всіх 4 коліс
4. **VehicleSeat** на верхній Part шасі - приварити до шасі\`\`\`lua
-- Optional: script verifies welds exist
for _, w in ipairs(car:GetDescendants()) do
 if w:IsA("WeldConstraint") then
 print("Weld ok:", w.Parent.Name)
 end
end
\`\`\`**Перед поїздкою:** від’єднайте **колеса та шасі** (VehicleSeat від’єднає автомобіль, коли він зайнятий).`,
 },
 {
 title: "Тюнінг сидінь автомобіля",
 content: `Виберіть **VehicleSeat** - Properties:

| Property | Початковий старт |
|----------|----------------|
| **MaxSpeed** | 40-60 |
| **Крутний момент** | 2-4 |
| **Швидкість повороту** | 1-2 |
| **Material сидіння** | Тканина або пластик |

**Занадто швидко** = врізається в стіни. **Занадто повільно** = нудна траса.

**Вправа (5 хв):** Play → сядьте на місце (натисніть на сидіння або зайдіть у машину) → WASD або клавіші зі стрілками, щоб керувати.`,
 },
 {
 title: "Поради щодо стабільності",
 content: `**Перевертається?**
- Нижнє шасі (широке та плоске)
- Розставте колеса ширше
- Опустіть **CenterOfMass** - вставте Attachment + set у шасі (розширений) або зберігайте низьку масу зверху

**Колеса відпадають?**
- Відсутнє WeldConstraint
- Parts все ще Anchored окремо неправильно

**Не можете зайняти місце?**
- Сидіння не зварене / плаває
- Інша Part блокує сидіння

**Контрольний список тест-драйву:**
- [ ] Вперед і назад
- [ ] Поворот ліворуч/праворуч
- [ ] Гальмо (S або нижній дросель)`,
 },
 {
 title: "Збірний на потім",
 content: `Коли автомобіль працює:
1. Рухатися\`StarterCar\`до **ReplicatedStorage**
2. Клонуйте для початку відстеження на Уроці 6.2

Або поки що залиште в робочій області під час появи.

**CanCollide** на колесах true; шасі справжнє.

**Контрольний список перед тренуваннями:**
- [ ] Model StarterCar з 6 деталей + зварні шви
- [ ] Можна керувати в Play без відпадання деталей
- [ ] Зберегти:\`Lesson 6.1 - Starter Car\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Використання Seat замість VehicleSeat",
 explanation: "Сидіння не приводить в рух колеса.",
 correctApproach: "VehicleSeat для авто",
 },
 {
 mistake: "Забув зварити колеса",
 explanation: "Колеса відкочуються під час руху автомобіля.",
 correctApproach: "WeldConstraint кожне колесо до шасі",
 },
 {
 mistake: "Все Anchored true",
 explanation: "Автомобіль не може рухатися.",
 correctApproach: "Від’єднайте Parts автомобіля для фізики",
 },
 {
 mistake: "MaxSpeed 200 для першого тесту",
 explanation: "Неконтрольоване для учнів.",
 correctApproach: "Почніть 40-60 MaxSpeed",
 },
 ],
 summary: "Ви створили StarterCar із шасі, чотирма звареними колесами та налаштованим VehicleSeat - вашим першим керованим транспортним засобом, готовим до гоночної траси на наступному уроці.",
 practiceTask: {
 title: "Збірка StarterCar (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Один стабільний автомобіль, яким можна керувати.

### Part A - Тіло (10 хв)
1. Model\`StarterCar\`- шасі + 4 колеса розташовані
2. Сидіння транспортного засобу зверху, приварене

### Part B - Налаштування (10 хв)
1. Максимальна швидкість ~50, Крутний момент ~3, Швидкість повороту ~1,5
2. Грайте - проведіть 30 секунд на опорній плиті
3. Виправити перекидання / від’єднання коліс

### Part C - Зберегти (5 хв)
1. Перейдіть до ReplicatedStorage за бажанням
2. **Зберегти в Roblox** →\`Lesson 6.1 - Starter Car\` 3. **Практика завершена**`,
 hints: [
 "Зваріть перед роз’єднанням для остаточного випробування",
 "Якщо дика фізика, спочатку зменшіть MaxSpeed наполовину",
 "Сядьте в VehicleSeat, клацнувши його в Play",
 ],
 optionalChallenge: "Script перемикає безпечні (повільні) та швидкі налаштування сидінь.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Керовані автомобілі використовують…",
 options: [
 "VehicleSeat",
 "Тільки SpawnLocation",
 "ClickDetector",
 "Рельєф місцевості",
 ],
 correctAnswer: 0,
 explanation: "VehicleSeat має входи приводу.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "WeldConstraint…",
 options: [
 "Жорстко з’єднує Parts",
 "Додає монети",
 "Зберігає DataStore",
 "Вбиває гравця",
 ],
 correctAnswer: 0,
 explanation: "Зберігає колеса на шасі.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Управління MaxSpeed…",
 options: [
 "Максимальна швидкість водіння",
 "Висота стрибка",
 "Вартість монети",
 "Колір неба",
 ],
 correctAnswer: 0,
 explanation: "Property сидіння для обмеження швидкості.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Anchored правду на водінні автомобіля...",
 options: [
 "Перешкоджає руху",
 "Потрібний завжди",
 "Додає HP",
 "Відкриває інтерфейс користувача",
 ],
 correctAnswer: 0,
 explanation: "Фізиці потрібні unAnchored Parts.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "StarterCar має бути…",
 options: [
 "Model",
 "Лише Script",
 "Тільки звук",
 "атмосфера",
 ],
 correctAnswer: 0,
 explanation: "Збірний збірний автомобіль.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Широке низьке шасі допомагає…",
 options: [
 "Запобігання перевертання",
 "Видалити трек",
 "Зняти сидіння",
 "Банити гравців",
 ],
 correctAnswer: 0,
 explanation: "Стабільність.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Модуль 6 фокусується на…",
 options: [
 "Перегони",
 "Тільки бойові",
 "Тільки магнат",
 "Видавництво",
 ],
 correctAnswer: 0,
 explanation: "Модуль гонок.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Чотири колеса для…",
 options: [
 "Стійкість і зовнішній вигляд",
 "Тільки політ",
 "Плавання",
 "інтерфейс користувача",
 ],
 correctAnswer: 0,
 explanation: "Компонування автомобіля.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Крутний момент впливає на...",
 options: [
 "Потужність прискорення",
 "Таблиця лідерів",
 "Підрахунок кіл",
 "Сума лікування",
 ],
 correctAnswer: 0,
 explanation: "Property приводу сидінь.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 6.1 зберегти назву…",
 options: [
 "Урок 6.1 - Стартер автомобіля",
 "Арена готова",
 "гоночна траса",
 "Tycoon Works",
 ],
 correctAnswer: 0,
 explanation: "Урок збереження автомобіля.",
 },
 ],
 },
}

export const ukLesson62 = {
 lessonId: "lesson-roblox-6-2",
 moduleId: "module-06",
 order: 2,
 title: "6.2 - Траса",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Створіть зрозумілу схему зі стартовою лінією та бар’єрами",
 "Створюйте модульні сегменти колії з постійною шириною смуги",
 "Розмістіть ворота КПП і вказівники",
 "Перевірте п’ять кіл на керованість",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Машина без колії - стоянка. Сьогодні ви будуєте **ланцюг**, який ваш StarterCar може проїхати.

**Хід уроку:**
1. **Теорія (40 хв)** - проектування доріжки
2. **Практика (~25 хв)** - перший контур
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 6.1 - Стартер автомобіля**.`,
 },
 {
 title: "Зрозумілий дизайн доріжки",
 content: `Хороші траси для новачків мають:

| Особливість | Чому |
|---------|-----|
| **Широкі смуги** | Відновлення після помилок |
| **Очистити початок** | Кожен знає, з чого почати |
| **Огородження** | Без падіння з острова |
| **М’які повороти** | Матч автомобіля TurnSpeed |

**Уникайте:** стадів на MaxSpeed 60, вузькі мости перша версія.`,
 },
 {
 title: "Модульні сегменти",
 content: `Folder\`Track\`:\`Straight_32\`- 32 stud Part дороги\`Turn_45\`- Вигин 45°\`Turn_90\`- Вигин 90°

**Дублювати** сегменти - прив’язати за допомогою сітки переміщення **4 стади**.

**Дорога:** темний колір асфальту,\`Anchored true\`, невеликий підйом по краях для бордюрів.

**Ширина смуги:** **16-20 стадів** мінімум для StarterCar.`,
 },
 {
 title: "Стартова лінія та бар'єри",
 content: `**StartLine** - білі неонові Parts по ширині колії.

**Бар'єри:**
- Червоні неонові стіни лише на **зовнішніх** краях
- **Anchored true**, CanCollide true
- Висота\`3-4 studs\`- зупиняє автомобілі, що з'їжджають з колії

**Зона відновлення: ** дуже рівний асфальт поза крутими поворотами.

**Вправа (8 хв):** Поставте StarterCar на StartLine - проїдьте одне коло повільно.`,
 },
 {
 title: "КПП і знаки",
 content: `Розмістіть **3-4** Parts воріт\`CP_1\`,\`CP_2\`,\`CP_3\`навколо колін:
- Neon арки над доріжкою
- Пронумеровано на знаку
- **CanCollide false** (проїзд)

**Стрілки** на землі перед заплутаними поворотами.

Вони готують **Урок 6.5** перевірку кола - сьогодні лише візуально.

**Знак неправильного шляху** необов’язковий на ділянках з одностороннім рухом.`,
 },
 {
 title: "Ігровий тест із п’яти кіл",
 content: `**Ви** проїжджаєте 5 кіл:

| Перевірте | Пас? |
|-------|-------|
| Повне коло без виходу з траси | |
| Ніяких застрягань на швах | |
| Справедливо працює на поточній MaxSpeed | |
| Бар'єри перестають злітати з карти | |
| Весело їздити на повторних колах | |

**Виправте геометрію** перед таймерами в 6.3 - не налаштовуйте таймер на несправну доріжку.`,
 },
 {
 title: "Розміщення автомобіля на трасі",
 content: `Парк\`StarterCar\`на StartLine:
- Обличчям до першої черги
- Трохи перед лінією (чесний старт)

Пізніше: клонувати з ReplicatedStorage на старті гонки.

**Структура папок:**\`Workspace/Track/\`- всі Parts дороги\`Workspace/Track/Props/\`- знаки, ворота КП`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [] Повний контур (без тупиків)
- [ ] StartLine + 3 видимі контрольні точки
- [ ] Тест із 5 кіл зроблено, нотатки написані
- [ ] Зберегти:\`Lesson 6.2 - Race Track\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Доріжка занадто вузька",
 explanation: "Розчарування для нових водіїв.",
 correctApproach: "Колія шириною 16+ стадів",
 },
 {
 mistake: "Розриви між Parts дороги",
 explanation: "Розлітається або зачіпляється автомобіль.",
 correctApproach: "Прив'язка сітки, злегка перекриття",
 },
 {
 mistake: "Жодних перешкод на краю скелі",
 explanation: "Машини падають назавжди.",
 correctApproach: "Стіни на небезпечних сторонах",
 },
 {
 mistake: "Колія незамкнута",
 explanation: "Немає концепції колін.",
 correctApproach: "Схема повертається до початку",
 },
 ],
 summary: "Ви спроектували модульну гоночну трасу зі стартовою лінією, бар’єрами, воротами контрольних точок і пройшли п’ятиколовий тест драйву - траса готова до наступного уроку.",
 practiceTask: {
 title: "Перший контур (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** замкнутий цикл із напрямними, який можна проїхати.

### Part A - Макет (12 хв)
1. Folder\`Track\`- пряма + 2 поворотні види
2. Замкнутий контур ~60-120 периметр у стадах
3. Лінія старту в зоні старту/фінішу

### Part B - Безпека та посібники (8 хв)
1. Зовнішні бар'єри на небезпечних краях
2. Ворота КП_1, КП_2, КП_3 + 2 знаки-стрілки

### Part C - Перевірка та збереження (5 хв)
1. П'ять кіл - виправте застряглі місця
2. **Зберегти в Roblox** →\`Lesson 6.2 - Race Track\` 3. **Практика завершена**`,
 hints: [
 "Перше коло проїдьте повільно, щоб відчути ширину",
 "Підняті бордюри допомагають бачити краю колії",
 "Однакова висота дороги для всіх сегментів",
 ],
 optionalChallenge: "Ризикований швидкий шлях - швидший, але вужчий.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Гоночна траса має бути…",
 options: [
 "Замкнене коло",
 "Тільки один прямий",
 "Порожня Baseplate",
 "Під водою",
 ],
 correctAnswer: 0,
 explanation: "Круги потребують петлі.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Широкі смуги допомагають...",
 options: [
 "Відновлення від помилок",
 "Видалення автомобіля",
 "Більше лави",
 "Немає інтерфейсу користувача",
 ],
 correctAnswer: 0,
 explanation: "Пробачливий дизайн.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Бар'єри на зовнішніх краях…",
 options: [
 "Зупиніть автомобілі, що з'їжджають з колії",
 "Запуск блоку",
 "Зняти сидіння",
 "Вимкнути диск",
 ],
 correctAnswer: 0,
 explanation: "Стіни безпеки.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Пункти пропуску готуються до…",
 options: [
 "Перевірка замовлення на колінах пізніше",
 "Тільки місцевість",
 "Бойовий",
 "Магазин",
 ],
 correctAnswer: 0,
 explanation: "Використовується в накладних системах.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Тест на п’ять кіл показує…",
 options: [
 "Застрягання та несправедливі повороти",
 "Robux",
 "Помилки DataStore",
 "Skybox",
 ],
 correctAnswer: 0,
 explanation: "QA перед таймерами.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "StartLine показує…",
 options: [
 "Де починаються гонки",
 "Розташування магазину",
 "Тільки нерест",
 "Зона вбивства",
 ],
 correctAnswer: 0,
 explanation: "Чіткий старт гонки.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Parts колії повинні бути…",
 options: [
 "Anchored true",
 "Розкріплено все",
 "Невидимий",
 "Лише Scripts",
 ],
 correctAnswer: 0,
 explanation: "Дорога не рухається.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Модульні сегменти дозволяють…",
 options: [
 "Послідовне повторне використання та редагування",
 "Випадкові розміри",
 "Без поворотів",
 "політ",
 ],
 correctAnswer: 0,
 explanation: "Будуйте ефективно.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 6.2 базується на...",
 options: [
 "Урок 6.1 автомобіль",
 "Тільки обби",
 "Тільки монети",
 "Тільки NPC",
 ],
 correctAnswer: 0,
 explanation: "Потрібен їздовий автомобіль.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 6.2 зберегти назву…",
 options: [
 "Урок 6.2 - Іподром",
 "Стартер автомобіля",
 "Таймер перегонів",
 "Арена готова",
 ],
 correctAnswer: 0,
 explanation: "Зберегти трек урок.",
 },
 ],
 },
}

export const ukLesson63 = {
 lessonId: "lesson-roblox-6-3",
 moduleId: "module-06",
 order: 3,
 title: "6.3 - Таймер гонки",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Запустіть таймер перегонів на дотику RaceStart",
 "Зупинити таймер на RaceFinish і показати час, що минув",
 "Відображайте живий час кола на екрані ScreenGui HUD",
 "Відстежуйте найкращий час сесії на гравця",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Швидка їзда - це весело. **Водіння на час** - це гра.

**Хід уроку:**
1. **Теорія (40 хв)** - старт/фініш + os.clock + HUD
2. **Практика (~25 хв)** - траса на час із найкращим колом
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 6.2 - гоночна траса** за допомогою StarterCar.`,
 },
 {
 title: "Потік таймера перегонів",
 content: `| Крок | Що відбувається |
|------|----------------|
| 1 | Гравець перетинає **RaceStart** → зберегти\`startTime\`|
| 2 | Таймер працює - оновлення HUD |
| 3 | Хрест **RaceFinish** → обчислення, що минуло |
| 4 | Порівняти з **кращим сеансом** |

**Одне коло** = початок і фініш на одній лінії (просте коло).`,
 },
 {
 title: "Parts RaceStart і RaceFinish",
 content: `Parts на шляху (CanCollide false, тонкий неон):\`RaceStart\`- зелений, на лінії старту\`RaceFinish\`- картатий візерунок або червоний, **та сама лінія** для кола 1

Для вимірювання часу на одному колі, старт і фініш можуть бути **одними панелями** з двома Scripts АБО однією панеллю, яка перемикає стан.

**Простіше:** одна панель\`StartFinish\`- перший дотик починається, другий дотик зупиняється (те саме коло).`,
 },
 {
 title: "Script синхронізації сервера",
 content: `\`RaceStart\`- **Script**:\`\`\`lua
local startPad = script.Parent
local racing = {} -- [player] = startTime

startPad.Touched:Connect(function(hit)
 local seat = hit.Parent:FindFirstChildWhichIsA("VehicleSeat", true)
 if not seat then return end

 local character = seat.Parent
 local player = game:GetService("Players"):GetPlayerFromCharacter(character)
 if not player then return end

 if racing[player] then return end -- already racing

 racing[player] = os.clock()
 print(player.Name .. " race started")
end)
\`\`\`Визначайте дотик **VehicleSeat**, щоб запускати лише автомобілі, а не ходячих гравців.`,
 },
 {
 title: "Логіка зупинки RaceFinish",
 content: `\`RaceFinish\`Script:\`\`\`lua
local finishPad = script.Parent
local racing = -- shared or _G / module; lesson: find start script state

finishPad.Touched:Connect(function(hit)
 local seat = hit.Parent:FindFirstChildWhichIsA("VehicleSeat", true)
 if not seat then return end

 local player = game.Players:GetPlayerFromCharacter(seat.Parent)
 if not player then return end

 local startTime = racing[player]
 if not startTime then
 print("Finish ignored - race not started")
 return
 end

 local elapsed = os.clock() - startTime
 racing[player] = nil

 print(player.Name .. " finished: " .. string.format("%.2f", elapsed) .. "s")
 -- Fire to client for HUD / best time
end)
\`\`\`**Краще:** підтримується один Script **RaceService** у ServerScriptService\`racing\`стіл для обох колодок.`,
 },
 {
 title: "HUD - живий таймер LocalScript",
 content: `**StarterGui** →\`RaceUI\`→\`TimeLabel\`LocalScript (спрощено - пізніше використовує атрибут або RemoteEvent):

Для уроку **LocalScript** опитує **NumberValue**\`RaceTime\`у програвачі, реплікованому сервером, АБО чистий локальний таймер після запуску торкніться копії клієнтської панелі.

**Проста локальна практика** (соло):\`\`\`lua
local label = script.Parent
local running = false
local startTime = 0

-- Connect to start/finish via BindableEvent in ReplicatedStorage for lesson bridge
\`\`\`**Мінімум:** час друку сервера; додати\`TimeLabel\`оновлено з сервера через\`player:SetAttribute("RaceElapsed", elapsed)\`кожні 0,05 с у циклі сервера.\`\`\`lua
-- Server after start:
task.spawn(function()
 while racing[player] do
 player:SetAttribute("RaceElapsed", os.clock() - racing[player])
 task.wait(0.05)
 end
end)
\`\`\`Клієнт читає атрибут - оновлює мітку.`,
 },
 {
 title: "Найкращий час сесії",
 content: `\`\`\`lua
local best = player:GetAttribute("RaceBest") or math.huge
if elapsed < best then
 player:SetAttribute("RaceBest", elapsed)
 print("New best lap!")
end
\`\`\`**BestLabel:**\`Best: 42.35s\`**Запобігти фініш перед стартом:** якщо ні\`racing[player]\`, ігнорувати штрих.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Старт випалює лише один раз за спробу кола
- [ ] Фініш ігнорується, якщо гонка не розпочата
- [ ] HUD або Output показує час, що минув
- [ ] Оновлення найкращого часу при побитті
- [ ] Зберегти:\`Lesson 6.3 - Race Timer\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Закінчити багаття до початку",
 explanation: "минула нісенітниця.",
 correctApproach: "Вимагати перегонів [гравець] існує",
 },
 {
 mistake: "Ідучий гравець починає гонку",
 explanation: "Не в машині.",
 correctApproach: "Виявлення VehicleSeat у зверненні",
 },
 {
 mistake: "Таймер ніколи не зупиняється",
 explanation: "гонки [гравець] не очищено.",
 correctApproach: "нуль після закінчення",
 },
 {
 mistake: "Довірений час лише для клієнтів",
 explanation: "Можна використовувати.",
 correctApproach: "Сервер os.clock для офіційного часу",
 },
 ],
 summary: "Ви зв’язали RaceStart і RaceFinish із серверним хронометражем os.clock, живим HUD через атрибути та відстеженням найкращого кола сеансу - ваша траса тепер є гонкою на час.",
 practiceTask: {
 title: "Схема за часом (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Старт → коло → фініш + найкращий час.

### Part A - Старт/Фініш колодок (8 хв)
1. RaceStart + RaceFinish (або комбінований потік)
2. Таблиця гонок на сервері + виявлення VehicleSeat

### Part B - Хронометраж (12 хв)
1. Завершити обчислення, що минули, очищає стан
2. Атрибут RaceElapsed для HUD
3. RaceBest оновлює новий рекорд

### Part C - Перевірте та збережіть (5 хв)
1. Три кола - один раз побий свого кращого
2. **Зберегти в Roblox** →\`Lesson 6.3 - Race Timer\` 3. **Практика завершена**`,
 hints: [
 "Один Script RaceService перемагає дві відключені таблиці",
 "Під час перевірки порядку друкувати «фініш ігнорується».",
 "Використовуйте одну лінію старту/фінішу для спрощення першого кола",
 ],
 optionalChallenge: "Розділена панель на півдорозі показує проміжний час.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Таймер перегонів використовує…",
 options: [
 "os.clock на сервері",
 "Тільки BrickColor",
 "Фарба місцевості",
 "атмосфера",
 ],
 correctAnswer: 0,
 explanation: "Вимірювання витраченого часу.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Завершення ігнорується, якщо…",
 options: [
 "Гонка так і не почалася",
 "Машина швидка",
 "Траса довга",
 "Інтерфейс користувача існує",
 ],
 correctAnswer: 0,
 explanation: "Час початку не збережено.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Виявлення VehicleSeat забезпечує...",
 options: [
 "Автомобіль перетнув лінію без руху",
 "політ",
 "Плавання",
 "Магазин",
 ],
 correctAnswer: 0,
 explanation: "Тригери лише для автомобіля.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Найкраще оновлення сесії, коли…",
 options: [
 "Новий час нижче",
 "Завжди",
 "Ніколи",
 "На смерть",
 ],
 correctAnswer: 0,
 explanation: "Нижче - швидше.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "racing[player] = нуль після фінішу...",
 options: [
 "Дозволяє наступний старт гонки",
 "Видаляє гравця",
 "Знімає автомобіль",
 "Публікує",
 ],
 correctAnswer: 0,
 explanation: "Скинути стан.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Live HUD може читати...",
 options: [
 "Атрибути гравця з сервера",
 "Тільки чат",
 "Рельєф місцевості",
 "Вбивати блоки",
 ],
 correctAnswer: 0,
 explanation: "Тиражовані атрибути.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "RaceStart зберігає…",
 options: [
 "startTime з os.clock",
 "Robux",
 "Підрахунок кіл",
 "Пошкодження зброєю",
 ],
 correctAnswer: 0,
 explanation: "Позначка часу на початку.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Офіційний час перегонів має бути…",
 options: [
 "Розраховується на сервері",
 "Лише клієнтський чат",
 "Випадковий",
 "Вгадай",
 ],
 correctAnswer: 0,
 explanation: "Повноваження сервера.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 6.3 потребує…",
 options: [
 "Трек від 6.2 і авто від 6.1",
 "Тільки меч",
 "Тільки монети",
 "Порожній",
 ],
 correctAnswer: 0,
 explanation: "Повне налаштування гонки.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 6.3 зберегти назву…",
 options: [
 "Урок 6.3 - Таймер перегонів",
 "гоночна траса",
 "Стартер автомобіля",
 "Obby готовий",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок таймера.",
 },
 ],
 },
}

export const ukLesson64 = {
 lessonId: "lesson-roblox-6-4",
 moduleId: "module-06",
 order: 4,
 title: "6.4 - Client-Server: перше знайомство",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Поясніть ролі клієнта та сервера в гоночній грі",
 "Створіть RaceEvent RemoteEvent у ReplicatedStorage",
 "FireServer з клієнта та перевірка на сервері",
 "Використовуйте FireClient для надійних оновлень інтерфейсу користувача з сервера",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Дотепер хронометраж жив переважно на **сервері**. Сьогодні ви об’єднуєте **інтерфейс клієнта** та **істину сервера** за допомогою **RemoteEvents**.

**Хід уроку:**
1. **Теорія (40 хв)** - два світи + RaceEvent
2. **Практика (~25 хв)** - перегони, керовані подіями
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 6.3 - Таймер перегонів**.`,
 },
 {
 title: "Два світи в Roblox",
 content: `| Сторона | Працює на | Підходить для |
|------|---------|----------|
| **Клієнт** | Пристрій плеєра | HUD, вхід, камера, звуки |
| **Сервер** | Хост Roblox | Правила, підрахунок очок, античіт |

**Правило перегонів:** клієнт може **запитувати** «Я перетнув фініш» - сервер **вирішує**, чи це дійсно та який час.

**Ніколи** не дозволяйте клієнту встановлювати офіційний час кола\`FireServer(1.0)\`як остаточний рахунок.`,
 },
 {
 title: "Чим володіє кожна сторона",
 content: `**Клієнт володіє:**
- Оновлення\`TimeLabel\`кожен кадр
- Кнопка «Готовий до перегонів»
- Показ "Final Lap!" банер

**Сервер володіє:**
-\`racing[player]\`час початку
- Перевірка замовлення на КПП
- Оголошення переможця
- Лідерська статистика\`Laps\`значення

Якщо клієнт і сервер не погоджуються, **перемагає сервер**.`,
 },
 {
 title: "Налаштування RemoteEvent",
 content: `**ReplicatedStorage** → вставити **RemoteEvent** → перейменувати\`RaceEvent\`І клієнт, і сервер можуть бачити його після реплікації.

**Назви дій** (рядки):
-\`"StartRace"\`-\`"FinishRace"\`-\`"UpdateHUD"\`(сервер → клієнт)

Зберігайте назви короткими та **точними** - помилки мовчки ламають гру.`,
 },
 {
 title: "Клієнт → сервер: FireServer",
 content: `**StarterGui** →\`RaceUI\`→ **LocalScript**:\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local raceEvent = ReplicatedStorage:WaitForChild("RaceEvent")

local readyButton = script.Parent:WaitForChild("ReadyButton")

readyButton.MouseButton1Click:Connect(function()
 raceEvent:FireServer("StartRace")
end)
\`\`\`**ServerScriptService** →\`RaceServer\`Script:\`\`\`lua
local raceEvent = game.ReplicatedStorage:WaitForChild("RaceEvent")
local racing = {}

raceEvent.OnServerEvent:Connect(function(player, action)
 print("[RaceEvent]", player.Name, action)

 if action == "StartRace" then
 if racing[player] then return end
 racing[player] = os.clock()
 raceEvent:FireClient(player, "RaceStarted")
 end
end)
\`\`\`Сервер **реєструє** кожну дію під час створення.`,
 },
 {
 title: "Сервер → клієнт: FireClient",
 content: `Після завершення перевірки сервера:\`\`\`lua
raceEvent:FireClient(player, "RaceFinished", elapsed, isNewBest)
\`\`\`Клієнт LocalScript:\`\`\`lua
raceEvent.OnClientEvent:Connect(function(action, ...)
 if action == "RaceStarted" then
 script.Parent.TimeLabel.Text = "GO!"
 elseif action == "RaceFinished" then
 local elapsed, isNewBest = ...
 script.Parent.TimeLabel.Text = string.format("Time: %.2fs", elapsed)
 if isNewBest then
 script.Parent.BestLabel.Text = "NEW BEST!"
 end
 end
end)
\`\`\`**Лише відображення** - числа надійшли з сервера, а не вгадані клієнтом.`,
 },
 {
 title: "Менталітет безпеки",
 content: `**Погано (можна використовувати):**\`\`\`lua
-- Server blindly trusts client time
raceEvent.OnServerEvent:Connect(function(player, action, clientTime)
 if action == "FinishRace" then
 saveBest(clientTime) -- HACK: player sends 0.01
 end
end)
\`\`\`**Добре:**
- Сервер виявляє дотик панелі АБО сервер відстежує контрольні точки
- Серверні обчислення\`os.clock() - start\`- Клієнт показує результат лише через\`FireClient\`**Золоте правило:***Клієнт пропонує. Сервер вирішує.*`,
 },
 {
 title: "Рефакторинг таймера уроку 6.3",
 content: `Перенесіть таблицю `racing` до **RaceServer** у ServerScriptService.

Панелі викликають внутрішні функції, а не окремі відключені таблиці.

Потік:
1. Торкніться панелі → сервер запускає таймер
2. Доторкніться → сервер обчислює час →\`FireClient\`з результатом
3. Клієнт оновлює мітки

**Контрольний список перед тренуваннями:**
- [ ] RaceEvent у ReplicatedStorage
- [ ] Сервер друкує всі вхідні дії
- [ ] Час завершення ніколи не надсилався від клієнта як повноваження
- [ ] Зберегти:\`Lesson 6.4 - Client Server Race\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "RemoteEvent лише в Workspace",
 explanation: "Клієнти можуть не побачити це надійно.",
 correctApproach: "ReplicatedStorage для спільних подій",
 },
 {
 mistake: "Час завершення роботи довірливого клієнта",
 explanation: "Експлуататори підробляють швидкими часами.",
 correctApproach: "OS.clock сервера при підтвердженому дотику",
 },
 {
 mistake: "Друкарська помилка в рядку дії",
 explanation: "Сервер ігнорує подію.",
 correctApproach: "Таблиця констант для імен дій",
 },
 {
 mistake: "LocalScript у ServerScriptService",
 explanation: "Ніколи не працює замість гравців.",
 correctApproach: "LocalScript під StarterGui",
 },
 ],
 summary: "Ви підключили RaceEvent RemoteEvent, щоб клієнти надсилали запити на перегонові дії, сервер перевіряв і володів хронометражем, а FireClient надсилав надійні результати в HUD - основу для чесних багатокористувацьких перегонів.",
 practiceTask: {
 title: "Потік перегонів на основі подій (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** шлях RemoteEvent із повноваженнями сервера.

### Part A - Налаштування (8 хв)
1.\`RaceEvent\`у ReplicatedStorage
2.\`RaceServer\`Script с\`racing\`стіл
3. ReadyButton → FireServer("StartRace")

### Part B - Двосторонні події (12 хв)
1. Сервер запускає таймер на дійсному StartRace
2. Фінішна панель → сервер обчислює час → FireClient("RaceFinished", пройшло)
3. Клієнт оновлює TimeLabel / BestLabel з даних сервера

### Part C - Перевірте та збережіть (5 хв)
1. Output дані показують серверні журнали для кожної дії
2. **Зберегти в Roblox** →\`Lesson 6.4 - Client Server Race\` 3. **Практика завершена**`,
 hints: [
 "Друк гравця + дії для кожної події OnServerEvent",
 "Зберігайте логіку блокування уроку 6.3, але централізуйте його на RaceServer",
 "FireClient лише після завершення обчислень сервера",
 ],
 optionalChallenge: "Трансляція «Гравець X завершив роботу» всім клієнтам із FireAllClients.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Сервер надійний для…",
 options: [
 "Правила фінального заїзду та результати",
 "Тільки графіка",
 "Тільки музика",
 "Тільки камера",
 ],
 correctAnswer: 0,
 explanation: "Авторитетна ігрова логіка.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "RemoteEvent живе в…",
 options: [
 "ReplicatedStorage",
 "Тільки освітлення",
 "Рельєф місцевості",
 "StarterPack",
 ],
 correctAnswer: 0,
 explanation: "Тиражується на клієнта та сервер.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "FireServer надсилає…",
 options: [
 "Запит клієнта на сервер",
 "Сервер лише для всіх клієнтів",
 "Дані про місцевість",
 "Зварні шви",
 ],
 correctAnswer: 0,
 explanation: "Клієнт → сервер.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "FireClient надсилає…",
 options: [
 "Повідомлення сервера одному гравцеві",
 "Експлойт",
 "Видалити автомобіль",
 "Зберегти місце",
 ],
 correctAnswer: 0,
 explanation: "Сервер → конкретний клієнт.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Клієнт не повинен надсилати…",
 options: [
 "Довірений офіційний час кола як факт",
 "Клацання кнопок",
 "запити інтерфейсу користувача",
 "Сигнал готовності",
 ],
 correctAnswer: 0,
 explanation: "Сервер розраховує час.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "LocalScript працює на...",
 options: [
 "Клієнт гравця",
 "Тільки сервер",
 "Веб-сайт Roblox",
 "DataStore",
 ],
 correctAnswer: 0,
 explanation: "Скрипти на стороні клієнта.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "OnServerEvent працює на...",
 options: [
 "Сервер",
 "Лише клієнтський HUD",
 "Обидва однаково",
 "Рельєф місцевості",
 ],
 correctAnswer: 0,
 explanation: "Сервер обслуговує FireServer.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Перегони потребують обох сторін, тому що...",
 options: [
 "Швидкий інтерфейс + надійні правила",
 "Жодних Scripts",
 "Тільки зварні шви",
 "Тільки монети",
 ],
 correctAnswer: 0,
 explanation: "Відображення клієнта + server authority.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 6.4 базується на...",
 options: [
 "Таймер уроку 6.3",
 "Тільки обби",
 "Тільки магнат",
 "Порожнє місце",
 ],
 correctAnswer: 0,
 explanation: "Додає мережевий рівень.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 6.4 зберегти назву…",
 options: [
 "Урок 6.4 - Гонка клієнт-сервер",
 "Таймер перегонів",
 "Стартер автомобіля",
 "Арена готова",
 ],
 correctAnswer: 0,
 explanation: "Зберегти урок мереж.",
 },
 ],
 },
}

export const ukLesson65 = {
 lessonId: "lesson-roblox-6-5",
 moduleId: "module-06",
 order: 5,
 title: "6.5 - Кола та лідерборд",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Відстежити контрольні точки CP_1 → CP_2 → CP_3 → Finish",
 "Збільшуйте статистику лідера кіл лише на дійсному повному колі",
 "Показувати прогрес кола на HUD і таблиці лідерів",
 "Оголошення переможця на цільових колах із тай-брейком",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `Одне коло з вимірюванням часу є спринтом. **Три кола з порядком контрольних точок** - це справжня гонка.

**Хід уроку:**
1. **Теорія (40 хв)** - правила кола + статистика лідерів
2. **Практика (~25 хв)** - логіка гонки на 3 кола
3. **Вікторина (10 хв)** - проходження **70%**

Відкрийте **Урок 6.4 - Перегони клієнт-серверів**.`,
 },
 {
 title: "Правила чесного кола",
 content: `Без порядку гравці пропускають половину доріжки.

**Обов’язково:**
| Правило | Чому |
|------|-----|
| Пункти пропуску в порядку | Жодних ярликів |
| Завершити лише після останнього CP | Дійсне завершення кола |
| Скинути індекс CP після кола | Наступне коло починається чисто |
| Цільові кола (наприклад, 3) | Очистити умову виграшу |

**Трек з 6.2:**\`CP_1\`,\`CP_2\`,\`CP_3\`→ потім\`RaceFinish\`.`,
 },
 {
 title: "Стан контрольної точки для кожного гравця",
 content: `У **RaceServer**:\`\`\`lua
local progress = {} -- [player] = nextCheckpointIndex

local ORDER = {
 [1] = workspace.Track.CP_1,
 [2] = workspace.Track.CP_2,
 [3] = workspace.Track.CP_3,
 [4] = workspace.Track.RaceFinish,
}

local function resetProgress(player)
 progress[player] = 1
end
\`\`\`На старті гонки →\`resetProgress(player)\`.

Торкнувся неправильний CP → надрукувати попередження, **немає передавання**.`,
 },
 {
 title: "Сенсорний обробник КПП",
 content: `Для each Part CP, **Script** або один центральний цикл:\`\`\`lua
cp.Touched:Connect(function(hit)
 local seat = hit.Parent:FindFirstChildWhichIsA("VehicleSeat", true)
 if not seat then return end

 local player = game.Players:GetPlayerFromCharacter(seat.Parent)
 if not player then return end

 local expected = progress[player]
 if not expected then return end

 local expectedPart = ORDER[expected]
 if hit:IsDescendantOf(expectedPart) or hit.Parent == expectedPart then
 print(player.Name, "hit CP", expected)
 progress[player] = expected + 1
 else
 print(player.Name, "wrong checkpoint order")
 end
end)
\`\`\`Коли\`progress[player]\`стає **5** (індекс минулого фінішу), ви збільшили коло - див. наступний розділ.`,
 },
 {
 title: "Збільште кількість кіл після фінішу",
 content: `Коли гравець перетинає **RaceFinish** і\`expected == 4\`:\`\`\`lua
local leaderstats = player:FindFirstChild("leaderstats")
local laps = leaderstats and leaderstats:FindFirstChild("Laps")
if laps then
 laps.Value += 1
end

local TARGET_LAPS = 3
if laps.Value >= TARGET_LAPS then
 print(player.Name .. " WINS!")
 raceEvent:FireClient(player, "YouWin")
end

resetProgress(player) -- next lap if race continues
\`\`\`Створіть **лідерську статистику** під час приєднання, якщо її немає:\`\`\`lua
local ls = Instance.new("Folder")
ls.Name = "leaderstats"
ls.Parent = player
local laps = Instance.new("IntValue")
laps.Name = "Laps"
laps.Value = 0
laps.Parent = ls
\`\`\``,
 },
 {
 title: "Дисплей кола HUD",
 content: `Мітки **RaceUI**:
-\`LapLabel\`→\`Lap 2 / 3\`-\`CPHint\`→\`Next: CP_2\`Оновлення з:
-\`GetPropertyChangedSignal\`on Laps IntValue (клієнт)
- Або\`FireClient("LapUpdate", current, target)\`з сервера

**Таблиця лідерів** відображається автоматично\`Laps\`коли в лідерах.

**Банер останнього кола:** коли\`laps.Value == TARGET_LAPS - 1\`і новий старт кола → показати "FINAL LAP!"`,
 },
 {
 title: "Переможець і нічия",
 content: `**Умова виграшу:** першим\`TARGET_LAPS\`(3).

**Така ж кількість кіл?**
- Порівняйте **загальний час гонки** (сервер відстежується з першої StartRace)
- Менший загальний час перемог\`\`\`lua
-- Optional total timer per player
local raceStartTotal = {} -- on first StartRace of match
\`\`\`Оголосити переможця в **StatusLabel** для всіх гравців через\`FireAllClients\`.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Пропуск CP_2 не зараховує коло
- [ ] Статистика лідера кіл збільшується лише після дійсного фінішу
- [ ] HUD показує коло X / 3
- [ ] Переможець друкує на 3 колах
- [ ] Зберегти:\`Lesson 6.5 - Laps Leaderboard\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Фініш без CP_3",
 explanation: "Пропуск кола.",
 correctApproach: "Вимагати очікуваний == індекс завершення",
 },
 {
 mistake: "Ніколи не скидайте прогрес після кола",
 explanation: "Застряг на фінішному індексі.",
 correctApproach: "resetProgress після кожного кола",
 },
 {
 mistake: "Кола тільки на клієнта",
 explanation: "Не в таблиці лідерів.",
 correctApproach: "лідерська статистика на сервері",
 },
 {
 mistake: "Ідучий гравець запускає CP",
 explanation: "Помилковий прогрес.",
 correctApproach: "Перевірка VehicleSeat",
 },
 ],
 summary: "Ви запровадили впорядковане відстеження кіл контрольних точок із статистикою лідерів кіл, прогресом HUD і правилом переможця трьох кіл - гравці більше не можуть пропускати трасу, щоб схитрити перемогу.",
 practiceTask: {
 title: "Логіка гонки на 3 кола (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Чесна багатоколійна гонка з таблицею лідерів.

### Part A - Стан (10 хв)
1. прогрес[гравець] + таблиця ORDER на RaceServer
2. Лідерська статистика. Кола на PlayerAdded
3. Сенсорні обробники на CP_1..3 і RaceFinish

### Part B - Правила (10 хв)
1. Неправильне замовлення → відсутність авансу
2. Дійсний фініш → Кола += 1, скинути прогрес
3. LapLabel показує поточний / 3

### Part C - Тест на перемогу (5 хв)
1. Проїдьте 3 дійсні кола - дивіться повідомлення переможця
2. Спробуйте пропустити CP_2 - коло не повинно зараховуватися
3. **Зберегти в Roblox** →\`Lesson 6.5 - Laps Leaderboard\` 4. **Практика завершена**`,
 hints: [
 "Перш ніж відзначати логіку колін, перевірте дотик у неправильному порядку",
 "Друк очікуваного індексу при кожному дотику CP",
 "TARGET_LAPS = 3 зберігає область невеликою",
 ],
 optionalChallenge: "\"ФІНАЛЬНЕ КОЛО!\" банер на початку третього кола.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Порядок КПП запобігає...",
 options: [
 "Подвиги пропускання кола",
 "Водіння",
 "Зварні шви",
 "Звук",
 ],
 correctAnswer: 0,
 explanation: "Забезпечення справедливого шляху.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Кола зберігаються в…",
 options: [
 "leaderstats IntValue",
 "Рельєф місцевості",
 "небо",
 "Тільки зварювання",
 ],
 correctAnswer: 0,
 explanation: "Інтеграція таблиці лідерів.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Після правильного кола прогрес скидається до…",
 options: [
 "CP_1 (індекс 1)",
 "Тільки фініш",
 "999",
 "нуль назавжди",
 ],
 correctAnswer: 0,
 explanation: "Наступне коло починається з першого CP.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Неправильний дотик контрольної точки має…",
 options: [
 "Не просування вперед",
 "Перемагайте миттєво",
 "Видалити автомобіль",
 "Опублікувати",
 ],
 correctAnswer: 0,
 explanation: "Ігнорувати недійсне замовлення.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "TARGET_LAPS = 3 означає…",
 options: [
 "Перемога після трьох дійсних кіл",
 "Тільки три гравці",
 "Три машини",
 "Три треки",
 ],
 correctAnswer: 0,
 explanation: "Умова перемоги.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Тай-брейк може використовувати…",
 options: [
 "Менший загальний час гонки",
 "Випадковий Robux",
 "Висота стрибка",
 "BrickColor",
 ],
 correctAnswer: 0,
 explanation: "Виграє швидший загальний час.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Перевірка VehicleSeat гарантує…",
 options: [
 "Автомобіль запускає CP не ходить",
 "політ",
 "Плавати",
 "Магазин",
 ],
 correctAnswer: 0,
 explanation: "Контекст гонок.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Таблиця лідерів показує кола, тому що…",
 options: [
 "Він знаходиться в папці leaderstats",
 "Це в освітленні",
 "Лише текст клієнта",
 "Немає folders",
 ],
 correctAnswer: 0,
 explanation: "Конвенція таблиці лідерів Roblox.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 6.5 потребує відстеження CP від…",
 options: [
 "Урок 6.2",
 "Тільки урок 1.1",
 "Симулятор монети",
 "Арена",
 ],
 correctAnswer: 0,
 explanation: "Ворота КПП на трасі.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 6.5 зберегти назву…",
 options: [
 "Урок 6.5 - Таблиця лідерів за колами",
 "Таймер перегонів",
 "Стартер автомобіля",
 "Tycoon Works",
 ],
 correctAnswer: 0,
 explanation: "Зберегти уроки кіл.",
 },
 ],
 },
}

export const ukLesson66 = {
 lessonId: "lesson-roblox-6-6",
 moduleId: "module-06",
 order: 6,
 title: "6.6 - Checkpoint: Гонка запущена",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Гонку запущено: авто, трек, таймер, кола та RemoteEvents",
 "Пройдіть багатокористувацьку перевірку якості: таймер, контрольні точки, переможець, інтерфейс",
 "Налаштуйте керованість автомобіля та довжину перегонів для справедливого задоволення",
 "Поставте гоночний прототип, готовий до демонстрації",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Запуск гонки** = повне портфоліо модуля 6 в одному місці.

**Потрібний стек:**
- 6.1 StarterCar
- 6.2 Колія + шлагбауми
- 6.3 Таймер + сеанс найкраще
- 6.4 RaceEvent клієнт/сервер
- 6.5 Контрольні точки на три кола + Таблиця лідерів за колами

**Хід уроку:**
1. **Теорія (40 хв)** - контрольний список для запуску
2. **Практика (~40 хв)** - QA + остаточне збереження
3. **Вікторина (10 хв)** - проходження **70%**`,
 },
 {
 title: "Race Запущений приціл",
 content: `Folder\`RaceSystems\`у ServerScriptService:
-\`RaceServer\`- хронометраж, контрольні точки, переможець
-\`CarSpawner\`- клонувати StarterCar до StartLine

**ReplicatedStorage:**
-\`StarterCar\`model
-\`RaceEvent\`**Робочий простір:**
-\`Track\`повна схема
-\`RaceUI\`через StarterGui

**Зберегти назву:**\`Module 6 - Race Launched\``,
 },
 {
 title: "Контрольний список готовності до запуску",
 content: `| # | Тест | Пройти |
|---|------|------|
| 1 | Автомобіль створюється, їздить від StartLine | |
| 2 | Таймер запускається на початку гонки, зупиняється на дійсному фініші | |
| 3 | Наказ CP виконано - пропуск не вдається | |
| 4 | 3 кола → повідомлення переможця | |
| 5 | 2 гравці - обидва бачать кола в таблиці лідерів | |
| 6 | Інтерфейс читається (час, коло, найкраще) | |

Виправте **надійність** перед додатковим поліруванням.`,
 },
 {
 title: "QA matrix - грайте як студія",
 content: `**Індивідуальне навчання (5 хв):**
- Новий гравець сідає в машину протягом 30 секунд
- Перше коло завершується без плутанини

**Гонка на 2 гравці (10 хв):**
- Обидва можуть змагатися, не порушуючи стан один одного
- Переможець лише за 3 дійсних кіл

**Тест експлойту (5 хв):**
- Проходьте через CP пішки - без збільшення кола
- Торкніться закінчити першим - ігнорується
- Підроблений час FireServer - сервер ігнорує

**Стрес (5 хв):**
- 5 гонок поспіль - без застряг\`racing[player]\``,
 },
 {
 title: "Тюнінг для задоволення",
 content: `| Ручка | Солодке місце |
|------|------------|
| Максимальна швидкість | 45-55 для цього треку |
| TARGET_LAPS | 3 |
| Ширина колії | 16-20 стадів |
| Довжина гонки | ~60-90 секунд на коло |

**Занадто довго** = нудьга. **Занадто короткий** = відсутність вираження навичок.

Запитайте: *Чи хотів би я знову брати участь у гонках негайно?*`,
 },
 {
 title: "Продається якість класу",
 content: `Демо-готовий означає:
- Системи працюють **кожного** тестового запуску
- Видимість навчання (контрольні точки, таймер, кола на екрані)
- Явний виграшний момент
- Немає помилок Scripts, що надсилають спам у виводі

**2-хвилинний демонстраційний Script:**
1. Спаун → увійти в машину
2. Показати запущений таймер HUD
3. Пройдіть одне коло - оновлення лічильника кіл
4. Показати кола лідерів
5. Перемога на колі 3 - інтерфейс для святкування`,
 },
 {
 title: "Далі: Модуль 8",
 content: `Далі - **NPC, діалоги та квести** (Модуль 8). Ваша гоночна арена може залишитися стороннім центром або створити нове місце для наступних уроків.

**Перед тренуванням:**
- [ ] Усі 6 рядків контрольного списку пройдені
- [ ] Один повний запис від появи до переможця
- [ ] **Зберегти в Roblox** →\`Module 6 - Race Launched\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Відправка зі зламаним замовленням CP",
 explanation: "Нечесні перегони.",
 correctApproach: "Перед збереженням перевірте експлойт",
 },
 {
 mistake: "Перевірено соло лише один раз",
 explanation: "Багатокористувацькі помилки відсутні.",
 correctApproach: "2 гравці + стрес-тести",
 },
 {
 mistake: "Забагато функцій, зламане ядро",
 explanation: "Контрольна точка не пройшла перевірку якості.",
 correctApproach: "Надійність перш за все",
 },
 {
 mistake: "Автомобіль усе ще в робочій області, а не в ReplicatedStorage",
 explanation: "Проблеми зі спауном для всіх гравців.",
 correctApproach: "Клон із ReplicatedStorage",
 },
 ],
 summary: "Ви інтегрували повний стек перегонів у Race Launched, пройшли перевірку якості для соло та кількох гравців, налаштували темп на колах і зберегли готовий до демо-версії прототип - Модуль 6 завершено.",
 practiceTask: {
 title: "Здайте Race Launched (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** Пройти перевірку якості + зберегти портфоліо.

### Part A - Інтеграція (15 хв)
1. Об’єднати 6.1-6.5 в одне місце
2. RaceServer + CarSpawner + RaceUI
3. Чітка структура папок

### Part B - матриця контролю якості (20 хв)
1. Виконайте всі 6 контрольних тестів
2. Гонка на 2 гравці + тест на експлойт
3. Перш ніж продовжити, виправте всі помилки

### Part C - Збереження демо (5 хв)
1. Налаштуйте MaxSpeed / трек, якщо коло занадто важке
2. **Зберегти в Roblox** →\`Module 6 - Race Launched\` 3. **Практика завершена** + додатковий 2-хвилинний запис`,
 hints: [
 "Одна помилка за раз - повторюйте перевірку після кожного виправлення",
 "Оператори друку перевершують вгадування у виводі",
 "Надавайте пріоритет перемогі на трьох колах, а не подіуму",
 ],
 optionalChallenge: "Зона подіуму телепортує трійку найкращих після гонки з табличкою турнірної таблиці.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Race Launched включає…",
 options: [
 "Автомобіль + траса + таймер + кола + події",
 "Тільки автомобіль",
 "Тільки місцевість",
 "Жодних Scripts",
 ],
 correctAnswer: 0,
 explanation: "Повний модуль 6.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Перевірки тесту на використання…",
 options: [
 "Пропуск контрольної точки не вдається",
 "Колір неба",
 "Гучність музики",
 "Size шрифту",
 ],
 correctAnswer: 0,
 explanation: "Анти-ярлик.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Переможець на…",
 options: [
 "3 дійсних кола",
 "1 дотик",
 "0 разів",
 "10 смертей",
 ],
 correctAnswer: 0,
 explanation: "TARGET_LAPS.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "StarterCar має породжуватися з…",
 options: [
 "Клон ReplicatedStorage",
 "Тільки місцевість",
 "Чат",
 "Вбити цеглу",
 ],
 correctAnswer: 0,
 explanation: "Збірний візерунок.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Сервер володіє офіційним…",
 options: [
 "Підрахунок часу та кола",
 "Тільки колір інтерфейсу",
 "Припущення клієнта",
 "Камера",
 ],
 correctAnswer: 0,
 explanation: "Авторитет.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Тест для двох гравців показує…",
 options: [
 "Спільні помилки стану",
 "Robux",
 "Тільки DataStore",
 "Видавництво",
 ],
 correctAnswer: 0,
 explanation: "Багатокористувацька перевірка якості.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Надійність перед екстрами означає…",
 options: [
 "Основний цикл працює першим",
 "Спочатку додайте подіум",
 "Пропустити QA",
 "Видалити трек",
 ],
 correctAnswer: 0,
 explanation: "Пріоритет надійного ядра.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Модуль 6 зберегти назву…",
 options: [
 "Модуль 6 - Гонка розпочата",
 "Арена готова",
 "Obby готовий",
 "Симулятор монет",
 ],
 correctAnswer: 0,
 explanation: "КПП портфоліо.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 6.6 завершується…",
 options: [
 "Модуль 6 гонки",
 "Тільки модуль 1",
 "Тільки видавництво",
 "Переклад з Великобританії",
 ],
 correctAnswer: 0,
 explanation: "Кінець модуля 6.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Демо має показати…",
 options: [
 "Відродження переможця за ~2 хв",
 "Тільки Explorer",
 "Редагувати лише місцевість",
 "Порожня Baseplate",
 ],
 correctAnswer: 0,
 explanation: "Продається демо.",
 },
 ],
 },
}
