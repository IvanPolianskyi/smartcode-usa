/**
 * Lesson 15-4: Practice: REST API + Telegram webhook
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_15_4 = {
  lessonId: "lesson-15-4",
  moduleId: "module-15",
  order: 4,
  title: "Practice: REST API + Telegram webhook",

  learningObjectives: [
    "Build a CRUD API for a task list",
    "Add endpoint POST /telegram/webhook",
    "Connect FastAPI to bot logic",
    "Understand deployment via ngrok or hosting"
  ],

  prerequisites: ["lesson-15-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Architecture: API + webhook",
        content: `**Polling** (module 14) - your script asks Telegram. **Webhook** - Telegram sends a POST to your URL on a new message.

\`\`\`
User → Telegram → HTTPS POST → your FastAPI /telegram/webhook
                              ↓
                         process Update
                              ↓
                    optional: CRUD /tasks
\`\`\`

Webhook advantages on a server: no need for a constant polling process on a PC.`
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

Verify in /docs before connecting Telegram.`
      },
      {
        title: "Webhook endpoint",
        content: `\`\`\`python
from fastapi import Request

@app.post("/telegram/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    # data - Update object from Telegram
    message = data.get("message")
    if message and "text" in message:
        text = message["text"]
        chat_id = message["chat"]["id"]
        # here: call sendMessage or a shared function with the bot
        if text == "/tasks":
            # return the tasks_db list to the chat (via Bot API)
            pass
    return {"ok": True}
\`\`\`

Telegram **expects a fast response** (up to ~60 s). Move heavy work to the background (for the course - short logic).`
      },
      {
        title: "setWebhook and HTTPS",
        content: `Locally a server on \`127.0.0.1:8000\` is not reachable from the internet. Use a **tunnel**:

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

Before that: \`deleteWebhook\` if you had polling. On hosting (Railway, Render, VPS) - the same idea with permanent HTTPS.`
      },
      {
        title: "Webhook security (overview)",
        content: `- Bot token - only in .env
- Do not log the full Update with personal data to public services
- Optional: secret_token in setWebhook and check the \`X-Telegram-Bot-Api-Secret-Token\` header

For a learning project, HTTPS + a private ngrok URL is enough.`
      },
      {
        title: "Local webhook check",
        content: `1. Start uvicorn
2. ngrok http 8000
3. setWebhook to the https URL
4. Message the bot - POST /telegram/webhook should appear in server logs

If 404 - check the path; if 502 - the server is not running.`
      },
      {
        title: "Python course summary",
        content: `You combined REST (CRUD tasks) and an entry point for Telegram. README: how to run uvicorn, how to enable ngrok, how to check /docs and the webhook. This completes module 15 and the "bot → API → deploy" chain.`
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
      explanation: "Minimal response so Telegram does not retry the request."
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
      explanation: "Telegram will not deliver the Update.",
      correctApproach: "Public HTTPS (ngrok or hosting)."
    },
    {
      mistake: "Polling and webhook at the same time",
      explanation: "Conflict receiving Updates.",
      correctApproach: "deleteWebhook before polling; or only webhook on the server."
    },
    {
      mistake: "Not returning {\"ok\": True} quickly",
      explanation: "Telegram retries requests.",
      correctApproach: "Fast response; heavy work - async/background."
    }
  ],

  summary: `FastAPI serves CRUD and accepts a Telegram webhook. ngrok provides HTTPS for local development; in production - a permanent domain.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "A Telegram webhook requires…",
        options: [
          "A public HTTPS URL",
          "Only localhost HTTP",
          "Tkinter",
          "SMTP without TLS"
        ],
        correctAnswer: 0,
        explanation: "Telegram sends POST only to an reachable HTTPS endpoint."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why use ngrok in local development?",
        options: [
          "To tunnel HTTPS to localhost",
          "To install Python",
          "To replace Pydantic",
          "To delete the token"
        ],
        correctAnswer: 0,
        explanation: "ngrok gives a public URL to a local port."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What should you not do together with an active webhook?",
        options: [
          "run_polling() for the same bot",
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
        explanation: "Telegram sends JSON in the body of a POST."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "After setting up a webhook the bot can receive messages without run_polling().",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True - the server accepts POST from Telegram at the webhook URL."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
