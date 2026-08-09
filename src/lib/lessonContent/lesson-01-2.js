/**
 * Lesson 01-2: Логічні оператори: and, or, not
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_01_2 = {
  lessonId: "lesson-01-2",
  moduleId: "module-01",
  order: 2,
  title: "Логічні оператори: and, or, not",
  
  learningObjectives: [
    "Використовувати логічні оператори and, or, not",
    "Створювати складні умови",
    "Розуміти як працюють логічні оператори",
    "Застосовувати для реальних задач"
  ],
  
  prerequisites: ["lesson-01-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке логічні оператори?",
        content: `Логічні оператори дозволяють об'єднувати кілька умов разом. Це як коли ти кажеш:
- "Я хочу морозиво **І** торт" (обидва мають бути)
- "Я хочу морозиво **АБО** торт" (хоча б одне)
- "Я **НЕ** хочу овочі" (навпаки)

**Три логічні оператори:**
1. **and** (і) - обидві умови мають бути True
2. **or** (або) - хоча б одна умова має бути True
3. **not** (не) - змінює True на False і навпаки

**Що ми вивчимо:**
1. Оператор and
2. Оператор or
3. Оператор not
4. Комбінації операторів`
      },
      {
        title: "Оператор and (і)",
        content: `Оператор **and** повертає **True** тільки якщо **обидві** умови є True.

**Правило:** True and True = True, все інше = False

\`\`\`python
# Обидві умови True
5 > 3 and 2 < 4    # True (обидві умови True)
10 == 10 and 5 > 2  # True (обидві умови True)

# Одна умова False
5 > 3 and 2 > 4    # False (друга умова False)
10 == 10 and 5 < 2  # False (друга умова False)

# Обидві умови False
5 < 3 and 2 > 4    # False (обидві умови False)
\`\`\`

**Практичний приклад:**
\`\`\`python
# Перевірка віку та оцінки
age = 14
score = 85

# Можна грати в гру тільки якщо вік >= 13 І оцінка >= 60
can_play = age >= 13 and score >= 60
print(can_play)  # True (обидві умови True)

# Якщо одна умова False
age = 12
can_play = age >= 13 and score >= 60
print(can_play)  # False (перша умова False)
\`\`\`

**Пам'ятай:** and потребує, щоб ОБИДВІ умови були True!`
      },
      {
        title: "Оператор or (або)",
        content: `Оператор **or** повертає **True** якщо **хоча б одна** умова є True.

**Правило:** False or False = False, все інше = True

\`\`\`python
# Хоча б одна умова True
5 > 3 or 2 > 4     # True (перша умова True)
2 > 4 or 5 > 3     # True (друга умова True)
5 > 3 or 2 < 4     # True (обидві умови True)

# Обидві умови False
5 < 3 or 2 > 4     # False (обидві умови False)
10 < 5 or 2 > 10   # False (обидві умови False)
\`\`\`

**Практичний приклад:**
\`\`\`python
# Можна отримати знижку якщо вік < 12 АБО вік > 65
age = 10
has_discount = age < 12 or age > 65
print(has_discount)  # True (10 < 12)

age = 70
has_discount = age < 12 or age > 65
print(has_discount)  # True (70 > 65)

age = 20
has_discount = age < 12 or age > 65
print(has_discount)  # False (обидві умови False)
\`\`\`

**Пам'ятай:** or потребує, щоб хоча б ОДНА умова була True!`
      },
      {
        title: "Оператор not (не)",
        content: `Оператор **not** змінює значення на протилежне:
- not True = False
- not False = True

**Правило:** not інвертує (перевертає) значення

\`\`\`python
# З True на False
not True           # False
not (5 > 3)        # False (5 > 3 це True, not True = False)

# З False на True
not False          # True
not (5 < 3)        # True (5 < 3 це False, not False = True)
\`\`\`

**Практичний приклад:**
\`\`\`python
# Перевірка чи НЕ пройдено тест
score = 45
passed = score >= 60
not_passed = not passed
print(not_passed)  # True (score < 60, тому passed = False, not False = True)

# Перевірка чи НЕ дорівнює
name = "Олександр"
is_not_alex = not (name == "Олександр")
print(is_not_alex)  # False (name == "Олександр" це True, not True = False)
\`\`\`

**Пам'ятай:** not завжди змінює значення на протилежне!`
      },
      {
        title: "Комбінації операторів",
        content: `Можна комбінувати кілька логічних операторів разом.

**Пріоритет операторів:**
1. not (найвищий)
2. and
3. or (найнижчий)

**Приклади:**
\`\`\`python
# and з or
age = 14
score = 85
# (вік >= 13 І оцінка >= 60) АБО вік >= 18
can_join = (age >= 13 and score >= 60) or age >= 18
print(can_join)  # True

# not з and
age = 12
# НЕ (вік >= 13 І оцінка >= 60)
cannot_join = not (age >= 13 and score >= 60)
print(cannot_join)  # True

# Складні умови
x = 5
y = 10
z = 15
# (x < y) І (y < z) АБО (x > z)
result = (x < y and y < z) or x > z
print(result)  # True (x < y and y < z це True)
\`\`\`

**Важливо:** Використовуй дужки () для ясності!`
      },
      {
        title: "Ланцюгові порівняння",
        content: `Python дозволяє "ланцюгувати" порівняння для спрощення коду.

**Звичайний спосіб:**
\`\`\`python
x = 5
# Перевірити чи x більше 3 І менше 10
result = x > 3 and x < 10
print(result)  # True
\`\`\`

**Ланцюговий спосіб (простіше):**
\`\`\`python
x = 5
# Те саме, але простіше
result = 3 < x < 10
print(result)  # True
\`\`\`

**Більше прикладів:**
\`\`\`python
# Перевірка чи число в діапазоні
age = 14
is_teenager = 13 <= age <= 19
print(is_teenager)  # True (14 між 13 і 19)

# Перевірка чи число між двома іншими
x = 5
y = 10
z = 7
is_between = x < z < y
print(is_between)  # True (7 між 5 і 10)
\`\`\`

**Пам'ятай:** Ланцюгові порівняння - це просто спосіб записати and коротше!`
      },
      {
        title: "Практичне застосування",
        content: `**Система доступу:**
\`\`\`python
age = 14
has_permission = True
# Можна ввійти якщо вік >= 13 І є дозвіл
can_enter = age >= 13 and has_permission
print(can_enter)  # True
\`\`\`

**Система знижок:**
\`\`\`python
age = 10
is_student = True
# Знижка якщо вік < 12 АБО є студентський квиток
has_discount = age < 12 or is_student
print(has_discount)  # True
\`\`\`

**Перевірка паролю:**
\`\`\`python
password = "secret123"
correct_password = "secret123"
# НЕ правильний пароль
is_wrong = not (password == correct_password)
print(is_wrong)  # False (пароль правильний)
\`\`\`

Логічні оператори допомагають створювати складні умови!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Оператор and",
      code: `# Оператор and
age = 14
score = 85

# Можна грати якщо вік >= 13 І оцінка >= 60
can_play = age >= 13 and score >= 60
print(can_play)  # True

# Якщо одна умова False
age = 12
can_play = age >= 13 and score >= 60
print(can_play)  # False`,
      explanation: "Демонструє використання оператора and для перевірки двох умов одночасно."
    },
    {
      title: "Приклад 2: Оператор or",
      code: `# Оператор or
age = 10

# Знижка якщо вік < 12 АБО вік > 65
has_discount = age < 12 or age > 65
print(has_discount)  # True (10 < 12)

age = 20
has_discount = age < 12 or age > 65
print(has_discount)  # False (обидві умови False)`,
      explanation: "Показує використання оператора or для перевірки хоча б однієї умови."
    },
    {
      title: "Приклад 3: Оператор not",
      code: `# Оператор not
score = 45
passed = score >= 60

# НЕ пройдено тест
not_passed = not passed
print(not_passed)  # True (score < 60)

# Інвертування булевого значення
is_raining = True
is_sunny = not is_raining
print(is_sunny)  # False`,
      explanation: "Демонструє використання оператора not для інвертування значень."
    },
    {
      title: "Приклад 4: Комбінації операторів",
      code: `# Комбінації операторів
age = 14
score = 85
is_student = True

# (вік >= 13 І оцінка >= 60) АБО є студентський квиток
can_join = (age >= 13 and score >= 60) or is_student
print(can_join)  # True

# НЕ (вік < 13 АБО оцінка < 60)
cannot_join = not (age < 13 or score < 60)
print(cannot_join)  # True`,
      explanation: "Показує комбінацію кількох логічних операторів разом."
    },
    {
      title: "Приклад 5: Ланцюгові порівняння",
      code: `# Ланцюгові порівняння
age = 14

# Перевірка чи вік в діапазоні (13-19)
is_teenager = 13 <= age <= 19
print(is_teenager)  # True

# Те саме що:
is_teenager2 = age >= 13 and age <= 19
print(is_teenager2)  # True

# Перевірка чи число між двома іншими
x = 5
y = 10
z = 7
is_between = x < z < y
print(is_between)  # True`,
      explanation: "Демонструє ланцюгові порівняння як спосіб спростити код."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між and та or",
      explanation: "and потребує обидві умови True, or потребує хоча б одну True.",
      correctApproach: "Пам'ятай: and = 'обидві', or = 'хоча б одна'."
    },
    {
      mistake: "Неправильний пріоритет операторів",
      explanation: "not має найвищий пріоритет, потім and, потім or.",
      correctApproach: "Використовуй дужки () для ясності: (a and b) or c"
    },
    {
      mistake: "Використання & замість and",
      explanation: "& це бітовий оператор, а не логічний.",
      correctApproach: "Використовуй and, or, not для логічних операцій."
    },
    {
      mistake: "Плутанина з not",
      explanation: "not інвертує значення, тому not True = False.",
      correctApproach: "Пам'ятай: not завжди змінює True на False і навпаки."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. Оператор and (і) - повертає True тільки якщо обидві умови True
2. Оператор or (або) - повертає True якщо хоча б одна умова True
3. Оператор not (не) - інвертує значення (True стає False, False стає True)
4. Комбінації операторів - можна об'єднувати кілька операторів разом
5. Ланцюгові порівняння - спосіб спростити код (3 < x < 10)

Логічні оператори допомагають створювати складні умови для прийняття рішень!

Наступний урок - практика з операторами порівняння та логічними операторами!`,
  
  practiceTask: {
    title: "Система доступу до гри",
    description: "Створіть програму для перевірки доступу до гри",
    problemStatement: `Напишіть програму, яка:
1. Зчитує вік (ціле), оцінку (ціле) та дозвіл (True або False) з вводу
2. Перевіряє чи можна грати: (вік >= 13 І оцінка >= 60) АБО є дозвіл
3. Виводить введені значення та результат

Формат вводу:
14
85
True`,
    outputFormat: `Вік: 14
Оцінка: 85
Дозвіл: True
Можна грати: True`,
    examples: [
      {
        input: `14
85
True`,
        output: `Вік: 14
Оцінка: 85
Дозвіл: True
Можна грати: True`,
        explanation: "Вік і оцінка достатні, або є дозвіл — доступ дозволено"
      },
      {
        input: `10
90
False`,
        output: `Вік: 10
Оцінка: 90
Дозвіл: False
Можна грати: False`,
        explanation: "Вік < 13 і немає дозволу — доступ заборонено"
      },
      {
        input: `12
50
True`,
        output: `Вік: 12
Оцінка: 50
Дозвіл: True
Можна грати: True`,
        explanation: "Умови віку/оцінки не виконані, але є дозвіл (or) — доступ є"
      }
    ],
    solution: {
      code: `age = int(input())
score = int(input())
has_permission = input().strip() == "True"

print(f"Вік: {age}")
print(f"Оцінка: {score}")
print(f"Дозвіл: {has_permission}")

can_play = (age >= 13 and score >= 60) or has_permission
print(f"Можна грати: {can_play}")`,
      explanation: "Зчитуємо дані з stdin і перевіряємо доступ комбінацією and та or."
    },
    hints: [
      "Зчитайте age, score та has_permission через input()",
      "Дозвіл: has_permission = input().strip() == \"True\"",
      "Використовуйте and для обох умов і or для дозволу",
      "Використовуйте дужки () для групування умов"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне вираз True and False?",
        options: [
          "True",
          "False",
          "Помилку",
          "Нічого"
        ],
        correctAnswer: 1,
        explanation: "Оператор and повертає True тільки якщо обидві умови True. Тут одна False, тому результат False."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне вираз True or False?",
        options: [
          "True",
          "False",
          "Помилку",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "Оператор or повертає True якщо хоча б одна умова True. Тут перша True, тому результат True."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nage = 12\nscore = 85\nresult = age >= 13 and score >= 60\nprint(result)\n```",
        options: [
          "True",
          "False",
          "12",
          "85"
        ],
        correctAnswer: 1,
        explanation: "age >= 13 це False (12 не >= 13), тому and повертає False, навіть якщо score >= 60 це True."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне вираз not True?",
        options: [
          "True",
          "False",
          "1",
          "0"
        ],
        correctAnswer: 1,
        explanation: "Оператор not інвертує значення. not True = False."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nage = 10\nresult = age < 12 or age > 65\nprint(result)\n```",
        options: [
          "True",
          "False",
          "10",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "age < 12 це True (10 < 12), тому or повертає True, навіть якщо age > 65 це False."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 5\nresult = 3 < x < 10\nprint(result)\n```",
        options: [
          "True",
          "False",
          "5",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Ланцюгове порівняння 3 < x < 10 означає 3 < 5 and 5 < 10, що є True."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
