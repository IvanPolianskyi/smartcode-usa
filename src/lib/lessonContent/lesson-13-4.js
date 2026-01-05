/**
 * Робота з Excel: openpyxl
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_13_4 = {
  lessonId: "lesson-12-2",
  moduleId: "module-13",
  order: 2,
  title: "Робота з Excel: openpyxl",
  
  learningObjectives: [
    "Встановити openpyxl",
    "Читати Excel файли",
    "Записувати дані в Excel",
    "Маніпулювати листами та комірками",
    "lesson-13-3",
    "lesson-13-5",
    "Робота з CSV та pandas",
    "Читати та записувати CSV файли"
],
  
  estimatedTime: 90,
  prerequisites: [
    "lesson-13-3",
    "lesson-13-5",
    "Робота з CSV та pandas"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Робота з Excel: openpyxl

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Встановити openpyxl
- Читати Excel файли
- Записувати дані в Excel
- Маніпулювати листами та комірками
- lesson-15-1
- lesson-15-3
- Робота з CSV та pandas
- Читати та записувати CSV файли

**Час на вивчення:** приблизно 90 хвилин

**Попередні вимоги:** lesson-15-1, lesson-15-3, Робота з CSV та pandas
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
  
  summary: `Підсумок уроку "Робота з Excel: openpyxl"

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
