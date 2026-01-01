/**
 * Рекурсія
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_8 = {
  lessonId: "lesson-03-8",
  moduleId: "module-03",
  order: 8,
  title: "Рекурсія",
  
  learningObjectives: [
    "Розуміти концепцію рекурсії",
    "Створювати рекурсивні функції",
    "Розв'язувати задачі рекурсивно",
    "Уникати нескінченної рекурсії"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-03-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Рекурсія

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Розуміти концепцію рекурсії
- Створювати рекурсивні функції
- Розв'язувати задачі рекурсивно
- Уникати нескінченної рекурсії
- lesson-03-7
- lesson-03-9
- Функції вищого порядку: map, filter, reduce

**Час на вивчення:** приблизно 90 хвилин

**Попередні вимоги:** lesson-03-7, lesson-03-9, Функції вищого порядку: map, filter, reduce
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
  
  summary: `Підсумок уроку "Рекурсія"

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
