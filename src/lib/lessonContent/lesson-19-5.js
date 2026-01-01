/**
 * Обробка подій та практика: GUI-застосунок
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_19_5 = {
  lessonId: "lesson-19-5",
  moduleId: "module-00",
  order: 5,
  title: "Обробка подій та практика: GUI-застосунок",
  
  learningObjectives: [
    "Обробляти події кліку",
    "Створювати callback-функції",
    "Створити повноцінний GUI-додаток",
    "Застосувати всі набуті знання",
    "lesson-19-4"
],
  
  estimatedTime: 150,
  prerequisites: [
    "lesson-19-4"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Обробка подій та практика: GUI-застосунок

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Обробляти події кліку
- Створювати callback-функції
- Створити повноцінний GUI-додаток
- Застосувати всі набуті знання
- lesson-19-4

**Час на вивчення:** приблизно 150 хвилин

**Попередні вимоги:** lesson-19-4
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
  
  summary: `Підсумок уроку "Обробка подій та практика: GUI-застосунок"

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
