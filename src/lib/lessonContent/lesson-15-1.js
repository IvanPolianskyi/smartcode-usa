/**
 * Lesson 15-1: FastAPI: перший REST endpoint
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_1 = {
  lessonId: "lesson-15-1",
  moduleId: "module-15",
  order: 1,
  title: "FastAPI: перший REST endpoint",

  learningObjectives: [
    "Встановити fastapi та uvicorn",
    "Створити додаток FastAPI та маршрут GET /",
    "Запустити ASGI-сервер локально",
    "Відкрити автодокументацію /docs та /redoc"
  ],

  prerequisites: ["lesson-14-4"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Що таке REST API",
        content: `**REST API** - спосіб обміну даними через HTTP: клієнт (браузер, бот, мобільний застосунок) надсилає запит, сервер повертає **JSON**.

| Метод | Типова дія |
|-------|------------|
| GET | Отримати дані |
| POST | Створити |
| PUT/PATCH | Оновити |
| DELETE | Видалити |

**FastAPI** - сучасний фреймворк для Python:

- Швидкий (Starlette + uvicorn)
- Автоматична документація OpenAPI (Swagger)
- Валідація типів (Pydantic) - уроки 15-2 і 15-3

\`\`\`bash
pip install "fastapi[standard]" uvicorn
\`\`\``
      },
      {
        title: "Перший додаток",
        content: `Файл \`main.py\`:

\`\`\`python
from fastapi import FastAPI

app = FastAPI(
    title="Student API",
    description="Навчальний REST API",
    version="0.1.0",
)

@app.get("/")
def root():
    return {"message": "API працює", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "ok"}
\`\`\`

**Запуск:**

\`\`\`bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
\`\`\`

- \`main:app\` - модуль \`main\`, об'єкт \`app\`
- \`--reload\` - перезапуск при зміні коду (лише для розробки)

Відкрийте:

- http://127.0.0.1:8000/ - JSON відповідь
- http://127.0.0.1:8000/docs - Swagger UI
- http://127.0.0.1:8000/redoc - альтернативна документація`
      },
      {
        title: "Маршрути та типи відповіді",
        content: `Декоратор \`@app.get("/path")\` реєструє **path** і **HTTP-метод**.

\`\`\`python
@app.get("/items/count")
def items_count():
    return {"count": 42}

@app.get("/greet/{name}")
def greet(name: str):
    return {"hello": name}
\`\`\`

FastAPI автоматично серіалізує dict/list у JSON. Для явної схеми відповіді пізніше додамо Pydantic-моделі.

**Статус-код за замовчуванням** для GET - 200 OK.`
      },
      {
        title: "Async endpoints (огляд)",
        content: `Можна оголошувати \`async def\` - корисно при роботі з БД або HTTP-клієнтами:

\`\`\`python
@app.get("/slow")
async def slow():
    return {"done": True}
\`\`\`

Для простих навчальних обробників (handlers) достатньо звичайного \`def\`. Uvicorn підтримує обидва варіанти.`
      },
      {
        title: "Зв'язок з Telegram (огляд модуля)",
        content: `У продакшені бот часто працює через **webhook**: Telegram надсилає POST на ваш FastAPI endpoint (урок 15-4), замість polling на домашньому ПК.

Поки що ви будуєте фундамент: локальний API + /docs для тестування запитів.`
      },
      {
        title: "Тестування в Swagger (/docs)",
        content: `На сторінці /docs:

1. Розгорніть GET /
2. **Try it out** → **Execute**
3. Перевірте Response body та Status 200

Для POST (урок 15-2+) з’явиться форма JSON - можна надсилати тестові дані без Postman.

**OpenAPI JSON:** \`/openapi.json\` - схема для генераторів клієнтів.`
      },
      {
        title: "Структура навчального проєкту",
        content: `\`\`\`
my_api/
  main.py          # app = FastAPI()
  requirements.txt
  .env.example     # без секретів
\`\`\`

Один файл \`main.py\` достатній для курсу; у великих проєктах роутери виносять у \`routers/items.py\` з \`APIRouter\`.`
      },
      {
        title: "Підсумок",
        content: `FastAPI + uvicorn дають локальний REST-сервер і інтерактивну документацію. Наступний урок - path/query параметри та Pydantic-моделі.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Мінімальний app",
      code: `from fastapi import FastAPI
app = FastAPI()
@app.get("/")
def root():
    return {"ok": True}`,
      explanation: "Три рядки - вже працюючий API."
    },
    {
      title: "Запуск uvicorn",
      code: `uvicorn main:app --reload --port 8000`,
      explanation: "ASGI-сервер для обслуговування FastAPI."
    }
  ],

  commonMistakes: [
    {
      mistake: "Запускати python main.py без uvicorn",
      explanation: "FastAPI - ASGI-додаток, потрібен сервер.",
      correctApproach: "uvicorn main:app --reload."
    },
    {
      mistake: "Плутати шлях /docs з маршрутом у коді",
      explanation: "/docs генерується автоматично.",
      correctApproach: "Не створюйте свій @app.get('/docs') без потреби."
    },
    {
      mistake: "--reload на продакшені",
      explanation: "Небезпечно та повільно.",
      correctApproach: "reload лише локально; на сервері - процес-менеджер без reload."
    }
  ],

  summary: `Ви запустили FastAPI, створили GET-маршрути та відкрили Swagger на /docs. Далі - параметри шляху, query та Pydantic.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка команда запускає сервер розробки?",
        options: [
          "uvicorn main:app --reload",
          "python manage.py run",
          "npm start",
          "flask run only"
        ],
        correctAnswer: 0,
        explanation: "uvicorn - ASGI-сервер для FastAPI."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де знаходиться інтерактивна документація Swagger?",
        options: ["/docs", "/api/swagger-hidden", "/telegram", "/smtp"],
        correctAnswer: 0,
        explanation: "FastAPI автоматично монтує Swagger UI на /docs."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що повертає типовий GET endpoint у прикладах курсу?",
        options: ["JSON (dict/list)", "HTML-сторінку", "ZIP-архів", "Тільки plain text"],
        correctAnswer: 0,
        explanation: "REST API в курсі - JSON-відповіді."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає main:app у uvicorn main:app?",
        options: [
          "Файл main.py, змінна app",
          "Папка main/app",
          "Команда app у main",
          "Порт main"
        ],
        correctAnswer: 0,
        explanation: "module:variable - стандартний формат uvicorn."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Для FastAPI обов'язково встановлювати Django.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False - FastAPI працює самостійно з uvicorn."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
