/**
 * Lesson 04-5: Практика: файлові задачі
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_5 = {
  lessonId: "lesson-04-5",
  moduleId: "module-04",
  order: 5,
  title: "Практика: файлові задачі",
  
  learningObjectives: [
    "Створити скрипт для обробки файлів",
    "Реалізувати обробку помилок",
    "Працювати з текстовими файлами",
    "Генерувати звіти",
    "Об'єднати всі знання модуля 4"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-04-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд вивченого",
        content: `На цьому уроці ми закріпимо всі знання з модуля 04:

**Що ми вивчили:**
1. **Робота з файлами** - open(), read(), write()
2. **Контекстний менеджер with** - безпечна робота з файлами
3. **Текстові файли** - робота з текстовими файлами
4. **Обробка помилок** - try/except/finally
5. **Підняття винятків** - raise для сигналізації помилок

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
        title: "Приклад: Обробка текстових даних",
        content: `**Задача:** Прочитати текстовий файл з оцінками (кожен рядок - одна оцінка), знайти середню оцінку, записати результат.

\`\`\`python
# Читання даних з текстового файлу
grades = []
try:
    with open("grades.txt", "r", encoding="utf-8") as file:
        for line in file:
            line = line.strip()  # Видаляємо пробіли та переноси рядків
            if line:  # Перевіряємо що рядок не порожній
                grades.append(int(line))
except FileNotFoundError:
    print("Файл не знайдено!")
    grades = []
except ValueError:
    print("Помилка: у файлі є некоректні дані!")
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

**4. Обробляй порожні рядки**
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()  # Видаляємо пробіли та переноси
        if line:  # Перевіряємо що рядок не порожній
            print(line)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Обробка текстових даних",
      code: `# Читання та обробка текстових даних
with open("students.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()  # Видаляємо пробіли
        if line:  # Перевіряємо що рядок не порожній
            print(f"Студент: {line}")`,
      explanation: "Демонструє читання та обробку текстових даних з файлу."
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
2. **Текстові файли** - обробка текстових даних
3. **Обробка помилок** - try/except/finally для надійності
4. **Підняття винятків** - raise для сигналізації помилок
5. **Практичні проекти** - об'єднання всіх концепцій

Тепер ви вмієте повноцінно працювати з файлами та обробляти помилки!

Вітаємо! Ви завершили модуль 04 - Робота з файлами та обробка помилок!`,
  
  practiceTask: {
    title: "Обробка оцінок з файлу",
    description: "Створіть програму для обробки оцінок з текстового файлу",
    problemStatement: `Напишіть програму, яка:
1. Створює текстовий файл grades.txt з оцінками (кожен рядок - одна оцінка):
   85
   92
   78
   88
2. Читає оцінки з файлу
3. Обчислює середню оцінку
4. Записує результат у файл result.txt у форматі:
   Середня оцінка: X.XX
5. Обробляє помилки (FileNotFoundError, ValueError)`,
    outputFormat: `Приклад виведення:
Середня оцінка: 85.75`,
    examples: [
      {
        output: `Середня оцінка: 85.75`,
        explanation: "Програма читає оцінки з файлу, обчислює середнє значення та записує результат"
      }
    ],
    solution: {
      code: `# Обробка оцінок з файлу

# Створення файлу з оцінками
grades_list = [85, 92, 78, 88]
try:
    with open("grades.txt", "w", encoding="utf-8") as file:
        for grade in grades_list:
            file.write(f"{grade}\\n")
except Exception as e:
    print(f"Помилка створення файлу: {e}")

# Читання та обробка оцінок
grades = []
try:
    with open("grades.txt", "r", encoding="utf-8") as file:
        for line in file:
            line = line.strip()
            if line:
                grades.append(int(line))
except FileNotFoundError:
    print("Файл grades.txt не знайдено!")
except ValueError:
    print("Помилка: у файлі є некоректні дані!")
else:
    if grades:
        average = sum(grades) / len(grades)
        print(f"Середня оцінка: {average:.2f}")
        
        # Запис результату
        try:
            with open("result.txt", "w", encoding="utf-8") as file:
                file.write(f"Середня оцінка: {average:.2f}\\n")
        except Exception as e:
            print(f"Помилка запису: {e}")`,
      explanation: "Рішення створює файл з оцінками, читає їх, обчислює середнє значення та записує результат у файл."
    },
    hints: [
      "Використовуйте with open() для роботи з файлами",
      "Обробляйте FileNotFoundError та ValueError",
      "Використовуйте sum() та len() для середньої оцінки",
      "Не забудьте strip() для видалення пробілів",
      "Перевіряйте чи рядок не порожній перед обробкою"
    ],
    difficulty: "beginner"
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
        question: "Що зробить цей код?\n\n```python\nwith open('data.txt', 'w', encoding='utf-8') as file:\n    file.write('Привіт')\n```",
        options: [
          "Створить файл data.txt та запише 'Привіт'",
          "Прочитає файл data.txt",
          "Помилку",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "Код створює файл data.txt та записує в нього текст 'Привіт'."
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
