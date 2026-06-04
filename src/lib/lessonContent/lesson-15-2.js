/**
 * Lesson 15-2: Параметри шляху, query та моделі Pydantic
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_2 = {
  lessonId: "lesson-15-2",
  moduleId: "module-15",
  order: 2,
  title: "Параметри шляху, query та моделі Pydantic",

  learningObjectives: [
    "Використовувати path parameters /items/{id}",
    "Додавати query параметри skip та limit",
    "Описувати моделі BaseModel",
    "Повертати типізовані відповіді з валідацією"
  ],

  prerequisites: ["lesson-15-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Path parameters",
        content: `Сегменти URL у фігурних дужках - **path parameters**:

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
def get_item(item_id: int):
    return {"item_id": item_id}
\`\`\`

Запит \`GET /items/42\` → \`item_id=42\`. FastAPI **конвертує тип**; якщо передати \`/items/abc\` - помилка 422 з поясненням у /docs.

**Порядок:** статичні шляхи вище динамічних:

\`\`\`python
@app.get("/items/special")   # спочатку
def special(): ...

@app.get("/items/{item_id}") # потім
def get_item(item_id: int): ...
\`\`\``
      },
      {
        title: "Query parameters",
        content: `Параметри після \`?\` у URL - **query**:

\`GET /items?skip=0&limit=10\`

\`\`\`python
@app.get("/items")
def list_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit, "items": []}
\`\`\`

- Значення за замовчуванням роблять параметр **необов'язковим**
- Без default - параметр обов'язковий

\`\`\`python
from typing import Optional

@app.get("/search")
def search(q: Optional[str] = None):
    return {"q": q}
\`\`\``
      },
      {
        title: "Pydantic BaseModel",
        content: `**Pydantic** описує структуру JSON і валідує типи:

\`\`\`python
from pydantic import BaseModel, Field

class Item(BaseModel):
    id: int
    name: str = Field(..., min_length=1, max_length=100)
    price: float = Field(gt=0, description="Ціна > 0")
    tags: list[str] = []

class ItemCreate(BaseModel):
    name: str
    price: float
\`\`\`

**Відповідь з моделлю:**

\`\`\`python
@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int):
    return Item(id=item_id, name="Книга", price=99.5)
\`\`\`

\`response_model\` фільтрує зайві поля та формує схему в OpenAPI.`
      },
      {
        title: "Тіло запиту (огляд POST)",
        content: `POST приймає JSON у тіло - параметр типу BaseModel:

\`\`\`python
items_db: list[Item] = []

@app.post("/items", response_model=Item)
def create_item(payload: ItemCreate):
    new_id = len(items_db) + 1
    item = Item(id=new_id, name=payload.name, price=payload.price)
    items_db.append(item)
    return item
\`\`\`

Невірний JSON (наприклад \`price: "free"\`) → **422 Unprocessable Entity** з деталями валідації - зручно тестувати в /docs.`
      },
      {
        title: "Пагінація в пам'яті",
        content: `\`\`\`python
@app.get("/items", response_model=list[Item])
def list_items(skip: int = 0, limit: int = 10):
    return items_db[skip : skip + limit]
\`\`\`

**skip** - скільки пропустити, **limit** - скільки повернути. У реальному проєкті skip/limit перетворюють на SQL OFFSET/LIMIT.`
      },
      {
        title: "Optional та значення за замовчуванням",
        content: `\`Optional[str] = None\` - поле можна не надсилати в JSON.

\`limit: int = Query(10, le=100)\` - обмеження query через \`Query\` з fastapi (максимум 100).

Валідація спрацьовує **до** входу в тіло функції - менше if у handler.`
      },
      {
        title: "Підсумок",
        content: `Path - ідентифікатор ресурсу, query - фільтри та пагінація, Pydantic - контракт даних. Урок 15-3 - статус-коди та HTTPException.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Path + query",
      code: `@app.get("/users/{user_id}")
def user(user_id: int, active: bool = True):
    return {"user_id": user_id, "active": active}`,
      explanation: "user_id з шляху, active з query ?active=false."
    },
    {
      title: "ItemCreate",
      code: `class ItemCreate(BaseModel):
    name: str
    price: float`,
      explanation: "Окрема модель для створення без id від клієнта."
    }
  ],

  commonMistakes: [
    {
      mistake: "Один шлях /items/{id} перекриває /items/special",
      explanation: "special сприймається як id.",
      correctApproach: "Статичні маршрути оголошуйте вище."
    },
    {
      mistake: "Повертати dict з зайвими полями при response_model",
      explanation: "Вони будуть відфільтровані - інколи неочікувано.",
      correctApproach: "Повертайте екземпляр моделі або dict з потрібними ключами."
    },
    {
      mistake: "price: float без обмежень",
      explanation: "Від'ємні ціни проходять валідацію.",
      correctApproach: "Field(gt=0) або перевірка в handler."
    }
  ],

  summary: `Path і query параметризують URL; Pydantic валідує JSON і документує API в /docs.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Для чого використовують BaseModel у FastAPI?",
        options: [
          "Валідація та серіалізація даних",
          "Малювання GUI",
          "Відправка email",
          "Парсинг HTML"
        ],
        correctAnswer: 0,
        explanation: "Pydantic перевіряє типи та формує JSON-схему."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де передається параметр skip у GET /items?skip=5?",
        options: ["Query parameter", "Path parameter", "Header only", "Cookie"],
        correctAnswer: 0,
        explanation: "Після ? - query parameters."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який статус при невалідному типі поля в JSON?",
        options: ["422", "200", "301", "418"],
        correctAnswer: 0,
        explanation: "422 Unprocessable Entity - стандарт для помилок валідації."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить response_model=Item?",
        options: [
          "Фільтрує відповідь і описує схему в OpenAPI",
          "Видаляє endpoint",
          "Змінює метод на DELETE",
          "Вимикає /docs"
        ],
        correctAnswer: 0,
        explanation: "response_model задає форму відповіді для клієнта та документації."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Path parameter item_id: int автоматично конвертується з рядка URL.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True - FastAPI парсить типи з анотацій."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
