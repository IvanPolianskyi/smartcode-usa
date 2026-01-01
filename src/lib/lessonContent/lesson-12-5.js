/**
 * Робота з CSV та Excel
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_5 = {
  lessonId: "lesson-12-5",
  moduleId: "module-13",
  order: 5,
  title: "Робота з CSV та Excel",
  
  learningObjectives: [
    "Читати та записувати CSV файли",
    "Працювати з Excel файлами",
    "Обробляти структуровані дані",
    "Використовувати pandas для таблиць",
    "lesson-12-4",
    "lesson-12-6",
    "Практика: обробка даних з модулями",
    "Застосувати розширені модулі"
],
  
  estimatedTime: 90,
  prerequisites: [
    "lesson-12-4",
    "lesson-12-6",
    "Практика: обробка даних з модулями"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Робота з CSV та Excel

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Читати та записувати CSV файли
- Працювати з Excel файлами
- Обробляти структуровані дані
- Використовувати pandas для таблиць
- lesson-12-4
- lesson-12-6
- Практика: обробка даних з модулями
- Застосувати розширені модулі

**Час на вивчення:** приблизно 90 хвилин

**Попередні вимоги:** lesson-12-4, lesson-12-6, Практика: обробка даних з модулями
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
  
  summary: `Підсумок уроку "Робота з CSV та Excel"

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
