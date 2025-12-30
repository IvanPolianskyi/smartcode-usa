/**
 * Lesson 4-4: CSV файли та табличні дані
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson4_4 = {
  lessonId: "lesson-4-4",
  moduleId: "module-4",
  order: 4,
  title: "CSV файли та табличні дані",
  
  learningObjectives: [
    "Розуміти формат CSV",
    "Читати та записувати CSV файли",
    "Використовувати модуль csv",
    "Обробляти табличні дані"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-4-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке CSV?",
        content: `CSV (Comma-Separated Values) — формат для зберігання табличних даних.

**Структура CSV:**
\`\`\`csv
Ім'я,Вік,Місто,Курс
Олександр,15,Київ,Python
Марія,16,Львів,Python
Дмитро,15,Одеса,Web Development
\`\`\`

**Переваги CSV:**
- Простий формат
- Легко читається Excel/Google Sheets
- Компактний
- Універсальний

**Недоліки:**
- Немає типів даних (все рядки)
- Складніше з вкладеними структурами`
      },
      {
        title: "Робота з CSV (вручну)",
        content: `**Читання CSV вручну:**
\`\`\`python
with open("students.csv", "r", encoding="utf-8") as file:
    lines = file.readlines()
    for line in lines:
        parts = line.strip().split(",")
        print(parts)
\`\`\`

**Проблеми:**
- Що якщо в даних є коми?
- Що якщо є переноси рядків?
- Як обробити лапки?

**Рішення:** Використовувати модуль \`csv\`!`
      },
      {
        title: "Модуль csv",
        content: `**Імпорт:**
\`\`\`python
import csv
\`\`\`

**Читання CSV (reader):**
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    header = next(reader)  # Перший рядок — заголовки
    for row in reader:
        print(row)  # row — список значень
\`\`\`

**Читання як словник (DictReader):**
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["Ім'я"])  # Доступ по назві колонки
        print(row["Вік"])
\`\`\`

**Запис CSV (writer):**
\`\`\`python
import csv

data = [
    ["Ім'я", "Вік", "Місто"],
    ["Олександр", "15", "Київ"],
    ["Марія", "16", "Львів"]
]

with open("output.csv", "w", encoding="utf-8", newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)
\`\`\`

**Запис як словник (DictWriter):**
\`\`\`python
import csv

students = [
    {"Ім'я": "Олександр", "Вік": "15", "Місто": "Київ"},
    {"Ім'я": "Марія", "Вік": "16", "Місто": "Львів"}
]

with open("output.csv", "w", encoding="utf-8", newline='') as file:
    fieldnames = ["Ім'я", "Вік", "Місто"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()  # Запис заголовків
    writer.writerows(students)
\`\`\``
      },
      {
        title: "Обробка даних",
        content: `**Фільтрація:**
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    python_students = [row for row in reader if row["Курс"] == "Python"]
    for student in python_students:
        print(student["Ім'я"])
\`\`\`

**Обчислення:**
\`\`\`python
import csv

total_age = 0
count = 0

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        total_age += int(row["Вік"])
        count += 1

average_age = total_age / count if count > 0 else 0
print(f"Середній вік: {average_age}")
\`\`\`

**Оновлення даних:**
\`\`\`python
import csv

# Читання
students = []
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    students = list(reader)

# Модифікація
for student in students:
    if student["Ім'я"] == "Олександр":
        student["Вік"] = "16"

# Запис
with open("students.csv", "w", encoding="utf-8", newline='') as file:
    if students:
        writer = csv.DictWriter(file, fieldnames=students[0].keys())
        writer.writeheader()
        writer.writerows(students)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Читання CSV",
      code: `import csv

# Створюємо тестовий файл
with open("students.csv", "w", encoding="utf-8", newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Ім'я", "Вік", "Місто"])
    writer.writerow(["Олександр", "15", "Київ"])
    writer.writerow(["Марія", "16", "Львів"])

# Читання
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    header = next(reader)
    print("Заголовки:", header)
    for row in reader:
        print(f"{row[0]}, {row[1]} років, {row[2]}")`,
      explanation: "Демонструє базове читання та запис CSV файлів."
    },
    {
      title: "Приклад 2: Робота з DictReader",
      code: `import csv

# Створюємо файл
students = [
    {"Ім'я": "Олександр", "Вік": "15", "Курс": "Python"},
    {"Ім'я": "Марія", "Вік": "16", "Курс": "Python"},
    {"Ім'я": "Дмитро", "Вік": "15", "Курс": "Web"}
]

with open("students.csv", "w", encoding="utf-8", newline='') as file:
    writer = csv.DictWriter(file, fieldnames=["Ім'я", "Вік", "Курс"])
    writer.writeheader()
    writer.writerows(students)

# Читання як словник
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Ім'я']} вивчає {row['Курс']}")`,
      explanation: "Показує роботу з CSV як зі словниками для зручності."
    },
    {
      title: "Приклад 3: Обробка даних",
      code: `import csv

# Обчислення середнього віку
total_age = 0
count = 0

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        total_age += int(row["Вік"])
        count += 1

if count > 0:
    average = total_age / count
    print(f"Середній вік студентів: {average:.1f}")

# Фільтрація
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    python_students = [row for row in reader if row["Курс"] == "Python"]
    print(f"Студентів Python: {len(python_students)}")`,
      explanation: "Демонструє обробку та аналіз CSV даних."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути newline='' при записі CSV",
      explanation: "Без newline='' можуть з'явитися порожні рядки між записами.",
      correctApproach: "Завжди використовуйте newline='' при відкритті CSV для запису."
    },
    {
      mistake: "Не обробляти типи даних",
      explanation: "CSV зберігає все як рядки, потрібно конвертувати в числа.",
      correctApproach: "Використовуйте int() або float() для конвертації числових значень."
    },
    {
      mistake: "Не обробляти відсутні дані",
      explanation: "Якщо в CSV є порожні комірки, вони будуть порожніми рядками.",
      correctApproach: "Перевіряйте наявність даних перед обробкою: if row['Вік']:"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **CSV формат** — табличні дані, розділені комами
2. **csv.reader** — читання CSV як списків
3. **csv.DictReader** — читання CSV як словників
4. **csv.writer** — запис CSV
5. **csv.DictWriter** — запис CSV зі словників
6. **newline=''** — важливо для коректного запису

CSV — простий спосіб роботи з табличними даними!`,
  
  practiceTask: {
    title: "Система оцінок студентів",
    description: "Створіть програму для роботи з CSV даними студентів",
    problemStatement: `Напишіть програму, яка:
1. Створює CSV файл з даними студентів (Ім'я, Курс, Оцінка1, Оцінка2, Оцінка3)
2. Додає нового студента з оцінками
3. Обчислює середню оцінку для кожного студента
4. Знаходить студентів з середньою оцінкою > 90
5. Створює новий CSV файл з додатковою колонкою "Середня оцінка"`,
    inputFormat: "Програма працює з файлами students.csv та students_with_avg.csv",
    outputFormat: `Приклад виведення:
Середні оцінки:
Олександр: 92.3
Марія: 88.7
Відмінники (>90):
Олександр: 92.3`,
    examples: [
      {
        input: "Додавання студента з оцінками",
        output: "Студент додано, середня оцінка обчислена",
        explanation: "Програма обробляє CSV та обчислює статистику"
      }
    ],
    solution: {
      code: `import csv

def create_initial_file():
    students = [
        {"Ім'я": "Олександр", "Курс": "Python", "Оцінка1": "95", "Оцінка2": "90", "Оцінка3": "92"},
        {"Ім'я": "Марія", "Курс": "Python", "Оцінка1": "88", "Оцінка2": "90", "Оцінка3": "88"},
        {"Ім'я": "Дмитро", "Курс": "Web", "Оцінка1": "85", "Оцінка2": "87", "Оцінка3": "89"}
    ]
    
    with open("students.csv", "w", encoding="utf-8", newline='') as file:
        fieldnames = ["Ім'я", "Курс", "Оцінка1", "Оцінка2", "Оцінка3"]
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(students)

def add_student(name, course, grade1, grade2, grade3):
    with open("students.csv", "a", encoding="utf-8", newline='') as file:
        writer = csv.writer(file)
        writer.writerow([name, course, grade1, grade2, grade3])
    print(f"Студент {name} додано!")

def calculate_average(row):
    grades = [int(row["Оцінка1"]), int(row["Оцінка2"]), int(row["Оцінка3"])]
    return sum(grades) / len(grades)

def process_students():
    students = []
    
    # Читання
    with open("students.csv", "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            avg = calculate_average(row)
            row["Середня оцінка"] = f"{avg:.1f}"
            students.append(row)
    
    # Виведення середніх оцінок
    print("Середні оцінки:")
    for student in students:
        print(f"{student['Ім'я']}: {student['Середня оцінка']}")
    
    # Відмінники
    print("\\nВідмінники (>90):")
    for student in students:
        if float(student["Середня оцінка"]) > 90:
            print(f"{student['Ім'я']}: {student['Середня оцінка']}")
    
    # Запис з середньою оцінкою
    with open("students_with_avg.csv", "w", encoding="utf-8", newline='') as file:
        fieldnames = ["Ім'я", "Курс", "Оцінка1", "Оцінка2", "Оцінка3", "Середня оцінка"]
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(students)
    
    print("\\nФайл students_with_avg.csv створено!")

# Використання
create_initial_file()
add_student("Анна", "Python", "92", "94", "93")
process_students()`,
      explanation: "Рішення демонструє повну роботу з CSV: створення, додавання, обробка, обчислення, фільтрація."
    },
    hints: [
      "Використовуйте csv.DictReader для зручної роботи",
      "Не забудьте newline='' при записі",
      "Конвертуйте оцінки в int перед обчисленням"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає CSV?",
        options: ["Computer System Values", "Comma-Separated Values", "Code System Variables", "Complex String Values"],
        correctAnswer: 1,
        explanation: "CSV = Comma-Separated Values (значення, розділені комами)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чому потрібен newline='' при записі CSV?",
        options: ["Швидкість", "Щоб уникнути порожніх рядків", "Безпека", "Стиснення"],
        correctAnswer: 1,
        explanation: "newline='' запобігає додаванню зайвих порожніх рядків між записами в CSV."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка різниця між csv.reader та csv.DictReader?",
        options: ["Немає різниці", "reader повертає списки, DictReader — словники", "DictReader швидший", "reader для запису"],
        correctAnswer: 1,
        explanation: "csv.reader повертає рядки як списки, csv.DictReader — як словники з ключами з заголовків."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

