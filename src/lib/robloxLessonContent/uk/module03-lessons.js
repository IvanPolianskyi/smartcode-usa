/** Roblox v2 Module 03 UK — AUTO gen-roblox-v2.mjs */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE // reserved
void MC

export const ukLesson31 = {
  "lessonId": "lesson-roblox-3-1",
  "moduleId": "module-03",
  "order": 1,
  "title": "3.1 — Terrain Editor: перша земля",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "намалювати ділянку землі навколо двору й зрозуміти Add / Subtract / Grow / Erode (ті інструменти, що є в актуальній Studio).",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** намалювати ділянку землі навколо двору й зрозуміти Add / Subtract / Grow / Erode (ті інструменти, що є в актуальній Studio).\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Пляма ландшафту навколо Foundation (або заміна «голої» Baseplate на природніший край). Двір і будинок **не закопані** випадково."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M3_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
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
        "content": "Зберегти. Скрін згори: двір + нова земля. Не чіпати Lighting поки."
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
  "summary": "Урок **3.1 — Terrain Editor: перша земля** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Terrain Editor: перша земля",
    "difficulty": "beginner",
    "description": "### Завдання\nПляма ландшафту навколо Foundation (або заміна «голої» Baseplate на природніший край). Двір і будинок **не закопані** випадково.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
    ],
    "optionalChallenge": "Челендж: жоден Wall будинку не торкає «гору всередині кімнати»"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Terrain Editor потрібен щоб…",
        "options": [
          "Малювати ландшафт (гору, яму, берег)",
          "Писати цикли Lua",
          "Купувати одяг аватара",
          "Монтувати відео"
        ],
        "correctAnswer": 0,
        "explanation": "Малювати ландшафт (гору, яму, берег)"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Перед великим малюванням terrain варто…",
        "options": [
          "Зберегти Place",
          "Видалити House",
          "Вимкнути Explorer назавжди",
          "Змінити нік"
        ],
        "correctAnswer": 0,
        "explanation": "Зберегти Place"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Якщо випадково «закопали» будинок…",
        "options": [
          "Undo / Subtract / обережно прибрати terrain",
          "Видалити акаунт",
          "Купити Robux",
          "Ігнорувати й публікувати"
        ],
        "correctAnswer": 0,
        "explanation": "Undo / Subtract / обережно прибрати terrain"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Навіщо починати з плоскої подушки, а не з хаотичних гір?",
        "options": [
          "Легше контролювати форму й стик з двором",
          "Бо гори в Roblox заборонені",
          "Бо інакше немає камери",
          "Бо інакше немає Part"
        ],
        "correctAnswer": 0,
        "explanation": "Легше контролювати форму й стик з двором"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Brush size занадто великий — ризик…",
        "options": [
          "Знищити пів карти одним кліком",
          "Отримати безкоштовний GamePass",
          "Автоматично створити скрипт",
          "Прискорити інтернет"
        ],
        "correctAnswer": 0,
        "explanation": "Знищити пів карти одним кліком"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Артефакт уроку 3.1?",
        "options": [
          "Базовий ландшафт навколо двору",
          "Повний Tycoon",
          "GUI магазин",
          "DataStore"
        ],
        "correctAnswer": 0,
        "explanation": "Базовий ландшафт навколо двору"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Path і terrain мають…",
        "options": [
          "Стикатись читабельно для гравця",
          "Ніколи не бути поруч",
          "Завжди бути в ServerStorage",
          "Бути NegatePart"
        ],
        "correctAnswer": 0,
        "explanation": "Стикатись читабельно для гравця"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Чи Terrain замінює Model `House`?",
        "options": [
          "Ні",
          "Так повністю",
          "Так і Spawn теж",
          "Так і всі скрипти"
        ],
        "correctAnswer": 0,
        "explanation": "Ні"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Subtract (або аналог стирання) потрібен щоб…",
        "options": [
          "Прибрати зайвий ландшафт",
          "Додати музику",
          "Зробити PrimaryPart",
          "Відкрити Toolbox обовʼязково"
        ],
        "correctAnswer": 0,
        "explanation": "Прибрати зайвий ландшафт"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "На цьому уроці пишемо Lua?",
        "options": [
          "Ні",
          "Так, for",
          "Так, if",
          "Так, RemoteEvent"
        ],
        "correctAnswer": 0,
        "explanation": "Ні"
      }
    ]
  }
}

