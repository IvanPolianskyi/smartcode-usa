/** Rich UK content for Roblox Module 12 */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson121 = {
 lessonId: "lesson-roblox-12-1",
 moduleId: "module-12",
 order: 1,
 title: "12.1 - Фінальний проект: план",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Напишіть подачу гри одним реченням і націлюйте профіль гравця",
 "Визначте основний цикл і список систем із модулів курсу",
 "Розділіть обов’язковий і приємний обсяг MVP",
 "Створіть часову шкалу з приблизними годинами та 30% буфером",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Модуль 12 - День випуску** - ви **здаєте** те, що створили в 11 модулях.

**Хід уроку:**
1. **Теорія (40 хв)** - структура GDD
2. **Практика (~25 хв)** - напишіть GDD остаточного проекту
3. **Вікторина (10 хв)** - проходження **70%**

Це планується, а не кодування Studio.`,
 },
 {
 title: "GDD для справжніх творців",
 content: `**Документ щодо дизайну гри** зупиняє роздування фіч (feature creep).

У захваті вам потрібно 50 систем. GDD форсує **MVP** - що потрібно здати вчасно.

**Ваш остаточний проект** поєднує контрольні точки:
- Хаб / острів (Модуль 1)
- Obby або гоночний шматок (2 або 6)
- Магазин (7) + живі NPC (8)
- Інвентар RPG (9)
- Світ головоломок (10)
- Полірування (11)`,
 },
 {
 title: "Обов'язкові розділи GDD",
 content: `| Розділ | Ваша відповідь |
|---------|-------------|
| **Pitch (подача)** | 1 речення для опису в Store |
| **Цільовий гравець** | Вік, уміння, чому весело |
| **Основний цикл** | Зробити → винагорода → повторити |
| **Список систем** | 6-8 систем із модулів курсу |
| **Арт/аудіо настрій** | 3 прикметники |
| **Обсяг MVP** | Має увійти в MVP цього місяця |
| **Контрольний список випуску** | Publish steps |

**Приклад пропозиції:***«Змагайтеся, виконуйте квести та вдосконалюйте своє спорядження в живому центрі острова - поодинці або з друзями».*`,
 },
 {
 title: "Шаблон основної петлі",
 content: `\`\`\`
Spawn → explore hub → talk to NPC / start quest
→ complete challenge (obby / puzzle / combat)
→ earn coins + items → shop upgrade
→ repeat stronger → showcase win
\`\`\`**30-секундний цикл** гравці можуть пояснити другу.`,
 },
 {
 title: "Необхідне проти того, що приємно мати",
 content: `| Обов'язково (must-have) (MVP) | Приємно мати |
|-----------------|-------------|
| Відродження + гід NPC | 10 варіантів головоломки |
| 1 квест завершений цикл | Повна гонка на 3 кола |
| Магазин купити 1 шт. | DataStore домашніх тварин |
| Зберегти інвентар | Озвучка |
| Завантаження + базовий SFX | Трейлер відео |

**Завершена маленька гра** перемагає гігантську незавершену мрію.`,
 },
 {
 title: "Таймлайн з буфером",
 content: `| Віха | Години | Виконано |
|-----------|-------|------|
| GDD + план | 2 | |
| Інтеграція | 8 | |
| Playtest виправлення | 6 | |
| Publish + portfolio | 4 | |
| Підготовка вітрини | 2 | |
| **Проміжний підсумок** | 22 | |
| **+30% буфера** | ~29 | |

Додайте 30% - завжди щось ламається.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Написано 1 речення
- [ ] Схема основного циклу або маркери
- [ ] Список обов'язкових речей ≤ 8 предметів
- [] Часова шкала з буфером
- [ ] Зберегти нотатки:\`Lesson 12.1 - Final GDD\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Немає MVP - все обов'язково",
 explanation: "Ніколи не публікується.",
 correctApproach: "Вирізати приємно мати",
 },
 {
 mistake: "Розпливчаста основна петля",
 explanation: "Командна плутанина.",
 correctApproach: "Поява, щоб винагороджувати кроки",
 },
 {
 mistake: "Нульові оцінки часу",
 explanation: "Пропустіть термін.",
 correctApproach: "Години + буфер",
 },
 {
 mistake: "Висота 1 абзац",
 explanation: "Не готовий до зберігання.",
 correctApproach: "Гачок одним реченням",
 },
 ],
 summary: "Ви розробили практичний GDD із подачею, основним циклом, списком систем, обов’язковими елементами MVP і буферизованою хронологією - ваш остаточний проект тепер має план проєкту замість розпливчастих амбіцій.",
 practiceTask: {
 title: "Фінальний проект GDD (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Повний документ GDD (документ або примітки).

### Part A - Ідентичність (10 хв)
1. Подача + цільовий гравець
2. Основний цикл (5 кроків)
3. Арт/аудіо настрій

### Part B - Обсяг (12 хв)
1. Перелік систем з модулів курсу
2. Стіл, який необхідно мати проти того, що потрібно мати
3. Часова шкала годин + 30% буфера

### Part C - Зберегти (3 хв)
1. Експорт/збереження файлу GDD
2. **Практика завершена** - готовий до інтеграції 12.2`,
 hints: [
 "Подавайте як опис магазину Roblox",
 "Must-have = те, що ви демонструєте в SHOWCASE DAY",
 "Необов’язково: примітка про справедливу монетизацію",
 ],
 optionalChallenge: "Чесна концепція монетизації (лише косметика, без оплати за виграш).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "GDD допомагає запобігти...",
 options: [
 "Uncontrolled scope creep",
 "Walking",
 "Terrain gen",
 "Welds",
 ],
 correctAnswer: 0,
 explanation: "Фокус.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "MVP означає...",
 options: [
 "Minimum viable shippable scope",
 "Maximum everything",
 "No features",
 "Random",
 ],
 correctAnswer: 0,
 explanation: "Готовий.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Основний цикл описує...",
 options: [
 "Repeat player actions",
 "Server IP",
 "Robux cut",
 "Font size",
 ],
 correctAnswer: 0,
 explanation: "Ігровий цикл.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "30% буфер для...",
 options: [
 "Unexpected delays",
 "Deleting GDD",
 "Skipping test",
 "No plan",
 ],
 correctAnswer: 0,
 explanation: "Реальність.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Необхідне проти того, що приємно мати...",
 options: [
 "Prioritizes shipping",
 "Same thing",
 "Banned",
 "UI only",
 ],
 correctAnswer: 0,
 explanation: "Сфера вирізання.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Модуль 12 - це...",
 options: [
 "Release Day",
 "Only terrain",
 "Only sound",
 "Module 1",
 ],
 correctAnswer: 0,
 explanation: "Підсумковий модуль.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Висота має бути...",
 options: [
 "One catchy sentence",
 "50 pages",
 "Code only",
 "Empty",
 ],
 correctAnswer: 0,
 explanation: "Зберігати рекламу.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 12.2 - це...",
 options: [
 "Putting systems together",
 "Only publish",
 "Only GDD",
 "Empty",
 ],
 correctAnswer: 0,
 explanation: "Інтеграція.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Закінчена невелика гра перемагає...",
 options: [
 "Giant unfinished project",
 "No plan",
 "No test",
 "No UI",
 ],
 correctAnswer: 0,
 explanation: "Сфера дисципліни.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Результатом уроку 12.1 є...",
 options: [
 "Final Project GDD",
 "Published game",
 "Trailer only",
 "Empty place",
 ],
 correctAnswer: 0,
 explanation: "Планування док.",
 },
 ],
 },
}

