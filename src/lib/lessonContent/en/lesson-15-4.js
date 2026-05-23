/**
 * Practice: REST API + Telegram webhook
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_15_4 = {
  lessonId: "lesson-15-4",
  moduleId: "module-15",
  order: 4,
  title: "Practice: REST API + Telegram webhook",

  learningObjectives: [
    "Build a CRUD API for a task list",
    "Add POST /telegram/webhook",
    "Connect FastAPI with bot logic",
    "Document deploy with ngrok or hosting"
  ],

  prerequisites: ["lesson-15-3"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Project",
            "content": "**Mini backend:**\n- GET/POST /tasks - todo list\n- POST /telegram/webhook - receives Telegram Update\n\n```python\nfrom fastapi import FastAPI, Request\n\n@app.post(\"/telegram/webhook\")\nasync def telegram_webhook(request: Request):\n    data = await request.json()\n    # handle message.text\n    return {\"ok\": True}\n```\n\nLocally: ngrok http 8000, then setWebhook to the public URL."
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "You combined a REST API and a Telegram webhook in one FastAPI app.",

  practiceTask: {
    "title": "Tasks API + webhook",
    "description": "CRUD for tasks plus one working webhook endpoint.",
    "hints": [
      "Test via /docs first",
      "Webhook needs an HTTPS URL"
    ]
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "A Telegram webhook requires…",
        options: ["A public HTTPS URL","localhost only","Tkinter","SMTP"],
        correctAnswer: 0,
        explanation: "Telegram POSTs updates only to reachable HTTPS endpoints."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