export const ukLesson32 = {
  "lessonId": "lesson-roblox-3-2",
  "moduleId": "module-03",
  "order": 2,
  "title": "3.2 — Матеріали ландшафту і біом",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "покрити terrain матеріалами під біом; додати 1 «фішку» біому (вода / сніг / пісок / трава+каміння).",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** покрити terrain матеріалами під біом; додати 1 «фішку» біому (вода / сніг / пісок / трава+каміння).\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Ландшафт з 2+ матеріалами (напр. Grass + Rock або Sand + Water). Короткий «край світу» позначений візуально (скеля/вода/огорожа з Parts — на вибір)."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M3_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
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
        "content": "Додати 1 орієнтир біому далеко по Path (дерево з Parts / маяк / сніговик) — без Toolbox-мегамоделей."
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
  "summary": "Урок **3.2 — Матеріали ландшафту і біом** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Матеріали ландшафту і біом",
    "difficulty": "beginner",
    "description": "### Завдання\nЛандшафт з 2+ матеріалами (напр. Grass + Rock або Sand + Water). Короткий «край світу» позначений візуально (скеля/вода/огорожа з Parts — на вибір).\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
    ],
    "optionalChallenge": "Челендж: скрін «від Spawn видно біомну фішку»"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Різні матеріали terrain потрібні щоб…",
        "options": [
          "Біом читався візуально",
          "Замінити Anchored у Parts",
          "Створити цикл while",
          "Видалити Explorer"
        ],
        "correctAnswer": 0,
        "explanation": "Біом читався візуально"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "«Край світу» позначають щоб…",
        "options": [
          "Гравець не падав у пустоту без розуміння межі",
          "Отримати Robux",
          "Вимкнути Snap",
          "Зробити Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Гравець не падав у пустоту без розуміння межі"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Декор з простих Parts замість гігантського Toolbox…",
        "options": [
          "Тренує навичку й не ламає стиль",
          "Заборонений",
          "Гірший завжди без винятку",
          "Видаляє terrain"
        ],
        "correctAnswer": 0,
        "explanation": "Тренує навичку й не ламає стиль"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Якщо вода в Terrain глючить на уроці…",
        "options": [
          "Можна тимчасово імітувати Part-озером",
          "Треба кинути курс",
          "Треба видалити House",
          "Треба вимкнути інтернет"
        ],
        "correctAnswer": 0,
        "explanation": "Можна тимчасово імітувати Part-озером"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт 3.2?",
        "options": [
          "Біом з матеріалами + фішка",
          "Шутер раунди",
          "ModuleScript інвентар",
          "Blender обличчя"
        ],
        "correctAnswer": 0,
        "explanation": "Біом з матеріалами + фішка"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Орієнтир далеко по Path допомагає…",
        "options": [
          "Тягнути погляд і рух гравця",
          "Прискорити CPU батьків",
          "Замінити Save",
          "Зробити PrimaryPart неба"
        ],
        "correctAnswer": 0,
        "explanation": "Тягнути погляд і рух гравця"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Скільки матеріалів мінімум цілимо на уроці?",
        "options": [
          "2+",
          "0",
          "100 обовʼязково",
          "Тільки Glass"
        ],
        "correctAnswer": 0,
        "explanation": "2+"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Каміння біля Path — це приклад…",
        "options": [
          "Акценту біля шляху гравця",
          "DataStore",
          "RemoteFunction",
          "BadgeService"
        ],
        "correctAnswer": 0,
        "explanation": "Акценту біля шляху гравця"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Чи можна заспамити 50 однакових дерев з Toolbox і вважати М3 зданим?",
        "options": [
          "Ні — якість і свідомість важливіші за сміття",
          "Так, це єдина вимога",
          "Так, і ще видалити будинок",
          "Так, без terrain"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — якість і свідомість важливіші за сміття"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Наступна тема логічно…",
        "options": [
          "Lighting / Atmosphere / Sky",
          "Одразу повний Lua for",
          "PvP арена на 20 хв",
          "Відеомонтаж Clipchamp"
        ],
        "correctAnswer": 0,
        "explanation": "Lighting / Atmosphere / Sky"
      }
    ]
  }
}

