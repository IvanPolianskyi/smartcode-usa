/** Roblox v2 Module 02 EN — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE
void MC

export const enLesson21 = {
  "lessonId": "lesson-roblox-2-1",
  "moduleId": "module-02",
  "order": 1,
  "title": "2.1 — Model or Folder?",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зрозуміти, коли «коробка для порядку», а коли «один предмет з частин».",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** зрозуміти, коли «коробка для порядку», а коли «один предмет з частин».\n\nCourse phase: **Studio & Modeling**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Лавка з М1 зібрана в `Model` з іменем `Bench`. Паркан лишається у `Folder` `Fence` (або створити, якщо не було)."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M2_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Усі меблі двору — Models з нормальними іменами. Скрін Explorer."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Reading theory without Studio open",
      "explanation": "Practice makes the steps stick.",
      "correctApproach": "Keep Studio beside the page and repeat every step."
    },
    {
      "mistake": "Not saving the Place",
      "explanation": "Work can disappear after restart.",
      "correctApproach": "File → Save to Roblox after meaningful changes."
    },
    {
      "mistake": "Leaving Part1/Part2 clutter",
      "explanation": "Later it is hard to find objects.",
      "correctApproach": "Rename objects and group into Folders/Models."
    }
  ],
  "summary": "**2.1 — Model or Folder?** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Model or Folder?",
    "difficulty": "beginner",
    "description": "### Task\nЛавка з М1 зібрана в `Model` з іменем `Bench`. Паркан лишається у `Folder` `Fence` (або створити, якщо не було).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж: перенести `Bench` на 4 studs ближче до Path одним Move (цілою моделлю)"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Folder у Workspace найкраще підходить щоб…",
        "options": [
          "Зробити Part невидимим",
          "Навести порядок / згрупувати «папки» обʼєктів",
          "Замінити Anchored",
          "Увімкнути музику"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Навести порядок / згрупувати «папки» обʼєктів"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Model зручний коли…",
        "options": [
          "Треба один предмет з кількох Parts пересувати цілим",
          "Хочемо лише сховати імена",
          "Пишемо Lua for",
          "Купуємо GamePass"
        ],
        "correctAnswer": 0,
        "explanation": "Треба один предмет з кількох Parts пересувати цілим"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Group (обʼєднати в Model) робить…",
        "options": [
          "Видалення всіх Parts",
          "З кількох виділених обʼєктів — Model",
          "Публікацію гри",
          "Terrain воду"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: З кількох виділених обʼєктів — Model"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Ungroup робить…",
        "options": [
          "Розбирає Model назад на частини",
          "Зберігає Place",
          "Створює Negate",
          "Вмикає Snap"
        ],
        "correctAnswer": 0,
        "explanation": "Розбирає Model назад на частини"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Якщо зрушити лише одну ніжку лавки, а сидіння лишити…",
        "options": [
          "Лавка «розʼїдеться» — тому потрібен Model",
          "Studio видалить двір",
          "Це єдино правильний спосіб",
          "Зʼявиться скрипт"
        ],
        "correctAnswer": 0,
        "explanation": "Лавка «розʼїдеться» — тому потрібен Model"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Чи завжди треба все в світі робити Model?",
        "options": [
          "Так",
          "Ні — іноді достатньо Folder для порядку",
          "Тільки для неба",
          "Тільки для Spawn"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Ні — іноді достатньо Folder для порядку"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Після Group перше що робимо…",
        "options": [
          "Даємо зрозуміле імʼя Model",
          "Видаляємо Foundation",
          "Вимикаємо інтернет",
          "Відкриваємо Blender"
        ],
        "correctAnswer": 0,
        "explanation": "Даємо зрозуміле імʼя Model"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Артефакт уроку 2.1?",
        "options": [
          "`Bench` як Model",
          "Повний шутер",
          "DataStore",
          "NPC діалог"
        ],
        "correctAnswer": 0,
        "explanation": "`Bench` як Model"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Яка аналогія для Model?",
        "options": [
          "Зібраний LEGO-набір",
          "Пароль від Wi-Fi",
          "Калькулятор",
          "Список друзів"
        ],
        "correctAnswer": 0,
        "explanation": "Зібраний LEGO-набір"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "На М2 скрипти Lua пишемо?",
        "options": [
          "Так, обовʼязково",
          "Ні, поки моделювання",
          "Тільки RemoteEvent",
          "Тільки на телефоні"
        ],
        "correctAnswer": 1,
        "explanation": "Правильна відповідь: Ні, поки моделювання"
      }
    ]
  }
}

export const enLesson22 = {
  "lessonId": "lesson-roblox-2-2",
  "moduleId": "module-02",
  "order": 2,
  "title": "2.2 — PrimaryPart",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "призначити PrimaryPart, щоб Model крутилась/ставилась передбачувано.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** призначити PrimaryPart, щоб Model крутилась/ставилась передбачувано.\n\nCourse phase: **Studio & Modeling**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "У `Bench` і `Gate` (або `House_Base` якщо почнуть каркас) виставлено PrimaryPart. Учень вміє показати в Properties Model → PrimaryPart."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M2_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Підготувати 4 стіни-блоки для майбутнього будинку (ще не Union): `Wall_N/E/S/W` у Folder `HouseParts`. Anchored."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Reading theory without Studio open",
      "explanation": "Practice makes the steps stick.",
      "correctApproach": "Keep Studio beside the page and repeat every step."
    },
    {
      "mistake": "Not saving the Place",
      "explanation": "Work can disappear after restart.",
      "correctApproach": "File → Save to Roblox after meaningful changes."
    },
    {
      "mistake": "Leaving Part1/Part2 clutter",
      "explanation": "Later it is hard to find objects.",
      "correctApproach": "Rename objects and group into Folders/Models."
    }
  ],
  "summary": "**2.2 — PrimaryPart** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: PrimaryPart",
    "difficulty": "beginner",
    "description": "### Task\nУ `Bench` і `Gate` (або `House_Base` якщо почнуть каркас) виставлено PrimaryPart. Учень вміє показати в Properties Model → PrimaryPart.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж: повернути Bench на 90° і повернути назад без розвалу"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "PrimaryPart — це…",
        "options": [
          "Головна Part моделі, від якої зручно орієнтувати Model",
          "Єдиний дозволений колір",
          "Тип Material",
          "Назва гри"
        ],
        "correctAnswer": 0,
        "explanation": "Головна Part моделі, від якої зручно орієнтувати Model"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Навіщо призначати PrimaryPart?",
        "options": [
          "Щоб повороти/позиціонування моделі були передбачувані",
          "Щоб Part став прозорим",
          "Щоб видалити Explorer",
          "Щоб отримати Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб повороти/позиціонування моделі були передбачувані"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "PrimaryPart має…",
        "options": [
          "Бути всередині цієї Model",
          "Жити лише в ServerStorage завжди",
          "Бути NegatePart обовʼязково",
          "Не мати імені"
        ],
        "correctAnswer": 0,
        "explanation": "Бути всередині цієї Model"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Якщо модель крутиться «летить убік»…",
        "options": [
          "Перевірити PrimaryPart / Pivot",
          "Видалити акаунт",
          "Вимкнути Snap назавжди",
          "Купити Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Перевірити PrimaryPart / Pivot"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Для лавки логічний PrimaryPart —…",
        "options": [
          "Сидіння",
          "Випадковий Part у небі",
          "Baseplate іншої гри",
          "Lighting"
        ],
        "correctAnswer": 0,
        "explanation": "Сидіння"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Ungroup після налаштування PrimaryPart…",
        "options": [
          "Знищує сенс Model — робити лише свідомо",
          "Обовʼязковий щохвилини",
          "Додає скрипт",
          "Створює вікно"
        ],
        "correctAnswer": 0,
        "explanation": "Знищує сенс Model — робити лише свідомо"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Models з виставленим PrimaryPart",
          "Готовий Tycoon",
          "GUI магазин",
          "Анімація стрільби"
        ],
        "correctAnswer": 0,
        "explanation": "Models з виставленим PrimaryPart"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "ДЗ з 4 стінами потрібно щоб…",
        "options": [
          "Підготувати деталі будинку до Union/Negate",
          "Замінити доріжку",
          "Видалити двір",
          "Зробити симулятор одразу"
        ],
        "correctAnswer": 0,
        "explanation": "Підготувати деталі будинку до Union/Negate"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Model без PrimaryPart…",
        "options": [
          "Може поводитись незручно при трансформаціях",
          "Автоматично видаляється",
          "Не зберігається",
          "Стає Folder"
        ],
        "correctAnswer": 0,
        "explanation": "Може поводитись незручно при трансформаціях"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Чи PrimaryPart сам робить вікна?",
        "options": [
          "Ні",
          "Так",
          "Тільки вночі",
          "Тільки в Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Ні"
      }
    ]
  }
}

export const enLesson23 = {
  "lessonId": "lesson-roblox-2-3",
  "moduleId": "module-02",
  "order": 3,
  "title": "2.3 — Union: merge Parts",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зробити перший успішний Union (без Negate).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** зробити перший успішний Union (без Negate).\n\nCourse phase: **Studio & Modeling**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "`Wall_Union_Demo` — наприклад, літера «Г» або сходинка з 2–3 Parts → один UnionOperation. Зберегти копію Parts-оригіналів у ServerStorage `UnionBackup` перед злиттям."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M2_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Оригінали стінок тримати в `ServerStorage/HouseParts_Raw`. У Workspace можна мати робочі копії."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Reading theory without Studio open",
      "explanation": "Practice makes the steps stick.",
      "correctApproach": "Keep Studio beside the page and repeat every step."
    },
    {
      "mistake": "Not saving the Place",
      "explanation": "Work can disappear after restart.",
      "correctApproach": "File → Save to Roblox after meaningful changes."
    },
    {
      "mistake": "Leaving Part1/Part2 clutter",
      "explanation": "Later it is hard to find objects.",
      "correctApproach": "Rename objects and group into Folders/Models."
    }
  ],
  "summary": "**2.3 — Union: merge Parts** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Union: merge Parts",
    "difficulty": "beginner",
    "description": "### Task\n`Wall_Union_Demo` — наприклад, літера «Г» або сходинка з 2–3 Parts → один UnionOperation. Зберегти копію Parts-оригіналів у ServerStorage `UnionBackup` перед злиттям.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж: Union з РІВНО 3 Parts; скрін до/після Explorer"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Union у Solid Modeling…",
        "options": [
          "Зʼєднує вибрані Parts в одну суцільну форму",
          "Грає музику",
          "Створює RemoteEvent",
          "Видаляє Place"
        ],
        "correctAnswer": 0,
        "explanation": "Зʼєднує вибрані Parts в одну суцільну форму"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Перед складним Union варто…",
        "options": [
          "Зберегти Place / зробити Backup",
          "Видалити Explorer",
          "Вимкнути компʼютер",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Зберегти Place / зробити Backup"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Після Union в Explorer часто зʼявляється…",
        "options": [
          "UnionOperation (або подібний результат solid modeling)",
          "Випадковий гравець",
          "Новий акаунт",
          "Blender файл"
        ],
        "correctAnswer": 0,
        "explanation": "UnionOperation (або подібний результат solid modeling)"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Навіщо Backup Parts у ServerStorage?",
        "options": [
          "Щоб можна було переробити, якщо Union поганий",
          "Щоб Part світився",
          "Щоб швидше бігати",
          "Це дає Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб можна було переробити, якщо Union поганий"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Чи обовʼязково Union одразу для всіх 100 Parts двору?",
        "options": [
          "Ні — маленькими кроками",
          "Так",
          "Тільки паркан",
          "Тільки Spawn"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — маленькими кроками"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Якщо після Union колір «зʼїхав»…",
        "options": [
          "Можна виставити Material/Color знову на результат",
          "Гра знищена назавжди",
          "Треба купити нову Studio",
          "Треба видалити двір"
        ],
        "correctAnswer": 0,
        "explanation": "Можна виставити Material/Color знову на результат"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Артефакт 2.3?",
        "options": [
          "Перший успішний Union без Negate",
          "Повний будинок з меблями всередині",
          "Шутер",
          "DataStore"
        ],
        "correctAnswer": 0,
        "explanation": "Перший успішний Union без Negate"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Union — це вже скриптинг?",
        "options": [
          "Ні, це моделювання",
          "Так, це цикл for",
          "Так, це if",
          "Так, це UI"
        ],
        "correctAnswer": 0,
        "explanation": "Ні, це моделювання"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Undo після поганого Union…",
        "options": [
          "Нормальний інструмент, можна відкотити",
          "Заборонено",
          "Видаляє акаунт",
          "Публікує гру"
        ],
        "correctAnswer": 0,
        "explanation": "Нормальний інструмент, можна відкотити"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Вікна Negate на цьому уроці…",
        "options": [
          "Ще не робимо — наступний урок",
          "Обовʼязкові",
          "Робляться голосом",
          "Робляться в Python"
        ],
        "correctAnswer": 0,
        "explanation": "Ще не робимо — наступний урок"
      }
    ]
  }
}

export const enLesson24 = {
  "lessonId": "lesson-roblox-2-4",
  "moduleId": "module-02",
  "order": 4,
  "title": "2.4 — NegatePart: cut a window",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зробити перше вікно (дірка в стіні) через Negate + Union.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** зробити перше вікно (дірка в стіні) через Negate + Union.\n\nCourse phase: **Studio & Modeling**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Одна стіна `Wall_WithWindow`: прямокутний отвір. Результат назвати `Wall_N` (або відповідна сторона)."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M2_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Друге вікно на протилежній стіні. Backup сирих Parts у Storage."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Reading theory without Studio open",
      "explanation": "Practice makes the steps stick.",
      "correctApproach": "Keep Studio beside the page and repeat every step."
    },
    {
      "mistake": "Not saving the Place",
      "explanation": "Work can disappear after restart.",
      "correctApproach": "File → Save to Roblox after meaningful changes."
    },
    {
      "mistake": "Leaving Part1/Part2 clutter",
      "explanation": "Later it is hard to find objects.",
      "correctApproach": "Rename objects and group into Folders/Models."
    }
  ],
  "summary": "**2.4 — NegatePart: cut a window** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: NegatePart: cut a window",
    "difficulty": "beginner",
    "description": "### Task\nОдна стіна `Wall_WithWindow`: прямокутний отвір. Результат назвати `Wall_N` (або відповідна сторона).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж: вікно рівне (не «зламаний зуб») — взаємний огляд 1 хв"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "NegatePart потрібен щоб…",
        "options": [
          "Позначити обʼєм який буде «віднято» при Union",
          "Зробити Part сильнішим у бою",
          "Зберегти Place",
          "Відкрити Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Позначити обʼєм який буде «віднято» при Union"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Правильний порядок для вікна…",
        "options": [
          "Стіна → вирізач → Negate вирізача → Union зі стіною",
          "Одразу Publish",
          "Negate SpawnLocation",
          "Видалити Explorer"
        ],
        "correctAnswer": 0,
        "explanation": "Стіна → вирізач → Negate вирізача → Union зі стіною"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Якщо дірки немає, перше що перевірити…",
        "options": [
          "Чи перетинаються стіна і вирізач у 3D",
          "Чи гарний нік",
          "Чи є Robux",
          "Чи увімкнено Discord"
        ],
        "correctAnswer": 0,
        "explanation": "Чи перетинаються стіна і вирізач у 3D"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Після успішного вікна результат варто…",
        "options": [
          "Перейменувати й Anchored",
          "Одразу Ungroup 20 разів",
          "Видалити двір",
          "Зробити Part1"
        ],
        "correctAnswer": 0,
        "explanation": "Перейменувати й Anchored"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Чи Negate сам по собі вже «вирізає назавжди» без Union?",
        "options": [
          "Ні — потрібне обʼєднання з операцією Union",
          "Так, завжди",
          "Тільки вдень",
          "Тільки на телефоні"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — потрібне обʼєднання з операцією Union"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Стіна з віконним отвором",
          "Повний інтерʼєр квартири",
          "Тільки табличка Decal без стіни",
          "Скрипт дверей"
        ],
        "correctAnswer": 0,
        "explanation": "Стіна з віконним отвором"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Backup сирих Parts потрібен бо…",
        "options": [
          "Переробка вікна часта справа",
          "Studio цього вимагає для Play",
          "Інакше немає гравітації",
          "Інакше немає камери"
        ],
        "correctAnswer": 0,
        "explanation": "Переробка вікна часта справа"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Вирізач вікна зазвичай…",
        "options": [
          "Трохи товстіший/довший за товщину стіни щоб гарантовано прорізати",
          "Розміром з усю карту",
          "Розміром 0",
          "Обовʼязково Neon і Transparency 1 до Negate завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Трохи товстіший/довший за товщину стіни щоб гарантовано прорізати"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Цей урок — про скрипти Touched?",
        "options": [
          "Ні",
          "Так",
          "Тільки while",
          "Тільки GUI"
        ],
        "correctAnswer": 0,
        "explanation": "Ні"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Наступна логічна тема після першого вікна…",
        "options": [
          "Як чинити невдалий Union / Separate",
          "DataStore",
          "Blender обличчя",
          "Кіберспорт турнір"
        ],
        "correctAnswer": 0,
        "explanation": "Як чинити невдалий Union / Separate"
      }
    ]
  }
}

export const enLesson25 = {
  "lessonId": "lesson-roblox-2-5",
  "moduleId": "module-02",
  "order": 5,
  "title": "2.5 — Separate and repair Unions",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "не боятись зламаного Union; вміти окремити/переробити; доробити 2-ге вікно + дверний отвір.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** не боятись зламаного Union; вміти окремити/переробити; доробити 2-ге вікно + дверний отвір.\n\nCourse phase: **Studio & Modeling**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "- `Wall_*` з 2 вікнами (або 1 вікно + дверний проріз) - Учень один раз свідомо зробив Separate (або Undo-переробку) і пояснив що сталось"
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M2_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Зібрати 4 стіни (з отворами) впритул «коробкою» будинку. Поки можна ще не фінальний Union усього будинку."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Reading theory without Studio open",
      "explanation": "Practice makes the steps stick.",
      "correctApproach": "Keep Studio beside the page and repeat every step."
    },
    {
      "mistake": "Not saving the Place",
      "explanation": "Work can disappear after restart.",
      "correctApproach": "File → Save to Roblox after meaningful changes."
    },
    {
      "mistake": "Leaving Part1/Part2 clutter",
      "explanation": "Later it is hard to find objects.",
      "correctApproach": "Rename objects and group into Folders/Models."
    }
  ],
  "summary": "**2.5 — Separate and repair Unions** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Separate and repair Unions",
    "difficulty": "beginner",
    "description": "### Task\n- `Wall_*` з 2 вікнами (або 1 вікно + дверний проріз) - Учень один раз свідомо зробив Separate (або Undo-переробку) і пояснив що сталось\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж: пролізти в Play через двері без стрибка в стелю"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Separate у Solid Modeling…",
        "options": [
          "Допомагає розібрати/відкотити результат solid modeling щоб переробити",
          "Публікує гру",
          "Створює музику",
          "Дає Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Допомагає розібрати/відкотити результат solid modeling щоб переробити"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Найспокійніший план ремонту…",
        "options": [
          "Backup → нова спроба маленькими кроками",
          "Видалити весь Place завжди",
          "Ніколи не зберігати",
          "Кричати в чат"
        ],
        "correctAnswer": 0,
        "explanation": "Backup → нова спроба маленькими кроками"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Дверний проріз відрізняється від вікна тим що…",
        "options": [
          "Зазвичай нижчий до підлоги щоб увійти",
          "Завжди круглий",
          "Без Negate неможливий навіть Decal-ом",
          "Потребує Python"
        ],
        "correctAnswer": 0,
        "explanation": "Зазвичай нижчий до підлоги щоб увійти"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Навіщо перевіряти двері в Play?",
        "options": [
          "Чи проходить hitbox гравця",
          "Чи є Robux",
          "Чи працює Discord",
          "Чи англійська мова Windows"
        ],
        "correctAnswer": 0,
        "explanation": "Чи проходить hitbox гравця"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Якщо Union «важкий» і Studio тормозить…",
        "options": [
          "Спростити форму / різати на менші операції / не union-ити всю карту",
          "Додати ще 500 Parts у той самий Union",
          "Відкрити 10 копій Studio",
          "Вимкнути збереження"
        ],
        "correctAnswer": 0,
        "explanation": "Спростити форму / різати на менші операції / не union-ити всю карту"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Стіни з вікнами + дверний отвір + досвід ремонту",
          "Готовий MMO",
          "Тільки небо",
          "Тільки таблиця лідерів"
        ],
        "correctAnswer": 0,
        "explanation": "Стіни з вікнами + дверний отвір + досвід ремонту"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "«Музей фейлів» у групі потрібен щоб…",
        "options": [
          "Вчитись на помилках без сорому",
          "Знизити оцінки всім",
          "Видалити Explorer",
          "Замінити тест"
        ],
        "correctAnswer": 0,
        "explanation": "Вчитись на помилках без сорому"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Чи обовʼязково union-ити всі 4 стіни в ОДИН Union вже сьогодні?",
        "options": [
          "Ні — спочатку зібрати коробку, великий Union обережно",
          "Так завжди",
          "Так і ще Terrain",
          "Так і всіх гравців сервера"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — спочатку зібрати коробку, великий Union обережно"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Якщо двері занадто вузькі…",
        "options": [
          "Переробити Negate ширшим вирізачем",
          "Видалити Spawn назавжди",
          "Вимкнути Anchored у підлоги світу",
          "Змінити PrimaryPart неба"
        ],
        "correctAnswer": 0,
        "explanation": "Переробити Negate ширшим вирізачем"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "ДЗ до наступного уроку…",
        "options": [
          "Зібрати стіни коробкою будинку",
          "Написати Tycoon",
          "Зробити Raycast",
          "Змонтувати летсплей на 20 хв"
        ],
        "correctAnswer": 0,
        "explanation": "Зібрати стіни коробкою будинку"
      }
    ]
  }
}

export const enLesson26 = {
  "lessonId": "lesson-roblox-2-6",
  "moduleId": "module-02",
  "order": 6,
  "title": "2.6 — Pivot and roof assembly",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "точно скласти будинок (стіни/дах), користуватись Pivot і рівними стиками.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** точно скласти будинок (стіни/дах), користуватись Pivot і рівними стиками.\n\nCourse phase: **Studio & Modeling**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "`House` як Model: 4 стіни + дах + PrimaryPart (наприклад `Floor` або центральна стіна). Стики без великих щілин."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M2_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Поставити `House` у дворі біля Path так, щоб двері дивились на доріжку."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Reading theory without Studio open",
      "explanation": "Practice makes the steps stick.",
      "correctApproach": "Keep Studio beside the page and repeat every step."
    },
    {
      "mistake": "Not saving the Place",
      "explanation": "Work can disappear after restart.",
      "correctApproach": "File → Save to Roblox after meaningful changes."
    },
    {
      "mistake": "Leaving Part1/Part2 clutter",
      "explanation": "Later it is hard to find objects.",
      "correctApproach": "Rename objects and group into Folders/Models."
    }
  ],
  "summary": "**2.6 — Pivot and roof assembly** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Pivot and roof assembly",
    "difficulty": "beginner",
    "description": "### Task\n`House` як Model: 4 стіни + дах + PrimaryPart (наприклад `Floor` або центральна стіна). Стики без великих щілин.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж: вид згори — «чи квадрат/прямокутник читається»"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Pivot впливає на…",
        "options": [
          "Точку, навколо якої зручно обертати/ставти моделі",
          "Ціну телефону",
          "Мову інтерфейсу Windows",
          "Кількість друзів"
        ],
        "correctAnswer": 0,
        "explanation": "Точку, навколо якої зручно обертати/ставти моделі"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Snap при збірці стін допомагає…",
        "options": [
          "Зводити стики рівніше",
          "Писати цикли",
          "Качати FPS у Fortnite",
          "Робити Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Зводити стики рівніше"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Навіщо Group будинку в `House`?",
        "options": [
          "Пересувати цілий будинок і тримати порядок",
          "Видалити вікна",
          "Вимкнути камеру",
          "Замінити Material глобально у всіх іграх"
        ],
        "correctAnswer": 0,
        "explanation": "Пересувати цілий будинок і тримати порядок"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Якщо між стінами щілина…",
        "options": [
          "Підігнати Move/Scale",
          "Видалити Foundation обовʼязково",
          "Зробити Negate на Spawn",
          "Відкрити новий акаунт"
        ],
        "correctAnswer": 0,
        "explanation": "Підігнати Move/Scale"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "PrimaryPart для House логічно обрати…",
        "options": [
          "Підлогу будинку або стабільну центральну Part",
          "Випадковий Part далеко в небі",
          "Обʼєкт з іншої гри",
          "Sound у Lighting"
        ],
        "correctAnswer": 0,
        "explanation": "Підлогу будинку або стабільну центральну Part"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Model `House` зі стінами й дахом",
          "Повний магазин GUI",
          "Система ребіртів Tycoon",
          "Квест NPC"
        ],
        "correctAnswer": 0,
        "explanation": "Model `House` зі стінами й дахом"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Двері мають «дивитись» на Path щоб…",
        "options": [
          "Шлях гравця читався",
          "Studio швидше грузилось",
          "Anchored вимкнувся",
          "Зʼявився Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Шлях гравця читався"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Чи обовʼязковий ідеальний двосхилий дах на М2?",
        "options": [
          "Ні — важливі стіни, отвори, акуратна збірка",
          "Так, інакше курс не зарахують",
          "Так, тільки Blender",
          "Так, тільки Meshy AI"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — важливі стіни, отвори, акуратна збірка"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Вид згори на челенджі перевіряє…",
        "options": [
          "Геометрію плану будинку",
          "Якість мікрофону",
          "Швидкість інтернету батьків",
          "Рівень англійської"
        ],
        "correctAnswer": 0,
        "explanation": "Геометрію плану будинку"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Union усього будинку в один обʼєкт на цьому уроці…",
        "options": [
          "Не обовʼязковий — Model достатньо",
          "Обовʼязковий завжди",
          "Заборонений назавжди",
          "Роблять тільки голосом"
        ],
        "correctAnswer": 0,
        "explanation": "Не обовʼязковий — Model достатньо"
      }
    ]
  }
}

export const enLesson27 = {
  "lessonId": "lesson-roblox-2-7",
  "moduleId": "module-02",
  "order": 7,
  "title": "2.7 — Decals and facade",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "оживити будинок без скриптів: Decal на стіну/вивіску, матеріали, контраст фасаду.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** оживити будинок без скриптів: Decal на стіну/вивіску, матеріали, контраст фасаду.\n\nCourse phase: **Studio & Modeling**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "- `SignBoard` або стіна з Decal (номер будинку / вивіска «SHOP» / імʼя двору) - Узгоджена палітра: стіни / дах / двері різняться"
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M2_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Прибрати сміття після експериментів з Decal. Зберегти. Підготуватись до здачі 2.8."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Reading theory without Studio open",
      "explanation": "Practice makes the steps stick.",
      "correctApproach": "Keep Studio beside the page and repeat every step."
    },
    {
      "mistake": "Not saving the Place",
      "explanation": "Work can disappear after restart.",
      "correctApproach": "File → Save to Roblox after meaningful changes."
    },
    {
      "mistake": "Leaving Part1/Part2 clutter",
      "explanation": "Later it is hard to find objects.",
      "correctApproach": "Rename objects and group into Folders/Models."
    }
  ],
  "summary": "**2.7 — Decals and facade** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Decals and facade",
    "difficulty": "beginner",
    "description": "### Task\n- `SignBoard` або стіна з Decal (номер будинку / вивіска «SHOP» / імʼя двору) - Узгоджена палітра: стіни / дах / двері різняться\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Polish the artifact a bit and be ready to show it for 20 seconds."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Decal — це…",
        "options": [
          "Зображення/наклейка на грані Part",
          "Тип циклу Lua",
          "Сервіс телепортації",
          "Система HP"
        ],
        "correctAnswer": 0,
        "explanation": "Зображення/наклейка на грані Part"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Якщо Decal «не видно», часто причина…",
        "options": [
          "Не той Face / орієнтація Part / прозорість",
          "Занадто гарний нік",
          "Відкритий браузер",
          "Увімкнений Snap"
        ],
        "correctAnswer": 0,
        "explanation": "Не той Face / орієнтація Part / прозорість"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Навіщо різний колір стін і даху?",
        "options": [
          "Щоб форма будинку читалась",
          "Щоб видалити Anchored",
          "Щоб зламати Union",
          "Це заборонено в Roblox"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб форма будинку читалась"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Вивіска біля дверей допомагає…",
        "options": [
          "Орієнтиру й атмосфері",
          "Автозбереженню Windows",
          "Прискоренню Wi-Fi",
          "Заміні PrimaryPart"
        ],
        "correctAnswer": 0,
        "explanation": "Орієнтиру й атмосфері"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Чи Decal замінює Negate-вікно?",
        "options": [
          "Ні — це декор, дірка це геометрія",
          "Так повністю",
          "Так і ще Spawn",
          "Так і DataStore"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — це декор, дірка це геометрія"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Фасад з Decal/вивіскою + палітра",
          "Повний шутер раундів",
          "Тільки ServerStorage без будинку",
          "Тільки тест без Place"
        ],
        "correctAnswer": 0,
        "explanation": "Фасад з Decal/вивіскою + палітра"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Після експериментів з Decal варто…",
        "options": [
          "Прибрати дублікати й сміття з Explorer",
          "Залишити 50 Part1",
          "Видалити House",
          "Вимкнути збереження"
        ],
        "correctAnswer": 0,
        "explanation": "Прибрати дублікати й сміття з Explorer"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Material даху може відрізнятись щоб…",
        "options": [
          "Візуально відокремити дах від стін",
          "Обовʼязково зламати CanCollide",
          "Видалити Path",
          "Створити RemoteFunction"
        ],
        "correctAnswer": 0,
        "explanation": "Візуально відокремити дах від стін"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Голосування в групі — це…",
        "options": [
          "Швидкий взаємний фідбек",
          "Єдина оцінка курсу",
          "Заміна рубрики 2.8",
          "Спосіб видалити Place"
        ],
        "correctAnswer": 0,
        "explanation": "Швидкий взаємний фідбек"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Наступний урок…",
        "options": [
          "Чекпоінт-здача будинку",
          "Початок Tycoon економіки",
          "Blender character",
          "Підготовка НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Чекпоінт-здача будинку"
      }
    ]
  }
}

export const enLesson28 = {
  "lessonId": "lesson-roblox-2-8",
  "moduleId": "module-02",
  "order": 8,
  "title": "2.8 — Checkpoint: house with windows",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "show `House` against the lesson checklist.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** show `House` against the lesson checklist.\n\nCourse phase: **Studio & Modeling**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Build a **visible result** in your Place and Save to Roblox."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M2_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Зберегти Place. Придумати біом двору: ліс / зима / пустеля / біля води (слова)."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Reading theory without Studio open",
      "explanation": "Practice makes the steps stick.",
      "correctApproach": "Keep Studio beside the page and repeat every step."
    },
    {
      "mistake": "Not saving the Place",
      "explanation": "Work can disappear after restart.",
      "correctApproach": "File → Save to Roblox after meaningful changes."
    },
    {
      "mistake": "Leaving Part1/Part2 clutter",
      "explanation": "Later it is hard to find objects.",
      "correctApproach": "Rename objects and group into Folders/Models."
    }
  ],
  "summary": "**2.8 — Checkpoint: house with windows** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Checkpoint: house with windows",
    "difficulty": "beginner",
    "description": "### Task\nComplete the steps for “Checkpoint: house with windows” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Polish the artifact a bit and be ready to show it for 20 seconds."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Що з цього головний новий навик М2?",
        "options": [
          "Negate + Union для отворів",
          "Цикл while",
          "DataStore",
          "RemoteEvent магазин"
        ],
        "correctAnswer": 0,
        "explanation": "Negate + Union для отворів"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Model від Folder відрізняється тим що…",
        "options": [
          "Model — зібраний обʼєкт для трансформацій цілком",
          "Folder завжди видимий як цегла",
          "Folder робить вікна",
          "Model не можна іменувати"
        ],
        "correctAnswer": 0,
        "explanation": "Model — зібраний обʼєкт для трансформацій цілком"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "PrimaryPart потрібен щоб…",
        "options": [
          "Орієнтувати модель передбачувано",
          "Замінити Negate",
          "Створити монети",
          "Увімкнути PvP"
        ],
        "correctAnswer": 0,
        "explanation": "Орієнтувати модель передбачувано"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Без чого не буде справжнього вікна-отвору?",
        "options": [
          "Без операції віднімання обʼєму (Negate+Union)",
          "Без GamePass",
          "Без Blender",
          "Без TikTok"
        ],
        "correctAnswer": 0,
        "explanation": "Без операції віднімання обʼєму (Negate+Union)"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Backup сирих Parts у Storage — це…",
        "options": [
          "Подушка безпеки для переробок",
          "Вірус",
          "Заміна Path",
          "Тип Lighting"
        ],
        "correctAnswer": 0,
        "explanation": "Подушка безпеки для переробок"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Двері перевіряємо в Play бо…",
        "options": [
          "Важливий реальний прохід гравця",
          "Play додає Robux",
          "Play видаляє Decal",
          "Play вимикає Snap назавжди"
        ],
        "correctAnswer": 0,
        "explanation": "Важливий реальний прохід гравця"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чи весь будинок обовʼязково один Union?",
        "options": [
          "Ні — Model зі стінами ок",
          "Так",
          "Так і ще Baseplate",
          "Так і всіх гравців"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — Model зі стінами ок"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Decal на фасаді — це…",
        "options": [
          "Декор і читабельність",
          "Заміна Spawn",
          "Система HP",
          "Lua таблиця"
        ],
        "correctAnswer": 0,
        "explanation": "Декор і читабельність"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Якщо Union зламався…",
        "options": [
          "Separate / Backup / нова спроба",
          "Кинути курс",
          "Видалити Roblox",
          "Ніколи не зберігати"
        ],
        "correctAnswer": 0,
        "explanation": "Separate / Backup / нова спроба"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Логічне продовження в М3…",
        "options": [
          "Terrain, освітлення, атмосфера світу",
          "Одразу повний Tycoon на 1 уроці",
          "Лише теорія без Studio",
          "Квантова хімія"
        ],
        "correctAnswer": 0,
        "explanation": "Terrain, освітлення, атмосфера світу"
      }
    ]
  }
}
