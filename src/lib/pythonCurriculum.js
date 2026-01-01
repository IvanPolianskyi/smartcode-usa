/**
 * Full Curriculum for "Complete Python 3 Bootcamp" (Ukrainian Version)
 * 
 * Структура відповідає Complete Python 3 Bootcamp від Pierian Data
 * 20 Modules (включаючи 3 Milestone Projects)
 * Курс Python: повна навчальна програма
 */

import { QUIZ_QUESTION_TYPES } from './courseData'

export const pythonCurriculum = {
  courseId: "python-developer-zero-to-junior",
  title: "Complete Python 3 Bootcamp - Повний курс Python 3",
  
  modules: [
    {
      moduleId: "module-00",
      order: 0,
      title: "00 - Об'єкти та структури даних Python",
      description: "Основи об'єктів та структур даних: змінні, типи даних, списки, словники, кортежі, множини",
      duration: { weeks: 3, lessons: 8 },
      learningOutcomes: [
        "Розуміння об'єктів та типів даних Python",
        "Робота зі змінними та присвоєнням",
        "Створення та маніпуляція списками, словниками, кортежами та множинами",
        "Розуміння мутабельності та іммутабельності"
      ],
      lessons: [
        {
          lessonId: "lesson-00-1",
          order: 1,
          title: "Вступ до Python. Встановлення та перша програма",
          learningObjectives: [
            "Встановити Python на комп'ютер",
            "Налаштувати середовище розробки",
            "Написати першу програму 'Hello, World!'",
            "Розуміти структуру Python коду"
          ],
          estimatedTime: 60,
          prerequisites: []
        },
        {
          lessonId: "lesson-00-2",
          order: 2,
          title: "Змінні та типи даних: int, float, str, bool",
          learningObjectives: [
            "Розуміти концепцію змінних",
            "Вивчити основні типи даних: int, float, str, bool",
            "Навчитися конвертувати типи",
            "Працювати зі змінними в програмах"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-00-1"]
        },
        {
          lessonId: "lesson-00-3",
          order: 3,
          title: "Списки (list): створення, індексація, методи",
          learningObjectives: [
            "Створювати та модифікувати списки",
            "Використовувати індексацію та зрізи",
            "Застосовувати методи списків",
            "Працювати зі списковими включеннями"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-00-2"]
        },
        {
          lessonId: "lesson-00-4",
          order: 4,
          title: "Словники (dict): ключі, значення, методи",
          learningObjectives: [
            "Створювати та модифікувати словники",
            "Отримувати доступ до значень",
            "Використовувати методи словників",
            "Ітерувати по словниках"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-00-3"]
        },
        {
          lessonId: "lesson-00-5",
          order: 5,
          title: "Кортежі (tuple) та множини (set)",
          learningObjectives: [
            "Розуміти різницю між списками та кортежами",
            "Створювати та використовувати кортежі",
            "Розуміти різницю між множинами та списками",
            "Використовувати операції з множинами"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-00-4"]
        },
        {
          lessonId: "lesson-00-6",
          order: 6,
          title: "Рядки (str): методи, форматування, індексація",
          learningObjectives: [
            "Маніпулювати рядками",
            "Використовувати методи рядків",
            "Форматувати рядки (f-strings, format)",
            "Працювати з індексацією та зрізами рядків"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-00-5"]
        },
        {
          lessonId: "lesson-00-7",
          order: 7,
          title: "Вкладені структури даних",
          learningObjectives: [
            "Створювати вкладені списки та словники",
            "Отримувати доступ до вкладених даних",
            "Маніпулювати складними структурами",
            "Застосовувати для реальних задач"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-00-6"]
        },
        {
          lessonId: "lesson-00-8",
          order: 8,
          title: "Практика: задачі з об'єктами та структурами даних",
          learningObjectives: [
            "Розв'язувати практичні задачі з об'єктами",
            "Застосовувати всі набуті знання",
            "Аналізувати та оптимізувати рішення",
            "Практикуватися у роботі з даними"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-00-7"]
        }
      ]
    },
    {
      moduleId: "module-01",
      order: 1,
      title: "01 - Оператори порівняння Python",
      description: "Оператори порівняння та логічні оператори для роботи з умовами",
      duration: { weeks: 1, lessons: 3 },
      learningOutcomes: [
        "Використання операторів порівняння",
        "Розуміння логічних операторів",
        "Робота з булевими значеннями",
        "Створення складних умов"
      ],
      lessons: [
        {
          lessonId: "lesson-01-1",
          order: 1,
          title: "Оператори порівняння: ==, !=, <, >, <=, >=",
          learningObjectives: [
            "Використовувати оператори порівняння",
            "Порівнювати різні типи даних",
            "Розуміти результати порівняння",
            "Застосовувати для різних структур даних"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-00-8"]
        },
        {
          lessonId: "lesson-01-2",
          order: 2,
          title: "Логічні оператори: and, or, not",
          learningObjectives: [
            "Використовувати логічні оператори and, or, not",
            "Створювати складні умови",
            "Розуміти пріоритет операторів",
            "Застосовувати логічні операції"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-01-1"]
        },
        {
          lessonId: "lesson-01-3",
          order: 3,
          title: "Практика: задачі з операторами порівняння",
          learningObjectives: [
            "Розв'язувати практичні задачі з порівнянням",
            "Застосовувати логічні оператори",
            "Створювати складні умови",
            "Практикуватися у написанні умовних виразів"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-01-2"]
        }
      ]
    },
    {
      moduleId: "module-02",
      order: 2,
      title: "02 - Оператори Python (Statements)",
      description: "Умовні оператори if/elif/else та цикли for/while для контролю потоку виконання",
      duration: { weeks: 3, lessons: 8 },
      learningOutcomes: [
        "Використання умовних операторів if/elif/else",
        "Робота з циклами for та while",
        "Контроль виконання циклів",
        "Розв'язання алгоритмічних задач"
      ],
      lessons: [
        {
          lessonId: "lesson-02-1",
          order: 1,
          title: "Умовні конструкції if / elif / else",
          learningObjectives: [
            "Розуміти логіку умовних операторів",
            "Використовувати if, elif, else",
            "Працювати з вкладеними умовами",
            "Застосовувати тернарний оператор"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-01-3"]
        },
        {
          lessonId: "lesson-02-2",
          order: 2,
          title: "Цикл while",
          learningObjectives: [
            "Використовувати цикл while",
            "Контролювати умови виходу з циклу",
            "Уникати нескінченних циклів",
            "Застосовувати while для різних задач"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-1"]
        },
        {
          lessonId: "lesson-02-3",
          order: 3,
          title: "Цикл for та функція range()",
          learningObjectives: [
            "Використовувати цикл for для ітерації",
            "Застосовувати функцію range()",
            "Ітерувати по послідовностях",
            "Працювати з enumerate() та zip()"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-2"]
        },
        {
          lessonId: "lesson-02-4",
          order: 4,
          title: "break, continue, else в циклах",
          learningObjectives: [
            "Використовувати break для виходу з циклу",
            "Застосовувати continue для пропуску ітерації",
            "Розуміти else в циклах",
            "Контролювати виконання циклів"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-02-3"]
        },
        {
          lessonId: "lesson-02-5",
          order: 5,
          title: "Вкладені цикли та умови",
          learningObjectives: [
            "Створювати вкладені цикли",
            "Комбінувати цикли з умовами",
            "Розуміти складність вкладених циклів",
            "Оптимізувати вкладені конструкції"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-4"]
        },
        {
          lessonId: "lesson-02-6",
          order: 6,
          title: "List comprehensions та генератори списків",
          learningObjectives: [
            "Створювати list comprehensions",
            "Використовувати умовні включення",
            "Вкладені list comprehensions",
            "Оптимізувати код з використанням comprehensions"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-5"]
        },
        {
          lessonId: "lesson-02-7",
          order: 7,
          title: "Практика: алгоритмічні задачі",
          learningObjectives: [
            "Розв'язувати алгоритмічні задачі",
            "Застосовувати цикли та умови",
            "Аналізувати складність алгоритмів",
            "Практикуватися у написанні ефективного коду"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-02-6"]
        },
        {
          lessonId: "lesson-02-8",
          order: 8,
          title: "Практика: додаткові задачі з операторами",
          learningObjectives: [
            "Закріпити знання з операторів",
            "Розв'язувати складніші задачі",
            "Комбінувати різні типи операторів",
            "Підготуватися до першого проекту"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-02-7"]
        }
      ]
    },
    {
      moduleId: "module-03",
      order: 3,
      title: "03 - Методи та функції",
      description: "Створення функцій, методи об'єктів, lambda функції, область видимості",
      duration: { weeks: 4, lessons: 10 },
      learningOutcomes: [
        "Створювати та використовувати функції",
        "Розуміти методи об'єктів",
        "Використовувати lambda функції",
        "Розуміти область видимості змінних"
      ],
      lessons: [
        {
          lessonId: "lesson-03-1",
          order: 1,
          title: "Функції: оголошення та виклик",
          learningObjectives: [
            "Оголошувати та викликати функції",
            "Передавати аргументи",
            "Повертати значення",
            "Розуміти параметри за замовчуванням"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-8"]
        },
        {
          lessonId: "lesson-03-2",
          order: 2,
          title: "Параметри, return, None",
          learningObjectives: [
            "Розуміти різницю між параметрами та аргументами",
            "Використовувати return для повернення значень",
            "Розуміти None та його використання",
            "Створювати функції з різними типами повернення"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-03-1"]
        },
        {
          lessonId: "lesson-03-3",
          order: 3,
          title: "Позиційні та іменовані аргументи",
          learningObjectives: [
            "Використовувати позиційні аргументи",
            "Застосовувати іменовані аргументи",
            "Комбінувати різні типи аргументів",
            "Розуміти порядок аргументів"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-03-2"]
        },
        {
          lessonId: "lesson-03-4",
          order: 4,
          title: "*args та **kwargs",
          learningObjectives: [
            "Використовувати *args для змінної кількості аргументів",
            "Застосовувати **kwargs для ключових аргументів",
            "Комбінувати різні типи аргументів",
            "Розпаковувати аргументи"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-3"]
        },
        {
          lessonId: "lesson-03-5",
          order: 5,
          title: "Методи об'єктів: методи рядків, списків, словників",
          learningObjectives: [
            "Використовувати методи рядків",
            "Застосовувати методи списків",
            "Працювати з методами словників",
            "Розуміти різницю між функціями та методами"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-4"]
        },
        {
          lessonId: "lesson-03-6",
          order: 6,
          title: "Lambda-функції",
          learningObjectives: [
            "Створювати lambda функції",
            "Використовувати lambda з map(), filter(), sorted()",
            "Застосовувати функції як об'єкти",
            "Розуміти коли використовувати lambda"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-03-5"]
        },
        {
          lessonId: "lesson-03-7",
          order: 7,
          title: "Область видимості змінних (scope)",
          learningObjectives: [
            "Розуміти локальну та глобальну область видимості",
            "Використовувати ключове слово global",
            "Уникати конфліктів імен",
            "Працювати з nonlocal"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-6"]
        },
        {
          lessonId: "lesson-03-8",
          order: 8,
          title: "Рекурсія",
          learningObjectives: [
            "Розуміти концепцію рекурсії",
            "Створювати рекурсивні функції",
            "Розв'язувати задачі рекурсивно",
            "Уникати нескінченної рекурсії"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-7"]
        },
        {
          lessonId: "lesson-03-9",
          order: 9,
          title: "Функції вищого порядку: map, filter, reduce",
          learningObjectives: [
            "Використовувати map() для перетворення",
            "Застосовувати filter() для фільтрації",
            "Використовувати reduce() для згортки",
            "Комбінувати функції вищого порядку"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-8"]
        },
        {
          lessonId: "lesson-03-10",
          order: 10,
          title: "Практика: написання функцій",
          learningObjectives: [
            "Створювати складні функції",
            "Застосовувати всі набуті знання",
            "Практикуватися у написанні функцій",
            "Підготуватися до першого проекту"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-03-9"]
        }
      ]
    },
    {
      moduleId: "module-04",
      order: 4,
      title: "04 - Milestone Project 1",
      description: "Перший великий проект: створення повноцінної програми з використанням всіх набутих знань",
      duration: { weeks: 2, lessons: 1 },
      learningOutcomes: [
        "Застосувати всі набуті знання на практиці",
        "Створити повноцінну програму",
        "Організувати код логічно",
        "Реалізувати інтерактивну програму"
      ],
      lessons: [
        {
          lessonId: "lesson-04-1",
          order: 1,
          title: "Milestone Project 1: Гра або інтерактивна програма",
          learningObjectives: [
            "Створити повноцінну програму",
            "Застосувати об'єкти, структури даних, оператори та функції",
            "Організувати код логічно",
            "Реалізувати інтерактивність",
            "Тестувати та відлагоджувати програму"
          ],
          estimatedTime: 300,
          prerequisites: ["lesson-03-10"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-05",
      order: 5,
      title: "05 - Об'єктно-орієнтоване програмування",
      description: "Класи, об'єкти, наслідування, поліморфізм, інкапсуляція, магічні методи",
      duration: { weeks: 5, lessons: 10 },
      learningOutcomes: [
        "Створювати класи та об'єкти",
        "Використовувати наслідування",
        "Застосовувати поліморфізм",
        "Розуміти інкапсуляцію та абстракцію"
      ],
      lessons: [
        {
          lessonId: "lesson-05-1",
          order: 1,
          title: "Основи ООП: класи та об'єкти",
          learningObjectives: [
            "Створювати класи",
            "Створювати об'єкти (екземпляри)",
            "Розуміти атрибути та методи",
            "Використовувати конструктор __init__"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-04-1"]
        },
        {
          lessonId: "lesson-05-2",
          order: 2,
          title: "Атрибути та методи класу",
          learningObjectives: [
            "Створювати методи екземпляра",
            "Використовувати методи класу (@classmethod)",
            "Застосовувати статичні методи (@staticmethod)",
            "Розуміти різницю між типами методів"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-05-1"]
        },
        {
          lessonId: "lesson-05-3",
          order: 3,
          title: "Інкапсуляція та модифікатори доступу",
          learningObjectives: [
            "Розуміти концепцію інкапсуляції",
            "Використовувати публічні та приватні атрибути",
            "Застосовувати property декоратор",
            "Контролювати доступ до даних"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-05-2"]
        },
        {
          lessonId: "lesson-05-4",
          order: 4,
          title: "Наслідування",
          learningObjectives: [
            "Створювати дочірні класи",
            "Перевизначати методи",
            "Використовувати super()",
            "Розуміти MRO (Method Resolution Order)"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-05-3"]
        },
        {
          lessonId: "lesson-05-5",
          order: 5,
          title: "Поліморфізм",
          learningObjectives: [
            "Розуміти поліморфізм",
            "Реалізовувати поліморфізм в Python",
            "Застосовувати duck typing",
            "Використовувати поліморфізм на практиці"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-05-4"]
        },
        {
          lessonId: "lesson-05-6",
          order: 6,
          title: "Магічні методи (__str__, __len__, __repr__ тощо)",
          learningObjectives: [
            "Використовувати __str__ та __repr__",
            "Реалізовувати оператори (__add__, __eq__)",
            "Створювати контекстні менеджери",
            "Використовувати __getitem__, __setitem__"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-05-5"]
        },
        {
          lessonId: "lesson-05-7",
          order: 7,
          title: "Dataclasses",
          learningObjectives: [
            "Використовувати dataclasses для спрощення класів",
            "Автоматично генерувати методи",
            "Застосовувати декоратори dataclass",
            "Працювати з полями та значеннями за замовчуванням"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-05-6"]
        },
        {
          lessonId: "lesson-05-8",
          order: 8,
          title: "Абстрактні класи та інтерфейси",
          learningObjectives: [
            "Використовувати абстрактні базові класи",
            "Реалізовувати інтерфейси",
            "Застосовувати ABC модуль",
            "Створювати контракти для класів"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-05-7"]
        },
        {
          lessonId: "lesson-05-9",
          order: 9,
          title: "Композиція vs наслідування",
          learningObjectives: [
            "Розуміти різницю між композицією та наслідуванням",
            "Вибирати правильний підхід",
            "Застосовувати композицію",
            "Уникати проблем наслідування"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-05-8"]
        },
        {
          lessonId: "lesson-05-10",
          order: 10,
          title: "Практика: ООП-проєкт",
          learningObjectives: [
            "Створити систему з використанням ООП",
            "Реалізувати наслідування та поліморфізм",
            "Застосувати всі принципи ООП",
            "Створити повноцінний проект"
          ],
          estimatedTime: 180,
          prerequisites: ["lesson-05-9"]
        }
      ]
    },
    {
      moduleId: "module-06",
      order: 6,
      title: "06 - Модулі та пакети",
      description: "Створення та використання модулів, організація коду в пакети, стандартна бібліотека",
      duration: { weeks: 2, lessons: 5 },
      learningOutcomes: [
        "Створювати власні модулі",
        "Організовувати код у пакети",
        "Використовувати стандартну бібліотеку Python",
        "Імпортувати та експортувати функціональність"
      ],
      lessons: [
        {
          lessonId: "lesson-06-1",
          order: 1,
          title: "Модулі та імпорт",
          learningObjectives: [
            "Імпортувати модулі",
            "Створювати власні модулі",
            "Використовувати різні способи імпорту",
            "Розуміти __name__ та __main__"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-05-10"]
        },
        {
          lessonId: "lesson-06-2",
          order: 2,
          title: "Пакети та __init__.py",
          learningObjectives: [
            "Організовувати код у пакети",
            "Використовувати __init__.py",
            "Створювати ієрархію пакетів",
            "Імпортувати з пакетів"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-06-1"]
        },
        {
          lessonId: "lesson-06-3",
          order: 3,
          title: "Стандартна бібліотека Python: os, sys, pathlib",
          learningObjectives: [
            "Використовувати os для роботи з системою",
            "Працювати з sys для системних параметрів",
            "Використовувати pathlib для шляхів",
            "Отримувати інформацію про систему"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-06-2"]
        },
        {
          lessonId: "lesson-06-4",
          order: 4,
          title: "Стандартна бібліотека: datetime, math, random",
          learningObjectives: [
            "Працювати з датами та часом",
            "Використовувати математичні функції",
            "Генерувати випадкові числа",
            "Застосовувати для різних задач"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-06-3"]
        },
        {
          lessonId: "lesson-06-5",
          order: 5,
          title: "Практика: створення власного пакету",
          learningObjectives: [
            "Створити власний пакет",
            "Організувати код логічно",
            "Застосувати модульну архітектуру",
            "Практикуватися у написанні модульного коду"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-06-4"]
        }
      ]
    },
    {
      moduleId: "module-07",
      order: 7,
      title: "07 - Обробка помилок та винятків",
      description: "Try/except блоки, створення власних винятків, обробка помилок у програмах",
      duration: { weeks: 2, lessons: 5 },
      learningOutcomes: [
        "Обробляти винятки",
        "Створювати власні винятки",
        "Використовувати try/except/finally",
        "Працювати з різними типами помилок"
      ],
      lessons: [
        {
          lessonId: "lesson-07-1",
          order: 1,
          title: "Обробка помилок: try / except / finally",
          learningObjectives: [
            "Розуміти концепцію винятків",
            "Використовувати try/except блоки",
            "Обробляти конкретні типи помилок",
            "Використовувати finally та else"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-06-5"]
        },
        {
          lessonId: "lesson-07-2",
          order: 2,
          title: "Типи винятків та обробка помилок",
          learningObjectives: [
            "Розуміти різні типи винятків",
            "Обробляти кілька типів помилок",
            "Використовувати except без типу",
            "Логувати помилки"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-07-1"]
        },
        {
          lessonId: "lesson-07-3",
          order: 3,
          title: "Створення власних винятків",
          learningObjectives: [
            "Створювати кастомні класи винятків",
            "Піднімати винятки (raise)",
            "Створювати ієрархію винятків",
            "Документувати винятки"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-07-2"]
        },
        {
          lessonId: "lesson-07-4",
          order: 4,
          title: "Assert та валідація даних",
          learningObjectives: [
            "Використовувати assert для перевірки",
            "Валідувати вхідні дані",
            "Обробляти помилки валідації",
            "Створювати надійний код"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-07-3"]
        },
        {
          lessonId: "lesson-07-5",
          order: 5,
          title: "Практика: обробка помилок у програмах",
          learningObjectives: [
            "Створити програму з обробкою помилок",
            "Реалізувати валідацію даних",
            "Обробляти різні типи помилок",
            "Створити надійну програму"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-07-4"]
        }
      ]
    },
    {
      moduleId: "module-08",
      order: 8,
      title: "08 - Milestone Project 2",
      description: "Другий великий проект: створення програми з використанням ООП, модулів та обробки помилок",
      duration: { weeks: 2, lessons: 1 },
      learningOutcomes: [
        "Застосувати ООП принципи",
        "Створити модульну архітектуру",
        "Реалізувати обробку помилок",
        "Створити повноцінну програму"
      ],
      lessons: [
        {
          lessonId: "lesson-08-1",
          order: 1,
          title: "Milestone Project 2: Програма з ООП та модулями",
          learningObjectives: [
            "Створити програму з використанням ООП",
            "Організувати код у модулі та пакети",
            "Реалізувати обробку помилок",
            "Створити повноцінну систему",
            "Тестувати та документувати код"
          ],
          estimatedTime: 360,
          prerequisites: ["lesson-07-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-10",
      order: 10,
      title: "10 - Декоратори Python",
      description: "Створення та використання декораторів для розширення функціональності функцій",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Розуміти концепцію декораторів",
        "Створювати власні декоратори",
        "Використовувати вбудовані декоратори",
        "Застосовувати декоратори на практиці"
      ],
      lessons: [
        {
          lessonId: "lesson-10-1",
          order: 1,
          title: "Вступ до декораторів",
          learningObjectives: [
            "Розуміти, що таке декоратори",
            "Використовувати прості декоратори",
            "Розуміти синтаксис @decorator",
            "Застосовувати декоратори до функцій"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-08-1"]
        },
        {
          lessonId: "lesson-10-2",
          order: 2,
          title: "Створення власних декораторів",
          learningObjectives: [
            "Створювати функції-декоратори",
            "Використовувати functools.wraps",
            "Створювати декоратори з параметрами",
            "Комбінувати декоратори"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-10-1"]
        },
        {
          lessonId: "lesson-10-3",
          order: 3,
          title: "Декоратори класів та методів",
          learningObjectives: [
            "Створювати декоратори для класів",
            "Застосовувати декоратори до методів",
            "Використовувати @property, @staticmethod, @classmethod",
            "Створювати складні декоратори"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-10-2"]
        },
        {
          lessonId: "lesson-10-4",
          order: 4,
          title: "Практика: декоратори на практиці",
          learningObjectives: [
            "Створити корисні декоратори",
            "Застосувати декоратори для логування",
            "Використовувати декоратори для кешування",
            "Практикуватися у створенні декораторів"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-10-3"]
        }
      ]
    },
    {
      moduleId: "module-11",
      order: 11,
      title: "11 - Генератори Python",
      description: "Створення генераторів, генераторні вирази, yield, ітератори",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Розуміти концепцію генераторів",
        "Створювати генератори",
        "Використовувати yield",
        "Працювати з ітераторами"
      ],
      lessons: [
        {
          lessonId: "lesson-11-1",
          order: 1,
          title: "Вступ до генераторів",
          learningObjectives: [
            "Розуміти, що таке генератори",
            "Створювати генераторні функції",
            "Використовувати yield",
            "Розуміти переваги генераторів"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-10-4"]
        },
        {
          lessonId: "lesson-11-2",
          order: 2,
          title: "Генераторні вирази та yield",
          learningObjectives: [
            "Створювати генераторні вирази",
            "Використовувати yield from",
            "Працювати з нескінченними генераторами",
            "Оптимізувати пам'ять з генераторами"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-11-1"]
        },
        {
          lessonId: "lesson-11-3",
          order: 3,
          title: "Ітератори та протокол ітерації",
          learningObjectives: [
            "Розуміти протокол ітерації",
            "Створювати власні ітератори",
            "Використовувати __iter__ та __next__",
            "Працювати з ітерабельними об'єктами"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-11-2"]
        },
        {
          lessonId: "lesson-11-4",
          order: 4,
          title: "Практика: генератори на практиці",
          learningObjectives: [
            "Створити корисні генератори",
            "Застосувати генератори для обробки даних",
            "Оптимізувати код з генераторами",
            "Практикуватися у створенні генераторів"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-11-3"]
        }
      ]
    },
    {
      moduleId: "module-12",
      order: 12,
      title: "12 - Розширені модулі Python",
      description: "Поглиблена робота з модулями: collections, itertools, functools, json, csv",
      duration: { weeks: 3, lessons: 6 },
      learningOutcomes: [
        "Використовувати collections для спеціалізованих контейнерів",
        "Застосовувати itertools для ітерації",
        "Використовувати functools для функцій",
        "Працювати з JSON та CSV"
      ],
      lessons: [
        {
          lessonId: "lesson-12-1",
          order: 1,
          title: "Модуль collections",
          learningObjectives: [
            "Використовувати namedtuple, deque, Counter",
            "Застосовувати defaultdict",
            "Працювати з OrderedDict",
            "Використовувати спеціалізовані контейнери"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-11-4"]
        },
        {
          lessonId: "lesson-12-2",
          order: 2,
          title: "Модуль itertools",
          learningObjectives: [
            "Використовувати itertools для ітерації",
            "Застосовувати комбінації та перестановки",
            "Працювати з групуванням",
            "Створювати ефективні ітератори"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-12-1"]
        },
        {
          lessonId: "lesson-12-3",
          order: 3,
          title: "Модуль functools",
          learningObjectives: [
            "Використовувати functools для функцій",
            "Застосовувати декоратори",
            "Використовувати partial та reduce",
            "Кешувати результати функцій"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-12-2"]
        },
        {
          lessonId: "lesson-12-4",
          order: 4,
          title: "Робота з JSON",
          learningObjectives: [
            "Читати та записувати JSON файли",
            "Парсити JSON дані",
            "Серіалізувати об'єкти",
            "Працювати з вкладеними структурами"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-12-3"]
        },
        {
          lessonId: "lesson-12-5",
          order: 5,
          title: "Робота з CSV та Excel",
          learningObjectives: [
            "Читати та записувати CSV файли",
            "Працювати з Excel файлами",
            "Обробляти структуровані дані",
            "Використовувати pandas для таблиць"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-12-4"]
        },
        {
          lessonId: "lesson-12-6",
          order: 6,
          title: "Практика: обробка даних з модулями",
          learningObjectives: [
            "Застосувати розширені модулі",
            "Створити проект з обробки даних",
            "Оптимізувати код за допомогою модулів",
            "Практикуватися у використанні інструментів"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-12-5"]
        }
      ]
    },
    {
      moduleId: "module-13",
      order: 13,
      title: "13 - Веб-скрапінг",
      description: "Збір даних з веб-сторінок за допомогою BeautifulSoup та requests",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Виконувати HTTP-запити",
        "Парсити HTML сторінки",
        "Збирати дані з веб-сайтів",
        "Обробляти отримані дані"
      ],
      lessons: [
        {
          lessonId: "lesson-13-1",
          order: 1,
          title: "HTTP-запити: requests",
          learningObjectives: [
            "Встановити та використовувати requests",
            "Виконувати GET та POST запити",
            "Обробляти відповіді",
            "Працювати з заголовками та cookies"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-12-6"]
        },
        {
          lessonId: "lesson-13-2",
          order: 2,
          title: "Парсинг HTML: BeautifulSoup",
          learningObjectives: [
            "Встановити BeautifulSoup",
            "Парсити HTML структуру",
            "Знаходити елементи за тегами, класами, id",
            "Витягувати дані з HTML"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-13-1"]
        },
        {
          lessonId: "lesson-13-3",
          order: 3,
          title: "Скrapінг веб-сайтів",
          learningObjectives: [
            "Створити скрапер для веб-сайту",
            "Обробляти динамічні сторінки",
            "Зберігати отримані дані",
            "Дотримуватися правил robots.txt"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-13-2"]
        },
        {
          lessonId: "lesson-13-4",
          order: 4,
          title: "Практика: веб-скрапінг проект",
          learningObjectives: [
            "Створити повноцінний скрапер",
            "Збирати дані з реального сайту",
            "Обробляти та зберігати дані",
            "Створити корисний інструмент"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-13-3"]
        }
      ]
    },
    {
      moduleId: "module-14",
      order: 14,
      title: "14 - Робота з зображеннями",
      description: "Обробка зображень за допомогою PIL/Pillow, маніпуляції з зображеннями",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Відкривати та зберігати зображення",
        "Маніпулювати зображеннями",
        "Застосовувати фільтри та ефекти",
        "Створювати обробку зображень"
      ],
      lessons: [
        {
          lessonId: "lesson-14-1",
          order: 1,
          title: "Вступ до PIL/Pillow",
          learningObjectives: [
            "Встановити Pillow",
            "Відкривати та зберігати зображення",
            "Отримувати інформацію про зображення",
            "Конвертувати формати"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-13-4"]
        },
        {
          lessonId: "lesson-14-2",
          order: 2,
          title: "Маніпуляції з зображеннями",
          learningObjectives: [
            "Змінювати розмір зображень",
            "Обрізати та повертати зображення",
            "Змінювати яскравість та контраст",
            "Застосовувати базові фільтри"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-14-1"]
        },
        {
          lessonId: "lesson-14-3",
          order: 3,
          title: "Робота з кольорами та фільтрами",
          learningObjectives: [
            "Конвертувати кольорові простори",
            "Застосовувати фільтри",
            "Створювати ефекти",
            "Працювати з альфа-каналом"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-14-2"]
        },
        {
          lessonId: "lesson-14-4",
          order: 4,
          title: "Практика: обробка зображень",
          learningObjectives: [
            "Створити скрипт для обробки зображень",
            "Реалізувати пакетну обробку",
            "Створити корисний інструмент",
            "Практикуватися у роботі з зображеннями"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-14-3"]
        }
      ]
    },
    {
      moduleId: "module-15",
      order: 15,
      title: "15 - PDF та електронні таблиці",
      description: "Робота з PDF файлами та електронними таблицями (Excel, CSV)",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Читати та створювати PDF файли",
        "Працювати з електронними таблицями",
        "Обробляти структуровані дані",
        "Генерувати звіти"
      ],
      lessons: [
        {
          lessonId: "lesson-15-1",
          order: 1,
          title: "Робота з PDF: PyPDF2 та reportlab",
          learningObjectives: [
            "Встановити PyPDF2 та reportlab",
            "Читати PDF файли",
            "Створювати PDF файли",
            "Маніпулювати PDF документами"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-14-4"]
        },
        {
          lessonId: "lesson-15-2",
          order: 2,
          title: "Робота з Excel: openpyxl",
          learningObjectives: [
            "Встановити openpyxl",
            "Читати Excel файли",
            "Записувати дані в Excel",
            "Маніпулювати листами та комірками"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-15-1"]
        },
        {
          lessonId: "lesson-15-3",
          order: 3,
          title: "Робота з CSV та pandas",
          learningObjectives: [
            "Читати та записувати CSV файли",
            "Використовувати pandas для таблиць",
            "Обробляти структуровані дані",
            "Аналізувати дані"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-15-2"]
        },
        {
          lessonId: "lesson-15-4",
          order: 4,
          title: "Практика: генерація звітів",
          learningObjectives: [
            "Створити скрипт для генерації звітів",
            "Обробляти дані з різних джерел",
            "Генерувати PDF та Excel звіти",
            "Створити корисний інструмент"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-15-3"]
        }
      ]
    },
    {
      moduleId: "module-16",
      order: 16,
      title: "16 - Відправка email з Python",
      description: "Відправка email повідомлень, робота з SMTP, створення HTML email",
      duration: { weeks: 1, lessons: 3 },
      learningOutcomes: [
        "Відправляти email повідомлення",
        "Працювати з SMTP",
        "Створювати HTML email",
        "Додавати вкладення"
      ],
      lessons: [
        {
          lessonId: "lesson-16-1",
          order: 1,
          title: "Вступ до email: smtplib",
          learningObjectives: [
            "Розуміти протокол SMTP",
            "Використовувати smtplib",
            "Відправляти прості email",
            "Налаштувати SMTP сервер"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-15-4"]
        },
        {
          lessonId: "lesson-16-2",
          order: 2,
          title: "Створення HTML email та вкладення",
          learningObjectives: [
            "Створювати HTML email",
            "Додавати вкладення",
            "Форматувати повідомлення",
            "Використовувати email модуль"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-16-1"]
        },
        {
          lessonId: "lesson-16-3",
          order: 3,
          title: "Практика: автоматизація email",
          learningObjectives: [
            "Створити скрипт для відправки email",
            "Автоматизувати відправку звітів",
            "Створити систему сповіщень",
            "Практикуватися у роботі з email"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-16-2"]
        }
      ]
    },
    {
      moduleId: "module-17",
      order: 17,
      title: "17 - Розширені об'єкти та структури даних",
      description: "Поглиблена робота з об'єктами: протоколи, контекстні менеджери, дескриптори",
      duration: { weeks: 2, lessons: 5 },
      learningOutcomes: [
        "Розуміти протоколи Python",
        "Створювати контекстні менеджери",
        "Використовувати дескриптори",
        "Працювати з розширеними структурами"
      ],
      lessons: [
        {
          lessonId: "lesson-17-1",
          order: 1,
          title: "Контекстні менеджери та with",
          learningObjectives: [
            "Розуміти контекстні менеджери",
            "Використовувати with statement",
            "Створювати власні контекстні менеджери",
            "Використовувати contextlib"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-16-3"]
        },
        {
          lessonId: "lesson-17-2",
          order: 2,
          title: "Дескриптори та property",
          learningObjectives: [
            "Розуміти дескриптори",
            "Створювати власні дескриптори",
            "Використовувати property",
            "Застосовувати для валідації"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-17-1"]
        },
        {
          lessonId: "lesson-17-3",
          order: 3,
          title: "Протоколи та duck typing",
          learningObjectives: [
            "Розуміти протоколи Python",
            "Застосовувати duck typing",
            "Реалізовувати протоколи",
            "Використовувати typing протоколи"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-17-2"]
        },
        {
          lessonId: "lesson-17-4",
          order: 4,
          title: "Розширені структури даних",
          learningObjectives: [
            "Використовувати спеціалізовані структури",
            "Створювати власні структури даних",
            "Оптимізувати роботу з даними",
            "Застосовувати для складних задач"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-17-3"]
        },
        {
          lessonId: "lesson-17-5",
          order: 5,
          title: "Практика: розширені об'єкти",
          learningObjectives: [
            "Створити складні об'єкти",
            "Застосувати протоколи та дескриптори",
            "Створити корисні структури даних",
            "Практикуватися у роботі з об'єктами"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-17-4"]
        }
      ]
    },
    {
      moduleId: "module-18",
      order: 18,
      title: "18 - Milestone Project 3",
      description: "Третій великий проект: створення повноцінної програми з використанням всіх набутих знань",
      duration: { weeks: 3, lessons: 1 },
      learningOutcomes: [
        "Застосувати всі набуті знання",
        "Створити повноцінну програму",
        "Використати веб-скрапінг, обробку файлів, email",
        "Створити фінальний проект"
      ],
      lessons: [
        {
          lessonId: "lesson-18-1",
          order: 1,
          title: "Milestone Project 3: Фінальний проект",
          learningObjectives: [
            "Створити повноцінну програму",
            "Застосувати всі набуті знання",
            "Використати веб-скрапінг, обробку файлів, email",
            "Створити модульну архітектуру",
            "Реалізувати обробку помилок",
            "Створити документацію",
            "Протестувати програму"
          ],
          estimatedTime: 480,
          prerequisites: ["lesson-17-5"],
          isProject: true,
          isFinalProject: true
        }
      ]
    },
    {
      moduleId: "module-19",
      order: 19,
      title: "19 - Бонус: Вступ до графічних інтерфейсів (GUI)",
      description: "Створення графічних інтерфейсів користувача з Tkinter",
      duration: { weeks: 2, lessons: 5 },
      learningOutcomes: [
        "Створювати графічні інтерфейси",
        "Використовувати віджети Tkinter",
        "Обробляти події",
        "Створювати повноцінні GUI-додатки"
      ],
      lessons: [
        {
          lessonId: "lesson-19-1",
          order: 1,
          title: "Вступ до GUI. Що таке Tkinter",
          learningObjectives: [
            "Розуміти, що таке GUI",
            "Ознайомитися з Tkinter",
            "Зрозуміти архітектуру GUI додатків",
            "Підготувати середовище для роботи"
          ],
          estimatedTime: 60,
          prerequisites: ["lesson-18-1"]
        },
        {
          lessonId: "lesson-19-2",
          order: 2,
          title: "Створення першого вікна. Tk(), mainloop()",
          learningObjectives: [
            "Створити перше вікно",
            "Використовувати Tk() та mainloop()",
            "Налаштувати розміри та заголовок",
            "Закривати вікно"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-19-1"]
        },
        {
          lessonId: "lesson-19-3",
          order: 3,
          title: "Віджети: Label, Button, Entry, Text",
          learningObjectives: [
            "Використовувати Label для тексту",
            "Створювати кнопки з Button",
            "Отримувати введення через Entry та Text",
            "Налаштовувати віджети"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-19-2"]
        },
        {
          lessonId: "lesson-19-4",
          order: 4,
          title: "Розміщення елементів: pack, grid, place",
          learningObjectives: [
            "Використовувати pack для розміщення",
            "Застосовувати grid для таблиць",
            "Використовувати place для точкового розміщення",
            "Вибирати правильний метод"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-19-3"]
        },
        {
          lessonId: "lesson-19-5",
          order: 5,
          title: "Обробка подій та практика: GUI-застосунок",
          learningObjectives: [
            "Обробляти події кліку",
            "Створювати callback-функції",
            "Створити повноцінний GUI-додаток",
            "Застосувати всі набуті знання"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-19-4"],
          isProject: true
        }
      ]
    }
  ]
}
