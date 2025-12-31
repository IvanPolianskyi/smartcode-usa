/**
 * Lesson 1-5: Робота з рядками
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson1_5 = {
  lessonId: "lesson-1-5",
  moduleId: "module-1",
  order: 5,
  title: "Робота з рядками",
  
  learningObjectives: [
    "Маніпулювати рядками (конкатенація, повторення)",
    "Використовувати методи рядків (upper, lower, strip, split, join)",
    "Форматувати рядки (f-strings, format)",
    "Працювати з індексацією та зрізами (slicing)"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-1-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Базові операції з рядками",
        content: `Рядки (strings) — це послідовності символів.

**Створення рядків:**
\`\`\`python
name = "Олександр"
greeting = 'Привіт!'
message = """Багаторядковий
рядок"""
\`\`\`

**Конкатенація (об'єднання):**
\`\`\`python
first_name = "Олександр"
last_name = "Петренко"
full_name = first_name + " " + last_name
print(full_name)  # Олександр Петренко
\`\`\`

**Повторення:**
\`\`\`python
line = "-" * 20
print(line)  # --------------------
\`\`\`

**Довжина рядка:**
\`\`\`python
text = "Hello"
length = len(text)  # 5
\`\`\``
      },
      {
        title: "Індексація та зрізи (slicing)",
        content: `Кожен символ у рядку має індекс (починається з 0):

\`\`\`python
text = "Python"
print(text[0])   # P
print(text[1])   # y
print(text[-1])  # n (останній символ)
\`\`\`

**Зрізи (slicing):**
\`\`\`python
text = "Python"
print(text[0:3])    # Pyt (індекси 0, 1, 2)
print(text[:3])     # Pyt (початок до 3)
print(text[3:])     # hon (від 3 до кінця)
print(text[::2])    # Pto (кожен другий символ)
print(text[::-1])   # nohtyP (реверс)
\`\`\`

**Синтаксис:** \`text[start:end:step]\`
- start — початковий індекс (включно)
- end — кінцевий індекс (не включно)
- step — крок (за замовчуванням 1)`
      },
      {
        title: "Методи рядків",
        content: `Python має багато корисних методів для роботи з рядками:

**Зміна регістру:**
\`\`\`python
text = "Hello World"
print(text.upper())    # HELLO WORLD
print(text.lower())    # hello world
print(text.title())    # Hello World
print(text.capitalize())  # Hello world
\`\`\`

**Пошук та заміна:**
\`\`\`python
text = "Hello World"
print(text.find("World"))  # 6 (індекс першого входження)
print(text.replace("World", "Python"))  # Hello Python
print("Hello" in text)  # True
\`\`\`

**Очищення:**
\`\`\`python
text = "  Hello World  "
print(text.strip())     # "Hello World" (видаляє пробіли)
print(text.lstrip())    # "Hello World  " (зліва)
print(text.rstrip())    # "  Hello World" (справа)
\`\`\`

**Розбиття та об'єднання:**
\`\`\`python
text = "apple,banana,orange"
fruits = text.split(",")  # ['apple', 'banana', 'orange']

words = ['Hello', 'World']
sentence = " ".join(words)  # "Hello World"
\`\`\`

**Перевірка:**
\`\`\`python
text = "Hello123"
print(text.isdigit())    # False (не всі цифри)
print(text.isalpha())    # False (не всі літери)
print(text.isalnum())    # True (літери або цифри)
print(text.startswith("Hello"))  # True
print(text.endswith("123"))      # True
\`\`\``
      },
      {
        title: "Форматування рядків",
        content: `**f-рядки (рекомендовано):**
\`\`\`python
name = "Олександр"
age = 15
print(f"Мене звати {name}, мені {age} років")
\`\`\`

**Метод format():**
\`\`\`python
name = "Олександр"
age = 15
text = "Мене звати {}, мені {} років".format(name, age)
# або з індексами
text = "Мене звати {0}, мені {1} років".format(name, age)
\`\`\`

**% форматування (застаріле):**
\`\`\`python
name = "Олександр"
age = 15
text = "Мене звати %s, мені %d років" % (name, age)
\`\`\`

**Рекомендація:** Використовуйте f-рядки — вони найчитабельніші!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базові операції",
      code: `# Конкатенація та повторення
greeting = "Привіт"
name = "Олександр"
full_greeting = greeting + ", " + name + "!"
print(full_greeting)

# Повторення
separator = "=" * 30
print(separator)`,
      explanation: "Демонструє об'єднання та повторення рядків."
    },
    {
      title: "Приклад 2: Індексація та зрізи",
      code: `text = "Python Programming"
print(text[0])        # P
print(text[0:6])      # Python
print(text[7:])       # Programming
print(text[::-1])     # gnimmargorP nohtyP (реверс)`,
      explanation: "Показує роботу з індексами та зрізами рядків."
    },
    {
      title: "Приклад 3: Методи рядків",
      code: `# Обробка введення користувача
user_input = "  ОЛЕКСАНДР  "
name = user_input.strip().title()
print("Привіт,", name, "!")  # Привіт, Олександр !

# Розбиття рядка
sentence = "apple,banana,orange"
fruits = sentence.split(",")
print("Фрукти:", fruits)
print("Перший фрукт:", fruits[0].capitalize())
print("Другий фрукт:", fruits[1].capitalize())
print("Третій фрукт:", fruits[2].capitalize())`,
      explanation: "Демонструє використання методів для обробки рядків та роботу зі списками."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Спроба змінити рядок напряму",
      explanation: "Рядки в Python незмінні (immutable). Не можна змінити символ: text[0] = 'A' викличе помилку.",
      correctApproach: "Створіть новий рядок: text = 'A' + text[1:]"
    },
    {
      mistake: "Плутанина між find() та index()",
      explanation: "find() повертає -1 якщо не знайдено, index() викликає помилку.",
      correctApproach: "Використовуйте find() для безпечного пошуку."
    },
    {
      mistake: "Забути, що split() повертає список",
      explanation: "split() створює список рядків, не один рядок.",
      correctApproach: "Використовуйте join() для об'єднання списку в рядок."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Базові операції**: конкатенація (+), повторення (*), len()
2. **Індексація та зрізи**: [start:end:step]
3. **Методи рядків**: upper(), lower(), strip(), split(), join(), find(), replace()
4. **Форматування**: f-рядки (рекомендовано), format(), % форматування

Рядки — це основа роботи з текстом у Python!`,
  
  practiceTask: {
    title: "Обробка тексту",
    description: "Створіть програму для обробки тексту",
    problemStatement: `Напишіть програму, яка:
1. Отримує рядок від користувача
2. Виводить довжину рядка
3. Перетворює в верхній регістр
4. Перевіряє, чи починається з певного слова
5. Розбиває рядок на слова та виводить їх окремо
6. Об'єднує слова назад у рядок`,
    inputFormat: "Користувач вводить рядок через input()",
    outputFormat: `Приклад виведення:
Введіть рядок: привіт світ python
Довжина рядка: 20
Верхній регістр: ПРИВІТ СВІТ PYTHON
Починається з 'привіт': True
Слова: ['привіт', 'світ', 'python']
Об'єднаний рядок: привіт-світ-python`,
    examples: [
      {
        input: "привіт світ python",
        output: `Довжина рядка: 20
Верхній регістр: ПРИВІТ СВІТ PYTHON
Починається з 'привіт': True
Слова: ['привіт', 'світ', 'python']
Об'єднаний рядок: привіт-світ-python`,
        explanation: "Програма використовує різні методи для обробки рядка"
      }
    ],
    solution: {
      code: `# Обробка тексту
text = input("Введіть рядок: ")

# Довжина
print("Довжина рядка:", len(text))

# Верхній регістр
upper_text = text.upper()
print("Верхній регістр:", upper_text)

# Перевірка початку
starts_with = text.lower().startswith("привіт")
print("Починається з 'привіт':", starts_with)

# Розбиття на слова
words = text.split()
print("Слова:", words)

# Об'єднання
joined = "-".join(words)
print("Об'єднаний рядок:", joined)`,
      explanation: "Рішення використовує різні методи рядків для обробки тексту."
    },
    hints: [
      "Використовуйте len() для довжини",
      "Використовуйте upper() для верхнього регістру",
      "Використовуйте split() для розбиття на слова",
      "Використовуйте join() для об'єднання"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що виведе: 'Hello'[1:4]?",
        options: ["Hell", "ello", "ell", "Hel"],
        correctAnswer: 2,
        explanation: "[1:4] бере символи з індексами 1, 2, 3 (не включаючи 4), тобто 'ell'."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ntext = '  Hello  '\nprint(text.strip())\n```",
        options: ["  Hello  ", "Hello", "hello", "Помилку"],
        correctAnswer: 1,
        explanation: "strip() видаляє пробіли з обох кінців, залишається 'Hello'."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод розбиває рядок на список?",
        options: ["split()", "join()", "break()", "divide()"],
        correctAnswer: 0,
        explanation: "split() розбиває рядок на список підрядків."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: 'Python'[::-1]?",
        options: ["Python", "nohtyP", "P", "Помилку"],
        correctAnswer: 1,
        explanation: "[::-1] робить реверс рядка, виходить 'nohtyP'."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне 'Hello'.find('x')?",
        options: ["0", "-1", "Помилку", "None"],
        correctAnswer: 1,
        explanation: "find() повертає -1, якщо підрядок не знайдено."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}