export const ukLesson33 = {
  "lessonId": "lesson-roblox-3-3",
  "moduleId": "module-03",
  "order": 3,
  "title": "3.3 — Lighting і Atmosphere",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "налаштувати освітлення під біом (день/закат/冷ний) так, щоб двір і будинок виглядали цілісно.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** налаштувати освітлення під біом (день/закат/冷ний) так, щоб двір і будинок виглядали цілісно.\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Змінені властивості в `Lighting` (Brightness, Ambient, ClockTime/TimeOfDay або аналог) + базовий Atmosphere (Density/Color — за наявністю). Скрін «до/після»."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M3_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
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
        "content": "Залишити фінальний пресет. Не повертати дефолт «просто так»."
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
  "summary": "Урок **3.3 — Lighting і Atmosphere** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Lighting і Atmosphere",
    "difficulty": "beginner",
    "description": "### Завдання\nЗмінені властивості в `Lighting` (Brightness, Ambient, ClockTime/TimeOfDay або аналог) + базовий Atmosphere (Density/Color — за наявністю). Скрін «до/після».\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
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
        "question": "Lighting у Explorer — це…",
        "options": [
          "Сервіс/налаштування освітлення світу",
          "Назва Part",
          "Тип Union",
          "Кнопка Publish"
        ],
        "correctAnswer": 0,
        "explanation": "Сервіс/налаштування освітлення світу"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "ClockTime / час доби впливає на…",
        "options": [
          "Як виглядає небо й світло",
          "Швидкість інтернету",
          "Ціну телефону",
          "Мову Windows"
        ],
        "correctAnswer": 0,
        "explanation": "Як виглядає небо й світло"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Ambient допомагає…",
        "options": [
          "Підсвітити тіні, щоб світ не був «дырою»",
          "Створити скрипт",
          "Видалити House",
          "Зробити Negate"
        ],
        "correctAnswer": 0,
        "explanation": "Підсвітити тіні, щоб світ не був «дырою»"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Навіщо обирати один настрій, а не 10 випадкових крутилок?",
        "options": [
          "Локація виглядає цілісно",
          "Roblox карає за цілісність",
          "Інакше немає Play",
          "Інакше немає камери"
        ],
        "correctAnswer": 0,
        "explanation": "Локація виглядає цілісно"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Налаштований Lighting/Atmosphere під біом",
          "Повний Tycoon dropper",
          "Kill brick скрипт",
          "Анімація стрільби"
        ],
        "correctAnswer": 0,
        "explanation": "Налаштований Lighting/Atmosphere під біом"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Якщо стіни будинку стали чорними вночі…",
        "options": [
          "Підкрутити Ambient/Brightness",
          "Видалити Model House",
          "Вимкнути Anchored у Foundation",
          "Зробити все Transparency 1"
        ],
        "correctAnswer": 0,
        "explanation": "Підкрутити Ambient/Brightness"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Скрін до/після потрібен щоб…",
        "options": [
          "Побачити ефект налаштувань",
          "Отримати Robux",
          "Замінити тест",
          "Видалити Path"
        ],
        "correctAnswer": 0,
        "explanation": "Побачити ефект налаштувань"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Atmosphere (якщо є) швидше про…",
        "options": [
          "Імлу/густину повітря і настрій далі",
          "Цикли for",
          "Leaderstats",
          "Tool зброю"
        ],
        "correctAnswer": 0,
        "explanation": "Імлу/густину повітря і настрій далі"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Чи Lighting пишеться кодом на М3?",
        "options": [
          "Ні — крутимо властивості вручну",
          "Так, обовʼязково ModuleScript",
          "Так, тільки RemoteEvent",
          "Так, тільки на телефоні"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — крутимо властивості вручну"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Наступний урок…",
        "options": [
          "Sky і фінальний «кадр листівки»",
          "DataStore",
          "Raycasting",
          "Бейджі й GamePass повний курс"
        ],
        "correctAnswer": 0,
        "explanation": "Sky і фінальний «кадр листівки»"
      }
    ]
  }
}

