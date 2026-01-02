/**
 * Lesson 05-6: Практика: файлові задачі
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_6 = {
  lessonId: "lesson-05-6",
  moduleId: "module-05",
  order: 6,
  title: "Практика: файлові задачі",
  
  learningObjectives: [
    "Створити скрипт для обробки файлів",
    "Реалізувати обробку помилок",
    "Працювати з JSON/CSV даними",
    "Генерувати звіти",
    "Об'єднати всі знання модуля 5"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-05-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд вивченого",
        content: `На цьому уроці ми закріпимо всі знання з модуля 05:

**Що ми вивчили:**
1. **Робота з файлами** - open(), read(), write()
2. **Контекстний менеджер with** - безпечна робота з файлами
3. **CSV та TXT** - робота зі структурованими та текстовими файлами
4. **Обробка помилок** - try/except/finally
5. **Власні винятки** - створення кастомних помилок

**Мета цього уроку:**
- Об'єднати всі концепції
- Створити практичний проект
- Застосувати всі набуті знання`
      },
      {
        title: "Підхід до файлових задач",
        content: `**Кроки для роботи з файлами:**

1. **Визначити задачу**
   - Що потрібно зробити?
   - Які файли потрібні?
   - Який формат даних?

2. **Спланувати структуру**
   - Які функції потрібні?
   - Як обробляти помилки?
   - Як організувати код?

3. **Реалізувати**
   - Відкрити файли (з with)
   - Обробити дані
   - Записати результат
   - Обробити помилки

4. **Протестувати**
   - Перевірити на різних даних
   - Перевірити крайові випадки
   - Обробити помилки`
      },
      {
        title: "Приклад: Обробка CSV даних",
        content: `**Задача:** Прочитати CSV з оцінками, знайти середню оцінку, записати результат.

\`\`\`python
import csv

# Читання даних
grades = []
try:
    with open("grades.csv", "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            grades.append(int(row["Оцінка"]))
except FileNotFoundError:
    print("Файл не знайдено!")
    grades = []

# Обробка даних
if grades:
    average = sum(grades) / len(grades)
    print(f"Середня оцінка: {average:.2f}")
    
    # Запис результату
    try:
        with open("result.txt", "w", encoding="utf-8") as file:
            file.write(f"Середня оцінка: {average:.2f}\\n")
            file.write(f"Кількість оцінок: {len(grades)}\\n")
    except Exception as e:
        print(f"Помилка запису: {e}")
else:
    print("Немає даних для обробки")
\`\`\``
      },
      {
        title: "Кращі практики",
        content: `**1. Завжди використовуй with statement**
\`\`\`python
# Добре
with open("file.txt", "r") as file:
    content = file.read()

# Погано
file = open("file.txt", "r")
content = file.read()
file.close()
\`\`\`

**2. Обробляй помилки**
\`\`\`python
try:
    with open("file.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("Файл не знайдено!")
except PermissionError:
    print("Немає доступу!")
\`\`\`

**3. Вказуй encoding для тексту**
\`\`\`python
with open("file.txt", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

**4. Використовуй newline='' для CSV**
\`\`\`python
with open("data.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["A", "B", "C"])
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Обробка CSV",
      code: `# Читання та обробка CSV
import csv

with open("data.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Ім\\'я']}: {row['Оцінка']}")`,
      explanation: "Демонструє читання та обробку CSV даних."
    },
    {
      title: "Приклад 2: Обробка помилок",
      code: `# Безпечна робота з файлами
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print("Файл не знайдено!")
except Exception as e:
    print(f"Помилка: {e}")`,
      explanation: "Показує обробку різних типів помилок при роботі з файлами."
    },
    {
      title: "Приклад 3: Генерація звіту",
      code: `# Створення звіту
data = ["Рядок 1", "Рядок 2", "Рядок 3"]
with open("report.txt", "w", encoding="utf-8") as file:
    file.write("ЗВІТ\\n")
    file.write("=" * 20 + "\\n")
    for item in data:
        file.write(f"- {item}\\n")`,
      explanation: "Демонструє створення звіту у текстовий файл."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не обробляти помилки при роботі з файлами",
      explanation: "Файли можуть не існувати, не мати доступу, тощо.",
      correctApproach: "Завжди використовуй try/except при роботі з файлами"
    },
    {
      mistake: "Забути encoding для українського тексту",
      explanation: "Без encoding='utf-8' можуть бути проблеми з кирилицею.",
      correctApproach: "Завжди вказуй encoding='utf-8' для текстових файлів"
    },
    {
      mistake: "Не використовувати with statement",
      explanation: "Без with легко забути закрити файл.",
      correctApproach: "Завжди використовуй with open() для роботи з файлами"
    }
  ],
  
  summary: `На цьому уроці ми закріпили знання:

1. **Робота з файлами** - open(), read(), write() з with statement
2. **CSV та TXT** - обробка структурованих та текстових даних
3. **Обробка помилок** - try/except/finally для надійності
4. **Власні винятки** - створення специфічних помилок
5. **Практичні проекти** - об'єднання всіх концепцій

Тепер ви вмієте повноцінно працювати з файлами та обробляти помилки!

Вітаємо! Ви завершили модуль 05 - Робота з файлами та обробка помилок!`,
  
  practiceTask: {
    title: "Система обробки даних студентів",
    description: "Створіть програму для обробки даних студентів з файлів",
    problemStatement: `Напишіть програму, яка:
1. Створює CSV файл students.csv з даними:
   - Заголовки: Ім'я, Вік, Оцінка
   - Дані: Іван,15,85; Марія,16,92; Петро,15,78; Олена,16,88
2. Читає дані з CSV файлу
3. Обчислює середню оцінку
4. Знаходить студентів з оцінкою >= 90
5. Записує результат у файл report.txt у форматі:
   Середня оцінка: X.XX
   Студенти з високою оцінкою: [список імен]
6. Обробляє всі можливі помилки`,
    inputFormat: "Програма використовує фіксовані дані студентів",
    outputFormat: `Приклад виведення:
Середня оцінка: 85.75
Студенти з високою оцінкою: ['Марія']`,
    examples: [
      {
        input: "students = [['Ім\\'я', 'Вік', 'Оцінка'], ['Іван', '15', '85'], ['Марія', '16', '92'], ['Петро', '15', '78'], ['Олена', '16', '88']]",
        output: `Середня оцінка: 85.75
Студенти з високою оцінкою: ['Марія']`,
        explanation: "Програма обробляє CSV дані, обчислює статистику та створює звіт"
      }
    ],
    solution: {
      code: `# Система обробки даних студентів
import csv

# Створення CSV файлу
students_data = [
    ["Ім'я", "Вік", "Оцінка"],
    ["Іван", "15", "85"],
    ["Марія", "16", "92"],
    ["Петро", "15", "78"],
    ["Олена", "16", "88"]
]

try:
    with open("students.csv", "w", encoding="utf-8", newline="") as file:
        writer = csv.writer(file)
        writer.writerows(students_data)
except Exception as e:
    print(f"Помилка створення файлу: {e}")

# Читання та обробка даних
grades = []
high_scores = []

try:
    with open("students.csv", "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            grade = int(row["Оцінка"])
            grades.append(grade)
            if grade >= 90:
                high_scores.append(row["Ім'я"])
except FileNotFoundError:
    print("Файл students.csv не знайдено!")
except Exception as e:
    print(f"Помилка обробки: {e}")
else:
    # Обчислення середньої оцінки
    if grades:
        average = sum(grades) / len(grades)
        print(f"Середня оцінка: {average:.2f}")
        print(f"Студенти з високою оцінкою: {high_scores}")
        
        # Запис звіту
        try:
            with open("report.txt", "w", encoding="utf-8") as file:
                file.write(f"Середня оцінка: {average:.2f}\\n")
                file.write(f"Студенти з високою оцінкою: {high_scores}\\n")
        except Exception as e:
            print(f"Помилка запису звіту: {e}")`,
      explanation: "Рішення використовує CSV для зберігання даних, обробляє помилки, обчислює статистику та створює звіт у текстовий файл."
    },
    hints: [
      "Використовуйте csv.writer() для створення CSV",
      "Використовуйте csv.DictReader() для читання",
      "Обробляйте FileNotFoundError та інші помилки",
      "Використовуйте sum() та len() для середньої оцінки",
      "Фільтруйте студентів з оцінкою >= 90"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який спосіб роботи з файлами найбезпечніший?",
        options: [
          "with statement",
          "open() з file.close()",
          "Без різниці",
          "Тільки read()"
        ],
        correctAnswer: 0,
        explanation: "with statement автоматично закриває файл навіть при помилках."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що зробить цей код?\n\n```python\nimport csv\nwith open('data.csv', 'w', newline='') as file:\n    writer = csv.writer(file)\n    writer.writerow(['A', 'B'])\n```",
        options: [
          "Створить CSV файл з рядком 'A,B'",
          "Прочитає CSV файл",
          "Помилку",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "Код створює CSV файл та записує один рядок з двома значеннями."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яке кодування потрібно використовувати для українського тексту?",
        options: [
          "utf-8",
          "ascii",
          "cp1251",
          "Будь-яке"
        ],
        correctAnswer: 0,
        explanation: "utf-8 - стандартне кодування, яке підтримує всі символи включаючи українські."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо обробляти помилки при роботі з файлами?",
        options: [
          "Файли можуть не існувати",
          "Може не бути доступу",
          "Можуть бути інші помилки",
          "Всі варіанти правильні"
        ],
        correctAnswer: 3,
        explanation: "Всі причини важливі - файли можуть не існувати, не мати доступу, або виникнути інші помилки."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ntry:\n    with open('data.txt', 'r') as file:\n        content = file.read()\nexcept FileNotFoundError:\n    print('Файл не знайдено')\nelse:\n    print('Успіх')\nfinally:\n    print('Завершено')\n```\nЯкщо файл data.txt існує:",
        options: [
          "Успіх\\nЗавершено",
          "Файл не знайдено\\nЗавершено",
          "Завершено",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Якщо файл існує, виконується else блок ('Успіх'), потім finally ('Завершено')."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
