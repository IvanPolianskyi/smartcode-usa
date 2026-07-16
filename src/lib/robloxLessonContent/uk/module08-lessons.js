/** Roblox v2 Module 08 UK — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE // reserved
void MC

export const ukLesson81 = {
  "lessonId": "lesson-roblox-8-1",
  "moduleId": "module-08",
  "order": 1,
  "title": "8.1 — Що таке функція",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "оголосити function без параметрів; викликати двічі.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** оголосити function без параметрів; викликати двічі.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal function sayHello()\n\tprint(\"Привіт, будівельнику!\")\nend\n\nsayHello()\nsayHello()\n```"
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
  "summary": "Урок **8.1 — Що таке функція** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Що таке функція",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Що таке функція» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
    ],
    "optionalChallenge": "Аналогія рецепт → демо → разом → самі 2 функції-повідомлення → челендж виклик 3 рази → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Функція — це…",
        "options": [
          "Іменований блок коду який можна викликати",
          "Тип Sky",
          "Кнопка Terrain",
          "Плагін Snap"
        ],
        "correctAnswer": 0,
        "explanation": "Іменований блок коду який можна викликати"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`sayHello()` з дужками…",
        "options": [
          "Виклик функції",
          "Видалення Place",
          "Negate",
          "Publish"
        ],
        "correctAnswer": 0,
        "explanation": "Виклик функції"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Без виклику тіло функції…",
        "options": [
          "Само не виконується",
          "Завжди біжить одразу навіть без імені",
          "Видаляє SSS",
          "Дає Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Само не виконується"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Навіщо функції?",
        "options": [
          "Не копіпастити той самий код",
          "Вимкнути Output",
          "Видалити Parts",
          "Замінити Explorer"
        ],
        "correctAnswer": 0,
        "explanation": "Не копіпастити той самий код"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Своя функція + подвійний виклик",
          "Повний Tycoon",
          "Blender",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Своя функція + подвійний виклик"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "`local function` …",
        "options": [
          "Зручний спосіб оголосити локальну функцію",
          "Видаляє Lua",
          "Робіть Union",
          "Малює Decal"
        ],
        "correctAnswer": 0,
        "explanation": "Зручний спосіб оголосити локальну функцію"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Дві різні функції…",
        "options": [
          "Різні імена / різні дії",
          "Заборонені",
          "Лише в Python",
          "Лише в HTML"
        ],
        "correctAnswer": 0,
        "explanation": "Різні імена / різні дії"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Цикл vs функція…",
        "options": [
          "Цикл повторяє підряд; функція — виклик коли треба",
          "Це одне і те ж завжди",
          "Функція замінює Terrain",
          "Цикл замінює Lighting"
        ],
        "correctAnswer": 0,
        "explanation": "Цикл повторяє підряд; функція — виклик коли треба"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "М8 базується на М5–7 бо…",
        "options": [
          "У функціях будуть змінні, if, цикли",
          "Попереднє скасовується",
          "Parts скасовуються",
          "Studio скасовується"
        ],
        "correctAnswer": 0,
        "explanation": "У функціях будуть змінні, if, цикли"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Параметри",
          "Тільки Sky",
          "Тільки Ambient",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Параметри"
      }
    ]
  }
}

export const ukLesson82 = {
  "lessonId": "lesson-roblox-8-2",
  "moduleId": "module-08",
  "order": 2,
  "title": "8.2 — Параметри",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "передати імʼя/число в функцію.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** передати імʼя/число в функцію.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal function greet(name)\n\tprint(\"Вітаю,\", name)\nend\n\ngreet(\"Максим\")\ngreet(\"Анна\")\n```"
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
  "summary": "Урок **8.2 — Параметри** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Параметри",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Параметри» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
    ],
    "optionalChallenge": "Демо → разом greet → самі paintPart(partName, r,g,b) спрощено → челендж → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Параметр — це…",
        "options": [
          "Вхідне значення для функції",
          "Назва неба лише",
          "Тип Negate",
          "Кнопка Publish"
        ],
        "correctAnswer": 0,
        "explanation": "Вхідне значення для функції"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`greet(\"Анна\")` передає…",
        "options": [
          "Рядок у name",
          "Весь Workspace",
          "SoundService завжди",
          "Terrain завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Рядок у name"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Кілька параметрів…",
        "options": [
          "Можливі через кому",
          "Заборонені в Lua",
          "Лише в CSS",
          "Лише в Discord"
        ],
        "correctAnswer": 0,
        "explanation": "Можливі через кому"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Функції з параметрами",
          "Повний DataStore курс",
          "Raycast снайпер",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Функції з параметрами"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Без параметрів функція…",
        "options": [
          "Менш гнучка для різних випадків",
          "Неможлива",
          "Видаляє Place",
          "Дає Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Менш гнучка для різних випадків"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Імʼя параметра всередині…",
        "options": [
          "Локальна «коробка» на час виклику",
          "Глобальний нік Roblox завжди",
          "Імʼя файлу Windows",
          "IP адреса"
        ],
        "correctAnswer": 0,
        "explanation": "Локальна «коробка» на час виклику"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "paintPart з параметрами кольору…",
        "options": [
          "Один код — різні Parts",
          "Заборонено",
          "Ламає Anchored завжди",
          "Вимикає Play"
        ],
        "correctAnswer": 0,
        "explanation": "Один код — різні Parts"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Помилка «пропущений аргумент»…",
        "options": [
          "Дивимось Output і кількість параметрів",
          "Купуємо Plugin",
          "Видаляємо акаунт",
          "Змінюємо біом словами"
        ],
        "correctAnswer": 0,
        "explanation": "Дивимось Output і кількість параметрів"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Звʼязок з М5…",
        "options": [
          "Аргументи — такі ж типи значень",
          "Типи скасовані",
          "print скасовано",
          "Studio скасовано"
        ],
        "correctAnswer": 0,
        "explanation": "Аргументи — такі ж типи значень"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "return",
          "Тільки Decal",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "return"
      }
    ]
  }
}

export const ukLesson83 = {
  "lessonId": "lesson-roblox-8-3",
  "moduleId": "module-08",
  "order": 3,
  "title": "8.3 — return",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "функція повертає значення в змінну.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** функція повертає значення в змінну.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal function double(n)\n\treturn n * 2\nend\n\nlocal x = double(7)\nprint(x)\n```"
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
  "summary": "Урок **8.3 — return** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: return",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «return» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
    ],
    "optionalChallenge": "Демо return vs print → разом double → самі canOpen + if → челендж → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`return` …",
        "options": [
          "Віддає результат із функції",
          "Видаляє функцію з Roblox",
          "Робіть Union",
          "Малює Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Віддає результат із функції"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`local x = double(7)` …",
        "options": [
          "Зберігає повернуте значення",
          "Видаляє x завжди",
          "Створює Part обовʼязково",
          "Вимикає Output"
        ],
        "correctAnswer": 0,
        "explanation": "Зберігає повернуте значення"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "print всередині функції vs return…",
        "options": [
          "print показує; return передає далі в код",
          "Це одне і те ж",
          "return лише для UI",
          "print замінює end"
        ],
        "correctAnswer": 0,
        "explanation": "print показує; return передає далі в код"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "`canOpen` з return boolean…",
        "options": [
          "Зручно для if canOpen(...) then",
          "Неможливо",
          "Лише в Java",
          "Лише в HTML"
        ],
        "correctAnswer": 0,
        "explanation": "Зручно для if canOpen(...) then"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Функції з return у рішенні дверей/рахунку",
          "Повний шутер раунди",
          "Blender face",
          "Відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Функції з return у рішенні дверей/рахунку"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Після return у функції…",
        "options": [
          "Виконання функції зупиняється",
          "Код нижче в тій же функції завжди біжить",
          "Видаляється Place",
          "Дається Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Виконання функції зупиняється"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Без return double…",
        "options": [
          "Отримаємо nil у x якщо лише print всередині",
          "Отримаємо завжди 100",
          "Отримаємо Part",
          "Отримаємо Sound"
        ],
        "correctAnswer": 0,
        "explanation": "Отримаємо nil у x якщо лише print всередині"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Комбінація return + if…",
        "options": [
          "Чистіші рішення",
          "Заборонена",
          "Ламає for назавжди",
          "Вимикає task.wait"
        ],
        "correctAnswer": 0,
        "explanation": "Чистіші рішення"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "ДЗ canOpen…",
        "options": [
          "Підготовка до дверей-проєкту",
          "Видалення М4",
          "Скасування тестів",
          "Заміна Path"
        ],
        "correctAnswer": 0,
        "explanation": "Підготовка до дверей-проєкту"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Події Connect як функції",
          "Тільки Atmosphere",
          "Тільки Negate",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Події Connect як функції"
      }
    ]
  }
}

export const ukLesson84 = {
  "lessonId": "lesson-roblox-8-4",
  "moduleId": "module-08",
  "order": 4,
  "title": "8.4 — Події: функція як реакція",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "свідомо писати `Touched:Connect(function(hit)... end)` і винести логіку в іменовану функцію.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** свідомо писати `Touched:Connect(function(hit)... end)` і винести логіку в іменовану функцію.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal brick = script.Parent\n\nlocal function onTouched(hit)\n\tlocal humanoid = hit.Parent:FindFirstChild(\"Humanoid\")\n\tif humanoid then\n\t\tprint(\"Торкання гравця!\")\n\tend\nend\n\nbrick.Touched:Connect(onTouched)\n```"
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
  "summary": "Урок **8.4 — Події: функція як реакція** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Події: функція як реакція",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Події: функція як реакція» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
    ],
    "optionalChallenge": "Порівняння анонім vs іменована → разом → самі ClickDetector + іменована → челендж → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Подія Touched…",
        "options": [
          "Викликає підключену функцію коли є дотик",
          "Малює Terrain сама",
          "Робіть Decal сама",
          "Купує Plugin"
        ],
        "correctAnswer": 0,
        "explanation": "Викликає підключену функцію коли є дотик"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`:Connect(onTouched)` …",
        "options": [
          "Підписує функцію на подію",
          "Видаляє Part",
          "Вимикає Play",
          "Зберігає PDF"
        ],
        "correctAnswer": 0,
        "explanation": "Підписує функцію на подію"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Іменована функція-обробник краща бо…",
        "options": [
          "Читабельніше / можна Connect кілька разів логічно",
          "Заборонена",
          "Повільніша завжди в 1000 разів магічно",
          "Видаляє Output"
        ],
        "correctAnswer": 0,
        "explanation": "Читабельніше / можна Connect кілька разів логічно"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Подія + іменована функція",
          "Повний MMO",
          "Blender",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Подія + іменована функція"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "hit приходить як…",
        "options": [
          "Аргумент події",
          "Sky",
          "SoundId обовʼязково",
          "Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Аргумент події"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "М4 шаблони тепер…",
        "options": [
          "Розуміємо як Connect + function",
          "Стали непотрібними назавжди без сенсу",
          "Видаляють потребу if",
          "Видаляють потребу змінних"
        ],
        "correctAnswer": 0,
        "explanation": "Розуміємо як Connect + function"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "ClickDetector.MouseClick:Connect…",
        "options": [
          "Той самий патерн події",
          "Інша планета API без сенсу звʼязку",
          "Заміна Workspace",
          "Заміна Lighting"
        ],
        "correctAnswer": 0,
        "explanation": "Той самий патерн події"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Без Connect функція onTouched…",
        "options": [
          "Не викличеться від дотику сама",
          "Видалить цеглу",
          "Створить монети",
          "Змінить біом"
        ],
        "correctAnswer": 0,
        "explanation": "Не викличеться від дотику сама"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "if humanoid у обробнику…",
        "options": [
          "Фільтр події",
          "Заборонений",
          "Ламає Connect",
          "Вимикає Anchored завжди"
        ],
        "correctAnswer": 0,
        "explanation": "Фільтр події"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "ModuleScript intro",
          "Тільки Sky",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "ModuleScript intro"
      }
    ]
  }
}

export const ukLesson85 = {
  "lessonId": "lesson-roblox-8-5",
  "moduleId": "module-08",
  "order": 5,
  "title": "8.5 — ModuleScript intro",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "створити ModuleScript з функцією; require у Script.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** створити ModuleScript з функцією; require у Script.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### ModuleScript `RewardMath` у ReplicatedStorage (або SSS)\n\n```lua\nlocal M = {}\n\nfunction M.double(n)\n\treturn n * 2\nend\n\nfunction M.canAfford(coins, price)\n\treturn coins >= price\nend\n\nreturn M\n```\n\n### Script\n\n```lua\nlocal RewardMath = require(game.ReplicatedStorage:WaitForChild(\"RewardMath\"))\nprint(RewardMath.double(4))\nprint(RewardMath.canAfford(12, 10))\n```"
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
  "summary": "Урок **8.5 — ModuleScript intro** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: ModuleScript intro",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «ModuleScript intro» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
    ],
    "optionalChallenge": "Аналогія аптечка/ящик інструментів → демо → разом → самі третя функція в модулі → челендж → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "ModuleScript потрібен щоб…",
        "options": [
          "Зберігати код для повторного require",
          "Малювати небо лише",
          "Замінити Terrain Editor",
          "Купувати одяг"
        ],
        "correctAnswer": 0,
        "explanation": "Зберігати код для повторного require"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`require` …",
        "options": [
          "Підключає модуль",
          "Видаляє модуль з Discord",
          "Робіть Negate",
          "Вимикає Snap"
        ],
        "correctAnswer": 0,
        "explanation": "Підключає модуль"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`return M` у модулі…",
        "options": [
          "Віддає таблицю з функціями",
          "Видаляє Place",
          "Створює Spawn обовʼязково",
          "Дає Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Віддає таблицю з функціями"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Свій ModuleScript + require",
          "Повний шутер",
          "Відеомонтаж",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Свій ModuleScript + require"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Без return у ModuleScript…",
        "options": [
          "require отримає проблеми/nil",
          "Все працює ідеально завжди",
          "Дає Robux",
          "Відкриває Toolbox"
        ],
        "correctAnswer": 0,
        "explanation": "require отримає проблеми/nil"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "ReplicatedStorage зручний бо…",
        "options": [
          "Доступ з різних скриптів (залежно від контексту)",
          "Видаляє UI",
          "Вимикає Play",
          "Робіть Union даху"
        ],
        "correctAnswer": 0,
        "explanation": "Доступ з різних скриптів (залежно від контексту)"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Це ще не повний курс архітектури…",
        "options": [
          "Так — лише intro полиці функцій",
          "Ні — вже Senior Engineer рівень обовʼязок",
          "Так і Unreal одразу",
          "Так і Kubernetes"
        ],
        "correctAnswer": 0,
        "explanation": "Так — лише intro полиці функцій"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Третя функція в модулі…",
        "options": [
          "Практика розширення API ящика",
          "Заборонена",
          "Ламає require завжди",
          "Видаляє double"
        ],
        "correctAnswer": 0,
        "explanation": "Практика розширення API ящика"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "М8.5 зʼєднує…",
        "options": [
          "Функції + таблицю модуля",
          "Лише Decal",
          "Лише Ambient",
          "Лише відео"
        ],
        "correctAnswer": 0,
        "explanation": "Функції + таблицю модуля"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Таблиці Lua як список",
          "Скасування функцій",
          "Тільки Negate",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Таблиці Lua як список"
      }
    ]
  }
}

export const ukLesson86 = {
  "lessonId": "lesson-roblox-8-6",
  "moduleId": "module-08",
  "order": 6,
  "title": "8.6 — Таблиці: список",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "створити масив-список; прочитати `[1]`; ipairs у for.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** створити масив-список; прочитати `[1]`; ipairs у for.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal fruits = {\"яблуко\", \"банан\", \"вишня\"}\nprint(fruits[1])\n\nfor index, value in ipairs(fruits) do\n\tprint(index, value)\nend\n```"
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
  "summary": "Урок **8.6 — Таблиці: список** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Таблиці: список",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Таблиці: список» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
    ],
    "optionalChallenge": "Аналогія рюкзак → демо → разом → самі список реплік NPC → челендж додати елемент → тест → ДЗ."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Таблиця `\"яблуко\",\"банан\"` у `{}` — це…",
        "options": [
          "Список значень",
          "Sky",
          "Sound",
          "Terrain brush"
        ],
        "correctAnswer": 0,
        "explanation": "Список значень"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "`fruits[1]` у Lua…",
        "options": [
          "Перший елемент (індексація з 1)",
          "Завжди останній",
          "Видаляє таблицю",
          "Робіть Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Перший елемент (індексація з 1)"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "`ipairs` зручний щоб…",
        "options": [
          "Пройти список по порядку",
          "Видалити Workspace",
          "Вимкнути Output",
          "Купити Plugin"
        ],
        "correctAnswer": 0,
        "explanation": "Пройти список по порядку"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "Свій список + обхід",
          "Повний DataStore усіх планет",
          "Blender face",
          "Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Свій список + обхід"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Список реплік NPC…",
        "options": [
          "Підготовка діалогу",
          "Заборонений",
          "Замінює Path",
          "Замінює Spawn"
        ],
        "correctAnswer": 0,
        "explanation": "Підготовка діалогу"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "`#fruits` (згадати)…",
        "options": [
          "Довжина списку",
          "Колір Part",
          "Volume",
          "ClockTime"
        ],
        "correctAnswer": 0,
        "explanation": "Довжина списку"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Цикл for по таблиці vs for i=1,n…",
        "options": [
          "Обидва можливі; ipairs зручний для списків",
          "ipairs заборонений",
          "for i заборонений",
          "Таблиці не циклять"
        ],
        "correctAnswer": 0,
        "explanation": "Обидва можливі; ipairs зручний для списків"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Додати елемент `table.insert`…",
        "options": [
          "Показати як розширити список (демо викладача ок)",
          "Неможливо в Lua",
          "Лише в HTML",
          "Лише в Excel"
        ],
        "correctAnswer": 0,
        "explanation": "Показати як розширити список (демо викладача ок)"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Чи це вже словник key/value глибоко?",
        "options": [
          "Ні — спочатку список; словник наступний урок",
          "Так увесь курс БД",
          "Так SQL",
          "Так Mongo обовʼязок"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — спочатку список; словник наступний урок"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Таблиця-словник і діалог",
          "Тільки Sky",
          "Тільки паркан",
          "НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Таблиця-словник і діалог"
      }
    ]
  }
}

export const ukLesson87 = {
  "lessonId": "lesson-roblox-8-7",
  "moduleId": "module-08",
  "order": 7,
  "title": "8.7 — Словник + діалог NPC",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "таблиця ключ→значення; простий NPC click дає репліку з таблиці / масиву.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** таблиця ключ→значення; простий NPC click дає репліку з таблиці / масиву.\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
        "content": "Натисни **Копіювати** → вклей у **Script** або **LocalScript** у Studio. Спочатку міняй **числа, рядки, кольори** — не видаляй рядки «бо не розумію».\n\n### Шаблон 1\n\n```lua\nlocal replies = {\n\thello = \"Привіт! Ласкаво просимо у двір.\",\n\tbye = \"Бувай, заходь ще!\",\n}\n\nlocal function talk(key)\n\tlocal text = replies[key]\n\tif text then\n\t\tprint(text)\n\telse\n\t\tprint(\"...\")\n\tend\nend\n\ntalk(\"hello\")\n```"
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
  "summary": "Урок **8.7 — Словник + діалог NPC** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Словник + діалог NPC",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Словник + діалог NPC» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Шаблон коду — у вкладці «Теорія», кнопка «Копіювати»."
    ],
    "optionalChallenge": "Демо словник → разом talk → самі 4 репліки → інтеграція Click → челендж → тест → ДЗ підготовка інвентарю."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "`replies.hello` або `replies[\"hello\"]`…",
        "options": [
          "Достає значення за ключем",
          "Видаляє NPC",
          "Робіть Union",
          "Малює Terrain"
        ],
        "correctAnswer": 0,
        "explanation": "Достає значення за ключем"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Ключ у словнику…",
        "options": [
          "Імʼя полички",
          "Обовʼязково Vector3",
          "Обовʼязково Sound",
          "Обовʼязково Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Імʼя полички"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "if text then у talk…",
        "options": [
          "Захист від відсутнього ключа",
          "Видаляє таблицю",
          "Вимикає Play",
          "Дає Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Захист від відсутнього ключа"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Артефакт?",
        "options": [
          "NPC з репліками з таблиці",
          "Повний шутер",
          "Відеомонтаж",
          "НМТ історія"
        ],
        "correctAnswer": 0,
        "explanation": "NPC з репліками з таблиці"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Черга реплік індексом…",
        "options": [
          "Прапорець/число + масив",
          "Неможливо",
          "Лише в C++",
          "Лише в PHP"
        ],
        "correctAnswer": 0,
        "explanation": "Прапорець/число + масив"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "ClickDetector + talk…",
        "options": [
          "Подія викликає функцію з таблицею",
          "Заміна Workspace",
          "Заміна Lighting",
          "Видалення Path"
        ],
        "correctAnswer": 0,
        "explanation": "Подія викликає функцію з таблицею"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "print репліки на М8… a) Ок; BillboardGui — бонус пізніше b) Єдиний заборонений спосіб с) Видаляє потребу функції d) Видаляє потребу таблиці **Відповідь: a** 8. Словник vs список…",
        "options": [
          "Ключі імена vs номери порядку",
          "Немає різниці",
          "Словник лише для Sound",
          "Список лише для Sky"
        ],
        "correctAnswer": 0,
        "explanation": "Ключі імена vs номери порядку"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Підготовка інвентарю…",
        "options": [
          "Таблиця предметів/кількостей",
          "Видалення монет з М4",
          "Скасування leaderstats",
          "Заміна Foundation"
        ],
        "correctAnswer": 0,
        "explanation": "Таблиця предметів/кількостей"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Фінал модуля — інвентар + діалог",
          "Скасування М9",
          "Тільки Negate",
          "Тільки Atmosphere"
        ],
        "correctAnswer": 0,
        "explanation": "Фінал модуля — інвентар + діалог"
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

export const ukLesson88 = {
  "lessonId": "lesson-roblox-8-8",
  "moduleId": "module-08",
  "order": 8,
  "title": "8.8 — Проєкт: інвентар + NPC",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "зібрати все М5–М8 у міні-систему:",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** зібрати все М5–М8 у міні-систему:\n\nФаза курсу: **Серйозний Lua**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
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
  "summary": "Урок **8.8 — Проєкт: інвентар + NPC** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Проєкт: інвентар + NPC",
    "difficulty": "intermediate",
    "description": "### Завдання\nВиконай кроки уроку «Проєкт: інвентар + NPC» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
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
        "question": "Фінал М8 доводить…",
        "options": [
          "Функції+події+таблиці збираються в механіку",
          "Lua більше не потрібен",
          "Parts більше не потрібні",
          "Output скасовано"
        ],
        "correctAnswer": 0,
        "explanation": "Функції+події+таблиці збираються в механіку"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Фаза C завершена — далі…",
        "options": [
          "Жанрові механіки (obby, симулятор, tycoon…)",
          "Лише теорія PDF",
          "Лише Negate на рік",
          "Лише відеомонтаж"
        ],
        "correctAnswer": 0,
        "explanation": "Жанрові механіки (obby, симулятор, tycoon…)"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "canAfford у модулі…",
        "options": [
          "Перевикористання логіки цін",
          "Заборонено",
          "Ламає двері завжди",
          "Вимикає leaderstats"
        ],
        "correctAnswer": 0,
        "explanation": "Перевикористання логіки цін"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Інвентар на цьому рівні…",
        "options": [
          "Може бути таблицею + print/UI lite",
          "Обовʼязково AAA backpack з магазину",
          "Обовʼязково DataStore всіх серверів",
          "Обовʼязково Blender"
        ],
        "correctAnswer": 0,
        "explanation": "Може бути таблицею + print/UI lite"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Іменовані обробники подій…",
        "options": [
          "Критерій якості здачі",
          "Заборонені",
          "Гірші за хаос завжди",
          "Видаляють Connect"
        ],
        "correctAnswer": 0,
        "explanation": "Критерій якості здачі"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Якщо require шлях зламаний…",
        "options": [
          "Output + перевірити Parent модуля",
          "Купити Robux",
          "Видалити акаунт",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Output + перевірити Parent модуля"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Презентація має показати…",
        "options": [
          "Діалог + економіка дверей у Play",
          "Лише скрін неба",
          "Лише Word файл",
          "Лише стікер"
        ],
        "correctAnswer": 0,
        "explanation": "Діалог + економіка дверей у Play"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "М9 почне…",
        "options": [
          "Obby / платформер механіки своїм кодом",
          "Скасування коду",
          "Тільки Lighting курс",
          "Тільки НМТ"
        ],
        "correctAnswer": 0,
        "explanation": "Obby / платформер механіки своїм кодом"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Найбільший стрибок від М4 до М8…",
        "options": [
          "Від шаблонів до власних функцій і даних",
          "Відміна Studio",
          "Відміна тестів",
          "Відміна практики"
        ],
        "correctAnswer": 0,
        "explanation": "Від шаблонів до власних функцій і даних"
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
