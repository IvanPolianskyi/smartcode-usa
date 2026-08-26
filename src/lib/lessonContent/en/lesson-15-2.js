/**
 * Lesson 15-2: Path parameters, query, and Pydantic models
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_15_2 = {
  lessonId: "lesson-15-2",
  moduleId: "module-15",
  order: 2,
  title: "Path parameters, query, and Pydantic models",

  learningObjectives: [
    "Use path parameters /items/{id}",
    "Add query parameters skip and limit",
    "Describe BaseModel models",
    "Return typed responses with validation"
  ],

  prerequisites: ["lesson-15-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Path parameters",
        content: `URL segments in curly braces are **path parameters**:

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
def get_item(item_id: int):
    return {"item_id": item_id}
\`\`\`

Request \`GET /items/42\` → \`item_id=42\`. FastAPI **converts the type**; if you pass \`/items/abc\` - error 422 with an explanation in /docs.

**Order:** static paths above dynamic ones:

\`\`\`python
@app.get("/items/special")   # first
def special(): ...

@app.get("/items/{item_id}") # then
def get_item(item_id: int): ...
\`\`\``
      },
      {
        title: "Query parameters",
        content: `Parameters after \`?\` in the URL are **query**:

\`GET /items?skip=0&limit=10\`

\`\`\`python
@app.get("/items")
def list_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit, "items": []}
\`\`\`

- Default values make a parameter **optional**
- Without a default - the parameter is required

\`\`\`python
from typing import Optional

@app.get("/search")
def search(q: Optional[str] = None):
    return {"q": q}
\`\`\``
      },
      {
        title: "Pydantic BaseModel",
        content: `**Pydantic** describes JSON structure and validates types:

\`\`\`python
from pydantic import BaseModel, Field

class Item(BaseModel):
    id: int
    name: str = Field(..., min_length=1, max_length=100)
    price: float = Field(gt=0, description="Price > 0")
    tags: list[str] = []

class ItemCreate(BaseModel):
    name: str
    price: float
\`\`\`

**Response with a model:**

\`\`\`python
@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int):
    return Item(id=item_id, name="Book", price=99.5)
\`\`\`

\`response_model\` filters extra fields and builds the schema in OpenAPI.`
      },
      {
        title: "Request body (POST overview)",
        content: `POST accepts JSON in the body - a BaseModel-typed parameter:

\`\`\`python
items_db: list[Item] = []

@app.post("/items", response_model=Item)
def create_item(payload: ItemCreate):
    new_id = len(items_db) + 1
    item = Item(id=new_id, name=payload.name, price=payload.price)
    items_db.append(item)
    return item
\`\`\`

Invalid JSON (for example \`price: "free"\`) → **422 Unprocessable Entity** with validation details - convenient to test in /docs.`
      },
      {
        title: "In-memory pagination",
        content: `\`\`\`python
@app.get("/items", response_model=list[Item])
def list_items(skip: int = 0, limit: int = 10):
    return items_db[skip : skip + limit]
\`\`\`

**skip** - how many to skip, **limit** - how many to return. In a real project skip/limit map to SQL OFFSET/LIMIT.`
      },
      {
        title: "Optional and default values",
        content: `\`Optional[str] = None\` - the field may be omitted in JSON.

\`limit: int = Query(10, le=100)\` - query limits via \`Query\` from fastapi (max 100).

Validation runs **before** entering the function body - fewer ifs in the handler.`
      },
      {
        title: "Summary",
        content: `Path - resource identifier, query - filters and pagination, Pydantic - data contract. Lesson 15-3 - status codes and HTTPException.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Path + query",
      code: `@app.get("/users/{user_id}")
def user(user_id: int, active: bool = True):
    return {"user_id": user_id, "active": active}`,
      explanation: "user_id from the path, active from query ?active=false."
    },
    {
      title: "ItemCreate",
      code: `class ItemCreate(BaseModel):
    name: str
    price: float`,
      explanation: "A separate model for creation without an id from the client."
    }
  ],

  commonMistakes: [
    {
      mistake: "One path /items/{id} overrides /items/special",
      explanation: "special is treated as an id.",
      correctApproach: "Declare static routes above."
    },
    {
      mistake: "Returning a dict with extra fields when using response_model",
      explanation: "They will be filtered out - sometimes unexpectedly.",
      correctApproach: "Return a model instance or a dict with the needed keys."
    },
    {
      mistake: "price: float without constraints",
      explanation: "Negative prices pass validation.",
      correctApproach: "Field(gt=0) or a check in the handler."
    }
  ],

  summary: `Path and query parameterize the URL; Pydantic validates JSON and documents the API in /docs.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is BaseModel used for in FastAPI?",
        options: [
          "Data validation and serialization",
          "Drawing a GUI",
          "Sending email",
          "Parsing HTML"
        ],
        correctAnswer: 0,
        explanation: "Pydantic checks types and builds a JSON schema."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where is the skip parameter passed in GET /items?skip=5?",
        options: ["Query parameter", "Path parameter", "Header only", "Cookie"],
        correctAnswer: 0,
        explanation: "After ? - query parameters."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which status for an invalid field type in JSON?",
        options: ["422", "200", "301", "418"],
        correctAnswer: 0,
        explanation: "422 Unprocessable Entity - the standard for validation errors."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does response_model=Item do?",
        options: [
          "Filters the response and describes the schema in OpenAPI",
          "Deletes the endpoint",
          "Changes the method to DELETE",
          "Disables /docs"
        ],
        correctAnswer: 0,
        explanation: "response_model sets the response shape for the client and documentation."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Path parameter item_id: int is automatically converted from the URL string.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True - FastAPI parses types from annotations."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
