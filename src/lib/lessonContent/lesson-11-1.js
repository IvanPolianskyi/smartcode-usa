/**
 * Lesson 11-1: Вступ до FastAPI. Роутинг, запити, відповіді
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson11_1 = {
  lessonId: "lesson-11-1",
  moduleId: "module-11",
  order: 1,
  title: "Вступ до FastAPI. Роутинг, запити, відповіді",
  
  learningObjectives: [
    "Створювати маршрути",
    "Обробляти різні HTTP методи",
    "Валідувати дані",
    "Повертати відповіді"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-10-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Роутинг у FastAPI",
        content: `**Роутинг** — визначення, яка функція обробляє який URL.

**Базовий роутинг:**

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Головна"}

@app.get("/about")
def about():
    return {"message": "Про нас"}
\`\`\`

**HTTP методи:**

\`\`\`python
@app.get("/items")      # GET
@app.post("/items")     # POST
@app.put("/items/{id}") # PUT
@app.delete("/items/{id}") # DELETE
@app.patch("/items/{id}")  # PATCH
\`\`\`

**Path параметри:**

\`\`\`python
@app.get("/users/{user_id}")
def get_user(user_id: int):  # Автоматична конвертація
    return {"user_id": user_id}

# /users/123 → user_id = 123
\`\`\`

**Query параметри:**

\`\`\`python
@app.get("/items")
def get_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

# /items?skip=0&limit=20
\`\`\`

**Комбінація:**

\`\`\`python
@app.get("/users/{user_id}/posts")
def get_posts(user_id: int, published: bool = True):
    return {"user_id": user_id, "published": published}
\`\`\``
      },
      {
        title: "Валідація даних",
        content: `**Pydantic моделі:**

\`\`\`python
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    age: int = Field(..., ge=0, le=120)

@app.post("/users")
def create_user(user: UserCreate):
    return {"user": user.dict()}
\`\`\`

**Валідація типів:**

\`\`\`python
from typing import Optional, List

class Item(BaseModel):
    name: str
    price: float = Field(..., gt=0)  # Більше 0
    tags: List[str] = []
    description: Optional[str] = None
\`\`\`

**Автоматичні помилки:**

Якщо дані невалідні, FastAPI автоматично поверне 422 з описом помилок:

\`\`\`json
{
  "detail": [
    {
      "loc": ["body", "age"],
      "msg": "value is not a valid integer",
      "type": "type_error.integer"
    }
  ]
}
\`\`\``
      },
      {
        title: "Відповіді",
        content: `**Базові відповіді:**

\`\`\`python
@app.get("/")
def read_root():
    return {"message": "Привіт"}  # Автоматично JSON, статус 200
\`\`\`

**Статус коди:**

\`\`\`python
from fastapi import status
from fastapi.responses import JSONResponse

@app.post("/users", status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate):
    return {"message": "Створено", "user": user.dict()}
\`\`\`

**Response модель:**

\`\`\`python
class UserResponse(BaseModel):
    id: int
    name: str
    email: str

@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    return {"id": user_id, "name": "Олександр", "email": "alex@example.com"}
\`\`\`

**HTTPException:**

\`\`\`python
from fastapi import HTTPException

@app.get("/users/{user_id}")
def get_user(user_id: int):
    if user_id < 1:
        raise HTTPException(
            status_code=404,
            detail="Користувача не знайдено",
            headers={"X-Error": "Not Found"}
        )
    return {"user_id": user_id}
\`\`\``
      },
      {
        title: "Залежності (Dependencies)",
        content: `**Dependency Injection** — передача залежностей у функції.

**Простий приклад:**

\`\`\`python
from fastapi import Depends

def get_db():
    # Симуляція підключення до БД
    db = "database_connection"
    yield db
    # Закриття підключення

@app.get("/items")
def get_items(db: str = Depends(get_db)):
    return {"db": db}
\`\`\`

**Загальні залежності:**

\`\`\`python
from fastapi import Header, Query

def get_user_agent(user_agent: str = Header(...)):
    return user_agent

@app.get("/")
def read_root(ua: str = Depends(get_user_agent)):
    return {"user_agent": ua}
\`\`\`

**Query параметри як залежності:**

\`\`\`python
class Pagination:
    def __init__(self, skip: int = 0, limit: int = 10):
        self.skip = skip
        self.limit = limit

@app.get("/items")
def get_items(pagination: Pagination = Depends()):
    return {"skip": pagination.skip, "limit": pagination.limit}
\`\`\``
      },
      {
        title: "Роутери (Routers)",
        content: `**Роутери** — організація коду через окремі модулі.

**Створення роутера:**

\`\`\`python
# routers/users.py
from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/")
def get_users():
    return {"users": []}

@router.get("/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id}
\`\`\`

**Підключення до додатку:**

\`\`\`python
# main.py
from fastapi import FastAPI
from routers import users

app = FastAPI()
app.include_router(users.router)

# Тепер доступні:
# GET /users
# GET /users/{user_id}
\`\`\`

**Переваги роутерів:**
- Організація коду
- Модульність
- Легше підтримувати
- Можна використовувати префікси та теги`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Роутинг з параметрами",
      code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id, "name": f"Користувач {user_id}"}

@app.get("/users/{user_id}/posts")
def get_user_posts(user_id: int, limit: int = 10):
    return {"user_id": user_id, "limit": limit, "posts": []}`,
      explanation: "Демонструє path параметри та query параметри в роутингу."
    },
    {
      title: "Приклад 2: Валідація з Pydantic",
      code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI()

class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(..., ge=0, le=120)

@app.post("/users")
def create_user(user: UserCreate):
    if user.age < 18:
        raise HTTPException(400, "Вік має бути >= 18")
    return {"created": user.dict()}`,
      explanation: "Показує валідацію даних через Pydantic з обробкою помилок."
    },
    {
      title: "Приклад 3: Роутер",
      code: `# routers/items.py
from fastapi import APIRouter

router = APIRouter(prefix="/items", tags=["items"])

@router.get("/")
def get_items():
    return {"items": []}

# main.py
from fastapi import FastAPI
from routers.items import router

app = FastAPI()
app.include_router(router)`,
      explanation: "Демонструє використання роутерів для організації коду."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Неправильний порядок роутів",
      explanation: "Більш специфічні роути мають бути перед загальнішими.",
      correctApproach: "Роут /users/me має бути перед /users/{user_id}"
    },
    {
      mistake: "Не використовувати Pydantic для валідації",
      explanation: "Без Pydantic немає автоматичної валідації та документації.",
      correctApproach: "Завжди використовуйте Pydantic моделі для request body."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Роутинг** — визначення маршрутів та обробників
2. **HTTP методи** — GET, POST, PUT, DELETE, PATCH
3. **Параметри** — path параметри та query параметри
4. **Валідація** — Pydantic для автоматичної перевірки
5. **Відповіді** — статус коди, response моделі
6. **Роутери** — організація коду через модулі
7. **Залежності** — Dependency Injection

FastAPI надає потужні інструменти для створення API!`,
  
  practiceTask: {
    title: "REST API з роутингом",
    description: "Створіть REST API з правильним роутингом",
    problemStatement: `Створіть FastAPI додаток, який:
1. Має роутер для товарів (items)
2. GET /items — список товарів
3. GET /items/{id} — один товар
4. POST /items — створення товару (з валідацією)
5. PUT /items/{id} — оновлення
6. DELETE /items/{id} — видалення
7. Використовує роутери для організації`,
    inputFormat: "HTTP запити",
    outputFormat: "JSON відповіді",
    examples: [
      {
        input: "POST /items, GET /items",
        output: "Створений товар та список товарів",
        explanation: "API обробляє CRUD операції"
      }
    ],
    solution: {
      code: `from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel, Field
from typing import Optional

app = FastAPI()

# Роутер
router = APIRouter(prefix="/items", tags=["items"])

# Моделі
class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    description: Optional[str] = None

class ItemUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    description: Optional[str] = None

# Сховище
items_db = []
next_id = 1

@router.get("/")
def get_items():
    return {"items": items_db, "total": len(items_db)}

@router.get("/{item_id}")
def get_item(item_id: int):
    item = next((i for i in items_db if i["id"] == item_id), None)
    if not item:
        raise HTTPException(404, "Товар не знайдено")
    return item

@router.post("/", status_code=201)
def create_item(item: ItemCreate):
    global next_id
    new_item = {
        "id": next_id,
        **item.dict()
    }
    items_db.append(new_item)
    next_id += 1
    return new_item

@router.put("/{item_id}")
def update_item(item_id: int, item: ItemUpdate):
    item_to_update = next((i for i in items_db if i["id"] == item_id), None)
    if not item_to_update:
        raise HTTPException(404, "Товар не знайдено")
    
    update_data = item.dict(exclude_unset=True)
    item_to_update.update(update_data)
    return item_to_update

@router.delete("/{item_id}")
def delete_item(item_id: int):
    global items_db
    item = next((i for i in items_db if i["id"] == item_id), None)
    if not item:
        raise HTTPException(404, "Товар не знайдено")
    items_db = [i for i in items_db if i["id"] != item_id]
    return {"message": "Товар видалено"}

app.include_router(router)`,
      explanation: "Повноцінний REST API з роутером, валідацією та всіма CRUD операціями."
    },
    hints: [
      "Використовуйте APIRouter для організації",
      "Додайте prefix та tags до роутера",
      "Використовуйте Pydantic для валідації",
      "Обробляйте помилки через HTTPException"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке роутинг?",
        options: ["База даних", "Визначення, яка функція обробляє який URL", "Валідація", "Шаблон"],
        correctAnswer: 1,
        explanation: "Роутинг — це визначення відповідності між URL та функціями-обробниками."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить @app.get('/users/{user_id}')?",
        options: ["Створює користувача", "Отримує користувача за ID", "Видаляє користувача", "Оновлює користувача"],
        correctAnswer: 1,
        explanation: "@app.get() створює GET endpoint для отримання користувача за ID."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

