/**
 * Milestone Project 2: Програма з ООП та модулями
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_08_1 = {
  lessonId: "lesson-08-1",
  moduleId: "module-08",
  order: 1,
  title: "Milestone Project 2: Програма з ООП та модулями",
  
  learningObjectives: [
    "Створити програму з використанням ООП",
    "Організувати код у модулі та пакети",
    "Реалізувати обробку помилок",
    "Створити повноцінну систему",
    "Тестувати та документувати код",
    "lesson-07-5",
    "module-10",
    "10 - Декоратори Python"
],
  
  estimatedTime: 360,
  prerequisites: [
    "lesson-07-5",
    "module-10",
    "10 - Декоратори Python"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Milestone Project 2: Програма з ООП та модулями

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Створити програму з використанням ООП
- Організувати код у модулі та пакети
- Реалізувати обробку помилок
- Створити повноцінну систему
- Тестувати та документувати код
- lesson-07-5
- module-10
- 10 - Декоратори Python

**Час на вивчення:** приблизно 360 хвилин

**Попередні вимоги:** lesson-07-5, module-10, 10 - Декоратори Python
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
  
  summary: `Підсумок уроку "Milestone Project 2: Програма з ООП та модулями"

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
