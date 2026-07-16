/** Roblox v2 Module 12 EN — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE
void MC

export const enLesson121 = {
  "lessonId": "lesson-roblox-12-1",
  "moduleId": "module-12",
  "order": 1,
  "title": "12.1 — What is a Tool",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "створити Tool з Handle; покласти в StarterPack; зрозуміти Equipped/Unequipped.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** створити Tool з Handle; покласти в StarterPack; зрозуміти Equipped/Unequipped.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Tool `Hammer` або `Sword` (Part Handle + модель); зʼявляється в хотбарі."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Шаблон (LocalScript у Tool)\n\n```lua\nlocal tool = script.Parent\n\ntool.Equipped:Connect(function()\n\tprint(tool.Name .. \" equipped\")\nend)\n\ntool.Unequipped:Connect(function()\n\tprint(tool.Name .. \" unequipped\")\nend)\n```"
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
  "summary": "**12.1 — What is a Tool** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: What is a Tool",
    "difficulty": "advanced",
    "description": "### Task\nTool `Hammer` або `Sword` (Part Handle + модель); зʼявляється в хотбарі.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Tool у Roblox — це…",
        "options": [
          "Предмет який гравець тримає в хотбарі/руці",
          "Тип Sky",
          "NegatePart",
          "Terrain brush"
        ],
        "correctAnswer": 0,
        "explanation": "Предмет який гравець тримає в хотбарі/руці"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Handle потрібен щоб…",
        "options": [
          "Tool коректно еквіпився (база)",
          "Видалити Workspace",
          "Вимкнути Output",
          "Зробити DataStore"
        ],
        "correctAnswer": 0,
        "explanation": "Tool коректно еквіпився (база)"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "StarterPack…",
        "options": [
          "Дає Tool гравцю при старті",
          "Малює небо",
          "Робіть Union",
          "Відкриває Avatar Editor обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "Дає Tool гравцю при старті"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Equipped подія…",
        "options": [
          "Коли взяли Tool у руки",
          "Коли купили Robux",
          "Коли видалили Place",
          "Коли змінили біом словами"
        ],
        "correctAnswer": 0,
        "explanation": "Коли взяли Tool у руки"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Свій Tool у хотбарі",
          "Повний Tycoon",
          "Blender face",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Свій Tool у хотбарі"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Без Handle типові проблеми…",
        "options": [
          "Tool може некоректно працювати",
          "Завжди ідеально",
          "Дає Badge",
          "Зберігає Cash"
        ],
        "correctAnswer": 0,
        "explanation": "Tool може некоректно працювати"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Unequipped…",
        "options": [
          "Сховали/прибрали Tool",
          "Видалили акаунт",
          "Вимкнули Wi-Fi",
          "Зробили Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Сховали/прибрали Tool"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Tool vs звичайний Part у Workspace…",
        "options": [
          "Tool має lifecycle екіпірування",
          "Немає різниці ніколи",
          "Part завжди в хотбарі",
          "Tool невидимо завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Tool має lifecycle екіпірування"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ прикрасити Tool…",
        "options": [
          "Колір/декор без поломки Handle",
          "Видалити Handle",
          "Видалити StarterPack",
          "Скасувати print"
        ],
        "correctAnswer": 0,
        "explanation": "Колір/декор без поломки Handle"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Активація Tool (клік)",
          "Тільки Ambient",
          "Тільки Decal",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Активація Tool (клік)"
      }
    ]
  }
}

export const enLesson122 = {
  "lessonId": "lesson-roblox-12-2",
  "moduleId": "module-12",
  "order": 2,
  "title": "12.2 — Activated: tool acts",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "`Tool.Activated` → функція дії (хитання: print + короткий debounce + опційно анімація пізніше).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** `Tool.Activated` → функція дії (хитання: print + короткий debounce + опційно анімація пізніше).\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Hammer «бʼє»: якщо Raycast/ Touched під час удару по Part з тегом Breakable — Part Destroy або HP--. Для простоти: **клік Activated → print + звук + cooldown**."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Шаблон (Script або LocalScript у Tool — старт без урану)\n\n```lua\nlocal tool = script.Parent\nlocal cooldown = false\nlocal COOLDOWN_SEC = 0.6\n\ntool.Activated:Connect(function()\n\tif cooldown then\n\t\treturn\n\tend\n\tcooldown = true\n\tprint(tool.Name .. \" swing!\")\n\t-- TODO 12.3: тут викликати серверний урон\n\ttask.wait(COOLDOWN_SEC)\n\tcooldown = false\nend)\n```"
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
  "summary": "**12.2 — Activated: tool acts** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Activated: tool acts",
    "difficulty": "advanced",
    "description": "### Task\nHammer «бʼє»: якщо Raycast/ Touched під час удару по Part з тегом Breakable — Part Destroy або HP--. Для простоти: **клік Activated → print + звук + cooldown**.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Activated спрацьовує коли…",
        "options": [
          "Гравець клікає з екіпованим Tool",
          "Відкриває Toolbox",
          "Міняє Sky",
          "Робить Negate сам по собі"
        ],
        "correctAnswer": 0,
        "explanation": "Гравець клікає з екіпованим Tool"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Cooldown потрібен щоб…",
        "options": [
          "Не спамити дію",
          "Видалити Tool",
          "Вимкнути Play",
          "Зберегти PDF"
        ],
        "correctAnswer": 0,
        "explanation": "Не спамити дію"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Tool з дією Activated",
          "Повний DataStore galaxy",
          "Blender",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Tool з дією Activated"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Звук удару…",
        "options": [
          "Фідбек",
          "Заміна Handle",
          "Заміна StarterPack",
          "DataStore"
        ],
        "correctAnswer": 0,
        "explanation": "Фідбек"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "LocalScript vs Script на Tool…",
        "options": [
          "Обережно: урон краще підтверджувати на сервері (далі)",
          "Все завжди лише локально й нараховувати HP всім світом без сервера",
          "Script заборонений у Tool назавжди",
          "LocalScript видаляє Tool"
        ],
        "correctAnswer": 0,
        "explanation": "Обережно: урон краще підтверджувати на сервері (далі)"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Без debounce Activated…",
        "options": [
          "Спам подій",
          "Кращий DPS всегда етичний",
          "Дає Robux",
          "Відкриває Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Спам подій"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "ДЗ Breakable…",
        "options": [
          "Parts для наступного уроку урону",
          "Видалити Tool",
          "Видалити Handle",
          "Скасувати Activated"
        ],
        "correctAnswer": 0,
        "explanation": "Parts для наступного уроку урону"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "print на Activated на старті…",
        "options": [
          "Доводить що подія жива",
          "Заборонений",
          "Ламає хотбар",
          "Вимикає камеру"
        ],
        "correctAnswer": 0,
        "explanation": "Доводить що подія жива"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "М12 будує на подіях М8…",
        "options": [
          "Так",
          "Ні",
          "Лише на Negate",
          "Лише на Atmosphere"
        ],
        "correctAnswer": 0,
        "explanation": "Так"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Урон / ламання з серверною перевіркою",
          "Тільки Sky",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Урон / ламання з серверною перевіркою"
      }
    ]
  }
}

export const enLesson123 = {
  "lessonId": "lesson-roblox-12-3",
  "moduleId": "module-12",
  "order": 3,
  "title": "12.3 — Damage and Humanoid",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "сервер обробляє удар: зменшує Humanoid.Health або HP Attribute на NPC/манекені.",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** сервер обробляє удар: зменшує Humanoid.Health або HP Attribute на NPC/манекені.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Манекен `TrainingDummy` з Humanoid; Tool завдає 10 HP з cooldown; смерть dummy reset HP через 3 сек."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Шаблон (Script у ServerScriptService — серверний урон по dummy)\n\n```lua\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\")\nlocal dealDamage = Instance.new(\"RemoteEvent\")\ndealDamage.Name = \"DealDummyDamage\"\ndealDamage.Parent = ReplicatedStorage\n\nlocal DAMAGE = 10\nlocal RANGE = 12\n\ndealDamage.OnServerEvent:Connect(function(player)\n\tlocal character = player.Character\n\tif not character then\n\t\treturn\n\tend\n\tlocal root = character:FindFirstChild(\"HumanoidRootPart\")\n\tlocal dummy = workspace:FindFirstChild(\"TrainingDummy\")\n\tif not root or not dummy then\n\t\treturn\n\tend\n\tlocal humanoid = dummy:FindFirstChildOfClass(\"Humanoid\")\n\tlocal torso = dummy.PrimaryPart or dummy:FindFirstChild(\"HumanoidRootPart\") or dummy:FindFirstChildWhichIsA(\"BasePart\")\n\tif not humanoid or not torso then\n\t\treturn\n\tend\n\tif (root.Position - torso.Position).Magnitude > RANGE then\n\t\treturn\n\tend\n\thumanoid.Health = math.max(0, humanoid.Health - DAMAGE)\n\tif humanoid.Health <= 0 then\n\t\ttask.delay(3, function()\n\t\t\tif humanoid then\n\t\t\t\thumanoid.Health = humanoid.MaxHealth\n\t\t\tend\n\t\tend)\n\tend\nend)\n```"
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
  "summary": "**12.3 — Damage and Humanoid** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Damage and Humanoid",
    "difficulty": "advanced",
    "description": "### Task\nМанекен `TrainingDummy` з Humanoid; Tool завдає 10 HP з cooldown; смерть dummy reset HP через 3 сек.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Humanoid.Health…",
        "options": [
          "Здоровʼя персонажа/манекена",
          "Ціна Tool",
          "Volume",
          "ClockTime"
        ],
        "correctAnswer": 0,
        "explanation": "Здоровʼя персонажа/манекена"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Урон на сервері…",
        "options": [
          "Базова чесність",
          "Гірше завжди",
          "Видаляє Tool",
          "Вимикає Output"
        ],
        "correctAnswer": 0,
        "explanation": "Базова чесність"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "TrainingDummy…",
        "options": [
          "Безпечна мішень для навчання",
          "Обовʼязковий реальний PvP без згоди",
          "NegatePart",
          "Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Безпечна мішень для навчання"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Tool що бʼє dummy",
          "Повний MMO",
          "Blender face",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Tool що бʼє dummy"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Reset HP dummy…",
        "options": [
          "Можна тренуватись знову",
          "Заборонено",
          "Видаляє Place",
          "Дає Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Можна тренуватись знову"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Hit detection просто…",
        "options": [
          "Touched під час удару / короткий Hitbox Part",
          "Обовʼязковий AAA ray за 1 урок",
          "Обовʼязковий ML AI",
          "Обовʼязковий Blender cloth"
        ],
        "correctAnswer": 0,
        "explanation": "Touched під час удару / короткий Hitbox Part"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Якщо урон іде крізь пів карти…",
        "options": [
          "Звужений hitbox / перевірка дистанції",
          "Ідеал",
          "Дає Badge",
          "Зберігає DataStore"
        ],
        "correctAnswer": 0,
        "explanation": "Звужений hitbox / перевірка дистанції"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "PvP у групі дітей…",
        "options": [
          "Лише з правилами викладача / краще PvE",
          "Завжди вмикати без розмов",
          "Єдина мета курсу",
          "Заміна всіх модулів"
        ],
        "correctAnswer": 0,
        "explanation": "Лише з правилами викладача / краще PvE"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ другий tool зі слабшим уроном…",
        "options": [
          "Порівняння балансу",
          "Видалити dummy",
          "Видалити Health",
          "Скасувати cooldown"
        ],
        "correctAnswer": 0,
        "explanation": "Порівняння балансу"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "GUI HP / статус",
          "Тільки Ambient",
          "Тільки Decal",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "GUI HP / статус"
      }
    ]
  }
}

export const enLesson124 = {
  "lessonId": "lesson-roblox-12-4",
  "moduleId": "module-12",
  "order": 4,
  "title": "12.4 — HP GUI + Tools shop",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "ScreenGui з Frame HP + магазин Tool за валюту (whitelist на сервері). Не довіряти клієнту імʼя «AdminSword».",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** ScreenGui з Frame HP + магазин Tool за валюту (whitelist на сервері). Не довіряти клієнту імʼя «AdminSword».\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "HP bar для гравця + whitelist `ToolsForSale` + Remote BuyTool → Tool у Backpack після покупки."
      },
      {
        "title": "How to work",
        "content": "Keep **Roblox Studio** open next to this page.\n\n1. Follow the theory steps first  \n2. Complete the practice checklist  \n3. Then try the challenge  \n\nIf something fails — open **Output**, check **names** in Explorer, and press **Play**."
      },
      {
        "title": "Code template (paste into Studio)",
        "content": "Tap **Copy** → paste into a **Script** or **LocalScript** in Studio. Change **numbers, strings, colors** first — do not delete lines you do not understand yet.\n\n### Шаблон HP (LocalScript у Fill-Frame)\n\n```lua\nlocal player = game.Players.LocalPlayer\nlocal bar = script.Parent -- Frame Fill\nlocal maxWidth = bar.Size.X.Offset\nif maxWidth <= 0 then\n\tmaxWidth = 200\n\tbar.Size = UDim2.new(0, maxWidth, bar.Size.Y.Scale, bar.Size.Y.Offset)\nend\n\nlocal function bind(humanoid)\n\tlocal function refresh()\n\t\tlocal ratio = math.clamp(humanoid.Health / humanoid.MaxHealth, 0, 1)\n\t\tbar.Size = UDim2.new(0, maxWidth * ratio, bar.Size.Y.Scale, bar.Size.Y.Offset)\n\t\tbar.BackgroundColor3 = ratio < 0.3 and Color3.fromRGB(220, 60, 60) or Color3.fromRGB(60, 200, 90)\n\tend\n\thumanoid.HealthChanged:Connect(refresh)\n\trefresh()\nend\n\nlocal function onCharacter(character)\n\tlocal humanoid = character:WaitForChild(\"Humanoid\")\n\tbind(humanoid)\nend\n\nif player.Character then\n\tonCharacter(player.Character)\nend\nplayer.CharacterAdded:Connect(onCharacter)\n```"
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
  "summary": "**12.4 — HP GUI + Tools shop** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: HP GUI + Tools shop",
    "difficulty": "advanced",
    "description": "### Task\nHP bar для гравця + whitelist `ToolsForSale` + Remote BuyTool → Tool у Backpack після покупки.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "HealthChanged…",
        "options": [
          "Подія зміни HP",
          "Подія Negate",
          "Подія Publish",
          "Подія Terrain"
        ],
        "correctAnswer": 0,
        "explanation": "Подія зміни HP"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Ширина бара пропорційна…",
        "options": [
          "hp/maxHp",
          "Кількості друзів",
          "Ціні Robux",
          "Номеру уроку"
        ],
        "correctAnswer": 0,
        "explanation": "hp/maxHp"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Whitelist імен Tool…",
        "options": [
          "Античит-гігієна магазину",
          "Даремна",
          "Малює Sky",
          "Робить Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Античит-гігієна магазину"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Неправильна назва з клієнта…",
        "options": [
          "Сервер відмовляє",
          "Обовʼязково видає Admin",
          "Видаляє Place",
          "Дає Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Сервер відмовляє"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "LocalScript для HP bar…",
        "options": [
          "Типово на клієнті",
          "Заборонений",
          "Замінює ServerStorage",
          "Робіть Union"
        ],
        "correctAnswer": 0,
        "explanation": "Типово на клієнті"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Backpack vs StarterPack…",
        "options": [
          "StarterPack — старт; Backpack — поточні інструменти",
          "Немає різниці ніколи",
          "Backpack лише для неба",
          "StarterPack лише для Negate"
        ],
        "correctAnswer": 0,
        "explanation": "StarterPack — старт; Backpack — поточні інструменти"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "HP GUI + ≥1 покупка Tool",
          "Повний MMO",
          "Blender",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "HP GUI + ≥1 покупка Tool"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Low HP червоний…",
        "options": [
          "UX фідбек",
          "Ламає Humanoid",
          "Видаляє Tool",
          "Вимикає Play"
        ],
        "correctAnswer": 0,
        "explanation": "UX фідбек"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Звʼязок Remote з М10…",
        "options": [
          "Той самий патерн покупок",
          "Перший раз Remote у курсі",
          "Remote скасовано",
          "Remote лише для Lighting"
        ],
        "correctAnswer": 0,
        "explanation": "Той самий патерн покупок"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Збірка арени/майстерні з juice",
          "Тільки Ambient",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Збірка арени/майстерні з juice"
      }
    ]
  }
}

export const enLesson125 = {
  "lessonId": "lesson-roblox-12-5",
  "moduleId": "module-12",
  "order": 5,
  "title": "12.5 — Arena build + juice",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "playable loop 3–5 хв (tool → dummy/ящики → GUI → кращий tool) + 3 «соки» фідбеку (звук, спалах, легкий Tween).",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** playable loop 3–5 хв (tool → dummy/ящики → GUI → кращий tool) + 3 «соки» фідбеку (звук, спалах, легкий Tween).\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
      },
      {
        "title": "What you will build",
        "content": "Playable арена/майстерня + ≥3 juice-ефекти (звук хіту, колір dummy, Tween UI)."
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
  "summary": "**12.5 — Arena build + juice** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Arena build + juice",
    "difficulty": "advanced",
    "description": "### Task\nPlayable арена/майстерня + ≥3 juice-ефекти (звук хіту, колір dummy, Tween UI).\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "Мета збірки…",
        "options": [
          "Цілісний loop інструмента",
          "Лише один print",
          "Лише Baseplate",
          "Лише PDF"
        ],
        "correctAnswer": 0,
        "explanation": "Цілісний loop інструмента"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Juice у геймдева…",
        "options": [
          "Відчуття відгуку на дію",
          "Видалення ігрової логіки",
          "Negate only",
          "PDF only"
        ],
        "correctAnswer": 0,
        "explanation": "Відчуття відгуку на дію"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Звук хіту…",
        "options": [
          "Миттєвий фідбек",
          "Заміна урону числами завжди",
          "Вимкнення Tool",
          "Вимкнення GUI"
        ],
        "correctAnswer": 0,
        "explanation": "Миттєвий фідбек"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Playable loop + ≥3 juice",
          "Порожній Baseplate",
          "Blender cloth",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Playable loop + ≥3 juice"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Не переборщити juice…",
        "options": [
          "3 чіткі ефекти краще 30 хаосу",
          "Чим більше спалахів тим завжди краще",
          "Volume завжди 10",
          "Tween 5 хв на клік"
        ],
        "correctAnswer": 0,
        "explanation": "3 чіткі ефекти краще 30 хаосу"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "М12 зʼєднує…",
        "options": [
          "Tools + GUI + серверні покупки",
          "Лише Negate",
          "Лише Atmosphere",
          "Лише відео"
        ],
        "correctAnswer": 0,
        "explanation": "Tools + GUI + серверні покупки"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Парний playtest…",
        "options": [
          "Знайти баги UI/урону",
          "Видалити чужий Place",
          "Вимкнути мікрофон назавжди",
          "Забрати Tool ІРЛ"
        ],
        "correctAnswer": 0,
        "explanation": "Знайти баги UI/урону"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Якщо loop «порожній»…",
        "options": [
          "Додати мету / монети / кращий tool / juice",
          "Видалити Tool",
          "Видалити GUI",
          "Вимкнути сервер"
        ],
        "correctAnswer": 0,
        "explanation": "Додати мету / монети / кращий tool / juice"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "PvP…",
        "options": [
          "Не обовʼязок М12",
          "Єдиний критерій",
          "Без правил завжди",
          "Заміна dummy забороною"
        ],
        "correctAnswer": 0,
        "explanation": "Не обовʼязок М12"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Чекпоінт-презентація М12",
          "Тільки Negate",
          "Тільки Ambient",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Чекпоінт-презентація М12"
      }
    ]
  }
}

export const enLesson126 = {
  "lessonId": "lesson-roblox-12-6",
  "moduleId": "module-12",
  "order": 6,
  "title": "12.6 — Checkpoint: Tools presentation",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "Understand “Checkpoint: Tools presentation”",
    "Build the result in Roblox Studio",
    "Pass the quiz with ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Today’s goal",
        "content": "**Goal:** Master “Checkpoint: Tools presentation”.\n\nCourse phase: **Game Mechanics**.\n\n**Your plan:**\n1. Read the short theory (keep Studio open)\n2. Complete the practice steps\n3. Pass the quiz (≥70%)\n4. Do the homework"
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
  "summary": "**12.6 — Checkpoint: Tools presentation** is done when your Place result exists, practice is marked, and the quiz is ≥70%. Then the next lesson unlocks.",
  "practiceTask": {
    "title": "Practice: Checkpoint: Tools presentation",
    "difficulty": "advanced",
    "description": "### Task\nComplete the steps for “Checkpoint: Tools presentation” in your Place.\n\n\n### When done\n1. Save the Place  \n2. Check in **Play**  \n3. Tap “Studio practice finished” below",
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
        "question": "М12 результат…",
        "options": [
          "Інструмент + UI + безпечніша покупка в loop",
          "Лише Baseplate",
          "Лише PDF",
          "Лише нік"
        ],
        "correctAnswer": 0,
        "explanation": "Інструмент + UI + безпечніша покупка в loop"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Далі М13…",
        "options": [
          "Фіналка, polish, publish, showcase",
          "Скасування всіх місць",
          "Тільки Negate",
          "Тільки НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Фіналка, polish, publish, showcase"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Whitelist…",
        "options": [
          "Ключовий safety skill",
          "Непотрібний",
          "Лише для Terrain",
          "Лише для Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Ключовий safety skill"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Dummy PvE…",
        "options": [
          "Достатньо для здачі",
          "Не зараховується ніколи",
          "Заміна всього GUI",
          "Заміна Tool Handle"
        ],
        "correctAnswer": 0,
        "explanation": "Достатньо для здачі"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Пояснити Equipped/Activated…",
        "options": [
          "Критерій розуміння",
          "Заборонено",
          "Заміна Place",
          "Дає Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Критерій розуміння"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Фаза D майже завершена…",
        "options": [
          "Жанри+інструменти зібрані",
          "Lua не починали",
          "Моделювання не починали",
          "Тестів не було"
        ],
        "correctAnswer": 0,
        "explanation": "Жанри+інструменти зібрані"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Фіналка М13 дозволить…",
        "options": [
          "Обрати жанр і допиляти гру",
          "Видалити всі навички",
          "Лише дивитись відео",
          "Лише писати есе без Studio"
        ],
        "correctAnswer": 0,
        "explanation": "Обрати жанр і допиляти гру"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Juice на здачі…",
        "options": [
          "Плюс до відчуття якості",
          "Єдина вимога без Tool",
          "Заміна урону",
          "Заміна GUI без бару"
        ],
        "correctAnswer": 0,
        "explanation": "Плюс до відчуття якості"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Найкращий доказ…",
        "options": [
          "Інший учень пограв loop",
          "Лише скрін хотбара",
          "Лише Word",
          "Лише стікер"
        ],
        "correctAnswer": 0,
        "explanation": "Інший учень пограв loop"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Тізер релізу…",
        "options": [
          "Баги, UX, publish, презентація",
          "Видалення Publish з Roblox",
          "Скасування Showcase",
          "Скасування сертифіката"
        ],
        "correctAnswer": 0,
        "explanation": "Баги, UX, publish, презентація"
      }
    ]
  }
}
