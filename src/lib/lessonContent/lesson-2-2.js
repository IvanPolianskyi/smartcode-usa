/**
 * Lesson 2-2: Логічні оператори та вкладені умови
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson2_2 = {
  lessonId: "lesson-2-2",
  moduleId: "module-2",
  order: 2,
  title: "Логічні оператори та вкладені умови",
  
  learningObjectives: [
    "Використовувати логічні оператори and, or, not",
    "Створювати складні умови",
    "Працювати з вкладеними умовами",
    "Оптимізувати умовні конструкції"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-2-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Логічні оператори - детальніше",
        content: `Логічні оператори дозволяють об'єднувати кілька умов в одну складну умову.

**Оператор and (та):**
\`\`\`python
age = 16
has_permission = True

if age >= 13 and has_permission:
    print("Можете використовувати соціальні мережі")
else:
    print("Потрібен дозвіл батьків")
\`\`\`

**Таблиця істинності для and:**
- True and True = True
- True and False = False
- False and True = False
- False and False = False

**Оператор or (або):**
\`\`\`python
is_weekend = False
is_holiday = True

if is_weekend or is_holiday:
    print("Вихідний день!")
else:
    print("Робочий день")
\`\`\`

**Таблиця істинності для or:**
- True or True = True
- True or False = True
- False or True = True
- False or False = False

**Оператор not (не):**
\`\`\`python
is_raining = False

if not is_raining:
    print("Можна йти без парасольки")
else:
    print("Візьміть парасольку")
\`\`\`

**Таблиця істинності для not:**
- not True = False
- not False = True`
      },
      {
        title: "Складні умови",
        content: `Можна комбінувати кілька логічних операторів:

\`\`\`python
age = 20
has_ticket = True
is_student = False
is_weekend = True

# Складні умови з дужками
if (age >= 18) and (has_ticket or is_student) and is_weekend:
    print("Можете піти на фільм у вихідний!")
elif age >= 18 and has_ticket:
    print("Можете піти на фільм")
else:
    print("Не можете піти на фільм")
\`\`\`

**Порядок виконання:**
1. Спочатку виконуються операції в дужках
2. Потім not
3. Потім and
4. Найостанніше or

**Приклад з пріоритетами:**
\`\`\`python
# Без дужок
result = True or False and False
# Виконується як: True or (False and False) = True or False = True

# З дужками (явно)
result = (True or False) and False
# Виконується як: True and False = False
\`\`\`

**Рекомендація:** Завжди використовуйте дужки для ясності!`
      },
      {
        title: "Вкладені умови",
        content: `Умовні оператори можна вкладати один в один:

\`\`\`python
age = 16
has_permission = True
is_weekend = True

if age >= 13:
    if has_permission:
        if is_weekend:
            print("Можете використовувати соціальні мережі у вихідний!")
        else:
            print("Можете використовувати соціальні мережі")
    else:
        print("Потрібен дозвіл батьків")
else:
    print("Занадто молоді для соціальних мереж")
\`\`\`

**Альтернативний підхід з and:**
\`\`\`python
age = 16
has_permission = True
is_weekend = True

if age >= 13 and has_permission and is_weekend:
    print("Можете використовувати соціальні мережі у вихідний!")
elif age >= 13 and has_permission:
    print("Можете використовувати соціальні мережі")
elif age >= 13:
    print("Потрібен дозвіл батьків")
else:
    print("Занадто молоді для соціальних мереж")
\`\`\`

**Коли використовувати вкладені умови:**
- Коли логіка складна та потребує багато перевірок
- Коли різні умови мають різні дії

**Коли використовувати and/or:**
- Коли можна спростити логіку
- Коли умови логічно пов'язані`
      },
      {
        title: "Оптимізація умов",
        content: `**Коротке замикання (short-circuit evaluation):**

Python використовує коротке замикання:
- Для \`and\`: якщо перша умова False, друга не перевіряється
- Для \`or\`: якщо перша умова True, друга не перевіряється

\`\`\`python
# Ефективно: якщо age < 18, друга умова не перевіряється
if age >= 18 and expensive_check():
    do_something()

# Ефективно: якщо is_weekend True, друга умова не перевіряється
if is_weekend or expensive_check():
    do_something()
\`\`\`

**Порядок умов:**
Розміщуйте найпростіші та найшвидші перевірки спочатку:

\`\`\`python
# Добре: проста перевірка спочатку
if age >= 18 and expensive_database_check():
    do_something()

# Погано: дорога перевірка спочатку
if expensive_database_check() and age >= 18:
    do_something()
\`\`\`

**Уникайте зайвих перевірок:**
\`\`\`python
# Погано: зайва перевірка
if age >= 18:
    if age >= 18:
        print("Повнолітній")

# Добре: одна перевірка
if age >= 18:
    print("Повнолітній")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Складні умови",
      code: `# Перевірка, чи можна піти на фільм
age = 16
has_ticket = True
has_permission = True
is_weekend = True

if age >= 13 and has_ticket and (has_permission or is_weekend):
    print("Можете піти на фільм!")
elif age >= 13 and has_ticket:
    print("Потрібен дозвіл батьків")
else:
    print("Не можете піти на фільм")`,
      explanation: "Демонструє використання складних умов з and та or."
    },
    {
      title: "Приклад 2: Вкладені умови",
      code: `# Система оцінювання з додатковими умовами
score = 85
attendance = 90

if score >= 90:
    if attendance >= 95:
        grade = "Відмінно з похвалою"
    else:
        grade = "Відмінно"
elif score >= 75:
    if attendance >= 80:
        grade = "Добре"
    else:
        grade = "Добре (низька відвідуваність)"
else:
    grade = "Потрібно покращити"

print(f"Оцінка: {grade}")`,
      explanation: "Показує використання вкладених умов для складнішої логіки."
    },
    {
      title: "Приклад 3: Оптимізація з not",
      code: `# Перевірка, чи НЕ виконується умова
is_raining = False
has_umbrella = True

# Використання not для інверсії
if not is_raining:
    print("Можна йти без парасольки")
elif not has_umbrella:
    print("Потрібна парасолька!")
else:
    print("Дощ, але є парасолька")`,
      explanation: "Демонструє використання not для інверсії умов."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між and та or",
      explanation: "and вимагає, щоб обидві умови були True, or вимагає хоча б одну True.",
      correctApproach: "Пам'ятайте: and = 'обидві', or = 'хоча б одна'."
    },
    {
      mistake: "Забути дужки в складних умовах",
      explanation: "Без дужок порядок виконання може бути неочевидним.",
      correctApproach: "Завжди використовуйте дужки для ясності: (умова1) and (умова2 or умова3)."
    },
    {
      mistake: "Занадто глибокі вкладення",
      explanation: "Багато рівнів вкладеності роблять код важким для читання.",
      correctApproach: "Спробуйте спростити за допомогою and/or або винести логіку в окремі перевірки."
    },
    {
      mistake: "Подвійна перевірка однієї умови",
      explanation: "Перевірка однієї умови двічі - це зайва робота.",
      correctApproach: "Перевіряйте кожну умову тільки один раз."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Логічні оператори**: and (обидві умови), or (хоча б одна), not (інверсія)
2. **Складні умови**: комбінування кількох операторів з дужками
3. **Вкладені умови**: умови всередині умов для складнішої логіки
4. **Оптимізація**: порядок умов, коротке замикання, уникання зайвих перевірок

Логічні оператори дозволяють створювати складні умови для прийняття рішень у програмах.`,
  
  practiceTask: {
    title: "Система доступу",
    description: "Створіть програму зі складними умовами доступу",
    problemStatement: `Напишіть програму, яка:
1. Перевіряє вік користувача (>= 13, >= 18)
2. Перевіряє наявність дозволу батьків
3. Перевіряє, чи вихідний день
4. Визначає рівень доступу:
   - Повний доступ: вік >= 18 та дозвіл
   - Обмежений доступ: вік >= 13 та дозвіл
   - Доступ у вихідні: вік >= 13 та вихідний день (навіть без дозволу)
   - Немає доступу: інші випадки
5. Виводить детальну інформацію про доступ`,
    inputFormat: "Використовуйте змінні: age = 16, has_permission = True, is_weekend = False",
    outputFormat: `Приклад виведення:
Вік: 16
Дозвіл батьків: Так
Вихідний день: Ні
Рівень доступу: Обмежений доступ
Деталі: Можна використовувати з дозволом батьків`,
    examples: [
      {
        input: "age = 16, has_permission = True, is_weekend = False",
        output: `Рівень доступу: Обмежений доступ
Деталі: Можна використовувати з дозволом батьків`,
        explanation: "Студент має дозвіл, але не повнолітній"
      },
      {
        input: "age = 20, has_permission = True, is_weekend = False",
        output: `Рівень доступу: Повний доступ
Деталі: Можна використовувати без обмежень`,
        explanation: "Повнолітній з дозволом"
      },
      {
        input: "age = 14, has_permission = False, is_weekend = True",
        output: `Рівень доступу: Доступ у вихідні
Деталі: Можна використовувати тільки у вихідні дні`,
        explanation: "Вихідний день дозволяє доступ навіть без дозволу"
      }
    ],
    solution: {
      code: `# Система доступу
age = 16
has_permission = True
is_weekend = False

# Визначення рівня доступу
if age >= 18 and has_permission:
    access_level = "Повний доступ"
    details = "Можна використовувати без обмежень"
elif age >= 13 and has_permission:
    access_level = "Обмежений доступ"
    details = "Можна використовувати з дозволом батьків"
elif age >= 13 and is_weekend:
    access_level = "Доступ у вихідні"
    details = "Можна використовувати тільки у вихідні дні"
else:
    access_level = "Немає доступу"
    details = "Занадто молоді або немає дозволу"

# Виведення інформації
print(f"Вік: {age}")
print(f"Дозвіл батьків: {'Так' if has_permission else 'Ні'}")
print(f"Вихідний день: {'Так' if is_weekend else 'Ні'}")
print(f"Рівень доступу: {access_level}")
print(f"Деталі: {details}")`,
      explanation: "Рішення використовує складні умови з and та or для визначення рівня доступу."
    },
    hints: [
      "Використовуйте if/elif/else для різних рівнів доступу",
      "Перевіряйте умови від найвищих до найнижчих рівнів",
      "Використовуйте and для об'єднання умов, or для альтернатив",
      "Вихідний день має бути окремою умовою"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.LOGIC,
        question: "Що поверне: (True and False) or True?",
        options: ["True", "False", "Помилку", "None"],
        correctAnswer: 0,
        explanation: "(True and False) = False, потім (False or True) = True."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 5\ny = 10\nif x > 3 and y < 15:\n    print('A')\nelif x > 3 or y < 15:\n    print('B')\nelse:\n    print('C')\n```",
        options: ["A", "B", "C", "Помилку"],
        correctAnswer: 0,
        explanation: "x > 3 (True) and y < 15 (True) = True, тому виконається перший if і виведе 'A'."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який оператор інвертує булеве значення?",
        options: ["and", "or", "not", "!"],
        correctAnswer: 2,
        explanation: "not інвертує булеве значення: not True = False, not False = True."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.LOGIC,
        question: "Що поверне: not (True or False)?",
        options: ["True", "False", "Помилку", "None"],
        correctAnswer: 1,
        explanation: "Спочатку (True or False) = True, потім not True = False."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Скільки разів виведеться 'Hello'?\n\n```python\nif True and True:\n    print('Hello')\nif True or False:\n    print('Hello')\nif not False:\n    print('Hello')\n```",
        options: ["0", "1", "2", "3"],
        correctAnswer: 3,
        explanation: "Всі три умови True, тому 'Hello' виведеться три рази."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
