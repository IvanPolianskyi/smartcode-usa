/** Roblox v2 Module 06 UK — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE // reserved
void MC

export const ukLesson61 = {
  "lessonId": "lesson-roblox-6-1",
  "moduleId": "module-06",
  "order": 1,
  "title": "6.1 — Порівняння і boolean",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "`>`, `<`, `==`, `~=`; результат порівняння в Output.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** `>`, `<`, `==`, `~=`; результат порівняння в Output.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal score = 10\nprint(score > 5)\nprint(score == 10)\nprint(score ~= 0)\n```"
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
  "summary": "Урок **6.1 — Порівняння і boolean** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Порівняння і boolean",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Порівняння і boolean» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson62 = {
  "lessonId": "lesson-roblox-6-2",
  "moduleId": "module-06",
  "order": 2,
  "title": "6.2 — if then end",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "перша гілка рішення.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** перша гілка рішення.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Скрипт перевіряє змінну `coins` (або читає leaderstats) і друкує різні повідомлення лише якщо вистачає."
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal coins = 15\nif coins >= 10 then\n\tprint(\"Можна відкрити двері!\")\nend\n```"
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
  "summary": "Урок **6.2 — if then end** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: if then end",
    "difficulty": "intermediate",
    "description": "### Завдання\nСкрипт перевіряє змінну `coins` (або читає leaderstats) і друкує різні повідомлення лише якщо вистачає.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson63 = {
  "lessonId": "lesson-roblox-6-3",
  "moduleId": "module-06",
  "order": 3,
  "title": "6.3 — else і elseif",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "гілки «інакше» / «інакше якщо».",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** гілки «інакше» / «інакше якщо».\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Трирівневий доступ (повідомленнями поки)."
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal coins = 7\nif coins >= 20 then\n\tprint(\"VIP двері\")\nelseif coins >= 10 then\n\tprint(\"Звичайні двері\")\nelse\n\tprint(\"Замало монет\")\nend\n```"
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
  "summary": "Урок **6.3 — else і elseif** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: else і elseif",
    "difficulty": "intermediate",
    "description": "### Завдання\nТрирівневий доступ (повідомленнями поки).\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson64 = {
  "lessonId": "lesson-roblox-6-4",
  "moduleId": "module-06",
  "order": 4,
  "title": "6.4 — Touched + if: зони",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зона карає/переносить лише якщо торкнувся Humanoid (і опційно якщо імʼя Part зони = …).",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** зона карає/переносить лише якщо торкнувся Humanoid (і опційно якщо імʼя Part зони = …).\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "`DangerZone` — якщо гравець (є Humanoid) — Health=0 або телепорт назад + print. ```lua local zone = script.Parent zone.Touched:Connect(function(hit) local character = hit.Parent local humanoid = character:FindFirstChild(\"Humanoid\") if humanoid then humanoid.Health = 0 print(\"Зона покарала гравця\") end end) ``` Ускладнення: друга зона карає лише якщо `coins.Value < 5` (потребує GetPlayerFromCharacter)."
      },
      {
        "title": "Як працювати",
        "content": "Тримай **Roblox Studio** відкритим поруч із цією сторінкою.\n\n1. Спочатку повтори кроки з теорії  \n2. Зроби практику за чеклістом  \n3. Потім можна ускладнити (челендж)\n\nЯкщо щось «не слухається» — відкрий **Output**, перевір **імена** в Explorer і натисни **Play**."
      },
      {
        "title": "Шаблон коду (встав у Studio)",
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal zone = script.Parent\nzone.Touched:Connect(function(hit)\n\tlocal character = hit.Parent\n\tlocal humanoid = character:FindFirstChild(\"Humanoid\")\n\tif humanoid then\n\t\thumanoid.Health = 0\n\t\tprint(\"Зона покарала гравця\")\n\tend\nend)\n```"
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
  "summary": "Урок **6.4 — Touched + if: зони** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Touched + if: зони",
    "difficulty": "intermediate",
    "description": "### Завдання\n`DangerZone` — якщо гравець (є Humanoid) — Health=0 або телепорт назад + print. ```lua local zone = script.Parent zone.Touched:Connect(function(hit) local character = hit.Parent local humanoid = character:FindFirstChild(\"Humanoid\") if humanoid then humanoid.Health = 0 print(\"Зона покарала гравця\") end end) ``` Ускладнення: друга зона карає лише якщо `coins.Value < 5` (потребує GetPlayerFromCharacter).\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson65 = {
  "lessonId": "lesson-roblox-6-5",
  "moduleId": "module-06",
  "order": 5,
  "title": "6.5 — Прапорці і ClickDetector",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "`local open = false` керує дверима/вентилем; повторний клік інша гілка.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** `local open = false` керує дверима/вентилем; повторний клік інша гілка.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal door = script.Parent\nlocal click = door:WaitForChild(\"ClickDetector\")\nlocal open = false\n\nclick.MouseClick:Connect(function(player)\n\tif open == false then\n\t\tdoor.Transparency = 0.8\n\t\tdoor.CanCollide = false\n\t\topen = true\n\t\tprint(player.Name, \"відкрив\")\n\telse\n\t\tdoor.Transparency = 0\n\t\tdoor.CanCollide = true\n\t\topen = false\n\t\tprint(player.Name, \"закрив\")\n\tend\nend)\n```"
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
  "summary": "Урок **6.5 — Прапорці і ClickDetector** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Прапорці і ClickDetector",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Прапорці і ClickDetector» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
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

export const ukLesson66 = {
  "lessonId": "lesson-roblox-6-6",
  "moduleId": "module-06",
  "order": 6,
  "title": "6.6 — Проєкт: двері VIP / пароль",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "клікнути → перевірити пароль у змінній АБО число монет ≥ N → відкрити; інакше print відмова. Презентації.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** клікнути → перевірити пароль у змінній АБО число монет ≥ N → відкрити; інакше print відмова. Презентації.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
  "summary": "Урок **6.6 — Проєкт: двері VIP / пароль** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Проєкт: двері VIP / пароль",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Проєкт: двері VIP / пароль» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
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
