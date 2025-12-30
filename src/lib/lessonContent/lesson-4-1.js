/**
 * Lesson 4-1: Читання та запис файлів
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson4_1 = {
  lessonId: "lesson-4-1",
  moduleId: "module-4",
  order: 1,
  title: "Читання та запис файлів",
  
  learningObjectives: [
    "Відкривати файли для читання/запису",
    "Використовувати контекстний менеджер (with)",
    "Працювати з різними кодуваннями",
    "Обробляти бінарні файли"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-3-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Відкриття файлів",
        content: `**Базовий спосіб (не рекомендується):**
\`\`\`python
file = open("file.txt", "r")
content = file.read()
file.close()  # Важливо закрити!
\`\`\`

**Проблема:** Якщо виникне помилка, файл може не закритися.

**Кращий спосіб — контекстний менеджер (with):**
\`\`\`python
with open("file.txt", "r") as file:
    content = file.read()
# Файл автоматично закриється
\`\`\`

**Режими відкриття:**
- \`"r"\` — читання (read)
- \`"w"\` — запис (write, перезаписує файл)
- \`"a"\` — додавання (append, додає в кінець)
- \`"x"\` — створення (створює новий файл, помилка якщо існує)
- \`"r+"\` — читання та запис
- \`"b"\` — бінарний режим (rb, wb, ab)`
      },
      {
        title: "Читання файлів",
        content: `**read()** — читає весь файл:
\`\`\`python
with open("file.txt", "r") as file:
    content = file.read()
    print(content)
\`\`\`

**readline()** — читає один рядок:
\`\`\`python
with open("file.txt", "r") as file:
    line1 = file.readline()
    line2 = file.readline()
\`\`\`

**readlines()** — читає всі рядки у список:
\`\`\`python
with open("file.txt", "r") as file:
    lines = file.readlines()
    for line in lines:
        print(line.strip())  # strip() видаляє \\n
\`\`\`

**Ітерація по файлу (найефективніше):**
\`\`\`python
with open("file.txt", "r") as file:
    for line in file:
        print(line.strip())
\`\`\``
      },
      {
        title: "Запис у файли",
        content: `**write()** — записує рядок:
\`\`\`python
with open("output.txt", "w") as file:
    file.write("Перший рядок\\n")
    file.write("Другий рядок\\n")
\`\`\`

**writelines()** — записує список рядків:
\`\`\`python
lines = ["Рядок 1\\n", "Рядок 2\\n", "Рядок 3\\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)
\`\`\`

**Додавання (append):**
\`\`\`python
with open("log.txt", "a") as file:
    file.write("Новий запис\\n")
\`\`\`

**Важливо:** Режим "w" перезаписує файл! Використовуйте "a" для додавання.`
      },
      {
        title: "Кодування файлів",
        content: `Для українського тексту важливо вказати кодування:

\`\`\`python
# UTF-8 (рекомендовано)
with open("file.txt", "r", encoding="utf-8") as file:
    content = file.read()

# Запис з кодуванням
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Привіт, світ!")
\`\`\`

**Поширені кодування:**
- \`utf-8\` — універсальне, підтримує всі мови
- \`cp1251\` — Windows Cyrillic
- \`latin-1\` — для західних мов

**Рекомендація:** Завжди використовуйте \`encoding="utf-8"\` для нових файлів!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Читання файлу",
      code: `# Створюємо тестовий файл
with open("test.txt", "w", encoding="utf-8") as file:
    file.write("Перший рядок\\n")
    file.write("Другий рядок\\n")
    file.write("Третій рядок\\n")

# Читаємо файл
with open("test.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)

# Читаємо по рядках
with open("test.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())`,
      explanation: "Демонструє створення та читання файлу з використанням with."
    },
    {
      title: "Приклад 2: Запис у файл",
      code: `# Запис у новий файл
students = ["Олександр", "Марія", "Дмитро"]

with open("students.txt", "w", encoding="utf-8") as file:
    for student in students:
        file.write(f"{student}\\n")

# Додавання до файлу
with open("students.txt", "a", encoding="utf-8") as file:
    file.write("Анна\\n")`,
      explanation: "Показує запис та додавання даних у файл."
    },
    {
      title: "Приклад 3: Обробка файлу",
      code: `# Читання, обробка та запис
with open("input.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

# Обробка (наприклад, перетворення в верхній регістр)
processed = [line.upper() for line in lines]

# Запис оброблених даних
with open("output.txt", "w", encoding="utf-8") as file:
    file.writelines(processed)`,
      explanation: "Демонструє повний цикл: читання, обробка, запис."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути закрити файл",
      explanation: "Якщо не закрити файл, він може залишитися заблокованим.",
      correctApproach: "Завжди використовуйте with open() — файл закриється автоматично."
    },
    {
      mistake: "Не вказати кодування для українського тексту",
      explanation: "Може призвести до помилок кодування (кракозябри).",
      correctApproach: "Завжди вказуйте encoding='utf-8' для файлів з текстом."
    },
    {
      mistake: "Використання 'w' замість 'a' для додавання",
      explanation: "'w' перезаписує файл, втрачаючи попередні дані.",
      correctApproach: "Використовуйте 'a' для додавання, 'w' тільки для нового файлу."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Відкриття файлів** — open() з різними режимами
2. **Контекстний менеджер** — with open() автоматично закриває файл
3. **Читання** — read(), readline(), readlines(), ітерація
4. **Запис** — write(), writelines()
5. **Кодування** — encoding="utf-8" для українського тексту

Робота з файлами — основа багатьох програм!`,
  
  practiceTask: {
    title: "Обробка текстового файлу",
    description: "Створіть програму для обробки текстового файлу",
    problemStatement: `Напишіть програму, яка:
1. Створює файл зі списком імен студентів
2. Читає файл та виводить всі імена
3. Додає нових студентів у файл
4. Підраховує кількість студентів
5. Створює новий файл з іменами у верхньому регістрі`,
    inputFormat: "Програма працює з файлами students.txt та students_upper.txt",
    outputFormat: `Приклад виведення:
Студенти:
1. Олександр
2. Марія
3. Дмитро
Всього студентів: 3`,
    examples: [
      {
        input: "Створення файлу з іменами",
        output: "Файл створено та оброблено",
        explanation: "Програма створює, читає та обробляє файли"
      }
    ],
    solution: {
      code: `# Створення файлу
students = ["Олександр", "Марія", "Дмитро"]
with open("students.txt", "w", encoding="utf-8") as file:
    for student in students:
        file.write(f"{student}\\n")

# Читання та виведення
print("Студенти:")
with open("students.txt", "r", encoding="utf-8") as file:
    for i, line in enumerate(file, 1):
        print(f"{i}. {line.strip()}")

# Підрахунок
with open("students.txt", "r", encoding="utf-8") as file:
    count = sum(1 for line in file)
    print(f"Всього студентів: {count}")

# Додавання нового студента
with open("students.txt", "a", encoding="utf-8") as file:
    file.write("Анна\\n")

# Створення файлу з верхнім регістром
with open("students.txt", "r", encoding="utf-8") as input_file:
    with open("students_upper.txt", "w", encoding="utf-8") as output_file:
        for line in input_file:
            output_file.write(line.upper())`,
      explanation: "Рішення демонструє повний цикл роботи з файлами: створення, читання, додавання, обробка."
    },
    hints: [
      "Використовуйте 'w' для створення, 'r' для читання, 'a' для додавання",
      "Не забудьте encoding='utf-8'",
      "Використовуйте enumerate() для нумерації"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який режим відкриття файлу додає дані в кінець?",
        options: ["'r'", "'w'", "'a'", "'x'"],
        correctAnswer: 2,
        explanation: "'a' (append) додає дані в кінець файлу, не перезаписуючи його."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться, якщо використати 'w' для існуючого файлу?",
        options: ["Додасть дані", "Перезапише файл", "Викличе помилку", "Нічого"],
        correctAnswer: 1,
        explanation: "'w' (write) перезаписує файл, втрачаючи попередні дані."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому краще використовувати 'with open()'?",
        options: ["Швидше", "Автоматично закриває файл", "Менше коду", "Всі вище"],
        correctAnswer: 1,
        explanation: "with open() автоматично закриває файл навіть якщо виникне помилка."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
