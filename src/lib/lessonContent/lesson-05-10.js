/**
 * Lesson 05-10: Фінальний проект - Робота з файлами студентів
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_10 = {
  lessonId: "lesson-05-10",
  moduleId: "module-05",
  order: 4,
  title: "Фінальний проект - Робота з файлами студентів",
  
  learningObjectives: [
    "Застосувати всі знання модуля на практиці",
    "Створити програму для обробки файлів",
    "Працювати з текстовими даними",
    "Генерувати звіти"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-05-3"],
  isProject: true,
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Опис проекту",
        content: `**Проект: Робота з файлами студентів**

Створіть програму, яка працює з файлами та обробляє дані про студентів.

**Завдання:**

1. Створити файл \`students.txt\` зі списком студентів
2. Прочитати файл та вивести всіх студентів
3. Підрахувати кількість студентів
4. Створити файл \`output.txt\` з результатами`
      },
      {
        title: "Покрокова інструкція",
        content: `**Крок 1: Створити список студентів**

Створіть список з іменами:
\`\`\`python
students = ["Іван", "Марія", "Петро", "Олена", "Андрій"]
\`\`\`

**Крок 2: Записати у файл**

Відкрийте файл students.txt для запису і запишіть кожне ім'я з нового рядка.

**Крок 3: Прочитати файл**

Відкрийте файл students.txt для читання і виведіть кожне ім'я на екран (використовуйте print).`
      },
      {
        title: "Що має вийти",
        content: `**Після запуску програми:**

**Вивід на екран:**
\`\`\`
Іван
Марія
Петро
Олена
Андрій
\`\`\`

**Файл students.txt (створюється автоматично):**
\`\`\`
Іван
Марія
Петро
Олена
Андрій
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: Запис у файл",
      code: `students = ["Іван", "Марія", "Петро"]

with open("students.txt", "w", encoding="utf-8") as file:
    for student in students:
        file.write(student + "\\n")`,
      explanation: "Створює файл та записує імена студентів."
    },
    {
      title: "Приклад: Читання з файлу",
      code: `with open("students.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())`,
      explanation: "Читає файл та виводить кожен рядок на екран."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути encoding='utf-8'",
      explanation: "Без кодування українські імена можуть відображатися неправильно.",
      correctApproach: "Завжди вказуй encoding='utf-8'"
    },
    {
      mistake: "Не використовувати strip()",
      explanation: "Рядки містять символ нового рядка в кінці.",
      correctApproach: "Використовуй line.strip() при читанні"
    },
    {
      mistake: "Забути \\n при записі",
      explanation: "Без \\n всі дані запишуться в один рядок.",
      correctApproach: "Додавай \\n в кінці кожного рядка"
    }
  ],
  
  summary: `**Вітаємо з завершенням модуля 05!**

У цьому модулі ви навчилися:

1. Робота з файлами - open(), read(), write()
2. Контекстний менеджер with - безпечна робота з файлами
3. Обробка текстових даних
4. Створення практичних програм

Тепер ви готові до наступного модуля!`,
  
  practiceTask: {
    title: "Робота з файлами студентів",
    description: "Створіть програму для роботи зі списком студентів",
    problemStatement: `**Завдання:**

Напишіть програму, яка:

1. Створює файл \`students.txt\` з п'ятьма іменами студентів
2. Читає файл та виводить всі імена на екран (кожне ім'я з нової строки)`,
    inputFormat: "Програма працює з фіксованим списком імен",
    outputFormat: `Очікуваний вивід на екран:
Іван
Марія
Петро
Олена
Андрій`,
    examples: [
      {
        input: "students = ['Іван', 'Марія', 'Петро', 'Олена', 'Андрій']",
        output: "Іван\nМарія\nПетро\nОлена\nАндрій",
        explanation: "Програма створює файл, читає його та виводить імена"
      }
    ],
    solution: {
      code: `students = ["Іван", "Марія", "Петро", "Олена", "Андрій"]

with open("students.txt", "w", encoding="utf-8") as file:
    for student in students:
        file.write(student + "\\n")

with open("students.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())`,
      explanation: "Готове рішення. Програма створює файл students.txt з іменами, потім читає його та виводить всі імена на екран."
    },
    hints: [
      "Використовуй with для роботи з файлами",
      "Спочатку запиши всі імена у файл",
      "Потім прочитай файл та виведи кожне ім'я",
      "Використовуй strip() щоб видалити \\n",
      "Не забудь encoding='utf-8'"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який режим використовувати для створення нового файлу?",
        options: [
          "'w' - write",
          "'r' - read",
          "'a' - append",
          "'x' - exclusive"
        ],
        correctAnswer: 0,
        explanation: "Режим 'w' (write) створює новий файл або перезаписує існуючий."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що зробить цей код?\n\n```python\nwith open('file.txt', 'w') as f:\n    f.write('Hello\\n')\n```",
        options: [
          "Створить файл і запише 'Hello'",
          "Прочитає файл",
          "Видалить файл",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Код створює файл file.txt і записує в нього 'Hello' з новим рядком."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо використовувати strip() при читанні файлу?",
        options: [
          "Щоб видалити \\n в кінці рядка",
          "Щоб закрити файл",
          "Щоб підрахувати символи",
          "Це не потрібно"
        ],
        correctAnswer: 0,
        explanation: "strip() видаляє пробільні символи включно з \\n з початку та кінця рядка."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що поверне len(names), якщо names = ['Іван', 'Марія', 'Петро']?",
        options: [
          "3",
          "2",
          "1",
          "0"
        ],
        correctAnswer: 0,
        explanation: "len() повертає кількість елементів у списку, тут 3 імені."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить with при роботі з файлами?",
        options: [
          "Автоматично закриває файл",
          "Прискорює роботу",
          "Шифрує дані",
          "Нічого особливого"
        ],
        correctAnswer: 0,
        explanation: "with автоматично закриває файл після виходу з блоку."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
