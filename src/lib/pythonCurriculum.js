/**
 * Full Curriculum for "Python Developer: From Zero to Confident Junior"
 * 
 * 11 Modules, 72 lessons total
 * Курс Python: повна навчальна програма
 */

import { QUIZ_QUESTION_TYPES } from './courseData'

export const pythonCurriculum = {
  courseId: "python-developer-zero-to-junior",
  title: "Python Developer: From Zero to Confident Junior",
  
  modules: [
    {
      moduleId: "module-1",
      order: 1,
      title: "Вступ та базові поняття",
      description: "Знайомство з Python, встановлення інструментів, перші програми, змінні та оператори",
      duration: { weeks: 3, lessons: 6 },
      learningOutcomes: [
        "Встановлення та налаштування Python",
        "Розуміння базових концепцій програмування",
        "Робота зі змінними та типами даних",
        "Використання операторів та вводу/виводу"
      ],
      lessons: [
        {
          lessonId: "lesson-1-1",
          order: 1,
          title: "Вступ до програмування. Що таке Python і де він використовується",
          learningObjectives: [
            "Зрозуміти, що таке Python та його переваги",
            "Дізнатися, де використовується Python",
            "Ознайомитися з історією мови",
            "Розуміти сфери застосування Python"
          ],
          estimatedTime: 60,
          prerequisites: []
        },
        {
          lessonId: "lesson-1-2",
          order: 2,
          title: "Встановлення Python. IDE, VS Code, PyCharm, інтерпретатор",
          learningObjectives: [
            "Встановити Python на комп'ютер",
            "Налаштувати середовище розробки",
            "Ознайомитися з різними IDE",
            "Навчитися використовувати інтерпретатор"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-1-1"]
        },
        {
          lessonId: "lesson-1-3",
          order: 3,
          title: "Перша програма. print(), коментарі, структура коду",
          learningObjectives: [
            "Написати першу програму 'Hello, World!'",
            "Використовувати функцію print()",
            "Додавати коментарі до коду",
            "Розуміти структуру Python коду"
          ],
          estimatedTime: 60,
          prerequisites: ["lesson-1-2"]
        },
        {
          lessonId: "lesson-1-4",
          order: 4,
          title: "Змінні та типи даних: int, float, str, bool",
          learningObjectives: [
            "Розуміти концепцію змінних",
            "Вивчити основні типи даних: int, float, str, bool",
            "Навчитися конвертувати типи",
            "Працювати зі змінними в програмах"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-1-3"]
        },
        {
          lessonId: "lesson-1-5",
          order: 5,
          title: "Оператори: арифметичні, логічні, порівняння",
          learningObjectives: [
            "Використовувати арифметичні оператори",
            "Розуміти оператори порівняння",
            "Застосовувати логічні оператори",
            "Працювати з операторами присвоєння"
          ],
          estimatedTime: 60,
          prerequisites: ["lesson-1-4"]
        },
        {
          lessonId: "lesson-1-6",
          order: 6,
          title: "Ввід/вивід даних. input(), приведення типів",
          learningObjectives: [
            "Отримувати введення через input()",
            "Форматувати виведення",
            "Обробляти помилки введення",
            "Виконувати приведення типів"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-1-5"]
        }
      ]
    },
    {
      moduleId: "module-2",
      order: 2,
      title: "Умови та цикли",
      description: "Контроль потоку виконання програми, умовні конструкції та цикли",
      duration: { weeks: 4, lessons: 8 },
      learningOutcomes: [
        "Використання умовних операторів if/elif/else",
        "Робота з циклами for та while",
        "Контроль виконання циклів",
        "Розв'язання алгоритмічних задач"
      ],
      lessons: [
        {
          lessonId: "lesson-2-1",
          order: 1,
          title: "Умовні конструкції if / elif / else",
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
          title: "Логічні оператори та вкладені умови",
          learningObjectives: [
            "Використовувати логічні оператори and, or, not",
            "Створювати складні умови",
            "Працювати з вкладеними умовами",
            "Оптимізувати умовні конструкції"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-2-1"]
        },
        {
          lessonId: "lesson-2-3",
          order: 3,
          title: "Практика: задачі на умови",
          learningObjectives: [
            "Розв'язувати практичні задачі з умовами",
            "Застосовувати набуті знання",
            "Аналізувати та оптимізувати код",
            "Практикуватися у написанні умовних конструкцій"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-2-2"]
        },
        {
          lessonId: "lesson-2-4",
          order: 4,
          title: "Цикл while",
          learningObjectives: [
            "Використовувати цикл while",
            "Контролювати умови виходу з циклу",
            "Уникати нескінченних циклів",
            "Застосовувати while для різних задач"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-2-3"]
        },
        {
          lessonId: "lesson-2-5",
          order: 5,
          title: "Цикл for та функція range()",
          learningObjectives: [
            "Використовувати цикл for для ітерації",
            "Застосовувати функцію range()",
            "Ітерувати по послідовностях",
            "Працювати з enumerate()"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-2-4"]
        },
        {
          lessonId: "lesson-2-6",
          order: 6,
          title: "break, continue, else в циклах",
          learningObjectives: [
            "Використовувати break для виходу з циклу",
            "Застосовувати continue для пропуску ітерації",
            "Розуміти else в циклах",
            "Контролювати виконання циклів"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-2-5"]
        },
        {
          lessonId: "lesson-2-7",
          order: 7,
          title: "Вкладені цикли",
          learningObjectives: [
            "Створювати вкладені цикли",
            "Розуміти складність вкладених циклів",
            "Оптимізувати вкладені цикли",
            "Застосовувати для роботи з двовимірними структурами"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-2-6"]
        },
        {
          lessonId: "lesson-2-8",
          order: 8,
          title: "Практика: алгоритмічні задачі",
          learningObjectives: [
            "Розв'язувати алгоритмічні задачі",
            "Застосовувати цикли та умови",
            "Аналізувати складність алгоритмів",
            "Практикуватися у написанні ефективного коду"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-2-7"]
        }
      ]
    },
    {
      moduleId: "module-3",
      order: 3,
      title: "Колекції даних",
      description: "Робота зі списками, кортежами, рядками, словниками та множинами",
      duration: { weeks: 4, lessons: 8 },
      learningOutcomes: [
        "Створення та маніпуляція списками",
        "Робота зі словниками та множинами",
        "Робота з рядками та їх методами",
        "Вкладені структури даних"
      ],
      lessons: [
        {
          lessonId: "lesson-3-1",
          order: 1,
          title: "Списки (list): створення, індексація, методи",
          learningObjectives: [
            "Створювати та модифікувати списки",
            "Використовувати індексацію та зрізи",
            "Застосовувати методи списків",
            "Працювати зі списковими включеннями"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-2-8"]
        },
        {
          lessonId: "lesson-3-2",
          order: 2,
          title: "Кортежі (tuple) та їх особливості",
          learningObjectives: [
            "Розуміти різницю між списками та кортежами",
            "Створювати та використовувати кортежі",
            "Розпаковувати кортежі",
            "Вибирати правильну структуру даних"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-3-1"]
        },
        {
          lessonId: "lesson-3-3",
          order: 3,
          title: "Рядки (str): методи, форматування",
          learningObjectives: [
            "Маніпулювати рядками",
            "Використовувати методи рядків",
            "Форматувати рядки (f-strings, format)",
            "Працювати з індексацією та зрізами рядків"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-3-2"]
        },
        {
          lessonId: "lesson-3-4",
          order: 4,
          title: "Словники (dict): ключі, значення, методи",
          learningObjectives: [
            "Створювати та модифікувати словники",
            "Отримувати доступ до значень",
            "Використовувати методи словників",
            "Ітерувати по словниках"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-3-3"]
        },
        {
          lessonId: "lesson-3-5",
          order: 5,
          title: "Множини (set): операції над множинами",
          learningObjectives: [
            "Розуміти різницю між множинами та списками",
            "Використовувати операції з множинами",
            "Застосовувати множини для унікальних значень",
            "Виконувати операції об'єднання, перетину тощо"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-3-4"]
        },
        {
          lessonId: "lesson-3-6",
          order: 6,
          title: "Вкладені структури даних",
          learningObjectives: [
            "Створювати вкладені списки та словники",
            "Отримувати доступ до вкладених даних",
            "Маніпулювати складними структурами",
            "Застосовувати для реальних задач"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-3-5"]
        },
        {
          lessonId: "lesson-3-7",
          order: 7,
          title: "Ітерація по колекціях",
          learningObjectives: [
            "Ітерувати по різних типах колекцій",
            "Використовувати enumerate(), zip()",
            "Застосовувати генератори та ітератори",
            "Оптимізувати ітерацію"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-3-6"]
        },
        {
          lessonId: "lesson-3-8",
          order: 8,
          title: "Практика: задачі з колекціями",
          learningObjectives: [
            "Розв'язувати практичні задачі з колекціями",
            "Застосовувати всі набуті знання",
            "Аналізувати та оптимізувати рішення",
            "Практикуватися у роботі з даними"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-3-7"]
        }
      ]
    },
    {
      moduleId: "module-4",
      order: 4,
      title: "Функції та модульність",
      description: "Створення функцій, рекурсія, область видимості, робота з модулями та пакетами",
      duration: { weeks: 4, lessons: 8 },
      learningOutcomes: [
        "Створювати та використовувати функції",
        "Розуміти область видимості змінних",
        "Використовувати рекурсію для розв'язання задач",
        "Працювати з модулями та пакетами",
        "Використовувати lambda функції"
      ],
      lessons: [
        {
          lessonId: "lesson-4-1",
          order: 1,
          title: "Функції: оголошення та виклик",
          learningObjectives: [
            "Оголошувати та викликати функції",
            "Передавати аргументи",
            "Повертати значення",
            "Розуміти параметри за замовчуванням"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-3-8"]
        },
        {
          lessonId: "lesson-4-2",
          order: 2,
          title: "Параметри, return, None",
          learningObjectives: [
            "Розуміти різницю між параметрами та аргументами",
            "Використовувати return для повернення значень",
            "Розуміти None та його використання",
            "Створювати функції з різними типами повернення"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-4-1"]
        },
        {
          lessonId: "lesson-4-3",
          order: 3,
          title: "Позиційні та іменовані аргументи",
          learningObjectives: [
            "Використовувати позиційні аргументи",
            "Застосовувати іменовані аргументи",
            "Комбінувати різні типи аргументів",
            "Розуміти порядок аргументів"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-4-2"]
        },
        {
          lessonId: "lesson-4-4",
          order: 4,
          title: "*args, **kwargs",
          learningObjectives: [
            "Використовувати *args для змінної кількості аргументів",
            "Застосовувати **kwargs для ключових аргументів",
            "Комбінувати різні типи аргументів",
            "Розпаковувати аргументи"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-4-3"]
        },
        {
          lessonId: "lesson-4-5",
          order: 5,
          title: "Область видимості змінних (scope)",
          learningObjectives: [
            "Розуміти локальну та глобальну область видимості",
            "Використовувати ключове слово global",
            "Уникати конфліктів імен",
            "Працювати з nonlocal",
            "Розуміти та використовувати рекурсію"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-4-4"]
        },
        {
          lessonId: "lesson-4-6",
          order: 6,
          title: "Lambda-функції",
          learningObjectives: [
            "Створювати lambda функції",
            "Використовувати lambda з map(), filter(), sorted()",
            "Застосовувати функції як об'єкти",
            "Розуміти коли використовувати lambda"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-4-5"]
        },
        {
          lessonId: "lesson-4-7",
          order: 7,
          title: "Модулі та імпорт",
          learningObjectives: [
            "Імпортувати модулі",
            "Створювати власні модулі",
            "Організовувати код у пакети",
            "Використовувати стандартну бібліотеку Python"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-4-6"]
        },
        {
          lessonId: "lesson-4-8",
          order: 8,
          title: "Практика: написання власних модулів",
          learningObjectives: [
            "Створювати власні модулі",
            "Організовувати код у пакети",
            "Застосовувати модульну архітектуру",
            "Практикуватися у написанні модульного коду"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-4-7"]
        }
      ]
    },
    {
      moduleId: "module-5",
      order: 5,
      title: "Робота з файлами та помилки",
      description: "Читання/запис файлів, обробка винятків, робота з CSV та TXT",
      duration: { weeks: 3, lessons: 6 },
      learningOutcomes: [
        "Читати та записувати файли",
        "Обробляти винятки",
        "Робота з JSON, CSV та TXT",
        "Створювати власні винятки"
      ],
      lessons: [
        {
          lessonId: "lesson-5-1",
          order: 1,
          title: "Робота з файлами: open, read, write",
          learningObjectives: [
            "Відкривати файли для читання/запису",
            "Читати та записувати дані",
            "Працювати з різними кодуваннями",
            "Обробляти бінарні файли"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-4-8"]
        },
        {
          lessonId: "lesson-5-2",
          order: 2,
          title: "Контекстний менеджер with",
          learningObjectives: [
            "Використовувати контекстний менеджер with",
            "Розуміти переваги with",
            "Автоматично закривати файли",
            "Уникати витоку ресурсів"
          ],
          estimatedTime: 60,
          prerequisites: ["lesson-5-1"]
        },
        {
          lessonId: "lesson-5-3",
          order: 3,
          title: "Робота з CSV та TXT",
          learningObjectives: [
            "Читати та записувати CSV файли",
            "Працювати з TXT файлами",
            "Обробляти структуровані дані",
            "Використовувати csv модуль"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-5-2"]
        },
        {
          lessonId: "lesson-5-4",
          order: 4,
          title: "Обробка помилок: try / except / finally",
          learningObjectives: [
            "Розуміти концепцію винятків",
            "Використовувати try/except блоки",
            "Обробляти конкретні типи помилок",
            "Використовувати finally та else"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-5-3"]
        },
        {
          lessonId: "lesson-5-5",
          order: 5,
          title: "Створення власних винятків",
          learningObjectives: [
            "Створювати кастомні класи винятків",
            "Піднімати винятки (raise)",
            "Створювати ієрархію винятків",
            "Документувати винятки"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-5-4"]
        },
        {
          lessonId: "lesson-5-6",
          order: 6,
          title: "Практика: файлові задачі",
          learningObjectives: [
            "Створити скрипт для обробки файлів",
            "Реалізувати обробку помилок",
            "Працювати з JSON/CSV даними",
            "Генерувати звіти"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-5-5"]
        }
      ]
    },
    {
      moduleId: "module-6",
      order: 6,
      title: "ООП – об'єктно-орієнтоване програмування",
      description: "Класи, об'єкти, наслідування, поліморфізм, інкапсуляція",
      duration: { weeks: 6, lessons: 12 },
      learningOutcomes: [
        "Створювати класи та об'єкти",
        "Використовувати наслідування",
        "Застосовувати поліморфізм",
        "Розуміти інкапсуляцію та абстракцію"
      ],
      lessons: [
        {
          lessonId: "lesson-6-1",
          order: 1,
          title: "Основи ООП: класи та об'єкти",
          learningObjectives: [
            "Створювати класи",
            "Створювати об'єкти (екземпляри)",
            "Розуміти атрибути та методи",
            "Використовувати конструктор __init__"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-5-6"]
        },
        {
          lessonId: "lesson-6-2",
          order: 2,
          title: "Атрибути та методи класу",
          learningObjectives: [
            "Створювати методи екземпляра",
            "Використовувати методи класу (@classmethod)",
            "Застосовувати статичні методи (@staticmethod)",
            "Розуміти різницю між типами методів"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-6-1"]
        },
        {
          lessonId: "lesson-6-3",
          order: 3,
          title: "Конструктор __init__",
          learningObjectives: [
            "Використовувати __init__ для ініціалізації",
            "Передавати параметри в конструктор",
            "Встановлювати початкові значення",
            "Створювати об'єкти з різними параметрами"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-6-2"]
        },
        {
          lessonId: "lesson-6-4",
          order: 4,
          title: "Інкапсуляція та модифікатори доступу",
          learningObjectives: [
            "Розуміти концепцію інкапсуляції",
            "Використовувати публічні та приватні атрибути",
            "Застосовувати property декоратор",
            "Контролювати доступ до даних"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-6-3"]
        },
        {
          lessonId: "lesson-6-5",
          order: 5,
          title: "Наслідування",
          learningObjectives: [
            "Створювати дочірні класи",
            "Перевизначати методи",
            "Використовувати super()",
            "Розуміти MRO (Method Resolution Order)"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-6-4"]
        },
        {
          lessonId: "lesson-6-6",
          order: 6,
          title: "Поліморфізм",
          learningObjectives: [
            "Розуміти поліморфізм",
            "Реалізовувати поліморфізм в Python",
            "Застосовувати duck typing",
            "Використовувати поліморфізм на практиці"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-6-5"]
        },
        {
          lessonId: "lesson-6-7",
          order: 7,
          title: "Магічні методи (__str__, __len__ тощо)",
          learningObjectives: [
            "Використовувати __str__ та __repr__",
            "Реалізовувати оператори (__add__, __eq__)",
            "Створювати контекстні менеджери",
            "Використовувати __getitem__, __setitem__"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-6-6"]
        },
        {
          lessonId: "lesson-6-8",
          order: 8,
          title: "Статичні та класові методи",
          learningObjectives: [
            "Розуміти різницю між статичними та класовими методами",
            "Використовувати @staticmethod",
            "Застосовувати @classmethod",
            "Вибирати правильний тип методу"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-6-7"]
        },
        {
          lessonId: "lesson-6-9",
          order: 9,
          title: "Dataclasses",
          learningObjectives: [
            "Використовувати dataclasses для спрощення класів",
            "Автоматично генерувати методи",
            "Застосовувати декоратори dataclass",
            "Працювати з полями та значеннями за замовчуванням"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-6-8"]
        },
        {
          lessonId: "lesson-6-10",
          order: 10,
          title: "Абстрактні класи та інтерфейси",
          learningObjectives: [
            "Використовувати абстрактні базові класи",
            "Реалізовувати інтерфейси",
            "Застосовувати ABC модуль",
            "Створювати контракти для класів"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-6-9"]
        },
        {
          lessonId: "lesson-6-11",
          order: 11,
          title: "Композиція vs наслідування",
          learningObjectives: [
            "Розуміти різницю між композицією та наслідуванням",
            "Вибирати правильний підхід",
            "Застосовувати композицію",
            "Уникати проблем наслідування"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-6-10"]
        },
        {
          lessonId: "lesson-6-12",
          order: 12,
          title: "Практика: ООП-проєкт",
          learningObjectives: [
            "Створити систему з використанням ООП",
            "Реалізувати наслідування та поліморфізм",
            "Застосувати всі принципи ООП",
            "Створити повноцінний проект"
          ],
          estimatedTime: 180,
          prerequisites: ["lesson-6-11"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-7",
      order: 7,
      title: "Стандартна бібліотека Python",
      description: "Вивчення корисних модулів стандартної бібліотеки",
      duration: { weeks: 4, lessons: 8 },
      learningOutcomes: [
        "Використовувати модуль math та random",
        "Працювати з datetime та time",
        "Використовувати os, sys та pathlib",
        "Застосовувати collections, itertools, functools"
      ],
      lessons: [
        {
          lessonId: "lesson-7-1",
          order: 1,
          title: "Модуль math, random",
          learningObjectives: [
            "Використовувати математичні функції",
            "Генерувати випадкові числа",
            "Застосовувати math для обчислень",
            "Працювати з random для ігор та симуляцій"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-6-12"]
        },
        {
          lessonId: "lesson-7-2",
          order: 2,
          title: "datetime та time",
          learningObjectives: [
            "Працювати з датами та часом",
            "Форматувати дати",
            "Виконувати операції з датами",
            "Використовувати time для вимірювання"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-7-1"]
        },
        {
          lessonId: "lesson-7-3",
          order: 3,
          title: "os та sys",
          learningObjectives: [
            "Взаємодіяти з операційною системою",
            "Використовувати os для роботи з файлами",
            "Працювати з sys для системних параметрів",
            "Отримувати інформацію про систему"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-7-2"]
        },
        {
          lessonId: "lesson-7-4",
          order: 4,
          title: "pathlib",
          learningObjectives: [
            "Використовувати pathlib для роботи з шляхами",
            "Створювати та маніпулювати шляхами",
            "Перевіряти існування файлів",
            "Об'єднувати шляхи"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-7-3"]
        },
        {
          lessonId: "lesson-7-5",
          order: 5,
          title: "collections",
          learningObjectives: [
            "Використовувати namedtuple, deque, Counter",
            "Застосовувати defaultdict",
            "Працювати з OrderedDict",
            "Використовувати спеціалізовані контейнери"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-7-4"]
        },
        {
          lessonId: "lesson-7-6",
          order: 6,
          title: "itertools",
          learningObjectives: [
            "Використовувати itertools для ітерації",
            "Застосовувати комбінації та перестановки",
            "Працювати з групуванням",
            "Створювати ефективні ітератори"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-7-5"]
        },
        {
          lessonId: "lesson-7-7",
          order: 7,
          title: "functools",
          learningObjectives: [
            "Використовувати functools для функцій",
            "Застосовувати декоратори",
            "Використовувати partial та reduce",
            "Кешувати результати функцій"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-7-6"]
        },
        {
          lessonId: "lesson-7-8",
          order: 8,
          title: "Практика: використання стандартної бібліотеки",
          learningObjectives: [
            "Застосувати модулі стандартної бібліотеки",
            "Створити проект з використанням різних модулів",
            "Оптимізувати код за допомогою бібліотеки",
            "Практикуватися у використанні інструментів"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-7-7"]
        }
      ]
    },
    {
      moduleId: "module-8",
      order: 8,
      title: "Tkinter — графічні інтерфейси",
      description: "Створення графічних інтерфейсів користувача з Tkinter",
      duration: { weeks: 3, lessons: 6 },
      learningOutcomes: [
        "Створювати графічні інтерфейси",
        "Використовувати віджети Tkinter",
        "Обробляти події",
        "Створювати повноцінні GUI-додатки"
      ],
      lessons: [
        {
          lessonId: "lesson-8-1",
          order: 1,
          title: "Вступ до GUI. Що таке Tkinter і як він працює",
          learningObjectives: [
            "Розуміти, що таке GUI",
            "Ознайомитися з Tkinter",
            "Зрозуміти архітектуру GUI додатків",
            "Підготувати середовище для роботи"
          ],
          estimatedTime: 60,
          prerequisites: ["lesson-7-8"]
        },
        {
          lessonId: "lesson-8-2",
          order: 2,
          title: "Створення першого вікна. Tk(), mainloop()",
          learningObjectives: [
            "Створити перше вікно",
            "Використовувати Tk() та mainloop()",
            "Налаштувати розміри та заголовок",
            "Закривати вікно"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-8-1"]
        },
        {
          lessonId: "lesson-8-3",
          order: 3,
          title: "Віджети: Label, Button, Entry",
          learningObjectives: [
            "Використовувати Label для тексту",
            "Створювати кнопки з Button",
            "Отримувати введення через Entry",
            "Налаштовувати віджети"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-8-2"]
        },
        {
          lessonId: "lesson-8-4",
          order: 4,
          title: "Розміщення елементів: pack, grid, place",
          learningObjectives: [
            "Використовувати pack для розміщення",
            "Застосовувати grid для таблиць",
            "Використовувати place для точкового розміщення",
            "Вибирати правильний метод"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-8-3"]
        },
        {
          lessonId: "lesson-8-5",
          order: 5,
          title: "Обробка подій та callback-функції",
          learningObjectives: [
            "Обробляти події кліку",
            "Створювати callback-функції",
            "Працювати з різними типами подій",
            "Зв'язувати події з функціями"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-8-4"]
        },
        {
          lessonId: "lesson-8-6",
          order: 6,
          title: "Практика: GUI-застосунок на Tkinter",
          learningObjectives: [
            "Створити повноцінний GUI-додаток",
            "Застосувати всі набуті знання",
            "Реалізувати інтерактивність",
            "Створити корисний додаток"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-8-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-9",
      order: 9,
      title: "Pygame — розробка ігор",
      description: "Створення ігор з використанням Pygame",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Створювати ігрові вікна",
        "Обробляти події клавіатури та миші",
        "Робота зі спрайтами та колізіями",
        "Створювати прості ігри"
      ],
      lessons: [
        {
          lessonId: "lesson-9-1",
          order: 1,
          title: "Вступ до Pygame. Ігровий цикл",
          learningObjectives: [
            "Встановити Pygame",
            "Створити ігрове вікно",
            "Розуміти ігровий цикл",
            "Оновити екран"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-8-6"]
        },
        {
          lessonId: "lesson-9-2",
          order: 2,
          title: "Робота з екраном, подіями та клавіатурою",
          learningObjectives: [
            "Малювати на екрані",
            "Обробляти події клавіатури",
            "Реагувати на натискання клавіш",
            "Контролювати рух об'єктів"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-9-1"]
        },
        {
          lessonId: "lesson-9-3",
          order: 3,
          title: "Спрайти, рух об'єктів, колізії",
          learningObjectives: [
            "Створювати спрайти",
            "Реалізувати рух об'єктів",
            "Виявляти колізії",
            "Обробляти зіткнення"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-9-2"]
        },
        {
          lessonId: "lesson-9-4",
          order: 4,
          title: "Практика: міні-гра на Pygame",
          learningObjectives: [
            "Створити повноцінну міні-гру",
            "Застосувати всі набуті знання",
            "Реалізувати ігрову механіку",
            "Додати графіку та звуки"
          ],
          estimatedTime: 180,
          prerequisites: ["lesson-9-3"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-10",
      order: 10,
      title: "Робота з зовнішнім світом",
      description: "HTTP-запити, API, JSON та вступ до FastAPI",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Виконувати HTTP-запити",
        "Працювати з API",
        "Обробляти JSON дані",
        "Створювати прості backend-додатки"
      ],
      lessons: [
        {
          lessonId: "lesson-10-1",
          order: 1,
          title: "HTTP-запити: requests",
          learningObjectives: [
            "Встановити та використовувати requests",
            "Виконувати GET та POST запити",
            "Обробляти відповіді",
            "Працювати з заголовками"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-9-4"]
        },
        {
          lessonId: "lesson-10-2",
          order: 2,
          title: "API та JSON",
          learningObjectives: [
            "Розуміти, що таке API",
            "Працювати з JSON даними",
            "Парсити JSON відповіді",
            "Використовувати публічні API"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-10-1"]
        },
        {
          lessonId: "lesson-10-3",
          order: 3,
          title: "Вступ до FastAPI",
          learningObjectives: [
            "Встановити FastAPI",
            "Створити перший API endpoint",
            "Розуміти основи FastAPI",
            "Запускати сервер"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-10-2"]
        },
        {
          lessonId: "lesson-10-4",
          order: 4,
          title: "Практика: простий backend",
          learningObjectives: [
            "Створити простий backend на FastAPI",
            "Реалізувати кілька endpoints",
            "Обробляти запити та відповіді",
            "Тестувати API"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-10-3"]
        }
      ]
    },
    {
      moduleId: "module-11",
      order: 11,
      title: "FastAPI — backend-розробка",
      description: "Поглиблене вивчення FastAPI та створення REST API",
      duration: { weeks: 1, lessons: 2 },
      learningOutcomes: [
        "Створювати REST API",
        "Використовувати роутинг",
        "Обробляти різні типи запитів",
        "Створювати повноцінний backend"
      ],
      lessons: [
        {
          lessonId: "lesson-11-1",
          order: 1,
          title: "Вступ до FastAPI. Роутинг, запити, відповіді",
          learningObjectives: [
            "Створювати маршрути",
            "Обробляти різні HTTP методи",
            "Валідувати дані",
            "Повертати відповіді"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-10-4"]
        },
        {
          lessonId: "lesson-11-2",
          order: 2,
          title: "Простий REST API + підсумки курсу",
          learningObjectives: [
            "Створити повноцінний REST API",
            "Застосувати всі набуті знання",
            "Підсумувати матеріал курсу",
            "Планувати подальше навчання"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-11-1"],
          isProject: true,
          isFinalProject: true
        }
      ]
    }
  ]
}
