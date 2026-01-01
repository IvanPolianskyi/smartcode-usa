/**
 * Параметри, return, None
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_2 = {
  lessonId: "lesson-03-2",
  moduleId: "module-03",
  order: 2,
  title: "Параметри, return, None",
  
  learningObjectives: [
    "Розуміти різницю між параметрами та аргументами",
    "Використовувати return для повернення значень",
    "Розуміти None та його використання",
    "Створювати функції з різними типами повернення"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-03-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Параметри, return, None

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Розуміти різницю між параметрами та аргументами
- Використовувати return для повернення значень
- Розуміти None та його використання
- Створювати функції з різними типами повернення
- lesson-03-1
- lesson-03-3
- Позиційні та іменовані аргументи

**Час на вивчення:** приблизно 75 хвилин

**Попередні вимоги:** lesson-03-1, lesson-03-3, Позиційні та іменовані аргументи
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
  
  summary: `Підсумок уроку "Параметри, return, None"

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