export const ukLesson34 = {
  "lessonId": "lesson-roblox-3-4",
  "moduleId": "module-03",
  "order": 4,
  "title": "3.4 — Sky і листівка локації",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "налаштувати небо/horizon так, щоб Spawn-ракурс виглядав як обкладинка гри.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** налаштувати небо/horizon так, щоб Spawn-ракурс виглядав як обкладинка гри.\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Sky (або аналог у Lighting) під біом + зафіксований «hero view»: камера з точки біля Spawn, скрін для портфоліо."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M3_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
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
        "content": "Надіслати геро-скрін у викладачу. Назва файлу: `M3_Імʼя_biome.png`."
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
  "summary": "Урок **3.4 — Sky і листівка локації** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Sky і листівка локації",
    "difficulty": "beginner",
    "description": "### Завдання\nSky (або аналог у Lighting) під біом + зафіксований «hero view»: камера з точки біля Spawn, скрін для портфоліо.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
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
        "question": "Sky у Lighting відповідає за…",
        "options": [
          "Вигляд неба",
          "HP гравця",
          "Таблицю лідерів",
          "Збереження DataStore"
        ],
        "correctAnswer": 0,
        "explanation": "Вигляд неба"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Hero view — це…",
        "options": [
          "Красивий ракурс від старту для портфоліо",
          "Чит на швидкість",
          "Тип Negate",
          "Сервіс Teleport"
        ],
        "correctAnswer": 0,
        "explanation": "Красивий ракурс від старту для портфоліо"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Пересвіт кадру виправляють…",
        "options": [
          "Lighting + небо + іноді колір матеріалів",
          "Видаленням Path",
          "Вимкненням Explorer",
          "Покупкою Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Lighting + небо + іноді колір матеріалів"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Навіщо галерея в групі?",
        "options": [
          "Фідбек і мотивація",
          "Єдина оцінка без рубрики",
          "Заміна всіх тестів курсу",
          "Видалення Place"
        ],
        "correctAnswer": 0,
        "explanation": "Фідбек і мотивація"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Небо + hero-скрін",
          "Повний шутер",
          "Тільки ServerStorage сміття",
          "Скрипт телепорта"
        ],
        "correctAnswer": 0,
        "explanation": "Небо + hero-скрін"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Обʼєкти що псують кадр…",
        "options": [
          "Прибираємо або ховаємо зі стартового ракурсу",
          "Обовʼязково розмножуємо ×100",
          "Кладемо в Lighting",
          "Робимо PrimaryPart неба"
        ],
        "correctAnswer": 0,
        "explanation": "Прибираємо або ховаємо зі стартового ракурсу"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чи небо важливіше за читабельний Path?",
        "options": [
          "Ні — атмосфера доповнює, не замінює шлях",
          "Так, Path можна видалити",
          "Так, і Spawn теж",
          "Так, і будинок теж"
        ],
        "correctAnswer": 0,
        "explanation": "Ні — атмосфера доповнює, не замінює шлях"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Біом зима vs пустеля відрізняються небом тим що…",
        "options": [
          "Колір/настрій sky під тему",
          "У зимі небо заборонене",
          "У пустелі немає Lighting",
          "Небом керує лише Python"
        ],
        "correctAnswer": 0,
        "explanation": "Колір/настрій sky під тему"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Скрін для портфоліо краще робити…",
        "options": [
          "З зрозумілим головним обʼєктом (дім/шлях)",
          "З випадкового підлоги під картою",
          "Тільки з меню Windows",
          "Тільки з чорного екрана"
        ],
        "correctAnswer": 0,
        "explanation": "З зрозумілим головним обʼєктом (дім/шлях)"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі логічно…",
        "options": [
          "Звук і атмосфера вухами",
          "Одразу Blender персонаж",
          "Квантова фізика",
          "Повний MMO реліз за 1 урок"
        ],
        "correctAnswer": 0,
        "explanation": "Звук і атмосфера вухами"
      }
    ]
  }
}

