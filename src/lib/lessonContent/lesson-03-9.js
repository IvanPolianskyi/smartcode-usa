/**
 * Функції вищого порядку: map, filter, reduce
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_9 = {
  lessonId: "lesson-03-9",
  moduleId: "module-03",
  order: 9,
  title: "Функції вищого порядку: map, filter, reduce",
  
  learningObjectives: [
    "Використовувати map() для перетворення",
    "Застосовувати filter() для фільтрації",
    "Використовувати reduce() для згортки",
    "Комбінувати функції вищого порядку"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-03-8"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Функції вищого порядку: map, filter, reduce

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Використовувати map() для перетворення
- Застосовувати filter() для фільтрації
- Використовувати reduce() для згортки
- Комбінувати функції вищого порядку
- lesson-03-8
- lesson-03-10
- Практика: написання функцій

**Час на вивчення:** приблизно 90 хвилин

**Попередні вимоги:** lesson-03-8, lesson-03-10, Практика: написання функцій
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
  
  summary: `Підсумок уроку "Функції вищого порядку: map, filter, reduce"

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
