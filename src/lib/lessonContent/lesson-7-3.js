/**
 * Lesson 7-3: Деплой проектів (Heroku/Vercel)
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_3 = {
  lessonId: "lesson-7-3",
  moduleId: "module-7",
  order: 3,
  title: "Деплой проектів (Heroku/Vercel)",
  
  learningObjectives: [
    "Підготувати проект до деплою",
    "Деплоїти на Heroku або Vercel",
    "Налаштувати змінні середовища",
    "Моніторити додаток"
  ],
  
  estimatedTime: 135,
  prerequisites: ["lesson-7-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Підготовка проекту",
        content: `**requirements.txt:**
\`\`\`txt
Flask==2.3.0
flask-sqlalchemy==3.0.5
\`\`\`

**Procfile** (для Heroku):
\`\`\`txt
web: gunicorn app:app
\`\`\`

**runtime.txt** (для Heroku):
\`\`\`txt
python-3.11.0
\`\`\``
      },
      {
        title: "Деплой на Heroku",
        content: `**Встановлення CLI:**
\`\`\`bash
# Завантажити з heroku.com
\`\`\`

**Команди:**
\`\`\`bash
heroku login
heroku create my-app
git push heroku main
\`\`\``
      },
      {
        title: "Деплой на Vercel",
        content: `**Встановлення:**
\`\`\`bash
npm i -g vercel
\`\`\`

**Деплой:**
\`\`\`bash
vercel
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: requirements.txt",
      code: `Flask==2.3.0
flask-sqlalchemy==3.0.5
gunicorn==21.2.0`,
      explanation: "Файл requirements.txt для деплою."
    }
  ],
  
  commonMistakes: [],
  
  summary: `Деплой дозволяє зробити додаток доступним в інтернеті. Heroku та Vercel — популярні платформи.`,
  
  practiceTask: {
    title: "Деплой Flask додатку",
    description: "Підготуйте та задеплойте проект",
    problemStatement: "Створіть requirements.txt, Procfile та задеплойте Flask додаток.",
    solution: {
      code: `# requirements.txt
Flask==2.3.0
gunicorn==21.2.0

# Procfile
web: gunicorn app:app

# Команди деплою
heroku create my-app
git push heroku main`,
      explanation: "Базова підготовка до деплою."
    },
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке деплой?",
        options: ["Тестування", "Публікація додатку в інтернет", "Написання коду", "Відлагодження"],
        correctAnswer: 1,
        explanation: "Деплой — це публікація додатку, щоб він був доступний в інтернеті."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