export const ukLesson122 = {
 lessonId: "lesson-roblox-12-2",
 moduleId: "module-12",
 order: 2,
 title: "12.2 - Збираємо все разом",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Інтегруйте завантаження, інвентар, квести, магазин, головоломки та полірування в одному місці",
 "Дотримуйтеся порядку інтеграції, щоб зменшити конфлікти",
 "Створіть команду скидання профілю для тестування",
 "Функції заморожування під час спринту інтеграції",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `День архітектури - системи повинні працювати **разом**, а не тільки окремо.

**Хід уроку:**
1. **Теорія (40 хв)** - порядок інтегрування
2. **Практика (~25 хв)** - перейдіть у місце остаточної збірки
3. **Вікторина (10 хв)** - проходження **70%**

Використовуйте найкраще контрольну точку як базу: **Модуль 11 - відшліфована гра**.`,
 },
 {
 title: "Порядок інтеграції",
 content: `| Крок | Система | Чому цей порядок |
|------|--------|----------------|
| 1 | Завантаження + Explorer чистий | Фонд |
| 2 | Профіль / DataStore зберегти | Дані перед економікою |
| 3 | Інвентар + спорядження + магазин | Економ стек |
| 4 | Квести + діалог NPC | Прогресія |
| 5 | Головоломка / obby / combat slice | Виклик |
| 6 | Аудіо + пропуск UX | Полірування останнє |

**Не** додавайте нові функції під час інтеграції - **заморозьте** область.`,
 },
 {
 title: "Структура одного місця",
 content: `\`\`\`
FinalProject (place)
├── ReplicatedStorage/Remotes + Audio
├── ServerScriptService/Systems + Modules
├── StarterGui (Loading, Shop, Quest, Stats, Puzzle)
├── Workspace (Hub, NPCs, PuzzleWorld, Shop)
└── ServerStorage/Tools
\`\`\`Копіювання систем із збереження контрольних точок - **одна ItemDatabase**, **один RPGConfig**.`,
 },
 {
 title: "Налагодження конфлікту",
 content: `Коли відбувається зіткнення:

1. **Потік подій у журналі** - друк після завершення квесту, покупки в магазині, виграшу головоломки
2. **Ізолювати** - відключити одну систему, повторно перевірити
3. **Усуньте першопричину**, а не симптом

| Загальне зіткнення | Виправити |
|--------------|-----|
| Монети не зберігають | Збереження запасів після покупки |
| Квест + діалог застряг | Очистити активний прапор під час закриття |
| Подвійний екран завантаження | Прапори ResetOnSpawn |
| Невідповідність віддаленого імені | Аудит Folders Remotes |`,
 },
 {
 title: "Перевірити команду скидання",
 content: `\`\`\`lua
-- Studio admin command only
local function resetProfile(player)
 playerInventories[player] = Inventory.new(12)
 playerEquipped[player] = { weapon=nil, armor=nil, trinket=nil }
 -- clear quest state
 savePlayer(player) -- or wipe DataStore key in test
 print("Reset", player.Name)
end
\`\`\`Повторні тести інтеграції без нових облікових записів.`,
 },
 {
 title: "Контрольний список інтеграції",
 content: `- [ ] Приєднання → завантаження → породження (немає помилок)
- [ ] Обговорення NPC → початок квесту → оновлення HUD
- [ ] Виконати ціль → монети/предмети
- [ ] Купити в магазині → інвентар + статистика
- [ ] Головоломка/obby один раз → винагорода
- [ ] Вийти → знову приєднатися → прогрес продовжується
- [ ] Зберегти:\`Lesson 12.2 - Final Integration\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Додавання функцій під час інтеграції",
 explanation: "Ніколи не стабілізується.",
 correctApproach: "Заморожування функції",
 },
 {
 mistake: "Дві копії бази даних ItemDatabase",
 explanation: "ID дрейф.",
 correctApproach: "Один модуль",
 },
 {
 mistake: "Пропустити тест повторного приєднання",
 explanation: "Зафіксуйте баги перед релізом.",
 correctApproach: "Вийти/знову приєднатися до кожної системи",
 },
 {
 mistake: "Об'єднайте місця без очищення",
 explanation: "Дубльовані Scripts.",
 correctApproach: "Одна Folder Systems",
 },
 ],
 summary: "Ви об’єднали завантаження, економіку, квести, виклики та доопрацювання в одну фінальну збірку, дотримуючись суворого порядку, із налагодженням конфліктів і скиданням тесту - гра є єдиним узгодженим досвідом.",
 practiceTask: {
 title: "Спринт системної інтеграції (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Один золотий шлях, який можна грати, без червоних помилок.

### Part A - Об'єднання (15 хв)
1. Базове місце з Game Polished
2. Провід контрольного листа 6 рядів - галочки в кожному
3. Заморожування функцій - жодних нових ідей

### Part B - Налагодження (8 хв)
1. Виправте головне зіткнення інтеграції з виводу
2. команда resetProfile для QA

### Part C - Зберегти (2 хв)
1. **Зберегти в Roblox** →\`Lesson 12.2 - Final Integration\` 2. **Практика завершена**`,
 hints: [
 "Роздрукувати потік подій, якщо заплутався",
 "Один віддалений іменування",
 "Запасний інтерфейс користувача, якщо DataStore не працює (завдання)",
 ],
 optionalChallenge: "Витончений інтерфейс користувача, якщо не вдається завантажити профіль.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Порядок інтеграції починається з...",
 options: [
 "Loading and clean structure",
 "Publish first",
 "Trailer",
 "Random",
 ],
 correctAnswer: 0,
 explanation: "фундамент.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Заморожування функції означає...",
 options: [
 "No new features during merge",
 "Delete all scripts",
 "Stop testing",
 "Remove UI",
 ],
 correctAnswer: 0,
 explanation: "Стабільність.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Один ItemDatabase запобігає...",
 options: [
 "Shop/inventory ID drift",
 "Lag",
 "Terrain",
 "Sound",
 ],
 correctAnswer: 0,
 explanation: "Єдина правда.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "resetProfile допомагає...",
 options: [
 "Repeat integration tests",
 "Ban players",
 "Publish",
 "Remove NPCs",
 ],
 correctAnswer: 0,
 explanation: "Інструмент контролю якості.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Виправлення налагодження конфліктів...",
 options: [
 "Root cause not symptom",
 "Nothing",
 "Only art",
 "Only audio",
 ],
 correctAnswer: 0,
 explanation: "Правильне виправлення.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Випробування золотого шляху...",
 options: [
 "Full loop spawn to reward",
 "Explorer only",
 "GDD only",
 "Thumbnail",
 ],
 correctAnswer: 0,
 explanation: "Наскрізний.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 12.2 базується на...",
 options: [
 "Lesson 12.1 GDD plan",
 "Empty",
 "Module 1 only",
 "Coins only",
 ],
 correctAnswer: 0,
 explanation: "Плануйте, потім будуйте.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 12.3 - це...",
 options: [
 "Playtesting",
 "Publish",
 "Portfolio",
 "SHOWCASE",
 ],
 correctAnswer: 0,
 explanation: "Тестування.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Тест повторного приєднання підтверджує...",
 options: [
 "Persistence works",
 "UI color",
 "NPC name",
 "Sky",
 ],
 correctAnswer: 0,
 explanation: "Зберегти/завантажити.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 12.2 зберегти назву...",
 options: [
 "Lesson 12.2 - Final Integration",
 "SHOWCASE DAY",
 "Published",
 "GDD",
 ],
 correctAnswer: 0,
 explanation: "Зберегти інтеграцію.",
 },
 ],
 },
}

