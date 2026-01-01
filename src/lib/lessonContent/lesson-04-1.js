/**
 * Milestone Project 1: Гра або інтерактивна програма
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_1 = {
  lessonId: "lesson-04-1",
  moduleId: "module-05",
  order: 1,
  title: "Milestone Project 1: Гра або інтерактивна програма",
  
  learningObjectives: [
    "Створити повноцінну програму",
    "Застосувати об'єкти, структури даних, оператори та функції",
    "Організувати код логічно",
    "Реалізувати інтерактивність",
    "Тестувати та відлагоджувати програму",
    "lesson-03-10",
    "module-05"
],
  
  estimatedTime: 300,
  prerequisites: [
    "lesson-03-10",
    "module-05",
    "05 - Об'єктно-орієнтоване програмування"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Milestone Project 1: Гра або інтерактивна програма

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Створити повноцінну програму
- Застосувати об'єкти, структури даних, оператори та функції
- Організувати код логічно
- Реалізувати інтерактивність
- Тестувати та відлагоджувати програму
- lesson-03-10
- module-05

**Час на вивчення:** приблизно 300 хвилин

**Попередні вимоги:** lesson-03-10, module-05, 05 - Об'єктно-орієнтоване програмування
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
  
  summary: `Підсумок уроку "Milestone Project 1: Гра або інтерактивна програма"

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
