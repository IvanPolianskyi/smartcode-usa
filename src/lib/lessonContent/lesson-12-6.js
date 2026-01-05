/**
 * Практика: генерація звітів
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_6 = {
  lessonId: "lesson-12-6",
  moduleId: "module-12",
  order: 4,
  title: "Практика: генерація звітів",
  
  learningObjectives: [
    "Створити скрипт для генерації звітів",
    "Обробляти дані з різних джерел",
    "Генерувати PDF та Excel звіти",
    "Створити корисний інструмент",
    "lesson-12-5",
    "module-14",
    "16 - Відправка email з Python",
    "Відправка email повідомлень, робота з SMTP, створення HTML email"
],
  
  estimatedTime: 120,
  prerequisites: [
    "lesson-12-5",
    "module-14",
    "16 - Відправка email з Python"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Практика: генерація звітів

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Створити скрипт для генерації звітів
- Обробляти дані з різних джерел
- Генерувати PDF та Excel звіти
- Створити корисний інструмент
- lesson-15-3
- module-14
- 14 - Відправка email з Python
- Відправка email повідомлень, робота з SMTP, створення HTML email

**Час на вивчення:** приблизно 120 хвилин

**Попередні вимоги:** lesson-15-3, module-14, 14 - Відправка email з Python
`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1",
      code: `# Приклад коду
print("Привіт, світ!")`,
      explanation: "Базовий приклад для розуміння концепції"
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Типова помилка",
      explanation: "Пояснення помилки",
      correctApproach: "Правильний підхід"
    }
  ],
  
  summary: `Підсумок уроку "Практика: генерація звітів"

На цьому уроці ми вивчили основні концепції та навички.`,
  
  practiceTask: {
    title: "Практична задача",
    description: "Застосуйте набуті знання на практиці",
    problemStatement: "Створіть програму, яка демонструє вивчені концепції",
    inputFormat: "",
    outputFormat: "",
    examples: [],
    solution: {
      code: `# Рішення
# Ваш код тут`,
      explanation: "Пояснення рішення"
    },
    hints: [
      "Підказка 1",
      "Підказка 2"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Питання про основні концепції?",
        options: [
          "Варіант 1",
          "Варіант 2",
          "Варіант 3",
          "Варіант 4"
        ],
        correctAnswer: 0,
        explanation: "Пояснення правильної відповіді"
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
