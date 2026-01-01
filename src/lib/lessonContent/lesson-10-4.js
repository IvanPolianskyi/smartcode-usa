/**
 * Lesson 10-4: Практика: простий backend
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_10_4 = {
  lessonId: "lesson-10-4",
  moduleId: "module-10",
  order: 4,
  title: "Практика: простий backend",
  
  learningObjectives: [
    "Створити простий backend на FastAPI",
    "Реалізувати кілька endpoints",
    "Обробляти запити та відповіді",
    "Тестувати API"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-10-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд проекту",
        content: `Ми створимо **Backend для блогу** — простий API для управління постами.

**Функціональність:**
- GET /posts — отримати всі пости
- GET /posts/{id} — отримати один пост
- POST /posts — створити новий пост
- PUT /posts/{id} — оновити пост
- DELETE /posts/{id} — видалити пост

**Структура:**
- Pydantic моделі для валідації
- In-memory сховище (замість бази даних)
- Обробка помилок
- Валідація даних`
      },
      {
        title: "Моделі даних",
        content: `**Pydantic моделі:**

\`\`\`python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PostCreate(BaseModel):
    title: str
    content: str
    author: str

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None

class Post(BaseModel):
    id: int
    title: str
    content: str
    author: str
    created_at: str
\`\`\`

**Сховище:**

\`\`\`python
posts_db = []
next_id = 1
\`\`\``
      },
      {
        title: "Реалізація CRUD",
        content: `**Create (POST):**

\`\`\`python
@app.post("/posts", status_code=201)
def create_post(post: PostCreate):
    global next_id
    new_post = {
        "id": next_id,
        "title": post.title,
        "content": post.content,
        "author": post.author,
        "created_at": datetime.now().isoformat()
    }
    posts_db.append(new_post)
    next_id += 1
    return new_post
\`\`\`

**Read (GET):**

\`\`\`python
@app.get("/posts")
def get_posts():
    return {"posts": posts_db, "total": len(posts_db)}

@app.get("/posts/{post_id}")
def get_post(post_id: int):
    post = next((p for p in posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Пост не знайдено")
    return post
\`\`\`

**Update (PUT):**

\`\`\`python
@app.put("/posts/{post_id}")
def update_post(post_id: int, post: PostUpdate):
    post_to_update = next((p for p in posts_db if p["id"] == post_id), None)
    if not post_to_update:
        raise HTTPException(status_code=404, detail="Пост не знайдено")
    
    if post.title:
        post_to_update["title"] = post.title
    if post.content:
        post_to_update["content"] = post.content
    if post.author:
        post_to_update["author"] = post.author
    
    return post_to_update
\`\`\`

**Delete (DELETE):**

\`\`\`python
@app.delete("/posts/{post_id}")
def delete_post(post_id: int):
    global posts_db
    post = next((p for p in posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Пост не знайдено")
    
    posts_db = [p for p in posts_db if p["id"] != post_id]
    return {"message": "Пост видалено"}
\`\`\``
      },
      {
        title: "Тестування API",
        content: `**Через браузер:**
- http://127.0.0.1:8000/docs — Swagger UI
- Можна тестувати всі endpoints прямо в браузері

**Через requests:**

\`\`\`python
import requests

# Створити пост
response = requests.post(
    "http://127.0.0.1:8000/posts",
    json={"title": "Тест", "content": "Текст", "author": "Я"}
)
print(response.json())

# Отримати пости
response = requests.get("http://127.0.0.1:8000/posts")
print(response.json())
\`\`\`

**Через curl:**

\`\`\`bash
# GET
curl http://127.0.0.1:8000/posts

# POST
curl -X POST http://127.0.0.1:8000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Тест","content":"Текст","author":"Я"}'
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: Повний CRUD API",
      code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

app = FastAPI()

class PostCreate(BaseModel):
    title: str
    content: str
    author: str

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None

posts_db = []
next_id = 1

@app.get("/posts")
def get_posts():
    return {"posts": posts_db, "total": len(posts_db)}

@app.post("/posts", status_code=201)
def create_post(post: PostCreate):
    global next_id
    new_post = {
        "id": next_id,
        **post.dict(),
        "created_at": datetime.now().isoformat()
    }
    posts_db.append(new_post)
    next_id += 1
    return new_post

@app.get("/posts/{post_id}")
def get_post(post_id: int):
    post = next((p for p in posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(404, "Пост не знайдено")
    return post

@app.put("/posts/{post_id}")
def update_post(post_id: int, post: PostUpdate):
    post_to_update = next((p for p in posts_db if p["id"] == post_id), None)
    if not post_to_update:
        raise HTTPException(404, "Пост не знайдено")
    
    update_data = post.dict(exclude_unset=True)
    post_to_update.update(update_data)
    return post_to_update

@app.delete("/posts/{post_id}")
def delete_post(post_id: int):
    global posts_db
    post = next((p for p in posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(404, "Пост не знайдено")
    posts_db = [p for p in posts_db if p["id"] != post_id]
    return {"message": "Пост видалено"}`,
      explanation: "Повноцінний CRUD API для управління постами з валідацією та обробкою помилок."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не обробляти помилки 404",
      explanation: "Якщо ресурс не знайдено, потрібно повернути 404, а не 200 з порожнім об'єктом.",
      correctApproach: "Використовуйте HTTPException(status_code=404) для неіснуючих ресурсів."
    },
    {
      mistake: "Не валідувати дані",
      explanation: "Без Pydantic моделей дані не валідуються автоматично.",
      correctApproach: "Використовуйте Pydantic BaseModel для request body."
    }
  ],
  
  summary: `На цьому проекті ми:

1. **Створили повноцінний backend** — API для блогу
2. **Реалізували CRUD** — Create, Read, Update, Delete
3. **Використали Pydantic** — автоматична валідація
4. **Обробили помилки** — HTTPException для правильних статус кодів
5. **Протестували API** — через /docs та requests

Це перший backend, який демонструє практичне застосування FastAPI!`,
  
  practiceTask: {
    title: "Backend для блогу",
    description: "Створіть повноцінний CRUD API для блогу",
    problemStatement: `Створіть FastAPI додаток, який:
1. Має модель Post (title, content, author, created_at)
2. Реалізує GET /posts — всі пости
3. Реалізує GET /posts/{id} — один пост
4. Реалізує POST /posts — створення
5. Реалізує PUT /posts/{id} — оновлення
6. Реалізує DELETE /posts/{id} — видалення
7. Обробляє помилки (404 для неіснуючих постів)`,
    inputFormat: "HTTP запити до API",
    outputFormat: "JSON відповіді з постами",
    examples: [
      {
        input: "POST /posts з даними, GET /posts",
        output: "Створений пост та список всіх постів",
        explanation: "API обробляє створення та отримання постів"
      }
    ],
    solution: {
      code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

app = FastAPI(title="Blog API", version="1.0.0")

class PostCreate(BaseModel):
    title: str
    content: str
    author: str

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None

# In-memory сховище
posts_db = []
next_id = 1

@app.get("/")
def read_root():
    return {"message": "Ласкаво просимо до Blog API!"}

@app.get("/posts")
def get_posts():
    return {"posts": posts_db, "total": len(posts_db)}

@app.get("/posts/{post_id}")
def get_post(post_id: int):
    post = next((p for p in posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Пост не знайдено")
    return post

@app.post("/posts", status_code=201)
def create_post(post: PostCreate):
    global next_id
    new_post = {
        "id": next_id,
        "title": post.title,
        "content": post.content,
        "author": post.author,
        "created_at": datetime.now().isoformat()
    }
    posts_db.append(new_post)
    next_id += 1
    return new_post

@app.put("/posts/{post_id}")
def update_post(post_id: int, post: PostUpdate):
    post_to_update = next((p for p in posts_db if p["id"] == post_id), None)
    if not post_to_update:
        raise HTTPException(status_code=404, detail="Пост не знайдено")
    
    update_data = post.dict(exclude_unset=True)
    post_to_update.update(update_data)
    return post_to_update

@app.delete("/posts/{post_id}")
def delete_post(post_id: int):
    global posts_db
    post = next((p for p in posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Пост не знайдено")
    
    posts_db = [p for p in posts_db if p["id"] != post_id]
    return {"message": "Пост видалено"}

# Запуск: uvicorn main:app --reload`,
      explanation: "Повноцінний CRUD API для блогу з валідацією, обробкою помилок та всіма операціями."
    },
    hints: [
      "Використовуйте Pydantic моделі для валідації",
      "Зберігайте пости у списку (в реальному додатку була б БД)",
      "Використовуйте HTTPException для помилок 404",
      "Оновлюйте тільки передані поля в PUT"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає CRUD?",
        options: ["Create, Read, Update, Delete", "Copy, Remove, Update, Delete", "Create, Remove, Update, Delete", "Copy, Read, Update, Delete"],
        correctAnswer: 0,
        explanation: "CRUD — Create (створення), Read (читання), Update (оновлення), Delete (видалення)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який HTTP метод використовується для оновлення?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: 2,
        explanation: "PUT використовується для оновлення існуючих ресурсів."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить @app.post('/posts', status_code=201)?",
        options: ["Отримує пости", "Створює новий пост зі статусом 201", "Видаляє пост", "Оновлює пост"],
        correctAnswer: 1,
        explanation: "@app.post() створює POST endpoint, status_code=201 встановлює код успішного створення."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як обробити помилку 404 у FastAPI?",
        options: ["return None", "raise HTTPException(status_code=404)", "return 404", "print('404')"],
        correctAnswer: 1,
        explanation: "HTTPException з status_code=404 — правильний спосіб повернути помилку 404 у FastAPI."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Pydantic моделі автоматично валідують дані у FastAPI.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. FastAPI автоматично валідує вхідні дані на основі Pydantic моделей."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як запустити FastAPI сервер?",
        options: ["python main.py", "uvicorn main:app --reload", "fastapi run", "npm start"],
        correctAnswer: 1,
        explanation: "uvicorn main:app --reload запускає FastAPI сервер з автоматичним перезавантаженням при змінах."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

