/** Roblox v2 Module 06 EN — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE
void MC

export const enLesson61 = {
  "lessonId": "lesson-roblox-6-1",
  "moduleId": "module-06",
  "order": 1,
  "title": "6.1 — Comparisons and booleans",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "`>`, `<`, `==`, `~=`; результат порівняння в Output.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** `>`, `<`, `==`, `~=`; результат порівняння в Output.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal score = 10\nprint(score > 5)\nprint(score == 10)\nprint(score ~= 0)\n```"
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
  "summary": "**6.1 — Comparisons and booleans** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Comparisons and booleans",
    "difficulty": "intermediate",
    "description": "### Task\nComplete the steps for “Comparisons and booleans” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Старт → демо порівнянь → разом 5 print → самі «картка істини» → челендж вгадати true/false на екрані → тест → ДЗ: 4 порівняння зі своїм score."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`==` перевіряє… **рівність** (a) 2. `~=` означає… **не рівно** (a) 3. `score > 5` дає… **boolean** (a) 4. Одне `=` це… **присвоєння, не порівняння** (a) 5. Артефакт… **print порівнянь** (a) 6. `true` друкується коли… **умова вірна** (a) 7. Навіщо порівняння перед if… **if чекає на умову** (a) 8. `3 == \"3\"` … **не плутати типи (обговорити)** — часто false (a) 9. Чи if вже пишемо повністю… **наступні уроки; база порівнянь зараз** (b за формулюванням: ще ні повний проєкт) — правильна відповідь: **спочатку порівняння, if далі** (a: «ще вчимо базу») 10. Далі… **if then end** (a) *(Повний формат питань як у М1–5 — нижче розгорнуто для LMS)* 1. Оператор `==` потрібен щоб…",
        "options": [
          "Порівняти чи значення рівні",
          "Присвоїти значення",
          "Видалити Part",
          "Зробити Union"
        ],
        "correctAnswer": 0,
        "explanation": "Порівняти чи значення рівні"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`~=` означає…",
        "options": [
          "Не дорівнює",
          "Помножити",
          "Зберегти Place",
          "Відкрити Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Не дорівнює"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Результат `7 > 2`…",
        "options": [
          "true",
          "\"сім\"",
          "Part",
          "nil завжди"
        ],
        "correctAnswer": 0,
        "explanation": "true"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Рядок `score = 10` це…",
        "options": [
          "Присвоєння",
          "Порівняння",
          "Negate",
          "Publish"
        ],
        "correctAnswer": 0,
        "explanation": "Присвоєння"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Надруковані порівняння в Output",
          "Повний Tycoon",
          "Blender",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Надруковані порівняння в Output"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Чому важливе розрізнення `=` і `==`?",
        "options": [
          "Інакше умови працюють неправильно",
          "Roblox видаляє акаунт",
          "Зникає камера",
          "Зникає Path"
        ],
        "correctAnswer": 0,
        "explanation": "Інакше умови працюють неправильно"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Boolean результат умови потрібен для…",
        "options": [
          "if",
          "лише Terrain",
          "лише Decal",
          "лише Ambient"
        ],
        "correctAnswer": 0,
        "explanation": "if"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "`typeof(score > 1)` очікуємо…",
        "options": [
          "boolean",
          "Instance",
          "Sound",
          "Vector3 завжди"
        ],
        "correctAnswer": 0,
        "explanation": "boolean"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Якщо порівняти number і string…",
        "options": [
          "Часто неочікуваний результат — типи важливі",
          "Завжди Robux",
          "Завжди Union",
          "Завжди KillBrick"
        ],
        "correctAnswer": 0,
        "explanation": "Часто неочікуваний результат — типи важливі"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Наступний урок…",
        "options": [
          "if then end",
          "Тільки Sky",
          "Тільки Negate",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "if then end"
      }
    ]
  }
}

export const enLesson62 = {
  "lessonId": "lesson-roblox-6-2",
  "moduleId": "module-06",
  "order": 2,
  "title": "6.2 — if then end",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "перша гілка рішення.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** перша гілка рішення.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Скрипт перевіряє змінну `coins` (або читає leaderstats) і друкує різні повідомлення лише якщо вистачає."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal coins = 15\nif coins >= 10 then\n\tprint(\"Можна відкрити двері!\")\nend\n```"
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
  "summary": "**6.2 — if then end** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: if then end",
    "difficulty": "intermediate",
    "description": "### Task\nСкрипт перевіряє змінну `coins` (або читає leaderstats) і друкує різні повідомлення лише якщо вистачає.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Демо структура if → разом поріг 10 → самі свій поріг і повідомлення → челендж змінити coins і перезапуск → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`if умова then` виконує тіло коли…",
        "options": [
          "Умова істинна",
          "Завжди",
          "Ніколи",
          "Лише вночі"
        ],
        "correctAnswer": 0,
        "explanation": "Умова істинна"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`end` потрібен щоб…",
        "options": [
          "Закрити блок if",
          "Видалити SSS",
          "Зробити Terrain",
          "Купити Plugin"
        ],
        "correctAnswer": 0,
        "explanation": "Закрити блок if"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`>=` означає…",
        "options": [
          "Більше або дорівнює",
          "Negate",
          "Folder",
          "Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Більше або дорівнює"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Якщо умова false…",
        "options": [
          "Тіло if пропускається",
          "Studio крашиться завжди",
          "Видаляється Place",
          "Дається Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Тіло if пропускається"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "if з повідомленням про двері",
          "Повний шутер",
          "DataStore усі сервіси",
          "Blender face"
        ],
        "correctAnswer": 0,
        "explanation": "if з повідомленням про двері"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Читання `player.leaderstats.Coins.Value`…",
        "options": [
          "Дає число для умови (якщо існує)",
          "Малює Decal",
          "Робіть Union",
          "Вимикає Output"
        ],
        "correctAnswer": 0,
        "explanation": "Дає число для умови (якщо існує)"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Відступ у коді…",
        "options": [
          "Для читабельності (у Lua не як у Python обовʼязок)",
          "Видаляє помилки магічно завжди",
          "Замінює end",
          "Замінює if"
        ],
        "correctAnswer": 0,
        "explanation": "Для читабельності (у Lua не як у Python обовʼязок)"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Поріг 10 змінити на 20…",
        "options": [
          "Умова стане жорсткішою",
          "Видалить будинок",
          "Вимкне Snap",
          "Змінить біом без коду"
        ],
        "correctAnswer": 0,
        "explanation": "Умова стане жорсткішою"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "М6 будує на М5 бо…",
        "options": [
          "Умови працюють зі змінними",
          "Змінні скасовані",
          "Parts скасовані",
          "Studio скасоване"
        ],
        "correctAnswer": 0,
        "explanation": "Умови працюють зі змінними"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "else",
          "Тільки Ambient",
          "Тільки паркан",
          "Тільки відео"
        ],
        "correctAnswer": 0,
        "explanation": "else"
      }
    ]
  }
}

export const enLesson63 = {
  "lessonId": "lesson-roblox-6-3",
  "moduleId": "module-06",
  "order": 3,
  "title": "6.3 — else and elseif",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "гілки «інакше» / «інакше якщо».",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** гілки «інакше» / «інакше якщо».\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Трирівневий доступ (повідомленнями поки)."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal coins = 7\nif coins >= 20 then\n\tprint(\"VIP двері\")\nelseif coins >= 10 then\n\tprint(\"Звичайні двері\")\nelse\n\tprint(\"Замало монет\")\nend\n```"
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
  "summary": "**6.3 — else and elseif** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: else and elseif",
    "difficulty": "intermediate",
    "description": "### Task\nТрирівневий доступ (повідомленнями поки).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Демо → разом 3 гілки → самі своя градація → челендж «викладач задає coins — який print?» → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`else` спрацьовує коли…",
        "options": [
          "Жодна попередня умова не true",
          "Завжди разом з if одночасно двічі",
          "Лише при Union",
          "Лише при Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Жодна попередня умова не true"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`elseif` потрібен щоб…",
        "options": [
          "Перевірити наступну умову",
          "Видалити Part",
          "Зробити Terrain",
          "Відкрити Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Перевірити наступну умову"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Порядок умов важливий бо…",
        "options": [
          "Перша true гілка виграє",
          "Lua виконує всі гілки завжди обовʼязково друковано",
          "end не потрібен",
          "if заборонений"
        ],
        "correctAnswer": 0,
        "explanation": "Перша true гілка виграє"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Три рівні повідомлень доступу",
          "Повний MMO",
          "Clipchamp",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Три рівні повідомлень доступу"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Якщо `coins = 25` при порогах 20/10…",
        "options": [
          "Спрацює гілка VIP",
          "Спрацює else",
          "Видалиться скрипт",
          "Зникне Path"
        ],
        "correctAnswer": 0,
        "explanation": "Спрацює гілка VIP"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Якщо `coins = 0`…",
        "options": [
          "else",
          "VIP",
          "Union",
          "Negate"
        ],
        "correctAnswer": 0,
        "explanation": "else"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чи можна 10 elseif?",
        "options": [
          "Технічно так, але краще не ускладнювати на старті",
          "Ніколи не можна в Lua",
          "Тільки в Python",
          "Тільки в CSS"
        ],
        "correctAnswer": 0,
        "explanation": "Технічно так, але краще не ускладнювати на старті"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "else без умови…",
        "options": [
          "Так, else без порівняння",
          "else завжди з ==",
          "else завжди з Vector3",
          "else завжди з Sound"
        ],
        "correctAnswer": 0,
        "explanation": "Так, else без порівняння"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Челендж «викладач називає число» тренує…",
        "options": [
          "Трасування гілок головою",
          "Видалення акаунта",
          "Покупку Robux",
          "Вимкнення Wi-Fi"
        ],
        "correctAnswer": 0,
        "explanation": "Трасування гілок головою"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "if + Touched на зоні",
          "Тільки Decal",
          "Тільки Lighting",
          "Тільки відео"
        ],
        "correctAnswer": 0,
        "explanation": "if + Touched на зоні"
      }
    ]
  }
}

export const enLesson64 = {
  "lessonId": "lesson-roblox-6-4",
  "moduleId": "module-06",
  "order": 4,
  "title": "6.4 — Touched + if: zones",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зона карає/переносить лише якщо торкнувся Humanoid (і опційно якщо імʼя Part зони = …).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** зона карає/переносить лише якщо торкнувся Humanoid (і опційно якщо імʼя Part зони = …).\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "`DangerZone` — якщо гравець (є Humanoid) — Health=0 або телепорт назад + print. ```lua local zone = script.Parent zone.Touched:Connect(function(hit) local character = hit.Parent local humanoid = character:FindFirstChild(\"Humanoid\") if humanoid then humanoid.Health = 0 print(\"Зона покарала гравця\") end end) ``` Ускладнення: друга зона карає лише якщо `coins.Value < 5` (потребує GetPlayerFromCharacter)."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal zone = script.Parent\nzone.Touched:Connect(function(hit)\n\tlocal character = hit.Parent\n\tlocal humanoid = character:FindFirstChild(\"Humanoid\")\n\tif humanoid then\n\t\thumanoid.Health = 0\n\t\tprint(\"Зона покарала гравця\")\n\tend\nend)\n```"
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
  "summary": "**6.4 — Touched + if: zones** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Touched + if: zones",
    "difficulty": "intermediate",
    "description": "### Task\n`DangerZone` — якщо гравець (є Humanoid) — Health=0 або телепорт назад + print. ```lua local zone = script.Parent zone.Touched:Connect(function(hit) local character = hit.Parent local humanoid = character:FindFirstChild(\"Humanoid\") if humanoid then humanoid.Health = 0 print(\"Зона покарала гравця\") end end) ``` Ускладнення: друга зона карає лише якщо `coins.Value < 5` (потребує GetPlayerFromCharacter).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Демо навіщо if humanoid → разом kill-зона → самі «мʼяка зона» тільки print → челендж зона+умова монет → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Без `if humanoid` Touched…",
        "options": [
          "Може спрацьовувати на будь-які Parts",
          "Ніколи не спрацьовує",
          "Видаляє Workspace",
          "Робіть Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Може спрацьовувати на будь-які Parts"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`FindFirstChild(\"Humanoid\")` повертає…",
        "options": [
          "Humanoid або nil",
          "Завжди Sound",
          "Завжди Terrain",
          "Завжди Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Humanoid або nil"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "nil у if вважається…",
        "options": [
          "Хибним (тіло не виконається)",
          "Завжди true",
          "Видаленням Place",
          "Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Хибним (тіло не виконається)"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Зона з умовою на Humanoid",
          "Повний Tycoon rebirth",
          "Blender",
          "Відео 20′"
        ],
        "correctAnswer": 0,
        "explanation": "Зона з умовою на Humanoid"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Умова на монети всередині Touched…",
        "options": [
          "Комбінує подію і рішення",
          "Заборонена в Lua",
          "Видаляє leaderstats",
          "Вимикає Output"
        ],
        "correctAnswer": 0,
        "explanation": "Комбінує подію і рішення"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Це схоже на KillBrick М4 але…",
        "options": [
          "Тепер самі пишемо й пояснюємо if",
          "Забороняємо скрипти",
          "Видаляємо Parts",
          "Працюємо в Word"
        ],
        "correctAnswer": 0,
        "explanation": "Тепер самі пишемо й пояснюємо if"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "hit.Parent часто…",
        "options": [
          "Character модельки",
          "Lighting",
          "SoundService завжди",
          "ServerStorage завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Character модельки"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "print у гілці потрібен щоб…",
        "options": [
          "Бачити що умова спрацювала",
          "Зробити Union",
          "Намалювати Path",
          "Купити Plugin"
        ],
        "correctAnswer": 0,
        "explanation": "Бачити що умова спрацювала"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Друга зона з умовою монет… a) Добре ускладнення для сильніших b) Обовʼязок видалити першу зону с) Замінює М1 d) Замінює Negate **Відповідь: a** 10. Далі…",
        "options": [
          "Двері / VIP логіка проєктом",
          "Тільки Atmosphere",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Двері / VIP логіка проєктом"
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

export const enLesson65 = {
  "lessonId": "lesson-roblox-6-5",
  "moduleId": "module-06",
  "order": 5,
  "title": "6.5 — Flags and ClickDetector",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "`local open = false` керує дверима/вентилем; повторний клік інша гілка.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** `local open = false` керує дверима/вентилем; повторний клік інша гілка.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal door = script.Parent\nlocal click = door:WaitForChild(\"ClickDetector\")\nlocal open = false\n\nclick.MouseClick:Connect(function(player)\n\tif open == false then\n\t\tdoor.Transparency = 0.8\n\t\tdoor.CanCollide = false\n\t\topen = true\n\t\tprint(player.Name, \"відкрив\")\n\telse\n\t\tdoor.Transparency = 0\n\t\tdoor.CanCollide = true\n\t\topen = false\n\t\tprint(player.Name, \"закрив\")\n\tend\nend)\n```"
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
  "summary": "**6.5 — Flags and ClickDetector** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Flags and ClickDetector",
    "difficulty": "intermediate",
    "description": "### Task\nComplete the steps for “Flags and ClickDetector” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Демо прапорець → разом toggle двері → самі другі двері/хвіртка → челендж → тест → ДЗ підготовка пароля (змінна `password`)."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Прапорець `open` зберігає…",
        "options": [
          "Стан дверей",
          "Розмір континенту",
          "Sky texture",
          "Volume обовʼязково 10"
        ],
        "correctAnswer": 0,
        "explanation": "Стан дверей"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Toggle означає…",
        "options": [
          "Перемикач туди-назад",
          "Видалення Place",
          "Negate вікна",
          "Union паркану"
        ],
        "correctAnswer": 0,
        "explanation": "Перемикач туди-назад"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`open == false` еквівалентно ідеї…",
        "options": [
          "«якщо ще зачинено»",
          "«якщо Part = Sky»",
          "«якщо немає Studio»",
          "«якщо немає Wi-Fi»"
        ],
        "correctAnswer": 0,
        "explanation": "«якщо ще зачинено»"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Після відкриття `open = true` щоб…",
        "options": [
          "Наступний клік пішов у else",
          "Видалити ClickDetector",
          "Вимкнути Play",
          "Зробити Terrain"
        ],
        "correctAnswer": 0,
        "explanation": "Наступний клік пішов у else"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Двері відкрити/закрити через if",
          "Повний DataStore",
          "Raycast снайпер",
          "Blender"
        ],
        "correctAnswer": 0,
        "explanation": "Двері відкрити/закрити через if"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "CanCollide false при відкритті…",
        "options": [
          "Дозволяє пройти",
          "Фарбує небо",
          "Робіть Folder",
          "Дає Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Дозволяє пройти"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Без зміни прапорця…",
        "options": [
          "Логіка toggle ламається",
          "Краще завжди",
          "Roblox дає Robux",
          "Path видаляється"
        ],
        "correctAnswer": 0,
        "explanation": "Логіка toggle ламається"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "`WaitForChild`…",
        "options": [
          "Чекає появу дочірнього обʼєкта",
          "Видаляє Parent",
          "Малює Decal",
          "Крутить Lighting"
        ],
        "correctAnswer": 0,
        "explanation": "Чекає появу дочірнього обʼєкта"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "М6 тут зʼєднує…",
        "options": [
          "Подію кліку і гілки рішення",
          "Лише Negate",
          "Лише Ambient",
          "Лише відео"
        ],
        "correctAnswer": 0,
        "explanation": "Подію кліку і гілки рішення"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Фінальний проєкт модуля з паролем/VIP",
          "Скасування if",
          "Тільки PDF",
          "Тільки НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Фінальний проєкт модуля з паролем/VIP"
      }
    ]
  }
}

export const enLesson66 = {
  "lessonId": "lesson-roblox-6-6",
  "moduleId": "module-06",
  "order": 6,
  "title": "6.6 — Project: VIP / password doors",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "клікнути → перевірити пароль у змінній АБО число монет ≥ N → відкрити; інакше print відмова. Презентації.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** клікнути → перевірити пароль у змінній АБО число монет ≥ N → відкрити; інакше print відмова. Презентації.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
  "summary": "**6.6 — Project: VIP / password doors** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Project: VIP / password doors",
    "difficulty": "intermediate",
    "description": "### Task\nComplete the steps for “Project: VIP / password doors” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Проєкт М6 показує…",
        "options": [
          "Рішення гілками в реальній механіці",
          "Що if непотрібний",
          "Що Parts непотрібні",
          "Що Output непотрібний"
        ],
        "correctAnswer": 0,
        "explanation": "Рішення гілками в реальній механіці"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Відмова в else важлива бо…",
        "options": [
          "Гравець розуміє чому не вийшло",
          "Видаляє будинок",
          "Вимикає Snap",
          "Робіть Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Гравець розуміє чому не вийшло"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Перевірка монет — приклад…",
        "options": [
          "if з ігровою економікою",
          "Terrain Editor",
          "Sky only",
          "Decal only"
        ],
        "correctAnswer": 0,
        "explanation": "if з ігровою економікою"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Після М6 логічно вчити…",
        "options": [
          "Цикли",
          "Лише Atmosphere",
          "Лише паркан",
          "Лише відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Цикли"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Прапорці + elseif можуть комбінуватись…",
        "options": [
          "Так у складніших дверях",
          "Ніколи",
          "Тільки в Java",
          "Тільки в HTML"
        ],
        "correctAnswer": 0,
        "explanation": "Так у складніших дверях"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Без humanoid/player перевірок…",
        "options": [
          "Більше випадкових спрацювань",
          "Завжди ідеально",
          "Автоматичний DataStore",
          "Автоматичний Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Більше випадкових спрацювань"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чи М6 завершує весь Lua?",
        "options": [
          "Ні",
          "Так",
          "Так і C#",
          "Так і PHP"
        ],
        "correctAnswer": 0,
        "explanation": "Ні"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Презентація в групі…",
        "options": [
          "Показує працюючі гілки в Play",
          "Замінює Place файлом Word",
          "Видаляє скрипти",
          "Вимикає мікрофон обовʼязково назавжди"
        ],
        "correctAnswer": 0,
        "explanation": "Показує працюючі гілки в Play"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Тізер М7…",
        "options": [
          "Повторювані дії — цикли",
          "Видалення змінних",
          "Скасування Studio",
          "Лише Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Повторювані дії — цикли"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Найкращий доказ здачі М6…",
        "options": [
          "Демо: умова true/false дають різну поведінку",
          "Лише скрін неба",
          "Лише PDF без Place",
          "Лише нік"
        ],
        "correctAnswer": 0,
        "explanation": "Демо: умова true/false дають різну поведінку"
      }
    ]
  }
}
