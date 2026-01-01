/**
 * Dataclasses
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_7 = {
  lessonId: "lesson-05-7",
  moduleId: "module-00",
  order: 7,
  title: "Dataclasses",
  
  learningObjectives: [
    "Використовувати dataclasses для спрощення класів",
    "Автоматично генерувати методи",
    "Застосовувати декоратори dataclass",
    "Працювати з полями та значеннями за замовчуванням",
    "lesson-05-6",
    "lesson-05-8",
    "Абстрактні класи та інтерфейси"
],
  
  estimatedTime: 75,
  prerequisites: [
    "lesson-05-6",
    "lesson-05-8",
    "Абстрактні класи та інтерфейси"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Dataclasses

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Використовувати dataclasses для спрощення класів
- Автоматично генерувати методи
- Застосовувати декоратори dataclass
- Працювати з полями та значеннями за замовчуванням
- lesson-05-6
- lesson-05-8
- Абстрактні класи та інтерфейси

**Час на вивчення:** приблизно 75 хвилин

**Попередні вимоги:** lesson-05-6, lesson-05-8, Абстрактні класи та інтерфейси
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
  
  summary: `Підсумок уроку "Dataclasses"

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
