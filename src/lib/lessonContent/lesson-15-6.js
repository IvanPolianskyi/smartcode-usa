/**
 * Lesson 15-6: Деплой API та наступні кроки
 * Full educational content (додатковий урок)
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_6 = {
  lessonId: "lesson-15-6",
  moduleId: "module-15",
  order: 6,
  title: "Деплой API та наступні кроки",

  learningObjectives: [
    "Оглянути варіанти хостингу FastAPI",
    "Зрозуміти змінні оточення на сервері",
    "Скласти чеклист перед публікацією API",
    "Знати напрямки для подальшого навчання"
  ],

  prerequisites: ["lesson-15-4"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Локально vs продакшен",
        content: `**Розробка:** \`uvicorn main:app --reload\` на localhost.

**Продакшен:**

- Без \`--reload\`
- Процес-менеджер: systemd, Docker, хмарний PaaS
- HTTPS (обов'язково для Telegram webhook)
- Секрети: \`TELEGRAM_BOT_TOKEN\`, ключі БД - у панелі хостингу`
      },
      {
        title: "Варіанти хостингу",
        content: `| Платформа | Плюси |
|-----------|--------|
| VPS (DigitalOcean, Hetzner) | Повний контроль |
| Railway / Render / Fly.io | Простий деплой з Git |
| Serverless | Складніше для довгого polling |

**Docker (огляд):**

\`\`\`dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

Один контейнер = передбачуване середовище.`
      },
      {
        title: "Чеклист перед публікацією",
        content: `- [ ] \`.env\` не в git
- [ ] CORS налаштований, якщо є фронтенд
- [ ] Логи помилок (не traceback клієнту)
- [ ] Health endpoint \`/health\` для моніторингу
- [ ] Webhook URL з HTTPS після деплою
- [ ] Обмеження rate limit (огляд) для публічного API`
      },
      {
        title: "Куди рухатися далі",
        content: `**Поглиблення:**

- SQLAlchemy + PostgreSQL для замість \`list\` у пам'яті
- JWT-авторизація в FastAPI
- Тести: pytest + httpx.AsyncClient
- CI/CD (GitHub Actions)

**Пов'язані теми курсу:** бот (14) + API (15) = повноцінний backend для мобільного або веб-клієнта.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Health check",
      code: `@app.get("/health")
def health():
    return {"status": "ok"}`,
      explanation: "Моніторинг і балансувальники перевіряють цей URL."
    }
  ],

  commonMistakes: [
    {
      mistake: "Деплой з --reload",
      explanation: "Споживає ресурси та небезпечно.",
      correctApproach: "reload лише локально."
    },
    {
      mistake: "HTTP webhook у продакшені",
      explanation: "Telegram вимагає HTTPS.",
      correctApproach: "TLS на домені або PaaS з автоматичним HTTPS."
    }
  ],

  summary: `Після модуля 15 ви вмієте будувати API та webhook; деплой і секрети визначають, чи проєкт працює 24/7. Далі - база даних і авторизація.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому webhook Telegram потребує HTTPS?",
        options: [
          "Вимога Telegram до публічного захищеного URL",
          "Щоб працював CSV",
          "Щоб не потрібен був Python",
          "Лише для Gmail"
        ],
        correctAnswer: 0,
        explanation: "Без HTTPS setWebhook не прийме URL."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що не варто увімкнути на продакшен-сервері?",
        options: ["uvicorn --reload", "HTTPS", "health endpoint", "environment variables"],
        correctAnswer: 0,
        explanation: "reload - лише для локальної розробки."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де зберігати TELEGRAM_BOT_TOKEN на хостингу?",
        options: [
          "Secrets / environment у панелі",
          "У URL query",
          "У коментарі Dockerfile",
          "У /docs Swagger"
        ],
        correctAnswer: 0,
        explanation: "Секрети - в конфігурації сервера, не в коді."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що замінює list у пам'яті для справжнього API?",
        options: ["База даних (PostgreSQL тощо)", "Tkinter", "CSV only", "GIF"],
        correctAnswer: 0,
        explanation: "Персистентне сховище для CRUD."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Docker допомагає однаково запускати API на різних машинах.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True - образ фіксує залежності."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
