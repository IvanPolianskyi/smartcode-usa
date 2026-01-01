/**
 * Практика: обробка помилок у програмах
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_07_5 = {
  lessonId: "lesson-07-5",
  moduleId: "module-08",
  order: 5,
  title: "Практика: обробка помилок у програмах",
  
  learningObjectives: [
    "Створити програму з обробкою помилок",
    "Реалізувати валідацію даних",
    "Обробляти різні типи помилок",
    "Створити надійну програму",
    "lesson-07-4",
    "module-08",
    "08 - Milestone Project 2"
],
  
  estimatedTime: 120,
  prerequisites: [
    "lesson-07-4",
    "module-08",
    "08 - Milestone Project 2"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Практика: обробка помилок у програмах

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Створити програму з обробкою помилок
- Реалізувати валідацію даних
- Обробляти різні типи помилок
- Створити надійну програму
- lesson-07-4
- module-08
- 08 - Milestone Project 2

**Час на вивчення:** приблизно 120 хвилин

**Попередні вимоги:** lesson-07-4, module-08, 08 - Milestone Project 2
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
  
  summary: `Підсумок уроку "Практика: обробка помилок у програмах"

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
