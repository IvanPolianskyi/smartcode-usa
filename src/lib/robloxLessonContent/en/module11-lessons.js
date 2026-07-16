/** Roblox v2 Module 11 EN — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE
void MC

export const enLesson111 = {
  "lessonId": "lesson-roblox-11-1",
  "moduleId": "module-11",
  "order": 1,
  "title": "11.1 — Plot: my base",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зрозуміти plot ownership; підготувати модель бази `TycoonPlot` (підлога, точки DropperSlot, CollectorSlot, Buttons folder). При вході гравець отримує plot ().",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** зрозуміти plot ownership; підготувати модель бази `TycoonPlot` (підлога, точки DropperSlot, CollectorSlot, Buttons folder). При вході гравець отримує plot ().\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "5 Plots у Workspace; Script: перший вільний plot → Attribute OwnerUserId; колір підлоги = командний колір гравця (опційно)."
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
  "summary": "**11.1 — Plot: my base** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Plot: my base",
    "difficulty": "advanced",
    "description": "### Task\n5 Plots у Workspace; Script: перший вільний plot → Attribute OwnerUserId; колір підлоги = командний колір гравця (опційно).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Plot у tycoon — це…",
        "options": [
          "Особиста ділянка бази гравця",
          "Тип Sky",
          "NegatePart",
          "Decal Face"
        ],
        "correctAnswer": 0,
        "explanation": "Особиста ділянка бази гравця"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "OwnerUserId…",
        "options": [
          "Хто володіє участком",
          "Volume Sound",
          "ClockTime",
          "Material даху завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Хто володіє участком"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Навіщо слоти Dropper/Collector заздалегідь?",
        "options": [
          "Щоб код знав куди ставити системи",
          "Бо Toolbox зобовʼязує",
          "Бо Negate обовʼязковий",
          "Бо DataStore інакше не працює"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб код знав куди ставити системи"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Claimable plots",
          "Повний шутер",
          "Blender",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Claimable plots"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "У групі 5 plot…",
        "options": [
          "По одному на учня",
          "Один на всіх завжди хаос",
          "Н нуль",
          "100 обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "По одному на учня"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Без ownership…",
        "options": [
          "Важко зрозуміти чия база",
          "Краще для навчання завжди",
          "Дає Robux",
          "Відкриває Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Важко зрозуміти чия база"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Buttons Folder…",
        "options": [
          "Місце кнопок покупок",
          "Сервіс Lighting",
          "Terrain region",
          "Plugin Snap"
        ],
        "correctAnswer": 0,
        "explanation": "Місце кнопок покупок"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Tycoon vs симулятор…",
        "options": [
          "Будівництво/дроп-ланцюг на базі",
          "Немає різниці",
          "Немає чисел",
          "Немає Parts"
        ],
        "correctAnswer": 0,
        "explanation": "Будівництво/дроп-ланцюг на базі"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ підписати слоти іменами…",
        "options": [
          "DropperSlot CollectorSlot",
          "Part1 Part2",
          "Видалити plot",
          "Видалити Spawn"
        ],
        "correctAnswer": 0,
        "explanation": "DropperSlot CollectorSlot"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Dropper",
          "Тільки Sky",
          "Тільки Ambient",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Dropper"
      }
    ]
  }
}

export const enLesson112 = {
  "lessonId": "lesson-roblox-11-2",
  "moduleId": "module-11",
  "order": 2,
  "title": "11.2 — Dropper",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "цикл/таймер створює Part-дроп над жолобом; Anchored false щоб падав у колектор (або Tween рух).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** цикл/таймер створює Part-дроп над жолобом; Anchored false щоб падав у колектор (або Tween рух).\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Dropper на своєму plot; ліміт одночасних дропів (антилаг); імена `Drop_#`."
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
  "summary": "**11.2 — Dropper** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Dropper",
    "difficulty": "advanced",
    "description": "### Task\nDropper на своєму plot; ліміт одночасних дропів (антилаг); імена `Drop_#`.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Dropper…",
        "options": [
          "Періодично створює предмети доходу",
          "Лише фарбує небо",
          "Лише робить Negate",
          "Лише відкриває Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "Періодично створює предмети доходу"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Ліміт дропів потрібен бо…",
        "options": [
          "Інакше лаг від тисяч Parts",
          "Roblox дає Robux за лаг",
          "Видаляє plot",
          "Вимикає мікрофон"
        ],
        "correctAnswer": 0,
        "explanation": "Інакше лаг від тисяч Parts"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Interval змінною…",
        "options": [
          "Баланс швидкості дропу",
          "Тип Decal",
          "Face Sky",
          "Plugin"
        ],
        "correctAnswer": 0,
        "explanation": "Баланс швидкості дропу"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Робочий dropper на plot",
          "Повний obby",
          "Blender face",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Робочий dropper на plot"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Parent дропу…",
        "options": [
          "Folder на plot щоб чистити",
          "Lighting",
          "SoundService завжди",
          "Teams сервіс завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Folder на plot щоб чистити"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Без гравітації/руху дроп…",
        "options": [
          "Не дійде до collector — перевірити фізику",
          "Краще завжди висіти",
          "Дає Badge",
          "Зберігає DataStore"
        ],
        "correctAnswer": 0,
        "explanation": "Не дійде до collector — перевірити фізику"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "task.wait у циклі dropper…",
        "options": [
          "Темп спавну",
          "Видалення Lua",
          "Negate",
          "Publish"
        ],
        "correctAnswer": 0,
        "explanation": "Темп спавну"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Owner only дроп…",
        "options": [
          "Логіка «працює для власника plot» (якщо треба)",
          "Заборонена",
          "Ламає IntValue",
          "Вимикає Play"
        ],
        "correctAnswer": 0,
        "explanation": "Логіка «працює для власника plot» (якщо треба)"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ змінити rate…",
        "options": [
          "Параметр балансу",
          "Видалити dropper",
          "Видалити plot",
          "Скасувати імена"
        ],
        "correctAnswer": 0,
        "explanation": "Параметр балансу"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Collector",
          "Тільки Ambient",
          "Тільки Decal",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Collector"
      }
    ]
  }
}

export const enLesson113 = {
  "lessonId": "lesson-roblox-11-3",
  "moduleId": "module-11",
  "order": 3,
  "title": "11.3 — Collector",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "Touched collector знищує drop і додає монети власнику plot.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** Touched collector знищує drop і додає монети власнику plot.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Cash у leaderstats; collector працює; дроп має Attribute Value."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Template 1\n\n```lua\nlocal function collect(drop, ownerPlayer)\n\tlocal value = drop:GetAttribute(\"Value\") or 1\n\townerPlayer.leaderstats.Cash.Value += value\n\tdrop:Destroy()\nend\n```"
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
  "summary": "**11.3 — Collector** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Collector",
    "difficulty": "advanced",
    "description": "### Task\nCash у leaderstats; collector працює; дроп має Attribute Value.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Collector…",
        "options": [
          "Перетворює дроп на валюту",
          "Малює Sky",
          "Робіть Union даху",
          "Відкриває Avatar Editor"
        ],
        "correctAnswer": 0,
        "explanation": "Перетворює дроп на валюту"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Attribute Value на дропі…",
        "options": [
          "Скільки дасть монет",
          "Імʼя біому",
          "Volume",
          "ClockTime"
        ],
        "correctAnswer": 0,
        "explanation": "Скільки дасть монет"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Destroy після збору…",
        "options": [
          "Прибирає Part і запобігає подвійному збору",
          "Видаляє plot",
          "Вимикає dropper назавжди без логіки",
          "Дає Badge завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Прибирає Part і запобігає подвійному збору"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Ланцюг dropper→collector→Cash",
          "Повний шутер",
          "Blender",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Ланцюг dropper→collector→Cash"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Нарахування не тому гравцю…",
        "options": [
          "Баг ownership — правити",
          "Секретна фіча",
          "Дає Robux",
          "Норма tycoon"
        ],
        "correctAnswer": 0,
        "explanation": "Баг ownership — правити"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Cash vs Coins іменування…",
        "options": [
          "Домовитись одне імʼя на курс",
          "Обовʼязково 10 валют одразу",
          "Без IntValue",
          "Лише string"
        ],
        "correctAnswer": 0,
        "explanation": "Домовитись одне імʼя на курс"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Debounce collector…",
        "options": [
          "Іноді потрібен якщо Touched спамить",
          "Заборонений",
          "Видаляє Humanoid",
          "Ламає Anchored підлоги"
        ],
        "correctAnswer": 0,
        "explanation": "Іноді потрібен якщо Touched спамить"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Ланцюг без UI вже…",
        "options": [
          "Відчувається як tycoon-ядро",
          "Немає сенсу",
          "Заміна М1",
          "Заміна Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Відчувається як tycoon-ядро"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ підкрутити Value…",
        "options": [
          "Баланс доходу",
          "Видалити collector",
          "Видалити Cash",
          "Скасувати plot"
        ],
        "correctAnswer": 0,
        "explanation": "Баланс доходу"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Кнопки покупок будівель",
          "Тільки Sky",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Кнопки покупок будівель"
      }
    ]
  }
}

export const enLesson114 = {
  "lessonId": "lesson-roblox-11-4",
  "moduleId": "module-11",
  "order": 4,
  "title": "11.4 — Purchase buttons",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "Part-кнопка з ціною (Attribute Price / Billboard); Touched/Proximity → if cash ≥ price → unlock обʼєкт (зробити Visible/Parent з Storage) → сховати кнопку.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** Part-кнопка з ціною (Attribute Price / Billboard); Touched/Proximity → if cash ≥ price → unlock обʼєкт (зробити Visible/Parent з Storage) → сховати кнопку.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "≥3 кнопки: Wall / BetterDropper / PadDecor; покупки серверні; обʼєкти з ServerStorage `PlotItems`."
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
  "summary": "**11.4 — Purchase buttons** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Purchase buttons",
    "difficulty": "advanced",
    "description": "### Task\n≥3 кнопки: Wall / BetterDropper / PadDecor; покупки серверні; обʼєкти з ServerStorage `PlotItems`.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Кнопка покупки в tycoon…",
        "options": [
          "Відкриває елемент бази за валюту",
          "Лише змінює Sky",
          "Лише робить Negate",
          "Лише відкриває Toolbox випадково"
        ],
        "correctAnswer": 0,
        "explanation": "Відкриває елемент бази за валюту"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Тримання префабів у ServerStorage…",
        "options": [
          "Поки не куплені — не в світі",
          "Завжди видимі всім",
          "Видаляє Cash",
          "Вимикає dropper"
        ],
        "correctAnswer": 0,
        "explanation": "Поки не куплені — не в світі"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Після покупки кнопку…",
        "options": [
          "Ховаємо / Destroy щоб не купити двічі",
          "Дублюємо 100 разів",
          "Кладемо в Lighting",
          "Фарбуємо лише небо"
        ],
        "correctAnswer": 0,
        "explanation": "Ховаємо / Destroy щоб не купити двічі"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "≥3 працюючі покупки на plot",
          "Повний RPG квести",
          "Blender face",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "≥3 працюючі покупки на plot"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Перевірка ціни…",
        "options": [
          "На сервері",
          "Лише колір кнопки",
          "Лише Decal",
          "Лише Ambient"
        ],
        "correctAnswer": 0,
        "explanation": "На сервері"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "BetterDropper unlock…",
        "options": [
          "Може зменшити interval / підняти Value",
          "Обовʼязково видаляє collector",
          "Обовʼязково видаляє plot",
          "Обовʼязково вимикає Play"
        ],
        "correctAnswer": 0,
        "explanation": "Може зменшити interval / підняти Value"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Billboard ціни…",
        "options": [
          "Читабельність",
          "Заміна Cash",
          "Заміна Touched фізикою неба",
          "DataStore"
        ],
        "correctAnswer": 0,
        "explanation": "Читабельність"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Подвійна покупка одного…",
        "options": [
          "Баг — потрібен стан куплено",
          "Ідеал",
          "Дає Badge",
          "Дає Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Баг — потрібен стан куплено"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Звʼязок з симулятор-магазином…",
        "options": [
          "Та сама ідея canAfford, інший жанр-фрейм",
          "Повна протилежність без чисел",
          "Без сервера завжди",
          "Без Parts"
        ],
        "correctAnswer": 0,
        "explanation": "Та сама ідея canAfford, інший жанр-фрейм"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Апгрейд ланцюга / доходу",
          "Тільки Negate",
          "Тільки Ambient",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Апгрейд ланцюга / доходу"
      }
    ]
  }
}

export const enLesson115 = {
  "lessonId": "lesson-roblox-11-5",
  "moduleId": "module-11",
  "order": 5,
  "title": "11.5 — Income upgrades",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "рівні dropper (Lv1/Lv2); множник collector; кнопка Upgrade що дорожчає (price *= 1.5).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** рівні dropper (Lv1/Lv2); множник collector; кнопка Upgrade що дорожчає (price *= 1.5).\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "≥1 апгрейд рівня; видно різницю доходу до/після за 30 сек заміру."
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
  "summary": "**11.5 — Income upgrades** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Income upgrades",
    "difficulty": "advanced",
    "description": "### Task\n≥1 апгрейд рівня; видно різницю доходу до/після за 30 сек заміру.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Апгрейд доходу…",
        "options": [
          "Збільшує ефективність ланцюга",
          "Видаляє plot",
          "Робіть Negate",
          "Малює лише Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Збільшує ефективність ланцюга"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Замір 30 сек…",
        "options": [
          "Доказ що апгрейд працює",
          "Даремний",
          "Заміна рубрики",
          "Вимкнення Cash"
        ],
        "correctAnswer": 0,
        "explanation": "Доказ що апгрейд працює"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "price *= 1.5 …",
        "options": [
          "Дорожчання наступних рівнів",
          "Видалення кнопки",
          "Телепорт",
          "Смерть гравця"
        ],
        "correctAnswer": 0,
        "explanation": "Дорожчання наступних рівнів"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Видимий growth після апгрейду",
          "Повний шутер",
          "Blender",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Видимий growth після апгрейду"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Lv2 dropper…",
        "options": [
          "Інший interval/Value",
          "Обовʼязково новий жанр",
          "Обовʼязково новий Place",
          "Обовʼязково Blender модель"
        ],
        "correctAnswer": 0,
        "explanation": "Інший interval/Value"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Без апрейду tycoon…",
        "options": [
          "Швидко вичерпує інтерес",
          "Кращий завжди",
          "Дає DataStore",
          "Дає Badge сам"
        ],
        "correctAnswer": 0,
        "explanation": "Швидко вичерпує інтерес"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Стани рівня в Attribute…",
        "options": [
          "Зручно",
          "Неможливо",
          "Лише в HTML",
          "Лише в Excel"
        ],
        "correctAnswer": 0,
        "explanation": "Зручно"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Баланс занадто OP…",
        "options": [
          "Підняти ціни / зменшити Value",
          "Видалити collector",
          "Видалити учнів",
          "Вимкнути інтернет"
        ],
        "correctAnswer": 0,
        "explanation": "Підняти ціни / зменшити Value"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ третій рівень…",
        "options": [
          "Для сильних",
          "Для видалення М11",
          "Для скасування Cash",
          "Для Negate only"
        ],
        "correctAnswer": 0,
        "explanation": "Для сильних"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Rebirth lite",
          "Тільки Sky",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Rebirth lite"
      }
    ]
  }
}

export const enLesson116 = {
  "lessonId": "lesson-roblox-11-6",
  "moduleId": "module-11",
  "order": 6,
  "title": "11.6 — Rebirth lite",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "кнопка Rebirth: якщо cash ≥ дорого → обнулити базу/апгрейди → Rebirths+=1 → постійний бонус множника.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** кнопка Rebirth: якщо cash ≥ дорого → обнулити базу/апгрейди → Rebirths+=1 → постійний бонус множника.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Rebirths IntValue; множник `1 + Rebirths*0.1`; підтвердження print/UI «ти впевнений?» (просте двокнопкове GUI)."
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
  "summary": "**11.6 — Rebirth lite** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Rebirth lite",
    "difficulty": "advanced",
    "description": "### Task\nRebirths IntValue; множник `1 + Rebirths*0.1`; підтвердження print/UI «ти впевнений?» (просте двокнопкове GUI).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Rebirth…",
        "options": [
          "Скидає прогрес задля довгострокового бонусу",
          "Видаляє Roblox акаунт",
          "Робіть Negate",
          "Малює Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Скидає прогрес задля довгострокового бонусу"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Без порогу cash rebirth…",
        "options": [
          "Занадто легко / ламка економіка",
          "Ідеал",
          "Дає Plugin",
          "Вимикає Play"
        ],
        "correctAnswer": 0,
        "explanation": "Занадто легко / ламка економіка"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Множник від Rebirths…",
        "options": [
          "Нагорода за скидання",
          "Покарання без сенсу",
          "Тип Union",
          "Face Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Нагорода за скидання"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Працюючий rebirth loop",
          "Повний MMO",
          "Blender face",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Працюючий rebirth loop"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Підтвердження GUI…",
        "options": [
          "Захисни від міскліку",
          "Заборонене",
          "Заміна dropper",
          "Заміна plot"
        ],
        "correctAnswer": 0,
        "explanation": "Захисни від міскліку"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Обнулити кнопки…",
        "options": [
          "Частина скидання бази",
          "Непотрібно ніколи",
          "Видаляє Cash назавжди без rebirth",
          "Вимикає сервер"
        ],
        "correctAnswer": 0,
        "explanation": "Частина скидання бази"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Звʼязок з Logika Tycoon модулем…",
        "options": [
          "Схожа прогресія: база→дохід→магазин→rebirth",
          "Повна відмова від економіки",
          "Лише обby",
          "Лише відео"
        ],
        "correctAnswer": 0,
        "explanation": "Схожа прогресія: база→дохід→магазин→rebirth"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Rebirths=0 на старті…",
        "options": [
          "Так",
          "Ні, одразу 100",
          "Ні, відʼємні",
          "Ні, string"
        ],
        "correctAnswer": 0,
        "explanation": "Так"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Дз виміряти дохід до/після rebirth…",
        "options": [
          "Доказ бонусу",
          "Даремне",
          "Видаляє множник",
          "Скасовує Cash"
        ],
        "correctAnswer": 0,
        "explanation": "Доказ бонусу"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Збереження прогресу кнопок (сесія/див. DataStore lite)",
          "Тільки Ambient",
          "Тільки Negate",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Збереження прогресу кнопок (сесія/див. DataStore lite)"
      }
    ]
  }
}

export const enLesson117 = {
  "lessonId": "lesson-roblox-11-7",
  "moduleId": "module-11",
  "order": 7,
  "title": "11.7 — Saving progress",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зберегти куплені кнопки + Rebirths + Cash (обережно з бюджетом DataStore)..",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** зберегти куплені кнопки + Rebirths + Cash (обережно з бюджетом DataStore)..\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
  "summary": "**11.7 — Saving progress** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Saving progress",
    "difficulty": "advanced",
    "description": "### Task\nComplete the steps for “Saving progress” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "DataStore потрібен щоб…",
        "options": [
          "Памʼятати прогрес між сесіями",
          "Малювати Terrain",
          "Робіть Negate",
          "Крутити Snap"
        ],
        "correctAnswer": 0,
        "explanation": "Памʼятати прогрес між сесіями"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`pcall` навколо DataStore…",
        "options": [
          "Ловить помилки API",
          "Видаляє plot",
          "Дає Robux",
          "Відкриває Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Ловить помилки API"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Save кожну секунду…",
        "options": [
          "Погана ідея (ліміти)",
          "Найкраща всегда",
          "Обовʼязок Roblox law",
          "Заміна dropper"
        ],
        "correctAnswer": 0,
        "explanation": "Погана ідея (ліміти)"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "ownedButtons у сейві…",
        "options": [
          "Які unlock вже куплені",
          "Список друзів",
          "Список плагінів",
          "Список неба"
        ],
        "correctAnswer": 0,
        "explanation": "Які unlock вже куплені"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Load/save ключового прогресу",
          "Повний античит AAA",
          "Blender",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Load/save ключового прогресу"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "PlayerRemoving…",
        "options": [
          "Момент зберегти",
          "Момент видалити акаунт",
          "Момент вимкнути інтернет школи",
          "Момент Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Момент зберегти"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Якщо API Services вимкнені в Studio…",
        "options": [
          "Увімкнути або здати сесійну памʼять з поясненням",
          "Кинути курс",
          "Видалити plot",
          "Купити Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Увімкнути або здати сесійну памʼять з поясненням"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Це підготовка до М13…",
        "options": [
          "Так",
          "Ні ніколи",
          "Лише для obby",
          "Лише для Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Так"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Не зберігати весь Workspace…",
        "options": [
          "Зберігаємо дані прогресу, не всі Parts сліпо",
          "Обовʼязково кожен Part Part",
          "Обовʼязково Sky texture bytes",
          "Обовʼязково мікрофон"
        ],
        "correctAnswer": 0,
        "explanation": "Зберігаємо дані прогресу, не всі Parts сліпо"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Здача Tycoon",
          "Тільки Sky",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Здача Tycoon"
      }
    ]
  }
}

export const enLesson118 = {
  "lessonId": "lesson-roblox-11-8",
  "moduleId": "module-11",
  "order": 8,
  "title": "11.8 — Checkpoint: Tycoon presentation",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "Understand “Checkpoint: Tycoon presentation”",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** Master “Checkpoint: Tycoon presentation”.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
  "summary": "**11.8 — Checkpoint: Tycoon presentation** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Checkpoint: Tycoon presentation",
    "difficulty": "advanced",
    "description": "### Task\nComplete the steps for “Checkpoint: Tycoon presentation” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Ядро М11…",
        "options": [
          "Ланцюг ділянка→дроп→каса→покупки→прогресія",
          "Лише меню",
          "Лише Negate",
          "Лише відео"
        ],
        "correctAnswer": 0,
        "explanation": "Ланцюг ділянка→дроп→каса→покупки→прогресія"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Далі М12…",
        "options": [
          "Tools, бій/взаємодія, глибший GUI",
          "Скасування Cash",
          "Скасування Parts",
          "НМТ історія"
        ],
        "correctAnswer": 0,
        "explanation": "Tools, бій/взаємодія, глибший GUI"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Найчастіший баг tycoon…",
        "options": [
          "Ownership / подвійні покупки / лаг дропів",
          "Надто гарний Billboard",
          "Правильні імена",
          "Чистий Explorer"
        ],
        "correctAnswer": 0,
        "explanation": "Ownership / подвійні покупки / лаг дропів"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Rebirth lite достатньо якщо…",
        "options": [
          "Є скидання + бонус",
          "Є лише кнопка без коду",
          "Є лише Sky",
          "Є лише Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Є скидання + бонус"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Презентація має показати…",
        "options": [
          "Повний економічний loop за 1–2 хв",
          "Лише скрін неба",
          "Лише Word",
          "Лише стікер"
        ],
        "correctAnswer": 0,
        "explanation": "Повний економічний loop за 1–2 хв"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Ліміт дропів…",
        "options": [
          "Критерій якості",
          "Шкідливий завжди",
          "Заборонений",
          "Дає Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Критерій якості"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Logika/JustSmart ідеї tycoon…",
        "options": [
          "Взяли структуру жанру, але після міцного Lua",
          "Скопіювали без змін 1:1 усі 64 уроки",
          "Відкинули економіку",
          "Відкинули plot"
        ],
        "correctAnswer": 0,
        "explanation": "Взяли структуру жанру, але після міцного Lua"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Save пояснити словами…",
        "options": [
          "Що саме зберігається",
          "Не потрібно",
          "Лише англійською есе 10 стор",
          "Лише криком"
        ],
        "correctAnswer": 0,
        "explanation": "Що саме зберігається"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "М12 знадобиться бо…",
        "options": [
          "Зброя/інструменти і міцніший UI в інших жанрах",
          "Tycoon скасовує Tools назавжди",
          "GUI більше не існує",
          "Lua скасовується"
        ],
        "correctAnswer": 0,
        "explanation": "Зброя/інструменти і міцніший UI в інших жанрах"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Доказ здачі…",
        "options": [
          "Інший учень пограв твій plot і зрозумів loop",
          "Лише нік",
          "Лише PDF",
          "Лише Baseplate"
        ],
        "correctAnswer": 0,
        "explanation": "Інший учень пограв твій plot і зрозумів loop"
      }
    ]
  }
}
