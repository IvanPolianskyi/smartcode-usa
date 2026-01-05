/**
 * Створення першого вікна. Tk(), mainloop()
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_16_3 = {
  lessonId: "lesson-14-3",
  moduleId: "module-16",
  order: 2,
  title: "Створення першого вікна. Tk(), mainloop()",
  
  learningObjectives: [
    "Створити перше вікно",
    "Використовувати Tk() та mainloop()",
    "Налаштувати розміри та заголовок",
    "Закривати вікно",
    "lesson-16-2",
    "lesson-16-4",
    "Віджети: Label, Button, Entry, Text",
    "Використовувати Label для тексту"
],
  
  estimatedTime: 75,
  prerequisites: [
    "lesson-16-2",
    "lesson-16-4",
    "Віджети: Label, Button, Entry, Text"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Створення першого вікна. Tk(), mainloop()

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Створити перше вікно
- Використовувати Tk() та mainloop()
- Налаштувати розміри та заголовок
- Закривати вікно
- lesson-19-1
- lesson-19-3
- Віджети: Label, Button, Entry, Text
- Використовувати Label для тексту

**Час на вивчення:** приблизно 75 хвилин

**Попередні вимоги:** lesson-19-1, lesson-19-3, Віджети: Label, Button, Entry, Text
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
  
  summary: `Підсумок уроку "Створення першого вікна. Tk(), mainloop()"

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
