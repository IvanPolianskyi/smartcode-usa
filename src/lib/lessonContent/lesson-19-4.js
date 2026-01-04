/**
 * Розміщення елементів: pack, grid, place
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_19_4 = {
  lessonId: "lesson-19-4",
  moduleId: "module-16",
  order: 4,
  title: "Розміщення елементів: pack, grid, place",
  
  learningObjectives: [
    "Використовувати pack для розміщення",
    "Застосовувати grid для таблиць",
    "Використовувати place для точкового розміщення",
    "Вибирати правильний метод",
    "lesson-19-3",
    "lesson-19-5",
    "Обробка подій та практика: GUI-застосунок"
],
  
  estimatedTime: 90,
  prerequisites: [
    "lesson-19-3",
    "lesson-19-5",
    "Обробка подій та практика: GUI-застосунок"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Розміщення елементів: pack, grid, place

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Використовувати pack для розміщення
- Застосовувати grid для таблиць
- Використовувати place для точкового розміщення
- Вибирати правильний метод
- lesson-19-3
- lesson-19-5
- Обробка подій та практика: GUI-застосунок

**Час на вивчення:** приблизно 90 хвилин

**Попередні вимоги:** lesson-19-3, lesson-19-5, Обробка подій та практика: GUI-застосунок
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
  
  summary: `Підсумок уроку "Розміщення елементів: pack, grid, place"

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
