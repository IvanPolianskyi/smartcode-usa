/**
 * Lesson 05-3: Робота з CSV та TXT
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_3 = {
  lessonId: "lesson-05-3",
  moduleId: "module-05",
  order: 3,
  title: "Робота з CSV та TXT",
  
  learningObjectives: [
    "Читати та записувати CSV файли",
    "Працювати з TXT файлами",
    "Обробляти структуровані дані",
    "Використовувати csv модуль",
    "Розуміти різницю між CSV та TXT"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-05-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке CSV?",
        content: `**CSV (Comma-Separated Values)** - це формат файлів для зберігання табличних даних.

**Структура CSV:**
- Кожен рядок = один запис
- Значення розділені комами (або іншими роздільниками)
- Перший рядок часто містить заголовки

**Приклад CSV файлу (students.csv):**
\`\`\`
Ім'я,Вік,Оцінка
Іван,15,85
Марія,16,92
Петро,15,78
\`\`\`

**Переваги CSV:**
- ✅ Простий формат
- ✅ Легко читати та редагувати
- ✅ Підтримується багатьма програмами (Excel, Google Sheets)
- ✅ Компактний розмір`
      },
      {
        title: "Читання CSV з csv модулем",
        content: `**csv модуль** - стандартний модуль Python для роботи з CSV.

**Встановлення:** Не потрібно встановлювати, входить у стандартну бібліотеку!

**Базове читання:**
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
\`\`\`

**Виведення:**
\`\`\`
['Ім\\'я', 'Вік', 'Оцінка']
['Іван', '15', '85']
['Марія', '16', '92']
['Петро', '15', '78']
\`\`\`

**Читання як словник (з DictReader):**
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Ім\\'я']}: {row['Оцінка']}")
\`\`\`

**Виведення:**
\`\`\`
Іван: 85
Марія: 92
Петро: 78
\`\`\``
      },
      {
        title: "Запис у CSV",
        content: `**Запис даних у CSV:**

**Базовий запис:**
\`\`\`python
import csv

data = [
    ["Ім'я", "Вік", "Оцінка"],
    ["Іван", 15, 85],
    ["Марія", 16, 92],
    ["Петро", 15, 78]
]

with open("output.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)
\`\`\`

**Запис як словник (з DictWriter):**
\`\`\`python
import csv

data = [
    {"Ім'я": "Іван", "Вік": 15, "Оцінка": 85},
    {"Ім'я": "Марія", "Вік": 16, "Оцінка": 92},
    {"Ім'я": "Петро", "Вік": 15, "Оцінка": 78}
]

with open("output.csv", "w", encoding="utf-8", newline="") as file:
    fieldnames = ["Ім'я", "Вік", "Оцінка"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()  # Записує заголовки
    writer.writerows(data)
\`\`\`

**Важливо:** Використовуй \`newline=""\` при відкритті для запису, щоб уникнути порожніх рядків!`
      },
      {
        title: "Робота з TXT файлами",
        content: `**TXT файли** - прості текстові файли без структури.

**Читання TXT:**
\`\`\`python
with open("notes.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
\`\`\`

**Читання по рядках:**
\`\`\`python
with open("notes.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())  # strip() видаляє \\n
\`\`\`

**Запис у TXT:**
\`\`\`python
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Перший рядок\\n")
    file.write("Другий рядок\\n")
\`\`\`

**Різниця CSV vs TXT:**
- **CSV** - структуровані дані (таблиця)
- **TXT** - неструктуровані дані (просто текст)`
      },
      {
        title: "Обробка структурованих даних",
        content: `**Приклад: Обробка CSV даних**

\`\`\`python
import csv

# Читаємо дані
students = []
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        students.append({
            "ім'я": row["Ім'я"],
            "вік": int(row["Вік"]),
            "оцінка": int(row["Оцінка"])
        })

# Обробляємо дані
high_scores = [s for s in students if s["оцінка"] >= 90]
print(f"Студенти з високими оцінками: {len(high_scores)}")

# Записуємо результат
with open("high_scores.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["ім'я", "вік", "оцінка"])
    writer.writeheader()
    writer.writerows(high_scores)
\`\`\`

**Корисні методи:**
- \`csv.reader()\` - читає CSV як списки
- \`csv.DictReader()\` - читає CSV як словники
- \`csv.writer()\` - записує списки у CSV
- \`csv.DictWriter()\` - записує словники у CSV`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Читання CSV",
      code: `# Читання CSV файлу
import csv

with open("data.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)`,
      explanation: "Демонструє базове читання CSV файлу за допомогою csv.reader()."
    },
    {
      title: "Приклад 2: Читання як словник",
      code: `# Читання CSV як словник
import csv

with open("data.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Ім\\'я']}: {row['Оцінка']}")`,
      explanation: "Показує читання CSV з DictReader для доступу до даних за назвами колонок."
    },
    {
      title: "Приклад 3: Запис у CSV",
      code: `# Запис даних у CSV
import csv

data = [["Ім'я", "Вік"], ["Іван", 15], ["Марія", 16]]
with open("output.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)`,
      explanation: "Демонструє запис даних у CSV файл."
    },
    {
      title: "Приклад 4: Робота з TXT",
      code: `# Читання та запис TXT
with open("notes.txt", "r", encoding="utf-8") as file:
    content = file.read()

with open("copy.txt", "w", encoding="utf-8") as file:
    file.write(content.upper())`,
      explanation: "Показує роботу з простими текстовими файлами."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути newline='' при записі CSV",
      explanation: "Без newline='' можуть з'явитися порожні рядки між записами.",
      correctApproach: "Завжди використовуй newline='' при відкритті CSV для запису"
    },
    {
      mistake: "Не вказати encoding для українського тексту",
      explanation: "Без encoding='utf-8' можуть бути проблеми з кирилицею в CSV.",
      correctApproach: "Завжди вказуй encoding='utf-8' для CSV з українським текстом"
    },
    {
      mistake: "Сплутати CSV та TXT",
      explanation: "CSV - структуровані дані (таблиця), TXT - неструктуровані (текст).",
      correctApproach: "Використовуй CSV для таблиць, TXT для простого тексту"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **CSV формат** - структуровані табличні дані
2. **csv модуль** - стандартний модуль для роботи з CSV
3. **Читання CSV** - csv.reader() та csv.DictReader()
4. **Запис у CSV** - csv.writer() та csv.DictWriter()
5. **Робота з TXT** - прості текстові файли
6. **Обробка даних** - читання, обробка та запис структурованих даних

Тепер ви вмієте працювати з CSV та TXT файлами для зберігання та обробки даних!

Наступний урок - обробка помилок з try/except!`,
  
  practiceTask: {
    title: "Система обліку студентів",
    description: "Створіть програму для обліку студентів у CSV файлі",
    problemStatement: `Напишіть програму, яка:
1. Створює CSV файл students.csv з заголовками: Ім'я, Вік, Оцінка
2. Записує у файл 3 студентів:
   - Іван, 15, 85
   - Марія, 16, 92
   - Петро, 15, 78
3. Читає дані з файлу
4. Виводить інформацію про кожного студента`,
    inputFormat: "Програма використовує фіксовані дані студентів",
    outputFormat: `Приклад виведення:
Іван, 15 років, оцінка 85
Марія, 16 років, оцінка 92
Петро, 15 років, оцінка 78`,
    examples: [
      {
        input: "students = [['Ім\\'я', 'Вік', 'Оцінка'], ['Іван', '15', '85'], ['Марія', '16', '92'], ['Петро', '15', '78']]",
        output: `Іван, 15 років, оцінка 85
Марія, 16 років, оцінка 92
Петро, 15 років, оцінка 78`,
        explanation: "Програма створює CSV файл, записує дані, потім читає та виводить їх"
      }
    ],
    solution: {
      code: `# Система обліку студентів
import csv

# Запис даних у CSV
students_data = [
    ["Ім'я", "Вік", "Оцінка"],
    ["Іван", "15", "85"],
    ["Марія", "16", "92"],
    ["Петро", "15", "78"]
]

with open("students.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(students_data)

# Читання даних з CSV
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Ім\\'я']}, {row['Вік']} років, оцінка {row['Оцінка']}")`,
      explanation: "Рішення використовує csv.writer() для запису та csv.DictReader() для читання даних з CSV файлу."
    },
    hints: [
      "Використовуйте import csv",
      "Використовуйте csv.writer() для запису",
      "Використовуйте csv.DictReader() для читання",
      "Не забудьте newline='' при записі",
      "Використовуйте encoding='utf-8' для українського тексту"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає CSV?",
        options: [
          "Comma-Separated Values",
          "Computer System Variables",
          "Code Source Version",
          "Common System Values"
        ],
        correctAnswer: 0,
        explanation: "CSV означає Comma-Separated Values - значення, розділені комами."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який модуль використовується для роботи з CSV в Python?",
        options: [
          "csv",
          "pandas",
          "excel",
          "table"
        ],
        correctAnswer: 0,
        explanation: "csv - стандартний модуль Python для роботи з CSV файлами."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що зробить цей код?\n\n```python\nimport csv\nwith open('data.csv', 'w', newline='') as file:\n    writer = csv.writer(file)\n    writer.writerow(['A', 'B', 'C'])\n```",
        options: [
          "Створить CSV файл з одним рядком 'A,B,C'",
          "Прочитає CSV файл",
          "Додасть рядок до CSV",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Код створює CSV файл та записує один рядок з трьома значеннями."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому потрібен newline='' при записі CSV?",
        options: [
          "Щоб уникнути порожніх рядків",
          "Щоб швидше працювало",
          "Щоб підтримувати кирилицю",
          "Не потрібен"
        ],
        correctAnswer: 0,
        explanation: "newline='' потрібен щоб уникнути порожніх рядків між записами в CSV."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка різниця між csv.reader() та csv.DictReader()?",
        options: [
          "DictReader повертає словники, reader - списки",
          "Немає різниці",
          "reader швидший",
          "DictReader не підтримує заголовки"
        ],
        correctAnswer: 0,
        explanation: "csv.reader() повертає рядки як списки, csv.DictReader() - як словники з ключами з заголовків."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
