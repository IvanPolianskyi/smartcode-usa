/**
 * Дескриптори та property
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_17_2 = {
  lessonId: "lesson-17-2",
  moduleId: "module-15",
  order: 2,
  title: "Дескриптори та property",
  
  learningObjectives: [
    "Розуміти дескриптори",
    "Створювати власні дескриптори",
    "Використовувати property",
    "Застосовувати для валідації",
    "lesson-17-1",
    "lesson-17-3",
    "Протоколи та duck typing",
    "Розуміти протоколи Python"
],
  
  estimatedTime: 90,
  prerequisites: [
    "lesson-17-1",
    "lesson-17-3",
    "Протоколи та duck typing"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Дескриптори та property

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Розуміти дескриптори
- Створювати власні дескриптори
- Використовувати property
- Застосовувати для валідації
- lesson-17-1
- lesson-17-3
- Протоколи та duck typing
- Розуміти протоколи Python

**Час на вивчення:** приблизно 90 хвилин

**Попередні вимоги:** lesson-17-1, lesson-17-3, Протоколи та duck typing
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
  
  summary: `Підсумок уроку "Дескриптори та property"

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
