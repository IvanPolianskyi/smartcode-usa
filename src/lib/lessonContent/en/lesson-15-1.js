/**
 * Lesson 15-1: FastAPI: first REST endpoint
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_15_1 = {
  lessonId: "lesson-15-1",
  moduleId: "module-15",
  order: 1,
  title: "FastAPI: first REST endpoint",

  learningObjectives: [
    "Install fastapi and uvicorn",
    "Create a FastAPI app and a GET / route",
    "Run the ASGI server locally",
    "Open auto-docs at /docs and /redoc"
  ],

  prerequisites: ["lesson-14-4"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What is a REST API",
        content: `A **REST API** is a way to exchange data over HTTP: a client (browser, bot, mobile app) sends a request, the server returns **JSON**.

| Method | Typical action |
|-------|------------|
| GET | Get data |
| POST | Create |
| PUT/PATCH | Update |
| DELETE | Delete |

**FastAPI** is a modern Python framework:

- Fast (Starlette + uvicorn)
- Automatic OpenAPI documentation (Swagger)
- Type validation (Pydantic) - lessons 15-2 and 15-3

\`\`\`bash
pip install "fastapi[standard]" uvicorn
\`\`\``
      },
      {
        title: "First application",
        content: `File \`main.py\`:

\`\`\`python
from fastapi import FastAPI

app = FastAPI(
    title="Student API",
    description="Learning REST API",
    version="0.1.0",
)

@app.get("/")
def root():
    return {"message": "API is running", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "ok"}
\`\`\`

**Run:**

\`\`\`bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
\`\`\`

- \`main:app\` - module \`main\`, object \`app\`
- \`--reload\` - restart on code changes (development only)

Open:

- http://127.0.0.1:8000/ - JSON response
- http://127.0.0.1:8000/docs - Swagger UI
- http://127.0.0.1:8000/redoc - alternative documentation`
      },
      {
        title: "Routes and response types",
        content: `The \`@app.get("/path")\` decorator registers a **path** and an **HTTP method**.

\`\`\`python
@app.get("/items/count")
def items_count():
    return {"count": 42}

@app.get("/greet/{name}")
def greet(name: str):
    return {"hello": name}
\`\`\`

FastAPI automatically serializes dict/list to JSON. For an explicit response schema we will add Pydantic models later.

**Default status code** for GET is 200 OK.`
      },
      {
        title: "Async endpoints (overview)",
        content: `You can declare \`async def\` - useful when working with a DB or HTTP clients:

\`\`\`python
@app.get("/slow")
async def slow():
    return {"done": True}
\`\`\`

For simple learning handlers a regular \`def\` is enough. Uvicorn supports both.`
      },
      {
        title: "Link to Telegram (module overview)",
        content: `In production a bot often works via **webhook**: Telegram sends a POST to your FastAPI endpoint (lesson 15-4), instead of polling on a home PC.

For now you build the foundation: a local API + /docs for testing requests.`
      },
      {
        title: "Testing in Swagger (/docs)",
        content: `On the /docs page:

1. Expand GET /
2. **Try it out** → **Execute**
3. Check the Response body and Status 200

For POST (lesson 15-2+) a JSON form appears - you can send test data without Postman.

**OpenAPI JSON:** \`/openapi.json\` - schema for client generators.`
      },
      {
        title: "Learning project structure",
        content: `\`\`\`
my_api/
  main.py          # app = FastAPI()
  requirements.txt
  .env.example     # no secrets
\`\`\`

One \`main.py\` file is enough for the course; in larger projects routers go into \`routers/items.py\` with \`APIRouter\`.`
      },
      {
        title: "Summary",
        content: `FastAPI + uvicorn give you a local REST server and interactive docs. Next lesson - path/query parameters and Pydantic models.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Minimal app",
      code: `from fastapi import FastAPI
app = FastAPI()
@app.get("/")
def root():
    return {"ok": True}`,
      explanation: "Three lines - already a working API."
    },
    {
      title: "Running uvicorn",
      code: `uvicorn main:app --reload --port 8000`,
      explanation: "ASGI server for serving FastAPI."
    }
  ],

  commonMistakes: [
    {
      mistake: "Running python main.py without uvicorn",
      explanation: "FastAPI is an ASGI app; a server is required.",
      correctApproach: "uvicorn main:app --reload."
    },
    {
      mistake: "Confusing the /docs path with a route in code",
      explanation: "/docs is generated automatically.",
      correctApproach: "Do not create your own @app.get('/docs') unless needed."
    },
    {
      mistake: "--reload in production",
      explanation: "Unsafe and slow.",
      correctApproach: "reload only locally; on the server - a process manager without reload."
    }
  ],

  summary: `You launched FastAPI, created GET routes, and opened Swagger at /docs. Next - path parameters, query, and Pydantic.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which command starts the development server?",
        options: [
          "uvicorn main:app --reload",
          "python manage.py run",
          "npm start",
          "flask run only"
        ],
        correctAnswer: 0,
        explanation: "uvicorn is the ASGI server for FastAPI."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where is the interactive Swagger documentation?",
        options: ["/docs", "/api/swagger-hidden", "/telegram", "/smtp"],
        correctAnswer: 0,
        explanation: "FastAPI automatically mounts Swagger UI at /docs."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does a typical GET endpoint return in the course examples?",
        options: ["JSON (dict/list)", "An HTML page", "A ZIP archive", "Only plain text"],
        correctAnswer: 0,
        explanation: "REST APIs in the course return JSON."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does main:app mean in uvicorn main:app?",
        options: [
          "File main.py, variable app",
          "Folder main/app",
          "Command app in main",
          "Port main"
        ],
        correctAnswer: 0,
        explanation: "module:variable - the standard uvicorn format."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "For FastAPI you must install Django.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False - FastAPI works on its own with uvicorn."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
