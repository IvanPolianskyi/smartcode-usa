/**
 * Практика: автоматизація email
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_16_3 = {
  lessonId: "lesson-16-3",
  moduleId: "module-17",
  order: 3,
  title: "Практика: автоматизація email",
  
  learningObjectives: [
    "Створити скрипт для відправки email",
    "Автоматизувати відправку звітів",
    "Створити систему сповіщень",
    "Практикуватися у роботі з email",
    "lesson-16-2",
    "module-17",
    "17 - Розширені об'єкти та структури даних"
],
  
  estimatedTime: 120,
  prerequisites: [
    "lesson-16-2",
    "module-17",
    "17 - Розширені об'єкти та структури даних"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Практика: автоматизація email

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Створити скрипт для відправки email
- Автоматизувати відправку звітів
- Створити систему сповіщень
- Практикуватися у роботі з email
- lesson-16-2
- module-17
- 17 - Розширені об'єкти та структури даних

**Час на вивчення:** приблизно 120 хвилин

**Попередні вимоги:** lesson-16-2, module-17, 17 - Розширені об'єкти та структури даних
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
  
  summary: `Підсумок уроку "Практика: автоматизація email"

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
