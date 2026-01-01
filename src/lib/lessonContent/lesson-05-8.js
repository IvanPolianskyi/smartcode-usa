/**
 * Абстрактні класи та інтерфейси
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_8 = {
  lessonId: "lesson-05-8",
  moduleId: "module-00",
  order: 8,
  title: "Абстрактні класи та інтерфейси",
  
  learningObjectives: [
    "Використовувати абстрактні базові класи",
    "Реалізовувати інтерфейси",
    "Застосовувати ABC модуль",
    "Створювати контракти для класів",
    "lesson-05-7",
    "lesson-05-9",
    "Композиція vs наслідування"
],
  
  estimatedTime: 90,
  prerequisites: [
    "lesson-05-7",
    "lesson-05-9",
    "Композиція vs наслідування"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Абстрактні класи та інтерфейси

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Використовувати абстрактні базові класи
- Реалізовувати інтерфейси
- Застосовувати ABC модуль
- Створювати контракти для класів
- lesson-05-7
- lesson-05-9
- Композиція vs наслідування

**Час на вивчення:** приблизно 90 хвилин

**Попередні вимоги:** lesson-05-7, lesson-05-9, Композиція vs наслідування
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
  
  summary: `Підсумок уроку "Абстрактні класи та інтерфейси"

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
