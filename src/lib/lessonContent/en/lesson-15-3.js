/**
 * POST, HTTP errors, and status codes
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_15_3 = {
  lessonId: "lesson-15-3",
  moduleId: "module-15",
  order: 3,
  title: "POST, HTTP errors, and status codes",

  learningObjectives: [
    "Create POST /items with a JSON body",
    "Return 201 Created",
    "Use HTTPException",
    "Update and delete resources"
  ],

  prerequisites: ["lesson-15-2"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "POST and errors",
            "content": "```python\nfrom fastapi import FastAPI, HTTPException, status\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass ItemCreate(BaseModel):\n    name: str\n    price: float\n\n@app.post(\"/items\", status_code=status.HTTP_201_CREATED)\ndef create_item(payload: ItemCreate):\n    if payload.price < 0:\n        raise HTTPException(status_code=400, detail=\"Price cannot be negative\")\n    new_id = len(items_db) + 1\n    item = {\"id\": new_id, **payload.model_dump()}\n    items_db.append(item)\n    return item\n```"
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "POST creates resources; HTTPException returns clear client errors.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which status code usually means successful creation?",
        options: ["201","404","500","301"],
        correctAnswer: 0,
        explanation: "201 Created is standard for POST."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
