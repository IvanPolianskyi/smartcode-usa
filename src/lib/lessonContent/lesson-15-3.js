/**
 * POST, помилки HTTP та статус-коди
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_3 = {
  lessonId: "lesson-15-3",
  moduleId: "module-15",
  order: 3,
  title: "POST, помилки HTTP та статус-коди",

  learningObjectives: [
    "Створювати POST /items з тілом JSON",
    "Повертати статус 201 Created",
    "Використовувати HTTPException",
    "Оновлювати та видаляти ресурси"
  ],

  prerequisites: ["lesson-15-2"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "POST і помилки",
            "content": "```python\nfrom fastapi import FastAPI, HTTPException, status\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass ItemCreate(BaseModel):\n    name: str\n    price: float\n\n@app.post(\"/items\", status_code=status.HTTP_201_CREATED)\ndef create_item(payload: ItemCreate):\n    if payload.price < 0:\n        raise HTTPException(status_code=400, detail=\"Ціна не може бути від'ємною\")\n    new_id = len(items_db) + 1\n    item = {\"id\": new_id, **payload.model_dump()}\n    items_db.append(item)\n    return item\n```"
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "POST створює ресурси, HTTPException повертає зрозумілі помилки клієнту.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який код зазвичай означає успішне створення?",
        options: ["201","404","500","301"],
        correctAnswer: 0,
        explanation: "201 Created - стандарт для POST."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
