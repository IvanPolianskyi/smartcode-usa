/**
 * Lesson 10-3: Вступ до FastAPI
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_10_3 = {
  lessonId: "lesson-10-3",
  moduleId: "module-08",
  order: 3,
  title: "Вступ до FastAPI",
  
  learningObjectives: [
    "Встановити FastAPI",
    "Створити перший API endpoint",
    "Розуміти основи FastAPI",
    "Запускати сервер"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-10-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке FastAPI?",
        content: `**FastAPI** — сучасний, швидкий веб-фреймворк для створення API на Python.

**Переваги FastAPI:**
- **Швидкий** — один з найшвидших Python фреймворків
- **Сучасний** — використовує Python 3.6+ функції
- **Автоматична документація** — Swagger UI та ReDoc
- **Валідація даних** — автоматична перевірка типів
- **Асинхронний** — підтримка async/await
- **Простий** — легкий для початківців

**Порівняння з Flask:**
- FastAPI швидший
- Автоматична валідація
- Автоматична документація
- Краща підтримка async

**Встановлення:**

\`\`\`bash
pip install fastapi uvicorn
\`\`\`

**uvicorn** — ASGI сервер для запуску FastAPI додатків.`
      },
      {
        title: "Перший FastAPI додаток",
        content: `**Створення файлу main.py:**

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Привіт, світ!"}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id, "message": f"Отримано item з ID {item_id}"}
\`\`\`

**Запуск сервера:**

\`\`\`bash
uvicorn main:app --reload
\`\`\`

**Параметри:**
- \`main\` — назва файлу (без .py)
- \`app\` — змінна FastAPI
- \`--reload\` — автоматичне перезавантаження при зміні коду

**Відкрити в браузері:**
- http://127.0.0.1:8000 — головна сторінка
- http://127.0.0.1:8000/docs — автоматична документація (Swagger)
- http://127.0.0.1:8000/redoc — альтернативна документація

**Тестування:**

\`\`\`python
import requests

response = requests.get("http://127.0.0.1:8000/")
print(response.json())  # {"message": "Привіт, світ!"}
\`\`\``
      },
      {
        title: "Типи маршрутів",
        content: `**GET маршрути:**

\`\`\`python
@app.get("/users")
def get_users():
    return {"users": ["Олександр", "Марія", "Дмитро"]}

@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id, "name": f"Користувач {user_id}"}
\`\`\`

**POST маршрути:**

\`\`\`python
from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int

@app.post("/users")
def create_user(user: User):
    return {"message": f"Створено користувача {user.name}, вік {user.age}"}
\`\`\`

**PUT та DELETE:**

\`\`\`python
@app.put("/users/{user_id}")
def update_user(user_id: int, user: User):
    return {"message": f"Оновлено користувача {user_id}"}

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    return {"message": f"Видалено користувача {user_id}"}
\`\`\`

**Pydantic моделі:**

Pydantic автоматично валідує дані:

\`\`\`python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    quantity: int = 1  # Значення за замовчуванням

@app.post("/items")
def create_item(item: Item):
    # item автоматично валідований
    return {"item": item.dict()}
\`\`\``
      },
      {
        title: "Параметри запиту",
        content: `**Path параметри:**

\`\`\`python
@app.get("/users/{user_id}")
def get_user(user_id: int):  # Автоматична конвертація типу
    return {"user_id": user_id}
\`\`\`

**Query параметри:**

\`\`\`python
@app.get("/items")
def get_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

# Використання: /items?skip=0&limit=20
\`\`\`

**Комбінація:**

\`\`\`python
@app.get("/users/{user_id}/posts")
def get_user_posts(user_id: int, published: bool = True):
    return {
        "user_id": user_id,
        "published": published
    }

# Використання: /users/1/posts?published=false
\`\`\`

**Request Body (POST/PUT):**

\`\`\`python
class UserCreate(BaseModel):
    name: str
    email: str
    age: int

@app.post("/users")
def create_user(user: UserCreate):
    return {"created": user.dict()}
\`\`\``
      },
      {
        title: "Відповіді",
        content: `**Базові відповіді:**

\`\`\`python
@app.get("/")
def read_root():
    return {"message": "Привіт!"}  # Автоматично JSON
\`\`\`

**Статус коди:**

\`\`\`python
from fastapi import status
from fastapi.responses import JSONResponse

@app.post("/users")
def create_user(user: User):
    # Створити користувача...
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={"message": "Користувача створено", "user": user.dict()}
    )
\`\`\`

**Помилки:**

\`\`\`python
from fastapi import HTTPException

@app.get("/users/{user_id}")
def get_user(user_id: int):
    if user_id < 1:
        raise HTTPException(status_code=404, detail="Користувача не знайдено")
    return {"user_id": user_id}
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий FastAPI додаток",
      code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Привіт, FastAPI!"}

@app.get("/hello/{name}")
def hello(name: str):
    return {"message": f"Привіт, {name}!"}

# Запуск: uvicorn main:app --reload`,
      explanation: "Створює базовий FastAPI додаток з двома GET маршрутами."
    },
    {
      title: "Приклад 2: POST з валідацією",
      code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    quantity: int = 1

@app.post("/items")
def create_item(item: Item):
    return {
        "message": "Товар створено",
        "item": item.dict()
    }`,
      explanation: "Демонструє створення POST endpoint з автоматичною валідацією через Pydantic."
    },
    {
      title: "Приклад 3: Комбінація параметрів",
      code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}/posts")
def get_posts(user_id: int, limit: int = 10, offset: int = 0):
    return {
        "user_id": user_id,
        "limit": limit,
        "offset": offset,
        "posts": []  # Тут були б реальні пости
    }

# Використання: /users/1/posts?limit=5&offset=0`,
      explanation: "Показує комбінацію path параметрів та query параметрів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути встановити uvicorn",
      explanation: "Без uvicorn не можна запустити FastAPI додаток.",
      correctApproach: "Встановіть uvicorn: pip install uvicorn"
    },
    {
      mistake: "Неправильна команда запуску",
      explanation: "uvicorn main:app (не uvicorn main.py:app)",
      correctApproach: "Використовуйте: uvicorn main:app --reload (без .py)"
    },
    {
      mistake: "Не використовувати Pydantic для валідації",
      explanation: "Без Pydantic моделей немає автоматичної валідації даних.",
      correctApproach: "Використовуйте Pydantic BaseModel для request body."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **FastAPI** — швидкий фреймворк для API
2. **Встановлення** — pip install fastapi uvicorn
3. **Створення додатку** — app = FastAPI()
4. **Маршрути** — @app.get(), @app.post()
5. **Pydantic** — автоматична валідація даних
6. **Запуск** — uvicorn main:app --reload
7. **Документація** — автоматична на /docs

FastAPI робить створення API простим та швидким!`,
  
  practiceTask: {
    title: "Перший FastAPI додаток",
    description: "Створіть простий FastAPI додаток з кількома endpoints",
    problemStatement: `Створіть програму, яка:
1. Має GET / - головна сторінка
2. Має GET /users - список користувачів
3. Має GET /users/{user_id} - один користувач
4. Має POST /users - створення користувача (з валідацією)
5. Показує автоматичну документацію`,
    inputFormat: "HTTP запити до API",
    outputFormat: "JSON відповіді від API",
    examples: [
      {
        input: "GET /users, POST /users з даними",
        output: "JSON відповіді з користувачами",
        explanation: "API обробляє різні типи запитів та повертає JSON"
      }
    ],
    solution: {
      code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Мій API", version="1.0.0")

# Модель користувача
class User(BaseModel):
    name: str
    age: int
    email: str

# Сховище (в реальному додатку була б база даних)
users_db = []

@app.get("/")
def read_root():
    return {"message": "Ласкаво просимо до мого API!"}

@app.get("/users", response_model=List[dict])
def get_users():
    return users_db

@app.get("/users/{user_id}")
def get_user(user_id: int):
    if user_id < 1 or user_id > len(users_db):
        raise HTTPException(status_code=404, detail="Користувача не знайдено")
    return users_db[user_id - 1]

@app.post("/users")
def create_user(user: User):
    new_user = {
        "id": len(users_db) + 1,
        **user.dict()
    }
    users_db.append(new_user)
    return {"message": "Користувача створено", "user": new_user}

# Запуск: uvicorn main:app --reload`,
      explanation: "Створює повноцінний FastAPI додаток з CRUD операціями для користувачів."
    },
    hints: [
      "Використовуйте @app.get() та @app.post() для маршрутів",
      "Створіть Pydantic модель для валідації",
      "Використовуйте HTTPException для помилок",
      "Запускайте через uvicorn main:app --reload"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке FastAPI?",
        options: ["База даних", "Веб-фреймворк для API", "Мова програмування", "Редактор"],
        correctAnswer: 1,
        explanation: "FastAPI — це сучасний, швидкий веб-фреймворк для створення API на Python."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Як запустити FastAPI додаток?",
        options: ["python main.py", "uvicorn main:app", "flask run", "npm start"],
        correctAnswer: 1,
        explanation: "FastAPI запускається через uvicorn: uvicorn main:app --reload"
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке Pydantic?",
        options: ["База даних", "Бібліотека для валідації даних", "Веб-сервер", "Фреймворк"],
        correctAnswer: 1,
        explanation: "Pydantic — бібліотека для валідації даних, яка використовується в FastAPI."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить @app.get('/items/{item_id}')?",
        options: ["Створює item", "Отримує item за ID", "Видаляє item", "Оновлює item"],
        correctAnswer: 1,
        explanation: "@app.get() створює GET endpoint для отримання ресурсу за ID з path параметра."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як отримати query параметри у FastAPI?",
        options: ["Через path", "Через параметри функції зі значеннями за замовчуванням", "Через headers", "Не можна"],
        correctAnswer: 1,
        explanation: "Query параметри передаються як параметри функції зі значеннями за замовчуванням або Optional."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "FastAPI автоматично генерує документацію API за адресою /docs.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. FastAPI автоматично створює інтерактивну документацію Swagger UI за адресою /docs."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

