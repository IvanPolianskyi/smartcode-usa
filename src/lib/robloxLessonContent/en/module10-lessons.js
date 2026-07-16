/** Roblox v2 Module 10 EN — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE
void MC

export const enLesson101 = {
  "lessonId": "lesson-roblox-10-1",
  "moduleId": "module-10",
  "order": 1,
  "title": "10.1 — Simulator genre core",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зрозуміти loop: **клік/збір → число росте → купуєш апгрейд → збираєш швидше**. Спроектувати 1 ресурс і 2 апгрейди на папері. Зібрати сцену: зони збору Parts.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** зрозуміти loop: **клік/збір → число росте → купуєш апгрейд → збираєш швидше**. Спроектувати 1 ресурс і 2 апгрейди на папері. Зібрати сцену: зони збору Parts.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Place `M10_Sim`; Folder `Collectables`; Part `ShopNPC` або `ShopPad`; leaderstats: `Coins`, `Power` (IntValues)."
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
  "summary": "**10.1 — Simulator genre core** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Simulator genre core",
    "difficulty": "advanced",
    "description": "### Task\nPlace `M10_Sim`; Folder `Collectables`; Part `ShopNPC` або `ShopPad`; leaderstats: `Coins`, `Power` (IntValues).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Ядро симулятора — це…",
        "options": [
          "Цикл прогресії чисел через збір і апгрейди",
          "Лише красиве небо",
          "Лише Negate вікна",
          "Лише відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Цикл прогресії чисел через збір і апгрейди"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`Power` у leaderstats часто означає…",
        "options": [
          "Скільки дає один збір / силу кліку",
          "Назву біому",
          "Volume Sound",
          "ClockTime"
        ],
        "correctAnswer": 0,
        "explanation": "Скільки дає один збір / силу кліку"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Навіщо малювати 2 апгрейди до коду?",
        "options": [
          "Щоб знати економіку до програмування",
          "Бо код пишеться без ідей завжди краще",
          "Бо Roblox видаляє гру без малюнка",
          "Бо Negate обовʼязковий"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб знати економіку до програмування"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Сцена + leaderstats під симулятор",
          "Повний obby М9 копія",
          "Blender персонаж",
          "Clipchamp фільм"
        ],
        "correctAnswer": 0,
        "explanation": "Сцена + leaderstats під симулятор"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Collectables Folder…",
        "options": [
          "Місце обʼєктів збору",
          "Сервіс Lighting",
          "Тип Union",
          "Плагін Snap"
        ],
        "correctAnswer": 0,
        "explanation": "Місце обʼєктів збору"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Симулятор відрізняється від obby тим що…",
        "options": [
          "Акцент на числах/прогресії, не на паркурі",
          "Немає Parts",
          "Немає Lua",
          "Немає Play"
        ],
        "correctAnswer": 0,
        "explanation": "Акцент на числах/прогресії, не на паркурі"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Один ресурс на старті краще ніж 10 бо…",
        "options": [
          "Простіше збалансувати навчання",
          "Roblox дозволяє лише один",
          "IntValue не підтримує більше",
          "GUI не існує"
        ],
        "correctAnswer": 0,
        "explanation": "Простіше збалансувати навчання"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "ShopPad…",
        "options": [
          "Точка взаємодії з магазином",
          "Обовʼязковий KillBrick",
          "Обовʼязковий TeleportService між місцями",
          "Обовʼязковий Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Точка взаємодії з магазином"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ назви апгрейдів…",
        "options": [
          "«+Power», «×2 монети» тощо",
          "Видалити Coins",
          "Видалити Power",
          "Скасувати сцену"
        ],
        "correctAnswer": 0,
        "explanation": "«+Power», «×2 монети» тощо"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Збір ресурсу кодом",
          "Тільки Sky",
          "Тільки Ambient",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Збір ресурсу кодом"
      }
    ]
  }
}

export const enLesson102 = {
  "lessonId": "lesson-roblox-10-2",
  "moduleId": "module-10",
  "order": 2,
  "title": "10.2 — Collecting and Power",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "функція `grantReward(player)` додає `Power` до `Coins` (або окремий ресурс); респавн монети через wait/цикл.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** функція `grantReward(player)` додає `Power` до `Coins` (або окремий ресурс); респавн монети через wait/цикл.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "≥5 collectables; debounce; використання Power. ```lua local function grantReward(player) local ls = player:FindFirstChild(\"leaderstats\") if not ls then return end local coins, power = ls.Coins, ls.Power coins.Value += power.Value end ```"
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal function grantReward(player)\n\tlocal ls = player:FindFirstChild(\"leaderstats\")\n\tif not ls then return end\n\tlocal coins, power = ls.Coins, ls.Power\n\tcoins.Value += power.Value\nend\n```"
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
  "summary": "**10.2 — Collecting and Power** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Collecting and Power",
    "difficulty": "advanced",
    "description": "### Task\n≥5 collectables; debounce; використання Power. ```lua local function grantReward(player) local ls = player:FindFirstChild(\"leaderstats\") if not ls then return end local coins, power = ls.Coins, ls.Power coins.Value += power.Value end ```\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "`coins.Value += power.Value` …",
        "options": [
          "Нараховує збір з урахуванням сили",
          "Видаляє Power",
          "Робіть Negate",
          "Малює Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Нараховує збір з урахуванням сили"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Debounce на зборі…",
        "options": [
          "Анти-спам нарахувань",
          "Тип Sky",
          "Кнопка Publish",
          "Плагін Terrain"
        ],
        "correctAnswer": 0,
        "explanation": "Анти-спам нарахувань"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Респавн монети…",
        "options": [
          "Повторюваний геймплей",
          "Заборонений",
          "Видаляє Place",
          "Дає Badge автоматично"
        ],
        "correctAnswer": 0,
        "explanation": "Повторюваний геймплей"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Працюючий збір із Power",
          "Повний Tycoon dropper лінія",
          "Blender",
          "Відео 20′"
        ],
        "correctAnswer": 0,
        "explanation": "Працюючий збір із Power"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "grantReward функція…",
        "options": [
          "Одна точка видачі нагороди",
          "Заміна Workspace",
          "Заміна Lighting",
          "Видалення Path"
        ],
        "correctAnswer": 0,
        "explanation": "Одна точка видачі нагороди"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Старт Power = 1 …",
        "options": [
          "Зрозумілий баланс",
          "Обовʼязково 1_000_000",
          "Обовʼязково 0 назавжди",
          "Обовʼязково відʼємний"
        ],
        "correctAnswer": 0,
        "explanation": "Зрозумілий баланс"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "ClickDetector замість Touched…",
        "options": [
          "Можливий варіант «клік-симулятор»",
          "Неможливий у Roblox",
          "Видаляє leaderstats",
          "Вимикає Play"
        ],
        "correctAnswer": 0,
        "explanation": "Можливий варіант «клік-симулятор»"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Якщо монети не ростуть…",
        "options": [
          "Перевірити leaderstats / імена / debounce",
          "Купити Robux обовʼязково",
          "Видалити акаунт",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Перевірити leaderstats / імена / debounce"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Цикл по Collectables…",
        "options": [
          "Як hazards у М9",
          "Новий язык",
          "Заборонений",
          "Лише в PHP"
        ],
        "correctAnswer": 0,
        "explanation": "Як hazards у М9"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Магазин апгрейдів",
          "Тільки Negate",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Магазин апгрейдів"
      }
    ]
  }
}

export const enLesson103 = {
  "lessonId": "lesson-roblox-10-3",
  "moduleId": "module-10",
  "order": 3,
  "title": "10.3 — Shop: prices and canAfford",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "Module/таблица `Upgrades = { PowerUp = {price=25, add=1},... }`; покупка на сервері.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** Module/таблица `Upgrades = { PowerUp = {price=25, add=1},... }`; покупка на сервері.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Клік Shop → якщо canAfford → зняти монети → збільшити Power; print/UI фідбек."
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
  "summary": "**10.3 — Shop: prices and canAfford** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Shop: prices and canAfford",
    "difficulty": "advanced",
    "description": "### Task\nКлік Shop → якщо canAfford → зняти монети → збільшити Power; print/UI фідбек.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Ціни в таблиці…",
        "options": [
          "Легко міняти баланс",
          "Заборонено",
          "Лише в Excel файлі поза Studio",
          "Лише голосом"
        ],
        "correctAnswer": 0,
        "explanation": "Легко міняти баланс"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "canAfford перед покупкою…",
        "options": [
          "Захист від відʼємних монет",
          "Малює Sky",
          "Робіть Union",
          "Відкриває Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Захист від відʼємних монет"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Знімати монети на сервері…",
        "options": [
          "Базова античит-гігієна",
          "Гірше ніж лише на клієнті завжди",
          "Видаляє Power",
          "Вимикає Output"
        ],
        "correctAnswer": 0,
        "explanation": "Базова античит-гігієна"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Працююча покупка апгрейду",
          "Повний MMO",
          "Blender face",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Працююча покупка апгрейду"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Другий апгрейд…",
        "options": [
          "Закріплює таблицю апгрейдів",
          "Заборонений",
          "Ламає IntValue завжди",
          "Видаляє Shop"
        ],
        "correctAnswer": 0,
        "explanation": "Закріплює таблицю апгрейдів"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Відмова при нестачі…",
        "options": [
          "print/UI «не вистачає»",
          "Видалення Place",
          "Автоматичний Gift Robux",
          "Negate гравця"
        ],
        "correctAnswer": 0,
        "explanation": "print/UI «не вистачає»"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "ModuleScript цін…",
        "options": [
          "Звʼязок з М8",
          "Суперечить М8",
          "Скасовує функції",
          "Скасовує таблиці"
        ],
        "correctAnswer": 0,
        "explanation": "Звʼязок з М8"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "add=1 до Power…",
        "options": [
          "Прогресія сили збору",
          "Видаляє Coins завжди",
          "Телепортує",
          "Вбиває Humanoid"
        ],
        "correctAnswer": 0,
        "explanation": "Прогресія сили збору"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Баланс ціни занадто низький…",
        "options": [
          "Гра стає нудною миттєво — правити",
          "Ідеал завжди",
          "Дає Badge",
          "Зберігає Place"
        ],
        "correctAnswer": 0,
        "explanation": "Гра стає нудною миттєво — правити"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "UI магазину",
          "Тільки Ambient",
          "Тільки Decal",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "UI магазину"
      }
    ]
  }
}

export const enLesson104 = {
  "lessonId": "lesson-roblox-10-4",
  "moduleId": "module-10",
  "order": 4,
  "title": "10.4 — Shop UI + RemoteEvent",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "ScreenGui зі списком 2 кнопок; RemoteEvent `BuyUpgrade` з імʼям апгрейду; сервер валідує.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** ScreenGui зі списком 2 кнопок; RemoteEvent `BuyUpgrade` з імʼям апгрейду; сервер валідує.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Відкрити магазин біля ShopPad (ProximityPrompt **або** Click); купити з кнопки GUI."
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
  "summary": "**10.4 — Shop UI + RemoteEvent** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Shop UI + RemoteEvent",
    "difficulty": "advanced",
    "description": "### Task\nВідкрити магазин біля ShopPad (ProximityPrompt **або** Click); купити з кнопки GUI.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "RemoteEvent між клієнтом і сервером…",
        "options": [
          "Передає сигнал/запит",
          "Малює Terrain",
          "Робіть Negate",
          "Зберігає PDF"
        ],
        "correctAnswer": 0,
        "explanation": "Передає сигнал/запит"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Ціну перевіряє…",
        "options": [
          "Сервер",
          "Лише колір кнопки",
          "Лише Sky",
          "Лише Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Сервер"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Якщо клієнт бреше «це коштує 0»…",
        "options": [
          "Сервер все одно дивиться свою таблицю",
          "Обовʼязково вірить",
          "Видаляє гру",
          "Дає адмінку"
        ],
        "correctAnswer": 0,
        "explanation": "Сервер все одно дивиться свою таблицю"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "GUI покупки через RemoteEvent",
          "Повний obby таймер копія",
          "Blender",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "GUI покупки через RemoteEvent"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "ProximityPrompt…",
        "options": [
          "Зручний open shop",
          "Заборонений",
          "Заміна leaderstats",
          "Заміна Parts"
        ],
        "correctAnswer": 0,
        "explanation": "Зручний open shop"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "LocalScript у кнопці…",
        "options": [
          "FireServer з імʼям апгрейду",
          "Змінює ServerStorage напряму завжди ок без сервера",
          "Видаляє Workspace",
          "Вимикає Play"
        ],
        "correctAnswer": 0,
        "explanation": "FireServer з імʼям апгрейду"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Це глибше за М4 меню бо…",
        "options": [
          "Є мережева покупка",
          "Менше кнопок завжди погано",
          "Немає UI",
          "Немає Play"
        ],
        "correctAnswer": 0,
        "explanation": "Є мережева покупка"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Дві кнопки GUI…",
        "options": [
          "Два апгрейди",
          "Обовʼязково 100",
          "Обовʼязково 0",
          "Обовʼязково Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Два апгрейди"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Помилка Remote не знайдено…",
        "options": [
          "Шлях/імена в ReplicatedStorage",
          "Купити Robux",
          "Видалити акаунт",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Шлях/імена в ReplicatedStorage"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Множники / баланс сесії",
          "Тільки Sky",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Множники / баланс сесії"
      }
    ]
  }
}

export const enLesson105 = {
  "lessonId": "lesson-roblox-10-5",
  "moduleId": "module-10",
  "order": 5,
  "title": "10.5 — Multiplier and goal",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "апгрейд множника; мета «накопичити N»; фідбек прогресу (бар або текст Goal).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** апгрейд множника; мета «накопичити N»; фідбек прогресу (бар або текст Goal).\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "`Multiplier` Value або поле; мета 500 монет → повідомлення/бейдж-Part «Winner»; коротке утримання 1 сексії без DataStore (збереження — Тізер М13)."
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
  "summary": "**10.5 — Multiplier and goal** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Multiplier and goal",
    "difficulty": "advanced",
    "description": "### Task\n`Multiplier` Value або поле; мета 500 монет → повідомлення/бейдж-Part «Winner»; коротке утримання 1 сексії без DataStore (збереження — Тізер М13).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Множник робить…",
        "options": [
          "Нарахування сильнішим",
          "Видалення магазину",
          "Negate вікна",
          "Зміну біому словами"
        ],
        "correctAnswer": 0,
        "explanation": "Нарахування сильнішим"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Мета N монет…",
        "options": [
          "Дає сенс сесії",
          "Заборонена",
          "Ламає IntValue",
          "Вимикає GUI"
        ],
        "correctAnswer": 0,
        "explanation": "Дає сенс сесії"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Баланс після playtest…",
        "options": [
          "Обовʼязкова частина жанру",
          "Даремна",
          "Лише для Tycoon",
          "Лише для obby"
        ],
        "correctAnswer": 0,
        "explanation": "Обовʼязкова частина жанру"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Множник + мета + підкручений баланс",
          "Повний DataStore між всіма places",
          "Blender face",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Множник + мета + підкручений баланс"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Без мета-цілі симулятор…",
        "options": [
          "Швидко набридає",
          "Стає AAA автоматом",
          "Видаляє потребу Power",
          "Видаляє потребу Coins"
        ],
        "correctAnswer": 0,
        "explanation": "Швидко набридає"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "DataStore сьогодні…",
        "options": [
          "Ще не обовʼязок — чесно сказати «сесія»",
          "Повний продакшен сейв",
          "Заміна RemoteEvent",
          "Заміна Parts"
        ],
        "correctAnswer": 0,
        "explanation": "Ще не обовʼязок — чесно сказати «сесія»"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Текст прогресу до мети…",
        "options": [
          "Мотивує",
          "Шкідливий завжди",
          "Видаляє Power",
          "Вимикає Shop"
        ],
        "correctAnswer": 0,
        "explanation": "Мотивує"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Занадто швидка мета…",
        "options": [
          "Підняти ціни / мету",
          "Видалити збір",
          "Видалити UI",
          "Вимкнути сервер назавжди"
        ],
        "correctAnswer": 0,
        "explanation": "Підняти ціни / мету"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Груповий playtest…",
        "options": [
          "Валідація веселощів",
          "Заміна рубрики здачі",
          "Привід ображати",
          "Привід читерити Remote ціною"
        ],
        "correctAnswer": 0,
        "explanation": "Валідація веселощів"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Здача симулятора",
          "Тільки Ambient",
          "Тільки Negate",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Здача симулятора"
      }
    ]
  }
}

export const enLesson106 = {
  "lessonId": "lesson-roblox-10-6",
  "moduleId": "module-10",
  "order": 6,
  "title": "10.6 — Checkpoint: simulator presentation",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "Understand “Checkpoint: simulator presentation”",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** Master “Checkpoint: simulator presentation”.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
  "summary": "**10.6 — Checkpoint: simulator presentation** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Checkpoint: simulator presentation",
    "difficulty": "advanced",
    "description": "### Task\nComplete the steps for “Checkpoint: simulator presentation” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "М10 результат…",
        "options": [
          "Міні-симулятор з прогресією",
          "Лише Baseplate",
          "Лише PDF",
          "Лише нік"
        ],
        "correctAnswer": 0,
        "explanation": "Міні-симулятор з прогресією"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Далі М11…",
        "options": [
          "Tycoon",
          "Скасування чисел",
          "Тільки Decal",
          "Тільки Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Tycoon"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Серверна перевірка ціни…",
        "options": [
          "Ключовий skill модуля",
          "Непотрібна",
          "Лише для obby",
          "Лише для Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Ключовий skill модуля"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Tycoon відрізнятиметься…",
        "options": [
          "Дропери, бази, будівництво за гроші",
          "Лише більшим небом",
          "Відміною Coins",
          "Відміною Parts"
        ],
        "correctAnswer": 0,
        "explanation": "Дропери, бази, будівництво за гроші"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Power у симуляторі…",
        "options": [
          "Драйвер прогресії збору",
          "Назва Sound",
          "Тип Union",
          "Face Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Драйвер прогресії збору"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Без GUI теж можна здати?",
        "options": [
          "Слабше; GUI був у ТЗ",
          "Краще завжди без UI",
          "UI заборонений",
          "Remote заборонений"
        ],
        "correctAnswer": 0,
        "explanation": "Слабше; GUI був у ТЗ"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Пояснення Remote…",
        "options": [
          "Клієнт просить, сервер вирішує",
          "Сервер просить, клієнт завжди вручає адмінку",
          "Remote малює Terrain",
          "Remote робить Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Клієнт просить, сервер вирішує"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Баланс…",
        "options": [
          "Частина геймдизайну симулятора",
          "Лише математика ЗНО",
          "Лише хімія",
          "Непотрібний"
        ],
        "correctAnswer": 0,
        "explanation": "Частина геймдизайну симулятора"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Презентація…",
        "options": [
          "Показати збір→покупку→сильніший збір",
          "Лише скрін неба",
          "Лише Word",
          "Лише стікер"
        ],
        "correctAnswer": 0,
        "explanation": "Показати збір→покупку→сильніший збір"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "М11 почне з…",
        "options": [
          "Ділянки гравця / plot",
          "Видалення грошей",
          "Скасування Studio",
          "НМТ історія"
        ],
        "correctAnswer": 0,
        "explanation": "Ділянки гравця / plot"
      }
    ]
  }
}
