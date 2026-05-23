/**
 * Path, query parameters, and Pydantic models
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_15_2 = {
  lessonId: "lesson-15-2",
  moduleId: "module-15",
  order: 2,
  title: "Path, query parameters, and Pydantic models",

  learningObjectives: [
    "Use path parameters /items/{id}",
    "Add query params skip and limit",
    "Define BaseModel schemas",
    "Return typed responses"
  ],

  prerequisites: ["lesson-15-1"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Path and Query",
            "content": "```python\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Item(BaseModel):\n    id: int\n    name: str\n    price: float\n\nitems_db: list[Item] = []\n\n@app.get(\"/items/{item_id}\")\ndef get_item(item_id: int):\n    for it in items_db:\n        if it.id == item_id:\n            return it\n    return {\"error\": \"not found\"}\n\n@app.get(\"/items\")\ndef list_items(skip: int = 0, limit: int = 10):\n    return items_db[skip : skip + limit]\n```"
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "Parameterized routes and Pydantic models define your API contract.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is BaseModel used for?",
        options: ["Data validation and serialization","Drawing GUIs","Sending email","HTML scraping"],
        correctAnswer: 0,
        explanation: "Pydantic validates field types."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
