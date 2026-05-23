/**
 * FastAPI: your first REST endpoint
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_15_1 = {
  lessonId: "lesson-15-1",
  moduleId: "module-15",
  order: 1,
  title: "FastAPI: your first REST endpoint",

  learningObjectives: [
    "Install fastapi and uvicorn",
    "Create an app and GET / route",
    "Run the server locally",
    "Open auto docs at /docs"
  ],

  prerequisites: ["lesson-14-4"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Why FastAPI",
            "content": "**FastAPI** is a modern Python REST framework:\n- Fast (built on Starlette)\n- Automatic OpenAPI docs\n- Validation with Pydantic\n\n```bash\npip install fastapi uvicorn[standard]\n```"
        },
        {
            "title": "Hello API",
            "content": "```python\nfrom fastapi import FastAPI\n\napp = FastAPI(title=\"Student API\")\n\n@app.get(\"/\")\ndef root():\n    return {\"message\": \"API is running\"}\n\n@app.get(\"/health\")\ndef health():\n    return {\"status\": \"ok\"}\n```\n\nRun: `uvicorn main:app --reload`\n\nOpen http://127.0.0.1:8000/docs"
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "You started FastAPI and explored interactive Swagger docs.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which command starts the server?",
        options: ["uvicorn main:app --reload","python manage.py run","npm start","flask run only"],
        correctAnswer: 0,
        explanation: "uvicorn is the ASGI server for FastAPI."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
