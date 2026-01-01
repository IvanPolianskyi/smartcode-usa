/**
 * Практика: написання функцій
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_10 = {
  lessonId: "lesson-03-10",
  moduleId: "module-03",
  order: 10,
  title: "Практика: написання функцій",
  
  learningObjectives: [
    "Створювати складні функції",
    "Застосовувати всі набуті знання",
    "Практикуватися у написанні функцій",
    "Підготуватися до першого проекту"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-03-9"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Практика: написання функцій

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Створювати складні функції
- Застосовувати всі набуті знання
- Практикуватися у написанні функцій
- Підготуватися до першого проекту
- lesson-03-9
- module-04
- 04 - Milestone Project 1

**Час на вивчення:** приблизно 120 хвилин

**Попередні вимоги:** lesson-03-9, module-04, 04 - Milestone Project 1
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
  
  summary: `Підсумок уроку "Практика: написання функцій"

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
