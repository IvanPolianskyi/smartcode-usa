/**
 * Lesson 02-8: Практика: додаткові задачі з операторами
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_02_8 = {
  lessonId: "lesson-02-8",
  moduleId: "module-02",
  order: 8,
  title: "Практика: додаткові задачі з операторами",
  
  learningObjectives: [
    "Закріпити знання про цикли та умови",
    "Розв'язувати комплексні задачі",
    "Комбінувати різні концепції",
    "Практикуватися у написанні чистого коду"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-02-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд вивченого",
        content: `На цьому уроці ми закріпимо всі знання з модуля 02:

**Що ми вивчили:**
1. Умовні оператори (if/elif/else)
2. Цикли (while, for)
3. Контроль циклів (break, continue, else)
4. Вкладені цикли
5. List comprehensions
6. Корисні оператори (in, min, max)

**Мета цього уроку:**
- Об'єднати всі концепції
- Розв'язати складніші задачі
- Покращити навички програмування`
      },
      {
        title: "Задача 1: Калькулятор оцінок",
        content: `**Умова:** Створити систему обчислення середньої оцінки з вагами.

**Вхідні дані:**
- Список оцінок: [85, 92, 78, 96, 88]
- Ваги: [0.2, 0.2, 0.2, 0.2, 0.2] (всі рівні)

**Алгоритм:**
1. Помножити кожну оцінку на її вагу
2. Додати всі результати
3. Поділити на суму ваг

**Рішення:**
\`\`\`python
grades = [85, 92, 78, 96, 88]
weights = [0.2, 0.2, 0.2, 0.2, 0.2]

weighted_sum = 0
for i in range(len(grades)):
    weighted_sum += grades[i] * weights[i]

average = weighted_sum / sum(weights)
print(f"Середня оцінка: {average:.2f}")
\`\`\`

**З zip():**
\`\`\`python
weighted_sum = 0
for grade, weight in zip(grades, weights):
    weighted_sum += grade * weight
\`\`\``
      },
      {
        title: "Задача 2: Пошук простих чисел",
        content: `**Умова:** Знайти всі прості числа до n.

**Просте число** - ділиться тільки на 1 і на себе.

**Алгоритм:**
1. Для кожного числа від 2 до n
2. Перевірити чи воно ділиться на будь-яке число від 2 до sqrt(n)
3. Якщо ні - воно просте

**Рішення:**
\`\`\`python
n = 20
primes = []

for num in range(2, n + 1):
    is_prime = True
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        primes.append(num)

print(primes)  # [2, 3, 5, 7, 11, 13, 17, 19]
\`\`\``
      },
      {
        title: "Задача 3: Аналіз паролів",
        content: `**Умова:** Перевірити силу пароля за критеріями.

**Критерії:**
- Довжина >= 8 символів
- Містить великі літери
- Містить малі літери
- Містить цифри
- Містить спеціальні символи

**Рішення:**
\`\`\`python
password = "MyPass123!"

checks = {
    "довжина": len(password) >= 8,
    "великі літери": any(c.isupper() for c in password),
    "малі літери": any(c.islower() for c in password),
    "цифри": any(c.isdigit() for c in password),
    "спеціальні": any(c in "!@#$%^&*" for c in password)
}

strength = sum(checks.values())
print(f"Сила пароля: {strength}/5")

if strength == 5:
    print("Пароль дуже сильний!")
elif strength >= 3:
    print("Пароль середній")
else:
    print("Пароль слабкий")
\`\`\``
      },
      {
        title: "Задача 4: Обробка матриці",
        content: `**Умова:** Знайти суму елементів по діагоналях матриці.

**Рішення:**
\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Головна діагональ (зліва направо)
main_diagonal = 0
for i in range(len(matrix)):
    main_diagonal += matrix[i][i]

# Побічна діагональ (справа наліво)
secondary_diagonal = 0
for i in range(len(matrix)):
    secondary_diagonal += matrix[i][len(matrix) - 1 - i]

print(f"Головна діагональ: {main_diagonal}")  # 15
print(f"Побічна діагональ: {secondary_diagonal}")  # 15
\`\`\``
      },
      {
        title: "Задача 5: Групування даних",
        content: `**Умова:** Згрупувати студентів за оцінками.

**Рішення:**
\`\`\`python
students = [
    {"ім'я": "Іван", "оцінка": 85},
    {"ім'я": "Марія", "оцінка": 92},
    {"ім'я": "Петро", "оцінка": 78},
    {"ім'я": "Олена", "оцінка": 96},
    {"ім'я": "Андрій", "оцінка": 65}
]

groups = {
    "Відмінно (90+)": [],
    "Добре (70-89)": [],
    "Потрібно покращити (<70)": []
}

for student in students:
    grade = student["оцінка"]
    if grade >= 90:
        groups["Відмінно (90+)"].append(student["ім'я"])
    elif grade >= 70:
        groups["Добре (70-89)"].append(student["ім'я"])
    else:
        groups["Потрібно покращити (<70)"].append(student["ім'я"])

for group, names in groups.items():
    print(f"{group}: {', '.join(names)}")
\`\`\``
      },
      {
        title: "Поради для фінальної практики",
        content: `**1. Читай код уважно**
- Розумій що робить кожен рядок
- Слідкуй за змінними

**2. Коментуй свій код**
- Пояснюй складні частини
- Додавай коментарі до функцій

**3. Тестуй різні сценарії**
- Нормальні дані
- Крайові випадки
- Помилкові дані

**4. Оптимізуй після роботи**
- Спочатку зроби працюючий код
- Потім оптимізуй

**5. Практикуйся регулярно**
- Розв'язуй задачі щодня
- Поступово збільшуй складність`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Калькулятор оцінок",
      code: `# Зважена середня оцінка
grades = [85, 92, 78, 96, 88]
weights = [0.2, 0.2, 0.2, 0.2, 0.2]

weighted_sum = 0
for grade, weight in zip(grades, weights):
    weighted_sum += grade * weight

average = weighted_sum / sum(weights)
print(f"Середня: {average:.2f}")`,
      explanation: "Демонструє обчислення зваженої середньої оцінки."
    },
    {
      title: "Приклад 2: Прості числа",
      code: `# Пошук простих чисел
n = 20
primes = []

for num in range(2, n + 1):
    is_prime = True
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        primes.append(num)

print(primes)`,
      explanation: "Показує алгоритм пошуку простих чисел."
    },
    {
      title: "Приклад 3: Аналіз паролів",
      code: `# Перевірка сили пароля
password = "MyPass123!"

checks = {
    "довжина": len(password) >= 8,
    "великі": any(c.isupper() for c in password),
    "малі": any(c.islower() for c in password),
    "цифри": any(c.isdigit() for c in password)
}

strength = sum(checks.values())
print(f"Сила: {strength}/4")`,
      explanation: "Демонструє комплексну перевірку пароля."
    },
    {
      title: "Приклад 4: Діагоналі матриці",
      code: `# Сума діагоналей
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

main = sum(matrix[i][i] for i in range(len(matrix)))
secondary = sum(matrix[i][len(matrix)-1-i] for i in range(len(matrix)))

print(f"Головна: {main}, Побічна: {secondary}")`,
      explanation: "Показує обчислення сум діагоналей матриці."
    },
    {
      title: "Приклад 5: Групування",
      code: `# Групування студентів
students = [{"ім'я": "Іван", "оцінка": 85}, {"ім'я": "Марія", "оцінка": 92}]

groups = {"Відмінно": [], "Добре": []}
for s in students:
    if s["оцінка"] >= 90:
        groups["Відмінно"].append(s["ім'я"])
    else:
        groups["Добре"].append(s["ім'я"])

print(groups)`,
      explanation: "Демонструє групування даних за умовами."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не враховувати всі крайові випадки",
      explanation: "Порожні списки, один елемент, однакові значення - все потрібно перевіряти.",
      correctApproach: "Завжди тестуй на різних даних, включаючи крайові випадки"
    },
    {
      mistake: "Занадто складна логіка",
      explanation: "Складний код важко читати та підтримувати.",
      correctApproach: "Розбивай складні задачі на простіші частини"
    },
    {
      mistake: "Не використовувати доступні інструменти",
      explanation: "Python має багато корисних функцій (zip, enumerate, list comprehensions).",
      correctApproach: "Використовуй вбудовані функції Python для спрощення коду"
    },
    {
      mistake: "Не коментувати складний код",
      explanation: "Через місяць буде важко зрозуміти що робить код.",
      correctApproach: "Додавай коментарі до складних частин коду"
    }
  ],
  
  summary: `На цьому уроці ми закріпили знання:

1. Комплексні задачі - об'єднання різних концепцій
2. Калькулятор оцінок - зважена середня
3. Прості числа - алгоритми пошуку
4. Аналіз паролів - комплексні перевірки
5. Обробка матриць - робота з двовимірними даними
6. Групування даних - організація інформації
7. Практичні поради - покращення навичок

Вітаємо! Ви завершили модуль 02 - Оператори Python!

Тепер ви вмієте:
- Використовувати умовні оператори
- Працювати з циклами
- Контролювати виконання програм
- Створювати ефективний код

Готові до наступного модуля!`,
  
  practiceTask: {
    title: "Система управління бібліотекою",
    description: "Створіть програму для управління бібліотекою книг",
    problemStatement: `Напишіть програму, яка:
1. Має список книг: books = [
   {"назва": "Python Basics", "автор": "Іван", "рік": 2020, "рейтинг": 4.5},
   {"назва": "Advanced Python", "автор": "Марія", "рік": 2021, "рейтинг": 4.8},
   {"назва": "Python для початківців", "автор": "Іван", "рік": 2019, "рейтинг": 4.2},
   {"назва": "Data Science", "автор": "Петро", "рік": 2022, "рейтинг": 4.9}
]
2. Знаходить:
   - Книги з рейтингом >= 4.5
   - Книги автора "Іван"
   - Найновішу книгу (найбільший рік)
   - Середній рейтинг всіх книг
3. Групує книги за авторами
4. Виводить всі результати`,
    inputFormat: "Програма використовує фіксований список books",
    outputFormat: `Приклад виведення:
Книги з рейтингом >= 4.5: ['Python Basics', 'Advanced Python', 'Data Science']
Книги автора Іван: ['Python Basics', 'Python для початківців']
Найновіша книга: Data Science (2022)
Середній рейтинг: 4.6
Книги за авторами:
Іван: ['Python Basics', 'Python для початківців']
Марія: ['Advanced Python']
Петро: ['Data Science']`,
    examples: [
      {
        input: "books = [список книг]",
        output: `Книги з рейтингом >= 4.5: ['Python Basics', 'Advanced Python', 'Data Science']
Книги автора Іван: ['Python Basics', 'Python для початківців']
Найновіша книга: Data Science (2022)
Середній рейтинг: 4.6
Книги за авторами:
Іван: ['Python Basics', 'Python для початківців']
Марія: ['Advanced Python']
Петро: ['Data Science']`,
        explanation: "Програма виконує комплексний аналіз бібліотеки книг"
      }
    ],
    solution: {
      code: `# Система управління бібліотекою
books = [
    {"назва": "Python Basics", "автор": "Іван", "рік": 2020, "рейтинг": 4.5},
    {"назва": "Advanced Python", "автор": "Марія", "рік": 2021, "рейтинг": 4.8},
    {"назва": "Python для початківців", "автор": "Іван", "рік": 2019, "рейтинг": 4.2},
    {"назва": "Data Science", "автор": "Петро", "рік": 2022, "рейтинг": 4.9}
]

# Книги з рейтингом >= 4.5
high_rated = [book["назва"] for book in books if book["рейтинг"] >= 4.5]
print(f"Книги з рейтингом >= 4.5: {high_rated}")

# Книги автора "Іван"
ivan_books = [book["назва"] for book in books if book["автор"] == "Іван"]
print(f"Книги автора Іван: {ivan_books}")

# Найновіша книга
newest = books[0]
for book in books:
    if book["рік"] > newest["рік"]:
        newest = book
print(f"Найновіша книга: {newest['назва']} ({newest['рік']})")

# Середній рейтинг
total_rating = sum(book["рейтинг"] for book in books)
average_rating = total_rating / len(books)
print(f"Середній рейтинг: {average_rating:.1f}")

# Групування за авторами
by_author = {}
for book in books:
    author = book["автор"]
    if author not in by_author:
        by_author[author] = []
    by_author[author].append(book["назва"])

print("Книги за авторами:")
for author, titles in by_author.items():
    print(f"{author}: {titles}")`,
      explanation: "Рішення використовує list comprehensions для фільтрації, цикл for для пошуку максимуму, sum() для середнього, та словник для групування."
    },
    hints: [
      "Використовуйте list comprehension для фільтрації книг за рейтингом",
      "Використовуйте list comprehension для фільтрації за автором",
      "Використовуйте цикл for для пошуку книги з найбільшим роком",
      "Використовуйте sum() та len() для обчислення середнього",
      "Використовуйте словник для групування книг за авторами"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що краще використовувати для фільтрації списку?",
        options: [
          "Вкладені цикли",
          "List comprehension",
          "Тільки if",
          "Нічого"
        ],
        correctAnswer: 1,
        explanation: "List comprehension - найефективніший та найчитабельніший спосіб фільтрації."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що зробить цей код?\n\n```python\nbooks = [{'рік': 2020}, {'рік': 2021}]\nnewest = books[0]\nfor book in books:\n    if book['рік'] > newest['рік']:\n        newest = book\n```",
        options: [
          "Знайде найстарішу книгу",
          "Знайде найновішу книгу",
          "Знайде першу книгу",
          "Помилку"
        ],
        correctAnswer: 1,
        explanation: "Код знаходить книгу з найбільшим роком (найновішу)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як краще групувати дані за категоріями?",
        options: [
          "Список списків",
          "Словник зі списками",
          "Кортежі",
          "Множини"
        ],
        correctAnswer: 1,
        explanation: "Словник зі списками - найзручніший спосіб групування даних."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що створить цей код?\n\n```python\nhigh_rated = [b['назва'] for b in books if b['рейтинг'] >= 4.5]\n```",
        options: [
          "Список всіх книг",
          "Список назв книг з рейтингом >= 4.5",
          "Список рейтингів",
          "Помилку"
        ],
        correctAnswer: 1,
        explanation: "List comprehension фільтрує книги з рейтингом >= 4.5 та бере їх назви."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо тестувати код на різних даних?",
        options: [
          "Щоб знайти помилки",
          "Щоб переконатися що код працює правильно",
          "Обидва варіанти",
          "Не важливо"
        ],
        correctAnswer: 2,
        explanation: "Тестування на різних даних допомагає знайти помилки та переконатися у правильності."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
