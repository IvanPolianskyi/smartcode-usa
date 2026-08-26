/**
 * Lesson 02-3: Цикл for та функція range()
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_02_3 = {
  lessonId: "lesson-02-3",
  moduleId: "module-02",
  order: 3,
  title: "Цикл for та функція range()",
  
  learningObjectives: [
    "Використовувати цикл for для ітерації",
    "Застосовувати функцію range()",
    "Ітерувати по послідовностях",
    "Працювати з enumerate() та zip()"
  ],
  
  prerequisites: ["lesson-02-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке цикл for?",
        content: `Цикл **for** використовується для ітерації (проходження) по послідовностях: списках, рядках, кортежах тощо.

**Синтаксис:**
\`\`\`python
for елемент in послідовність:
    # код для кожного елемента
    дія
\`\`\`

**Як це працює:**
1. Python бере перший елемент з послідовності
2. Присвоює його змінній (після for)
3. Виконує код всередині циклу
4. Переходить до наступного елемента
5. Повторює поки не закінчаться елементи

**Приклад:**
\`\`\`python
fruits = ["яблуко", "банан", "апельсин"]

for fruit in fruits:
    print(fruit)
\`\`\`

**Виведення:**
\`\`\`
яблуко
банан
апельсин
\`\`\``
      },
      {
        title: "for зі списками",
        content: `**Ітерація по списку:**

\`\`\`python
numbers = [1, 2, 3, 4, 5]

for number in numbers:
    print(f"Число: {number}")
\`\`\`

**З індексами (використовуючи range):**
\`\`\`python
numbers = [10, 20, 30, 40, 50]

for i in range(len(numbers)):
    print(f"Індекс {i}: {numbers[i]}")
\`\`\`

**Використання enumerate (краще рішення):**
\`\`\`python
numbers = [10, 20, 30, 40, 50]

for index, value in enumerate(numbers):
    print(f"Індекс {index}: {value}")
\`\`\`

**enumerate** повертає пари (індекс, значення), що дуже зручно!`
      },
      {
        title: "Функція range()",
        content: `**range()** створює послідовність чисел. Це найчастіше використовується з for.

**Синтаксис:**
- \`range(stop)\` - від 0 до stop-1
- \`range(start, stop)\` - від start до stop-1
- \`range(start, stop, step)\` - від start до stop-1 з кроком step

**Приклади:**
\`\`\`python
# range(5) - 0, 1, 2, 3, 4
for i in range(5):
    print(i)

# range(2, 7) - 2, 3, 4, 5, 6
for i in range(2, 7):
    print(i)

# range(0, 10, 2) - 0, 2, 4, 6, 8
for i in range(0, 10, 2):
    print(i)
\`\`\`

**Важливо:** range() не включає останнє число (stop), тільки до нього!

**Перетворення в список:**
\`\`\`python
numbers = list(range(5))
print(numbers)  # [0, 1, 2, 3, 4]
\`\`\``
      },
      {
        title: "for з рядками",
        content: `Рядки теж є послідовностями, тому можна ітерувати по символах:

\`\`\`python
word = "Python"

for letter in word:
    print(letter)
\`\`\`

**Виведення:**
\`\`\`
P
y
t
h
o
n
\`\`\`

**З індексами:**
\`\`\`python
word = "Python"

for i, letter in enumerate(word):
    print(f"Позиція {i}: {letter}")
\`\`\`

**Виведення:**
\`\`\`
Позиція 0: P
Позиція 1: y
Позиція 2: t
Позиція 3: h
Позиція 4: o
Позиція 5: n
\`\`\``
      },
      {
        title: "for зі словниками",
        content: `**Ітерація по ключах:**
\`\`\`python
student = {"ім'я": "Іван", "вік": 15, "клас": 9}

for key in student:
    print(f"{key}: {student[key]}")
\`\`\`

**Використання .keys():**
\`\`\`python
for key in student.keys():
    print(key)
\`\`\`

**Ітерація по значеннях:**
\`\`\`python
for value in student.values():
    print(value)
\`\`\`

**Ітерація по парах ключ-значення:**
\`\`\`python
for key, value in student.items():
    print(f"{key}: {value}")
\`\`\`

**items()** повертає пари (ключ, значення) - це найзручніший спосіб!`
      },
      {
        title: "enumerate() - індекс та значення",
        content: `**enumerate()** додає індекси до послідовності:

\`\`\`python
fruits = ["яблуко", "банан", "апельсин"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
\`\`\`

**Виведення:**
\`\`\`
0: яблуко
1: банан
2: апельсин
\`\`\`

**Початок з іншого числа:**
\`\`\`python
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")
\`\`\`

**Коли використовувати:**
- Коли потрібен і індекс, і значення
- Для нумерації елементів
- Для відстеження позиції`
      },
      {
        title: "zip() - об'єднання послідовностей",
        content: `**zip()** об'єднує кілька послідовностей разом:

\`\`\`python
names = ["Іван", "Марія", "Петро"]
ages = [15, 16, 14]

for name, age in zip(names, ages):
    print(f"{name} - {age} років")
\`\`\`

**Виведення:**
\`\`\`
Іван - 15 років
Марія - 16 років
Петро - 14 років
\`\`\`

**Важливо:** zip() зупиняється коли закінчується найкоротша послідовність.

**Коли використовувати:**
- Коли потрібно обробити кілька списків одночасно
- Для створення пар значень
- Для об'єднання даних`
      },
      {
        title: "for з else",
        content: `Як і в while, в for можна використовувати **else**:

\`\`\`python
numbers = [1, 2, 3, 4, 5]

for number in numbers:
    if number == 10:
        print("Знайдено 10!")
        break
else:
    print("10 не знайдено")
\`\`\`

**else виконується тільки якщо цикл завершився нормально (не через break).**

**Корисно для пошуку:**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
target = 10

for number in numbers:
    if number == target:
        print(f"Знайдено {target}!")
        break
else:
    print(f"{target} не знайдено в списку")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: for зі списком",
      code: `# Ітерація по списку
fruits = ["яблуко", "банан", "апельсин"]

for fruit in fruits:
    print(fruit)`,
      explanation: "Демонструє базову ітерацію по списку за допомогою for."
    },
    {
      title: "Приклад 2: range()",
      code: `# Використання range()
for i in range(5):
    print(f"Число: {i}")

# range з кроком
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8`,
      explanation: "Показує використання range() для створення послідовностей чисел."
    },
    {
      title: "Приклад 3: enumerate()",
      code: `# Використання enumerate
fruits = ["яблуко", "банан", "апельсин"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")`,
      explanation: "Демонструє як отримати і індекс, і значення за допомогою enumerate()."
    },
    {
      title: "Приклад 4: zip()",
      code: `# Об'єднання списків
names = ["Іван", "Марія"]
ages = [15, 16]

for name, age in zip(names, ages):
    print(f"{name} - {age} років")`,
      explanation: "Показує як об'єднати кілька списків разом за допомогою zip()."
    },
    {
      title: "Приклад 5: for зі словником",
      code: `# Ітерація по словнику
student = {"ім'я": "Іван", "вік": 15}

for key, value in student.items():
    print(f"{key}: {value}")`,
      explanation: "Демонструє ітерацію по парах ключ-значення в словнику."
    },
    {
      title: "Приклад 6: Обчислення суми",
      code: `# Сума чисел у списку
numbers = [1, 2, 3, 4, 5]
total = 0

for number in numbers:
    total += number

print(f"Сума: {total}")`,
      explanation: "Показує як використовувати for для обчислення суми."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між range() та списком",
      explanation: "range(5) це не [0,1,2,3,4], а генератор. Для списку потрібно list(range(5)).",
      correctApproach: "range() можна використовувати безпосередньо в for, але для списку використовуй list(range())"
    },
    {
      mistake: "range() включає останнє число",
      explanation: "range(5) створює 0,1,2,3,4 (не включає 5).",
      correctApproach: "Пам'ятай: range(stop) створює числа від 0 до stop-1"
    },
    {
      mistake: "Забути enumerate() коли потрібен індекс",
      explanation: "Не потрібно використовувати range(len(list)), коли можна використати enumerate().",
      correctApproach: "Використовуй enumerate() замість range(len()) для отримання індексу та значення"
    },
    {
      mistake: "Неправильне використання zip()",
      explanation: "zip() зупиняється коли закінчується найкоротша послідовність.",
      correctApproach: "Переконайся що всі послідовності в zip() мають однакову довжину, або обробляй різну довжину"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. Цикл for - для ітерації по послідовностях
2. range() - створення послідовностей чисел
3. Ітерація по списках - простий спосіб обробки даних
4. Ітерація по рядках - по символах
5. Ітерація по словниках - по ключах, значеннях, парах
6. enumerate() - отримання індексу та значення
7. zip() - об'єднання кількох послідовностей
8. for з else - обробка після завершення циклу

Тепер ви вмієте ефективно ітерувати по даних!

Наступний урок - break, continue та else в циклах!`,
  
  practiceTask: {
    title: "Аналіз оцінок студентів",
    description: "Створіть програму для аналізу оцінок студентів",
    problemStatement: `Напишіть програму, яка:
1. Зчитує кількість оцінок n, потім n оцінок (по одній на рядок)
2. Використовує for і enumerate для виведення кожної оцінки з індексом
3. Обчислює кількість, середню (2 знаки після коми), максимум і мінімум
4. Виводить усі результати

Формат вводу:
7
85
92
78
96
88
75
90`,
    outputFormat: `Оцінка 0: 85
Оцінка 1: 92
Оцінка 2: 78
Оцінка 3: 96
Оцінка 4: 88
Оцінка 5: 75
Оцінка 6: 90
Кількість оцінок: 7
Середня оцінка: 86.29
Максимальна оцінка: 96
Мінімальна оцінка: 75`,
    examples: [
      {
        input: `7
85
92
78
96
88
75
90`,
        output: `Оцінка 0: 85
Оцінка 1: 92
Оцінка 2: 78
Оцінка 3: 96
Оцінка 4: 88
Оцінка 5: 75
Оцінка 6: 90
Кількість оцінок: 7
Середня оцінка: 86.29
Максимальна оцінка: 96
Мінімальна оцінка: 75`,
        explanation: "Середнє 604/7 = 86.29, max=96, min=75"
      },
      {
        input: `3
100
80
90`,
        output: `Оцінка 0: 100
Оцінка 1: 80
Оцінка 2: 90
Кількість оцінок: 3
Середня оцінка: 90.00
Максимальна оцінка: 100
Мінімальна оцінка: 80`,
        explanation: "Середнє (100+80+90)/3 = 90.00"
      },
      {
        input: `1
55`,
        output: `Оцінка 0: 55
Кількість оцінок: 1
Середня оцінка: 55.00
Максимальна оцінка: 55
Мінімальна оцінка: 55`,
        explanation: "Одна оцінка - вона і середнє, і max, і min"
      }
    ],
    solution: {
      code: `n = int(input())
grades = []
for _ in range(n):
    grades.append(int(input()))

for index, grade in enumerate(grades):
    print(f"Оцінка {index}: {grade}")

count = len(grades)
print(f"Кількість оцінок: {count}")

total = 0
for grade in grades:
    total += grade

average = total / count
print(f"Середня оцінка: {average:.2f}")

max_grade = grades[0]
min_grade = grades[0]
for grade in grades:
    if grade > max_grade:
        max_grade = grade
    if grade < min_grade:
        min_grade = grade

print(f"Максимальна оцінка: {max_grade}")
print(f"Мінімальна оцінка: {min_grade}")`,
      explanation: "Читаємо оцінки з stdin, виводимо через enumerate, рахуємо середнє з :.2f та max/min у циклі."
    },
    hints: [
      "Зчитайте n, потім n оцінок у список",
      "Використовуйте enumerate() для індексу та значення",
      "Середня = сума / кількість, формат :.2f",
      "Для max/min порівнюйте кожну оцінку в циклі for"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nfor i in range(3):\n    print(i)\n```",
        options: [
          "0\n1\n2",
          "1\n2\n3",
          "0\n1\n2\n3",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "range(3) створює 0, 1, 2 (не включає 3)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nfruits = ['яблуко', 'банан']\nfor fruit in fruits:\n    print(fruit)\n```",
        options: [
          "яблуко\nбанан",
          "0\n1",
          "яблуко банан",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "for ітерує по елементах списку, тому виводяться 'яблуко' та 'банан'."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nfor i, letter in enumerate('Hi'):\n    print(f'{i}: {letter}')\n```",
        options: [
          "0: H\n1: i",
          "H\ni",
          "0\n1",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "enumerate() повертає пари (індекс, значення), тому виводяться '0: H' та '1: i'."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що створює range(5)?",
        options: [
          "[0, 1, 2, 3, 4, 5]",
          "[0, 1, 2, 3, 4]",
          "[1, 2, 3, 4, 5]",
          "Генератор чисел 0-4"
        ],
        correctAnswer: 3,
        explanation: "range(5) створює генератор чисел від 0 до 4 (не включає 5)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nnames = ['Іван', 'Марія']\nages = [15, 16, 17]\nfor name, age in zip(names, ages):\n    print(f'{name}: {age}')\n```",
        options: [
          "Іван: 15\nМарія: 16",
          "Іван: 15\nМарія: 16\n17",
          "Помилку",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "zip() зупиняється коли закінчується найкоротша послідовність (names має 2 елементи)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як отримати і індекс, і значення в циклі for?",
        options: [
          "for i in range(len(list)):",
          "for i, value in enumerate(list):",
          "for value in list:",
          "Всі варіанти правильні"
        ],
        correctAnswer: 1,
        explanation: "enumerate() - найкращий спосіб отримати і індекс, і значення одночасно."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
