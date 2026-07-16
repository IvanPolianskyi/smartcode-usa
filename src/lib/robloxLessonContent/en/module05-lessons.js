/** Roblox v2 Module 05 EN — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE
void MC

export const enLesson51 = {
  "lessonId": "lesson-roblox-5-1",
  "moduleId": "module-05",
  "order": 1,
  "title": "5.1 — What is a variable",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зрозуміти змінну як «іменовану коробку»; створити `local` і вивести в Output.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** зрозуміти змінну як «іменовану коробку»; створити `local` і вивести в Output.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Script `Vars_01` у SSS: ```lua local playerName = \"Оля\" local score = 0 print(playerName) print(score) ``` (імʼя своє)"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal playerName = \"Оля\"\nlocal score = 0\nprint(playerName)\nprint(score)\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Змінна `biome` з назвою біому з М3 + print."
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
  "summary": "**5.1 — What is a variable** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: What is a variable",
    "difficulty": "intermediate",
    "description": "### Task\nScript `Vars_01` у SSS: ```lua local playerName = \"Оля\" local score = 0 print(playerName) print(score) ``` (імʼя своє)\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Челендж: змінити score 3 рази і надрукувати кожен раз"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Змінна — це…",
        "options": [
          "Іменоване місце для значення",
          "Кнопка Terrain",
          "Тип неба",
          "Плагін Snap"
        ],
        "correctAnswer": 0,
        "explanation": "Іменоване місце для значення"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`local` у Lua на цьому рівні означає…",
        "options": [
          "Локальна змінна в цьому скрипті/блоці",
          "Видалення Place",
          "Створення Union",
          "Покупка Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Локальна змінна в цьому скрипті/блоці"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`playerName = \"Оля\"` зберігає…",
        "options": [
          "Текст (рядок)",
          "Part",
          "Sound",
          "Terrain"
        ],
        "correctAnswer": 0,
        "explanation": "Текст (рядок)"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "`print(score)` покаже…",
        "options": [
          "Поточне значення score",
          "Видалення House",
          "Новий Material",
          "Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Поточне значення score"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Якщо написати `print(scor)` з помилкою в імені…",
        "options": [
          "Буде помилка / nil — вчимось читати Output",
          "Studio видалить акаунт",
          "Автоматично виправиться завжди мовчки без сліду",
          "Дасть Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Буде помилка / nil — вчимось читати Output"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Свої змінні + print",
          "Повний Tycoon",
          "DataStore сейв",
          "Blender"
        ],
        "correctAnswer": 0,
        "explanation": "Свої змінні + print"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Зміну значення score роблять щоб…",
        "options": [
          "Побачити що змінна може змінюватись",
          "Зламати камеру",
          "Видалити Path",
          "Вимкнути Play"
        ],
        "correctAnswer": 0,
        "explanation": "Побачити що змінна може змінюватись"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Чи змінна = Part у Workspace?",
        "options": [
          "Ні — змінна може *посилатись* на Part пізніше",
          "Так завжди",
          "Так і на небо",
          "Так тільки на Spawn"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — змінна може *посилатись* на Part пізніше"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Навіщо `local` перед імʼям на старті курсу?",
        "options": [
          "Хороша звичка області видимості",
          "Інакше print заборонений",
          "Інакше немає Explorer",
          "Інакше немає Anchored"
        ],
        "correctAnswer": 0,
        "explanation": "Хороша звичка області видимості"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Типи: number, string, boolean",
          "Тільки Negate",
          "Тільки Decal",
          "НМТ історія"
        ],
        "correctAnswer": 0,
        "explanation": "Типи: number, string, boolean"
      }
    ]
  }
}

export const enLesson52 = {
  "lessonId": "lesson-roblox-5-2",
  "moduleId": "module-05",
  "order": 2,
  "title": "5.2 — Types: number, string, boolean",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "розпізнати три базові типи; навмисно змішати й побачити дивну поведінку / помилку.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** розпізнати три базові типи; навмисно змішати й побачити дивну поведінку / помилку.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "```lua local lives = 3 local title = \"Гравець\" local isAlive = true print(typeof(lives), typeof(title), typeof(isAlive)) ``` Плюс експеримент `print(lives + 1)` і спроба `print(title + 1)` (обговорити)."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Артефакт\n\n```lua\nlocal lives = 3\nlocal title = \"Гравець\"\nlocal isAlive = true\nprint(typeof(lives), typeof(title), typeof(isAlive))\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Картка героя: `speed` number, `heroName` string, `hasKey` boolean."
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
  "summary": "**5.2 — Types: number, string, boolean** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Types: number, string, boolean",
    "difficulty": "intermediate",
    "description": "### Task\n```lua local lives = 3 local title = \"Гравець\" local isAlive = true print(typeof(lives), typeof(title), typeof(isAlive)) ``` Плюс експеримент `print(lives + 1)` і спроба `print(title + 1)` (обговорити).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Челендж: знайти яка змінна «не той тип» у коді викладача на екрані"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`3` — це переважно…",
        "options": [
          "number",
          "ScreenGui",
          "Model",
          "Sound"
        ],
        "correctAnswer": 0,
        "explanation": "number"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`\"Привіт\"` — це…",
        "options": [
          "string",
          "boolean",
          "Part",
          "Folder"
        ],
        "correctAnswer": 0,
        "explanation": "string"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`true` / `false` — це…",
        "options": [
          "boolean",
          "Vector3",
          "Sky",
          "Terrain"
        ],
        "correctAnswer": 0,
        "explanation": "boolean"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "`typeof` допомагає…",
        "options": [
          "Дізнатись тип значення",
          "Зробити Union",
          "Намалювати Decal",
          "Відкрити Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Дізнатись тип значення"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Додавати число до тексту через `+`…",
        "options": [
          "Часто помилка / не те що очікували — типи важливі",
          "Завжди ідеально",
          "Видаляє Place",
          "Дає Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Часто помилка / не те що очікували — типи важливі"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Артефакт? a) Картка героя з різними типами b) Повний шутер с) Clipchamp d) Blender face **Відповідь: a** 7. `isAlive = false` означає…",
        "options": [
          "Логічне «ні / вимкнено»",
          "Новий Material",
          "Видалення SSS",
          "Новий Spawn колір обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "Логічне «ні / вимкнено»"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Навіщо вчити типи перед if?",
        "options": [
          "Умови працюють з boolean і порівняннями чисел/рядків",
          "Типи замінюють Explorer",
          "Типи малюють Sky",
          "Типи роблять Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Умови працюють з boolean і порівняннями чисел/рядків"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Рядок пишемо в…",
        "options": [
          "Лапках `\"...\"`",
          "Без нічого завжди як Part",
          "Лише в Lighting",
          "Лише в Discord"
        ],
        "correctAnswer": 0,
        "explanation": "Лапках `\"...\"`"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Звʼязок змінних з Part Properties",
          "Тільки Atmosphere",
          "Тільки паркан",
          "Тільки відео"
        ],
        "correctAnswer": 0,
        "explanation": "Звʼязок змінних з Part Properties"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "SmartCode Roblox goal…",
        "options": [
          "Create games, not only play",
          "Only watch memes",
          "Only recolor Parts",
          "Delete Studio"
        ],
        "correctAnswer": 0,
        "explanation": "Create games, not only play"
      }
    ]
  }
}

export const enLesson53 = {
  "lessonId": "lesson-roblox-5-3",
  "moduleId": "module-05",
  "order": 3,
  "title": "5.3 — Variable points to a Part",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "`local part = workspace.Foundation` (або FindFirstChild); змінити `part.BrickColor` / `Color` / `Transparency` з коду.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** `local part = workspace.Foundation` (або FindFirstChild); змінити `part.BrickColor` / `Color` / `Transparency` з коду.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Script змінює колір існуючого Part у дворі на зелений, потім друкує імʼя Part. ```lua local part = workspace:FindFirstChild(\"Foundation\") if part then part.Color = Color3.fromRGB(80, 200, 120) print(\"Перефарбували:\", part.Name) end ``` > `if part then` тут як страховка; глибокий if — у М6. Пояснити одним реченням."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal part = workspace:FindFirstChild(\"Foundation\")\nif part then\n\tpart.Color = Color3.fromRGB(80, 200, 120)\n\tprint(\"Перефарбували:\", part.Name)\nend\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Скрипт `Paint_Sign` фарбує SignBoard у яскравий колір."
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
  "summary": "**5.3 — Variable points to a Part** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Variable points to a Part",
    "difficulty": "intermediate",
    "description": "### Task\nScript змінює колір існуючого Part у дворі на зелений, потім друкує імʼя Part. ```lua local part = workspace:FindFirstChild(\"Foundation\") if part then part.Color = Color3.fromRGB(80, 200, 120) print(\"Перефарбували:\", part.Name) end ``` > `if part then` тут як страховка; глибокий if — у М6. Пояснити одним реченням.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Челендж: 2 Parts різними кольорами з одного скрипта"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`workspace:FindFirstChild(\"Foundation\")` шукає…",
        "options": [
          "Дочірній обʼєкт з таким імʼям",
          "Файл Windows",
          "Плагін Photoshop",
          "Акаунт Discord"
        ],
        "correctAnswer": 0,
        "explanation": "Дочірній обʼєкт з таким імʼям"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Змінна `part` після пошуку…",
        "options": [
          "Посилається на обʼєкт (або nil)",
          "Завжди створює нову гру",
          "Видаляє Sky",
          "Робіть Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Посилається на обʼєкт (або nil)"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`Color3.fromRGB` задає…",
        "options": [
          "Колір",
          "Звук",
          "HP",
          "Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Колір"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Якщо імʼя Part неправильне…",
        "options": [
          "Отримаємо nil / спрацює захист if",
          "Studio видалить Roblox",
          "Автоматично створить материк",
          "Дасть IntValue"
        ],
        "correctAnswer": 0,
        "explanation": "Отримаємо nil / спрацює захист if"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Код що фарбує Part через змінну",
          "Повний GUI магазин",
          "DataStore",
          "Raycast"
        ],
        "correctAnswer": 0,
        "explanation": "Код що фарбує Part через змінну"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "`part.Name` читає…",
        "options": [
          "Імʼя обʼєкта",
          "Volume Sound завжди",
          "ClockTime",
          "Pivot даху обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "Імʼя обʼєкта"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чому імена Parts важливі для коду?",
        "options": [
          "Шукаємо за рядком імені",
          "Код читає лише колір ніку",
          "Код читає лише IP",
          "Імена непотрібні ніколи"
        ],
        "correctAnswer": 0,
        "explanation": "Шукаємо за рядком імені"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Transparency = 0.5 з коду…",
        "options": [
          "Робить напівпрозорим",
          "Видаляє скрипт",
          "Вимикає Output",
          "Зберігає Place"
        ],
        "correctAnswer": 0,
        "explanation": "Робить напівпрозорим"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "М5 відрізняється від М4 тим що…",
        "options": [
          "Пишемо і розуміємо свої змінні",
          "Забороняємо Output",
          "Видаляємо всі Parts",
          "Працюємо лише в Word"
        ],
        "correctAnswer": 0,
        "explanation": "Пишемо і розуміємо свої змінні"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Числа: рахунок, математика змінних",
          "Тільки ClickDetector копіпаст без змінних",
          "Тільки Negate",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Числа: рахунок, математика змінних"
      }
    ]
  }
}

export const enLesson54 = {
  "lessonId": "lesson-roblox-5-4",
  "moduleId": "module-05",
  "order": 4,
  "title": "5.4 — Number logic and score",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "`+ - * /`; нарахувати очки в змінній; звʼязати з leaderstats Value (писати оновлення Value через змінну).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** `+ - * /`; нарахувати очки в змінній; звʼязати з leaderstats Value (писати оновлення Value через змінну).\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "```lua local coins = 0 coins = coins + 5 coins = coins * 2 print(\"Монет:\", coins) ``` Плюс міні-скрипт: при Join виставити `Coins.Value` зі змінної старту (або кнопка/Part дає +n через змінну `reward`)."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Артефакт\n\n```lua\nlocal coins = 0\ncoins = coins + 5\ncoins = coins * 2\nprint(\"Монет:\", coins)\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Придумати формулу старту: `base = 3`, `bonus = 2`, print суми."
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
  "summary": "**5.4 — Number logic and score** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Number logic and score",
    "difficulty": "intermediate",
    "description": "### Task\n```lua local coins = 0 coins = coins + 5 coins = coins * 2 print(\"Монет:\", coins) ``` Плюс міні-скрипт: при Join виставити `Coins.Value` зі змінної старту (або кнопка/Part дає +n через змінну `reward`).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Челендж: кінцеве число має дорівнювати секрету викладача"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`coins = coins + 5` означає…",
        "options": [
          "Збільшити coins на 5",
          "Видалити coins",
          "Зробити Part",
          "Змінити Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Збільшити coins на 5"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`*` це…",
        "options": [
          "Множення",
          "Видалення Model",
          "Negate",
          "Publish"
        ],
        "correctAnswer": 0,
        "explanation": "Множення"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Чому пишемо `coins = coins + 1`, а не лише `coins + 1`?",
        "options": [
          "Треба зберегти новий результат у змінну",
          "Lua забороняє плюс",
          "Інакше немає камери",
          "Інакше немає Path"
        ],
        "correctAnswer": 0,
        "explanation": "Треба зберегти новий результат у змінну"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Звʼязок змінної і `IntValue`…",
        "options": [
          "Value можна читати/писати з коду",
          "Value ніколи не змінюється з коду",
          "Value — це Sky",
          "Value — це Terrain"
        ],
        "correctAnswer": 0,
        "explanation": "Value можна читати/писати з коду"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Рахунок через операції + нагорода змінною",
          "Повний MMO",
          "Blender",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Рахунок через операції + нагорода змінною"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "`/` це…",
        "options": [
          "Ділення",
          "Folder",
          "Union",
          "SoundId"
        ],
        "correctAnswer": 0,
        "explanation": "Ділення"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Секретне число викладача тренує…",
        "options": [
          "Уважність до порядку операцій",
          "Видалення акаунта",
          "Покупку Robux",
          "Вимкнення Wi-Fi"
        ],
        "correctAnswer": 0,
        "explanation": "Уважність до порядку операцій"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "`reward` як змінна краще ніж магічне число в 10 місцях бо…",
        "options": [
          "Легко змінити в одному місці",
          "Roblox так вимагає законом",
          "Інакше немає Play",
          "Інакше немає Explorer"
        ],
        "correctAnswer": 0,
        "explanation": "Легко змінити в одному місці"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Чи це вже цикл for?",
        "options": [
          "Ні — поки операції зі змінними",
          "Так",
          "Так і while",
          "Так і UI Grid"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — поки операції зі змінними"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Vector3 і Size/Position",
          "Тільки Decal",
          "Тільки Ambient",
          "Тільки відео"
        ],
        "correctAnswer": 0,
        "explanation": "Vector3 і Size/Position"
      }
    ]
  }
}

export const enLesson55 = {
  "lessonId": "lesson-roblox-5-5",
  "moduleId": "module-05",
  "order": 5,
  "title": "5.5 — Vector3: size and position",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "змінити `Size` і `Position` через `Vector3.new`.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** змінити `Size` і `Position` через `Vector3.new`.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "«Пульт» частина 1: Part `TargetBlock` збільшується і підстрибує вгору на Y+ з коду. ```lua local block = workspace:FindFirstChild(\"TargetBlock\") local newSize = Vector3.new(4, 4, 4) local lift = Vector3.new(0, 5, 0) if block then block.Size = newSize block.Position = block.Position + lift end ```"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal block = workspace:FindFirstChild(\"TargetBlock\")\nlocal newSize = Vector3.new(4, 4, 4)\nlocal lift = Vector3.new(0, 5, 0)\n\nif block then\n\tblock.Size = newSize\n\tblock.Position = block.Position + lift\nend\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Підготувати Part `ColorOrb` для фіналки 5.6 (сфера/куб)."
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
  "summary": "**5.5 — Vector3: size and position** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Vector3: size and position",
    "difficulty": "intermediate",
    "description": "### Task\n«Пульт» частина 1: Part `TargetBlock` збільшується і підстрибує вгору на Y+ з коду. ```lua local block = workspace:FindFirstChild(\"TargetBlock\") local newSize = Vector3.new(4, 4, 4) local lift = Vector3.new(0, 5, 0) if block then block.Size = newSize block.Position = block.Position + lift end ```\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Челендж: блок став «вежею» (високий Y size)"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Vector3 зберігає…",
        "options": [
          "Три числа (X, Y, Z)",
          "Лише текст",
          "Лише boolean",
          "Лише Sound"
        ],
        "correctAnswer": 0,
        "explanation": "Три числа (X, Y, Z)"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`Size = Vector3.new(4,1,2)` задає…",
        "options": [
          "Розмір Part",
          "Імʼя гравця",
          "Volume ambient",
          "ClockTime"
        ],
        "correctAnswer": 0,
        "explanation": "Розмір Part"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Додати до Position `(0,5,0)`…",
        "options": [
          "Піднімає обʼєкт угору",
          "Видаляє скрипт",
          "Вимикає Output",
          "Робіть Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Піднімає обʼєкт угору"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Змінні width/height/depth потрібні щоб…",
        "options": [
          "Збирати Vector3 зрозуміло",
          "Малювати Sky",
          "Створювати Folder автоматично",
          "Купувати GamePass"
        ],
        "correctAnswer": 0,
        "explanation": "Збирати Vector3 зрозуміло"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Блок змінює Size/Position з коду",
          "Повний Tycoon",
          "AI бос",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Блок змінює Size/Position з коду"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Y у Roblox зазвичай…",
        "options": [
          "Висота / вгору-вниз",
          "Мова інтерфейсу",
          "Кількість друзів",
          "Номер уроку Discord"
        ],
        "correctAnswer": 0,
        "explanation": "Висота / вгору-вниз"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чи Vector3 = string?",
        "options": [
          "Ні",
          "Так",
          "Так завжди",
          "Тільки вночі"
        ],
        "correctAnswer": 0,
        "explanation": "Ні"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Якщо TargetBlock не знайдено…",
        "options": [
          "Перевірити імʼя в Explorer",
          "Купити Robux",
          "Видалити акаунт",
          "Змінити біом словами"
        ],
        "correctAnswer": 0,
        "explanation": "Перевірити імʼя в Explorer"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "CFrame на М5…",
        "options": [
          "Згадуємо пізніше / обережно; база — Position/Size",
          "Обовʼязковий увесь API",
          "Замінює всі змінні",
          "Видаляє Vector3"
        ],
        "correctAnswer": 0,
        "explanation": "Згадуємо пізніше / обережно; база — Position/Size"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Фінал модуля — Пульт кольору",
          "Видалення SSS",
          "Скасування Lua",
          "Лише теорія PDF"
        ],
        "correctAnswer": 0,
        "explanation": "Фінал модуля — Пульт кольору"
      }
    ]
  }
}

export const enLesson56 = {
  "lessonId": "lesson-roblox-5-6",
  "moduleId": "module-05",
  "order": 6,
  "title": "5.6 — Project: Color Console",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зібрати скрипт з 5+ змінними, який налаштовує `ColorOrb` (колір, розмір, прозорість, anchorage message).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** зібрати скрипт з 5+ змінними, який налаштовує `ColorOrb` (колір, розмір, прозорість, anchorage message).\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Build a **visible result** in your Place and Save to Roblox."
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
        "content": "Polish your result for 15–20 min and save the Place. Next time, show a short 20–30s demo."
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
  "summary": "**5.6 — Project: Color Console** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Project: Color Console",
    "difficulty": "intermediate",
    "description": "### Task\nComplete the steps for “Project: Color Console” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "If work vanished — check that you saved the Place."
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
        "question": "Пульт кольору показує що…",
        "options": [
          "Змінні керують виглядом світу",
          "Змінні непотрібні",
          "Lua лише для чату",
          "Parts не існують"
        ],
        "correctAnswer": 0,
        "explanation": "Змінні керують виглядом світу"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Boolean для Transparency…",
        "options": [
          "Можна трактувати як «увімкнути напівпрозорість» у логіці уроку",
          "Заборонений",
          "Видаляє orb",
          "Створює TeleportService"
        ],
        "correctAnswer": 0,
        "explanation": "Можна трактувати як «увімкнути напівпрозорість» у логіці уроку"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Після М5 ми готові до…",
        "options": [
          "Умов if",
          "Повного DataStore курсу лише",
          "Тільки Blender",
          "Тільки відео"
        ],
        "correctAnswer": 0,
        "explanation": "Умов if"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "`local` змінні в пульті…",
        "options": [
          "Зручно крутити параметри зверху скрипта",
          "Заборонені",
          "Працюють лише в Terrain",
          "Працюють лише в Discord"
        ],
        "correctAnswer": 0,
        "explanation": "Зручно крутити параметри зверху скрипта"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "FindFirstChild + перевірка…",
        "options": [
          "Захищає від nil",
          "Видаляє Output",
          "Вимикає Play",
          "Робіть Union"
        ],
        "correctAnswer": 0,
        "explanation": "Захищає від nil"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Чи М5 = повний Lua?",
        "options": [
          "Ні — фундамент змінних",
          "Так увесь язык",
          "Так і C++",
          "Так і HTML"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — фундамент змінних"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Різниця М4 і М5…",
        "options": [
          "Від шаблонів до свідомих змінних",
          "Відміна Studio",
          "Відміна тестів",
          "Відміна Parts"
        ],
        "correctAnswer": 0,
        "explanation": "Від шаблонів до свідомих змінних"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Color3 можна тримати…",
        "options": [
          "У змінній",
          "Лише в Word",
          "Лише в ніку",
          "Лише в Sky обовʼязково без Part"
        ],
        "correctAnswer": 0,
        "explanation": "У змінній"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "print звіту потрібен щоб…",
        "options": [
          "Підтвердити виконання в Output",
          "Видалити orb",
          "Зберегти PDF",
          "Купити Plugin"
        ],
        "correctAnswer": 0,
        "explanation": "Підтвердити виконання в Output"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "М6 почнеться з…",
        "options": [
          "if / else",
          "Negate only",
          "Atmosphere only",
          "НМТ only"
        ],
        "correctAnswer": 0,
        "explanation": "if / else"
      }
    ]
  }
}
