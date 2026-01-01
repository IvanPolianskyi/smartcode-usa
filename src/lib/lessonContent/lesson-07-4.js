/**
 * Assert та валідація даних
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_07_4 = {
  lessonId: "lesson-07-4",
  moduleId: "module-08",
  order: 4,
  title: "Assert та валідація даних",
  
  learningObjectives: [
    "Використовувати assert для перевірки",
    "Валідувати вхідні дані",
    "Обробляти помилки валідації",
    "Створювати надійний код",
    "lesson-07-3",
    "lesson-07-5",
    "Практика: обробка помилок у програмах",
    "Створити програму з обробкою помилок"
],
  
  estimatedTime: 75,
  prerequisites: [
    "lesson-07-3",
    "lesson-07-5",
    "Практика: обробка помилок у програмах"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Assert та валідація даних

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Використовувати assert для перевірки
- Валідувати вхідні дані
- Обробляти помилки валідації
- Створювати надійний код
- lesson-07-3
- lesson-07-5
- Практика: обробка помилок у програмах
- Створити програму з обробкою помилок

**Час на вивчення:** приблизно 75 хвилин

**Попередні вимоги:** lesson-07-3, lesson-07-5, Практика: обробка помилок у програмах
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
  
  summary: `Підсумок уроку "Assert та валідація даних"

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
