/**
 * Lesson 1-3: Оператори та вирази
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson1_3 = {
  lessonId: "lesson-1-3",
  moduleId: "module-1",
  order: 3,
  title: "Оператори та вирази",
  
  learningObjectives: [
    "Використовувати арифметичні оператори (+, -, *, /, //, %, **)",
    "Розуміти оператори порівняння (==, !=, >, <, >=, <=)",
    "Застосовувати логічні оператори (and, or, not)",
    "Працювати з операторами присвоєння (=, +=, -=, *=, /=)"
  ],
  
  estimatedTime: 60,
  prerequisites: ["lesson-1-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Арифметичні оператори",
        content: `Арифметичні оператори виконують математичні операції:

\`\`\`python
# Додавання
result = 10 + 5        # 15

# Віднімання
result = 10 - 5        # 5

# Множення
result = 10 * 5        # 50

# Ділення (завжди повертає float)
result = 10 / 3        # 3.3333333333333335

# Цілочисельне ділення (повертає int)
result = 10 // 3       # 3

# Залишок від ділення (модуло)
result = 10 % 3        # 1

# Піднесення до степеня
result = 2 ** 3        # 8 (2 в степені 3)
\`\`\`

**Порядок операцій:**
Python дотримується математичних правил:
1. Дужки (найвищий пріоритет)
2. Піднесення до степеня (**)
3. Множення, ділення, модуло (*, /, //, %)
4. Додавання, віднімання (+, -)

\`\`\`python
result = 2 + 3 * 4     # 14 (не 20!)
result = (2 + 3) * 4   # 20
\`\`\``
      },
      {
        title: "Оператори порівняння",
        content: `Оператори порівняння повертають True або False:

\`\`\`python
# Рівність
5 == 5        # True
5 == 3        # False

# Нерівність
5 != 3        # True
5 != 5        # False

# Більше
5 > 3         # True
5 > 7         # False

# Менше
3 < 5         # True
5 < 3         # False

# Більше або дорівнює
5 >= 5        # True
5 >= 7        # False

# Менше або дорівнює
3 <= 5        # True
5 <= 3        # False
\`\`\`

**Важливо:** Не плутайте \`==\` (порівняння) з \`=\` (присвоєння)!
\`\`\`python
x = 5      # Присвоєння
x == 5     # Порівняння (повертає True)
\`\`\``
      },
      {
        title: "Логічні оператори",
        content: `Логічні оператори працюють з булевими значеннями:

**and** — обидві умови мають бути True
\`\`\`python
True and True    # True
True and False   # False
False and False  # False

age = 16
has_license = True
can_drive = age >= 18 and has_license  # False
\`\`\`

**or** — хоча б одна умова має бути True
\`\`\`python
True or True     # True
True or False    # True
False or False   # False

is_weekend = True
is_holiday = False
can_rest = is_weekend or is_holiday  # True
\`\`\`

**not** — інвертує значення
\`\`\`python
not True         # False
not False        # True

is_raining = False
can_go_out = not is_raining  # True
\`\`\`

**Комбінування:**
\`\`\`python
age = 20
has_ticket = True
is_student = False

# Використовуйте дужки для ясності
can_enter = (age >= 18) and (has_ticket or is_student)  # True
\`\`\``
      },
      {
        title: "Оператори присвоєння",
        content: `Оператори присвоєння скорочують код:

\`\`\`python
# Звичайне присвоєння
x = 10

# Додавання з присвоєнням
x += 5    # еквівалентно x = x + 5, тепер x = 15

# Віднімання з присвоєнням
x -= 3    # x = x - 3, тепер x = 12

# Множення з присвоєнням
x *= 2    # x = x * 2, тепер x = 24

# Ділення з присвоєнням
x /= 4    # x = x / 4, тепер x = 6.0

# Цілочисельне ділення з присвоєнням
x //= 2   # x = x // 2

# Модуло з присвоєнням
x %= 3    # x = x % 3

# Піднесення до степеня з присвоєнням
x **= 2   # x = x ** 2
\`\`\`

**Приклад використання:**
\`\`\`python
score = 0
score += 10   # Додали 10 балів
score += 5    # Додали ще 5
print(score)  # 15
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Арифметичні операції",
      code: `# Обчислення площі прямокутника
length = 10
width = 5
area = length * width
print(f"Площа прямокутника: {area}")

# Обчислення середнього балу
math = 85
physics = 92
chemistry = 78
average = (math + physics + chemistry) / 3
print(f"Середній бал: {average:.2f}")`,
      explanation: "Демонструє використання арифметичних операторів для обчислень."
    },
    {
      title: "Приклад 2: Оператори порівняння",
      code: `age = 16
is_adult = age >= 18
print(f"Вік: {age}")
print(f"Повнолітній: {is_adult}")

# Порівняння рядків
name1 = "Олександр"
name2 = "Олександр"
are_equal = name1 == name2
print(f"Імена однакові: {are_equal}")`,
      explanation: "Показує використання операторів порівняння для перевірки умов."
    },
    {
      title: "Приклад 3: Логічні оператори",
      code: `# Перевірка, чи можна піти на фільм
age = 16
has_ticket = True
has_permission = True

can_go = (age >= 13) and has_ticket and has_permission
print(f"Можна піти на фільм: {can_go}")

# Перевірка вихідного дня
is_saturday = True
is_sunday = False
is_weekend = is_saturday or is_sunday
print(f"Вихідний: {is_weekend}")`,
      explanation: "Демонструє комбінування логічних операторів для складних умов."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між = та ==",
      explanation: "= це присвоєння, == це порівняння. if x = 5 викличе помилку.",
      correctApproach: "Використовуйте == для порівняння: if x == 5:"
    },
    {
      mistake: "Неправильний порядок операцій",
      explanation: "2 + 3 * 4 = 14, а не 20, бо множення має вищий пріоритет.",
      correctApproach: "Використовуйте дужки для явного вказання порядку: (2 + 3) * 4 = 20"
    },
    {
      mistake: "Плутанина між / та //",
      explanation: "/ завжди повертає float, // повертає int (цілочисельне ділення).",
      correctApproach: "Використовуйте // коли потрібне ціле число, / коли потрібен float."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Арифметичні оператори**: +, -, *, /, //, %, **
2. **Оператори порівняння**: ==, !=, >, <, >=, <=
3. **Логічні оператори**: and, or, not
4. **Оператори присвоєння**: =, +=, -=, *=, /=, //=, %=, **=

Оператори — це основа всіх обчислень та логіки в програмах.`,
  
  practiceTask: {
    title: "Калькулятор оцінок",
    description: "Створіть програму для обчислення оцінок",
    problemStatement: `Напишіть програму, яка:
1. Зберігає оцінки з 3 предметів
2. Обчислює середній бал
3. Визначає, чи студент здав (середній >= 60)
4. Обчислює максимальну та мінімальну оцінку
5. Виводить всі результати`,
    inputFormat: "Використовуйте змінні: math = 85, physics = 92, chemistry = 78",
    outputFormat: `Приклад виведення:
Оцінки: Математика=85, Фізика=92, Хімія=78
Середній бал: 85.0
Максимальна оцінка: 92
Мінімальна оцінка: 78
Статус: Здав (середній >= 60)`,
    examples: [
      {
        input: "math = 85, physics = 92, chemistry = 78",
        output: `Оцінки: Математика=85, Фізика=92, Хімія=78
Середній бал: 85.0
Максимальна оцінка: 92
Мінімальна оцінка: 78
Статус: Здав (середній >= 60)`,
        explanation: "Програма використовує арифметичні оператори та порівняння"
      }
    ],
    solution: {
      code: `# Оцінки студента
math = 85
physics = 92
chemistry = 78

# Обчислення середнього
average = (math + physics + chemistry) / 3

# Максимальна та мінімальна оцінка
max_score = max(math, physics, chemistry)
min_score = min(math, physics, chemistry)

# Перевірка, чи здав
passed = average >= 60

# Виведення результатів
print(f"Оцінки: Математика={math}, Фізика={physics}, Хімія={chemistry}")
print(f"Середній бал: {average}")
print(f"Максимальна оцінка: {max_score}")
print(f"Мінімальна оцінка: {min_score}")
print(f"Статус: {'Здав' if passed else 'Не здав'} (середній >= 60)")`,
      explanation: "Рішення використовує арифметичні операції, функції max()/min() та умовний оператор."
    },
    hints: [
      "Використовуйте (a + b + c) / 3 для середнього",
      "Використовуйте функції max() та min() для знаходження максимуму та мінімуму",
      "Використовуйте >= для перевірки, чи середній >= 60"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне вираз 10 // 3?",
        options: ["3.33", "3", "4", "3.0"],
        correctAnswer: 1,
        explanation: "// це цілочисельне ділення, повертає 3 (int), а не float."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який оператор використовується для піднесення до степеня?",
        options: ["^", "**", "pow", "exp"],
        correctAnswer: 1,
        explanation: "** використовується для піднесення до степеня: 2 ** 3 = 8."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 5\nx += 3\nprint(x)\n```",
        options: ["5", "8", "53", "Помилку"],
        correctAnswer: 1,
        explanation: "x += 3 еквівалентно x = x + 3, тому x стане 8."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.LOGIC,
        question: "Що поверне вираз: (True and False) or True?",
        options: ["True", "False", "Помилку", "None"],
        correctAnswer: 0,
        explanation: "(True and False) = False, потім (False or True) = True."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який оператор використовується для порівняння (не присвоєння)?",
        options: ["=", "==", "===", "equals"],
        correctAnswer: 1,
        explanation: "== використовується для порівняння, = для присвоєння."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nresult = 2 + 3 * 4\nprint(result)\n```",
        options: ["20", "14", "24", "Помилку"],
        correctAnswer: 1,
        explanation: "Множення має вищий пріоритет: 3 * 4 = 12, потім 2 + 12 = 14."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}


