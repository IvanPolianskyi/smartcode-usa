/** Roblox v2 Module 09 EN — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE
void MC

export const enLesson91 = {
  "lessonId": "lesson-roblox-9-1",
  "moduleId": "module-09",
  "order": 1,
  "title": "9.1 — Obby route design",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "намалювати plan на папері/в Studio скелет: Start, 3 сегменти складності, Finish. Побудувати платформи Parts.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** намалювати plan на папері/в Studio скелет: Start, 3 сегменти складності, Finish. Побудувати платформи Parts.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Folder `Obby/Course` з мінімум 12 платформ + Spawn + FinishPad (поки без скриптів)."
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
  "summary": "**9.1 — Obby route design** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Obby route design",
    "difficulty": "advanced",
    "description": "### Task\nFolder `Obby/Course` з мінімум 12 платформ + Spawn + FinishPad (поки без скриптів).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Obby без продуманих стрибків… **дратує** — спочатку level design (a) 2. Секції Easy/Mid/Hard… **крива складності** (a) 3. Spawn ставлять… **на старті маршруту** (a) 4. Артефакт… **скелет курсу платформ** (a) 5. Playtest стрибка потрібен бо… **відстань у Studio ≠ відчуття** (a) 6. Folder Course… **порядок** (a) 7. Код на 9.1… **мінімум / ще ні** (a) 8. FinishPad… **місце фінішу заздалегідь** (a) 9. Контраст платформ… **читабельність** (a) 10. Далі… **пастки своїм кодом** (a) *(Розгорнуті варіанти для LMS)* 1. Навіщо будувати маршрут до складного коду?",
        "options": [
          "Щоб механіки сідали на готовий level design",
          "Бо код у Roblox заборонений без 100 платформ",
          "Бо Negate обовʼязковий для кожної платформи",
          "Бо DataStore не працює без obby"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб механіки сідали на готовий level design"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "«Крива складності» означає…",
        "options": [
          "Спочатку легше, далі важче",
          "Завжди тільки неможливі стрибки",
          "Видалення Spawn",
          "Вимкнення Anchored усього"
        ],
        "correctAnswer": 0,
        "explanation": "Спочатку легше, далі важче"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Якщо стрибок недобрається в Play…",
        "options": [
          "Підігнати відстань/висоту платформ",
          "Купити Robux",
          "Видалити акаунт",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Підігнати відстань/висоту платформ"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Скелет obby з платформ",
          "Повний Tycoon",
          "Blender персонаж",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Скелет obby з платформ"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "FinishPad на цьому уроці…",
        "options": [
          "Ставимо як Part-маркер",
          "Одразу публікуємо в топ",
          "Видаляємо Path з М1 обовʼязково",
          "Замінюємо на Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Ставимо як Part-маркер"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Секція Hard одразу з першої платформи…",
        "options": [
          "Поганий онбординг",
          "Єдиний правильний стиль",
          "Дає Badge автоматично",
          "Видаляє потребу тестів"
        ],
        "correctAnswer": 0,
        "explanation": "Поганий онбординг"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Playtest у групі…",
        "options": [
          "Швидкий фідбек на стрибки",
          "Заміна Save",
          "Вимкнення Output",
          "Створення Union даху"
        ],
        "correctAnswer": 0,
        "explanation": "Швидкий фідбек на стрибки"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Імена `Plat_01`…",
        "options": [
          "Допомагають коду і порядку",
          "Ламають фізику",
          "Заборонені",
          "Дають Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Допомагають коду і порядку"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Чи М9 копіює лише шаблони М4 без змін?",
        "options": [
          "Ні — пишемо свідомо на базі Lua",
          "Так і лише Ctrl+C",
          "Так без Platform",
          "Так без Spawn"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — пишемо свідомо на базі Lua"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Наступний урок…",
        "options": [
          "Пастки / kill зони функціями",
          "Тільки Lighting",
          "Тільки Ambient",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Пастки / kill зони функціями"
      }
    ]
  }
}

export const enLesson92 = {
  "lessonId": "lesson-roblox-9-2",
  "moduleId": "module-09",
  "order": 2,
  "title": "9.2 — Hazards with functions",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "Module або local functions для kill bricks; кілька пасток без копіпасту скрипта в кожен Part (один Script + CollectionService **або** простіший варіант: тег-папка + цикл по children).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** Module або local functions для kill bricks; кілька пасток без копіпасту скрипта в кожен Part (один Script + CollectionService **або** простіший варіант: тег-папка + цикл по children).\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal function killCharacter(character)\n\tlocal humanoid = character:FindFirstChild(\"Humanoid\")\n\tif humanoid then\n\t\thumanoid.Health = 0\n\tend\nend\n\nlocal function hookHazard(part)\n\tpart.Touched:Connect(function(hit)\n\t\tlocal character = hit.Parent\n\t\tif character:FindFirstChild(\"Humanoid\") then\n\t\t\tkillCharacter(character)\n\t\tend\n\tend)\nend\n\nfor _, part in ipairs(workspace.Obby.Hazards:GetChildren()) do\n\tif part:IsA(\"BasePart\") then\n\t\thookHazard(part)\n\tend\nend\n```"
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
  "summary": "**9.2 — Hazards with functions** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Hazards with functions",
    "difficulty": "advanced",
    "description": "### Task\nComplete the steps for “Hazards with functions” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
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
        "question": "Винести kill у функцію… **DRY / один стиль смерті** (a) 2. Цикл по Hazards… **підключити всі пастки** (a) 3. IsA(\"BasePart\")… **фільтр** (a) 4. Артефакт… **кілька пасток одним кодом** (a) 5. Копія скрипта в кожен Part… **гірше масштабується** (a) 6. Touched + Humanoid… **фільтр гравця** (a) 7. Folder Hazards… **організація** (a) 8. М8 функції тут… **застосування** (a) 9. Без циклу… **багато ручної роботи** (a) 10. Далі… **чекпоінти** (a) 1. Навіщо `hookHazard(part)`?",
        "options": [
          "Однаково підключити Touched до різних Parts",
          "Намалювати Sky",
          "Зробити Negate",
          "Відкрити Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Однаково підключити Touched до різних Parts"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`GetChildren()` повертає…",
        "options": [
          "Список дітей обʼєкта",
          "Список друзів Discord",
          "Список плагінів Photoshop",
          "Список ігор Steam"
        ],
        "correctAnswer": 0,
        "explanation": "Список дітей обʼєкта"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Якщо пастка не в Folder Hazards…",
        "options": [
          "Цикл її не підключить",
          "Вона автоматично вбиває завжди",
          "Studio видалить Place",
          "Дасть Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Цикл її не підключить"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Система пасток через функції+цикл",
          "Повний магазин GUI з DataStore",
          "Blender face",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Система пасток через функції+цикл"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "`killCharacter` окремо щоб…",
        "options": [
          "Перевикористовувати логіку смерті",
          "Видалити Humanoid з Roblox",
          "Вимкнути Play",
          "Змінити біом"
        ],
        "correctAnswer": 0,
        "explanation": "Перевикористовувати логіку смерті"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Це краще за 10 копій скрипта бо…",
        "options": [
          "Одна точка правок",
          "Roblox це забороняє",
          "FPS завжди 1",
          "Немає Output"
        ],
        "correctAnswer": 0,
        "explanation": "Одна точка правок"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Базовий колір hazards…",
        "options": [
          "Контраст небезпеки",
          "Обовʼязково прозорий 1",
          "Обовʼязково CanCollide false",
          "Обовʼязково в ServerStorage"
        ],
        "correctAnswer": 0,
        "explanation": "Контраст небезпеки"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "ipairs по дітей…",
        "options": [
          "З М8 таблиць/обходу",
          "Новий язык",
          "Заміна Vector3",
          "Заміна Anchored"
        ],
        "correctAnswer": 0,
        "explanation": "З М8 таблиць/обходу"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ додати пастки…",
        "options": [
          "Лише Parts у Folder — код підхопить",
          "Обовʼязково новий Script у кожен",
          "Обовʼязково Blender",
          "Обовʼязково Plugin"
        ],
        "correctAnswer": 0,
        "explanation": "Лише Parts у Folder — код підхопить"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Чекпоінти системою",
          "Тільки Ambient",
          "Тільки Decal",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Чекпоінти системою"
      }
    ]
  }
}

export const enLesson93 = {
  "lessonId": "lesson-roblox-9-3",
  "moduleId": "module-09",
  "order": 3,
  "title": "9.3 — Checkpoint system",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "таблиця/значення стадії; Checkpoint Parts оновлюють точку респавну гравця.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** таблиця/значення стадії; Checkpoint Parts оновлюють точку респавну гравця.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "≥2 Checkpoint на Easy і Mid; після смерті повернення не на самий старт (якщо вже взято CP)."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\n-- при Checkpoint Touched:\nplayer:SetAttribute(\"CP_X\", part.Position.X)\n-- ... Y Z\n-- при CharacterAdded: телепорт на атрибути якщо є\n```"
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
  "summary": "**9.3 — Checkpoint system** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Checkpoint system",
    "difficulty": "advanced",
    "description": "### Task\n≥2 Checkpoint на Easy і Mid; після смерті повернення не на самий старт (якщо вже взято CP).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
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
        "question": "Чекпоінт зберігає… **прогрес позиції** (a) 2. Функція setCheckpoint… **одна точка запису** (a) 3. CharacterAdded… **момент нового персонажа після смерті** (a) 4. Артефакт… **2+ CP у рівня** (a) 5. Без CP… **карає навчання** (a) 6. Атрибути/значення… **носій даних прогресу** (a) 7. Порядок CP на трасі… **за прогресом секцій** (a) 8. Тест death loop… **обовʼязковий** (a) 9. Код свідомо vs М4… **свої функції** (a) 10. Далі… **рухомі платформи** (a) 1. Навіщо функція `setCheckpoint`?",
        "options": [
          "Записати прогрес в одному стилі для всіх CP",
          "Видалити Spawn назавжди",
          "Зробити Union",
          "Намалювати Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Записати прогрес в одному стилі для всіх CP"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Після смерті логічно…",
        "options": [
          "Повернути до останнього CP",
          "Видалити Place",
          "Вимкнути мікрофон",
          "Купити Plugin"
        ],
        "correctAnswer": 0,
        "explanation": "Повернути до останнього CP"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "CharacterAdded повʼязаний з…",
        "options": [
          "Появою/респавном персонажа",
          "Зміною Material даху завжди",
          "Негативним Union",
          "Decal Face"
        ],
        "correctAnswer": 0,
        "explanation": "Появою/респавном персонажа"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Система чекпоінтів на трасі",
          "Повний симулятор ребіртів",
          "Blender",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Система чекпоінтів на трасі"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Два CP краще одного бо…",
        "options": [
          "Довгий маршрут дружніший",
          "Roblox вимагає рівно два",
          "Видаляє пастки",
          "Вимикає for"
        ],
        "correctAnswer": 0,
        "explanation": "Довгий маршрут дружніший"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Якщо CP не спрацьовує…",
        "options": [
          "Touched/імена/чи пишеться прогрес",
          "Обовʼязково Negate",
          "Обовʼязково GamePass",
          "Обовʼязково новий акаунт"
        ],
        "correctAnswer": 0,
        "explanation": "Touched/імена/чи пишеться прогрес"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Пастка + CP разом…",
        "options": [
          "Класичний obby loop",
          "Несумісні",
          "Видаляють Humanoid",
          "Ламають Anchored Foundation завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Класичний obby loop"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Канонічний шаблон школи…",
        "options": [
          "Щоб група не розʼїхалась по 5 несумісних системах",
          "Забороняє функції",
          "Забороняє Play",
          "Забороняє тест"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб група не розʼїхалась по 5 несумісних системах"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ CP біля Hard…",
        "options": [
          "Готує довгу трасу",
          "Видаляє Easy",
          "Скасовує Mid",
          "Скасовує Finish"
        ],
        "correctAnswer": 0,
        "explanation": "Готує довгу трасу"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Рухомі платформи",
          "Тільки Sky",
          "Тільки Ambient",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Рухомі платформи"
      }
    ]
  }
}

export const enLesson94 = {
  "lessonId": "lesson-roblox-9-4",
  "moduleId": "module-09",
  "order": 4,
  "title": "9.4 — Moving platforms",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "платформа їздить між точками A–B.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** платформа їздить між точками A–B.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Педагогічний варіант (зрозумілий)\n\n```lua\nlocal platform = script.Parent\nlocal start = platform.Position\nlocal offset = Vector3.new(10, 0, 0)\nlocal t = 0\n\nwhile true do\n\tt += 0.03\n\tlocal alpha = (math.sin(t) + 1) / 2\n\tplatform.Position = start:Lerp(start + offset, alpha)\n\ttask.wait()\nend\n```"
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
  "summary": "**9.4 — Moving platforms** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Moving platforms",
    "difficulty": "advanced",
    "description": "### Task\nComplete the steps for “Moving platforms” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
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
        "question": "Рухома платформа… **ускладнює паркур** (a) 2. while + wait… **анімація позиції** (a) 3. offset Vector3… **амплітуда** (a) 4. Anchored… **контроль з коду** (a) 5. Артефакт… **1–2 movers** (a) 6. Занадто швидкий рух… **несправедливо** (a) 7. Lerp/sin… **плавність** (a) 8. Не ставити 20 movers на слабкий ПК… **ліміт** (a) 9. Playtest обовʼязковий… **так** (a) 10. Далі… **фініш + перемога** (a) 1. Навіщо рухати платформу кодом?",
        "options": [
          "Динамічний виклик у рівні",
          "Замінити всі Parts на Sky",
          "Видалити чекпоінти",
          "Вимкнути Output"
        ],
        "correctAnswer": 0,
        "explanation": "Динамічний виклик у рівні"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`task.wait()` у циклі руху…",
        "options": [
          "Не завішує поток без паузи кадру",
          "Видаляє платформу",
          "Робіть Negate",
          "Купує Plugin"
        ],
        "correctAnswer": 0,
        "explanation": "Не завішує поток без паузи кадру"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Занадто великий offset…",
        "options": [
          "Може зірвати гравця / зробити неможливо",
          "Завжди добре",
          "Дає Badge",
          "Зберігає Place"
        ],
        "correctAnswer": 0,
        "explanation": "Може зірвати гравця / зробити неможливо"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Працюючі рухомі платформи",
          "Повний Tycoon dropper",
          "DataStore усіх гравців планети",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Працюючі рухомі платформи"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Прапорець напрямку «туди-назад»…",
        "options": [
          "Проста альтернатива sin",
          "Заборонений",
          "Лише в C#",
          "Лише в HTML"
        ],
        "correctAnswer": 0,
        "explanation": "Проста альтернатива sin"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Якщо платформа тікає з рівня…",
        "options": [
          "Перевірити start/offset/помилку в коді",
          "Видалити акаунт",
          "Купити Robux",
          "Змінити біом словами"
        ],
        "correctAnswer": 0,
        "explanation": "Перевірити start/offset/помилку в коді"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Кілька movers…",
        "options": [
          "Різні offset/швидкість",
          "Обовʼязково ідентичні завжди",
          "Не можна більше одного в Roblox",
          "Видаляють Spawn"
        ],
        "correctAnswer": 0,
        "explanation": "Різні offset/швидкість"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Фізика гравця на платформі…",
        "options": [
          "Може бути недосконала — ок для навчання",
          "Завжди AAA як у Roblox офіційних іграх автоматом",
          "Забороняє Anchored",
          "Вимагає Blender"
        ],
        "correctAnswer": 0,
        "explanation": "Може бути недосконала — ок для навчання"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ третій mover…",
        "options": [
          "У Hard секції",
          "У ServerStorage тільки",
          "У Lighting",
          "У Discord"
        ],
        "correctAnswer": 0,
        "explanation": "У Hard секції"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Фініш і екран/повідомлення перемоги",
          "Тільки Negate",
          "Тільки Ambient",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Фініш і екран/повідомлення перемоги"
      }
    ]
  }
}

export const enLesson95 = {
  "lessonId": "lesson-roblox-9-5",
  "moduleId": "module-09",
  "order": 5,
  "title": "9.5 — Finish and victory",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "FinishPad → якщо гравець / якщо ще не виграв → print + GUI «Перемога» + опційно зупинка таймера.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** FinishPad → якщо гравець / якщо ще не виграв → print + GUI «Перемога» + опційно зупинка таймера.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal finished = {} -- userId = true\n\nlocal function onFinish(player)\n\tif finished[player.UserId] then return end\n\tfinished[player.UserId] = true\n\tprint(player.Name, \"фінішував!\")\n\t-- показати ScreenGui Win (RemoteEvent lite АБО сервер дає підказку через перевірку на клієнті пізніше)\nend\n```"
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
  "summary": "**9.5 — Finish and victory** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Finish and victory",
    "difficulty": "advanced",
    "description": "### Task\nComplete the steps for “Finish and victory” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
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
        "question": "Фініш без debounce… **спам перемог** (a) 2. finished[userId]… **таблиця стану** (a) 3. Артефакт… **перемога спрацьовує 1 раз** (a) 4. GUI Win… **фідбек гравцю** (a) 5. Звук фінішу… **атмосфера** (a) 6. Перевірка Humanoid/player… **так** (a) 7. Фініш на Mid випадково… **зсунути** (a) 8. Повний run playtest… **обовʼязок** (a) 9. RemoteEvent… **згадати обережно** (a) 10. Далі… **таймер рівня** (a) 1. Навіщо памʼятати хто вже фінішував?",
        "options": [
          "Щоб не спамити перемогу на кожен Touched",
          "Щоб видалити Path",
          "Щоб вимкнути Snap",
          "Щоб зробити Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб не спамити перемогу на кожен Touched"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Таблиця `finished` — застосування…",
        "options": [
          "Словника/стану з М8",
          "Terrain Editor",
          "Sky only",
          "Decal only"
        ],
        "correctAnswer": 0,
        "explanation": "Словника/стану з М8"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Фініш з одноразовою перемогою",
          "Повний MMO реліз",
          "Blender",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Фініш з одноразовою перемогою"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Win GUI хоч мінімальний…",
        "options": [
          "Показує результат без Output",
          "Заборонений на obby",
          "Видаляє чекпоінти",
          "Вимикає пастки"
        ],
        "correctAnswer": 0,
        "explanation": "Показує результат без Output"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Якщо фініш занадто близький до старту…",
        "options": [
          "Перенести / видовжити курс",
          "Видалити гру",
          "Купити Robux",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Перенести / видовжити курс"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Звук на фініші…",
        "options": [
          "Посилює момент перемоги",
          "Обовʼязково Volume 10",
          "Заміна Spawn",
          "Заміна CP"
        ],
        "correctAnswer": 0,
        "explanation": "Посилює момент перемоги"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "GetPlayerFromCharacter на Finish…",
        "options": [
          "Щоб знати хто виграв",
          "Щоб намалювати Terrain",
          "Щоб зробити Union",
          "Щоб відкрити Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб знати хто виграв"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "ДЗ полірування GUI…",
        "options": [
          "Текст імʼя / «Ти пройшов!»",
          "Видалити Finish",
          "Видалити Easy",
          "Скасувати Mid"
        ],
        "correctAnswer": 0,
        "explanation": "Текст імʼя / «Ти пройшов!»"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Obby майже playable коли…",
        "options": [
          "Є маршрут+пастки+CP+фініш",
          "Є лише Baseplate",
          "Є лише PDF",
          "Є лише нік"
        ],
        "correctAnswer": 0,
        "explanation": "Є маршрут+пастки+CP+фініш"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Таймер проходження",
          "Тільки Atmosphere",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Таймер проходження"
      }
    ]
  }
}

export const enLesson96 = {
  "lessonId": "lesson-roblox-9-6",
  "moduleId": "module-09",
  "order": 6,
  "title": "9.6 — Run timer",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "старт відліку від Spawn/кнопки; стоп на фініші; показати час.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** старт відліку від Spawn/кнопки; стоп на фініші; показати час.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
  "summary": "**9.6 — Run timer** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Run timer",
    "difficulty": "advanced",
    "description": "### Task\nComplete the steps for “Run timer” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Таймер додає… **мету швидкости / реграбельність** (a) 2. Старт таймера… **на початку спроби** (a) 3. Стоп… **на фініші** (a) 4. Показ часу… **UI або print** (a) 5. Артефакт… **час проходження** (a) 6. Рекорди групи… **мотивація** (a) 7. Античит глибокий… **не М9** (a) 8. Скидання таймера на рестарт… **так** (a) 9. Звʼязок з while/for М7… **так** (a) 10. Далі… **баланс складності polish** (a) 1. Навіщо таймер у obby?",
        "options": [
          "Мотивація проходити і покращувати час",
          "Видалити пастки",
          "Вимкнути CP",
          "Замінити Finish на Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Мотивація проходити і покращувати час"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Якщо таймер не зупиняється на фініші…",
        "options": [
          "Баг звʼязку фініш→стоп",
          "Секретна фіча завжди",
          "Дає Robux",
          "Робіть Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Баг звʼязку фініш→стоп"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Робочий таймер проходження",
          "Повний Tycoon",
          "Blender",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Робочий таймер проходження"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Локальний навчальний таймер…",
        "options": [
          "Ок для М9 з чесним поясненням",
          "Єдиний спосіб зробити DataStore",
          "Заборонений",
          "Видаляє сервер"
        ],
        "correctAnswer": 0,
        "explanation": "Ок для М9 з чесним поясненням"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Рестарт після смерті…",
        "options": [
          "Логіка скидання/продовження — домовитись на уроці",
          "Завжди видаляє Place",
          "Завжди вимикає мікрофон",
          "Завжди купує Plugin"
        ],
        "correctAnswer": 0,
        "explanation": "Логіка скидання/продовження — домовитись на уроці"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Порівняння часів у групі…",
        "options": [
          "Дружній челендж",
          "Єдина оцінка курсу без рубрики",
          "Привід ображати",
          "Привід видаляти акаунти"
        ],
        "correctAnswer": 0,
        "explanation": "Дружній челендж"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "UI тексту часу…",
        "options": [
          "Зручніше за Output",
          "Заборонено",
          "Ламає Parts",
          "Видаляє Hazards"
        ],
        "correctAnswer": 0,
        "explanation": "Зручніше за Output"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "М7 wait/while тут…",
        "options": [
          "Оновлення дисплея",
          "Нерелевантні",
          "Видаляють функцію",
          "Видаляють таблицю"
        ],
        "correctAnswer": 0,
        "explanation": "Оновлення дисплея"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ покращити читабельність таймера…",
        "options": [
          "Формат сек / колір",
          "Видалити фініш",
          "Видалити CP",
          "Скасувати Easy"
        ],
        "correctAnswer": 0,
        "explanation": "Формат сек / колір"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Баланс і polish рівня",
          "Тільки Negate",
          "Тільки Ambient",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Баланс і polish рівня"
      }
    ]
  }
}

export const enLesson97 = {
  "lessonId": "lesson-roblox-9-7",
  "moduleId": "module-09",
  "order": 7,
  "title": "9.7 — Balance and polish",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "пройти чужий obby в парі; список фіксів; стрілки-підказки Parts; прибрати unfair gaps.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** пройти чужий obby в парі; список фіксів; стрілки-підказки Parts; прибрати unfair gaps.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
  "summary": "**9.7 — Balance and polish** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Balance and polish",
    "difficulty": "advanced",
    "description": "### Task\nComplete the steps for “Balance and polish” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Playtest чужого рівня… **бачить сліпі зони автора** (a) 2. Unfair gap… **виправити** (a) 3. Підказка стрілкою… **онбординг** (a) 4. Polish… **не нові фічі заради фіч** (a) 5. Артефакт… **список фіксів + правки** (a) 6. Занадто багато movers… **спростити** (a) 7. Контраст hazards… **так** (a) 8. Звук/ambient… **за бажанням** (a) 9. Рубрика зрозумілості… **так** (a) 10. Далі… **чекпоінт-презентація М9** (a) 1. Навіщо грати чужий obby?",
        "options": [
          "Знайти незрозумілі місця очима новачка",
          "Видалити чужий акаунт",
          "Вимкнути їхній мікрофон назавжди",
          "Забрати їхній Place"
        ],
        "correctAnswer": 0,
        "explanation": "Знайти незрозумілі місця очима новачка"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Підказки на рівні…",
        "options": [
          "Допомагають не застрягти на старті",
          "Завжди займають 90% екрана",
          "Замінюють фініш",
          "Видаляють таймер"
        ],
        "correctAnswer": 0,
        "explanation": "Допомагають не застрягти на старті"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Polish означає…",
        "options": [
          "Допиляти якість наявного",
          "Додати 50 нових жанрів",
          "Видалити весь код",
          "Перейти в Blender обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "Допиляти якість наявного"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Поліпшений збалансований рівень",
          "Новий курс Python",
          "НМТ історія",
          "Clipchamp фільм"
        ],
        "correctAnswer": 0,
        "explanation": "Поліпшений збалансований рівень"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Якщо половина групи не проходить Mid…",
        "options": [
          "Полегшити / додати CP",
          "Зробити ще важче обовʼязково",
          "Видалити Easy",
          "Вимкнути Play"
        ],
        "correctAnswer": 0,
        "explanation": "Полегшити / додати CP"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Список фіксів у чаті…",
        "options": [
          "Конкретний план правок",
          "Заміна коду на меми лише",
          "Видалення Explorer",
          "Вимкнення Save"
        ],
        "correctAnswer": 0,
        "explanation": "Конкретний план правок"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Контраст пасток…",
        "options": [
          "Щоб не виглядало як звичайна підлога",
          "Непотрібний",
          "Заборонений",
          "Дає DataStore"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб не виглядало як звичайна підлога"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Парна робота…",
        "options": [
          "Формат групи ≤5",
          "Заборонена",
          "Лише для індивідуала",
          "Лише для дорослих"
        ],
        "correctAnswer": 0,
        "explanation": "Формат групи ≤5"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ…",
        "options": [
          "1 хв презентація run",
          "Видалити фініш",
          "Видалити пастки всі",
          "Скасувати таймер назавжди без причини"
        ],
        "correctAnswer": 0,
        "explanation": "1 хв презентація run"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Здача / презентації М9",
          "Тільки Sky",
          "Тільки Negate",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Здача / презентації М9"
      }
    ]
  }
}

export const enLesson98 = {
  "lessonId": "lesson-roblox-9-8",
  "moduleId": "module-09",
  "order": 8,
  "title": "9.8 — Checkpoint: Obby presentation",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "Understand “Checkpoint: Obby presentation”",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** Master “Checkpoint: Obby presentation”.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
  "summary": "**9.8 — Checkpoint: Obby presentation** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Checkpoint: Obby presentation",
    "difficulty": "advanced",
    "description": "### Task\nComplete the steps for “Checkpoint: Obby presentation” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "М9 = … **цілісний платформер-рівень** (a) 2. Далі М10… **симулятор збір/апгрейди** (a) 3. Функції в obby… **масштаб систем** (a) 4. Без playtest… **слабкий результат** (a) 5. Власний код vs Toolbox map… **навчальна ціль — своє** (a) 6. Таймер… **реграбельність** (a) 7. CP… **дбайливість до гравця** (a) 8. Презентація… **показати run** (a) 9. Фаза D почалась… **жанри** (a) 10. Симулятор відрізняється… **прогресія чисел/збору** (a) 1. Головний результат М9?",
        "options": [
          "Playable obby з власними системами",
          "Лише один Part без коду",
          "Лише PDF",
          "Лише нік"
        ],
        "correctAnswer": 0,
        "explanation": "Playable obby з власними системами"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Наступний модуль…",
        "options": [
          "Симулятор",
          "Скасування Lua",
          "Тільки Negate на місяць",
          "Тільки відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Симулятор"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Пояснення однієї функції на здачі…",
        "options": [
          "Доводить розуміння, не лише копіпаст",
          "Заборонено",
          "Замінює Place",
          "Дає Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Доводить розуміння, не лише копіпаст"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Системи пасток циклом…",
        "options": [
          "Ознака масштабованого коду",
          "Поганий тон завжди",
          "Видаляє Humanoid",
          "Вимикає Anchored"
        ],
        "correctAnswer": 0,
        "explanation": "Ознака масштабованого коду"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Якщо run не проходиться автором…",
        "options": [
          "Баланс не зданий — правити",
          "Секретний ідеал",
          "Дає сертифікат одразу",
          "Видаляє курс"
        ],
        "correctAnswer": 0,
        "explanation": "Баланс не зданий — правити"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "GUI перемоги…",
        "options": [
          "Частина фідбеку гравцю",
          "Заміна платформ",
          "Заміна CP",
          "Заміна Spawn обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "Частина фідбеку гравцю"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "М9 використовує з фази C…",
        "options": [
          "Змінні, if, цикли, функції, таблиці",
          "Нічого",
          "Лише Sky",
          "Лише Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Змінні, if, цикли, функції, таблиці"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Презентація в групі 5…",
        "options": [
          "Короткий run + 1 технічний акцент",
          "Лекція 40′",
          "Без Play",
          "Без мікрофона завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Короткий run + 1 технічний акцент"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Тізер симулятора…",
        "options": [
          "Монети, сила, апгрейди, реграбельність кліків/збору",
          "Лише більше kill bricks",
          "Лише Negate",
          "Лише Atmosphere"
        ],
        "correctAnswer": 0,
        "explanation": "Монети, сила, апгрейди, реграбельність кліків/збору"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Найкращий доказ М9…",
        "options": [
          "Інший учень проходить твій рівень",
          "Лише скрін неба",
          "Лише Word",
          "Лише стікер"
        ],
        "correctAnswer": 0,
        "explanation": "Інший учень проходить твій рівень"
      }
    ]
  }
}
