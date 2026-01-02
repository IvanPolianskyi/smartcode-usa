/**
 * Lesson 05-1: Робота з файлами: open, read, write
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_1 = {
  lessonId: "lesson-05-1",
  moduleId: "module-05",
  order: 1,
  title: "Робота з файлами: open, read, write",
  
  learningObjectives: [
    "Відкривати файли для читання та запису",
    "Читати дані з файлів",
    "Записувати дані у файли",
    "Працювати з різними режимами відкриття файлів",
    "Розуміти кодування файлів"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-03-10"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке файли?",
        content: `**Файли** - це спосіб зберігання даних на диску комп'ютера. Python дозволяє читати та записувати дані у файли.

**Навіщо потрібні файли?**
- ✅ Зберігати дані між запусками програми
- ✅ Обмінюватися даними між програмами
- ✅ Зберігати великі обсяги даних
- ✅ Створювати звіти та лог-файли

**Типи файлів:**
- **Текстові файли** (.txt, .py, .csv) - читабельні для людини
- **Бінарні файли** (.jpg, .png, .exe) - містять двійкові дані

**Основні операції:**
1. **Відкрити файл** - підготувати файл для роботи
2. **Читати** - отримати дані з файлу
3. **Записувати** - зберегти дані у файл
4. **Закрити файл** - завершити роботу з файлом`
      },
      {
        title: "Функція open()",
        content: `**open()** - функція для відкриття файлів в Python.

**Синтаксис:**
\`\`\`python
file = open("назва_файлу.txt", "режим")
\`\`\`

**Режими відкриття:**
- \`"r"\` - **read** (читання) - тільки читання, файл має існувати
- \`"w"\` - **write** (запис) - запис, створює новий файл або перезаписує існуючий
- \`"a"\` - **append** (додавання) - додавання в кінець файлу
- \`"x"\` - **exclusive** - створює новий файл, помилка якщо файл існує
- \`"r+"\` - читання та запис
- \`"b"\` - бінарний режим (додається до інших: "rb", "wb")

**Приклад:**
\`\`\`python
# Відкрити файл для читання
file = open("data.txt", "r")

# Відкрити файл для запису
file = open("output.txt", "w")

# Відкрити файл для додавання
file = open("log.txt", "a")
\`\`\`

**Важливо:**
- Після роботи з файлом його потрібно закрити: \`file.close()\`
- Якщо забути закрити файл, можуть бути проблеми`
      },
      {
        title: "Читання з файлу",
        content: `**Методи для читання:**

**1. read()** - читає весь файл:
\`\`\`python
file = open("data.txt", "r")
content = file.read()
print(content)
file.close()
\`\`\`

**2. readline()** - читає один рядок:
\`\`\`python
file = open("data.txt", "r")
line = file.readline()
print(line)
file.close()
\`\`\`

**3. readlines()** - читає всі рядки у список:
\`\`\`python
file = open("data.txt", "r")
lines = file.readlines()
for line in lines:
    print(line)
file.close()
\`\`\`

**4. Ітерація по файлу** (найкращий спосіб):
\`\`\`python
file = open("data.txt", "r")
for line in file:
    print(line.strip())  # strip() видаляє \\n
file.close()
\`\`\`

**Приклад файлу data.txt:**
\`\`\`
Привіт
Світ
Python
\`\`\`

**Виведення:**
\`\`\`
Привіт
Світ
Python
\`\`\``
      },
      {
        title: "Запис у файл",
        content: `**Методи для запису:**

**1. write()** - записує рядок:
\`\`\`python
file = open("output.txt", "w")
file.write("Привіт, світ!")
file.write("\\n")  # новий рядок
file.write("Це другий рядок")
file.close()
\`\`\`

**2. writelines()** - записує список рядків:
\`\`\`python
lines = ["Рядок 1\\n", "Рядок 2\\n", "Рядок 3\\n"]
file = open("output.txt", "w")
file.writelines(lines)
file.close()
\`\`\`

**Режими запису:**
- \`"w"\` - **перезаписує** весь файл (видаляє старий вміст)
- \`"a"\` - **додає** в кінець файлу (зберігає старий вміст)

**Приклад:**
\`\`\`python
# Записати дані
file = open("students.txt", "w")
file.write("Іван\\n")
file.write("Марія\\n")
file.write("Петро\\n")
file.close()

# Додати ще дані
file = open("students.txt", "a")
file.write("Олена\\n")
file.close()
\`\`\`

**Результат у students.txt:**
\`\`\`
Іван
Марія
Петро
Олена
\`\`\``
      },
      {
        title: "Кодування файлів",
        content: `**Кодування** - це спосіб представлення символів у файлі.

**Основні кодування:**
- \`"utf-8"\` - стандартне кодування (підтримує українські літери)
- \`"cp1251"\` - Windows кодування
- \`"ascii"\` - тільки англійські символи

**Вказування кодування:**
\`\`\`python
# Відкрити з кодуванням
file = open("data.txt", "r", encoding="utf-8")
content = file.read()
file.close()

# Записати з кодуванням
file = open("output.txt", "w", encoding="utf-8")
file.write("Привіт, світ! 🇺🇦")
file.close()
\`\`\`

**Важливо:**
- Завжди вказуй \`encoding="utf-8"\` для українського тексту
- Без кодування можуть бути проблеми з кирилицею

**Приклад помилки:**
\`\`\`python
# Без кодування - може бути помилка
file = open("data.txt", "r")
# UnicodeDecodeError якщо файл не в ASCII
\`\`\`

**Правильно:**
\`\`\`python
file = open("data.txt", "r", encoding="utf-8")
\`\`\``
      },
      {
        title: "Закриття файлів",
        content: `**Чому важливо закривати файли?**

1. **Звільнення ресурсів** - файл займає пам'ять
2. **Збереження даних** - дані можуть не зберегтися
3. **Доступ інших програм** - інші програми не можуть відкрити файл

**Спосіб 1: file.close()**
\`\`\`python
file = open("data.txt", "r")
content = file.read()
file.close()  # Важливо!
\`\`\`

**Спосіб 2: try/finally** (завжди закриває):
\`\`\`python
file = open("data.txt", "r")
try:
    content = file.read()
finally:
    file.close()  # Завжди виконається
\`\`\`

**Спосіб 3: with statement** (найкращий):
\`\`\`python
with open("data.txt", "r") as file:
    content = file.read()
# Файл автоматично закривається тут
\`\`\`

**Рекомендація:** Завжди використовуй \`with\` - це найбезпечніший спосіб!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Читання файлу",
      code: `# Читання всього файлу
file = open("data.txt", "r", encoding="utf-8")
content = file.read()
print(content)
file.close()`,
      explanation: "Демонструє базове читання файлу за допомогою read()."
    },
    {
      title: "Приклад 2: Читання по рядках",
      code: `# Читання по одному рядку
file = open("data.txt", "r", encoding="utf-8")
for line in file:
    print(line.strip())  # strip() видаляє \\n
file.close()`,
      explanation: "Показує як читати файл по рядках за допомогою циклу for."
    },
    {
      title: "Приклад 3: Запис у файл",
      code: `# Запис даних у файл
file = open("output.txt", "w", encoding="utf-8")
file.write("Привіт, світ!\\n")
file.write("Це другий рядок\\n")
file.close()`,
      explanation: "Демонструє запис даних у файл за допомогою write()."
    },
    {
      title: "Приклад 4: Додавання в кінець",
      code: `# Додати дані в кінець файлу
file = open("log.txt", "a", encoding="utf-8")
file.write("Новий запис\\n")
file.close()`,
      explanation: "Показує використання режиму 'a' для додавання даних."
    },
    {
      title: "Приклад 5: with statement",
      code: `# Автоматичне закриття файлу
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
# Файл автоматично закритий`,
      explanation: "Демонструє найбезпечніший спосіб роботи з файлами через with."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути закрити файл",
      explanation: "Якщо не закрити файл, він залишається відкритим і займає ресурси.",
      correctApproach: "Завжди використовуй with statement або file.close()"
    },
    {
      mistake: "Не вказати кодування для українського тексту",
      explanation: "Без encoding='utf-8' можуть бути проблеми з кирилицею.",
      correctApproach: "Завжди вказуй encoding='utf-8' для текстових файлів"
    },
    {
      mistake: "Сплутати режими 'w' та 'a'",
      explanation: "'w' перезаписує файл, 'a' додає в кінець.",
      correctApproach: "Використовуй 'w' для нового файлу, 'a' для додавання"
    },
    {
      mistake: "Спробувати записати в файл, відкритий для читання",
      explanation: "Якщо файл відкритий в режимі 'r', не можна писати.",
      correctApproach: "Використовуй 'w' або 'a' для запису, 'r+' для читання та запису"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Функція open()** - відкриття файлів з різними режимами
2. **Читання файлів** - read(), readline(), readlines(), ітерація
3. **Запис у файли** - write(), writelines()
4. **Режими відкриття** - 'r', 'w', 'a', 'x', 'r+'
5. **Кодування файлів** - encoding='utf-8' для українського тексту
6. **Закриття файлів** - file.close() або with statement

Тепер ви вмієте працювати з файлами для збереження та читання даних!

Наступний урок - контекстний менеджер with для безпечної роботи з файлами!`,
  
  practiceTask: {
    title: "Система збереження нотаток",
    description: "Створіть програму для збереження та читання нотаток у файл",
    problemStatement: `Напишіть програму, яка:
1. Створює файл notes.txt
2. Записує у файл три нотатки:
   - "Перша нотатка: Вивчаю Python"
   - "Друга нотатка: Працюю з файлами"
   - "Третя нотатка: Це цікаво!"
3. Читає всі нотатки з файлу
4. Виводить їх на екран`,
    inputFormat: "Програма використовує фіксовані нотатки",
    outputFormat: `Приклад виведення:
Перша нотатка: Вивчаю Python
Друга нотатка: Працюю з файлами
Третя нотатка: Це цікаво!`,
    examples: [
      {
        input: "notes = ['Перша нотатка: Вивчаю Python', 'Друга нотатка: Працюю з файлами', 'Третя нотатка: Це цікаво!']",
        output: `Перша нотатка: Вивчаю Python
Друга нотатка: Працюю з файлами
Третя нотатка: Це цікаво!`,
        explanation: "Програма записує нотатки у файл, потім читає та виводить їх"
      }
    ],
    solution: {
      code: `# Система збереження нотаток
notes = [
    "Перша нотатка: Вивчаю Python",
    "Друга нотатка: Працюю з файлами",
    "Третя нотатка: Це цікаво!"
]

# Записати нотатки у файл
file = open("notes.txt", "w", encoding="utf-8")
for note in notes:
    file.write(note + "\\n")
file.close()

# Прочитати нотатки з файлу
file = open("notes.txt", "r", encoding="utf-8")
for line in file:
    print(line.strip())
file.close()`,
      explanation: "Рішення використовує цикл for для запису нотаток у файл, потім читає їх по рядках та виводить."
    },
    hints: [
      "Використовуйте open() з режимом 'w' для запису",
      "Використовуйте цикл for для запису кожної нотатки",
      "Не забудьте додати '\\n' для нового рядка",
      "Використовуйте encoding='utf-8' для українського тексту",
      "Після запису закрийте файл, потім відкрийте для читання"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який режим відкриття файлу використовується для читання?",
        options: [
          "'r'",
          "'w'",
          "'a'",
          "'x'"
        ],
        correctAnswer: 0,
        explanation: "Режим 'r' (read) використовується для читання файлу."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що зробить цей код?\n\n```python\nfile = open('data.txt', 'w')\nfile.write('Привіт')\nfile.close()\n```",
        options: [
          "Створить файл data.txt з текстом 'Привіт'",
          "Прочитає файл data.txt",
          "Додасть 'Привіт' в кінець файлу",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Код відкриває файл в режимі 'w' (write) та записує 'Привіт', створюючи або перезаписуючи файл."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яке кодування потрібно використовувати для українського тексту?",
        options: [
          "ascii",
          "utf-8",
          "cp1251",
          "Будь-яке"
        ],
        correctAnswer: 1,
        explanation: "utf-8 - стандартне кодування, яке підтримує всі символи включаючи українські літери."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код, якщо файл data.txt містить 'Привіт\\nСвіт'?\n\n```python\nfile = open('data.txt', 'r')\ncontent = file.read()\nprint(content)\nfile.close()\n```",
        options: [
          "Привіт\\nСвіт",
          "Привіт Світ",
          "Привіт",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "read() читає весь файл разом з символами нового рядка \\n."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо закривати файли?",
        options: [
          "Щоб звільнити ресурси",
          "Щоб зберегти дані",
          "Щоб дозволити іншим програмам відкрити файл",
          "Всі варіанти правильні"
        ],
        correctAnswer: 3,
        explanation: "Всі причини важливі - закриття файлу звільняє ресурси, зберігає дані та дозволяє іншим програмам працювати з файлом."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
