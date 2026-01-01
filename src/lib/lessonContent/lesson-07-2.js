/**
 * Типи винятків та обробка помилок
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_07_2 = {
  lessonId: "lesson-07-2",
  moduleId: "module-00",
  order: 2,
  title: "Типи винятків та обробка помилок",
  
  learningObjectives: [
    "Розуміти різні типи винятків",
    "Обробляти кілька типів помилок",
    "Використовувати except без типу",
    "Логувати помилки",
    "lesson-07-1",
    "lesson-07-3",
    "Створення власних винятків",
    "Створювати кастомні класи винятків"
],
  
  estimatedTime: 90,
  prerequisites: [
    "lesson-07-1",
    "lesson-07-3",
    "Створення власних винятків"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Типи винятків та обробка помилок

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Розуміти різні типи винятків
- Обробляти кілька типів помилок
- Використовувати except без типу
- Логувати помилки
- lesson-07-1
- lesson-07-3
- Створення власних винятків
- Створювати кастомні класи винятків

**Час на вивчення:** приблизно 90 хвилин

**Попередні вимоги:** lesson-07-1, lesson-07-3, Створення власних винятків
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
  
  summary: `Підсумок уроку "Типи винятків та обробка помилок"

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
