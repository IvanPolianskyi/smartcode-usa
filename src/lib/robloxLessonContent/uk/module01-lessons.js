/** Roblox v2 Module 01 UK — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE // reserved
void MC

export const ukLesson11 = {
  "lessonId": "lesson-roblox-1-1",
  "moduleId": "module-01",
  "order": 1,
  "title": "1.1 — Ласкаво просимо до Studio",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "відкрити Studio, зробити перший Part і зберегти свій Place.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** відкрити Studio, зробити перший Part і зберегти свій Place.\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Place з іменем `M1_Dvir_Імʼя` + один Part `Foundation` (підлога двору) на сітці."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M1_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Кроки практики",
        "content": "1. New → Baseplate 2. Part → перейменувати на `Foundation` 3. Anchored = ✓ 4. Save to Roblox → назва `M1_Dvir_Імʼя`"
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Відкрити свій Place вдома, додати Part `TestBlock`, зберегти. Скрін Explorer на наступний урок."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Не зберегли Place (після перезапуску все зникло)",
      "explanation": "Так часто ламається урок — виправ і перевір Play.",
      "correctApproach": "Повтори кроки практики, потім зроби по-своєму."
    },
    {
      "mistake": "Part провалився / не Anchored",
      "explanation": "Так часто ламається урок — виправ і перевір Play.",
      "correctApproach": "Повтори кроки практики, потім зроби по-своєму."
    },
    {
      "mistake": "Пишуть українською в іменах обʼєктів з пробілами без системи — домовитись: `PascalCase` або `snake` латиницею",
      "explanation": "Так часто ламається урок — виправ і перевір Play.",
      "correctApproach": "Повтори кроки практики, потім зроби по-своєму."
    }
  ],
  "summary": "Урок **1.1 — Ласкаво просимо до Studio** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Ласкаво просимо до Studio",
    "difficulty": "beginner",
    "description": "### Завдання\nPlace з іменем `M1_Dvir_Імʼя` + один Part `Foundation` (підлога двору) на сітці.\n\n\n### Кроки\n1. New → Baseplate 2. Part → перейменувати на `Foundation` 3. Anchored = ✓ 4. Save to Roblox → назва `M1_Dvir_Імʼя`\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
    ],
    "optionalChallenge": "Челендж: хто швидше і акуратніше збереже + надішле скрін Explorer у викладачу"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Для чого потрібен Roblox Studio?",
        "options": [
          "Лише грати в чужі ігри",
          "Створювати й редагувати ігри/світи",
          "Завантажувати фільми",
          "Писати повідомлення друзям"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Створювати й редагувати ігри/світи"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Що таке Place у Roblox?",
        "options": [
          "Скін аватара",
          "Файл/світ твоєї гри",
          "Група друзів",
          "Магазин Robux"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Файл/світ твоєї гри"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Яка кнопка зберігає проєкт у хмару Roblox?",
        "options": [
          "Play",
          "Save to Roblox / Publish",
          "Toolbox",
          "Terrain"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Save to Roblox / Publish"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Навіщо Part на початку уроку називаємо `Foundation`?",
        "options": [
          "Щоб Studio швидше працювало",
          "Щоб легко знаходити обʼєкт в Explorer",
          "Бо інакше Part не зʼявиться",
          "Це обовʼязкова назва від Roblox"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Щоб легко знаходити обʼєкт в Explorer"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Що робить властивість Anchored = true?",
        "options": [
          "Робить Part невидимим",
          "Фіксує Part, щоб не падав від гравітації",
          "Збільшує Part удвічі",
          "Вмикає звук"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Фіксує Part, щоб не падав від гравітації"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Що станеться, якщо Part не закріпити (Anchored = false) на Baseplate-світі з гравітацією?",
        "options": [
          "Нічого",
          "Може впасти / зʼїхати",
          "Автоматично стане моделлю",
          "Стане золотим"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Може впасти / зʼїхати"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Де краще дивитися список усіх обʼєктів у світі?",
        "options": [
          "У чаті",
          "В Explorer",
          "У Avatar Editor",
          "У магазині"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: В Explorer"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Навіщо на уроці домовились іменувати обʼєкти латиницею/PascalCase?",
        "options": [
          "Бо українська заборонена в Studio",
          "Щоб імена були зрозумілі й зручні для роботи в команді/коді пізніше",
          "Щоб Part став більшим",
          "Це потрібно для Robux"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Щоб імена були зрозумілі й зручні для роботи в команді/коді пізніше"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Що робити першим після створення важливих змін у світі?",
        "options": [
          "Видалити Baseplate",
          "Зберегти Place",
          "Відкрити Toolbox",
          "Увімкнути музику"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Зберегти Place"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Який артефакт ми зробили на уроці 1.1?",
        "options": [
          "Готову гру з монстрами",
          "Place + Part Foundation",
          "Скрипт на Lua",
          "Анімацію персонажа"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Place + Part Foundation"
      }
    ]
  }
}

export const ukLesson12 = {
  "lessonId": "lesson-roblox-1-2",
  "moduleId": "module-01",
  "order": 2,
  "title": "1.2 — Камера й перша доріжка",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "вільно крутити камеру й зібрати рівнішу доріжку з кількох Part на сітці.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** вільно крутити камеру й зібрати рівнішу доріжку з кількох Part на сітці.\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Доріжка `Path` з 8–12 блоків від краю `Foundation` до «воріт» (позначити двома стовпами)."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M1_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Кроки практики",
        "content": "1. Разом — 4 блоки 2. Самі — ще 4–8 + ворота 3. Челендж — Play Mode тест «чи рівні»"
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Додати збоку маленьку «клумбу» з 3 Part іншого кольору. Не ламати доріжку."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Читати теорію без відкритої Studio",
      "explanation": "Без практики складніше запамʼятати.",
      "correctApproach": "Studio поруч із сторінкою. Кожен крок одразу повторюй."
    },
    {
      "mistake": "Не зберігати Place",
      "explanation": "Після перезапуску робота може зникнути.",
      "correctApproach": "File → Save to Roblox після важливих змін."
    },
    {
      "mistake": "Безіменні Part1/Part2",
      "explanation": "Потім важко знайти потрібний обʼєкт.",
      "correctApproach": "Давай зрозумілі імена і Folder/Model."
    }
  ],
  "summary": "Урок **1.2 — Камера й перша доріжка** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Камера й перша доріжка",
    "difficulty": "beginner",
    "description": "### Завдання\nДоріжка `Path` з 8–12 блоків від краю `Foundation` до «воріт» (позначити двома стовпами).\n\n\n### Кроки\n1. Разом — 4 блоки 2. Самі — ще 4–8 + ворота 3. Челендж — Play Mode тест «чи рівні»\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
    ],
    "optionalChallenge": "Челендж: пройти доріжку в Play Mode без зістрибування (Anchored?)"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Яка клавіша/дія зазвичай допомагає крутити огляд камери навколо світу?",
        "options": [
          "Тільки Enter",
          "ПКМ + рух миші (або подібне керування камерою)",
          "Delete",
          "Publish"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: ПКМ + рух миші (або подібне керування камерою)"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Навіщо вмикати Snap to Grid при будівництві доріжки?",
        "options": [
          "Щоб Part світився",
          "Щоб блоки вставали рівніше один до одного",
          "Щоб пришвидшити інтернет",
          "Щоб увімкнути скрипти"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Щоб блоки вставали рівніше один до одного"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Що робить Duplicate (Ctrl+D)?",
        "options": [
          "Видаляє Part",
          "Створює копію виділеного обʼєкта",
          "Зберігає Place",
          "Відкриває Toolbox"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Створює копію виділеного обʼєкта"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Якщо блоки доріжки «східцями» різної висоти — що перевірити першим?",
        "options": [
          "Колір неба",
          "Position.Y / вирівнювання",
          "Імʼя акаунта",
          "Кількість друзів"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Position.Y / вирівнювання"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Навіщо тестувати доріжку через Play?",
        "options": [
          "Щоб опублікувати одразу",
          "Щоб відчути як гравець: чи зручно йти, чи немає дірок",
          "Щоб видалити Explorer",
          "Це обовʼязково для збереження"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Щоб відчути як гравець: чи зручно йти, чи немає дірок"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Чому стовпам дали імена `GateL` і `GateR`?",
        "options": [
          "Випадково",
          "Щоб розрізняти лівий і правий в Explorer",
          "Інакше не видно в грі",
          "Так вимагає Roblox"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Щоб розрізняти лівий і правий в Explorer"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Якщо Part доріжки падає під час Play — ймовірна причина?",
        "options": [
          "Anchored вимкнено",
          "Занадто гарний Material",
          "Довге імʼя",
          "Увімкнений Snap"
        ],
        "correctAnswer": 0,
        "explanation": "Anchored вимкнено"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Скільки блоків мінімум ми цілимо на доріжку на уроці?",
        "options": [
          "1",
          "8–12",
          "100",
          "0"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: 8–12"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Що таке «шар разом → самі → челендж»?",
        "options": [
          "Три спроби видалити Baseplate",
          "Три рівні складності практики на одному навику",
          "Три акаунти Roblox",
          "Три мови програмування"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Три рівні складності практики на одному навику"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Який артефакт уроку 1.2?",
        "options": [
          "Скрипт телепорта",
          "Доріжка + ворота",
          "UI меню",
          "NPC охоронець"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Доріжка + ворота"
      }
    ]
  }
}

export const ukLesson13 = {
  "lessonId": "lesson-roblox-1-3",
  "moduleId": "module-01",
  "order": 3,
  "title": "1.3 — Explorer: порядок у світі",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "навчитись знаходити, перейменовувати, ховати й складати обʼєкти в Folder.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** навчитись знаходити, перейменовувати, ховати й складати обʼєкти в Folder.\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Структура: ``` Workspace Yard (Folder) Foundation Path (Folder) → блоки доріжки GateL, GateR ```"
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M1_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Прибрати всі Part з іменами за замовчуванням. Скрін фінального Explorer."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Читати теорію без відкритої Studio",
      "explanation": "Без практики складніше запамʼятати.",
      "correctApproach": "Studio поруч із сторінкою. Кожен крок одразу повторюй."
    },
    {
      "mistake": "Не зберігати Place",
      "explanation": "Після перезапуску робота може зникнути.",
      "correctApproach": "File → Save to Roblox після важливих змін."
    },
    {
      "mistake": "Безіменні Part1/Part2",
      "explanation": "Потім важко знайти потрібний обʼєкт.",
      "correctApproach": "Давай зрозумілі імена і Folder/Model."
    }
  ],
  "summary": "Урок **1.3 — Explorer: порядок у світі** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Explorer: порядок у світі",
    "difficulty": "beginner",
    "description": "### Завдання\nСтруктура: ``` Workspace Yard (Folder) Foundation Path (Folder) → блоки доріжки GateL, GateR ```\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
    ],
    "optionalChallenge": "Зроби артефакт трохи крутішим і будь готовий показати 20 секунд."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Explorer показує…",
        "options": [
          "Тільки гравців онлайн",
          "Дерево обʼєктів у місці/сервісах",
          "Ціну Robux",
          "Список YouTube"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Дерево обʼєктів у місці/сервісах"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Folder у Workspace потрібен щоб…",
        "options": [
          "Пришвидшити Wi-Fi",
          "Групувати обʼєкти для порядку",
          "Замінити Material",
          "Увімкнути гравітацію"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Групувати обʼєкти для порядку"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Якщо Part лежить «всередині» Folder у дереві — це…",
        "options": [
          "Parent/child звʼязок у ієрархії",
          "Помилка Studio",
          "Видалений Part",
          "Окрема гра"
        ],
        "correctAnswer": 0,
        "explanation": "Parent/child звʼязок у ієрархії"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Навіщо перейменовувати `Part` → `Path_01`?",
        "options": [
          "Щоб швидше шукати й розуміти світ",
          "Бо Part не працює без імені Path",
          "Щоб стати адміном",
          "Це вмикає звук"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб швидше шукати й розуміти світ"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Що робити з зайвими тестовими кубами після експериментів?",
        "options": [
          "Залишити як є назавжди",
          "Видалити або скласти в Folder `Trash` і потім прибрати",
          "Опублікувати гру одразу",
          "Змінити небо"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Видалити або скласти в Folder `Trash` і потім прибрати"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Пошук у Explorer допомагає коли…",
        "options": [
          "Обʼєктів мало і всі видно",
          "Обʼєктів багато / треба швидко знайти за імʼям",
          "Немає інтернету",
          "Вимкнено Snap"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Обʼєктів багато / треба швидко знайти за імʼям"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чи змінює Folder сам по собі вигляд Part у грі?",
        "options": [
          "Так, завжди робить синім",
          "Ні, це організаційна «коробка»",
          "Видаляє Anchored",
          "Додає скрипт"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Ні, це організаційна «коробка»"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Яка структура була ціллю уроку?",
        "options": [
          "Усі Parts у випадковому порядку без імен",
          "`Yard` → Foundation / Path / Gate",
          "Тільки ServerStorage",
          "Тільки Lighting"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: `Yard` → Foundation / Path / Gate"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "«Сищик» на уроці тренує…",
        "options": [
          "Стрільбу",
          "Навичку орієнтуватися в Explorer",
          "Математику множення",
          "Монтаж відео"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Навичку орієнтуватися в Explorer"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Що здаємо як доказ порядку?",
        "options": [
          "Скрін аватара",
          "Скрін Explorer після прибирання",
          "Номер телефону",
          "Відео з TikTok"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Скрін Explorer після прибирання"
      }
    ]
  }
}

export const ukLesson14 = {
  "lessonId": "lesson-roblox-1-4",
  "moduleId": "module-01",
  "order": 4,
  "title": "1.4 — Part і Properties",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "свідомо змінювати Size, Color, Material, Transparency, CanCollide, Anchored.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** свідомо змінювати Size, Color, Material, Transparency, CanCollide, Anchored.\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "`Bench` (лавка): сидіння + 2 ніжки. Окремо `GlassPanel` з Transparency."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M1_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Стілець `Chair` (сидіння + спинка + 4 ніжки або спрощено 2). У Folder `Yard/Furniture`."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Читати теорію без відкритої Studio",
      "explanation": "Без практики складніше запамʼятати.",
      "correctApproach": "Studio поруч із сторінкою. Кожен крок одразу повторюй."
    },
    {
      "mistake": "Не зберігати Place",
      "explanation": "Після перезапуску робота може зникнути.",
      "correctApproach": "File → Save to Roblox після важливих змін."
    },
    {
      "mistake": "Безіменні Part1/Part2",
      "explanation": "Потім важко знайти потрібний обʼєкт.",
      "correctApproach": "Давай зрозумілі імена і Folder/Model."
    }
  ],
  "summary": "Урок **1.4 — Part і Properties** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Part і Properties",
    "difficulty": "beginner",
    "description": "### Завдання\n`Bench` (лавка): сидіння + 2 ніжки. Окремо `GlassPanel` з Transparency.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
    ],
    "optionalChallenge": "Челендж: «невидима стіна» (Transparency 1, CanCollide true) — друзі натрапляють у Play"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Properties — це…",
        "options": [
          "Список друзів",
          "Панель властивостей виділеного обʼєкта",
          "Магазин моделей",
          "Чат"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Панель властивостей виділеного обʼєкта"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Size впливає на…",
        "options": [
          "Імʼя акаунта",
          "Розміри Part (довжина/висота/глибина)",
          "Гучність музики",
          "FPS телефону"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Розміри Part (довжина/висота/глибина)"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Material Brick і Glass відрізняються…",
        "options": [
          "Тільки ціною Robux",
          "Візуалом (і іноді відчуттям поверхні)",
          "Тим, що Glass не можна Anchored",
          "Нічим"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Візуалом (і іноді відчуттям поверхні)"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Transparency = 1 означає…",
        "options": [
          "Part повністю видимий",
          "Part повністю прозорий (невидимий)",
          "Part видалено",
          "Part завжди падає"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Part повністю прозорий (невидимий)"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "CanCollide = false означає…",
        "options": [
          "Крізь Part можна пройти",
          "Part стає червоним",
          "Part не можна виділити",
          "Part стає Folder"
        ],
        "correctAnswer": 0,
        "explanation": "Крізь Part можна пройти"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Для підлоги двору зазвичай ставлять…",
        "options": [
          "Anchored = true",
          "Anchored = false завжди",
          "Transparency = 1 обовʼязково",
          "CanCollide = false"
        ],
        "correctAnswer": 0,
        "explanation": "Anchored = true"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "«Невидима стіна» на челенджі поєднує…",
        "options": [
          "Transparency 1 + CanCollide true",
          "Anchored false + Size 0",
          "Material Neon + CanCollide false",
          "Видалення Foundation"
        ],
        "correctAnswer": 0,
        "explanation": "Transparency 1 + CanCollide true"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Навіщо однакові ніжки лавки робити Duplicate?",
        "options": [
          "Щоб розміри й стиль збігались швидше",
          "Бо Studio дозволяє лише одну ніжку",
          "Щоб вимкнути Snap",
          "Це додає скрипт"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб розміри й стиль збігались швидше"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Де шукати Color / Material у Studio?",
        "options": [
          "У Properties (або відповідних інструментах Home)",
          "Тільки в телефоні",
          "У налаштуваннях Windows",
          "У Discord"
        ],
        "correctAnswer": 0,
        "explanation": "У Properties (або відповідних інструментах Home)"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Артефакт уроку 1.4?",
        "options": [
          "Лавка + скляна панель",
          "Повний Tycoon",
          "DataStore",
          "Анімація бігу"
        ],
        "correctAnswer": 0,
        "explanation": "Лавка + скляна панель"
      }
    ]
  }
}

export const ukLesson15 = {
  "lessonId": "lesson-roblox-1-5",
  "moduleId": "module-01",
  "order": 5,
  "title": "1.5 — Move, Scale, Rotate + Snap",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "точно ставити обʼєкти інструментами трансформації, без «кривого хаосу».",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** точно ставити обʼєкти інструментами трансформації, без «кривого хаосу».\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Паркан `Fence` з 6–10 секцій по периметру частини двору + вирівняна лавка біля доріжки."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M1_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Додати хвіртку `GateDoor` (1 Part у прорізі між GateL/GateR), поки без скрипта — просто модельна двері."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Читати теорію без відкритої Studio",
      "explanation": "Без практики складніше запамʼятати.",
      "correctApproach": "Studio поруч із сторінкою. Кожен крок одразу повторюй."
    },
    {
      "mistake": "Не зберігати Place",
      "explanation": "Після перезапуску робота може зникнути.",
      "correctApproach": "File → Save to Roblox після важливих змін."
    },
    {
      "mistake": "Безіменні Part1/Part2",
      "explanation": "Потім важко знайти потрібний обʼєкт.",
      "correctApproach": "Давай зрозумілі імена і Folder/Model."
    }
  ],
  "summary": "Урок **1.5 — Move, Scale, Rotate + Snap** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Move, Scale, Rotate + Snap",
    "difficulty": "beginner",
    "description": "### Завдання\nПаркан `Fence` з 6–10 секцій по периметру частини двору + вирівняна лавка біля доріжки.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
    ],
    "optionalChallenge": "Челендж на час: 4 рівні секції без наїзду одна на одну"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Інструмент Move потрібен щоб…",
        "options": [
          "Змінити колір неба",
          "Перемістити обʼєкт у просторі",
          "Написати код",
          "Купити GamePass"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Перемістити обʼєкт у просторі"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Scale змінює…",
        "options": [
          "Розмір обʼєкта",
          "Імʼя гравця",
          "Час доби в реальному світі",
          "Мову Studio"
        ],
        "correctAnswer": 0,
        "explanation": "Розмір обʼєкта"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Rotate на 90° зручний для…",
        "options": [
          "Випадкового хаосу",
          "Рівних поворотів стін/паркану",
          "Видалення Anchored",
          "Публікації"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Рівних поворотів стін/паркану"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Snap допомагає…",
        "options": [
          "Стрибати вище в грі",
          "Рухати/ масштаб з кроком сітки",
          "Автоматично писати скрипти",
          "Ховати Explorer"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Рухати/ масштаб з кроком сітки"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Якщо секції паркану наїжджають одна на одну…",
        "options": [
          "Це завжди добре",
          "Варто підігнати Move/Size і перевірити стики",
          "Треба видалити Foundation",
          "Треба вимкнути інтернет"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Варто підігнати Move/Size і перевірити стики"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Чому лавку «підганяють» до доріжки?",
        "options": [
          "Щоб виглядало природно і гравець розумів простір",
          "Бо інакше Play не запускається",
          "Це вимога Roblox",
          "Щоб зʼявились Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб виглядало природно і гравець розумів простір"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Який артефакт уроку?",
        "options": [
          "Паркан + вирівняна лавка",
          "Шутер",
          "Магазин UI",
          "Бейджі"
        ],
        "correctAnswer": 0,
        "explanation": "Паркан + вирівняна лавка"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Гарячі клавіші інструментів варто вчити бо…",
        "options": [
          "Прискорюють будівництво",
          "Без них Studio закривається",
          "Вони видаляють помилки коду",
          "Вони платні"
        ],
        "correctAnswer": 0,
        "explanation": "Прискорюють будівництво"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Якщо Rotate зробив «діагональний хаос», що зробити?",
        "options": [
          "Панікувати",
          "Undo / виставити рівні кути (0/90/180…)",
          "Видалити акаунт",
          "Відкрити новий курс Python"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Undo / виставити рівні кути (0/90/180…)"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Хвіртка в ДЗ на цьому етапі — це…",
        "options": [
          "Скрипт з Touched",
          "Модельний Part у прорізі воріт",
          "TeleportService",
          "DataStore"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Модельний Part у прорізі воріт"
      }
    ]
  }
}

export const ukLesson16 = {
  "lessonId": "lesson-roblox-1-6",
  "moduleId": "module-01",
  "order": 6,
  "title": "1.6 — Будуємо двір: композиція",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зібрати цілісну маленьку локацію за чеклістом геймдизайну lite.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** зібрати цілісну маленьку локацію за чеклістом геймдизайну lite.\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Двір, у якому видно **шлях гравця**: Spawn → Path → Gate → зона лавки. Додати `SpawnLocation` (якщо ще немає)."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M1_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Кроки практики",
        "content": "- [ ] Є старт (Spawn) - [ ] Є шлях - [ ] Є мета/ворота - [ ] Є місце «посидіти» (лавка) - [ ] Немає безіменних Part"
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Додати `SignBoard` (табличка-блок) біля входу. Текст поки можна Decal пізніше або просто яскравий колір."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Читати теорію без відкритої Studio",
      "explanation": "Без практики складніше запамʼятати.",
      "correctApproach": "Studio поруч із сторінкою. Кожен крок одразу повторюй."
    },
    {
      "mistake": "Не зберігати Place",
      "explanation": "Після перезапуску робота може зникнути.",
      "correctApproach": "File → Save to Roblox після важливих змін."
    },
    {
      "mistake": "Безіменні Part1/Part2",
      "explanation": "Потім важко знайти потрібний обʼєкт.",
      "correctApproach": "Давай зрозумілі імена і Folder/Model."
    }
  ],
  "summary": "Урок **1.6 — Будуємо двір: композиція** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Будуємо двір: композиція",
    "difficulty": "beginner",
    "description": "### Завдання\nДвір, у якому видно **шлях гравця**: Spawn → Path → Gate → зона лавки. Додати `SpawnLocation` (якщо ще немає).\n\n\n### Кроки\n- [ ] Є старт (Spawn) - [ ] Є шлях - [ ] Є мета/ворота - [ ] Є місце «посидіти» (лавка) - [ ] Немає безіменних Part\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
    ],
    "optionalChallenge": "Зроби артефакт трохи крутішим і будь готовий показати 20 секунд."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "SpawnLocation потрібен щоб…",
        "options": [
          "Гравець зʼявлявся в потрібному місці",
          "Малювати небо",
          "Зберігати Robux",
          "Видаляти Tools"
        ],
        "correctAnswer": 0,
        "explanation": "Гравець зʼявлявся в потрібному місці"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "«Шлях гравця» у level design означає…",
        "options": [
          "GPS у телефоні",
          "Зрозумілий маршрут, куди вести гравця полем зору й простором",
          "Список друзів",
          "Версію Studio"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Зрозумілий маршрут, куди вести гравця полем зору й простором"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Навіщо контраст кольору доріжки й трави/підлоги?",
        "options": [
          "Щоб шлях читався швидше",
          "Щоб Part падав",
          "Щоб вимкнути Snap",
          "Це заборонено"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб шлях читався швидше"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Playtest у групі допомагає…",
        "options": [
          "Побачити світ очима гравця",
          "Видалити Explorer",
          "Обійти збереження",
          "Нарахувати оцінку вчителю математики"
        ],
        "correctAnswer": 0,
        "explanation": "Побачити світ очима гравця"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Якщо гравець не розуміє куди йти — що покращити?",
        "options": [
          "Додати орієнтири: доріжка, ворота, контраст, Spawn",
          "Видалити всі Parts",
          "Вимкнути Anchored у підлоги",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Додати орієнтири: доріжка, ворота, контраст, Spawn"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Артефакт уроку 1.6?",
        "options": [
          "Цілісний двір зі шляхом",
          "Повний RPG",
          "Raycasting",
          "Blender-модель"
        ],
        "correctAnswer": 0,
        "explanation": "Цілісний двір зі шляхом"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Безіменні Part у фіналі локації — це…",
        "options": [
          "Ознака акуратної роботи",
          "Технічний борг / поганий тон",
          "Секретний буст швидкості",
          "Обовʼязкова вимога"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Технічний борг / поганий тон"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Лавка в дворі виконує роль…",
        "options": [
          "Точки інтересу / атмосфера",
          "Єдиного способу зберегти гру",
          "Заміни Spawn",
          "Серверного скрипта"
        ],
        "correctAnswer": 0,
        "explanation": "Точки інтересу / атмосфера"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Чому перевіряємо респавн?",
        "options": [
          "Щоб після смерті/входу гравець не зʼявлявся в дірці/поза картою",
          "Це потрібно лише для UI",
          "Без цього не працює Material",
          "Це для анімації обличчя"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб після смерті/входу гравець не зʼявлявся в дірці/поза картою"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "SignBoard у ДЗ — це…",
        "options": [
          "Орієнтир біля входу",
          "Система монетизації",
          "ModuleScript",
          "Terrain water"
        ],
        "correctAnswer": 0,
        "explanation": "Орієнтир біля входу"
      }
    ]
  }
}

export const ukLesson17 = {
  "lessonId": "lesson-roblox-1-7",
  "moduleId": "module-01",
  "order": 7,
  "title": "1.7 — Workspace і Storage",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зрозуміти різницю Workspace / ServerStorage / ReplicatedStorage на пальцях (без скриптів).",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** зрозуміти різницю Workspace / ServerStorage / ReplicatedStorage на пальцях (без скриптів).\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "У `ServerStorage` лежить запасна копія моделі лавки `Bench_Backup` (Group поки можна як Model або просто скопійовані Parts у Folder). У Workspace — тільки те, що має бути видно в грі."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M1_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "1 зайвий декор перенести в ServerStorage. У Workspace лишити «чисту сцену»."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Читати теорію без відкритої Studio",
      "explanation": "Без практики складніше запамʼятати.",
      "correctApproach": "Studio поруч із сторінкою. Кожен крок одразу повторюй."
    },
    {
      "mistake": "Не зберігати Place",
      "explanation": "Після перезапуску робота може зникнути.",
      "correctApproach": "File → Save to Roblox після важливих змін."
    },
    {
      "mistake": "Безіменні Part1/Part2",
      "explanation": "Потім важко знайти потрібний обʼєкт.",
      "correctApproach": "Давай зрозумілі імена і Folder/Model."
    }
  ],
  "summary": "Урок **1.7 — Workspace і Storage** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Workspace і Storage",
    "difficulty": "beginner",
    "description": "### Завдання\nУ `ServerStorage` лежить запасна копія моделі лавки `Bench_Backup` (Group поки можна як Model або просто скопійовані Parts у Folder). У Workspace — тільки те, що має бути видно в грі.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
    ],
    "optionalChallenge": "Зроби артефакт трохи крутішим і будь готовий показати 20 секунд."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Workspace — це місце де…",
        "options": [
          "Лежать обʼєкти ігрового світу, які зазвичай видно/активні в сцені",
          "Зберігаються лише паролі",
          "Живуть лише скрипти UI",
          "Вимикається камера"
        ],
        "correctAnswer": 0,
        "explanation": "Лежать обʼєкти ігрового світу, які зазвичай видно/активні в сцені"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "ServerStorage більше схожий на…",
        "options": [
          "Склад за лаштунками",
          "Небо",
          "Чат",
          "Магазин одягу аватара"
        ],
        "correctAnswer": 0,
        "explanation": "Склад за лаштунками"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Якщо Part тільки в ServerStorage, гравець у Play його…",
        "options": [
          "Завжди бачить посеред карти",
          "Зазвичай не бачить, доки не перенесуть у Workspace (чи не заспавнять кодом)",
          "Чує як музику",
          "Отримує як Badge"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Зазвичай не бачить, доки не перенесуть у Workspace (чи не заспавнять кодом)"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Навіщо тримати Backup лавки в Storage?",
        "options": [
          "Щоб мати запасну копію / шаблон",
          "Щоб лавка стрибала сама",
          "Щоб видалити Anchored",
          "Це єдиний спосіб зберегти Place"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб мати запасну копію / шаблон"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "ReplicatedStorage на цьому уроці ми згадуємо як…",
        "options": [
          "«Спільну валізу» на майбутнє зі скриптами",
          "Єдине місце для Terrain",
          "Заміну Explorer",
          "Інструмент Rotate"
        ],
        "correctAnswer": 0,
        "explanation": "«Спільну валізу» на майбутнє зі скриптами"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Чи варто валити всі тестові куби в Workspace назавжди?",
        "options": [
          "Так",
          "Ні, краще прибрати або на склад",
          "Обовʼязково",
          "Тільки по понеділках"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Ні, краще прибрати або на склад"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Експеримент «переніс у Workspace → видно» показує…",
        "options": [
          "Звʼязок місця зберігання і видимості/активності у світі",
          "Що Snap зламаний",
          "Що треба купити Robux",
          "Що Studio англійською гірше"
        ],
        "correctAnswer": 0,
        "explanation": "Звʼязок місця зберігання і видимості/активності у світі"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Артефакт уроку 1.7?",
        "options": [
          "Backup у ServerStorage + чистіша сцена",
          "Готовий шутер",
          "Система діалогів NPC",
          "Публікація в топ ігор"
        ],
        "correctAnswer": 0,
        "explanation": "Backup у ServerStorage + чистіша сцена"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Яка аналогія для Workspace?",
        "options": [
          "Сцена спектаклю",
          "Підводний кабель",
          "Калькулятор",
          "Принтер"
        ],
        "correctAnswer": 0,
        "explanation": "Сцена спектаклю"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "На М1 ми пишемо складні скрипти для Storage?",
        "options": [
          "Так, обовʼязково RemoteEvent",
          "Ні, лише розуміємо місця зберігання",
          "Тільки на Python",
          "Тільки голосом"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Ні, лише розуміємо місця зберігання"
      }
    ]
  }
}

export const ukLesson18 = {
  "lessonId": "lesson-roblox-1-8",
  "moduleId": "module-01",
  "order": 8,
  "title": "1.8 — Чекпоінт: Мій перший двір",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "показати локацію за чеклістом уроку.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** показати локацію за чеклістом уроку.\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Готовий двір за чеклістом уроку."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M1_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Нічого не ламати. Зберегти Place. Придумати назву свого двору (слово)."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Читати теорію без відкритої Studio",
      "explanation": "Без практики складніше запамʼятати.",
      "correctApproach": "Studio поруч із сторінкою. Кожен крок одразу повторюй."
    },
    {
      "mistake": "Не зберігати Place",
      "explanation": "Після перезапуску робота може зникнути.",
      "correctApproach": "File → Save to Roblox після важливих змін."
    },
    {
      "mistake": "Безіменні Part1/Part2",
      "explanation": "Потім важко знайти потрібний обʼєкт.",
      "correctApproach": "Давай зрозумілі імена і Folder/Model."
    }
  ],
  "summary": "Урок **1.8 — Чекпоінт: Мій перший двір** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Чекпоінт: Мій перший двір",
    "difficulty": "beginner",
    "description": "### Завдання\nГотовий двір за чеклістом уроку.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
    ],
    "optionalChallenge": "Зроби артефакт трохи крутішим і будь готовий показати 20 секунд."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Що з цього ми свідомо НЕ вивчали в М1?",
        "options": [
          "Explorer",
          "Properties",
          "Цикли for у Lua",
          "Anchored"
        ],
        "correctAnswer": 2,
        "explanation": "Правильна відповідь: Цикли for у Lua"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Який порядок найлогічніший для старту будови?",
        "options": [
          "Одразу 100 Toolbox моделей без імен",
          "Place → Foundation → шлях → декор → порядок у Folder",
          "Спочатку GamePass",
          "Спочатку Blender"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Place → Foundation → шлях → декор → порядок у Folder"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Навіщо рубрика на чекпоінті?",
        "options": [
          "Щоб розуміти критерії якісної здачі",
          "Щоб зайвий раз налякати",
          "Щоб замінити збереження",
          "Це для дорослих розробників Unity лише"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб розуміти критерії якісної здачі"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Найважливіший доказ що двір «готовий до показу»?",
        "options": [
          "Випадковий хаос Parts",
          "Читабельний шлях + порядок у Explorer + Playtest",
          "Тільки гарний колір неба",
          "Великий ник"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Читабельний шлях + порядок у Explorer + Playtest"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Folder `Yard` допомагає…",
        "options": [
          "Організувати обʼєкти двору",
          "Замінити SpawnLocation",
          "Дати Robux",
          "Вимкнути гравітацію глобально"
        ],
        "correctAnswer": 0,
        "explanation": "Організувати обʼєкти двору"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Backup у ServerStorage — це…",
        "options": [
          "Запасна копія/шаблон",
          "Обовʼязковий ворог NPC",
          "Тип Material",
          "Кнопка Rotate"
        ],
        "correctAnswer": 0,
        "explanation": "Запасна копія/шаблон"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Якщо на презентації друзі не розуміють куди йти — що покращити до М2?",
        "options": [
          "Контраст шляху, Spawn, орієнтири",
          "Видалити доріжку",
          "Вимкнути Anchored у підлоги",
          "Прибрати імена"
        ],
        "correctAnswer": 0,
        "explanation": "Контраст шляху, Spawn, орієнтири"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Snap + Duplicate ми використовували щоб…",
        "options": [
          "Швидко й рівніше будувати повторювані елементи",
          "Писати цикли",
          "Публікувати гру в топ",
          "Робити анімацію обличчя"
        ],
        "correctAnswer": 0,
        "explanation": "Швидко й рівніше будувати повторювані елементи"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "CanCollide = false корисно коли…",
        "options": [
          "Треба пройти крізь декор-обʼєм",
          "Завжди для підлоги",
          "Завжди для Foundation",
          "Ніколи"
        ],
        "correctAnswer": 0,
        "explanation": "Треба пройти крізь декор-обʼєм"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Наступний модуль логічно про…",
        "options": [
          "Models, групування, Union/Negate",
          "Квантову фізику без Studio",
          "Лише відеомонтаж",
          "Повний MMO на 100 гравців за 1 урок"
        ],
        "correctAnswer": 0,
        "explanation": "Models, групування, Union/Negate"
      }
    ]
  }
}
