/**
 * Практика: REST API + webhook для Telegram
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_4 = {
  lessonId: "lesson-15-4",
  moduleId: "module-15",
  order: 4,
  title: "Практика: REST API + webhook для Telegram",

  learningObjectives: [
    "Зібрати CRUD API для списку задач",
    "Додати endpoint POST /telegram/webhook",
    "Зв'язати FastAPI з логікою бота",
    "Описати деплой (ngrok / хостинг)"
  ],

  prerequisites: ["lesson-15-3"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Проєкт",
            "content": "**Міні-бекенд:**\n- GET/POST /tasks - список справ\n- POST /telegram/webhook - приймає Update від Telegram\n\n```python\nfrom fastapi import FastAPI, Request\n\n@app.post(\"/telegram/webhook\")\nasync def telegram_webhook(request: Request):\n    data = await request.json()\n    # обробка message.text\n    return {\"ok\": True}\n```\n\nЛокально: ngrok http 8000, потім setWebhook на публічний URL."
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "Ви поєднали REST API та Telegram webhook в одному FastAPI-додатку.",

  practiceTask: {
    "title": "Tasks API + webhook",
    "description": "CRUD для tasks і один робочий webhook endpoint.",
    "hints": [
      "Спочатку перевірте /docs",
      "Webhook потребує HTTPS URL"
    ]
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Webhook Telegram вимагає…",
        options: ["Публічний HTTPS URL","Лише localhost","Tkinter","SMTP"],
        correctAnswer: 0,
        explanation: "Telegram надсилає POST лише на доступний HTTPS endpoint."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
