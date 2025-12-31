/**
 * Lesson 2-5: Цикл for та функція range()
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson2_5 = {
  lessonId: "lesson-2-5",
  moduleId: "module-2",
  order: 5,
  title: "Цикл for та функція range()",
  
  learningObjectives: [
    "Використовувати цикл for для ітерації",
    "Застосовувати функцію range()",
    "Ітерувати по послідовностях",
    "Працювати з enumerate()"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-2-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке цикл for?",
        content: `Цикл for використовується для повторення коду для кожного елемента в послідовності. Це як "для кожного елемента зробіть щось".

**Синтаксис:**
\`\`\`python
for змінна in послідовність:
    # код, який виконується для кожного елемента
\`\`\`

**Простий приклад:**
\`\`\`python
for i in range(5):
    print(i)
# Виведе: 0, 1, 2, 3, 4
\`\`\`

**Як це працює:**
1. Береться перший елемент з послідовності
2. Присвоюється змінній (i)
3. Виконується код всередині циклу
4. Береться наступний елемент
5. Повторюється до кінця послідовності`
      },
      {
        title: "Функція range()",
        content: `range() створює послідовність чисел для ітерації.

**Базові варіанти:**

1. **range(stop)** — від 0 до stop-1
\`\`\`python
for i in range(5):
    print(i)
# Виведе: 0, 1, 2, 3, 4
\`\`\`

2. **range(start, stop)** — від start до stop-1
\`\`\`python
for i in range(1, 6):
    print(i)
# Виведе: 1, 2, 3, 4, 5
\`\`\`

3. **range(start, stop, step)** — з кроком step
\`\`\`python
for i in range(0, 10, 2):
    print(i)
# Виведе: 0, 2, 4, 6, 8 (крок 2)

for i in range(10, 0, -1):
    print(i)
# Виведе: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 (зворотний порядок)
\`\`\`

**Важливо:** stop не включається в послідовність!`
      },
      {
        title: "Ітерація по рядках",
        content: `Цикл for може ітерувати по рядках (послідовність символів):

\`\`\`python
# Ітерація по символах рядка
word = "Python"
for char in word:
    print(char)
# Виведе: P, y, t, h, o, n (кожен на новому рядку)
\`\`\`

**Практичний приклад:**
\`\`\`python
# Підрахунок голосних
text = "Hello"
vowels = 0
for char in text:
    if char.lower() in "aeiou":
        vowels += 1
print(f"Голосних: {vowels}")
# Виведе: Голосних: 2
\`\`\``
      },
      {
        title: "enumerate() - індекс та значення",
        content: `enumerate() дозволяє отримати одночасно індекс та значення:

\`\`\`python
# Без enumerate
text = "Python"
index = 0
for char in text:
    print(f"{index}: {char}")
    index += 1

# З enumerate (краще!)
text = "Python"
for index, char in enumerate(text):
    print(f"{index}: {char}")
# Виведе:
# 0: P
# 1: y
# 2: t
# 3: h
# 4: o
# 5: n
\`\`\`

**Початок з іншого числа:**
\`\`\`python
for index, char in enumerate(text, start=1):
    print(f"{index}: {char}")
# Почне з 1 замість 0
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базове використання range()",
      code: `# Виведення чисел від 1 до 10
for i in range(1, 11):
    print(i)

# Парні числа від 2 до 20
for i in range(2, 21, 2):
    print(i)`,
      explanation: "Демонструє базові варіанти range()."
    },
    {
      title: "Приклад 2: Ітерація по рядку",
      code: `# Підрахунок символів
text = "Python"
count = 0
for char in text:
    count += 1
    print(f"Символ {count}: {char}")`,
      explanation: "Показує ітерацію по символах рядка."
    },
    {
      title: "Приклад 3: Використання enumerate()",
      code: `# Виведення символів з індексами
word = "Python"
for index, char in enumerate(word, start=1):
    print(f"{index}. {char}")`,
      explanation: "Демонструє використання enumerate() для отримання індексу та символу рядка."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина з діапазоном range()",
      explanation: "range(5) дає 0, 1, 2, 3, 4 (не включає 5). range(1, 6) дає 1, 2, 3, 4, 5 (не включає 6).",
      correctApproach: "Пам'ятайте: stop не включається. Для чисел 1-10 використовуйте range(1, 11)."
    },
    {
      mistake: "Спроба змінити послідовність під час ітерації",
      explanation: "Зміна послідовності під час ітерації може призвести до неочікуваних результатів.",
      correctApproach: "Якщо потрібно змінити, створіть нову послідовність або використовуйте індекси."
    },
    {
      mistake: "Плутанина між for та while",
      explanation: "for використовується коли знаємо послідовність, while - коли залежить від умови.",
      correctApproach: "Використовуйте for для ітерації по послідовностях, while для умовного повторення."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Цикл for** — для ітерації по послідовностях
2. **range()** — створення послідовностей чисел (start, stop, step)
3. **Ітерація по рядках** — перебір символів
4. **enumerate()** — отримання індексу та значення одночасно

Цикл for ідеальний, коли знаємо, скільки разів або по якій послідовності потрібно ітерувати!`,
  
  practiceTask: {
    title: "Таблиця множення",
    description: "Створіть програму для генерації таблиці множення",
    problemStatement: `Напишіть програму, яка:
1. Запитує число від користувача (від 1 до 10)
2. Генерує таблицю множення для цього числа (від 1 до 10)
3. Виводить результат у форматі: "5 * 3 = 15"
4. Дозволяє згенерувати кілька таблиць підряд`,
    inputFormat: "Користувач вводить число через input()",
    outputFormat: `Приклад виведення:
Введіть число для таблиці множення: 5
5 * 1 = 5
5 * 2 = 10
5 * 3 = 15
...
5 * 10 = 50`,
    examples: [
      {
        input: "number = 5",
        output: `5 * 1 = 5
5 * 2 = 10
5 * 3 = 15
5 * 4 = 20
5 * 5 = 25
5 * 6 = 30
5 * 7 = 35
5 * 8 = 40
5 * 9 = 45
5 * 10 = 50`,
        explanation: "Програма використовує цикл for з range() для генерації таблиці"
      }
    ],
    solution: {
      code: `# Таблиця множення
while True:
    try:
        number = int(input("Введіть число для таблиці множення (1-10): "))
        
        if number < 1 or number > 10:
            print("Число має бути від 1 до 10!")
            continue
        
        print(f"\nТаблиця множення для {number}:")
        for i in range(1, 11):
            result = number * i
            print(f"{number} * {i} = {result}")
        
        again = input("\nЗгенерувати ще одну таблицю? (так/ні): ").lower()
        if again != "так":
            print("Дякую!")
            break
            
    except ValueError:
        print("Введіть правильне число!")`,
      explanation: "Рішення використовує цикл for з range(1, 11) для генерації таблиці множення."
    },
    hints: [
      "Використовуйте for i in range(1, 11) для чисел від 1 до 10",
      "Обчислюйте результат як number * i",
      "Використовуйте while True для можливості генерації кількох таблиць",
      "Додайте валідацію введення"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Скільки разів виконається цикл?\n\n```python\nfor i in range(5):\n    print(i)\n```",
        options: ["4", "5", "6", "Помилку"],
        correctAnswer: 1,
        explanation: "range(5) генерує 0, 1, 2, 3, 4 — це 5 ітерацій."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: range(2, 6)?",
        options: ["[2, 3, 4, 5, 6]", "[2, 3, 4, 5]", "[0, 1, 2, 3, 4, 5]", "Помилку"],
        correctAnswer: 1,
        explanation: "range(2, 6) генерує числа від 2 до 5 (не включає 6)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка різниця між for та while?",
        options: [
          "for для послідовностей, while для умов",
          "for швидший за while",
          "Немає різниці",
          "while для послідовностей, for для умов"
        ],
        correctAnswer: 0,
        explanation: "for використовується для ітерації по послідовностях, while — для умовного повторення."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nfor i in range(0, 10, 3):\n    print(i)\n```",
        options: ["0, 3, 6, 9", "0, 3, 6, 9, 12", "3, 6, 9", "0, 1, 2, 3"],
        correctAnswer: 0,
        explanation: "range(0, 10, 3) генерує числа з кроком 3: 0, 3, 6, 9 (не включає 10)."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
