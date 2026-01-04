/**
 * Практика: розширені об'єкти
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_17_5 = {
  lessonId: "lesson-17-5",
  moduleId: "module-15",
  order: 5,
  title: "Практика: розширені об'єкти",
  
  learningObjectives: [
    "Створити складні об'єкти",
    "Застосувати протоколи та дескриптори",
    "Створити корисні структури даних",
    "Практикуватися у роботі з об'єктами",
    "lesson-17-4",
    "module-18",
    "18 - Milestone Project 3"
],
  
  estimatedTime: 120,
  prerequisites: [
    "lesson-17-4",
    "module-18",
    "18 - Milestone Project 3"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Практика: розширені об'єкти

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Створити складні об'єкти
- Застосувати протоколи та дескриптори
- Створити корисні структури даних
- Практикуватися у роботі з об'єктами
- lesson-17-4
- module-18
- 18 - Milestone Project 3

**Час на вивчення:** приблизно 120 хвилин

**Попередні вимоги:** lesson-17-4, module-18, 18 - Milestone Project 3
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
  
  summary: `Підсумок уроку "Практика: розширені об'єкти"

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
