/** Roblox v2 Module 07 UK — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE // reserved
void MC

export const ukLesson71 = {
  "lessonId": "lesson-roblox-7-1",
  "moduleId": "module-07",
  "order": 1,
  "title": "7.1 — Навіщо цикли + for",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "повторити print N разів без копіпасту.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** повторити print N разів без копіпасту.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nfor i = 1, 5 do\n\tprint(\"Крок\", i)\nend\n```"
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
  "summary": "Урок **7.1 — Навіщо цикли + for** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Навіщо цикли + for",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Навіщо цикли + for» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson72 = {
  "lessonId": "lesson-roblox-7-2",
  "moduleId": "module-07",
  "order": 2,
  "title": "7.2 — for і спавн Part",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "`for i = 1, 10, 2` і створення Part у циклі.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** `for i = 1, 10, 2` і створення Part у циклі.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Ряд з 5–8 блоків «фабрика»."
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nfor i = 1, 5 do\n\tlocal p = Instance.new(\"Part\")\n\tp.Size = Vector3.new(2, 1, 2)\n\tp.Position = Vector3.new(i * 3, 5, 0)\n\tp.Anchored = true\n\tp.Name = \"Brick_\" .. i\n\tp.Parent = workspace\nend\n```"
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
  "summary": "Урок **7.2 — for і спавн Part** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: for і спавн Part",
    "difficulty": "intermediate",
    "description": "### Завдання\nРяд з 5–8 блоків «фабрика».\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson73 = {
  "lessonId": "lesson-roblox-7-3",
  "moduleId": "module-07",
  "order": 3,
  "title": "7.3 — while і безпека",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "while з умовою; **завжди** task.wait у ігрових циклах.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** while з умовою; **завжди** task.wait у ігрових циклах.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal t = 5\nwhile t > 0 do\n\tprint(\"Залишилось\", t)\n\tt = t - 1\n\ttask.wait(1)\nend\nprint(\"Старт!\")\n```"
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
  "summary": "Урок **7.3 — while і безпека** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: while і безпека",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «while і безпека» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson74 = {
  "lessonId": "lesson-roblox-7-4",
  "moduleId": "module-07",
  "order": 4,
  "title": "7.4 — Таймер у грі",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "відлік змінює колір Part або TextLabel (простийLocalScript опційно).",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** відлік змінює колір Part або TextLabel (простийLocalScript опційно).\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
  "summary": "Урок **7.4 — Таймер у грі** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Таймер у грі",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Таймер у грі» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Якщо щось зникло — перевір, чи зберіг Place."
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

export const ukLesson75 = {
  "lessonId": "lesson-roblox-7-5",
  "moduleId": "module-07",
  "order": 5,
  "title": "7.5 — Цикл + if: фільтр",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "у for спавнити цеглу лише якщо `i % 2 == 0` (парні) або пропускати небезпечні індекси.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** у for спавнити цеглу лише якщо `i % 2 == 0` (парні) або пропускати небезпечні індекси.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nfor i = 1, 10 do\n\tif i % 2 == 0 then\n\t\tlocal p = Instance.new(\"Part\")\n\t\tp.Position = Vector3.new(i * 2, 6, 10)\n\t\tp.Anchored = true\n\t\tp.Color = Color3.fromRGB(255, 200, 0)\n\t\tp.Parent = workspace\n\tend\nend\n```"
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
  "summary": "Урок **7.5 — Цикл + if: фільтр** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Цикл + if: фільтр",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Цикл + if: фільтр» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson76 = {
  "lessonId": "lesson-roblox-7-6",
  "moduleId": "module-07",
  "order": 6,
  "title": "7.6 — Проєкт: Фабрика блоків",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "кнопка ClickDetector запускає for-спавн хвилі N блоків; while/for таймер між хвилями (спростити: одна хвиля + відлік до старту).",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** кнопка ClickDetector запускає for-спавн хвилі N блоків; while/for таймер між хвилями (спростити: одна хвиля + відлік до старту).\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "title": "Кроки практики",
        "content": "- [ ] for створює ≥5 Parts з іменами - [ ] Parts Anchored у Folder `FactoryOutput` - [ ] Є відлік до старту (while або for+wait) - [ ] Є хоча б один if (колір/парність/ліміт) - [ ] Немає зависання"
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
  "summary": "Урок **7.6 — Проєкт: Фабрика блоків** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Проєкт: Фабрика блоків",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Проєкт: Фабрика блоків» у своєму Place.\n\n\n### Кроки\n- [ ] for створює ≥5 Parts з іменами - [ ] Parts Anchored у Folder `FactoryOutput` - [ ] Є відлік до старту (while або for+wait) - [ ] Є хоча б один if (колір/парність/ліміт) - [ ] Немає зависання\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
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
