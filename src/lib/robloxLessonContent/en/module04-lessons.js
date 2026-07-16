/** Roblox v2 Module 04 EN — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE
void MC

export const enLesson41 = {
  "lessonId": "lesson-roblox-4-1",
  "moduleId": "module-04",
  "order": 1,
  "title": "4.1 — Output, Script and print",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "побачити Output; запустити найпростіший скрипт; не боятись червоного тексту.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** побачити Output; запустити найпростіший скрипт; не боятись червоного тексту.\n\nCourse phase: **Sparks & Ready Code**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "`Script` у `ServerScriptService` з іменем `HelloStudio`, який друкує імʼя учня в Output."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M4_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Шаблон коду (готові рядки)\n\n```lua\nprint(\"Привіт від будівельника!\")\nprint(\"Мій двір готовий до магії\")\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Додати 4-й print з назвою біому. Скрін Output."
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
  "summary": "**4.1 — Output, Script and print** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Output, Script and print",
    "difficulty": "intermediate",
    "description": "### Task\n`Script` у `ServerScriptService` з іменем `HelloStudio`, який друкує імʼя учня в Output.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж: 3 різні print підряд"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Output потрібен щоб…",
        "options": [
          "Бачити повідомлення й помилки скриптів",
          "Малювати terrain",
          "Крутити Lighting",
          "Купувати одяг"
        ],
        "correctAnswer": 0,
        "explanation": "Бачити повідомлення й помилки скриптів"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`print` у Lua…",
        "options": [
          "Виводить текст у Output",
          "Видаляє House",
          "Створює вікно Negate",
          "Зберігає Place автоматично завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Виводить текст у Output"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Script у ServerScriptService виконується…",
        "options": [
          "На сервері (у типовому навчальному Play)",
          "Лише на телефоні гравця завжди без винятку",
          "Лише в Blender",
          "Лише офлайн без Studio"
        ],
        "correctAnswer": 0,
        "explanation": "На сервері (у типовому навчальному Play)"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Червоний текст у Output часто означає…",
        "options": [
          "Помилку в коді",
          "Що все ідеально завжди",
          "Безкоштовні Robux",
          "Новий Material"
        ],
        "correctAnswer": 0,
        "explanation": "Помилку в коді"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Навіщо навмисно ламати дужку на уроці?",
        "options": [
          "Навчитись читати помилку і чинити",
          "Знищити курс",
          "Видалити акаунт",
          "Вимкнути Snap"
        ],
        "correctAnswer": 0,
        "explanation": "Навчитись читати помилку і чинити"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Артефакт 4.1?",
        "options": [
          "HelloStudio з print",
          "Повний Tycoon",
          "DataStore гра",
          "Анімація NPC"
        ],
        "correctAnswer": 0,
        "explanation": "HelloStudio з print"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чи М4 одразу вимагає знати всі типи даних?",
        "options": [
          "Ні — спочатку шаблони й параметри",
          "Так, увесь Lua за 10 хв",
          "Так, лише таблиці",
          "Так, лише OOP"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — спочатку шаблони й параметри"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Імʼя скрипта `HelloStudio` потрібне щоб…",
        "options": [
          "Легко знайти в Explorer",
          "Інакше print не працює фізично ніколи",
          "Інакше немає камери",
          "Інакше немає Path"
        ],
        "correctAnswer": 0,
        "explanation": "Легко знайти в Explorer"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Play Mode для перевірки скрипта…",
        "options": [
          "Потрібен (або Run — за домовленістю викладача)",
          "Заборонений",
          "Видаляє код",
          "Замінює Save"
        ],
        "correctAnswer": 0,
        "explanation": "Потрібен (або Run — за домовленістю викладача)"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Kill brick на готовому шаблоні",
          "Blender face",
          "НМТ історія",
          "Повний MMO"
        ],
        "correctAnswer": 0,
        "explanation": "Kill brick на готовому шаблоні"
      }
    ]
  }
}

export const enLesson42 = {
  "lessonId": "lesson-roblox-4-2",
  "moduleId": "module-04",
  "order": 2,
  "title": "4.2 — Kill brick (ready Touched)",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "вставити готовий скрипт смерті на Part; змінити повідомлення / зрозуміти Touched.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** вставити готовий скрипт смерті на Part; змінити повідомлення / зрозуміти Touched.\n\nCourse phase: **Sparks & Ready Code**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Part `KillBrick` на доріжці (збоку або пастка). Гравець торкається → Reset/смерть (Humanoid.Health = 0)."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M4_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Шаблон (всередині KillBrick → Script)\n\n```lua\nlocal brick = script.Parent\n\nbrick.Touched:Connect(function(hit)\n\tlocal character = hit.Parent\n\tlocal humanoid = character:FindFirstChild(\"Humanoid\")\n\tif humanoid then\n\t\thumanoid.Health = 0\n\tend\nend)\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Третя пастка. Імена `Kill_01`… у Folder `Hazards`."
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
  "summary": "**4.2 — Kill brick (ready Touched)** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Kill brick (ready Touched)",
    "difficulty": "intermediate",
    "description": "### Task\nPart `KillBrick` на доріжці (збоку або пастка). Гравець торкається → Reset/смерть (Humanoid.Health = 0).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж: пройти Path не наступивши (рівень-пастка)"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`Touched` спрацьовує коли…",
        "options": [
          "Щось торкається Part",
          "Натискають Publish",
          "Міняють Sky",
          "Відкривають Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Щось торкається Part"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`script.Parent` у скрипті всередині Part — це…",
        "options": [
          "Цей самий Part",
          "Завжди Lighting",
          "Завжди гравець",
          "Завжди Terrain"
        ],
        "correctAnswer": 0,
        "explanation": "Цей самий Part"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`Humanoid` потрібен щоб…",
        "options": [
          "Керувати здоровʼям/станом персонажа",
          "Малювати Decal",
          "Робіти Union",
          "Крутити Snap"
        ],
        "correctAnswer": 0,
        "explanation": "Керувати здоровʼям/станом персонажа"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "`if humanoid then` захищає від…",
        "options": [
          "Смерті коли торкнулись не персонажа (інший Part)",
          "Збереження Place",
          "Наявності камери",
          "Наявності Path"
        ],
        "correctAnswer": 0,
        "explanation": "Смерті коли торкнулись не персонажа (інший Part)"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Робочий KillBrick",
          "Повний магазин GUI",
          "DataStore",
          "Raycast снайпер"
        ],
        "correctAnswer": 0,
        "explanation": "Робочий KillBrick"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Чому пастки в Folder `Hazards`?",
        "options": [
          "Порядок у Explorer",
          "Інакше Touched не працює",
          "Інакше немає Output",
          "Інакше немає Print"
        ],
        "correctAnswer": 0,
        "explanation": "Порядок у Explorer"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Якщо скрипт лежить не в Part, а «в повітрі» без Parent…",
        "options": [
          "Шаблон очікує Parent-Part — треба покласти правильно",
          "Завжди краще",
          "Автоматично стає Sky",
          "Дає Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Шаблон очікує Parent-Part — треба покласти правильно"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Зміна лише кольору KillBrick…",
        "options": [
          "Дозволена і бажана на М4",
          "Ламає Roblox назавжди",
          "Видаляє акаунт",
          "Заборонена політикою Studio"
        ],
        "correctAnswer": 0,
        "explanation": "Дозволена і бажана на М4"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "`Health = 0` означає…",
        "options": [
          "Персонаж гине",
          "Персонаж літає",
          "Part стає Model",
          "Terrain зникає"
        ],
        "correctAnswer": 0,
        "explanation": "Персонаж гине"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Checkpoint шаблоном",
          "Тільки Lighting",
          "Тільки Negate",
          "Тільки відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Checkpoint шаблоном"
      }
    ]
  }
}

export const enLesson43 = {
  "lessonId": "lesson-roblox-4-3",
  "moduleId": "module-04",
  "order": 3,
  "title": "4.3 — Checkpoint",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "готовий чекпоінт змінює Spawn / точку відродження (шаблон викладача під рівень групи).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** готовий чекпоінт змінює Spawn / точку відродження (шаблон викладача під рівень групи).\n\nCourse phase: **Sparks & Ready Code**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Part `Checkpoint_1` на середині Path: після дотику смерть на KillBrick повертає сюди (або оновлює SpawnLocation — за обраним шаблоном школи)."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M4_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\n-- ШАБЛОН: Checkpoint оновлює SpawnLocation\nlocal checkpoint = script.Parent\nlocal spawn = workspace:FindFirstChild(\"SpawnLocation\")\n\ncheckpoint.Touched:Connect(function(hit)\n\tlocal character = hit.Parent\n\tlocal player = game.Players:GetPlayerFromCharacter(character)\n\tif player and spawn then\n\t\tspawn.CFrame = checkpoint.CFrame + Vector3.new(0, 3, 0)\n\t\tprint(player.Name .. \" досяг чекпоінта!\")\n\tend\nend)\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Третій чекпоінт біля дверей будинку."
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
  "summary": "**4.3 — Checkpoint** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Checkpoint",
    "difficulty": "intermediate",
    "description": "### Task\nPart `Checkpoint_1` на середині Path: після дотику смерть на KillBrick повертає сюди (або оновлює SpawnLocation — за обраним шаблоном школи).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж: пройти маршрут Kill→Checkpoint логікою"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Checkpoint потрібен щоб…",
        "options": [
          "Зберігати прогрес позиції на рівні",
          "Малювати Sky",
          "Робити Union",
          "Купувати Plugin"
        ],
        "correctAnswer": 0,
        "explanation": "Зберігати прогрес позиції на рівні"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`GetPlayerFromCharacter` допомагає…",
        "options": [
          "Зрозуміти який гравець торкнувся",
          "Змінити Material terrain",
          "Видалити Lighting",
          "Зробити Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Зрозуміти який гравець торкнувся"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Навіщо `if player and spawn then`?",
        "options": [
          "Не виконувати код якщо когось немає",
          "Щоб завжди була помилка",
          "Щоб видалити Path",
          "Щоб вимкнути Output"
        ],
        "correctAnswer": 0,
        "explanation": "Не виконувати код якщо когось немає"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Робочі чекпоінти на Path",
          "Повний RPG прокачка",
          "Система ребіртів Tycoon",
          "Blender персонаж"
        ],
        "correctAnswer": 0,
        "explanation": "Робочі чекпоінти на Path"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Після checkpoint смерть на KillBrick має…",
        "options": [
          "Повертати ближче до прогресу",
          "Видаляти будинок",
          "Вимикати звук назавжди",
          "Ламати Explorer"
        ],
        "correctAnswer": 0,
        "explanation": "Повертати ближче до прогресу"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Зміна тексту в `print`…",
        "options": [
          "Безпечний спосіб кастомізації на М4",
          "Ламає фізику світу завжди",
          "Видаляє Spawn",
          "Заборонена"
        ],
        "correctAnswer": 0,
        "explanation": "Безпечний спосіб кастомізації на М4"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Скрипт чекпоінта кладемо…",
        "options": [
          "За шаблоном — зазвичай у Part Checkpoint",
          "У випадковий Part на іншій карті",
          "У файл Word",
          "У Discord тільки"
        ],
        "correctAnswer": 0,
        "explanation": "За шаблоном — зазвичай у Part Checkpoint"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Два чекпоінти потрібні щоб…",
        "options": [
          "Тренувати довщий маршрут",
          "Замінити Foundation",
          "Видалити KillBrick",
          "Вимкнути Play"
        ],
        "correctAnswer": 0,
        "explanation": "Тренувати довщий маршрут"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Якщо після смерті знову на старті…",
        "options": [
          "Перевірити чи спрацював Touched і чи знайдено SpawnLocation",
          "Купити Robux",
          "Видалити акаунт",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Перевірити чи спрацював Touched і чи знайдено SpawnLocation"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Монета + leaderstats шаблон",
          "Тільки Decal",
          "Тільки Atmosphere",
          "Тільки відео"
        ],
        "correctAnswer": 0,
        "explanation": "Монета + leaderstats шаблон"
      }
    ]
  }
}

export const enLesson44 = {
  "lessonId": "lesson-roblox-4-4",
  "moduleId": "module-04",
  "order": 4,
  "title": "4.4 — Coins and leaderstats",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зібрати монету; побачити рахунок у списку гравців (leaderstats).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** зібрати монету; побачити рахунок у списку гравців (leaderstats).\n\nCourse phase: **Sparks & Ready Code**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "`Coin` Part + скрипт: +1 до `Coins`, монета зникає (`:Destroy()`). У `ServerScriptService` — шаблон створення leaderstats."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M4_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Шаблон leaderstats (SSS)\n\n```lua\ngame.Players.PlayerAdded:Connect(function(player)\n\tlocal leaderstats = Instance.new(\"Folder\")\n\tleaderstats.Name = \"leaderstats\"\n\tleaderstats.Parent = player\n\n\tlocal coins = Instance.new(\"IntValue\")\n\tcoins.Name = \"Coins\"\n\tcoins.Value = 0\n\tcoins.Parent = leaderstats\nend)\n```\n\n### Шаблон монети (у Part Coin)\n\n```lua\nlocal coin = script.Parent\nlocal DEBOUNCE = false\n\ncoin.Touched:Connect(function(hit)\n\tlocal character = hit.Parent\n\tlocal player = game.Players:GetPlayerFromCharacter(character)\n\tif player and not DEBOUNCE then\n\t\tDEBOUNCE = true\n\t\tlocal coins = player:FindFirstChild(\"leaderstats\")\n\t\t\tand player.leaderstats:FindFirstChild(\"Coins\")\n\t\tif coins then\n\t\t\tcoins.Value = coins.Value + 1\n\t\tend\n\t\tcoin:Destroy()\n\tend\nend)\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Ще 3 монети біля будинку. Folder `Coins`."
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
  "summary": "**4.4 — Coins and leaderstats** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Coins and leaderstats",
    "difficulty": "intermediate",
    "description": "### Task\n`Coin` Part + скрипт: +1 до `Coins`, монета зникає (`:Destroy()`). У `ServerScriptService` — шаблон створення leaderstats.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "`leaderstats` у Roblox часто показує…",
        "options": [
          "Рахунок гравця в списку",
          "Небо",
          "Union",
          "Terrain матеріал"
        ],
        "correctAnswer": 0,
        "explanation": "Рахунок гравця в списку"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`IntValue` зберігає…",
        "options": [
          "Ціле число",
          "Модель будинку",
          "Звук Looped",
          "Sky текстуру"
        ],
        "correctAnswer": 0,
        "explanation": "Ціле число"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`PlayerAdded` реагує на…",
        "options": [
          "Вхід гравця в гру/сесію",
          "Клік по Decal",
          "Зміну Snap",
          "Rotate паркану"
        ],
        "correctAnswer": 0,
        "explanation": "Вхід гравця в гру/сесію"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "`Destroy()` з монетою…",
        "options": [
          "Прибирає монету зі світу",
          "Видаляє весь Place",
          "Видаляє акаунт",
          "Вимикає інтернет"
        ],
        "correctAnswer": 0,
        "explanation": "Прибирає монету зі світу"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "`DEBOUNCE` у шаблоні допомагає…",
        "options": [
          "Не нарахувати багато разів за одне торкання",
          "Зробити Part більшим",
          "Увімкнути Lighting",
          "Зробити Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Не нарахувати багато разів за одне торкання"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Зміна `+ 1` на `+ 5` — це…",
        "options": [
          "Кастомізація параметра",
          "Нова мова програмування",
          "Видалення leaderstats",
          "Помилка завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Кастомізація параметра"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Монети + Coins у leaderstats",
          "Повний шутер",
          "Blender",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Монети + Coins у leaderstats"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Якщо Coins не зʼявляються в списку…",
        "options": [
          "Перевірити скрипт leaderstats у SSS і Play з початку",
          "Купити Robux",
          "Видалити House",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Перевірити скрипт leaderstats у SSS і Play з початку"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Монети складаємо в Folder щоб…",
        "options": [
          "Тримати порядок",
          "Інакше IntValue не існує",
          "Інакше немає камери",
          "Інакше немає Output"
        ],
        "correctAnswer": 0,
        "explanation": "Тримати порядок"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Двері на ClickDetector",
          "Тільки Sky",
          "Тільки Atmosphere",
          "Тільки відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Двері на ClickDetector"
      }
    ]
  }
}

export const enLesson45 = {
  "lessonId": "lesson-roblox-4-5",
  "moduleId": "module-04",
  "order": 5,
  "title": "4.5 — Doors with ClickDetector",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "клікнути на двері → відкрити/зсунути Part (готовий шаблон).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** клікнути на двері → відкрити/зсунути Part (готовий шаблон).\n\nCourse phase: **Sparks & Ready Code**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "`GateDoor` з ClickDetector: після кліка двері зʼїжджають / роблять CanCollide false + Transparency (обрати 1 простий шаблон і не міняти на уроці)."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M4_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Шаблон (зсув по осі)\n\n```lua\nlocal door = script.Parent\nlocal click = door:FindFirstChild(\"ClickDetector\")\nlocal open = false\n\nif not click then\n\tclick = Instance.new(\"ClickDetector\")\n\tclick.Parent = door\nend\n\nclick.MouseClick:Connect(function(player)\n\tif open then return end\n\topen = true\n\tdoor.Position = door.Position + Vector3.new(0, 0, 4)\n\tprint(player.Name .. \" відкрив двері!\")\nend)\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Підпис `print` українською з імʼям гравця залишити. Скрін Output після кліку."
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
  "summary": "**4.5 — Doors with ClickDetector** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Doors with ClickDetector",
    "difficulty": "intermediate",
    "description": "### Task\n`GateDoor` з ClickDetector: після кліка двері зʼїжджають / роблять CanCollide false + Transparency (обрати 1 простий шаблон і не міняти на уроці).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж: відкрити й зайти в будинок"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "ClickDetector потрібен щоб…",
        "options": [
          "Реагувати на клік миші по обʼєкту",
          "Малювати terrain",
          "Робити Union",
          "Міняти Sky автоматично"
        ],
        "correctAnswer": 0,
        "explanation": "Реагувати на клік миші по обʼєкту"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`MouseClick` — це…",
        "options": [
          "Подія кліку",
          "Тип Material",
          "Папка Storage",
          "Інструмент Rotate"
        ],
        "correctAnswer": 0,
        "explanation": "Подія кліку"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Змінна `open` у шаблоні…",
        "options": [
          "Не дає відкривати двері нескінченно одним кліком знову й знову без логіки",
          "Видаляє Path",
          "Вимикає Sound",
          "Створює Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Не дає відкривати двері нескінченно одним кліком знову й знову без логіки"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "`Vector3.new(0,0,4)` змінює…",
        "options": [
          "Зсув у просторі",
          "Імʼя гравця",
          "Мову Studio",
          "Ціну Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Зсув у просторі"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Двері що відкриваються кліком",
          "Повний DataStore сейв",
          "AI NPC бос",
          "Кіберспорт ліга"
        ],
        "correctAnswer": 0,
        "explanation": "Двері що відкриваються кліком"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Якщо клік не працює…",
        "options": [
          "Перевірити наявність ClickDetector і чи Part клікабельний",
          "Видалити акаунт",
          "Купити Plugin обовʼязково",
          "Вимкнути компʼютер"
        ],
        "correctAnswer": 0,
        "explanation": "Перевірити наявність ClickDetector і чи Part клікабельний"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чи обовʼязково розуміти кожен рядок на 100% уже зараз?",
        "options": [
          "Ні — головне змінити параметр і пояснити ідею",
          "Так, інакше курс стоп",
          "Так, лише Assembly",
          "Так, лише C++"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — головне змінити параметр і пояснити ідею"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Двері повʼязані з будинком М2 бо…",
        "options": [
          "Механіка сідає на вже зроблену геометрію",
          "Будинок треба видалити",
          "Negate заборонений",
          "Path більше не потрібен"
        ],
        "correctAnswer": 0,
        "explanation": "Механіка сідає на вже зроблену геометрію"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "`Instance.new(\"ClickDetector\")` у шаблоні…",
        "options": [
          "Створює детектор якщо його ще немає",
          "Створює нову гру",
          "Видаляє Place",
          "Малює Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Створює детектор якщо його ще немає"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Телепорт шаблоном",
          "Тільки Decal урок",
          "Тільки паркан",
          "Тільки математика"
        ],
        "correctAnswer": 0,
        "explanation": "Телепорт шаблоном"
      }
    ]
  }
}

export const enLesson46 = {
  "lessonId": "lesson-roblox-4-6",
  "moduleId": "module-04",
  "order": 6,
  "title": "4.6 — Teleport",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "стати на Part → перенестись до маркера `TeleportTarget`.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** стати на Part → перенестись до маркера `TeleportTarget`.\n\nCourse phase: **Sparks & Ready Code**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "`Teleporter` + невидимий/видимий `TeleportTarget` біля даху/двору/маяка біому."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M4_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Шаблон\n\n```lua\nlocal pad = script.Parent\nlocal target = workspace:FindFirstChild(\"TeleportTarget\")\n\npad.Touched:Connect(function(hit)\n\tlocal character = hit.Parent\n\tlocal root = character:FindFirstChild(\"HumanoidRootPart\")\n\tif root and target then\n\t\troot.CFrame = target.CFrame + Vector3.new(0, 3, 0)\n\tend\nend)\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Підписати pads Decal або кольором «IN/OUT»."
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
  "summary": "**4.6 — Teleport** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Teleport",
    "difficulty": "intermediate",
    "description": "### Task\n`Teleporter` + невидимий/видимий `TeleportTarget` біля даху/двору/маяка біому.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж: маршрут монета→телепорт→будинок за час"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Телепорт у шаблоні змінює…",
        "options": [
          "CFrame персонажа до цілі",
          "Material неба назавжди випадково",
          "Версію Windows",
          "Ціну телефону"
        ],
        "correctAnswer": 0,
        "explanation": "CFrame персонажа до цілі"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`HumanoidRootPart` — це…",
        "options": [
          "Центральна Part персонажа для позиції",
          "Назва Sound",
          "Тип Union",
          "Folder Coins"
        ],
        "correctAnswer": 0,
        "explanation": "Центральна Part персонажа для позиції"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`TeleportTarget` має…",
        "options": [
          "Існувати в Workspace з точним імʼям",
          "Жити лише в Discord",
          "Бути без імені завжди",
          "Бути в Blender"
        ],
        "correctAnswer": 0,
        "explanation": "Існувати в Workspace з точним імʼям"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "`+ Vector3.new(0,3,0)` щоб…",
        "options": [
          "Не застрягти в підлозі",
          "Видалити House",
          "Вимкнути Ambient",
          "Зробити Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Не застрягти в підлозі"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Робочий телепорт туди-назад",
          "Повний симулятор ребіртів",
          "ModuleScript AI",
          "Відео 20 хв"
        ],
        "correctAnswer": 0,
        "explanation": "Робочий телепорт туди-назад"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Два телепорти з різними target…",
        "options": [
          "Ок, якщо імена не плутаються",
          "Заборонено в Roblox",
          "Ламають Snap",
          "Видаляють leaderstats"
        ],
        "correctAnswer": 0,
        "explanation": "Ок, якщо імена не плутаються"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Якщо телепорт не працює…",
        "options": [
          "Перевірити імена FindFirstChild і чи є RootPart",
          "Купити Robux",
          "Видалити акаунт",
          "Змінити біом словами без Studio"
        ],
        "correctAnswer": 0,
        "explanation": "Перевірити імена FindFirstChild і чи є RootPart"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Колір pad допомагає…",
        "options": [
          "Гравець зрозумів «сюди стань»",
          "Замінити скрипт повністю",
          "Видалити Output",
          "Вимкнути Play"
        ],
        "correctAnswer": 0,
        "explanation": "Гравець зрозумів «сюди стань»"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "М4 телепорт — це вже повний TeleportService між places?",
        "options": [
          "Ні — локальний перенос на карті",
          "Так обовʼязково",
          "Так і в інші ігри Roblox одразу",
          "Так тільки в Python"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — локальний перенос на карті"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "«Лава» що зникає (Tween або простий таймер-шаблон)",
          "Тільки PrimaryPart теорія",
          "Тільки Folder теорія",
          "Тільки НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "«Лава» що зникає (Tween або простий таймер-шаблон)"
      }
    ]
  }
}

export const enLesson47 = {
  "lessonId": "lesson-roblox-4-7",
  "moduleId": "module-04",
  "order": 7,
  "title": "4.7 — Fading platform",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "стати на Part → через N секунд Part зникає/падає (шаблон на `task.wait` + Destroy або Transparency/CanCollide).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** стати на Part → через N секунд Part зникає/падає (шаблон на `task.wait` + Destroy або Transparency/CanCollide).\n\nCourse phase: **Sparks & Ready Code**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "`FadePlatform` на Path: встигни пройти."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M4_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Шаблон (простий, без TweenService — стабільніше для М4)\n\n```lua\nlocal platform = script.Parent\nlocal busy = false\n\nplatform.Touched:Connect(function(hit)\n\tlocal character = hit.Parent\n\tif not character:FindFirstChild(\"Humanoid\") then return end\n\tif busy then return end\n\tbusy = true\n\ttask.wait(1.5)\n\tplatform.CanCollide = false\n\tplatform.Transparency = 1\n\ttask.wait(3)\n\tplatform.CanCollide = true\n\tplatform.Transparency = 0\n\tbusy = false\nend)\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Підписати платформи числами часу (Decal або імʼя `Fade_1s`)."
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
  "summary": "**4.7 — Fading platform** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Fading platform",
    "difficulty": "intermediate",
    "description": "### Task\n`FadePlatform` на Path: встигни пройти.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Work in the Place copy from your teacher."
    ],
    "optionalChallenge": "Челендж-паркour 30 сек"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`task.wait(1.5)` робить…",
        "options": [
          "Паузу ≈1.5 сек у скрипті",
          "Видалення акаунта",
          "Створення Sky",
          "Union автоматично"
        ],
        "correctAnswer": 0,
        "explanation": "Паузу ≈1.5 сек у скрипті"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Спочатку `CanCollide = false` щоб…",
        "options": [
          "Гравець провалився",
          "Part став Model",
          "Звук став гучнішим",
          "Path видалився"
        ],
        "correctAnswer": 0,
        "explanation": "Гравець провалився"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Повернення Transparency = 0…",
        "options": [
          "Платформа знову видима",
          "Видаляє Coins",
          "Вимикає Spawn",
          "Ламає Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Платформа знову видима"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Прапорець `busy` потрібен щоб…",
        "options": [
          "Не запустити сотні таймерів від спаму Touched",
          "Змінити біом",
          "Зробити PrimaryPart",
          "Відкрити Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Не запустити сотні таймерів від спаму Touched"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Зникаючі платформи з різним таймінгом",
          "Повний Tycoon",
          "RPG діалоги",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Зникаючі платформи з різним таймінгом"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Зміна `1.5` на `0.5` зробить платформу…",
        "options": [
          "Підступнішою (швидше зникає)",
          "Вічною завжди",
          "Невидимою назавжди без повернення обовʼязково",
          "Музичною"
        ],
        "correctAnswer": 0,
        "explanation": "Підступнішою (швидше зникає)"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чи це вже повний інженерний Tween-курс?",
        "options": [
          "Ні — простий шаблон таймера",
          "Так",
          "Так і Blender",
          "Так і C#"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — простий шаблон таймера"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Паркур з Kill + Fade + Checkpoint…",
        "options": [
          "Комбінує іскри М4",
          "Заборонений",
          "Видаляє leaderstats",
          "Потребує DataStore обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "Комбінує іскри М4"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Якщо платформа не відновлюється…",
        "options": [
          "Перевірити другий task.wait і скидання busy",
          "Купити Robux",
          "Видалити Place",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Перевірити другий task.wait і скидання busy"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Звук зони кодом або GUI-меню шаблон",
          "Тільки паркан",
          "Тільки Folder теорія без практики",
          "НМТ географія"
        ],
        "correctAnswer": 0,
        "explanation": "Звук зони кодом або GUI-меню шаблон"
      }
    ]
  }
}

export const enLesson48 = {
  "lessonId": "lesson-roblox-4-8",
  "moduleId": "module-04",
  "order": 8,
  "title": "4.8 — Simple ScreenGui menu",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "вставити готове GUI: кнопка «Почати» ховає меню (LocalScript шаблон).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** вставити готове GUI: кнопка «Почати» ховає меню (LocalScript шаблон).\n\nCourse phase: **Sparks & Ready Code**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "`StarterGui` → `ScreenGui` `StartMenu` з TextLabel + TextButton. Клік → `StartMenu.Enabled = false`."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M4_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Шаблон LocalScript у кнопці\n\n```lua\nlocal button = script.Parent\nlocal menu = button.Parent\n\nbutton.MouseButton1Click:Connect(function()\n\tmenu.Enabled = false\nend)\n```"
      },
      {
        "title": "Before the quiz",
        "content": "- [ ] Place saved\n- [ ] Lesson result is ready\n- [ ] No random Part1/Part2 clutter in the key area\n- [ ] I can say today’s goal in one sentence"
      },
      {
        "title": "Homework",
        "content": "Підзаголовок з назвою біому в TextLabel."
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
  "summary": "**4.8 — Simple ScreenGui menu** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Simple ScreenGui menu",
    "difficulty": "intermediate",
    "description": "### Task\n`StarterGui` → `ScreenGui` `StartMenu` з TextLabel + TextButton. Клік → `StartMenu.Enabled = false`.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "ScreenGui показує…",
        "options": [
          "Інтерфейс на екрані",
          "Terrain під землею",
          "Union у Storage",
          "Небо лише в Blender"
        ],
        "correctAnswer": 0,
        "explanation": "Інтерфейс на екрані"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "LocalScript часто ставлять у UI бо…",
        "options": [
          "UI працює на клієнті гравця",
          "LocalScript малює гори",
          "LocalScript робить Negate",
          "LocalScript зберігає DataStore сам"
        ],
        "correctAnswer": 0,
        "explanation": "UI працює на клієнті гравця"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`MouseButton1Click` — це…",
        "options": [
          "Клік лівою кнопкою по GUI кнопці",
          "Смерть гравця",
          "Зміна Snap",
          "Створення Part"
        ],
        "correctAnswer": 0,
        "explanation": "Клік лівою кнопкою по GUI кнопці"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "`menu.Enabled = false`…",
        "options": [
          "Ховає меню",
          "Видаляє Place",
          "Вимикає компʼютер",
          "Робіть Union"
        ],
        "correctAnswer": 0,
        "explanation": "Ховає меню"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Стартове меню з кнопкою",
          "Повний магазин з DataStore",
          "PvP killfeed",
          "Blender анімація"
        ],
        "correctAnswer": 0,
        "explanation": "Стартове меню з кнопкою"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "TextLabel потрібен щоб…",
        "options": [
          "Показати заголовок/текст",
          "Зробити KillBrick",
          "Зробити Checkpoint",
          "Зробити Terrain воду"
        ],
        "correctAnswer": 0,
        "explanation": "Показати заголовок/текст"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чи це вже повний курс UI верстки?",
        "options": [
          "Ні — тільки іскровий старт",
          "Так, увесь UX курс",
          "Так, і Photoshop",
          "Так, і Figma обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — тільки іскровий старт"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Якщо кнопка не реагує…",
        "options": [
          "Перевірити LocalScript місце і Active/Visible ієрархію",
          "Видалити House",
          "Купити Robux",
          "Змінити біом словами"
        ],
        "correctAnswer": 0,
        "explanation": "Перевірити LocalScript місце і Active/Visible ієрархію"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Різниця Script vs LocalScript на М4…",
        "options": [
          "Пояснюємо практично: світ vs екран",
          "Не згадуємо ніколи",
          "Вимагаємо есе на 5 сторінок",
          "Вимагаємо C++"
        ],
        "correctAnswer": 0,
        "explanation": "Пояснюємо практично: світ vs екран"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Збираємо всі іскри в один маршрут",
          "Видаляємо всі скрипти",
          "Починаємо М1 знову",
          "Лише теорія без Play"
        ],
        "correctAnswer": 0,
        "explanation": "Збираємо всі іскри в один маршрут"
      }
    ]
  }
}

export const enLesson49 = {
  "lessonId": "lesson-roblox-4-9",
  "moduleId": "module-04",
  "order": 9,
  "title": "4.9 — Build: Spark yard",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зібрати маршрут з мінімум 5 механік М4 у цілісний playable loop.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** зібрати маршрут з мінімум 5 механік М4 у цілісний playable loop.\n\nCourse phase: **Sparks & Ready Code**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Build a **visible result** in your Place and Save to Roblox."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M4_YourName`  \n3. Do all lesson steps in that Place"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Practice steps",
        "content": "KillBrick · Checkpoint · Coins · Door Click · Teleport · FadePlatform · StartMenu"
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
  "summary": "**4.9 — Build: Spark yard** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Build: Spark yard",
    "difficulty": "intermediate",
    "description": "### Task\nComplete the steps for “Build: Spark yard” in your Place.\n\n\n### Steps\nKillBrick · Checkpoint · Coins · Door Click · Teleport · FadePlatform · StartMenu\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Іскровий двір — це…",
        "options": [
          "Світ М1–М3 + кілька готових механік",
          "Повний AAA онлайн на 1 млн гравців",
          "Лише Baseplate без нічого",
          "Лише PDF теорія"
        ],
        "correctAnswer": 0,
        "explanation": "Світ М1–М3 + кілька готових механік"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Парний playtest допомагає…",
        "options": [
          "Побачити баги очима іншого",
          "Видалити Output",
          "Вимкнути Explorer",
          "Замінити Save"
        ],
        "correctAnswer": 0,
        "explanation": "Побачити баги очима іншого"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Мінімум механік на здачу маршруту…",
        "options": [
          "5 з списку іскор",
          "0",
          "100 обовʼязково унікальних мов",
          "Тільки Sky"
        ],
        "correctAnswer": 0,
        "explanation": "5 з списку іскор"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Якщо меню блокує все і не зникає…",
        "options": [
          "Фіксимо кнопку LocalScript",
          "Видаляємо будинок",
          "Ігноруємо назавжди",
          "Купуємо новий ПК обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "Фіксимо кнопку LocalScript"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Checkpoint + Kill разом дають…",
        "options": [
          "Чесний parkour loop",
          "DataStore",
          "Negate вікно",
          "Atmosphere"
        ],
        "correctAnswer": 0,
        "explanation": "Чесний parkour loop"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Coins на маршруті…",
        "options": [
          "Мотивують досліджувати",
          "Ламають камеру завжди",
          "Видаляють Path",
          "Замінюють Spawn обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "Мотивують досліджувати"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Телепорт варто ставити…",
        "options": [
          "З розумінням куди веде гравця",
          "У випадкову чорну діру під картою завжди",
          "У ServerStorage тільки",
          "У Lighting"
        ],
        "correctAnswer": 0,
        "explanation": "З розумінням куди веде гравця"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Найчастіший баг інтеграції…",
        "options": [
          "Зайві скрипти/дублікати або чужий Parent",
          "Надто гарний Decal",
          "Правильні імена",
          "Чистий Explorer"
        ],
        "correctAnswer": 0,
        "explanation": "Зайві скрипти/дублікати або чужий Parent"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "М4 ще не є…",
        "options": [
          "Повним курсом змінних/if/циклів з нуля",
          "Початком інтересу до коду",
          "Практикою Output",
          "Збіркою механік"
        ],
        "correctAnswer": 0,
        "explanation": "Повним курсом змінних/if/циклів з нуля"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Урок 4.10 — це…",
        "options": [
          "Презентації іскрового двору",
          "Видалення всіх Places",
          "Скасування курсу",
          "Тільки математика"
        ],
        "correctAnswer": 0,
        "explanation": "Презентації іскрового двору"
      }
    ]
  }
}

export const enLesson410 = {
  "lessonId": "lesson-roblox-4-10",
  "moduleId": "module-04",
  "order": 10,
  "title": "4.10 — Presentation: living game",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "показати групі playable двір; отримати фідбек; закрити фазу B.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** показати групі playable двір; отримати фідбек; закрити фазу B.\n\nCourse phase: **Sparks & Ready Code**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Build a **visible result** in your Place and Save to Roblox."
      },
      {
        "title": "Your Place",
        "content": "Use a **copy of the school Place** — don’t start from a blank Baseplate every time.\n\n1. Ask for a Place copy in class  \n2. Save it as `M4_YourName`  \n3. Do all lesson steps in that Place"
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
  "summary": "**4.10 — Presentation: living game** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Presentation: living game",
    "difficulty": "intermediate",
    "description": "### Task\nComplete the steps for “Presentation: living game” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Головний підсумок М4…",
        "options": [
          "Код може оживити вже збудований світ",
          "Моделювання більше не потрібне",
          "Lua вивчено повністю",
          "Roblox — лише чат"
        ],
        "correctAnswer": 0,
        "explanation": "Код може оживити вже збудований світ"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "На М4 ми переважно…",
        "options": [
          "Вставляли шаблони й змінювали параметри",
          "Писали свій компілятор",
          "Вивчали C# Unity",
          "Робили лише теорію без Play"
        ],
        "correctAnswer": 0,
        "explanation": "Вставляли шаблони й змінювали параметри"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Output потрібен і далі бо…",
        "options": [
          "Помилки будуть завжди в навчанні",
          "Output видаляють після М4",
          "Output лише для дорослих",
          "Output замінює Explorer"
        ],
        "correctAnswer": 0,
        "explanation": "Помилки будуть завжди в навчанні"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Пояснити скрипт своїми словами важливо бо…",
        "options": [
          "Це місток до справжнього Lua в М5",
          "Це замінює Save",
          "Це дає Robux",
          "Це видаляє баги магічно"
        ],
        "correctAnswer": 0,
        "explanation": "Це місток до справжнього Lua в М5"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Script vs LocalScript ми розрізняємо як…",
        "options": [
          "Світ/сервер vs UI/клієнт (спростили)",
          "Немає різниці ніколи",
          "LocalScript тільки для Terrain",
          "Script тільки для кнопок UI завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Світ/сервер vs UI/клієнт (спростили)"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Наступний модуль М5 про…",
        "options": [
          "Змінні й типи — серйозний Lua",
          "Тільки Decals",
          "Тільки Sky",
          "Тільки відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Змінні й типи — серйозний Lua"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Якщо на презентації все зламалось…",
        "options": [
          "Спокійно відкрити Output / запасний Place",
          "Кричати й закривати Studio",
          "Видаляти акаунт",
          "Ображати групу"
        ],
        "correctAnswer": 0,
        "explanation": "Спокійно відкрити Output / запасний Place"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Кастомізація `+1` → `+5` / таймерів — це…",
        "options": [
          "Вже програмування параметрами",
          "Не має цінності",
          "Заборона",
          "Лише для вчителя"
        ],
        "correctAnswer": 0,
        "explanation": "Вже програмування параметрами"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Фаза B завершена коли…",
        "options": [
          "Є живий playable двір з іскрами",
          "Є лише порожній Baseplate",
          "Є лише PDF",
          "Є лише акаунт без Place"
        ],
        "correctAnswer": 0,
        "explanation": "Є живий playable двір з іскрами"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Найкраща підготовка до М5…",
        "options": [
          "Не боятись Output і розуміти «скрипт реагує на подію»",
          "Вивчити весь Unicode напамʼять",
          "Видалити всі скрипти М4",
          "Кинути моделювання"
        ],
        "correctAnswer": 0,
        "explanation": "Не боятись Output і розуміти «скрипт реагує на подію»"
      }
    ]
  }
}