export const ukLesson35 = {
  "lessonId": "lesson-roblox-3-5",
  "moduleId": "module-03",
  "order": 5,
  "title": "3.5 — Звук зони",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "додати Sound (ambient) так, щоб біом відчувався на слух; зрозуміти Volume / Looped / Playing.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** додати Sound (ambient) так, щоб біом відчувався на слух; зрозуміти Volume / Looped / Playing.\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "`AmbientSound` у Workspace (або в Part-зоні біля двору): looped, адекватна гучність. Опційно короткий one-shot на Sign (без скрипта — лише якщо вручну Playing; інакше лишити ambient)."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M3_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
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
        "content": "Залишити ambient. Прибрати зайві дублікати Sound."
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
  "summary": "Урок **3.5 — Звук зони** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Звук зони",
    "difficulty": "beginner",
    "description": "### Завдання\n`AmbientSound` у Workspace (або в Part-зоні біля двору): looped, адекватна гучність. Опційно короткий one-shot на Sign (без скрипта — лише якщо вручну Playing; інакше лишити ambient).\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
    ],
    "optionalChallenge": "Челендж: 10 сек тиша з закритими очима + вгадати чий біом (якщо звуки різні)"
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Sound у Roblox — це…",
        "options": [
          "Обʼєкт який відтворює аудіо",
          "Тип Union",
          "Папка Lighting",
          "Кнопка Rotate"
        ],
        "correctAnswer": 0,
        "explanation": "Обʼєкт який відтворює аудіо"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Looped = true означає…",
        "options": [
          "Звук повторюється",
          "Звук видаляє House",
          "Звук дає Robux",
          "Звук пише код"
        ],
        "correctAnswer": 0,
        "explanation": "Звук повторюється"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Занадто великий Volume погано бо…",
        "options": [
          "Заважає грати й чути викладача",
          "Прискорює гру",
          "Ламає Snap",
          "Видаляє Explorer"
        ],
        "correctAnswer": 0,
        "explanation": "Заважає грати й чути викладача"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Навіщо іменувати `Ambient_Biome`?",
        "options": [
          "Легко знайти в Explorer",
          "Інакше звук не грає ніколи",
          "Інакше немає Path",
          "Інакше немає камери"
        ],
        "correctAnswer": 0,
        "explanation": "Легко знайти в Explorer"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Артефакт уроку?",
        "options": [
          "Ambient звук під біом",
          "Повний кіберспорт турнір",
          "Система ребіртів",
          "ModuleScript магазин"
        ],
        "correctAnswer": 0,
        "explanation": "Ambient звук під біом"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "На М3 зональний Touched-звук…",
        "options": [
          "Не обовʼязковий — буде в блоці коду пізніше",
          "Єдиний спосіб здати модуль",
          "Замінює Lighting",
          "Замінює Terrain"
        ],
        "correctAnswer": 0,
        "explanation": "Не обовʼязковий — буде в блоці коду пізніше"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Якщо звуків 10 дублікатів…",
        "options": [
          "Прибрати зайві",
          "Додати ще 50",
          "Видалити будинок",
          "Вимкнути збереження"
        ],
        "correctAnswer": 0,
        "explanation": "Прибрати зайві"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Ambient + Lighting + terrain разом дають…",
        "options": [
          "Відчуття місця",
          "Автоматичний Tycoon",
          "Автоматичний DataStore",
          "Безкоштовні Robux"
        ],
        "correctAnswer": 0,
        "explanation": "Відчуття місця"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Чи можна здати М3 без жодного звуку, але з крутим світлом?",
        "options": [
          "Краще додати хоч тихий ambient — це критерій модуля",
          "Звук заборонений",
          "Звук замінює всі Parts",
          "Звук потрібен лише в Python"
        ],
        "correctAnswer": 0,
        "explanation": "Краще додати хоч тихий ambient — це критерій модуля"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Далі…",
        "options": [
          "Чекпоінт М3 — здача живого світу",
          "Одразу повний Lua курс за 1 урок",
          "Blender face",
          "Підготовка НМТ з історії"
        ],
        "correctAnswer": 0,
        "explanation": "Чекпоінт М3 — здача живого світу"
      }
    ]
  }
}

