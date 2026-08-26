/**
 * Lesson 02-7: Практика: алгоритмічні задачі
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_02_7 = {
  lessonId: "lesson-02-7",
  moduleId: "module-02",
  order: 7,
  title: "Практика: алгоритмічні задачі",
  
  learningObjectives: [
    "Розв'язувати алгоритмічні задачі",
    "Застосовувати цикли та умови",
    "Аналізувати складність алгоритмів",
    "Практикуватися у написанні ефективного коду"
  ],
  
  prerequisites: ["lesson-02-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Підхід до розв'язання алгоритмічних задач",
        content: `**Кроки для розв'язання задачі:**

1. **Зрозумій задачу**
   - Прочитай умову уважно
   - Визнач що потрібно знайти
   - Зрозумій вхідні та вихідні дані

2. **Плануй рішення**
   - Розбий задачу на підзадачі
   - Визнач які структури даних потрібні
   - Подумай про алгоритм

3. **Реалізуй**
   - Напиши код покроково
   - Тестуй на простих прикладах
   - Перевіряй крайові випадки

4. **Оптимізуй**
   - Перевір чи можна спростити
   - Подумай про ефективність
   - Переконайся що код читабельний`
      },
      {
        title: "Задача 1: Пошук максимуму",
        content: `**Умова:** Знайти максимальне число в списку.

**Підхід:**
1. Зберігаємо перший елемент як поточний максимум
2. Проходимо по всіх елементах
3. Якщо знаходимо більший - оновлюємо максимум

**Рішення:**
\`\`\`python
numbers = [5, 2, 8, 1, 9, 3]
max_number = numbers[0]

for number in numbers:
    if number > max_number:
        max_number = number

print(f"Максимум: {max_number}")
\`\`\`

**Альтернатива з max():**
\`\`\`python
max_number = max(numbers)
\`\`\`

**Але важливо розуміти як це працює!**`
      },
      {
        title: "Задача 2: Підрахунок елементів",
        content: `**Умова:** Підрахувати скільки разів зустрічається кожне число.

**Підхід:**
1. Використовуємо словник для зберігання підрахунків
2. Проходимо по списку
3. Збільшуємо лічильник для кожного елемента

**Рішення:**
\`\`\`python
numbers = [1, 2, 2, 3, 3, 3, 4, 5]
counts = {}

for number in numbers:
    if number in counts:
        counts[number] += 1
    else:
        counts[number] = 1

print(counts)  # {1: 1, 2: 2, 3: 3, 4: 1, 5: 1}
\`\`\`

**Оптимізація з get():**
\`\`\`python
for number in numbers:
    counts[number] = counts.get(number, 0) + 1
\`\`\``
      },
      {
        title: "Задача 3: Перевірка паліндрому",
        content: `**Умова:** Перевірити чи рядок є паліндромом (читається однаково з обох сторін).

**Підхід:**
1. Порівнюємо символи з початку та кінця
2. Рухаємось до центру
3. Якщо всі пари однакові - паліндром

**Рішення:**
\`\`\`python
text = "radar"
is_palindrome = True

for i in range(len(text) // 2):
    if text[i] != text[len(text) - 1 - i]:
        is_palindrome = False
        break

if is_palindrome:
    print(f"'{text}' - паліндром")
else:
    print(f"'{text}' - не паліндром")
\`\`\`

**Альтернатива:**
\`\`\`python
is_palindrome = text == text[::-1]
\`\`\``
      },
      {
        title: "Задача 4: Фібоначчі",
        content: `**Умова:** Згенерувати перші n чисел Фібоначчі.

**Послідовність:** 0, 1, 1, 2, 3, 5, 8, 13, ...
**Правило:** Кожне число = сума двох попередніх

**Рішення:**
\`\`\`python
n = 10
fibonacci = [0, 1]

for i in range(2, n):
    next_number = fibonacci[i-1] + fibonacci[i-2]
    fibonacci.append(next_number)

print(fibonacci)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

**Альтернатива з while:**
\`\`\`python
fibonacci = [0, 1]
while len(fibonacci) < n:
    fibonacci.append(fibonacci[-1] + fibonacci[-2])
\`\`\``
      },
      {
        title: "Задача 5: Сортування бульбашкою (Bubble Sort)",
        content: `**Умова:** Відсортувати список за зростанням.

**Алгоритм:**
1. Порівнюємо сусідні елементи
2. Якщо неправильний порядок - міняємо місцями
3. Повторюємо поки не відсортовано

**Рішення:**
\`\`\`python
numbers = [64, 34, 25, 12, 22, 11, 90]
n = len(numbers)

for i in range(n):
    for j in range(0, n - i - 1):
        if numbers[j] > numbers[j + 1]:
            numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]

print(numbers)  # [11, 12, 22, 25, 34, 64, 90]
\`\`\`

**Складність:** O(n²) - не найефективніший, але простий для розуміння.`
      },
      {
        title: "Поради для практики",
        content: `**1. Починай з простого**
- Розв'яжи задачу найпростішим способом
- Потім оптимізуй якщо потрібно

**2. Тестуй на різних даних**
- Прості випадки
- Крайові випадки (порожній список, один елемент)
- Великі дані

**3. Аналізуй складність**
- Скільки операцій виконується?
- Чи можна зробити швидше?

**4. Читай чужі рішення**
- Навчайся з інших підходів
- Порівнюй різні алгоритми

**5. Практикуйся регулярно**
- Розв'язуй задачі щодня
- Поступово збільшуй складність`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Пошук максимуму",
      code: `# Знаходження максимуму вручну
numbers = [5, 2, 8, 1, 9, 3]
max_number = numbers[0]

for number in numbers:
    if number > max_number:
        max_number = number

print(f"Максимум: {max_number}")`,
      explanation: "Демонструє алгоритм пошуку максимуму без використання вбудованої функції."
    },
    {
      title: "Приклад 2: Підрахунок елементів",
      code: `# Підрахунок частоти елементів
numbers = [1, 2, 2, 3, 3, 3, 4]
counts = {}

for number in numbers:
    counts[number] = counts.get(number, 0) + 1

print(counts)`,
      explanation: "Показує як підрахувати скільки разів зустрічається кожен елемент."
    },
    {
      title: "Приклад 3: Перевірка паліндрому",
      code: `# Перевірка чи рядок - паліндром
text = "radar"
is_palindrome = True

for i in range(len(text) // 2):
    if text[i] != text[len(text) - 1 - i]:
        is_palindrome = False
        break

print(f"Паліндром: {is_palindrome}")`,
      explanation: "Демонструє алгоритм перевірки паліндрому."
    },
    {
      title: "Приклад 4: Числа Фібоначчі",
      code: `# Генерація чисел Фібоначчі
n = 10
fibonacci = [0, 1]

for i in range(2, n):
    fibonacci.append(fibonacci[i-1] + fibonacci[i-2])

print(fibonacci)`,
      explanation: "Показує як генерувати послідовність Фібоначчі."
    },
    {
      title: "Приклад 5: Сортування",
      code: `# Bubble Sort
numbers = [64, 34, 25, 12, 22]
n = len(numbers)

for i in range(n):
    for j in range(0, n - i - 1):
        if numbers[j] > numbers[j + 1]:
            numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]

print(numbers)`,
      explanation: "Демонструє алгоритм сортування бульбашкою."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не враховувати крайові випадки",
      explanation: "Порожній список, один елемент, однакові елементи - все це потрібно перевіряти.",
      correctApproach: "Завжди тестуй на крайових випадках: [], [1], [1,1,1]"
    },
    {
      mistake: "Занадто складна логіка",
      explanation: "Іноді простіше рішення краще за складне.",
      correctApproach: "Починай з простого, потім оптимізуй якщо потрібно"
    },
    {
      mistake: "Не ефективні алгоритми",
      explanation: "Для великих даних потрібні ефективні алгоритми.",
      correctApproach: "Аналізуй складність: O(n) краще за O(n²)"
    },
    {
      mistake: "Не тестувати код",
      explanation: "Код може працювати на одних даних, але падати на інших.",
      correctApproach: "Завжди тестуй на різних вхідних даних"
    }
  ],
  
  summary: `На цьому уроці ми практикувалися:

1. Підхід до задач - зрозуміти, спланувати, реалізувати, оптимізувати
2. Пошук максимуму - алгоритм пошуку найбільшого елемента
3. Підрахунок елементів - використання словників для статистики
4. Перевірка паліндрому - алгоритм перевірки симетрії
5. Числа Фібоначчі - генерація послідовностей
6. Сортування - базові алгоритми сортування
7. Практичні поради - як покращити навички

Практика - ключ до успіху в програмуванні!

Наступний урок - додаткові практичні задачі!`,
  
  practiceTask: {
    title: "Система аналізу текстів",
    description: "Створіть програму для аналізу тексту",
    problemStatement: `Напишіть програму, яка:
1. Зчитує рядок тексту
2. Підраховує загальну кількість слів і кількість унікальних слів
3. Знаходить найдовше слово (при рівності - перше зліва)
4. Знаходить слово, яке зустрічається найчастіше (при рівності - перше з максимальною частотою в порядку обходу словника після підрахунку; беріть перше з максимумом у циклі по словам у порядку появи)
5. Виводить результати

Формат вводу:
Python is great Python is fun`,
    outputFormat: `Загальна кількість слів: 6
Унікальні слова: 4
Найдовше слово: Python
Найчастіше слово: Python (2 рази)`,
    examples: [
      {
        input: `Python is great Python is fun`,
        output: `Загальна кількість слів: 6
Унікальні слова: 4
Найдовше слово: Python
Найчастіше слово: Python (2 рази)`,
        explanation: "6 слів, 4 унікальні; Python найдовше і найчастіше (2)"
      },
      {
        input: `a bb ccc bb`,
        output: `Загальна кількість слів: 4
Унікальні слова: 3
Найдовше слово: ccc
Найчастіше слово: bb (2 рази)`,
        explanation: "ccc довжиною 3; bb зустрічається двічі"
      },
      {
        input: `hello world`,
        output: `Загальна кількість слів: 2
Унікальні слова: 2
Найдовше слово: hello
Найчастіше слово: hello (1 рази)`,
        explanation: "При однаковій частоті береться перше слово з макс. частотою"
      }
    ],
    solution: {
      code: `text = input().strip()
words = text.split()

total_words = len(words)
print(f"Загальна кількість слів: {total_words}")

unique_words = len(set(words))
print(f"Унікальні слова: {unique_words}")

longest_word = words[0]
for word in words:
    if len(word) > len(longest_word):
        longest_word = word
print(f"Найдовше слово: {longest_word}")

word_counts = {}
for word in words:
    word_counts[word] = word_counts.get(word, 0) + 1

most_common = words[0]
max_count = word_counts[most_common]
for word in words:
    if word_counts[word] > max_count:
        most_common = word
        max_count = word_counts[word]

print(f"Найчастіше слово: {most_common} ({max_count} рази)")`,
      explanation: "Читаємо текст, розбиваємо split(), рахуємо унікальні через set і частоти через словник."
    },
    hints: [
      "Зчитайте текст: text = input().strip()",
      "Використовуйте text.split() і set(words)",
      "Шукайте найдовше слово порівнянням len()",
      "Для частоти використовуйте словник і цикл"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який перший крок у розв'язанні алгоритмічної задачі?",
        options: [
          "Написати код",
          "Зрозуміти задачу",
          "Оптимізувати",
          "Тестувати"
        ],
        correctAnswer: 1,
        explanation: "Спочатку потрібно зрозуміти задачу, потім планувати, реалізувати та тестувати."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що знайде цей код?\n\n```python\nnumbers = [5, 2, 8, 1]\nmax_num = numbers[0]\nfor n in numbers:\n    if n > max_num:\n        max_num = n\n```",
        options: [
          "Мінімум",
          "Максимум",
          "Середнє",
          "Сума"
        ],
        correctAnswer: 1,
        explanation: "Код знаходить максимальне число, порівнюючи кожен елемент з поточним максимумом."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка складність Bubble Sort?",
        options: [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(1)"
        ],
        correctAnswer: 2,
        explanation: "Bubble Sort має складність O(n²) через вкладені цикли."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що зробить цей код?\n\n```python\nfib = [0, 1]\nfor i in range(2, 5):\n    fib.append(fib[i-1] + fib[i-2])\n```",
        options: [
          "Створить [0, 1, 1, 2, 3]",
          "Створить [0, 1, 2, 3, 4]",
          "Створить [1, 1, 2, 3, 5]",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Генерує числа Фібоначчі: 0, 1, 1(0+1), 2(1+1), 3(1+2)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо тестувати на крайових випадках?",
        options: [
          "Щоб код працював на всіх даних",
          "Щоб знайти помилки",
          "Обидва варіанти правильні",
          "Не важливо"
        ],
        correctAnswer: 2,
        explanation: "Крайові випадки часто виявляють помилки, які не видно на звичайних даних."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