export const ukLesson123 = {
 lessonId: "lesson-roblox-12-3",
 moduleId: "module-12",
 order: 3,
 title: "12.3 - Тестування",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Проведіть три структуровані тестові сесії з контрольним списком",
 "Класифікуйте проблеми як критичні, UX, баланс, косметичні",
 "Створити пріоритетний список виправлень із серйозністю",
 "Виправте повторювані больові точки перед одноразовими думками",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Тестування гри з метою** - а не «спостерігати, як друзі випадково клацають».

**Хід уроку:**
1. **Теорія (40 хв)** - контрольний список + пріоритети
2. **Практика (~25 хв)** - 3 заняття + список виправлень
3. **Вікторина (10 хв)** - проходження **70%**

Використовуйте збірку **Урок 12.2 - Остаточна інтеграція**.`,
 },
 {
 title: "Контрольний список Playtest",
 content: `| # | Спостереження | Пас? | Примітки |
|---|-------------|-------|-------|
| 1 | Ясна адаптація в 60-х | | |
| 2 | Перша винагорода протягом 10 хвилин | | |
| 3 | Без програмного блокування | | |
| 4 | Магазин/квест/головоломка зрозуміло | | |
| 5 | Зберегти роботи після повторного приєднання | | |
| 6 | Немає серйозних помилок виведення | | |
| 7 | Продуктивність прийнятна | | |
| 8 | Аудіо не втомлює слух | | |
| 9 | Інтерфейс користувача для читання мобільного розміру | | |
| 10 | Весело - грали б знову? | | |`,
 },
 {
 title: "Категорії тяжкості",
 content: `| Категорія | Приклади | Запуск? |
|----------|----------|---------|
| **P0 Критичний** | Збій, втрата даних, програмне блокування | Виправити зараз |
| **P1 UX** | Заплутана мета, крихітний текст | Виправити зараз |
| **P2 Баланс** | Занадто жорсткий слиз | Незабаром |
| **P3 Cosmetic** | Неправильний колір знака | Пізніше |

**Запуск виправляє P0-P1** перед P3.`,
 },
 {
 title: "Протокол сесії",
 content: `**За сеанс (15 хвилин гри):**
1. Тестер не отримує **підказок** перші 5 хв
2. **Думай вголос** заохочується
3. **Дивишся** - не тренуєш
4. Проблеми з часовими мітками:\`04:20 - did not find shop\` 5. Розкажіть про 3 запитання:
 - Що було весело?
 - Що збентежило?
 - Що зламалося?

**3 різні тестери**, якщо можливо - шаблони мають значення.`,
 },
 {
 title: "Виправити шаблон списку",
 content: `| ID | Випуск | Тяжкість | Власник | Статус |
|----|-------|----------|-------|--------|
| 1 | Квест HUD приховано | P1 | Ви | фіксований |
| 2 | Помилка збереження монет | P0 | Ви | відкрити |

Виправте **повторювані** проблеми - якщо 2/3 тестувальників застрягли в магазині, виправте вивіску магазину.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Виконано 3 ігрові тести
- [ ] Список виправлень із адресою P0/P1
- [ ] Золотий шлях проходить після виправлень
- [ ] Зберегти:\`Lesson 12.3 - Playtest Pass\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Інструктаж під час іспиту",
 explanation: "Приховує помилки UX.",
 correctApproach: "Дивіться спочатку тихо",
 },
 {
 mistake: "Тільки один тестер",
 explanation: "Міс візерунки.",
 correctApproach: "Три сеанси",
 },
 {
 mistake: "Фіксація косметики перед софтлоком",
 explanation: "Неправильний пріоритет.",
 correctApproach: "P0 перший",
 },
 {
 mistake: "Немає письмового списку виправлень",
 explanation: "Забудьте про проблеми.",
 correctApproach: "Стіл трекера",
 },
 ],
 summary: "Ви провели три структуровані ігрові тести зі списком виправлень на основі серйозності, визначили пріоритетність критичних проблем і проблем UX і перевірили золотий шлях після виправлень - збірка відповідає якості кандидата на запуск.",
 practiceTask: {
 title: "Запуск контрольного списку тестування гри (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** 3 сеанси + пріоритетні виправлення.

### Part A - Тести (18 хв)
1. Запустіть контрольний список із 3 тестерами (або 3 самостійними запусками наосліп)
2. Часові мітки журналу + серйозність

### Part B - Виправлення (5 хв)
1. Виправте всі проблеми P0 і основні P1
2. Перевірте золотий шлях один раз

### Part C - Зберегти (2 хв)
1. **Зберегти в Roblox** →\`Lesson 12.3 - Playtest Pass\` 2. **Практика завершена**`,
 hints: [
 "Думати вголос виявляє плутанину",
 "Повторний біль > одна думка",
 "Опитування до/після за бажанням",
 ],
 optionalChallenge: "Опитування Google Form до/після виправлень.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Проблеми P0 є...",
 options: [
 "Critical launch blockers",
 "Cosmetic only",
 "Optional",
 "Future",
 ],
 correctAnswer: 0,
 explanation: "Виправте зараз.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Думки вголос допомагають знайти...",
 options: [
 "UX confusion",
 "Robux",
 "Terrain",
 "Version",
 ],
 correctAnswer: 0,
 explanation: "Розум гравця.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Три сеанси знаходять...",
 options: [
 "Repeated patterns",
 "Nothing",
 "Only bugs",
 "Only art",
 ],
 correctAnswer: 0,
 explanation: "Дані шаблону.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Не тренуйтеся рано, тому що...",
 options: [
 "Hides real onboarding",
 "Required",
 "Faster",
 "Rules",
 ],
 correctAnswer: 0,
 explanation: "Дійсний тест.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Виправити пріоритет перед косметичним...",
 options: [
 "Critical and UX",
 "Colors first",
 "Trailer first",
 "Skip",
 ],
 correctAnswer: 0,
 explanation: "Порядок запуску.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Урок 12.3 готує до...",
 options: [
 "Publish in 12.4",
 "GDD only",
 "Terrain",
 "Empty",
 ],
 correctAnswer: 0,
 explanation: "Запуск готовий.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Soft-lock - це суворість...",
 options: [
 "P0 critical",
 "P3 cosmetic",
 "Ignore",
 "Feature",
 ],
 correctAnswer: 0,
 explanation: "Блокувальник.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Золотий шлях після виправлень...",
 options: [
 "Must pass",
 "Optional",
 "Deleted",
 "Banned",
 ],
 correctAnswer: 0,
 explanation: "Перевірка.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Урок 12.4 охоплює...",
 options: [
 "Publishing to Roblox",
 "Only testing",
 "Only GDD",
 "NPC",
 ],
 correctAnswer: 0,
 explanation: "Звільнення.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Урок 12.3 зберегти назву...",
 options: [
 "Lesson 12.3 - Playtest Pass",
 "Published",
 "Portfolio",
 "SHOWCASE",
 ],
 correctAnswer: 0,
 explanation: "Зберегти проходження тесту.",
 },
 ],
 },
}

