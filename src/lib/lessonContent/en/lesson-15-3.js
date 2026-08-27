/**
 * Lesson 15-3: POST, HTTP errors, and status codes
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_15_3 = {
  lessonId: "lesson-15-3",
  moduleId: "module-15",
  order: 3,
  title: "POST, HTTP errors, and status codes",

  learningObjectives: [
    "Create POST /items with a JSON body",
    "Return status 201 Created",
    "Use HTTPException for client errors",
    "Implement updating and deleting resources"
  ],

  prerequisites: ["lesson-15-2"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "HTTP status codes (main ones)",
        content: `| Code | Meaning |
|-----|----------|
| 200 | OK - successful GET/PUT |
| 201 | Created - resource created (POST) |
| 204 | No Content - success without a body (DELETE) |
| 400 | Bad Request - client error |
| 404 | Not Found - resource not found |
| 422 | Validation Error - Pydantic |
| 500 | Internal Server Error - server error |

The client (bot, frontend) **must** check the code, not only the JSON.`
      },
      {
        title: "POST with 201 Created",
        content: `\`\`\`python
from fastapi import FastAPI, status
from pydantic import BaseModel, Field

app = FastAPI()
items_db: list[dict] = []

class ItemCreate(BaseModel):
    name: str
    price: float = Field(gt=0)

@app.post("/items", status_code=status.HTTP_201_CREATED)
def create_item(payload: ItemCreate):
    new_id = len(items_db) + 1
    item = {"id": new_id, **payload.model_dump()}
    items_db.append(item)
    return item
\`\`\`

\`status_code=\` in the decorator sets the **success** code for the response.`
      },
      {
        title: "HTTPException",
        content: `\`\`\`python
from fastapi import HTTPException

@app.get("/items/{item_id}")
def get_item(item_id: int):
    for it in items_db:
        if it["id"] == item_id:
            return it
    raise HTTPException(
        status_code=404,
        detail=f"Item {item_id} not found",
    )

@app.post("/items")
def create_item(payload: ItemCreate):
    if payload.price < 0:
        raise HTTPException(status_code=400, detail="Price cannot be negative")
    ...
\`\`\`

**detail** - JSON \`{"detail": "..."}\` in the response. Do not show internal tracebacks to the client.`
      },
      {
        title: "PUT and DELETE",
        content: `\`\`\`python
class ItemUpdate(BaseModel):
    name: str | None = None
    price: float | None = Field(default=None, gt=0)

@app.put("/items/{item_id}")
def update_item(item_id: int, payload: ItemUpdate):
    for it in items_db:
        if it["id"] == item_id:
            data = payload.model_dump(exclude_unset=True)
            it.update(data)
            return it
    raise HTTPException(404, detail="Not found")

@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int):
    for i, it in enumerate(items_db):
        if it["id"] == item_id:
            items_db.pop(i)
            return
    raise HTTPException(404, detail="Not found")
\`\`\`

\`exclude_unset=True\` - updates only the fields that were sent (partial PATCH-like PUT).`
      },
      {
        title: "Testing in /docs",
        content: `In Swagger:

1. POST /items - Try it out → Execute → check 201
2. GET /items/{id} with a non-existent id → 404
3. POST with price=-1 → 422 from Pydantic or 400 from your code

This is a faster way to learn than curl, though curl is useful too:

\`\`\`bash
curl -X POST http://127.0.0.1:8000/items -H "Content-Type: application/json" -d "{\\"name\\":\\"A\\",\\"price\\": 10}"
\`\`\``
      },
      {
        title: "Idempotency (overview)",
        content: `**GET, PUT, DELETE** are often considered idempotent - repeating the request does not change the result an extra time.

**POST** creates a new resource each time - not idempotent.

In the learning API \`items_db\` is an in-memory list; after a server restart the data disappears.`
      },
      {
        title: "Summary",
        content: `In-memory CRUD: POST (201), GET, PUT, DELETE (204), errors via HTTPException. Lesson 15-4 - connecting a Telegram webhook.`
      }
    ]
  },

  codeExamples: [
    {
      title: "404 Not Found",
      code: `raise HTTPException(status_code=404, detail="Item not found")`,
      explanation: "The standard way to tell the client a resource is missing."
    },
    {
      title: "201 Created",
      code: `@app.post("/items", status_code=201)`,
      explanation: "Explicit success code for creation."
    }
  ],

  commonMistakes: [
    {
      mistake: "Returning 200 on POST creation",
      explanation: "Confuses REST semantics.",
      correctApproach: "status.HTTP_201_CREATED for a successful POST."
    },
    {
      mistake: "raise Exception instead of HTTPException",
      explanation: "The client gets 500 without a clear detail.",
      correctApproach: "HTTPException for expected errors (404, 400)."
    },
    {
      mistake: "DELETE returns a body with code 204",
      explanation: "204 must not have a body.",
      correctApproach: "return with no value for 204."
    }
  ],

  summary: `POST creates resources (201), HTTPException handles controlled errors, PUT/DELETE complete CRUD in the learning API.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which code usually means a resource was created successfully?",
        options: ["201", "404", "500", "301"],
        correctAnswer: 0,
        explanation: "201 Created - the standard for a successful POST."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you return 404 in FastAPI?",
        options: [
          "raise HTTPException(status_code=404, ...)",
          "return None",
          "print(404)",
          "app.status = 404"
        ],
        correctAnswer: 0,
        explanation: "HTTPException interrupts the handler and builds the response."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which code for a successful DELETE with no response body?",
        options: ["204", "201", "200", "422"],
        correctAnswer: 0,
        explanation: "204 No Content - typical for DELETE."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does model_dump(exclude_unset=True) do in PUT?",
        options: [
          "Only fields the client explicitly sent",
          "Deletes all fields",
          "Adds id automatically",
          "Disables validation"
        ],
        correctAnswer: 0,
        explanation: "Partial update without overwriting everything with None."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Pydantic validation errors in FastAPI usually give status 422.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True - Unprocessable Entity for an invalid request body."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
