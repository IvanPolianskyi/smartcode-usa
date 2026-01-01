/**
 * Скrapінг веб-сайтів
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_13_3 = {
  lessonId: "lesson-13-3",
  moduleId: "module-14",
  order: 3,
  title: "Скrapінг веб-сайтів",
  
  learningObjectives: [
    "Створити скрапер для веб-сайту",
    "Обробляти динамічні сторінки",
    "Зберігати отримані дані",
    "Дотримуватися правил robots.txt",
    "lesson-13-2",
    "lesson-13-4",
    "Практика: веб-скрапінг проект",
    "Створити повноцінний скрапер"
],
  
  estimatedTime: 120,
  prerequisites: [
    "lesson-13-2",
    "lesson-13-4",
    "Практика: веб-скрапінг проект"
],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: `Скrapінг веб-сайтів

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
- Створити скрапер для веб-сайту
- Обробляти динамічні сторінки
- Зберігати отримані дані
- Дотримуватися правил robots.txt
- lesson-13-2
- lesson-13-4
- Практика: веб-скрапінг проект
- Створити повноцінний скрапер

**Час на вивчення:** приблизно 120 хвилин

**Попередні вимоги:** lesson-13-2, lesson-13-4, Практика: веб-скрапінг проект
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
  
  summary: `Підсумок уроку "Скrapінг веб-сайтів"

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