export const ukLesson124 = {
 lessonId: "lesson-roblox-12-4",
 moduleId: "module-12",
 order: 4,
 title: "12.4 - Публікація",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Опублікуйте місце в Roblox із назвою й описом",
 "Завантажте піктограму та мініатюру, які пояснюють процес гри",
 "Налаштуйте доступ до гри та налаштування безпеки",
 "Перевірте опублікований досвід із нового облікового запису",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Publish to Roblox** — це більше ніж одна кнопка: метадані, іконка, безпека, тест у live-режимі.

**Хід уроку:**
1. **Теорія (40 хв)** - конвеєр публікації
2. **Практика (~25 хв)** - опублікуйте свій остаточний проект
3. **Вікторина (10 хв)** - проходження **70%**`,
 },
 {
 title: "Попередня публікація перепустки",
 content: `| Перевірте | Готово? |
|-------|-------|
| Останнє збереження завантажених | |
| Немає хаків лише для Studio | |
| DataStore API увімкнено (якщо використовується) | |
| Відповідний чат/фільтр | |
| Немає зламаного ікру | |
| Name гри написана правильно | |
| Опис відповідає дійсному геймплею | |`,
 },
 {
 title: "Публікуйте крок за кроком",
 content: `1. **File → Publish to Roblox** (або **File → Save to Roblox**)
2. **Ім’я** - чітке, доступне для пошуку (не «Без назви»)
3. **Опис** - хук + те, що ви робите + підказка щодо елементів керування
4. **Жанр/теги** - відповідність вмісту
5. **Іконка** 512×512 - читабельна при маленькому розмірі
6. **Ескізи** - ігровий процес, а не порожня базова панель
7. **Налаштувати** → дозволи (публічні/приватні), вік
8. **Створити** → скопіювати **посилання на гру**`,
 },
 {
 title: "Шаблон опису",
 content: `\`\`\`
[Hook sentence from GDD pitch]

WHAT YOU DO:
• Complete quests from Guide Maya
• Solve laser puzzles and earn coins
• Buy gear and level up stats

TIP: Talk to the yellow marker at spawn first!

Built in SmartCode Academy Roblox Studio course.
\`\`\`**Чесно** - без фальшивих обіцянок.`,
 },
 {
 title: "Підказки щодо значків і мініатюр",
 content: `| Актив | Порада |
|-------|-----|
| **Значок** | Один character + яскравий фон |
| **Великий палець 1** | Екшн кадр - головоломка або магазин |
| **Великий палець 2** | Хаб широкий постріл |
| **Контраст** | Читається на головному екрані телефону |

Уникайте захаращеного тексту на значку - нерозбірливий маленький.`,
 },
 {
 title: "Основи безпеки запуску",
 content: `- **Публічний** лише тоді, коли готовий для незнайомців
- Перегляньте поведінку **чату** в опублікованому місці
- Існує система **Report** (за замовчуванням Roblox)
- Немає придатних для експлуатації пультів (сервер перевіряє всі)
- **Тест альтернативного облікового запису** - приєднайтеся як новий гравець

**Дозволи:** хто може редагувати чи грати - командні ролі у груповій грі.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Опубліковано в Roblox
- [ ] Значок + 1+ ескіз завантажено
- [ ] Опис відповідає кроку GDD
- [] Живе посилання перевірено (нове приєднання)
- [ ] Зберегти нотатки + посилання:\`Lesson 12.4 - Published\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Опис обіцяє функції, яких немає в грі",
 explanation: "Погані відгуки.",
 correctApproach: "Чесний гачок",
 },
 {
 mistake: "Сіра мініатюра за умовчанням",
 explanation: "Низькі кліки.",
 correctApproach: "Скріншот ігрового процесу",
 },
 {
 mistake: "Ніколи не тестуйте живе посилання",
 explanation: "Не публікуйте зламану збірку — спочатку виправте помилки.",
 correctApproach: "Альтернативне приєднання до облікового запису",
 },
 {
 mistake: "Studio API вимкнено, але гра використовує DataStore",
 explanation: "Зберегти не вдалося в прямому ефірі.",
 correctApproach: "Увімкнути служби API",
 },
 ],
 summary: "Ви пройшли перевірку перед публікацією, опублікували її з назвою/описом/іконкою/ескізами, налаштували параметри доступу та підтвердили живе посилання - ваша гра доступна на Roblox для справжніх гравців.",
 practiceTask: {
 title: "Publish to Roblox (~25 хв)",
 difficulty: "beginner",
 description: `**Ціль:** Посилання на гру в прямому ефірі, загальнодоступне чи не зазначене.

### Part A - Активи (10 хв)
1. Написати опис з GDD
2. Підготувати іконку 512×512 + 1 мініатюру

### Part B - Публікація (12 хв)
1. Опублікуйте в Roblox - усі метадані
2. Налаштуйте параметри доступу + віку

### Part C - Тест наживо (3 хв)
1. Приєднайтеся за посиланням (альтернативний обліковий запис, якщо можливо)
2. Golden path працює наживо
3. **Практика завершена** - зберегти URL-адресу гри в GDD`,
 hints: [
 "Скріншот Студія для мініатюр",
 "Спочатку опублікуйте приватно для перевірки викладачами",
 "Необов’язковий виклик A/B",
 ],
 optionalChallenge: "Два варіанти ескізів для перевірки кліків.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Публікація включає...",
 options: [
 "Metadata icon thumbnails settings",
 "Only code",
 "Only GDD",
 "Terrain",
 ],
 correctAnswer: 0,
 explanation: "Повний конвеєр.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Опис повинен...",
 options: [
 "Match real gameplay",
 "Promise fake features",
 "Be empty",
 "Hide controls",
 ],
 correctAnswer: 0,
 explanation: "Чесність.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Значок повинен добре читатися...",
 options: [
 "At small phone size",
 "Only 4K",
 "Never",
 "As paragraph",
 ],
 correctAnswer: 0,
 explanation: "Виявленість.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Тест альтернативного облікового запису знаходить...",
 options: [
 "Live-only bugs",
 "Nothing",
 "Terrain bugs",
 "GDD bugs",
 ],
 correctAnswer: 0,
 explanation: "Свіжий гравець.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Ігри DataStore потребують...",
 options: [
 "API services enabled",
 "No publish",
 "No scripts",
 "UI only",
 ],
 correctAnswer: 0,
 explanation: "Живі сейви.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Далі йде урок 12.4...",
 options: [
 "12.3 playtest pass",
 "12.1 only",
 "Empty",
 "Module 1",
 ],
 correctAnswer: 0,
 explanation: "Готова конструкція.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 12.5 - це...",
 options: [
 "Portfolio post",
 "More coding",
 "Terrain",
 "NPC only",
 ],
 correctAnswer: 0,
 explanation: "Показати роботу.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Публічна публікація, коли...",
 options: [
 "Ready for strangers",
 "Never tested",
 "Broken",
 "Empty",
 ],
 correctAnswer: 0,
 explanation: "Безпека.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Сервер перевіряє віддалені пристрої, оскільки...",
 options: [
 "Live exploiters exist",
 "Not needed",
 "Client only",
 "Lag",
 ],
 correctAnswer: 0,
 explanation: "Безпека.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Результатом уроку 12.4 є...",
 options: [
 "Live Roblox game link",
 "GDD only",
 "Trailer",
 "Notes only",
 ],
 correctAnswer: 0,
 explanation: "Опубліковано.",
 },
 ],
 },
}

export const ukLesson125 = {
 lessonId: "lesson-roblox-12-5",
 moduleId: "module-12",
 order: 5,
 title: "12.5 - Портфоліо",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Напишіть допис у портфоліо з презентацією, системами, завданнями, уроками",
 "Додайте GIF-файли або знімки екрана та посилання для відтворення",
 "Виділіть три технічні системи з курсу",
 "Використовуйте чіткий стриманий тон у стилі форуму для розробників",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**Портфоліо** доводить, що ви думаєте як розробник, а не просто граєте як розробник.

**Хід уроку:**
1. **Теорія (40 хв)** - структура посту
2. **Практика (~25 хв)** - портфоліо + проект публікації розробника
3. **Вікторина (10 хв)** - проходження **70%**`,
 },
 {
 title: "Портфоліо сторітелінг",
 content: `Скріншоти одні = слабкі.

Потужне портфоліо показує:
- **Що** ти збудував
- **Як** (системи)
- **Найскладніша помилка** та виправлення
- **Чого ти навчився**
- **Play посилання**`,
 },
 {
 title: "Структура поста",
 content: `## [Name гри] - Фінальний проект Roblox Studio

**Пітч:** одне речення

**Що я побудував:**
- Клієнт-серверний магазин (Модуль 7)
- Квест + центр NPC (Модуль 8)
- RPG інвентар + збереження (Модуль 9)
- Лазерна головоломка + процедурні раунди (Модуль 10)

**Найскладніший виклик:**
[напр. Десинхронізація інвентаризації DataStore - виправлено за допомогою серіалізації з версіями]

**Чого я навчився:**
- Повноваження сервера для економ
- Керовані подіями > цикли спаму

**Play:** [посилання Roblox]

**Скріншоти:** 3-5 зображень або GIF-файлів`,
 },
 {
 title: "Слід виділити три системи",
 content: `Виберіть свою **найбільшу трійку** з курсу:

| Приклад | Одностроковий браг |
|---------|----------------|
| Магазин | Захистіть касира сервера за допомогою RemoteEvents |
| Квест | Таблиця стану для кожного гравця, без глобального експлойту |
| Головоломка | Цілі Raycast + процедурні варіанти |
| Гонки | Перевірка порядку checkpoint 3 кола |
| Полірування | Завантаження + багаторівневий SFX + пропуск UX |

**До/після**, якщо можливо, один знімок екрана.`,
 },
 {
 title: "Голос, готовий до Devforum",
 content: `**Роби:**
- Окремі технічні умови
- Чесна історія виклику
- Попросіть відгук

**Не:**
- "НАЙКРАЩА ГРА КОЛИ-небудь!!!"
- Розпливчасте "було важко"
- Немає посилання, немає доказів

**90-секундний трейлер** необов’язково - найпотужніший демонстраційний ресурс.`,
 },
 {
 title: "Контрольний список перед початком практики",
 content: `- [ ] Publish draft завершено (усі розділи)
- [] 3+ скріншоти або GIF-файли
- [ ] Посилання для відтворення працює
- [ ] 3 системи, виділені деталями
- [ ] Зберегти:\`Lesson 12.5 - Portfolio Post\``,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Хайп без технічних деталей",
 explanation: "Не заслуговує довіри.",
 correctApproach: "Системи + докази",
 },
 {
 mistake: "Несправне посилання на відтворення в публікації",
 explanation: "Соромно.",
 correctApproach: "Перевірте посилання перед публікацією",
 },
 {
 mistake: "Жодна історія викликів",
 explanation: "Розповідь про міс зростання.",
 correctApproach: "Найважчий параграф про помилку",
 },
 {
 mistake: "Стіна з текстом без зображень",
 explanation: "Ніхто не читає.",
 correctApproach: "GIF-файли/скріншоти",
 },
 ],
 summary: "Ви написали допис у портфоліо з презентацією, трьома технічними моментами, історією виклику, отриманими уроками, медіа та посиланням на гру - ви можете представити себе як серйозного творця Roblox.",
 practiceTask: {
 title: "Портфоліо + публікація розробника (~25 хв)",
 difficulty: "beginner",
 description: `**Мета:** Публікуємий запис портфоліо.

### Part A - Чернетка (15 хв)
1. Усі розділи публікацій заповнені
2. Виділено 3 системи
3. Найскладніший виклик + виправлення

### Part B - ЗМІ (8 хв)
1. 3 скріншоти або 1 короткий GIF
2. Посилання на тестову гру в публікації

### Part C - Поділіться (2 хв)
1. Зберегти на платформі doc / class
2. **Практика завершена**`,
 hints: [
 "GIF: 10-20 секунд золотий шлях",
 "До/після Explorer або UI",
 "Закінчити словами \"вітаємо відгук\"",
 ],
 optionalChallenge: "90-секундний трейлер відео.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "Потужне портфоліо показує...",
 options: [
 "Process and systems not only screenshots",
 "Only hype",
 "No link",
 "Empty",
 ],
 correctAnswer: 0,
 explanation: "Розповідь.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "У розділі «Найважче завдання» показано...",
 options: [
 "Growth and problem solving",
 "Nothing",
 "Only art",
 "Only music",
 ],
 correctAnswer: 0,
 explanation: "Достовірність.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Посилання для відтворення має...",
 options: [
 "Work when clicked",
 "Be hidden",
 "Fake",
 "Optional always",
 ],
 correctAnswer: 0,
 explanation: "доказ.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Голос Devforum - це...",
 options: [
 "Clear specific humble",
 "All caps hype",
 "Rude",
 "Empty",
 ],
 correctAnswer: 0,
 explanation: "професійний.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Виділіть 3 системи, щоб...",
 options: [
 "Show technical depth",
 "Confuse reader",
 "Remove game",
 "Skip course",
 ],
 correctAnswer: 0,
 explanation: "Очки гордості.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Далі йде урок 12.5...",
 options: [
 "12.4 published game",
 "12.1 only",
 "Empty",
 "Test only",
 ],
 correctAnswer: 0,
 explanation: "Потрібне посилання.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Урок 12.6 - це...",
 options: [
 "SHOWCASE DAY",
 "GDD",
 "Publish again",
 "Module 1",
 ],
 correctAnswer: 0,
 explanation: "Фінал.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "До/після допомагає...",
 options: [
 "Show progress",
 "Lag",
 "Ban",
 "Delete",
 ],
 correctAnswer: 0,
 explanation: "Візуальний доказ.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Попросіть відгук наприкінці...",
 options: [
 "Invites community",
 "Required Roblox",
 "Bans",
 "Removes",
 ],
 correctAnswer: 0,
 explanation: "Заручини.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Результатом уроку 12.5 є...",
 options: [
 "Portfolio post draft",
 "New game",
 "Only icon",
 "GDD only",
 ],
 correctAnswer: 0,
 explanation: "Портфоліо.",
 },
 ],
 },
}

