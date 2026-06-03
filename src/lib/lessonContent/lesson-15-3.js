/**
 * Lesson 15-3: POST, помилки HTTP та статус-коди
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_3 = {
  lessonId: "lesson-15-3",
  moduleId: "module-15",
  order: 3,
  title: "POST, помилки HTTP та статус-коди",

  learningObjectives: [
    "Створювати POST /items з тілом JSON",
    "Повертати статус 201 Created",
    "Використовувати HTTPException для помилок клієнта",
    "Реалізувати оновлення та видалення ресурсів"
  ],

  prerequisites: ["lesson-15-2"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "HTTP статус-коди (основні)",
        content: `| Код | Значення |
|-----|----------|
| 200 | OK — успішний GET/PUT |
| 201 | Created — ресурс створено (POST) |
| 204 | No Content — успіх без тіла (DELETE) |
| 400 | Bad Request — помилка клієнта |
| 404 | Not Found — ресурс не знайдено |
| 422 | Validation Error — Pydantic |
| 500 | Internal Server Error — помилка сервера |

Клієнт (бот, фронтенд) **повинен** перевіряти код, а не лише JSON.`
      },
      {
        title: "POST з 201 Created",
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

\`status_code=\` у декораторі задає код **успіху** для відповіді.`
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
        raise HTTPException(status_code=400, detail="Ціна не може бути від'ємною")
    ...
\`\`\`

**detail** — JSON \`{"detail": "..."}\` у відповіді. Не показуйте внутрішні traceback клієнту.`
      },
      {
        title: "PUT та DELETE",
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

\`exclude_unset=True\` — оновлює лише передані поля (частковий PATCH-подібний PUT).`
      },
      {
        title: "Тестування в /docs",
        content: `У Swagger:

1. POST /items — Try it out → Execute → перевірте 201
2. GET /items/{id} з неіснуючим id → 404
3. POST з price=-1 → 422 від Pydantic або 400 від вашого коду

Це швидший спосіб навчання, ніж curl, хоча curl теж корисний:

\`\`\`bash
curl -X POST http://127.0.0.1:8000/items -H "Content-Type: application/json" -d "{\\"name\\":\\"A\\",\\"price\\": 10}"
\`\`\``
      },
      {
        title: "Ідемпотентність (огляд)",
        content: `**GET, PUT, DELETE** часто вважають ідемпотентними — повторний запит не змінює результат зайвий раз.

**POST** створює новий ресурс кожного разу — не ідемпотентний.

У навчальному API \`items_db\` — список у пам'яті; після перезапуску сервера дані зникають.`
      },
      {
        title: "Підсумок",
        content: `CRUD у пам'яті: POST (201), GET, PUT, DELETE (204), помилки через HTTPException. Урок 15-4 — з'єднання з Telegram webhook.`
      }
    ]
  },

  codeExamples: [
    {
      title: "404 Not Found",
      code: `raise HTTPException(status_code=404, detail="Item not found")`,
      explanation: "Стандартний спосіб повідомити клієнта про відсутній ресурс."
    },
    {
      title: "201 Created",
      code: `@app.post("/items", status_code=201)`,
      explanation: "Явний код успіху для створення."
    }
  ],

  commonMistakes: [
    {
      mistake: "Повертати 200 на POST створення",
      explanation: "Плутає семантику REST.",
      correctApproach: "status.HTTP_201_CREATED для успішного POST."
    },
    {
      mistake: "raise Exception замість HTTPException",
      explanation: "Клієнт отримає 500 без зрозумілого detail.",
      correctApproach: "HTTPException для очікуваних помилок (404, 400)."
    },
    {
      mistake: "DELETE повертає тіло з кодом 204",
      explanation: "204 не повинен мати body.",
      correctApproach: "return без значення при 204."
    }
  ],

  summary: `POST створює ресурси (201), HTTPException — контрольовані помилки, PUT/DELETE завершують CRUD у навчальному API.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який код зазвичай означає успішне створення ресурсу?",
        options: ["201", "404", "500", "301"],
        correctAnswer: 0,
        explanation: "201 Created — стандарт для успішного POST."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як повернути 404 у FastAPI?",
        options: [
          "raise HTTPException(status_code=404, ...)",
          "return None",
          "print(404)",
          "app.status = 404"
        ],
        correctAnswer: 0,
        explanation: "HTTPException перериває handler і формує відповідь."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який код для успішного DELETE без тіла відповіді?",
        options: ["204", "201", "200", "422"],
        correctAnswer: 0,
        explanation: "204 No Content — типово для DELETE."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить model_dump(exclude_unset=True) у PUT?",
        options: [
          "Лише поля, які клієнт явно надіслав",
          "Видаляє всі поля",
          "Додає id автоматично",
          "Вимикає валідацію"
        ],
        correctAnswer: 0,
        explanation: "Часткове оновлення без перезапису None на все поля."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Помилки валідації Pydantic у FastAPI зазвичай дають статус 422.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True — Unprocessable Entity для невалідного тіла запиту."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
