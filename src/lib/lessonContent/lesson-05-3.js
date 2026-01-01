/**
 * Інкапсуляція та модифікатори доступу
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_3 = {
  lessonId: "lesson-05-3",
  moduleId: "module-00",
  order: 3,
  title: "Інкапсуляція та модифікатори доступу",
  
  learningObjectives: [
    "Розуміти концепцію інкапсуляції",
    "Використовувати публічні та приватні атрибути",
    "Застосовувати property декоратор",
    "Контролювати доступ до даних",
    "lesson-05-2",
    "lesson-05-4",
    "Наслідування",
    "Створювати дочірні класи"
],
  
  estimatedTime: 90,
  prerequisites: [
    "lesson-05-2",
    "lesson-05-4",
    "Наслідування"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Інкапсуляція та модифікатори доступу

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Розуміти концепцію інкапсуляції
- Використовувати публічні та приватні атрибути
- Застосовувати property декоратор
- Контролювати доступ до даних
- lesson-05-2
- lesson-05-4
- Наслідування
- Створювати дочірні класи

**Час на вивчення:** приблизно 90 хвилин

**Попередні вимоги:** lesson-05-2, lesson-05-4, Наслідування
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
  
  summary: `Підсумок уроку "Інкапсуляція та модифікатори доступу"

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
