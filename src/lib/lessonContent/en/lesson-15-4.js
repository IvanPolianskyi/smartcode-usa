/**
 * Lesson 15-4: Practice: REST API + Telegram webhook
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_15_4 = {
  lessonId: "lesson-15-4",
  moduleId: "module-15",
  order: 4,
  title: "Practice: REST API + Telegram webhook",

  learningObjectives: [
    "Build a CRUD API for a task list",
    "Add endpoint POST /telegram/webhook",
    "Connect FastAPI with bot logic",
    "Understand deployment via ngrok or hosting"
  ],

  prerequisites: ["lesson-15-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Architecture: API + webhook",
        content: `**Polling** (module 14) — your script asks Telegram. **Webhook** — Telegram sends POST to your URL on each new message.

\`\`\`
User → Telegram → HTTPS POST → your FastAPI /telegram/webhook
                              ↓
                         process Update
                              ↓
                    optional: CRUD /tasks
\`\`\`

Webhook on a server advantage: no constant polling process on your PC.`
      },
      {
        title: "CRUD /tasks in FastAPI",
        content: `\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
tasks_db: list[dict] = []

class TaskCreate(BaseModel):
    title: str

class Task(BaseModel):
    id: int
    title: str
    done: bool = False

@app.get("/tasks", response_model=list[Task])
def list_tasks():
    return tasks_db

@app.post("/tasks", response_model=Task, status_code=201)
def create_task(payload: TaskCreate):
    t = Task(id=len(tasks_db) + 1, title=payload.title)
    tasks_db.append(t.model_dump())
    return t

@app.patch("/tasks/{task_id}/done")
def mark_done(task_id: int):
    for t in tasks_db:
        if t["id"] == task_id:
            t["done"] = True
            return t
    raise HTTPException(404, detail="Task not found")
\`\`\`

Test in /docs before connecting Telegram.`
      },
      {
        title: "Webhook endpoint",
        content: `\`\`\`python
from fastapi import Request

@app.post("/telegram/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    # data is a Telegram Update object
    message = data.get("message")
    if message and "text" in message:
        text = message["text"]
        chat_id = message["chat"]["id"]
        # here: call sendMessage or shared bot function
        if text == "/tasks":
            # return tasks_db list to chat (via Bot API)
            pass
    return {"ok": True}
\`\`\`

Telegram **expects a quick response** (~60 s). Move heavy work to the background (for the course — keep logic short).`
      },
      {
        title: "setWebhook and HTTPS",
        content: `Locally \`127.0.0.1:8000\` is not reachable from the internet. Use a **tunnel**:

\`\`\`bash
uvicorn main:app --host 0.0.0.0 --port 8000
ngrok http 8000
\`\`\`

You get a URL like \`https://xxxx.ngrok-free.app\`. Set the webhook:

\`\`\`python
import os, requests
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
WEBHOOK_URL = "https://xxxx.ngrok-free.app/telegram/webhook"
requests.post(
    f"https://api.telegram.org/bot{TOKEN}/setWebhook",
    json={"url": WEBHOOK_URL},
)
\`\`\`

First: \`deleteWebhook\` if you used polling. On hosting (Railway, Render, VPS) — same idea with permanent HTTPS.`
      },
      {
        title: "Webhook security (overview)",
        content: `- Bot token — only in .env
- Do not log full Updates with personal data to public services
- Optional: secret_token in setWebhook and check header \`X-Telegram-Bot-Api-Secret-Token\`

For a learning project HTTPS + private ngrok URL is enough.`
      },
      {
        title: "Local webhook testing",
        content: `1. Start uvicorn
2. ngrok http 8000
3. setWebhook to the https URL
4. Message the bot — server logs should show POST /telegram/webhook

If 404 — check the path; if 502 — server not running.`
      },
      {
        title: "Python course summary",
        content: `You combined REST (CRUD tasks) and an entry point for Telegram. README: how to run uvicorn, enable ngrok, test /docs and webhook. This finishes module 15 and the chain "bot → API → deploy".`
      }
    ]
  },

  codeExamples: [
    {
      title: "Webhook handler",
      code: `@app.post("/telegram/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    return {"ok": True}`,
      explanation: "Minimal response so Telegram does not retry."
    },
    {
      title: "setWebhook",
      code: `requests.post(f"https://api.telegram.org/bot{TOKEN}/setWebhook",
                  json={"url": WEBHOOK_URL})`,
      explanation: "Links the bot to a public HTTPS URL."
    }
  ],

  commonMistakes: [
    {
      mistake: "setWebhook to http://127.0.0.1",
      explanation: "Telegram will not deliver Updates.",
      correctApproach: "Public HTTPS (ngrok or hosting)."
    },
    {
      mistake: "Polling and webhook at the same time",
      explanation: "Conflicting ways to receive Updates.",
      correctApproach: "deleteWebhook before polling; or webhook only on the server."
    },
    {
      mistake: "Not returning {\"ok\": True} quickly",
      explanation: "Telegram retries requests.",
      correctApproach: "Quick response; heavy work — async/background."
    }
  ],

  summary: `FastAPI serves CRUD and accepts the Telegram webhook. ngrok provides HTTPS for local development; production uses a permanent domain.`,

  practiceTask: {
    title: "Tasks API + webhook",
    description: "CRUD for tasks and one working POST /telegram/webhook that handles message text.",
    hints: [
      "Test /docs first",
      "Webhook needs a public HTTPS URL",
      "Stop run_polling() after setWebhook"
    ]
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Telegram webhook requires…",
        options: [
          "A public HTTPS URL",
          "Localhost HTTP only",
          "Tkinter",
          "SMTP without TLS"
        ],
        correctAnswer: 0,
        explanation: "Telegram sends POST only to a reachable HTTPS endpoint."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why use ngrok in local development?",
        options: [
          "Expose an HTTPS tunnel to localhost",
          "Install Python",
          "Replace Pydantic",
          "Delete the token"
        ],
        correctAnswer: 0,
        explanation: "ngrok gives a public URL to your local port."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What should you not do while webhook is active?",
        options: [
          "run_polling() on the same bot",
          "GET /tasks",
          "Use /docs",
          "Store tasks in a list"
        ],
        correctAnswer: 0,
        explanation: "Polling and webhook conflict for one bot."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which HTTP method receives Updates from Telegram?",
        options: ["POST", "GET", "DELETE", "OPTIONS only"],
        correctAnswer: 0,
        explanation: "Telegram sends JSON in the body via POST."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "After setting up webhook the bot can receive messages without run_polling().",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True — the server receives POST from Telegram on the webhook URL."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
