/**
 * Lesson 15-6: Deploying the API and Next Steps
 * Full educational content (supplementary lesson)
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_15_6 = {
  lessonId: "lesson-15-6",
  moduleId: "module-15",
  order: 6,
  title: "Deploying the API and Next Steps",

  learningObjectives: [
    "Review FastAPI hosting options",
    "Understand environment variables on the server",
    "Build a checklist before publishing the API",
    "Know directions for further learning"
  ],

  prerequisites: ["lesson-15-4"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Local vs production",
        content: `**Development:** \`uvicorn main:app --reload\` on localhost.

**Production:**

- Without \`--reload\`
- Process manager: systemd, Docker, cloud PaaS
- HTTPS (required for Telegram webhook)
- Secrets: \`TELEGRAM_BOT_TOKEN\`, DB keys — in the hosting panel`
      },
      {
        title: "Hosting options",
        content: `| Platform | Pros |
|-----------|--------|
| VPS (DigitalOcean, Hetzner) | Full control |
| Railway / Render / Fly.io | Simple deploy from Git |
| Serverless | Harder for long polling |

**Docker (overview):**

\`\`\`dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

One container = predictable environment.`
      },
      {
        title: "Checklist before publishing",
        content: `- [ ] \`.env\` not in git
- [ ] CORS configured if there is a frontend
- [ ] Error logs (no traceback to the client)
- [ ] Health endpoint \`/health\` for monitoring
- [ ] Webhook URL with HTTPS after deploy
- [ ] Rate limit (overview) for public API`
      },
      {
        title: "Where to go next",
        content: `**Going deeper:**

- SQLAlchemy + PostgreSQL instead of in-memory \`list\`
- JWT authorization in FastAPI
- Tests: pytest + httpx.AsyncClient
- CI/CD (GitHub Actions)

**Related course topics:** bot (14) + API (15) = a full backend for a mobile or web client.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Health check",
      code: `@app.get("/health")
def health():
    return {"status": "ok"}`,
      explanation: "Monitoring and load balancers check this URL."
    }
  ],

  commonMistakes: [
    {
      mistake: "Deploying with --reload",
      explanation: "Consumes resources and is unsafe.",
      correctApproach: "reload only locally."
    },
    {
      mistake: "HTTP webhook in production",
      explanation: "Telegram requires HTTPS.",
      correctApproach: "TLS on the domain or PaaS with automatic HTTPS."
    }
  ],

  summary: `After module 15 you can build an API and webhook; deployment and secrets determine whether the project runs 24/7. Next — database and authorization.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why does a Telegram webhook require HTTPS?",
        options: [
          "Telegram requires a public secure URL",
          "So CSV works",
          "So Python is not needed",
          "Only for Gmail"
        ],
        correctAnswer: 0,
        explanation: "Without HTTPS setWebhook will not accept the URL."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What should not be enabled on a production server?",
        options: ["uvicorn --reload", "HTTPS", "health endpoint", "environment variables"],
        correctAnswer: 0,
        explanation: "reload — only for local development."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where should TELEGRAM_BOT_TOKEN be stored on hosting?",
        options: [
          "Secrets / environment in the panel",
          "In URL query",
          "In a Dockerfile comment",
          "In /docs Swagger"
        ],
        correctAnswer: 0,
        explanation: "Secrets — in server configuration, not in code."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What replaces an in-memory list for a real API?",
        options: ["Database (PostgreSQL, etc.)", "Tkinter", "CSV only", "GIF"],
        correctAnswer: 0,
        explanation: "Persistent storage for CRUD."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Docker helps run the API the same way on different machines.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True — the image pins dependencies."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
