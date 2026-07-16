/** Roblox v2 Module 07 EN — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE
void MC

export const enLesson71 = {
  "lessonId": "lesson-roblox-7-1",
  "moduleId": "module-07",
  "order": 1,
  "title": "7.1 — Why loops + for",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "повторити print N разів без копіпасту.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** повторити print N разів без копіпасту.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nfor i = 1, 5 do\n\tprint(\"Крок\", i)\nend\n```"
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
  "summary": "**7.1 — Why loops + for** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Why loops + for",
    "difficulty": "intermediate",
    "description": "### Task\nComplete the steps for “Why loops + for” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Аналогія конвеєр → демо for → разом 1..5 → самі 1..10 своє повідомлення → челендж сума чисел змінною → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Цикл потрібен щоб…",
        "options": [
          "Повторити дії багато разів",
          "Видалити Studio",
          "Зробити лише 1 Part руками 100 разів краще завжди",
          "Вимкнути Output"
        ],
        "correctAnswer": 0,
        "explanation": "Повторити дії багато разів"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`for i = 1, 5 do` … `i` це…",
        "options": [
          "Лічильник",
          "Sky",
          "Sound",
          "Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Лічильник"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Тіло циклу між `do` і `end`…",
        "options": [
          "Повторюється",
          "Ніколи не виконується",
          "Видаляє Place",
          "Купує Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Повторюється"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "for з print кроків",
          "Повний Tycoon",
          "Blender",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "for з print кроків"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Без циклу 5 print…",
        "options": [
          "Можна, але цикл коротший і гнучкіший",
          "Неможливо в принципі",
          "Видаляє SSS",
          "Ламає Anchored"
        ],
        "correctAnswer": 0,
        "explanation": "Можна, але цикл коротший і гнучкіший"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "`print(\"Крок\", i)` показує…",
        "options": [
          "Різні номери кроків",
          "Завжди лише 0",
          "Union",
          "Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Різні номери кроків"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Змінна суми в циклі…",
        "options": [
          "Накопичує результат (підготовка)",
          "Заборонена",
          "Видаляє Path",
          "Вимикає Play"
        ],
        "correctAnswer": 0,
        "explanation": "Накопичує результат (підготовка)"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "end у for…",
        "options": [
          "Закриває цикл",
          "Відкриває Terrain",
          "Створює Model завжди",
          "Дає Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Закриває цикл"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Чи це while?",
        "options": [
          "Ні — спочатку for",
          "Так уже повний while курс",
          "Так і UI",
          "Так і HTML"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — спочатку for"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "for з кроком і спавн Parts",
          "Тільки Sky",
          "Тільки Ambient",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "for з кроком і спавн Parts"
      }
    ]
  }
}

export const enLesson72 = {
  "lessonId": "lesson-roblox-7-2",
  "moduleId": "module-07",
  "order": 2,
  "title": "7.2 — for and Part spawn",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "`for i = 1, 10, 2` і створення Part у циклі.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** `for i = 1, 10, 2` і створення Part у циклі.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Ряд з 5–8 блоків «фабрика»."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nfor i = 1, 5 do\n\tlocal p = Instance.new(\"Part\")\n\tp.Size = Vector3.new(2, 1, 2)\n\tp.Position = Vector3.new(i * 3, 5, 0)\n\tp.Anchored = true\n\tp.Name = \"Brick_\" .. i\n\tp.Parent = workspace\nend\n```"
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
  "summary": "**7.2 — for and Part spawn** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: for and Part spawn",
    "difficulty": "intermediate",
    "description": "### Task\nРяд з 5–8 блоків «фабрика».\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Демо Instance.new у циклі → разом ряд → самі свій крок позиції/колір від i → челендж вежа по Y → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`Instance.new(\"Part\")` створює…",
        "options": [
          "Новий Part",
          "Новий акаунт",
          "Новий плагін Photoshop",
          "Новий Discord"
        ],
        "correctAnswer": 0,
        "explanation": "Новий Part"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`p.Parent = workspace`…",
        "options": [
          "Кладе Part у світ",
          "Видаляє Lighting",
          "Вимикає Snap",
          "Робіть Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Кладе Part у світ"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`i * 3` у Position…",
        "options": [
          "Зсуває кожен наступний блок",
          "Видаляє цикл",
          "Дає Badge",
          "Міняє Sky обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "Зсуває кожен наступний блок"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "`\"Brick_\" .. i` це…",
        "options": [
          "Конкатенація імені з номером",
          "Union",
          "Terrain paint",
          "SoundId"
        ],
        "correctAnswer": 0,
        "explanation": "Конкатенація імені з номером"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Anchored = true у спавні…",
        "options": [
          "Щоб блоки не падали",
          "Щоб видалити Humanoid",
          "Щоб вимкнути Output",
          "Щоб відкрити Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб блоки не падали"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Ряд/вежа блоків з for",
          "Повний шутер",
          "DataStore усі ігри",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Ряд/вежа блоків з for"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Занадто великий N…",
        "options": [
          "Може підвісити Studio — лімітуємо",
          "Завжди безпечно 1_000_000",
          "Дає Robux",
          "Видаляє потребу Save"
        ],
        "correctAnswer": 0,
        "explanation": "Може підвісити Studio — лімітуємо"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Крок `for i = 1, 10, 2`…",
        "options": [
          "Йде через 1,3,5…",
          "Видаляє парні числа з Roblox назавжди",
          "Робіть Folder",
          "Вимикає Play"
        ],
        "correctAnswer": 0,
        "explanation": "Йде через 1,3,5…"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Фабрика блоків тренує…",
        "options": [
          "Цикл + створення обʼєктів",
          "Лише Decal",
          "Лише Atmosphere",
          "Лише відео"
        ],
        "correctAnswer": 0,
        "explanation": "Цикл + створення обʼєктів"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "while і обережність",
          "Тільки Negate",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "while і обережність"
      }
    ]
  }
}

export const enLesson73 = {
  "lessonId": "lesson-roblox-7-3",
  "moduleId": "module-07",
  "order": 3,
  "title": "7.3 — while and safety",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "while з умовою; **завжди** task.wait у ігрових циклах.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** while з умовою; **завжди** task.wait у ігрових циклах.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal t = 5\nwhile t > 0 do\n\tprint(\"Залишилось\", t)\n\tt = t - 1\n\ttask.wait(1)\nend\nprint(\"Старт!\")\n```"
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
  "summary": "**7.3 — while and safety** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: while and safety",
    "difficulty": "intermediate",
    "description": "### Task\nComplete the steps for “while and safety” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Страшилка infinite loop → демо правильного while → разом таймер 5→0 → самі свій відлік → челендж «не завісити Studio» вікторина → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`while умова do` повторює поки… a) Умова true b) Місяць круглий у реальності завжди лише с) Negate існує d) Decal червоний **Відповідь: a** 2. Без `task.wait` у тісному while…",
        "options": [
          "Ризик зависання",
          "Завжди швидший SSD",
          "Дає Badge",
          "Робіть Sky краще"
        ],
        "correctAnswer": 0,
        "explanation": "Ризик зависання"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`t = t - 1` потрібно щоб…",
        "options": [
          "Колись вийти з циклу",
          "Видалити House",
          "Вимкнути Path",
          "Зробити Union"
        ],
        "correctAnswer": 0,
        "explanation": "Колись вийти з циклу"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Таймер while з wait",
          "Повний MMO",
          "Blender",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Таймер while з wait"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "`while true do` без виходу…",
        "options": [
          "Небезпечно без break/wait/умови виходу",
          "Рекомендований стиль завжди",
          "Видаляє потребу Save",
          "Дає Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Небезпечно без break/wait/умови виходу"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "for vs while…",
        "options": [
          "for зручний коли знаємо кількість; while — поки умова",
          "Немає різниці ніколи",
          "while лише для UI тексту",
          "for лише для Lighting"
        ],
        "correctAnswer": 0,
        "explanation": "for зручний коли знаємо кількість; while — поки умова"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "print «Старт!» після циклу…",
        "options": [
          "Виконується коли відлік закінчено",
          "Видаляє цикл",
          "Вимикає Output",
          "Робіть Terrain"
        ],
        "correctAnswer": 0,
        "explanation": "Виконується коли відлік закінчено"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Якщо Studio зависла від циклу…",
        "options": [
          "Stop/закрити Play; виправити код; Save частіше",
          "Купити новий акаунт одразу",
          "Видалити Windows",
          "Кричати на групу"
        ],
        "correctAnswer": 0,
        "explanation": "Stop/закрити Play; виправити код; Save частіше"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "ДЗ таймера…",
        "options": [
          "Змінити старт t",
          "Видалити wait назавжди",
          "Поставити N=1e9",
          "Прибрати умову"
        ],
        "correctAnswer": 0,
        "explanation": "Змінити старт t"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Таймер на Part / UI текстом (просто)",
          "Тільки Negate",
          "Тільки Ambient",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Таймер на Part / UI текстом (просто)"
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

export const enLesson74 = {
  "lessonId": "lesson-roblox-7-4",
  "moduleId": "module-07",
  "order": 4,
  "title": "7.4 — In-game timer",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "відлік змінює колір Part або TextLabel (простийLocalScript опційно).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** відлік змінює колір Part або TextLabel (простийLocalScript опційно).\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
  "summary": "**7.4 — In-game timer** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: In-game timer",
    "difficulty": "intermediate",
    "description": "### Task\nComplete the steps for “In-game timer” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "If work vanished — check that you saved the Place."
    ],
    "optionalChallenge": "Демо → разом → самі → playtest гонки хто встигне добігти до монети за 10 сек (челендж) → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Візуальний таймер кращий за лише print бо…",
        "options": [
          "Гравець бачить у світі/UI",
          "Print заборонений",
          "Output видаляє игру",
          "Parts зникають"
        ],
        "correctAnswer": 0,
        "explanation": "Гравець бачить у світі/UI"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Оновлення кожну секунду роблять через…",
        "options": [
          "wait у циклі",
          "Negate",
          "Union даху",
          "Toolbox машину"
        ],
        "correctAnswer": 0,
        "explanation": "wait у циклі"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Видимий відлік",
          "Повний DataStore",
          "Blender face",
          "Кіберспорт ліга"
        ],
        "correctAnswer": 0,
        "explanation": "Видимий відлік"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Гонка з таймером тренує…",
        "options": [
          "Звʼязок циклу і геймплею",
          "Видалення Spawn",
          "Вимкнення Anchored Foundation",
          "Скасування тестів"
        ],
        "correctAnswer": 0,
        "explanation": "Звʼязок циклу і геймплею"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "LocalScript для UI таймера…",
        "options": [
          "Ок як опція",
          "Єдиний спосіб спавнити Part у workspace завжди",
          "Замінює Terrain Editor",
          "Видаляє SSS"
        ],
        "correctAnswer": 0,
        "explanation": "Ок як опція"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Колір Part на 3 / 2 / 1…",
        "options": [
          "Підказка напруги часу",
          "Обовʼязковий DataStore",
          "Обовʼязковий Badge",
          "Обовʼязковий GamePass"
        ],
        "correctAnswer": 0,
        "explanation": "Підказка напруги часу"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Після 0 що логічно?",
        "options": [
          "Повідомлення кінця / смерть / відкрити двері — на вибір ТЗ",
          "Видалити Roblox",
          "Вимкнути інтернет",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Повідомлення кінця / смерть / відкрити двері — на вибір ТЗ"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Чи while обовʼязковий якщо for 10..1 зручніший?",
        "options": [
          "Можна for — головне повтор",
          "while єдиний законний",
          "for заборонений",
          "Цикли заборонені"
        ],
        "correctAnswer": 0,
        "explanation": "Можна for — головне повтор"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Save перед таймер-експериментами…",
        "options": [
          "Так",
          "Ні ніколи",
          "Лише після крашу",
          "Лише в Discord"
        ],
        "correctAnswer": 0,
        "explanation": "Так"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Цикл + if разом",
          "Тільки Sky",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Цикл + if разом"
      }
    ]
  }
}

export const enLesson75 = {
  "lessonId": "lesson-roblox-7-5",
  "moduleId": "module-07",
  "order": 5,
  "title": "7.5 — Loop + if: filter",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "у for спавнити цеглу лише якщо `i % 2 == 0` (парні) або пропускати небезпечні індекси.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** у for спавнити цеглу лише якщо `i % 2 == 0` (парні) або пропускати небезпечні індекси.\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nfor i = 1, 10 do\n\tif i % 2 == 0 then\n\t\tlocal p = Instance.new(\"Part\")\n\t\tp.Position = Vector3.new(i * 2, 6, 10)\n\t\tp.Anchored = true\n\t\tp.Color = Color3.fromRGB(255, 200, 0)\n\t\tp.Parent = workspace\n\tend\nend\n```"
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
  "summary": "**7.5 — Loop + if: filter** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Loop + if: filter",
    "difficulty": "intermediate",
    "description": "### Task\nComplete the steps for “Loop + if: filter” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
    "hints": [
      "Do the steps 1:1 first, then customize.",
      "Name objects with clear PascalCase labels.",
      "Code template is in the Theory tab — use Copy."
    ],
    "optionalChallenge": "Демо остача від ділення ідеєю «парність» → разом → самі колір за умовою (if i>5 інший колір) → челендж візерунок → тест → ДЗ чернетка фабрики."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Цикл + if дає…",
        "options": [
          "Повтор з відбором",
          "Видалення мови Lua",
          "Автоматичний Blender",
          "Автоматичний TikTok"
        ],
        "correctAnswer": 0,
        "explanation": "Повтор з відбором"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`%` (мода) для парності…",
        "options": [
          "Остача від ділення",
          "Negate",
          "Sky",
          "Sound"
        ],
        "correctAnswer": 0,
        "explanation": "Остача від ділення"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`if i % 2 == 0` …",
        "options": [
          "Парні i",
          "Завжди false",
          "Видаляє Part",
          "Вимикає Play"
        ],
        "correctAnswer": 0,
        "explanation": "Парні i"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Візерунок/відбір спавну",
          "Повний RPG",
          "Clipchamp",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Візерунок/відбір спавну"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Різний колір при i>5…",
        "options": [
          "elseif/if всередині for",
          "Неможливо",
          "Лише в C++",
          "Лише в HTML"
        ],
        "correctAnswer": 0,
        "explanation": "elseif/if всередині for"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Це підготовка до…",
        "options": [
          "Генерації рівнів / нагород хвилями",
          "Видалення змінних",
          "Скасування Studio",
          "Лише Decal курсу"
        ],
        "correctAnswer": 0,
        "explanation": "Генерації рівнів / нагород хвилями"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Без if усі 10 Parts…",
        "options": [
          "Теж ок, але без відбору",
          "Заборонено",
          "Краще завжди 1e6",
          "Видаляє Anchored"
        ],
        "correctAnswer": 0,
        "explanation": "Теж ок, але без відбору"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Візерунок челенджу…",
        "options": [
          "Творче застосування умови",
          "Оцінка з математики ЗНО лише",
          "Заміна Place",
          "Покупка Plugin обовʼязкова"
        ],
        "correctAnswer": 0,
        "explanation": "Творче застосування умови"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Комбінація М6+М7 важлива бо…",
        "options": [
          "Реальні ігри так працюють",
          "Так не роблять ніколи",
          "Лише в Unity",
          "Лише в Unreal"
        ],
        "correctAnswer": 0,
        "explanation": "Реальні ігри так працюють"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Фінал — фабрика + таймер проєкт",
          "Видалити for",
          "Тільки Atmosphere",
          "Тільки відео"
        ],
        "correctAnswer": 0,
        "explanation": "Фінал — фабрика + таймер проєкт"
      }
    ]
  }
}

export const enLesson76 = {
  "lessonId": "lesson-roblox-7-6",
  "moduleId": "module-07",
  "order": 6,
  "title": "7.6 — Project: Brick Factory",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "кнопка ClickDetector запускає for-спавн хвилі N блоків; while/for таймер між хвилями (спростити: одна хвиля + відлік до старту).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** кнопка ClickDetector запускає for-спавн хвилі N блоків; while/for таймер між хвилями (спростити: одна хвиля + відлік до старту).\n\nCourse phase: **Serious Lua**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
        "title": "Practice steps",
        "content": "- [ ] for створює ≥5 Parts з іменами - [ ] Parts Anchored у Folder `FactoryOutput` - [ ] Є відлік до старту (while або for+wait) - [ ] Є хоча б один if (колір/парність/ліміт) - [ ] Немає зависання"
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
  "summary": "**7.6 — Project: Brick Factory** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Project: Brick Factory",
    "difficulty": "intermediate",
    "description": "### Task\nComplete the steps for “Project: Brick Factory” in your Place.\n\n\n### Steps\n- [ ] for створює ≥5 Parts з іменами - [ ] Parts Anchored у Folder `FactoryOutput` - [ ] Є відлік до старту (while або for+wait) - [ ] Є хоча б один if (колір/парність/ліміт) - [ ] Немає зависання\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Фабрика демонструє…",
        "options": [
          "Цикли у видимому результаті",
          "Що цикли непотрібні",
          "Що Parts створює лише Toolbox",
          "Що Output скасовано"
        ],
        "correctAnswer": 0,
        "explanation": "Цикли у видимому результаті"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Folder FactoryOutput… a) Порядок і легше чистити b) Збільшує FPS магічно завжди с) Дає Robux d) Робіть Negate **Відповідь: a** 3. Кнопка старту потрібна щоб…",
        "options": [
          "Не спавнити одразу при відкритті Place хаотично (контроль)",
          "Видалити ClickDetector з Roblox",
          "Вимкнути камеру",
          "Змінити біом без Studio"
        ],
        "correctAnswer": 0,
        "explanation": "Не спавнити одразу при відкритті Place хаотично (контроль)"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Після М7 логічно…",
        "options": [
          "Функції — упакувати повтори в іменовані дії",
          "Лише Sky курс",
          "Лише Negate курс",
          "Лише НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Функції — упакувати повтори в іменовані дії"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Очищення старих Parts перед новою хвилею…",
        "options": [
          "Добре ускладнення (цикл Destroy) для сильних",
          "Заборонено",
          "Видаляє потребу if",
          "Видаляє потребу for"
        ],
        "correctAnswer": 0,
        "explanation": "Добре ускладнення (цикл Destroy) для сильних"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Ліміт N…",
        "options": [
          "Обовʼязкова гігієна уроку",
          "Непотрібна ніколи",
          "Чим більше тим завжди краще без меж",
          "N лише від’ємний"
        ],
        "correctAnswer": 0,
        "explanation": "Обовʼязкова гігієна уроку"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "task.wait у проєкті…",
        "options": [
          "Контролює темп хвилі/таймера",
          "Видаляє скрипт",
          "Вимикає Explorer",
          "Робіть Union"
        ],
        "correctAnswer": 0,
        "explanation": "Контролює темп хвилі/таймера"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Доказ здачі…",
        "options": [
          "Play-демо хвилі",
          "Лише скрін ніку",
          "Лише PDF",
          "Лише Discord стікер"
        ],
        "correctAnswer": 0,
        "explanation": "Play-демо хвилі"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Infinite loop на здачі…",
        "options": [
          "Не зараховуємо / фіксимо",
          "Секретний максимум балів",
          "Дає сертифікат одразу",
          "Видаляє М8"
        ],
        "correctAnswer": 0,
        "explanation": "Не зараховуємо / фіксимо"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "М8 розпочне…",
        "options": [
          "Функції, події глибше, таблиці intro",
          "Скасування Lua",
          "Лише Terrain",
          "Лише відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Функції, події глибше, таблиці intro"
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
