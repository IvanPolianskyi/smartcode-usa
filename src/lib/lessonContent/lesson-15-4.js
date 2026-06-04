/**
 * Lesson 15-4: Практика: REST API + webhook для Telegram
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_4 = {
  lessonId: "lesson-15-4",
  moduleId: "module-15",
  order: 4,
  title: "Практика: REST API + webhook для Telegram",

  learningObjectives: [
    "Зібрати CRUD API для списку задач",
    "Додати endpoint POST /telegram/webhook",
    "Зв'язати FastAPI з логікою бота",
    "Зрозуміти деплой через ngrok або хостинг"
  ],

  prerequisites: ["lesson-15-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Архітектура: API + webhook",
        content: `**Polling** (модуль 14) - ваш скрипт питає Telegram. **Webhook** - Telegram надсилає POST на ваш URL при новому повідомленні.

\`\`\`
Користувач → Telegram → HTTPS POST → ваш FastAPI /telegram/webhook
                              ↓
                         обробка Update
                              ↓
                    опційно: CRUD /tasks
\`\`\`

Переваги webhook на сервері: не потрібен постійний процес polling на ПК.`
      },
      {
        title: "CRUD /tasks у FastAPI",
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

Перевірте в /docs перед підключенням Telegram.`
      },
      {
        title: "Endpoint webhook",
        content: `\`\`\`python
from fastapi import Request

@app.post("/telegram/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    # data - об'єкт Update від Telegram
    message = data.get("message")
    if message and "text" in message:
        text = message["text"]
        chat_id = message["chat"]["id"]
        # тут: виклик sendMessage або спільна функція з ботом
        if text == "/tasks":
            # повернути список tasks_db у чат (через Bot API)
            pass
    return {"ok": True}
\`\`\`

Telegram **очікує швидку відповідь** (до ~60 с). Важку роботу виносьте у фон (для курсу - коротка логіка).`
      },
      {
        title: "setWebhook та HTTPS",
        content: `Локально сервер на \`127.0.0.1:8000\` недоступний з інтернету. Використовують **тунель**:

\`\`\`bash
uvicorn main:app --host 0.0.0.0 --port 8000
ngrok http 8000
\`\`\`

Отримаєте URL виду \`https://xxxx.ngrok-free.app\`. Встановіть webhook:

\`\`\`python
import os, requests
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
WEBHOOK_URL = "https://xxxx.ngrok-free.app/telegram/webhook"
requests.post(
    f"https://api.telegram.org/bot{TOKEN}/setWebhook",
    json={"url": WEBHOOK_URL},
)
\`\`\`

Перед цим: \`deleteWebhook\` якщо був polling. На хостингу (Railway, Render, VPS) - той самий принцип з постійним HTTPS.`
      },
      {
        title: "Безпека webhook (огляд)",
        content: `- Токен бота - лише в .env
- Не логуйте повний Update з персональними даними у публічні сервіси
- Опційно: secret_token у setWebhook і перевірка заголовка \`X-Telegram-Bot-Api-Secret-Token\`

Для навчального проєкту достатньо HTTPS + приватний ngrok URL.`
      },
      {
        title: "Локальна перевірка webhook",
        content: `1. Запустіть uvicorn
2. ngrok http 8000
3. setWebhook на https URL
4. Напишіть боту - у логах сервера має з’явитися POST /telegram/webhook

Якщо 404 - перевірте шлях; якщо 502 - сервер не запущений.`
      },
      {
        title: "Підсумок курсу Python",
        content: `Ви поєднали REST (CRUD tasks) і вхідну точку для Telegram. README: як запустити uvicorn, як увімкнути ngrok, як перевірити /docs та webhook. Це завершення модуля 15 і ланцюжка «бот → API → деплой».`
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
      explanation: "Мінімальна відповідь, щоб Telegram не повторював запит."
    },
    {
      title: "setWebhook",
      code: `requests.post(f"https://api.telegram.org/bot{TOKEN}/setWebhook",
                  json={"url": WEBHOOK_URL})`,
      explanation: "Пов'язує бота з публічним HTTPS URL."
    }
  ],

  commonMistakes: [
    {
      mistake: "setWebhook на http://127.0.0.1",
      explanation: "Telegram не доставить Update.",
      correctApproach: "Публічний HTTPS (ngrok або хостинг)."
    },
    {
      mistake: "Одночасно polling і webhook",
      explanation: "Конфлікт отримання Update.",
      correctApproach: "deleteWebhook перед polling; або лише webhook на сервері."
    },
    {
      mistake: "Не повертати {\"ok\": True} швидко",
      explanation: "Telegram повторює запити.",
      correctApproach: "Швидка відповідь; важка робота - async/background."
    }
  ],

  summary: `FastAPI обслуговує CRUD і приймає Telegram webhook. ngrok дає HTTPS для локальної розробки; на продакшені - постійний домен.`,

  practiceTask: {
    title: "Tasks API + webhook",
    description: "CRUD для tasks і один робочий POST /telegram/webhook, який обробляє текст повідомлення.",
    hints: [
      "Спочатку перевірте /docs",
      "Webhook потребує публічного HTTPS URL",
      "Після setWebhook зупиніть run_polling()"
    ]
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Webhook Telegram вимагає…",
        options: [
          "Публічний HTTPS URL",
          "Лише localhost HTTP",
          "Tkinter",
          "SMTP без TLS"
        ],
        correctAnswer: 0,
        explanation: "Telegram надсилає POST лише на доступний HTTPS endpoint."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо ngrok у локальній розробці?",
        options: [
          "Прокинути HTTPS-тунель до localhost",
          "Встановити Python",
          "Замінити Pydantic",
          "Видалити токен"
        ],
        correctAnswer: 0,
        explanation: "ngrok дає публічний URL на локальний порт."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що не варто робити разом з активним webhook?",
        options: [
          "run_polling() того ж бота",
          "GET /tasks",
          "Використовувати /docs",
          "Зберігати tasks у списку"
        ],
        correctAnswer: 0,
        explanation: "Polling і webhook конфліктують для одного бота."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод HTTP для прийому Update від Telegram?",
        options: ["POST", "GET", "DELETE", "OPTIONS only"],
        correctAnswer: 0,
        explanation: "Telegram надсилає JSON тілом у POST."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Після налаштування webhook бот може отримувати повідомлення без run_polling().",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True - сервер приймає POST від Telegram на webhook URL."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