export const ukLesson126 = {
 lessonId: "lesson-roblox-12-6",
 moduleId: "module-12",
 order: 6,
 title: "12.6 - SHOWCASE DAY",
 theoryMinutes: 40,
 quizMinutes: 10,
 estimatedTime: 50,
 learningObjectives: [
 "Проведіть 20-секундну презентацію та живу демонстрацію ігрового процесу",
 "Представте три технічні системи та історію виклику",
 "Поділіться отриманими уроками та планами на майбутнє",
 "Підготуйте резервну демонстраційну копію, якщо в прямому ефірі не вийде",
 ],
 theory: {
 sections: [
 {
 title: "Ваш сьогоднішній шлях (приблизно 40 хвилин)",
 content: `**ДЕНЬ ВІТРИНИ** - ви виступаєте як **справжній розробник ігор**.

Це **фінальний курс** - відзначте 72 уроки праці.

**Час презентації: ** ~5-8 хвилин + запитання та відповіді`,
 },
 {
 title: "План презентації",
 content: `| # | Сегмент | Час |
|---|---------|------|
| 1 | **Pitch** - зачіпне речення | 20 секунд |
| 2 | **Демоверсія в реальному часі** - золотий шлях | 2-3 хв |
| 3 | **Поглиблене занурення в системи** - 3 основні моменти | 1-2 хв |
| 4 | **Завдання + рішення** - одна історія | 1 хв |
| 5 | **Здобуті уроки** - 3 маркери | 30 сек |
| 6 | **Дорожня карта** - наступне оновлення | 30 сек |
| 7 | **Запитати** - відгук / тестери | 15 сек |`,
 },
 {
 title: "Демонстраційний резервний план",
 content: `Якщо live не вдається:
- **Відеозапис** золотого шляху (90 сек)
- **Слайд-шоу знімків екрана** з озвученням
- Другий пристрій увійшов як резервний

**Репетируйте 3 рази** мінімум - впевненість від практики.

**Друкована картка з підказками:** висоти + 3 назви систем + посилання.`,
 },
 {
 title: "Що й казати - системи",
 content: `**Приклад Script (адаптуйте свій):**

*"Я створив центр, де авторитетний серверний магазин і квести подають інвентар RPG зі збереженням DataStore. Лазерна головоломка використовує raycasts і процедурні макети - Модуль 10. Найскладнішою помилкою було подвійне витрачання на кліки магазину - виправлено за допомогою блокування покупки. Наступне оновлення: кооперативні гонки та один новий ланцюжок квестів."*`,
 },
 {
 title: "Підготовка запитань і відповідей",
 content: `Очікувані запитання:
- Скільки часу це зайняло?
- Що б ви зробили інакше?
- Чи дружній він до мобільних пристроїв?
- Можна мені пограти? → **посилання**
- ШІ допоміг? → чесна відповідь за правилами класу

**Короткі чіткі відповіді** - по 30 секунд.`,
 },
 {
 title: "Завершення курсу",
 content: `Ви пройшли **12 модулів, 72 уроки**:

| Модуль | Що ви здали |
|--------|-------------|
| 1-2 | Світ + obby |
| 3-4 | Економіка + магнат |
| 5-6 | Бойові + гонки |
| 7-8 | Магазин + живий світ |
| 9-10 | RPG + головоломки |
| 11-12 | Полірування + випуск |

**Зберегти:**\`SmartCode - Final Showcase\`+ святкувати.`,
 },
 {
 title: "Контрольний список перед демонстрацією",
 content: `- [ ] Зроблено 3 репетиції
- [ ] Резервне копіювання відео/скріншотів готове
- [ ] Play посилання на слайді/дописі
- [ ] Висота звуку запам’ятана або на картці
- [ ] **ВІТРИНА доставлена**`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Без репетиції",
 explanation: "Блукання або понаднормова робота.",
 correctApproach: "3 тренувальні заїзди",
 },
 {
 mistake: "Тільки технічний жаргон",
 explanation: "Аудиторія втрачена.",
 correctApproach: "Представлення, а потім демонстрація",
 },
 {
 mistake: "Немає резервного копіювання, якщо живий не вдається",
 explanation: "Паніка.",
 correctApproach: "Готове відео",
 },
 {
 mistake: "Пропустити вивчені уроки",
 explanation: "Історія міс зростання.",
 correctApproach: "3 чесних кулі",
 },
 ],
 summary: "Ви провели SHOWCASE DAY із презентацією, демонстрацією в прямому ефірі, системною історією, роздумом про завдання та дорожньою картою - курс SmartCode Roblox Studio завершено, і ви виходите на рівень творця, який публікує ігри.",
 practiceTask: {
 title: "Презентація SHOWCASE DAY (~40 хв)",
 difficulty: "beginner",
 description: `**Мета:** Впевнена презентація 5-8 хв.

### Part A - Підготовка (15 хв)
1. Напишіть підказку - сегменти плану
2. Запишіть 90-секундне резервне відео
3. Репетируйте хронометраж 3 рази

### Part B - Поточний час (20 хв)
1. Донести до класу / вчителя / запис
2. Жива демонстрація або резервне копіювання
3. Q&A - відповідь на 2 запитання

### Part C - завершено (5 хв)
1. Надішліть посилання на портфоліо + запис, якщо потрібно
2. **Курс повний** - 72/72 уроки
3. Святкуйте`,
 hints: [
 "Посміхніться, ви заслужили це",
 "Демонстрація повільна - аудиторія бачить інтерфейс користувача",
 "Одне чітке запитання наприкінці",
 ],
 optionalChallenge: "Питання та відповіді після показу + публічна дошка з дорожніми картами.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 10,
 questions: [
 {
 id: "q1",
 type: "multiple_choice",
 question: "ВІТРИНА починається з...",
 options: [
 "20-second pitch",
 "Hour of code",
 "Random",
 "GDD only",
 ],
 correctAnswer: 0,
 explanation: "Гачок перший.",
 },
 {
 id: "q2",
 type: "multiple_choice",
 question: "Резервне копіювання відео, якщо...",
 options: [
 "Live demo fails",
 "Never",
 "Required always",
 "Banned",
 ],
 correctAnswer: 0,
 explanation: "Сітка безпеки.",
 },
 {
 id: "q3",
 type: "multiple_choice",
 question: "Три репетиції будують...",
 options: [
 "Confidence",
 "Lag",
 "Bugs",
 "Robux",
 ],
 correctAnswer: 0,
 explanation: "Практика.",
 },
 {
 id: "q4",
 type: "multiple_choice",
 question: "Системи глибокого занурення охоплюють...",
 options: [
 "3 technical highlights",
 "Nothing",
 "Only art",
 "Only name",
 ],
 correctAnswer: 0,
 explanation: "Глибина.",
 },
 {
 id: "q5",
 type: "multiple_choice",
 question: "Дорожня карта ділиться...",
 options: [
 "Future updates",
 "Past only",
 "Secrets",
 "Passwords",
 ],
 correctAnswer: 0,
 explanation: "Погляд вперед.",
 },
 {
 id: "q6",
 type: "multiple_choice",
 question: "Курс має...",
 options: [
 "12 modules 72 lessons",
 "1 lesson",
 "No modules",
 "50 modules",
 ],
 correctAnswer: 0,
 explanation: "Повний навчальний план.",
 },
 {
 id: "q7",
 type: "multiple_choice",
 question: "Завершіть чітким запитом про...",
 options: [
 "Feedback or testers",
 "Money only",
 "Nothing",
 "Ban",
 ],
 correctAnswer: 0,
 explanation: "Заручини.",
 },
 {
 id: "q8",
 type: "multiple_choice",
 question: "Урок 12.6 завершується...",
 options: [
 "Entire Roblox course EN rich path",
 "Module 11 only",
 "Module 1",
 "Nothing",
 ],
 correctAnswer: 0,
 explanation: "Фінал.",
 },
 {
 id: "q9",
 type: "multiple_choice",
 question: "Історія виклику показує...",
 options: [
 "Problem solving growth",
 "Hype only",
 "No work",
 "Copy paste",
 ],
 correctAnswer: 0,
 explanation: "Автентичність.",
 },
 {
 id: "q10",
 type: "multiple_choice",
 question: "Після демонстрації ви...",
 options: [
 "Launch-ready creator mindset",
 "Done forever no updates",
 "Non-coder",
 "Tester only",
 ],
 correctAnswer: 0,
 explanation: "Дипломований будівельник.",
 },
 ],
 },
}
