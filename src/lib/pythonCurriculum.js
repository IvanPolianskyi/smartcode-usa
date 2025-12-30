/**
 * Full Curriculum for "Python Developer: From Zero to Confident Junior"
 * 
 * 7 Modules, 4-6 lessons each
 * Total: 48 lessons
 */

import { QUIZ_QUESTION_TYPES } from './courseData'

export const pythonCurriculum = {
  courseId: "python-developer-zero-to-junior",
  title: "Python Developer: From Zero to Confident Junior",
  
  modules: [
    {
      moduleId: "module-1",
      order: 1,
      title: "Основи Python та середовище розробки",
      description: "Знайомство з Python, встановлення інструментів, перші програми",
      duration: { weeks: 4, lessons: 6 },
      learningOutcomes: [
        "Встановлення та налаштування Python",
        "Розуміння базових концепцій програмування",
        "Робота зі змінними та типами даних",
        "Використання IDE для розробки"
      ],
      lessons: [
        {
          lessonId: "lesson-1-1",
          order: 1,
          title: "Вступ до Python та встановлення",
          learningObjectives: [
            "Зрозуміти, що таке Python та його переваги",
            "Встановити Python та налаштувати середовище",
            "Написати першу програму 'Hello, World!'",
            "Ознайомитися з інтерпретатором Python"
          ],
          estimatedTime: 60,
          prerequisites: []
        },
        {
          lessonId: "lesson-1-2",
          order: 2,
          title: "Змінні та типи даних",
          learningObjectives: [
            "Розуміти концепцію змінних",
            "Вивчити основні типи даних: int, float, str, bool",
            "Навчитися конвертувати типи",
            "Працювати зі змінними в програмах"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-1-1"]
        },
        {
          lessonId: "lesson-1-3",
          order: 3,
          title: "Оператори та вирази",
          learningObjectives: [
            "Використовувати арифметичні оператори",
            "Розуміти оператори порівняння",
            "Застосовувати логічні оператори",
            "Працювати з операторами присвоєння"
          ],
          estimatedTime: 60,
          prerequisites: ["lesson-1-2"]
        },
        {
          lessonId: "lesson-1-4",
          order: 4,
          title: "Введення та виведення даних",
          learningObjectives: [
            "Використовувати функцію print()",
            "Отримувати введення через input()",
            "Форматувати виведення",
            "Обробляти помилки введення"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-1-3"]
        },
        {
          lessonId: "lesson-1-5",
          order: 5,
          title: "Робота з рядками",
          learningObjectives: [
            "Маніпулювати рядками",
            "Використовувати методи рядків",
            "Форматувати рядки (f-strings)",
            "Працювати з індексацією та зрізами"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-1-4"]
        },
        {
          lessonId: "lesson-1-6",
          order: 6,
          title: "Модуль 1: Практичний проект - Калькулятор",
          learningObjectives: [
            "Застосувати всі навички з модуля",
            "Створити інтерактивний калькулятор",
            "Обробляти різні типи операцій",
            "Додати обробку помилок"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-1-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-2",
      order: 2,
      title: "Умови, цикли та структури даних",
      description: "Контроль потоку виконання та робота зі списками, словниками",
      duration: { weeks: 5, lessons: 6 },
      learningOutcomes: [
        "Використання умовних операторів if/elif/else",
        "Робота з циклами for та while",
        "Створення та маніпуляція списками",
        "Робота зі словниками та множинами"
      ],
      lessons: [
        {
          lessonId: "lesson-2-1",
          order: 1,
          title: "Умовні оператори if/elif/else",
          learningObjectives: [
            "Розуміти логіку умовних операторів",
            "Використовувати if, elif, else",
            "Працювати з вкладеними умовами",
            "Застосовувати тернарний оператор"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-1-6"]
        },
        {
          lessonId: "lesson-2-2",
          order: 2,
          title: "Цикли for та while",
          learningObjectives: [
            "Використовувати цикл for для ітерації",
            "Застосовувати цикл while",
            "Контролювати виконання циклів (break, continue)",
            "Працювати з вкладеними циклами"
          ],
          estimatedTime: 105,
          prerequisites: ["lesson-2-1"]
        },
        {
          lessonId: "lesson-2-3",
          order: 3,
          title: "Списки (Lists)",
          learningObjectives: [
            "Створювати та модифікувати списки",
            "Використовувати методи списків",
            "Працювати зі зрізами списків",
            "Створювати спискові включення (list comprehensions)"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-2-2"]
        },
        {
          lessonId: "lesson-2-4",
          order: 4,
          title: "Словники (Dictionaries)",
          learningObjectives: [
            "Створювати та модифікувати словники",
            "Отримувати доступ до значень",
            "Використовувати методи словників",
            "Ітерувати по словниках"
          ],
          estimatedTime: 105,
          prerequisites: ["lesson-2-3"]
        },
        {
          lessonId: "lesson-2-5",
          order: 5,
          title: "Множини та кортежі",
          learningObjectives: [
            "Розуміти різницю між множинами та списками",
            "Використовувати операції з множинами",
            "Працювати з кортежами",
            "Вибирати правильну структуру даних"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-2-4"]
        },
        {
          lessonId: "lesson-2-6",
          order: 6,
          title: "Модуль 2: Практичний проект - Система управління завданнями",
          learningObjectives: [
            "Створити систему для управління завданнями",
            "Використати словники для зберігання даних",
            "Реалізувати CRUD операції",
            "Додати пошук та фільтрацію"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-2-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-3",
      order: 3,
      title: "Функції та модульність коду",
      description: "Створення функцій, робота з модулями та пакетами",
      duration: { weeks: 4, lessons: 5 },
      learningOutcomes: [
        "Створювати та використовувати функції",
        "Розуміти область видимості змінних",
        "Працювати з модулями та пакетами",
        "Використовувати lambda функції"
      ],
      lessons: [
        {
          lessonId: "lesson-3-1",
          order: 1,
          title: "Створення функцій",
          learningObjectives: [
            "Оголошувати та викликати функції",
            "Передавати аргументи",
            "Повертати значення",
            "Розуміти параметри за замовчуванням"
          ],
          estimatedTime: 105,
          prerequisites: ["lesson-2-6"]
        },
        {
          lessonId: "lesson-3-2",
          order: 2,
          title: "Область видимості та глобальні змінні",
          learningObjectives: [
            "Розуміти локальну та глобальну область видимості",
            "Використовувати ключове слово global",
            "Уникати конфліктів імен",
            "Працювати з nonlocal"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-3-1"]
        },
        {
          lessonId: "lesson-3-3",
          order: 3,
          title: "Аргументи: *args та **kwargs",
          learningObjectives: [
            "Використовувати *args для змінної кількості аргументів",
            "Застосовувати **kwargs для ключових аргументів",
            "Комбінувати різні типи аргументів",
            "Розпаковувати аргументи"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-3-2"]
        },
        {
          lessonId: "lesson-3-4",
          order: 4,
          title: "Lambda функції та функції вищого порядку",
          learningObjectives: [
            "Створювати lambda функції",
            "Використовувати map(), filter(), reduce()",
            "Застосовувати функції як об'єкти",
            "Працювати з декораторами (базово)"
          ],
          estimatedTime: 105,
          prerequisites: ["lesson-3-3"]
        },
        {
          lessonId: "lesson-3-5",
          order: 5,
          title: "Модулі та пакети",
          learningObjectives: [
            "Імпортувати модулі",
            "Створювати власні модулі",
            "Організовувати код у пакети",
            "Використовувати стандартну бібліотеку Python"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-3-4"]
        }
      ]
    },
    {
      moduleId: "module-4",
      order: 4,
      title: "Робота з файлами та обробка помилок",
      description: "Читання/запис файлів, обробка винятків, робота з JSON",
      duration: { weeks: 3, lessons: 5 },
      learningOutcomes: [
        "Читати та записувати файли",
        "Обробляти винятки",
        "Робота з JSON та CSV",
        "Логування помилок"
      ],
      lessons: [
        {
          lessonId: "lesson-4-1",
          order: 1,
          title: "Читання та запис файлів",
          learningObjectives: [
            "Відкривати файли для читання/запису",
            "Використовувати контекстний менеджер (with)",
            "Працювати з різними кодуваннями",
            "Обробляти бінарні файли"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-3-5"]
        },
        {
          lessonId: "lesson-4-2",
          order: 2,
          title: "Обробка винятків (try/except)",
          learningObjectives: [
            "Розуміти концепцію винятків",
            "Використовувати try/except блоки",
            "Обробляти конкретні типи помилок",
            "Використовувати finally та else"
          ],
          estimatedTime: 105,
          prerequisites: ["lesson-4-1"]
        },
        {
          lessonId: "lesson-4-3",
          order: 3,
          title: "Створення власних винятків",
          learningObjectives: [
            "Створювати кастомні класи винятків",
            "Піднімати винятки (raise)",
            "Створювати ієрархію винятків",
            "Документувати винятки"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-4-2"]
        },
        {
          lessonId: "lesson-4-4",
          order: 4,
          title: "Робота з JSON та CSV",
          learningObjectives: [
            "Парсити JSON дані",
            "Записувати дані у JSON",
            "Читати та записувати CSV файли",
            "Обробляти структуровані дані"
          ],
          estimatedTime: 105,
          prerequisites: ["lesson-4-3"]
        },
        {
          lessonId: "lesson-4-5",
          order: 5,
          title: "Модуль 4: Практичний проект - Обробка даних",
          learningObjectives: [
            "Створити скрипт для обробки файлів",
            "Реалізувати обробку помилок",
            "Працювати з JSON/CSV даними",
            "Генерувати звіти"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-4-4"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-5",
      order: 5,
      title: "Об'єктно-орієнтоване програмування",
      description: "Класи, об'єкти, наслідування, поліморфізм, інкапсуляція",
      duration: { weeks: 5, lessons: 6 },
      learningOutcomes: [
        "Створювати класи та об'єкти",
        "Використовувати наслідування",
        "Застосовувати поліморфізм",
        "Розуміти інкапсуляцію"
      ],
      lessons: [
        {
          lessonId: "lesson-5-1",
          order: 1,
          title: "Класи та об'єкти",
          learningObjectives: [
            "Створювати класи",
            "Створювати об'єкти (екземпляри)",
            "Розуміти атрибути та методи",
            "Використовувати конструктор __init__"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-4-5"]
        },
        {
          lessonId: "lesson-5-2",
          order: 2,
          title: "Методи та властивості",
          learningObjectives: [
            "Створювати методи екземпляра",
            "Використовувати методи класу (@classmethod)",
            "Застосовувати статичні методи (@staticmethod)",
            "Використовувати property декоратор"
          ],
          estimatedTime: 105,
          prerequisites: ["lesson-5-1"]
        },
        {
          lessonId: "lesson-5-3",
          order: 3,
          title: "Наслідування",
          learningObjectives: [
            "Створювати дочірні класи",
            "Перевизначати методи",
            "Використовувати super()",
            "Розуміти MRO (Method Resolution Order)"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-5-2"]
        },
        {
          lessonId: "lesson-5-4",
          order: 4,
          title: "Поліморфізм та абстрактні класи",
          learningObjectives: [
            "Розуміти поліморфізм",
            "Використовувати абстрактні базові класи",
            "Реалізовувати інтерфейси",
            "Застосовувати duck typing"
          ],
          estimatedTime: 105,
          prerequisites: ["lesson-5-3"]
        },
        {
          lessonId: "lesson-5-5",
          order: 5,
          title: "Спеціальні методи (магічні методи)",
          learningObjectives: [
            "Використовувати __str__ та __repr__",
            "Реалізовувати оператори (__add__, __eq__)",
            "Створювати контекстні менеджери",
            "Використовувати __getitem__, __setitem__"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-5-4"]
        },
        {
          lessonId: "lesson-5-6",
          order: 6,
          title: "Модуль 5: Практичний проект - Система управління бібліотекою",
          learningObjectives: [
            "Створити систему з використанням ООП",
            "Реалізувати наслідування",
            "Застосувати поліморфізм",
            "Створити повноцінний проект"
          ],
          estimatedTime: 180,
          prerequisites: ["lesson-5-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-6",
      order: 6,
      title: "Веб-розробка з Flask",
      description: "Створення веб-додатків, робота з базами даних, REST API",
      duration: { weeks: 5, lessons: 6 },
      learningOutcomes: [
        "Створювати веб-додатки на Flask",
        "Робота з шаблонами",
        "Підключення до бази даних",
        "Створення REST API"
      ],
      lessons: [
        {
          lessonId: "lesson-6-1",
          order: 1,
          title: "Вступ до Flask та перший веб-додаток",
          learningObjectives: [
            "Встановити Flask",
            "Створити перший веб-додаток",
            "Розуміти маршрутизацію",
            "Використовувати декоратори для маршрутів"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-5-6"]
        },
        {
          lessonId: "lesson-6-2",
          order: 2,
          title: "Шаблони (Templates) та Jinja2",
          learningObjectives: [
            "Створювати HTML шаблони",
            "Використовувати Jinja2 синтаксис",
            "Передавати дані у шаблони",
            "Створювати базові шаблони"
          ],
          estimatedTime: 105,
          prerequisites: ["lesson-6-1"]
        },
        {
          lessonId: "lesson-6-3",
          order: 3,
          title: "Форми та обробка даних",
          learningObjectives: [
            "Створювати HTML форми",
            "Обробляти GET та POST запити",
            "Валідувати дані",
            "Використовувати Flask-WTF"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-6-2"]
        },
        {
          lessonId: "lesson-6-4",
          order: 4,
          title: "Робота з базами даних (SQLite/SQLAlchemy)",
          learningObjectives: [
            "Підключити базу даних",
            "Створити моделі даних",
            "Виконувати CRUD операції",
            "Використовувати міграції"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-6-3"]
        },
        {
          lessonId: "lesson-6-5",
          order: 5,
          title: "REST API з Flask",
          learningObjectives: [
            "Створити REST API endpoints",
            "Використовувати JSON для обміну даними",
            "Реалізувати HTTP методи",
            "Додати автентифікацію (базово)"
          ],
          estimatedTime: 135,
          prerequisites: ["lesson-6-4"]
        },
        {
          lessonId: "lesson-6-6",
          order: 6,
          title: "Модуль 6: Практичний проект - Веб-додаток з API",
          learningObjectives: [
            "Створити повноцінний веб-додаток",
            "Реалізувати REST API",
            "Підключити базу даних",
            "Деплоїти проект"
          ],
          estimatedTime: 240,
          prerequisites: ["lesson-6-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-7",
      order: 7,
      title: "Тестування, Git та деплой",
      description: "Написання тестів, версійний контроль, деплой проектів",
      duration: { weeks: 3, lessons: 4 },
      learningOutcomes: [
        "Написувати unit тести",
        "Використовувати Git для версійного контролю",
        "Деплоїти проекти",
        "Працювати в команді"
      ],
      lessons: [
        {
          lessonId: "lesson-7-1",
          order: 1,
          title: "Тестування коду (pytest)",
          learningObjectives: [
            "Написати перші unit тести",
            "Використовувати pytest",
            "Тестувати функції та класи",
            "Використовувати fixtures"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-6-6"]
        },
        {
          lessonId: "lesson-7-2",
          order: 2,
          title: "Версійний контроль з Git",
          learningObjectives: [
            "Встановити Git",
            "Створити репозиторій",
            "Використовувати commit, push, pull",
            "Працювати з гілками"
          ],
          estimatedTime: 105,
          prerequisites: ["lesson-7-1"]
        },
        {
          lessonId: "lesson-7-3",
          order: 3,
          title: "Деплой проектів (Heroku/Vercel)",
          learningObjectives: [
            "Підготувати проект до деплою",
            "Деплоїти на Heroku або Vercel",
            "Налаштувати змінні середовища",
            "Моніторити додаток"
          ],
          estimatedTime: 135,
          prerequisites: ["lesson-7-2"]
        },
        {
          lessonId: "lesson-7-4",
          order: 4,
          title: "Фінальний проект - Повноцінний веб-додаток",
          learningObjectives: [
            "Створити фінальний проект",
            "Застосувати всі навички",
            "Написати тести",
            "Деплоїти проект"
          ],
          estimatedTime: 480,
          prerequisites: ["lesson-7-3"],
          isProject: true,
          isFinalProject: true
        }
      ]
    }
  ]
}

