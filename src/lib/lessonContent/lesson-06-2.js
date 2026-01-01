/**
 * Пакети та __init__.py
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_2 = {
  lessonId: "lesson-06-2",
  moduleId: "module-00",
  order: 2,
  title: "Пакети та __init__.py",
  
  learningObjectives: [
    "Організовувати код у пакети",
    "Використовувати __init__.py",
    "Створювати ієрархію пакетів",
    "Імпортувати з пакетів",
    "lesson-06-1",
    "lesson-06-3",
    "Стандартна бібліотека Python: os, sys, pathlib",
    "Використовувати os для роботи з системою"
],
  
  estimatedTime: 90,
  prerequisites: [
    "lesson-06-1",
    "lesson-06-3",
    "Стандартна бібліотека Python: os, sys, pathlib"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Пакети та __init__.py

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Організовувати код у пакети
- Використовувати __init__.py
- Створювати ієрархію пакетів
- Імпортувати з пакетів
- lesson-06-1
- lesson-06-3
- Стандартна бібліотека Python: os, sys, pathlib
- Використовувати os для роботи з системою

**Час на вивчення:** приблизно 90 хвилин

**Попередні вимоги:** lesson-06-1, lesson-06-3, Стандартна бібліотека Python: os, sys, pathlib
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
  
  summary: `Підсумок уроку "Пакети та __init__.py"

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
