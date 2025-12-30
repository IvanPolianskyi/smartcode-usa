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
        content: `**Функція open():**
\`\`\`python
file = open("file.txt", "r")  # Відкрити для читання
content = file.read()
file.close()  # Важливо закрити файл!
\`\`\`

**Режими відкриття:**
- \`"r"\` — читання (read)
- \`"w"` — запис (write, перезаписує файл)
- \`"a"` — додавання (append, додає в кінець)
- \`"x"` — створення (створює новий файл, помилка якщо існує)
- \`"r+"` — читання та запис
- \`"b"` — бінарний режим (rb, wb)

**Контекстний менеджер (with):**
\`\`\`python
with open("file.txt", "r") as file:
    content = file.read()
# Файл автоматично закривається
\`\`\`

**Переваги with:**
- Автоматичне закриття файлу
- Обробка помилок
- Чистіший код`
      },
      {
        title: "Читання файлів",
        content: `**Різні способи читання:**
\`\`\`python
# read() — читає весь файл
with open("file.txt", "r") as file:
    content = file.read()
    print(content)

# readline() — читає один рядок
with open("file.txt", "r") as file:
    line = file.readline()
    print(line)

# readlines() — читає всі рядки в список
with open("file.txt", "r") as file:
    lines = file.readlines()
    for line in lines:
        print(line.strip())  # strip() видаляє \\n

# Ітерація по файлу (найефективніше)
with open("file.txt", "r") as file:
    for line in file:
        print(line.strip())
\`\`\``
      },
      {
        title: "Запис у файли",
        content: `**Запис у файл:**
\`\`\`python
# write() — записує рядок
with open("output.txt", "w") as file:
    file.write("Перший рядок\\n")
    file.write("Другий рядок\\n")

# writelines() — записує список рядків
lines = ["Рядок 1\\n", "Рядок 2\\n", "Рядок 3\\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)

# Додавання (append)
with open("output.txt", "a") as file:
    file.write("Новий рядок\\n")
\`\`\`

**Важливо:** Режим "w" перезаписує файл! Використовуйте "a" для додавання.`
      },
      {
        title: "Кодування файлів",
        content: `Python за замовчуванням використовує UTF-8, але можна вказати інше:

\`\`\`python
# UTF-8 (за замовчуванням)
with open("file.txt", "r", encoding="utf-8") as file:
    content = file.read()

# Windows-1251 (для кирилиці в старих файлах)
with open("file.txt", "r", encoding="windows-1251") as file:
    content = file.read()

# Запис з кодуванням
with open("file.txt", "w", encoding="utf-8") as file:
    file.write("Привіт, світ!")
\`\`\`

**Помилки кодування:**
Якщо кодування неправильне, виникне UnicodeDecodeError. Спробуйте різні кодування або обробляйте помилки.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Читання файлу",
      code: `# Читання всього файлу
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)

# Читання по рядках
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())`,
      explanation: "Демонструє різні способи читання файлів."
    },
    {
      title: "Приклад 2: Запис у файл",
      code: `# Запис у файл
data = ["Рядок 1", "Рядок 2", "Рядок 3"]

with open("output.txt", "w", encoding="utf-8") as file:
    for line in data:
        file.write(line + "\\n")

# Додавання
with open("output.txt", "a", encoding="utf-8") as file:
    file.write("Новий рядок\\n")`,
      explanation: "Показує запис та додавання даних у файл."
    },
    {
      title: "Приклад 3: Копіювання файлу",
      code: `# Копіювання файлу
with open("source.txt", "r", encoding="utf-8") as source:
    with open("copy.txt", "w", encoding="utf-8") as destination:
        for line in source:
            destination.write(line)`,
      explanation: "Демонструє копіювання файлу рядок за рядком."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути закрити файл",
      explanation: "Якщо не закрити файл, він може залишитися відкритим, що призведе до проблем.",
      correctApproach: "Завжди використовуйте with open() — файл закриється автоматично."
    },
    {
      mistake: "Використання 'w' замість 'a'",
      explanation: "Режим 'w' перезаписує файл, втрачаючи старі дані.",
      correctApproach: "Використовуйте 'a' для додавання, 'w' тільки коли потрібно перезаписати."
    },
    {
      mistake: "Не вказувати кодування для кирилиці",
      explanation: "Без правильного кодування кирилиця може відображатися неправильно.",
      correctApproach: "Завжди вказуйте encoding='utf-8' для файлів з кирилицею."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Відкриття файлів** — open() з різними режимами
2. **Контекстний менеджер** — with open() (рекомендовано)
3. **Читання** — read(), readline(), readlines(), ітерація
4. **Запис** — write(), writelines()
5. **Кодування** — encoding параметр для правильного відображення

Робота з файлами — це основа збереження даних!`,
  
  practiceTask: {
    title: "Система логування",
    description: "Створіть програму для запису логів у файл",
    problemStatement: `Напишіть програму, яка:
1. Записує події у файл log.txt
2. Додає час кожної події
3. Може читати та виводити всі логи
4. Може очищати файл логів
5. Форматує логи у читабельному вигляді`,
    inputFormat: "Користувач вводить події через input()",
    outputFormat: `Приклад файлу log.txt:
[2025-01-27 10:30:15] Програма запущена
[2025-01-27 10:30:20] Користувач увійшов
[2025-01-27 10:30:25] Виконано операцію`,
    examples: [
      {
        input: "Подія: 'Програма запущена'",
        output: "Записано в лог",
        explanation: "Програма додає подію з часом у файл"
      }
    ],
    solution: {
      code: `from datetime import datetime

def write_log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] {message}\\n"
    
    with open("log.txt", "a", encoding="utf-8") as file:
        file.write(log_entry)
    print("Записано в лог")

def read_logs():
    try:
        with open("log.txt", "r", encoding="utf-8") as file:
            logs = file.readlines()
            if logs:
                print("\\n=== Логи ===")
                for log in logs:
                    print(log.strip())
            else:
                print("Логів немає")
    except FileNotFoundError:
        print("Файл логів не знайдено")

def clear_logs():
    with open("log.txt", "w", encoding="utf-8") as file:
        file.write("")
    print("Логи очищено")

# Використання
write_log("Програма запущена")
write_log("Користувач увійшов")
read_logs()`,
      explanation: "Рішення демонструє запис, читання та очищення файлу логів."
    },
    hints: [
      "Використовуйте datetime.now() для отримання поточного часу",
      "Використовуйте режим 'a' для додавання логів",
      "Використовуйте try/except для обробки FileNotFoundError"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який режим відкриває файл для запису (перезаписує)?",
        options: ["'r'", "'w'", "'a'", "'x'"],
        correctAnswer: 1,
        explanation: "'w' відкриває файл для запису та перезаписує його, якщо він існує."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить цей код?\n\n```python\nwith open('file.txt', 'r') as f:\n    lines = f.readlines()\n```",
        options: ["Читає один рядок", "Читає всі рядки в список", "Записує у файл", "Помилку"],
        correctAnswer: 1,
        explanation: "readlines() читає всі рядки файлу та повертає їх у вигляді списку."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому краще використовувати 'with open()'?",
        options: ["Швидше", "Автоматично закриває файл", "Менше пам'яті", "Більше функцій"],
        correctAnswer: 1,
        explanation: "with open() автоматично закриває файл навіть при помилках, що важливо."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

