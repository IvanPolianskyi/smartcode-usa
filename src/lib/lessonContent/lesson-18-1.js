/**
 * Milestone Project 3: Фінальний проект
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_16_1 = {
  lessonId: "lesson-14-1",
  moduleId: "module-16",
  order: 1,
  title: "Milestone Project 3: Фінальний проект",
  
  learningObjectives: [
    "Створити повноцінну програму",
    "Застосувати всі набуті знання",
    "Використати веб-скрапінг, обробку файлів, email",
    "Створити модульну архітектуру",
    "Реалізувати обробку помилок",
    "Створити документацію",
    "Протестувати програму",
    "lesson-15-5"
],
  
  estimatedTime: 480,
  prerequisites: [
    "lesson-15-5",
    "module-16"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Milestone Project 3: Фінальний проект

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Створити повноцінну програму
- Застосувати всі набуті знання
- Використати веб-скрапінг, обробку файлів, email
- Створити модульну архітектуру
- Реалізувати обробку помилок
- Створити документацію
- Протестувати програму
- lesson-17-5

**Час на вивчення:** приблизно 480 хвилин

**Попередні вимоги:** lesson-17-5, module-19
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
  
  summary: `Підсумок уроку "Milestone Project 3: Фінальний проект"

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
