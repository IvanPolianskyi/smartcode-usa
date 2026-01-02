/**
 * Lesson 02-4: break, continue, else в циклах та корисні оператори
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_02_4 = {
  lessonId: "lesson-02-4",
  moduleId: "module-02",
  order: 4,
  title: "break, continue, else в циклах",
  
  learningObjectives: [
    "Використовувати break для виходу з циклу",
    "Застосовувати continue для пропуску ітерації",
    "Розуміти else в циклах",
    "Використовувати корисні оператори: in, not in, min, max"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-02-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "break та continue в for",
        content: `**break** та **continue** працюють так само в for, як і в while.

**break - вихід з циклу:**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number == 7:
        print("Знайдено 7, виходимо!")
        break
    print(number)
\`\`\`

**Виведення:**
\`\`\`
1
2
3
4
5
6
Знайдено 7, виходимо!
\`\`\`

**continue - пропуск ітерації:**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number % 2 == 0:  # якщо парне
        continue  # пропускаємо
    print(number)  # друкуємо тільки непарні
\`\`\`

**Виведення:**
\`\`\`
1
3
5
7
9
\`\`\``
      },
      {
        title: "else в циклах for",
        content: `**else** в циклі for виконується тільки якщо цикл завершився нормально (не через break).

**Приклад з пошуком:**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
target = 10

for number in numbers:
    if number == target:
        print(f"Знайдено {target}!")
        break
else:
    print(f"{target} не знайдено в списку")
\`\`\`

**Виведення:**
\`\`\`
10 не знайдено в списку
\`\`\`

**Якщо знайдено:**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
target = 3

for number in numbers:
    if number == target:
        print(f"Знайдено {target}!")
        break
else:
    print(f"{target} не знайдено в списку")
\`\`\`

**Виведення:**
\`\`\`
Знайдено 3!
\`\`\`

**Важливо:** else виконується тільки якщо break НЕ виконався!`
      },
      {
        title: "Оператор in",
        content: `Оператор **in** перевіряє чи є елемент в послідовності.

**Синтаксис:**
\`\`\`python
елемент in послідовність  # повертає True або False
\`\`\`

**Приклади:**
\`\`\`python
# Перевірка в списку
fruits = ["яблуко", "банан", "апельсин"]
print("яблуко" in fruits)  # True
print("виноград" in fruits)  # False

# Перевірка в рядку
text = "Python"
print("P" in text)  # True
print("x" in text)  # False

# Перевірка в словнику (по ключах)
student = {"ім'я": "Іван", "вік": 15}
print("ім'я" in student)  # True
print("Іван" in student)  # False (перевіряє ключі, не значення)
\`\`\`

**Використання з if:**
\`\`\`python
fruits = ["яблуко", "банан", "апельсин"]

if "яблуко" in fruits:
    print("Яблуко є в списку!")
else:
    print("Яблука немає")
\`\`\``
      },
      {
        title: "Оператор not in",
        content: `Оператор **not in** перевіряє чи НЕМАЄ елемента в послідовності.

**Синтаксис:**
\`\`\`python
елемент not in послідовність  # повертає True якщо немає
\`\`\`

**Приклади:**
\`\`\`python
fruits = ["яблуко", "банан", "апельсин"]

print("виноград" not in fruits)  # True (немає)
print("яблуко" not in fruits)  # False (є)

# Використання з if
if "виноград" not in fruits:
    print("Винограду немає, додаємо...")
    fruits.append("виноград")
\`\`\`

**Коли використовувати:**
- Для перевірки відсутності елемента
- Для додавання нових елементів
- Для фільтрації`
      },
      {
        title: "Функції min() та max()",
        content: `**min()** та **max()** знаходять мінімальне та максимальне значення.

**Синтаксис:**
\`\`\`python
min(послідовність)  # мінімальне значення
max(послідовність)  # максимальне значення
\`\`\`

**Приклади:**
\`\`\`python
# Зі списком чисел
numbers = [5, 2, 8, 1, 9, 3]
print(min(numbers))  # 1
print(max(numbers))  # 9

# З рядком (по ASCII кодах)
text = "Python"
print(min(text))  # 'P' (найменший символ)
print(max(text))  # 'y' (найбільший символ)

# З кількома аргументами
print(min(5, 2, 8))  # 2
print(max(5, 2, 8))  # 8
\`\`\`

**Практичне застосування:**
\`\`\`python
grades = [85, 92, 78, 96, 88]
print(f"Найкраща оцінка: {max(grades)}")
print(f"Найгірша оцінка: {min(grades)}")
\`\`\``
      },
      {
        title: "Комбінація break, continue, else",
        content: `Можна комбінувати break, continue та else для складних задач.

**Приклад: Пошук першого парного числа**
\`\`\`python
numbers = [1, 3, 5, 8, 9, 11]

for number in numbers:
    if number % 2 == 0:
        print(f"Знайдено перше парне число: {number}")
        break
else:
    print("Парних чисел не знайдено")
\`\`\`

**Приклад: Фільтрація та обробка**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number < 3:
        continue  # пропускаємо малі числа
    if number > 8:
        break  # виходимо якщо більше 8
    print(number * 2)  # подвоюємо
\`\`\`

**Виведення:**
\`\`\`
6
8
10
12
14
16
\`\`\``
      },
      {
        title: "Практичні поради",
        content: `**Коли використовувати break:**
- Коли знайшли те, що шукали
- Коли досягли мети і не потрібно продовжувати
- Для оптимізації (не обробляти всі елементи)

**Коли використовувати continue:**
- Коли потрібно пропустити поточну ітерацію
- Для фільтрації даних
- Для обробки тільки певних значень

**Коли використовувати else:**
- Для підтвердження що цикл завершився нормально
- Для обробки випадку "не знайдено"
- Для альтернативної дії після циклу

**Оптимізація:**
- Використовуй break для дострокового виходу
- Використовуй continue для пропуску непотрібних ітерацій
- Використовуй in/not in замість циклів для перевірки наявності`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: break в for",
      code: `# Пошук з break
numbers = [1, 2, 3, 4, 5, 6, 7]

for number in numbers:
    if number == 5:
        print("Знайдено 5!")
        break
    print(number)`,
      explanation: "Демонструє достроковий вихід з for циклу за допомогою break."
    },
    {
      title: "Приклад 2: continue в for",
      code: `# Фільтрація з continue
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number % 2 == 0:
        continue  # пропускаємо парні
    print(number)  # друкуємо тільки непарні`,
      explanation: "Показує як пропустити певні ітерації за допомогою continue."
    },
    {
      title: "Приклад 3: else в for",
      code: `# Пошук з else
numbers = [1, 2, 3, 4, 5]
target = 10

for number in numbers:
    if number == target:
        print(f"Знайдено {target}!")
        break
else:
    print(f"{target} не знайдено")`,
      explanation: "Демонструє використання else для обробки випадку 'не знайдено'."
    },
    {
      title: "Приклад 4: Оператор in",
      code: `# Перевірка наявності
fruits = ["яблуко", "банан", "апельсин"]

if "яблуко" in fruits:
    print("Яблуко є в списку!")

# Перевірка в рядку
text = "Python"
if "Py" in text:
    print("'Py' знайдено в рядку")`,
      explanation: "Показує використання оператора in для перевірки наявності елемента."
    },
    {
      title: "Приклад 5: min() та max()",
      code: `# Знаходження мінімуму та максимуму
grades = [85, 92, 78, 96, 88]

print(f"Найкраща оцінка: {max(grades)}")
print(f"Найгірша оцінка: {min(grades)}")`,
      explanation: "Демонструє використання min() та max() для знаходження екстремальних значень."
    },
    {
      title: "Приклад 6: Комбінація break, continue, else",
      code: `# Складна логіка
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number < 3:
        continue  # пропускаємо
    if number > 7:
        break  # виходимо
    print(number)
else:
    print("Цикл завершено нормально")`,
      explanation: "Показує комбінацію break, continue та else в одному циклі."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між break та continue",
      explanation: "break виходить з циклу повністю, continue тільки пропускає поточну ітерацію.",
      correctApproach: "break = вихід з циклу, continue = пропуск поточної ітерації, продовження циклу"
    },
    {
      mistake: "Неправильне розуміння else в циклах",
      explanation: "else виконується тільки якщо цикл завершився нормально (не через break).",
      correctApproach: "else в циклі = 'якщо цикл завершився без break'"
    },
    {
      mistake: "Використання циклу замість in",
      explanation: "Для перевірки наявності елемента краще використовувати in, а не цикл.",
      correctApproach: "Використовуй 'елемент in послідовність' замість циклу для перевірки"
    },
    {
      mistake: "Забути про min() та max()",
      explanation: "Для знаходження мінімуму/максимуму є готові функції, не потрібно писати цикл.",
      correctApproach: "Використовуй min() та max() замість написання власного циклу"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **break в for** - достроковий вихід з циклу
2. **continue в for** - пропуск поточної ітерації
3. **else в циклах** - виконання коду після нормального завершення
4. **Оператор in** - перевірка наявності елемента
5. **Оператор not in** - перевірка відсутності елемента
6. **min() та max()** - знаходження мінімуму та максимуму
7. **Комбінація інструментів** - break, continue, else разом

Тепер ви вмієте ефективно контролювати виконання циклів та використовувати корисні оператори!

Наступний урок - вкладені цикли та умови!`,
  
  practiceTask: {
    title: "Система перевірки паролів",
    description: "Створіть програму для перевірки сили пароля",
    problemStatement: `Напишіть програму, яка:
1. Має список заборонених паролів: forbidden = ["123456", "password", "qwerty"]
2. Має тестовий пароль: test_password = "MyPass123"
3. Перевіряє пароль:
   - Якщо пароль в forbidden: виводить "Пароль заборонений!" і виходить
   - Якщо довжина < 6: виводить "Пароль занадто короткий!" і пропускає перевірку
   - Якщо пароль не містить цифр: виводить "Пароль має містити цифри!" і пропускає
   - Якщо все ОК: виводить "Пароль прийнято!"
4. Використовує break, continue, else та оператор in`,
    inputFormat: "Програма використовує фіксовані значення",
    outputFormat: `Приклад виведення:
Перевірка пароля: MyPass123
Пароль прийнято!`,
    examples: [
      {
        input: "test_password = '123456'",
        output: `Перевірка пароля: 123456
Пароль заборонений!`,
        explanation: "Заборонений пароль виявляється одразу"
      },
      {
        input: "test_password = 'short'",
        output: `Перевірка пароля: short
Пароль занадто короткий!`,
        explanation: "Короткий пароль відхиляється"
      },
      {
        input: "test_password = 'MyPass123'",
        output: `Перевірка пароля: MyPass123
Пароль прийнято!`,
        explanation: "Валідний пароль приймається"
      }
    ],
    solution: {
      code: `# Система перевірки паролів
forbidden = ["123456", "password", "qwerty"]
test_password = "MyPass123"

print(f"Перевірка пароля: {test_password}")

# Перевірка на заборонені паролі
if test_password in forbidden:
    print("Пароль заборонений!")
else:
    # Перевірка довжини
    if len(test_password) < 6:
        print("Пароль занадто короткий!")
    else:
        # Перевірка наявності цифр
        has_digit = False
        for char in test_password:
            if char.isdigit():
                has_digit = True
                break
        
        if not has_digit:
            print("Пароль має містити цифри!")
        else:
            print("Пароль прийнято!")`,
      explanation: "Рішення використовує in для перевірки заборонених паролів, break для дострокового виходу при знаходженні цифри, та вкладені if для перевірок."
    },
    hints: [
      "Використовуйте 'пароль in forbidden' для перевірки заборонених",
      "Використовуйте len() для перевірки довжини",
      "Використовуйте цикл for з break для пошуку цифр",
      "Використовуйте char.isdigit() для перевірки чи символ - цифра",
      "Використовуйте вкладені if/else для послідовних перевірок"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nfor n in numbers:\n    if n == 3:\n        break\n    print(n)\n```",
        options: [
          "1\n2",
          "1\n2\n3",
          "1\n2\n3\n4\n5",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "Друкується 1, 2. Коли n == 3, виконується break і цикл зупиняється."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nfor n in numbers:\n    if n % 2 == 0:\n        continue\n    print(n)\n```",
        options: [
          "1\n3\n5",
          "2\n4",
          "1\n2\n3\n4\n5",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "continue пропускає парні числа, тому друкуються тільки непарні: 1, 3, 5."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nnumbers = [1, 2, 3]\nfor n in numbers:\n    if n == 10:\n        break\nelse:\n    print('Не знайдено')\n```",
        options: [
          "Не знайдено",
          "Нічого",
          "1\n2\n3",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "10 не знайдено, break не виконався, тому виконується else блок."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне 'a' in 'Python'?",
        options: [
          "True",
          "False",
          "Помилку",
          "None"
        ],
        correctAnswer: 1,
        explanation: "'a' немає в рядку 'Python', тому повертається False."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nnumbers = [5, 2, 8, 1, 9]\nprint(max(numbers))\n```",
        options: [
          "9",
          "1",
          "8",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "max() знаходить максимальне значення в списку, це 9."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли виконується else в циклі for?",
        options: [
          "Завжди після циклу",
          "Тільки якщо break не виконався",
          "Тільки якщо break виконався",
          "Ніколи"
        ],
        correctAnswer: 1,
        explanation: "else в циклі виконується тільки якщо цикл завершився нормально (break не виконався)."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