export const ukLesson36 = {
  "lessonId": "lesson-roblox-3-6",
  "moduleId": "module-03",
  "order": 6,
  "title": "3.6 — Чекпоінт: живий світ",
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "estimatedTime": 60,
  "learningObjectives": [
    "показати біом+атмосферу за чеклістом уроку.",
    "Зробити результат у Roblox Studio",
    "Пройти тест на ≥70%"
  ],
  "theory": {
    "sections": [
      {
        "title": "Сьогоднішня мета",
        "content": "**Ціль:** показати біом+атмосферу за чеклістом уроку.\n\nФаза курсу: **Студія і моделі**.\n\n**Твій план:**\n1. Прочитай коротко теорію (Studio поруч)\n2. Зроби практику за кроками\n3. Пройди тест (≥70%)\n4. Зроби домашнє завдання"
      },
      {
        "title": "Що має вийти",
        "content": "Зроби **видимий результат** у своєму Place і збережи його (Save to Roblox)."
      },
      {
        "title": "Твій Place",
        "content": "Працюй у **копії шкільного Place** — не починай щоразу з чистого Baseplate.\n\n1. Попроси копію Place на уроці  \n2. Збережи як `M3_ТвоєІмʼя`  \n3. Роби всі кроки уроку саме в цьому Place"
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
        "content": "Зберегти Place як `M4_Ready_Імʼя`. Нічого критичного не ламати."
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
  "summary": "Урок **3.6 — Чекпоінт: живий світ** готовий, коли є результат у Place, практика позначена і тест ≥70%. Тоді відкриється наступний урок.",
  "practiceTask": {
    "title": "Практика: Чекпоінт: живий світ",
    "difficulty": "beginner",
    "description": "### Завдання\nВиконай кроки уроку «Чекпоінт: живий світ» у своєму Place.\n\n\n### Коли готово\n1. Збережи Place  \n2. Перевір у **Play**  \n3. Натисни «Практику в Studio завершено» нижче",
    "hints": [
      "Спочатку зроби кроки 1:1, потім кастомізуй.",
      "Імена обʼєктів латиницею / PascalCase — легше шукати.",
      "Працюй у копії Place від викладача."
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
        "question": "М3 додає до двору й будинку…",
        "options": [
          "Світ навколо: земля, світло, небо, звук",
          "Лише DataStore",
          "Лише зброю Tool",
          "Лише Python"
        ],
        "correctAnswer": 0,
        "explanation": "Світ навколо: земля, світло, небо, звук"
      },
      {
        "id": "q2",
        "type": "multiple_choice",
        "question": "Найважливіше на екскурсії…",
        "options": [
          "Щоб гість зрозумів шлях і настрій",
          "Щоб показати 100 Toolbox машин",
          "Щоб видалити Spawn",
          "Щоб вимкнути Anchored усього"
        ],
        "correctAnswer": 0,
        "explanation": "Щоб гість зрозумів шлях і настрій"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "Якщо House закопаний terrain-ом…",
        "options": [
          "Модуль не здав — треба виправити",
          "Це секретний буст",
          "Так і треба",
          "Це дає Badge"
        ],
        "correctAnswer": 0,
        "explanation": "Модуль не здав — треба виправити"
      },
      {
        "id": "q4",
        "type": "multiple_choice",
        "question": "Ambient без нормальної гучності…",
        "options": [
          "Краще тихіше ніж «винести колонки»",
          "Чим голосніше тим завжди краще",
          "Volume завжди 10",
          "Volume завжди 0 і не чіпати"
        ],
        "correctAnswer": 0,
        "explanation": "Краще тихіше ніж «винести колонки»"
      },
      {
        "id": "q5",
        "type": "multiple_choice",
        "question": "Path читається — це критерій бо…",
        "options": [
          "Атмосфера не замінює level design",
          "Path більше не потрібен після Lighting",
          "Path видаляють на М3",
          "Path лише для дорослих"
        ],
        "correctAnswer": 0,
        "explanation": "Атмосфера не замінює level design"
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "Наступний модуль М4 про…",
        "options": [
          "Міні-механіки з готовими скриптами",
          "Тільки Blender",
          "Тільки відеомонтаж",
          "Тільки математику без Studio"
        ],
        "correctAnswer": 0,
        "explanation": "Міні-механіки з готовими скриптами"
      },
      {
        "id": "q7",
        "type": "multiple_choice",
        "question": "Чи М3 вимагає писати if/else?",
        "options": [
          "Ні",
          "Так",
          "Тільки while",
          "Тільки RemoteEvent"
        ],
        "correctAnswer": 0,
        "explanation": "Ні"
      },
      {
        "id": "q8",
        "type": "multiple_choice",
        "question": "Hero-скрін з 3.4 у портфоліо…",
        "options": [
          "Корисно зберегти",
          "Обовʼязково видалити",
          "Замінює Place",
          "Дає Robux сам"
        ],
        "correctAnswer": 0,
        "explanation": "Корисно зберегти"
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "Біом без жодної фішки (все сіре як Baseplate)…",
        "options": [
          "Слабкий результат для М3",
          "Ідеал модуля",
          "Єдина мета курсу",
          "Краще ніж будинок"
        ],
        "correctAnswer": 0,
        "explanation": "Слабкий результат для М3"
      },
      {
        "id": "q10",
        "type": "multiple_choice",
        "question": "Фаза A (М1–М3) в цілому дає…",
        "options": [
          "Міцний світ без скриптингу як фундамент",
          "Повний реліз MMO",
          "Глибокий Lua одразу з уроку 1",
          "Лише теорію без практики"
        ],
        "correctAnswer": 0,
        "explanation": "Міцний світ без скриптингу як фундамент"
      }
    ]
  }
}
