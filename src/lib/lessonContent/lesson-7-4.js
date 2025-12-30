/**
 * Lesson 7-4: Фінальний проект - Повноцінний веб-додаток
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_4 = {
  lessonId: "lesson-7-4",
  moduleId: "module-7",
  order: 4,
  title: "Фінальний проект - Повноцінний веб-додаток",
  
  learningObjectives: [
    "Створити фінальний проект",
    "Застосувати всі навички",
    "Написати тести",
    "Деплоїти проект"
  ],
  
  estimatedTime: 480,
  prerequisites: ["lesson-7-3"],
  isProject: true,
  isFinalProject: true,
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд фінального проекту",
        content: `Створіть повноцінний веб-додаток, який об'єднує всі навички курсу:

**Вимоги:**
- Flask веб-додаток
- База даних (SQLite/SQLAlchemy)
- REST API
- Тести (pytest)
- Деплой на Heroku/Vercel
- Git репозиторій

**Можливі теми:**
- Система управління завданнями
- Блог платформа
- Система управління студентами
- Електронна бібліотека`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Структура проекту",
      code: `my-project/
├── app.py
├── models.py
├── requirements.txt
├── Procfile
├── tests/
│   └── test_app.py
├── templates/
│   └── index.html
└── static/
    └── style.css`,
      explanation: "Повна структура фінального проекту."
    }
  ],
  
  commonMistakes: [],
  
  summary: `Фінальний проект об'єднує всі навички курсу: Python, ООП, Flask, БД, тестування, Git, деплой.`,
  
  practiceTask: {
    title: "Фінальний проект",
    description: "Створіть повноцінний веб-додаток",
    problemStatement: "Створіть веб-додаток з усіма вимогами: Flask, БД, API, тести, деплой.",
    solution: {
      code: `# Це комплексний проект, який об'єднує всі навички
# Створіть структуру проекту з усіма компонентами
# Напишіть тести
# Задеплойте на Heroku/Vercel`,
      explanation: "Фінальний проект потребує всіх навичок курсу."
    },
    difficulty: "advanced"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що об'єднує фінальний проект?",
        options: ["Тільки Flask", "Всі навички курсу", "Тільки тести", "Тільки деплой"],
        correctAnswer: 1,
        explanation: "Фінальний проект об'єднує всі навички, вивчені протягом курсу."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

