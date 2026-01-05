/**
 * Lesson 01-3: Практика: задачі з операторами порівняння
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_01_3 = {
  lessonId: "lesson-01-3",
  moduleId: "module-01",
  order: 3,
  title: "Практика: задачі з операторами порівняння",
  
  learningObjectives: [
    "Розв'язувати практичні задачі з порівнянням",
    "Застосовувати логічні оператори",
    "Створювати складні умови",
    "Практикуватися у написанні умовних виразів"
  ],
  
  prerequisites: ["lesson-01-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Повторення вивченого",
        content: `На цьому уроці ми закріпимо всі знання про оператори порівняння та логічні оператори.

**Що ми вже знаємо:**
1. Оператори порівняння: ==, !=, <, >, <=, >=
2. Логічні оператори: and, or, not
3. Ланцюгові порівняння: 3 < x < 10

**Підхід до розв'язання задач:**
1. Зрозуміти умову задачі
2. Визначити які оператори потрібні
3. Написати вираз
4. Перевірити результат`
      },
      {
        title: "Задача 1: Перевірка віку",
        content: `**Умова:** Створіть програму, яка перевіряє чи можна дитині грати в гру.

**Вимоги:**
- Вік має бути >= 13
- Оцінка має бути >= 60
- Обидві умови мають виконуватися

**Рішення:**
\`\`\`python
age = 14
score = 85

# Можна грати якщо вік >= 13 І оцінка >= 60
can_play = age >= 13 and score >= 60
print(can_play)  # True

# Якщо одна умова не виконується
age = 12
can_play = age >= 13 and score >= 60
print(can_play)  # False
\`\`\``
      },
      {
        title: "Задача 2: Система знижок",
        content: `**Умова:** Створіть програму для перевірки знижки.

**Вимоги:**
- Знижка для дітей < 12 років
- Знижка для пенсіонерів > 65 років
- Достатньо однієї умови

**Рішення:**
\`\`\`python
age = 10

# Знижка якщо вік < 12 АБО вік > 65
has_discount = age < 12 or age > 65
print(has_discount)  # True

age = 70
has_discount = age < 12 or age > 65
print(has_discount)  # True

age = 20
has_discount = age < 12 or age > 65
print(has_discount)  # False
\`\`\``
      },
      {
        title: "Задача 3: Перевірка діапазону",
        content: `**Умова:** Перевірити чи число знаходиться в діапазоні.

**Вимоги:**
- Перевірити чи число між 10 і 20
- Використати ланцюгове порівняння

**Рішення:**
\`\`\`python
x = 15

# Перевірка чи число в діапазоні [10, 20]
is_in_range = 10 <= x <= 20
print(is_in_range)  # True

# Те саме що:
is_in_range2 = x >= 10 and x <= 20
print(is_in_range2)  # True

x = 25
is_in_range = 10 <= x <= 20
print(is_in_range)  # False
\`\`\``
      },
      {
        title: "Поради для розв'язання задач",
        content: `**1. Читай умову уважно:**
Розумій що саме потрібно перевірити.

**2. Визнач які оператори потрібні:**
- Якщо потрібні ОБИДВІ умови → and
- Якщо потрібна хоча б ОДНА умова → or
- Якщо потрібно інвертувати → not

**3. Використовуй дужки:**
Дужки () допомагають зрозуміти порядок виконання.

**4. Перевіряй крайові випадки:**
Перевір що відбувається коли значення рівні граничним.

**5. Тестуй свій код:**
Спробуй різні значення, щоб переконатися що все працює правильно.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Складна умова",
      code: `# Складна умова з and та or
age = 14
score = 85
is_student = True

# Можна вступити якщо (вік >= 13 І оцінка >= 60) АБО є студентський квиток
can_enroll = (age >= 13 and score >= 60) or is_student
print(can_enroll)  # True`,
      explanation: "Демонструє комбінацію операторів and та or для складної умови."
    },
    {
      title: "Приклад 2: Використання not",
      code: `# Використання not
score = 45
passed = score >= 60

# НЕ пройдено тест
not_passed = not passed
print(not_passed)  # True

# Або можна записати так:
not_passed2 = not (score >= 60)
print(not_passed2)  # True`,
      explanation: "Показує використання оператора not для інвертування умови."
    },
    {
      title: "Приклад 3: Ланцюгові порівняння",
      code: `# Ланцюгові порівняння
temperature = 20

# Перевірка чи температура в комфортному діапазоні
is_comfortable = 18 <= temperature <= 25
print(is_comfortable)  # True

# Перевірка чи число між двома іншими
x = 5
y = 10
z = 7
is_between = x < z < y
print(is_between)  # True`,
      explanation: "Демонструє ланцюгові порівняння для спрощення коду."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Неправильне використання and та or",
      explanation: "and потребує обидві умови True, or потребує хоча б одну True.",
      correctApproach: "Уважно читай умову: 'обидві' = and, 'хоча б одна' = or."
    },
    {
      mistake: "Забути про дужки в складних виразах",
      explanation: "Без дужок пріоритет операторів може дати неочікуваний результат.",
      correctApproach: "Завжди використовуй дужки для ясності: (a and b) or c"
    },
    {
      mistake: "Плутанина з not",
      explanation: "not інвертує значення, тому not True = False.",
      correctApproach: "Пам'ятай: not завжди змінює значення на протилежне."
    }
  ],
  
  summary: `На цьому уроці ми:

1. Повторили оператори порівняння - ==, !=, <, >, <=, >=
2. Повторили логічні оператори - and, or, not
3. Розв'язали практичні задачі - перевірка віку, знижки, діапазони
4. Навчилися створювати складні умови - комбінації операторів

Тепер ви вмієте використовувати оператори порівняння та логічні оператори для створення умов!

Наступний модуль - умовні оператори if/elif/else!`,
  
  practiceTask: {
    title: "Система перевірки доступу",
    description: "Створіть програму для перевірки доступу до клубу",
    problemStatement: `Напишіть програму, яка:
1. Зберігає вік у змінну age (наприклад, 14)
2. Зберігає оцінку у змінну score (наприклад, 85)
3. Зберігає чи є членський квиток у змінну has_membership (True або False)
4. Перевіряє чи можна вступити: (вік >= 13 І оцінка >= 60) АБО є членський квиток
5. Перевіряє чи НЕ можна вступити (інвертує результат)
6. Виводить обидва результати`,
    outputFormat: `Приклад виведення:
Вік: 14
Оцінка: 85
Членський квиток: True
Можна вступити: True
Не можна вступити: False`,
    examples: [
      {
        output: `Вік: 14
Оцінка: 85
Членський квиток: True
Можна вступити: True
Не можна вступити: False`,
        explanation: "Програма використовує комбінацію операторів and, or та not для перевірки доступу"
      }
    ],
    solution: {
      code: `# Система перевірки доступу
age = 14
score = 85
has_membership = True

# Вивести значення
print("Вік: " + str(age))
print("Оцінка: " + str(score))
print("Членський квиток: " + str(has_membership))

# Перевірка доступу: (вік >= 13 І оцінка >= 60) АБО є членський квиток
can_join = (age >= 13 and score >= 60) or has_membership
print("Можна вступити: " + str(can_join))

# Інвертування результату
cannot_join = not can_join
print("Не можна вступити: " + str(cannot_join))`,
      explanation: "Рішення використовує комбінацію операторів and, or та not для перевірки доступу та інвертування результату."
    },
    hints: [
      "Використовуйте оператор and для перевірки обох умов",
      "Використовуйте оператор or для перевірки хоча б однієї умови",
      "Використовуйте оператор not для інвертування результату",
      "Використовуйте дужки () для групування умов",
      "Використовуйте str() для перетворення булевих значень у рядки"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nage = 14\nscore = 85\nresult = age >= 13 and score >= 60\nprint(result)\n```",
        options: [
          "True",
          "False",
          "14",
          "85"
        ],
        correctAnswer: 0,
        explanation: "Обидві умови True (14 >= 13 і 85 >= 60), тому and повертає True."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nage = 10\nresult = age < 12 or age > 65\nprint(result)\n```",
        options: [
          "True",
          "False",
          "10",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "age < 12 це True (10 < 12), тому or повертає True."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне вираз not (5 > 3)?",
        options: [
          "True",
          "False",
          "5",
          "3"
        ],
        correctAnswer: 1,
        explanation: "5 > 3 це True, тому not True = False."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 15\nresult = 10 <= x <= 20\nprint(result)\n```",
        options: [
          "True",
          "False",
          "15",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Ланцюгове порівняння 10 <= x <= 20 означає 10 <= 15 and 15 <= 20, що є True."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nage = 12\nscore = 85\nhas_permission = True\nresult = (age >= 13 and score >= 60) or has_permission\nprint(result)\n```",
        options: [
          "True",
          "False",
          "12",
          "85"
        ],
        correctAnswer: 0,
        explanation: "Хоча (age >= 13 and score >= 60) це False, але has_permission це True, тому or повертає True."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який оператор повертає True тільки якщо обидві умови True?",
        options: [
          "and",
          "or",
          "not",
          "=="
        ],
        correctAnswer: 0,
        explanation: "Оператор and повертає True тільки якщо обидві умови True."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
