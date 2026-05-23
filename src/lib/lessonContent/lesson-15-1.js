/**
 * FastAPI: перший REST endpoint
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_1 = {
  lessonId: "lesson-15-1",
  moduleId: "module-15",
  order: 1,
  title: "FastAPI: перший REST endpoint",

  learningObjectives: [
    "Встановити fastapi та uvicorn",
    "Створити app і маршрут GET /",
    "Запустити сервер локально",
    "Переглянути автодокументацію /docs"
  ],

  prerequisites: ["lesson-14-4"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Чому FastAPI",
            "content": "**FastAPI** - сучасний фреймворк для REST API на Python:\n- Швидкий (на базі Starlette)\n- Автоматична OpenAPI документація\n- Валідація через Pydantic\n\n```bash\npip install fastapi uvicorn[standard]\n```"
        },
        {
            "title": "Hello API",
            "content": "```python\nfrom fastapi import FastAPI\n\napp = FastAPI(title=\"Student API\")\n\n@app.get(\"/\")\ndef root():\n    return {\"message\": \"API працює\"}\n\n@app.get(\"/health\")\ndef health():\n    return {\"status\": \"ok\"}\n```\n\nЗапуск: `uvicorn main:app --reload`\n\nВідкрийте http://127.0.0.1:8000/docs"
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "Ви запустили FastAPI і побачили інтерактивну документацію Swagger.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка команда запускає сервер?",
        options: ["uvicorn main:app --reload","python manage.py run","npm start","flask run only"],
        correctAnswer: 0,
        explanation: "uvicorn - ASGI сервер для FastAPI."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
