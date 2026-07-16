/** Roblox v2 Module 05 UK — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE // reserved
void MC

export const ukLesson51 = {
  "lessonId": "lesson-roblox-5-1",
  "moduleId": "module-05",
  "order": 1,
  "title": "5.1 — Що таке змінна",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зрозуміти змінну як «іменовану коробку»; створити `local` і вивести в Output.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** зрозуміти змінну як «іменовану коробку»; створити `local` і вивести в Output.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Script `Vars_01` у SSS: ```lua local playerName = \"Оля\" local score = 0 print(playerName) print(score) ``` (імʼя своє)"
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal playerName = \"Оля\"\nlocal score = 0\nprint(playerName)\nprint(score)\n```"
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Змінна `biome` з назвою біому з М3 + print."
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
  "summary": "Урок **5.1 — Що таке змінна** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Що таке змінна",
    "difficulty": "intermediate",
    "description": "### Завдання\nScript `Vars_01` у SSS: ```lua local playerName = \"Оля\" local score = 0 print(playerName) print(score) ``` (імʼя своє)\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson52 = {
  "lessonId": "lesson-roblox-5-2",
  "moduleId": "module-05",
  "order": 2,
  "title": "5.2 — Типи: number, string, boolean",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "розпізнати три базові типи; навмисно змішати й побачити дивну поведінку / помилку.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** розпізнати три базові типи; навмисно змішати й побачити дивну поведінку / помилку.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "```lua local lives = 3 local title = \"Гравець\" local isAlive = true print(typeof(lives), typeof(title), typeof(isAlive)) ``` Плюс експеримент `print(lives + 1)` і спроба `print(title + 1)` (обговорити)."
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Артефакт\n\n```lua\nlocal lives = 3\nlocal title = \"Гравець\"\nlocal isAlive = true\nprint(typeof(lives), typeof(title), typeof(isAlive))\n```"
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Картка героя: `speed` number, `heroName` string, `hasKey` boolean."
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
  "summary": "Урок **5.2 — Типи: number, string, boolean** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Типи: number, string, boolean",
    "difficulty": "intermediate",
    "description": "### Завдання\n```lua local lives = 3 local title = \"Гравець\" local isAlive = true print(typeof(lives), typeof(title), typeof(isAlive)) ``` Плюс експеримент `print(lives + 1)` і спроба `print(title + 1)` (обговорити).\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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
        "question": "Мета курсу SmartCode Roblox…",
        "options": [
          "Створювати ігри, а не лише грати",
          "Лише дивитись меми",
          "Лише фарбувати Part без імен",
          "Видалити Studio"
        ],
        "correctAnswer": 0,
        "explanation": "Створювати ігри, а не лише грати"
      }
    ]
  }
}

export const ukLesson53 = {
  "lessonId": "lesson-roblox-5-3",
  "moduleId": "module-05",
  "order": 3,
  "title": "5.3 — Змінна вказує на Part",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "`local part = workspace.Foundation` (або FindFirstChild); змінити `part.BrickColor` / `Color` / `Transparency` з коду.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** `local part = workspace.Foundation` (або FindFirstChild); змінити `part.BrickColor` / `Color` / `Transparency` з коду.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Script змінює колір існуючого Part у дворі на зелений, потім друкує імʼя Part. ```lua local part = workspace:FindFirstChild(\"Foundation\") if part then part.Color = Color3.fromRGB(80, 200, 120) print(\"Перефарбували:\", part.Name) end ``` > `if part then` тут як страховка; глибокий if — у М6. Пояснити одним реченням."
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal part = workspace:FindFirstChild(\"Foundation\")\nif part then\n\tpart.Color = Color3.fromRGB(80, 200, 120)\n\tprint(\"Перефарбували:\", part.Name)\nend\n```"
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Скрипт `Paint_Sign` фарбує SignBoard у яскравий колір."
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
  "summary": "Урок **5.3 — Змінна вказує на Part** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Змінна вказує на Part",
    "difficulty": "intermediate",
    "description": "### Завдання\nScript змінює колір існуючого Part у дворі на зелений, потім друкує імʼя Part. ```lua local part = workspace:FindFirstChild(\"Foundation\") if part then part.Color = Color3.fromRGB(80, 200, 120) print(\"Перефарбували:\", part.Name) end ``` > `if part then` тут як страховка; глибокий if — у М6. Пояснити одним реченням.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson54 = {
  "lessonId": "lesson-roblox-5-4",
  "moduleId": "module-05",
  "order": 4,
  "title": "5.4 — Числова логіка і рахунок",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "`+ - * /`; нарахувати очки в змінній; звʼязати з leaderstats Value (писати оновлення Value через змінну).",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** `+ - * /`; нарахувати очки в змінній; звʼязати з leaderstats Value (писати оновлення Value через змінну).\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "```lua local coins = 0 coins = coins + 5 coins = coins * 2 print(\"Монет:\", coins) ``` Плюс міні-скрипт: при Join виставити `Coins.Value` зі змінної старту (або кнопка/Part дає +n через змінну `reward`)."
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Артефакт\n\n```lua\nlocal coins = 0\ncoins = coins + 5\ncoins = coins * 2\nprint(\"Монет:\", coins)\n```"
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Придумати формулу старту: `base = 3`, `bonus = 2`, print суми."
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
  "summary": "Урок **5.4 — Числова логіка і рахунок** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Числова логіка і рахунок",
    "difficulty": "intermediate",
    "description": "### Завдання\n```lua local coins = 0 coins = coins + 5 coins = coins * 2 print(\"Монет:\", coins) ``` Плюс міні-скрипт: при Join виставити `Coins.Value` зі змінної старту (або кнопка/Part дає +n через змінну `reward`).\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson55 = {
  "lessonId": "lesson-roblox-5-5",
  "moduleId": "module-05",
  "order": 5,
  "title": "5.5 — Vector3: розмір і позиція",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "змінити `Size` і `Position` через `Vector3.new`.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** змінити `Size` і `Position` через `Vector3.new`.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "«Пульт» частина 1: Part `TargetBlock` збільшується і підстрибує вгору на Y+ з коду. ```lua local block = workspace:FindFirstChild(\"TargetBlock\") local newSize = Vector3.new(4, 4, 4) local lift = Vector3.new(0, 5, 0) if block then block.Size = newSize block.Position = block.Position + lift end ```"
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal block = workspace:FindFirstChild(\"TargetBlock\")\nlocal newSize = Vector3.new(4, 4, 4)\nlocal lift = Vector3.new(0, 5, 0)\n\nif block then\n\tblock.Size = newSize\n\tblock.Position = block.Position + lift\nend\n```"
      },
      {
        "title": "Перед тестом перевір",
        "content": "- [ ] Place збережено\n- [ ] Результат уроку готовий\n- [ ] Немає безіменних Part1/Part2 у важливій зоні\n- [ ] Можу сказати ціль уроку одним реченням"
      },
      {
        "title": "Домашка",
        "content": "Підготувати Part `ColorOrb` для фіналки 5.6 (сфера/куб)."
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
  "summary": "Урок **5.5 — Vector3: розмір і позиція** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Vector3: розмір і позиція",
    "difficulty": "intermediate",
    "description": "### Завдання\n«Пульт» частина 1: Part `TargetBlock` збільшується і підстрибує вгору на Y+ з коду. ```lua local block = workspace:FindFirstChild(\"TargetBlock\") local newSize = Vector3.new(4, 4, 4) local lift = Vector3.new(0, 5, 0) if block then block.Size = newSize block.Position = block.Position + lift end ```\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson56 = {
  "lessonId": "lesson-roblox-5-6",
  "moduleId": "module-05",
  "order": 6,
  "title": "5.6 — Проєкт: Пульт кольору",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зібрати скрипт з 5+ змінними, який налаштовує `ColorOrb` (колір, розмір, прозорість, anchorage message).",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** зібрати скрипт з 5+ змінними, який налаштовує `ColorOrb` (колір, розмір, прозорість, anchorage message).\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Зроби **видимий результат** у своєму Place і збережи його (Save to Roblox)."
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
        "content": "Попрацюй над результатом ще 15–20 хв і збережи Place. Наступного разу покажи короткий демо 20–30 сек."
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
  "summary": "Урок **5.6 — Проєкт: Пульт кольору** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Проєкт: Пульт кольору",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Проєкт: Пульт кольору» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Якщо щось зникло — перевір, чи зберіг Place."
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
