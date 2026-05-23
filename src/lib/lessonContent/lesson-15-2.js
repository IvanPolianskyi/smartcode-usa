/**
 * Параметри шляху, query та моделі Pydantic
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_2 = {
  lessonId: "lesson-15-2",
  moduleId: "module-15",
  order: 2,
  title: "Параметри шляху, query та моделі Pydantic",

  learningObjectives: [
    "Використовувати path parameters /items/{id}",
    "Додавати query параметри skip, limit",
    "Описувати моделі BaseModel",
    "Повертати типізовані відповіді"
  ],

  prerequisites: ["lesson-15-1"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Path і Query",
            "content": "```python\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Item(BaseModel):\n    id: int\n    name: str\n    price: float\n\nitems_db: list[Item] = []\n\n@app.get(\"/items/{item_id}\")\ndef get_item(item_id: int):\n    for it in items_db:\n        if it.id == item_id:\n            return it\n    return {\"error\": \"not found\"}\n\n@app.get(\"/items\")\ndef list_items(skip: int = 0, limit: int = 10):\n    return items_db[skip : skip + limit]\n```"
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "Маршрути з параметрами та Pydantic-моделі описують контракт API.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Для чого використовують BaseModel?",
        options: ["Валідація та серіалізація даних","Малювання GUI","Відправка email","Скрапінг HTML"],
        correctAnswer: 0,
        explanation: "Pydantic перевіряє типи полів."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
