/**
 * Lesson 05-3: Практична робота з текстовими файлами
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_3 = {
  lessonId: "lesson-05-3",
  moduleId: "module-05",
  order: 3,
  title: "Практична робота з текстовими файлами",
  
  learningObjectives: [
    "Створювати практичні програми з файлами",
    "Обробляти текстові дані",
    "Аналізувати вміст файлів",
    "Застосовувати знання на реальних задачах"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-05-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Практичні задачі з файлами",
        content: `На цьому уроці ми застосуємо всі знання про роботу з файлами на практиці.

**Що ми вміємо:**
1. Відкривати файли (open, with)
2. Читати дані (read, readline, readlines)
3. Записувати дані (write, writelines)
4. Працювати з кодуванням (utf-8)

**Типові задачі:**
- Аналіз текстових файлів
- Обробка та трансформація даних
- Створення звітів
- Фільтрація інформації
- Робота зі списками та записами`
      },
      {
        title: "Аналіз текстових файлів",
        content: `**Задача: Статистика тексту**

Створимо програму, яка аналізує текстовий файл та виводить статистику.

\`\`\`python
# Аналіз файлу
with open("text.txt", "r", encoding="utf-8") as file:
    content = file.read()
    
    # Підрахунок статистики
    lines = content.count('\\n') + 1
    words = len(content.split())
    chars = len(content)
    chars_no_spaces = len(content.replace(' ', '').replace('\\n', ''))
    
    # Виведення результатів
    print("=== Статистика файлу ===")
    print(f"Рядків: {lines}")
    print(f"Слів: {words}")
    print(f"Символів (з пробілами): {chars}")
    print(f"Символів (без пробілів): {chars_no_spaces}")
\`\`\`

**Результат:**
\`\`\`
=== Статистика файлу ===
Рядків: 10
Слів: 85
Символів (з пробілами): 450
Символів (без пробілів): 382
\`\`\``
      },
      {
        title: "Обробка списків даних",
        content: `**Задача: Обробка списку студентів**

Припустимо, у нас є файл з іменами студентів (по одному на рядок).

**Файл students.txt:**
\`\`\`
Іван Петренко
Марія Коваленко
Петро Шевченко
Олена Мельник
\`\`\`

**Програма обробки:**
\`\`\`python
# Читання списку студентів
students = []
with open("students.txt", "r", encoding="utf-8") as file:
    for line in file:
        name = line.strip()
        if name:  # Пропускаємо порожні рядки
            students.append(name)

# Виведення результатів
print(f"Всього студентів: {len(students)}")
print("\\nСписок студентів:")
for i, student in enumerate(students, 1):
    print(f"{i}. {student}")

# Сортування по алфавіту
students.sort()
print("\\nСортовані по алфавіту:")
for student in students:
    print(f"  - {student}")
\`\`\``
      },
      {
        title: "Трансформація даних",
        content: `**Задача: Перетворення тексту**

Створимо програму, яка читає файл та створює новий з перетвореним текстом.

**Приклад 1: Перетворення у великі літери**
\`\`\`python
with open("input.txt", "r", encoding="utf-8") as infile, \\
     open("output.txt", "w", encoding="utf-8") as outfile:
    
    for line in infile:
        outfile.write(line.upper())

print("Файл перетворено!")
\`\`\`

**Приклад 2: Нумерація рядків**
\`\`\`python
with open("input.txt", "r", encoding="utf-8") as infile, \\
     open("numbered.txt", "w", encoding="utf-8") as outfile:
    
    for num, line in enumerate(infile, 1):
        outfile.write(f"{num}. {line}")

print("Рядки пронумеровано!")
\`\`\`

**Приклад 3: Видалення порожніх рядків**
\`\`\`python
with open("input.txt", "r", encoding="utf-8") as infile, \\
     open("clean.txt", "w", encoding="utf-8") as outfile:
    
    for line in infile:
        if line.strip():  # Якщо рядок не порожній
            outfile.write(line)

print("Порожні рядки видалено!")
\`\`\``
      },
      {
        title: "Пошук та фільтрація",
        content: `**Задача: Пошук у файлі**

Створимо програму для пошуку певних рядків у файлі.

\`\`\`python
# Пошук рядків з певним словом
search_word = "Python"
found = []

with open("data.txt", "r", encoding="utf-8") as file:
    for line_num, line in enumerate(file, 1):
        if search_word.lower() in line.lower():
            found.append((line_num, line.strip()))

# Виведення результатів
if found:
    print(f"\\nЗнайдено {len(found)} входжень:")
    for line_num, line in found:
        print(f"Рядок {line_num}: {line}")
else:
    print(f"Слово '{search_word}' не знайдено")
\`\`\`

**Задача: Фільтрація даних**
\`\`\`python
# Зберегти тільки рядки, що містять певне слово
keyword = "Python"

with open("input.txt", "r", encoding="utf-8") as infile, \\
     open("filtered.txt", "w", encoding="utf-8") as outfile:
    
    for line in infile:
        if keyword in line:
            outfile.write(line)

print(f"Збережено рядки з '{keyword}'")
\`\`\``
      },
      {
        title: "Створення звітів",
        content: `**Задача: Генерація звіту**

Створимо програму, яка генерує текстовий звіт.

\`\`\`python
# Дані для звіту
report_data = {
    "Дата": "2024-01-15",
    "Проект": "Система обліку",
    "Виконано завдань": 15,
    "У процесі": 8,
    "Заплановано": 12
}

# Створення звіту
with open("report.txt", "w", encoding="utf-8") as file:
    file.write("=" * 40 + "\\n")
    file.write("         ЗВІТ ПРО ВИКОНАННЯ         \\n")
    file.write("=" * 40 + "\\n\\n")
    
    for key, value in report_data.items():
        file.write(f"{key}: {value}\\n")
    
    file.write("\\n" + "=" * 40 + "\\n")
    file.write("Звіт згенеровано автоматично\\n")

print("Звіт створено: report.txt")
\`\`\`

**Результат (report.txt):**
\`\`\`
========================================
         ЗВІТ ПРО ВИКОНАННЯ         
========================================

Дата: 2024-01-15
Проект: Система обліку
Виконано завдань: 15
У процесі: 8
Заплановано: 12

========================================
Звіт згенеровано автоматично
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Статистика тексту",
      code: `# Аналіз текстового файлу
with open("text.txt", "r", encoding="utf-8") as file:
    content = file.read()
    
    print(f"Рядків: {content.count('\\n') + 1}")
    print(f"Слів: {len(content.split())}")
    print(f"Символів: {len(content)}")`,
      explanation: "Демонструє базовий аналіз текстового файлу."
    },
    {
      title: "Приклад 2: Обробка списку",
      code: `# Читання та сортування списку
names = []
with open("names.txt", "r", encoding="utf-8") as file:
    for line in file:
        name = line.strip()
        if name:
            names.append(name)

names.sort()
for name in names:
    print(name)`,
      explanation: "Показує читання списку з файлу та його обробку."
    },
    {
      title: "Приклад 3: Трансформація тексту",
      code: `# Перетворення тексту у великі літери
with open("input.txt", "r", encoding="utf-8") as infile, \\
     open("output.txt", "w", encoding="utf-8") as outfile:
    
    for line in infile:
        outfile.write(line.upper())

print("Готово!")`,
      explanation: "Демонструє трансформацію даних між файлами."
    },
    {
      title: "Приклад 4: Пошук у файлі",
      code: `# Пошук слова у файлі
search = "Python"
found = []

with open("data.txt", "r", encoding="utf-8") as file:
    for num, line in enumerate(file, 1):
        if search in line:
            found.append((num, line.strip()))

for num, line in found:
    print(f"{num}: {line}")`,
      explanation: "Показує пошук та фільтрацію даних у файлі."
    },
    {
      title: "Приклад 5: Генерація звіту",
      code: `# Створення звіту
with open("report.txt", "w", encoding="utf-8") as file:
    file.write("=== ЗВІТ ===\\n\\n")
    file.write(f"Дата: 2024-01-15\\n")
    file.write(f"Завдань виконано: 10\\n")
    file.write("\\n=============\\n")

print("Звіт створено!")`,
      explanation: "Демонструє створення структурованого звіту."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не перевіряти чи рядок порожній",
      explanation: "Порожні рядки можуть спричинити проблеми при обробці.",
      correctApproach: "Використовуй if line.strip(): для перевірки"
    },
    {
      mistake: "Забути strip() при читанні рядків",
      explanation: "Кожен рядок містить \\n в кінці, що може заважати.",
      correctApproach: "Завжди використовуй line.strip() при обробці рядків"
    },
    {
      mistake: "Відкрити файл у режимі 'w' для додавання",
      explanation: "Режим 'w' видаляє весь попередній вміст.",
      correctApproach: "Використовуй 'a' для додавання до існуючого файлу"
    },
    {
      mistake: "Не вказати encoding='utf-8'",
      explanation: "Без кодування можуть бути проблеми з кирилицею.",
      correctApproach: "Завжди вказуй encoding='utf-8' для українського тексту"
    }
  ],
  
  summary: `На цьому уроці ми застосували знання про файли на практиці:

1. **Аналіз файлів** - підрахунок рядків, слів, символів
2. **Обробка списків** - читання та сортування даних
3. **Трансформація** - перетворення текстових даних
4. **Пошук та фільтрація** - знаходження потрібної інформації
5. **Створення звітів** - генерація структурованих документів

Тепер ви вмієте створювати практичні програми для роботи з текстовими файлами!

Наступний урок - фінальний проект модуля!`,
  
  practiceTask: {
    title: "Система обліку завдань",
    description: "Створіть програму для управління списком завдань у текстовому файлі",
    problemStatement: `Напишіть програму, яка:
1. Створює файл tasks.txt
2. Записує у файл 5 завдань:
   - "Вивчити Python"
   - "Зробити домашнє завдання"
   - "Прочитати книгу"
   - "Написати код"
   - "Переглянути відео"
3. Читає завдання з файлу
4. Виводить їх з нумерацією
5. Підраховує загальну кількість завдань`,
    inputFormat: "Програма використовує фіксовані завдання",
    outputFormat: `Приклад виведення:
=== СПИСОК ЗАВДАНЬ ===
1. Вивчити Python
2. Зробити домашнє завдання
3. Прочитати книгу
4. Написати код
5. Переглянути відео

Всього завдань: 5`,
    examples: [
      {
        input: "tasks = ['Вивчити Python', 'Зробити домашнє завдання', ...]",
        output: `=== СПИСОК ЗАВДАНЬ ===
1. Вивчити Python
2. Зробити домашнє завдання
3. Прочитати книгу
4. Написати код
5. Переглянути відео

Всього завдань: 5`,
        explanation: "Програма записує завдання, читає їх та виводить з нумерацією"
      }
    ],
    solution: {
      code: `# Система обліку завдань
tasks = [
    "Вивчити Python",
    "Зробити домашнє завдання",
    "Прочитати книгу",
    "Написати код",
    "Переглянути відео"
]

# Записати завдання у файл
with open("tasks.txt", "w", encoding="utf-8") as file:
    for task in tasks:
        file.write(task + "\\n")

# Прочитати та вивести завдання
print("=== СПИСОК ЗАВДАНЬ ===")
count = 0
with open("tasks.txt", "r", encoding="utf-8") as file:
    for num, line in enumerate(file, 1):
        task = line.strip()
        if task:
            print(f"{num}. {task}")
            count += 1

print(f"\\nВсього завдань: {count}")`,
      explanation: "Рішення використовує with для роботи з файлом, enumerate для нумерації, та змінну count для підрахунку завдань."
    },
    hints: [
      "Використовуй with для безпечної роботи з файлом",
      "Використовуй enumerate(file, 1) для нумерації з 1",
      "Не забудь strip() для видалення \\n",
      "Підраховуй кількість завдань у циклі",
      "Використовуй encoding='utf-8'"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод найкраще використати для підрахунку кількості слів у файлі?",
        options: [
          "content.split()",
          "content.count(' ')",
          "len(content)",
          "content.words()"
        ],
        correctAnswer: 0,
        explanation: "split() розділяє текст на слова, потім len() підраховує їх кількість."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код, якщо файл містить 3 рядки?\n\n```python\nwith open('data.txt', 'r') as file:\n    count = 0\n    for line in file:\n        count += 1\nprint(count)\n```",
        options: [
          "3",
          "0",
          "1",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Цикл підраховує кількість рядків у файлі, результат буде 3."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо використовувати line.strip() при читанні файлу?",
        options: [
          "Щоб видалити символ нового рядка \\n",
          "Щоб перетворити у великі літери",
          "Щоб підрахувати символи",
          "Щоб закрити файл"
        ],
        correctAnswer: 0,
        explanation: "strip() видаляє пробільні символи з початку та кінця, включно з \\n."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить цей код?\n\n```python\nwith open('in.txt', 'r') as f1, open('out.txt', 'w') as f2:\n    for line in f1:\n        f2.write(line.upper())\n```",
        options: [
          "Копіює файл, перетворюючи текст у великі літери",
          "Видаляє файл",
          "Підраховує символи",
          "Виводить текст на екран"
        ],
        correctAnswer: 0,
        explanation: "Код читає файл, перетворює кожен рядок у великі літери та записує в новий файл."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як перевірити чи рядок не порожній після strip()?",
        options: [
          "if line.strip():",
          "if len(line) > 0:",
          "if line != '':",
          "if not line.empty():"
        ],
        correctAnswer: 0,
        explanation: "if line.strip(): - найкращий спосіб перевірити чи рядок не порожній після видалення пробілів."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
