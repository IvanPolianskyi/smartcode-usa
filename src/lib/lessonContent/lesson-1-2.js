/**
 * Lesson 1-2: Змінні та типи даних
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson1_2 = {
  lessonId: "lesson-1-2",
  moduleId: "module-1",
  order: 2,
  title: "Змінні та типи даних",
  
  learningObjectives: [
    "Розуміти концепцію змінних та їх призначення",
    "Вивчити основні типи даних Python: int, float, str, bool",
    "Навчитися конвертувати між різними типами",
    "Працювати зі змінними в практичних програмах"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-1-1"],
  
  videoUrl: "", // Placeholder for video
  
  theory: {
    sections: [
      {
        title: "Що таке змінні?",
        content: `Змінна в програмуванні — це ім'я, яке ми даємо місцю в пам'яті комп'ютера для зберігання даних. Уявіть змінну як коробку з етикеткою: ми можемо покласти щось всередину і пізніше використати це, звертаючись до назви коробки.

У Python створення змінної дуже просте — просто напишіть ім'я змінної, знак рівності (=) і значення:

\`\`\`python
name = "Олександр"
age = 15
height = 175.5
is_student = True
\`\`\`

Python автоматично визначає тип даних на основі значення, яке ми присвоюємо. Це називається динамічною типізацією.`
      },
      {
        title: "Основні типи даних",
        content: `Python має кілька вбудованих типів даних. Давайте розглянемо основні:

**1. Цілі числа (int)**
Цілі числа — це числа без десяткової частини:
\`\`\`python
age = 15
students_count = 30
temperature = -5
\`\`\`

**2. Дійсні числа (float)**
Дійсні числа містять десяткову точку:
\`\`\`python
height = 175.5
pi = 3.14159
price = 99.99
\`\`\`

**3. Рядки (str)**
Рядки — це послідовність символів, обгорнута в лапки:
\`\`\`python
name = "Олександр"
greeting = 'Привіт!'
message = "Я вивчаю Python"
\`\`\`

**4. Булеві значення (bool)**
Булеві значення можуть бути тільки True або False:
\`\`\`python
is_student = True
has_license = False
is_raining = True
\`\`\`

**5. None**
None — це спеціальне значення, яке означає "нічого" або "відсутність значення":
\`\`\`python
result = None
\`\`\``
      },
      {
        title: "Перевірка типу даних",
        content: `Щоб дізнатися тип змінної, використовуйте функцію type():

\`\`\`python
name = "Олександр"
age = 15
height = 175.5
is_student = True

print(type(name))      # <class 'str'>
print(type(age))       # <class 'int'>
print(type(height))    # <class 'float'>
print(type(is_student)) # <class 'bool'>
\`\`\`

Функція isinstance() дозволяє перевірити, чи змінна належить до певного типу:

\`\`\`python
age = 15
print(isinstance(age, int))  # True
print(isinstance(age, str))  # False
\`\`\``
      },
      {
        title: "Конвертація типів",
        content: `Іноді нам потрібно перетворити значення з одного типу на інший. Python надає функції для цього:

**str()** — перетворює в рядок
\`\`\`python
age = 15
age_str = str(age)
print(age_str)        # "15"
print(type(age_str)) # <class 'str'>
\`\`\`

**int()** — перетворює в ціле число
\`\`\`python
age_str = "15"
age = int(age_str)
print(age)           # 15
print(type(age))     # <class 'int'>
\`\`\`

**float()** — перетворює в дійсне число
\`\`\`python
height_str = "175.5"
height = float(height_str)
print(height)        # 175.5
\`\`\`

**bool()** — перетворює в булеве значення
\`\`\`python
value = 1
is_true = bool(value)  # True
value = 0
is_false = bool(value) # False
\`\`\`

Важливо пам'ятати: не всі перетворення можливі. Наприклад, не можна перетворити рядок "Привіт" в число.`
      },
      {
        title: "Правила іменування змінних",
        content: `Python має правила для імен змінних:

1. **Можуть містити**: літери (a-z, A-Z), цифри (0-9) та підкреслення (_)
2. **Не можуть починатися з цифри**
3. **Чутливі до регістру**: \`age\` та \`Age\` — це різні змінні
4. **Не можуть бути ключовими словами**: if, for, while, class тощо

**Добрі практики:**
- Використовуйте описові імена: \`student_name\` замість \`n\`
- Використовуйте snake_case: \`student_age\` замість \`studentAge\`
- Уникайте занадто довгих імен

**Приклади:**
\`\`\`python
# Добре
student_name = "Олександр"
student_age = 15
is_enrolled = True

# Погано
n = "Олександр"
a = 15
x = True
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базові змінні",
      code: `# Створення змінних різних типів
name = "Олександр"
age = 15
height = 175.5
is_student = True

# Виведення значень
print("Ім'я:", name)
print("Вік:", age)
print("Зріст:", height)
print("Студент:", is_student)`,
      explanation: "Цей приклад показує, як створювати змінні різних типів та виводити їх значення."
    },
    {
      title: "Приклад 2: Конвертація типів",
      code: `# Конвертація між типами
age_str = "15"
age = int(age_str)  # Перетворюємо рядок в число

price = 99.99
price_str = str(price)  # Перетворюємо число в рядок

print("Вік як число:", age)
print("Ціна як рядок:", price_str)
print("Тип віку:", type(age))
print("Тип ціни:", type(price_str))`,
      explanation: "Демонструє, як конвертувати дані між різними типами за допомогою функцій int() та str()."
    },
    {
      title: "Приклад 3: Практичне застосування",
      code: `# Зберігання оцінок
math_score = 85
physics_score = 92
chemistry_score = 78

# Виведення оцінок
print("Математика:", math_score)
print("Фізика:", physics_score)
print("Хімія:", chemistry_score)
print("Всі оцінки збережені!")`,
      explanation: "Показує практичне використання змінних для зберігання та виведення даних."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Спроба використати змінну до її створення",
      explanation: "Python викличе помилку NameError, якщо ви спробуєте використати змінну, яка ще не була створена.",
      correctApproach: "Завжди створюйте змінну (присвойте їй значення) перед використанням."
    },
    {
      mistake: "Плутанина між рядком та числом",
      explanation: "Рядок '15' та число 15 — це різні речі. Не можна виконувати математичні операції з рядками.",
      correctApproach: "Використовуйте int() або float() для перетворення рядка в число перед обчисленнями."
    },
    {
      mistake: "Використання ключових слів як імен змінних",
      explanation: "Слова на кшталт if, for, class зарезервовані Python і не можуть бути іменами змінних.",
      correctApproach: "Використовуйте описові імена, які не є ключовими словами."
    },
    {
      mistake: "Помилки при конвертації типів",
      explanation: "Спроба перетворити 'Привіт' в число викличе помилку ValueError.",
      correctApproach: "Перевіряйте дані перед конвертацією або використовуйте try/except для обробки помилок."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Змінні** — це імена для зберігання даних у пам'яті комп'ютера
2. **Основні типи даних**: int (цілі числа), float (дійсні числа), str (рядки), bool (True/False)
3. **Конвертація типів** за допомогою функцій str(), int(), float(), bool()
4. **Правила іменування**: використовуйте описові імена в snake_case

Змінні — це основа програмування. Вони дозволяють зберігати та маніпулювати даними в наших програмах.`,
  
  practiceTask: {
    title: "Калькулятор особистих даних",
    description: "Створіть програму, яка зберігає та обробляє особисті дані",
    problemStatement: `Напишіть програму, яка:
1. Зберігає ваше ім'я, вік, зріст (у метрах) та чи ви студент
2. Виводить всю інформацію у форматованому вигляді`,
    inputFormat: "Програма повинна використовувати змінні з вашими даними",
    outputFormat: `Приклад виведення:
Ім'я: Олександр
Вік: 15 років
Зріст: 1.75 м
Статус: Студент`,
    examples: [
      {
        input: "name = 'Олександр', age = 15, height = 1.75, is_student = True",
        output: `Ім'я: Олександр
Вік: 15 років
Зріст: 1.75 м
Студент: True`,
        explanation: "Програма використовує змінні для зберігання даних та виводить їх"
      }
    ],
    solution: {
      code: `# Особисті дані
name = "Олександр"
age = 15
height_meters = 1.75
is_student = True

# Виведення інформації
print("Ім'я:", name)
print("Вік:", age, "років")
print("Зріст:", height_meters, "м")
print("Студент:", is_student)`,
      explanation: "Рішення використовує змінні для зберігання даних та виводить їх значення."
    },
    hints: [
      "Використовуйте змінні для зберігання кожного значення",
      "Використовуйте print() з кількома аргументами для виведення",
      "Для статусу просто виведіть значення змінної is_student"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який тип даних має змінна x = 15?",
        options: [
          "int",
          "float",
          "str",
          "bool"
        ],
        correctAnswer: 0,
        explanation: "Число 15 без десяткової точки є цілим числом (int)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка функція перетворює рядок '25' в число 25?",
        options: [
          "str(25)",
          "int('25')",
          "float('25')",
          "bool('25')"
        ],
        correctAnswer: 1,
        explanation: "Функція int() перетворює рядок в ціле число. int('25') поверне 25."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nage = '15'\nresult = age + 5\nprint(result)\n```",
        options: [
          "20",
          "155",
          "Помилка TypeError",
          "15"
        ],
        correctAnswer: 2,
        explanation: "Виникне помилка TypeError, оскільки не можна додавати число до рядка. Спочатку потрібно конвертувати age в int: int(age) + 5."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "В Python змінна може змінювати свій тип під час виконання програми.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Так, це правда. Python має динамічну типізацію, тому змінна може змінювати тип: x = 5 (int), потім x = 'hello' (str)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яке ім'я змінної є правильним?",
        options: [
          "2name",
          "my-name",
          "my_name",
          "if"
        ],
        correctAnswer: 2,
        explanation: "my_name є правильним ім'ям змінної. 2name починається з цифри, my-name містить дефіс, а if є ключовим словом."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.LOGIC,
        question: "Який результат виразу bool(0)?",
        options: [
          "True",
          "False",
          "0",
          "Помилка"
        ],
        correctAnswer: 1,
        explanation: "bool(0) повертає False. У Python числа 0, порожні рядки та None конвертуються в False, всі інші значення — в True."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 10\ny = '20'\nresult = x + int(y)\nprint(result)\n```",
        options: [
          "1020",
          "30",
          "Помилка",
          "10"
        ],
        correctAnswer: 1,
        explanation: "Код конвертує '20' в число 20 за допомогою int(), потім додає 10 + 20 = 30."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який тип даних має змінна price = 99.99?",
        options: [
          "int",
          "float",
          "str",
          "bool"
        ],
        correctAnswer: 1,
        explanation: "Число з десятковою точкою (99.99) є дійсним числом (float)."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

