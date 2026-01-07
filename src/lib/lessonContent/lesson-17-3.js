/**
 * Протоколи та duck typing
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_3 = {
  lessonId: "lesson-13-5",
  moduleId: "module-15",
  order: 3,
  title: "Протоколи та duck typing",
  
  learningObjectives: [
    "Розуміти протоколи Python",
    "Застосовувати duck typing",
    "Реалізовувати протоколи",
    "Використовувати typing протоколи",
    "lesson-15-2",
    "lesson-15-4",
    "Розширені структури даних",
    "Використовувати спеціалізовані структури"
],
  
  prerequisites: [
    "lesson-15-2",
    "lesson-15-4",
    "Розширені структури даних"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Протоколи та duck typing

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Розуміти протоколи Python
- Застосовувати duck typing
- Реалізовувати протоколи
- Використовувати typing протоколи
- lesson-17-2
- lesson-17-4
- Розширені структури даних
- Використовувати спеціалізовані структури

**Попередні вимоги:** lesson-17-2, lesson-17-4, Розширені структури даних
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
  
  summary: `Підсумок уроку "Протоколи та duck typing"

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
