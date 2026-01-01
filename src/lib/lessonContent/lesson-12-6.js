/**
 * Практика: обробка даних з модулями
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_6 = {
  lessonId: "lesson-12-6",
  moduleId: "module-13",
  order: 6,
  title: "Практика: обробка даних з модулями",
  
  learningObjectives: [
    "Застосувати розширені модулі",
    "Створити проект з обробки даних",
    "Оптимізувати код за допомогою модулів",
    "Практикуватися у використанні інструментів",
    "lesson-12-5",
    "module-13",
    "13 - Веб-скрапінг"
],
  
  estimatedTime: 120,
  prerequisites: [
    "lesson-12-5",
    "module-13",
    "13 - Веб-скрапінг"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Практика: обробка даних з модулями

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Застосувати розширені модулі
- Створити проект з обробки даних
- Оптимізувати код за допомогою модулів
- Практикуватися у використанні інструментів
- lesson-12-5
- module-13
- 13 - Веб-скрапінг

**Час на вивчення:** приблизно 120 хвилин

**Попередні вимоги:** lesson-12-5, module-13, 13 - Веб-скрапінг
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
  
  summary: `Підсумок уроку "Практика: обробка даних з модулями"

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
